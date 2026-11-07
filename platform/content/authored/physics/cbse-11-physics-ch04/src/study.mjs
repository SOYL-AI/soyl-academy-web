// ch04 notes and flashcards.
import { T, unit, PROV, r, sig } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { g } from './phys.mjs';
import { V, EX, plotP, plotImpulse, plotFric, TABLES } from './decks.mjs';

const w3 = (x) => String(sig(x, 3));
const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const { cart, ball, lift, pul, atw, gun, wag, rp, blk, inc, rough, whirl, lvl, bk } = EX;

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Laws of Motion — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Newton’s laws, momentum and impulse',
      r`- **First law:** a body stays at rest or in uniform motion in a straight line unless a net external force acts on it. It defines **inertia** (measured by mass) and **inertial frames**; an accelerating bus or train is not one.
- **Momentum** $\vec p = m\vec v$. **Second law:** $\vec F_\text{net} = d\vec p/dt$, which is $m\vec a$ for constant mass. Unit: 1 N = 1 kg m s⁻². It holds along each axis. Example: a net force of ${cart.F} N on a ${cart.m} kg cart from rest gives $a = ${w3(cart.a)}$ m s⁻² and $p = ${w3(cart.p)}$ kg m s⁻¹ after ${cart.T} s.
- **Impulse** $\vec J = \int \vec F\,dt = \Delta\vec p$ (area under the F–t graph); average force $= \Delta p/\Delta t$. A ${ball.m} kg ball reversing from ${ball.u} to ${ball.v} m s⁻¹ in ${ball.t * 1000} ms gets $J = ${w3(ball.J)}$ N s and an average force of ${w3(ball.F)} N. A longer contact time lowers the force (foam pits, crumple zones).
- **Third law:** forces occur in equal and opposite pairs on **different** bodies; they never cancel in the free-body diagram of one body. Weight and the normal reaction on a body are **not** a pair.
- **Free-body diagrams:** isolate one body, draw only the forces on it (weight, normal reaction, tension, friction, applied forces), resolve and write $\sum F = ma$ along each axis.
- **Lift:** the scale reads $N = m(g + a)$ for upward acceleration $a$. For ${lift.m} kg: ${w3(lift.up)} N (up), ${w3(lift.W)} N (steady), ${w3(lift.down)} N (down), 0 N in free fall.
- **Connected bodies** (light string, smooth pulley; same $T$ and $a$): block $m_1$ on a smooth table with $m_2$ hanging has $a = m_2 g/(m_1 + m_2)$, $T = m_1 a$ (for ${pul.m1} kg and ${pul.m2} kg: ${w3(pul.a)} m s⁻², ${w3(pul.T)} N). Atwood machine: $a = (m_2 - m_1)g/(m_1 + m_2)$ (for ${atw.m1} and ${atw.m2} kg: ${w3(atw.a)} m s⁻², $T = ${w3(atw.T)}$ N).`,
      [kt('Inertia', 'The property of a body to resist a change in its state of rest or uniform motion; measured by mass.'), kt('Inertial frame', 'A frame in which a body with no net force does not accelerate; Newton’s laws hold in it.'), kt('Impulse', 'The integral of force over time; equals the change in momentum; area under the F–t graph.')],
      [fm(r`\vec F = \dfrac{d\vec p}{dt}`, 'Second law'), fm(r`\vec J = \int \vec F\,dt = \Delta\vec p`, 'Impulse–momentum relation'), fm(r`a = \dfrac{(m_2 - m_1)g}{m_1 + m_2}`, 'Atwood machine')],
      plotP,
      [1],
      [plotImpulse, V.pair, V.lift, V.pulley, TABLES.T3, TABLES.T5],
    ),
    sec(
      '2. Conservation of linear momentum',
      r`- For two bodies interacting only with each other, $d\vec p_A/dt = -d\vec p_B/dt$ (second and third laws), so $\vec p_A + \vec p_B$ is constant. In general: if the net **external** force on a system is zero, its total momentum is constant, along each axis separately. It also holds during a short collision or explosion when external forces are small compared with the internal ones.
- **Recoil:** from rest the total momentum is zero, so $M V = m v$. A ${gun.M} kg rifle firing a ${gun.m * 1000} g bullet at ${gun.v} m s⁻¹ recoils at ${w3(gun.V)} m s⁻¹; the bullet has ${w3(gun.keB)} J of kinetic energy and the rifle ${w3(gun.keR)} J (the lighter body has more, $K = p^2/2m$).
- **Explosion:** momentum conserved, kinetic energy increases (stored energy released). **Perfectly inelastic collision:** bodies move together, $m_1u_1 + m_2u_2 = (m_1 + m_2)V$, kinetic energy decreases. Wagons of ${w3(wag.m1)} kg at ${wag.u1} m s⁻¹ and ${w3(wag.m2)} kg at rest couple at ${w3(wag.V)} m s⁻¹.
- A rocket gains forward momentum equal to that carried away by its exhaust: no medium is needed. Give every velocity a sign before adding momenta.`,
      [kt('Isolated system', 'A system on which the net external force is zero; its total momentum is constant.'), kt('Recoil', 'The backward motion of a gun or boat when it throws something forward; the momenta are equal and opposite.')],
      [fm(r`m_1\vec u_1 + m_2\vec u_2 = m_1\vec v_1 + m_2\vec v_2`, 'Conservation of momentum'), fm(r`V = \dfrac{mv}{M}`, 'Recoil speed from rest')],
      V.recoil,
      [2],
      [TABLES.T6],
    ),
    sec(
      '3. Equilibrium, friction and rolling friction',
      r`- **Equilibrium of concurrent forces:** $\sum\vec F = 0$, i.e. $\sum F_x = 0$ and $\sum F_y = 0$; three forces form a closed triangle. A ${rp.m} kg lamp on ropes at ${rp.a1}° and ${rp.a2}° to the ceiling has tensions ${w3(rp.T1)} N and ${w3(rp.T2)} N (weight ${w3(rp.W)} N).
- **Friction:** static $f_s \le \mu_s N$ (limiting value $\mu_s N$, equal to the applied force below it), kinetic $f_k = \mu_k N$ with usually $\mu_k < \mu_s$; $\mu$ is dimensionless, depends on the two surfaces and not on the apparent area. For a ${blk.m} kg crate ($\mu_s = ${blk.mus}$, $\mu_k = ${blk.muk}$): limiting friction ${w3(blk.fmax)} N, kinetic ${w3(blk.fk)} N; a push of ${blk.F1} N leaves it at rest, ${blk.F2} N gives $a = ${w3(blk.a2)}$ m s⁻².
- **Incline:** at rest $f = mg\sin\theta$, $N = mg\cos\theta$; **angle of repose** $\tan\theta = \mu_s$ ($${w3(inc.mus)}$ for $30^\circ$); sliding down $a = g(\sin\theta - \mu_k\cos\theta)$. With an angled pull, $N$ is not $mg$.
- **Rolling friction** is far smaller than sliding friction ($\mu_r \ll \mu_k$): wheels and ball bearings. **Lubrication** (oil, grease, air cushion) puts a film between surfaces. A ${rough.m1} kg block on a rough table ($\mu = ${rough.mu}$) with ${rough.m2} kg hanging: $a = ${w3(rough.a)}$ m s⁻², $T = ${w3(rough.T)}$ N.
- Friction is useful as well: walking and braking depend on it, and the friction on a walker's pushing foot points forward.`,
      [kt('Limiting friction', 'The maximum static friction, μs N, at the point of sliding.'), kt('Angle of repose', 'The angle of an incline at which a body just stays at rest; tan θ = μs.'), kt('Rolling friction', 'The resistance to rolling of a wheel or ball; much smaller than sliding friction.')],
      [fm(r`f_s \le \mu_s N,\quad f_k = \mu_k N`, 'Laws of friction'), fm(r`\tan\theta = \mu_s`, 'Angle of repose')],
      plotFric,
      [3],
      [V.ropes, V.incl, TABLES.T7, TABLES.T8, TABLES.T9],
    ),
    sec(
      '4. Uniform circular motion, level and banked roads',
      r`- In uniform circular motion the speed is constant but the velocity changes direction, so there is an acceleration $a_c = v^2/r = \omega^2 r$ directed to the centre, at right angles to $v$. The **centripetal force** $mv^2/r$ is the net inward force supplied by real forces (tension, friction, gravity, a component of the normal reaction); it is not an extra force in the free-body diagram. If it stops acting, the body leaves along the tangent. A ${whirl.m} kg stone on a ${whirl.r} m string at ${whirl.rev} rev/s: $\omega = ${w3(whirl.w)}$ rad s⁻¹, $T = ${w3(whirl.T)}$ N.
- **Level road:** static friction supplies the force, $v_\text{max} = \sqrt{\mu_s r g}$, independent of mass; for $r = ${lvl.r}$ m: ${w3(lvl.v)} m s⁻¹ dry ($\mu_s = ${lvl.mu}$), ${w3(lvl.vw)} m s⁻¹ wet ($\mu_s = ${lvl.wet}$).
- **Banked road (no friction):** $N\cos\theta = mg$, $N\sin\theta = mv^2/r$, so $\tan\theta = v^2/rg$ and $v_0 = \sqrt{rg\tan\theta}$ (for $r = ${bk.r}$ m and $${bk.theta}^\circ$: ${w3(bk.v0)} m s⁻¹). **With friction:** $v_\text{max} = \sqrt{rg(\mu_s + \tan\theta)/(1 - \mu_s\tan\theta)}$ (friction down the slope; ${w3(bk.vmax)} m s⁻¹ for $\mu_s = ${bk.mu}$) and $v_\text{min} = \sqrt{rg(\tan\theta - \mu_s)/(1 + \mu_s\tan\theta)}$ when $\tan\theta > \mu_s$ (friction up the slope).
- Convert km h⁻¹ to m s⁻¹ by dividing by 3.6; take $g = ${g}$ m s⁻² unless told otherwise.`,
      [kt('Centripetal force', 'The net force directed to the centre that keeps a body in circular motion; mv²/r.'), kt('Banking', 'Raising the outer edge of a curved road so that the normal reaction helps to supply the centripetal force.')],
      [fm(r`a_c = \dfrac{v^2}{r} = \omega^2 r`, 'Centripetal acceleration'), fm(r`v_\text{max} = \sqrt{\mu_s r g}`, 'Level road'), fm(r`\tan\theta = \dfrac{v^2}{rg}`, 'Banking without friction')],
      V.circ,
      [4],
      [V.road, TABLES.T10, TABLES.T11],
    ),
  ],
  exam_tips_md: `- Draw one free-body diagram per body; never call weight and the normal reaction an action–reaction pair.
- Use signs for momenta and velocities; a rebound makes the speeds add in $\\Delta p$.
- State why momentum is conserved (no external force, or a very short collision); kinetic energy is not conserved in explosions or sticking collisions.
- In $f = \\mu N$ use the normal reaction; check static friction against the limiting value before deciding whether the body moves.
- Centripetal force is the name for the net inward force: name the real force that supplies it.
- On a banked road decide the direction of friction first; mass cancels in every speed limit.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What does a net force do to a body, according to Galileo and Newton?', 'It changes the velocity (produces an acceleration); no force is needed to keep a velocity constant.', 'concept', 1),
    fc(2, 'State Newton’s first law.', 'A body stays at rest or in uniform motion in a straight line unless a net external force acts on it.', 'concept', 1),
    fc(3, 'What is an inertial frame?', 'A frame in which a body with no net force does not accelerate; an accelerating bus is not one.', 'concept', 1),
    fc(4, 'Write Newton’s second law in terms of momentum.', '$\\vec F_\\text{net} = d\\vec p/dt$, which is $m\\vec a$ for constant mass.', 'formula', 1),
    fc(5, 'Write one newton in base units.', '1 N = 1 kg m s⁻².', 'fact', 1),
    fc(6, 'Define impulse and give its unit.', '$\\int \\vec F\\,dt$, equal to the change in momentum; N s = kg m s⁻¹.', 'concept', 1),
    fc(7, 'What does the area under a force–time graph give?', 'The impulse, which equals the change in momentum.', 'concept', 1),
    fc(8, 'Why does a longer contact time reduce the average force for the same impulse?', '$F_\\text{av} = \\Delta p/\\Delta t$: the same Δp over a longer Δt gives a smaller force.', 'concept', 1),
    fc(9, 'State Newton’s third law and the key feature of a pair.', 'Equal and opposite forces between two bodies; they act on different bodies, so they never cancel.', 'concept', 1),
    fc(10, 'Is the normal reaction on a book the third-law partner of its weight?', 'No: both act on the book. The partner of the weight is the book’s pull on the Earth.', 'concept', 1),
    fc(11, 'A person of mass m stands in a lift accelerating upward at a. What does the scale read?', '$N = m(g + a)$.', 'formula', 1),
    fc(12, 'What does the scale read in a freely falling lift?', 'Zero: apparent weightlessness.', 'concept', 1),
    fc(13, 'Acceleration of a block on a smooth table joined over a pulley to a hanging block?', '$a = m_2 g/(m_1 + m_2)$, with $T = m_1 a$.', 'formula', 1),
    fc(14, 'Atwood machine: acceleration?', '$a = (m_2 - m_1)g/(m_1 + m_2)$.', 'formula', 1),
    fc(15, 'State the law of conservation of linear momentum.', 'If the net external force on a system is zero, its total momentum is constant.', 'concept', 2),
    fc(16, 'Why does a rifle recoil?', 'From rest the total momentum is zero, so the rifle gets momentum equal and opposite to the bullet’s.', 'concept', 2),
    fc(17, 'A rifle (M) fires a bullet (m, speed v). Recoil speed?', '$V = mv/M$.', 'formula', 2),
    fc(18, 'In an explosion, which is conserved: momentum or kinetic energy?', 'Momentum; the kinetic energy increases.', 'concept', 2),
    fc(19, 'Two bodies stick together after a collision. Formula for the common velocity?', '$V = (m_1u_1 + m_2u_2)/(m_1 + m_2)$, with signs.', 'formula', 2),
    fc(20, 'Why does the rocket not need air to push against?', 'It throws exhaust backwards and gains an equal forward momentum.', 'concept', 2),
    fc(21, 'What is the condition for equilibrium of concurrent forces?', '$\\sum\\vec F = 0$: the components along each axis add to zero; the force polygon closes.', 'concept', 3),
    fc(22, 'Write the limits on static and kinetic friction.', '$f_s \\le \\mu_s N$ and $f_k = \\mu_k N$.', 'formula', 3),
    fc(23, 'Which is usually larger: μs or μk?', 'μs.', 'fact', 3),
    fc(24, 'Does friction depend on the apparent area of contact?', 'To a good approximation, no.', 'fact', 3),
    fc(25, 'What is the angle of repose?', 'The angle at which a block just stays at rest on an incline: $\\tan\\theta = \\mu_s$.', 'concept', 3),
    fc(26, 'Which is smaller: rolling friction or sliding friction?', 'Rolling friction, by a large factor.', 'concept', 3),
    fc(27, 'Give the centripetal acceleration in two forms.', '$a_c = v^2/r = \\omega^2 r$, directed to the centre.', 'formula', 4),
    fc(28, 'Is centripetal force a separate force in a free-body diagram?', 'No: it is the net inward force supplied by tension, friction, gravity or a component of N.', 'concept', 4),
    fc(29, 'Greatest speed on a level bend?', '$v_\\text{max} = \\sqrt{\\mu_s r g}$, independent of mass.', 'formula', 4),
    fc(30, 'Speed at which a banked road needs no friction?', '$v = \\sqrt{rg\\tan\\theta}$.', 'formula', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
