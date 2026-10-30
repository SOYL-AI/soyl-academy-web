// ch12 Atoms — two decks: Part 1 (t01) alpha-particle scattering and Rutherford's nuclear model; Part 2 (t02–t03) the Bohr
// model of hydrogen and its line spectrum. Worked-example numbers and plots are computed here.
import { sl, deck, table, flow, svgV, plot, r, sci, dec } from '../../cbse-12-physics-ch01/src/lib.mjs';
import * as G from './svgs.mjs';

export const K = 9e9;
export const QE = 1.6e-19;
export const ME = 9.1e-31;
export const H = 6.63e-34;
export const EPS0 = 8.85e-12;
export const HC = (H * 3e8) / QE / 1e-9; // eV nm
export const En = (n) => -13.6 / (n * n);
export const lamFor = (dE) => HC / dE; // nm, dE in eV

// ---------------------------------------------------------------- worked-example numbers
const ex1 = { Z: 79, KeV: 5.0e6 };
ex1.d = (K * 2 * ex1.Z * QE) / ex1.KeV; // k(2e)(Ze)/(K in eV × e)
ex1.dAg = (K * 2 * 47 * QE) / 5.5e6;
const ex2 = { n: 3 };
ex2.r1 = (EPS0 * H * H) / (Math.PI * ME * QE * QE);
ex2.v1 = (QE * QE) / (2 * EPS0 * H);
ex2.E1J = -(K * QE * QE) / (2 * ex2.r1);
ex2.r = ex2.n ** 2 * 5.3e-11;
ex2.v = 2.18e6 / ex2.n;
const ex3 = { n: 2 };
ex3.E = En(2);
ex3.KE = -ex3.E;
ex3.PE = 2 * ex3.E;
const ex4 = {};
ex4.dE = En(3) - En(2);
ex4.lam = lamFor(ex4.dE);
const ex5 = {};
ex5.lyLim = lamFor(13.6);
ex5.ly1 = lamFor(En(2) - En(1));
ex5.baLim = lamFor(3.4);
ex5.lines = (4 * 3) / 2;
export const EX = { ex1, ex2, ex3, ex4, ex5 };

export const V = {
  geiger: svgV(G.GEIGER, 'Geiger–Marsden alpha-scattering arrangement'),
  traj: svgV(G.TRAJ, 'Computed paths of alpha particles past a nucleus for different impact parameters', 'Each deflection agrees with tan(θ/2) = d/2b (checked).'),
  orbits: svgV(G.ORBITS, 'Bohr orbits n = 1, 2, 3 with radii in the ratio 1 : 4 : 9 and a photon emitted in a 3 → 2 jump'),
  levels: svgV(G.LEVELS, 'Hydrogen energy levels to scale with the Lyman, Balmer and Paschen series', 'Levels from n = 5 upwards crowd just below 0 eV and are not drawn.'),
};

export const scatPlot = plot(
  {
    x: { min: 0, max: 180, label: 'scattering angle θ (degrees)' },
    y: { min: 0, max: 4.5, label: 'log₁₀ (relative number scattered)' },
    functions: [{ expr: '-4log(sin(pi*x/360))', label: 'N(θ) ∝ 1/sin⁴(θ/2), relative to θ = 180°', domain: [10, 180] }],
  },
  'Logarithm of the number of alpha particles scattered against scattering angle: it falls steeply from small angles to large ones, but a small number are still scattered through angles near 180 degrees',
  'At 10° about 17 000 times as many particles arrive as at 180°; large-angle scattering is rare but real.',
);
const lvPts = [1, 2, 3, 4, 5, 6].map((n) => [n, Number(En(n).toFixed(3))]);
export const levelPlot = plot(
  {
    x: { min: 0, max: 7, label: 'principal quantum number n' },
    y: { min: -14, max: 1, label: 'energy Eₙ (eV)' },
    series: [{ label: 'Eₙ = −13.6/n² eV', kind: 'scatter', points: lvPts }],
    hlines: [{ y: 0, label: 'ionisation (n → ∞)', dashed: true }],
  },
  'Energy of the hydrogen electron against the principal quantum number: minus 13.6 electronvolts at n equals 1, rising quickly towards zero as n increases',
  'The levels crowd together just below zero as n grows.',
);

