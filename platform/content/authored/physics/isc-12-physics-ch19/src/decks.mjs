// ISC 12 Physics ch19 Atoms — two decks: Part 1 (t01–t02) the Geiger–Marsden experiment, Rutherford's nuclear model,
// the distance of closest approach and the size of the nucleus, the limits of Rutherford's model, Bohr's postulates and
// the radius and speed of the nth orbit; Part 2 (t02–t03) the kinetic, potential and total energy of the electron, the
// meaning of negative energy, the energy-level diagram, the five spectral series, the Rydberg formula and the limits of
// Bohr's model. Constants as stated in the stems: 1/4πε₀ = 9 × 10⁹, e = 1.6 × 10⁻¹⁹ C, 0.53 Å, 2.2 × 10⁶ m/s, 13.6 eV,
// R = 1.097 × 10⁷ m⁻¹. Numbers computed here.
import { sl, deck, table, svgV, plot, r, dec, sci } from '../../isc-12-physics-ch01/src/lib.mjs';
import * as G from './svgs.mjs';

const { closest, rn, vn, En, Kn, Un, lamNm, invLam, region } = G;

// ---------------------------------------------------------------- worked-example numbers
const ex1 = { K: 5.0, Z: 79, atom: 1.4e-10 };
ex1.d = closest(ex1.K, ex1.Z);
ex1.ratio = ex1.atom / ex1.d;
const ex2 = { n: 5 };
ex2.r = rn(ex2.n);
ex2.v = vn(ex2.n);
ex2.f = ex2.v / (2 * Math.PI * ex2.r);
const ex3 = { n: 4 };
ex3.K = Kn(ex3.n);
ex3.U = Un(ex3.n);
ex3.E = En(ex3.n);
ex3.ion = -ex3.E;
ex3.up = ex3.E - En(1);
const ex4 = { lo: 2, hi: 5 };
ex4.inv = invLam(ex4.lo, ex4.hi);
ex4.lam = lamNm(ex4.lo, ex4.hi);
ex4.E = En(ex4.hi) - En(ex4.lo);
const ex5 = { lam: 1282 };
ex5.x = 1 / (G.RY * ex5.lam * 1e-9); // = 1/n1² − 1/n2²
ex5.inv2 = 1 / 9 - ex5.x;
ex5.n2 = Math.sqrt(1 / ex5.inv2);
export const EX = { ex1, ex2, ex3, ex4, ex5 };
for (const [ok, msg] of [
  [Math.abs(ex1.d - 4.5504e-14) < 1e-18 && Math.round(ex1.ratio / 100) === 31, 'ex1'],
  [Math.abs(ex2.r - 1.325e-9) < 1e-15 && Math.abs(ex2.v - 4.4e5) < 1e-6 && Math.abs(ex2.f / 1e13 - 5.285) < 0.001, 'ex2'],
  [Math.abs(ex3.K - 0.85) < 1e-12 && Math.abs(ex3.U + 1.7) < 1e-12 && Math.abs(ex3.up - 12.75) < 1e-12, 'ex3'],
  [Math.abs(ex4.lam - 434.08) < 0.01 && region(ex4.lam) === 'visible' && Math.abs(ex4.E - 2.856) < 1e-9, 'ex4'],
  [Math.abs(ex5.n2 - 5) < 0.01 && lamNm(2, Infinity) < ex5.lam && ex5.lam < lamNm(4, Infinity) && Math.abs(lamNm(3, 5) - 1281.9) < 0.1, 'ex5'],
])
  if (!ok) throw new Error(`deck number check failed: ${msg}`);

export const V = {
  geiger: svgV(G.GEIGER, 'Geiger–Marsden apparatus in an evacuated chamber'),
  traj: svgV(G.TRAJ, 'Computed paths of alpha particles near a gold nucleus'),
  spiral: svgV(G.SPIRAL, 'Why a classical Rutherford atom would collapse'),
  orbits: svgV(G.ORBITS, 'Bohr orbits: radius grows as n², speed falls as 1/n'),
  levels: svgV(G.LEVELS, 'Hydrogen energy levels to scale: excitation, emission and ionisation'),
  series: svgV(G.SERIES_FIG, 'The five spectral series of hydrogen (schematic)'),
  strip: svgV(G.STRIP, 'Where the five series lie in wavelength'),
};

