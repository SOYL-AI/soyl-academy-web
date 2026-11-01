// Computed values for ICSE 10 Biology ch05 Photosynthesis (equation atom counts, imagined hydrilla readings).
const r1 = (x) => Math.round(x * 10) / 10;
export const pct = (part, whole) => r1((part / whole) * 100);

/** Overall equation as written in ICSE: 6CO2 + 12H2O -> C6H12O6 + 6O2 + 6H2O. Atom counts on each side. */
export const EQ = {
  left: { C: 6 * 1, H: 12 * 2, O: 6 * 2 + 12 * 1 },
  right: { C: 6, H: 12 + 6 * 2, O: 6 + 6 * 2 + 6 * 1 },
  co2: 6, waterIn: 12, glucose: 1, o2: 6, waterOut: 6,
};
EQ.balanced = ['C', 'H', 'O'].every((k) => EQ.left[k] === EQ.right[k]);

/** Imagined hydrilla experiment: bubbles counted in 5 minutes with a lamp at different distances. */
export const HYD = {
  minutes: 5,
  rows: [
    { cm: 10, n: 200 },
    { cm: 20, n: 110 },
    { cm: 30, n: 65 },
    { cm: 40, n: 40 },
  ],
  bicarb: { cm: 20, n: 165 },
};
for (const r of HYD.rows) r.rate = r1(r.n / HYD.minutes);
HYD.bicarb.rate = r1(HYD.bicarb.n / HYD.minutes);
HYD.base20 = HYD.rows.find((r) => r.cm === 20).rate;
HYD.bicarbRise = r1(HYD.bicarb.rate - HYD.base20);
HYD.bicarbPct = pct(HYD.bicarbRise, HYD.base20);
HYD.nearFar = r1(HYD.rows[0].rate / HYD.rows[3].rate);

if (!EQ.balanced || EQ.left.O !== 24 || HYD.rows[0].rate !== 40 || HYD.base20 !== 22 || HYD.bicarb.rate !== 33 || HYD.bicarbPct !== 50 || HYD.nearFar !== 5) throw new Error('calc');
