/**
 * Pipeline state: runs, per-unit stage status, per-item status and the content spend ledger.
 *
 * M1 uses FileStateStore (platform/content-pipeline/.state/, gitignored). M2 adds a
 * PostgresStateStore over db-schema's tables with the same interface:
 *   RunRecord        → pipeline_runs
 *   UnitStageRecord  → pipeline_unit_status (unique unit, stage)
 *   ItemRecord       → pipeline_items       (unique unit, stage, item_key)
 *   SpendEntry       → content budget ledger (append-only; totals are SUM by provider / simulated)
 * Every write is a whole-record upsert, so the Postgres adapter is a straight mapping and two
 * workers never need cross-row transactions except the ledger insert.
 */
import fs from 'node:fs';
import path from 'node:path';
import type { BudgetLedger } from '@soyl/ai-core';
import type { TokenUsage } from '@soyl/shared/config/models';

export const STAGES = ['outline', 'generate', 'lint', 'verify', 'originality', 'assemble', 'tts', 'publish'] as const;
export type Stage = (typeof STAGES)[number];

export type ItemStatus = 'pending' | 'running' | 'done' | 'failed' | 'paused' | 'needs_review';
export type RunStatus = 'running' | 'done' | 'partial' | 'failed' | 'paused_budget';

export interface RunRecord {
  id: string;
  command: string;
  provider: string;
  scope: Record<string, string | number | undefined>;
  args: Record<string, unknown>;
  status: RunStatus;
  started_at: string;
  finished_at: string | null;
  /** Caps and spend for this run, in paise. `simulated` = mock provider (no real money). */
  budget: { run_cap_paise: number; total_cap_paise: number; spent_paise: number; simulated: boolean };
  /** In-flight Azure OpenAI Batch job, so a later invocation can resume polling it. */
  batch: { job_id: string; items: { custom_id: string; unit: string; key: string }[]; submitted_at: string; state: string } | null;
  counts: Partial<Record<ItemStatus | 'skipped', number>>;
  message: string | null;
}

export interface ItemRecord {
  unit: string;
  stage: Stage;
  key: string;
  status: ItemStatus;
  attempts: number;
  run_id: string | null;
  template: string | null;
  model: string | null;
  usage: TokenUsage | null;
  cost_paise: number;
  /** Path of the item's output relative to the out dir. */
  output: string | null;
  error: string | null;
  updated_at: string;
  /** Lint stage only: findings summary. */
  findings?: { errors: number; warnings: number };
}

export interface UnitStageRecord {
  unit: string;
  stage: Stage;
  status: ItemStatus;
  run_id: string | null;
  updated_at: string;
  items: Record<string, ItemRecord>;
}

export interface SpendEntry {
  at: string;
  run_id: string;
  provider: string;
  model: string;
  tier: string;
  unit: string | null;
  stage: Stage | null;
  item: string | null;
  usage: TokenUsage;
  cost_paise: number;
  batch: boolean;
  simulated: boolean;
}

export interface StateStore {
  /** 'file' (offline, .state/) or 'pg' (pipeline_* tables). */
  readonly kind?: 'file' | 'pg';
  createRun(run: RunRecord): Promise<void>;
  getRun(id: string): Promise<RunRecord | null>;
  updateRun(id: string, patch: Partial<RunRecord>): Promise<RunRecord>;
  listRuns(): Promise<RunRecord[]>;
  getUnitStage(unit: string, stage: Stage): Promise<UnitStageRecord | null>;
  putItem(item: ItemRecord): Promise<UnitStageRecord>;
  listUnitStages(filter?: { stage?: Stage; unitPrefix?: string }): Promise<UnitStageRecord[]>;
  recordSpend(entry: SpendEntry): Promise<void>;
  /** Sum of spend in paise matching the filter. */
  spentPaise(filter?: { provider?: string; simulated?: boolean; runId?: string }): Promise<number>;
  /** A shared, persistent budget for a run (Postgres: row-locked reservations). Absent → in-process BudgetGuard. */
  budgetFor?(run: RunRecord, caps: { run: number; total: number }, simulated: boolean): Promise<BudgetLedger>;
}

/** Aggregate status of a unit stage from its items. */
export function aggregateStatus(items: ItemRecord[]): ItemStatus {
  if (!items.length) return 'pending';
  const has = (s: ItemStatus) => items.some((i) => i.status === s);
  if (has('running')) return 'running';
  if (has('paused')) return 'paused';
  if (has('failed')) return 'failed';
  if (has('pending')) return 'pending';
  if (has('needs_review')) return 'needs_review';
  return 'done';
}

export function newRunId(now: Date = new Date()): string {
  const stamp = now.toISOString().replace(/[-:]/g, '').replace('T', '-').slice(0, 15);
  return `r-${stamp}-${Math.random().toString(36).slice(2, 6)}`;
}

function writeAtomic(file: string, data: string): void {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const tmp = `${file}.${process.pid}.${Math.random().toString(36).slice(2)}.tmp`;
  fs.writeFileSync(tmp, data);
  fs.renameSync(tmp, file);
}

