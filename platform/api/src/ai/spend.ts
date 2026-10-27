/**
 * Spend circuit-breaker and alerts (ARCHITECTURE §10 "cost controls", D-015, F-009, AC-06; ADR-013).
 *
 * Every metered request adds its real INR cost (paise) to today's `ai_spend_daily` rows: scope `all`
 * and, for free-plan students, scope `free`. Before an AI action starts, the breaker reads them:
 *
 *   share = spent / cap        cap(all) = AI_DAILY_SPEND_CAP_INR, cap(free) = 60 % of it (D-015)
 *   share <  degradeAtShare    normal
 *   share >= degradeAtShare    degraded: actions with `degradeTo` run on the small tier, others pause
 *   share >= 1                 paused: AI answers "taking a break" until 00:00 IST (non-AI is unaffected)
 *
 * A free student is limited by the worse of `free` and `all`; a subscriber only by `all`, so free-tier
 * abuse cannot pause AI for paying students. The breaker recovers by itself at the IST day boundary
 * (new rows) or when the owner raises the cap.
 *
 * Alerts (50/80/100 %) fire exactly once per threshold, day and scope: the increment and the
 * `alert_level` bump are one UPDATE … RETURNING, so concurrent requests cannot announce twice.
 */
import { eq, sql } from 'drizzle-orm';
import { aiSpendDaily, type AiSpendScope, type Database } from '@soyl/db';
import { AI_SPEND } from '@soyl/shared/config/credits';
import type { Clock } from '../clock';
import { istDay } from './time';

export type BreakerStatus = 'normal' | 'degraded' | 'paused';

export interface BudgetState {
  scope: AiSpendScope;
  spentPaise: number;
  capPaise: number;
  share: number;
  status: BreakerStatus;
}

export interface BreakerState {
  status: BreakerStatus;
  /** The budget that decided the status. */
  limiting: BudgetState;
  budgets: BudgetState[];
}

export interface AiAlert {
  kind: 'spend_threshold' | 'cost_guardrail' | 'invariant';
  severity: 'info' | 'warning' | 'critical';
  message: string;
  data: Record<string, unknown>;
}

/**
 * Where alerts go. The default writes a structured log line with `alert: true` at warn/error: an
 * Application Insights (Azure Monitor) log alert on `customDimensions.alert == true` pages the owner
 * (handoff for infra). Tests use MemoryAlertSink.
 */
export interface AlertSink {
  emit(alert: AiAlert): void | Promise<void>;
}

export interface MinimalLogger {
  warn(obj: object, msg?: string): void;
  error(obj: object, msg?: string): void;
  info(obj: object, msg?: string): void;
}

export class LogAlertSink implements AlertSink {
  private log: MinimalLogger | null = null;
  attach(log: MinimalLogger): void {
    this.log = log;
  }
  emit(alert: AiAlert): void {
    const line = { alert: true, alertKind: alert.kind, severity: alert.severity, ...alert.data };
    if (!this.log) {
      console.warn(JSON.stringify({ ...line, msg: alert.message }));
      return;
    }
    if (alert.severity === 'critical') this.log.error(line, alert.message);
    else this.log.warn(line, alert.message);
  }
}

export class MemoryAlertSink implements AlertSink {
  readonly alerts: AiAlert[] = [];
  emit(alert: AiAlert): void {
    this.alerts.push(alert);
  }
}

export function statusFor(share: number): BreakerStatus {
  if (share >= 1) return 'paused';
  if (share >= AI_SPEND.degradeAtShare) return 'degraded';
  return 'normal';
}

const RANK: Record<BreakerStatus, number> = { normal: 0, degraded: 1, paused: 2 };

export class SpendBreaker {
  constructor(
    private readonly db: Database,
    private readonly clock: Clock,
    private capPaise: number,
    private readonly alerts: AlertSink,
  ) {}

  get dailyCapPaise(): number {
    return this.capPaise;
  }

  /** Owner raised/lowered the cap (config reload, tests). */
  setCapPaise(capPaise: number): void {
    this.capPaise = capPaise;
  }

