/**
 * Super-admin analytics (D-045). Platform-wide aggregates computed on read from the feature tables;
 * nothing here returns a per-user row.
 *
 * Cost model: every query is bounded to the requested IST range (at most ANALYTICS.maxRangeDays, plus 30
 * days for MAU and retention follow-up) and uses the range indexes added in migration 0014
 * (practice_answers.answered_at, lesson_progress.created_at/completed_at/updated_at, attempts.started_at/
 * submitted_at, credit_ledger/coin_ledger (ist_day, kind), users.created_at, ai_requests.created_at).
 * There is no read replica, so the dashboard reads the primary.
 *
 * Rollup seam: each section is one function `(db, range, …) → section`. When a section grows too slow,
 * a nightly worker job can write closed IST days into a rollup table and the section reads closed days
 * from it and only today from the raw tables; the response contract does not change. Additive per-day
 * metrics (sign-ups, activity counts, credits, coins, revenue, DAU per day) roll up directly; WAU/MAU and
 * retention need distinct users across days and stay on the raw tables (bounded windows).
 *
 * "Active" = any learning activity: a practice answer, a lesson opened or moved on (lesson_progress
 * created/updated), a test started or submitted. lesson_progress keeps the latest touch per deck part,
 * so a re-read on an earlier day is only visible on its latest day.
 *
 * Staff accounts (reviewer/admin) are left out of user counts.
 */
import { sql, type SQL } from 'drizzle-orm';
import type { Database } from '@soyl/db';
import { ACCOUNT } from '@soyl/shared/config/security';
import { ANALYTICS, ANALYTICS_EVENTS, type AnalyticsEventName } from '@soyl/shared/config/analytics';
import { AI_SPEND } from '@soyl/shared/config/credits';
import { ApiProblem } from '../../errors';
import { dayNumber, dayString, weekMonday } from '../gamification';
import { solvedAnswer } from '../practice';

/* ---- ranges ------------------------------------------------------------------------------------- */

export interface Range {
  from: string;
  to: string;
  days: number;
  previousFrom: string;
  previousTo: string;
  timezone: typeof ANALYTICS.timezone;
  generatedAt: string;
}

const DAY_RE = /^\d{4}-\d{2}-\d{2}$/;
const validDay = (d: string) => DAY_RE.test(d) && dayString(dayNumber(d)) === d;

/** Resolves ?from=&to= against today (IST). Refuses future days, reversed and over-long ranges (400). */
export function resolveRange(q: { from?: string; to?: string }, today: string, now: Date): Range {
  const bad = (path: string, message: string) => new ApiProblem('validation_failed', { errors: [{ path: `querystring.${path}`, message }] });
  if (q.to !== undefined && !validDay(q.to)) throw bad('to', 'Not a calendar day.');
  if (q.from !== undefined && !validDay(q.from)) throw bad('from', 'Not a calendar day.');
  const to = q.to ?? today;
  if (to > today) throw bad('to', 'The range cannot end after today (IST).');
  const from = q.from ?? dayString(dayNumber(to) - (ANALYTICS.defaultRangeDays - 1));
  if (from > to) throw bad('from', 'The range starts after it ends.');
  const days = dayNumber(to) - dayNumber(from) + 1;
  if (days > ANALYTICS.maxRangeDays) throw bad('from', `The range is limited to ${ANALYTICS.maxRangeDays} days.`);
  return {
    from,
    to,
    days,
    previousFrom: dayString(dayNumber(from) - days),
    previousTo: dayString(dayNumber(from) - 1),
    timezone: ANALYTICS.timezone,
    generatedAt: now.toISOString(),
  };
}

export const daysOf = (from: string, to: string): string[] => {
  const out: string[] = [];
  for (let n = dayNumber(from); n <= dayNumber(to); n++) out.push(dayString(n));
  return out;
};
const addDays = (d: string, n: number) => dayString(dayNumber(d) + n);
/** 00:00 IST of `day` as an ISO instant (timestamptz bound). */
const startOf = (day: string) => new Date(`${day}T00:00:00+05:30`).toISOString();
const bounds = (from: string, to: string) => ({ s: startOf(from), e: startOf(addDays(to, 1)) });

/* ---- SQL helpers -------------------------------------------------------------------------------- */

const TZ = sql.raw(`'${ANALYTICS.timezone}'`);
/** IST day of a timestamptz column as YYYY-MM-DD text. */
const IST = (col: string) => sql.raw(`to_char((${col} AT TIME ZONE '${ANALYTICS.timezone}')::date, 'YYYY-MM-DD')`);
const STAFF = sql.raw(`('reviewer', 'admin')`);
const num = (v: unknown) => (v === null || v === undefined ? 0 : Number(v));

async function rows<T extends Record<string, unknown>>(db: Database, q: SQL): Promise<T[]> {
  return (await db.execute<T>(q)).rows as T[];
}

export interface Point {
  date: string;
  value: number;
}
export interface SeriesOut {
  key: string;
  label: string;
  points: Point[];
}
export interface Labelled {
  key: string;
  label: string;
  value: number;
}

