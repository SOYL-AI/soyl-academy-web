// ch13 question bank, part 3: t03 (the simple pendulum).
import { mk, add, r, dec, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { PI, G, pendT, pendulumPeriodSim, v3, tl } from './phys.mjs';

const { mcq, ar, num, short } = mk;

add('pend-dep-mcq', mcq({
  stem: 'A simple pendulum swings through a small angle. Its period becomes longer if',
  right: 'the string is made longer',
  wrong: ['the bob is replaced by a heavier bob of the same size', 'the amplitude of the swing is reduced a little', 'it is moved to a place where g is larger'],
  sol: r`$T = 2\pi\sqrt{L/g}$: it increases with $L$ and decreases with $g$, and does not depend on the mass of the bob or (for small angles) on the amplitude — option (@K).`,
  d: 1, c: 'understanding', t: [3],
}));
add('pend-moon-mcq', mcq({
  stem: 'A pendulum clock and a clock driven by a block on a spring, both correct on the Earth, are taken to the Moon, where g is smaller. On the Moon',
  right: 'the pendulum clock runs slow and the spring clock keeps correct time',
  wrong: ['both clocks run slow', 'the spring clock runs slow and the pendulum clock keeps correct time', 'both clocks keep correct time'],
  sol: r`The pendulum period $2\pi\sqrt{L/g}$ grows when $g$ falls, so that clock runs slow. The spring period $2\pi\sqrt{m/k}$ does not contain $g$, so that clock is unaffected — option (@K).`,
  d: 3, c: 'understanding', t: [2, 3],
}));
add('pend-angle-mcq', mcq({
  stem: 'The oscillations of a simple pendulum are simple harmonic only if',
  right: 'the angle of swing is small, so that sin θ is nearly equal to θ',
  wrong: ['the bob is very heavy compared with the string', 'the string is elastic and can stretch', 'the bob moves with a constant speed along the arc'],
  sol: 'The restoring force along the arc is mg sin θ. It is proportional to the displacement only when sin θ ≈ θ (θ in radian), which holds for small angles — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('pendmass-ar', ar({
  a: 'The period of a simple pendulum swinging through a small angle is the same for a steel bob and a wooden bob of equal size on strings of equal length.',
  r: 'The restoring force on the bob and its inertia are both proportional to its mass, so the acceleration along the arc does not depend on the mass.',
  key: 'a',
  sol: 'Both are true and R explains A: the arc acceleration is g sin θ ≈ gθ for any mass, so ω² = g/L and the period contains no m — option (a).',
  d: 3, c: 'understanding', t: [3],
}));

// numericals
const p1 = { L: 0.64 };
p1.T = pendT(p1.L, G);
add('pend-T-num', num({
  stem: 'A simple pendulum has a length of 0.64 m. Taking g = 9.8 m s⁻², find its period for small oscillations, in s (3 significant figures).',
  value: v3(p1.T), tol: tl(p1.T), unit: 's',
  sol: r`$T = 2\pi\sqrt{\dfrac{L}{g}} = 2\pi\sqrt{\dfrac{0.64}{9.8}} = 2\pi \times ${dec(Math.sqrt(p1.L / G), 4)} = ${dec(p1.T, 3)}$ s.`,
  scheme: [['T = 2π√(L/g)', 1], [`T = ${dec(p1.T, 3)} s`, 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(pendulumPeriodSim(p1.L, G, 0.05), q.answer.value, 0.005) || 'p1');
const p2 = { T: 1.5 };
p2.L = (G * p2.T ** 2) / (4 * PI * PI);
add('pend-L-num', num({
  stem: 'A homemade pendulum for a science exhibition in Kochi must have a period of exactly 1.50 s. Taking g = 9.8 m s⁻², find the length of the string in m (3 significant figures).',
  value: v3(p2.L), tol: tl(p2.L), unit: 'm',
  sol: r`$T = 2\pi\sqrt{L/g}$ gives $L = \dfrac{gT^2}{4\pi^2} = \dfrac{9.8 \times 1.50^2}{4\pi^2} = \dfrac{${dec(G * p2.T ** 2, 4)}}{${dec(4 * PI * PI, 5)}} = ${dec(p2.L, 3)}$ m.`,
  scheme: [['L = gT²/4π²', 1], [`9.8 × 1.50² = ${dec(G * p2.T ** 2, 4)} and 4π² = ${dec(4 * PI * PI, 5)}`, 1], [`L = ${dec(p2.L, 3)} m`, 1]],
  marks: 3, d: 2, c: 'application', t: [3],
}), (q) => near(pendulumPeriodSim(q.answer.value, G, 0.05), p2.T, 0.005) || 'p2');
const p3 = { L: 0.9, g: 3.7 };
p3.T = pendT(p3.L, p3.g);
add('pend-mars-num', num({
  stem: 'A simple pendulum of length 0.90 m is set swinging through a small angle on Mars, where g = 3.7 m s⁻². Find its period in s (3 significant figures).',
  value: v3(p3.T), tol: tl(p3.T), unit: 's',
  sol: r`$T = 2\pi\sqrt{\dfrac{L}{g}} = 2\pi\sqrt{\dfrac{0.90}{3.7}} = 2\pi \times ${dec(Math.sqrt(p3.L / p3.g), 4)} = ${dec(p3.T, 3)}$ s.`,
  scheme: [['T = 2π√(L/g) with g = 3.7 m s⁻²', 1], [`T = ${dec(p3.T, 3)} s`, 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(pendulumPeriodSim(p3.L, p3.g, 0.05), q.answer.value, 0.005) || 'p3');
const p4 = { L: 0.45, n: 30 };
p4.T = pendT(p4.L, G);
p4.t = p4.n * p4.T;
add('pend-count-num', num({
  stem: 'A student times a simple pendulum of length 0.45 m swinging through a small angle. How long, in s, will 30 complete oscillations take? Take g = 9.8 m s⁻² and give 3 significant figures.',
  value: v3(p4.t), tol: tl(p4.t), unit: 's',
  sol: r`$T = 2\pi\sqrt{\dfrac{0.45}{9.8}} = ${dec(p4.T, 4)}$ s. Time for 30 oscillations $= 30 \times ${dec(p4.T, 4)} = ${dec(p4.t, 3)}$ s.`,
  scheme: [['T = 2π√(L/g)', 1], [`t = 30T = ${dec(p4.t, 3)} s`, 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(30 * pendulumPeriodSim(p4.L, G, 0.05), q.answer.value, 0.005) || 'p4');
const p5 = { n1: 10, n2: 6, diff: 0.64 };
p5.ratio = (p5.n2 / p5.n1) ** 2; // L1/L2 with 1 the short pendulum
p5.L2 = p5.diff / (1 - p5.ratio);
p5.L1 = p5.L2 * p5.ratio;
add('pend-ratio-num', num({
  stem: 'In the same interval of time one simple pendulum completes 10 oscillations while another completes 6. The lengths of the two pendulums differ by 0.64 m. Find the length of the longer pendulum in m (3 significant figures).',
  value: v3(p5.L2), tol: tl(p5.L2), unit: 'm',
  sol: r`In a time $t$, the number of oscillations is $t/T$, so $T_1/T_2 = 6/10$ with pendulum 1 the one that completes 10. Since $T \propto \sqrt{L}$, $\dfrac{L_1}{L_2} = \left(\dfrac{6}{10}\right)^2 = ${dec(p5.ratio, 2)}$. With $L_2 - L_1 = 0.64$: $L_2(1 - ${dec(p5.ratio, 2)}) = 0.64$, so $L_2 = ${dec(p5.L2, 3)}$ m (and $L_1 = ${dec(p5.L1, 3)}$ m).`,
  scheme: [[`T = t/n gives T₁/T₂ = 6/10, and L ∝ T² gives L₁/L₂ = ${dec(p5.ratio, 2)}`, 1], [`L₂ − L₁ = 0.64 gives L₂(1 − ${dec(p5.ratio, 2)}) = 0.64`, 1], [`L₂ = ${dec(p5.L2, 3)} m`, 1]],
  marks: 3, d: 4, c: 'analysis', t: [3],
}), (q) => {
  const L2 = q.answer.value;
  const L1 = L2 - p5.diff;
  // 10 swings of the short pendulum take as long as 6 swings of the long one
  return near(p5.n1 * pendulumPeriodSim(L1, G, 0.05), p5.n2 * pendulumPeriodSim(L2, G, 0.05), 0.005) || 'p5';
});
const p6 = { g1: 9.8, g2: 9.78, day: 86400 };
p6.lag = p6.day * (1 - Math.sqrt(p6.g2 / p6.g1));
add('pend-clock-num', num({
  stem: 'A pendulum clock keeps correct time in a town where g = 9.80 m s⁻². It is carried to a hill station where g = 9.78 m s⁻² and the length of the pendulum is unchanged. How many seconds does it lose in one day of 86 400 s? Give the answer in s (3 significant figures).',
  value: v3(p6.lag), tol: tl(p6.lag), unit: 's',
  sol: r`$T \propto 1/\sqrt{g}$, so each swing becomes longer in the ratio $T'/T = \sqrt{9.80/9.78}$. In 86 400 s of true time the clock counts fewer swings, and shows $86\,400 \times \sqrt{9.78/9.80} = ${dec(p6.day * Math.sqrt(p6.g2 / p6.g1), 7)}$ s. Time lost $= 86\,400 - ${dec(p6.day * Math.sqrt(p6.g2 / p6.g1), 7)} = ${dec(p6.lag, 3)}$ s.`,
  scheme: [['T ∝ 1/√g: T′/T = √(9.80/9.78)', 1], ['Clock shows 86 400 × √(9.78/9.80) s', 1], [`Time lost = ${dec(p6.lag, 3)} s`, 1]],
  marks: 3, d: 4, c: 'analysis', t: [3],
}), (q) => {
  const T0 = pendulumPeriodSim(1, p6.g1, 0.05);
  const T1 = pendulumPeriodSim(1, p6.g2, 0.05);
  return near(p6.day * (1 - T0 / T1), q.answer.value, 0.01) || 'p6';
});

// short answers
add('pendsmall-short', short({
  marks: 2,
  stem: 'Why must the angle of swing be small if the motion of a simple pendulum is to be simple harmonic?',
  model: r`The restoring force along the arc is $-mg\sin\theta$. It is proportional to the displacement $s = L\theta$ only when $\sin\theta \approx \theta$, with $\theta$ in radian, which is true for **small angles** (a few degrees). For larger angles $\sin\theta$ is noticeably smaller than $\theta$, the force is no longer proportional to $s$, and the motion is not exactly simple harmonic.`,
  sol: 'sin θ ≈ θ only for small θ.',
  scheme: [['Restoring force is −mg sin θ', 1], ['Proportional to s = Lθ only if sin θ ≈ θ, true for small angles', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('pendmass-short', short({
  marks: 2,
  stem: 'Explain why the period of a simple pendulum does not depend on the mass of its bob.',
  model: r`The restoring force on the bob along the arc is $mg\sin\theta \approx mg\theta$, which is **proportional to the mass**. The inertia of the bob in Newton's second law is also $m$. So the acceleration along the arc, $g\theta$, does not contain $m$, and $T = 2\pi\sqrt{L/g}$ has no $m$ in it.`,
  sol: 'm cancels in F = ma.',
  scheme: [['Restoring force ∝ m (weight component)', 1], ['Inertia ∝ m, so m cancels: a = gθ and T = 2π√(L/g)', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('pendT-short3', short({
  marks: 3,
  stem: 'A simple pendulum of length L has a bob of mass m, displaced through a small angle θ from the vertical. Derive the expression for its time period.',
  model: r`The component of the weight along the arc is the restoring force, $F = -mg\sin\theta \approx -mg\theta$ for small $\theta$. With arc length $s = L\theta$, this is $F = -\dfrac{mg}{L}\,s$, which is proportional to the displacement $s$: the motion is simple harmonic. Then $ma = -\dfrac{mg}{L}s$ gives $a = -\dfrac{g}{L}s$, so $\omega^2 = \dfrac{g}{L}$ and the period is $T = \dfrac{2\pi}{\omega} = 2\pi\sqrt{\dfrac{L}{g}}$, independent of the mass.`,
  sol: 'F = −mg sin θ ≈ −(mg/L)s; ω² = g/L; T = 2π√(L/g).',
  scheme: [['Restoring force −mg sin θ ≈ −mgθ = −(mg/L)s', 1], ['SHM: a = −(g/L)s, ω² = g/L', 1], ['T = 2π√(L/g)', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('compare-short3', short({
  marks: 3,
  stem: 'A simple pendulum and a block on a spring are both taken from the Earth to the Moon. State what happens to the period of each, with reasons.',
  model: r`The pendulum period $T = 2\pi\sqrt{L/g}$ depends on $g$, which is smaller on the Moon (about one sixth of its value on the Earth), so the pendulum swings **more slowly**, with a longer period. The spring period $T = 2\pi\sqrt{m/k}$ contains only the mass and the spring constant, neither of which changes, so the period of the spring oscillator is **unchanged**. Gravity supplies the restoring force of the pendulum but not of the spring.`,
  sol: 'Pendulum slower; spring unchanged.',
  scheme: [['Pendulum: T ∝ 1/√g, g smaller on the Moon, period longer', 1], ['Spring: T = 2π√(m/k), no g, unchanged', 1], ['Restoring force is gravity for the pendulum, the spring for the block', 1]],
  d: 3, c: 'understanding', t: [2, 3],
}));
