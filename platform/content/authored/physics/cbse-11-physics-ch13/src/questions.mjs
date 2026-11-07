// ch13 Oscillations — question bank, part 1: t01 (periodic motion, SHM equation, phase, reference circle, velocity and acceleration).
// Every numerical is computed here and re-solved by an independent `check` (a Runge-Kutta integration of the equation of motion,
// or the phase recovered from the starting conditions); solutions and schemes print the computed values.
// AR keys across the chapter: a (shmkin), d (phase), b (springamp), c (energy), a (pendmass).
import { mk, add, r, dec, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { PI, G, omegaOfT, omegaOfF, vAt, springAt, springPeriodSim, v3, tl, sciu } from './phys.mjs';

const { mcq, ar, tf, fill, num, short } = mk;

// ================================================================ t01 periodic motion, SHM, phase, reference circle, v and a
add('periodic-mcq', mcq({
  stem: 'Which one of the following motions repeats itself regularly but does not go to and fro about a mean position?',
  right: 'The second hand of a wall clock going round its dial',
  wrong: ['A child swinging on a playground swing', 'The prong of a vibrating tuning fork', 'A cradle rocking from side to side'],
  sol: 'The second hand repeats every 60 s, so it is periodic, but it goes round and does not move to and fro. The other three move to and fro about a mean position, so they are oscillatory as well — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
const bell = { n: 240, secs: 60 };
bell.T = bell.secs / bell.n;
add('freq-mcq', mcq({
  stem: 'The clapper of a school bell swings to and fro 240 times in one minute. Its period is',
  right: '0.25 s',
  wrong: ['4.0 s', '240 s', '0.0042 s'],
  sol: r`Period $= \dfrac{\text{time}}{\text{number of oscillations}} = \dfrac{60}{240} = ${bell.T}$ s. The frequency is 4.0 Hz; 0.0042 s is $1/240$ s — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => near(bell.T, 0.25, 1e-12) || 'bell');
add('phase-mcq', mcq({
  stem: 'In the equation x = A cos(ωt + φ) of simple harmonic motion, the quantity (ωt + φ) is called the',
  right: 'phase of the motion at time t',
  wrong: ['amplitude of the motion', 'angular frequency of the motion', 'time period of the motion'],
  sol: 'The whole argument of the cosine, ωt + φ, is the phase; φ alone is the phase constant, ω the angular frequency and A the amplitude — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('vmax-mcq', mcq({
  stem: 'A block moves in simple harmonic motion along a straight line. At the instant it passes through the mean position,',
  right: 'its speed is the greatest and its acceleration is zero',
  wrong: ['its speed is zero and its acceleration is the greatest', 'both its speed and its acceleration are the greatest', 'both its speed and its acceleration are zero'],
  sol: 'v = ±ω√(A² − x²) is largest at x = 0 and a = −ω²x is zero there. At the extremes the speed is zero and the acceleration has its greatest size — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('accel-mcq', mcq({
  stem: 'A particle executes simple harmonic motion about the point O. The direction of its acceleration is',
  right: 'always towards O, whichever way the particle is moving',
  wrong: ['always the same as the direction of its velocity', 'always opposite to the direction of its velocity', 'always away from O'],
  sol: 'a = −ω²x: the acceleration is opposite to the displacement from O, so it points towards O whether the particle is moving towards or away from it. It is not tied to the direction of the velocity — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
const sn = { A: 3.0, w: 5.0 };
sn.T = (2 * PI) / sn.w;
add('ang-mcq', mcq({
  stem: 'The displacement of a particle is x = 3.0 sin(5.0 t) cm, with t in seconds. The period of its motion is',
  right: '1.26 s',
  wrong: ['5.0 s', '0.20 s', '31.4 s'],
  sol: r`Comparing with $A\sin\omega t$, $\omega = 5.0$ rad s$^{-1}$, so $T = \dfrac{2\pi}{\omega} = \dfrac{2\pi}{5.0} = ${dec(sn.T, 3)}$ s. The value 0.20 s is $1/\omega$ (wrong), 5.0 s is $\omega$ itself and 31.4 s is $2\pi\omega$ — option (@K).`,
  d: 3, c: 'application', t: [1],
}), () => near(springPeriodSim(1, 25, 0.03), sn.T, 0.002) || 'ang');
add('phasediff-mcq', mcq({
  stem: 'For a particle in simple harmonic motion, the velocity (compared with the displacement)',
  right: 'leads by a phase of π/2, a quarter of a period',
  wrong: ['lags by a phase of π/2, a quarter of a period', 'leads by a phase of π, a half period', 'is in phase with it'],
  sol: r`$x = A\cos(\omega t + \phi)$ and $v = -A\omega\sin(\omega t + \phi) = A\omega\cos(\omega t + \phi + \pi/2)$: the velocity reaches each value a quarter of a period before the displacement does — option (@K).`,
  d: 3, c: 'understanding', t: [1],
}));
add('ucm-mcq', mcq({
  stem: 'A bead moves at constant speed round a vertical circle of radius A, and a beam of parallel light shining vertically downward casts its shadow on a horizontal diameter of the circle. The shadow of the bead',
  right: 'performs simple harmonic motion with the same period as one revolution of the bead',
  wrong: ['performs simple harmonic motion with half the period of one revolution', 'moves with a constant speed along the diameter', 'moves with a constant acceleration along the diameter'],
  sol: 'The shadow is the projection of uniform circular motion on a diameter: x = A cos(ωt + φ). One revolution of the bead brings the shadow back to its starting point moving the same way, so the periods are equal — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
const hf = { A: 1 };
hf.t = Math.asin(0.5) / 1; // in units of 1/omega
hf.ratio = hf.t / (2 * PI); // as a fraction of T
add('half-mcq', mcq({
  stem: 'A particle in simple harmonic motion with period T starts from the mean position at t = 0 and moves towards +x. The shortest time in which it reaches a displacement equal to half the amplitude is',
  right: 'T/12',
  wrong: ['T/6', 'T/8', 'T/4'],
  sol: r`Starting from the mean position, $x = A\sin\omega t$. Setting $x = A/2$: $\sin\omega t = \tfrac{1}{2}$, so $\omega t = \pi/6$ and $t = \dfrac{\pi/6}{2\pi/T} = \dfrac{T}{12}$. (T/6 is the time from an extreme position to half the amplitude; T/4 is the time to reach an extreme.) — option (@K).`,
  d: 3, c: 'application', t: [1],
}), () => near(hf.ratio, 1 / 12, 1e-12) || 'half');

add('shmkin-ar', ar({
  a: 'In simple harmonic motion the speed of the particle is zero at the extreme positions, where its acceleration has its greatest size.',
  r: 'In simple harmonic motion the acceleration is proportional to the displacement, and the speed is proportional to √(A² − x²).',
  key: 'a',
  sol: 'A: at x = ±A, v = ω√(A² − x²) = 0 and |a| = ω²A is the greatest. R: both relations are true, and they are exactly what gives A. So R explains A — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('phase-ar', ar({
  a: 'Two particles in SHM with the same amplitude and period must have the same phase constant.',
  r: 'The phase constant φ is fixed by the displacement and the direction of the velocity at t = 0.',
  key: 'd',
  sol: 'R is true: φ follows from x(0) and the sign of v(0). A is false, because the two particles may start from different positions, or move off in different directions, at t = 0, and then their phase constants differ — option (d).',
  d: 2, c: 'understanding', t: [1],
}));
add('speed-tf', tf({
  stem: 'A particle in simple harmonic motion moves fastest at the instant when its acceleration is zero.',
  key: 't',
  sol: 'True. The speed is greatest at the mean position, x = 0, and there a = −ω²x = 0.',
  d: 1, c: 'understanding', t: [1],
}));
add('bounce-tf', tf({
  stem: 'A steel ball dropped on a hard floor bounces up and down again and again with an equal period; its motion is therefore simple harmonic.',
  key: 'f',
  sol: 'False. The motion is periodic, but between bounces the acceleration is the constant g, directed downward, and not proportional to the displacement from a fixed point. A motion needs a = −ω²x to be SHM.',
  d: 2, c: 'understanding', t: [1],
}));
add('omega-fill', fill({
  stem: 'The angular frequency ω = 2π/T of an oscillating body is measured in ___ per second.',
  acc: [['radian', 'radians', 'rad']],
  sol: 'ω is measured in **radian** per second.',
  d: 1, c: 'recall', t: [1],
}));
add('hertz-fill', fill({
  stem: 'A transformer on a street pole hums at 50 complete cycles every second, that is, at a frequency of 50 ___ (give the name of the SI unit).',
  acc: [['hertz', 'Hz', 'hz']],
  sol: 'The SI unit of frequency is the **hertz** (1 Hz = 1 s⁻¹).',
  d: 1, c: 'recall', t: [1],
}));
add('centre-fill', fill({
  stem: 'The potential energy stored in the spring of a spring-block oscillator is zero when the block is at the ___ position.',
  acc: [['mean', 'equilibrium', 'central', 'middle']],
  sol: 'The spring is neither stretched nor compressed at the **mean** (equilibrium) position, so its potential energy ½kx² is zero.',
  d: 1, c: 'recall', t: [2],
}));

// numericals
const sew = { n: 1200, secs: 60 };
sew.T = (sew.secs / sew.n) * 1000; // ms
add('needle-num', num({
  stem: 'The needle of a sewing machine moves up and down 1200 times in one minute. Taking one up-and-down movement as one oscillation, find its period in ms (3 significant figures).',
  value: v3(sew.T), tol: tl(sew.T), unit: 'ms',
  sol: r`Period $= \dfrac{60\ \text{s}}{1200} = ${dec(sew.T / 1000, 3)}$ s $= ${dec(sew.T, 3)}$ ms.`,
  scheme: [[`T = 60 s ÷ 1200 = ${dec(sew.T, 3)} ms`, 1]],
  marks: 1, d: 1, c: 'application', t: [1],
}), (q) => near(1000 / (1200 / 60) * 1, q.answer.value, 0.01) || 'needle');
const qz = { f: 32768 };
qz.T = (1 / qz.f) * 1e6; // microsecond
add('quartz-num', num({
  stem: 'A quartz crystal in a wristwatch vibrates 32 768 times every second. Find the period of its vibration in microseconds (3 significant figures).',
  value: v3(qz.T), tol: tl(qz.T), unit: 'µs',
  sol: r`$T = \dfrac{1}{f} = \dfrac{1}{32\,768} = ${dec(qz.T / 1e6, 4)}$ s $= ${dec(qz.T, 3)}$ μs.`,
  scheme: [['T = 1/f', 1], [`T = ${dec(qz.T, 3)} μs`, 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(2 ** -15 * 1e6, q.answer.value, 0.01) || 'quartz');
const tr = { A: 1.5e-3, f: 120 };
tr.om = omegaOfF(tr.f);
tr.a = tr.A * tr.om ** 2;
add('trimmer-num', num({
  stem: 'The blade of a hair trimmer vibrates in simple harmonic motion with an amplitude of 1.5 mm at a frequency of 120 Hz. Find the maximum acceleration of the blade in m s⁻² (3 significant figures).',
  value: v3(tr.a), tol: tl(tr.a), unit: 'm/s²',
  sol: r`$\omega = 2\pi f = 2\pi \times 120 = ${dec(tr.om, 5)}$ rad s$^{-1}$. $a_\text{max} = A\omega^2 = 1.5 \times 10^{-3} \times (${dec(tr.om, 5)})^2 = ${dec(tr.a, 3)}$ m s$^{-2}$.`,
  scheme: [['ω = 2πf', 1], ['a_max = Aω²', 1], [`a_max = ${dec(tr.a, 3)} m s⁻²`, 1]],
  marks: 3, d: 3, c: 'application', t: [1],
}), (q) => {
  const h = 1e-7;
  const [, v] = springAt(1, tr.om ** 2, tr.A, 0, h, 1e-8); // finite-difference acceleration from the integrated motion
  return near(Math.abs(v / h), q.answer.value, 0.01) || 'trimmer';
});
const vx = { A: 0.12, T: 2.0, x: 0.06 };
vx.om = omegaOfT(vx.T);
vx.v = vAt(vx.A, vx.om, vx.x);
add('vx-num', num({
  stem: 'A particle executes simple harmonic motion with an amplitude of 0.12 m and a period of 2.0 s. Find its speed when it is 0.060 m from the mean position, in m s⁻¹ (3 significant figures).',
  value: v3(vx.v), tol: tl(vx.v), unit: 'm/s',
  sol: r`$\omega = 2\pi/T = ${dec(vx.om, 4)}$ rad s$^{-1}$. $v = \omega\sqrt{A^2 - x^2} = ${dec(vx.om, 4)}\sqrt{0.12^2 - 0.060^2} = ${dec(vx.om, 4)} \times ${dec(Math.sqrt(vx.A ** 2 - vx.x ** 2), 4)} = ${dec(vx.v, 3)}$ m s$^{-1}$.`,
  scheme: [['ω = 2π/T', 1], ['v = ω√(A² − x²)', 1], [`v = ${dec(vx.v, 3)} m/s`, 1]],
  marks: 3, d: 3, c: 'application', t: [1],
}), (q) => {
  const t = Math.acos(vx.x / vx.A) / vx.om; // first time the body is at x = 0.060 m, released from x = A
  const [x, v] = springAt(1, vx.om ** 2, vx.A, 0, t);
  return (near(x, vx.x, 1e-3) && near(Math.abs(v), q.answer.value, 0.01)) || 'vx';
});
const ph = { A: 0.1, w: 2.0, x0: 0.08 };
ph.phi = Math.atan2(Math.sqrt(ph.A ** 2 - ph.x0 ** 2), ph.x0); // sin(phi) > 0: moving towards -x
add('phi-num', num({
  stem: 'A particle in simple harmonic motion has amplitude 0.10 m and angular frequency 2.0 rad s⁻¹. At t = 0 it is at x = +0.080 m and is moving towards the mean position. Find the phase constant φ in x = A cos(ωt + φ), with 0 < φ < π, in radian (3 significant figures).',
  value: v3(ph.phi), tol: tl(ph.phi), unit: 'rad',
  sol: r`At $t = 0$: $0.080 = 0.10\cos\phi$, so $\cos\phi = 0.80$ and $\phi = \pm${dec(Math.acos(0.8), 4)}$ rad. The particle moves towards $-x$, so $v(0) = -A\omega\sin\phi < 0$ and $\sin\phi > 0$: $\phi = ${dec(ph.phi, 3)}$ rad.`,
  scheme: [['cos φ = x(0)/A = 0.80', 1], ['v(0) < 0 needs sin φ > 0, so φ is positive', 1], [`φ = ${dec(ph.phi, 3)} rad`, 1]],
  marks: 3, d: 3, c: 'application', t: [1],
}), (q) => {
  // recover phi from the velocity: v(0) = -A w sin(phi) must be negative and x(0)/A = cos(phi)
  const v0 = -ph.A * ph.w * Math.sin(q.answer.value);
  return (near(ph.A * Math.cos(q.answer.value), ph.x0, 0.005) && v0 < 0) || 'phi';
});
const tx = { A: 0.2, w: 4.0, x: 0.1 };
tx.t = Math.acos(tx.x / tx.A) / tx.w;
add('time-num', num({
  stem: 'A particle moves according to x = 0.20 cos(4.0 t) metre, with t in seconds. At what time does it first reach x = 0.10 m? Give the answer in s (3 significant figures).',
  value: v3(tx.t), tol: tl(tx.t), unit: 's',
  sol: r`$0.10 = 0.20\cos(4.0t)$, so $\cos(4.0t) = 0.50$. The smallest positive angle is $4.0t = \pi/3 = ${dec(PI / 3, 5)}$ rad, so $t = \dfrac{${dec(PI / 3, 5)}}{4.0} = ${dec(tx.t, 3)}$ s.`,
  scheme: [['cos(4.0 t) = 0.50 with the smallest angle π/3', 1], ['t = (π/3)/4.0', 1], [`t = ${dec(tx.t, 3)} s`, 1]],
  marks: 3, d: 3, c: 'application', t: [1],
}), (q) => {
  const [x] = springAt(1, tx.w ** 2, tx.A, 0, q.answer.value);
  const [xb] = springAt(1, tx.w ** 2, tx.A, 0, q.answer.value * 0.9);
  return (near(x, 0.1, 0.01) && xb > x) || 'time'; // reached at the stated time, and not yet before it
});
const xt = { A: 0.08, w: 10, phi: PI / 3, t: 0.1 };
xt.x = xt.A * Math.cos(xt.w * xt.t + xt.phi) * 100; // cm
add('xat-num', num({
  stem: 'A particle moves in SHM with x = 0.080 cos(10 t + π/3) metre, where t is in seconds and the angle is in radian. Find its displacement at t = 0.10 s, in cm (3 significant figures; keep the sign).',
  value: v3(xt.x), tol: tl(xt.x), unit: 'cm',
  sol: r`Phase $= 10 \times 0.10 + \pi/3 = 1 + ${dec(PI / 3, 5)} = ${dec(xt.w * xt.t + xt.phi, 5)}$ rad. $x = 0.080\cos(${dec(xt.w * xt.t + xt.phi, 5)}) = ${dec(xt.x / 100, 3)}$ m $= ${dec(xt.x, 3)}$ cm (negative: on the $-x$ side).`,
  scheme: [[`Phase = ${dec(xt.w * xt.t + xt.phi, 5)} rad (calculator in radian mode)`, 1], [`x = ${dec(xt.x, 3)} cm`, 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => {
  const x0 = xt.A * Math.cos(xt.phi);
  const v0 = -xt.A * xt.w * Math.sin(xt.phi);
  const [x] = springAt(1, xt.w ** 2, x0, v0, xt.t);
  return near(x * 100, q.answer.value, 0.01) || 'xat';
});

// short answers
add('shmdef-short', short({
  marks: 2,
  stem: 'Define simple harmonic motion and write the relation between acceleration and displacement that characterises it.',
  model: r`Simple harmonic motion is the motion of a particle in which the **acceleration is proportional to the displacement** from a fixed point (the mean position) and **always directed towards that point**. Its defining relation is $a = -\omega^2 x$, where $\omega$ is a constant; the displacement is then a sinusoidal function of time.`,
  sol: 'a ∝ −x; a = −ω²x.',
  scheme: [['Acceleration proportional to displacement and directed towards the mean position', 1], ['a = −ω²x, with ω a constant', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('shmnot-short', short({
  marks: 2,
  stem: 'A hockey ball dropped on a hard floor bounces regularly with an equal period. Explain why this motion is periodic but not simple harmonic.',
  model: 'The ball returns to the same height after equal intervals, so it is **periodic**. Between bounces, however, its acceleration is the constant **g downward**, not proportional to its displacement from a mean position. The condition **a = −ω²x** fails, so the motion is not simple harmonic.',
  sol: 'Periodic; but a is constant, not −ω²x.',
  scheme: [['Repeats at equal intervals: periodic', 1], ['Acceleration constant (g), not proportional to −x: not SHM', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('phaseconst-short', short({
  marks: 2,
  stem: 'What does the phase constant φ in x = A cos(ωt + φ) tell us about the motion? Give its value for a particle that is released from rest at x = +A at t = 0.',
  model: r`The phase constant $\phi$ is the **phase at $t = 0$**: it is fixed by the displacement and the direction of the velocity at $t = 0$, and shifts the displacement curve along the time axis without changing $A$ or $T$. For a particle released from rest at $x = +A$, $\cos\phi = 1$ and $v(0) = 0$, so $\phi = 0$.`,
  sol: 'Initial phase; φ = 0.',
  scheme: [['φ is the phase at t = 0, set by x(0) and the direction of v(0)', 1], ['Release at +A: cos φ = 1, so φ = 0', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('refcircle-short', short({
  marks: 2,
  stem: 'Describe how simple harmonic motion is obtained from uniform circular motion, saying what the radius, the angular speed and the starting angle of the circular motion correspond to.',
  model: r`Let a particle P move uniformly on a circle and drop a perpendicular from P to a diameter. Its foot Q then moves with $x = A\cos(\omega t + \phi)$, which is **simple harmonic motion**. The **radius** of the circle is the amplitude $A$, the **angular speed** of P is the angular frequency $\omega$, and the **angle** of OP at $t = 0$ is the phase constant $\phi$.`,
  sol: 'Projection on a diameter; A = radius, ω = angular speed, φ = starting angle.',
  scheme: [['Foot of the perpendicular on a diameter performs SHM: x = A cos(ωt + φ)', 1], ['Radius ↔ A, angular speed ↔ ω, starting angle ↔ φ', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('vela-short3', short({
  marks: 3,
  stem: 'Obtain expressions for the velocity and the acceleration of a particle whose displacement is x = A cos(ωt + φ). State where each has its greatest value.',
  model: r`Differentiating the displacement once gives the velocity, $v = \dfrac{dx}{dt} = -A\omega\sin(\omega t + \phi)$. Differentiating again gives the acceleration, $a = \dfrac{dv}{dt} = -A\omega^2\cos(\omega t + \phi) = -\omega^2 x$. The speed is greatest, $A\omega$, at the **mean position** ($x = 0$), where the acceleration is zero. The acceleration has its greatest size, $A\omega^2$, at the **extreme positions** ($x = \pm A$), where the velocity is zero.`,
  sol: 'v = −Aω sin(ωt + φ); a = −ω²x; maxima Aω at x = 0 and Aω² at x = ±A.',
  scheme: [['v = −Aω sin(ωt + φ)', 1], ['a = −Aω² cos(ωt + φ) = −ω²x', 1], ['Maximum speed Aω at x = 0; maximum acceleration Aω² at x = ±A', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('vofx-short3', short({
  marks: 3,
  stem: 'Starting from x = A cos(ωt + φ), show that the speed of a particle in simple harmonic motion at displacement x is ω√(A² − x²).',
  model: r`Differentiating the displacement, the velocity is $v = -A\omega\sin(\omega t + \phi)$, so its square is $v^2 = A^2\omega^2\sin^2(\omega t + \phi)$. Now use the identity that sine squared equals one minus cosine squared, which gives $v^2 = A^2\omega^2\left[1 - \cos^2(\omega t + \phi)\right]$. Since $x = A\cos(\omega t + \phi)$, this becomes $v^2 = \omega^2\left(A^2 - x^2\right)$, and taking the square root gives $v = \pm\omega\sqrt{A^2 - x^2}$ as required.`,
  sol: 'v² = A²ω² sin² = ω²(A² − x²).',
  scheme: [['v = −Aω sin(ωt + φ)', 1], ['Replace sin² by 1 − cos²', 1], ['v² = ω²(A² − x²), so v = ±ω√(A² − x²)', 1]],
  d: 3, c: 'understanding', t: [1],
}));

await import('./questions-t2.mjs');
await import('./questions-t3.mjs');
await import('./questions-long.mjs');
void G;
void sciu;
void ar;
