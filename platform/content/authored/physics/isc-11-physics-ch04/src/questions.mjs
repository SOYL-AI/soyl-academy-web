// ISC 11 ch04 question bank, part 1: objective items (1 mark: MCQ, assertion-reason, true-false, fill-blank) and 1-3 mark numericals.
// Every numerical is computed here and re-solved by an independent `check` (a stepping integrator, finite differences or direct
// substitution into the other form of the formula); solutions and schemes print the computed values.
// AR keys across the chapter: a (hconst), d (topzero), c (range45), b (acctop2), d (fortyfive), a (landfast).
import { mk, add, r, dec, near } from '../../isc-11-physics-ch01/src/lib.mjs';
import { g, rad, deg, R6, proj, projNumeric, velNumeric, mn } from './phys.mjs';

const { mcq, ar, tf, fill, num } = mk;
const f = (x, n = 3) => dec(x, n);

// ================================================================ t01 two independent motions, terms
add('hvel-mcq', mcq({
  stem: 'A football is kicked from the ground at an angle and then moves under gravity alone. While it travels from the kick to the highest point of its flight, the horizontal component of its velocity',
  right: 'stays constant, because no horizontal force acts on the ball',
  wrong: ['decreases steadily, because the ball slows down as it rises', 'increases steadily, because the ball keeps moving towards the goal', 'becomes zero at the highest point, because the ball stops there for an instant'],
  sol: 'The only force on the ball is its weight, which is vertical. With no horizontal force there is no horizontal acceleration, so the horizontal velocity is the same at every instant. At the top only the vertical component is zero.',
  d: 1, c: 'understanding', t: [1],
}));
add('acctop-mcq', mcq({
  stem: 'A shell fired from a gun at an angle to the horizontal reaches the highest point of its path. Neglecting air resistance, the acceleration of the shell at that point is',
  right: '9.8 m s⁻² directed vertically downward',
  wrong: ['zero, because the velocity of the shell is purely horizontal there', '9.8 m s⁻² directed horizontally, along the velocity', 'less than 9.8 m s⁻² downward, because the vertical velocity has become zero'],
  sol: 'The acceleration of a projectile is g downward at every point of its path, whatever its velocity. At the top the velocity is horizontal, so it is perpendicular to the acceleration.',
  d: 2, c: 'understanding', t: [1],
}));
add('dropthrow-mcq', mcq({
  stem: 'From the roof of a school building a student drops a stone and, at the same instant, a friend throws another stone horizontally at 15 m s⁻¹. Neglecting air resistance, which statement is correct?',
  right: 'Both stones reach the ground at the same instant',
  wrong: ['The dropped stone lands first, because it has no sideways motion to carry', 'The thrown stone lands first, because it has the greater speed', 'The thrown stone lands later, because it follows a longer path'],
  sol: 'Both stones start with zero vertical velocity and fall through the same height with the same acceleration g, so the times of fall are equal. The horizontal velocity of the thrown stone affects only where it lands.',
  d: 2, c: 'understanding', t: [1, 3],
}));
add('notproj-mcq', mcq({
  stem: 'Which one of the following can be treated as projectile motion?',
  right: 'A javelin in flight after the throw, with air resistance neglected',
  wrong: ['A weather balloon rising steadily after its release', 'A firework rocket while its fuel is burning', 'A glider soaring on a rising current of warm air'],
  sol: 'A projectile moves under the force of gravity alone. The javelin does so once it leaves the hand; the other bodies are acted on by buoyancy, thrust or lift as well.',
  d: 1, c: 'recall', t: [1],
}));
const cm = { u: 18, th: 60 };
Object.assign(cm, proj(cm.u, cm.th));
add('comps-mcq', mcq({
  stem: `A tennis ball is served at ${cm.u} m s⁻¹ at ${cm.th}° above the horizontal. The horizontal and vertical components of its initial velocity are`,
  right: `${f(cm.ux, 2)} m s⁻¹ and ${f(cm.uy, 3)} m s⁻¹`,
  wrong: [`${f(cm.uy, 3)} m s⁻¹ and ${f(cm.ux, 2)} m s⁻¹`, `${f(cm.ux, 2)} m s⁻¹ and ${f(cm.u, 3)} m s⁻¹`, `${f(2 * cm.uy, 3)} m s⁻¹ and ${f(cm.ux, 2)} m s⁻¹`],
  scheme: [[`u cos θ = ${f(cm.ux, 2)} m s⁻¹ horizontally and u sin θ = ${f(cm.uy, 3)} m s⁻¹ vertically (@K)`, 1]],
  sol: `The horizontal component is u cos θ = ${cm.u} cos ${cm.th}° = ${f(cm.ux, 2)} m s⁻¹; the vertical component is u sin θ = ${cm.u} sin ${cm.th}° = ${f(cm.uy, 3)} m s⁻¹.`,
  d: 2, c: 'application', t: [1],
}), () => {
  const [vx, vy] = velNumeric(cm.u, cm.th, 0);
  return near(vx, cm.ux, 1e-6) && near(vy, cm.uy, 1e-6) && near(Math.hypot(vx, vy), cm.u, 1e-6) || 'comps';
});
const tl = { u: 30, th: 60 };
Object.assign(tl, proj(tl.u, tl.th));
add('toplat-mcq', mcq({
  stem: `A ball is thrown at ${tl.u} m s⁻¹ at ${tl.th}° to the horizontal. Neglecting air resistance, its speed at the highest point of the path is`,
  right: `${f(tl.ux, 3)} m s⁻¹`,
  wrong: ['zero', `${f(tl.uy, 3)} m s⁻¹`, `${tl.u} m s⁻¹`],
  scheme: [[`At the top v_y = 0, so v = u cos θ = ${f(tl.ux, 3)} m s⁻¹ (@K)`, 1]],
  sol: `At the highest point the vertical component of the velocity is zero but the horizontal component is unchanged: v = u cos θ = ${tl.u} cos ${tl.th}° = ${f(tl.ux, 3)} m s⁻¹.`,
  d: 2, c: 'application', t: [1, 3],
}), () => {
  const [vx, vy] = velNumeric(tl.u, tl.th, tl.tTop);
  return near(Math.hypot(vx, vy), tl.ux, 1e-6) && Math.abs(vy) < 1e-6 || 'toplat';
});

