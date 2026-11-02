// ISC 12 Physics ch21 Semiconductor Electronics — two decks: Part 1 (t01–t03) energy bands and the three kinds of solid,
// intrinsic and extrinsic semiconductors, the p-n junction and the V–I characteristics with simple diode circuits;
// Part 2 (t04–t06) half-wave and full-wave rectifiers with the filter capacitor, LED, photodiode and solar cell, the Zener
// diode and its use as a voltage regulator. Constants as stated in the stems: hc = 1240 eV nm, diode drops 0.7 V (Si) and
// 0.3 V (Ge), mains 230 V at 50 Hz. Numbers computed here.
import { sl, deck, table, svgV, plot, r, dec, sci } from '../../isc-12-physics-ch01/src/lib.mjs';
import * as G from './svgs.mjs';

const { cutoff, seriesI, zreg, peak, filterSim, GAPS, VSI, QE } = G;

// ---------------------------------------------------------------- worked-example numbers
const ex1 = { si: cutoff(GAPS.si), ge: cutoff(GAPS.ge), c: cutoff(GAPS.diamond) };
const ex2 = { n: 2.0e21, mu: 0.135, ni: 1.5e16, mue: 0.135, muh: 0.048 };
ex2.sigma = ex2.n * QE * ex2.mu;
ex2.rho = 1 / ex2.sigma;
ex2.sigmaI = ex2.ni * QE * (ex2.mue + ex2.muh);
ex2.rhoI = 1 / ex2.sigmaI;
ex2.ratio = ex2.sigma / ex2.sigmaI;
const ex3 = { E: G.CIRC_DATA.E, Ra: G.CIRC_DATA.Ra, R1: G.CIRC_DATA.R1 };
ex3.Ia = seriesI(ex3.E, ex3.Ra, VSI) * 1000;
ex3.I1 = seriesI(ex3.E, ex3.R1, VSI) * 1000;
const ex4 = { rms: 12, Vd: VSI };
ex4.Vm = peak(ex4.rms);
ex4.out = ex4.Vm - ex4.Vd;
const ex5 = { I: 0.10, C: 1000e-6, f: 50 };
ex5.fw = ex5.I / (2 * ex5.f * ex5.C);
ex5.hw = ex5.I / (ex5.f * ex5.C);
const ex6 = { ...G.ZREG_DATA };
ex6.z = zreg(ex6);
ex6.Pz = ex6.Vz * ex6.z.Iz;
ex6.up = zreg({ ...ex6, Vin: ex6.Vin + 1.0 });
export const EX = { ex1, ex2, ex3, ex4, ex5, ex6 };
for (const [ok, msg] of [
  [Math.abs(ex1.si - 1127.27) < 0.01 && Math.abs(ex1.ge - 1771.43) < 0.01 && Math.abs(ex1.c - 225.45) < 0.01, 'ex1'],
  [Math.abs(ex2.sigma - 43.2) < 1e-9 && Math.abs(ex2.rho - 0.023148) < 1e-5 && Math.round(ex2.ratio / 1000) === 98, 'ex2'],
  [Math.abs(ex3.Ia - 24.0909) < 1e-3 && Math.abs(ex3.I1 - 35.3333) < 1e-3, 'ex3'],
  [Math.abs(ex4.Vm - 16.9706) < 1e-3 && Math.abs(ex4.out - 16.2706) < 1e-3, 'ex4'],
  [Math.abs(ex5.fw - 1.0) < 1e-9 && Math.abs(ex5.hw - 2.0) < 1e-9, 'ex5'],
  [ex6.z.on && Math.abs(ex6.z.I - 0.03) < 1e-12 && Math.abs(ex6.z.IL - 0.01) < 1e-12 && Math.abs(ex6.z.Iz - 0.02) < 1e-12 && Math.abs(ex6.Pz - 0.112) < 1e-12 && Math.abs(ex6.up.Iz - 0.03) < 1e-12, 'ex6'],
])
  if (!ok) throw new Error(`deck number check failed: ${msg}`);

export const V = {
  bands: svgV(G.BANDS, 'Energy bands of a conductor, germanium, silicon and diamond drawn to scale'),
  lattice: svgV(G.LATTICE, 'Covalent-bond pictures of intrinsic, n-type and p-type silicon'),
  doped: svgV(G.DOPED_BANDS, 'Donor and acceptor levels in the band gap of doped silicon'),
  junction: svgV(G.JUNCTION, 'The unbiased p-n junction: depletion region, field and potential barrier'),
  bias: svgV(G.BIAS, 'A p-n junction diode in forward and reverse bias'),
  circs: svgV(G.DIODE_CIRCS, 'Two diode circuits: one diode with a resistor, and two parallel branches'),
  hw: svgV(G.RECT_HW, 'Half-wave rectifier circuit with input and output waveforms'),
  fw: svgV(G.RECT_FW, 'Centre-tap full-wave rectifier circuit with its waveforms'),
  led: svgV(G.LED_FIG, 'A forward-biased LED and the recombination that makes the light'),
  pd: svgV(G.PD_FIG, 'A reverse-biased photodiode and the carriers made by light'),
  solar: svgV(G.SOLAR_FIG, 'A solar cell with its load: pairs separated by the junction field'),
  zreg: svgV(G.ZENER_REG, 'Zener diode voltage regulator with the three currents'),
};

