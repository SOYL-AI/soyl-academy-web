/**
 * DELETE /v1/me — step 1 of platform/db/PII.md "Account deletion" (AC-25 erasure, AC-26):
 * in one transaction delete sessions, accounts, pending OTP rows, consent_status, consent_records (D-039), guardian links
 * (both directions), AI conversations (messages cascade), uploads rows and the staff TOTP enrolment; anonymise `users` and the
 * personal `profiles` fields; write an audit row (ids only). Step 2 — the hard delete ≤ 30 days later
 * — is the worker's `account.purge` job (`users.deleted_at < now() - 30 days`).
 *
 * Gaps recorded in the handoff: upload blobs (no Blob client yet; the uploads feature lands in M4 and
 * must delete blobs here) and Redis leaderboard entries (no leaderboards yet).
 */
import { eq, or } from 'drizzle-orm';
import {
  accounts,
  aiConversations,
  auditLog,
  consentRecords,
  consentStatus,
  guardianLinks,
  profiles,
  sessions,
  uploads,
  userMfa,
  users,
  type Database,
} from '@soyl/db';
import type { Clock } from '../clock';
import type { OtpService } from '../auth/otp';
import type { AuthUser } from '../types';

export interface DeletionResult {
  deletedAt: Date;
  purgeAfter: Date;
}

export async function deleteAccount(
  db: Database,
  clock: Clock,
  otp: OtpService,
  user: AuthUser,
  opts: { purgeAfterDays: number; requestId: string },
): Promise<DeletionResult> {
  const now = new Date(clock.now());
  // Pending codes are keyed by an HMAC of the identifier, so compute them before the row is anonymised.
  const pending: Parameters<OtpService['deleteFor']>[0] = [];
  if (user.phoneNumber) pending.push({ channel: 'phone', identifier: user.phoneNumber });
  if (user.email && !user.email.endsWith('.invalid')) pending.push({ channel: 'email', identifier: user.email });

  await db.transaction(async (tx) => {
    await tx.delete(sessions).where(eq(sessions.userId, user.id));
    await tx.delete(accounts).where(eq(accounts.userId, user.id));
    await tx.delete(consentStatus).where(eq(consentStatus.userId, user.id));
    await tx.delete(consentRecords).where(eq(consentRecords.userId, user.id));
    await tx.delete(guardianLinks).where(or(eq(guardianLinks.parentUserId, user.id), eq(guardianLinks.studentUserId, user.id)));
    await tx.delete(aiConversations).where(eq(aiConversations.userId, user.id));
    await tx.delete(uploads).where(eq(uploads.userId, user.id));
    await tx.delete(userMfa).where(eq(userMfa.userId, user.id));
    await tx
      .update(users)
      .set({
        name: 'Deleted user',
        email: `deleted+${user.id}@deleted.soyl.invalid`,
        emailVerified: false,
        phoneNumber: null,
        phoneNumberVerified: false,
        image: null,
        banReason: null,
        deletedAt: now,
        updatedAt: now,
      })
      .where(eq(users.id, user.id));
    await tx
      .update(profiles)
      .set({ displayName: null, board: null, classLevel: null, schoolId: null, city: null, publicNameSeed: 0, updatedAt: now })
      .where(eq(profiles.userId, user.id));
    await tx.insert(auditLog).values({
      actorUserId: user.id,
      actorRole: user.role,
      action: 'account.delete_requested',
      targetType: 'user',
      targetId: user.id,
      requestId: opts.requestId,
      createdAt: now,
    });
  });
  await otp.deleteFor(pending);
  return { deletedAt: now, purgeAfter: new Date(now.getTime() + opts.purgeAfterDays * 86400_000) };
}
