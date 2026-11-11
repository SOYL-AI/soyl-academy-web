// ISC 11 ch06 question bank, part 1: objective items (1 mark: MCQ, assertion-reason, true-false, fill-blank) and 1-3 mark numericals.
// Every numerical is computed here and re-solved by an independent `check` (a horizontal-vertical force solve, root finding on the net
// force, or a stepping integrator); solutions and schemes print the computed values.
// AR keys across the chapter: a (adh), b (kfric), c (area), d (work), a (pull), b (repose).
import { mk, add, r, dec, near } from '../../isc-11-physics-ch01/src/lib.mjs';
import { g, rad, deg, R6, slope, slopeCartesian, root, handleForce, stopDist, mn } from './phys.mjs';

const { mcq, ar, tf, fill, num } = mk;
const f = (x, n = 3) => dec(x, n);
const sn = (t) => Math.sin(rad(t));
const cs = (t) => Math.cos(rad(t));

// ================================================================ t01 views of friction; static, limiting, kinetic, rolling
add('modern-mcq', mcq({
  stem: 'Two clean steel blocks are pressed together and one is pulled across the other. According to the modern view of friction, the main origin of the resisting force is',
  right: 'adhesion (cold welding) at the few points where the surfaces really touch',
  wrong: ['interlocking of the visible grooves over the whole of the apparent area of contact', 'the gravitational attraction between the two blocks', 'the electric charge produced by rubbing the blocks together'],
  sol: 'The surfaces touch only at the tips of their highest hills. Under high pressure the atoms there stick together (cold welding), and friction is the force needed to break these junctions. Interlocking over the whole area is the classical picture.',
  d: 1, c: 'recall', t: [1],
}));
const sa = { fm: 215, F: 85 };
add('selfadj-mcq', mcq({
  stem: `A heavy almirah stands on a floor which can give it a greatest friction of ${sa.fm} N before it slides. A person pushes it horizontally with ${sa.F} N, and the almirah does not move. The friction acting on the almirah is`,
  right: `${sa.F} N`,
  wrong: [`${sa.fm} N`, `${sa.fm - sa.F} N`, 'zero, because the almirah is not moving'],
  scheme: [[`The almirah is at rest, so friction equals the push: ${sa.F} N (@K)`, 1]],
  sol: `Static friction adjusts itself to the applied force while the body is at rest, up to the limit of ${sa.fm} N. The push of ${sa.F} N is below the limit, so the friction is ${sa.F} N, balancing it.`,
  d: 2, c: 'application', t: [1],
}), () => {
  // net force zero at rest: friction = push as long as push does not exceed the limit
  const fr = Math.min(sa.F, sa.fm);
  return (near(fr, sa.F, 1e-12) && sa.F < sa.fm) || 'selfadj';
});
add('order-mcq', mcq({
  stem: 'For the same pair of surfaces, which list puts the three kinds of friction in increasing order of size?',
  right: 'rolling friction, kinetic friction, limiting static friction',
  wrong: ['limiting static friction, kinetic friction, rolling friction', 'kinetic friction, rolling friction, limiting static friction', 'rolling friction, limiting static friction, kinetic friction'],
  sol: 'Rolling friction is by far the smallest, kinetic friction is next, and limiting static friction (needed to start the sliding) is the largest.',
  d: 1, c: 'recall', t: [1],
}));
add('rolling-mcq', mcq({
  stem: 'A trunk is much easier to move on a hand-cart than to drag over the same floor. The main reason is that rolling friction is smaller than sliding friction because',
  right: 'at a rolling contact the surfaces do not slide, so adhesion junctions are not being sheared',
  wrong: ['the normal reaction on a rolling wheel is zero', 'a wheel makes the floor smoother as it turns', 'a rolling body has less weight than a sliding body'],
  sol: 'The part of a wheel touching the ground is momentarily at rest relative to it. No junctions are torn apart, and only the small loss from the slight flattening of wheel and floor remains.',
  d: 2, c: 'understanding', t: [1],
}));
add('polish-mcq', mcq({
  stem: 'Two metal blocks with extremely clean and highly polished faces cling together far more firmly than the same blocks with moderately rough faces. Which statement explains this best?',
  right: 'Polishing increases the real area of contact, so more atoms adhere across the interface',
  wrong: ['Polishing makes the hills and hollows interlock more deeply', 'Polishing increases the weight of each block', 'Polishing makes the coefficient of friction exactly zero'],
  sol: 'On the modern view friction comes from adhesion at the points of real contact. Smoothing the faces brings more of the surface into atomic contact, so friction can rise. The classical interlocking view would predict the opposite.',
  d: 3, c: 'analysis', t: [1],
}));

