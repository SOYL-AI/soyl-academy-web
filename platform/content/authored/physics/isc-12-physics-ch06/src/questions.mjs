// ISC 12 Physics ch06 Cells, Kirchhoff's Laws, Bridges and Potentiometer — question bank (ISC style).
// Numbers computed here and re-solved in the check callbacks.
import { mk, add, r, dec, near } from '../../isc-12-physics-ch01/src/lib.mjs';

const { mcq, ar, tf, fill, num, short, long } = mk;
/** Node potential of three branches joined between X (top) and Y (bottom, 0 V): [emf, resistance] each, emf + towards X. */
const node = (branches) => branches.reduce((s, [E, R]) => s + E / R, 0) / branches.reduce((s, [, R]) => s + 1 / R, 0);

// ================================================================ t01 emf, internal resistance, terminal p.d.
add('emfdef-mcq', mcq({
  stem: 'The emf of a cell is best described as',
  right: 'the work done by the cell per unit charge in taking charge once round the complete circuit',
  wrong: ['the force with which the cell pushes electrons round the circuit', 'the potential difference across its terminals while it supplies a large current', 'the total charge the cell can deliver before it runs down'],
  sol: 'Emf is energy supplied per coulomb (J C⁻¹ = V), not a force; it equals the terminal p.d. only when no current flows — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('emf-fill', fill({
  stem: 'When a cell supplies no current, an ideal voltmeter connected across its terminals reads the ___ of the cell.',
  acc: [['emf', 'e.m.f.', 'electromotive force']],
  sol: 'The **emf**: with I = 0 there are no lost volts, so V = E − Ir = E.',
  d: 1, c: 'recall', t: [1],
}));
const lv = { E: 9.0, I: 0.5, V: 8.2 };
lv.r = (lv.E - lv.V) / lv.I;
add('lostvolts-num', num({
  stem: 'A 9.0 V battery delivers 0.50 A to a radio, and its terminal potential difference is then 8.2 V. Find the internal resistance of the battery, in ohms.',
  value: Number(dec(lv.r, 2)), tol: 0.05, unit: 'Ω',
  sol: r`Lost volts $= E - V = 9.0 - 8.2 = 0.80$ V $= Ir$, so $r = \dfrac{0.80}{0.50} = ${dec(lv.r, 2)}$ Ω.`,
  scheme: [['r = (E − V)/I = 1.6 Ω', 1]],
  d: 2, c: 'application', t: [1],
}), (q) => near((9.0 - 8.2) / 0.5, q.answer.value) || 'lv');
const tv = { E: 12, r: 0.4, R: 5.6 };
tv.I = tv.E / (tv.R + tv.r);
tv.V = tv.E - tv.I * tv.r;
add('terminalV-num', num({
  stem: 'A 12 V battery of internal resistance 0.40 Ω lights a lamp of resistance 5.6 Ω. Find the potential difference across the terminals of the battery, in volts.',
  value: Number(dec(tv.V, 3)), tol: 0.05, unit: 'V',
  sol: r`$I = \dfrac{E}{R + r} = \dfrac{12}{5.6 + 0.40} = ${dec(tv.I, 2)}$ A; $V = E - Ir = 12 - ${dec(tv.I, 2)} \times 0.40 = ${dec(tv.V, 3)}$ V (check: $IR = ${dec(tv.I * tv.R, 3)}$ V).`,
  scheme: [['I = 2.0 A', 1], ['V = 11.2 V', 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(2.0 * 5.6, q.answer.value) || 'tv');
const tr = { R1: 4, I1: 0.4, R2: 9, I2: 0.2 };
tr.r = (tr.I2 * tr.R2 - tr.I1 * tr.R1) / (tr.I1 - tr.I2);
tr.E = tr.I1 * (tr.R1 + tr.r);
add('twoR-num', num({
  stem: 'A cell drives 0.40 A through a 4.0 Ω resistor and 0.20 A through a 9.0 Ω resistor. Find the emf of the cell, in volts.',
  value: Number(dec(tr.E, 2)), tol: 0.02, unit: 'V',
  sol: r`$E = 0.40(4.0 + r) = 0.20(9.0 + r)$, so $1.6 + 0.40r = 1.8 + 0.20r$, giving $r = ${dec(tr.r, 2)}$ Ω and $E = 0.40 \times 5.0 = ${dec(tr.E, 2)}$ V.`,
  scheme: [['Two equations E = I(R + r)', 1], ['r = 1.0 Ω, E = 2.0 V', 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => (near(0.4 * (4 + 1), q.answer.value) && near(0.2 * (9 + 1), q.answer.value)) || 'tr');
add('charging-mcq', mcq({
  stem: 'A charger drives a current of 8.0 A into a 12 V car battery of internal resistance 0.050 Ω (entering at its positive terminal). The potential difference across the battery terminals during charging is',
  right: '12.4 V',
  wrong: ['11.6 V', '12.0 V', '12.8 V'],
  sol: 'While charging, the charger must supply the emf plus the drop across r: V = E + Ir = 12 + 8.0 × 0.050 = 12.4 V — option (@K).',
  d: 2, c: 'application', t: [1],
}), () => near(12 + 8 * 0.05, 12.4) || 'ch');
add('shortcircuit-mcq', mcq({
  stem: 'A thick copper strip of negligible resistance joined across the terminals of a 1.5 V dry cell carries 3.0 A. The internal resistance of the cell is',
  right: '0.50 Ω',
  wrong: ['4.5 Ω', '2.0 Ω', 'zero'],
  sol: 'With R ≈ 0 only r limits the current: I = E/r, so r = 1.5/3.0 = 0.50 Ω — option (@K).',
  d: 2, c: 'application', t: [1],
}), () => near(1.5 / 3, 0.5) || 'sc');
add('Vgraph-ar', ar({
  a: 'For a cell supplying current to a variable resistor, the graph of its terminal potential difference against the current is a straight line sloping downwards.',
  r: 'The internal resistance of a cell increases in proportion to the current drawn from it.',
  key: 'c',
  sol: 'A is true: V = E − Ir with E and r constant, a line of slope −r. R is false: r is (nearly) constant — that is why the graph is straight — option (c).',
  d: 3, c: 'understanding', t: [1],
}));
add('emfpd-short', short({
  marks: 2,
  stem: 'Give two differences between the emf of a cell and the potential difference across its terminals while it supplies current.',
  model: '**Emf** is the energy the cell supplies per coulomb, fixed whatever the current. **Terminal p.d.** is the energy per coulomb delivered to the external circuit, $V = E - Ir$, so it falls as the current rises and is **less than the emf**, equal to it only on open circuit.',
  sol: 'Energy supplied versus delivered; V = E − Ir < E.',
  scheme: [['Emf: energy supplied per coulomb, independent of current', 1], ['Terminal p.d.: depends on I, V = E − Ir < E', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('energy-short3', short({
  marks: 3,
  stem: 'A cell of emf E and internal resistance r drives a steady current I through an external resistor R. Using conservation of energy, derive E = I(R + r), and hence write the terminal potential difference.',
  model: r`In time t a charge $q = It$ goes once round the circuit. The cell does work $W = Eq = EIt$ on it. This energy is dissipated as heat in R, $I^2Rt$, and in the cell’s own resistance, $I^2rt$. Energy conservation: $EIt = I^2Rt + I^2rt$, so $E = I(R + r)$. The terminal p.d. is the p.d. across R: $V = IR = E - Ir$.`,
  sol: 'Work by the cell equals heat in R and r.',
  scheme: [['Work by cell EIt for charge It', 1], ['Equated to I²Rt + I²rt: E = I(R + r)', 1], ['V = IR = E − Ir', 1]],
  d: 3, c: 'understanding', t: [1], wl: null,
}));
add('intRfactors-short', short({
  marks: 2,
  stem: 'State two factors on which the internal resistance of a cell depends. Why does a torch with old cells give a dim light although the cells still show nearly 1.5 V on a high-resistance voltmeter?',
  model: 'Internal resistance **increases** with the **separation of the electrodes** and **decreases** with the **area of the electrodes** in the electrolyte (it also falls as the electrolyte warms). An old cell has a **large r**: its emf is nearly unchanged, but on load the lost volts **Ir** are large, so the bulb gets a small terminal p.d.',
  sol: 'Factors; large r gives large lost volts on load.',
  scheme: [['Two factors (electrode separation, immersed area, temperature)', 1], ['Old cell: large r, so large Ir on load', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ================================================================ t02 grouping of cells
add('seriesN-mcq', mcq({
  stem: 'Five identical cells, each of emf E and internal resistance r, are joined in series and connected to an external resistance R. The current in R is',
  right: '5E/(R + 5r)',
  wrong: ['5E/(R + r)', 'E/(R + 5r)', '5E/(5R + r)'],
  sol: 'In series the emfs add (5E) and so do the internal resistances (5r): I = 5E/(R + 5r) — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('parallelM-mcq', mcq({
  stem: 'Four identical cells, each of emf E and internal resistance r, are joined in parallel with their positive terminals together. The combination behaves as a single cell of',
  right: 'emf E and internal resistance r/4',
  wrong: ['emf 4E and internal resistance r/4', 'emf E and internal resistance 4r', 'emf E/4 and internal resistance r/4'],
  sol: 'Each cell has the same emf, so the common emf is E; four equal resistances in parallel give r/4 — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('lowR-mcq', mcq({
  stem: 'Six identical cells are to send the largest possible current through a resistor whose resistance is much smaller than the internal resistance of one cell. The cells should be joined',
  right: 'all in parallel',
  wrong: ['all in series', 'as two parallel rows of three in series', 'as three parallel rows of two in series'],
  sol: 'I = nE/(R + nr/m) with nm = 6; for R ≪ r the current ≈ mE/r, largest for m = 6, n = 1 — option (@K).',
  d: 3, c: 'application', t: [2],
}), () => {
  const I = (n, m) => (n * 1.5) / (0.01 + (n * 1) / m);
  return (I(1, 6) > I(6, 1) && I(1, 6) > I(3, 2) && I(1, 6) > I(2, 3)) || 'lowR';
});
add('mixedmax-mcq', mcq({
  stem: 'A battery is made of m parallel rows, each of n identical cells (internal resistance r each) in series. For a fixed total number of cells, the current in an external resistance R is greatest when',
  right: 'R = nr/m',
  wrong: ['R = mr/n', 'R = mnr', 'R = r'],
  sol: 'I = nE/(R + nr/m) = NE/(mR + nr); with mR × nr = NRr fixed, the denominator is least when mR = nr, i.e. R = nr/m: the external resistance equals the internal resistance of the battery — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
const mx = { N: 8, E: 2, r: 1, n: 4, m: 2, R: 2 };
mx.I = (mx.n * mx.E) / (mx.R + (mx.n * mx.r) / mx.m);
add('mixed-num', num({
  stem: 'Eight cells, each of emf 2.0 V and internal resistance 1.0 Ω, are arranged in two parallel rows of four cells in series, and connected to a 2.0 Ω resistor. Find the current in the resistor, in amperes.',
  value: Number(dec(mx.I, 2)), tol: 0.02, unit: 'A',
  sol: r`Each row: emf $4 \times 2.0 = 8.0$ V, resistance $4 \times 1.0 = 4.0$ Ω; two rows in parallel: 8.0 V and 2.0 Ω. $I = \dfrac{8.0}{2.0 + 2.0} = ${dec(mx.I, 2)}$ A.`,
  scheme: [['Battery: 8.0 V, 2.0 Ω', 1], ['I = 2.0 A', 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(8 / 4, q.answer.value) || 'mx');
const mc = { N: 16, E: 1.5, r: 0.5, R: 2 };
mc.best = [1, 2, 4, 8, 16].map((m) => ({ m, n: mc.N / m, I: ((mc.N / m) * mc.E) / (mc.R + ((mc.N / m) * mc.r) / m) })).reduce((a, b) => (b.I > a.I ? b : a));
add('maxcurrent-num', num({
  stem: 'Sixteen cells, each of emf 1.5 V and internal resistance 0.50 Ω, are to be grouped in equal parallel rows to drive the largest possible current through a 2.0 Ω resistor. Find this largest current, in amperes.',
  value: Number(dec(mc.best.I, 2)), tol: 0.02, unit: 'A',
  sol: r`Largest current when $R = \dfrac{nr}{m}$ with $mn = 16$: $2.0 = \dfrac{0.50n}{m}$, so $n = 4m$ and $4m^2 = 16$: $m = 2$ rows of $n = 8$. $I = \dfrac{8 \times 1.5}{2.0 + 8 \times 0.50/2} = \dfrac{12}{4.0} = ${dec(mc.best.I, 2)}$ A.`,
  scheme: [['R = nr/m gives 2 rows of 8', 1], ['I = 3.0 A', 1]],
  marks: 2, d: 4, c: 'analysis', t: [2],
}), (q) => (mc.best.m === 2 && near(mc.best.I, q.answer.value)) || 'mc');
const rv = { n: 6, rev: 2, E: 1.5, r: 0.2, R: 3.8 };
rv.Enet = (rv.n - 2 * rv.rev) * rv.E;
rv.I = rv.Enet / (rv.R + rv.n * rv.r);
add('reversed-num', num({
  stem: 'A battery of six cells in series, each of emf 1.5 V and internal resistance 0.20 Ω, is assembled with two of the cells connected the wrong way round. It is connected to a 3.8 Ω resistor. Find the current, in amperes.',
  value: Number(dec(rv.I, 2)), tol: 0.01, unit: 'A',
  sol: r`Net emf $= (4 - 2) \times 1.5 = ${dec(rv.Enet, 2)}$ V (each reversed cell cancels a correct one); internal resistance still $6 \times 0.20 = 1.2$ Ω. $I = \dfrac{3.0}{3.8 + 1.2} = ${dec(rv.I, 2)}$ A.`,
  scheme: [['Net emf 3.0 V, r = 1.2 Ω', 1], ['I = 0.60 A', 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(3 / 5, q.answer.value) || 'rv');
const uq = { E1: 6, r1: 1, E2: 4, r2: 2 };
uq.E = (uq.E1 * uq.r2 + uq.E2 * uq.r1) / (uq.r1 + uq.r2);
add('unequal-num', num({
  stem: 'A 6.0 V battery of internal resistance 1.0 Ω and a 4.0 V battery of internal resistance 2.0 Ω are connected in parallel, positive terminal to positive terminal. Find the emf of the equivalent single battery, in volts (3 significant figures).',
  value: Number(dec(uq.E, 3)), tol: 0.02, unit: 'V',
  sol: r`$E_{eq} = \dfrac{E_1r_2 + E_2r_1}{r_1 + r_2} = \dfrac{6.0 \times 2.0 + 4.0 \times 1.0}{3.0} = \dfrac{16}{3.0} = ${dec(uq.E, 3)}$ V (and $r_{eq} = \dfrac{2.0}{3.0} \approx 0.67$ Ω).`,
  scheme: [['Weighted formula', 1], ['E ≈ 5.33 V', 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => {
  // open-circuit terminal p.d.: circulating current (6 − 4)/3
  const i = (6 - 4) / 3;
  return near(6 - i * 1, q.answer.value) || 'uq';
});
const pr = { m: 5, E: 1.2, r: 1, R: 0.8 };
pr.I = pr.E / (pr.R + pr.r / pr.m);
add('parallelr-num', num({
  stem: 'Five identical cells, each of emf 1.2 V and internal resistance 1.0 Ω, are joined in parallel and connected to a 0.80 Ω resistor. Find the current in the resistor, in amperes.',
  value: Number(dec(pr.I, 2)), tol: 0.01, unit: 'A',
  sol: r`Parallel: emf 1.2 V, resistance $\dfrac{1.0}{5} = 0.20$ Ω. $I = \dfrac{1.2}{0.80 + 0.20} = ${dec(pr.I, 2)}$ A.`,
  scheme: [['I = E/(R + r/m) = 1.2 A', 1]],
  d: 2, c: 'application', t: [2],
}), (q) => near(1.2 / 1.0, q.answer.value) || 'pr');
add('nseriesrev-tf', tf({
  stem: 'When one cell of a series battery is connected the wrong way round, the internal resistance of the battery decreases.',
  key: 'f',
  sol: 'False. The reversed cell’s emf subtracts (the battery loses 2E), but its internal resistance is still in series, so the total resistance is unchanged.',
  d: 2, c: 'understanding', t: [2],
}));
add('weak-ar', ar({
  a: 'Two cells of unequal emf joined in parallel, with no external load, gradually run down.',
  r: 'A current circulates between them, the cell of larger emf driving charge backwards through the cell of smaller emf.',
  key: 'a',
  sol: 'Both true, and R explains A: the circulating current (E₁ − E₂)/(r₁ + r₂) wastes energy as heat in both internal resistances — option (a).',
  d: 3, c: 'understanding', t: [2],
}));
add('parallelwhy-short', short({
  marks: 2,
  stem: 'Explain why identical cells are joined in parallel, rather than in series, when the external resistance is much smaller than the internal resistance of each cell.',
  model: 'In series, n cells give emf nE but also resistance nr, so with R ≪ r the current is **nE/nr = E/r**, no better than one cell. In parallel the emf stays E but the resistance falls to **r/m**, so the current approaches **mE/r**, m times larger; each cell also supplies only **1/m** of it.',
  sol: 'Series adds r as fast as E; parallel divides r.',
  scheme: [['Series: I ≈ E/r, no gain', 1], ['Parallel: r/m, current ≈ mE/r', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('groupingderive-short3', short({
  marks: 3,
  stem: 'N identical cells, each of emf E and internal resistance r, are arranged in m parallel rows of n cells in series and connected to an external resistance R. Obtain the current in R and show that it is maximum when R = nr/m.',
  model: r`Each row has emf $nE$ and resistance $nr$; m equal rows in parallel give emf $nE$ and resistance $\dfrac{nr}{m}$. So $I = \dfrac{nE}{R + nr/m} = \dfrac{mnE}{mR + nr} = \dfrac{NE}{mR + nr}$. With N fixed, I is largest when $mR + nr$ is least. Since $(mR)(nr) = NRr$ is constant, the sum $mR + nr = (\sqrt{mR} - \sqrt{nr})^2 + 2\sqrt{NRr}$ is least when $mR = nr$, i.e. $R = \dfrac{nr}{m}$.`,
  sol: 'Equivalent battery; minimise the denominator.',
  scheme: [['Row emf nE, battery resistance nr/m', 1], ['I = NE/(mR + nr)', 1], ['Minimum denominator when mR = nr', 1]],
  d: 3, c: 'understanding', t: [2], wl: null,
}));
add('unequalderive-short3', short({
  marks: 3,
  stem: 'Two cells of emfs E₁ and E₂ and internal resistances r₁ and r₂ are connected in parallel, positive to positive, across a resistance R. Obtain expressions for the emf and internal resistance of the equivalent cell.',
  model: r`Let the cells supply $I_1$ and $I_2$, with $I = I_1 + I_2$ through R, and let V be the common terminal p.d. Then $V = E_1 - I_1r_1 = E_2 - I_2r_2$, so $I_1 = \dfrac{E_1 - V}{r_1}$, $I_2 = \dfrac{E_2 - V}{r_2}$. Adding: $I = \dfrac{E_1}{r_1} + \dfrac{E_2}{r_2} - V\left(\dfrac{1}{r_1} + \dfrac{1}{r_2}\right)$, which rearranges to $V = \dfrac{E_1r_2 + E_2r_1}{r_1 + r_2} - I\,\dfrac{r_1r_2}{r_1 + r_2}$. Comparing with $V = E_{eq} - Ir_{eq}$: $E_{eq} = \dfrac{E_1r_2 + E_2r_1}{r_1 + r_2}$, $r_{eq} = \dfrac{r_1r_2}{r_1 + r_2}$.`,
  sol: 'Common V; add currents; compare with V = E − Ir.',
  scheme: [['V = E₁ − I₁r₁ = E₂ − I₂r₂ and I = I₁ + I₂', 1], ['Eliminate I₁, I₂', 1], ['E_eq and r_eq', 1]],
  d: 3, c: 'understanding', t: [2], wl: null,
}));

// ================================================================ t03 Kirchhoff's laws
add('junction-mcq', mcq({
  stem: 'Four copper tracks on a circuit board meet at one solder joint. Currents of 2.5 A and 1.2 A flow into the joint along two tracks, and 0.7 A flows out along the third. The fourth track carries',
  right: '3.0 A out of the joint',
  wrong: ['3.0 A into the joint', '4.4 A out of the joint', '1.6 A into the joint'],
  sol: 'Junction law: total in = total out, so 2.5 + 1.2 = 0.7 + I, I = 3.0 A leaving — option (@K).',
  d: 2, c: 'application', t: [3],
}), () => near(2.5 + 1.2 - 0.7, 3.0) || 'jn');
add('loopsign-mcq', mcq({
  stem: 'While applying Kirchhoff’s loop law, you pass through a cell of emf E (negligible internal resistance) from its positive terminal to its negative terminal. The term you write for the cell is',
  right: '−E, because the potential falls by E',
  wrong: ['+E, because the potential rises by E', 'zero, because emfs are not part of the loop law', '−E only if current flows through the cell in that direction'],
  sol: 'Going from + to − the potential drops by E whatever the current, so the change is −E — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
const lp = { E1: 12, r1: 0.5, E2: 9, r2: 0.5, R: 2 };
lp.I = (lp.E1 - lp.E2) / (lp.r1 + lp.r2 + lp.R);
add('loop-num', num({
  stem: 'A 12 V battery of internal resistance 0.50 Ω charges a 9.0 V battery of internal resistance 0.50 Ω through a 2.0 Ω resistor, the positive terminals being joined through the resistor. Find the charging current, in amperes.',
  value: Number(dec(lp.I, 2)), tol: 0.01, unit: 'A',
  sol: r`Round the loop the emfs oppose: $12 - 9.0 = I(0.50 + 0.50 + 2.0)$, so $I = \dfrac{3.0}{3.0} = ${dec(lp.I, 2)}$ A.`,
  scheme: [['Loop law with opposing emfs: I = 1.0 A', 1]],
  d: 2, c: 'application', t: [3],
}), (q) => near(12 - q.answer.value * 0.5 - q.answer.value * 2 - q.answer.value * 0.5, 9) || 'lp');
const bt = { V: node([[12, 3], [6, 3], [0, 6]]) };
bt.IL = bt.V / 6;
add('batteries-num', num({
  stem: 'Two batteries share a load. A 12 V battery in series with 3.0 Ω and a 6.0 V battery in series with 3.0 Ω are connected in parallel, positive terminals together, across a 6.0 Ω load. Find the current in the load, in amperes.',
  value: Number(dec(bt.IL, 2)), tol: 0.02, unit: 'A',
  sol: r`Let V be the p.d. across the load. Junction law: $\dfrac{12 - V}{3.0} + \dfrac{6.0 - V}{3.0} = \dfrac{V}{6.0}$, so $4 + 2 = V\left(\dfrac{2}{3} + \dfrac{1}{6}\right)$ and $V = ${dec(bt.V, 2)}$ V. Load current $= \dfrac{${dec(bt.V, 2)}}{6.0} = ${dec(bt.IL, 2)}$ A. (The 6.0 V battery takes $\dfrac{7.2 - 6.0}{3.0} = 0.40$ A: it is being charged.)`,
  scheme: [['Junction/loop equations', 1], ['Load current 1.2 A', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => {
  // loop-law check: currents from each battery branch must sum to the load current
  const V = q.answer.value * 6;
  return near((12 - V) / 3 + (6 - V) / 3, q.answer.value) || 'bt';
});
add('potdiff-num', num({
  stem: 'A steady current of 0.50 A flows from point P to point Q through a 4.0 Ω resistor and then through a 6.0 V cell of negligible internal resistance, which it enters at the positive terminal. Find the potential difference V_P − V_Q, in volts.',
  value: 8, tol: 0.05, unit: 'V',
  sol: r`From P: fall of $IR = 0.50 \times 4.0 = 2.0$ V across the resistor; then a fall of 6.0 V crossing the cell from + to −. $V_P - V_Q = 2.0 + 6.0 = 8.0$ V.`,
  scheme: [['Fall IR = 2.0 V', 1], ['Fall E = 6.0 V across the cell: 8.0 V', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), () => near(0.5 * 4 + 6, 8) || 'pd');
add('wrongsign-ar', ar({
  a: 'If a network is solved with Kirchhoff’s laws using a wrongly guessed direction for one current, that current comes out with a negative value.',
  r: 'Kirchhoff’s equations are linear in the currents, so reversing the assumed direction of a current only changes the sign of its value.',
  key: 'a',
  sol: 'Both true, and R explains A: the magnitude is still correct; the minus sign shows the true direction — option (a).',
  d: 3, c: 'understanding', t: [3],
}));
add('kirchconserve-short', short({
  marks: 2,
  stem: 'Explain how Kirchhoff’s junction law follows from conservation of charge and how his loop law follows from conservation of energy.',
  model: '**Junction:** in a steady state charge cannot accumulate at a junction, so the charge flowing in per second equals that flowing out: **ΣI = 0**. **Loop:** the electrostatic field is conservative, so a charge taken round a closed loop returns to the same potential; the energy gained from emfs equals that lost in resistors: **ΣE = ΣIR**.',
  sol: 'No pile-up of charge; zero net potential change round a loop.',
  scheme: [['Junction: no accumulation of charge', 1], ['Loop: potential (energy per charge) returns to its value', 1]],
  d: 2, c: 'understanding', t: [3],
}));
const zr = { V: node([[9, 3], [6, 6], [0, 6]]) };
zr.I1 = (9 - zr.V) / 3;
zr.I2 = (6 - zr.V) / 6;
zr.I3 = zr.V / 6;
add('zero-short3', short({
  marks: 3,
  stem: 'Three branches are joined between points X and Y: a 9.0 V cell in series with 3.0 Ω, a 6.0 V cell in series with 6.0 Ω (both cells with negligible internal resistance and positive terminals towards X), and a 6.0 Ω resistor. Use Kirchhoff’s laws to find the current in each branch, and comment on the result for the 6.0 V cell.',
  model: r`Take $I_1$ and $I_2$ from Y to X through the cells, $I_3 = I_1 + I_2$ from X to Y through the resistor.
Loop 1: $9.0 = 3.0I_1 + 6.0I_3$. Loop 2: $6.0 = 6.0I_2 + 6.0I_3$.
Solving: $I_1 = ${dec(zr.I1, 2)}$ A, $I_2 = 0$, $I_3 = ${dec(zr.I3, 2)}$ A, with $V_X - V_Y = 6.0$ V. The p.d. across the 6.0 V branch equals its emf, so **no current** flows through that cell: it neither charges nor discharges.`,
  sol: 'Two loop equations and the junction law.',
  scheme: [['Junction and two loop equations', 1], ['I₁ = I₃ = 1.0 A', 1], ['I₂ = 0, with the comment', 1]],
  d: 4, c: 'analysis', t: [3], wl: null,
}), () => (near(zr.I1, 1) && Math.abs(zr.I2) < 1e-12 && Math.abs(9 - 3 * zr.I1 - 6 * zr.I3) < 1e-9) || `zr ${zr.I1} ${zr.I2}`);

// ================================================================ t04 Wheatstone and metre bridges
add('bridgeS-num', num({
  stem: 'Four resistors form a Wheatstone bridge: 12 Ω from A to B, 18 Ω from B to C and 8.0 Ω from A to D, with the cell across A and C and the galvanometer between B and D. What resistance is needed from D to C for the galvanometer to read zero? Give the answer in ohms.',
  value: 12, tol: 0.05, unit: 'Ω',
  sol: r`Balance: $\dfrac{P}{Q} = \dfrac{R}{S}$, so $S = \dfrac{QR}{P} = \dfrac{18 \times 8.0}{12} = 12$ Ω.`,
  scheme: [['S = QR/P = 12 Ω', 1]],
  d: 2, c: 'application', t: [4],
}), (q) => near(12 / 18, 8 / q.answer.value) || 'bs');
const mr = { R: 4, l: 32 };
mr.X = (mr.R * (100 - mr.l)) / mr.l;
add('metreR-num', num({
  stem: 'A 4.0 Ω coil is placed in the left gap of a metre bridge and an unknown resistor in the right gap. The null point is 32.0 cm from the left end. Find the unknown resistance, in ohms.',
  value: Number(dec(mr.X, 2)), tol: 0.05, unit: 'Ω',
  sol: r`Left arm ∝ l, right arm ∝ $100 - l$: $\dfrac{4.0}{X} = \dfrac{32.0}{68.0}$, so $X = 4.0 \times \dfrac{68.0}{32.0} = ${dec(mr.X, 2)}$ Ω.`,
  scheme: [['Ratio with the unknown in the right gap', 1], ['X = 8.5 Ω', 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near(4 / q.answer.value, 32 / 68) || 'mr');
const sm = { R: 10, l: 40 };
sm.X = (sm.R * sm.l) / (100 - sm.l);
sm.l2 = (100 * sm.X) / (sm.X + sm.R / 2);
add('shuntmetre-mcq', mcq({
  stem: 'In a metre bridge, an unknown resistor in the left gap balances a 10 Ω resistor in the right gap at 40.0 cm from the left end. A second 10 Ω resistor is then connected in parallel with the one in the right gap. The null point moves to about',
  right: '57 cm',
  wrong: ['25 cm', '40 cm (it does not move)', '80 cm'],
  sol: r`X = 10 × 40/60 ≈ 6.67 Ω. The right gap is now 5.0 Ω: l/(100 − l) = 6.67/5.0, so l ≈ ${dec(sm.l2, 2)} cm — option (@K).`,
  d: 4, c: 'analysis', t: [4],
}), () => near(sm.l2, 57.14, 0.001) || `sm ${sm.l2}`);
add('copperstrip-mcq', mcq({
  stem: 'The gaps of a metre bridge are joined by thick copper strips because',
  right: 'their resistance is negligible, so the arms consist only of the resistors in the gaps and the two parts of the wire',
  wrong: ['copper strips increase the current through the galvanometer at balance', 'their high resistance protects the galvanometer', 'they keep the bridge wire at a constant temperature'],
  sol: 'Any resistance in the connections would add to the arms and spoil X/R = l/(100 − l); thick copper keeps it negligible — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
const ub = { P: 2, Q: 4, R: 3, S: 5 };
ub.VB = ub.Q / (ub.P + ub.Q);
ub.VD = ub.S / (ub.R + ub.S);
add('unbalanced-mcq', mcq({
  stem: 'In a Wheatstone bridge the arms are AB = 2 Ω, BC = 4 Ω, AD = 3 Ω and DC = 5 Ω. The positive terminal of the cell is joined to A and the negative terminal to C, and a galvanometer connects B and D. The current in the galvanometer flows',
  right: 'from B to D, because B is at the higher potential',
  wrong: ['from D to B, because D is at the higher potential', 'nowhere, because the bridge is balanced', 'from B to D only if the emf of the cell is large enough'],
  sol: r`Taking C as zero and A at V (ignoring the small galvanometer current): $V_B = V \times \dfrac{4}{6} \approx 0.67V$ and $V_D = V \times \dfrac{5}{8} \approx 0.63V$. B is higher, so current flows from B to D for any emf — option (@K).`,
  d: 4, c: 'analysis', t: [4],
}), () => (ub.VB > ub.VD && !near(ub.P / ub.Q, ub.R / ub.S)) || 'ub');
add('middle-ar', ar({
  a: 'In a metre bridge experiment, the known resistance should be chosen so that the null point lies near the middle of the wire.',
  r: 'A Wheatstone bridge is balanced when the ratio of the resistances in one pair of adjacent arms equals that in the other pair.',
  key: 'b',
  sol: 'Both true, but R (the balance condition) does not explain A. A is explained by end errors: the resistances at the joints of the wire with the copper strips matter least when l and 100 − l are both large — option (b).',
  d: 3, c: 'understanding', t: [4],
}));
add('galv-tf', tf({
  stem: 'A balanced Wheatstone bridge stays balanced when its galvanometer is replaced by one with a much higher resistance.',
  key: 't',
  sol: 'True. Balance depends only on P/Q = R/S; with no current in the galvanometer branch its resistance plays no part.',
  d: 2, c: 'understanding', t: [4],
}));
add('bridgeindep-short', short({
  marks: 2,
  stem: 'Why is a resistance found with a Wheatstone bridge at balance independent of the emf of the cell and of the resistance of the galvanometer?',
  model: 'At balance B and D are at the **same potential** and **no current** flows through the galvanometer, so its resistance never enters the equations. The condition **P/Q = R/S** compares **ratios** of potential drops; changing the emf scales every current in the same proportion and leaves the ratios unchanged.',
  sol: 'No galvanometer current; ratios only.',
  scheme: [['No current in G, so its resistance is irrelevant', 1], ['Condition involves ratios only: emf scales all currents', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('balancecond-short3', short({
  marks: 3,
  stem: 'Using Kirchhoff’s laws, derive the condition for balance of a Wheatstone bridge with resistances P (AB), Q (BC), R (AD) and S (DC), a cell across A and C and a galvanometer across B and D.',
  model: r`At balance the galvanometer current is zero, so by the junction law the current $I_1$ in P also flows through Q, and the current $I_2$ in R also flows through S. Loop ABDA (no emf, $I_g = 0$): $I_1P - I_2R = 0$, so $I_1P = I_2R$. Loop BCDB: $I_1Q - I_2S = 0$, so $I_1Q = I_2S$. Dividing: $\dfrac{P}{Q} = \dfrac{R}{S}$.`,
  sol: 'Junction law with I_g = 0, two loops, divide.',
  scheme: [['I_g = 0: same current in P and Q, in R and S', 1], ['Loop equations I₁P = I₂R and I₁Q = I₂S', 1], ['P/Q = R/S', 1]],
  d: 3, c: 'understanding', t: [4], wl: null,
}));
const py = { R: 4, l1: 60, l2: 40 };
py.X = (py.R * py.l1) / (100 - py.l1);
py.Xp = (py.R * py.l2) / (100 - py.l2);
py.Y = 1 / (1 / py.Xp - 1 / py.X);
add('parallelY-short3', short({
  marks: 3,
  stem: 'In a metre bridge with a 4.0 Ω resistor in the right gap, a coil X in the left gap gives a null point at 60.0 cm. When a resistor Y is connected in parallel with X, the null point moves to 40.0 cm. Find X and Y.',
  model: r`$X = 4.0 \times \dfrac{60.0}{40.0} = ${dec(py.X, 2)}$ Ω. With Y in parallel: $X_p = 4.0 \times \dfrac{40.0}{60.0} = ${dec(py.Xp, 3)}$ Ω. Then $\dfrac{1}{Y} = \dfrac{1}{${dec(py.Xp, 3)}} - \dfrac{1}{6.0} = 0.375 - 0.167 = 0.208$, so $Y = ${dec(py.Y, 2)}$ Ω.`,
  sol: 'Two balances; parallel combination.',
  scheme: [['X = 6.0 Ω', 1], ['X ∥ Y = 2.67 Ω', 1], ['Y = 4.8 Ω', 1]],
  d: 4, c: 'analysis', t: [4], wl: null,
}), () => (near(py.X, 6) && near(py.Y, 4.8) && near((py.X * py.Y) / (py.X + py.Y), py.Xp)) || 'py');

// ================================================================ t05 potentiometer: principle, gradient, sensitivity
add('principle-mcq', mcq({
  stem: 'A potentiometer measures the emf of a cell more accurately than a moving-coil voltmeter because, at the balance point,',
  right: 'no current is drawn from the cell',
  wrong: ['the current through the cell is largest', 'the internal resistance of the cell becomes zero', 'the galvanometer has zero resistance'],
  sol: 'With no current through the cell there are no lost volts (Ir = 0), so the balance measures E itself — option (@K).',
  d: 1, c: 'understanding', t: [5],
}));
const gr = { L: 5, Rw: 10, E: 2, Rs: 15 };
gr.I = gr.E / (gr.Rw + gr.Rs);
gr.k = (gr.I * gr.Rw) / gr.L;
add('gradient-num', num({
  stem: 'A potentiometer wire 5.0 m long has a resistance of 10 Ω. It is connected in series with a 15 Ω resistance box and a 2.0 V accumulator of negligible internal resistance. Find the potential gradient along the wire, in V m⁻¹.',
  value: Number(dec(gr.k, 2)), tol: 0.005, unit: 'V m⁻¹',
  sol: r`$I = \dfrac{2.0}{10 + 15} = ${dec(gr.I, 2)}$ A; p.d. across the wire $= ${dec(gr.I, 2)} \times 10 = ${dec(gr.I * gr.Rw, 2)}$ V; $k = \dfrac{${dec(gr.I * gr.Rw, 2)}}{5.0} = ${dec(gr.k, 2)}$ V m$^{-1}$ (1.6 mV per cm).`,
  scheme: [['I = 0.080 A, V_wire = 0.80 V', 1], ['k = 0.16 V m⁻¹', 1]],
  marks: 2, d: 3, c: 'application', t: [5],
}), (q) => near(((2 / 25) * 10) / 5, q.answer.value) || 'gr');
add('nobalance-mcq', mcq({
  stem: 'In a potentiometer experiment the galvanometer deflects the same way wherever the jockey touches the wire, so no null point can be found. A possible cause is that',
  right: 'the potential difference across the whole wire is less than the emf being measured',
  wrong: ['the jockey is pressed too firmly on the wire', 'the potentiometer wire is longer than necessary', 'the galvanometer is too sensitive'],
  sol: 'A null point needs kL > E (and both + terminals at A). If the drop across the whole wire is smaller than E, the galvanometer current never reverses — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('potsens-mcq', mcq({
  stem: 'To make a potentiometer able to distinguish between two cells whose emfs differ by only a few millivolts, the experimenter should',
  right: 'increase the resistance in series with the driver cell, reducing the potential gradient',
  wrong: ['reduce the resistance in series with the driver cell, raising the potential gradient', 'replace the wire with a shorter one of the same material', 'use a driver cell of larger emf with no series resistance'],
  sol: 'l = E/k: a smaller k spreads each millivolt over more wire, so the balance points separate more — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('doubleL-mcq', mcq({
  stem: 'The driver of a potentiometer is an accumulator of negligible internal resistance connected directly across the wire, with no rheostat. The wire is replaced by one of the same material and cross-section but twice as long. The balancing length for a given cell',
  right: 'doubles',
  wrong: ['halves', 'is unchanged', 'becomes four times as long'],
  sol: 'The whole driver emf is still across the wire, now twice as long, so k halves and l = E/k doubles — option (@K).',
  d: 4, c: 'analysis', t: [5],
}), () => {
  const l = (L) => 1.0 / (2.0 / L);
  return near(l(8), 2 * l(4)) || 'dl';
});
add('gradient-fill', fill({
  stem: 'The fall of potential per unit length along a potentiometer wire carrying a steady current is called the potential ___.',
  acc: [['gradient']],
  sol: 'The potential **gradient** k (V m⁻¹).',
  d: 1, c: 'recall', t: [5],
}));
add('rheostat-tf', tf({
  stem: 'Increasing the resistance of the rheostat in the driver circuit of a potentiometer increases the balancing length for a given cell.',
  key: 't',
  sol: 'True. A larger rheostat resistance lowers the current and so the potential gradient k; the balancing length E/k increases (provided a balance is still possible).',
  d: 2, c: 'understanding', t: [5],
}));
add('idealvolt-ar', ar({
  a: 'At its balance point a potentiometer behaves like a voltmeter of infinite resistance.',
  r: 'At the balance point no current flows in the branch containing the cell and the galvanometer.',
  key: 'a',
  sol: 'Both true, and R explains A: drawing no current is exactly what an infinite-resistance voltmeter would do — option (a).',
  d: 2, c: 'understanding', t: [5],
}));
add('balancelen-num', num({
  stem: 'On a 10 m potentiometer wire the potential gradient is 0.25 V m⁻¹. At what length from the positive end will a cell of emf 1.10 V balance? Give the answer in metres.',
  value: 4.4, tol: 0.02, unit: 'm',
  sol: r`$l = \dfrac{E}{k} = \dfrac{1.10}{0.25} = 4.4$ m.`,
  scheme: [['l = E/k = 4.4 m', 1]],
  d: 1, c: 'application', t: [5],
}), (q) => near(0.25 * q.answer.value, 1.1) || 'bl');
const th = { L: 10, Rw: 20, E: 2, k: 0.01 };
th.I = (th.k * th.L) / th.Rw;
th.Rs = th.E / th.I - th.Rw;
add('thermoR-num', num({
  stem: 'A 10 m potentiometer wire of resistance 20 Ω is to measure thermocouple emfs of a few millivolts, so its potential gradient must be 10 mV per metre. The driver is a 2.0 V accumulator of negligible internal resistance. What resistance must be connected in series with the wire? Give the answer in ohms.',
  value: Number(dec(th.Rs, 3)), tol: 1, unit: 'Ω',
  sol: r`P.d. across the wire $= 0.010 \times 10 = 0.10$ V, so $I = \dfrac{0.10}{20} = ${dec(th.I, 2)}$ A. Total resistance $= \dfrac{2.0}{${dec(th.I, 2)}} = 400$ Ω, so the series resistance is $400 - 20 = ${dec(th.Rs, 3)}$ Ω.`,
  scheme: [['I = 5.0 mA from V_wire = 0.10 V', 1], ['Series R = 380 Ω', 1]],
  marks: 2, d: 4, c: 'analysis', t: [5],
}), (q) => near(((2 / (20 + q.answer.value)) * 20) / 10, 0.01) || 'th');
add('uniform-short', short({
  marks: 2,
  stem: 'Why is a potentiometer wire made of an alloy such as constantan, and why must it have a uniform cross-section along its length?',
  model: 'Constantan has a **high resistivity**, giving a usefully large p.d. across the wire, and a **very small temperature coefficient**, so k stays steady as the current warms it. A **uniform cross-section** (and material) makes the resistance per unit length the same everywhere, so the **potential drop is proportional to length**.',
  sol: 'High ρ, small α; uniform resistance per length.',
  scheme: [['Alloy: high resistivity, small temperature coefficient', 1], ['Uniform: V ∝ l along the wire', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('sens-short', short({
  marks: 2,
  stem: 'A student finds that two cells of nearly equal emf balance at almost the same point on a potentiometer. Suggest two ways of making the instrument distinguish them better, giving a reason.',
  model: 'Reduce the **potential gradient** k: (1) increase the **resistance of the rheostat** in the driver circuit, lowering the current; (2) use a **longer wire** with the same driver. Since **l = E/k**, a smaller k makes a given difference in emf give a **larger difference** in balancing length.',
  sol: 'Smaller k, larger change in l.',
  scheme: [['Two ways: more rheostat resistance, longer wire', 1], ['Reason: l = E/k, smaller k spreads the difference', 1]],
  d: 3, c: 'application', t: [5],
}));
add('voltmeterVS-short3', short({
  marks: 3,
  stem: 'Explain why a potentiometer is preferred to a moving-coil voltmeter for measuring the emf of a cell. State one disadvantage of the potentiometer.',
  model: 'A voltmeter must take **some current** from the cell to deflect, so it reads the **terminal p.d.** E − Ir, which is less than E. A potentiometer is a **null method**: at balance **no current** is drawn, so there are no lost volts and the **true emf** is measured; it acts as a voltmeter of **infinite resistance**, and its sensitivity can be raised by **reducing k**. Disadvantage: it is **slower** to use and needs a **steady driver** cell.',
  sol: 'Null method draws no current.',
  scheme: [['Voltmeter draws current: reads E − Ir', 1], ['Potentiometer: no current at balance, true emf (infinite resistance)', 1], ['One disadvantage (slow, needs steady driver, not portable)', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('whypositive-short', short({
  marks: 2,
  stem: 'Why must the positive terminals of the driver cell and of the cell under test be connected to the same end of the potentiometer wire?',
  model: 'Only then does the test cell’s emf **oppose** the potential drop along the wire between A and the jockey. At one point the two become **equal** and the galvanometer current is zero. If the cell were reversed, its emf would **add** to the drop and the galvanometer would deflect the same way everywhere: **no null point**.',
  sol: 'Opposition is needed for a null point.',
  scheme: [['Emf must oppose the drop along the wire', 1], ['Otherwise they add: no null point', 1]],
  d: 2, c: 'understanding', t: [5, 6],
}));

// ================================================================ t06 potentiometer applications
const cp = { Es: 1.02, ls: 272, lx: 400 };
cp.Ex = (cp.Es * cp.lx) / cp.ls;
add('compare-num', num({
  stem: 'On a potentiometer, a standard cell of emf 1.02 V balances at 272 cm and a dry cell at 400 cm. Find the emf of the dry cell, in volts.',
  value: Number(dec(cp.Ex, 3)), tol: 0.01, unit: 'V',
  sol: r`$\dfrac{E_x}{E_s} = \dfrac{l_x}{l_s}$, so $E_x = 1.02 \times \dfrac{400}{272} = ${dec(cp.Ex, 3)}$ V.`,
  scheme: [['E₁/E₂ = l₁/l₂', 1], ['E = 1.50 V', 1]],
  marks: 2, d: 2, c: 'application', t: [6],
}), (q) => near(q.answer.value / 1.02, 400 / 272) || 'cp');
const sd = { la: 4.5, lb: 1.5 };
sd.ratio = (sd.la + sd.lb) / (sd.la - sd.lb);
add('sumdiff-mcq', mcq({
  stem: 'Two cells are joined in series and balanced on a potentiometer: with their emfs aiding each other the balancing length is 4.5 m, and with them opposing it is 1.5 m. The ratio of the larger emf to the smaller is',
  right: '2 : 1',
  wrong: ['3 : 1', '3 : 2', '4 : 3'],
  sol: '(E₁ + E₂)/(E₁ − E₂) = 4.5/1.5 = 3, so E₁ + E₂ = 3E₁ − 3E₂ and E₁ = 2E₂ — option (@K).',
  d: 4, c: 'analysis', t: [6],
}), () => near(sd.ratio, 2) || 'sd');
add('shuntfall-mcq', mcq({
  stem: 'While finding the internal resistance of a cell with a potentiometer, the resistance R connected across the cell is reduced. The balancing length obtained with R connected',
  right: 'decreases, because the cell supplies more current and its terminal p.d. falls',
  wrong: ['increases, because the terminal p.d. rises', 'stays the same, because the emf does not change', 'decreases, because the potential gradient of the wire increases'],
  sol: 'V = ER/(R + r) falls as R falls, and l₂ = V/k with k unchanged — option (@K).',
  d: 3, c: 'application', t: [6],
}), () => {
  const l2 = (R) => (1.5 * R) / (R + 1) / 0.4;
  return l2(5) < l2(10) || 'sf';
});
const ir = { l1: 240, l2: 200, R: 10 };
ir.r = (ir.R * (ir.l1 - ir.l2)) / ir.l2;
add('intR-num', num({
  stem: 'A cell balances at 240 cm on a potentiometer wire when it supplies no current. With a 10 Ω resistor connected across its terminals, the balance point moves to 200 cm. Find the internal resistance of the cell, in ohms.',
  value: Number(dec(ir.r, 2)), tol: 0.02, unit: 'Ω',
  sol: r`$r = R\,\dfrac{l_1 - l_2}{l_2} = 10 \times \dfrac{240 - 200}{200} = ${dec(ir.r, 2)}$ Ω.`,
  scheme: [['r = R(l₁ − l₂)/l₂', 1], ['r = 2.0 Ω', 1]],
  marks: 2, d: 2, c: 'application', t: [6],
}), (q) => near(240 / 200, (10 + q.answer.value) / 10) || 'ir');
const rf = { r: 0.5, l1: 280, l2: 240 };
rf.R = (rf.r * rf.l2) / (rf.l1 - rf.l2);
add('Rfind-num', num({
  stem: 'A cell of internal resistance 0.50 Ω balances at 280 cm on a potentiometer on open circuit. What resistance must be connected across the cell for the balance point to be at 240 cm? Give the answer in ohms.',
  value: Number(dec(rf.R, 2)), tol: 0.02, unit: 'Ω',
  sol: r`From $r = R\,\dfrac{l_1 - l_2}{l_2}$: $R = r\,\dfrac{l_2}{l_1 - l_2} = 0.50 \times \dfrac{240}{40} = ${dec(rf.R, 2)}$ Ω.`,
  scheme: [['Rearranged formula', 1], ['R = 3.0 Ω', 1]],
  marks: 2, d: 3, c: 'analysis', t: [6],
}), (q) => near(280 / 240, (q.answer.value + 0.5) / q.answer.value) || 'rf');
add('emfratio-ar', ar({
  a: 'When the emfs of two cells are compared with a potentiometer, their internal resistances do not affect the result.',
  r: 'At balance no current flows through the cell being tested, so there is no potential drop across its internal resistance.',
  key: 'a',
  sol: 'Both true, and R explains A: each balancing length measures the full emf, so E₁/E₂ = l₁/l₂ whatever r₁ and r₂ are — option (a).',
  d: 2, c: 'understanding', t: [6],
}));
add('longer-ar', ar({
  a: 'In the potentiometer method for internal resistance, the balancing length with the resistor connected across the cell is greater than the balancing length on open circuit.',
  r: 'The terminal potential difference of a cell that is supplying current is less than its emf.',
  key: 'd',
  sol: 'R is true, and it shows A is false: with the resistor connected the balance measures the smaller terminal p.d., so l₂ < l₁ — option (d).',
  d: 3, c: 'understanding', t: [6],
}));
add('intRderive-short3', short({
  marks: 3,
  stem: 'Describe how a potentiometer is used to find the internal resistance of a cell, and derive r = R(l₁ − l₂)/l₂, where l₁ and l₂ are the balancing lengths without and with a resistance R across the cell.',
  model: r`The cell (+ to A) is joined through a galvanometer to the jockey, with a resistance box R and key $K_2$ across it. With $K_2$ open the cell supplies no current and balances at $l_1$: $E = kl_1$. With $K_2$ closed it drives current I through R, and the balance at $l_2$ gives the terminal p.d.: $V = IR = kl_2$. Since $E = I(R + r)$: $\dfrac{E}{V} = \dfrac{R + r}{R} = \dfrac{l_1}{l_2}$, so $r = R\left(\dfrac{l_1}{l_2} - 1\right) = R\,\dfrac{l_1 - l_2}{l_2}$.`,
  sol: 'Two balances: E and V.',
  scheme: [['K₂ open: E = kl₁', 1], ['K₂ closed: V = IR = kl₂', 1], ['E/V = (R + r)/R gives r', 1]],
  d: 3, c: 'understanding', t: [6], wl: null,
}));
add('compareproc-short3', short({
  marks: 3,
  stem: 'Explain, with the circuit described in words, how a potentiometer with a two-way key is used to compare the emfs of a Leclanché cell and a Daniell cell. State one precaution.',
  model: 'A **driver** (accumulator, key, rheostat) sends a steady current through the wire AB. The positive terminals of **both cells** are joined to **A**; their negative terminals go to the two studs of a **two-way key**, whose common stud leads through a **galvanometer** to the jockey. Each cell is connected in turn and its balancing length found: **E₁ = kl₁, E₂ = kl₂**, so **E₁/E₂ = l₁/l₂**. Precaution: driver emf greater than both emfs; keep the current steady and do not slide the jockey.',
  sol: 'Same k for both cells.',
  scheme: [['Driver circuit and both + terminals at A', 1], ['Two-way key, G, jockey; balance each cell', 1], ['E₁/E₂ = l₁/l₂ and a precaution', 1]],
  d: 2, c: 'understanding', t: [6],
}));

// ================================================================ 5-mark questions (in parts)
const cl = { V1: 5.6, I1: 2, V2: 5.9, I2: 0.5 };
cl.r = (cl.V2 - cl.V1) / (cl.I1 - cl.I2);
cl.E = cl.V1 + cl.I1 * cl.r;
cl.Vc = cl.E + 2 * cl.r;
add('cell-long', long({
  stem: '(a) Define the emf and the internal resistance of a cell, and use conservation of energy to show that its terminal potential difference is V = E − Ir. [2] (b) The terminal potential difference of a battery is 5.6 V when it supplies 2.0 A and 5.9 V when it supplies 0.50 A. Find its emf and internal resistance. [2] (c) Find the terminal potential difference when the battery is being charged with a current of 2.0 A. [1]',
  model: r`(a) Emf E: work done by the cell per unit charge taken round the whole circuit. Internal resistance r: resistance of the electrolyte and electrodes. In time t the cell supplies $EIt$; heat $I^2Rt + I^2rt$ is produced, so $E = IR + Ir$ and $V = IR = E - Ir$.

(b) $5.6 = E - 2.0r$ and $5.9 = E - 0.50r$: subtracting, $0.30 = 1.5r$, so $r = ${dec(cl.r, 2)}$ Ω and $E = 5.6 + 2.0 \times 0.20 = ${dec(cl.E, 2)}$ V.

(c) Charging: $V = E + Ir = 6.0 + 2.0 \times 0.20 = ${dec(cl.Vc, 2)}$ V.`,
  sol: 'Definitions; energy; two readings; charging.',
  scheme: [['Definitions of E and r', 1], ['Energy argument: V = E − Ir', 1], ['Two equations', 1], ['r = 0.20 Ω, E = 6.0 V', 1], ['Charging: V = 6.4 V', 1]],
  d: 3, c: 'application', t: [1], wl: null,
}), () => (near(cl.r, 0.2) && near(cl.E, 6) && near(cl.Vc, 6.4)) || 'cl');
const gl = { E1: 5, r1: 2, E2: 3, r2: 3, R: 1.8 };
gl.E = (gl.E1 * gl.r2 + gl.E2 * gl.r1) / (gl.r1 + gl.r2);
gl.r = (gl.r1 * gl.r2) / (gl.r1 + gl.r2);
gl.I = gl.E / (gl.R + gl.r);
gl.V = gl.I * gl.R;
gl.I1 = (gl.E1 - gl.V) / gl.r1;
gl.I2 = (gl.E2 - gl.V) / gl.r2;
add('grouping-long', long({
  stem: '(a) Two cells of emfs E₁ and E₂ and internal resistances r₁ and r₂ are joined in parallel, positive to positive. Obtain the emf and internal resistance of the equivalent cell. [2] (b) A 5.0 V cell of internal resistance 2.0 Ω and a 3.0 V cell of internal resistance 3.0 Ω are so joined and connected to a 1.8 Ω resistor. Find the current in the resistor. [2] (c) Find the current supplied by each cell. [1]',
  model: r`(a) With common terminal p.d. V: $V = E_1 - I_1r_1 = E_2 - I_2r_2$ and $I = I_1 + I_2$. Eliminating $I_1$, $I_2$: $V = \dfrac{E_1r_2 + E_2r_1}{r_1 + r_2} - I\dfrac{r_1r_2}{r_1 + r_2}$, so $E_{eq} = \dfrac{E_1r_2 + E_2r_1}{r_1 + r_2}$, $r_{eq} = \dfrac{r_1r_2}{r_1 + r_2}$.

(b) $E_{eq} = \dfrac{5.0 \times 3.0 + 3.0 \times 2.0}{5.0} = ${dec(gl.E, 2)}$ V; $r_{eq} = \dfrac{6.0}{5.0} = ${dec(gl.r, 2)}$ Ω; $I = \dfrac{4.2}{1.8 + 1.2} = ${dec(gl.I, 2)}$ A.

(c) $V = 1.4 \times 1.8 = ${dec(gl.V, 3)}$ V; $I_1 = \dfrac{5.0 - 2.52}{2.0} = ${dec(gl.I1, 3)}$ A; $I_2 = \dfrac{3.0 - 2.52}{3.0} = ${dec(gl.I2, 2)}$ A (they add to 1.4 A).`,
  sol: 'Derivation; equivalent cell; branch currents.',
  scheme: [['Common V and I = I₁ + I₂', 1], ['E_eq and r_eq', 1], ['E_eq = 4.2 V, r_eq = 1.2 Ω', 1], ['I = 1.4 A', 1], ['I₁ = 1.24 A, I₂ = 0.16 A', 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => (near(gl.I, 1.4) && near(gl.I1 + gl.I2, gl.I) && near(gl.I2, 0.16)) || 'gl');
const kl = { V: node([[15, 0.5], [12, 1], [0, 9]]) };
kl.Ig = (15 - kl.V) / 0.5;
kl.Ib = (kl.V - 12) / 1;
kl.IL = kl.V / 9;
add('kirch-long', long({
  stem: 'In a car, the generator, the battery and a headlamp are connected in parallel between two points X and Y. (a) State Kirchhoff’s two laws and the conservation principle on which each is based. [2] (b) The generator has emf 15 V and internal resistance 0.50 Ω, the battery emf 12 V and internal resistance 1.0 Ω, and the headlamp a resistance of 9.0 Ω; both positive terminals are joined to X. Find the current in each of the three branches. [2] (c) Find the p.d. between X and Y and state whether the battery is charging or discharging. [1]',
  model: r`(a) Junction law: the sum of currents entering a junction equals the sum leaving (conservation of charge). Loop law: round any closed loop the sum of the emfs equals the sum of the IR products (conservation of energy).

(b) Let $V = V_X - V_Y$. Junction X: $\dfrac{15 - V}{0.50} + \dfrac{12 - V}{1.0} = \dfrac{V}{9.0}$, i.e. $42 = V\left(2 + 1 + \dfrac{1}{9}\right)$, so $V = ${dec(kl.V, 3)}$ V. Generator: $\dfrac{15 - 13.5}{0.50} = ${dec(kl.Ig, 2)}$ A out of its + terminal; battery: $\dfrac{13.5 - 12}{1.0} = ${dec(kl.Ib, 2)}$ A into its + terminal; lamp: $\dfrac{13.5}{9.0} = ${dec(kl.IL, 2)}$ A.

(c) $V_X - V_Y = 13.5$ V, more than the battery’s emf, so the generator drives 1.5 A into it: the battery is **charging**.`,
  sol: 'Laws; node equation; direction.',
  scheme: [['Junction law and charge conservation', 1], ['Loop law and energy conservation', 1], ['Equations set up correctly', 1], ['3.0 A, 1.5 A, 1.5 A', 1], ['13.5 V; battery charging', 1]],
  d: 4, c: 'analysis', t: [3], wl: null,
}), () => (near(kl.V, 13.5) && near(kl.Ig, kl.Ib + kl.IL) && Math.abs(15 - 0.5 * kl.Ig - 9 * kl.IL) < 1e-9) || `kl ${kl.V}`);
const bl = { R: 26, l: 35 };
bl.X = (bl.R * bl.l) / (100 - bl.l);
bl.l2 = (100 * 2 * bl.X) / (2 * bl.X + bl.R);
add('bridge-long', long({
  stem: '(a) Derive the condition for balance of a Wheatstone bridge using Kirchhoff’s laws. [2] (b) In a metre bridge, an unknown coil in the left gap and a 26 Ω resistor in the right gap give a null point at 35.0 cm from the left end. Find the resistance of the coil. [1] (c) A second, identical coil is now connected in series with the first. Find the new null point. [1] (d) Why should the jockey be tapped on the wire rather than slid along it? [1]',
  model: r`(a) At balance $I_g = 0$, so P and Q carry the same current $I_1$, and R and S carry $I_2$. Loop ABDA: $I_1P = I_2R$; loop BCDB: $I_1Q = I_2S$. Dividing: $\dfrac{P}{Q} = \dfrac{R}{S}$.

(b) $X = 26 \times \dfrac{35.0}{65.0} = ${dec(bl.X, 3)}$ Ω.

(c) $2X = 28$ Ω: $\dfrac{28}{26} = \dfrac{l}{100 - l}$, so $l = \dfrac{2800}{54} \approx ${dec(bl.l2, 3)}$ cm.

(d) Sliding scrapes the wire and makes its cross-section non-uniform, so the resistance would no longer be proportional to length; tapping also avoids a continuous current heating the wire.`,
  sol: 'Derivation; two balances; precaution.',
  scheme: [['I_g = 0 and loop equations', 1], ['P/Q = R/S', 1], ['X = 14.0 Ω', 1], ['l ≈ 51.9 cm', 1], ['Uniformity of the wire', 1]],
  d: 3, c: 'application', t: [4], wl: null,
}), () => (near(bl.X, 14) && near(bl.l2, 51.85, 0.001)) || `bl ${bl.l2}`);
const pl = { E0: 3, Rw: 9, L: 6, Rs: 6, l1: 5, l2: 4, R: 6 };
pl.I = pl.E0 / (pl.Rw + pl.Rs);
pl.Vw = pl.I * pl.Rw;
pl.k = pl.Vw / pl.L;
pl.E = pl.k * pl.l1;
pl.r = (pl.R * (pl.l1 - pl.l2)) / pl.l2;
pl.Rmax = pl.E0 / (2 / pl.Rw) - pl.Rw; // series resistance for which V_wire = 2.0 V
add('pot-long', long({
  stem: '(a) State the principle of the potentiometer and explain why it is said to act as an ideal voltmeter. [1] (b) A 6.0 m potentiometer wire of resistance 9.0 Ω is in series with a 6.0 Ω resistor and a 3.0 V driver of negligible internal resistance. Find the potential gradient. [1] (c) A cell balances at 5.00 m on open circuit and at 4.00 m when a 6.0 Ω resistor is connected across it. Find its emf and internal resistance. [2] (d) Can a 2.0 V cell be balanced on this arrangement? If not, what change would allow it? [1]',
  model: r`(a) With a steady current in a uniform wire, the potential drop is proportional to length ($V = kl$). At balance no current is drawn from the cell, so like an infinite-resistance voltmeter it measures the emf itself.

(b) $I = \dfrac{3.0}{9.0 + 6.0} = ${dec(pl.I, 2)}$ A; $V_{wire} = ${dec(pl.Vw, 2)}$ V; $k = \dfrac{1.8}{6.0} = ${dec(pl.k, 2)}$ V m$^{-1}$.

(c) $E = kl_1 = 0.30 \times 5.00 = ${dec(pl.E, 2)}$ V; $r = R\,\dfrac{l_1 - l_2}{l_2} = 6.0 \times \dfrac{1.00}{4.00} = ${dec(pl.r, 2)}$ Ω.

(d) No: the whole wire has only 1.8 V across it, less than 2.0 V, so there is no null point. Reduce the series resistance (below ${dec(pl.Rmax, 2)} Ω) so that more than 2.0 V falls across the wire.`,
  sol: 'Principle; k; two balances; kL must exceed E.',
  scheme: [['Principle and no current drawn', 1], ['k = 0.30 V m⁻¹', 1], ['E = 1.5 V', 1], ['r = 1.5 Ω', 1], ['No: kL = 1.8 V < 2.0 V; reduce the series resistance', 1]],
  d: 4, c: 'analysis', t: [5, 6], wl: null,
}), () => (near(pl.k, 0.3) && near(pl.E, 1.5) && near(pl.r, 1.5) && pl.Vw < 2 && near(pl.Rmax, 4.5)) || 'pl');
