// Registration helpers for the ISC 11 Accounts ch05 bank: a marking scheme must add up to the item's marks and every
// step is a whole number of marks (ISC awards step marks).
import { Q, num } from './lib.mjs';
import { check, same, sum, rs } from './fig.mjs';

export const UNIT = 'isc-11-accounts-ch05';
/** Every registered item's key and stem, for the build's near-duplicate check. */
export const BANK = [];
export function QQ(key, q) {
  for (const s of q.marking_scheme) check(Number.isInteger(s.marks) && s.marks > 0, `marking step of ${key} is not a whole number: ${s.marks}`);
  same(sum(q.marking_scheme.map((s) => s.marks)), q.marks, `marking scheme of ${key}`);
  BANK.push({ id: key, unit: UNIT, text: q.stem_md });
  return Q(key, q);
}
/** Numerical item with a rupee key. */
export const numQ = (o) => num({ ...o, unit: '₹', scheme: [[`Correct answer: ${rs(o.value)}`, o.marks ?? 1]] });
export const S2 = [30, 60];
export const S3 = [50, 90];
export const L5 = [80, 160];
