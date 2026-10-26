/**
 * Helpers for the AI gateway suites: an app with consent granted and controllable plan/alerts, an SSE
 * parser, and byte builders for upload fixtures (JPEG with EXIF/GPS, PNG with text chunks, WebP with
 * EXIF, polyglots, PDFs) — the malicious-file corpus of AC-16.
 */
import type { LightMyRequestResponse } from 'fastify';
import { MockProvider, type ModelProvider } from '@soyl/ai-core';
import { createHarness, type Client, type Harness, type HarnessOptions } from './helpers';
import { StaticEntitlementService } from '../src/ai/entitlements';
import { registerGatewayFixtures } from '../src/ai/fixtures';
import { MemoryAlertSink } from '../src/ai/spend';
import type { MemoryBlobStore } from '../src/ai/blob';

export interface AiHarness extends Harness {
  plans: StaticEntitlementService;
  alerts: MemoryAlertSink;
  blob: MemoryBlobStore;
  member(email?: string): Promise<{ c: Client; id: string }>;
  setProvider(p: ModelProvider): void;
}

let n = 0;

export async function createAiHarness(opts: HarnessOptions = {}): Promise<AiHarness> {
  const plans = new StaticEntitlementService();
  const alerts = new MemoryAlertSink();
  const h = await createHarness({ consentDefault: 'granted', ...opts, ai: { ...opts.ai, runtime: { entitlements: plans, alerts, ...opts.ai?.runtime } } });
  const ai = h.services.ai;
  return Object.assign(h, {
    plans,
    alerts,
    blob: ai.runtime.blob as MemoryBlobStore,
    async member(email?: string) {
      const c = h.client();
      const r = await c.signInEmail(email ?? `ai.${Date.now().toString(36)}.${++n}@example.com`);
      return { c, id: r.user.id };
    },
    setProvider(p: ModelProvider) {
      registerGatewayFixtures(p);
      ai.runtime.provider = p;
    },
  });
}

export function mockProvider(opts: ConstructorParameters<typeof MockProvider>[0] = {}): MockProvider {
  const p = new MockProvider({ env: { APP_ENV: 'test' }, seed: 'test', ...opts });
  registerGatewayFixtures(p);
  return p;
}

export interface SseEvent {
  event: string;
  data: Record<string, unknown>;
}

export function sse(res: LightMyRequestResponse): SseEvent[] {
  return res.body
    .split('\n\n')
    .filter((b) => b.trim())
    .map((block) => {
      const event = /^event: (.+)$/m.exec(block)?.[1] ?? 'message';
      const data = /^data: (.+)$/m.exec(block)?.[1] ?? '{}';
      return { event, data: JSON.parse(data) as Record<string, unknown> };
    });
}

export const textOf = (events: SseEvent[]) =>
  events
    .filter((e) => e.event === 'delta')
    .map((e) => String(e.data.text))
    .join('');

/* ---------------------------------------------------------------------------------------------- */
/* File builders                                                                                   */
/* ---------------------------------------------------------------------------------------------- */

const seg = (marker: number, payload: Buffer) => {
  const b = Buffer.alloc(4);
  b[0] = 0xff;
  b[1] = marker;
  b.writeUInt16BE(payload.length + 2, 2);
  return Buffer.concat([b, payload]);
};

/** A structurally valid baseline JPEG (not decodable image data) with EXIF GPS, a comment and an appended payload. */
export function jpeg(width = 1600, height = 1200, opts: { exif?: boolean; trailer?: string } = {}): Buffer {
  const exif = seg(0xe1, Buffer.concat([Buffer.from('Exif\0\0', 'latin1'), Buffer.from('GPSLatitude 28.6139 N GPSLongitude 77.2090 E', 'latin1')]));
  const com = seg(0xfe, Buffer.from('camera comment', 'latin1'));
  const dqt = seg(0xdb, Buffer.alloc(65, 1));
  const sof = Buffer.alloc(15);
  sof[0] = 8;
  sof.writeUInt16BE(height, 1);
  sof.writeUInt16BE(width, 3);
  sof[5] = 3;
  const dht = seg(0xc4, Buffer.alloc(20, 2));
  const sos = seg(0xda, Buffer.from([3, 1, 0, 2, 0x11, 3, 0x11, 0, 0x3f, 0]));
  const scan = Buffer.from([0x12, 0x34, 0xff, 0x00, 0x56, 0x78, 0x9a]);
  return Buffer.concat([
    Buffer.from([0xff, 0xd8]),
    ...(opts.exif === false ? [] : [exif, com]),
    dqt,
    seg(0xc0, sof),
    dht,
    sos,
    scan,
    Buffer.from([0xff, 0xd9]),
    Buffer.from(opts.trailer ?? '', 'latin1'),
  ]);
}

