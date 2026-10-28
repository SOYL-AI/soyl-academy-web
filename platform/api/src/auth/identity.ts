/**
 * Accounts and sign-in methods (AUTH-1, AUTH-7, AUTH-11, AC-03).
 *
 * Methods of an account:
 *   phone  — users.phone_number with phone_number_verified
 *   email  — users.email with email_verified (phone sign-ups carry a `.invalid` placeholder, never a method)
 *   google — an accounts row (provider_id 'google', account_id = Google `sub`)
 *
 * Rules:
 * - Sign-in by OTP finds the account by the normalised identifier (DB-3) or creates one. The same
 *   identifier verified again is not "linking".
 * - Google sign-in finds the account by `sub` only (AUTH-6). If no account has that `sub` but an
 *   account already uses the same verified email, sign-in is REFUSED (`account_exists_link_required`):
 *   two accounts are never merged automatically (AUTH-7). The user signs in the original way and
 *   links Google from /me (signed in, fresh session).
 * - Linking (signed in + fresh session) refuses identifiers used by another account; unlinking the
 *   last method is refused; other verified channels are notified of link/unlink.
 * - Staff (reviewer/admin) sign in with Google only, from an allow-listed Workspace domain (AUTH-11).
 */
import { and, eq, isNull } from 'drizzle-orm';
import type { FastifyBaseLogger } from 'fastify';
import { accounts, consentStatus, normalizeEmail, normalizePhone, profiles, users, type Database } from '@soyl/db';
import { ACCOUNT } from '@soyl/shared/config/security';
import type { Clock } from '../clock';
import { ApiProblem } from '../errors';
import { authEvent, securityEvent } from '../logging';
import type { RateLimiter } from '../rate-limit';
import type { AuthUser } from '../types';
import type { InternalAdapter } from './better-auth';
import type { EmailSender } from './senders/email';
import type { SmsSender } from './senders/sms';
import { toAuthUser } from './sessions';

export type SignInMethod = 'phone' | 'email' | 'google';

export interface IdentityContext {
  ip: string;
  userAgent?: string;
  log: FastifyBaseLogger;
}

export interface GoogleProfile {
  sub: string;
  email: string;
  emailVerified: boolean;
  name?: string;
  picture?: string;
  hd?: string;
}

export class SignInRefused extends Error {
  constructor(readonly reason: 'account_exists_link_required' | 'email_unverified' | 'staff_domain_not_allowed' | 'account_disabled' | 'identifier_unavailable') {
    super(reason);
    this.name = 'SignInRefused';
  }
}

const isPlaceholderEmail = (email: string) => email.endsWith('.invalid');

export class IdentityService {
  constructor(
    private readonly db: Database,
    private readonly adapter: () => Promise<InternalAdapter>,
    private readonly limiter: RateLimiter,
    private readonly clock: Clock,
    private readonly notify: { sms: SmsSender; email: EmailSender },
    private readonly staffDomains: readonly string[],
    /** D-045: the server-observed `signup` interest counter (aggregate, by method; no user link). */
    private readonly counters?: { observe(name: 'signup', dimension: string, log?: IdentityContext['log']): Promise<void> },
  ) {}

  private async findActiveUser(where: ReturnType<typeof eq>): Promise<AuthUser | null> {
    const [u] = await this.db.select().from(users).where(and(where, isNull(users.deletedAt)));
    return u ? toAuthUser(u as unknown as Record<string, unknown>) : null;
  }

  async userById(id: string): Promise<AuthUser | null> {
    return this.findActiveUser(eq(users.id, id));
  }

  /** New account plumbing: profile row and the initial consent cache row (`required`). */
  private async afterCreate(user: AuthUser, method: SignInMethod, ctx: IdentityContext) {
    await this.db.insert(profiles).values({ userId: user.id }).onConflictDoNothing();
    await this.db.insert(consentStatus).values({ userId: user.id, status: 'required', provider: 'pending-first-check' }).onConflictDoNothing();
    // API-RL-2: account creation per IP is a soft limit that raises an alert.
    try {
      const r = await this.limiter.bucket('account.create.ip', ctx.ip);
      if (!r.allowed) securityEvent(ctx.log, 'account_creation_ip_soft_limit', { ip: ctx.ip, alert: true });
    } catch {
      /* soft limit: a store outage must not block sign-up after the OTP already passed */
    }
    authEvent(ctx.log, 'account_created', { outcome: 'success', userId: user.id, method, ip: ctx.ip, userAgent: ctx.userAgent });
    await this.counters?.observe('signup', method, ctx.log);
  }

  private assertCanUseOtp(user: AuthUser) {
    if (user.banned) throw new ApiProblem('account_disabled');
    // AUTH-11: no OTP-only staff login.
    if (user.role === 'admin' || user.role === 'reviewer') throw new ApiProblem('staff_sign_in_requires_google');
  }

