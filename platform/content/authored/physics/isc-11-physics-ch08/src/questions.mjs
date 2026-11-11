// ISC 11 ch08 question bank, part 1: objective items (1 mark: MCQ, assertion-reason, true-false, fill-blank) and 1–2 mark numericals.
// Every numerical is computed here and re-solved by an independent `check` (a vector dot product, numerical integration of the force over
// the path, stepping the equation of motion, or bisection); solutions and schemes print the computed values.
// AR keys across the chapter: a (wzero), b (scal), c (circle), d (fric), a (osc), b (cars).
import { mk, add, r, dec, near } from '../../isc-11-physics-ch01/src/lib.mjs';
import { g, c, rad, R6, trapz, piecewise, stopDist, pendulumSpeed, springSpeedAt, root, fallSpeed } from './phys.mjs';
import { sciT } from './decks.mjs';

const { mcq, ar, tf, fill, num } = mk;
const f = (x, n = 3) => dec(x, n);
const mn = (x) => String(x).replace('-', '−');

// ================================================================ t01 work: constant force, sign, variable force
add('wzero-mcq', mcq({
  stem: 'A railway porter carries a trunk on his head along a level platform at constant speed. The work done on the trunk by the force that his head exerts on it is',
  right: 'zero, because the force is perpendicular to the displacement',
  wrong: ['positive, because he spends effort to carry it', 'positive, equal to the weight of the trunk times the distance walked', 'negative, because the trunk is carried against gravity'],
  sol: 'The head pushes the trunk upward, to balance its weight, while the displacement is horizontal. The angle between them is 90 degrees, so W = FS cos 90° = 0. Effort or tiredness does not count as work in physics.',
  d: 1, c: 'understanding', t: [1],
}));
const ang = { T: 400, th: 30, S: 25 };
ang.W = ang.T * ang.S * Math.cos(rad(ang.th));
add('angle-mcq', mcq({
  stem: `A bullock pulls a cart along a straight level road through ${ang.S} m with a rope that exerts a constant tension of ${ang.T} N at ${ang.th}° above the road. The work done by the rope is`,
  right: `${f(ang.W, 3)} J`,
  wrong: [`${f(ang.T * ang.S, 3)} J`, `${f(ang.T * ang.S * Math.sin(rad(ang.th)), 3)} J`, `${f((ang.T * ang.S) / Math.cos(rad(ang.th)), 3)} J`],
  scheme: [[`W = FS cos θ = ${ang.T} × ${ang.S} × cos ${ang.th}° = ${f(ang.W, 4)} J (@K)`, 1]],
  sol: `Only the component of the tension along the road does work: W = ${ang.T} × ${ang.S} × cos ${ang.th}° = ${f(ang.W, 4)} J. Using the full tension gives the larger value ${f(ang.T * ang.S, 3)} J, and the sine gives the component across the road.`,
  d: 2, c: 'application', t: [1],
}), (q) => {
  const F = [ang.T * Math.cos(rad(ang.th)), ang.T * Math.sin(rad(ang.th))];
  const Wd = F[0] * ang.S + F[1] * 0;
  return (near(Wd, ang.W, 1e-12) && near(Number(q.options.find((o) => o.id === q.answer.option_ids[0]).text_md.split(' ')[0]), ang.W, 2e-3)) || 'angle';
});
add('neg-mcq', mcq({
  stem: 'A fielder stops a fast cricket ball by drawing his hands back with the ball as it slows. During this stopping the work done on the ball by the fielder’s hands is',
  right: 'negative, because the force on the ball is opposite to its displacement',
  wrong: ['positive, because the ball is brought to rest', 'zero, because the ball finally has no velocity', 'positive, because the hands do work in stopping it'],
  sol: 'The hands push against the ball’s motion, so the force and the displacement are in opposite directions (θ = 180°) and the work is negative: the ball loses kinetic energy.',
  d: 2, c: 'understanding', t: [1],
}));
const ar1 = { rise: [4, 18], flat: 3 };
ar1.W = 0.5 * ar1.rise[0] * ar1.rise[1] + ar1.rise[1] * ar1.flat;
add('area-mcq', mcq({
  stem: `The force on a sled rises uniformly from zero to ${ar1.rise[1]} N over the first ${ar1.rise[0]} m of its path and then stays at ${ar1.rise[1]} N for the next ${ar1.flat} m. The work done over the whole ${ar1.rise[0] + ar1.flat} m is`,
  right: `${ar1.W} J`,
  wrong: [`${ar1.rise[1] * (ar1.rise[0] + ar1.flat)} J`, `${ar1.rise[1] * ar1.flat} J`, `${0.5 * ar1.rise[0] * ar1.rise[1]} J`],
  scheme: [[`Work = triangle + rectangle = ${0.5 * ar1.rise[0] * ar1.rise[1]} + ${ar1.rise[1] * ar1.flat} = ${ar1.W} J (@K)`, 1]],
  sol: `Work is the area under the F–S graph: a triangle of ½ × ${ar1.rise[0]} × ${ar1.rise[1]} = ${0.5 * ar1.rise[0] * ar1.rise[1]} J, then a rectangle of ${ar1.rise[1]} × ${ar1.flat} = ${ar1.rise[1] * ar1.flat} J. The total is ${ar1.W} J; treating the whole path as a rectangle overestimates it.`,
  d: 2, c: 'application', t: [1],
}), () => {
  const F = piecewise([[0, 0], [4, 18], [7, 18]]);
  return near(trapz(F, 0, 7), ar1.W, 1e-6) || 'area';
});
add('unit-mcq', mcq({
  stem: 'The SI unit of work, the joule, is related to the CGS unit, the erg, by',
  right: '1 J = 10⁷ erg',
  wrong: ['1 J = 10⁵ erg', '1 J = 10⁻⁷ erg', '1 J = 10³ erg'],
  sol: '1 J = 1 N m = 10⁵ dyne × 10² cm = 10⁷ dyne cm = 10⁷ erg.',
  d: 1, c: 'recall', t: [1],
}));
const ob = { F: 20, S: 3, th: 120 };
ob.W = ob.F * ob.S * Math.cos(rad(ob.th));
add('sign-mcq', mcq({
  stem: `A force of ${ob.F} N acts on a body that is displaced ${ob.S} m in a direction making ${ob.th}° with the force. The work done by the force is`,
  right: `${mn(f(ob.W, 3))} J`,
  wrong: [`+${f(-ob.W, 3)} J`, `−${f(ob.F * ob.S * Math.sin(rad(ob.th)), 3)} J`, `+${f(ob.F * ob.S, 3)} J`],
  scheme: [[`W = FS cos ${ob.th}° = ${ob.F} × ${ob.S} × (−0.5) = ${mn(f(ob.W, 3))} J (@K)`, 1]],
  sol: `cos ${ob.th}° = −0.5, so W = ${ob.F} × ${ob.S} × (−0.5) = ${mn(f(ob.W, 3))} J. The sign is negative because the angle is obtuse: the force has a component against the displacement.`,
  d: 2, c: 'application', t: [1],
}), () => {
  const dot = (ob.F * Math.cos(0)) * (ob.S * Math.cos(rad(ob.th))) + (ob.F * Math.sin(0)) * (ob.S * Math.sin(rad(ob.th)));
  return near(dot, ob.W, 1e-9) || 'obtuse';
});

