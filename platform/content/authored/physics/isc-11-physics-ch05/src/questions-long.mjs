// ISC 11 ch05 question bank, part 3: long answers (5 marks), set in parts with the marks shown.
import { mk, add, r, dec, near } from '../../isc-11-physics-ch01/src/lib.mjs';
import { g, rad, deg, atwood, atwoodEnergy, liftN, lamp, lampLin, ladder, ladderTop, impulseOf } from './phys.mjs';

const { long } = mk;
const f = (x, n = 3) => String(+x.toPrecision(n));

// ---------------------------------------------------------------- t02
const sc = { m: 1200, u: 10, v: 25, t: 6 };
sc.dp = sc.m * (sc.v - sc.u);
sc.F = sc.dp / sc.t;
add('second-long', long({
  stem: `(a) State Newton’s second law of motion in terms of momentum and write it as an equation. [2] (b) Hence obtain F = ma for a body of constant mass. [1] (c) The speed of a ${sc.m} kg car on a straight road rises from ${sc.u} m s⁻¹ to ${sc.v} m s⁻¹ in ${sc.t} s under a steady net force. Find the change in momentum and the net force. [2]`,
  model: r`(a) The rate of change of momentum of a body is proportional to the net force on it and takes place in the direction of the force. With a suitable unit, $\vec{F} = \dfrac{d\vec{p}}{dt}$.

(b) For constant mass $\vec{p} = m\vec{v}$, so $\vec{F} = m\dfrac{d\vec{v}}{dt} = m\vec{a}$, because the derivative of the velocity is the acceleration.

(c) The change in momentum is $\Delta p = m(v - u) = ${sc.m} \times (${sc.v} - ${sc.u}) = ${sc.dp}\ \text{kg m s}^{-1}$. The net force is the rate of change of momentum, $F = \dfrac{\Delta p}{\Delta t} = \dfrac{${sc.dp}}{${sc.t}} = ${f(sc.F)}\ \text{N}$.`,
  sol: 'Statement, constant-mass reduction, then Δp and Δp/Δt.',
  scheme: [['Net force proportional to the rate of change of momentum, along the force', 1], ['F = dp/dt', 1], ['F = m dv/dt = ma for constant m', 1], [`Δp = ${sc.m} × ${sc.v - sc.u} = ${sc.dp} kg m s⁻¹`, 1], [`F = ${sc.dp}/${sc.t} = ${f(sc.F)} N`, 1]],
  d: 3, c: 'application', t: [2],
}), () => { const a = (sc.v - sc.u) / sc.t; return near(sc.m * a, sc.F, 1e-9) && near(sc.F, 3000, 1e-9) && sc.dp === 18000 || 'second-long'; });