  /** Phone OTP passed: find by E.164 or create (placeholder `.invalid` email keeps email uniqueness clean). */
  async signInWithPhone(phone: string, ctx: IdentityContext): Promise<{ user: AuthUser; created: boolean }> {
    const e164 = normalizePhone(phone)!;
    const existing = await this.findActiveUser(eq(users.phoneE164, e164));
    if (existing) {
      this.assertCanUseOtp(existing);
      if (!existing.phoneNumberVerified) await this.db.update(users).set({ phoneNumberVerified: true }).where(eq(users.id, existing.id));
      return { user: { ...existing, phoneNumberVerified: true }, created: false };
    }
    const adapter = await this.adapter();
    const created = toAuthUser(
      (await adapter.createUser({
        name: ACCOUNT.placeholderName,
        email: `${e164.replace(/\D/g, '')}@${ACCOUNT.phoneTempEmailDomain}`,
        emailVerified: false,
        phoneNumber: e164,
        phoneNumberVerified: true,
      }, { method: 'phone-number' })) as unknown as Record<string, unknown>,
    );
    await this.afterCreate(created, 'phone', ctx);
    return { user: created, created: true };
  }

  /** Email OTP passed: find by normalised email or create. */
  async signInWithEmail(email: string, ctx: IdentityContext): Promise<{ user: AuthUser; created: boolean }> {
    const norm = normalizeEmail(email);
    const existing = norm ? await this.findActiveUser(eq(users.emailNormalized, norm)) : null;
    if (existing) {
      this.assertCanUseOtp(existing);
      if (!existing.emailVerified) await this.db.update(users).set({ emailVerified: true }).where(eq(users.id, existing.id));
      return { user: { ...existing, emailVerified: true }, created: false };
    }
    const adapter = await this.adapter();
    const created = toAuthUser(
      (await adapter.createUser({ name: ACCOUNT.placeholderName, email, emailVerified: true }, { method: 'email-otp' })) as unknown as Record<string, unknown>,
    );
    await this.afterCreate(created, 'email', ctx);
    return { user: created, created: true };
  }

  private staffDomainAllowed(p: GoogleProfile): boolean {
    const domain = p.email.slice(p.email.lastIndexOf('@') + 1).toLowerCase();
    return Boolean(p.hd) && p.hd!.toLowerCase() === domain && this.staffDomains.includes(domain);
  }

  /** Google ID token validated by openid-client; AUTH-6/7/11 decisions here. */
  async signInWithGoogle(p: GoogleProfile, ctx: IdentityContext): Promise<{ user: AuthUser; created: boolean }> {
    if (!p.emailVerified) throw new SignInRefused('email_unverified');
    const [acct] = await this.db
      .select({ userId: accounts.userId })
      .from(accounts)
      .where(and(eq(accounts.providerId, 'google'), eq(accounts.accountId, p.sub)));
    if (acct) {
      const user = await this.userById(acct.userId);
      if (!user) throw new SignInRefused('account_disabled');
      if (user.banned) throw new SignInRefused('account_disabled');
      if ((user.role === 'admin' || user.role === 'reviewer') && !this.staffDomainAllowed(p)) {
        securityEvent(ctx.log, 'staff_sign_in_refused', { userId: user.id, reason: 'domain' });
        throw new SignInRefused('staff_domain_not_allowed');
      }
      return { user, created: false };
    }
    // AUTH-7: never attach a new Google identity to an existing account by email.
    const norm = normalizeEmail(p.email);
    if (norm) {
      const sameEmail = await this.findActiveUser(eq(users.emailNormalized, norm));
      if (sameEmail) throw new SignInRefused('account_exists_link_required');
    }
    const adapter = await this.adapter();
    const { user } = await adapter.createOAuthUser(
      // D-039 data minimisation: Google's name and picture are not stored (the account needs the email only).
      { name: ACCOUNT.placeholderName, email: p.email, emailVerified: true, image: null },
      // Tokens are not stored: the platform never calls Google APIs on the user's behalf.
      { providerId: 'google', accountId: p.sub, scope: 'openid email profile' },
    );
    const created = toAuthUser(user as unknown as Record<string, unknown>);
    await this.afterCreate(created, 'google', ctx);
    return { user: created, created: true };
  }

  /** The account's sign-in methods (for /me and the last-method rule). */
  async methods(userId: string): Promise<{ phone: string | null; email: string | null; google: boolean }> {
    const [u] = await this.db.select().from(users).where(eq(users.id, userId));
    const google = await this.db.select({ id: accounts.id }).from(accounts).where(and(eq(accounts.userId, userId), eq(accounts.providerId, 'google')));
    return {
      phone: u?.phoneNumber && u.phoneNumberVerified ? u.phoneNumber : null,
      email: u?.email && u.emailVerified && !isPlaceholderEmail(u.email) ? u.email : null,
      google: google.length > 0,
    };
  }

