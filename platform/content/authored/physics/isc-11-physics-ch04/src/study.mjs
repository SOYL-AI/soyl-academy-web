// ISC 11 ch04 notes (one section per syllabus topic) and 30 flashcards.
import { T, unit, PROV, r } from '../../isc-11-physics-ch01/src/lib.mjs';
import { V, EX, plotV, plotTraj, plotY, plotR, plotSpeed, TABLES } from './decks.mjs';
import { dec } from '../../isc-11-physics-ch01/src/lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const { M, ex1, ex2, ex3, ex4, ex5, ex6 } = EX;
const f = (x, n = 3) => dec(x, n);

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Projectile Motion — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Projectile motion as two independent motions; terms used',
      r`- A **projectile** is a body thrown into the air that then moves under gravity alone; its path is the **trajectory**. Air resistance is neglected and $g = 9.8$ m s⁻² is taken constant and vertically downward. A cricket ball, a kicked football and a water jet are projectiles; a rocket under thrust is not.
- The motion is two independent motions that share only the time. **Horizontal:** no force, so $a_x = 0$ and $v_x = u\cos\theta$ stays constant. **Vertical:** $a_y = -g$, as in a vertical throw with speed $u\sin\theta$.
- Terms: **angle of projection** $\theta$ (initial velocity with the horizontal); **time of flight** $T$; **maximum height** $H$ (where $v_y = 0$); **horizontal range** $R$ (launch and landing on the same level).
- At the highest point the velocity is not zero: it is horizontal, equal to $u\cos\theta$, the least speed of the flight, and the acceleration is still $g$ downward.
- A ball thrown at ${M.u} m s⁻¹ at ${M.th}° has $u_x = ${f(M.ux)}$ m s⁻¹ and $u_y = ${f(M.uy)}$ m s⁻¹; after ${ex1.t} s it is ${f(ex1.x)} m along and ${f(ex1.y)} m up.`,
      [kt('Projectile', 'A body moving under the force of gravity alone after being thrown.'), kt('Trajectory', 'The path of the projectile; a parabola when air resistance is neglected.'), kt('Angle of projection', 'The angle between the initial velocity and the horizontal.'), kt('Time of flight', 'Time from launch until the body is back at the launch level.'), kt('Range', 'Horizontal distance from the launch point to the landing point at the launch level.')],
      [fm(r`x = (u\cos\theta)\,t,\quad y = (u\sin\theta)\,t - \tfrac{1}{2}gt^2`, 'Position at time t'), fm(r`v_x = u\cos\theta,\quad v_y = u\sin\theta - gt`, 'Velocity components')],
      V.twomot,
      [1],
      [plotV, TABLES.T_EX, TABLES.T_INDEP, V.terms, TABLES.T_XY],
    ),
    sec(
      '2. Trajectory, time of flight, maximum height, range and maximum range',
      r`- **Trajectory:** eliminating $t$ gives $y = x\tan\theta - \dfrac{gx^2}{2u^2\cos^2\theta}$, of the form $y = ax - bx^2$: a **parabola**.
- **Time of flight:** $y = 0$ gives $T = \dfrac{2u\sin\theta}{g}$; the top is reached at $T/2$.
- **Maximum height:** $v_y = 0$ gives $H = \dfrac{u^2\sin^2\theta}{2g}$.
- **Range:** $R = (u\cos\theta)T = \dfrac{u^2\sin 2\theta}{g}$. **Maximum range** $R_{\max} = u^2/g$ at $\theta = 45^\circ$, where $R = 4H$; in general $H/R = \tan\theta/4$.
- **Complementary angles** $\theta$ and $90^\circ - \theta$ give the same range (since $\sin(180^\circ - 2\theta) = \sin 2\theta$) but different heights ($H \propto \sin^2\theta$) and times ($T \propto \sin\theta$).
- Example: a goal kick at ${ex2.u} m s⁻¹ and ${ex2.th}° has $T = ${f(ex2.T)}$ s, $H = ${f(ex2.H)}$ m and $R = ${f(ex2.R)}$ m. A hose jet at ${ex3.u} m s⁻¹ reaches at most ${f(ex3.Rmax)} m; a target ${ex3.R} m away needs ${f(ex3.th1)}° or ${f(ex3.th2)}°.
- These formulas hold for launch and landing on one level, with no air resistance.`,
      [kt('Parabola', 'The curve y = ax − bx²; the shape of the trajectory.'), kt('Maximum range', 'R = u²/g, obtained when the angle of projection is 45°.'), kt('Complementary angles', 'Two angles that add up to 90°.')],
      [fm(r`y = x\tan\theta - \dfrac{gx^2}{2u^2\cos^2\theta}`, 'Equation of the trajectory'), fm(r`T = \dfrac{2u\sin\theta}{g}`, 'Time of flight'), fm(r`H = \dfrac{u^2\sin^2\theta}{2g}`, 'Maximum height'), fm(r`R = \dfrac{u^2\sin 2\theta}{g}`, 'Horizontal range'), fm(r`R_{\max} = \dfrac{u^2}{g}\ (\theta = 45^\circ)`, 'Maximum range')],
      plotTraj,
      [2],
      [plotY, plotR, V.comp, TABLES.T_EX2, TABLES.T_RANGE],
    ),
    sec(
      '3. Instantaneous velocity; horizontally launched projectiles',
      r`- **Velocity at time $t$:** $v_x = u\cos\theta$, $v_y = u\sin\theta - gt$; magnitude $v = \sqrt{v_x^2 + v_y^2}$ and direction $\tan\alpha = v_y/v_x$ with the horizontal (above if $v_y > 0$, below if $v_y < 0$). It is always tangent to the path. At the launch level on landing the speed is $u$ and the direction is $\theta$ below the horizontal; at height $y$, $v^2 = u^2 - 2gy$.
- Example: the goal-kick ball at ${ex4.t} s has $v_x = ${f(ex4.vx)}$ m s⁻¹, $v_y = ${f(ex4.vy)}$ m s⁻¹, speed ${f(ex4.v)} m s⁻¹, ${f(ex4.ang)}° below the horizontal.
- **Horizontal projection** at speed $u$ from height $h$ ($y$ downward, $u_y = 0$): $x = ut$, $y = \tfrac{1}{2}gt^2$; **time of fall** $T = \sqrt{2h/g}$ (independent of $u$, equal to the time of free fall); **range** $R = u\sqrt{2h/g}$; **path** $y = \dfrac{g}{2u^2}x^2$ (half a parabola).
- **On landing:** $v_x = u$, $v_y = gT = \sqrt{2gh}$, $v = \sqrt{u^2 + 2gh}$, $\tan\alpha = gT/u$ below the horizontal.
- A stone thrown at ${ex5.u} m s⁻¹ from a ${ex5.h} m bridge lands after ${f(ex5.T)} s, ${f(ex5.R)} m away, at ${f(ex5.v)} m s⁻¹ and ${f(ex5.ang)}° below the horizontal. A packet released at ${ex6.u} m s⁻¹ from ${ex6.h} m falls for ${f(ex6.T)} s and lands ${f(ex6.R)} m ahead of the release point.`,
      [kt('Instantaneous velocity of a projectile', 'The vector sum of the constant horizontal velocity and the changing vertical velocity; tangent to the path.'), kt('Horizontal projection', 'Projection with zero vertical component of the initial velocity, from a height h.'), kt('Time of fall', 'T = √(2h/g); the same as for a body dropped from rest at that height.')],
      [fm(r`v = \sqrt{v_x^2 + v_y^2},\quad \tan\alpha = \dfrac{v_y}{v_x}`, 'Velocity at time t'), fm(r`T = \sqrt{\dfrac{2h}{g}},\quad R = u\sqrt{\dfrac{2h}{g}}`, 'Horizontal projection'), fm(r`v = \sqrt{u^2 + 2gh}`, 'Landing speed, horizontal projection')],
      V.horiz,
      [3],
      [V.veldir, plotSpeed, V.strobe, TABLES.T_HP, TABLES.T_PK],
    ),
  ],
  exam_tips_md: `- Start every derivation with the assumptions (no air resistance, constant g, launch and landing on one level) and the two component equations.
- Trajectory: eliminate t. Time of flight: y = 0. Maximum height: v_y = 0. Range: horizontal speed × time of flight, with 2 sin θ cos θ = sin 2θ.
- Maximum range needs sin 2θ = 1; equal ranges for θ and 90° − θ need sin(180° − 2θ) = sin 2θ.
- At the top v is not zero (v = u cos θ) but v_y = 0.
- Velocity questions need magnitude and direction, with 'above' or 'below' the horizontal.
- Horizontal projection: y measured downward, T = √(2h/g) independent of u.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is a projectile?', 'A body thrown into the air that then moves under gravity alone (air resistance neglected).', 'concept', 1),
    fc(2, 'Name the path of a projectile.', 'The trajectory; a parabola.', 'fact', 1),
    fc(3, 'Why is a rocket with its engine burning not a projectile?', 'Thrust acts on it besides gravity.', 'concept', 1),
    fc(4, 'Why does the horizontal velocity of a projectile stay constant?', 'No horizontal force acts (ignoring air), so $a_x = 0$.', 'concept', 1),
    fc(5, 'What is the vertical acceleration of a projectile at the top?', '$g = 9.8$ m s⁻² downward, the same as at every other instant.', 'concept', 1),
    fc(6, 'What do the two motions of a projectile share?', 'Only the time.', 'concept', 1),
    fc(7, 'Define angle of projection.', 'The angle between the initial velocity and the horizontal.', 'concept', 1),
    fc(8, 'Define time of flight and horizontal range.', 'Time of flight: time from launch to return to the launch level. Range: horizontal distance covered in that time.', 'concept', 1),
    fc(9, 'Resolve $u$ at angle $\\theta$ into components.', '$u_x = u\\cos\\theta$ (horizontal) and $u_y = u\\sin\\theta$ (vertical).', 'formula', 1),
    fc(10, 'Write $x(t)$ and $y(t)$ for a projectile.', '$x = (u\\cos\\theta)t$; $y = (u\\sin\\theta)t - \\tfrac{1}{2}gt^2$.', 'formula', 2),
    fc(11, 'Write the equation of the trajectory.', '$y = x\\tan\\theta - \\dfrac{gx^2}{2u^2\\cos^2\\theta}$.', 'formula', 2),
    fc(12, 'Why is the trajectory a parabola?', 'It has the form $y = ax - bx^2$ with constant $a$ and $b$.', 'concept', 2),
    fc(13, 'Write the time of flight.', '$T = \\dfrac{2u\\sin\\theta}{g}$.', 'formula', 2),
    fc(14, 'Write the maximum height.', '$H = \\dfrac{u^2\\sin^2\\theta}{2g}$.', 'formula', 2),
    fc(15, 'Write the horizontal range.', '$R = \\dfrac{u^2\\sin 2\\theta}{g}$.', 'formula', 2),
    fc(16, 'At what angle is the range greatest, and what is it?', '$45^\\circ$; $R_{\\max} = u^2/g$.', 'formula', 2),
    fc(17, 'What is the relation between $R$ and $H$ at $45^\\circ$?', '$R = 4H$ (in general $H/R = \\tan\\theta/4$).', 'formula', 2),
    fc(18, 'Which angles give equal ranges at the same speed?', 'Complementary angles, $\\theta$ and $90^\\circ - \\theta$.', 'concept', 2),
    fc(19, 'Prove equal ranges for $\\theta$ and $90^\\circ - \\theta$.', '$\\sin 2(90^\\circ - \\theta) = \\sin(180^\\circ - 2\\theta) = \\sin 2\\theta$.', 'concept', 2),
    fc(20, 'Compare $H$ and $T$ for $30^\\circ$ and $60^\\circ$ at the same $u$.', '$H$ is in the ratio $1:3$ and $T$ in the ratio $1:\\sqrt{3}$; the $60^\\circ$ throw is higher and longer.', 'example', 2),
    fc(21, 'How does $H$ change if $u$ is doubled at a fixed angle?', 'It becomes four times larger ($H \\propto u^2$); the range also becomes four times larger.', 'concept', 2),
    fc(22, 'Range of a throw at $20$ m s⁻¹ and $45^\\circ$ ($g = 9.8$)?', `$R = u^2/g = 400/9.8 = ${f(400 / 9.8)}$ m.`, 'example', 2),
    fc(23, 'Write the velocity components at time $t$.', '$v_x = u\\cos\\theta$; $v_y = u\\sin\\theta - gt$.', 'formula', 3),
    fc(24, 'How are the magnitude and direction of the velocity found?', '$v = \\sqrt{v_x^2 + v_y^2}$; $\\tan\\alpha = v_y/v_x$ with the horizontal.', 'formula', 3),
    fc(25, 'What is the speed at the highest point?', '$u\\cos\\theta$, the least speed (velocity horizontal).', 'concept', 3),
    fc(26, 'What are the speed and direction on landing at the launch level?', 'Speed $u$, directed $\\theta$ below the horizontal.', 'concept', 3),
    fc(27, 'Time of fall for a horizontal launch from height $h$?', '$T = \\sqrt{2h/g}$, independent of the launch speed.', 'formula', 3),
    fc(28, 'Range of a horizontal projection?', '$R = u\\sqrt{2h/g}$.', 'formula', 3),
    fc(29, 'Path of a body thrown horizontally?', 'Half a parabola, $y = gx^2/(2u^2)$ with $y$ downward from the launch point.', 'concept', 3),
    fc(30, 'A stone is dropped and another thrown sideways from the same height. Which lands first?', 'Neither: they land together, because the vertical motions are identical.', 'concept', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
