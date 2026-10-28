/**
 * Super-admin user lookup (D-045; threat model: "admins see masked PII by default with an audited
 * reveal"). Lists show masked emails/phones and never names. Revealing the full email, opening a
 * user's summary and searching by email each write an `audit_log` row (actor, action, target, request
 * id; never the email itself). The summary is counts only: never AI chats, uploads, answers or text.
 */
import { sql } from 'drizzle-orm';
import { auditLog, normalizeEmail, type Database } from '@soyl/db';
import { ACCOUNT } from '@soyl/shared/config/security';
import { ADMIN_AUDIT_ACTIONS } from '@soyl/shared/config/analytics';
import { ApiProblem } from '../../errors';
import { dayNumber, dayString } from '../gamification';
import { METHOD_SQL } from './analytics';

/** a***@g***.com — first letter of the mailbox and of the domain, then the top-level domain. */
export function maskEmail(email: string | null | undefined): string | null {
  if (!email) return null;
  const at = email.lastIndexOf('@');
  if (at <= 0) return '***';
  const local = email.slice(0, at);
  const domain = email.slice(at + 1).toLowerCase();
  if (domain === ACCOUNT.phoneTempEmailDomain) return null;
  const dot = domain.lastIndexOf('.');
  const tld = dot > 0 ? domain.slice(dot) : '';
  return `${[...local][0] ?? '*'}***@${[...domain][0] ?? '*'}***${tld}`;
}

/** +91******12 — country code and the last two digits. */
export function maskPhone(phone: string | null | undefined): string | null {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 4) return '******';
  const cc = phone.startsWith('+91') ? '+91' : '+';
  return `${cc}******${digits.slice(-2)}`;
}

interface RawRow extends Record<string, unknown> {
  id: string;
  email: string;
  phone_number: string | null;
  method: 'email' | 'phone' | 'google';
  role: string;
  board: string | null;
  class_level: number | null;
  consent: string | null;
  created_at: string | Date;
}

const rowSelect = sql`SELECT u.id, u.email, u.phone_number, ${METHOD_SQL('u')} AS method, u.role, p.board, p.class_level, cs.status AS consent, u.created_at
  FROM users u LEFT JOIN profiles p ON p.user_id = u.id LEFT JOIN consent_status cs ON cs.user_id = u.id`;

export function toRow(r: RawRow) {
  return {
    id: r.id,
    maskedEmail: maskEmail(r.email),
    maskedPhone: maskPhone(r.phone_number),
    method: r.method,
    role: r.role,
    board: r.board,
    classLevel: r.class_level === null ? null : Number(r.class_level),
    consent: r.consent ?? 'required',
    createdAt: new Date(r.created_at).toISOString(),
  };
}

const encodeCursor = (createdAt: string, id: string) => Buffer.from(`${createdAt}|${id}`).toString('base64url');
function decodeCursor(c: string): { createdAt: string; id: string } {
  const [createdAt, id] = Buffer.from(c, 'base64url').toString('utf8').split('|');
  if (!createdAt || !id || Number.isNaN(Date.parse(createdAt)) || !/^[0-9a-f-]{36}$/.test(id))
    throw new ApiProblem('validation_failed', { errors: [{ path: 'querystring.cursor', message: 'Invalid cursor.' }] });
  return { createdAt, id };
}

/** Newest accounts first (students and parents; staff and deleted accounts are left out). */
export async function recentUsers(db: Database, q: { limit: number; cursor?: string }) {
  const after = q.cursor ? decodeCursor(q.cursor) : null;
  const res = await db.execute<RawRow>(sql`${rowSelect}
    WHERE u.deleted_at IS NULL AND u.role NOT IN ('reviewer', 'admin')
    ${after ? sql`AND (u.created_at, u.id) < (${after.createdAt}::timestamptz, ${after.id}::uuid)` : sql``}
    ORDER BY u.created_at DESC, u.id DESC LIMIT ${q.limit + 1}`);
  const page = res.rows.slice(0, q.limit);
  const last = page[page.length - 1];
  return {
    users: page.map(toRow),
    nextCursor: res.rows.length > q.limit && last ? encodeCursor(new Date(last.created_at).toISOString(), last.id) : null,
  };
}

