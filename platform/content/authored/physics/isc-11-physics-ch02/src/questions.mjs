// ISC 11 ch02 question bank, part 1: objective items (1 mark), AR items and numericals.
// Every numerical is computed here and re-solved by an independent `check`; solutions and schemes print the computed values.
// AR keys across the chapter: a (dispzero), b (instspeed), c (dsin), d (avar), a (ironwood), c (riseequal).
import { mk, add, r, dec, near } from '../../isc-11-physics-ch01/src/lib.mjs';
import { g, deriv, integ, root } from './phys.mjs';

const { mcq, ar, tf, fill, num } = mk;
const R6 = (x) => Math.round(x * 1e6) / 1e6;
const mn = (x) => String(x).replace('-', '−'); // proper minus sign in printed plain text

// ================================================================ t01 frame, distance, displacement, speed, velocity
const og = { stall: -180, cy: 420 };
og.new = og.cy - og.stall;
add('origin-mcq', mcq({
  stem: `On a straight canal road a tea stall is at x = −180 m and a cyclist is at x = +420 m, measured from a bridge taken as origin. The origin is now moved to the tea stall without changing the positive direction. The cyclist's new position and his distance from the stall are`,
  right: `+${og.new} m and ${og.new} m`,
  wrong: [`+${og.cy + og.stall} m and ${og.cy + og.stall} m`, `+${og.cy} m and ${og.new} m`, `−${og.new} m and ${og.new} m`],
  scheme: [[`New position = 420 − (−180) = +${og.new} m; the separation is unchanged (@K)`, 1]],
  sol: `New position = old position − position of the new origin = 420 − (−180) = ${og.new} m. The separation of two bodies does not depend on where the origin is placed.`,
  d: 2, c: 'application', t: [1],
}), (q) => og.new === 600 && og.new === Math.abs(og.cy - og.stall) || 'og');
add('rest-mcq', mcq({
  stem: 'A tiffin box rests on the seat beside a student in a bus moving steadily along a highway. A boy on the roadside says the box is moving; the student says it is at rest. Which statement is correct?',
  right: 'Both are right, because rest and motion are decided relative to the chosen frame of reference',
  wrong: ['Only the boy is right, because the road is fixed to the earth and rest is absolute', 'Only the student is right, because the box never changes its place on the seat', 'Neither is right, because a body that is not pushed cannot be moving'],
  sol: 'In the frame of the bus the box keeps its position, so it is at rest; in the frame of the road its position changes, so it is moving. Rest and motion are relative.',
  d: 1, c: 'understanding', t: [1],
}));
add('pointmass-mcq', mcq({
  stem: 'In which of the following can the body be treated as a point mass?',
  right: 'A train travelling from Delhi to Mumbai, when its average speed for the whole journey is wanted',
  wrong: ['A train crossing a 200 m long platform, when the time taken to cross is wanted', 'A cricket ball spinning in the air, when the rate of its spin is wanted', 'A bus being reversed into a 12 m gap, when the driver judges whether it fits'],
  sol: 'A body can be treated as a point when its size is negligible compared with the distances involved. A train length of a few hundred metres is negligible against more than a thousand kilometres; in the other cases the size of the body matters.',
  d: 2, c: 'understanding', t: [1],
}));
const lap = { C: 400, laps: 1.5 };
lap.dist = lap.C * lap.laps;
lap.diam = lap.C / Math.PI;
add('circ-mcq', mcq({
  stem: 'An athlete starts at A on a circular track of circumference 400 m and runs 1.5 laps. The magnitude of her displacement from A is about',
  right: `${dec(lap.diam, 3)} m`,
  wrong: [`${lap.dist} m`, '200 m', `${dec(lap.diam / 2, 3)} m`],
  scheme: [[`After 1.5 laps she is diametrically opposite A: displacement = 2r = ${dec(lap.diam, 3)} m (@K)`, 1]],
  sol: `Circumference 2πr = 400 m gives r = ${dec(lap.C / (2 * Math.PI), 3)} m. Half a lap more than a full lap leaves her at the opposite end of a diameter, so |displacement| = 2r = ${dec(lap.diam, 3)} m; the distance run is ${lap.dist} m.`,
  d: 3, c: 'application', t: [1],
}), (q) => near(2 * (lap.C / (2 * Math.PI)), Number(dec(lap.diam, 3)), 0.005) || 'circ');
const at = { v1: 12, v2: 18 };
at.avg = (at.v1 + at.v2) / 2;
at.harm = (2 * at.v1 * at.v2) / (at.v1 + at.v2);
add('avgtime-mcq', mcq({
  stem: 'A cyclist rides for the first half of the total time at 12 km h⁻¹ and for the second half at 18 km h⁻¹. His average speed for the whole ride is',
  right: `${at.avg} km h⁻¹`,
  wrong: [`${dec(at.harm, 3)} km h⁻¹`, '16 km h⁻¹', '30 km h⁻¹'],
  scheme: [[`Equal times: average speed = (12 + 18)/2 = ${at.avg} km h⁻¹ (@K)`, 1]],
  sol: `Let the total time be T. Distance = 12(T/2) + 18(T/2) = 15T, so the average speed is ${at.avg} km h⁻¹. The value ${dec(at.harm, 3)} km h⁻¹ would be right if the two halves were equal in distance.`,
  d: 3, c: 'application', t: [1],
}), () => near((12 * 5 + 18 * 5) / 10, at.avg, 1e-9) || 'avgtime');
add('tangent-mcq', mcq({
  stem: 'On an x–t curve a chord joins a point P to a second point Q. As Q is moved closer and closer to P, the slope of the chord tends to',
  right: 'the instantaneous velocity at P',
  wrong: ['the average velocity over the whole motion', 'the instantaneous acceleration at P', 'the distance between P and Q'],
  sol: 'Slope of the chord = Δx/Δt, the average velocity over the shrinking interval. In the limit Δt → 0 this becomes dx/dt, the slope of the tangent at P: the instantaneous velocity.',
  d: 2, c: 'understanding', t: [1],
}));

