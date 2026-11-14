// ISC 11 ch07 question bank, part 1: objective items (1 mark: MCQ, assertion-reason, true-false, fill-blank) and 1-3 mark numericals.
// Every numerical is computed here and re-solved by an independent `check` (finite differences of the position on the circle, stepping
// of a rotation, root finding on the force balance, or a step-by-step integration of a ball on a string); solutions and schemes print
// the computed values.
// AR keys across the chapter: a (acc), b (vmax), d (cf), c (top), b (omega), a (bottom).
import { mk, add, r, dec, sci, near } from '../../isc-11-physics-ch01/src/lib.mjs';
import { g, rad, deg, R6, TAU, root, accFD, speedFD, stepRotation, bankAngle, levelVmax, bankSpeed, circleRun } from './phys.mjs';

const { mcq, ar, tf, fill, num } = mk;
const f = (x, n = 3) => dec(x, n);

// ================================================================ t01 angular quantities
const m1 = { r: 40, s: 40 };
m1.th = m1.s / m1.r;
add('rad-mcq', mcq({
  stem: `A sprinter on a circular practice track of radius ${m1.r} m runs along the track for exactly ${m1.s} m. The angular displacement of the sprinter about the centre of the track is`,
  right: `${m1.th} rad, about ${f(deg(m1.th), 3)}°`,
  wrong: [`1°, because the arc is ${m1.s} m`, `${m1.s} rad, the same number as the arc length`, 'π rad, because the arc is as long as the radius times π'],
  sol: `The angle in radians is the arc divided by the radius: ${m1.s} / ${m1.r} = ${m1.th} rad, which is one radian, about ${f(deg(m1.th), 3)}°.`,
  d: 1, c: 'application', t: [1],
}), () => near(Math.atan2(Math.sin(m1.th), Math.cos(m1.th)), 1, 1e-12) && near(deg(m1.th), 57.2958, 1e-5) || 'rad');
add('omegadir-mcq', mcq({
  stem: 'A flywheel in a Nashik workshop turns anticlockwise when seen from above. By the right-hand rule, its angular velocity vector points',
  right: 'vertically upwards, along the axis of the flywheel',
  wrong: ['along the tangent at the rim, in the direction of motion of the rim', 'horizontally outwards from the axis, along a radius', 'vertically downwards, along the axis of the flywheel'],
  sol: 'Curling the fingers of the right hand in the sense of the turning (anticlockwise seen from above) makes the thumb point upwards. The angular velocity vector lies along the axis, not along the velocity of any particle.',
  d: 2, c: 'understanding', t: [1],
}));
const m3 = { ra: 1.5, rb: 3.0 };
add('vr-mcq', mcq({
  stem: `Tanvi and Arjun ride a merry-go-round at a fair in Nagpur. Tanvi sits ${m3.ra} m from the axis and Arjun ${m3.rb} m from it. Which statement is correct?`,
  right: 'Both have the same angular velocity, and Arjun’s speed is twice Tanvi’s',
  wrong: ['Arjun has twice the angular velocity and the same speed as Tanvi', 'Both have the same speed, and Arjun has half the angular velocity', 'Arjun has twice the angular velocity and twice the speed'],
  sol: `The seats are fixed to one rigid platform, so all turn through the same angle in the same time: ω is the same. Then v = rω is proportional to r, and ${m3.rb} / ${m3.ra} = ${m3.rb / m3.ra}, so Arjun’s speed is twice Tanvi’s.`,
  d: 2, c: 'understanding', t: [1],
}), () => near(m3.rb / m3.ra, 2, 1e-12) || 'vr');
const m4 = { rpm: 240 };
m4.w = (m4.rpm * TAU) / 60;
add('rpm-mcq', mcq({
  stem: `A ceiling fan in a Jaipur classroom turns at ${m4.rpm} revolutions per minute. Its angular velocity is`,
  right: `${f(m4.w, 3)} rad s⁻¹`,
  wrong: [`${f(m4.rpm / 60, 2)} rad s⁻¹`, `${f(Math.PI * (m4.rpm / 60), 3)} rad s⁻¹`, `${f(m4.rpm * TAU, 4)} rad s⁻¹`],
  scheme: [[`ω = ${m4.rpm} × 2π / 60 = ${f(m4.w, 4)} rad s⁻¹ (@K)`, 1]],
  sol: `${m4.rpm} revolutions in 60 s is ${m4.rpm / 60} revolutions per second, and each revolution is 2π rad: ω = ${m4.rpm / 60} × 2π = ${f(m4.w, 4)} rad s⁻¹. The numbers in the wrong options come from leaving out 2π, using π, or not dividing by 60.`,
  d: 2, c: 'application', t: [1],
}), () => {
  const T = 60 / m4.rpm;
  return near(TAU / T, m4.w, 1e-12) || 'rpm';
});
const m5 = { R: 0.15, al: 12 };
m5.at = m5.R * m5.al;
add('at-mcq', mcq({
  stem: `A grinding wheel of radius ${m5.R} m speeds up with an angular acceleration of ${m5.al} rad s⁻². The tangential acceleration of a point on its rim is`,
  right: `${f(m5.at, 3)} m s⁻²`,
  wrong: [`${f(m5.al / m5.R, 3)} m s⁻²`, `${f(m5.R / m5.al, 3)} m s⁻²`, `${m5.al} m s⁻², the same as the angular acceleration`],
  scheme: [[`a_t = rα = ${m5.R} × ${m5.al} = ${f(m5.at, 3)} m s⁻² (@K)`, 1]],
  sol: `The tangential acceleration is a_t = rα = ${m5.R} × ${m5.al} = ${f(m5.at, 3)} m s⁻². The wrong values come from dividing instead of multiplying, or from forgetting the radius.`,
  d: 2, c: 'application', t: [1],
}), () => {
  // speed gain of the rim over one second of stepping the rotation
  const dv = m5.R * (stepRotation(0, m5.al, 1, 1e-4).w - stepRotation(0, m5.al, 0, 1e-4).w);
  return near(dv, m5.at, 1e-6) || 'at';
});
const m7 = { T: 60 };
m7.w = TAU / m7.T;
add('clock-mcq', mcq({
  stem: `The second hand of a big wall clock at Howrah station makes one complete turn in ${m7.T} s. Its angular velocity is`,
  right: `${f(m7.w, 3)} rad s⁻¹`,
  wrong: [`${f(TAU, 3)} rad s⁻¹`, `${f(1 / m7.T, 3)} rad s⁻¹`, `${f(TAU / 6, 3)} rad s⁻¹`],
  scheme: [[`ω = 2π / T = 2π / ${m7.T} = ${f(m7.w, 3)} rad s⁻¹ (@K)`, 1]],
  sol: `One turn is 2π rad and takes ${m7.T} s, so ω = 2π / ${m7.T} = ${f(m7.w, 4)} rad s⁻¹, about ${f(m7.w, 3)} rad s⁻¹.`,
  d: 2, c: 'application', t: [1],
}), () => near(rad(360 / m7.T), m7.w, 1e-12) || 'clock');
add('latitude-mcq', mcq({
  stem: 'Thiruvananthapuram lies close to the equator and Srinagar at a much higher latitude. Because of the rotation of the Earth about its axis',
  right: 'both cities have the same angular velocity, but Thiruvananthapuram has the greater linear speed',
  wrong: ['both cities have the same linear speed, because the Earth is a rigid body', 'Srinagar has the greater angular velocity, because it is nearer the pole', 'Srinagar has both the greater angular velocity and the greater linear speed'],
  sol: 'All points of the rigid Earth turn through the same angle each day, so ω is the same. The distance from the axis of rotation is greatest at the equator, and v = rω is proportional to it, so the city nearer the equator moves faster.',
  d: 2, c: 'understanding', t: [1],
}));

