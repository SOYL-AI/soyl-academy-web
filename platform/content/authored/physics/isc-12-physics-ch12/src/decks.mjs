// ISC 12 Physics ch12 Electromagnetic Waves — two decks: Part 1 (t01–t02) displacement current and the nature of
// electromagnetic waves; Part 2 (t03) the electromagnetic spectrum: order, ranges, sources, detection and uses.
// Numbers computed here.
import { sl, deck, table, flow, svgV, plot, r, sci, dec, EPS0 } from '../../isc-12-physics-ch01/src/lib.mjs';
import * as G from './svgs.mjs';

export const MU0 = 4 * Math.PI * 1e-7;
export const C0 = 3e8;

// ---------------------------------------------------------------- worked-example numbers
const ex1 = { A: 0.04, d: 1.5e-3, rate: 6e5 };
ex1.dEdt = ex1.rate / ex1.d;
ex1.dPhi = ex1.A * ex1.dEdt;
ex1.id = EPS0 * ex1.dPhi;
ex1.C = (EPS0 * ex1.A) / ex1.d;
ex1.i = ex1.C * ex1.rate;
const ex2 = { E0: 72 };
ex2.c = 1 / Math.sqrt(MU0 * EPS0);
ex2.B0 = ex2.E0 / C0;
const ex3 = { f: 2.4e9, d: 30 };
ex3.lam = C0 / ex3.f;
ex3.T = 1 / ex3.f;
ex3.t = ex3.d / C0;
ex3.n = ex3.d / ex3.lam;
const ex4 = { fa: 2.45e9, lb: 3e-6, fc: 1.2e18 };
ex4.la = C0 / ex4.fa;
ex4.fb = C0 / ex4.lb;
ex4.lc = C0 / ex4.fc;
const ex5 = { t: 0.3e-3, f: 3e9 };
ex5.d = (C0 * ex5.t) / 2;
ex5.lam = C0 / ex5.f;
export const EX = { ex1, ex2, ex3, ex4, ex5 };

