/**
 * Uploads (ARCHITECTURE §10, D-018, F-013, AC-16; ADR-013).
 *
 *   POST /v1/ai/uploads               declared kind/type/size checked → `uploads` row (30-day expiry)
 *                                     → write-only SAS (≤ 5 min) for one quarantine blob
 *   (browser) PUT {uploadUrl}         straight to Blob storage; never through the web proxy or API
 *   POST /v1/ai/uploads/:id/complete  the blob exists → processing job (sniff, limits, clean)
 *   GET  /v1/ai/uploads/:id           status: pending_upload → uploaded → scanning → ready | rejected
 *
 * School papers and photos are private to their owner, never republished and never added to the
 * question bank; the blueprint flow reads only structure from them.
 */
import { and, eq, inArray, lt, sql } from 'drizzle-orm';
import { auditLog, uploads, type Database } from '@soyl/db';
import { AI_UPLOADS, type AiUploadContentType } from '@soyl/shared/config/ai-actions';
import type { Clock } from '../clock';
import { ApiProblem } from '../errors';
import { BlobUnavailableError } from './blob';
import { quarantineKey, type AiJobRunner } from './jobs';
import type { AiRuntime } from './runtime';

export type UploadKind = 'photo_doubt' | 'sample_paper' | 'answer_sheet';

export interface CreateUploadInput {
  kind: UploadKind;
  contentType: AiUploadContentType;
  bytes: number;
}

export class UploadService {
  constructor(
    private readonly db: Database,
    private readonly clock: Clock,
    private readonly runtime: () => AiRuntime,
    private readonly jobs: AiJobRunner,
  ) {}

  private now(): Date {
    return new Date(this.clock.now());
  }

  async create(userId: string, input: CreateUploadInput) {
    if (!(AI_UPLOADS.contentTypes as readonly string[]).includes(input.contentType)) throw new ApiProblem('upload_rejected', { detail: 'Use a JPEG, PNG or WebP photo, or a PDF.' });
    if (input.bytes > AI_UPLOADS.maxBytes) throw new ApiProblem('upload_rejected', { detail: 'Files must be 10 MB or smaller.' });
    if (input.kind === 'photo_doubt' && input.contentType === 'application/pdf') throw new ApiProblem('upload_rejected', { detail: 'Send a photo (JPEG, PNG or WebP) of the question.' });
    const now = this.now();
    const blobKey = quarantineKey(userId);
    const sasExpiry = new Date(now.getTime() + AI_UPLOADS.sasTtlSeconds * 1000);
    let target;
    try {
      target = await this.runtime().blob.createUploadUrl(AI_UPLOADS.containers.quarantine, blobKey, { contentType: input.contentType, expiresAt: sasExpiry });
    } catch (e) {
      if (e instanceof BlobUnavailableError) throw new ApiProblem('ai_unavailable', { detail: 'Uploads are not available right now.' });
      throw e;
    }
    const [row] = await this.db
      .insert(uploads)
      .values({
        userId,
        kind: input.kind,
        blobKey,
        contentType: input.contentType,
        bytes: input.bytes,
        status: 'pending_upload',
        expiresAt: new Date(now.getTime() + AI_UPLOADS.retentionDays * 86_400_000),
        createdAt: now,
        updatedAt: now,
      })
      .returning();
    return {
      uploadId: row!.id,
      uploadUrl: target.url,
      method: target.method,
      headers: target.headers,
      uploadExpiresAt: target.expiresAt.toISOString(),
      maxBytes: AI_UPLOADS.maxBytes,
      expiresAt: row!.expiresAt.toISOString(),
    };
  }

  private async own(userId: string, id: string) {
    const [u] = await this.db.select().from(uploads).where(and(eq(uploads.id, id), eq(uploads.userId, userId)));
    if (!u || u.status === 'expired' || u.status === 'deleted') throw new ApiProblem('not_found');
    return u;
  }

  async complete(userId: string, id: string) {
    const u = await this.own(userId, id);
    if (u.status !== 'pending_upload') return this.view(u);
    let info;
    try {
      info = await this.runtime().blob.head(AI_UPLOADS.containers.quarantine, u.blobKey);
    } catch (e) {
      if (e instanceof BlobUnavailableError) throw new ApiProblem('ai_unavailable', { detail: 'Uploads are not available right now.' });
      throw e;
    }
    if (!info) throw new ApiProblem('upload_not_ready', { detail: 'Upload the file first, then try again.' });
    const [row] = await this.db
      .update(uploads)
      .set({ status: 'uploaded', updatedAt: this.now() })
      .where(and(eq(uploads.id, u.id), eq(uploads.status, 'pending_upload')))
      .returning();
    if (row) await this.jobs.startUploadProcessing(userId, u.id);
    return this.view(row ?? (await this.own(userId, id)));
  }

