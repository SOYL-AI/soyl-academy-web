// ISC 12 Physics ch04 Capacitance and Dielectrics — two decks: Part 1 (t01–t03) conductors, capacitance, the parallel-plate
// capacitor and combinations; Part 2 (t04–t06) energy stored, dielectrics and a partly filled capacitor. Numbers computed here.
import { sl, deck, table, flow, svgV, plot, r, sci, dec, K, EPS0 } from '../../isc-12-physics-ch01/src/lib.mjs';
import * as G from './svgs.mjs';

// ---------------------------------------------------------------- worked-example numbers
const ex1 = { R: 0.09, Re: 6.4e6 };
ex1.C = ex1.R / K;
ex1.Ce = ex1.Re / K;
const ex2 = { A: 0.02, d: 1e-3, V: 100 };
ex2.C = (EPS0 * ex2.A) / ex2.d;
ex2.Q = ex2.C * ex2.V;
const ex3 = { C1: 6, C2: 3, C3: 4, V: 12 };
ex3.Cs = (ex3.C1 * ex3.C2) / (ex3.C1 + ex3.C2);
ex3.C = ex3.Cs + ex3.C3;
ex3.Q = ex3.C * ex3.V;
ex3.Qs = ex3.Cs * ex3.V;
ex3.V1 = ex3.Qs / ex3.C1;
ex3.V2 = ex3.Qs / ex3.C2;
ex3.Q3 = ex3.C3 * ex3.V;
const ex4 = { C: 5e-6, V: 200, E: 2e5 };
ex4.U = 0.5 * ex4.C * ex4.V ** 2;
ex4.u = 0.5 * EPS0 * ex4.E ** 2;
const ex5 = { C1: 4e-6, V1: 50, C2: 1e-6 };
ex5.V = (ex5.C1 * ex5.V1) / (ex5.C1 + ex5.C2);
ex5.Ub = 0.5 * ex5.C1 * ex5.V1 ** 2;
ex5.Ua = 0.5 * (ex5.C1 + ex5.C2) * ex5.V ** 2;
ex5.loss = ex5.Ub - ex5.Ua;
const ex6 = { C0: 10e-12, V0: 50, Kd: 5 };
const ex7 = { A: 0.01, ...G.SLAB_DATA };
ex7.C = (EPS0 * ex7.A) / (ex7.d - ex7.t + ex7.t / ex7.K);
ex7.C0 = (EPS0 * ex7.A) / ex7.d;
export const EX = { ex1, ex2, ex3, ex4, ex5, ex6, ex7 };

export const V = {
  cond: svgV(G.CONDUCTOR, 'Charged conductor with surface charge and normal field lines'),
  plates: svgV(G.PLATES, 'Parallel-plate capacitor with uniform field between the plates'),
  diel: svgV(G.DIELECTRIC, 'Dielectric slab with induced surface charges reducing the field'),
  comb: svgV(G.SERIES_PARALLEL, 'Capacitors in series and in parallel'),
  slab: svgV(G.SLAB, 'Capacitor with a dielectric slab filling half the gap', 'Drawn to scale: d = 6.0 mm, t = 3.0 mm.'),
};
export const energyPlot = plot(
  {
    x: { min: 0, max: 10, label: 'charge Q (μC)' },
    y: { min: 0, max: 5.5, label: 'potential difference V (V)' },
    functions: [{ expr: '0.5x', label: 'V = Q/C (C = 2.0 μF)', domain: [0, 10] }],
  },
  'Potential difference across a 2 microfarad capacitor against its charge: a straight line through the origin; the area under it up to charge Q is the energy stored, one half Q V',
  'Area under the V–Q line = work done in charging = ½QV.',
);
export const slabPlot = plot(
  {
    x: { min: 0, max: 1, label: 'fraction of the gap filled, t/d' },
    y: { min: 0.8, max: 4.2, label: 'C / C₀' },
    functions: [{ expr: '1/(1 - x + x/4)', label: 'slab with K = 4' }],
    hlines: [{ y: 4, label: 'fully filled: C = KC₀', dashed: true }],
  },
  'Capacitance of a parallel-plate capacitor against the fraction of the gap filled by a dielectric slab of dielectric constant 4: it rises from C nought when empty to four C nought when completely filled',
  'Half filled (t = d/2) with K = 4 gives C = 1.6 C₀.',
);
const dielTable = table(
  ['Quantity', 'Battery disconnected (Q fixed)', 'Battery connected (V fixed)'],
  [
    ['Capacitance C', '× K', '× K'],
    ['Charge Q', 'unchanged', '× K'],
    ['Potential difference V', '÷ K', 'unchanged'],
    ['Field E between plates', '÷ K', 'unchanged'],
    ['Energy U', '÷ K', '× K'],
  ],
  'Table of how capacitance, charge, potential difference, field and energy change when a dielectric of constant K fills a capacitor, with the battery disconnected and with it connected',
);