export const V = {
  disp: svgV(G.DISPLACEMENT, 'Charging capacitor with a loop round the wire and a surface passing through the gap'),
  loops: svgV(G.BLOOPS, 'Circular magnetic field lines round the axis of a charging capacitor, seen end-on'),
  wave: svgV(G.WAVE, 'Plane electromagnetic wave with E along y, B along z and travel along x'),
  spec: svgV(G.SPECTRUM, 'Electromagnetic spectrum on a logarithmic wavelength scale'),
  atmos: svgV(G.ATMOS, 'What the atmosphere absorbs, passes and reflects across the spectrum'),
};
export const qPlot = plot(
  {
    x: { min: 0, max: 5.5, label: 'time t (ms)' },
    y: { min: 0, max: 7, label: 'charge on the positive plate q (μC)' },
    functions: [
      { expr: '3x', label: 'charging: slope 3.0 μC per ms', domain: [0, 2] },
      { expr: '6', label: 'steady: slope zero', domain: [2, 4] },
      { expr: '30 - 6x', label: 'discharging: slope −6.0 μC per ms', domain: [4, 5] },
    ],
  },
  'Charge on a capacitor plate against time: it rises steadily to 6 microcoulombs in 2 milliseconds, stays level for 2 milliseconds, then falls to zero in 1 millisecond',
  'The displacement current in the gap is the slope: 3.0 mA, then zero, then 6.0 mA in the opposite sense.',
);
export const lamPlot = plot(
  {
    x: { min: 0.5, max: 6, label: 'frequency f (GHz)' },
    y: { min: 0, max: 60, label: 'wavelength λ in vacuum (cm)' },
    functions: [{ expr: '30/x', label: 'λ = c/f', domain: [0.5, 6] }],
    points: [
      { at: [1.8, 16.7], label: 'mobile phone band, 1.8 GHz: 16.7 cm' },
      { at: [2.45, 12.2], label: 'microwave oven, 2.45 GHz: 12.2 cm' },
      { at: [5, 6], label: 'Wi-Fi, 5.0 GHz: 6.0 cm' },
    ],
  },
  'Wavelength against frequency for microwaves between half a gigahertz and six gigahertz: a falling curve, since the wavelength is the speed of light divided by the frequency; a phone band, a microwave oven and a Wi-Fi band are marked',
  'Doubling the frequency halves the wavelength: λ (cm) = 30 ÷ f (GHz).',
);
const compareTable = table(
  ['', 'Conduction current', 'Displacement current'],
  [
    ['Made by', 'Charges drifting through a conductor', 'A changing electric field (or flux)'],
    ['Where', 'Wires, resistors, any conductor', 'Anywhere E changes: a capacitor gap, even vacuum'],
    ['Formula', '$i = dq/dt$', '$i_d = \\varepsilon_0\\,d\\Phi_E/dt$'],
    ['Magnetic field', 'Yes', 'Yes, exactly like a conduction current'],
    ['With steady DC', 'Can flow steadily', 'Zero once E stops changing'],
  ],
  'Table comparing conduction current, made by moving charges in a conductor, with displacement current, made by a changing electric field anywhere, even in vacuum; both produce magnetic fields',
);
const waveFlow = flow(
  'LR',
  [
    ['a', 'Charge oscillates in an aerial'],
    ['b', 'Changing E field'],
    ['c', 'Changing B field (Ampère–Maxwell)'],
    ['d', 'Changing E field (Faraday)'],
    ['e', 'Pattern travels outwards at c'],
  ],
  [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'c'], ['d', 'e']],
  'Flow of how an electromagnetic wave sustains itself: an oscillating charge makes a changing electric field, which makes a changing magnetic field, which in turn makes a changing electric field, and the linked pattern travels outward at the speed of light',
);
const constTable = table(
  ['Quantity', 'Value (SI)'],
  [
    ['Permeability of free space $\\mu_0$', '$4\\pi \\times 10^{-7}$ T m A⁻¹'],
    ['Permittivity of free space $\\varepsilon_0$', '$8.85 \\times 10^{-12}$ C² N⁻¹ m⁻²'],
    ['$1/\\sqrt{\\mu_0\\varepsilon_0}$', '$3.00 \\times 10^{8}$ m s⁻¹, the measured speed of light'],
  ],
  'Table of the two constants of free space and the speed they predict: three times ten to the eight metres per second, the speed of light',
);
const propsTable = table(
  ['Shared by every EM wave', 'What it means'],
  [
    ['Transverse', 'E and B are at right angles to the direction of travel'],
    ['Speed c in vacuum', 'Same for radio waves and gamma rays'],
    ['No medium needed', 'They cross empty space from the Sun and stars'],
    ['E and B in phase, E₀ = cB₀', 'Both peak together'],
    ['Carry energy and momentum', 'They warm, push and can be absorbed'],
    ['Not deflected by E or B fields', 'They carry no charge'],
    ['Obey c = fλ', 'Reflect, refract, interfere, diffract and can be polarised'],
  ],
  'Table of properties shared by all electromagnetic waves: transverse, travel at c in vacuum, need no medium, E and B in phase, carry energy and momentum, uncharged, and obey c equals f lambda',
);
const rangeTable = table(
  ['Band', 'Wavelength (about)', 'Frequency (about)'],
  [
    ['Radio', 'longer than 30 cm', 'below 1 GHz'],
    ['Microwave', '1 mm to 30 cm', '1 GHz to 300 GHz'],
    ['Infrared', '700 nm to 1 mm', '3 × 10¹¹ to 4.3 × 10¹⁴ Hz'],
    ['Visible', '400 nm to 700 nm', '4.3 × 10¹⁴ to 7.5 × 10¹⁴ Hz'],
    ['Ultraviolet', '1 nm to 400 nm', '7.5 × 10¹⁴ to 3 × 10¹⁷ Hz'],
    ['X-rays', '1 pm to 1 nm', '3 × 10¹⁷ to 3 × 10²⁰ Hz'],
    ['Gamma rays', 'below about 10 pm (overlaps X-rays)', 'above about 3 × 10¹⁹ Hz'],
  ],
  'Table of approximate wavelength and frequency ranges of the seven bands, from radio waves longer than 30 centimetres to gamma rays shorter than about 10 picometres; the boundaries are not sharp',
);
const sdu = (rows, alt) => table(['', 'Detail'], rows, alt);
const radarFlow = flow(
  'LR',
  [
    ['a', 'Dish sends a short microwave pulse'],
    ['b', 'Pulse reflects from the aircraft'],
    ['c', 'Echo returns after time t'],
    ['d', 'Distance = ct/2'],
  ],
  [['a', 'b'], ['b', 'c'], ['c', 'd']],
  'Flow of radar ranging: a dish sends a short microwave pulse, it reflects from an aircraft, the echo returns after a time t, and the distance is the speed of light times t over two',
);