// ================================================================ t02 trajectory, T, H, R, maximum range
add('traj-mcq', mcq({
  stem: 'Eliminating time between the horizontal and vertical positions of a projectile gives y = ax − bx², where a and b are constants. The trajectory is therefore',
  right: 'a parabola, because y depends on x through a term in x²',
  wrong: ['a straight line, because x increases uniformly with time', 'a circle, because the speed of the projectile is constant', 'a hyperbola, because y falls as x increases'],
  sol: 'An equation of the form y = ax − bx² is a quadratic in x, whose graph is a parabola through the origin opening downward. The speed of a projectile is not constant, and a straight line would need no x² term.',
  d: 2, c: 'understanding', t: [2],
}));
const tr = { a: 30, b: 60 };
tr.r = Math.sin(rad(tr.a)) / Math.sin(rad(tr.b));
add('tratio-mcq', mcq({
  stem: 'Two balls are thrown with the same speed, one at 30° and the other at 60° to the horizontal. The ratio of their times of flight is',
  right: '1 : √3',
  wrong: ['1 : 3', '√3 : 1', '1 : 1'],
  scheme: [['T = 2u sin θ / g, so T₁ : T₂ = sin 30° : sin 60° = 1 : √3 (@K)', 1]],
  sol: 'T = 2u sin θ / g is proportional to sin θ for a fixed u. sin 30° : sin 60° = 0.5 : 0.866 = 1 : √3. The ranges would be equal, not the times.',
  d: 3, c: 'application', t: [2],
}), () => {
  const a = projNumeric(30, tr.a);
  const b = projNumeric(30, tr.b);
  return near(a.T / b.T, 1 / Math.sqrt(3), 1e-4) && near(tr.r, a.T / b.T, 1e-4) || 'tratio';
});
add('hdouble-mcq', mcq({
  stem: 'A cricketer throws a ball at a certain angle to the horizontal. If he throws it at the same angle with twice the speed, the maximum height reached becomes',
  right: 'four times as great',
  wrong: ['twice as great', '√2 times as great', 'unchanged, because the angle is the same'],
  sol: 'H = u² sin² θ / 2g is proportional to u². Doubling u at a fixed angle multiplies H by 2² = 4.',
  d: 2, c: 'understanding', t: [2],
}), () => near(projNumeric(40, 35).H / projNumeric(20, 35).H, 4, 1e-4) || 'hdouble');
add('hratio-mcq', mcq({
  stem: 'Two stones are projected with the same speed, one at 30° and the other at 45° to the horizontal. The ratio of their maximum heights is',
  right: '1 : 2',
  wrong: ['1 : √2', '1 : 3', '1 : 4'],
  scheme: [['H ∝ sin² θ, so H₁ : H₂ = sin² 30° : sin² 45° = 0.25 : 0.5 = 1 : 2 (@K)', 1]],
  sol: 'H = u² sin² θ / 2g is proportional to sin² θ. sin² 30° = 1/4 and sin² 45° = 1/2, so the ratio is 1 : 2.',
  d: 3, c: 'application', t: [2],
}), () => near(projNumeric(25, 30).H / projNumeric(25, 45).H, 0.5, 1e-4) || 'hratio');
const rt = { R: 40 };
rt.R9 = 9 * rt.R;
add('rtriple-mcq', mcq({
  stem: `A projectile launched at a fixed angle with speed v on level ground has a range of ${rt.R} m. If the speed is made 3v at the same angle, the range becomes`,
  right: `${rt.R9} m`,
  wrong: [`${3 * rt.R} m`, `${6 * rt.R} m`, `${f(Math.sqrt(3) * rt.R, 3)} m`],
  scheme: [[`R ∝ u², so the range becomes ${rt.R} × 9 = ${rt.R9} m (@K)`, 1]],
  sol: `R = u² sin 2θ / g is proportional to u². With 3v the range is multiplied by 3² = 9: ${rt.R} × 9 = ${rt.R9} m.`,
  d: 2, c: 'application', t: [2],
}), () => near(projNumeric(30, 40).R / projNumeric(10, 40).R, 9, 1e-4) || 'rtriple');
const rx = { u: 28 };
rx.R = (rx.u * rx.u) / g;
add('rmax-mcq', mcq({
  stem: `A ball is thrown at ${rx.u} m s⁻¹. Neglecting air resistance and taking g = 9.8 m s⁻², the greatest horizontal distance it can reach on level ground is`,
  right: `${rx.R} m`,
  wrong: [`${rx.R / 2} m`, `${2 * rx.R} m`, `${2 * rx.u} m`],
  scheme: [[`R_max = u²/g = ${rx.u}²/9.8 = ${rx.R} m at 45° (@K)`, 1]],
  sol: `The range is greatest at 45°, where R_max = u²/g = ${rx.u * rx.u}/9.8 = ${rx.R} m. The value u²/2g would be the maximum height of a vertical throw.`,
  d: 2, c: 'application', t: [2],
}), () => near(projNumeric(rx.u, 45).R, rx.R, 1e-4) && projNumeric(rx.u, 44).R < rx.R && projNumeric(rx.u, 46).R < rx.R || 'rmax');
add('compl-mcq', mcq({
  stem: 'A stone thrown at 20° to the horizontal lands at a point P on level ground. Keeping the speed the same, which other angle of projection would also take the stone to P?',
  right: '70°',
  wrong: ['40°', '45°', '80°'],
  sol: 'For a fixed speed the range is the same for angles θ and 90° − θ, because sin 2(90° − θ) = sin(180° − 2θ) = sin 2θ. The complement of 20° is 70°.',
  d: 2, c: 'understanding', t: [2],
}), () => near(projNumeric(31, 20).R, projNumeric(31, 70).R, 1e-4) && !near(projNumeric(31, 20).R, projNumeric(31, 40).R, 1e-3) || 'compl');
add('r4h-mcq', mcq({
  stem: 'A projectile is launched at 45° to the horizontal from level ground. Its horizontal range is',
  right: 'four times its maximum height',
  wrong: ['equal to its maximum height', 'twice its maximum height', 'half its maximum height'],
  sol: 'At 45°, R = u²/g and H = u² sin² 45° / 2g = u²/4g, so R = 4H. In general H/R = tan θ / 4.',
  d: 2, c: 'recall', t: [2],
}), () => { const p = projNumeric(33, 45); return near(p.R / p.H, 4, 1e-4) || 'r4h'; });
const rh = { th: deg(Math.atan(4)) };
add('rh-mcq', mcq({
  stem: 'For which angle of projection do the maximum height and the horizontal range of a projectile have equal values?',
  right: `about ${f(rh.th, 2)}°, where tan θ = 4`,
  wrong: ['45°, where the range is greatest', '60°, where the height is twice the range', '30°, where the range is twice the height'],
  scheme: [[`H/R = tan θ / 4 = 1, so tan θ = 4 and θ = ${f(rh.th, 3)}° (@K)`, 1]],
  sol: `H = u² sin² θ / 2g and R = 2u² sin θ cos θ / g, so H/R = tan θ / 4. Setting H = R gives tan θ = 4, θ = ${f(rh.th, 3)}°. At 45° the range is four times the height.`,
  d: 4, c: 'application', t: [2],
}), () => { const p = projNumeric(30, rh.th); return near(p.R, p.H, 1e-4) || 'rh'; });
add('moon-mcq', mcq({
  stem: 'A ball is thrown on the Moon with the same speed and angle as on the Earth. The acceleration due to gravity on the Moon is one-sixth of that on the Earth. Compared with the Earth, the range and the time of flight on the Moon are',
  right: 'both six times as large',
  wrong: ['six times as large and the same, respectively', 'both unchanged, because the launch conditions are the same', 'six times as large and √6 times as large, respectively'],
  scheme: [['R = u² sin 2θ / g and T = 2u sin θ / g are both proportional to 1/g, so both become 6 times larger (@K)', 1]],
  sol: 'Both R = u² sin 2θ / g and T = 2u sin θ / g vary as 1/g. With g reduced to one-sixth, each increases six-fold.',
  d: 3, c: 'understanding', t: [2],
}), () => {
  const e = projNumeric(20, 40, 0, g);
  const m = projNumeric(20, 40, 0, g / 6);
  return near(m.R / e.R, 6, 1e-4) && near(m.T / e.T, 6, 1e-4) || 'moon';
});

