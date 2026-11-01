// ISC 12 Physics ch11 Alternating Current — two decks: Part 1 (t01–t03) sinusoidal AC, phase, the half-cycle mean and
// rms values, R, L and C alone with their phasors and reactances, and the series LCR circuit by phasors (impedance,
// phase angle, RL and RC cases, graphs against frequency); Part 2 (t04–t06) power and power factor, wattless current,
// the choke coil, resonance with bandwidth and Q (formulae only), LC oscillations (qualitative), the AC generator and
// AC compared with DC. Numbers computed here.
import { sl, deck, table, svgV, plot, r, sci, dec } from '../../isc-12-physics-ch01/src/lib.mjs';
import * as G from './svgs.mjs';

export const W = (f) => 2 * Math.PI * f;
// ---------------------------------------------------------------- worked-example numbers
const ex1 = { P: 1200, V: 230 };
ex1.Irms = ex1.P / ex1.V;
ex1.V0 = ex1.V * Math.SQRT2;
ex1.I0 = ex1.Irms * Math.SQRT2;
ex1.Imean = (2 * ex1.I0) / Math.PI;
ex1.R = ex1.V / ex1.Irms;
const ex2 = { L: 0.35, C: 15e-6, V: 230 };
ex2.XL = W(50) * ex2.L;
ex2.XC = 1 / (W(50) * ex2.C);
ex2.IL = ex2.V / ex2.XL;
ex2.IC = ex2.V / ex2.XC;
ex2.XL200 = W(200) * ex2.L;
ex2.XC200 = 1 / (W(200) * ex2.C);
ex2.feq = 1 / (2 * Math.PI * Math.sqrt(ex2.L * ex2.C));
const ex3 = G.LCR_DATA;
const ex4 = G.WATT_DATA;
const ex5 = G.CHOKE_DATA;
const ex6 = { L: 0.025, C: 4e-6, R: 10, V: 5 };
ex6.w0 = 1 / Math.sqrt(ex6.L * ex6.C);
ex6.f0 = ex6.w0 / (2 * Math.PI);
ex6.I0 = ex6.V / ex6.R;
ex6.XL = ex6.w0 * ex6.L;
ex6.VL = ex6.I0 * ex6.XL;
ex6.Q = ex6.XL / ex6.R;
ex6.dw = ex6.R / ex6.L;
ex6.df = ex6.dw / (2 * Math.PI);
// half-power angular frequencies: ω² ∓ (R/L)ω − ω0² = 0
ex6.w2 = (ex6.dw + Math.sqrt(ex6.dw ** 2 + 4 * ex6.w0 ** 2)) / 2;
ex6.w1 = ex6.w2 - ex6.dw;
const ex7 = { N: 150, a: 0.2, b: 0.12, B: 0.3, n: 50 };
ex7.A = ex7.a * ex7.b;
ex7.w = 2 * Math.PI * ex7.n;
ex7.e0 = ex7.N * ex7.B * ex7.A * ex7.w;
ex7.erms = ex7.e0 / Math.SQRT2;
export const EX = { ex1, ex2, ex3, ex4, ex5, ex6, ex7 };

const fail = [];
const need = (ok, msg) => ok || fail.push(msg);
need(Math.abs(ex1.Irms - 5.2174) < 1e-4 && Math.abs(ex1.V0 - 325.27) < 0.01 && Math.abs(ex1.I0 - 7.3785) < 1e-4 && Math.abs(ex1.Imean - 4.6973) < 1e-4 && Math.abs(ex1.R - 44.083) < 1e-3, 'ex1');
need(Math.abs(ex2.XL - 109.956) < 1e-3 && Math.abs(ex2.XC - 212.207) < 1e-3 && Math.abs(ex2.IL - 2.0918) < 1e-4 && Math.abs(ex2.IC - 1.0838) < 1e-4 && Math.abs(ex2.feq - 69.46) < 0.01, `ex2 ${ex2.feq}`);
need(ex3.Z === 52 && ex3.I === 2.5 && ex3.VR === 120 && ex3.VL === 175 && ex3.VC === 125 && Math.abs(ex3.phi - 22.62) < 0.01, 'ex3');
need(Math.abs(ex4.P - 736) < 1e-9 && Math.abs(ex4.phi - 36.87) < 0.01 && Math.abs(ex4.wattless - 2.4) < 1e-9, 'ex4');
need(Math.abs(ex5.XL - 51.78) < 0.01 && Math.abs(ex5.L - 0.16482) < 1e-5 && ex5.wasted === 520, `ex5 ${ex5.L}`);
need(Math.abs(ex6.w0 - 3162.28) < 0.01 && Math.abs(ex6.f0 - 503.29) < 0.01 && Math.abs(ex6.VL - 39.528) < 1e-3 && Math.abs(ex6.Q - 7.906) < 1e-3 && Math.abs(ex6.df - 63.66) < 0.01, `ex6 ${ex6.Q}`);
need(Math.abs(ex6.w1 * ex6.w2 - ex6.w0 ** 2) < 1e-3 && Math.abs(ex6.w2 - ex6.w1 - ex6.dw) < 1e-9, 'ex6 half-power');
need(Math.abs(ex7.e0 - 339.29) < 0.01 && Math.abs(ex7.erms - 239.92) < 0.01, `ex7 ${ex7.e0}`);
if (fail.length) throw new Error(`worked examples: ${fail.join(', ')}`);

