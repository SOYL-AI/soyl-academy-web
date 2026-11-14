// ISC 11 ch08 question bank, part 3: long answers (5 marks), set in parts with the marks shown.
import { mk, add, r, dec, near } from '../../isc-11-physics-ch01/src/lib.mjs';
import { g, rad, trapz, piecewise, stopDist, pendulumSpeed, springSpeedAt } from './phys.mjs';

const { long } = mk;
const f = (x, n = 3) => dec(x, n);

// ---------------------------------------------------------------- t02: work-energy theorem and the stopping distance
const bus = { m: 8000, v: 15, s: 50, v2: 10 };
bus.K = 0.5 * bus.m * bus.v ** 2;
bus.F = bus.K / bus.s;
bus.s2 = (0.5 * bus.m * bus.v2 ** 2) / bus.F;
add('wet-long', long({
  stem: `(a) Derive the work–energy theorem for a body acted on by a constant net force along a straight line. [3] (b) A bus of mass ${bus.m} kg moving at ${bus.v} m s⁻¹ is brought to rest in ${bus.s} m by a constant braking force. Find the force, and the distance in which the same force would stop the bus from ${bus.v2} m s⁻¹. [2]`,
  model: r`(a) Let a constant net force $F$ change the speed of a body of mass $m$ from $u$ to $v$ over a displacement $S$. Then $F = ma$, and the equation of motion gives $v^2 - u^2 = 2aS$. The work done is $W = FS = maS = \tfrac12 mv^2 - \tfrac12 mu^2$, so the net work done equals the change in kinetic energy.

(b) The brakes remove the kinetic energy $\tfrac12 mv^2 = \tfrac12 \times ${bus.m} \times ${bus.v}^2 = ${f(bus.K, 6)}$ J over ${bus.s} m, so $F = ${f(bus.K, 6)} / ${bus.s} = ${f(bus.F, 5)}$ N. At ${bus.v2} m s$^{-1}$ the kinetic energy is $${f(0.5 * bus.m * bus.v2 ** 2, 6)}$ J, so $s = ${f(0.5 * bus.m * bus.v2 ** 2, 6)} / ${f(bus.F, 5)} = ${f(bus.s2, 3)}$ m.`,
  sol: 'Derivation from F = ma and v² − u² = 2aS, then Fs = ½mv².',
  scheme: [['F = ma and v² − u² = 2aS', 1], ['W = FS = maS = ½m(v² − u²)', 1], ['Net work = change in kinetic energy', 1], [`F = K/s = ${f(bus.F, 5)} N`, 1], [`Distance at ${bus.v2} m s⁻¹ = ${f(bus.s2, 3)} m`, 1]],
  d: 3, c: 'application', t: [2],
}), () => near(stopDist(bus.m, bus.v, bus.F), bus.s, 2e-3) && near(stopDist(bus.m, bus.v2, bus.F), bus.s2, 2e-3) || 'wetlong');