/** A dense daily series from sparse (day, value) rows. */
export function series(key: string, label: string, range: { from: string; to: string }, data: Iterable<{ day: string; n: unknown }>): SeriesOut {
  const m = new Map<string, number>();
  for (const r of data) m.set(r.day, (m.get(r.day) ?? 0) + num(r.n));
  return { key, label, points: daysOf(range.from, range.to).map((date) => ({ date, value: m.get(date) ?? 0 })) };
}
const total = (s: SeriesOut) => s.points.reduce((a, p) => a + p.value, 0);

/** Learning activity (user, IST day) between two instants: the definition of "active". */
const activity = (s: string, e: string, users?: SQL) => {
  const f = (col: string) => sql`${sql.raw(col)} >= ${s}::timestamptz AND ${sql.raw(col)} < ${e}::timestamptz${users ? sql` AND user_id IN (${users})` : sql``}`;
  return sql`
    SELECT user_id, (answered_at AT TIME ZONE ${TZ})::date AS d FROM practice_answers WHERE ${f('answered_at')}
    UNION SELECT user_id, (created_at AT TIME ZONE ${TZ})::date FROM lesson_progress WHERE ${f('created_at')}
    UNION SELECT user_id, (updated_at AT TIME ZONE ${TZ})::date FROM lesson_progress WHERE ${f('updated_at')}
    UNION SELECT user_id, (started_at AT TIME ZONE ${TZ})::date FROM attempts WHERE ${f('started_at')}
    UNION SELECT user_id, (submitted_at AT TIME ZONE ${TZ})::date FROM attempts WHERE ${f('submitted_at')}`;
};

/** Sign-in method a student signed up with, inferred from the account (see AdminUserRow). */
export const METHOD_SQL = (u: string) =>
  sql.raw(`CASE
    WHEN EXISTS (SELECT 1 FROM accounts a WHERE a.user_id = ${u}.id AND a.provider_id = 'google' AND a.created_at <= ${u}.created_at + interval '5 minutes') THEN 'google'
    WHEN ${u}.email LIKE '%@${ACCOUNT.phoneTempEmailDomain}' THEN 'phone'
    ELSE 'email' END`);

/* ---- counters ----------------------------------------------------------------------------------- */

async function counterTotals(db: Database, from: string, to: string, events: readonly string[]) {
  if (!events.length) return [];
  return rows<{ event: string; dimension: string; n: string }>(
    db,
    sql`SELECT event, dimension, sum(count)::bigint AS n FROM analytics_counters
        WHERE ist_day BETWEEN ${from}::date AND ${to}::date AND event IN (${sql.join(events.map((e) => sql`${e}`), sql`, `)})
        GROUP BY 1, 2`,
  );
}
async function counterSeries(db: Database, from: string, to: string, events: readonly string[]) {
  if (!events.length) return [];
  return rows<{ event: string; day: string; n: string }>(
    db,
    sql`SELECT event, to_char(ist_day, 'YYYY-MM-DD') AS day, sum(count)::bigint AS n FROM analytics_counters
        WHERE ist_day BETWEEN ${from}::date AND ${to}::date AND event IN (${sql.join(events.map((e) => sql`${e}`), sql`, `)})
        GROUP BY 1, 2`,
  );
}
const sumWhere = <T extends { n: unknown }>(rs: T[], pred: (r: T) => boolean) => rs.filter(pred).reduce((a, r) => a + num(r.n), 0);

/* ---- building blocks ---------------------------------------------------------------------------- */

async function signupsByDay(db: Database, from: string, to: string) {
  const { s, e } = bounds(from, to);
  return rows<{ day: string; method: string; n: number }>(
    db,
    sql`SELECT ${IST('u.created_at')} AS day, ${METHOD_SQL('u')} AS method, count(*)::int AS n FROM users u
        WHERE u.created_at >= ${s}::timestamptz AND u.created_at < ${e}::timestamptz AND u.role NOT IN ${STAFF}
        GROUP BY 1, 2`,
  );
}

async function dauByDay(db: Database, from: string, to: string) {
  const { s, e } = bounds(from, to);
  return rows<{ day: string; n: number }>(db, sql`SELECT to_char(d, 'YYYY-MM-DD') AS day, count(DISTINCT user_id)::int AS n FROM (${activity(s, e)}) a GROUP BY 1`);
}

async function activeUsers(db: Database, from: string, to: string): Promise<number> {
  const { s, e } = bounds(from, to);
  const [r] = await rows<{ n: number }>(db, sql`SELECT count(DISTINCT user_id)::int AS n FROM (${activity(s, e)}) a`);
  return num(r?.n);
}

const ACTIVITY_METRICS = [
  ['lessons_opened', 'Lessons opened'],
  ['lessons_completed', 'Lessons completed'],
  ['practice_answers', 'Practice answers'],
  ['practice_solved', 'Practice questions solved'],
  ['tests_started', 'Tests started'],
  ['tests_submitted', 'Tests submitted'],
  ['live_joins', 'Live mock joins'],
] as const;
type ActivityMetric = (typeof ACTIVITY_METRICS)[number][0];

