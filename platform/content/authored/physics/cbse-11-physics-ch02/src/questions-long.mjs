// ch02 question bank, part 4: long answers (5 marks) and case-based items (4 marks: 1 + 1 + 2 with an either/or part (c)).
import { mk, add, r, dec, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { g, integ, pathLength, pwl, root } from './phys.mjs';

const { mcq, num, short, long, part } = mk;
const v3 = (x) => Number(dec(x, 3));
const R6 = (x) => Math.round(x * 1e6) / 1e6;
const mn = (x) => String(x).replace('-', '−'); // proper minus sign in printed schemes

// ================================================================ long answers
const tx = { e: 5.0, tE: 12, wait: 3, w: 2.0, tW: 6 };
tx.T = (tx.tE + tx.wait + tx.tW) / 60; // h
tx.path = tx.e + tx.w;
tx.disp = tx.e - tx.w;
tx.vs = tx.path / tx.T;
tx.vv = tx.disp / tx.T;
tx.v1 = tx.e / (tx.tE / 60);
tx.v2 = tx.w / (tx.tW / 60);
add('path-long', long({
  stem: '(a) Define path length and displacement and say how they differ. (b) A taxi on a straight road goes 5.0 km east in 12 min, waits 3 min at a signal and then goes 2.0 km west in 6 min. For the whole 21 min find (i) the path length, (ii) the displacement, (iii) the average speed and (iv) the magnitude of the average velocity, in km/h where needed. (c) Explain why the average speed is not the mean of the speeds on the separate legs.',
  model: r`(a) **Path length** is the total length of the route actually covered; it is a scalar and never negative. **Displacement** is the final position minus the initial position; it is signed and depends only on the end points, so its magnitude is never more than the path length.

(b) Total time $= 12 + 3 + 6 = 21$ min $= ${dec(tx.T, 3)}$ h. (i) Path length $= ${tx.e} + ${tx.w} = ${tx.path}$ km. (ii) Displacement $= ${tx.e} - ${tx.w} = ${tx.disp}$ km east. (iii) Average speed $= \dfrac{${tx.path}}{${dec(tx.T, 3)}} = ${dec(tx.vs, 3)}$ km/h. (iv) Average velocity $= \dfrac{${tx.disp}}{${dec(tx.T, 3)}} \approx ${dec(tx.vv, 3)}$ km/h east.

(c) The speeds on the legs are ${dec(tx.v1, 3)} km/h and ${dec(tx.v2, 3)} km/h, but the taxi also spends time at rest. Average speed is the **total path divided by the total time**, so each leg counts in proportion to the time spent on it, and the waiting time counts too.`,
  sol: 'Definitions; path 7.0 km, displacement 3.0 km; 20.0 km/h and 8.57 km/h; time-weighted average.',
  scheme: [['Definitions and the difference between them', 1], [`Path length ${tx.path} km and displacement ${tx.disp} km`, 1], [`Average speed = ${tx.path}/${dec(tx.T, 3)} = ${dec(tx.vs, 3)} km/h`, 1], [`Average velocity = ${tx.disp}/${dec(tx.T, 3)} ≈ ${dec(tx.vv, 3)} km/h`, 1], ['Average speed is total path ÷ total time, not the mean of leg speeds', 1]],
  d: 3, c: 'application', t: [1, 2], wl: null,
}), () => near(tx.vs, 20, 1e-9) && near(tx.vv, 3 / 0.35, 1e-9) && near(tx.T, 0.35, 1e-9) || 'tx');
// x = 2t³ − 15t² + 24t
const cl = { T: 5 };
cl.x = (t) => 2 * t ** 3 - 15 * t ** 2 + 24 * t;
cl.v = (t) => 6 * t ** 2 - 30 * t + 24;
cl.a = (t) => 12 * t - 30;
cl.r1 = Math.round(root(cl.v, 0, 2.5) * 1e6) / 1e6;
cl.r2 = Math.round(root(cl.v, 2.5, 5) * 1e6) / 1e6;
cl.x1 = cl.x(cl.r1);
cl.x2 = cl.x(cl.r2);
cl.x5 = cl.x(cl.T);
cl.disp = cl.x5 - cl.x(0);
cl.path = Math.abs(cl.x1) + Math.abs(cl.x2 - cl.x1) + Math.abs(cl.x5 - cl.x2);
cl.vbar = cl.disp / cl.T;
cl.sbar = cl.path / cl.T;
add('calc-long', long({
  stem: 'The position of a particle moving on the x-axis is x = 2t³ − 15t² + 24t, with x in m and t in s. (a) Obtain expressions for its velocity and acceleration. (b) At what instants is it momentarily at rest, and where is it then? (c) Find its displacement and the path length covered in the first 5.0 s. (d) Find its average velocity and average speed over these 5.0 s. (e) What is its acceleration at each instant of rest?',
  model: r`(a) $v = \dfrac{dx}{dt} = 6t^2 - 30t + 24$ and $a = \dfrac{dv}{dt} = 12t - 30$.

(b) $v = 6(t-1)(t-4) = 0$ at $t = ${cl.r1}$ s and $t = ${cl.r2}$ s. There $x(${cl.r1}) = ${cl.x1}$ m and $x(${cl.r2}) = ${cl.x2}$ m.

(c) $x(0) = 0$ and $x(5) = ${cl.x5}$ m, so the displacement is $${cl.disp}$ m. The path length is $${cl.x1} + ${cl.x1 - cl.x2} + ${cl.x5 - cl.x2} = ${cl.path}$ m (forward 11 m, back 27 m, forward 11 m).

(d) $\bar v = \dfrac{${cl.disp}}{5} = ${dec(cl.vbar, 2)}$ m/s; average speed $= \dfrac{${cl.path}}{5} = ${dec(cl.sbar, 2)}$ m/s.

(e) $a(${cl.r1}) = 12 \times ${cl.r1} - 30 = ${cl.a(cl.r1)}$ m/s$^2$ and $a(${cl.r2}) = 12 \times ${cl.r2} - 30 = ${cl.a(cl.r2)}$ m/s$^2$.`,
  sol: 'v and a by differentiation; rest at 1 s and 4 s; displacement −5 m, path 49 m; averages; accelerations ∓18 m/s².',
  scheme: [['v = 6t² − 30t + 24 and a = 12t − 30', 1], [`Rest at t = ${cl.r1} s (x = ${cl.x1} m) and t = ${cl.r2} s (x = ${mn(cl.x2)} m)`, 1], [`Displacement ${mn(cl.disp)} m; path length ${cl.path} m`, 1], [`Average velocity ${mn(dec(cl.vbar, 2))} m/s; average speed ${dec(cl.sbar, 2)} m/s`, 1], [`a = ${mn(cl.a(cl.r1))} m/s² and ${cl.a(cl.r2)} m/s² at the two instants of rest`, 1]],
  d: 4, c: 'application', t: [2], wl: null,
}), () => near(pathLength(cl.x, 0, cl.T), cl.path, 1e-5) && cl.r1 === 1 && cl.r2 === 4 && cl.disp === -5 && cl.path === 49 && near(integ(cl.v, 0, 5), cl.disp, 1e-9) || 'cl');
const dv = { kmh: 36, a: 0.5, t: 20 };
dv.u = dv.kmh / 3.6;
dv.v = dv.u + dv.a * dv.t;
dv.s = dv.u * dv.t + 0.5 * dv.a * dv.t ** 2;
add('derive-long', long({
  stem: '(a) For a body moving with constant acceleration, derive v = u + at and s = ut + ½at² using the velocity–time graph. (b) Derive v² = u² + 2as. (c) A train running at 36 km/h accelerates uniformly at 0.50 m/s² for 20 s. Find its final speed in m/s and in km/h, and the distance covered in this time.',
  model: r`(a) The v–t graph is a straight line from $u$ to $v$. Its slope is $a = \dfrac{v - u}{t}$, so $v = u + at$. The area under it is the displacement: rectangle $ut$ plus triangle $\tfrac{1}{2}(v - u)t$, and $v - u = at$, so $s = ut + \tfrac{1}{2}at^2$.

(b) From $v = u + at$, $t = \dfrac{v - u}{a}$; put in $s = \tfrac{1}{2}(u + v)t$ to get $2as = v^2 - u^2$, that is $v^2 = u^2 + 2as$.

(c) $u = 36$ km/h $= ${dv.u}$ m/s. $v = u + at = ${dv.u} + ${dv.a} \times ${dv.t} = ${dv.v}$ m/s $= ${dv.v * 3.6}$ km/h. $s = ut + \tfrac{1}{2}at^2 = ${dv.u} \times ${dv.t} + \tfrac{1}{2} \times ${dv.a} \times ${dv.t ** 2} = ${dv.s}$ m.`,
  sol: 'Graph derivations; v² = u² + 2as; 20 m/s = 72 km/h and 300 m.',
  scheme: [['Slope of the v–t line gives v = u + at', 1], ['Area (rectangle + triangle) gives s = ut + ½at²', 1], ['Elimination of t gives v² = u² + 2as', 1], [`Final speed ${dv.v} m/s = ${dv.v * 3.6} km/h`, 1], [`Distance ${dv.s} m`, 1]],
  d: 3, c: 'understanding', t: [3], wl: null,
}), () => near(dv.v, 20, 1e-9) && near(dv.s, 300, 1e-9) && near(((dv.u + dv.v) / 2) * dv.t, dv.s, 1e-9) || 'dv');
const br = { u: 14.7, h: 30 };
br.H = br.u ** 2 / (2 * g);
br.tH = R6(br.u / g);
br.tback = 2 * br.tH;
br.vw = Math.sqrt(br.u ** 2 + 2 * g * br.h);
br.tdown = (br.vw - br.u) / g;
br.T = br.tback + br.tdown;
add('bridge-long', long({
  stem: 'A stone is thrown vertically upward at 14.7 m/s from a bridge that is 30 m above the water of a river. Take g = 9.8 m/s² and neglect air resistance. Find (a) the greatest height above the bridge that the stone reaches, (b) the time after which it is back at the level of the bridge and its velocity then, (c) its speed as it reaches the water and (d) the total time from the throw until it hits the water.',
  model: r`Take up as positive, $a = -g$.

(a) At the top $v = 0$: $H = \dfrac{u^2}{2g} = \dfrac{${dec(br.u ** 2, 5)}}{19.6} \approx ${dec(br.H, 3)}$ m above the bridge.

(b) Rise time $= \dfrac{u}{g} = ${br.tH}$ s, so the stone is back at bridge level after $${br.tback}$ s, moving down at $${br.u}$ m/s.

(c) From the bridge level downward 30 m: $v^2 = u^2 + 2gh = ${dec(br.u ** 2, 5)} + 2 \times 9.8 \times 30 = ${dec(br.u ** 2 + 2 * g * br.h, 5)}$, so $v = \sqrt{${dec(br.u ** 2 + 2 * g * br.h, 5)}} \approx ${dec(br.vw, 3)}$ m/s.

(d) After returning to the bridge level it takes $\dfrac{${dec(br.vw, 4)} - ${br.u}}{9.8} \approx ${dec(br.tdown, 3)}$ s more, so the total time is $${br.tback} + ${dec(br.tdown, 3)} \approx ${dec(br.T, 3)}$ s.`,
  sol: 'H = u²/2g; symmetric time 3.0 s; v² = u² + 2gh; total time.',
  scheme: [[`H ≈ ${dec(br.H, 3)} m`, 1], [`Back at bridge level after ${br.tback} s with speed ${br.u} m/s downward`, 1], [`Speed at the water ≈ ${dec(br.vw, 3)} m/s`, 1], [`Time from bridge level to water ≈ ${dec(br.tdown, 3)} s`, 1], [`Total time ≈ ${dec(br.T, 3)} s`, 1]],
  d: 4, c: 'application', t: [3], wl: null,
}), () => near(root((t) => 30 + 14.7 * t - 0.5 * g * t * t, 2, 10), br.T, 1e-6) && near(Math.abs(14.7 - g * br.T), br.vw, 1e-6) && near(br.H, 11.025, 1e-9) || 'br');
const gr = { v: 24, t1: 120, t2: 300, t3: 80 };
gr.a1 = gr.v / gr.t1;
gr.a3 = -gr.v / gr.t3;
gr.s1 = 0.5 * gr.t1 * gr.v;
gr.s2 = gr.v * gr.t2;
gr.s3 = 0.5 * gr.t3 * gr.v;
gr.s = gr.s1 + gr.s2 + gr.s3;
gr.T = gr.t1 + gr.t2 + gr.t3;
gr.vs = gr.s / gr.T;
add('graph-long', long({
  stem: 'The velocity–time graph of a train between two stations is a trapezoid: a straight rise from zero to 24 m/s in 120 s, a horizontal line for 300 s and a straight fall to zero in 80 s. (a) Find the acceleration in each of the three stages. (b) Find the distance between the stations. (c) Find the average speed for the whole journey. (d) Describe the shape of the corresponding position–time graph in each stage.',
  model: r`(a) Slopes: stage 1 $a = \dfrac{24}{120} = ${dec(gr.a1, 2)}$ m/s$^2$; stage 2 $a = 0$; stage 3 $a = \dfrac{0 - 24}{80} = ${dec(gr.a3, 2)}$ m/s$^2$.

(b) Areas: $\tfrac{1}{2} \times 120 \times 24 = ${gr.s1}$ m; $24 \times 300 = ${gr.s2}$ m; $\tfrac{1}{2} \times 80 \times 24 = ${gr.s3}$ m. Distance $= ${gr.s1} + ${gr.s2} + ${gr.s3} = ${gr.s}$ m $= ${gr.s / 1000}$ km.

(c) Total time $= 120 + 300 + 80 = ${gr.T}$ s, so average speed $= \dfrac{${gr.s}}{${gr.T}} = ${dec(gr.vs, 3)}$ m/s.

(d) Stage 1: a parabola curving upward (slope increasing from zero); stage 2: a straight sloping line (slope 24 m/s); stage 3: a parabola flattening to zero slope at the second station.`,
  sol: 'Slopes 0.20, 0, −0.30 m/s²; areas 1440 + 7200 + 960 = 9600 m; 19.2 m/s; parabola, line, parabola.',
  scheme: [[`Accelerations ${dec(gr.a1, 2)}, 0 and ${mn(dec(gr.a3, 2))} m/s²`, 1], [`Areas ${gr.s1} m, ${gr.s2} m and ${gr.s3} m`, 1], [`Distance ${gr.s} m`, 1], [`Average speed ${dec(gr.vs, 3)} m/s`, 1], ['x–t graph: curving up, straight, flattening', 1]],
  d: 3, c: 'application', t: [4], wl: null,
}), () => near(integ(pwl([[0, 0], [120, 24], [420, 24], [500, 0]]), 0, 500, 5000), gr.s, 1e-6) && near(gr.vs, 19.2, 1e-9) && gr.s === 9600 || 'gr');

// ================================================================ case-based (4 marks: 1 + 1 + 2)
const rd = { out: 900, back: 300, T: 240 };
rd.path = rd.out + rd.back;
rd.disp = rd.out - rd.back;
rd.vs = rd.path / rd.T;
rd.vv = rd.disp / rd.T;
add('rider-case', mk.case({
  passage: 'A food-delivery rider in Jaipur works along a long straight road. Starting at the kitchen, which he takes as the origin, he rides 900 m east to Customer 1 and then 300 m back west to Customer 2. The whole ride takes 4 minutes (240 s). Take east as the positive direction.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The rider’s displacement from the kitchen when he reaches Customer 2 is',
      right: `+${rd.disp} m`,
      wrong: [`+${rd.path} m`, `+${rd.out} m`, `−${rd.disp} m`],
      sol: `Final position = 900 − 300 = +${rd.disp} m from the origin; the path length (${rd.path} m) is a different quantity — option (@K).`,
      d: 1, c: 'understanding', t: [1],
    })),
    part('b', num({
      stem: 'Find the rider’s average speed for the whole ride, in m/s.',
      value: rd.vs, tol: 0.05, unit: 'm/s',
      sol: r`Path length $= ${rd.out} + ${rd.back} = ${rd.path}$ m, so average speed $= \dfrac{${rd.path}}{${rd.T}} = ${dec(rd.vs, 2)}$ m/s.`,
      scheme: [[`Average speed = ${rd.path}/${rd.T} = ${dec(rd.vs, 2)} m/s`, 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Find the magnitude of the rider’s average velocity and explain why it is smaller than his average speed.',
      model: r`Average velocity $= \dfrac{\text{displacement}}{\text{time}} = \dfrac{${rd.disp}}{${rd.T}} = ${dec(rd.vv, 2)}$ m/s east. It is smaller than the average speed ($${dec(rd.vs, 2)}$ m/s) because he turned back: the path length (${rd.path} m) exceeds the displacement (${rd.disp} m).`,
      sol: 'Displacement ÷ time; path > displacement.',
      scheme: [[`Average velocity = ${rd.disp}/${rd.T} = ${dec(rd.vv, 2)} m/s`, 1], ['Smaller because the path is longer than the displacement', 1]],
      d: 3, c: 'application', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'A friend says the rider’s average velocity must also be 5.0 m/s, because he never stopped. Evaluate this claim.',
        model: r`The claim is **wrong**. Average velocity uses the **displacement** (${rd.disp} m), not the path length (${rd.path} m): $\dfrac{${rd.disp}}{${rd.T}} = ${dec(rd.vv, 2)}$ m/s. It would equal the average speed only if the rider had never turned back, whether he stopped or not.`,
        sol: 'Average velocity uses displacement.',
        scheme: [['Claim wrong: average velocity uses displacement', 1], [`${dec(rd.vv, 2)} m/s, not ${dec(rd.vs, 2)} m/s; equal only with no turning back`, 1]],
        d: 4, c: 'evaluation', t: [2],
      }),
    ]),
  ],
}), (q) => near(rd.vs, 5, 1e-9) && near(rd.vv, 2.5, 1e-9) && near(q.children[1].answer.value, 5, 1e-9) || 'rd');
const re = { kmh: 108, tr: 0.7, a: 6.0, gap: 90 };
re.v = Math.round((re.kmh / 3.6) * 1e6) / 1e6;
re.dr = re.v * re.tr;
re.db = re.v ** 2 / (2 * re.a);
re.tot = re.dr + re.db;
re.tr2 = re.tr / 2;
re.dr2 = re.v * re.tr2;
re.tot2 = re.dr2 + re.db;
add('reaction-case', mk.case({
  passage: 'On an expressway near Hyderabad a car travels along a straight road at 108 km/h (30 m/s). When the driver sees a hazard, her reaction time is 0.70 s; only then do the brakes act, and they slow the car uniformly at 6.0 m/s².',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'During the 0.70 s reaction time the car',
      right: `keeps moving at 30 m/s and covers ${dec(re.dr, 3)} m`,
      wrong: ['slows down uniformly at 6.0 m/s²', 'stops at once', 'covers about 6.0 m'],
      sol: `The brakes have not yet acted, so the speed is unchanged: distance = 30 × 0.70 = ${dec(re.dr, 3)} m — option (@K).`,
      d: 1, c: 'understanding', t: [3],
    })),
    part('b', num({
      stem: 'Find the braking distance, from the moment the brakes act until the car stops, in m.',
      value: re.db, tol: 0.5, unit: 'm',
      sol: r`$v^2 = u^2 - 2as$ with $v = 0$: $s = \dfrac{u^2}{2a} = \dfrac{${re.v ** 2}}{${2 * re.a}} = ${re.db}$ m.`,
      scheme: [[`s = u²/2a = ${re.v ** 2}/${2 * re.a} = ${re.db} m`, 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'A stationary truck is 90 m ahead of the car at the instant the driver sees it. Show, with numbers, whether the car can stop before reaching the truck.',
      model: r`Stopping distance $=$ reaction distance $+$ braking distance $= ${dec(re.dr, 3)} + ${re.db} = ${dec(re.tot, 3)}$ m. This is more than ${re.gap} m, so the car **cannot stop in time**: it would still be moving when it reaches the truck, about ${dec(re.tot - re.gap, 2)} m short of what is needed.`,
      sol: 'Total 96 m > 90 m.',
      scheme: [[`Total stopping distance = ${dec(re.dr, 3)} + ${re.db} = ${dec(re.tot, 3)} m`, 1], [`${dec(re.tot, 3)} m > ${re.gap} m: cannot stop in time`, 1]],
      d: 3, c: 'application', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'A learner says that if the driver reacted twice as fast (0.35 s), the stopping distance would be halved. Evaluate this claim.',
        model: r`The claim is **wrong**. Only the reaction distance changes: it halves from ${dec(re.dr, 3)} m to ${dec(re.dr2, 3)} m, while the braking distance stays ${re.db} m. The stopping distance falls from ${dec(re.tot, 3)} m to ${dec(re.tot2, 3)} m, only about ${dec(((re.tot - re.tot2) / re.tot) * 100, 2)} per cent less.`,
        sol: 'Braking distance unchanged.',
        scheme: [['Only the reaction distance halves', 1], [`Total falls from ${dec(re.tot, 3)} m to ${dec(re.tot2, 3)} m: not halved`, 1]],
        d: 4, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}), (q) => near(re.dr, 21, 1e-9) && near(re.db, 75, 1e-9) && near(re.tot, 96, 1e-9) && near(re.tot2, 85.5, 1e-9) && near(q.children[1].answer.value, 75, 1e-9) || 're');
const mc = { v: 15, t1: 10, t2: 50, t3: 10 };
mc.s1 = 0.5 * mc.t1 * mc.v;
mc.s2 = mc.v * mc.t2;
mc.s3 = 0.5 * mc.t3 * mc.v;
mc.s = mc.s1 + mc.s2 + mc.s3;
mc.T = mc.t1 + mc.t2 + mc.t3;
mc.vs = mc.s / mc.T;
add('metro-case', mk.case({
  passage: 'The velocity–time graph of a metro train between two stations on a straight track is a trapezoid. The velocity rises uniformly from 0 to 15 m/s in 10 s, stays constant for 50 s and then falls uniformly to zero in the last 10 s.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'On this graph, the train has zero acceleration',
      right: 'during the horizontal part, because the slope there is zero',
      wrong: ['during the rising part, because its velocity is positive', 'during the falling part, because its velocity is decreasing', 'at no time, because a moving train is always accelerating'],
      sol: 'Acceleration is the slope of the v–t graph: zero for the horizontal part, positive for the rise and negative for the fall — option (@K).',
      d: 1, c: 'understanding', t: [4],
    })),
    part('b', num({
      stem: 'Find the distance between the two stations, in m.',
      value: mc.s, tol: 1, unit: 'm',
      sol: r`Distance = area under the graph $= \tfrac{1}{2} \times ${mc.t1} \times ${mc.v} + ${mc.v} \times ${mc.t2} + \tfrac{1}{2} \times ${mc.t3} \times ${mc.v} = ${mc.s1} + ${mc.s2} + ${mc.s3} = ${mc.s}$ m.`,
      scheme: [[`Areas ${mc.s1} + ${mc.s2} + ${mc.s3} = ${mc.s} m`, 1]],
      d: 2, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'Find the average speed of the train for the whole journey and explain how you obtained it.',
      model: r`Average speed $=$ total distance $\div$ total time. The distance is the area under the graph, ${mc.s} m, and the time is $${mc.t1} + ${mc.t2} + ${mc.t3} = ${mc.T}$ s, so the average speed is $\dfrac{${mc.s}}{${mc.T}} \approx ${dec(mc.vs, 3)}$ m/s.`,
      sol: 'Area ÷ total time.',
      scheme: [['Distance from the area, time from the graph', 1], [`${mc.s}/${mc.T} ≈ ${dec(mc.vs, 3)} m/s`, 1]],
      d: 3, c: 'application', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'A student says the average speed is (0 + 15)/2 = 7.5 m/s because the train starts and ends at rest. Evaluate this claim.',
        model: r`The claim is **wrong**. The mean of the first and last speeds is the average speed only for **uniform acceleration** between them. Here the train runs at the full 15 m/s for ${mc.t2} of the ${mc.T} s, so its average speed is ${mc.s} m ÷ ${mc.T} s $\approx ${dec(mc.vs, 3)}$ m/s.`,
        sol: 'Constant-acceleration formula does not apply.',
        scheme: [['Claim wrong: mean of end speeds needs uniform acceleration', 1], [`Correct value ${mc.s}/${mc.T} ≈ ${dec(mc.vs, 3)} m/s`, 1]],
        d: 4, c: 'evaluation', t: [4],
      }),
    ]),
  ],
}), (q) => near(integ(pwl([[0, 0], [10, 15], [60, 15], [70, 0]]), 0, 70, 7000), mc.s, 1e-6) && mc.s === 900 && near(q.children[1].answer.value, 900, 1e-9) || 'mc');
const bl = { u: 34.3 };
bl.H = bl.u ** 2 / (2 * g);
bl.T = R6((2 * bl.u) / g);
bl.tup = R6(bl.u / g);
add('ball-case', mk.case({
  passage: 'At a cricket ground in Chennai a fielder throws a ball vertically upward at 34.3 m/s from shoulder height. Take g = 9.8 m/s² and neglect air resistance; measure heights from the point of release.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'At the highest point of its flight, the ball’s velocity and acceleration are',
      right: 'zero and 9.8 m/s² downward',
      wrong: ['zero and zero', '9.8 m/s upward and zero', 'zero and 9.8 m/s² upward'],
      sol: 'The velocity changes from upward to downward, so it is zero for an instant; the acceleration due to gravity is 9.8 m/s² downward at every instant — option (@K).',
      d: 2, c: 'understanding', t: [3],
    })),
    part('b', num({
      stem: 'Find the greatest height above the point of release, in m (3 significant figures).',
      value: v3(bl.H), tol: 0.1, unit: 'm',
      sol: r`$H = \dfrac{u^2}{2g} = \dfrac{${dec(bl.u ** 2, 6)}}{19.6} \approx ${dec(bl.H, 3)}$ m.`,
      scheme: [[`H = u²/2g ≈ ${dec(bl.H, 3)} m`, 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Find the time the ball takes to return to the level of release and the speed with which it returns.',
      model: r`Time to the top $= \dfrac{u}{g} = \dfrac{${bl.u}}{9.8} = ${bl.tup}$ s, and the descent takes the same time, so it is back after $${dec(bl.T, 3)}$ s. By symmetry it returns with the same speed, $${bl.u}$ m/s, directed downward.`,
      sol: 'Symmetric flight: 7.0 s, 34.3 m/s.',
      scheme: [[`Time of flight 2u/g = ${dec(bl.T, 3)} s`, 1], [`Return speed ${bl.u} m/s downward`, 1]],
      d: 3, c: 'application', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'A spectator says a heavier ball would take longer to come down than a lighter one thrown at the same speed. Evaluate this claim.',
        model: 'The claim is **wrong**. Neglecting air resistance, every body falls with the same acceleration g = 9.8 m/s², whatever its mass: a larger weight is balanced by a larger mass. The heavier ball therefore rises to the same height, takes the same time to fall and returns with the same speed.',
        sol: 'Acceleration is independent of mass.',
        scheme: [['Claim wrong: acceleration g does not depend on mass', 1], ['Same height, same time of flight, same return speed', 1]],
        d: 4, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}), (q) => near(bl.H, 60.025, 1e-6) && near(bl.T, 7, 1e-9) && near(q.children[1].answer.value, 60, 2e-3) || 'bl');
