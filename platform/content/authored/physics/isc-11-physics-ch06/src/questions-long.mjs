// ISC 11 ch06 question bank, part 3: long answers (5 marks), set in parts with the marks shown.
import { mk, add, r, dec, near } from '../../isc-11-physics-ch01/src/lib.mjs';
import { g, rad, slope, slopeCartesian, root, handleForce, stepRun } from './phys.mjs';

const { long } = mk;
const f = (x, n = 3) => dec(x, n);
const sn = (t) => Math.sin(rad(t));
const cs = (t) => Math.cos(rad(t));

// ---------------------------------------------------------------- t01 + t02: views and self-adjusting friction
add('views-long', long({
  stem: '(a) Explain the modern view of the origin of friction, and show how it accounts for the proportionality of limiting friction to the normal reaction. [3] (b) With the help of the graph of friction against applied force, explain what is meant by saying that static friction is self-adjusting. [2]',
  model: r`(a) The surfaces touch only at the tips of their highest hills, so the real area of contact is a tiny fraction of the apparent area. At these tips the atoms adhere (cold welding), and friction is the force needed to shear the junctions. A larger normal reaction flattens more tips, so the real contact area grows in proportion to $N$, and so does friction: $f_{\max} = \mu_s N$.

(b) On the graph, for small applied force $F$ the body stays at rest and the friction rises along a straight line with $f = F$, so friction adjusts itself to match the push, from zero up to a peak at the limiting friction. After that the body slides and the friction drops to the kinetic value.`,
  sol: 'Real contact at tips, then the 45° rising line up to the peak.',
  scheme: [['Surfaces touch only at the tips of the hills; atoms adhere (cold welding)', 1], ['Friction is the force to shear the junctions', 1], ['Greater N flattens more tips, so real contact area and friction grow in proportion to N', 1], ['Static part of the graph: line of slope 1, f = F, up to the limiting friction', 1], ['Friction adjusts to the push until the limit, then drops to the kinetic value', 1]],
  d: 3, c: 'understanding', t: [1, 2],
}));

// ---------------------------------------------------------------- t02: the friction graph with numbers
const cr = { m: 22, mus: 0.4, muk: 0.28, F: 100 };
cr.N = cr.m * g;
cr.fmax = cr.mus * cr.N;
cr.fk = cr.muk * cr.N;
cr.a = (cr.F - cr.fk) / cr.m;
add('graph-long', long({
  stem: `A crate of mass ${cr.m} kg stands on a rough floor with μs = ${cr.mus} and μk = ${cr.muk}. Take g = 9.8 m s⁻². (a) Find the limiting friction and the kinetic friction. [2] (b) Describe the graph of friction against a horizontal applied force from 0 to 150 N, marking both values. [1] (c) Find the friction and the acceleration when the crate is pushed with ${cr.F} N. [2]`,
  model: r`(a) $N = mg = ${cr.m} \times 9.8 = ${f(cr.N, 4)}$ N. The limiting friction is $\mu_s N = ${cr.mus} \times ${f(cr.N, 4)} = ${f(cr.fmax, 4)}$ N and the kinetic friction is $\mu_k N = ${cr.muk} \times ${f(cr.N, 4)} = ${f(cr.fk, 4)}$ N.

(b) The graph is a straight line of slope 1 from the origin to a peak at $${f(cr.fmax, 4)}$ N, a sudden drop to $${f(cr.fk, 4)}$ N, and a nearly horizontal line beyond.

(c) A push of ${cr.F} N exceeds ${f(cr.fmax, 4)} N, so the crate slides and the friction is ${f(cr.fk, 4)} N. The acceleration is $a = \dfrac{${cr.F} - ${f(cr.fk, 4)}}{${cr.m}} = ${f(cr.a, 3)}$ m s$^{-2}$.`,
  sol: 'Compare the push with the limit, then F − fk = ma.',
  scheme: [[`f(max) = μs N = ${f(cr.fmax, 4)} N`, 1], [`fk = μk N = ${f(cr.fk, 4)} N`, 1], ['Line of slope 1 to the peak, drop to the kinetic value, flat beyond', 1], [`${cr.F} N exceeds the limit: sliding, friction ${f(cr.fk, 4)} N`, 1], [`a = (F − fk)/m = ${f(cr.a, 3)} m s⁻²`, 1]],
  d: 4, c: 'application', t: [2],
}), () => {
  const lim = root((x) => slopeCartesian(cr.m, 0, cr.mus, x, 1).a, 0, 400);
  const kin = root((x) => slopeCartesian(cr.m, 0, cr.muk, x, 1).a, 0, 400);
  const a = slopeCartesian(cr.m, 0, cr.muk, cr.F, 1).a;
  return (near(lim, cr.fmax, 1e-6) && near(kin, cr.fk, 1e-6) && near(a, cr.a, 1e-9) && cr.F > lim) || 'graphlong';
});

