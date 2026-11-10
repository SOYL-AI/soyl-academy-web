// ISC 11 ch05 question bank, part 1: objective items (1 mark: MCQ, assertion-reason, true-false, fill-blank) and numerical items (1-2 marks).
// Every numerical is computed here and re-solved by an independent `check` (energy for the Atwood machine, a linear solve of the
// equations of motion, torques about the top of the ladder, a stepped integral for impulse); solutions and schemes print the computed values.
// AR keys across the chapter: a (bus-ar), b (tension-ar), c (momentum-ar), d (ladder-ar), a (lift-ar), c (isolated-ar).
import { mk, add, r, dec, near } from '../../isc-11-physics-ch01/src/lib.mjs';
import { g, rad, deg, atwood, atwoodEnergy, tableHang, tableHangLin, liftN, lamp, lampLin, ladder, ladderTop, impulseOf, solveLin } from './phys.mjs';

const { mcq, ar, tf, fill, num } = mk;
const f = (x, n = 3) => String(+x.toPrecision(n));
const R7 = (x) => +x.toPrecision(7);

// ================================================================ t01 force, inertia, first law
add('bus-mcq', mcq({
  stem: 'A city bus is moving steadily when the driver applies the brakes hard. Standing passengers lurch forward because',
  right: 'their bodies tend to keep moving forward at the old velocity while the bus slows down',
  wrong: ['the brakes exert a forward force on the passengers as they slow the bus down', 'a forward force acts on a body whenever it is inside a vehicle that is slowing down', 'the weight of the passengers shifts forward when the bus slows down suddenly'],
  sol: 'By the first law a body keeps its state of uniform motion unless a net force acts on it. The bus is slowed by the brakes, but the passengers, who are not held by the bus, tend to continue at the old velocity: inertia of motion. No forward force pushes them.',
  d: 1, c: 'understanding', t: [1],
}));
add('inertia-mcq', mcq({
  stem: 'Of the following, the quantity that measures the inertia of a body is its',
  right: 'mass',
  wrong: ['weight at the place where it is measured', 'speed', 'volume'],
  sol: 'Inertia is the resistance of a body to a change in its state of rest or of uniform motion. Its measure is the mass, which does not change from place to place, unlike weight.',
  d: 1, c: 'recall', t: [1],
}));
add('ropeway-mcq', mcq({
  stem: 'A ropeway cabin full of passengers is going up a hillside at a steady 3 m s⁻¹ along a straight cable. The total upward pull of the cables on the cabin is',
  right: 'equal to the weight of the cabin and passengers, because the net force on it is zero',
  wrong: ['greater than the weight, because the cabin is moving upward', 'less than the weight, because the cabin does not accelerate', 'zero, because the cabin moves with uniform velocity'],
  sol: 'Uniform velocity in a straight line means zero acceleration, hence zero net force (first law). The upward pull balances the downward weight; it is not zero and not greater.',
  d: 2, c: 'understanding', t: [1],
}));

