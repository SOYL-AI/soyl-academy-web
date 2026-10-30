// ch14 Semiconductor Electronics — two decks: Part 1 (t01–t02) energy bands, intrinsic and extrinsic semiconductors;
// Part 2 (t03–t04) the p-n junction, its I–V characteristics and the diode as a rectifier. Numbers and graphs computed here.
import { sl, deck, table, flow, svgV, plot, r, sci, dec } from '../../cbse-12-physics-ch01/src/lib.mjs';
import * as G from './svgs.mjs';

export const HC = (6.63e-34 * 3e8) / 1.6e-19 / 1e-9; // eV nm
// forward diode model used in the slides and items: I = 10 mA × exp((V − 0.70 V)/0.05 V)
export const Ifwd = (V) => 10 * Math.exp((V - 0.7) / 0.05);

// ---------------------------------------------------------------- worked-example numbers
const ex1 = {};
ex1.si = HC / G.GAPS.Si;
ex1.ge = HC / G.GAPS.Ge;
ex1.c = HC / G.GAPS.C;
const ex2 = { nSi: 5e28, frac: 1e-6, ni: 1.5e16 };
ex2.ND = ex2.nSi * ex2.frac;
ex2.p = ex2.ni ** 2 / ex2.ND;
const ex3 = { E: 5, Vd: 0.7, R: 1000 };
ex3.I = (ex3.E - ex3.Vd) / ex3.R;
const ex4 = { V1: 0.7, V2: 0.76 };
ex4.I1 = Ifwd(ex4.V1);
ex4.I2 = Ifwd(ex4.V2);
ex4.rd = (ex4.V2 - ex4.V1) / ((ex4.I2 - ex4.I1) / 1000);
const ex5 = { Vrms: 12, f: 50 };
ex5.Vp = ex5.Vrms * Math.SQRT2;
ex5.Vout = ex5.Vp - 0.7;
export const EX = { ex1, ex2, ex3, ex4, ex5 };

export const V = {
  bands: svgV(G.BANDS, 'Band diagrams of a conductor, a semiconductor and an insulator', 'Gaps drawn to scale: Si 1.1 eV, diamond 5.4 eV.'),
  doping: svgV(G.DOPING, 'n-type silicon with an arsenic donor and p-type silicon with a boron acceptor'),
  junction: svgV(G.JUNCTION, 'p-n junction with depletion layer, immobile ions and the field from n to p'),
  bias: svgV(G.BIAS, 'Forward-biased and reverse-biased p-n junction circuits'),
  half: svgV(G.HALFWAVE, 'Half-wave rectifier circuit with transformer, one diode and a load resistor'),
  full: svgV(G.FULLWAVE, 'Full-wave rectifier with centre-tapped transformer and two diodes'),
};

const fwdPts = [];
for (let k = 0; k <= 80; k++) {
  const v = k / 100;
  fwdPts.push([v, Number(Math.min(Ifwd(v), 60).toFixed(4))]);
}
export const fwdPlot = plot(
  {
    x: { min: 0, max: 0.9, label: 'forward voltage V (V)' },
    y: { min: 0, max: 60, label: 'forward current I (mA)' },
    series: [{ label: 'silicon diode (model I = 10 mA × e^((V − 0.70)/0.05))', kind: 'line', points: fwdPts.filter((p) => p[1] < 60) }],
    vlines: [{ x: 0.7, label: 'knee ≈ 0.7 V', dashed: true }],
  },
  'Forward characteristic of a silicon diode: almost no current until about 0.6 volts, then the current rises very steeply beyond the knee voltage of about 0.7 volts',
  'Below the knee the barrier blocks most carriers; above it the current rises exponentially.',
);
const revPts = [];
for (let k = 0; k <= 200; k++) {
  const v = -k / 10;
  const I = v > -15 ? -1 : -1 - (Math.exp((-v - 15) * 2) - 1);
  if (I >= -30) revPts.push([v, Number(I.toFixed(4))]);
}
export const revPlot = plot(
  {
    x: { min: -20, max: 0, label: 'reverse voltage (V)' },
    y: { min: -30, max: 2, label: 'reverse current (μA)' },
    series: [{ label: 'reverse saturation current, then breakdown (schematic)', kind: 'line', points: revPts }],
    vlines: [{ x: -15, label: 'breakdown voltage (here 15 V)', dashed: true }],
  },
  'Reverse characteristic of a diode: a tiny, nearly constant reverse current of about one microampere until the breakdown voltage, where the current increases sharply',
  'Note the different scale: microamperes in reverse, milliamperes forward.',
);
export const halfPlot = plot(
  {
    x: { min: 0, max: 12.6, label: 'time (in units of T/2π)' },
    y: { min: -1.2, max: 1.2, label: 'voltage / peak' },
    functions: [
      { expr: 'sin(x)', label: 'input (AC)' },
      { expr: '(sin(x) + abs(sin(x)))/2', label: 'output across the load (half-wave)' },
    ],
  },
  'Half-wave rectification: the input is a sine wave; the output follows only the positive half-cycles and is zero during the negative half-cycles',
  'Output pulses at the input frequency; half the input is wasted.',
);
export const fullPlot = plot(
  {
    x: { min: 0, max: 12.6, label: 'time (in units of T/2π)' },
    y: { min: -1.2, max: 1.2, label: 'voltage / peak' },
    functions: [
      { expr: 'sin(x)', label: 'input (AC)' },
      { expr: 'abs(sin(x))', label: 'output across the load (full-wave)' },
    ],
  },
  'Full-wave rectification: the output is positive in both half-cycles, giving twice as many pulses per second as the input frequency',
  'Output pulse frequency = 2 × input frequency.',
);