// ================================================================ t02 centripetal acceleration and force
add('adirection-mcq', mcq({
  stem: 'A stone tied to a thread is whirled in a horizontal circle at a constant speed. Its acceleration is',
  right: 'directed towards the centre of the circle, and constant in magnitude',
  wrong: ['zero, because the speed is constant', 'directed along the tangent, in the direction of motion', 'directed away from the centre of the circle'],
  sol: 'The speed is steady, but the velocity changes direction, so there is an acceleration. It points along the radius towards the centre, and its magnitude v²/r stays the same, while its direction keeps changing.',
  d: 1, c: 'recall', t: [2],
}));
const m10 = { k: 3 };
add('ac-double-mcq', mcq({
  stem: `A cyclist rounds a bend of fixed radius. If she goes ${m10.k} times as fast, the force towards the centre needed on her becomes`,
  right: `${m10.k * m10.k} times as large`,
  wrong: [`${m10.k} times as large`, `${f(Math.sqrt(m10.k), 3)} times as large`, `${f(1 / m10.k, 3)} times as large`],
  scheme: [[`F = mv²/r ∝ v², so ${m10.k}² = ${m10.k * m10.k} times as large (@K)`, 1]],
  sol: `At a fixed radius and mass, F = mv²/r is proportional to v². Tripling the speed multiplies the force by ${m10.k}² = ${m10.k * m10.k}.`,
  d: 2, c: 'application', t: [2],
}), () => {
  const F = (v) => (70 * v * v) / 25;
  return near(F(m10.k * 5) / F(5), 9, 1e-12) || 'acd';
});
const m11 = { ra: 0.1, rb: 0.3 };
m11.k = Math.round(m11.rb / m11.ra);
add('acomega-mcq', mcq({
  stem: `Two small beads A and B are on a horizontal spoke that turns at a steady angular velocity about a vertical axis, at distances ${m11.ra} m and ${m11.rb} m from the axis. Bead B, compared with bead A, has`,
  right: `${m11.k} times the speed and ${m11.k} times the centripetal acceleration`,
  wrong: [`${m11.k} times the speed and ${m11.k * m11.k} times the centripetal acceleration`, `the same speed and ${m11.k} times the centripetal acceleration`, `${m11.k} times the speed and one third of the centripetal acceleration`],
  sol: `The angular velocity ω is the same for both. v = rω is proportional to r, so B’s speed is ${m11.k} times A’s. At fixed ω, a = ω²r is also proportional to r, so B’s centripetal acceleration is ${m11.k} times A’s, not ${m11.k * m11.k} times.`,
  d: 3, c: 'analysis', t: [1, 2],
}), () => {
  const w = 2.1;
  return near((accFD(m11.rb, w) / accFD(m11.ra, w)), m11.rb / m11.ra, 1e-5) && near(speedFD(m11.rb, w) / speedFD(m11.ra, w), m11.rb / m11.ra, 1e-5) || 'acomega';
});
add('who-mcq', mcq({
  stem: 'A coin lies near the edge of a turntable at a village fair and turns with it, without slipping. The force that supplies the coin’s centripetal force is',
  right: 'the static friction of the turntable on the coin',
  wrong: ['the weight of the coin', 'the normal reaction of the turntable on the coin', 'a centrifugal force acting on the coin, pointing outwards'],
  sol: 'The weight and the normal reaction are vertical and balance each other. The only horizontal force on the coin is the friction of the turntable, and it points to the centre: it is the force that plays the role of the centripetal force. There is no outward force on the coin.',
  d: 2, c: 'understanding', t: [2],
}));
add('doublecount-mcq', mcq({
  stem: 'A student draws the free-body diagram of a stone whirled on a string over a smooth table. She shows two inward arrows on the stone: the tension T, and another arrow labelled “centripetal force mv²/r”. The best comment is that',
  right: 'the second arrow counts the same inward force twice: mv²/r only gives the size of the net inward force, which here is the tension alone',
  wrong: ['the diagram is correct, because both forces act on the stone', 'the second arrow should point outwards, away from the centre', 'the diagram is correct, but the tension should be drawn along the tangent'],
  sol: 'Centripetal force is the name of a direction, not an extra force. The only real horizontal force is the tension, and Newton’s second law says that this net inward force equals mv²/r. Drawing both double-counts it.',
  d: 3, c: 'evaluation', t: [2],
}));
add('stringbreak-mcq', mcq({
  stem: 'A stone whirled anticlockwise (seen from above) in a horizontal circle on a string is at the northmost point of its circle when the string snaps. The stone then moves',
  right: 'in a straight line along the tangent, towards the west',
  wrong: ['towards the centre of the circle, southwards', 'away from the centre, northwards', 'along a curved path, continuing the same circle'],
  sol: 'With the string gone there is no horizontal force, so the stone keeps the velocity it had: tangential to the circle. For anticlockwise motion the velocity at the northmost point is towards the west.',
  d: 2, c: 'understanding', t: [2],
}));
add('dv-mcq', mcq({
  stem: 'In the velocity triangle for uniform circular motion, the angle Δθ between the velocities at two nearby points is made smaller and smaller. The change in velocity Δv then',
  right: 'tends to point towards the centre of the circle',
  wrong: ['tends to point along the tangent, in the direction of the velocity', 'tends to point away from the centre of the circle', 'tends to become equal to v in size'],
  sol: 'The base angles of the isosceles triangle are 90° − Δθ/2, which approaches 90°. So Δv becomes perpendicular to v, that is along the radius, and its sense is towards the centre. Its size, about vΔθ, tends to zero.',
  d: 2, c: 'understanding', t: [2],
}));
const m16 = { m: 0.2, R: 0.5, v: 3.0 };
m16.T = (m16.m * m16.v * m16.v) / m16.R;
add('puck-mcq', mcq({
  stem: `A puck of mass ${m16.m} kg is whirled in a circle of radius ${m16.R} m at a steady ${f(m16.v, 2)} m s⁻¹ on a smooth horizontal table by a string fixed at the centre. The tension in the string is`,
  right: `${f(m16.T, 3)} N`,
  wrong: [`${f((m16.m * m16.v) / m16.R, 3)} N`, `${f(m16.m * m16.v * m16.v * m16.R, 3)} N`, `${f((m16.m * m16.v * m16.v) / (2 * m16.R), 3)} N`],
  scheme: [[`T = mv²/r = ${m16.m} × ${f(m16.v * m16.v, 3)} / ${m16.R} = ${f(m16.T, 3)} N (@K)`, 1]],
  sol: `The tension is the only horizontal force, so T = mv²/r = ${m16.m} × ${f(m16.v * m16.v, 3)} / ${m16.R} = ${f(m16.T, 3)} N.`,
  d: 2, c: 'application', t: [2],
}), () => {
  const w = m16.v / m16.R;
  return near(m16.m * w * w * m16.R, m16.T, 1e-12) && near(m16.m * accFD(m16.R, w), m16.T, 1e-5) || 'puck';
});
const m17 = { R: 0.25, T: 2.0 };
m17.a = (4 * Math.PI ** 2 * m17.R) / m17.T ** 2;
add('period-mcq', mcq({
  stem: `A bead on a rotating hoop of radius ${m17.R} m completes one turn every ${f(m17.T, 2)} s. Its centripetal acceleration is`,
  right: `${f(m17.a, 2)} m s⁻²`,
  wrong: [`${f((TAU / m17.T) * m17.R, 2)} m s⁻²`, `${f(4 * Math.PI ** 2 * m17.R, 2)} m s⁻²`, `${f(m17.R / (m17.T * m17.T), 2)} m s⁻²`],
  scheme: [[`a = 4π²r/T² = 4π² × ${m17.R} / ${f(m17.T * m17.T, 2)} = ${f(m17.a, 3)} m s⁻² (@K)`, 1]],
  sol: `ω = 2π / T = π rad s⁻¹, so a = ω²r = π² × ${m17.R} = ${f(m17.a, 3)} m s⁻². The wrong values come from using the speed ωr instead of the acceleration, from leaving out T², or from using r/T².`,
  d: 3, c: 'application', t: [2],
}), () => {
  const w = TAU / m17.T;
  return near(accFD(m17.R, w), m17.a, 1e-5) || 'period';
});

