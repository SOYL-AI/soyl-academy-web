// ISC 11 ch05 notes (one section per syllabus topic) and 30 flashcards.
import { T, unit, PROV, r, dec } from '../../isc-11-physics-ch01/src/lib.mjs';
import { V, EX, plotPT, plotAM, plotGamma, TABLES } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const { e1, e2, e3, RC, inc, tb, at, ct, lf, lp, ld } = EX;
const f = (x, n = 3) => dec(x, n);

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Newton’s Laws of Motion — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Force and inertia; Newton’s first law',
      r`- A **force** is a push or a pull that changes, or tends to change, the state of rest or of uniform motion of a body, or its shape.
- **First law (law of inertia):** a body continues in its state of rest or of uniform motion in a straight line unless a net external force acts on it. It gives the qualitative meaning of force.
- **Inertia** is the property by which a body resists a change in its state of rest or of uniform motion; **mass** is its measure. A larger mass means a larger inertia.
- Kinds: inertia of **rest** (passengers jerk backward when a train starts), of **motion** (passengers lurch forward when a bus brakes), of **direction** (thrown outward at a sharp turn).
- Inertia is a property, not a force. Friction and air drag are the forces that make bodies on Earth come to rest.`,
      [kt('Force', 'A push or a pull that changes, or tends to change, the state of rest or motion of a body.'), kt('Inertia', 'The property of a body to resist a change in its state of rest or of uniform motion.'), kt('Mass', 'The measure of inertia; a scalar, SI unit kg.')],
      [fm(r`\sum\vec{F} = 0 \;\Rightarrow\; \vec{v} = \text{constant}`, 'First law')],
      TABLES.T_INERTIA,
      [1],
      [TABLES.T_FIRST],
    ),
    sec(
      '2. Momentum; the second law F = dp/dt and F = ma; mass near the speed of light',
      r`- **Linear momentum** $\vec{p} = m\vec{v}$: a vector along $\vec{v}$; SI unit kg m s⁻¹ (= N s); dimensions [M L T⁻¹].
- **Second law:** the rate of change of momentum is proportional to the net force and takes place along it: $\vec{F} = \dfrac{d\vec{p}}{dt}$. The average force over $\Delta t$ is $\Delta\vec{p}/\Delta t$.
- For **constant mass**, $\vec{F} = m\dfrac{d\vec{v}}{dt} = m\vec{a}$. One **newton** is the force that gives 1 kg an acceleration of 1 m s⁻²: 1 N = 1 kg m s⁻².
- **Components:** $\sum F_x = ma_x$ and $\sum F_y = ma_y$, solved separately. Example: a ${e1.m} kg crate pulled by ${e1.F} N at ${e1.th}° on a smooth floor has $a = ${f(e1.ax)}$ m s⁻² and $N = ${f(e1.Nr)}$ N.
- **Idea only:** as v approaches c the measured mass increases without limit, so no body can reach c; F = ma with constant m fails there, but F = dp/dt still holds.`,
      [kt('Linear momentum', 'The product of mass and velocity; a vector.'), kt('Newton', 'The force that gives a mass of 1 kg an acceleration of 1 m s⁻².'), kt('Average force', 'Change in momentum divided by the time taken.')],
      [fm(r`\vec{p} = m\vec{v}`, 'Momentum'), fm(r`\vec{F} = \dfrac{d\vec{p}}{dt}`, 'Second law (general form)'), fm(r`\vec{F} = m\vec{a}`, 'Constant mass'), fm(r`\sum F_x = ma_x,\ \sum F_y = ma_y`, 'Components')],
      plotPT,
      [2],
      [plotAM, plotGamma, TABLES.T_MOM, TABLES.T_E1],
    ),
    sec(
      '3. Impulse; conservation of linear momentum; the third law; recoil',
      r`- **Impulse** $\vec{J} = \vec{F}\Delta t = \Delta\vec{p}$ (average force); for a varying force it is the **area under the F–t graph**. Unit N s = kg m s⁻¹. A long stopping time means a small force: catching a ${e2.m} kg ball at ${e2.v} m s⁻¹ needs ${f(e2.J)} N s, giving ${f(e2.F1)} N in ${e2.t1} s but ${f(e2.F2)} N in ${e2.t2} s.
- **Conservation of momentum:** for an isolated system the net external force is zero, so $d\vec{P}/dt = 0$ and the total momentum is constant: $m_1u_1 + m_2u_2 = m_1v_1 + m_2v_2$ (along a line, with signs).
- **Third law from conservation:** for two bodies interacting only with each other, $d\vec{p}_A/dt + d\vec{p}_B/dt = 0$, so the force on A is equal and opposite to the force on B. The forces act on **different bodies** at the same time and do not cancel.
- **Recoil:** from rest, $0 = mv + MV$, so $V = -mv/M$; the momenta are equal and opposite while the kinetic energies are in the ratio $m : M$. A ${e3.M} kg rifle firing ${e3.m} kg at ${e3.v} m s⁻¹ recoils at ${f(e3.V)} m s⁻¹. For the gun in the figure V = ${RC.V} m s⁻¹.`,
      [kt('Impulse', 'Force multiplied by the time it acts; equal to the change in momentum.'), kt('Isolated system', 'A system on which no net external force acts.'), kt('Action–reaction pair', 'Two equal and opposite forces that two bodies exert on each other; they act on different bodies.'), kt('Recoil', 'The backward motion of a gun when it fires, from conservation of momentum.')],
      [fm(r`\vec{J} = \vec{F}\Delta t = \Delta\vec{p}`, 'Impulse'), fm(r`m_1\vec{u}_1 + m_2\vec{u}_2 = m_1\vec{v}_1 + m_2\vec{v}_2`, 'Conservation of momentum'), fm(r`\vec{F}_{\text{on A}} = -\vec{F}_{\text{on B}}`, 'Third law'), fm(r`V = -\dfrac{m}{M}v`, 'Recoil')],
      V.impulse,
      [3],
      [TABLES.T_CATCH, TABLES.T_CONS, V.pair, V.recoil, TABLES.T_RIFLE],
    ),
    sec(
      '4. Free-body diagrams, tension, normal reaction; connected bodies',
      r`- A **free-body diagram** shows one body and only the forces on it: weight $mg$ down, **normal reaction** $N$ perpendicular to the surface, **tension** $T$ along a string, applied forces. Then $\sum F = ma$ along each axis.
- A light string over a smooth pulley has the same tension throughout. Bodies on one string have the same acceleration.
- **Smooth incline:** $N = mg\cos\theta$, $a = g\sin\theta$ (for ${inc.m} kg at ${inc.th}°: $N = ${f(inc.N)}$ N, $a = ${f(inc.a)}$ m s⁻²).
- **Table and hanging mass:** $a = \dfrac{m_2g}{m_1 + m_2}$, $T = \dfrac{m_1m_2g}{m_1 + m_2}$ (${tb.m1} kg and ${tb.m2} kg: ${f(tb.a)} m s⁻², ${f(tb.T)} N).
- **Atwood machine (one pulley):** $a = \dfrac{(m_1 - m_2)g}{m_1 + m_2}$, $T = \dfrac{2m_1m_2g}{m_1 + m_2}$ (${at.m1} kg and ${at.m2} kg: ${f(at.a)} m s⁻², ${f(at.T, 4)} N). Two-pulley systems are not required.
- **Blocks in contact:** $a = F/(m_1 + m_2)$ and contact force $m_2a$ (here ${f(ct.Fc)} N).
- **Lift:** $N = m(g \pm a)$; $+$ accelerating up, $-$ accelerating down; zero when the cable snaps (${lf.m} kg: ${f(lf.Nup)} N, ${f(lf.Nrest)} N, ${f(lf.Ndown)} N).`,
      [kt('Free-body diagram', 'A diagram of one body showing only the forces acting on it.'), kt('Normal reaction', 'The contact force perpendicular to a surface; it adjusts to what is needed.'), kt('Tension', 'The pull along a string; the same throughout a light string over a smooth pulley.'), kt('Apparent weight', 'The normal reaction on a body in an accelerating frame, as read by a weighing machine.')],
      [fm(r`a = \dfrac{(m_1 - m_2)g}{m_1 + m_2},\quad T = \dfrac{2m_1m_2g}{m_1 + m_2}`, 'Atwood machine'), fm(r`a = \dfrac{m_2g}{m_1 + m_2},\quad T = \dfrac{m_1m_2g}{m_1 + m_2}`, 'Table and hanging mass'), fm(r`N = m(g \pm a)`, 'Lift'), fm(r`F_c = \dfrac{m_2}{m_1 + m_2}F`, 'Contact force')],
      V.table,
      [4],
      [V.incline, V.atwood, V.contact, V.lift, TABLES.T_FBD],
    ),
    sec(
      '5. Equilibrium of concurrent forces; three coplanar forces on a rigid body; the ladder',
      r`- **Concurrent forces** in equilibrium: $\sum\vec{F} = 0$. **Triangle law:** three such forces drawn head to tail close a triangle (a polygon for more). **Parallelogram law:** the third force is equal and opposite to the diagonal of the parallelogram on the other two. **Resolution:** $\sum F_x = 0$, $\sum F_y = 0$.
- **Lami’s theorem:** each force is proportional to the sine of the angle between the other two. A lamp of ${lp.W} N on strings at ${lp.al}° and ${lp.be}° to the ceiling: $T_1 = ${f(lp.T1)}$ N, $T_2 = ${f(lp.T2)}$ N.
- **Rigid body:** $\sum\vec{F} = 0$ and the sum of torques about any point $= 0$. Three non-parallel coplanar forces keep it in equilibrium only if their lines of action meet at one point; three parallel forces need the middle one opposite to the others.
- **Ladder** (length $L$, weight $W$, angle $\theta$, smooth wall): $N_f = W$, $F_f = N_w$, torques about the foot give $N_w = \dfrac{W}{2}\cot\theta$. A ${ld.L} m ladder of ${ld.m} kg at ${ld.th}°: $N_w = F_f = ${f(ld.Nw)}$ N, $N_f = ${f(ld.Nf)}$ N. The floor horizontal force is just a reaction component found from equilibrium; its limit comes with friction.`,
      [kt('Concurrent forces', 'Forces whose lines of action meet at a point.'), kt('Lami’s theorem', 'For three concurrent forces in equilibrium, each is proportional to the sine of the angle between the other two.'), kt('Torque', 'The turning effect of a force about a point; force times perpendicular distance.'), kt('Smooth wall', 'A wall that exerts only a reaction perpendicular to itself.')],
      [fm(r`\dfrac{F_1}{\sin\alpha} = \dfrac{F_2}{\sin\beta} = \dfrac{F_3}{\sin\gamma}`, 'Lami’s theorem'), fm(r`T_1 = \dfrac{W\cos\beta}{\sin(\alpha + \beta)},\ T_2 = \dfrac{W\cos\alpha}{\sin(\alpha + \beta)}`, 'Lamp on two strings'), fm(r`N_w = \dfrac{W}{2}\cot\theta`, 'Ladder on a smooth wall')],
      V.ladder,
      [5],
      [V.lamp, TABLES.T_LAMI, TABLES.T_RIGID, TABLES.T_LADDER],
    ),
  ],
  exam_tips_md: `- Law, formula, working, units: each earns marks. In F = dp/dt the force is the net force; for F = ma the mass is constant.
- Derivations to learn: F = ma from F = dp/dt; conservation of momentum (no external force); the third law from conservation; the Atwood machine; N = m(g ± a) in a lift; Lami's theorem; N_w = (W/2) cot θ for the ladder.
- Draw a separate free-body diagram for each body and mark the positive direction. Tension and acceleration are the same for bodies on one light string.
- Action and reaction act on different bodies, so they never cancel; weight and the normal reaction are not such a pair.
- Give signs to velocities in rebound and recoil problems. Use kg and m s⁻¹ (not grams) in newton calculations.
- Ladder: take torques about the foot; the wall reaction is horizontal for a smooth wall.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'State Newton’s first law.', 'A body stays at rest or in uniform motion in a straight line unless a net external force acts on it.', 'concept', 1),
    fc(2, 'What is inertia, and what measures it?', 'The property of resisting a change in the state of rest or uniform motion; it is measured by mass.', 'concept', 1),
    fc(3, 'Name the three kinds of inertia.', 'Of rest, of motion and of direction.', 'concept', 1),
    fc(4, 'Why do standing passengers lurch forward when a bus brakes?', 'Their bodies tend to keep moving at the old velocity (inertia of motion) while the bus slows.', 'example', 1),
    fc(5, 'Define linear momentum. Unit?', '$\\vec{p} = m\\vec{v}$, a vector; kg m s⁻¹ (equal to N s).', 'formula', 2),
    fc(6, 'Write Newton’s second law in its general form.', '$\\vec{F} = \\dfrac{d\\vec{p}}{dt}$: the net force equals the rate of change of momentum.', 'formula', 2),
    fc(7, 'How does F = ma follow from F = dp/dt?', 'For constant mass, $\\dfrac{d(m\\vec{v})}{dt} = m\\dfrac{d\\vec{v}}{dt} = m\\vec{a}$.', 'concept', 2),
    fc(8, 'Define the newton.', 'The force that gives a mass of 1 kg an acceleration of 1 m s⁻²; 1 N = 1 kg m s⁻².', 'concept', 2),
    fc(9, 'How is $\\vec{F} = m\\vec{a}$ used with components?', 'Resolve forces along two perpendicular axes: $\\sum F_x = ma_x$ and $\\sum F_y = ma_y$, solved separately.', 'concept', 2),
    fc(10, 'What does the slope of a momentum–time graph give?', 'The net force on the body.', 'concept', 2),
    fc(11, 'What happens to the measured mass of a particle as v approaches c? (idea only)', 'It increases without limit, so no body can reach c; F = dp/dt still holds.', 'concept', 2),
    fc(12, 'Define impulse. Unit?', '$\\vec{J} = \\vec{F}\\Delta t = \\Delta\\vec{p}$; N s (= kg m s⁻¹). For a varying force, the area under the F–t graph.', 'formula', 3),
    fc(13, 'Why does a fielder draw the hands back while catching?', 'The change in momentum is fixed; a longer stopping time gives a smaller average force.', 'example', 3),
    fc(14, 'State the law of conservation of linear momentum.', 'The total linear momentum of an isolated system (no net external force) stays constant.', 'concept', 3),
    fc(15, 'Write conservation of momentum for two bodies in a line.', '$m_1u_1 + m_2u_2 = m_1v_1 + m_2v_2$, with signs for directions.', 'formula', 3),
    fc(16, 'How does the third law follow from conservation of momentum?', 'For two bodies alone, $dp_A/dt + dp_B/dt = 0$, so the force on A is equal and opposite to the force on B.', 'concept', 3),
    fc(17, 'Why do action and reaction not cancel each other?', 'They act on different bodies.', 'concept', 3),
    fc(18, 'Recoil velocity of a gun from rest?', '$V = -\\dfrac{m}{M}v$: opposite to the bullet; momenta equal and opposite.', 'formula', 3),
    fc(19, 'What is a free-body diagram?', 'A diagram of one body showing only the forces acting on it.', 'concept', 4),
    fc(20, 'Direction of the normal reaction?', 'Perpendicular to the surface of contact, away from the surface; it adjusts to what is needed.', 'concept', 4),
    fc(21, 'What is true about the tension in a light string over a smooth pulley?', 'It is the same throughout the string.', 'concept', 4),
    fc(22, 'Acceleration of a block on a smooth incline of angle θ?', '$a = g\\sin\\theta$ down the slope, with $N = mg\\cos\\theta$.', 'formula', 4),
    fc(23, 'Atwood machine: acceleration and tension?', '$a = \\dfrac{(m_1 - m_2)g}{m_1 + m_2}$, $T = \\dfrac{2m_1m_2g}{m_1 + m_2}$.', 'formula', 4),
    fc(24, 'Block $m_1$ on a smooth table, $m_2$ hanging: $a$ and $T$?', '$a = \\dfrac{m_2g}{m_1 + m_2}$, $T = \\dfrac{m_1m_2g}{m_1 + m_2}$.', 'formula', 4),
    fc(25, 'Contact force between blocks $m_1$ (pushed by F) and $m_2$ ahead of it?', '$F_c = \\dfrac{m_2}{m_1 + m_2}F$, from $a = F/(m_1 + m_2)$.', 'formula', 4),
    fc(26, 'Reading of a weighing machine in a lift accelerating up at a?', '$N = m(g + a)$; downward acceleration gives $m(g - a)$; free fall gives 0.', 'formula', 4),
    fc(27, 'State the triangle law for forces in equilibrium.', 'Three concurrent forces in equilibrium can be drawn head to tail as a closed triangle.', 'concept', 5),
    fc(28, 'State Lami’s theorem.', 'For three concurrent forces in equilibrium, each is proportional to the sine of the angle between the other two.', 'concept', 5),
    fc(29, 'Conditions for equilibrium of three coplanar forces on a rigid body?', 'Zero resultant force and zero torque; if not parallel, their lines of action meet at one point.', 'concept', 5),
    fc(30, 'Wall reaction for a uniform ladder at angle θ on a smooth wall?', '$N_w = \\dfrac{W}{2}\\cot\\theta$ (torques about the foot), with $F_f = N_w$ and $N_f = W$.', 'formula', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
