/**
 * Pipeline runtime: options, the run record, the metered model client with its budget guard,
 * and item execution with resume, automatic retries and budget pause.
 */
import path from 'node:path';
import {
  BudgetExceededError,
  BudgetGuard,
  ModelClient,
  StructuredOutputError,
  createProvider,
  type ProviderName,
  type StructuredResult,
  type UsageRecord,
} from '@soyl/ai-core';
import { BUDGET, GENERATION, RETRIES } from '../config/pipeline';
import { loadCatalog, type Catalog, type Scope } from './catalog';
import { MOCK_FIXTURES } from './mock-fixtures';
import { defaultPaths, type PipelinePaths } from './paths';
import type { ItemSpec } from './requests';
import { FileStateStore, newRunId, type ItemRecord, type ItemStatus, type RunRecord, type Stage, type StateStore } from './state';

export interface PipelineOptions {
  provider: ProviderName;
  concurrency: number;
  force: boolean;
  retryReview: boolean;
  batch: boolean;
  dryRun: boolean;
  seed: string;
  runId?: string;
  pollIntervalMs: number;
}

export const DEFAULT_OPTIONS: PipelineOptions = {
  provider: 'mock',
  concurrency: GENERATION.concurrency,
  force: false,
  retryReview: false,
  batch: false,
  dryRun: false,
  seed: 'soyl',
  pollIntervalMs: 60_000,
};

export interface Pipeline {
  paths: PipelinePaths;
  catalog: Catalog;
  store: StateStore;
  opts: PipelineOptions;
  env: Record<string, string | undefined>;
  log: (line: string) => void;
}

export function openPipeline(partial: Partial<PipelineOptions> = {}, overrides: { paths?: Partial<PipelinePaths>; env?: Record<string, string | undefined>; log?: (l: string) => void; store?: StateStore } = {}): Pipeline {
  const env = overrides.env ?? process.env;
  const paths = { ...defaultPaths(env), ...overrides.paths };
  return {
    paths,
    catalog: loadCatalog(paths.catalogDir),
    store: overrides.store ?? new FileStateStore(paths.stateDir),
    opts: { ...DEFAULT_OPTIONS, ...partial },
    env,
    log: overrides.log ?? ((l) => console.log(l)),
  };
}

function inrFromEnv(env: Record<string, string | undefined>, name: string, fallback: number): number {
  const raw = env[name];
  if (raw === undefined || raw === '') return fallback;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 0) throw new Error(`${name} must be a non-negative number of rupees, got "${raw}"`);
  return n;
}

export function budgetCapsPaise(env: Record<string, string | undefined>): { run: number; total: number } {
  return {
    run: Math.round(inrFromEnv(env, BUDGET.runEnv, BUDGET.runDefaultInr) * 100),
    total: Math.round(inrFromEnv(env, BUDGET.totalEnv, BUDGET.totalDefaultInr) * 100),
  };
}

export interface ActiveRun {
  run: RunRecord;
  client: ModelClient;
  /** Set when the budget guard refused a call: no further model calls in this run. */
  paused: boolean;
  counts: Partial<Record<ItemStatus | 'skipped', number>>;
}

/** Creates (or resumes with --run) a run record and the metered client for it. */
export async function startRun(p: Pipeline, command: string, scope: Scope): Promise<ActiveRun> {
  const provider = await createProvider({
    provider: p.opts.provider,
    env: p.env,
    concurrency: p.opts.concurrency,
    mock: { seed: p.opts.seed, fixtures: MOCK_FIXTURES },
  });
  const caps = budgetCapsPaise(p.env);
  const spentTotal = await p.store.spentPaise({ provider: provider.name, simulated: provider.simulated });
  let run = p.opts.runId ? await p.store.getRun(p.opts.runId) : null;
  if (p.opts.runId && !run) throw new Error(`no run ${p.opts.runId} (see: npm run content -- status)`);
  if (run && run.provider !== provider.name) throw new Error(`run ${run.id} used provider ${run.provider}; pass --provider ${run.provider}`);
  if (!run) {
    run = {
      id: newRunId(),
      command,
      provider: provider.name,
      scope: { ...scope },
      args: { ...p.opts },
      status: 'running',
      started_at: new Date().toISOString(),
      finished_at: null,
      budget: { run_cap_paise: caps.run, total_cap_paise: caps.total, spent_paise: 0, simulated: provider.simulated },
      batch: null,
      counts: {},
      message: null,
    };
    await p.store.createRun(run);
  } else {
    run = await p.store.updateRun(run.id, { status: 'running', finished_at: null, message: null, budget: { ...run.budget, run_cap_paise: caps.run, total_cap_paise: caps.total } });
  }
  const budget = new BudgetGuard({ runCapPaise: caps.run, totalCapPaise: caps.total, spentRunPaise: run.budget.spent_paise, spentTotalPaise: spentTotal });
  const active: ActiveRun = { run, client: null as unknown as ModelClient, paused: false, counts: {} };
  active.client = new ModelClient({
    provider,
    budget,
    onUsage: async (rec: UsageRecord) => {
      await p.store.recordSpend({
        at: rec.at,
        run_id: active.run.id,
        provider: rec.provider,
        model: rec.model,
        tier: rec.tier,
        unit: rec.meta?.unit ?? null,
        stage: rec.meta?.item ? (rec.meta.item === 'outline' ? 'outline' : 'generate') : null,
        item: rec.meta?.item ?? null,
        usage: rec.usage,
        cost_paise: rec.cost_paise,
        batch: rec.batch,
        simulated: rec.simulated,
      });
      active.run.budget.spent_paise += rec.cost_paise;
    },
  });
  if (provider.simulated) p.log(`provider: mock (seed "${p.opts.seed}") — output is PLACEHOLDER text, costs are simulated`);
  else p.log(`provider: ${provider.name}`);
  p.log(`run ${run.id}: budget ${(caps.run / 100).toLocaleString('en-IN')} INR per run, ${(caps.total / 100).toLocaleString('en-IN')} INR total (${provider.simulated ? 'simulated' : 'real'} spend so far ₹${(spentTotal / 100).toFixed(2)})`);
  return active;
}