// ================================================================ t03 level road, banking, railway tracks
add('levelforce-mcq', mcq({
  stem: 'A scooter turns round a flat curve at a Kochi junction. The force that supplies its centripetal force is',
  right: 'the static friction between the tyres and the road',
  wrong: ['the weight of the scooter and rider', 'the normal reaction of the road', 'the driving force of the engine'],
  sol: 'On a level road the weight and the normal reaction are vertical. The engine force is along the motion. The only horizontal force pointing to the centre is the sideways friction of the road on the tyres.',
  d: 1, c: 'recall', t: [3],
}));
const m19 = { v: 15 };
add('vmaxmass-mcq', mcq({
  stem: `An empty lorry can take a level bend safely at a greatest speed of ${m19.v} m s⁻¹. After loading so that its mass is doubled, the greatest safe speed on the same bend (same tyres and road) is`,
  right: `still ${m19.v} m s⁻¹`,
  wrong: [`${2 * m19.v} m s⁻¹`, `${f(m19.v / Math.SQRT2, 3)} m s⁻¹`, `${m19.v / 2} m s⁻¹`],
  scheme: [[`v_max = √(μrg) does not contain the mass: still ${m19.v} m s⁻¹ (@K)`, 1]],
  sol: 'The friction needed, mv²/r, and the greatest friction available, μmg, are both proportional to the mass. The mass cancels in v_max = √(μrg), so doubling it changes nothing.',
  d: 2, c: 'understanding', t: [3],
}));
const m20 = { mu1: 0.64, mu2: 0.16, v1: 16 };
m20.v2 = m20.v1 * Math.sqrt(m20.mu2 / m20.mu1);
add('wet-mcq', mcq({
  stem: `On a dry road with μ = ${m20.mu1}, the greatest safe speed on a level curve is ${m20.v1} m s⁻¹. In heavy rain μ falls to ${m20.mu2}. The greatest safe speed on the same curve becomes`,
  right: `${f(m20.v2, 3)} m s⁻¹`,
  wrong: [`${f(m20.v1 * (m20.mu2 / m20.mu1), 3)} m s⁻¹`, `${f(m20.v1 * 0.8, 3)} m s⁻¹`, `${f(m20.v1 * 0.125, 3)} m s⁻¹`],
  scheme: [[`v ∝ √μ: ${m20.v1} × √(${m20.mu2}/${m20.mu1}) = ${f(m20.v2, 3)} m s⁻¹ (@K)`, 1]],
  sol: `Since v_max = √(μrg), v is proportional to √μ. μ falls to one quarter, so v falls to one half: ${m20.v1} × √(${m20.mu2}/${m20.mu1}) = ${f(m20.v2, 3)} m s⁻¹, not one quarter.`,
  d: 3, c: 'application', t: [3],
}), () => {
  const rr = (m20.v1 * m20.v1) / (m20.mu1 * g);
  return near(levelVmax(m20.mu2, rr), m20.v2, 1e-6) || 'wet';
});
add('bankwho-mcq', mcq({
  stem: 'A car goes round a banked bend at the design speed, so that no friction is needed. The centripetal force on it is supplied by',
  right: 'the horizontal component of the normal reaction of the road',
  wrong: ['the whole of the normal reaction of the road', 'the horizontal component of the weight of the car', 'the component of the weight along the road'],
  sol: 'The normal reaction is perpendicular to the road, so it is tilted towards the centre; its vertical component balances the weight and its horizontal component is the centripetal force. The weight is vertical, so it has no horizontal component.',
  d: 2, c: 'understanding', t: [3],
}));
const m23 = { R: 150, v: 21 };
m23.th = deg(Math.atan((m23.v * m23.v) / (m23.R * g)));
add('bankang-mcq', mcq({
  stem: `A bend of radius ${m23.R} m on a hill road is to be banked so that vehicles need no friction at ${m23.v} m s⁻¹. Taking g = 9.8 m s⁻², the angle of banking is about`,
  right: `${f(m23.th, 3)}°`,
  wrong: [`${f(deg(Math.atan(m23.v / (m23.R * g))), 2)}°`, `${f(deg(Math.atan((m23.v * m23.v) / (2 * m23.R * g))), 3)}°`, `${f(deg(Math.atan((2 * m23.v * m23.v) / (m23.R * g))), 3)}°`],
  scheme: [[`tan θ = v²/(rg) = ${m23.v * m23.v} / ${f(m23.R * g, 4)} = ${f(Math.tan(rad(m23.th)), 3)}, θ = ${f(m23.th, 3)}° (@K)`, 1]],
  sol: `tan θ = v²/(rg) = ${m23.v * m23.v} / (${m23.R} × 9.8) = ${f(Math.tan(rad(m23.th)), 3)}, so θ = ${f(m23.th, 3)}°.`,
  d: 2, c: 'application', t: [3],
}), () => near(bankAngle(m23.v, m23.R), m23.th, 1e-6) || 'bankang');
add('railouter-mcq', mcq({
  stem: 'On a curved stretch of railway line near Lonavala the outer rail is laid higher than the inner rail, mainly so that',
  right: 'the horizontal component of the normal reaction supplies the centripetal force, and the wheel flanges need not press sideways on the rails',
  wrong: ['the train gains speed on the curve', 'the wheels grip the rails with more friction', 'the weight of the train acts towards the centre of the curve'],
  sol: 'Raising the outer rail tilts the track towards the centre. At the design speed the horizontal part of the normal reaction supplies mv²/r, so the flanges do not rub against the rails.',
  d: 1, c: 'recall', t: [3],
}));

