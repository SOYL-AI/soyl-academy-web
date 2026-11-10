// ISC 11 ch04 question bank, part 2: short answers of 2 marks (30–50 words) and 3 marks (50–80 words; derivations).
// Word counts exclude the maths, so each model answer carries its reasoning in words as well.
import { mk, add, r, dec, near } from '../../isc-11-physics-ch01/src/lib.mjs';
import { g, rad, deg, R6, proj, projNumeric, velNumeric, mn } from './phys.mjs';

const { short } = mk;
const f = (x, n = 3) => dec(x, n);

// ================================================================ 2 marks
add('indep-short', short({
  marks: 2,
  stem: 'A ball thrown by a fielder travels along a curve, yet its horizontal velocity stays the same while its vertical velocity keeps changing. Explain this in terms of the force acting on the ball.',
  model: 'The only force on the ball in flight is its weight, which acts vertically downward. There is no horizontal force, so the horizontal acceleration is zero and the horizontal velocity stays constant. The weight gives a constant downward acceleration, so only the vertical velocity changes.',
  sol: 'Weight is vertical: no horizontal acceleration, so only v_y changes.',
  scheme: [['Only the weight acts, vertically; no horizontal force so a_x = 0 and the horizontal velocity is constant', 1], ['Weight gives a_y = g downward, so the vertical velocity changes uniformly', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('terms-short', short({
  marks: 2,
  stem: 'Distinguish between the angle of projection of a projectile and the angle which its velocity makes with the horizontal at a later point of the path.',
  model: 'The angle of projection is the angle between the initial velocity and the horizontal; it is fixed for a given throw. At a later point the velocity is tangent to the path, so its angle with the horizontal changes continuously: it falls to zero at the top and becomes downward on the way down.',
  sol: 'Fixed launch angle against the changing angle of the tangent.',
  scheme: [['Angle of projection: angle of the initial velocity with the horizontal, fixed for the throw', 1], ['Later angle: of the tangent to the path, tan α = v_y/v_x, changing; zero at the top, below the horizontal afterwards', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('rocket-short', short({
  marks: 2,
  stem: 'A firework rocket moves as a projectile after its fuel has burnt out, but not while the fuel is burning. Explain why.',
  model: 'A projectile moves under gravity alone. While the fuel burns, the thrust of the exhaust gases acts on the rocket along with its weight, so the acceleration is not g. After burn-out only the weight acts (air resistance neglected), so the rocket follows a parabolic path.',
  sol: 'Thrust acts during the burn; only gravity afterwards.',
  scheme: [['A projectile is acted on by gravity alone', 1], ['During burning the thrust also acts so the path is not a free parabola; after burn-out only the weight acts', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('parab-short', short({
  marks: 2,
  stem: 'Write the equation of the trajectory of a projectile launched with speed u at angle θ, and state how it shows that the path is a parabola.',
  model: r`The equation is $y = x\tan\theta - \dfrac{gx^2}{2u^2\cos^2\theta}$. For a given projection the factors $\tan\theta$ and $\dfrac{g}{2u^2\cos^2\theta}$ are constants, so the equation has the form $y = ax - bx^2$. A quadratic in $x$ with no other variable terms represents a parabola through the origin.`,
  sol: 'Equation, then compare with y = ax − bx².',
  scheme: [['y = x tan θ − g x² / (2u² cos² θ)', 1], ['Form y = ax − bx² with constant a and b, hence a parabola', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('fortyfive-short', short({
  marks: 2,
  stem: 'Explain why, for a fixed speed of projection from level ground, the horizontal range of a projectile is greatest when the angle of projection is 45°.',
  model: r`The range is $R = \dfrac{u^2\sin 2\theta}{g}$. For a fixed speed $u$, $R$ depends only on $\sin 2\theta$, whose largest value is $1$. This occurs when $2\theta = 90^\circ$, that is $\theta = 45^\circ$, and then the range is $\dfrac{u^2}{g}$, which no other angle can reach.`,
  sol: 'R ∝ sin 2θ, largest when 2θ = 90°.',
  scheme: [['R = u² sin 2θ / g, so R depends on sin 2θ alone for fixed u', 1], ['sin 2θ is greatest (= 1) when 2θ = 90°, so θ = 45°', 1]],
  d: 2, c: 'understanding', t: [2],
}));
const cs = { u: 30, a: 25, b: 65 };
cs.Ra = projNumeric(cs.u, cs.a).R;
cs.Rb = projNumeric(cs.u, cs.b).R;
add('compl-short', short({
  marks: 2,
  stem: 'Two cricket balls leave the ground with the same speed, one at 25° and the other at 65° to the horizontal. Show that they land the same distance away on level ground.',
  model: r`The range is $R = \dfrac{u^2\sin 2\theta}{g}$. For $25^\circ$, $\sin 50^\circ = ${f(Math.sin(rad(50)), 4)}$. For $65^\circ$, $\sin 130^\circ = \sin(180^\circ - 50^\circ) = \sin 50^\circ = ${f(Math.sin(rad(130)), 4)}$. Both angles therefore give the same value of $R$ for the same speed, because 25° and 65° add up to 90° and are complementary.`,
  sol: 'sin 130° = sin 50°, so R is equal; angles add to 90°.',
  scheme: [['R = u² sin 2θ / g, giving sin 50° for 25° and sin 130° for 65°', 1], [`sin 130° = sin 50° = ${f(Math.sin(rad(50)), 4)}, so the ranges are equal (the angles add up to 90°)`, 1]],
  d: 3, c: 'application', t: [2],
}), () => near(cs.Ra, cs.Rb, 1e-4) && near(Math.sin(rad(50)), Math.sin(rad(130)), 1e-9) || 'compl-short');
add('r4h-short', short({
  marks: 2,
  stem: 'Show that for a projectile launched at 45° from level ground the horizontal range is four times the maximum height.',
  model: r`At $45^\circ$ the range is $R = \dfrac{u^2\sin 90^\circ}{g} = \dfrac{u^2}{g}$. The maximum height is $H = \dfrac{u^2\sin^2 45^\circ}{2g} = \dfrac{u^2}{4g}$, because $\sin^2 45^\circ = \dfrac{1}{2}$. Dividing, $R/H = 4$, so, for a launch at 45° from level ground, the range is exactly four times the maximum height of the path.`,
  sol: 'R = u²/g and H = u²/4g at 45°.',
  scheme: [['R = u²/g and H = u²/(4g) at 45°', 1], ['R/H = 4', 1]],
  d: 3, c: 'application', t: [2],
}), () => { const p = projNumeric(27, 45); return near(p.R / p.H, 4, 1e-4) || 'r4h-short'; });
const hn = { u: 8.4, th: 50 };
Object.assign(hn, proj(hn.u, hn.th));
add('hnum-short', short({
  marks: 2,
  stem: `A basketball player throws the ball at ${hn.u} m s⁻¹ at ${hn.th}° above the horizontal. Taking g = 9.8 m s⁻², find the time taken to reach the highest point and the height of that point above the point of release.`,
  model: r`The vertical component is $u\sin\theta = ${hn.u}\sin ${hn.th}^\circ = ${f(hn.uy, 4)}$ m s$^{-1}$. At the highest point this has fallen to zero, so the time is $t = \dfrac{u\sin\theta}{g} = ${f(hn.tTop, 3)}$ s. The height above the release point is $H = \dfrac{(u\sin\theta)^2}{2g} = ${f(hn.H, 3)}$ m.`,
  sol: 'Use u sin θ with t = u sin θ / g and H = (u sin θ)² / 2g.',
  scheme: [[`t = u sin θ / g = ${f(hn.uy, 4)}/9.8 = ${f(hn.tTop, 3)} s`, 1], [`H = (u sin θ)² / 2g = ${f(hn.H, 3)} m`, 1]],
  d: 3, c: 'application', t: [2],
}), () => { const p = projNumeric(hn.u, hn.th); return near(p.H, hn.H, 1e-4) && near(p.T / 2, hn.tTop, 1e-4) || 'hnum'; });
add('vtop-short', short({
  marks: 2,
  stem: 'State the direction and magnitude of the velocity of a projectile at the highest point of its path, and explain why its speed there is the least.',
  model: r`At the highest point the vertical component is zero, so the velocity is horizontal with magnitude $u\cos\theta$. Elsewhere the speed is $\sqrt{v_x^2 + v_y^2}$, where $v_x$ is the same but $v_y \neq 0$. The speed is therefore smallest where $v_y = 0$, that is, at the top.`,
  sol: 'v_y = 0 at the top, so v = u cos θ, the least value.',
  scheme: [['Horizontal, of magnitude u cos θ', 1], ['v = √(v_x² + v_y²) with v_x constant is smallest when v_y = 0', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('landing-short', short({
  marks: 2,
  stem: 'A ball is hit from level ground and lands on level ground. Compare the speed and the direction of its velocity at landing with those at projection.',
  model: r`On landing at the launch level, $v_y = -u\sin\theta$ and $v_x = u\cos\theta$, so the speed $\sqrt{v_x^2 + v_y^2} = u$ is the same as the speed of projection. The velocity makes the same angle $\theta$ with the horizontal, but now it points downward instead of upward.`,
  sol: 'v_y reverses, v_x unchanged: speed u at θ below the horizontal.',
  scheme: [['v_x = u cos θ and v_y = −u sin θ, so the speed is u (the same)', 1], ['Direction: same angle θ with the horizontal but below it', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('twostones-short', short({
  marks: 2,
  stem: 'Two stones are thrown horizontally from the same bridge, one at 6 m s⁻¹ and the other at 12 m s⁻¹. Which stone strikes the water first, and which lands farther from the bridge? Give reasons.',
  model: r`Both fall through the same height from zero vertical velocity, so the time of fall $T = \sqrt{2h/g}$ is the same and the stones strike the water together. The horizontal distance is $R = uT$, proportional to $u$, so the stone thrown at 12 m s$^{-1}$ lands twice as far away.`,
  sol: 'Same T for both; R = uT is larger for the faster stone.',
  scheme: [['Same time of fall T = √(2h/g): both strike the water together', 1], ['R = uT ∝ u: the 12 m s⁻¹ stone lands twice as far', 1]],
  d: 3, c: 'understanding', t: [3],
}));
const rn = { u: 15, h: 1.8 };
rn.T = Math.sqrt((2 * rn.h) / g);
rn.R = rn.u * rn.T;
add('rnum-short', short({
  marks: 2,
  stem: `A stone leaves a catapult horizontally at ${rn.u} m s⁻¹ from a height of ${rn.h} m above level ground. Taking g = 9.8 m s⁻², find the horizontal distance from the catapult at which it lands.`,
  model: r`The time of fall is $T = \sqrt{\dfrac{2h}{g}} = \sqrt{\dfrac{2 \times ${rn.h}}{9.8}} = ${f(rn.T, 3)}$ s. During this time the stone moves horizontally at the constant speed of ${rn.u} m s$^{-1}$, so $R = uT = ${rn.u} \times ${f(rn.T, 3)} = ${f(rn.R, 3)}$ m.`,
  sol: 'T = √(2h/g), then R = uT.',
  scheme: [[`T = √(2h/g) = ${f(rn.T, 3)} s`, 1], [`R = uT = ${f(rn.R, 3)} m`, 1]],
  d: 3, c: 'application', t: [3],
}), () => {
  let y = rn.h; let v = 0; let t = 0; const dt = 1e-6;
  while (y > 0) { v += g * dt; y -= v * dt; t += dt; }
  return near(rn.u * t, rn.R, 1e-3) || 'rnum';
});

// ================================================================ 3 marks
add('trajder-short3', short({
  marks: 3,
  stem: 'Derive the equation of the trajectory of a projectile thrown with speed u at an angle θ to the horizontal, and show that it is a parabola.',
  model: r`Take the point of projection as origin. The horizontal motion is uniform, so $x = (u\cos\theta)t$ and hence $t = \dfrac{x}{u\cos\theta}$. The vertical motion has acceleration $-g$, so $y = (u\sin\theta)t - \tfrac{1}{2}gt^2$. Substituting $t$ gives $y = x\tan\theta - \dfrac{gx^2}{2u^2\cos^2\theta}$. This has the form $y = ax - bx^2$ with constants $a$ and $b$, which is the equation of a parabola.`,
  sol: 'Eliminate t between the two position equations.',
  scheme: [['Origin at the launch point: x = (u cos θ)t and y = (u sin θ)t − ½gt²', 1], ['Eliminating t: y = x tan θ − g x² / (2u² cos² θ)', 1], ['Form y = ax − bx² with a = tan θ and b = g/(2u² cos² θ) constant: a parabola', 1]],
  d: 3, c: 'understanding', t: [2],
}));
add('tofder-short3', short({
  marks: 3,
  stem: 'Derive an expression for the time of flight of a projectile launched with speed u at angle θ from level ground, and state the time taken to reach the highest point.',
  model: r`Consider the vertical motion with upward positive, initial velocity $u\sin\theta$ and acceleration $-g$. The height at time $t$ is $y = (u\sin\theta)t - \tfrac{1}{2}gt^2$. The projectile is back at ground level when $y = 0$, which gives $t\left(u\sin\theta - \tfrac{1}{2}gt\right) = 0$. The non-zero root is the time of flight, $T = \dfrac{2u\sin\theta}{g}$. The highest point is reached at half this time, $\dfrac{u\sin\theta}{g}$.`,
  sol: 'Set y = 0 in the vertical position equation.',
  scheme: [['Vertical motion: y = (u sin θ)t − ½gt²', 1], ['Put y = 0 and reject t = 0: T = 2u sin θ / g', 1], ['Time to the top = T/2 = u sin θ / g (v_y = 0 there)', 1]],
  d: 3, c: 'understanding', t: [2],
}));
add('hder-short3', short({
  marks: 3,
  stem: 'Derive an expression for the maximum height reached by a projectile launched with speed u at angle θ to the horizontal.',
  model: r`Only the vertical motion matters. The initial vertical velocity is $u\sin\theta$ and the acceleration is $-g$. At the highest point the vertical velocity is zero. Using $v_y^2 = (u\sin\theta)^2 - 2gy$ with $v_y = 0$ and $y = H$, we get $0 = u^2\sin^2\theta - 2gH$. Hence the maximum height is $H = \dfrac{u^2\sin^2\theta}{2g}$. It depends only on the vertical component of the launch velocity, not on the horizontal one.`,
  sol: 'Apply v² = u² + 2as to the vertical motion, final v_y = 0.',
  scheme: [['Vertical motion: initial velocity u sin θ, acceleration −g, v_y = 0 at the top', 1], ['0 = (u sin θ)² − 2gH', 1], ['H = u² sin² θ / 2g', 1]],
  d: 3, c: 'understanding', t: [2],
}));
add('rder-short3', short({
  marks: 3,
  stem: 'Derive an expression for the horizontal range of a projectile launched with speed u at angle θ to the horizontal from level ground.',
  model: r`The range is the horizontal distance covered in the time of flight. The time of flight is $T = \dfrac{2u\sin\theta}{g}$, and the horizontal velocity stays at $u\cos\theta$. So $R = (u\cos\theta)\times\dfrac{2u\sin\theta}{g} = \dfrac{u^2\,2\sin\theta\cos\theta}{g}$. Using $2\sin\theta\cos\theta = \sin 2\theta$, the range is $R = \dfrac{u^2\sin 2\theta}{g}$. This holds when the projectile lands at the same level as the point of projection and air resistance is neglected.`,
  sol: 'R = (u cos θ) × T, then the double angle identity.',
  scheme: [['Horizontal velocity u cos θ is constant and the time of flight is T = 2u sin θ / g', 1], ['R = (u cos θ)(2u sin θ / g)', 1], ['Using 2 sin θ cos θ = sin 2θ: R = u² sin 2θ / g', 1]],
  d: 3, c: 'understanding', t: [2],
}));
add('rmaxder-short3', short({
  marks: 3,
  stem: 'Starting from the expression for the range, show that for a given speed of projection the range is maximum at 45°, and write the maximum range in terms of u and g.',
  model: r`The range is $R = \dfrac{u^2\sin 2\theta}{g}$. For a fixed speed $u$ the quantity $u^2/g$ is constant, so $R$ is greatest when $\sin 2\theta$ has its greatest value, which is $1$. This needs $2\theta = 90^\circ$, so $\theta = 45^\circ$. Substituting $\sin 2\theta = 1$ gives the maximum range $R_{\max} = \dfrac{u^2}{g}$, which cannot be exceeded at that speed by throwing at any other angle.`,
  sol: 'sin 2θ ≤ 1 with equality at 2θ = 90°.',
  scheme: [['R = u² sin 2θ / g; u²/g constant, so R ∝ sin 2θ', 1], ['sin 2θ is maximum (= 1) at 2θ = 90°, so θ = 45°', 1], ['R_max = u²/g', 1]],
  d: 3, c: 'understanding', t: [2],
}));
add('velder-short3', short({
  marks: 3,
  stem: 'A projectile is launched with speed u at angle θ to the horizontal. Obtain expressions for the magnitude and direction of its velocity at time t.',
  model: r`The horizontal component stays $v_x = u\cos\theta$ because no horizontal force acts. The vertical component changes under acceleration $-g$, so $v_y = u\sin\theta - gt$. The two components are at right angles, so the magnitude is $v = \sqrt{v_x^2 + v_y^2}$. The direction makes an angle $\alpha$ with the horizontal given by $\tan\alpha = \dfrac{v_y}{v_x}$, above the horizontal if $v_y$ is positive and below it if negative.`,
  sol: 'Component equations, then Pythagoras and tan α.',
  scheme: [['v_x = u cos θ (constant) and v_y = u sin θ − gt', 1], ['v = √(v_x² + v_y²)', 1], ['tan α = v_y / v_x with the horizontal (above or below according to the sign of v_y)', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('hprojder-short3', short({
  marks: 3,
  stem: 'A body is projected horizontally with speed u from a point at height h above level ground. Derive expressions for its time of flight and its horizontal range.',
  model: r`Take $y$ downward from the point of projection. The initial vertical velocity is zero, so the vertical motion is free fall: $y = \tfrac{1}{2}gt^2$. The body reaches the ground when $y = h$, so $T = \sqrt{\dfrac{2h}{g}}$. The horizontal velocity $u$ stays constant, so the range is $R = uT = u\sqrt{\dfrac{2h}{g}}$.`,
  sol: 'Free fall through h gives T; then R = uT.',
  scheme: [['Vertical motion from rest: y = ½gt²; horizontal velocity u is constant', 1], ['Put y = h: T = √(2h/g)', 1], ['R = uT = u√(2h/g)', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('hpath-short3', short({
  marks: 3,
  stem: 'A stone is thrown horizontally with speed u from the top of a tower. Show that its path is a parabola, and say where the vertex lies.',
  model: r`Take the top of the tower as origin with $y$ measured downward. The horizontal motion is uniform, so $x = ut$. The vertical motion starts from rest, so $y = \tfrac{1}{2}gt^2$. Eliminating $t = x/u$ gives $y = \dfrac{g}{2u^2}x^2$. Since $y$ is proportional to $x^2$, the path is a parabola, with its vertex at the point of projection.`,
  sol: 'Eliminate t from x = ut and y = ½gt².',
  scheme: [['x = ut and y = ½gt² (y downward from the launch point)', 1], ['Eliminating t: y = g x² / (2u²), proportional to x²', 1], ['Parabola with its vertex at the point of projection', 1]],
  d: 3, c: 'understanding', t: [3],
}));
const ta = { u: 24, R: 40 };
ta.s2 = (ta.R * g) / (ta.u * ta.u);
ta.th1 = deg(Math.asin(ta.s2)) / 2;
ta.th2 = 90 - ta.th1;
add('twoang-short3', short({
  marks: 3,
  stem: `A ball is thrown with a speed of ${ta.u} m s⁻¹ to reach a point ${ta.R} m away on level ground. Taking g = 9.8 m s⁻², find the two possible angles of projection.`,
  model: r`From $R = \dfrac{u^2\sin 2\theta}{g}$ we get $\sin 2\theta = \dfrac{Rg}{u^2} = \dfrac{${ta.R} \times 9.8}{${ta.u ** 2}} = ${f(ta.s2, 4)}$. So $2\theta = ${f(deg(Math.asin(ta.s2)), 4)}^\circ$ or $180^\circ - ${f(deg(Math.asin(ta.s2)), 4)}^\circ = ${f(180 - deg(Math.asin(ta.s2)), 4)}^\circ$. The sine of an angle equals the sine of its supplement, so there are two values of $2\theta$ and therefore two possible launch angles. The two angles are $\theta = ${f(ta.th1, 3)}^\circ$ and $\theta = ${f(ta.th2, 3)}^\circ$, which are complementary, as they must be. The flatter path reaches the target sooner, and the lobbed path takes longer but lands at the same place.`,
  sol: 'sin 2θ = Rg/u²; two values of 2θ that are supplementary.',
  scheme: [[`sin 2θ = Rg/u² = ${f(ta.s2, 4)}`, 1], [`2θ = ${f(deg(Math.asin(ta.s2)), 4)}° or ${f(180 - deg(Math.asin(ta.s2)), 4)}°`, 1], [`θ = ${f(ta.th1, 3)}° and ${f(ta.th2, 3)}°`, 1]],
  d: 3, c: 'application', t: [2],
}), () => near(projNumeric(ta.u, ta.th1).R, ta.R, 1e-3) && near(projNumeric(ta.u, ta.th2).R, ta.R, 1e-3) && near(ta.th1 + ta.th2, 90, 1e-9) || 'twoang');
const lv = { u: 14, h: 30 };
lv.T = Math.sqrt((2 * lv.h) / g);
lv.R = lv.u * lv.T;
lv.vy = g * lv.T;
lv.v = Math.hypot(lv.u, lv.vy);
add('landv-short3', short({
  marks: 3,
  stem: `A boy throws a stone horizontally at ${lv.u} m s⁻¹ from the top of a cliff ${lv.h} m high. Taking g = 9.8 m s⁻², find the time it takes to reach the ground, the horizontal distance from the foot of the cliff to the landing point, and the speed on landing.`,
  model: r`The time of fall is $T = \sqrt{\dfrac{2h}{g}} = \sqrt{\dfrac{60}{9.8}} = ${f(lv.T, 3)}$ s. The horizontal distance is $R = uT = ${lv.u} \times ${f(lv.T, 3)} = ${f(lv.R, 3)}$ m. On landing $v_y = gT = ${f(lv.vy, 3)}$ m s$^{-1}$ and $v_x = ${lv.u}$ m s$^{-1}$, so $v = \sqrt{${lv.u}^2 + ${f(lv.vy, 3)}^2} = ${f(lv.v, 3)}$ m s$^{-1}$. The horizontal velocity stays ${lv.u} m s$^{-1}$ during the whole fall, so it combines at right angles with the vertical velocity gained.`,
  sol: 'T = √(2h/g); R = uT; v = √(u² + (gT)²).',
  scheme: [[`T = √(2h/g) = ${f(lv.T, 3)} s`, 1], [`R = uT = ${f(lv.R, 3)} m`, 1], [`v = √(u² + g²T²) = ${f(lv.v, 3)} m s⁻¹`, 1]],
  d: 3, c: 'application', t: [3],
}), () => near(Math.sqrt(lv.u ** 2 + 2 * g * lv.h), lv.v, 1e-6) && near(lv.u * Math.sqrt((2 * lv.h) / g), lv.R, 1e-9) || 'landv');
add('ratio-short3', short({
  marks: 3,
  stem: 'Two balls A and B are projected from level ground with the same speed, A at 30° and B at 60° to the horizontal. Find the ratio, A to B, of (i) their horizontal ranges, (ii) their maximum heights and (iii) their times of flight.',
  model: r`(i) $R = \dfrac{u^2\sin 2\theta}{g}$ and $\sin 60^\circ = \sin 120^\circ$, so the ranges are in the ratio $1 : 1$. (ii) $H \propto \sin^2\theta$, so $H_A : H_B = \dfrac{1}{4} : \dfrac{3}{4} = 1 : 3$. (iii) $T \propto \sin\theta$, so $T_A : T_B = \dfrac{1}{2} : \dfrac{\sqrt{3}}{2} = 1 : \sqrt{3}$. So the two balls land at the same place, but B rises three times as high and stays in the air longer.`,
  sol: 'Compare R, H and T through sin 2θ, sin² θ and sin θ.',
  scheme: [['Ranges: sin 60° = sin 120°, ratio 1 : 1', 1], ['Heights: sin² 30° : sin² 60° = 1 : 3', 1], ['Times: sin 30° : sin 60° = 1 : √3', 1]],
  d: 4, c: 'analysis', t: [2],
}), () => {
  const a = projNumeric(26, 30);
  const b = projNumeric(26, 60);
  return near(a.R / b.R, 1, 1e-4) && near(a.H / b.H, 1 / 3, 1e-4) && near(a.T / b.T, 1 / Math.sqrt(3), 1e-4) || 'ratio';
});
const rq = { k: 3 };
rq.th = deg(Math.atan(4 / rq.k));
add('rheq-short3', short({
  marks: 3,
  stem: 'A projectile launched from level ground has a horizontal range three times its maximum height. Show that the ratio of height to range is H/R = tan θ / 4 and hence find the angle of projection.',
  model: r`The maximum height of a projectile is $H = \dfrac{u^2\sin^2\theta}{2g}$ and its range on level ground is $R = \dfrac{2u^2\sin\theta\cos\theta}{g}$. Dividing the height by the range, the speed and the gravity cancel and we get $\dfrac{H}{R} = \dfrac{\sin\theta}{4\cos\theta} = \dfrac{\tan\theta}{4}$. In this problem $R = 3H$, so $\dfrac{H}{R} = \dfrac{1}{3}$ and therefore $\tan\theta = \dfrac{4}{3}$, which gives $\theta = ${f(rq.th, 4)}^\circ$. This is steeper than 45°, where the range would be only four times the height.`,
  sol: 'Divide H by R; set H/R = 1/3.',
  scheme: [['H = u² sin² θ / 2g and R = 2u² sin θ cos θ / g', 1], ['H/R = tan θ / 4', 1], [`H/R = 1/3, so tan θ = 4/3 and θ = ${f(rq.th, 3)}°`, 1]],
  d: 4, c: 'application', t: [2],
}), () => { const p = projNumeric(30, rq.th); return near(p.R / p.H, 3, 1e-4) || 'rheq'; });

// ---------------------------------------------------------------- a harder item: the same height twice
const sh = { u: 26, th: 40, y: 10 };
sh.ux = sh.u * Math.cos(rad(sh.th));
sh.uy = sh.u * Math.sin(rad(sh.th));
sh.disc = Math.sqrt(sh.uy * sh.uy - 2 * g * sh.y);
sh.t1 = (sh.uy - sh.disc) / g;
sh.t2 = (sh.uy + sh.disc) / g;
sh.gap = sh.ux * (sh.t2 - sh.t1);
add('sameh-short3', short({
  marks: 3,
  stem: `A ball is thrown at ${sh.u} m s⁻¹ at ${sh.th}° to the horizontal from level ground. Taking g = 9.8 m s⁻², find the two instants at which it is ${sh.y} m above the ground and the horizontal distance between the two points of the path at that height.`,
  model: r`The height at time $t$ is $y = (u\sin\theta)t - \tfrac{1}{2}gt^2$ with $u\sin\theta = ${f(sh.uy, 4)}$ m s$^{-1}$. Putting $y = ${sh.y}$ gives $4.9t^2 - ${f(sh.uy, 4)}t + ${sh.y} = 0$. This quadratic has two roots, because the ball passes the height once going up and once coming down. They are $t = ${f(sh.t1, 3)}$ s and $t = ${f(sh.t2, 3)}$ s. The ball moves horizontally at $u\cos\theta = ${f(sh.ux, 4)}$ m s$^{-1}$ between them, so the distance is $${f(sh.ux, 4)} \times ${f(sh.t2 - sh.t1, 3)} = ${f(sh.gap, 3)}$ m.`,
  sol: 'Quadratic in t from y(t); distance = horizontal velocity × time difference.',
  scheme: [[`y = (u sin θ)t − ½gt² with u sin θ = ${f(sh.uy, 3)} m s⁻¹, set y = ${sh.y} m`, 1], [`t = ${f(sh.t1, 3)} s (rising) and ${f(sh.t2, 3)} s (falling)`, 1], [`Distance = u cos θ × (t₂ − t₁) = ${f(sh.gap, 3)} m`, 1]],
  d: 5, c: 'analysis', t: [2],
}), () => {
  const y = (t) => sh.uy * t - 0.5 * g * t * t;
  return Math.abs(y(sh.t1) - sh.y) < 1e-9 && Math.abs(y(sh.t2) - sh.y) < 1e-9 && near(sh.gap, sh.ux * (sh.t2 - sh.t1), 1e-12) && sh.t2 < projNumeric(sh.u, sh.th).T || 'sameh';
});
