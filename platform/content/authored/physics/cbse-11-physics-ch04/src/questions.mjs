// ch04 Laws of Motion — question bank, part 1: t01 (Newton's laws, momentum, impulse, free-body problems) and t02 (conservation of
// linear momentum). Every numerical is computed here and re-solved by an independent `check` (linear solves, time stepping,
// integration); solutions and schemes print the computed values. Assertion-reason keys across the chapter: a, c, b, d, a, c.
import { mk, add, r, near, sig } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { g, solveLin, integ, simulate, atwood, tablePulley } from './phys.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
export const p3 = (x) => String(sig(x, 3));
export const Q3 = (x) => Number(sig(x, 3));
/** Numerical item helper: key value rounded to 3 s.f., tolerance 1% unless given. */
export const N = (key, o, check) =>
  add(key, num({ marks: 1, ...o, value: o.val, tol: o.tol ?? Math.abs(o.val) * 0.01, scheme: o.scheme ?? [[`Substitution and result: ${o.val} ${o.unit}`, 1]] }), check);

// ================================================================ t01 Newton's laws, momentum, impulse
add('bus-mcq', mcq({
  stem: 'A steel ball lies on the smooth floor of a city bus that is standing at a stop. When the bus pulls away, the passengers see the ball roll towards the back of the bus. Which statement is correct?',
  right: 'The bus is a non-inertial frame; from the road the ball simply keeps its state of rest while the bus moves forward',
  wrong: ['A backward force acts on the ball in every frame of reference', 'Newton’s first law fails for the ball even as seen from the road', 'The smooth floor removes the ball’s inertia'],
  sol: 'The accelerating bus is not an inertial frame, so a free body seems to accelerate backward in it. In the road frame no force acts on the ball horizontally, so it keeps its velocity — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
const rt = { J: 12, m1: 2.0, m2: 6.0 };
rt.v1 = rt.J / rt.m1;
rt.v2 = rt.J / rt.m2;
add('impratio-mcq', mcq({
  stem: `Two trolleys of masses ${rt.m1} kg and ${rt.m2} kg stand at rest on a smooth track. Each receives the same impulse of ${rt.J} N s. The ratio of the final speed of the lighter to that of the heavier trolley is`,
  right: `${rt.v1 / rt.v2} : 1`,
  wrong: ['1 : 3', '1 : 1', '9 : 1'],
  sol: `Impulse = change of momentum = m v, so v = J/m. v = ${rt.J}/${rt.m1} = ${rt.v1} m/s and ${rt.J}/${rt.m2} = ${rt.v2} m/s; ratio ${rt.v1} : ${rt.v2} = ${rt.v1 / rt.v2} : 1 — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => near(rt.v1 / rt.v2, 3, 1e-12) || 'ratio');
add('cart-mcq', mcq({
  stem: 'A bullock pulls a cart along a village road. By the third law the cart pulls the bullock back with an equal force, yet the pair moves forward. The best explanation is that',
  right: 'the two forces act on different bodies; the cart’s motion depends on the forward pull on it compared with the friction on the cart',
  wrong: ['the pull on the cart is a little larger than the pull on the bullock', 'action and reaction do not occur when a body is moving', 'the pull of the bullock acts first and the reaction acts later'],
  sol: 'Third-law forces are always equal and act on different bodies, so they cannot cancel. The cart accelerates if the forward pull on it exceeds the friction on it; the bullock moves because the ground pushes its hooves forward — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
const lf = { m: 50, a: 2.0 };
lf.N = lf.m * (g - lf.a);
add('lift-mcq', mcq({
  stem: `A ${lf.m} kg student stands on a weighing scale in a lift that is moving upward but slowing down at ${lf.a.toFixed(1)} m/s². Taking g = ${g} m/s², the scale reads`,
  right: `${p3(lf.N)} N`,
  wrong: [`${p3(lf.m * (g + lf.a))} N`, `${p3(lf.m * g)} N`, '0 N'],
  sol: `Moving up while slowing down means the acceleration is downward. Taking up as positive: N − mg = m(−a), so N = m(g − a) = ${lf.m} × (${g} − ${lf.a.toFixed(1)}) = ${p3(lf.N)} N — option (@K).`,
  d: 3, c: 'application', t: [1],
}), () => near(lf.N, 390, 1e-12) || 'lift');
const fd = { k: 4, t: 3 };
fd.F = 2 * fd.k * fd.t; // p = k t², F = dp/dt = 2 k t
add('fdp-mcq', mcq({
  stem: `The momentum of a toy car moving along a straight track varies with time as p = 4t² (p in kg m/s, t in s). The net force on it at t = ${fd.t} s is`,
  right: `${fd.F} N`,
  wrong: [`${fd.k * fd.t ** 2} N`, `${fd.k * fd.t} N`, `${fd.F * fd.t} N`],
  sol: `F = dp/dt = 8t, so at t = ${fd.t} s F = 8 × ${fd.t} = ${fd.F} N — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => near((4 * (3.0001) ** 2 - 4 * (2.9999) ** 2) / 0.0002, fd.F, 1e-6) || 'fdp');
add('atw-mcq', mcq({
  stem: 'Two masses hang from the ends of a light string passing over a smooth pulley, and the heavier one moves down. Both masses are now doubled. The acceleration and the tension become',
  right: 'acceleration unchanged, tension doubled',
  wrong: ['acceleration doubled, tension unchanged', 'acceleration unchanged, tension unchanged', 'acceleration doubled, tension doubled'],
  sol: 'a = (m₂ − m₁)g/(m₁ + m₂) depends only on the ratio of the masses, so it is unchanged; T = 2m₁m₂g/(m₁ + m₂) is proportional to the masses, so it doubles — option (@K).',
  d: 3, c: 'analysis', t: [1],
}), () => { const A = atwood(3, 5); const B = atwood(6, 10); return (near(A.a, B.a, 1e-12) && near(2 * A.T, B.T, 1e-12)) || 'atw'; });
add('pair-mcq', mcq({
  stem: 'A book rests on a table. The weight of the book is the pull of the Earth on the book. Its third-law partner is',
  right: 'the pull of the book on the Earth',
  wrong: ['the normal reaction of the table on the book', 'the push of the book on the table', 'the force of friction between book and table'],
  sol: 'A third-law pair has the same nature and acts on two different bodies: the Earth pulls the book, and the book pulls the Earth. The normal reaction acts on the book too, so it is not the partner — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
const ar5 = { peak: 30, T: 2, m: 5 };
ar5.J = 0.5 * ar5.peak * ar5.T;
ar5.v = ar5.J / ar5.m;
add('area-mcq', mcq({
  stem: `The net force on a ${ar5.m.toFixed(1)} kg body at rest rises uniformly from zero to ${ar5.peak} N in ${ar5.T} s and is then removed. Its final speed is`,
  right: `${p3(ar5.v)} m/s`,
  wrong: [`${p3(ar5.peak * ar5.T / ar5.m)} m/s`, `${p3(ar5.v / 2)} m/s`, `${p3(ar5.J)} m/s`],
  sol: `Impulse = area of the triangle = ½ × ${ar5.T} × ${ar5.peak} = ${ar5.J} N s = m v, so v = ${ar5.J}/${ar5.m.toFixed(1)} = ${p3(ar5.v)} m/s — option (@K).`,
  d: 3, c: 'application', t: [1],
}), () => near(integ((t) => (ar5.peak / ar5.T) * t, 0, ar5.T) / ar5.m, ar5.v, 1e-9) || 'area');

add('const-ar', ar({
  a: 'A body can move at constant velocity although several forces act on it.',
  r: 'The motion is unaccelerated whenever the vector sum of the forces is zero.',
  key: 'a',
  sol: 'A is true and R explains it: by the second law zero net force means zero acceleration, i.e. constant velocity, whatever the number of forces — option (a).',
  scheme: [['Correct option (a)', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('impulse-ar', ar({
  a: 'A fielder draws his hands back while catching a fast cricket ball.',
  r: 'Drawing the hands back reduces the change of momentum of the ball.',
  key: 'c',
  sol: 'A is true, R is false: the ball still loses all its momentum, so the impulse is the same; the hands back lengthen the contact time, which lowers the average force — option (c).',
  scheme: [['Correct option (c)', 1]],
  d: 3, c: 'analysis', t: [1],
}));
add('first-tf', tf({
  stem: 'Newton’s first law is only the second law with F = 0, so it tells us nothing that the second law does not.',
  key: 'f',
  sol: 'False. The first law also identifies the inertial frames in which the second law holds; the second law cannot be stated without that.',
  d: 2, c: 'understanding', t: [1],
}));
add('hockey-fill', fill({
  stem: 'In an ice-hockey game the area under the force–time graph for a stick striking a puck equals the ___ delivered to the puck.',
  acc: [['impulse', 'the impulse']],
  sol: 'The area under an F–t graph is the impulse, which equals the change of momentum.',
  d: 1, c: 'recall', t: [1],
}));

N('fma-num', {
  stem: 'A car of mass 1.25 × 10³ kg is brought to a halt by a net braking force of 3.5 × 10³ N. Find the magnitude of its retardation, in m/s².',
  val: 2.8, unit: 'm/s²',
  sol: r`$a = \dfrac{F}{m} = \dfrac{3500}{1250} = 2.8$ m/s$^2$.`,
  d: 1, c: 'application', t: [1],
}, () => near(3500 / 1250, 2.8, 1e-12) || 'fma');
const imp = { m: 0.058, u: 40, v: 30, t: 0.005 };
imp.J = imp.m * (imp.u + imp.v);
imp.F = imp.J / imp.t;
N('imp-num', {
  stem: 'A tennis ball of mass 58 g arrives at a wall at 40 m/s and rebounds along the same line at 30 m/s. It is in contact with the wall for 5.0 ms. Find the average force of the wall on the ball, in N.',
  val: Q3(imp.F), unit: 'N', marks: 2,
  sol: r`Taking the rebound direction as positive, $\Delta p = m(v - u) = 0.058\,[30 - (-40)] = ${p3(imp.J)}$ kg m/s. Average force $= \dfrac{\Delta p}{\Delta t} = \dfrac{${p3(imp.J)}}{0.005} = ${p3(imp.F)}$ N.`,
  scheme: [[`Δp = 0.058 × 70 = ${p3(imp.J)} kg m s⁻¹ (signs: the speeds add)`, 1], [`F = Δp/Δt = ${p3(imp.F)} N`, 1]],
  d: 3, c: 'application', t: [1],
}, () => near(Math.abs(imp.m * (30 - -40)) / 0.005, imp.F, 1e-12) && near(imp.F, 812, 1e-3) || 'imp');
const cf = { m: 3.0, k: 12, T: 2.0 };
cf.v = integ((t) => cf.k * t, 0, cf.T) / cf.m;
N('calcf-num', {
  stem: 'A 3.0 kg block on a smooth horizontal table starts from rest and is pulled by a horizontal force F = 12t newtons (t in seconds). Find its speed at t = 2.0 s, in m/s.',
  val: Q3(cf.v), unit: 'm/s', marks: 2,
  sol: r`Impulse $= \int_0^{2} 12t\,dt = 6t^2 \Big|_0^{2} = ${p3(cf.k / 2 * cf.T ** 2)}$ N s. Then $v = \dfrac{J}{m} = \dfrac{${p3(cf.k / 2 * cf.T ** 2)}}{3.0} = ${p3(cf.v)}$ m/s.`,
  scheme: [[`Impulse = ∫ 12t dt = 6t² = ${p3(cf.k / 2 * cf.T ** 2)} N s`, 1], [`v = J/m = ${p3(cf.v)} m/s`, 1]],
  d: 3, c: 'application', t: [1],
}, () => { const s = simulate((x, v, t) => (cf.k * t) / cf.m, 0, 0, cf.T, 1e-4); return near(s.v, cf.v, 1e-6) || 'calcf'; });
add('cablelift-short', short({
  marks: 2,
  stem: 'The cable of a goods lift in a Pune warehouse carries a steady tension while the loaded lift rises at constant speed. Explain why the tension must increase while the lift is speeding up, and what happens to it when the lift moves at constant speed again.',
  model: 'At constant speed the net force is zero, so the cable tension equals the total weight of lift and load. To speed up, the lift needs a net upward force, so the tension must be larger than the weight for as long as the acceleration lasts. Once the speed is steady again, the tension returns to equal the weight.',
  sol: 'Net force zero at steady speed; net upward force needed while accelerating.',
  scheme: [['At constant speed T equals the total weight (net force zero)', 1], ['While speeding up a net upward force is needed, so T exceeds the weight; afterwards T returns to the weight', 1]],
  d: 2, c: 'understanding', t: [1],
}));
const aw = { m1: 4.0, m2: 6.0 };
Object.assign(aw, atwood(aw.m1, aw.m2));
N('atw-num', {
  stem: `Masses of ${aw.m1.toFixed(1)} kg and ${aw.m2.toFixed(1)} kg hang from the two ends of a light string over a smooth pulley and are released from rest. Find the tension in the string, in N. (g = ${g} m/s².)`,
  val: Q3(aw.T), unit: 'N', marks: 2,
  sol: r`$a = \dfrac{(m_2 - m_1)g}{m_1 + m_2} = \dfrac{(6.0 - 4.0) \times ${g}}{10.0} = ${p3(aw.a)}$ m/s$^2$. For the lighter mass $T = m_1(g + a) = ${aw.m1} \times ${p3(g + aw.a)} = ${p3(aw.T)}$ N.`,
  scheme: [[`a = ${p3(aw.a)} m s⁻²`, 1], [`T = m₁(g + a) = ${p3(aw.T)} N`, 1]],
  d: 3, c: 'application', t: [1],
}, () => near(aw.T, (2 * 4 * 6 * g) / 10, 1e-9) && near(aw.m2 * (g - aw.a), aw.T, 1e-9) || 'atw');
add('hangten-mcq', mcq({
  stem: 'A block on a smooth table is joined by a light string over a smooth pulley to a block hanging from the edge. While the hanging block is accelerating downward, the tension in the string is',
  right: 'less than the weight of the hanging block, because it is accelerating downward',
  wrong: ['equal to the weight of the hanging block, because the string is light', 'greater than the weight of the hanging block, because the string also pulls the table block', 'zero, because the pulley is smooth'],
  sol: 'For the hanging block m₂g − T = m₂a with a downward and not zero, so T is less than m₂g. A light string and smooth pulley make the tension the same on both sides, not equal to the weight — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));

add('foam-short', short({
  marks: 2,
  stem: 'A high jumper lands on a thick foam pit rather than on a hard track. Use the idea of impulse to explain why the foam protects her.',
  model: r`Her momentum just before landing must be reduced to zero, so the impulse $F\,\Delta t = \Delta p$ is fixed. The soft foam compresses slowly and makes the stopping time $\Delta t$ much longer, so the average force on her, $F = \Delta p/\Delta t$, is much smaller. On a hard track $\Delta t$ is tiny and the force is large enough to injure her.`,
  sol: 'Same impulse; longer time gives a smaller average force.',
  scheme: [['Change of momentum (impulse) is the same on both surfaces', 1], ['Foam lengthens Δt, so F = Δp/Δt is smaller', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('train-short', short({
  marks: 2,
  stem: 'A passenger in a train that is speeding up says a suitcase on the smooth floor “is pushed back by a force”. Explain this using the idea of inertial frames, and state what an observer on the platform says.',
  model: r`The accelerating train is a **non-inertial frame**, so a free body appears to accelerate backwards although no real force acts on it. The observer on the platform, in an (almost) inertial frame, sees the suitcase keep its velocity while the floor of the train moves forward beneath it.`,
  sol: 'Non-inertial frame: apparent acceleration without a force; the ground observer sees no force.',
  scheme: [['The train is a non-inertial frame; a free body seems to accelerate backwards', 1], ['In the platform frame no force acts and the suitcase keeps its velocity', 1]],
  d: 3, c: 'understanding', t: [1],
}));
add('pairbook-short', short({
  marks: 2,
  stem: 'A 2.0 kg book rests on a table. Name the force that pairs with the normal reaction on the book by the third law, say on which body it acts, and explain why the book’s weight is not that partner.',
  model: r`The normal reaction $N$ of the table on the book is paired with the push of the book on the table, equal in size (19.6 N) and opposite, acting on the **table**. The weight acts on the **same** body as $N$ (the book) and has a different origin (gravity), so it is not the partner, even though $N = mg$ here because $a = 0$.`,
  sol: 'N pairs with the book’s push on the table; weight acts on the same body.',
  scheme: [['Partner: push of the book on the table, equal and opposite, acting on the table', 1], ['Weight acts on the book, the same body as N, and is of gravitational origin', 1]],
  d: 3, c: 'understanding', t: [1],
}));
add('fdp-short', short({
  marks: 2,
  stem: 'Rain falls into an open goods wagon that is rolling on a smooth track and its mass keeps increasing. Why is F = dp/dt more reliable here than F = ma?',
  model: r`The second law is $F = dp/dt = d(mv)/dt = m\,dv/dt + v\,dm/dt$. When the mass of the system changes, the second term cannot be ignored, and $F = ma$ (which assumes constant $m$) is wrong. $F = dp/dt$ always holds for the **momentum** of the chosen system, so it handles the changing mass correctly.`,
  sol: 'F = dp/dt includes the v dm/dt term.',
  scheme: [['F = d(mv)/dt = m dv/dt + v dm/dt', 1], ['F = ma drops the v dm/dt term, which matters when the mass changes', 1]],
  d: 3, c: 'analysis', t: [1],
}));
const sl3 = { m: 60, a: 1.5 };
add('lift-short3', short({
  marks: 3,
  stem: `A ${sl3.m} kg person stands on a weighing scale in a lift. Find the reading when the lift (i) accelerates upward at ${sl3.a} m/s², (ii) moves at a steady speed, and (iii) accelerates downward at ${sl3.a} m/s². Take g = ${g} m/s².`,
  model: r`The scale reads the normal reaction $N$ on the person, found from the second law $N - mg = ma$ with up taken as positive. (i) $N = m(g + a) = ${sl3.m}(${g} + ${sl3.a}) = ${p3(sl3.m * (g + sl3.a))}$ N. (ii) $N = mg = ${p3(sl3.m * g)}$ N. (iii) $N = m(g - a) = ${sl3.m}(${g} - ${sl3.a}) = ${p3(sl3.m * (g - sl3.a))}$ N. So the reading is above the weight when the acceleration is upward and below it when downward.`,
  sol: 'N − mg = ma in each case.',
  scheme: [['Scale reads N, with N − mg = ma', 1], [`(i) ${p3(sl3.m * (g + sl3.a))} N; (ii) ${p3(sl3.m * g)} N`, 1], [`(iii) ${p3(sl3.m * (g - sl3.a))} N`, 1]],
  d: 3, c: 'application', t: [1],
}), () => near(sl3.m * (g + sl3.a), 678, 1e-9) && near(sl3.m * (g - sl3.a), 498, 1e-9) || 'lift3');
add('atwood-derive', short({
  marks: 3,
  stem: 'Two masses m₁ and m₂ (m₂ > m₁) hang from a light string over a smooth pulley. Draw the free-body diagrams in words and derive expressions for the acceleration and the tension.',
  model: r`Each block is treated separately, and the string is light and the pulley smooth, so the tension $T$ is the same on both sides and a taut string gives both blocks the same acceleration $a$. Heavier mass (down): $m_2 g - T = m_2 a$. Lighter mass (up): $T - m_1 g = m_1 a$, with the same $T$ (light string, smooth pulley) and the same $a$ (taut string). Adding eliminates $T$: $a = \dfrac{(m_2 - m_1)g}{m_1 + m_2}$. Substituting back, $T = m_1(g + a) = \dfrac{2m_1 m_2 g}{m_1 + m_2}$.`,
  sol: 'Two equations, add to eliminate T.',
  scheme: [['Equations m₂g − T = m₂a and T − m₁g = m₁a, with the same T and a', 1], ['a = (m₂ − m₁)g/(m₁ + m₂)', 1], ['T = 2m₁m₂g/(m₁ + m₂)', 1]],
  d: 3, c: 'understanding', t: [1],
}));

// ================================================================ t02 conservation of linear momentum
const sk = { m1: 60, m2: 40, v2: 1.5 };
sk.v1 = (sk.m2 * sk.v2) / sk.m1;
add('skater-mcq', mcq({
  stem: `A ${sk.m1} kg skater at rest on smooth ice pushes a ${sk.m2} kg friend, who glides away at ${sk.v2} m/s. The skater’s velocity is then`,
  right: `${p3(sk.v1)} m/s in the opposite direction`,
  wrong: [`${sk.v2} m/s in the opposite direction`, `${p3(sk.v1)} m/s in the same direction`, `${p3((sk.m1 * sk.v2) / sk.m2)} m/s in the opposite direction`],
  sol: `Total momentum stays zero: ${sk.m1} V + ${sk.m2} × ${sk.v2} = 0 gives V = −${sk.m2} × ${sk.v2}/${sk.m1} = −${p3(sk.v1)} m/s, i.e. opposite to the friend — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => near(-(sk.m2 * sk.v2) / sk.m1, -1.0, 1e-9) || 'skater');
const bu = { ratio: 3 }; // masses 1 : 3
add('burst-mcq', mcq({
  stem: 'A shell at rest in mid-air bursts into two pieces of masses in the ratio 1 : 3, flying off in opposite directions. The ratio of the kinetic energy of the lighter piece to that of the heavier piece is',
  right: '3 : 1',
  wrong: ['1 : 3', '1 : 1', '9 : 1'],
  sol: 'Equal and opposite momenta p, and K = p²/2m, so K is inversely proportional to the mass: K(light) : K(heavy) = 3 : 1 — option (@K).',
  d: 3, c: 'analysis', t: [2],
}), () => { const m1 = 1; const m2 = bu.ratio; const v1 = m2; const v2 = m1; return near((0.5 * m1 * v1 ** 2) / (0.5 * m2 * v2 ** 2), 3, 1e-12) || 'burst'; });
add('recoil-ar', ar({
  a: 'After a rifle is fired, the kinetic energy of the rifle is much smaller than that of the bullet.',
  r: 'The rifle and the bullet have momenta of equal size and opposite direction.',
  key: 'b',
  sol: 'Both statements are true, but R alone does not explain A: it is K = p²/2m, with equal p, that makes the heavier rifle’s kinetic energy smaller — option (b).',
  scheme: [['Correct option (b)', 1]],
  d: 3, c: 'analysis', t: [2],
}));
add('couple-tf', tf({
  stem: 'When two railway wagons couple on a level track, the momentum of the pair is conserved but their total kinetic energy decreases.',
  key: 't',
  sol: 'True. No external horizontal force acts during the coupling, so momentum is conserved; some kinetic energy becomes heat, sound and deformation.',
  d: 2, c: 'understanding', t: [2],
}));
const rc = { M: 1500, m: 25, v: 120 };
rc.V = (rc.m * rc.v) / rc.M;
N('cannon-num', {
  stem: 'A field gun of mass 1500 kg, standing on a horizontal surface, fires a 25 kg shell horizontally at 120 m/s. Find the recoil speed of the gun, in m/s, ignoring friction during the firing.',
  val: Q3(rc.V), unit: 'm/s', marks: 2,
  sol: r`Total momentum is zero before and after: $M V = m v$, so $V = \dfrac{m v}{M} = \dfrac{25 \times 120}{1500} = ${p3(rc.V)}$ m/s.`,
  scheme: [['Momentum conservation: MV = mv', 1], [`V = ${p3(rc.V)} m s⁻¹`, 1]],
  d: 2, c: 'application', t: [2],
}, () => near(rc.V, 2.0, 1e-12) && near(rc.M * rc.V - rc.m * rc.v, 0, 1e-9) || 'cannon');
const st = { m: 0.020, u: 300, M: 1.98 };
st.V = (st.m * st.u) / (st.m + st.M);
N('stick-num', {
  stem: 'A 20 g bullet moving horizontally at 300 m/s embeds itself in a 1.98 kg wooden block resting on smooth ice. Find the speed of the block with the bullet, in m/s.',
  val: Q3(st.V), unit: 'm/s', marks: 3,
  sol: r`No external horizontal force acts during the impact, so $m u = (m + M)V$. Hence $V = \dfrac{0.020 \times 300}{0.020 + 1.98} = \dfrac{6.0}{2.0} = ${p3(st.V)}$ m/s.`,
  scheme: [['Momentum conserved: mu = (m + M)V', 1], ['Total mass 0.020 + 1.98 = 2.0 kg; momentum 6.0 kg m s⁻¹', 1], [`V = ${p3(st.V)} m s⁻¹`, 1]],
  d: 3, c: 'application', t: [2],
}, () => near(st.V, 3.0, 1e-12) || 'stick');
const ex = { M: 5.0, m1: 2.0, v1: 9.0, m2: 1.5, v2: 8.0 };
ex.m3 = ex.M - ex.m1 - ex.m2;
ex.px = ex.m1 * ex.v1;
ex.py = ex.m2 * ex.v2;
ex.p3 = Math.hypot(ex.px, ex.py);
ex.v3 = ex.p3 / ex.m3;
ex.ang = (Math.atan2(ex.py, ex.px) * 180) / Math.PI;
N('explode-num', {
  stem: 'A stone of mass 5.0 kg at rest explodes into three pieces: 2.0 kg flying east at 9.0 m/s, 1.5 kg flying north at 8.0 m/s, and a third piece. Find the speed of the third piece, in m/s.',
  val: Q3(ex.v3), unit: 'm/s', marks: 3,
  sol: r`Mass of the third piece $= 5.0 - 2.0 - 1.5 = ${p3(ex.m3)}$ kg. Total momentum is zero, so the third piece has momentum equal and opposite to the resultant of $(2.0 \times 9.0)$ east and $(1.5 \times 8.0)$ north: $p_3 = \sqrt{${ex.px}^2 + ${ex.py}^2} = ${p3(ex.p3)}$ kg m/s. Then $v_3 = \dfrac{p_3}{m_3} = \dfrac{${p3(ex.p3)}}{${p3(ex.m3)}} = ${p3(ex.v3)}$ m/s, directed ${p3(ex.ang)}° south of west.`,
  scheme: [['Third mass = 1.5 kg; momentum conserved along both axes', 1], [`p₃ = √(18² + 12²) = ${p3(ex.p3)} kg m s⁻¹, opposite to the resultant`, 1], [`v₃ = p₃/m₃ = ${p3(ex.v3)} m s⁻¹`, 1]],
  d: 4, c: 'analysis', t: [2],
}, () => { const [vx, vy] = solveLin([[ex.m3, 0], [0, ex.m3]], [-ex.px, -ex.py]); return near(Math.hypot(vx, vy), ex.v3, 1e-9) && near(vx, -12, 1e-9) || 'explode'; });
add('iceball-short', short({
  marks: 2,
  stem: 'A girl standing at rest on smooth ice throws a heavy ball horizontally in front of her. Say what happens to the girl, and why she moves faster if the ball is heavier at the same throwing speed.',
  model: 'The girl and ball start at rest, so their total momentum is zero. The ball gains forward momentum, so the girl must gain equal backward momentum and slides back. Her speed is the ball momentum divided by her mass, so a heavier ball at the same speed carries more momentum and gives her a larger backward speed.',
  sol: 'Total momentum zero; her speed = (ball momentum)/(her mass).',
  scheme: [['Total momentum stays zero: she moves backward with momentum equal to the ball’s', 1], ['Heavier ball, same speed, more momentum, so a larger backward speed for her', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('single-tf', tf({
  stem: 'Two trolleys collide on a smooth track and move off in different directions. The momentum of each trolley separately is the same before and after the collision.',
  key: 'f',
  sol: 'False. Each trolley receives an impulse from the other, so its own momentum changes; only the total momentum of the two trolleys is conserved.',
  d: 2, c: 'understanding', t: [2],
}));

add('gun-short', short({
  marks: 2,
  stem: 'A heavy howitzer fires a light shell. Explain, using momentum, why the gun recoils much more slowly than the shell moves, although the two are pushed apart by forces of equal size.',
  model: r`Before firing the total momentum is zero. The internal forces are equal and opposite, so after firing $M V = m v$ in magnitude. With $M \gg m$, the speed $V = (m/M)\,v$ is much smaller than $v$. The equal forces act for the same time, so the two get equal and opposite impulses.`,
  sol: 'Equal and opposite momenta; V = mv/M.',
  scheme: [['Total momentum zero: MV = mv (equal and opposite impulses)', 1], ['M much larger than m, so V is much smaller than v', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('rocket-short3', short({
  marks: 3,
  stem: 'A rocket accelerates in empty space where there is nothing to push against. Explain how, using conservation of momentum, and say why the rocket gains speed more quickly when the exhaust speed is larger.',
  model: r`The rocket and its fuel start with zero total momentum (in the frame in which they are at rest). The engine throws exhaust gas backwards at high speed; the gas gets backward momentum, so by conservation the rocket gets an equal forward momentum — the gas pushes the rocket, not the air. The momentum given to the rocket each second is (mass of gas per second) × (exhaust speed), so a larger exhaust speed gives a larger forward force.`,
  sol: 'Backward momentum of the exhaust balanced by forward momentum of the rocket.',
  scheme: [['Total momentum of rocket + fuel is conserved; exhaust leaves backwards', 1], ['Rocket gains equal forward momentum: the gas pushes it, so no medium is needed', 1], ['Force = (mass of gas per second) × exhaust speed: larger exhaust speed, larger thrust', 1]],
  d: 3, c: 'understanding', t: [2],
}));
add('cons-derive', short({
  marks: 3,
  stem: 'Two bodies A and B interact only with each other. Starting from Newton’s second and third laws, show that the total momentum of the pair is conserved.',
  model: r`Let $\vec F_{BA}$ be the force of B on A and $\vec F_{AB}$ that of A on B. The second law gives $d\vec p_A/dt = \vec F_{BA}$ and $d\vec p_B/dt = \vec F_{AB}$. By the third law $\vec F_{AB} = -\vec F_{BA}$. Adding, $d(\vec p_A + \vec p_B)/dt = 0$, so $\vec p_A + \vec p_B$ is constant: the total momentum is conserved when no external force acts.`,
  sol: 'Add the two second-law equations and use the third law.',
  scheme: [['dpA/dt = F(B on A) and dpB/dt = F(A on B)', 1], ['Third law: F(A on B) = −F(B on A)', 1], ['d(pA + pB)/dt = 0, so the total is constant', 1]],
  d: 3, c: 'understanding', t: [2],
}));