// ================================================================ t04 vertical circle
const m26 = { R: 2.5 };
m26.v = Math.sqrt(g * m26.R);
add('topmin-mcq', mcq({
  stem: `A stone on a string of length ${f(m26.R, 2)} m is whirled in a vertical circle. Taking g = 9.8 m s⁻², the least speed it can have at the top is`,
  right: `${f(m26.v, 3)} m s⁻¹`,
  wrong: [`${f(g * m26.R, 3)} m s⁻¹`, `${f(Math.sqrt(5 * g * m26.R), 3)} m s⁻¹`, `${f(Math.sqrt(2 * g * m26.R), 3)} m s⁻¹`],
  scheme: [[`v = √(gr) = √(9.8 × ${f(m26.R, 2)}) = ${f(m26.v, 3)} m s⁻¹ (@K)`, 1]],
  sol: `At the least speed the tension is zero and the weight alone supplies the centripetal force: mg = mv²/r, v = √(gr) = √(9.8 × ${f(m26.R, 2)}) = ${f(m26.v, 3)} m s⁻¹.`,
  d: 2, c: 'application', t: [4],
}), () => {
  // pendulum run: the speed at the top when the bottom speed is sqrt(5 g r)
  const run = circleRun(m26.R, Math.sqrt(5 * g * m26.R), Math.PI, 2e-5);
  return run !== null && near(run.v, m26.v, 2e-3) || 'topmin';
});
const m27 = { R: 0.4 };
m27.v = Math.sqrt(5 * g * m27.R);
add('bottom-min-mcq', mcq({
  stem: `A pebble on a string of length ${m27.R} m is to complete a vertical circle. Taking g = 9.8 m s⁻², the least speed it must have at the bottom is`,
  right: `${f(m27.v, 3)} m s⁻¹`,
  wrong: [`${f(Math.sqrt(g * m27.R), 3)} m s⁻¹`, `${f(5 * g * m27.R, 3)} m s⁻¹`, `${f(Math.sqrt(2 * g * m27.R), 3)} m s⁻¹`],
  scheme: [[`v = √(5gr) = √(5 × 9.8 × ${m27.R}) = ${f(m27.v, 3)} m s⁻¹ (@K)`, 1]],
  sol: `Least speed at the top √(gr); energy conservation over the fall of 2r gives v² = gr + 4gr = 5gr, so v = √(5 × 9.8 × ${m27.R}) = ${f(m27.v, 3)} m s⁻¹.`,
  d: 2, c: 'application', t: [4],
}), () => {
  // just above the least bottom speed the string stays taut all the way up; just below it goes slack
  const above = circleRun(m27.R, m27.v * 1.002, Math.PI, 2e-5);
  const below = circleRun(m27.R, m27.v * 0.99, Math.PI, 2e-5);
  return above !== null && below === null || 'botmin';
});
add('topT-mcq', mcq({
  stem: 'A ball is whirled on a string in a vertical circle with the least speed at the top that keeps the string just taut. At the top the tension in the string is',
  right: 'zero, and the weight alone supplies the centripetal force',
  wrong: ['equal to the weight of the ball', 'equal to mv²/r, the whole centripetal force', 'twice the weight of the ball'],
  sol: 'At the top T + mg = mv²/r. The least speed makes T = 0, so mg = mv²/r: the weight alone supplies the force.',
  d: 2, c: 'understanding', t: [4],
}));
add('bucket-mcq', mcq({
  stem: 'A bucket of water is whirled in a vertical circle at the end of a rope. The water does not fall out at the top of the circle provided that',
  right: 'the speed of the bucket at the top is at least √(gr)',
  wrong: ['the speed of the bucket at the top is less than √(gr)', 'the speed of the bucket at the bottom is exactly zero', 'the water weighs less than the bucket'],
  sol: 'At the top the water needs a downward force mv²/r. Its weight gives mg and the base of the bucket pushes down with N = mv²/r − mg. N cannot be negative, so mv²/r ≥ mg, that is v ≥ √(gr). Below that speed the water leaves the bucket.',
  d: 2, c: 'understanding', t: [4],
}));
const m30 = { m: 0.25 };
m30.d = 6 * m30.m * g;
add('tdiff-mcq', mcq({
  stem: `A stone of mass ${m30.m} kg on a string completes a vertical circle (g = 9.8 m s⁻²). The tension in the string at the lowest point exceeds the tension at the highest point by`,
  right: `${f(m30.d, 3)} N`,
  wrong: [`${f(m30.m * g, 3)} N`, `${f(2 * m30.m * g, 3)} N`, `${f(3 * m30.m * g, 3)} N`],
  scheme: [[`T_bottom − T_top = 6mg = 6 × ${m30.m} × 9.8 = ${f(m30.d, 3)} N (@K)`, 1]],
  sol: `Bottom: T − mg = mv₁²/r. Top: T′ + mg = mv₂²/r. Subtracting and using v₁² = v₂² + 4gr gives T − T′ = 2mg + 4mg = 6mg = ${f(m30.d, 3)} N, whatever the speed.`,
  d: 3, c: 'application', t: [4],
}), () => {
  // difference from the stepped motion for two different bottom speeds
  const R = 1.1;
  const diff = (v0) => {
    const top = circleRun(R, v0, Math.PI, 2e-5);
    const bot = circleRun(R, v0, 0, 2e-5);
    return m30.m * (bot.T - top.T);
  };
  return near(diff(7.5), m30.d, 2e-3) && near(diff(9.0), m30.d, 2e-3) || 'tdiff';
});

