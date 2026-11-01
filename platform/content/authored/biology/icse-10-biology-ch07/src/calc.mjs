// Computed values for ICSE 10 Biology ch07 (blood volumes, differential counts, blood-group compatibility).
export const pct = (part, whole, dp = 1) => Math.round((part / whole) * 100 * 10 ** dp) / 10 ** dp;
const r2 = (x) => Math.round(x * 100) / 100;

// Blood of an adult: total volume (litres) and share of plasma (%).
export const BLOOD = { litres: 5, plasmaPct: 55 };
BLOOD.plasma = r2((BLOOD.litres * BLOOD.plasmaPct) / 100);
BLOOD.cells = r2(BLOOD.litres - BLOOD.plasma);

// Imagined differential count: white cells of each kind in a stained smear.
export const DIFF = { neutrophils: 124, lymphocytes: 56, monocytes: 10, eosinophils: 8, basophils: 2 };
DIFF.total = Object.values(DIFF).reduce((a, b) => a + b, 0);
DIFF.pct = Object.fromEntries(Object.entries(DIFF).filter(([k]) => k !== 'total').map(([k, v]) => [k, pct(v, DIFF.total)]));

// Imagined blood report of a patient, with the laboratory's normal ranges.
export const REPORT = { rbc: 3.1, rbcRange: [4.5, 5.5], hb: 8, hbRange: [13, 17], wbc: 16500, wbcRange: [4000, 11000], plt: 2.6, pltRange: [1.5, 4.5] };
REPORT.rbcShort = Math.round((REPORT.rbcRange[0] - REPORT.rbc) * 10) / 10;
REPORT.wbcExcess = REPORT.wbc - REPORT.wbcRange[1];

// Red cell lifespan (days) and the share of red cells replaced each day.
export const RBC_LIFE = 120;
export const replacedPerDayPct = pct(1, RBC_LIFE, 2);

// ABO and Rh compatibility from antigens: donor red cells must carry no antigen the recipient lacks.
const ANTIGENS = { A: ['A'], B: ['B'], AB: ['A', 'B'], O: [] };
export const antibodies = (g) => ['A', 'B'].filter((x) => !ANTIGENS[g].includes(x)).map((x) => `anti-${x}`);
export const canGive = (donor, recipient) => ANTIGENS[donor].every((x) => ANTIGENS[recipient].includes(x));
/** With Rh: an Rh-negative recipient must receive Rh-negative blood. */
export const canGiveRh = (donor, dRh, recipient, rRh) => canGive(donor, recipient) && (rRh === '+' || dRh === '-');
export const GROUPS = ['A', 'B', 'AB', 'O'];
export const donorsFor = (recipient) => GROUPS.filter((d) => canGive(d, recipient));
export const recipientsOf = (donor) => GROUPS.filter((r) => canGive(donor, r));

if (BLOOD.plasma !== 2.75 || BLOOD.cells !== 2.25 || DIFF.total !== 200 || DIFF.pct.neutrophils !== 62 || DIFF.pct.lymphocytes !== 28 || donorsFor('AB').length !== 4 || recipientsOf('O').length !== 4 || canGive('A', 'B') || !canGiveRh('O', '-', 'A', '-') || canGiveRh('O', '+', 'A', '-') || replacedPerDayPct !== 0.83 || REPORT.rbcShort !== 1.4 || REPORT.wbcExcess !== 5500) throw new Error('calc');