// ---------------------------------------------------------------- t03: spring energy
const sk = { k: 400, x1: 0.05, x2: 0.08 };
sk.F1 = sk.k * sk.x1;
sk.U1 = 0.5 * sk.k * sk.x1 ** 2;
sk.U2 = 0.5 * sk.k * sk.x2 ** 2;
sk.W = sk.U2 - sk.U1;
add('spring-long', long({
  stem: `(a) Show, using the area under the force–extension graph, that the work done in stretching a spring of force constant k through an extension x is ½kx², and confirm the result by integration. [3] (b) A spring has k = ${sk.k} N m⁻¹. Find the force needed to hold it stretched by ${sk.x1 * 100} cm, and the extra work done in stretching it from ${sk.x1 * 100} cm to ${sk.x2 * 100} cm. [2]`,
  model: r`(a) The applied force grows steadily from $0$ to $kx$, so the graph of force against extension is a straight line through the origin. The work done equals the area under it, a triangle of base $x$ and height $kx$, which is $\tfrac12 \times x \times kx = \tfrac12 kx^2$. By integration, $W = \int_0^x kx'\,dx' = \tfrac12 kx^2$, and this is stored as potential energy.

(b) The force at ${sk.x1 * 100} cm is $F = kx = ${sk.k} \times ${sk.x1} = ${f(sk.F1, 3)}$ N. The stored energies are $U_1 = \tfrac12 \times ${sk.k} \times ${sk.x1}^2 = ${f(sk.U1, 3)}$ J and $U_2 = \tfrac12 \times ${sk.k} \times ${sk.x2}^2 = ${f(sk.U2, 3)}$ J, so the extra work is $${f(sk.U2, 3)} - ${f(sk.U1, 3)} = ${f(sk.W, 3)}$ J.`,
  sol: 'Area of the triangle and the integral of kx; then the difference of U.',
  scheme: [['Force rises from 0 to kx linearly; work = area of the triangle', 1], ['Area = ½ × x × kx = ½kx²', 1], ['Integral of kx′ from 0 to x = ½kx²; stored as potential energy', 1], [`F = kx = ${f(sk.F1, 3)} N`, 1], [`Extra work = U₂ − U₁ = ${f(sk.W, 3)} J`, 1]],
  d: 3, c: 'application', t: [3],
}), () => near(sk.k * sk.x1, sk.F1, 1e-12) && near(trapz((x) => sk.k * x, sk.x1, sk.x2), sk.W, 1e-9) && near(trapz((x) => sk.k * x, 0, sk.x1), sk.U1, 1e-9) || 'springlong');

// ---------------------------------------------------------------- t03: conservative and non-conservative forces with numbers
const cn = { m: 15, h: 4.0, ramp: 10, f: 30, straight: 10, legs: [6, 8] };
cn.Wg = -cn.m * g * cn.h;
cn.Wf1 = -cn.f * cn.straight;
cn.Wf2 = -cn.f * (cn.legs[0] + cn.legs[1]);
add('cons-long', long({
  stem: `(a) Distinguish between a conservative and a non-conservative force, giving one example of each. [2] (b) A ${cn.m} kg block is raised through ${f(cn.h, 2)} m, first vertically and then along a smooth ramp ${cn.ramp} m long. Find the work done by gravity on each route (g = 9.8 m s⁻²). [1] (c) A box is dragged from P to Q against a constant friction force of ${cn.f} N, first straight (${cn.straight} m) and then along two perpendicular sides of lengths ${cn.legs[0]} m and ${cn.legs[1]} m. Find the work done by friction on each route and say what the results show. [2]`,
  model: r`(a) The work done by a conservative force between two points is independent of the path, so it is zero round a closed path, and a potential energy can be defined; gravity and the spring force are examples. The work of a non-conservative force depends on the path and no potential energy exists; friction and air drag are examples.

(b) Gravity does $-mgh = -${cn.m} \times 9.8 \times ${f(cn.h, 2)} = -${f(-cn.Wg, 4)}$ J on the vertical route, and the same $-${f(-cn.Wg, 4)}$ J up the ramp.

(c) Friction does $-${cn.f} \times ${cn.straight} = -${f(-cn.Wf1, 3)}$ J on the straight route and $-${cn.f} \times ${cn.legs[0] + cn.legs[1]} = -${f(-cn.Wf2, 3)}$ J on the other route. The work depends on the path, which shows that friction is non-conservative.`,
  sol: 'Path independence for gravity; friction work equals force times path length.',
  scheme: [['Conservative: work independent of the path, zero on a closed path; example gravity or spring', 1], ['Non-conservative: work depends on the path; example friction or drag', 1], [`Gravity: −mgh = −${f(-cn.Wg, 4)} J on both routes`, 1], [`Friction: −${f(-cn.Wf1, 3)} J straight and −${f(-cn.Wf2, 3)} J round the corner`, 1], ['Different values: friction is non-conservative', 1]],
  d: 3, c: 'application', t: [3],
}), () => {
  const along = cn.m * g * (cn.h / cn.ramp);
  const legsOk = near(Math.hypot(cn.legs[0], cn.legs[1]), cn.straight, 1e-12);
  return (near(-along * cn.ramp, cn.Wg, 1e-12) && near(-trapz(() => cn.f, 0, cn.legs[0] + cn.legs[1], 2000), cn.Wf2, 1e-9) && legsOk && cn.Wf1 !== cn.Wf2) || 'conslong';
});