// ================================================================ t02 momentum, second law
const dp = { p1: 3, p2: 11, t: 0.5 };
dp.F = (dp.p2 - dp.p1) / dp.t;
add('dpdt-mcq', mcq({
  stem: `The momentum of a trolley changes from ${dp.p1} kg m s⁻¹ to ${dp.p2} kg m s⁻¹ in ${dp.t} s under a steady force along its path. The force on the trolley is`,
  right: `${f(dp.F)} N`,
  wrong: [`${dp.p2 - dp.p1} N`, `${(dp.p1 + dp.p2) / dp.t} N`, `${(dp.p2 - dp.p1) * dp.t} N`],
  scheme: [[`F = Δp/Δt = (${dp.p2} − ${dp.p1})/${dp.t} = ${f(dp.F)} N (@K)`, 1]],
  sol: `The force equals the rate of change of momentum: F = Δp/Δt = (${dp.p2} − ${dp.p1})/${dp.t} = ${f(dp.F)} N. Using Δp alone leaves out the division by time.`,
  d: 2, c: 'application', t: [2],
}), () => near(impulseOf(() => dp.F, 0, dp.t), dp.p2 - dp.p1, 1e-9) && near(dp.F, 16, 1e-9) || 'dpdt');
add('newton-mcq', mcq({
  stem: 'A steady force of 1 N acts on a body of mass 250 g on a smooth horizontal surface. The acceleration of the body is',
  right: '4 m s⁻²',
  wrong: ['0.25 m s⁻²', '250 m s⁻²', '1 m s⁻²'],
  scheme: [['a = F/m = 1/0.25 = 4 m s⁻² (mass converted to kg) (@K)', 1]],
  sol: 'The mass is 0.25 kg, so a = F/m = 1/0.25 = 4 m s⁻². Using 250 for the mass in grams gives a wrong value; the newton is defined with the mass in kg.',
  d: 1, c: 'application', t: [2],
}), () => near(1 / (250 / 1000), 4, 1e-9) || 'newton');
const cm = { x: 6, y: 8, m: 2.5 };
cm.F = Math.hypot(cm.x, cm.y);
cm.a = cm.F / cm.m;
add('comp2-mcq', mcq({
  stem: `Two forces of ${cm.x} N due east and ${cm.y} N due north act together on a ${cm.m} kg puck on smooth ice. The magnitude of the acceleration of the puck is`,
  right: `${f(cm.a)} m s⁻²`,
  wrong: [`${f((cm.x + cm.y) / cm.m)} m s⁻²`, `${f(cm.F / (cm.m * 2))} m s⁻²`, `${f(cm.y / cm.m)} m s⁻²`],
  scheme: [[`a_x = ${cm.x}/${cm.m} = ${f(cm.x / cm.m)}, a_y = ${cm.y}/${cm.m} = ${f(cm.y / cm.m)}; a = ${f(cm.a)} m s⁻² (@K)`, 1]],
  sol: `The components of acceleration are a_x = ${cm.x}/${cm.m} = ${f(cm.x / cm.m)} m s⁻² and a_y = ${cm.y}/${cm.m} = ${f(cm.y / cm.m)} m s⁻². Since the forces are at right angles, a = √(${f(cm.x / cm.m)}² + ${f(cm.y / cm.m)}²) = ${f(cm.a)} m s⁻². Adding the magnitudes of the forces directly is wrong because they are perpendicular.`,
  d: 2, c: 'application', t: [2],
}), () => { const [ax, ay] = solveLin([[cm.m, 0], [0, cm.m]], [cm.x, cm.y]); return near(Math.hypot(ax, ay), cm.a, 1e-9) && near(cm.a, 4, 1e-9) || 'comp2'; });
add('massc-mcq', mcq({
  stem: 'A proton in an accelerator is pushed by a steady force to speeds close to the speed of light. The force that is needed for a given small increase in speed becomes larger and larger because',
  right: 'the measured mass of the proton increases without limit as its speed approaches the speed of light',
  wrong: ['the mass of the proton decreases, so it resists the force more strongly', 'the force of gravity on the proton rises with its speed', 'the momentum of the proton stays constant while its speed rises'],
  sol: 'Close to the speed of light the measured mass increases without limit, so a given force changes the speed less and less and no body can reach c. F = ma with a constant mass fails there; the law F = dp/dt still holds.',
  d: 2, c: 'understanding', t: [2],
}));
add('momunit-mcq', mcq({
  stem: 'Which of the following pairs of quantities has the same dimensions?',
  right: 'impulse and linear momentum',
  wrong: ['force and linear momentum', 'impulse and force', 'linear momentum and kinetic energy'],
  sol: 'Impulse is force × time, [M L T⁻²][T] = [M L T⁻¹], the dimensions of momentum (equivalently N s = kg m s⁻¹). Force and kinetic energy have different dimensions from momentum.',
  d: 1, c: 'recall', t: [2, 3],
}));

