// ch11 Dual Nature of Radiation and Matter — two decks: Part 1 (t01–t02) the photoelectric effect and its experimental
// study; Part 2 (t03–t04) Einstein's photoelectric equation, photons and de Broglie waves. Worked-example numbers and
// graph data are computed here (h = 6.63 × 10⁻³⁴ J s, e = 1.6 × 10⁻¹⁹ C, c = 3.0 × 10⁸ m s⁻¹, mₑ = 9.1 × 10⁻³¹ kg).
import { sl, deck, table, flow, svgV, plot, r, sci, dec } from '../../cbse-12-physics-ch01/src/lib.mjs';
import * as G from './svgs.mjs';

export const H = G.H;
export const QE = G.QE;
export const CL = G.CL;
export const ME = 9.1e-31;
export const MP = 1.67e-27;
export const HC = G.HC_EVNM;

// ---------------------------------------------------------------- worked-example numbers
const ex1 = { V0: 1.5 };
ex1.K = ex1.V0 * QE;
ex1.v = Math.sqrt((2 * ex1.K) / ME);
const ex2 = { n1: 8.0e14, V1: 1.32, n2: 6.0e14, V2: 0.49 };
ex2.slope = (ex2.V1 - ex2.V2) / (ex2.n1 - ex2.n2);
ex2.h = QE * ex2.slope;
ex2.nu0 = ex2.n2 - ex2.V2 / ex2.slope;
ex2.phiJ = ex2.h * ex2.nu0;
ex2.phi = ex2.phiJ / QE;
const ex3 = { lam: 500e-9, P: 3.0e-3, lamL: 633e-9 };
ex3.E = (H * CL) / ex3.lam;
ex3.eV = ex3.E / QE;
ex3.EL = (H * CL) / ex3.lamL;
ex3.N = ex3.P / ex3.EL;
const ex4 = { ...G.SPLIT_DATA };
ex4.lam0 = HC / ex4.phi;
const ex5 = { V: 100, m: 0.15, v: 30 };
ex5.p = Math.sqrt(2 * ME * QE * ex5.V);
ex5.lam = H / ex5.p;
ex5.lamBall = H / (ex5.m * ex5.v);
const ex6 = {};
ex6.ratio = Math.sqrt(MP / ME);
export const EX = { ex1, ex2, ex3, ex4, ex5, ex6 };

export const V = {
  cell: svgV(G.PHOTOCELL, 'Photoelectric experiment with emitter, collector, reversible battery, voltmeter and microammeter'),
  split: svgV(G.ENERGY, 'Photon energy divided into work function and maximum kinetic energy', 'Drawn to scale for 400 nm light on potassium (φ₀ = 2.25 eV).'),
  thr: svgV(G.THRESHOLD, 'Photons below and above the threshold frequency striking a metal'),
};

