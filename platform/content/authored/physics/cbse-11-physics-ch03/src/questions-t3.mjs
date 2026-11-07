// ch03 question bank, part 2: t03 (motion in a plane with constant acceleration, projectile motion, horizontal projection).
// Every numerical is computed here and re-solved by a stepping integrator (projNumeric) or another independent route.
import { mk, add, r, dec, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { g, rad, deg, R6, Vec, proj, projNumeric, root } from './phys.mjs';

const { mcq, ar, tf, fill, num, short, long, part } = mk;
const v3 = (x) => Number(dec(x, 3));
const d3 = (x) => dec(x, 3);

add('indep-mcq', mcq({
  stem: 'Two identical marbles leave the edge of a high table at the same instant: one is dropped, and the other is flicked away horizontally at 2 m/s. Neglecting air resistance, which statement is correct?',
  right: 'Both hit the floor at the same time, because their vertical motions are identical',
  wrong: ['The flicked marble hits first, because it has a greater speed', 'The dropped marble hits first, because the other must also travel sideways', 'They hit together only if the flicked marble is thrown at 45°'],
  sol: 'Both start with zero vertical velocity and have the same vertical acceleration g, so the vertical motions (and the fall time) are identical; the horizontal velocity has no effect on the vertical motion — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('plane-mcq', mcq({
  stem: 'A freight aircraft flies level at a steady velocity and releases a crate. Neglecting air resistance, the crate, while it falls, is',
  right: 'always vertically below the aircraft',
  wrong: ['behind the aircraft, since nothing pushes it forward', 'ahead of the aircraft, since it falls faster', 'vertically below the aircraft only at the moment of release'],
  sol: 'The crate keeps the aircraft’s horizontal velocity (no horizontal force), so its horizontal position always matches the aircraft’s, while it falls under gravity — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('parab-fill', fill({
  stem: 'Neglecting air, a football kicked from the ground in the Kolkata maidan traces a curve of the shape known as a ___.',
  acc: [['parabola']],
  sol: 'The path y = x tan θ − g x²/(2u² cos² θ) is a quadratic in x, a **parabola**.',
  d: 1, c: 'recall', t: [3],
}));
add('range-tf', tf({
  stem: 'A javelin thrown at 30° and another thrown at 60° with the same speed from the same level land at the same distance, neglecting air resistance.',
  key: 't',
  sol: 'True. R = u² sin 2θ/g, and sin 60° = sin 120°, so θ and 90° − θ give the same range.',
  d: 2, c: 'understanding', t: [3],
}));
const hz = { h: 1.25, u: 3.0 };
hz.T = Math.sqrt((2 * hz.h) / g);
hz.R = hz.u * hz.T;
add('horiz-num', num({
  stem: 'A ball rolls off a table 1.25 m high with a horizontal speed of 3.0 m/s. Taking g = 9.8 m/s², find the horizontal distance from the table edge at which it hits the floor, in m (3 significant figures).',
  value: v3(hz.R), tol: 0.01, unit: 'm',
  sol: r`Fall time: $h = \tfrac{1}{2}gT^2$, so $T = \sqrt{\dfrac{2h}{g}} = \sqrt{\dfrac{${2 * hz.h}}{9.8}} = ${d3(hz.T)}$ s. Horizontal distance $R = uT = 3.0 \times ${d3(hz.T)} = ${d3(hz.R)}$ m.`,
  scheme: [[`T = √(2h/g) = ${d3(hz.T)} s`, 1], [`R = uT = ${d3(hz.R)} m`, 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => { const n = projNumeric(hz.u, 0, hz.h); return near(n.R, q.answer.value, 0.005) || 'hz'; });
const cl = { h: 45, R: 60 };
cl.T = Math.sqrt((2 * cl.h) / g);
cl.u = cl.R / cl.T;
add('cliff-num', num({
  stem: 'A stone thrown horizontally from the top of a 45 m high cliff lands 60 m from the foot of the cliff. Taking g = 9.8 m/s², find the speed with which it was thrown, in m/s (3 significant figures).',
  value: v3(cl.u), tol: 0.05, unit: 'm/s',
  sol: r`$T = \sqrt{\dfrac{2h}{g}} = \sqrt{\dfrac{${2 * cl.h}}{9.8}} = ${d3(cl.T)}$ s. Horizontal speed $u = \dfrac{R}{T} = \dfrac{${cl.R}}{${d3(cl.T)}} = ${d3(cl.u)}$ m/s.`,
  scheme: [[`T = ${d3(cl.T)} s`, 1], [`u = R/T = ${d3(cl.u)} m/s`, 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => { const n = projNumeric(q.answer.value, 0, cl.h); return near(n.R, cl.R, 0.005) || 'cl'; });
cl.vy = g * cl.T;
cl.v = Math.hypot(cl.u, cl.vy);
add('impact-num', num({
  stem: 'A stone thrown horizontally from a 45 m high cliff lands 60 m from its foot. Taking g = 9.8 m/s², find its speed just before it hits the ground, in m/s (3 significant figures).',
  value: v3(cl.v), tol: 0.1, unit: 'm/s',
  sol: r`$T = ${d3(cl.T)}$ s and $u = ${d3(cl.u)}$ m/s as before. Vertical speed at landing $v_y = gT = 9.8 \times ${d3(cl.T)} = ${d3(cl.vy)}$ m/s. Speed $v = \sqrt{u^2 + v_y^2} = \sqrt{${d3(cl.u ** 2)} + ${d3(cl.vy ** 2)}} = ${d3(cl.v)}$ m/s.`,
  scheme: [[`u = ${d3(cl.u)} m/s, v_y = gT = ${d3(cl.vy)} m/s`, 1], [`v = √(u² + v_y²) = ${d3(cl.v)} m/s`, 1], ['Horizontal and vertical parts combined as perpendicular vectors', 1]],
  marks: 3, d: 4, c: 'analysis', t: [3],
}), (q) => { const n = projNumeric(cl.u, 0, cl.h); return near(Math.hypot(n.vxEnd, n.vyEnd), q.answer.value, 0.005) || 'impact'; });
const fb = { u: 25, th: 40 };
fb.p = proj(fb.u, fb.th);
const hs = { u: 20, th: 60 };
hs.p = proj(hs.u, hs.th);
const rm = { R: 72 };
rm.H = rm.R / 2;
add('rmax-num', num({
  stem: 'A cricketer can throw a ball a greatest horizontal distance of 72 m on level ground. Find the greatest height to which she can throw it vertically upward with the same speed, in m (neglect air resistance).',
  value: rm.H, tol: 0.1, unit: 'm',
  sol: r`The greatest range is $R_{max} = u^2/g = ${rm.R}$ m. Thrown vertically the height is $H = \dfrac{u^2}{2g} = \dfrac{R_{max}}{2} = \dfrac{${rm.R}}{2} = ${rm.H}$ m.`,
  scheme: [['R_max = u²/g, so u²/g = 72 m', 1], [`H = u²/2g = ${rm.H} m`, 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => { const u = Math.sqrt(rm.R * g); return near(u * u / (2 * g), q.answer.value, 1e-9) && near(projNumeric(u, 45).R, rm.R, 0.002) || 'rm'; });
const jv = { R: 64 };
jv.u = Math.sqrt(jv.R * g);
const rh = { th: deg(Math.atan(4)) };
add('rh-num', num({
  stem: 'A projectile launched from level ground has a horizontal range equal to its maximum height. Find its angle of projection, in degrees (3 significant figures).',
  value: v3(rh.th), tol: 0.1, unit: '°',
  sol: r`$\dfrac{H}{R} = \dfrac{u^2\sin^2\theta/2g}{u^2 \cdot 2\sin\theta\cos\theta/g} = \dfrac{\tan\theta}{4}$. Setting $H = R$ gives $\tan\theta = 4$, so $\theta = ${d3(rh.th)}$ degrees.`,
  scheme: [['H/R = tan θ / 4', 1], ['tan θ = 4', 1], [`θ = ${d3(rh.th)}°`, 1]],
  marks: 3, d: 4, c: 'analysis', t: [3],
}), (q) => { const p = proj(30, q.answer.value); return near(p.H, p.R, 0.01) || 'rh'; });
const pe = { a: 0.75, b: 0.02 };
pe.R = pe.a / pe.b;
pe.th = deg(Math.atan(pe.a));
pe.H = (pe.a * pe.a) / (4 * pe.b);
add('patheq-num', num({
  stem: 'A ball thrown from the ground on a level field follows the path y = 0.75x − 0.02x², where x and y are in metres. Find the horizontal range, in m.',
  value: pe.R, tol: 0.1, unit: 'm',
  sol: r`The ball is back on the ground when $y = 0$: $x(0.75 - 0.02x) = 0$, so $x = \dfrac{0.75}{0.02} = ${pe.R}$ m (the other root, $x = 0$, is the launch point).`,
  scheme: [['Set y = 0', 1], [`x = 0.75/0.02 = ${pe.R} m`, 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => { const f = (x) => 0.75 * x - 0.02 * x * x; return near(root(f, 1, 100), q.answer.value, 1e-9) || 'pe'; });
add('patheq-mcq', mcq({
  stem: 'A ball’s path is y = 0.75x − 0.02x² (x and y in metres). Comparing with y = x tan θ − g x²/(2u² cos² θ), the angle of projection is',
  right: '36.9° above the horizontal',
  wrong: ['0.75° above the horizontal', '53.1° above the horizontal', '45° above the horizontal'],
  sol: `The coefficient of x is tan θ = 0.75, so θ = ${d3(pe.th)}° (not 53.1°, whose tangent is 1.33) — option (@K).`,
  d: 3, c: 'application', t: [3],
}), () => near(Math.tan(rad(36.87)), 0.75, 1e-3) || 'pemcq');
const vt = { ux: 24, uy: 32, t: 2.0 };
vt.vy = vt.uy - g * vt.t;
vt.v = Math.hypot(vt.ux, vt.vy);
add('vel-num', num({
  stem: 'A ball is thrown so that its initial velocity has components 24 m/s horizontally and 32 m/s vertically upward. Taking g = 9.8 m/s², find its speed 2.0 s after the throw, in m/s (3 significant figures).',
  value: v3(vt.v), tol: 0.1, unit: 'm/s',
  sol: r`$v_x = 24$ m/s stays constant. $v_y = u_y - gt = 32 - 9.8 \times 2.0 = ${d3(vt.vy)}$ m/s. Speed $= \sqrt{v_x^2 + v_y^2} = \sqrt{${vt.ux ** 2} + ${d3(vt.vy ** 2)}} = ${d3(vt.v)}$ m/s.`,
  scheme: [['v_x = 24 m/s constant', 1], [`v_y = 32 − 9.8 × 2.0 = ${d3(vt.vy)} m/s`, 1], [`v = ${d3(vt.v)} m/s`, 1]],
  marks: 3, d: 3, c: 'application', t: [3],
}), (q) => { const h = 1e-4; const pos = (t) => [vt.ux * t, vt.uy * t - 0.5 * g * t * t]; const a = pos(2 - h); const b = pos(2 + h); return near(Math.hypot((b[0] - a[0]) / (2 * h), (b[1] - a[1]) / (2 * h)), q.answer.value, 0.002) || 'vt'; });
add('top-mcq', mcq({
  stem: 'A ball is kicked at 30 m/s at 60° above the horizontal. Neglecting air resistance, its speed at the highest point of the flight is',
  right: '15 m/s',
  wrong: ['zero', '26 m/s', '30 m/s'],
  sol: 'At the top only the horizontal component survives: 30 cos 60° = 15 m/s. (30 sin 60° ≈ 26 m/s is the initial vertical component, which is zero at the top) — option (@K).',
  d: 2, c: 'application', t: [3],
}), () => near(30 * Math.cos(rad(60)), 15, 1e-9) || 'top');
add('comp-mcq', mcq({
  stem: 'A shot is thrown at the same speed at 25° and at another angle from the same level; the range is the same in both cases. The other angle is',
  right: '65°',
  wrong: ['45°', '75°', '155°'],
  sol: 'Equal ranges occur for θ and 90° − θ because R ∝ sin 2θ and sin 2θ = sin (180° − 2θ). So 90° − 25° = 65° — option (@K).',
  d: 2, c: 'application', t: [3],
}), () => near(proj(20, 25).R, proj(20, 65).R, 1e-9) || 'comp');
add('hr-mcq', mcq({
  stem: 'For a projectile launched at 45° from level ground, the ratio of its horizontal range to its maximum height is',
  right: '4',
  wrong: ['2', '1', '8'],
  sol: 'H/R = tan θ/4 = tan 45°/4 = 1/4, so R/H = 4 — option (@K).',
  d: 3, c: 'application', t: [3],
}), () => near(proj(30, 45).R / proj(30, 45).H, 4, 1e-9) || 'hr');
add('speedscale-mcq', mcq({
  stem: 'A cricketer throws a ball at a fixed angle first with speed u and then with speed 2u, from the same level. In the second throw, the range and the time of flight become, respectively,',
  right: '4 times and 2 times those of the first throw',
  wrong: ['2 times and 2 times', '4 times and 4 times', '2 times and 4 times'],
  sol: 'R = u² sin 2θ/g is proportional to u², and T = 2u sin θ/g is proportional to u — option (@K).',
  d: 2, c: 'application', t: [3],
}), () => near(proj(40, 35).R / proj(20, 35).R, 4, 1e-9) && near(proj(40, 35).T / proj(20, 35).T, 2, 1e-9) || 'ss');
add('toppt-ar', ar({
  a: 'At the highest point of its path a projectile has its least speed, and this speed is not zero.',
  r: 'At the highest point of its path the horizontal component of the velocity of a projectile is zero.',
  key: 'c',
  sol: 'A is true: at the top v_y = 0 but v_x = u cos θ is unchanged, so the speed u cos θ is the minimum and is not zero. R is false, since the horizontal component never changes — option (c).',
  d: 3, c: 'understanding', t: [3],
}));
add('horiz-ar', ar({
  a: 'A stone dropped from a bridge and a stone thrown horizontally from the same point at any speed reach the water at the same instant (no air resistance).',
  r: 'The horizontal velocity does not affect the vertical motion, which starts from zero vertical velocity in both cases.',
  key: 'a',
  sol: 'Both are true and R is the explanation: vertical motion is governed by g and zero initial vertical velocity alone, so the fall times are equal — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('indep-short', short({
  marks: 2,
  stem: 'A ball is thrown horizontally from a tower. Explain, with the help of the two motions, why its time of fall is the same as that of a ball dropped from the same height.',
  model: 'The horizontal and vertical motions of a projectile are **independent**. The thrown ball has no vertical velocity at the start and a constant vertical acceleration g, exactly like the dropped ball. The **horizontal velocity** only decides how far sideways it goes. So both take the same time, √(2h/g).',
  sol: 'Independent components; same vertical motion.',
  scheme: [['Horizontal and vertical motions are independent', 1], ['Same initial vertical velocity (zero) and acceleration g, so same time', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('toppt-short', short({
  marks: 2,
  stem: 'State the velocity and the acceleration of a ball at the highest point of its oblique flight, neglecting air resistance.',
  model: 'At the highest point the **velocity is horizontal**, with magnitude u cos θ, because the vertical component has become zero. The **acceleration is g, directed vertically downward**, the same as at every other point of the path.',
  sol: 'v = u cos θ horizontal; a = g downward.',
  scheme: [['Velocity horizontal, u cos θ (v_y = 0)', 1], ['Acceleration g downward, unchanged', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('path-short3', short({
  marks: 3,
  stem: 'A projectile is launched with speed u at an angle θ above the horizontal. Show that its path is a parabola.',
  model: 'Taking the launch point as origin, x = u cos θ · t and y = u sin θ · t − ½ g t². From the first, t = x/(u cos θ). Substituting in the second, **y = x tan θ − g x² / (2 u² cos² θ)**. This has the form y = a x − b x², where a and b are constants, which is the equation of a **parabola**.',
  sol: 'Eliminate t between x and y.',
  scheme: [['x = u cos θ t and y = u sin θ t − ½ g t²', 1], ['Eliminate t: y = x tan θ − g x²/(2u² cos² θ)', 1], ['Form y = ax − bx²: a parabola', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('range-short3', short({
  marks: 3,
  stem: 'Obtain the expression for the horizontal range of a projectile on level ground and show that, for a given speed, the range is greatest when the angle of projection is 45°.',
  model: 'Time of flight T = 2u sin θ/g and the horizontal speed is u cos θ, so **R = u cos θ × 2u sin θ/g = u² sin 2θ / g**. For a given u, R is greatest when sin 2θ has its largest value, **1**, that is 2θ = 90°, or **θ = 45°**, and then R = u²/g.',
  sol: 'R = u² sin 2θ/g; sin 2θ = 1.',
  scheme: [['T = 2u sin θ/g', 1], ['R = u cos θ × T = u² sin 2θ/g', 1], ['Maximum when sin 2θ = 1, θ = 45°, R = u²/g', 1]],
  d: 3, c: 'understanding', t: [3],
}));
const pl = { ux: 18, uy: 24 };
pl.u = Math.hypot(pl.ux, pl.uy);
pl.T = (2 * pl.uy) / g;
pl.H = (pl.uy ** 2) / (2 * g);
pl.R = pl.ux * pl.T;
add('proj-long', long({
  stem: '(a) Derive expressions for the time of flight, the maximum height and the horizontal range of a projectile launched from level ground with speed u at an angle θ above the horizontal. (b) A ball is thrown with a speed of 30 m/s at an angle whose sine is 0.8 and cosine is 0.6. Taking g = 9.8 m/s², find its time of flight, maximum height and range.',
  model: r`(a) Resolve the launch velocity: $u_x = u\cos\theta$, $u_y = u\sin\theta$. Vertically $y = u\sin\theta\,t - \tfrac{1}{2}gt^2$. At landing $y = 0$ gives $T = \dfrac{2u\sin\theta}{g}$. At the top $v_y = u\sin\theta - gt = 0$, so $t = \dfrac{u\sin\theta}{g}$ and $H = \dfrac{u^2\sin^2\theta}{2g}$. Horizontally the speed is constant, so $R = u\cos\theta \times T = \dfrac{u^2\sin 2\theta}{g}$.

(b) $u_x = 30 \times 0.6 = ${pl.ux}$ m/s and $u_y = 30 \times 0.8 = ${pl.uy}$ m/s. $T = \dfrac{2 \times ${pl.uy}}{9.8} = ${d3(pl.T)}$ s. $H = \dfrac{${pl.uy ** 2}}{19.6} = ${d3(pl.H)}$ m. $R = ${pl.ux} \times ${d3(pl.T)} = ${d3(pl.R)}$ m.`,
  sol: 'Derivation; T 4.90 s, H 29.4 m, R 88.2 m.',
  scheme: [['Resolution and vertical equation', 1], ['T = 2u sin θ/g and H = u² sin² θ/2g derived', 2], ['R = u² sin 2θ/g', 1], [`Numbers: T = ${d3(pl.T)} s, H = ${d3(pl.H)} m, R = ${d3(pl.R)} m`, 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => { const n = projNumeric(30, deg(Math.atan2(24, 18))); return near(n.T, pl.T, 0.002) && near(n.H, pl.H, 0.002) && near(n.R, pl.R, 0.002) && near(pl.u, 30, 1e-9) || 'pl'; });
const bg = { u: 15, h: 44.1 };
bg.T = Math.sqrt((2 * bg.h) / g);
bg.R = bg.u * bg.T;
bg.vy = g * bg.T;
bg.v = Math.hypot(bg.u, bg.vy);
bg.ang = deg(Math.atan2(bg.vy, bg.u));
add('horiz-long', long({
  stem: '(a) A body is projected horizontally with speed u from a height h. Show that its path is a parabola and obtain its time of flight and range. (b) A stone is thrown horizontally at 15 m/s from a bridge 44.1 m above a river. Taking g = 9.8 m/s², find the time of flight, the horizontal distance covered, and the speed and direction of the stone as it reaches the water.',
  model: r`(a) Take the launch point as origin with $y$ downward. $x = ut$ and $y = \tfrac{1}{2}gt^2$. Eliminating $t$: $y = \dfrac{g}{2u^2}x^2$, a parabola. The stone reaches depth $h$ when $h = \tfrac{1}{2}gT^2$, so $T = \sqrt{\dfrac{2h}{g}}$, and the range is $R = uT = u\sqrt{\dfrac{2h}{g}}$.

(b) $T = \sqrt{\dfrac{2 \times ${bg.h}}{9.8}} = \sqrt{${R6((2 * bg.h) / g)}} = ${d3(bg.T)}$ s. $R = ${bg.u} \times ${d3(bg.T)} = ${d3(bg.R)}$ m. At the water $v_x = ${bg.u}$ m/s and $v_y = gT = ${d3(bg.vy)}$ m/s downward, so $v = \sqrt{${bg.u ** 2} + ${d3(bg.vy ** 2)}} = ${d3(bg.v)}$ m/s, at $\tan^{-1}\dfrac{${d3(bg.vy)}}{${bg.u}} = ${d3(bg.ang)}$ degrees below the horizontal.`,
  sol: 'y = gx²/2u²; T = 3.00 s, R = 45.0 m, v = 33.0 m/s at 63.0° below the horizontal.',
  scheme: [['x = ut, y = ½gt², eliminate t: parabola', 1], ['T = √(2h/g) and R = uT derived', 1], [`T = ${d3(bg.T)} s and R = ${d3(bg.R)} m`, 1], [`v_y = ${d3(bg.vy)} m/s, speed ${d3(bg.v)} m/s`, 1], [`Direction ${d3(bg.ang)}° below the horizontal`, 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => { const n = projNumeric(bg.u, 0, bg.h); return near(n.T, 3, 0.002) && near(n.R, 45, 0.002) && near(Math.hypot(n.vxEnd, n.vyEnd), bg.v, 0.002) && near(bg.ang, 62.97, 1e-3) || 'bg'; });
const rf = { u: 20, th: 30, h: 25 };
rf.p = proj(rf.u, rf.th, rf.h);
add('roof-num', num({
  stem: 'A stone is thrown from the roof of a 25 m high building at 20 m/s at 30° above the horizontal. Taking g = 9.8 m/s², find the horizontal distance from the foot of the building at which it lands, in m (3 significant figures).',
  value: v3(rf.p.R), tol: 0.3, unit: 'm',
  sol: r`$u_x = ${d3(rf.p.ux)}$ m/s and $u_y = ${d3(rf.p.uy)}$ m/s. Landing: $-25 = ${d3(rf.p.uy)}\,T - 4.9T^2$, i.e. $4.9T^2 - ${d3(rf.p.uy)}T - 25 = 0$, so $T = \dfrac{${d3(rf.p.uy)} + \sqrt{${d3(rf.p.uy ** 2)} + ${R6(4 * 4.9 * 25)}}}{9.8} = ${d3(rf.p.T)}$ s. Range $R = u_xT = ${d3(rf.p.ux)} \times ${d3(rf.p.T)} = ${d3(rf.p.R)}$ m.`,
  scheme: [['Vertical equation −25 = u_y T − ½gT²', 1], [`T = ${d3(rf.p.T)} s (positive root)`, 1], [`R = u_x T = ${d3(rf.p.R)} m`, 1]],
  marks: 3, d: 4, c: 'analysis', t: [3],
}), (q) => near(projNumeric(rf.u, rf.th, rf.h).R, q.answer.value, 0.004) || 'roof');
const gl = { u: 20, th: 30, x: 30, bar: 2.44 };
gl.y = gl.x * Math.tan(rad(gl.th)) - (g * gl.x ** 2) / (2 * gl.u ** 2 * Math.cos(rad(gl.th)) ** 2);
add('goal-num', num({
  stem: 'A footballer kicks a ball from the ground at 20 m/s at 30° above the horizontal towards a goal line 30 m away. Taking g = 9.8 m/s², find the height of the ball above the ground when it is above the goal line, in m (3 significant figures).',
  value: v3(gl.y), tol: 0.03, unit: 'm',
  sol: r`$y = x\tan\theta - \dfrac{gx^2}{2u^2\cos^2\theta} = 30 \times ${d3(Math.tan(rad(30)))} - \dfrac{9.8 \times 900}{2 \times 400 \times ${d3(Math.cos(rad(30)) ** 2)}} = ${d3(30 * Math.tan(rad(30)))} - ${d3((g * 900) / (800 * Math.cos(rad(30)) ** 2))} = ${d3(gl.y)}$ m. This is above the 2.44 m crossbar, so the ball passes over the bar.`,
  scheme: [['Use y = x tan θ − g x²/(2u² cos² θ) with x = 30 m', 1], [`Height = ${d3(gl.y)} m`, 1], [`Compare with 2.44 m: ball is above the bar`, 1]],
  marks: 3, d: 4, c: 'analysis', t: [3],
}), (q) => { const n = projNumeric(gl.u, gl.th); const tt = gl.x / (gl.u * Math.cos(rad(gl.th))); return tt < n.T && near(gl.u * Math.sin(rad(gl.th)) * tt - 0.5 * g * tt * tt, q.answer.value, 0.005) || 'gl'; });

// ---------------------------------------------------------------- cases
const hh = { u: 24.5, th: 30 };
hh.p = proj(hh.u, hh.th);
add('hose-case', mk.case({
  passage: 'During a fire drill in Bhopal a nozzle on the ground sends a jet of water at 24.5 m/s at 30° above the horizontal. Treat each drop of water as a projectile, take g = 9.8 m/s² and neglect air resistance.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The horizontal component of the velocity of a water drop during its flight is',
      right: `${d3(hh.p.ux)} m/s, the same throughout`,
      wrong: [`${d3(hh.p.uy)} m/s, the same throughout`, `${d3(hh.p.ux)} m/s at launch, falling to zero at the top`, 'zero throughout, since the jet is pushed up'],
      sol: `No horizontal force acts, so the horizontal velocity stays at 24.5 cos 30° = ${d3(hh.p.ux)} m/s — option (@K).`,
      d: 1, c: 'understanding', t: [3],
    })),
    part('b', num({
      stem: 'Find the greatest height reached by the water above the nozzle, in m (3 significant figures).',
      value: v3(hh.p.H), tol: 0.02, unit: 'm',
      sol: r`$u_y = 24.5\sin 30^\circ = ${d3(hh.p.uy)}$ m/s, so $H = \dfrac{u_y^2}{2g} = \dfrac{${d3(hh.p.uy ** 2)}}{19.6} = ${d3(hh.p.H)}$ m.`,
      scheme: [[`u_y = ${d3(hh.p.uy)} m/s, H = u_y²/2g = ${d3(hh.p.H)} m`, 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Find the horizontal distance from the nozzle at which the water returns to the ground.',
      model: r`$T = \dfrac{2u\sin\theta}{g} = \dfrac{2 \times ${d3(hh.p.uy)}}{9.8} = ${R6(hh.p.T)}$ s, so $R = u_xT = ${d3(hh.p.ux)} \times ${R6(hh.p.T)} = ${d3(hh.p.R)}$ m. (Check: $R = \dfrac{u^2\sin 2\theta}{g} = \dfrac{${d3(hh.u ** 2)} \times 0.866}{9.8} = ${d3(hh.p.R)}$ m.)`,
      sol: `T = ${R6(hh.p.T)} s, R = ${d3(hh.p.R)} m.`,
      scheme: [[`T = 2u sin θ/g = ${R6(hh.p.T)} s`, 1], [`R = u_x T = ${d3(hh.p.R)} m`, 1]],
      d: 3, c: 'application', t: [3], wl: null,
    }), [
      short({
        marks: 2,
        stem: 'A trainee claims that tilting the nozzle to 60° would send the water farther than 30° does, because the jet goes higher. Evaluate this claim.',
        model: r`The claim is **wrong**. Range depends on $\sin 2\theta$, and $\sin 120^\circ = \sin 60^\circ$, so 60° and 30° give the **same range**, ${d3(hh.p.R)} m, for the same speed. The 60° jet rises higher (${d3(proj(hh.u, 60).H)} m against ${d3(hh.p.H)} m) and stays in the air longer, but lands at the same distance.`,
        sol: 'R(60°) = R(30°); the jet is only higher.',
        scheme: [['Wrong: R ∝ sin 2θ is equal for θ and 90° − θ', 1], [`Same range ${d3(hh.p.R)} m; 60° only gives a greater height`, 1]],
        d: 4, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}), (q) => { const n = projNumeric(hh.u, hh.th); return near(n.R, hh.p.R, 0.002) && near(proj(hh.u, 60).R, hh.p.R, 1e-9) && near(n.H, q.children[1].answer.value, 0.005) || 'hh'; });
const rl = { u: 80, h: 490 };
rl.T = Math.sqrt((2 * rl.h) / g);
rl.R = rl.u * rl.T;
rl.vy = g * rl.T;
rl.v = Math.hypot(rl.u, rl.vy);
add('relief-case', mk.case({
  passage: 'To help villagers cut off by floods in Assam, a transport aircraft flies horizontally at 80 m/s at a height of 490 m above a field and releases a food packet. Take g = 9.8 m/s² and neglect air resistance.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The time the packet takes to reach the ground depends on',
      right: 'the height of release only, not on the aircraft’s speed',
      wrong: ['the aircraft’s speed only', 'both the speed and the height equally', 'the mass of the packet'],
      sol: 'The vertical motion starts from zero vertical velocity with acceleration g, so h = ½gT² fixes T = √(2h/g) whatever the horizontal speed — option (@K).',
      d: 1, c: 'understanding', t: [3],
    })),
    part('b', num({
      stem: 'Find the horizontal distance travelled by the packet from the release point to the point where it lands, in m.',
      value: v3(rl.R), tol: 2, unit: 'm',
      sol: r`$T = \sqrt{\dfrac{2h}{g}} = \sqrt{\dfrac{${2 * rl.h}}{9.8}} = \sqrt{${R6((2 * rl.h) / g)}} = ${d3(rl.T)}$ s. Horizontal distance $= uT = ${rl.u} \times ${d3(rl.T)} = ${d3(rl.R)}$ m.`,
      scheme: [[`T = √(2h/g) = ${d3(rl.T)} s; distance = uT = ${d3(rl.R)} m`, 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Find the speed of the packet at the instant it reaches the ground.',
      model: r`$v_x = ${rl.u}$ m/s and $v_y = gT = 9.8 \times ${d3(rl.T)} = ${d3(rl.vy)}$ m/s. The speed is $\sqrt{${rl.u ** 2} + ${d3(rl.vy ** 2)}} = ${d3(rl.v)}$ m/s.`,
      sol: `v = √(80² + 98²) = ${d3(rl.v)} m/s.`,
      scheme: [[`v_y = gT = ${d3(rl.vy)} m/s, v_x = ${rl.u} m/s`, 1], [`Speed = ${d3(rl.v)} m/s`, 1]],
      d: 3, c: 'application', t: [3], wl: null,
    }), [
      short({
        marks: 2,
        stem: 'A volunteer says the packet should be released when the aircraft is exactly above the target, since the packet falls straight down. Evaluate this advice.',
        model: r`The advice is **wrong**. The packet leaves with the aircraft’s horizontal velocity of ${rl.u} m/s and keeps it, so it lands about ${d3(rl.R)} m ahead of the release point. It must be released **${d3(rl.R)} m before** the point above the target (about ${d3(rl.T)} s earlier); it does not fall vertically.`,
        sol: `Horizontal velocity retained: release about ${d3(rl.R)} m early.`,
        scheme: [['Wrong: the packet keeps the horizontal velocity', 1], [`Release about ${d3(rl.R)} m before the target`, 1]],
        d: 4, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}), (q) => { const n = projNumeric(rl.u, 0, rl.h); return near(n.T, 10, 0.002) && near(n.R, 800, 0.002) && near(Math.hypot(n.vxEnd, n.vyEnd), rl.v, 0.002) && near(q.children[1].answer.value, 800, 0.003) || 'rl'; });

// ---------------------------------------------------------------- qualitative (understanding) items added in the competency rebalance
add('complair-short', short({
  marks: 2,
  stem: 'Two identical cricket balls are thrown with the same speed from the same ground level, one at 20° and the other at 70°. Explain, without calculation, why they land at the same place but one stays in the air longer.',
  model: 'The angles add up to 90°, so the ranges are equal because R depends on sin 2θ. But the time of flight is 2u sin θ/g: the 70° ball has the larger vertical component of velocity, so it rises higher and stays in the air longer.',
  sol: 'sin 2θ equal; T ∝ sin θ larger at 70°.',
  scheme: [['Complementary angles: equal range (R ∝ sin 2θ)', 1], ['T ∝ sin θ, larger for 70°: greater vertical velocity', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('hvstrobe-mcq', mcq({
  stem: 'In a multi-flash photograph of a ball thrown across a field, the images are taken at equal time intervals. The horizontal gaps between successive images are all equal, but the vertical gaps near the launch point are larger than those near the top of the path. This shows that',
  right: 'the horizontal velocity is constant while the vertical velocity changes',
  wrong: ['both velocity components are constant', 'the horizontal velocity changes while the vertical velocity is constant', 'the ball is being pushed forward all along its path'],
  sol: 'Equal horizontal gaps in equal times mean constant horizontal velocity; the vertical gaps shrink on the way up, so the vertical velocity decreases because of gravity — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('rangegraph-mcq', mcq({
  stem: 'A graph is drawn of the horizontal range of a ball against its angle of projection (0° to 90°) for a fixed launch speed from level ground, neglecting air resistance. Its shape is',
  right: 'a hump, symmetric about 45°, with its maximum at 45° and zero range at 0° and 90°',
  wrong: ['a straight line rising from 0° to 90°', 'a hump with its maximum at 90°', 'a hump that is not symmetric, with its maximum at 60°'],
  sol: 'R ∝ sin 2θ, which is zero at 0° and 90°, largest at 45°, and equal at θ and 90° − θ, so the graph is symmetric about 45° — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