// ================================================================ t03 velocity at any instant, horizontal projection
const an = { vx: 12, vy: -16 };
an.v = Math.hypot(an.vx, an.vy);
an.ang = deg(Math.atan(Math.abs(an.vy) / an.vx));
add('angle-mcq', mcq({
  stem: 'At one instant the velocity of a ball has a horizontal component of 12 m s⁻¹ and a vertical component of 16 m s⁻¹ directed downward. The speed of the ball and the direction of its motion are',
  right: `${f(an.v, 3)} m s⁻¹, at about ${f(an.ang, 2)}° below the horizontal`,
  wrong: [`${f(an.v, 3)} m s⁻¹, at about ${f(90 - an.ang, 2)}° below the horizontal`, `${f(an.vx + Math.abs(an.vy), 3)} m s⁻¹, at about ${f(an.ang, 2)}° below the horizontal`, `${f(an.v, 3)} m s⁻¹, at about ${f(an.ang, 2)}° above the horizontal`],
  scheme: [[`v = √(12² + 16²) = ${f(an.v, 3)} m s⁻¹; tan α = 16/12, α = ${f(an.ang, 3)}° below the horizontal (@K)`, 1]],
  sol: `v = √(12² + 16²) = ${f(an.v, 3)} m s⁻¹. tan α = |v_y|/v_x = 16/12 = 1.33, so α = ${f(an.ang, 3)}°; v_y is downward, so the direction is below the horizontal. Components are added at right angles, not arithmetically.`,
  d: 3, c: 'application', t: [3],
}), () => near(Math.hypot(12, 16), an.v, 1e-9) && near(Math.atan2(-16, 12) * 180 / Math.PI, -an.ang, 1e-9) || 'angle');
const ls = { u: 25, th: 60 };
Object.assign(ls, proj(ls.u, ls.th));
add('landspeed-mcq', mcq({
  stem: `A ball is thrown from level ground at ${ls.u} m s⁻¹ at ${ls.th}° to the horizontal and comes down on level ground. Neglecting air resistance, its speed just before it touches the ground is`,
  right: `${ls.u} m s⁻¹, the same as its speed of projection`,
  wrong: [`${f(ls.ux, 3)} m s⁻¹, equal to its horizontal component`, `${f(ls.uy, 3)} m s⁻¹, equal to its vertical component`, 'zero, because the ball comes to rest on the ground'],
  scheme: [[`On landing v_x = ${f(ls.ux, 3)} and v_y = −${f(ls.uy, 3)} m s⁻¹, so v = ${ls.u} m s⁻¹ (@K)`, 1]],
  sol: `On landing at the launch level v_y = −u sin θ = −${f(ls.uy, 3)} m s⁻¹ while v_x = ${f(ls.ux, 3)} m s⁻¹, so v = √(${f(ls.ux, 3)}² + ${f(ls.uy, 3)}²) = ${ls.u} m s⁻¹, the speed of projection (directed ${ls.th}° below the horizontal).`,
  d: 2, c: 'understanding', t: [3],
}), () => { const p = projNumeric(ls.u, ls.th); return near(Math.hypot(p.vxEnd, p.vyEnd), ls.u, 1e-4) || 'landspeed'; });
const ht = { h: 1.2, u: 3 };
ht.T = Math.sqrt((2 * ht.h) / g);
add('htime-mcq', mcq({
  stem: `A marble rolls off the edge of a table ${ht.h} m high with a horizontal speed of ${ht.u} m s⁻¹. Taking g = 9.8 m s⁻², the time it takes to reach the floor is`,
  right: `${f(ht.T, 2)} s`,
  wrong: [`${f(Math.sqrt(ht.h / g), 2)} s`, `${f(ht.h / ht.u, 2)} s`, `${f((2 * ht.h) / g, 2)} s`],
  scheme: [[`T = √(2h/g) = √(2 × ${ht.h}/9.8) = ${f(ht.T, 2)} s, independent of the speed ${ht.u} m s⁻¹ (@K)`, 1]],
  sol: `The fall is free fall from rest: h = ½gT², so T = √(2h/g) = √(${2 * ht.h}/9.8) = ${f(ht.T, 3)} s. The horizontal speed does not enter. The value ${f(ht.h / ht.u, 2)} s would be h divided by the speed, which has no meaning here.`,
  d: 2, c: 'application', t: [3],
}), () => {
  // step the fall numerically
  let y = ht.h;
  let v = 0;
  let t = 0;
  const dt = 1e-5;
  while (y > 0) { v += g * dt; y -= v * dt; t += dt; }
  return near(t, ht.T, 1e-3) || 'htime';
});
add('hratio2-mcq', mcq({
  stem: 'Two stones are thrown horizontally from the same cliff, the first at speed u and the second at speed 2u. The ratio of their times of fall and the ratio of their horizontal distances from the foot of the cliff are respectively',
  right: '1 : 1 and 1 : 2',
  wrong: ['1 : 2 and 1 : 2', '1 : 1 and 1 : 4', '2 : 1 and 1 : 1'],
  scheme: [['T = √(2h/g) is the same for both; R = uT, so R₁ : R₂ = 1 : 2 (@K)', 1]],
  sol: 'The time of fall T = √(2h/g) depends only on the height, so the times are equal. The horizontal distance R = uT is proportional to u, so the distances are in the ratio 1 : 2.',
  d: 2, c: 'understanding', t: [3],
}), () => {
  const a = 7 * Math.sqrt((2 * 20) / g);
  const b = 14 * Math.sqrt((2 * 20) / g);
  return near(b / a, 2, 1e-9) || 'hratio2';
});
const hs = { u: 6, h: 19.6 };
hs.T = Math.sqrt((2 * hs.h) / g);
hs.vy = g * hs.T;
hs.v = Math.hypot(hs.u, hs.vy);
add('hspeed-mcq', mcq({
  stem: `A girl throws a ball horizontally at ${hs.u} m s⁻¹ from the roof of a building ${hs.h} m high. Taking g = 9.8 m s⁻², the speed of the ball just before it hits the ground is`,
  right: `${f(hs.v, 3)} m s⁻¹`,
  wrong: [`${f(hs.vy, 3)} m s⁻¹`, `${f(hs.u + hs.vy, 3)} m s⁻¹`, `${f(hs.vy - hs.u, 3)} m s⁻¹`],
  scheme: [[`v_y = √(2gh) = ${f(hs.vy, 3)} m s⁻¹; v = √(${hs.u}² + ${f(hs.vy, 3)}²) = ${f(hs.v, 3)} m s⁻¹ (@K)`, 1]],
  sol: `v_y² = 2gh = 2 × 9.8 × ${hs.h}, so v_y = ${f(hs.vy, 3)} m s⁻¹ downward; v_x = ${hs.u} m s⁻¹. The speed is the resultant, √(${hs.u}² + ${f(hs.vy, 3)}²) = ${f(hs.v, 3)} m s⁻¹, not the sum of the components.`,
  d: 3, c: 'application', t: [3],
}), () => near(Math.sqrt(hs.u ** 2 + 2 * g * hs.h), hs.v, 1e-9) || 'hspeed');
add('hpath-mcq', mcq({
  stem: 'A body is projected horizontally with speed u from the origin, with y measured downward from the point of projection. The equation of its path is',
  right: 'y = g x² / (2u²)',
  wrong: ['y = u x² / (2g)', 'y = g x / (2u)', 'y = 2g x² / u²'],
  sol: 'x = ut and y = ½gt². Eliminating t = x/u gives y = g x² / (2u²), half of a parabola with its vertex at the point of projection.',
  d: 3, c: 'understanding', t: [3],
}));

