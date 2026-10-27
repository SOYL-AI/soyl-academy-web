/**
 * Catalog reads for server-rendered /learn pages (ARCHITECTURE §3.1: static/ISR; "server data via the API
 * only"). Calls the API origin directly from the Next.js server with the edge secret (D-016); the browser
 * proxy is not involved. Responses are cached by Next for `CATALOG_REVALIDATE_SECONDS` (ISR).
 *
 * Server only (reads PLATFORM_EDGE_SECRET). Never import from a client component.
 */
import { createApiClient, isApiError, type ApiClient, type CatalogChapters, type CatalogSubjects } from '@/platform/shared/api-client';
import { EDGE_AUTH_HEADER, readProxyConfig } from './api-proxy';
import { examFor, type BoardSlug } from '../lib/catalog';

export const CATALOG_REVALIDATE_SECONDS = 3600;

export class PlatformApiNotConfigured extends Error {
  constructor() {
    super('Platform API is not configured (PLATFORM_API_ORIGIN / PLATFORM_EDGE_SECRET / flag)');
  }
}

/** Server-side client for public data: edge secret, ISR data cache (catalog: 1 h by default). */
export function serverApi(cacheOpts: { revalidate: number; tags: string[] } = { revalidate: CATALOG_REVALIDATE_SECONDS, tags: ['platform-catalog'] }): ApiClient {
  const cfg = readProxyConfig();
  if (!cfg) throw new PlatformApiNotConfigured();
  return createApiClient({
    baseUrl: cfg.origin,
    headers: { [EDGE_AUTH_HEADER]: cfg.edgeSecret },
    fetch: (input, init) => {
      // Public data is the same for everyone: cache it (ISR) instead of the client's no-store default.
      const { cache: _ignored, ...rest } = init ?? {};
      void _ignored;
      return fetch(input, {
        ...rest,
        credentials: undefined,
        signal: AbortSignal.timeout(cfg.timeoutMs),
        next: cacheOpts,
      } as RequestInit);
    },
  });
}

/** Subjects for a board and class; null when the API has none (→ 404 page). */
export async function getSubjects(board: BoardSlug, classLevel: number): Promise<CatalogSubjects | null> {
  try {
    const res = await serverApi().get('/v1/catalog/{board}/{class}/subjects', { params: { board, class: classLevel } });
    return res.subjects.length > 0 ? res : null;
  } catch (err) {
    if (isApiError(err, 'not_found') || (isApiError(err) && (err.status === 404 || err.status === 400))) return null;
    throw err;
  }
}

/** Chapters for a subject id; null when the subject does not exist or belongs to another board/class. */
export async function getChapters(subjectId: string, board: BoardSlug, classLevel: number): Promise<CatalogChapters | null> {
  try {
    const res = await serverApi().get('/v1/catalog/subjects/{id}/chapters', { params: { id: subjectId } });
    if (res.subject.classLevel !== classLevel || res.subject.exam !== examFor(board, classLevel)) return null;
    return res;
  } catch (err) {
    if (isApiError(err) && (err.status === 404 || err.status === 400)) return null;
    throw err;
  }
}

export type SubjectTier = CatalogSubjects['subjects'][number]['tier'];

export const TIER_ORDER: readonly SubjectTier[] = ['core', 'language', 'elective'];
export const TIER_HEADINGS: Record<SubjectTier, string> = { core: 'Core subjects', language: 'Languages', elective: 'Electives' };

/** Groups subjects by tier (core, languages, electives), keeping the API's order (waves first) within a tier. */
export function groupByTier(subjects: CatalogSubjects['subjects']): Array<{ tier: SubjectTier; subjects: CatalogSubjects['subjects'] }> {
  return TIER_ORDER.map((tier) => ({ tier, subjects: subjects.filter((s) => s.tier === tier) })).filter((g) => g.subjects.length > 0);
}