export const deck1 = deck({
  part: 1,
  title: 'Capacitance and Dielectrics — Part 1: Conductors, capacitance and combinations',
  goals: [
    'Explain why the field inside a charged conductor is zero and charge resides on its surface',
    'Define capacitance and derive the capacitance of a parallel-plate capacitor',
    'Derive and use the equivalent capacitance of series and parallel combinations',
  ],
  slides: [
    sl('title', 'Capacitance and Dielectrics', {
      b: 'Part 1 — how conductors hold charge, and the capacitor: a device that stores charge and energy.',
      v: V.plates,
      n: 'A camera flash charges up for a few seconds and then releases its energy in a thousandth of a second. A capacitor makes that possible. In this part we see how conductors behave when charged, define capacitance, find the capacitance of the simplest capacitor, two parallel plates, and learn how capacitors combine in series and in parallel.',
    }),
    sl('diagram', 'Conductors in electrostatics', {
      b: 'In a conductor at equilibrium (no current):',
      ul: ['**E = 0 inside**: otherwise the free electrons would move.', 'Any excess charge resides on the **outer surface** (Gauss’s theorem: a surface just inside encloses no charge).', 'The whole conductor is at **one potential**; just outside, **E is normal** to the surface.', '**Free charges** (conduction electrons) move through a conductor; **bound charges** in an insulator can only shift slightly within atoms.'],
      v: V.cond,
      n: 'Put extra charge on a metal and the free electrons rearrange themselves almost instantly until they stop moving. That means no field inside, for any field would push them. A Gaussian surface just inside the metal then encloses no charge, so all the extra charge sits on the outer surface. The whole body is at the same potential, and just outside the field meets the surface at right angles.',
    }),
    sl('check', 'Quick check: inside a conductor', {
      b: 'Decide whether the statement is true or false.',
      v: V.cond,
      chk: 'condfield-tf',
      n: 'What would free electrons do if there were a field inside the metal?',
    }),
    sl('concept', 'Capacitance of a conductor', {
      b: r`The potential of an isolated conductor rises in proportion to its charge. The ratio is its **capacitance**:
$$C = \dfrac{Q}{V}$$
Unit: **farad** (1 F = 1 C V⁻¹). Practical units: μF ($10^{-6}$ F), nF, pF ($10^{-12}$ F).`,
      ul: ['C depends on the size and shape of the conductor and on the surrounding medium, not on Q or V.', 'Isolated sphere of radius R: $V = kQ/R$, so $C = 4\\pi\\varepsilon_0 R$.'],
      v: V.cond,
      n: 'Pour charge onto an isolated conductor and its potential rises in step. The ratio of charge to potential is its capacitance, measured in farads, coulombs per volt. A farad is a huge unit, so we usually meet microfarads and picofarads. For a sphere of radius R the potential is k Q over R, so its capacitance is R over k, four pi epsilon nought R.',
    }),
    sl('example', 'Worked example 1: how big is a farad?', {
      b: r`Find the capacitance of (a) an isolated metal sphere of radius 9.0 cm, (b) the Earth treated as a sphere of radius 6400 km.`,
      ul: [
        r`(a) $C = 4\pi\varepsilon_0R = \dfrac{R}{k} = \dfrac{0.090}{9 \times 10^{9}} = ${sci(ex1.C, 2)}$ F = 10 pF.`,
        r`(b) $C = \dfrac{6.4 \times 10^{6}}{9 \times 10^{9}} \approx ${sci(ex1.Ce, 2)}$ F, only about 711 μF.`,
      ],
      v: table(['Conductor', 'Capacitance'], [['Sphere, R = 9 cm', '10 pF'], ['Earth, R = 6400 km', '≈ 711 μF']], 'Worked table: a 9 centimetre sphere has 10 picofarads; the whole Earth only about 711 microfarads'),
      n: 'A sphere the size of a grapefruit has a capacitance of only ten picofarads. Even the whole Earth, treated as an isolated sphere, has less than a thousandth of a farad. That is why practical capacitors use two conductors close together rather than one isolated body, as we see next.',
    }),
    sl('diagram', 'The parallel-plate capacitor', {
      b: r`Two plates of area $A$, separation $d$, charges $\pm Q$. The field between them is uniform: $E = \dfrac{\sigma}{\varepsilon_0} = \dfrac{Q}{\varepsilon_0 A}$, so $V = Ed = \dfrac{Qd}{\varepsilon_0 A}$ and
$$C = \dfrac{Q}{V} = \dfrac{\varepsilon_0 A}{d}$$`,
      ul: ['Larger plates or a smaller gap give a larger capacitance.', 'Fringing at the edges is ignored (plates large compared with d).'],
      v: V.plates,
      n: 'Bring two plates close together with equal and opposite charges. From Gauss’s theorem the field between them is sigma over epsilon nought, Q over epsilon nought A, and it is uniform. The potential difference is that field times the gap. Dividing charge by potential difference gives the capacitance, epsilon nought A over d: big plates and a tiny gap make a big capacitor.',
    }),
    sl('example', 'Worked example 2: a parallel-plate capacitor', {
      b: r`Plates of area 0.020 m² are 1.0 mm apart in air. Find the capacitance and the charge on each plate when it is connected to 100 V.`,
      ul: [
        r`Step 1 — $C = \dfrac{\varepsilon_0A}{d} = \dfrac{8.85 \times 10^{-12} \times 0.020}{1.0 \times 10^{-3}} = ${sci(ex2.C, 3)}$ F (177 pF).`,
        r`Step 2 — $Q = CV = ${sci(ex2.C, 3)} \times 100 = ${sci(ex2.Q, 3)}$ C.`,
      ],
      v: V.plates,
      n: 'Multiply epsilon nought by the area and divide by the gap: about one point seven seven times ten to the minus ten farad, a hundred and seventy seven picofarads. On a hundred volts each plate holds about eighteen nanocoulombs. Even with plates the size of an exercise book and a millimetre gap, the capacitance is small.',
    }),
    sl('check', 'Quick check: parallel-plate capacitor', {
      b: 'Choose the correct option.',
      v: V.plates,
      chk: 'halfgap-mcq',
      n: 'How does C depend on the area and on the separation?',
    }),
    sl('diagram', 'Capacitors in series', {
      b: r`In series every capacitor carries the **same charge** Q; the potential differences add: $V = V_1 + V_2 + V_3 = Q\left(\dfrac{1}{C_1} + \dfrac{1}{C_2} + \dfrac{1}{C_3}\right)$, so
$$\dfrac{1}{C_s} = \dfrac{1}{C_1} + \dfrac{1}{C_2} + \dfrac{1}{C_3}$$`,
      ul: ['The equivalent capacitance is **less than the smallest** one.', 'The **smallest** capacitor takes the **largest** share of the voltage.'],
      v: V.comb,
      n: 'In series, charge put on the first plate induces equal and opposite charges all along the chain, so every capacitor carries the same charge. The voltages add up to the supply voltage, and each is Q over its own C. Dividing by Q gives the reciprocal rule. The combination has less capacitance than any one capacitor, and the smallest capacitor takes the largest voltage.',
    }),
    sl('diagram', 'Capacitors in parallel', {
      b: r`In parallel every capacitor has the **same potential difference** V; the charges add: $Q = Q_1 + Q_2 + Q_3 = (C_1 + C_2 + C_3)V$, so
$$C_p = C_1 + C_2 + C_3$$`,
      ul: ['The equivalent capacitance is **greater than the largest** one.', 'The largest capacitor stores the most charge.'],
      v: V.comb,
      n: 'In parallel, every capacitor is connected across the same two points, so each has the full voltage. Each stores its own charge, C times V, and the charges add. So the equivalent capacitance is simply the sum. It is like widening the plates: joining capacitors in parallel always increases the capacitance.',
    }),
    sl('example', 'Worked example 3: a mixed network', {
      b: r`Capacitors $C_1 = 6\ \mu$F and $C_2 = 3\ \mu$F in series are connected in parallel with $C_3 = 4\ \mu$F across 12 V. Find the equivalent capacitance, the charge on each capacitor and the voltage across $C_1$ and $C_2$.`,
      ul: [
        r`Step 1 — series pair: $C_s = \dfrac{6 \times 3}{6 + 3} = ${dec(ex3.Cs, 2)}\ \mu$F; total $C = 2.0 + 4 = ${dec(ex3.C, 2)}\ \mu$F.`,
        r`Step 2 — $Q_3 = 4 \times 12 = ${dec(ex3.Q3, 2)}\ \mu$C; series branch $Q_1 = Q_2 = 2.0 \times 12 = ${dec(ex3.Qs, 2)}\ \mu$C.`,
        r`Step 3 — $V_1 = \dfrac{24}{6} = ${dec(ex3.V1, 2)}$ V, $V_2 = \dfrac{24}{3} = ${dec(ex3.V2, 2)}$ V (they add to 12 V).`,
      ],
      v: V.comb,
      n: 'First reduce the series pair: six and three in series give two microfarads. In parallel with four, the whole network is six microfarads. The four microfarad capacitor sees the full twelve volts and holds forty eight microcoulombs. The series branch holds twenty four microcoulombs on each capacitor, which splits the voltage as four volts and eight volts: the smaller capacitor takes more.',
    }),
    sl('check', 'Quick check: combinations', {
      b: 'Calculate the equivalent capacitance.',
      v: V.comb,
      chk: 'series-num',
      n: 'For capacitors in series, add the reciprocals.',
    }),
    sl('two-column', 'Series and parallel compared', {
      b: 'Opposite rules to resistors:',
      cols: ['**Series**\n- Same Q\n- V divides (∝ 1/C)\n- 1/C = Σ 1/Cᵢ\n- C less than smallest', '**Parallel**\n- Same V\n- Q divides (∝ C)\n- C = Σ Cᵢ\n- C greater than largest'],
      v: V.comb,
      n: 'Notice that the rules are the reverse of those for resistors. Capacitors in parallel simply add, while in series their reciprocals add. In series they share the same charge and split the voltage; in parallel they share the same voltage and split the charge. Keep this table in mind when you meet mixed networks.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Conductor', 'E = 0 inside; charge on the outer surface; one potential'],
          ['Capacitance', '$C = Q/V$; farad = C V⁻¹'],
          ['Isolated sphere', '$C = 4\\pi\\varepsilon_0R$'],
          ['Parallel plates', '$C = \\varepsilon_0A/d$'],
          ['Series', '$1/C = \\sum 1/C_i$; same Q'],
          ['Parallel', '$C = \\sum C_i$; same V'],
        ],
        'Summary table of conductors, capacitance, the sphere, the parallel-plate capacitor and series and parallel combinations',
      ),
      n: 'To sum up: a charged conductor has no field inside and all its excess charge on its surface. Capacitance is charge per volt. A parallel-plate capacitor has capacitance epsilon nought A over d. In series, capacitors carry the same charge and their reciprocals add; in parallel they share the voltage and their capacitances add.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'Derive $C = \\varepsilon_0A/d$ from $E = \\sigma/\\varepsilon_0$ and $V = Ed$.',
        'In series, find Q first (same on all), then each V = Q/C.',
        'In parallel, V is common; find each Q = CV.',
        'Keep μF and V in calculations, but state units clearly.',
      ],
      v: table(['Asked', 'Key point'], [['Why E = 0 inside a conductor?', 'Free charges would move'], ['Gap halved?', 'C doubles'], ['Two equal C in series?', 'C/2']], 'Table of common questions and the key point for each'),
      n: 'For the parallel-plate derivation, start from the field between the plates and the potential difference across the gap. In series networks, find the common charge first; in parallel ones, the common voltage. Microfarads and volts give microcoulombs directly, which saves powers of ten, but always state the units.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Capacitance and Dielectrics — Part 2: Energy and dielectrics',
  goals: [
    'Calculate the energy stored in a capacitor and the energy density of the field',
    'Explain polarisation and predict the effect of a dielectric with the battery connected or disconnected',
    'Calculate the capacitance of a capacitor partly filled with a dielectric slab',
  ],
  slides: [
    sl('title', 'Energy and dielectrics', {
      b: 'Part 2 — how much energy a capacitor stores, and how an insulating slab between the plates increases its capacitance.',
      v: V.diel,
      n: 'A charged capacitor stores energy in the electric field between its plates. In this part we find how much, and we see what happens when an insulator, a dielectric, fills the gap: its molecules respond to the field and the capacitance rises. Real capacitors are almost always filled with a dielectric, from waxed paper to ceramics.',
    }),
    sl('concept', 'Energy stored in a capacitor', {
      b: r`Charging a capacitor needs work against the growing potential difference; this work is stored as electric potential energy:
$$U = \dfrac{1}{2}CV^2 = \dfrac{1}{2}QV = \dfrac{Q^2}{2C}$$`,
      ul: ['On the V–Q graph (a straight line), U is the area under the line.', 'The energy is stored in the **field** between the plates: energy density $u = \\dfrac{1}{2}\\varepsilon_0E^2$ (J m⁻³).'],
      v: energyPlot,
      n: 'As charge is added, the voltage across the capacitor rises in proportion, so each extra bit of charge needs more work than the last. The total work is the area under the straight voltage-charge line, one half Q V, which can also be written one half C V squared or Q squared over two C. This energy lives in the electric field between the plates, one half epsilon nought E squared in every cubic metre.',
    }),
    sl('example', 'Worked example 4: energy stored and energy density', {
      b: r`(a) Find the energy stored in a 5.0 μF capacitor charged to 200 V. (b) Find the energy density in a field of $2.0 \times 10^{5}$ V m$^{-1}$ in air.`,
      ul: [
        r`(a) $U = \tfrac12CV^2 = 0.5 \times 5.0 \times 10^{-6} \times (200)^2 = ${dec(ex4.U, 2)}$ J.`,
        r`(b) $u = \tfrac12\varepsilon_0E^2 = 0.5 \times 8.85 \times 10^{-12} \times (2.0 \times 10^{5})^2 \approx ${dec(ex4.u, 3)}$ J m$^{-3}$.`,
      ],
      v: energyPlot,
      n: 'One half times five microfarads times two hundred squared gives a tenth of a joule, enough for a small camera flash. The energy density of a strong field of two hundred thousand volts per metre in air is only about point one eight joule per cubic metre, which is why practical capacitors need tiny gaps and large plate areas.',
    }),
    sl('example', 'Worked example 5: sharing charge between capacitors', {
      b: r`A 4.0 μF capacitor charged to 50 V is connected across an uncharged 1.0 μF capacitor. Find the common potential and the energy lost.`,
      ul: [
        r`Step 1 — charge is conserved: $V = \dfrac{C_1V_1}{C_1 + C_2} = \dfrac{4.0 \times 50}{5.0} = ${dec(ex5.V, 2)}$ V.`,
        r`Step 2 — before: $U = \tfrac12 \times 4.0 \times 10^{-6} \times 50^2 = ${sci(ex5.Ub, 2)}$ J; after: $\tfrac12 \times 5.0 \times 10^{-6} \times 40^2 = ${sci(ex5.Ua, 2)}$ J.`,
        r`Step 3 — energy lost $= ${sci(ex5.loss, 2)}$ J, as heat in the wires (and a little radiation).`,
      ],
      v: energyPlot,
      n: 'When the capacitors are joined, charge flows until both are at the same voltage. The total charge, two hundred microcoulombs, now sits on five microfarads, so the common voltage is forty volts. But the energy falls from five millijoules to four. One millijoule is lost as heat in the connecting wires, whatever their resistance: sharing charge always wastes energy.',
    }),
    sl('check', 'Quick check: energy', {
      b: 'Choose the correct option.',
      v: energyPlot,
      chk: 'doubleV-mcq',
      n: 'How does the stored energy depend on the voltage?',
    }),
    sl('diagram', 'Dielectrics and polarisation', {
      b: 'In a field, the molecules of a dielectric become (or line up as) **dipoles**: the dielectric is **polarised**. Inside, the dipoles cancel, but **bound surface charges** appear: negative facing the + plate, positive facing the − plate.',
      ul: ['These induced charges set up a field **opposing** the applied one, so the field inside falls from $E_0$ to $E = E_0/K$.', '**Polar** molecules (H₂O) have permanent dipoles that align; **non-polar** molecules become induced dipoles.'],
      v: V.diel,
      n: 'Place an insulator in a field. Its molecules either already are tiny dipoles, like water, and partly line up, or they become dipoles as the field pulls their electrons one way and nuclei the other. Inside the material the charges of neighbouring dipoles cancel, but on the faces a layer of bound charge appears, negative next to the positive plate. Its field opposes the applied field and reduces it by the factor K.',
    }),
    sl('concept', 'Dielectric constant', {
      b: r`With a dielectric filling the gap, the capacitance increases by the factor $K$ (the **dielectric constant**, or relative permittivity $\varepsilon_r$):
$$K = \dfrac{C'}{C_0} = \dfrac{\varepsilon}{\varepsilon_0} = \varepsilon_r,\qquad C' = \dfrac{K\varepsilon_0A}{d}$$`,
      ul: ['K = 1 for vacuum; about 2–3 for paper, plastics and oil; about 80 for water.', 'A dielectric also lets the capacitor withstand a higher voltage without sparking.'],
      v: V.diel,
      n: 'Because the dielectric reduces the field, and so the voltage, for the same charge, the capacitance goes up. The factor is the dielectric constant K, the ratio of the permittivity of the material to that of free space. Plastics and oils have K of two or three; water about eighty. A dielectric also stops sparking between the plates, so the capacitor can work at higher voltages.',
    }),
    sl('diagram', 'Inserting a dielectric: battery disconnected or connected', {
      b: 'Fill a charged capacitor completely with a dielectric of constant K:',
      v: dielTable,
      ul: ['**Disconnected:** Q cannot change, so V and U fall; the capacitor pulls the slab in.', '**Connected:** V is held fixed, so extra charge flows from the battery and U rises.'],
      n: 'What changes depends on whether the battery stays connected. If it is disconnected, the charge is trapped, so the voltage and the field fall by K and so does the stored energy. If the battery stays connected, the voltage cannot change, so the battery pushes in K times as much charge, and the stored energy rises by K. In both cases the capacitance is multiplied by K.',
    }),
    sl('example', 'Worked example 6: two ways to add a dielectric', {
      b: r`A 10 pF air capacitor is charged to 50 V. A dielectric of K = 5 then fills the gap. Find Q, V and U (a) with the battery disconnected, (b) with it connected.`,
      ul: [
        r`Initially $Q_0 = 10 \times 10^{-12} \times 50 = 5.0 \times 10^{-10}$ C and $U_0 = \tfrac12 \times 10 \times 10^{-12} \times 50^2 = 1.25 \times 10^{-8}$ J; with the slab $C = 50$ pF.`,
        r`(a) $Q = 5.0 \times 10^{-10}$ C, $V = \dfrac{50}{5} = 10$ V, $U = \dfrac{1.25 \times 10^{-8}}{5} = 2.5 \times 10^{-9}$ J.`,
        r`(b) $V = 50$ V, $Q = 50 \times 10^{-12} \times 50 = 2.5 \times 10^{-9}$ C, $U = 5 \times 1.25 \times 10^{-8} = 6.25 \times 10^{-8}$ J.`,
      ],
      v: dielTable,
      n: 'Start with half a nanocoulomb on ten picofarads at fifty volts. With the slab in place the capacitance becomes fifty picofarads. If the battery is gone, the charge stays put, so the voltage drops to ten volts and the energy to a fifth. If the battery is still there, the voltage stays at fifty volts and the charge grows five times, as does the energy.',
    }),
    sl('diagram', 'A partly filled capacitor', {
      b: r`A slab of thickness $t < d$ and constant K: the field is $E_0$ in the air and $E_0/K$ in the slab, so $V = E_0(d - t) + \dfrac{E_0}{K}t$. With $E_0 = \dfrac{Q}{\varepsilon_0A}$:
$$C = \dfrac{\varepsilon_0A}{d - t + \dfrac{t}{K}}$$`,
      ul: ['t = 0: $C_0 = \\varepsilon_0A/d$; t = d: $C = K\\varepsilon_0A/d$.', 'A metal slab (K → ∞) gives $C = \\varepsilon_0A/(d - t)$.'],
      v: V.slab,
      n: 'If the slab fills only part of the gap, the field in the air is unchanged at E nought, while in the slab it is E nought over K. Adding the two voltage drops and dividing the charge by the total gives epsilon nought A over d minus t plus t over K. When t is zero we get back the air capacitor; when the slab fills the gap we get K times it.',
    }),
    sl('example', 'Worked example 7: half filled with a slab', {
      b: r`A capacitor has plates of area 0.010 m², 6.0 mm apart. A slab 3.0 mm thick with K = 4 is inserted. Find the capacitance with and without the slab.`,
      ul: [
        r`Without: $C_0 = \dfrac{8.85 \times 10^{-12} \times 0.010}{6.0 \times 10^{-3}} \approx ${sci(ex7.C0, 3)}$ F.`,
        r`With: $C = \dfrac{8.85 \times 10^{-14}}{0.0060 - 0.0030 + 0.0030/4} = \dfrac{8.85 \times 10^{-14}}{3.75 \times 10^{-3}} = ${sci(ex7.C, 3)}$ F, i.e. ${dec(ex7.C / ex7.C0, 2)} times $C_0$.`,
      ],
      v: slabPlot,
      n: 'The empty capacitor has about fifteen picofarads. With the slab, the effective gap is the three millimetres of air plus three millimetres divided by four, three point seven five millimetres in all, so the capacitance rises to about twenty four picofarads, one point six times the empty value, exactly as the graph shows for a half-filled gap.',
    }),
    sl('check', 'Quick check: a partial slab', {
      b: 'Calculate the capacitance.',
      v: slabPlot,
      chk: 'slab-num',
      n: 'Replace the gap by the effective gap d minus t plus t over K.',
    }),
    sl('check', 'Quick check: dielectric with battery disconnected', {
      b: 'Judge the assertion and the reason.',
      v: dielTable,
      chk: 'disconnected-ar',
      n: 'With the battery removed, which quantity stays fixed?',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Energy stored', '$U = \\tfrac12CV^2 = \\tfrac12QV = Q^2/2C$'],
          ['Energy density', '$u = \\tfrac12\\varepsilon_0E^2$'],
          ['Sharing charge', 'Common V = ΣCᵢVᵢ/ΣCᵢ; energy is lost'],
          ['Dielectric', 'Polarised; E inside ÷ K; $C\' = KC_0$'],
          ['Battery off / on', 'Q fixed: V, E, U ÷ K / V fixed: Q, U × K'],
          ['Partial slab', '$C = \\varepsilon_0A/(d - t + t/K)$'],
        ],
        'Summary table of stored energy, energy density, charge sharing, dielectric effects with the battery on or off, and the partly filled capacitor',
      ),
      n: 'To sum up: a capacitor stores one half C V squared, an energy density of one half epsilon nought E squared in its field, and sharing charge between capacitors always loses some energy. A dielectric polarises, reducing the field and multiplying the capacitance by K. With the battery off the charge is fixed; with it on the voltage is fixed. A partial slab gives epsilon nought A over d minus t plus t over K.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Choose the energy formula that uses the quantity that stays fixed.',
        'Battery connected or disconnected: decide first whether Q or V is constant.',
        'In charge-sharing problems, conserve charge, not energy.',
        'Partial slab: write the effective gap $d - t + t/K$.',
      ],
      v: table(['Asked', 'Key point'], [['V doubled: energy?', '× 4'], ['Dielectric, battery off: energy?', '÷ K'], ['Metal slab of thickness t?', 'C = ε₀A/(d − t)']], 'Table of common questions and the key point for each'),
      n: 'Pick the energy formula that suits the problem: if the charge is fixed, use Q squared over two C; if the voltage is fixed, one half C V squared. Always decide first whether the battery is connected. When capacitors share charge, conserve the charge; the energy is not conserved. And for a partly filled capacitor, think of the effective gap.',
    }),
  ],
});