function readJson<T>(file: string): T | null {
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, 'utf8')) as T;
}

/** Unit ids are safe file names (lowercase, digits, hyphens), validated before use. */
function safeName(name: string): string {
  if (!/^[a-z0-9][a-z0-9._-]*$/.test(name)) throw new Error(`unsafe state key ${name}`);
  return name;
}

export class FileStateStore implements StateStore {
  readonly kind = 'file' as const;
  /** Serialises writes per file inside this process. */
  private chains = new Map<string, Promise<unknown>>();

  constructor(readonly dir: string) {}

  private serial<T>(file: string, fn: () => T): Promise<T> {
    const prev = this.chains.get(file) ?? Promise.resolve();
    const next = prev.then(fn, fn);
    this.chains.set(file, next.catch(() => undefined));
    return next;
  }

  private runFile(id: string) {
    return path.join(this.dir, 'runs', `${safeName(id)}.json`);
  }
  private unitFile(unit: string) {
    return path.join(this.dir, 'units', `${safeName(unit)}.json`);
  }
  private get ledgerFile() {
    return path.join(this.dir, 'ledger.jsonl');
  }

  async createRun(run: RunRecord): Promise<void> {
    const file = this.runFile(run.id);
    await this.serial(file, () => {
      if (fs.existsSync(file)) throw new Error(`run ${run.id} exists`);
      writeAtomic(file, JSON.stringify(run, null, 2));
    });
  }

  async getRun(id: string): Promise<RunRecord | null> {
    return readJson<RunRecord>(this.runFile(id));
  }

  async updateRun(id: string, patch: Partial<RunRecord>): Promise<RunRecord> {
    const file = this.runFile(id);
    return this.serial(file, () => {
      const run = readJson<RunRecord>(file);
      if (!run) throw new Error(`no run ${id}`);
      const next = { ...run, ...patch };
      writeAtomic(file, JSON.stringify(next, null, 2));
      return next;
    });
  }

  async listRuns(): Promise<RunRecord[]> {
    const dir = path.join(this.dir, 'runs');
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.json'))
      .map((f) => readJson<RunRecord>(path.join(dir, f))!)
      .sort((a, b) => a.started_at.localeCompare(b.started_at));
  }

  async getUnitStage(unit: string, stage: Stage): Promise<UnitStageRecord | null> {
    const doc = readJson<{ stages: Partial<Record<Stage, UnitStageRecord>> }>(this.unitFile(unit));
    return doc?.stages[stage] ?? null;
  }

  async putItem(item: ItemRecord): Promise<UnitStageRecord> {
    const file = this.unitFile(item.unit);
    return this.serial(file, () => {
      const doc = readJson<{ unit: string; stages: Partial<Record<Stage, UnitStageRecord>> }>(file) ?? { unit: item.unit, stages: {} };
      const rec = doc.stages[item.stage] ?? { unit: item.unit, stage: item.stage, status: 'pending', run_id: null, updated_at: item.updated_at, items: {} };
      rec.items[item.key] = item;
      rec.status = aggregateStatus(Object.values(rec.items));
      rec.run_id = item.run_id ?? rec.run_id;
      rec.updated_at = item.updated_at;
      doc.stages[item.stage] = rec;
      writeAtomic(file, JSON.stringify(doc, null, 2));
      return rec;
    });
  }

  async listUnitStages(filter: { stage?: Stage; unitPrefix?: string } = {}): Promise<UnitStageRecord[]> {
    const dir = path.join(this.dir, 'units');
    if (!fs.existsSync(dir)) return [];
    const out: UnitStageRecord[] = [];
    for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.json')).sort()) {
      if (filter.unitPrefix && !f.startsWith(filter.unitPrefix)) continue;
      const doc = readJson<{ stages: Partial<Record<Stage, UnitStageRecord>> }>(path.join(dir, f));
      for (const rec of Object.values(doc?.stages ?? {})) if (rec && (!filter.stage || rec.stage === filter.stage)) out.push(rec);
    }
    return out;
  }

  async recordSpend(entry: SpendEntry): Promise<void> {
    await this.serial(this.ledgerFile, () => {
      fs.mkdirSync(this.dir, { recursive: true });
      fs.appendFileSync(this.ledgerFile, `${JSON.stringify(entry)}\n`);
    });
  }

  async spentPaise(filter: { provider?: string; simulated?: boolean; runId?: string } = {}): Promise<number> {
    if (!fs.existsSync(this.ledgerFile)) return 0;
    let sum = 0;
    for (const line of fs.readFileSync(this.ledgerFile, 'utf8').split('\n')) {
      if (!line.trim()) continue;
      const e = JSON.parse(line) as SpendEntry;
      if (filter.provider && e.provider !== filter.provider) continue;
      if (filter.simulated !== undefined && e.simulated !== filter.simulated) continue;
      if (filter.runId && e.run_id !== filter.runId) continue;
      sum += e.cost_paise;
    }
    return sum;
  }
}
