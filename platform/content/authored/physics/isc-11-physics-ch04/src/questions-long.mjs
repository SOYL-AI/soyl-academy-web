// ISC 11 ch04 question bank, part 3: long answers (5 marks), set in parts with the marks shown.
import { mk, add, r, dec, near } from '../../isc-11-physics-ch01/src/lib.mjs';
import { g, rad, deg, R6, proj, projNumeric, velNumeric } from './phys.mjs';

const { long } = mk;
const f = (x, n = 3) => dec(x, n);

// ---------------------------------------------------------------- t01 + t02: independent motions and the trajectory
add('twomotion-long', long({
  stem: '(a) Explain, giving the acceleration in each direction, why projectile motion can be treated as two independent motions. [2] (b) A projectile is thrown from the origin with speed u at an angle θ to the horizontal. Derive the equation of its trajectory and show that it is a parabola. [3]',
  model: r`(a) The only force on the projectile is its weight, which is vertical. So the horizontal acceleration is zero and the horizontal velocity stays constant, while the vertical acceleration is $-g$ throughout. Neither component of the motion affects the other; they share only the time.

(b) Horizontally, $x = (u\cos\theta)t$, which gives $t = \dfrac{x}{u\cos\theta}$. Vertically, $y = (u\sin\theta)t - \tfrac{1}{2}gt^2$. Substituting the value of $t$ into this equation gives $y = x\tan\theta - \dfrac{gx^2}{2u^2\cos^2\theta}$. This has the form $y = ax - bx^2$, where $a$ and $b$ are constants, so the path is a parabola.`,
  sol: 'Independence from the force direction; then eliminate t.',
  scheme: [['Only the weight acts: a_x = 0, so v_x is constant', 1], ['a_y = −g throughout; the two motions share only the time', 1], ['x = (u cos θ)t and y = (u sin θ)t − ½gt²', 1], ['Eliminating t: y = x tan θ − g x² / (2u² cos² θ)', 1], ['Form y = ax − bx² with constant a and b: a parabola', 1]],
  d: 3, c: 'understanding', t: [1, 2],
}));

// ---------------------------------------------------------------- t02: time of flight and height
add('tofh-long', long({
  stem: '(a) Derive an expression for the time of flight of a projectile launched with speed u at angle θ from level ground. [2] (b) Derive an expression for its maximum height. [2] (c) Hence show that H = gT²/8, where H is the maximum height and T the time of flight. [1]',
  model: r`(a) The vertical motion has initial velocity $u\sin\theta$ and acceleration $-g$, so $y = (u\sin\theta)t - \tfrac{1}{2}gt^2$. Putting $y = 0$ and rejecting $t = 0$ gives $T = \dfrac{2u\sin\theta}{g}$.

(b) At the top the vertical velocity is zero, so $0 = (u\sin\theta)^2 - 2gH$ and $H = \dfrac{u^2\sin^2\theta}{2g}$.

(c) Squaring the first result, $T^2 = \dfrac{4u^2\sin^2\theta}{g^2}$, so $u^2\sin^2\theta = \dfrac{g^2T^2}{4}$. Substituting this into the second result gives $H = \dfrac{gT^2}{8}$, which therefore holds for every angle of projection. The time of flight alone fixes the height reached, since both come from the same vertical motion.`,
  sol: 'Vertical motion only; then eliminate u sin θ between T and H.',
  scheme: [['y = (u sin θ)t − ½gt² for the vertical motion', 1], ['y = 0 gives T = 2u sin θ / g', 1], ['At the top v_y = 0: 0 = (u sin θ)² − 2gH', 1], ['H = u² sin² θ / 2g', 1], ['Eliminating u sin θ: H = gT²/8', 1]],
  d: 3, c: 'analysis', t: [2],
}), () => {
  const p = projNumeric(34, 52);
  return near(p.H, (g * p.T * p.T) / 8, 1e-4) || 'tofh';
});

