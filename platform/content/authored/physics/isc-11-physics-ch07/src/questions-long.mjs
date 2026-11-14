// ISC 11 ch07 question bank, part 3: long answers (5 marks), set in parts with the marks shown.
import { mk, add, r, dec, near } from '../../isc-11-physics-ch01/src/lib.mjs';
import { g, rad, deg, TAU, accFD, speedFD, stepRotation, bankAngle, bankSpeed, levelVmax, circleRun } from './phys.mjs';

const { long } = mk;
const f = (x, n = 3) => dec(x, n);

// ---------------------------------------------------------------- t01: angular quantities and the braking wheel
const w1 = { R: 0.4, rpm: 90, t: 12 };
w1.w0 = (w1.rpm * TAU) / 60;
w1.al = -w1.w0 / w1.t;
w1.at = w1.R * w1.al;
w1.v0 = w1.w0 * w1.R;
add('angular-long', long({
  stem: `(a) Define angular displacement, angular velocity and angular acceleration for a particle moving on a circle, and write the relations connecting them with the arc length, the speed and the tangential acceleration of the particle. [3] (b) A potter’s wheel of radius ${w1.R} m turns at ${w1.rpm} revolutions per minute. A brake brings it uniformly to rest in ${w1.t} s. Find the angular acceleration and the tangential acceleration of a point on its rim. [2]`,
  model: r`(a) Angular displacement $\theta$ is the angle swept by the radius to the particle, measured in radians; angular velocity $\omega = d\theta/dt$ is its rate of change; angular acceleration $\alpha = d\omega/dt$ is the rate of change of $\omega$. The linear quantities follow as the arc $s = r\theta$, the speed $v = r\omega$ along the tangent, and the tangential acceleration $a_t = r\alpha$.

(b) The initial angular velocity is $\omega_0 = 2\pi \times ${w1.rpm}/60 = ${f(w1.w0, 4)}$ rad s$^{-1}$. The wheel comes to rest, so from $\omega = \omega_0 + \alpha t$ with $\omega = 0$, $\alpha = -${f(w1.w0, 4)}/${w1.t} = ${f(w1.al, 3)}$ rad s$^{-2}$, a retardation. The tangential acceleration is $a_t = r\alpha = ${w1.R} \times (${f(w1.al, 3)}) = ${f(w1.at, 3)}$ m s$^{-2}$, directed opposite to the motion.`,
  sol: 'Definitions and relations, then ω = ω₀ + αt with ω = 0 and a_t = rα.',
  scheme: [['Defines θ, ω and α (angle swept; dθ/dt; dω/dt)', 1], ['Relates s = rθ and v = rω along the tangent', 1], ['a_t = rα', 1], [`α = −ω₀/t = ${f(w1.al, 3).replace("-", "−")} rad s⁻² with ω₀ = ${f(w1.w0, 4)} rad s⁻¹`, 1], [`a_t = rα = ${f(w1.at, 3).replace("-", "−")} m s⁻², opposite to the motion`, 1]],
  d: 3, c: 'application', t: [1],
}), () => {
  const s = stepRotation(w1.w0, w1.al, w1.t);
  return near(s.w, 0, 1) && Math.abs(s.w) < 1e-3 && near(w1.R * w1.al, w1.at, 1e-12) && near(speedFD(w1.R, w1.w0), w1.v0, 1e-5) || 'angular';
});