// ================================================================ t02 laws, coefficients, graph, non-conservative
add('coef-mcq', mcq({
  stem: 'The coefficient of kinetic friction between two surfaces',
  right: 'is a pure number, equal to the kinetic friction divided by the normal reaction',
  wrong: ['has the unit of force, since it is a force divided by a force per area', 'has the unit of force per unit area', 'is always larger than the coefficient of static friction for the same surfaces'],
  sol: 'μk = fk/N is a ratio of two forces, so it has no unit. For the same pair of surfaces it is smaller, not larger, than μs.',
  d: 1, c: 'recall', t: [2],
}));
add('graph-mcq', mcq({
  stem: 'A block is pushed along a table with a force that is slowly increased. In the graph of friction against applied force the friction suddenly falls at the point where the rising straight line ends. This is because',
  right: 'sliding has begun, and kinetic friction is smaller than limiting friction',
  wrong: ['the surface of the table suddenly becomes smoother', 'the normal reaction on the block has decreased', 'the applied force has been removed'],
  sol: 'The rising line is static friction, equal to the push. At its end the limiting value is reached and the block slides; the friction then drops to the smaller kinetic value μk N.',
  d: 2, c: 'understanding', t: [2],
}));
const dn1 = { m: 4, F: 14, k: 2 };
add('doubleN-mcq', mcq({
  stem: `A block of mass ${dn1.m} kg needs a horizontal pull of ${dn1.F} N to start sliding on a table. A second block of mass ${dn1.m} kg is now placed on top of it. The pull needed to start the pair sliding is`,
  right: `${dn1.F * dn1.k} N`,
  wrong: [`${dn1.F} N`, `${dn1.F * 1.5} N`, `${dn1.F * 4} N`],
  scheme: [[`N doubles, so the limiting friction doubles to ${dn1.F * dn1.k} N (@K)`, 1]],
  sol: `The limiting friction is μs N. The extra block doubles N and leaves μs unchanged, so the limiting friction, and the pull to overcome it, is ${dn1.k} × ${dn1.F} = ${dn1.F * dn1.k} N.`,
  d: 2, c: 'application', t: [2],
}), () => {
  // via the coefficient: mu_s from the first block, applied to the doubled normal reaction
  const mu = dn1.F / (dn1.m * g);
  return near(mu * (2 * dn1.m * g), dn1.F * dn1.k, 1e-9) || 'doubleN';
});
const fc1 = { a: 18, area: [200, 50] };
add('face-mcq', mcq({
  stem: `A brick has faces of 20 cm × 10 cm, 20 cm × 5 cm and 10 cm × 5 cm. Lying on its largest face on a table, it just begins to slide when pulled horizontally with ${f(fc1.a, 3)} N. The force needed to start it sliding when it lies on its smallest face is`,
  right: `${f(fc1.a, 3)} N`,
  wrong: [`${f(fc1.a / 4, 3)} N`, `${f(fc1.a / 2, 3)} N`, `${f(fc1.a * 4, 3)} N`],
  scheme: [[`Limiting friction does not depend on the area, so the force is still ${f(fc1.a, 3)} N (@K)`, 1]],
  sol: `The weight, and so the normal reaction, is the same on every face, and limiting friction is independent of the apparent area of contact. The force is therefore unchanged at ${f(fc1.a, 3)} N, although the smallest face has only one quarter of the area of the largest.`,
  d: 2, c: 'application', t: [2],
}), () => near(fc1.area[0] / fc1.area[1], 4, 1e-12) || 'face');
const sp = { v1: 0.5, v2: 1.5, T: 36 };
add('speed-mcq', mcq({
  stem: `A trolley is dragged over a rough floor at a steady ${sp.v1} m s⁻¹ by a horizontal rope whose tension is ${sp.T} N. It is then dragged at a steady ${sp.v2} m s⁻¹ over the same floor. The tension needed is about`,
  right: `${sp.T} N`,
  wrong: [`${sp.T * 3} N`, `${sp.T / 3} N`, `${sp.T * 2} N`],
  scheme: [[`Kinetic friction is nearly independent of speed, so about ${sp.T} N (@K)`, 1]],
  sol: `At a steady speed the tension equals the kinetic friction, μk N. Both μk and N are unchanged, and kinetic friction is nearly independent of speed, so the tension is again about ${sp.T} N.`,
  d: 3, c: 'application', t: [2],
}), () => {
  // coefficient from the first run, then the steady-pull force for the second run (the friction law has no speed in it)
  const mu = root((x) => slopeCartesian(2, 0, x, sp.T, 1).a, 0, 3);
  const T2 = root((x) => slopeCartesian(2, 0, mu, x, 1).a, 0, 500);
  return near(T2, sp.T, 1e-6) || 'speed';
});
add('work-mcq', mcq({
  stem: 'A box is dragged slowly over a rough floor from P to Q, first along a straight path and then along a longer curved path. The work done by kinetic friction on the box',
  right: 'is negative in both cases and larger in magnitude along the longer path',
  wrong: ['is the same along both paths, because the end points are the same', 'is positive in both cases, because friction helps to stop the box', 'is zero along the straight path and negative along the curved path'],
  sol: 'Kinetic friction has a constant magnitude and always opposes the displacement, so the work done is minus (μk N × path length). A longer path gives a larger negative work; the work depends on the path, so friction is non-conservative.',
  d: 3, c: 'understanding', t: [2],
}));
const mk1 = { m: 8, T: 23.5 };
mk1.mu = mk1.T / (mk1.m * g);
add('mukmeas-mcq', mcq({
  stem: `A block of mass ${mk1.m} kg is dragged at constant speed over a horizontal table by a horizontal pull of ${mk1.T} N. Taking g = 9.8 m s⁻², the coefficient of kinetic friction is`,
  right: f(mk1.mu, 2),
  wrong: [f(mk1.T / mk1.m, 3), f((mk1.m * g) / mk1.T, 3), f(2 * mk1.mu, 2)],
  scheme: [[`μk = T / mg = ${mk1.T} / ${f(mk1.m * g, 4)} = ${f(mk1.mu, 3)} ≈ ${f(mk1.mu, 2)} (@K)`, 1]],
  sol: `At constant speed the pull equals the kinetic friction, so μk = T/(mg) = ${mk1.T}/(${mk1.m} × 9.8) = ${f(mk1.mu, 3)}, which is ${f(mk1.mu, 2)} to two figures.`,
  d: 2, c: 'application', t: [2],
}), () => {
  // find the coefficient for which the net force on the dragged block is zero, by bisection on mu
  const m = mk1.m;
  const mu = root((x) => slopeCartesian(m, 0, x, mk1.T, 1).a, 0, 2);
  return near(mu, mk1.mu, 1e-6) || 'mukmeas';
});