// ================================================================ t02 elementary calculus
const dq = { a: 3, b: -2, c: 5, t: 1 };
dq.x = (t) => dq.a * t ** 4 + dq.b * t ** 2 + dq.c;
dq.v = 12 * dq.t ** 3 - 4 * dq.t;
add('deriv-mcq', mcq({
  stem: 'A particle moves along a line with x = 3t⁴ − 2t² + 5 (x in m, t in s). Its velocity at t = 1 s is',
  right: `${dq.v} m s⁻¹`,
  wrong: [`${dq.x(1)} m s⁻¹`, '10 m s⁻¹', '16 m s⁻¹'],
  scheme: [[`v = dx/dt = 12t³ − 4t = ${dq.v} m s⁻¹ at t = 1 s (@K)`, 1]],
  sol: `Differentiate term by term: v = 12t³ − 4t, so v(1) = 12 − 4 = ${dq.v} m s⁻¹. The value ${dq.x(1)} is x(1), not the velocity.`,
  d: 2, c: 'application', t: [2],
}), (q) => near(deriv(dq.x, 1), dq.v, 1e-6) || 'deriv');
add('sincos-mcq', mcq({
  stem: 'The position of a particle is x = 4 cos t (x in m; t in s, with the angle in radian). Its velocity at t = π/2 s is',
  right: '−4 m s⁻¹',
  wrong: ['+4 m s⁻¹', '0', '−2 m s⁻¹'],
  scheme: [['v = dx/dt = −4 sin t; at t = π/2, v = −4 m s⁻¹ (@K)', 1]],
  sol: 'd(cos t)/dt = −sin t, so v = −4 sin t and v(π/2) = −4 × 1 = −4 m s⁻¹. The value 0 is x(π/2) = 4 cos(π/2), not the velocity.',
  d: 2, c: 'application', t: [2],
}), () => near(deriv((t) => 4 * Math.cos(t), Math.PI / 2), -4, 1e-6) || 'sincos');
add('expln-mcq', mcq({
  stem: 'The position of a particle moving on a line is x = 3e^t + 2 ln t (t > 0). Its velocity is',
  right: r`$3e^t + \dfrac{2}{t}$`,
  wrong: [r`$3e^t + 2\ln t$`, r`$3e^t + 2t$`, r`$3e^t - \dfrac{2}{t}$`],
  sol: r`$\dfrac{d}{dt}(e^t) = e^t$ and $\dfrac{d}{dt}(\ln t) = \dfrac{1}{t}$, so $v = 3e^t + \dfrac{2}{t}$.`,
  scheme: [['v = 3e^t + 2/t (@K)', 1]],
  d: 3, c: 'application', t: [2],
}), () => near(deriv((t) => 3 * Math.exp(t) + 2 * Math.log(t), 1.5), 3 * Math.exp(1.5) + 2 / 1.5, 1e-6) || 'expln');
add('integ-mcq', mcq({
  stem: 'The velocity of a particle is v = 6t² (SI units). Its displacement between t = 0 and t = 2 s is',
  right: '16 m',
  wrong: ['24 m', '8 m', '12 m'],
  scheme: [['Displacement = [2t³] from 0 to 2 = 16 m (@K)', 1]],
  sol: 'Displacement = ∫₀² 6t² dt = [2t³]₀² = 2(8) − 0 = 16 m. The value 24 m is v(2), not an integral.',
  d: 2, c: 'application', t: [2],
}), () => near(integ((t) => 6 * t * t, 0, 2), 16, 1e-6) || 'integ');
add('indef-mcq', mcq({
  stem: 'Integrating an acceleration a = 6t gives v = 3t² + C. In a problem the constant C may be taken as zero only if',
  right: 'the velocity is zero at t = 0',
  wrong: ['the position is zero at t = 0', 'the body is at rest at t = 1 s', 'the displacement over the whole motion is zero'],
  sol: 'C is fixed by a known starting value: v(0) = C. So C = 0 exactly when the body starts from rest at t = 0.',
  d: 2, c: 'understanding', t: [2],
}));
add('cons-fill', fill({
  stem: 'When a velocity v(t) is integrated without limits to find the position, the arbitrary constant that must be added is called the constant of ___.',
  acc: [['integration']],
  sol: 'It is the **constant of integration**; a known starting position fixes its value.',
  d: 1, c: 'recall', t: [2],
}));
add('dsin-ar', ar({
  a: 'For a particle with x = 5 sin t (x in m; t in s with the angle in radian) the velocity at t = 0 is 5 m s⁻¹.',
  r: 'The derivative of cos t with respect to t is +sin t.',
  key: 'c',
  sol: 'A is true: v = 5 cos t and cos 0 = 1. R is false: d(cos t)/dt = −sin t. So A is true and R is false.',
  d: 3, c: 'application', t: [2],
}), () => near(deriv((t) => 5 * Math.sin(t), 0), 5, 1e-6) || 'dsin');
const iq = { c1: 4, c2: 6, t1: 1, t2: 2 };
iq.F = (t) => t ** 4 + 3 * t ** 2;
iq.disp = iq.F(iq.t2) - iq.F(iq.t1);
add('integ-num', num({
  stem: 'The velocity of a particle is v = 4t³ + 6t (v in m s⁻¹, t in s). Find its displacement from t = 1 s to t = 2 s, in m.',
  value: iq.disp, tol: 0.05, unit: 'm',
  sol: r`$\Delta x = \int_1^2 (4t^3 + 6t)\,dt = \left[t^4 + 3t^2\right]_1^2 = (16 + 12) - (1 + 3) = ${iq.disp}$ m.`,
  scheme: [[`Δx = [t⁴ + 3t²] from 1 to 2 = 28 − 4 = ${iq.disp} m`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => near(integ((t) => 4 * t ** 3 + 6 * t, 1, 2), q.answer.value, 1e-6) || 'integ-num');

// numericals t1, t2
const tl = { d1: 90, v1: 45, d2: 60, v2: 30 };
tl.T = tl.d1 / tl.v1 + tl.d2 / tl.v2;
tl.avg = (tl.d1 + tl.d2) / tl.T;
add('twoleg-num', num({
  stem: 'A passenger train covers the first 90 km of a run at 45 km h⁻¹ and the next 60 km at 30 km h⁻¹. Find its average speed for the whole 150 km, in km h⁻¹.',
  value: tl.avg, tol: 0.1, unit: 'km h⁻¹', marks: 2,
  sol: r`Total time $= \dfrac{90}{45} + \dfrac{60}{30} = ${tl.T}$ h; average speed $= \dfrac{150}{${tl.T}} = ${tl.avg}$ km h$^{-1}$.`,
  scheme: [['Total time = 90/45 + 60/30 = 2 + 2 = 4 h', 1], [`Average speed = 150/4 = ${tl.avg} km h⁻¹`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => near(150 / (90 / 45 + 60 / 30), q.answer.value, 1e-9) && tl.avg === 37.5 || 'twoleg');
const rs = { a: 1, b: -9, c: 15, d: 4 };
rs.x = (t) => rs.a * t ** 3 + rs.b * t ** 2 + rs.c * t + rs.d;
rs.v = (t) => 3 * rs.a * t ** 2 + 2 * rs.b * t + rs.c;
rs.t1 = R6(root(rs.v, 0, 3));
rs.t2 = R6(root(rs.v, 3, 8));
rs.acc = 6 * rs.a * rs.t1 + 2 * rs.b;
add('rest-num', num({
  stem: 'The position of a particle is x = t³ − 9t² + 15t + 4 (x in m, t in s). Find its acceleration, in m s⁻², at the first instant at which it is momentarily at rest.',
  value: rs.acc, tol: 0.05, unit: 'm s⁻²', marks: 3,
  sol: r`$v = \dfrac{dx}{dt} = 3t^2 - 18t + 15 = 3(t-1)(t-5)$, so $v = 0$ at $t = ${rs.t1}$ s and $t = ${rs.t2}$ s. $a = \dfrac{dv}{dt} = 6t - 18$, so $a(${rs.t1}) = ${rs.acc}$ m s$^{-2}$.`,
  scheme: [['v = dx/dt = 3t² − 18t + 15', 1], [`v = 0 at t = ${rs.t1} s (first instant; the other is ${rs.t2} s)`, 1], [`a = 6t − 18 = ${mn(rs.acc)} m s⁻²`, 1]],
  d: 3, c: 'application', t: [2],
}), (q) => near(deriv(rs.v, rs.t1, 1e-5), q.answer.value, 1e-5) && Math.abs(deriv(rs.x, rs.t1)) < 1e-6 && rs.t1 === 1 && rs.t2 === 5 || 'rest-num');
const dn = { A: 3, B: -2, t2: 4 };
dn.F = (t) => t ** 3 - t ** 2;
dn.disp = dn.F(dn.t2) - dn.F(0);
add('defint-num', num({
  stem: 'The velocity of a trolley on a straight track is v = 3t² − 2t (v in m s⁻¹, t in s). Find its displacement in the first 4 s, in m.',
  value: dn.disp, tol: 0.05, unit: 'm', marks: 2,
  sol: r`$\Delta x = \int_0^4 (3t^2 - 2t)\,dt = \left[t^3 - t^2\right]_0^4 = 64 - 16 = ${dn.disp}$ m.`,
  scheme: [['Antiderivative t³ − t², limits 0 to 4', 1], [`Δx = 64 − 16 = ${dn.disp} m`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => near(integ((t) => 3 * t * t - 2 * t, 0, 4), q.answer.value, 1e-6) || 'defint');

// ================================================================ t03 graphs and acceleration
const mt = { a1: 16 / 20, a3: -16 / 8 };
add('vtslope-mcq', mcq({
  stem: 'The v–t graph of a metro train rises uniformly from 0 to 16 m s⁻¹ in 20 s, stays horizontal until t = 50 s and then falls uniformly to zero at t = 58 s. Its accelerations between 20 s and 50 s, and at t = 54 s, are',
  right: '0 and −2.0 m s⁻²',
  wrong: ['0 and +2.0 m s⁻²', '+0.8 m s⁻² and −2.0 m s⁻²', '0 and −0.5 m s⁻²'],
  scheme: [[`Horizontal part: a = 0; falling part: a = (0 − 16)/8 = ${mn(mt.a3)} m s⁻² (@K)`, 1]],
  sol: `The slope of a v–t graph is the acceleration. On the horizontal part the slope is 0; on the falling part it is (0 − 16)/(58 − 50) = ${mn(mt.a3)} m s⁻².`,
  d: 2, c: 'application', t: [3],
}), () => mt.a3 === -2 && near(mt.a1, 0.8, 1e-9) || 'vtslope');
add('retard-mcq', mcq({
  stem: 'A car moves along the −x direction with velocity −15 m s⁻¹ and acceleration −2 m s⁻². The car is',
  right: 'speeding up, because velocity and acceleration have the same sign',
  wrong: ['slowing down, because the acceleration is negative', 'moving with uniform velocity, because the velocity is constant in sign', 'slowing down, because it moves along the −x direction'],
  sol: 'Speed increases when velocity and acceleration point the same way. Both are negative here, so the car speeds up even though the acceleration is negative.',
  d: 2, c: 'understanding', t: [3],
}));
const aa = { a: 2.5, T: 6 };
aa.dv = aa.a * aa.T;
add('areaa-mcq', mcq({
  stem: 'The a–t graph of a motorbike is a horizontal line at 2.5 m s⁻² from t = 0 to t = 6 s. The area under it represents',
  right: `the increase in velocity, ${aa.dv} m s⁻¹`,
  wrong: [`the displacement, ${0.5 * aa.a * aa.T ** 2} m`, `the average velocity, ${aa.a} m s⁻¹`, `the distance, ${0.5 * aa.dv} m`],
  scheme: [[`Area = 2.5 × 6 = ${aa.dv} m s⁻¹, the change in velocity (@K)`, 1]],
  sol: `Area under an a–t graph = ∫a dt = Δv. Here it is 2.5 × 6 = ${aa.dv} m s⁻¹.`,
  d: 2, c: 'application', t: [3],
}), () => near(integ(() => 2.5, 0, 6), 15, 1e-9) || 'areaa');
add('xt-mcq', mcq({
  stem: 'On an x–t graph a body is shown by a straight line sloping downward through positive values of x. The body is',
  right: 'moving along −x with constant speed',
  wrong: ['at rest at a positive position', 'moving along +x with constant speed', 'moving along −x with increasing speed'],
  sol: 'The slope of an x–t graph is the velocity. A straight line has constant slope, so uniform velocity; a downward slope is negative, so the body moves along −x.',
  d: 1, c: 'understanding', t: [3],
}));
add('hline-tf', tf({
  stem: 'A horizontal line on a v–t graph at v = +5 m s⁻¹ shows a body at rest.',
  key: 'f',
  sol: 'False. The body moves along +x at a steady 5 m s⁻¹; its acceleration is zero because the slope is zero. A body at rest has its v–t line on the time axis (v = 0).',
  d: 1, c: 'understanding', t: [3],
}));
add('instspeed-ar', ar({
  a: 'In straight-line motion the instantaneous speed of a body equals the magnitude of its instantaneous velocity.',
  r: 'Speed and velocity are both measured in metre per second in the SI system.',
  key: 'b',
  sol: 'A is true: for an infinitesimal interval the distance equals the magnitude of the displacement. R is also true, but a common unit does not explain why the two magnitudes are equal.',
  d: 1, c: 'understanding', t: [1, 3],
}));
add('dispzero-ar', ar({
  a: 'A shopkeeper who walks 80 m from his stall to the shop gate and back to the stall has zero displacement.',
  r: 'Displacement is the change of position between the start and the end and does not depend on the route followed.',
  key: 'a',
  sol: 'Start and finish coincide, so the displacement is zero although the distance is 160 m. R is the definition of displacement and explains A.',
  d: 2, c: 'understanding', t: [1],
}));

// ================================================================ t04 equations of motion
const eq = { u: 8, a: 1.5, t: 6 };
eq.s = eq.u * eq.t + 0.5 * eq.a * eq.t ** 2;
add('eqchoice-num', num({
  stem: 'A scooter moving at 8 m s⁻¹ accelerates uniformly at 1.5 m s⁻² for 6 s. Find the distance covered in this time, in m.',
  value: eq.s, tol: 0.05, unit: 'm',
  sol: r`$s = ut + \tfrac{1}{2}at^2 = 8(6) + \tfrac{1}{2}(1.5)(36) = 48 + 27 = ${eq.s}$ m.`,
  scheme: [[`s = ut + ½at² = 48 + 27 = ${eq.s} m`, 1]],
  d: 2, c: 'application', t: [4],
}), (q) => near(((eq.u + (eq.u + eq.a * eq.t)) / 2) * eq.t, q.answer.value, 1e-9) || 'eqchoice');
add('eqwhich-mcq', mcq({
  stem: 'Which of the following problems is best solved with v² = u² + 2as?',
  right: 'A bus slows from 15 m s⁻¹ to 5 m s⁻¹ over 50 m; find the retardation',
  wrong: ['A bus slows from 15 m s⁻¹ to 5 m s⁻¹ in 4 s; find the retardation', 'A bus starts from rest with 1.5 m s⁻²; find the distance in 6 s', 'A bus starts from rest and reaches 15 m s⁻¹ in 10 s; find the distance in this time'],
  sol: 'v² = u² + 2as has no time in it, so it is best when time is neither given nor asked. Only the problem with u, v and s given and a wanted fits; the other three give or ask for t.',
  d: 2, c: 'understanding', t: [4],
}));
const nth = { a: 2, n: 4 };
nth.sn = nth.a * (2 * nth.n - 1) / 2;
add('nth-mcq', mcq({
  stem: 'A body starts from rest and moves with a uniform acceleration of 2 m s⁻². The distance it covers in the 4th second is',
  right: `${nth.sn} m`,
  wrong: [`${0.5 * nth.a * nth.n ** 2} m`, `${0.5 * nth.a * (nth.n - 1) ** 2} m`, '8 m'],
  scheme: [[`s₄ = ½(2)(16) − ½(2)(9) = 16 − 9 = ${nth.sn} m (@K)`, 1]],
  sol: `Distance in 4 s minus distance in 3 s: ½(2)(4²) − ½(2)(3²) = 16 − 9 = ${nth.sn} m. (Check: s_n = u + a(2n − 1)/2 = 7 m.)`,
  d: 2, c: 'application', t: [4],
}), () => near(0.5 * 2 * 16 - 0.5 * 2 * 9, nth.sn, 1e-9) || 'nth');
add('calcmeth-mcq', mcq({
  stem: 'To derive v² = u² + 2as by calculus, time is eliminated by writing the acceleration as',
  right: r`$a = v\,\dfrac{dv}{dx}$`,
  wrong: [r`$a = \dfrac{dx}{dv}$`, r`$a = \dfrac{1}{v}\dfrac{dv}{dx}$`, r`$a = \dfrac{dx}{v\,dt}$`],
  sol: r`$a = \dfrac{dv}{dt} = \dfrac{dv}{dx}\cdot\dfrac{dx}{dt} = v\dfrac{dv}{dx}$. Then $\int_u^v v\,dv = a\int_0^s dx$ gives $\tfrac{1}{2}(v^2 - u^2) = as$.`,
  d: 2, c: 'understanding', t: [4],
}));
const mv = { u: 6, v: 14, T: 10 };
mv.a = (mv.v - mv.u) / mv.T;
mv.s = ((mv.u + mv.v) / 2) * mv.T;
add('meanv-mcq', mcq({
  stem: 'The speed of a scooter rises uniformly from 6 m s⁻¹ to 14 m s⁻¹ in 10 s. The distance covered in this time is',
  right: `${mv.s} m`,
  wrong: [`${(mv.v - mv.u) * mv.T} m`, `${mv.v * mv.T} m`, `${mv.u * mv.T} m`],
  scheme: [[`s = ½(u + v)t = ½(6 + 14)(10) = ${mv.s} m (@K)`, 1]],
  sol: `For uniform acceleration the mean velocity is ½(u + v) = 10 m s⁻¹, so s = 10 × 10 = ${mv.s} m. Check with a = 0.8 m s⁻²: ut + ½at² = 60 + 40 = ${mv.s} m.`,
  d: 2, c: 'application', t: [4],
}), () => near(mv.u * mv.T + 0.5 * mv.a * mv.T ** 2, mv.s, 1e-9) || 'meanv');
add('avar-ar', ar({
  a: 'The equations v = u + at, s = ut + ½at² and v² = u² + 2as hold for any straight-line motion, whether or not the acceleration is constant.',
  r: 'These equations are derived by taking the acceleration to be constant.',
  key: 'd',
  sol: 'R is true: every derivation (graphical, calculus, analytical) assumes constant a. Because of that A is false: the equations fail when the acceleration changes with time.',
  d: 2, c: 'understanding', t: [4],
}));
const sc = { v: 20, a: 2.5 };
sc.u = R6(72 / 3.6);
sc.s = sc.u ** 2 / (2 * sc.a);
sc.t = sc.u / sc.a;
add('stopcar-num', num({
  stem: 'A car moving at 72 km h⁻¹ is brought to rest with a uniform retardation of 2.5 m s⁻². Find the distance it covers before stopping, in m.',
  value: sc.s, tol: 0.1, unit: 'm', marks: 3,
  sol: r`$u = 72/3.6 = ${sc.u}$ m s$^{-1}$, $v = 0$, $a = -2.5$ m s$^{-2}$. $v^2 = u^2 + 2as$ gives $s = \dfrac{0 - ${sc.u ** 2}}{2(-2.5)} = ${sc.s}$ m.`,
  scheme: [[`u = 72 km h⁻¹ = ${sc.u} m s⁻¹`, 1], ['v² = u² + 2as with v = 0 and a = −2.5 m s⁻²', 1], [`s = ${sc.s} m`, 1]],
  d: 2, c: 'application', t: [4],
}), (q) => near(0.5 * sc.u * sc.t, q.answer.value, 1e-9) && sc.t === 8 || 'stopcar');

// ================================================================ t05 motion under gravity
const br = { h: 44.1 };
br.t = Math.sqrt((2 * br.h) / g);
add('dropbridge-num', num({
  stem: 'A stone is dropped from a bridge 44.1 m above a river and falls freely. Taking g = 9.8 m s⁻², find the time it takes to reach the water, in s.',
  value: R6(br.t), tol: 0.05, unit: 's',
  sol: r`$h = \tfrac{1}{2}gt^2 \Rightarrow t = \sqrt{\dfrac{2h}{g}} = \sqrt{\dfrac{2(44.1)}{9.8}} = ${R6(br.t)}$ s.`,
  scheme: [[`t = √(2h/g) = √9 = ${R6(br.t)} s`, 1]],
  d: 2, c: 'application', t: [5],
}), (q) => near(0.5 * g * q.answer.value ** 2, br.h, 1e-9) || 'dropbridge');
add('topsame-mcq', mcq({
  stem: 'A ball thrown vertically up passes the edge of a window ledge at 8 m s⁻¹ while going up. Neglecting air resistance, its speed as it passes the ledge again on the way down is',
  right: '8 m s⁻¹',
  wrong: ['0, since it has stopped at the top', '16 m s⁻¹', 'less than 8 m s⁻¹, because it has lost speed on the way up'],
  sol: 'With a = −g throughout, the speed at any height is the same going up and coming down (v² = u² − 2gh depends only on the height). So it is again 8 m s⁻¹, now directed downward.',
  d: 2, c: 'understanding', t: [5],
}));
const moon = { gE: 9.8, gM: 1.6 };
moon.ratio = moon.gE / moon.gM;
add('hmoon-mcq', mcq({
  stem: 'A ball is thrown vertically up with the same speed on the Earth (g = 9.8 m s⁻²) and on the Moon (g = 1.6 m s⁻²). The height reached on the Moon compared with that on the Earth is',
  right: `about ${dec(moon.ratio, 2)} times as great`,
  wrong: ['about 1.6 times as great', 'about 3.1 times as great', 'the same'],
  scheme: [[`H = u²/2g ∝ 1/g; ratio = 9.8/1.6 = ${dec(moon.ratio, 3)} (@K)`, 1]],
  sol: `H = u²/(2g), so for the same u the height is inversely proportional to g: H_Moon/H_Earth = 9.8/1.6 = ${dec(moon.ratio, 3)}.`,
  d: 3, c: 'application', t: [5],
}), () => near((1 / 1.6) / (1 / 9.8), moon.ratio, 1e-9) || 'hmoon');
add('vtgrav-mcq', mcq({
  stem: 'A ball is thrown up and caught at the throwing point. Taking up as positive, the v–t graph of the whole flight is',
  right: 'one straight line of slope −9.8 m s⁻², crossing the time axis at the top',
  wrong: ['a line of slope +9.8 m s⁻² while rising and −9.8 m s⁻² while falling', 'a horizontal line at the speed of throw', 'two straight lines meeting at the top, with slopes of opposite sign'],
  sol: 'The acceleration is −g all the time (rise, top and fall), so the v–t graph is a single straight line with slope −9.8 m s⁻², from +u to −u.',
  d: 2, c: 'understanding', t: [5],
}));
add('upsame-tf', tf({
  stem: 'Neglecting air resistance, a stone thrown up at 20 m s⁻¹ and another thrown up at 30 m s⁻¹ have the same acceleration at their highest points.',
  key: 't',
  sol: 'True. Both are in free fall with a = g = 9.8 m s⁻² downward at every instant, including the top where the velocity is momentarily zero.',
  d: 2, c: 'understanding', t: [5],
}));
add('ratio-fill', fill({
  stem: 'A body falls freely from rest. The distances covered in the 1st, 2nd and 3rd seconds are in the ratio 1 : ___ : ___.',
  acc: [['3'], ['5']],
  sol: 'Distance in the nth second ∝ (2n − 1), so the ratio is 1 : 3 : 5.',
  d: 1, c: 'recall', t: [5],
}));
add('ironwood-ar', ar({
  a: 'A heavy iron ball and a light wooden ball dropped together from the same height inside a chamber from which the air has been removed reach the floor at the same time.',
  r: 'In free fall the acceleration of a body does not depend on its mass.',
  key: 'a',
  sol: 'With no air resistance both balls have a = g, whatever their masses, so they fall together; R states exactly this and explains A.',
  d: 2, c: 'understanding', t: [5],
}));
add('riseequal-ar', ar({
  a: 'A ball thrown vertically up takes the same time to reach its highest point as to come back to the throwing point (no air resistance).',
  r: 'The acceleration of the ball changes direction at the highest point.',
  key: 'c',
  sol: 'A is true: t_up = u/g and the total time is 2u/g. R is false: the acceleration is g downward at every instant; it is the velocity that changes direction at the top.',
  d: 3, c: 'analysis', t: [5],
}));
const tp = { u: 24.5, t: 4 };
tp.y = tp.u * tp.t - 0.5 * g * tp.t ** 2;
tp.tup = tp.u / g;
add('thrown-num', num({
  stem: 'A ball is thrown vertically upward at 24.5 m s⁻¹ from the ground. Taking g = 9.8 m s⁻², find its height above the ground 4 s after the throw, in m.',
  value: R6(tp.y), tol: 0.05, unit: 'm', marks: 3,
  sol: r`Up positive, $a = -g = -9.8$ m s$^{-2}$: $y = ut + \tfrac{1}{2}at^2 = 24.5(4) - 4.9(16) = 98 - 78.4 = ${R6(tp.y)}$ m. The ball is already coming down at 4 s, since it reached the top at ${tp.tup} s.`,
  scheme: [['Up positive, a = −g = −9.8 m s⁻²', 1], ['y = ut + ½at² = 24.5(4) − 4.9(4²)', 1], [`y = 98 − 78.4 = ${R6(tp.y)} m`, 1]],
  d: 3, c: 'application', t: [5],
}), (q) => {
  // independent: height at the top minus the fall from the top for the remaining time
  const H = tp.u ** 2 / (2 * g);
  const fall = 0.5 * g * (tp.t - tp.tup) ** 2;
  return near(H - fall, q.answer.value, 1e-6) || 'thrown';
});
const mt2 = { H: 78.4, u: 39.2 };
mt2.t = mt2.H / mt2.u;
mt2.y = mt2.u * mt2.t - 0.5 * g * mt2.t ** 2;
add('meet-num', num({
  stem: 'A ball A is dropped from rest from the top of a 78.4 m tower. At the same instant a ball B is thrown vertically up from the foot of the tower at 39.2 m s⁻¹. Taking g = 9.8 m s⁻², find the height above the ground at which the two balls meet, in m.',
  value: R6(mt2.y), tol: 0.1, unit: 'm', marks: 3,
  sol: r`Heights above the ground: $y_A = 78.4 - 4.9t^2$, $y_B = 39.2t - 4.9t^2$. Equal when $78.4 = 39.2t$, so $t = ${R6(mt2.t)}$ s, and $y = 39.2(${R6(mt2.t)}) - 4.9(${R6(mt2.t ** 2)}) = ${R6(mt2.y)}$ m.`,
  scheme: [['y_A = 78.4 − ½gt² and y_B = ut − ½gt²', 1], [`Equating: the ½gt² terms cancel, t = 78.4/39.2 = ${R6(mt2.t)} s`, 1], [`y = ${R6(mt2.y)} m`, 1]],
  d: 5, c: 'analysis', t: [5],
}), (q) => {
  // independent: ball A has fallen 0.5 g t² at t = 2, and the two balls close the gap of 78.4 m at the throw speed
  const t = 78.4 / 39.2;
  return near(78.4 - 0.5 * g * t * t, q.answer.value, 1e-6) || 'meet';
});
const ba = { v1: 18, v2: 90, T: 8 };
ba.a = (ba.v2 / 3.6 - ba.v1 / 3.6) / ba.T;
add('bikeacc-num', num({
  stem: 'The speed of a motorbike rises uniformly from 18 km h⁻¹ to 90 km h⁻¹ in 8 s along a straight road. Find its average acceleration, in m s⁻².',
  value: ba.a, tol: 0.02, unit: 'm s⁻²',
  sol: r`$u = 18/3.6 = 5$ m s$^{-1}$ and $v = 90/3.6 = 25$ m s$^{-1}$, so $a = \dfrac{v - u}{t} = \dfrac{25 - 5}{8} = ${ba.a}$ m s$^{-2}$.`,
  scheme: [[`a = (25 − 5)/8 = ${ba.a} m s⁻²`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => near(5 + q.answer.value * 8, 25, 1e-9) && ba.a === 2.5 || 'bikeacc');
