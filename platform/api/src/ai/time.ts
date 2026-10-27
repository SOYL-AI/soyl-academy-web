/** IST calendar helpers for credits (CONTEXT §6: reset at 00:00 IST; GEN-6: storage in UTC). */
import { istDay } from '@soyl/db/ids';

export { istDay };

const IST_OFFSET_MS = 330 * 60_000;
const DAY_MS = 86_400_000;

/** The instant of the next 00:00 IST strictly after `at`. */
export function nextIstMidnight(at: Date): Date {
  const ist = at.getTime() + IST_OFFSET_MS;
  const startOfIstDay = Math.floor(ist / DAY_MS) * DAY_MS;
  return new Date(startOfIstDay + DAY_MS - IST_OFFSET_MS);
}

/** The instant 00:00 IST of the IST day containing `at`. */
export function istDayStart(at: Date): Date {
  return new Date(nextIstMidnight(at).getTime() - DAY_MS);
}

export function secondsUntil(target: Date, now: Date): number {
  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / 1000));
}