// ---------------------------------------------------------------- visuals
export const V = {
  wave: svgV(G.WAVE, 'Peak, rms and half-cycle mean of a sinusoidal current'),
  phase: svgV(G.PHASOR_WAVE, 'Rotating phasors and the waveforms they generate'),
  elements: svgV(G.ELEMENTS, 'Phasor diagrams for R, L and C alone'),
  lcr: svgV(G.LCR_CIRCUIT, 'The series LCR circuit of worked example 3'),
  lcrPhasor: svgV(G.LCR_PHASOR, 'Phasor diagram of worked example 3, to scale'),
  triangle: svgV(G.IMP_TRIANGLE, 'Impedance triangle of worked example 3'),
  wattless: svgV(G.WATTLESS, 'Active and wattless components of a lagging current'),
  choke: svgV(G.CHOKE, 'A lamp run through a resistor or through a choke'),
  lc: svgV(G.LC_OSC, 'LC oscillations: four quarter-cycle states'),
  gen: svgV(G.GENERATOR, 'The AC generator'),
  genTheory: svgV(G.GEN_THEORY, 'End-on view of a generator coil'),
};
const sinD = (shift = '') => `sin(pi*(x${shift})/180)`;
export const sqPlot = plot(
  {
    x: { min: 0, max: 360, label: 'phase ωt (degrees)' },
    y: { min: -1.1, max: 1.1, label: 'value as a fraction of the peak' },
    functions: [
      { expr: sinD(), label: 'i / I₀ = sin ωt' },
      { expr: `(${sinD()})^2`, label: '(i / I₀)² = sin² ωt' },
    ],
    hlines: [{ y: 0.5, label: 'mean of sin² ωt = 1/2', dashed: true }],
    points: [{ at: [90, 1], label: 'both peak at 90°' }, { at: [270, 1], label: 'sin² peaks again at 270°' }],
  },
  'One cycle of sine omega t and of its square: the sine is negative for half the cycle, but its square is never negative and averages exactly one half over the cycle',
  'Mean of i² = I₀²/2, so I_rms = I₀/√2.',
);
export const lagPlot = plot(
  {
    x: { min: 0, max: 360, label: 'ωt (degrees)' },
    y: { min: -1.2, max: 1.2, label: 'fraction of the peak' },
    functions: [
      { expr: sinD(), label: 'v / V₀ across L' },
      { expr: sinD('-90'), label: 'i / I₀ in L' },
    ],
    points: [{ at: [90, 1], label: 'v peaks' }, { at: [180, 1], label: 'i peaks a quarter cycle later' }],
  },
  'Voltage across a pure inductor and the current in it over one cycle: the current reaches each peak a quarter of a cycle after the voltage, so it lags by 90 degrees',
);
export const leadPlot = plot(
  {
    x: { min: 0, max: 360, label: 'ωt (degrees)' },
    y: { min: -1.2, max: 1.2, label: 'fraction of the peak' },
    functions: [
      { expr: sinD(), label: 'v / V₀ across C' },
      { expr: sinD('+90'), label: 'i / I₀ in C' },
    ],
    points: [{ at: [90, 1], label: 'v peaks' }, { at: [360, 1], label: 'i peaks a quarter cycle earlier (at 0° and 360°)' }],
  },
  'Voltage across a pure capacitor and the current in it over one cycle: the current reaches each peak a quarter of a cycle before the voltage, so it leads by 90 degrees',
);
export const xfPlot = plot(
  {
    x: { min: 0, max: 400, label: 'frequency f (Hz)' },
    y: { min: 0, max: 600, label: 'reactance (Ω)' },
    functions: [
      { expr: '2*pi*x*0.35', label: 'X_L = 2πfL, L = 0.35 H' },
      { expr: '1/(2*pi*x*0.000015)', label: 'X_C = 1/(2πfC), C = 15 μF', domain: [18, 400] },
    ],
    vlines: [{ x: Number(dec(ex2.feq, 3)), label: `equal at about ${dec(ex2.feq, 2)} Hz`, dashed: true }],
    points: [
      { at: [50, Number(dec(ex2.XL, 4))], label: 'X_L ≈ 110 Ω at 50 Hz' },
      { at: [50, Number(dec(ex2.XC, 4))], label: 'X_C ≈ 212 Ω at 50 Hz' },
      { at: [200, Number(dec(ex2.XL200, 4))], label: 'X_L ≈ 440 Ω at 200 Hz' },
      { at: [200, Number(dec(ex2.XC200, 4))], label: 'X_C ≈ 53 Ω at 200 Hz' },
    ],
  },
  'Reactance against frequency for the coil and capacitor of worked example 2: the inductive reactance is a straight line through the origin, the capacitive reactance a curve falling as one over f; they are equal at about 69 hertz',
  'X_L ∝ f; X_C ∝ 1/f.',
);
const Zexpr = (R) => `sqrt(${R * R} + (2*pi*x*0.025 - 1/(2*pi*x*0.000004))^2)`;
const Zof = (R, f) => Math.sqrt(R * R + (W(f) * 0.025 - 1 / (W(f) * 4e-6)) ** 2);
export const zPlot = plot(
  {
    x: { min: 200, max: 900, label: 'frequency f (Hz)' },
    y: { min: 0, max: 300, label: 'impedance Z (Ω)' },
    functions: [{ expr: Zexpr(10), label: 'Z, with L = 25 mH, C = 4.0 μF, R = 10 Ω' }],
    vlines: [{ x: Number(dec(ex6.f0, 4)), label: `f₀ ≈ ${dec(ex6.f0, 3)} Hz`, dashed: true }],
    points: [
      { at: [Number(dec(ex6.f0, 4)), 10], label: 'least: Z = R' },
      { at: [300, Number(dec(Zof(10, 300), 4))], label: 'below f₀: X_C > X_L, capacitive' },
      { at: [800, Number(dec(Zof(10, 800), 4))], label: 'above f₀: X_L > X_C, inductive' },
    ],
    samples: 600,
  },
  'Impedance of a series LCR circuit against frequency: large at low frequency where the capacitor dominates, falling to a minimum equal to R at the resonant frequency of about 503 hertz, and rising again at high frequency where the inductor dominates',
  'I = V/Z is greatest where Z is least.',
);
const Iexpr = (R) => `5/${Zexpr(R)}`;
export const iPlot = plot(
  {
    x: { min: 300, max: 750, label: 'frequency f (Hz)' },
    y: { min: 0, max: 0.6, label: 'rms current I (A), 5.0 V supply' },
    functions: [
      { expr: Iexpr(10), label: 'R = 10 Ω' },
      { expr: Iexpr(30), label: 'R = 30 Ω' },
    ],
    hlines: [{ y: Number(dec(0.5 / Math.SQRT2, 4)), label: 'I₀/√2 for R = 10 Ω (half power)', dashed: true }],
    points: [
      { at: [Number(dec(ex6.f0, 4)), 0.5], label: 'R = 10 Ω: I₀ = V/R = 0.50 A' },
      { at: [Number(dec(ex6.f0, 4)), Number(dec(5 / 30, 4))], label: 'R = 30 Ω: 0.17 A' },
      { at: [Number(dec(ex6.w1 / (2 * Math.PI), 4)), Number(dec(0.5 / Math.SQRT2, 4))], label: 'f₁' },
      { at: [Number(dec(ex6.w2 / (2 * Math.PI), 4)), Number(dec(0.5 / Math.SQRT2, 4))], label: 'f₂' },
    ],
    samples: 900,
  },
  'Resonance curves, rms current against frequency for the circuit of worked example 6 with R equal to 10 ohms and with R equal to 30 ohms: both peak at the same resonant frequency, about 503 hertz, but the curve for the smaller resistance is higher and much sharper; its half-power frequencies f1 and f2 are marked',
  'Bandwidth f₂ − f₁ = R/(2πL); smaller R gives a sharper peak.',
);
export const powerPlot = plot(
  {
    x: { min: 0, max: 360, label: 'ωt (degrees)' },
    y: { min: -1.1, max: 1.1, label: 'fraction of V₀, I₀ or V₀I₀' },
    functions: [
      { expr: sinD(), label: 'v / V₀' },
      { expr: sinD('-60'), label: 'i / I₀ (lags by 60°)' },
      { expr: `${sinD()}*${sinD('-60')}`, label: 'p / V₀I₀ = vi / V₀I₀' },
    ],
    hlines: [{ y: 0.25, label: 'average power = ½V₀I₀ cos 60° = 0.25 V₀I₀', dashed: true }],
    points: [{ at: [90, 1], label: 'v peaks' }, { at: [150, 1], label: 'i peaks 60° later' }],
  },
  'Voltage, current and instantaneous power over one cycle when the current lags by 60 degrees: the power curve swings at twice the supply frequency and is negative for part of each half cycle, when energy flows back to the supply; its average is a quarter of V nought I nought',
  'p = vi; the average is V_rms I_rms cos φ.',
);
export const genPlot = plot(
  {
    x: { min: 0, max: 360, label: 'angle θ = ωt turned from the face-on position (degrees)' },
    y: { min: -1.1, max: 1.1, label: 'fraction of the peak' },
    functions: [
      { expr: 'cos(pi*x/180)', label: 'flux Φ / NBA = cos ωt' },
      { expr: sinD(), label: 'emf e / e₀ = sin ωt' },
    ],
    points: [{ at: [0, 1], label: 'flux greatest: coil faces B' }, { at: [90, 1], label: 'emf greatest: plane along B' }, { at: [180, -1], label: 'flux greatest the other way' }],
  },
  'Flux through a generator coil and the emf induced in it against the angle turned: the flux follows a cosine curve and the emf a sine curve, so the emf is greatest when the flux is zero and zero when the flux is greatest',
  'e = −dΦ/dt: the emf is largest where the flux changes fastest.',
);
export const energyPlot = plot(
  {
    x: { min: 0, max: 1, label: 'time (fraction of a period T)' },
    y: { min: 0, max: 1.2, label: 'energy (fraction of the total)' },
    functions: [
      { expr: '(cos(2*pi*x))^2', label: 'energy in C (electric)' },
      { expr: '(sin(2*pi*x))^2', label: 'energy in L (magnetic)' },
    ],
    hlines: [{ y: 1, label: 'total (no resistance)', dashed: true }],
    points: [{ at: [0, 1], label: 't = 0: all in C' }, { at: [0.25, 1], label: 't = T/4: all in L' }, { at: [0.5, 1], label: 't = T/2: all in C again' }],
  },
  'Energy stored in the capacitor and in the inductor of an ideal LC circuit over one period: the two shares swap back and forth twice each period while their total stays constant',
  'Qualitative picture: energy shuttles between C and L.',
);
const ex1Table = table(
  ['Quantity', 'Value'],
  [
    ['Peak voltage $V_0 = \\sqrt2\\,V_\\text{rms}$', `$\\approx ${dec(ex1.V0, 3)}$ V`],
    ['rms current $P/V_\\text{rms}$', `$\\approx ${dec(ex1.Irms, 3)}$ A`],
    ['Peak current $\\sqrt2\\,I_\\text{rms}$', `$\\approx ${dec(ex1.I0, 3)}$ A`],
    ['Half-cycle mean current $2I_0/\\pi$', `$\\approx ${dec(ex1.Imean, 3)}$ A`],
    ['Period $1/f$', '20 ms'],
  ],
  'Table of worked example 1 for a 1.2 kilowatt kettle on 230 volt, 50 hertz mains: peak voltage about 325 volts, rms current about 5.22 amperes, peak current about 7.38 amperes, half-cycle mean current about 4.70 amperes, period 20 milliseconds',
);
const caseTable = table(
  ['Circuit', 'Impedance Z', 'tan φ', 'Current'],
  [
    ['R and L in series', '$\\sqrt{R^2 + \\omega^2L^2}$', '$\\omega L/R$', 'lags, 0° to 90°'],
    ['R and C in series', '$\\sqrt{R^2 + \\dfrac{1}{\\omega^2C^2}}$', '$\\dfrac{1}{\\omega CR}$', 'leads, 0° to 90°'],
    ['L, C and R in series', '$\\sqrt{R^2 + (X_L - X_C)^2}$', '$\\dfrac{X_L - X_C}{R}$', 'lags if $X_L > X_C$, leads if $X_C > X_L$'],
  ],
  'Table of the impedance, phase angle and phase of the current for RL, RC and LCR series circuits',
);
export const pfTable = table(
  ['Load', 'Phase angle φ', 'Power factor cos φ', 'Average power'],
  [
    ['Pure resistor', '0', '1', '$V_\\text{rms}I_\\text{rms}$'],
    ['Pure inductor or pure capacitor', '90°', '0', 'zero (wattless)'],
    ['Series LCR', '$\\tan^{-1}\\dfrac{X_L - X_C}{R}$', '$R/Z$', '$I_\\text{rms}^2R$'],
    ['Series LCR at resonance', '0', '1', '$V_\\text{rms}^2/R$'],
  ],
  'Table of the phase angle, power factor and average power for a pure resistor, a pure inductor or capacitor, a general series LCR circuit and an LCR circuit at resonance',
);
export const acdcTable = table(
  ['', 'Alternating current (AC)', 'Direct current (DC)'],
  [
    ['Direction and size', 'reverses periodically; size varies', 'one direction; usually steady'],
    ['Frequency', '50 Hz in India', 'zero'],
    ['Change of voltage', 'easily stepped up or down by transformers', 'needs electronic converters'],
    ['Sources', 'AC generators, inverters', 'cells, batteries, solar cells, DC dynamos'],
    ['Needed for', 'transmission over long distances, motors, heaters', 'charging batteries, electroplating, electronics'],
    ['Measured by', 'hot-wire or moving-iron meters (rms)', 'moving-coil meters'],
  ],
  'Table comparing alternating and direct current by direction, frequency, ease of changing the voltage, sources, typical uses and the meters that measure them',
);