// ---------------------------------------------------------------- plots
export const countPlot = plot(
  {
    x: { min: 0, max: 180, label: 'scattering angle θ (degrees)' },
    y: { min: 0, max: 6, label: 'log₁₀ (relative number of α particles)' },
    functions: [{ expr: '-4*log(sin(pi*x/360))', label: 'relative count, falling steeply with θ', domain: [5, 180] }],
    vlines: [{ x: 90, label: 'beyond 90°: thrown back', dashed: true }],
  },
  'Graph of the logarithm of the relative number of alpha particles reaching the detector against the scattering angle from 5 to 180 degrees: the count is highest at small angles and falls by more than a hundred thousand times by 180 degrees, but never quite to zero; a dashed line at 90 degrees marks the start of back-scattering',
  'Most α particles are deflected through small angles; very few, but some, are thrown back.',
);
const kAu = (2 * 79 * G.KE2) / G.MEV / 1e-15; // MeV fm
export const uPlot = plot(
  {
    x: { min: 10, max: 150, label: 'distance r from the gold nucleus (fm)' },
    y: { min: 0, max: 20, label: 'energy (MeV)' },
    functions: [{ expr: `${kAu.toFixed(2)}/x`, label: 'electrostatic potential energy U = k(2e)(79e)/r', domain: [11, 150] }],
    hlines: [
      { y: 5, label: 'α of 5.0 MeV', dashed: true },
      { y: 8, label: 'α of 8.0 MeV', dashed: true },
    ],
    points: [
      { at: [kAu / 5, 5], label: 'turns back at 45.5 fm' },
      { at: [kAu / 8, 8], label: 'turns back at 28.4 fm' },
    ],
  },
  'Graph of the electrostatic potential energy of an alpha particle against its distance from a gold nucleus, from 10 to 150 femtometres: the energy rises as one over r; horizontal dashed lines at 5.0 and 8.0 megaelectronvolts meet the curve at 45.5 and 28.4 femtometres, the distances of closest approach for head-on alpha particles of those energies',
  'A head-on α particle stops where U equals its initial kinetic energy: more energy, closer approach.',
);
const nsK = [];
const nsU = [];
const nsE = [];
for (let n = 1; n <= 6; n++) {
  nsK.push([n, Kn(n)]);
  nsU.push([n, Un(n)]);
  nsE.push([n, En(n)]);
}
export const energyPlot = plot(
  {
    x: { min: 0.5, max: 6.5, label: 'principal quantum number n' },
    y: { min: -28, max: 15, label: 'energy (eV)' },
    series: [
      { label: 'kinetic energy 13.6/n²', kind: 'scatter', points: nsK },
      { label: 'potential energy −27.2/n²', kind: 'scatter', points: nsU },
      { label: 'total energy −13.6/n²', kind: 'scatter', points: nsE },
    ],
    hlines: [{ y: 0, label: 'zero: electron free and at rest far away' }],
  },
  'Graph of the kinetic, potential and total energy of the electron in hydrogen for n equals 1 to 6: kinetic energy is positive, 13.6 electronvolts at n equals 1; potential energy is negative and twice as large, minus 27.2; total energy is minus 13.6; all three approach zero as n grows',
  'K = −E and U = 2E in every orbit; all three tend to zero as n → ∞.',
);
const balmerPts = [3, 4, 5, 6].map((n) => [1 / (n * n), invLam(2, n) / 1e6]);
export const rydPlot = plot(
  {
    x: { min: 0, max: 0.13, label: '1/n² (upper level n)' },
    y: { min: 1, max: 3, label: '1/λ (10⁶ m⁻¹)' },
    functions: [{ expr: `${(G.RY / 4e6).toFixed(5)}-${(G.RY / 1e6).toFixed(3)}*x`, label: 'Balmer series: 1/λ = R/4 − R/n²', domain: [0, 0.13] }],
    points: [
      ...balmerPts.map(([x, y], i) => ({ at: [x, y], label: `n = ${i + 3}: ${dec(1e3 / y, 4)} nm` })),
      { at: [0, G.RY / 4e6], label: 'series limit 364.6 nm' },
    ],
  },
  'Graph of the reciprocal of wavelength against one over n squared for the Balmer lines from n equals 3 to 6: the points lie on a straight line of slope minus R, the Rydberg constant; the intercept at one over n squared equal to zero is R over 4, the series limit at 364.6 nanometres',
  'A straight line of slope −R: the Balmer wavelengths give the Rydberg constant.',
);

// ---------------------------------------------------------------- tables
const thomsonTable = table(
  ['Model', 'Positive charge', 'Prediction for α particles'],
  [
    ['Thomson', 'Spread through the whole atom, electrons embedded in it', 'Only tiny deflections; none thrown back'],
    ['Rutherford (1911)', 'Concentrated in a tiny central nucleus', 'Mostly straight through; a few large deflections, some thrown back'],
  ],
  'Table comparing the Thomson and Rutherford models of the atom: where the positive charge is and what each predicts for alpha particles passing through a thin foil',
);
const obsTable = table(
  ['Observation', 'Conclusion'],
  [
    ['Most α particles pass straight through or with tiny deflections', 'Most of the atom is empty space'],
    ['A few are deflected through large angles', 'The positive charge is concentrated in a very small region'],
    ['About 1 in several thousand bounces back (θ > 90°)', 'That region holds nearly all the mass: a heavy, tiny nucleus'],
  ],
  'Table of the three observations of the alpha-scattering experiment and the conclusion drawn from each',
);
const sizeTable = table(
  ['Quantity', 'Typical size'],
  [
    ['Radius of an atom', '$\\sim 10^{-10}$ m (1 Å)'],
    ['Closest approach of 5 MeV α to gold', `$${sci(ex1.d, 3)}$ m`],
    ['Radius of a nucleus', '$\\sim 10^{-15}$–$10^{-14}$ m (1–10 fm)'],
    ['Volume fraction of the nucleus', '$\\sim 10^{-15}$'],
  ],
  'Table of the sizes of an atom, the closest approach of a 5 megaelectronvolt alpha particle to gold, a nucleus, and the fraction of the atom’s volume taken up by the nucleus',
);
const bohrTable = table(
  ['Quantity (nth orbit)', 'Expression', 'Value for hydrogen'],
  [
    ['Radius', '$r_n = \\dfrac{\\varepsilon_0 n^2 h^2}{\\pi m e^2}$', '$0.53\\,n^2$ Å'],
    ['Speed', '$v_n = \\dfrac{e^2}{2\\varepsilon_0 n h}$', '$\\dfrac{2.2 \\times 10^{6}}{n}$ m s⁻¹'],
    ['Angular momentum', '$\\dfrac{nh}{2\\pi}$', '$n \\times 1.05 \\times 10^{-34}$ J s'],
  ],
  'Table of the radius, speed and angular momentum of the electron in the nth Bohr orbit of hydrogen, with expressions and values',
);
const energyTable = table(
  ['Energy', 'In terms of r', 'In terms of n'],
  [
    ['Kinetic K', '$+\\dfrac{e^2}{8\\pi\\varepsilon_0 r}$', '$+\\dfrac{13.6}{n^2}$ eV'],
    ['Potential U', '$-\\dfrac{e^2}{4\\pi\\varepsilon_0 r}$', '$-\\dfrac{27.2}{n^2}$ eV'],
    ['Total E = K + U', '$-\\dfrac{e^2}{8\\pi\\varepsilon_0 r}$', '$-\\dfrac{13.6}{n^2}$ eV'],
  ],
  'Table of the kinetic, potential and total energy of the electron in a Bohr orbit, in terms of the radius and of n',
);
const seriesTable = table(
  ['Series', 'Ends on', 'Starts from', 'Region', 'Range (nm)'],
  G.SERIES.map((s) => [s.name, `n₁ = ${s.lo}`, `n₂ = ${s.lo + 1}, ${s.lo + 2}, …`, s.region, `${dec(lamNm(s.lo, Infinity), 4)}–${dec(lamNm(s.lo, s.lo + 1), 4)}`]),
  'Table of the five hydrogen series: the level each ends on, the levels it starts from, its region of the spectrum and its range of wavelengths from the series limit to the first line',
);

