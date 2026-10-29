/**
 * Coins an event paid (practice answer, test submit; ADR-021): one polite toast (the toast region is an
 * aria-live status) and the header chip updated. Nothing for 0-coin events, except a one-line note when
 * an award was cut to 0 by today's limit.
 */
import type { CoinAward } from '@/platform/shared/api-client';
import { CAP_NOTE, summariseAwards } from './coins-format';

interface ToastLike {
  show: (o: { title: string; description?: string; tone?: 'neutral' | 'success' | 'danger' }) => number;
}
interface CoinsLike {
  addEarned: (coins: number) => void;
}

export function announceCoins(coinsAwarded: number | undefined, awards: readonly CoinAward[] | undefined, toast: ToastLike, coins: CoinsLike | null): void {
  const sum = summariseAwards(awards);
  const total = coinsAwarded ?? sum.total;
  if (total > 0) {
    coins?.addEarned(total);
    toast.show({ title: 'SOYL Coins earned', description: `${sum.text ?? `+${total}`}${sum.capped ? '. Today’s coin limit reached.' : ''}`, tone: 'success' });
  } else if (sum.capped) {
    toast.show({ title: 'Today’s coin limit reached', description: CAP_NOTE });
  }
}