// ================================================================ t03 incline; roller
const dw = { th: 30, mu: 0.2 };
dw.a = g * (sn(dw.th) - dw.mu * cs(dw.th));
add('down-mcq', mcq({
  stem: `A block slides down a plank inclined at ${dw.th}° to the horizontal. The coefficient of kinetic friction between block and plank is ${dw.mu}. Taking g = 9.8 m s⁻², the acceleration of the block is`,
  right: `${f(dw.a, 2)} m s⁻²`,
  wrong: [`${f(g * sn(dw.th), 2)} m s⁻²`, `${f(g * (sn(dw.th) + dw.mu * cs(dw.th)), 2)} m s⁻²`, `${f(g * (sn(dw.th) - dw.mu), 2)} m s⁻²`],
  scheme: [[`a = g(sin ${dw.th}° − ${dw.mu} cos ${dw.th}°) = ${f(dw.a, 3)} ≈ ${f(dw.a, 2)} m s⁻² (@K)`, 1]],
  sol: `Friction acts up the slope, so a = g(sin θ − μk cos θ) = 9.8(${f(sn(dw.th), 4)} − ${dw.mu} × ${f(cs(dw.th), 4)}) = ${f(dw.a, 3)} m s⁻². The wrong choices ignore friction, add it, or forget the factor cos θ.`,
  d: 2, c: 'application', t: [3],
}), () => {
  const res = slopeCartesian(2.5, dw.th, dw.mu, 0, -1); // moving down: a is along the slope, positive up
  return near(-res.a, dw.a, 1e-9) || 'down';
});
const nm = { m: 10, th: 60 };
nm.N = nm.m * g * cs(nm.th);
add('normal-mcq', mcq({
  stem: `A block of mass ${nm.m} kg rests on a rough slope inclined at ${nm.th}° to the horizontal. Taking g = 9.8 m s⁻², the normal reaction of the slope on the block is`,
  right: `${f(nm.N, 3)} N`,
  wrong: [`${f(nm.m * g, 3)} N`, `${f(nm.m * g * sn(nm.th), 3)} N`, 'zero, because the block is on a slope'],
  scheme: [[`N = mg cos ${nm.th}° = ${f(nm.N, 3)} N (@K)`, 1]],
  sol: `The component of the weight perpendicular to the slope is mg cos θ = ${nm.m} × 9.8 × cos ${nm.th}° = ${f(nm.N, 3)} N, and the normal reaction balances it.`,
  d: 1, c: 'application', t: [3],
}), () => {
  const res = slopeCartesian(nm.m, nm.th, 0.3, 0, -1);
  return near(res.N, nm.N, 1e-9) || 'normal';
});
add('pull-mcq', mcq({
  stem: 'A gardener moves a roller over a lawn at a steady speed, first pulling it and then pushing it, with the handle at the same angle above the ground and the same lawn. Which comparison is correct?',
  right: 'Pulling needs the smaller force, because the vertical part of the pull reduces the normal reaction',
  wrong: ['Pushing needs the smaller force, because it presses the roller on the lawn and helps it grip', 'Both need the same force, because the horizontal component is the same', 'Pulling needs the larger force, because part of the pull lifts the roller instead of moving it forward'],
  sol: 'Pulling, N = W − F sin φ; pushing, N = W + F sin φ. Friction is μN, so it is smaller when pulling, and F cos φ = μN then gives the smaller force.',
  d: 2, c: 'understanding', t: [3],
}));
const pu = { m: 20, th: 30, mu: 0.25 };
Object.assign(pu, slope(pu.m, pu.th, pu.mu));
add('pushup-mcq', mcq({
  stem: `A ${pu.m} kg drum is pushed up a ramp of ${pu.th}° at constant speed by a force along the ramp. The coefficient of friction is ${pu.mu} and g = 9.8 m s⁻². The force needed is`,
  right: `${f(pu.up, 3)} N`,
  wrong: [`${f(pu.along, 3)} N`, `${f(pu.down, 3)} N`, `${f(pu.along + pu.mu * pu.W, 3)} N`],
  scheme: [[`P = mg(sin ${pu.th}° + ${pu.mu} cos ${pu.th}°) = ${f(pu.up, 4)} ≈ ${f(pu.up, 3)} N (@K)`, 1]],
  sol: `Friction acts down the slope, so P = mg sin θ + μ mg cos θ = ${f(pu.along, 4)} + ${f(pu.fric, 4)} = ${f(pu.up, 4)} N. The wrong choices ignore friction, subtract it, or use μ mg without cos θ.`,
  d: 3, c: 'application', t: [3],
}), () => {
  const P = root((x) => slopeCartesian(pu.m, pu.th, pu.mu, x, 1).a, 0, 2000);
  return near(P, pu.up, 1e-6) || 'pushup';
});
const hd = { m: 6, th: 30, mus: 0.7 };
Object.assign(hd, slope(hd.m, hd.th, hd.mus));
add('hold-mcq', mcq({
  stem: `A ${hd.m} kg block rests on a plank inclined at ${hd.th}°, and the coefficient of static friction is ${hd.mus}. Taking g = 9.8 m s⁻², the friction acting on the block is`,
  right: `${f(hd.along, 3)} N`,
  wrong: [`${f(hd.fric, 3)} N`, `${f(hd.N, 3)} N`, 'zero, because the block is at rest'],
  scheme: [[`At rest f = mg sin ${hd.th}° = ${f(hd.along, 3)} N (@K)`, 1]],
  sol: `tan ${hd.th}° = ${f(Math.tan(rad(hd.th)), 3)} is less than ${hd.mus}, so the block stays at rest and friction balances the weight component along the plank: f = mg sin θ = ${f(hd.along, 3)} N. The value μs N = ${f(hd.fric, 3)} N is only the limit.`,
  d: 3, c: 'analysis', t: [3],
}), () => {
  const ok = Math.tan(rad(hd.th)) < hd.mus; // stays at rest
  const need = hd.m * -slopeCartesian(hd.m, hd.th, 0, 0, -1).a; // friction needed = m times the smooth-slope acceleration
  return (ok && near(need, hd.along, 1e-9) && hd.along < hd.fric) || 'hold';
});
const pn = { W: 600, F: 200, phi: 30 };
pn.N = pn.W + pn.F * sn(pn.phi);
add('pushN-mcq', mcq({
  stem: `A roller of weight ${pn.W} N is pushed along level ground by a force of ${pn.F} N applied along its handle, which is at ${pn.phi}° to the ground. The normal reaction of the ground on the roller is`,
  right: `${f(pn.N, 3)} N`,
  wrong: [`${pn.W} N`, `${f(pn.W - pn.F * sn(pn.phi), 3)} N`, `${f(pn.W + pn.F * cs(pn.phi), 3)} N`],
  scheme: [[`N = W + F sin ${pn.phi}° = ${pn.W} + ${pn.F} × 0.5 = ${f(pn.N, 3)} N (@K)`, 1]],
  sol: `The push is directed downward along the handle, so its vertical component F sin φ = ${f(pn.F * sn(pn.phi), 3)} N adds to the weight: N = ${pn.W} + ${f(pn.F * sn(pn.phi), 3)} = ${f(pn.N, 3)} N.`,
  d: 3, c: 'application', t: [3],
}), () => {
  const downPart = pn.F * Math.cos(rad(90 - pn.phi)); // vertical component of the push, by the complementary angle
  return near(pn.W + downPart, pn.N, 1e-9) || 'pushN';
});