// ================================================================ t02 kinetic energy and the work-energy theorem
add('ke3-mcq', mcq({
  stem: 'The speed of a body is tripled. Its kinetic energy becomes',
  right: 'nine times the original',
  wrong: ['three times the original', 'six times the original', 'one-third of the original'],
  sol: 'K = ½mv² depends on the square of the speed, so tripling v multiplies K by 3² = 9.',
  d: 1, c: 'understanding', t: [2],
}));
const pk = { M: 4000, m: 1000 };
pk.ratio = pk.M / pk.m;
add('pk-mcq', mcq({
  stem: `A loaded truck of mass ${pk.M} kg and a car of mass ${pk.m} kg move with the same momentum. The ratio (kinetic energy of the car) : (kinetic energy of the truck) is`,
  right: `${pk.ratio} : 1`,
  wrong: ['1 : 1', `1 : ${pk.ratio}`, `${pk.ratio * pk.ratio} : 1`],
  scheme: [[`K = p²/2m, so K(car)/K(truck) = M/m = ${pk.ratio} : 1 (@K)`, 1]],
  sol: `K = p²/(2m). With the same p, K is inversely proportional to the mass, so the car has ${pk.ratio} times the kinetic energy of the truck.`,
  d: 3, c: 'analysis', t: [2],
}), () => {
  const p = 12345;
  return near((p * p) / (2 * pk.m) / ((p * p) / (2 * pk.M)), pk.ratio, 1e-12) || 'pk';
});
add('wet-mcq', mcq({
  stem: 'According to the work–energy theorem, the net work done on a body is equal to',
  right: 'the change in its kinetic energy',
  wrong: ['its final kinetic energy only', 'the change in its momentum', 'the force multiplied by the time for which it acts'],
  sol: 'The theorem states W(net) = K(final) − K(initial). The final kinetic energy alone is equal to the work only when the body starts from rest.',
  d: 1, c: 'recall', t: [2],
}));
const st = { v1: 10, s1: 12, v2: 30 };
st.s2 = st.s1 * (st.v2 / st.v1) ** 2;
add('stop-mcq', mcq({
  stem: `With its brakes applying a constant retarding force, a car moving at ${st.v1} m s⁻¹ stops in ${st.s1} m. Using the same brakes, the distance in which it stops from ${st.v2} m s⁻¹ is`,
  right: `${st.s2} m`,
  wrong: [`${st.s1 * 3} m`, `${st.s1 * 6} m`, `${st.s1 * 12} m`],
  scheme: [[`s ∝ v², so s = ${st.s1} × (${st.v2}/${st.v1})² = ${st.s2} m (@K)`, 1]],
  sol: `Fs = ½mv² with the same F and m gives s proportional to v². The speed is multiplied by ${st.v2 / st.v1}, so the distance is multiplied by ${(st.v2 / st.v1) ** 2}: ${st.s1} × ${(st.v2 / st.v1) ** 2} = ${st.s2} m.`,
  d: 2, c: 'application', t: [2],
}), () => {
  const F = 5000;
  const m = 1000;
  const a = stopDist(m, st.v1, F);
  const Fp = F * (a / st.s1); // the force that makes the first stop 12 m; then repeat at 30 m/s
  const s2 = stopDist(m, st.v2, Fp);
  return near(s2, st.s2, 1e-3) || 'stop';
});
const kc = { m: 0.5, K: 36 };
kc.v = Math.sqrt((2 * kc.K) / kc.m);
add('kecalc-mcq', mcq({
  stem: `A stone of mass ${kc.m} kg has a kinetic energy of ${kc.K} J. Its speed is`,
  right: `${f(kc.v, 3)} m s⁻¹`,
  wrong: [`${f((2 * kc.K) / kc.m, 3)} m s⁻¹`, `${f(Math.sqrt(kc.K / kc.m), 3)} m s⁻¹`, `${f(kc.K / kc.m, 3)} m s⁻¹`],
  scheme: [[`v = √(2K/m) = √(2 × ${kc.K} / ${kc.m}) = ${f(kc.v, 3)} m s⁻¹ (@K)`, 1]],
  sol: `K = ½mv², so v = √(2K/m) = √(2 × ${kc.K} / ${kc.m}) = √${f((2 * kc.K) / kc.m, 3)} = ${f(kc.v, 3)} m s⁻¹. The value ${f((2 * kc.K) / kc.m, 3)} is v² and still needs its square root.`,
  d: 2, c: 'application', t: [2],
}), () => near(0.5 * kc.m * kc.v ** 2, kc.K, 1e-12) || 'kecalc');

