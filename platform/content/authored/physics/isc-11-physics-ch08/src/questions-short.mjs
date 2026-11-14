// ISC 11 ch08 question bank, part 2: short answers of 2 marks (30–50 words) and 3 marks (50–80 words; derivations and numericals).
// Word counts exclude the maths, so each model answer carries its reasoning in words as well.
import { mk, add, r, dec, sci, near } from '../../isc-11-physics-ch01/src/lib.mjs';
import { g, c, rad, trapz, piecewise, stopDist, pendulumSpeed, fallSpeed } from './phys.mjs';
import { sciT } from './decks.mjs';

const { short } = mk;
const f = (x, n = 3) => dec(x, n);

// ================================================================ 2 marks
add('work-short', short({
  marks: 2,
  stem: 'A weightlifter holds a barbell steady above his head for ten seconds and then walks 5 m along a level floor carrying it at the same height. Using W = FS cos θ, explain whether he does work on the barbell in each part of this activity.',
  model: 'While he holds it steady there is no displacement, so S = 0 and W = 0. While he walks, the supporting force is vertical and the displacement horizontal, so θ = 90°, cos θ = 0 and W = 0 again. He does no work on the barbell in either part.',
  sol: 'No displacement, then force perpendicular to displacement.',
  scheme: [['Holding steady: S = 0, so W = 0', 1], ['Walking: θ = 90°, cos θ = 0, so W = 0', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('neg-short', short({
  marks: 2,
  stem: 'A cricketer throws a ball vertically upward and catches it at the same height. State the sign of the work done by gravity (i) while the ball rises and (ii) while it falls, and the total work done by gravity over the whole flight, giving reasons.',
  model: 'While the ball rises, its weight acts downward but the displacement is upward, so θ = 180° and gravity does negative work. While it falls, the weight and the displacement are both downward, so θ = 0° and the work is positive. The two amounts are equal in size, so the total work by gravity over the flight is zero.',
  sol: 'Opposite directions give negative work; same direction, positive.',
  scheme: [['Rising: negative (θ = 180°); falling: positive (θ = 0°)', 1], ['Equal magnitudes, so total work is zero', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('area-short', short({
  marks: 2,
  stem: 'The force on a body changes as it moves along a straight line. Explain why the work done by this force is given by the area under its force–displacement graph.',
  model: 'Divide the displacement into very thin strips. In one strip the force is almost constant, so the work is the force times the strip width, which is the area of the strip. Adding all the strips gives the total area under the graph, which becomes the integral of F dS as the strips narrow.',
  sol: 'Work in a thin strip is F ΔS, the strip area; sum the strips.',
  scheme: [['In a thin strip F is nearly constant: work = F ΔS = area of the strip', 1], ['Summing the strips gives the total area, W = ∫F dS', 1]],
  d: 3, c: 'understanding', t: [1],
}));
add('wet2-short', short({
  marks: 2,
  stem: 'State the work–energy theorem. Use it to explain why a car moving at twice the speed needs four times the stopping distance when the same constant braking force is applied.',
  model: 'The net work done on a body equals the change in its kinetic energy. The brakes do work $-Fs$ and the final kinetic energy is zero, so $Fs$ equals the initial kinetic energy $\\tfrac12 mv^2$. Doubling v makes the kinetic energy four times larger, so with the same F the distance s is four times larger.',
  sol: 'Fs = ½mv², so s is proportional to v².',
  scheme: [['Net work = change in kinetic energy', 1], ['Fs = ½mv², so s ∝ v²: doubling v gives four times the distance', 1]],
  d: 3, c: 'understanding', t: [2],
}));
add('kep-short', short({
  marks: 2,
  stem: r`A body of mass $m$ has momentum $p$. Show that its kinetic energy is $p^2/2m$, and say which of two bodies with the same momentum has the larger kinetic energy.`,
  model: r`The momentum is $p = mv$, so the speed is $v = p/m$. Substituting in the kinetic energy gives $K = \tfrac12 m\left(\dfrac{p}{m}\right)^2 = \dfrac{p^2}{2m}$. For a given momentum the kinetic energy is inversely proportional to the mass, so the body of smaller mass has the larger kinetic energy.`,
  sol: 'Eliminate v with v = p/m.',
  scheme: [['v = p/m substituted: K = p²/2m', 1], ['Equal p: smaller mass has the larger K', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('cons-short', short({
  marks: 2,
  stem: 'A certain force does the same amount of work on a body moving between two points, whichever path the body takes. What name is given to such a force, what is the work it does round a closed path, and which of gravity and friction is an example?',
  model: 'Such a force is called a conservative force. Because the work between two points is independent of the path, the work done by it round any closed path is zero. Gravity is an example. Friction is not: its work depends on the path, so it is a non-conservative force.',
  sol: 'Path independence gives zero on a closed path.',
  scheme: [['Conservative force; zero work round a closed path', 1], ['Gravity is conservative; friction is not (path-dependent work)', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('nopot-short', short({
  marks: 2,
  stem: 'Explain why no potential energy can be associated with the kinetic friction acting on a block that slides on a rough table.',
  model: 'A potential energy exists only for a force whose work depends on the end points alone. The work of kinetic friction depends on the path: it is negative on every part of the path, grows with the path length and is not zero round a closed path. So no function of position can represent it, and no potential energy exists.',
  sol: 'Work of friction depends on the path; it is not zero on a loop.',
  scheme: [['Potential energy needs path-independent work', 1], ['Friction’s work depends on the path and is not zero round a closed path', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('hooke-short', short({
  marks: 2,
  stem: 'A spring is stretched by hanging loads on it. State Hooke’s law, describe the graph of the magnitude of the restoring force against the extension, and say what its slope gives.',
  model: 'Within the elastic limit the restoring force of the spring is proportional to the extension and opposite to it, F = −kx. The graph of force against extension is a straight line through the origin. Its slope is the force constant k of the spring, in newton per metre, which measures how stiff the spring is.',
  sol: 'F = −kx; straight line; slope k.',
  scheme: [['F = −kx: force proportional to extension, opposing it; straight line through the origin', 1], ['Slope = force constant k, in N m⁻¹', 1]],
  d: 2, c: 'recall', t: [3],
}));
add('conserve-short', short({
  marks: 2,
  stem: 'State the law of conservation of mechanical energy and the condition under which it holds. Explain why it does not hold for a cyclist who brakes to rest on a level road.',
  model: 'When only conservative forces do work, the sum of the kinetic and potential energies of a body stays constant. For the cyclist the brakes exert friction, which is non-conservative. The kinetic energy is changed into heat at the brake blocks instead of into potential energy, so the mechanical energy decreases.',
  sol: 'Conservative forces only; friction turns K into heat.',
  scheme: [['K + U constant when only conservative forces do work', 1], ['Friction at the brakes changes K into heat, so mechanical energy is not conserved', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('ugraph-short', short({
  marks: 2,
  stem: 'Describe how the potential, kinetic and total energies of a block oscillating on a spring vary with its displacement from equilibrium, and state where the kinetic and potential energies are equal.',
  model: r`The potential energy is an upward parabola, zero at the centre and equal to the total energy $E$ at the two extremes. The kinetic energy is an inverted parabola, $E$ at the centre and zero at the extremes. The total energy is a horizontal line. They are equal where each is $E/2$, at $x = \pm A/\sqrt{2}$.`,
  sol: 'Parabola, inverted parabola, horizontal line; crossing at E/2.',
  scheme: [['U upward parabola, K inverted parabola, E horizontal line', 1], ['U = K = E/2 at x = ±A/√2', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('emc-short', short({
  marks: 2,
  stem: 'State the mass–energy relation. Explain why the change of mass in a chemical reaction goes unnoticed, while in a nuclear reaction it is important.',
  model: 'A mass $m$ is equivalent to an energy $E = mc^2$, where $c$ is the speed of light. As $c^2$ is very large, a tiny mass defect gives a large energy. A chemical reaction releases little energy, so its mass change is far too small to detect, but a nuclear reaction releases millions of times more.',
  sol: 'E = mc², with c² very large.',
  scheme: [['E = mc²; c is the speed of light', 1], ['Chemical energy changes are tiny, so the mass change is negligible; nuclear changes are millions of times larger', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('hill-short', short({
  marks: 2,
  stem: 'The engine of a lorry delivers constant power. Using P = Fv, explain why the lorry climbs a steep hill much more slowly than it travels on level ground.',
  model: 'At constant power P = Fv, so the speed is inversely proportional to the driving force. On a hill the force must also balance a component of the weight down the slope, so a larger force is needed. With P fixed, v = P/F must then be smaller, which is why the driver changes to a lower gear.',
  sol: 'Constant P, larger F needed uphill, so smaller v.',
  scheme: [['v = P/F: at constant power a larger force means a smaller speed', 1], ['Uphill the driving force must also balance a component of the weight, so F is larger', 1]],
  d: 3, c: 'analysis', t: [5],
}));
add('kwh-short', short({
  marks: 2,
  stem: 'Distinguish between a kilowatt and a kilowatt hour, and express one kilowatt hour in joules.',
  model: r`A kilowatt is a unit of power, the rate of doing work, equal to $1000$ joules per second. A kilowatt hour is a unit of energy: the work done at the rate of one kilowatt for one hour. It equals $1000 \times 3600 = 3.6 \times 10^{6}$ joules.`,
  sol: 'Power against energy; 1 kW h = 1000 W × 3600 s.',
  scheme: [['Kilowatt: unit of power; kilowatt hour: unit of energy', 1], ['1 kW h = 1000 × 3600 = 3.6 × 10⁶ J', 1]],
  d: 2, c: 'recall', t: [5],
}));

// ================================================================ 3 marks
add('wetder-short3', short({
  marks: 3,
  stem: 'Derive the work–energy theorem for a body acted on by a constant net force along a straight line.',
  model: r`Let a constant net force $F$ act on a body of mass $m$ along a straight line and change its speed from $u$ to $v$ over a displacement $S$. By Newton's second law the acceleration is $a = F/m$, and the equation of motion gives $v^2 - u^2 = 2aS$. The work done is $W = FS = maS = \tfrac12 m(v^2 - u^2) = \tfrac12 mv^2 - \tfrac12 mu^2$. Hence the net work done on the body equals the change in its kinetic energy.`,
  sol: 'F = ma with v² − u² = 2aS.',
  scheme: [['F = ma and v² − u² = 2aS', 1], ['W = FS = maS = ½m(v² − u²)', 1], ['W = K(final) − K(initial): net work = change in kinetic energy', 1]],
  d: 3, c: 'understanding', t: [2],
}));
add('spder-short3', short({
  marks: 3,
  stem: 'A spring of force constant k is stretched slowly from its natural length to an extension x. By integration, derive the energy stored in the spring.',
  model: r`The spring force opposes the stretch, so the outside agent must apply a force $kx'$ when the extension is $x'$. This force varies, so the work in a small step $dx'$ is $kx'\,dx'$. Adding the steps from $0$ to $x$ gives $W = \int_0^x kx'\,dx' = \tfrac12 kx^2$. This work is stored as elastic potential energy, so $U = \tfrac12 kx^2$.`,
  sol: 'Integrate the applied force kx′ over the extension.',
  scheme: [['Applied force kx′ varies with extension; dW = kx′ dx′', 1], ['W = ∫ from 0 to x of kx′ dx′ = ½kx²', 1], ['Stored as elastic potential energy, U = ½kx²', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('fallder-short3', short({
  marks: 3,
  stem: 'A stone of mass m is dropped from rest at a height h above the ground. Using the conservation of mechanical energy, derive the speed with which it reaches the ground, and state how this speed depends on the mass.',
  model: r`Take the ground as the zero of potential energy. At the top the stone is at rest, so its mechanical energy is $mgh$. Just before it lands its potential energy is zero and its kinetic energy is $\tfrac12 mv^2$. Only gravity does work, so $mgh = \tfrac12 mv^2$, which gives $v = \sqrt{2gh}$. The mass cancels, so light and heavy stones reach the ground with the same speed when air resistance is neglected.`,
  sol: 'Equate mgh at the top with ½mv² at the ground.',
  scheme: [['Energy at the top mgh; at the ground ½mv²', 1], ['mgh = ½mv², so v = √(2gh)', 1], ['Mass cancels: the speed does not depend on it', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('oscder-short3', short({
  marks: 3,
  stem: r`A block of mass $m$ rests on a smooth horizontal surface, joined to a spring of force constant $k$. It is pulled out to a displacement $A$ and released from rest. Using the work done by the spring force and the work–energy theorem, show that the potential and kinetic energies add to the same total at every displacement $x$.`,
  model: r`As the block moves in from $A$ to $x$, the spring force $-kx'$ points along its motion, so the spring does positive work $W = \int_A^x (-kx')\,dx' = \tfrac12 k(A^2 - x^2)$, which is the area under the force graph between $x$ and $A$. The block started from rest, so by the work–energy theorem this work equals its kinetic energy: $\tfrac12 mv^2 = \tfrac12 k(A^2 - x^2)$. Rearranging gives $\tfrac12 kx^2 + \tfrac12 mv^2 = \tfrac12 kA^2$. The right side does not depend on $x$, so $U + K = \tfrac12 kA^2$ at every displacement.`,
  sol: 'Spring work from A to x, then the work–energy theorem from rest.',
  scheme: [['Work by the spring from A to x: ∫(−kx′)dx′ = ½k(A² − x²)', 1], ['Work–energy theorem from rest: ½mv² = ½k(A² − x²)', 1], ['½kx² + ½mv² = ½kA², the same at every x', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('pfvder-short3', short({
  marks: 3,
  stem: 'A constant force F acts on a body along its direction of motion with velocity v. Derive an expression for the power delivered by the force, and state the result when the force makes an angle θ with the velocity.',
  model: r`In a small time $dt$ the body moves a small distance $dS$ along the force, so the work done is $dW = F\,dS$. Power is the rate of doing work, so $P = \dfrac{dW}{dt} = F\dfrac{dS}{dt}$. The rate of change of displacement is the velocity, so $P = Fv$. If the force makes an angle $\theta$ with the velocity, only its component along $v$ counts, so $P = Fv\cos\theta = \vec F\cdot\vec v$.`,
  sol: 'Divide dW = F dS by dt.',
  scheme: [['dW = F dS in a small time dt', 1], ['P = dW/dt = F dS/dt = Fv', 1], ['At angle θ: P = Fv cos θ = F·v', 1]],
  d: 2, c: 'understanding', t: [5],
}));

const gk = { m: 2.5, F0: 12, S: 6 };
gk.W = 0.5 * gk.F0 * gk.S;
gk.v = Math.sqrt((2 * gk.W) / gk.m);
add('graphke-short3', short({
  marks: 3,
  stem: `A ${gk.m} kg trolley starts from rest on a smooth horizontal track. The force on it, along the track, falls uniformly from ${gk.F0} N at the start to zero after a displacement of ${gk.S} m. Find the work done by the force and the speed of the trolley at ${gk.S} m.`,
  model: r`The work is the area under the force–displacement graph, a triangle of base $${gk.S}$ m and height $${gk.F0}$ N, so $W = \tfrac12 \times ${gk.S} \times ${gk.F0} = ${f(gk.W, 3)}$ J. The track is smooth, so this is the net work, and by the work–energy theorem it equals the kinetic energy gained from rest: $\tfrac12 mv^2 = ${f(gk.W, 3)}$ J. Hence $v = \sqrt{2 \times ${f(gk.W, 3)} / ${gk.m}} = ${f(gk.v, 4)}$ m s$^{-1}$.`,
  sol: 'Triangle area, then the theorem from rest.',
  scheme: [[`Work = area of the triangle = ½ × ${gk.S} × ${gk.F0} = ${f(gk.W, 3)} J`, 1], ['Net work equals the kinetic energy gained from rest', 1], [`v = √(2W/m) = ${f(gk.v, 4)} m s⁻¹`, 1]],
  d: 3, c: 'application', t: [1, 2],
}), () => {
  const F = piecewise([[0, gk.F0], [gk.S, 0]]);
  let x = 0;
  let v = 0;
  const dt = 1e-5;
  while (x < gk.S) {
    v += (F(x) / gk.m) * dt;
    x += v * dt;
  }
  return (near(trapz(F, 0, gk.S), gk.W, 1e-9) && near(v, gk.v, 2e-3)) || 'graphke';
});
const s3 = { m: 900, v: 25, F: 4500 };
s3.K = 0.5 * s3.m * s3.v ** 2;
s3.s = s3.K / s3.F;
s3.s2 = (0.5 * s3.m * (s3.v / 2) ** 2) / s3.F;
add('stop3-short3', short({
  marks: 3,
  stem: `A car of mass ${s3.m} kg moving at ${s3.v} m s⁻¹ is brought to rest by a constant braking force of ${s3.F} N. Find the distance in which it stops, and the distance in which it would stop if its speed were half as great.`,
  model: r`By the work–energy theorem the work done by the brakes, $-Fs$, equals the change in kinetic energy. The initial kinetic energy is $\tfrac12 \times ${s3.m} \times ${s3.v}^2 = ${f(s3.K, 6)}$ J, so $s = K/F = ${f(s3.K, 6)} / ${s3.F} = ${f(s3.s, 4)}$ m. The stopping distance is proportional to the square of the speed, so at half the speed the distance is one quarter: $${f(s3.s, 4)} / 4 = ${f(s3.s2, 4)}$ m.`,
  sol: 'Brake work equals the lost kinetic energy; s ∝ v².',
  scheme: [[`Initial kinetic energy ½mv² = ${f(s3.K, 6)} J`, 1], [`s = K/F = ${f(s3.s, 4)} m`, 1], [`Half the speed: one quarter of the distance = ${f(s3.s2, 4)} m`, 1]],
  d: 3, c: 'application', t: [2],
}), () => near(stopDist(s3.m, s3.v, s3.F), s3.s, 2e-3) && near(stopDist(s3.m, s3.v / 2, s3.F), s3.s2, 2e-3) || 'stop3');
const tp = { m: 20, h: 3, L: 5 };
tp.Wg = -tp.m * g * tp.h;
add('twopaths-short3', short({
  marks: 3,
  stem: `A ${tp.m} kg crate is raised through a height of ${tp.h} m, first by lifting it vertically and then by sliding it up a smooth plank ${tp.L} m long. Taking g = 9.8 m s⁻², find the work done by gravity on the crate in each case and state what the result shows about gravity.`,
  model: r`Lifting vertically, gravity acts opposite to the displacement, so its work is $-mgh = -${tp.m} \times 9.8 \times ${tp.h} = -${f(-tp.Wg, 4)}$ J. Up the plank the component of the weight along the plank is $mg \times ${tp.h}/${tp.L}$, and the displacement is ${tp.L} m, so the work is again $-${f(-tp.Wg, 4)}$ J. The work depends only on the height gained and not on the path, which shows that gravity is a conservative force.`,
  sol: 'Weight component along the plank times the plank length.',
  scheme: [[`Vertical lift: W = −mgh = −${f(-tp.Wg, 4)} J`, 1], [`Plank: −mg sin θ × ${tp.L} = −${f(-tp.Wg, 4)} J, the same`, 1], ['Work is path independent: gravity is conservative', 1]],
  d: 3, c: 'application', t: [3],
}), () => {
  const along = tp.m * g * (tp.h / tp.L);
  return near(-along * tp.L, tp.Wg, 1e-12) && near(trapz(() => -tp.m * g, 0, tp.h, 500), tp.Wg, 1e-9) || 'twopaths';
});
const pe = { m: 0.25, L: 1.8, th: 60 };
pe.h = pe.L * (1 - Math.cos(rad(pe.th)));
pe.K = pe.m * g * pe.h;
pe.v = Math.sqrt(2 * g * pe.h);
add('pendE-short3', short({
  marks: 3,
  stem: `A pendulum bob of mass ${pe.m} kg hangs from a string ${pe.L} m long. It is released from rest with the string at ${pe.th}° to the vertical. Taking g = 9.8 m s⁻², find (i) the height of the bob above its lowest point at release, (ii) its greatest kinetic energy, and (iii) its speed at the lowest point.`,
  model: r`(i) The height is $h = L(1 - \cos\theta) = ${pe.L}(1 - \cos ${pe.th}^\circ) = ${f(pe.h, 3)}$ m. (ii) The tension does no work, so the mechanical energy is conserved and the greatest kinetic energy, at the lowest point, equals the initial potential energy: $K = mgh = ${pe.m} \times 9.8 \times ${f(pe.h, 3)} = ${f(pe.K, 4)}$ J. (iii) From $\tfrac12 mv^2 = K$, the speed is $v = ${f(pe.v, 3)}$ m s$^{-1}$.`,
  sol: 'Height from L(1 − cos θ); energy conserved.',
  scheme: [[`h = L(1 − cos θ) = ${f(pe.h, 3)} m`, 1], [`K(max) = mgh = ${f(pe.K, 4)} J`, 1], [`v = √(2gh) = ${f(pe.v, 3)} m s⁻¹`, 1]],
  d: 3, c: 'application', t: [4],
}), () => near(pendulumSpeed(pe.L, pe.th), pe.v, 2e-3) && near(0.5 * pe.m * pe.v ** 2, pe.K, 1e-9) || 'pendE');
const rc = { m: 600, hA: 28, hB: 8 };
rc.drop = rc.hA - rc.hB;
rc.v = Math.sqrt(2 * g * rc.drop);
rc.K = 0.5 * rc.m * rc.v ** 2;
add('coast-short3', short({
  marks: 3,
  stem: `A roller-coaster car of mass ${rc.m} kg is released from rest at A, ${rc.hA} m above the lowest point of the track. Neglecting friction and air drag, and taking g = 9.8 m s⁻², find the speed of the car at B, ${rc.hB} m above the lowest point, and its kinetic energy there.`,
  model: r`Only gravity does work, since the normal reaction is perpendicular to the track, so mechanical energy is conserved. From A to B the car drops $${rc.hA} - ${rc.hB} = ${rc.drop}$ m. Then $\tfrac12 mv^2 = mg\,(\text{drop})$, so $v = \sqrt{2 \times 9.8 \times ${rc.drop}} = ${f(rc.v, 3)}$ m s$^{-1}$, independent of the mass. The kinetic energy is $K = mg \times ${rc.drop} = ${rc.m} \times 9.8 \times ${rc.drop} = ${f(rc.K, 4)}$ J.`,
  sol: 'Speed from the drop below A; mass cancels.',
  scheme: [[`Drop from A to B = ${rc.drop} m; energy conserved`, 1], [`v = √(2g × drop) = ${f(rc.v, 3)} m s⁻¹`, 1], [`K = mg × drop = ${f(rc.K, 4)} J`, 1]],
  d: 3, c: 'application', t: [4],
}), () => near(fallSpeed(rc.drop), rc.v, 1e-3) && near(0.5 * rc.m * rc.v ** 2, rc.K, 1e-9) || 'coast');
const s2 = { k: 1200, x1: 0.03, x2: 0.06 };
s2.U1 = 0.5 * s2.k * s2.x1 ** 2;
s2.U2 = 0.5 * s2.k * s2.x2 ** 2;
s2.W = s2.U2 - s2.U1;
add('sp2-short3', short({
  marks: 3,
  stem: `A spring of force constant ${s2.k} N m⁻¹ is compressed by ${s2.x1 * 100} cm from its natural length and then compressed by a further ${s2.x1 * 100} cm. Find the energy stored in the spring at each of the two stages and the work done during the second compression.`,
  model: r`The energy stored in a spring is $U = \tfrac12 kx^2$ for a stretch or a compression. At $${s2.x1}$ m it is $\tfrac12 \times ${s2.k} \times ${s2.x1}^2 = ${f(s2.U1, 3)}$ J. At $${s2.x2}$ m it is $\tfrac12 \times ${s2.k} \times ${s2.x2}^2 = ${f(s2.U2, 3)}$ J. The work done in the second compression is the increase in the stored energy, $${f(s2.U2, 3)} - ${f(s2.U1, 3)} = ${f(s2.W, 3)}$ J, three times the first.`,
  sol: 'U = ½kx² at each stage; the work is the difference.',
  scheme: [[`U₁ = ½kx² = ${f(s2.U1, 3)} J at ${s2.x1 * 100} cm`, 1], [`U₂ = ${f(s2.U2, 3)} J at ${s2.x2 * 100} cm`, 1], [`Work in the second compression = ${f(s2.W, 3)} J`, 1]],
  d: 3, c: 'application', t: [3],
}), () => near(trapz((x) => s2.k * x, 0, s2.x1), s2.U1, 1e-9) && near(trapz((x) => s2.k * x, s2.x1, s2.x2), s2.W, 1e-9) || 'sp2');
const e3 = { m: 1.0e-6, P: 100e6 };
e3.E = e3.m * c * c;
e3.t = e3.E / e3.P;
add('emc3-short3', short({
  marks: 3,
  stem: 'A mass of 1.0 mg is converted completely into energy in a nuclear process. Taking the speed of light as 3.0 × 10⁸ m s⁻¹, find (i) the energy released and (ii) the time for which this energy could supply a power station of output 100 MW.',
  model: r`(i) The mass must first be written in kilograms: $1.0\ \text{mg} = 1.0 \times 10^{-6}$ kg. Then $E = mc^2 = 1.0 \times 10^{-6} \times (3.0 \times 10^8)^2 = ${sci(e3.E, 2)}$ J. (ii) Power is energy delivered per unit time, so the time for which this energy can supply the power station is $t = E/P = ${sci(e3.E, 2)} / (100 \times 10^{6}) = ${f(e3.t, 3)}$ s, which is $${f(e3.t / 60, 2)}$ minutes: a tiny mass runs a large station for a quarter of an hour.`,
  sol: 'E = mc² in kg, then t = E/P.',
  scheme: [['m = 1.0 × 10⁻⁶ kg; E = mc²', 1], [`E = ${sciT(e3.E, 2)} J`, 1], [`t = E/P = ${f(e3.t, 3)} s = ${f(e3.t / 60, 2)} minutes`, 1]],
  d: 3, c: 'application', t: [4, 5],
}), () => near(1.0e-6 * 3.0e8 ** 2, e3.E, 1e-12) && near(9.0e10 / 1.0e8, e3.t, 1e-12) || 'emc3');
const cl = { m: 800, v: 0.5, t: 40 };
cl.P = cl.m * g * cl.v;
cl.W = cl.P * cl.t;
add('lift-short3', short({
  marks: 3,
  stem: `A crane lifts a load of ${cl.m} kg vertically at a steady ${cl.v} m s⁻¹. Taking g = 9.8 m s⁻², find (i) the power the crane delivers to the load and (ii) the work it does on the load in ${cl.t} s.`,
  model: r`(i) At a steady speed there is no acceleration, so the upward force of the cable equals the weight of the load, $F = mg = ${cl.m} \times 9.8 = ${f(cl.m * g, 4)}$ N. The power delivered is $P = Fv = ${f(cl.m * g, 4)} \times ${cl.v} = ${f(cl.P, 4)}$ W. (ii) The work done in ${cl.t} s is $W = Pt = ${f(cl.P, 4)} \times ${cl.t} = ${f(cl.W, 5)}$ J, which is the same as $mgh$ for the height of $${cl.v * cl.t}$ m gained in that time.`,
  sol: 'F equals the weight at steady speed; W = Pt.',
  scheme: [[`F = mg = ${f(cl.m * g, 4)} N`, 1], [`P = Fv = ${f(cl.P, 4)} W`, 1], [`W = Pt = ${f(cl.W, 5)} J`, 1]],
  d: 2, c: 'application', t: [5],
}), () => near(cl.m * g * (cl.v * cl.t), cl.W, 1e-12) || 'lift');