const compareTable = table(
  ['', 'Conductor', 'Semiconductor', 'Insulator'],
  [
    ['Band gap', 'none (bands overlap)', 'small, ≈ 1 eV (Si 1.1, Ge 0.7)', 'large, > 3 eV (diamond 5.4)'],
    ['Resistivity (Ω m)', '10⁻⁸ to 10⁻⁶', '10⁻⁵ to 10⁶', '10¹¹ to 10¹⁹'],
    ['Effect of heating', 'resistance rises', 'resistance falls', 'stays very high'],
  ],
  'Table comparing conductors, semiconductors and insulators: band gap, typical resistivity and effect of temperature',
);
const typeTable = table(
  ['', 'n-type', 'p-type'],
  [
    ['Dopant', 'pentavalent (P, As, Sb)', 'trivalent (B, Al, In)'],
    ['Dopant called', 'donor', 'acceptor'],
    ['Majority carriers', 'electrons', 'holes'],
    ['Minority carriers', 'holes', 'electrons'],
    ['Overall charge', 'neutral', 'neutral'],
  ],
  'Table comparing n-type and p-type semiconductors: dopant valency, donor or acceptor, majority and minority carriers, and overall neutrality',
);

export const deck1 = deck({
  part: 1,
  title: 'Semiconductor Electronics — Part 1: Energy bands and semiconductors',
  goals: [
    'Distinguish conductors, semiconductors and insulators using energy bands',
    'Describe intrinsic semiconductors, electrons and holes',
    'Explain n-type and p-type doping',
  ],
  slides: [
    sl('title', 'Semiconductor Electronics', {
      b: 'Part 1 — why silicon is neither a good conductor nor a good insulator, and how a trace of impurity changes it completely.',
      v: V.bands,
      n: 'Every phone, laptop and solar panel depends on semiconductors such as silicon. On their own they conduct electricity only slightly, but adding a tiny amount of the right impurity changes them dramatically. In this part we use the idea of energy bands to see why some solids conduct and others do not, and how doping makes n-type and p-type semiconductors.',
    }),
    sl('concept', 'From energy levels to energy bands', {
      b: 'In an isolated atom electrons have sharp energy levels. In a crystal, the atoms are so close that each level **spreads into a band** of very closely spaced levels.',
      ul: ['**Valence band:** the band holding the valence electrons (full at 0 K in a semiconductor).', '**Conduction band:** the next band up; electrons here are free to move and carry current.', '**Band gap** $E_g$: the forbidden energy range between them.'],
      v: V.bands,
      n: 'An isolated atom has neat, separate energy levels. Bring about ten to the twenty eight atoms together in a cubic metre of crystal and their outer levels overlap and split into bands of extremely closely spaced levels. The valence band holds the bonding electrons. Above it, after a forbidden gap, is the conduction band, where electrons can move freely. The size of that gap decides everything.',
    }),
    sl('diagram', 'Conductors, semiconductors and insulators', {
      b: 'Compare the band gaps:',
      v: compareTable,
      ul: ['**Conductors:** bands overlap, so many electrons are free.', '**Semiconductors:** a small gap; at room temperature a few electrons gain enough thermal energy to cross it.', '**Insulators:** a large gap; practically no electrons cross it.'],
      n: 'In a metal the valence and conduction bands overlap, so there are always plenty of free electrons: a good conductor. In an insulator like diamond the gap is over five electronvolts, far more than thermal energy at room temperature, which is only about point zero two five electronvolt, so it hardly conducts. Silicon, with a gap of about one electronvolt, lies in between: a semiconductor.',
    }),
    sl('example', 'Worked example 1: light across the gap', {
      b: r`Find the longest wavelength of light that can lift an electron across the band gap of (a) silicon (1.1 eV), (b) germanium (0.7 eV), (c) diamond (5.4 eV). (Use $hc = ${dec(HC, 4)}$ eV nm.)`,
      ul: [
        r`(a) $\lambda = \dfrac{hc}{E_g} = \dfrac{${dec(HC, 4)}}{1.1} \approx ${dec(ex1.si, 4)}$ nm (infrared): all visible light can create electron–hole pairs in Si.`,
        r`(b) $\dfrac{${dec(HC, 4)}}{0.7} \approx ${dec(ex1.ge, 4)}$ nm.`,
        r`(c) $\dfrac{${dec(HC, 4)}}{5.4} \approx ${dec(ex1.c, 3)}$ nm (ultraviolet): visible light cannot, which is why diamond is transparent.`,
      ],
      v: V.bands,
      n: 'A photon can lift an electron across the gap only if its energy is at least the gap energy. For silicon that means wavelengths shorter than about eleven hundred nanometres, which includes all visible light: that is why silicon solar cells work. For diamond the limit is about two hundred and thirty nanometres, in the ultraviolet, so visible light passes straight through.',
    }),
    sl('concept', 'Intrinsic semiconductors: electrons and holes', {
      b: 'A pure (**intrinsic**) semiconductor such as Si or Ge: each atom forms four covalent bonds.',
      ul: ['Thermal energy breaks a few bonds: an electron goes to the conduction band and leaves a **hole** (a missing electron) that acts as a **positive** charge carrier.', 'In an intrinsic semiconductor $n_e = n_h = n_i$.', 'Holes "move" as neighbouring electrons jump into them; in a field, electrons and holes drift in opposite directions but both contribute to current: $I = I_e + I_h$.', 'At 0 K an intrinsic semiconductor is an insulator; its conductivity rises with temperature.'],
      v: V.doping,
      n: 'In pure silicon every atom shares its four outer electrons with four neighbours. At room temperature, thermal vibrations break a few of these bonds. Each freed electron leaves behind a hole, a gap in a bond, which behaves like a positive charge. Nearby electrons can hop into the hole, so the hole moves. In pure silicon the numbers of free electrons and holes are equal.',
    }),
    sl('check', 'Quick check: band gap', {
      b: 'Choose the correct option.',
      v: compareTable,
      chk: 'gap-mcq',
      n: 'Compare the band gaps of the three types of material.',
    }),
    sl('diagram', 'Doping: n-type', {
      b: 'Add a tiny amount (about 1 in 10⁶) of a **pentavalent** impurity (P, As, Sb):',
      ul: ['Four of its five valence electrons form bonds; the **fifth** is very loosely bound (about 0.01–0.05 eV) and is easily freed.', 'The impurity **donates** an electron: a **donor**. Electrons become the **majority** carriers, holes the minority.', 'The donor ion left behind is **positive** but fixed; the crystal as a whole stays **neutral**.'],
      v: V.doping,
      n: 'Replace one silicon atom in a million with arsenic, which has five outer electrons. Four of them form bonds with neighbouring silicon atoms, and the fifth is left hanging, so loosely held that room temperature frees it. Arsenic donates electrons, so it is called a donor. Now there are far more free electrons than holes: an n-type semiconductor, n for negative carriers.',
    }),
    sl('diagram', 'Doping: p-type', {
      b: 'Add a **trivalent** impurity (B, Al, In):',
      ul: ['It forms only three bonds; the fourth bond lacks an electron, leaving a **hole**.', 'A neighbouring electron can fill it, so the impurity **accepts** an electron: an **acceptor**. Holes become the **majority** carriers.', 'The acceptor ion becomes **negative** but fixed; the crystal stays neutral.'],
      v: V.doping,
      n: 'Now replace a silicon atom with boron, which has only three outer electrons. One of its four bonds is missing an electron: a hole. An electron from a nearby bond easily drops into it, so boron accepts electrons and is called an acceptor. The holes it creates outnumber the free electrons, so this is a p-type semiconductor, p for positive carriers.',
    }),
    sl('concept', 'n-type and p-type compared', {
      b: 'In any doped semiconductor in equilibrium, $n_e n_h = n_i^2$.',
      v: typeTable,
      n: 'Here is the comparison. Pentavalent donors make n-type material, with electrons as majority carriers; trivalent acceptors make p-type material, with holes as majority carriers. Both remain electrically neutral overall, because every free carrier is balanced by a fixed ion. Increasing one kind of carrier reduces the other, because the product of the electron and hole densities stays equal to n i squared.',
    }),
    sl('example', 'Worked example 2: carriers in n-type silicon', {
      b: r`Pure silicon has $5 \times 10^{28}$ atoms m$^{-3}$ and $n_i = 1.5 \times 10^{16}$ m$^{-3}$. It is doped with 1 arsenic atom per $10^{6}$ silicon atoms. Find the electron and hole densities.`,
      ul: [
        r`Step 1 — $N_D = \dfrac{5 \times 10^{28}}{10^{6}} = ${sci(ex2.ND, 2)}$ m$^{-3}$; each donor gives one electron, so $n_e \approx ${sci(ex2.ND, 2)}$ m$^{-3}$ (thermal electrons are negligible).`,
        r`Step 2 — $n_h = \dfrac{n_i^2}{n_e} = \dfrac{(1.5 \times 10^{16})^2}{${sci(ex2.ND, 2)}} = ${sci(ex2.p, 2)}$ m$^{-3}$.`,
        'Meaning — doping raises the electron density over a million times and reduces the holes enormously.',
      ],
      v: typeTable,
      n: 'One arsenic atom per million silicon atoms gives five times ten to the twenty two donors per cubic metre, each supplying an electron, millions of times more than the thermally produced carriers. The holes do not stay at their intrinsic value: the product rule gives only about four point five times ten to the nine per cubic metre. A tiny impurity changes the material completely.',
    }),
    sl('check', 'Quick check: majority carriers', {
      b: 'Choose the correct option.',
      v: typeTable,
      chk: 'indium-mcq',
      n: 'Count the valence electrons of the impurity.',
    }),
    sl('check', 'Quick check: neutrality', {
      b: 'Judge the assertion and the reason.',
      v: V.doping,
      chk: 'neutral-ar',
      n: 'Think about the fixed ions left behind by the donors.',
    }),
    sl('two-column', 'Temperature and conduction', {
      b: 'Why heating affects metals and semiconductors oppositely:',
      cols: [
        '**Metal**\n- Number of free electrons fixed\n- Heating increases collisions\n- Resistance rises',
        '**Semiconductor**\n- Heating frees many more carriers\n- This outweighs extra collisions\n- Resistance falls',
      ],
      v: compareTable,
      n: 'Heat a copper wire and its resistance goes up, because its fixed supply of free electrons collides more often with vibrating ions. Heat a semiconductor and its resistance goes down, because thermal energy frees many more electrons and holes across the small band gap, and this effect is much bigger than the increase in collisions. This is the basis of thermistors.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Bands', 'Valence band, band gap, conduction band'],
          ['Classification', 'Overlap: conductor; gap ≈ 1 eV: semiconductor; > 3 eV: insulator'],
          ['Intrinsic', 'n_e = n_h = n_i; holes are positive carriers'],
          ['n-type', 'Pentavalent donor; majority electrons'],
          ['p-type', 'Trivalent acceptor; majority holes'],
          ['Product rule', '$n_e n_h = n_i^2$; doped crystal still neutral'],
        ],
        'Summary table of energy bands, classification of solids, intrinsic semiconductors, n-type and p-type doping and the product rule',
      ),
      n: 'To sum up: in a solid, energy levels spread into bands. Overlapping bands make a conductor, a small gap a semiconductor and a large gap an insulator. Pure semiconductors have equal numbers of electrons and holes. Pentavalent donors make n-type material with electrons in the majority, trivalent acceptors make p-type material with holes in the majority, and the crystal stays neutral throughout.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'Draw three band diagrams side by side, labelling the valence band, conduction band and $E_g$.',
        'Name the dopants: P, As, Sb (donors, n-type); B, Al, In (acceptors, p-type).',
        'Say that doped semiconductors are electrically **neutral**.',
        'Use $n_e n_h = n_i^2$ for minority-carrier problems.',
      ],
      v: table(['Asked', 'Key point'], [['What is a hole?', 'Vacancy of an electron in a bond; acts as +e'], ['Is n-type negatively charged?', 'No: neutral'], ['Why resistance of Si falls on heating?', 'More carriers across the gap']], 'Table of common questions and the key point for each'),
      n: 'Band diagrams are easy marks if they are labelled clearly. Learn which elements are donors and which are acceptors by their valency, five or three. A common trap: n-type material is not negatively charged; it is neutral, because every free electron is matched by a fixed positive ion. And for carrier numbers, use the product rule.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Semiconductor Electronics — Part 2: The p-n junction diode and rectifiers',
  goals: [
    'Explain the formation of the depletion layer and the barrier potential',
    'Describe the I–V characteristics of a diode in forward and reverse bias',
    'Explain half-wave and full-wave rectification with circuits and waveforms',
  ],
  slides: [
    sl('title', 'The p-n junction diode', {
      b: 'Part 2 — joining p-type and n-type silicon makes a one-way valve for current, and turns AC into DC.',
      v: V.junction,
      n: 'Put a piece of p-type silicon in contact with a piece of n-type silicon and something remarkable happens at the boundary: the junction lets current through easily in one direction but hardly at all in the other. This device, the junction diode, is in every phone charger. In this part we see how the junction forms, how it behaves, and how diodes turn alternating current into direct current.',
    }),
    sl('diagram', 'Formation of the depletion layer', {
      b: 'At the junction, electrons **diffuse** from n to p and holes from p to n, where they recombine.',
      ul: ['This leaves a thin **depletion layer** with no mobile carriers, containing fixed **negative acceptor ions** (p side) and **positive donor ions** (n side).', 'These ions set up an **electric field from n to p** and a **barrier potential** (about 0.7 V for Si, 0.3 V for Ge) that opposes further diffusion.', 'Equilibrium: **diffusion current** (majority carriers) = **drift current** (minority carriers pushed by the field).'],
      v: V.junction,
      n: 'Electrons are crowded on the n side and holes on the p side, so they spread across the junction and cancel each other. Near the boundary this leaves only the fixed ions: negative ones on the p side and positive ones on the n side. Their field points from n to p and pushes back further diffusion. Soon a balance is reached, with a barrier of about seven tenths of a volt in silicon.',
    }),
    sl('check', 'Quick check: depletion layer', {
      b: 'Choose the correct option.',
      v: V.junction,
      chk: 'depletion-mcq',
      n: 'What is left in the depletion layer once the mobile carriers have gone?',
    }),
    sl('diagram', 'Forward and reverse bias', {
      b: 'Connect a battery across the junction:',
      ul: ['**Forward bias** (p to +, n to −): the applied voltage **opposes** the barrier; the depletion layer **narrows**; majority carriers cross and a **large** current (mA) flows once V exceeds about 0.7 V (Si).', '**Reverse bias** (p to −, n to +): the barrier **increases** and the layer **widens**; only a tiny **minority-carrier** current (μA) flows, almost independent of voltage, until **breakdown**.'],
      v: V.bias,
      n: 'In forward bias the positive terminal is joined to the p side. The applied voltage works against the barrier, the depletion layer shrinks, and once about point seven volt is reached, majority carriers flood across: a large current. In reverse bias the battery adds to the barrier, the depletion layer widens, and only the few minority carriers drift across, giving a tiny current, until at a high enough voltage the junction breaks down.',
    }),
    sl('diagram', 'Forward characteristic', {
      b: 'Current rises very slowly at first, then **sharply** beyond the **knee (threshold) voltage**, about 0.7 V for Si and 0.3 V for Ge.',
      ul: ['The I–V graph is **not** a straight line: a diode is a **non-ohmic** device.', 'Dynamic resistance $r_d = \\dfrac{\\Delta V}{\\Delta I}$ is small above the knee.'],
      v: fwdPlot,
      n: 'Here is the forward characteristic of a silicon diode, drawn from a simple model. Below about point six volt almost nothing flows. Around point seven volt, the knee, the current shoots up, multiplying several times for every extra tenth of a volt. The graph is a curve, not a straight line, so the diode does not obey Ohm’s law. Its dynamic resistance, delta V over delta I, is only a few ohms above the knee.',
    }),
    sl('example', 'Worked example 3: dynamic resistance', {
      b: r`From the forward characteristic, the current is ${dec(ex4.I1, 2)} mA at 0.70 V and ${dec(ex4.I2, 3)} mA at 0.76 V. Find the dynamic resistance in this range.`,
      ul: [
        r`Step 1 — $\Delta V = 0.76 - 0.70 = 0.06$ V; $\Delta I = ${dec(ex4.I2, 3)} - ${dec(ex4.I1, 2)} = ${dec(ex4.I2 - ex4.I1, 3)}$ mA.`,
        r`Step 2 — $r_d = \dfrac{\Delta V}{\Delta I} = \dfrac{0.06}{${dec((ex4.I2 - ex4.I1) / 1000, 3)}} \approx ${dec(ex4.rd, 3)}$ Ω.`,
      ],
      v: fwdPlot,
      n: 'Read two points on the steep part of the curve. A rise of six hundredths of a volt raises the current from ten to about thirty three milliamperes. Dividing, the dynamic resistance is about two and a half ohms. In the reverse direction, by contrast, a whole volt changes the current by almost nothing, so the reverse resistance is enormous: that is what makes the diode a one-way valve.',
    }),
    sl('diagram', 'Reverse characteristic', {
      b: 'In reverse bias the current is tiny (μA for Si) and almost constant — the **reverse saturation current** — because it depends only on the number of minority carriers.',
      ul: ['At the **breakdown voltage** the reverse current rises sharply.', 'Ordinary rectifier diodes are operated well below breakdown.'],
      v: revPlot,
      n: 'In reverse bias, only minority carriers can cross, and there are very few of them, so the current is a microampere or less and hardly changes with voltage: it is the reverse saturation current. At a large enough reverse voltage, the breakdown voltage, the current suddenly increases. Rectifier diodes are chosen so that this never happens in normal use.',
    }),
    sl('example', 'Worked example 4: a diode in a circuit', {
      b: r`A silicon diode (0.7 V drop when conducting) is connected in forward bias in series with a 1.0 kΩ resistor across a 5.0 V battery. Find the current. What is the current if the diode is reversed?`,
      ul: [
        r`Step 1 — voltage across the resistor $= 5.0 - 0.7 = 4.3$ V.`,
        r`Step 2 — $I = \dfrac{4.3}{1000} = ${dec(ex3.I * 1000, 2)} \times 10^{-3}$ A $= ${dec(ex3.I * 1000, 2)}$ mA.`,
        'Reversed — the diode blocks: only the reverse saturation current (about a microampere or less) flows.',
      ],
      v: V.bias,
      n: 'When the diode conducts, about point seven volt is used up across it, leaving four point three volts across the resistor. Ohm’s law then gives four point three milliamperes. Turn the diode round and it is reverse biased: practically no current flows, only the tiny reverse saturation current. The same component behaves completely differently in the two directions.',
    }),
    sl('check', 'Quick check: biasing', {
      b: 'Judge the assertion and the reason.',
      v: V.bias,
      chk: 'reverse-ar',
      n: 'Which carriers can cross the junction in reverse bias?',
    }),
    sl('diagram', 'Half-wave rectifier', {
      b: 'A diode in series with a load across the secondary of a transformer:',
      ul: ['When end A is **positive**, the diode is forward biased and current flows through the load.', 'In the other half-cycle it is reverse biased: **no current**.', 'Output: pulses of one direction (pulsating DC) at the **same frequency** as the input.'],
      v: halfPlot,
      n: 'In a half-wave rectifier, a single diode connects the transformer to the load. During one half of each cycle the diode is forward biased and current flows; during the other half it is reverse biased and blocks. The load receives a series of positive humps with gaps in between, one hump per cycle, so the output frequency equals the mains frequency. Half the input is wasted.',
    }),
    sl('diagram', 'Full-wave rectifier', {
      b: 'Two diodes and a **centre-tapped** transformer:',
      ul: ['When A is +, **D₁** conducts; when B is +, **D₂** conducts.', 'In both half-cycles current flows through the load in the **same direction**.', 'Output pulses at **twice** the input frequency; both halves of the input are used.'],
      v: V.full,
      n: 'A full-wave rectifier uses a transformer whose secondary has a centre tap, and two diodes. In one half-cycle end A is positive and diode one conducts; in the next, end B is positive and diode two conducts. Either way, current goes through the load in the same direction. The output has a hump in every half-cycle, so its pulse frequency is twice that of the input.',
    }),
    sl('diagram', 'Waveforms compared', {
      b: 'Input and output voltages:',
      v: fullPlot,
      ul: ['Half-wave: one pulse per cycle (output frequency $f$).', 'Full-wave: two pulses per cycle (output frequency $2f$), smoother and more efficient.', 'A **capacitor filter** across the load smooths the pulses into nearly steady DC.'],
      n: 'Compare the outputs. The full-wave output fills in the gaps left by the half-wave rectifier, with a hump every half-cycle. That makes it easier to smooth: a large capacitor across the load charges up at each peak and then supplies current in between, giving an almost steady direct voltage, like the output of a phone charger.',
    }),
    sl('example', 'Worked example 5: a 12 V supply', {
      b: r`A transformer reduces 230 V, 50 Hz mains to 12 V rms (each half of the secondary in the centre-tap case). Find the peak voltage, the approximate peak output across the load (silicon diodes), and the output pulse frequency for half-wave and full-wave rectifiers.`,
      ul: [
        r`Step 1 — $V_0 = \sqrt{2} \times 12 \approx ${dec(ex5.Vp, 3)}$ V.`,
        r`Step 2 — peak output $\approx ${dec(ex5.Vp, 3)} - 0.7 \approx ${dec(ex5.Vout, 3)}$ V.`,
        'Step 3 — half-wave: 50 pulses per second; full-wave: 100 pulses per second.',
      ],
      v: fullPlot,
      n: 'An rms voltage of twelve volts has a peak of twelve times root two, about seventeen volts. One silicon diode conducts at a time and takes about point seven volt, so the load sees peaks of about sixteen point three volts. The half-wave output repeats fifty times a second, like the mains; the full-wave output gives a pulse every half-cycle, a hundred times a second.',
    }),
    sl('check', 'Quick check: output frequency', {
      b: 'Choose the correct option.',
      v: fullPlot,
      chk: 'fwfreq-mcq',
      n: 'How many output pulses does a full-wave rectifier give in each cycle of the input?',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Depletion layer', 'Fixed ions, no mobile carriers; field from n to p'],
          ['Barrier potential', '≈ 0.7 V (Si), 0.3 V (Ge)'],
          ['Forward bias', 'p to +; barrier lowered; large current above the knee'],
          ['Reverse bias', 'p to −; layer widens; tiny saturation current; breakdown'],
          ['Half-wave', 'One diode; output frequency f'],
          ['Full-wave', 'Two diodes, centre tap; output frequency 2f'],
        ],
        'Summary table of the depletion layer, barrier potential, forward and reverse bias and half-wave and full-wave rectifiers',
      ),
      n: 'To sum up: diffusion across a p-n junction leaves a depletion layer of fixed ions and a barrier of about point seven volt in silicon. Forward bias lowers the barrier and a large current flows above the knee; reverse bias raises it and only a tiny saturation current flows until breakdown. A single diode gives half-wave rectification; two diodes and a centre tap give full-wave rectification at twice the frequency.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Draw rectifier circuits with the diode symbol pointing the right way, and show input and output waveforms one below the other.',
        'State which diode conducts in each half-cycle of a full-wave rectifier.',
        'Sketch forward and reverse characteristics with different current scales (mA and μA) and mark the knee and breakdown.',
        'Remember: in forward bias the depletion layer narrows; in reverse bias it widens.',
      ],
      v: table(['Asked', 'Key point'], [['Output frequency, full-wave?', 'Twice the input'], ['Why reverse current saturates?', 'Limited minority carriers'], ['Direction of junction field?', 'n to p']], 'Table of common questions and the key point for each'),
      n: 'In circuit questions, draw neat diagrams with the diode arrows pointing the right way and the waveforms aligned in time. Say clearly which diode conducts in which half-cycle. For characteristics, use separate scales for forward and reverse currents. And keep the depletion layer straight: it narrows in forward bias and widens in reverse bias.',
    }),
  ],
});
