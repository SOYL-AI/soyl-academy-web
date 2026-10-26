/**
 * PostgresStateStore: the StateStore over db-schema's pipeline tables (migrations 0001 + 0004).
 *
 *   RunRecord        → pipeline_runs        (id, command, provider, scope, args, status, budget_cap_paise,
 *                                            spent_paise, reserved_paise, batch_job_id, started_at,
 *                                            finished_at, detail {total_cap_paise, simulated, batch, counts, message})
 *   UnitStageRecord  → pipeline_unit_status (unique unit, stage; status = aggregate of its items)
 *   ItemRecord       → pipeline_items       (unique unit, stage, item_key; tokens in int columns + usage jsonb;
 *                                            detail {findings, …})
 *   SpendEntry       → content_budget_ledger (append-only; provider 'mock' ⇒ simulated)
 *
 * Budget: `budgetFor()` returns a PgBudget whose reservations live in pipeline_runs.reserved_paise.
 * Every reservation is made in a transaction that row-locks all running runs (ORDER BY id, so two
 * reservers never deadlock), so parallel runs, in one process or many, share one total cap. The
 * total cap is content_budget.cap_paise (config_values CONTENT_BUDGET_INR) when set, else the env
 * cap; mock (simulated) spend and reservations are counted separately from real money.
 */
import type pg from 'pg';
import { BudgetExceededError, type BudgetLedger, type Reservation } from '@soyl/ai-core';
import type { TokenUsage } from '@soyl/shared/config/models';
import { aggregateStatus, type ItemRecord, type ItemStatus, type RunRecord, type SpendEntry, type Stage, type StateStore, type UnitStageRecord } from './state';

type Row = Record<string, unknown>;
const num = (v: unknown) => (v === null || v === undefined ? 0 : Number(v));
const iso = (v: unknown) => (v instanceof Date ? v.toISOString() : v === null || v === undefined ? null : String(v));

interface RunDetail {
  total_cap_paise?: number;
  simulated?: boolean;
  batch?: RunRecord['batch'];
  counts?: RunRecord['counts'];
  message?: string | null;
}

function runFromRow(r: Row): RunRecord {
  const d = (r.detail ?? {}) as RunDetail;
  return {
    id: String(r.id),
    command: String(r.command),
    provider: String(r.provider),
    scope: (r.scope ?? {}) as RunRecord['scope'],
    args: (r.args ?? {}) as RunRecord['args'],
    status: r.status as RunRecord['status'],
    started_at: iso(r.started_at)!,
    finished_at: iso(r.finished_at),
    budget: { run_cap_paise: num(r.budget_cap_paise), total_cap_paise: d.total_cap_paise ?? 0, spent_paise: num(r.spent_paise), simulated: d.simulated ?? r.provider === 'mock' },
    batch: d.batch ?? null,
    counts: d.counts ?? {},
    message: d.message ?? null,
  };
}

function detailOf(run: RunRecord): RunDetail {
  return { total_cap_paise: run.budget.total_cap_paise, simulated: run.budget.simulated, batch: run.batch, counts: run.counts, message: run.message };
}

function itemFromRow(r: Row): ItemRecord {
  const detail = (r.detail ?? {}) as { findings?: ItemRecord['findings'] };
  const usage = r.usage && Object.keys(r.usage as object).length ? (r.usage as TokenUsage) : null;
  const item: ItemRecord = {
    unit: String(r.unit),
    stage: r.stage as Stage,
    key: String(r.item_key),
    status: r.status as ItemStatus,
    attempts: num(r.attempts),
    run_id: (r.last_run_id as string | null) ?? null,
    template: (r.template as string | null) ?? null,
    model: (r.model as string | null) ?? null,
    usage,
    cost_paise: num(r.cost_paise),
    output: (r.output_ref as string | null) ?? null,
    error: (r.error as string | null) ?? null,
    updated_at: iso(r.updated_at)!,
  };
  if (detail.findings) item.findings = detail.findings;
  return item;
}

/** A finite cap for SQL (numeric(14,4) cannot hold Infinity). */
const finite = (paise: number) => (Number.isFinite(paise) ? paise : 9_999_999_999);

