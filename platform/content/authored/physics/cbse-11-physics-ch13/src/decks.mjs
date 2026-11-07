// ch13 Oscillations — two decks: Part 1 (t01) periodic motion, SHM, reference circle, velocity and acceleration;
// Part 2 (t02–t03) force law, energy, the loaded spring, and the simple pendulum.
// Damped and forced oscillations and resonance were removed in the rationalisation and are not taught.
// Every number and every graph is computed here from stated data.
import { sl, deck, table, svgV, plot, r, dec, sci } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { G, PI, w, ws, R6, sciu, omegaOfT, omegaOfF, springT, pendT, vAt, energies } from './phys.mjs';
import * as GS from './svgs.mjs';

// ---------------------------------------------------------------- worked-example numbers (Part 1)
const ex1 = { beats: 72, secs: 60 };
ex1.T = ex1.secs / ex1.beats;
ex1.f = 1 / ex1.T;
ex1.om = omegaOfF(ex1.f);
const ex2 = { A: 0.12, f: 2, phiOverPi: 1 / 3 };
ex2.om = omegaOfF(ex2.f); // 4 pi
ex2.T = 1 / ex2.f;
ex2.phi = ex2.phiOverPi * PI;
ex2.x0 = ex2.A * Math.cos(ex2.phi);
ex2.v0 = -ex2.A * ex2.om * Math.sin(ex2.phi);
ex2.a0 = -(ex2.om ** 2) * ex2.x0;
const ex3 = { A: 0.2, f: 1.5 };
ex3.om = omegaOfF(ex3.f);
ex3.T = 1 / ex3.f;
ex3.t = Math.acos(0.5) / ex3.om; // from x = A to x = A/2
ex3.vmax = ex3.A * ex3.om;
const ex4 = { A: 0.08, T: 0.4, x: 0.05 };
ex4.om = omegaOfT(ex4.T);
ex4.vmax = ex4.A * ex4.om;
ex4.amax = ex4.A * ex4.om ** 2;
ex4.v = vAt(ex4.A, ex4.om, ex4.x);
ex4.a = ex4.om ** 2 * ex4.x;
const ex5 = { A: 0.06, x0: -0.03, T: 1.2 };
ex5.om = omegaOfT(ex5.T);
ex5.phi = 2 * PI - Math.acos(ex5.x0 / ex5.A); // moving towards +x: sin(phi) < 0
ex5.v0 = -ex5.A * ex5.om * Math.sin(ex5.phi);
ex5.phiDeg = (ex5.phi * 180) / PI;

// ---------------------------------------------------------------- worked-example numbers (Part 2)
const ex6 = { m: 0.5, k: 80 };
ex6.om = Math.sqrt(ex6.k / ex6.m);
ex6.T = springT(ex6.m, ex6.k);
ex6.f = 1 / ex6.T;
const ex7 = { m: 2.4, n: 25, secs: 20, T2: 1.2 };
ex7.T = ex7.secs / ex7.n;
ex7.k = (4 * PI * PI * ex7.m) / ex7.T ** 2;
ex7.m2 = (ex7.k * ex7.T2 ** 2) / (4 * PI * PI);
ex7.ratio = ex7.m2 / ex7.m;
const ex8 = { m: 0.2, k: 50, A: 0.06, x: 0.03 };
Object.assign(ex8, energies(ex8.k, ex8.A, ex8.x));
ex8.v = Math.sqrt((2 * ex8.ke) / ex8.m);
ex8.vmax = Math.sqrt((2 * ex8.total) / ex8.m);
ex8.om = Math.sqrt(ex8.k / ex8.m);
const ex9 = { A: 0.1, x: 0.06 };
ex9.xEq = ex9.A / Math.SQRT2;
ex9.peFrac = (ex9.x / ex9.A) ** 2;
ex9.keFrac = 1 - ex9.peFrac;
const ex10 = { T: 2, gM: 1.62 };
ex10.L = (G * ex10.T ** 2) / (4 * PI * PI);
ex10.TM = pendT(ex10.L, ex10.gM);
const ex11 = { T: 2, up: 0.02, day: 86400 };
ex11.T2 = ex11.T * Math.sqrt(1 + ex11.up);
ex11.lag = ex11.day * (1 - ex11.T / ex11.T2);
const sinTable = [2, 5, 10, 20, 30].map((d) => {
  const th = (d * PI) / 180;
  return { d, th, sin: Math.sin(th), err: ((th - Math.sin(th)) / Math.sin(th)) * 100 };
});

export const EX = { ex1, ex2, ex3, ex4, ex5, ex6, ex7, ex8, ex9, ex10, ex11, sinTable };

// ---------------------------------------------------------------- visuals
export const V = {
  ref: svgV(GS.REF, 'The reference circle: the foot of the perpendicular from a particle in uniform circular motion performs simple harmonic motion', 'The shadow of uniform circular motion on a diameter is SHM.'),
  spring: svgV(GS.SPRING, 'A block on a spring at minus A, at the mean position and at plus A with the restoring force arrows', 'The restoring force is always towards the mean position and proportional to the displacement.'),
  pend: svgV(GS.PEND, 'A simple pendulum with the weight resolved into a component along the string and one along the arc', 'The component mg sin θ along the arc is the restoring force.'),
  ebars: svgV(GS.EBARS, 'Bars showing the split of the total energy into kinetic and potential at five positions of an oscillating block', 'Kinetic plus potential energy stays equal to E; potential energy grows as x².'),
};
const ax = (label, min, max) => ({ label, min, max });
const A10 = 10;
export const plotX = plot(
  {
    x: ax('time t (s)', 0, 4),
    y: ax('displacement x (cm)', -12, 12),
    functions: [{ expr: `${A10}*cos(pi*x)`, label: 'x = 10 cos(π t): A = 10 cm, T = 2 s', domain: [0, 4] }],
  },
  'Displacement against time for simple harmonic motion with amplitude 10 centimetres and period 2 seconds: a cosine curve starting at its maximum, crossing zero at 0.5 seconds and reaching its minimum at 1 second',
  'A cosine curve: it repeats every period T = 2 s and never goes beyond ±A.',
);
export const plotPhase = plot(
  {
    x: ax('time t (s)', 0, 4),
    y: ax('displacement x (cm)', -12, 12),
    functions: [
      { expr: `${A10}*cos(pi*x)`, label: 'φ = 0', domain: [0, 4] },
      { expr: `${A10}*cos(pi*x+pi/3)`, label: 'φ = π/3', domain: [0, 4] },
    ],
  },
  'Two cosine curves of equal amplitude and period: one with phase constant zero and one with phase constant pi over 3, which is shifted to the left by one sixth of the period',
  'A positive φ shifts the curve to earlier times by φ/ω.',
);
const TWO_PI = R6(2 * PI);
export const plotKin = plot(
  {
    x: ax('phase ωt (rad)', 0, TWO_PI),
    y: ax('x / A, v / (Aω), a / (Aω²)', -1.2, 1.2),
    functions: [
      { expr: 'cos(x)', label: 'x / A', domain: [0, TWO_PI] },
      { expr: '-sin(x)', label: 'v / (Aω)', domain: [0, TWO_PI] },
      { expr: '-cos(x)', label: 'a / (Aω²)', domain: [0, TWO_PI] },
    ],
  },
  'Displacement, velocity and acceleration of simple harmonic motion for one period, in units of A, A omega and A omega squared: displacement is a cosine, velocity is minus sine and reaches its extreme where the displacement is zero, and acceleration is the mirror image of the displacement',
  'Velocity is a quarter period ahead of displacement; acceleration is opposite to displacement.',
);
export const plotTspring = plot(
  {
    x: ax('mass m (kg)', 0, 2),
    y: ax('time period T (s)', 0, 2.2),
    functions: [20, 80].map((k) => ({ expr: `2*pi*sqrt(x/${k})`, label: `k = ${k} N/m`, domain: [0, 2] })),
  },
  'Time period of a block on a spring against its mass for two spring constants, 20 and 80 newtons per metre: square-root curves, the stiffer spring giving a period half as long at every mass',
  'T grows as √m; a spring four times stiffer halves T.',
);
export const plotEx = plot(
  {
    x: ax('displacement x (m)', -0.06, 0.06),
    y: ax('energy (J)', 0, 0.1),
    functions: [
      { expr: `${R6(0.5 * ex8.k)}*x^2`, label: 'potential ½ k x²', domain: [-0.06, 0.06] },
      { expr: `${R6(0.5 * ex8.k)}*(${ex8.A}^2-x^2)`, label: 'kinetic ½ k (A² − x²)', domain: [-0.06, 0.06] },
    ],
    hlines: [{ y: R6(ex8.total), label: `E = ${dec(ex8.total, 3)} J` }],
  },
  'Energy against displacement for a 50 newton per metre spring with amplitude 0.060 metre: the potential energy is an upward parabola, the kinetic energy a downward parabola, and they add up to the constant 0.090 joule',
  'Potential energy is a parabola in x; kinetic energy is the opposite parabola; the sum is flat.',
);
export const plotEt = plot(
  {
    x: ax('time in periods, t / T', 0, 2),
    y: ax('energy in units of E', 0, 1.1),
    functions: [
      { expr: '(sin(2*pi*x))^2', label: 'KE / E', domain: [0, 2] },
      { expr: '(cos(2*pi*x))^2', label: 'PE / E', domain: [0, 2] },
    ],
    hlines: [{ y: 1, label: 'E' }],
  },
  'Kinetic and potential energy against time over two periods for a body released from the extreme position: they swap with each other, each completing two cycles per period of the motion, and always add to the total E',
  'KE and PE vary at twice the frequency of the motion; their sum is constant.',
);
export const plotPend = plot(
  {
    x: ax('length L (m)', 0, 2),
    y: ax('time period T (s)', 0, 7.2),
    functions: [
      { expr: `2*pi*sqrt(x/${G})`, label: 'Earth: g = 9.8 m/s²', domain: [0, 2] },
      { expr: `2*pi*sqrt(x/${ex10.gM})`, label: 'Moon: g = 1.62 m/s²', domain: [0, 2] },
    ],
  },
  'Time period of a simple pendulum against its length on the Earth and on the Moon: square-root curves, with the Moon curve higher because gravity is weaker',
  'T grows as √L and falls as √g; the mass of the bob does not appear.',
);