async function activityCounts(db: Database, from: string, to: string) {
  const { s, e } = bounds(from, to);
  const between = (col: string) => sql`${sql.raw(col)} >= ${s}::timestamptz AND ${sql.raw(col)} < ${e}::timestamptz`;
  return rows<{ m: ActivityMetric; day: string; n: number }>(
    db,
    sql`
      SELECT 'lessons_opened' AS m, ${IST('created_at')} AS day, count(*)::int AS n FROM lesson_progress WHERE ${between('created_at')} GROUP BY 2
      UNION ALL SELECT 'lessons_completed', ${IST('completed_at')}, count(*)::int FROM lesson_progress WHERE ${between('completed_at')} GROUP BY 2
      UNION ALL SELECT 'practice_answers', ${IST('answered_at')}, count(*)::int FROM practice_answers WHERE ${between('answered_at')} GROUP BY 2
      UNION ALL SELECT 'practice_solved', ${IST('answered_at')}, count(*)::int FROM practice_answers pa WHERE ${between('answered_at')} AND ${solvedAnswer('pa')} GROUP BY 2
      UNION ALL SELECT 'tests_started', ${IST('started_at')}, count(*)::int FROM attempts WHERE ${between('started_at')} AND live_event_id IS NULL GROUP BY 2
      UNION ALL SELECT 'tests_submitted', ${IST('submitted_at')}, count(*)::int FROM attempts WHERE ${between('submitted_at')} GROUP BY 2
      UNION ALL SELECT 'live_joins', ${IST('started_at')}, count(*)::int FROM attempts WHERE ${between('started_at')} AND live_event_id IS NOT NULL GROUP BY 2`,
  );
}

async function aiTotals(db: Database, from: string, to: string) {
  const { s, e } = bounds(from, to);
  const [req] = await rows<{ n: number }>(db, sql`SELECT count(*)::int AS n FROM ai_requests WHERE created_at >= ${s}::timestamptz AND created_at < ${e}::timestamptz`);
  const [spend] = await rows<{ p: string | null }>(db, sql`SELECT sum(spent_paise) AS p FROM ai_spend_daily WHERE scope = 'all' AND ist_day BETWEEN ${from}::date AND ${to}::date`);
  return { requests: num(req?.n), spendPaise: Math.round(num(spend?.p)) };
}

const CAPTURED = sql.raw(`('captured', 'refunded', 'partially_refunded')`);
async function revenueByDay(db: Database, from: string, to: string) {
  const { s, e } = bounds(from, to);
  return rows<{ day: string; n: number; refunded: number }>(
    db,
    sql`SELECT ${IST('captured_at')} AS day, sum(amount_paise)::bigint AS n, sum(refunded_paise)::bigint AS refunded FROM payments
        WHERE captured_at >= ${s}::timestamptz AND captured_at < ${e}::timestamptz AND status IN ${CAPTURED} GROUP BY 1`,
  );
}

async function totalUsers(db: Database, to: string): Promise<number> {
  const { e } = bounds(to, to);
  const [r] = await rows<{ n: number }>(db, sql`SELECT count(*)::int AS n FROM users WHERE deleted_at IS NULL AND role NOT IN ${STAFF} AND created_at < ${e}::timestamptz`);
  return num(r?.n);
}

/* ---- sections ----------------------------------------------------------------------------------- */

export async function overview(db: Database, range: Range) {
  const cur = { from: range.from, to: range.to };
  const prev = { from: range.previousFrom, to: range.previousTo };
  const [signCur, signPrev, dauCur, dauPrev, actCur, actPrev, actsCur, actsPrev, aiCur, aiPrev, revCur, revPrev, users] = await Promise.all([
    signupsByDay(db, cur.from, cur.to),
    signupsByDay(db, prev.from, prev.to),
    dauByDay(db, cur.from, cur.to),
    dauByDay(db, prev.from, prev.to),
    activeUsers(db, cur.from, cur.to),
    activeUsers(db, prev.from, prev.to),
    activityCounts(db, cur.from, cur.to),
    activityCounts(db, prev.from, prev.to),
    aiTotals(db, cur.from, cur.to),
    aiTotals(db, prev.from, prev.to),
    revenueByDay(db, cur.from, cur.to),
    revenueByDay(db, prev.from, prev.to),
    totalUsers(db, range.to),
  ]);
  const signups = series('signups', 'New sign-ups', cur, signCur);
  const dau = series('dau', 'Daily active students', cur, dauCur);
  const metric = (r: { m: string; n: number }[], m: ActivityMetric) => sumWhere(r, (x) => x.m === m);
  const avg = (rs: { n: number }[], days: number) => Math.round((rs.reduce((a, r) => a + num(r.n), 0) / days) * 10) / 10;
  const kpis = [
    { key: 'signups', label: 'New sign-ups', value: total(signups), previous: sumWhere(signPrev, () => true), unit: 'count' as const },
    { key: 'total_users', label: 'Total students', value: users, previous: null, unit: 'count' as const },
    { key: 'active_users', label: 'Active students', value: actCur, previous: actPrev, unit: 'count' as const },
    { key: 'avg_dau', label: 'Average daily active', value: avg(dauCur, range.days), previous: avg(dauPrev, range.days), unit: 'count' as const },
    { key: 'lessons_completed', label: 'Lessons completed', value: metric(actsCur, 'lessons_completed'), previous: metric(actsPrev, 'lessons_completed'), unit: 'count' as const },
    { key: 'practice_answers', label: 'Practice answers', value: metric(actsCur, 'practice_answers'), previous: metric(actsPrev, 'practice_answers'), unit: 'count' as const },
    { key: 'tests_submitted', label: 'Tests submitted', value: metric(actsCur, 'tests_submitted'), previous: metric(actsPrev, 'tests_submitted'), unit: 'count' as const },
    { key: 'ai_requests', label: 'AI requests', value: aiCur.requests, previous: aiPrev.requests, unit: 'count' as const },
    { key: 'ai_spend', label: 'AI spend', value: aiCur.spendPaise, previous: aiPrev.spendPaise, unit: 'paise' as const },
    { key: 'revenue', label: 'Revenue', value: sumWhere(revCur, () => true), previous: sumWhere(revPrev, () => true), unit: 'paise' as const },
  ];
  return { range, kpis, signups, dau };
}