// ================================================================ assertion-reason (keys a, b, d, c, b, a)
add('acc-ar', ar({
  a: 'A body moving on a circle at constant speed has a non-zero acceleration.',
  r: 'The direction of the velocity of the body changes continuously.',
  key: 'a',
  sol: 'A is true. R is true and explains it: the velocity is a vector, so a change in its direction is a change in velocity, and the rate of this change is the acceleration v²/r towards the centre.',
  d: 2, c: 'understanding', t: [2],
}));
add('vmax-ar', ar({
  a: 'The greatest safe speed of a vehicle on a level curve does not depend on the mass of the vehicle.',
  r: 'On a level curve of larger radius the greatest safe speed is higher, for the same road surface.',
  key: 'b',
  sol: 'A is true: v_max = √(μrg) has no mass in it. R is also true, since v_max grows as √r, but it is about the radius and says nothing about the mass. The reason for A is that the friction needed, mv²/r, and the greatest friction available, μmg, are both proportional to the mass, so the mass cancels.',
  d: 3, c: 'analysis', t: [3],
}));
add('cf-ar', ar({
  a: 'When a stone is whirled on a string over a smooth table, a centripetal force acts on the stone in addition to the tension.',
  r: 'Centripetal force is the name for the net force directed towards the centre of the circle.',
  key: 'd',
  sol: 'A is false: the only real force along the radius is the tension; there is no extra force. R is true: the tension is the centripetal force, and its value is mv²/r.',
  d: 3, c: 'analysis', t: [2],
}));
add('top-ar', ar({
  a: 'A ball on a string can complete a vertical circle only if its speed at the top is at least √(gr).',
  r: 'At the top the string can push the ball towards the centre when the speed is small.',
  key: 'c',
  sol: 'A is true: below √(gr) the weight alone would be more than enough to supply mv²/r, and the string would have to push, which it cannot do. R is false, because a string can only pull; it goes slack instead.',
  d: 3, c: 'analysis', t: [4],
}));
add('omega-ar', ar({
  a: 'All points of a rotating rigid wheel have the same angular velocity.',
  r: 'The linear speed of a point of a rotating wheel is proportional to its distance from the axis.',
  key: 'b',
  sol: 'A is true, because the whole wheel turns through the same angle in the same time. R is also true (v = rω), but it follows from A rather than explaining it. It does not say why the angular velocity is common to all points.',
  d: 2, c: 'understanding', t: [1],
}));
add('bottom-ar', ar({
  a: 'The tension in the string is greatest at the lowest point of a vertical circle.',
  r: 'At the lowest point the tension must support the weight as well as supply the centripetal force, and the speed there is greatest.',
  key: 'a',
  sol: 'A is true, and R states the reason: T − mg = mv²/r, so T = mg + mv²/r, which is large because both the weight term and the mv²/r term (greatest speed) add up.',
  d: 3, c: 'analysis', t: [4],
}));

