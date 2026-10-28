'use client';

/**
 * Super-admin analytics tabs (D-045): a date range (7/30/90 days or custom, IST days, at most 180) and
 * one section per tab, each loaded from GET /v1/admin/analytics/<tab>. Loaded lazily by AdminApp so
 * reviewers never download it. Aggregates only; nothing here identifies a student.
 */
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import type {
  AdminAnalyticsAi,
  AdminAnalyticsContent,
  AdminAnalyticsEngagement,
  AdminAnalyticsGrowth,
  AdminAnalyticsInterest,
  AdminAnalyticsOverview,
  AdminAnalyticsRetention,
  AdminAnalyticsRevenue,
  AdminSeries,
} from '@/platform/shared/api-client';
import { isApiError } from '@/platform/shared/api-client';
import { Button } from '@/components/platform/ui/kit/Button';
import { Skeleton } from '@/components/platform/ui/kit/Display';
import { api } from '../../lib/api-browser';
import { problemMessage } from '../../lib/problems';
import { BarList, DataTable, KpiTile, LineChart, Panel } from './Charts';
import {
  csvFileName,
  daySpan,
  formatCount,
  formatInr,
  formatPct,
  heatStep,
  istToday,
  presetRange,
  RANGE_PRESETS,
  rangeError,
  type AnalyticsTabId,
  type DateRange,
} from './model';
import s from './analytics.module.css';

type Data = {
  overview: AdminAnalyticsOverview;
  growth: AdminAnalyticsGrowth;
  engagement: AdminAnalyticsEngagement;
  retention: AdminAnalyticsRetention;
  ai: AdminAnalyticsAi;
  revenue: AdminAnalyticsRevenue;
  interest: AdminAnalyticsInterest;
  content: AdminAnalyticsContent;
};

const FETCH: { [K in AnalyticsTabId]: (q: DateRange) => Promise<Data[K]> } = {
  overview: (query) => api.get('/v1/admin/analytics/overview', { query }),
  growth: (query) => api.get('/v1/admin/analytics/growth', { query }),
  engagement: (query) => api.get('/v1/admin/analytics/engagement', { query }),
  retention: (query) => api.get('/v1/admin/analytics/retention', { query }),
  ai: (query) => api.get('/v1/admin/analytics/ai', { query }),
  revenue: (query) => api.get('/v1/admin/analytics/revenue', { query }),
  interest: (query) => api.get('/v1/admin/analytics/interest', { query }),
  content: (query) => api.get('/v1/admin/analytics/content', { query }),
};

export interface AnalyticsProps {
  tab: AnalyticsTabId;
  /** Kept by AdminApp so the range survives switching tabs. */
  range: DateRange;
  onRangeChange: (r: DateRange) => void;
  /** Called with `mfa_required` so AdminApp can ask for the code again. */
  onProblem: (err: unknown) => void;
}

export default function Analytics({ tab, range, onRangeChange, onProblem }: AnalyticsProps) {
  const today = istToday();
  const [data, setData] = useState<{ tab: AnalyticsTabId; key: string; value: Data[AnalyticsTabId] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const key = `${tab}:${range.from}:${range.to}`;

  const load = useCallback(async () => {
    setError(null);
    try {
      const value = await FETCH[tab](range);
      setData({ tab, key: `${tab}:${range.from}:${range.to}`, value });
    } catch (err) {
      if (isApiError(err, 'mfa_required')) onProblem(err);
      else setError(problemMessage(err));
    }
  }, [tab, range, onProblem]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- load the tab for the chosen range
    void load();
  }, [load]);

  const ready = data && data.key === key ? data : null;
  const period = `${daySpan(range.from, range.to)} days`;
  return (
    <div className={s.dash} data-testid="analytics">
      <RangePicker range={range} today={today} onChange={onRangeChange} />
      {error && (
        <p className={s.error} role="alert">
          {error}{' '}
          <Button variant="secondary" size="sm" onClick={() => void load()}>
            Try again
          </Button>
        </p>
      )}
      {!ready && !error && <Skeleton lines={6} />}
      {ready && <Section tab={ready.tab} data={ready.value} range={range} period={period} />}
    </div>
  );
}