// ================================================================ t04 angles; reducing friction
const rp = { mus: 0.84 };
rp.alpha = deg(Math.atan(rp.mus));
add('repose-mcq', mcq({
  stem: `The coefficient of static friction between a box and a plank is ${rp.mus}. The plank is tilted slowly. The angle of the plank with the horizontal at which the box just begins to slide is closest to`,
  right: `${f(rp.alpha, 2)}°`,
  wrong: [`${f(deg(Math.asin(rp.mus)), 2)}°`, `${f(deg(Math.acos(rp.mus)), 2)}°`, `${f(deg(Math.atan(1 / rp.mus)), 2)}°`],
  scheme: [[`tan α = μs = ${rp.mus}, so α = ${f(rp.alpha, 3)}° ≈ ${f(rp.alpha, 2)}° (@K)`, 1]],
  sol: `At the angle of repose tan α = μs, so α = arctan ${rp.mus} = ${f(rp.alpha, 3)}°. The wrong choices use the sine, the cosine or the reciprocal of μs.`,
  d: 2, c: 'application', t: [4],
}), () => {
  const th = root((x) => slopeCartesian(1, x, rp.mus, 0, -1).a, 1, 80);
  return near(th, rp.alpha, 1e-6) || 'repose';
});
add('lube-mcq', mcq({
  stem: 'Engine oil reduces the friction between moving metal parts mainly because it',
  right: 'keeps the metal surfaces apart by a film, so that layers of liquid slide over each other',
  wrong: ['makes the two metals chemically identical', 'removes the normal reaction between the parts', 'increases the real area of contact between the surfaces'],
  sol: 'The oil film separates the solid surfaces. The friction is then that of liquid layers sliding over each other, which is far smaller than solid sliding on solid.',
  d: 1, c: 'recall', t: [4],
}));
add('stream-mcq', mcq({
  stem: 'Giving the front of a high-speed train a smooth, tapering shape mainly reduces',
  right: 'the drag of the air on the train',
  wrong: ['the rolling friction between the wheels and the rails', 'the weight of the train', 'the limiting friction at the brakes'],
  sol: 'Streamlining lets air flow smoothly past the vehicle, which lowers the fluid drag. It does not change the weight, the wheel–rail contact or the brakes.',
  d: 2, c: 'understanding', t: [4],
}));
add('massrepose-mcq', mcq({
  stem: 'A block of mass 2 kg and a block of mass 8 kg, made of the same wood, are placed on a plank which is tilted slowly. Which statement is correct?',
  right: 'Both blocks begin to slide at the same angle of the plank',
  wrong: ['The 8 kg block begins to slide first, because the component of its weight along the plank is larger', 'The 2 kg block begins to slide first, because the friction on it is smaller', 'The angle depends on the mass, so it cannot be predicted'],
  sol: 'Sliding begins when mg sin θ = μs mg cos θ, that is tan θ = μs. The mass cancels, so both the weight component and the greatest friction scale together and the angle of repose is the same for both blocks.',
  d: 3, c: 'analysis', t: [4],
}));

