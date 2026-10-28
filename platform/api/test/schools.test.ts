/**
 * School capture (D-014): GET /v1/schools search and PATCH /v1/me `school` for consent-granted accounts
 * only (403 consent_required otherwise, nothing leaked in /v1/me or /v1/me/dashboard), find-or-create
 * dedupe on normalised name + city, the child-safety rule for unverified names in search, validation,
 * clearing, the per-day creation cap, and account deletion (PII.md).
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { eq, like } from 'drizzle-orm';
import { profiles, schools } from '@soyl/db';
import { RATE_LIMITS } from '@soyl/shared/config/security';
import { SCHOOLS } from '@soyl/shared/config/schools';
import { normalizeCity, normalizeSchoolName } from '@soyl/shared/profile/school';
import { createHarness, type Client, type Harness } from './helpers';

let h: Harness;
let n = 0;
const email = (p: string) => `${p}.${Date.now().toString(36)}${++n}@example.com`;
/** A distinct, valid school-name word (letters only: base-26 of a per-run counter). */
const RUN = Date.now();
function word(): string {
  let x = RUN * 1000 + ++n;
  let out = '';
  while (x > 0) {
    out = String.fromCharCode(97 + (x % 26)) + out;
    x = Math.floor(x / 26);
  }
  return `Zq${out}`;
}

async function member(consent: 'granted' | 'required' = 'granted'): Promise<{ c: Client; id: string; email: string }> {
  const c = h.client();
  const address = email('school');
  const r = await c.signInEmail(address);
  h.consent.setStatus(r.user.id, consent);
  h.clock.advance(16 * 60_000); // past the consent cache TTL (CONSENT.cacheTtlSeconds) cached at sign-in
  return { c, id: r.user.id, email: address };
}

async function official(name: string, city: string, extra: Partial<typeof schools.$inferInsert> = {}) {
  const [s] = await h.t.db
    .insert(schools)
    .values({ name, nameNormalized: normalizeSchoolName(name), city, cityNormalized: normalizeCity(city), source: 'udise', verifiedAt: new Date(h.clock.now()), ...extra })
    .returning();
  return s!;
}

const profileOf = async (id: string) => (await h.t.db.select().from(profiles).where(eq(profiles.userId, id)))[0];

beforeAll(async () => {
  h = await createHarness();
});
afterAll(async () => {
  await h?.close();
});

describe('consent gate (D-014)', () => {
  it('guests get 401; members without granted consent get 403 consent_required on search and on saving, and nothing leaks', async () => {
    expect((await h.client().get('/v1/schools?q=delhi')).statusCode).toBe(401);
    const s = await official(`${word()} Public School`, 'Delhi');
    const { c, id } = await member('required');
    const search = await c.get('/v1/schools?q=delhi');
    expect(search.statusCode).toBe(403);
    expect(search.json().code).toBe('consent_required');
    expect((await c.patch('/v1/me', { school: { schoolId: s.id } })).json().code).toBe('consent_required');

    // A school stored earlier (e.g. before a withdrawal handled by another provider) is never returned.
    await h.t.db.insert(profiles).values({ userId: id, schoolId: s.id, city: 'Delhi' }).onConflictDoUpdate({ target: profiles.userId, set: { schoolId: s.id, city: 'Delhi' } });
    const me = await c.get('/v1/me');
    expect(me.json().school).toBeNull();
    const dash = await c.get('/v1/me/dashboard');
    expect(dash.statusCode, dash.body).toBe(200);
    expect(dash.json().profile).toEqual({ board: null, classLevel: null, school: null, schoolStatus: 'consent_required', missing: ['board', 'classLevel'] });
    for (const body of [me.body, dash.body]) {
      expect(body).not.toContain(s.name);
      expect(body).not.toContain(s.id);
      expect(body).not.toContain('Delhi');
    }
  });
});

