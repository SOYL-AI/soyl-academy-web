// ISC 11 ch06 notes (one section per syllabus topic) and 30 flashcards.
import { T, unit, PROV, r, dec } from '../../isc-11-physics-ch01/src/lib.mjs';
import { V, EX, plotFric, plotRepose, plotRoller, TABLES } from './decks.mjs';
import { rad } from './phys.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const { crate, ex2, ex3, up, dn, rl, ex4, lam } = EX;
const f = (x, n = 3) => dec(x, n);

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Friction — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Views of friction; static, limiting, kinetic and rolling friction',
      r`- **Friction** opposes the relative motion, or the tendency of relative motion, between surfaces in contact, and acts along them. It is useful (walking, braking) and harmful (wear, heat).
- **Classical view:** the hills and hollows of the two surfaces **interlock**; sliding means lifting over or shearing the hills. It cannot explain why very smooth, clean surfaces can show **more** friction.
- **Modern view:** the surfaces touch only at the tips of the highest hills (real contact area is a tiny fraction of the apparent area). At these points the atoms **adhere** (**cold welding**); friction is the force needed to break the junctions. More pressing flattens more tips, so the real contact area, and so the friction, grows in proportion to $N$.
- **Static friction** is **self-adjusting**: while the body is at rest it equals the applied force (or the balancing component), from zero up to the **limiting friction** $f_{\max}$. For the ${crate.m} kg crate: pushes of ${crate.F1} N and ${crate.F2} N meet friction of ${crate.F1} N and ${crate.F2} N; the limit is ${f(crate.fmax, 4)} N.
- **Kinetic (sliding) friction** acts once the surfaces slide; it is nearly constant and **less** than limiting friction (${f(crate.fk, 4)} N for the crate).
- **Rolling friction** acts on a wheel or ball rolling without slipping; no junctions are sheared, so it is **much smaller**: rolling < kinetic < limiting static.`,
      [kt('Friction', 'The force opposing the relative motion, or its tendency, between two surfaces in contact.'), kt('Cold welding', 'Sticking of atoms of two clean surfaces at the points of real contact under high pressure.'), kt('Static friction', 'Friction between surfaces at rest; self-adjusting up to a maximum.'), kt('Limiting friction', 'The maximum static friction, when the body is just about to slide.'), kt('Kinetic friction', 'Friction between surfaces sliding over each other.'), kt('Rolling friction', 'Friction on a body rolling without slipping; the smallest kind.')],
      [fm(r`f_s \le \mu_s N`, 'Static friction (self-adjusting)'), fm(r`f_{\max} = \mu_s N`, 'Limiting friction')],
      V.contact,
      [1],
      [TABLES.T_KINDS, TABLES.T_VIEWS, V.selfadj, TABLES.T_ROLL],
    ),
    sec(
      '2. Laws of friction; coefficients; the friction graph; friction is non-conservative',
      r`- **Laws:** friction acts along the surfaces and opposes the relative motion or its tendency; limiting friction is proportional to the normal reaction, independent of the apparent area of contact, and depends on the nature of the surfaces; kinetic friction is proportional to the normal reaction, nearly independent of speed and area, and smaller than limiting friction.
- **Coefficients** (pure numbers): $\mu_s = f_{\max}/N$ and $\mu_k = f_k/N$, with $\mu_k < \mu_s$; they can exceed 1.
- **Graph of $f$ against $F$:** a straight line of slope 1 (static, $f = F$) up to the peak $f_{\max}$; a drop to $f_k$ when sliding starts; then a nearly horizontal line.
- **Example:** a ${ex2.m1} kg block slipping at ${ex2.fslip} N has $\mu_s = ${f(ex2.mus, 3)}$; with a ${ex2.add} kg load the limiting friction becomes ${f(ex2.f2, 3)} N. The ${crate.m} kg crate pushed with ${crate.F3} N accelerates at ${f(crate.a, 3)} m s⁻².
- **Non-conservative:** kinetic friction always opposes the displacement, so the work done is $-\mu_k N \times$ (path length), which depends on the path, and the work around a closed path is not zero. No potential energy exists for friction; the energy becomes heat. Dragging a ${ex3.m} kg box over a rough floor ($\mu_k = ${ex3.muk}$): ${f(ex3.W1, 3)} J along ${ex3.straight} m, ${f(ex3.W2, 3)} J along ${ex3.via} m, ${f(ex3.Wround, 3)} J for the round trip.`,
      [kt('Coefficient of static friction', 'μs = f(max)/N for a pair of surfaces; no unit.'), kt('Coefficient of kinetic friction', 'μk = fk/N; less than μs.'), kt('Conservative force', 'A force whose work between two points is independent of the path (zero around a closed path).'), kt('Non-conservative force', 'A force, such as friction, whose work depends on the path.')],
      [fm(r`\mu_s = \dfrac{f_{\max}}{N}`, 'Coefficient of static friction'), fm(r`\mu_k = \dfrac{f_k}{N}`, 'Coefficient of kinetic friction'), fm(r`W_f = -\mu_k N \times (\text{path length})`, 'Work done by kinetic friction')],
      plotFric,
      [2],
      [TABLES.T_COEF, TABLES.T_LAWS, TABLES.T_MEAS, TABLES.T_PATHS],
    ),
    sec(
      '3. Motion on a rough incline; pulling and pushing a roller',
      r`- **Resolve the weight:** $mg\sin\theta$ along the slope, $mg\cos\theta$ perpendicular to it, so $N = mg\cos\theta$ and the greatest friction is $\mu mg\cos\theta$. Friction acts along the slope, against the motion or its tendency.
- **At rest:** $f_s = mg\sin\theta$ (self-adjusting). The block slides when $\tan\theta = \mu_s$.
- **Sliding down:** $a = g(\sin\theta - \mu_k\cos\theta)$; the mass cancels. A block of ${dn.m} kg on ${dn.th}° with $\mu_k = ${dn.mu}$ accelerates at ${f(dn.a, 4)} m s⁻² and, from rest, reaches ${f(dn.v, 3)} m s⁻¹ after ${dn.s} m.
- **Pushed up** with force $P$ along the slope: $P = mg(\sin\theta + \mu\cos\theta) + ma$. For ${up.m} kg on ${up.th}° with $\mu = ${up.mu}$: ${f(up.P, 4)} N at constant speed, ${f(up.Pa, 4)} N with $a = ${up.a}$ m s⁻².
- **Held at rest** on a steep slope ($\tan\theta > \mu_s$): least force up the slope $mg(\sin\theta - \mu_s\cos\theta)$. **Pushed down** at constant speed on a slope where $\tan\theta < \mu$: $mg(\mu\cos\theta - \sin\theta)$.
- **Roller** (handle at $\varphi$, constant speed): pulling, $N = W - F\sin\varphi$ and $F = \dfrac{\mu W}{\cos\varphi + \mu\sin\varphi}$; pushing, $N = W + F\sin\varphi$ and $F = \dfrac{\mu W}{\cos\varphi - \mu\sin\varphi}$. Pulling is easier because it **lightens** the roller on the ground and pushing **presses** it down. For ${rl.m} kg, $\mu = ${rl.mu}$, $\varphi = ${rl.phi}^\circ$: pull ${f(rl.pull, 4)} N, push ${f(rl.push, 4)} N.`,
      [kt('Normal reaction on a slope', 'N = mg cos θ for a block on a slope of angle θ with no other force perpendicular to it.'), kt('Roller', 'A heavy cylinder moved over the ground by a force along its handle at angle φ.')],
      [fm(r`a = g(\sin\theta - \mu_k\cos\theta)`, 'Acceleration down a rough slope'), fm(r`P = mg(\sin\theta + \mu\cos\theta) + ma`, 'Force along the slope to push a block up'), fm(r`F_{\text{pull}} = \dfrac{\mu W}{\cos\varphi + \mu\sin\varphi},\quad F_{\text{push}} = \dfrac{\mu W}{\cos\varphi - \mu\sin\varphi}`, 'Roller at constant speed')],
      V.down,
      [3],
      [TABLES.T_RES, plotRepose, V.up, TABLES.T_SLOPE4, V.roller, plotRoller],
    ),
    sec(
      '4. Angle of friction and angle of repose; reducing friction',
      r`- **Angle of friction** $\lambda$: the angle between the normal reaction $N$ and the resultant $R$ of $N$ and the **limiting** friction. $\tan\lambda = f_{\max}/N = \mu_s$. For $\mu_s = 0.5$, $\lambda = ${f(lam, 4)}^\circ$.
- **Angle of repose** $\alpha$: the steepest slope at which a body stays at rest on an inclined plane. At $\alpha$: $mg\sin\alpha = \mu_s N$ and $N = mg\cos\alpha$, so **$\tan\alpha = \mu_s$**. Since $\tan\lambda = \mu_s$ also, **$\alpha = \lambda$**: $N$ and $f_{\max}$ balance the weight, so their resultant is vertical and makes the angle $\alpha$ with the normal. The mass does not matter.
- **Measuring $\mu_s$** with a tilting plank: slips at a mean of ${f(ex4.mean, 3)}° give $\mu_s = ${f(ex4.mus, 3)}$.
- **Reducing friction:** **lubrication** (liquid layers slide instead of solid on solid), **ball and roller bearings** (rolling replaces sliding), **streamlining** (smooth tapering shape cuts air or water drag), polishing and wheels. Where grip is wanted (tyre treads, shoe soles), friction is **increased** instead.`,
      [kt('Angle of friction', 'The angle between the normal reaction and the resultant of the normal reaction and limiting friction; tan λ = μs.'), kt('Angle of repose', 'The greatest slope angle at which a body can rest on an inclined plane; tan α = μs.'), kt('Lubricant', 'A liquid or grease film that keeps solid surfaces apart.'), kt('Streamlining', 'A smooth, tapering shape that reduces the drag of a fluid.')],
      [fm(r`\tan\lambda = \mu_s`, 'Angle of friction'), fm(r`\tan\alpha = \mu_s \ \Rightarrow\ \alpha = \lambda`, 'Angle of repose')],
      V.angles,
      [4],
      [V.repose, TABLES.T_REP, TABLES.T_REDUCE, V.bearing],
    ),
  ],
  exam_tips_md: `- Friction on a body at rest is the balancing force (equal to the push, or to mg sin θ on a slope), not μs N; μs N is the limit.
- Draw the free-body diagram first; friction is along the surface and opposes the motion or its tendency.
- On a slope N = mg cos θ; sliding down a = g(sin θ − μk cos θ); pushed up P = mg(sin θ + μ cos θ) + ma.
- Roller: pulling N = W − F sin φ (easier), pushing N = W + F sin φ (harder).
- tan λ = μs and tan α = μs, so α = λ; show both equations and divide.
- Friction is non-conservative: its work depends on the path and is negative; energy goes to heat.
- State the methods of reducing friction with how each works (lubrication, bearings, streamlining).`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is friction?', 'The force opposing the relative motion, or the tendency of relative motion, between two surfaces in contact; it acts along the surfaces.', 'concept', 1),
    fc(2, 'State the classical view of the origin of friction.', 'The hills and hollows of the two surfaces interlock; sliding means lifting over or shearing the hills.', 'concept', 1),
    fc(3, 'State the modern view of the origin of friction.', 'The surfaces touch only at a few tips, where the atoms adhere (cold welding); friction is the force to break these junctions.', 'concept', 1),
    fc(4, 'Why can very smooth, clean surfaces show greater friction?', 'More atoms come into real contact, so adhesion increases; the classical view cannot explain this.', 'concept', 1),
    fc(5, 'What does it mean that static friction is self-adjusting?', 'While the body is at rest it equals the applied force, from zero up to the limiting value.', 'concept', 1),
    fc(6, 'Define limiting friction.', 'The maximum value of static friction, reached when the body is just about to slide.', 'concept', 1),
    fc(7, 'Compare kinetic and limiting friction.', 'Kinetic friction is smaller and nearly constant; limiting friction is the larger peak value.', 'concept', 1),
    fc(8, 'Arrange static (limiting), kinetic and rolling friction in increasing order.', 'Rolling < kinetic < limiting static friction.', 'fact', 1),
    fc(9, 'Why is rolling friction so small?', 'No sliding at the point of contact, so no junctions are sheared; only slight flattening of wheel and road.', 'concept', 1),
    fc(10, 'Define $\\mu_s$ and $\\mu_k$.', '$\\mu_s = f_{\\max}/N$ and $\\mu_k = f_k/N$; pure numbers with $\\mu_k < \\mu_s$.', 'formula', 2),
    fc(11, 'Does limiting friction depend on the area of contact?', 'No: it depends on the normal reaction and the nature of the surfaces, not on the apparent area.', 'concept', 2),
    fc(12, 'State the law connecting limiting friction and normal reaction.', 'Limiting friction is proportional to the normal reaction: $f_{\\max} = \\mu_s N$.', 'concept', 2),
    fc(13, 'What happens to $f_{\\max}$ when the load on a block is doubled?', 'It doubles, since $N$ doubles.', 'concept', 2),
    fc(14, 'Describe the graph of friction against applied force.', 'A line of slope 1 up to the peak $f_{\\max}$, a drop to $f_k$ when sliding starts, then a nearly flat line.', 'concept', 2),
    fc(15, 'Can a coefficient of friction exceed 1?', 'Yes, for sticky pairs such as rubber on dry concrete; it is a ratio of forces.', 'fact', 2),
    fc(16, 'Why is friction a non-conservative force?', 'The work it does depends on the path (negative along every part), and around a closed path it is not zero.', 'concept', 2),
    fc(17, 'Where does the energy lost to friction go?', 'It becomes heat at the surfaces.', 'concept', 2),
    fc(18, `Limiting friction for ${crate.m} kg with $\\mu_s = ${crate.mus}$ ($g = 9.8$)?`, `$f_{\\max} = ${crate.mus} \\times ${crate.m} \\times 9.8 = ${f(crate.fmax, 5)}$ N.`, 'example', 2),
    fc(19, 'What is the normal reaction on a block on a slope of angle $\\theta$?', '$N = mg\\cos\\theta$.', 'formula', 3),
    fc(20, 'What is the friction on a block at rest on a slope?', '$mg\\sin\\theta$ (self-adjusting), as long as it is below $\\mu_s mg\\cos\\theta$.', 'concept', 3),
    fc(21, 'Write the acceleration of a block sliding down a rough slope.', '$a = g(\\sin\\theta - \\mu_k\\cos\\theta)$.', 'formula', 3),
    fc(22, 'Write the force along the slope to push a block up at constant speed.', '$P = mg(\\sin\\theta + \\mu\\cos\\theta)$.', 'formula', 3),
    fc(23, 'Why does friction act down the slope when a block is pushed up?', 'Friction opposes the motion, which is up the slope.', 'concept', 3),
    fc(24, 'Why is it easier to pull a roller than to push it?', 'Pulling lifts part of the weight, so $N = W - F\\sin\\varphi$; pushing presses down, $N = W + F\\sin\\varphi$.', 'concept', 3),
    fc(25, 'Write the force to pull a roller at constant speed.', '$F = \\dfrac{\\mu W}{\\cos\\varphi + \\mu\\sin\\varphi}$.', 'formula', 3),
    fc(26, 'Define the angle of friction.', 'The angle between the normal reaction and the resultant of the normal reaction and limiting friction; $\\tan\\lambda = \\mu_s$.', 'concept', 4),
    fc(27, 'Define the angle of repose and relate it to $\\mu_s$.', 'The steepest slope at which a body stays at rest; $\\tan\\alpha = \\mu_s$.', 'concept', 4),
    fc(28, 'How are the angle of friction and the angle of repose related?', 'They are equal: $\\alpha = \\lambda$, as both have tangent $\\mu_s$.', 'concept', 4),
    fc(29, `Angle of repose for $\\mu_s = ${ex4.mus.toFixed(3)}$?`, `$\\alpha = \\arctan ${ex4.mus.toFixed(3)} = ${f(ex4.mean, 3)}^\\circ$.`, 'example', 4),
    fc(30, 'Name three ways of reducing friction.', 'Lubrication, ball bearings (rolling instead of sliding) and streamlining.', 'fact', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
void rad;