  capFor(scope: AiSpendScope): number {
    return scope === 'all' ? this.capPaise : Math.round(this.capPaise * AI_SPEND.freeTierShare);
  }

  private budget(scope: AiSpendScope, spentPaise: number): BudgetState {
    const capPaise = this.capFor(scope);
    const share = capPaise > 0 ? spentPaise / capPaise : 1;
    return { scope, spentPaise, capPaise, share, status: statusFor(share) };
  }

  async state(isFreePlan: boolean, at: Date = new Date(this.clock.now())): Promise<BreakerState> {
    const rows = await this.db
      .select({ scope: aiSpendDaily.scope, spent: aiSpendDaily.spentPaise })
      .from(aiSpendDaily)
      .where(eq(aiSpendDaily.istDay, istDay(at)));
    const spent = (s: AiSpendScope) => Number(rows.find((r) => r.scope === s)?.spent ?? 0);
    const budgets = [this.budget('all', spent('all'))];
    if (isFreePlan) budgets.push(this.budget('free', spent('free')));
    const limiting = budgets.reduce((a, b) => (RANK[b.status] > RANK[a.status] || (RANK[b.status] === RANK[a.status] && b.share > a.share) ? b : a));
    return { status: limiting.status, limiting, budgets };
  }

  /** Adds metered spend; emits each newly crossed alert threshold once. */
  async record(costPaise: number, isFreePlan: boolean, at: Date = new Date(this.clock.now())): Promise<void> {
    if (!(costPaise >= 0)) return;
    const day = istDay(at);
    const scopes: AiSpendScope[] = isFreePlan ? ['all', 'free'] : ['all'];
    for (const scope of scopes) {
      const cap = this.capFor(scope);
      const thresholds = AI_SPEND.alertThresholds.map((t) => Math.round(t * cap * 10_000) / 10_000);
      // Level after the increment = number of thresholds at or below the new total.
      const levelSql = sql`(SELECT count(*)::smallint FROM unnest(${sql.raw(`ARRAY[${thresholds.join(',') || '0'}]::numeric[]`)}) AS t(v) WHERE t.v <= d.spent_paise + ${costPaise})`;
      await this.db
        .insert(aiSpendDaily)
        .values({ istDay: day, scope, spentPaise: 0, requests: 0, alertLevel: 0 })
        .onConflictDoNothing({ target: [aiSpendDaily.istDay, aiSpendDaily.scope] });
      const [row] = await this.db.execute<{ spent: string; old_level: number; new_level: number }>(sql`
        WITH prev AS (
          SELECT id, alert_level FROM ai_spend_daily WHERE ist_day = ${day} AND scope = ${scope} FOR UPDATE
        )
        UPDATE ai_spend_daily d SET
          spent_paise = d.spent_paise + ${costPaise},
          requests = d.requests + 1,
          alert_level = GREATEST(d.alert_level, ${levelSql}),
          updated_at = now()
        FROM prev WHERE d.id = prev.id
        RETURNING d.spent_paise::text AS spent, prev.alert_level AS old_level, d.alert_level AS new_level`).then((r) => r.rows);
      if (!row || row.new_level <= row.old_level) continue;
      for (let i = row.old_level; i < row.new_level; i++) {
        const threshold = AI_SPEND.alertThresholds[i]!;
        await this.alerts.emit({
          kind: 'spend_threshold',
          severity: threshold >= 1 ? 'critical' : threshold >= 0.8 ? 'warning' : 'info',
          message: `AI spend reached ${Math.round(threshold * 100)}% of the ${scope === 'all' ? 'daily' : 'free-tier daily'} budget (${day} IST)${threshold >= 1 ? ': AI is paused for ' + (scope === 'all' ? 'everyone' : 'free students') + ' until 00:00 IST' : threshold >= AI_SPEND.degradeAtShare ? ': degraded to the small model tier' : ''}.`,
          data: { scope, threshold, day, spentPaise: Number(row.spent), capPaise: cap },
        });
      }
    }
  }
}