function RangePicker({ range, today, onChange }: { range: DateRange; today: string; onChange: (r: DateRange) => void }) {
  const [custom, setCustom] = useState(false);
  const [draft, setDraft] = useState<DateRange>(range);
  const problem = custom ? rangeError(draft, today) : null;
  const active = RANGE_PRESETS.find((d) => {
    const p = presetRange(d, today);
    return !custom && p.from === range.from && p.to === range.to;
  });
  return (
    <div className={s.range}>
      <div className={s.presets} role="group" aria-label="Date range">
        {RANGE_PRESETS.map((d) => (
          <button
            key={d}
            type="button"
            className={s.preset}
            aria-pressed={active === d}
            onClick={() => {
              setCustom(false);
              onChange(presetRange(d, today));
            }}
          >
            {d} days
          </button>
        ))}
        <button type="button" className={s.preset} aria-pressed={custom} aria-expanded={custom} onClick={() => setCustom((c) => !c)}>
          Custom
        </button>
      </div>
      {custom && (
        <form
          className={s.customRange}
          onSubmit={(e) => {
            e.preventDefault();
            if (!problem) onChange(draft);
          }}
        >
          <label>
            From <input type="date" value={draft.from} max={today} onChange={(e) => setDraft({ ...draft, from: e.target.value })} className={s.input} />
          </label>
          <label>
            To <input type="date" value={draft.to} max={today} onChange={(e) => setDraft({ ...draft, to: e.target.value })} className={s.input} />
          </label>
          <Button type="submit" size="sm" disabled={problem !== null}>
            Apply
          </Button>
          {problem && <p className={s.hint}>{problem}</p>}
        </form>
      )}
      <p className={s.muted}>
        {range.from} to {range.to} · IST days · compared with the previous {daySpan(range.from, range.to)} days
      </p>
    </div>
  );
}

function Section({ tab, data, range, period }: { tab: AnalyticsTabId; data: Data[AnalyticsTabId]; range: DateRange; period: string }) {
  const name = (n: string) => csvFileName(n, range);
  switch (tab) {
    case 'overview':
      return <Overview d={data as AdminAnalyticsOverview} name={name} period={period} />;
    case 'growth':
      return <Growth d={data as AdminAnalyticsGrowth} name={name} />;
    case 'engagement':
      return <Engagement d={data as AdminAnalyticsEngagement} name={name} />;
    case 'retention':
      return <Retention d={data as AdminAnalyticsRetention} name={name} />;
    case 'ai':
      return <Ai d={data as AdminAnalyticsAi} name={name} />;
    case 'revenue':
      return <Revenue d={data as AdminAnalyticsRevenue} name={name} />;
    case 'interest':
      return <Interest d={data as AdminAnalyticsInterest} name={name} />;
    case 'content':
      return <Content d={data as AdminAnalyticsContent} name={name} />;
  }
}

type Named = { name: (n: string) => string };

function Stat({ label, value, note }: { label: string; value: ReactNode; note?: string }) {
  return (
    <div className={s.kpi}>
      <p className={s.kpiLabel}>{label}</p>
      <p className={s.kpiValue}>{value}</p>
      {note && <p className={s.muted}>{note}</p>}
    </div>
  );
}

const sum = (x: AdminSeries) => x.points.reduce((a, p) => a + p.value, 0);

function Overview({ d, name, period }: { d: AdminAnalyticsOverview; period: string } & Named) {
  return (
    <>
      <div className={s.kpis}>
        {d.kpis.map((k) => (
          <KpiTile key={k.key} kpi={k} periodLabel={period} />
        ))}
      </div>
      <Panel title="New sign-ups">
        <LineChart title="New sign-ups per day" series={[d.signups]} csvName={name('signups')} />
      </Panel>
      <Panel title="Daily active students">
        <LineChart title="Daily active students (any learning activity)" series={[d.dau]} csvName={name('dau')} />
      </Panel>
    </>
  );
}