// ================================================================ assertion-reason
add('hconst-ar', ar({
  a: 'During the flight of a projectile the horizontal component of its velocity stays constant (air resistance neglected).',
  r: 'No force acts on a projectile in the horizontal direction.',
  key: 'a',
  sol: 'A is true: with no horizontal force, the horizontal acceleration is zero and v_x = u cos θ throughout. R is true and is exactly why: the weight is vertical, so nothing changes the horizontal velocity.',
  d: 2, c: 'understanding', t: [1],
}));
add('topzero-ar', ar({
  a: 'At the highest point of its path a projectile is momentarily at rest.',
  r: 'At the highest point the vertical component of the velocity of a projectile is zero.',
  key: 'd',
  sol: 'A is false: the horizontal component u cos θ is still present, so the projectile moves horizontally at its least speed (it is at rest only for a vertical throw). R is true.',
  d: 2, c: 'analysis', t: [1],
}));
add('range45-ar', ar({
  a: 'For a given speed of projection from level ground, the horizontal range is greatest when the angle of projection is 45°.',
  r: 'At an angle of projection of 45° the maximum height reached is also the greatest.',
  key: 'c',
  sol: 'A is true: R = u² sin 2θ / g is largest when sin 2θ = 1. R is false: H = u² sin² θ / 2g is greatest at 90°, not at 45°.',
  d: 3, c: 'analysis', t: [2],
}));
add('acctop2-ar', ar({
  a: 'The speed of a projectile is least at the highest point of its path.',
  r: 'The acceleration of a projectile is the same at every point of its path.',
  key: 'b',
  sol: 'A is true: at the top v_y = 0, so v = u cos θ, the smallest value. R is also true, but a constant acceleration does not by itself say where the speed is least; that follows from the vertical component becoming zero at the top.',
  d: 3, c: 'analysis', t: [1, 3],
}));
add('fortyfive-ar', ar({
  a: 'A ball thrown at 40° and another thrown at 55° with the same speed from level ground have the same range.',
  r: 'The ranges are equal for two angles of projection that add up to 90°.',
  key: 'd',
  sol: 'A is false: 40° and 55° add up to 95°, not 90°, so the ranges differ (the complement of 40° is 50°). R is true: sin 2(90° − θ) = sin 2θ.',
  d: 3, c: 'analysis', t: [2],
}), () => !near(projNumeric(30, 40).R, projNumeric(30, 55).R, 1e-3) && near(projNumeric(30, 40).R, projNumeric(30, 50).R, 1e-4) || 'fortyfive');
add('landfast-ar', ar({
  a: 'A stone thrown horizontally from a roof strikes the ground with a speed greater than its speed of projection.',
  r: 'During the fall the stone gains a vertical velocity, which combines at right angles with the unchanged horizontal velocity to give a larger resultant speed.',
  key: 'a',
  sol: 'A is true: the speed on landing is √(u² + 2gh), which exceeds u. R is true and explains it: the horizontal component stays u while a vertical component √(2gh) is gained, and the resultant of the two is larger than u.',
  d: 2, c: 'understanding', t: [3],
}));