// ================================================================ assertion-reason
add('adh-ar', ar({
  a: 'Two extremely clean, highly polished metal surfaces pressed together can show more friction than the same surfaces when moderately rough.',
  r: 'Friction arises from adhesion at the points of real contact, and polishing increases the real area of contact.',
  key: 'a',
  sol: 'A is true. R is true and explains it: on the modern view friction is the force needed to break the adhesion junctions, and smoother faces bring more atoms into contact, so the friction can rise.',
  d: 3, c: 'understanding', t: [1],
}));
add('kfric-ar', ar({
  a: 'The friction on a block that is sliding is usually less than the friction just before the block begins to slide.',
  r: 'Rolling friction is smaller than sliding friction for the same pair of surfaces.',
  key: 'b',
  sol: 'A is true: μk is less than μs, so fk is less than the limiting friction. R is also true, but it compares rolling with sliding; it says nothing about why sliding friction is less than limiting friction, so it is not the explanation.',
  d: 3, c: 'analysis', t: [1, 2],
}));
add('area-ar', ar({
  a: 'A brick pulled along a table on its broad face and on its narrow face needs the same force to start sliding.',
  r: 'Limiting friction is directly proportional to the apparent area of contact.',
  key: 'c',
  sol: 'A is true: limiting friction depends on the normal reaction and the nature of the surfaces, not on the apparent area. R is false, because that is exactly what the law of friction denies.',
  d: 3, c: 'analysis', t: [2],
}));
add('work-ar', ar({
  a: 'The work done by kinetic friction on a sliding block is positive.',
  r: 'Kinetic friction acts in the direction opposite to the displacement of the block.',
  key: 'd',
  sol: 'A is false: the force is opposite to the displacement, so the work is negative, equal to −μk N times the path length. R is true.',
  d: 2, c: 'understanding', t: [2],
}));
add('pull-ar', ar({
  a: 'A roller is easier to pull than to push when the handle makes the same angle with the ground.',
  r: 'The vertical component of the pull reduces the normal reaction, whereas the vertical component of the push increases it.',
  key: 'a',
  sol: 'A is true. R is true and explains it: pulling gives N = W − F sin φ and pushing gives N = W + F sin φ, so friction, which equals μN, is smaller when pulling and a smaller force is needed.',
  d: 2, c: 'analysis', t: [3],
}));
add('repose-ar', ar({
  a: 'A block of mass 5 kg and a block of mass 15 kg of the same material begin to slide at the same slope angle.',
  r: 'The component of the weight along the slope is larger for the heavier block.',
  key: 'b',
  sol: 'A is true: tan α = μs has no mass in it. R is also true, but the greatest friction is larger for the heavier block in the same proportion, so R alone does not explain A.',
  d: 3, c: 'analysis', t: [3, 4],
}));

