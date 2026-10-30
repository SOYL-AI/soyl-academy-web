// ch13 Nuclei — two decks: Part 1 (t01–t02) composition, size and density of nuclei, the nuclear force, mass–energy,
// mass defect and binding energy; Part 2 (t03) fission and fusion explained with the binding-energy curve.
// Binding energies are computed from atomic masses (mH = 1.007825 u, mn = 1.008665 u, 1 u = 931.5 MeV/c²).
import { sl, deck, table, flow, svgV, plot, r, sci, dec } from '../../cbse-12-physics-ch01/src/lib.mjs';
import * as G from './svgs.mjs';

export const U_MEV = 931.5;
export const MH = 1.007825;
export const MN = 1.008665;
export const MP = 1.007276;
export const U_KG = 1.6605e-27;
export const NA = 6.02e23;
export const MASS = { H2: 2.014102, H3: 3.016049, He4: 4.002603, Li7: 7.016003, C12: 12.0, O16: 15.994915, Fe56: 55.934936, Ba141: 140.914411, Kr92: 91.926156, U235: 235.043928, U238: 238.050788 };
export const BE = (Z, A, m) => (Z * MH + (A - Z) * MN - m) * U_MEV; // MeV
export const DM = (Z, A, m) => Z * MH + (A - Z) * MN - m; // u

// ---------------------------------------------------------------- worked-example numbers
const ex1 = { A: 56 };
ex1.R = G.R0 * Math.cbrt(ex1.A);
ex1.rho = U_KG / ((4 / 3) * Math.PI * (G.R0 * 1e-15) ** 3);
const ex2 = { dm: DM(2, 4, MASS.He4) };
ex2.B = ex2.dm * U_MEV;
ex2.perA = ex2.B / 4;
const ex3 = { c: 2.998e8, e: 1.6022e-19 };
ex3.E = (U_KG * ex3.c ** 2) / (ex3.e * 1e6);
const ex4 = {};
ex4.dm = MASS.U235 + MN - (MASS.Ba141 + MASS.Kr92 + 3 * MN);
ex4.Q = ex4.dm * U_MEV;
const ex5 = { A: 236, bU: 7.6, bP: 8.5 };
ex5.Q = ex5.A * (ex5.bP - ex5.bU);
const ex6 = {};
ex6.dm = MASS.H2 + MASS.H3 - MASS.He4 - MN;
ex6.Q = ex6.dm * U_MEV;
ex6.perN = ex6.Q / 5;
const ex7 = { g: 1, Q: 200 };
ex7.N = (ex7.g / 235) * NA;
ex7.EJ = ex7.N * ex7.Q * 1.6e-13;
export const EX = { ex1, ex2, ex3, ex4, ex5, ex6, ex7 };

export const V = {
  sizes: svgV(G.SIZES, 'Nuclei of He-4, C-12, Fe-56 and U-238 drawn to scale with R = R₀A^(1/3)'),
  fission: svgV(G.FISSION, 'Fission of uranium-235 by a slow neutron into barium-141, krypton-92 and three neutrons'),
  fusion: svgV(G.FUSION, 'Fusion of deuterium and tritium into helium-4 and a neutron'),
};

