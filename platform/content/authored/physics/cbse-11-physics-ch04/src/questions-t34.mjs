// ch04 Laws of Motion — question bank, part 2: t03 (equilibrium, friction) and t04 (uniform circular motion, level and banked roads).
import { mk, add, r, near, sig } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { g, rad, deg, solveLin, bankLimit, tablePulley } from './phys.mjs';
import { p3, Q3, N } from './questions.mjs';

const { mcq, ar, tf, fill, match, short } = mk;
const S = Math.sin;
const C = Math.cos;
const Tn = Math.tan;

// ================================================================ t03 equilibrium and friction
const fr = { m: 12, mus: 0.5, F: 40 };
fr.lim = fr.mus * fr.m * g;
add('friction-mcq', mcq({
  stem: `A ${fr.m} kg crate stands on a warehouse floor where μs = ${fr.mus.toFixed(2)}. A porter pushes it horizontally with ${fr.F} N and the crate does not move. The friction on the crate is (g = ${g} m/s²)`,
  right: `${fr.F} N, equal to the push`,
  wrong: [`${p3(fr.lim)} N, the limiting value`, '0 N, because nothing moves', `${p3(fr.lim - fr.F)} N, the unused part of the limit`],
  sol: `The crate is at rest, so static friction equals the applied force, ${fr.F} N, as long as that is below the limiting value μs m g = ${fr.mus.toFixed(2)} × ${fr.m} × ${g} = ${p3(fr.lim)} N. Here ${fr.F} < ${p3(fr.lim)} — option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => fr.F < fr.lim || 'fr');
add('walking-mcq', mcq({
  stem: 'A person walks forward along a level pavement. The friction force of the ground on the foot that is pushing off backwards points',
  right: 'forward, along the direction of walking',
  wrong: ['backward, opposing the walking', 'upward, supporting the weight', 'downward, pressing the foot to the ground'],
  sol: 'The foot pushes the ground backwards, so by the third law the ground’s static friction on the foot is forward; without it she could not start walking — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
const rp = { ang: 27 };
rp.mu = Tn(rad(rp.ang));
add('repose-mcq', mcq({
  stem: `A wooden block is placed on a plank whose slope is raised slowly. The block just begins to slide when the plank makes ${rp.ang}° with the horizontal. The coefficient of static friction between block and plank is`,
  right: `tan ${rp.ang}° = ${p3(rp.mu)}`,
  wrong: [`sin ${rp.ang}° = ${p3(S(rad(rp.ang)))}`, `cos ${rp.ang}° = ${p3(C(rad(rp.ang)))}`, `1/tan ${rp.ang}° = ${p3(1 / rp.mu)}`],
  sol: `At the point of sliding, mg sin θ = μs mg cos θ, so μs = tan θ = tan ${rp.ang}° = ${p3(rp.mu)} — option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => { const lim = (th) => S(rad(th)) - rp.mu * C(rad(th)); return Math.abs(lim(rp.ang)) < 1e-12 && lim(rp.ang + 1) > 0 || 'repose'; });
add('area-tf', tf({
  stem: 'A brick is slid along a table first on its broad face and then on its narrow face. The kinetic friction is much larger on the narrow face because the pressure is greater.',
  key: 'f',
  sol: 'False. To a good approximation kinetic friction depends on the normal reaction and the surfaces, not on the apparent area of contact; the same brick gives about the same friction on either face.',
  d: 2, c: 'understanding', t: [3],
}));
add('repose-fill', fill({
  stem: 'The steepest slope on which a block can remain at rest on a rough plane, with tan of the slope equal to μs, is called the angle of ___.',
  acc: [['repose']],
  sol: 'The limiting angle of the incline for which the block just stays at rest is the angle of repose, with tan θ = μs.',
  d: 1, c: 'recall', t: [3],
}));
add('fric-ar', ar({
  a: 'A box of iron filings has a larger coefficient of friction with the floor than an identical empty box of the same material.',
  r: 'The friction force between two surfaces is proportional to the normal reaction.',
  key: 'd',
  sol: 'A is false: μ depends on the nature of the surfaces, not on the load; the friction force is larger for the heavier box, not the coefficient. R is true — option (d).',
  scheme: [['Correct option (d)', 1]],
  d: 3, c: 'analysis', t: [3],
}));

const sd = { th: 37, muk: 0.25 };
sd.a = g * (S(rad(sd.th)) - sd.muk * C(rad(sd.th)));
N('slide-num', {
  stem: `A crate slides down a loading ramp inclined at ${sd.th}° to the horizontal. The coefficient of kinetic friction is ${sd.muk.toFixed(2)}. Find its acceleration down the ramp, in m/s². (g = ${g} m/s², sin ${sd.th}° = ${p3(S(rad(sd.th)))}, cos ${sd.th}° = ${p3(C(rad(sd.th)))}.)`,
  val: Q3(sd.a), unit: 'm/s²', marks: 2, tol: 0.03,
  sol: r`Along the ramp: $mg\sin\theta - \mu_k mg\cos\theta = ma$, so $a = g(\sin\theta - \mu_k\cos\theta) = ${g}\,(${p3(S(rad(sd.th)))} - ${sd.muk} \times ${p3(C(rad(sd.th)))}) = ${p3(sd.a)}$ m/s$^2$.`,
  scheme: [['mg sin θ − μk mg cos θ = ma', 1], [`a = ${p3(sd.a)} m s⁻²`, 1]],
  d: 3, c: 'application', t: [3],
}, () => { const m = 7; const [a] = solveLin([[m]], [m * g * S(rad(sd.th)) - sd.muk * m * g * C(rad(sd.th))]); return near(a, sd.a, 1e-9) || 'slide'; });
const cp = { m: 25, F: 100, th: 30, muk: 0.2 };
cp.N = cp.m * g - cp.F * S(rad(cp.th));
cp.f = cp.muk * cp.N;
cp.a = (cp.F * C(rad(cp.th)) - cp.f) / cp.m;
N('crate-pull-num', {
  stem: `A ${cp.m} kg crate is dragged along a level floor by a rope that makes ${cp.th}° above the horizontal and carries a tension of ${cp.F} N. The coefficient of kinetic friction is ${cp.muk.toFixed(2)}. Find the acceleration of the crate, in m/s². (g = ${g} m/s².)`,
  val: Q3(cp.a), unit: 'm/s²', marks: 3,
  sol: r`Vertical: $N + F\sin\theta = mg$, so $N = ${cp.m} \times ${g} - ${cp.F} \times ${p3(S(rad(cp.th)))} = ${p3(cp.N)}$ N, and $f = \mu_k N = ${cp.muk} \times ${p3(cp.N)} = ${p3(cp.f)}$ N. Horizontal: $a = \dfrac{F\cos\theta - f}{m} = \dfrac{${cp.F} \times ${p3(C(rad(cp.th)))} - ${p3(cp.f)}}{${cp.m}} = ${p3(cp.a)}$ m/s$^2$.`,
  scheme: [[`N = mg − F sin θ = ${p3(cp.N)} N (the rope lifts partly)`, 1], [`f = μk N = ${p3(cp.f)} N`, 1], [`a = (F cos θ − f)/m = ${p3(cp.a)} m s⁻²`, 1]],
  d: 3, c: 'application', t: [3],
}, () => { const [a, Nn] = solveLin([[cp.m, 0], [0, 1]], [cp.F * C(rad(cp.th)) - cp.muk * (cp.m * g - cp.F * S(rad(cp.th))), cp.m * g - cp.F * S(rad(cp.th))]); return near(a, cp.a, 1e-9) && near(Nn, cp.N, 1e-9) || 'cpull'; });
const tk = { mu: 0.40 };
tk.a = tk.mu * g;
N('truck-num', {
  stem: `A carton rests on the flat bed of a pick-up truck; the coefficient of static friction between carton and bed is ${tk.mu.toFixed(2)}. Find the greatest acceleration of the truck, in m/s², for which the carton does not slide. (g = ${g} m/s².)`,
  val: Q3(tk.a), unit: 'm/s²', marks: 2,
  sol: r`Friction is the only horizontal force on the carton: $f = ma$, with $f \le \mu_s N = \mu_s mg$. So $a_\text{max} = \mu_s g = ${tk.mu} \times ${g} = ${p3(tk.a)}$ m/s$^2$.`,
  scheme: [['Friction supplies the carton’s acceleration: μs m g = m a', 1], [`a max = ${p3(tk.a)} m s⁻²`, 1]],
  d: 2, c: 'application', t: [3],
}, () => near(tk.a, 3.92, 1e-12) || 'truck');
const cb = { m: 12, th: 15 };
cb.W = cb.m * g;
const [cbL, cbR] = solveLin([[-C(rad(cb.th)), C(rad(cb.th))], [S(rad(cb.th)), S(rad(cb.th))]], [0, cb.W]);
cb.T = cbL;
N('cable-num', {
  stem: `A 12 kg lamp is hung from the midpoint of a cable stretched across a street. Each half of the cable sags ${cb.th}° below the horizontal. Find the tension in the cable, in N. (g = ${g} m/s², sin ${cb.th}° = ${p3(S(rad(cb.th)))}.)`,
  val: Q3(cb.T), unit: 'N', marks: 3, tol: 3,
  sol: r`By symmetry both halves have the same tension $T$. Horizontal components cancel. Vertical: $2T\sin ${cb.th}^\circ = mg = ${cb.W.toFixed(1)}$ N, so $T = \dfrac{${cb.W.toFixed(1)}}{2 \times ${p3(S(rad(cb.th)))}} = ${p3(cb.T)}$ N.`,
  scheme: [['Equal tensions, horizontal components cancel (symmetry)', 1], ['2T sin 15° = mg', 1], [`T = ${p3(cb.T)} N`, 1]],
  d: 4, c: 'analysis', t: [3],
}, () => near(cbL, cbR, 1e-9) && near(2 * cbL * S(rad(cb.th)), cb.W, 1e-9) || 'cable');
const rr = { mA: 4.0, mB: 6.0, F: 50, mu: 0.2 };
rr.a = (rr.F - rr.mu * (rr.mA + rr.mB) * g) / (rr.mA + rr.mB);
rr.T = rr.mA * (rr.a + rr.mu * g);
N('tworough-num', {
  stem: `Block B (${rr.mB.toFixed(1)} kg) is pulled along a rough horizontal floor by a horizontal force of ${rr.F} N. It drags block A (${rr.mA.toFixed(1)} kg) behind it by a light string. The coefficient of kinetic friction is ${rr.mu.toFixed(1)} for both blocks. Find the tension in the string, in N. (g = ${g} m/s².)`,
  val: Q3(rr.T), unit: 'N', marks: 3,
  sol: r`Whole system: $a = \dfrac{F - \mu(m_A + m_B)g}{m_A + m_B} = \dfrac{${rr.F} - ${p3(rr.mu * 10 * g)}}{10.0} = ${p3(rr.a)}$ m/s$^2$. Block A: $T - \mu m_A g = m_A a$, so $T = m_A(a + \mu g) = ${rr.mA} \times (${p3(rr.a)} + ${p3(rr.mu * g)}) = ${p3(rr.T)}$ N.`,
  scheme: [[`Whole system: a = ${p3(rr.a)} m s⁻²`, 1], ['Block A: T − μ mA g = mA a', 1], [`T = mA(a + μg) = ${p3(rr.T)} N`, 1]],
  d: 4, c: 'application', t: [3],
}, () => { const [a, T] = solveLin([[rr.mB, 1], [rr.mA, -1]], [rr.F - rr.mu * rr.mB * g, -rr.mu * rr.mA * g]); return near(a, rr.a, 1e-9) && near(T, rr.T, 1e-9) && near(T, 20, 1e-9) || 'rough'; });
add('skidmass-mcq', mcq({
  stem: 'A loaded goods truck and an empty one of the same make skid to rest with locked wheels from the same speed on the same dry road. Compared with the empty truck, the loaded truck’s skidding distance is',
  right: 'the same, because the retardation μk g does not depend on the mass',
  wrong: ['longer, because it has more momentum', 'shorter, because the friction force on it is larger', 'longer, because a heavier body has more inertia and so resists a retarding force more'],
  sol: 'The friction force μk m g is proportional to the mass, and so is the inertia, so the retardation μk g and the distance u²/2μk g are the same for both trucks — option (@K).',
  d: 3, c: 'understanding', t: [3],
}));

add('wheel-short', short({
  marks: 2,
  stem: 'A hotel porter finds it far easier to move heavy luggage on a wheeled trolley than on a flat metal sheet. Explain this in terms of friction.',
  model: r`Dragging the sheet involves **sliding (kinetic) friction**, $f = \mu_k N$ with a fairly large $\mu_k$. On wheels the contact surfaces roll over each other, which involves **rolling friction**, with a coefficient $\mu_r$ that is many times smaller. The load (and so $N$) is the same, so the pull needed is much smaller.`,
  sol: 'Rolling friction is much smaller than sliding friction.',
  scheme: [['Sliding friction μk N for the sheet; rolling friction μr N for wheels', 1], ['μr is much smaller than μk for the same N, so a smaller pull is enough', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('lube-short', short({
  marks: 2,
  stem: 'The bearings of a ceiling fan are packed with grease. State how this helps, and name one other way of reducing friction between moving machine parts.',
  model: r`Grease (a **lubricant**) fills the gap between the metal surfaces with a thin film, so the surfaces slide over the film instead of touching at their rough points; friction and wear drop sharply. Another way is to replace sliding by rolling, using **ball bearings**, or to use an air cushion.`,
  sol: 'Lubricant film; ball bearings.',
  scheme: [['A lubricating film separates the surfaces and lowers friction and wear', 1], ['One other method: ball bearings (rolling) or an air cushion', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('repose-short3', short({
  marks: 3,
  stem: 'A block rests on a rough plane inclined at an angle θ. Draw (describe) the forces on it, and show that it is on the point of sliding when tan θ = μs.',
  model: r`Forces on the block: weight $mg$ downward, normal reaction $N$ perpendicular to the plane, and friction $f$ up the slope. Resolving, $N = mg\cos\theta$ and $f = mg\sin\theta$ while it is at rest. Static friction cannot exceed $\mu_s N$, so $mg\sin\theta \le \mu_s mg\cos\theta$, i.e. $\tan\theta \le \mu_s$. The block is on the point of sliding when $\tan\theta = \mu_s$: this angle is the angle of repose.`,
  sol: 'Resolve along and across the slope; f ≤ μs N.',
  scheme: [['Three forces named: mg, N perpendicular to the plane, f up the slope', 1], ['N = mg cos θ and f = mg sin θ at rest', 1], ['f ≤ μs N gives tan θ ≤ μs, equality at the angle of repose', 1]],
  d: 3, c: 'understanding', t: [3],
}));

// ================================================================ t04 uniform circular motion, level and banked roads
add('circ-mcq', mcq({
  stem: 'A stone tied to a string is whirled at constant speed in a horizontal circle on a smooth table. The speed is now doubled with the same radius. The tension in the string becomes',
  right: '4 times',
  wrong: ['2 times', '8 times', 'the same'],
  sol: 'The tension supplies the centripetal force, T = mv²/r, which varies as the square of the speed at fixed r and m; doubling v multiplies T by 4 — option (@K).',
  d: 2, c: 'application', t: [4],
}), () => { const T = (v) => (0.3 * v * v) / 0.9; return near(T(8) / T(4), 4, 1e-12) || 'circ'; });
add('bank-mcq', mcq({
  stem: 'A car of mass m takes a curve at exactly the design speed on a frictionless road banked at angle θ. The net force on the car is',
  right: 'mg tan θ, horizontal and directed towards the centre of the curve',
  wrong: ['mg sin θ, down the slope', 'zero, because the speed is constant', 'mg / cos θ, along the normal to the road'],
  sol: 'Only weight and the normal reaction act. N cos θ = mg and N sin θ = mv²/r, so the resultant is horizontal, towards the centre, of size N sin θ = mg tan θ — option (@K).',
  d: 3, c: 'application', t: [4],
}), () => { const m = 900; const th = rad(12); const N0 = (m * g) / C(th); return near(N0 * S(th), m * g * Tn(th), 1e-12) || 'bank'; });
add('lvl-mcq', mcq({
  stem: 'A scooter can just take a flat circular bend of radius R without skidding at a top speed v. On a similar road of radius 2R, with the same tyres and surface, the top speed is',
  right: '√2 × v',
  wrong: ['2v', 'v', 'v / √2'],
  sol: 'v max = √(μ r g), which varies as √r. Doubling the radius multiplies v max by √2 — option (@K).',
  d: 2, c: 'application', t: [4],
}), () => near(Math.sqrt(0.5 * g * 100) / Math.sqrt(0.5 * g * 50), Math.SQRT2, 1e-12) || 'lvl');
add('circ-ar', ar({
  a: 'A stone whirled at a steady speed in a horizontal circle on a string has a net force acting on it.',
  r: 'The net force on the stone is zero, because its speed does not change.',
  key: 'c',
  sol: 'A is true: the velocity changes direction, so there is an acceleration and hence a net force towards the centre. R is false: speed is constant but velocity is not, so the net force is not zero — option (c).',
  scheme: [['Correct option (c)', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('bank-ar', ar({
  a: 'A car taking a banked bend at the design speed needs no friction from the road, even if the road is icy.',
  r: 'At that speed the horizontal component of the normal reaction alone supplies the required centripetal force.',
  key: 'a',
  sol: 'Both are true and R explains A: at v = √(rg tanθ) the N sin θ already equals mv²/r, so friction is not needed — option (a).',
  scheme: [['Correct option (a)', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('ac-tf', tf({
  stem: 'During uniform circular motion the centripetal force on the body is at every instant perpendicular to its velocity.',
  key: 't',
  sol: 'True. The force points along the radius to the centre and the velocity is along the tangent, so they are at right angles and the speed does not change.',
  d: 2, c: 'understanding', t: [4],
}));
add('static-fill', fill({
  stem: 'On a flat bend, the force that keeps a bus moving in its circular path is the ___ friction between the tyres and the road.',
  acc: [['static', 'static (not sliding)']],
  sol: 'The tyres roll without slipping at the contact point, so the friction is static friction; it points to the centre.',
  d: 1, c: 'recall', t: [4],
}));
add('centri-match', match({
  marks: 2,
  stem: 'Match each situation in Column A with the force that supplies the centripetal force in Column B.',
  pairs: [
    ['A cart rounding a flat bend on dry ground', 'Static friction on the wheels'],
    ['A bucket of water whirled on a rope', 'Tension in the rope'],
    ['A communications satellite circling the Earth', 'Gravitational pull of the Earth'],
    ['A car on a frictionless banked road', 'Horizontal component of the normal reaction'],
  ],
  order: [1, 0, 2, 3],
  sol: 'Flat bend: static friction; whirled bucket: tension; satellite: gravity; frictionless banked road: the horizontal part of N.',
  d: 2, c: 'understanding', t: [4],
}));

const om = { r: 0.50, rev: 3.0 };
om.w = 2 * Math.PI * om.rev;
om.a = om.w ** 2 * om.r;
N('omega-num', {
  stem: 'A stone on a string moves in a horizontal circle of radius 0.50 m and completes 3.0 revolutions every second. Find its centripetal acceleration, in m/s².',
  val: Q3(om.a), unit: 'm/s²', marks: 2,
  sol: r`$\omega = 2\pi \times 3.0 = ${p3(om.w)}$ rad/s. $a_c = \omega^2 r = (${p3(om.w)})^2 \times 0.50 = ${p3(om.a)}$ m/s$^2$.`,
  scheme: [[`ω = 2π × 3.0 = ${p3(om.w)} rad s⁻¹`, 1], [`a = ω²r = ${p3(om.a)} m s⁻²`, 1]],
  d: 2, c: 'application', t: [4],
}, () => { const v = om.w * om.r; return near(v * v / om.r, om.a, 1e-9) || 'omega'; });
const tn = { m: 0.40, v: 6.0, r: 1.2 };
tn.T = (tn.m * tn.v ** 2) / tn.r;
N('tension-num', {
  stem: 'A 0.40 kg ball on a 1.2 m string is whirled in a horizontal circle on a smooth table at a steady 6.0 m/s. Find the tension in the string, in N.',
  val: Q3(tn.T), unit: 'N', marks: 2,
  sol: r`The tension is the only horizontal force, so $T = \dfrac{mv^2}{r} = \dfrac{0.40 \times 6.0^2}{1.2} = ${p3(tn.T)}$ N.`,
  scheme: [['T = mv²/r', 1], [`T = ${p3(tn.T)} N`, 1]],
  d: 2, c: 'application', t: [4],
}, () => near(tn.T, 12, 1e-12) || 'tension');
const lv = { r: 80, mu: 0.60 };
lv.v = Math.sqrt(lv.mu * g * lv.r);
lv.kmh = lv.v * 3.6;
N('level-num', {
  stem: `A car rounds a flat circular bend of radius ${lv.r} m. The coefficient of static friction between tyres and road is ${lv.mu.toFixed(2)}. Find the greatest speed at which it can take the bend without skidding, in km/h. (g = ${g} m/s².)`,
  val: Q3(lv.kmh), unit: 'km/h', marks: 2,
  sol: r`$\dfrac{mv^2}{r} = \mu_s mg$ gives $v = \sqrt{\mu_s r g} = \sqrt{${lv.mu} \times ${lv.r} \times ${g}} = ${p3(lv.v)}$ m/s. In km/h: $${p3(lv.v)} \times 3.6 = ${p3(lv.kmh)}$ km/h.`,
  scheme: [[`v = √(μs r g) = ${p3(lv.v)} m s⁻¹`, 1], [`Converted: ${p3(lv.kmh)} km h⁻¹`, 1]],
  d: 3, c: 'application', t: [4],
}, () => { let v = 0; while ((v * v) / lv.r < lv.mu * g) v += 1e-5; return near(v * 3.6, lv.kmh, 1e-4) || 'level'; });
const ba = { v: 72, r: 200 };
ba.v0 = ba.v / 3.6;
ba.tan = ba.v0 ** 2 / (ba.r * g);
ba.th = deg(Math.atan(ba.tan));
N('bankangle-num', {
  stem: `A railway curve of radius ${ba.r} m is to be banked so that trains at ${ba.v} km/h need no sideways force from the rails. Find the angle of banking, in degrees. (g = ${g} m/s².)`,
  val: Q3(ba.th), unit: '°', marks: 2, tol: 0.1,
  sol: r`${ba.v} km/h $= ${ba.v0}$ m/s. With no friction, $\tan\theta = \dfrac{v^2}{rg} = \dfrac{${ba.v0 ** 2}}{${ba.r} \times ${g}} = ${p3(ba.tan)}$, so $\theta = ${p3(ba.th)}$°.`,
  scheme: [['tan θ = v²/rg with v = 20 m s⁻¹', 1], [`θ = ${p3(ba.th)}°`, 1]],
  d: 3, c: 'application', t: [4],
}, () => { const th = rad(ba.th); return near(Math.sqrt(ba.r * g * Tn(th)), ba.v0, 2e-3) || 'bankangle'; });
add('coinslip-short', short({
  marks: 2,
  stem: 'A coin rides on a turntable that is spun faster and faster until the coin flies off. Name the force that keeps the coin on its circle, and explain why the coin then leaves along a straight line.',
  model: 'Static friction between the coin and the turntable supplies the centripetal force. It has a limiting value, so beyond a certain spin rate it cannot supply the force that the circular path needs. With no sufficient inward force the coin keeps its own velocity, so it moves off along the tangent.',
  sol: 'Static friction is the centripetal force; at its limit the coin leaves along the tangent.',
  scheme: [['Static friction supplies the centripetal force, up to its limiting value', 1], ['When the needed inward force exceeds that limit, the coin continues along the tangent (first law)', 1]],
  d: 2, c: 'understanding', t: [4],
}));
const vb = { r: 60, th: 20, mu: 0.40 };
vb.v = bankLimit(vb.th, vb.mu, vb.r, 'max');
vb.num = vb.r * g * (vb.mu + Tn(rad(vb.th)));
vb.den = 1 - vb.mu * Tn(rad(vb.th));
vb.kmh = vb.v * 3.6;
N('vmaxbank-num', {
  stem: `A curve of radius ${vb.r} m is banked at ${vb.th}°, and the coefficient of static friction between tyres and road is ${vb.mu.toFixed(2)}. Find the greatest speed at which a car can take it without skidding outward, in m/s. (g = ${g} m/s², tan ${vb.th}° = ${p3(Tn(rad(vb.th)))}.)`,
  val: Q3(vb.v), unit: 'm/s', marks: 3,
  sol: r`At the greatest speed friction acts down the slope: $N\cos\theta - \mu N\sin\theta = mg$ and $N\sin\theta + \mu N\cos\theta = \dfrac{mv^2}{r}$. Dividing, $v^2 = rg\,\dfrac{\mu + \tan\theta}{1 - \mu\tan\theta} = ${vb.r} \times ${g} \times \dfrac{${p3(vb.mu + Tn(rad(vb.th)))}}{${p3(vb.den)}} = ${p3(vb.v ** 2)}$ m$^2$/s$^2$, so $v = ${p3(vb.v)}$ m/s.`,
  scheme: [['Friction down the slope: N cos θ − μN sin θ = mg and N sin θ + μN cos θ = mv²/r', 1], [`v² = rg(μ + tan θ)/(1 − μ tan θ) = ${p3(vb.v ** 2)} m² s⁻²`, 1], [`v = ${p3(vb.v)} m s⁻¹`, 1]],
  d: 4, c: 'application', t: [4],
}, () => near(Math.sqrt(vb.num / vb.den), vb.v, 1e-9) || 'vmaxbank');

add('skid-short', short({
  marks: 2,
  stem: 'Buses are advised to slow down at a sharp bend during heavy rain. Explain, using the limiting speed on a level bend, why.',
  model: r`On a level bend, static friction supplies the centripetal force, so the greatest safe speed is $v_\text{max} = \sqrt{\mu_s r g}$. Rain lowers $\mu_s$ between tyres and road, so $v_\text{max}$ falls; at the old speed the friction needed, $mv^2/r$, exceeds $\mu_s mg$ and the bus skids outward.`,
  sol: 'Lower μs gives a lower v max.',
  scheme: [['v max = √(μs r g); friction supplies the centripetal force', 1], ['Rain lowers μs and so v max; the old speed would make the bus skid', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('lean-short', short({
  marks: 2,
  stem: 'A cyclist leans inward while turning a bend on a level road. Explain why she must lean, and say what determines the angle she leans at.',
  model: r`The road’s total reaction (normal reaction plus friction) must pass through her centre of mass, and its horizontal part supplies the centripetal force $mv^2/r$ while its vertical part balances $mg$. It is therefore tilted inward from the vertical by an angle with $\tan\theta = v^2/rg$, so she leans more for a higher speed or a smaller radius.`,
  sol: 'tan θ = v²/rg.',
  scheme: [['Horizontal part of the road’s reaction supplies mv²/r, vertical part balances mg', 1], ['tan θ = v²/(rg): she leans more at higher speed or smaller radius', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('bank-derive', short({
  marks: 3,
  stem: 'A car travels at speed v on a circular road of radius r banked at angle θ. Show that no friction is needed when tan θ = v²/(rg).',
  model: r`With no friction only the weight $mg$ (down) and the normal reaction $N$ (perpendicular to the road, tilted towards the centre by $\theta$ from the vertical) act. Vertically: $N\cos\theta = mg$. Horizontally, towards the centre: $N\sin\theta = mv^2/r$. Dividing the second by the first gives $\tan\theta = \dfrac{v^2}{rg}$, independent of the mass of the car.`,
  sol: 'Resolve N vertically and horizontally and divide.',
  scheme: [['Only mg and N act; N is tilted θ from the vertical towards the centre', 1], ['N cos θ = mg and N sin θ = mv²/r', 1], ['Dividing: tan θ = v²/(rg), independent of mass', 1]],
  d: 3, c: 'understanding', t: [4],
}));
