// ISC 11 ch02 question bank, part 3: long answers (5 marks), set in parts with the marks shown.
import { mk, add, r, dec, near } from '../../isc-11-physics-ch01/src/lib.mjs';
import { g, deriv, integ, pathLength, root } from './phys.mjs';

const { long } = mk;
const R6 = (x) => Math.round(x * 1e6) / 1e6;
const mn = (x) => String(x).replace('-', '−'); // proper minus sign in printed plain text

// ---------------------------------------------------------------- t01: a van to a toll plaza
const vn = { e: 12, te: 20, wait: 10, w: 4, tw: 10 };
vn.T = (vn.te + vn.wait + vn.tw) / 60;
vn.path = vn.e + vn.w;
vn.disp = vn.e - vn.w;
vn.vs = R6(vn.path / vn.T);
vn.vv = R6(vn.disp / vn.T);
add('van-long', long({
  stem: '(a) Define distance, displacement, average speed and average velocity. [2] (b) A van goes 12 km east in 20 min, waits 10 min at a toll plaza and then goes 4 km west in 10 min. For the whole 40 min find (i) the distance, (ii) the displacement, (iii) the average speed and (iv) the magnitude of the average velocity, in km h⁻¹ where needed. [3]',
  model: r`(a) Distance is the total length of the route actually covered; displacement is the change of position, final position minus initial position. Average speed is the distance divided by the time taken and average velocity is the displacement divided by the time taken.

(b) The total time is $20 + 10 + 10 = 40$ min $= \dfrac{2}{3}$ h, and the waiting time counts in it. (i) Distance $= 12 + 4 = ${vn.path}$ km. (ii) Displacement $= 12 - 4 = ${vn.disp}$ km east. (iii) Average speed $= \dfrac{${vn.path}}{2/3} = ${vn.vs}$ km h$^{-1}$. (iv) Average velocity $= \dfrac{${vn.disp}}{2/3} = ${vn.vv}$ km h$^{-1}$ east, half the average speed because the van turned back.`,
  sol: 'Definitions; distance and displacement; both divided by 2/3 h.',
  scheme: [['Definitions of distance and displacement', 1], ['Definitions of average speed and average velocity', 1], [`Distance ${vn.path} km and displacement ${vn.disp} km east`, 1], [`Total time 2/3 h; average speed = ${vn.vs} km h⁻¹`, 1], [`Average velocity = ${vn.vv} km h⁻¹ east`, 1]],
  d: 3, c: 'application', t: [1],
}), () => near(vn.vs, 24, 1e-9) && near(vn.vv, 12, 1e-9) && near(vn.T, 40 / 60, 1e-9) || 'van');

// ---------------------------------------------------------------- t02: x = 3 sin t + 2t²
const tr = { A: 3, B: 2 };
tr.x = (t) => tr.A * Math.sin(t) + tr.B * t * t;
tr.v = (t) => tr.A * Math.cos(t) + 2 * tr.B * t;
tr.a = (t) => -tr.A * Math.sin(t) + 2 * tr.B;
tr.v0 = tr.v(0);
tr.aq = tr.a(Math.PI / 2);
add('trigpoly-long', long({
  stem: '(a) State the power rule of differentiation and the derivatives of sin t, cos t, e^t and ln t. [2] (b) The position of a particle is x = 3 sin t + 2t² (x in m, t in s, the angle in radian). Find (i) its velocity at t = 0 and (ii) its acceleration at t = π/2 s. [3]',
  model: r`(a) The derivative of $t^n$ is $nt^{n-1}$ for any power $n$. The derivative of $\sin t$ is $\cos t$ and the derivative of $\cos t$ is $-\sin t$. The function $e^t$ is its own derivative, and the derivative of $\ln t$ is $\dfrac{1}{t}$ for positive $t$.

(b) The velocity is the first derivative of the position, taken term by term: $v = \dfrac{dx}{dt} = 3\cos t + 4t$. At $t = 0$, $v = 3(1) + 0 = ${tr.v0}$ m s$^{-1}$. The acceleration is the derivative of the velocity: $a = \dfrac{dv}{dt} = -3\sin t + 4$. At $t = \dfrac{\pi}{2}$, $a = -3(1) + 4 = ${tr.aq}$ m s$^{-2}$.`,
  sol: 'Differentiate twice, term by term, and substitute.',
  scheme: [['Power rule nt^(n−1) stated', 1], ['Derivatives of sin t, cos t, eᵗ and ln t stated', 1], ['v = 3 cos t + 4t', 1], [`v(0) = ${tr.v0} m s⁻¹`, 1], [`a = −3 sin t + 4 = ${tr.aq} m s⁻² at t = π/2`, 1]],
  d: 3, c: 'application', t: [2],
}), () => near(deriv(tr.x, 0), tr.v0, 1e-6) && near(deriv(tr.v, Math.PI / 2), tr.aq, 1e-5) && tr.v0 === 3 && Math.abs(tr.aq - 1) < 1e-12 || 'trigpoly');