describe('find-or-create and dedupe', () => {
  it('the same school typed differently (case, punctuation, abbreviations, old city name) is stored once', async () => {
    const w = word();
    const a = await member();
    const b = await member();
    const first = await a.c.patch('/v1/me', { school: { name: `St. Mary's Sr. Sec. School ${w}`, city: 'Bombay', state: 'maharashtra', board: 'cbse' } });
    expect(first.statusCode, first.body).toBe(200);
    expect(first.json().school).toMatchObject({ name: `St. Mary's Sr. Sec. School ${w}`, city: 'Bombay', state: 'Maharashtra', board: 'cbse', verified: false });
    const second = await b.c.patch('/v1/me', { school: { name: `  ST MARYS SENIOR SECONDARY school ${w.toLowerCase()} `, city: 'mumbai' } });
    expect(second.statusCode, second.body).toBe(200);
    expect(second.json().school.id).toBe(first.json().school.id);
    const rows = await h.t.db.select().from(schools).where(eq(schools.nameNormalized, `saint marys senior secondary school ${w.toLowerCase()}`));
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ source: 'student', verifiedAt: null, createdByUserId: a.id, cityNormalized: 'mumbai' });
    // profiles.city mirrors the school's city.
    expect((await profileOf(b.id))!.city).toBe('Bombay');
  });

  it('a verified or official school with the same key is preferred over adding a new row', async () => {
    const name = `${word()} Vidyalaya`;
    const s = await official(name, 'Pune');
    const { c } = await member();
    const res = await c.patch('/v1/me', { school: { name: name.toUpperCase(), city: 'PUNE' } });
    expect(res.json().school).toMatchObject({ id: s.id, verified: true });
    expect(await h.t.db.select().from(schools).where(eq(schools.nameNormalized, normalizeSchoolName(name)))).toHaveLength(1);
  });

  it('clearing removes school and city; picking an unknown id is a 400', async () => {
    const { c, id } = await member();
    expect((await c.patch('/v1/me', { school: { name: `${word()} Convent School`, city: 'Kochi' } })).statusCode).toBe(200);
    const cleared = await c.patch('/v1/me', { school: null });
    expect(cleared.statusCode).toBe(200);
    expect(cleared.json().school).toBeNull();
    const p = await profileOf(id);
    expect({ schoolId: p!.schoolId, city: p!.city }).toEqual({ schoolId: null, city: null });
    const unknown = await c.patch('/v1/me', { school: { schoolId: '0190f6a0-0000-7000-8000-000000000000' } });
    expect(unknown.statusCode).toBe(400);
    expect(unknown.json().errors[0].path).toBe('body.school.schoolId');
  });

  it.each([
    ['a link', { name: 'www.bestschool.com', city: 'Pune' }, 'body.school.name'],
    ['an email', { name: 'School of rahul@gmail.com', city: 'Pune' }, 'body.school.name'],
    ['a phone number', { name: 'Tuition 9876543210', city: 'Pune' }, 'body.school.name'],
    ['a blocked word', { name: 'Fuck School', city: 'Pune' }, 'body.school.name'],
    ['a too-short name', { name: 'ab', city: 'Pune' }, 'body.school.name'],
    ['digits in the city', { name: 'Good School', city: 'Pune 411001' }, 'body.school.city'],
    ['an unknown state', { name: 'Good School', city: 'Pune', state: 'Atlantis' }, 'body.school.state'],
  ])('rejects %s (400, nothing stored)', async (_why, school, path) => {
    const { c, id } = await member();
    const res = await c.patch('/v1/me', { school });
    expect(res.statusCode).toBe(400);
    expect(res.json().errors[0].path).toBe(path);
    expect((await profileOf(id))?.schoolId ?? null).toBeNull();
  });

  it('rejects unknown fields and a wrong board (strict body)', async () => {
    const { c } = await member();
    expect((await c.patch('/v1/me', { school: { name: 'Good School', city: 'Pune', udiseCode: '1' } })).statusCode).toBe(400);
    expect((await c.patch('/v1/me', { school: { name: 'Good School', city: 'Pune', board: 'ib' } })).statusCode).toBe(400);
    expect((await c.patch('/v1/me', { school: { schoolId: 'not-a-uuid' } })).statusCode).toBe(400);
  });

  it(`caps schools added per account per day (${SCHOOLS.maxCreatedPerUserPerDay})`, async () => {
    const { c } = await member();
    for (let i = 0; i < SCHOOLS.maxCreatedPerUserPerDay; i++) expect((await c.patch('/v1/me', { school: { name: `${word()} School`, city: 'Surat' } })).statusCode).toBe(200);
    const capped = await c.patch('/v1/me', { school: { name: `${word()} School`, city: 'Surat' } });
    expect(capped.statusCode).toBe(429);
    // Picking an existing school still works.
    const s = await official(`${word()} High School`, 'Surat');
    expect((await c.patch('/v1/me', { school: { schoolId: s.id } })).statusCode).toBe(200);
    h.clock.advance(86_400_000 + 1000);
    expect((await c.patch('/v1/me', { school: { name: `${word()} School`, city: 'Surat' } })).statusCode).toBe(200);
  });
});

