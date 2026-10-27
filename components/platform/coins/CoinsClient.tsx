'use client';

/**
 * /coins (ADR-020): balance, today against the daily cap (resets at 00:00 IST), the daily check-in,
 * how to earn (from `howToEarn()`, the config's single source of truth), practice milestones and the
 * paged coin history. Coins are earned by learning only: never bought, transferred or cashed.
 */
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import type { CoinHistoryEntry } from '@/platform/shared/api-client';
import { COIN_DAILY_CAP, howToEarn } from '@/platform/shared/config/coins';
import { Button } from '@/components/platform/ui/kit/Button';
import { Badge, Card, CardTitle, EmptyState, ProgressBar, Skeleton } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { cx } from '@/components/platform/ui/cx';
import { useSession } from '../auth/SessionProvider';
import { api } from '../lib/api-browser';
import { CheckIn } from './CheckIn';
import { coinsProblemMessage, coinsText, formatSpan, istDate, SOURCE_LABELS } from './coins-logic';
import { useCoins } from './CoinsProvider';
import { useNow } from './useNow';
import s from './coins.module.css';

const HISTORY_PAGE = 20;
const sentence = (t: string) => t.charAt(0).toLocaleUpperCase('en-IN') + t.slice(1);

export function HowToEarn() {
  const rows = howToEarn();
  return (
    <Card as="section" aria-labelledby="earn-title" data-testid="how-to-earn">
      <CardTitle as="h2" id="earn-title">
        How to earn
      </CardTitle>
      <p className={s.muted}>
        Coins are earned by learning, never bought. Sources marked “daily limit” share a limit of {coinsText(COIN_DAILY_CAP)} a day; milestones and ranks are on top.
      </p>
      <ul className={s.earnList}>
        {rows.map((r) => (
          <li key={r.key} className={s.earnRow}>
            <span className={s.earnLabel}>{r.label}</span>
            <span className={s.earnCoins}>
              <Icon name="coin" size={16} className={s.coinIcon} />
              {r.coins}
              {r.capped && <span className={s.capTag}>daily limit</span>}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function History() {
  const [entries, setEntries] = useState<CoinHistoryEntry[] | null>(null);
  const [cursor, setCursor] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (after: string | null) => {
    setBusy(true);
    setError(null);
    try {
      const page = await api.get('/v1/coins/history', { query: { limit: HISTORY_PAGE, ...(after ? { cursor: after } : {}) } });
      setEntries((prev) => (after && prev ? [...prev, ...page.entries.filter((e) => !prev.some((p) => p.id === e.id))] : page.entries));
      setCursor(page.nextCursor);
    } catch (err) {
      setError(coinsProblemMessage(err));
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- first page on mount
    void load(null);
  }, [load]);

  return (
    <Card as="section" aria-labelledby="history-title" data-testid="coin-history">
      <CardTitle as="h2" id="history-title">
        History
      </CardTitle>
      {error && (
        <p className={s.errorText} role="alert">
          {error}{' '}
          <Button size="sm" variant="secondary" onClick={() => void load(null)}>
            Try again
          </Button>
        </p>
      )}
      {entries === null && !error && <Skeleton lines={3} />}
      {entries && entries.length === 0 && <p className={s.muted}>No coins yet. Check in or solve today’s challenge to earn your first ones.</p>}
      {entries && entries.length > 0 && (
        <ul className={s.historyList}>
          {entries.map((e) => (
            <li key={e.id} className={s.historyRow} data-testid="coin-history-row" data-source={e.source}>
              <span className={s.historyMain}>
                <span className={s.historyLabel}>{e.kind === 'refund' ? 'Coins returned' : sentence(SOURCE_LABELS[e.source] ?? e.source)}</span>
                <span className={s.small}>
                  {istDate(e.createdAt)} · balance {e.balanceAfter.toLocaleString('en-IN')}
                  {e.cappedOut ? ' · daily limit reached' : ''}
                </span>
              </span>
              <span className={cx(s.historyAmount, e.amount > 0 ? s.plus : e.amount < 0 ? s.minus : undefined)}>
                {e.amount > 0 ? '+' : ''}
                {e.amount.toLocaleString('en-IN')}
              </span>
            </li>
          ))}
        </ul>
      )}
      {cursor && (
        <Button variant="secondary" size="sm" loading={busy} onClick={() => void load(cursor)} data-testid="history-more">
          Show older
        </Button>
      )}
    </Card>
  );
}

export function CoinsClient() {
  const { state, openLogin } = useSession();
  const { summary, refresh } = useCoins();
  const now = useNow();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (state.status !== 'member' || summary) return;
    let alive = true;
    const t = window.setTimeout(() => {
      void refresh().then((c) => alive && setFailed(c === null));
    }, 4000);
    return () => {
      alive = false;
      window.clearTimeout(t);
    };
  }, [state.status, summary, refresh]);

  if (state.status === 'loading') return <Skeleton lines={4} />;
  if (state.status === 'guest') {
    return (
      <div className={s.stack}>
        <EmptyState
          title="Log in to earn SOYL Coins"
          headingLevel="h2"
          icon="coin"
          action={<Button onClick={() => openLogin({ reason: 'Log in to check in, solve the daily challenge and earn SOYL Coins. It is free.' })}>Log in</Button>}
        >
          Coins come from learning: daily check-ins, the daily challenge, practice milestones and tests. Spend them in the SOYL Store.
        </EmptyState>
        <HowToEarn />
      </div>
    );
  }
  if (!summary) {
    return failed ? (
      <EmptyState title="Could not load your coins" headingLevel="h2" icon="alert" action={<Button onClick={() => void refresh().then((c) => setFailed(c === null))}>Try again</Button>}>
        Check your connection and try again.
      </EmptyState>
    ) : (
      <div aria-busy="true" aria-label="Loading your coins">
        <Skeleton variant="block" height={140} />
      </div>
    );
  }

  const t = summary.today;
  const resetIn = now !== null ? formatSpan(Date.parse(t.resetsAt) - now) : null;
  const next = summary.solved.next;
  const prevMark = [...summary.solved.milestones].filter((m) => m.reached).pop()?.solved ?? 0;

  return (
    <div className={s.stack} data-testid="coins-page">
      <section className={s.hero} aria-labelledby="balance-title">
        <h2 id="balance-title" className="p-visually-hidden">
          Your balance
        </h2>
        <p className={s.heroBalance} data-testid="coins-balance" data-balance={summary.balance}>
          <Icon name="coin" size={34} className={s.heroCoin} />
          <span>{summary.balance.toLocaleString('en-IN')}</span>
          <span className={s.heroUnit}>{summary.balance === 1 ? 'coin' : 'coins'}</span>
        </p>
        <p className={s.heroMeta}>
          {coinsText(summary.lifetimeEarned)} earned in all · {summary.chaptersMastered} {summary.chaptersMastered === 1 ? 'chapter' : 'chapters'} mastered
        </p>
        <Link href="/store" className={s.heroLink} data-testid="store-link">
          <Icon name="gift" size={18} /> Visit the SOYL Store
        </Link>
      </section>

      <Card as="section" aria-labelledby="today-title" data-testid="coins-today">
        <CardTitle as="h2" id="today-title">
          Today
        </CardTitle>
        <ProgressBar
          label="Coins from daily sources"
          value={t.earnedCapped}
          max={t.cap}
          valueText={`${t.earnedCapped} of ${t.cap}`}
          tone={t.remaining === 0 ? 'success' : 'accent'}
        />
        <p className={s.small}>
          {t.remaining > 0 ? `${coinsText(t.remaining)} left from daily sources today.` : 'You reached today’s limit from daily sources. Milestones still count.'} {t.earnedTotal > t.earnedCapped ? `${coinsText(t.earnedTotal)} earned today in all. ` : ''}
          Resets at midnight IST{resetIn ? ` (in ${resetIn})` : ''}.
        </p>
        <CheckIn />
      </Card>

      <Card as="section" aria-labelledby="milestones-title" data-testid="coins-milestones">
        <CardTitle as="h2" id="milestones-title">
          Practice milestones
        </CardTitle>
        <p className={s.muted}>Different practice questions answered right first time: {summary.solved.count.toLocaleString('en-IN')}.</p>
        {next && (
          <ProgressBar
            label={`Next: ${next.solved} solved (+${coinsText(next.coins)})`}
            value={summary.solved.count - prevMark}
            max={next.solved - prevMark}
            valueText={`${summary.solved.count} of ${next.solved}`}
          />
        )}
        <ul className={s.milestones}>
          {summary.solved.milestones.map((m) => (
            <li key={m.solved} className={cx(s.milestone, m.reached && s.milestoneDone)}>
              {m.reached ? <Icon name="check" size={16} /> : <Icon name="lock" size={16} />}
              <span>
                {m.solved} solved · +{coinsText(m.coins)}
              </span>
              {m.reached && <Badge tone="success">Reached</Badge>}
            </li>
          ))}
        </ul>
      </Card>

      <HowToEarn />
      <History />
      <p className={s.small}>SOYL Coins have no cash value. They cannot be bought, sold, transferred or turned into AI credits.</p>
    </div>
  );
}