// ---------------------------------------------------------------- tables
const TTERMS = table(
  ['Term', 'Meaning', 'Unit'],
  [
    ['x', 'displacement from the mean position at time t', 'metre (m)'],
    ['A', 'amplitude: the largest displacement', 'metre (m)'],
    ['ω', 'angular frequency, ω = 2π/T = 2πf', 'radian per second'],
    ['ωt + φ', 'phase at time t', 'radian'],
    ['φ', 'phase constant (initial phase), fixed by x and v at t = 0', 'radian'],
    ['T, f', 'period and frequency, f = 1/T', 'second; hertz (Hz)'],
  ],
  'Table of the terms in the equation of simple harmonic motion with their meanings and units',
);
const TEX1 = table(
  ['Quantity', 'Value'],
  [
    ['Beats in 60 s', `${ex1.beats}`],
    ['Period T = 60 / 72', `${dec(ex1.T, 3)} s`],
    ['Frequency f = 1 / T', `${dec(ex1.f, 3)} Hz`],
    ['Angular frequency ω = 2π f', `${dec(ex1.om, 3)} rad s⁻¹`],
  ],
  'Table of the period, frequency and angular frequency of a pulse of 72 beats per minute',
);
const TPERIODIC = table(
  ['Motion', 'Periodic?', 'Oscillatory?', 'SHM?'],
  [
    ['Hour hand of a wall clock', 'yes, 12 h', 'no, it goes round', 'no'],
    ['Block bobbing on a spring (small amplitude)', 'yes', 'yes, to and fro', 'yes'],
    ['A ball bouncing on a hard floor', 'yes (if no loss)', 'yes', 'no: constant g, not ∝ −x'],
    ['Prong of a vibrating tuning fork', 'yes', 'yes', 'yes (to a good approximation)'],
  ],
  'Table comparing periodic, oscillatory and simple harmonic motion with four examples',
);
const TEX2 = table(
  ['Quantity', 'Value for x = 0.12 cos(4π t + π/3) m'],
  [
    ['Amplitude A', '0.12 m'],
    ['Angular frequency ω', `${dec(ex2.om, 4)} rad s⁻¹`],
    ['Frequency f and period T', `${ex2.f} Hz, ${ex2.T} s`],
    ['Displacement at t = 0', `${dec(ex2.x0, 3)} m`],
    ['Velocity at t = 0 (−Aω sin φ)', `${dec(ex2.v0, 4)} m s⁻¹`],
    ['Acceleration at t = 0 (−ω² x)', `${dec(ex2.a0, 4)} m s⁻²`],
  ],
  'Table of the amplitude, frequency, period and initial displacement, velocity and acceleration read from a given equation of simple harmonic motion',
);
const TEX3 = table(
  ['Quantity', 'Value'],
  [
    ['Radius = amplitude A', `${ex3.A} m`],
    ['ω = 2π f', `${dec(ex3.om, 4)} rad s⁻¹ (3π)`],
    ['Phase angle from x = A to x = A/2', 'cos θ = 1/2, θ = π/3'],
    ['Time t = θ / ω', `${dec(ex3.t, 4)} s = T/6`],
    ['Maximum speed Aω', `${dec(ex3.vmax, 4)} m s⁻¹`],
  ],
  'Table of the working for the time taken by the foot of the reference circle to go from the end of the diameter to half amplitude',
);
const TPHASE = table(
  ['Quantity', 'Expression', 'Phase relative to x'],
  [
    ['Displacement x', 'A cos(ωt + φ)', '0'],
    ['Velocity v', 'Aω cos(ωt + φ + π/2)', 'leads x by π/2 (a quarter period)'],
    ['Acceleration a', 'Aω² cos(ωt + φ + π)', 'leads x by π: opposite to x'],
  ],
  'Table of the phase relations between displacement, velocity and acceleration in simple harmonic motion',
);
const TEX4 = table(
  ['Quantity', 'Value (A = 0.080 m, T = 0.40 s)'],
  [
    ['ω = 2π/T', `${dec(ex4.om, 4)} rad s⁻¹`],
    ['Maximum speed Aω', `${dec(ex4.vmax, 4)} m s⁻¹`],
    ['Maximum acceleration Aω²', `${dec(ex4.amax, 4)} m s⁻²`],
    ['Speed at x = 0.050 m: ω√(A² − x²)', `${dec(ex4.v, 4)} m s⁻¹`],
    ['Acceleration size at x = 0.050 m: ω² x', `${dec(ex4.a, 4)} m s⁻²`],
  ],
  'Table of the maximum and instantaneous speed and acceleration of a particle in simple harmonic motion',
);
const TEX5 = table(
  ['Step', 'Result'],
  [
    ['cos φ = x(0)/A', `${ex5.x0 / ex5.A}`],
    ['Candidates for φ in one turn', '2π/3 (120°) or 4π/3 (240°)'],
    ['v(0) = −Aω sin φ must be positive', 'sin φ < 0, so φ = 4π/3'],
    ['φ in radian', `${dec(ex5.phi, 4)}`],
    ['Initial velocity', `${dec(ex5.v0, 3)} m s⁻¹`],
  ],
  'Table of the steps in finding the phase constant from the initial displacement and the direction of motion',
);
const TSHM = table(
  ['Test', 'Result for SHM'],
  [
    ['Acceleration against displacement', 'a = −ω² x: straight line through the origin, negative slope'],
    ['Force', 'F = −k x: restoring and proportional to the displacement'],
    ['Graph of x against t', 'a single sine or cosine curve'],
    ['Period', 'independent of the amplitude'],
  ],
  'Table of tests that identify simple harmonic motion',
);
const TFORCE = table(
  ['Position', 'x', 'Force F = −k x', 'Speed'],
  [
    ['Left extreme', '−A', '+k A (to the right)', 'zero'],
    ['Mean position', '0', '0', 'maximum'],
    ['Right extreme', '+A', '−k A (to the left)', 'zero'],
  ],
  'Table of the position, restoring force and speed of a block on a spring at the extremes and at the mean position',
);
const TEX6 = table(
  ['Quantity', 'Value (m = 0.50 kg, k = 80 N/m)'],
  [
    ['ω = √(k/m)', `${dec(ex6.om, 4)} rad s⁻¹`],
    ['T = 2π√(m/k)', `${dec(ex6.T, 4)} s`],
    ['f = 1/T', `${dec(ex6.f, 4)} Hz`],
  ],
  'Table of the angular frequency, period and frequency of a block of 0.50 kilogram on a spring of constant 80 newtons per metre',
);
const TEX7 = table(
  ['Quantity', 'Value'],
  [
    ['Period T = 20.0 s / 25', `${dec(ex7.T, 3)} s`],
    ['Spring constant k = 4π² m / T²', `${dec(ex7.k, 5)} N m⁻¹`],
    ['Mass for T = 1.2 s: m = k T² / 4π²', `${dec(ex7.m2, 3)} kg`],
    ['Ratio of masses = (1.2 / 0.80)²', `${dec(ex7.ratio, 3)}`],
  ],
  'Table of the period, spring constant and the mass needed for a longer period of a glider on an air track',
);
const TEX8 = table(
  ['Quantity', 'Value (m = 0.20 kg, k = 50 N/m, A = 0.060 m)'],
  [
    ['Total energy E = ½ k A²', `${dec(ex8.total, 3)} J`],
    ['At x = 0.030 m: potential ½ k x²', `${dec(ex8.pe, 3)} J`],
    ['At x = 0.030 m: kinetic E − PE', `${dec(ex8.ke, 3)} J`],
    ['Speed there: v = √(2 KE / m)', `${dec(ex8.v, 4)} m s⁻¹`],
    ['Maximum speed √(2E/m) at x = 0', `${dec(ex8.vmax, 4)} m s⁻¹`],
  ],
  'Table of the total, potential and kinetic energy and the speeds of an oscillating block at two positions',
);
const TENERGY = table(
  ['Position', 'Potential energy', 'Kinetic energy', 'Total'],
  [
    ['x = ±A', '½ k A² = E', '0', 'E'],
    ['x = ±A/2', 'E/4', '3E/4', 'E'],
    ['x = ±A/√2', 'E/2', 'E/2', 'E'],
    ['x = 0', '0', '½ k A² = E', 'E'],
  ],
  'Table of the potential and kinetic energy of simple harmonic motion at four displacements',
);
const TEX9 = table(
  ['Question (A = 0.10 m)', 'Answer'],
  [
    ['Where is KE = PE?  ½ k x² = ½ k (A² − x²)', `x = A/√2 = ${dec(ex9.xEq, 3)} m`],
    ['At x = 0.060 m: PE as a fraction of E', `(0.060/0.10)² = ${dec(ex9.peFrac, 3)}`],
    ['At x = 0.060 m: KE as a fraction of E', `${dec(ex9.keFrac, 3)}`],
  ],
  'Table of the displacement at which kinetic and potential energy are equal and the energy fractions at 0.060 metre',
);
const TSIN = table(
  ['Angle θ', 'θ in radian', 'sin θ', 'θ is larger than sin θ by'],
  sinTable.map((o) => [`${o.d}°`, dec(o.th, 4), dec(o.sin, 4), `${dec(o.err, 2)}%`]),
  'Table showing the angle in radian and its sine for angles from 2 to 30 degrees and the per cent difference',
);
const TEX10 = table(
  ['Quantity', 'Value'],
  [
    ['Seconds pendulum: T = 2.0 s', 'L = g T² / 4π²'],
    ['Length L (g = 9.8 m s⁻²)', `${dec(ex10.L, 4)} m`],
    ['Same pendulum on the Moon (g = 1.62 m s⁻²)', `T = 2π√(L/g) = ${dec(ex10.TM, 4)} s`],
    ['Ratio of periods', `√(9.8/1.62) = ${dec(ex10.TM / ex10.T, 3)}`],
  ],
  'Table of the length of a seconds pendulum and its period on the Moon',
);
const TEX11 = table(
  ['Quantity', 'Value'],
  [
    ['New period T′ = 2.0 × √1.02', `${dec(ex11.T2, 5)} s`],
    ['Oscillations counted in 86 400 s of true time', `${dec(ex11.day / ex11.T2, 6)}`],
    ['Time shown by the clock', `${dec((ex11.day / ex11.T2) * ex11.T, 6)} s`],
    ['Time lost in one day', `${dec(ex11.lag, 3)} s = ${dec(ex11.lag / 60, 3)} min`],
  ],
  'Table of the new period and the time lost per day by a pendulum clock whose pendulum is made two per cent longer',
);
const TCOMPARE = table(
  ['', 'Block on spring', 'Simple pendulum'],
  [
    ['Restoring force', '−k x (spring)', '−mg sin θ ≈ −(mg/L) s (gravity)'],
    ['ω²', 'k / m', 'g / L'],
    ['Time period', '2π √(m / k)', '2π √(L / g)'],
    ['Depends on', 'mass and spring constant', 'length and g (not on the mass)'],
    ['On the Moon', 'unchanged', 'longer (g is smaller)'],
  ],
  'Table comparing the restoring force, angular frequency and time period of a spring oscillator and a simple pendulum',
);
const TSUM1 = table(
  ['Idea', 'Result'],
  [
    ['Period, frequency', 'f = 1/T, ω = 2π/T = 2π f'],
    ['SHM', 'x = A cos(ωt + φ); a = −ω² x'],
    ['Reference circle', 'foot of the perpendicular from uniform circular motion is SHM'],
    ['Velocity', 'v = −Aω sin(ωt + φ) = ±ω√(A² − x²); maximum Aω'],
    ['Acceleration', 'a = −Aω² cos(ωt + φ); maximum Aω² at the extremes'],
    ['Phase', 'v leads x by π/2; a is opposite to x'],
  ],
  'Summary table of period, frequency, the equation of simple harmonic motion, the reference circle, velocity, acceleration and phase',
);
const TSUM2 = table(
  ['Idea', 'Result'],
  [
    ['Force law', 'F = −k x ⇒ SHM with ω² = k/m'],
    ['Spring', 'T = 2π√(m/k), independent of A'],
    ['Energy', 'PE = ½ k x², KE = ½ k (A² − x²), E = ½ k A²'],
    ['Energy in time', 'KE and PE swap at twice the frequency of x'],
    ['Pendulum', 'F ≈ −(mg/L) s for small θ; T = 2π√(L/g)'],
    ['Independent of', 'amplitude (spring, small-angle pendulum) and mass (pendulum)'],
  ],
  'Summary table of the force law, spring oscillator, energy, and simple pendulum',
);