// ---------------------------------------------------------------- graphs (computed)
const IV = (Isat, V0) => {
  const pts = [];
  for (let k = -30; k <= 50; k++) {
    const v = k / 10;
    const I = v <= -V0 ? 0 : Isat * (1 - Math.exp(-(v + V0) / 0.6));
    pts.push([v, Number(I.toFixed(4))]);
  }
  return pts;
};
export const ivIntensity = plot(
  {
    x: { min: -3, max: 5, label: 'collector potential V (V)' },
    y: { min: 0, max: 3.4, label: 'photocurrent (relative)' },
    series: [
      { label: 'intensity I₁', kind: 'line', points: IV(1, 1.5) },
      { label: 'intensity 2I₁', kind: 'line', points: IV(2, 1.5) },
      { label: 'intensity 3I₁', kind: 'line', points: IV(3, 1.5) },
    ],
    vlines: [{ x: -1.5, label: '−V₀ (same for all)', dashed: true }],
  },
  'Photocurrent against collector potential for three intensities of light of one frequency: the saturation current rises in proportion to intensity, but all three curves fall to zero at the same stopping potential',
  'Same frequency: saturation current ∝ intensity; stopping potential unchanged.',
);
export const ivFrequency = plot(
  {
    x: { min: -3, max: 5, label: 'collector potential V (V)' },
    y: { min: 0, max: 1.2, label: 'photocurrent (relative)' },
    series: [
      { label: 'ν₁', kind: 'line', points: IV(1, 0.5) },
      { label: 'ν₂ > ν₁', kind: 'line', points: IV(1, 1.2) },
      { label: 'ν₃ > ν₂', kind: 'line', points: IV(1, 2.0) },
    ],
  },
  'Photocurrent against collector potential for three frequencies at the same intensity: the curves reach the same saturation current, but higher frequencies need a larger negative potential to stop the current',
  'Same intensity: higher frequency, larger stopping potential.',
);
export const iIntensity = plot(
  {
    x: { min: 0, max: 10, label: 'intensity of light (relative)' },
    y: { min: 0, max: 10, label: 'photocurrent (relative)' },
    functions: [{ expr: 'x', label: 'photocurrent ∝ intensity (ν > ν₀)' }],
  },
  'Straight line through the origin: the photocurrent is directly proportional to the intensity of the incident light, for a frequency above threshold',
);
const slope14 = (H * 1e14) / QE; // volts per 10¹⁴ Hz
const nuK = (2.25 * QE) / H / 1e14;
const nuZ = (4.3 * QE) / H / 1e14;
export const V0NU = { slope14, nuK, nuZ };
export const v0Plot = plot(
  {
    x: { min: 0, max: 16, label: 'frequency ν (10¹⁴ Hz)' },
    y: { min: 0, max: 4.5, label: 'stopping potential V₀ (V)' },
    functions: [
      { expr: `${slope14.toFixed(4)}(x - ${nuK.toFixed(2)})`, label: `potassium (φ₀ = 2.25 eV, ν₀ = ${nuK.toFixed(2)} × 10¹⁴ Hz)`, domain: [Number(nuK.toFixed(2)), 16] },
      { expr: `${slope14.toFixed(4)}(x - ${nuZ.toFixed(2)})`, label: `zinc (φ₀ = 4.3 eV, ν₀ = ${nuZ.toFixed(2)} × 10¹⁴ Hz)`, domain: [Number(nuZ.toFixed(2)), 16] },
    ],
  },
  'Stopping potential against frequency for potassium and zinc: two parallel straight lines of slope h over e, cutting the frequency axis at each metal’s threshold frequency',
  'Slope h/e is the same for every metal; the intercept on the ν axis is the threshold frequency ν₀ = φ₀/h.',
);
export const lamPlot = plot(
  {
    x: { min: 0, max: 200, label: 'accelerating potential V (V)' },
    y: { min: 0, max: 0.8, label: 'de Broglie wavelength (nm)' },
    functions: [{ expr: '1.227/sqrt(x)', label: 'electron: λ = 1.227/√V nm', domain: [3, 200] }],
  },
  'de Broglie wavelength of an electron against accelerating potential: the wavelength falls as one over the square root of the potential, to about 0.12 nanometre at 100 volts',
  'λ = h/√(2meV) ≈ 1.227/√V nm.',
);

const lawsTable = table(
  ['Observation', 'Wave theory predicts', 'Photon picture explains'],
  [
    ['No emission below a threshold frequency ν₀', 'Any frequency works if bright enough', 'One photon must supply at least φ₀ = hν₀'],
    ['K_max rises with ν, not with intensity', 'K_max should rise with intensity', 'K_max = hν − φ₀'],
    ['Photocurrent ∝ intensity', 'Agrees', 'More photons, more electrons'],
    ['Emission is instantaneous (< 10⁻⁹ s)', 'Time lag to absorb enough energy', 'One photon gives its energy at once'],
  ],
  'Table comparing four observations of the photoelectric effect with the predictions of the wave theory and the photon picture',
);

