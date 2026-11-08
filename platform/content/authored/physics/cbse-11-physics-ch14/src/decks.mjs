// ch14 Waves — two decks: Part 1 (t01–t02) wave types, wave speed, the equation of a progressive wave;
// Part 2 (t03–t04) superposition, reflection, standing waves in strings and pipes, beats.
// Every number and every graph is computed here from stated data.
import { sl, deck, table, svgV, plot, r, dec, sci } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { PI, V_AIR, R, GAMMA_AIR, M_AIR, ATM, ZERO_C, w, ws, sciu, stringV, newtonV, laplaceV, stringF, closedF } from './phys.mjs';
import * as G from './svgs.mjs';

// ---------------------------------------------------------------- worked-example numbers (Part 1)
const ex1 = { m: 0.015, L: 2.5, T: 120 };
ex1.mu = ex1.m / ex1.L;
ex1.v = stringV(ex1.T, ex1.mu);
ex1.v4 = stringV(4 * ex1.T, ex1.mu);
const ex2 = { P: ATM, rho: 1.29, gamma: GAMMA_AIR };
ex2.vN = newtonV(ex2.P, ex2.rho);
ex2.vL = laplaceV(ex2.gamma, ex2.P, ex2.rho);
ex2.ratio = ex2.vL / ex2.vN;
const ex3 = { v0: 331, T0: ZERO_C, t1: 27 };
ex3.T1 = ex3.t1 + ZERO_C;
ex3.v1 = ex3.v0 * Math.sqrt(ex3.T1 / ex3.T0);
ex3.T2 = 4 * ex3.T0;
ex3.t2 = ex3.T2 - ZERO_C;
const ex4 = { A: 0.005, k: 8.0, om: 2400 };
ex4.lam = (2 * PI) / ex4.k;
ex4.f = ex4.om / (2 * PI);
ex4.T = 1 / ex4.f;
ex4.v = ex4.om / ex4.k;
ex4.vmax = ex4.A * ex4.om;
ex4.ratio = ex4.vmax / ex4.v;
const ex6 = { dx: 0.15, dt: 1.0e-3 };
ex6.dphi = ex4.k * ex6.dx;
ex6.dphiDeg = (ex6.dphi * 180) / PI;
ex6.dxPi = PI / ex4.k;
ex6.dphiT = ex4.om * ex6.dt;
const ex7 = { f: 200, v: V_AIR, A: 0.002 };
ex7.om = 2 * PI * ex7.f;
ex7.k = ex7.om / ex7.v;
ex7.lam = ex7.v / ex7.f;

// ---------------------------------------------------------------- worked-example numbers (Part 2)
const ex8 = { a1: 3.0, a2: 4.0, phi: PI / 2 };
ex8.R = Math.sqrt(ex8.a1 ** 2 + ex8.a2 ** 2 + 2 * ex8.a1 * ex8.a2 * Math.cos(ex8.phi));
ex8.max = ex8.a1 + ex8.a2;
ex8.min = Math.abs(ex8.a1 - ex8.a2);
const ex9 = { L: 12.0, m: 3.0, T: 75 };
ex9.mu = ex9.m / ex9.L;
ex9.v = stringV(ex9.T, ex9.mu);
ex9.t = (2 * ex9.L) / ex9.v;
const ex10 = { L: 0.65, T: 150, mu: 1.0e-3 };
ex10.v = stringV(ex10.T, ex10.mu);
ex10.f = [1, 2, 3].map((n) => stringF(n, ex10.L, ex10.v));
const ex11 = { L: 0.425, v: V_AIR };
ex11.open = [1, 2, 3].map((n) => stringF(n, ex11.L, ex11.v));
ex11.closed = [1, 2, 3].map((n) => closedF(n, ex11.L, ex11.v));
const ex12 = { f1: 170, v: V_AIR };
ex12.L = ex12.v / (4 * ex12.f1);
ex12.next = [2, 3].map((n) => closedF(n, ex12.L, ex12.v));
const ex13 = { f1: 256, f2: 260 };
ex13.fb = Math.abs(ex13.f2 - ex13.f1);
ex13.Tb = 1 / ex13.fb;
ex13.mean = (ex13.f1 + ex13.f2) / 2;
const ex14 = { L1: 0.5, L2: 0.51, v: V_AIR };
ex14.f1 = closedF(1, ex14.L1, ex14.v);
ex14.f2 = closedF(1, ex14.L2, ex14.v);
ex14.fb = ex14.f1 - ex14.f2;

export const EX = { ex1, ex2, ex3, ex4, ex6, ex7, ex8, ex9, ex10, ex11, ex12, ex13, ex14 };

// ---------------------------------------------------------------- visuals
export const V = {
  types: svgV(G.WAVETYPES, 'A transverse wave on a rope and a longitudinal wave in a spring, each with its wavelength marked', 'Transverse: particles move at right angles to the travel direction. Longitudinal: along it.'),
  snap: svgV(G.SNAP, 'Two snapshots of a travelling sine wave an eighth of a period apart; the shape shifts right while one particle moves down', 'The shape moves a distance v Δt; each particle only moves up and down.'),
  pvel: svgV(G.PVEL, 'A wave with arrows for the velocity of particles at nine points: zero at crests, greatest at the rest position', 'Particle velocity and wave velocity are different things.'),
  reflect: svgV(G.REFLECT, 'A pulse reflecting at a fixed end, returning inverted, and at a free end, returning upright', 'Fixed end: the pulse returns inverted. Free end: it returns upright.'),
  modes: svgV(G.STRINGMODES, 'The first four normal modes of a string fixed at both ends, with nodes and loops', 'n loops: L = n λ/2 and f = n f₁.'),
  pipes: svgV(G.PIPES, 'Displacement patterns of an open pipe (modes 1, 2, 3) and a closed pipe (modes 1, 3, 5)', 'Open pipe: all harmonics. Closed pipe: odd harmonics only.'),
  beats: svgV(G.BEATS, 'Two close notes and their sum, with swells three times a second', 'Beat frequency = difference of the two frequencies.'),
};

const ax = (label, min, max) => ({ label, min, max });
const R6 = (x) => Math.round(x * 1e6) / 1e6;
export const plotStringV = plot(
  {
    x: ax('tension T (N)', 20, 200),
    y: ax('wave speed v (m/s)', 0, 340),
    functions: [
      { expr: 'sqrt(x/0.002)', label: 'μ = 2.0 g/m', domain: [20, 200] },
      { expr: 'sqrt(x/0.008)', label: 'μ = 8.0 g/m', domain: [20, 200] },
    ],
  },
  'Wave speed on a stretched string against tension for two strings of mass per unit length 2.0 and 8.0 grams per metre: both curves rise like the square root of the tension, the lighter string being twice as fast at every tension',
  'v = √(T/μ): the speed grows as √T and falls as √μ.',
);
const gc = R6((GAMMA_AIR * R) / M_AIR);
export const plotSoundT = plot(
  {
    x: ax('absolute temperature T (K)', 250, 400),
    y: ax('speed of sound in air (m/s)', 300, 400),
    functions: [{ expr: `sqrt(${gc}*x)`, label: 'v = √(γ R T / M), γ = 1.4, M = 29 g/mol', domain: [250, 400] }],
  },
  'Speed of sound in air against absolute temperature from 250 to 400 kelvin: a gently rising square-root curve from about 317 to about 401 metres per second',
  'v ∝ √T: about 347 m/s at 300 K, close to the 340 m/s used for room temperature.',
);
export const plotSuper = plot(
  {
    x: ax('x (one wave drawn at t = 0)', 0, 12.6),
    y: ax('displacement', -2, 2),
    functions: [
      { expr: 'sin(x)', label: 'wave 1', domain: [0, 12.6] },
      { expr: 'sin(x+pi/2)', label: 'wave 2, a quarter cycle ahead', domain: [0, 12.6] },
      { expr: 'sin(x)+sin(x+pi/2)', label: 'sum (amplitude 1.41)', domain: [0, 12.6] },
    ],
    samples: 400,
  },
  'Two sine waves of equal amplitude one and equal wavelength, the second a quarter of a cycle ahead of the first, and their sum, a sine wave of amplitude root two with a phase between the two',
  'The sum of two waves of the same frequency is again a wave of that frequency.',
);
export const plotStand = plot(
  {
    x: ax('position x (m), wavelength 1.0 m', 0, 2),
    y: ax('displacement', -2.2, 2.2),
    functions: [
      { expr: '2sin(2pi x)', label: 'ωt = 0', domain: [0, 2] },
      { expr: '1sin(2pi x)', label: 'ωt = 60°', domain: [0, 2] },
      { expr: '-2sin(2pi x)', label: 'ωt = 180°', domain: [0, 2] },
    ],
    vlines: [0, 0.5, 1, 1.5, 2].map((x) => ({ x, dashed: true })),
    samples: 300,
  },
  'Three snapshots of a standing wave on two wavelengths: every curve is the same sine shape, scaled by a time factor, and all of them cross zero at the nodes at 0, 0.5, 1.0, 1.5 and 2.0 metres, half a wavelength apart',
  'A standing wave: nodes (dashed lines) stay at rest; between them everything moves together.',
);

