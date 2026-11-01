// ICSE 10 Physics ch10 Electromagnetism — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Electromagnetism — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Magnetic field of a current',
      `- **Oersted’s experiment:** a compass needle below a north–south wire is deflected when a current flows; the deflection reverses with the current. A current produces a magnetic field.
- **Straight wire:** field lines are concentric circles in a plane perpendicular to the wire; closer together (stronger field) near the wire and for a larger current.
- **Right-hand thumb rule:** grip the wire in the right hand with the thumb along the current; the fingers curl in the direction of the field.
- **Circular loop:** circles round each part of the wire; near the centre the lines are nearly straight along the axis. One face acts as N, the other as S. More turns or more current give a stronger field.`,
      [kt('Right-hand thumb rule', 'If a current-carrying wire is held in the right hand with the thumb along the current, the curled fingers point along the magnetic field lines.'), kt('Magnetic field line', 'A line along which a free north pole would tend to move; its tangent gives the field direction at a point.')],
      [],
      table(['Conductor', 'Shape of field lines'], [['Straight wire', 'Concentric circles'], ['Circular loop (near centre)', 'Nearly straight, along the axis'], ['Solenoid (inside)', 'Straight and parallel']], 'Table of field-line shapes for three current-carrying conductors'),
      [1],
    ),
    sec(
      '2. Solenoid and electromagnet',
      `- **Solenoid:** a long coil of insulated wire; its field is like a bar magnet’s: straight and parallel inside, looping from N to S outside.
- **Clock rule:** viewed from one end, anticlockwise current — that end is N; clockwise — S. Reversing the current reverses the poles.
- **Electromagnet:** a solenoid on a soft iron core; a temporary magnet while current flows.
- **Stronger electromagnet:** more turns, more current, soft iron core (U-shaped to bring the poles close).
- **Soft iron, not steel:** soft iron is magnetised strongly and loses its magnetism when the current stops; steel keeps some magnetism.
- **Uses:** electric bell, cranes for scrap iron, relays, sorting iron from waste, loudspeakers, motors.`,
      [kt('Solenoid', 'A long cylindrical coil of many turns of insulated wire whose magnetic field, when a current flows, resembles that of a bar magnet.'), kt('Electromagnet', 'A temporary magnet made by passing a current through a coil wound on a soft iron core.')],
      [],
      table(['Feature', 'Electromagnet', 'Permanent magnet'], [['Magnetism', 'Only while current flows', 'Always'], ['Strength', 'Variable', 'Fixed'], ['Poles', 'Reversible', 'Fixed']], 'Table comparing an electromagnet and a permanent magnet'),
      [2],
    ),
    sec(
      '3. Force on a conductor; DC motor',
      `- A current-carrying conductor in a magnetic field experiences a **force**: greatest when it is perpendicular to the field, zero when parallel; reversing the current or the field reverses the force.
- **Fleming’s left-hand rule:** thumb, forefinger and middle finger of the left hand mutually perpendicular — forefinger: **field**, middle finger: **current**, thumb: **force (motion)**.
- **DC motor** (parts and energy only): field magnet; armature coil on an axle; **split ring commutator**; **carbon brushes**; DC source. Energy: **electrical → mechanical**.
- Uses: fans, mixers, washing machines, pumps, electric vehicles.`,
      [kt('Fleming’s left-hand rule', 'With the left hand’s thumb, forefinger and middle finger at right angles, forefinger along the field and middle finger along the current, the thumb gives the direction of the force.'), kt('Commutator', 'The split ring joined to the ends of the coil of a DC motor, on which the carbon brushes press.')],
      [],
      table(['Part of DC motor', 'What it is'], [['Field magnet', 'Provides the magnetic field'], ['Armature', 'Coil that turns on an axle'], ['Split rings', 'Commutator joined to the coil ends'], ['Brushes', 'Carbon contacts to the battery']], 'Table of the main parts of a DC motor'),
      [3],
    ),
    sec(
      '4. Electromagnetic induction; AC generator; household AC',
      r`- **Electromagnetic induction:** a current is induced in a closed coil whenever the magnetic field linked with it **changes** (magnet or coil moving, or a nearby current changing). No change, no induced current.
- Larger induced current: faster motion, more turns, stronger magnet, soft iron core. Reversed motion or pole reverses it.
- **Fleming’s right-hand rule:** thumb — **motion**, forefinger — **field**, middle finger — **induced current**.
- **AC generator** (parts and energy only): field magnet; armature coil turned on an axle; **two slip rings**; carbon brushes; external circuit. Energy: **mechanical → electrical**.
- **Household AC in India: 50 Hz**; period $T = 1/f = 0.02$ s; the direction reverses twice per cycle.`,
      [kt('Electromagnetic induction', 'The production of an electric current in a closed circuit by changing the magnetic field linked with it.'), kt('Frequency of AC', 'The number of complete cycles of an alternating current in one second, measured in hertz.')],
      [fm(r`T = \dfrac{1}{f}`, 'Period and frequency')],
      table(['Machine', 'Energy change', 'Rings'], [['DC motor', 'Electrical → mechanical', 'Split rings'], ['AC generator', 'Mechanical → electrical', 'Slip rings']], 'Table comparing the DC motor and the AC generator'),
      [4],
    ),
    sec(
      '5. AC versus DC; transformers',
      r`- **AC advantages:** voltage easily changed by transformers (high-voltage, low-current transmission with little loss); generators simpler for large power; easily converted to DC. **DC** needed for charging batteries and electroplating.
- **Transformer:** primary and secondary coils on a **laminated soft iron core**; works **only on AC**.
- $\dfrac{V_{s}}{V_{p}} = \dfrac{N_{s}}{N_{p}}$. **Step-up:** $N_{s} > N_{p}$ (power stations). **Step-down:** $N_{s} < N_{p}$ (chargers, doorbells, the pole transformer).
- For an ideal transformer, power in = power out: $V_{p}I_{p} = V_{s}I_{s}$, so stepping the voltage up steps the current down.`,
      [kt('Step-up transformer', 'A transformer with more turns on the secondary coil than on the primary, so that the output voltage is greater than the input voltage.'), kt('Step-down transformer', 'A transformer with fewer turns on the secondary coil than on the primary, so that the output voltage is less than the input voltage.')],
      [fm(r`\dfrac{V_{s}}{V_{p}} = \dfrac{N_{s}}{N_{p}}`, 'Turns ratio'), fm(r`V_{p}I_{p} = V_{s}I_{s}`, 'Ideal transformer')],
      table(['Type', 'Turns', 'Voltage', 'Example'], [['Step-up', 'Ns > Np', 'Raised', 'At a power station'], ['Step-down', 'Ns < Np', 'Lowered', 'Phone charger']], 'Table comparing step-up and step-down transformers'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Using the left hand for the field of a wire, or the right hand for the force on a wire.
- Saying a current is induced by a magnet at rest inside a coil.
- Mixing up split rings (motor) and slip rings (generator).
- Saying a transformer works on DC, or that a step-up transformer increases the current too.

**How marks are usually awarded**
- Rules: the hand, what each finger represents, and that they are at right angles.
- Field diagrams: correct shape, arrows, spacing.
- Transformer sums: the ratio, substitution, answer with unit, and the type (step-up or step-down).`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What did Oersted’s experiment show?', 'An electric current produces a magnetic field around it.', 'concept', 1),
    fc(2, 'Shape of field lines round a straight wire?', 'Concentric circles centred on the wire.', 'diagram', 1),
    fc(3, 'Right-hand thumb rule?', 'Thumb along the current; curled fingers give the field direction.', 'definition', 1),
    fc(4, 'Where is the field of a straight wire strongest?', 'Close to the wire.', 'fact', 1),
    fc(5, 'Field near the centre of a circular loop?', 'Nearly straight, along the axis.', 'diagram', 1),
    fc(6, 'Solenoid?', 'A long coil of insulated wire; its field is like a bar magnet’s.', 'definition', 2),
    fc(7, 'Field inside a long solenoid?', 'Straight, parallel, nearly uniform lines.', 'diagram', 2),
    fc(8, 'Clock rule: anticlockwise current at an end?', 'That end is a north pole.', 'concept', 2),
    fc(9, 'Three ways to strengthen an electromagnet?', 'More turns, more current, soft iron core.', 'concept', 2),
    fc(10, 'Why is the core of an electromagnet soft iron?', 'It magnetises strongly and loses its magnetism when the current stops.', 'concept', 2),
    fc(11, 'Two uses of electromagnets?', 'Electric bell; crane lifting scrap iron.', 'example', 2),
    fc(12, 'How can an electromagnet’s poles be reversed?', 'Reverse the current.', 'fact', 2),
    fc(13, 'When is the force on a current-carrying wire zero?', 'When the wire lies along the field.', 'fact', 3),
    fc(14, 'Fleming’s left-hand rule: forefinger?', 'Field.', 'definition', 3),
    fc(15, 'Fleming’s left-hand rule: thumb?', 'Force (motion).', 'definition', 3),
    fc(16, 'Energy change in a DC motor?', 'Electrical → mechanical.', 'fact', 3),
    fc(17, 'Parts of a DC motor?', 'Field magnet, armature coil, split ring commutator, carbon brushes.', 'diagram', 3),
    fc(18, 'Electromagnetic induction?', 'A current induced in a coil by a changing magnetic field.', 'definition', 4),
    fc(19, 'Magnet at rest inside a coil: induced current?', 'None.', 'concept', 4),
    fc(20, 'Two ways to increase an induced current?', 'Move faster; use more turns (or a stronger magnet).', 'concept', 4),
    fc(21, 'Fleming’s right-hand rule: middle finger?', 'Induced current.', 'definition', 4),
    fc(22, 'Energy change in an AC generator?', 'Mechanical → electrical.', 'fact', 4),
    fc(23, 'Rings of an AC generator?', 'Two slip rings (full rings).', 'diagram', 4),
    fc(24, 'Frequency of household AC in India?', '50 Hz.', 'fact', 4),
    fc(25, 'Period of 50 Hz AC?', '0.02 s (20 ms).', 'formula', 4),
    fc(26, 'Main advantage of AC over DC?', 'Its voltage can be changed easily by transformers.', 'concept', 5),
    fc(27, 'Turns ratio of a transformer?', 'Vs ÷ Vp = Ns ÷ Np.', 'formula', 5),
    fc(28, 'Step-up transformer?', 'More turns on the secondary; raises the voltage.', 'definition', 5),
    fc(29, 'Why does a transformer not work on DC?', 'A steady current gives no changing field in the core.', 'concept', 5),
    fc(30, 'Exam tip: which hand?', 'Left for motors (force), right for generators (induced current).', 'exam-tip', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
