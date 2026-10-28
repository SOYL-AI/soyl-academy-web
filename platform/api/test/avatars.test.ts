/**
 * Student avatars (@soyl/shared/config/avatars, migration 0015): the default is the public-name animal on
 * a seeded background; GET /v1/me/avatars lists unlocks with progress; PATCH /v1/me picks only unlocked
 * avatars (403 avatar_locked) — unlocks by level, badge, streak, league tier and live mocks; a new
 * public name drops an avatar that only the old name unlocked; account deletion clears it. Public boards
 * are covered in leagues.test.ts and live.test.ts (avatar next to the name, no user ids).
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { eq } from 'drizzle-orm';
import { attempts, leagueMemberships, liveEvents, profiles, streaks, tests, userBadges } from '@soyl/db';
import { AVATARS, AVATAR_BACKGROUND_IDS, avatarById, defaultAvatar } from '@soyl/shared/config/avatars';
import { publicName, publicNameAnimal } from '@soyl/shared/config/public-names';
import { ensureBadges } from '../src/domain/gamification';
import { dropAvatarIfLocked } from '../src/domain/avatars';
import { createHarness, seedMiniCatalog, type Client, type Harness } from './helpers';

let h: Harness;
let subjectId: string;
let n = 0;

beforeAll(async () => {
  h = await createHarness({ consentDefault: 'granted' });
  const { science } = await seedMiniCatalog(h.t);
  subjectId = science.id;
});
afterAll(async () => {
  await h?.close();
});

async function member(): Promise<{ c: Client; id: string; email: string }> {
  const c = h.client();
  const email = `avatar.${Date.now().toString(36)}${++n}@example.com`;
  const r = await c.signInEmail(email);
  return { c, id: r.user.id, email };
}

const pick = (c: Client, avatar: { id: string; bg: string } | null) => c.patch('/v1/me', { avatar });
const isStarter = (id: string) => avatarById(id)!.unlock.kind === 'starter';
/** A locked avatar of `kind` that is not the student's own public-name animal. */
function lockedOf(kind: string, userId: string, pred: (a: (typeof AVATARS)[number]) => boolean = () => true) {
  const own = publicNameAnimal(userId).toLowerCase();
  return AVATARS.find((a) => a.unlock.kind === kind && a.id !== own && pred(a))!;
}

describe('default avatar and GET /v1/me', () => {
  it('is the public-name animal on a seeded background until the student picks one', async () => {
    const { c, id } = await member();
    const me = (await c.get('/v1/me')).json();
    const d = defaultAvatar(id, 0);
    expect(me.avatar).toEqual({ ...d, isDefault: true });
    expect(me.publicName.split(' ')[1].toLowerCase()).toBe(d.id);
    expect(AVATAR_BACKGROUND_IDS).toContain(me.avatar.bg);

    const starter = AVATARS.find((a) => a.unlock.kind === 'starter' && a.id !== d.id)!;
    const res = await pick(c, { id: starter.id, bg: 'lavender' });
    expect(res.statusCode).toBe(200);
    expect(res.json().avatar).toEqual({ id: starter.id, bg: 'lavender', isDefault: false });
    expect((await c.get('/v1/me')).json().avatar).toEqual({ id: starter.id, bg: 'lavender', isDefault: false });
    // null goes back to the default; the default follows a new public name.
    expect((await pick(c, null)).json().avatar).toEqual({ ...d, isDefault: true });
    await h.t.db.update(profiles).set({ publicNameSeed: 42 }).where(eq(profiles.userId, id));
    expect((await c.get('/v1/me')).json().avatar).toEqual({ ...defaultAvatar(id, 42), isDefault: true });
  });

  it('validates the body: unknown ids and backgrounds are 400, never stored', async () => {
    const { c } = await member();
    expect((await pick(c, { id: 'unicorn', bg: 'sky' })).statusCode).toBe(400);
    expect((await pick(c, { id: 'owl', bg: '#ff0000' })).statusCode).toBe(400);
    expect((await c.patch('/v1/me', { avatar: { id: 'owl' } })).statusCode).toBe(400);
    expect((await c.patch('/v1/me', { avatar: { id: 'owl', bg: 'sky', locked: false } })).statusCode).toBe(400);
    expect((await c.get('/v1/me')).json().avatar.isDefault).toBe(true);
    expect((await h.client().get('/v1/me/avatars')).statusCode).toBe(401);
  });
});

