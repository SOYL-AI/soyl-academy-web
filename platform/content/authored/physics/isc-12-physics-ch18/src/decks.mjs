// ISC 12 Physics ch18 Dual Nature of Radiation and Matter — two decks: Part 1 (t01–t02) the photoelectric effect, its
// experimental facts, the failure of the wave theory, photons and Einstein's photoelectric equation; Part 2 (t03–t05)
// Planck's constant from the stopping potential–frequency graph, photon momentum, wave–particle duality, de Broglie waves
// and the Davisson–Germer experiment (qualitative). Constants: h = 6.6 × 10⁻³⁴ J s, e = 1.6 × 10⁻¹⁹ C, c = 3 × 10⁸ m/s,
// mₑ = 9.1 × 10⁻³¹ kg (so hc/e = 1237.5 eV nm). Worked-example numbers and graph data are computed here.
import { sl, deck, table, svgV, plot, r, sci, dec } from '../../isc-12-physics-ch01/src/lib.mjs';
import * as G from './svgs.mjs';

const { H, QE, CL, ME, HC, photonEV, thresholdF, thresholdLam, speedOf, lamElectron } = G;

// ---------------------------------------------------------------- worked-example numbers
// ex0: the wave-theory time estimate (a 2.0 W lamp 1.5 m away, an electron collecting over 1.0 × 10⁻²⁰ m², barium 2.5 eV)
const ex0 = { P: 2.0, rr: 1.5, A: 1.0e-20, phi: 2.5 };
ex0.I = ex0.P / (4 * Math.PI * ex0.rr ** 2);
ex0.p = ex0.I * ex0.A;
ex0.t = (ex0.phi * QE) / ex0.p;
// ex1: photons from a 6.0 mW, 412.5 nm LED beam
const ex1 = { P: 6.0e-3, lam: 412.5 };
ex1.eV = photonEV(ex1.lam);
ex1.J = ex1.eV * QE;
ex1.f = CL / (ex1.lam * 1e-9);
ex1.N = ex1.P / ex1.J;
// ex2: magnesium (W₀ = 3.7 eV) in 225 nm ultraviolet
const ex2 = { phi: G.WELL_DATA.phi, lam: G.WELL_DATA.lam };
ex2.E = photonEV(ex2.lam);
ex2.K = ex2.E - ex2.phi;
ex2.v = speedOf(ex2.K);
ex2.lam0 = thresholdLam(ex2.phi);
ex2.f0 = thresholdF(ex2.phi);
// ex3: the ex1 beam on barium (W₀ = 2.5 eV), saturation current 9.6 μA
const ex3 = { phi: 2.5, Isat: 9.6e-6 };
ex3.K = ex1.eV - ex3.phi;
ex3.n = ex3.Isat / QE;
ex3.yield = ex3.n / ex1.N;
// ex4: stopping potentials for four mercury lines on a photocathode of W₀ = 2.0 eV, rounded as a student would record them
const ex4 = { phi: 2.0, lams: [254, 313, 365, 405] };
ex4.f14 = ex4.lams.map((l) => Number((CL / (l * 1e-9) / 1e14).toPrecision(3)));
ex4.V0 = ex4.lams.map((l) => Number((photonEV(l) - ex4.phi).toFixed(2)));
ex4.slope = (ex4.V0[0] - ex4.V0[3]) / ((ex4.f14[0] - ex4.f14[3]) * 1e14);
ex4.h = QE * ex4.slope;
ex4.f0 = ex4.f14[3] * 1e14 - ex4.V0[3] / ex4.slope;
ex4.phiEV = (ex4.h * ex4.f0) / QE;
// ex5: photon momentum and force from a 2.0 mW, 495 nm beam absorbed by a screen
const ex5 = { P: 2.0e-3, lam: 495 };
ex5.p = H / (ex5.lam * 1e-9);
ex5.E = photonEV(ex5.lam) * QE;
ex5.N = ex5.P / ex5.E;
ex5.F = ex5.N * ex5.p;
// ex6: an electron accelerated through 240 V
const ex6 = { V: 240 };
ex6.lam = lamElectron(ex6.V);
ex6.v = speedOf(ex6.V);
ex6.p = ME * ex6.v;
export const EX = { ex0, ex1, ex2, ex3, ex4, ex5, ex6 };
for (const [ok, msg] of [
  [Math.abs(ex0.t - 565.5) < 1 && ex0.t > 60, 'ex0'],
  [Math.abs(ex1.eV - 3) < 1e-9 && Math.abs(ex1.N - 1.25e16) < 1e10, 'ex1'],
  [Math.abs(ex2.E - 5.5) < 1e-9 && Math.abs(ex2.K - 1.8) < 1e-9 && Math.abs(ex2.v - 7.95e5) < 1e3 && Math.round(ex2.lam0) === 334, 'ex2'],
  [Math.abs(ex3.K - 0.5) < 1e-9 && Math.abs(ex3.n - 6.0e13) < 1e9 && Math.abs(1 / ex3.yield - 208.3) < 0.1, 'ex3'],
  [ex4.V0.join() === '2.87,1.95,1.39,1.06' && ex4.f14.join() === '11.8,9.58,8.22,7.41' && Math.abs(ex4.h - 6.6e-34) < 0.01e-34 && Math.abs(ex4.phiEV - 2.0) < 0.01, 'ex4'],
  [Math.abs(ex5.F - ex5.P / CL) < 1e-18 && Math.abs(ex5.N - 5.0e15) < 1e10, 'ex5'],
  [Math.abs(ex6.lam * 1e12 - 78.95) < 0.01 && Math.abs(H / ex6.p - ex6.lam) < 1e-20, 'ex6'],
])
  if (!ok) throw new Error(`deck number check failed: ${msg}`);

export const V = {
  hertz: svgV(G.HERTZ, 'Hertz’s spark-gap observation with ultraviolet light and a glass sheet'),
  lenard: svgV(G.LENARD, 'Lenard’s photoelectric apparatus with potential divider and reversing key'),
  well: svgV(G.WELL, 'Energy picture of Einstein’s photoelectric equation', 'Drawn to scale for 225 nm ultraviolet on magnesium (W₀ = 3.7 eV).'),
  dgApp: svgV(G.DG_APP, 'Davisson–Germer apparatus'),
  dgPolar: svgV(G.DG_POLAR, 'Davisson–Germer polar curves at 44, 54 and 64 V', 'Qualitative: the sharpest spur is at 54 V, near 50°.'),
  rings: svgV(G.RINGS, 'Electron diffraction rings from a thin foil'),
};

