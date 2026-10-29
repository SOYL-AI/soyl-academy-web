/**
 * Coin amounts and award lines (ADR-021), split from coins-logic.ts so the header chip, toasts and the test player
 * can format coins without loading the store catalogue and address rules (JS budget, design-system 2026-10-29).
 * Import-free apart from types.
 */
import type { CoinAward, CoinLedgerSource } from '@/platform/shared/api-client';

/** Short names for ledger sources ("+5 coins: daily challenge"). */
export const SOURCE_LABELS: Record<CoinLedgerSource, string> = {
  checkin: 'daily check-in',
  checkin_streak: 'check-in streak bonus',
  daily_challenge: 'daily challenge',
  solved_milestone: 'practice milestone',
  chapter_mastered: 'chapter mastered',
  test_submitted: 'test finished',
  perfect_paper: 'perfect paper',
  live_participation: 'live mock',
  live_rank: 'live mock rank',
  league_promotion: 'league promotion',
  league_top_finish: 'league top finish',
  redemption: 'store',
  admin: 'adjustment by SOYL',
};

export function coinsText(n: number): string {
  return `${n.toLocaleString('en-IN')} ${Math.abs(n) === 1 ? 'coin' : 'coins'}`;
}

export interface AwardSummary {
  /** Coins actually paid. */
  total: number;
  /** "+5 coins: daily challenge · +1 coin: daily check-in", or null when nothing was paid. */
  text: string | null;
  /** True when an award was cut by today's cap (the cap note should be shown). */
  capped: boolean;
}

/** What a practice answer / test submit / check-in paid, as one line for a toast or an inline note. */
export function summariseAwards(awards: readonly CoinAward[] | null | undefined): AwardSummary {
  const list = awards ?? [];
  const paid = list.filter((a) => a.amount > 0);
  const total = paid.reduce((n, a) => n + a.amount, 0);
  const text = paid.length ? paid.map((a) => `+${coinsText(a.amount)}: ${SOURCE_LABELS[a.source] ?? a.source}`).join(' · ') : null;
  return { total, text, capped: list.some((a) => a.cappedOut) };
}

export const CAP_NOTE = 'You reached today’s coin limit. Milestones still count; more coins tomorrow.';

/** "3d 4h", "5h 12m", "12m", "<1m". */
export function formatSpan(ms: number): string {
  if (ms <= 0) return '0m';
  const totalMin = Math.floor(ms / 60_000);
  if (totalMin < 1) return '<1m';
  const d = Math.floor(totalMin / 1440);
  const h = Math.floor((totalMin % 1440) / 60);
  const m = totalMin % 60;
  if (d > 0) return `${d}d ${h}h`;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}