// ---------------------------------------------------------------- t02: centripetal acceleration derivation and an ice-rink ball
const c2 = { m: 0.35, R: 0.9, f: 2.5 };
c2.w = TAU * c2.f;
c2.v = c2.w * c2.R;
c2.T = c2.m * c2.w * c2.w * c2.R;
add('centripetal-long', long({
  stem: `(a) A particle moves on a circle of radius r with constant speed v. Using a velocity triangle, show that its acceleration is v²/r and that it is directed towards the centre. [3] (b) A ball of mass ${c2.m} kg is tied to a cord of length ${c2.R} m and whirled in a horizontal circle on a smooth ice rink, making ${f(c2.f, 2)} revolutions per second. Name the force that supplies the centripetal force, and find its value. [2]`,
  model: r`(a) Take two nearby points where the velocities $\vec v_1$ and $\vec v_2$ have the same size $v$ but directions differing by a small angle $\Delta\theta$. Drawn from one point they form an isosceles triangle, so $|\Delta v| \approx v\,\Delta\theta$. Dividing by the time gives $a = |\Delta v|/\Delta t = v\omega = v^2/r$. As $\Delta\theta \to 0$, the change $\Delta\vec v$ is perpendicular to $\vec v$, along the radius towards the centre.

(b) The tension of the cord is the real force that supplies the centripetal force; the ice is smooth, so friction does not help; only the cord pulls the ball inwards. With $\omega = 2\pi f = ${f(c2.w, 4)}$ rad s$^{-1}$, the force is $T = m\omega^2 r = ${c2.m} \times ${f(c2.w, 4)}^2 \times ${c2.R} = ${f(c2.T, 4)}$ N.`,
  sol: 'Velocity triangle; then T = mω²r.',
  scheme: [['Isosceles velocity triangle with the angle Δθ between v₁ and v₂', 1], ['|Δv| ≈ vΔθ, so a = vω = v²/r', 1], ['As Δθ → 0, Δv points along the radius towards the centre', 1], ['The tension of the cord supplies the centripetal force', 1], [`T = mω²r = ${f(c2.T, 4)} N`, 1]],
  d: 3, c: 'application', t: [2],
}), () => {
  const w = c2.f * TAU;
  return near(c2.m * accFD(c2.R, w), c2.T, 1e-5) && near(speedFD(c2.R, w), c2.v, 1e-5) || 'centripetal';
});

// ---------------------------------------------------------------- t03: level road
const l3 = { R: 55, mu: 0.5, muw: 0.2 };
l3.v = Math.sqrt(l3.mu * l3.R * g);
l3.vw = Math.sqrt(l3.muw * l3.R * g);
add('level-long', long({
  stem: `(a) Name the force that supplies the centripetal force for a car taking a level circular bend, and derive an expression for the greatest speed at which the car can take the bend without skidding. [3] (b) A level bend on a ghat road has a radius of ${l3.R} m. Taking g = 9.8 m s⁻², find the greatest safe speed in km h⁻¹ when the road is dry (μ = ${l3.mu}) and when it is wet (μ = ${l3.muw}). [2]`,
  model: r`(a) The sideways static friction between the tyres and the road supplies the centripetal force. The road pushes up with a normal reaction that balances the weight, $N = mg$, so the greatest friction is $\mu mg$. At the greatest speed $mv^2/r = \mu mg$, giving $v_{\max} = \sqrt{\mu r g}$. The mass cancels, so the limit does not depend on the mass of the car, and it grows with the roughness of the road and with its radius.

(b) The wet road gives less friction, so a lower limit. Dry: $v = \sqrt{${l3.mu} \times ${l3.R} \times 9.8} = ${f(l3.v, 4)}$ m s$^{-1}$ $= ${f(l3.v * 3.6, 3)}$ km h$^{-1}$. Wet: $v = \sqrt{${l3.muw} \times ${l3.R} \times 9.8} = ${f(l3.vw, 4)}$ m s$^{-1}$ $= ${f(l3.vw * 3.6, 3)}$ km h$^{-1}$.`,
  sol: 'Friction supplies mv²/r; v_max = √(μrg); convert with 3.6.',
  scheme: [['Static friction between tyres and road supplies the centripetal force; N = mg', 1], ['mv²/r = μmg at the limit', 1], ['v_max = √(μrg), independent of the mass', 1], [`Dry: ${f(l3.v * 3.6, 3)} km h⁻¹`, 1], [`Wet: ${f(l3.vw * 3.6, 3)} km h⁻¹`, 1]],
  d: 3, c: 'application', t: [3],
}), () => near(levelVmax(l3.mu, l3.R), l3.v, 1e-6) && near(levelVmax(l3.muw, l3.R), l3.vw, 1e-6) || 'level');