const METHODS = [
  ['email', 'Email'],
  ['phone', 'Phone'],
  ['google', 'Google'],
] as const;

export async function growth(db: Database, range: Range) {
  const cur = { from: range.from, to: range.to };
  const { s, e } = bounds(range.from, range.to);
  const [signs, users, consent, boards, classes, schools, merges, counter] = await Promise.all([
    signupsByDay(db, range.from, range.to),
    totalUsers(db, range.to),
    rows<{ k: string; n: number }>(
      db,
      sql`SELECT CASE
            WHEN cs.status = 'granted' AND cr.age_band = 'adult' THEN 'adult'
            WHEN cs.status = 'granted' THEN 'granted'
            WHEN cs.status = 'pending' THEN 'pending'
            WHEN cs.status = 'revoked' THEN 'revoked'
            ELSE 'none' END AS k, count(*)::int AS n
          FROM users u LEFT JOIN consent_status cs ON cs.user_id = u.id LEFT JOIN consent_records cr ON cr.user_id = u.id
          WHERE u.deleted_at IS NULL AND u.role NOT IN ${STAFF} GROUP BY 1`,
    ),
    rows<{ k: string | null; n: number }>(db, sql`SELECT p.board AS k, count(*)::int AS n FROM users u JOIN profiles p ON p.user_id = u.id WHERE u.deleted_at IS NULL AND u.role NOT IN ${STAFF} GROUP BY 1`),
    rows<{ k: number | null; n: number }>(db, sql`SELECT p.class_level AS k, count(*)::int AS n FROM users u JOIN profiles p ON p.user_id = u.id WHERE u.deleted_at IS NULL AND u.role NOT IN ${STAFF} GROUP BY 1`),
    rows<{ n: number }>(db, sql`SELECT count(*)::int AS n FROM schools WHERE source = 'student' AND created_at >= ${s}::timestamptz AND created_at < ${e}::timestamptz`),
    rows<{ day: string; n: number }>(db, sql`SELECT ${IST('guest_merged_at')} AS day, count(*)::int AS n FROM profiles WHERE guest_merged_at >= ${s}::timestamptz AND guest_merged_at < ${e}::timestamptz GROUP BY 1`),
    counterTotals(db, range.from, range.to, ['signup']),
  ]);
  const signupsByMethod = METHODS.map(([k, label]) => series(k, label, cur, signs.filter((r) => r.method === k)));
  const weeks = new Map<string, { week: string; email: number; phone: number; google: number; total: number }>();
  for (const r of signs) {
    const w = weekMonday(r.day);
    const row = weeks.get(w) ?? { week: w, email: 0, phone: 0, google: 0, total: 0 };
    row[r.method as 'email' | 'phone' | 'google'] += num(r.n);
    row.total += num(r.n);
    weeks.set(w, row);
  }
  const CONSENT = [
    ['none', 'No consent yet'],
    ['pending', 'Waiting for parent'],
    ['granted', 'Parent approved'],
    ['adult', '18 or older'],
    ['revoked', 'Withdrawn'],
  ] as const;
  const BOARDS = [
    ['cbse', 'CBSE'],
    ['cisce', 'CISCE (ICSE/ISC)'],
  ] as const;
  return {
    range,
    totalUsers: users,
    signupsByMethod,
    signupsByWeek: [...weeks.values()].sort((a, b) => (a.week < b.week ? -1 : 1)),
    consentFunnel: CONSENT.map(([key, label]) => ({ key, label, value: sumWhere(consent, (r) => r.k === key) })),
    boards: [...BOARDS.map(([key, label]) => ({ key, label, value: sumWhere(boards, (r) => r.k === key) })), { key: 'unset', label: 'Not set', value: sumWhere(boards, (r) => r.k === null) }],
    classes: [
      ...[7, 8, 9, 10, 11, 12].map((c) => ({ key: String(c), label: `Class ${c}`, value: sumWhere(classes, (r) => r.k !== null && Number(r.k) === c) })),
      { key: 'unset', label: 'Not set', value: sumWhere(classes, (r) => r.k === null) },
    ],
    schoolsAdded: num(schools[0]?.n),
    guestMerges: series('guest_merges', 'Guest progress merged at first sign-in', cur, merges),
    signupCounter: METHODS.map(([key, label]) => ({ key, label, value: sumWhere(counter, (r) => r.dimension === key) })),
  };
}

const streakLabel = (i: number, b: readonly number[]) => {
  const lo = b[i]!;
  const hi = b[i + 1];
  if (hi === undefined) return `${lo}+ days`;
  if (hi - 1 === lo) return lo === 1 ? '1 day' : `${lo} days`;
  return `${lo}–${hi - 1} days`;
};