// ---------------------------------------------------------------- t02: range
add('range-long', long({
  stem: '(a) Derive an expression for the horizontal range of a projectile launched with speed u at angle θ from level ground. [2] (b) Show that for a given speed the range is greatest at 45° and write the greatest range. [1] (c) Show that angles θ and (90° − θ) give the same range. [2]',
  model: r`(a) The horizontal velocity $u\cos\theta$ is constant and the time of flight is $T = \dfrac{2u\sin\theta}{g}$, so $R = (u\cos\theta)T = \dfrac{2u^2\sin\theta\cos\theta}{g} = \dfrac{u^2\sin 2\theta}{g}$.

(b) For a fixed speed the range depends only on $\sin 2\theta$, whose greatest value is $1$ when $\theta = 45^\circ$. The greatest range is $R_{\max} = \dfrac{u^2}{g}$.

(c) Replacing $\theta$ by $90^\circ - \theta$ gives $\sin 2(90^\circ - \theta) = \sin(180^\circ - 2\theta) = \sin 2\theta$. The range expression is unchanged, so complementary angles give equal ranges, though the heights and times of flight differ, since the steeper path rises higher and stays in the air longer.`,
  sol: 'R = horizontal velocity × T; sin 2θ ≤ 1; sin(180° − x) = sin x.',
  scheme: [['R = (u cos θ)(2u sin θ / g)', 1], ['R = u² sin 2θ / g', 1], ['sin 2θ = 1 at θ = 45°, so R_max = u²/g', 1], ['R(90° − θ) = u² sin(180° − 2θ) / g', 1], ['sin(180° − 2θ) = sin 2θ, so the ranges are equal', 1]],
  d: 3, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03: horizontal projection
const hz = { u: 18, h: 44.1 };
hz.T = Math.sqrt((2 * hz.h) / g);
hz.R = hz.u * hz.T;
hz.vy = g * hz.T;
hz.ang = deg(Math.atan(hz.vy / hz.u));
add('horiz-long', long({
  stem: `(a) A body is projected horizontally with speed u from a height h above level ground. Derive expressions for its time of flight and its horizontal range. [3] (b) A ball is thrown horizontally at ${hz.u} m s⁻¹ from a balcony ${hz.h} m above the ground. Taking g = 9.8 m s⁻², find the distance from the foot of the balcony at which it lands and the angle its velocity makes with the horizontal on landing. [2]`,
  model: r`(a) Take $y$ downward from the point of projection. The initial vertical velocity is zero, so $y = \tfrac{1}{2}gt^2$. The ball reaches the ground when $y = h$, so $T = \sqrt{\dfrac{2h}{g}}$. The horizontal velocity $u$ does not change, so the range is $R = uT = u\sqrt{\dfrac{2h}{g}}$.

(b) $T = \sqrt{\dfrac{2 \times ${hz.h}}{9.8}} = ${f(hz.T, 3)}$ s, so $R = ${hz.u} \times ${f(hz.T, 3)} = ${f(hz.R, 3)}$ m. On landing $v_y = gT = ${f(hz.vy, 3)}$ m s$^{-1}$ downward, so $\tan\alpha = \dfrac{${f(hz.vy, 3)}}{${hz.u}}$ and $\alpha = ${f(hz.ang, 3)}^\circ$ below the horizontal. The horizontal velocity is unchanged during the fall, so the ball lands moving steeply downward and forward, and its speed is greater than the speed with which it was thrown.`,
  sol: 'Free fall through h for T; R = uT; tan α = gT/u.',
  scheme: [['Vertical motion from rest: y = ½gt²; horizontal velocity constant', 1], ['y = h gives T = √(2h/g)', 1], ['R = uT = u√(2h/g)', 1], [`T = ${f(hz.T, 3)} s and R = ${f(hz.R, 3)} m`, 1], [`v_y = gT = ${f(hz.vy, 3)} m s⁻¹, so α = ${f(hz.ang, 3)}° below the horizontal`, 1]],
  d: 3, c: 'application', t: [3],
}), () => {
  let y = hz.h; let v = 0; let t = 0; const dt = 1e-6;
  while (y > 0) { v += g * dt; y -= v * dt; t += dt; }
  return near(hz.u * t, hz.R, 1e-3) && near(deg(Math.atan2(v, hz.u)), hz.ang, 1e-3) && near(hz.R, 54, 1e-9) || 'horiz';
});

// ---------------------------------------------------------------- t03: velocity at any instant
const vl = { u: 30, th: 40, t: 3 };
vl.vx = vl.u * Math.cos(rad(vl.th));
vl.vy = vl.u * Math.sin(rad(vl.th)) - g * vl.t;
vl.v = Math.hypot(vl.vx, vl.vy);
vl.ang = deg(Math.atan(Math.abs(vl.vy) / vl.vx));
add('vel-long', long({
  stem: `(a) A projectile is launched with speed u at angle θ to the horizontal. Obtain expressions for the magnitude and direction of its velocity at time t. [3] (b) A ball is thrown at ${vl.u} m s⁻¹ at ${vl.th}° to the horizontal. Taking g = 9.8 m s⁻², find its speed and the direction of its motion ${vl.t} s after the throw. [2]`,
  model: r`(a) The horizontal component stays $v_x = u\cos\theta$ because no horizontal force acts. The vertical component changes uniformly, $v_y = u\sin\theta - gt$. The components are perpendicular, so the magnitude is $v = \sqrt{v_x^2 + v_y^2}$, and the direction makes an angle $\alpha$ with the horizontal, where $\tan\alpha = \dfrac{v_y}{v_x}$. The angle is above the horizontal when $v_y$ is positive and below it when $v_y$ is negative.

(b) $v_x = ${vl.u}\cos ${vl.th}^\circ = ${f(vl.vx, 4)}$ m s$^{-1}$ and $v_y = ${vl.u}\sin ${vl.th}^\circ - 9.8(${vl.t}) = ${f(vl.vy, 4)}$ m s$^{-1}$. So $v = ${f(vl.v, 4)}$ m s$^{-1}$ and $\tan\alpha = ${f(Math.abs(vl.vy) / vl.vx, 4)}$, giving $\alpha = ${f(vl.ang, 3)}^\circ$ below the horizontal.`,
  sol: 'Components, then Pythagoras and tan α = v_y/v_x.',
  scheme: [['v_x = u cos θ (constant) and v_y = u sin θ − gt', 1], ['v = √(v_x² + v_y²)', 1], ['tan α = v_y/v_x, above or below according to the sign of v_y', 1], [`v_x = ${f(vl.vx, 3)} and v_y = ${f(vl.vy, 3).replace('-', '−')} m s⁻¹, so v = ${f(vl.v, 3)} m s⁻¹`, 1], [`α = ${f(vl.ang, 3)}° below the horizontal (v_y is negative)`, 1]],
  d: 3, c: 'application', t: [3],
}), () => {
  const [vx, vy] = velNumeric(vl.u, vl.th, vl.t);
  return near(Math.hypot(vx, vy), vl.v, 1e-4) && near(deg(Math.atan2(vy, vx)), -vl.ang, 1e-4) || 'vel-long';
});

// ---------------------------------------------------------------- t01-t03: a rugby kick
const kk = { u: 26, th: 35, t: 3 };
Object.assign(kk, proj(kk.u, kk.th));
kk.vxt = kk.ux;
kk.vyt = kk.uy - g * kk.t;
kk.angt = deg(Math.atan(Math.abs(kk.vyt) / kk.vxt));
add('kick-long', long({
  stem: `A rugby player kicks a ball from level ground at ${kk.u} m s⁻¹ at ${kk.th}° above the horizontal. Taking g = 9.8 m s⁻² and neglecting air resistance, find (a) the horizontal and vertical components of the initial velocity, [1] (b) the time of flight, [1] (c) the maximum height, [1] (d) the horizontal range, [1] (e) the angle that the velocity makes with the horizontal at t = ${kk.t} s, and whether the ball is rising or falling then. [1]`,
  model: r`(a) $u_x = ${kk.u}\cos ${kk.th}^\circ = ${f(kk.ux, 4)}$ m s$^{-1}$ and $u_y = ${kk.u}\sin ${kk.th}^\circ = ${f(kk.uy, 4)}$ m s$^{-1}$.

(b) The time of flight is $T = \dfrac{2u_y}{g} = \dfrac{2 \times ${f(kk.uy, 4)}}{9.8} = ${f(kk.T, 3)}$ s.

(c) The maximum height is $H = \dfrac{u_y^2}{2g} = \dfrac{${f(kk.uy, 4)}^2}{19.6} = ${f(kk.H, 3)}$ m.

(d) The range is $R = u_xT = ${f(kk.ux, 4)} \times ${f(kk.T, 4)} = ${f(kk.R, 3)}$ m.

(e) At $t = ${kk.t}$ s, $v_y = ${f(kk.uy, 4)} - 9.8(${kk.t}) = ${f(kk.vyt, 4)}$ m s$^{-1}$, which is negative, so the ball is falling. $\tan\alpha = \dfrac{${f(Math.abs(kk.vyt), 4)}}{${f(kk.vxt, 4)}}$, so $\alpha = ${f(kk.angt, 3)}^\circ$ below the horizontal. The ball is close to the end of its flight, so the angle is nearly equal to the angle of projection, which it would match exactly at landing.`,
  sol: 'Resolve, then T = 2u_y/g, H = u_y²/2g, R = u_x T and the signs of v_y.',
  scheme: [[`u_x = ${f(kk.ux, 3)} m s⁻¹ and u_y = ${f(kk.uy, 3)} m s⁻¹`, 1], [`T = 2u_y/g = ${f(kk.T, 3)} s`, 1], [`H = u_y²/2g = ${f(kk.H, 3)} m`, 1], [`R = u_x T = ${f(kk.R, 3)} m`, 1], [`v_y = ${f(kk.vyt, 3).replace('-', '−')} m s⁻¹ (falling); α = ${f(kk.angt, 3)}° below the horizontal`, 1]],
  d: 4, c: 'application', t: [2, 3],
}), () => {
  const p = projNumeric(kk.u, kk.th);
  const [vx, vy] = velNumeric(kk.u, kk.th, kk.t);
  return near(p.T, kk.T, 1e-4) && near(p.H, kk.H, 1e-4) && near(p.R, kk.R, 1e-4) && near(deg(Math.atan2(vy, vx)), -kk.angt, 1e-4) && kk.t < kk.T || 'kick';
});

// ---------------------------------------------------------------- t03: relief packet
const pk = { u: 60, h: 313.6 };
pk.T = Math.sqrt((2 * pk.h) / g);
pk.R = pk.u * pk.T;
pk.vy = g * pk.T;
pk.v = Math.hypot(pk.u, pk.vy);
add('packet-long', long({
  stem: `An aircraft flies horizontally at ${pk.u} m s⁻¹ at a height of ${pk.h} m and releases a packet of relief supplies. Taking g = 9.8 m s⁻² and neglecting air resistance, (a) explain why the packet has a horizontal velocity at the instant of release, [1] (b) find the time the packet takes to reach the ground, [1] (c) find how far ahead of the target, measured horizontally, the packet must be released, [1] (d) find the speed with which it strikes the ground, [1] (e) state where the aircraft is, relative to the packet, at the instant the packet lands. [1]`,
  model: r`(a) The packet is moving with the aircraft when released, so it starts with the aircraft's horizontal velocity of ${pk.u} m s$^{-1}$ and zero vertical velocity.

(b) $T = \sqrt{\dfrac{2h}{g}} = \sqrt{\dfrac{2 \times ${pk.h}}{9.8}} = ${f(pk.T, 3)}$ s.

(c) $R = uT = ${pk.u} \times ${f(pk.T, 3)} = ${f(pk.R, 3)}$ m ahead of the target.

(d) $v_y = gT = ${f(pk.vy, 3)}$ m s$^{-1}$, so $v = \sqrt{${pk.u}^2 + ${f(pk.vy, 3)}^2} = ${f(pk.v, 3)}$ m s$^{-1}$.

(e) The aircraft keeps the same horizontal velocity as the packet, so it is vertically above the landing point, at the height of ${pk.h} m.`,
  sol: 'Free fall for T with constant horizontal velocity; aircraft and packet share v_x.',
  scheme: [['The packet leaves with the aircraft\'s horizontal velocity and zero vertical velocity', 1], [`T = √(2h/g) = ${f(pk.T, 3)} s`, 1], [`R = uT = ${f(pk.R, 3)} m`, 1], [`v = √(u² + (gT)²) = ${f(pk.v, 3)} m s⁻¹`, 1], [`Directly above the packet, ${pk.h} m high (same horizontal velocity)`, 1]],
  d: 4, c: 'application', t: [3],
}), () => {
  let y = pk.h; let v = 0; let t = 0; const dt = 1e-5;
  while (y > 0) { v += g * dt; y -= v * dt; t += dt; }
  return near(t, pk.T, 1e-4) && near(pk.u * t, pk.R, 1e-4) && near(Math.sqrt(pk.u ** 2 + 2 * g * pk.h), pk.v, 1e-9) && near(pk.T, 8, 1e-9) && near(pk.R, 480, 1e-9) || 'packet';
});

// ---------------------------------------------------------------- t02: three angles at one speed
const sk = { u: 28 };
sk.p30 = proj(sk.u, 30);
sk.p45 = proj(sk.u, 45);
sk.p60 = proj(sk.u, 60);
add('sketch-long', long({
  stem: `(a) Describe a sketch of the paths of three balls thrown from the same point on level ground with the same speed at 30°, 45° and 60° to the horizontal, saying which path has the greatest range and which the greatest height. [2] (b) For a speed of ${sk.u} m s⁻¹ and g = 9.8 m s⁻², find the three ranges. [2] (c) What does a comparison of the 30° and 60° ranges show? [1]`,
  model: r`(a) The sketch shows three parabolas starting at the same point on the ground and rising to different heights. The 45° path lands farthest, so it has the greatest range. The 60° path is the highest and the 30° path the lowest. The 30° and 60° paths land at the same point.

(b) $R = \dfrac{u^2\sin 2\theta}{g}$ with $\dfrac{u^2}{g} = ${f(sk.u ** 2 / g, 4)}$ m. At $30^\circ$, $R = ${f(sk.p30.R, 4)}$ m; at $45^\circ$, $R = ${f(sk.p45.R, 4)}$ m; at $60^\circ$, $R = ${f(sk.p60.R, 4)}$ m.

(c) The ranges at $30^\circ$ and $60^\circ$ are equal because the two angles are complementary, and the range at $45^\circ$ is the maximum.`,
  sol: 'R = (u²/g) sin 2θ at each angle; complementary angles give equal R.',
  scheme: [['Three parabolas from one point; 45° has the greatest range', 1], ['60° path highest, 30° path lowest; the 30° and 60° paths land together', 1], [`R(30°) = ${f(sk.p30.R, 3)} m and R(60°) = ${f(sk.p60.R, 3)} m`, 1], [`R(45°) = u²/g = ${f(sk.p45.R, 3)} m`, 1], ['30° and 60° are complementary, so equal ranges; 45° is the maximum', 1]],
  d: 3, c: 'application', t: [2],
}), () => near(projNumeric(sk.u, 30).R, sk.p30.R, 1e-4) && near(projNumeric(sk.u, 60).R, sk.p60.R, 1e-4) && near(projNumeric(sk.u, 45).R, sk.p45.R, 1e-4) && near(sk.p45.R, 80, 1e-9) && sk.p45.R > sk.p30.R || 'sketch');