// ================================================================ t03 potential energy, spring, conservative forces
add('spU-mcq', mcq({
  stem: 'A spring is first stretched by 2 cm and then, separately, compressed by 2 cm from its natural length. The energy stored in the compressed spring, compared with that in the stretched spring, is',
  right: 'equal, because U = ½kx² depends on x²',
  wrong: ['smaller, because the coils are pushed together', 'larger, because compression is harder than stretching', 'negative, because x is negative'],
  sol: 'U = ½kx². The extension x enters through its square, so a compression of 2 cm stores exactly the same energy as a stretch of 2 cm.',
  d: 2, c: 'understanding', t: [3],
}));
const sp3 = { k: 200, x1: 0.05, x2: 0.10 };
sp3.W1 = 0.5 * sp3.k * sp3.x1 ** 2;
sp3.W2 = 0.5 * sp3.k * (sp3.x2 ** 2 - sp3.x1 ** 2);
sp3.ratio = sp3.W2 / sp3.W1;
add('sp3-mcq', mcq({
  stem: `A spring of force constant ${sp3.k} N m⁻¹ is stretched by ${sp3.x1 * 100} cm. It is then stretched a further ${sp3.x1 * 100} cm. The work done in the second stretch is how many times the work done in the first?`,
  right: `${sp3.ratio} times`,
  wrong: ['1 time', '2 times', '4 times'],
  scheme: [[`W₁ = ½kx² and W₂ = ½k(2x)² − ½kx² = 3 × ½kx², so W₂/W₁ = ${sp3.ratio} (@K)`, 1]],
  sol: `The first stretch stores ½k(0.05)² = ${f(sp3.W1, 3)} J. At 0.10 m the energy is four times as large, so the second stretch adds 4 − 1 = 3 times the first: ${f(sp3.W2, 3)} J, a ratio of ${sp3.ratio}.`,
  d: 4, c: 'analysis', t: [3],
}), () => {
  const F = (x) => sp3.k * x;
  const w1 = trapz(F, 0, sp3.x1);
  const w2 = trapz(F, sp3.x1, sp3.x2);
  return near(w2 / w1, sp3.ratio, 1e-6) || 'sp3';
});
add('cons-mcq', mcq({
  stem: 'Which statement about a conservative force is correct?',
  right: 'The work it does round any closed path is zero',
  wrong: ['The work it does depends on the path between the two points', 'It always acts opposite to the velocity of the body', 'It can only act on a body that is at rest'],
  sol: 'For a conservative force the work between two points is the same for every path, so the work round a closed path is zero. A force that always opposes the velocity, such as friction, is non-conservative.',
  d: 1, c: 'recall', t: [3],
}));
add('noncons-mcq', mcq({
  stem: 'Which of the following forces is non-conservative?',
  right: 'The air drag on a parachutist coming down',
  wrong: ['The weight of a body near the Earth', 'The force of a stretched spring', 'The electrostatic force between two point charges'],
  sol: 'Drag depends on how the body moves, opposes the motion along the whole path and turns mechanical energy into heat, so the work depends on the path. Gravity, the spring force and the electrostatic force are conservative.',
  d: 1, c: 'recall', t: [3],
}));
const pe = { m: 3, h: 2.0, ht: 0.75 };
pe.U = pe.m * g * (pe.h - pe.ht);
add('pe-mcq', mcq({
  stem: `A book of mass ${pe.m} kg lies on a shelf ${f(pe.h, 2)} m above the floor. Taking g = 9.8 m s⁻², its potential energy relative to a table top ${pe.ht} m above the floor is`,
  right: `${f(pe.U, 4)} J`,
  wrong: [`${f(pe.m * g * pe.h, 4)} J`, `${f(pe.m * g * pe.ht, 4)} J`, `${f(pe.m * g * (pe.h + pe.ht), 4)} J`],
  scheme: [[`U = mg(h − h₀) = ${pe.m} × 9.8 × ${f(pe.h - pe.ht, 3)} = ${f(pe.U, 4)} J (@K)`, 1]],
  sol: `Relative to the table the book is ${f(pe.h - pe.ht, 3)} m higher, so U = mgh = ${pe.m} × 9.8 × ${f(pe.h - pe.ht, 3)} = ${f(pe.U, 4)} J. The value ${f(pe.m * g * pe.h, 4)} J is the energy relative to the floor.`,
  d: 2, c: 'application', t: [3],
}), () => near(pe.m * g * pe.h - pe.m * g * pe.ht, pe.U, 1e-12) || 'pe');