// ---------------------------------------------------------------- plots
const gpt = (Eg) => Number(dec(cutoff(Eg), 6));
export const gapPlot = plot(
  {
    x: { min: 0.5, max: 6, label: 'forbidden gap Eg (eV)' },
    y: { min: 0, max: 2200, label: 'longest wavelength that crosses the gap (nm)' },
    functions: [{ expr: '1240/x', label: 'λ = 1240/Eg', domain: [0.6, 6] }],
    hlines: [
      { y: 400, label: 'violet end of the visible band', dashed: true },
      { y: 700, label: 'red end of the visible band', dashed: true },
    ],
    points: [
      { at: [0.7, gpt(0.7)], label: 'Ge: 1771 nm' },
      { at: [1.1, gpt(1.1)], label: 'Si: 1127 nm' },
      { at: [5.5, gpt(5.5)], label: 'diamond: 225 nm' },
    ],
  },
  'Graph of the longest wavelength able to lift an electron across a forbidden gap, from 0.6 to 6 electronvolts: the curve falls as one over the gap; germanium (0.7) is at 1771 nanometres, silicon (1.1) at 1127 nanometres, both infrared, and diamond (5.5) at 225 nanometres, ultraviolet, below the visible band between the dashed lines at 400 and 700 nanometres',
  'Photons with wavelength above these values cannot lift electrons across the gap.',
);
export const fwdPlot = plot(
  {
    x: { min: 0, max: 0.9, label: 'forward voltage (V)' },
    y: { min: 0, max: 12, label: 'forward current (mA)' },
    functions: [
      { expr: 'exp((x-0.7)/0.0259)', label: 'silicon', domain: [0, 0.78] },
      { expr: 'exp((x-0.3)/0.0259)', label: 'germanium', domain: [0, 0.38] },
    ],
    points: [
      { at: [0.3, 1], label: 'Ge: 1 mA at 0.3 V' },
      { at: [0.7, 1], label: 'Si: 1 mA at 0.7 V' },
    ],
  },
  'Forward characteristics of a germanium and a silicon diode from zero to 0.9 volt: each current is negligible at first and then rises very steeply; the germanium curve turns up at about 0.3 volt and the silicon curve at about 0.7 volt, reaching a milliampere there',
  'Model curves I = I₀ exp(V/V_T) fixed to give 1 mA at the knee; the knee is about 0.3 V for Ge and 0.7 V for Si.',
);
export const revPlot = plot(
  {
    x: { min: -30, max: 0, label: 'reverse voltage (V)' },
    y: { min: -0.3, max: 0.1, label: 'current (μA)' },
    functions: [{ expr: '-0.05-0.002*abs(x)', label: 'reverse current of a silicon diode', domain: [-30, 0] }],
    hlines: [{ y: 0, label: 'zero current', dashed: true }],
    points: [
      { at: [-10, -0.07], label: '−0.07 μA at −10 V' },
      { at: [-30, -0.11], label: '−0.11 μA at −30 V' },
    ],
  },
  'Graph of the reverse current of a silicon diode against reverse voltage from zero to minus 30 volts: the current is a tiny fraction of a microampere and almost constant, only a little larger at 30 volts than at 10 volts',
  'The reverse current is tiny and almost independent of the voltage (until breakdown).',
);
export const zPlot = plot(
  {
    x: { min: -7, max: 1, label: 'voltage across the diode (V)' },
    y: { min: -30, max: 12, label: 'current (mA)' },
    functions: [
      { expr: 'exp((x-0.7)/0.0259)', label: 'forward: like an ordinary diode', domain: [0, 0.78] },
      { expr: '0', label: 'reverse: almost no current', domain: [-5, 0] },
      { expr: '-exp((-x-5.6)/0.12)', label: 'breakdown at V_Z = 5.6 V', domain: [-6.2, -5] },
    ],
    points: [{ at: [-5.6, -1], label: 'Zener voltage V_Z = 5.6 V (current already 1 mA)' }],
  },
  'Characteristic of a Zener diode with a Zener voltage of 5.6 volts: forward the current rises steeply from about 0.7 volt as for an ordinary diode; in reverse almost no current flows until the voltage reaches minus 5.6 volts, where the current falls almost vertically, rising to tens of milliamperes while the voltage hardly changes',
  'In breakdown the voltage stays almost at V_Z while the current changes over a wide range. (Forward and reverse use the same current scale.)',
);
const regK = ex6.RL / (ex6.Rs + ex6.RL);
export const regPlot = plot(
  {
    x: { min: 0, max: 16, label: 'input voltage (V)' },
    y: { min: 0, max: 8, label: 'output voltage (V)' },
    functions: [
      { expr: `${regK.toFixed(6)}*x`, label: 'Zener not conducting: potential divider', domain: [0, ex6.z.Vth] },
      { expr: `${ex6.Vz}`, label: 'Zener in breakdown: output held at V_Z', domain: [ex6.z.Vth, 16] },
    ],
    points: [
      { at: [Number(dec(ex6.z.Vth, 4)), ex6.Vz], label: `regulation begins at ${dec(ex6.z.Vth, 3)} V` },
      { at: [ex6.Vin, ex6.Vz], label: 'worked example: 8.6 V in, 5.6 V out' },
    ],
  },
  'Graph of the output voltage of a Zener regulator against its input voltage from zero to 16 volts for a 100 ohm series resistor, a 560 ohm load and a 5.6 volt Zener diode: the output rises in proportion to the input up to 6.6 volts and then stays flat at 5.6 volts however far the input rises',
  'Above 6.6 V the output is steady at 5.6 V: the regulator at work.',
);
const sim = filterSim({ Vm: 12, f: 50, R: 100, C: 470e-6, full: true, tEnd: 0.06 });
const filtPts = [];
for (let k = 0; k <= 120; k++) {
  const i = Math.round((k * 0.5e-3) / 1e-5);
  filtPts.push([Number((k * 0.5).toFixed(1)), Number(sim.v[i].toFixed(3))]);
}
export const filterPlot = plot(
  {
    x: { min: 0, max: 60, label: 'time (ms)' },
    y: { min: 0, max: 13, label: 'output voltage (V)' },
    functions: [{ expr: '12*abs(sin(2*pi*x/20))', label: 'full-wave output, no capacitor' }],
    series: [{ label: 'with a 470 μF capacitor across a 100 Ω load', kind: 'line', points: filtPts }],
    samples: 600,
  },
  'Graph of a full-wave rectifier output from zero to 60 milliseconds for a peak of 12 volts: without a capacitor the output falls to zero between pulses every 10 milliseconds; with a 470 microfarad capacitor across a 100 ohm load, the output rises with the first peak and then stays between about 9.7 and 12 volts, with a small ripple at 100 hertz',
  'The capacitor charges at each peak and supplies the load in between: the ripple is small.',
);
const lpt = (Eg) => Number(dec(1240 / Eg, 6));
export const ledPlot = plot(
  {
    x: { min: 1.2, max: 3.6, label: 'band gap (eV)' },
    y: { min: 300, max: 1100, label: 'wavelength of the light emitted (nm)' },
    functions: [{ expr: '1240/x', label: 'λ ≈ 1240/Eg', domain: [1.2, 3.6] }],
    hlines: [
      { y: 400, label: 'violet end of the visible band', dashed: true },
      { y: 700, label: 'red end of the visible band', dashed: true },
    ],
    points: [
      { at: [1.9, lpt(1.9)], label: 'red LED: Eg about 1.9 eV' },
      { at: [2.3, lpt(2.3)], label: 'green LED: about 2.3 eV' },
      { at: [2.7, lpt(2.7)], label: 'blue LED: about 2.7 eV' },
    ],
  },
  'Graph of the wavelength of the light from an LED against the band gap of its semiconductor from 1.2 to 3.6 electronvolts: the wavelength falls as one over the gap; a gap of about 1.9 electronvolts gives red light near 653 nanometres, 2.3 gives green near 539 and 2.7 gives blue near 459, all between the dashed lines marking the visible band',
  'A larger band gap gives light of shorter wavelength: red, then green, then blue.',
);