// ================================================================ true-false and fill-blank
add('mu-tf', tf({
  stem: 'The coefficient of friction is a ratio of two forces, so it has no unit, and for some pairs of surfaces it can be greater than one.',
  key: 't',
  sol: 'True. μ = f/N is a ratio of two forces and carries no unit; very sticky pairs such as rubber on dry concrete have μ near or above 1.',
  d: 2, c: 'understanding', t: [2],
}));
add('static-tf', tf({
  stem: 'While a block is at rest on a rough table, the static friction on it is always equal to μs N.',
  key: 'f',
  sol: 'False. Static friction is self-adjusting: it equals the force trying to move the block. It equals μs N only at the point of sliding, when it is limiting.',
  d: 2, c: 'understanding', t: [1],
}));
add('angle-fill', fill({
  stem: 'The angle of repose of a pair of surfaces is equal to the angle of ___ between them.',
  acc: [['friction', 'the angle of friction']],
  sol: 'Both angles have the tangent μs, so the angle of repose equals the angle of **friction**.',
  d: 1, c: 'recall', t: [4],
}));
add('nonc-fill', fill({
  stem: 'The work done by friction depends on the path followed, so friction is called a ___ force.',
  acc: [['non-conservative', 'nonconservative', 'non conservative']],
  sol: 'A force whose work depends on the path is **non-conservative**.',
  d: 1, c: 'recall', t: [2],
}));

