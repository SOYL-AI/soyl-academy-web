/**
 * `seed test-users`: fixture accounts for development and staging (GEN-2).
 *
 * - Emails are on example.com only (RFC 2606 reserved).
 * - Phone numbers come from TEST_PHONE_PREFIX: +91 555 000 xxxx. Indian mobile numbers start with
 *   6–9, so a +91 number beginning 5 is never a reachable subscriber; the seed sends no OTPs anyway.
 *   The prefix is defined in platform/shared/config/security.ts (shared with the OTP test allowlist, GEN-3).
 * - No admin, no passwords (DB-7). Refuses to run when NODE_ENV=production or APP_ENV=prod.
 * - Idempotent: upserts by email.
 */
import { and, eq, sql } from 'drizzle-orm';
import type { Database } from '../client';
import { consentStatus, guardianLinks, profiles, users, type ConsentState, type Role } from '../../schema/index';
import { TEST_EMAIL_DOMAIN, TEST_PHONE_PREFIX } from '@soyl/shared/config/security';

/** Re-exported from platform/shared/config/security.ts (GEN-2/GEN-3: one definition shared with the API's OTP allowlist). */
export { TEST_EMAIL_DOMAIN, TEST_PHONE_PREFIX };

interface Fixture {
  key: string;
  name: string;
  role: Exclude<Role, 'admin'>;
  phoneSuffix: string;
  board?: 'cbse' | 'cisce';
  classLevel?: number;
  consent: ConsentState;
}

export const TEST_USER_FIXTURES: readonly Fixture[] = [
  { key: 'student.cbse10', name: 'Test Student CBSE 10', role: 'student', phoneSuffix: '0001', board: 'cbse', classLevel: 10, consent: 'granted' },
  { key: 'student.cbse12', name: 'Test Student CBSE 12', role: 'student', phoneSuffix: '0002', board: 'cbse', classLevel: 12, consent: 'granted' },
  { key: 'student.icse9', name: 'Test Student ICSE 9', role: 'student', phoneSuffix: '0003', board: 'cisce', classLevel: 9, consent: 'pending' },
  { key: 'student.cbse7', name: 'Test Student CBSE 7', role: 'student', phoneSuffix: '0004', board: 'cbse', classLevel: 7, consent: 'required' },
  { key: 'parent', name: 'Test Parent', role: 'parent', phoneSuffix: '0010', consent: 'granted' },
  { key: 'reviewer', name: 'Test Reviewer', role: 'reviewer', phoneSuffix: '0020', consent: 'granted' },
];

export const testEmail = (key: string) => `${key}@${TEST_EMAIL_DOMAIN}`;
export const testPhone = (suffix: string) => `${TEST_PHONE_PREFIX}${suffix}`;

export function assertNotProduction(what: string): void {
  const appEnv = (process.env.APP_ENV ?? '').toLowerCase();
  if (process.env.NODE_ENV === 'production' || appEnv === 'prod' || appEnv === 'production')
    throw new Error(`${what} refuses to run in production (NODE_ENV=${process.env.NODE_ENV ?? ''}, APP_ENV=${process.env.APP_ENV ?? ''})`);
}

export interface TestUsersReport {
  users: { email: string; role: string; id: string }[];
  guardianLinks: number;
}

export async function seedTestUsers(db: Database): Promise<TestUsersReport> {
  assertNotProduction('seed test-users');
  const report: TestUsersReport = { users: [], guardianLinks: 0 };
  await db.transaction(async (tx) => {
    const ids = new Map<string, string>();
    for (const f of TEST_USER_FIXTURES) {
      const email = testEmail(f.key);
      const [u] = await tx
        .insert(users)
        .values({
          name: f.name,
          email,
          emailVerified: true,
          phoneNumber: testPhone(f.phoneSuffix),
          phoneNumberVerified: true,
          role: f.role,
        })
        .onConflictDoUpdate({
          target: users.email,
          set: { name: f.name, role: f.role, phoneNumber: testPhone(f.phoneSuffix), updatedAt: new Date() },
        })
        .returning({ id: users.id });
      ids.set(f.key, u!.id);
      report.users.push({ email, role: f.role, id: u!.id });

      await tx
        .insert(profiles)
        .values({ userId: u!.id, displayName: f.name.replace('Test ', ''), board: f.board ?? null, classLevel: f.classLevel ?? null })
        .onConflictDoUpdate({
          target: profiles.userId,
          set: { displayName: sql`excluded.display_name`, board: sql`excluded.board`, classLevel: sql`excluded.class_level` },
        });
      await tx
        .insert(consentStatus)
        .values({
          userId: u!.id,
          status: f.consent,
          provider: 'mock',
          grantedAt: f.consent === 'granted' ? new Date() : null,
        })
        .onConflictDoUpdate({ target: consentStatus.userId, set: { status: f.consent, fetchedAt: new Date() } });
    }

    // The parent is linked to the CBSE 10 student (verified through the mock consent flow, API-12)
    // and has an unverified claim on the CBSE 12 student, which must grant nothing.
    const parent = ids.get('parent')!;
    for (const [student, verified] of [
      ['student.cbse10', true],
      ['student.cbse12', false],
    ] as const) {
      const studentId = ids.get(student)!;
      const existing = await tx
        .select({ id: guardianLinks.id })
        .from(guardianLinks)
        .where(and(eq(guardianLinks.parentUserId, parent), eq(guardianLinks.studentUserId, studentId)));
      if (!existing.length)
        await tx.insert(guardianLinks).values({
          parentUserId: parent,
          studentUserId: studentId,
          verifiedAt: verified ? new Date() : null,
          verifiedVia: verified ? 'consent_flow' : null,
        });
      report.guardianLinks++;
    }
  });
  return report;
}
