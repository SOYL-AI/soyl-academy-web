// ch03 notes and flashcards.
import { T, unit, PROV, r } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { V, EX, TABLES, plotMotion, plotHoriz, plotAngles, plotRange, plotCircA, plotCircR } from './decks.mjs';
import { g } from './phys.mjs';
import { dec } from '../../cbse-11-physics-ch01/src/lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const { ex1, ex2, ex3, ex4, ex5, ex7, ex8, ex9, ex10, ex11 } = EX;
const d3 = (x) => dec(x, 3);
const d4 = (x) => dec(x, 4);

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Motion in a Plane — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Scalars and vectors; addition, subtraction and resolution',
      r`- A **scalar** has magnitude and unit only; a **vector** also has direction and obeys the vector addition law. Displacement, velocity, acceleration and force are vectors; mass, time, distance, speed and energy are scalars.
- Multiplying $\vec{A}$ by a real number $\lambda$ gives a vector of magnitude $|\lambda|A$, along $\vec{A}$ if $\lambda>0$ and opposite if $\lambda<0$. The **unit vector** is $\hat{A}=\vec{A}/A$.
- **Triangle law** (head to tail) and **parallelogram law** (tail to tail): $R=\sqrt{A^2+B^2+2AB\cos\theta}$ and $\tan\alpha = B\sin\theta/(A+B\cos\theta)$. Always $|A-B|\le R\le A+B$. For ${ex1.A} and ${ex1.B} units at ${ex1.th}° the resultant is ${d3(ex1.R)} units at ${d3(ex1.alpha)}° from the first.
- **Subtraction:** $\vec{A}-\vec{B}=\vec{A}+(-\vec{B})$; $|\vec{A}-\vec{B}|=\sqrt{A^2+B^2-2AB\cos\theta}$ (${d3(ex1.sub)} for the same vectors). It is not commutative.
- **Resolution:** $A_x=A\cos\theta$, $A_y=A\sin\theta$, $\vec{A}=A_x\hat{i}+A_y\hat{j}$. To add vectors by components: add the $x$ parts and the $y$ parts, then $R=\sqrt{R_x^2+R_y^2}$ and $\tan\theta=R_y/R_x$ (check the quadrant). Three forces of ${ex2.f.map((f) => f[0]).join(', ')} N at 0°, 120° and 240° give ${d3(ex2.R)} N at ${d3(ex2.ang)}°.`,
      [kt('Vector', 'A quantity with magnitude and direction that adds by the triangle (parallelogram) law.'), kt('Resultant', 'The single vector equivalent to the sum of several vectors.'), kt('Unit vector', 'A vector of magnitude one that gives only a direction (î, ĵ, k̂ along x, y, z).'), kt('Component', 'The projection of a vector on an axis; A cos θ and A sin θ along the axes.')],
      [fm(r`R=\sqrt{A^2+B^2+2AB\cos\theta}`, 'Magnitude of the resultant'), fm(r`\tan\alpha=\dfrac{B\sin\theta}{A+B\cos\theta}`, 'Direction of the resultant'), fm(r`\vec{A}=A_x\hat{i}+A_y\hat{j}`, 'Component form')],
      V.vadd,
      [1],
      [V.vsub, V.scalev, V.resolve, TABLES.T1, TABLES.T2],
    ),
    sec(
      '2. Scalar and vector products',
      r`- **Scalar (dot) product:** $\vec{A}\cdot\vec{B}=AB\cos\theta=A_xB_x+A_yB_y+A_zB_z$, a scalar; it equals $A$ times the projection of $\vec{B}$ on $\vec{A}$; commutative; zero for perpendicular vectors; $\vec{A}\cdot\vec{A}=A^2$.
- **Vector (cross) product:** $\vec{A}\times\vec{B}=AB\sin\theta\,\hat{n}$, with $\hat{n}$ perpendicular to both by the right-hand rule; its magnitude is the area of the parallelogram on $\vec{A}$ and $\vec{B}$; zero for parallel vectors; $\vec{B}\times\vec{A}=-\vec{A}\times\vec{B}$.
- Unit vectors: $\hat{i}\cdot\hat{j}=0$, $\hat{i}\cdot\hat{i}=1$; $\hat{i}\times\hat{j}=\hat{k}$, $\hat{j}\times\hat{k}=\hat{i}$, $\hat{k}\times\hat{i}=\hat{j}$ and the reverse orders give a minus sign.
- Example: $(${ex3.F[0]}\hat{i}+${ex3.F[1]}\hat{j})\cdot(${ex3.d[0]}\hat{i}-4\hat{j}) = ${ex3.W}$, angle ${d3(ex3.th)}°. For $\vec{A}=2\hat{i}+3\hat{j}$ and $\vec{B}=4\hat{i}-\hat{j}$, $\vec{A}\times\vec{B}=${ex4.cr[2]}\hat{k}$, so the triangle on them has area ${ex4.area}.`,
      [kt('Scalar product', 'AB cos θ; a scalar, zero for perpendicular vectors.'), kt('Vector product', 'AB sin θ along the normal given by the right-hand rule; zero for parallel vectors.'), kt('Right-hand rule', 'Curl the fingers of the right hand from the first vector to the second; the thumb gives the direction of the cross product.')],
      [fm(r`\vec{A}\cdot\vec{B}=AB\cos\theta`, 'Dot product'), fm(r`|\vec{A}\times\vec{B}|=AB\sin\theta`, 'Magnitude of the cross product'), fm(r`\vec{A}\times\vec{B}=(A_xB_y-A_yB_x)\hat{k}\ \text{(in the plane)}`, 'Cross product in a plane')],
      V.dotcross,
      [2],
      [TABLES.T3, TABLES.T4],
    ),
    sec(
      '3. Motion in a plane and projectile motion',
      r`- In a plane $\vec{r}=x\hat{i}+y\hat{j}$, $\vec{v}=d\vec{r}/dt$ (tangent to the path) and $\vec{a}=d\vec{v}/dt$. For constant $\vec{a}$ the $x$ and $y$ motions are independent: $\vec{r}=\vec{r}_0+\vec{u}t+\tfrac{1}{2}\vec{a}t^2$. Example: $\vec{u}=3\hat{i}$, $\vec{a}=\hat{i}+2\hat{j}$ gives $\vec{r}=(${ex5.r[0]}\hat{i}+${ex5.r[1]}\hat{j})$ m and speed ${d3(ex5.speed)} m s⁻¹ at $t=4$ s.
- **Projectile** (only gravity, $a=-g$ downward): $x=u\cos\theta\,t$, $y=u\sin\theta\,t-\tfrac{1}{2}gt^2$, path $y=x\tan\theta-gx^2/(2u^2\cos^2\theta)$, a parabola. Horizontal velocity is constant; at the top $v_y=0$ and the speed is $u\cos\theta$.
- Level ground: $T=2u\sin\theta/g$, $H=u^2\sin^2\theta/2g$, $R=u^2\sin2\theta/g$; $R_{max}=u^2/g$ at $45^\circ$, $\theta$ and $90^\circ-\theta$ give equal ranges, $H=R\tan\theta/4$. For $u=${ex8.u}$ m s⁻¹ at 30°: $T=${ex8.T}$ s, $H=${d3(ex8.H)}$ m, $R=${d4(ex8.R)}$ m ($g=9.8$ m s⁻²).
- **Horizontal projection** from height $h$ at speed $u$: $T=\sqrt{2h/g}$, range $uT$; from ${d3(ex7.h)} m at ${ex7.u} m s⁻¹: ${ex7.T} s and ${ex7.R} m, landing at ${d3(ex7.v)} m s⁻¹.
- If landing is not at the launch level, solve $y=0$ (or $y=-h$) as a quadratic in $t$ instead of using the level-ground formulas.`,
      [kt('Projectile', 'A body moving under gravity alone after being launched.'), kt('Time of flight', 'Time from launch to landing: 2u sin θ/g on level ground.'), kt('Range', 'Horizontal distance covered: u² sin 2θ/g on level ground.')],
      [fm(r`y=x\tan\theta-\dfrac{g x^2}{2u^2\cos^2\theta}`, 'Equation of path'), fm(r`T=\dfrac{2u\sin\theta}{g},\ H=\dfrac{u^2\sin^2\theta}{2g},\ R=\dfrac{u^2\sin2\theta}{g}`, 'Level-ground results')],
      V.proj,
      [3],
      [V.horiz, plotMotion, plotHoriz, plotAngles, plotRange, TABLES.T5, TABLES.T6, TABLES.T8, TABLES.T9],
    ),
    sec(
      '4. Uniform circular motion',
      r`- Motion on a circle at constant speed: period $T$, frequency $f=1/T$, **angular speed** $\omega=2\pi/T=2\pi f$ (rad s⁻¹, angles in radians), $v=\omega r$. The velocity is tangent to the circle and changes direction, so the body accelerates although its speed is constant.
- **Centripetal acceleration:** $a=v^2/r=\omega^2 r$, directed towards the centre, perpendicular to $\vec{v}$. Derivation: $|\Delta\vec{v}|=2v\sin(\Delta\theta/2)\approx v\Delta\theta$ and $\Delta t=r\Delta\theta/v$.
- At fixed $r$, $a\propto v^2$; at fixed $v$, $a\propto 1/r$; at fixed $\omega$, $a\propto r$.
- Example: a bike at ${ex10.kmh} km h⁻¹ on a ${ex10.r} m radius track: $v=${ex10.v}$ m s⁻¹, $\omega=${ex10.w}$ rad s⁻¹, $a=${ex10.a}$ m s⁻². A point on the equator has $a=${d3(ex11.a)}$ m s⁻² with $R=6.4\times10^6$ m.
- The average velocity over one full turn is zero (zero displacement); the average speed is $2\pi r/T$.`,
      [kt('Angular speed', 'Angle swept per unit time, ω = 2π/T, in rad s⁻¹.'), kt('Centripetal acceleration', 'The acceleration v²/r = ω²r of uniform circular motion, directed to the centre.'), kt('Period', 'Time for one complete revolution.')],
      [fm(r`a=\dfrac{v^2}{r}=\omega^2 r`, 'Centripetal acceleration'), fm(r`v=\omega r=\dfrac{2\pi r}{T}`, 'Speed on the circle')],
      V.circ,
      [4],
      [V.deltav, plotCircA, plotCircR, TABLES.T7],
    ),
  ],
  exam_tips_md: `- Say which angle you use in the resultant formula (tail to tail); resolve and add components for three or more vectors.
- Dot product is a scalar (A B cos θ); cross product is a vector (A B sin θ) and its direction must be stated.
- Projectile: resolve first; horizontal and vertical motions share only time. T, H, R formulas hold for level ground only.
- At the top of its path a projectile has speed u cos θ and acceleration g downward.
- Circular motion: a = v²/r = ω² r towards the centre; convert km h⁻¹ and rpm first.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Which quantities are vectors: speed, velocity, mass, force?', 'Velocity and force; speed and mass are scalars.', 'concept', 1),
    fc(2, 'State the triangle law of vector addition.', 'Place the tail of B at the head of A; the resultant joins the tail of A to the head of B.', 'concept', 1),
    fc(3, 'Magnitude of the resultant of A and B with angle θ between them?', '$R=\\sqrt{A^2+B^2+2AB\\cos\\theta}$.', 'formula', 1),
    fc(4, 'Between what limits does the resultant of two vectors A and B lie?', 'Between $|A-B|$ and $A+B$.', 'concept', 1),
    fc(5, 'What is the resultant of 6 and 4 units at 60°?', '8.72 units, 23.4° from the 6-unit vector.', 'example', 1),
    fc(6, 'Define the null vector.', 'A vector of zero magnitude (A + (−A)); it has no definite direction.', 'concept', 1),
    fc(7, 'How is A − B defined?', 'As A + (−B), the sum of A and the reversed B.', 'concept', 1),
    fc(8, 'Write the components of a vector of magnitude A at angle θ to +x.', '$A_x=A\\cos\\theta$, $A_y=A\\sin\\theta$.', 'formula', 1),
    fc(9, 'What is a unit vector? Write the unit vector along A.', 'A vector of magnitude 1 with no unit; $\\hat{A}=\\vec{A}/A$.', 'concept', 1),
    fc(10, 'A vector has components 8 and 6. Magnitude and angle?', '10 and 36.9° from the x-axis.', 'example', 1),
    fc(11, 'How do you find the change in velocity when a velocity v₁ becomes v₂?', 'By vector subtraction: $\\Delta\\vec{v}=\\vec{v}_2-\\vec{v}_1=\\vec{v}_2+(-\\vec{v}_1)$.', 'formula', 1),
    fc(12, 'What does multiplying a vector by −2 do?', 'Doubles its length and reverses its direction.', 'concept', 1),
    fc(13, 'Define the scalar product and say what kind of quantity it is.', '$\\vec{A}\\cdot\\vec{B}=AB\\cos\\theta$; a scalar.', 'concept', 2),
    fc(14, 'When is the dot product of two non-zero vectors zero?', 'When they are perpendicular.', 'concept', 2),
    fc(15, 'Dot product in components?', '$A_xB_x+A_yB_y+A_zB_z$.', 'formula', 2),
    fc(16, 'Define the vector product: magnitude and direction.', 'Magnitude $AB\\sin\\theta$; direction perpendicular to both by the right-hand rule.', 'concept', 2),
    fc(17, 'What does |A × B| equal geometrically?', 'The area of the parallelogram on A and B.', 'concept', 2),
    fc(18, 'Is A × B = B × A?', 'No: B × A = −(A × B).', 'concept', 2),
    fc(19, 'Evaluate î × ĵ, ĵ × î and î × î.', 'k̂, −k̂ and 0.', 'formula', 2),
    fc(20, 'When is the cross product of two non-zero vectors zero?', 'When they are parallel or antiparallel.', 'concept', 2),
    fc(21, 'What is the shape of the path of a projectile (no air resistance)?', 'A parabola.', 'fact', 3),
    fc(22, 'What acceleration does a projectile have at the top of its path?', 'g downward; it is the same everywhere.', 'concept', 3),
    fc(23, 'Which velocity component of a projectile is constant?', 'The horizontal one, $u\\cos\\theta$.', 'concept', 3),
    fc(24, 'Time of flight on level ground?', '$T=2u\\sin\\theta/g$.', 'formula', 3),
    fc(25, 'Maximum height on level ground?', '$H=u^2\\sin^2\\theta/2g$.', 'formula', 3),
    fc(26, 'Range on level ground?', '$R=u^2\\sin2\\theta/g$.', 'formula', 3),
    fc(27, 'At which angle is the range greatest, and what is it?', '45°; $R_{max}=u^2/g$.', 'fact', 3),
    fc(28, 'Which angles give the same range?', 'θ and 90° − θ.', 'concept', 3),
    fc(29, 'Speed at the top of a projectile launched at speed u, angle θ?', '$u\\cos\\theta$ (the minimum speed).', 'concept', 3),
    fc(30, 'A stone is thrown horizontally from 78.4 m at 20 m/s. Time and range?', '4 s and 80 m.', 'example', 3),
    fc(31, 'Relation between angular speed and period?', '$\\omega=2\\pi/T$.', 'formula', 4),
    fc(32, 'Formula and direction of centripetal acceleration?', '$a=v^2/r=\\omega^2r$, towards the centre.', 'formula', 4),
    fc(33, 'Why does a body in uniform circular motion accelerate?', 'Its velocity changes direction although the speed is constant.', 'concept', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
void g;
