/** GET /v1/coins: balance, today's earnings against the cap, check-in streak, milestone progress. */
import { and, eq, sql } from 'drizzle-orm';
import { coinLedger, coinWallets, istDay, type Database } from '@soyl/db';
import { COIN_DAILY_CAP, COIN_EARN } from '@soyl/shared/config/coins';
import { nextIstMidnight } from '../../ai/time';
import { checkInView, eligibilityStats } from './awards';
import { balanceOf } from './ledger';

export async function coinsSummary(db: Database, now: Date, userId: string) {
  const day = istDay(now);
  const [[w], balance, stats, [today], [life]] = await Promise.all([
    db.select().from(coinWallets).where(eq(coinWallets.userId, userId)),
    balanceOf(db, userId),
    eligibilityStats(db, userId),
    db
      .select({
        capped: sql<number>`coalesce(sum(${coinLedger.amount}) FILTER (WHERE ${coinLedger.capped}), 0)::int`,
        total: sql<number>`coalesce(sum(${coinLedger.amount}), 0)::int`,
      })
      .from(coinLedger)
      .where(and(eq(coinLedger.userId, userId), eq(coinLedger.istDay, day), eq(coinLedger.kind, 'earn'))),
    db.select({ n: sql<number>`coalesce(sum(${coinLedger.amount}), 0)::int` }).from(coinLedger).where(and(eq(coinLedger.userId, userId), eq(coinLedger.kind, 'earn'))),
  ]);
  const ci = checkInView(w, day);
  // The next check-in (today's if not done yet, else tomorrow's) makes the streak current + 1.
  const base = ci.current;
  const nextStreak = base + 1;
  const bonus = [...COIN_EARN.checkInStreakBonuses]
    .map((b) => {
      const target = Math.ceil(nextStreak / b.everyDays) * b.everyDays;
      return { everyDays: b.everyDays, coins: b.coins, inDays: target - base };
    })
    .sort((a, b) => a.inDays - b.inDays || b.coins - a.coins)[0];
  const milestones = COIN_EARN.solvedMilestones.map((m) => ({ solved: m.solved, coins: m.coins, reached: stats.solved >= m.solved }));
  const earnedCapped = Number(today?.capped ?? 0);
  return {
    balance,
    lifetimeEarned: Number(life?.n ?? 0),
    today: {
      day,
      earnedCapped,
      cap: COIN_DAILY_CAP,
      remaining: Math.max(0, COIN_DAILY_CAP - earnedCapped),
      earnedTotal: Number(today?.total ?? 0),
      resetsAt: nextIstMidnight(now).toISOString(),
    },
    checkIn: {
      checkedInToday: ci.checkedInToday,
      current: ci.current,
      longest: ci.longest,
      coins: COIN_EARN.dailyCheckIn,
      nextBonus: bonus ?? null,
    },
    solved: { count: stats.solved, milestones, next: milestones.find((m) => !m.reached) ?? null },
    chaptersMastered: stats.chaptersMastered,
    equipped: { frame: w?.equippedFrame ?? null, theme: w?.equippedTheme ?? null },
  };
}
