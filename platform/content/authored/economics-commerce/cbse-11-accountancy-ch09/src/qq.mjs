// Registration helpers for the ch09 question bank: a marking scheme must add up to the item's marks.
import { Q, num } from '../../cbse-11-accountancy-ch01/src/lib.mjs';
import { same, sum, rs } from './figures.mjs';

/** Every registered item's key and stem, for the build's near-duplicate check. */
export const BANK = [];
export function QQ(key, q) {
  same(sum(q.marking_scheme.map((s) => s.marks)), q.marks, `marking scheme of ${key}`);
  BANK.push({ id: key, unit: 'cbse-11-accountancy-ch09', text: q.stem_md });
  return Q(key, q);
}
/** Numerical item with a rupee key. */
export const numQ = (o) => num({ ...o, scheme: [[`Correct answer: ${rs(o.value)}`, o.marks ?? 1]] });
export const S2 = [30, 50];
export const S3 = [50, 80];
export const L5 = [80, 120];