// ---------------------------------------------------------------- t02: non-conservative
const bx = { m: 15, muk: 0.2, a: 4, b: 3 };
bx.f = bx.muk * bx.m * g;
bx.per = 2 * (bx.a + bx.b);
bx.W = bx.f * bx.per;
add('nonc-long', long({
  stem: `(a) What is meant by a conservative force? Give one reason why friction is not conservative. [2] (b) A ${bx.m} kg box is dragged slowly once round a rectangular track of ${bx.a} m by ${bx.b} m on a rough horizontal floor, μk = ${bx.muk}, g = 9.8 m s⁻². Find the work done against friction in one round and the work done by gravity, and state what the results show. [3]`,
  model: r`(a) A conservative force does the same work between two points whatever the path, so the work around a closed path is zero. Friction always opposes the displacement, so the work it does is negative and grows with the path length: it depends on the path.

(b) The friction is $\mu_k mg = ${bx.muk} \times ${bx.m} \times 9.8 = ${f(bx.f, 4)}$ N and the path length is $2(${bx.a} + ${bx.b}) = ${bx.per}$ m, so the work done against friction is $${f(bx.f, 4)} \times ${bx.per} = ${f(bx.W, 4)}$ J. The work done by gravity is zero, since the height does not change. The box returns to its starting point yet friction has done work, so friction is non-conservative.`,
  sol: 'Work against friction is f times the whole path; gravity does zero.',
  scheme: [['Conservative: work independent of path, zero over a closed path', 1], ['Friction opposes the displacement: the work depends on the path length', 1], [`f = μk mg = ${f(bx.f, 4)} N, path ${bx.per} m`, 1], [`Work against friction = ${f(bx.W, 4)} J; work by gravity = 0`, 1], ['Non-zero work over a closed path: friction is non-conservative', 1]],
  d: 4, c: 'analysis', t: [2],
}), () => {
  let w = 0;
  const dx = 1e-3;
  const legs = [bx.a, bx.b, bx.a, bx.b];
  for (const L of legs) for (let x = 0; x < L; x += dx) w += bx.muk * bx.m * g * dx;
  return near(w, bx.W, 1e-3) || 'nonc';
});