// ================================================================ t04 conservation, oscillator, E = mc²
add('fallhalf-mcq', mcq({
  stem: 'A ball is dropped from rest from a height H above the ground. Ignoring air resistance, the height above the ground at which its kinetic energy equals its potential energy is',
  right: 'H/2',
  wrong: ['H/4', 'H/3', '2H/3'],
  sol: 'The total energy mgH stays constant. K = U means each equals half of it, so mgh = ½mgH and h = H/2, taking the ground as the zero of potential energy.',
  d: 2, c: 'understanding', t: [4],
}));
add('pend-mcq', mcq({
  stem: 'A simple pendulum bob is released from rest at one end of its swing. Neglecting air resistance, the kinetic energy of the bob is greatest',
  right: 'when the bob passes through the lowest point',
  wrong: ['when the bob is at the end of its swing', 'when the string makes 45° with the vertical on its way down', 'at every point, since the string tension keeps it moving'],
  sol: 'Mechanical energy is constant, so the kinetic energy is greatest where the potential energy is least: at the lowest point. At the ends the bob is momentarily at rest and K = 0.',
  d: 1, c: 'recall', t: [4],
}));
add('coast-mcq', mcq({
  stem: 'Two cars of masses 500 kg and 900 kg are released from rest from the same height on a frictionless roller-coaster track. At the bottom of the track their speeds are',
  right: 'equal, because the speed depends only on the height descended',
  wrong: ['greater for the 900 kg car, because it has more potential energy', 'greater for the 500 kg car, because it is lighter', 'zero for both, because they start from rest'],
  sol: 'mgh = ½mv² gives v = √(2gh): the mass cancels. The heavier car has more energy to convert, but also more mass to speed up, so both reach the same speed.',
  d: 2, c: 'understanding', t: [4],
}));
const oq = { m: 0.6, k: 150, A: 0.12 };
oq.E = 0.5 * oq.k * oq.A ** 2;
oq.Uhalf = 0.5 * oq.k * (oq.A / 2) ** 2;
add('osc-mcq', mcq({
  stem: 'A block oscillates on a smooth horizontal surface at the end of a spring with amplitude A. When its displacement from the equilibrium position is A/2, the fraction of the total energy that is kinetic is',
  right: '3/4',
  wrong: ['1/4', '1/2', '1/8'],
  scheme: [[`U = ½k(A/2)² = ¼ of ½kA², so K = 1 − 1/4 = 3/4 of E (@K)`, 1]],
  sol: `At x = A/2 the potential energy is ½k(A/2)² = ¼ × ½kA² = E/4, so the kinetic energy is E − E/4 = 3E/4.`,
  d: 3, c: 'application', t: [4],
}), () => {
  const k = oq.k;
  const A = oq.A;
  const E = 0.5 * k * A * A;
  const Ux = 0.5 * k * (A / 2) ** 2;
  const v = springSpeedAt(oq.m, k, A, A / 2);
  const K = 0.5 * oq.m * v * v;
  return near(K / E, 0.75, 2e-3) && near(Ux / E, 0.25, 1e-12) || 'osc';
});
const em1 = { m: 0.2e-3 }; // 0.20 g in kg
em1.E = em1.m * c * c;
add('emc-mcq', mcq({
  stem: 'A mass of 0.20 g is completely converted into energy. Taking the speed of light as 3.0 × 10⁸ m s⁻¹, the energy released is',
  right: `${sciT(em1.E, 2)} J`,
  wrong: [`${sciT(em1.E * 1000, 2)} J`, `${sciT(em1.m * c, 2)} J`, `${sciT(0.5 * em1.m * c * c, 2)} J`],
  scheme: [[`E = mc² = 2.0 × 10⁻⁴ × (3.0 × 10⁸)² = ${sciT(em1.E, 2)} J (@K)`, 1]],
  sol: `The mass must be in kilograms: 0.20 g = 2.0 × 10⁻⁴ kg. E = mc² = 2.0 × 10⁻⁴ × 9.0 × 10¹⁶ = ${sciT(em1.E, 2)} J. Using 0.20 as kilograms would give a thousand times too much.`,
  d: 2, c: 'application', t: [4],
}), () => near(2.0e-4 * 9.0e16, em1.E, 1e-9) || 'emc');

