/**
 * Sessions (AUTH-8, AUTH-9, AUTH-10) on Better Auth's `sessions` table.
 *
 * - Cookie `__Host-soyl_session` (secure contexts) = `<token>.<HMAC-SHA256(AUTH_SECRET, token)>`,
 *   HttpOnly; Secure; SameSite=Lax; Path=/; no Domain. Token: 32 chars from Better Auth's CSPRNG
 *   alphabet (~190 bits). The signature means a database reader still cannot forge a cookie (DB-4).
 * - Lifetimes from SESSION (shared/config/security.ts): members 90 d absolute / 30 d inactivity,
 *   rolled at most once per 24 h; staff 12 h absolute / 60 min inactivity, rolled on activity.
 * - A new session on every sign-in; any session presented with the sign-in request is deleted
 *   (no fixation, AUTH-10). Max 5 concurrent member sessions (oldest revoked).
 * - Logout deletes the row and sends `Clear-Site-Data: "cookies"`.
 */
import { createHmac, timingSafeEqual } from 'node:crypto';
import { and, asc, eq, inArray, ne } from 'drizzle-orm';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { sessions, type Database } from '@soyl/db';
import { SESSION, type SessionLifetime } from '@soyl/shared/config/security';
import type { Clock } from '../clock';
import type { Config } from '../config';
import { ApiProblem } from '../errors';
import { appendSetCookie, clearCookie, readCookie, serializeCookie } from '../http/cookies';
import type { AuthContext, AuthSession, AuthUser, UserRole } from '../types';
import type { InternalAdapter } from './better-auth';

export function lifetimeFor(role: UserRole): SessionLifetime {
  return role === 'admin' || role === 'reviewer' ? SESSION.lifetimes.staff : SESSION.lifetimes.member;
}

export function toAuthUser(u: Record<string, unknown>): AuthUser {
  return {
    id: String(u.id),
    name: String(u.name ?? ''),
    email: String(u.email ?? ''),
    emailVerified: Boolean(u.emailVerified),
    phoneNumber: (u.phoneNumber as string | null | undefined) ?? null,
    phoneNumberVerified: Boolean(u.phoneNumberVerified),
    role: ((u.role as string | undefined) ?? 'student') as UserRole,
    banned: Boolean(u.banned),
    deletedAt: u.deletedAt ? new Date(u.deletedAt as string | Date) : null,
    createdAt: new Date(u.createdAt as string | Date),
  };
}

function toAuthSession(s: Record<string, unknown>): AuthSession {
  return {
    id: String(s.id),
    token: String(s.token),
    userId: String(s.userId),
    createdAt: new Date(s.createdAt as string | Date),
    updatedAt: new Date(s.updatedAt as string | Date),
    expiresAt: new Date(s.expiresAt as string | Date),
  };
}

export class SessionService {
  readonly cookieName: string;

  constructor(
    private readonly adapter: () => Promise<InternalAdapter>,
    private readonly db: Database,
    private readonly config: Pick<Config, 'authSecret' | 'secureCookies'>,
    private readonly clock: Clock,
  ) {
    this.cookieName = config.secureCookies ? SESSION.cookieName : SESSION.insecureCookieName;
  }

  private sign(token: string): string {
    return createHmac('sha256', this.config.authSecret).update(token).digest('base64url');
  }

  cookieValue(token: string): string {
    return `${token}.${this.sign(token)}`;
  }

  /** The verified token from the request cookie, or null. */
  tokenFromRequest(request: FastifyRequest): string | null {
    const raw = readCookie(request, this.cookieName);
    if (!raw) return null;
    const dot = raw.lastIndexOf('.');
    if (dot < 1) return null;
    const token = raw.slice(0, dot);
    const sig = Buffer.from(raw.slice(dot + 1));
    const expected = Buffer.from(this.sign(token));
    if (sig.length !== expected.length || !timingSafeEqual(sig, expected)) return null;
    return token;
  }

  private setCookie(reply: FastifyReply, token: string, expiresAt: Date): void {
    const maxAge = Math.max(0, Math.floor((expiresAt.getTime() - this.clock.now()) / 1000));
    appendSetCookie(reply, serializeCookie(this.cookieName, this.cookieValue(token), { maxAgeSeconds: maxAge, secure: this.config.secureCookies }));
  }

  clear(reply: FastifyReply): void {
    clearCookie(reply, this.cookieName, this.config.secureCookies);
  }

