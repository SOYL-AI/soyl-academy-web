/**
 * `admin bootstrap --email <email>` (DB-7, ARCHITECTURE §5): the only way the first admin appears.
 * Takes an explicit email; no default admin, no password. The person signs in with email OTP or
 * Google on that address. Works in every environment, including production (the owner's account).
 * Audit-logged.
 */
import { eq, or } from 'drizzle-orm';
import type { Database } from '../client';
import { normalizeEmail } from '../normalize';
import { auditLog, profiles, users } from '../../schema/index';

export interface BootstrapResult {
  userId: string;
  email: string;
  created: boolean;
}

export async function bootstrapAdmin(db: Database, rawEmail: string): Promise<BootstrapResult> {
  const email = rawEmail.trim().toLowerCase();
  const normalized = normalizeEmail(email);
  if (!normalized) throw new Error(`'${rawEmail}' is not an email address`);

  return db.transaction(async (tx) => {
    const [existing] = await tx
      .select({ id: users.id, role: users.role, email: users.email })
      .from(users)
      .where(or(eq(users.emailNormalized, normalized), eq(users.email, email)))
      .limit(1);

    let userId: string;
    let created = false;
    let before: string | null = null;
    if (existing) {
      userId = existing.id;
      before = existing.role;
      await tx.update(users).set({ role: 'admin', updatedAt: new Date() }).where(eq(users.id, userId));
    } else {
      const [u] = await tx
        .insert(users)
        .values({ name: email.split('@')[0]!, email, emailVerified: false, role: 'admin' })
        .returning({ id: users.id });
      userId = u!.id;
      created = true;
      await tx.insert(profiles).values({ userId }).onConflictDoNothing();
    }
    await tx.insert(auditLog).values({
      actorUserId: null,
      actorRole: 'system',
      action: 'admin.bootstrap',
      targetType: 'user',
      targetId: userId,
      before: before === null ? null : { role: before },
      after: { role: 'admin' },
    });
    return { userId, email: existing?.email ?? email, created };
  });
}
