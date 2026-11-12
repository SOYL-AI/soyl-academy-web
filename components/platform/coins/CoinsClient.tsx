'use client';

/**
 * /coins (ADR-021; design language v3, ADR-032): the balance hero (a yellow card with the check-in), today against
 * the daily cap (resets at 00:00 IST), practice milestones, the ways to earn (from `howToEarn()`, the config's
 * single source of truth) and the paged coin history as a table. Coins are earned by learning only: never
 * bought, transferred or cashed.
 */
import { useCallback, useEffect, useState } from 'react';
import type { CoinHistoryEntry } from '@/platform/shared/api-client';
import { COIN_DAILY_CAP, howToEarn } from '@/platform/shared/config/coins';
import { Button } from '@/components/platform/ui/kit/Button';
import { ButtonLink } from '@/components/platform/ui/kit/ButtonLink';
import { Card, EmptyState, ProgressBar, Skeleton } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { DataTable, dataTableNum, List, ListRow, StatusPill } from '@/components/platform/ui/kit/Lists';
import { PageSection } from '@/components/platform/ui/kit/Page';
import { RailCard } from '@/components/platform/ui/kit/Rail';
import { IconTile } from '@/components/platform/ui/kit/Tiles';
import { cx } from '@/components/platform/ui/cx';
import { useSession } from '../auth/SessionProvider';
import { useStage } from '../shell/StageProvider';
import { api } from '../lib/api-browser';
import { CheckIn } from './CheckIn';
import { coinsProblemMessage, coinsText, earnVisual, formatSpan, historyRow } from './coins-logic';
import { useCoins } from './CoinsProvider';
import { useNow } from './useNow';
import s from './coins.module.css';

const HISTORY_PAGE = 20;

/** "Ways to earn": one row per source from the config, the coins written out, "Daily limit" as a pill. */
export function HowToEarn() {
  const rows = howToEarn();
  return (
    <PageSection
      id="earn-title"
      title="Ways to earn"
      description={`Coins are earned by learning, never bought. Sources marked “Daily limit” share a limit of ${coinsText(COIN_DAILY_CAP)} a day; milestones and ranks are on top.`}
      data-testid="how-to-earn"
    >
      <List label="Ways to earn SOYL Coins">
        {rows.map((r) => {
          const v = earnVisual(r.key);
          return (
            <ListRow
              key={r.key}
              leading={<IconTile icon={v.icon} tint={v.tint} size="sm" />}
              title={r.label}
              meta={
                <span className={s.earnMeta}>
                  <span className={s.earnCoins}>
                    <Icon name="coin" size={16} className={s.coinIcon} />
                    {r.coins}
                    <span className="p-visually-hidden"> {r.coins === '1' ? 'coin' : 'coins'}</span>
                  </span>
                  {r.capped && <StatusPill>Daily limit</StatusPill>}
                </span>
              }
            />
          );
        })}
      </List>
    </PageSection>
  );
}

function History() {
  const { pick } = useStage();
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
    <PageSection id="history-title" title="History" data-testid="coin-history">
      {error && (
        <p className={s.errorText} role="alert">
          {error}{' '}
          <Button variant="secondary" onClick={() => void load(null)}>
            Try again
          </Button>
        </p>
      )}
      {entries === null && !error && <Skeleton lines={3} />}
      {entries && entries.length === 0 && (
        <EmptyState title={pick({ junior: 'No coins yet: your first ones are one tap away', middle: 'No coins yet', senior: 'No coins yet' })} icon="coin" tint="yellow" compact>
          Check in or solve today’s challenge to earn your first ones.
        </EmptyState>
      )}
      {entries && entries.length > 0 && (
        <DataTable caption="Coin history" hideCaption>
          <thead>
            <tr>
              <th scope="col">What</th>
              <th scope="col" className={dataTableNum}>
                Coins
              </th>
              <th scope="col" className={dataTableNum}>
                Balance
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => {
              const r = historyRow(e);
              return (
                <tr key={e.id} data-testid="coin-history-row" data-source={e.source}>
                  <th scope="row">
                    <span className={s.historyWhat}>
                      <span className={s.historyLabel}>{r.label}</span>
                      <span className={s.small}>
                        {r.date}
                        {r.note ? ` · ${r.note}` : ''}
                      </span>
                    </span>
                  </th>
                  <td className={cx(dataTableNum, s.historyAmount, r.tone === 'plus' && s.plus, r.tone === 'minus' && s.minus)}>{r.amountText}</td>
                  <td className={dataTableNum}>{r.balanceText}</td>
                </tr>
              );
            })}
          </tbody>
        </DataTable>
      )}
      {cursor && (
        <div>
          <Button variant="secondary" loading={busy} onClick={() => void load(cursor)} data-testid="history-more">
            Show older
          </Button>
        </div>
      )}
    </PageSection>
  );
}

