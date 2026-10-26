/**
 * Minimal Ogg Opus writer (RFC 7845 encapsulation of RFC 6716 packets) that produces silence of a
 * given duration, plus a page walker used by tests and to measure real synthesised audio.
 *
 * The silent packet is `[0xF8, 0xFF, 0xFE]`:
 * - TOC byte 0xF8 = 0b11111_0_00 (RFC 6716 §3.1): config 31 = CELT-only, fullband, 20 ms frame;
 *   s = 0 (mono); c = 0 (code 0: exactly one frame in the packet). The frame is the 2 bytes that follow.
 * - The CELT decoder's first range-coded symbol is the silence flag, decoded with
 *   ec_dec_bit_logp(15) (RFC 6716 §4.3, Table 56: "silence {32767, 1}/32768"). The range decoder
 *   (§4.1.1) starts with rng = 128, val = 127 - (b0 >> 1) = 0 and normalises (§4.1.2) by shifting in
 *   255 - sym, sym = (previous byte's low bit << 7 | next byte >> 1), reading zeros past the end:
 *   0xFE → sym 0xFF → val 0; end → sym 0 → val 255; end → val 65535, with rng = 2^31. Then
 *   ec_dec_bit_logp(15) computes s = rng >> 15 = 65536 and returns val < s = 1: silence. With the
 *   flag set the decoder skips every remaining symbol and outputs
 *   zero energy in all bands → digital silence. A 2-byte frame is required: a frame of 0 or 1 byte
 *   is treated as a lost packet (PLC) instead. This is the well-known "Opus silence frame" used by
 *   e.g. WebRTC/Discord comfort-noise paths.
 *
 * Granule positions are in 48 kHz samples and include the pre-skip (RFC 7845 §4): playback length
 * = (last granule - pre-skip) / 48000. The last page's granule is set to exactly
 * pre-skip + duration samples, which trims the final packet (end trimming, RFC 7845 §4.4).
 */

export const OPUS_SILENT_PACKET: readonly number[] = [0xf8, 0xff, 0xfe];
export const OPUS_PRE_SKIP = 312;
export const OPUS_RATE = 48_000;
/** 20 ms at 48 kHz. */
const SAMPLES_PER_PACKET = 960;
/** 50 packets = 1 s per page: small pages keep seeking cheap; well under the 255-segment limit. */
const PACKETS_PER_PAGE = 50;
const DEFAULT_SERIAL = 0x534f594c; // "SOYL": fixed so the mock output is deterministic.
const VENDOR = 'soyl-content-pipeline silence';

const FLAG_CONTINUED = 0x01;
const FLAG_BOS = 0x02;
const FLAG_EOS = 0x04;

// ---- CRC-32 as used by Ogg: polynomial 0x04c11db7, MSB-first (no reflection), init 0, no final xor.
const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let r = i << 24;
    for (let j = 0; j < 8; j++) r = r & 0x80000000 ? (r << 1) ^ 0x04c11db7 : r << 1;
    table[i] = r >>> 0;
  }
  return table;
})();

export function oggCrc32(bytes: Uint8Array): number {
  let crc = 0;
  for (let i = 0; i < bytes.length; i++) crc = ((crc << 8) ^ CRC_TABLE[((crc >>> 24) ^ bytes[i]!) & 0xff]!) >>> 0;
  return crc >>> 0;
}

/** One Ogg page holding whole packets only (each < 255 bytes × 255 segments, which is all we write). */
function oggPage(opts: { packets: Uint8Array[]; granule: bigint; serial: number; sequence: number; flags: number }): Uint8Array {
  const lacing: number[] = [];
  for (const p of opts.packets) {
    let n = p.length;
    while (n >= 255) {
      lacing.push(255);
      n -= 255;
    }
    lacing.push(n); // a packet whose length is a multiple of 255 ends with a 0 lacing value
  }
  if (lacing.length > 255) throw new Error(`oggPage: ${lacing.length} segments (max 255)`);
  const bodyLength = opts.packets.reduce((n, p) => n + p.length, 0);
  const page = new Uint8Array(27 + lacing.length + bodyLength);
  const view = new DataView(page.buffer);
  page.set([0x4f, 0x67, 0x67, 0x53], 0); // "OggS"
  page[4] = 0; // stream structure version
  page[5] = opts.flags;
  view.setBigInt64(6, opts.granule, true);
  view.setUint32(14, opts.serial >>> 0, true);
  view.setUint32(18, opts.sequence >>> 0, true);
  view.setUint32(22, 0, true); // CRC placeholder: computed over the page with this field zeroed
  page[26] = lacing.length;
  page.set(lacing, 27);
  let offset = 27 + lacing.length;
  for (const p of opts.packets) {
    page.set(p, offset);
    offset += p.length;
  }
  view.setUint32(22, oggCrc32(page), true);
  return page;
}

