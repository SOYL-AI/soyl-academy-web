// ISC 11 ch07 question bank, part 2: short answers of 2 marks (30–50 words) and 3 marks (50–80 words; derivations).
// Word counts exclude the maths, so each model answer carries its reasoning in words as well.
import { mk, add, r, dec, near } from '../../isc-11-physics-ch01/src/lib.mjs';
import { g, rad, deg, R6, TAU, accFD, speedFD, stepRotation, bankAngle, bankSpeed, levelVmax, circleRun } from './phys.mjs';

const { short } = mk;
const f = (x, n = 3) => dec(x, n);

// ================================================================ 2 marks
add('radian-short', short({
  marks: 2,
  stem: 'A bead slides along a circular wire. Explain what is meant by one radian, and find the angular displacement of the bead, in radians, when it travels one quarter of the circumference of the wire.',
  model: r`One radian is the angle subtended at the centre of a circle by an arc whose length equals the radius, so $\theta = s/r$. A quarter of the circumference is $s = 2\pi r/4 = \pi r/2$, so the angular displacement is $\theta = s/r = \pi/2 = ${f(Math.PI / 2, 4)}$ rad, which is $90^\circ$.`,
  sol: 'Definition of the radian, then s/r for a quarter turn.',
  scheme: [['One radian: angle at the centre for which the arc equals the radius (θ = s/r)', 1], [`Quarter circumference s = πr/2, so θ = π/2 = ${f(Math.PI / 2, 4)} rad`, 1]],
  d: 2, c: 'application', t: [1],
}), () => near((TAU * 1) / 4 / 1, Math.PI / 2, 1e-12) || 'radian');
add('vrder-short', short({
  marks: 2,
  stem: 'A particle moves on a circle of radius r and turns through a small angle Δθ in a short time Δt. Starting from the relation between arc length and angle, show that its speed is v = rω.',
  model: r`In the time $\Delta t$ the particle covers an arc of length $\Delta s = r\,\Delta\theta$, since the arc equals the radius times the angle in radians. Dividing by $\Delta t$ gives $\Delta s/\Delta t = r\,\Delta\theta/\Delta t$. The left side is the speed $v$ and $\Delta\theta/\Delta t$ is the angular velocity $\omega$, so $v = r\omega$, directed along the tangent.`,
  sol: 'Arc = rΔθ, divide by Δt.',
  scheme: [['Arc covered Δs = rΔθ', 1], ['Divides by Δt to get v = rω, along the tangent', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('atder-short', short({
  marks: 2,
  stem: 'A flywheel is speeding up. Starting from v = rω, show that the tangential acceleration of a point at distance r from the axis is a_t = rα, and say which of the two accelerations a_t and α is the same for all points of the flywheel.',
  model: r`The tangential acceleration is the rate of change of the speed. Since $v = r\omega$ and $r$ is fixed for a given point, $a_t = dv/dt = r\,d\omega/dt = r\alpha$. All points of the flywheel share the same angular acceleration $\alpha$, but $a_t$ grows in proportion to the distance from the axis.`,
  sol: 'Differentiate v = rω at fixed r.',
  scheme: [['a_t = dv/dt = r dω/dt = rα, using v = rω at fixed r', 1], ['α is common to all points; a_t is proportional to r', 1]],
  d: 3, c: 'understanding', t: [1],
}));
const s4 = { w: 0.8, ra: 0.5, rb: 1.5 };
s4.va = s4.w * s4.ra;
s4.vb = s4.w * s4.rb;
add('rigid-short', short({
  marks: 2,
  stem: `A circular stage at a school fair turns at a steady ${s4.w} rad s⁻¹. Find the speed of a child standing ${s4.ra} m from the centre and of another standing ${s4.rb} m from it, and explain why their speeds differ although they turn together.`,
  model: r`Every point of a rigid stage has the same angular velocity $\omega = ${s4.w}$ rad s$^{-1}$. The speeds follow from $v = r\omega$: $${f(s4.va, 3)}$ m s$^{-1}$ at ${s4.ra} m and $${f(s4.vb, 3)}$ m s$^{-1}$ at ${s4.rb} m. The farther child traces a bigger circle in the same time, so must move faster.`,
  sol: 'Same ω, v = rω.',
  scheme: [[`v = rω gives ${f(s4.va, 3)} m s⁻¹ and ${f(s4.vb, 3)} m s⁻¹`, 1], ['Same ω for all points of a rigid body; bigger circle, same time, greater speed', 1]],
  d: 2, c: 'application', t: [1],
}), () => near(speedFD(s4.ra, s4.w), s4.va, 1e-5) && near(speedFD(s4.rb, s4.w), s4.vb, 1e-5) || 'rigid');
const s5 = { kmh: 36, R: 25 };
s5.v = s5.kmh / 3.6;
s5.a = (s5.v * s5.v) / s5.R;
add('accel-short', short({
  marks: 2,
  stem: `A bus goes round a circular roundabout of radius ${s5.R} m at a steady ${s5.kmh} km h⁻¹. A passenger says that the bus has no acceleration, because the speedometer reading does not change. Explain why the passenger is wrong, and find the acceleration.`,
  model: r`Velocity is a vector. Although the speed is steady, the direction of the velocity changes continuously, so the velocity changes and the bus is accelerated. The speed is $${f(s5.v, 3)}$ m s$^{-1}$, so the acceleration is $a = v^2/r = ${f(s5.v * s5.v, 4)}/${s5.R} = ${f(s5.a, 3)}$ m s$^{-2}$, directed towards the centre of the roundabout.`,
  sol: 'Direction changes; a = v²/r with v in m/s.',
  scheme: [['Velocity changes in direction, so there is an acceleration even at constant speed', 1], [`v = ${f(s5.v, 3)} m s⁻¹, a = v²/r = ${f(s5.a, 3)} m s⁻² towards the centre`, 1]],
  d: 3, c: 'application', t: [2],
}), () => near(accFD(s5.R, s5.v / s5.R), s5.a, 1e-5) || 'accel');
add('who-short', short({
  marks: 2,
  stem: 'Name the real force that supplies the centripetal force in each case: (i) a stone whirled on a string, (ii) a coin carried round on a turntable, (iii) a satellite in a circular orbit around the Earth. Why is centripetal force not a separate force to be added to the free-body diagram?',
  model: r`(i) The tension of the string. (ii) The static friction of the turntable. (iii) The Earth’s gravity. Centripetal force only names the direction of the net real force towards the centre, of size $mv^2/r$. It is no new force, so drawing it separately would count the same force twice.`,
  sol: 'Tension, friction, gravity; a direction, not a force.',
  scheme: [['(i) tension, (ii) static friction, (iii) gravity', 1], ['Centripetal force is the name of the direction of the net real force (mv²/r); adding it separately double-counts', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('centrifugal-short', short({
  marks: 2,
  stem: 'A student says that a satellite stays in its circular orbit because the pull of gravity is balanced by an outward centrifugal force on the satellite. Point out the mistake in this statement, and say what actually happens.',
  model: r`No outward force acts on the satellite in the Earth’s frame. Gravity is the only force and it is unbalanced: it is the net inward force that gives the acceleration $v^2/r$. Were the forces balanced, the acceleration would be zero and the satellite would fly off along the tangent.`,
  sol: 'Gravity is the unbalanced inward force.',
  scheme: [['No outward force acts on the satellite; gravity is the only force and it is unbalanced', 1], ['It supplies mv²/r; if balanced the satellite would go off along the tangent', 1]],
  d: 3, c: 'evaluation', t: [2],
}));
add('skid-short', short({
  marks: 2,
  stem: 'Explain why a car that takes a level bend too fast skids outwards, and name the force that keeps a car on the curve at lower speeds.',
  model: r`Friction of the road on the tyres supplies the centripetal force $mv^2/r$, and its greatest value is $\mu mg$. When $mv^2/r$ exceeds $\mu mg$ at high speed, friction cannot supply the force, so the car continues along the tangent and appears to skid outwards.`,
  sol: 'Required force grows as v²; friction has a limit.',
  scheme: [['Friction between tyres and road supplies the centripetal force', 1], ['Needed mv²/r exceeds the greatest friction μmg at high speed, so the car continues along the tangent', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('whybank-short', short({
  marks: 2,
  stem: 'Give two reasons why a curve on a fast road is banked, rather than being left level and relying on friction.',
  model: r`Friction is limited and falls on a wet or oily road, so a level curve is unsafe. On a banked road the horizontal component of the normal reaction supplies the centripetal force at the design speed without friction, and the tyres wear far less.`,
  sol: 'Friction unreliable; N component does the work.',
  scheme: [['Friction is limited and unreliable (wet or oily road)', 1], ['Horizontal component of the normal reaction supplies the centripetal force; less tyre wear', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('railwhy-short', short({
  marks: 2,
  stem: 'Why is the outer rail raised on a curved railway track? State what happens at the wheels if a train runs round the curve much faster than the design speed.',
  model: r`Raising the outer rail tilts the track inwards, so at the design speed the horizontal component of the normal reaction supplies the centripetal force and the flanges bear no sideways thrust. A much faster train needs more inward force, so its outer flanges press hard on the outer rail.`,
  sol: 'Banking the track; flanges on the outer rail if too fast.',
  scheme: [['Banking: the horizontal component of the normal reaction supplies the centripetal force; no sideways thrust at the design speed', 1], ['Too fast: the flanges press on the outer rail, which supplies the extra inward force', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('topslack-short', short({
  marks: 2,
  stem: 'A ball on a string moves in a vertical circle. What happens when it reaches the top at a speed less than √(gr)? Explain using the force equation at the top.',
  model: r`At the top, $T + mg = mv^2/r$. Below $\sqrt{gr}$, $mv^2/r$ is less than $mg$, so $T$ would be negative. A string cannot push, so it goes slack and the weight pulls the ball inside the circular path; the ball leaves the circle.`,
  sol: 'T would be negative; the string cannot push.',
  scheme: [['T + mg = mv²/r gives a negative T for v < √(gr)', 1], ['A string cannot push: it goes slack and the ball leaves the circle', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('tbigger-short', short({
  marks: 2,
  stem: 'Explain why the tension in the string of a whirled stone is greater at the lowest point of a vertical circle than at the highest point.',
  model: r`At the lowest point the tension points to the centre and the weight points away, so $T - mg = mv^2/r$. At the highest point both point to the centre, so $T + mg = mv^2/r$. Also the stone moves fastest at the bottom, where $v$ is greatest, so $T$ is much greater there.`,
  sol: 'Weight subtracts at the top and adds at the bottom; speed is greater at the bottom.',
  scheme: [['Bottom: T − mg = mv²/r; top: T + mg = mv²/r', 1], ['The speed is greater at the bottom, which adds to the difference', 1]],
  d: 2, c: 'understanding', t: [4],
}));

// ================================================================ 3 marks
add('ac-der-short3', short({
  marks: 3,
  stem: 'A particle moves with a constant speed v on a circle of radius r. With the help of a velocity triangle, show that its acceleration is v²/r, directed towards the centre.',
  model: r`Take two nearby points of the circle where the velocities $\vec v_1$ and $\vec v_2$ differ in direction by a small angle $\Delta\theta$, the angle turned by the radius. Drawn from one point, they form an isosceles triangle with equal sides $v$, so $|\Delta v| \approx v\,\Delta\theta$. Then $a = |\Delta v|/\Delta t = v\,\Delta\theta/\Delta t = v\omega = v^2/r$. As $\Delta\theta \to 0$, $\Delta\vec v$ becomes perpendicular to $\vec v$, along the radius towards the centre.`,
  sol: 'Isosceles triangle, |Δv| = vΔθ, divide by Δt.',
  scheme: [['Velocity triangle: v₁, v₂ equal in size, the angle between them is Δθ', 1], ['|Δv| ≈ vΔθ, so a = vΔθ/Δt = vω = v²/r', 1], ['As Δθ → 0, Δv is perpendicular to v: towards the centre', 1]],
  d: 3, c: 'understanding', t: [2],
}));
const s2 = { w: 15, t: 6.0, R: 0.45 };
s2.al = s2.w / s2.t;
s2.th = 0.5 * s2.al * s2.t * s2.t;
s2.at = s2.R * s2.al;
add('fanrot-short3', short({
  marks: 3,
  stem: `A ceiling-fan blade starts from rest and, with a constant angular acceleration, reaches an angular velocity of ${s2.w} rad s⁻¹ in ${f(s2.t, 2)} s. Find the angular acceleration, the angle through which the blade turns in this time, and the tangential acceleration of the blade tip ${s2.R} m from the axis.`,
  model: r`The blade starts from rest, so its angular velocity grows as $\omega = \alpha t$ and the angular acceleration is $\alpha = ${s2.w}/${f(s2.t, 2)} = ${f(s2.al, 3)}$ rad s$^{-2}$. In the same time the blade turns through $\theta = \tfrac12\alpha t^2 = \tfrac12 \times ${f(s2.al, 3)} \times ${f(s2.t, 2)}^2 = ${f(s2.th, 3)}$ rad. A point at distance $r$ from the axis has tangential acceleration $a_t = r\alpha = ${s2.R} \times ${f(s2.al, 3)} = ${f(s2.at, 3)}$ m s$^{-2}$, directed along the tangent to the circle. It points the way the tip is moving, because the blade is speeding up.`,
  sol: 'ω = αt, θ = ½αt², a_t = rα.',
  scheme: [[`α = ω/t = ${f(s2.al, 3)} rad s⁻²`, 1], [`θ = ½αt² = ${f(s2.th, 3)} rad`, 1], [`a_t = rα = ${f(s2.at, 3)} m s⁻²`, 1]],
  d: 3, c: 'application', t: [1],
}), () => {
  const run = stepRotation(0, s2.al, s2.t);
  return near(run.w, s2.w, 1e-6) && near(run.th, s2.th, 1e-4) && near(s2.R * s2.al, s2.at, 1e-12) || 'fanrot';
});
add('level-der-short3', short({
  marks: 3,
  stem: 'A car of mass m takes a level circular bend of radius r. The coefficient of friction between the tyres and the road is μ. Derive an expression for the greatest speed with which the car can take the bend without skidding, and state whether it depends on the mass.',
  model: r`Vertically, the normal reaction balances the weight: $N = mg$. Horizontally, only friction acts and it supplies the centripetal force, $f = mv^2/r$. The friction cannot exceed its limiting value $\mu N = \mu mg$. At the greatest speed $mv^2/r = \mu mg$, so $v_{\max} = \sqrt{\mu r g}$. The mass cancels from both sides, so the greatest speed does not depend on it. A heavier car needs a larger force but has a larger friction too.`,
  sol: 'N = mg, then mv²/r = μmg.',
  scheme: [['N = mg; friction supplies the centripetal force', 1], ['At the limit mv²/r = μmg', 1], ['v_max = √(μrg), independent of the mass', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('bank-der-short3', short({
  marks: 3,
  stem: 'Draw the forces on a car moving at speed v on a road banked at an angle θ to the horizontal, on a bend of radius r, and derive the expression for the angle of banking for which no friction is needed.',
  model: r`Only two forces act: the weight $mg$ vertically down and the normal reaction $N$ perpendicular to the road, tilted by $\theta$ from the vertical towards the centre. Vertically $N\cos\theta = mg$. Horizontally the component $N\sin\theta$ supplies the centripetal force, $N\sin\theta = mv^2/r$. Dividing the second equation by the first, $\tan\theta = v^2/(rg)$, which does not contain the mass or the type of vehicle, and gives the angle for the chosen speed and radius.`,
  sol: 'Resolve N, divide.',
  scheme: [['Force diagram: mg down, N perpendicular to the road', 1], ['N cos θ = mg and N sin θ = mv²/r', 1], ['Dividing: tan θ = v²/(rg)', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('rail-der-short3', short({
  marks: 3,
  stem: 'On a curved railway track of radius r with rails a distance l apart (measured along the sleeper), the outer rail is raised by h so that a train at speed v exerts no sideways thrust on the rails. Show that h is nearly equal to lv²/(rg).',
  model: r`At the design speed only the weight and the normal reaction act, so $\tan\theta = v^2/(rg)$, where $\theta$ is the angle of banking of the track. From the geometry of the raised rail, $\sin\theta = h/l$. For the very small angles used on railways, $\sin\theta \approx \tan\theta$, so $h/l \approx v^2/(rg)$, giving $h \approx l v^2/(rg)$. A faster curve needs a larger rise.`,
  sol: 'tan θ = v²/(rg), sin θ = h/l, small angle.',
  scheme: [['tan θ = v²/(rg) from the force balance on the train', 1], ['sin θ = h/l from the geometry of the raised rail', 1], ['Small angle: sin θ ≈ tan θ, so h ≈ lv²/(rg)', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('top-der-short3', short({
  marks: 3,
  stem: 'A small ball of mass m moves in a vertical circle of radius r at the end of a light string. Obtain the least speed it must have at the top, and state the tension in the string at that speed.',
  model: r`At the top the tension $T$ and the weight $mg$ both point to the centre, so $T + mg = mv^2/r$. A string can only pull, so $T \ge 0$. The least speed corresponds to $T = 0$, when the weight alone supplies the centripetal force: $mg = mv^2/r$, so $v_{\min} = \sqrt{gr}$. At this speed the tension in the string is zero, and at any smaller speed the string goes slack.`,
  sol: 'T + mg = mv²/r with T ≥ 0.',
  scheme: [['T + mg = mv²/r at the top (both towards the centre)', 1], ['T cannot be negative, so the least speed has T = 0', 1], ['v_min = √(gr), tension zero', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('bot-der-short3', short({
  marks: 3,
  stem: 'A ball on a string just completes a vertical circle of radius r, with the least speed at the top. Using conservation of mechanical energy, show that its speed at the lowest point is √(5gr).',
  model: r`At the top the least speed is $v_t = \sqrt{gr}$. From the top to the lowest point the ball falls through a height $2r$. Gravity alone does work, since the tension is always perpendicular to the motion, so $\tfrac12 mv_b^2 = \tfrac12 mv_t^2 + mg(2r)$. Cancelling $\tfrac12 m$ gives $v_b^2 = gr + 4gr = 5gr$, and so $v_b = \sqrt{5gr}$ at the lowest point. This is the least speed needed there for the string to stay taut throughout.`,
  sol: 'Energy over a fall of 2r.',
  scheme: [['Least speed at the top v = √(gr)', 1], ['Energy conservation over a fall of 2r: ½mv_b² = ½mv_t² + 2mgr', 1], ['v_b² = 5gr, so v_b = √(5gr)', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('tdiff-der-short3', short({
  marks: 3,
  stem: 'A ball of mass m on a string completes a vertical circle of radius r. Show that the tension at the lowest point exceeds the tension at the highest point by 6mg, whatever the speed.',
  model: r`At the lowest point the tension points to the centre and the weight away from it, so $T_b - mg = mv_b^2/r$. At the highest point both point to the centre, so $T_t + mg = mv_t^2/r$. Energy conservation over the fall of $2r$ gives $v_b^2 = v_t^2 + 4gr$. Subtracting the radial equations, $T_b - T_t = 2mg + m(v_b^2 - v_t^2)/r = 2mg + 4mg = 6mg$. The speed has cancelled, so this holds at any speed.`,
  sol: 'Subtract the radial equations; use v_b² − v_t² = 4gr.',
  scheme: [['Radial equations at the bottom and at the top', 1], ['v_b² − v_t² = 4gr from energy conservation', 1], ['T_b − T_t = 2mg + 4mg = 6mg', 1]],
  d: 4, c: 'analysis', t: [4],
}));
const s9 = { m: 4.0, R: 1.2, f: 3.0 };
s9.w = TAU * s9.f;
s9.v = s9.w * s9.R;
s9.a = s9.w * s9.w * s9.R;
s9.T = s9.m * s9.a;
add('hammer-short3', short({
  marks: 3,
  stem: `At a sports meet in Patiala, an athlete whirls a ${f(s9.m, 2)} kg ball on a light wire of length ${s9.R} m in a horizontal circle at ${f(s9.f, 2)} revolutions per second. Treating the wire as horizontal, find the speed of the ball, its centripetal acceleration and the tension in the wire.`,
  model: r`The angular velocity of the ball is $\omega = 2\pi f = ${f(s9.w, 4)}$ rad s$^{-1}$. Its speed is $v = r\omega = ${s9.R} \times ${f(s9.w, 4)} = ${f(s9.v, 3)}$ m s$^{-1}$ and its centripetal acceleration is $a = \omega^2 r = ${f(s9.a, 4)}$ m s$^{-2}$, directed towards the centre of the circle. The tension in the wire is the real force that supplies the centripetal force, so $T = ma = ${f(s9.m, 2)} \times ${f(s9.a, 4)} = ${f(s9.T, 4)}$ N. Gravity acts at right angles to this force, so it does not change the result.`,
  sol: 'ω = 2πf, v = rω, a = ω²r, T = ma.',
  scheme: [[`ω = 2πf = ${f(s9.w, 4)} rad s⁻¹ and v = rω = ${f(s9.v, 3)} m s⁻¹`, 1], [`a = ω²r = ${f(s9.a, 4)} m s⁻²`, 1], [`T = ma = ${f(s9.T, 4)} N`, 1]],
  d: 3, c: 'application', t: [1, 2],
}), () => {
  const w = s9.f * TAU;
  return near(speedFD(s9.R, w), s9.v, 1e-5) && near(accFD(s9.R, w), s9.a, 1e-5) && near(s9.m * accFD(s9.R, w), s9.T, 1e-5) || 'hammer';
});
const s10 = { R: 80, muA: 0.6, muB: 0.4 };
s10.vA = Math.sqrt(s10.muA * s10.R * g);
s10.vB = Math.sqrt(s10.muB * s10.R * g);
add('twocars-short3', short({
  marks: 3,
  stem: `A level bend on a ghat road has a radius of ${s10.R} m. Car A has good tyres with μ = ${s10.muA} and car B has worn tyres with μ = ${s10.muB}. Taking g = 9.8 m s⁻², find the greatest safe speed of each car in km h⁻¹ and say which is safer on the bend.`,
  model: r`Friction supplies the centripetal force, so the greatest speed is $v_{\max} = \sqrt{\mu r g}$, which does not depend on the mass. For car A, $v = \sqrt{${s10.muA} \times ${s10.R} \times 9.8} = ${f(s10.vA, 4)}$ m s$^{-1}$ $= ${f(s10.vA * 3.6, 3)}$ km h$^{-1}$. For car B, $v = ${f(s10.vB, 4)}$ m s$^{-1}$ $= ${f(s10.vB * 3.6, 3)}$ km h$^{-1}$. Car A, with the larger coefficient of friction, can take the bend faster and is therefore safer.`,
  sol: 'v_max = √(μrg) for each; convert with 3.6.',
  scheme: [['v_max = √(μrg)', 1], [`A: ${f(s10.vA * 3.6, 3)} km h⁻¹ and B: ${f(s10.vB * 3.6, 3)} km h⁻¹`, 1], ['A, with the greater μ, has the higher limit and is safer', 1]],
  d: 3, c: 'application', t: [3],
}), () => near(levelVmax(s10.muA, s10.R), s10.vA, 1e-6) && near(levelVmax(s10.muB, s10.R), s10.vB, 1e-6) || 'twocars');
const s11 = { R: 90, th: 12 };
s11.v = Math.sqrt(s11.R * g * Math.tan(rad(s11.th)));
add('bankdesign-short3', short({
  marks: 3,
  stem: `A bend of radius ${s11.R} m on a hill road is banked at ${s11.th}° to the horizontal. Taking g = 9.8 m s⁻², find the speed for which no friction is needed, in m s⁻¹ and in km h⁻¹, and say whether a loaded truck would need a different speed.`,
  model: r`For banking without friction, $\tan\theta = v^2/(rg)$, so the design speed is $v = \sqrt{rg\tan\theta} = \sqrt{${s11.R} \times 9.8 \times \tan ${s11.th}^\circ} = ${f(s11.v, 4)}$ m s$^{-1}$, which is $${f(s11.v * 3.6, 3)}$ km h$^{-1}$. The mass does not appear in this relation, so a loaded truck would have exactly the same design speed as a light car, and at that speed no friction is needed, so a wet surface does not matter either.`,
  sol: 'v = √(rg tan θ).',
  scheme: [['tan θ = v²/(rg), so v = √(rg tan θ)', 1], [`v = ${f(s11.v, 4)} m s⁻¹ = ${f(s11.v * 3.6, 3)} km h⁻¹`, 1], ['Mass does not appear: same speed for a loaded truck', 1]],
  d: 3, c: 'application', t: [3],
}), () => near(bankSpeed(s11.th, s11.R), s11.v, 1e-6) && near(bankAngle(s11.v, s11.R), s11.th, 1e-6) || 'bankdesign');
const s12 = { m: 0.5, R: 1.0, v0: 6.0 };
s12.need = Math.sqrt(5 * g * s12.R);
s12.vt2 = s12.v0 * s12.v0 - 4 * g * s12.R;
s12.cen2 = 2 * g * s12.R;
add('notcomplete-short3', short({
  marks: 3,
  stem: `A ball of mass ${f(s12.m, 2)} kg on a light string of length ${f(s12.R, 2)} m is given a speed of ${f(s12.v0, 2)} m s⁻¹ at the lowest point of a vertical circle. Taking g = 9.8 m s⁻², show that it cannot complete the circle, and say what happens to the string.`,
  model: r`To complete the circle with the string taut, the speed at the lowest point must be at least $\sqrt{5gr} = \sqrt{5 \times 9.8 \times ${f(s12.R, 2)}} = ${f(s12.need, 3)}$ m s$^{-1}$, which is more than the speed given. Energy conservation says the same: it would leave $v_{\text{top}}^2 = ${f(s12.v0 * s12.v0, 3)} - 4 \times 9.8 \times ${f(s12.R, 2)} = -${f(-s12.vt2, 3)}$ m$^2$ s$^{-2}$ at the top, which is negative, so the top is never reached. The ball does rise above the level of the centre, and at some point on the upper half the tension falls to zero, so the string goes slack and the ball leaves the circle.`,
  sol: 'Compare with √(5gr); energy gives a negative v² at the top; slack string above the centre level.',
  scheme: [[`Needs v ≥ √(5gr) = ${f(s12.need, 3)} m s⁻¹ at the lowest point, but only ${f(s12.v0, 2)} m s⁻¹ is given`, 1], [`Energy: v_top² = v² − 4gr = −${f(-s12.vt2, 3)} m² s⁻² < 0, so the top is never reached`, 1], ['The tension falls to zero above the level of the centre: the string goes slack and the ball leaves the circle as a projectile', 1]],
  d: 5, c: 'evaluation', t: [4],
}), () => {
  const reachesCentreLevel = circleRun(s12.R, s12.v0, Math.PI / 2, 2e-5) !== null;
  const reachesTop = circleRun(s12.R, s12.v0, Math.PI, 2e-5) !== null;
  const justEnough = circleRun(s12.R, s12.need * 1.0005, Math.PI, 2e-5) !== null;
  return reachesCentreLevel && !reachesTop && justEnough && s12.vt2 < 0 && s12.v0 * s12.v0 > s12.cen2 || 'notcomplete';
});
void deg;
void R6;
