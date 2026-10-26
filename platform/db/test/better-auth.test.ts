/**
 * The identity tables are directly usable by Better Auth (ARCHITECTURE §5) through the Drizzle
 * adapter with `usePlural: true`, the phoneNumber, emailOTP and admin plugins, and uuid v7 ids.
 * This is the configuration backend-api starts from (README "Better Auth").
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { eq } from 'drizzle-orm';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin, emailOTP, phoneNumber } from 'better-auth/plugins';
import { createTestDb, type TestDb } from '../src/testing';
import { uuidv7 } from '../src/ids';
import * as schema from '../schema/index';
import { accounts, sessions, users, verifications } from '../schema/index';

let t: TestDb;
const sms = new Map<string, string>();
const mail = new Map<string, string>();

function makeAuth(db: TestDb['db']) {
  return betterAuth({
    secret: 'test-only-secret-not-used-anywhere-else-0123456789',
    baseURL: 'http://localhost:8080',
    database: drizzleAdapter(db, { provider: 'pg', schema, usePlural: true }),
    // Only to exercise users/accounts/sessions in this test; the platform does not offer passwords.
    emailAndPassword: { enabled: true },
    advanced: { database: { generateId: () => uuidv7() } },
    plugins: [
      phoneNumber({
        sendOTP: ({ phoneNumber: p, code }) => void sms.set(p, code),
        signUpOnVerification: {
          getTempEmail: (p) => `${p.replace(/\D/g, '')}@phone.soyl.invalid`,
          getTempName: (p) => p,
        },
      }),
      emailOTP({ sendVerificationOTP: async ({ email, otp }) => void mail.set(email, otp), storeOTP: 'hashed' }),
      admin({ defaultRole: 'student', adminRoles: ['admin'] }),
    ],
  });
}

beforeAll(async () => {
  t = await createTestDb();
});
afterAll(async () => {
  await t?.close();
});

describe('Better Auth on the @soyl/db identity tables', () => {
  it('signs up a user, creating users, accounts and sessions rows with uuid v7 ids', async () => {
    const auth = makeAuth(t.db);
    const res = await auth.api.signUpEmail({ body: { email: 'Meera.Shah@Example.com', password: 'a-long-test-password-1', name: 'Meera' } });
    expect(res.user.id).toMatch(/^[0-9a-f-]{36}$/);
    const [u] = await t.db.select().from(users).where(eq(users.id, res.user.id));
    expect(u).toMatchObject({ email: 'meera.shah@example.com', emailNormalized: 'meera.shah@example.com', role: 'student', banned: false });
    expect(await t.db.select().from(accounts).where(eq(accounts.userId, u!.id))).toHaveLength(1);
    const s = await t.db.select().from(sessions).where(eq(sessions.userId, u!.id));
    expect(s).toHaveLength(1);
    expect(s[0]!.token).toBe(res.token);
  });

  it('signs in with an email OTP stored hashed (DB-4)', async () => {
    const auth = makeAuth(t.db);
    await auth.api.sendVerificationOTP({ body: { email: 'ravi@example.com', type: 'sign-in' } });
    const otp = mail.get('ravi@example.com')!;
    expect(otp).toMatch(/^\d{6}$/);
    const rows = await t.db.select().from(verifications);
    expect(rows.some((r) => r.value.includes(otp))).toBe(false);
    const res = await auth.api.signInEmailOTP({ body: { email: 'ravi@example.com', otp } });
    expect(res.user.email).toBe('ravi@example.com');
  });

  it('signs up by phone OTP with a placeholder email that stays out of email uniqueness', async () => {
    const auth = makeAuth(t.db);
    await auth.api.sendPhoneNumberOTP({ body: { phoneNumber: '+919876500001' } });
    const res = await auth.api.verifyPhoneNumber({ body: { phoneNumber: '+919876500001', code: sms.get('+919876500001')! } });
    expect(res.status).toBe(true);
    const [u] = await t.db.select().from(users).where(eq(users.phoneNumber, '+919876500001'));
    expect(u).toMatchObject({ phoneE164: '+919876500001', phoneNumberVerified: true, emailNormalized: null, role: 'student' });
  });

  it('lets the admin plugin read and change roles within the allowed set', async () => {
    const auth = makeAuth(t.db);
    const target = await auth.api.signUpEmail({ body: { email: 'role-test@example.com', password: 'a-long-test-password-2', name: 'Role Test' } });
    const ctx = await auth.$context;
    await ctx.internalAdapter.updateUser(target.user.id, { role: 'reviewer' });
    const [u] = await t.db.select({ role: users.role }).from(users).where(eq(users.id, target.user.id));
    expect(u!.role).toBe('reviewer');
    // the database refuses roles outside the platform's set even through the adapter
    await expect(ctx.internalAdapter.updateUser(target.user.id, { role: 'owner' })).rejects.toThrow();
  });
});