// ================================================================ true-false and fill-blank
add('bank-tf', tf({
  stem: 'On a curve of fixed radius, doubling the design speed makes the tangent of the angle of banking four times as large.',
  key: 't',
  sol: 'True. tan θ = v²/(rg), so at fixed r the tangent is proportional to v²; doubling v multiplies it by four.',
  d: 2, c: 'application', t: [3],
}));
add('work-tf', tf({
  stem: 'In uniform circular motion the centripetal force does work on the body, since it is the only force acting.',
  key: 'f',
  sol: 'False. The centripetal force is perpendicular to the velocity at every instant, so it does no work; it changes the direction of the velocity but not the speed.',
  d: 2, c: 'understanding', t: [2],
}));
add('unit-fill', fill({
  stem: 'The SI unit of angular velocity is ___.',
  acc: [['rad s⁻¹', 'rad/s', 'radian per second', 'rad s^-1', 'radians per second']],
  sol: 'Angular velocity is an angle divided by a time: **rad s⁻¹**.',
  d: 1, c: 'recall', t: [1],
}));
add('top-fill', fill({
  stem: 'The least speed of a body at the top of a vertical circle of radius r on a string is ___ (in terms of g and r).',
  acc: [['√(gr)', 'sqrt(gr)', 'root gr', '√gr', 'sqrt(g r)', 'square root of gr']],
  sol: 'With zero tension the weight alone supplies the centripetal force, mg = mv²/r, so the least speed is **√(gr)**.',
  d: 1, c: 'recall', t: [4],
}));