export class PostgresStateStore implements StateStore {
  readonly kind = 'pg';
  constructor(private readonly pool: pg.Pool) {}

  private async tx<T>(fn: (c: pg.PoolClient) => Promise<T>): Promise<T> {
    const c = await this.pool.connect();
    try {
      await c.query('BEGIN');
      const out = await fn(c);
      await c.query('COMMIT');
      return out;
    } catch (e) {
      await c.query('ROLLBACK').catch(() => undefined);
      throw e;
    } finally {
      c.release();
    }
  }

  async createRun(run: RunRecord): Promise<void> {
    await this.pool.query(
      `INSERT INTO pipeline_runs (id, command, provider, scope, args, status, budget_cap_paise, spent_paise, batch_job_id, started_at, finished_at, detail)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [run.id, run.command, run.provider, JSON.stringify(run.scope), JSON.stringify(run.args), run.status, finite(run.budget.run_cap_paise), run.budget.spent_paise, run.batch?.job_id ?? null, run.started_at, run.finished_at, JSON.stringify(detailOf(run))],
    );
  }

  async getRun(id: string): Promise<RunRecord | null> {
    const { rows } = await this.pool.query('SELECT * FROM pipeline_runs WHERE id = $1', [id]);
    return rows[0] ? runFromRow(rows[0]) : null;
  }

  async updateRun(id: string, patch: Partial<RunRecord>): Promise<RunRecord> {
    return this.tx(async (c) => {
      const { rows } = await c.query('SELECT * FROM pipeline_runs WHERE id = $1 FOR UPDATE', [id]);
      if (!rows[0]) throw new Error(`no run ${id}`);
      const cur = runFromRow(rows[0]);
      const next: RunRecord = { ...cur, ...patch, budget: { ...cur.budget, ...patch.budget } };
      const finished = next.status !== 'running';
      await c.query(
        `UPDATE pipeline_runs SET status = $2, budget_cap_paise = $3, spent_paise = GREATEST(spent_paise, $4), batch_job_id = $5, finished_at = $6, detail = $7,
                reserved_paise = CASE WHEN $8 THEN 0 ELSE reserved_paise END
         WHERE id = $1`,
        [id, next.status, finite(next.budget.run_cap_paise), next.budget.spent_paise, next.batch?.job_id ?? null, next.finished_at, JSON.stringify(detailOf(next)), finished],
      );
      const { rows: after } = await c.query('SELECT * FROM pipeline_runs WHERE id = $1', [id]);
      return runFromRow(after[0]!);
    });
  }

  async listRuns(): Promise<RunRecord[]> {
    const { rows } = await this.pool.query('SELECT * FROM pipeline_runs ORDER BY started_at, id');
    return rows.map(runFromRow);
  }

  private async unitStage(c: pg.Pool | pg.PoolClient, unit: string, stage: Stage): Promise<UnitStageRecord | null> {
    const { rows: st } = await c.query('SELECT * FROM pipeline_unit_status WHERE unit = $1 AND stage = $2', [unit, stage]);
    if (!st[0]) return null;
    const { rows: items } = await c.query('SELECT * FROM pipeline_items WHERE unit = $1 AND stage = $2 ORDER BY item_key', [unit, stage]);
    return {
      unit,
      stage,
      status: st[0].status as ItemStatus,
      run_id: (st[0].last_run_id as string | null) ?? null,
      updated_at: iso(st[0].updated_at)!,
      items: Object.fromEntries(items.map((r) => [String(r.item_key), itemFromRow(r)])),
    };
  }

  async getUnitStage(unit: string, stage: Stage): Promise<UnitStageRecord | null> {
    return this.unitStage(this.pool, unit, stage);
  }

  async putItem(item: ItemRecord): Promise<UnitStageRecord> {
    return this.tx(async (c) => {
      const usage = item.usage ?? { input_tokens: 0, cached_input_tokens: 0, output_tokens: 0 };
      await c.query(
        `INSERT INTO pipeline_items (unit, stage, item_key, status, attempts, template, model, input_tokens, cached_input_tokens, output_tokens, usage, cost_paise, output_ref, error, last_run_id, detail)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
         ON CONFLICT (unit, stage, item_key) DO UPDATE SET status = EXCLUDED.status, attempts = EXCLUDED.attempts, template = EXCLUDED.template, model = EXCLUDED.model,
           input_tokens = EXCLUDED.input_tokens, cached_input_tokens = EXCLUDED.cached_input_tokens, output_tokens = EXCLUDED.output_tokens, usage = EXCLUDED.usage,
           cost_paise = EXCLUDED.cost_paise, output_ref = EXCLUDED.output_ref, error = EXCLUDED.error, last_run_id = EXCLUDED.last_run_id, detail = EXCLUDED.detail`,
        [
          item.unit, item.stage, item.key, item.status, item.attempts, item.template, item.model,
          usage.input_tokens, usage.cached_input_tokens, usage.output_tokens, JSON.stringify(item.usage ?? {}),
          item.cost_paise, item.output, item.error, item.run_id, JSON.stringify(item.findings ? { findings: item.findings } : {}),
        ],
      );
      const { rows } = await c.query('SELECT status, attempts, error FROM pipeline_items WHERE unit = $1 AND stage = $2', [item.unit, item.stage]);
      const status = aggregateStatus(rows.map((r) => ({ status: r.status }) as ItemRecord));
      const attempts = Math.max(0, ...rows.map((r) => num(r.attempts)));
      const error = rows.find((r) => r.error)?.error ?? null;
      await c.query(
        `INSERT INTO pipeline_unit_status (unit, stage, status, attempts, last_run_id, error) VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (unit, stage) DO UPDATE SET status = EXCLUDED.status, attempts = EXCLUDED.attempts,
           last_run_id = COALESCE(EXCLUDED.last_run_id, pipeline_unit_status.last_run_id), error = EXCLUDED.error`,
        [item.unit, item.stage, status, attempts, item.run_id, error],
      );
      return (await this.unitStage(c, item.unit, item.stage))!;
    });
  }

  async listUnitStages(filter: { stage?: Stage; unitPrefix?: string } = {}): Promise<UnitStageRecord[]> {
    const where: string[] = [];
    const args: unknown[] = [];
    if (filter.stage) where.push(`stage = $${args.push(filter.stage)}`);
    if (filter.unitPrefix) where.push(`unit LIKE $${args.push(`${filter.unitPrefix.replace(/[\\%_]/g, '\\$&')}%`)}`);
    const clause = where.length ? `WHERE ${where.join(' AND ')}` : '';
    const { rows: st } = await this.pool.query(`SELECT * FROM pipeline_unit_status ${clause} ORDER BY unit, stage`, args);
    const { rows: items } = await this.pool.query(`SELECT * FROM pipeline_items ${clause} ORDER BY unit, stage, item_key`, args);
    const byKey = new Map<string, Row[]>();
    for (const r of items) byKey.set(`${r.unit}|${r.stage}`, [...(byKey.get(`${r.unit}|${r.stage}`) ?? []), r]);
    return st.map((s) => ({
      unit: String(s.unit),
      stage: s.stage as Stage,
      status: s.status as ItemStatus,
      run_id: (s.last_run_id as string | null) ?? null,
      updated_at: iso(s.updated_at)!,
      items: Object.fromEntries((byKey.get(`${s.unit}|${s.stage}`) ?? []).map((r) => [String(r.item_key), itemFromRow(r)])),
    }));
  }

  async recordSpend(e: SpendEntry): Promise<void> {
    await this.pool.query(
      `INSERT INTO content_budget_ledger (run_id, provider, tier, model, unit, stage, input_tokens, cached_input_tokens, output_tokens, cost_paise, simulated)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [e.run_id, e.provider, e.tier, e.model, e.unit, e.stage, e.usage.input_tokens, e.usage.cached_input_tokens, e.usage.output_tokens, e.cost_paise, e.simulated],
    );
  }