// ---------------------------------------------------------------- t02 + t03: v = 3t² − 6t
const ip = { T: 4 };
ip.v = (t) => 3 * t * t - 6 * t;
ip.x = (t) => t ** 3 - 3 * t * t;
ip.a2 = 6 * 2 - 6;
ip.disp = ip.x(ip.T) - ip.x(0);
ip.x2 = ip.x(2);
ip.path = Math.abs(ip.x2) + Math.abs(ip.x(ip.T) - ip.x2);
add('integpart-long', long({
  stem: 'The velocity of a particle on a straight line is v = 3t² − 6t (SI units). (a) Find its acceleration at t = 2 s. [1] (b) Find, by integration, its displacement from t = 0 to t = 4 s. [2] (c) Find the distance it travels in this interval and explain why it differs from the displacement. [2]',
  model: r`(a) $a = \dfrac{dv}{dt} = 6t - 6$, so $a(2) = ${ip.a2}$ m s$^{-2}$.

(b) $\Delta x = \int_0^4 (3t^2 - 6t)\,dt = \left[t^3 - 3t^2\right]_0^4 = 64 - 48 = ${ip.disp}$ m.

(c) The velocity is $3t(t - 2)$, negative from $0$ to $2$ s and positive afterwards. The displacement in the first 2 s is $8 - 12 = ${ip.x2}$ m, that is ${-ip.x2} m backward, and in the next 2 s it is $${ip.x(4) - ip.x2}$ m forward. Distance $= ${-ip.x2} + ${ip.x(4) - ip.x2} = ${ip.path}$ m. It exceeds the displacement because the particle turns back at $t = 2$ s and the backward part is subtracted from the displacement but added to the distance.`,
  sol: 'a = dv/dt; definite integral; split at the instant of rest, v = 0 at t = 2 s.',
  scheme: [[`a = 6t − 6, a(2) = ${ip.a2} m s⁻²`, 1], ['Antiderivative t³ − 3t² with limits 0 to 4', 1], [`Displacement = ${ip.disp} m`, 1], [`Split at t = 2 s: ${-ip.x2} m back and ${ip.x(4) - ip.x2} m forward, distance ${ip.path} m`, 1], ['The reversal adds to the distance but subtracts from the displacement', 1]],
  d: 4, c: 'application', t: [2, 3],
}), () => near(integ(ip.v, 0, 4), ip.disp, 1e-6) && near(pathLength(ip.x, 0, 4, 100000), ip.path, 1e-4) && ip.path === 24 && ip.disp === 16 || 'integpart');

