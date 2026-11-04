// ch02 question bank, part 2: t03 (uniformly accelerated motion, free fall, stopping distance, reaction time). g = 9.8 m/s² where used.
import { mk, add, r, dec, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { g, root } from './phys.mjs';

const { mcq, ar, fill, num, short } = mk;
const v3 = (x) => Number(dec(x, 3));
const v2 = (x) => Number(dec(x, 2));
const kmh = (x) => Math.round((x / 3.6) * 1e6) / 1e6;

const bs = { u: 5, v: 15, t: 10 };
bs.a = (bs.v - bs.u) / bs.t;
bs.s = 0.5 * (bs.u + bs.v) * bs.t;
add('bus-num', num({
  stem: 'A bus on a ghat road speeds up uniformly from 5.0 m/s to 15 m/s in 10 s. Find the distance it covers in this time, in m.',
  value: bs.s, tol: 0.5, unit: 'm',
  sol: r`$a = \dfrac{v - u}{t} = \dfrac{${bs.v} - ${bs.u}}{${bs.t}} = ${bs.a}$ m/s$^2$. $s = ut + \tfrac{1}{2}at^2 = ${bs.u} \times ${bs.t} + \tfrac{1}{2} \times ${bs.a} \times ${bs.t ** 2} = ${bs.s}$ m. (Check: $\tfrac{1}{2}(u + v)t = \tfrac{1}{2} \times ${bs.u + bs.v} \times ${bs.t} = ${bs.s}$ m.)`,
  scheme: [[`a = (v − u)/t = ${bs.a} m/s²`, 1], [`s = ut + ½at² = ${bs.s} m`, 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(bs.u * bs.t + 0.5 * ((bs.v - bs.u) / bs.t) * bs.t ** 2, q.answer.value, 1e-9) || 'bs');
const rt = { kmh: 108, s: 750 };
rt.u = kmh(rt.kmh);
rt.a = rt.u ** 2 / (2 * rt.s);
rt.t = (2 * rt.s) / rt.u;
add('retard-num', num({
  stem: 'A goods train running at 108 km/h is brought to rest in 750 m by uniform braking. Find the retardation, in m/s² (2 significant figures).',
  value: v2(rt.a), tol: 0.005, unit: 'm/s²',
  sol: r`$u = 108$ km/h $= ${rt.u}$ m/s, $v = 0$. From $v^2 = u^2 + 2as$: $0 = ${rt.u ** 2} + 2a(${rt.s})$, so $a$ is negative (a retardation) and $|a| = \dfrac{${rt.u ** 2}}{${2 * rt.s}} = ${dec(rt.a, 2)}$ m/s$^2$. (The train stops in $\dfrac{${2 * rt.s}}{${rt.u}} = ${rt.t}$ s.)`,
  scheme: [['108 km/h = 30 m/s; v² = u² + 2as with v = 0', 1], [`Retardation = ${dec(rt.a, 2)} m/s²`, 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(30 / rt.t, q.answer.value, 0.005) || 'rt');
const nth = { a: 1.8, n: 5 };
nth.s5 = 0.5 * nth.a * 25;
nth.s4 = 0.5 * nth.a * 16;
nth.d = nth.s5 - nth.s4;
add('nth-num', num({
  stem: 'A car starts from rest on a straight road with a constant acceleration of 1.8 m/s². Find the distance it covers during the fifth second of its motion (between t = 4 s and t = 5 s), in m.',
  value: v2(nth.d), tol: 0.05, unit: 'm',
  sol: r`With $u = 0$, $s = \tfrac{1}{2}at^2$. $s(5) = \tfrac{1}{2} \times ${nth.a} \times 25 = ${nth.s5}$ m and $s(4) = \tfrac{1}{2} \times ${nth.a} \times 16 = ${dec(nth.s4, 3)}$ m. Distance in the fifth second $= ${nth.s5} - ${dec(nth.s4, 3)} = ${dec(nth.d, 2)}$ m.`,
  scheme: [[`s(5) = ${nth.s5} m and s(4) = ${dec(nth.s4, 3)} m`, 1], [`Difference = ${dec(nth.d, 2)} m`, 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(0.9 * (25 - 16), q.answer.value, 1e-3) || 'nth');
const fl = { h: 12.0 };
fl.v2 = 2 * g * fl.h;
fl.v = Math.sqrt(fl.v2);
add('fall-num', num({
  stem: 'A coconut drops from a palm 12.0 m above the ground. Neglecting air resistance (g = 9.8 m/s²), find its speed just before it hits the ground, in m/s (3 significant figures).',
  value: v3(fl.v), tol: 0.05, unit: 'm/s',
  sol: r`From rest, $v^2 = 2gh = 2 \times 9.8 \times ${fl.h} = ${dec(fl.v2, 4)}$, so $v = \sqrt{${dec(fl.v2, 4)}} \approx ${dec(fl.v, 3)}$ m/s.`,
  scheme: [[`v² = 2gh = ${dec(fl.v2, 4)} m²/s²`, 1], [`v ≈ ${dec(fl.v, 3)} m/s`, 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => { const t = Math.sqrt((2 * 12) / g); return near(g * t, q.answer.value, 0.003) || 'fl'; });
const th = { u: 24.5 };
th.H = th.u ** 2 / (2 * g);
add('throwH-num', num({
  stem: 'A fielder throws a cricket ball vertically upward at 24.5 m/s. Neglecting air resistance (g = 9.8 m/s²), find the maximum height it reaches above the point of release, in m (3 significant figures).',
  value: v3(th.H), tol: 0.05, unit: 'm',
  sol: r`At the top $v = 0$, so $0 = u^2 - 2gH$ and $H = \dfrac{u^2}{2g} = \dfrac{${dec(th.u ** 2, 5)}}{19.6} \approx ${dec(th.H, 3)}$ m.`,
  scheme: [['v² = u² − 2gH with v = 0', 1], [`H ≈ ${dec(th.H, 3)} m`, 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => { const tup = th.u / g; return near(th.u * tup - 0.5 * g * tup * tup, q.answer.value, 0.003) || 'th'; });
const rx = { d: 0.18 };
rx.t = Math.sqrt((2 * rx.d) / g);
add('reaction-num', num({
  stem: 'A student drops a ruler without warning and a partner catches it after it has fallen 0.18 m. Taking g = 9.8 m/s², find the partner’s reaction time, in s (3 significant figures).',
  value: v3(rx.t), tol: 0.002, unit: 's',
  sol: r`The ruler falls from rest: $d = \tfrac{1}{2}gt^2$, so $t = \sqrt{\dfrac{2d}{g}} = \sqrt{\dfrac{2 \times ${rx.d}}{9.8}} \approx \sqrt{${dec((2 * rx.d) / g, 3)}} \approx ${dec(rx.t, 3)}$ s.`,
  scheme: [['d = ½gt², so t = √(2d/g)', 1], [`t ≈ ${dec(rx.t, 3)} s`, 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(0.5 * g * q.answer.value ** 2, rx.d, 0.01) || 'rx');
const sd = { kmh: 54, tr: 0.8, a: 5.0 };
sd.v = kmh(sd.kmh);
sd.dr = sd.v * sd.tr;
sd.db = sd.v ** 2 / (2 * sd.a);
sd.tot = sd.dr + sd.db;
add('stopdist-num', num({
  stem: 'A car moving at 54 km/h on a straight road has a driver whose reaction time is 0.80 s; after that the brakes give a uniform deceleration of 5.0 m/s². Find the total stopping distance, in m.',
  value: sd.tot, tol: 0.1, unit: 'm',
  sol: r`$54$ km/h $= ${sd.v}$ m/s. Reaction distance $= vt_r = ${sd.v} \times ${sd.tr} = ${sd.dr}$ m. Braking distance $= \dfrac{v^2}{2a} = \dfrac{${sd.v ** 2}}{${2 * sd.a}} = ${sd.db}$ m. Stopping distance $= ${sd.dr} + ${sd.db} = ${sd.tot}$ m.`,
  scheme: [[`Reaction distance = ${sd.dr} m`, 1], [`Braking distance = ${sd.db} m`, 1], [`Total = ${sd.tot} m`, 1]],
  marks: 3, d: 3, c: 'application', t: [3],
}), (q) => { const tb = sd.v / sd.a; return near(sd.v * sd.tr + sd.v * tb - 0.5 * sd.a * tb * tb, q.answer.value, 1e-9) || 'sd'; });
const mt = { H: 80, u: 40 };
mt.t = mt.H / mt.u;
mt.y = mt.H - 0.5 * g * mt.t ** 2;
add('meet-num', num({
  stem: 'A ball is dropped from the top of an 80 m tower. At the same instant a second ball is thrown vertically upward from the foot of the tower at 40 m/s. Taking g = 9.8 m/s², after how many seconds are the two balls at the same height?',
  value: mt.t, tol: 0.02, unit: 's',
  sol: r`Heights above the ground: $y_1 = 80 - \tfrac{1}{2}gt^2$ and $y_2 = 40t - \tfrac{1}{2}gt^2$. Setting $y_1 = y_2$ the $g$ terms cancel: $80 = 40t$, so $t = \dfrac{80}{40} = ${mt.t}$ s. (They meet at a height of $80 - 4.9 \times 4 = ${dec(mt.y, 3)}$ m.)`,
  scheme: [['y₁ = 80 − ½gt² and y₂ = 40t − ½gt²', 1], [`Equating: 80 = 40t, t = ${mt.t} s`, 1]],
  marks: 2, d: 4, c: 'analysis', t: [3],
}), (q) => near(root((t) => 80 - 0.5 * g * t * t - (40 * t - 0.5 * g * t * t), 0, 10), q.answer.value, 1e-6) || 'mt');
const po = { u: 20, a: 2.5 };
po.t = (2 * po.u) / po.a;
po.x = po.u * po.t;
po.v = po.a * po.t;
add('police-num', num({
  stem: 'A car passes a stationary police motorcycle on a straight road at a constant 20 m/s. At that instant the motorcycle starts from rest with a constant acceleration of 2.5 m/s². After how many seconds does it catch up with the car?',
  value: po.t, tol: 0.1, unit: 's',
  sol: r`Car: $x_1 = 20t$. Motorcycle: $x_2 = \tfrac{1}{2} \times 2.5\,t^2 = 1.25t^2$. Setting $x_1 = x_2$: $20t = 1.25t^2$, so $t = \dfrac{20}{1.25} = ${po.t}$ s, when each has covered $${po.x}$ m (the motorcycle is then going at $${po.v}$ m/s).`,
  scheme: [['x₁ = 20t and x₂ = ½ × 2.5 t²', 1], [`Equal positions: t = ${po.t} s (t ≠ 0)`, 1]],
  marks: 2, d: 4, c: 'analysis', t: [3],
}), (q) => near(root((t) => 20 * t - 1.25 * t * t, 1, 30), q.answer.value, 1e-6) && po.x === 320 || 'po');
add('ratio-mcq', mcq({
  stem: 'A ball is dropped from a bridge. The distances it falls in the first, second and third seconds are in the ratio',
  right: '1 : 3 : 5',
  wrong: ['1 : 2 : 3', '1 : 4 : 9', '1 : 3 : 6'],
  sol: r`Total fall $\tfrac{1}{2}gt^2$ is in the ratio $1 : 4 : 9$ after 1, 2 and 3 s, so the distances in successive seconds are $1 : 3 : 5$ (4.9 m, 14.7 m, 24.5 m) — option (@K).`,
  d: 3, c: 'application', t: [3],
}), () => { const y = (t) => 0.5 * g * t * t; return near((y(2) - y(1)) / y(1), 3, 1e-9) && near((y(3) - y(2)) / y(1), 5, 1e-9) || 'ratio'; });
add('doublespeed-mcq', mcq({
  stem: 'A car brakes on a dry road with the same deceleration at every speed. If it brakes from twice the speed (ignoring reaction time), its braking distance becomes',
  right: 'four times as long',
  wrong: ['twice as long', 'half as long', 'eight times as long'],
  sol: r`From $v^2 = 2as$, the braking distance $s = \dfrac{u^2}{2a}$ is proportional to $u^2$; doubling $u$ gives four times the distance — option (@K).`,
  d: 3, c: 'analysis', t: [3],
}));
add('vacuum-mcq', mcq({
  stem: 'In a vacuum chamber a brick and a marble are released together from the same height. Which statement is correct?',
  right: 'Both reach the floor together, because both have the same acceleration g',
  wrong: ['Both reach the floor together, because they have the same mass', 'The brick reaches first, because gravity pulls harder on it, so it accelerates more', 'The marble reaches first, because it is smaller'],
  sol: 'Without air resistance, the only force is gravity; the force on the brick is larger but so is its mass, so every body has the same acceleration g — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('rise-mcq', mcq({
  stem: 'A stone thrown vertically upward passes a window 6 m above the thrower on the way up and again on the way down. Neglecting air resistance, its speed at the window on the way down, compared with its speed at the window on the way up, is',
  right: 'the same in magnitude',
  wrong: ['larger, because it has been speeding up since the top', 'smaller, because it has lost energy', 'zero'],
  sol: 'The motion is symmetric about the top: at the same height the speed is the same going up and coming down, only the direction differs — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
const tt = { u: 14.7 };
tt.T = (2 * tt.u) / g;
add('throwT-mcq', mcq({
  stem: 'A ball is thrown vertically upward at 14.7 m/s and caught at the level of release. With g = 9.8 m/s² and no air resistance, the time it spends in the air is',
  right: `${dec(tt.T, 2)} s`,
  wrong: ['1.5 s', '6.0 s', '4.5 s'],
  sol: r`Time to rise $= \dfrac{u}{g} = \dfrac{14.7}{9.8} = 1.5$ s, and the fall takes the same time: $2 \times 1.5 = ${dec(tt.T, 2)}$ s — option (@K).`,
  d: 3, c: 'application', t: [3],
}), () => near(tt.T, 3, 1e-9) || 'tt');
const ec = { u: 25, s: 62.5 };
ec.a = ec.u ** 2 / (2 * ec.s);
add('eqchoose-mcq', mcq({
  stem: 'A scooter moving at 25 m/s is braked uniformly and stops in 62.5 m. To find the retardation directly, without first finding the time, the most suitable equation is',
  right: 'v² = u² + 2as',
  wrong: ['v = u + at', 's = ut + ½at²', 's = ½(u + v)t'],
  sol: r`The data are $u$, $v = 0$ and $s$; time is neither given nor needed, so use $v^2 = u^2 + 2as$ (this gives $a = -\dfrac{625}{125} = -${ec.a}$ m/s$^2$) — option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => near(ec.a, 5, 1e-9) || 'ec');
add('coin-ar', ar({
  a: 'A coin dropped from a balcony gains a speed of about 9.8 m/s in every second of its fall (air resistance neglected).',
  r: 'The distances fallen by the coin in successive seconds are in the ratio 1 : 3 : 5.',
  key: 'b',
  sol: 'Both are true. A follows from a = g = 9.8 m/s² (so v = gt), whereas R describes the distances, which does not explain the gain of speed — option (b).',
  d: 3, c: 'understanding', t: [3],
}));
add('topacc-ar', ar({
  a: 'A ball thrown vertically upward takes as long to reach its highest point as it takes to fall back to the point of throw (air resistance neglected).',
  r: 'The ball’s acceleration is 9.8 m/s² downward at every instant of its flight.',
  key: 'a',
  sol: 'Both are true, and R explains A: with constant a = −g, v = u − gt reaches zero at t = u/g, and the descent is the mirror image of the climb — option (a).',
  d: 3, c: 'analysis', t: [3],
}));
add('gravity-fill', fill({
  stem: 'For a stone dropped from a tower (air resistance neglected), its constant downward acceleration of 9.8 m/s² is called the acceleration due to ___.',
  acc: [['gravity']],
  sol: 'The acceleration due to **gravity**, g.',
  d: 1, c: 'recall', t: [3],
}));
add('gfree-short', short({
  marks: 2,
  stem: 'A coin and a feather are released together in a long glass tube, first with air in it and then after the air has been pumped out. Compare the two falls and state the value of g used.',
  model: 'With **air** in the tube the feather lags, because air resistance is large compared with its tiny weight. With the air **pumped out** only gravity acts, so both have the same acceleration g = 9.8 m/s² downward and land together; the difference was caused by air resistance, not by gravity.',
  sol: 'Air resistance causes the lag; in vacuum both have g.',
  scheme: [['Air: feather lags because of air resistance', 1], ['Vacuum: same acceleration g = 9.8 m/s², land together', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('stopfactors-short', short({
  marks: 2,
  stem: 'Why does a car travelling twice as fast need much more than twice the distance to stop? Use the two parts of the stopping distance.',
  model: 'Stopping distance = reaction distance + braking distance. The **reaction distance** v t_r is proportional to v, so it doubles. The **braking distance** v²/2a is proportional to v², so it becomes **four times** as large. The sum therefore grows by more than a factor of two.',
  sol: 'Reaction part doubles; braking part quadruples.',
  scheme: [['Reaction distance ∝ v: doubles', 1], ['Braking distance ∝ v²: four times, so total more than doubles', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('rulerreact-short', short({
  marks: 2,
  stem: 'Describe how a ruler dropped between a classmate’s fingers can be used to estimate her reaction time, and write the formula used.',
  model: 'Hold the ruler so its zero mark is level with her open fingers, release it without warning, and note the distance d it falls before she grips it. The ruler falls freely from rest, so d = ½gt², giving the **reaction time t = √(2d/g)**; a longer fall means a slower reaction.',
  sol: 'Free fall from rest, t = √(2d/g).',
  scheme: [['Drop the ruler without warning; note the distance d caught', 1], ['d = ½gt², so t = √(2d/g)', 1]],
  d: 3, c: 'application', t: [3],
}));
add('deriv-short3', short({
  marks: 3,
  stem: 'Using the velocity–time graph of a body moving with constant acceleration a from velocity u to velocity v in time t, derive v = u + at and s = ut + ½at².',
  model: 'The graph is a straight line from u to v. Its **slope** is a = (v − u)/t, so **v = u + at**. The **area** under it is the displacement s: a rectangle of height u and width t, giving ut, plus a triangle of height (v − u) = at and base t, giving ½at·t. Hence **s = ut + ½at²**.',
  sol: 'Slope gives v = u + at; area gives s.',
  scheme: [['Slope of the v–t line: a = (v − u)/t, so v = u + at', 1], ['Area = rectangle ut + triangle ½(v − u)t', 1], ['(v − u) = at, so s = ut + ½at²', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('v2-short3', short({
  marks: 3,
  stem: 'Starting from a = dv/dt, show by calculus that a body with constant acceleration a obeys v² = u² + 2as, where s is its displacement.',
  model: 'Write a = dv/dt = (dv/dx)(dx/dt) = **v dv/dx**, so a dx = v dv. Integrate from the start (position x₀, velocity u) to the end (position x, velocity v) with a constant: **a(x − x₀) = ½(v² − u²)**. With s = x − x₀ this gives **v² = u² + 2as**.',
  sol: 'a = v dv/dx, integrate.',
  scheme: [['a = dv/dt = v dv/dx, so a dx = v dv', 1], ['Integrate with constant a between the limits', 1], ['a s = ½(v² − u²), hence v² = u² + 2as', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('stop-short3', short({
  marks: 3,
  stem: 'A driver brakes after seeing a hazard. Explain how the stopping distance of the car depends on its speed, the driver’s reaction time and the braking deceleration.',
  model: 'Stopping distance = **reaction distance** + **braking distance**. In the reaction time t_r the car moves at steady speed v, covering v t_r, so a slower driver adds distance in proportion to both v and t_r. After that the brakes give deceleration a, and the car travels **v²/2a**: this grows with the square of v and falls as a increases (a better road or tyres).',
  sol: 'v t_r + v²/2a.',
  scheme: [['Stopping distance = reaction distance v t_r + braking distance', 1], ['Reaction part ∝ v and t_r', 1], ['Braking part v²/2a ∝ v², smaller for larger a', 1]],
  d: 3, c: 'understanding', t: [3],
}));