// ---------------------------------------------------------------- tables
const TTYPES = table(
  ['', 'Transverse wave', 'Longitudinal wave'],
  [
    ['Particles move', 'at right angles to the direction of travel', 'along the direction of travel'],
    ['Pattern', 'crests and troughs', 'compressions and rarefactions'],
    ['Travels through', 'solids and along strings (needs rigidity); not through the bulk of a gas or liquid', 'solids, liquids and gases'],
    ['Examples', 'a shaken rope, a plucked sitar string', 'sound in air, a pushed-and-released spring'],
  ],
  'Table comparing transverse and longitudinal waves',
);
const TSTRING = table(
  ['Quantity', 'Meaning', 'Unit'],
  [
    ['v', 'speed of the wave on the string', 'm s⁻¹'],
    ['T', 'tension in the string', 'N'],
    ['μ', 'mass per unit length = m / L', 'kg m⁻¹'],
    ['v = √(T / μ)', 'tighter or lighter string: faster wave', ''],
  ],
  'Table of the quantities in the formula for the speed of a wave on a stretched string',
);
const TSOUND = table(
  ['Medium', 'Speed of a longitudinal wave', 'Constants'],
  [
    ['Solid rod', 'v = √(Y / ρ)', 'Young modulus Y, density ρ'],
    ['Liquid or gas (any fluid)', 'v = √(B / ρ)', 'bulk modulus B, density ρ'],
    ['Gas, Newton (isothermal)', 'v = √(P / ρ)', 'pressure P, density ρ'],
    ['Gas, Laplace (adiabatic)', 'v = √(γ P / ρ)', 'γ = C_P / C_V; 1.4 for air'],
  ],
  'Table of formulae for the speed of longitudinal waves in solids, fluids and gases',
);
const TSYM = table(
  ['Symbol', 'Name', 'Relation'],
  [
    ['a', 'amplitude (maximum displacement)', 'metre'],
    ['k', 'angular wave number', 'k = 2π / λ  (rad m⁻¹)'],
    ['ω', 'angular frequency', 'ω = 2π f = 2π / T  (rad s⁻¹)'],
    ['(kx − ωt + φ)', 'phase; φ is the initial phase', 'radian'],
    ['v', 'wave speed', 'v = ω / k = f λ'],
  ],
  'Table of the symbols in the equation of a progressive wave and their relations',
);
const TPHASE = table(
  ['Separation Δx', 'Phase difference Δφ = k Δx', 'Motion of the two particles'],
  [
    ['λ / 4', 'π / 2', 'one is a quarter-cycle ahead'],
    ['λ / 2', 'π', 'always moving oppositely (opposite phase)'],
    ['λ', '2π', 'always moving together (in phase)'],
    ['general', '2π Δx / λ', 'Δφ = ω Δt for the same point at two times'],
  ],
  'Table of the phase difference between two points of a wave for several separations',
);
const TSUPER = table(
  ['Phase difference', 'Resultant amplitude of two waves a₁, a₂', 'Name'],
  [
    ['0', 'a₁ + a₂', 'constructive (in phase)'],
    ['π', '|a₁ − a₂|', 'destructive (opposite phase)'],
    ['any φ', '√(a₁² + a₂² + 2 a₁ a₂ cos φ)', 'in between'],
  ],
  'Table of resultant amplitude for two waves of the same frequency at different phase differences',
);
const TSTAND = table(
  ['Feature', 'Standing wave y = 2a sin(kx) cos(ωt)'],
  [
    ['Nodes (never move)', 'kx = nπ: x = 0, λ/2, λ, …'],
    ['Antinodes (move most, amplitude 2a)', 'kx = (n + ½)π: x = λ/4, 3λ/4, …'],
    ['Spacing', 'node to node = antinode to antinode = λ/2'],
    ['Phase', 'all particles between two nodes move together; neighbouring loops move oppositely'],
    ['Energy', 'no net flow along the string, unlike a travelling wave'],
  ],
  'Table of the features of a standing wave: nodes, antinodes, spacing, phase and energy',
);
const TCOMPARE = table(
  ['', 'String fixed at both ends', 'Open pipe', 'Pipe closed at one end'],
  [
    ['Ends', 'node, node', 'antinode, antinode', 'antinode (open), node (closed)'],
    ['Length', 'L = n λ/2', 'L = n λ/2', 'L = (2n − 1) λ/4'],
    ['Frequencies', 'f = n v / 2L', 'f = n v / 2L', 'f = (2n − 1) v / 4L'],
    ['Harmonics present', 'all: f₁, 2f₁, 3f₁, …', 'all: f₁, 2f₁, 3f₁, …', 'odd only: f₁, 3f₁, 5f₁, …'],
  ],
  'Table comparing normal modes of a fixed string, an open pipe and a closed pipe',
);
const TBEAT = table(
  ['Quantity', 'Result for two waves of equal amplitude a'],
  [
    ['Resultant', 'y = 2a cos(π (f₁ − f₂) t) · sin(π (f₁ + f₂) t)'],
    ['Pitch heard', 'the average (f₁ + f₂) / 2'],
    ['Amplitude swells between', '0 and 2a'],
    ['Beat frequency', '|f₁ − f₂| loud swells per second'],
    ['Condition', 'the two frequencies are close (a few hertz apart)'],
  ],
  'Table of the resultant of two close frequencies and the beat frequency',
);
const TEX1 = table(
  ['Quantity', 'Value'],
  [
    ['Mass per unit length μ = m / L', `${dec(ex1.mu * 1000, 3)} g/m = ${ex1.mu} kg/m`],
    ['Tension T', `${ex1.T} N`],
    ['Speed v = √(T / μ)', `${dec(ex1.v, 4)} m/s`],
    ['Speed if the tension is 4 T', `${dec(ex1.v4, 4)} m/s (twice)`],
  ],
  'Table of the mass per unit length and the wave speed on a stretched string',
);
const TEX2 = table(
  ['Formula', 'Speed of sound in air at 0 °C'],
  [
    ['Newton: √(P / ρ)', `${dec(ex2.vN, 4)} m/s`],
    ['Laplace: √(γ P / ρ)', `${dec(ex2.vL, 4)} m/s`],
    ['Ratio Laplace / Newton = √γ', dec(ex2.ratio, 4)],
    ['Measured value', 'about 331 m/s'],
  ],
  'Table comparing the Newton and Laplace values of the speed of sound in air with the measured value',
);
const TEX3 = table(
  ['Quantity', 'Value'],
  [
    ['Speed at T₀ = 273 K', '331 m/s'],
    ['T₁ = 27 + 273', `${ex3.T1} K`],
    ['v₁ = v₀ √(T₁ / T₀)', `${dec(ex3.v1, 4)} m/s`],
    ['Temperature at which the speed is doubled: T = 4 T₀', `${ex3.T2} K = ${ex3.t2} °C`],
  ],
  'Table of the speed of sound at 27 degrees Celsius and the temperature at which it doubles',
);
const TEX4 = table(
  ['Read from y = 0.0050 sin(8.0 x − 2400 t)', 'Result'],
  [
    ['Amplitude a', `${ex4.A * 1000} mm`],
    ['Angular wave number k, wavelength λ = 2π / k', `${ex4.k} rad/m, ${dec(ex4.lam, 4)} m`],
    ['Angular frequency ω, frequency f = ω / 2π', `${ex4.om} rad/s, ${dec(ex4.f, 4)} Hz`],
    ['Period T = 1 / f', `${dec(ex4.T * 1000, 3)} ms`],
    ['Speed v = ω / k (towards +x)', `${ex4.v} m/s`],
    ['Maximum particle speed a ω', `${ex4.vmax} m/s`],
  ],
  'Table of quantities read from the equation of a travelling wave',
);
const TEX6 = table(
  ['Question', 'Result'],
  [
    ['Phase difference of two points 0.15 m apart, Δφ = k Δx', `${dec(ex6.dphi, 3)} rad (${dec(ex6.dphiDeg, 3)}°)`],
    ['Separation for a phase difference of π, Δx = π / k', `${dec(ex6.dxPi, 4)} m = λ / 2`],
    ['Phase difference of one point 1.0 ms apart, Δφ = ω Δt', `${dec(ex6.dphiT, 3)} rad`],
  ],
  'Table of phase differences found from the wave number and the angular frequency',
);
const TEX7 = table(
  ['Step', 'Value'],
  [
    ['ω = 2π f', `${dec(ex7.om, 4)} rad/s`],
    ['k = ω / v', `${dec(ex7.k, 4)} rad/m (λ = ${dec(ex7.lam, 3)} m)`],
    ['Direction −x', 'sign of ω t is +'],
    ['Equation', 'y = 0.0020 sin(3.70 x + 1257 t)'],
  ],
  'Table of the steps in writing the equation of a wave from its frequency, speed and amplitude',
);
const TEX8 = table(
  ['Phase difference between the waves', 'Resultant amplitude (mm)'],
  [
    ['0 (in phase)', dec(ex8.max, 3)],
    ['90° (the example)', dec(ex8.R, 3)],
    ['180° (opposite phase)', dec(ex8.min, 3)],
  ],
  'Table of the resultant amplitude of two waves of amplitude 3.0 and 4.0 millimetres for three phase differences',
);
const TEX9 = table(
  ['Quantity', 'Value'],
  [
    ['Mass per unit length μ = m / L', `${ex9.mu} kg/m`],
    ['Speed v = √(T / μ)', `${dec(ex9.v, 4)} m/s`],
    ['Distance there and back', `${2 * ex9.L} m`],
    ['Time for the round trip', `${dec(ex9.t, 3)} s`],
  ],
  'Table of the wave speed on a rope and the time for a pulse to return from the far end',
);
const TEX10 = table(
  ['Mode', 'Frequency f = n v / 2L (Hz)'],
  [['Wave speed v = √(T/μ)', `${dec(ex10.v, 4)} m/s`], ...ex10.f.map((f, i) => [`n = ${i + 1}${i === 0 ? ' (fundamental)' : ''}`, dec(f, 4)])],
  'Table of the speed and first three frequencies of a guitar string',
);
const TEX11 = table(
  ['Mode', 'Open pipe (Hz)', 'Closed pipe (Hz)'],
  [0, 1, 2].map((i) => [`${['1st', '2nd', '3rd'][i]} resonance`, dec(ex11.open[i], 4), dec(ex11.closed[i], 4)]),
  'Table of the first three resonant frequencies of an open and a closed pipe of the same length',
);
const TEX12 = table(
  ['Quantity', 'Value'],
  [
    ['Fundamental f₁', `${ex12.f1} Hz`],
    ['Length L = v / 4 f₁', `${dec(ex12.L, 3)} m`],
    ['Next resonances 3 f₁, 5 f₁', `${dec(ex12.next[0], 3)} Hz, ${dec(ex12.next[1], 3)} Hz`],
  ],
  'Table of the length of a closed pipe from its fundamental and its next two resonances',
);
const TEX13 = table(
  ['Quantity', 'Value'],
  [
    ['Frequencies', `${ex13.f1} Hz and ${ex13.f2} Hz`],
    ['Beat frequency |f₁ − f₂|', `${ex13.fb} Hz`],
    ['Time between loud swells', `${ex13.Tb} s`],
    ['Pitch heard', `${ex13.mean} Hz`],
  ],
  'Table of the beat frequency, beat period and heard pitch for two tuning forks',
);
const TEX14 = table(
  ['Quantity', 'Value'],
  [
    ['Fundamental of 0.500 m closed pipe', `${dec(ex14.f1, 4)} Hz`],
    ['Fundamental of 0.510 m closed pipe', `${dec(ex14.f2, 4)} Hz`],
    ['Beat frequency', `${dec(ex14.fb, 3)} Hz`],
  ],
  'Table of the fundamentals of two closed pipes of slightly different length and their beat frequency',
);

