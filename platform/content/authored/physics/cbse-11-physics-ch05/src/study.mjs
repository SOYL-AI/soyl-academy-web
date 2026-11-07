// ch05 notes and flashcards.
import { T, unit, PROV, r, dec } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { V, EX, plotFx, plotK, plotEs, plotU, plotP, TABLES } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const { ex1, ex2, ex3, ex4, ex5, ex6, ex7, ex8, ex9, ex10, ex11, ex12, ex13, ex14 } = EX;

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Work, Energy and Power — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Work done by constant and variable forces',
      r`- **Work** by a constant force is the scalar product $W = \vec F\cdot\vec d = Fd\cos\theta$, where $\theta$ is the angle between force and displacement. Unit: joule, 1 J = 1 N m. Only the component of the force along the displacement does work.
- The work is **positive** for $\theta < 90^\circ$, **zero** for $\theta = 90^\circ$ (for example the normal force on a sliding block, or the tension on a whirling stone) and **negative** for $\theta > 90^\circ$ (friction, drag, gravity on a rising body).
- In components, $W = F_xd_x + F_yd_y + F_zd_z$. For ${ex1.F} N at an angle with $\cos\theta = ${ex1.c}$ over ${ex1.d} m: $W = ${ex1.Fc} \times ${ex1.d} = ${ex1.W}$ J. For $\vec F = (6, -3, 2)$ N and $\vec d = (2, 5, -4)$ m: $W = ${ex2.W}$ J, an obtuse angle of about ${dec(ex2.theta, 4)} degrees.
- **Variable force:** $W = \int F\,dx$ = the area under the F–x graph (areas below the axis negative). A force of ${ex3.F0} N for ${ex3.x1} m that falls linearly to zero at ${ex3.x2} m does ${ex3.W} J. For $F = ${ex4.a} + ${ex4.b}x^2$ from ${ex4.x1} m to ${ex4.x2} m the work is ${ex4.W} J.
- A force that moves nothing (a hand holding a bag) does no work. Work depends on the displacement of the point of application, not on the time taken.`,
      [kt('Work', 'The scalar product of force and displacement, W = F · d = F d cos θ; unit joule.'), kt('Scalar product', 'A · B = AB cos θ = Ax Bx + Ay By + Az Bz; a number, not a vector.'), kt('Joule', 'The work done by a force of one newton through one metre along the force.')],
      [fm(r`W = \vec F\cdot\vec d = Fd\cos\theta`, 'Work by a constant force'), fm(r`W = \int_{x_i}^{x_f}F\,dx`, 'Work by a variable force')],
      V.tow,
      [1],
      [V.signs, V.fxarea, plotFx, TABLES.Tdot, TABLES.Twork],
    ),
    sec(
      '2. Kinetic energy and the work–energy theorem',
      r`- **Kinetic energy** $K = \tfrac{1}{2}mv^2 = p^2/2m$ is a scalar, never negative, and does not depend on direction. Doubling the speed multiplies $K$ by four; at equal momentum the lighter body has the larger $K$.
- **Work–energy theorem:** the net work done on a body by all forces equals the change in its kinetic energy, $W_\text{net} = K_f - K_i$. For a constant force it follows from $v^2 = u^2 + 2as$ and $F = ma$; for a variable force from $\int F\,dx = \int mv\,dv$. It holds for friction and drag too.
- Example: a ${ex5.m} kg wagon at ${ex5.v} m/s stopped by ${ex5.F} N has $K = ${ex5.K / 1000}$ kJ and stops in ${ex5.s} m. A ${ex6.m} kg ball thrown up at ${ex6.u} m/s reaches ${ex6.H} m (g = 9.8 m/s²).
- Positive net work raises $K$; negative net work lowers it; zero net work leaves $K$ unchanged (the direction may still change, as in uniform circular motion).`,
      [kt('Kinetic energy', 'Energy of motion, K = ½ m v².'), kt('Work–energy theorem', 'Net work done on a body = change in its kinetic energy.')],
      [fm(r`K = \tfrac{1}{2}mv^2`, 'Kinetic energy'), fm(r`W_\text{net} = \tfrac{1}{2}mv^2 - \tfrac{1}{2}mu^2`, 'Work–energy theorem')],
      plotK,
      [2],
      [TABLES.Tke],
    ),
    sec(
      '3. Potential energy, springs and conservation of mechanical energy',
      r`- A force is **conservative** if its work between two points is independent of the path (zero on a closed path). Gravity and the spring force are conservative and have potential energies; friction and drag are not.
- Potential energy: $W_\text{by the force} = -\Delta U$, so $F = -dU/dx$. Near the Earth, $U = mgh$ above a reference level that may be chosen freely: only differences matter.
- **Spring:** $F = -kx$ and $U = \tfrac{1}{2}kx^2$ (the area of the triangle under the F–x line). A spring with $k = ${ex8.k}$ N/m compressed ${ex8.x} m stores ${ex8.U1} J and pushes with ${ex8.F} N; compressing it to ${ex8.x2} m takes ${ex8.dU} J more.
- **Conservation of mechanical energy:** if only conservative forces do work, $K + U$ is constant. A ${ex7.m} kg coaster car released from rest at ${ex7.hA} m has ${dec(ex7.EA / 1000, 3)} kJ in total, and at the bottom $v = \sqrt{2gh} = ${dec(ex7.vC, 3)}$ m/s whatever its mass. A block on a spring ($m = ${ex9.m}$ kg, $k = ${ex9.k}$ N/m, amplitude ${ex9.A} m) has $E = ${ex9.E}$ J and a top speed of ${ex9.v0} m/s.
- With friction: $\Delta K + \Delta U = W_\text{friction}$ (negative). A ${ex10.m} kg block down a ${ex10.L} m slope at ${ex10.th} degrees with ${ex10.f} N of friction gains ${dec(ex10.K, 3)} J of kinetic energy from ${dec(ex10.dU, 3)} J of gravitational energy.
- **Left out on purpose:** vertical circular motion and the equivalence of mass and energy are not treated here (see Known gaps in the README).`,
      [kt('Conservative force', 'A force whose work between two points does not depend on the path; its work on a closed path is zero.'), kt('Potential energy', 'Energy of position or configuration defined for a conservative force by W = −ΔU.'), kt('Hooke’s law', 'Within the elastic limit the spring force is proportional to the extension, F = −kx.')],
      [fm(r`U = mgh`, 'Gravitational potential energy'), fm(r`U = \tfrac{1}{2}kx^2`, 'Spring potential energy'), fm(r`K + U = \text{constant}`, 'Conservation of mechanical energy')],
      V.bars,
      [3],
      [TABLES.Tforces, V.spring, plotU, plotEs, TABLES.Tledger],
    ),
    sec(
      '4. Power and collisions',
      r`- **Power** is the rate of doing work: $P_\text{av} = W/t$, $P = dW/dt = \vec F\cdot\vec v$. SI unit watt (1 W = 1 J/s). The **kilowatt hour** is a unit of energy, 1 kW h = $3.6 \times 10^6$ J. At constant power, $F = P/v$: the pull falls as the speed rises. A lift of ${ex11.m} kg rising at ${dec(ex11.v, 2)} m/s against ${ex11.f} N of friction needs ${ex11.P} W.
- **Collisions** (no external force): total momentum is always conserved. **Elastic:** kinetic energy also conserved. **Inelastic:** some lost. **Perfectly inelastic:** the bodies stick, and the loss is greatest.
- **Elastic, target at rest:** $v_1 = \dfrac{m_1 - m_2}{m_1 + m_2}u_1$, $v_2 = \dfrac{2m_1}{m_1 + m_2}u_1$. Equal masses exchange velocities. A ${ex12.m1} kg body at ${ex12.u1} m/s hitting ${ex12.m2} kg at rest leaves at ${ex12.v1} m/s and ${ex12.v2} m/s.
- **Perfectly inelastic:** $m_1u_1 + m_2u_2 = (m_1 + m_2)V$. A ${ex13.m} kg bullet at ${ex13.u} m/s stuck in a ${ex13.M} kg block gives $V = ${ex13.V}$ m/s and loses ${dec(ex13.frac, 3)} per cent of its kinetic energy; the swing afterwards conserves mechanical energy and lifts the block ${dec(ex13.h * 100, 3)} cm.
- **Two dimensions:** each component of momentum is conserved. For equal masses, elastic, target at rest and a glancing hit, the two paths after the collision are at right angles; a ${ex14.v} m/s ball deflected by ${ex14.deg} degrees leaves at ${dec(ex14.v1, 3)} m/s and the target at ${dec(ex14.v2, 3)} m/s.
- **Left out on purpose:** the coefficient of restitution is not used.`,
      [kt('Power', 'Rate of doing work, P = W/t = F · v; unit watt.'), kt('Elastic collision', 'A collision in which kinetic energy as well as momentum is conserved.'), kt('Perfectly inelastic collision', 'A collision in which the bodies stick together; momentum is conserved and the loss of kinetic energy is greatest.')],
      [fm(r`P = \vec F\cdot\vec v`, 'Power'), fm(r`m_1u_1 + m_2u_2 = (m_1 + m_2)V`, 'Perfectly inelastic collision')],
      V.collel,
      [4],
      [TABLES.Tpower, plotP, TABLES.Tcoll, V.collin, TABLES.Tspecial, V.coll2d],
    ),
  ],
  exam_tips_md: `- Always use the angle between force and displacement; write the sign of every work.
- For a variable force sketch F–x first; areas below the axis are negative.
- Work–energy problems: add the works of all forces (gravity, friction, springs) before equating to the change in kinetic energy.
- Choose the zero of potential energy first; with friction add its negative work instead of using K + U = constant.
- Spring problems: use the displacement from the natural length.
- Collisions: write momentum first; use kinetic energy only for elastic collisions.
- Energy in joules or kW h, power in watts: convert before comparing.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Write the work done by a constant force in terms of the angle between force and displacement.', '$W = Fd\\cos\\theta = \\vec F\\cdot\\vec d$.', 'formula', 1),
    fc(2, 'Is work a scalar or a vector? What is its SI unit?', 'A scalar; the joule (1 J = 1 N m).', 'concept', 1),
    fc(3, 'At what angle between force and displacement is the work zero?', '$90^\\circ$ (cos 90° = 0), for example the normal force on a sliding block.', 'concept', 1),
    fc(4, 'When is the work done by a force negative?', 'When the angle is greater than 90°, so the force opposes the motion (friction, drag).', 'concept', 1),
    fc(5, 'How is the work by a variable force obtained from its F–x graph?', 'As the area under the graph (areas below the x-axis count negative).', 'concept', 1),
    fc(6, 'Write the work done by a variable force as an integral.', '$W = \\int_{x_i}^{x_f} F\\,dx$.', 'formula', 1),
    fc(7, 'Work done by F = (4î + 2ĵ) N for a displacement (3î + 5ĵ) m?', '$4 \\times 3 + 2 \\times 5 = 22$ J.', 'example', 1),
    fc(8, 'Does a hand that holds a heavy bag still do work on it?', 'No: the bag has no displacement.', 'concept', 1),
    fc(9, 'Write the formula for kinetic energy.', '$K = \\tfrac{1}{2}mv^2 = p^2/2m$.', 'formula', 2),
    fc(10, 'If the speed of a body is tripled, what happens to its kinetic energy?', 'It becomes nine times as large.', 'concept', 2),
    fc(11, 'State the work–energy theorem.', 'The net work done on a body equals the change in its kinetic energy.', 'concept', 2),
    fc(12, 'Can kinetic energy be negative?', 'No: it is half m v², and v² is never negative.', 'concept', 2),
    fc(13, 'Net work on a body over an interval is zero. What can you say about its kinetic energy?', 'It is unchanged (its direction of motion may still have changed).', 'concept', 2),
    fc(14, 'A 20 000 kg wagon at 4 m/s is stopped by 8000 N. Stopping distance?', '$K/F = 160\\,000/8000 = 20$ m.', 'example', 2),
    fc(15, 'What is a conservative force? Give two examples.', 'One whose work between two points is independent of the path (zero round a closed path): gravity and the spring force.', 'concept', 3),
    fc(16, 'Name two non-conservative forces.', 'Kinetic friction and air drag.', 'fact', 3),
    fc(17, 'How is potential energy related to the work done by a conservative force?', '$W_\\text{by the force} = -\\Delta U$, so $F = -dU/dx$.', 'formula', 3),
    fc(18, 'Why does the choice of zero of potential energy not matter?', 'Only differences of potential energy appear in physical results.', 'concept', 3),
    fc(19, 'State Hooke’s law for a spring.', '$F = -kx$: the force is proportional to the extension and points back to the natural length.', 'formula', 3),
    fc(20, 'Write the energy stored in a stretched or compressed spring.', '$U = \\tfrac{1}{2}kx^2$.', 'formula', 3),
    fc(21, 'A spring is compressed by twice as much. By what factor does the stored energy change?', 'Four times.', 'concept', 3),
    fc(22, 'When is mechanical energy conserved?', 'When only conservative forces do work: $K + U$ stays constant.', 'concept', 3),
    fc(23, 'A body slides down a smooth curve through height h from rest. Its speed at the bottom?', '$v = \\sqrt{2gh}$, independent of the mass and the shape.', 'formula', 3),
    fc(24, 'With friction acting, how is the energy equation modified?', 'Add the work done by friction (negative): $\\Delta K + \\Delta U = W_\\text{friction}$.', 'concept', 3),
    fc(25, 'Define power and give its SI unit.', 'Rate of doing work, $P = W/t$; the watt (1 W = 1 J/s).', 'formula', 4),
    fc(26, 'Write power in terms of force and velocity.', '$P = \\vec F\\cdot\\vec v$.', 'formula', 4),
    fc(27, 'Is the kilowatt hour a unit of power or energy? Its value in joules?', 'Energy: $1$ kW h $= 3.6 \\times 10^6$ J.', 'fact', 4),
    fc(28, 'Which quantities are conserved in an elastic collision? In a perfectly inelastic one?', 'Elastic: momentum and kinetic energy. Perfectly inelastic: only momentum (the bodies stick).', 'concept', 4),
    fc(29, 'A body hits an identical body at rest head-on, elastically. What happens?', 'The first stops and the second moves off with the first’s velocity.', 'concept', 4),
    fc(30, 'After a glancing elastic collision of equal masses (target at rest), what is the angle between the two paths?', '$90^\\circ$.', 'concept', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