export const TABLES = { TTERMS, TPERIODIC, TPHASE, TSHM, TFORCE, TENERGY, TSIN, TCOMPARE };
export const PLOTS = { plotX, plotPhase, plotKin, plotTspring, plotEx, plotEt, plotPend };

// ================================================================ DECK 1
export const deck1 = deck({
  part: 1,
  title: 'Oscillations — Part 1: Periodic motion and simple harmonic motion',
  goals: [
    'Define period, frequency and angular frequency, and tell periodic, oscillatory and simple harmonic motion apart',
    'Write and interpret x = A cos(ωt + φ), find φ from the starting conditions, and use the reference circle',
    'Find the velocity and acceleration in SHM and describe their phase relation to the displacement',
  ],
  slides: [
    sl('title', 'Oscillations', {
      b: 'Part 1 — motion that repeats: the pulse, the swing, the vibrating string, and the simplest of them all.',
      v: V.ref,
      n: 'Many things move to and fro again and again: a swing, a piston, the prong of a tuning fork, even the molecules of a solid. In this part we describe such motion with a few numbers, find the equation of the simplest kind, called simple harmonic motion, and see how it is hidden in uniform motion round a circle.',
    }),
    sl('concept', 'Periodic and oscillatory motion', {
      b: 'A motion that repeats itself after equal intervals of time is **periodic**. If the body moves to and fro about a fixed (mean) position, it is also **oscillatory**.',
      ul: [
        r`The **period** $T$ is the time for one complete repetition (one oscillation); its SI unit is the second.`,
        r`The **frequency** $f = 1/T$ is the number of oscillations per second; the unit is the **hertz** (Hz), $1\ \text{Hz} = 1\ \text{s}^{-1}$.`,
        r`The **angular frequency** $\omega = 2\pi/T = 2\pi f$ is measured in radian per second.`,
        'Every oscillation is periodic, but not every periodic motion oscillates: the hour hand goes round, it does not go to and fro.',
      ],
      v: TPERIODIC,
      n: 'A motion is periodic if it repeats after equal intervals. The time for one repetition is the period, and its inverse is the frequency, measured in hertz. Multiply the frequency by two pi to get the angular frequency in radians per second. A motion that goes to and fro about a mean position is oscillatory. The hour hand of a clock is periodic, but it is not oscillatory.',
    }),
    sl('example', 'Worked example 1: a pulse of 72 beats per minute', {
      b: r`A nurse counts $${ex1.beats}$ beats of a pulse in $${ex1.secs}$ s. Treating the pulse as periodic, find its period, frequency and angular frequency.`,
      ul: [
        r`$T = \dfrac{${ex1.secs}}{${ex1.beats}} = ${dec(ex1.T, 3)}$ s.`,
        r`$f = \dfrac{1}{T} = \dfrac{${ex1.beats}}{${ex1.secs}} = ${dec(ex1.f, 3)}$ Hz.`,
        r`$\omega = 2\pi f = 2\pi \times ${dec(ex1.f, 3)} = ${dec(ex1.om, 3)}$ rad s$^{-1}$.`,
      ],
      v: TEX1,
      n: `Seventy two beats in sixty seconds means each beat takes sixty over seventy two, about zero point eight three seconds. The frequency is the inverse, one point two hertz. Multiplying by two pi gives an angular frequency of about seven point five four radians per second.`,
    }),
    sl('concept', 'Displacement as a function of time', {
      b: r`Let $x(t)$ be the displacement from the mean position. For periodic motion $x(t + T) = x(t)$. The simplest periodic motion is a single cosine (or sine) curve:`,
      m: [r`x(t) = A \cos(\omega t + \phi)`],
      ul: [
        r`Amplitude $A$: the largest value of $|x|$; the curve swings between $+A$ and $-A$.`,
        r`The cosine repeats when $\omega t$ increases by $2\pi$, that is after $T = 2\pi/\omega$.`,
        'This is **simple harmonic motion** (SHM). Its graph is a sinusoidal curve.',
        'Other periodic motions, such as a saw-tooth or a ball bouncing, can be built from several such curves but are not SHM.',
      ],
      v: plotX,
      n: 'The simplest oscillation has a displacement that is a cosine of time. It swings between plus and minus the amplitude A, and repeats when omega t grows by two pi. This is simple harmonic motion. The graph shows an amplitude of ten centimetres and a period of two seconds. Other periodic motions, like a bouncing ball, repeat too, but they are not a single cosine.',
    }),
    sl('concept', 'The equation x = A cos(ωt + φ) and the phase', {
      b: r`Each symbol in the equation has a meaning:`,
      ul: [
        r`$\omega t + \phi$ is the **phase**: it tells where the particle is in its cycle at time $t$.`,
        r`$\phi$ is the **phase constant** (initial phase), the phase at $t = 0$; it is fixed by $x$ and $v$ at $t = 0$.`,
        r`Changing $\phi$ shifts the whole curve along the time axis by $\phi/\omega$ but changes neither $A$ nor $T$.`,
        r`$x = A \sin(\omega t)$ is also SHM: it is the cosine form with $\phi = -\pi/2$.`,
      ],
      v: plotPhase,
      n: 'The quantity omega t plus phi is the phase. The phase constant phi is the phase at time zero and is fixed by where the particle starts and which way it is moving. Changing phi slides the curve along the time axis without changing its amplitude or period. A sine is just a cosine with phase constant of minus a quarter turn.',
    }),
    sl('example', 'Worked example 2: reading an equation', {
      b: r`A particle's displacement is $x = 0.12 \cos(4\pi t + \pi/3)$ metre. Find $A$, $f$, $T$, and $x$, $v$, $a$ at $t = 0$.`,
      ul: [
        r`Comparing with $A\cos(\omega t + \phi)$: $A = 0.12$ m, $\omega = 4\pi$ rad s$^{-1}$, $\phi = \pi/3$.`,
        r`$f = \omega/2\pi = ${ex2.f}$ Hz and $T = 1/f = ${ex2.T}$ s.`,
        r`$x(0) = 0.12\cos(\pi/3) = ${dec(ex2.x0, 3)}$ m.`,
        r`$v(0) = -A\omega\sin\phi = -0.12 \times ${dec(ex2.om, 4)} \times 0.866 = ${dec(ex2.v0, 4)}$ m s$^{-1}$, towards $-x$.`,
        r`$a(0) = -\omega^2 x(0) = -${dec(ex2.om ** 2, 5)} \times ${dec(ex2.x0, 3)} = ${dec(ex2.a0, 4)}$ m s$^{-2}$.`,
      ],
      v: TEX2,
      n: `Compare with the standard form. The amplitude is zero point one two metre, the angular frequency is four pi, so the frequency is two hertz and the period is half a second. At time zero the displacement is half the amplitude, six centimetres. The velocity is about minus one point three metres per second, so the particle is moving towards negative x, and the acceleration is about minus nine point five.`,
    }),
    sl('check', 'Quick check: reading the equation', {
      b: 'Choose the correct option.',
      v: TTERMS,
      chk: 'ang-mcq',
      n: 'Compare the equation with the standard form to find omega, then use the period formula.',
    }),
    sl('concept', 'SHM and uniform circular motion', {
      b: r`Imagine a particle P moving on a circle of radius $A$ with constant angular speed $\omega$. Drop a perpendicular from P on a diameter; its foot Q is the **projection** of P.`,
      ul: [
        r`If OP makes angle $\omega t + \phi$ with the diameter, then $x = OQ = A\cos(\omega t + \phi)$: **Q performs SHM**.`,
        r`The radius of the circle is the amplitude $A$; the angular speed of P is the angular frequency $\omega$.`,
        r`The angle of OP at $t = 0$ is the phase constant $\phi$.`,
        'One revolution of P is one complete oscillation of Q, so the period of SHM equals the period of the circular motion.',
      ],
      v: V.ref,
      n: 'Let a particle P go round a circle at a steady rate. Its shadow, the foot of the perpendicular on a diameter, moves to and fro. If the radius makes an angle omega t plus phi with the diameter, the shadow is at A cos of omega t plus phi. So the radius is the amplitude, the angular speed is omega, and the starting angle is the phase constant.',
    }),
    sl('example', 'Worked example 3: from the end to half amplitude', {
      b: r`A particle goes round a circle of radius $${ex3.A}$ m at $${ex3.f}$ revolutions per second. Its projection on a diameter starts at $x = +A$. How long does it take to reach $x = A/2$, and what is its maximum speed?`,
      ul: [
        r`$\omega = 2\pi f = ${dec(ex3.om, 4)}$ rad s$^{-1}$ and $T = 1/f = ${dec(ex3.T, 3)}$ s.`,
        r`$x = A\cos\omega t = A/2$ gives $\cos\omega t = \tfrac{1}{2}$, so $\omega t = \pi/3$.`,
        r`$t = \dfrac{\pi/3}{\omega} = \dfrac{1.0472}{${dec(ex3.om, 4)}} = ${dec(ex3.t, 4)}$ s, which is $T/6$.`,
        r`Speed of P $= A\omega = ${ex3.A} \times ${dec(ex3.om, 4)} = ${dec(ex3.vmax, 4)}$ m s$^{-1}$: the largest speed of Q.`,
      ],
      v: TEX3,
      n: `The angular frequency is three pi, about nine point four two radians per second. For the projection to reach half the amplitude the cosine must equal one half, which happens at a phase of sixty degrees, pi over three. Dividing by omega gives about zero point one one one seconds, which is one sixth of the period. The maximum speed is amplitude times omega, about one point eight eight five metres per second.`,
    }),
    sl('concept', 'Velocity in SHM', {
      b: r`Differentiate $x = A\cos(\omega t + \phi)$:`,
      m: [r`v = \dfrac{dx}{dt} = -A\omega\sin(\omega t + \phi) = \pm\,\omega\sqrt{A^2 - x^2}`],
      ul: [
        r`The speed is **zero at the extremes** $x = \pm A$ and **maximum, $A\omega$, at the mean position** $x = 0$.`,
        r`The velocity is the x-component of the velocity of P on the reference circle.`,
        r`The sign of $v$ tells the direction of motion; $|v|$ depends on the position only through $\sqrt{A^2 - x^2}$.`,
        r`The graph of $v$ against $t$ is also sinusoidal, a quarter period ahead of $x$.`,
      ],
      v: plotKin,
      n: 'Differentiate the displacement and the velocity is minus A omega times sine of omega t plus phi. Using sine squared plus cosine squared equals one, the speed at displacement x is omega times the square root of A squared minus x squared. It is zero at the ends, where the particle turns round, and greatest at the mean position, where it equals A times omega.',
    }),
    sl('concept', 'Acceleration in SHM', {
      b: r`Differentiate again:`,
      m: [r`a = \dfrac{dv}{dt} = -A\omega^2\cos(\omega t + \phi) = -\omega^2 x`],
      ul: [
        r`The acceleration is **proportional to the displacement and opposite to it**: it always points towards the mean position.`,
        r`Its size is **maximum, $A\omega^2$, at the extremes** and **zero at the mean position**.`,
        r`$a = -\omega^2 x$ is the defining equation of SHM; any motion obeying it is SHM with angular frequency $\omega$.`,
        'The speed is greatest exactly where the acceleration is zero, and the acceleration is greatest where the speed is zero.',
      ],
      v: plotKin,
      n: 'Differentiate again. The acceleration is minus omega squared times the displacement. So it is proportional to the displacement and always points back towards the mean position. Its size is greatest at the ends, A omega squared, and zero at the middle. This relation, acceleration equals minus omega squared times x, is the defining equation of simple harmonic motion.',
    }),
    sl('concept', 'Phase relations of x, v and a', {
      b: 'The three curves are shifted in time relative to one another:',
      ul: [
        r`Velocity $= A\omega\cos(\omega t + \phi + \pi/2)$: it **leads** the displacement by $\pi/2$ (a quarter of a period).`,
        r`Acceleration $= A\omega^2\cos(\omega t + \phi + \pi)$: it is **opposite in phase** to the displacement.`,
        'When x is at a maximum, v is zero; when x passes zero, |v| is largest.',
        'Plotted on one graph in units of A, Aω and Aω² the three curves have the same shape.',
      ],
      v: TPHASE,
      n: 'The velocity curve is ahead of the displacement curve by a quarter of a period, a phase of pi over two. The acceleration is opposite in phase to the displacement, a half period apart. So when the particle is at an extreme, its velocity is zero and its acceleration is largest. When it passes the middle, the velocity is largest and the acceleration is zero.',
    }),
    sl('check', 'Quick check: velocity and displacement', {
      b: 'Choose the correct option.',
      v: TPHASE,
      chk: 'phasediff-mcq',
      n: 'Compare the cosine forms of x and v.',
    }),
    sl('example', 'Worked example 4: speed and acceleration at a position', {
      b: r`A particle in SHM has amplitude $${ex4.A}$ m and period $${ex4.T}$ s. Find its maximum speed and acceleration, and its speed and acceleration at $x = ${ex4.x}$ m.`,
      ul: [
        r`$\omega = 2\pi/T = ${dec(ex4.om, 4)}$ rad s$^{-1}$.`,
        r`$v_\text{max} = A\omega = ${dec(ex4.vmax, 4)}$ m s$^{-1}$ and $a_\text{max} = A\omega^2 = ${dec(ex4.amax, 4)}$ m s$^{-2}$.`,
        r`$v = \omega\sqrt{A^2 - x^2} = ${dec(ex4.om, 4)}\sqrt{${ex4.A ** 2} - ${ex4.x ** 2}} = ${dec(ex4.v, 4)}$ m s$^{-1}$.`,
        r`$|a| = \omega^2 x = ${dec(ex4.om ** 2, 5)} \times ${ex4.x} = ${dec(ex4.a, 4)}$ m s$^{-2}$, directed towards the mean position.`,
      ],
      v: TEX4,
      n: `With a period of zero point four seconds, omega is five pi, about fifteen point seven radians per second. The maximum speed is about one point two six metres per second and the maximum acceleration about nineteen point seven. At fifty millimetres from the middle, the speed is omega times the root of A squared minus x squared, about zero point nine eight, and the acceleration is omega squared times x, about twelve point three.`,
    }),
    sl('example', 'Worked example 5: finding the phase constant', {
      b: r`A particle of amplitude $${ex5.A}$ m and period $${ex5.T}$ s is at $x = ${ex5.x0}$ m at $t = 0$, moving towards $+x$. Find $\phi$.`,
      ul: [
        r`$\cos\phi = x(0)/A = ${ex5.x0 / ex5.A}$, so $\phi = 120^\circ$ ($2\pi/3$) or $240^\circ$ ($4\pi/3$).`,
        r`$v(0) = -A\omega\sin\phi$ must be positive, so $\sin\phi < 0$: $\phi = 4\pi/3 = ${dec(ex5.phi, 4)}$ rad.`,
        r`Check: $\omega = 2\pi/${ex5.T} = ${dec(ex5.om, 4)}$ rad s$^{-1}$ and $v(0) = ${dec(ex5.v0, 3)}$ m s$^{-1}$, positive.`,
        'The position alone gives two possible phases; the direction of motion chooses between them.',
      ],
      v: TEX5,
      n: `At time zero the displacement is minus half the amplitude, so the cosine of phi is minus one half. That gives two possible angles, one hundred and twenty degrees and two hundred and forty degrees. The velocity is minus A omega sine phi, and it is positive, so the sine must be negative. That chooses two hundred and forty degrees, about four point one nine radians.`,
    }),
    sl('check', 'Quick check: speed at a position', {
      b: 'Compute the value.',
      v: TEX4,
      chk: 'vx-num',
      n: 'Use the speed formula with the amplitude and the period.',
    }),
    sl('concept', 'How to recognise SHM', {
      b: 'A motion is simple harmonic if the acceleration (or the force) is proportional to the displacement from a fixed point and directed towards it.',
      ul: [
        r`The test is $a = -\omega^2 x$: then $T = 2\pi/\omega$ follows at once.`,
        'Periodic motion that fails the test, such as a bouncing ball or the hour hand, is not SHM.',
        'The period of SHM does not depend on the amplitude (an ideal property that real systems keep only for small oscillations).',
        'Damped and forced oscillations and resonance are not part of this course.',
      ],
      v: TSHM,
      n: 'To test for simple harmonic motion, check whether the acceleration is proportional to the displacement and points back towards a fixed centre. If so, the angular frequency is the square root of the proportionality constant. A bouncing ball is periodic but fails the test. Real oscillations are simple harmonic only for small displacements. We do not study damped or forced oscillations here.',
    }),
    sl('check', 'Quick check: phase constant', {
      b: 'Judge the assertion and the reason.',
      v: plotPhase,
      chk: 'phase-ar',
      n: 'Think about what fixes the phase constant.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: TSUM1,
      n: 'To sum up. Frequency is one over the period, and omega is two pi times the frequency. In simple harmonic motion the displacement is A cos of omega t plus phi, and the acceleration is minus omega squared times the displacement. It is the shadow of uniform circular motion. The speed is omega times the root of A squared minus x squared, greatest at the middle. The velocity leads the displacement by a quarter period.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'Read A, ω and φ by comparing with x = A cos(ωt + φ); convert a sine to a cosine by a shift of π/2.',
        'Keep calculators in radian mode when you evaluate cos(ωt + φ).',
        'Use v = ω√(A² − x²) and |a| = ω²x when x is given; use Aω and Aω² for the maxima.',
        'To find φ use both x(0) and the direction of v(0); one equation alone gives two angles.',
      ],
      v: TSHM,
      n: 'Compare with the standard form to read the amplitude, omega and phi. Keep your calculator in radians. Use omega times the root of A squared minus x squared for the speed at a given position, and A omega and A omega squared for the maxima. To find phi you need both the position and the direction of motion at time zero, because the position alone gives two angles.',
    }),
  ],
});