  /**
   * Resolves the request's session. Expired, over-age, banned or deleted → null (and the row is
   * removed). Rolls the expiry per the role's lifetime and refreshes the cookie when it does.
   */
  async resolve(request: FastifyRequest, reply: FastifyReply): Promise<AuthContext | null> {
    const token = this.tokenFromRequest(request);
    if (!token) {
      if (readCookie(request, this.cookieName)) this.clear(reply);
      return null;
    }
    const adapter = await this.adapter();
    const found = await adapter.findSession(token);
    if (!found) {
      this.clear(reply);
      return null;
    }
    const user = toAuthUser(found.user as Record<string, unknown>);
    const session = toAuthSession(found.session as Record<string, unknown>);
    const now = this.clock.now();
    const life = lifetimeFor(user.role);
    const absoluteEnd = session.createdAt.getTime() + life.absoluteSeconds * 1000;
    if (session.expiresAt.getTime() <= now || absoluteEnd <= now || user.banned || user.deletedAt) {
      await adapter.deleteSession(token);
      this.clear(reply);
      return null;
    }
    if (now - session.updatedAt.getTime() >= life.rollSeconds * 1000) {
      const expiresAt = new Date(Math.min(now + life.inactivitySeconds * 1000, absoluteEnd));
      await this.db.update(sessions).set({ expiresAt, updatedAt: new Date(now) }).where(eq(sessions.id, session.id));
      session.expiresAt = expiresAt;
      session.updatedAt = new Date(now);
      this.setCookie(reply, token, expiresAt);
    }
    return { user, session };
  }

  /** AUTH-10: new session on sign-in; the presented one (if any) is deleted. AUTH-9: max 5 member sessions. */
  async create(user: AuthUser, request: FastifyRequest, reply: FastifyReply): Promise<AuthSession> {
    const adapter = await this.adapter();
    const previous = this.tokenFromRequest(request);
    if (previous) await adapter.deleteSession(previous);
    const now = this.clock.now();
    const life = lifetimeFor(user.role);
    const expiresAt = new Date(now + Math.min(life.inactivitySeconds, life.absoluteSeconds) * 1000);
    const created = await adapter.createSession(
      user.id,
      false,
      {
        createdAt: new Date(now),
        updatedAt: new Date(now),
        expiresAt,
        ipAddress: request.clientIp,
        userAgent: String(request.headers['user-agent'] ?? '').slice(0, 512),
      },
      true,
    );
    const session = toAuthSession(created as unknown as Record<string, unknown>);
    if (life === SESSION.lifetimes.member) await this.enforceMax(user.id, SESSION.maxConcurrentMemberSessions);
    this.setCookie(reply, session.token, session.expiresAt);
    return session;
  }

  private async enforceMax(userId: string, max: number): Promise<void> {
    const rows = await this.db
      .select({ id: sessions.id })
      .from(sessions)
      .where(eq(sessions.userId, userId))
      .orderBy(asc(sessions.createdAt), asc(sessions.id));
    const excess = rows.length - max;
    if (excess > 0) await this.db.delete(sessions).where(inArray(sessions.id, rows.slice(0, excess).map((r) => r.id)));
  }

  /** Logout (AUTH-10). */
  async signOut(ctx: AuthContext | null, request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const token = ctx?.session.token ?? this.tokenFromRequest(request);
    if (token) await (await this.adapter()).deleteSession(token);
    this.clear(reply);
    reply.header('clear-site-data', '"cookies"');
  }

  async list(userId: string) {
    return this.db
      .select({ id: sessions.id, createdAt: sessions.createdAt, updatedAt: sessions.updatedAt, expiresAt: sessions.expiresAt, userAgent: sessions.userAgent })
      .from(sessions)
      .where(eq(sessions.userId, userId))
      .orderBy(asc(sessions.createdAt));
  }

  /** API-7: scoped to the caller; someone else's id is 404. */
  async revokeById(userId: string, sessionId: string): Promise<void> {
    const deleted = await this.db
      .delete(sessions)
      .where(and(eq(sessions.id, sessionId), eq(sessions.userId, userId)))
      .returning({ id: sessions.id });
    if (!deleted.length) throw new ApiProblem('not_found');
  }

  async revokeOthers(userId: string, keepSessionId: string): Promise<number> {
    const deleted = await this.db
      .delete(sessions)
      .where(and(eq(sessions.userId, userId), ne(sessions.id, keepSessionId)))
      .returning({ id: sessions.id });
    return deleted.length;
  }

  /** Account deletion and role change revoke everything (AUTH-10, API-10). */
  async revokeAll(userId: string): Promise<number> {
    const deleted = await this.db.delete(sessions).where(eq(sessions.userId, userId)).returning({ id: sessions.id });
    return deleted.length;
  }

  isFresh(session: AuthSession): boolean {
    return this.clock.now() - session.createdAt.getTime() <= SESSION.freshSeconds * 1000;
  }
}