// ================================================================ numericals
const n1 = { m: 24, mus: 0.42 };
n1.fmax = n1.mus * n1.m * g;
add('fmax-num', num({
  stem: `The coefficient of static friction between a wooden chest of mass ${n1.m} kg and a floor is ${n1.mus}. Taking g = 9.8 m s⁻², find the limiting friction on the chest, in N.`,
  value: R6(n1.fmax), tol: 0.1, unit: 'N',
  sol: r`$f_{\max} = \mu_s N = \mu_s mg = ${n1.mus} \times ${n1.m} \times 9.8 = ${f(n1.fmax, 5)}$ N.`,
  scheme: [[`f(max) = μs mg = ${n1.mus} × ${n1.m} × 9.8 = ${f(n1.fmax, 4)} N`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => {
  const P = root((x) => slopeCartesian(n1.m, 0, n1.mus, x, 1).a, 0, 2000);
  return near(P, q.answer.value, 1e-4) || 'fmax';
});
const n2 = { m: 15, F: 62 };
n2.mus = n2.F / (n2.m * g);
add('mus-num', num({
  stem: `A box of mass ${n2.m} kg on a horizontal floor is on the verge of sliding when a horizontal force of ${n2.F} N is applied to it. Taking g = 9.8 m s⁻², find the coefficient of static friction.`,
  value: R6(n2.mus), tol: 0.005, unit: null,
  sol: r`$\mu_s = \dfrac{f_{\max}}{N} = \dfrac{${n2.F}}{${n2.m} \times 9.8} = \dfrac{${n2.F}}{${f(n2.m * g, 4)}} = ${f(n2.mus, 3)}$.`,
  scheme: [[`μs = f(max)/N = ${n2.F} / ${f(n2.m * g, 4)} = ${f(n2.mus, 3)}`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => {
  const mu = root((x) => slopeCartesian(n2.m, 0, x, n2.F, 1).a, 0, 3);
  return near(mu, q.answer.value, 1e-4) || 'mus';
});
const n3 = { v: 20, mu: 0.5 };
n3.a = n3.mu * g;
n3.d = (n3.v * n3.v) / (2 * n3.a);
add('stop-num', num({
  stem: `A car moving at ${n3.v} m s⁻¹ on a level road has its wheels locked by the brakes and skids to rest. The coefficient of kinetic friction between the tyres and the road is ${n3.mu}. Taking g = 9.8 m s⁻², find the distance covered while skidding, in m.`,
  value: R6(n3.d), tol: 0.2, unit: 'm', marks: 2,
  sol: r`The only horizontal force is kinetic friction, so $a = \mu_k g = ${n3.mu} \times 9.8 = ${f(n3.a, 3)}$ m s$^{-2}$ (deceleration). From $v^2 = u^2 - 2as$ with $v = 0$: $s = \dfrac{u^2}{2a} = \dfrac{${n3.v}^2}{2 \times ${f(n3.a, 3)}} = ${f(n3.d, 4)}$ m.`,
  scheme: [[`Deceleration a = μk g = ${f(n3.a, 3)} m s⁻²`, 1], [`s = u²/2a = ${n3.v * n3.v} / ${f(2 * n3.a, 3)} = ${f(n3.d, 4)} m`, 1]],
  d: 3, c: 'application', t: [2],
}), (q) => near(stopDist(n3.mu * g, n3.v), q.answer.value, 1e-3) || 'stop');
const n4 = { th: 25, mu: 0.18 };
n4.a = g * (sn(n4.th) - n4.mu * cs(n4.th));
add('down-num', num({
  stem: `A steel block slides down a plank inclined at ${n4.th}° to the horizontal. The coefficient of kinetic friction is ${n4.mu}. Taking g = 9.8 m s⁻², find the acceleration of the block, in m s⁻².`,
  value: R6(n4.a), tol: 0.02, unit: 'm s⁻²', marks: 2,
  sol: r`Along the slope $ma = mg\sin\theta - \mu_k mg\cos\theta$, so $a = g(\sin ${n4.th}^\circ - ${n4.mu}\cos ${n4.th}^\circ) = 9.8(${f(sn(n4.th), 4)} - ${f(n4.mu * cs(n4.th), 4)}) = ${f(n4.a, 4)}$ m s$^{-2}$.`,
  scheme: [[`a = g(sin θ − μk cos θ) with θ = ${n4.th}°`, 1], [`a = 9.8 × (${f(sn(n4.th), 4)} − ${f(n4.mu * cs(n4.th), 4)}) = ${f(n4.a, 3)} m s⁻²`, 1]],
  d: 3, c: 'application', t: [3],
}), (q) => near(-slopeCartesian(3, n4.th, n4.mu, 0, -1).a, q.answer.value, 1e-4) || 'down');
const n5 = { m: 55, th: 15, mu: 0.3 };
Object.assign(n5, slope(n5.m, n5.th, n5.mu));
add('up-num', num({
  stem: `A labourer pushes a drum of mass ${n5.m} kg up a ramp inclined at ${n5.th}° to the horizontal with a force along the ramp, so that the drum moves at constant speed. The coefficient of friction is ${n5.mu}. Taking g = 9.8 m s⁻², find the force, in N.`,
  value: R6(n5.up), tol: 1, unit: 'N', marks: 2,
  sol: r`At constant speed, $P = mg\sin\theta + \mu mg\cos\theta = ${f(n5.along, 4)} + ${f(n5.fric, 4)} = ${f(n5.up, 4)}$ N, with $mg = ${f(n5.W, 4)}$ N.`,
  scheme: [[`mg sin θ = ${f(n5.along, 4)} N and friction μ mg cos θ = ${f(n5.fric, 4)} N, down the slope`, 1], [`P = ${f(n5.along, 4)} + ${f(n5.fric, 4)} = ${f(n5.up, 4)} N`, 1]],
  d: 3, c: 'application', t: [3],
}), (q) => near(root((x) => slopeCartesian(n5.m, n5.th, n5.mu, x, 1).a, 0, 3000), q.answer.value, 1e-4) || 'up');
const n6 = { m: 40, mu: 0.25, phi: 35 };
n6.W = n6.m * g;
n6.push = (n6.mu * n6.W) / (cs(n6.phi) - n6.mu * sn(n6.phi));
n6.N = n6.W + n6.push * sn(n6.phi);
add('roller-num', num({
  stem: `A garden roller of mass ${n6.m} kg is pushed over a lawn at constant speed by a force along its handle, which makes ${n6.phi}° with the ground. The coefficient of friction between roller and lawn is ${n6.mu}. Taking g = 9.8 m s⁻², find the force needed, in N.`,
  value: R6(n6.push), tol: 1, unit: 'N', marks: 3,
  sol: r`Let the force be $F$. Vertically, $N = W + F\sin\varphi$; horizontally, $F\cos\varphi = \mu N$. So $F = \dfrac{\mu W}{\cos\varphi - \mu\sin\varphi} = \dfrac{${n6.mu} \times ${f(n6.W, 4)}}{${f(cs(n6.phi), 4)} - ${f(n6.mu * sn(n6.phi), 4)}} = ${f(n6.push, 4)}$ N.`,
  scheme: [[`N = W + F sin φ for a push, with W = ${f(n6.W, 4)} N`, 1], [`F cos φ = μ(W + F sin φ)`, 1], [`F = μW / (cos φ − μ sin φ) = ${f(n6.push, 4)} N`, 1]],
  d: 4, c: 'application', t: [3],
}), (q) => near(handleForce(n6.W, n6.mu, n6.phi, -1), q.answer.value, 1e-4) || 'roller');
const n7 = { m: 12, th: 40, mus: 0.35 };
Object.assign(n7, slope(n7.m, n7.th, n7.mus));
add('hold-num', num({
  stem: `A block of mass ${n7.m} kg is held on a plank inclined at ${n7.th}° to the horizontal by a force acting along the plank, directed up the plank, so that it is just on the verge of sliding down. The coefficient of static friction is ${n7.mus}. Taking g = 9.8 m s⁻², find the least force needed, in N.`,
  value: R6(n7.down), tol: 0.5, unit: 'N', marks: 3,
  sol: r`The block tends to slide down, so limiting friction acts up the plank. Balancing along the plank: $P + \mu_s mg\cos\theta = mg\sin\theta$, so $P = mg(\sin\theta - \mu_s\cos\theta) = ${f(n7.along, 4)} - ${f(n7.fric, 4)} = ${f(n7.down, 4)}$ N.`,
  scheme: [[`Limiting friction μs mg cos θ = ${f(n7.fric, 4)} N acts up the plank (tendency is down)`, 1], [`P + μs mg cos θ = mg sin θ with mg sin θ = ${f(n7.along, 4)} N`, 1], [`P = ${f(n7.along, 4)} − ${f(n7.fric, 4)} = ${f(n7.down, 4)} N`, 1]],
  d: 4, c: 'application', t: [3],
}), (q) => near(root((x) => slopeCartesian(n7.m, n7.th, n7.mus, x, -1).a, 0, 1000), q.answer.value, 1e-4) || 'hold');
const n8 = { r: 0.6, h: 0.24 };
n8.mu = n8.h / n8.r;
n8.alpha = deg(Math.atan(n8.mu));
add('repose-num', num({
  stem: `Dry grain poured from a funnel forms a conical heap of base radius ${n8.r} m and height ${n8.h} m. For a heap in equilibrium, tan α = h/r, where α is the angle of repose. Find the angle of repose, in degrees.`,
  value: R6(n8.alpha), tol: 0.1, unit: '°',
  sol: r`$\tan\alpha = \dfrac{h}{r} = \dfrac{${n8.h}}{${n8.r}} = ${f(n8.mu, 3)}$, so $\alpha = \arctan ${f(n8.mu, 3)} = ${f(n8.alpha, 4)}$ degrees. This is also $\arctan\mu_s$ for grain on grain.`,
  scheme: [[`tan α = ${n8.h}/${n8.r} = ${f(n8.mu, 3)}, so α = ${f(n8.alpha, 3)}°`, 1]],
  d: 2, c: 'application', t: [4],
}), (q) => near(root((x) => slopeCartesian(1, x, n8.mu, 0, -1).a, 1, 80), q.answer.value, 1e-5) || 'reposenum');
void mn;