export const deck1 = deck({
  part: 1,
  title: 'Dual Nature of Radiation and Matter — Part 1: The photoelectric effect',
  goals: [
    'Describe the observations of Hertz, Hallwachs and Lenard on the photoelectric effect',
    'Interpret graphs of photocurrent against intensity, collector potential and frequency',
    'Explain why the wave theory of light cannot account for the observations',
  ],
  slides: [
    sl('title', 'Dual Nature of Radiation and Matter', {
      b: 'Part 1 — light that knocks electrons out of metals, and four observations the wave theory of light could not explain.',
      v: flow('LR', [['o', 'Observations'], ['e', 'Experiment'], ['g', 'Graphs'], ['w', 'Wave theory fails'], ['p', 'Need for photons']], [['o', 'e'], ['e', 'g'], ['g', 'w'], ['w', 'p']], 'Flow of the part: observations, the experiment, the graphs, the failure of the wave theory, the need for photons'),
      n: 'By the end of the nineteenth century light was firmly a wave: it showed interference and diffraction, and Maxwell had explained it as an electromagnetic wave. Then a small effect turned up that waves could not explain. Light falling on a metal can knock electrons out of it. In this part we look at the experiments on this photoelectric effect and the puzzling results they gave.',
    }),
    sl('concept', 'Electron emission and the work function', {
      b: 'Free electrons in a metal are held in by the attraction of the positive ions. The **least energy** needed to remove an electron from the surface is the **work function** $\\varphi_0$, usually given in **electronvolts**: $1\\ \\text{eV} = 1.6 \\times 10^{-19}$ J.',
      ul: ['Energy can be supplied by heating (**thermionic emission**), a very strong electric field (**field emission**) or light (**photoelectric emission**).', 'Typical values: caesium about 2.1 eV, potassium about 2.3 eV, zinc about 4.3 eV, platinum about 5.6 eV.'],
      v: table(['Metal', 'Work function (approx.)'], [['Caesium', '2.1 eV'], ['Potassium', '2.3 eV'], ['Sodium', '2.8 eV'], ['Zinc', '4.3 eV'], ['Platinum', '5.6 eV']], 'Table of approximate work functions of caesium, potassium, sodium, zinc and platinum in electronvolts'),
      n: 'A metal is full of free electrons, but they cannot simply leave: near the surface the positive ions pull them back. The smallest energy that lets an electron escape is the work function. It is usually quoted in electronvolts, the energy an electron gains through one volt, one point six times ten to the minus nineteen joule. Alkali metals like caesium and potassium have small work functions.',
    }),
    sl('concept', 'Discovery: Hertz, Hallwachs and Lenard', {
      b: 'Early observations:',
      ul: ['**Hertz** (1887): sparks jumped more easily across a gap when its electrodes were lit by **ultraviolet** light.', '**Hallwachs**: a **negatively** charged zinc plate lost its charge in ultraviolet light; a neutral plate became **positive**; a positive plate was unaffected.', '**Lenard**: ultraviolet on the emitter of an evacuated tube made a **current** flow; it stopped at once when the light was cut off. The particles emitted were **electrons** (photoelectrons).', 'Zinc and cadmium need ultraviolet; alkali metals respond even to **visible** light.'],
      v: V.thr,
      n: 'Hertz noticed that ultraviolet light made sparks jump more easily. Hallwachs found that a negatively charged zinc plate lost its charge in ultraviolet light, while a neutral one became positive, so negative charge was leaving the metal. Lenard showed that light on a plate inside an evacuated tube produced a current, and the particles turned out to be electrons. The light seemed to knock them out.',
    }),
    sl('example', 'Worked example 1: from stopping potential to speed', {
      b: r`Photoelectrons from a metal are just stopped by a retarding potential of 1.5 V. Find their maximum kinetic energy in eV and in J, and their maximum speed.`,
      ul: [
        r`Step 1 — $K_\text{max} = eV_0 = 1.5$ eV $= 1.5 \times 1.6 \times 10^{-19} = ${sci(ex1.K, 2)}$ J.`,
        r`Step 2 — $v_\text{max} = \sqrt{\dfrac{2K_\text{max}}{m_e}} = \sqrt{\dfrac{2 \times ${sci(ex1.K, 2)}}{9.1 \times 10^{-31}}} \approx ${sci(ex1.v, 3)}$ m s$^{-1}$.`,
      ],
      v: V.cell,
      n: 'An electron climbing against one and a half volts loses one and a half electronvolts of kinetic energy, so the fastest electrons had exactly that much. Multiply by one point six times ten to the minus nineteen to get joules. Then use half m v squared: the fastest photoelectrons leave at about seven times ten to the five metres per second, a few hundred kilometres every second.',
    }),
    sl('diagram', 'The experimental arrangement', {
      b: 'Light of known **frequency** and **intensity** falls on the emitter C in an evacuated tube. The collector A can be made **positive** (accelerating) or **negative** (retarding) relative to C. A microammeter reads the **photocurrent**.',
      ul: ['Vary one thing at a time: intensity, collector potential, frequency.', 'The tube is evacuated so that electrons do not collide with air molecules.'],
      v: V.cell,
      n: 'In the laboratory version, light passes through a quartz window, which lets ultraviolet through, onto the emitter plate. Photoelectrons cross the vacuum to the collector, and the current is read on a microammeter. A battery with a reversing switch lets us make the collector positive, to pull electrons across, or negative, to push them back. We change one quantity at a time and watch the current.',
    }),
    sl('diagram', 'Effect of intensity', {
      b: 'Keep the frequency (above threshold) and collector potential fixed and vary the intensity:',
      ul: ['The photocurrent is **directly proportional** to the intensity.', 'So the **number** of photoelectrons emitted per second is proportional to the intensity.'],
      v: iIntensity,
      n: 'First keep the colour of the light and the collector potential fixed, and make the light brighter. The photocurrent rises in direct proportion. Since each electron carries the same charge, a current twice as large means twice as many electrons leaving every second. Brighter light frees more electrons. So far, nothing surprising.',
    }),
    sl('diagram', 'Effect of potential: stopping potential', {
      b: r`Make the collector more positive: the current rises to a **saturation** value (all emitted electrons collected). Make it negative: the current falls, and is zero at the **stopping potential** $-V_0$, which stops even the fastest electrons:
$$eV_0 = K_\text{max} = \tfrac{1}{2}m v_\text{max}^2$$`,
      ul: ['For one frequency, **different intensities** give **different saturation currents** but the **same** stopping potential.', 'So $K_\\text{max}$ does **not** depend on intensity.'],
      v: ivIntensity,
      n: 'Now vary the collector potential. With the collector positive, the current levels off at a saturation value once every emitted electron is being collected. Making the collector negative turns electrons back, and at the stopping potential even the fastest ones fail to arrive. Here is the surprise: brighter light gives a larger saturation current, but exactly the same stopping potential. The fastest electrons are no faster in brighter light.',
    }),
    sl('check', 'Quick check: brighter light', {
      b: 'Choose the correct option.',
      v: ivIntensity,
      chk: 'brighter-mcq',
      n: 'Look at where the curves for different intensities meet the potential axis.',
    }),
    sl('diagram', 'Effect of frequency', {
      b: 'At the same intensity, **higher frequency** gives a **larger stopping potential**, so a larger $K_\\text{max}$. Plotting $V_0$ against $\\nu$ gives a **straight line**:',
      ul: ['Below a **threshold frequency** $\\nu_0$ there is **no emission at all**, however intense the light.', '$\\nu_0$ depends on the metal; the slope of the line is the same for all metals.'],
      v: v0Plot,
      n: 'Finally, change the frequency at constant intensity. Higher frequencies need a larger stopping potential, so the electrons come out with more energy. A graph of stopping potential against frequency is a straight line. It cuts the frequency axis at the threshold frequency, below which no electrons come out at all, however bright the light. Different metals give parallel lines with different thresholds.',
    }),
    sl('example', 'Worked example 2: Planck’s constant from two readings', {
      b: r`For one metal, light of frequency $8.0 \times 10^{14}$ Hz gives $V_0 = 1.32$ V and light of $6.0 \times 10^{14}$ Hz gives $V_0 = 0.49$ V. Find the slope of the $V_0$–$\nu$ line, Planck’s constant and the threshold frequency.`,
      ul: [
        r`Step 1 — slope $= \dfrac{1.32 - 0.49}{8.0 \times 10^{14} - 6.0 \times 10^{14}} = ${sci(ex2.slope, 3)}$ V s.`,
        r`Step 2 — slope $= h/e$, so $h = 1.6 \times 10^{-19} \times ${sci(ex2.slope, 3)} \approx ${sci(ex2.h, 3)}$ J s.`,
        r`Step 3 — $\nu_0 = 6.0 \times 10^{14} - \dfrac{0.49}{${sci(ex2.slope, 3)}} \approx ${sci(ex2.nu0, 3)}$ Hz; $\varphi_0 = h\nu_0 \approx ${dec(ex2.phi, 2)}$ eV.`,
      ],
      v: v0Plot,
      n: 'The rise in stopping potential divided by the rise in frequency gives the slope, about four point one five times ten to the minus fifteen volt second. That slope is Planck’s constant divided by the electron charge, so multiplying by the charge gives about six point six times ten to the minus thirty four joule second. Working back along the line to zero gives the threshold frequency and a work function of about two electronvolts.',
    }),
    sl('concept', 'Four observations', {
      b: 'The experiments establish:',
      ul: ['Photocurrent ∝ intensity (for $\\nu > \\nu_0$).', '$K_\\text{max}$ (and $V_0$) increase **linearly with frequency** and are **independent of intensity**.', 'There is a **threshold frequency** $\\nu_0$ for each metal.', 'Emission is **instantaneous**: within about $10^{-9}$ s of the light arriving, even for very dim light.'],
      v: lawsTable,
      n: 'Put the results together. The current is proportional to intensity. The maximum kinetic energy grows with frequency but not with intensity. Each metal has a threshold frequency below which nothing happens. And emission starts instantly, within a billionth of a second, even in very faint light. Three of these four observations clash with what we expect of a wave.',
    }),
    sl('two-column', 'Why the wave theory fails', {
      b: 'A wave spreads its energy continuously over the surface:',
      cols: [
        '**Wave theory expects**\n- Brighter light → faster electrons\n- Any frequency works if intense enough\n- Dim light → time lag while energy builds up',
        '**Experiment shows**\n- K_max independent of intensity\n- No emission below ν₀\n- Emission is instantaneous',
      ],
      v: lawsTable,
      n: 'If light were only a wave, a brighter beam would shake electrons harder and they should come out faster. Any frequency should work given enough brightness. And in dim light, an electron would need time to soak up enough energy, perhaps hours by some estimates. None of this happens. The energy of light must arrive in concentrated packets, which we meet in part two.',
    }),
    sl('check', 'Quick check: threshold frequency', {
      b: 'Judge the assertion and the reason.',
      v: V.thr,
      chk: 'threshold-ar',
      n: 'Ask whether more intensity can make up for too low a frequency.',
    }),
    sl('check', 'Quick check: the V₀–ν graph', {
      b: 'Choose the correct option.',
      v: v0Plot,
      chk: 'slope-mcq',
      n: 'What does the slope of the stopping potential against frequency graph represent, and does it depend on the metal?',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Work function', 'Least energy to free an electron; 1 eV = 1.6 × 10⁻¹⁹ J'],
          ['Stopping potential', '$eV_0 = K_\\text{max}$'],
          ['Intensity', 'Photocurrent ∝ intensity; $V_0$ unchanged'],
          ['Frequency', '$V_0$ rises linearly with ν; no emission below ν₀'],
          ['Time lag', 'None (< 10⁻⁹ s)'],
          ['Wave theory', 'Cannot explain threshold, K_max(ν) or instant emission'],
        ],
        'Summary table of work function, stopping potential, effect of intensity and frequency, time lag and the failure of the wave theory',
      ),
      n: 'To sum up: electrons need at least the work function to escape. The stopping potential measures the maximum kinetic energy, e V nought. The photocurrent grows with intensity, but the stopping potential does not; it grows linearly with frequency, and below the threshold frequency there is no emission at all. Emission is instant. The wave theory explains only the first of these.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'Sketch the three graphs carefully: I against intensity (straight line), I against V for different intensities (common $-V_0$), I against V for different frequencies (common saturation current).',
        'State $eV_0 = K_\\text{max}$ and convert eV to J with $1.6 \\times 10^{-19}$.',
        'In the $V_0$–$\\nu$ graph, slope $= h/e$ for every metal; the intercept is $\\nu_0$.',
        'Name the three observations the wave theory fails to explain.',
      ],
      v: table(['Asked', 'Key point'], [['Does K_max depend on intensity?', 'No'], ['What does saturation current depend on?', 'Intensity'], ['Slope of V₀–ν graph?', 'h/e, same for all metals']], 'Table of common questions and the key point for each'),
      n: 'Graph questions are common, so practise sketching them with labelled axes. Remember which curves share a stopping potential and which share a saturation current. Write e V nought equals K max whenever a stopping potential appears. The slope of the stopping potential graph is Planck’s constant over e for every metal. And be ready to list the observations that wave theory cannot explain.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Dual Nature of Radiation and Matter — Part 2: Photons, Einstein’s equation and matter waves',
  goals: [
    'Describe the photon picture of light and apply E = hν and p = h/λ',
    'Apply Einstein’s photoelectric equation to find work function, threshold frequency and stopping potential',
    'Calculate the de Broglie wavelength of particles',
  ],
  slides: [
    sl('title', 'Photons and matter waves', {
      b: 'Part 2 — Einstein’s packets of light explain the photoelectric effect, and de Broglie turns the idea round: particles behave as waves.',
      v: V.split,
      n: 'In nineteen oh five Einstein proposed that light energy comes in packets, later called photons. One equation then explained every photoelectric observation. Twenty years later de Broglie suggested the reverse: if waves can act as particles, particles such as electrons can act as waves. In this part we use Einstein’s equation and calculate the wavelengths of moving particles.',
    }),
    sl('concept', 'The photon picture', {
      b: r`Radiation behaves as a stream of **photons**, each with
$$E = h\nu = \dfrac{hc}{\lambda},\qquad p = \dfrac{h\nu}{c} = \dfrac{h}{\lambda}$$
where $h = 6.63 \times 10^{-34}$ J s (Planck’s constant).`,
      ul: ['All photons of one frequency have the **same energy**; brighter light means **more photons** per second, not bigger photons.', 'Photons travel at $c$ in vacuum, have zero rest mass and are electrically neutral.', 'In collisions, energy and momentum are conserved; a photon can be absorbed or created.'],
      v: V.thr,
      n: 'In the photon picture, light of frequency nu arrives as packets each carrying energy h nu and momentum h over lambda. A brighter lamp of the same colour sends more photons each second, but every photon is the same. Photons move at the speed of light, have no rest mass and no charge. When a photon meets an electron it is either absorbed completely or not at all.',
    }),
    sl('example', 'Worked example 3: counting photons', {
      b: r`(a) Find the energy of a photon of 500 nm light in J and eV. (b) A 3.0 mW laser pointer emits light of wavelength 633 nm. How many photons does it emit each second?`,
      ul: [
        r`(a) $E = \dfrac{hc}{\lambda} = \dfrac{6.63 \times 10^{-34} \times 3.0 \times 10^{8}}{500 \times 10^{-9}} \approx ${sci(ex3.E, 3)}$ J $= \dfrac{${sci(ex3.E, 3)}}{1.6 \times 10^{-19}} \approx ${dec(ex3.eV, 3)}$ eV.`,
        r`(b) $E = \dfrac{hc}{633 \times 10^{-9}} \approx ${sci(ex3.EL, 3)}$ J; $N = \dfrac{P}{E} = \dfrac{3.0 \times 10^{-3}}{${sci(ex3.EL, 3)}} \approx ${sci(ex3.N, 3)}$ s$^{-1}$.`,
      ],
      v: table(['Quantity', 'Value'], [['Photon energy, 500 nm', `${dec(ex3.eV, 3)} eV`], ['Photon energy, 633 nm', `${dec(ex3.EL / QE, 3)} eV`], ['Photons per second, 3.0 mW', '≈ 9.5 × 10¹⁵']], 'Worked table: photon energies at 500 and 633 nanometres and the number of photons per second from a three milliwatt laser'),
      n: 'A green photon carries about four times ten to the minus nineteen joule, or about two and a half electronvolts. That is tiny, so even a weak laser pointer of three milliwatts sends out nearly ten million billion photons every second. With so many, the beam looks perfectly smooth, which is why the particle nature of light went unnoticed for so long.',
    }),
    sl('diagram', 'Einstein’s photoelectric equation', {
      b: r`One photon gives **all** its energy to **one** electron. Part is used to escape (at least $\varphi_0$); the rest is kinetic energy:
$$h\nu = \varphi_0 + K_\text{max},\qquad K_\text{max} = eV_0 = h\nu - \varphi_0 = h(\nu - \nu_0)$$`,
      ul: ['Threshold: $h\\nu_0 = \\varphi_0$, i.e. $\\lambda_0 = hc/\\varphi_0$.', 'Electrons from deeper inside lose more energy on the way out, so most have less than $K_\\text{max}$.'],
      v: V.split,
      n: 'Einstein’s idea is simple. A single photon is absorbed by a single electron. The electron spends at least the work function to get out, and whatever is left is its kinetic energy. The fastest electrons, from right at the surface, have h nu minus phi nought. If h nu is less than the work function, no electron can escape, whatever the number of photons.',
    }),
    sl('concept', 'The equation explains every observation', {
      b: 'Using $K_\\text{max} = h\\nu - \\varphi_0$:',
      v: lawsTable,
      ul: ['$K_\\text{max}$ depends only on $\\nu$ (and the metal), not on the number of photons.', '$V_0 = \\dfrac{h}{e}\\nu - \\dfrac{\\varphi_0}{e}$: a straight line of slope $h/e$.', 'One photon acts at once: no waiting.'],
      n: 'Check each observation. More intense light means more photons, so more electrons, but each photon is the same, so the maximum kinetic energy does not change. Below the threshold no single photon has enough energy. The stopping potential is h over e times nu minus phi nought over e, a straight line with slope h over e. And a photon delivers its energy in one go, so there is no time lag.',
    }),
    sl('example', 'Worked example 4: potassium in violet light', {
      b: r`Light of wavelength 400 nm falls on potassium ($\varphi_0 = 2.25$ eV). Find the photon energy, $K_\text{max}$, the stopping potential and the threshold wavelength. (Use $hc = ${dec(HC, 4)}$ eV nm.)`,
      ul: [
        r`Step 1 — $E = \dfrac{hc}{\lambda} = \dfrac{${dec(HC, 4)}}{400} \approx ${dec(ex4.E, 3)}$ eV.`,
        r`Step 2 — $K_\text{max} = ${dec(ex4.E, 3)} - 2.25 \approx ${dec(ex4.K, 2)}$ eV, so $V_0 \approx ${dec(ex4.K, 2)}$ V.`,
        r`Step 3 — $\lambda_0 = \dfrac{hc}{\varphi_0} = \dfrac{${dec(HC, 4)}}{2.25} \approx ${dec(ex4.lam0, 3)}$ nm.`,
      ],
      v: V.split,
      n: 'With h c in electronvolt nanometres, the photon energy is just twelve hundred and forty three divided by four hundred, about three point one one electronvolts. Take away the work function and the fastest electrons have about point eight six electronvolt, so a stopping potential of point eight six volt halts them. Light of wavelength longer than about five hundred and fifty nanometres could not free any electrons.',
    }),
    sl('check', 'Quick check: Einstein’s equation', {
      b: 'Find the maximum kinetic energy.',
      v: V.split,
      chk: 'kmax-num',
      n: 'Subtract the work function from the photon energy.',
    }),
    sl('concept', 'Wave–particle duality and de Broglie waves', {
      b: r`Light behaves as a **wave** (interference, diffraction) and as **particles** (photoelectric effect). de Broglie (1924) proposed that **material particles** also have a wave nature, with wavelength
$$\lambda = \dfrac{h}{p} = \dfrac{h}{mv}$$`,
      ul: ['For everyday objects $\\lambda$ is far too small to detect; for electrons it is comparable to atomic spacings.', 'The wave and particle pictures are complementary: an experiment shows one or the other.'],
      v: flow('LR', [['l', 'Light: wave'], ['p', 'Light: photons'], ['m', 'Matter: particles'], ['w', 'Matter: waves, λ = h/p']], [['l', 'p'], ['p', 'm'], ['m', 'w']], 'Flow: light behaves as a wave and as photons; by symmetry matter, known as particles, also behaves as waves of wavelength h over p'),
      n: 'Light shows both faces: it interferes like a wave and knocks out electrons like a stream of particles. De Broglie argued that nature should be symmetric, so a moving particle should have a wavelength too, Planck’s constant divided by its momentum. For a cricket ball this is absurdly small, but for an electron it is about the spacing of atoms in a crystal, small but measurable.',
    }),
    sl('concept', 'Electrons accelerated through a potential', {
      b: r`An electron accelerated from rest through $V$ gains $K = eV$, so $p = \sqrt{2m_e eV}$ and
$$\lambda = \dfrac{h}{\sqrt{2m_e eV}} \approx \dfrac{1.227}{\sqrt{V}}\ \text{nm}$$`,
      ul: ['In general $\\lambda = \\dfrac{h}{\\sqrt{2mK}}$: for equal kinetic energy, a heavier particle has a shorter wavelength.', 'Higher voltage gives a shorter wavelength: the idea behind the electron microscope.'],
      v: lamPlot,
      n: 'For an electron accelerated through a potential difference V, its kinetic energy is e V and its momentum is root two m e V. Putting in the constants gives a wavelength of one point two two seven divided by root V nanometres. At one hundred volts that is about point one two nanometre, similar to X-ray wavelengths. Electron microscopes use this to see far finer detail than light can.',
    }),
    sl('example', 'Worked example 5: an electron and a cricket ball', {
      b: r`Find the de Broglie wavelength of (a) an electron accelerated from rest through 100 V, (b) a cricket ball of mass 0.15 kg moving at 30 m s$^{-1}$.`,
      ul: [
        r`(a) $p = \sqrt{2m_e eV} = \sqrt{2 \times 9.1 \times 10^{-31} \times 1.6 \times 10^{-19} \times 100} \approx ${sci(ex5.p, 3)}$ kg m s$^{-1}$; $\lambda = \dfrac{6.63 \times 10^{-34}}{${sci(ex5.p, 3)}} \approx ${sci(ex5.lam, 3)}$ m (0.123 nm).`,
        r`(b) $\lambda = \dfrac{h}{mv} = \dfrac{6.63 \times 10^{-34}}{0.15 \times 30} \approx ${sci(ex5.lamBall, 3)}$ m: far too small ever to detect.`,
      ],
      v: lamPlot,
      n: 'For the electron, the momentum is about five point four times ten to the minus twenty four, and dividing Planck’s constant by it gives about point one two three nanometre, the size of an atom. For the cricket ball, the momentum is four point five, and the wavelength is about ten to the minus thirty four metre, unimaginably smaller than a nucleus. That is why we never notice the wave nature of everyday objects.',
    }),
    sl('example', 'Worked example 6: proton or electron?', {
      b: r`A proton ($m_p = 1.67 \times 10^{-27}$ kg) and an electron have the same kinetic energy. Find the ratio of their de Broglie wavelengths, $\lambda_e/\lambda_p$.`,
      ul: [
        r`Step 1 — $\lambda = \dfrac{h}{\sqrt{2mK}}$, so with equal $K$, $\dfrac{\lambda_e}{\lambda_p} = \sqrt{\dfrac{m_p}{m_e}}$.`,
        r`Step 2 — $\sqrt{\dfrac{1.67 \times 10^{-27}}{9.1 \times 10^{-31}}} \approx ${dec(ex6.ratio, 3)}$: the electron’s wavelength is about 43 times longer.`,
      ],
      v: lamPlot,
      n: 'With the same kinetic energy, momentum grows as the square root of mass, so the wavelength falls as one over root mass. The proton is about eighteen hundred and thirty five times heavier than the electron, and the square root of that is about forty three. So the electron’s wavelength is about forty three times the proton’s. For equal momentum, by contrast, the wavelengths would be equal.',
    }),
    sl('check', 'Quick check: de Broglie wavelength', {
      b: 'Choose the correct option.',
      v: lamPlot,
      chk: 'quadruple-mcq',
      n: 'How does the wavelength depend on the accelerating potential?',
    }),
    sl('check', 'Quick check: photons', {
      b: 'Decide whether the statement is true or false.',
      v: null,
      chk: 'brightphoton-tf',
      n: 'Does a brighter beam of the same colour contain bigger photons or more photons?',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Photon', '$E = h\\nu = hc/\\lambda$, $p = h/\\lambda$'],
          ['Einstein’s equation', '$K_\\text{max} = h\\nu - \\varphi_0 = eV_0$'],
          ['Threshold', '$\\nu_0 = \\varphi_0/h$, $\\lambda_0 = hc/\\varphi_0$'],
          ['$V_0$–$\\nu$ graph', 'Slope $h/e$; intercept $\\nu_0$'],
          ['de Broglie', '$\\lambda = h/p = h/\\sqrt{2mK}$'],
          ['Electron through V', '$\\lambda \\approx 1.227/\\sqrt{V}$ nm'],
        ],
        'Summary table of photon energy and momentum, Einstein’s equation, threshold, the stopping potential graph and de Broglie wavelengths',
      ),
      n: 'To sum up: light comes in photons of energy h nu and momentum h over lambda. One photon frees one electron, and Einstein’s equation, K max equals h nu minus phi nought, explains every photoelectric observation. The threshold frequency is phi nought over h. Matter has a wave side too: the de Broglie wavelength is h over p, about one point two two seven over root V nanometres for an electron.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Use $hc \\approx 1240$ eV nm for quick photon energies; show the conversion if you use joules.',
        'Write Einstein’s equation, then substitute: $eV_0 = h\\nu - \\varphi_0$.',
        'For λ of a charged particle through V: $\\lambda = h/\\sqrt{2mqV}$; for an electron $1.227/\\sqrt{V}$ nm.',
        'Equal K: λ ∝ $1/\\sqrt{m}$. Equal p: equal λ.',
      ],
      v: table(['Asked', 'Key point'], [['Brighter light, same colour?', 'More photons, same energy each'], ['Below threshold?', 'No emission at any intensity'], ['Why no λ for a ball?', 'h/mv is unmeasurably small']], 'Table of common questions and the key point for each'),
      n: 'A quick way to find photon energies is h c of about twelve hundred and forty electronvolt nanometres divided by the wavelength in nanometres. Always write Einstein’s equation before substituting. For a charged particle accelerated through a potential, its kinetic energy is charge times voltage. And remember the comparisons: with equal kinetic energy the lighter particle has the longer wavelength; with equal momentum the wavelengths match.',
    }),
  ],
});