// ---------------------------------------------------------------- t03: sliding down a rough incline
const sd = { m: 7, th: 28, mu: 0.25, s: 3 };
sd.a = g * (sn(sd.th) - sd.mu * cs(sd.th));
sd.t = Math.sqrt((2 * sd.s) / sd.a);
sd.v = Math.sqrt(2 * sd.a * sd.s);
add('down-long', long({
  stem: `(a) A block slides down a rough inclined plane of angle θ with coefficient of kinetic friction μk. Draw a labelled free-body diagram in words, and derive an expression for its acceleration. [3] (b) A ${sd.m} kg block is released from rest on a plank inclined at ${sd.th}° with μk = ${sd.mu}. Taking g = 9.8 m s⁻², find the time it takes to slide ${sd.s} m and its speed then. [2]`,
  model: r`(a) The forces on the block are its weight $mg$ acting vertically down, the normal reaction $N$ perpendicular to the plane, and kinetic friction $\mu_k N$ acting up the plane, opposite to the motion. There is no acceleration perpendicular to the plane, so $N = mg\cos\theta$. Along the plane, Newton’s second law gives $ma = mg\sin\theta - \mu_k mg\cos\theta$, hence $a = g(\sin\theta - \mu_k\cos\theta)$, which is independent of the mass.

(b) From the result of (a), $a = 9.8(\sin ${sd.th}^\circ - ${sd.mu}\cos ${sd.th}^\circ) = ${f(sd.a, 4)}$ m s$^{-2}$. Starting from rest, $s = \tfrac{1}{2}at^2$ gives the time for ${sd.s} m as $t = \sqrt{2 \times ${sd.s}/${f(sd.a, 4)}} = ${f(sd.t, 3)}$ s, and the speed at the end is $v = at = ${f(sd.v, 3)}$ m s$^{-1}$.`,
  sol: 'Forces and N; Newton’s second law along the plane; then kinematics.',
  scheme: [['Forces: mg down, N perpendicular to the plane, μk N up the plane; N = mg cos θ', 1], ['ma = mg sin θ − μk mg cos θ', 1], ['a = g(sin θ − μk cos θ)', 1], [`a = ${f(sd.a, 4)} m s⁻² and t = √(2s/a) = ${f(sd.t, 3)} s`, 1], [`v = at = ${f(sd.v, 3)} m s⁻¹`, 1]],
  d: 3, c: 'application', t: [3],
}), () => {
  const aNum = -slopeCartesian(sd.m, sd.th, sd.mu, 0, -1).a;
  const run = stepRun(aNum, sd.s);
  return (near(aNum, sd.a, 1e-9) && near(run.t, sd.t, 1e-3) && near(run.v, sd.v, 1e-3)) || 'downlong';
});

// ---------------------------------------------------------------- t03: pushing up a rough incline
const pu = { m: 30, th: 25, mu: 0.2, a: 0.4 };
Object.assign(pu, slope(pu.m, pu.th, pu.mu));
pu.Pa = pu.up + pu.m * pu.a;
add('up-long', long({
  stem: `(a) A block of mass m is pushed up a rough incline of angle θ by a force P along the incline. State the direction of friction, write the equations of motion along and perpendicular to the incline and obtain P for an acceleration a. [3] (b) A ${pu.m} kg trolley is pushed up a ramp of ${pu.th}° with μ = ${pu.mu}. Taking g = 9.8 m s⁻², find P for constant speed and for an acceleration of ${pu.a} m s⁻². [2]`,
  model: r`(a) The block moves up the incline, so friction $\mu N$ acts down the incline, against the motion. There is no acceleration perpendicular to the incline, so $N = mg\cos\theta$. Along the incline, Newton’s second law gives $P - mg\sin\theta - \mu mg\cos\theta = ma$, so $P = mg(\sin\theta + \mu\cos\theta) + ma$.

(b) The component of the weight along the ramp is $${f(pu.along, 4)}$ N and the friction is $\mu mg\cos\theta = ${f(pu.fric, 4)}$ N. For constant speed the push must equal their sum, $P = ${f(pu.along, 4)} + ${f(pu.fric, 4)} = ${f(pu.up, 4)}$ N. With an acceleration of ${pu.a} m s$^{-2}$ the push is larger by $ma$, so $P = ${f(pu.up, 4)} + ${pu.m} \times ${pu.a} = ${f(pu.Pa, 4)}$ N.`,
  sol: 'Friction down the incline; Newton’s second law along the incline.',
  scheme: [['Friction μN acts down the incline; N = mg cos θ', 1], ['P − mg sin θ − μ mg cos θ = ma', 1], ['P = mg(sin θ + μ cos θ) + ma', 1], [`Constant speed: P = ${f(pu.up, 4)} N`, 1], [`With acceleration: P = ${f(pu.Pa, 4)} N`, 1]],
  d: 3, c: 'application', t: [3],
}), () => {
  const P0 = root((x) => slopeCartesian(pu.m, pu.th, pu.mu, x, 1).a, 0, 1000);
  const Pa = root((x) => slopeCartesian(pu.m, pu.th, pu.mu, x, 1).a - pu.a, 0, 1000);
  return (near(P0, pu.up, 1e-6) && near(Pa, pu.Pa, 1e-6)) || 'uplong';
});