describe('GET /v1/me/avatars', () => {
  it('lists all 64 with rules, labels and progress: 16 starters plus the public-name animal unlocked', async () => {
    const { c, id } = await member();
    const res = await c.get('/v1/me/avatars');
    expect(res.statusCode).toBe(200);
    expect(res.headers['cache-control']).toBe('no-store');
    const cat = res.json();
    const own = publicNameAnimal(id).toLowerCase();
    expect(cat.total).toBe(64);
    expect(cat.avatars).toHaveLength(64);
    expect(cat.unlockedCount).toBe(isStarter(own) ? 16 : 17);
    expect(cat.current).toEqual({ ...defaultAvatar(id), isDefault: true });
    expect(cat.default).toEqual(defaultAvatar(id));
    expect(cat.backgrounds).toHaveLength(8);
    expect(cat.backgrounds[0]).toEqual({ id: 'sky', label: 'Sky', token: 'p-avatar-sky' });
    const ownRow = cat.avatars.find((a: { id: string }) => a.id === own);
    expect(ownRow).toMatchObject({ unlocked: true, isPublicNameAnimal: true });
    const crane = cat.avatars.find((a: { id: string }) => a.id === 'crane');
    if (own !== 'crane') expect(crane).toEqual({ id: 'crane', animal: 'Crane', unlocked: false, isPublicNameAnimal: false, unlock: { kind: 'level', level: 5 }, unlockLabel: 'Reach level 5', progress: { current: 1, target: 5 } });
    const hoopoe = cat.avatars.find((a: { id: string }) => a.id === 'hoopoe');
    expect(hoopoe).toMatchObject({ unlock: { kind: 'badge', badge: 'streak-7' }, unlockLabel: 'Earn the Week warrior badge' });
    expect(cat.avatars.find((a: { id: string }) => a.id === 'peacock')).toMatchObject({ unlock: { kind: 'league_tier', tier: 5 }, unlockLabel: 'Play in the Diamond league' });
    expect(cat.avatars.find((a: { id: string }) => a.id === 'eagle')).toMatchObject({ unlock: { kind: 'live_mocks', count: 3 }, unlockLabel: 'Take part in 3 live All-India mocks' });
    // Nothing about other students.
    expect(res.body).not.toContain('@example.com');
  });
});

describe('PATCH /v1/me avatar: unlocks by learning only', () => {
  it('refuses a locked avatar with 403 avatar_locked and allows it once its rule is met — for every rule kind', async () => {
    const { c, id } = await member();
    const expectLocked = async (avatarId: string) => {
      const r = await pick(c, { id: avatarId, bg: 'mint' });
      expect(r.statusCode, avatarId).toBe(403);
      expect(r.json()).toMatchObject({ code: 'avatar_locked', avatar: avatarId });
      expect((await c.get('/v1/me')).json().avatar.id).not.toBe(avatarId);
    };
    const expectPicked = async (avatarId: string) => {
      const r = await pick(c, { id: avatarId, bg: 'mint' });
      expect(r.statusCode, avatarId).toBe(200);
      expect(r.json().avatar).toEqual({ id: avatarId, bg: 'mint', isDefault: false });
    };
    await h.t.db.insert(streaks).values({ userId: id }).onConflictDoNothing();

    // Level
    const lvl = lockedOf('level', id, (a) => a.unlock.kind === 'level' && a.unlock.level === 5);
    await expectLocked(lvl.id);
    await h.t.db.update(streaks).set({ level: 4 }).where(eq(streaks.userId, id));
    await expectLocked(lvl.id);
    await h.t.db.update(streaks).set({ level: 5 }).where(eq(streaks.userId, id));
    await expectPicked(lvl.id);

    // Badge
    const bdg = lockedOf('badge', id, (a) => a.unlock.kind === 'badge' && a.unlock.badge === 'first-correct');
    await expectLocked(bdg.id);
    const ids = await ensureBadges(h.t.db);
    await h.t.db.insert(userBadges).values({ userId: id, badgeId: ids.get('first-correct')!, awardedAt: new Date(h.clock.now()) });
    await expectPicked(bdg.id);

    // Streak (longest streak ever, so a broken streak keeps it)
    const stk = lockedOf('streak', id, (a) => a.unlock.kind === 'streak' && a.unlock.days === 14);
    await expectLocked(stk.id);
    await h.t.db.update(streaks).set({ longestDays: 14, currentDays: 0 }).where(eq(streaks.userId, id));
    await expectPicked(stk.id);

    // League tier reached (Gold = 3 unlocks Bronze, Silver and Gold avatars, not Sapphire)
    const gold = lockedOf('league_tier', id, (a) => a.unlock.kind === 'league_tier' && a.unlock.tier === 3);
    const sapphire = lockedOf('league_tier', id, (a) => a.unlock.kind === 'league_tier' && a.unlock.tier === 4);
    await expectLocked(gold.id);
    await h.t.db.insert(leagueMemberships).values({ userId: id, weekStart: '2026-10-19', scope: 'class', scopeKey: 'cbse-10', tier: 3 });
    await expectPicked(gold.id);
    await expectLocked(sapphire.id);

    // Live All-India mocks (submitted attempts)
    const one = lockedOf('live_mocks', id, (a) => a.unlock.kind === 'live_mocks' && a.unlock.count === 1);
    const three = lockedOf('live_mocks', id, (a) => a.unlock.kind === 'live_mocks' && a.unlock.count === 3);
    await expectLocked(one.id);
    const now = h.clock.now();
    const [t] = await h.t.db
      .insert(tests)
      .values({ key: `t_avatar_live_${now}`, academicYear: '2026-27', kind: 'live', paperType: 'board', subjectId, chapterKeys: ['cbse-10-science-ch01'], title: 'Live mock', durationMin: 60, totalMarks: 10, definition: {} })
      .returning();
    const live = async (i: number, submitted: boolean) => {
      const [ev] = await h.t.db
        .insert(liveEvents)
        .values({ key: `live_avatar_${now}_${i}`, academicYear: '2026-27', testId: t!.id, title: `Live ${i}`, registrationOpensAt: new Date(now - 3 * 86_400_000), startsAt: new Date(now - 2 * 86_400_000), lateStartMinutes: 15, endsAt: new Date(now - 2 * 86_400_000 + 3_600_000) })
        .returning();
      await h.t.db.insert(attempts).values({
        userId: id,
        testId: t!.id,
        liveEventId: ev!.id,
        status: submitted ? 'submitted' : 'in_progress',
        startedAt: new Date(now - 2 * 86_400_000),
        deadlineAt: new Date(now - 2 * 86_400_000 + 3_600_000),
        submittedAt: submitted ? new Date(now - 2 * 86_400_000 + 1_800_000) : null,
      });
    };
    await live(1, false); // started but never submitted: does not count
    await expectLocked(one.id);
    await live(2, true);
    await expectPicked(one.id);
    await live(3, true);
    await expectLocked(three.id);
    await live(4, true);
    await expectPicked(three.id);

    const cat = (await c.get('/v1/me/avatars')).json();
    expect(cat.current).toEqual({ id: three.id, bg: 'mint', isDefault: false });
    expect(cat.avatars.find((a: { id: string }) => a.id === sapphire.id)).toMatchObject({ unlocked: false, progress: { current: 3, target: 4 } });
  });

  it('never unlocks by coins or purchases: rules are learning-only', () => {
    expect(new Set(AVATARS.map((a) => a.unlock.kind))).toEqual(new Set(['starter', 'level', 'badge', 'streak', 'league_tier', 'live_mocks']));
  });
});

