// ch05 Work, Energy and Power — question bank, part 3: t04 (power; collisions in one and two dimensions). Every numerical is
// computed here and re-solved by an independent `check`.
import { mk, add, r, dec, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { g, ke, elastic, R6 } from './phys.mjs';

const { mcq, ar, tf, fill, num } = mk;
const v3 = (x) => Number(dec(x, 3));

// ---- power
const kw = { P: 1.8, h: 5 };
kw.kWh = kw.P * kw.h;
kw.J = kw.kWh * 3.6e6;
add('kwh-mcq', mcq({
  stem: 'An office air conditioner rated at 1.8 kW runs for 5 hours every working day. The energy it uses in one day, in joules, is',
  right: '3.24 × 10⁷ J',
  wrong: ['9.0 × 10³ J', '3.24 × 10³ J', '9.0 × 10⁷ J'],
  sol: r`Energy $= Pt = 1.8 \text{ kW} \times 5 \text{ h} = ${kw.kWh}$ kW h. With $1$ kW h $= 3.6 \times 10^6$ J: $${kw.kWh} \times 3.6 \times 10^6 = 3.24 \times 10^7$ J — option (@K).`,
  d: 2, c: 'application', t: [4],
}), () => near(kw.J, 3.24e7, 1e-9) || 'kw');
add('coll-mcq', mcq({
  stem: 'Two lumps of clay on a smooth table move towards each other, collide and stick together. For the system of the two lumps, in this collision',
  right: 'the total momentum is conserved but the total kinetic energy decreases',
  wrong: ['both the total momentum and the total kinetic energy are conserved', 'the total kinetic energy is conserved but the total momentum decreases', 'neither the total momentum nor the total kinetic energy is conserved'],
  sol: 'No external horizontal force acts, so momentum is conserved. The clay is deformed and warms up, so kinetic energy is lost: this is a perfectly inelastic collision — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('equalmass-mcq', mcq({
  stem: 'A carrom striker moving along a straight line hits an identical coin, at rest on the line, head-on. If the collision is elastic, immediately after it',
  right: 'the striker stops and the coin moves off with the striker’s original velocity',
  wrong: ['both move on together with half the original speed', 'the striker rebounds and the coin moves forward', 'both move forward with equal speeds'],
  sol: r`For $m_1 = m_2$: $v_1 = \dfrac{m_1 - m_2}{m_1 + m_2}u_1 = 0$ and $v_2 = \dfrac{2m_1}{m_1 + m_2}u_1 = u_1$ — option (@K).`,
  d: 1, c: 'understanding', t: [4],
}), () => { const [a, b] = elastic(7, 3, 7, 0); return near(a, 0) && near(b, 3, 1e-12) || 'em'; });
add('inel-ar', ar({
  a: 'In a perfectly inelastic collision between two bodies, the kinetic energy of the system decreases.',
  r: 'The total momentum of an isolated system is conserved in every collision.',
  key: 'b',
  sol: 'Both statements are true. But R does not explain A: momentum is conserved in all collisions, including elastic ones where kinetic energy is unchanged. The loss of kinetic energy arises because the bodies stick and the deformation work is dissipated. Option (b).',
  d: 3, c: 'analysis', t: [4],
}));
add('kwh-tf', tf({
  stem: 'A kilowatt hour is a unit of power equal to 1000 watts.',
  key: 'f',
  sol: 'False. The kilowatt hour is a unit of **energy**: the energy used by a 1 kW appliance in 1 hour, $3.6 \\times 10^6$ J. The unit of power is the watt (or kilowatt).',
  d: 1, c: 'recall', t: [4],
}));
add('unit-fill', fill({
  stem: 'On a household electricity bill, energy is charged in the commercial unit called the ___.',
  acc: [['kilowatt hour', 'kilowatt-hour', 'kW h', 'kWh', 'unit']],
  sol: 'The **kilowatt hour** (kW h), equal to $3.6 \\times 10^6$ J.',
  d: 1, c: 'recall', t: [4],
}));

const pm = { Pin: 1500, eff: 0.6, h: 18, t: 600 };
pm.Eout = pm.Pin * pm.eff * pm.t;
pm.m = pm.Eout / (g * pm.h);
add('power-num', num({
  stem: 'A farm pump takes 1500 W from the supply and is 60% efficient. How much water, in kg, can it lift through a height of 18 m in 10 minutes? Take $g = 9.8$ m/s².',
  value: Math.round(pm.m), tol: 5, unit: 'kg', marks: 2,
  sol: r`Useful output power $= 0.60 \times 1500 = ${pm.Pin * pm.eff}$ W, so the work done in $600$ s is $${pm.Pin * pm.eff} \times 600 = ${pm.Eout}$ J. This equals $mgh$: $m = \dfrac{${pm.Eout}}{9.8 \times 18} = ${Math.round(pm.m)}$ kg.`,
  scheme: [['Output power = efficiency × input power', 0.5], [`Work in 600 s = ${pm.Eout} J`, 0.5], [`m = W/(g h) = ${Math.round(pm.m)} kg`, 1]],
  d: 3, c: 'application', t: [4],
}), (q) => near(((0.6 * 1500) / (g * 18)) * 600, q.answer.value, 2e-3) || 'pm');
const hb = { P: 1.5, h: 4, days: 30, rate: 7.5 };
hb.kWh = hb.P * hb.h * hb.days;
hb.cost = hb.kWh * hb.rate;
add('kwhcost-num', num({
  stem: 'A 1.5 kW water heater runs for 4 hours every day for 30 days. If electricity costs ₹7.50 per kW h, find the cost of running it for the 30 days, in rupees.',
  value: hb.cost, tol: 0.5, unit: '₹', marks: 2,
  sol: r`Energy used $= 1.5 \times 4 \times 30 = ${hb.kWh}$ kW h. Cost $= ${hb.kWh} \times 7.50 = ${hb.cost}$ rupees.`,
  scheme: [[`Energy = 1.5 × 4 × 30 = ${hb.kWh} kW h`, 1], [`Cost = ${hb.kWh} × 7.50 = ₹${hb.cost}`, 1]],
  d: 2, c: 'application', t: [4],
}), (q) => near(1.5 * 120 * 7.5, q.answer.value, 1e-9) || 'hb');

// ---- collisions
const el = { m1: 2, u1: 5, m2: 3 };
[el.v1, el.v2] = elastic(el.m1, el.u1, el.m2, 0);
add('elastic-num', num({
  stem: 'A 2.0 kg trolley moving at 5.0 m/s collides head-on and elastically with a 3.0 kg trolley at rest on a straight track. Find the velocity of the 3.0 kg trolley after the collision, in m/s.',
  value: el.v2, tol: 0.02, unit: 'm/s', marks: 2,
  sol: r`$v_2 = \dfrac{2m_1}{m_1 + m_2}u_1 = \dfrac{2 \times ${el.m1}}{${el.m1} + ${el.m2}} \times ${el.u1} = ${el.v2}$ m/s. (The 2.0 kg trolley rebounds at $${el.v1}$ m/s; momentum: $${el.m1 * el.u1}$ before, $${el.m1 * el.v1 + el.m2 * el.v2}$ after.)`,
  scheme: [['Uses the elastic-collision result for a target at rest', 1], [`v₂ = ${el.v2} m/s`, 1]],
  d: 2, c: 'application', t: [4],
}), (q) => { // momentum + energy solved independently: v2 from p = m1 u1 and K conservation by bisection on v1
  let lo = -el.u1; let hi = el.u1;
  const f = (v1) => 0.5 * el.m1 * v1 ** 2 + 0.5 * el.m2 * ((el.m1 * (el.u1 - v1)) / el.m2) ** 2 - 0.5 * el.m1 * el.u1 ** 2;
  for (let i = 0; i < 200; i++) { const mid = (lo + hi) / 2; if (f(lo) * f(mid) <= 0) hi = mid; else lo = mid; }
  const v1 = (lo + hi) / 2;
  return near((el.m1 * (el.u1 - v1)) / el.m2, q.answer.value, 1e-6) || 'el';
});
const bc = { m: 60, u: 5, M: 40 };
bc.V = (bc.m * bc.u) / (bc.m + bc.M);
bc.lost = ke(bc.m, bc.u) - ke(bc.m + bc.M, bc.V);
add('stick-num', num({
  stem: 'A 60 kg boy running at 5.0 m/s along a smooth platform jumps onto a stationary 40 kg trolley and rides it. Find the kinetic energy lost in this process, in J.',
  value: R6(bc.lost), tol: 1, unit: 'J', marks: 2,
  sol: r`Momentum: $60 \times 5.0 = (60 + 40)V$, so $V = ${bc.V}$ m/s. Initial $K = \tfrac{1}{2} \times 60 \times 5.0^2 = ${ke(bc.m, bc.u)}$ J; final $K = \tfrac{1}{2} \times 100 \times ${bc.V}^2 = ${R6(ke(bc.m + bc.M, bc.V))}$ J. Loss $= ${ke(bc.m, bc.u)} - ${R6(ke(bc.m + bc.M, bc.V))} = ${R6(bc.lost)}$ J.`,
  scheme: [[`Common velocity V = ${bc.V} m/s from momentum`, 1], [`Loss = ${ke(bc.m, bc.u)} − ${R6(ke(bc.m + bc.M, bc.V))} = ${R6(bc.lost)} J`, 1]],
  d: 2, c: 'application', t: [4],
}), (q) => near(0.5 * ((bc.m * bc.M) / (bc.m + bc.M)) * bc.u ** 2, q.answer.value, 1e-9) || 'bc');
const rb = { h1: 1.5, h2: 0.96 };
rb.pct = ((rb.h1 - rb.h2) / rb.h1) * 100;
add('rebound-num', num({
  stem: 'A rubber ball dropped on a hard floor from a height of 1.50 m rebounds to a height of 0.96 m. What percentage of its kinetic energy is lost in the impact with the floor? (Neglect air resistance.)',
  value: R6(rb.pct), tol: 0.2, unit: '%', marks: 2,
  sol: r`Kinetic energy just before impact $= mgh_1$ and just after $= mgh_2$ (air resistance neglected). Percentage lost $= \dfrac{h_1 - h_2}{h_1} \times 100 = \dfrac{${rb.h1} - ${rb.h2}}{${rb.h1}} \times 100 = ${R6(rb.pct)}$ per cent.`,
  scheme: [['K before and after impact equal m g h₁ and m g h₂', 1], [`(h₁ − h₂)/h₁ = ${R6(rb.pct)} per cent`, 1]],
  d: 4, c: 'application', t: [4],
}), (q) => { const v1 = Math.sqrt(2 * g * rb.h1); const v2 = Math.sqrt(2 * g * rb.h2); return near(100 * (1 - (v2 / v1) ** 2), q.answer.value, 1e-9) || 'rb'; });
const td = { v: 5, v1: 3 };
td.v2 = Math.sqrt(td.v ** 2 - td.v1 ** 2);
add('twod-num', num({
  stem: 'A ball moving at 5.0 m/s strikes an identical ball at rest in a glancing elastic collision. After the collision the first ball moves at 3.0 m/s. Find the speed of the second ball, in m/s.',
  value: td.v2, tol: 0.02, unit: 'm/s', marks: 2,
  sol: r`For identical bodies in an elastic collision with one at rest, the velocities after the collision are perpendicular and $v^2 = v_1^2 + v_2^2$ (momentum and energy conservation together). So $v_2 = \sqrt{${td.v}^2 - ${td.v1}^2} = \sqrt{${td.v ** 2 - td.v1 ** 2}} = ${td.v2}$ m/s.`,
  scheme: [['Right-angle result: v² = v₁² + v₂²', 1], [`v₂ = √(25 − 9) = ${td.v2} m/s`, 1]],
  d: 4, c: 'analysis', t: [4],
}), (q) => { // energy conservation directly (equal masses): v² = v1² + v2²
  return near(Math.sqrt(2 * ke(1, td.v) - 2 * ke(1, td.v1)), q.answer.value, 1e-9) || 'td';
});