// ---------------------------------------------------------------- t03: the roller
const ro = { m: 60, mu: 0.25, phi: 35 };
ro.W = ro.m * g;
ro.pull = (ro.mu * ro.W) / (cs(ro.phi) + ro.mu * sn(ro.phi));
ro.push = (ro.mu * ro.W) / (cs(ro.phi) - ro.mu * sn(ro.phi));
add('roller-long', long({
  stem: `(a) A roller of weight W is moved at constant speed over level ground by a force F along a handle at an angle φ to the ground. Derive F for (i) pulling and (ii) pushing, if the coefficient of friction is μ, and explain which is easier. [3] (b) Find both forces for a ${ro.m} kg roller with μ = ${ro.mu} and φ = ${ro.phi}°, taking g = 9.8 m s⁻². [2]`,
  model: r`(a) (i) When pulling, the vertical part of the force lifts the roller, so $N = W - F\sin\varphi$; at constant speed $F\cos\varphi = \mu N$, which gives $F = \dfrac{\mu W}{\cos\varphi + \mu\sin\varphi}$. (ii) When pushing, the vertical part presses the roller down, so $N = W + F\sin\varphi$, which gives $F = \dfrac{\mu W}{\cos\varphi - \mu\sin\varphi}$. Pulling is easier, because it lowers the normal reaction and friction, while pushing raises them.

(b) The weight is $W = ${f(ro.W, 4)}$ N. For pulling, $F = \dfrac{${ro.mu} \times ${f(ro.W, 4)}}{${f(cs(ro.phi), 4)} + ${f(ro.mu * sn(ro.phi), 4)}} = ${f(ro.pull, 4)}$ N. For pushing, $F = \dfrac{${f(ro.mu * ro.W, 4)}}{${f(cs(ro.phi), 4)} - ${f(ro.mu * sn(ro.phi), 4)}} = ${f(ro.push, 4)}$ N, about ${f(ro.push / ro.pull, 3)} times as large.`,
  sol: 'Vertical balance gives N, horizontal balance gives F.',
  scheme: [['Pulling: N = W − F sin φ, F cos φ = μN, so F = μW/(cos φ + μ sin φ)', 1], ['Pushing: N = W + F sin φ, so F = μW/(cos φ − μ sin φ)', 1], ['Pulling is easier: normal reaction and friction are smaller', 1], [`Pull = ${f(ro.pull, 4)} N`, 1], [`Push = ${f(ro.push, 4)} N`, 1]],
  d: 5, c: 'application', t: [3],
}), () => (near(handleForce(ro.W, ro.mu, ro.phi, 1), ro.pull, 1e-6) && near(handleForce(ro.W, ro.mu, ro.phi, -1), ro.push, 1e-6) && ro.pull < ro.push) || 'rollerlong');