export const deck1 = deck({
  part: 1,
  title: 'Alternating Current — Part 1: AC values, reactance and the series LCR circuit',
  goals: [
    'Describe a sinusoidal AC by its peak, period, frequency and phase, and derive its half-cycle mean and rms values',
    'Find the phase and the reactance for a pure resistor, inductor and capacitor, and read reactance–frequency graphs',
    'Use phasors to find the impedance, current and phase angle of RL, RC and series LCR circuits',
  ],
  slides: [
    sl('title', 'Alternating Current', {
      b: 'Part 1 — how an alternating current is described and measured, and how resistors, coils and capacitors share an AC supply.',
      v: V.wave,
      n: 'The current from a wall socket in India reverses its direction a hundred times every second. In this part we learn to describe such an alternating current by its peak, frequency and phase, find its mean and root mean square values, and see how resistors, coils and capacitors behave on an alternating supply, alone and joined in series.',
    }),
    sl('diagram', 'Sinusoidal AC: period, frequency and phase', {
      b: r`A sinusoidal current is written
$$i = I_0\sin(\omega t + \phi_0), \qquad \omega = 2\pi f = \dfrac{2\pi}{T}$$
$I_0$ is the **peak value**, $T$ the **period**, $f$ the **frequency** and $(\omega t + \phi_0)$ the **phase**.`,
      ul: ['A **phasor** is a vector of length $I_0$ turning anticlockwise at $\\omega$; its projection on a fixed line gives the instantaneous value.', 'Two quantities of the same frequency differ in phase by a fixed angle $\\phi$; the one whose phasor is ahead **leads**.', 'Indian mains: 230 V (rms), $f = 50$ Hz, so $T = 20$ ms and $\\omega \\approx 314$ rad s$^{-1}$.'],
      v: V.phase,
      n: 'A sinusoidal current swings between plus and minus its peak value. One full swing takes the period T, and the frequency f is the number of swings each second. A neat way to picture it is a phasor: an arrow of length equal to the peak, turning anticlockwise. Its height at any instant is the value of the current. Two such arrows at a fixed angle show a phase difference.',
    }),
    sl('concept', 'Mean value over a half cycle', {
      b: r`Over a **full** cycle the positive and negative halves cancel, so the mean current is zero. The useful mean is over a **half** cycle:
$$\bar I = \dfrac{1}{T/2}\int_0^{T/2} I_0\sin\omega t\,dt = \dfrac{2I_0}{\omega T}\Big[-\cos\omega t\Big]_0^{T/2} = \dfrac{2I_0}{\pi}$$`,
      ul: ['$\\bar I = 2I_0/\\pi \\approx 0.637\\,I_0$; likewise $\\bar V = 2V_0/\\pi$.', 'It gives the charge carried in one half cycle, $\\bar I \\times T/2$: the shaded area under the curve.'],
      v: V.wave,
      n: 'If we average an alternating current over a whole cycle, the forward and backward halves cancel and we always get zero, which tells us nothing. So the mean value is taken over one half cycle. Integrating the sine curve over half a period gives two I nought over pi, about nought point six three seven of the peak. The shaded area equals this mean times half the period.',
    }),
    sl('diagram', 'The root-mean-square (rms) value', {
      b: r`The **rms value** is the steady current that gives the same heating in a resistor as the AC. Heating depends on $i^2$:
$$\overline{i^2} = \dfrac{1}{T}\int_0^T I_0^2\sin^2\omega t\,dt = \dfrac{I_0^2}{T}\int_0^T \dfrac{1 - \cos 2\omega t}{2}\,dt = \dfrac{I_0^2}{2}$$
$$I_\text{rms} = \sqrt{\overline{i^2}} = \dfrac{I_0}{\sqrt2} \approx 0.707\,I_0, \qquad V_\text{rms} = \dfrac{V_0}{\sqrt2}$$`,
      ul: ['AC meters (hot-wire, moving-iron) read **rms** values; "230 V mains" means $V_\\text{rms} = 230$ V, so $V_0 \\approx 325$ V.', 'The factor $1/\\sqrt2$ holds only for **sinusoidal** waves.'],
      v: sqPlot,
      n: 'Heating depends on the square of the current, and the square is never negative. Over a cycle, sine squared averages exactly one half, so the mean of i squared is I nought squared over two. The root of that mean is the rms value, I nought over root two. When we say the mains is two hundred and thirty volts, we mean its rms value; its peak is about three hundred and twenty five volts.',
    }),
    sl('example', 'Worked example 1: an electric kettle', {
      b: r`A kettle rated 1.2 kW works on 230 V, 50 Hz mains. Find the peak voltage, the rms and peak currents, the mean current over a half cycle, and the period.`,
      ul: [
        r`$V_0 = \sqrt2 \times 230 \approx ${dec(ex1.V0, 3)}$ V; $I_\text{rms} = \dfrac{P}{V_\text{rms}} = \dfrac{1200}{230} \approx ${dec(ex1.Irms, 3)}$ A.`,
        r`$I_0 = \sqrt2 \times ${dec(ex1.Irms, 3)} \approx ${dec(ex1.I0, 3)}$ A; $\bar I = \dfrac{2I_0}{\pi} = \dfrac{2 \times ${dec(ex1.I0, 3)}}{\pi} \approx ${dec(ex1.Imean, 3)}$ A.`,
        r`$T = \dfrac{1}{f} = \dfrac{1}{50} = 0.020$ s $= 20$ ms. (The rating uses rms values: $P = V_\text{rms}I_\text{rms}$.)`,
      ],
      v: ex1Table,
      n: 'The peak voltage is root two times two hundred and thirty, about three hundred and twenty five volts. The rms current is the power over the rms voltage, twelve hundred over two hundred and thirty, about five point two two amperes, so the peak current is about seven point three eight amperes. The half cycle mean is two over pi of that, about four point seven amperes, and the period is twenty milliseconds.',
    }),
    sl('check', 'Quick check: two signals on an oscilloscope', {
      b: 'Choose the correct option.',
      v: V.phase,
      chk: 'phase-mcq',
      n: 'A cosine is a sine shifted ahead by a quarter of a cycle. Work out the period first.',
    }),
    sl('diagram', 'AC through R, L and C alone', {
      b: 'Connect each element alone to $v = V_0\\sin\\omega t$:',
      ul: ['**Resistor:** $i = \\dfrac{V_0}{R}\\sin\\omega t$, **in phase** with $v$.', '**Inductor:** current **lags** $v$ by 90°; opposition $X_L = \\omega L$.', '**Capacitor:** current **leads** $v$ by 90°; opposition $X_C = \\dfrac{1}{\\omega C}$.', 'Reactances are measured in ohms: $I_\\text{rms} = V_\\text{rms}/X$. Unlike $R$, they depend on frequency.'],
      v: V.elements,
      n: 'Put each element on its own across an alternating supply. In a resistor the current rises and falls exactly in step with the voltage. In a coil the current trails a quarter of a cycle behind. In a capacitor it runs a quarter of a cycle ahead. The coil and the capacitor oppose the current with reactances, measured in ohms, which change with frequency.',
    }),
    sl('diagram', 'Pure inductor: the current lags by 90°', {
      b: r`The applied voltage balances the back emf: $V_0\sin\omega t = L\dfrac{di}{dt}$. Integrating,
$$i = -\dfrac{V_0}{\omega L}\cos\omega t = I_0\sin\left(\omega t - \dfrac{\pi}{2}\right), \qquad I_0 = \dfrac{V_0}{\omega L}$$
So $i$ **lags** $v$ by $\pi/2$, and the **inductive reactance** is $X_L = \omega L = 2\pi fL$.`,
      ul: ['$X_L \\propto f$: a coil passes low frequencies easily and **chokes** high ones; for steady DC, $X_L = 0$.'],
      v: lagPlot,
      n: 'In a pure coil, the supply voltage must at every instant equal L times the rate of change of current. Integrating a sine gives a negative cosine, so the current is a sine wave shifted back by a quarter of a cycle: it lags the voltage by ninety degrees. Its peak is V nought over omega L, so the inductive reactance is omega L, which grows in proportion to the frequency.',
    }),
    sl('diagram', 'Pure capacitor: the current leads by 90°', {
      b: r`The charge follows the voltage, $q = Cv = CV_0\sin\omega t$, so
$$i = \dfrac{dq}{dt} = \omega CV_0\cos\omega t = I_0\sin\left(\omega t + \dfrac{\pi}{2}\right), \qquad I_0 = \dfrac{V_0}{1/\omega C}$$
So $i$ **leads** $v$ by $\pi/2$, and the **capacitive reactance** is $X_C = \dfrac{1}{\omega C} = \dfrac{1}{2\pi fC}$.`,
      ul: ['$X_C \\propto 1/f$: a capacitor passes high frequencies easily; for DC ($f = 0$) $X_C$ is infinite, so it **blocks** a steady current.'],
      v: leadPlot,
      n: 'For a capacitor, the charge on the plates follows the voltage. The current is the rate of change of that charge, and the rate of change of a sine is a cosine, so the current reaches its peak a quarter of a cycle before the voltage: it leads by ninety degrees. Its size is omega C times the voltage, so the capacitive reactance is one over omega C, which falls as the frequency rises.',
    }),
    sl('diagram', 'Reactance against frequency', {
      b: 'For the coil and the capacitor of worked example 2:',
      ul: ['$X_L = 2\\pi fL$: a **straight line through the origin**.', '$X_C = 1/(2\\pi fC)$: a curve falling as $1/f$ (a **rectangular hyperbola**), very large at low $f$.', 'At high frequency a coil behaves almost like a break in the circuit, a capacitor almost like a plain wire; at low frequency the reverse.'],
      v: xfPlot,
      n: 'Plot both reactances against frequency. The coil gives a straight line through the origin: double the frequency and you double its opposition. The capacitor gives a curve that falls as one over f: huge at low frequency, small at high frequency. So at high frequencies a coil nearly stops the current while a capacitor lets it through, and at low frequencies it is the other way round.',
    }),
    sl('example', 'Worked example 2: a coil and a capacitor on the mains', {
      b: r`A coil of inductance 0.35 H and a 15 μF capacitor (both ideal) are connected in turn to 230 V, 50 Hz mains. Find the reactance of each and the rms current it draws. What are the reactances at 200 Hz?`,
      ul: [
        r`$X_L = 2\pi \times 50 \times 0.35 \approx ${dec(ex2.XL, 4)}$ Ω, so $I = \dfrac{230}{${dec(ex2.XL, 4)}} \approx ${dec(ex2.IL, 3)}$ A (lagging by 90°).`,
        r`$X_C = \dfrac{1}{2\pi \times 50 \times 15 \times 10^{-6}} \approx ${dec(ex2.XC, 4)}$ Ω, so $I = \dfrac{230}{${dec(ex2.XC, 4)}} \approx ${dec(ex2.IC, 3)}$ A (leading by 90°).`,
        r`At 200 Hz (four times the frequency): $X_L \approx ${dec(ex2.XL200, 3)}$ Ω and $X_C \approx ${dec(ex2.XC200, 3)}$ Ω.`,
      ],
      v: xfPlot,
      n: 'At fifty hertz the coil’s reactance is two pi times fifty times nought point three five, about a hundred and ten ohms, so it draws about two point one amperes. The capacitor’s reactance is about two hundred and twelve ohms, so it draws about one point one amperes. At four times the frequency the coil’s reactance is four times larger, about four hundred and forty ohms, and the capacitor’s is a quarter, about fifty three ohms.',
    }),
    sl('check', 'Quick check: raising the frequency', {
      b: 'Choose the correct option.',
      v: xfPlot,
      chk: 'Xfreq-mcq',
      n: 'Capacitive reactance is inversely proportional to frequency.',
    }),
    sl('diagram', 'The series LCR circuit', {
      b: 'R, L and C in series carry the **same current** $i = I_0\\sin\\omega t$. Take $I$ as the reference phasor:',
      ul: ['$V_R = IR$ is **in phase** with $I$; $V_L = IX_L$ **leads** $I$ by 90°; $V_C = IX_C$ **lags** $I$ by 90°.', 'The voltmeter readings $V_R$, $V_L$, $V_C$ do **not** add up to the supply voltage: they must be added **as phasors**.'],
      v: V.lcr,
      n: 'Now join a resistor, a coil and a capacitor in series. The same current flows through all three, so we take it as the reference. The voltage across the resistor is in step with the current, the voltage across the coil is a quarter cycle ahead, and the voltage across the capacitor is a quarter cycle behind. That is why the three voltmeter readings add up to more than the supply voltage.',
    }),
    sl('diagram', 'Impedance and phase angle by phasors', {
      b: r`$V_L$ and $V_C$ point in opposite directions, so they combine to $V_L - V_C$, at right angles to $V_R$. The supply voltage is the resultant:
$$V^2 = V_R^2 + (V_L - V_C)^2 = I^2\left[R^2 + (X_L - X_C)^2\right]$$
$$Z = \dfrac{V}{I} = \sqrt{R^2 + (X_L - X_C)^2}, \qquad \tan\phi = \dfrac{X_L - X_C}{R}$$`,
      ul: ['$X_L > X_C$: **inductive**, current lags $V$ by $\\phi$. $X_C > X_L$: **capacitive**, current leads. $Z$ is the **impedance** (ohm).'],
      v: V.lcrPhasor,
      n: 'On the phasor diagram the coil’s voltage points up and the capacitor’s points down, so they partly cancel, leaving V L minus V C at right angles to the resistor’s voltage. Pythagoras then gives the supply voltage, and dividing by the current gives the impedance: root of R squared plus the square of the net reactance. The angle between the supply voltage and the current is the phase angle phi.',
    }),
    sl('example', 'Worked example 3: voltages that add to more than the supply', {
      b: r`A series circuit has $R = 48$ Ω, $X_L = 70$ Ω and $X_C = 50$ Ω and is connected to a 130 V rms supply. Find Z, the current, the voltage across each element and the phase angle.`,
      ul: [
        r`$Z = \sqrt{48^2 + (70 - 50)^2} = \sqrt{2304 + 400} = 52$ Ω; $I = \dfrac{130}{52} = 2.5$ A.`,
        r`$V_R = 2.5 \times 48 = 120$ V, $V_L = 2.5 \times 70 = 175$ V, $V_C = 2.5 \times 50 = 125$ V. Check: $\sqrt{120^2 + 50^2} = 130$ V.`,
        r`$\tan\phi = \dfrac{20}{48}$, so $\phi \approx ${dec(ex3.phi, 3)}^\circ$; the circuit is inductive and the current **lags**. Note $V_L = 175$ V exceeds the supply voltage.`,
      ],
      v: V.triangle,
      n: 'The net reactance is twenty ohms, so the impedance is the root of forty eight squared plus twenty squared, exactly fifty two ohms, and the current is two point five amperes. The voltages are one hundred and twenty, one hundred and seventy five and one hundred and twenty five volts. Added as phasors they give one hundred and thirty volts. The phase angle is about twenty two point six degrees, with the current lagging.',
    }),
    sl('two-column', 'Special cases: RL and RC circuits', {
      b: 'Drop one element from the series circuit:',
      cols: ['**R and L in series**\n- $Z = \\sqrt{R^2 + \\omega^2L^2}$\n- $\\tan\\phi = \\omega L/R$\n- current **lags** the voltage by an angle between 0° and 90°\n- e.g. a real coil, which has some resistance', '**R and C in series**\n- $Z = \\sqrt{R^2 + 1/\\omega^2C^2}$\n- $\\tan\\phi = 1/\\omega CR$\n- current **leads** the voltage by an angle between 0° and 90°\n- the phasor $V_C$ points down, so $V$ lies below $V_R$'],
      v: caseTable,
      n: 'Two special cases are common. A resistor with a coil, which is just what a real coil is, has impedance root of R squared plus omega L squared, and the current lags by an angle whose tangent is omega L over R. A resistor with a capacitor has impedance root of R squared plus one over omega C all squared, and the current leads by an angle whose tangent is one over omega C R.',
    }),
    sl('diagram', 'Impedance and current against frequency', {
      b: 'For a fixed L, C and R, sweep the supply frequency:',
      ul: ['Low $f$: $X_C$ is large, so $Z$ is large and the circuit is **capacitive**.', 'At one frequency $f_0$, $X_L = X_C$: $Z$ is **least**, equal to $R$, and the current $I = V/Z$ is **greatest**.', 'High $f$: $X_L$ is large, so $Z$ rises again and the circuit is **inductive**. (More on $f_0$ in Part 2.)'],
      v: zPlot,
      n: 'If we sweep the frequency of the supply, the impedance changes. At low frequencies the capacitor’s reactance dominates and the impedance is large. At high frequencies the coil’s reactance dominates. In between there is one frequency where the two reactances are equal and cancel: there the impedance falls to just R, and the current, V over Z, rises to its largest value.',
    }),
    sl('check', 'Quick check: an RC circuit', {
      b: 'Choose the correct option.',
      v: V.lcrPhasor,
      chk: 'RC-mcq',
      n: 'Add the two voltages as phasors at right angles, and decide whether the circuit is capacitive or inductive.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Sinusoidal AC', '$i = I_0\\sin(\\omega t + \\phi_0)$, $\\omega = 2\\pi f = 2\\pi/T$'],
          ['Half-cycle mean; rms', '$\\bar I = 2I_0/\\pi \\approx 0.637\\,I_0$; $I_\\text{rms} = I_0/\\sqrt2 \\approx 0.707\\,I_0$'],
          ['Pure R, L, C', 'in phase; lags 90°, $X_L = \\omega L$; leads 90°, $X_C = 1/\\omega C$'],
          ['Series LCR', '$Z = \\sqrt{R^2 + (X_L - X_C)^2}$, $\\tan\\phi = (X_L - X_C)/R$'],
          ['Graphs against f', '$X_L \\propto f$; $X_C \\propto 1/f$; $Z$ least ($= R$) where $X_L = X_C$'],
        ],
        'Summary table of sinusoidal AC, the mean and rms values, the behaviour of R, L and C, the impedance of a series LCR circuit and the graphs against frequency',
      ),
      n: 'To sum up: an alternating current is described by its peak, frequency and phase. Its half cycle mean is two over pi of the peak and its rms value one over root two of the peak. Current is in phase with the voltage in a resistor, lags in a coil and leads in a capacitor. In a series circuit the voltages add as phasors, giving the impedance and the phase angle.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'Mains and meter values are rms; multiply by √2 for the peak.',
        'Write reactances with 2πf, and convert mH and μF to H and F first.',
        'In a series circuit, never add V_R, V_L and V_C arithmetically; use the phasor diagram.',
        'State whether the current leads or lags, with the angle.',
      ],
      v: table(['Asked', 'Key point'], [['Peak of 230 V mains?', 'about 325 V'], ['Current in a capacitor?', 'leads by 90°'], ['X_L = X_C?', 'Z = R, current greatest']], 'Table of common questions and the key point for each'),
      n: 'Remember that mains and meter readings are rms values: multiply by root two to get the peak. Write reactances with two pi f, after converting millihenry and microfarad to henry and farad. In a series circuit never add the voltages across the elements directly; use the phasor diagram. And always say whether the current leads or lags, and by what angle.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Alternating Current — Part 2: Power, resonance and the AC generator',
  goals: [
    'Derive and use the average power V_rms I_rms cos φ, the power factor R/Z and the idea of wattless current, and explain the choke coil',
    'Find the resonant frequency, bandwidth and Q factor of a series LCR circuit, and describe LC oscillations qualitatively',
    'Explain the construction and working of the AC generator, derive its sinusoidal emf, and compare AC with DC',
  ],
  slides: [
    sl('title', 'AC Power, Resonance and the Generator', {
      b: 'Part 2 — how much power an AC circuit really takes, how a circuit can pick out one frequency, and where alternating current comes from.',
      v: V.gen,
      n: 'In this part we ask how much power an alternating current circuit actually uses, and why some current does no work at all. We see how a choke controls a current without wasting energy, how a series circuit responds strongly at one frequency, how energy swings to and fro in a coil and capacitor, and finally how a generator produces the alternating emf in the first place.',
    }),
    sl('diagram', 'Average power in an AC circuit', {
      b: r`With $v = V_0\sin\omega t$ and $i = I_0\sin(\omega t - \phi)$, the instantaneous power is
$$p = vi = V_0I_0\sin\omega t\sin(\omega t - \phi) = \dfrac{V_0I_0}{2}\left[\cos\phi - \cos(2\omega t - \phi)\right]$$
The second term averages to zero over a cycle, so
$$P = \dfrac{V_0I_0}{2}\cos\phi = V_\text{rms}I_\text{rms}\cos\phi$$`,
      ul: ['$V_\\text{rms}I_\\text{rms}$ is the **apparent power** (volt-ampere, VA); $P$ is the true (average) power, in watts.'],
      v: powerPlot,
      n: 'The power at any instant is the voltage times the current. Using a product to sum formula, it splits into a steady part, half V nought I nought cos phi, and a part that oscillates at twice the supply frequency. The oscillating part averages to zero over a cycle, so the average power is V rms times I rms times cos phi. The product of the rms values alone is called the apparent power.',
    }),
    sl('concept', 'Power factor', {
      b: r`The factor $\cos\phi$ is the **power factor**. For a series LCR circuit
$$\cos\phi = \dfrac{R}{Z} = \dfrac{P}{V_\text{rms}I_\text{rms}}, \qquad P = I_\text{rms}^2R$$`,
      ul: ['Pure resistor: $\\cos\\phi = 1$. Pure inductor or capacitor: $\\cos\\phi = 0$, so **no average power**: energy taken in one quarter cycle is returned in the next.', 'Only the resistance turns electrical energy into heat or work.'],
      v: pfTable,
      n: 'Cos phi is called the power factor. For a series circuit it equals R over Z, so the average power is just the rms current squared times the resistance. A pure resistor has a power factor of one. A pure coil or capacitor has a power factor of zero: it stores energy for a quarter cycle and hands it back in the next, so over a whole cycle it takes no power.',
    }),
    sl('diagram', 'Active and wattless current', {
      b: r`Resolve the current phasor along and across the voltage:`,
      ul: ['$I\\cos\\phi$, **in phase** with $V$: the **active** component, which carries all the power $P = V(I\\cos\\phi)$.', '$I\\sin\\phi$, **in quadrature** (90°) with $V$: the **wattless current**, which does no work over a cycle.', 'A wattless current still flows in the cables and heats them ($I^2R$ losses), so supply companies want a power factor close to 1.'],
      v: V.wattless,
      n: 'Split the current phasor into two parts. The part along the voltage, I cos phi, is the active current: it alone delivers power. The part at right angles, I sin phi, is ninety degrees out of step with the voltage, and over a cycle it delivers nothing, so it is called wattless current. It still flows through the cables and heats them, which is why a low power factor is unwelcome.',
    }),
    sl('example', 'Worked example 4: a pump motor', {
      b: r`A water-pump motor draws 4.0 A (rms) from 230 V mains at a power factor of 0.80, lagging. Find the apparent power, the average power, the phase angle, and the active and wattless components of the current.`,
      ul: [
        r`Apparent power $= 230 \times 4.0 = 920$ VA; $P = 920 \times 0.80 = ${dec(ex4.P, 3)}$ W.`,
        r`$\phi = \cos^{-1} 0.80 \approx ${dec(ex4.phi, 3)}^\circ$, so $\sin\phi = 0.60$.`,
        r`Active current $= 4.0 \times 0.80 = 3.2$ A; wattless current $= 4.0 \times 0.60 = 2.4$ A. Check: $\sqrt{3.2^2 + 2.4^2} = 4.0$ A.`,
      ],
      v: V.wattless,
      n: 'The apparent power is two hundred and thirty times four, nine hundred and twenty volt amperes. Multiplying by the power factor, nought point eight, gives the true power, seven hundred and thirty six watts. The phase angle is about thirty seven degrees. The active current is three point two amperes and the wattless current two point four amperes; together, at right angles, they make up the four amperes drawn.',
    }),
    sl('check', 'Quick check: which load takes power?', {
      b: 'Choose the correct option.',
      v: pfTable,
      chk: 'pmax-mcq',
      n: 'Only resistance takes average power. Compare the current through the resistance in each case.',
    }),
    sl('diagram', 'The choke coil', {
      b: 'A **choke** is a coil of large inductance and very small resistance, wound on a laminated iron core. In series with a load it reduces an alternating current:',
      ul: ['Its power factor $R/Z$ is almost zero, so it takes **almost no power**; the current through it is nearly all wattless.', 'A resistor would reduce the current equally well but turn the extra energy into **heat**.', 'Used in the fittings of fluorescent tubes and in arc lamps; it cannot control DC, for which $X_L = 0$.'],
      v: V.choke,
      n: 'To bring an alternating current down, we could add a resistor, but the resistor would get hot, wasting energy. A choke does the same job with almost no loss. It is a coil with a large inductance and very little resistance, so its power factor is nearly zero and the current through it is nearly all wattless. Chokes were long used in fluorescent tube fittings.',
    }),
    sl('example', 'Worked example 5: running a lamp from the mains', {
      b: r`A lamp needs 4.0 A at 100 V. It is to be run from 230 V, 50 Hz mains. Find (a) the series resistance needed and the power it wastes, (b) the inductance of a pure choke that would do instead.`,
      ul: [
        r`(a) The resistor drops $230 - 100 = 130$ V: $R = \dfrac{130}{4.0} = 32.5$ Ω, wasting $4.0^2 \times 32.5 = 520$ W.`,
        r`(b) Lamp resistance $\dfrac{100}{4.0} = 25$ Ω; total $Z = \dfrac{230}{4.0} = 57.5$ Ω. $X_L = \sqrt{57.5^2 - 25^2} \approx ${dec(ex5.XL, 4)}$ Ω.`,
        r`$L = \dfrac{X_L}{2\pi f} = \dfrac{${dec(ex5.XL, 4)}}{2\pi \times 50} \approx ${dec(ex5.L, 3)}$ H. The choke wastes almost nothing; its voltage, about ${dec(ex5.VL, 3)} V, is at 90° to the lamp’s.`,
      ],
      v: V.choke,
      n: 'A series resistor must drop one hundred and thirty volts at four amperes, so it needs thirty two and a half ohms, and it turns five hundred and twenty watts into heat. With a choke, the lamp’s twenty five ohms and the choke’s reactance must give an impedance of fifty seven and a half ohms, so the reactance is about fifty one point eight ohms and the inductance about nought point one six five henry.',
    }),
    sl('diagram', 'Electrical resonance', {
      b: r`The current in a series LCR circuit is greatest when $X_L = X_C$, i.e. $\omega L = \dfrac{1}{\omega C}$:
$$\omega_0 = \dfrac{1}{\sqrt{LC}}, \qquad f_0 = \dfrac{1}{2\pi\sqrt{LC}}$$`,
      ul: ['At resonance $Z = R$ (least), $I_0 = V/R$ (greatest), $\\phi = 0$ and the power factor is 1.', '$V_L$ and $V_C$ are equal and opposite; each can be **many times** the supply voltage.', '$f_0$ does not depend on $R$; $R$ decides the height and sharpness of the peak.'],
      v: iPlot,
      n: 'At one particular frequency the coil’s reactance exactly equals the capacitor’s, and they cancel. This is resonance. The impedance falls to R, the current is as large as it can be, and the current is in phase with the supply. The resonant frequency is one over two pi root L C, whatever the resistance. A smaller resistance gives a taller, sharper peak.',
    }),
    sl('concept', 'Bandwidth and Q factor', {
      b: r`The **half-power frequencies** $f_1$ and $f_2$ are where $I = I_0/\sqrt2$ (power half its peak). For a series LCR circuit (formulae only; derivations are not required):
$$\Delta\omega = \omega_2 - \omega_1 = \dfrac{R}{L}, \qquad Q = \dfrac{\omega_0}{\Delta\omega} = \dfrac{\omega_0L}{R} = \dfrac{1}{R}\sqrt{\dfrac{L}{C}}$$`,
      ul: ['$\\Delta f = f_2 - f_1 = \\dfrac{R}{2\\pi L}$ is the **bandwidth**; the **quality factor** $Q$ measures the sharpness of the resonance.', 'At resonance $V_L = V_C = QV$: $Q$ is also the voltage magnification.', 'A radio tuner needs a large $Q$ (small $R$) to pick out one station.'],
      v: iPlot,
      n: 'How sharp is the peak? Find the two frequencies where the current has fallen to one over root two of its peak, so the power has halved. The gap between them is the bandwidth: R over L in angular frequency, or R over two pi L in hertz. The quality factor Q is the resonant frequency divided by the bandwidth. A small resistance means a narrow band and a large Q.',
    }),
    sl('example', 'Worked example 6: a resonant circuit', {
      b: r`A series circuit has $L = 25$ mH, $C = 4.0$ μF and $R = 10$ Ω, with a 5.0 V rms variable-frequency supply. Find $f_0$, the current and $V_L$ at resonance, the Q factor and the bandwidth.`,
      ul: [
        r`$\omega_0 = \dfrac{1}{\sqrt{0.025 \times 4.0 \times 10^{-6}}} \approx ${dec(ex6.w0, 4)}$ rad s$^{-1}$, $f_0 = \dfrac{\omega_0}{2\pi} \approx ${dec(ex6.f0, 3)}$ Hz.`,
        r`$I_0 = \dfrac{V}{R} = \dfrac{5.0}{10} = 0.50$ A; $X_L = \omega_0L \approx ${dec(ex6.XL, 3)}$ Ω, so $V_L = V_C \approx ${dec(ex6.VL, 3)}$ V, about eight times the supply.`,
        r`$Q = \dfrac{\omega_0L}{R} \approx ${dec(ex6.Q, 3)}$; $\Delta f = \dfrac{R}{2\pi L} = \dfrac{10}{2\pi \times 0.025} \approx ${dec(ex6.df, 3)}$ Hz.`,
      ],
      v: iPlot,
      n: 'The resonant angular frequency is one over the root of L C, about three thousand one hundred and sixty radians per second, so the resonant frequency is about five hundred and three hertz. The current is five volts over ten ohms, half an ampere. The coil’s reactance there is about seventy nine ohms, so nearly forty volts appears across it. Q is about seven point nine and the bandwidth about sixty four hertz.',
    }),
    sl('check', 'Quick check: changing L and C', {
      b: 'Choose the correct option.',
      v: iPlot,
      chk: 'LhalfC-mcq',
      n: 'Look at the product L C for the resonant frequency, and at the ratio L over C for Q.',
    }),
    sl('diagram', 'LC oscillations (qualitative)', {
      b: 'Charge a capacitor and connect it across a coil (no resistance):',
      ul: ['The capacitor discharges through the coil; its **electric** energy becomes **magnetic** energy in the coil.', 'The coil keeps the current going, charging the capacitor the other way; then the process reverses.', 'Energy shuttles between C and L at the natural frequency $\\dfrac{1}{2\\pi\\sqrt{LC}}$, like a mass on a spring. Resistance turns some energy into heat each cycle, so real oscillations **die away**.'],
      v: V.lc,
      n: 'Charge a capacitor and connect it across a coil. The capacitor drives a current through the coil and its energy passes into the coil’s magnetic field. When the capacitor is empty, the coil keeps the current flowing and charges the capacitor the other way round. Then everything runs in reverse. The energy swings to and fro, like a pendulum, until resistance turns it into heat.',
    }),
    sl('diagram', 'The AC generator: principle and construction', {
      b: '**Principle:** electromagnetic induction. A coil turned in a magnetic field has a changing flux through it, so an emf is induced.',
      ul: ['**Armature:** a coil of many turns on a soft-iron core, turned by a turbine or engine.', '**Field magnet:** strong poles giving a uniform radial or uniform field.', '**Slip rings:** two rings fixed to the axle, one joined to each end of the coil; they turn with it.', '**Brushes:** carbon blocks pressing on the rings, connecting the turning coil to the external circuit.'],
      v: V.gen,
      n: 'A generator works by electromagnetic induction. A coil of many turns, the armature, is turned between the poles of a strong magnet, so the flux through it keeps changing and an emf is induced. Each end of the coil is joined to a slip ring on the axle. Carbon brushes press on the rings and carry the alternating current out to the load while the coil keeps turning.',
    }),
    sl('diagram', 'Theory: the sinusoidal emf', {
      b: r`A coil of $N$ turns and area $A$ turns at angular speed $\omega$ in a uniform field $B$. If its normal is along $B$ at $t = 0$, the angle at time $t$ is $\theta = \omega t$ and
$$\Phi = NBA\cos\omega t, \qquad e = -\dfrac{d\Phi}{dt} = NBA\omega\sin\omega t = e_0\sin\omega t$$`,
      ul: ['Peak emf $e_0 = NBA\\omega$, when the plane of the coil is **along** $B$ (flux zero but changing fastest).', '$e = 0$ when the plane is **perpendicular** to $B$ (flux greatest).', 'Frequency of the AC = number of rotations per second; the emf reverses every half turn.'],
      v: V.genTheory,
      n: 'Measure the angle between the normal to the coil and the field. It grows steadily, omega t, so the flux is N B A cos omega t. The induced emf is minus the rate of change of flux, which gives N B A omega sine omega t: a sinusoidal emf with peak N B A omega. It is greatest when the coil’s plane lies along the field, and zero when the plane faces the field.',
    }),
    sl('example', 'Worked example 7: a generator coil', {
      b: r`A rectangular coil of 150 turns, 20 cm × 12 cm, turns at 50 revolutions per second about an axis perpendicular to a uniform field of 0.30 T. Find the peak and rms emf and the frequency.`,
      ul: [
        r`$A = 0.20 \times 0.12 = 0.024$ m²; $\omega = 2\pi \times 50 \approx 314.2$ rad s$^{-1}$.`,
        r`$e_0 = NBA\omega = 150 \times 0.30 \times 0.024 \times 314.2 \approx ${dec(ex7.e0, 3)}$ V.`,
        r`$e_\text{rms} = \dfrac{e_0}{\sqrt2} \approx ${dec(ex7.erms, 3)}$ V; frequency 50 Hz (one cycle per turn).`,
      ],
      v: genPlot,
      n: 'The area of the coil is nought point nought two four square metres, and fifty turns a second means omega is about three hundred and fourteen radians per second. The peak emf, N B A omega, is about three hundred and thirty nine volts, and the rms emf about two hundred and forty volts. The output alternates fifty times a second: one cycle for every turn.',
    }),
    sl('two-column', 'AC and DC compared', {
      b: 'How the two kinds of current differ:',
      cols: ['**Alternating current**\n- Reverses direction periodically (50 Hz in India); value varies\n- Voltage easily changed by transformers, so power is sent over long distances at high voltage with small loss\n- Measured by its rms value', '**Direct current**\n- Flows in one direction, usually steady\n- Needed for charging batteries, electroplating and electronic circuits\n- Cannot be stepped up or down by a transformer\n- Measured by moving-coil meters'],
      v: acdcTable,
      n: 'Alternating current reverses direction many times a second, and its voltage is easily raised or lowered by transformers, so it can be sent long distances at high voltage with little loss. Direct current flows one way only. It cannot be transformed, but it is essential for charging batteries, for electroplating and inside electronic devices, which convert the mains to direct current.',
    }),
    sl('check', 'Quick check: flux and emf', {
      b: 'Choose the correct option.',
      v: genPlot,
      chk: 'fluxemf-mcq',
      n: 'The emf depends on how fast the flux is changing, not on how large it is.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Average power', '$P = V_\\text{rms}I_\\text{rms}\\cos\\phi = I_\\text{rms}^2R$'],
          ['Power factor; wattless current', '$\\cos\\phi = R/Z$; $I\\sin\\phi$ does no work'],
          ['Choke coil', 'large L, tiny R: controls AC with almost no loss'],
          ['Resonance', '$f_0 = \\dfrac{1}{2\\pi\\sqrt{LC}}$, $Z = R$, $\\cos\\phi = 1$'],
          ['Bandwidth, Q', '$\\Delta\\omega = R/L$, $Q = \\omega_0L/R = \\dfrac{1}{R}\\sqrt{L/C}$'],
          ['AC generator', '$e = NBA\\omega\\sin\\omega t$, $e_0 = NBA\\omega$'],
        ],
        'Summary table of average power, power factor and wattless current, the choke, resonance, bandwidth and Q, and the generator emf',
      ),
      n: 'To sum up: the average power is V rms I rms cos phi, and the power factor of a series circuit is R over Z. Wattless current does no work, which is why a choke can control a current without loss. At resonance the impedance is just R and the current is greatest; the bandwidth is R over L and Q is omega nought L over R. A generator gives N B A omega sine omega t.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Use P = V_rms I_rms cos φ or I_rms² R, never V_rms I_rms alone unless cos φ = 1.',
        'At resonance, check the voltage across L or C: it can be far larger than the supply.',
        'Quote bandwidth and Q from their formulae; their derivations are not required.',
        'In generator questions say where θ is measured from: e = 0 when the coil faces the field.',
      ],
      v: table(['Asked', 'Key point'], [['Power in a pure coil?', 'zero'], ['Current at resonance?', 'V/R'], ['Emf when flux is greatest?', 'zero']], 'Table of common questions and the key point for each'),
      n: 'Find average power from V rms I rms cos phi, or from I rms squared R; the product of the rms values alone is only the apparent power. At resonance, look at the voltage across the coil or the capacitor, which can be many times the supply. Quote the bandwidth and Q formulae without deriving them. In generator questions, say where the angle is measured from.',
    }),
  ],
});
