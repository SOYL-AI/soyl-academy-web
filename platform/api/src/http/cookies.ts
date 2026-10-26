/** Minimal cookie parse/serialise (no dependency). Values we set are URL-safe; no encoding needed. */
import type { FastifyReply, FastifyRequest } from 'fastify';

export function readCookie(request: FastifyRequest, name: string): string | null {
  const header = request.headers.cookie;
  if (!header) return null;
  for (const part of header.split(';')) {
    const i = part.indexOf('=');
    if (i === -1) continue;
    if (part.slice(0, i).trim() === name) return part.slice(i + 1).trim();
  }
  return null;
}

export interface CookieOptions {
  maxAgeSeconds: number;
  secure: boolean;
  httpOnly?: boolean;
  sameSite?: 'Lax' | 'Strict';
}

/** AUTH-8: Path=/, no Domain (required by the __Host- prefix), HttpOnly, SameSite=Lax, Secure in secure contexts. */
export function serializeCookie(name: string, value: string, o: CookieOptions): string {
  const parts = [`${name}=${value}`, 'Path=/', `Max-Age=${Math.max(0, Math.floor(o.maxAgeSeconds))}`, `SameSite=${o.sameSite ?? 'Lax'}`];
  if (o.httpOnly !== false) parts.push('HttpOnly');
  if (o.secure) parts.push('Secure');
  return parts.join('; ');
}

export function appendSetCookie(reply: FastifyReply, cookie: string): void {
  const existing = reply.getHeader('set-cookie');
  const list = existing === undefined ? [] : Array.isArray(existing) ? existing.map(String) : [String(existing)];
  const name = cookie.slice(0, cookie.indexOf('='));
  // The last write for a cookie name wins (e.g. roll then rotate in one request).
  reply.header('set-cookie', [...list.filter((c) => !c.startsWith(`${name}=`)), cookie]);
}

export function clearCookie(reply: FastifyReply, name: string, secure: boolean): void {
  appendSetCookie(reply, serializeCookie(name, '', { maxAgeSeconds: 0, secure }));
}
