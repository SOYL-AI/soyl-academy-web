// ch06 Work, Energy and Simple Machines — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

const wetTable = table(['Net work on a body', 'Change in KE', 'Motion'], [['positive', 'increases', 'speeds up'], ['negative', 'decreases', 'slows down'], ['zero', 'none', 'steady speed']], 'Table linking net work to the change in kinetic energy and the motion');
const powerTable = table(['Unit', 'Value'], [['1 watt (W)', '1 joule per second'], ['1 kilowatt (kW)', '1000 W'], ['1 kilowatt hour (kWh)', '3.6 × 10⁶ J'], ['Energy in kWh', 'power in kW × time in hours']], 'Table of the watt, kilowatt and kilowatt hour with their values');

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Work, Energy and Simple Machines — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Work done by a force',
      r`**Work** is done when a force moves a body. For a force $F$ along the displacement $s$, $W = Fs$; in general $W = Fs\cos\theta$, where $\theta$ is the angle between the force and the displacement. The unit is the **joule** (J), $1\ \text{J} = 1\ \text{N m}$. Work is a scalar.

- $\theta = 0^\circ$: **positive** work (the force helps the motion).
- $\theta = 90^\circ$: **zero** work (for example the lift on a trunk carried along a level road).
- $\theta = 180^\circ$: **negative** work (friction or brakes).
- No displacement means no work. On a force–displacement graph the **area under the line** is the work done.`,
      [kt('Work', 'Force times displacement in the direction of the force; unit joule.'), kt('Joule', 'The work done when a force of 1 N moves a body 1 m along the force.'), kt('Negative work', 'Work done by a force that acts opposite to the displacement.')],
      [fm(r`W = Fs\cos\theta`, 'Work done by a constant force')],
      V.signs,
      [1],
      [V.area],
    ),
    sec(
      '2. Kinetic energy',
      r`**Energy** is the capacity to do work, measured in joules. **Kinetic energy** is the energy of a moving body. From $v^2 = u^2 + 2as$ with $u = 0$ and $F = ma$, the work done in giving a body speed $v$ is $W = Fs = ma \cdot v^2/2a = \tfrac{1}{2}mv^2$, so
$$\text{KE} = \tfrac{1}{2}mv^2$$
Doubling the speed makes the KE four times as large; doubling the mass doubles it.`,
      [kt('Energy', 'The capacity to do work; unit joule.'), kt('Kinetic energy', 'The energy a body has because of its motion, ½mv².')],
      [fm(r`\text{KE} = \tfrac{1}{2}mv^2`, 'Kinetic energy')],
      V.keV,
      [2],
    ),
    sec(
      '3. Potential energy and the work–energy theorem',
      r`**Gravitational potential energy** is the energy a body has because of its height. Lifting a body of mass $m$ at steady speed needs a force $mg$, so the work done in raising it by $h$ is $W = mgh$, stored as
$$\text{PE} = mgh$$
(with $g = 9.8\ \text{m s}^{-2}$, measured from a chosen reference level).

**Work–energy theorem:** the net work done on a body equals the change in its kinetic energy, $W_\text{net} = \tfrac{1}{2}mv^2 - \tfrac{1}{2}mu^2$. Brakes do negative work and reduce the KE to zero.`,
      [kt('Potential energy', 'Stored energy due to position or condition; mgh near the Earth.'), kt('Work–energy theorem', 'Net work done on a body equals its change in kinetic energy.')],
      [fm(r`\text{PE} = mgh`, 'Gravitational potential energy'), fm(r`W_\text{net} = \Delta \text{KE}`, 'Work–energy theorem')],
      wetTable,
      [2],
    ),
    sec(
      '4. Conservation of energy',
      r`Energy can neither be created nor destroyed; it changes from one form to another. **Mechanical energy** = KE + PE. For a freely falling body, a frictionless slide, a roller-coaster or an ideal pendulum, the mechanical energy **stays constant**: as PE falls, KE rises by the same amount. From rest at height $H$, the speed at height $h$ is $v = \sqrt{2g(H - h)}$, which does not depend on the mass.

Examples of transformations: a fan (electrical to kinetic), a solar cell (light to electrical), a dam (potential to kinetic to electrical), burning gas (chemical to heat and light). In real systems some energy becomes heat.`,
      [kt('Law of conservation of energy', 'Energy is neither created nor destroyed; the total stays constant.'), kt('Mechanical energy', 'The sum of kinetic and potential energy.')],
      [fm(r`\text{KE} + \text{PE} = \text{constant}`, 'Conservation of mechanical energy'), fm(r`v = \sqrt{2gh}`, 'Speed after a fall of height h from rest')],
      V.fall,
      [3],
      [V.roller],
    ),
    sec(
      '5. Power and commercial unit of energy',
      r`**Power** is the rate of doing work: $P = W/t$. The SI unit is the **watt** (W), $1\ \text{W} = 1\ \text{J s}^{-1}$; $1\ \text{kW} = 1000\ \text{W}$. The commercial unit of electrical energy is the **kilowatt hour** (kWh), also called a unit: $1\ \text{kWh} = 3.6 \times 10^6$ J.

Energy in kWh = power in kW × time in hours. A 1.5 kW geyser used for 20 minutes uses $1.5 \times \tfrac{20}{60} = 0.50$ kWh.`,
      [kt('Power', 'Work done per unit time; unit watt.'), kt('Watt', 'One joule per second.'), kt('Kilowatt hour', 'Energy used by a 1 kW device in 1 hour, 3.6 × 10⁶ J.')],
      [fm(r`P = \dfrac{W}{t}`, 'Power')],
      powerTable,
      [3],
    ),
    sec(
      '6. Simple machines: levers, pulleys and efficiency',
      r`A **simple machine** changes the size or direction of a force. $\text{MA} = \text{load}/\text{effort}$ (no unit). A machine never gives more work than it receives.

- **Lever:** $\text{MA} = \text{effort arm}/\text{load arm}$. **Class I**: fulcrum in the middle (seesaw). **Class II**: load in the middle (wheelbarrow), MA > 1. **Class III**: effort in the middle (tongs), MA < 1.
- **Pulleys:** single fixed MA = 1 (changes direction only); single movable MA = 2; for an ideal block and tackle MA = number of strands supporting the load.
- **Efficiency** $\eta = \dfrac{\text{work output}}{\text{work input}} \times 100\,\%$, and $\eta = \text{MA}/\text{VR} \times 100\,\%$, where VR is the distance moved by the effort divided by that moved by the load. Real machines have $\eta < 100\,\%$.`,
      [kt('Mechanical advantage', 'Load divided by effort.'), kt('Fulcrum', 'The fixed point about which a lever turns.'), kt('Efficiency', 'Useful work output divided by work input, as a percentage.')],
      [fm(r`\text{MA} = \dfrac{\text{load}}{\text{effort}} = \dfrac{\text{effort arm}}{\text{load arm}}`, 'Mechanical advantage of a lever'), fm(r`\eta = \dfrac{\text{output}}{\text{input}} \times 100\,\%`, 'Efficiency')],
      V.levers,
      [4],
      [V.pulleys],
    ),
  ],
  exam_tips_md: `- Write the formula first, then substitute with units (J, W, N, m, kg, m s⁻¹); state g = 9.8 m s⁻².
- Say whether work is positive, zero or negative and why (the angle).
- Square the speed in KE; use the work–energy theorem for stopping problems.
- Free fall and frictionless slopes: mgh = ½mv², and the mass cancels.
- kWh = kW × hours; 1 kWh = 3.6 × 10⁶ J.
- MA = load ÷ effort = effort arm ÷ load arm; count only supporting strands in a pulley; efficiency stays below 100 %.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'When is work done in the science sense?', 'When a force moves a body so that there is a displacement along the force.', 'definition', 1),
    fc(2, 'Formula and unit of work?', r`$W = Fs\cos\theta$; the joule (J), $1\ \text{J} = 1\ \text{N m}$.`, 'formula', 1),
    fc(3, 'When is work positive?', r`When the force is along the displacement, $\theta = 0^\circ$.`, 'concept', 1),
    fc(4, 'When is work zero?', r`When there is no displacement, or the force is at right angles to it, $\theta = 90^\circ$.`, 'concept', 1),
    fc(5, 'When is work negative?', r`When the force opposes the displacement, $\theta = 180^\circ$, as friction does.`, 'concept', 1),
    fc(6, 'What does the area under a force–displacement graph give?', 'The work done by the force.', 'concept', 1),
    fc(7, 'Define energy.', 'The capacity to do work; measured in joules.', 'definition', 2),
    fc(8, 'Define kinetic energy.', 'The energy a body has because of its motion.', 'definition', 2),
    fc(9, 'Formula for kinetic energy?', r`$\text{KE} = \tfrac{1}{2}mv^2$`, 'formula', 2),
    fc(10, 'The speed of a body is doubled. What happens to its KE?', 'It becomes four times as large.', 'concept', 2),
    fc(11, 'Define potential energy.', 'The energy a body has because of its position or condition.', 'definition', 2),
    fc(12, 'Formula for gravitational potential energy?', r`$\text{PE} = mgh$`, 'formula', 2),
    fc(13, 'State the work–energy theorem.', 'The net work done on a body equals the change in its kinetic energy.', 'definition', 2),
    fc(14, 'What does negative net work do to a moving body?', 'It decreases the kinetic energy; the body slows down.', 'concept', 2),
    fc(15, 'State the law of conservation of energy.', 'Energy can neither be created nor destroyed; it changes from one form to another, and the total stays constant.', 'definition', 3),
    fc(16, 'What is mechanical energy?', 'The sum of kinetic energy and potential energy.', 'definition', 3),
    fc(17, 'At what point is the KE of a swinging pendulum bob greatest?', 'At the mean (lowest) position.', 'concept', 3),
    fc(18, 'Speed of a body falling from rest through height h?', r`$v = \sqrt{2gh}$, independent of the mass.`, 'formula', 3),
    fc(19, 'Energy change in a ceiling fan?', 'Electrical energy changes to kinetic energy (and a little heat).', 'example', 3),
    fc(20, 'Define power and its SI unit.', 'The rate of doing work, P = W/t; the watt (W), one joule per second.', 'definition', 3),
    fc(21, 'How many watts in 1 kW?', '1000 W.', 'fact', 3),
    fc(22, 'What is a kilowatt hour?', r`The energy used by a 1 kW device in 1 hour; $1\ \text{kWh} = 3.6 \times 10^6$ J.`, 'definition', 3),
    fc(23, 'A 2 kW heater runs for 3 hours. Energy used?', '6 kWh.', 'example', 3),
    fc(24, 'Define mechanical advantage.', 'Load divided by effort; it has no unit.', 'definition', 4),
    fc(25, 'MA of a lever in terms of arms?', 'Effort arm divided by load arm.', 'formula', 4),
    fc(26, 'Where is the fulcrum in a class I lever?', 'Between the effort and the load (seesaw, scissors).', 'fact', 4),
    fc(27, 'Which class of lever has the load between the fulcrum and the effort?', 'Class II (wheelbarrow, nutcracker); its MA is greater than 1.', 'fact', 4),
    fc(28, 'Which class of lever always has MA less than 1?', 'Class III (tongs, fishing rod), where the effort is between the fulcrum and the load.', 'fact', 4),
    fc(29, 'MA of a single fixed pulley and a single movable pulley?', 'Single fixed 1 (changes direction only); single movable 2.', 'fact', 4),
    fc(30, 'MA of an ideal block and tackle?', 'Equal to the number of rope strands supporting the load.', 'concept', 4),
    fc(31, 'Define efficiency.', r`Useful work output divided by work input, times $100\,\%$; also MA ÷ VR × 100 %.`, 'definition', 4),
    fc(32, 'Can a real machine have an efficiency of 100 %?', 'No. Friction and the weight of moving parts waste some energy, so it is always less.', 'concept', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