// ---------------------------------------------------------------- t04: angles of friction and repose
const rs = { slip: 32 };
rs.mus = Math.tan(rad(rs.slip));
add('repose-long', long({
  stem: `(a) Define the angle of friction and the angle of repose. [2] (b) Show that the tangent of the angle of repose is equal to the coefficient of static friction, and hence that the two angles are equal. [2] (c) A box begins to slide when the plank is tilted to ${rs.slip}°. Find the coefficient of static friction. [1]`,
  model: r`(a) The angle of friction is the angle between the normal reaction and the resultant of the normal reaction and the limiting friction. The angle of repose is the steepest slope of an inclined plane on which a body can remain at rest.

(b) At the angle of repose $\alpha$ friction is limiting: $mg\sin\alpha = \mu_s N$ and $N = mg\cos\alpha$, so $\tan\alpha = \mu_s$. For the angle of friction $\lambda$, $\tan\lambda = f_{\max}/N = \mu_s$. Both have tangent $\mu_s$, so $\alpha = \lambda$.

(c) $\mu_s = \tan\alpha = \tan ${rs.slip}^\circ = ${f(rs.mus, 3)}$.`,
  sol: 'Definitions; limiting-friction balance on the plane; tan of the angle.',
  scheme: [['Angle of friction defined: between N and the resultant of N and limiting friction', 1], ['Angle of repose defined: the steepest slope at which the body stays at rest', 1], ['mg sin α = μs N and N = mg cos α, so tan α = μs', 1], ['tan λ = f(max)/N = μs, so α = λ', 1], [`μs = tan ${rs.slip}° = ${f(rs.mus, 3)}`, 1]],
  d: 3, c: 'understanding', t: [4],
}), () => near(root((x) => slopeCartesian(1, x, rs.mus, 0, -1).a, 1, 80), rs.slip, 1e-6) || 'reposelong');

// ---------------------------------------------------------------- t04: reducing friction
const bb = { load: 800, mu1: 0.3, mu2: 0.006 };
bb.f1 = bb.mu1 * bb.load;
bb.f2 = bb.mu2 * bb.load;
bb.ratio = bb.f1 / bb.f2;
add('reduce-long', long({
  stem: `(a) Explain how (i) lubrication, (ii) ball bearings and (iii) streamlining reduce friction. [3] (b) A shaft carries a load of ${bb.load} N. In a plain bearing the effective coefficient of friction is ${bb.mu1}; with a ball bearing it is ${bb.mu2}. Find the friction in each case and how many times smaller it becomes. [2]`,
  model: r`(a) (i) Lubrication puts an oil or grease film between the surfaces, so layers of liquid slide over each other instead of solid on solid. (ii) In a ball bearing the balls roll between the rings, so rolling friction replaces sliding friction and is much smaller. (iii) Streamlining gives a smooth tapering shape, so air or water flows past easily and the drag falls.

(b) Plain bearing: $f = \mu N = ${bb.mu1} \times ${bb.load} = ${f(bb.f1, 4)}$ N. Ball bearing: $f = ${bb.mu2} \times ${bb.load} = ${f(bb.f2, 3)}$ N. The friction becomes $${f(bb.f1, 4)}/${f(bb.f2, 3)} = ${f(bb.ratio, 3)}$ times smaller.`,
  sol: 'Fluid film, rolling contact, smooth flow; then f = μN.',
  scheme: [['Lubrication: a liquid film separates the surfaces, giving liquid friction', 1], ['Ball bearings: rolling replaces sliding; streamlining: smooth shape lowers the fluid drag', 2], [`Plain bearing f = ${f(bb.f1, 4)} N; ball bearing f = ${f(bb.f2, 3)} N`, 1], [`Reduction by a factor of ${f(bb.ratio, 3)}`, 1]],
  d: 3, c: 'application', t: [4],
}), () => {
  const F1 = root((x) => slopeCartesian(bb.load / g, 0, bb.mu1, x, 1).a, 0, 1000);
  const F2 = root((x) => slopeCartesian(bb.load / g, 0, bb.mu2, x, 1).a, 0, 1000);
  return (near(F1, bb.f1, 1e-6) && near(F2, bb.f2, 1e-6) && near(F1 / F2, bb.ratio, 1e-6)) || 'reducelong';
});
void handleForce;