// ================================================================ true-false and fill-blank
add('perp-tf', tf({
  stem: 'At the highest point of its trajectory, the velocity and the acceleration of a projectile are perpendicular to each other.',
  key: 't',
  sol: 'True. At the top the velocity is horizontal (u cos θ) and the acceleration is g vertically downward, so the two are at right angles.',
  d: 2, c: 'understanding', t: [1],
}));
add('mass-tf', tf({
  stem: 'Neglecting air resistance, a heavy iron ball and a light plastic ball projected with the same speed at the same angle have different ranges.',
  key: 'f',
  sol: 'False. R = u² sin 2θ / g does not contain the mass; with no air resistance both balls follow the same trajectory.',
  d: 2, c: 'understanding', t: [2],
}));
add('parab-fill', fill({
  stem: 'Neglecting air resistance, the trajectory of a projectile is a ___.',
  acc: [['parabola']],
  sol: 'Eliminating time gives y = x tan θ − g x² / (2u² cos² θ), the equation of a **parabola**.',
  d: 1, c: 'recall', t: [1, 2],
}));
add('rmaxg-fill', fill({
  stem: 'The greatest horizontal range of a projectile launched from level ground with speed u is u² divided by ___.',
  acc: [['g', 'acceleration due to gravity', 'the acceleration due to gravity']],
  sol: 'At 45° the range is R_max = u²/**g**.',
  d: 1, c: 'recall', t: [2],
}));

