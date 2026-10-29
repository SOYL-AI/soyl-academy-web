// ch07 further items added in the verifier pass (bank size margin, AR key spread, application share). Imported last.
import { mk, add, r, dec, near } from '../../cbse-12-physics-ch01/src/lib.mjs';

const { mcq, ar, tf, num } = mk;

add('inductorDC-ar', ar({
  a: 'An ideal inductor offers a large opposition to a steady direct current.',
  r: 'The reactance of an inductor is ωL, which is proportional to frequency.',
  key: 'd',
  sol: 'R is true. A is false: for DC, ω = 0, so X_L = 0 and an ideal inductor offers no opposition — option (d).',
  d: 2, c: 'understanding', t: [2],
}));
add('VLVC-ar', ar({
  a: 'In a series LCR circuit, the rms voltages across R, L and C cannot be added arithmetically to give the supply voltage.',
  r: 'These voltages are not in phase with one another.',
  key: 'a',
  sol: 'Both true; because V_L and V_C are ±90° from V_R, they add as phasors, not as numbers — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('gen-ar', ar({
  a: 'The emf of an AC generator is zero when the plane of its coil is perpendicular to the magnetic field.',
  r: 'The flux through the coil is zero when its plane is perpendicular to the field.',
  key: 'c',
  sol: 'A is true. R is false: in that position the flux is MAXIMUM (but momentarily not changing), which is why the emf is zero — option (c).',
  d: 3, c: 'analysis', t: [5],
}));
add('stepup-tf', tf({
  stem: 'A step-up transformer increases the voltage and also increases the power delivered.',
  key: 'f',
  sol: 'False. An ideal transformer conserves power: if it steps the voltage up, it steps the current down by the same ratio; a real one delivers slightly less power than it takes.',
  d: 1, c: 'understanding', t: [5],
}));
const two = { XL: 2 * Math.PI * 50 * 0.1 };
add('freqchange-num', num({
  stem: 'A coil of negligible resistance draws 2.0 A from a 220 V, 50 Hz supply. What current will it draw from a 220 V, 100 Hz supply? Answer in amperes.',
  value: 1, tol: 0.02, unit: 'A',
  sol: r`At 50 Hz, $X_L = \dfrac{220}{2.0} = 110$ Ω. Doubling the frequency doubles $X_L$ to 220 Ω, so $I = \dfrac{220}{220} = 1$ A.`,
  scheme: [['X_L doubles to 220 Ω', 1], ['I = 1.0 A', 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(220 / (2 * (220 / 2)), q.answer.value) || 'I');
void two;
const rf = { V: 10, R: 5 };
add('resI-mcq', mcq({
  stem: 'A series LCR circuit with R = 5.0 Ω is connected to a 10 V rms supply whose frequency is adjusted to resonance. The rms current is',
  right: '2.0 A',
  wrong: ['0.50 A', 'zero', 'infinite'],
  sol: r`At resonance Z = R, so $I = \dfrac{10}{5.0} = 2$ A — option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => near(rf.V / rf.R, 2) || 'res');
add('capdouble-mcq', mcq({
  stem: 'In a series LCR circuit at resonance, the capacitance is made four times larger. To restore resonance at the same frequency, the inductance must be',
  right: 'reduced to one quarter',
  wrong: ['made four times larger', 'halved', 'left unchanged'],
  sol: 'ω₀ = 1/√(LC) is unchanged only if LC is unchanged, so L must become L/4 — option (@K).',
  d: 3, c: 'application', t: [3],
}));
const ph = { R: 50, Z: 100 };
add('pfangle-num', num({
  stem: 'A series AC circuit has resistance 50 Ω and impedance 100 Ω. Find the phase angle between the voltage and the current, in degrees.',
  value: 60, tol: 0.5, unit: '°',
  sol: r`$\cos\phi = \dfrac{R}{Z} = \dfrac{50}{100} = 0.5$, so $\phi = 60$ degrees.`,
  scheme: [['cos φ = R/Z = 0.5', 0.5], ['φ = 60°', 0.5]],
  d: 2, c: 'application', t: [4],
}), (q) => near((Math.acos(ph.R / ph.Z) * 180) / Math.PI, q.answer.value) || 'phi');
const ch = { Vp: 220, Vs: 5, Ns: 50 };
ch.Np = (ch.Ns * ch.Vp) / ch.Vs;
add('charger-num', num({
  stem: 'A transformer in a mains adaptor steps 220 V down to 5.0 V. Its secondary has 50 turns. How many turns does the primary have?',
  value: ch.Np, tol: 2, unit: null,
  sol: r`$N_p = N_s\dfrac{V_p}{V_s} = 50 \times \dfrac{220}{5.0} = ${dec(ch.Np, 4)}$ turns.`,
  scheme: [['N_p = N_sV_p/V_s = 2200', 1]],
  d: 2, c: 'application', t: [5],
}), (q) => near(ch.Np, q.answer.value) || 'Np');
