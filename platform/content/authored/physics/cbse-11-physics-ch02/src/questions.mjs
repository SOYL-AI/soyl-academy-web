// ch02 Motion in a Straight Line — question bank, part 1: t01 (frame, position, displacement) and t02 (velocity, acceleration).
// Every numerical is computed here and re-solved by an independent `check`; solutions and schemes print the computed values.
// AR keys planned across the chapter: a (displacement zero), d (zero velocity), b (coin), a (up/down), c (area), b (average acceleration).
import { mk, add, r, dec, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { deriv, integ, pathLength, root } from './phys.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const R6 = (x) => Math.round(x * 1e6) / 1e6;
const v3 = (x) => Number(dec(x, 3));

// ================================================================ t01 frame, position, path length, displacement
add('frame-mcq', mcq({
  stem: 'A passenger sits in a coach of a train moving steadily past a platform. She says the bag on the luggage rack is at rest; a porter on the platform says the same bag is moving. Which statement is correct?',
  right: 'Both are right: rest and motion are relative to the frame of reference chosen',
  wrong: ['Only the porter is right, because the platform is fixed to the ground', 'Both cannot be right; one of them has made a measuring error', 'The bag is at rest in every frame because nothing pushes it'],
  sol: 'Position is measured from an origin in a chosen frame. In the coach frame the bag does not change position; in the platform frame it does — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
const og = { sig: 250, tr: 700 };
og.new = og.tr - og.sig;
add('origin-mcq', mcq({
  stem: 'On a straight railway line a signal post is at x = +250 m and the front of a goods train is at x = +700 m. The origin is now shifted to the signal post, keeping the positive direction the same. The train front is then at',
  right: `+${og.new} m, and its distance from the signal stays ${og.new} m`,
  wrong: [`+${og.sig + og.tr} m, and its distance from the signal becomes ${og.sig + og.tr} m`, `+${og.tr} m, and its distance from the signal becomes ${og.new} m`, `−${og.new} m, and its distance from the signal stays ${og.new} m`],
  sol: `New position = old position − position of the new origin = 700 − 250 = ${og.new} m. The separation of two bodies does not depend on the origin — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => og.new === 450 || 'og');
add('disp-fill', fill({
  stem: 'On a hill road a surveyor notes only the straight-line change of position of her jeep from the start to the end of the trip, together with its direction. This quantity is called the ___ of the jeep.',
  acc: [['displacement']],
  sol: 'It is the **displacement**: final position minus initial position.',
  d: 1, c: 'recall', t: [1],
}));
add('bound-tf', tf({
  stem: 'Between two instants, the magnitude of the displacement of a body can never be greater than the length of the path it covers in that interval.',
  key: 't',
  sol: 'True. The straight-line change of position cannot exceed the length of any route between the same two positions; the two are equal only if the body never turns back.',
  d: 2, c: 'understanding', t: [1],
}));
const lift = { top: 36, end: 15 };
lift.disp = lift.end - 0;
lift.path = lift.top + (lift.top - lift.end);
add('lift-num', num({
  stem: 'A lift in a Mumbai tower starts at the ground floor (height 0), rises 36 m to the terrace and then comes down to a landing 15 m above the ground. Taking up as positive, find the displacement of the lift from start to finish, in m.',
  value: lift.disp, tol: 0.05, unit: 'm',
  sol: r`$\Delta x = x_\text{final} - x_\text{initial} = ${lift.end} - 0 = ${lift.disp}$ m (upward). The path length is ${lift.top} + ${lift.top - lift.end} = ${lift.path} m, which is larger.`,
  scheme: [['Δx = x_final − x_initial', 1]],
  d: 1, c: 'application', t: [1],
}), (q) => near(lift.disp, q.answer.value) && lift.path === 57 || 'lift');
const wk = { e1: 640, w: 260, e2: 350 };
wk.path = wk.e1 + wk.w + wk.e2;
wk.disp = wk.e1 - wk.w + wk.e2;
add('walk-num', num({
  stem: 'A morning walker on a straight canal bank in Lucknow goes 640 m east, then 260 m west and finally 350 m east. Find the total path length covered, in m.',
  value: wk.path, tol: 0.5, unit: 'm',
  sol: r`Path length $= 640 + 260 + 350 = ${wk.path}$ m. (Her displacement is only $640 - 260 + 350 = ${wk.disp}$ m east.)`,
  scheme: [['Path length adds every leg: 640 + 260 + 350', 1], [`${wk.path} m`, 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => [wk.e1, wk.w, wk.e2].reduce((a, b) => a + b, 0) === q.answer.value && wk.disp === 730 || 'wk');
const pd = { x0: -35, x1: 20, x2: -10 };
pd.disp = pd.x2 - pd.x0;
pd.path = Math.abs(pd.x1 - pd.x0) + Math.abs(pd.x2 - pd.x1);
add('pathdisp-mcq', mcq({
  stem: 'A particle on the x-axis moves from x = −35 m to x = +20 m and then to x = −10 m. Its displacement and the path length covered are',
  right: `+${pd.disp} m and ${pd.path} m`,
  wrong: [`−${pd.disp} m and ${pd.path} m`, `+${pd.path} m and ${pd.disp} m`, `+${pd.disp} m and ${pd.disp} m`],
  sol: `Displacement = −10 − (−35) = +${pd.disp} m. Path length = |20 − (−35)| + |−10 − 20| = 55 + 30 = ${pd.path} m — option (@K).`,
  d: 3, c: 'application', t: [1],
}), () => pd.disp === 25 && pd.path === 85 || 'pd');
add('dispzero-ar', ar({
  a: 'A porter who walks 120 m along a platform from a train door to the exit gate and then back to the same door has zero displacement.',
  r: 'Displacement depends only on the initial and final positions of the body, not on the route followed.',
  key: 'a',
  sol: 'Both statements are true, and R explains A: start and finish coincide, so Δx = 0 even though the path length is 240 m — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('frame-short', short({
  marks: 2,
  stem: 'A coin lies on the floor of a coach moving steadily along a straight track. Describe the coin’s motion in two different frames of reference to show that rest and motion are relative.',
  model: 'For a passenger in the coach (frame fixed to the coach) the coin keeps the same position, so it is **at rest**. For a person on the platform (frame fixed to the ground) its position changes with time, so it is **moving** with the speed of the train. Motion has meaning only with respect to a chosen frame.',
  sol: 'Coach frame: rest. Ground frame: moving.',
  scheme: [['Coach frame: position unchanged, at rest', 1], ['Ground frame: position changes, moving; so motion is relative', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('pd-short', short({
  marks: 2,
  stem: 'Distinguish between path length and displacement for a body moving along a straight line, and give one example in which the path length is more than the magnitude of the displacement.',
  model: '**Path length** is the total length of the route covered, a scalar that is never negative. **Displacement** is final minus initial position: signed, and fixed by the end points only. Example: a lift rising 36 m and then coming down 15 m has path length 51 m but displacement 21 m upward.',
  sol: 'Route length vs change of position; example with turning back.',
  scheme: [['Path length: total route; displacement: final − initial position', 1], ['Valid example with a turn (path > |displacement|)', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ================================================================ t02 velocity and acceleration
const as = { d: 180, v1: 45, v2: 60 };
as.t1 = as.d / 2 / as.v1;
as.t2 = as.d / 2 / as.v2;
as.avg = as.d / (as.t1 + as.t2);
add('avgspeed-num', num({
  stem: 'A courier van covers the first half of a 180 km route at 45 km/h and the second half at 60 km/h. Find its average speed for the whole route, in km/h (3 significant figures).',
  value: v3(as.avg), tol: 0.1, unit: 'km/h',
  sol: r`Each half is $90$ km. $t_1 = \dfrac{90}{${as.v1}} = ${as.t1}$ h and $t_2 = \dfrac{90}{${as.v2}} = ${as.t2}$ h. Average speed $= \dfrac{180}{${as.t1} + ${as.t2}} = \dfrac{180}{${as.t1 + as.t2}} \approx ${dec(as.avg, 3)}$ km/h (not the mean of 45 and 60).`,
  scheme: [['t₁ = 2.0 h, t₂ = 1.5 h', 1], [`Average speed = total distance ÷ total time ≈ ${dec(as.avg, 3)} km/h`, 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(2 * as.v1 * as.v2 / (as.v1 + as.v2), q.answer.value, 0.003) || 'as');
const av = { e: 3000, w: 1000, t: 15 * 60 };
av.disp = av.e - av.w;
av.v = av.disp / av.t;
add('avgvel-num', num({
  stem: 'A cyclist rides 3.0 km east in 10 min and then 1.0 km west in 5 min. Find the magnitude of her average velocity over the whole 15 min, in m/s (3 significant figures).',
  value: v3(av.v), tol: 0.01, unit: 'm/s',
  sol: r`Net displacement $= 3000 - 1000 = ${av.disp}$ m east; total time $= 15 \times 60 = ${av.t}$ s. $\bar v = \dfrac{${av.disp}}{${av.t}} \approx ${dec(av.v, 3)}$ m/s (her average speed is larger: $4000/900 \approx 4.44$ m/s).`,
  scheme: [[`Displacement ${av.disp} m, time ${av.t} s`, 1], [`Average velocity ≈ ${dec(av.v, 3)} m/s`, 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near((3 - 1) * 1000 / (15 * 60), q.answer.value, 0.003) || 'av');
// x = 6t − 2t² + 0.5t³ (SI)
const px = { c1: 6, c2: -2, c3: 0.5, t: 2 };
px.x = (t) => px.c1 * t + px.c2 * t * t + px.c3 * t ** 3;
px.v = px.c1 + 2 * px.c2 * px.t + 3 * px.c3 * px.t ** 2;
px.a = 2 * px.c2 + 6 * px.c3 * px.t;
add('inst-num', num({
  stem: 'The position of a particle on the x-axis is x = 6t − 2t² + 0.5t³, with x in m and t in s. Find its velocity at t = 2.0 s, in m/s.',
  value: px.v, tol: 0.02, unit: 'm/s',
  sol: r`$v = \dfrac{dx}{dt} = 6 - 4t + 1.5t^2$. At $t = 2$ s: $v = 6 - 4 \times 2 + 1.5 \times 4 = ${px.v}$ m/s.`,
  scheme: [['v = dx/dt = 6 − 4t + 1.5t²', 1], [`v(2.0 s) = ${px.v} m/s`, 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(deriv(px.x, 2), q.answer.value, 1e-4) || 'inst');
add('instacc-num', num({
  stem: 'For the same particle (x = 6t − 2t² + 0.5t³ in SI units), find its acceleration at t = 2.0 s, in m/s².',
  value: px.a, tol: 0.02, unit: 'm/s²',
  sol: r`$a = \dfrac{dv}{dt} = -4 + 3t$. At $t = 2$ s: $a = -4 + 3 \times 2 = ${px.a}$ m/s$^2$.`,
  scheme: [[`a = dv/dt = −4 + 3t = ${px.a} m/s² at t = 2.0 s`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => near(deriv((t) => deriv(px.x, t, 1e-3), 2, 1e-3), q.answer.value, 1e-3) || 'instacc');
add('neverrest-mcq', mcq({
  stem: 'A particle moves along the x-axis with x = 6t − 2t² + 0.5t³ (SI units) for t ≥ 0. Which statement about it is correct?',
  right: 'Its velocity is never zero, so it never turns back',
  wrong: ['It is momentarily at rest at t = 2 s', 'It is momentarily at rest at t = 4 s', 'Its acceleration is the same at all times'],
  sol: r`$v = 6 - 4t + 1.5t^2$ has discriminant $16 - 36 < 0$, so $v$ never vanishes ($v(2) = 4$ m/s, $v(4) = 14$ m/s); $a = -4 + 3t$ changes with time — option (@K).`,
  d: 4, c: 'analysis', t: [2],
}), () => 16 - 4 * 1.5 * 6 < 0 && px.v === 4 && [0, 1, 2, 3, 4, 5].every((t) => 6 - 4 * t + 1.5 * t * t > 0) || 'neverrest');
const aa = { v1: 7.2, v2: 36, t: 4.0 };
aa.u = R6(aa.v1 / 3.6);
aa.w = R6(aa.v2 / 3.6);
aa.a = (aa.w - aa.u) / aa.t;
add('avgacc-num', num({
  stem: 'A tram in Kolkata speeds up from 7.2 km/h to 36 km/h in 4.0 s along a straight street. Find its average acceleration, in m/s² (2 significant figures).',
  value: v3(aa.a), tol: 0.01, unit: 'm/s²',
  sol: r`$7.2$ km/h $= ${R6(aa.u)}$ m/s and $36$ km/h $= ${R6(aa.w)}$ m/s. $\bar a = \dfrac{${R6(aa.w)} - ${R6(aa.u)}}{${aa.t}} = ${dec(aa.a, 2)}$ m/s$^2$.`,
  scheme: [['Convert: 7.2 km/h = 2.0 m/s, 36 km/h = 10 m/s', 1], [`ā = Δv/Δt = ${dec(aa.a, 2)} m/s²`, 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near((36 * 1000 / 3600 - 7.2 * 1000 / 3600) / 4, q.answer.value, 0.003) || 'aa');
add('decel-mcq', mcq({
  stem: 'A truck moves east along a straight highway while its speed falls steadily as the driver brakes. The direction of its acceleration is',
  right: 'west, opposite to its velocity',
  wrong: ['east, along its velocity', 'zero, because it moves along a straight line', 'vertically downward'],
  sol: 'Velocity points east and its magnitude decreases, so the change in velocity (and hence the acceleration) points west — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('speedo-mcq', mcq({
  stem: 'The speedometer of a motorbike reads 48 km/h at one instant of a ride. This reading is the bike’s',
  right: 'instantaneous speed at that instant',
  wrong: ['average velocity over the last minute', 'displacement per hour since the start', 'acceleration at that instant'],
  sol: 'A speedometer shows the magnitude of the instantaneous velocity, that is, the instantaneous speed — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('avgspd-tf', tf({
  stem: 'If the average velocity of a body over some time interval is zero, its average speed over that interval must also be zero.',
  key: 'f',
  sol: 'False. A body that returns to its starting point has zero displacement and so zero average velocity, but its path length, and hence its average speed, is not zero.',
  d: 2, c: 'understanding', t: [2],
}));
add('acc-fill', fill({
  stem: 'For a lift pulling away from the ground floor, the rate at which its velocity changes with time is called its ___.',
  acc: [['acceleration']],
  sol: 'The **acceleration**, a = dv/dt.',
  d: 1, c: 'recall', t: [2],
}));
add('zeroacc-ar', ar({
  a: 'A body whose velocity is zero at some instant must also have zero acceleration at that instant.',
  r: 'Acceleration is the rate of change of velocity, not of position.',
  key: 'd',
  sol: 'R is true. A is false: a stone thrown upward has v = 0 at the top but its velocity is still changing (a = 9.8 m/s² downward) — option (d).',
  d: 2, c: 'understanding', t: [2],
}));
add('avgacc-ar', ar({
  a: 'The average acceleration of a body over an interval is its change in velocity divided by the length of the interval.',
  r: 'Acceleration is measured in metre per second squared in the SI system.',
  key: 'b',
  sol: 'Both are true, but the unit of acceleration does not explain how it is defined — option (b).',
  d: 1, c: 'understanding', t: [2],
}));
add('instv-mcq', mcq({
  stem: 'On the position–time graph of a scooter moving along a straight road, the velocity of the scooter at t = 20 s is given by',
  right: 'the slope of the tangent to the curve at t = 20 s',
  wrong: ['the area under the curve up to t = 20 s', 'the height of the curve at t = 20 s', 'the slope of the chord from t = 0 to t = 20 s'],
  sol: 'Instantaneous velocity is dx/dt, the slope of the tangent at that instant; the chord gives only the average velocity over an interval — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('inst-short', short({
  marks: 2,
  stem: 'Define instantaneous velocity and explain how it can be obtained from the position–time graph of a body moving along a line.',
  model: '**Instantaneous velocity** is the limit of the average velocity Δx/Δt as the interval Δt tends to zero, that is **dx/dt**. On an x–t graph, the chord between two points gives the average velocity; as one point moves towards the other the chord becomes the **tangent**, whose slope at that point is the instantaneous velocity.',
  sol: 'Limit of Δx/Δt; slope of tangent.',
  scheme: [['Definition: lim Δx/Δt = dx/dt', 1], ['Slope of the tangent on the x–t graph', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('avgvsspeed-short', short({
  marks: 2,
  stem: 'Explain why the average speed of a body over an interval can be greater than the magnitude of its average velocity but can never be smaller.',
  model: 'Average speed is **path length ÷ time** and the magnitude of average velocity is **|displacement| ÷ time**. The path length is always at least as large as the magnitude of the displacement, so the average speed is never smaller. It is larger when the body turns back, and equal when it moves in one direction only.',
  sol: 'Path length ≥ |displacement|.',
  scheme: [['Average speed = path/time; |v̄| = |displacement|/time', 1], ['Path ≥ |displacement|; equal only without turning back', 1]],
  d: 3, c: 'understanding', t: [2],
}));
add('zerov-short3', short({
  marks: 3,
  stem: 'A ball thrown vertically upward has zero velocity at the highest point of its flight. Is its acceleration zero there? Explain, and state how the signs of velocity and acceleration show whether a body is speeding up or slowing down.',
  model: 'The acceleration is **not zero**: it is g = 9.8 m/s² downward, because the velocity is still changing; at the top the velocity merely passes through zero while changing from upward to downward. Along a line, a body **speeds up** when velocity and acceleration have the **same sign** and **slows down** when their signs are **opposite**; on the way up v is positive and a negative, so the ball slows down.',
  sol: 'a = g at the top; sign rule.',
  scheme: [['Acceleration is not zero: 9.8 m/s² downward at the top', 1], ['Velocity is changing, only momentarily zero', 1], ['Same sign: speeding up; opposite signs: slowing down', 1]],
  d: 3, c: 'understanding', t: [2, 3],
}));
add('chord-short3', short({
  marks: 3,
  stem: 'On a position–time graph of a car on a straight road, how would you find (a) its average velocity between two instants and (b) its velocity at one instant? Explain how (b) is the limiting case of (a).',
  model: '(a) Join the two points on the curve by a **chord**; its slope Δx/Δt is the **average velocity** over that interval. (b) Draw the **tangent** at the point; its slope is the velocity at that instant. If the second point is brought closer to the first, Δt → 0 and the chord turns into the tangent, so dx/dt is the limit of Δx/Δt.',
  sol: 'Chord vs tangent; limit Δt → 0.',
  scheme: [['Average velocity = slope of the chord', 1], ['Instantaneous velocity = slope of the tangent', 1], ['Tangent is the limit of the chord as Δt → 0', 1]],
  d: 3, c: 'understanding', t: [2],
}));
// x = t³ − 6t² + 9t, 0 to 4 s
const cs = { T: 4 };
cs.x = (t) => t ** 3 - 6 * t ** 2 + 9 * t;
cs.t1 = 1;
cs.t2 = 3;
cs.path = Math.abs(cs.x(cs.t1) - cs.x(0)) + Math.abs(cs.x(cs.t2) - cs.x(cs.t1)) + Math.abs(cs.x(cs.T) - cs.x(cs.t2));
cs.disp = cs.x(cs.T) - cs.x(0);
cs.sbar = cs.path / cs.T;
add('cubicspeed-num', num({
  stem: 'A particle moves on the x-axis with x = t³ − 6t² + 9t (x in m, t in s). Find its average speed during the first 4.0 s, in m/s.',
  value: cs.sbar, tol: 0.02, unit: 'm/s',
  sol: r`$v = 3t^2 - 12t + 9 = 3(t-1)(t-3)$ vanishes at $t = 1$ s and $3$ s. $x(0) = 0$, $x(1) = ${cs.x(1)}$ m, $x(3) = ${cs.x(3)}$ m, $x(4) = ${cs.x(4)}$ m. Path length $= ${cs.x(1)} + ${cs.x(1) - cs.x(3)} + ${cs.x(4) - cs.x(3)} = ${cs.path}$ m (displacement only ${cs.disp} m). Average speed $= \dfrac{${cs.path}}{${cs.T}} = ${cs.sbar}$ m/s.`,
  scheme: [[`Turning instants t = 1 s and 3 s; path length = ${cs.x(1)} + ${cs.x(1) - cs.x(3)} + ${cs.x(4) - cs.x(3)} = ${cs.path} m`, 1], [`Average speed = ${cs.path}/${cs.T} = ${cs.sbar} m/s`, 1]],
  marks: 2, d: 4, c: 'analysis', t: [2],
}), (q) => near(pathLength(cs.x, 0, cs.T) / cs.T, q.answer.value, 1e-4) && cs.disp === 4 || 'cs');
// a = 6 − 2t, starting from rest at x = 0
const ct = { a0: 6, k: 2, t: 2 };
ct.v = ct.a0 * ct.t - (ct.k * ct.t ** 2) / 2;
add('calcvel-num', num({
  stem: 'A cart on a straight track starts from rest and has an acceleration a = 6 − 2t (SI units). Find its velocity at t = 2.0 s, in m/s.',
  value: ct.v, tol: 0.02, unit: 'm/s',
  sol: r`$v = \int_0^t a\,dt = 6t - t^2$. At $t = 2$ s: $v = 6 \times 2 - 2^2 = ${ct.v}$ m/s.`,
  scheme: [['v = ∫a dt = 6t − t² (v = 0 at t = 0)', 1], [`v(2.0 s) = ${ct.v} m/s`, 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(integ((t) => 6 - 2 * t, 0, 2), q.answer.value, 1e-6) || 'ct');
const cx = { t: 3 };
cx.x = 3 * cx.t ** 2 - cx.t ** 3 / 3;
add('calcpos-num', num({
  stem: 'For the same cart (a = 6 − 2t in SI units, starting from rest at x = 0), find its displacement in the first 3.0 s, in m.',
  value: cx.x, tol: 0.05, unit: 'm',
  sol: r`$v = 6t - t^2$, so $x = \int_0^t v\,dt = 3t^2 - \dfrac{t^3}{3}$. At $t = 3$ s: $x = 27 - 9 = ${cx.x}$ m.`,
  scheme: [['x = ∫v dt = 3t² − t³/3', 1], [`x(3.0 s) = 27 − 9 = ${cx.x} m`, 1]],
  marks: 2, d: 4, c: 'application', t: [2],
}), (q) => near(integ((t) => 6 * t - t * t, 0, 3), q.answer.value, 1e-6) || 'cx');

await import('./questions-t3.mjs');
await import('./questions-t4.mjs');
await import('./questions-long.mjs');
void root;
void long;
void match;
void part;