export async function finishRun(p: Pipeline, active: ActiveRun): Promise<RunRecord> {
  const c = active.counts;
  const status = active.paused ? 'paused_budget' : (c.failed ?? 0) + (c.needs_review ?? 0) > 0 ? 'partial' : 'done';
  const run = await p.store.updateRun(active.run.id, {
    status,
    finished_at: new Date().toISOString(),
    budget: active.run.budget,
    counts: c,
    batch: active.run.batch,
    message: active.paused ? 'budget cap reached: model calls paused; re-run with --run to resume after raising the cap' : null,
  });
  return run;
}

export function count(active: ActiveRun, status: ItemStatus | 'skipped'): void {
  active.counts[status] = (active.counts[status] ?? 0) + 1;
}

export type ItemWriter = (data: unknown, result: { model: string; generatedAt: string }) => string;

function baseItem(unit: string, stage: Stage, key: string, runId: string, prev: ItemRecord | undefined): ItemRecord {
  return {
    unit,
    stage,
    key,
    status: 'pending',
    attempts: prev?.attempts ?? 0,
    run_id: runId,
    template: prev?.template ?? null,
    model: prev?.model ?? null,
    usage: prev?.usage ?? null,
    cost_paise: prev?.cost_paise ?? 0,
    output: prev?.output ?? null,
    error: null,
    updated_at: new Date().toISOString(),
  };
}

/** Whether an item needs work, given its previous record and the options. */
export function needsWork(prev: ItemRecord | undefined, opts: Pick<PipelineOptions, 'force' | 'retryReview'>): boolean {
  if (!prev || opts.force) return true;
  if (prev.status === 'done') return false;
  if (prev.status === 'needs_review') return opts.retryReview;
  return true;
}

function errorText(e: unknown): string {
  if (e instanceof StructuredOutputError) return `${e.message}: ${e.issues.slice(0, 6).join('; ')}`;
  return (e as Error).message ?? String(e);
}

function sumUsage(calls: UsageRecord[]) {
  return calls.reduce(
    (u, c) => ({
      input_tokens: u.input_tokens + c.usage.input_tokens,
      cached_input_tokens: u.cached_input_tokens + c.usage.cached_input_tokens,
      output_tokens: u.output_tokens + c.usage.output_tokens,
    }),
    { input_tokens: 0, cached_input_tokens: 0, output_tokens: 0 },
  );
}

/**
 * Runs one item: skips it when done (resume), retries failures up to RETRIES.maxAutoRetries times,
 * marks it needs_review after that, and pauses (without counting an attempt) when the budget
 * guard refuses the call.
 */
export async function executeItem(p: Pipeline, active: ActiveRun, unit: string, stage: Stage, spec: ItemSpec, write: ItemWriter): Promise<ItemStatus | 'skipped'> {
  const prev = (await p.store.getUnitStage(unit, stage))?.items[spec.key];
  if (!needsWork(prev, p.opts)) {
    count(active, 'skipped');
    return 'skipped';
  }
  const item = baseItem(unit, stage, spec.key, active.run.id, prev);
  if (p.opts.force || (p.opts.retryReview && prev?.status === 'needs_review')) item.attempts = 0;
  item.template = spec.templateRef;
  const maxAttempts = 1 + RETRIES.maxAutoRetries;
  for (;;) {
    if (active.paused) {
      await p.store.putItem({ ...item, status: 'paused', error: 'budget cap reached', updated_at: new Date().toISOString() });
      count(active, 'paused');
      return 'paused';
    }
    item.attempts++;
    await p.store.putItem({ ...item, status: 'running', updated_at: new Date().toISOString() });
    try {
      const res: StructuredResult<unknown> = await active.client.structured({ ...spec.request, meta: { ...spec.request.meta, runId: active.run.id } });
      const output = write(res.data, { model: res.usage.model, generatedAt: res.usage.at });
      const usage = sumUsage(res.calls);
      await p.store.putItem({
        ...item,
        status: 'done',
        model: res.usage.model,
        usage,
        cost_paise: res.calls.reduce((s, c) => s + c.cost_paise, 0),
        output: path.relative(p.paths.outDir, output).split(path.sep).join('/'),
        error: null,
        updated_at: new Date().toISOString(),
      });
      count(active, 'done');
      return 'done';
    } catch (e) {
      if (e instanceof BudgetExceededError) {
        active.paused = true;
        item.attempts--;
        p.log(`  ${unit} ${spec.key}: ${e.message} — pausing model calls for this run`);
        continue;
      }
      const error = errorText(e);
      if (item.attempts >= maxAttempts) {
        await p.store.putItem({ ...item, status: 'needs_review', error, updated_at: new Date().toISOString() });
        p.log(`  ${unit} ${spec.key}: needs_review after ${item.attempts} attempts — ${error.slice(0, 200)}`);
        count(active, 'needs_review');
        return 'needs_review';
      }
      await p.store.putItem({ ...item, status: 'failed', error, updated_at: new Date().toISOString() });
      p.log(`  ${unit} ${spec.key}: attempt ${item.attempts} failed, retrying — ${error.slice(0, 160)}`);
    }
  }
}