export async function engagement(db: Database, range: Range, today: string) {
  const cur = { from: range.from, to: range.to };
  const monthFrom = addDays(range.to, -29);
  const { s: ms, e: me } = bounds(monthFrom, range.to);
  const { s, e } = bounds(range.from, range.to);
  const weekFrom = addDays(range.to, -6);
  const top = (group: 'chapter' | 'subject') => {
    const key = group === 'chapter' ? sql.raw('c.key') : sql.raw('sub.key');
    const label = group === 'chapter' ? sql.raw(`c.title`) : sql.raw(`sub.name || ' (' || upper(b.code) || ' ' || sub.class_level || ')'`);
    return rows<{ key: string; label: string; pa: number; lo: number }>(
      db,
      sql`WITH x AS (
            SELECT chapter_id, count(*)::int AS pa, 0 AS lo FROM practice_answers WHERE answered_at >= ${s}::timestamptz AND answered_at < ${e}::timestamptz GROUP BY 1
            UNION ALL SELECT chapter_id, 0, count(*)::int FROM lesson_progress WHERE created_at >= ${s}::timestamptz AND created_at < ${e}::timestamptz GROUP BY 1)
          SELECT ${key} AS key, min(${label}) AS label, sum(x.pa)::int AS pa, sum(x.lo)::int AS lo
          FROM x JOIN chapters c ON c.id = x.chapter_id JOIN subjects sub ON sub.id = c.subject_id JOIN boards b ON b.id = sub.board_id
          GROUP BY 1 ORDER BY sum(x.pa) + sum(x.lo) DESC, 1 LIMIT ${ANALYTICS.topN}`,
    );
  };
  const buckets = ANALYTICS.streakBuckets;
  const [dauRows, active, month, acts, counters, topChapters, topSubjects, streakRows] = await Promise.all([
    dauByDay(db, range.from, range.to),
    activeUsers(db, range.from, range.to),
    rows<{ wau: number; mau: number; dau_sum: number }>(
      db,
      sql`SELECT count(DISTINCT user_id) FILTER (WHERE d >= ${weekFrom}::date)::int AS wau, count(DISTINCT user_id)::int AS mau,
            (SELECT count(*)::int FROM (SELECT DISTINCT user_id, d FROM (${activity(ms, me)}) y) z) AS dau_sum
          FROM (${activity(ms, me)}) a`,
    ),
    activityCounts(db, range.from, range.to),
    counterTotals(db, range.from, range.to, ['notes_open', 'flashcards_open']),
    top('chapter'),
    top('subject'),
    rows<{ days: number; n: number }>(
      db,
      sql`SELECT CASE WHEN last_active_ist_day >= ${addDays(today, -1)}::date THEN current_days ELSE 0 END AS days, count(*)::int AS n FROM streaks GROUP BY 1`,
    ),
  ]);
  const m = month[0];
  const mau = num(m?.mau);
  const activitySeries = ACTIVITY_METRICS.map(([k, label]) => series(k, label, cur, acts.filter((r) => r.m === k)));
  return {
    range,
    dau: series('dau', 'Daily active students', cur, dauRows),
    activeUsers: active,
    wau: num(m?.wau),
    mau,
    stickiness: mau > 0 ? Math.round((num(m?.dau_sum) / 30 / mau) * 1000) / 1000 : null,
    activity: activitySeries,
    totals: activitySeries.map((x) => ({ key: x.key, label: x.label, value: total(x) })),
    notesFlashcards: [
      { key: 'notes_open', label: 'Notes opened', value: sumWhere(counters, (r) => r.event === 'notes_open') },
      { key: 'flashcards_open', label: 'Flashcards opened', value: sumWhere(counters, (r) => r.event === 'flashcards_open') },
    ],
    topChapters: topChapters.map((r) => ({ key: r.key, label: r.label, practiceAnswers: num(r.pa), lessonsOpened: num(r.lo), total: num(r.pa) + num(r.lo) })),
    topSubjects: topSubjects.map((r) => ({ key: r.key, label: r.label, practiceAnswers: num(r.pa), lessonsOpened: num(r.lo), total: num(r.pa) + num(r.lo) })),
    streaks: buckets.map((lo, i) => ({
      key: String(lo),
      label: streakLabel(i, buckets),
      value: sumWhere(streakRows, (r) => num(r.days) >= lo && (buckets[i + 1] === undefined || num(r.days) < buckets[i + 1]!)),
    })),
  };
}

export async function retention(db: Database, range: Range, today: string) {
  const ns = ANALYTICS.retentionDays;
  const maxN = Math.max(...ns);
  const { s, e } = bounds(range.from, range.to);
  const followTo = addDays(range.to, maxN) < today ? addDays(range.to, maxN) : today;
  const { e: fe } = bounds(range.from, followTo);
  const cohortUsers = sql`SELECT id FROM users WHERE created_at >= ${s}::timestamptz AND created_at < ${e}::timestamptz AND role NOT IN ${STAFF}`;
  const cols = ns.map(
    (n) => sql`, count(*) FILTER (WHERE c.d0 + ${n}::int <= ${today}::date)::int AS ${sql.raw(`e${n}`)},
      count(*) FILTER (WHERE EXISTS (SELECT 1 FROM act a WHERE a.user_id = c.id AND a.d = c.d0 + ${n}::int))::int AS ${sql.raw(`r${n}`)}`,
  );
  const data = await rows<Record<string, number | string>>(
    db,
    sql`WITH cohort AS (
          SELECT id, (created_at AT TIME ZONE ${TZ})::date AS d0 FROM users
          WHERE created_at >= ${s}::timestamptz AND created_at < ${e}::timestamptz AND role NOT IN ${STAFF}),
        act AS MATERIALIZED (${activity(s, fe, cohortUsers)})
        SELECT to_char(date_trunc('week', c.d0)::date, 'YYYY-MM-DD') AS week, count(*)::int AS size ${sql.join(cols, sql``)}
        FROM cohort c GROUP BY 1 ORDER BY 1`,
  );
  return {
    range,
    days: [...ns],
    cohorts: data.map((r) => {
      const eligible = ns.map((n) => num(r[`e${n}`]));
      const retained = ns.map((n) => num(r[`r${n}`]));
      return {
        week: String(r.week),
        size: num(r.size),
        eligible,
        retained,
        rates: eligible.map((el, i) => (el > 0 ? Math.round((retained[i]! / el) * 1000) / 1000 : null)),
      };
    }),
  };
}