export function CoinsClient() {
  const { state, openLogin } = useSession();
  const { summary, refresh } = useCoins();
  const { pick } = useStage();
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
        <Card tint="yellow">
          <EmptyState
            title="Log in to earn SOYL Coins"
            headingLevel="h2"
            icon="coin"
            tint="yellow"
            compact
            action={<Button onClick={() => openLogin({ reason: 'Log in to check in, solve the daily challenge and earn SOYL Coins. It is free.' })}>Log in</Button>}
          >
            Coins come from learning: daily check-ins, the daily challenge, practice milestones and tests. Exclusive rewards to redeem them for are coming soon.
          </EmptyState>
        </Card>
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
      <div aria-busy="true" aria-label="Loading your coins" className={s.stack}>
        <Skeleton variant="block" height={180} />
      </div>
    );
  }

  const t = summary.today;
  const resetIn = now !== null ? formatSpan(Date.parse(t.resetsAt) - now) : null;
  const next = summary.solved.next;
  const prevMark = [...summary.solved.milestones].filter((m) => m.reached).pop()?.solved ?? 0;

  return (
    <div className={s.stack} data-testid="coins-page">
      <Card as="section" tint="yellow" className={s.hero} aria-labelledby="balance-title">
        <h2 id="balance-title" className="p-visually-hidden">
          Your balance
        </h2>
        <div className={s.heroTop}>
          <IconTile icon="coin" tint="yellow" size="lg" inverse />
          <div className={s.heroText}>
            <p className={s.heroBalance} data-testid="coins-balance" data-balance={summary.balance}>
              <span className={s.heroNumber}>{summary.balance.toLocaleString('en-IN')}</span>
              <span className={s.heroUnit}>{summary.balance === 1 ? 'coin' : 'coins'}</span>
            </p>
            <p className={s.heroMeta}>
              {coinsText(summary.lifetimeEarned)} earned in all · {summary.chaptersMastered} {summary.chaptersMastered === 1 ? 'chapter' : 'chapters'} mastered
            </p>
            <p className={s.heroMeta}>{pick({ junior: 'Every coin here came from learning. Keep it up.', middle: 'Earned by learning, never bought.', senior: 'Earned by learning only, never bought.' })}</p>
          </div>
        </div>
        <CheckIn />
        <div className={s.heroFoot}>
          <ButtonLink href="/store" variant="soft" icon="gift" data-testid="store-link">
            Exclusive rewards: coming soon
          </ButtonLink>
        </div>
      </Card>

      <div className={s.duo}>
        <RailCard
          id="today-title"
          title="Today"
          data-testid="coins-today"
          aside={<StatusPill tone={t.remaining === 0 ? 'success' : 'neutral'}>{t.remaining === 0 ? 'Limit reached' : `${t.earnedCapped} of ${t.cap}`}</StatusPill>}
        >
          <ProgressBar label="Coins from daily sources" value={t.earnedCapped} max={t.cap} valueText={`${t.earnedCapped} of ${t.cap}`} tone={t.remaining === 0 ? 'success' : 'accent'} />
          <p className={s.small}>
            {t.remaining > 0 ? `${coinsText(t.remaining)} left from daily sources today.` : 'You reached today’s limit from daily sources. Milestones still count.'}{' '}
            {t.earnedTotal > t.earnedCapped ? `${coinsText(t.earnedTotal)} earned today in all. ` : ''}
            Resets at midnight IST{resetIn ? ` (in ${resetIn})` : ''}.
          </p>
        </RailCard>

        <RailCard id="milestones-title" title="Practice milestones" data-testid="coins-milestones">
          <p className={s.small}>Different practice questions answered right first time: {summary.solved.count.toLocaleString('en-IN')}.</p>
          {next && (
            <ProgressBar
              label={`Next: ${next.solved} solved (+${coinsText(next.coins)})`}
              value={summary.solved.count - prevMark}
              max={next.solved - prevMark}
              valueText={`${summary.solved.count} of ${next.solved}`}
            />
          )}
          <List label="Milestones" inset>
            {summary.solved.milestones.map((m) => (
              <ListRow
                key={m.solved}
                className={cx(s.milestone, m.reached && s.milestoneDone)}
                leading={<IconTile icon={m.reached ? 'check' : 'lock'} tint={m.reached ? 'green' : 'neutral'} size="sm" />}
                title={`${m.solved.toLocaleString('en-IN')} solved`}
                meta={`+${coinsText(m.coins)}`}
                trailing={m.reached ? <StatusPill tone="success">Reached</StatusPill> : undefined}
              />
            ))}
          </List>
        </RailCard>
      </div>

      <HowToEarn />
      <History />
      <p className={s.small}>SOYL Coins have no cash value. They cannot be bought, sold, transferred or turned into AI credits.</p>
    </div>
  );
}