// ================================================================ numericals
const n1 = { r: 0.35, w: 48 };
n1.v = n1.r * n1.w;
add('vrw-num', num({
  stem: `The rotor of a small turbine has a radius of ${n1.r} m and turns at an angular velocity of ${n1.w} rad s⁻¹. Find the speed of a point on its rim, in m s⁻¹.`,
  value: R6(n1.v), tol: 0.05, unit: 'm s⁻¹',
  sol: r`$v = r\omega = ${n1.r} \times ${n1.w} = ${f(n1.v, 4)}$ m s$^{-1}$.`,
  scheme: [[`v = rω = ${n1.r} × ${n1.w} = ${f(n1.v, 4)} m s⁻¹`, 1]],
  d: 1, c: 'application', t: [1],
}), (q) => near(speedFD(n1.r, n1.w), q.answer.value, 1e-5) || 'vrw');
const n2 = { rpm: 480 };
n2.w = (n2.rpm * TAU) / 60;
add('disc-num', num({
  stem: `A music disc spins at ${n2.rpm} revolutions per minute. Find its angular velocity, in rad s⁻¹.`,
  value: R6(n2.w), tol: 0.2, unit: 'rad s⁻¹',
  sol: r`${n2.rpm} rev per minute is $${n2.rpm}/60 = ${n2.rpm / 60}$ rev per second; $\omega = 2\pi f = 2\pi \times ${n2.rpm / 60} = ${f(n2.w, 4)}$ rad s$^{-1}$.`,
  scheme: [[`ω = 2πf = 2π × ${n2.rpm / 60} = ${f(n2.w, 4)} rad s⁻¹`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => near(TAU / (60 / n2.rpm), q.answer.value, 1e-6) || 'disc');
const n3 = { al: 2.5, t: 8 };
n3.w = n3.al * n3.t;
n3.th = 0.5 * n3.al * n3.t * n3.t;
add('rot-num', num({
  stem: `A flywheel at a rice mill starts from rest and speeds up uniformly with an angular acceleration of ${n3.al} rad s⁻². Find the angle through which it turns in the first ${n3.t} s, in rad.`,
  value: R6(n3.th), tol: 0.5, unit: 'rad', marks: 2,
  sol: r`$\theta = \omega_0 t + \tfrac12\alpha t^2 = 0 + \tfrac12 \times ${n3.al} \times ${n3.t}^2 = ${f(n3.th, 4)}$ rad. The angular velocity is then $\omega = \alpha t = ${f(n3.w, 3)}$ rad s$^{-1}$.`,
  scheme: [['Uses θ = ω₀t + ½αt² with ω₀ = 0', 1], [`θ = ½ × ${n3.al} × ${n3.t}² = ${f(n3.th, 4)} rad`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => near(stepRotation(0, n3.al, n3.t).th, q.answer.value, 1e-4) || 'rot');
const n4 = { R: 0.3, al: 4.0, t: 2.5 };
n4.w = n4.al * n4.t;
n4.at = n4.R * n4.al;
n4.ac = n4.w * n4.w * n4.R;
n4.a = Math.hypot(n4.at, n4.ac);
add('total-num', num({
  stem: `A flywheel of radius ${n4.R} m starts from rest with a constant angular acceleration of ${f(n4.al, 2)} rad s⁻². At the instant t = ${n4.t} s find the magnitude of the total acceleration of a point on its rim, in m s⁻².`,
  value: R6(n4.a), tol: 0.2, unit: 'm s⁻²', marks: 3,
  sol: r`$\omega = \alpha t = ${f(n4.w, 3)}$ rad s$^{-1}$. $a_t = r\alpha = ${f(n4.at, 3)}$ m s$^{-2}$ and $a_c = \omega^2 r = ${f(n4.ac, 4)}$ m s$^{-2}$, at right angles, so $a = \sqrt{a_t^2 + a_c^2} = ${f(n4.a, 5)}$ m s$^{-2}$.`,
  scheme: [[`a_t = rα = ${f(n4.at, 3)} m s⁻²`, 1], [`ω = αt = ${f(n4.w, 3)} rad s⁻¹ and a_c = ω²r = ${f(n4.ac, 4)} m s⁻²`, 1], [`a = √(a_t² + a_c²) = ${f(n4.a, 5)} m s⁻²`, 1]],
  d: 3, c: 'application', t: [1, 2],
}), (q) => {
  const s = stepRotation(0, n4.al, n4.t);
  const ac = accFD(n4.R, s.w);
  return near(Math.hypot(n4.R * n4.al, ac), q.answer.value, 1e-4) || 'total';
});
const n5 = { v: 15, R: 50 };
n5.a = (n5.v * n5.v) / n5.R;
add('bike-num', num({
  stem: `A motorbike goes round a circular track of radius ${n5.R} m at a steady ${n5.v} m s⁻¹. Find its centripetal acceleration, in m s⁻².`,
  value: R6(n5.a), tol: 0.05, unit: 'm s⁻²',
  sol: r`$a = v^2/r = ${n5.v}^2/${n5.R} = ${f(n5.a, 3)}$ m s$^{-2}$, towards the centre.`,
  scheme: [[`a = v²/r = ${n5.v * n5.v} / ${n5.R} = ${f(n5.a, 3)} m s⁻²`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => near(accFD(n5.R, n5.v / n5.R), q.answer.value, 1e-5) || 'bike');
const n6 = { R: 4.22e7, T: 86400 };
n6.a = (4 * Math.PI ** 2 * n6.R) / n6.T ** 2;
add('geo-num', num({
  stem: `A communication satellite in a circular orbit of radius 4.22 × 10⁷ m goes once round in 24 h = 86 400 s. Find its centripetal acceleration, in m s⁻².`,
  value: R6(n6.a), tol: 0.003, unit: 'm s⁻²', marks: 2,
  sol: r`$\omega = 2\pi/T = ${sci(TAU / n6.T, 4)}$ rad s$^{-1}$, and $a = \omega^2 r = \dfrac{4\pi^2 r}{T^2} = ${f(n6.a, 3)}$ m s$^{-2}$.`,
  scheme: [[`ω = 2π/T = ${((TAU / n6.T) * 1e5).toPrecision(4)} × 10⁻⁵ rad s⁻¹`, 1], [`a = ω²r = ${f(n6.a, 3)} m s⁻²`, 1]],
  d: 3, c: 'application', t: [2],
}), (q) => near(accFD(n6.R, TAU / n6.T, 1000, 1), q.answer.value, 1e-3) || 'geo');
const n7 = { mu: 0.45, R: 48 };
n7.v = Math.sqrt(n7.mu * n7.R * g);
add('vmax-num', num({
  stem: `A level bend in a mountain road has a radius of ${n7.R} m. The coefficient of friction between the tyres and the road is ${n7.mu}. Taking g = 9.8 m s⁻², find the greatest speed at which a car can take the bend without skidding, in m s⁻¹.`,
  value: R6(n7.v), tol: 0.1, unit: 'm s⁻¹', marks: 2,
  sol: r`At the limit $mv^2/r = \mu mg$, so $v = \sqrt{\mu r g} = \sqrt{${n7.mu} \times ${n7.R} \times 9.8} = \sqrt{${f(n7.mu * n7.R * g, 5)}} = ${f(n7.v, 4)}$ m s$^{-1}$.`,
  scheme: [['Sets mv²/r = μmg (friction supplies the force)', 1], [`v = √(μrg) = ${f(n7.v, 4)} m s⁻¹`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => near(levelVmax(n7.mu, n7.R), q.answer.value, 1e-6) || 'vmax');
const n8 = { v: 18, R: 120 };
n8.th = deg(Math.atan((n8.v * n8.v) / (n8.R * g)));
add('bank-num', num({
  stem: `A circular flyover ramp of radius ${n8.R} m is to be banked so that a car moving at ${n8.v} m s⁻¹ (${f(n8.v * 3.6, 3)} km h⁻¹) needs no friction. Taking g = 9.8 m s⁻², find the angle of banking, in degrees.`,
  value: R6(n8.th), tol: 0.1, unit: '°', marks: 2,
  sol: r`$\tan\theta = \dfrac{v^2}{rg} = \dfrac{${n8.v}^2}{${n8.R} \times 9.8} = ${f(Math.tan(rad(n8.th)), 4)}$, so $\theta = ${f(n8.th, 4)}$ degrees.`,
  scheme: [[`tan θ = v²/(rg) = ${n8.v * n8.v} / ${f(n8.R * g, 4)} = ${f(Math.tan(rad(n8.th)), 4)}`, 1], [`θ = ${f(n8.th, 4)}°`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => near(bankAngle(n8.v, n8.R), q.answer.value, 1e-6) && near(bankSpeed(q.answer.value, n8.R), n8.v, 1e-6) || 'bank');
const n9 = { l: 1.676, v: 25, R: 800 };
n9.th = deg(Math.atan((n9.v * n9.v) / (n9.R * g)));
n9.h = n9.l * Math.sin(rad(n9.th));
add('rail-num', num({
  stem: `A curve of radius ${n9.R} m on a broad-gauge line, where the rails are ${n9.l} m apart, is banked for ${n9.v} m s⁻¹. Taking g = 9.8 m s⁻², find the height by which the outer rail is raised above the inner rail, in mm.`,
  value: R6(n9.h * 1000), tol: 2, unit: 'mm', marks: 3,
  sol: r`$\tan\theta = v^2/(rg) = ${n9.v}^2/(${n9.R} \times 9.8) = ${f(Math.tan(rad(n9.th)), 4)}$, so $\theta = ${f(n9.th, 4)}^\circ$. $h = l\sin\theta = ${n9.l} \times ${f(Math.sin(rad(n9.th)), 5)} = ${f(n9.h, 4)}$ m $= ${f(n9.h * 1000, 4)}$ mm.`,
  scheme: [[`tan θ = v²/(rg) = ${f(Math.tan(rad(n9.th)), 4)}`, 1], ['Uses sin θ = h/l', 1], [`h = l sin θ = ${f(n9.h * 1000, 4)} mm`, 1]],
  d: 3, c: 'application', t: [3],
}), (q) => {
  const th = bankAngle(n9.v, n9.R);
  return near(n9.l * Math.sin(rad(th)) * 1000, q.answer.value, 1e-6) || 'rail';
});
const n10 = { m: 0.4, R: 1.2, v: 7.0 };
n10.T = n10.m * ((n10.v * n10.v) / n10.R + g);
add('bottomT-num', num({
  stem: `A stone of mass ${n10.m} kg on a string of length ${n10.R} m is whirled in a vertical circle. At the lowest point its speed is ${f(n10.v, 2)} m s⁻¹. Taking g = 9.8 m s⁻², find the tension in the string at that point, in N.`,
  value: R6(n10.T), tol: 0.3, unit: 'N', marks: 2,
  sol: r`At the lowest point the tension points up (to the centre) and the weight down: $T - mg = mv^2/r$, so $T = m(v^2/r + g) = ${n10.m} \times (${f(n10.v * n10.v, 4)}/${n10.R} + 9.8) = ${f(n10.T, 4)}$ N.`,
  scheme: [['T − mg = mv²/r (tension up, weight down)', 1], [`T = ${n10.m} × (${f((n10.v * n10.v) / n10.R, 4)} + 9.8) = ${f(n10.T, 4)} N`, 1]],
  d: 3, c: 'application', t: [4],
}), (q) => {
  const run = circleRun(n10.R, n10.v, 0, 1e-4);
  return near(n10.m * run.T, q.answer.value, 1e-6) && near(n10.m * circleRun(n10.R, n10.v, 1e-3, 1e-6).T, q.answer.value, 1e-3) || 'bottomT';
});
const n11 = { m: 0.3, R: 1.5, v: 6.0 };
n11.vb2 = n11.v * n11.v + 4 * g * n11.R;
n11.vb = Math.sqrt(n11.vb2);
n11.T = n11.m * (n11.vb2 / n11.R + g);
add('energyT-num', num({
  stem: `A ball of mass ${n11.m} kg on a string of length ${n11.R} m moves in a vertical circle and passes the top with a speed of ${f(n11.v, 2)} m s⁻¹. Taking g = 9.8 m s⁻² and neglecting air resistance, find the tension in the string when the ball passes the lowest point, in N.`,
  value: R6(n11.T), tol: 0.3, unit: 'N', marks: 3,
  sol: r`From the top to the bottom the ball falls $2r = ${f(2 * n11.R, 3)}$ m: $v_b^2 = v_t^2 + 4gr = ${f(n11.v * n11.v, 3)} + 4 \times 9.8 \times ${n11.R} = ${f(n11.vb2, 4)}$ m$^2$ s$^{-2}$. At the bottom $T = m(v_b^2/r + g) = ${n11.m} \times (${f(n11.vb2 / n11.R, 4)} + 9.8) = ${f(n11.T, 4)}$ N.`,
  scheme: [[`Energy: v_b² = v_t² + 4gr = ${f(n11.vb2, 4)} m² s⁻²`, 1], ['Radial equation at the bottom: T − mg = mv_b²/r', 1], [`T = ${n11.m} × (${f(n11.vb2 / n11.R, 4)} + 9.8) = ${f(n11.T, 4)} N`, 1]],
  d: 4, c: 'application', t: [4],
}), (q) => {
  // integrate from the top (angle measured from the bottom, so start at pi) down to the bottom: use a start at the bottom with the computed speed and check the top speed
  const run = circleRun(n11.R, n11.vb, Math.PI, 2e-5);
  const bot = circleRun(n11.R, n11.vb, 0, 1e-4);
  return run !== null && near(run.v, n11.v, 2e-3) && near(n11.m * bot.T, q.answer.value, 1e-6) || 'energyT';
});
const n12 = { R: 3.6 };
n12.v = Math.sqrt(g * n12.R);
add('toplow-num', num({
  stem: `A boy swings a pail of water on a rope of length ${n12.R} m in a vertical circle. Taking g = 9.8 m s⁻², find the least speed of the pail at the top for the water not to spill, in m s⁻¹.`,
  value: R6(n12.v), tol: 0.05, unit: 'm s⁻¹',
  sol: r`At the least speed the weight of the water alone supplies the centripetal force: $mg = mv^2/r$, so $v = \sqrt{gr} = \sqrt{9.8 \times ${n12.R}} = ${f(n12.v, 4)}$ m s$^{-1}$.`,
  scheme: [[`v = √(gr) = √(9.8 × ${n12.R}) = ${f(n12.v, 4)} m s⁻¹`, 1]],
  d: 2, c: 'application', t: [4],
}), (q) => {
  const run = circleRun(n12.R, Math.sqrt(5 * g * n12.R), Math.PI, 2e-5);
  return run !== null && near(run.v, q.answer.value, 2e-3) || 'toplow';
});
const n13 = { R: 0.5, al: 2.0 };
n13.at = n13.R * n13.al;
n13.t = Math.sqrt(n13.at / (n13.al * n13.al * n13.R));
n13.w = n13.al * n13.t;
add('angle45-num', num({
  stem: `A flywheel of radius ${n13.R} m starts from rest with a constant angular acceleration of ${f(n13.al, 2)} rad s⁻². After what time does the total acceleration of a point on its rim make an angle of 45° with the radius? Give the time in seconds.`,
  value: R6(n13.t), tol: 0.01, unit: 's', marks: 3,
  sol: r`The total acceleration makes $45^\circ$ with the radius when its tangential and centripetal parts are equal, $a_c = a_t$. Here $a_t = r\alpha = ${f(n13.at, 3)}$ m s$^{-2}$ and $a_c = \omega^2 r = (\alpha t)^2 r$. So $(${f(n13.al, 2)}\,t)^2 \times ${n13.R} = ${f(n13.at, 3)}$, giving $t^2 = ${f(n13.t * n13.t, 4)}$ s$^2$ and $t = ${f(n13.t, 4)}$ s.`,
  scheme: [['tan of the angle with the radius = a_t / a_c = 1, so a_c = a_t', 1], [`a_t = rα = ${f(n13.at, 3)} m s⁻² and a_c = (αt)²r`, 1], [`t² = ${f(n13.t * n13.t, 4)} s², so t = ${f(n13.t, 4)} s`, 1]],
  d: 5, c: 'analysis', t: [1, 2],
}), (q) => {
  const gap = (t) => {
    const s = stepRotation(0, n13.al, t, 1e-4);
    return accFD(n13.R, s.w) - n13.R * n13.al;
  };
  return near(root(gap, 0.05, 3), q.answer.value, 1e-3) || 'angle45';
});
void root;
