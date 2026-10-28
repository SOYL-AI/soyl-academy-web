/**
 * `admin bootstrap --email <email> [--role admin|superadmin]` (DB-7, ARCHITECTURE §5): the only way the
 * first admin appears. Takes an explicit email; no default admin, no password. Works in every
 * environment, including production (the owner's account), non-interactively (Container Apps job
 * `--args`). Audit-logged.
 *
 * - `--role admin` (default): `users.role = 'admin'`; a `superadmin` capability the user had is removed.
 * - `--role superadmin` (D-045): `users.role = 'admin'` plus the `superadmin` row in
 *   `staff_capabilities` (analytics dashboard, audited user lookup). Superadmin is a capability on
 *   top of `admin`, so every staff rule (AUTH-11 Google Workspace sign-in + TOTP) applies unchanged.
 *
 * Idempotent: running it again with the same role changes nothing and writes no audit row. When the
 * role or capability changes, the user's sessions are revoked (API-10: a role change signs the account
 * out everywhere, so the next sign-in goes through the staff rules).
 *
 * A missing account is created (email only; DB-7). Note AUTH-7: a Google identity is never attached to
 * an existing account by email, so staff who will sign in with Google should sign up with Google (or
 * link Google to their account) before the bootstrap runs.
 */
import { and, eq, or } from 'drizzle-orm';
import type { Database } from '../client';
import { normalizeEmail } from '../normalize';
import { auditLog, profiles, sessions, staffCapabilities, users } from '../../schema/index';

export const BOOTSTRAP_ROLES = ['admin', 'superadmin'] as const;
export type BootstrapRole = (typeof BOOTSTRAP_ROLES)[number];

export interface BootstrapResult {
  userId: string;
  email: string;
  created: boolean;
  role: BootstrapRole;
  /** False when the account already had exactly this role (nothing written). */
  changed: boolean;
  /** Sessions revoked because the role or capability changed. */
  sessionsRevoked: number;
}

export async function bootstrapAdmin(db: Database, rawEmail: string, role: BootstrapRole = 'admin'): Promise<BootstrapResult> {
  if (!BOOTSTRAP_ROLES.includes(role)) throw new Error(`--role must be one of ${BOOTSTRAP_ROLES.join(', ')}`);
  const email = rawEmail.trim().toLowerCase();
  const normalized = normalizeEmail(email);
  if (!normalized) throw new Error(`'${rawEmail}' is not an email address`);
  const wantsSuper = role === 'superadmin';

  return db.transaction(async (tx) => {
    const [existing] = await tx
      .select({ id: users.id, role: users.role, email: users.email })
      .from(users)
      .where(or(eq(users.emailNormalized, normalized), eq(users.email, email)))
      .limit(1);

    let userId: string;
    let created = false;
    let beforeRole: string | null = null;
    let hadSuper = false;
    if (existing) {
      userId = existing.id;
      beforeRole = existing.role;
      hadSuper =
        (
          await tx
            .select({ id: staffCapabilities.id })
            .from(staffCapabilities)
            .where(and(eq(staffCapabilities.userId, userId), eq(staffCapabilities.capability, 'superadmin')))
        ).length > 0;
      if (beforeRole === 'admin' && hadSuper === wantsSuper)
        return { userId, email: existing.email, created: false, role, changed: false, sessionsRevoked: 0 };
      if (beforeRole !== 'admin') await tx.update(users).set({ role: 'admin', updatedAt: new Date() }).where(eq(users.id, userId));
    } else {
      const [u] = await tx
        .insert(users)
        .values({ name: email.split('@')[0]!, email, emailVerified: false, role: 'admin' })
        .returning({ id: users.id });
      userId = u!.id;
      created = true;
      await tx.insert(profiles).values({ userId }).onConflictDoNothing();
    }
    if (wantsSuper && !hadSuper) await tx.insert(staffCapabilities).values({ userId, capability: 'superadmin' }).onConflictDoNothing();
    if (!wantsSuper && hadSuper)
      await tx.delete(staffCapabilities).where(and(eq(staffCapabilities.userId, userId), eq(staffCapabilities.capability, 'superadmin')));
    // API-10: a role/capability change revokes the account's sessions.
    const revoked = created ? [] : await tx.delete(sessions).where(eq(sessions.userId, userId)).returning({ id: sessions.id });
    await tx.insert(auditLog).values({
      actorUserId: null,
      actorRole: 'system',
      action: 'admin.bootstrap',
      targetType: 'user',
      targetId: userId,
      before: beforeRole === null ? null : { role: beforeRole, ...(hadSuper ? { capabilities: ['superadmin'] } : {}) },
      after: { role: 'admin', ...(wantsSuper ? { capabilities: ['superadmin'] } : {}) },
    });
    return { userId, email: existing?.email ?? email, created, role, changed: true, sessionsRevoked: revoked.length };
  });
}