// ---------------------------------------------------------------- t03
const hk = { m: 0.17, u: 25, v: 30, t: 0.005, t2: 0.04 };
hk.J = hk.m * (hk.u + hk.v);
hk.F = hk.J / hk.t;
hk.F2 = (hk.m * hk.u) / hk.t2;
add('impulse-long', long({
  stem: `(a) Define impulse and show that it is equal to the change in momentum of the body. [2] (b) A hockey ball of mass ${hk.m} kg arrives at a stick at ${hk.u} m s⁻¹ and is hit back along the same line at ${hk.v} m s⁻¹, the contact lasting ${hk.t} s. Find (i) the impulse of the stick on the ball [1], (ii) the average force on the ball [1], and (iii) the average force needed to stop the same ball in ${hk.t2} s from ${hk.u} m s⁻¹ with a goalkeeper’s pad. [1]`,
  model: r`(a) Impulse is the product of a force and the time for which it acts. From the second law $F = \dfrac{\Delta p}{\Delta t}$, so $F\,\Delta t = \Delta p$: the impulse equals the change in momentum.

(b) The ball reverses its direction, so the two speeds add. (i) Taking the outgoing direction as positive, $J = m(v - u) = ${hk.m}\,(${hk.v} + ${hk.u}) = ${f(hk.J, 4)}\ \text{N s}$. (ii) $F = \dfrac{J}{\Delta t} = \dfrac{${f(hk.J, 4)}}{${hk.t}} = ${f(hk.F, 4)}\ \text{N}$. (iii) $F = \dfrac{${hk.m} \times ${hk.u}}{${hk.t2}} = ${f(hk.F2, 5)}\ \text{N}$, much smaller than in (ii) because the same change of momentum is spread over a longer time, and the ball is merely stopped, not reversed.`,
  sol: 'Reverse the direction in (i); a longer time in (iii) gives a smaller force.',
  scheme: [['Impulse = force × time of action', 1], ['F Δt = Δp from F = Δp/Δt', 1], [`J = ${hk.m} × (${hk.v} + ${hk.u}) = ${f(hk.J, 4)} N s`, 1], [`F = ${f(hk.J, 4)}/${hk.t} = ${f(hk.F, 4)} N`, 1], [`F = ${hk.m} × ${hk.u}/${hk.t2} = ${f(hk.F2, 5)} N`, 1]],
  d: 3, c: 'application', t: [3],
}), () => near(impulseOf(() => hk.F, 0, hk.t), hk.m * (hk.u + hk.v), 1e-6) && near(hk.J, 9.35, 1e-9) && near(hk.F, 1870, 1e-9) && near(hk.F2, 106.25, 1e-9) || 'impulse-long');
const rg = { M: 6, m: 0.04, v: 250, t: 0.25 };
rg.V = (rg.m * rg.v) / rg.M;
rg.F = (rg.M * rg.V) / rg.t;
add('recoil-long', long({
  stem: `(a) Derive the recoil velocity of a gun of mass M that fires a bullet of mass m with velocity v. [2] (b) A ${rg.M} kg gun fires a ${rg.m * 1000} g shell at ${rg.v} m s⁻¹. Find (i) the recoil speed of the gun [1], and (ii) the average force needed to bring the gun to rest in ${rg.t} s. [2]`,
  model: r`(a) Gun and bullet are at rest before firing, so the total momentum is zero, and it stays zero because the explosion uses only internal forces. Hence $0 = mv + MV$, so $V = -\dfrac{m}{M}v$: the gun recoils in the direction opposite to the bullet, slowly because $M$ is much larger than $m$.

(b) The mass of the shell must be taken in kilograms. (i) $V = \dfrac{mv}{M} =\dfrac{${rg.m} \times ${rg.v}}{${rg.M}} = ${f(rg.V)}\ \text{m s}^{-1}$. (ii) The impulse needed is the momentum of the gun, so $F = \dfrac{MV}{\Delta t} = \dfrac{${rg.M} \times ${f(rg.V, 4)}}{${rg.t}} = ${f(rg.F)}\ \text{N}$.`,
  sol: 'Conservation of momentum from rest; then stop the gun with an impulse.',
  scheme: [['Total momentum zero before and after (internal forces only): 0 = mv + MV', 1], ['V = −mv/M: opposite direction and small because M ≫ m', 1], [`V = ${rg.m} × ${rg.v}/${rg.M} = ${f(rg.V)} m s⁻¹`, 1], ['Impulse to stop the gun = MV, F = MV/Δt', 1], [`F = ${rg.M} × ${f(rg.V, 4)}/${rg.t} = ${f(rg.F)} N`, 1]],
  d: 3, c: 'application', t: [3],
}), () => near(rg.m * rg.v, rg.M * rg.V, 1e-9) && near(rg.F, 40, 1e-9) && near(impulseOf(() => rg.F, 0, rg.t), rg.M * rg.V, 1e-6) || 'recoil-long');
add('cons3-long', long({
  stem: '(a) Derive the law of conservation of linear momentum for an isolated system of two bodies, starting from Newton’s second law. [2] (b) Hence show that Newton’s third law follows from the conservation of momentum, and explain why the two forces of an action–reaction pair do not cancel each other. [3]',
  model: r`(a) For a system, the net external force equals the rate of change of the total momentum, $\vec{F}_{\text{ext}} = \dfrac{d\vec{P}}{dt}$ with $\vec{P} = \vec{p}_1 + \vec{p}_2$. In an isolated system $\vec{F}_{\text{ext}} = 0$, so $\dfrac{d\vec{P}}{dt} = 0$ and the total momentum is constant.

(b) For two bodies A and B interacting only with each other, $\vec{p}_A + \vec{p}_B$ is constant, so $\dfrac{d\vec{p}_A}{dt} = -\dfrac{d\vec{p}_B}{dt}$. By the second law these are the forces on A and on B: $\vec{F}_{\text{on A}} = -\vec{F}_{\text{on B}}$, the third law. They do not cancel because they act on different bodies.`,
  sol: 'Second law for the system, then differentiate the conserved total.',
  scheme: [['Second law for the system: F_ext = dP/dt', 1], ['Isolated: F_ext = 0, so P is constant', 1], ['p_A + p_B constant, so dp_A/dt = −dp_B/dt', 1], ['F on A = −F on B (third law)', 1], ['The pair acts on different bodies, so the forces cannot cancel', 1]],
  d: 3, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04
const aw = { m1: 9, m2: 7, t: 2 };
Object.assign(aw, atwood(aw.m1, aw.m2));
aw.v = aw.a * aw.t;
add('atwood-long', long({
  stem: `(a) Draw free-body diagrams for two masses m₁ > m₂ hung from a light string over a smooth pulley, and derive expressions for the acceleration and the tension. [3] (b) For m₁ = ${aw.m1} kg and m₂ = ${aw.m2} kg released from rest, with g = 9.8 m s⁻², find the acceleration, the tension, and the speed of the masses ${aw.t} s after release. [2]`,
  model: r`(a) The free-body diagram of each mass shows two forces only: its weight, downward, and the tension of the string, upward. Both masses have the same magnitude of acceleration $a$ and the string has one tension $T$, because it is light and the pulley is smooth. Applying the second law to each, for $m_1$ (down): $m_1g - T = m_1a$. For $m_2$ (up): $T - m_2g = m_2a$. Adding, $a = \dfrac{(m_1 - m_2)g}{m_1 + m_2}$ and $T = \dfrac{2m_1m_2g}{m_1 + m_2}$.

(b) Substituting the masses in kilograms and taking g as 9.8 metres per second squared, $a = \dfrac{(${aw.m1} - ${aw.m2})(9.8)}{${aw.m1} + ${aw.m2}} = ${f(aw.a, 4)}\ \text{m s}^{-2}$, $T = \dfrac{2(${aw.m1})(${aw.m2})(9.8)}{${aw.m1} + ${aw.m2}} = ${f(aw.T, 4)}\ \text{N}$, and $v = at = ${f(aw.a, 4)} \times ${aw.t} = ${f(aw.v, 3)}\ \text{m s}^{-1}$.`,
  sol: 'One equation per mass; add; then substitute the numbers.',
  scheme: [['Free-body diagrams: weight and tension on each mass; same a and T', 1], ['m₁g − T = m₁a and T − m₂g = m₂a, giving a = (m₁ − m₂)g/(m₁ + m₂)', 1], ['T = 2m₁m₂g/(m₁ + m₂)', 1], [`a = ${f(aw.a, 4)} m s⁻², T = ${f(aw.T, 4)} N`, 1], [`v = at = ${f(aw.v, 3)} m s⁻¹`, 1]],
  d: 3, c: 'application', t: [4],
}), () => { const e = atwoodEnergy(aw.m1, aw.m2); const h = 0.5 * e.a * aw.t * aw.t; const v = Math.sqrt((2 * (aw.m1 - aw.m2) * g * h) / (aw.m1 + aw.m2)); return near(e.a, aw.a, 1e-9) && near(e.T, aw.T, 1e-9) && near(v, aw.v, 1e-9) && near(aw.v, 2.45, 1e-9) || 'atwood-long'; });
const lv = { m: 70, N: 616 };
lv.a = g - lv.N / lv.m;
lv.N0 = lv.m * g;
add('lift-long', long({
  stem: `(a) A person of mass m stands on a weighing machine in a lift. Derive the reading of the machine when the lift accelerates with acceleration a (i) upward and (ii) downward. [3] (b) A ${lv.m} kg person sees the machine read ${lv.N} N. Taking g = 9.8 m s⁻², find the acceleration of the lift and its direction, and the reading if the lift moved at constant velocity. [2]`,
  model: r`(a) The forces on the person are the weight $mg$ downward and the normal reaction $N$ of the floor, upward, which is the reading. (i) For upward acceleration, $N - mg = ma$, so $N = m(g + a)$, more than the weight. (ii) For downward acceleration, $mg - N = ma$, so $N = m(g - a)$, less than the weight.

(b) The reading is below the weight $${f(lv.N0)}\ \text{N}$, so the lift accelerates downward: $${lv.m}(9.8 - a) = ${lv.N}$ gives $a = 9.8 - ${f(lv.N / lv.m)} = ${f(lv.a)}\ \text{m s}^{-2}$. At constant velocity the reading is $mg = ${f(lv.N0)}\ \text{N}$.`,
  sol: 'Normal reaction with the sign of the acceleration; the reading is below mg in (b).',
  scheme: [['Forces: mg down, N up (the reading)', 1], ['Upward acceleration: N − mg = ma, N = m(g + a)', 1], ['Downward acceleration: mg − N = ma, N = m(g − a)', 1], [`Reading ${lv.N} N < ${f(lv.N0)} N: downward, a = ${f(lv.a)} m s⁻²`, 1], [`Constant velocity: N = mg = ${f(lv.N0)} N`, 1]],
  d: 3, c: 'application', t: [4],
}), () => near(liftN(lv.m, -lv.a), lv.N, 1e-9) && near(lv.a, 1.0, 1e-9) && near(lv.N0, 686, 1e-9) || 'lift-long');

// ---------------------------------------------------------------- t05
const sg = { W: 180, a: 30, b: 45 };
Object.assign(sg, lamp(sg.W, sg.a, sg.b));
add('lamp-long', long({
  stem: `(a) State the triangle law of forces and Lami’s theorem. [2] (b) A traffic signal of weight ${sg.W} N hangs from a knot supported by two cables that make ${sg.a}° and ${sg.b}° with the horizontal. Find the tension in each cable. [3]`,
  model: r`(a) Triangle law: if three concurrent forces keep a particle in equilibrium, they can be drawn head to tail to form a closed triangle. Lami’s theorem: each of the three forces is proportional to the sine of the angle between the other two.

(b) The angle between the cables is $180^\circ - (${sg.a}^\circ + ${sg.b}^\circ) = ${180 - sg.a - sg.b}^\circ$, and $\sin${180 - sg.a - sg.b}^\circ = \sin${sg.a + sg.b}^\circ =${f(Math.sin(rad(sg.a + sg.b)), 4)}$. For the cable at ${sg.a}°: $T_1 = \dfrac{W\cos${sg.b}^\circ}{\sin${sg.a + sg.b}^\circ} = ${f(sg.T1, 4)}\ \text{N}$. For the cable at ${sg.b}°: $T_2 = \dfrac{W\cos${sg.a}^\circ}{\sin${sg.a + sg.b}^\circ} = ${f(sg.T2, 4)}\ \text{N}$.`,
  sol: 'Lami, or resolve horizontally and vertically.',
  scheme: [['Triangle law: three concurrent forces in equilibrium form a closed triangle', 1], ['Lami: each force proportional to the sine of the angle between the other two', 1], [`sin ${sg.a + sg.b}° = ${f(Math.sin(rad(sg.a + sg.b)), 4)} from the sum of the two cable angles`, 1], [`T₁ = W cos ${sg.b}°/sin ${sg.a + sg.b}° = ${f(sg.T1, 4)} N`, 1], [`T₂ = W cos ${sg.a}°/sin ${sg.a + sg.b}° = ${f(sg.T2, 4)} N`, 1]],
  d: 3, c: 'application', t: [5],
}), () => { const s = lampLin(sg.W, sg.a, sg.b); return near(s.T1, sg.T1, 1e-9) && near(s.T2, sg.T2, 1e-9) && near(sg.T1, 131.8, 2e-3) && near(sg.T2, 161.4, 2e-3) || 'lamp-long'; });
add('ladder-long', long({
  stem: '(a) A uniform ladder rests with its foot on rough ground and its top against a smooth vertical wall. Describe, or draw, the forces on the ladder and write the conditions of equilibrium. [2] (b) Derive an expression for the reaction of the wall in terms of the weight W of the ladder and its angle θ with the ground. [3]',
  model: r`(a) The weight $W$ acts down at the centre of the ladder. The smooth wall gives a horizontal reaction $N_w$ at the top. The ground gives a vertical reaction $N_f$ and a horizontal force $F_f$ at the foot. Equilibrium needs $\sum\vec{F} = 0$ and zero total torque.

(b) Vertically $N_f = W$ and horizontally $F_f = N_w$. Take torques about the foot, where the floor forces have no moment. The wall reaction has the arm $L\sin\theta$ and the weight has the arm $\dfrac{L}{2}\cos\theta$, so $N_wL\sin\theta = W\dfrac{L}{2}\cos\theta$ and $N_w = \dfrac{W}{2}\cot\theta$.`,
  sol: 'Torques about the foot remove the unknown floor forces.',
  scheme: [['Forces: W down at the middle; N_w horizontal at the top; N_f up and F_f horizontal at the foot', 1], ['Conditions: ΣF = 0 and Στ = 0', 1], ['N_f = W and F_f = N_w from force balance', 1], ['Torques about the foot: N_w L sin θ = W (L/2) cos θ', 1], ['N_w = (W/2) cot θ', 1]],
  d: 4, c: 'understanding', t: [5],
}), () => near(ladder(5, 40, 10).Nw, ((10 * g) / 2) / Math.tan(rad(40)), 1e-9) && near(ladderTop(5, 40, 10).Nw, ladder(5, 40, 10).Nw, 1e-9) || 'ladder-long');
const lg = { L: 4.5, th: 55, m: 12, M: 40, d: 3 };
const lgv = ladder(lg.L, lg.th, lg.m, lg.M, lg.d);
lg.R = Math.hypot(lgv.Nf, lgv.Ff);
lg.ang = deg(Math.atan2(lgv.Nf, lgv.Ff));
add('ladder2-long', long({
  stem: `A uniform ladder of length ${lg.L} m and mass ${lg.m} kg rests against a smooth wall, making ${lg.th}° with the level floor. A girl of mass ${lg.M} kg stands ${lg.d} m from the foot, measured along the ladder. Take g = 9.8 m s⁻². (a) Find the reaction of the wall. [3] (b) Find the normal reaction and the horizontal force at the floor, and the magnitude of the total floor reaction. [2]`,
  model: r`(a) Take torques about the foot, so that the unknown floor forces drop out of the equation. The wall reaction acts at the top. The ladder’s weight acts at its middle, $\dfrac{L}{2} = ${lg.L / 2}$ m along it, and the girl’s weight acts at ${lg.d} m. Then $N_w (L\sin${lg.th}^\circ) = mg\dfrac{L}{2}\cos${lg.th}^\circ + Mg\,d\cos${lg.th}^\circ$, that is $N_w \times ${f(lg.L * Math.sin(rad(lg.th)), 4)} = ${f(lg.m * g * (lg.L / 2) * Math.cos(rad(lg.th)), 4)} + ${f(lg.M * g * lg.d * Math.cos(rad(lg.th)), 4)}$, so $N_w = ${f(lgv.Nw, 4)}\ \text{N}$.

(b) The floor must support the weight of the ladder and the girl together. Vertical balance gives $N_f = (${lg.m} + ${lg.M})(9.8) = ${f(lgv.Nf, 4)}\ \text{N}$. Horizontal balance gives $F_f = N_w = ${f(lgv.Ff, 4)}\ \text{N}$. The total floor reaction is $\sqrt{${f(lgv.Nf, 4)}^2 + ${f(lgv.Ff, 4)}^2} = ${f(lg.R, 4)}\ \text{N}$.`,
  sol: 'Torques about the foot, then the two force balances.',
  scheme: [['Torque equation about the foot: N_w L sin θ = mg (L/2) cos θ + Mg d cos θ', 1], [`Moments ${f(lg.m * g * (lg.L / 2) * Math.cos(rad(lg.th)), 4)} N m and ${f(lg.M * g * lg.d * Math.cos(rad(lg.th)), 4)} N m; L sin θ = ${f(lg.L * Math.sin(rad(lg.th)), 4)} m`, 1], [`N_w = ${f(lgv.Nw, 4)} N`, 1], [`N_f = ${f(lgv.Nf, 4)} N and F_f = N_w = ${f(lgv.Ff, 4)} N`, 1], [`Total floor reaction = ${f(lg.R, 4)} N`, 1]],
  d: 5, c: 'application', t: [5],
}), () => { const e = ladderTop(lg.L, lg.th, lg.m, lg.M, lg.d); return near(e.Nw, lgv.Nw, 1e-9) && near(e.Nf, lgv.Nf, 1e-9) && near(Math.hypot(e.Nf, e.Ff), lg.R, 1e-9) && near(lgv.Nw, 224.2, 2e-3) || 'ladder2-long'; });