export interface BatchEntry {
  unit: string;
  stage: Stage;
  spec: ItemSpec;
  write: ItemWriter;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Runs entries as one Batch job (half price on Azure OpenAI). The job id is stored on the run so
 * `--run <id> --batch` resumes polling after an interruption. Items that fail in the batch fall
 * back to synchronous calls with the normal retry rules.
 */
export async function executeBatch(p: Pipeline, active: ActiveRun, entries: BatchEntry[]): Promise<void> {
  const pending: BatchEntry[] = [];
  for (const e of entries) {
    const prev = (await p.store.getUnitStage(e.unit, e.stage))?.items[e.spec.key];
    if (needsWork(prev, p.opts)) pending.push(e);
    else count(active, 'skipped');
  }
  if (!pending.length) return;
  const byId = new Map(pending.map((e) => [`${e.unit}|${e.spec.key}`, e]));
  const items = pending.map((e) => ({ customId: `${e.unit}|${e.spec.key}`, request: { ...e.spec.request, meta: { ...e.spec.request.meta, runId: active.run.id } } }));

  let jobId = active.run.batch?.job_id;
  if (jobId && !active.run.batch!.items.every((i) => byId.has(i.custom_id))) jobId = undefined;
  if (!jobId) {
    try {
      ({ jobId } = await active.client.submitBatch(items));
    } catch (e) {
      if (e instanceof BudgetExceededError) {
        active.paused = true;
        p.log(`batch: ${e.message} — not submitted`);
        for (const entry of pending) {
          const prev = (await p.store.getUnitStage(entry.unit, entry.stage))?.items[entry.spec.key];
          await p.store.putItem({ ...baseItem(entry.unit, entry.stage, entry.spec.key, active.run.id, prev), template: entry.spec.templateRef, status: 'paused', error: 'budget cap reached' });
          count(active, 'paused');
        }
        return;
      }
      throw e;
    }
    active.run.batch = { job_id: jobId, items: pending.map((e) => ({ custom_id: `${e.unit}|${e.spec.key}`, unit: e.unit, key: e.spec.key })), submitted_at: new Date().toISOString(), state: 'submitted' };
    await p.store.updateRun(active.run.id, { batch: active.run.batch });
    p.log(`batch ${jobId}: submitted ${pending.length} item(s)`);
  } else p.log(`batch ${jobId}: resuming`);

  for (;;) {
    const status = await active.client.pollBatch(jobId);
    active.run.batch!.state = status.state;
    await p.store.updateRun(active.run.id, { batch: active.run.batch });
    p.log(`batch ${jobId}: ${status.state} (${status.counts.completed}/${status.counts.total} done, ${status.counts.failed} failed)`);
    if (['completed', 'failed', 'expired', 'cancelled'].includes(status.state)) break;
    await sleep(p.opts.pollIntervalMs);
  }

  const results = await active.client.fetchBatch(jobId, items);
  const retry: BatchEntry[] = [];
  for (const r of results) {
    const entry = byId.get(r.customId);
    if (!entry) continue;
    const prev = (await p.store.getUnitStage(entry.unit, entry.stage))?.items[entry.spec.key];
    const base = { ...baseItem(entry.unit, entry.stage, entry.spec.key, active.run.id, prev), template: entry.spec.templateRef, attempts: (prev?.attempts ?? 0) + 1 };
    if (r.ok) {
      const output = entry.write(r.data, { model: r.usage.model, generatedAt: r.usage.at });
      await p.store.putItem({ ...base, status: 'done', model: r.usage.model, usage: r.usage.usage, cost_paise: r.usage.cost_paise, output: path.relative(p.paths.outDir, output).split(path.sep).join('/') });
      count(active, 'done');
    } else {
      await p.store.putItem({ ...base, status: 'failed', error: `batch: ${r.error}` });
      retry.push(entry);
    }
  }
  active.run.batch = null;
  await p.store.updateRun(active.run.id, { batch: null });
  for (const e of retry) await executeItem(p, active, e.unit, e.stage, e.spec, e.write);
}