// ---------------------------------------------------------------- t04: the pendulum
const pl = { L: 1.5, m: 0.5, th0: 40, th1: 20 };
pl.h0 = pl.L * (1 - Math.cos(rad(pl.th0)));
pl.h1 = pl.L * (1 - Math.cos(rad(pl.th1)));
pl.E = pl.m * g * pl.h0;
pl.vLow = Math.sqrt(2 * g * pl.h0);
pl.v1 = Math.sqrt(2 * g * (pl.h0 - pl.h1));
add('mech-long', long({
  stem: `(a) A simple pendulum bob is released from rest at one end of its swing. Describe the energy changes during half a swing, and explain why the tension in the string does no work. [2] (b) A bob of mass ${pl.m} kg on a string ${pl.L} m long is released from rest with the string at ${pl.th0}° to the vertical. Find its total mechanical energy relative to the lowest point, its speed at the lowest point, and its speed when the string is at ${pl.th1}° to the vertical on the way down (g = 9.8 m s⁻²). [3]`,
  model: r`(a) At the release point the bob is at rest and its energy is all potential. As it swings down the potential energy decreases and the kinetic energy increases by the same amount, reaching the greatest kinetic energy at the lowest point. The tension is always perpendicular to the velocity of the bob, so it does no work and only gravity changes the energy.

(b) At release $h_0 = ${pl.L}(1 - \cos ${pl.th0}^\circ) = ${f(pl.h0, 4)}$ m, so $E = mgh_0 = ${pl.m} \times 9.8 \times ${f(pl.h0, 4)} = ${f(pl.E, 4)}$ J. At the lowest point $v = \sqrt{2gh_0} = ${f(pl.vLow, 4)}$ m s$^{-1}$. At ${pl.th1}° the height is $h_1 = ${f(pl.h1, 4)}$ m, so $v = \sqrt{2g(h_0 - h_1)} = ${f(pl.v1, 4)}$ m s$^{-1}$.`,
  sol: 'Energy conserved; speed from the drop in height.',
  scheme: [['Potential energy changes into kinetic energy; K greatest at the lowest point, total constant', 1], ['Tension perpendicular to the velocity, so zero work', 1], [`h₀ = ${f(pl.h0, 4)} m, E = mgh₀ = ${f(pl.E, 4)} J`, 1], [`Lowest point: v = ${f(pl.vLow, 4)} m s⁻¹`, 1], [`At ${pl.th1}°: v = ${f(pl.v1, 4)} m s⁻¹`, 1]],
  d: 4, c: 'application', t: [4],
}), () => near(pendulumSpeed(pl.L, pl.th0), pl.vLow, 2e-3) && near(pendulumSpeed(pl.L, pl.th0, pl.th1), pl.v1, 2e-3) && near(0.5 * pl.m * pl.vLow ** 2, pl.E, 1e-9) || 'mechlong');

