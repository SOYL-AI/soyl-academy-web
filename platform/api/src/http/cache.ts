/**
 * HTTP caching for public content reads (ADR-010, API-4).
 *
 * Content responses (chapter hub, deck, notes, flashcards, guest practice pages) are identical for
 * every caller, so guests get a shared-cacheable response and a strong ETag. Signed-in callers get
 * the same body with a private Cache-Control (app.ts onSend), or no-store when the response also
 * refreshes the session cookie. Personal progress is never in these bodies; it has its own
 * endpoints under /v1/me (no-store).
 */
import { createHash } from 'node:crypto';
import type { FastifyReply, FastifyRequest } from 'fastify';

/** A fixed mistake ("Report a mistake", 24 h SLA) reaches every reader within the s-maxage + SWR window. */
export const CONTENT_CACHE_CONTROL = 'public, max-age=120, s-maxage=600, stale-while-revalidate=3600';
export const CONTENT_PRIVATE_CACHE_CONTROL = 'private, max-age=60, stale-while-revalidate=600';

export function etagFor(body: unknown): string {
  return `"${createHash('sha256').update(JSON.stringify(body)).digest('base64url').slice(0, 27)}"`;
}

function matches(header: string | undefined, etag: string): boolean {
  if (!header) return false;
  return header.split(',').some((t) => {
    const v = t.trim();
    return v === '*' || v === etag || v === `W/${etag}`;
  });
}

/** Sets ETag + Cache-Control; answers 304 when If-None-Match matches. */
export function cachedContent<T>(request: FastifyRequest, reply: FastifyReply, body: T, cacheControl: string = CONTENT_CACHE_CONTROL): T | FastifyReply {
  const etag = etagFor(body);
  reply.header('etag', etag);
  reply.header('cache-control', cacheControl);
  reply.header('vary', 'accept-encoding');
  if (matches(request.headers['if-none-match'], etag)) return reply.status(304).send();
  return body;
}