const GRANT_LABELS: Record<string, string> = {
  daily_grant: 'Daily free credits',
  plan_topup: 'Plan top-up',
  admin_adjustment: 'Staff adjustment',
};
const grantLabel = (a: string) => GRANT_LABELS[a] ?? (a.includes('bonus') ? `Learning bonus (${a.replace(/_/g, ' ')})` : a.replace(/_/g, ' '));

export async function ai(db: Database, range: Range, capPaise: number) {
  const cur = { from: range.from, to: range.to };
  const { s, e } = bounds(range.from, range.to);
  const [byAction, statuses, grants, spent, ledger, spend, degraded, counters] = await Promise.all([
    rows<{ day: string; action: string; n: number }>(db, sql`SELECT ${IST('created_at')} AS day, action, count(*)::int AS n FROM ai_requests WHERE created_at >= ${s}::timestamptz AND created_at < ${e}::timestamptz GROUP BY 1, 2`),
    rows<{ status: string; day: string; n: number }>(db, sql`SELECT status, ${IST('created_at')} AS day, count(*)::int AS n FROM ai_requests WHERE created_at >= ${s}::timestamptz AND created_at < ${e}::timestamptz GROUP BY 1, 2`),
    rows<{ day: string; action: string; n: number }>(
      db,
      sql`SELECT to_char(ist_day, 'YYYY-MM-DD') AS day, action, sum(amount)::bigint AS n FROM credit_ledger WHERE kind = 'grant' AND ist_day BETWEEN ${range.from}::date AND ${range.to}::date GROUP BY 1, 2`,
    ),
    rows<{ day: string; n: number }>(
      db,
      sql`SELECT to_char(r.ist_day, 'YYYY-MM-DD') AS day, sum(-r.amount - c.amount)::bigint AS n FROM credit_ledger r
          JOIN credit_ledger c ON c.kind = 'charge' AND c.request_id = r.request_id
          WHERE r.kind = 'reserve' AND r.ist_day BETWEEN ${range.from}::date AND ${range.to}::date GROUP BY 1`,
    ),
    rows<{ day: string; kind: string; n: number }>(
      db,
      sql`SELECT to_char(ist_day, 'YYYY-MM-DD') AS day, kind, sum(abs(amount))::bigint AS n FROM credit_ledger WHERE kind IN ('refund', 'expire') AND ist_day BETWEEN ${range.from}::date AND ${range.to}::date GROUP BY 1, 2`,
    ),
    rows<{ day: string; scope: string; p: string }>(db, sql`SELECT to_char(ist_day, 'YYYY-MM-DD') AS day, scope, spent_paise AS p FROM ai_spend_daily WHERE ist_day BETWEEN ${range.from}::date AND ${range.to}::date`),
    rows<{ n: number }>(db, sql`SELECT count(*)::int AS n FROM ai_requests WHERE degraded AND created_at >= ${s}::timestamptz AND created_at < ${e}::timestamptz`),
    counterTotals(db, range.from, range.to, ['paywall_shown', 'ai_paused']),
  ]);
  const actions = [...new Set(byAction.map((r) => r.action))].sort();
  const grantActions = [...new Set(grants.map((r) => r.action))].sort();
  const freeCap = capPaise * AI_SPEND.freeTierShare;
  const spendDays = daysOf(range.from, range.to).map((date) => {
    const all = num(spend.find((r) => r.day === date && r.scope === 'all')?.p);
    const free = num(spend.find((r) => r.day === date && r.scope === 'free')?.p);
    const share = capPaise > 0 ? Math.max(all / capPaise, freeCap > 0 ? free / freeCap : 0) : 0;
    const status: 'normal' | 'degraded' | 'paused' = share >= 1 ? 'paused' : share >= AI_SPEND.degradeAtShare ? 'degraded' : 'normal';
    return { date, spentPaise: Math.round(all * 100) / 100, freeSpentPaise: Math.round(free * 100) / 100, share: Math.round(share * 1000) / 1000, status };
  });
  const grantedSeries = grantActions.map((a) => series(a, grantLabel(a), cur, grants.filter((r) => r.action === a)));
  const spentS = series('spent', 'Credits spent', cur, spent);
  const refundedS = series('refunded', 'Credits refunded', cur, ledger.filter((r) => r.kind === 'refund'));
  const expiredS = series('expired', 'Credits expired unused', cur, ledger.filter((r) => r.kind === 'expire'));
  const STATUS_LABELS: Record<string, string> = { succeeded: 'Succeeded', failed: 'Failed', moderated: 'Blocked by moderation', refused: 'Refused', cancelled: 'Cancelled', pending: 'Pending', streaming: 'Streaming' };
  const statusKeys = [...new Set(statuses.map((r) => r.status))].sort();
  return {
    range,
    actionsByType: actions.map((a) => series(a, a, cur, byAction.filter((r) => r.action === a))),
    statusTotals: statusKeys.map((k) => ({ key: k, label: STATUS_LABELS[k] ?? k, value: sumWhere(statuses, (r) => r.status === k) })),
    credits: {
      granted: grantedSeries,
      spent: spentS,
      refunded: refundedS,
      expired: expiredS,
      totals: [
        { key: 'granted', label: 'Credits granted', value: grantedSeries.reduce((a, x) => a + total(x), 0) },
        { key: 'spent', label: 'Credits spent', value: total(spentS) },
        { key: 'refunded', label: 'Credits refunded', value: total(refundedS) },
        { key: 'expired', label: 'Credits expired unused', value: total(expiredS) },
      ],
    },
    spend: {
      capPaise,
      degradeAtShare: AI_SPEND.degradeAtShare,
      days: spendDays,
      breakerDays: spendDays.filter((d) => d.status !== 'normal').length,
      degradedRequests: num(degraded[0]?.n),
      pausedRefusals: sumWhere(counters, (r) => r.event === 'ai_paused'),
    },
    paywallShown: [...new Set(counters.filter((r) => r.event === 'paywall_shown').map((r) => r.dimension))].sort().map((d) => ({ key: d, label: d || 'unknown', value: sumWhere(counters, (r) => r.event === 'paywall_shown' && r.dimension === d) })),
    paywallTotal: sumWhere(counters, (r) => r.event === 'paywall_shown'),
    moderationBlocks: series('moderated', 'Blocked by moderation', cur, statuses.filter((r) => r.status === 'moderated')),
  };
}

