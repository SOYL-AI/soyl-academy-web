/**
 * UUID v7 (RFC 9562): 48-bit Unix-ms timestamp + random bits. Time-ordered, so B-tree inserts stay
 * local and ids sort by creation time. Generated in app code so ids are known before insert; the
 * database default `uuid_generate_v7()` (migration 0000) covers raw SQL inserts. ADR-004.
 *
 * Not secret: a v7 id leaks its creation time (F-026). Authorisation never relies on id secrecy (API-7).
 */
export function uuidv7(now: number = Date.now()): string {
  const bytes = new Uint8Array(16);
  globalThis.crypto.getRandomValues(bytes);
  let ms = now;
  for (let i = 5; i >= 0; i--) {
    bytes[i] = ms % 256;
    ms = Math.floor(ms / 256);
  }
  bytes[6] = (bytes[6]! & 0x0f) | 0x70; // version 7
  bytes[8] = (bytes[8]! & 0x3f) | 0x80; // variant 10
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

/** Milliseconds since epoch encoded in a v7 id. */
export function uuidv7Time(id: string): number {
  return parseInt(id.replace(/-/g, '').slice(0, 12), 16);
}

const IST_OFFSET_MS = 330 * 60 * 1000;

/**
 * The IST calendar day (YYYY-MM-DD) of an instant. Timestamps are stored in UTC; credit grants,
 * streaks and XP are bucketed by IST day (GEN-6, CONTEXT §6 "reset at 00:00 IST").
 */
export function istDay(at: Date = new Date()): string {
  return new Date(at.getTime() + IST_OFFSET_MS).toISOString().slice(0, 10);
}