  async spentPaise(filter: { provider?: string; simulated?: boolean; runId?: string } = {}): Promise<number> {
    const where: string[] = [];
    const args: unknown[] = [];
    if (filter.provider) where.push(`provider = $${args.push(filter.provider)}`);
    if (filter.simulated !== undefined) where.push(`simulated = $${args.push(filter.simulated)}`);
    if (filter.runId) where.push(`run_id = $${args.push(filter.runId)}`);
    const { rows } = await this.pool.query(`SELECT coalesce(sum(cost_paise), 0) AS s FROM content_budget_ledger ${where.length ? `WHERE ${where.join(' AND ')}` : ''}`, args);
    return num(rows[0]?.s);
  }

  async budgetFor(run: RunRecord, caps: { run: number; total: number }, simulated: boolean): Promise<BudgetLedger> {
    return new PgBudget(this.pool, run.id, caps, simulated);
  }

  /** The real-money cap configured in Postgres (content_budget view ← config_values CONTENT_BUDGET_INR), or null. */
  async configuredTotalCapPaise(): Promise<number | null> {
    const { rows } = await this.pool.query('SELECT cap_paise FROM content_budget');
    return rows[0]?.cap_paise === null || rows[0]?.cap_paise === undefined ? null : num(rows[0].cap_paise);
  }
}