function opusHead(preSkip: number): Uint8Array {
  const head = new Uint8Array(19);
  const view = new DataView(head.buffer);
  head.set(new TextEncoder().encode('OpusHead'), 0);
  head[8] = 1; // version
  head[9] = 1; // channel count
  view.setUint16(10, preSkip, true);
  view.setUint32(12, OPUS_RATE, true); // input sample rate (informational)
  view.setInt16(16, 0, true); // output gain
  head[18] = 0; // channel mapping family 0 (mono/stereo, no mapping table)
  return head;
}

function opusTags(vendor: string): Uint8Array {
  const v = new TextEncoder().encode(vendor);
  const tags = new Uint8Array(8 + 4 + v.length + 4);
  const view = new DataView(tags.buffer);
  tags.set(new TextEncoder().encode('OpusTags'), 0);
  view.setUint32(8, v.length, true);
  tags.set(v, 12);
  view.setUint32(12 + v.length, 0, true); // no user comments
  return tags;
}

export interface OggOpusSilenceOptions {
  serial?: number;
  vendor?: string;
}

/** A valid mono Ogg Opus file of `durationMs` of silence (rounded to whole 48 kHz samples). */
export function oggOpusSilence(durationMs: number, opts: OggOpusSilenceOptions = {}): Uint8Array<ArrayBuffer> {
  if (!Number.isFinite(durationMs) || durationMs <= 0) throw new Error(`oggOpusSilence: duration must be > 0 ms (got ${durationMs})`);
  const serial = opts.serial ?? DEFAULT_SERIAL;
  const durationSamples = Math.max(1, Math.round((durationMs * OPUS_RATE) / 1000));
  const finalGranule = OPUS_PRE_SKIP + durationSamples;
  // Decode enough packets to cover the pre-skip plus the requested duration; the final granule trims the excess.
  const packetCount = Math.ceil(finalGranule / SAMPLES_PER_PACKET);
  const packet = Uint8Array.from(OPUS_SILENT_PACKET);

  const pages: Uint8Array[] = [];
  let sequence = 0;
  pages.push(oggPage({ packets: [opusHead(OPUS_PRE_SKIP)], granule: 0n, serial, sequence: sequence++, flags: FLAG_BOS }));
  pages.push(oggPage({ packets: [opusTags(opts.vendor ?? VENDOR)], granule: 0n, serial, sequence: sequence++, flags: 0 }));
  for (let written = 0; written < packetCount; ) {
    const n = Math.min(PACKETS_PER_PAGE, packetCount - written);
    written += n;
    const last = written === packetCount;
    pages.push(
      oggPage({
        packets: Array.from({ length: n }, () => packet),
        granule: BigInt(last ? finalGranule : written * SAMPLES_PER_PACKET),
        serial,
        sequence: sequence++,
        flags: last ? FLAG_EOS : 0,
      }),
    );
  }
  const out = new Uint8Array(pages.reduce((n, p) => n + p.length, 0));
  let offset = 0;
  for (const p of pages) {
    out.set(p, offset);
    offset += p.length;
  }
  return out;
}

export interface OggPage {
  offset: number;
  version: number;
  flags: number;
  bos: boolean;
  eos: boolean;
  continued: boolean;
  /** -1 when no packet ends on this page. */
  granule: number;
  serial: number;
  sequence: number;
  crc: number;
  segments: number[];
  body: Uint8Array;
}