// ---------------------------------------------------------------- t03: banked road
const b3 = { R: 160, th: 14 };
b3.v = Math.sqrt(b3.R * g * Math.tan(rad(b3.th)));
add('bank-long', long({
  stem: `(a) A car of mass m moves at speed v on a road banked at an angle θ on a bend of radius r. Draw a labelled force diagram and derive the angle of banking for which the car needs no friction. [3] (b) A bend of radius ${b3.R} m is banked at ${b3.th}°. Find the speed in m s⁻¹ and km h⁻¹ for which no friction is needed. State what tends to happen to a car travelling faster than this speed. [2]`,
  model: r`(a) Two real forces act on the car: the weight $mg$ vertically down and the normal reaction $N$ perpendicular to the road, tilted by $\theta$ from the vertical towards the centre. Vertically $N\cos\theta = mg$; horizontally $N\sin\theta = mv^2/r$, which is the centripetal force. Dividing the second by the first, $\tan\theta = v^2/(rg)$, independent of the mass.

(b) $v = \sqrt{rg\tan\theta} = \sqrt{${b3.R} \times 9.8 \times \tan ${b3.th}^\circ} = ${f(b3.v, 4)}$ m s$^{-1}$ $= ${f(b3.v * 3.6, 3)}$ km h$^{-1}$. A faster car tends to move outwards and up the slope, so friction acting down the slope must supply the extra inward force. At lower speeds the tendency is the other way, down the slope.`,
  sol: 'Resolve N; divide the equations; then v = √(rg tan θ).',
  scheme: [['Force diagram: mg down, N perpendicular to the road', 1], ['N cos θ = mg and N sin θ = mv²/r', 1], ['tan θ = v²/(rg)', 1], [`v = √(rg tan θ) = ${f(b3.v, 4)} m s⁻¹ = ${f(b3.v * 3.6, 3)} km h⁻¹`, 1], ['A faster car tends to move outwards and up the slope; friction supplies the extra inward force', 1]],
  d: 4, c: 'application', t: [3],
}), () => near(bankSpeed(b3.th, b3.R), b3.v, 1e-6) && near(bankAngle(b3.v, b3.R), b3.th, 1e-6) || 'bank');

// ---------------------------------------------------------------- t03: railway track
const r3 = { l: 1.676, R: 1200, v: 30 };
r3.th = deg(Math.atan((r3.v * r3.v) / (r3.R * g)));
r3.h = r3.l * Math.sin(rad(r3.th));
r3.happ = (r3.l * r3.v * r3.v) / (r3.R * g);
add('rail-long', long({
  stem: `(a) Explain why the outer rail is raised on a curved railway track, and obtain an expression for the height h by which it is raised, in terms of the gauge l, the speed v and the radius r. [3] (b) A broad-gauge track with l = ${r3.l} m has a curve of radius ${r3.R} m for trains at ${r3.v} m s⁻¹. Find the height by which the outer rail is raised, and say how it compares with the approximate value l v²/(rg). [2]`,
  model: r`(a) Raising the outer rail tilts the track towards the centre, so that at the design speed the horizontal component of the normal reaction supplies the centripetal force and the wheel flanges do not press on the rails. Then $\tan\theta = v^2/(rg)$, and from the geometry $\sin\theta = h/l$. For small angles $\sin\theta \approx \tan\theta$, so $h \approx l v^2/(rg)$.

(b) $\tan\theta = ${r3.v}^2/(${r3.R} \times 9.8) = ${f(Math.tan(rad(r3.th)), 4)}$, so $\theta = ${f(r3.th, 4)}^\circ$ and $h = l\sin\theta = ${f(r3.h, 4)}$ m, about $${f(r3.h * 1000, 4)}$ mm. The approximate value $${f(r3.happ, 4)}$ m is almost the same, since the angle is small, so the approximation is good, and the same curve at a higher speed would need a higher outer rail.`,
  sol: 'tan θ = v²/(rg), sin θ = h/l.',
  scheme: [['Banking: the horizontal component of N supplies the centripetal force, so the flanges need not press on the rails', 1], ['tan θ = v²/(rg) and sin θ = h/l', 1], ['Small angle: h ≈ lv²/(rg)', 1], [`θ = ${f(r3.th, 4)}°, h = l sin θ = ${f(r3.h * 1000, 4)} mm`, 1], [`Approximate value ${f(r3.happ * 1000, 4)} mm, almost the same`, 1]],
  d: 4, c: 'application', t: [3],
}), () => {
  const th = bankAngle(r3.v, r3.R);
  return near(r3.l * Math.sin(rad(th)), r3.h, 1e-6) && near(r3.happ, r3.h, 0.01) || 'rail';
});

