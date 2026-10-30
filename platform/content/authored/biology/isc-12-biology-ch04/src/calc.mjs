// Rules for ch03, used for worked-example numbers, diagrams and re-solves.

/** Constant-rate growth: points every 5 years, and the doubling time ln 2 / ln(1 + r) rounded to whole years. */
export function doublingSeries(p0, ratePct, years) {
  const g = 1 + ratePct / 100;
  const points = [];
  for (let t = 0; t <= years; t += 5) points.push([t, p0 * g ** t]);
  return { points, doubling: Math.round(Math.log(2) / Math.log(g)), exact: Math.log(2) / Math.log(g) };
}
export const grow = (p0, ratePct, years) => p0 * (1 + ratePct / 100) ** years;

/** Periodic abstinence: ovulation about 14 days before the next period; avoid 4 days before to 3 days after it. */
export function fertileWindow(cycle) {
  const ov = cycle - 14;
  return { ovulation: ov, from: ov - 4, to: ov + 3, days: 8 };
}

/** Embryo transfer: zygote or early embryo with up to 8 blastomeres → ZIFT (oviduct); more than 8 → IUT (uterus). */
export const transferRoute = (blastomeres) => (blastomeres <= 8 ? 'ZIFT' : 'IUT');

/** Oral pill schedule: pills for `on` days, then a gap of `off` days. */
export const pillCycle = (on = 21, off = 7) => ({ on, off, cycle: on + off });