// ---------------------------------------------------------------- graphs (computed)
/** Photocurrent against collector potential: zero below −V₀, rising smoothly to the saturation value. */
const IV = (Isat, V0, lo, hi) => {
  const pts = [];
  // 0.25 V steps plus the exact cut-off point keep each series small
  const xs = new Set();
  for (let k = Math.round(lo * 4); k <= Math.round(hi * 4); k++) xs.add(k / 4);
  xs.add(-V0);
  for (const v of [...xs].sort((a, b) => a - b)) pts.push([v, v <= -V0 ? 0 : Number((Isat * Math.tanh((v + V0) / 0.9)).toFixed(3))]);
  return pts;
};
export const ivIntensity = plot(
  {
    x: { min: -1.5, max: 4, label: 'collector potential V (V)' },
    y: { min: 0, max: 3.5, label: 'photocurrent (relative)' },
    series: [
      { label: 'intensity I', kind: 'line', points: IV(1, ex3.K, -1.5, 4) },
      { label: 'intensity 2I', kind: 'line', points: IV(2, ex3.K, -1.5, 4) },
      { label: 'intensity 3I', kind: 'line', points: IV(3, ex3.K, -1.5, 4) },
    ],
    vlines: [{ x: -ex3.K, label: 'stopping potential −0.5 V (all three)', dashed: true }],
  },
  'Graph of photocurrent against collector potential for 412.5 nanometre light on barium at three intensities: each curve is zero below minus 0.5 volt, rises as the collector becomes less negative and then levels off; the level is proportional to the intensity, but all three curves start from the same stopping potential',
  'One frequency, three intensities: saturation current ∝ intensity; stopping potential unchanged.',
);
const fr = [3.0, 3.75, 4.5].map((E) => ({ E, V0: E - ex3.phi, f14: thresholdF(E) / 1e14 }));
export const ivFrequency = plot(
  {
    x: { min: -2.5, max: 4, label: 'collector potential V (V)' },
    y: { min: 0, max: 1.2, label: 'photocurrent (relative)' },
    series: fr.map((x, i) => ({ label: `f${'₁₂₃'[i]} = ${x.f14.toFixed(2)} × 10¹⁴ Hz (stops at −${x.V0.toFixed(2)} V)`, kind: 'line', points: IV(1, x.V0, -2.5, 4) })),
  },
  'Graph of photocurrent against collector potential for barium lit by three frequencies with the same number of photons per second: the three curves level off at the same saturation current, but the higher the frequency, the more negative the potential needed to stop the current, 0.5, 1.25 and 2.0 volts',
  'Same photon rate, three frequencies: same saturation current; higher frequency, larger stopping potential.',
);
export const photonPlot = plot(
  {
    x: { min: 200, max: 800, label: 'wavelength λ (nm)' },
    y: { min: 0, max: 6.5, label: 'photon energy (eV)' },
    functions: [{ expr: '1237.5/x', label: 'E = hc/λ = 1237.5/λ eV', domain: [200, 800] }],
    hlines: [{ y: 2.5, label: 'work function of barium, 2.5 eV', dashed: true }],
    points: [
      { at: [225, 5.5], label: '225 nm: 5.5 eV' },
      { at: [412.5, 3], label: '412.5 nm: 3.0 eV' },
      { at: [495, 2.5], label: 'barium threshold, 495 nm' },
    ],
  },
  'Graph of photon energy against wavelength from 200 to 800 nanometres: the energy falls as 1237.5 divided by the wavelength, 5.5 electronvolts at 225 nanometres and 3.0 at 412.5 nanometres; a dashed line at 2.5 electronvolts, the work function of barium, meets the curve at 495 nanometres, so only shorter wavelengths can free electrons from barium',
  'Shorter wavelength, more energetic photons. Only photons above the dashed line can free electrons from barium.',
);
const s14 = (H * 1e14) / QE; // volts per 10¹⁴ Hz = 0.4125
const fBa = thresholdF(2.5) / 1e14;
const fMg = thresholdF(3.7) / 1e14;
export const V0F = { s14, fBa, fMg };
export const v0Plot = plot(
  {
    x: { min: 0, max: 16, label: 'frequency f (10¹⁴ Hz)' },
    y: { min: 0, max: 4.5, label: 'stopping potential V₀ (V)' },
    functions: [
      { expr: `${s14}*(x - ${fBa.toFixed(3)})`, label: `barium, W₀ = 2.5 eV (f₀ = ${fBa.toFixed(2)} × 10¹⁴ Hz)`, domain: [Number(fBa.toFixed(3)), 16] },
      { expr: `${s14}*(x - ${fMg.toFixed(3)})`, label: `magnesium, W₀ = 3.7 eV (f₀ = ${fMg.toFixed(2)} × 10¹⁴ Hz)`, domain: [Number(fMg.toFixed(3)), 16] },
    ],
  },
  'Graph of stopping potential against frequency for barium and magnesium: two parallel straight lines, each starting on the frequency axis at that metal’s threshold frequency, about 6.06 and 8.97 times ten to the fourteen hertz, and rising with the same slope h over e, 0.4125 volt for every ten to the fourteen hertz',
  'Same slope h/e for every metal; the line starts at the threshold frequency f₀ = W₀/h.',
);
export const dataPlot = plot(
  {
    x: { min: 4, max: 13, label: 'frequency f (10¹⁴ Hz)' },
    y: { min: 0, max: 3.5, label: 'stopping potential V₀ (V)' },
    series: [{ label: 'measured (mercury lines)', kind: 'scatter', points: ex4.f14.map((f, i) => [f, ex4.V0[i]]) }],
    functions: [{ expr: `${(ex4.slope * 1e14).toFixed(5)}*(x - ${(ex4.f0 / 1e14).toFixed(4)})`, label: 'best line through the end points', domain: [Number((ex4.f0 / 1e14).toFixed(4)), 13] }],
  },
  'Scatter graph of four measured stopping potentials against frequency for the mercury lines at 405, 365, 313 and 254 nanometres, with a straight line through them: the line cuts the frequency axis at about 4.84 times ten to the fourteen hertz, and its slope gives Planck’s constant',
  'Slope = h/e; intercept on the f axis = f₀; W₀ = h f₀.',
);
const kLam = lamElectron(1) * 1e12; // pm √V
export const lamPlot = plot(
  {
    x: { min: 0, max: 1000, label: 'accelerating potential V (V)' },
    y: { min: 0, max: 300, label: 'de Broglie wavelength λ (pm)' },
    functions: [{ expr: `${kLam.toFixed(2)}/sqrt(x)`, label: `electron: λ = ${dec(kLam / 1000, 4)}/√V nm`, domain: [20, 1000] }],
    points: [{ at: [240, Number((kLam.toFixed(2) / Math.sqrt(240)).toFixed(3))], label: '240 V: 79.0 pm' }],
  },
  'Graph of the de Broglie wavelength of an electron, in picometres, against the potential difference that accelerated it, from 20 to 1000 volts: the wavelength falls steeply at first and then slowly, as one over the square root of the voltage, to 79 picometres at 240 volts, comparable to the spacing of atoms in a crystal',
  'λ = h/√(2meV) ≈ 1.22/√V nm with h = 6.6 × 10⁻³⁴ J s.',
);