// ---------------------------------------------------------------- binding-energy curve (computed)
const semf = [];
for (let A = 12; A <= 240; A += 4) {
  const Z = Math.round(A / (2 + 0.0154 * A ** (2 / 3)));
  const B = 15.8 * A - 18.3 * A ** (2 / 3) - (0.714 * Z * (Z - 1)) / A ** (1 / 3) - (23.2 * (A - 2 * Z) ** 2) / A;
  semf.push([A, Number((B / A).toFixed(3))]);
}
export const NUCLIDES = [
  ['²H', 1, 2, MASS.H2], ['⁴He', 2, 4, MASS.He4], ['⁷Li', 3, 7, MASS.Li7], ['¹²C', 6, 12, MASS.C12], ['¹⁶O', 8, 16, MASS.O16], ['⁵⁶Fe', 26, 56, MASS.Fe56], ['⁹²Kr', 36, 92, MASS.Kr92], ['¹⁴¹Ba', 56, 141, MASS.Ba141], ['²³⁵U', 92, 235, MASS.U235], ['²³⁸U', 92, 238, MASS.U238],
].map(([name, Z, A, m]) => ({ name, Z, A, m, perA: BE(Z, A, m) / A }));
export const beCurve = plot(
  {
    x: { min: 0, max: 250, label: 'mass number A' },
    y: { min: 0, max: 10, label: 'binding energy per nucleon (MeV)' },
    series: [
      { label: 'smooth trend (semi-empirical formula)', kind: 'line', points: semf },
      { label: 'nuclides (from measured masses)', kind: 'scatter', points: NUCLIDES.map((n) => [n.A, Number(n.perA.toFixed(3))]) },
    ],
  },
  'Binding energy per nucleon against mass number: it rises steeply for light nuclei, peaks at about 8.8 megaelectronvolts near iron-56, then falls slowly to about 7.6 for uranium; points for deuterium, helium-4, lithium-7, carbon-12, oxygen-16, iron-56, krypton-92, barium-141, uranium-235 and uranium-238 are computed from their masses',
  'Fusion of light nuclei and fission of heavy nuclei both move towards the peak, so both release energy.',
);
export const forcePlot = plot(
  {
    x: { min: 0, max: 4, label: 'separation r between two nucleons (fm)' },
    y: { min: -100, max: 150, label: 'potential energy (MeV, schematic)' },
    functions: [{ expr: '16000exp(-5x) - 2400exp(-2.6x)', label: 'nuclear potential energy of two nucleons', domain: [0.68, 4] }],
    hlines: [{ y: 0, dashed: true }],
  },
  'Schematic potential energy of two nucleons against separation: strongly repulsive closer than about 0.8 femtometre, a deep attractive well with its minimum near 1 femtometre, and almost zero beyond about 3 femtometres',
  'Attractive between about 0.8 fm and a few fm, repulsive at shorter range; negligible beyond a few fm (short range).',
);

const termsTable = table(
  ['Term', 'Meaning', 'Example'],
  [
    ['Isotopes', 'Same Z, different A', '¹²C and ¹⁴C'],
    ['Isobars', 'Same A, different Z', '³H and ³He'],
    ['Isotones', 'Same N = A − Z, different Z', '¹⁹⁸Hg and ¹⁹⁷Au (N = 118)'],
  ],
  'Table defining isotopes, isobars and isotones with an example of each',
);

