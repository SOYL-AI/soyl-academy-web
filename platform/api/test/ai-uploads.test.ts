/**
 * Uploads and the vision actions (ARCHITECTURE §10, D-018, F-013, AC-13, AC-16): write-only SAS to
 * quarantine, size/type/page limits, the malicious-file corpus (EXIF GPS, polyglots, SVG renamed .png,
 * decompression bomb, PDF page bomb and active content), photo doubts with a cleaned image, and
 * "papers like my school's" building a paper from OUR bank by blueprint (paid plans), 30-day expiry.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { count, eq, sql } from 'drizzle-orm';
import { aiJobs, questions, uploads } from '@soyl/db';
import { MockProvider, type ProviderRequest } from '@soyl/ai-core';
import { AI_UPLOADS } from '@soyl/shared/config/ai-actions';
import { registerGatewayFixtures } from '../src/ai/fixtures';
import { seedRealContent } from './content-fixture';
import { createAiHarness, jpeg, mockProvider, pdf, png, sse, SVG_AS_PNG, textOf, uploadFile, webp, type AiHarness } from './ai-fixture';

let h: AiHarness;
const SCI = 'cbse-10-science-ch02';

beforeAll(async () => {
  h = await createAiHarness();
  await seedRealContent(h.t, (u) => u === SCI);
});
afterAll(async () => {
  await h?.close();
});

describe('upload URLs (F-013, AC-16)', () => {
  it('issues a ≤ 5-minute write-only SAS for one quarantine blob; files are kept 30 days', async () => {
    const { c, id } = await h.member();
    const now = h.clock.now();
    const res = await c.post('/v1/ai/uploads', { kind: 'photo_doubt', contentType: 'image/jpeg', bytes: 123_456 });
    expect(res.statusCode).toBe(201);
    const t = res.json();
    const u = new URL(t.uploadUrl);
    expect(u.protocol).toBe('memory:');
    expect(u.host).toBe(AI_UPLOADS.containers.quarantine);
    expect(u.pathname.startsWith(`/${id}/`)).toBe(true);
    expect(u.searchParams.get('sp')).toBe('cw');
    expect(t).toMatchObject({ method: 'PUT', maxBytes: 10 * 1024 * 1024, headers: { 'x-ms-blob-type': 'BlockBlob', 'content-type': 'image/jpeg' } });
    expect(Date.parse(t.uploadExpiresAt) - now).toBe(300_000);
    expect(Date.parse(t.expiresAt) - now).toBe(30 * 86_400_000);
    const [row] = await h.t.db.select().from(uploads).where(eq(uploads.id, t.uploadId));
    expect(row).toMatchObject({ status: 'pending_upload', kind: 'photo_doubt', userId: id });
    // Completing before the browser uploaded anything is refused.
    expect((await c.post(`/v1/ai/uploads/${t.uploadId}/complete`)).statusCode).toBe(409);
    // Someone else cannot see or complete it.
    const other = await h.member();
    expect((await other.c.get(`/v1/ai/uploads/${t.uploadId}`)).statusCode).toBe(404);
    expect((await other.c.post(`/v1/ai/uploads/${t.uploadId}/complete`)).statusCode).toBe(404);
  });

  it('refuses SVG/HTML types, files over 10 MB and PDFs for photo doubts; needs consent; is rate limited', async () => {
    const { c, id } = await h.member();
    expect((await c.post('/v1/ai/uploads', { kind: 'photo_doubt', contentType: 'image/svg+xml', bytes: 10 })).statusCode).toBe(400);
    expect((await c.post('/v1/ai/uploads', { kind: 'photo_doubt', contentType: 'image/heic', bytes: 10 })).statusCode).toBe(400);
    expect((await c.post('/v1/ai/uploads', { kind: 'sample_paper', contentType: 'application/pdf', bytes: 10 * 1024 * 1024 + 1 })).statusCode).toBe(400);
    const pdfPhoto = await c.post('/v1/ai/uploads', { kind: 'photo_doubt', contentType: 'application/pdf', bytes: 1000 });
    expect(pdfPhoto.statusCode).toBe(422);
    expect(pdfPhoto.json().code).toBe('upload_rejected');
    // Every call counts towards uploads.user.hour (5), refused ones included.
    const fresh = await h.member();
    for (let i = 0; i < 5; i++) expect((await fresh.c.post('/v1/ai/uploads', { kind: 'sample_paper', contentType: 'application/pdf', bytes: 1000 })).statusCode).toBe(201);
    expect((await fresh.c.post('/v1/ai/uploads', { kind: 'sample_paper', contentType: 'application/pdf', bytes: 1000 })).statusCode).toBe(429);
    h.consent.setStatus(id, 'revoked');
    await h.services.consent.refresh(id);
    const noConsent = await h.member();
    h.consent.setStatus(noConsent.id, 'pending');
    await h.services.consent.refresh(noConsent.id);
    expect((await noConsent.c.post('/v1/ai/uploads', { kind: 'photo_doubt', contentType: 'image/png', bytes: 10 })).statusCode).toBe(403);
  });

  it('an expired or forged SAS cannot write', async () => {
    const { c } = await h.member();
    const t = (await c.post('/v1/ai/uploads', { kind: 'photo_doubt', contentType: 'image/png', bytes: 100 })).json();
    expect(h.blob.acceptUpload(t.uploadUrl.replace('sp=cw', 'sp=r'), png(), 'image/png').ok).toBe(false);
    h.clock.advance(301_000);
    expect(h.blob.acceptUpload(t.uploadUrl, png(), 'image/png').ok).toBe(false);
  });
});

describe('processing: the malicious-file corpus (AC-16)', () => {
  it('cleans images: EXIF/GPS and appended payloads are removed; only the derivative is kept', async () => {
    const { c } = await h.member();
    const v = await uploadFile(h, c, 'photo_doubt', 'image/jpeg', jpeg(2000, 1500, { trailer: '<script>alert(1)</script>' }));
    expect(v).toMatchObject({ status: 'ready', contentType: 'image/jpeg', rejectReason: null });
    const [row] = await h.t.db.select().from(uploads).where(eq(uploads.id, v.id));
    expect(h.blob.has(AI_UPLOADS.containers.quarantine, row!.blobKey)).toBe(false);
    expect(row!.processedKey).toMatch(/\.jpg$/);
    expect(row!.sha256).toMatch(/^[0-9a-f]{64}$/);
    const clean = await h.blob.get(AI_UPLOADS.containers.clean, row!.processedKey!, AI_UPLOADS.maxBytes);
    expect(clean.toString('latin1')).not.toMatch(/GPS|Exif|<script>/);
    expect((await uploadFile(h, c, 'photo_doubt', 'image/png', png(1000, 800))).status).toBe('ready');
    expect((await uploadFile(h, c, 'photo_doubt', 'image/webp', webp(800, 600))).status).toBe('ready');
  });

  it('rejects SVG renamed .png, type mismatches, decompression bombs, PDF page bombs and active PDFs', async () => {
    const { c } = await h.member();
    expect(await uploadFile(h, c, 'photo_doubt', 'image/png', SVG_AS_PNG)).toMatchObject({ status: 'rejected', rejectReason: 'unsupported_type' });
    expect(await uploadFile(h, c, 'photo_doubt', 'image/png', jpeg())).toMatchObject({ status: 'rejected', rejectReason: 'type_mismatch' });
    expect(await uploadFile(h, c, 'photo_doubt', 'image/jpeg', jpeg(9000, 9000))).toMatchObject({ status: 'rejected', rejectReason: 'too_many_pixels' });
    const other = await h.member();
    expect(await uploadFile(h, other.c, 'sample_paper', 'application/pdf', pdf(11))).toMatchObject({ status: 'rejected', rejectReason: 'too_many_pages' });
    expect(await uploadFile(h, other.c, 'sample_paper', 'application/pdf', pdf(2, '/OpenAction << /S /JavaScript /JS (x) >>'))).toMatchObject({ status: 'rejected', rejectReason: 'unsafe_pdf' });
    expect(await uploadFile(h, other.c, 'sample_paper', 'application/pdf', pdf(3))).toMatchObject({ status: 'ready', pages: 3 });
  });
});

describe('photo doubts (vision)', () => {
  it('sends the cleaned image (never a URL) and charges 10 credits; refuses uploads that are not ready or not yours', async () => {
    const { c } = await h.member();
    const seen: ProviderRequest[] = [];
    const spy = new MockProvider({ env: { APP_ENV: 'test' }, seed: 'spy' });
    const orig = spy.stream.bind(spy);
    spy.stream = async (req, onDelta) => {
      seen.push(req);
      return orig(req, onDelta);
    };
    registerGatewayFixtures(spy);
    h.setProvider(spy);
    try {
      const up = await uploadFile(h, c, 'photo_doubt', 'image/jpeg', jpeg(1200, 900));
      const ev = sse(await c.post('/v1/ai/photo-doubt', { uploadId: up.id, chapterId: SCI }));
      expect(ev[0]!.data).toMatchObject({ action: 'photo-doubt', credits: 10, tier: 'mid', mode: 'hint' });
      expect(textOf(ev)).toContain('I read the question in your photo');
      const img = seen[0]!.messages.at(-1)!.images![0]!;
      expect(img.dataUrl.startsWith('data:image/jpeg;base64,')).toBe(true);
      expect(Buffer.from(img.dataUrl.split(',')[1]!, 'base64').toString('latin1')).not.toMatch(/GPS/);
      expect((await c.get('/v1/credits')).json().balance).toBe(15);
      const other = await h.member();
      expect((await other.c.post('/v1/ai/photo-doubt', { uploadId: up.id })).statusCode).toBe(404);
      const pending = (await c.post('/v1/ai/uploads', { kind: 'photo_doubt', contentType: 'image/png', bytes: 100 })).json();
      expect((await c.post('/v1/ai/photo-doubt', { uploadId: pending.uploadId })).statusCode).toBe(409);
      const bad = await uploadFile(h, c, 'photo_doubt', 'image/png', SVG_AS_PNG);
      expect((await c.post('/v1/ai/photo-doubt', { uploadId: bad.id })).statusCode).toBe(422);
    } finally {
      h.setProvider(mockProvider());
    }
  });
});

describe('papers like my school’s (paid plans)', () => {
  it('extracts a blueprint and builds a paper from our bank; school questions are never stored; 60 credits', async () => {
    const { c, id } = await h.member();
    h.plans.set(id, 'pro');
    const before = (await h.t.db.select({ n: count() }).from(questions))[0]!.n;
    const up = await uploadFile(h, c, 'sample_paper', 'application/pdf', pdf(4));
    expect((await c.get('/v1/ai/quote/paper-from-upload')).json()).toMatchObject({ credits: 60, allowedForPlan: true, affordable: true });
    const res = await c.post('/v1/ai/paper-from-upload', { uploadId: up.id, subjectId: 'cbse-10-science' });
    expect(res.statusCode).toBe(202);
    const accepted = res.json();
    expect(accepted).toMatchObject({ status: 'queued', action: 'paper-from-upload', credits: 60, balance: 0 });
    await h.services.ai.jobs.drain();
    const job = (await c.get(`/v1/ai/jobs/${accepted.jobId}`)).json();
    expect(job).toMatchObject({ kind: 'paper_from_upload', status: 'succeeded', error: null });
    expect(job.result.blueprint).toMatchObject({ durationMin: 90, totalMarks: 40 });
    expect(job.result.blueprint.chapterIds).toContain(SCI);
    expect(job.result.skippedChapters).not.toContain(SCI); // chapters without questions here are skipped
    expect(job.result.blueprint.sections.map((s: { questionType: string }) => s.questionType)).toEqual(['mcq', 'short', 'short', 'long']);
    expect(JSON.stringify(job.result)).not.toMatch(/stem|question_text|\[MOCK\] blueprint/);
    const meta = await c.get(`/v1/tests/${job.result.testId}`);
    expect(meta.statusCode).toBe(200);
    expect(meta.json()).toMatchObject({ custom: true });
    expect((await h.t.db.select({ n: count() }).from(questions))[0]!.n).toBe(before);
    expect((await c.get('/v1/credits')).json()).toMatchObject({ balance: 0, spentToday: 60 });
    // Plus has 40 credits a day: the action is allowed but cannot be afforded (owner decision, handoff).
    const plus = await h.member();
    h.plans.set(plus.id, 'plus');
    const up2 = await uploadFile(h, plus.c, 'sample_paper', 'image/png', png());
    const r2 = await plus.c.post('/v1/ai/paper-from-upload', { uploadId: up2.id, subjectId: 'cbse-10-science' });
    expect(r2.statusCode).toBe(402);
    expect(r2.json()).toMatchObject({ code: 'credits_exhausted', required: 60, balance: 40 });
    // Jobs are private.
    expect((await plus.c.get(`/v1/ai/jobs/${accepted.jobId}`)).statusCode).toBe(404);
  });

  it('a failed blueprint is refunded', async () => {
    const { c, id } = await h.member();
    h.plans.set(id, 'pro');
    h.setProvider(mockProvider({ failOnCall: () => new Error('HTTP 500') }));
    try {
      const up = await uploadFile(h, c, 'sample_paper', 'image/jpeg', jpeg());
      const accepted = (await c.post('/v1/ai/paper-from-upload', { uploadId: up.id, subjectId: 'cbse-10-science' })).json();
      await h.services.ai.jobs.drain();
      const [row] = await h.t.db.select().from(aiJobs).where(eq(aiJobs.id, accepted.jobId));
      expect(row).toMatchObject({ status: 'failed', errorCode: 'blueprint_failed' });
      expect((await c.get('/v1/credits')).json().balance).toBe(60);
    } finally {
      h.setProvider(mockProvider());
    }
  });
});

describe('retention', () => {
  it('expires uploads after 30 days: both blobs deleted, row kept as expired', async () => {
    const { c } = await h.member();
    const up = await uploadFile(h, c, 'photo_doubt', 'image/png', png());
    const [row] = await h.t.db.select().from(uploads).where(eq(uploads.id, up.id));
    const r = await h.services.ai.uploads.expireDue(new Date(h.clock.now() + 31 * 86_400_000));
    expect(r.expired).toBeGreaterThan(0);
    expect(h.blob.has(AI_UPLOADS.containers.clean, row!.processedKey!)).toBe(false);
    const [after] = await h.t.db.select().from(uploads).where(eq(uploads.id, up.id));
    expect(after).toMatchObject({ status: 'expired', processedKey: null });
    expect((await c.get(`/v1/ai/uploads/${up.id}`)).statusCode).toBe(404);
  });
});

describe('image moderation at upload (AC-15, F-027)', () => {
  it('refuses unsafe images before any model sees them', async () => {
    const { c } = await h.member();
    const { LOCAL_UNSAFE_IMAGE_MARKER } = await import('../src/ai/moderation/providers');
    const v = await uploadFile(h, c, 'photo_doubt', 'image/png', png(400, 300, { idat: Buffer.from(LOCAL_UNSAFE_IMAGE_MARKER) }));
    expect(v).toMatchObject({ status: 'rejected', rejectReason: 'unsafe_content' });
    expect((await c.post('/v1/ai/photo-doubt', { uploadId: v.id })).statusCode).toBe(422);
  });

  it('fails closed when image moderation is down: the upload is never usable; after the retries it is refused', async () => {
    const { c } = await h.member();
    const { LocalRuleModerationProvider } = await import('../src/ai/moderation/providers');
    const down = new LocalRuleModerationProvider();
    down.failing = true;
    h.services.ai.runtime.moderation = down;
    try {
      const v = await uploadFile(h, c, 'photo_doubt', 'image/png', png());
      expect(v.status).toBe('scanning');
      expect((await c.post('/v1/ai/photo-doubt', { uploadId: v.id })).statusCode).toBe(409);
      const [job] = await h.t.db.select().from(aiJobs).where(sql`${aiJobs.payload}->>'uploadId' = ${v.id}`);
      expect(job).toMatchObject({ status: 'queued', attempts: 1, errorCode: 'retrying' });
      await h.services.ai.jobs.runJob(job!.id);
      await h.services.ai.jobs.runJob(job!.id);
      const after = (await c.get(`/v1/ai/uploads/${v.id}`)).json();
      expect(after).toMatchObject({ status: 'rejected', rejectReason: 'processing_failed' });
    } finally {
      h.services.ai.runtime.moderation = new LocalRuleModerationProvider();
    }
  });
});