// ---------------------------------------------------------------- tables
const bandTable = table(
  ['Solid', 'Valence and conduction bands', 'Gap Eg', 'Behaviour'],
  [
    ['Conductor', 'Overlap (or conduction band part-filled)', 'none', 'Many free electrons at all temperatures'],
    ['Insulator (diamond)', 'Full valence band, empty conduction band', '5.5 eV', 'No conduction at room temperature'],
    ['Semiconductor (Ge, Si)', 'Same, with a narrow gap', '0.7 eV, 1.1 eV', 'Insulator at 0 K; conducts at room temperature, better when warmer'],
  ],
  'Table comparing a conductor, an insulator and a semiconductor by their bands, band gap and behaviour',
);
const formTable = table(
  ['Stage', 'What happens to the energy levels'],
  [
    ['One isolated atom', 'Sharp, separate energy levels'],
    ['N atoms brought together', 'Electrons of neighbouring atoms interact; each level splits into N close levels'],
    ['N very large (a crystal)', 'The N levels merge into a band; bands are separated by forbidden gaps'],
    ['Outer electrons', 'Fill the valence band; the next band up is the conduction band'],
  ],
  'Table of how atomic energy levels spread into bands as atoms form a crystal',
);
const carrierTable = table(
  ['', 'Intrinsic', 'n-type', 'p-type'],
  [
    ['Impurity', 'none', 'pentavalent donor (P, As, Sb)', 'trivalent acceptor (B, Al, In)'],
    ['Majority carriers', 'electrons = holes', 'electrons', 'holes'],
    ['Minority carriers', '—', 'holes', 'electrons'],
    ['Fixed ions left', '—', 'positive donor ions', 'negative acceptor ions'],
    ['Net charge', '0', '0', '0'],
  ],
  'Table of the impurity, majority carriers, minority carriers and fixed ions of intrinsic, n-type and p-type semiconductors',
);
const stateTable = table(
  ['Bias', 'Barrier', 'Depletion region', 'Current'],
  [
    ['None', 'V₀ (0.7 V for Si)', 'normal width', 'zero net current'],
    ['Forward (p to +)', 'V₀ − V, lower', 'narrower', 'large, rises steeply beyond the knee'],
    ['Reverse (p to −)', 'V₀ + V, higher', 'wider', 'tiny, minority carriers only'],
  ],
  'Table of the barrier, depletion region and current of a p-n junction with no bias, forward bias and reverse bias',
);
const rolesTable = table(
  ['Component', 'Role'],
  [
    ['Transformer', 'Steps the 230 V mains down to the a.c. voltage needed; the centre tap gives two opposite-phase voltages'],
    ['Diode(s)', 'Conduct only when forward biased: rectify'],
    ['Load resistor R_L', 'The device or circuit that is supplied'],
    ['Filter capacitor', 'Charges at the peaks and discharges slowly into the load: smooths the pulses'],
  ],
  'Table of the roles of the transformer, diodes, load and filter capacitor in a rectifier power supply',
);
const deviceTable = table(
  ['Device', 'Bias', 'Light', 'Main use'],
  [
    ['LED', 'forward', 'emitted (recombination)', 'lamps, indicators, displays'],
    ['Photodiode', 'reverse', 'absorbed; current rises with intensity', 'light detectors, remote-control receivers'],
    ['Solar cell', 'none', 'absorbed; gives an emf', 'power from sunlight'],
    ['Zener diode', 'reverse, in breakdown', 'not involved', 'voltage regulation'],
  ],
  'Table comparing an LED, photodiode, solar cell and Zener diode by bias, the part played by light and main use',
);

