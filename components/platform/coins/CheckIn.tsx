'use client';

/**
 * Daily check-in (ADR-020 §2): an explicit button, once per IST day (signing in alone earns nothing).
 * Shows the streak, the next streak bonus and, after checking in, what it paid (announced politely).
 */
import { useState } from 'react';
import type { CoinCheckIn } from '@/platform/shared/api-client';
import { COIN_EARN } from '@/platform/shared/config/coins';
import { Button } from '@/components/platform/ui/kit/Button';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { cx } from '@/components/platform/ui/cx';
import { api } from '../lib/api-browser';
import { coinsProblemMessage, coinsText, summariseAwards } from './coins-logic';
import { useCoins } from './CoinsProvider';
import s from './coins.module.css';

export function CheckIn({ compact = false }: { compact?: boolean }) {
  const { summary, setBalance, refresh } = useCoins();
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<CoinCheckIn | null>(null);
  const [error, setError] = useState<string | null>(null);
  if (!summary) return null;

  const ci = summary.checkIn;
  const done = ci.checkedInToday || (result !== null && result.day === summary.today.day);
  const streak = result ? result.streak : ci.current;
  const longest = result ? result.longest : ci.longest;
  const paid = result ? summariseAwards(result.awards) : null;

  const checkIn = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await api.post('/v1/coins/check-in', { body: {} });
      setResult(res);
      setBalance(res.balance);
      void refresh();
    } catch (err) {
      setError(coinsProblemMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={cx(s.checkIn, compact && s.checkInCompact)} data-testid="check-in" data-checked-in={done ? 'true' : 'false'}>
      <div className={s.checkInRow}>
        <Button
          size={compact ? 'sm' : 'md'}
          variant={done ? 'secondary' : 'primary'}
          icon={done ? 'check' : 'coin'}
          disabled={done}
          loading={busy}
          onClick={() => void checkIn()}
          data-testid="check-in-button"
        >
          {done ? 'Checked in today' : `Check in (+${coinsText(COIN_EARN.dailyCheckIn)})`}
        </Button>
        <span className={s.streak} data-testid="check-in-streak">
          <Icon name="flame" size={18} className={s.flameIcon} />
          <span>
            {streak}-day streak{longest > streak ? ` · best ${longest}` : ''}
          </span>
        </span>
      </div>
      {ci.nextBonus && !result && (
        <p className={s.small}>
          {ci.nextBonus.inDays <= 1 ? `Check in today for a +${coinsText(ci.nextBonus.coins)} streak bonus.` : `+${coinsText(ci.nextBonus.coins)} streak bonus in ${ci.nextBonus.inDays} check-ins.`}
        </p>
      )}
      <p className={s.small} role="status" aria-live="polite" data-testid="check-in-result">
        {paid?.text ?? (result?.alreadyCheckedIn ? 'You already checked in today.' : '')}
        {paid?.capped ? ' You reached today’s coin limit.' : ''}
      </p>
      {error && (
        <p className={s.errorText} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