function Growth({ d, name }: { d: AdminAnalyticsGrowth } & Named) {
  return (
    <>
      <div className={s.kpis}>
        <Stat label="Total students" value={formatCount(d.totalUsers)} />
        <Stat label="New sign-ups" value={formatCount(d.signupsByMethod.reduce((a, x) => a + sum(x), 0))} />
        <Stat label="Schools added by students" value={formatCount(d.schoolsAdded)} />
        <Stat label="Guest progress merged" value={formatCount(sum(d.guestMerges))} />
      </div>
      <Panel title="Sign-ups by method">
        <LineChart title="Sign-ups per day by sign-in method" series={d.signupsByMethod} csvName={name('signups-by-method')} />
        <p className={s.muted}>Method is inferred from the account (Google identity, phone-only, else email).</p>
      </Panel>
      <Panel title="Sign-ups by week">
        <DataTable
          caption="Sign-ups per IST week (Monday)"
          header={['week', 'email', 'phone', 'google', 'total']}
          rows={d.signupsByWeek.map((w) => [w.week, w.email, w.phone, w.google, w.total])}
          csvName={name('signups-by-week')}
          numeric={[1, 2, 3, 4]}
        />
      </Panel>
      <div className={s.grid2}>
        <BarList title="Consent status (all students now)" items={d.consentFunnel} csvName={name('consent')} />
        <BarList title="Sign-up counter (server-observed)" items={d.signupCounter} csvName={name('signup-counter')} empty="No sign-ups counted in this range." />
        <BarList title="Board" items={d.boards} csvName={name('boards')} />
        <BarList title="Class" items={d.classes} csvName={name('classes')} />
      </div>
    </>
  );
}

function Engagement({ d, name }: { d: AdminAnalyticsEngagement } & Named) {
  const pick = (keys: string[]) => d.activity.filter((x) => keys.includes(x.key));
  const top = (rows: AdminAnalyticsEngagement['topChapters']) => rows.map((r) => [r.label, r.practiceAnswers, r.lessonsOpened, r.total]);
  return (
    <>
      <div className={s.kpis}>
        <Stat label="Active students" value={formatCount(d.activeUsers)} />
        <Stat label="Weekly active (7 days to the end date)" value={formatCount(d.wau)} />
        <Stat label="Monthly active (30 days to the end date)" value={formatCount(d.mau)} />
        <Stat label="Stickiness (DAU ÷ MAU)" value={formatPct(d.stickiness)} />
      </div>
      <Panel title="Daily active students">
        <LineChart title="Daily active students" series={[d.dau]} csvName={name('dau')} />
      </Panel>
      <Panel title="Lessons and practice">
        <LineChart title="Lessons and practice per day" series={pick(['lessons_opened', 'lessons_completed', 'practice_answers', 'practice_solved'])} csvName={name('learning')} />
      </Panel>
      <Panel title="Tests">
        <LineChart title="Tests and live mocks per day" series={pick(['tests_started', 'tests_submitted', 'live_joins'])} csvName={name('tests')} />
      </Panel>
      <div className={s.grid2}>
        <BarList title="Totals in the range" items={d.totals} csvName={name('activity-totals')} />
        <BarList title="Notes and flashcards (counters)" items={d.notesFlashcards} csvName={name('notes-flashcards')} empty="Not recorded yet (counted only for visitors who accepted analytics)." />
        <BarList title="Current streaks" items={d.streaks} csvName={name('streaks')} />
      </div>
      <Panel title="Top chapters">
        <DataTable caption="Top chapters by activity" header={['chapter', 'practice answers', 'lessons opened', 'total']} rows={top(d.topChapters)} csvName={name('top-chapters')} numeric={[1, 2, 3]} />
      </Panel>
      <Panel title="Top subjects">
        <DataTable caption="Top subjects by activity" header={['subject', 'practice answers', 'lessons opened', 'total']} rows={top(d.topSubjects)} csvName={name('top-subjects')} numeric={[1, 2, 3]} />
      </Panel>
    </>
  );
}