// ================================================================ t05 power
add('pdef-mcq', mcq({
  stem: 'The SI unit of power, the watt, expressed in base units is',
  right: 'kg m² s⁻³',
  wrong: ['kg m² s⁻²', 'kg m s⁻³', 'kg m s⁻²'],
  sol: 'P = W/t, so 1 W = 1 J s⁻¹ and 1 J = 1 kg m² s⁻². Hence 1 W = 1 kg m² s⁻³.',
  d: 2, c: 'recall', t: [5],
}));
const pw = { m: 250, h: 12, t: 20 };
pw.P = (pw.m * g * pw.h) / pw.t;
add('pwr-mcq', mcq({
  stem: `A motor lifts a ${pw.m} kg load through ${pw.h} m at a constant speed in ${pw.t} s. Taking g = 9.8 m s⁻², the useful power of the motor is`,
  right: `${f(pw.P, 4)} W`,
  wrong: [`${f(2 * pw.P, 4)} W`, `${f(pw.P / 2, 4)} W`, `${f(pw.P * 10, 4)} W`],
  scheme: [[`P = mgh / t = ${pw.m} × 9.8 × ${pw.h} / ${pw.t} = ${f(pw.P, 4)} W (@K)`, 1]],
  sol: `The work done is mgh = ${pw.m} × 9.8 × ${pw.h} = ${f(pw.m * g * pw.h, 5)} J. Dividing by the time, P = ${f(pw.m * g * pw.h, 5)} / ${pw.t} = ${f(pw.P, 4)} W. Equivalently, F v = ${f(pw.m * g, 4)} × ${pw.h / pw.t}.`,
  d: 2, c: 'application', t: [5],
}), () => near(pw.m * g * (pw.h / pw.t), pw.P, 1e-12) || 'pwr');
const lo = { v1: 20 };
add('pfv-mcq', mcq({
  stem: `A locomotive working at constant power hauls a train at ${lo.v1} m s⁻¹ on level track. On a slope the pulling force it must exert is doubled. The speed of the train is now`,
  right: `${lo.v1 / 2} m s⁻¹`,
  wrong: [`${lo.v1 * 2} m s⁻¹`, `${lo.v1 / 4} m s⁻¹`, `${lo.v1} m s⁻¹`],
  scheme: [[`P = Fv is constant, so v = ${lo.v1} / 2 = ${lo.v1 / 2} m s⁻¹ (@K)`, 1]],
  sol: `P = Fv. At constant power, doubling F halves v: ${lo.v1} / 2 = ${lo.v1 / 2} m s⁻¹. A large pulling force is possible only at low speed.`,
  d: 3, c: 'analysis', t: [5],
}), () => near((1 * lo.v1) / 2, lo.v1 / 2, 1e-12) || 'pfv');
const kh = { P: 2, hours: 3 };
kh.J = kh.P * 1000 * kh.hours * 3600;
add('kwh-mcq', mcq({
  stem: `A ${kh.P} kW electric heater runs for ${kh.hours} h. The energy it consumes, in joules, is`,
  right: `${sciT(kh.J, 3)} J`,
  wrong: [`${sciT(kh.P * 1000 * kh.hours, 3)} J`, `${sciT(kh.P * kh.hours * 3.6e6 / 1000, 3)} J`, `${sciT(kh.P * 3.6e6, 3)} J`],
  scheme: [[`E = Pt = ${kh.P * 1000} W × ${kh.hours * 3600} s = ${sciT(kh.J, 3)} J (@K)`, 1]],
  sol: `E = Pt = ${kh.P * 1000} W × ${kh.hours} × 3600 s = ${sciT(kh.J, 3)} J, which is ${kh.P * kh.hours} kW h (1 kW h = 3.6 × 10⁶ J). The value ${sciT(kh.P * 1000 * kh.hours, 3)} J forgets to convert the hours to seconds.`,
  d: 2, c: 'application', t: [5],
}), () => near(kh.P * kh.hours * 3.6e6, kh.J, 1e-12) || 'kwh');