describe('public name changes and account deletion', () => {
  it('an avatar unlocked only as the old public-name animal goes back to the default when the name changes', async () => {
    const { c, id } = await member();
    // A seed whose animal is not a starter, then one whose animal is different.
    const seedA = Array.from({ length: 500 }, (_, i) => i + 1).find((s) => !isStarter(publicNameAnimal(id, s).toLowerCase()))!;
    const animalA = publicNameAnimal(id, seedA).toLowerCase();
    const seedB = Array.from({ length: 500 }, (_, i) => i + 1).find((s) => publicNameAnimal(id, s).toLowerCase() !== animalA)!;
    await h.t.db.update(profiles).set({ publicNameSeed: seedA }).where(eq(profiles.userId, id));
    expect((await pick(c, { id: animalA, bg: 'peach' })).statusCode).toBe(200);
    await h.t.db.update(profiles).set({ publicNameSeed: seedB }).where(eq(profiles.userId, id));
    await dropAvatarIfLocked(h.t.db, h.clock, id);
    expect((await c.get('/v1/me')).json().avatar).toEqual({ ...defaultAvatar(id, seedB), isDefault: true });
    // A starter survives a name change.
    expect((await pick(c, { id: 'owl', bg: 'peach' })).statusCode).toBe(200);
    const renamed = await c.post('/v1/me/public-name');
    expect(renamed.statusCode).toBe(200);
    expect((await c.get('/v1/me')).json()).toMatchObject({ publicName: renamed.json().publicName, avatar: { id: 'owl', bg: 'peach', isDefault: false } });
    expect(renamed.json().publicName).not.toBe(publicName(id, seedB));
  });

  it('account deletion clears the avatar', async () => {
    const { c, id } = await member();
    expect((await pick(c, { id: 'owl', bg: 'ocean' })).statusCode).toBe(200);
    expect((await c.delete('/v1/me')).statusCode).toBe(200);
    const [p] = await h.t.db.select({ avatarId: profiles.avatarId, avatarBg: profiles.avatarBg }).from(profiles).where(eq(profiles.userId, id));
    expect(p).toEqual({ avatarId: null, avatarBg: null });
  });
});
