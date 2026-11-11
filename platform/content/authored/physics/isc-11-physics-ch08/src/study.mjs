// ISC 11 ch08 notes (one section per syllabus topic) and 30 flashcards.
import { T, unit, PROV, r, dec } from '../../isc-11-physics-ch01/src/lib.mjs';
import { V, EX, TABLES, plotStop, plotEx, plotEt, plotPv, sciT } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const { tow, vf, stop, can, ref, sp, pth, fl, pd, co, os, em, lift, pump, car, kwh } = EX;
const f = (x, n = 3) => dec(x, n);

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Work, Energy and Power — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Work done by a constant force and by a variable force',
      r`- **Work** is done when a force moves its point of application; only the component of the force **along the displacement** counts. It is a **scalar**; the SI unit is the **joule** ($1$ J $= 1$ N m); in CGS the **erg**, with $1$ J $= 10^7$ erg. Dimensions $[\text{M}\,\text{L}^2\,\text{T}^{-2}]$.
- **Constant force:** $W = \vec F\cdot\vec S = FS\cos\theta$, with $\theta$ the angle between the force and the **displacement** (not the path length). A ${tow.F} N pull at ${tow.th}° through ${tow.S} m does ${f(tow.W, 4)} J; the perpendicular component ${f(tow.Fy, 3)} N does none.
- **Sign:** positive for $\theta < 90^\circ$, zero for $\theta = 90^\circ$ (a trunk carried along a level platform, the centripetal force on a body moving in a circle), negative for $\theta > 90^\circ$ (friction, brakes, gravity on a rising ball).
- **Variable force:** divide the path into strips $\Delta S$, $\Delta W = F\Delta S$, so $W = \int F\,dS$ = the **area under the F–S graph**; area below the axis is negative. The handcart graph splits into a triangle (${vf.areas[0]} J), a rectangle (${vf.areas[1]} J) and a trapezium (${vf.areas[2]} J): ${vf.W} J.`,
      [kt('Work', 'The scalar product of the force and the displacement, W = F·S = FS cos θ; unit joule.'), kt('Joule', 'The work done by a force of 1 N when the body moves 1 m along the force; 1 J = 10⁷ erg.'), kt('Scalar (dot) product', 'F·S = FS cos θ: a number, with no direction.'), kt('Variable force', 'A force whose size changes along the path; its work is the area under the F–S graph.')],
      [fm(r`W = \vec F\cdot\vec S = FS\cos\theta`, 'Work by a constant force'), fm(r`W = \int_{S_1}^{S_2} F\,dS`, 'Work by a variable force (area under the F–S graph)')],
      V.tow,
      [1],
      [TABLES.T_SIGN, V.fx],
    ),
    sec(
      '2. Kinetic energy and the work–energy theorem',
      r`- **Kinetic energy** $K = \tfrac12 mv^2$: a scalar, never negative, proportional to the **square** of the speed (double the speed, four times the energy). In terms of momentum, $K = p^2/2m$.
- **Work–energy theorem (constant force):** with $F = ma$ and $v^2 - u^2 = 2aS$: $W = FS = maS = \tfrac12 m(v^2 - u^2) = K_f - K_i$. **Net work equals the change in kinetic energy.** (It also holds for a variable force.)
- **Stopping distance:** brakes do $-Fs$ and the final $K$ is zero, so $s = \dfrac{mv^2}{2F}$, proportional to $v^2$. A ${stop.m} kg car braked by ${stop.F} N stops from ${stop.v1} m s⁻¹ in ${f(stop.s1, 3)} m and from ${stop.v2} m s⁻¹ in ${f(stop.s2, 3)} m (2.25 times as far for 1.5 times the speed).`,
      [kt('Kinetic energy', 'The energy of a body due to its motion, ½mv².'), kt('Work–energy theorem', 'The net work done on a body equals the change in its kinetic energy.'), kt('Stopping distance', 'Distance covered while the brakes bring a vehicle to rest: s = mv²/2F.')],
      [fm(r`K = \tfrac12 mv^2 = \dfrac{p^2}{2m}`, 'Kinetic energy'), fm(r`W_{\text{net}} = \tfrac12 mv^2 - \tfrac12 mu^2`, 'Work–energy theorem'), fm(r`s = \dfrac{mv^2}{2F}`, 'Stopping distance')],
      plotStop,
      [2],
      [TABLES.T_KE],
    ),
    sec(
      '3. Potential energy, the spring and conservative forces',
      r`- **Potential energy** $U$ is energy stored by position or configuration in a field of a **conservative** force; $W_{\text{cons}} = -\Delta U$. Near the Earth, $U = mgh$ relative to a chosen zero; only **differences** matter (a ${ref.m} kg ball: ${f(ref.Ushelf, 4)} J on the shelf and ${f(ref.Utable, 4)} J on the table above the floor, but always ${f(ref.diff, 4)} J apart). A ${can.m} kg can raised ${can.h} m gains ${f(can.U, 4)} J.
- **Spring:** $F = -kx$ (Hooke's law); the applied force grows from $0$ to $kx$, so the work is the area of the triangle, $W = \tfrac12 x \cdot kx = \tfrac12 kx^2$; by integration $\int_0^x kx'\,dx' = \tfrac12 kx^2$. This is stored as $U = \tfrac12 kx^2$ (stretch or compression). For $k = ${sp.k}$ N m⁻¹: ${f(sp.U1, 3)} J at ${sp.x1} m, ${f(sp.Um, 3)} J at ${sp.xm} m, ${f(sp.U2, 3)} J at ${sp.x2} m; the stretch from ${sp.x1} m to ${sp.x2} m needs ${f(sp.W, 3)} J.
- **Conservative force:** the work between two points is **independent of the path**; the work round a closed path is **zero**; a potential energy exists. Examples: gravity, the spring force, the electrostatic force.
- **Non-conservative force:** the work depends on the path; round a closed path it is not zero; no potential energy; examples: friction, air drag, viscous drag. Gravity does −${f(-pth.Wg, 3)} J on a ${pth.m} kg load raised ${pth.h} m by either route; a ${pth.f} N friction does −${f(-pth.Wf1, 3)} J or −${f(-pth.Wf2, 3)} J on two routes.`,
      [kt('Potential energy', 'Energy stored by position or configuration, defined for conservative forces; W = −ΔU.'), kt('Hooke\'s law', 'The restoring force of a spring is proportional to its extension, F = −kx.'), kt('Force constant', 'k, the force per unit extension, in N m⁻¹.'), kt('Conservative force', 'A force whose work between two points does not depend on the path (zero round a closed path).'), kt('Non-conservative force', 'A force, such as friction, whose work depends on the path.')],
      [fm(r`U = mgh`, 'Gravitational potential energy'), fm(r`F = -kx`, 'Spring force'), fm(r`U = \tfrac12 kx^2`, 'Elastic potential energy of a spring')],
      V.spa,
      [3],
      [V.spring, TABLES.T_PE, TABLES.T_SPR, TABLES.T_CONS, TABLES.T_PATH],
    ),
    sec(
      '4. Conservation of mechanical energy, the oscillating spring and E = mc²',
      r`- **Conservation:** if only conservative forces do work, $\Delta K + \Delta U = 0$ and $E = K + U$ is constant. Friction turns mechanical energy into heat, but the **total** energy is conserved.
- **Free fall:** $mgH = mgh + \tfrac12 mv^2$, so $v = \sqrt{2g(H-h)}$, independent of mass. The ${fl.m} kg stone from ${fl.H} m has $E = ${f(fl.E, 4)}$ J; at ${fl.h1} m it moves at ${f(fl.v1, 3)} m s⁻¹ and it lands at ${f(fl.vg, 3)} m s⁻¹.
- **Pendulum:** tension does no work; $v = \sqrt{2gL(1-\cos\theta_0)}$ at the lowest point: ${f(pd.v, 3)} m s⁻¹ for $L = ${pd.L}$ m, ${pd.th0}°.
- **Roller coaster:** $v = \sqrt{2g\,(\text{drop})}$; the car cannot rise above its starting level (speeds ${co.speeds.slice(1).map((s) => f(s, 3)).join(', ')} m s⁻¹ at B, C, D).
- **Oscillating spring:** released from rest at $x = A$, the block moves to $x$ while the spring does work $\int_A^x (-kx')\,dx' = \tfrac12 k(A^2 - x^2)$; by the work–energy theorem this is the kinetic energy $\tfrac12 mv^2$, so $U + K = \tfrac12 kx^2 + \tfrac12 mv^2 = \tfrac12 kA^2$, the same at every $x$. For ${os.m} kg, $k = ${os.k}$ N m⁻¹, $A = ${os.A}$ m: $E = ${f(os.E, 3)}$ J, $v_{\max} = ${f(os.vmax, 3)}$ m s⁻¹.
- **Energy graphs:** against $x$, $U$ is an upward parabola, $K$ an inverted parabola, $E$ a horizontal line, crossing at $E/2$ where $x = \pm A/\sqrt2$. Against time (a preview of the Oscillations chapter, which gives $x = A\cos\omega t$), $U = E\cos^2\omega t$ and $K = E\sin^2\omega t$, out of step, at twice the frequency of the block.
- **Mass–energy (statement only):** $E = mc^2$ with $c = 3.0 \times 10^8$ m s⁻¹, so a mass of ${f(em.dm * 1e6, 2)} mg is equivalent to ${sciT(em.E, 3)} J (about ${f(em.years, 2)} years of a 100 W bulb). The derivation is not required.`,
      [kt('Mechanical energy', 'The sum of kinetic and potential energy, E = K + U.'), kt('Conservation of mechanical energy', 'If only conservative forces do work, K + U is constant.'), kt('Mass–energy equivalence', 'A mass m is equivalent to an energy mc²; c is the speed of light.'), kt('Amplitude', 'The greatest displacement A from the equilibrium position.')],
      [fm(r`K + U = \text{constant}`, 'Conservation of mechanical energy'), fm(r`\tfrac12 kx^2 + \tfrac12 mv^2 = \tfrac12 kA^2`, 'Oscillating spring'), fm(r`v = \sqrt{2gh}`, 'Speed after a free fall through h'), fm(r`E = mc^2`, 'Mass–energy equivalence')],
      V.osc,
      [4],
      [V.fall, V.pend, V.coaster, plotEx, plotEt, TABLES.T_TRANSF, TABLES.T_EMC],
    ),
    sec(
      '5. Power',
      r`- **Power** is the rate of doing work: average $P = W/t$; instantaneous $P = dW/dt$. Unit the **watt** ($1$ W $= 1$ J s⁻¹); $1$ kW $= 10^3$ W, $1$ hp $= 746$ W. Dimensions $[\text{M}\,\text{L}^2\,\text{T}^{-3}]$.
- **P = F·v:** $dW = F\,dS$, so $P = F\,dS/dt = \vec F\cdot\vec v = Fv\cos\theta$. For a given power a higher speed needs a smaller force. At constant speed the driving force equals the resistive force.
- **Examples:** a lift of ${lift.M} kg rising at ${lift.v} m s⁻¹ needs ${f(lift.P, 4)} W; a pump raising ${pump.m} kg of water ${pump.h} m in ${pump.t} s delivers ${f(pump.P, 3)} W; a car at ${car.v} m s⁻¹ against ${car.F} N needs ${f(car.P / 1000, 3)} kW.
- **Kilowatt hour:** a unit of **energy**, $1$ kW h $= 3.6\times10^6$ J; a ${kwh.P} W bulb for ${kwh.hours} h uses ${f(kwh.E, 2)} kW h.`,
      [kt('Power', 'The rate of doing work, P = W/t; unit watt.'), kt('Watt', 'One joule per second.'), kt('Instantaneous power', 'P = dW/dt = F·v at an instant.'), kt('Kilowatt hour', 'A unit of energy, 3.6 × 10⁶ J.')],
      [fm(r`P = \dfrac{W}{t}`, 'Average power'), fm(r`P = \vec F\cdot\vec v = Fv\cos\theta`, 'Power and velocity')],
      plotPv,
      [5],
      [TABLES.T_POWER, TABLES.T_LIFT],
    ),
  ],
  exam_tips_md: `- Work is F S cos θ with θ between the force and the displacement; say whether the work is positive, zero or negative. Friction and brakes do negative work.
- Work–energy theorem: net work = change in kinetic energy. Stopping distance s = mv²/2F, proportional to v².
- U = ½kx²: show the triangle area or the integral of kx; the spring force is F = −kx.
- Conservative: work independent of the path, zero on a closed path (gravity, spring). Non-conservative: friction, drag.
- Mechanical energy is conserved only when no friction or drag acts; tension and the normal reaction do no work. Choose the zero of U and state it.
- Oscillating spring: ½kx² + ½mv² = ½kA². E = mc² is a statement; use kilograms and joules.
- P = W/t is average power, P = F·v instantaneous. 1 kW h = 3.6 × 10⁶ J, a unit of energy.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Define work done by a constant force.', 'The scalar product of the force and the displacement: $W = \\vec F\\cdot\\vec S = FS\\cos\\theta$; unit joule.', 'concept', 1),
    fc(2, 'Define the joule and relate it to the erg.', 'The work done when a force of 1 N moves a body 1 m along the force; $1\\ \\text{J} = 10^{7}$ erg.', 'concept', 1),
    fc(3, 'When is the work done by a force zero even though the force is not zero?', 'When the force is perpendicular to the displacement ($\\theta = 90^\\circ$), or when there is no displacement.', 'concept', 1),
    fc(4, 'When is work negative? Give an example.', 'When $90^\\circ < \\theta \\le 180^\\circ$: the force opposes the motion, as friction does on a sliding block.', 'concept', 1),
    fc(5, 'How is the work done by a variable force found from a graph?', 'It is the area under the force–displacement graph, $W = \\int F\\,dS$; area below the axis is negative.', 'concept', 1),
    fc(6, `Work of a ${tow.F} N force at ${tow.th}° to a ${tow.S} m displacement?`, `$W = ${tow.F} \\times ${tow.S} \\times \\cos ${tow.th}^\\circ = ${f(tow.W, 4)}$ J.`, 'example', 1),
    fc(7, 'Write the kinetic energy of a body in terms of mass and speed, and of momentum.', '$K = \\tfrac12 mv^2 = \\dfrac{p^2}{2m}$.', 'formula', 2),
    fc(8, 'State the work–energy theorem.', 'The net work done on a body equals the change in its kinetic energy: $W_{\\text{net}} = K_f - K_i$.', 'concept', 2),
    fc(9, 'Outline the derivation of the work–energy theorem for a constant force.', 'From $F = ma$ and $v^2 - u^2 = 2aS$: $W = FS = maS = \\tfrac12 m(v^2 - u^2)$.', 'concept', 2),
    fc(10, 'Write the stopping distance of a vehicle braked by a constant force $F$.', '$s = \\dfrac{mv^2}{2F}$, proportional to the square of the speed.', 'formula', 2),
    fc(11, 'If the speed of a car is doubled, how does its stopping distance change (same brakes)?', 'It becomes four times as large.', 'concept', 2),
    fc(12, `Stopping distance of ${stop.m} kg at ${stop.v1} m/s with a ${stop.F} N braking force?`, `$s = \\dfrac{\\tfrac12 \\times ${stop.m} \\times ${stop.v1}^2}{${stop.F}} = ${f(stop.s1, 3)}$ m.`, 'example', 2),
    fc(13, 'Define potential energy.', 'Energy stored in a body because of its position or configuration in a field of a conservative force; $W_{\\text{cons}} = -\\Delta U$.', 'concept', 3),
    fc(14, 'Write the gravitational potential energy near the Earth.', '$U = mgh$, measured from a chosen zero level; only differences of $U$ matter.', 'formula', 3),
    fc(15, 'State Hooke\'s law for a spring.', '$F = -kx$: the restoring force is proportional to the extension and opposes it; $k$ is in N m$^{-1}$.', 'formula', 3),
    fc(16, 'Derive the energy stored in a stretched spring by area.', 'The force grows from 0 to $kx$, so the work is the area of the triangle, $\\tfrac12 \\cdot x \\cdot kx = \\tfrac12 kx^2$.', 'concept', 3),
    fc(17, 'Derive the energy stored in a stretched spring by integration.', `$W = \\int_0^x kx'\\,dx' = \\left[\\tfrac12 kx'^2\\right]_0^x = \\tfrac12 kx^2$.`, 'concept', 3),
    fc(18, 'Is the energy stored in a compressed spring different from that of an equal stretch?', 'No: $U = \\tfrac12 kx^2$ depends on $x^2$, so it is the same.', 'concept', 3),
    fc(19, 'Define a conservative force and give two examples.', 'A force whose work between two points does not depend on the path (zero round a closed path): gravity and the spring force.', 'concept', 3),
    fc(20, 'Why is friction non-conservative?', 'Its work depends on the path (negative along every part), is not zero round a closed path, and no potential energy exists.', 'concept', 3),
    fc(21, 'State the law of conservation of mechanical energy.', 'If only conservative forces do work, the sum of kinetic and potential energy of the body stays constant.', 'concept', 4),
    fc(22, 'Write the speed of a body after falling through a height $h$ from rest (no air).', '$v = \\sqrt{2gh}$, independent of the mass.', 'formula', 4),
    fc(23, 'Why does the tension in a pendulum do no work?', 'It is always perpendicular to the motion of the bob.', 'concept', 4),
    fc(24, 'Write the speed of a pendulum bob at the lowest point, released at angle $\\theta_0$.', '$v = \\sqrt{2gL(1-\\cos\\theta_0)}$.', 'formula', 4),
    fc(25, 'Show that $U + K$ is constant for a mass on a spring.', 'Released from rest at $x = A$, the spring does work $\\tfrac12 k(A^2 - x^2)$ as the block moves to $x$; this equals $\\tfrac12 mv^2$, so $\\tfrac12 kx^2 + \\tfrac12 mv^2 = \\tfrac12 kA^2$.', 'concept', 4),
    fc(26, 'Describe the graphs of $U$, $K$ and $E$ against $x$ for an oscillating spring.', '$U$: upward parabola; $K$: inverted parabola; $E$: horizontal line; $U = K = E/2$ at $x = \\pm A/\\sqrt2$.', 'concept', 4),
    fc(27, 'State the mass–energy relation and the meaning of its symbols.', '$E = mc^2$: a mass $m$ is equivalent to energy $E$; $c = 3.0 \\times 10^8$ m s$^{-1}$ is the speed of light.', 'formula', 4),
    fc(28, 'Define power and its SI unit.', 'The rate of doing work, $P = W/t$; the watt, $1\\ \\text{W} = 1\\ \\text{J s}^{-1}$.', 'concept', 5),
    fc(29, 'Derive $P = Fv$.', '$P = dW/dt = F\\,dS/dt = Fv$ for a force along the velocity; in general $\\vec F\\cdot\\vec v$.', 'concept', 5),
    fc(30, 'How many joules in one kilowatt hour?', '$1\\ \\text{kW h} = 10^3\\ \\text{W} \\times 3600\\ \\text{s} = 3.6 \\times 10^6$ J; it is a unit of energy.', 'fact', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