// ---------------------------------------------------------------- tables
const factsTable = table(
  ['Observation (Lenard and others)', 'Wave theory expects', 'Agrees?'],
  [
    ['No emission below a threshold frequency f₀, however bright the light', 'Any frequency works if the light is bright enough', 'No'],
    ['K_max (and V₀) rises with frequency, not with intensity', 'K_max should rise with intensity', 'No'],
    ['Emission starts at once (within about 10⁻⁹ s), even in dim light', 'A delay while each electron gathers energy', 'No'],
    ['Saturation current ∝ intensity', 'More energy, more electrons', 'Yes'],
  ],
  'Table comparing four experimental facts of the photoelectric effect with what the wave theory of light expects: only the proportionality of the saturation current to intensity agrees',
);
const W0 = [['Rubidium', 2.1], ['Barium', 2.5], ['Strontium', 2.6], ['Calcium', 2.9], ['Magnesium', 3.7], ['Aluminium', 4.1], ['Tungsten', 4.5], ['Copper', 4.7], ['Platinum', 5.6]];
const wfTable = table(
  ['Metal', 'W₀ (eV)', 'Threshold wavelength λ₀ (nm)', 'Region'],
  W0.map(([m, p]) => [m, p.toFixed(1), String(Math.round(thresholdLam(p))), thresholdLam(p) > 400 ? 'visible' : 'ultraviolet']),
  'Table of approximate work functions used in this chapter and the threshold wavelengths they give, from rubidium at 2.1 electronvolts and 589 nanometres to platinum at 5.6 electronvolts and 221 nanometres',
  'Typical values (they depend on the state of the surface); λ₀ = 1237.5/W₀ nm.',
);
const explainTable = table(
  ['Fact', 'Explanation from hf = W₀ + K_max'],
  [
    ['Threshold f₀', 'A photon must bring at least W₀: hf₀ = W₀'],
    ['K_max ∝ (f − f₀), not intensity', 'Each electron takes one photon; intensity only changes the number of photons'],
    ['No time lag', 'A photon gives all its energy to one electron at once'],
    ['Current ∝ intensity', 'More photons per second free more electrons per second'],
  ],
  'Table of how Einstein’s equation explains the threshold frequency, the dependence of maximum kinetic energy on frequency only, the absence of a time lag and the proportionality of current to intensity',
);
const photonTable = table(
  ['Property of a photon', 'Value'],
  [
    ['Energy', '$E = hf = \\dfrac{hc}{\\lambda}$'],
    ['Momentum', '$p = \\dfrac{h}{\\lambda} = \\dfrac{E}{c}$'],
    ['Speed in vacuum', '$c$, for every frequency'],
    ['Rest mass', 'zero'],
    ['Charge', 'zero (not deflected by fields)'],
  ],
  'Table of the properties of a photon: energy h f, momentum h over lambda, speed c, zero rest mass and zero charge',
);
const dualTable = table(
  ['', 'Wave behaviour shown by', 'Particle behaviour shown by'],
  [
    ['Light', 'Interference, diffraction, polarisation', 'Photoelectric effect (photons of energy hf, momentum h/λ)'],
    ['Electrons', 'Diffraction by crystals (Davisson–Germer, thin foils)', 'Definite charge and mass; tracks; deflection in fields'],
  ],
  'Table showing that both light and electrons display wave behaviour in some experiments and particle behaviour in others',
);
const objTable = table(
  ['Object', 'Mass', 'Speed', 'λ = h/(mv)'],
  [
    ['Electron through 240 V', '9.1 × 10⁻³¹ kg', `${sci(ex6.v, 3).replace(' \\times 10^{6}', ' × 10⁶')} m/s`, '79.0 pm (atomic spacing)'],
    ['Sprinter', '66 kg', '10 m/s', '1.0 × 10⁻³⁶ m'],
    ['Rifle bullet', '0.010 kg', '660 m/s', '1.0 × 10⁻³⁴ m'],
  ],
  'Table comparing de Broglie wavelengths: an electron accelerated through 240 volts has a wavelength of 79 picometres, comparable to atomic spacings, while a sprinter or a bullet has a wavelength far too small to detect',
);

