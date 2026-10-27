/**
 * Upload validation and cleaning (AC-16, ASVS 5.1.1, 5.2.x; ADR-013). Pure functions over bytes, no
 * native decoders, so they run the same in the API, the worker and tests.
 *
 *   sniff      magic bytes decide the type; the declared Content-Type must agree. JPEG, PNG, WebP and
 *              PDF only. SVG/HTML/XML, HEIC and everything else are refused.
 *   limits     ≤ 10 MB; images ≤ 40 MP (dimensions read from the header, before any decoding);
 *              PDF ≤ 10 pages, not encrypted, no JavaScript, launch actions, embedded files or forms.
 *   clean      images are rebuilt from their image data only: every metadata segment (EXIF incl. GPS,
 *              XMP, ICC, comments, text chunks) and anything after the end marker (polyglot payloads)
 *              is dropped. PDFs are kept byte-for-byte after the checks (rendering to images needs a
 *              PDF renderer: follow-up, handoff).
 *
 * Full re-encoding (decode → encode) needs a native image library (sharp/libvips); this rebuild is the
 * dependency-free equivalent for metadata and appended payloads. ADR-013 records the trade-off.
 */
import { AI_UPLOADS, type AiUploadContentType } from '@soyl/shared/config/ai-actions';

export type SniffedType = AiUploadContentType;

export class UploadRejectedError extends Error {
  constructor(readonly reason: UploadRejectReason, detail?: string) {
    super(detail ?? reason);
    this.name = 'UploadRejectedError';
  }
}

export type UploadRejectReason =
  | 'empty'
  | 'too_large'
  | 'unsupported_type'
  | 'type_mismatch'
  | 'too_many_pixels'
  | 'too_many_pages'
  | 'unsafe_pdf'
  | 'corrupt';

export function sniff(buf: Buffer): SniffedType | null {
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'image/jpeg';
  if (buf.length >= 8 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return 'image/png';
  if (buf.length >= 12 && buf.toString('latin1', 0, 4) === 'RIFF' && buf.toString('latin1', 8, 12) === 'WEBP') return 'image/webp';
  if (buf.length >= 5 && buf.toString('latin1', 0, 5) === '%PDF-') return 'application/pdf';
  return null;
}

/* ---------------------------------------------------------------------------------------------- */
/* Image headers                                                                                   */
/* ---------------------------------------------------------------------------------------------- */

export interface Dimensions {
  width: number;
  height: number;
}

const SOF_MARKERS = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]);

interface JpegSegment {
  marker: number;
  start: number;
  end: number;
}

/** JPEG segments up to and including SOS; returns the scan data start. Throws on corrupt structure. */
function jpegSegments(buf: Buffer): { segments: JpegSegment[]; scanStart: number } {
  const segments: JpegSegment[] = [];
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) throw new UploadRejectedError('corrupt', 'jpeg: expected a marker');
    let marker = buf[i + 1]!;
    while (marker === 0xff && i + 2 < buf.length) {
      i++;
      marker = buf[i + 1]!;
    }
    if (marker === 0xd8 || (marker >= 0xd0 && marker <= 0xd7) || marker === 0x01) {
      i += 2;
      continue;
    }
    if (i + 4 > buf.length) throw new UploadRejectedError('corrupt', 'jpeg: truncated');
    const len = buf.readUInt16BE(i + 2);
    if (len < 2 || i + 2 + len > buf.length) throw new UploadRejectedError('corrupt', 'jpeg: bad segment length');
    segments.push({ marker, start: i, end: i + 2 + len });
    if (marker === 0xda) return { segments, scanStart: i + 2 + len };
    i += 2 + len;
  }
  throw new UploadRejectedError('corrupt', 'jpeg: no image data');
}

