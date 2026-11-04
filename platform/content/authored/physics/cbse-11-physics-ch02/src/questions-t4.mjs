// ch02 question bank, part 3: t04 (position–time, velocity–time and acceleration–time graphs).
import { mk, add, r, dec, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { integ, pwl, pathLength } from './phys.mjs';

const { mcq, ar, tf, match, num, short } = mk;
const v3 = (x) => Number(dec(x, 3));

add('xtflat-mcq', mcq({
  stem: 'On the position–time graph of an auto-rickshaw parked outside a station, the line drawn for the auto is horizontal, parallel to the time axis. This shows that',
  right: 'its position does not change with time: it is at rest',
  wrong: ['it moves with a constant velocity', 'it moves with a constant acceleration', 'its velocity is increasing steadily'],
  sol: 'The slope of an x–t graph is the velocity; a horizontal line has zero slope, so the velocity is zero and the position is constant — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
const mv = { v: 16, t1: 8, t2: 40, t3: 12 };
mv.s1 = 0.5 * mv.t1 * mv.v;
mv.s2 = mv.v * mv.t2;
mv.s3 = 0.5 * mv.t3 * mv.v;
mv.tot = mv.s1 + mv.s2 + mv.s3;
mv.a3 = mv.v / mv.t3;
add('vtarea-num', num({
  stem: 'The velocity–time graph of a metro train between two stations is a trapezoid: a straight rise from 0 to 16 m/s in 8 s, a horizontal line for 40 s, then a straight fall to zero in 12 s. Find the distance between the stations, in m.',
  value: mv.tot, tol: 1, unit: 'm',
  sol: r`Distance = area under the graph. Rising part: $\tfrac{1}{2} \times ${mv.t1} \times ${mv.v} = ${mv.s1}$ m; steady part: $${mv.v} \times ${mv.t2} = ${mv.s2}$ m; falling part: $\tfrac{1}{2} \times ${mv.t3} \times ${mv.v} = ${mv.s3}$ m. Total $= ${mv.s1} + ${mv.s2} + ${mv.s3} = ${mv.tot}$ m.`,
  scheme: [[`Triangles: ${mv.s1} m and ${mv.s3} m`, 1], [`Rectangle ${mv.s2} m; total = ${mv.tot} m`, 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near(integ(pwl([[0, 0], [8, 16], [48, 16], [60, 0]]), 0, 60, 6000), q.answer.value, 1e-6) || 'mv');
add('retardvt-num', num({
  stem: 'For the same metro train (speed 16 m/s falling uniformly to zero in the last 12 s), find the magnitude of the retardation during the last 12 s, in m/s² (3 significant figures).',
  value: v3(mv.a3), tol: 0.01, unit: 'm/s²',
  sol: r`The magnitude of the slope of the falling line is $\left|\dfrac{\Delta v}{\Delta t}\right| = \dfrac{16}{12} \approx ${dec(mv.a3, 3)}$ m/s$^2$.`,
  scheme: [[`Retardation = |slope| = 16/12 ≈ ${dec(mv.a3, 3)} m/s²`, 1]],
  d: 2, c: 'application', t: [4],
}), (q) => near(Math.abs(pwl([[48, 16], [60, 0]])(60) - pwl([[48, 16], [60, 0]])(48)) / 12, q.answer.value, 0.004) || 'a3');
add('xtshape-match', match({
  stem: 'A cyclist’s position–time graph on a straight road is drawn in four different ways (Column A). Match each drawing with what the cyclist is doing (Column B).',
  pairs: [
    ['A straight line sloping upward', 'Moving with uniform velocity along +x'],
    ['A horizontal straight line', 'At rest'],
    ['A curve that gets steeper with time', 'Speeding up'],
    ['A straight line sloping downward', 'Moving with uniform velocity along −x'],
  ],
  order: [2, 1, 3, 0],
  marks: 2,
  sol: 'The slope of an x–t graph is the velocity: positive constant slope — uniform velocity along +x; zero slope — rest; slope increasing — speeding up; negative constant slope — uniform velocity along −x.',
  d: 2, c: 'understanding', t: [4],
}));
const tr = { u: 8, a: -2.5, T: 6 };
tr.tstop = -tr.u / tr.a;
tr.up = (tr.u * tr.tstop) / 2;
tr.vend = tr.u + tr.a * tr.T;
tr.down = (0.5 * (tr.T - tr.tstop) * Math.abs(tr.vend));
tr.disp = tr.up - tr.down;
tr.path = tr.up + tr.down;
add('trolley-num', num({
  stem: 'A ball rolling in a straight groove has velocity +8.0 m/s at t = 0 and a constant acceleration of −2.5 m/s² (SI units). Using the v–t graph, find its displacement in the first 6.0 s, in m.',
  value: v3(tr.disp), tol: 0.05, unit: 'm',
  sol: r`$v = 0$ at $t = \dfrac{8.0}{2.5} = ${tr.tstop}$ s; area above the axis $= \tfrac{1}{2} \times ${tr.tstop} \times 8.0 = ${tr.up}$ m. At $t = 6$ s, $v = 8.0 - 2.5 \times 6 = ${tr.vend}$ m/s; area below the axis $= \tfrac{1}{2} \times ${dec(tr.T - tr.tstop, 3)} \times ${-tr.vend} = ${dec(tr.down, 3)}$ m. Displacement $= ${tr.up} - ${dec(tr.down, 3)} = ${dec(tr.disp, 3)}$ m.`,
  scheme: [[`Area above the axis ${tr.up} m (0 to ${tr.tstop} s)`, 1], [`Area below the axis ${dec(tr.down, 3)} m (negative)`, 1], [`Displacement = ${dec(tr.up, 3)} − ${dec(tr.down, 3)} = ${dec(tr.disp, 3)} m`, 1]],
  marks: 3, d: 4, c: 'analysis', t: [4],
}), (q) => near(integ((t) => tr.u + tr.a * t, 0, tr.T), q.answer.value, 1e-6) && near(tr.u * tr.T + 0.5 * tr.a * tr.T ** 2, q.answer.value, 1e-9) || 'tr');
add('vtline-mcq', mcq({
  stem: 'A toy car starts from rest and its velocity–time graph is a straight line through the origin. Its position–time graph is',
  right: 'a curve that gets steeper with time, starting with zero slope',
  wrong: ['a straight line through the origin', 'a horizontal line', 'a curve that gets less steep with time'],
  sol: r`A straight v–t line through the origin means $v = at$, so $x = \tfrac{1}{2}at^2$: a parabola whose slope $v$ keeps increasing from zero — option (@K).`,
  d: 3, c: 'analysis', t: [4],
}));
add('vtslope-mcq', mcq({
  stem: 'The velocity–time graph of a trolley is a straight line that slopes downward but stays above the time axis for the whole time of interest. The trolley is',
  right: 'moving in the positive direction while slowing down, with constant negative acceleration',
  wrong: ['moving in the negative direction while speeding up', 'at rest', 'moving in the positive direction while speeding up'],
  sol: 'v stays positive, so it moves in the +x direction; the slope (acceleration) is negative and constant, and v decreases, so it slows down — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('areavt-ar', ar({
  a: 'The area between an acceleration–time graph and the time axis gives the change in velocity of the body.',
  r: 'The area under any velocity–time graph gives the total path length, even when the velocity changes sign.',
  key: 'c',
  sol: 'A is true: Δv = ∫a dt. R is false: the signed area gives the displacement; areas below the axis count negative, so path length needs the unsigned areas — option (c).',
  d: 3, c: 'understanding', t: [4],
}));
const ac = { a1: 2.0, t1: 5, a2: 1.0, t2: 6 };
ac.v = ac.a1 * ac.t1 + ac.a2 * ac.t2;
add('at-num', num({
  stem: 'A car starts from rest on a straight road. Its acceleration is 2.0 m/s² for the first 5.0 s and then 1.0 m/s² for the next 6.0 s. Using the area under the acceleration–time graph, find its speed at the end of the 11 s, in m/s.',
  value: ac.v, tol: 0.05, unit: 'm/s',
  sol: r`Change in velocity = area under the a–t graph $= ${ac.a1} \times ${ac.t1} + ${ac.a2} \times ${ac.t2} = ${ac.a1 * ac.t1} + ${ac.a2 * ac.t2} = ${ac.v}$ m/s. Starting from rest, the speed is $${ac.v}$ m/s.`,
  scheme: [[`Areas: ${ac.a1 * ac.t1} and ${ac.a2 * ac.t2} (m/s)`, 1], [`Speed = ${ac.v} m/s`, 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near(integ((t) => (t < 5 ? 2.0 : 1.0), 0, 11, 11000), q.answer.value, 1e-3) || 'ac');
const wl = { knots: [[0, 0], [20, 60], [35, 60], [65, 0]] };
wl.path = 60 + 60;
wl.T = 65;
wl.sbar = wl.path / wl.T;
add('walker-num', num({
  stem: 'A walker’s position–time graph is made of three straight pieces: from x = 0 at t = 0 to x = 60 m at t = 20 s, flat until t = 35 s, then back to x = 0 at t = 65 s. Find her average speed over the whole 65 s, in m/s (3 significant figures).',
  value: v3(wl.sbar), tol: 0.01, unit: 'm/s',
  sol: r`Path length $= 60 + 60 = ${wl.path}$ m (out and back; the flat part adds nothing). Average speed $= \dfrac{${wl.path}}{${wl.T}} \approx ${dec(wl.sbar, 3)}$ m/s. (Her average velocity is zero: she returns to the start.)`,
  scheme: [[`Path length = ${wl.path} m`, 1], [`Average speed = ${wl.path}/${wl.T} ≈ ${dec(wl.sbar, 3)} m/s`, 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => { const f = pwl(wl.knots); return near(pathLength(f, 0, 65) / 65, q.answer.value, 0.004) || 'wl'; });
add('areatf-tf', tf({
  stem: 'The area between the velocity–time graph and the time axis of a body that moves forward and then backward along a line always equals the total path length it has covered.',
  key: 'f',
  sol: 'False. The area gives the displacement when areas below the axis (backward motion) are counted negative; the path length is the sum of the unsigned areas.',
  d: 2, c: 'understanding', t: [4],
}));
add('graph-short', short({
  marks: 2,
  stem: 'From the slope of a position–time graph, how can you tell whether a body is moving in the positive or the negative direction, and whether it is speeding up?',
  model: 'The slope of an x–t graph is the **velocity**: a **positive** slope means motion along +x and a **negative** slope motion along −x. If the slope becomes **steeper** with time (in magnitude), the speed is increasing, so the body is speeding up; if the slope flattens, it is slowing down.',
  sol: 'Sign of slope; change in steepness.',
  scheme: [['Positive slope: +x; negative slope: −x', 1], ['Steeper: speeding up; flatter: slowing down', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('signedarea-short', short({
  marks: 2,
  stem: 'When a velocity–time graph crosses the time axis, why is the area below the axis taken as negative for the displacement but positive for the path length?',
  model: 'Below the axis the velocity is **negative**, so that part of the motion is **backward** and subtracts from the displacement, which is a signed quantity. The path length counts the **total distance travelled** regardless of direction, so the areas above and below the axis are added without signs.',
  sol: 'Displacement is signed; path length is not.',
  scheme: [['Below the axis v < 0: backward motion reduces the displacement', 1], ['Path length adds the magnitudes of all areas', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('vt-short3', short({
  marks: 3,
  stem: 'A ball is thrown vertically upward and caught at the level of release. Describe its velocity–time graph and use it to explain the signs of velocity and acceleration and why the total displacement is zero.',
  model: 'Taking up as positive, the graph is a **single straight line** of slope −g, starting at +u, crossing zero at the top, and ending at −u. The acceleration is **negative throughout**, while the velocity is positive on the way up and negative on the way down. The two triangles, above and below the axis, have **equal areas**, so the signed area, the displacement, is **zero**.',
  sol: 'Straight line of slope −g; equal areas above and below.',
  scheme: [['One straight line from +u to −u with slope −g', 1], ['Velocity positive then negative; acceleration negative throughout', 1], ['Equal areas above and below: displacement zero', 1]],
  d: 3, c: 'understanding', t: [4, 3],
}));
