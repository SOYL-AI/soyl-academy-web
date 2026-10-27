/**
 * Server-authoritative timer (backend-api M3 handoff §3, AC-12). The client clock is display only:
 *   offset = Date.parse(serverNow) − Date.now()   (refreshed from every attempt / autosave reply)
 *   remaining = deadlineAt − (Date.now() + offset)
 */
export function clockOffset(serverNow: string, localNow: number = Date.now()): number {
  const t = Date.parse(serverNow);
  return Number.isFinite(t) ? t - localNow : 0;
}

export function remainingMs(deadlineAt: string | null, offset: number, localNow: number = Date.now()): number | null {
  if (!deadlineAt) return null;
  const d = Date.parse(deadlineAt);
  return Number.isFinite(d) ? d - (localNow + offset) : null;
}

/** "1:05:09", "04:59", "00:00". */
export function formatClock(ms: number): string {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const mm = String(m).padStart(2, '0');
  const ss = String(s).padStart(2, '0');
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

/** Spoken form for screen readers: "1 hour 5 minutes", "4 minutes", "40 seconds". */
export function spokenTime(ms: number): string {
  const total = Math.max(0, Math.ceil(ms / 1000));
  if (total < 60) return `${total} second${total === 1 ? '' : 's'}`;
  const minutes = Math.ceil(total / 60);
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const parts: string[] = [];
  if (h) parts.push(`${h} hour${h === 1 ? '' : 's'}`);
  if (m) parts.push(`${m} minute${m === 1 ? '' : 's'}`);
  return parts.join(' ');
}

/** Moments the timer announces politely (ms remaining): 10, 5 and 1 minute. */
export const ANNOUNCE_AT_MS = [10 * 60_000, 5 * 60_000, 60_000] as const;

/** Duration text for cards: "45 min", "3 h", "1 h 30 min". */
export function durationText(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}

/** IST date-time for event times ("Sun, 13 Dec, 10:00 am IST"). */
export function istDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return `${d.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', hour12: true })} IST`;
}

/** Countdown text for live events: "2 d 4 h", "3 h 12 min", "12 min", "45 s". */
export function countdownText(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(s / 86_400);
  const h = Math.floor((s % 86_400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (d > 0) return `${d} d ${h} h`;
  if (h > 0) return `${h} h ${m} min`;
  if (m > 0) return `${m} min`;
  return `${s} s`;
}