// ================================================================ t03 impulse, conservation of momentum, third law
add('impulse-mcq', mcq({
  stem: 'A fielder draws his hands back while catching a fast cricket ball. This reduces the average force on his hands because',
  right: 'the ball takes longer to stop, while its change of momentum stays the same',
  wrong: ['the change of momentum of the ball becomes smaller when the hands move back', 'the impulse on the ball becomes smaller because the hands move back with it', 'the mass of the ball decreases when it touches the moving hands'],
  sol: 'The ball must lose all of its momentum, so Δp is fixed whatever the fielder does. The average force is Δp/Δt, so a longer stopping time gives a smaller force.',
  d: 1, c: 'understanding', t: [3],
}));
const rb = { m: 0.06, d: 5, u: 3 };
rb.J = rb.m * (rb.d + rb.u);
add('rebound-mcq', mcq({
  stem: `A ${rb.m} kg ball hits the floor at ${rb.d} m s⁻¹ and rebounds vertically upward at ${rb.u} m s⁻¹. The magnitude of the impulse given to the ball by the floor is`,
  right: `${f(rb.J)} N s`,
  wrong: [`${f(rb.m * (rb.d - rb.u))} N s`, `${f(rb.m * rb.d)} N s`, `${f(rb.m * rb.u)} N s`],
  scheme: [[`Δp = m(v − u) = ${rb.m}(${rb.u} − (−${rb.d})) = ${f(rb.J)} N s (@K)`, 1]],
  sol: `Take upward as positive. The velocity changes from −${rb.d} to +${rb.u} m s⁻¹, a change of ${rb.d + rb.u} m s⁻¹. The impulse is Δp = ${rb.m} × ${rb.d + rb.u} = ${f(rb.J)} N s. Subtracting the speeds instead of adding them ignores the reversal of direction.`,
  d: 2, c: 'application', t: [3],
}), () => near(rb.m * rb.u - rb.m * -rb.d, rb.J, 1e-9) && near(rb.J, 0.48, 1e-9) || 'rebound');
const ar1 = { Fmax: 40, t: 0.1 };
ar1.J = 0.5 * ar1.Fmax * ar1.t;
add('area-mcq', mcq({
  stem: `The force on a body rises uniformly from zero to ${ar1.Fmax} N in ${ar1.t} s and then drops to zero at once. The impulse given to the body is`,
  right: `${f(ar1.J)} N s`,
  wrong: [`${f(ar1.Fmax * ar1.t)} N s`, `${f(ar1.Fmax * ar1.t / 10)} N s`, `${ar1.Fmax} N s`],
  scheme: [[`Impulse = area of the triangle = ½ × ${ar1.t} × ${ar1.Fmax} = ${f(ar1.J)} N s (@K)`, 1]],
  sol: `The impulse is the area under the force–time graph, a triangle of base ${ar1.t} s and height ${ar1.Fmax} N: ½ × ${ar1.t} × ${ar1.Fmax} = ${f(ar1.J)} N s. Using the full rectangle ${ar1.Fmax} × ${ar1.t} counts the force as if it stayed at its peak.`,
  d: 3, c: 'application', t: [3],
}), () => near(impulseOf((t) => (ar1.Fmax * t) / ar1.t, 0, ar1.t), ar1.J, 1e-6) && near(ar1.J, 2, 1e-9) || 'area');
const rs = { M: 3, m: 0.015, v: 300 };
rs.V = (rs.m * rs.v) / rs.M;
add('recoilspeed-mcq', mcq({
  stem: `A ${rs.M} kg rifle fires a bullet of mass ${rs.m * 1000} g with a muzzle speed of ${rs.v} m s⁻¹. The recoil speed of the rifle is`,
  right: `${f(rs.V)} m s⁻¹`,
  wrong: [`${f(rs.m * 1000 * rs.v / rs.M)} m s⁻¹`, `${f((rs.m * rs.v) / rs.M / 10)} m s⁻¹`, `${f(rs.v / rs.M)} m s⁻¹`],
  scheme: [[`M V = m v: V = ${rs.m} × ${rs.v}/${rs.M} = ${f(rs.V)} m s⁻¹ (@K)`, 1]],
  sol: `Before firing the momentum is zero, so MV = mv in magnitude. With m = ${rs.m} kg (not ${rs.m * 1000}), V = ${rs.m} × ${rs.v}/${rs.M} = ${f(rs.V)} m s⁻¹.`,
  d: 2, c: 'application', t: [3],
}), () => near(-(rs.m * rs.v) / rs.M, -rs.V, 1e-9) && near(rs.V * rs.M + 0, rs.m * rs.v, 1e-9) && near(rs.V, 1.5, 1e-9) || 'recoilspeed');
add('explode-mcq', mcq({
  stem: 'A stationary shell explodes into two fragments whose masses are in the ratio 1 : 3. Immediately after the explosion, the ratio of the kinetic energy of the lighter fragment to that of the heavier fragment is',
  right: '3 : 1',
  wrong: ['1 : 3', '1 : 1', '9 : 1'],
  sol: 'The momenta of the fragments are equal and opposite, p. The kinetic energy is p²/2m, so the energies are in the inverse ratio of the masses: lighter : heavier = 3 : 1. The lighter piece carries more energy.',
  d: 4, c: 'analysis', t: [3],
}), () => { const m1 = 1; const m2 = 3; const v1 = 3; const v2 = 1; return near(m1 * v1, m2 * v2, 1e-9) && near((0.5 * m1 * v1 * v1) / (0.5 * m2 * v2 * v2), 3, 1e-9) || 'explode'; });
add('rocket-mcq', mcq({
  stem: 'A rocket in deep space ejects hot gas backward and accelerates forward. Which statement explains this correctly?',
  right: 'The rocket pushes the gas backward and the gas pushes the rocket forward with an equal force; the two forces act on different bodies',
  wrong: ['The gas pushes against the empty space around it and the space pushes the rocket forward', 'The forward force on the rocket cancels the backward force on the gas, so the rocket is left with a net forward force', 'Momentum is not conserved in space, so the rocket gains forward momentum from nowhere at all'],
  sol: 'The two forces are an action–reaction pair: equal and opposite and acting on different bodies, so they do not cancel. In terms of momentum, the backward momentum of the gas is balanced by the forward momentum of the rocket; the total stays zero.',
  d: 2, c: 'understanding', t: [3],
}));