// ---------------------------------------------------------------- t04: vertical circle
const v4 = { m: 0.2, R: 0.75, vt: 4.0 };
v4.Tt = v4.m * ((v4.vt * v4.vt) / v4.R - g);
v4.vb2 = v4.vt * v4.vt + 4 * g * v4.R;
v4.Tb = v4.m * (v4.vb2 / v4.R + g);
add('vcircle-long', long({
  stem: `(a) A ball on a light string moves in a vertical circle of radius r. Obtain the least speed it can have at the top and the least speed it must have at the bottom for the string to remain taut throughout. [3] (b) A ball of mass ${v4.m} kg on a string of length ${v4.R} m passes the top of the circle at ${f(v4.vt, 2)} m s⁻¹. Taking g = 9.8 m s⁻², find the tension at the top and at the bottom. [2]`,
  model: r`(a) At the top both the tension and the weight point to the centre, so $T + mg = mv^2/r$. The string cannot push, so $T \ge 0$; the least speed has $T = 0$, giving $v_t = \sqrt{gr}$. From the top to the bottom the ball falls through $2r$ and the tension does no work, so energy conservation gives $v_b^2 = v_t^2 + 4gr = 5gr$, and the least speed at the bottom is $v_b = \sqrt{5gr}$. Below this speed the string goes slack somewhere on the upper half.

(b) At the top $T = m(v^2/r - g) = ${v4.m}(${f(v4.vt * v4.vt, 3)}/${v4.R} - 9.8) = ${f(v4.Tt, 4)}$ N. Then $v_b^2 = ${f(v4.vt * v4.vt, 3)} + 4 \times 9.8 \times ${v4.R} = ${f(v4.vb2, 4)}$ m$^2$ s$^{-2}$, and at the bottom $T - mg = mv_b^2/r$ gives $T = m(v_b^2/r + g) = ${f(v4.Tb, 4)}$ N.`,
  sol: 'Radial equations at top and bottom, energy between them.',
  scheme: [['T + mg = mv²/r at the top; T = 0 gives v = √(gr)', 1], ['Energy over a fall of 2r: v_b² = v_t² + 4gr', 1], ['Least speed at the bottom √(5gr)', 1], [`T_top = m(v²/r − g) = ${f(v4.Tt, 4)} N`, 1], [`T_bottom = m(v_b²/r + g) = ${f(v4.Tb, 4)} N`, 1]],
  d: 4, c: 'application', t: [4],
}), () => {
  const top = circleRun(v4.R, Math.sqrt(v4.vb2), Math.PI, 2e-5);
  const bot = circleRun(v4.R, Math.sqrt(v4.vb2), 0, 1e-4);
  return top !== null && near(top.v, v4.vt, 2e-3) && near(v4.m * top.T, v4.Tt, 2e-3) && near(v4.m * bot.T, v4.Tb, 1e-6) && near(v4.Tb - v4.Tt, 6 * v4.m * g, 1e-9) || 'vcircle';
});