// ---------------------------------------------------------------- t04: the oscillating spring
const oc = { m: 0.25, k: 100, A: 0.10, x: 0.06 };
oc.E = 0.5 * oc.k * oc.A ** 2;
oc.vmax = Math.sqrt((2 * oc.E) / oc.m);
oc.U = 0.5 * oc.k * oc.x ** 2;
oc.K = oc.E - oc.U;
oc.v = Math.sqrt((2 * oc.K) / oc.m);
add('osc-long', long({
  stem: `A block of mass m on a smooth horizontal surface is attached to a spring of force constant k and oscillates with amplitude A. (a) Show that its total energy is ½kA² at every displacement x. [2] (b) Describe the graphs of the potential, kinetic and total energies against x. [1] (c) For m = ${oc.m} kg, k = ${oc.k} N m⁻¹ and A = ${oc.A} m, find the total energy and the maximum speed, and the speed at x = ${oc.x} m. [2]`,
  model: r`(a) The block is released from rest at $x = A$, where the energy is all potential, $\tfrac12 kA^2$. The work done by the spring from $A$ to $x$ is $\tfrac12 k(A^2 - x^2)$, which by the work–energy theorem equals the kinetic energy $\tfrac12 mv^2$. Hence $\tfrac12 mv^2 + \tfrac12 kx^2 = \tfrac12 kA^2$ at every $x$.

(b) $U = \tfrac12 kx^2$ is an upward parabola, $K = \tfrac12 k(A^2 - x^2)$ is an inverted parabola and the total energy $E$ is a horizontal line; $U$ and $K$ cross at $E/2$.

(c) $E = \tfrac12 \times ${oc.k} \times ${oc.A}^2 = ${f(oc.E, 3)}$ J. At $x = 0$ all of it is kinetic, so $v_{\max} = \sqrt{2E/m} = ${f(oc.vmax, 3)}$ m s$^{-1}$. At $x = ${oc.x}$ m, $U = ${f(oc.U, 3)}$ J, $K = ${f(oc.K, 3)}$ J and $v = \sqrt{2K/m} = ${f(oc.v, 3)}$ m s$^{-1}$.`,
  sol: 'Work of the spring from A to x gives K; add U.',
  scheme: [['Work by the spring from A to x is ½k(A² − x²) = ½mv²', 1], ['So ½mv² + ½kx² = ½kA², constant', 1], ['U parabola, K inverted parabola, E horizontal line', 1], [`E = ${f(oc.E, 3)} J and v(max) = ${f(oc.vmax, 3)} m s⁻¹`, 1], [`At x = ${oc.x} m: v = ${f(oc.v, 3)} m s⁻¹`, 1]],
  d: 5, c: 'application', t: [4],
}), () => near(springSpeedAt(oc.m, oc.k, oc.A, 0), oc.vmax, 3e-3) && near(springSpeedAt(oc.m, oc.k, oc.A, oc.x), oc.v, 3e-3) && near(oc.U + oc.K, oc.E, 1e-12) || 'osclong');

// ---------------------------------------------------------------- t05: power
const cp = { m: 1200, v: 20, res: 500, slope: 1 / 20 };
cp.slopeF = cp.m * g * cp.slope;
cp.F = cp.res + cp.slopeF;
cp.P = cp.F * cp.v;
add('power-long', long({
  stem: `(a) A constant force F acts on a body along its direction of motion with velocity v. Derive the expression for the power delivered by the force. [2] (b) A car of mass ${cp.m} kg climbs a straight road that rises 1 m for every 20 m travelled along it (so sin θ = 1/20), at a steady ${cp.v} m s⁻¹. The resistance to motion (friction and air) is ${cp.res} N. Taking g = 9.8 m s⁻², find the driving force and the power of the engine. [3]`,
  model: r`(a) In a small time $dt$ the body moves $dS$ along the force, so the work done is $dW = F\,dS$. The power is $P = \dfrac{dW}{dt} = F\dfrac{dS}{dt} = Fv$.

(b) At a steady speed the driving force balances the resistance plus the component of the weight down the slope. The component of the weight along the slope is $mg\sin\theta = ${cp.m} \times 9.8 \times \tfrac{1}{20} = ${f(cp.slopeF, 4)}$ N. The driving force is $F = ${cp.res} + ${f(cp.slopeF, 4)} = ${f(cp.F, 4)}$ N, and the power is $P = Fv = ${f(cp.F, 4)} \times ${cp.v} = ${f(cp.P, 5)}$ W, or ${f(cp.P / 1000, 3)} kW.`,
  sol: 'Divide dW = F dS by dt; at steady speed the forces balance.',
  scheme: [['dW = F dS in a small time dt', 1], ['P = dW/dt = F dS/dt = Fv', 1], [`Weight component along the slope = ${f(cp.slopeF, 4)} N`, 1], [`Driving force = ${f(cp.F, 4)} N`, 1], [`P = Fv = ${f(cp.P, 5)} W`, 1]],
  d: 4, c: 'application', t: [5],
}), () => {
  // work done by the engine in 10 s of steady motion, found by summing the force over the distance travelled
  const dist = cp.v * 10;
  const work = trapz(() => cp.res + cp.m * g * Math.sin(Math.asin(cp.slope)), 0, dist, 2000);
  return near(work / 10, cp.P, 1e-9) || 'powerlong';
});