export const deck1 = deck({
  part: 1,
  title: 'Atoms — Part 1: The nuclear atom and Bohr’s orbits',
  goals: [
    'Describe the Geiger–Marsden alpha-scattering experiment, its observations and Rutherford’s conclusions',
    'Calculate the distance of closest approach of an alpha particle and use it to estimate the size of a nucleus',
    'State Bohr’s postulates and derive the radius and speed of the electron in the nth orbit of hydrogen',
  ],
  slides: [
    sl('title', 'Atoms', {
      b: 'Part 1 — firing alpha particles at gold leaf, finding the nucleus, and Bohr’s rules for the electron.',
      v: V.geiger,
      n: 'Everything around us is made of atoms about a ten-billionth of a metre across. How can we find out what is inside something so small? In nineteen hundred and nine, Geiger and Marsden fired fast alpha particles at a very thin gold foil and watched where they went. What they saw overturned the accepted picture of the atom, and led first to Rutherford’s nuclear model and then to Bohr’s theory of hydrogen.',
    }),
    sl('concept', 'Before the nucleus: Thomson’s model', {
      b: 'J. J. Thomson pictured the atom as a sphere of **positive charge spread evenly** through its volume, with electrons embedded in it, like currants in a bun. A fast, heavy α particle (charge +2e) passing through such an atom meets only weak, spread-out forces.',
      ul: ['Prediction: every α particle goes through a thin foil with a deflection of a small fraction of a degree.', 'Nothing in the model can turn an α particle back.'],
      v: thomsonTable,
      n: 'Before nineteen eleven, the favoured model was Thomson’s. The positive charge was thought to be spread evenly through the atom, with electrons dotted through it like currants in a bun. An alpha particle is heavy and fast, and inside such an atom the forces on it are weak and partly cancel. So the model predicted that every alpha particle would pass through a thin foil almost straight.',
    }),
    sl('diagram', 'The Geiger–Marsden experiment', {
      b: 'A narrow beam of fast α particles from a radioactive source in a lead block falls on a **very thin gold foil**. A **zinc sulphide screen** viewed through a **microscope** turns round the foil; each α particle that strikes it makes a tiny flash (scintillation), and the flashes are counted at each scattering angle θ.',
      ul: ['The whole apparatus is **evacuated**, so the α particles are not stopped or scattered by air.', 'Gold can be beaten very thin, so most α particles meet only one nucleus on the way through.'],
      v: V.geiger,
      n: 'In the experiment, a radioactive source inside a lead block sends a narrow beam of alpha particles onto a very thin gold foil. A screen coated with zinc sulphide gives a tiny flash of light each time an alpha particle hits it, and an observer counts the flashes through a microscope. The screen and microscope can be turned round the foil to any angle. The chamber is pumped out, so air does not stop the particles.',
    }),
    sl('concept', 'What they saw', {
      b: 'Counting flashes at different angles gave three results:',
      v: obsTable,
      ul: ['The count falls very steeply as θ increases, but never quite to zero.'],
      n: 'The results were startling. Almost all the alpha particles went straight through the foil, or were bent by a degree or two. A few were deflected through large angles. And roughly one in several thousand came back towards the source, as if it had bounced off something. Rutherford said it was as if a shell fired at tissue paper had come back and hit you.',
    }),
    sl('diagram', 'How a tiny nucleus explains it', {
      b: 'Rutherford proposed that the positive charge and nearly all the mass of an atom are concentrated in a **nucleus** about $10^{-14}$ m across, with electrons moving round it at large distances.',
      ul: ['An α particle far from every nucleus is hardly deflected; one aimed close to a nucleus feels a huge Coulomb repulsion and is turned through a large angle.', 'The electrons are far too light to deflect an α particle (about 1/7300 of its mass).', 'Only a few α particles happen to be aimed close enough to a nucleus: hence few large deflections.'],
      v: V.traj,
      n: 'Rutherford explained all three results with a new model. The positive charge and nearly all the mass are packed into a tiny nucleus, with the electrons far outside it. An alpha particle that passes far from every nucleus feels almost no force. One aimed very close to a nucleus is repelled strongly and swings round through a large angle. Because the nucleus is so small, very few particles come that close.',
    }),
    sl('check', 'Quick check: a lighter foil', {
      b: 'Choose the correct option.',
      v: countPlot,
      chk: 'largeangle-mcq',
      n: 'Think about how the repulsion between the alpha particle and the nucleus depends on the charge of the nucleus.',
    }),
    sl('concept', 'Distance of closest approach', {
      b: r`An α particle of kinetic energy K aimed **head-on** at a nucleus of charge Ze slows down, stops momentarily and returns. At the turning point all its kinetic energy has become electrostatic potential energy (the heavy nucleus is taken as fixed):
$$K = \dfrac{1}{4\pi\varepsilon_0}\cdot\dfrac{(2e)(Ze)}{d}\quad\Rightarrow\quad d = \dfrac{1}{4\pi\varepsilon_0}\cdot\dfrac{2Ze^2}{K}$$`,
      ul: ['d is the **distance of closest approach**: the nucleus cannot be larger than d, so d is an upper limit to its radius.', 'Doubling K halves d.'],
      v: uPlot,
      n: 'Now follow an alpha particle aimed straight at a nucleus. As it gets closer, the repulsion slows it down, until for an instant it stops and then turns back. At that moment all of its kinetic energy has been stored as electrostatic potential energy. Equating the two gives the distance of closest approach. Since the particle never touches the nucleus, the nucleus must be smaller than this distance.',
    }),
    sl('example', 'Worked example 1: how small is a gold nucleus?', {
      b: 'An α particle of kinetic energy 5.0 MeV is aimed head-on at a gold nucleus (Z = 79). Find the distance of closest approach, and compare it with the radius of a gold atom, about 1.4 × 10⁻¹⁰ m. (1/4πε₀ = 9 × 10⁹ N m² C⁻², e = 1.6 × 10⁻¹⁹ C)',
      ul: [
        r`$K = 5.0 \times 1.6 \times 10^{-13} = 8.0 \times 10^{-13}$ J.`,
        r`$d = \dfrac{9 \times 10^{9} \times 2 \times 79 \times (1.6 \times 10^{-19})^2}{8.0 \times 10^{-13}} = ${sci(ex1.d, 3)}$ m, about 45.5 fm.`,
        r`The atom is $\dfrac{1.4 \times 10^{-10}}{${sci(ex1.d, 3)}} \approx ${Math.round(ex1.ratio / 100) * 100}$ times larger than this upper limit for the nucleus.`,
      ],
      v: uPlot,
      n: 'Five megaelectronvolts is eight times ten to the minus thirteen joules. Putting the charges of the alpha particle and the gold nucleus into the formula gives a closest approach of about four point five five times ten to the minus fourteen metres, or forty five femtometres. The whole atom is roughly three thousand times bigger. The gold nucleus is even smaller than this, about seven femtometres, as faster particles later showed.',
    }),
    sl('concept', 'Sizes: atom and nucleus', {
      b: 'Closest-approach estimates and later experiments give nuclear radii of about $10^{-15}$ to $10^{-14}$ m, against $10^{-10}$ m for atoms.',
      ul: ['The nucleus is about 10⁴ to 10⁵ times smaller in radius than the atom, so it fills only about 10⁻¹⁵ of the atom’s volume.', 'Faster α particles get closer and give smaller (better) upper limits.'],
      v: sizeTable,
      n: 'Experiments like this, and later ones with faster particles, show that a nucleus is about ten to the minus fifteen to ten to the minus fourteen metres across, while an atom is about ten to the minus ten metres. If an atom were blown up to the size of a cricket stadium, its nucleus would be a small marble at the centre, yet it would hold almost all the mass.',
    }),
    sl('check', 'Quick check: closest approach', {
      b: 'Calculate the distance.',
      v: uPlot,
      chk: 'silver-num',
      n: 'Convert the kinetic energy to joules, then equate it to the potential energy at the turning point.',
    }),
    sl('diagram', 'Where Rutherford’s model fails', {
      b: 'An electron moving in a circle is **accelerated**, and classical electromagnetism says an accelerated charge **radiates** energy. So the electron should:',
      ul: ['Lose energy and **spiral into the nucleus** in about 10⁻⁸ s: atoms would not be stable.', 'Radiate at a steadily rising frequency, giving a **continuous spectrum**, not the sharp lines observed.'],
      v: V.spiral,
      n: 'Rutherford’s model has a serious flaw. An electron going round in a circle is accelerating towards the centre, and an accelerating charge should send out electromagnetic waves. Losing energy, it would spiral inwards in about a hundred-millionth of a second, radiating at an ever-rising frequency. Atoms would collapse, and they would give out a continuous spread of colours. Real atoms are stable and give sharp lines.',
    }),
    sl('diagram', 'Bohr’s postulates (1913)', {
      b: 'Bohr kept the nucleus and the circular orbits, but added rules for hydrogen:',
      ul: [
        '**1. Stationary orbits:** the electron moves in certain circular orbits without radiating; the Coulomb attraction supplies the centripetal force.',
        r`**2. Quantum condition:** in an allowed orbit the angular momentum is a whole multiple of $\dfrac{h}{2\pi}$: $mvr = \dfrac{nh}{2\pi}$, n = 1, 2, 3, …`,
        r`**3. Frequency condition:** radiation is emitted or absorbed only when the electron jumps between orbits: $h\nu = E_{n_2} - E_{n_1}$.`,
      ],
      v: V.orbits,
      n: 'In nineteen thirteen, Niels Bohr kept Rutherford’s nucleus but added three rules. First, the electron can move in certain orbits without radiating. Second, in those orbits its angular momentum is a whole number times h over two pi; the whole number n labels the orbit. Third, light is given out or taken in only when the electron jumps from one allowed orbit to another, as a single photon carrying the energy difference.',
    }),
    sl('concept', 'Radius of the nth orbit', {
      b: r`Coulomb force = centripetal force, and the quantum condition:
$$\dfrac{mv^2}{r} = \dfrac{e^2}{4\pi\varepsilon_0 r^2}\quad(1),\qquad mvr = \dfrac{nh}{2\pi}\quad(2)$$
From (2), $v = \dfrac{nh}{2\pi m r}$; put it into (1), $mv^2r = \dfrac{e^2}{4\pi\varepsilon_0}$:
$$r_n = \dfrac{\varepsilon_0 n^2 h^2}{\pi m e^2} = 0.53\,n^2\ \text{Å}$$`,
      ul: ['r ∝ n²: radii in the ratio 1 : 4 : 9 : 16 …; r₁ = 0.53 Å is the **Bohr radius**.'],
      v: V.orbits,
      n: 'Two equations do the work. The electric attraction supplies the centripetal force, and the angular momentum is n h over two pi. From the second, write the speed in terms of the radius and substitute into the first. The radius comes out as epsilon nought n squared h squared over pi m e squared. For hydrogen in its lowest orbit this is about half an angstrom, and it grows as n squared.',
    }),
    sl('concept', 'Speed of the electron in the nth orbit', {
      b: r`Divide $mv^2r = \dfrac{e^2}{4\pi\varepsilon_0}$ by $mvr = \dfrac{nh}{2\pi}$:
$$v_n = \dfrac{e^2}{2\varepsilon_0 n h} = \dfrac{2.2 \times 10^{6}}{n}\ \text{m s}^{-1}$$`,
      ul: ['v ∝ 1/n: the electron moves more slowly in the larger outer orbits.', r`$v_1 \approx \dfrac{c}{137}$: fast, but well below the speed of light.`, 'The orbital frequency $v/2\\pi r$ falls as $1/n^3$.'],
      v: bohrTable,
      n: 'Dividing one equation by the other gets rid of the mass and the radius, leaving the speed as e squared over two epsilon nought n h. In the first orbit this is about two point two million metres per second, roughly one hundred and thirty seventh of the speed of light. The speed falls as one over n, so outer electrons move more slowly, and they go round far less often.',
    }),
    sl('example', 'Worked example 2: the fifth orbit', {
      b: 'For the electron in the n = 5 orbit of hydrogen, find (a) the radius of the orbit, (b) its speed, (c) the number of revolutions it makes per second. (r₁ = 0.53 Å, v₁ = 2.2 × 10⁶ m s⁻¹)',
      ul: [
        r`(a) $r_5 = 0.53 \times 25 = 13.25$ Å $= ${sci(ex2.r, 4)}$ m.`,
        r`(b) $v_5 = \dfrac{2.2 \times 10^{6}}{5} = ${sci(ex2.v, 2)}$ m s⁻¹.`,
        r`(c) $f = \dfrac{v}{2\pi r} = \dfrac{${sci(ex2.v, 2)}}{2\pi \times ${sci(ex2.r, 4)}} = ${sci(ex2.f, 3)}$ s⁻¹.`,
      ],
      v: V.orbits,
      n: 'The radius grows as n squared, so the fifth orbit is twenty five times the Bohr radius, about thirteen angstroms. The speed falls as one over n, to four point four times ten to the five metres per second. Dividing the speed by the circumference gives about five times ten to the thirteen revolutions every second, still enormous, but a hundred and twenty five times fewer than in the first orbit.',
    }),
    sl('check', 'Quick check: which orbit?', {
      b: 'Find n.',
      v: bohrTable,
      chk: 'whichorbit-num',
      n: 'The speed falls as one over n. Compare the given speed with the speed in the first orbit.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['α scattering', 'Mostly straight through; few large deflections; very few rebound'],
          ['Rutherford’s model', 'Tiny, heavy, positive nucleus; electrons far outside'],
          ['Closest approach', '$d = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{2Ze^2}{K}$, an upper limit to the nuclear radius'],
          ['Bohr orbits', '$mvr = \\dfrac{nh}{2\\pi}$; $r_n = 0.53n^2$ Å; $v_n = \\dfrac{2.2 \\times 10^6}{n}$ m s⁻¹'],
        ],
        'Summary table of the alpha-scattering results, Rutherford’s model, the distance of closest approach and the Bohr radius and speed',
      ),
      n: 'To sum up: the scattering of alpha particles showed that an atom has a tiny, heavy, positive nucleus. The distance of closest approach of a head-on alpha particle sets an upper limit to its size. Rutherford’s model could not explain why atoms are stable, so Bohr added quantised orbits, with radii growing as n squared and speeds falling as one over n.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'Give each observation with its own conclusion; mention the vacuum, the thin foil and the scintillation screen in the description.',
        'Closest approach: convert MeV to joules (1 MeV = 1.6 × 10⁻¹³ J) and use charge 2e for the α particle.',
        'Do not use the impact-parameter formula: the mathematical theory of scattering is not in the ISC syllabus.',
        'Derivations: write both starting equations, number them, and state r ∝ n² and v ∝ 1/n at the end.',
      ],
      v: table(['Asked', 'Key point'], [['Why most α go straight through', 'Atom mostly empty space'], ['Why a few rebound', 'Tiny, heavy, positive nucleus'], ['Bohr radius', '0.53 Å; r ∝ n²']], 'Table of common questions and the key point for each'),
      n: 'When describing the experiment, pair each observation with its conclusion, and mention the vacuum, the thin foil and the flashes on the screen. In closest approach problems, convert megaelectronvolts to joules and remember that the alpha particle carries two units of charge. For the Bohr derivations, write the force equation and the quantum condition first, then combine them step by step.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Atoms — Part 2: Energy levels and the hydrogen spectrum',
  goals: [
    'Derive the kinetic, potential and total energy of the electron in the nth orbit and explain why the total energy is negative',
    'Draw the energy-level diagram of hydrogen and identify the Lyman, Balmer, Paschen, Brackett and Pfund series',
    'Calculate the wavelength of a line from a transition using the Rydberg formula, and identify its series and region',
  ],
  slides: [
    sl('title', 'Energy Levels and the Hydrogen Spectrum', {
      b: 'Part 2 — why the electron’s energy is negative, and how jumps between levels write a barcode of lines.',
      v: V.series,
      n: 'Pass the light from a glowing hydrogen tube through a prism and you do not get a rainbow, but a few sharp coloured lines. Beyond the visible, there are more lines in the ultraviolet and the infrared. In this part we use Bohr’s orbits to find the energy of the electron, draw the energy levels of hydrogen, and see how every line comes from a jump between two levels.',
    }),
    sl('concept', 'Kinetic, potential and total energy', {
      b: r`From $\dfrac{mv^2}{r} = \dfrac{e^2}{4\pi\varepsilon_0 r^2}$: $K = \dfrac{1}{2}mv^2 = \dfrac{e^2}{8\pi\varepsilon_0 r}$. The potential energy of the electron (−e) at distance r from the proton (+e) is $U = -\dfrac{e^2}{4\pi\varepsilon_0 r}$. So
$$E = K + U = -\dfrac{e^2}{8\pi\varepsilon_0 r},\qquad K = -E,\quad U = 2E$$`,
      v: energyTable,
      n: 'The force equation gives the kinetic energy directly: one half m v squared equals e squared over eight pi epsilon nought r. The potential energy of the electron near the proton is negative, and twice as large in size. Adding them, the total energy is minus e squared over eight pi epsilon nought r. So in every orbit the kinetic energy equals minus the total energy, and the potential energy is twice the total.',
    }),
    sl('concept', 'Energy of the nth orbit', {
      b: r`Put $r_n = \dfrac{\varepsilon_0 n^2 h^2}{\pi m e^2}$ into $E = -\dfrac{e^2}{8\pi\varepsilon_0 r}$:
$$E_n = -\dfrac{me^4}{8\varepsilon_0^2 n^2 h^2} = -\dfrac{13.6}{n^2}\ \text{eV}$$`,
      ul: ['E₁ = −13.6 eV, E₂ = −3.40 eV, E₃ = −1.51 eV, E₄ = −0.85 eV, …, E∞ = 0.', 'As n increases, E increases (becomes less negative) while K decreases.'],
      v: energyPlot,
      n: 'Substituting the Bohr radius into the energy gives minus m e to the fourth over eight epsilon nought squared n squared h squared. Putting in the constants, the energy of the nth level is minus thirteen point six electronvolts divided by n squared. The ground state is at minus thirteen point six, the next at minus three point four, and the levels crowd towards zero as n grows.',
    }),
    sl('diagram', 'Why the energy is negative', {
      b: 'Zero energy means the electron is **free and at rest far from the proton** (n → ∞). A negative total energy means the electron is **bound**: energy must be supplied to free it.',
      ul: ['**Ionisation energy** from level n: $+\\dfrac{13.6}{n^2}$ eV (13.6 eV from the ground state).', '**Excitation energy:** the energy to lift the electron from the ground state to a higher level, e.g. 10.2 eV to n = 2.', 'An electron with E > 0 is free; it can have any energy.'],
      v: V.levels,
      n: 'The zero of energy is chosen as the electron at rest, far away from the proton. A bound electron has less energy than that, so its total energy is negative. The more negative, the more tightly it is held. To free an electron from the ground state, we must supply thirteen point six electronvolts, the ionisation energy. Lifting it to a higher level needs a smaller amount, called an excitation energy.',
    }),
    sl('example', 'Worked example 3: the fourth level', {
      b: 'For the electron in the n = 4 level of hydrogen, find (a) its kinetic, potential and total energy, (b) the energy needed to ionise the atom from this level, (c) the energy needed to raise it to this level from the ground state.',
      ul: [
        r`(a) $E_4 = -\dfrac{13.6}{16} = ${dec(ex3.E, 2)}$ eV; $K = -E = ${dec(ex3.K, 2)}$ eV; $U = 2E = ${dec(ex3.U, 3)}$ eV.`,
        r`(b) Ionisation from n = 4: $0 - (-0.85) = ${dec(ex3.ion, 2)}$ eV.`,
        r`(c) $E_4 - E_1 = -0.85 - (-13.6) = ${dec(ex3.up, 4)}$ eV.`,
      ],
      v: energyTable,
      n: 'Thirteen point six divided by sixteen is zero point eight five, so the total energy is minus zero point eight five electronvolts. The kinetic energy is plus zero point eight five and the potential energy minus one point seven. Only zero point eight five electronvolts will free the electron from this level, but getting it there from the ground state takes twelve point seven five.',
    }),
    sl('check', 'Quick check: ionisation', {
      b: 'Calculate the energy.',
      v: V.levels,
      chk: 'ionise5-num',
      n: 'The ionisation energy from a level is the energy needed to bring the electron up to zero.',
    }),
    sl('concept', 'Emission, absorption and the Rydberg formula', {
      b: r`A jump from $n_2$ down to $n_1$ emits one photon with $h\nu = \dfrac{hc}{\lambda} = E_{n_2} - E_{n_1} = \dfrac{me^4}{8\varepsilon_0^2h^2}\left(\dfrac{1}{n_1^2} - \dfrac{1}{n_2^2}\right)$:
$$\dfrac{1}{\lambda} = R\left(\dfrac{1}{n_1^2} - \dfrac{1}{n_2^2}\right),\qquad R = \dfrac{me^4}{8\varepsilon_0^2ch^3} = 1.097 \times 10^{7}\ \text{m}^{-1}$$`,
      ul: ['R is the **Rydberg constant**; $1/\\lambda$ is the wave number.', 'Absorption is the reverse jump, upwards, taking in a photon of exactly the same energy.'],
      v: V.levels,
      n: 'When the electron drops from a higher level to a lower one, the atom sends out a single photon whose energy equals the difference between the levels. Dividing by h c gives the reciprocal of the wavelength as a constant times one over the lower n squared minus one over the upper n squared. That constant is the Rydberg constant, about one point one times ten to the seven per metre.',
    }),
    sl('diagram', 'The five series', {
      b: 'Lines that end on the same lower level form a **series**:',
      v: V.series,
      ul: ['Lyman (n₁ = 1) ultraviolet; Balmer (n₁ = 2) visible and near ultraviolet; Paschen (n₁ = 3), Brackett (n₁ = 4) and Pfund (n₁ = 5) infrared.', 'The jump from n₂ = ∞ gives the **series limit**, the shortest wavelength of the series.'],
      n: 'All the jumps that end on the ground state form the Lyman series, in the ultraviolet. Jumps ending on the second level form the Balmer series, whose first lines are visible. Jumps ending on the third, fourth and fifth levels give the Paschen, Brackett and Pfund series, all in the infrared. A jump from infinity gives the series limit, the shortest wavelength in each series.',
    }),
    sl('example', 'Worked example 4: a violet Balmer line', {
      b: 'Find the wavelength of the line emitted when the electron in hydrogen falls from n = 5 to n = 2. Name its series and region. (R = 1.097 × 10⁷ m⁻¹)',
      ul: [
        r`$\dfrac{1}{\lambda} = 1.097 \times 10^{7}\left(\dfrac{1}{4} - \dfrac{1}{25}\right) = 1.097 \times 10^{7} \times 0.21 = ${sci(ex4.inv, 4)}$ m⁻¹.`,
        r`$\lambda = ${sci(ex4.lam * 1e-9, 4)}$ m $= ${dec(ex4.lam, 4)}$ nm: Balmer series (ends on n = 2), **visible** (violet).`,
        r`Check with energies: $E_5 - E_2 = 13.6\left(\dfrac{1}{4} - \dfrac{1}{25}\right) = ${dec(ex4.E, 4)}$ eV, and $\dfrac{1240}{2.856} = 434$ nm.`,
      ],
      v: seriesTable,
      n: 'One quarter minus one twenty fifth is zero point two one. Multiplying by the Rydberg constant gives about two point three times ten to the six per metre, so the wavelength is about four hundred and thirty four nanometres. The line ends on the second level, so it belongs to the Balmer series, and it is violet light. The energy difference, about two point eight six electronvolts, gives the same answer.',
    }),
    sl('diagram', 'Series limits and overlaps', {
      b: r`Series limit: $\lambda_\infty = \dfrac{n_1^2}{R}$. First (longest) line: $n_2 = n_1 + 1$.`,
      ul: ['Lyman 91.2–121.5 nm and Balmer 364.6–656.3 nm do not overlap.', 'Paschen (820–1875 nm), Brackett (1459–4051 nm) and Pfund (2279–7458 nm) overlap: a line’s wavelength alone may fit two series, so check with the formula.', 'Only Balmer lines from n₂ = 3 to 6 are visible (656, 486, 434, 410 nm); from n₂ = 7 on they are ultraviolet.'],
      v: V.strip,
      n: 'Each series spreads from its first line, the longest wavelength, down to its series limit. The Lyman and Balmer series are well separated, but the three infrared series overlap. So a wavelength in the infrared might belong to more than one series, and you must test it with the formula. Only four Balmer lines are visible; the rest crowd into the near ultraviolet.',
    }),
    sl('check', 'Quick check: name the series', {
      b: 'Choose the correct option.',
      v: seriesTable,
      chk: 'series63-mcq',
      n: 'Which level does the jump end on? That decides the series, and the series decides the region.',
    }),
    sl('example', 'Worked example 5: identify the jump', {
      b: 'A hydrogen line of wavelength 1282 nm is observed. Which transition produces it? (R = 1.097 × 10⁷ m⁻¹)',
      ul: [
        r`It is longer than the Balmer series (≤ 656 nm) and shorter than the Brackett limit (1459 nm), so it must be a **Paschen** line: $n_1 = 3$.`,
        r`$\dfrac{1}{9} - \dfrac{1}{n_2^2} = \dfrac{1}{R\lambda} = \dfrac{1}{1.097 \times 10^{7} \times 1282 \times 10^{-9}} = ${dec(ex5.x, 3)}$.`,
        r`$\dfrac{1}{n_2^2} = 0.1111 - 0.0711 = ${dec(ex5.inv2, 2)}$, so $n_2 = ${dec(ex5.n2, 2)}$: the jump is **5 → 3** (infrared).`,
      ],
      v: V.strip,
      n: 'First decide the series. Twelve hundred and eighty two nanometres is too long for the Balmer series and too short for any Brackett line, so it must be a Paschen line, ending on level three. Then solve the Rydberg formula for the upper level: one over n squared comes out as nought point nought four, so n is five. The line comes from the jump from five to three.',
    }),
    sl('concept', 'How many lines?', {
      b: r`Atoms excited to level n can return by many routes. The number of different lines possible is
$$N = \dfrac{n(n-1)}{2}$$`,
      ul: ['A single atom emits only one photon per jump; a gas of many atoms shows all the lines together.', 'Cool hydrogen is almost entirely in n = 1, so its **absorption** spectrum shows only Lyman lines.'],
      v: V.series,
      n: 'If many atoms are excited to the fourth level, some jump straight down to the ground state while others stop at the third or second level on the way. Every pair of levels gives a different line, so the number of possible lines is n times n minus one over two, six for the fourth level. Cool hydrogen absorbs only from the ground state, so its absorption spectrum shows just the Lyman lines.',
    }),
    sl('diagram', 'Finding R from the Balmer lines', {
      b: r`For the Balmer series, $\dfrac{1}{\lambda} = \dfrac{R}{4} - \dfrac{R}{n^2}$: a graph of $1/\lambda$ against $1/n^2$ is a **straight line** of slope $-R$ and intercept $R/4$ (the series limit).`,
      ul: ['Measured Balmer wavelengths fall on this line, which is how the Rydberg constant was first found from experiment.'],
      v: rydPlot,
      n: 'The Rydberg formula can be tested with a graph. For the Balmer lines, plot one over the wavelength against one over n squared for the upper level. The points fall on a straight line. Its slope is minus the Rydberg constant, and where it meets the axis at one over n squared equal to zero, it gives the series limit. Measured wavelengths agree with Bohr’s value of R.',
    }),
    sl('check', 'Quick check: counting lines', {
      b: 'Calculate the number.',
      v: V.series,
      chk: 'lines6-num',
      n: 'Count every pair of levels from the highest level reached down to the ground state.',
    }),
    sl('concept', 'Successes and limits of Bohr’s model', {
      b: 'Bohr’s model explains the stability of hydrogen, its size (0.53 Å), its ionisation energy (13.6 eV) and every wavelength of its spectrum. But:',
      ul: ['It works only for hydrogen and one-electron ions; it cannot handle electron–electron repulsion in atoms like helium.', 'It cannot explain the relative intensities of the lines, or why some lines split into close pairs (fine structure).', 'It mixes classical orbits with quantum rules without explaining them; quantum mechanics replaces sharp orbits with probability clouds.'],
      v: table(['Bohr’s model explains', 'Bohr’s model cannot explain'], [['Stability of the hydrogen atom', 'Spectra of many-electron atoms'], ['Ionisation energy 13.6 eV', 'Relative intensities of lines'], ['All hydrogen wavelengths (R)', 'Fine structure of lines']], 'Table of what Bohr’s model explains and what it cannot explain'),
      n: 'Bohr’s model was a triumph for hydrogen. It gave the right size of the atom, the right ionisation energy and every wavelength of the spectrum. But it fails for atoms with two or more electrons, because it ignores the repulsion between them. It cannot say why some lines are brighter than others. And its rules were simply assumed; later, quantum mechanics replaced its sharp orbits with clouds of probability.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results for hydrogen:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Energies', '$K = -E$, $U = 2E$, $E_n = -\\dfrac{13.6}{n^2}$ eV'],
          ['Negative energy', 'Electron bound; 13.6/n² eV needed to free it'],
          ['Photon', '$h\\nu = E_{n_2} - E_{n_1}$'],
          ['Rydberg formula', '$\\dfrac{1}{\\lambda} = R\\left(\\dfrac{1}{n_1^2} - \\dfrac{1}{n_2^2}\\right)$, $R = 1.097 \\times 10^7$ m⁻¹'],
          ['Series', 'n₁ = 1 Lyman (UV), 2 Balmer (visible), 3 Paschen, 4 Brackett, 5 Pfund (IR)'],
        ],
        'Summary table of the energies of the Bohr atom, the meaning of negative energy, the photon condition, the Rydberg formula and the five series',
      ),
      n: 'To sum up: the electron’s total energy in the nth level is minus thirteen point six over n squared electronvolts, negative because it is bound. Each jump downwards gives a photon carrying the energy difference, with a wavelength given by the Rydberg formula. Lines ending on levels one to five form the Lyman, Balmer, Paschen, Brackett and Pfund series.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Write n₁ for the lower level and n₂ for the upper: 1/λ is always positive.',
        'Give wavelengths in nm (1 nm = 10⁻⁹ m) and name the series and region when asked.',
        'For the series limit put n₂ = ∞; for the first line put n₂ = n₁ + 1.',
        'Explain negative energy as "bound": zero is the free electron at rest at infinity.',
      ],
      v: table(['Asked', 'Key point'], [['Ionisation energy from level n', '13.6/n² eV'], ['Lines from level n', 'n(n − 1)/2'], ['Longest Lyman line', '2 → 1, 121.5 nm']], 'Table of common questions and the key point for each'),
      n: 'Always take the lower level as n one and the upper as n two, so the reciprocal of the wavelength comes out positive. Give wavelengths in nanometres and name the series and the region. For a series limit, the upper level is infinity. And when asked why the energy is negative, say that the electron is bound, with zero meaning a free electron at rest far away.',
    }),
  ],
});
