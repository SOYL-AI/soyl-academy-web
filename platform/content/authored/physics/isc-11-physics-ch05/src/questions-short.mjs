// ISC 11 ch05 question bank, part 2: short answers of 2 marks (30–50 words) and 3 marks (50–80 words; derivations).
// Word counts exclude the maths, so each model answer carries its reasoning in words as well as in symbols.
import { mk, add, r, dec, near } from '../../isc-11-physics-ch01/src/lib.mjs';
import { g, rad, deg, solveLin, impulseOf, lampLin } from './phys.mjs';

const { short } = mk;
const f = (x, n = 3) => String(+x.toPrecision(n));

// ================================================================ 2 marks
add('card-short', short({
  marks: 2,
  stem: 'A coin lies on a card that covers a tumbler. When the card is flicked sharply sideways, the coin drops into the tumbler. Explain this using Newton’s first law.',
  model: 'The coin is at rest and, by the first law, tends to stay at rest because no net horizontal force acts on it. The card slips out so quickly that friction has almost no time to move the coin sideways, so gravity pulls the coin straight down into the tumbler.',
  sol: 'Inertia of rest of the coin; card removed too fast for friction to act.',
  scheme: [['The coin tends to remain at rest (inertia of rest) since no appreciable horizontal force acts on it', 1], ['The card leaves too quickly for friction to move the coin; gravity makes it fall into the tumbler', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('law1-short', short({
  marks: 2,
  stem: 'State Newton’s first law of motion. A cyclist stops pedalling on a level road and slowly comes to rest. Does this contradict the law?',
  model: 'A body continues in its state of rest or of uniform motion in a straight line unless a net external force acts on it. There is no contradiction: the cyclist slows down because friction at the road and air drag are external forces that act on the cycle and change its velocity.',
  sol: 'State the law; friction and drag are the external forces.',
  scheme: [['Law: a body stays at rest or in uniform straight-line motion unless a net external force acts', 1], ['No contradiction: friction and air drag are external forces that slow the cycle', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('cart-short', short({
  marks: 2,
  stem: 'Why is a loaded handcart harder to start moving, and harder to stop, than the same cart when it is empty? Answer in terms of inertia and mass.',
  model: 'Inertia is the resistance of a body to a change in its state of rest or of motion, and its measure is the mass. The loaded cart has a larger mass and therefore a larger inertia, so the same force produces a smaller change in velocity, both in starting and in stopping it.',
  sol: 'More mass means more inertia, so less acceleration for the same force.',
  scheme: [['Inertia is resistance to a change of state, measured by mass', 1], ['The loaded cart has more mass, so a given force gives a smaller change of velocity when starting or stopping', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('newtondef-short', short({
  marks: 2,
  stem: 'Using the second law, define the newton and show that 1 N is the same as 1 kg m s⁻².',
  model: r`One newton is the force which gives a body of mass one kilogram an acceleration of one metre per second squared. From $F = ma$, $1\ \text{N} = (1\ \text{kg})(1\ \text{m s}^{-2}) = 1\ \text{kg m s}^{-2}$, so the newton is a derived unit built from the base units kilogram, metre and second.`,
  sol: 'Definition, then put the unit values into F = ma.',
  scheme: [['1 N is the force that gives 1 kg an acceleration of 1 m s⁻²', 1], ['1 N = (1 kg)(1 m s⁻²) = 1 kg m s⁻²', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('light-short', short({
  marks: 2,
  stem: 'State what happens to the measured mass of a particle as its speed approaches the speed of light, and say why F = dp/dt remains valid there although F = ma with a fixed mass does not.',
  model: 'The measured mass increases without limit as the speed approaches the speed of light. Then F = ma with a constant mass fails, because the mass is changing. The law that force equals the rate of change of momentum still holds, since momentum is defined for any mass.',
  sol: 'Mass grows, so only the momentum form of the law survives.',
  scheme: [['Measured mass increases without limit as v approaches c', 1], ['Mass is not constant, so F = ma fails; F = dp/dt, the rate of change of momentum, still holds', 1]],
  d: 2, c: 'understanding', t: [2],
}));
const sl1 = { m: 20, F: 80, th: 30 };
sl1.a = (sl1.F * Math.cos(rad(sl1.th))) / sl1.m;
sl1.N = sl1.m * g - sl1.F * Math.sin(rad(sl1.th));
add('sled-short', short({
  marks: 2,
  stem: `A girl pulls a ${sl1.m} kg sled on smooth ice with a rope making ${sl1.th}° with the horizontal, the force in the rope being ${sl1.F} N. Taking g = 9.8 m s⁻², find the acceleration of the sled and the normal reaction on it.`,
  model: r`Resolve the pull of the rope into a horizontal and a vertical component. Horizontally, $ma = F\cos${sl1.th}^\circ$, so $a = \dfrac{${sl1.F} \times ${f(Math.cos(rad(sl1.th)), 4)}}{${sl1.m}} = ${f(sl1.a)}\ \text{m s}^{-2}$. Vertically there is no acceleration, so $N = mg - F\sin${sl1.th}^\circ = ${f(sl1.m * g)} - ${f(sl1.F * Math.sin(rad(sl1.th)))} = ${f(sl1.N)}\ \text{N}$, less than the weight because the rope lifts the sled partly.`,
  sol: 'Resolve the pull into horizontal and vertical components.',
  scheme: [[`a = F cos ${sl1.th}°/m = ${f(sl1.a)} m s⁻²`, 1], [`N = mg − F sin ${sl1.th}° = ${f(sl1.N)} N`, 1]],
  d: 3, c: 'application', t: [2],
}), () => { const [a, N] = solveLin([[sl1.m, 0], [0, 1]], [sl1.F * Math.cos(rad(sl1.th)), sl1.m * g - sl1.F * Math.sin(rad(sl1.th))]); return near(a, sl1.a, 1e-9) && near(N, sl1.N, 1e-9) && near(sl1.a, 3.4641, 1e-4) && near(sl1.N, 156, 1e-9) || 'sled'; });
add('mat-short', short({
  marks: 2,
  stem: 'A high jumper lands on a thick foam mat instead of hard ground. Use the idea of impulse to explain why the mat reduces the risk of injury.',
  model: 'The jumper has to lose all of the same momentum, so the impulse on the body is the same on the mat as on the ground. The soft mat compresses and makes the stopping time much longer, so the average force, impulse divided by time, is much smaller.',
  sol: 'Same impulse over a longer time means a smaller force.',
  scheme: [['The change of momentum, hence the impulse, is the same in both landings', 1], ['The mat increases the stopping time, so the average force F = Δp/Δt is smaller', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('momcons-short', short({
  marks: 2,
  stem: 'State the law of conservation of linear momentum and the condition under which it holds for a system of colliding bodies.',
  model: 'The total linear momentum of a system stays constant, in magnitude and direction, if no net external force acts on it. For colliding bodies this means an isolated system: the forces between the bodies change their individual momenta, but the total before and after the collision is the same.',
  sol: 'Law and condition (no net external force).',
  scheme: [['Total linear momentum of an isolated system remains constant', 1], ['Condition: no net external force; internal forces only redistribute momentum', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('weightnormal-short', short({
  marks: 2,
  stem: 'A book rests on a table. Why are the weight of the book and the normal reaction of the table on the book not an action–reaction pair? Name the reaction to the weight.',
  model: 'An action–reaction pair acts on two different bodies. The weight and the normal reaction both act on the same body, the book, and they only happen to balance. The reaction to the weight of the book is the gravitational pull of the book on the Earth, directed upward.',
  sol: 'Both forces act on the book; the pair partner acts on the Earth.',
  scheme: [['Both forces act on the same body (the book), but a third-law pair acts on different bodies', 1], ['Reaction to the weight: the book’s gravitational pull on the Earth, upward', 1]],
  d: 3, c: 'analysis', t: [3, 4],
}));
add('fbd-short', short({
  marks: 2,
  stem: 'A block rests on a smooth horizontal table and is pulled by a horizontal light string that passes over a pulley at the edge of the table. List the forces in the free-body diagram of the block, giving the direction of each.',
  model: 'Three forces act on the block. Its weight mg acts vertically downward. The normal reaction of the table acts vertically upward, perpendicular to the surface, and balances the weight. The tension of the string acts horizontally, along the string and towards the pulley. There is no friction on a smooth table.',
  sol: 'Weight, normal reaction, tension: nothing else.',
  scheme: [['Weight mg downward and normal reaction N upward, perpendicular to the table', 1], ['Tension T horizontal along the string, towards the pulley; no other force on a smooth table', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('tensionsame-short', short({
  marks: 2,
  stem: 'In a problem on connected bodies, why can the tension be taken as the same throughout a light string passing over a smooth pulley?',
  model: 'A light string has negligible mass, so the net force on any small piece of it must be nearly zero, otherwise it would have a huge acceleration. The tensions at its two ends of the piece are therefore equal. A smooth pulley has no friction, so it does not change the tension.',
  sol: 'Massless string and frictionless pulley.',
  scheme: [['Massless string: net force on any element is zero, so the tension is the same along it', 1], ['A smooth (frictionless) pulley transmits the tension unchanged', 1]],
  d: 3, c: 'understanding', t: [4],
}));
const ld2 = { m: 55, a: 1.2 };
ld2.Nd = ld2.m * (g - ld2.a);
ld2.N0 = ld2.m * g;
add('liftdown-short', short({
  marks: 2,
  stem: `A ${ld2.m} kg person stands on a weighing machine in a lift. Taking g = 9.8 m s⁻², find the reading of the machine (in newtons) when the lift accelerates downward at ${ld2.a} m s⁻², and when it moves upward at constant velocity.`,
  model: r`Apply the second law to the person, taking downward as positive: $mg - N = ma$, so $N = m(g - a) = ${ld2.m} \times (9.8 - ${ld2.a}) = ${f(ld2.Nd)}\ \text{N}$ while the lift accelerates downward. At constant velocity the acceleration is zero, so $N = mg = ${ld2.m} \times 9.8 = ${f(ld2.N0)}\ \text{N}$, which is the true weight of the person.`,
  sol: 'N = m(g − a) when accelerating down; N = mg at constant velocity.',
  scheme: [[`Accelerating down: N = m(g − a) = ${f(ld2.Nd)} N`, 1], [`Constant velocity: N = mg = ${f(ld2.N0)} N`, 1]],
  d: 2, c: 'application', t: [4],
}), () => near(ld2.m * g - ld2.m * ld2.a, ld2.Nd, 1e-9) && near(ld2.Nd, 473.0, 1e-3) && near(ld2.N0, 539, 1e-9) || 'liftdown');
add('equil2-short', short({
  marks: 2,
  stem: 'State the two conditions that must be satisfied for a rigid body to be in equilibrium under a set of coplanar forces.',
  model: r`First, the vector sum of all the forces on the body must be zero, $\sum\vec{F} = 0$, so that it has no translational acceleration. Second, the sum of the torques of the forces about any point must be zero, so that the body has no angular acceleration and does not start to turn.`,
  sol: 'Zero resultant force and zero resultant torque.',
  scheme: [['Resultant force is zero (no translational acceleration)', 1], ['Resultant torque about any point is zero (no rotation)', 1]],
  d: 2, c: 'recall', t: [5],
}));
add('lamistate-short', short({
  marks: 2,
  stem: 'State Lami’s theorem for three concurrent forces in equilibrium, and say which angle goes with each force in the ratio.',
  model: r`If three concurrent forces keep a particle in equilibrium, each force is proportional to the sine of the angle between the other two: $\dfrac{F_1}{\sin\alpha} = \dfrac{F_2}{\sin\beta} = \dfrac{F_3}{\sin\gamma}$. Here $\alpha$ lies between $F_2$ and $F_3$, $\beta$ between $F_3$ and $F_1$, and $\gamma$ between $F_1$ and $F_2$.`,
  sol: 'Each force over the sine of the angle opposite it, between the other two.',
  scheme: [['Each force is proportional to the sine of the angle between the other two', 1], ['F₁/sin α = F₂/sin β = F₃/sin γ with α between F₂ and F₃ and so on', 1]],
  d: 1, c: 'recall', t: [5],
}));

// ================================================================ 3 marks
add('fma-short3', short({
  marks: 3,
  stem: 'Starting from the second law in the form F = dp/dt, derive F = ma for a body of constant mass, and use it to define the newton.',
  model: r`The second law states that the net force equals the rate of change of momentum, $F = \dfrac{dp}{dt}$. For a body of constant mass $p = mv$, and the constant $m$ can be taken outside the derivative, so $F = \dfrac{d(mv)}{dt} = m\dfrac{dv}{dt} = ma$, because $\dfrac{dv}{dt}$ is the acceleration. One newton is then the force that gives a mass of one kilogram an acceleration of one metre per second squared.`,
  sol: 'Put p = mv, take m outside, then define the unit.',
  scheme: [['F = dp/dt with p = mv', 1], ['m is constant: F = m dv/dt = ma', 1], ['1 N = force giving 1 kg an acceleration of 1 m s⁻²', 1]],
  d: 2, c: 'understanding', t: [2],
}));
const ib = { m: 0.4, v: 18, t: 0.01 };
ib.J = ib.m * ib.v;
ib.F = ib.J / ib.t;
add('kick-short3', short({
  marks: 3,
  stem: `A footballer kicks a stationary ${ib.m} kg ball, which leaves the boot at ${ib.v} m s⁻¹. The contact lasts ${ib.t} s. Show that the impulse of the force equals the change in momentum, and find the impulse and the average force.`,
  model: r`For a constant force, $F = \dfrac{\Delta p}{\Delta t}$, so the impulse $F\Delta t = \Delta p$, the change in momentum of the body. The ball starts from rest, so its change in momentum is its final momentum, and $\Delta p = mv - 0 = ${ib.m} \times ${ib.v} = ${f(ib.J)}\ \text{N s}$, which is the impulse. The average force is $F = \dfrac{\Delta p}{\Delta t} = \dfrac{${f(ib.J)}}{${ib.t}} = ${f(ib.F)}\ \text{N}$.`,
  sol: 'Impulse = change in momentum; then divide by the contact time.',
  scheme: [['Impulse FΔt = Δp from F = Δp/Δt', 1], [`Impulse = ${ib.m} × ${ib.v} = ${f(ib.J)} N s`, 1], [`F = ${f(ib.J)}/${ib.t} = ${f(ib.F)} N`, 1]],
  d: 3, c: 'application', t: [3],
}), () => near(impulseOf(() => ib.F, 0, ib.t), ib.m * ib.v, 1e-6) && near(ib.F, 720, 1e-9) || 'kick');
add('cons-short3', short({
  marks: 3,
  stem: 'Starting from the second law, show that the total linear momentum of an isolated system of two particles is constant.',
  model: r`For the system of two particles with momenta $\vec{p}_1$ and $\vec{p}_2$, the second law gives the net external force as the rate of change of the total momentum, $\vec{F}_{\text{ext}} = \dfrac{d(\vec{p}_1 + \vec{p}_2)}{dt}$. In an isolated system no external force acts, so $\vec{F}_{\text{ext}} = 0$. Hence $\dfrac{d\vec{P}}{dt} = 0$, and $\vec{P} = \vec{p}_1 + \vec{p}_2$ is constant.`,
  sol: 'Second law for the system with zero external force.',
  scheme: [['Second law for the system: F_ext = d(p₁ + p₂)/dt', 1], ['Isolated system: F_ext = 0, so dP/dt = 0', 1], ['Therefore P = p₁ + p₂ is constant (conserved)', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('third-short3', short({
  marks: 3,
  stem: 'Two bodies A and B interact only with each other. Using the conservation of linear momentum, show that the force on A due to B is equal and opposite to the force on B due to A.',
  model: r`The pair is isolated, so the total momentum is constant, $\vec{p}_A + \vec{p}_B = \text{constant}$. Differentiating with time gives $\dfrac{d\vec{p}_A}{dt} + \dfrac{d\vec{p}_B}{dt} = 0$. By the second law each rate of change of momentum is the force on that body, so $\vec{F}_{\text{on A}} = -\vec{F}_{\text{on B}}$. These are equal and opposite, acting on different bodies: Newton's third law.`,
  sol: 'Differentiate p_A + p_B = constant and read off the forces.',
  scheme: [['Isolated pair: p_A + p_B = constant', 1], ['Differentiate: dp_A/dt = −dp_B/dt', 1], ['By the second law F on A = −F on B: the third law', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('recoil-short3', short({
  marks: 3,
  stem: 'A gun of mass M fires a bullet of mass m with velocity v. Derive the recoil velocity of the gun and show that the kinetic energy of the gun is smaller than that of the bullet by the factor m/M.',
  model: r`Before firing the total momentum is zero. The forces between gun and bullet are internal, so the momentum is conserved and stays zero: $0 = mv + MV$ and $V = -\dfrac{m}{M}v$. The gun recoils opposite to the bullet. For the energies, the kinetic energy of the gun is $\tfrac{1}{2}MV^2 = \tfrac{1}{2}M\dfrac{m^2v^2}{M^2} = \dfrac{m}{M}\left(\tfrac{1}{2}mv^2\right)$, which is the fraction $\dfrac{m}{M}$ of the bullet's kinetic energy.`,
  sol: 'Conserve momentum from rest, then substitute V into the energy.',
  scheme: [['0 = mv + MV by conservation of momentum', 1], ['V = −mv/M, opposite to the bullet', 1], ['K_gun = ½MV² = (m/M)(½mv²), so K_gun/K_bullet = m/M', 1]],
  d: 3, c: 'application', t: [3],
}), () => { const m = 0.02; const M = 4; const v = 400; const V = (m * v) / M; return near((0.5 * M * V * V) / (0.5 * m * v * v), m / M, 1e-9) || 'recoil3'; });
add('atwood-short3', short({
  marks: 3,
  stem: 'Masses m₁ and m₂ (m₁ > m₂) hang from the ends of a light string passing over a smooth pulley. Derive expressions for the acceleration of the masses and for the tension in the string.',
  model: r`On each mass only its weight and the tension of the string act. Both masses have acceleration $a$, $m_1$ downward and $m_2$ upward, and the string has the same tension $T$. Applying the second law to each mass, for $m_1$: $m_1g - T = m_1a$. For $m_2$: $T - m_2g = m_2a$. Adding eliminates $T$: $a = \dfrac{(m_1 - m_2)g}{m_1 + m_2}$. Substituting in the second equation, $T = m_2(g + a) = \dfrac{2m_1m_2g}{m_1 + m_2}$.`,
  sol: 'One equation for each mass; add, then substitute back.',
  scheme: [['m₁g − T = m₁a and T − m₂g = m₂a (same a and T)', 1], ['Adding: a = (m₁ − m₂)g/(m₁ + m₂)', 1], ['T = m₂(g + a) = 2m₁m₂g/(m₁ + m₂)', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('lift-short3', short({
  marks: 3,
  stem: 'Derive an expression for the apparent weight of a person of mass m in a lift that accelerates upward with acceleration a. What does the weighing machine read when the lift accelerates downward with acceleration g?',
  model: r`The forces on the person are the weight $mg$ downward and the normal reaction $N$ of the floor upward; $N$ is what the machine reads. Taking upward as positive, $N - mg = ma$, so the apparent weight is $N = m(g + a)$, greater than $mg$. For a downward acceleration $a$ the same working gives $N = m(g - a)$, so for $a = g$ the reading is zero.`,
  sol: 'Newton’s second law for the person with upward positive.',
  scheme: [['Forces: weight mg down, N up; N − mg = ma', 1], ['N = m(g + a): apparent weight is larger for an upward acceleration', 1], ['Downward acceleration: N = m(g − a), which is zero for a = g', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('contact-short3', short({
  marks: 3,
  stem: 'A force F pushes a block of mass m₁ that is in contact with a block of mass m₂ on a smooth floor, m₁ being behind. Derive expressions for the acceleration and for the force exerted by m₁ on m₂.',
  model: r`The blocks move together, so treat them as one body of mass $m_1 + m_2$ acted on by $F$: $a = \dfrac{F}{m_1 + m_2}$. The only horizontal force on $m_2$ is the contact force $F_c$ from $m_1$, so $F_c = m_2a = \dfrac{m_2}{m_1 + m_2}F$. By the third law $m_2$ pushes back on $m_1$ with an equal force, so for $m_1$, $F - F_c = m_1a$.`,
  sol: 'Whole system for a, then the front block alone for the contact force.',
  scheme: [['Both blocks together: F = (m₁ + m₂)a, a = F/(m₁ + m₂)', 1], ['Front block alone: contact force F_c = m₂a', 1], ['F_c = m₂F/(m₁ + m₂); third-law partner on m₁ gives F − F_c = m₁a', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('lami-short3', short({
  marks: 3,
  stem: 'State Lami’s theorem and prove it from the triangle of forces.',
  model: r`If three concurrent forces $F_1$, $F_2$, $F_3$ are in equilibrium, each is proportional to the sine of the angle between the other two. By the triangle law the forces form a closed triangle, whose sides are proportional to the forces. The sine rule says each side is proportional to the sine of the opposite angle, which is the supplement of the angle between the other two forces, with the same sine. Hence $\dfrac{F_1}{\sin\alpha} = \dfrac{F_2}{\sin\beta} = \dfrac{F_3}{\sin\gamma}$.`,
  sol: 'Sine rule on the closed force triangle; supplementary angles have equal sines.',
  scheme: [['Statement: each force is proportional to the sine of the angle between the other two', 1], ['The forces form a closed triangle (triangle law); apply the sine rule to it', 1], ['The angle opposite a side is the supplement of the angle between the other forces, with the same sine: F₁/sin α = F₂/sin β = F₃/sin γ', 1]],
  d: 3, c: 'understanding', t: [5],
}));
add('ladderfbd-short3', short({
  marks: 3,
  stem: 'A uniform ladder rests with its foot on the ground and its top against a smooth wall. Name the forces on the ladder, give the direction of each, and explain why the ground must exert a horizontal force on the foot.',
  model: 'The weight acts vertically downward at the middle of the ladder. The smooth wall exerts a normal reaction only, horizontal and away from the wall, at the top. At the foot the ground exerts a vertical normal reaction upward and a horizontal force towards the wall. Without the horizontal ground force nothing would balance the wall reaction, so the ladder would slide.',
  sol: 'Weight, wall reaction, two ground components; horizontal balance.',
  scheme: [['Weight at the middle (down); wall reaction at the top, horizontal and away from the wall', 1], ['At the foot: normal reaction upward and a horizontal force towards the wall', 1], ['The horizontal ground force is needed to balance the wall reaction; otherwise the ladder slides', 1]],
  d: 3, c: 'analysis', t: [5],
}));
const tr = { x: 30, y: 40 };
tr.F = Math.hypot(tr.x, tr.y);
tr.ang = deg(Math.atan2(tr.y, tr.x));
add('tri-short3', short({
  marks: 3,
  stem: `Forces of ${tr.x} N due east and ${tr.y} N due north act on a particle together with a third force F, and the particle stays in equilibrium. Find the magnitude and direction of F.`,
  model: r`For equilibrium the three forces must add up to zero, so the third force must be equal and opposite to the resultant of the other two. Since the given forces are perpendicular, their resultant has magnitude $\sqrt{${tr.x}^2 + ${tr.y}^2} = ${f(tr.F)}\ \text{N}$, at $\theta = \tan^{-1}\dfrac{${tr.y}}{${tr.x}} = ${f(tr.ang, 4)}^\circ$ north of east. So $F = ${f(tr.F)}\ \text{N}$, directed ${f(tr.ang, 4)}° south of west.`,
  sol: 'F = minus the resultant of the other two forces.',
  scheme: [['F must be equal and opposite to the resultant of the other two', 1], [`Resultant = √(${tr.x}² + ${tr.y}²) = ${f(tr.F)} N`, 1], [`Direction: tan⁻¹(${tr.y}/${tr.x}) = ${f(tr.ang, 4)}°, so F is ${f(tr.ang, 4)}° south of west`, 1]],
  d: 2, c: 'application', t: [5],
}), () => { const [fx, fy] = solveLin([[1, 0], [0, 1]], [-tr.x, -tr.y]); return near(Math.hypot(fx, fy), tr.F, 1e-9) && near(deg(Math.atan2(-fy, -fx)), tr.ang, 1e-9) && near(tr.F, 50, 1e-9) || 'tri'; });
add('tablehang-short3', short({
  marks: 3,
  stem: 'A block of mass m₁ lies on a smooth horizontal table and is joined by a light string over a smooth pulley to a mass m₂ hanging freely. Derive the acceleration of the system and the tension in the string.',
  model: r`Both masses have the same acceleration $a$ and the string has one tension $T$. On the table the only horizontal force on $m_1$ is $T$, so $T = m_1a$. For the hanging mass the weight is larger than the tension, so $m_2g - T = m_2a$. Adding the two equations, $m_2g = (m_1 + m_2)a$, so $a = \dfrac{m_2g}{m_1 + m_2}$ and $T = m_1a = \dfrac{m_1m_2g}{m_1 + m_2}$.`,
  sol: 'Separate equations for each body; add to eliminate T.',
  scheme: [['T = m₁a for the block on the table; m₂g − T = m₂a for the hanging mass', 1], ['Adding: a = m₂g/(m₁ + m₂)', 1], ['T = m₁a = m₁m₂g/(m₁ + m₂)', 1]],
  d: 3, c: 'understanding', t: [4],
}));
const ip = { m: 8, th: 25 };
ip.a = g * Math.sin(rad(ip.th));
ip.N = ip.m * g * Math.cos(rad(ip.th));
add('incline-short3', short({
  marks: 3,
  stem: `A block of mass ${ip.m} kg slides down a smooth plane inclined at ${ip.th}° to the horizontal. Name the forces on it, and find its acceleration and the normal reaction. Take g = 9.8 m s⁻².`,
  model: r`Only two forces act on the block: the weight $mg$ downward and the normal reaction $N$ perpendicular to the plane. Choose axes along and perpendicular to the plane. Perpendicular to the plane there is no acceleration, so $N = mg\cos${ip.th}^\circ = ${f(ip.m * g)} \times ${f(Math.cos(rad(ip.th)), 4)} = ${f(ip.N)}\ \text{N}$. Along the plane $mg\sin${ip.th}^\circ = ma$, so $a = g\sin${ip.th}^\circ = ${f(ip.a)}\ \text{m s}^{-2}$ down the slope.`,
  sol: 'Axes along and perpendicular to the plane.',
  scheme: [['Forces: weight mg and normal reaction N only', 1], [`Perpendicular: N = mg cos ${ip.th}° = ${f(ip.N)} N`, 1], [`Along the plane: a = g sin ${ip.th}° = ${f(ip.a)} m s⁻²`, 1]],
  d: 2, c: 'application', t: [4],
}), () => { const [a, N] = solveLin([[ip.m, 0], [0, 1]], [ip.m * g * Math.sin(rad(ip.th)), ip.m * g * Math.cos(rad(ip.th))]); return near(a, ip.a, 1e-9) && near(N, ip.N, 1e-9) && near(ip.a, 4.1417, 1e-3) || 'incline'; });
add('rigid-short3', short({
  marks: 3,
  stem: 'Show that three non-parallel coplanar forces can keep a rigid body in equilibrium only if their lines of action meet at one point.',
  model: r`Let the lines of action of two of the forces meet at a point P. Take torques about P: these two forces have zero torque about P, because their lines pass through it. For equilibrium the total torque must be zero, so the third force must also have zero torque about P, which means its line of action passes through P. So all three lines of action meet at one point.`,
  sol: 'Take torques about the intersection of two lines of action.',
  scheme: [['Two non-parallel lines of action meet at a point P', 1], ['Torque about P: these two forces contribute nothing, so the third must have no torque either', 1], ['Hence the third line of action passes through P: the three are concurrent', 1]],
  d: 4, c: 'analysis', t: [5],
}));