export interface AuditActor {
  userId: string;
  role: string;
  requestId: string;
}

async function audit(db: Database, actor: AuditActor, action: string, targetId: string | null, after: Record<string, unknown>) {
  await db.insert(auditLog).values({ actorUserId: actor.userId, actorRole: actor.role, action, targetType: 'user', targetId, after, requestId: actor.requestId });
}

/** Exact (normalised) email match. Audited with the result, never with the address. */
export async function searchByEmail(db: Database, actor: AuditActor, email: string) {
  const norm = normalizeEmail(email);
  if (!norm) throw new ApiProblem('validation_failed', { errors: [{ path: 'body.email', message: 'Not an email address.' }] });
  const res = await db.execute<RawRow>(sql`${rowSelect} WHERE u.deleted_at IS NULL AND (u.email_normalized = ${norm} OR lower(u.email) = ${email.trim().toLowerCase()}) LIMIT 2`);
  await audit(db, actor, ADMIN_AUDIT_ACTIONS.search, res.rows[0]?.id ?? null, { found: res.rows.length });
  return { users: res.rows.map(toRow) };
}

async function loadUser(db: Database, id: string): Promise<RawRow> {
  const res = await db.execute<RawRow>(sql`${rowSelect} WHERE u.id = ${id}::uuid AND u.deleted_at IS NULL`);
  const row = res.rows[0];
  if (!row) throw new ApiProblem('not_found');
  return row;
}

export async function revealEmail(db: Database, actor: AuditActor, id: string) {
  const row = await loadUser(db, id);
  const email = row.email.endsWith(`@${ACCOUNT.phoneTempEmailDomain}`) ? null : row.email;
  await audit(db, actor, ADMIN_AUDIT_ACTIONS.revealEmail, id, { fields: ['email'] });
  return { id, email, audited: true as const };
}

const n = (v: unknown) => (v === null || v === undefined ? 0 : Number(v));