/**
 * Budget reservations shared by every run through Postgres. reserve() locks all running runs
 * (and this run) FOR UPDATE, so concurrent reservers serialise and see each other's reservations.
 */
export class PgBudget implements BudgetLedger {
  private next = 1;
  constructor(
    private readonly pool: pg.Pool,
    readonly runId: string,
    private readonly caps: { run: number; total: number },
    private readonly simulated: boolean,
  ) {}

  private async tx<T>(fn: (c: pg.PoolClient) => Promise<T>): Promise<T> {
    const c = await this.pool.connect();
    try {
      await c.query('BEGIN');
      const out = await fn(c);
      await c.query('COMMIT');
      return out;
    } catch (e) {
      await c.query('ROLLBACK').catch(() => undefined);
      throw e;
    } finally {
      c.release();
    }
  }

  async reserve(paise: number): Promise<Reservation> {
    if (!(paise >= 0)) throw new Error(`invalid reservation ${paise}`);
    return this.tx(async (c) => {
      const { rows: locked } = await c.query(
        `SELECT id, provider, spent_paise, reserved_paise FROM pipeline_runs WHERE status = 'running' OR id = $1 ORDER BY id FOR UPDATE`,
        [this.runId],
      );
      const own = locked.find((r) => r.id === this.runId);
      if (!own) throw new Error(`no run ${this.runId}`);
      const sameMoney = (r: Row) => (r.provider === 'mock') === this.simulated;
      const reserved = locked.filter(sameMoney).reduce((s, r) => s + num(r.reserved_paise), 0);
      const { rows: spentRows } = await c.query('SELECT coalesce(sum(cost_paise), 0) AS s FROM content_budget_ledger WHERE simulated = $1', [this.simulated]);
      const spentTotal = num(spentRows[0]?.s);
      let totalCap = this.caps.total;
      if (!this.simulated) {
        const { rows: cap } = await c.query('SELECT cap_paise FROM content_budget');
        if (cap[0]?.cap_paise !== null && cap[0]?.cap_paise !== undefined) totalCap = num(cap[0].cap_paise);
      }
      const runCommitted = num(own.spent_paise) + num(own.reserved_paise);
      if (runCommitted + paise > this.caps.run) throw new BudgetExceededError('run', this.caps.run, runCommitted, paise);
      if (spentTotal + reserved + paise > totalCap) throw new BudgetExceededError('total', totalCap, spentTotal + reserved, paise);
      await c.query('UPDATE pipeline_runs SET reserved_paise = reserved_paise + $2 WHERE id = $1', [this.runId, paise]);
      return { id: this.next++, paise };
    });
  }

  async settle(r: Reservation, actualPaise: number): Promise<void> {
    await this.pool.query('UPDATE pipeline_runs SET reserved_paise = GREATEST(reserved_paise - $2, 0), spent_paise = spent_paise + $3 WHERE id = $1', [this.runId, r.paise, actualPaise]);
  }

  async release(r: Reservation): Promise<void> {
    await this.pool.query('UPDATE pipeline_runs SET reserved_paise = GREATEST(reserved_paise - $2, 0) WHERE id = $1', [this.runId, r.paise]);
  }

  async record(paise: number): Promise<void> {
    await this.pool.query('UPDATE pipeline_runs SET spent_paise = spent_paise + $2 WHERE id = $1', [this.runId, paise]);
  }
}