export interface ParsedOgg {
  pages: OggPage[];
  /** Complete packets, reassembled across pages (single logical stream assumed). */
  packets: Uint8Array[];
  /** Granule position of the last page that has one (48 kHz samples incl. pre-skip for Opus). */
  granule: number;
}

/** Walks every page, verifying the capture pattern, version and CRC. Throws on any defect. */
export function parseOgg(bytes: Uint8Array): ParsedOgg {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const pages: OggPage[] = [];
  const packets: Uint8Array[] = [];
  let pending: Uint8Array[] = [];
  let granule = -1;
  let offset = 0;
  while (offset < bytes.length) {
    if (bytes.length - offset < 27) throw new Error(`parseOgg: truncated page header at ${offset}`);
    if (bytes[offset] !== 0x4f || bytes[offset + 1] !== 0x67 || bytes[offset + 2] !== 0x67 || bytes[offset + 3] !== 0x53)
      throw new Error(`parseOgg: missing "OggS" capture pattern at ${offset}`);
    const version = bytes[offset + 4]!;
    if (version !== 0) throw new Error(`parseOgg: unsupported stream structure version ${version} at ${offset}`);
    const flags = bytes[offset + 5]!;
    const nseg = bytes[offset + 26]!;
    const headerLength = 27 + nseg;
    if (bytes.length - offset < headerLength) throw new Error(`parseOgg: truncated segment table at ${offset}`);
    const segments = Array.from(bytes.subarray(offset + 27, offset + headerLength));
    const bodyLength = segments.reduce((n, s) => n + s, 0);
    const end = offset + headerLength + bodyLength;
    if (end > bytes.length) throw new Error(`parseOgg: truncated page body at ${offset}`);
    const crc = view.getUint32(offset + 22, true);
    const copy = bytes.slice(offset, end);
    copy.fill(0, 22, 26);
    const actual = oggCrc32(copy);
    if (actual !== crc) throw new Error(`parseOgg: CRC mismatch at ${offset} (stored ${crc.toString(16)}, computed ${actual.toString(16)})`);
    const pageGranule = Number(view.getBigInt64(offset + 6, true));
    const body = bytes.subarray(offset + headerLength, end);
    pages.push({
      offset,
      version,
      flags,
      bos: (flags & FLAG_BOS) !== 0,
      eos: (flags & FLAG_EOS) !== 0,
      continued: (flags & FLAG_CONTINUED) !== 0,
      granule: pageGranule,
      serial: view.getUint32(offset + 14, true),
      sequence: view.getUint32(offset + 18, true),
      crc,
      segments,
      body,
    });
    let pos = 0;
    for (const seg of segments) {
      pending.push(body.subarray(pos, pos + seg));
      pos += seg;
      if (seg < 255) {
        const size = pending.reduce((n, p) => n + p.length, 0);
        const packet = new Uint8Array(size);
        let o = 0;
        for (const part of pending) {
          packet.set(part, o);
          o += part.length;
        }
        packets.push(packet);
        pending = [];
      }
    }
    if (pageGranule !== -1) granule = pageGranule;
    offset = end;
  }
  if (!pages.length) throw new Error('parseOgg: no pages');
  return { pages, packets, granule };
}

/** Pre-skip from an OpusHead packet, or null when `packet` is not one. */
export function opusPreSkip(packet: Uint8Array | undefined): number | null {
  if (!packet || packet.length < 19) return null;
  if (new TextDecoder().decode(packet.subarray(0, 8)) !== 'OpusHead') return null;
  return new DataView(packet.buffer, packet.byteOffset, packet.byteLength).getUint16(10, true);
}

/** Playback length of an Ogg Opus file in ms, or null when it is not valid Ogg Opus. */
export function oggOpusDurationMs(bytes: Uint8Array): number | null {
  try {
    const ogg = parseOgg(bytes);
    const preSkip = opusPreSkip(ogg.packets[0]);
    if (preSkip === null || ogg.granule <= preSkip) return null;
    return Math.round(((ogg.granule - preSkip) * 1000) / OPUS_RATE);
  } catch {
    return null;
  }
}