export const deck1 = deck({
  part: 1,
  title: 'Nuclei — Part 1: Composition, size, nuclear force and binding energy',
  goals: [
    'Describe the composition and size of nuclei and the properties of the nuclear force',
    'Use E = mc² to relate mass defect to binding energy',
    'Interpret the binding energy per nucleon curve',
  ],
  slides: [
    sl('title', 'Nuclei', {
      b: 'Part 1 — what a nucleus is made of, how big and dense it is, what holds it together, and where nuclear energy comes from.',
      v: V.sizes,
      n: 'Almost all the mass of every atom sits in its nucleus, a few femtometres across. In this part we look at what nuclei are made of, how their size depends on the number of nucleons, the extraordinary force that holds them together, and why a nucleus weighs less than the particles that make it. That missing mass is the source of nuclear energy.',
    }),
    sl('concept', 'Composition of the nucleus', {
      b: 'A nucleus contains **protons** (charge $+e$) and **neutrons** (no charge), together called **nucleons**.',
      ul: ['**Atomic number** $Z$ = number of protons; **mass number** $A$ = number of nucleons; **neutron number** $N = A - Z$. Notation: ${}^{A}_{Z}\\text{X}$.', 'Atomic masses are measured in **unified atomic mass units**: $1\\ \\text{u} = \\tfrac{1}{12}$ of the mass of a ¹²C atom $= 1.6605 \\times 10^{-27}$ kg.', '$m_p = 1.007276$ u, $m_n = 1.008665$ u (the neutron, discovered by Chadwick in 1932, is slightly heavier).'],
      v: termsTable,
      n: 'Every nucleus is made of protons and neutrons, called nucleons. The atomic number Z counts the protons and fixes the element; the mass number A counts all the nucleons. Nuclear masses are measured in unified atomic mass units, one twelfth of the mass of a carbon-twelve atom. Nuclei with the same Z but different A are isotopes; with the same A but different Z, isobars; with the same neutron number, isotones.',
    }),
    sl('diagram', 'Size of the nucleus', {
      b: r`Scattering experiments show that the nuclear radius grows with mass number as
$$R = R_0 A^{1/3},\qquad R_0 \approx 1.2\ \text{fm} = 1.2 \times 10^{-15}\ \text{m}$$`,
      ul: ['So the **volume** $\\propto R^3 \\propto A$: each nucleon occupies about the same volume.', 'Uranium-238 has 60 times as many nucleons as helium-4 but is only about 3.9 times wider.'],
      v: V.sizes,
      n: 'Measurements show that the radius of a nucleus is R nought times A to the power one third, with R nought about one point two femtometres. Cubing both sides, the volume is proportional to A: nucleons are packed like marbles in a bag, each taking the same space. That is why a uranium nucleus with sixty times as many nucleons as helium is only about four times as wide.',
    }),
    sl('example', 'Worked example 1: size and density', {
      b: r`Find the radius of an iron-56 nucleus and the density of nuclear matter. (Take $R_0 = 1.2$ fm and the mass of a nucleon as 1 u $= 1.66 \times 10^{-27}$ kg.)`,
      ul: [
        r`Step 1 — $R = 1.2 \times 56^{1/3} \approx ${dec(ex1.R, 3)}$ fm.`,
        r`Step 2 — $\rho = \dfrac{Am_u}{\tfrac{4}{3}\pi R_0^3 A} = \dfrac{1.66 \times 10^{-27}}{\tfrac{4}{3}\pi(1.2 \times 10^{-15})^3} \approx ${sci(ex1.rho, 2)}$ kg m$^{-3}$.`,
        'Meaning — A cancels: every nucleus has about the same density, roughly 10¹⁴ times that of water.',
      ],
      v: V.sizes,
      n: 'The cube root of fifty six is about three point eight three, so the iron nucleus has a radius of about four point six femtometres. For the density, the mass is A nucleon masses and the volume is four thirds pi R nought cubed times A, so A cancels. The density comes out at about two times ten to the seventeen kilograms per cubic metre. A teaspoon of nuclear matter would weigh about a billion tonnes.',
    }),
    sl('concept', 'The nuclear force', {
      b: 'Protons repel each other strongly at nuclear distances, yet nuclei hold together. The **nuclear force** between nucleons:',
      ul: ['is **much stronger** than the electrostatic force at nuclear distances;', 'is **short-range**: strong attraction at about 1 fm, negligible beyond a few fm; it becomes **repulsive** below about 0.8 fm;', 'is **charge-independent**: p–p, n–n and p–n forces are nearly the same;', 'acts only between neighbouring nucleons (**saturation**).'],
      v: forcePlot,
      n: 'Two protons a femtometre apart repel each other with a force of over a hundred newtons, enormous for such tiny particles. Something stronger must hold them in. The nuclear force is very strong but acts only over a few femtometres. It pulls nucleons together near one femtometre and pushes them apart if they get closer than about point eight. It treats protons and neutrons alike.',
    }),
    sl('check', 'Quick check: nuclear force', {
      b: 'Choose the correct option.',
      v: forcePlot,
      chk: 'range-mcq',
      n: 'Recall the range of the nuclear force compared with the size of a nucleus.',
    }),
    sl('concept', 'Mass and energy', {
      b: r`Einstein: mass and energy are equivalent, $$E = mc^2$$ A mass of 1 u is equivalent to about 931.5 MeV.`,
      ul: ['In nuclear reactions, the **total mass–energy** is conserved; a decrease in mass appears as kinetic energy or radiation.', '$1$ MeV $= 1.6 \\times 10^{-13}$ J.'],
      v: flow('LR', [['m', 'Mass lost Δm'], ['e', 'Energy E = Δm c²'], ['k', 'Kinetic energy, radiation']], [['m', 'e'], ['e', 'k']], 'Flow: mass lost in a nuclear process appears as energy equal to the mass times c squared, carried away as kinetic energy or radiation'),
      n: 'Einstein showed that mass itself is a form of energy, with E equal to m c squared. Because c squared is so large, a tiny mass corresponds to a huge energy. In nuclear physics it is convenient to remember that one atomic mass unit is equivalent to about nine hundred and thirty one point five mega electronvolts. In a nuclear reaction, any mass that disappears comes out as energy.',
    }),
    sl('example', 'Worked example 2: the energy equivalent of 1 u', {
      b: r`Show that 1 u is equivalent to about 931.5 MeV. (1 u $= 1.6605 \times 10^{-27}$ kg, $c = 2.998 \times 10^{8}$ m s$^{-1}$, $e = 1.6022 \times 10^{-19}$ C.)`,
      ul: [
        r`Step 1 — $E = mc^2 = 1.6605 \times 10^{-27} \times (2.998 \times 10^{8})^2 \approx ${sci(U_KG * ex3.c ** 2, 4)}$ J.`,
        r`Step 2 — $\dfrac{${sci(U_KG * ex3.c ** 2, 4)}}{1.6022 \times 10^{-13}} \approx ${dec(ex3.E, 4)}$ MeV.`,
      ],
      v: table(['Mass', 'Energy'], [['1 u', '≈ 931.5 MeV'], ['1 kg', '9 × 10¹⁶ J'], ['1 g', '9 × 10¹³ J']], 'Table of energy equivalents: one atomic mass unit about 931.5 megaelectronvolts, one kilogram nine times ten to the sixteen joules, one gram nine times ten to the thirteen joules'),
      n: 'Multiply one atomic mass unit in kilograms by the speed of light squared to get about one point four nine times ten to the minus ten joule. Divide by the number of joules in one mega electronvolt, one point six times ten to the minus thirteen, and you get about nine hundred and thirty one point five. A single gram of matter, completely converted, would give nine times ten to the thirteen joules.',
    }),
    sl('concept', 'Mass defect and binding energy', {
      b: r`A nucleus has **less mass** than its separate nucleons. The **mass defect** is
$$\Delta M = [Zm_p + (A - Z)m_n] - M_\text{nucleus}$$
The **binding energy** $E_b = \Delta M c^2$ is the energy needed to separate the nucleus into free nucleons (or released when it forms).`,
      ul: ['Using **atomic** masses, use $m_\\text{H} = 1.007825$ u in place of $m_p$ so that the electrons cancel.', 'Binding energy per nucleon $E_{bn} = E_b/A$ measures how tightly the nucleons are held.'],
      v: V.sizes,
      n: 'Weigh a helium nucleus and you find it is lighter than two protons and two neutrons weighed separately. This mass defect, times c squared, is the binding energy: the energy given out when the nucleus forms, and the energy you would have to supply to pull it apart. Dividing by the number of nucleons gives the binding energy per nucleon, the best measure of how stable a nucleus is.',
    }),
    sl('example', 'Worked example 3: helium-4', {
      b: r`The atomic mass of $\,{}^{4}_{2}\text{He}$ is 4.002603 u. Find its mass defect, binding energy and binding energy per nucleon. ($m_\text{H} = 1.007825$ u, $m_n = 1.008665$ u.)`,
      ul: [
        r`Step 1 — $2m_\text{H} + 2m_n = 2 \times 1.007825 + 2 \times 1.008665 = 4.032980$ u; $\Delta M = 4.032980 - 4.002603 = ${dec(ex2.dm, 4)}$ u.`,
        r`Step 2 — $E_b = ${dec(ex2.dm, 4)} \times 931.5 \approx ${dec(ex2.B, 3)}$ MeV.`,
        r`Step 3 — $E_{bn} = \dfrac{${dec(ex2.B, 3)}}{4} \approx ${dec(ex2.perA, 3)}$ MeV per nucleon.`,
      ],
      v: beCurve,
      n: 'Two hydrogen atoms and two neutrons have a total mass of four point zero three three atomic mass units, but a helium-four atom has only four point zero zero three. The difference, about point zero three zero four, times nine hundred and thirty one point five, is a binding energy of about twenty eight megaelectronvolts, or about seven megaelectronvolts per nucleon. Helium-four is unusually tightly bound for such a light nucleus.',
    }),
    sl('diagram', 'The binding energy per nucleon curve', {
      b: 'Binding energy per nucleon against mass number:',
      ul: ['Rises steeply for light nuclei (²H only 1.1 MeV); helium-4, carbon-12 and oxygen-16 stand out above the trend.', 'Roughly **constant at about 8 MeV** for 30 < A < 170, with a **peak of about 8.8 MeV** near A = 56 (iron).', 'Falls slowly for heavy nuclei to about 7.6 MeV for uranium.'],
      v: beCurve,
      n: 'Plot binding energy per nucleon against mass number and you get one of the most important graphs in physics. It rises steeply through the light nuclei, flattens out at about eight megaelectronvolts, peaks near iron at about eight point eight, and then falls gently to about seven point six for uranium. Nuclei near the peak are the most tightly bound and the most stable.',
    }),
    sl('concept', 'Reading the curve', {
      b: 'What the shape tells us:',
      ul: ['**Nearly constant** $E_{bn}$ in the middle: each nucleon interacts only with its **neighbours** (short range, saturation).', 'Heavy nuclei: the long-range **Coulomb repulsion** of many protons lowers $E_{bn}$.', '**Fission** of a heavy nucleus into two middle-sized ones, and **fusion** of light nuclei, both move towards the peak and so **release energy** (Part 2).'],
      v: beCurve,
      n: 'If every nucleon attracted every other one, the binding energy per nucleon would keep growing with A. Instead it levels off, because each nucleon only feels its near neighbours. In heavy nuclei the electrical repulsion between many protons, which does act across the whole nucleus, pulls the curve down. Anything that moves nuclei towards the peak near iron releases energy.',
    }),
    sl('check', 'Quick check: binding energy', {
      b: 'Calculate the binding energy per nucleon.',
      v: beCurve,
      chk: 'O16-num',
      n: 'Find the mass defect, multiply by nine hundred and thirty one point five, and divide by sixteen.',
    }),
    sl('check', 'Quick check: the curve', {
      b: 'Judge the assertion and the reason.',
      v: beCurve,
      chk: 'iron-ar',
      n: 'Where on the curve is the binding energy per nucleon greatest?',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Composition', 'Z protons, A − Z neutrons'],
          ['Size', '$R = R_0A^{1/3}$, $R_0 \\approx 1.2$ fm; density ≈ 2.3 × 10¹⁷ kg m⁻³ for all nuclei'],
          ['Nuclear force', 'Strong, short-range, charge-independent, repulsive below 0.8 fm'],
          ['Mass–energy', '$E = mc^2$; 1 u ≈ 931.5 MeV'],
          ['Binding energy', '$E_b = \\Delta M c^2$, $\\Delta M = Zm_\\text{H} + (A - Z)m_n - M$'],
          ['BE curve', 'Peak ≈ 8.8 MeV near A = 56; ≈ 7.6 MeV for U'],
        ],
        'Summary table of nuclear composition, size and density, the nuclear force, mass–energy equivalence, binding energy and the binding-energy curve',
      ),
      n: 'To sum up: a nucleus has Z protons and A minus Z neutrons, a radius R nought A to the one third, and the same huge density whatever its size. A strong, short-range nuclear force holds it together. Its mass is less than that of its nucleons, and the mass defect times c squared is the binding energy. Binding energy per nucleon peaks near iron at about eight point eight megaelectronvolts.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'With atomic masses, use $m_\\text{H}$, not $m_p$, so electron masses cancel.',
        'Keep 5–6 decimal places in mass sums; round only the final answer.',
        'Convert with 1 u = 931.5 MeV; 1 MeV = 1.6 × 10⁻¹³ J.',
        'Sketch the BE curve with labelled peak (≈ 8.8 MeV, A ≈ 56) and say what it implies for fission and fusion.',
      ],
      v: table(['Asked', 'Key point'], [['Why same density for all nuclei?', 'R³ ∝ A'], ['Why curve flat?', 'Short range, saturation'], ['Why falls for heavy nuclei?', 'Coulomb repulsion of protons']], 'Table of common questions and the key point for each'),
      n: 'Mass defect questions are easy marks if you are careful with decimals: keep all the digits until the end, and if you are given atomic masses, use the hydrogen atom mass so the electrons cancel. Remember the conversion, nine hundred and thirty one point five megaelectronvolts per atomic mass unit. And practise sketching the binding energy curve with its peak near iron.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Nuclei — Part 2: Fission and fusion',
  goals: [
    'Explain nuclear fission and estimate the energy released using binding energies or masses',
    'Explain nuclear fusion and why it needs very high temperatures',
    'Use the binding-energy curve to explain why both processes release energy',
  ],
  slides: [
    sl('title', 'Fission and fusion', {
      b: 'Part 2 — splitting heavy nuclei and joining light ones: the two ways to unlock nuclear energy.',
      v: beCurve,
      n: 'Look again at the binding energy curve. Heavy nuclei at the right and light nuclei at the left are both less tightly bound than those in the middle. So splitting a uranium nucleus releases energy, and so does joining two hydrogen nuclei. In this part we see how fission powers nuclear reactors, and how fusion powers the Sun.',
    }),
    sl('diagram', 'Nuclear fission', {
      b: r`A slow neutron absorbed by $\,{}^{235}\text{U}$ makes an unstable $\,{}^{236}\text{U}$ nucleus that splits into two medium-mass fragments and 2–3 neutrons, for example
$$\,{}^{1}_{0}\text{n} + {}^{235}_{92}\text{U} \to {}^{141}_{56}\text{Ba} + {}^{92}_{36}\text{Kr} + 3\,{}^{1}_{0}\text{n} + Q$$`,
      ul: ['Nucleon number and charge are conserved: $1 + 235 = 141 + 92 + 3$ and $92 = 56 + 36$.', 'About **200 MeV** is released per fission, mostly as kinetic energy of the fragments.'],
      v: V.fission,
      n: 'When a slow neutron is captured by uranium-two-three-five, the nucleus becomes uranium-two-three-six in an excited, wobbling state and splits into two lighter nuclei, such as barium and krypton, throwing out two or three neutrons. Check the numbers: nucleons and charges balance. About two hundred megaelectronvolts are released each time, around fifty million times more than in burning one carbon atom.',
    }),
    sl('example', 'Worked example 4: Q of a fission from masses', {
      b: r`Find the energy released in $\text{n} + {}^{235}\text{U} \to {}^{141}\text{Ba} + {}^{92}\text{Kr} + 3\text{n}$. Atomic masses: U-235 235.043928 u, Ba-141 140.914411 u, Kr-92 91.926156 u; $m_n = 1.008665$ u.`,
      ul: [
        r`Step 1 — mass before $= 235.043928 + 1.008665 = 236.052593$ u; after $= 140.914411 + 91.926156 + 3 \times 1.008665 = 235.866562$ u.`,
        r`Step 2 — $\Delta m = ${dec(ex4.dm, 4)}$ u; $Q = ${dec(ex4.dm, 4)} \times 931.5 \approx ${dec(ex4.Q, 3)}$ MeV.`,
        'Note — the fragments later decay, releasing more energy: about 200 MeV in all.',
      ],
      v: V.fission,
      n: 'Add up the masses before and after. The uranium and the neutron have a mass of two hundred and thirty six point zero five three atomic mass units; the barium, krypton and three neutrons have about two hundred and thirty five point eight six seven. The missing point one eight six atomic mass units appear as about one hundred and seventy three megaelectronvolts straight away, with more coming from the radioactive fragments later.',
    }),
    sl('example', 'Worked example 5: fission from the BE curve', {
      b: r`Estimate the energy released when a nucleus with $A = 236$ ($E_{bn} \approx 7.6$ MeV) splits into two fragments with $E_{bn} \approx 8.5$ MeV.`,
      ul: [
        r`Step 1 — total binding energy rises from $236 \times 7.6$ to $236 \times 8.5$ MeV.`,
        r`Step 2 — $Q \approx 236 \times (8.5 - 7.6) = ${dec(ex5.Q, 3)}$ MeV, about 200 MeV.`,
      ],
      v: beCurve,
      n: 'The total number of nucleons stays at two hundred and thirty six, but each one becomes more tightly bound, by about point nine megaelectronvolts, as the heavy nucleus splits into two middle-sized ones. Multiply: about two hundred and ten megaelectronvolts. This quick estimate agrees well with the measured value of about two hundred.',
    }),
    sl('check', 'Quick check: energy from the curve', {
      b: 'Estimate the energy released.',
      v: beCurve,
      chk: 'fissionQ-num',
      n: 'Multiply the number of nucleons by the gain in binding energy per nucleon.',
    }),
    sl('concept', 'Chain reaction and reactors', {
      b: 'The 2–3 neutrons from each fission can cause further fissions: a **chain reaction**.',
      ul: ['**Uncontrolled** (each fission triggers more than one more): an explosion, as in an atom bomb.', '**Controlled** (on average exactly one more): steady power in a **nuclear reactor**. A **moderator** (heavy water, graphite) slows the neutrons; **control rods** (cadmium, boron) absorb extra neutrons; a **coolant** carries the heat to turbines.', 'India runs pressurised heavy-water reactors, for example at Kaiga and Rawatbhata.'],
      v: flow('LR', [['n', 'Neutron'], ['f', 'Fission: 2–3 neutrons'], ['m', 'Moderator slows them'], ['c', 'Control rods absorb extras'], ['s', 'Steady power']], [['n', 'f'], ['f', 'm'], ['m', 'c'], ['c', 's']], 'Flow of a controlled chain reaction: a neutron causes fission releasing two or three neutrons, the moderator slows them, control rods absorb the extras, giving steady power'),
      n: 'Each fission releases two or three neutrons, and each of those can split another uranium nucleus. If every fission leads to more than one new fission, the reaction grows explosively. In a reactor it is held at exactly one: a moderator slows the neutrons so they are captured easily, and control rods soak up the extras. The heat is carried away to make steam and drive turbines.',
    }),
    sl('check', 'Quick check: fission products', {
      b: 'Choose the correct option.',
      v: V.fission,
      chk: 'balance-mcq',
      n: 'Balance the nucleon numbers and the charges on both sides.',
    }),
    sl('diagram', 'Nuclear fusion', {
      b: r`Light nuclei combine into a heavier, more tightly bound nucleus, for example
$$\,{}^{2}_{1}\text{H} + {}^{3}_{1}\text{H} \to {}^{4}_{2}\text{He} + {}^{1}_{0}\text{n} + 17.6\ \text{MeV}$$`,
      ul: ['The nuclei must get within a few fm against their **Coulomb repulsion**: this needs temperatures of about $10^7$–$10^8$ K (**thermonuclear** fusion).', 'Per nucleon, fusion releases more energy than fission.'],
      v: V.fusion,
      n: 'In fusion, two light nuclei join. Deuterium and tritium, two heavy forms of hydrogen, fuse into helium-four and a neutron, releasing about seventeen point six megaelectronvolts. The difficulty is that both nuclei are positive and repel each other. Only at temperatures of tens of millions of kelvin are they moving fast enough to get close enough for the nuclear force to take over.',
    }),
    sl('example', 'Worked example 6: D–T fusion', {
      b: r`Find the energy released in $\,{}^{2}\text{H} + {}^{3}\text{H} \to {}^{4}\text{He} + \text{n}$ and the energy per nucleon. Atomic masses: ²H 2.014102 u, ³H 3.016049 u, ⁴He 4.002603 u; $m_n = 1.008665$ u.`,
      ul: [
        r`Step 1 — $\Delta m = (2.014102 + 3.016049) - (4.002603 + 1.008665) = ${dec(ex6.dm, 4)}$ u.`,
        r`Step 2 — $Q = ${dec(ex6.dm, 4)} \times 931.5 \approx ${dec(ex6.Q, 3)}$ MeV; per nucleon $\dfrac{${dec(ex6.Q, 3)}}{5} \approx ${dec(ex6.perN, 2)}$ MeV.`,
        'Compare — fission: about 200/236 ≈ 0.85 MeV per nucleon.',
      ],
      v: V.fusion,
      n: 'The deuterium and tritium together are heavier than the helium and neutron by about point zero one eight nine atomic mass units, which is about seventeen point six megaelectronvolts. Shared among five nucleons, that is about three and a half megaelectronvolts each, roughly four times as much per nucleon as in fission. Gram for gram, fusion fuel is far more energetic.',
    }),
    sl('concept', 'Fusion in the Sun', {
      b: 'In the Sun’s core (about $1.5 \\times 10^7$ K), hydrogen fuses into helium through a chain of reactions, net:',
      ul: ['$4\\,{}^{1}\\text{H} + 2e^- \\to {}^{4}\\text{He} + 2\\nu + 6\\gamma$, releasing about **26.7 MeV**.', 'The Sun converts about $4 \\times 10^{9}$ kg of mass into energy every second.', 'Controlled fusion on Earth (tokamaks such as ITER, with India as a partner) is still being developed.'],
      v: V.fusion,
      n: 'The Sun is a giant fusion reactor. In its core, at about fifteen million kelvin, hydrogen nuclei fuse step by step into helium, each complete cycle releasing about twenty seven megaelectronvolts. Every second the Sun turns about four billion kilograms of mass into energy. Scientists, including Indian teams working on the international ITER project, are trying to tame fusion on Earth.',
    }),
    sl('two-column', 'Fission and fusion compared', {
      b: 'Both move nuclei towards the peak of the BE curve:',
      cols: [
        '**Fission**\n- Heavy nucleus splits\n- Needs a slow neutron to start\n- ≈ 200 MeV per event (≈ 0.9 MeV per nucleon)\n- Radioactive waste',
        '**Fusion**\n- Light nuclei join\n- Needs ~10⁷–10⁸ K\n- 17.6 MeV per D–T event (≈ 3.5 MeV per nucleon)\n- Little long-lived waste',
      ],
      v: beCurve,
      n: 'Fission splits heavy nuclei and is triggered by a slow neutron; fusion joins light ones and needs enormous temperatures. Fission gives more energy per event, but fusion gives more per nucleon, and so more per kilogram of fuel. Fission is used in power stations today; fusion powers the stars and may one day power our cities, with far less long-lived radioactive waste.',
    }),
    sl('example', 'Worked example 7: energy from one gram of uranium-235', {
      b: r`Estimate the energy released if all the nuclei in 1.0 g of U-235 undergo fission, at 200 MeV each. ($N_A = 6.02 \times 10^{23}$ mol$^{-1}$.)`,
      ul: [
        r`Step 1 — $N = \dfrac{1.0}{235} \times 6.02 \times 10^{23} \approx ${sci(ex7.N, 3)}$ nuclei.`,
        r`Step 2 — $E = ${sci(ex7.N, 3)} \times 200 \times 1.6 \times 10^{-13} \approx ${sci(ex7.EJ, 2)}$ J.`,
        'Meaning — about the energy from burning 3 tonnes of coal.',
      ],
      v: V.fission,
      n: 'One gram of uranium-two-three-five contains about two point six times ten to the twenty one nuclei. If each releases two hundred megaelectronvolts, the total is about eight times ten to the ten joules, roughly what you get from burning three tonnes of coal. That enormous energy density is why a small amount of nuclear fuel can run a power station for a long time.',
    }),
    sl('check', 'Quick check: why fusion needs heat', {
      b: 'Judge the assertion and the reason.',
      v: V.fusion,
      chk: 'hot-ar',
      n: 'What must two positively charged nuclei overcome before they can fuse?',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Fission', 'n + ²³⁵U → two fragments + 2–3 n + ≈ 200 MeV'],
          ['Chain reaction', 'Controlled in reactors: moderator, control rods, coolant'],
          ['Fusion', '²H + ³H → ⁴He + n + 17.6 MeV; needs ~10⁷–10⁸ K'],
          ['Why energy?', 'Products more tightly bound (towards the BE peak)'],
          ['Q from masses', 'Q = (mass before − mass after) × 931.5 MeV/u'],
          ['Q from BE', 'Q = total BE after − total BE before'],
        ],
        'Summary table of fission, chain reactions, fusion, the reason energy is released and two ways to calculate Q',
      ),
      n: 'To sum up: fission splits heavy nuclei, releasing about two hundred megaelectronvolts and two or three neutrons that can sustain a chain reaction, controlled in reactors. Fusion joins light nuclei at enormous temperatures, releasing more energy per nucleon. Both release energy because the products are more tightly bound. Calculate Q from the mass lost, or from the gain in total binding energy.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Balance A and Z in every nuclear equation before using it.',
        'Q from masses: before minus after, times 931.5 MeV/u; Q > 0 means energy released.',
        'Q from the BE curve: (BE per nucleon after − before) × A.',
        'Explain with the BE curve why both fission and fusion release energy.',
      ],
      v: table(['Asked', 'Key point'], [['Role of moderator?', 'Slows neutrons'], ['Role of control rods?', 'Absorb neutrons'], ['Why fusion needs high T?', 'Overcome Coulomb repulsion']], 'Table of common questions and the key point for each'),
      n: 'Always check that nucleon numbers and charges balance before you trust a nuclear equation. For Q values, subtract the mass after from the mass before and multiply by nine hundred and thirty one point five. Or, with binding energies per nucleon, multiply the gain per nucleon by the number of nucleons. And whenever asked why energy is released, point to the binding energy curve.',
    }),
  ],
});