export const TABLES = { TTYPES, TSTRING, TSOUND, TSYM, TPHASE, TSUPER, TSTAND, TCOMPARE, TBEAT };

// ================================================================ DECK 1
export const deck1 = deck({
  part: 1,
  title: 'Waves — Part 1: Wave types, wave speed and the equation of a wave',
  goals: [
    'Distinguish transverse and longitudinal waves and calculate the speed of a wave on a string and of sound in a gas',
    'Write and interpret y = a sin(kx − ωt + φ), with amplitude, wavelength, angular wave number, period and frequency',
    'Use v = ω / k = f λ, tell particle velocity from wave velocity, and find phase differences',
  ],
  slides: [
    sl('title', 'Waves', {
      b: 'Part 1 — how a disturbance travels through a medium without the medium travelling with it.',
      v: V.snap,
      n: 'A pulse runs along a rope, a note from a sitar fills a room: in each case a disturbance travels while the material only wobbles about its place. In this part we separate the two kinds of wave, find how fast they go, and learn the equation that describes a wave moving along a line.',
    }),
    sl('concept', 'What a wave carries', {
      b: 'A **mechanical wave** is a disturbance that travels through a medium and carries energy and momentum from place to place.',
      ul: [
        'Each particle of the medium only oscillates about its mean position; the medium as a whole does not move along.',
        'The disturbance passes on because neighbouring particles are coupled by elastic forces.',
        'Mechanical waves need a material medium; the speed is set by the properties of that medium.',
        'The two basic kinds are **transverse** and **longitudinal**, according to how the particles move.',
      ],
      v: V.types,
      n: 'A mechanical wave carries energy from place to place, but no material travels along. Each particle of the medium only moves to and fro about its mean position, and passes the disturbance on to its neighbour through elastic forces. The way the particles move divides waves into two kinds, transverse and longitudinal.',
    }),
    sl('concept', 'Transverse and longitudinal waves', {
      b: 'The kind of wave depends on the direction of particle motion relative to the direction of travel.',
      ul: [
        r`In a **transverse wave** the particles move at right angles to the direction of travel; the pattern is crests and troughs, and the **wavelength** $\lambda$ is the distance between neighbouring crests.`,
        r`In a **longitudinal wave** the particles move along the direction of travel; the pattern is compressions and rarefactions, and $\lambda$ is the distance between neighbouring compressions.`,
        'Transverse waves need a medium that resists shear, so they travel in solids and on strings. Longitudinal waves travel in solids, liquids and gases: sound in air is longitudinal.',
      ],
      v: TTYPES,
      n: 'In a transverse wave the particles move at right angles to the direction of travel, giving crests and troughs. In a longitudinal wave they move along it, giving compressions and rarefactions. Transverse waves need a medium that resists shearing, so they exist in solids and on strings, while longitudinal waves can travel in solids, liquids and gases. Sound in air is longitudinal.',
    }),
    sl('concept', 'Speed of a wave on a stretched string', {
      b: r`The speed of a wave depends on the medium, not on the frequency or the amplitude. On a stretched string of tension $T$ and mass per unit length $\mu$:`,
      m: [r`v = \sqrt{\dfrac{T}{\mu}}, \qquad \mu = \dfrac{m}{L}`],
      ul: [
        'A tighter string has a stronger restoring force, so the wave goes faster; a heavier string has more inertia, so it goes slower.',
        'Quadrupling the tension doubles the speed; four times the mass per unit length halves it.',
        'Shaking one end faster changes the wavelength, not the speed.',
      ],
      v: plotStringV,
      n: 'On a stretched string the wave speed is the square root of the tension divided by the mass per unit length. Tightening the string raises the speed, a heavier string lowers it. The speed does not depend on how fast you shake the end: that changes the wavelength, not the speed. Quadrupling the tension doubles the speed.',
    }),
    sl('example', 'Worked example 1: a string of known mass', {
      b: r`A string of length $${ex1.L}$ m and mass $${ex1.m * 1000}$ g is stretched to a tension of $${ex1.T}$ N. Find the speed of a wave on it, and the speed when the tension is made four times as large.`,
      ul: [
        r`$\mu = \dfrac{m}{L} = \dfrac{${ex1.m}}{${ex1.L}} = ${ex1.mu}$ kg m$^{-1}$.`,
        r`$v = \sqrt{\dfrac{T}{\mu}} = \sqrt{\dfrac{${ex1.T}}{${ex1.mu}}} = \sqrt{${dec(ex1.T / ex1.mu, 5)}} = ${dec(ex1.v, 4)}$ m s$^{-1}$.`,
        r`With tension $4T$: $v' = \sqrt{4T/\mu} = 2v = ${dec(ex1.v4, 4)}$ m s$^{-1}$.`,
      ],
      v: TEX1,
      n: `The mass per unit length is fifteen grams over two point five metres, which is six grams per metre. The speed is the square root of one hundred and twenty divided by point zero zero six, about one hundred and forty one metres per second. If the tension is made four times larger, the speed doubles, to about two hundred and eighty three metres per second.`,
    }),
    sl('check', 'Quick check: tightening a string', {
      b: 'Choose the correct option.',
      v: plotStringV,
      chk: 'strv-mcq',
      n: 'Remember that the speed depends on the square root of the tension.',
    }),
    sl('concept', 'Speed of sound: Newton and Laplace', {
      b: 'A longitudinal wave in an elastic medium has speed $v = \\sqrt{\\text{(elastic modulus)}/\\rho}$:',
      ul: [
        r`Solid rod: $v = \sqrt{Y/\rho}$ with the Young modulus $Y$. Any fluid: $v = \sqrt{B/\rho}$ with the bulk modulus $B$.`,
        r`**Newton** assumed that the compressions and rarefactions of sound in air are slow enough for the temperature to stay constant, so $B = P$ and $v = \sqrt{P/\rho}$. For air at 0 °C this gives about 280 m s$^{-1}$, well below the measured 331 m s$^{-1}$.`,
        r`**Laplace** pointed out that the changes are so rapid that heat has no time to flow: they are **adiabatic**, so $B = \gamma P$ and $v = \sqrt{\gamma P/\rho}$, where $\gamma = C_P/C_V = 1.4$ for air.`,
        'Laplace\'s value agrees with experiment.',
      ],
      v: TSOUND,
      n: 'A longitudinal wave travels at the square root of an elastic modulus over the density. For a solid rod the modulus is the Young modulus, and for a fluid it is the bulk modulus. Newton assumed the temperature of air stays constant, and got a value much too low. Laplace saw that the changes are too quick for heat to flow, so they are adiabatic, and the factor gamma fixes the answer.',
    }),
    sl('example', 'Worked example 2: Newton against Laplace', {
      b: r`For air at 0 °C take $P = 1.013 \times 10^5$ Pa, $\rho = ${ex2.rho}$ kg m$^{-3}$ and $\gamma = ${ex2.gamma}$. Calculate the speed of sound by Newton\'s and by Laplace\'s formula.`,
      ul: [
        r`Newton: $v = \sqrt{\dfrac{P}{\rho}} = \sqrt{\dfrac{1.013 \times 10^5}{${ex2.rho}}} = ${dec(ex2.vN, 4)}$ m s$^{-1}$.`,
        r`Laplace: $v = \sqrt{\dfrac{\gamma P}{\rho}} = \sqrt{${ex2.gamma}} \times ${dec(ex2.vN, 4)} = ${dec(ex2.vL, 4)}$ m s$^{-1}$.`,
        r`The ratio is $\sqrt{\gamma} = ${dec(ex2.ratio, 4)}$; Laplace\'s value is within 0.2% of the measured 331 m s$^{-1}$.`,
      ],
      v: TEX2,
      n: `Newton's formula gives the square root of one point oh one three times ten to the five divided by one point two nine, about two hundred and eighty metres per second. Laplace's formula multiplies this by the square root of one point four, which is about one point one eight, and gives about three hundred and thirty two metres per second. That agrees with the measured value of three hundred and thirty one.`,
    }),
    sl('concept', 'Effect of temperature and pressure on the speed of sound', {
      b: r`For an ideal gas $P/\rho = RT/M$, so Laplace\'s formula becomes:`,
      m: [r`v = \sqrt{\dfrac{\gamma R T}{M}} \;\;\Rightarrow\;\; v \propto \sqrt{T}`],
      ul: [
        r`**Temperature:** the speed rises with the square root of the absolute temperature, $v_2/v_1 = \sqrt{T_2/T_1}$ (kelvin).`,
        r`**Pressure:** at constant temperature, doubling $P$ doubles $\rho$ too, so $P/\rho$ and $v$ do not change: pressure alone has no effect.`,
        'The speed also depends on the gas: a gas of lighter molecules (smaller M) carries sound faster.',
        'In air at room temperature the speed of sound is about 340 m s⁻¹, the value used in this chapter unless stated.',
      ],
      v: plotSoundT,
      n: 'For an ideal gas the ratio of pressure to density equals R T over M, so the speed of sound is the square root of gamma R T over M. It grows with the square root of the kelvin temperature. A change of pressure at constant temperature changes the density by the same factor, so the speed is unaffected. At room temperature the speed is about three hundred and forty metres per second.',
    }),
    sl('example', 'Worked example 3: sound on a warm day', {
      b: r`The speed of sound in air is $${ex3.v0}$ m s$^{-1}$ at 0 °C. Find it at $${ex3.t1}$ °C, and the temperature at which it is double the value at 0 °C.`,
      ul: [
        r`$T_0 = ${ex3.T0}$ K and $T_1 = ${ex3.t1} + 273 = ${ex3.T1}$ K, so $v_1 = ${ex3.v0}\sqrt{\dfrac{${ex3.T1}}{${ex3.T0}}} = ${dec(ex3.v1, 4)}$ m s$^{-1}$.`,
        r`Doubling the speed needs $T/T_0 = 2^2 = 4$, so $T = 4 \times ${ex3.T0} = ${ex3.T2}$ K.`,
        r`In degrees Celsius: $${ex3.T2} - 273 = ${ex3.t2}\,^\circ$C.`,
      ],
      v: TEX3,
      n: `At twenty seven degrees Celsius the temperature is three hundred kelvin. The speed grows as the square root of the temperature ratio, so it is three hundred and thirty one times the square root of three hundred over two hundred and seventy three, about three hundred and forty seven metres per second. To double the speed we need four times the absolute temperature, which is one thousand and ninety two kelvin.`,
    }),
    sl('check', 'Quick check: pressure and the speed of sound', {
      b: 'Choose the correct option.',
      v: plotSoundT,
      chk: 'presv-mcq',
      n: 'Think about what happens to the density when the pressure changes at constant temperature.',
    }),
    sl('concept', 'The equation of a progressive wave', {
      b: r`A wave travelling along $+x$ with speed $v$ gives each particle a displacement that depends on both position and time:`,
      m: [r`y(x,t) = a \sin(kx - \omega t + \phi)`],
      ul: [
        r`$a$ is the amplitude; $k = 2\pi/\lambda$ the **angular wave number**; $\omega = 2\pi f = 2\pi/T$ the angular frequency; $\phi$ the initial phase.`,
        r`The whole shape moves right at $v = \omega/k = f\lambda$: a point of constant phase $kx - \omega t$ has $\mathrm{d}x/\mathrm{d}t = \omega/k$.`,
        r`A wave moving towards $-x$ has $+\omega t$: $y = a\sin(kx + \omega t + \phi)$.`,
        'At a fixed place, the particle executes simple harmonic motion with the same ω.',
      ],
      v: TSYM,
      n: 'The displacement of a particle in a wave travelling along the positive x direction is the amplitude times the sine of k x minus omega t plus the initial phase. Here k is two pi over the wavelength and omega is two pi times the frequency. A point of constant phase moves at omega over k, which equals the frequency times the wavelength. A plus sign before omega t means travel towards negative x.',
    }),
    sl('example', 'Worked example 4: reading an equation', {
      b: r`A wave on a string is $y = 0.0050\,\sin(8.0\,x - 2400\,t)$ in SI units. Find its amplitude, wavelength, frequency, period, speed and direction of travel.`,
      ul: [
        r`Comparing with $a\sin(kx - \omega t)$: $a = 5.0$ mm, $k = ${ex4.k}$ rad m$^{-1}$, $\omega = ${ex4.om}$ rad s$^{-1}$.`,
        r`$\lambda = \dfrac{2\pi}{k} = ${dec(ex4.lam, 4)}$ m; $f = \dfrac{\omega}{2\pi} = ${dec(ex4.f, 4)}$ Hz; $T = \dfrac{1}{f} = ${dec(ex4.T * 1000, 3)}$ ms.`,
        r`$v = \dfrac{\omega}{k} = \dfrac{${ex4.om}}{${ex4.k}} = ${ex4.v}$ m s$^{-1}$, along $+x$ (the signs of $kx$ and $\omega t$ differ); check: $f\lambda = ${dec(ex4.f * ex4.lam, 4)}$ m s$^{-1}$.`,
      ],
      v: TEX4,
      n: `Compare with the standard form. The amplitude is five millimetres, k is eight radians per metre and omega is twenty four hundred radians per second. The wavelength is two pi over eight, about zero point seven eight five metres. The frequency is omega over two pi, about three hundred and eighty two hertz. The speed is omega over k, which is exactly three hundred metres per second, along the positive x direction.`,
    }),
    sl('concept', 'Particle velocity and wave velocity', {
      b: r`The wave speed $v = \omega/k$ is the speed of the **pattern**. A particle has its own velocity, found by differentiating at fixed $x$:`,
      m: [r`\dfrac{\partial y}{\partial t} = -a\omega \cos(kx - \omega t + \phi)`],
      ul: [
        r`The particle velocity oscillates between $+a\omega$ and $-a\omega$: its maximum is $a\omega$, at the rest position, and it is zero at a crest or trough.`,
        r`For the wave of Example 4 the maximum particle speed is $a\omega = ${ex4.A} \times ${ex4.om} = ${ex4.vmax}$ m s$^{-1}$, only ${dec(ex4.ratio * 100, 2)} per cent of the wave speed of ${ex4.v} m s$^{-1}$.`,
        'The two velocities are along different directions in a transverse wave and are independent quantities.',
      ],
      v: V.pvel,
      n: 'The wave speed is how fast the pattern moves. A particle has its own velocity, which comes from differentiating the displacement with respect to time. It swings between plus and minus a times omega, being largest as the particle passes its rest position and zero at a crest. In our example the largest particle speed is twelve metres per second, much smaller than the wave speed of three hundred.',
    }),
    sl('concept', 'Phase and phase difference', {
      b: r`The argument of the sine, the **phase**, tells where a particle is in its cycle.`,
      ul: [
        r`Two points a distance $\Delta x$ apart have, at the same instant, a phase difference $\Delta\phi = k\,\Delta x = \dfrac{2\pi}{\lambda}\,\Delta x$.`,
        r`The same point at two instants $\Delta t$ apart has $\Delta\phi = \omega\,\Delta t = \dfrac{2\pi}{T}\,\Delta t$.`,
        'Points a whole number of wavelengths apart are in phase; points an odd number of half-wavelengths apart are in opposite phase.',
        'The motion of a point downstream is the motion of the first point repeated a time Δx / v later.',
      ],
      v: TPHASE,
      n: 'Two points of a wave a distance delta x apart have a phase difference of k times delta x, which is two pi times delta x over the wavelength. The same particle at two instants has a phase difference of omega times delta t. Points one wavelength apart are in step, points half a wavelength apart move in opposite directions.',
    }),
    sl('example', 'Worked example 5: phase differences', {
      b: r`For the wave of Example 4 ($k = ${ex4.k}$ rad m$^{-1}$, $\omega = ${ex4.om}$ rad s$^{-1}$) find the phase difference between two points ${ex6.dx} m apart, the separation that gives a phase difference of $\pi$, and the phase change of one particle in $${ex6.dt * 1000}$ ms.`,
      ul: [
        r`$\Delta\phi = k\,\Delta x = ${ex4.k} \times ${ex6.dx} = ${dec(ex6.dphi, 3)}$ rad, which is $${dec(ex6.dphiDeg, 3)}^\circ$.`,
        r`$\Delta\phi = \pi$ needs $\Delta x = \pi/k = ${dec(ex6.dxPi, 4)}$ m, equal to $\lambda/2 = ${dec(ex4.lam / 2, 4)}$ m.`,
        r`$\Delta\phi = \omega\,\Delta t = ${ex4.om} \times ${ex6.dt} = ${dec(ex6.dphiT, 3)}$ rad.`,
      ],
      v: TEX6,
      n: `Two points fifteen centimetres apart have a phase difference of k times delta x, which is one point two radians, about sixty nine degrees. A phase difference of pi needs a separation of pi over k, about zero point three nine three metres, which is half a wavelength. One particle, in one millisecond, advances in phase by omega times delta t, two point four radians.`,
    }),
    sl('check', 'Quick check: from frequency to wavelength', {
      b: 'Compute the value.',
      v: TPHASE,
      chk: 'lam-num',
      n: 'Use the relation between speed, frequency and wavelength.',
    }),
    sl('example', 'Worked example 6: writing the equation', {
      b: r`A sound wave of frequency $${ex7.f}$ Hz and amplitude $${ex7.A * 1000}$ mm travels in the $-x$ direction at $${ex7.v}$ m s$^{-1}$. Write its equation with zero initial phase.`,
      ul: [
        r`$\omega = 2\pi f = 2\pi \times ${ex7.f} = ${dec(ex7.om, 4)}$ rad s$^{-1}$.`,
        r`$k = \dfrac{\omega}{v} = \dfrac{${dec(ex7.om, 4)}}{${ex7.v}} = ${dec(ex7.k, 4)}$ rad m$^{-1}$, equivalent to $\lambda = v/f = ${dec(ex7.lam, 3)}$ m.`,
        r`For travel along $-x$ the signs of $kx$ and $\omega t$ agree: $y = 0.0020\,\sin(${dec(ex7.k, 3)}\,x + ${dec(ex7.om, 4)}\,t)$ in SI units.`,
      ],
      v: TEX7,
      n: `The angular frequency is two pi times two hundred, about twelve hundred and fifty seven radians per second. Dividing by the speed of three hundred and forty gives k of about three point seven radians per metre. Because the wave moves towards negative x, the two terms inside the sine carry the same sign, so the equation has plus omega t.`,
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Wave types', 'transverse (⟂, crests) and longitudinal (∥, compressions)'],
          ['String', 'v = √(T/μ)'],
          ['Sound in a gas', 'v = √(γ P / ρ) = √(γ R T / M) ∝ √T; no effect of P alone'],
          ['Progressive wave', 'y = a sin(kx − ωt + φ), k = 2π/λ, ω = 2π f'],
          ['Speeds', 'wave v = ω/k = f λ; particle up to a ω'],
          ['Phase', 'Δφ = k Δx = ω Δt'],
        ],
        'Summary table of wave types, wave speeds, the progressive wave equation and phase difference',
      ),
      n: 'To sum up. A mechanical wave carries energy without carrying matter, and is transverse or longitudinal. On a string the speed is root T over mu; in a gas it is root gamma P over rho, which varies as the square root of the temperature. A progressive wave is a sine of k x minus omega t, with speed omega over k, and each particle has its own velocity, at most a times omega.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'The speed of a wave is fixed by the medium; frequency and wavelength then adjust (v = f λ).',
        'Use kelvin in v ∝ √T, and say that pressure alone does not change the speed of sound.',
        'Read k and ω straight from y = a sin(kx ∓ ωt); then λ = 2π/k, f = ω/2π, v = ω/k.',
        'Do not confuse the wave speed with the particle speed a ω.',
      ],
      v: V.snap,
      n: 'The speed of a wave is fixed by the medium. In the formula for the speed of sound use kelvin, and remember that a change of pressure alone does nothing. Read k and omega off the equation, then get the wavelength, frequency and speed. And never confuse the speed of the wave with the speed of a particle.',
    }),
  ],
});

