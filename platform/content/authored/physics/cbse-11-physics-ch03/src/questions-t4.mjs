// ch03 question bank, part 3: t04 (uniform circular motion: period, frequency, angular speed, centripetal acceleration).
// Numerical items are re-solved from the position of the body, a(t) found by a second central difference, independent of v²/r.
import { mk, add, r, dec, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { g, rad, deg, R6, accelMag } from './phys.mjs';

const { mcq, ar, tf, fill, num, short, long, part } = mk;
const v3 = (x) => Number(dec(x, 3));
const d3 = (x) => dec(x, 3);
const TWO_PI = 2 * Math.PI;
/** Centripetal acceleration (m/s²) found numerically from circular motion of radius r and angular speed w. */
const aNum = (rr, w) => accelMag((t) => [rr * Math.cos(w * t), rr * Math.sin(w * t)], 0.7, 0.02 / w);

add('cdir-mcq', mcq({
  stem: 'A stone tied to a string is whirled in a horizontal circle at a steady speed. At any instant the acceleration of the stone is',
  right: 'directed towards the centre of the circle, with constant magnitude',
  wrong: ['zero, because the speed does not change', 'directed along the tangent, in the direction of motion', 'directed away from the centre of the circle'],
  sol: 'The speed is constant, but the velocity changes direction, so there is an acceleration, v²/r, always directed towards the centre — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
const hw = { w: TWO_PI / (12 * 3600) };
add('omega-mcq', mcq({
  stem: 'The hour hand of a wall clock makes one complete turn in 12 hours. Its angular speed is about',
  right: '1.45 × 10⁻⁴ rad/s',
  wrong: ['1.74 × 10⁻³ rad/s', '7.27 × 10⁻⁵ rad/s', '0.105 rad/s'],
  sol: `ω = 2π/T = 2π/(12 × 3600 s) = ${d3(hw.w * 1e4)} × 10⁻⁴ rad/s. The other options belong to the minute hand (1.74 × 10⁻³), a 24-hour rotation (7.27 × 10⁻⁵) and the second hand (0.105) — option (@K).`,
  d: 2, c: 'application', t: [4],
}), () => near(hw.w, 1.4544e-4, 1e-3) && near(TWO_PI / 3600, 1.745e-3, 1e-3) && near(TWO_PI / 86400, 7.272e-5, 1e-3) && near(TWO_PI / 60, 0.1047, 1e-3) || 'hw');
add('turn-mcq', mcq({
  stem: 'Two children sit on a merry-go-round turning at a steady rate, one at 1.0 m from the axis and the other at 2.0 m. The ratio of their centripetal accelerations (outer : inner) is',
  right: '2 : 1',
  wrong: ['1 : 2', '4 : 1', '1 : 1'],
  sol: 'Both have the same angular speed ω, and a = ω²r is proportional to r, so the outer child has twice the acceleration — option (@K).',
  d: 3, c: 'application', t: [4],
}), () => near(aNum(2, 1.3) / aNum(1, 1.3), 2, 1e-3) || 'turn');
add('scale-mcq', mcq({
  stem: 'A scooter goes round a circular track at a steady speed. If its speed is doubled on the same track, its centripetal acceleration becomes',
  right: '4 times',
  wrong: ['2 times', 'half', '8 times'],
  sol: 'a = v²/r with r unchanged: doubling v multiplies a by 2² = 4 — option (@K).',
  d: 2, c: 'application', t: [4],
}), () => near(aNum(5, 0.8) * 4, aNum(5, 1.6), 1e-3) || 'scale');
add('period-fill', fill({
  stem: 'A giant wheel at a fair turns steadily; the time it takes to make one complete revolution is called its ___.',
  acc: [['period', 'time period']],
  sol: 'The time for one complete revolution is the **period** T (and the frequency is 1/T).',
  d: 1, c: 'recall', t: [4],
}));
add('ucm-tf', tf({
  stem: 'When a body moves in uniform circular motion, its average velocity over one complete revolution is zero although its average speed is not.',
  key: 't',
  sol: 'True. After a full revolution the displacement is zero, so the average velocity is zero; the path length is 2πr, so the average speed is 2πr/T, not zero.',
  d: 2, c: 'understanding', t: [4],
}));
add('ucm-ar', ar({
  a: 'In uniform circular motion the acceleration of the body points towards the centre of the circle.',
  r: 'The speed of a body in uniform circular motion is constant.',
  key: 'b',
  sol: 'Both are true, but constant speed does not explain the direction of the acceleration. The direction follows from the change of the velocity vector, which points to the centre — option (b).',
  d: 3, c: 'understanding', t: [4],
}));
const sh = { L: 0.40, T: 60 };
sh.w = TWO_PI / sh.T;
sh.v = sh.w * sh.L;
add('tip-num', num({
  stem: 'The second hand of a station clock is 0.40 m long. Find the speed of the tip of the hand, in m/s (3 significant figures).',
  value: v3(sh.v), tol: 0.0005, unit: 'm/s',
  sol: r`The second hand turns once in 60 s: $\omega = \dfrac{2\pi}{T} = \dfrac{2\pi}{60} = ${d3(sh.w)}$ rad/s. Speed $v = \omega r = ${d3(sh.w)} \times 0.40 = ${d3(sh.v)}$ m/s.`,
  scheme: [[`ω = 2π/60 = ${d3(sh.w)} rad/s`, 1], [`v = ωr = ${d3(sh.v)} m/s`, 1]],
  marks: 2, d: 2, c: 'application', t: [4],
}), (q) => near((TWO_PI * sh.L) / 60, q.answer.value, 0.003) || 'sh');
const wh = { r: 0.5, rpm: 300 };
wh.w = (TWO_PI * wh.rpm) / 60;
wh.v = wh.w * wh.r;
wh.a = wh.w ** 2 * wh.r;
add('wheel-num', num({
  stem: 'A bus tyre of radius 0.50 m rotates steadily at 300 revolutions per minute. Find the centripetal acceleration of a point on its rim, in m/s² (3 significant figures).',
  value: v3(wh.a), tol: 1, unit: 'm/s²',
  sol: r`$\omega = \dfrac{2\pi \times 300}{60} = ${d3(wh.w)}$ rad/s. $a = \omega^2 r = (${d3(wh.w)})^2 \times 0.50 = ${d3(wh.a)}$ m/s$^2$. (Check: $v = \omega r = ${d3(wh.v)}$ m/s and $v^2/r = ${d3(wh.v ** 2 / wh.r)}$ m/s$^2$.)`,
  scheme: [['Convert: ω = 2π × 300/60', 1], [`a = ω²r = ${d3(wh.a)} m/s²`, 2]],
  marks: 3, d: 3, c: 'application', t: [4],
}), (q) => near(aNum(0.5, wh.w), q.answer.value, 0.004) || 'wh');
const rb = { kmh: 36, r: 25 };
rb.v = rb.kmh / 3.6;
rb.a = rb.v ** 2 / rb.r;
const sat = { r: 7.0e6, T: 5.8e3 };
sat.a = ((TWO_PI / sat.T) ** 2) * sat.r;
add('sat-num', num({
  stem: 'A small satellite moves in a circular orbit of radius 7.0 × 10⁶ m and takes 5.8 × 10³ s for one revolution. Find its centripetal acceleration, in m/s² (3 significant figures).',
  value: v3(sat.a), tol: 0.05, unit: 'm/s²',
  sol: r`$\omega = \dfrac{2\pi}{T} = \dfrac{2\pi}{5.8 \times 10^3} = ${dec(TWO_PI / sat.T * 1e3, 4)} \times 10^{-3}$ rad/s. $a = \omega^2 r = (${dec(TWO_PI / sat.T * 1e3, 4)} \times 10^{-3})^2 \times 7.0 \times 10^6 = ${d3(sat.a)}$ m/s$^2$.`,
  scheme: [['ω = 2π/T', 1], ['a = ω²r', 1], [`a = ${d3(sat.a)} m/s²`, 1]],
  marks: 3, d: 3, c: 'application', t: [4],
}), (q) => near(aNum(sat.r, TWO_PI / sat.T) , q.answer.value, 0.01) || 'sat');
const mo = { r: 3.84e8, days: 27.3 };
mo.T = mo.days * 86400;
mo.a = ((TWO_PI / mo.T) ** 2) * mo.r;
add('moon-num', num({
  stem: 'The Moon goes round the Earth in a nearly circular orbit of radius 3.84 × 10⁸ m in 27.3 days. Find its centripetal acceleration, in m/s² (3 significant figures).',
  value: v3(mo.a), tol: 0.00003, unit: 'm/s²',
  sol: r`$T = 27.3 \times 86400 = ${dec(mo.T, 4)}$ s, so $\omega = \dfrac{2\pi}{T} = ${dec((TWO_PI / mo.T) * 1e6, 4)} \times 10^{-6}$ rad/s. $a = \omega^2 r = (${dec((TWO_PI / mo.T) * 1e6, 4)} \times 10^{-6})^2 \times 3.84 \times 10^8 = ${d3(mo.a)}$ m/s$^2$.`,
  scheme: [['T in seconds and ω = 2π/T', 1], [`a = ω²r = ${d3(mo.a)} m/s²`, 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near(aNum(mo.r, TWO_PI / mo.T) * 1, q.answer.value, 0.02) || 'mo');
const rp = { rpm: 120 };
rp.w = (TWO_PI * rp.rpm) / 60;
const mh = { min: 20 };
mh.th = (TWO_PI * mh.min) / 60;
add('angle-num2', num({
  stem: 'Through what angle, in radians, does the minute hand of a clock turn in 20 minutes? (3 significant figures)',
  value: v3(mh.th), tol: 0.01, unit: 'rad',
  sol: r`The minute hand turns $2\pi$ rad in 60 min. In 20 min: $\theta = 2\pi \times \dfrac{20}{60} = ${d3(mh.th)}$ rad (one-third of a turn, 120°).`,
  scheme: [[`θ = 2π × 20/60 = ${d3(mh.th)} rad`, 1]],
  d: 1, c: 'application', t: [4],
}), (q) => near(deg(q.answer.value), 120, 0.003) || 'mh');
const ct = { rpm: 3000, r: 0.12 };
ct.w = (TWO_PI * ct.rpm) / 60;
ct.a = ct.w ** 2 * ct.r;
ct.n = ct.a / g;
add('centrifuge-num', num({
  stem: 'A laboratory centrifuge spins a test tube whose bottom is 0.12 m from the axis at 3000 revolutions per minute. Find the centripetal acceleration at the bottom of the tube as a multiple of g, taking g = 9.8 m/s² (3 significant figures).',
  value: v3(ct.n), tol: 5, unit: null,
  sol: r`$\omega = \dfrac{2\pi \times 3000}{60} = ${d3(ct.w)}$ rad/s. $a = \omega^2 r = (${d3(ct.w)})^2 \times 0.12 = ${dec(ct.a, 4)}$ m/s$^2$. In units of $g$: $\dfrac{${dec(ct.a, 4)}}{9.8} = ${d3(ct.n)}$.`,
  scheme: [[`ω = 2π × 3000/60 = ${d3(ct.w)} rad/s`, 1], [`a = ω²r = ${dec(ct.a, 4)} m/s²`, 1], [`a/g = ${d3(ct.n)}`, 1]],
  marks: 3, d: 4, c: 'analysis', t: [4],
}), (q) => near(aNum(ct.r, ct.w) / g, q.answer.value, 0.005) || 'ct');
const tb = { rA: 0.2, rB: 0.6 };
add('ratio-num', num({
  stem: 'Two toy figures stand on a turntable rotating at a steady rate, at distances of 0.20 m and 0.60 m from the axis. Find the ratio of the centripetal acceleration of the outer toy to that of the inner toy.',
  value: R6(tb.rB / tb.rA), tol: 0.02, unit: null,
  sol: r`Both turn with the same $\omega$, and $a = \omega^2 r$, so $\dfrac{a_{outer}}{a_{inner}} = \dfrac{r_{outer}}{r_{inner}} = \dfrac{0.60}{0.20} = ${R6(tb.rB / tb.rA)}$.`,
  scheme: [['Same ω; a ∝ r', 1]],
  d: 2, c: 'application', t: [4],
}), (q) => near(aNum(tb.rB, 2.1) / aNum(tb.rA, 2.1), q.answer.value, 1e-3) || 'tb');
add('cacc-short', short({
  marks: 2,
  stem: 'A car goes round a circular bend at a constant speed of 54 km/h. Is the car accelerating? Give a reason and state the direction of its acceleration.',
  model: 'Yes. Acceleration is the rate of change of **velocity**, and the velocity changes direction continually even though the speed is constant. The acceleration, v²/r, is directed **towards the centre of the bend**, at right angles to the velocity.',
  sol: 'Velocity changes direction; a = v²/r towards the centre.',
  scheme: [['Accelerating: velocity (direction) changes', 1], ['a = v²/r, towards the centre, perpendicular to v', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('vomega-short', short({
  marks: 2,
  stem: 'A particle moves with angular speed ω on a circle of radius r. Show that its linear speed is v = ωr.',
  model: 'In a short time Δt the particle turns through an angle Δθ and covers an arc Δs = r Δθ (angle in radians). The speed is v = Δs/Δt = r (Δθ/Δt) = **ω r**, since ω = Δθ/Δt. In one period it covers 2πr, so also v = 2πr/T.',
  sol: 'Arc = rΔθ; divide by Δt.',
  scheme: [['Arc Δs = r Δθ', 1], ['v = Δs/Δt = r Δθ/Δt = ωr', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('depend-short3', short({
  marks: 3,
  stem: 'Write two expressions for the centripetal acceleration of a body in uniform circular motion. How does it change if (i) the speed is halved at the same radius and (ii) the radius is doubled at the same speed?',
  model: 'The centripetal acceleration is **a = v²/r = ω²r**, directed to the centre. (i) With r fixed, a ∝ v², so halving the speed makes the acceleration **one quarter**. (ii) With v fixed, a ∝ 1/r, so doubling the radius makes the acceleration **one half**.',
  sol: 'a = v²/r = ω²r; ¼ and ½.',
  scheme: [['a = v²/r = ω²r', 1], ['Halved speed: a becomes one quarter', 1], ['Doubled radius: a becomes one half', 1]],
  d: 3, c: 'application', t: [4],
}));
add('derive-short3', short({
  marks: 3,
  stem: 'Using the change of velocity between two nearby points of a circular path, explain why the acceleration in uniform circular motion points towards the centre and has magnitude v²/r.',
  model: 'Draw the velocities v₁ and v₂ (equal length v, angle Δθ between them) from one point. Their difference Δv has magnitude **vΔθ** for small Δθ and points **along the radius towards the centre**. The time is Δt = rΔθ/v, so a = Δv/Δt = vΔθ ÷ (rΔθ/v) = **v²/r**, towards the centre.',
  sol: 'Δv ≈ vΔθ towards the centre; divide by Δt = rΔθ/v.',
  scheme: [['Δv = vΔθ, directed to the centre as Δθ → 0', 1], ['Δt = rΔθ/v', 1], ['a = Δv/Δt = v²/r', 1]],
  d: 3, c: 'understanding', t: [4],
}));
const cl = { r: 15, v: 6 };
cl.a = cl.v ** 2 / cl.r;
cl.w = cl.v / cl.r;
cl.T = (TWO_PI * cl.r) / cl.v;
add('circ-long', long({
  stem: '(a) Derive the expression for the centripetal acceleration of a body in uniform circular motion, using the change of velocity between two close points. (b) Show that it can also be written as ω²r. (c) A motorbike goes round a circular track of radius 15 m at a steady 6.0 m/s. Find its angular speed, its period and its centripetal acceleration.',
  model: r`(a) Let the body move from P₁ to P₂ in a short time $\Delta t$, turning through a small angle $\Delta\theta$. The velocities $\vec{v}_1$ and $\vec{v}_2$ have equal magnitude $v$; drawn from a common point they enclose the angle $\Delta\theta$, so $|\Delta\vec{v}| \approx v\Delta\theta$, directed towards the centre. The arc is $v\Delta t = r\Delta\theta$, so $\Delta t = \dfrac{r\Delta\theta}{v}$. Then $a = \dfrac{|\Delta\vec{v}|}{\Delta t} = \dfrac{v\Delta\theta}{r\Delta\theta/v} = \dfrac{v^2}{r}$.

(b) With $v = \omega r$: $a = \dfrac{\omega^2r^2}{r} = \omega^2 r$.

(c) $\omega = \dfrac{v}{r} = \dfrac{${cl.v}}{${cl.r}} = ${cl.w}$ rad/s; $T = \dfrac{2\pi}{\omega} = ${d3(cl.T)}$ s; $a = \dfrac{v^2}{r} = \dfrac{${cl.v ** 2}}{${cl.r}} = ${d3(cl.a)}$ m/s$^2$.`,
  sol: 'a = v²/r = ω²r; ω = 0.40 rad/s, T = 15.7 s, a = 2.40 m/s².',
  scheme: [['Δv ≈ vΔθ toward the centre, Δt = rΔθ/v', 2], ['a = v²/r', 1], ['a = ω²r', 1], [`ω = ${cl.w} rad/s, T = ${d3(cl.T)} s, a = ${d3(cl.a)} m/s²`, 1]],
  d: 3, c: 'application', t: [4], wl: null,
}), () => near(aNum(cl.r, cl.w), cl.a, 0.005) && near(cl.w, 0.4, 1e-9) && near(cl.a, 2.4, 1e-9) || 'cl');
const gw = { r: 12, T: 40 };
gw.w = TWO_PI / gw.T;
gw.v = gw.w * gw.r;
gw.a = gw.w ** 2 * gw.r;
add('wheel-case', mk.case({
  passage: 'A giant wheel at a fair in Kolkata has riders’ cabins moving on a circle of radius 12 m. The wheel turns steadily and makes one complete revolution in 40 s.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'When a cabin is at the top of the wheel, its acceleration is directed',
      right: 'vertically downward, towards the axle',
      wrong: ['vertically upward, away from the axle', 'horizontally, along the velocity', 'nowhere: the acceleration is zero because the speed is constant'],
      sol: 'The acceleration is centripetal and points to the centre of the circle; at the top the centre is directly below the cabin, so the acceleration points downward — option (@K).',
      d: 2, c: 'understanding', t: [4],
    })),
    part('b', num({
      stem: 'Find the centripetal acceleration of a cabin, in m/s² (3 significant figures).',
      value: v3(gw.a), tol: 0.005, unit: 'm/s²',
      sol: r`$\omega = \dfrac{2\pi}{T} = \dfrac{2\pi}{40} = ${d3(gw.w)}$ rad/s. $a = \omega^2 r = (${d3(gw.w)})^2 \times 12 = ${d3(gw.a)}$ m/s$^2$. (The speed is $v = \omega r = ${d3(gw.v)}$ m/s.)`,
      scheme: [[`ω = 2π/40 = ${d3(gw.w)} rad/s; a = ω²r = ${d3(gw.a)} m/s²`, 1]],
      d: 3, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'How long does a cabin take to move from the lowest point to the point level with the axle (a quarter of a turn), and how far does it travel along the circle in that time?',
      model: r`A quarter turn takes $\dfrac{40}{4} = ${gw.T / 4}$ s. The distance along the circle is a quarter of the circumference: $\dfrac{2\pi \times 12}{4} = ${d3((TWO_PI * gw.r) / 4)}$ m (also $v t = ${d3(gw.v)} \times ${gw.T / 4} = ${d3(gw.v * gw.T / 4)}$ m).`,
      sol: '10 s; 18.8 m.',
      scheme: [[`t = T/4 = ${gw.T / 4} s`, 1], [`Arc = 2πr/4 = ${d3((TWO_PI * gw.r) / 4)} m`, 1]],
      d: 3, c: 'application', t: [4], wl: null,
    }), [
      short({
        marks: 2,
        stem: 'A rider says that because the wheel turns at a steady speed, nothing is accelerating her. Evaluate this statement.',
        model: r`The statement is **wrong**. The speed is steady, but her **velocity** changes direction all the time, so she has an acceleration of ${d3(gw.a)} m/s$^2$ directed towards the axle. Only for motion in a straight line at constant speed would the acceleration be zero.`,
        sol: 'Velocity changes direction; a = 0.296 m/s² to the axle.',
        scheme: [['Wrong: velocity (direction) changes', 1], [`a = ω²r = ${d3(gw.a)} m/s² towards the axle`, 1]],
        d: 4, c: 'evaluation', t: [4],
      }),
    ]),
  ],
}), (q) => near(aNum(gw.r, gw.w), q.children[1].answer.value, 0.01) && near(gw.v, 1.885, 1e-3) || 'gw');

// ---------------------------------------------------------------- qualitative (understanding) items added in the competency rebalance
add('omegaall-mcq', mcq({
  stem: 'Two ants sit on a record spinning on a turntable, one near the rim and the other near the centre. Which quantity is the same for both ants?',
  right: 'their angular speed',
  wrong: ['their speed along the circle', 'their centripetal acceleration', 'the radius of their circles'],
  sol: 'Both turn through the same angle in the same time, so ω is common; v = ωr and a = ω²r are larger for the ant at the larger radius — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('perp-short', short({
  marks: 2,
  stem: 'A car moves round a circular bend at a steady speed. Explain why its centripetal acceleration changes the direction of its velocity but not its speed.',
  model: 'The centripetal acceleration is directed towards the centre, at right angles to the velocity. It therefore has no component along the direction of motion, so it cannot speed the car up or slow it down; it only turns the velocity vector.',
  sol: 'a ⟂ v: no tangential component.',
  scheme: [['Acceleration is at right angles to the velocity', 1], ['No component along the motion: only direction changes, not speed', 1]],
  d: 2, c: 'understanding', t: [4],
}));