// ================================================================ assertion-reason
add('wzero-ar', ar({
  a: 'A porter carrying a suitcase on his head along a level platform does no work on the suitcase in the physical sense.',
  r: 'The force that supports the suitcase is vertical and the displacement is horizontal, so the force is perpendicular to the displacement.',
  key: 'a',
  sol: 'A is true. R is true and explains it: with θ = 90° the work W = FS cos θ is zero.',
  d: 2, c: 'understanding', t: [1],
}));
add('scal-ar', ar({
  a: 'When a compressed spring pushes a block back to the natural length, the spring does positive work on the block.',
  r: 'Work is a scalar quantity.',
  key: 'b',
  sol: 'A is true: the spring force and the displacement of the block are in the same direction. R is also true, but being a scalar does not say why the work is positive; the sign follows from the angle between the force and the displacement. So R is not the explanation.',
  d: 2, c: 'analysis', t: [1, 3],
}));
add('circle-ar', ar({
  a: 'A body moving in a circle at constant speed has a constant kinetic energy.',
  r: 'The force directed towards the centre does positive work on the body.',
  key: 'c',
  sol: 'A is true: the speed is constant, so K = ½mv² is constant. R is false: the force towards the centre is perpendicular to the velocity, so it does no work. This is also why the kinetic energy does not change.',
  d: 3, c: 'analysis', t: [1, 2],
}));
add('fric-ar', ar({
  a: 'The work done by kinetic friction on a block that slides round a closed loop and returns to its starting point is zero.',
  r: 'Friction is a non-conservative force.',
  key: 'd',
  sol: 'A is false: friction opposes the motion along the whole loop, so the work is negative and not zero. R is true: friction is non-conservative, which is the reason the work round a closed path is not zero.',
  d: 3, c: 'analysis', t: [3],
}));
add('osc-ar', ar({
  a: 'The kinetic energy of a block oscillating on a spring is greatest when it passes through the equilibrium position.',
  r: 'The total energy U + K is constant and the potential energy ½kx² is zero at the equilibrium position.',
  key: 'a',
  sol: 'A is true. R is true and explains it: with U + K fixed, K is largest where U = ½kx² is least, that is at x = 0.',
  d: 2, c: 'understanding', t: [4],
}));
add('cars-ar', ar({
  a: 'Two cars of different masses moving at the same speed have different kinetic energies.',
  r: 'Kinetic energy is a scalar quantity.',
  key: 'b',
  sol: 'A is true: K = ½mv² depends on the mass. R is also true, but being a scalar does not explain why the energies differ; the difference comes from the mass in ½mv². So R is not the explanation.',
  d: 1, c: 'understanding', t: [2],
}));

// ================================================================ true-false and fill-blank
add('brake-tf', tf({
  stem: 'The work done by the brakes in bringing a moving car to rest is negative, and its magnitude is equal to the kinetic energy the car had before braking.',
  key: 't',
  sol: 'True. The braking force opposes the displacement, so its work is negative; by the work–energy theorem it equals the change in kinetic energy, 0 − K(initial).',
  d: 2, c: 'understanding', t: [2],
}));
add('kwh-tf', tf({
  stem: 'A kilowatt hour is a unit of power.',
  key: 'f',
  sol: 'False. A kilowatt hour is a unit of energy (1 kW h = 3.6 × 10⁶ J); the kilowatt is the unit of power.',
  d: 1, c: 'recall', t: [5],
}));
add('speed-fill', fill({
  stem: 'In the relation E = mc², the symbol c stands for the speed of ___ in vacuum.',
  acc: [['light', 'light waves', 'electromagnetic waves']],
  sol: 'c = 3.0 × 10⁸ m s⁻¹ is the speed of **light** in vacuum.',
  d: 1, c: 'recall', t: [4],
}));
add('area-fill', fill({
  stem: 'The work done by a variable force is numerically equal to the ___ under the force–displacement graph.',
  acc: [['area']],
  sol: 'W = ∫F dS, which is the **area** under the F–S graph between the two limits.',
  d: 1, c: 'recall', t: [1],
}));