// ================================================================ DECK 2
export const deck2 = deck({
  part: 2,
  title: 'Waves — Part 2: Superposition, standing waves and beats',
  goals: [
    'Apply the principle of superposition and describe reflection at a fixed and at a free end',
    'Explain standing waves and find the normal modes of strings and of open and closed pipes',
    'Explain beats and calculate the beat frequency',
  ],
  slides: [
    sl('title', 'Waves that meet', {
      b: 'Part 2 — what happens when two waves overlap, how a wave bounces back, and why a string or a pipe sings at certain pitches.',
      v: V.modes,
      n: 'When two waves cross, what does the medium do? When a wave reaches an end, where does it go? These two questions lead to standing waves, which explain why a guitar string or a flute plays only certain notes, and to beats, the slow throbbing you hear when two notes are almost, but not quite, the same.',
    }),
    sl('concept', 'The principle of superposition', {
      b: 'When two or more waves pass through the same point, the resultant displacement is the sum of the displacements the waves would produce separately:',
      m: [r`y = y_1 + y_2 + \cdots`],
      ul: [
        'The waves pass through one another unchanged; they only add while they overlap.',
        r`Two waves of the same frequency and amplitudes $a_1$, $a_2$ with phase difference $\phi$ give a wave of the same frequency and amplitude $\sqrt{a_1^2 + a_2^2 + 2a_1a_2\cos\phi}$.`,
        r`In phase ($\phi = 0$): amplitude $a_1 + a_2$ (**constructive**). Opposite phase ($\phi = \pi$): $|a_1 - a_2|$ (**destructive**).`,
      ],
      v: plotSuper,
      n: 'The principle of superposition says that where waves overlap, the displacements simply add. The waves then carry on unchanged. Two waves of the same frequency add to a wave of the same frequency, whose amplitude depends on the phase difference. In step, the amplitudes add, which is constructive interference. In opposite phase they subtract, which is destructive.',
    }),
    sl('example', 'Worked example 7: adding two waves', {
      b: r`Two waves of the same frequency on a string have amplitudes $${ex8.a1}$ mm and $${ex8.a2}$ mm and differ in phase by $90^\circ$. Find the resultant amplitude, and the extremes for in-phase and opposite-phase waves.`,
      ul: [
        r`$R = \sqrt{a_1^2 + a_2^2 + 2a_1a_2\cos 90^\circ} = \sqrt{${ex8.a1 ** 2} + ${ex8.a2 ** 2} + 0} = ${dec(ex8.R, 3)}$ mm.`,
        r`In phase: $${ex8.a1} + ${ex8.a2} = ${dec(ex8.max, 3)}$ mm. Opposite phase: $${ex8.a2} - ${ex8.a1} = ${dec(ex8.min, 3)}$ mm.`,
        'The resultant is never larger than the sum or smaller than the difference of the amplitudes.',
      ],
      v: TEX8,
      n: `With a phase difference of ninety degrees the cosine term vanishes, and the resultant amplitude is the square root of nine plus sixteen, which is five millimetres. If the waves were in step, it would be seven millimetres, and in opposite phase just one millimetre. So the resultant always lies between the difference and the sum.`,
    }),
    sl('concept', 'Reflection of waves', {
      b: 'A wave that reaches the end of its medium is reflected. What happens depends on the boundary:',
      ul: [
        '**Fixed end** (a string tied to a wall): the displacement there must stay zero, so the reflected pulse is inverted; the phase changes by π, as if it were reflected from a path half a wavelength longer.',
        '**Free end** (a ring on a smooth rod): the end moves freely, and the pulse is reflected without inversion; the displacement there doubles at the moment of arrival.',
        'The speed and wavelength of the reflected wave are the same as before, since the medium has not changed.',
        'The reflected wave and the incident wave travel in opposite directions and superpose: this makes standing waves.',
      ],
      v: V.reflect,
      n: 'At a fixed end the string cannot move, so the reflected pulse comes back upside down, a phase change of pi. At a free end the string moves freely and the pulse returns the same way up. The speed and wavelength of the reflected wave are unchanged. The incident and the reflected waves then overlap and superpose, and that gives standing waves.',
    }),
    sl('example', 'Worked example 8: a pulse on a rope', {
      b: r`A rope of length $${ex9.L}$ m and mass $${ex9.m}$ kg is stretched with a tension of $${ex9.T}$ N between two fixed supports. A pulse started at one end is reflected from the other. How long does it take to return?`,
      ul: [
        r`$\mu = ${ex9.m}/${ex9.L} = ${ex9.mu}$ kg m$^{-1}$, so $v = \sqrt{\dfrac{${ex9.T}}{${ex9.mu}}} = ${dec(ex9.v, 4)}$ m s$^{-1}$.`,
        r`The pulse covers $2L = ${2 * ex9.L}$ m, so $t = \dfrac{2L}{v} = \dfrac{${2 * ex9.L}}{${dec(ex9.v, 4)}} = ${dec(ex9.t, 3)}$ s.`,
        'It returns inverted, because the far end is fixed.',
      ],
      v: TEX9,
      n: `The mass per unit length is a quarter of a kilogram per metre, so the speed is the square root of seventy five over point two five, about seventeen point three metres per second. The pulse travels twenty four metres there and back, which takes about one point three nine seconds. It returns upside down, since the far end is fixed.`,
    }),
    sl('concept', 'Standing waves', {
      b: r`Two waves of equal amplitude and frequency travelling in opposite directions superpose into a **standing wave**:`,
      m: [r`y = a\sin(kx - \omega t) + a\sin(kx + \omega t) = 2a\sin(kx)\cos(\omega t)`],
      ul: [
        r`**Nodes** (always at rest): $\sin kx = 0$, i.e. $x = 0, \dfrac{\lambda}{2}, \lambda, \dots$. **Antinodes** (amplitude $2a$): $x = \dfrac{\lambda}{4}, \dfrac{3\lambda}{4}, \dots$`,
        r`Neighbouring nodes (or antinodes) are $\lambda/2$ apart.`,
        'All particles between two nodes move in step; neighbouring loops move oppositely.',
        'Unlike a travelling wave, a standing wave carries no net energy along the medium.',
      ],
      v: plotStand,
      n: 'Superpose two equal waves travelling in opposite directions and you get two a sine of k x times cosine of omega t. The shape does not travel. Points where sine k x is zero never move: these are nodes, half a wavelength apart. Halfway between them are antinodes, where the amplitude is twice that of each wave. No energy flows along a standing wave.',
    }),
    sl('check', 'Quick check: node spacing', {
      b: 'Compute the value.',
      v: plotStand,
      chk: 'nodesp-num',
      n: 'Neighbouring nodes are half a wavelength apart.',
    }),
    sl('concept', 'Normal modes of a stretched string', {
      b: r`A string of length $L$ fixed at both ends must have a node at each end, so only certain standing waves fit:`,
      m: [r`L = n\,\dfrac{\lambda_n}{2} \;\Rightarrow\; \lambda_n = \dfrac{2L}{n}, \qquad f_n = \dfrac{v}{\lambda_n} = \dfrac{n v}{2L} = \dfrac{n}{2L}\sqrt{\dfrac{T}{\mu}}, \quad n = 1, 2, 3, \dots`],
      ul: [
        r`$n = 1$ is the **fundamental** (first harmonic) $f_1 = v/2L$; $f_2 = 2f_1$, $f_3 = 3f_1$ are the higher **harmonics** (overtones).`,
        'The nth mode has n loops and n + 1 nodes, including the two ends.',
        'Shorter, tighter or lighter strings give a higher pitch; pressing a guitar string against a fret shortens L.',
      ],
      v: V.modes,
      n: 'Because both ends of the string are fixed, each end must be a node. That allows only wavelengths of two L over n, where n is a whole number. The frequencies are then n times v over two L, all multiples of the fundamental. The nth mode has n loops. A higher pitch comes from a shorter, tighter or lighter string.',
    }),
    sl('example', 'Worked example 9: a guitar string', {
      b: r`A guitar string of length $${ex10.L}$ m and mass per unit length $${ex10.mu * 1000}$ g m$^{-1}$ is under a tension of $${ex10.T}$ N. Find the speed of a wave on it and its three lowest natural frequencies.`,
      ul: [
        r`$v = \sqrt{T/\mu} = \sqrt{\dfrac{${ex10.T}}{${ex10.mu}}} = ${dec(ex10.v, 4)}$ m s$^{-1}$.`,
        r`$f_1 = \dfrac{v}{2L} = \dfrac{${dec(ex10.v, 4)}}{2 \times ${ex10.L}} = ${dec(ex10.f[0], 4)}$ Hz.`,
        r`$f_2 = 2f_1 = ${dec(ex10.f[1], 4)}$ Hz and $f_3 = 3f_1 = ${dec(ex10.f[2], 4)}$ Hz.`,
      ],
      v: TEX10,
      n: `The wave speed is the square root of one hundred and fifty over point zero zero one, about three hundred and eighty seven metres per second. The fundamental is the speed over twice the length, about two hundred and ninety eight hertz. The next two frequencies are twice and three times that, about five hundred and ninety six and eight hundred and ninety four hertz.`,
    }),
    sl('concept', 'Normal modes of air columns: organ pipes', {
      b: 'Sound in a pipe is a longitudinal standing wave. The air moves freely at an open end (a displacement **antinode**) and cannot move at a closed end (a **node**).',
      ul: [
        r`**Open pipe** (both ends open): $L = n\lambda/2$, so $f_n = \dfrac{n v}{2L}$ for $n = 1, 2, 3, \dots$: all harmonics.`,
        r`**Pipe closed at one end**: $L = (2n - 1)\lambda/4$, so $f_n = \dfrac{(2n - 1)v}{4L}$: only the **odd** harmonics $f_1, 3f_1, 5f_1, \dots$`,
        'For the same length, the closed pipe\'s fundamental is half that of the open pipe: it sounds an octave lower.',
        'End corrections are neglected here.',
      ],
      v: V.pipes,
      n: 'In a pipe the air is free to move at an open end, so there is a displacement antinode, but at a closed end there is a node. An open pipe fits half wavelengths, so it sounds every harmonic, n times v over two L. A pipe closed at one end fits odd quarter wavelengths, so it sounds only the odd harmonics, and its fundamental is half that of an open pipe of the same length.',
    }),
    sl('example', 'Worked example 10: two pipes of one length', {
      b: r`An open pipe and a pipe closed at one end are each $${ex11.L}$ m long. Taking the speed of sound as $${ex11.v}$ m s$^{-1}$, find their three lowest resonant frequencies.`,
      ul: [
        r`Open: $f_n = \dfrac{n v}{2L} = n \times \dfrac{${ex11.v}}{2 \times ${ex11.L}} = n \times ${dec(ex11.open[0], 4)}$ Hz: $${dec(ex11.open[0], 4)}$, $${dec(ex11.open[1], 4)}$, $${dec(ex11.open[2], 4)}$ Hz.`,
        r`Closed: $f_n = \dfrac{(2n-1)v}{4L}$, so $f_1 = \dfrac{${ex11.v}}{4 \times ${ex11.L}} = ${dec(ex11.closed[0], 4)}$ Hz, then $3f_1 = ${dec(ex11.closed[1], 4)}$ Hz and $5f_1 = ${dec(ex11.closed[2], 4)}$ Hz.`,
      ],
      v: TEX11,
      n: `For the open pipe the fundamental is three hundred and forty over twice zero point four two five, which is four hundred hertz, and the others are eight hundred and twelve hundred. For the closed pipe the fundamental is three hundred and forty over four times the length, two hundred hertz, followed by six hundred and one thousand.`,
    }),
    sl('check', 'Quick check: which notes can a closed pipe sound?', {
      b: 'Choose the correct option.',
      v: V.pipes,
      chk: 'closedodd-mcq',
      n: 'Only odd multiples of the fundamental appear.',
    }),
    sl('concept', 'String, open pipe and closed pipe compared', {
      b: 'The same idea, fit the standing wave to the boundary conditions, gives all three:',
      ul: [
        'Fixed string and open pipe: the same formula f = n v / 2L, with n = 1, 2, 3, … (nodes at both ends of a string; antinodes at both ends of an open pipe).',
        'Closed pipe: f = (2n − 1) v / 4L: node at the closed end and antinode at the open end.',
        'In every case the wave speed v is set by the medium (v = √(T/μ) for the string, the speed of sound for the air column).',
        'A note with all harmonics (string, open pipe) and one with only odd harmonics (closed pipe) sound different: this is why instruments have different tones.',
      ],
      v: TCOMPARE,
      n: 'This table compares the three systems. A string fixed at both ends and an open pipe share the same formula, n v over two L, with all harmonics. A pipe closed at one end follows two n minus one times v over four L, which gives only the odd harmonics. In each case the speed comes from the medium, and the boundary conditions pick out the allowed frequencies.',
    }),
    sl('example', 'Worked example 11: length of a closed pipe', {
      b: r`A pipe closed at one end resonates in its fundamental mode with a tuning fork of frequency $${ex12.f1}$ Hz. Find the length of the pipe and its next two resonant frequencies. Take $v = ${ex12.v}$ m s$^{-1}$.`,
      ul: [
        r`$f_1 = \dfrac{v}{4L} \Rightarrow L = \dfrac{v}{4f_1} = \dfrac{${ex12.v}}{4 \times ${ex12.f1}} = ${dec(ex12.L, 3)}$ m.`,
        r`The next resonances are the odd harmonics: $3f_1 = ${dec(ex12.next[0], 3)}$ Hz and $5f_1 = ${dec(ex12.next[1], 3)}$ Hz.`,
        'There is no resonance at 340 Hz, the second harmonic, in a closed pipe.',
      ],
      v: TEX12,
      n: `The fundamental of a closed pipe is the speed over four times the length, so the length is three hundred and forty over four times one hundred and seventy, which is half a metre. The next resonances are three and five times the fundamental, five hundred and ten and eight hundred and fifty hertz. A closed pipe has no resonance at twice the fundamental.`,
    }),
    sl('concept', 'Beats', {
      b: r`Two notes of **nearly equal** frequencies $f_1$ and $f_2$ reach the ear together; the loudness swells and fades regularly. Each swell is a **beat**.`,
      m: [r`y_1 + y_2 = 2a\cos\!\big(\pi (f_1 - f_2)\,t\big)\,\sin\!\big(\pi (f_1 + f_2)\,t\big)`],
      ul: [
        r`The note has the average frequency $(f_1+f_2)/2$ and an amplitude that varies slowly between $0$ and $2a$.`,
        r`The intensity peaks $|f_1 - f_2|$ times each second: the **beat frequency** is $f_b = |f_1 - f_2|$.`,
        'Beats are heard only when the two frequencies differ by a few hertz; for larger differences the ear hears two separate notes.',
        'Musicians use beats to tune: the beats slow down and stop when the two notes match.',
      ],
      v: V.beats,
      n: 'When two notes of nearly equal frequency sound together, their sum has the average frequency but an amplitude that swells and fades. The sum of the two sines is two a times cosine of pi times the difference, times sine of pi times the sum. Each loud swell is a beat, and the number of beats per second is the difference of the two frequencies. Musicians tune by listening for the beats to slow down and stop.',
    }),
    sl('example', 'Worked example 12: two tuning forks', {
      b: r`Two tuning forks of frequencies $${ex13.f1}$ Hz and $${ex13.f2}$ Hz are sounded together. Find the beat frequency, the time between loud swells and the pitch that is heard.`,
      ul: [
        r`$f_b = |f_1 - f_2| = |${ex13.f1} - ${ex13.f2}| = ${ex13.fb}$ Hz: ${ex13.fb} loud swells per second.`,
        r`Time between swells $= \dfrac{1}{f_b} = \dfrac{1}{${ex13.fb}} = ${ex13.Tb}$ s.`,
        r`The pitch heard is the average $\dfrac{${ex13.f1} + ${ex13.f2}}{2} = ${ex13.mean}$ Hz.`,
      ],
      v: TEX13,
      n: `The beat frequency is the difference of the two frequencies, two hundred and sixty minus two hundred and fifty six, which is four hertz: four loud swells every second, one every quarter of a second. The pitch you actually hear is the average of the two frequencies, two hundred and fifty eight hertz.`,
    }),
    sl('example', 'Worked example 13: beats from two pipes', {
      b: r`Two pipes closed at one end, of lengths $${ex14.L1}$ m and $${ex14.L2}$ m, sound their fundamentals together. Take $v = ${ex14.v}$ m s$^{-1}$ and find the beat frequency.`,
      ul: [
        r`$f_1 = \dfrac{v}{4L_1} = \dfrac{${ex14.v}}{4 \times ${ex14.L1}} = ${dec(ex14.f1, 4)}$ Hz.`,
        r`$f_2 = \dfrac{${ex14.v}}{4 \times ${ex14.L2}} = ${dec(ex14.f2, 4)}$ Hz.`,
        r`$f_b = f_1 - f_2 = ${dec(ex14.f1, 4)} - ${dec(ex14.f2, 4)} = ${dec(ex14.fb, 3)}$ Hz.`,
      ],
      v: TEX14,
      n: `The shorter pipe has a fundamental of one hundred and seventy hertz. The longer one has a fundamental of about one hundred and sixty six point seven hertz. The difference, about three point three three hertz, is the beat frequency: a slow throb of between three and four swells every second.`,
    }),
    sl('check', 'Quick check: beats', {
      b: 'Judge the assertion and the reason.',
      v: TBEAT,
      chk: 'beat-ar',
      n: 'Ask yourself whether two waves of different frequencies can stay in step, and count the swells from the difference of the frequencies.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Superposition', 'y = y₁ + y₂; amplitudes a₁ + a₂ to |a₁ − a₂| for equal frequency'],
          ['Reflection', 'fixed end: inverted (phase π); free end: upright'],
          ['Standing wave', 'y = 2a sin kx cos ωt; nodes λ/2 apart'],
          ['String, open pipe', 'f = n v / 2L, n = 1, 2, 3, …'],
          ['Closed pipe', 'f = (2n − 1) v / 4L: odd harmonics only'],
          ['Beats', 'f_b = |f₁ − f₂|'],
        ],
        'Summary table of superposition, reflection, standing waves in strings and pipes, and beats',
      ),
      n: 'To sum up. Waves add where they overlap. A wave reflected at a fixed end is inverted; at a free end it is not. An incident wave and its reflection make a standing wave with nodes half a wavelength apart. A string and an open pipe have all harmonics, n v over two L, a closed pipe only the odd ones, and two close notes give beats at the difference of their frequencies.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'For a string or a pipe, first say what is at each end (node or antinode); the boundary conditions give the formula.',
        'Closed pipe: only odd harmonics, f = (2n − 1) v / 4L; its fundamental is half that of an open pipe of equal length.',
        'The nth harmonic of a string has n loops and n + 1 nodes including the ends.',
        'Beat frequency is the difference |f₁ − f₂|; the pitch heard is the average.',
      ],
      v: TSTAND,
      n: 'For a string or pipe, first state what is at each end, a node or an antinode, and the formula follows. A closed pipe has only the odd harmonics, and its fundamental is half that of an open pipe of the same length. The nth harmonic of a string has n loops. And the beat frequency is the difference of the two frequencies, while the pitch you hear is their average.',
    }),
  ],
});

void sci;
void sciu;
void w;
void ws;