// ================================================================ t04 free-body diagrams, connected bodies
add('fbd-mcq', mcq({
  stem: 'A wooden box slides down a smooth inclined plane. Which one of the following lists all the forces to be drawn in its free-body diagram?',
  right: 'Its weight and the normal reaction of the plane',
  wrong: ['Its weight, the normal reaction and a force down the slope', 'Its weight, the normal reaction and the force of its motion', 'Its weight, the normal reaction and the reaction to its weight'],
  sol: 'A free-body diagram shows only the forces acting on the box: the weight (Earth’s pull) and the normal reaction (contact with the plane). The “force down the slope” is a component of the weight, not an extra force; the reaction to the weight acts on the Earth, not on the box.',
  d: 3, c: 'analysis', t: [4],
}));
const th = { m1: 4, m2: 1 };
Object.assign(th, tableHang(th.m1, th.m2));
add('tablehang-mcq', mcq({
  stem: `A ${th.m1} kg block on a smooth horizontal table is joined by a light string over a smooth pulley at the edge to a ${th.m2} kg mass hanging freely. Taking g = 9.8 m s⁻², the acceleration of the blocks is`,
  right: `${f(th.a)} m s⁻²`,
  wrong: [`${f(g)} m s⁻²`, `${f((th.m1 * g) / (th.m1 + th.m2))} m s⁻²`, `${f(g / th.m1)} m s⁻²`],
  scheme: [[`a = m₂g/(m₁ + m₂) = ${th.m2} × 9.8/${th.m1 + th.m2} = ${f(th.a)} m s⁻² (@K)`, 1]],
  sol: `Only the weight of the hanging mass pulls the whole system of mass ${th.m1 + th.m2} kg: a = m₂g/(m₁ + m₂) = ${th.m2} × 9.8/${th.m1 + th.m2} = ${f(th.a)} m s⁻². The acceleration is not g, because the string also has to drag the block on the table.`,
  d: 3, c: 'application', t: [4],
}), () => near(tableHangLin(th.m1, th.m2).a, th.a, 1e-9) && near(th.a, 1.96, 1e-9) || 'tablehang');
const at = { m1: 7, m2: 5 };
Object.assign(at, atwood(at.m1, at.m2));
add('atwood-mcq', mcq({
  stem: `Masses of ${at.m1} kg and ${at.m2} kg hang from the two ends of a light string passing over a smooth fixed pulley. Taking g = 9.8 m s⁻², the acceleration of the masses is`,
  right: `${f(at.a)} m s⁻²`,
  wrong: [`${f(((at.m1 - at.m2) * g) / at.m2)} m s⁻²`, `${f(at.a / 2)} m s⁻²`, `${f(((at.m1 - at.m2) * g) / 4)} m s⁻²`],
  scheme: [[`a = (m₁ − m₂)g/(m₁ + m₂) = ${at.m1 - at.m2} × 9.8/${at.m1 + at.m2} = ${f(at.a)} m s⁻² (@K)`, 1]],
  sol: `The net driving force is the difference of the weights, (m₁ − m₂)g, and the mass that has to be accelerated is m₁ + m₂: a = ${at.m1 - at.m2} × 9.8/${at.m1 + at.m2} = ${f(at.a)} m s⁻².`,
  d: 3, c: 'application', t: [4],
}), () => near(atwoodEnergy(at.m1, at.m2).a, at.a, 1e-9) && near(at.a, (2 * 9.8) / 12, 1e-9) || 'atwood');
const cn = { m1: 5, m2: 3, F: 24 };
cn.a = cn.F / (cn.m1 + cn.m2);
cn.Fc = cn.m2 * cn.a;
add('contact-mcq', mcq({
  stem: `A horizontal force of ${cn.F} N pushes a ${cn.m1} kg block which is in contact with a ${cn.m2} kg block on a smooth floor, the ${cn.m1} kg block being behind. The force exerted by the ${cn.m1} kg block on the ${cn.m2} kg block is`,
  right: `${f(cn.Fc)} N`,
  wrong: [`${cn.F} N`, `${cn.m1 * (cn.F / (cn.m1 + cn.m2))} N`, `${f(cn.a)} N`],
  scheme: [[`a = ${cn.F}/${cn.m1 + cn.m2} = ${f(cn.a)} m s⁻²; contact force = ${cn.m2} × ${f(cn.a)} = ${f(cn.Fc)} N (@K)`, 1]],
  sol: `Both blocks accelerate together at a = ${cn.F}/(${cn.m1} + ${cn.m2}) = ${f(cn.a)} m s⁻². The only horizontal force on the front block is the contact force, so it equals ${cn.m2} × ${f(cn.a)} = ${f(cn.Fc)} N, much less than the push of ${cn.F} N.`,
  d: 3, c: 'application', t: [4],
}), () => near(cn.F - cn.m1 * cn.a, cn.Fc, 1e-9) && near(cn.Fc, 9, 1e-9) || 'contact');
const lm = { m: 60, a: 2 };
lm.N = liftN(lm.m, -lm.a);
add('lift-mcq', mcq({
  stem: `A ${lm.m} kg person stands on a weighing machine in a lift that is accelerating downward at ${lm.a} m s⁻². Taking g = 9.8 m s⁻², the machine reads a force of`,
  right: `${f(lm.N)} N`,
  wrong: [`${f(lm.m * g)} N`, `${f(liftN(lm.m, lm.a))} N`, `${f(lm.m * lm.a)} N`],
  scheme: [[`mg − N = ma: N = m(g − a) = ${lm.m} × (9.8 − ${lm.a}) = ${f(lm.N)} N (@K)`, 1]],
  sol: `Taking downward as positive, mg − N = ma, so N = m(g − a) = ${lm.m} × ${f(g - lm.a)} = ${f(lm.N)} N, which is less than the true weight ${f(lm.m * g)} N. The reading would be ${f(liftN(lm.m, lm.a))} N for an upward acceleration.`,
  d: 2, c: 'application', t: [4],
}), () => near(lm.m * g - lm.m * lm.a, lm.N, 1e-9) && near(lm.N, 468, 1e-9) || 'lift');