// ---------------------------------------------------------------- t03: motion graphs, lift
const lf = { v: 4, t1: 2, t2: 6, t3: 2 };
lf.s1 = 0.5 * lf.t1 * lf.v;
lf.s2 = lf.t2 * lf.v;
lf.s3 = 0.5 * lf.t3 * lf.v;
lf.s = lf.s1 + lf.s2 + lf.s3;
lf.T = lf.t1 + lf.t2 + lf.t3;
lf.avg = lf.s / lf.T;
add('lift-long', long({
  stem: '(a) Describe, or draw in rough, the s–t, v–t and a–t graphs side by side for a body that starts from rest and moves with uniform acceleration. [3] (b) A lift speeds up uniformly from rest to 4 m s⁻¹ in 2 s, moves at that speed for 6 s and stops uniformly in 2 s. Using its v–t graph, find the total distance travelled and the average speed. [2]',
  model: r`(a) The s–t graph is a parabola through the origin, horizontal at the start and steepening upward, because its slope is the growing velocity. The v–t graph is a straight line through the origin with a positive slope equal to the acceleration. The a–t graph is a horizontal straight line at the constant value of the acceleration.

(b) The v–t graph is a trapezium. The areas are $\tfrac{1}{2}(2)(4) = ${lf.s1}$ m, $(6)(4) = ${lf.s2}$ m and $\tfrac{1}{2}(2)(4) = ${lf.s3}$ m, so the distance is ${lf.s} m in ${lf.T} s. The average speed is $\dfrac{${lf.s}}{${lf.T}} = ${lf.avg}$ m s$^{-1}$.`,
  sol: 'Shapes from slopes; area of the trapezium under the v–t graph.',
  scheme: [['s–t graph: parabola, slope increasing', 1], ['v–t graph: straight line through the origin', 1], ['a–t graph: horizontal line', 1], [`Areas ${lf.s1} + ${lf.s2} + ${lf.s3} = ${lf.s} m`, 1], [`Average speed = ${lf.s}/${lf.T} = ${lf.avg} m s⁻¹`, 1]],
  d: 3, c: 'application', t: [3],
}), () => {
  const f = (t) => (t <= 2 ? 2 * t : t <= 8 ? 4 : 4 - 2 * (t - 8));
  const area = integ((t) => (t <= 2 ? 2 * t : t <= 8 ? 4 : 4 - 2 * (t - 8)), 0, 2, 200) + integ(() => 4, 2, 8, 200) + integ((t) => 4 - 2 * (t - 8), 8, 10, 200);
  return near(area, lf.s, 1e-6) && lf.s === 32 && near(lf.avg, 3.2, 1e-9) && f(10) === 0 || 'lift';
});

