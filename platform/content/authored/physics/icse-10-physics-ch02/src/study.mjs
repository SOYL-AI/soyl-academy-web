// ICSE 10 Physics ch02 Work, Energy and Power — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Work, Energy and Power — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Work',
      r`Work is done when a force moves its point of application: $W = F s \cos\theta$ ($\theta$ = angle between force and displacement). Scalar; SI unit joule.

- $\theta = 0^\circ$: $W = Fs$. $\theta = 90^\circ$: $W = 0$ (load carried horizontally; a satellite in circular orbit). $\theta = 180^\circ$: $W = -Fs$ (friction, braking).
- Work against gravity in lifting mass $m$ through height $h$: $W = mgh$.`,
      [kt('Work', 'The product of a force and the displacement of its point of application in the direction of the force.'), kt('Joule', 'The work done when a force of one newton moves its point of application one metre in its own direction.')],
      [fm(r`W = F s \cos\theta`, 'Work by a force at an angle'), fm(r`W = mgh`, 'Work against gravity')],
      table(['θ', 'cos θ', 'Work'], [['0°', '1', 'Fs'], ['60°', '0.5', 'Fs/2'], ['90°', '0', 'Zero']], 'Table of work done at three angles'),
      [1],
    ),
    sec(
      '2. Energy and its units',
      r`Energy: the capacity to do work; same units as work.

| Unit | Value |
|---|---|
| 1 J | $10^{7}$ erg |
| 1 calorie | ≈ 4.2 J |
| 1 kW h | $3.6 \times 10^{6}$ J |
| 1 eV | $1.6 \times 10^{-19}$ J |`,
      [kt('Energy', 'The capacity of a body to do work.'), kt('Kilowatt hour', 'The energy used by a one-kilowatt device in one hour, equal to 3.6 million joules.')],
      [fm(r`1\ \text{kW h} = 3.6 \times 10^{6}\ \text{J}`, 'Kilowatt hour')],
      table(['From', 'To', 'Multiply by'], [['kW h', 'J', '3.6 × 10⁶'], ['J', 'erg', '10⁷'], ['J', 'cal', '1/4.2']], 'Table of conversion factors'),
      [2],
    ),
    sec(
      '3. Power',
      r`Power = rate of doing work: $P = \dfrac{W}{t}$. SI unit watt (1 J s⁻¹); kW = $10^{3}$ W, MW = $10^{6}$ W, GW = $10^{9}$ W; **1 hp = 746 W**.

Energy (how much work) differs from power (how fast): equal-weight students climbing the same stairs gain the same energy; the faster one has more power.`,
      [kt('Power', 'The rate at which work is done or energy is transferred.'), kt('Watt', 'The power of a device that does one joule of work per second.')],
      [fm(r`P = \dfrac{W}{t}`, 'Power')],
      table(['Unit', 'Watts'], [['1 kW', '1000'], ['1 MW', '10⁶'], ['1 hp', '746']], 'Table of power units in watts'),
      [3],
    ),
    sec(
      '4. Potential and kinetic energy',
      r`**Gravitational potential energy:** work done to raise $m$ through $h$ against $mg$: $U = mgh$.

**Kinetic energy:** a force $F$ accelerates $m$ from rest; $v^{2} = 2as$, so $W = Fs = ma \cdot \dfrac{v^{2}}{2a} = \tfrac{1}{2}mv^{2}$: $K = \tfrac{1}{2}mv^{2}$.

Kinetic energy may be translational, rotational or vibrational (only translational is examined numerically). Doubling $v$ quadruples $K$.`,
      [kt('Potential energy', 'Energy possessed by a body because of its position or configuration.'), kt('Kinetic energy', 'Energy possessed by a body because of its motion.')],
      [fm(r`U = mgh`, 'Gravitational potential energy'), fm(r`K = \tfrac{1}{2}mv^{2}`, 'Kinetic energy')],
      table(['Change in v', 'Change in K'], [['× 2', '× 4'], ['× 3', '× 9'], ['÷ 2', '÷ 4']], 'Table of how kinetic energy scales with speed'),
      [4],
    ),
    sec(
      '5. Other forms of energy and conversions',
      `Forms: mechanical, heat, light, sound, chemical, electrical, magnetic, nuclear.

| Device | Conversion |
|---|---|
| Cell | Chemical → electrical |
| Loudspeaker | Electrical → sound |
| Microphone | Sound → electrical |
| Solar cell | Light → electrical |
| Electric heater | Electrical → heat |
| Steam engine | Heat → mechanical |`,
      [kt('Energy conversion', 'The change of energy from one form to another, as in a device.')],
      [],
      table(['Device', 'Output'], [['Fan', 'Mechanical'], ['Bulb', 'Light'], ['Generator', 'Electrical']], 'Table of three devices and their useful output'),
      [5],
    ),
    sec(
      '6. Conservation of energy',
      r`**Principle:** energy can neither be created nor destroyed; it changes form, and the total energy of an isolated system is constant.

**Free fall** from height $H$ (no air resistance): at any height $h$, $U = mgh$ and $K = mg(H - h)$, so $U + K = mgH$. Speed at the ground: $v = \sqrt{2gH}$.

**Simple pendulum:** all PE at the extremes, all KE at the mean position; total constant (air resistance slowly turns it into heat).`,
      [kt('Conservation of energy', 'Energy can neither be created nor destroyed; it can only change from one form to another.')],
      [fm(r`U + K = mgH`, 'Free fall'), fm(r`v = \sqrt{2gH}`, 'Speed after falling H')],
      table(['Pendulum position', 'Energy'], [['Extreme', 'All potential'], ['Mean', 'All kinetic'], ['In between', 'Both']], 'Table of energy at pendulum positions'),
      [6],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Forgetting cos θ when the force is at an angle.
- Treating kW h as a unit of power.
- Forgetting to square v in K = ½mv².
- Saying a pendulum is fastest at the extremes.

**How marks are usually awarded**
- Numericals (1 mark each): formula, substitution with units, answer with unit.
- Derivations (2–3 marks): start from W = F s; state the equation of motion used.
- Conservation (2 marks): energies at two positions shown equal.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Work done by a force at angle θ?', 'W = F s cos θ.', 'formula', 1),
    fc(2, 'When is no work done?', 'No displacement, or force ⟂ displacement.', 'concept', 1),
    fc(3, 'Work against gravity?', 'mgh.', 'formula', 1),
    fc(4, 'Negative work example?', 'Friction on a sliding block.', 'example', 1),
    fc(5, 'Is work a vector?', 'No, a scalar.', 'fact', 1),
    fc(6, 'Energy?', 'Capacity to do work.', 'definition', 2),
    fc(7, '1 J in erg?', '10⁷ erg.', 'formula', 2),
    fc(8, '1 kW h in J?', '3.6 × 10⁶ J.', 'formula', 2),
    fc(9, '1 calorie in J?', 'About 4.2 J.', 'fact', 2),
    fc(10, '1 eV in J?', '1.6 × 10⁻¹⁹ J.', 'fact', 2),
    fc(11, 'Power?', 'Rate of doing work, W/t.', 'definition', 3),
    fc(12, '1 hp in W?', '746 W.', 'fact', 3),
    fc(13, 'Unit of power?', 'Watt (J s⁻¹).', 'fact', 3),
    fc(14, 'Is kW h power or energy?', 'Energy.', 'concept', 3),
    fc(15, 'Same stairs, same weight, faster climber?', 'Same work, more power.', 'concept', 3),
    fc(16, 'Potential energy?', 'Energy due to position or configuration.', 'definition', 4),
    fc(17, 'Kinetic energy formula?', '½mv².', 'formula', 4),
    fc(18, 'Speed doubled: K?', 'Four times.', 'fact', 4),
    fc(19, 'Forms of kinetic energy?', 'Translational, rotational, vibrational.', 'fact', 4),
    fc(20, 'Derivation of K starts from?', 'W = F s and v² = 2as.', 'concept', 4),
    fc(21, 'Loudspeaker converts?', 'Electrical → sound.', 'fact', 5),
    fc(22, 'Solar cell converts?', 'Light → electrical.', 'fact', 5),
    fc(23, 'Cell converts?', 'Chemical → electrical.', 'fact', 5),
    fc(24, 'Microphone converts?', 'Sound → electrical.', 'fact', 5),
    fc(25, 'Conservation of energy?', 'Energy is neither created nor destroyed; total constant.', 'definition', 6),
    fc(26, 'Free fall: U + K?', 'Constant = mgH.', 'formula', 6),
    fc(27, 'Speed after falling H?', '√(2gH).', 'formula', 6),
    fc(28, 'Pendulum at extreme?', 'All potential energy.', 'fact', 6),
    fc(29, 'Pendulum at mean position?', 'All kinetic energy, fastest.', 'fact', 6),
    fc(30, 'Exam tip: numericals', 'Formula, substitution with units, answer with unit.', 'exam-tip', 1),
  ],
  status: 'draft',
  provenance: PROV,
};