// ================================================================ deck 1
export const deck1 = deck({
  part: 1,
  title: 'Semiconductor Electronics — Part 1: Bands, doping and the p-n junction diode',
  goals: [
    'Explain how energy bands arise and classify a solid as a conductor, insulator or semiconductor from its band gap',
    'Describe intrinsic and extrinsic semiconductors, holes, doping and the majority and minority carriers of n-type and p-type material',
    'Explain the p-n junction, forward and reverse bias and the V–I characteristics, and solve simple diode-circuit numericals',
  ],
  slides: [
    sl('title', 'Semiconductor Electronics', {
      b: 'Part 1 — why some solids conduct, some do not, and some can be switched: bands, doping and the p-n junction.',
      v: V.bands,
      n: 'Every phone, every television and every charger depends on materials that are neither good conductors nor good insulators. Silicon and germanium conduct a little, and we can change how well they conduct by adding a pinch of another element. In this part we start with the energy bands that explain the difference between solids, then see how doping makes two kinds of semiconductor, and finally join the two to make a diode.',
    }),
    sl('concept', 'Energy bands from atomic levels', {
      b: 'An isolated atom has sharp energy levels. In a crystal, the electrons of neighbouring atoms interact, and the exclusion principle does not let N electrons share one state, so every level splits into N closely spaced levels. For a large crystal these merge into a **band**.',
      ul: ['The band that holds the outer (valence) electrons is the **valence band**; the next band up is the **conduction band**.', 'Between them lies the **forbidden gap** Eg, where there are no electron states.', 'ISC treats energy bands qualitatively: you need the picture, not the theory.'],
      v: formTable,
      n: 'A single atom has sharp energy levels. Bring many atoms together into a crystal and the electrons of neighbouring atoms influence one another. Because no two electrons may share the same state, each level splits into as many closely spaced levels as there are atoms, and these merge into a band. The band holding the outer electrons is the valence band, the next one up is the conduction band, and the empty energy range between them is the forbidden gap.',
    }),
    sl('diagram', 'Conductors, insulators and semiconductors', {
      b: 'The size of the forbidden gap decides how a solid behaves.',
      ul: ['**Conductor:** bands overlap, so electrons are free at all temperatures.', '**Insulator:** a full valence band, an empty conduction band and a large gap (diamond: 5.5 eV).', '**Semiconductor:** the same, but with a small gap: germanium 0.7 eV, silicon 1.1 eV. At 0 K it is an insulator.'],
      v: V.bands,
      n: 'In a conductor the two bands overlap, so electrons are free at every temperature. In an insulator the valence band is full, the conduction band is empty and the gap between them is large; diamond has a gap of five point five electronvolts. A semiconductor has the same arrangement but a narrow gap, point seven for germanium and one point one for silicon, so at the lowest temperatures it is an insulator, but at room temperature a few electrons can cross.',
    }),
    sl('concept', 'What the band gap means for light and heat', {
      b: r`A photon can lift an electron across the gap only if $h\nu \ge E_g$, i.e. its wavelength is at most $\lambda = \dfrac{hc}{E_g} = \dfrac{1240}{E_g}$ nm (Eg in eV).`,
      ul: ['Warming a semiconductor lifts more electrons across the gap, leaving holes behind: its resistance **falls** as the temperature rises.', 'Thermal energy at room temperature is only about 0.026 eV, but the few electrons in the high-energy tail are enough for silicon, and almost none for diamond.', 'Diamond is transparent: no visible photon (1.8–3.1 eV) can cross a 5.5 eV gap.'],
      v: gapPlot,
      n: 'A photon can lift an electron across the gap only if its energy is at least as large as the gap. In wavelength terms, twelve hundred and forty divided by the gap in electronvolts gives the longest wavelength that works. Heating a semiconductor lifts more electrons across, so its resistance falls. Diamond, with a gap of five point five electronvolts, cannot absorb any visible light, which is why it is clear.',
    }),
    sl('example', 'Worked example 1: which light crosses the gap?', {
      b: 'Find the longest wavelength that can lift an electron across the gap in (a) silicon (1.1 eV), (b) germanium (0.7 eV), (c) diamond (5.5 eV), and say whether each is in the visible band (400–700 nm). (hc = 1240 eV nm)',
      ul: [
        r`(a) Si: $\lambda = \dfrac{1240}{1.1} = ${dec(ex1.si, 4)}$ nm: infrared.`,
        r`(b) Ge: $\lambda = \dfrac{1240}{0.7} = ${dec(ex1.ge, 4)}$ nm: infrared, so germanium detects even longer waves.`,
        r`(c) Diamond: $\lambda = \dfrac{1240}{5.5} = ${dec(ex1.c, 4)}$ nm: ultraviolet; no visible photon is absorbed.`,
      ],
      v: gapPlot,
      n: 'For silicon, twelve hundred and forty divided by one point one gives about eleven hundred and thirty nanometres, in the infrared. For germanium the figure is about seventeen hundred and seventy nanometres, even further into the infrared. For diamond it is about two hundred and twenty five nanometres, in the ultraviolet, so visible light passes straight through the crystal.',
    }),
    sl('check', 'Quick check: a germanium detector', {
      b: 'Choose the correct option.',
      v: gapPlot,
      chk: 'gedetect-mcq',
      n: 'Work out the photon energy for each wavelength and compare it with the gap of germanium.',
    }),
    sl('diagram', 'Intrinsic semiconductors: electrons and holes', {
      b: 'A pure crystal is an **intrinsic** semiconductor. Each silicon atom shares its four valence electrons in four covalent bonds. Thermal energy can break a bond: the freed electron wanders in the crystal, and the empty place it leaves is a **hole**.',
      ul: ['Electrons and holes are made in **equal numbers**.', 'A hole behaves as a carrier of charge +e: bonding electrons jump into it, so it drifts the opposite way to the electrons.', 'Current = electron current + hole current.'],
      v: V.lattice,
      n: 'In pure silicon each atom shares its four outer electrons with four neighbours in covalent bonds. Heat can break a bond. The freed electron wanders through the crystal and the empty place is called a hole. Electrons and holes are made in equal numbers. A hole acts like a positive charge, because a neighbouring bonding electron can jump into it and the vacancy moves the other way. The current is the sum of the electron current and the hole current.',
    }),
    sl('diagram', 'Doping: n-type and p-type', {
      b: 'Adding a tiny amount of an impurity (about one atom in 10⁷) is called **doping** and makes an **extrinsic** semiconductor.',
      ul: ['**n-type:** a pentavalent donor (P, As, Sb) uses four electrons in bonds and gives one free electron; it becomes a fixed positive ion.', '**p-type:** a trivalent acceptor (B, Al, In) is one electron short, so there is a hole; it becomes a fixed negative ion.', 'Both kinds stay electrically **neutral**.'],
      v: V.lattice,
      n: 'Adding about one impurity atom in ten million is called doping. A donor atom such as phosphorus has five outer electrons; four make bonds and the fifth is nearly free, and the atom becomes a fixed positive ion. This is n-type material. An acceptor atom such as boron has only three outer electrons, so one bond is short and there is a hole, and the atom becomes a fixed negative ion. This is p-type material. Both kinds stay electrically neutral.',
    }),
    sl('diagram', 'Donor and acceptor levels', {
      b: 'In the band picture a donor adds a level just **below the conduction band**, from which electrons are lifted at room temperature. An acceptor adds a level just **above the valence band**, which valence electrons fill, leaving holes.',
      ul: ['n-type: electrons are the **majority** carriers, holes the **minority** carriers.', 'p-type: holes are the majority carriers, electrons the minority carriers.', 'Warming adds mainly to the minority carriers, since the majority carriers are set by the doping.'],
      v: V.doped,
      n: 'In the energy picture, a donor adds a level just below the conduction band, so even at room temperature its electrons are lifted into the conduction band. An acceptor adds a level just above the valence band, which valence electrons fill, leaving holes behind. In n-type material electrons are the majority carriers and holes the minority; in p-type it is the other way round. Heating mainly adds minority carriers.',
    }),
    sl('example', 'Worked example 2: how much does doping help?', {
      b: 'An n-type silicon bar has 2.0 × 10²¹ free electrons per m³ (electron mobility 0.135 m² V⁻¹ s⁻¹; holes negligible). Pure silicon at 300 K has 1.5 × 10¹⁶ electrons and the same number of holes per m³ (hole mobility 0.048 m² V⁻¹ s⁻¹). Compare the resistivities. (σ = n e μ)',
      ul: [
        r`Doped: $\sigma = n e \mu = 2.0 \times 10^{21} \times 1.6 \times 10^{-19} \times 0.135 = ${dec(ex2.sigma, 3)}$ S m⁻¹, so $\rho = ${sci(ex2.rho, 3)}$ Ω m.`,
        r`Pure: $\sigma_i = n_i e(\mu_e + \mu_h) = 1.5 \times 10^{16} \times 1.6 \times 10^{-19} \times 0.183 = ${sci(ex2.sigmaI, 3)}$ S m⁻¹, so $\rho_i = ${dec(ex2.rhoI, 3)}$ Ω m.`,
        r`Doping lowers the resistivity about $${sci(ex2.ratio, 2)}$ times, with only one atom in 10⁷ replaced.`,
      ],
      v: carrierTable,
      n: 'In the doped bar, conductivity is the number density times the charge times the mobility, about forty three siemens per metre, so the resistivity is only about two hundredths of an ohm metre. Pure silicon has far fewer carriers, a resistivity of over two thousand ohm metres. Doping with one atom in ten million has cut the resistivity by a factor of nearly a hundred thousand.',
    }),
    sl('check', 'Quick check: charge of an n-type bar', {
      b: 'Choose the correct option.',
      v: carrierTable,
      chk: 'neutral-mcq',
      n: 'Count the charges: free electrons on one side, fixed donor ions on the other.',
    }),
    sl('diagram', 'The p-n junction', {
      b: 'Join p-type and n-type material. Electrons diffuse from n to p and holes from p to n, and they **recombine** near the junction, uncovering fixed ions: positive donors on the n side, negative acceptors on the p side.',
      ul: ['This thin layer with no mobile carriers is the **depletion region**.', 'Its field points from n to p and the potential difference V₀ across it is the **barrier potential** (about 0.7 V for Si, 0.3 V for Ge); it stops further diffusion.', 'Width about 1 μm; field about 10⁶ V m⁻¹.'],
      v: V.junction,
      n: 'Now join a piece of p-type to a piece of n-type. Electrons diffuse from the n side and holes from the p side, and they recombine near the junction. That uncovers fixed positive ions on the n side and fixed negative ions on the p side. This thin layer with almost no mobile carriers is the depletion region. Its electric field points from n to p, and the potential difference across it, the barrier, stops any more diffusion.',
    }),
    sl('diagram', 'Forward and reverse bias', {
      b: 'In **forward bias** the battery + is joined to p: the applied voltage opposes V₀, so the barrier falls to V₀ − V, the region narrows and a large current flows. In **reverse bias** the battery + is joined to n: the barrier rises to V₀ + V, the region widens and only a tiny current of minority carriers flows.',
      v: V.bias,
      n: 'Connect the positive terminal of a battery to the p side and the junction is forward biased. The battery voltage opposes the built-in barrier, so the barrier is lowered, the depletion region narrows and a large current flows. Connect it the other way and the junction is reverse biased. The barrier rises, the depletion region widens, and only a tiny current of minority carriers flows.',
    }),
    sl('concept', 'V–I characteristics of a diode', {
      b: r`**Forward:** almost no current until the knee (about 0.7 V for Si, 0.3 V for Ge), then a very steep rise; once conducting the diode drops nearly the same voltage whatever the current. **Reverse:** a tiny current (nA for Si), almost independent of voltage, until breakdown.`,
      ul: [r`Dynamic resistance $r_d = \dfrac{\Delta V}{\Delta I}$ (a few ohms in the steep part); static resistance is $V/I$.`, 'Reverse resistance is very large: a diode conducts one way only.'],
      v: fwdPlot,
      n: 'In the forward direction almost no current flows until the voltage reaches the knee, about point seven of a volt for silicon and point three for germanium. Beyond it the current rises very steeply, so the diode drops almost the same voltage whatever the current. In the reverse direction only a tiny current flows, nearly independent of the voltage. The dynamic resistance is the change of voltage divided by the change of current.',
    }),
    sl('concept', 'Reverse characteristic and the three states', {
      b: 'The reverse current is carried by minority carriers made thermally, so it hardly depends on the voltage and grows with temperature.',
      v: stateTable,
      ul: ['A diode is forward biased when its p side is at the **higher** voltage by more than the knee.'],
      n: 'In reverse the current is carried only by the few thermally generated minority carriers, so it hardly changes with voltage but grows with temperature. The table sums up the three states of a junction: with no bias there is no net current; in forward bias the barrier is lower and the current large; in reverse bias the barrier is higher and the current tiny.',
    }),
    sl('example', 'Worked example 3: simple diode circuits', {
      b: 'A 6.0 V battery is connected as in the figure. Take the forward drop of each silicon diode as 0.7 V and the reverse current as negligible. Find (a) the current in circuit (a), (b) the current in the first branch of circuit (b) and the current in the second.',
      ul: [
        r`(a) The diode is forward biased and drops 0.7 V: $I = \dfrac{6.0 - 0.7}{220} = ${dec(ex3.Ia, 4)} \times 10^{-3}$ A.`,
        r`(b) $D_1$ conducts: $I_1 = \dfrac{6.0 - 0.7}{150} = ${dec(ex3.I1, 4)} \times 10^{-3}$ A.`,
        r`$D_2$ is reverse biased, so branch 2 carries no current: $I_2 \approx 0$.`,
      ],
      v: V.circs,
      n: 'In the first circuit the diode points the way the current flows, so it conducts and drops point seven of a volt, leaving five point three volts across the two hundred and twenty ohm resistor. The current is about twenty four milliamperes. In the second circuit the first diode conducts and the first branch carries about thirty five milliamperes. The second diode is reversed, so it blocks and its branch carries no current.',
    }),
    sl('check', 'Quick check: a diode in series', {
      b: 'Calculate the current.',
      v: V.circs,
      chk: 'series1-num',
      n: 'Subtract the drop across the diode from the battery voltage, then divide by the resistance.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Bands', 'Conductor: overlap; insulator: large Eg; semiconductor: small Eg (Ge 0.7, Si 1.1 eV)'],
          ['Photon needed', '$h\\nu \\ge E_g$, $\\lambda \\le 1240/E_g$ nm'],
          ['n-type / p-type', 'donor, electrons majority / acceptor, holes majority; both neutral'],
          ['p-n junction', 'depletion region, barrier V₀ (Si 0.7 V, Ge 0.3 V)'],
          ['Bias', 'forward: barrier lower, large current; reverse: barrier higher, tiny current'],
        ],
        'Summary table of bands, the photon condition, n-type and p-type material, the junction and bias',
      ),
      n: 'To sum up: the forbidden gap decides whether a solid is a conductor, an insulator or a semiconductor. A photon must carry at least the gap energy to lift an electron across. Doping with donors or acceptors gives n-type or p-type material, both neutral. Joining them makes a depletion region with a barrier, which forward bias lowers, letting a large current flow, and reverse bias raises, allowing only a tiny current.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'Draw band diagrams with the gap clearly larger for the insulator; quote Ge 0.7 eV, Si 1.1 eV, diamond 5.5 eV.',
        'Say that doped crystals are neutral; name donors (pentavalent) and acceptors (trivalent).',
        'In diode circuits decide first whether the diode is forward or reverse biased; subtract 0.7 V (Si) or 0.3 V (Ge) only if it conducts.',
        'Energy bands are qualitative in ISC: do not derive band theory; crystal structure is not examined.',
      ],
      v: table(['Asked', 'Key point'], [['Why is diamond clear?', 'Gap 5.5 eV: no visible photon crosses it'], ['Majority carriers of p-type', 'Holes'], ['Effect of forward bias', 'Barrier and depletion width decrease']], 'Table of common questions and the key point for each'),
      n: 'In answers on bands, make the gap of the insulator visibly the largest and quote the values for germanium, silicon and diamond. Remember that doped semiconductors are neutral. In circuit problems, first decide whether each diode is forward or reverse biased, and only then subtract the diode drop. Energy bands are treated qualitatively in the ISC syllabus, and crystal structure is not examined.',
    }),
  ],
});