export function imageDimensions(type: SniffedType, buf: Buffer): Dimensions {
  if (type === 'image/png') {
    if (buf.length < 24 || buf.toString('latin1', 12, 16) !== 'IHDR') throw new UploadRejectedError('corrupt', 'png: no IHDR');
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  if (type === 'image/jpeg') {
    const { segments } = jpegSegments(buf);
    const sof = segments.find((s) => SOF_MARKERS.has(s.marker));
    if (!sof) throw new UploadRejectedError('corrupt', 'jpeg: no frame header');
    return { height: buf.readUInt16BE(sof.start + 5), width: buf.readUInt16BE(sof.start + 7) };
  }
  if (type === 'image/webp') {
    const chunk = buf.toString('latin1', 12, 16);
    if (chunk === 'VP8X' && buf.length >= 30) return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
    if (chunk === 'VP8 ' && buf.length >= 30) return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    if (chunk === 'VP8L' && buf.length >= 25) {
      const b = buf.readUInt32LE(21);
      return { width: 1 + (b & 0x3fff), height: 1 + ((b >> 14) & 0x3fff) };
    }
    throw new UploadRejectedError('corrupt', 'webp: unknown chunk');
  }
  throw new UploadRejectedError('unsupported_type');
}

/* ---------------------------------------------------------------------------------------------- */
/* Metadata stripping                                                                              */
/* ---------------------------------------------------------------------------------------------- */

/** JPEG: keep frame/table/scan segments only (no APPn, COM); cut everything after EOI. */
export function cleanJpeg(buf: Buffer): Buffer {
  const { segments, scanStart } = jpegSegments(buf);
  const keep = segments.filter((s) => !(s.marker >= 0xe0 && s.marker <= 0xef) && s.marker !== 0xfe);
  // Scan data runs to EOI (FF D9 not followed by a stuffed 00 or a restart marker).
  let end = -1;
  for (let i = scanStart; i < buf.length - 1; i++) {
    if (buf[i] === 0xff && buf[i + 1] === 0xd9) {
      end = i + 2;
      break;
    }
  }
  if (end < 0) throw new UploadRejectedError('corrupt', 'jpeg: no end marker');
  return Buffer.concat([Buffer.from([0xff, 0xd8]), ...keep.map((s) => buf.subarray(s.start, s.end)), buf.subarray(scanStart, end)]);
}

const PNG_KEEP = new Set(['IHDR', 'PLTE', 'IDAT', 'IEND', 'tRNS', 'gAMA', 'sRGB', 'cHRM', 'sBIT', 'pHYs', 'acTL', 'fcTL', 'fdAT']);

/** PNG: keep image chunks only (no tEXt/zTXt/iTXt/eXIf/tIME/iCCP …); cut everything after IEND. */
export function cleanPng(buf: Buffer): Buffer {
  const parts: Buffer[] = [buf.subarray(0, 8)];
  let i = 8;
  let ended = false;
  while (i + 12 <= buf.length) {
    const len = buf.readUInt32BE(i);
    const type = buf.toString('latin1', i + 4, i + 8);
    const end = i + 12 + len;
    if (end > buf.length) throw new UploadRejectedError('corrupt', 'png: truncated chunk');
    if (PNG_KEEP.has(type)) parts.push(buf.subarray(i, end));
    i = end;
    if (type === 'IEND') {
      ended = true;
      break;
    }
  }
  if (!ended) throw new UploadRejectedError('corrupt', 'png: no IEND');
  return Buffer.concat(parts);
}

const WEBP_KEEP = new Set(['VP8 ', 'VP8L', 'VP8X', 'ALPH', 'ANIM', 'ANMF']);

/** WebP: drop EXIF/XMP/ICCP chunks and clear their VP8X flags; rebuild the RIFF size. */
export function cleanWebp(buf: Buffer): Buffer {
  const riffEnd = Math.min(buf.length, 8 + buf.readUInt32LE(4));
  const parts: Buffer[] = [];
  let i = 12;
  while (i + 8 <= riffEnd) {
    const type = buf.toString('latin1', i, i + 4);
    const len = buf.readUInt32LE(i + 4);
    const end = i + 8 + len + (len % 2);
    if (i + 8 + len > riffEnd) throw new UploadRejectedError('corrupt', 'webp: truncated chunk');
    if (WEBP_KEEP.has(type)) {
      const chunk = Buffer.from(buf.subarray(i, Math.min(end, riffEnd)));
      if (type === 'VP8X') chunk[8] = chunk[8]! & ~(0x20 | 0x08 | 0x04); // ICC, EXIF, XMP flags
      parts.push(chunk);
    }
    i = end;
  }
  const body = Buffer.concat(parts);
  const header = Buffer.alloc(12);
  header.write('RIFF', 0, 'latin1');
  header.writeUInt32LE(body.length + 4, 4);
  header.write('WEBP', 8, 'latin1');
  return Buffer.concat([header, body]);
}

/* ---------------------------------------------------------------------------------------------- */
/* PDF                                                                                             */
/* ---------------------------------------------------------------------------------------------- */

export function pdfPageCount(buf: Buffer): number {
  const text = buf.toString('latin1');
  return (text.match(/\/Type\s*\/Page(?![s\w])/g) ?? []).length;
}

const UNSAFE_PDF = /\/(JavaScript|JS|Launch|EmbeddedFile|EmbeddedFiles|RichMedia|XFA|AcroForm|SubmitForm|ImportData|GoToR|GoToE)\b/;

export function checkPdf(buf: Buffer): { pages: number } {
  const text = buf.toString('latin1');
  if (/\/Encrypt\b/.test(text)) throw new UploadRejectedError('unsafe_pdf', 'encrypted PDF');
  if (UNSAFE_PDF.test(text)) throw new UploadRejectedError('unsafe_pdf', 'active content in PDF');
  // Compressed object streams can hide page objects from the scan: count the page tree as a floor.
  const pages = pdfPageCount(buf);
  const declared = Math.max(0, ...[...text.matchAll(/\/Type\s*\/Pages\b[^>]*?\/Count\s+(\d+)/g)].map((m) => Number(m[1])));
  const n = Math.max(pages, declared);
  if (n === 0) throw new UploadRejectedError('corrupt', 'no pages');
  if (n > AI_UPLOADS.maxPdfPages) throw new UploadRejectedError('too_many_pages', `${n} pages`);
  return { pages: n };
}

/* ---------------------------------------------------------------------------------------------- */
/* Pipeline                                                                                        */
/* ---------------------------------------------------------------------------------------------- */

export interface CleanedUpload {
  type: SniffedType;
  data: Buffer;
  bytes: number;
  pages: number | null;
  dimensions: Dimensions | null;
}

export function validateAndClean(buf: Buffer, declaredType: string): CleanedUpload {
  if (!buf.length) throw new UploadRejectedError('empty');
  if (buf.length > AI_UPLOADS.maxBytes) throw new UploadRejectedError('too_large');
  const type = sniff(buf);
  if (!type) throw new UploadRejectedError('unsupported_type');
  if (type !== declaredType) throw new UploadRejectedError('type_mismatch', `declared ${declaredType}, content is ${type}`);
  if (type === 'application/pdf') {
    const { pages } = checkPdf(buf);
    return { type, data: buf, bytes: buf.length, pages, dimensions: null };
  }
  const dims = imageDimensions(type, buf);
  if (!dims.width || !dims.height) throw new UploadRejectedError('corrupt', 'zero-size image');
  if (dims.width * dims.height > AI_UPLOADS.maxPixels) throw new UploadRejectedError('too_many_pixels');
  const data = type === 'image/jpeg' ? cleanJpeg(buf) : type === 'image/png' ? cleanPng(buf) : cleanWebp(buf);
  return { type, data, bytes: data.length, pages: null, dimensions: dims };
}

export const EXTENSION: Record<SniffedType, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'application/pdf': 'pdf' };