  /** AUTH-7: notify the account's other verified channels about a link/unlink. Best effort. */
  private async notifyChannels(userId: string, text: string, exclude: SignInMethod | null) {
    const m = await this.methods(userId);
    const jobs: Promise<unknown>[] = [];
    if (m.email && exclude !== 'email')
      jobs.push(this.notify.email.send({ to: m.email, tag: 'account-notice', subject: 'SOYL Academy account update', text: `${text}\n\nIf this was not you, sign in and remove it from your profile, then contact us.` }));
    if (m.phone && exclude !== 'phone') jobs.push(this.notify.sms.send({ to: m.phone, kind: 'notice', vars: { notice: text } }));
    await Promise.allSettled(jobs);
  }

  async linkPhone(user: AuthUser, phone: string, ctx: IdentityContext): Promise<void> {
    const e164 = normalizePhone(phone)!;
    const owner = await this.findActiveUser(eq(users.phoneE164, e164));
    if (owner && owner.id !== user.id) throw new ApiProblem('identifier_unavailable');
    await this.notifyChannels(user.id, 'A phone number was added to your SOYL Academy account.', null);
    try {
      await this.db.update(users).set({ phoneNumber: e164, phoneNumberVerified: true }).where(eq(users.id, user.id));
    } catch {
      throw new ApiProblem('identifier_unavailable');
    }
    authEvent(ctx.log, 'link', { outcome: 'success', userId: user.id, method: 'phone', identifier: e164, ip: ctx.ip, userAgent: ctx.userAgent });
  }

  async linkEmail(user: AuthUser, email: string, ctx: IdentityContext): Promise<void> {
    const norm = normalizeEmail(email);
    const owner = norm ? await this.findActiveUser(eq(users.emailNormalized, norm)) : null;
    if (owner && owner.id !== user.id) throw new ApiProblem('identifier_unavailable');
    await this.notifyChannels(user.id, 'An email address was added to your SOYL Academy account.', null);
    try {
      await this.db.update(users).set({ email, emailVerified: true }).where(eq(users.id, user.id));
    } catch {
      throw new ApiProblem('identifier_unavailable');
    }
    authEvent(ctx.log, 'link', { outcome: 'success', userId: user.id, method: 'email', identifier: email, ip: ctx.ip, userAgent: ctx.userAgent });
  }

  async linkGoogle(userId: string, p: GoogleProfile, ctx: IdentityContext): Promise<void> {
    if (!p.emailVerified) throw new SignInRefused('email_unverified');
    const [existing] = await this.db
      .select({ userId: accounts.userId })
      .from(accounts)
      .where(and(eq(accounts.providerId, 'google'), eq(accounts.accountId, p.sub)));
    if (existing && existing.userId !== userId) throw new SignInRefused('identifier_unavailable');
    if (existing) return;
    const mine = await this.db.select({ id: accounts.id }).from(accounts).where(and(eq(accounts.userId, userId), eq(accounts.providerId, 'google')));
    if (mine.length) throw new SignInRefused('identifier_unavailable');
    await this.notifyChannels(userId, 'A Google account was added to your SOYL Academy account.', null);
    const adapter = await this.adapter();
    await adapter.linkAccount({ userId, providerId: 'google', accountId: p.sub, scope: 'openid email profile' });
    authEvent(ctx.log, 'link', { outcome: 'success', userId, method: 'google', identifier: p.email, ip: ctx.ip, userAgent: ctx.userAgent });
  }

  /** AUTH-7: cannot remove the last method. */
  async unlink(user: AuthUser, method: SignInMethod, ctx: IdentityContext): Promise<void> {
    const m = await this.methods(user.id);
    const remaining = (['phone', 'email', 'google'] as const).filter((k) => k !== method && (k === 'google' ? m.google : Boolean(m[k])));
    const has = method === 'google' ? m.google : Boolean(m[method]);
    if (!has) throw new ApiProblem('not_found');
    if (remaining.length === 0) throw new ApiProblem('last_sign_in_method');
    if (method === 'google') await this.db.delete(accounts).where(and(eq(accounts.userId, user.id), eq(accounts.providerId, 'google')));
    if (method === 'phone') await this.db.update(users).set({ phoneNumber: null, phoneNumberVerified: false }).where(eq(users.id, user.id));
    if (method === 'email')
      await this.db
        .update(users)
        .set({ email: `${user.id}@${ACCOUNT.phoneTempEmailDomain}`, emailVerified: false })
        .where(eq(users.id, user.id));
    await this.notifyChannels(user.id, `A sign-in method (${method}) was removed from your SOYL Academy account.`, null);
    authEvent(ctx.log, 'unlink', { outcome: 'success', userId: user.id, method, ip: ctx.ip, userAgent: ctx.userAgent });
  }
}