export const deck1 = deck({
  part: 1,
  title: 'Electromagnetic Waves — Part 1: Displacement current and the nature of EM waves',
  goals: [
    'Explain why displacement current is needed for the continuity of current in a charging capacitor, and use i_d = ε₀ dΦE/dt',
    'Sketch an electromagnetic wave showing E, B and the direction of travel',
    'Use c = 1/√(μ₀ε₀), E₀ = cB₀ and c = fλ, and state the properties common to all EM waves',
  ],
  slides: [
    sl('title', 'Electromagnetic Waves', {
      b: 'Part 1 — a missing current in a capacitor gap leads to waves of electric and magnetic field that travel at the speed of light.',
      v: V.wave,
      n: 'Radio, Wi-Fi, sunlight and hospital X-rays all have something in common: they are waves of electric and magnetic field that need no medium at all. In this part we meet the idea that made them possible, the displacement current in a charging capacitor, then see how changing fields keep each other going as a transverse wave, and work out its speed from two constants of empty space.',
    }),
    sl('concept', 'Ampère’s law meets a charging capacitor', {
      b: r`Ampère’s circuital law, $\oint \vec B \cdot d\vec l = \mu_0 i$, uses the current through **any** surface bounded by the loop. Take a loop round the lead of a capacitor that is being charged:`,
      ul: ['A flat disc spanning the loop is crossed by the wire: enclosed current $i$.', 'A bag-shaped surface on the same loop, bulging through the **gap**, is crossed by no charge: enclosed current **zero**.', 'Same loop, two answers: the law as it stood is incomplete.'],
      v: V.disp,
      n: 'Ampère’s law says the magnetic field round a loop depends on the current through any surface the loop bounds. Draw a loop round the wire leading to a charging capacitor. A flat disc on that loop is pierced by the wire, so the enclosed current is i. But a bag on the same loop can pass through the gap, where no charge flows, giving zero. One loop cannot have two fields, so something is missing.',
    }),
    sl('diagram', 'Displacement current', {
      b: r`Maxwell noticed that in the gap the **electric flux is changing**. He added a **displacement current**
$$i_d = \varepsilon_0\,\dfrac{d\Phi_E}{dt}$$
For parallel plates, $\Phi_E = EA = \dfrac{q}{\varepsilon_0}$, so $i_d = \dfrac{dq}{dt} = i$: the current is **continuous** through the gap.`,
      ul: ['Ampère–Maxwell law: $\\oint \\vec B \\cdot d\\vec l = \\mu_0(i + i_d)$.', 'Basic idea only in ISC: use $i_d = \\varepsilon_0\\,d\\Phi_E/dt$ as a formula.'],
      v: V.disp,
      n: 'In the gap, nothing flows, but the electric field is growing as charge piles up on the plates. Maxwell treated this changing electric flux as a current of its own, the displacement current, epsilon nought times the rate of change of electric flux. Between parallel plates the flux is the charge divided by epsilon nought, so the displacement current equals the rate of arrival of charge: exactly the current in the wires. The current is continuous after all.',
    }),
    sl('diagram', 'A changing electric field makes a magnetic field', {
      b: 'The displacement current produces a magnetic field just as a conduction current does: field lines are **circles** round the axis of the plates, inside the gap and beyond its edge.',
      ul: ['Its direction follows the right-hand rule, as for a wire carrying the current $i_d$.', 'It exists only while $E$ is changing: once the capacitor is fully charged, $i_d = 0$ and this field vanishes.'],
      v: V.loops,
      n: 'Look along the axis of the capacitor, with the displacement current going into the page. Measurements show a magnetic field in the gap, its lines forming circles round the axis, clockwise here, just as round a wire carrying the same current. So a changing electric field creates a magnetic field. Once the plates are fully charged, the field between them stops changing, and this magnetic field disappears.',
    }),
    sl('example', 'Worked example 1: displacement current from a changing field', {
      b: r`A parallel-plate capacitor has plates of area 0.040 m² and a gap of 1.5 mm. The p.d. across it is rising at $6.0 \times 10^{5}$ V s⁻¹. Find the displacement current, and check it against the charging current.`,
      ul: [
        r`Step 1 — $\dfrac{dE}{dt} = \dfrac{1}{d}\dfrac{dV}{dt} = \dfrac{6.0 \times 10^{5}}{1.5 \times 10^{-3}} = ${sci(ex1.dEdt, 2)}$ V m⁻¹ s⁻¹, so $\dfrac{d\Phi_E}{dt} = A\dfrac{dE}{dt} = ${sci(ex1.dPhi, 2)}$ V m s⁻¹.`,
        r`Step 2 — $i_d = \varepsilon_0\dfrac{d\Phi_E}{dt} = 8.85 \times 10^{-12} \times ${sci(ex1.dPhi, 2)} = ${sci(ex1.id, 3)}$ A (about 0.14 mA).`,
        r`Check — $C = \dfrac{\varepsilon_0A}{d} = ${sci(ex1.C, 3)}$ F and $i = C\dfrac{dV}{dt} = ${sci(ex1.i, 3)}$ A: the same.`,
      ],
      v: table(['Quantity', 'Value'], [['Rate of change of E', '4.0 × 10⁸ V m⁻¹ s⁻¹'], ['Rate of change of electric flux', '1.6 × 10⁷ V m s⁻¹'], ['Displacement current', '0.142 mA'], ['Charging current C dV/dt', '0.142 mA']], 'Worked table: the field grows at four times ten to the eight volts per metre per second, the flux at one point six times ten to the seven, and the displacement current and the charging current are both 0.142 milliamperes'),
      n: 'The field in the gap is the voltage over the gap, so it grows at four times ten to the eight volts per metre every second. Multiply by the plate area for the rate of change of flux, then by epsilon nought: the displacement current is about point one four milliamperes. Working out the capacitance and multiplying by the rate of rise of voltage gives the very same current in the leads, as it must.',
    }),
    sl('diagram', 'Reading a charge–time graph', {
      b: r`Since $i_d = dq/dt$ for a parallel-plate capacitor, the displacement current is the **slope** of the $q$–$t$ graph:`,
      ul: ['0 to 2 ms: slope 3.0 μC per ms, so $i_d$ = 3.0 mA.', '2 ms to 4 ms: charge steady, so $i_d$ = 0, however much charge is stored.', '4 ms to 5 ms: slope −6.0 μC per ms, so 6.0 mA in the **opposite** direction (discharging).'],
      v: qPlot,
      n: 'Because the displacement current equals the rate of change of charge, we can read it from a graph of charge against time. While the charge climbs steadily, the displacement current is three milliamperes. While the charge stays put, it is zero, even though the plates are fully charged. When the capacitor discharges in one millisecond, the slope is twice as steep and negative: six milliamperes, the other way.',
    }),
    sl('concept', 'Conduction and displacement current compared', {
      b: 'Both kinds of current produce magnetic fields; only one involves moving charges.',
      v: compareTable,
      ul: ['In a circuit with a capacitor, the two together make a **continuous** current all the way round.'],
      n: 'Compare the two. A conduction current is charge drifting through a conductor. A displacement current is a changing electric field, and it can exist anywhere, even in empty space. Both produce magnetic fields in exactly the same way. With a steady direct current the capacitor soon fills, the field stops changing, and the displacement current drops to zero, which is why a capacitor blocks steady direct current.',
    }),
    sl('check', 'Quick check: two surfaces, one loop', {
      b: 'Choose the correct option.',
      v: V.disp,
      chk: 'dispsurface-mcq',
      n: 'How much conduction current crosses a surface that passes through the gap?',
    }),
    sl('concept', 'How an EM wave keeps itself going', {
      b: 'Faraday: a **changing B** produces an E field. Maxwell: a **changing E** produces a B field. Each regenerates the other, so the disturbance can travel through empty space.',
      ul: ['Source: an **accelerated** charge, such as electrons oscillating in an aerial at frequency f, which radiate waves of the same frequency.', 'A charge at rest or moving at constant velocity does not radiate.'],
      v: waveFlow,
      n: 'Now put the two laws side by side. Faraday showed that a changing magnetic field produces an electric field. Maxwell added that a changing electric field produces a magnetic field. So once something starts the fields changing, each keeps regenerating the other, and the pattern moves outwards. That something is an accelerated charge, for example electrons rushing up and down an aerial, which radiate waves of their own frequency.',
    }),
    sl('diagram', 'The transverse nature of EM waves', {
      b: r`In a plane EM wave travelling along $x$, $\vec E$ oscillates along $y$ and $\vec B$ along $z$:
$$\vec E \perp \vec B,\qquad \text{both} \perp \text{direction of travel}$$`,
      ul: ['The direction of travel is the direction of $\\vec E \\times \\vec B$.', '$E$ and $B$ rise and fall **in phase**, with $E_0 = cB_0$.', 'Qualitative only in ISC: no wave equation is needed.'],
      v: V.wave,
      n: 'This sketch is worth learning to draw. The wave travels along x. The electric field, in red, swings up and down along y, and the magnetic field, in blue, swings along z. Both are at right angles to each other and to the direction of travel, so the wave is transverse. They reach their peaks together, in phase. Turning from E towards B with the right hand, your thumb points the way the wave travels.',
    }),
    sl('concept', 'The speed of EM waves', {
      b: r`Maxwell’s equations predict a wave speed in vacuum
$$c = \dfrac{1}{\sqrt{\mu_0\varepsilon_0}}$$
and a fixed ratio of the peak fields: $\dfrac{E_0}{B_0} = c$.`,
      ul: ['The value matched the measured speed of light, so Maxwell concluded that **light is an electromagnetic wave**.', 'Hertz later generated and detected radio waves in the laboratory and confirmed the prediction.', 'For any EM wave in vacuum: $c = f\\lambda$.'],
      v: constTable,
      n: 'From his equations Maxwell found that the waves should travel at one over the square root of mu nought times epsilon nought. Put in the two constants, measured with coils and capacitors, and out comes three times ten to the eight metres per second, the speed of light. Maxwell concluded that light itself is an electromagnetic wave. The peak electric field is always c times the peak magnetic field.',
    }),
    sl('example', 'Worked example 2: c from two constants, and B₀ from E₀', {
      b: r`(a) Using $\mu_0 = 4\pi \times 10^{-7}$ T m A⁻¹ and $\varepsilon_0 = 8.85 \times 10^{-12}$ C² N⁻¹ m⁻², evaluate $1/\sqrt{\mu_0\varepsilon_0}$. (b) An EM wave in vacuum has a peak electric field of 72 V m⁻¹. Find its peak magnetic field.`,
      ul: [
        r`(a) $\mu_0\varepsilon_0 = 4\pi \times 10^{-7} \times 8.85 \times 10^{-12} = ${sci(MU0 * EPS0, 3)}$ s² m⁻², so $c = ${sci(ex2.c, 3)}$ m s⁻¹.`,
        r`(b) $B_0 = \dfrac{E_0}{c} = \dfrac{72}{3.0 \times 10^{8}} = ${sci(ex2.B0, 2)}$ T (0.24 μT).`,
      ],
      v: table(['Quantity', 'Value'], [['μ₀ε₀', '1.11 × 10⁻¹⁷ s² m⁻²'], ['c', '3.00 × 10⁸ m s⁻¹'], ['B₀ for E₀ = 72 V m⁻¹', '2.4 × 10⁻⁷ T']], 'Worked table: mu nought epsilon nought is 1.11 times ten to the minus seventeen, giving c of three times ten to the eight metres per second; a 72 volt per metre wave has a peak magnetic field of 0.24 microtesla'),
      n: 'Multiply the two constants: about one point one one times ten to the minus seventeen. The square root of that is about three point three times ten to the minus nine, and one over it is three point zero zero times ten to the eight metres per second. For part b, divide the peak electric field, seventy two volts per metre, by the speed of light: the peak magnetic field is only point two four microtesla.',
    }),
    sl('check', 'Quick check: peak fields', {
      b: 'Calculate the peak electric field.',
      v: V.wave,
      chk: 'E0radar-num',
      n: 'The peak electric field is c times the peak magnetic field.',
    }),
    sl('concept', 'Properties common to all EM waves', {
      b: 'Whatever their frequency, all electromagnetic waves share these properties:',
      v: propsTable,
      ul: ['They differ only in frequency (and so wavelength), which decides how they are produced, detected and used.'],
      n: 'From long radio waves to the shortest gamma rays, every electromagnetic wave is transverse, travels at the same speed c in vacuum, and needs no medium. Its fields are in phase. It carries energy and momentum, it is not bent by electric or magnetic fields because it has no charge, and it obeys c equals f lambda. The only thing that changes from band to band is the frequency.',
    }),
    sl('example', 'Worked example 3: a Wi-Fi wave', {
      b: r`A Wi-Fi router transmits at 2.4 GHz. Find (a) the wavelength, (b) the period of the oscillating fields, (c) the time the wave takes to cross a 30 m house, and how many wavelengths fit in that distance.`,
      ul: [
        r`(a) $\lambda = \dfrac{c}{f} = \dfrac{3.0 \times 10^{8}}{2.4 \times 10^{9}} = ${dec(ex3.lam, 3)}$ m (12.5 cm).`,
        r`(b) $T = \dfrac{1}{f} = ${sci(ex3.T, 3)}$ s.`,
        r`(c) $t = \dfrac{30}{3.0 \times 10^{8}} = ${sci(ex3.t, 2)}$ s (0.10 μs); $\dfrac{30}{${dec(ex3.lam, 3)}} = ${dec(ex3.n, 3)}$ wavelengths.`,
      ],
      v: table(['Quantity', 'Value'], [['Wavelength', '12.5 cm'], ['Period', '4.17 × 10⁻¹⁰ s'], ['Time to cross 30 m', '1.0 × 10⁻⁷ s'], ['Wavelengths in 30 m', '240']], 'Worked table: wavelength 12.5 centimetres, period 4.17 times ten to the minus ten seconds, a tenth of a microsecond to cross 30 metres, which holds 240 wavelengths'),
      n: 'Divide the speed of light by two point four gigahertz: the wavelength is twelve and a half centimetres. The fields complete one oscillation in about four tenths of a nanosecond. Crossing a thirty metre house takes a tenth of a microsecond, and two hundred and forty wavelengths fit into that distance.',
    }),
    sl('check', 'Quick check: does light need a medium?', {
      b: 'Decide whether the statement is true or false.',
      v: propsTable,
      chk: 'nomedium-tf',
      n: 'How does sunlight reach us across space?',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Displacement current', '$i_d = \\varepsilon_0\\,d\\Phi_E/dt$; equals the charging current'],
          ['Ampère–Maxwell law', '$\\oint \\vec B \\cdot d\\vec l = \\mu_0(i + i_d)$'],
          ['Source of EM waves', 'Accelerated (oscillating) charges'],
          ['Transverse', '$\\vec E \\perp \\vec B \\perp$ direction of travel ($\\vec E \\times \\vec B$)'],
          ['Speed', '$c = 1/\\sqrt{\\mu_0\\varepsilon_0} = 3.0 \\times 10^{8}$ m s⁻¹; $c = f\\lambda$'],
          ['Peak fields', '$E_0 = cB_0$, in phase'],
        ],
        'Summary table of displacement current, the Ampère–Maxwell law, the source of EM waves, their transverse nature, their speed and the ratio of the peak fields',
      ),
      n: 'To sum up: a changing electric flux acts as a displacement current, epsilon nought d phi E by d t, which equals the charging current and keeps the current continuous through a capacitor. Accelerated charges radiate electromagnetic waves, in which E and B are at right angles to each other and to the direction of travel. In vacuum they travel at one over root mu nought epsilon nought, the speed of light, with E nought equal to c times B nought.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'For continuity of current, describe the two surfaces on one loop and say which encloses what.',
        'For a capacitor, $i_d = C\\,dV/dt$, which is the same as $\\varepsilon_0A\\,dE/dt$.',
        'In the sketch, label E, B and the direction of travel, all mutually perpendicular, and draw E and B in phase.',
        'Use $E_0 = cB_0$ and $c = f\\lambda$; keep powers of ten tidy (GHz = 10⁹ Hz).',
      ],
      v: table(['Asked', 'Key point'], [['Capacitor fully charged?', 'i_d = 0'], ['E along +y, B along +z?', 'Travels along +x'], ['Frequency doubled in vacuum?', 'Speed unchanged, λ halved']], 'Table of common questions and the key point for each'),
      n: 'When you explain continuity of current, name the loop and its two surfaces and say what each encloses. For a capacitor, the displacement current is simply C times the rate of change of voltage. Make your wave sketch with three labelled, mutually perpendicular directions and the fields in phase. In numericals, use E nought equals c B nought and c equals f lambda, and keep the powers of ten under control.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Electromagnetic Waves — Part 2: The electromagnetic spectrum',
  goals: [
    'Arrange the regions of the electromagnetic spectrum in order of frequency or wavelength, with approximate ranges',
    'Give a source, a detector and a use for each region',
    'Use c = fλ to place a wave in its band, and explain everyday applications from radar to radiotherapy',
  ],
  slides: [
    sl('title', 'The electromagnetic spectrum', {
      b: 'Part 2 — seven bands, one kind of wave: from radio waves kilometres long to gamma rays smaller than an atom.',
      v: V.spec,
      n: 'A radio mast, a microwave oven, a TV remote, your eyes, a germ-killing lamp, an X-ray machine and a cancer-therapy unit all deal with the same kind of wave. Only the frequency is different. In this part we arrange the bands in order, learn their rough ranges, and for each one see how it is produced, how it is detected and what it is used for.',
    }),
    sl('concept', 'Seven bands and their ranges', {
      b: 'In order of **increasing frequency** (decreasing wavelength): radio, microwaves, infrared, visible, ultraviolet, X-rays, gamma rays.',
      v: rangeTable,
      ul: ['The boundaries are approximate; neighbouring bands overlap.', 'X-rays and gamma rays of the same wavelength are identical; they are named by their **origin** (electrons for X-rays, nuclei for gamma rays).'],
      n: 'Here are the seven bands in order of rising frequency: radio, microwaves, infrared, visible, ultraviolet, X-rays and gamma rays. A handy memory line is: Rich Men In Vegas Use eXpensive Gadgets. The ranges are approximate, and neighbouring bands blur into each other. X-rays and gamma rays even overlap: a wave of a given wavelength is called an X-ray if electrons made it and a gamma ray if a nucleus did.',
    }),
    sl('diagram', 'The spectrum on a logarithmic scale', {
      b: r`Every band obeys $c = f\lambda$ in vacuum, so $f$ rises as $\lambda$ falls. On a logarithmic scale each step is a factor of 1000 in wavelength.`,
      ul: ['Visible light is a very narrow band, about 400–700 nm.', 'From ultraviolet upwards the radiation can **ionise** atoms and damage living cells.'],
      v: V.spec,
      n: 'The spectrum covers such a vast range that we draw it on a logarithmic scale, where each tick is a thousand times shorter in wavelength than the one before. Notice how tiny the visible band is, from about four hundred to seven hundred nanometres. Moving to the right, the frequency rises, and from ultraviolet onwards the radiation can knock electrons out of atoms, which is why it can harm living cells.',
    }),
    sl('example', 'Worked example 4: which band?', {
      b: r`Use $c = f\lambda$ to name the band of (a) a wave of frequency 2.45 GHz, (b) radiation of wavelength 3.0 μm, (c) radiation of frequency $1.2 \times 10^{18}$ Hz.`,
      ul: [
        r`(a) $\lambda = \dfrac{3.0 \times 10^{8}}{2.45 \times 10^{9}} = ${dec(ex4.la, 3)}$ m (12.2 cm): **microwave** (the frequency of a microwave oven).`,
        r`(b) $f = \dfrac{3.0 \times 10^{8}}{3.0 \times 10^{-6}} = ${sci(ex4.fb, 2)}$ Hz: **infrared**.`,
        r`(c) $\lambda = \dfrac{3.0 \times 10^{8}}{1.2 \times 10^{18}} = ${sci(ex4.lc, 2)}$ m (0.25 nm): **X-rays**.`,
      ],
      v: table(['Given', 'Calculated', 'Band'], [['f = 2.45 GHz', 'λ = 12.2 cm', 'Microwave'], ['λ = 3.0 μm', 'f = 1.0 × 10¹⁴ Hz', 'Infrared'], ['f = 1.2 × 10¹⁸ Hz', 'λ = 0.25 nm', 'X-rays']], 'Worked table: 2.45 gigahertz is 12.2 centimetres, a microwave; 3 micrometres is ten to the fourteen hertz, infrared; 1.2 times ten to the eighteen hertz is 0.25 nanometres, X-rays'),
      n: 'Change whichever quantity is given into the other, then compare with the table. Two point four five gigahertz gives a wavelength of about twelve centimetres, a microwave: in fact the frequency used in microwave ovens. Three micrometres corresponds to ten to the fourteen hertz, in the infrared. And one point two times ten to the eighteen hertz has a wavelength of a quarter of a nanometre, an X-ray.',
    }),
    sl('concept', 'Radio waves', {
      b: 'Longest wavelengths, from about 30 cm to many kilometres.',
      v: sdu(
        [
          ['Source', 'Oscillating currents in transmitting aerials (electronic oscillators)'],
          ['Detection', 'Receiving aerial with a tuned circuit (radio, TV sets)'],
          ['Uses', 'AM and FM broadcasting, TV, two-way radio, radio astronomy (GMRT near Pune)'],
        ],
        'Table for radio waves: produced by oscillating currents in aerials, detected by an aerial and tuned circuit, used for broadcasting, television, two-way radio and radio astronomy',
      ),
      ul: ['Medium waves are reflected by the **ionosphere**, so they can reach beyond the horizon.'],
      n: 'Radio waves are made by electrons surging back and forth in a transmitting aerial, driven by an electronic oscillator. A receiving aerial picks them up, and a tuned circuit selects one station. They carry AM and FM broadcasts and television, and radio telescopes such as the Giant Metrewave Radio Telescope near Pune study the radio waves arriving from distant galaxies.',
    }),
    sl('concept', 'Microwaves', {
      b: 'About 1 mm to 30 cm (1 GHz to 300 GHz).',
      v: lamPlot,
      ul: ['**Source:** magnetron (ovens), klystron, Gunn diodes and transistor oscillators (phones, Wi-Fi).', '**Detection:** dish or horn aerial with a crystal (point-contact) diode.', '**Uses:** radar, microwave ovens, mobile phones, Wi-Fi, Bluetooth, satellite and DTH television links.'],
      n: 'Microwaves come from special valves called magnetrons and klystrons, or from small semiconductor oscillators in phones and routers. Dishes and horns collect them, and a crystal diode detects them. Their short wavelengths make narrow beams for radar and satellite links, and water molecules in food absorb them strongly, which is how a microwave oven heats. On the graph, a higher frequency means a shorter wavelength.',
    }),
    sl('check', 'Quick check: a car key', {
      b: 'Choose the correct option.',
      v: lamPlot,
      chk: 'fob-mcq',
      n: 'Divide the speed of light by the frequency, then compare with the band edges.',
    }),
    sl('example', 'Worked example 5: radar ranging', {
      b: r`An airport radar working at 3.0 GHz sends out a short pulse, and the echo from an aircraft returns 0.30 ms later. Find (a) the wavelength used, (b) the distance of the aircraft.`,
      ul: [
        r`(a) $\lambda = \dfrac{3.0 \times 10^{8}}{3.0 \times 10^{9}} = ${dec(ex5.lam, 2)}$ m (10 cm, a microwave).`,
        r`(b) The pulse travels there and back: $d = \dfrac{ct}{2} = \dfrac{3.0 \times 10^{8} \times 0.30 \times 10^{-3}}{2} = ${sci(ex5.d, 2)}$ m (45 km).`,
      ],
      v: radarFlow,
      n: 'At three gigahertz the wavelength is ten centimetres, well inside the microwave band. The pulse goes out to the aircraft and comes back, so in point three milliseconds it covers twice the distance. Light speed times time gives ninety kilometres for the round trip, so the aircraft is forty five kilometres away.',
    }),
    sl('concept', 'Infrared', {
      b: 'About 700 nm to 1 mm, just beyond red light.',
      v: sdu(
        [
          ['Source', 'Hot and warm bodies (Sun, heaters, human skin), infrared LEDs'],
          ['Detection', 'Thermopile, bolometer, IR photodiodes and phototransistors, thermal cameras, skin (warmth)'],
          ['Uses', 'Remote controls, non-contact thermometers, night vision, physiotherapy heat lamps, optical-fibre links, keeping greenhouses warm'],
        ],
        'Table for infrared: produced by hot and warm bodies and infrared LEDs, detected by thermopiles, bolometers, photodiodes, thermal cameras and the skin, used in remote controls, thermometers, night vision, heat therapy and fibre links',
      ),
      ul: ['Absorbed by water vapour and carbon dioxide: the basis of the greenhouse effect.'],
      n: 'Every warm object gives out infrared, from the Sun and a room heater down to your own skin. We feel strong infrared as warmth. Instruments detect it with thermopiles and bolometers, which warm up, or with infrared photodiodes. It is used in remote controls, forehead thermometers, night-vision and thermal cameras, physiotherapy lamps, and the optical fibres that carry the internet.',
    }),
    sl('concept', 'Visible light', {
      b: 'About 400 nm (violet) to 700 nm (red): the only band our eyes detect.',
      v: table(
        ['Colour', 'Wavelength (about)'],
        [['Violet', '400–450 nm'], ['Blue', '450–490 nm'], ['Green', '490–570 nm'], ['Yellow', '570–590 nm'], ['Orange', '590–620 nm'], ['Red', '620–700 nm']],
        'Table of approximate wavelengths of the colours of visible light, from violet at 400 to 450 nanometres to red at 620 to 700 nanometres',
      ),
      ul: ['**Source:** the Sun, flames, filament lamps, LEDs, lasers. **Detection:** the eye, photocells, camera sensors, photographic film.', '**Uses:** seeing, photography, photosynthesis, optical communication.'],
      n: 'Visible light is a sliver of the spectrum, from violet at about four hundred nanometres to red at about seven hundred. It comes from the Sun, flames, lamps, LEDs and lasers, and it is detected by the retina of the eye, by photocells and by the sensors in a camera. Plants use it for photosynthesis, and we use it to see.',
    }),
    sl('concept', 'Ultraviolet', {
      b: 'About 1 nm to 400 nm, just beyond violet.',
      v: V.atmos,
      ul: ['**Source:** the Sun, mercury-vapour lamps, electric arcs (welding), UV LEDs. **Detection:** photocells, fluorescent materials, photographic film.', '**Uses:** sterilising water and surfaces, checking banknotes (fluorescent marks), making vitamin D in the skin.', '**Ozone** high in the atmosphere absorbs most solar UV; too much UV causes sunburn, eye damage and skin cancer.'],
      n: 'Ultraviolet comes from the Sun, from mercury-vapour lamps and from electric arcs. It makes some materials glow, or fluoresce, which is how it is detected, along with photocells and film. It kills germs, so it sterilises water and surfaces; it shows up hidden marks on banknotes; and a little of it helps the skin make vitamin D. The ozone layer absorbs most of the Sun’s harmful short-wave ultraviolet.',
    }),
    sl('check', 'Quick check: a banknote lamp', {
      b: 'Choose the correct option.',
      v: V.atmos,
      chk: 'uvnote-mcq',
      n: 'Which radiation makes hidden fluorescent ink glow?',
    }),
    sl('concept', 'X-rays', {
      b: 'About 1 pm to 1 nm.',
      v: sdu(
        [
          ['Source', 'X-ray tube: fast electrons, accelerated through tens of kilovolts, strike a metal target such as tungsten'],
          ['Detection', 'Photographic film, fluorescent screens, digital detectors, Geiger–Müller counters'],
          ['Uses', 'Radiography of bones and teeth, CT scans, airport baggage checks, finding the arrangement of atoms in crystals'],
        ],
        'Table for X-rays: produced when fast electrons strike a metal target in an X-ray tube, detected by film, fluorescent screens, digital detectors and Geiger counters, used for radiography, CT scans, baggage checks and crystal studies',
      ),
      ul: ['They pass through soft tissue but are absorbed by bone and metal; they ionise, so exposure is kept short and staff are shielded with lead.'],
      n: 'X-rays are made in an X-ray tube, where electrons accelerated through tens of thousands of volts slam into a metal target. They pass easily through flesh, cloth and plastic but are absorbed by bone and metal, so they cast shadow pictures on film or a digital detector. Their wavelengths are close to the spacing of atoms, so they also reveal how atoms are arranged in crystals. Because they ionise, staff shelter behind lead.',
    }),
    sl('concept', 'Gamma rays', {
      b: 'Shortest wavelengths, below about 10 pm: the most penetrating radiation.',
      v: sdu(
        [
          ['Source', 'Radioactive nuclei (for example cobalt-60), nuclear reactions'],
          ['Detection', 'Geiger–Müller counter, scintillation counter, photographic film'],
          ['Uses', 'Radiotherapy for cancer, sterilising syringes and surgical gloves, food irradiation, checking welds in pipelines'],
        ],
        'Table for gamma rays: emitted by radioactive nuclei such as cobalt-60, detected by Geiger and scintillation counters and film, used in radiotherapy, sterilising medical items, food irradiation and checking welds',
      ),
      ul: ['They come from changes inside the **nucleus**, not from electrons; thick lead or concrete is needed to stop them.'],
      n: 'Gamma rays come from inside the nucleus, when a radioactive nucleus such as cobalt sixty settles into a lower-energy state. Geiger counters and scintillation counters detect them. They are so penetrating and so damaging to cells that they are used to destroy tumours, to sterilise sealed packs of syringes and gloves, to stop stored onions and potatoes from sprouting, and to check thick metal welds for cracks.',
    }),
    sl('check', 'Quick check: an airport scanner', {
      b: 'Choose the correct option.',
      v: V.spec,
      chk: 'baggage-mcq',
      n: 'What gets through a suitcase, and what does not?',
    }),
    sl('diagram', 'The atmosphere and the spectrum', {
      b: 'Our atmosphere lets only some bands through:',
      v: V.atmos,
      ul: ['Gamma rays, X-rays and short-wave UV are absorbed high up (ozone absorbs the UV), which protects life.', 'Visible light and many radio wavelengths reach the ground: optical and radio telescopes can work on Earth.', 'The ionosphere reflects medium-wave radio back to Earth, but microwaves pass through it to satellites.'],
      n: 'The atmosphere filters the spectrum. Gamma rays and X-rays from space are absorbed high up, and the ozone layer absorbs most short-wave ultraviolet, which protects life on the ground. Visible light and many radio waves get through, so telescopes for both can work on Earth. A charged layer called the ionosphere reflects medium-wave radio back down, while microwaves pass through it, which is why satellites are reached with microwaves.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Band', 'Source', 'Detector', 'One use'],
        [
          ['Radio', 'Oscillating current in an aerial', 'Aerial and tuned circuit', 'Broadcasting'],
          ['Microwave', 'Magnetron, klystron', 'Crystal diode', 'Radar, ovens, Wi-Fi'],
          ['Infrared', 'Hot bodies, IR LEDs', 'Thermopile, bolometer', 'Remote controls'],
          ['Visible', 'Sun, lamps, LEDs', 'Eye, photocell', 'Seeing'],
          ['Ultraviolet', 'Sun, mercury lamp, arcs', 'Photocell, fluorescence', 'Sterilising water'],
          ['X-rays', 'Fast electrons hitting a metal target', 'Film, digital detector', 'Radiography'],
          ['Gamma rays', 'Radioactive nuclei', 'Geiger–Müller counter', 'Radiotherapy'],
        ],
        'Summary table of a source, a detector and a use for each band from radio waves to gamma rays',
      ),
      n: 'To sum up the spectrum in order of rising frequency: radio waves from aerials, used for broadcasting; microwaves from magnetrons, used for radar, ovens and Wi-Fi; infrared from hot bodies, used in remote controls; visible light, which our eyes detect; ultraviolet from the Sun and mercury lamps, used to sterilise water; X-rays from fast electrons hitting metal, used in radiography; and gamma rays from nuclei, used in radiotherapy.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Learn the order both ways: by frequency (radio → gamma) and by wavelength (gamma → radio).',
        'To place a wave, convert with $c = f\\lambda$ and compare with the approximate ranges.',
        'For each band, have one source, one detector and one use ready.',
        'X-rays versus gamma rays: named by origin (electrons or nuclei), not by wavelength alone.',
      ],
      v: table(['Asked', 'Key point'], [['Radar echo time t?', 'Distance ct/2'], ['Which bands ionise?', 'UV, X-rays, gamma rays'], ['Which band does ozone absorb?', 'Ultraviolet']], 'Table of common questions and the key point for each'),
      n: 'Learn the order of the bands in both directions, by frequency and by wavelength. To identify a band, convert between frequency and wavelength with c equals f lambda, then compare with the ranges. Keep one source, one detector and one use ready for every band. And remember that X-rays and gamma rays are named by where they come from, electrons or nuclei, not just by their wavelength.',
    }),
  ],
});