// ---------------------------------------------------------------- t04: graphical derivations
add('graphall-long', long({
  stem: '(a) Using the v–t graph of a body moving in a straight line with uniform acceleration a, derive the equations v = u + at and s = ut + ½at². [3] (b) Hence derive the equation v² = u² + 2as. [2]',
  model: r`(a) Let the velocity rise uniformly from $u$ at $t = 0$ to $v$ at time $t$, so the v–t graph is a straight line. Its slope is the acceleration, $a = \dfrac{v - u}{t}$, giving $v = u + at$. The displacement is the area under the line: a rectangle $ut$ plus a triangle $\tfrac{1}{2}(v - u)t$. With $v - u = at$ this is $s = ut + \tfrac{1}{2}at^2$.

(b) The area of the trapezium is also $s = \tfrac{1}{2}(u + v)t$. The slope relation gives $t = \dfrac{v - u}{a}$. Substituting, $s = \dfrac{(u + v)(v - u)}{2a} = \dfrac{v^2 - u^2}{2a}$, so $v^2 = u^2 + 2as$. Time has been eliminated.`,
  sol: 'Slope gives v = u + at; area gives s; eliminate t between the slope and the trapezium area.',
  scheme: [['v–t line from u to v with slope a: v = u + at', 1], ['Area = rectangle ut + triangle ½(v − u)t', 1], ['s = ut + ½at² on substituting v − u = at', 1], ['s = ½(u + v)t and t = (v − u)/a', 1], ['v² = u² + 2as', 1]],
  d: 4, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- t05: thrown up at 39.2 m/s
const up = { u: 39.2, t: 6 };
up.H = R6(up.u ** 2 / (2 * g));
up.T = R6((2 * up.u) / g);
up.v = R6(up.u - g * up.t);
up.y = R6(up.u * up.t - 0.5 * g * up.t ** 2);
up.tup = R6(up.u / g);
add('upnum-long', long({
  stem: '(a) Derive expressions for the greatest height reached and the time of flight of a body thrown vertically upward with speed u, neglecting air resistance. [2] (b) A ball is thrown vertically upward at 39.2 m s⁻¹. Taking g = 9.8 m s⁻², find (i) the greatest height, (ii) the time of flight and (iii) the velocity and the height of the ball 6 s after the throw. [3]',
  model: r`(a) Taking up as positive, $a = -g$. At the top $v = 0$, so $0 = u^2 - 2gH$ and $H = \dfrac{u^2}{2g}$. The ball returns to the starting level when $0 = uT - \tfrac{1}{2}gT^2$, so the time of flight is $T = \dfrac{2u}{g}$.

(b) (i) $H = \dfrac{(39.2)^2}{2(9.8)} = ${up.H}$ m. (ii) $T = \dfrac{2(39.2)}{9.8} = ${up.T}$ s. (iii) At $t = 6$ s, $v = u - gt = 39.2 - 9.8(6) = ${up.v}$ m s$^{-1}$, so the ball is moving downward, and $y = ut - \tfrac{1}{2}gt^2 = 39.2(6) - 4.9(36) = ${up.y}$ m, which is below the top because the ball reached the top at ${up.tup} s and has been falling since then.`,
  sol: 'v² = u² − 2gH with v = 0; 2u/g; then v = u − gt and y = ut − ½gt².',
  scheme: [['H = u²/2g from v² = u² − 2gH with v = 0', 1], ['T = 2u/g from y = 0', 1], [`H = ${up.H} m`, 1], [`T = ${up.T} s`, 1], [`v = ${mn(up.v)} m s⁻¹ (downward) and y = ${up.y} m at 6 s`, 1]],
  d: 4, c: 'application', t: [5],
}), () => {
  // independent: the ball has fallen for 6 − 4 = 2 s from the top
  const top = 0.5 * 9.8 * 4 ** 2;
  const fall = 0.5 * g * (up.t - up.tup) ** 2;
  return near(top - fall, up.y, 1e-6) && near(-g * (up.t - up.tup), up.v, 1e-6) && near(top, up.H, 1e-9) && up.T === 8 || 'upnum';
});

// ---------------------------------------------------------------- t04: calculus derivation and a car
const cc = { u: 12, a: 0.8, t: 10 };
cc.v = R6(cc.u + cc.a * cc.t);
cc.s = R6(cc.u * cc.t + 0.5 * cc.a * cc.t ** 2);
add('calcnum-long', long({
  stem: '(a) Derive the three equations of uniformly accelerated motion, v = u + at, s = ut + ½at² and v² = u² + 2as, by the calculus method. [3] (b) A car moving at 12 m s⁻¹ accelerates uniformly at 0.8 m s⁻² for 10 s. Find its final velocity and the distance it covers in this time. [2]',
  model: r`(a) For constant $a$, $a = \dfrac{dv}{dt}$ gives $\int_u^v dv = \int_0^t a\,dt$, so $v = u + at$. With $v = \dfrac{dx}{dt}$, $\int_0^s dx = \int_0^t (u + at)\,dt$ gives $s = ut + \tfrac{1}{2}at^2$. To remove time, write $a = \dfrac{dv}{dt} = v\dfrac{dv}{dx}$, so $\int_u^v v\,dv = a\int_0^s dx$, which gives $\tfrac{1}{2}(v^2 - u^2) = as$, that is $v^2 = u^2 + 2as$.

(b) Using the first equation, $v = 12 + 0.8(10) = ${cc.v}$ m s$^{-1}$. Using the second equation, $s = 12(10) + \tfrac{1}{2}(0.8)(100) = 120 + 40 = ${cc.s}$ m. As a check, the third equation gives $s = \dfrac{v^2 - u^2}{2a} = \dfrac{${cc.v ** 2} - ${cc.u ** 2}}{1.6} = ${cc.s}$ m, the same value, so the working is consistent. In every step the acceleration is taken as constant, which is true for this car while the throttle is held steady.`,
  sol: 'Integrate a = dv/dt, v = dx/dt and a = v dv/dx; then substitute in the equations.',
  scheme: [['a = dv/dt integrated: v = u + at', 1], ['v = dx/dt integrated: s = ut + ½at²', 1], ['a = v dv/dx integrated: v² = u² + 2as', 1], [`v = 12 + 0.8 × 10 = ${cc.v} m s⁻¹`, 1], [`s = 120 + 40 = ${cc.s} m`, 1]],
  d: 3, c: 'understanding', t: [4],
}), () => near((cc.v ** 2 - cc.u ** 2) / (2 * cc.a), cc.s, 1e-9) && cc.v === 20 && cc.s === 160 || 'calcnum');
