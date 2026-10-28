/**
 * Schools (backend-api, 2026-10-28; D-014). Search for the profile picker, find-or-create of a school a
 * student adds, saving/clearing it on the profile, and reading it back only while consent is granted.
 *
 * - Child safety: other students see a student-added (unverified) school in search only once
 *   SCHOOLS.search.unverifiedMinStudents accounts have picked it; the student who added it always sees it.
 * - Dedupe: student-added schools are unique by (name_normalized, city_normalized) (migration 0013); a
 *   matching verified/official school is preferred over adding a new row.
 * - Privacy: profiles.city mirrors the school's city and is cleared with it; account deletion clears both
 *   and unlinks the schools the account added (account-deletion.ts); consent withdrawal clears both.
 */
import { and, asc, eq, gte, sql } from 'drizzle-orm';
import { profiles, schools, type Database } from '@soyl/db';
import { SCHOOLS, type IndianState } from '@soyl/shared/config/schools';
import { canonicalState, normalizeCity, schoolSearchKeys, validateCity, validateSchoolName } from '@soyl/shared/profile/school';
import type { Clock } from '../clock';
import { ApiProblem } from '../errors';

type Tx = Parameters<Parameters<Database['transaction']>[0]>[0];
type Db = Database | Tx;
type SchoolRow = typeof schools.$inferSelect;

export interface SchoolDto {
  id: string;
  name: string;
  city: string | null;
  state: IndianState | null;
  board: 'cbse' | 'cisce' | null;
  verified: boolean;
}

export function schoolDto(s: Pick<SchoolRow, 'id' | 'name' | 'city' | 'state' | 'board' | 'verifiedAt'>): SchoolDto {
  return {
    id: s.id,
    name: s.name,
    city: s.city,
    state: s.state ? canonicalState(s.state) : null,
    board: s.board === 'cbse' || s.board === 'cisce' ? s.board : null,
    verified: s.verifiedAt !== null,
  };
}

const invalid = (path: string, message: string) => new ApiProblem('validation_failed', { errors: [{ path, message }] });

/* Search ------------------------------------------------------------------------------------------ */

export async function searchSchools(db: Database, userId: string, q: string, city: string | undefined): Promise<SchoolDto[]> {
  const keys = schoolSearchKeys(q);
  if (!keys.length) throw invalid('querystring.q', `Type at least ${SCHOOLS.search.minQueryLength} letters or numbers.`);
  const cityKey = city === undefined ? null : normalizeCity(city);
  if (city !== undefined && !cityKey) throw invalid('querystring.city', 'Not a city name.');
  // Keys hold only letters, numbers and single spaces (shared/profile/school), so no LIKE escaping is needed.
  const nameMatch = sql.join(
    keys.map((k) => sql`(${schools.nameNormalized} LIKE ${`${k}%`} OR ${schools.nameNormalized} LIKE ${`% ${k}%`})`),
    sql` OR `,
  );
  const startsWith = sql.join(
    keys.map((k) => sql`${schools.nameNormalized} LIKE ${`${k}%`}`),
    sql` OR `,
  );
  const picks = sql<number>`(SELECT count(*) FROM ${profiles} p WHERE p.school_id = ${schools.id})`;
  const rows = await db
    .select({ id: schools.id, name: schools.name, city: schools.city, state: schools.state, board: schools.board, verifiedAt: schools.verifiedAt })
    .from(schools)
    .where(
      and(
        sql`(${nameMatch})`,
        cityKey ? eq(schools.cityNormalized, cityKey) : undefined,
        // Child safety: unverified student-added names are shown to others only once enough accounts picked them.
        sql`(${schools.source} <> 'student' OR ${schools.verifiedAt} IS NOT NULL OR ${schools.createdByUserId} = ${userId} OR ${picks} >= ${SCHOOLS.search.unverifiedMinStudents})`,
      ),
    )
    .orderBy(sql`(CASE WHEN ${startsWith} THEN 0 ELSE 1 END)`, sql`(${schools.verifiedAt} IS NULL)`, asc(schools.nameNormalized), asc(schools.cityNormalized), asc(schools.id))
    .limit(SCHOOLS.search.maxResults);
  return rows.map(schoolDto);
}

/* Find or create ----------------------------------------------------------------------------------- */

export interface SchoolCreateInput {
  name: string;
  city: string;
  state?: string;
  board?: 'cbse' | 'cisce';
}