const chunk = (type: string, data: Buffer) => {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  return Buffer.concat([len, Buffer.from(type, 'latin1'), data, Buffer.alloc(4)]);
};

export function png(width = 800, height = 600, opts: { text?: boolean; trailer?: string } = {}): Buffer {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    ...(opts.text === false ? [] : [chunk('tEXt', Buffer.from('Comment\0taken at home, Sector 21', 'latin1')), chunk('eXIf', Buffer.from('MM\0*GPS', 'latin1'))]),
    chunk('IDAT', Buffer.alloc(32, 7)),
    chunk('IEND', Buffer.alloc(0)),
    Buffer.from(opts.trailer ?? '', 'latin1'),
  ]);
}

export function webp(width = 640, height = 480): Buffer {
  const riffChunk = (type: string, data: Buffer) => {
    const h = Buffer.alloc(8);
    h.write(type, 0, 'latin1');
    h.writeUInt32LE(data.length, 4);
    return Buffer.concat([h, data, data.length % 2 ? Buffer.alloc(1) : Buffer.alloc(0)]);
  };
  const vp8x = Buffer.alloc(10);
  vp8x[0] = 0x08 | 0x04; // EXIF + XMP flags
  vp8x.writeUIntLE(width - 1, 4, 3);
  vp8x.writeUIntLE(height - 1, 7, 3);
  const body = Buffer.concat([riffChunk('VP8X', vp8x), riffChunk('EXIF', Buffer.from('GPS 12.97N 77.59E', 'latin1')), riffChunk('VP8L', Buffer.from([0x2f, 0, 0, 0, 0, 1, 2, 3]))]);
  const head = Buffer.alloc(12);
  head.write('RIFF', 0, 'latin1');
  head.writeUInt32LE(body.length + 4, 4);
  head.write('WEBP', 8, 'latin1');
  return Buffer.concat([head, body]);
}

export function pdf(pages: number, extra = ''): Buffer {
  const objs = Array.from({ length: pages }, (_, i) => `${i + 3} 0 obj << /Type /Page /Parent 2 0 R >> endobj`).join('\n');
  return Buffer.from(`%PDF-1.4\n1 0 obj << /Type /Catalog /Pages 2 0 R ${extra} >> endobj\n2 0 obj << /Type /Pages /Count ${pages} >> endobj\n${objs}\n%%EOF\n`, 'latin1');
}

export const SVG_AS_PNG = Buffer.from('<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>', 'utf8');

/** Uploads bytes the way a browser does: create → PUT to the SAS URL → complete → wait for processing. */
export async function uploadFile(h: AiHarness, c: Client, kind: 'photo_doubt' | 'sample_paper', contentType: string, data: Buffer) {
  const created = await c.post('/v1/ai/uploads', { kind, contentType, bytes: data.length });
  if (created.statusCode !== 201) throw new Error(`upload create ${created.statusCode} ${created.body}`);
  const t = created.json() as { uploadId: string; uploadUrl: string; headers: Record<string, string> };
  const put = h.blob.acceptUpload(t.uploadUrl, data, t.headers['content-type']!);
  if (!put.ok) throw new Error('PUT refused');
  const done = await c.post(`/v1/ai/uploads/${t.uploadId}/complete`);
  if (done.statusCode !== 202) throw new Error(`complete ${done.statusCode} ${done.body}`);
  await h.services.ai.jobs.drain();
  const view = await c.get(`/v1/ai/uploads/${t.uploadId}`);
  return view.json() as { id: string; status: string; rejectReason: string | null; contentType: string; pages: number | null; bytes: number };
}
