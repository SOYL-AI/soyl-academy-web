// ch13 question bank, part 4: long answers (5 marks) and case-based items (4 marks: 1 + 1 + 2 with an either/or part (c)).
import { mk, add, r, dec, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { PI, G, omegaOfT, omegaOfF, pendT, springT, springAt, springPeriodSim, pendulumPeriodSim, vAt, energies, v3, tl } from './phys.mjs';

const { mcq, num, short, long, part } = mk;

// ================================================================ long answers
const l1 = { A: 0.05, T: 0.2 };
l1.om = omegaOfT(l1.T);
l1.vmax = l1.A * l1.om;
l1.amax = l1.A * l1.om ** 2;
add('shm-long', long({
  stem: '(a) Define simple harmonic motion and write the equation for the displacement of a particle in SHM, naming each symbol. (b) By differentiation obtain the velocity and the acceleration, and state where each is greatest. (c) A particle in SHM has an amplitude of 0.050 m and a period of 0.20 s. Find its maximum speed and maximum acceleration.',
  model: r`(a) In SHM the acceleration is proportional to the displacement from a fixed point and directed towards it. The displacement is $x = A\cos(\omega t + \phi)$: $A$ is the amplitude, $\omega = 2\pi/T$ the angular frequency, $(\omega t + \phi)$ the phase and $\phi$ the phase constant.

(b) $v = \dfrac{dx}{dt} = -A\omega\sin(\omega t + \phi)$ and $a = \dfrac{dv}{dt} = -A\omega^2\cos(\omega t + \phi) = -\omega^2 x$. The speed is greatest, $A\omega$, at $x = 0$; the acceleration is greatest, $A\omega^2$, at $x = \pm A$.

(c) $\omega = \dfrac{2\pi}{0.20} = ${dec(l1.om, 4)}$ rad s$^{-1}$. $v_\text{max} = A\omega = 0.050 \times ${dec(l1.om, 4)} = ${dec(l1.vmax, 3)}$ m s$^{-1}$ and $a_\text{max} = A\omega^2 = 0.050 \times (${dec(l1.om, 4)})^2 = ${dec(l1.amax, 3)}$ m s$^{-2}$.`,
  sol: 'Definition and equation; v and a; 1.57 m/s and 49.3 m/s².',
  scheme: [['Definition of SHM and x = A cos(ωt + φ) with the symbols named', 1], ['v = −Aω sin(ωt + φ)', 1], ['a = −ω²x, with the positions of the maxima', 1], [`ω = 2π/T = ${dec(l1.om, 4)} rad/s; v_max = Aω = ${dec(l1.vmax, 3)} m/s`, 1], [`a_max = Aω² = ${dec(l1.amax, 3)} m/s²`, 1]],
  d: 3, c: 'application', t: [1], wl: null,
}), () => {
  const [, v] = springAt(1, l1.om ** 2, l1.A, 0, l1.T / 4);
  const h = 1e-7;
  const [, v2] = springAt(1, l1.om ** 2, l1.A, 0, h, 1e-8);
  return (near(Math.abs(v), l1.vmax, 0.001) && near(Math.abs(v2 / h), l1.amax, 0.001)) || 'l1';
});
const l2 = { R: 0.15, f: 3.0 };
l2.om = omegaOfF(l2.f);
l2.T = 1 / l2.f;
l2.vmax = l2.R * l2.om;
l2.tq = l2.T / 4;
add('ucm-long', long({
  stem: '(a) A particle P moves with constant angular speed ω on a circle of radius A. Show that the foot of the perpendicular from P on a diameter performs simple harmonic motion, and name what A, ω and the starting angle of P represent. (b) Show that the velocity of this foot is −Aω sin(ωt + φ). (c) P goes round a circle of radius 0.15 m at 3.0 revolutions per second. Find the maximum speed of the foot, and the time it takes to travel from the end of the diameter to the centre.',
  model: r`(a) Let OP make an angle $\omega t + \phi$ with the diameter. The foot Q of the perpendicular has $x = OQ = A\cos(\omega t + \phi)$, which is the equation of simple harmonic motion. The radius is the amplitude $A$, the angular speed of P is the angular frequency $\omega$, and the angle of OP at $t = 0$ is the phase constant $\phi$.

(b) P moves along the tangent with speed $A\omega$, and the tangent makes angle $\omega t + \phi$ with the vertical, so its component along the diameter is $-A\omega\sin(\omega t + \phi)$; this is the velocity of Q. It also follows from differentiating $x$.

(c) $\omega = 2\pi \times 3.0 = ${dec(l2.om, 4)}$ rad s$^{-1}$, so $v_\text{max} = A\omega = 0.15 \times ${dec(l2.om, 4)} = ${dec(l2.vmax, 3)}$ m s$^{-1}$. Going from the end to the centre is a quarter of a period: $T = 1/3.0 = ${dec(l2.T, 3)}$ s, so $t = T/4 = ${dec(l2.tq, 3)}$ s.`,
  sol: 'x = A cos(ωt + φ); v = −Aω sin(ωt + φ); 2.83 m/s; 0.0833 s.',
  scheme: [['Projection x = A cos(ωt + φ) is SHM', 1], ['A = radius, ω = angular speed, φ = starting angle', 1], ['Velocity of Q is the component −Aω sin(ωt + φ) of the velocity of P', 1], [`v_max = Aω = ${dec(l2.vmax, 3)} m/s`, 1], [`t = T/4 = ${dec(l2.tq, 3)} s`, 1]],
  d: 3, c: 'application', t: [1], wl: null,
}), () => {
  const t = Math.acos(0) / l2.om;
  return (near(t, l2.tq, 1e-9) && near(l2.R * omegaOfF(3), l2.vmax, 1e-12)) || 'l2';
});
const l3 = { m: 0.8, T: 0.5, m2: 1.8 };
l3.k = (4 * PI * PI * l3.m) / l3.T ** 2;
l3.T2 = springT(l3.m2, l3.k);
add('spring-long', long({
  stem: '(a) A block of mass m on a smooth horizontal table is joined to a light spring of force constant k. Prove that the block performs simple harmonic motion and derive the expression for its time period. (b) State the two quantities on which the period depends, and one on which it does not. (c) A block of mass 0.80 kg oscillates on such a spring with a period of 0.50 s. Find the force constant, and the period if the block is replaced by one of mass 1.8 kg.',
  model: r`(a) At displacement $x$ the spring exerts $F = -kx$ towards the mean position. Newton's second law gives $ma = -kx$, so $a = -\dfrac{k}{m}x$, which has the form $a = -\omega^2 x$ with $\omega^2 = \dfrac{k}{m}$. The motion is simple harmonic and $T = \dfrac{2\pi}{\omega} = 2\pi\sqrt{\dfrac{m}{k}}$.

(b) The period depends on the **mass** $m$ and the **force constant** $k$; it does not depend on the amplitude.

(c) $k = \dfrac{4\pi^2 m}{T^2} = \dfrac{4\pi^2 \times 0.80}{0.50^2} = ${dec(l3.k, 4)}$ N m$^{-1}$. For $m' = 1.8$ kg, $T' = 2\pi\sqrt{\dfrac{1.8}{${dec(l3.k, 4)}}} = ${dec(l3.T2, 3)}$ s (equal to $0.50\sqrt{1.8/0.80}$).`,
  sol: 'a = −(k/m)x; T = 2π√(m/k); k = 126 N/m; 0.75 s.',
  scheme: [['F = −kx and ma = −kx give a = −(k/m)x: SHM with ω² = k/m', 1], ['T = 2π√(m/k)', 1], ['Depends on m and k, not on the amplitude', 1], [`k = 4π²m/T² = ${dec(l3.k, 4)} N/m`, 1], [`T′ = ${dec(l3.T2, 3)} s`, 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => near(springPeriodSim(l3.m, l3.k, 0.05), l3.T, 0.001) && near(springPeriodSim(l3.m2, l3.k, 0.05), l3.T2, 0.001) && near(l3.T2, 0.75, 1e-9) || 'l3');
const l4 = { m: 0.5, k: 200, A: 0.1, x: 0.08 };
Object.assign(l4, energies(l4.k, l4.A, l4.x));
l4.v = Math.sqrt((2 * l4.ke) / l4.m);
add('energy-long', long({
  stem: '(a) Obtain expressions for the potential energy, the kinetic energy and the total energy of a body in simple harmonic motion at displacement x, and show that the total energy is constant. (b) State where the energy is wholly kinetic and where wholly potential. (c) A 0.50 kg block oscillates on a spring of force constant 200 N m⁻¹ with an amplitude of 0.10 m. Find the total energy, and the kinetic energy and speed of the block at x = 0.080 m.',
  model: r`(a) $\text{PE} = \tfrac{1}{2}kx^2$. With $v = \omega\sqrt{A^2 - x^2}$ and $k = m\omega^2$, $\text{KE} = \tfrac{1}{2}mv^2 = \tfrac{1}{2}k(A^2 - x^2)$. The sum $E = \tfrac{1}{2}k(A^2 - x^2) + \tfrac{1}{2}kx^2 = \tfrac{1}{2}kA^2$ does not contain $x$, so it is constant.

(b) The energy is wholly potential at the extremes $x = \pm A$ and wholly kinetic at the mean position.

(c) $E = \tfrac{1}{2} \times 200 \times 0.10^2 = ${dec(l4.total, 3)}$ J. At $x = 0.080$ m, $\text{PE} = \tfrac{1}{2} \times 200 \times 0.080^2 = ${dec(l4.pe, 3)}$ J, so $\text{KE} = ${dec(l4.total, 3)} - ${dec(l4.pe, 3)} = ${dec(l4.ke, 3)}$ J. Then $v = \sqrt{\dfrac{2 \times ${dec(l4.ke, 3)}}{0.50}} = ${dec(l4.v, 3)}$ m s$^{-1}$.`,
  sol: 'E = ½kA² constant; E = 1.00 J; KE = 0.360 J; v = 1.20 m/s.',
  scheme: [['PE = ½kx²', 1], ['KE = ½k(A² − x²) from v = ω√(A² − x²)', 1], ['E = ½kA², constant; wholly PE at ±A and wholly KE at the mean position', 1], [`E = ${dec(l4.total, 3)} J; PE at 0.080 m = ${dec(l4.pe, 3)} J`, 1], [`KE = ${dec(l4.ke, 3)} J; v = ${dec(l4.v, 3)} m/s`, 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => {
  const om = Math.sqrt(l4.k / l4.m);
  const t = Math.acos(l4.x / l4.A) / om;
  const [x, v] = springAt(l4.m, l4.k, l4.A, 0, t);
  return (near(x, l4.x, 1e-3) && near(Math.abs(v), l4.v, 0.001) && near(0.5 * l4.m * v * v, l4.ke, 0.002)) || 'l4';
});
const l5 = { L: 1.2 };
l5.T = pendT(l5.L, G);
l5.T2 = l5.T / 2;
l5.L2 = (G * l5.T2 ** 2) / (4 * PI * PI);
add('pend-long', long({
  stem: '(a) A simple pendulum of length L with a bob of mass m is displaced through a small angle θ. Resolve the weight of the bob and derive the expression for the period of its oscillations. (b) State two conditions needed for the formula to hold and say why the mass does not appear in it. (c) Find the period of a pendulum 1.20 m long (g = 9.8 m s⁻²), and the length of a pendulum with half that period.',
  model: r`(a) The weight $mg$ has a component $mg\cos\theta$ along the string, balanced by the tension, and a component $mg\sin\theta$ along the arc towards the lowest point: the restoring force $F = -mg\sin\theta$. For small $\theta$, $\sin\theta \approx \theta = s/L$, so $F = -\dfrac{mg}{L}s$, proportional to $s$: SHM. Then $a = -\dfrac{g}{L}s$, $\omega^2 = \dfrac{g}{L}$ and $T = 2\pi\sqrt{\dfrac{L}{g}}$.

(b) The angle of swing must be small, and the string must be light and inextensible (a point-like bob). The mass cancels because the restoring force and the inertia are both proportional to $m$.

(c) $T = 2\pi\sqrt{\dfrac{1.20}{9.8}} = ${dec(l5.T, 4)}$ s. Since $T \propto \sqrt{L}$, half the period needs a quarter of the length: $L' = \dfrac{1.20}{4} = ${dec(l5.L2, 3)}$ m (check: $\dfrac{g T'^2}{4\pi^2} = ${dec(l5.L2, 3)}$ m).`,
  sol: 'F = −mg sin θ ≈ −(mg/L)s; T = 2π√(L/g); 2.20 s; 0.300 m.',
  scheme: [['Weight resolved: mg cos θ along the string (balanced by T), mg sin θ along the arc', 1], ['sin θ ≈ θ = s/L: F = −(mg/L)s, SHM; ω² = g/L; T = 2π√(L/g)', 1], ['Small angle, light inextensible string; m cancels', 1], [`T = ${dec(l5.T, 4)} s`, 1], [`T′ = T/2 needs L′ = L/4 = ${dec(l5.L2, 3)} m`, 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(pendulumPeriodSim(l5.L, G, 0.05), l5.T, 0.002) && near(pendulumPeriodSim(l5.L2, G, 0.05), l5.T / 2, 0.002) && near(l5.L2, 0.3, 1e-9) || 'l5');

// ================================================================ case-based (4 marks: 1 + 1 + 2)
const c1 = { A: 0.08, n: 15, secs: 12.0, x: 0.04 };
c1.T = c1.secs / c1.n;
c1.om = omegaOfT(c1.T);
c1.vmax = c1.A * c1.om;
c1.v = vAt(c1.A, c1.om, c1.x);
c1.vhalf = c1.vmax / 2;
c1.frac = c1.v / c1.vmax;
add('trolley-case', mk.case({
  passage: 'In a school laboratory in Mysuru a motion sensor records a trolley that oscillates between two springs on a smooth track. The trolley moves in simple harmonic motion with an amplitude of 0.080 m, and the sensor shows that it completes 15 oscillations in 12.0 s.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The period of the oscillation of the trolley is',
      right: '0.80 s',
      wrong: ['1.25 s', '15 s', '0.080 s'],
      sol: r`Period $= \dfrac{12.0\ \text{s}}{15} = ${dec(c1.T, 2)}$ s. The value 1.25 is the frequency in hertz — option (@K).`,
      d: 1, c: 'application', t: [1],
    })),
    part('b', num({
      stem: 'Find the angular frequency of the oscillation, in rad s⁻¹ (3 significant figures).',
      value: v3(c1.om), tol: tl(c1.om), unit: 'rad/s',
      sol: r`$\omega = \dfrac{2\pi}{T} = \dfrac{2\pi}{${dec(c1.T, 2)}} = ${dec(c1.om, 3)}$ rad s$^{-1}$.`,
      scheme: [[`ω = 2π/T = ${dec(c1.om, 3)} rad/s`, 1]],
      d: 2, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Find the speed of the trolley when it is 0.040 m from the mean position, in m s⁻¹.',
      model: r`The speed at displacement $x$ is $v = \omega\sqrt{A^2 - x^2} = ${dec(c1.om, 4)}\sqrt{0.080^2 - 0.040^2} = ${dec(c1.om, 4)} \times ${dec(Math.sqrt(c1.A ** 2 - c1.x ** 2), 4)} = ${dec(c1.v, 3)}$ m s$^{-1}$. This is less than the maximum speed $A\omega = ${dec(c1.vmax, 3)}$ m s$^{-1}$, which the trolley reaches only when it passes through the mean position.`,
      sol: 'v = ω√(A² − x²) = 0.544 m/s.',
      scheme: [['v = ω√(A² − x²)', 1], [`v = ${dec(c1.v, 3)} m/s`, 1]],
      d: 3, c: 'application', t: [1],
    }), [
      short({
        marks: 2,
        stem: 'A student says that at half the amplitude the trolley has half its maximum speed. Evaluate this claim.',
        model: r`The claim is **wrong**. The speed depends on $\sqrt{A^2 - x^2}$, not on $x$ directly. At $x = A/2$, $v = \omega A\sqrt{1 - \tfrac{1}{4}} = ${dec(c1.frac, 3)}\,A\omega = ${dec(c1.v, 3)}$ m s$^{-1}$, which is ${dec(c1.frac * 100, 3)}% of the maximum speed and not half of it ($${dec(c1.vhalf, 3)}$ m s$^{-1}$).`,
        sol: 'v = 0.866 v_max, not 0.5 v_max.',
        scheme: [['Claim wrong: v = ω√(A² − x²) is not proportional to x', 1], [`At x = A/2, v = ${dec(c1.frac, 3)} v_max = ${dec(c1.v, 3)} m/s, not ${dec(c1.vhalf, 3)} m/s`, 1]],
        d: 4, c: 'evaluation', t: [1],
      }),
    ]),
  ],
}), (q) => {
  const T = springPeriodSim(1, c1.om ** 2, c1.A);
  const t = Math.acos(c1.x / c1.A) / c1.om;
  const [, v] = springAt(1, c1.om ** 2, c1.A, 0, t);
  return (near(T, 0.8, 0.002) && near(c1.om, q.children[1].answer.value, 0.002) && near(Math.abs(v), c1.v, 0.001)) || 'c1';
});
const c2 = { m: 0.3, k: 120, A: 0.05, x: 0.025 };
Object.assign(c2, energies(c2.k, c2.A, c2.x));
c2.v = Math.sqrt((2 * c2.ke) / c2.m);
c2.keFrac = c2.ke / c2.total;
add('glider-case', mk.case({
  passage: 'A demonstrator in a physics laboratory in Bhopal uses an air track, so that friction is negligible. A glider of mass 0.30 kg is joined to a light spring of force constant 120 N m⁻¹, pulled 0.050 m from the mean position, and released from rest.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'At the instant the glider is released, the energy of the glider and spring is',
      right: 'entirely potential energy stored in the spring',
      wrong: ['entirely kinetic energy of the glider', 'half kinetic and half potential', 'zero, since the glider is at rest'],
      sol: 'At release the glider is at its extreme position and at rest, so its kinetic energy is zero. The spring is stretched by the full amplitude, so all the energy, ½kA², is potential — option (@K).',
      d: 1, c: 'understanding', t: [2],
    })),
    part('b', num({
      stem: 'Find the total energy of the oscillation, in J (3 significant figures).',
      value: v3(c2.total), tol: tl(c2.total), unit: 'J',
      sol: r`$E = \tfrac{1}{2}kA^2 = \tfrac{1}{2} \times 120 \times (0.050)^2 = ${dec(c2.total, 3)}$ J.`,
      scheme: [[`E = ½kA² = ${dec(c2.total, 3)} J`, 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Find the speed of the glider when it is 0.025 m from the mean position, in m s⁻¹.',
      model: r`At $x = 0.025$ m the potential energy of the spring is $\tfrac{1}{2} \times 120 \times 0.025^2 = ${dec(c2.pe, 3)}$ J, so by conservation of energy the kinetic energy is $${dec(c2.total, 3)} - ${dec(c2.pe, 3)} = ${dec(c2.ke, 4)}$ J. Then the speed is $v = \sqrt{\dfrac{2\,\text{KE}}{m}} = \sqrt{\dfrac{2 \times ${dec(c2.ke, 4)}}{0.30}} = ${dec(c2.v, 3)}$ m s$^{-1}$.`,
      sol: 'KE = E − PE = 0.1125 J; v = 0.866 m/s.',
      scheme: [[`PE = ${dec(c2.pe, 3)} J, KE = E − PE = ${dec(c2.ke, 4)} J`, 1], [`v = √(2KE/m) = ${dec(c2.v, 3)} m/s`, 1]],
      d: 3, c: 'application', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'A student says that when the glider is half way between the mean position and the extreme, half of the total energy is kinetic. Evaluate this claim.',
        model: r`The claim is **wrong**. Potential energy is proportional to $x^2$, so at $x = A/2$ it is only $(1/2)^2 = \tfrac{1}{4}$ of the total energy. The kinetic energy is the remaining $\tfrac{3}{4}$, that is ${dec(c2.keFrac * 100, 3)}% of $E$ ($${dec(c2.ke, 4)}$ J out of $${dec(c2.total, 3)}$ J), and not one half.`,
        sol: 'KE is 75% of E.',
        scheme: [['Claim wrong: PE ∝ x², so PE = E/4 at x = A/2', 1], [`KE = ${dec(c2.keFrac * 100, 3)} % of E`, 1]],
        d: 4, c: 'evaluation', t: [2],
      }),
    ]),
  ],
}), (q) => {
  const om = Math.sqrt(c2.k / c2.m);
  const t = Math.acos(c2.x / c2.A) / om;
  const [x, v] = springAt(c2.m, c2.k, c2.A, 0, t);
  return (near(x, c2.x, 1e-3) && near(Math.abs(v), c2.v, 0.001) && near(c2.total, q.children[1].answer.value, 0.005) && near(c2.keFrac, 0.75, 1e-12)) || 'c2';
});
const c3 = { L: 4.0, deg: 6.0 };
c3.T = pendT(c3.L, G);
c3.om = Math.sqrt(G / c3.L);
c3.s0 = c3.L * ((c3.deg * PI) / 180);
c3.vmax = c3.s0 * c3.om;
add('museum-case', mk.case({
  passage: 'A science museum in Hyderabad hangs a heavy brass bob from a thin steel wire to make a simple pendulum of length 4.00 m. A visitor pulls the bob aside until the string makes an angle of 6.0° with the vertical and releases it, so that it swings through a small angle. Take g = 9.8 m s⁻².',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The period of the pendulum is given by',
      right: 'T = 2π√(L/g)',
      wrong: ['T = 2π√(g/L)', 'T = (1/2π)√(L/g)', 'T = 2π√(Lg)'],
      sol: 'For small angles ω² = g/L, so T = 2π/ω = 2π√(L/g). The other options invert g and L, put the 2π in the denominator, or multiply L by g, which does not even give a time — option (@K).',
      d: 1, c: 'recall', t: [3],
    })),
    part('b', num({
      stem: 'Find the period of the pendulum in s (3 significant figures).',
      value: v3(c3.T), tol: tl(c3.T), unit: 's',
      sol: r`$T = 2\pi\sqrt{\dfrac{L}{g}} = 2\pi\sqrt{\dfrac{4.00}{9.8}} = 2\pi \times ${dec(Math.sqrt(c3.L / G), 4)} = ${dec(c3.T, 3)}$ s.`,
      scheme: [[`T = 2π√(L/g) = ${dec(c3.T, 3)} s`, 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Treating the motion as simple harmonic, find the greatest speed of the bob, in m s⁻¹. The amplitude is the arc length of the 6.0° displacement.',
      model: r`The amplitude is the arc length $s_0 = L\theta_0 = 4.00 \times \dfrac{6.0\pi}{180} = ${dec(c3.s0, 3)}$ m. With $\omega = \sqrt{g/L} = ${dec(c3.om, 4)}$ rad s$^{-1}$, the greatest speed, reached at the lowest point of the swing, is $v_\text{max} = s_0\omega = ${dec(c3.s0, 3)} \times ${dec(c3.om, 4)} = ${dec(c3.vmax, 3)}$ m s$^{-1}$.`,
      sol: 's0 = 0.419 m; v_max = 0.656 m/s.',
      scheme: [[`Amplitude s₀ = Lθ₀ = ${dec(c3.s0, 3)} m`, 1], [`v_max = s₀ω = ${dec(c3.vmax, 3)} m/s`, 1]],
      d: 3, c: 'application', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'The museum replaces the brass bob by one of twice the mass, on the same wire. A visitor says the period will then be halved. Evaluate this claim.',
        model: r`The claim is **wrong**. The restoring force $mg\sin\theta$ and the inertia $m$ are both proportional to the mass, so $m$ cancels and the period $T = 2\pi\sqrt{L/g}$ depends only on $L$ and $g$. The period stays $${dec(c3.T, 3)}$ s for the heavier bob.`,
        sol: 'Period unchanged: 4.01 s.',
        scheme: [['Claim wrong: the mass cancels, T = 2π√(L/g)', 1], [`Period unchanged at ${dec(c3.T, 3)} s`, 1]],
        d: 4, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}), (q) => {
  const Tn = pendulumPeriodSim(c3.L, G, (c3.deg * PI) / 180);
  // exact energy conservation for the 6 degree swing: v^2 = 2 g L (1 - cos theta0)
  const vEnergy = Math.sqrt(2 * G * c3.L * (1 - Math.cos((c3.deg * PI) / 180)));
  return (near(Tn, c3.T, 0.005) && near(vEnergy, c3.vmax, 0.002) && near(c3.T, q.children[1].answer.value, 0.005)) || 'c3';
});
const c4 = { ms: [0.2, 0.4, 0.6, 0.8], k0: 100 };
c4.Ts = c4.ms.map((m) => Number(springT(m, c4.k0).toFixed(2)));
c4.m = c4.ms[3];
c4.T = c4.Ts[3];
c4.k = (4 * PI * PI * c4.m) / c4.T ** 2;
c4.m2 = 3.2;
c4.T2 = c4.T * Math.sqrt(c4.m2 / c4.m);
c4.wrong = c4.T * (c4.m2 / c4.m);
add('graph-case', mk.case({
  passage: `A student in Chennai attaches different blocks to the same light spring on a smooth horizontal table and measures the period of oscillation of each. The readings are: mass 0.20 kg, period ${c4.Ts[0].toFixed(2)} s; mass 0.40 kg, ${c4.Ts[1].toFixed(2)} s; mass 0.60 kg, ${c4.Ts[2].toFixed(2)} s; mass 0.80 kg, ${c4.Ts[3].toFixed(2)} s. She plots a graph of T² against m.`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The graph of T² against m is expected to be',
      right: 'a straight line through the origin, of slope 4π²/k',
      wrong: ['a straight line parallel to the m axis', 'a straight line through the origin, of slope k/4π²', 'a curve that bends towards the m axis'],
      sol: r`From $T = 2\pi\sqrt{m/k}$, $T^2 = \dfrac{4\pi^2}{k}\,m$: a straight line through the origin with slope $4\pi^2/k$ — option (@K).`,
      d: 2, c: 'understanding', t: [2],
    })),
    part('b', num({
      stem: `Use the reading for the 0.80 kg block to find the force constant of the spring, in N m⁻¹ (3 significant figures).`,
      value: v3(c4.k), tol: tl(c4.k), unit: 'N/m',
      sol: r`$k = \dfrac{4\pi^2 m}{T^2} = \dfrac{4\pi^2 \times 0.80}{${c4.T.toFixed(2)}^2} = \dfrac{${dec(4 * PI * PI * c4.m, 5)}}{${dec(c4.T ** 2, 4)}} = ${dec(c4.k, 3)}$ N m$^{-1}$.`,
      scheme: [[`k = 4π²m/T² = ${dec(c4.k, 3)} N/m`, 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Predict the period of a 3.2 kg block on the same spring, in s.',
      model: r`Since $T \propto \sqrt{m}$, the new mass is $3.2/0.80 = 4$ times the old one, so the period is $\sqrt{4} = 2$ times as long: $T' = ${c4.T.toFixed(2)} \times \sqrt{${dec(c4.m2 / c4.m, 2)}} = ${dec(c4.T2, 3)}$ s. (Using $k = ${dec(c4.k, 3)}$ N m$^{-1}$ in $2\pi\sqrt{m/k}$ gives the same value.)`,
      sol: 'T ∝ √m: 1.12 s.',
      scheme: [['T ∝ √m: mass ×4 gives period ×2', 1], [`T′ = ${dec(c4.T2, 3)} s`, 1]],
      d: 3, c: 'application', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'A friend says the period is proportional to the mass, so the 3.2 kg block would take 4 times as long as the 0.80 kg block. Evaluate this claim.',
        model: r`The claim is **wrong**. The period varies as the **square root** of the mass, $T = 2\pi\sqrt{m/k}$, not directly as $m$; the graph of $T^2$ against $m$ is straight, not that of $T$ against $m$. Quadrupling the mass doubles the period, to $${dec(c4.T2, 3)}$ s, not to $${dec(c4.wrong, 3)}$ s.`,
        sol: 'T doubles: 1.12 s, not 2.24 s.',
        scheme: [['Claim wrong: T ∝ √m, so ×4 mass gives ×2 period', 1], [`T′ = ${dec(c4.T2, 3)} s, not ${dec(c4.wrong, 3)} s`, 1]],
        d: 4, c: 'evaluation', t: [2],
      }),
    ]),
  ],
}), () => {
  const Tn = springPeriodSim(c4.m, c4.k, 0.05);
  return (near(Tn, c4.T, 0.002) && near(springPeriodSim(c4.m2, c4.k, 0.05), c4.T2, 0.002) && c4.Ts.map((x) => x.toFixed(2)).join(',') === '0.28,0.40,0.49,0.56') || 'c4';
});
void long;
void omegaOfT;
