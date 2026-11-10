// ISC 11 ch06 question bank, part 2: short answers of 2 marks (30–50 words) and 3 marks (50–80 words; derivations).
// Word counts exclude the maths, so each model answer carries its reasoning in words as well.
import { mk, add, r, dec, near } from '../../isc-11-physics-ch01/src/lib.mjs';
import { g, rad, deg, R6, slope, slopeCartesian, root, handleForce, stopDist } from './phys.mjs';

const { short } = mk;
const f = (x, n = 3) => dec(x, n);
const sn = (t) => Math.sin(rad(t));
const cs = (t) => Math.cos(rad(t));

// ================================================================ 2 marks
add('classical-short', short({
  marks: 2,
  stem: 'A student expects that polishing a surface will always reduce friction. State the classical view of friction that leads to this expectation, and one observation that the classical view fails to explain.',
  model: 'In the classical view, friction arises because the hills and hollows of the two surfaces interlock, so smoothing the surfaces should reduce the interlocking and the friction. The view cannot explain why extremely clean, highly polished surfaces pressed together can stick strongly and show greater friction.',
  sol: 'Interlocking picture, then the failure for very smooth surfaces.',
  scheme: [['Friction is due to interlocking of surface hills and hollows, so polishing should reduce it', 1], ['Fails for very clean polished surfaces, which show more friction (adhesion)', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('cold-short', short({
  marks: 2,
  stem: 'Using the modern view of friction, explain why limiting friction is proportional to the normal reaction but hardly depends on the apparent area of contact.',
  model: 'The surfaces touch only at tiny tips where the atoms adhere. A larger normal reaction flattens more tips, so the real area of contact, and the force to shear the junctions, grows in proportion to it. For a given load, a larger apparent area simply shares the load among more tips, leaving the real contact area unchanged.',
  sol: 'Real contact area is fixed by the load, not by the apparent area.',
  scheme: [['Real contact area grows in proportion to the normal reaction, so friction does too', 1], ['For a given load the real area is the same whatever the apparent area, so friction is independent of it', 1]],
  d: 3, c: 'understanding', t: [1, 2],
}));
const st = { fmax: 36, fk: 27, F: [14, 36, 48] };
add('static-short', short({
  marks: 2,
  stem: `A box on a floor has a limiting friction of ${st.fmax} N and a kinetic friction of ${st.fk} N. State the friction acting on it when it is pushed horizontally with (i) ${st.F[0]} N, (ii) ${st.F[1]} N and (iii) ${st.F[2]} N, giving a reason in each case.`,
  model: `(i) The box stays at rest, so static friction equals the push: ${st.F[0]} N. (ii) The push equals the limiting friction, so the friction is ${st.F[1]} N and the box is just about to slide. (iii) The push exceeds ${st.fmax} N, so the box slides and the friction falls to the kinetic value, ${st.fk} N.`,
  sol: 'Self-adjusting up to the limit, then kinetic friction.',
  scheme: [[`At rest, friction equals the push: ${st.F[0]} N and ${st.F[1]} N (the second is the limit)`, 1], [`Above the limit the box slides: friction is ${st.fk} N`, 1]],
  d: 2, c: 'application', t: [1],
}), () => {
  const fr = st.F.map((F) => (F <= st.fmax ? F : st.fk));
  return (fr[0] === 14 && fr[1] === 36 && fr[2] === 27) || 'static';
});
add('types-short', short({
  marks: 2,
  stem: 'A porter first drags a heavy trunk across a platform and then places it on a hand-cart. Name the kind of friction acting in each case and explain why the cart makes the work easier.',
  model: 'Dragging involves kinetic (sliding) friction, because the base of the trunk slides over the floor. On the cart the wheels roll without slipping, so rolling friction acts. No junctions are sheared at a rolling contact, so rolling friction is far smaller and a much smaller push is needed.',
  sol: 'Sliding versus rolling.',
  scheme: [['Dragging: kinetic (sliding) friction; on the cart: rolling friction', 1], ['Rolling friction is much smaller than sliding friction, so less push is needed', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('laws-short', short({
  marks: 2,
  stem: 'A teacher pulls a brick along a table, first on its broad face and then on its narrow face, and finds the same balance reading just before it slips. Name the law this shows and state one other law of limiting friction.',
  model: 'It shows that limiting friction is independent of the apparent area of contact. Another law is that limiting friction is directly proportional to the normal reaction, so f(max) = μs N. It also depends on the nature and roughness of the two surfaces, through the coefficient μs.',
  sol: 'Area-independence; proportional to N.',
  scheme: [['Limiting friction is independent of the apparent area of contact', 1], ['Limiting friction is proportional to the normal reaction (or depends on the nature of the surfaces)', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('mudef-short', short({
  marks: 2,
  stem: 'Define the coefficient of static friction and the coefficient of kinetic friction, and say why the second is smaller than the first for the same pair of surfaces.',
  model: 'The coefficient of static friction is the ratio of limiting friction to the normal reaction; the coefficient of kinetic friction is the ratio of sliding friction to the normal reaction. The kinetic value is smaller because, once the surfaces slide, junctions have less time to form, so less force keeps the motion going than was needed to start it.',
  sol: 'Two ratios; fewer junctions form while sliding.',
  scheme: [['μs = f(max)/N and μk = fk/N', 1], ['μk < μs: while sliding the junctions have less time to form, so kinetic friction is smaller than limiting friction', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('graph-short', short({
  marks: 2,
  stem: 'Describe the graph of friction against applied force for a block pushed on a table until it slides, naming its three parts.',
  model: 'For small pushes the graph is a straight line of slope one through the origin, since static friction equals the push. It ends at a peak, the limiting friction. The friction then drops to the smaller kinetic value, and the graph continues as a nearly horizontal line, because kinetic friction is almost constant.',
  sol: 'Static line, peak and drop, flat kinetic line.',
  scheme: [['Straight line of slope 1 (static friction equal to the push) up to a peak at the limiting friction', 1], ['Sudden fall to the kinetic value, then a nearly horizontal line', 1]],
  d: 2, c: 'understanding', t: [2],
}));
const nc = { m: 12, mu: 0.3, d1: 5, d2: 7 };
nc.f = nc.mu * nc.m * g;
nc.W1 = nc.f * nc.d1;
nc.W2 = nc.f * nc.d2;
add('nc-short', short({
  marks: 2,
  stem: `A ${nc.m} kg crate is dragged slowly over a rough floor from P to Q, first along a straight path of ${f(nc.d1, 2)} m and then along a path of ${f(nc.d2, 2)} m, with μk = ${nc.mu} and g = 9.8 m s⁻². Find the work done against friction along each path and state what the result shows about friction.`,
  model: `The friction is ${nc.mu} × ${nc.m} × 9.8 = ${f(nc.f, 4)} N on both paths. The work against it is ${f(nc.W1, 5)} J along ${f(nc.d1, 2)} m and ${f(nc.W2, 5)} J along ${f(nc.d2, 2)} m. The same end points give different work, so the work depends on the path and friction is a non-conservative force.`,
  sol: 'W = μk mg × path length on each path.',
  scheme: [[`f = μk mg = ${f(nc.f, 4)} N; work ${f(nc.W1, 5)} J and ${f(nc.W2, 5)} J`, 1], ['Work depends on the path, so friction is non-conservative', 1]],
  d: 3, c: 'application', t: [2],
}), () => {
  // integrate the friction force along each path in small steps
  const walk = (len) => { let w = 0; const dx = 1e-3; for (let x = 0; x < len; x += dx) w += (nc.mu * nc.m * g) * dx; return w; };
  return (near(walk(nc.d1), nc.W1, 1e-3) && near(walk(nc.d2), nc.W2, 1e-3)) || 'nc';
});
add('roller-short', short({
  marks: 2,
  stem: 'Explain why a lawn roller is easier to pull than to push when the handle makes the same angle with the ground.',
  model: 'Pulling with the handle above the ground gives the force an upward component, which partly lifts the roller, so the normal reaction is less than the weight. Pushing gives a downward component, so the normal reaction exceeds the weight. Friction is proportional to the normal reaction, so it is smaller when pulling and less force is needed.',
  sol: 'Vertical component of the handle force changes N.',
  scheme: [['Pulling: upward component, N = W − F sin φ, less than W; pushing: downward component, N = W + F sin φ', 1], ['Friction is proportional to N, so it is smaller when pulling', 1]],
  d: 2, c: 'understanding', t: [3],
}));
const ra = { m: 5, th: 20, mus: 0.6 };
Object.assign(ra, slope(ra.m, ra.th, ra.mus));
add('slope-rest-short', short({
  marks: 2,
  stem: `A ${ra.m} kg box rests on a rough plank inclined at ${ra.th}° (μs = ${ra.mus}, g = 9.8 m s⁻²). Find the friction acting on the box and say whether it equals μs N.`,
  model: `The box is at rest, so friction balances the weight component along the plank: f = mg sin ${ra.th}° = ${f(ra.along, 3)} N. The limiting value μs N = ${ra.mus} × ${f(ra.N, 4)} = ${f(ra.fric, 3)} N is larger, so friction does not equal μs N; static friction has adjusted itself to ${f(ra.along, 3)} N.`,
  sol: 'f = mg sin θ at rest; μs N is only the limit.',
  scheme: [[`f = mg sin ${ra.th}° = ${f(ra.along, 3)} N`, 1], [`μs N = ${f(ra.fric, 3)} N is the limit, greater than f: they are not equal`, 1]],
  d: 3, c: 'application', t: [3],
}), () => {
  const needed = ra.m * -slopeCartesian(ra.m, ra.th, 0, 0, -1).a;
  return (near(needed, ra.along, 1e-9) && needed < ra.fric) || 'rest';
});
add('defs-short', short({
  marks: 2,
  stem: 'Define the angle of friction and the angle of repose, and state the relation between them.',
  model: 'The angle of friction is the angle between the normal reaction and the resultant of the normal reaction and the limiting friction. The angle of repose is the steepest slope at which a body can stay at rest on an inclined plane. For the same pair of surfaces they are equal, since the tangent of each is μs.',
  sol: 'Two definitions and α = λ.',
  scheme: [['Angle of friction: between N and the resultant of N and limiting friction; angle of repose: steepest slope with the body at rest', 1], ['The two angles are equal (tan of each is μs)', 1]],
  d: 2, c: 'recall', t: [4],
}));
add('lube-short', short({
  marks: 2,
  stem: 'A cycle chain is oiled regularly. Explain how the oil reduces friction, and why a ball bearing in the wheel hub reduces it still further.',
  model: 'The oil forms a thin film between the metal links, so layers of liquid slide over each other instead of metal on metal, which gives much smaller friction. In a ball bearing the balls roll between the rings, so rolling friction replaces sliding friction, and rolling friction is smaller still.',
  sol: 'Fluid layers instead of solid contact; rolling instead of sliding.',
  scheme: [['The oil film keeps the metals apart, so liquid layers slide: far less friction', 1], ['In a ball bearing rolling friction replaces sliding friction, which is much smaller', 1]],
  d: 2, c: 'understanding', t: [4],
}));

// ================================================================ 3 marks
add('adhesion-short3', short({
  marks: 3,
  stem: 'Compare the classical view and the modern view of the origin of friction, stating for each the cause of friction and what it predicts for two very smooth, clean surfaces.',
  model: 'The classical view says friction comes from the interlocking of the hills and hollows of the two surfaces, so it predicts that smoother surfaces have less friction. The modern view says that the surfaces touch only at the tips of the highest hills, where atoms adhere by cold welding, and friction is the force to break these junctions. For clean smooth surfaces more atoms touch, so friction can increase, as observed.',
  sol: 'Cause and prediction for each view.',
  scheme: [['Classical view: interlocking of hills and hollows', 1], ['Modern view: adhesion (cold welding) at the few points of real contact', 1], ['Smooth clean surfaces: classical predicts less friction, modern predicts more, which is observed', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('repose-der-short3', short({
  marks: 3,
  stem: 'Define the angle of repose and show that its tangent is equal to the coefficient of static friction.',
  model: r`The angle of repose $\alpha$ is the steepest angle of an inclined plane at which a body can rest on it. At this angle the body is just about to slide, so friction is limiting. Along the plane, $mg\sin\alpha = \mu_s N$; perpendicular to it, $N = mg\cos\alpha$. Dividing the first equation by the second gives $\tan\alpha = \mu_s$.`,
  sol: 'Resolve along and perpendicular to the plane, then divide.',
  scheme: [['Angle of repose: the greatest slope at which the body stays at rest, friction limiting', 1], ['mg sin α = μs N and N = mg cos α', 1], ['Dividing: tan α = μs', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('down-der-short3', short({
  marks: 3,
  stem: 'A block slides down a rough inclined plane of angle θ. The coefficient of kinetic friction is μk. Derive an expression for its acceleration and show that it does not depend on the mass of the block.',
  model: r`Perpendicular to the plane there is no acceleration, so the normal reaction balances the component of the weight: $N = mg\cos\theta$. Kinetic friction $\mu_k N$ acts up the plane, against the motion. Along the plane, Newton’s second law gives $ma = mg\sin\theta - \mu_k mg\cos\theta$. Dividing by $m$, $a = g(\sin\theta - \mu_k\cos\theta)$. The mass cancels, so every block, heavy or light, has the same acceleration.`,
  sol: 'N from the perpendicular balance, then Newton’s second law along the plane.',
  scheme: [['N = mg cos θ; friction μk N acts up the plane', 1], ['ma = mg sin θ − μk mg cos θ', 1], ['a = g(sin θ − μk cos θ), independent of m', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('up-der-short3', short({
  marks: 3,
  stem: 'A block is pushed up a rough inclined plane of angle θ at constant speed by a force P acting along the plane. State the direction of friction and derive an expression for P.',
  model: r`The block moves up, so friction acts down the plane. Perpendicular to the plane, $N = mg\cos\theta$, so friction is $\mu mg\cos\theta$. At constant speed the forces along the plane balance: $P = mg\sin\theta + \mu mg\cos\theta$, so $P = mg(\sin\theta + \mu\cos\theta)$. The push beats both the weight component and friction.`,
  sol: 'Friction opposes the motion; balance along the plane.',
  scheme: [['Friction acts down the plane, of size μ N with N = mg cos θ', 1], ['P = mg sin θ + μ mg cos θ (zero net force)', 1], ['P = mg(sin θ + μ cos θ)', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('pull-der-short3', short({
  marks: 3,
  stem: 'A roller of weight W is pulled at constant speed on level ground by a force F along a handle making an angle φ above the horizontal. The coefficient of friction is μ. Derive an expression for F.',
  model: r`The pull has an upward vertical part $F\sin\varphi$, so the roller is partly lifted and the normal reaction is reduced to $N = W - F\sin\varphi$. Friction is $\mu N$. At constant speed the horizontal part of the pull equals the friction: $F\cos\varphi = \mu(W - F\sin\varphi)$. Collecting the terms in $F$ and solving gives $F = \dfrac{\mu W}{\cos\varphi + \mu\sin\varphi}$, where $W$ is the weight of the roller.`,
  sol: 'Vertical balance gives N; horizontal balance gives F.',
  scheme: [['N = W − F sin φ', 1], ['F cos φ = μ(W − F sin φ)', 1], ['F = μW / (cos φ + μ sin φ)', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('push-der-short3', short({
  marks: 3,
  stem: 'A roller of weight W is pushed at constant speed on level ground by a force F along a handle making an angle φ with the horizontal. The coefficient of friction is μ. Derive an expression for F and say why it exceeds the force needed to pull it.',
  model: r`The push has a downward vertical part $F\sin\varphi$, which presses the roller into the ground, so the normal reaction is $N = W + F\sin\varphi$. At constant speed the horizontal part of the push equals the friction: $F\cos\varphi = \mu(W + F\sin\varphi)$, giving $F = \dfrac{\mu W}{\cos\varphi - \mu\sin\varphi}$. The denominator is smaller than in the pulling case, so $F$ is larger, because pushing raises the normal reaction and friction.`,
  sol: 'Same balance as for a pull, with the sign of F sin φ reversed.',
  scheme: [['N = W + F sin φ for a push', 1], ['F cos φ = μ(W + F sin φ) gives F = μW / (cos φ − μ sin φ)', 1], ['Larger than for pulling: N and friction are greater', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('angfric-der-short3', short({
  marks: 3,
  stem: 'Define the angle of friction and show that the tangent of the angle of friction is equal to the coefficient of static friction.',
  model: r`The angle of friction $\lambda$ is the angle between the normal reaction $N$ and the resultant $R$ of $N$ and the limiting friction $f_{\max}$. The normal reaction and the friction act at right angles to each other, so they form a right-angled triangle with $R$, and $\tan\lambda = \dfrac{f_{\max}}{N}$. Since the limiting friction is $f_{\max} = \mu_s N$, we get $\tan\lambda = \mu_s$.`,
  sol: 'Right-angled triangle of N, f(max) and R.',
  scheme: [['λ: angle between N and the resultant R of N and limiting friction', 1], ['N and f(max) are perpendicular, so tan λ = f(max)/N', 1], ['f(max) = μs N, so tan λ = μs', 1]],
  d: 3, c: 'understanding', t: [4],
}));
const sk = { v: 8, mu: 0.4 };
sk.a = sk.mu * g;
sk.d = (sk.v * sk.v) / (2 * sk.a);
add('skid-short3', short({
  marks: 3,
  stem: `A cyclist riding at ${sk.v} m s⁻¹ on a level road locks both wheels and skids to rest. The coefficient of kinetic friction is ${sk.mu} and g = 9.8 m s⁻². Find the deceleration and the distance skidded, and state whether the distance depends on the mass of the cycle and rider.`,
  model: `Kinetic friction μk mg is the only horizontal force, so the deceleration is μk g = ${sk.mu} × 9.8 = ${f(sk.a, 3)} m s⁻². The distance is v² / 2a = ${sk.v * sk.v} / ${f(2 * sk.a, 3)} = ${f(sk.d, 3)} m. The mass cancels from the deceleration, so the distance does not depend on it.`,
  sol: 'a = μk g, then s = v²/2a.',
  scheme: [[`a = μk g = ${f(sk.a, 3)} m s⁻²`, 1], [`s = v²/2a = ${f(sk.d, 3)} m`, 1], ['The mass cancels, so the distance is independent of it', 1]],
  d: 3, c: 'application', t: [2],
}), () => (near(stopDist(sk.mu * g, sk.v), sk.d, 1e-3) && near(stopDist(sk.mu * g, sk.v), (sk.v * sk.v) / (2 * sk.mu * g), 1e-3)) || 'skid');
add('lubr-short3', short({
  marks: 3,
  stem: 'Describe three methods of reducing friction in machines and vehicles, saying in each case how friction is reduced.',
  model: 'Lubrication places an oil or grease film between the surfaces, so layers of liquid slide over each other instead of solid on solid. Ball or roller bearings replace sliding by rolling, which has much smaller friction. Streamlining gives a vehicle a smooth tapering shape, so air or water flows past easily and the drag is smaller.',
  sol: 'Lubrication, bearings, streamlining.',
  scheme: [['Lubrication: a fluid film separates the surfaces', 1], ['Ball or roller bearings: rolling instead of sliding', 1], ['Streamlining: a smooth tapering shape lowers the fluid drag', 1]],
  d: 2, c: 'understanding', t: [4],
}));
const gr = { m: 10, mus: 0.5, muk: 0.35 };
gr.N = gr.m * g;
gr.fmax = gr.mus * gr.N;
gr.fk = gr.muk * gr.N;
add('graph3-short3', short({
  marks: 3,
  stem: `A ${gr.m} kg block on a horizontal table is pulled by a horizontal force that is slowly increased from zero. The coefficients of friction are μs = ${gr.mus} and μk = ${gr.muk}, with g = 9.8 m s⁻². Find the limiting friction and the kinetic friction, and describe the graph of friction against applied force, marking these two values.`,
  model: `The normal reaction is ${f(gr.N, 3)} N, so the limiting friction is ${gr.mus} × ${f(gr.N, 3)} = ${f(gr.fmax, 3)} N and the kinetic friction is ${gr.muk} × ${f(gr.N, 3)} = ${f(gr.fk, 3)} N. The graph is a line at 45° from the origin to a peak at ${f(gr.fmax, 3)} N, a drop to ${f(gr.fk, 3)} N, and then a nearly horizontal line at that value.`,
  sol: 'N = mg; f(max) = μs N; fk = μk N; then the three parts.',
  scheme: [[`f(max) = μs N = ${f(gr.fmax, 3)} N`, 1], [`fk = μk N = ${f(gr.fk, 3)} N`, 1], ['Line of slope 1 to the peak, a drop, then a flat line at the kinetic value', 1]],
  d: 3, c: 'application', t: [2],
}), () => {
  const P1 = root((x) => slopeCartesian(gr.m, 0, gr.mus, x, 1).a, 0, 500);
  const P2 = root((x) => slopeCartesian(gr.m, 0, gr.muk, x, 1).a, 0, 500);
  return (near(P1, gr.fmax, 1e-6) && near(P2, gr.fk, 1e-6) && gr.fk < gr.fmax) || 'graph3';
});
const pd = { m: 8, th: 15, mu: 0.4 };
Object.assign(pd, slope(pd.m, pd.th, pd.mu));
add('hold-short3', short({
  marks: 3,
  stem: `A block of mass ${pd.m} kg rests on a rough slope of ${pd.th}° with μ = ${pd.mu}. Show that it does not slide by itself, and find the force along the slope, directed down the slope, needed to move it down at constant speed. Take g = 9.8 m s⁻².`,
  model: `Here tan ${pd.th}° = ${f(Math.tan(rad(pd.th)), 3)}, which is less than ${pd.mu}, so the block does not slide by itself. Moving down, friction acts up the slope: ${f(pd.fric, 4)} N, while the weight component down the slope is ${f(pd.along, 4)} N. The extra force is P = ${f(pd.fric, 4)} − ${f(pd.along, 4)} = ${f(-pd.down, 3)} N down the slope.`,
  sol: 'tan θ < μ; then balance along the slope with friction up.',
  scheme: [[`tan ${pd.th}° = ${f(Math.tan(rad(pd.th)), 3)} < ${pd.mu}: no sliding by itself`, 1], [`Friction ${f(pd.fric, 4)} N up the slope; weight component ${f(pd.along, 4)} N down`, 1], [`P = μ mg cos θ − mg sin θ = ${f(-pd.down, 3)} N`, 1]],
  d: 5, c: 'application', t: [3],
}), () => {
  const P = root((x) => slopeCartesian(pd.m, pd.th, pd.mu, -x, -1).a, 0, 200);
  return (Math.tan(rad(pd.th)) < pd.mu && near(P, -pd.down, 1e-6)) || 'holdshort';
});
const rr = { W: 300, F: 120, phi: 30, mu: 0.2 };
rr.Np = rr.W - rr.F * sn(rr.phi);
rr.Nq = rr.W + rr.F * sn(rr.phi);
add('rollnum-short3', short({
  marks: 3,
  stem: `A roller of weight ${rr.W} N is moved over level ground by a force of ${rr.F} N along its handle, which makes ${rr.phi}° with the ground, first by pulling and then by pushing. Find the normal reaction in each case and the friction on the roller if μ = ${rr.mu}.`,
  model: `The vertical part of the force is ${rr.F} sin ${rr.phi}° = ${f(rr.F * sn(rr.phi), 3)} N. Pulling, N = ${rr.W} − ${f(rr.F * sn(rr.phi), 3)} = ${f(rr.Np, 3)} N, so friction is ${rr.mu} × ${f(rr.Np, 3)} = ${f(rr.mu * rr.Np, 3)} N. Pushing, N = ${rr.W} + ${f(rr.F * sn(rr.phi), 3)} = ${f(rr.Nq, 3)} N, so friction is ${f(rr.mu * rr.Nq, 3)} N.`,
  sol: 'N = W ∓ F sin φ, then f = μN.',
  scheme: [[`Pulling: N = W − F sin φ = ${f(rr.Np, 3)} N`, 1], [`Pushing: N = W + F sin φ = ${f(rr.Nq, 3)} N`, 1], [`Friction μN: ${f(rr.mu * rr.Np, 3)} N when pulling and ${f(rr.mu * rr.Nq, 3)} N when pushing`, 1]],
  d: 3, c: 'application', t: [3],
}), () => {
  // net vertical force zero, using the complementary angle for the vertical component
  const fy = rr.F * Math.cos(rad(90 - rr.phi));
  return (near(rr.W - fy, rr.Np, 1e-9) && near(rr.W + fy, rr.Nq, 1e-9) && rr.Np < rr.W && rr.Nq > rr.W) || 'rollnum';
});
void deg; void R6; void handleForce; void cs;