/**
 * Validates and normalises, then returns the existing school with the same name + city key (verified or
 * official first, else the student-added row) or adds an unverified `student` school.
 */
export async function findOrCreateSchool(db: Database, clock: Clock, userId: string, input: SchoolCreateInput): Promise<SchoolRow> {
  const name = validateSchoolName(input.name);
  if (!name.ok) throw invalid('body.school.name', `School name ${name.reason}.`);
  const city = validateCity(input.city);
  if (!city.ok) throw invalid('body.school.city', `City ${city.reason}.`);
  let state: IndianState | null = null;
  if (input.state !== undefined) {
    state = canonicalState(input.state);
    if (!state) throw invalid('body.school.state', 'State must be a state or union territory of India.');
  }

  const existing = async () =>
    (
      await db
        .select()
        .from(schools)
        .where(and(eq(schools.nameNormalized, name.key), eq(schools.cityNormalized, city.key)))
        .orderBy(sql`(${schools.verifiedAt} IS NULL)`, sql`(${schools.source} = 'student')`, asc(schools.createdAt), asc(schools.id))
        .limit(1)
    )[0];
  const found = await existing();
  if (found) return found;

  const now = new Date(clock.now());
  const [recent] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(schools)
    .where(and(eq(schools.createdByUserId, userId), gte(schools.createdAt, new Date(now.getTime() - 86_400_000))));
  if (Number(recent?.n ?? 0) >= SCHOOLS.maxCreatedPerUserPerDay) {
    throw new ApiProblem('rate_limited', { retryAfterSeconds: 3600, headers: { 'retry-after': '3600' }, detail: 'You have added several schools today. Pick one from the list or try again tomorrow.' });
  }
  const [created] = await db
    .insert(schools)
    .values({
      name: name.value,
      nameNormalized: name.key,
      city: city.value,
      cityNormalized: city.key,
      state,
      board: input.board ?? null,
      source: 'student',
      createdByUserId: userId,
      createdAt: now,
      updatedAt: now,
    })
    .onConflictDoNothing({ target: [schools.nameNormalized, schools.cityNormalized], where: sql`source = 'student'` })
    .returning();
  if (created) return created;
  // Another student added the same school at the same moment.
  const raced = await existing();
  if (!raced) throw new ApiProblem('conflict');
  return raced;
}

export async function schoolById(db: Db, id: string): Promise<SchoolRow | null> {
  const [s] = await db.select().from(schools).where(eq(schools.id, id));
  return s ?? null;
}

/* Profile ------------------------------------------------------------------------------------------ */

/** The profile fields for a chosen school (city mirrors the school's), or for clearing it. */
export function profileSchoolFields(s: Pick<SchoolRow, 'id' | 'city'> | null): { schoolId: string | null; city: string | null } {
  return s ? { schoolId: s.id, city: s.city } : { schoolId: null, city: null };
}

/** The caller's school for display, only while consent is granted (D-014). */
export async function visibleSchool(db: Db, schoolId: string | null | undefined, consentGranted: boolean): Promise<SchoolDto | null> {
  if (!consentGranted || !schoolId) return null;
  const s = await schoolById(db, schoolId);
  return s ? schoolDto(s) : null;
}

/** D-014 on withdrawal: school and city are off for an account whose consent is no longer granted. */
export async function clearSchool(db: Db, userId: string, now: Date): Promise<boolean> {
  const r = await db
    .update(profiles)
    .set({ schoolId: null, city: null, updatedAt: now })
    .where(and(eq(profiles.userId, userId), sql`(${profiles.schoolId} IS NOT NULL OR ${profiles.city} IS NOT NULL)`))
    .returning({ id: profiles.id });
  return r.length > 0;
}

/**
 * Account deletion (PII.md): unverified schools this account added that no other profile uses are
 * deleted (a typed name could identify the child); the rest stay as shared school records, unlinked.
 * Call after the profile's school_id has been cleared.
 */
export async function unlinkCreatedSchools(tx: Db, userId: string): Promise<void> {
  await tx.execute(sql`
    DELETE FROM schools s WHERE s.created_by_user_id = ${userId} AND s.source = 'student' AND s.verified_at IS NULL
      AND NOT EXISTS (SELECT 1 FROM profiles p WHERE p.school_id = s.id)`);
  await tx.update(schools).set({ createdByUserId: null }).where(eq(schools.createdByUserId, userId));
}