// ================================================================ t05 equilibrium of forces, rigid body, ladder
add('triangle-mcq', mcq({
  stem: 'Three forces act at a point on a particle. For which set of magnitudes can the particle be in equilibrium?',
  right: '7 N, 9 N and 15 N',
  wrong: ['3 N, 4 N and 8 N', '5 N, 5 N and 11 N', '2 N, 3 N and 6 N'],
  sol: 'Three concurrent forces balance only if they can form a closed triangle, so each must be less than the sum of the other two. 7 + 9 = 16 > 15, so 7, 9 and 15 can; in the other sets the largest force is more than the sum of the other two.',
  d: 2, c: 'application', t: [5],
}), () => { const ok = (a, b, c) => Math.max(a, b, c) < a + b + c - Math.max(a, b, c); return ok(7, 9, 15) && !ok(3, 4, 8) && !ok(5, 5, 11) && !ok(2, 3, 6) || 'triangle'; });
add('equil3-mcq', mcq({
  stem: 'Three coplanar forces that are not parallel keep a rigid body in equilibrium. Which statement must be true?',
  right: 'Their lines of action meet at one point, and their vector sum is zero',
  wrong: ['The three forces are equal in magnitude', 'The three forces make angles of 120° with each other, whatever their magnitudes', 'The lines of action of the three forces are parallel to one another'],
  sol: 'The vector sum must be zero for no translation. If the lines of action did not meet at a point, the torque about the point where two of them meet would come from the third force alone and could not vanish. So the lines are concurrent; the magnitudes may differ.',
  d: 2, c: 'understanding', t: [5],
}));
const lamt = { W: 80, a: 30, b: 60 };
Object.assign(lamt, lamp(lamt.W, lamt.a, lamt.b));
add('lamitension-mcq', mcq({
  stem: `A signboard of weight ${lamt.W} N hangs from a knot supported by two ropes that make ${lamt.a}° and ${lamt.b}° with the horizontal beam above. The tension in the rope that makes ${lamt.b}° with the beam is`,
  right: `${f(lamt.T2)} N`,
  wrong: [`${f(lamt.T1)} N`, `${lamt.W} N`, `${f(lamt.W / Math.sqrt(3))} N`],
  scheme: [[`Lami or resolving: the rope at ${lamt.b}° carries T = W cos ${lamt.a}° = ${f(lamt.T2)} N (@K)`, 1]],
  sol: `The two ropes are at right angles (${lamt.a}° + ${lamt.b}° = 90°). Resolving horizontally and vertically gives T = W cos ${lamt.a}° = ${f(lamt.T2)} N for the rope at ${lamt.b}° to the beam (the steeper rope carries more of the weight) and W cos ${lamt.b}° = ${f(lamt.T1)} N for the flatter rope.`,
  d: 3, c: 'application', t: [5],
}), () => { const s = lampLin(lamt.W, lamt.a, lamt.b); return near(s.T2, lamt.T2, 1e-9) && near(s.T1, lamt.T1, 1e-9) && s.T2 > s.T1 && near(lamt.T2, 69.282, 1e-4) || 'lamitension'; });
add('ladder-mcq', mcq({
  stem: 'A uniform ladder rests with its foot on rough ground and its upper end against a smooth vertical wall. The force exerted by the wall on the ladder is',
  right: 'horizontal, away from the wall, and balanced by a horizontal force at the foot',
  wrong: ['along the length of the ladder', 'vertically upward, balancing the weight of the ladder', 'zero, because the wall is smooth'],
  sol: 'A smooth surface exerts only a normal reaction, perpendicular to itself: here horizontal and away from the wall. Nothing else on the ladder has a horizontal component except the force at the floor, which must therefore balance it.',
  d: 2, c: 'understanding', t: [5],
}));
const la = { a1: 60, a2: 30 };
la.ratio = 1 / Math.tan(rad(la.a2)) / (1 / Math.tan(rad(la.a1)));
add('ladderangle-mcq', mcq({
  stem: 'A uniform ladder leans against a smooth vertical wall. Its foot is moved outward so that its angle with the floor falls from 60° to 30°. The reaction of the wall on the ladder becomes',
  right: '3 times as large',
  wrong: ['one-third as large', '√3 times as large', 'the same'],
  scheme: [['N_w = (W/2) cot θ: cot 30°/cot 60° = 3 (@K)', 1]],
  sol: `Taking torques about the foot, N_w = (W/2) cot θ. Hence the ratio is cot 30°/cot 60° = ${f(1 / Math.tan(rad(30)))}/${f(1 / Math.tan(rad(60)), 3)} = ${f(la.ratio)}: a less steep ladder pushes harder on the wall.`,
  d: 4, c: 'analysis', t: [5],
}), () => near(ladder(5, 30, 10).Nw / ladder(5, 60, 10).Nw, 3, 1e-9) && near(ladderTop(5, 30, 10).Nw / ladderTop(5, 60, 10).Nw, 3, 1e-9) || 'ladderangle');