// ================================================================ numericals
const n1 = { T: 350, th: 40, S: 30 };
n1.W = n1.T * n1.S * Math.cos(rad(n1.th));
add('work-num', num({
  stem: `A farmer ploughs a field by pulling a plough with a rope that makes ${n1.th}° with the horizontal. The tension is ${n1.T} N and the plough moves ${n1.S} m in a straight line. Find the work done by the tension, in J.`,
  value: R6(n1.W), tol: 5, unit: 'J',
  sol: r`$W = FS\cos\theta = ${n1.T} \times ${n1.S} \times \cos ${n1.th}^\circ = ${n1.T} \times ${n1.S} \times ${f(Math.cos(rad(n1.th)), 4)} = ${f(n1.W, 4)}$ J.`,
  scheme: [[`W = FS cos θ = ${n1.T} × ${n1.S} × cos ${n1.th}° = ${f(n1.W, 4)} J`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => {
  const dot = n1.T * Math.cos(rad(n1.th)) * n1.S;
  const num2 = trapz(() => n1.T * Math.cos(rad(n1.th)), 0, n1.S, 3000);
  return near(dot, q.answer.value, 1e-4) && near(num2, q.answer.value, 1e-4) || 'work';
});
const n2 = { pts: [[0, 10], [3, 40], [8, 40], [12, 0]] };
n2.areas = [0.5 * (10 + 40) * 3, 40 * 5, 0.5 * 4 * 40];
n2.W = n2.areas.reduce((a, b) => a + b, 0);
add('varwork-num', num({
  stem: 'A variable force acts along a straight line. Its magnitude is 10 N at the start, rises uniformly to 40 N at a displacement of 3 m, stays at 40 N until 8 m and then falls uniformly to zero at 12 m. Find the work done by the force over the 12 m, in J.',
  value: n2.W, tol: 0.5, unit: 'J', marks: 2,
  sol: r`Work is the area under the F–S graph. Trapezium: $\tfrac12(10 + 40) \times 3 = ${n2.areas[0]}$ J. Rectangle: $5 \times 40 = ${n2.areas[1]}$ J. Triangle: $\tfrac12 \times 4 \times 40 = ${n2.areas[2]}$ J. Total $= ${n2.W}$ J.`,
  scheme: [[`Trapezium and rectangle: ${n2.areas[0]} J and ${n2.areas[1]} J`, 1], [`Triangle ${n2.areas[2]} J; total work = ${n2.W} J`, 1]],
  d: 3, c: 'application', t: [1],
}), (q) => near(trapz(piecewise(n2.pts), 0, 12, 120000), q.answer.value, 1e-6) || 'varwork');
const n3 = { m: 60, v: 9 };
n3.K = 0.5 * n3.m * n3.v ** 2;
add('ke-num', num({
  stem: `A sprinter of mass ${n3.m} kg runs at ${n3.v} m s⁻¹. Find her kinetic energy, in J.`,
  value: n3.K, tol: 1, unit: 'J',
  sol: r`$K = \tfrac12 mv^2 = \tfrac12 \times ${n3.m} \times ${n3.v}^2 = ${n3.K}$ J.`,
  scheme: [[`K = ½mv² = ½ × ${n3.m} × ${n3.v}² = ${n3.K} J`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => {
  const W = trapz((v) => n3.m * v, 0, n3.v, 20000); // work to raise the speed from 0 to v: integral of m v dv
  return near(W, q.answer.value, 1e-6) || 'ke';
});
const n4 = { m: 5000, v: 18, s: 45 };
n4.F = (0.5 * n4.m * n4.v ** 2) / n4.s;
add('stopf-num', num({
  stem: `A truck of mass ${n4.m} kg moving at ${n4.v} m s⁻¹ is brought to rest by its brakes in ${n4.s} m. Assuming the retarding force is constant, find its magnitude, in N.`,
  value: n4.F, tol: 20, unit: 'N', marks: 2,
  sol: r`Work–energy theorem: $-Fs = 0 - \tfrac12 mv^2$, so $F = \dfrac{mv^2}{2s} = \dfrac{${n4.m} \times ${n4.v}^2}{2 \times ${n4.s}} = ${f(n4.F, 5)}$ N.`,
  scheme: [[`Initial kinetic energy ½mv² = ${f(0.5 * n4.m * n4.v ** 2, 6)} J`, 1], [`F = K/s = ${f(0.5 * n4.m * n4.v ** 2, 6)} / ${n4.s} = ${f(n4.F, 5)} N`, 1]],
  d: 3, c: 'application', t: [2],
}), (q) => near(stopDist(n4.m, n4.v, q.answer.value), n4.s, 2e-3) || 'stopf');
const n5 = { k: 600, x1: 0.05, x2: 0.09 };
n5.W = 0.5 * n5.k * (n5.x2 ** 2 - n5.x1 ** 2);
add('spwork-num', num({
  stem: `The force constant of a spring is ${n5.k} N m⁻¹. Find the work done in stretching it from an extension of ${n5.x1 * 100} cm to an extension of ${n5.x2 * 100} cm, in J.`,
  value: R6(n5.W), tol: 0.01, unit: 'J', marks: 2,
  sol: r`$W = \tfrac12 k(x_2^2 - x_1^2) = \tfrac12 \times ${n5.k} \times (${n5.x2}^2 - ${n5.x1}^2) = \tfrac12 \times ${n5.k} \times ${f(n5.x2 ** 2 - n5.x1 ** 2, 3)} = ${f(n5.W, 3)}$ J.`,
  scheme: [[`Energy at each extension: ${f(0.5 * n5.k * n5.x1 ** 2, 3)} J and ${f(0.5 * n5.k * n5.x2 ** 2, 3)} J`, 1], [`Work = difference = ${f(n5.W, 3)} J`, 1]],
  d: 3, c: 'application', t: [3],
}), (q) => near(trapz((x) => n5.k * x, n5.x1, n5.x2), q.answer.value, 1e-6) || 'spwork');
const n6 = { n: 20, mb: 3.0, h: 8.0 };
n6.U = n6.n * n6.mb * g * n6.h;
add('pegain-num', num({
  stem: `A mason lifts ${n6.n} bricks, each of mass ${f(n6.mb, 2)} kg, to a platform ${f(n6.h, 2)} m above the ground. Taking g = 9.8 m s⁻², find the gain in potential energy of the bricks, in J.`,
  value: R6(n6.U), tol: 5, unit: 'J',
  sol: r`Total mass $= ${n6.n} \times ${f(n6.mb, 2)} = ${n6.n * n6.mb}$ kg, so $U = mgh = ${n6.n * n6.mb} \times 9.8 \times ${f(n6.h, 2)} = ${f(n6.U, 4)}$ J.`,
  scheme: [[`U = mgh = ${n6.n * n6.mb} × 9.8 × ${f(n6.h, 2)} = ${f(n6.U, 4)} J`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => near(trapz(() => n6.n * n6.mb * g, 0, n6.h, 1000), q.answer.value, 1e-6) || 'pegain');
const n7 = { L: 2.4, th: 60 };
n7.h = n7.L * (1 - Math.cos(rad(n7.th)));
n7.v = Math.sqrt(2 * g * n7.h);
add('pendv-num', num({
  stem: `A simple pendulum has a string of length ${n7.L} m. The bob is released from rest with the string making ${n7.th}° with the vertical. Taking g = 9.8 m s⁻² and neglecting air resistance, find the speed of the bob at the lowest point, in m s⁻¹.`,
  value: R6(n7.v), tol: 0.02, unit: 'm s⁻¹', marks: 2,
  sol: r`Height above the lowest point: $h = L(1 - \cos\theta) = ${n7.L}(1 - \cos ${n7.th}^\circ) = ${f(n7.h, 4)}$ m. Energy conservation: $mgh = \tfrac12 mv^2$, so $v = \sqrt{2gh} = \sqrt{2 \times 9.8 \times ${f(n7.h, 4)}} = ${f(n7.v, 4)}$ m s$^{-1}$.`,
  scheme: [[`h = L(1 − cos θ) = ${f(n7.h, 4)} m`, 1], [`v = √(2gh) = ${f(n7.v, 4)} m s⁻¹`, 1]],
  d: 3, c: 'application', t: [4],
}), (q) => near(pendulumSpeed(n7.L, n7.th), q.answer.value, 2e-3) || 'pendv');
const n8 = { m: 0.05e-3 };
n8.E = n8.m * c * c;
add('emcn-num', num({
  stem: 'In a nuclear reaction a mass of 0.050 g is converted completely into energy. Taking the speed of light as 3.0 × 10⁸ m s⁻¹, find the energy released, giving your answer as a multiple of 10¹² J.',
  value: R6(n8.E / 1e12), tol: 0.01, unit: null,
  sol: r`$m = 0.050\ \text{g} = 5.0\times10^{-5}$ kg, so $E = mc^2 = 5.0\times10^{-5} \times (3.0\times10^{8})^2 = ${sci2(n8.E)}$ J, so in units of $10^{12}$ J the energy is $E = ${f(n8.E / 1e12, 2)}$.`,
  scheme: [[`E = mc² = 5.0 × 10⁻⁵ × 9.0 × 10¹⁶ = ${sciT(n8.E, 2)} J, so the answer is ${f(n8.E / 1e12, 2)} (in units of 10¹² J)`, 1]],
  d: 2, c: 'application', t: [4],
}), (q) => near((5.0e-5 * 3.0e8 * 3.0e8) / 1e12, q.answer.value, 1e-9) || 'emcn');
function sci2(x) {
  const e = Math.floor(Math.log10(x));
  return `${(x / 10 ** e).toFixed(1)} \\times 10^{${e}}`;
}
const n9 = { m: 2400, h: 15, t: 60 };
n9.P = (n9.m * g * n9.h) / n9.t;
add('pump-num', num({
  stem: `A pump lifts ${n9.m} kg of water every minute from a well to a tank ${n9.h} m above the water level. Taking g = 9.8 m s⁻² and neglecting losses, find the power of the pump, in W.`,
  value: R6(n9.P), tol: 3, unit: 'W', marks: 2,
  sol: r`Work per minute $= mgh = ${n9.m} \times 9.8 \times ${n9.h} = ${f(n9.m * g * n9.h, 6)}$ J in $${n9.t}$ s, so $P = \dfrac{W}{t} = \dfrac{${f(n9.m * g * n9.h, 6)}}{${n9.t}} = ${f(n9.P, 4)}$ W.`,
  scheme: [[`Work in one minute = mgh = ${f(n9.m * g * n9.h, 6)} J`, 1], [`P = W/t = ${f(n9.P, 4)} W`, 1]],
  d: 2, c: 'application', t: [5],
}), (q) => {
  let E = 0;
  const dt = 0.01;
  for (let t = 0; t < n9.t; t += dt) E += n9.m * g * (n9.h / n9.t) * dt; // force = weight, speed = h/t
  return near(E / n9.t, q.answer.value, 1e-3) || 'pump';
});
const n10 = { v: 12, F: 250 };
n10.P = n10.F * n10.v;
add('scooter-num', num({
  stem: `A scooter moves at a steady ${n10.v} m s⁻¹ on a level road against a total resistive force of ${n10.F} N. Find the power the engine delivers to the wheels, in W.`,
  value: n10.P, tol: 1, unit: 'W',
  sol: r`At a steady speed the driving force equals the resistive force, $F = ${n10.F}$ N, so $P = Fv = ${n10.F} \times ${n10.v} = ${n10.P}$ W.`,
  scheme: [[`P = Fv = ${n10.F} × ${n10.v} = ${n10.P} W`, 1]],
  d: 1, c: 'application', t: [5],
}), (q) => {
  const work = trapz(() => n10.F, 0, n10.v * 10, 1000); // work in 10 s
  return near(work / 10, q.answer.value, 1e-9) || 'scooter';
});
void root;
void fallSpeed;
void mn;