const seriesTable = table(
  ['Series', 'Lower level', 'Region', 'Shortest λ (series limit)'],
  [
    ['Lyman', 'n = 1', 'ultraviolet', `${dec(ex5.lyLim, 3)} nm`],
    ['Balmer', 'n = 2', 'visible (and near UV)', `${dec(ex5.baLim, 3)} nm`],
    ['Paschen', 'n = 3', 'infrared', `${dec(lamFor(13.6 / 9), 3)} nm`],
    ['Brackett, Pfund', 'n = 4, 5', 'far infrared', '—'],
  ],
  'Table of the hydrogen spectral series: Lyman to n equals 1 in the ultraviolet, Balmer to n equals 2 mainly visible, Paschen to n equals 3 in the infrared, Brackett and Pfund further in the infrared, with series limits',
);

export const deck1 = deck({
  part: 1,
  title: 'Atoms — Part 1: Alpha-particle scattering and the nuclear atom',
  goals: [
    'Describe the Geiger–Marsden alpha-scattering experiment and its observations',
    'Explain how the observations led to Rutherford’s nuclear model',
    'Calculate the distance of closest approach and relate impact parameter to deflection',
  ],
  slides: [
    sl('title', 'Atoms', {
      b: 'Part 1 — firing alpha particles at gold foil revealed that almost all the mass of an atom sits in a tiny nucleus.',
      v: flow('LR', [['t', 'Thomson model'], ['e', 'Scattering experiment'], ['o', 'Surprising results'], ['n', 'Nuclear model'], ['p', 'Its problem']], [['t', 'e'], ['e', 'o'], ['o', 'n'], ['n', 'p']], 'Flow of the part: the Thomson model, the scattering experiment, the surprising results, the nuclear model and its problem'),
      n: 'What does the inside of an atom look like? In the early nineteen hundreds the favoured picture was Thomson’s, with electrons dotted through a sphere of positive charge. Geiger and Marsden, working with Rutherford, tested it by firing alpha particles at a thin gold foil. A few bounced almost straight back, and that changed the picture of the atom completely.',
    }),
    sl('concept', 'Thomson’s model', {
      b: 'Thomson (1898): positive charge spread **uniformly** through the whole atom, with electrons embedded in it like seeds in a watermelon.',
      ul: ['The atom is electrically neutral.', 'Prediction for fast alpha particles: the spread-out charge exerts only weak forces, so they should pass through with **very small** deflections.'],
      v: flow('LR', [['a', 'Spread-out positive charge'], ['f', 'Weak forces everywhere'], ['d', 'Only tiny deflections expected']], [['a', 'f'], ['f', 'd']], 'Flow: positive charge spread through the atom gives weak forces everywhere, so only tiny deflections of alpha particles are expected'),
      n: 'In Thomson’s model the positive charge fills the whole atom evenly, and the electrons sit inside it. Because the charge is so spread out, a fast, heavy alpha particle passing through would feel only gentle pushes. The model therefore predicted that alpha particles should go straight through a thin foil, deflected by at most a degree or so.',
    }),
    sl('diagram', 'The Geiger–Marsden experiment', {
      b: 'A narrow beam of **alpha particles** (about 5.5 MeV, from a radioactive source) falls on a **thin gold foil** (about 0.21 μm thick). A **zinc sulphide screen** viewed through a microscope flashes where each particle lands; it can be turned to count particles scattered through any angle θ.',
      ul: ['The whole apparatus is in vacuum.', 'Gold is used because it can be beaten into very thin foils, so most particles meet only one nucleus.'],
      v: V.geiger,
      n: 'Alpha particles from a radioactive source in a lead box pass through a slit to form a narrow beam, which hits a gold foil less than a micrometre thick. Each particle that reaches the zinc sulphide screen makes a tiny flash, counted through a microscope. By moving the screen round the foil, the experimenters counted how many particles were scattered through each angle.',
    }),
    sl('concept', 'The observations', {
      b: 'Results:',
      ul: ['**Most** alpha particles passed straight through, or were deflected by only a degree or two.', 'A **few** were deflected through large angles; about **1 in 8000** was turned through more than 90°.', 'Some came almost **straight back** (θ near 180°).'],
      v: scatPlot,
      n: 'Most of the alpha particles went straight through, just as Thomson’s model predicted. But a few were deflected through large angles, and roughly one in eight thousand came back by more than ninety degrees. Rutherford said it was as if you fired a large shell at tissue paper and it came back and hit you. Something tiny and massive inside the atom was turning them back.',
    }),
    sl('concept', 'Rutherford’s nuclear model', {
      b: 'Rutherford (1911) concluded:',
      ul: ['All the positive charge and nearly all the mass are concentrated in a tiny **nucleus**, about $10^{-15}$ to $10^{-14}$ m across.', 'The atom (about $10^{-10}$ m) is mostly **empty space**: that is why most particles pass straight through.', 'A particle passing very close to the nucleus feels a huge Coulomb repulsion and is deflected through a large angle.', 'Electrons revolve round the nucleus, held by its electrostatic attraction.'],
      v: V.traj,
      n: 'To bounce a fast, heavy alpha particle backwards, the positive charge must be packed into a very small, very massive core, the nucleus. Since only a few particles come anywhere near it, the nucleus must be tiny, about ten thousand times smaller than the atom. The rest of the atom is mostly empty space, with electrons orbiting the nucleus like planets round the Sun.',
    }),
    sl('diagram', 'Impact parameter and deflection', {
      b: 'The **impact parameter** $b$ is the perpendicular distance of the alpha particle’s initial path from the centre of the nucleus.',
      ul: ['Small $b$ (close approach): **large** deflection; $b = 0$ (head-on): the particle turns straight back ($\\theta = 180°$).', 'Large $b$: hardly any deflection.', 'Since only a tiny fraction of particles have very small $b$, large-angle scattering is rare.'],
      v: V.traj,
      n: 'How much an alpha particle is deflected depends on how closely it is aimed at the nucleus. That aiming distance is the impact parameter. A particle aimed head-on slows down, stops and comes straight back. A slightly offset one swings round through a large angle. One that passes far away is barely nudged. Because the nucleus is so small, very few particles are aimed close enough to bounce back.',
    }),
    sl('check', 'Quick check: impact parameter', {
      b: 'Choose the correct option.',
      v: V.traj,
      chk: 'impact-mcq',
      n: 'Think about which alpha particles come closest to the nucleus.',
    }),
    sl('concept', 'Distance of closest approach', {
      b: r`For a **head-on** collision, the alpha particle stops when all its kinetic energy $K$ has become electric potential energy:
$$K = \dfrac{1}{4\pi\varepsilon_0}\dfrac{(2e)(Ze)}{d}\quad\Rightarrow\quad d = \dfrac{1}{4\pi\varepsilon_0}\dfrac{2Ze^2}{K}$$`,
      ul: ['$d$ gives an **upper limit** to the size of the nucleus.', 'Faster alpha particles get closer: $d \\propto 1/K$.'],
      v: V.traj,
      n: 'Aim an alpha particle straight at the nucleus. As it approaches, the repulsion slows it until it stops for an instant and turns back. At that point all its kinetic energy has become electric potential energy of two charges, two e and Z e, a distance d apart. Solving gives the distance of closest approach. The nucleus can be no bigger than this, or the particle would have hit it.',
    }),
    sl('example', 'Worked example 1: how close?', {
      b: r`An alpha particle of kinetic energy 5.0 MeV is fired head-on at a gold nucleus ($Z = 79$). Find the distance of closest approach.`,
      ul: [
        r`Step 1 — $K = 5.0 \times 10^{6} \times 1.6 \times 10^{-19} = 8.0 \times 10^{-13}$ J.`,
        r`Step 2 — $d = \dfrac{9 \times 10^{9} \times 2 \times 79 \times (1.6 \times 10^{-19})^2}{8.0 \times 10^{-13}} \approx ${sci(ex1.d, 3)}$ m (about 45 fm).`,
        r`Meaning — the gold nucleus is smaller than about $4.5 \times 10^{-14}$ m, while the atom is about $10^{-10}$ m: over 2000 times larger.`,
      ],
      v: V.traj,
      n: 'Convert the energy to joules: five million electronvolts is eight times ten to the minus thirteen joule. Then the distance of closest approach is nine times ten to the nine, times two times seventy nine times the electron charge squared, divided by that energy: about four and a half times ten to the minus fourteen metre. The gold nucleus must be smaller than that, thousands of times smaller than the atom.',
    }),
    sl('example', 'Worked example 2: a lighter target', {
      b: r`The same experiment is done with a silver foil ($Z = 47$) and alpha particles of 5.5 MeV. Find the distance of closest approach and compare it with gold at 5.0 MeV.`,
      ul: [
        r`Step 1 — $d = \dfrac{9 \times 10^{9} \times 2 \times 47 \times (1.6 \times 10^{-19})^2}{5.5 \times 10^{6} \times 1.6 \times 10^{-19}} \approx ${sci(ex1.dAg, 3)}$ m.`,
        r`Step 2 — $\dfrac{d_\text{Ag}}{d_\text{Au}} = \dfrac{47}{79} \times \dfrac{5.0}{5.5} \approx ${dec(ex1.dAg / ex1.d, 3)}$: a smaller nuclear charge and a faster particle both let it get closer.`,
      ],
      v: table(['Target', 'Z', 'K (MeV)', 'd (m)'], [['Gold', '79', '5.0', sci(ex1.d, 3).replace(' \\times 10^{-14}', ' × 10⁻¹⁴')], ['Silver', '47', '5.5', sci(ex1.dAg, 3).replace(' \\times 10^{-14}', ' × 10⁻¹⁴')]], 'Worked table comparing the distance of closest approach for gold at 5.0 megaelectronvolts and silver at 5.5 megaelectronvolts'),
      n: 'Silver has a smaller nuclear charge, forty seven instead of seventy nine, so it repels less, and the faster particles also push in further. Both effects shrink the distance of closest approach, here to about two and a half times ten to the minus fourteen metre, a little over half the value for gold. The distance is proportional to Z and inversely proportional to the kinetic energy.',
    }),
    sl('check', 'Quick check: closest approach', {
      b: 'Choose the correct option.',
      v: V.traj,
      chk: 'double-mcq',
      n: 'How does the distance of closest approach depend on the kinetic energy?',
    }),
    sl('two-column', 'Thomson and Rutherford compared', {
      b: 'What the experiment decided:',
      cols: [
        '**Thomson model**\n- Positive charge spread out\n- Only tiny deflections\n- Cannot explain back-scattering',
        '**Rutherford model**\n- Tiny, massive, positive nucleus\n- Mostly empty space\n- Explains rare large-angle scattering',
      ],
      v: scatPlot,
      n: 'The two models make very different predictions. With Thomson’s spread-out charge, no alpha particle could ever be turned back. With Rutherford’s tiny nucleus, most pass straight through empty space, but the rare ones that come very close are swung through large angles. The measured numbers at each angle matched Rutherford’s calculation closely, so the nuclear model won.',
    }),
    sl('concept', 'A problem with the nuclear model', {
      b: 'An electron orbiting the nucleus is **accelerating** (centripetal acceleration). Classical electromagnetism says an accelerating charge **radiates** energy.',
      ul: ['The electron would lose energy and **spiral into the nucleus**: atoms would be unstable.', 'The radiated frequency would change continuously, giving a **continuous** spectrum, but atoms emit **line** spectra.', 'Bohr’s model (Part 2) addresses both problems.'],
      v: V.orbits,
      n: 'Rutherford’s model has a serious flaw. An electron going round in a circle is accelerating towards the centre, and Maxwell’s theory says accelerating charges give out electromagnetic waves. The electron should lose energy and spiral into the nucleus in a tiny fraction of a second. Atoms would collapse, and they would glow with a continuous rainbow, not sharp lines. Neither happens, so something was missing.',
    }),
    sl('check', 'Quick check: what scattering shows', {
      b: 'Judge the assertion and the reason.',
      v: null,
      chk: 'empty-ar',
      n: 'Link the observation that most alpha particles go straight through to the structure of the atom.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Experiment', 'α particles on thin gold foil; count against angle θ'],
          ['Observations', 'Most undeflected; few large angles; some near 180°'],
          ['Nuclear model', 'Tiny massive positive nucleus; atom mostly empty'],
          ['Impact parameter', 'Small b → large θ; b = 0 → θ = 180°'],
          ['Closest approach', '$d = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{2Ze^2}{K}$'],
          ['Problem', 'Orbiting electron should radiate and spiral in'],
        ],
        'Summary table of the scattering experiment, observations, nuclear model, impact parameter, closest approach and the stability problem',
      ),
      n: 'To sum up: alpha particles fired at gold foil mostly passed straight through, but a few were scattered through large angles. Rutherford explained this with a tiny, massive, positive nucleus in a mostly empty atom. The closer the aim, the smaller the impact parameter and the larger the deflection. A head-on particle stops at the distance of closest approach. But orbiting electrons should radiate, which the model could not explain.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'List three observations and the conclusion drawn from each.',
        'Closest approach: equate $K$ to $\\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{2Ze^2}{d}$; convert MeV to J ($1\\ \\text{MeV} = 1.6 \\times 10^{-13}$ J).',
        'Impact parameter: define it, and state that θ falls as b rises.',
        'Give both drawbacks of Rutherford’s model: instability and line spectra.',
      ],
      v: table(['Asked', 'Key point'], [['Why gold?', 'Very thin foils possible'], ['Why most pass through?', 'Atom mostly empty'], ['Why some bounce back?', 'Tiny, massive, positive nucleus']], 'Table of common questions and the key point for each'),
      n: 'Examiners like to pair each observation with its conclusion: straight through means mostly empty space, large angles mean a concentrated positive charge. In closest-approach problems, remember the alpha particle has charge two e and convert mega electronvolts to joules. Define the impact parameter carefully. And be ready with the two failures of the nuclear model.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Atoms — Part 2: The Bohr model and the hydrogen spectrum',
  goals: [
    'State Bohr’s postulates',
    'Derive the radius, speed and energy of the electron in the nth orbit of hydrogen',
    'Explain the hydrogen line spectrum using energy levels',
  ],
  slides: [
    sl('title', 'The Bohr model', {
      b: 'Part 2 — three bold postulates give the sizes and energies of hydrogen’s orbits and explain the bright lines in its spectrum.',
      v: V.levels,
      n: 'In nineteen thirteen Niels Bohr kept Rutherford’s nucleus but added three rules that classical physics did not contain. With them he calculated the radius of the hydrogen atom, the energies its electron can have, and the exact colours of light that hydrogen gives out. In this part we state the rules, derive the results and use them to explain the hydrogen spectrum.',
    }),
    sl('concept', 'Bohr’s postulates', {
      b: 'For the hydrogen atom:',
      ul: ['**1. Stationary orbits:** the electron moves in certain circular orbits **without radiating** energy.', '**2. Quantised angular momentum:** in these orbits $mvr = \\dfrac{nh}{2\\pi}$, $n = 1, 2, 3, \\dots$', '**3. Frequency condition:** when the electron jumps from a higher orbit to a lower one, it emits a **photon** with $h\\nu = E_i - E_f$.'],
      v: V.orbits,
      n: 'Bohr’s first postulate simply declares that in certain orbits the electron does not radiate. The second picks out those orbits: the angular momentum must be a whole number times h over two pi. The third says that light is emitted only when the electron jumps between orbits, as a single photon carrying away exactly the energy difference. These rules were justified by their success.',
    }),
    sl('concept', 'Radius and speed in the nth orbit', {
      b: r`The Coulomb force provides the centripetal force, and angular momentum is quantised:
$$\dfrac{mv^2}{r} = \dfrac{1}{4\pi\varepsilon_0}\dfrac{e^2}{r^2},\qquad mvr = \dfrac{nh}{2\pi}$$
Solving: $$v_n = \dfrac{e^2}{2\varepsilon_0 nh},\qquad r_n = \dfrac{n^2 h^2\varepsilon_0}{\pi m e^2}$$`,
      ul: [r`With the constants, $r_1 \approx ${sci(ex2.r1, 2)}$ m (the **Bohr radius**, 0.53 Å) and $v_1 \approx ${sci(ex2.v1, 3)}$ m s$^{-1}$.`, 'So $r_n = n^2 r_1$ and $v_n = v_1/n$.'],
      v: V.orbits,
      n: 'Set the electric attraction equal to the centripetal force, and combine with the quantised angular momentum. Eliminating the radius gives the speed, which falls as one over n. Eliminating the speed gives the radius, which grows as n squared. Putting in the constants, the smallest orbit has a radius of about half an angstrom, the Bohr radius, and the electron moves at about two times ten to the six metres per second.',
    }),
    sl('concept', 'Energy in the nth orbit', {
      b: r`Kinetic energy $K = \tfrac{1}{2}mv^2 = \dfrac{e^2}{8\pi\varepsilon_0 r}$; potential energy $U = -\dfrac{e^2}{4\pi\varepsilon_0 r}$. So
$$E_n = K + U = -\dfrac{e^2}{8\pi\varepsilon_0 r_n} = -\dfrac{me^4}{8\varepsilon_0^2 h^2 n^2} = -\dfrac{13.6}{n^2}\ \text{eV}$$`,
      ul: ['$K = -E$ and $U = 2E$: the kinetic energy is positive, the total is negative (the electron is **bound**).', 'Ground state $n = 1$: $-13.6$ eV; ionisation energy $= 13.6$ eV.'],
      v: levelPlot,
      n: 'The kinetic energy is half the size of the potential energy and opposite in sign, so the total energy is negative, which means the electron is bound. Substituting the radius gives the famous result: minus thirteen point six electronvolts divided by n squared. The ground state is minus thirteen point six, and that is how much energy it takes to pull the electron right out of the atom.',
    }),
    sl('example', 'Worked example 3: the third orbit', {
      b: r`Find the radius of the $n = 3$ orbit and the electron’s speed in it. (Take $r_1 = 5.3 \times 10^{-11}$ m and $v_1 = 2.18 \times 10^{6}$ m s$^{-1}$.)`,
      ul: [
        r`Step 1 — $r_3 = 3^2 r_1 = 9 \times 5.3 \times 10^{-11} = ${sci(ex2.r, 3)}$ m.`,
        r`Step 2 — $v_3 = \dfrac{v_1}{3} = \dfrac{2.18 \times 10^{6}}{3} \approx ${sci(ex2.v, 3)}$ m s$^{-1}$.`,
      ],
      v: V.orbits,
      n: 'The radius grows as n squared, so the third orbit is nine times the Bohr radius, about four point eight times ten to the minus ten metre. The speed falls as one over n, so the electron moves at a third of its ground-state speed, about seven times ten to the five metres per second. Larger orbits are slower, and much larger.',
    }),
    sl('example', 'Worked example 4: energies in the n = 2 state', {
      b: r`For the electron in the first excited state ($n = 2$), find the total, kinetic and potential energies, and the energy needed to ionise the atom from this state.`,
      ul: [
        r`Step 1 — $E_2 = -\dfrac{13.6}{4} = ${dec(ex3.E, 2)}$ eV.`,
        r`Step 2 — $K = -E_2 = ${dec(ex3.KE, 2)}$ eV; $U = 2E_2 = ${dec(ex3.PE, 2)}$ eV.`,
        r`Step 3 — ionisation from $n = 2$ needs $0 - (${dec(ex3.E, 2)}) = 3.4$ eV.`,
      ],
      v: levelPlot,
      n: 'Divide minus thirteen point six by four: the total energy in the second orbit is minus three point four electronvolts. The kinetic energy is the same size but positive, three point four, and the potential energy is twice the total, minus six point eight. To free the electron from this level we must raise its energy to zero, which takes three point four electronvolts.',
    }),
    sl('check', 'Quick check: Bohr radius', {
      b: 'Calculate the ratio.',
      v: V.orbits,
      chk: 'radius-num',
      n: 'The radius of the nth orbit grows as n squared.',
    }),
    sl('diagram', 'Energy levels and spectral lines', {
      b: r`An electron falling from level $n_i$ to $n_f$ emits a photon:
$$h\nu = E_{n_i} - E_{n_f} = 13.6\left(\dfrac{1}{n_f^2} - \dfrac{1}{n_i^2}\right)\ \text{eV}$$
Each jump gives one sharp **line**; absorbing a photon of exactly the same energy raises the electron.`,
      ul: ['Atoms are excited by heating or by electric discharge; they then fall back, emitting lines.', 'Energies are fixed, so the spectrum is a set of definite wavelengths, not a continuous band.'],
      v: V.levels,
      n: 'Excite hydrogen gas in a discharge tube and its electrons are lifted to higher levels. As they drop back, each jump releases one photon whose energy is the difference between the two levels. Because only certain energies exist, only certain photon energies, and so certain wavelengths, can appear. That is why hydrogen glows with sharp coloured lines instead of a smooth rainbow.',
    }),
    sl('concept', 'The spectral series', {
      b: 'Lines ending on the same lower level form a **series**:',
      v: seriesTable,
      ul: ['Within a series the lines crowd together towards the **series limit** (jump from $n = \\infty$).'],
      n: 'Group the lines by the level they end on. Jumps down to the ground state give the Lyman series, in the ultraviolet. Jumps to n equals two give the Balmer series, mostly visible: red, blue-green and violet lines. Jumps to n equals three give the infrared Paschen series. In each series the lines get closer together towards a limit set by a jump from infinity.',
    }),
    sl('example', 'Worked example 5: the red Balmer line', {
      b: r`Find the wavelength of the photon emitted when the electron in hydrogen falls from $n = 3$ to $n = 2$. (Use $hc = ${dec(HC, 4)}$ eV nm.)`,
      ul: [
        r`Step 1 — $\Delta E = 13.6\left(\dfrac{1}{4} - \dfrac{1}{9}\right) = 13.6 \times \dfrac{5}{36} \approx ${dec(ex4.dE, 3)}$ eV.`,
        r`Step 2 — $\lambda = \dfrac{hc}{\Delta E} = \dfrac{${dec(HC, 4)}}{${dec(ex4.dE, 3)}} \approx ${dec(ex4.lam, 3)}$ nm: **red** light (the first Balmer line; measured value 656 nm, the difference coming from rounded constants).`,
      ],
      v: V.levels,
      n: 'The energy gap between levels three and two is thirteen point six times five thirty-sixths, about one point eight nine electronvolts. Dividing h c by this energy gives about six hundred and fifty eight nanometres, red light. The measured line is at six hundred and fifty six nanometres, so Bohr’s model gets it right to within our rounding. This red line gives hydrogen discharge tubes their pink glow.',
    }),
    sl('example', 'Worked example 6: series limits and line counts', {
      b: r`(a) Find the shortest wavelength in the Lyman series and the wavelength of its first line. (b) An electron is excited to $n = 4$. How many different lines can it produce as it returns to the ground state?`,
      ul: [
        r`(a) Limit: $\lambda = \dfrac{${dec(HC, 4)}}{13.6} \approx ${dec(ex5.lyLim, 3)}$ nm; first line ($2 \to 1$, 10.2 eV): $\lambda = \dfrac{${dec(HC, 4)}}{10.2} \approx ${dec(ex5.ly1, 4)}$ nm. Both ultraviolet.`,
        r`(b) Number of possible jumps $= \dfrac{n(n - 1)}{2} = \dfrac{4 \times 3}{2} = ${ex5.lines}$: 4→3, 4→2, 4→1, 3→2, 3→1, 2→1.`,
      ],
      v: seriesTable,
      n: 'The shortest Lyman wavelength comes from the biggest jump, from infinity to the ground state, thirteen point six electronvolts, about ninety one nanometres. The first and longest Lyman line comes from the smallest jump, two to one, ten point two electronvolts, about one hundred and twenty two nanometres. From level four the electron can go down by any combination of steps, giving six different lines.',
    }),
    sl('check', 'Quick check: which series?', {
      b: 'Choose the correct option.',
      v: seriesTable,
      chk: 'visible-mcq',
      n: 'Which lower level do the visible lines of hydrogen end on?',
    }),
    sl('concept', 'Limits of the Bohr model', {
      b: 'The Bohr model works well for hydrogen and hydrogen-like ions (He⁺, Li²⁺), but:',
      ul: ['It cannot explain the spectra of atoms with **more than one electron**.', 'It cannot explain the different **intensities** of the lines.', 'Its postulates are assumed, not derived; the full explanation needs quantum mechanics (de Broglie waves fitting round the orbit give $2\\pi r = n\\lambda$).'],
      v: flow('LR', [['b', 'Bohr: works for H, He⁺'], ['f', 'Fails for many electrons'], ['q', 'Quantum mechanics']], [['b', 'f'], ['f', 'q']], 'Flow: Bohr’s model works for hydrogen and hydrogen-like ions, fails for many-electron atoms, and is replaced by quantum mechanics'),
      n: 'Bohr’s model is a brilliant stepping stone, but it is not the final story. It works for hydrogen and for ions with a single electron, but not for atoms with several electrons, and it says nothing about why some lines are brighter than others. A neat bonus: if the electron is a de Broglie wave, a whole number of wavelengths fitting round the orbit gives exactly Bohr’s second postulate.',
    }),
    sl('check', 'Quick check: energy of the ground state', {
      b: 'Decide whether the statement is true or false.',
      v: levelPlot,
      chk: 'negative-tf',
      n: 'What does a negative total energy tell you about the electron?',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Postulates', 'Stationary orbits; $mvr = nh/2\\pi$; $h\\nu = E_i - E_f$'],
          ['Radius', '$r_n = n^2 h^2\\varepsilon_0/\\pi m e^2 = 0.53 n^2$ Å'],
          ['Speed', '$v_n = e^2/2\\varepsilon_0 nh \\approx 2.18 \\times 10^6/n$ m s⁻¹'],
          ['Energy', '$E_n = -13.6/n^2$ eV; $K = -E$, $U = 2E$'],
          ['Lines', '$h\\nu = 13.6(1/n_f^2 - 1/n_i^2)$ eV'],
          ['Series', 'Lyman (UV), Balmer (visible), Paschen (IR)'],
        ],
        'Summary table of the Bohr postulates and the radius, speed, energy, line formula and series for hydrogen',
      ),
      n: 'To sum up: Bohr allowed only orbits with angular momentum n h over two pi, in which the electron does not radiate. The radius grows as n squared from half an angstrom, the speed falls as one over n, and the energy is minus thirteen point six over n squared electronvolts. Jumps between levels emit photons of definite energies, giving the Lyman, Balmer and Paschen series.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Derivations: start from $mv^2/r = e^2/4\\pi\\varepsilon_0 r^2$ and $mvr = nh/2\\pi$; show both eliminations.',
        'Ratios: $r \\propto n^2$, $v \\propto 1/n$, $E \\propto -1/n^2$, $K = -E$, $U = 2E$.',
        'For a line: find $\\Delta E$ in eV, then $\\lambda = hc/\\Delta E$ with $hc \\approx 1240$ eV nm.',
        'Number of lines from level n: $n(n - 1)/2$.',
      ],
      v: table(['Asked', 'Key point'], [['Ionisation energy of H?', '13.6 eV'], ['Visible series?', 'Balmer (ends on n = 2)'], ['Why line, not continuous, spectrum?', 'Only discrete energy levels']], 'Table of common questions and the key point for each'),
      n: 'In the derivation, write the force balance and the quantisation rule clearly, then solve for v first and r second. Learn the scalings with n, and the neat relations between kinetic, potential and total energy. For wavelengths, work in electronvolts and divide h c by the energy gap. And the number of lines from level n is n times n minus one over two.',
    }),
  ],
});
