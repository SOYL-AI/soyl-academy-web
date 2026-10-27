/**
 * AI uploads from the browser (ai-gateway M4 handoff "What web needs" §7; ADR-018 §5):
 *
 *   compress (images): decode → draw on a canvas at ≤ 2048 px → JPEG ~0.8, ≤ 4 MB. Re-encoding through a
 *   canvas drops EXIF (GPS, device) and any trailing bytes; the server cleans again anyway (ADR-013 §11).
 *   POST /v1/ai/uploads → PUT uploadUrl (straight to Blob storage, exactly the returned headers, no
 *   cookies) → POST /v1/ai/uploads/:id/complete → poll GET /v1/ai/uploads/:id until ready or rejected.
 */
import { ApiError, type AiUpload, type AiUploadRequest } from '@/platform/shared/api-client';
import { api } from '../lib/api-browser';
import { UPLOAD_REJECT_TEXT } from './problems';

export const MAX_IMAGE_DIM = 2048;
export const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;

/** Target size for a w×h image whose longer side must fit `max`. */
export function fitWithin(w: number, h: number, max: number = MAX_IMAGE_DIM): { width: number; height: number } {
  if (w <= 0 || h <= 0) return { width: 0, height: 0 };
  const scale = Math.min(1, max / Math.max(w, h));
  return { width: Math.max(1, Math.round(w * scale)), height: Math.max(1, Math.round(h * scale)) };
}

async function decode(file: Blob): Promise<{ source: CanvasImageSource; width: number; height: number; close?: () => void }> {
  if (typeof createImageBitmap === 'function') {
    try {
      const bmp = await createImageBitmap(file, { imageOrientation: 'from-image' });
      return { source: bmp, width: bmp.width, height: bmp.height, close: () => bmp.close() };
    } catch {
      // fall through to <img>
    }
  }
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.decoding = 'async';
    img.src = url;
    await img.decode();
    return { source: img, width: img.naturalWidth, height: img.naturalHeight };
  } finally {
    URL.revokeObjectURL(url);
  }
}

function toBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('encode failed'))), 'image/jpeg', quality));
}

/** A clean JPEG of the photo, ≤ 2048 px on its longer side and ≤ 4 MB. */
export async function compressImage(file: Blob, opts: { maxDim?: number; maxBytes?: number; quality?: number } = {}): Promise<Blob> {
  const maxBytes = opts.maxBytes ?? MAX_IMAGE_BYTES;
  const img = await decode(file);
  try {
    let { width, height } = fitWithin(img.width, img.height, opts.maxDim ?? MAX_IMAGE_DIM);
    let quality = opts.quality ?? 0.8;
    for (let round = 0; round < 6; round++) {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('no canvas');
      ctx.fillStyle = '#fff'; // transparent PNGs become white, not black
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img.source, 0, 0, width, height);
      const blob = await toBlob(canvas, quality);
      if (blob.size <= maxBytes) return blob;
      if (quality > 0.55) quality -= 0.15;
      else {
        width = Math.round(width * 0.8);
        height = Math.round(height * 0.8);
      }
    }
    throw new Error('could not make the image small enough');
  } finally {
    img.close?.();
  }
}

export class UploadRejected extends Error {
  constructor(readonly reason: string) {
    super(UPLOAD_REJECT_TEXT[reason] ?? 'We could not use that file. Please try another photo.');
    this.name = 'UploadRejected';
  }
}

export interface UploadOptions {
  kind: AiUploadRequest['kind'];
  blob: Blob;
  contentType: AiUploadRequest['contentType'];
  onStage?: (stage: 'uploading' | 'checking') => void;
  signal?: AbortSignal;
  pollMs?: number;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
}

/** Runs the whole upload and returns the ready upload. Throws ApiError, UploadRejected or a network error. */
export async function uploadForAi(o: UploadOptions): Promise<AiUpload> {
  const doFetch = o.fetchImpl ?? ((i: RequestInfo | URL, init?: RequestInit) => globalThis.fetch(i, init));
  o.onStage?.('uploading');
  const target = await api.post('/v1/ai/uploads', { body: { kind: o.kind, contentType: o.contentType, bytes: o.blob.size }, signal: o.signal });
  let put: Response;
  try {
    // Straight to storage (D-018): no cookies, no credentials, exactly the headers the API signed for.
    put = await doFetch(target.uploadUrl, { method: 'PUT', headers: target.headers, body: o.blob, credentials: 'omit', mode: 'cors', signal: o.signal });
  } catch (err) {
    if ((err as { name?: string })?.name === 'AbortError') throw err;
    throw new ApiError(0, 'network_error', null, 'Upload failed');
  }
  if (!put.ok) throw new ApiError(put.status, put.status === 403 ? 'upload_expired' : 'upload_failed', null, 'Upload failed');
  o.onStage?.('checking');
  let up = await api.post('/v1/ai/uploads/{id}/complete', { params: { id: target.uploadId }, signal: o.signal });
  const deadline = Date.now() + (o.timeoutMs ?? 90_000);
  while (up.status !== 'ready' && up.status !== 'rejected') {
    if (Date.now() > deadline) throw new UploadRejected('processing_failed');
    await new Promise((r) => setTimeout(r, o.pollMs ?? 1000));
    up = await api.get('/v1/ai/uploads/{id}', { params: { id: target.uploadId }, signal: o.signal });
  }
  if (up.status === 'rejected') throw new UploadRejected(up.rejectReason ?? 'processing_failed');
  return up;
}

/** Image files are compressed; PDFs (sample papers) go as they are. */
export async function prepareFile(file: File): Promise<{ blob: Blob; contentType: AiUploadRequest['contentType'] }> {
  if (file.type === 'application/pdf') {
    if (file.size > MAX_UPLOAD_BYTES) throw new UploadRejected('too_large');
    return { blob: file, contentType: 'application/pdf' };
  }
  if (!file.type.startsWith('image/')) throw new UploadRejected('unsupported_type');
  // HEIC from iPhones: Safari can decode it, and the re-encode below makes it a JPEG the API accepts.
  return { blob: await compressImage(file), contentType: 'image/jpeg' };
}