// ================================================================ deck 2
export const deck2 = deck({
  part: 2,
  title: 'Semiconductor Electronics — Part 2: Rectifiers, special diodes and the Zener regulator',
  goals: [
    'Draw and explain the half-wave and centre-tap full-wave rectifiers, their waveforms, the role of each component and the filter capacitor',
    'Explain how an LED, a photodiode and a solar cell work and why LEDs save energy',
    'Explain the Zener diode characteristic and the voltage regulator, and solve simple numericals on the series resistor and load current',
  ],
  slides: [
    sl('title', 'Rectifiers, Special Diodes and the Zener Regulator', {
      b: 'Part 2 — from alternating mains to a steady supply, light-emitting and light-sensing diodes, and a diode that holds a voltage.',
      v: V.fw,
      n: 'Mains electricity is alternating, but almost every electronic device needs direct current. In this part we use the one-way property of a diode to rectify the alternating voltage, and a capacitor to smooth it. Then we meet diodes that give out light, sense light, or turn sunlight into electricity, and finally the Zener diode, which can hold a voltage steady.',
    }),
    sl('diagram', 'The half-wave rectifier', {
      b: 'A transformer steps the 230 V mains down; its secondary is connected in series with a diode D and the load R_L.',
      ul: ['Positive half-cycle: D is forward biased, so a current flows through R_L.', 'Negative half-cycle: D is reverse biased, so there is no current.', 'The output is a train of positive pulses, one for each input cycle: the same frequency as the input (50 Hz), with a large ripple.'],
      v: V.hw,
      n: 'In the half-wave rectifier, a transformer steps the mains voltage down, and its secondary is joined in series with one diode and the load. In the half-cycle when the diode is forward biased a current flows through the load. In the other half-cycle the diode is reverse biased and nothing flows. The output is a train of positive pulses, one in every cycle, at the same frequency as the input.',
    }),
    sl('diagram', 'The centre-tap full-wave rectifier', {
      b: 'The secondary has a **centre tap** C. The ends A and B are at equal and opposite voltages with respect to C and go to the anodes of D₁ and D₂; the cathodes are joined to the load, whose other end goes to C.',
      ul: ['When A is positive, D₁ conducts; when B is positive, D₂ conducts.', 'The current always flows the same way through R_L: two pulses per input cycle.', 'Ripple frequency = 2 × 50 = **100 Hz**.'],
      v: V.fw,
      n: 'In the full-wave circuit the secondary has a centre tap. The two ends are at equal and opposite voltages with respect to the tap and feed two diodes whose cathodes are joined to the load. When one end is positive its diode conducts, and when the other end is positive the other diode conducts. The current always flows the same way through the load, so there are two pulses in every cycle, and the ripple frequency is a hundred hertz.',
    }),
    sl('concept', 'The role of each component', {
      b: 'The unfiltered output is unidirectional but **pulsating**, so a power supply uses all of these parts:',
      v: rolesTable,
      ul: ['Four-diode bridge rectifiers are not in the ISC syllabus.', 'The full-wave circuit uses both half-cycles, so it wastes less and is easier to filter than the half-wave circuit.'],
      n: 'Each part has its job. The transformer steps the mains down to a suitable voltage and, with a centre tap, supplies two opposite phases. The diodes conduct one way only, which is what rectifies. The load is the device being supplied. The filter capacitor charges at the peaks and gives the load its current in between, smoothing the pulses. The full-wave circuit uses both halves of the cycle, so it is more efficient.',
    }),
    sl('example', 'Worked example 4: a 12-0-12 supply', {
      b: 'A 12-0-12 V centre-tap transformer (12 V r.m.s. on each half) feeds a full-wave rectifier with two silicon diodes (0.7 V drop when conducting) from 50 Hz mains. Find (a) the peak voltage across the load, (b) the ripple frequency, and compare with a half-wave rectifier on the same supply.',
      ul: [
        r`(a) $V_m = 12\sqrt{2} = ${dec(ex4.Vm, 4)}$ V; peak load voltage $= ${dec(ex4.Vm, 4)} - 0.7 = ${dec(ex4.out, 4)}$ V $\approx ${dec(ex4.out, 3)}$ V.`,
        r`(b) Two pulses per cycle: $2 \times 50 = 100$ Hz.`,
        r`A half-wave rectifier would give pulses at 50 Hz with the same peak.`,
      ],
      v: V.fw,
      n: 'Each half of the secondary gives twelve volts r m s, so the peak is twelve times root two, about seventeen volts. One diode conducts at a time and drops point seven of a volt, so the peak across the load is about sixteen point three volts. There are two pulses in every cycle, so the ripple frequency is a hundred hertz. A half-wave circuit would give the same peak but only fifty pulses a second.',
    }),
    sl('check', 'Quick check: ripple frequency', {
      b: 'Choose the correct option.',
      v: rolesTable,
      chk: 'fwfreq-mcq',
      n: 'How many output pulses does the full-wave circuit give in each input cycle?',
    }),
    sl('concept', 'The filter capacitor', {
      b: r`A capacitor across the load charges to about the peak while the diode conducts, then supplies the load as it **discharges slowly** until the next peak. For a load current $I$ and a time $t$ between peaks, $\Delta V \approx \dfrac{I t}{C}$.`,
      ul: ['Full-wave: $t = \\dfrac{1}{2f}$ (10 ms on 50 Hz); half-wave: $t = \\dfrac{1}{f}$ (20 ms).', 'A larger C or a smaller load current gives a smaller ripple; full-wave halves the ripple of half-wave.'],
      v: filterPlot,
      n: 'Without a capacitor the full-wave output falls to zero between pulses. With a capacitor across the load, it charges up to nearly the peak, and then supplies the load while it discharges slowly until the next peak arrives. The ripple is the charge lost divided by the capacitance. A bigger capacitor, a smaller load current or a higher ripple frequency all make the output smoother.',
    }),
    sl('example', 'Worked example 5: ripple voltage', {
      b: 'A rectifier on 50 Hz mains has a 1000 μF capacitor across a load drawing a steady 0.10 A. Find the ripple (peak to peak) for (a) a full-wave and (b) a half-wave circuit, taking the capacitor to discharge at constant current between peaks.',
      ul: [
        r`(a) $t = \dfrac{1}{100} = 0.010$ s: $\Delta V = \dfrac{I t}{C} = \dfrac{0.10 \times 0.010}{1000 \times 10^{-6}} = ${dec(ex5.fw, 3)}$ V.`,
        r`(b) $t = \dfrac{1}{50} = 0.020$ s: $\Delta V = \dfrac{0.10 \times 0.020}{1000 \times 10^{-6}} = ${dec(ex5.hw, 3)}$ V.`,
        'The full-wave circuit halves the ripple for the same capacitor.',
      ],
      v: filterPlot,
      n: 'In the full-wave circuit the capacitor discharges for a hundredth of a second. The charge lost is the current times the time, and dividing by the capacitance gives a ripple of one volt. In the half-wave circuit the capacitor has to wait twice as long between peaks, so the ripple is two volts. Full-wave rectification halves the ripple for the same capacitor.',
    }),
    sl('diagram', 'The light-emitting diode', {
      b: 'An LED is a p-n junction used in **forward bias**. Electrons and holes are driven into the junction region and **recombine**; each recombination releases energy of about Eg as a **photon**: $h\\nu \\approx E_g$. A series resistor limits the current: R = (V − V_f)/I.',
      ul: ['Colour is set by the band gap of the semiconductor, not by a filament.', 'Reverse biased, an LED does not emit light.'],
      v: V.led,
      n: 'A light-emitting diode is a junction used in forward bias. Electrons from the n side and holes from the p side meet in the junction region and recombine, and the energy released leaves as a photon whose energy is about the band gap. So the colour depends on the gap of the semiconductor. A resistor in series keeps the current at a safe value. Reverse biased, an LED gives out no light.',
    }),
    sl('concept', 'LED colours and saving energy', {
      b: r`A larger gap gives a shorter wavelength: $\lambda \approx \dfrac{1240}{E_g}$ nm, so red LEDs have gaps near 1.9 eV and blue ones near 2.7 eV.`,
      ul: ['An LED turns a much larger fraction of its electrical input into light than a filament lamp, which wastes most as heat.', 'It lasts many times longer and switches on instantly.', 'Less electricity means less fuel burnt in power stations: less CO₂ and other pollution.'],
      v: ledPlot,
      n: 'A larger band gap means a larger photon energy and a shorter wavelength, so red light needs a gap near two electronvolts and blue light a larger one. LEDs are important for saving energy. An LED turns much more of its input into light and wastes little as heat, it lasts much longer than a filament lamp, and the lower demand for electricity means less fuel burnt and less pollution.',
    }),
    sl('check', 'Quick check: a resistor for an LED', {
      b: 'Calculate the resistance.',
      v: ledPlot,
      chk: 'ledr-num',
      n: 'The resistor must take up the part of the battery voltage that the LED does not.',
    }),
    sl('diagram', 'The photodiode', {
      b: 'A photodiode is used in **reverse bias**. A photon with $h\\nu \\ge E_g$ creates an electron–hole pair in the depletion region; the field sweeps the electron to n and the hole to p, so the reverse current rises with the light intensity.',
      ul: ['In the dark the reverse current is tiny, so the change due to light is a large fraction of the total: that is why reverse bias is used.', 'Uses: light meters, optical switches, receivers for remote controls.'],
      v: V.pd,
      n: 'A photodiode is a junction used in reverse bias with a window to let light in. A photon with enough energy creates an electron and hole in the depletion region, and the built-in field sweeps them apart. The reverse current rises with the intensity of the light. Reverse bias is used because the dark current is tiny, so the change caused by light is large in proportion.',
    }),
    sl('diagram', 'The solar cell', {
      b: 'A solar cell is a large-area p-n junction with a thin p layer. Light makes electron–hole pairs near the junction; the junction field sends electrons to the n side and holes to the p side, so the cell is a **source of emf** (about 0.5–0.7 V for silicon) and **needs no battery**.',
      ul: ['A large area gives a large current; cells are joined in series to raise the voltage.', 'Silicon cells respond to photons with $h\\nu \\ge 1.1$ eV (λ below about 1130 nm).'],
      v: V.solar,
      n: 'A solar cell is a junction with a large area and a thin top layer, so light reaches the junction. Photons create electron and hole pairs, and the built-in field sends electrons to the n side and holes to the p side. That gives a potential difference across the cell, so it is itself a source of emf and needs no battery. A large area gives a large current, and cells are joined in series for a higher voltage.',
    }),
    sl('concept', 'The Zener diode', {
      b: 'A Zener diode is a heavily doped junction made to break down sharply at a chosen reverse voltage V_Z. In **reverse bias** nothing flows until V_Z; then the current rises steeply while the voltage across the diode stays almost equal to V_Z. In forward bias it acts like an ordinary diode.',
      ul: ['A Zener diode used in breakdown is not harmed, provided the current is limited by a series resistor.'],
      v: zPlot,
      n: 'A Zener diode is made to break down sharply at a chosen reverse voltage. In reverse bias almost nothing flows until that voltage is reached, and then the current rises very steeply while the voltage across the diode hardly changes. That is not harmful as long as a series resistor limits the current. In the forward direction it behaves like an ordinary diode.',
    }),
    sl('diagram', 'The Zener voltage regulator', {
      b: r`The Zener diode is connected in reverse across the load, with a series resistor $R_s$. In breakdown $V_{out} = V_Z$. The currents obey $I = I_Z + I_L$ with $I = \dfrac{V_{in} - V_Z}{R_s}$ and $I_L = \dfrac{V_Z}{R_L}$.`,
      ul: ['If V_in rises, I rises; the extra current passes through the Zener and the extra voltage drops across R_s.', 'If R_L falls, I_L rises and I_Z falls by the same amount; V_out stays at V_Z (as long as I_Z stays above its minimum).'],
      v: V.zreg,
      n: 'In the regulator the Zener diode is reverse connected across the load and a resistor is in series with the supply. In breakdown the output equals the Zener voltage. The current through the series resistor is the supply voltage minus the Zener voltage, divided by the resistance, and it splits between the load and the Zener diode. If the input rises, the extra current flows through the Zener. If the load takes more current, the Zener takes less.',
    }),
    sl('concept', 'Regulation at work', {
      b: r`Below $V_{th} = V_Z\left(1 + \dfrac{R_s}{R_L}\right)$ the Zener does not conduct and the output follows the input through the potential divider; above it the output is held at $V_Z$.`,
      ul: ['Too small a load resistance: the load takes all the current, I_Z falls to zero and regulation is lost.', 'Too large an input: I_Z may exceed the diode rating, V_Z I_Z > P_max.'],
      v: regPlot,
      n: 'This graph shows the regulator working. At low input the Zener does not conduct and the output simply follows the input through the potential divider formed by the two resistors. Once the input passes a threshold, the Zener conducts and the output is held flat at the Zener voltage, however far the input rises. Regulation fails if the load takes too much current, or if the Zener current exceeds the diode rating.',
    }),
    sl('example', 'Worked example 6: a 5.6 V regulator', {
      b: 'A 5.6 V Zener diode is used with a 100 Ω series resistor and a 560 Ω load from an 8.6 V supply. Find (a) the load current, (b) the current in the series resistor, (c) the Zener current and its power, (d) the Zener current if the input rises to 9.6 V.',
      ul: [
        r`(a) $I_L = \dfrac{5.6}{560} = ${dec(ex6.z.IL * 1000, 3)} \times 10^{-3}$ A.`,
        r`(b) $I = \dfrac{8.6 - 5.6}{100} = ${dec(ex6.z.I * 1000, 3)} \times 10^{-3}$ A.`,
        r`(c) $I_Z = I - I_L = ${dec(ex6.z.Iz * 1000, 3)}$ mA; $P = V_Z I_Z = 5.6 \times 0.020 = ${dec(ex6.Pz, 3)}$ W $= ${dec(ex6.Pz * 1000, 3)}$ mW.`,
        r`(d) $I = \dfrac{9.6 - 5.6}{100} = 40 \times 10^{-3}$ A, $I_L$ unchanged, so $I_Z = ${dec(ex6.up.Iz * 1000, 3)}$ mA; the output stays at 5.6 V.`,
      ],
      v: V.zreg,
      n: 'The load current is five point six volts divided by five hundred and sixty ohms, ten milliamperes. The series resistor has three volts across it, so it carries thirty milliamperes. The Zener diode takes the difference, twenty milliamperes, dissipating about one hundred and twelve milliwatts. If the input rises by one volt, the resistor current rises to forty milliamperes, the load still takes ten, and the Zener takes thirty. The output does not change.',
    }),
    sl('check', 'Quick check: the Zener current', {
      b: 'Calculate the current.',
      v: V.zreg,
      chk: 'iz-num',
      n: 'Find the current in the series resistor and subtract the load current.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: deviceTable,
      n: 'To sum up: a half-wave rectifier gives pulses at the input frequency and a centre-tap full-wave rectifier at twice that frequency, and a filter capacitor smooths them. An LED is forward biased and gives light by recombination, a photodiode is reverse biased and its current rises with light, a solar cell is unbiased and gives an emf from light, and a Zener diode in reverse breakdown holds a steady voltage.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Draw the circuit first (secondary, diode(s), load; centre tap to the load for full-wave) and then the waveforms, with the output frequency stated.',
        'Ripple: ΔV = It/C with t = 1/(2f) for full-wave and 1/f for half-wave.',
        'LED: forward bias, h ν ≈ Eg; photodiode: reverse bias; solar cell: no bias.',
        'Zener: reverse bias across the load with R_s in series; I = I_Z + I_L; the output is V_Z. The bridge rectifier is not in the ISC syllabus.',
      ],
      v: table(['Asked', 'Key point'], [['Output frequency of full-wave', '2 × input frequency'], ['Why reverse bias for a photodiode', 'Tiny dark current: large fractional change'], ['Output of a Zener regulator', 'V_Z, if I_Z stays above its minimum']], 'Table of common questions and the key point for each'),
      n: 'Start every rectifier answer with a clear circuit, then the waveforms, and state the output frequency. For ripple, remember the discharge time is half the period of the supply for full-wave and a whole period for half-wave. Remember the bias for each special diode: forward for the LED, reverse for the photodiode, none for the solar cell. For the regulator, the Zener is reverse biased across the load, and the currents add up.',
    }),
  ],
});
void G;