// ================================================================ assertion-reason
add('bus-ar', ar({
  a: 'A passenger standing in a train is thrown backward when the train starts suddenly.',
  r: 'The body of the passenger tends to remain at rest, while the floor of the train moves forward.',
  key: 'a',
  sol: 'A is true: the passenger seems to move backward relative to the train. R is true and is exactly the reason: inertia of rest keeps the body at rest while the feet are carried forward with the floor.',
  d: 2, c: 'understanding', t: [1],
}));
add('tension-ar', ar({
  a: 'The tension in a light string passing over a smooth pulley is the same on both sides of the pulley.',
  r: 'In an Atwood machine with unequal masses, the tension in the string is greater than the weight of the lighter mass.',
  key: 'b',
  sol: 'A is true: a light string over a smooth pulley transmits the same tension. R is also true, since the lighter mass accelerates upward and T − m₂g = m₂a > 0. But R does not explain A; equal tension follows from the string and pulley being massless and frictionless.',
  d: 3, c: 'analysis', t: [4],
}));
add('momentum-ar', ar({
  a: 'Of two bodies with the same kinetic energy, the heavier has the greater momentum.',
  r: 'The momentum of a body does not depend on its mass.',
  key: 'c',
  sol: 'A is true: p = √(2mK), so for the same K the larger mass has the larger momentum. R is false: p = mv depends on the mass directly.',
  d: 3, c: 'analysis', t: [2],
}), () => { const K = 50; const p = (m) => Math.sqrt(2 * m * K); return p(4) > p(1) && near(p(4) / p(1), 2, 1e-9) || 'momentum-ar'; });
add('ladder-ar', ar({
  a: 'A ladder resting on a smooth wall can be in equilibrium on a floor that exerts only a vertical force on its foot.',
  r: 'The reaction of a smooth wall on the ladder is perpendicular to the wall.',
  key: 'd',
  sol: 'A is false: the wall reaction is horizontal, so for no net horizontal force the floor must exert a horizontal force on the foot as well. R is true, but it is the reason why a horizontal floor force is required, not why it can be absent.',
  d: 3, c: 'analysis', t: [5],
}));
add('lift-ar', ar({
  a: 'A person in a lift that accelerates upward reads more than the true weight on a weighing machine.',
  r: 'When the lift accelerates upward, the net force on the person is upward, so the normal reaction of the floor exceeds the weight.',
  key: 'a',
  sol: 'A is true: N = m(g + a) > mg. R is true and explains it: the net force N − mg = ma is upward, which needs the normal reaction (the reading) to be larger than the weight.',
  d: 2, c: 'understanding', t: [4],
}));
add('isolated-ar', ar({
  a: 'The third law can be obtained from the conservation of momentum for two bodies that interact only with each other.',
  r: 'A pair of bodies that interact only with each other has a net external force on it.',
  key: 'c',
  sol: 'A is true: with p_A + p_B constant, dp_A/dt = −dp_B/dt, so the two forces are equal and opposite. R is false: such a pair is an isolated system, with no net external force; that is why its total momentum is conserved.',
  d: 3, c: 'analysis', t: [3],
}));

// ================================================================ true-false and fill-blank
add('pair-tf', tf({
  stem: 'The weight of a book lying on a table and the normal reaction of the table on the book form an action–reaction pair of the third law.',
  key: 'f',
  sol: 'False. Both forces act on the same body, the book. The reaction to the weight is the book’s pull on the Earth; the reaction to the normal reaction is the book’s push on the table.',
  d: 2, c: 'understanding', t: [3, 4],
}));
add('parallel-tf', tf({
  stem: 'Three parallel coplanar forces can keep a rigid body in equilibrium.',
  key: 't',
  sol: 'True. For example, a plank resting on two supports with a load between them: the middle force acts opposite to the other two, and both the force sum and the torque sum can be zero.',
  d: 2, c: 'understanding', t: [5],
}));
add('impulse-fill', fill({
  stem: 'The impulse of a force acting on a body is equal to the change in ___ of the body.',
  acc: [['momentum', 'linear momentum']],
  sol: 'From F = Δp/Δt, the impulse FΔt equals the change in **momentum**.',
  d: 1, c: 'recall', t: [3],
}));
add('weightless-fill', fill({
  stem: 'If the cable of a lift snaps and the lift falls freely, a weighing machine inside it reads ___.',
  acc: [['zero', '0', 'nothing']],
  sol: 'In free fall a = g, so N = m(g − g) = **zero**: the person is weightless.',
  d: 1, c: 'recall', t: [4],
}));