// ---------------------------------------------------------------- t01 + t02: variable force and kinetic energy
const gl = { m: 4.0, F0: 8.0, s1: 3.0, s2: 7.0 };
gl.areas = [gl.F0 * gl.s1, 0.5 * (gl.s2 - gl.s1) * gl.F0];
gl.W = gl.areas[0] + gl.areas[1];
gl.v = Math.sqrt((2 * gl.W) / gl.m);
add('graph-long', long({
  stem: `A ${f(gl.m, 2)} kg block, initially at rest on a smooth horizontal surface, is pushed along a straight line by a force F that is ${f(gl.F0, 2)} N from S = 0 to S = ${f(gl.s1, 2)} m and then falls uniformly to zero at S = ${f(gl.s2, 2)} m. (a) Sketch the force–displacement graph in words and find the work done by the force over the ${f(gl.s2, 2)} m. [3] (b) Use the work–energy theorem to find the speed of the block at S = ${f(gl.s2, 2)} m. [2]`,
  model: r`(a) The graph is a horizontal line at ${f(gl.F0, 2)} N up to ${f(gl.s1, 2)} m, followed by a straight line falling to zero at ${f(gl.s2, 2)} m. The work is the area under it. The rectangle has area $${f(gl.F0, 2)} \times ${f(gl.s1, 2)} = ${f(gl.areas[0], 3)}$ J and the triangle has area $\tfrac12 \times ${f(gl.s2 - gl.s1, 2)} \times ${f(gl.F0, 2)} = ${f(gl.areas[1], 3)}$ J, so the total work is $${f(gl.W, 3)}$ J.

(b) The surface is smooth, so this is the net work, and by the work–energy theorem it equals the gain in kinetic energy from rest: $\tfrac12 mv^2 = ${f(gl.W, 3)}$ J. Hence $v = \sqrt{2 \times ${f(gl.W, 3)} / ${f(gl.m, 2)}} = ${f(gl.v, 4)}$ m s$^{-1}$.`,
  sol: 'Rectangle plus triangle; then the theorem from rest.',
  scheme: [['Graph: constant force, then a straight fall to zero', 1], [`Rectangle ${f(gl.areas[0], 3)} J and triangle ${f(gl.areas[1], 3)} J`, 1], [`Total work = ${f(gl.W, 3)} J`, 1], ['Net work = gain in kinetic energy from rest', 1], [`v = √(2W/m) = ${f(gl.v, 4)} m s⁻¹`, 1]],
  d: 3, c: 'application', t: [1, 2],
}), () => {
  const F = piecewise([[0, gl.F0], [gl.s1, gl.F0], [gl.s2, 0]]);
  let x = 0;
  let v = 0;
  const dt = 1e-5;
  while (x < gl.s2) {
    v += (F(x) / gl.m) * dt;
    x += v * dt;
  }
  return (near(trapz(F, 0, gl.s2, 70000), gl.W, 1e-9) && near(v, gl.v, 3e-3)) || 'graphlong';
});
