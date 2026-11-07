// ch05 Work, Energy and Power — question bank, part 4: short answers (2 and 3 marks), long answers (5 marks) and case-based items.
// Numbers are computed here and re-solved by an independent `check`; model answers and schemes print the computed values.
import { mk, add, r, dec, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { g, integ, ke, elastic, dot, R6 } from './phys.mjs';

const { mcq, short, long, num, part } = mk;
const v3 = (x) => Number(dec(x, 3));

// ================================================================ short answers, 2 marks
add('conv-short', short({
  marks: 2,
  stem: 'A crate rests on the floor of a goods truck that speeds up along a straight road without the crate slipping. Name the force that accelerates the crate and say whether its work, measured with respect to the ground, is positive, negative or zero. Give a reason.',
  model: 'Static friction from the floor of the truck acts on the crate in the forward direction. The crate moves forward relative to the ground, so the force and the displacement point the same way and the work is positive. This work raises the kinetic energy of the crate.',
  sol: 'Static friction, forward; positive work.',
  scheme: [['Static friction from the truck floor, acting forward', 1], ['Force and displacement in the same direction, so the work is positive', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('closed-short', short({
  marks: 2,
  stem: 'Explain why the work done by a spring force over one full oscillation of a block on a smooth table is zero, whereas the work done by sliding friction over a round trip of a block on a rough table is not zero.',
  model: 'The spring force is conservative: its work depends only on the end points, so it is negative while the spring stretches and equally positive on the return, giving a zero total. Friction always opposes the motion, so its work is negative on every part of the trip and the contributions add up.',
  sol: 'Conservative versus non-conservative.',
  scheme: [['Spring force is conservative: work depends only on end positions, so a closed path gives zero', 1], ['Friction opposes motion everywhere, so its work is always negative and accumulates', 1]],
  d: 2, c: 'understanding', t: [3],
}));
const km = { m1: 2, m2: 8, p: 16 };
km.K1 = km.p ** 2 / (2 * km.m1);
km.K2 = km.p ** 2 / (2 * km.m2);
add('kemom-short', short({
  marks: 2,
  stem: 'A 2.0 kg trolley and an 8.0 kg trolley each have a momentum of 16 kg m/s. Find the kinetic energy of each and state which is larger.',
  model: r`Using $K = p^2/2m$: for the 2.0 kg trolley $K = 256/4.0 = ${km.K1}$ J, and for the 8.0 kg trolley $K = 256/16 = ${km.K2}$ J. The lighter trolley has the larger kinetic energy, ${km.K1 / km.K2} times as much, because at equal momentum $K$ is inversely proportional to the mass.`,
  sol: 'K = p²/2m.',
  scheme: [[`K = p²/2m gives ${km.K1} J and ${km.K2} J`, 1], ['The lighter trolley has the larger kinetic energy (ratio 4)', 1]],
  d: 2, c: 'application', t: [2],
}), () => near(ke(km.m1, km.p / km.m1), km.K1, 1e-12) && near(ke(km.m2, km.p / km.m2), km.K2, 1e-12) || 'km');
add('negarea-short', short({
  marks: 2,
  stem: 'A force acts along the x-axis and its F–x graph crosses the axis. Explain how the total work is obtained from the graph and what a region below the axis means physically.',
  model: 'The work equals the sum of the areas between the curve and the x-axis, with areas above the axis counted positive and those below counted negative. A region below the axis means the force points against the displacement there, so that part of the work is negative and takes energy away from the body.',
  sol: 'Signed area.',
  scheme: [['Total work = signed sum of areas under the curve', 1], ['Area below the axis: force opposite to displacement, negative work', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('lostke-short', short({
  marks: 2,
  stem: 'In a perfectly inelastic collision of two bodies the kinetic energy of the system falls, although energy is never destroyed. Where does the lost kinetic energy go, and which quantity is still conserved?',
  model: 'The lost kinetic energy changes into other forms: heat, sound and the energy of deforming the bodies, for example a bullet warming the wood it is stuck in. The total momentum of the system is still conserved, provided no external force acts during the short collision.',
  sol: 'Heat, sound, deformation; momentum conserved.',
  scheme: [['Heat, sound and deformation energy', 1], ['Total momentum still conserved', 1]],
  d: 2, c: 'understanding', t: [4],
}));
const rf = { m: 2, hs: 1.5, ht: 0.6 };
rf.U1 = R6(rf.m * g * rf.hs);
rf.U2 = R6(rf.m * g * (rf.hs - rf.ht));
rf.dU = R6(rf.m * g * rf.ht);
add('reflevel-short', short({
  marks: 2,
  stem: 'A 2.0 kg book lies on a shelf 1.5 m above the floor. One student measures its gravitational potential energy from the floor, another from the top of a table 0.60 m high. Taking $g = 9.8$ m/s², find the two values and comment on the difference.',
  model: r`From the floor: $U = mgh = 2.0 \times 9.8 \times 1.5 = ${rf.U1}$ J. From the table top: $U = 2.0 \times 9.8 \times 0.90 = ${rf.U2}$ J. Both are acceptable because only changes in potential energy matter; for a fall to the table both give $\Delta U = ${rf.dU}$ J.`,
  sol: 'Reference level is arbitrary.',
  scheme: [[`Values ${rf.U1} J and ${rf.U2} J`, 1], ['Only differences of potential energy have meaning, so the reference level is arbitrary', 1]],
  d: 2, c: 'application', t: [3],
}), () => near(rf.U1 - rf.U2, rf.dU, 1e-9) && near(rf.dU, 2 * 9.8 * 0.6, 1e-9) || 'rf');
add('drag-short', short({
  marks: 2,
  stem: 'A ball thrown vertically upward returns to the thrower’s hand with a smaller speed than it left with, because of air drag. Explain this in terms of work and energy, and say whether mechanical energy is conserved.',
  model: 'Air drag does negative work on the ball both on the way up and on the way down; the two contributions do not cancel but add. By the work–energy theorem the kinetic energy at return is smaller by this amount. Drag is non-conservative, so mechanical energy is not conserved; the loss appears as heat in the air.',
  sol: 'Drag does negative work on both trips.',
  scheme: [['Drag does negative work on both legs, and the amounts add', 1], ['Non-conservative force: mechanical energy not conserved; kinetic energy at return is smaller', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ================================================================ short answers, 3 marks
add('derive-we-short3', short({
  marks: 3,
  stem: 'Starting from $v^2 = u^2 + 2as$, derive the work–energy theorem for a body of mass $m$ acted on by a constant net force $F$ along a straight line.',
  model: r`Multiply $v^2 - u^2 = 2as$ by $m/2$: $\tfrac{1}{2}mv^2 - \tfrac{1}{2}mu^2 = mas$. By Newton’s second law $ma = F$, so the right side is $Fs$, the work done by the net force over the displacement $s$. The left side is the change in kinetic energy. Hence the net work done on a body equals the change in its kinetic energy.`,
  sol: 'Multiply by m/2 and use F = ma.',
  scheme: [['Multiplies v² − u² = 2as by m/2', 1], ['Uses F = ma so that the right side is F s = work', 1], ['States W = K_f − K_i', 1]],
  d: 2, c: 'understanding', t: [2],
}));
const su = { k: 400, x1: 0.1, x2: 0.2 };
su.dW = R6(0.5 * su.k * (su.x2 ** 2 - su.x1 ** 2));
add('springU-short3', short({
  marks: 3,
  stem: 'Using the force–extension graph of a spring, show that the energy stored when it is stretched by $x$ is $\\tfrac{1}{2}kx^2$. Hence find the extra work needed to stretch a spring of stiffness 400 N/m from an extension of 0.10 m to 0.20 m.',
  model: r`Within the elastic limit the force needed to stretch the spring rises uniformly from zero to $kx$, so the work done is the area of the triangle under the F–x line, $\tfrac{1}{2}(x)(kx) = \tfrac{1}{2}kx^2$, and this work is stored as elastic potential energy. The extra work between the two extensions is the difference of the stored energies: $\tfrac{1}{2} \times 400 \times (0.20^2 - 0.10^2) = ${su.dW}$ J.`,
  sol: 'Triangle area; difference of energies.',
  scheme: [['Force rises linearly from 0 to kx', 1], ['Work = area of triangle = ½ k x²', 1], [`Extra work = ½ × 400 × (0.20² − 0.10²) = ${su.dW} J`, 1]],
  d: 2, c: 'application', t: [3],
}), () => near(integ((x) => su.k * x, su.x1, su.x2), su.dW, 1e-9) || 'su');
const sm = { h: 1.8 };
sm.v = Math.sqrt(2 * g * sm.h);
add('smooth-short3', short({
  marks: 3,
  stem: 'A bead slides from rest down a smooth curved wire from a height $h$ above the lowest point. Show that its speed at the bottom does not depend on the shape of the wire or on its mass, and find the speed for $h = 1.8$ m ($g = 9.8$ m/s²).',
  model: r`The normal force of the smooth wire is always perpendicular to the motion and does no work; only gravity does work, which is conservative. So $mgh = \tfrac{1}{2}mv^2$, and $v = \sqrt{2gh}$ depends only on the height drop: the mass cancels and the shape does not enter. For $h = 1.8$ m, $v = \sqrt{2 \times 9.8 \times 1.8} = ${dec(sm.v, 3)}$ m/s.`,
  sol: 'Energy conservation.',
  scheme: [['Normal force does no work; gravity is conservative', 1], ['m g h = ½ m v², so v = √(2 g h), independent of m and shape', 1], [`v = √(2 × 9.8 × 1.8) = ${dec(sm.v, 3)} m/s`, 1]],
  d: 2, c: 'application', t: [3],
}), () => near(Math.sqrt(2 * 9.8 * 1.8), sm.v, 1e-12) || 'sm');
add('colltypes-short3', short({
  marks: 3,
  stem: 'Distinguish between elastic, inelastic and perfectly inelastic collisions in terms of the conservation of momentum and of kinetic energy. Give one example of each.',
  model: 'In every collision with no external force the momentum is conserved. In an elastic collision, such as two steel balls striking, kinetic energy is also conserved. In an inelastic collision, such as a rubber ball rebounding lower, some kinetic energy is lost. In a perfectly inelastic collision, such as two wagons coupling, the bodies move together and the loss is greatest.',
  sol: 'Momentum always; K only if elastic.',
  scheme: [['Momentum conserved in all three', 1], ['Elastic: K conserved; inelastic: some K lost; perfectly inelastic: bodies stick, greatest loss', 1], ['One correct example of each', 1]],
  d: 2, c: 'understanding', t: [4],
}));
const pe = { P: 40000, F: 2000 };
pe.v = pe.P / pe.F;
add('pfv-short3', short({
  marks: 3,
  stem: 'Show that the power delivered by a force $\\vec F$ to a body moving with velocity $\\vec v$ is $\\vec F\\cdot\\vec v$. A 40 kW locomotive engine pulls a train at a constant speed against a resistive force of 2.0 kN; find the speed.',
  model: r`In a short time $dt$ the body is displaced by $d\vec r = \vec v\,dt$, so the small work done by the force is $dW = \vec F\cdot d\vec r = \vec F\cdot\vec v\,dt$, and the power, the rate of doing work, is $P = dW/dt = \vec F\cdot\vec v$. At constant speed the pull of the engine equals the resistive force, so the speed is $v = P/F = \dfrac{40\,000}{2000} = ${pe.v}$ m/s.`,
  sol: 'P = dW/dt = F · v.',
  scheme: [['dW = F · v dt, so P = F · v', 1], ['At constant speed pull = resistance', 1], [`v = 40 000/2000 = ${pe.v} m/s`, 1]],
  d: 2, c: 'application', t: [4],
}), () => near((pe.P / pe.F) * pe.F, pe.P, 1e-12) || 'pe');
add('rightangle-short3', short({
  marks: 3,
  stem: 'A body of mass $m$ moving with velocity $\\vec u$ collides elastically with an identical body at rest. Show that, if the first body is deflected, the two bodies move off at right angles to each other.',
  model: r`Conservation of momentum for equal masses gives $\vec u = \vec v_1 + \vec v_2$. Taking the scalar product of each side with itself gives $u^2 = v_1^2 + v_2^2 + 2\,\vec v_1\cdot\vec v_2$. Conservation of kinetic energy for equal masses gives $u^2 = v_1^2 + v_2^2$. Comparing the two results, $\vec v_1\cdot\vec v_2 = 0$, so the two velocities are perpendicular, unless one of the bodies is at rest after the collision.`,
  sol: 'Square the momentum equation and compare with energy.',
  scheme: [['u = v₁ + v₂ from momentum', 1], ['u² = v₁² + v₂² + 2 v₁·v₂, compared with the energy equation u² = v₁² + v₂²', 1], ['v₁ · v₂ = 0: perpendicular', 1]],
  d: 3, c: 'analysis', t: [4],
}));

// ================================================================ long answers
const hm = { m: 1.5, v: 6, d: 0.02 };
hm.K = ke(hm.m, hm.v);
hm.F = R6(hm.K / hm.d);
add('wket-long', long({
  stem: '(a) State the work–energy theorem and derive it for a body of mass $m$ acted on by a constant net force $F$ along a straight line, changing its speed from $u$ to $v$ over a displacement $s$. [3]\n\n(b) A hammer of mass 1.5 kg moving at 6.0 m/s drives a nail 2.0 cm into a wooden beam and stops. Find the average resistive force of the beam on the hammer. [2]',
  model: r`(a) The work–energy theorem states that the net work done on a body by all the forces acting on it equals the change in its kinetic energy. For a constant net force along a straight line, Newton’s second law gives $F = ma$, and the equation of motion gives $v^2 = u^2 + 2as$. Multiplying by $m/2$, $Fs = mas = \tfrac{1}{2}m(v^2 - u^2)$, so the work $W = \tfrac{1}{2}mv^2 - \tfrac{1}{2}mu^2$. (b) The hammer loses all of its kinetic energy, $\tfrac{1}{2} \times 1.5 \times 6.0^2 = ${hm.K}$ J, and this equals the work done against the resistive force of the beam over the 2.0 cm: $F \times 0.020 = ${hm.K}$, so the average force is $F = ${hm.F}$ N.`,
  sol: 'W-E theorem; K / d.',
  scheme: [['States the theorem', 1], ['Derivation with F = ma and v² = u² + 2as', 2], [`Kinetic energy ${hm.K} J = F × 0.020`, 1], [`F = ${hm.F} N`, 1]],
  d: 3, c: 'application', t: [2],
}), () => near((hm.m * hm.v ** 2) / (2 * hm.d), hm.F, 1e-12) || 'hm');
const fl = { a: 3, b: -4, c: 5, x: 4, m: 2 };
fl.F = (x) => fl.a * x * x + fl.b * x + fl.c;
fl.W = fl.x ** 3 + (fl.b / 2) * fl.x ** 2 + fl.c * fl.x; // x³ − 2x² + 5x
fl.v = Math.sqrt((2 * fl.W) / fl.m);
add('fx-long', long({
  stem: 'A force $F = (3x^2 - 4x + 5)$ N, with $x$ in metres, acts along the $x$-axis on a 2.0 kg body, initially at rest at $x = 0$, on a smooth horizontal surface.\n\n(a) Write the expression for the work done by a variable force and calculate the work done from $x = 0$ to $x = 4.0$ m. [3]\n\n(b) Find the speed of the body at $x = 4.0$ m. [2]',
  model: r`(a) When the force varies with position, the work done is the integral of the force over the displacement, which is the area under the F–x graph: $W = \int F\,dx$. Here $W = \int_0^{4}(3x^2 - 4x + 5)\,dx = \big[x^3 - 2x^2 + 5x\big]_0^{4} = 64 - 32 + 20 = ${fl.W}$ J. (b) The surface is smooth and the body starts from rest, so the net work done equals the gain in its kinetic energy: $\tfrac{1}{2} \times 2.0 \times v^2 = ${fl.W}$, giving, in metres per second, the speed at the position 4.0 m as $v = \sqrt{${fl.W}} = ${dec(fl.v, 3)}$ m/s.`,
  sol: 'Integrate; W-E theorem.',
  scheme: [['W = ∫ F dx', 1], [`Antiderivative x³ − 2x² + 5x evaluated at 4 m: ${fl.W} J`, 2], [`½ m v² = ${fl.W}, v = ${dec(fl.v, 3)} m/s`, 2]],
  d: 3, c: 'application', t: [1, 2],
}), () => near(integ(fl.F, 0, fl.x), fl.W, 1e-9) && near(0.5 * fl.m * fl.v ** 2, fl.W, 1e-12) || 'fl');
const ds = { m: 2, h: 0.4, k: 980 };
ds.mg = ds.m * g;
ds.x = (ds.mg + Math.sqrt(ds.mg ** 2 + 2 * ds.k * ds.mg * ds.h)) / ds.k;
add('dropspring-long', long({
  stem: 'A 2.0 kg block is released from rest 0.40 m above the top of a light vertical spring of stiffness 980 N/m fixed to the floor. Take $g = 9.8$ m/s².\n\n(a) Write the energy equation for the instant of maximum compression $x$, taking the gravitational potential energy loss over the full fall into account, and name the forces whose work is included. [3]\n\n(b) Calculate the maximum compression of the spring. [2]',
  model: r`(a) Only gravity and the spring force do work on the block, and both are conservative, so mechanical energy is conserved. The block is at rest at the start and again at maximum compression, and it falls through a total height $(h + x)$, so the loss of gravitational energy equals the energy stored: $mg(h + x) = \tfrac{1}{2}kx^2$. (b) Substituting the numbers gives $490x^2 - 19.6x - 7.84 = 0$. Taking the positive root, $x = \dfrac{19.6 + \sqrt{19.6^2 + 4 \times 490 \times 7.84}}{2 \times 490} = ${dec(ds.x, 3)}$ m, which is about ${dec(ds.x * 100, 3)} cm.`,
  sol: 'Quadratic in x.',
  scheme: [['Identifies gravity and the spring force as the only forces doing work', 1], ['m g (h + x) = ½ k x²', 2], [`Solves the quadratic: x = ${dec(ds.x, 3)} m`, 2]],
  d: 4, c: 'analysis', t: [3],
}), () => near(0.5 * ds.k * ds.x ** 2, ds.mg * (ds.h + ds.x), 1e-9) && ds.x > 0 || 'ds');
const lg = { m1: 4, u1: 6, m2: 2 };
[lg.v1, lg.v2] = elastic(lg.m1, lg.u1, lg.m2, 0);
add('elastic-long', long({
  stem: '(a) A body of mass $m_1$ moving with speed $u$ collides head-on and elastically with a body of mass $m_2$ at rest. Using the conservation of momentum and of kinetic energy, derive the velocities of the two bodies after the collision. [3]\n\n(b) A 4.0 kg trolley moving at 6.0 m/s collides elastically with a 2.0 kg trolley at rest. Find the velocities after the collision. [2]',
  model: r`(a) Conservation of momentum gives $m_1u = m_1v_1 + m_2v_2$, so $m_1(u - v_1) = m_2v_2$. Conservation of kinetic energy gives $m_1(u^2 - v_1^2) = m_2v_2^2$. Dividing the second equation by the first, for $v_1 \neq u$, gives $u + v_1 = v_2$. Substituting this back into the momentum equation and solving, the first body moves with $v_1 = \dfrac{m_1 - m_2}{m_1 + m_2}u$ and the second with $v_2 = \dfrac{2m_1}{m_1 + m_2}u$. (b) $v_1 = \dfrac{4 - 2}{6} \times 6.0 = ${lg.v1}$ m/s and $v_2 = \dfrac{2 \times 4}{6} \times 6.0 = ${lg.v2}$ m/s, both in the original direction of motion. The heavier trolley slows down but keeps moving, and the lighter one is knocked ahead of it with a larger speed than the initial speed of the first.`,
  sol: 'Solve the two conservation laws.',
  scheme: [['Momentum equation and energy equation written', 1], ['Algebra to the two formulas', 2], [`v₁ = ${lg.v1} m/s and v₂ = ${lg.v2} m/s`, 2]],
  d: 3, c: 'application', t: [4],
}), () => near(lg.m1 * lg.v1 + lg.m2 * lg.v2, lg.m1 * lg.u1, 1e-12) && near(ke(lg.m1, lg.v1) + ke(lg.m2, lg.v2), ke(lg.m1, lg.u1), 1e-12) || 'lg');
const bl = { m: 0.02, M: 1.98, h: 0.15 };
bl.V = Math.sqrt(2 * g * bl.h);
bl.u = (bl.V * (bl.m + bl.M)) / bl.m;
bl.K0 = ke(bl.m, bl.u);
bl.K1 = ke(bl.m + bl.M, bl.V);
add('ballistic-long', long({
  stem: 'A bullet of mass 20 g is fired horizontally into a 1.98 kg wooden block hanging from long light strings. The bullet embeds itself, and the block with the bullet rises through a vertical height of 15.0 cm. Take $g = 9.8$ m/s².\n\n(a) Explain which quantity is conserved during the impact, which is conserved during the swing, and which is not conserved at all in the impact. [2]\n\n(b) Find the speed of the block just after the impact and the speed of the bullet before it. [3]',
  model: r`(a) During the very short impact no significant external horizontal force acts, so the total momentum is conserved. During the swing only gravity does work on the block, so the mechanical energy is conserved. The kinetic energy is not conserved in the impact; it is lost as heat and deformation of the wood. (b) For the swing, $\tfrac{1}{2}V^2 = gh$, so the speed just after the impact is $V = \sqrt{2 \times 9.8 \times 0.150} = ${dec(bl.V, 3)}$ m/s. For the impact, $0.020\,u = 2.00 \times ${dec(bl.V, 3)}$, so the speed of the bullet is $u = ${dec(bl.u, 3)}$ m/s.`,
  sol: 'Momentum for the impact; energy for the swing.',
  scheme: [['Momentum conserved in the impact; mechanical energy in the swing', 1], ['Kinetic energy not conserved in the impact', 1], [`V = √(2 g h) = ${dec(bl.V, 3)} m/s`, 1], [`u = (m + M) V/m = ${dec(bl.u, 3)} m/s`, 2]],
  d: 4, c: 'analysis', t: [3, 4],
}), () => near(ke(bl.m + bl.M, bl.V), (bl.m + bl.M) * g * bl.h, 1e-12) && near(bl.m * bl.u, (bl.m + bl.M) * bl.V, 1e-12) && bl.K0 > bl.K1 || 'bl');

// ================================================================ case-based
const pl = { m: 1200, F1: 400, F2: 800, d1: 10, d2: 10, Rs: 550 };
pl.W1 = ((pl.F1 + pl.F2) / 2) * pl.d1;
pl.W = pl.W1 + pl.F2 * pl.d2;
pl.Wr = -pl.Rs * (pl.d1 + pl.d2);
pl.v = Math.sqrt((2 * (pl.W + pl.Wr)) / pl.m);
add('plough-case', mk.case({
  passage: 'A tractor pulls a plough along a straight furrow, with the pull directed along the furrow. A spring balance in the tow bar shows that the pull rises uniformly from 400 N to 800 N during the first 10 m and then stays at 800 N for the next 10 m. The tractor and plough together have a mass of 1200 kg and start from rest. The soil exerts a steady resistive force of 550 N on the plough over the whole 20 m.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The work done by the pull during the first 10 m is',
      right: `${pl.W1} J`,
      wrong: [`${pl.F2 * pl.d1} J`, `${pl.F1 * pl.d1} J`, `${pl.W1 * 2} J`],
      sol: r`The pull rises uniformly, so the work is the area of a trapezoid, equal to the average pull times the distance: $\dfrac{400 + 800}{2} \times 10 = ${pl.W1}$ J — option (@K).`,
      d: 2, c: 'application', t: [1],
    })),
    part('b', num({
      stem: 'Find the total work done by the pull over the whole 20 m, in J.',
      value: pl.W, tol: 5, unit: 'J',
      sol: r`First 10 m: $${pl.W1}$ J. Next 10 m: $800 \times 10 = ${pl.F2 * pl.d2}$ J. Total $= ${pl.W1} + ${pl.F2 * pl.d2} = ${pl.W}$ J.`,
      scheme: [[`${pl.W1} + ${pl.F2 * pl.d2} = ${pl.W} J`, 1]],
      d: 2, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Using the work–energy theorem, find the speed of the tractor and plough after the 20 m.',
      model: r`The steady soil resistance does negative work $-550 \times 20 = ${pl.Wr}$ J, so the net work done on the tractor and plough is $${pl.W} - ${-pl.Wr} = ${pl.W + pl.Wr}$ J. Starting from rest, this equals the gain in kinetic energy: $\tfrac{1}{2} \times 1200 \times v^2 = ${pl.W + pl.Wr}$, so the speed is $v = ${dec(pl.v, 3)}$ m/s.`,
      sol: 'Net work = K.',
      scheme: [[`Net work = ${pl.W} − ${-pl.Wr} = ${pl.W + pl.Wr} J`, 1], [`v = ${dec(pl.v, 3)} m/s`, 1]],
      d: 3, c: 'application', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'A learner says the work done by the pull over the 20 m is 800 N × 20 m = 16 000 J, because the pull never exceeds 800 N. Evaluate this claim.',
        model: r`The claim is **wrong**. The pull equals 800 N only for the second half; in the first 10 m it was smaller, averaging 600 N. The work is the area under the F–x graph, ${pl.W} J, not the product of the largest force and the distance. The average pull over the 20 m is ${pl.W / 20} N.`,
        sol: 'Area, not maximum force.',
        scheme: [['Identifies that the claim is wrong', 1], [`Work = area = ${pl.W} J (average pull ${pl.W / 20} N)`, 1]],
        d: 3, c: 'evaluation', t: [1],
      }),
    ]),
  ],
}), () => near(integ((x) => (x < 10 ? 400 + 40 * x : 800), 0, 20, 4000), pl.W, 1e-9) && near(0.5 * pl.m * pl.v ** 2, pl.W + pl.Wr, 1e-12) || 'pl');

const dg = { k: 400, x: 0.06, m: 0.015, f: 0.1 };
dg.U = R6(0.5 * dg.k * dg.x ** 2);
dg.v = Math.sqrt((2 * dg.U) / dg.m);
dg.Wf = R6(dg.f * dg.x);
dg.K = R6(dg.U - dg.Wf);
dg.vf = Math.sqrt((2 * dg.K) / dg.m);
dg.x2 = 2 * dg.x;
dg.v2 = Math.sqrt((2 * 0.5 * dg.k * dg.x2 ** 2) / dg.m);
add('dart-case', mk.case({
  passage: 'A toy dart gun has a spring of stiffness 400 N/m. A dart of mass 15 g is loaded by compressing the spring by 6.0 cm. On release, the spring pushes the dart along a horizontal barrel and the dart leaves the barrel just as the spring reaches its natural length.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The energy stored in the compressed spring is',
      right: `${dg.U} J`,
      wrong: [`${R6(dg.k * dg.x)} J`, `${R6(0.5 * dg.k * dg.x)} J`, `${R6(dg.k * dg.x ** 2)} J`],
      sol: r`$U = \tfrac{1}{2}kx^2 = \tfrac{1}{2} \times 400 \times (0.060)^2 = ${dg.U}$ J. The other options leave out the square or the half — option (@K).`,
      d: 1, c: 'understanding', t: [3],
    })),
    part('b', num({
      stem: 'Neglecting friction, find the speed with which the dart leaves the barrel, in m/s.',
      value: v3(dg.v), tol: 0.05, unit: 'm/s',
      sol: r`$\tfrac{1}{2}mv^2 = ${dg.U}$, so $v = \sqrt{\dfrac{2 \times ${dg.U}}{${dg.m}}} = \sqrt{${R6(dg.v ** 2)}} = ${dec(dg.v, 3)}$ m/s.`,
      scheme: [[`v = √(2U/m) = ${dec(dg.v, 3)} m/s`, 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'In practice a steady friction force of 0.10 N acts on the dart over the 6.0 cm length of the barrel. Find the speed with which the dart leaves.',
      model: r`The work done against the friction force over the barrel is $0.10 \times 0.060 = ${dg.Wf}$ J, so the kinetic energy of the dart at exit is the stored energy less this loss, $${dg.U} - ${dg.Wf} = ${dg.K}$ J. Then $v = \sqrt{\dfrac{2 \times ${dg.K}}{0.015}} = ${dec(dg.vf, 3)}$ m/s, slightly less than the speed without friction.`,
      sol: 'Subtract the work against friction.',
      scheme: [[`Work against friction ${dg.Wf} J, so K = ${dg.K} J`, 1], [`v = ${dec(dg.vf, 3)} m/s`, 1]],
      d: 3, c: 'application', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'A learner claims that, ignoring friction, loading the dart by compressing the spring by twice as much (12 cm) would double the exit speed. Evaluate this claim.',
        model: r`The claim is **correct**. The stored energy $\tfrac{1}{2}kx^2$ grows as $x^2$, so doubling the compression gives four times the energy. Since $K = \tfrac{1}{2}mv^2$ also grows as $v^2$, the speed doubles: $v = ${dec(dg.v2, 3)}$ m/s, that is twice ${dec(dg.v, 3)} m/s.`,
        sol: 'v is proportional to x.',
        scheme: [['Energy grows four times for double compression', 1], [`Speed doubles: ${dec(dg.v2, 3)} m/s`, 1]],
        d: 3, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}), () => near(dg.v2, 2 * dg.v, 1e-12) && near(0.5 * dg.m * dg.v ** 2, dg.U, 1e-9) || 'dg');

const wg = { m1: 24000, u1: 3, m2: 16000, u2: 1 };
wg.p = wg.m1 * wg.u1 + wg.m2 * wg.u2;
wg.V = wg.p / (wg.m1 + wg.m2);
wg.K0 = ke(wg.m1, wg.u1) + ke(wg.m2, wg.u2);
wg.K1 = R6(ke(wg.m1 + wg.m2, wg.V));
wg.lost = R6(wg.K0 - wg.K1);
add('wagon-case', mk.case({
  passage: 'In a railway yard, a 24-tonne wagon moving at 3.0 m/s along a straight level track catches up with a 16-tonne wagon moving ahead at 1.0 m/s in the same direction. On impact the two wagons couple automatically and move on together. Neglect friction and take 1 tonne = 1000 kg.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'During the coupling, which statement about the system of the two wagons is correct?',
      right: 'The total momentum is conserved, but the total kinetic energy decreases',
      wrong: ['The total kinetic energy is conserved, but the total momentum decreases', 'Both the total momentum and the total kinetic energy are conserved', 'The total momentum increases because the wagons now move together'],
      sol: 'No external horizontal force acts on the pair, so momentum is conserved; coupling is a perfectly inelastic collision, so kinetic energy decreases — option (@K).',
      d: 1, c: 'understanding', t: [4],
    })),
    part('b', num({
      stem: 'Find the common speed of the coupled wagons, in m/s.',
      value: wg.V, tol: 0.02, unit: 'm/s',
      sol: r`Momentum: $24\,000 \times 3.0 + 16\,000 \times 1.0 = ${wg.p}$ kg m/s $= (24\,000 + 16\,000)V$, so $V = \dfrac{${wg.p}}{40\,000} = ${wg.V}$ m/s.`,
      scheme: [[`V = ${wg.p}/40 000 = ${wg.V} m/s`, 1]],
      d: 2, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'Calculate the kinetic energy lost in the coupling and say what happens to it.',
      model: r`The kinetic energy before the coupling is $\tfrac{1}{2} \times 24\,000 \times 3.0^2 + \tfrac{1}{2} \times 16\,000 \times 1.0^2 = ${wg.K0}$ J, and after it $\tfrac{1}{2} \times 40\,000 \times ${wg.V}^2 = ${wg.K1}$ J. The loss is $${wg.lost}$ J, and it is converted into heat, sound and the energy of deforming the couplers.`,
      sol: 'Before minus after.',
      scheme: [[`K before ${wg.K0} J, after ${wg.K1} J`, 1], [`Loss ${wg.lost} J: heat, sound, deformation`, 1]],
      d: 3, c: 'application', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'A learner argues: “Energy can never be destroyed, so the kinetic energy of the wagons after the coupling must equal that before it.” Evaluate this argument.',
        model: r`The argument is **wrong**. Total energy is conserved, but kinetic energy is only one form. Here ${wg.lost} J of kinetic energy (from ${wg.K0} J to ${wg.K1} J) is converted into heat, sound and deformation, so the kinetic energy after the coupling is smaller.`,
        sol: 'Only total energy is conserved.',
        scheme: [['States that total energy is conserved but kinetic energy is not', 1], [`Kinetic energy falls from ${wg.K0} J to ${wg.K1} J`, 1]],
        d: 3, c: 'evaluation', t: [4],
      }),
    ]),
  ],
}), () => near(wg.K0 - wg.K1, 0.5 * ((wg.m1 * wg.m2) / (wg.m1 + wg.m2)) * (wg.u1 - wg.u2) ** 2, 1e-9) && near(wg.V, 2.2, 1e-12) || 'wg');

const hl = { m: 8000, v: 6, sin: 0.05, R: 600, t: 240, k: 2 };
hl.F = R6(hl.m * g * hl.sin + hl.R);
hl.P = R6(hl.F * hl.v);
hl.E = R6(hl.P * hl.t);
hl.kWh = hl.E / 3.6e6;
hl.P2 = R6(hl.F * hl.v * hl.k);
add('hill-case', mk.case({
  passage: 'An electric bus of mass 8000 kg climbs a straight hill road at a steady 6.0 m/s. The road rises 1.0 m for every 20 m travelled along it (so $\\sin\\theta = 0.050$). Rolling friction and air drag together give a steady resistive force of 600 N. Take $g = 9.8$ m/s².',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'At the steady speed, the driving force of the bus equals',
      right: 'the component of the weight along the slope plus the resistive force',
      wrong: ['the whole weight of the bus plus the resistive force', 'the resistive force alone, since the speed is steady', 'the component of the weight along the slope minus the resistive force'],
      sol: 'With no acceleration the forces along the slope balance: drive $=$ $mg\\sin\\theta$ (down the slope) $+$ resistive force — option (@K).',
      d: 2, c: 'understanding', t: [4],
    })),
    part('b', num({
      stem: 'Find the power the motor must deliver to the wheels, in kW.',
      value: R6(hl.P / 1000), tol: 0.05, unit: 'kW',
      sol: r`Driving force $F = mg\sin\theta + 600 = 8000 \times 9.8 \times 0.050 + 600 = ${R6(hl.m * g * hl.sin)} + 600 = ${hl.F}$ N. Power $P = Fv = ${hl.F} \times 6.0 = ${hl.P}$ W $= ${hl.P / 1000}$ kW.`,
      scheme: [[`F = ${R6(hl.m * g * hl.sin)} + 600 = ${hl.F} N`, 0.5], [`P = F v = ${hl.P} W = ${hl.P / 1000} kW`, 0.5]],
      d: 2, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'Find the energy the motor supplies to the wheels during a 4.0 minute climb, in kW h.',
      model: r`The energy supplied is the power multiplied by the time, $E = Pt = ${hl.P} \times 240 = ${hl.E}$ J. Since one kilowatt hour is $3.6 \times 10^6$ J, converting gives $\dfrac{${hl.E}}{3.6 \times 10^6} = ${dec(hl.kWh, 3)}$ kW h of energy used during the 4.0 minute climb.`,
      sol: 'E = P t.',
      scheme: [[`E = ${hl.P} × 240 = ${hl.E} J`, 1], [`${dec(hl.kWh, 3)} kW h`, 1]],
      d: 3, c: 'application', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'A learner says that if the same bus climbed the same road at twice the speed, with the same resistive force, the motor power would double. Evaluate this claim.',
        model: r`The claim is **correct** under these assumptions. The driving force is unchanged, ${hl.F} N, because the forces still balance, and $P = Fv$ so doubling $v$ doubles $P$: ${dec(hl.P2 / 1000, 4)} kW. In practice air drag rises with speed, so the actual power would be even larger.`,
        sol: 'P = F v.',
        scheme: [['Force unchanged, P = F v doubles', 1], [`New power ${dec(hl.P2 / 1000, 4)} kW`, 1]],
        d: 3, c: 'evaluation', t: [4],
      }),
    ]),
  ],
}), () => near(hl.P, (hl.m * 9.8 * (1 / 20) + hl.R) * hl.v, 1e-9) && near(hl.kWh, 1.808, 1e-3) || 'hl');