export const deck1 = deck({
  part: 1,
  title: 'Dual Nature of Radiation and Matter — Part 1: The photoelectric effect and photons',
  goals: [
    'Describe Hertz’s and Lenard’s observations and how photocurrent depends on intensity, frequency and collector potential',
    'Explain why the wave theory of light fails to explain the photoelectric effect',
    'Use Einstein’s equation K_max = hf − W₀ to find maximum kinetic energy, stopping potential, threshold frequency and threshold wavelength',
  ],
  slides: [
    sl('title', 'Dual Nature of Radiation and Matter', {
      b: 'Part 1 — light that knocks electrons out of metals, and the idea of the photon.',
      v: V.lenard,
      n: 'By the end of the nineteenth century light was firmly a wave: it interferes, diffracts and is polarised. Then a set of simple experiments showed light knocking electrons out of metal surfaces in a way no wave could. In this part we look at those experiments, see exactly where the wave theory breaks down, and meet Einstein’s explanation in terms of packets of light energy called photons.',
    }),
    sl('diagram', 'Hertz’s observation (1887)', {
      b: 'While producing radio waves with a spark gap, Hertz noticed that sparks jumped across the small **receiver gap** more readily when **ultraviolet light** from the transmitter spark fell on it.',
      ul: ['A glass sheet in between (glass absorbs ultraviolet) made the receiver sparks shorter; a quartz sheet (transparent to ultraviolet) did not.', 'Hallwachs then found that a negatively charged zinc plate in ultraviolet light loses its charge: light frees **negative** charges from metals.', 'These charges were later shown to be electrons: **photoelectrons**.'],
      v: V.hertz,
      n: 'Hertz was studying radio waves made by a spark across a gap. He noticed that a small receiver gap sparked more easily when ultraviolet light from the main spark reached it. A sheet of glass, which absorbs ultraviolet, weakened the effect; quartz, which lets it through, did not. Soon after, it was found that ultraviolet light makes a negatively charged zinc plate lose its charge. Light was freeing electrons from metals.',
    }),
    sl('diagram', 'Lenard’s apparatus', {
      b: 'An evacuated bulb holds an **emitter** C and a **collector** A. Monochromatic light enters through a **quartz window** (it passes ultraviolet) and falls on C. A battery across a rheostat with a **reversing key** sets the potential V of A relative to C; a microammeter reads the **photocurrent**.',
      ul: ['The vacuum lets electrons reach A without colliding with gas molecules.', 'A positive: A attracts the electrons. A negative: A repels them (a **retarding** potential).'],
      v: V.lenard,
      n: 'Lenard sealed two metal plates in an evacuated bulb. Light of a single frequency enters through a quartz window and falls on the emitter. Electrons freed from it travel to the collector, and the microammeter reads the resulting photocurrent. A potential divider and a reversing key let him make the collector either positive, to attract the electrons, or negative, to push them back.',
    }),
    sl('diagram', 'Photocurrent, intensity and potential', {
      b: r`Keep the frequency fixed (above threshold) and vary the collector potential V:`,
      ul: ['Even at V = 0 a current flows: the electrons leave C with kinetic energy.', 'As V is made positive, the current rises to a **saturation** value, when every emitted electron is collected. Saturation current ∝ intensity.', r`As V is made negative, the current falls; it is zero at $V = -V_0$, the **stopping potential**: $eV_0 = K_{\max}$.`, 'V₀ is the same for every intensity.'],
      v: ivIntensity,
      n: 'With light of one frequency, a current flows even with no voltage, because the electrons leave the emitter with some kinetic energy. Making the collector positive gathers more of them until every emitted electron is collected: the current saturates, and the saturation current is proportional to the intensity. Making the collector negative turns electrons back, and at the stopping potential even the fastest are stopped. Notice that the stopping potential is the same for all three intensities.',
    }),
    sl('diagram', 'The effect of frequency', {
      b: 'Now keep the number of photons per second fixed and change the frequency f:',
      ul: ['The **stopping potential rises with frequency**: the fastest electrons are faster.', 'The saturation current is unchanged: the same number of electrons is freed each second.', 'Below a **threshold frequency** f₀, characteristic of the metal, there is **no current at all**, however intense the light.'],
      v: ivFrequency,
      n: 'Now change the colour of the light while keeping the number of photons per second the same. The curves level off at the same saturation current, but a higher frequency needs a larger negative potential to stop the current, so the fastest electrons must be faster. And below a certain threshold frequency, which depends on the metal, no electrons come out at all, no matter how bright the light.',
    }),
    sl('check', 'Quick check: reading two curves', {
      b: 'Choose the correct option.',
      v: ivIntensity,
      chk: 'curves-mcq',
      n: 'Where do the two curves meet the potential axis, and how high do they level off?',
    }),
    sl('concept', 'Why the wave theory fails', {
      b: 'In the wave theory, light energy is spread continuously over the wavefront and delivered at a rate set by the **intensity**. That predicts the opposite of three key facts:',
      v: factsTable,
      n: 'If light were only a wave, its energy would be spread evenly over the wavefront. A brighter beam would deliver energy faster, so electrons should come out faster, and any colour should work if it is bright enough, after a delay while energy builds up. Experiments show the opposite: a threshold frequency, a maximum kinetic energy set by the frequency alone, and no delay at all. Only the link between intensity and current agrees.',
    }),
    sl('example', 'Worked example 1: how long would a wave take?', {
      b: 'A 2.0 W lamp radiates uniformly in all directions. A barium surface (W₀ = 2.5 eV) is 1.5 m away. On the wave theory, an electron can collect energy only from an area of about 1.0 × 10⁻²⁰ m² (roughly one atom). Estimate how long it would need to gather 2.5 eV.',
      ul: [
        r`Intensity at 1.5 m: $I = \dfrac{P}{4\pi r^2} = \dfrac{2.0}{4\pi \times 1.5^2} \approx ${dec(ex0.I, 3)}$ W m⁻².`,
        r`Power reaching one electron: $IA \approx ${dec(ex0.I, 3)} \times 1.0 \times 10^{-20} = ${sci(ex0.p, 3)}$ W.`,
        r`Time: $t = \dfrac{2.5 \times 1.6 \times 10^{-19}}{${sci(ex0.p, 3)}} \approx ${dec(ex0.t, 3)}$ s, about ${Math.round(ex0.t / 60)} minutes. Experiment: emission within about $10^{-9}$ s.`,
      ],
      v: table(['Quantity', 'Value'], [['Intensity 1.5 m from 2.0 W', `${dec(ex0.I, 3)} W m⁻²`], ['Power on 1.0 × 10⁻²⁰ m²', `${sci(ex0.p, 3).replace(' \\times 10^{-22}', ' × 10⁻²²')} W`], ['Wave-theory delay', `about ${Math.round(ex0.t / 60)} min`], ['Observed delay', 'less than 10⁻⁹ s']], 'Table of the wave-theory estimate: intensity, power reaching one electron, the predicted delay of about nine minutes, and the observed delay of under a nanosecond'),
      n: 'The lamp’s two watts spread over a sphere of radius one and a half metres, giving about seven hundredths of a watt per square metre. An area the size of an atom then receives only about seven times ten to the minus twenty two watts. Gathering two and a half electronvolts would take over nine minutes. In reality the electrons appear within a billionth of a second.',
    }),
    sl('concept', 'Quantisation of radiation: photons', {
      b: r`Planck (1900) had found that the radiation from hot bodies is emitted in packets of energy $hf$. **Einstein (1905)** went further: light itself travels as packets, **photons**, each of energy
$$E = hf = \dfrac{hc}{\lambda},\qquad h = 6.6 \times 10^{-34}\ \text{J s}$$`,
      ul: ['Intensity = (number of photons per second per unit area) × hf.', 'A photon is absorbed whole, by one electron, or not at all.', r`Useful: $\dfrac{hc}{e} = 1237.5$ eV nm with these constants, so $E\,(\text{eV}) = \dfrac{1237.5}{\lambda\,(\text{nm})}$.`],
      v: photonPlot,
      n: 'Planck had already shown that hot bodies emit radiation in packets of energy h f. Einstein proposed that light itself travels in such packets, called photons. Each photon carries energy h f, or h c over lambda, where h is Planck’s constant. A brighter beam means more photons, not bigger ones. And a photon is absorbed whole, by a single electron.',
    }),
    sl('example', 'Worked example 2: counting photons', {
      b: 'A blue-violet LED gives a 6.0 mW beam of wavelength 412.5 nm. Find the energy of each photon, in J and eV, its frequency, and the number of photons emitted per second.',
      ul: [
        r`$E = \dfrac{hc}{\lambda} = \dfrac{6.6 \times 10^{-34} \times 3 \times 10^{8}}{412.5 \times 10^{-9}} = ${sci(ex1.J, 2)}$ J $= ${dec(ex1.eV, 2)}$ eV.`,
        r`$f = \dfrac{c}{\lambda} \approx ${sci(ex1.f, 3)}$ Hz.`,
        r`$N = \dfrac{P}{E} = \dfrac{6.0 \times 10^{-3}}{4.8 \times 10^{-19}} = ${sci(ex1.N, 3)}$ photons per second.`,
      ],
      v: photonPlot,
      n: 'Each photon carries h c over lambda, which is four point eight times ten to the minus nineteen joule, or exactly three electronvolts. The frequency is about seven point two seven times ten to the fourteen hertz. Dividing the power, six milliwatts, by the energy of one photon gives one point two five times ten to the sixteen photons every second: even a small LED emits an enormous number.',
    }),
    sl('diagram', 'Einstein’s photoelectric equation', {
      b: r`An electron at the top of the filled levels needs at least the **work function** $W_0$ to escape. It absorbs one photon; whatever is left becomes kinetic energy. Electrons from deeper levels leave with less, so
$$K_{\max} = \tfrac{1}{2}mv_{\max}^2 = hf - W_0 = eV_0$$`,
      ul: [r`**Threshold:** $K_{\max} = 0$ when $hf_0 = W_0$, so $f_0 = \dfrac{W_0}{h}$ and $\lambda_0 = \dfrac{hc}{W_0}$.`, 'No emission if f < f₀ (λ > λ₀).'],
      v: V.well,
      n: 'Picture the electrons in a metal filling energy levels up to a top level. To escape, an electron from the top must gain at least the work function. If a photon gives it h f, it leaves with h f minus the work function as kinetic energy. Electrons from deeper levels use up more energy on the way out, so this is the maximum kinetic energy. At the threshold frequency the photon has just enough energy to free an electron.',
    }),
    sl('concept', 'Work function and threshold', {
      b: r`The work function depends on the metal and the state of its surface. Alkali and alkaline-earth metals have small $W_0$ and respond to visible light; most others need ultraviolet. $\lambda_0\,(\text{nm}) = \dfrac{1237.5}{W_0\,(\text{eV})}$.`,
      v: wfTable,
      n: 'Each metal has its own work function, a few electronvolts, and so its own threshold wavelength. Rubidium, barium and strontium respond to visible light, because their thresholds lie in the visible range. Magnesium, tungsten, copper and platinum need ultraviolet. A clean surface and a dirty or oxidised one can differ, so tables give typical values.',
    }),
    sl('check', 'Quick check: which plates respond?', {
      b: 'Choose the correct option.',
      v: wfTable,
      chk: 'green-mcq',
      n: 'Work out the photon energy first, then compare it with each work function.',
    }),
    sl('example', 'Worked example 3: magnesium in ultraviolet', {
      b: 'Ultraviolet light of wavelength 225 nm falls on magnesium (W₀ = 3.7 eV). Find (a) the photon energy, (b) the maximum kinetic energy and stopping potential, (c) the maximum speed of the photoelectrons, (d) the threshold wavelength and frequency.',
      ul: [
        r`(a) $E = \dfrac{1237.5}{225} = ${dec(ex2.E, 2)}$ eV. (b) $K_{\max} = 5.5 - 3.7 = ${dec(ex2.K, 2)}$ eV, so $V_0 = ${dec(ex2.K, 2)}$ V.`,
        r`(c) $v_{\max} = \sqrt{\dfrac{2K_{\max}}{m}} = \sqrt{\dfrac{2 \times 1.8 \times 1.6 \times 10^{-19}}{9.1 \times 10^{-31}}} \approx ${sci(ex2.v, 3)}$ m s⁻¹.`,
        r`(d) $\lambda_0 = \dfrac{1237.5}{3.7} \approx ${dec(ex2.lam0, 3)}$ nm; $f_0 = \dfrac{W_0}{h} = \dfrac{3.7 \times 1.6 \times 10^{-19}}{6.6 \times 10^{-34}} \approx ${sci(ex2.f0, 3)}$ Hz.`,
      ],
      v: V.well,
      n: 'Each photon carries one thousand two hundred and thirty seven point five divided by two hundred and twenty five, which is five point five electronvolts. Magnesium needs three point seven to release an electron, leaving one point eight electronvolts, so the stopping potential is one point eight volts and the fastest electrons move at about eight hundred kilometres per second. The threshold wavelength is about three hundred and thirty four nanometres.',
    }),
    sl('concept', 'Einstein’s equation explains the facts', {
      b: r`Writing $eV_0 = hf - W_0$ explains every observation in one line:`,
      v: explainTable,
      ul: [r`A graph of $K_{\max}$ against $f$ is a straight line of slope $h$, cutting the $f$ axis at $f_0$.`],
      n: 'Einstein’s equation explains all the facts at once. A photon must bring at least the work function, so there is a threshold. Each electron takes energy from a single photon, so the maximum kinetic energy depends on frequency, not intensity. The photon hands over its energy at once, so there is no delay. And a brighter beam carries more photons, freeing more electrons each second.',
    }),
    sl('example', 'Worked example 4: how many photons free an electron?', {
      b: 'The 6.0 mW, 412.5 nm beam of example 2 falls on a barium emitter (W₀ = 2.5 eV). The saturation photocurrent is 9.6 μA. Find the stopping potential, the number of photoelectrons emitted per second and the fraction of photons that free an electron.',
      ul: [
        r`$K_{\max} = 3.0 - 2.5 = ${dec(ex3.K, 1)}$ eV, so $V_0 = ${dec(ex3.K, 1)}$ V.`,
        r`Electrons per second $= \dfrac{I}{e} = \dfrac{9.6 \times 10^{-6}}{1.6 \times 10^{-19}} = ${sci(ex3.n, 2)}$.`,
        r`Fraction $= \dfrac{6.0 \times 10^{13}}{1.25 \times 10^{16}} = ${sci(ex3.yield, 2)}$: about one photon in ${Math.round(1 / ex3.yield)} frees an electron.`,
      ],
      v: ivIntensity,
      n: 'Each photon brings three electronvolts and barium needs two and a half, so the stopping potential is half a volt. A saturation current of nine point six microamperes means six times ten to the thirteen electrons per second. Compared with the photons arriving, that is only about one photon in two hundred: most photons are absorbed or reflected without freeing an electron.',
    }),
    sl('check', 'Quick check: halving the wavelength', {
      b: 'True or false?',
      v: V.well,
      chk: 'halve-tf',
      n: 'Write the photon energy for the new wavelength, then subtract the work function.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Photon energy', '$E = hf = \\dfrac{hc}{\\lambda}$; $E\\,(\\text{eV}) = \\dfrac{1237.5}{\\lambda\\,(\\text{nm})}$'],
          ['Einstein’s equation', '$K_{\\max} = hf - W_0 = eV_0$'],
          ['Threshold', '$f_0 = \\dfrac{W_0}{h}$, $\\lambda_0 = \\dfrac{hc}{W_0}$'],
          ['Intensity', 'Changes the saturation current only'],
          ['Frequency', 'Changes $K_{\\max}$ and $V_0$ only'],
        ],
        'Summary table of the photon energy, Einstein’s photoelectric equation, the threshold frequency and wavelength, and the separate effects of intensity and frequency',
      ),
      n: 'To sum up: light arrives as photons of energy h f. One photon frees one electron, which leaves with at most h f minus the work function, and that maximum kinetic energy equals e times the stopping potential. Below the threshold frequency nothing happens. Intensity controls how many electrons come out; frequency controls how fast the fastest ones are.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'State the constants you use: here h = 6.6 × 10⁻³⁴ J s, e = 1.6 × 10⁻¹⁹ C, c = 3 × 10⁸ m/s.',
        'Convert eV to J (× 1.6 × 10⁻¹⁹) before using ½mv².',
        'V₀ in volts equals K_max in eV.',
        'For wave-theory questions, name the prediction and the observation it contradicts.',
        'In graphs, saturation current changes with intensity; V₀ changes with frequency.',
      ],
      v: table(['Asked', 'Key point'], [['Why no emission below f₀?', 'One photon must supply W₀'], ['Effect of doubling intensity', 'Twice the current, same V₀'], ['K_max from V₀ = 1.2 V', '1.2 eV']], 'Table of common questions and the key point for each'),
      n: 'Always state the constants you use. Convert electronvolts to joules before using one half m v squared, but remember that the stopping potential in volts is the same number as the maximum kinetic energy in electronvolts. For wave-theory questions, name what the wave theory predicts and the observation that contradicts it. In graphs, intensity changes the saturation current and frequency changes the stopping potential.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Dual Nature of Radiation and Matter — Part 2: Planck’s constant, photon momentum and matter waves',
  goals: [
    'Find Planck’s constant and the work function from a graph of stopping potential against frequency',
    'Calculate the momentum of a photon',
    'Calculate the de Broglie wavelength of an electron accelerated through a potential difference, and describe the Davisson–Germer experiment',
  ],
  slides: [
    sl('title', 'Planck’s Constant and Matter Waves', {
      b: 'Part 2 — measuring h from a straight-line graph, photons with momentum, and electrons that behave as waves.',
      v: v0Plot,
      n: 'Einstein’s equation is easy to test: it predicts a straight-line graph whose slope contains Planck’s constant. We will use that graph to measure h. Then we see that photons carry momentum as well as energy, and finally meet de Broglie’s bold idea that electrons, and all matter, have waves too, an idea confirmed by Davisson and Germer.',
    }),
    sl('diagram', 'Stopping potential against frequency', {
      b: r`Divide Einstein’s equation by e:
$$V_0 = \dfrac{h}{e}\,f - \dfrac{W_0}{e}$$
A graph of $V_0$ against $f$ is a **straight line** with slope $\dfrac{h}{e}$, the same for **every** metal, cutting the $f$ axis at $f_0$.`,
      ul: [r`With $h = 6.6 \times 10^{-34}$ J s the slope is $\dfrac{h}{e} = ${sci(H / QE, 4)}$ V s, that is 0.4125 V for every $10^{14}$ Hz.`, 'Lines for different metals are parallel; a larger W₀ shifts the line to the right.'],
      v: v0Plot,
      n: 'Divide Einstein’s equation by the electronic charge. The stopping potential equals h over e times the frequency, minus the work function over e. So a graph of stopping potential against frequency is a straight line. Its slope, h over e, is a universal constant, so lines for different metals are parallel. Each line meets the frequency axis at that metal’s threshold frequency.',
    }),
    sl('concept', 'Reading h and W₀ from the graph', {
      b: 'From a measured line:',
      ul: [r`**Slope** $= \dfrac{\Delta V_0}{\Delta f} = \dfrac{h}{e}$, so $h = e \times \text{slope}$.`, r`**Intercept on the f axis** $= f_0$, so $W_0 = hf_0$.`, r`**Intercept on the $V_0$ axis** (extended back to $f = 0$) $= -\dfrac{W_0}{e}$.`, 'Millikan did this carefully in 1916 and confirmed Einstein’s equation and the value of h.'],
      v: v0Plot,
      n: 'Measure the stopping potential at several frequencies and draw the best straight line. Its slope, multiplied by e, gives Planck’s constant. The point where it meets the frequency axis is the threshold frequency, and multiplying that by h gives the work function. Extended back to zero frequency, the line meets the potential axis at minus the work function over e. Millikan’s careful measurements of this kind confirmed Einstein’s equation.',
    }),
    sl('example', 'Worked example 5: h from mercury lines', {
      b: `A student lights a photocathode with four lines of a mercury lamp and records: ${ex4.lams.map((l, i) => `${l} nm → ${ex4.V0[i].toFixed(2)} V`).join('; ')}. Find h and the work function.`,
      ul: [
        r`Frequencies $f = c/\lambda$: ${ex4.f14.map((f) => dec(f, 3)).join(', ')} $\times 10^{14}$ Hz.`,
        r`Slope (end points) $= \dfrac{2.87 - 1.06}{(11.8 - 7.41) \times 10^{14}} \approx ${sci(ex4.slope, 3)}$ V s, so $h = e \times \text{slope} \approx ${sci(ex4.h, 3)}$ J s.`,
        r`Intercept: $f_0 = 7.41 \times 10^{14} - \dfrac{1.06}{${sci(ex4.slope, 3)}} \approx ${sci(ex4.f0, 3)}$ Hz; $W_0 = hf_0 \approx ${dec(ex4.phiEV, 2)}$ eV.`,
      ],
      v: dataPlot,
      n: 'First convert each wavelength to a frequency, from about seven point four to eleven point eight times ten to the fourteen hertz. The points lie on a straight line. Its slope is about four point one two times ten to the minus fifteen volt seconds, and multiplying by e gives Planck’s constant, about six point six times ten to the minus thirty four joule seconds. The line meets the frequency axis near four point eight times ten to the fourteen hertz, giving a work function of about two electronvolts.',
    }),
    sl('check', 'Quick check: the slope', {
      b: 'Choose the correct option.',
      v: dataPlot,
      chk: 'slope-mcq',
      n: 'Which quantity is the same for every metal?',
    }),
    sl('concept', 'Photon momentum', {
      b: r`A photon travels at c and has **zero rest mass**, yet it carries momentum. From relativity, for a particle with no rest mass $E = pc$, so
$$p = \dfrac{E}{c} = \dfrac{hf}{c} = \dfrac{h}{\lambda}$$`,
      ul: ['A beam absorbed by a surface pushes it: force = (photons per second) × h/λ = P/c.', 'Reflected straight back, each photon’s momentum is reversed: twice the force.', 'Solar sails and comet tails show light pressure.'],
      v: photonTable,
      n: 'Photons have no rest mass, but they carry momentum: the photon’s energy divided by c, which equals h over lambda. Shorter wavelengths carry more momentum. When a beam is absorbed, its momentum is handed to the surface, which feels a tiny force equal to the beam power divided by c. If the beam is reflected straight back, the force doubles. This light pressure pushes comet tails away from the Sun.',
    }),
    sl('example', 'Worked example 6: photon momentum and force', {
      b: 'A 2.0 mW green beam of wavelength 495 nm is completely absorbed by a black screen. Find the momentum of each photon, the number of photons arriving per second and the force on the screen.',
      ul: [
        r`$p = \dfrac{h}{\lambda} = \dfrac{6.6 \times 10^{-34}}{495 \times 10^{-9}} \approx ${sci(ex5.p, 3)}$ kg m s⁻¹.`,
        r`$E = \dfrac{1237.5}{495} = 2.5$ eV $= 4.0 \times 10^{-19}$ J; $N = \dfrac{2.0 \times 10^{-3}}{4.0 \times 10^{-19}} = ${sci(ex5.N, 2)}$ s⁻¹.`,
        r`$F = Np \approx ${sci(ex5.F, 3)}$ N, the same as $\dfrac{P}{c} = \dfrac{2.0 \times 10^{-3}}{3 \times 10^{8}}$.`,
      ],
      v: photonTable,
      n: 'Each photon carries h over lambda, about one point three three times ten to the minus twenty seven kilogram metres per second. Each has two and a half electronvolts, so five times ten to the fifteen photons arrive every second. Their momentum per second is the force, about six point six seven times ten to the minus twelve newton, which is simply the power divided by the speed of light.',
    }),
    sl('concept', 'Wave–particle duality', {
      b: 'Light behaves as a **wave** when it travels and spreads (interference, diffraction, polarisation) and as a stream of **particles** when it exchanges energy and momentum with matter (photoelectric effect). Neither picture alone describes every experiment: radiation has a **dual nature**.',
      v: dualTable,
      n: 'So is light a wave or a stream of particles? Experiments on how it travels, such as interference and diffraction, need the wave picture. Experiments on how it gives up energy, such as the photoelectric effect, need photons. Neither picture alone covers everything. Light has a dual nature, and as we shall see, so do electrons.',
    }),
    sl('concept', 'de Broglie’s hypothesis', {
      b: r`In 1924 de Broglie proposed that nature is symmetric: if waves can behave as particles, **moving particles should behave as waves**. A particle of momentum $p$ has a wavelength
$$\lambda = \dfrac{h}{p} = \dfrac{h}{mv}$$`,
      ul: ['The same relation as for a photon, read the other way round.', 'Larger momentum, shorter wavelength.', 'For everyday objects λ is far too small to detect.'],
      v: objTable,
      n: 'De Broglie suggested that the link between waves and particles works both ways. If light waves can act as particles with momentum h over lambda, then a moving particle should have a wave whose wavelength is h divided by its momentum. A heavier or faster particle has a shorter wavelength. For a sprinter or a bullet the wavelength is absurdly small, which is why we never notice it.',
    }),
    sl('diagram', 'Electrons accelerated through a potential difference', {
      b: r`An electron accelerated from rest through V gains $K = eV = \dfrac{p^2}{2m}$, so $p = \sqrt{2meV}$ and
$$\lambda = \dfrac{h}{\sqrt{2meV}} = \dfrac{6.6 \times 10^{-34}}{\sqrt{2 \times 9.1 \times 10^{-31} \times 1.6 \times 10^{-19}\,V}} \approx \dfrac{1.22}{\sqrt{V}}\ \text{nm}$$`,
      ul: ['A particle of charge q and mass m: λ = h/√(2mqV).', 'Quadrupling V halves λ.'],
      v: lamPlot,
      n: 'An electron accelerated from rest through a potential difference V gains kinetic energy e V. Its momentum is the square root of two m e V, so its wavelength is h divided by that. Putting in the numbers gives about one point two two nanometres divided by the square root of the voltage. A few hundred volts gives wavelengths below a tenth of a nanometre, like X rays.',
    }),
    sl('example', 'Worked example 7: an electron through 240 V', {
      b: 'An electron is accelerated from rest through 240 V. Find its speed, its momentum and its de Broglie wavelength.',
      ul: [
        r`$v = \sqrt{\dfrac{2eV}{m}} = \sqrt{\dfrac{2 \times 1.6 \times 10^{-19} \times 240}{9.1 \times 10^{-31}}} \approx ${sci(ex6.v, 3)}$ m s⁻¹.`,
        r`$p = mv \approx ${sci(ex6.p, 3)}$ kg m s⁻¹.`,
        r`$\lambda = \dfrac{h}{p} \approx ${sci(ex6.lam, 3)}$ m $\approx ${dec(ex6.lam * 1e12, 3)}$ pm; check: $\dfrac{1.22}{\sqrt{240}} \approx 0.079$ nm.`,
      ],
      v: lamPlot,
      n: 'The electron gains two hundred and forty electronvolts and reaches about nine million metres per second. Its momentum is about eight point four times ten to the minus twenty four kilogram metres per second, and its wavelength is h divided by that, about seventy nine picometres. That is close to the spacing of atoms in a crystal, which is exactly what is needed to see electrons diffract.',
    }),
    sl('check', 'Quick check: changing the voltage', {
      b: 'Choose the correct option.',
      v: lamPlot,
      chk: 'nine-mcq',
      n: 'How does the wavelength depend on the accelerating voltage?',
    }),
    sl('diagram', 'The Davisson–Germer experiment', {
      b: 'In 1927 Davisson and Germer fired a narrow beam of electrons, accelerated through a potential V, at a **nickel crystal** inside a vacuum chamber. A **movable detector** measured how many electrons were scattered at each angle φ to the incident beam.',
      ul: ['The regular rows of atoms in the crystal act like a diffraction grating for waves of wavelength comparable to their spacing.', 'The vacuum stops the electrons being scattered by air.'],
      v: V.dgApp,
      n: 'Davisson and Germer heated a filament to release electrons, accelerated them through a known voltage, and aimed the narrow beam at a nickel crystal. A detector that could swing around the crystal counted the electrons scattered at each angle. The rows of atoms in a crystal are spaced at about the wavelength de Broglie predicted, so if electrons were waves, the crystal should diffract them.',
    }),
    sl('diagram', 'What they found', {
      b: 'At most voltages the scattered intensity changed smoothly with angle. But at **54 V** a sharp **peak** appeared at a scattering angle of about **50°**, growing and then fading as V was raised past 54 V.',
      ul: ['A peak in one direction is exactly what diffraction of waves by a crystal produces.', 'The wavelength found from the crystal agreed closely with h/p: electrons behave as waves.', 'ISC treats this experiment qualitatively.'],
      v: V.dgPolar,
      n: 'For most voltages the number of scattered electrons changed smoothly with angle. But near fifty four volts a strong spur appeared at about fifty degrees, and it faded again at higher and lower voltages. A strong beam in one particular direction is the signature of diffraction by a crystal. The wavelength worked out from the crystal agreed with de Broglie’s formula: electrons really do behave as waves.',
    }),
    sl('diagram', 'Electron diffraction rings', {
      b: 'G. P. Thomson sent fast electrons through a **thin metal foil** made of many tiny crystals. The screen showed **concentric rings**, just like the X-ray diffraction rings from the same foil.',
      ul: ['Raising the accelerating voltage shortens λ and makes the rings smaller.', 'Electron microscopes use these very short wavelengths to resolve detail far finer than light can.'],
      v: V.rings,
      n: 'Soon afterwards, Thomson passed fast electrons through a thin foil made of many tiny crystals. The electrons landed on a screen in a pattern of concentric rings, like the pattern X rays make with the same foil. Faster electrons, with shorter wavelengths, gave smaller rings. The very short wavelength of electrons is what lets an electron microscope resolve detail far finer than any light microscope.',
    }),
    sl('check', 'Quick check: the conclusion', {
      b: 'Choose the correct option.',
      v: V.dgPolar,
      chk: 'dg-mcq',
      n: 'What kind of behaviour gives a strong beam in one particular direction?',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Stopping potential', '$V_0 = \\dfrac{h}{e}f - \\dfrac{W_0}{e}$: slope $h/e$, $f$-intercept $f_0$'],
          ['Photon momentum', '$p = \\dfrac{h}{\\lambda} = \\dfrac{E}{c}$'],
          ['de Broglie wavelength', '$\\lambda = \\dfrac{h}{p} = \\dfrac{h}{mv}$'],
          ['Electron through V', '$\\lambda = \\dfrac{h}{\\sqrt{2meV}} \\approx \\dfrac{1.22}{\\sqrt{V}}$ nm'],
          ['Davisson–Germer', 'Peak at 54 V, about 50°: electron diffraction'],
        ],
        'Summary table of the stopping potential graph, photon momentum, the de Broglie wavelength, the wavelength of an accelerated electron and the Davisson–Germer result',
      ),
      n: 'To sum up: the graph of stopping potential against frequency is a straight line of slope h over e, which measures Planck’s constant, and it meets the frequency axis at the threshold. Photons carry momentum h over lambda. Every moving particle has a de Broglie wavelength h over its momentum, and the diffraction of electrons by crystals confirmed it.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Graph questions: slope = h/e (multiply by e for h); f-axis intercept = f₀; W₀ = hf₀.',
        'Use the end points of the best line, not two arbitrary readings, when asked for the slope.',
        'For electrons, λ = h/√(2meV); keep V in volts and λ in metres, then convert.',
        'Davisson–Germer: describe gun, crystal, movable detector, the 54 V peak near 50° and the conclusion; no calculation is asked.',
      ],
      v: table(['Asked', 'Key point'], [['Slope of V₀–f graph', 'h/e, same for all metals'], ['Photon momentum', 'h/λ'], ['Why a crystal in Davisson–Germer?', 'Atomic spacing ≈ electron wavelength']], 'Table of common questions and the key point for each'),
      n: 'In graph questions, the slope is h over e, so multiply by e to get Planck’s constant, and the intercept on the frequency axis is the threshold. For electrons, use h over the square root of two m e V with everything in SI units. For Davisson and Germer, describe the apparatus, the peak near fifty degrees at fifty four volts and what it shows; no calculation is asked.',
    }),
  ],
});