// ================================================================ numerical items
const pm = { m: 1500, kmh: 72 };
pm.v = (pm.kmh * 1000) / 3600;
pm.p = pm.m * pm.v;
add('p-num', num({
  stem: `A car of mass ${pm.m} kg travels at ${pm.kmh} km h⁻¹. Find the magnitude of its linear momentum, in kg m s⁻¹.`,
  value: pm.p, tol: 150, unit: 'kg m s⁻¹',
  sol: r`$v = ${pm.kmh} \times \dfrac{1000}{3600} = ${f(pm.v, 3)}\ \text{m s}^{-1}$; $p = mv = ${pm.m} \times ${f(pm.v, 3)} = ${pm.p}\ \text{kg m s}^{-1}$.`,
  scheme: [[`v = ${f(pm.v, 3)} m s⁻¹; p = ${pm.m} × ${f(pm.v, 3)} = ${pm.p} kg m s⁻¹`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => near(pm.m * (pm.kmh / 3.6), q.answer.value, 1e-9) && pm.p === 30000 || 'p-num');
const tn = { m: 0.058, u: 12, v: 30, t: 0.004 };
tn.F = (tn.m * (tn.u + tn.v)) / tn.t;
add('racket-num', num({
  stem: `A tennis ball of mass ${tn.m} kg arrives at a racket at ${tn.u} m s⁻¹ and leaves along the same line in the opposite direction at ${tn.v} m s⁻¹. The contact lasts ${tn.t} s. Find the average force of the racket on the ball, in N.`,
  value: R7(tn.F), tol: 5, unit: 'N', marks: 2,
  sol: r`Taking the outgoing direction as positive, $\Delta p = m(v - u) = ${tn.m}\,(${tn.v} + ${tn.u}) = ${f(tn.m * (tn.u + tn.v), 4)}\ \text{kg m s}^{-1}$; $F = \dfrac{\Delta p}{\Delta t} = \dfrac{${f(tn.m * (tn.u + tn.v), 4)}}{${tn.t}} = ${f(tn.F, 3)}\ \text{N}$.`,
  scheme: [[`Δp = ${tn.m} × (${tn.v} + ${tn.u}) = ${f(tn.m * (tn.u + tn.v), 4)} kg m s⁻¹ (directions reversed)`, 1], [`F = Δp/Δt = ${f(tn.F, 3)} N`, 1]],
  d: 3, c: 'application', t: [3],
}), (q) => near(impulseOf(() => q.answer.value, 0, tn.t), tn.m * (tn.v + tn.u), 1e-3) || 'racket-num');
const lu = { M: 800, T: 9600 };
lu.a = (lu.T - lu.M * g) / lu.M;
add('liftcable-num', num({
  stem: `A lift of mass ${lu.M} kg is raised by a cable whose tension is ${lu.T} N. Taking g = 9.8 m s⁻², find the upward acceleration of the lift, in m s⁻².`,
  value: R7(lu.a), tol: 0.02, unit: 'm s⁻²', marks: 2,
  sol: r`Net upward force $= T - Mg = ${lu.T} - ${f(lu.M * g)} = ${f(lu.T - lu.M * g)}\ \text{N}$; $a = \dfrac{${f(lu.T - lu.M * g)}}{${lu.M}} = ${f(lu.a)}\ \text{m s}^{-2}$.`,
  scheme: [[`T − Mg = ${lu.T} − ${f(lu.M * g)} = ${f(lu.T - lu.M * g)} N`, 1], [`a = ${f(lu.T - lu.M * g)}/${lu.M} = ${f(lu.a)} m s⁻²`, 1]],
  d: 2, c: 'application', t: [4],
}), (q) => near(liftN(lu.M, q.answer.value), lu.T, 1e-6) || 'liftcable-num');
const bl = { m: 0.025, v: 320, M: 1.975 };
bl.V = (bl.m * bl.v) / (bl.m + bl.M);
add('embed-num', num({
  stem: `A bullet of mass ${bl.m * 1000} g moving at ${bl.v} m s⁻¹ embeds itself in a wooden block of mass ${bl.M} kg lying at rest on a smooth horizontal table. Find the common speed of the block and bullet just after impact, in m s⁻¹.`,
  value: R7(bl.V), tol: 0.04, unit: 'm s⁻¹', marks: 2,
  sol: r`No external horizontal force acts during the impact, so momentum is conserved: $${bl.m}(${bl.v}) = (${bl.m} + ${bl.M})V$, giving $${f(bl.m * bl.v)} = ${f(bl.m + bl.M)}\,V$, so $V = \dfrac{${f(bl.m * bl.v)}}{${f(bl.m + bl.M)}} = ${f(bl.V)}$ m s$^{-1}$.`,
  scheme: [['Momentum conserved (no external horizontal force): m v = (m + M) V', 1], [`V = ${f(bl.m * bl.v)}/${f(bl.m + bl.M)} = ${f(bl.V)} m s⁻¹`, 1]],
  d: 3, c: 'application', t: [3],
}), (q) => near((bl.m + bl.M) * q.answer.value, bl.m * bl.v, 1e-6) || 'embed-num');
const lq = { W: 120, a: 40 };
lq.T = lq.W / (2 * Math.sin(rad(lq.a)));
add('sign-num', num({
  stem: `A signboard of weight ${lq.W} N is hung from a knot by two identical ropes, each making ${lq.a}° with the horizontal. Find the tension in each rope, in N.`,
  value: R7(lq.T), tol: 0.5, unit: 'N', marks: 2,
  sol: r`By symmetry the tensions are equal. Vertical balance: $2T\sin${lq.a}^\circ = ${lq.W}$, so $T = \dfrac{${lq.W}}{2 \times ${f(Math.sin(rad(lq.a)), 4)}} = ${f(lq.T, 3)}\ \text{N}$.`,
  scheme: [[`2T sin ${lq.a}° = ${lq.W} (vertical balance; horizontal parts cancel)`, 1], [`T = ${f(lq.T, 3)} N`, 1]],
  d: 2, c: 'application', t: [5],
}), (q) => { const s = lampLin(lq.W, lq.a, lq.a); return near(s.T1, q.answer.value, 1e-6) && near(s.T2, q.answer.value, 1e-6) || 'sign-num'; });
const at2 = { m1: 4, m2: 6 };
at2.T = atwood(at2.m1, at2.m2).T;
add('atwoodT-num', num({
  stem: `Masses of ${at2.m1} kg and ${at2.m2} kg are joined by a light string over a smooth pulley. Taking g = 9.8 m s⁻², find the tension in the string, in N.`,
  value: R7(at2.T), tol: 0.1, unit: 'N', marks: 2,
  sol: r`$T = \dfrac{2m_1m_2g}{m_1 + m_2} = \dfrac{2(${at2.m1})(${at2.m2})(9.8)}{${at2.m1} + ${at2.m2}} = \dfrac{${f(2 * at2.m1 * at2.m2 * g, 4)}}{${at2.m1 + at2.m2}} = ${f(at2.T, 4)}\ \text{N}$.`,
  scheme: [['T = 2 m₁ m₂ g/(m₁ + m₂), from the two equations of motion', 1], [`T = ${f(at2.T, 4)} N`, 1]],
  d: 3, c: 'application', t: [4],
}), (q) => near(atwoodEnergy(at2.m2, at2.m1).T, q.answer.value, 1e-6) || 'atwoodT-num');
const ln = { L: 5, th: 60, m: 15, M: 60, d: 3 };
ln.Nw = ladder(ln.L, ln.th, ln.m, ln.M, ln.d).Nw;
add('painter-num', num({
  stem: `A uniform ladder of length ${ln.L} m and mass ${ln.m} kg rests against a smooth wall, making ${ln.th}° with the level floor. A painter of mass ${ln.M} kg stands on it at a point ${ln.d} m from its foot, measured along the ladder. Taking g = 9.8 m s⁻², find the reaction of the wall on the ladder, in N.`,
  value: R7(ln.Nw), tol: 1.5, unit: 'N', marks: 3,
  sol: r`Torques about the foot (the floor forces have none): $N_w (L\sin${ln.th}^\circ) = mg\left(\dfrac{L}{2}\cos${ln.th}^\circ\right) + Mg\,(d\cos${ln.th}^\circ)$. Then $N_w \times ${f(ln.L * Math.sin(rad(ln.th)), 4)} = ${f(ln.m * g * (ln.L / 2) * Math.cos(rad(ln.th)), 4)} + ${f(ln.M * g * ln.d * Math.cos(rad(ln.th)), 4)}$, so $N_w = \dfrac{${f(ln.m * g * (ln.L / 2) * Math.cos(rad(ln.th)) + ln.M * g * ln.d * Math.cos(rad(ln.th)), 5)}}{${f(ln.L * Math.sin(rad(ln.th)), 4)}} = ${f(ln.Nw, 4)}$ N.`,
  scheme: [['Torque about the foot: N_w L sin θ = mg (L/2) cos θ + Mg d cos θ', 1], [`Moments: ${f(ln.m * g * (ln.L / 2) * Math.cos(rad(ln.th)), 4)} N m and ${f(ln.M * g * ln.d * Math.cos(rad(ln.th)), 4)} N m; L sin θ = ${f(ln.L * Math.sin(rad(ln.th)), 4)} m`, 1], [`N_w = ${f(ln.Nw, 4)} N`, 1]],
  d: 5, c: 'application', t: [5],
}), (q) => near(ladderTop(ln.L, ln.th, ln.m, ln.M, ln.d).Nw, q.answer.value, 1e-6) && near(ln.Nw, 246.1, 2e-3) || 'painter-num');