function Retention({ d, name }: { d: AdminAnalyticsRetention } & Named) {
  const header = ['sign-up week', 'students', ...d.days.map((n) => `day ${n}`)];
  return (
    <Panel title="Retention by sign-up week">
      <p className={s.muted}>Share of each week&apos;s new students who were active exactly N days after signing up. A dash means no one in the week has reached that day yet.</p>
      <div className={s.tableScroll}>
        <table className={s.table} data-testid="retention">
          <caption className={s.caption}>D1, D7 and D30 retention</caption>
          <thead>
            <tr>
              {header.map((h, i) => (
                <th key={h} scope="col" className={i > 0 ? s.num : undefined}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {d.cohorts.length === 0 && (
              <tr>
                <td colSpan={header.length} className={s.muted}>
                  No sign-ups in this range.
                </td>
              </tr>
            )}
            {d.cohorts.map((c) => (
              <tr key={c.week}>
                <th scope="row">{c.week}</th>
                <td className={s.num}>{formatCount(c.size)}</td>
                {c.rates.map((r, i) => {
                  const step = heatStep(r);
                  return (
                    <td key={d.days[i]} className={`${s.num} ${s.heat}`} data-step={step ?? 'na'}>
                      {formatPct(r)}
                      <span className={s.heatN}>
                        {' '}
                        ({c.retained[i]}/{c.eligible[i]})
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DataTable
        caption="Retention (CSV)"
        header={['week', 'size', ...d.days.flatMap((n) => [`d${n}_rate`, `d${n}_retained`, `d${n}_eligible`])]}
        rows={d.cohorts.map((c) => [c.week, c.size, ...d.days.flatMap((_, i) => [c.rates[i] ?? '', c.retained[i], c.eligible[i]])])}
        csvName={name('retention')}
      />
    </Panel>
  );
}

/** Top 3 series by total, the rest folded into "Other" (at most four hues). */
function topSeries(list: AdminSeries[]): AdminSeries[] {
  const sorted = [...list].sort((a, b) => sum(b) - sum(a));
  if (sorted.length <= 4) return sorted;
  const rest = sorted.slice(3);
  const other: AdminSeries = { key: 'other', label: 'Other', points: rest[0]!.points.map((p, i) => ({ date: p.date, value: rest.reduce((a, x) => a + (x.points[i]?.value ?? 0), 0) })) };
  return [...sorted.slice(0, 3), other];
}

const STATUS_TEXT = { normal: 'Normal', degraded: 'Degraded (smaller model)', paused: 'Paused (cap reached)' } as const;

function Ai({ d, name }: { d: AdminAnalyticsAi } & Named) {
  const grantedTotal: AdminSeries = {
    key: 'granted',
    label: 'Credits granted',
    points: (d.credits.granted[0]?.points ?? d.credits.spent.points).map((p, i) => ({ date: p.date, value: d.credits.granted.reduce((a, x) => a + (x.points[i]?.value ?? 0), 0) })),
  };
  const spend: AdminSeries = { key: 'spend', label: 'AI spend (₹)', points: d.spend.days.map((x) => ({ date: x.date, value: x.spentPaise })) };
  return (
    <>
      <div className={s.kpis}>
        <Stat label="AI requests" value={formatCount(d.actionsByType.reduce((a, x) => a + sum(x), 0))} />
        <Stat label="Paywall shown" value={formatCount(d.paywallTotal)} />
        <Stat label="Days the breaker acted" value={formatCount(d.spend.breakerDays)} note={`Cap ${formatInr(d.spend.capPaise)} per day`} />
        <Stat label="Requests on a smaller model" value={formatCount(d.spend.degradedRequests)} />
        <Stat label="Refused: AI paused" value={formatCount(d.spend.pausedRefusals)} />
        <Stat label="Blocked by moderation" value={formatCount(sum(d.moderationBlocks))} />
      </div>
      <Panel title="AI actions">
        <LineChart title="AI actions per day by type" series={topSeries(d.actionsByType)} csvName={name('ai-actions')} />
      </Panel>
      <Panel title="Credits">
        <LineChart title="Credits granted, spent and refunded per day" series={[grantedTotal, d.credits.spent, d.credits.refunded]} csvName={name('credits')} />
        <div className={s.grid2}>
          <BarList title="Credit totals" items={d.credits.totals} csvName={name('credit-totals')} />
          <BarList title="Credits granted by reason" items={d.credits.granted.map((x) => ({ key: x.key, label: x.label, value: sum(x) }))} csvName={name('credit-grants')} />
        </div>
      </Panel>
      <Panel title="Spend against the daily cap">
        <LineChart title="AI spend per day" series={[spend]} csvName={name('ai-spend')} format={(v) => formatInr(v)} />
        <DataTable
          caption="Spend and breaker status per day"
          header={['day', 'spend', 'free-tier spend', 'share of cap', 'breaker']}
          rows={d.spend.days.filter((x) => x.spentPaise > 0).map((x) => [x.date, formatInr(x.spentPaise), formatInr(x.freeSpentPaise), formatPct(x.share), STATUS_TEXT[x.status]])}
          csvName={name('ai-spend-days')}
          numeric={[1, 2, 3]}
        />
      </Panel>
      <div className={s.grid2}>
        <BarList title="Paywall shown by AI action" items={d.paywallShown} csvName={name('paywall')} />
        <BarList title="Request outcomes" items={d.statusTotals} csvName={name('ai-outcomes')} />
      </div>
    </>
  );
}

function Revenue({ d, name }: { d: AdminAnalyticsRevenue } & Named) {
  return (
    <>
      {!d.billingEnabled && (
        <p className={s.note} role="note">
          Payments are switched off, so revenue figures stay at zero until billing goes live.
        </p>
      )}
      <div className={s.kpis}>
        <Stat label="Plans page views" value={formatCount(d.plansViews)} />
        <Stat label="Checkouts started" value={formatCount(d.checkout.started)} />
        <Stat label="Checkouts completed" value={formatCount(d.checkout.completed)} />
        <Stat label="Checkouts failed" value={formatCount(d.checkout.failed)} />
        <Stat label="MRR" value={formatInr(d.mrrPaise)} note="Active subscriptions, yearly ÷ 12" />
        <Stat label="Revenue" value={formatInr(d.revenueTotalPaise)} />
        <Stat label="Refunds" value={formatInr(d.refundsPaise)} />
        <Stat label="Board Exam Pass sales" value={`${formatCount(d.boardExamPass.sales)} · ${formatInr(d.boardExamPass.revenuePaise)}`} />
      </div>
      <Panel title="Revenue per day">
        <LineChart title="Revenue (captured payments) per day" series={[d.revenue]} csvName={name('revenue')} format={(v) => formatInr(v)} />
      </Panel>
      <Panel title="Active subscriptions">
        <DataTable
          caption="Active subscriptions by plan"
          header={['plan', 'interval', 'subscriptions', 'MRR']}
          rows={d.activeSubscriptions.map((r) => [r.plan, r.interval, r.count, formatInr(r.mrrPaise)])}
          csvName={name('subscriptions')}
          numeric={[2, 3]}
        />
      </Panel>
      <Panel title="SOYL Coins">
        <div className={s.kpis}>
          <Stat label="Coins earned" value={formatCount(d.coins.earnedTotal)} />
          <Stat label="Store views" value={formatCount(d.coins.storeViews)} />
        </div>
        <LineChart title="Coins earned per day" series={[d.coins.earned]} csvName={name('coins')} />
        <div className={s.grid2}>
          <BarList title="Store items opened" items={d.coins.itemViews} csvName={name('store-items')} />
          <BarList title="Redemptions by status" items={d.coins.redemptions} csvName={name('redemptions')} />
        </div>
      </Panel>
    </>
  );
}

function Interest({ d, name }: { d: AdminAnalyticsInterest } & Named) {
  return (
    <>
      <p className={s.muted}>
        Aggregate counts per day only: no student, session or IP is stored. Page events are counted only for visitors who accepted analytics in the cookie bar;
        server events (sign-ups, paywall, checkout) are counted by the API.
      </p>
      <Panel title="Product interest">
        <DataTable
          caption="Interest counters in the range"
          header={['event', 'counted by', 'total', 'previous period']}
          rows={d.events.map((e) => [e.label, e.source === 'server' ? 'server' : 'page (consented)', e.total, e.previousTotal])}
          csvName={name('interest')}
          numeric={[2, 3]}
        />
      </Panel>
      <div className={s.grid2}>
        {d.events
          .filter((e) => e.byDimension.length > 0)
          .map((e) => (
            <BarList key={e.event} title={e.label} items={e.byDimension} csvName={name(`interest-${e.event}`)} />
          ))}
      </div>
    </>
  );
}

function Content({ d, name }: { d: AdminAnalyticsContent } & Named) {
  return (
    <>
      <div className={s.kpis}>
        <Stat label="Reports received" value={formatCount(d.reportsInRange)} />
        <Stat label="Reports fixed" value={formatCount(d.fixedInRange)} />
        <Stat label="Open reports" value={formatCount(d.openReports.reduce((a, x) => a + x.value, 0))} />
      </div>
      <div className={s.grid2}>
        <BarList title="Open reports by age" items={d.openReports} csvName={name('open-reports-age')} empty="No open reports." />
        <BarList title="Open reports by type" items={d.openReportsByType} csvName={name('open-reports-type')} empty="No open reports." />
      </div>
      <Panel title="Published chapters">
        <DataTable
          caption="Published chapters per subject"
          header={['subject', 'published', 'chapters', 'coverage']}
          rows={d.subjects.map((x) => [x.label, x.published, x.chapters, formatPct(x.chapters ? x.published / x.chapters : null)])}
          csvName={name('published-chapters')}
          numeric={[1, 2, 3]}
        />
      </Panel>
    </>
  );
}