export async function revenue(db: Database, range: Range, billingEnabled: boolean) {
  const cur = { from: range.from, to: range.to };
  const { s, e } = bounds(range.from, range.to);
  const inRange = (col: string) => sql`${sql.raw(col)} >= ${s}::timestamptz AND ${sql.raw(col)} < ${e}::timestamptz`;
  const [counters, started, completed, failed, subs, rev, pass, coins, redemptions] = await Promise.all([
    counterTotals(db, range.from, range.to, ['plans_view', 'checkout_start', 'checkout_complete', 'store_view', 'store_item_view']),
    rows<{ n: number }>(db, sql`SELECT (SELECT count(*) FROM orders WHERE ${inRange('created_at')}) + (SELECT count(*) FROM subscriptions WHERE ${inRange('created_at')}) AS n`),
    rows<{ n: number }>(db, sql`SELECT count(*)::int AS n FROM payments WHERE ${inRange('captured_at')} AND status IN ${CAPTURED}`),
    rows<{ n: number }>(db, sql`SELECT (SELECT count(*) FROM orders WHERE ${inRange('created_at')} AND status = 'failed') + (SELECT count(*) FROM payments WHERE ${inRange('created_at')} AND status = 'failed') AS n`),
    rows<{ plan: string; interval: string; n: number; mrr: number }>(
      db,
      sql`SELECT p.key AS plan, s.interval, count(*)::int AS n,
            sum(CASE WHEN s.interval = 'yearly' THEN round(coalesce(s.amount_paise, 0) / 12.0) ELSE coalesce(s.amount_paise, 0) END)::bigint AS mrr
          FROM subscriptions s JOIN plans p ON p.id = s.plan_id WHERE s.status = 'active' GROUP BY 1, 2 ORDER BY 1, 2`,
    ),
    revenueByDay(db, range.from, range.to),
    rows<{ n: number; paise: number }>(
      db,
      sql`SELECT count(*)::int AS n, coalesce(sum(o.amount_paise), 0)::bigint AS paise FROM orders o JOIN plans p ON p.id = o.plan_id
          WHERE p.key = 'board_exam_pass' AND o.status = 'paid' AND ${inRange('o.created_at')}`,
    ),
    rows<{ day: string; n: number }>(db, sql`SELECT to_char(ist_day, 'YYYY-MM-DD') AS day, sum(amount)::bigint AS n FROM coin_ledger WHERE kind = 'earn' AND ist_day BETWEEN ${range.from}::date AND ${range.to}::date GROUP BY 1`),
    rows<{ status: string; n: number }>(db, sql`SELECT status, count(*)::int AS n FROM coin_redemptions WHERE ${inRange('created_at')} GROUP BY 1 ORDER BY 1`),
  ]);
  const earned = series('coins_earned', 'Coins earned', cur, coins);
  const revenueS = series('revenue', 'Revenue (captured payments)', cur, rev);
  const activeSubscriptions = subs.map((r) => ({ plan: r.plan, interval: r.interval, count: num(r.n), mrrPaise: num(r.mrr) }));
  const itemViews = [...new Set(counters.filter((r) => r.event === 'store_item_view').map((r) => r.dimension))]
    .map((d) => ({ key: d, label: d, value: sumWhere(counters, (r) => r.event === 'store_item_view' && r.dimension === d) }))
    .sort((a, b) => b.value - a.value || (a.key < b.key ? -1 : 1));
  return {
    range,
    billingEnabled,
    plansViews: sumWhere(counters, (r) => r.event === 'plans_view'),
    checkout: {
      started: num(started[0]?.n),
      completed: num(completed[0]?.n),
      failed: num(failed[0]?.n),
      startedCounter: sumWhere(counters, (r) => r.event === 'checkout_start'),
      completedCounter: sumWhere(counters, (r) => r.event === 'checkout_complete'),
    },
    activeSubscriptions,
    mrrPaise: activeSubscriptions.reduce((a, r) => a + r.mrrPaise, 0),
    revenue: revenueS,
    revenueTotalPaise: total(revenueS),
    refundsPaise: sumWhere(rev.map((r) => ({ n: r.refunded })), () => true),
    boardExamPass: { sales: num(pass[0]?.n), revenuePaise: num(pass[0]?.paise) },
    coins: {
      earned,
      earnedTotal: total(earned),
      storeViews: sumWhere(counters, (r) => r.event === 'store_view'),
      itemViews,
      redemptions: redemptions.map((r) => ({ key: r.status, label: r.status, value: num(r.n) })),
    },
  };
}