export async function userSummary(db: Database, actor: AuditActor, id: string, today: string) {
  const row = await loadUser(db, id);
  const from30 = dayString(dayNumber(today) - 29);
  const since30 = new Date(`${from30}T00:00:00+05:30`).toISOString();
  const res = await db.execute<Record<string, unknown>>(sql`SELECT
      (SELECT count(*) FROM lesson_progress WHERE user_id = ${id}::uuid) AS lessons_opened,
      (SELECT count(*) FROM lesson_progress WHERE user_id = ${id}::uuid AND completed_at IS NOT NULL) AS lessons_completed,
      (SELECT count(*) FROM practice_answers WHERE user_id = ${id}::uuid) AS practice_answers,
      (SELECT count(DISTINCT question_key) FROM practice_answers pa WHERE user_id = ${id}::uuid
         AND (pa.correct IS TRUE OR (pa.grading = 'self' AND pa.marks_awarded IS NOT NULL AND pa.marks_awarded >= pa.max_marks))) AS practice_solved,
      (SELECT count(*) FROM attempts WHERE user_id = ${id}::uuid AND started_at IS NOT NULL) AS tests_started,
      (SELECT count(*) FROM attempts WHERE user_id = ${id}::uuid AND submitted_at IS NOT NULL) AS tests_submitted,
      (SELECT count(DISTINCT d) FROM (
         SELECT (answered_at AT TIME ZONE 'Asia/Kolkata')::date AS d FROM practice_answers WHERE user_id = ${id}::uuid AND answered_at >= ${since30}::timestamptz
         UNION SELECT (updated_at AT TIME ZONE 'Asia/Kolkata')::date FROM lesson_progress WHERE user_id = ${id}::uuid AND updated_at >= ${since30}::timestamptz
         UNION SELECT (submitted_at AT TIME ZONE 'Asia/Kolkata')::date FROM attempts WHERE user_id = ${id}::uuid AND submitted_at >= ${since30}::timestamptz) x) AS active_days_30,
      (SELECT to_char(max(d), 'YYYY-MM-DD') FROM (
         SELECT max((answered_at AT TIME ZONE 'Asia/Kolkata')::date) AS d FROM practice_answers WHERE user_id = ${id}::uuid
         UNION ALL SELECT max((updated_at AT TIME ZONE 'Asia/Kolkata')::date) FROM lesson_progress WHERE user_id = ${id}::uuid
         UNION ALL SELECT max((coalesce(submitted_at, started_at) AT TIME ZONE 'Asia/Kolkata')::date) FROM attempts WHERE user_id = ${id}::uuid) y) AS last_active,
      (SELECT CASE WHEN last_active_ist_day >= ${dayString(dayNumber(today) - 1)}::date THEN current_days ELSE 0 END FROM streaks WHERE user_id = ${id}::uuid) AS streak,
      (SELECT total_xp FROM streaks WHERE user_id = ${id}::uuid) AS xp,
      (SELECT count(*) FROM ai_requests WHERE user_id = ${id}::uuid AND created_at >= ${since30}::timestamptz) AS ai_requests_30,
      (SELECT coalesce(sum(credits_charged), 0) FROM ai_requests WHERE user_id = ${id}::uuid AND created_at >= ${since30}::timestamptz) AS credits_spent_30,
      (SELECT coalesce(sum(amount), 0) FROM credit_ledger WHERE user_id = ${id}::uuid AND kind = 'grant' AND ist_day >= ${from30}::date) AS credits_granted_30,
      (SELECT coalesce(sum(amount), 0) FROM coin_ledger WHERE user_id = ${id}::uuid) AS coins_balance,
      (SELECT coalesce(sum(amount), 0) FROM coin_ledger WHERE user_id = ${id}::uuid AND kind = 'earn') AS coins_earned,
      (SELECT age_band FROM consent_records WHERE user_id = ${id}::uuid) AS age_band,
      (SELECT school_id IS NOT NULL FROM profiles WHERE user_id = ${id}::uuid) AS has_school,
      (SELECT coalesce(array_agg(DISTINCT provider_id), '{}') FROM accounts WHERE user_id = ${id}::uuid) AS providers`);
  const r = res.rows[0] ?? {};
  const [ent] = (
    await db.execute<{ plan: string; valid_until: string | Date; status: string | null }>(sql`
      SELECT p.key AS plan, e.valid_until, s.status FROM entitlements e JOIN plans p ON p.id = e.plan_id LEFT JOIN subscriptions s ON s.id = e.subscription_id
      WHERE e.user_id = ${id}::uuid AND e.revoked_at IS NULL AND e.valid_from <= now() AND e.valid_until > now()
      ORDER BY e.valid_until DESC LIMIT 1`)
  ).rows;
  const providers = (r.providers as string[] | null) ?? [];
  const methods: ('email' | 'phone' | 'google')[] = [];
  if (!row.email.endsWith(`@${ACCOUNT.phoneTempEmailDomain}`)) methods.push('email');
  if (row.phone_number) methods.push('phone');
  if (providers.includes('google')) methods.push('google');
  await audit(db, actor, ADMIN_AUDIT_ACTIONS.viewSummary, id, { fields: ['counts'] });
  const consent = row.consent as 'required' | 'pending' | 'granted' | 'revoked' | null;
  return {
    user: toRow(row),
    signInMethods: methods,
    consent: consent ?? null,
    ageBand: (r.age_band as 'adult' | 'minor' | null) ?? null,
    hasSchool: r.has_school === true,
    activity: {
      lessonsOpened: n(r.lessons_opened),
      lessonsCompleted: n(r.lessons_completed),
      practiceAnswers: n(r.practice_answers),
      practiceSolved: n(r.practice_solved),
      testsStarted: n(r.tests_started),
      testsSubmitted: n(r.tests_submitted),
      activeDays30: n(r.active_days_30),
      lastActiveDay: (r.last_active as string | null) ?? null,
      currentStreak: n(r.streak),
      totalXp: n(r.xp),
    },
    ai: { requests30: n(r.ai_requests_30), creditsSpent30: n(r.credits_spent_30), creditsGranted30: n(r.credits_granted_30) },
    coins: { balance: n(r.coins_balance), earned: n(r.coins_earned) },
    subscription: ent
      ? { plan: ent.plan, status: ent.status ?? 'active', validUntil: new Date(ent.valid_until).toISOString() }
      : { plan: 'free', status: null, validUntil: null },
    audited: true as const,
  };
}

