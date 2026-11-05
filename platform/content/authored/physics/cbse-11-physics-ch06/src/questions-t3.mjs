// ch06 question bank, part 3: t03 equilibrium of rigid bodies, principle of moments, centre of gravity (g = 9.8 m/s² where used).
import { mk, add, r, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { g, dec, v3, rad } from './data.mjs';

const { mcq, ar, tf, fill, num, short, long, part } = mk;

const pk = { L: 3.0, Mp: 20, Mm: 45, xm: 0.75 };
pk.RR = (pk.Mp * g * (pk.L / 2) + pk.Mm * g * pk.xm) / pk.L;
pk.RL = (pk.Mp + pk.Mm) * g - pk.RR;
add('plank-num', num({
  stem: 'A uniform plank 3.0 m long, of mass 20 kg, bridges a stream and rests on a support at each end. A 45 kg woman stands 0.75 m from the left end. Take g = 9.8 m/s². Find the force exerted by the right-hand support, in N (3 significant figures).',
  value: v3(pk.RR), tol: 0.5, unit: 'N',
  sol: r`Moments about the left end remove the unknown left support force: $R_R \times 3.0 = 20 \times 9.8 \times 1.5 + 45 \times 9.8 \times 0.75$. So $R_R = \dfrac{${dec(pk.Mp * g * 1.5, 4)} + ${dec(pk.Mm * g * pk.xm, 5)}}{3.0} = ${dec(pk.RR, 4)}$ N.`,
  scheme: [['Moments about the left end, plank weight at 1.5 m', 1], [`R_R = ${dec(pk.RR, 4)} N`, 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(pk.RR + pk.RL, 65 * g, 1e-9) && near(pk.RL * pk.L, pk.Mp * g * 1.5 + pk.Mm * g * (pk.L - pk.xm), 1e-9) && near(q.answer.value, pk.RR, 2e-3) || 'pk');

add('eqcond-mcq', mcq({
  stem: 'Two children push in opposite directions at the two ends of a light bamboo pole lying on a smooth floor, each with a force of 25 N at right angles to the pole. The pole is then in',
  right: 'translational equilibrium but not rotational equilibrium',
  wrong: ['rotational equilibrium but not translational equilibrium', 'complete mechanical equilibrium', 'neither translational nor rotational equilibrium'],
  sol: 'The two forces are equal and opposite, so the net force is zero (translational equilibrium). They act along different lines, so they form a couple with a non-zero net torque; the pole starts to turn — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));

const lp = { m1: 15, m2: 5.0, L: 2.0 };
lp.x = (lp.m2 * lp.L) / (lp.m1 + lp.m2);
add('lever-mcq', mcq({
  stem: 'A porter balances a light bamboo pole 2.0 m long on his shoulder, with a 15 kg load at one end and a 5.0 kg load at the other. His shoulder must be placed',
  right: `${dec(lp.x, 2)} m from the 15 kg load`,
  wrong: ['0.50 m from the 5.0 kg load', '1.0 m from either load, at the midpoint', '1.5 m from the 15 kg load'],
  sol: `Equal moments about the shoulder: 15 × x = 5.0 × (2.0 − x), so x = 10/20 = ${dec(lp.x, 2)} m from the heavier load — option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => near(lp.x, 0.5, 1e-9) || 'lp');

add('cg-mcq', mcq({
  stem: 'The centre of gravity of a body coincides with its centre of mass when',
  right: 'the acceleration due to gravity is the same at every part of the body',
  wrong: ['the body is made of a single material', 'the body is perfectly rigid, whatever the gravity', 'the body is at rest on the ground'],
  sol: 'The weight of each particle is m g; if g is the same for all particles, the weights are proportional to the masses and the point of action of the total weight is the CM — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));

add('stab-mcq', mcq({
  stem: 'A bullock cart carrying sacks of grain is likely to overturn on a sloping village road. The cart is made more stable against overturning by',
  right: 'loading the heavy sacks at the bottom and using a wider wheelbase',
  wrong: ['piling the sacks high above the floor', 'narrowing the wheelbase to save space', 'moving all the load to the top of one side'],
  sol: 'A lower centre of gravity and a wider base keep the vertical line through the CG inside the base up to a larger tilt — option (@K).',
  d: 2, c: 'application', t: [3],
}));

add('moments-fill', fill({
  stem: 'A light beam rests on a single pivot with weights hung on either side and stays horizontal. The sum of the clockwise ___ about the pivot then equals the sum of the anticlockwise ones.',
  acc: [['moments', 'torques', 'moment', 'torque']],
  sol: 'This is the principle of **moments** for rotational equilibrium.',
  d: 1, c: 'recall', t: [3],
}));

add('eqind-tf', tf({
  stem: 'If the net force on a rigid body is zero and the net torque about one point is zero, the net torque about every other point is also zero.',
  key: 't',
  sol: 'True. With zero net force, shifting the reference point changes the total torque by (displacement) × (net force) = 0, so a body in equilibrium may have its moments taken about any convenient point.',
  d: 3, c: 'understanding', t: [3],
}));

add('cg-ar', ar({
  a: 'A uniform plank placed on a single trestle exactly at its midpoint stays horizontal.',
  r: 'The weight of the plank acts at its centre of gravity, directly above the trestle, so its torque about the trestle is zero.',
  key: 'a',
  sol: 'Both statements are true and R explains A: with the whole weight acting through the point of support, there is no net torque about it — option (a).',
  d: 2, c: 'understanding', t: [3],
}));

const cl = { Fe: 40, de: 0.30, dn: 0.06 };
cl.F = (cl.Fe * cl.de) / cl.dn;
add('claw-num', num({
  stem: 'A carpenter pulls the handle of a claw hammer with 40 N at right angles to it, 0.30 m from the pivot. The nail is held in the claw 0.06 m from the pivot. Find the force on the nail, in N.',
  value: cl.F, tol: 1, unit: 'N',
  sol: r`Moments about the pivot: $F \times 0.06 = 40 \times 0.30$, so $F = \dfrac{${dec(cl.Fe * cl.de, 3)}}{0.06} = ${cl.F}$ N.`,
  scheme: [['Equal moments about the pivot', 1]],
  d: 2, c: 'application', t: [3],
}), (q) => near(cl.F * cl.dn, cl.Fe * cl.de, 1e-9) && near(cl.F, q.answer.value, 1e-9) || 'cl');

const bk = { L: 1.0, M: 3.0, m: 1.0, th: 30 };
bk.T = (bk.M * g * (bk.L / 2) + bk.m * g * bk.L) / (bk.L * Math.sin(bk.th * rad));
add('bracket-num', num({
  stem: 'A uniform horizontal bar 1.0 m long and of mass 3.0 kg is hinged at a wall and held by a cable fixed to its free end, making 30° with the bar. A 1.0 kg board hangs from the free end. Find the tension in the cable, in N (g = 9.8 m/s²).',
  value: v3(bk.T), tol: 0.2, unit: 'N',
  sol: r`Moments about the hinge: $T \sin 30^\circ \times 1.0 = 3.0 \times 9.8 \times 0.50 + 1.0 \times 9.8 \times 1.0$. So $T \times 0.50 = ${dec(bk.M * g * 0.5, 4)} + ${dec(bk.m * g, 3)} = ${dec(bk.M * g * 0.5 + bk.m * g, 4)}$ and $T = \dfrac{${dec(bk.M * g * 0.5 + bk.m * g, 4)}}{0.50} = ${dec(bk.T, 3)}$ N.`,
  scheme: [['Moments about the hinge with T sin 30° as the effective component', 1], [`T = ${dec(bk.T, 3)} N`, 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(bk.T * Math.sin(bk.th * rad) * bk.L, 3 * g * 0.5 + g, 1e-9) && near(q.answer.value, 49, 1e-9) || 'bk');

const ld = { L: 5.0, x: 3.0, M: 20 };
ld.h = Math.sqrt(ld.L ** 2 - ld.x ** 2);
ld.W = ld.M * g;
ld.Nw = (ld.W * (ld.x / 2)) / ld.h;
add('ladder-num', num({
  stem: 'A uniform ladder 5.0 m long and of mass 20 kg leans against a smooth vertical wall with its foot 3.0 m from the wall, on rough ground. Find the force the wall exerts on the ladder, in N (g = 9.8 m/s²).',
  value: ld.Nw, tol: 0.1, unit: 'N',
  sol: r`The ladder reaches a height $\sqrt{5.0^2 - 3.0^2} = ${ld.h}$ m. Moments about the foot: the wall force (horizontal, at height ${ld.h} m) balances the weight $${dec(ld.W, 3)}$ N at horizontal distance $1.5$ m: $N \times ${ld.h} = ${dec(ld.W, 3)} \times 1.5$. So $N = \dfrac{${dec(ld.W * 1.5, 4)}}{${ld.h}} = ${dec(ld.Nw, 3)}$ N.`,
  scheme: [['Height 4.0 m; moments about the foot', 1], [`N = ${dec(ld.Nw, 3)} N`, 1]],
  marks: 2, d: 4, c: 'application', t: [3],
}), (q) => near(ld.h, 4, 1e-9) && near(ld.Nw * ld.h, ld.W * 1.5, 1e-9) && near(q.answer.value, 73.5, 1e-9) || 'ld');

const cp = { F: 4.5, d: 0.07 };
cp.tau = cp.F * cp.d;
add('couple-num', num({
  stem: 'To open a jar, a person presses on opposite sides of its lid with two fingers, each pushing tangentially with 4.5 N in opposite directions. The lid has diameter 7.0 cm. Find the torque of this couple, in N m.',
  value: v3(cp.tau), tol: 0.001, unit: 'N m',
  sol: r`The two forces are 7.0 cm apart, so $\tau = F \times d = 4.5 \times 0.070 = ${dec(cp.tau, 3)}$ N m.`,
  scheme: [['τ = F × distance between the lines of action']].map(([s]) => [s, 1]),
  d: 2, c: 'application', t: [3],
}), (q) => near(cp.tau, q.answer.value, 1e-9) || 'cp');

const gr = { m: 2.0, L: 1.0, M: 3.0 };
gr.x = (gr.m * (gr.L / 2) + gr.M * gr.L) / (gr.m + gr.M);
add('cgrod-num', num({
  stem: 'A uniform rod of mass 2.0 kg and length 1.0 m carries a small 3.0 kg weight fixed at one end. Find the distance from the free end at which the combination balances on a knife edge, in m.',
  value: gr.x, tol: 0.01, unit: 'm',
  sol: r`Measure from the free end: the rod’s weight acts at $0.50$ m and the 3.0 kg weight at $1.0$ m. $x = \dfrac{2.0 \times 0.50 + 3.0 \times 1.0}{2.0 + 3.0} = \dfrac{4.0}{5.0} = ${dec(gr.x, 3)}$ m.`,
  scheme: [['Balance point = CG of rod and weight', 1], [`x = ${dec(gr.x, 3)} m`, 1]],
  marks: 2, d: 3, c: 'application', t: [1, 3],
}), (q) => near(gr.x, q.answer.value, 1e-9) && near(gr.m * (gr.x - 0.5), gr.M * (1.0 - gr.x), 1e-9) || 'gr');

add('equil-short', short({
  marks: 2,
  stem: 'Distinguish between translational and rotational equilibrium of a rigid body, stating the condition for each.',
  model: 'A body is in translational equilibrium when the vector sum of the external forces on it is zero, so its centre of mass has no acceleration. It is in rotational equilibrium when the sum of the external torques about any point is zero, so its angular momentum does not change.',
  sol: 'Σ F = 0 and Σ τ = 0.',
  scheme: [['Translational: Σ F = 0, no acceleration of the CM', 1], ['Rotational: Σ τ = 0, no angular acceleration', 1]],
  d: 2, c: 'understanding', t: [3],
}));

add('topple-short', short({
  marks: 2,
  stem: 'Why is a lorry whose roof rack is piled high with luggage more likely to topple on a banked bend than the same lorry with the luggage on the floor?',
  model: 'Luggage on the roof raises the centre of gravity. The lorry topples once the vertical line through the centre of gravity falls outside the line joining the wheels. A higher centre of gravity reaches this limit at a smaller tilt, so the loaded lorry is less stable.',
  sol: 'Higher CG: the plumb line leaves the base at a smaller tilt.',
  scheme: [['Roof load raises the CG', 1], ['Vertical through the CG leaves the base at a smaller tilt', 1]],
  d: 3, c: 'application', t: [3],
}));

const bm = { L: 2.0, F: 30, x: 0.5 };
bm.RR = (bm.F * bm.x) / bm.L;
bm.RL = bm.F - bm.RR;
add('reactions-short3', short({
  marks: 3,
  stem: 'State the two conditions for equilibrium of a rigid body. A light beam 2.0 m long rests on supports at its two ends and carries a 30 N load 0.50 m from the left support. Find the support forces.',
  model: r`The two conditions are that the sum of the external forces is zero and the sum of the external torques is zero. Taking moments about the left support removes its unknown force: $R_R \times 2.0 = 30 \times 0.50$, so $R_R = ${dec(bm.RR, 3)}$ N. Balancing the vertical forces, the left support must supply the rest, $R_L = 30 - ${dec(bm.RR, 3)} = ${dec(bm.RL, 3)}$ N; the support nearer the load carries more.`,
  sol: 'Moments about one support, then balance of forces.',
  scheme: [['Conditions: ΣF = 0 and Στ = 0', 1], [`R_R = ${dec(bm.RR, 3)} N from moments`, 1], [`R_L = ${dec(bm.RL, 3)} N from the force balance`, 1]],
  d: 3, c: 'application', t: [3],
}), () => near(bm.RR, 7.5, 1e-9) && near(bm.RL, 22.5, 1e-9) || 'bm');

const lb = { L: 2.0, M: 5.0, th: 45 };
lb.T = (lb.M * g * (lb.L / 2)) / (lb.L * Math.sin(lb.th * rad));
lb.Hx = lb.T * Math.cos(lb.th * rad);
lb.Hy = lb.M * g - lb.T * Math.sin(lb.th * rad);
add('equil-long', long({
  stem: '(a) State the conditions for a rigid body to be in mechanical equilibrium, and state the principle of moments. [2] (b) A uniform bar 2.0 m long, of mass 5.0 kg, is hinged to a wall and held horizontal by a cable fixed to its free end and making 45° with the bar. Take g = 9.8 m/s². Find the tension in the cable. [2] (c) Find the vertical component of the force exerted by the hinge. [1]',
  model: r`(a) A rigid body is in mechanical equilibrium when the vector sum of the external forces is zero and the sum of the external torques about any point is zero. The principle of moments says that the clockwise moments about a point equal the anticlockwise moments. (b) Take moments about the hinge, so the unknown hinge force drops out. Only the component $T \sin 45^\circ$ perpendicular to the bar has a moment, with arm 2.0 m, balancing the weight 49 N acting at the middle: $T \sin 45^\circ \times 2.0 = 5.0 \times 9.8 \times 1.0$, so $T \approx ${dec(lb.T, 3)}$ N. (c) For the vertical forces, $H_y + T\sin 45^\circ = 49$, so $H_y = 49 - ${dec(lb.T * Math.sin(lb.th * rad), 3)} = ${dec(lb.Hy, 3)}$ N upward.`,
  sol: 'Moments about the hinge, then vertical balance.',
  scheme: [['(a) Σ F = 0 and Σ τ = 0', 1], ['(a) Principle of moments', 1], ['(b) Moments about the hinge', 1], [`(b) T ≈ ${dec(lb.T, 3)} N`, 1], [`(c) H_y = ${dec(lb.Hy, 3)} N`, 1]],
  d: 3, c: 'application', t: [3],
}), () => near(lb.T, 34.65, 1e-3) && near(lb.Hx, 24.5, 1e-9) && near(lb.Hy, 24.5, 1e-9) || 'lb');

const pc = { L: 5.0, M: 40, xb: 4.0, mm: 40 };
pc.W = pc.M * g;
pc.RB = (pc.W * (pc.L / 2) + pc.mm * g * pc.L) / pc.xb;
pc.RA = (pc.M + pc.mm) * g - pc.RB;
pc.mmax = (pc.M * (pc.xb - pc.L / 2)) / (pc.L - pc.xb);
add('plankcase', mk.case({
  passage: 'A 5.0 m long uniform plank of mass 40 kg is laid across a drain. One support A is under its left end; the other support B is 4.0 m from the left end, so the right end of the plank overhangs B by 1.0 m. A 40 kg man stands at the right end of the plank. Take g = 9.8 m/s².',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'It is convenient to take moments about the support A because',
      right: 'the unknown force at A then has zero moment and drops out of the equation',
      wrong: ['the force at A is always the larger one', 'moments can only be taken about a support', 'the plank turns about A when it tips'],
      sol: 'The line of action of the force at A passes through A, so its moment about A is zero; the equation then contains only the force at B — option (@K).',
      d: 2, c: 'understanding', t: [3],
    })),
    part('b', num({
      stem: 'Find the force exerted by support B, in N.',
      value: pc.RB, tol: 1, unit: 'N',
      sol: r`Moments about A: $R_B \times 4.0 = 40 \times 9.8 \times 2.5 + 40 \times 9.8 \times 5.0$. So $R_B = \dfrac{${dec(pc.W * 2.5, 4)} + ${dec(pc.mm * g * 5, 4)}}{4.0} = ${dec(pc.RB, 3)}$ N.`,
      scheme: [['Plank weight at 2.5 m and man at 5.0 m', 1]],
      d: 3, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Find the force exerted by support A.',
      model: r`The plank and the man weigh $80 \times 9.8 = ${dec((pc.M + pc.mm) * g, 4)}$ N in total, and the two supports must together balance this weight. So $R_A = ${dec((pc.M + pc.mm) * g, 4)} - ${dec(pc.RB, 3)} = ${dec(pc.RA, 3)}$ N, upward. It is small because the man’s weight beyond B nearly lifts the left end.`,
      sol: 'Vertical balance.',
      scheme: [['ΣF = 0: R_A + R_B = total weight', 1], [`R_A = ${dec(pc.RA, 3)} N`, 1]],
      d: 3, c: 'application', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'A student says that support A must carry half the weight of the plank, 196 N, because it is at one end of a uniform plank. Evaluate this claim.',
        model: 'The claim is **wrong**. Half the weight each is true only for supports at both ends and no other load. Here support B is 1.0 m inside the right end and the man’s weight acts beyond it, so B carries more and A carries only 49 N.',
        sol: 'Support positions and the man’s load matter.',
        scheme: [['Claim wrong: halves only for end supports with no extra load', 1], ['B inside the end and the man’s load make R_A = 49 N', 1]],
        d: 4, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}), (q) => near(pc.RB, 735, 1e-9) && near(pc.RA, 49, 1e-9) && near(q.children[1].answer.value, 735, 1e-9) && pc.RA > 0 || 'pc');

void ld;
void part;
void mcq;