// ================================================================ DECK 2
export const deck2 = deck({
  part: 2,
  title: 'Oscillations — Part 2: Force law, energy, the spring and the pendulum',
  goals: [
    'Use F = −kx to show that a loaded spring performs SHM, and use T = 2π√(m/k)',
    'Write the kinetic, potential and total energy of SHM and describe how they change with position and time',
    'Derive the time period of a simple pendulum for small angles and use T = 2π√(L/g)',
  ],
  slides: [
    sl('title', 'Springs, energy and pendulums', {
      b: 'Part 2 — what makes the motion simple harmonic, how the energy moves back and forth, and the two classic oscillators.',
      v: V.spring,
      n: 'In this part we ask what force produces simple harmonic motion. The answer is a force that pulls back in proportion to the displacement, such as the force of a spring. We follow the energy as it passes between kinetic and potential, and then study the two classic oscillators, a block on a spring and a simple pendulum.',
    }),
    sl('concept', 'The force law for SHM', {
      b: r`From $a = -\omega^2 x$ and Newton's second law, the force on a body of mass $m$ in SHM is:`,
      m: [r`F = ma = -m\omega^2 x = -k x, \qquad k = m\omega^2`],
      ul: [
        r`The force is **restoring**: it always points towards the mean position, and its size is proportional to the displacement.`,
        r`Conversely, any system with a restoring force $F = -kx$ performs SHM with $\omega = \sqrt{k/m}$.`,
        r`$k$ is the **force constant** (spring constant): force per unit displacement, in newton per metre.`,
        'A stiffer system (larger k) oscillates faster; a heavier body (larger m) oscillates more slowly.',
      ],
      v: V.spring,
      n: 'Multiply the acceleration by the mass, and the force in simple harmonic motion is minus k times x, where k equals m omega squared. The force is restoring: it is always directed towards the mean position and proportional to the displacement. The reverse is also true. If the force on a body is minus k x, the motion is simple harmonic with omega equal to the square root of k over m.',
    }),
    sl('concept', 'A block on a spring', {
      b: r`A block of mass $m$ on a smooth horizontal table is joined to a light spring of force constant $k$. Displace it by $x$ and the spring pulls it back with $F = -kx$.`,
      m: [r`\omega = \sqrt{\dfrac{k}{m}}, \qquad T = 2\pi\sqrt{\dfrac{m}{k}}, \qquad f = \dfrac{1}{2\pi}\sqrt{\dfrac{k}{m}}`],
      ul: [
        r`The period depends only on $m$ and $k$: **not on the amplitude**.`,
        'Quadrupling the mass doubles the period; making the spring four times stiffer halves it.',
        'The spring is assumed light (its own mass is neglected) and obeys Hooke\'s law within the range used.',
        'Friction is neglected, so the amplitude stays constant.',
      ],
      v: plotTspring,
      n: 'For a block on a smooth table joined to a light spring, the equation of motion gives omega squared equal to k over m. So the time period is two pi times the square root of m over k. It depends on the mass and the spring constant, but not on the amplitude. Four times the mass doubles the period, and a spring four times as stiff halves it.',
    }),
    sl('example', 'Worked example 6: a block on a spring', {
      b: r`A $${ex6.m}$ kg block on a smooth table is joined to a spring of force constant $${ex6.k}$ N m$^{-1}$. Find $\omega$, $T$ and $f$.`,
      ul: [
        r`$\omega = \sqrt{k/m} = \sqrt{${ex6.k}/${ex6.m}} = \sqrt{${ex6.k / ex6.m}} = ${dec(ex6.om, 4)}$ rad s$^{-1}$.`,
        r`$T = 2\pi/\omega = ${dec(ex6.T, 4)}$ s.`,
        r`$f = 1/T = ${dec(ex6.f, 4)}$ Hz.`,
      ],
      v: TEX6,
      n: `Divide the spring constant, eighty, by the mass, zero point five, to get one hundred and sixty. The square root, about twelve point six five, is omega in radians per second. Then the period is two pi over omega, about zero point four nine seven seconds, and the frequency is about two point zero one hertz.`,
    }),
    sl('example', 'Worked example 7: finding k from the oscillations', {
      b: r`A $${ex7.m}$ kg glider on an air track, joined to a spring, completes $${ex7.n}$ oscillations in $${dec(ex7.secs, 3)}$ s. Find the force constant, and the mass that would give a period of $${ex7.T2}$ s.`,
      ul: [
        r`$T = ${dec(ex7.secs, 3)}/${ex7.n} = ${dec(ex7.T, 3)}$ s.`,
        r`$k = \dfrac{4\pi^2 m}{T^2} = \dfrac{4\pi^2 \times ${ex7.m}}{${dec(ex7.T, 3)}^2} = ${dec(ex7.k, 5)}$ N m$^{-1}$.`,
        r`$m' = \dfrac{k T'^2}{4\pi^2} = \dfrac{${dec(ex7.k, 5)} \times ${ex7.T2}^2}{4\pi^2} = ${dec(ex7.m2, 3)}$ kg.`,
        r`Check: $T \propto \sqrt{m}$ so $m' = m(T'/T)^2 = ${ex7.m} \times (${ex7.T2}/${dec(ex7.T, 3)})^2 = ${dec(ex7.m2, 3)}$ kg.`,
      ],
      v: TEX7,
      n: `Twenty seconds over twenty five oscillations is a period of zero point eight seconds. Squaring the period formula gives k equal to four pi squared times the mass over the period squared, about one hundred and forty eight newtons per metre. For a period of one point two seconds, the mass must grow in proportion to the square of the period, to about five point four kilograms.`,
    }),
    sl('check', 'Quick check: what the period depends on', {
      b: 'Choose the correct option.',
      v: plotTspring,
      chk: 'springdep-mcq',
      n: 'Remember that the period varies as the square root of the mass.',
    }),
    sl('concept', 'Energy in SHM', {
      b: r`The restoring force is conservative, so the total energy stays constant. For a body at displacement $x$ with $v^2 = \omega^2(A^2 - x^2)$ and $k = m\omega^2$:`,
      m: [r`\text{PE} = \tfrac{1}{2}kx^2, \quad \text{KE} = \tfrac{1}{2}mv^2 = \tfrac{1}{2}k(A^2 - x^2), \quad E = \text{KE} + \text{PE} = \tfrac{1}{2}kA^2`],
      ul: [
        r`At $x = \pm A$ the energy is all potential, $\tfrac{1}{2}kA^2$; the body is momentarily at rest.`,
        r`At $x = 0$ the energy is all kinetic, $\tfrac{1}{2}kA^2 = \tfrac{1}{2}mv_\text{max}^2$.`,
        r`The total energy is proportional to the **square of the amplitude**: doubling $A$ quadruples $E$.`,
        r`$E = \tfrac{1}{2}m\omega^2A^2$ is the same result written with $\omega$.`,
      ],
      v: plotEx,
      n: 'The potential energy of the spring is half k x squared. The kinetic energy is half m v squared, which equals half k times A squared minus x squared. Add them and the displacement cancels: the total is half k A squared. At the ends it is all potential, at the middle all kinetic. Doubling the amplitude makes the total energy four times larger.',
    }),
    sl('concept', 'The energy bars', {
      b: 'The same result seen at five positions: the total stays the same bar height, and only the split changes.',
      ul: [
        r`Potential energy is proportional to $x^2$: at $x = \pm A/2$ it is a quarter of $E$.`,
        r`Kinetic energy is proportional to $A^2 - x^2$: three quarters of $E$ at $x = \pm A/2$.`,
        r`KE equals PE where $x = \pm A/\sqrt{2}$, about $0.707A$.`,
        'Energy is exchanged between the two forms twice in every oscillation, but none is lost.',
      ],
      v: V.ebars,
      n: 'Here is the energy at five positions. The whole bar is the total energy, which never changes. At the ends it is all potential. Halfway out, at half the amplitude, a quarter is potential and three quarters is kinetic, because potential energy goes as the square of the displacement. At the middle it is all kinetic.',
    }),
    sl('concept', 'Energy against time', {
      b: r`For $x = A\cos\omega t$, $\text{PE} = E\cos^2\omega t$ and $\text{KE} = E\sin^2\omega t$:`,
      ul: [
        r`KE and PE each oscillate with **twice** the frequency of the motion (period $T/2$).`,
        'Their average over one cycle is E/2 each.',
        'At every instant KE + PE = E: when one rises, the other falls by the same amount.',
        'The graph of either against x is a parabola; against t it is a squared sine or cosine.',
      ],
      v: plotEt,
      n: 'In time the kinetic and potential energies are squared sine and cosine curves. Since a squared sine repeats every half turn, each energy completes two cycles in every period of the motion. They always add up to the total, and their average over a cycle is half the total each.',
    }),
    sl('example', 'Worked example 8: energy and speed of a block', {
      b: r`A $${ex8.m}$ kg block oscillates on a spring of $${ex8.k}$ N m$^{-1}$ with amplitude $${ex8.A}$ m. Find $E$, and the PE, KE and speed at $x = ${ex8.x}$ m, and the maximum speed.`,
      ul: [
        r`$E = \tfrac{1}{2}kA^2 = \tfrac{1}{2} \times ${ex8.k} \times ${ex8.A}^2 = ${dec(ex8.total, 3)}$ J.`,
        r`PE $= \tfrac{1}{2}kx^2 = \tfrac{1}{2} \times ${ex8.k} \times ${ex8.x}^2 = ${dec(ex8.pe, 3)}$ J, so KE $= E - \text{PE} = ${dec(ex8.ke, 3)}$ J.`,
        r`$v = \sqrt{2\,\text{KE}/m} = \sqrt{2 \times ${dec(ex8.ke, 3)}/${ex8.m}} = ${dec(ex8.v, 4)}$ m s$^{-1}$.`,
        r`$v_\text{max} = \sqrt{2E/m} = ${dec(ex8.vmax, 4)}$ m s$^{-1}$ at the mean position.`,
      ],
      v: TEX8,
      n: `The total energy is half the spring constant times the amplitude squared, which is zero point zero nine joules. At thirty millimetres the potential energy is about zero point zero two two five joules, so the kinetic energy is the rest, zero point zero six seven five. That gives a speed of about zero point eight two metres per second, a little below the maximum of about zero point nine five.`,
    }),
    sl('example', 'Worked example 9: where are the energies equal?', {
      b: r`A particle in SHM has amplitude $${ex9.A}$ m. At what displacement is KE = PE? What fraction of $E$ is kinetic at $x = ${ex9.x}$ m?`,
      ul: [
        r`KE = PE means $\tfrac{1}{2}k(A^2 - x^2) = \tfrac{1}{2}kx^2$, so $x = A/\sqrt{2} = ${dec(ex9.xEq, 3)}$ m.`,
        r`PE$/E = x^2/A^2 = (${ex9.x}/${ex9.A})^2 = ${dec(ex9.peFrac, 3)}$.`,
        r`KE$/E = 1 - ${dec(ex9.peFrac, 3)} = ${dec(ex9.keFrac, 3)}$.`,
      ],
      v: TEX9,
      n: `Setting the two energies equal gives x equal to A over root two, about zero point zero seven one metres for an amplitude of zero point one. At sixty millimetres the potential energy fraction is the square of zero point six, which is zero point three six, so the kinetic energy takes up the other zero point six four.`,
    }),
    sl('check', 'Quick check: kinetic and potential energy', {
      b: 'Choose the correct option.',
      v: TENERGY,
      chk: 'kepe-mcq',
      n: 'Set the kinetic and potential energies equal.',
    }),
    sl('concept', 'The simple pendulum: the restoring force', {
      b: r`A small bob of mass $m$ hangs from a light inextensible string of length $L$. Pull it aside by angle $\theta$ and release it.`,
      ul: [
        r`Along the string the tension $T$ balances $mg\cos\theta$ (the bob moves on a circular arc).`,
        r`Along the arc the restoring force is $F = -mg\sin\theta$, directed towards the lowest point.`,
        r`For small $\theta$ (in radian) $\sin\theta \approx \theta = s/L$, with $s$ the arc length from the lowest point.`,
        r`So $F \approx -\dfrac{mg}{L}\,s$: the force is proportional to the displacement $s$, which is SHM.`,
      ],
      v: V.pend,
      n: 'Pull a pendulum bob aside and release it. The weight splits into a part along the string, balanced by the tension, and a part along the arc, m g sine theta, which pulls the bob back to the lowest point. For small angles, sine theta is nearly equal to theta, which is the arc length over L. So the restoring force is minus m g over L times the arc length: simple harmonic motion.',
    }),
    sl('concept', 'Time period of a simple pendulum', {
      b: r`Compare $F = -(mg/L)s$ with $F = -ks$: the effective force constant is $k = mg/L$, and the inertia is $m$.`,
      m: [r`\omega = \sqrt{\dfrac{k}{m}} = \sqrt{\dfrac{g}{L}}, \qquad T = 2\pi\sqrt{\dfrac{L}{g}}`],
      ul: [
        r`The period does **not depend on the mass** of the bob: m cancels, because the restoring force and the inertia are both proportional to m.`,
        r`It does not depend on the amplitude, provided the angle is small (up to about $10^\circ$).`,
        r`$T \propto \sqrt{L}$ and $T \propto 1/\sqrt{g}$: a longer pendulum swings more slowly, and so does a pendulum on the Moon.`,
        r`A **seconds pendulum** has $T = 2$ s: each swing from one side to the other takes one second.`,
      ],
      v: plotPend,
      n: 'Compare the restoring force with minus k s. The effective spring constant is m g over L, and the inertia is m. So omega squared is g over L, and the period is two pi times the square root of L over g. The mass cancels. The period is longer for a longer pendulum and for weaker gravity, so a pendulum on the Moon swings more slowly than on the Earth.',
    }),
    sl('concept', 'Why the angle must be small', {
      b: r`The step $\sin\theta \approx \theta$ is what makes the motion simple harmonic.`,
      ul: [
        r`For $\theta$ in radian, $\theta - \sin\theta$ is small when $\theta$ is small: the table shows the size of the error.`,
        r`At $10^\circ$, $\theta$ exceeds $\sin\theta$ by only $${dec(sinTable[2].err, 2)}\%$; at $30^\circ$ by $${dec(sinTable[4].err, 2)}\%$ (as a share of $\sin\theta$).`,
        'For larger amplitudes the true period is a little longer than 2π√(L/g) and the motion is no longer exactly SHM.',
        'So the formula T = 2π√(L/g) is used for swings of a few degrees only.',
      ],
      v: TSIN,
      n: 'The whole derivation rests on replacing sine theta by theta. The table shows how good that is. At ten degrees the two differ by about half a per cent, and at thirty degrees by nearly five per cent. For bigger swings the pendulum takes a little longer than the formula says, and its motion is no longer exactly simple harmonic.',
    }),
    sl('example', 'Worked example 10: a seconds pendulum', {
      b: r`Find the length of a seconds pendulum ($T = ${ex10.T}$ s) with $g = 9.8$ m s$^{-2}$, and the period of the same pendulum on the Moon, $g = ${ex10.gM}$ m s$^{-2}$.`,
      ul: [
        r`$T = 2\pi\sqrt{L/g}$ gives $L = \dfrac{gT^2}{4\pi^2} = \dfrac{9.8 \times ${ex10.T}^2}{4\pi^2} = ${dec(ex10.L, 4)}$ m.`,
        r`On the Moon $T_M = 2\pi\sqrt{\dfrac{${dec(ex10.L, 4)}}{${ex10.gM}}} = ${dec(ex10.TM, 4)}$ s.`,
        r`The ratio $T_M/T = \sqrt{9.8/${ex10.gM}} = ${dec(ex10.TM / ex10.T, 3)}$: the Moon pendulum is about two and a half times slower.`,
      ],
      v: TEX10,
      n: `Square the period formula to get L equal to g times T squared over four pi squared. For a two second period and g of nine point eight, the length is about zero point nine nine three metres, almost exactly one metre. On the Moon, where gravity is weaker, the same pendulum takes about four point nine two seconds, roughly two and a half times as long.`,
    }),
    sl('example', 'Worked example 11: a clock that loses time', {
      b: r`A clock is driven by a pendulum with $T = ${ex11.T}$ s. Its length increases by ${ex11.up * 100}% in the heat. How much time does it lose in one day (86 400 s)?`,
      ul: [
        r`$T \propto \sqrt{L}$, so $T' = ${ex11.T}\sqrt{1.02} = ${dec(ex11.T2, 5)}$ s.`,
        r`In 86 400 s of true time it completes $86\,400/T' = ${dec(ex11.day / ex11.T2, 6)}$ swings.`,
        r`The clock counts each as ${ex11.T} s and shows $${dec((ex11.day / ex11.T2) * ex11.T, 6)}$ s.`,
        r`Time lost $= 86\,400 - ${dec((ex11.day / ex11.T2) * ex11.T, 6)} = ${dec(ex11.lag, 3)}$ s $\approx ${dec(ex11.lag / 60, 3)}$ min per day.`,
      ],
      v: TEX11,
      n: `A two per cent longer pendulum has a period longer by the square root of one point oh two, about one per cent. Each swing then takes about two point oh two seconds, so in a day the clock counts fewer swings and shows about eight hundred and fifty one seconds too little, a loss of roughly fourteen minutes a day.`,
    }),
    sl('concept', 'Spring and pendulum compared', {
      b: 'Both are SHM for small displacements; they differ in what supplies the restoring force.',
      ul: [
        r`Spring: $T = 2\pi\sqrt{m/k}$; the restoring force comes from the spring and the period depends on $m$.`,
        r`Pendulum: $T = 2\pi\sqrt{L/g}$; the restoring force comes from gravity and $m$ cancels.`,
        'Take both to the Moon: the spring oscillator keeps its period; the pendulum slows down.',
        'In both cases the period is fixed by the ratio of the inertia to the restoring force per unit displacement: m/k for the spring, L/g for the pendulum.',
      ],
      v: TCOMPARE,
      n: 'A spring gets its restoring force from the spring itself, so its period depends on the mass and the spring constant, and does not change from place to place. A pendulum gets its restoring force from gravity, so the mass cancels and the period depends on length and on the strength of gravity. On the Moon the spring clock keeps its time, but the pendulum clock runs slow.',
    }),
    sl('check', 'Quick check: pendulum length', {
      b: 'Compute the value.',
      v: plotPend,
      chk: 'pend-L-num',
      n: 'Rearrange the period formula for the length.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: TSUM2,
      n: 'To sum up. A force minus k x gives simple harmonic motion with omega squared equal to k over m. A block on a spring has period two pi root m over k. The energy is half k A squared, shared between kinetic and potential, and exchanged twice per cycle. A simple pendulum swinging through a small angle has period two pi root L over g, independent of its mass and of the amplitude.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'In derivations name the restoring force, show that it is proportional to the displacement, then read ω² from F = −kx.',
        'For the pendulum state the small-angle approximation: sin θ ≈ θ with θ in radian.',
        'Use E = ½kA² for the total energy; do not add KE and PE twice or forget that E depends on A².',
        'Spring: T depends on m and k, not on g. Pendulum: T depends on L and g, not on m.',
      ],
      v: TCOMPARE,
      n: 'In a derivation, name the restoring force, show it is proportional to the displacement, and read off omega squared. For the pendulum, state that sine theta is nearly equal to theta for small angles in radians. The total energy is half k A squared. And remember what each period depends on: the spring on mass and spring constant, the pendulum on length and gravity but not on mass.',
    }),
  ],
});
void w;
void ws;
void sci;
void sciu;
