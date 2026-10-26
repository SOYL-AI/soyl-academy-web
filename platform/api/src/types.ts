import type { RoutePolicy } from './policy';

export type UserRole = 'student' | 'parent' | 'reviewer' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string | null;
  phoneNumberVerified: boolean;
  role: UserRole;
  banned: boolean;
  deletedAt: Date | null;
  createdAt: Date;
}

export interface AuthSession {
  id: string;
  token: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
}

export interface AuthContext {
  user: AuthUser;
  session: AuthSession;
}

declare module 'fastify' {
  interface FastifyContextConfig {
    policy?: RoutePolicy;
    /** 'content': a public content read whose body is the same for every caller (ADR-010). */
    cache?: 'content';
  }
  interface FastifyRequest {
    /** API-3: client IP — from the trusted edge header after edge auth, else the socket. */
    clientIp: string;
    /** Which edge secret matched (0 = first/current, 1 = second/next), for logs during rotation. */
    edgeSecretIndex: number | null;
    /** Resolved session, or null for guests. Set by the policy hook. */
    auth: AuthContext | null;
  }
}
