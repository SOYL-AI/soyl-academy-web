/**
 * SOYL Coins jobs (D-037, ADR-020). The logic lives in @soyl/api (domain/coins) so the API and the
 * worker share one implementation; both handlers are idempotent and safe to re-run.
 *
 * - coins.live-rank-awards  every 15 minutes: rank coins for live All-India mocks whose results were
 *                           published in the last COIN_EARN.liveRankAwardWindowDays, to ranked students
 *                           with consent `granted` (D-014). Keys `live_rank:<user>:<event>` make re-runs free.
 * - coins.housekeeping      daily 21:15 UTC (02:45 IST): erase shipping addresses of merch shipped more
 *                           than COIN_STORE.addressRetentionDaysAfterFulfilment days ago; cancel (and
 *                           refund) merch requests left without an address for COIN_STORE.addressDeadlineDays.
 */
import { awardLiveRanks, type LiveRankAwardResult } from '@soyl/api/coins/awards';
import { coinsHousekeeping } from '@soyl/api/coins/store';
import { defineJob, type JobDefinition, type JobQueueOptions } from './registry';

export const COINS_JOB_NAMES = {
  liveRankAwards: 'coins.live-rank-awards',
  housekeeping: 'coins.housekeeping',
} as const;

const COINS_QUEUE: JobQueueOptions = {
  policy: 'stately',
  retryLimit: 3,
  retryDelay: 60,
  retryBackoff: true,
  retryDelayMax: 3600,
  expireInSeconds: 15 * 60,
  deleteAfterSeconds: 7 * 86_400,
};

export type CoinsHousekeepingResult = Awaited<ReturnType<typeof coinsHousekeeping>>;

export function coinsJobs(): JobDefinition[] {
  return [
    defineJob<unknown, LiveRankAwardResult>({
      name: COINS_JOB_NAMES.liveRankAwards,
      description: 'Live-mock rank coins for consenting students after results are published (ADR-020)',
      cron: '*/15 * * * *',
      options: COINS_QUEUE,
      handler: (ctx) => awardLiveRanks(ctx.db, ctx.now),
    }),
    defineJob<unknown, CoinsHousekeepingResult>({
      name: COINS_JOB_NAMES.housekeeping,
      description: 'Erase shipped merch addresses after retention; cancel merch requests without an address (ADR-020, PII.md)',
      cron: '15 21 * * *',
      options: COINS_QUEUE,
      handler: (ctx) => coinsHousekeeping(ctx.db, ctx.now),
    }),
  ] as JobDefinition[];
}
