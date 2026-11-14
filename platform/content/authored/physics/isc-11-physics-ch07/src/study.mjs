// ISC 11 ch07 notes (one section per syllabus topic) and 30 flashcards.
import { T, unit, PROV, r, dec } from '../../isc-11-physics-ch01/src/lib.mjs';
import { V, EX, plotW, plotAc, plotBank, plotT, TABLES } from './decks.mjs';
import { deg } from './phys.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const { A0, pot, fan, cyc, stn, lv, bk, rail, Vv, bkt } = EX;
const f = (x, n = 3) => dec(x, n);

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Circular Motion — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Angular displacement, velocity and acceleration; relations with linear quantities',
      r`- **Angular displacement** $\theta$: the angle swept by the radius to the body; unit **radian**, $\theta = s/r$, so $s = r\theta$. $2\pi$ rad $= 360^\circ$, $1$ rad $= ${f(deg(1), 4)}^\circ$. Anticlockwise is positive; the vector lies along the axis (right-hand rule).
- **Angular velocity** $\omega = \Delta\theta/\Delta t = 2\pi/T = 2\pi f$, in rad s$^{-1}$. rpm $\to$ rad s$^{-1}$: multiply by $2\pi/60$. A potter’s wheel at ${pot.rpm} rpm has $\omega = ${f(pot.w, 4)}$ rad s$^{-1}$.
- **Linear speed** $v = r\omega$, along the tangent. All points of a rigid rotating body share one $\omega$; their speeds are proportional to their distances from the axis (${pot.R} m: ${f(pot.v, 4)} m s⁻¹; ${pot.r2} m: ${f(pot.v2, 4)} m s⁻¹).
- **Angular acceleration** $\alpha = \Delta\omega/\Delta t$ in rad s$^{-2}$. For constant $\alpha$: $\omega = \omega_0 + \alpha t$, $\theta = \omega_0 t + \tfrac12\alpha t^2$. On an $\omega$–$t$ graph the slope is $\alpha$ and the area is $\theta$.
- **Tangential acceleration** $a_t = r\alpha$ (along the tangent; changes the speed). The radial part is the centripetal acceleration $a_c = \omega^2 r$. The total acceleration is $\sqrt{a_t^2 + a_c^2}$. Example: a fan tip at ${fan.R} m with $\alpha = ${fan.alpha}$ rad s$^{-2}$ after ${fan.t} s has $\omega = ${f(fan.w, 3)}$ rad s$^{-1}$, $a_t = ${f(fan.at, 3)}$ m s$^{-2}$, $a_c = ${f(fan.ac, 4)}$ m s$^{-2}$.`,
      [kt('Radian', 'The angle at the centre of a circle for which the arc equals the radius.'), kt('Angular velocity', 'Rate of change of angular displacement, ω = dθ/dt.'), kt('Angular acceleration', 'Rate of change of angular velocity, α = dω/dt.'), kt('Tangential acceleration', 'The part of the acceleration along the tangent, a_t = rα; changes the speed.')],
      [fm(r`s = r\theta`, 'Arc length'), fm(r`\omega = \dfrac{2\pi}{T} = 2\pi f`, 'Angular velocity'), fm(r`v = r\omega`, 'Linear speed'), fm(r`a_t = r\alpha`, 'Tangential acceleration'), fm(r`\omega = \omega_0 + \alpha t,\ \theta = \omega_0 t + \tfrac12\alpha t^2`, 'Constant α')],
      V.ang,
      [1],
      [TABLES.T_RAD, TABLES.T_EVERY, TABLES.T_TURN, plotW, TABLES.T_LIN],
    ),
    sec(
      '2. Centripetal acceleration; centripetal force as the name of a direction',
      r`- In **uniform circular motion** the speed is constant but the **velocity changes direction**, so the body has an acceleration.
- **Derivation.** Take points P and Q a small angle $\Delta\theta$ apart. Draw $\vec v_1$ and $\vec v_2$ (each of size $v$, perpendicular to its radius) from one point; the angle between them is $\Delta\theta$. $\Delta\vec v = \vec v_2 - \vec v_1$ is the base of an isosceles triangle: $|\Delta v| = 2v\sin(\Delta\theta/2) \approx v\Delta\theta$ for small $\Delta\theta$. So $a = |\Delta v|/\Delta t = v\omega = v^2/r = \omega^2 r$. As $\Delta\theta \to 0$, $\Delta\vec v$ is perpendicular to $\vec v$: **towards the centre**. Also $a = 4\pi^2 r/T^2$.
- **Scaling:** $a \propto v^2$ at fixed $r$; $a \propto 1/r$ at fixed $v$; $a \propto r$ at fixed $\omega$.
- **Centripetal force** $F = mv^2/r = m\omega^2 r$ is **the name of a direction**, not a new force. It is the net real force towards the centre: tension (stone on a string; the stone of ${stn.m} kg at ${stn.f} rev s$^{-1}$ on ${stn.R} m needs $T = ${f(stn.T, 4)}$ N), static friction (coin on a turntable, car on a level bend), gravity (satellite), a normal reaction component (banked road). Never draw it as an extra force on a free-body diagram. It is perpendicular to the velocity, so it does no work.
- Example: a cyclist at ${f(cyc.v, 2)} m s⁻¹ on a ${cyc.R} m roundabout has $a = ${f(cyc.a, 3)}$ m s$^{-2}$; for ${cyc.m} kg the force is ${f(cyc.F, 3)} N, supplied by friction.`,
      [kt('Uniform circular motion', 'Motion on a circle at constant speed; the acceleration is purely centripetal.'), kt('Centripetal acceleration', 'The acceleration directed to the centre, a = v²/r = ω²r.'), kt('Centripetal force', 'The name for the net real force directed to the centre, mv²/r; not a new force.')],
      [fm(r`a = \dfrac{v^2}{r} = \omega^2 r = v\omega = \dfrac{4\pi^2 r}{T^2}`, 'Centripetal acceleration'), fm(r`F = \dfrac{mv^2}{r} = m\omega^2 r`, 'Centripetal force (net inward force)'), fm(r`|\Delta v| = 2v\sin\dfrac{\Delta\theta}{2} \approx v\,\Delta\theta`, 'Change of velocity')],
      V.vtri,
      [2],
      [plotAc, V.who, TABLES.T_COMP, TABLES.T_ROUND, TABLES.T_STONE, TABLES.T_WHO],
    ),
    sec(
      '3. Vehicle on a level circular road; banking of roads and railway tracks',
      r`- **Level road:** friction supplies the centripetal force; $N = mg$ and $mv^2/r \le \mu mg$, so $v_{\max} = \sqrt{\mu r g}$. The mass cancels. On a bend of radius ${lv.R} m: ${f(lv.vd, 4)} m s⁻¹ when dry ($\mu = ${lv.dry}$), ${f(lv.vw, 4)} m s⁻¹ when wet ($\mu = ${lv.wet}$).
- **Banked road** (outer edge higher; angle $\theta$): $N$ is perpendicular to the road. $N\cos\theta = mg$ and $N\sin\theta = mv^2/r$, so **$\tan\theta = v^2/(rg)$**, independent of the mass; the design speed is $v = \sqrt{rg\tan\theta}$. For ${bk.v} m s⁻¹ on ${bk.r} m: $\theta = ${f(bk.th, 4)}^\circ$, and $N = mg/\cos\theta$ (${f(bk.N, 4)} N for ${bk.m} kg). At the design speed no friction is needed.
- **Railway track:** the outer rail is raised by $h$ over a gauge $l$: $\sin\theta = h/l$, and for small $\theta$, $h \approx l v^2/(rg)$. For ${rail.v} m s⁻¹ on ${rail.r} m with $l = ${rail.l}$ m: $h = ${f(rail.h, 4)}$ m. At other speeds the flange of the wheel presses on the outer rail (too fast) or the inner rail (too slow).
- On the banked road above the design speed a car tends to slide outwards, below it inwards; the extra force comes from friction.`,
      [kt('Banking', 'Raising the outer edge of a curved road or the outer rail of a track so that the normal reaction has a horizontal component towards the centre.'), kt('Design speed', 'The speed for which a banked curve needs no friction, v = √(rg tan θ).'), kt('Gauge', 'The distance between the two rails of a track.')],
      [fm(r`v_{\max} = \sqrt{\mu r g}`, 'Level road'), fm(r`\tan\theta = \dfrac{v^2}{rg}`, 'Banking angle'), fm(r`h = l\sin\theta \approx \dfrac{l v^2}{rg}`, 'Raised outer rail')],
      V.level,
      [3],
      [TABLES.T_LSTEPS, TABLES.T_VMAX, V.bank, TABLES.T_BSTEPS, TABLES.T_BEX, V.rail, TABLES.T_RAILEX, plotBank],
    ),
    sec(
      '4. Motion in a vertical circle',
      r`- A ball on a string in a vertical circle has a **changing speed**: least at the top, greatest at the bottom. At every point, (force towards the centre) $= mv^2/r$.
- **Top:** $T + mg = mv^2/r$. A string cannot push, so $T \ge 0$; the **least speed** has $T = 0$: $v_{\text{top}} = \sqrt{gr}$. Slower, and the string goes slack.
- **Bottom:** $T - mg = mv^2/r$. Energy conservation from top to bottom (fall of $2r$): $v_{\text{bot}}^2 = v_{\text{top}}^2 + 4gr$, so the least speed at the bottom is $\sqrt{5gr}$.
- **Tensions:** $T_{\text{bot}} - T_{\text{top}} = 6mg$ for any speed; for the least speed, $T_{\text{top}} = 0$ and $T_{\text{bot}} = 6mg$. For ${Vv.m} kg on ${Vv.r} m: $\sqrt{gr} = ${f(Vv.vTop, 3)}$ m s⁻¹, $\sqrt{5gr} = ${f(Vv.vBot, 3)}$ m s⁻¹, $T_{\text{bot}} = ${f(Vv.Tbot, 3)}$ N.
- A bucket of ${bkt.m} kg on ${bkt.R} m of rope at ${f(bkt.v, 2)} m s⁻¹ at the top has $T = ${f(bkt.Ttop, 4)}$ N (taut). The tension is greatest at the bottom, where a string is most likely to break.`,
      [kt('Least speed at the top', 'v = √(gr), for which the tension is zero and the weight alone supplies the centripetal force.'), kt('Least speed at the bottom', 'v = √(5gr), needed to reach the top with the least speed there.')],
      [fm(r`v_{\text{top,min}} = \sqrt{gr}`, 'Top'), fm(r`v_{\text{bot,min}} = \sqrt{5gr}`, 'Bottom'), fm(r`T_{\text{bot}} - T_{\text{top}} = 6mg`, 'Tension difference')],
      V.vert,
      [4],
      [TABLES.T_TENS, TABLES.T_VCRIT, TABLES.T_BUCKET, plotT],
    ),
  ],
  exam_tips_md: `- Convert rpm and km h⁻¹ to SI before using v = rω or v²/r.
- Uniform circular motion has acceleration v²/r towards the centre; derive it from the velocity triangle (|Δv| ≈ vΔθ).
- Centripetal force is not a new force: name the real force (tension, friction, gravity, normal reaction) and never draw it as an extra arrow.
- Level road: friction supplies mv²/r, so v_max = √(μrg), independent of mass.
- Banked road: N cos θ = mg and N sin θ = mv²/r give tan θ = v²/(rg); the outer rail is raised by h = l sin θ.
- Vertical circle: top √(gr) (T = 0), bottom √(5gr), T_bottom − T_top = 6mg; write the radial equation at each point.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Define one radian.', 'The angle at the centre of a circle for which the arc length equals the radius; $\\theta = s/r$.', 'concept', 1),
    fc(2, 'How many degrees are there in one radian?', `$1\\ \\text{rad} = 360^\\circ/2\\pi = ${f(deg(1), 4)}^\\circ$.`, 'fact', 1),
    fc(3, 'Define angular velocity and give its SI unit.', '$\\omega = d\\theta/dt$; unit rad s$^{-1}$. For steady turning $\\omega = 2\\pi/T = 2\\pi f$.', 'concept', 1),
    fc(4, 'State the direction of the angular velocity vector.', 'Along the axis, given by the right-hand rule: curl the fingers the way the body turns, and the thumb points along $\\omega$.', 'concept', 1),
    fc(5, 'Relate linear speed to angular speed.', '$v = r\\omega$, along the tangent.', 'formula', 1),
    fc(6, 'Which quantities are the same for all points of a rotating rigid body?', '$\\theta$, $\\omega$ and $\\alpha$ are the same; $v = r\\omega$ and $a_t = r\\alpha$ grow with $r$.', 'concept', 1),
    fc(7, 'Define angular acceleration.', '$\\alpha = d\\omega/dt$, in rad s$^{-2}$.', 'concept', 1),
    fc(8, 'Relate tangential acceleration to angular acceleration.', '$a_t = r\\alpha$, along the tangent.', 'formula', 1),
    fc(9, 'Write the equations for rotation with constant $\\alpha$.', '$\\omega = \\omega_0 + \\alpha t$ and $\\theta = \\omega_0 t + \\tfrac12\\alpha t^2$.', 'formula', 1),
    fc(10, 'Convert 75 rpm to rad s$^{-1}$.', `$75 \\times 2\\pi/60 = ${f(pot.w, 4)}$ rad s$^{-1}$.`, 'example', 1),
    fc(11, 'Why does a body in uniform circular motion have an acceleration?', 'Its velocity changes direction continuously, although the speed is constant.', 'concept', 2),
    fc(12, 'Write the centripetal acceleration in three forms.', '$a = v^2/r = \\omega^2 r = v\\omega$; also $4\\pi^2 r/T^2$.', 'formula', 2),
    fc(13, 'What is the direction of the centripetal acceleration, and why?', 'Along the radius towards the centre: as $\\Delta\\theta \\to 0$ the change in velocity becomes perpendicular to the velocity.', 'concept', 2),
    fc(14, 'In the velocity triangle, what is $|\\Delta v|$?', '$|\\Delta v| = 2v\\sin(\\Delta\\theta/2) \\approx v\\Delta\\theta$ for a small angle.', 'formula', 2),
    fc(15, 'How does the centripetal acceleration change if $v$ is doubled at the same radius?', 'It becomes four times larger, since $a \\propto v^2$.', 'concept', 2),
    fc(16, 'What is the centripetal force?', 'The net real force directed towards the centre, $F = mv^2/r$. It is the name of a direction, not a new force.', 'concept', 2),
    fc(17, 'Which force supplies the centripetal force for a stone whirled on a string, a coin on a turntable and a satellite?', 'Tension, static friction and gravity, respectively.', 'fact', 2),
    fc(18, 'Does the centripetal force do work in uniform circular motion?', 'No: it is perpendicular to the velocity, so the speed does not change.', 'concept', 2),
    fc(19, 'Which force supplies the centripetal force for a car on a level curve?', 'Static friction between the tyres and the road.', 'fact', 3),
    fc(20, 'Write the greatest speed of a car on a level circular road.', '$v_{\\max} = \\sqrt{\\mu r g}$, independent of the mass of the car.', 'formula', 3),
    fc(21, 'Why is a road banked?', 'So that the horizontal component of the normal reaction supplies the centripetal force, and little or no friction is needed.', 'concept', 3),
    fc(22, 'Write the angle of banking for speed $v$ and radius $r$.', '$\\tan\\theta = v^2/(rg)$.', 'formula', 3),
    fc(23, 'Does the angle of banking depend on the mass of the vehicle?', 'No: the mass cancels when $N\\sin\\theta = mv^2/r$ is divided by $N\\cos\\theta = mg$.', 'concept', 3),
    fc(24, 'Why is the outer rail raised on a curved railway track?', 'To bank the track so that the normal reaction supplies the centripetal force and the wheel flanges do not press sideways.', 'concept', 3),
    fc(25, 'Write the height by which the outer rail is raised.', '$h = l\\sin\\theta \\approx l v^2/(rg)$, where $l$ is the gauge.', 'formula', 3),
    fc(26, 'What is the least speed at the top of a vertical circle on a string?', '$v = \\sqrt{gr}$, for which the tension is zero.', 'formula', 4),
    fc(27, 'What is the least speed at the bottom of a vertical circle on a string?', '$v = \\sqrt{5gr}$, from $v_{\\text{bot}}^2 = v_{\\text{top}}^2 + 4gr$.', 'formula', 4),
    fc(28, 'Write the radial equations at the top and the bottom.', '$T_{\\text{top}} + mg = mv^2/r$ and $T_{\\text{bot}} - mg = mv^2/r$.', 'formula', 4),
    fc(29, 'How much larger is the tension at the bottom than at the top?', '$6mg$, for any speed; at the least speed the top tension is 0 and the bottom tension is $6mg$.', 'concept', 4),
    fc(30, `Least speed at the bottom for $r = ${Vv.r}$ m ($g = 9.8$)?`, `$\\sqrt{5 \\times 9.8 \\times ${Vv.r}} = ${f(Vv.vBot, 3)}$ m s$^{-1}$.`, 'example', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
void plotAc;
