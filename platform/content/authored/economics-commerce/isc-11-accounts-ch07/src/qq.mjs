// Registration helpers for the ISC 11 Accounts ch07 bank: a marking scheme must add up to the item's marks and every
// step is a whole number of marks (ISC awards step marks).
import { Q, num } from './lib.mjs';
import { check, same, sum, rs } from './tb.mjs';

export const UNIT = 'isc-11-accounts-ch07';
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
/** "Cash ₹14,500; Sales ₹6,25,000; ..." for a stem. */
export const lst = (items) => items.map(([n, a]) => `${n} ${rs(a)}`).join('; ');