  async get(userId: string, id: string) {
    return this.view(await this.own(userId, id));
  }

  view(u: typeof uploads.$inferSelect) {
    return {
      id: u.id,
      kind: u.kind as UploadKind,
      status: u.status as 'pending_upload' | 'uploaded' | 'scanning' | 'ready' | 'rejected',
      rejectReason: u.rejectReason,
      contentType: u.processedContentType ?? u.contentType,
      bytes: u.bytes,
      pages: u.pages,
      expiresAt: u.expiresAt.toISOString(),
      createdAt: u.createdAt.toISOString(),
    };
  }

  /**
   * S6-M02 (AC-25, DPDP erasure): account deletion marks the user's uploads `deleted` (in its
   * transaction); this deletes both blobs of each — the quarantine original (`blob_key` in
   * `uploads-quarantine`) and the cleaned derivative (`processed_key` in `uploads`) — then the row,
   * and writes one audit row per user (ids and counts only). A failed blob delete leaves the row for
   * the next run: the API runs this right after `DELETE /v1/me`, the worker's `uploads.purge-deleted`
   * retries every 5 minutes. The rows are the index of the blobs (every blob key comes from a row),
   * so nothing is orphaned; the 30-day storage lifecycle rule stays the last-resort backstop.
   */
  async purgeDeleted(now: Date, opts: { userId?: string; limit?: number } = {}): Promise<{ purged: number; failed: number }> {
    const due = await this.db
      .select({ id: uploads.id, userId: uploads.userId, blobKey: uploads.blobKey, processedKey: uploads.processedKey })
      .from(uploads)
      .where(and(eq(uploads.status, 'deleted'), opts.userId ? eq(uploads.userId, opts.userId) : undefined))
      .orderBy(uploads.id)
      .limit(opts.limit ?? 500);
    if (!due.length) return { purged: 0, failed: 0 };
    const blob = this.runtime().blob;
    const done: typeof due = [];
    let failed = 0;
    for (const u of due) {
      try {
        await blob.delete(AI_UPLOADS.containers.quarantine, u.blobKey);
        if (u.processedKey) await blob.delete(AI_UPLOADS.containers.clean, u.processedKey);
        done.push(u);
      } catch {
        failed++; // kept as `deleted`; retried by the next run
      }
    }
    if (done.length) {
      const perUser = new Map<string, number>();
      for (const u of done) perUser.set(u.userId, (perUser.get(u.userId) ?? 0) + 1);
      await this.db.transaction(async (tx) => {
        await tx.delete(uploads).where(and(inArray(uploads.id, done.map((u) => u.id)), eq(uploads.status, 'deleted')));
        await tx.insert(auditLog).values(
          [...perUser].map(([userId, n]) => ({ actorUserId: null, actorRole: 'system', action: 'account.uploads_purged', targetType: 'user', targetId: userId, after: { uploads: n, blobs: 'deleted' }, createdAt: now })),
        );
      });
    }
    return { purged: done.length, failed };
  }

  /** Retention (worker `ai.retention`): expired uploads lose both blobs; the row stays as `expired`. */
  async expireDue(now: Date, limit = 500): Promise<{ expired: number }> {
    const due = await this.db
      .select()
      .from(uploads)
      .where(and(lt(uploads.expiresAt, now), sql`${uploads.status} NOT IN ('expired', 'deleted')`))
      .limit(limit);
    const blob = this.runtime().blob;
    const ids: string[] = [];
    for (const u of due) {
      await blob.delete(AI_UPLOADS.containers.quarantine, u.blobKey).catch(() => {});
      if (u.processedKey) await blob.delete(AI_UPLOADS.containers.clean, u.processedKey).catch(() => {});
      ids.push(u.id);
    }
    if (ids.length) await this.db.update(uploads).set({ status: 'expired', processedKey: null, updatedAt: now }).where(inArray(uploads.id, ids));
    return { expired: ids.length };
  }
}
