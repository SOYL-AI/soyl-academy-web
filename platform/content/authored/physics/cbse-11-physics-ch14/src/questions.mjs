// ch14 Waves — question bank, part 1: t01 (wave types, wave speed) and t02 (the equation of a progressive wave).
// Every numerical is computed here and re-solved by an independent `check`; solutions and schemes print the computed values.
// AR keys across the chapter: a (tension), d (ampv), c (phase), b (fret), c (beat).
import { mk, add, r, dec, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { PI, V_AIR, R, stringV, rodV, newtonV, laplaceV, gasVT, v3, tl, ddx, maxAbs } from './phys.mjs';

const { mcq, ar, tf, fill, num, short } = mk;

// ================================================================ t01 wave types and wave speed
add('wavetype-mcq', mcq({
  stem: 'At a concert in Kolkata the sound of a tabla travels through the hall as a wave in air. The motion of the air molecules in this wave is correctly described by which statement?',
  right: 'They oscillate back and forth along the direction in which the sound travels',
  wrong: ['They oscillate up and down at right angles to the direction in which the sound travels', 'They travel with the sound from the tabla to the listeners', 'They move in circles in a plane perpendicular to the direction of the sound'],
  sol: 'Sound in air is a longitudinal wave: each molecule oscillates about its mean position along the direction of travel, forming compressions and rarefactions, while the molecules themselves do not travel with the sound — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('rail-mcq', mcq({
  stem: 'Which of the following can carry both a transverse wave and a longitudinal wave?',
  right: 'A long steel rail',
  wrong: ['The air in a closed hall', 'The bulk of the water in a large tank', 'The empty space between the Earth and the Moon'],
  sol: 'Transverse waves need a medium that resists shear, so a solid can carry both kinds. The bulk of a gas or a liquid cannot resist shear and carries only longitudinal waves, and empty space carries no mechanical wave at all — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
const st4 = { T: 100, mu: 0.004 };
add('strv-mcq', mcq({
  stem: 'A sitar wire of fixed mass and length is tightened until its tension is four times the earlier value. The speed of a transverse wave on the wire becomes',
  right: 'twice the earlier speed',
  wrong: ['four times the earlier speed', 'half the earlier speed', 'unchanged, because the mass of the wire has not changed'],
  sol: r`$v = \sqrt{T/\mu}$ with $\mu$ fixed, so $v \propto \sqrt{T}$ and $v$ is multiplied by $\sqrt{4} = 2$ — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => near(stringV(4 * st4.T, st4.mu) / stringV(st4.T, st4.mu), 2, 1e-12) || 'strv');
add('freq-tf', tf({
  stem: 'A student shakes one end of a long rope twice as fast as before. The waves on the rope then travel along it at twice their earlier speed.',
  key: 'f',
  sol: 'False. The speed is fixed by the tension and the mass per unit length of the rope. Shaking faster doubles the frequency, so the wavelength halves, but the speed stays the same (v = fλ).',
  d: 2, c: 'understanding', t: [1],
}));
add('adiab-fill', fill({
  stem: 'Laplace argued that the compressions and rarefactions of a sound wave in air follow one another so rapidly that no heat can flow between neighbouring layers, so the changes are ___ rather than isothermal.',
  acc: [['adiabatic', 'Adiabatic']],
  sol: 'The changes are **adiabatic**; this is why the factor γ appears in Laplace\'s formula.',
  d: 1, c: 'recall', t: [1],
}));
add('laplace-mcq', mcq({
  stem: 'Newton\'s formula v = √(P/ρ) gave about 280 m s⁻¹ for sound in air at 0 °C, which is less than the measured 331 m s⁻¹. Laplace removed the discrepancy by',
  right: 'treating the changes in the air as adiabatic, which multiplies Newton\'s value by √γ',
  wrong: ['treating the changes in the air as isothermal, which multiplies Newton\'s value by γ', 'assuming that the air is at a higher pressure than one atmosphere', 'adding the speed of the wind to Newton\'s value'],
  sol: 'For adiabatic changes the bulk modulus of a gas is γP, not P, so v = √(γP/ρ) = √γ × 280 ≈ 331 m s⁻¹ with γ = 1.4 — option (@K).',
  d: 2, c: 'understanding', t: [1],
}), () => near(Math.sqrt(1.4) * 280, 331.3, 0.003) || 'laplace-mcq');
add('tempv-mcq', mcq({
  stem: 'Treating air as an ideal gas, the speed of sound at 27 °C is v₁. At 327 °C the speed of sound is',
  right: '√2 times v₁',
  wrong: ['2 times v₁', 'about 12 times v₁, in the ratio of the Celsius readings', 'equal to v₁, because the speed does not depend on temperature'],
  sol: r`$v \propto \sqrt{T}$ with $T$ in kelvin: $T_1 = 300$ K and $T_2 = 600$ K, so $v_2/v_1 = \sqrt{600/300} = \sqrt{2}$ — option (@K).`,
  d: 3, c: 'application', t: [1],
}), () => near(gasVT(1.4, 600, 0.029) / gasVT(1.4, 300, 0.029), Math.SQRT2, 1e-12) || 'tempv');

const sn = { m: 0.012, L: 1.5, T: 64 };
sn.mu = sn.m / sn.L;
sn.v = stringV(sn.T, sn.mu);
add('string-num', num({
  stem: 'A uniform string of mass 12 g and length 1.50 m is stretched to a tension of 64 N. Find the speed of a transverse wave on it, in m s⁻¹ (3 significant figures).',
  value: v3(sn.v), tol: tl(sn.v), unit: 'm/s',
  sol: r`$\mu = \dfrac{m}{L} = \dfrac{0.012}{1.50} = ${sn.mu}$ kg m$^{-1}$, and $v = \sqrt{\dfrac{T}{\mu}} = \sqrt{\dfrac{64}{${sn.mu}}} = \sqrt{${dec(sn.T / sn.mu, 5)}} = ${dec(sn.v, 3)}$ m s$^{-1}$.`,
  scheme: [[`Mass per unit length μ = m/L = ${sn.mu} kg m⁻¹`, 1], [`v = √(T/μ) = ${dec(sn.v, 3)} m s⁻¹`, 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(q.answer.value ** 2 * sn.mu, sn.T, 0.01) || 'string');
const tn = { mu: 4.5e-3, v: 220 };
tn.T = tn.mu * tn.v ** 2;
add('tension-num', num({
  stem: 'A wire has a mass per unit length of 4.5 g m⁻¹. What tension is needed for transverse waves to travel along it at 220 m s⁻¹? Give the answer in N (3 significant figures).',
  value: v3(tn.T), tol: tl(tn.T), unit: 'N',
  sol: r`From $v = \sqrt{T/\mu}$, $T = \mu v^2 = 4.5 \times 10^{-3} \times ${tn.v}^2 = 4.5 \times 10^{-3} \times ${tn.v ** 2} = ${dec(tn.T, 3)}$ N.`,
  scheme: [['T = μv² from v = √(T/μ), μ = 4.5 × 10⁻³ kg m⁻¹', 1], [`T = ${dec(tn.T, 3)} N`, 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(stringV(q.answer.value, tn.mu), tn.v, 0.01) || 'tension');
const sr = { Y: 2.0e11, rho: 7800 };
sr.v = rodV(sr.Y, sr.rho);
add('steel-num', num({
  stem: 'The Young modulus of steel is 2.0 × 10¹¹ Pa and its density is 7800 kg m⁻³ (data for this question). Find the speed of a longitudinal wave along a long steel rail, in m s⁻¹ (3 significant figures).',
  value: v3(sr.v), tol: tl(sr.v), unit: 'm/s',
  sol: r`In a solid, $v = \sqrt{\dfrac{Y}{\rho}} = \sqrt{\dfrac{2.0 \times 10^{11}}{7800}} = \sqrt{${dec(sr.Y / sr.rho, 4)}} = ${dec(sr.v, 3)}$ m s$^{-1}$.`,
  scheme: [['v = √(Y/ρ) for a longitudinal wave in a solid', 1], [`v = ${dec(sr.v, 3)} m s⁻¹`, 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(q.answer.value ** 2 * sr.rho, sr.Y, 0.01) || 'steel');
const ag = { gamma: 1.67, P: 1.013e5, rho: 1.78, T: 273, M: 39.9e-3 };
ag.v = laplaceV(ag.gamma, ag.P, ag.rho);
add('laplace-num', num({
  stem: 'Argon behaves as an ideal gas with γ = C_P/C_V = 1.67. At 1.013 × 10⁵ Pa and 0 °C its density is 1.78 kg m⁻³. Using Laplace\'s formula, find the speed of sound in argon, in m s⁻¹ (3 significant figures).',
  value: v3(ag.v), tol: tl(ag.v), unit: 'm/s',
  sol: r`$v = \sqrt{\dfrac{\gamma P}{\rho}} = \sqrt{\dfrac{1.67 \times 1.013 \times 10^5}{1.78}} = \sqrt{${dec((ag.gamma * ag.P) / ag.rho, 5)}} = ${dec(ag.v, 3)}$ m s$^{-1}$.`,
  scheme: [['Laplace: v = √(γP/ρ) with the data in SI units', 1], [`v = ${dec(ag.v, 3)} m s⁻¹`, 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(gasVT(ag.gamma, ag.T, ag.M), q.answer.value, 0.01) || 'laplace-num');
const pl = { L: 18, m: 4.5, T: 200 };
pl.mu = pl.m / pl.L;
pl.v = stringV(pl.T, pl.mu);
pl.t = pl.L / pl.v;
add('pulse-num', num({
  stem: 'A heavy rope of length 18 m and mass 4.5 kg is stretched between two posts with a tension of 200 N. A pulse is sent from one post. How long does it take to reach the other post? Give the answer in s (3 significant figures).',
  value: v3(pl.t), tol: tl(pl.t), unit: 's',
  sol: r`$\mu = \dfrac{4.5}{18} = ${pl.mu}$ kg m$^{-1}$, so $v = \sqrt{\dfrac{T}{\mu}} = \sqrt{\dfrac{200}{${pl.mu}}} = ${dec(pl.v, 4)}$ m s$^{-1}$. Time $= \dfrac{L}{v} = \dfrac{18}{${dec(pl.v, 4)}} = ${dec(pl.t, 3)}$ s.`,
  scheme: [[`μ = m/L = ${pl.mu} kg m⁻¹`, 1], [`v = √(T/μ) = ${dec(pl.v, 4)} m s⁻¹`, 1], [`t = L/v = ${dec(pl.t, 3)} s`, 1]],
  marks: 3, d: 3, c: 'application', t: [1],
}), (q) => near((q.answer.value * q.answer.value * pl.T) / pl.mu, pl.L ** 2, 0.02) || 'pulse');
add('wavetype-short', short({
  marks: 2,
  stem: 'Distinguish between a transverse wave and a longitudinal wave, giving one example of each.',
  model: 'In a **transverse** wave the particles of the medium oscillate at right angles to the direction in which the wave travels, forming crests and troughs; a wave on a stretched string is an example. In a **longitudinal** wave the particles oscillate along the direction of travel, forming compressions and rarefactions; sound in air is an example.',
  sol: 'Particle motion perpendicular or parallel to the direction of travel; examples.',
  scheme: [['Transverse: particle motion at right angles to the direction of travel; example', 1], ['Longitudinal: particle motion along the direction of travel; example', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('newton-short', short({
  marks: 2,
  stem: 'Why did Newton\'s formula for the speed of sound in air give a value that was too low, and what change did Laplace make to it?',
  model: 'Newton assumed that the temperature of the air stays constant, so the bulk modulus equals the pressure P. Laplace showed that the changes in a sound wave are too rapid for heat to flow, so they are **adiabatic** and the bulk modulus is γP; the speed becomes √(γP/ρ), larger by √γ, which agrees with experiment.',
  sol: 'Isothermal assumption; adiabatic, B = γP.',
  scheme: [['Newton assumed isothermal changes, B = P, giving √(P/ρ), too low', 1], ['Laplace: adiabatic changes, B = γP, so v = √(γP/ρ), in agreement with experiment', 1]],
  d: 3, c: 'understanding', t: [1],
}));
add('presdep-short3', short({
  marks: 3,
  stem: 'Starting from v = √(γP/ρ) for an ideal gas, show that the speed of sound does not change when the pressure of the gas is changed at constant temperature, and that it varies as the square root of the absolute temperature.',
  model: r`For $n$ moles of an ideal gas, $P V = n R T$, so the density $\rho = M n/V = \dfrac{P M}{R T}$ and $\dfrac{P}{\rho} = \dfrac{R T}{M}$. Hence $v = \sqrt{\dfrac{\gamma P}{\rho}} = \sqrt{\dfrac{\gamma R T}{M}}$. At constant $T$ a change of $P$ changes $\rho$ in the same ratio, so $P/\rho$ and the speed are unchanged. The speed varies as $\sqrt{T}$, with $T$ in kelvin.`,
  sol: 'P/ρ = RT/M; v = √(γRT/M).',
  scheme: [['ρ = PM/RT, so P/ρ = RT/M', 1], ['v = √(γRT/M): pressure cancels, no effect at constant T', 1], ['v ∝ √T (kelvin)', 1]],
  wl: null, d: 3, c: 'understanding', t: [1],
}));
add('tension-ar', ar({
  a: 'The speed of a transverse wave on a stretched string increases when the string is tightened.',
  r: 'A larger tension increases the restoring force on a displaced piece of the string while its mass per unit length stays the same.',
  key: 'a',
  sol: 'A is true: v = √(T/μ) grows with T. R is true and explains it: a stronger restoring force on the same mass per unit length makes the disturbance pass on faster — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('ampv-ar', ar({
  a: 'Making the waves on a string larger in amplitude makes them travel faster along it.',
  r: 'The speed of a wave on a string is determined by the tension and the mass per unit length of the string.',
  key: 'd',
  sol: 'A is false: the speed depends only on √(T/μ), not on the amplitude. R is true — option (d).',
  d: 2, c: 'understanding', t: [1],
}));

// ================================================================ t02 equation of a progressive wave
add('kw-mcq', mcq({
  stem: 'A wave on a rope is described by y = 0.020 sin(5.0x − 300t) in SI units. Its speed and direction of travel are',
  right: '60 m s⁻¹ along +x',
  wrong: ['60 m s⁻¹ along −x', '1500 m s⁻¹ along +x', '0.017 m s⁻¹ along +x'],
  sol: r`$v = \omega/k = 300/5.0 = 60$ m s$^{-1}$. The signs of $kx$ and $\omega t$ differ, so the wave travels along $+x$ — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => near(300 / 5, 60, 1e-12) || 'kw');
add('dirn-mcq', mcq({
  stem: 'Which of these equations (SI units) represents a wave travelling in the −x direction?',
  right: 'y = 0.40 sin(3.0x + 50t)',
  wrong: ['y = 0.40 sin(3.0x − 50t)', 'y = 0.40 sin(50t − 3.0x)', 'y = 0.40 sin(3.0x) cos(50t)'],
  sol: 'A wave along −x has kx and ωt with the same sign. In y = 0.40 sin(3.0x − 50t) and y = 0.40 sin(50t − 3.0x) the signs differ, so both are waves along +x (one is the other with its sign reversed), and y = 0.40 sin(3.0x) cos(50t) is a standing wave that does not travel — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('phase-mcq', mcq({
  stem: 'Two points on a rope carrying a travelling wave are 0.35 m apart. The wavelength is 1.40 m. The phase difference between the motions of the two points is',
  right: 'π/2 rad',
  wrong: ['π rad', 'π/4 rad', '2π rad'],
  sol: r`$\Delta\phi = \dfrac{2\pi}{\lambda}\,\Delta x = \dfrac{2\pi \times 0.35}{1.40} = \dfrac{\pi}{2}$ rad — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => near((2 * PI * 0.35) / 1.4, PI / 2, 1e-12) || 'phase-mcq');
add('pvel-mcq', mcq({
  stem: 'A transverse wave travels along a string. At an instant when a particular particle of the string is at its crest (greatest displacement), the transverse velocity of that particle is',
  right: 'zero',
  wrong: ['equal to the speed of the wave', 'aω, its greatest value, directed upward', 'aω, its greatest value, directed downward'],
  sol: r`The particle velocity is $\partial y/\partial t = -a\omega\cos(kx - \omega t)$, which is zero when the displacement $a\sin(kx - \omega t)$ is $\pm a$. At a crest the particle is momentarily at rest, and it is fastest as it passes its rest position — option (@K).`,
  d: 3, c: 'understanding', t: [2],
}));
const e1 = { A: 0.003, k: 20, om: 3000 };
e1.f = e1.om / (2 * PI);
add('eq-num1', num({
  stem: 'A transverse wave on a string is described by y = 0.0030 sin(20x − 3000t), all quantities in SI units. Find the frequency of the wave, in Hz (3 significant figures).',
  value: v3(e1.f), tol: tl(e1.f), unit: 'Hz',
  sol: r`Comparing with $y = a\sin(kx - \omega t)$: $\omega = 3000$ rad s$^{-1}$. So $f = \dfrac{\omega}{2\pi} = \dfrac{3000}{2\pi} = ${dec(e1.f, 3)}$ Hz.`,
  scheme: [['Reads ω = 3000 rad s⁻¹ from the equation', 1], [`f = ω/2π = ${dec(e1.f, 3)} Hz`, 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(1 / (2 * PI / 3000), q.answer.value, 0.01) || 'eq-num1');
const kk = { f: 250, v: V_AIR };
kk.lam = kk.v / kk.f;
kk.k = (2 * PI) / kk.lam;
add('k-num', num({
  stem: 'A sitar string sounds a note of frequency 250 Hz, and the sound travels in air at 340 m s⁻¹. Find the angular wave number k of the sound wave, in rad m⁻¹ (3 significant figures).',
  value: v3(kk.k), tol: tl(kk.k), unit: 'rad/m',
  sol: r`$\lambda = \dfrac{v}{f} = \dfrac{340}{250} = ${kk.lam}$ m, so $k = \dfrac{2\pi}{\lambda} = \dfrac{2\pi}{${kk.lam}} = ${dec(kk.k, 3)}$ rad m$^{-1}$.`,
  scheme: [[`λ = v/f = ${kk.lam} m`, 1], [`k = 2π/λ = ${dec(kk.k, 3)} rad m⁻¹`, 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near((2 * PI * kk.f) / kk.v, q.answer.value, 0.01) || 'k-num');
const pv = { A: 0.002, f: 150 };
pv.om = 2 * PI * pv.f;
pv.vmax = pv.A * pv.om;
add('pvmax-num', num({
  stem: 'A transverse wave of frequency 150 Hz and amplitude 2.0 mm travels along a string. Find the maximum speed of a particle of the string, in m s⁻¹ (3 significant figures).',
  value: v3(pv.vmax), tol: tl(pv.vmax), unit: 'm/s',
  sol: r`The particle velocity $-a\omega\cos(kx - \omega t)$ has greatest magnitude $a\omega$. With $\omega = 2\pi f = 2\pi \times 150 = ${dec(pv.om, 4)}$ rad s$^{-1}$: $v_\text{max} = a\omega = 2.0 \times 10^{-3} \times ${dec(pv.om, 4)} = ${dec(pv.vmax, 3)}$ m s$^{-1}$.`,
  scheme: [['v_max = aω for the particle', 1], [`ω = 2πf = ${dec(pv.om, 4)} rad s⁻¹`, 1], [`v_max = ${dec(pv.vmax, 3)} m s⁻¹`, 1]],
  marks: 3, d: 3, c: 'application', t: [2],
}), (q) => near(maxAbs((t) => ddx((tt) => pv.A * Math.sin(pv.om * tt), t), 0, 1 / pv.f, 4000), q.answer.value, 0.01) || 'pvmax');
const dp = { f: 125, dt: 2.0e-3 };
dp.dphi = 2 * PI * dp.f * dp.dt;
add('dphi-num', num({
  stem: 'A particle in a sound wave of frequency 125 Hz is observed at two instants 2.0 ms apart. Find the phase difference between its motion at the two instants, in rad (3 significant figures).',
  value: v3(dp.dphi), tol: tl(dp.dphi), unit: 'rad',
  sol: r`$\Delta\phi = \omega\,\Delta t = 2\pi f\,\Delta t = 2\pi \times ${dp.f} \times 2.0 \times 10^{-3} = ${dec(dp.dphi, 3)}$ rad.`,
  scheme: [['Δφ = ωΔt with ω = 2πf', 1], [`Δφ = ${dec(dp.dphi, 3)} rad`, 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near((dp.dt / (1 / dp.f)) * 2 * PI, q.answer.value, 0.01) || 'dphi');
const lm = { f: 480, v: V_AIR };
lm.lam = lm.v / lm.f;
add('lam-num', num({
  stem: 'A sitar string produces a note of frequency 480 Hz. Taking the speed of sound in air as 340 m s⁻¹, find the wavelength of the sound in air, in m (3 significant figures).',
  value: v3(lm.lam), tol: tl(lm.lam), unit: 'm',
  sol: r`$\lambda = \dfrac{v}{f} = \dfrac{340}{480} = ${dec(lm.lam, 3)}$ m.`,
  scheme: [[`λ = v/f = ${dec(lm.lam, 3)} m`, 1]],
  marks: 1, d: 1, c: 'application', t: [2],
}), (q) => near(lm.v / q.answer.value, lm.f, 0.01) || 'lam');
const yd = { A: 0.04, k: 10, om: 500, phi: PI / 3, x: 0.1, t: 2.0e-3 };
yd.arg = yd.k * yd.x - yd.om * yd.t + yd.phi;
yd.y = yd.A * Math.sin(yd.arg) * 1000;
add('ydisp-num', num({
  stem: 'A wave on a string is y = 0.040 sin(10x − 500t + π/3) in SI units. Find the displacement of the particle at x = 0.10 m at the instant t = 2.0 ms, in mm (3 significant figures).',
  value: v3(yd.y), tol: tl(yd.y), unit: 'mm',
  sol: r`The phase is $kx - \omega t + \phi = 10 \times 0.10 - 500 \times 2.0 \times 10^{-3} + \dfrac{\pi}{3} = 1.0 - 1.0 + 1.047 = ${dec(yd.arg, 4)}$ rad. Then $y = 0.040 \times \sin(${dec(yd.arg, 4)}) = ${dec(yd.y / 1000, 3)}$ m $= ${dec(yd.y, 3)}$ mm.`,
  scheme: [[`Phase kx − ωt + φ = ${dec(yd.arg, 4)} rad`, 1], [`y = 0.040 sin(phase) = ${dec(yd.y, 3)} mm`, 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(Math.sin(PI / 3) * 40, q.answer.value, 0.01) || 'ydisp');
const pa = { lam: 0.8, dx: 0.3 };
pa.deg = (360 * pa.dx) / pa.lam;
add('phasepath-num', num({
  stem: 'Two points of a travelling wave of wavelength 0.80 m are 0.30 m apart along the direction of travel. Find the phase difference between them, in degrees (3 significant figures).',
  value: v3(pa.deg), tol: tl(pa.deg), unit: 'degree',
  sol: r`A separation of one wavelength corresponds to a phase difference of $360^\circ$, so $\Delta\phi = 360^\circ \times \dfrac{\Delta x}{\lambda} = 360^\circ \times \dfrac{0.30}{0.80} = ${dec(pa.deg, 3)}^\circ$.`,
  scheme: [['Δφ = 360° × Δx/λ', 1], [`Δφ = ${dec(pa.deg, 3)}°`, 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(((2 * PI * pa.dx) / pa.lam) * (180 / PI), q.answer.value, 0.01) || 'phasepath');
const ep = { a: 0.08, k: 4 * PI, om: 200 * PI };
ep.lam = (2 * PI) / ep.k;
ep.f = ep.om / (2 * PI);
ep.v = ep.om / ep.k;
add('eqparts-short', short({
  marks: 2, wl: null,
  stem: 'The displacement of a particle of a stretched string is y = 0.080 sin(4πx − 200πt) in SI units. Find the amplitude, the wavelength, the frequency and the speed of the wave.',
  model: r`Comparing with $y = a\sin(kx - \omega t)$: amplitude $a = ${dec(ep.a, 2)}$ m; $k = 4\pi$ rad m$^{-1}$, so $\lambda = \dfrac{2\pi}{k} = ${dec(ep.lam, 2)}$ m; $\omega = 200\pi$ rad s$^{-1}$, so $f = \dfrac{\omega}{2\pi} = ${dec(ep.f, 3)}$ Hz; speed $v = \dfrac{\omega}{k} = f\lambda = ${dec(ep.v, 2)}$ m s$^{-1}$.`,
  sol: 'a = 0.080 m, λ = 0.50 m, f = 100 Hz, v = 50 m/s.',
  scheme: [[`a = ${dec(ep.a, 2)} m and λ = 2π/k = ${dec(ep.lam, 2)} m`, 1], [`f = ω/2π = ${dec(ep.f, 3)} Hz and v = ω/k = ${dec(ep.v, 2)} m s⁻¹`, 1]],
  d: 2, c: 'application', t: [2],
}), () => near(ep.f * ep.lam, ep.v, 1e-9) && near(ep.f, 100, 1e-9) && near(ep.v, 50, 1e-9) && near(ep.lam, 0.5, 1e-9) || 'eqparts');
add('wavepart-short', short({
  marks: 2,
  stem: 'A student says, "A wave on a string moves at 60 m s⁻¹, so each particle of the string moves at 60 m s⁻¹ too." Evaluate this statement.',
  model: 'The statement is wrong because it confuses two different speeds. The **wave speed** is how fast the pattern travels, and it is fixed by the tension and mass per unit length. Each particle only oscillates about its mean position, with a velocity that changes continuously between zero and a maximum aω; this has nothing to do with the wave speed.',
  sol: 'Wave speed is the speed of the pattern; particle speed varies from 0 to aω.',
  scheme: [['Wave speed is that of the pattern, set by the medium', 1], ['Particles oscillate with speed varying from 0 up to aω, not carried along', 1]],
  d: 3, c: 'evaluation', t: [2],
}));
add('derivv-short3', short({
  marks: 3,
  stem: 'For the travelling wave y = a sin(kx − ωt), show that the pattern moves with speed ω/k and that this equals fλ.',
  model: r`Follow a point of constant phase, $kx - \omega t = $ constant. Differentiating with respect to $t$ gives $k\,\dfrac{\mathrm{d}x}{\mathrm{d}t} - \omega = 0$, so the speed of this point of the pattern is $v = \dfrac{\mathrm{d}x}{\mathrm{d}t} = \dfrac{\omega}{k}$. With $\omega = 2\pi f$ and $k = \dfrac{2\pi}{\lambda}$ this becomes $v = \dfrac{2\pi f}{2\pi/\lambda} = f\lambda$.`,
  sol: 'Constant phase gives dx/dt = ω/k = fλ.',
  scheme: [['A point of constant phase kx − ωt = constant', 1], ['dx/dt = ω/k', 1], ['Substituting ω = 2πf and k = 2π/λ gives v = fλ', 1]],
  wl: null, d: 3, c: 'understanding', t: [2],
}));
add('kfill-fill', fill({
  stem: 'In the equation y = a sin(kx − ωt) of a travelling wave, the quantity k = 2π/λ is called the angular wave ___.',
  acc: [['number', 'Number']],
  sol: 'k is the angular wave **number**, in rad m⁻¹.',
  d: 1, c: 'recall', t: [2],
}));
add('speedfreq-tf', tf({
  stem: 'For the travelling wave y = a sin(kx − ωt), the speed of the wave is given by the product ωk.',
  key: 'f',
  sol: 'False. The speed is the ratio ω/k (equal to fλ); the product ωk has no meaning as a speed and the wrong unit.',
  d: 1, c: 'recall', t: [2],
}));
add('phase-ar', ar({
  a: 'Two particles of a travelling wave that are half a wavelength apart move in opposite directions at every instant.',
  r: 'A separation of one wavelength corresponds to a phase difference of π.',
  key: 'c',
  sol: 'A is true: Δφ = 2π(λ/2)/λ = π, opposite phase. R is false: one wavelength corresponds to a phase difference of 2π — option (c).',
  d: 3, c: 'understanding', t: [2],
}));
void R;
add('presv-mcq', mcq({
  stem: 'Air in a cylinder is compressed slowly, at constant temperature, until its pressure is twice the earlier value. The speed of sound in the compressed air is',
  right: 'unchanged, because the density doubles along with the pressure',
  wrong: ['doubled, because the pressure has doubled', 'increased by a factor of √2, because v is proportional to √P', 'halved, because the molecules are closer together'],
  sol: 'v = √(γP/ρ) = √(γRT/M). At constant T doubling P doubles ρ as well, so P/ρ and the speed do not change — option (@K).',
  d: 3, c: 'understanding', t: [1],
}));
const ns = { lam: 0.84 };
ns.d = ns.lam / 2;
add('nodesp-num', num({
  stem: 'A standing wave on a stretched string has a wavelength of 0.84 m. Find the distance between neighbouring nodes, in m.',
  value: ns.d, tol: tl(ns.d), unit: 'm',
  sol: r`Neighbouring nodes of a standing wave are half a wavelength apart: $\Delta x = \dfrac{\lambda}{2} = \dfrac{0.84}{2} = ${dec(ns.d, 2)}$ m.`,
  scheme: [[`Spacing λ/2 = ${dec(ns.d, 2)} m`, 1]],
  marks: 1, d: 1, c: 'application', t: [3],
}), (q) => near(2 * q.answer.value, ns.lam, 0.01) || 'nodesp');
