// ch06 notes and flashcards.
import { T, unit, PROV, r } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { dec, sig, rod, tri, el, sh, sd, tq, pd, ln, st, po, pl, br, tp, sq, dr, gw, ft, g } from './data.mjs';
import { V, plotShell, plotOmega, plotKE, TABLES } from './decks.mjs';

const p3 = (x, n = 3) => String(Number(x.toPrecision(n)));
const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'System of Particles and Rotational Motion — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Centre of mass and its motion',
      r`- The **centre of mass** (CM) of particles is the mass-weighted average position: $X = \sum m_i x_i / M$, and likewise for $Y$. For two particles it lies on the line joining them, nearer the heavier one; the distances are in the inverse ratio of the masses.
- Masses $${dec(rod.m1, 2)}$ kg and $${dec(rod.m2, 2)}$ kg at the ends of a light $${dec(rod.L, 2)}$ m rod: CM at $${dec(rod.x, 2)}$ m from the lighter mass.
- For uniform rigid bodies symmetry decides: midpoint of a rod, centre of a ring, disc or sphere, crossing of the diagonals of a rectangle. A composite body is treated as particles at the CMs of its parts. A wire bent into an L (arms ${dec(el.a, 2)} m and ${dec(el.b, 2)} m) has its CM at (${p3(el.X)} m, ${p3(el.Y)} m): not on the wire.
- **Motion of the CM:** $M\vec a_\text{cm} = \vec F_\text{ext}$ and $\vec P = M\vec v_\text{cm}$. Internal forces cancel in pairs and cannot change it. With no external force the CM stays at rest or moves uniformly.
- A shell bursting in flight: the CM keeps its path. A child walking on a free sledge of ${dec(sd.M, 2)} kg moves ${dec(sd.c, 2)} m while the sledge slides back ${dec(sd.s, 2)} m.`,
      [kt('Centre of mass', 'The point whose position is the mass-weighted average of the positions of all the particles; it moves as if all the mass and all the external force were there.'), kt('Internal force', 'A force between two parts of the same system; such forces occur in equal and opposite pairs.')],
      [fm(r`x_\text{cm} = \dfrac{\sum m_i x_i}{M}`, 'Centre of mass along a line'), fm(r`M\vec a_\text{cm} = \vec F_\text{ext}`, 'Motion of the centre of mass')],
      V.cm2,
      [1],
      [V.lshape, V.sled, plotShell, TABLES.T_cmshape],
    ),
    sec(
      '2. Torque and angular momentum',
      r`- **Torque** $\vec\tau = \vec r \times \vec F$; magnitude $\tau = rF\sin\theta = Fd$, where $d$ is the perpendicular distance from the axis to the line of action. Unit N m. Anticlockwise is taken as positive for motion in a plane. A force through the axis has zero torque.
- A ${pd.F} N downward pedal force on a ${pd.r} m crank at 60° from the vertical gives ${dec(pd.tau(60), 3)} N m.
- **Angular momentum** of a particle $\vec l = \vec r \times \vec p$, magnitude $mvd$ (unit kg m² s⁻¹); for a circle $l = mvr = mr^2\omega$. A ball of ${dec(ln.m, 2)} kg at ${dec(ln.v, 2)} m s⁻¹ along a line ${dec(ln.d, 2)} m from O has $L = ${dec(ln.L, 3)}$ kg m² s⁻¹ at every position.
- $\vec\tau_\text{ext} = d\vec L/dt$ (internal torques cancel in pairs). If $\tau_\text{ext} = 0$, $L$ is constant: **conservation of angular momentum**.
- Examples: a dancer or a person on a stool pulling the weights in (I falls from ${p3(st.I1)} to ${p3(st.I2)} kg m², ω rises from ${dec(st.w1, 2)} to ${p3(st.w2)} rad s⁻¹); a diver tucking; a helicopter’s tail rotor; a planet under a central force.`,
      [kt('Torque', 'The turning effect of a force about an axis: force times the perpendicular distance from the axis to its line of action.'), kt('Angular momentum', 'The vector r × p of a particle about a point; for a rigid body about a fixed axis, I ω.')],
      [fm(r`\tau = rF\sin\theta = Fd`, 'Magnitude of torque'), fm(r`\vec\tau = \dfrac{d\vec L}{dt}`, 'Torque and angular momentum'), fm(r`I_1\omega_1 = I_2\omega_2`, 'Conservation of angular momentum')],
      V.torque,
      [2],
      [V.linel, V.spin, plotOmega, TABLES.T_crank, TABLES.T_Lcmp],
    ),
    sec(
      '3. Equilibrium of rigid bodies and centre of gravity',
      r`- A rigid body is in **mechanical equilibrium** when $\sum\vec F_\text{ext} = 0$ (translational) and $\sum\vec\tau_\text{ext} = 0$ (rotational). If the net force is zero, the net torque is the same about every point, so take moments where an unknown force acts.
- **Principle of moments:** clockwise moments = anticlockwise moments about any point. A light carrying pole with ${po.m2} kg and ${po.m1} kg loads balances ${dec(po.x, 2)} m from the heavier load.
- A uniform ${pl.L} m plank of ${pl.Mp} kg on end supports with a ${pl.Mm} kg person ${pl.xm} m from one end: supports ${dec(pl.RL, 4)} N and ${dec(pl.RR, 4)} N ($g = ${g}$ m s⁻²). A hinged bar with a cable at ${br.th}°: $T = ${dec(br.T, 3)}$ N.
- A **couple** (equal, opposite, parallel forces on different lines) has zero net force and torque $F\times d$, the same about every point.
- **Centre of gravity:** the point where the weight acts; it coincides with the CM when g is uniform over the body. A body is stable while the vertical through its CG falls inside the base; a ${tp.b} m wide, ${tp.h} m tall almirah topples at a tilt of about ${dec(tp.crit, 3)}°.`,
      [kt('Principle of moments', 'For rotational equilibrium the sum of the clockwise moments about a point equals the sum of the anticlockwise moments.'), kt('Couple', 'Two equal, opposite, parallel forces with different lines of action; it produces rotation without translation.'), kt('Centre of gravity', 'The point through which the whole weight of a body acts.')],
      [fm(r`\sum \vec F = 0,\quad \sum \vec\tau = 0`, 'Conditions of equilibrium'), fm(r`\tau_\text{couple} = F\,d`, 'Torque of a couple')],
      V.beam,
      [3],
      [V.pole, V.bracket, V.topple, TABLES.T_eq, TABLES.T_couple],
    ),
    sec(
      '4. Moment of inertia, radius of gyration and rotational energy',
      r`- **Moment of inertia** $I = \sum m_i r_i^2$ (kg m²): it depends on the mass, how it is distributed and the axis. Four ${dec(sq.m, 2)} kg masses at the corners of a ${dec(sq.a, 2)} m square about the central perpendicular axis: $I = ${dec(sq.I, 2)}$ kg m².
- **Radius of gyration** $k = \sqrt{I/M}$, so $I = Mk^2$.
- Values about an axis through the centre (stated, not derived): ring or hollow cylinder $MR^2$; hollow sphere $\tfrac{2}{3}MR^2$; disc or solid cylinder $\tfrac{1}{2}MR^2$; solid sphere $\tfrac{2}{5}MR^2$; thin rod about its centre, perpendicular, $\tfrac{1}{12}ML^2$. For ${dr.M} kg and ${dr.R} m: ring ${dec(dr.Ir, 3)}, disc ${dec(dr.Id, 3)} kg m².
- Fixed axis: $L = I\omega$, $\tau = I\alpha$, $K = \tfrac{1}{2}I\omega^2$. A grinding wheel (${gw.M} kg, ${gw.R} m) at ${gw.rpm} rev/min has ${dec(gw.K, 3)} J. A torque of ${ft.tau} N m for ${ft.t} s on I = ${ft.I} kg m² gives ω = ${p3(ft.w)} rad s⁻¹.
- Not included here: the parallel and perpendicular axes theorems and rolling motion, which the rationalised book does not require.`,
      [kt('Moment of inertia', 'The sum of mass times the square of the distance from the axis; the rotational counterpart of mass.'), kt('Radius of gyration', 'The distance k from the axis at which the whole mass M would give the same moment of inertia, I = M k².')],
      [fm(r`I = \sum m_i r_i^2`, 'Moment of inertia'), fm(r`K = \tfrac{1}{2}I\omega^2`, 'Rotational kinetic energy'), fm(r`\tau = I\alpha`, 'Rotational form of Newton’s second law')],
      V.moi,
      [4],
      [plotKE, TABLES.T_sq, TABLES.T_disc, TABLES.T_an, TABLES.T_ft],
    ),
  ],
  exam_tips_md: `- Say which point or axis a torque, angular momentum or moment of inertia refers to.
- Find the perpendicular distance (or the sine of the angle) before multiplying force by distance.
- For equilibrium write both conditions and take moments about the point with the most unknown forces.
- Use "no external force, so the centre of mass is unchanged" and "no external torque, so L is constant" explicitly.
- Convert revolutions per minute to radians per second (multiply by 2π/60) before using K = ½ I ω².`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Write the centre of mass of particles along a line.', '$x_\\text{cm} = \\sum m_i x_i / M$, the mass-weighted average position.', 'formula', 1),
    fc(2, 'Where does the CM of two particles lie?', 'On the line joining them, nearer the heavier one; distances are in the inverse ratio of the masses.', 'concept', 1),
    fc(3, 'Masses 2.0 kg and 6.0 kg at the ends of a 0.80 m light rod: where is the CM?', '0.60 m from the 2.0 kg mass.', 'example', 1),
    fc(4, 'Where is the CM of a uniform ring?', 'At its centre, where there is no material.', 'fact', 1),
    fc(5, 'Can the CM of a body lie outside the body?', 'Yes, for a ring or a bent wire, for example.', 'concept', 1),
    fc(6, 'State the equation of motion of the CM.', '$M\\vec a_\\text{cm} = \\vec F_\\text{ext}$: only external forces matter.', 'formula', 1),
    fc(7, 'Why can internal forces not change the CM motion?', 'They occur in equal and opposite pairs that cancel in the sum.', 'concept', 1),
    fc(8, 'A shell bursts in flight. How does its CM move?', 'As if no burst had occurred (same path), until a piece meets an outside force.', 'concept', 1),
    fc(9, 'What is the total momentum of a system in terms of its CM?', '$\\vec P = M\\vec v_\\text{cm}$.', 'formula', 1),
    fc(10, 'Write the magnitude of the torque of a force.', '$\\tau = rF\\sin\\theta = Fd$.', 'formula', 2),
    fc(11, 'What is d in torque?', 'The perpendicular distance from the axis to the line of action of the force.', 'concept', 2),
    fc(12, 'SI unit of torque?', 'Newton metre (N m).', 'fact', 2),
    fc(13, 'When is the torque of a force zero?', 'When F = 0 or the line of action passes through the axis.', 'concept', 2),
    fc(14, 'Define the angular momentum of a particle.', '$\\vec l = \\vec r \\times \\vec p$, magnitude $mvd$.', 'formula', 2),
    fc(15, 'SI unit of angular momentum?', 'kg m² s⁻¹.', 'fact', 2),
    fc(16, 'Relate torque and angular momentum.', '$\\vec\\tau_\\text{ext} = d\\vec L/dt$.', 'formula', 2),
    fc(17, 'State the law of conservation of angular momentum.', 'If the net external torque is zero, the total angular momentum is constant.', 'concept', 2),
    fc(18, 'Why does a dancer spin faster when she pulls in her arms?', 'I falls while L = Iω stays constant, so ω rises.', 'concept', 2),
    fc(19, 'State the two conditions of mechanical equilibrium.', 'Sum of external forces = 0 and sum of external torques = 0.', 'concept', 3),
    fc(20, 'State the principle of moments.', 'In rotational equilibrium, clockwise moments equal anticlockwise moments about any point.', 'concept', 3),
    fc(21, 'What is a couple?', 'Two equal, opposite, parallel forces on different lines: zero net force, torque F × d.', 'concept', 3),
    fc(22, 'Define the centre of gravity.', 'The point through which the whole weight of the body acts.', 'concept', 3),
    fc(23, 'When do the CG and the CM coincide?', 'When g is the same over the whole body (the usual case).', 'concept', 3),
    fc(24, 'When does a body topple?', 'When the vertical line through its CG falls outside its base.', 'concept', 3),
    fc(25, 'Define the moment of inertia of particles.', '$I = \\sum m_i r_i^2$, unit kg m².', 'formula', 4),
    fc(26, 'Define the radius of gyration.', '$k = \\sqrt{I/M}$, so $I = Mk^2$.', 'formula', 4),
    fc(27, 'I of a ring about its axis? Of a disc?', 'Ring $MR^2$; disc $\\tfrac{1}{2}MR^2$.', 'formula', 4),
    fc(28, 'I of a solid sphere about a diameter?', '$\\tfrac{2}{5}MR^2$.', 'formula', 4),
    fc(29, 'Write the rotational analogue of F = ma.', '$\\tau = I\\alpha$.', 'formula', 4),
    fc(30, 'Write the kinetic energy of rotation about a fixed axis.', '$K = \\tfrac{1}{2}I\\omega^2$ with ω in rad s⁻¹.', 'formula', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
void sig;
void tri;
void sh;
void tq;
