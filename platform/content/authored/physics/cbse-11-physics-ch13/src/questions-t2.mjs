// ch13 question bank, part 2: t02 (force law, energy in SHM, oscillations of a loaded spring).
import { mk, add, r, dec, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { PI, springT, springAt, springPeriodSim, v3, tl, energies } from './phys.mjs';

const { mcq, ar, num, short } = mk;

add('springdep-mcq', mcq({
  stem: 'A block on a smooth horizontal table oscillates on a light spring with period T. The block is replaced by one of four times the mass and the same spring is used. The new period is',
  right: '2T',
  wrong: ['T/2', '4T', 'T'],
  sol: r`$T = 2\pi\sqrt{m/k}$, so $T \propto \sqrt{m}$. Four times the mass gives $\sqrt{4} = 2$ times the period; the period does not depend on the amplitude — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => near(springPeriodSim(4 * 0.5, 80, 0.05) / springPeriodSim(0.5, 80, 0.05), 2, 0.002) || 'springdep');
add('kepe-mcq', mcq({
  stem: 'A body executes simple harmonic motion with amplitude A. Its kinetic energy equals its potential energy when its displacement from the mean position is',
  right: '±A/√2',
  wrong: ['±A/2', '±A/4', '±A/√3'],
  sol: r`KE $= \tfrac{1}{2}k(A^2 - x^2)$ and PE $= \tfrac{1}{2}kx^2$. Equating: $A^2 - x^2 = x^2$, so $x = \pm A/\sqrt{2}$ — option (@K).`,
  d: 3, c: 'application', t: [2],
}), () => near(1 - 1 / 2, 1 / 2, 1e-12) || 'kepe');
add('ketime-mcq', mcq({
  stem: 'A block released from the extreme position of a spring oscillates with period T. The kinetic energy of the block goes through a complete cycle of values in a time of',
  right: 'T/2',
  wrong: ['T', '2T', 'T/4'],
  sol: r`For $x = A\cos\omega t$, KE $= E\sin^2\omega t = \tfrac{E}{2}(1 - \cos 2\omega t)$: it varies with angular frequency $2\omega$, so its period is $T/2$. KE is the same at $+x$ and $-x$, so it repeats twice per oscillation — option (@K).`,
  d: 3, c: 'understanding', t: [2],
}));
add('ampenergy-mcq', mcq({
  stem: 'The amplitude of oscillation of a block on a spring is made 3 times as large, with the same block and spring. The total energy of the oscillation becomes',
  right: '9 times as large',
  wrong: ['3 times as large', '6 times as large', '√3 times as large'],
  sol: r`$E = \tfrac{1}{2}kA^2 \propto A^2$, so tripling $A$ multiplies the energy by $3^2 = 9$ — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => 3 ** 2 === 9 || 'amp');
add('fm-mcq', mcq({
  stem: 'A body of mass m moves along the x-axis under one of the forces below. Which force produces simple harmonic motion about x = 0?',
  right: 'F = −6.0 x',
  wrong: ['F = −6.0 x²', 'F = −6.0 / x', 'F = +6.0 x'],
  sol: 'SHM needs a restoring force proportional to the displacement: F = −kx with k = 6.0. F = −6.0x² and F = −6.0/x are not proportional to x, and F = +6.0x points away from the origin and pushes the body further out — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('springamp-ar', ar({
  a: 'The period of a block oscillating on a spring does not change when the amplitude is doubled.',
  r: 'The total energy of the oscillating block is proportional to the square of the amplitude.',
  key: 'b',
  sol: 'A is true, because T = 2π√(m/k) contains only m and k. R is also true, E = ½kA², but it says nothing about the period; the independence of T from A comes from the restoring force being proportional to the displacement. R is not the explanation — option (b).',
  d: 3, c: 'understanding', t: [2],
}));
add('energy-ar', ar({
  a: 'The total energy of a block oscillating on a spring has the same value at every position.',
  r: 'The kinetic energy and the potential energy of the block are each constant while it oscillates.',
  key: 'c',
  sol: 'A is true: KE + PE = ½kA² at every position. R is false: KE and PE change continuously, one rising as the other falls, and only their sum is constant — option (c).',
  d: 2, c: 'understanding', t: [2],
}));

// numericals
const kf = { F: 7.2, x: 0.04 };
kf.k = kf.F / kf.x;
add('kfrom-num', num({
  stem: 'A spring in a laboratory is compressed by 4.0 cm when a force of 7.2 N acts on it. Find the force constant of the spring in N m⁻¹ (3 significant figures).',
  value: v3(kf.k), tol: tl(kf.k), unit: 'N/m',
  sol: r`$F = kx$ gives $k = \dfrac{F}{x} = \dfrac{7.2}{0.040} = ${dec(kf.k, 3)}$ N m$^{-1}$.`,
  scheme: [[`k = F/x = ${dec(kf.k, 3)} N/m (x in metre)`, 1]],
  marks: 1, d: 1, c: 'application', t: [2],
}), (q) => near(kf.F / 0.04, q.answer.value, 0.005) || 'kf');
const sT = { m: 0.25, k: 100 };
sT.T = springT(sT.m, sT.k);
add('springT-num', num({
  stem: 'A block of mass 0.25 kg on a smooth table is joined to a light spring of force constant 100 N m⁻¹ and set oscillating. Find the period of its oscillations in s (3 significant figures).',
  value: v3(sT.T), tol: tl(sT.T), unit: 's',
  sol: r`$T = 2\pi\sqrt{\dfrac{m}{k}} = 2\pi\sqrt{\dfrac{0.25}{100}} = 2\pi \times ${dec(Math.sqrt(sT.m / sT.k), 3)} = ${dec(sT.T, 3)}$ s.`,
  scheme: [['T = 2π√(m/k)', 1], [`T = ${dec(sT.T, 3)} s`, 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(springPeriodSim(sT.m, sT.k, 0.04), q.answer.value, 0.005) || 'sT');
const sm = { f: 2.5, k: 60 };
sm.m = sm.k / (2 * PI * sm.f) ** 2;
add('springm-num', num({
  stem: 'A block oscillating on a spring of force constant 60 N m⁻¹ makes 2.5 oscillations every second. Find the mass of the block in kg (3 significant figures).',
  value: v3(sm.m), tol: tl(sm.m), unit: 'kg',
  sol: r`$f = \dfrac{1}{2\pi}\sqrt{\dfrac{k}{m}}$ gives $m = \dfrac{k}{(2\pi f)^2} = \dfrac{60}{(2\pi \times 2.5)^2} = \dfrac{60}{${dec((2 * PI * sm.f) ** 2, 5)}} = ${dec(sm.m, 3)}$ kg.`,
  scheme: [['m = k/(2πf)²', 1], [`(2πf)² = ${dec((2 * PI * sm.f) ** 2, 5)}`, 1], [`m = ${dec(sm.m, 3)} kg`, 1]],
  marks: 3, d: 3, c: 'application', t: [2],
}), (q) => near(springPeriodSim(q.answer.value, sm.k, 0.05), 1 / sm.f, 0.005) || 'sm');
const en = { m: 0.3, k: 150, A: 0.04 };
en.E = 0.5 * en.k * en.A ** 2;
add('energy-num', num({
  stem: 'A 0.30 kg block on a smooth table oscillates on a spring of force constant 150 N m⁻¹ with an amplitude of 4.0 cm. Find the total energy of the oscillation in J (3 significant figures).',
  value: v3(en.E), tol: tl(en.E), unit: 'J',
  sol: r`$E = \tfrac{1}{2}kA^2 = \tfrac{1}{2} \times 150 \times (0.040)^2 = ${dec(en.E, 3)}$ J.`,
  scheme: [['E = ½kA² with A = 0.040 m', 1], [`E = ${dec(en.E, 3)} J`, 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => {
  const T = springPeriodSim(en.m, en.k, en.A);
  const [, v] = springAt(en.m, en.k, en.A, 0, T / 4); // all energy kinetic at the mean position
  return near(0.5 * en.m * v * v, q.answer.value, 0.01) || 'en';
});
const sp = { m: 0.4, k: 90, A: 0.08, x: 0.04 };
sp.v = Math.sqrt((sp.k / sp.m) * (sp.A ** 2 - sp.x ** 2));
add('speed-spring-num', num({
  stem: 'A 0.40 kg block oscillates on a smooth table on a spring of force constant 90 N m⁻¹ with an amplitude of 0.080 m. Find its speed when it is 0.040 m from the mean position, in m s⁻¹ (3 significant figures).',
  value: v3(sp.v), tol: tl(sp.v), unit: 'm/s',
  sol: r`Energy conservation: $\tfrac{1}{2}mv^2 = \tfrac{1}{2}k(A^2 - x^2)$, so $v = \sqrt{\dfrac{k}{m}(A^2 - x^2)} = \sqrt{\dfrac{90}{0.40}\left(0.080^2 - 0.040^2\right)} = \sqrt{${dec((sp.k / sp.m) * (sp.A ** 2 - sp.x ** 2), 4)}} = ${dec(sp.v, 3)}$ m s$^{-1}$.`,
  scheme: [['½mv² = ½k(A² − x²)', 1], ['v = √[(k/m)(A² − x²)]', 1], [`v = ${dec(sp.v, 3)} m/s`, 1]],
  marks: 3, d: 3, c: 'application', t: [2],
}), (q) => {
  const om = Math.sqrt(sp.k / sp.m);
  const t = Math.acos(sp.x / sp.A) / om;
  const [x, v] = springAt(sp.m, sp.k, sp.A, 0, t);
  return (near(x, sp.x, 1e-3) && near(Math.abs(v), q.answer.value, 0.01)) || 'sp';
});
const mx = { m: 1.5, k: 540, A: 0.1 };
mx.v = mx.A * Math.sqrt(mx.k / mx.m);
add('maxspeed-num', num({
  stem: 'A 1.5 kg trolley on a smooth track is joined to a spring of force constant 540 N m⁻¹. It is pulled 0.10 m from its mean position and released from rest. Find its maximum speed in m s⁻¹ (3 significant figures).',
  value: v3(mx.v), tol: tl(mx.v), unit: 'm/s',
  sol: r`At the mean position all the energy is kinetic: $\tfrac{1}{2}mv_\text{max}^2 = \tfrac{1}{2}kA^2$, so $v_\text{max} = A\sqrt{\dfrac{k}{m}} = 0.10\sqrt{\dfrac{540}{1.5}} = 0.10 \times ${dec(Math.sqrt(mx.k / mx.m), 4)} = ${dec(mx.v, 3)}$ m s$^{-1}$.`,
  scheme: [['½ m v² = ½ k A² at the mean position', 1], ['v_max = A√(k/m)', 1], [`v_max = ${dec(mx.v, 3)} m/s`, 1]],
  marks: 3, d: 3, c: 'application', t: [2],
}), (q) => {
  const T = springPeriodSim(mx.m, mx.k, mx.A);
  const [, v] = springAt(mx.m, mx.k, mx.A, 0, T / 4);
  return near(Math.abs(v), q.answer.value, 0.01) || 'mx';
});
const kp = { A: 10, x: 7 };
kp.ke = (1 - (kp.x / kp.A) ** 2) * 100;
add('kefrac-num', num({
  stem: 'A body oscillates in simple harmonic motion with an amplitude of 10 cm. When it is 7.0 cm from the mean position, what percentage of its total energy is kinetic? Give the answer in per cent (3 significant figures).',
  value: v3(kp.ke), tol: tl(kp.ke), unit: '%',
  sol: r`PE$/E = x^2/A^2 = (7.0/10)^2 = ${dec((kp.x / kp.A) ** 2, 3)}$. KE$/E = 1 - ${dec((kp.x / kp.A) ** 2, 3)} = ${dec(kp.ke / 100, 3)}$, and the kinetic energy is $${dec(kp.ke / 100, 3)} \times 100 = ${dec(kp.ke, 3)}$ per cent of $E$.`,
  scheme: [['PE/E = (x/A)²', 1], [`KE/E = 1 − PE/E = ${dec(kp.ke, 3)} %`, 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => {
  const k = 200;
  const A = kp.A / 100;
  const x = kp.x / 100;
  const e = energies(k, A, x);
  return near((e.ke / e.total) * 100, q.answer.value, 0.005) || 'kefrac';
});
const sa = { m: 0.6, k: 150, v: 1.2 };
sa.A = sa.v * Math.sqrt(sa.m / sa.k) * 100; // cm
add('amp-num', num({
  stem: 'A 0.60 kg block on a smooth table, joined to a spring of force constant 150 N m⁻¹, passes through the mean position with a speed of 1.2 m s⁻¹. Find the amplitude of its oscillation in cm (3 significant figures).',
  value: v3(sa.A), tol: tl(sa.A), unit: 'cm',
  sol: r`At the mean position the energy is all kinetic: $\tfrac{1}{2}kA^2 = \tfrac{1}{2}mv^2$, so $A = v\sqrt{\dfrac{m}{k}} = 1.2\sqrt{\dfrac{0.60}{150}} = 1.2 \times ${dec(Math.sqrt(sa.m / sa.k), 4)} = ${dec(sa.A / 100, 3)}$ m $= ${dec(sa.A, 3)}$ cm.`,
  scheme: [['½kA² = ½mv² at the mean position', 1], ['A = v√(m/k)', 1], [`A = ${dec(sa.A, 3)} cm`, 1]],
  marks: 3, d: 3, c: 'application', t: [2],
}), (q) => {
  const A = q.answer.value / 100;
  const T = springPeriodSim(sa.m, sa.k, A);
  const [, v] = springAt(sa.m, sa.k, A, 0, T / 4);
  return near(Math.abs(v), sa.v, 0.01) || 'amp';
});

// short answers
const si = { mk: 4, kk: 2 };
si.ratio = Math.sqrt(si.mk / si.kk);
add('springind-short', short({
  marks: 2,
  stem: 'The mass hung on a spring oscillator is made four times as large and the spring is replaced by one with twice the force constant. By what factor does the period change? Give your reasoning.',
  model: r`The period is $T = 2\pi\sqrt{m/k}$, so $T \propto \sqrt{m/k}$. The new mass is $4m$ and the new constant is $2k$, so the ratio of the new to the old period is $\sqrt{\dfrac{4}{2}} = \sqrt{2} = ${dec(si.ratio, 3)}$. The period becomes about ${dec(si.ratio, 3)} times as long, because the larger mass slows the motion more than the stiffer spring speeds it up.`,
  sol: '√(4/2) = 1.41.',
  scheme: [['T ∝ √(m/k)', 1], [`Factor √(4/2) = ${dec(si.ratio, 3)}`, 1]],
  d: 3, c: 'application', t: [2],
}), () => near(springPeriodSim(4 * 0.5, 2 * 80, 0.05) / springPeriodSim(0.5, 80, 0.05), si.ratio, 0.005) || 'si');
add('swap-short', short({
  marks: 2,
  stem: 'Describe how the kinetic and potential energies of a block on a spring change as it moves from the extreme position to the mean position, and state what happens to the total energy.',
  model: 'At the **extreme position** the block is momentarily at rest, so all the energy is the **potential energy** of the stretched (or compressed) spring, ½kA². Moving towards the mean position, the potential energy falls and the **kinetic energy rises**, until it is all kinetic there. The **total energy** stays ½kA², as friction is neglected.',
  sol: 'PE to KE; total constant.',
  scheme: [['Extreme: all potential; falls while kinetic rises; all kinetic at the mean position', 1], ['Total energy constant, ½kA²', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('spring-short3', short({
  marks: 3,
  stem: 'A block of mass m on a smooth horizontal table is joined to a light spring of force constant k. Show that it performs simple harmonic motion and derive the expression for its period.',
  model: r`When the block is displaced by $x$, the spring exerts a restoring force $F = -kx$ towards the mean position. By Newton's second law $ma = -kx$, so $a = -\dfrac{k}{m}x$. This has the form $a = -\omega^2 x$ of simple harmonic motion, with $\omega^2 = \dfrac{k}{m}$. The period is therefore $T = \dfrac{2\pi}{\omega} = 2\pi\sqrt{\dfrac{m}{k}}$, which contains the mass and the spring constant but not the amplitude.`,
  sol: 'F = −kx; a = −(k/m)x; ω² = k/m; T = 2π√(m/k).',
  scheme: [['Restoring force F = −kx, so ma = −kx', 1], ['a = −(k/m)x has the form a = −ω²x: SHM with ω² = k/m', 1], ['T = 2π/ω = 2π√(m/k)', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('energy-short3', short({
  marks: 3,
  stem: 'Show that the total mechanical energy of a body of mass m in simple harmonic motion with amplitude A and force constant k = mω² is ½kA² at every position.',
  model: r`At displacement $x$ the potential energy stored in the spring is $\tfrac{1}{2}kx^2$. The speed of the body is $v = \omega\sqrt{A^2 - x^2}$, so its kinetic energy is $\tfrac{1}{2}mv^2 = \tfrac{1}{2}m\omega^2(A^2 - x^2) = \tfrac{1}{2}k(A^2 - x^2)$. Adding the two, $E = \tfrac{1}{2}k(A^2 - x^2) + \tfrac{1}{2}kx^2 = \tfrac{1}{2}kA^2$. The displacement $x$ cancels, so the total energy has the same value at every position.`,
  sol: 'KE = ½k(A² − x²); PE = ½kx²; sum = ½kA².',
  scheme: [['PE = ½kx²', 1], ['KE = ½mω²(A² − x²) = ½k(A² − x²)', 1], ['Sum = ½kA², independent of x', 1]],
  d: 3, c: 'understanding', t: [2],
}));