describe('GET /v1/schools', () => {
  it('matches a prefix of the name or of any word, filters by city, starts-with first, at most 20', async () => {
    const w = word();
    const lw = w.toLowerCase();
    const a = await official(`${w} Public School`, 'Jaipur');
    const b = await official(`Shri ${w} Vidya Mandir`, 'Jaipur');
    const c2 = await official(`${w} Academy`, 'Udaipur');
    const { c } = await member();
    const all = (await c.get(`/v1/schools?q=${lw}`)).json().schools as { id: string; name: string }[];
    const ids = all.map((s) => s.id);
    expect(ids).toEqual(expect.arrayContaining([a.id, b.id, c2.id]));
    // Name starts with the query before a later word does.
    expect(ids.indexOf(b.id)).toBeGreaterThan(ids.indexOf(a.id));
    const jaipur = (await c.get(`/v1/schools?q=${lw}&city=JAIPUR`)).json().schools.map((s: { id: string }) => s.id);
    expect(jaipur.sort()).toEqual([a.id, b.id].sort());
    expect((await c.get(`/v1/schools?q=${lw}%20public&city=jaipur`)).json().schools).toEqual([{ id: a.id, name: a.name, city: 'Jaipur', state: null, board: null, verified: true }]);

    const many = word();
    for (let i = 0; i < SCHOOLS.search.maxResults + 5; i++) await official(`${many} School ${String.fromCharCode(97 + i)}`, 'Agra');
    expect((await c.get(`/v1/schools?q=${many.toLowerCase()}`)).json().schools).toHaveLength(SCHOOLS.search.maxResults);
  });

  it('validates the query (400) and is rate limited (schools.search.user)', async () => {
    const { c } = await member();
    expect((await c.get('/v1/schools')).statusCode).toBe(400);
    expect((await c.get('/v1/schools?q=a')).statusCode).toBe(400);
    expect((await c.get('/v1/schools?q=!!')).statusCode).toBe(400);
    expect((await c.get(`/v1/schools?q=${'a'.repeat(SCHOOLS.search.maxQueryLength + 1)}`)).statusCode).toBe(400);
    expect((await c.get('/v1/schools?q=delhi&x=1')).statusCode).toBe(400);
    const limit = RATE_LIMITS['schools.search.user'].limit;
    const used = 5;
    for (let i = used; i < limit; i++) expect((await c.get('/v1/schools?q=delhi')).statusCode).toBe(200);
    expect((await c.get('/v1/schools?q=delhi')).statusCode).toBe(429);
  });

  it('child safety: an unverified student-added name is visible to others only once enough accounts picked it', async () => {
    expect(SCHOOLS.search.unverifiedMinStudents).toBe(2);
    const w = word();
    const creator = await member();
    const other = await member();
    const third = await member();
    const created = (await creator.c.patch('/v1/me', { school: { name: `${w} Learning Centre`, city: 'Indore' } })).json().school as { id: string };
    const find = async (c: Client) => (await c.get(`/v1/schools?q=${w.toLowerCase()}`)).json().schools.map((s: { id: string }) => s.id);
    expect(await find(creator.c)).toEqual([created.id]);
    expect(await find(other.c)).toEqual([]);
    // A second student adds the same school (dedupe does not depend on search) → now listed for everyone.
    expect((await other.c.patch('/v1/me', { school: { name: `${w} learning centre`, city: 'indore' } })).json().school.id).toBe(created.id);
    expect(await find(third.c)).toEqual([created.id]);
  });
});

describe('account deletion (PII.md)', () => {
  it('clears the profile school; deletes unverified schools only this account used; unlinks shared ones', async () => {
    const owner = await member();
    const friend = await member();
    const solo = (await owner.c.patch('/v1/me', { school: { name: `${word()} Solo School`, city: 'Patna' } })).json().school as { id: string };
    const sharedName = `${word()} Shared School`;
    const shared = (await owner.c.patch('/v1/me', { school: { name: sharedName, city: 'Patna' } })).json().school as { id: string };
    expect((await friend.c.patch('/v1/me', { school: { name: sharedName, city: 'Patna' } })).json().school.id).toBe(shared.id);
    // The owner's profile points at `shared` now; `solo` is used by nobody else.
    // Deletion needs a fresh sign-in (AUTH-9).
    const fresh = h.client();
    await fresh.signInEmail(owner.email);
    expect((await fresh.delete('/v1/me')).statusCode).toBe(200);
    const p = await profileOf(owner.id);
    expect({ schoolId: p!.schoolId, city: p!.city, weeklyGoal: p!.weeklyGoal }).toEqual({ schoolId: null, city: null, weeklyGoal: null });
    expect(await h.t.db.select().from(schools).where(eq(schools.id, solo.id))).toHaveLength(0);
    const [kept] = await h.t.db.select().from(schools).where(eq(schools.id, shared.id));
    expect(kept).toMatchObject({ createdByUserId: null });
    expect((await profileOf(friend.id))!.schoolId).toBe(shared.id);
    expect(await h.t.db.select().from(schools).where(eq(schools.createdByUserId, owner.id))).toHaveLength(0);
    expect(await h.t.db.select().from(schools).where(like(schools.name, '%Solo School'))).toHaveLength(0);
  });
});