export async function interest(db: Database, range: Range) {
  const cur = { from: range.from, to: range.to };
  const names = Object.keys(ANALYTICS_EVENTS) as AnalyticsEventName[];
  const [totals, prevTotals, daily] = await Promise.all([
    counterTotals(db, range.from, range.to, names),
    counterTotals(db, range.previousFrom, range.previousTo, names),
    counterSeries(db, range.from, range.to, names),
  ]);
  return {
    range,
    events: names.map((event) => {
      const cfg = ANALYTICS_EVENTS[event];
      const mine = totals.filter((r) => r.event === event);
      return {
        event,
        label: cfg.label,
        source: cfg.client ? ('client' as const) : ('server' as const),
        total: sumWhere(mine, () => true),
        previousTotal: sumWhere(prevTotals, (r) => r.event === event),
        byDimension: mine
          .filter((r) => r.dimension !== '')
          .map((r) => ({ key: r.dimension, label: r.dimension, value: num(r.n) }))
          .sort((a, b) => b.value - a.value || (a.key < b.key ? -1 : 1)),
        series: series(event, cfg.label, cur, daily.filter((r) => r.event === event)),
      };
    }),
  };
}

export async function content(db: Database, range: Range, academicYear: string, now: Date) {
  const { s, e } = bounds(range.from, range.to);
  const ages = ANALYTICS.reportAgeBucketsHours;
  const [subjects, open, inRange] = await Promise.all([
    rows<{ subject: string; label: string; chapters: number; published: number }>(
      db,
      sql`SELECT sub.key AS subject, min(sub.name || ' (' || upper(b.code) || ' ' || sub.class_level || ')') AS label, count(c.id)::int AS chapters,
            count(c.id) FILTER (WHERE EXISTS (SELECT 1 FROM content_releases r WHERE r.chapter_id = c.id AND r.status = 'active'))::int AS published
          FROM subjects sub JOIN boards b ON b.id = sub.board_id JOIN chapters c ON c.subject_id = sub.id
          WHERE c.academic_year = ${academicYear}
          GROUP BY 1 HAVING count(c.id) FILTER (WHERE EXISTS (SELECT 1 FROM content_releases r WHERE r.chapter_id = c.id AND r.status = 'active')) > 0
          ORDER BY 1`,
    ),
    rows<{ hours: number; content_type: string }>(db, sql`SELECT extract(epoch FROM (${now.toISOString()}::timestamptz - created_at)) / 3600 AS hours, content_type FROM content_reports WHERE status = 'open'`),
    rows<{ n: number; fixed: number }>(
      db,
      sql`SELECT count(*)::int AS n, (SELECT count(*)::int FROM content_reports WHERE status = 'fixed' AND resolved_at >= ${s}::timestamptz AND resolved_at < ${e}::timestamptz) AS fixed
          FROM content_reports WHERE created_at >= ${s}::timestamptz AND created_at < ${e}::timestamptz`,
    ),
  ]);
  const ageLabel = (i: number) => {
    const lo = ages[i]!;
    const hi = ages[i + 1];
    const h = (x: number) => (x % 24 === 0 && x > 0 ? `${x / 24} d` : `${x} h`);
    return hi === undefined ? `Older than ${h(lo)}` : `${lo === 0 ? 'Under' : `${h(lo)} to`} ${h(hi)}`;
  };
  const types = [...new Set(open.map((r) => r.content_type))].sort();
  return {
    range,
    subjects: subjects.map((r) => ({ subject: r.subject, label: r.label, chapters: num(r.chapters), published: num(r.published) })),
    openReports: ages.map((lo, i) => ({
      key: String(lo),
      label: ageLabel(i),
      value: open.filter((r) => num(r.hours) >= lo && (ages[i + 1] === undefined || num(r.hours) < ages[i + 1]!)).length,
    })),
    openReportsByType: types.map((t) => ({ key: t, label: t.replace(/_/g, ' '), value: open.filter((r) => r.content_type === t).length })),
    reportsInRange: num(inRange[0]?.n),
    fixedInRange: num(inRange[0]?.fixed),
  };
}