// ================================================================ numericals
const n1 = { u: 30, th: 40 };
Object.assign(n1, proj(n1.u, n1.th));
add('tup-num', num({
  stem: `A javelin leaves the thrower's hand at ${n1.u} m s⁻¹ at ${n1.th}° to the horizontal. Taking g = 9.8 m s⁻², find the time it takes to reach its highest point, in s.`,
  value: R6(n1.tTop), tol: 0.02, unit: 's',
  sol: r`At the top $v_y = 0$: $u\sin\theta - gt = 0$, so $t = \dfrac{u\sin\theta}{g} = \dfrac{${n1.u}\sin ${n1.th}^\circ}{9.8} = ${f(n1.tTop, 3)}$ s.`,
  scheme: [[`t = u sin θ / g = ${n1.u} sin ${n1.th}° / 9.8 = ${f(n1.tTop, 3)} s`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => {
  // independent: step the vertical velocity down to zero
  let vy = n1.u * Math.sin(rad(n1.th));
  let t = 0;
  while (vy > 0) { vy -= g * 1e-5; t += 1e-5; }
  return near(t, q.answer.value, 2e-3) || 'tup';
});
const n2 = { u: 22, th: 35 };
Object.assign(n2, proj(n2.u, n2.th));
add('range-num', num({
  stem: `A fielder throws a cricket ball at ${n2.u} m s⁻¹ at ${n2.th}° above the horizontal towards the wicket-keeper, who catches it at the level of the throw. Taking g = 9.8 m s⁻² and neglecting air resistance, find the horizontal distance between them, in m.`,
  value: R6(n2.R), tol: 0.1, unit: 'm', marks: 2,
  sol: r`$R = \dfrac{u^2\sin 2\theta}{g} = \dfrac{${n2.u}^2\sin ${2 * n2.th}^\circ}{9.8} = \dfrac{${n2.u ** 2} \times ${f(Math.sin(rad(2 * n2.th)), 4)}}{9.8} = ${f(n2.R, 4)}$ m.`,
  scheme: [['R = u² sin 2θ / g with 2θ = 70°', 1], [`R = ${n2.u ** 2} × ${f(Math.sin(rad(2 * n2.th)), 4)} / 9.8 = ${f(n2.R, 3)} m`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => near(projNumeric(n2.u, n2.th).R, q.answer.value, 1e-3) || 'range');
const n3 = { u: 16, th: 50 };
Object.assign(n3, proj(n3.u, n3.th));
add('hmax-num', num({
  stem: `A volleyball is served at ${n3.u} m s⁻¹ at ${n3.th}° to the horizontal. Taking g = 9.8 m s⁻², find the greatest height it reaches above the point of the serve, in m.`,
  value: R6(n3.H), tol: 0.05, unit: 'm', marks: 2,
  sol: r`$H = \dfrac{u^2\sin^2\theta}{2g} = \dfrac{(${n3.u}\sin ${n3.th}^\circ)^2}{2 \times 9.8} = \dfrac{${f(n3.uy, 4)}^2}{19.6} = ${f(n3.H, 4)}$ m.`,
  scheme: [[`Vertical component u sin θ = ${f(n3.uy, 4)} m s⁻¹`, 1], [`H = (u sin θ)² / 2g = ${f(n3.H, 3)} m`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => near(projNumeric(n3.u, n3.th).H, q.answer.value, 1e-3) || 'hmax');
const n4 = { u: 28, th: 45, t: 3 };
n4.vx = n4.u * Math.cos(rad(n4.th));
n4.vy = n4.u * Math.sin(rad(n4.th)) - g * n4.t;
n4.v = Math.hypot(n4.vx, n4.vy);
n4.ang = deg(Math.atan(Math.abs(n4.vy) / n4.vx));
add('vmag-num', num({
  stem: `A ball is projected at ${n4.u} m s⁻¹ at ${n4.th}° to the horizontal. Taking g = 9.8 m s⁻², find its speed ${n4.t} s after projection, in m s⁻¹.`,
  value: R6(n4.v), tol: 0.05, unit: 'm s⁻¹', marks: 2,
  sol: r`$v_x = u\cos\theta = ${f(n4.vx, 4)}$ m s$^{-1}$ and $v_y = u\sin\theta - gt = ${f(n4.vx, 4)} - 9.8(${n4.t}) = ${mn(f(n4.vy, 4))}$ m s$^{-1}$. $v = \sqrt{v_x^2 + v_y^2} = \sqrt{${f(n4.vx, 4)}^2 + ${f(Math.abs(n4.vy), 4)}^2} = ${f(n4.v, 4)}$ m s$^{-1}$, directed $${f(n4.ang, 3)}^\circ$ below the horizontal.`,
  scheme: [[`v_x = ${f(n4.vx, 4)} m s⁻¹ and v_y = ${mn(f(n4.vy, 4))} m s⁻¹`, 1], [`v = √(v_x² + v_y²) = ${f(n4.v, 3)} m s⁻¹`, 1]],
  d: 3, c: 'application', t: [3],
}), (q) => {
  const [vx, vy] = velNumeric(n4.u, n4.th, n4.t);
  return near(Math.hypot(vx, vy), q.answer.value, 1e-4) || 'vmag';
});
const n5 = { u: 8, h: 12.5 };
n5.T = Math.sqrt((2 * n5.h) / g);
n5.vy = g * n5.T;
n5.v = Math.hypot(n5.u, n5.vy);
add('hproj-num', num({
  stem: `A cricket ball rolls off a flat roof with a horizontal speed of ${n5.u} m s⁻¹. The roof is ${n5.h} m above the ground. Taking g = 9.8 m s⁻², find the speed with which the ball strikes the ground, in m s⁻¹.`,
  value: R6(n5.v), tol: 0.05, unit: 'm s⁻¹', marks: 3,
  sol: r`Time of fall $T = \sqrt{\dfrac{2h}{g}} = \sqrt{\dfrac{25}{9.8}} = ${f(n5.T, 4)}$ s. Then $v_y = gT = ${f(n5.vy, 4)}$ m s$^{-1}$ and $v = \sqrt{${n5.u}^2 + ${f(n5.vy, 4)}^2} = ${f(n5.v, 4)}$ m s$^{-1}$.`,
  scheme: [[`T = √(2h/g) = ${f(n5.T, 3)} s`, 1], [`v_y = gT = ${f(n5.vy, 3)} m s⁻¹ (v_x = ${n5.u} m s⁻¹)`, 1], [`v = √(v_x² + v_y²) = ${f(n5.v, 3)} m s⁻¹`, 1]],
  d: 3, c: 'application', t: [3],
}), (q) => {
  // independent: energy form v² = u² + 2gh
  return near(Math.sqrt(n5.u ** 2 + 2 * g * n5.h), q.answer.value, 1e-4) || 'hproj';
});
const n6 = { R: 50, th: 30 };
n6.u = Math.sqrt((n6.R * g) / Math.sin(rad(2 * n6.th)));
add('findu-num', num({
  stem: `A stone thrown at ${n6.th}° above the horizontal from level ground lands ${n6.R} m away at the same level. Taking g = 9.8 m s⁻² and neglecting air resistance, find the speed with which it was thrown, in m s⁻¹.`,
  value: R6(n6.u), tol: 0.05, unit: 'm s⁻¹', marks: 3,
  sol: r`$R = \dfrac{u^2\sin 2\theta}{g}$, so $u^2 = \dfrac{Rg}{\sin 2\theta} = \dfrac{${n6.R} \times 9.8}{\sin ${2 * n6.th}^\circ} = \dfrac{${R6(n6.R * g)}}{${f(Math.sin(rad(2 * n6.th)), 4)}} = ${f(n6.u * n6.u, 4)}$ and $u = ${f(n6.u, 4)}$ m s$^{-1}$.`,
  scheme: [['R = u² sin 2θ / g, so u² = Rg / sin 2θ', 1], [`u² = ${n6.R} × 9.8 / sin 60° = ${f(n6.u * n6.u, 4)} m² s⁻²`, 1], [`u = ${f(n6.u, 3)} m s⁻¹`, 1]],
  d: 3, c: 'application', t: [2],
}), (q) => near(projNumeric(q.answer.value, n6.th).R, n6.R, 1e-3) || 'findu');

// ================================================================ a harder velocity item
const hh = { u: 40, th: 60 };
hh.vx = hh.u * Math.cos(rad(hh.th));
hh.uy = hh.u * Math.sin(rad(hh.th));
hh.H = (hh.uy * hh.uy) / (2 * g);
hh.vy2 = hh.uy * hh.uy - 2 * g * (hh.H / 2);
hh.v = Math.sqrt(hh.vx * hh.vx + hh.vy2);
hh.frac = hh.v / hh.u;
add('halfh-mcq', mcq({
  stem: 'A ball is projected from level ground at 60° to the horizontal with speed u. Neglecting air resistance, its speed at the instant when it is at half of its maximum height, on the way up, is',
  right: `${f(hh.frac, 3)} u, that is u√(5/8)`,
  wrong: ['u/2, the horizontal component only', `${f(Math.sqrt(3) / 2, 3)} u, the vertical component only`, `${f(Math.sqrt(0.75 + 0.25 / 2), 3)} u, that is u√(7/8)`],
  scheme: [[`v_x² = (u cos 60°)² = u²/4 and v_y² = (u sin 60°)² − 2g(H/2) = 3u²/8; v² = 5u²/8, v = ${f(hh.frac, 3)} u (@K)`, 1]],
  sol: `Horizontally v_x = u cos 60° = u/2, so v_x² = u²/4. Vertically v_y² = u_y² − 2g(H/2) = u_y² − gH = u_y² − u_y²/2 = u_y²/2 = 3u²/8, using H = u_y²/2g. So v² = u²/4 + 3u²/8 = 5u²/8 and v = ${f(hh.frac, 3)} u.`,
  d: 5, c: 'analysis', t: [3],
}), () => {
  // independent: find the time at which y = H/2 by stepping, then take the speed from the position differences
  const p = projNumeric(hh.u, hh.th);
  let t = 0;
  const dt = 1e-6;
  const y = (s) => hh.uy * s - 0.5 * g * s * s;
  while (y(t) < p.H / 2) t += dt;
  const [vx, vy] = velNumeric(hh.u, hh.th, t);
  return near(Math.hypot(vx, vy) / hh.u, hh.frac, 1e-4) && vy > 0 || 'halfh';
});
