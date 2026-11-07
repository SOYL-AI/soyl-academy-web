// ICSE 9 Physics ch12 notes and flashcards.
import { T, unit, PROV, svgV, r } from '../../icse-9-physics-ch01/src/lib.mjs';
import { INDUCED, CHAIN, FIELD, FIELD_COMPASS, EARTH_FIG, COMB_NN, COMB_NS, RESULTANT } from './svgs.mjs';
import * as K from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Magnetism — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Induced magnetism: induction precedes attraction',
      `**Magnetic materials** (iron, steel, nickel, cobalt) are attracted by a magnet; wood, plastic, copper and glass are not.

When a piece of **soft iron** is brought near the N pole of a magnet, the magnet first **induces** magnetism in it: the end **nearer** the N pole becomes a **S pole** and the **far** end becomes a **N pole**. Because unlike poles attract and the nearer pole is the stronger, the iron is then **attracted**. So **induction precedes attraction**: a magnet can attract only after it has magnetised the iron. A second nail hanging from the first is held in the same way, each nail being magnetised by the one above it.

Soft iron loses its magnetism when the magnet is taken away (a temporary magnet); steel keeps it (a permanent magnet).

Since an unmagnetised iron piece is also attracted, **attraction is not a sure test** for a magnet. **Repulsion is the sure test**: only a magnet can repel the pole of a magnet.`,
      [kt('Induced magnetism', 'The magnetism produced in a piece of magnetic material when it is placed near a magnet.'), kt('Sure test of a magnet', 'Repulsion: only a magnet repels the like pole of another magnet.')],
      [],
      svgV(INDUCED, 'A soft iron bar far from a magnet and near its N pole, where the nearer end becomes a S pole'),
      [1],
      [svgV(CHAIN, 'Two nails hanging from the N pole of a magnet, each magnetised by induction')],
    ),
    sec(
      '2. Magnetic field lines and their properties',
      `The space around a magnet in which its magnetic effect is felt is its **magnetic field**. A **field line** is the path that a free N pole would follow. A small **compass needle** placed at a point lies along the line through that point, its N pole pointing the way the field points.

**Properties of field lines**
- They start from the **N pole** and end at the **S pole** outside the magnet; inside the magnet they run from S to N, so each line is a **closed curve**.
- The **tangent** to a line at a point gives the direction of the field there.
- Lines **never cross**; if they did, the field would have two directions at one point.
- Lines are **crowded where the field is strong** (near the poles) and **far apart where it is weak**. Parallel, equally spaced lines show a **uniform** field.

To plot a line, a compass is moved step by step: mark the positions of the two ends of the needle, join the dots and add an arrow from N to S.`,
      [kt('Magnetic field', 'The region around a magnet in which its magnetic force can be felt.'), kt('Field line', 'A line whose tangent at any point gives the direction of the magnetic field there.')],
      [],
      svgV(FIELD, 'Field lines of a bar magnet running from the N pole to the S pole'),
      [2],
      [svgV(FIELD_COMPASS, 'Compass needles lying along a field line of a bar magnet')],
    ),
    sec(
      "3. The earth's magnetic field and the compass",
      `The earth behaves like a **huge bar magnet**. Its **magnetic S pole is near the geographic north** and its magnetic N pole near the geographic south; that is why the N pole of a magnet points towards the north (unlike poles attract).

**Evidence** that the earth has a magnetic field: a freely suspended bar magnet or a pivoted compass needle always comes to rest pointing along the same north-south line; a piece of soft iron left pointing north-south for a long time becomes weakly magnetised; neutral points exist near a bar magnet.

A **magnetic compass** is a small magnetised needle on a pivot. Its **N pole points to the geographic north** (roughly), so it shows direction. Over a small region such as a table, the **earth's field is uniform**: it has parallel, equally spaced lines along the north-south direction, pointing north. (The line along which a compass rests is called the magnetic meridian; it differs a little from the geographic one in most places.)`,
      [kt('Magnetic compass', 'A small magnetised needle pivoted at its centre; its N pole points roughly to the geographic north.'), kt("Earth's magnetic poles", 'The magnetic S pole is near the geographic north and the magnetic N pole near the geographic south.')],
      [],
      svgV(EARTH_FIG, 'The earth as a bar magnet with compass needles'),
      [3],
    ),
    sec(
      '4. Combined field of a bar magnet and the earth: neutral points',
      `Near a bar magnet the field is the sum of the field of the magnet and the **uniform field of the earth**. A **neutral point** is a point where these two fields are **equal in size and opposite in direction**, so the **resultant field is zero**. A compass placed there is not turned by any field and can rest pointing in any direction.

- **N pole of the magnet pointing north:** the magnet's field on its **equatorial line** (the perpendicular bisector) points south, opposite to the earth's field, so the two **neutral points lie on the equatorial line**, one on the east side and one on the west side.
- **N pole of the magnet pointing south:** on the **axial line** the magnet's field also points south, opposing the earth's field there, so the two **neutral points lie on the axial line**, one beyond each pole.

A **stronger magnet has its neutral points farther away**, because its field is still as strong as the earth's at a greater distance.

**Directions:** where two fields at right angles act together, a compass lies along their resultant. If the earth's field is ${K.RES.earth} units north and the magnet's is ${K.RES.magnet} units east, the resultant is ${K.RES_MAG} units, ${K.RES_ANG}° east of north; if the two are equal the needle lies at ${K.EQUAL}°. **Distances** (the magnet's poles are a little inside its ends): a neutral point ${K.EQ1.d} cm from the centre of a ${K.EQ1.len} cm magnet, on the equatorial line, is ${K.EQ1_POLE} cm from each pole.`,
      [kt('Neutral point', 'A point where the magnetic field of a magnet is equal and opposite to the earth’s field, so the resultant field is zero.')],
      [],
      svgV(COMB_NN, 'Field of a bar magnet with its N pole pointing north together with the earth’s field, with two neutral points on the equatorial line'),
      [4],
      [svgV(COMB_NS, 'Field of a bar magnet with its N pole pointing south together with the earth’s field, with two neutral points on the axial line'), svgV(RESULTANT, 'Resultant of 3 units north and 4 units east')],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying that a magnet attracts iron "because iron is a magnet"; the iron is first magnetised by induction, with the nearer end an unlike pole.
- Taking attraction as proof that a bar is a magnet; only repulsion is a sure test.
- Drawing field lines that cross, that have no arrows, or that point from S to N outside the magnet.
- Calling the earth's pole in the north its "magnetic north pole"; it is a magnetic S pole (that is why the N pole of a compass points to it).
- Putting the neutral points on the wrong line: N pole pointing north gives points on the equatorial line; N pole pointing south gives points on the axial line.
- Forgetting that the resultant field is zero at a neutral point, not just small.
- Giving distances from the centre when the question asks for the distance from a pole (the poles are a little inside the ends).

**How marks are usually awarded**
- 1 mark: a term, a pole or a direction.
- 2 marks: two properties or a short reason; a numerical on distances or directions.
- 3 marks: a description (plotting a line) or a reason with a diagram.
- 10-mark structured question: a lettered field diagram or neutral-point diagram: name poles, give directions, locate points, one numerical and a reason.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Name four magnetic materials.', 'Iron, steel, nickel and cobalt.', 'fact', 1),
    fc(2, 'What is induced magnetism?', 'Magnetism produced in a piece of magnetic material placed near a magnet.', 'definition', 1),
    fc(3, 'Pole induced at the end of an iron bar nearer the N pole of a magnet?', 'A S pole; the far end becomes a N pole.', 'concept', 1),
    fc(4, 'What does "induction precedes attraction" mean?', 'A magnet attracts iron only after first inducing opposite poles in it.', 'concept', 1),
    fc(5, 'Sure test of a magnet?', 'Repulsion. Attraction also occurs with unmagnetised iron.', 'concept', 1),
    fc(6, 'Soft iron or steel: which loses magnetism quickly?', 'Soft iron (a temporary magnet); steel keeps it.', 'fact', 1),
    fc(7, 'What is a magnetic field?', 'The region around a magnet in which its magnetic force is felt.', 'definition', 2),
    fc(8, 'Direction of field lines outside a magnet?', 'From the N pole to the S pole (S to N inside).', 'fact', 2),
    fc(9, 'Can two field lines cross?', 'No; the field would have two directions at one point.', 'concept', 2),
    fc(10, 'What do crowded field lines show?', 'A strong field, as near the poles.', 'concept', 2),
    fc(11, 'What do parallel equally spaced lines show?', 'A uniform field.', 'concept', 2),
    fc(12, 'A field line is a closed curve. Why?', 'Outside the magnet it goes N to S and inside S to N.', 'concept', 2),
    fc(13, 'Direction given by the tangent to a line?', 'The direction of the magnetic field at that point.', 'concept', 2),
    fc(14, 'How does a compass needle lie in a field?', 'Along the field line, its N pole pointing the way the field points.', 'concept', 2),
    fc(15, 'Which magnetic pole is near the geographic north?', 'The earth’s magnetic S pole.', 'fact', 3),
    fc(16, 'Why does the N pole of a magnet point north?', 'It is attracted by the earth’s magnetic S pole in the north.', 'concept', 3),
    fc(17, 'Evidence for the earth’s magnetic field?', 'A freely suspended magnet or pivoted needle rests along the north-south line.', 'concept', 3),
    fc(18, 'What is a magnetic compass?', 'A pivoted magnetised needle whose N pole points roughly north.', 'definition', 3),
    fc(19, 'The earth’s field over a small region is...', 'Uniform: parallel, equally spaced lines pointing north.', 'concept', 3),
    fc(20, 'Define a neutral point.', 'A point where the resultant of the magnet’s field and the earth’s field is zero.', 'definition', 4),
    fc(21, 'N pole pointing north: where are the neutral points?', 'On the equatorial line, one on each side (east and west).', 'concept', 4),
    fc(22, 'N pole pointing south: where are the neutral points?', 'On the axial line, one beyond each pole (north and south).', 'concept', 4),
    fc(23, 'How does a compass behave at a neutral point?', 'It is not turned by any field and can rest in any direction.', 'concept', 4),
    fc(24, 'Stronger magnet: neutral points move...', 'Farther from the magnet.', 'concept', 4),
    fc(25, 'Two equal perpendicular fields: compass direction?', 'At 45° to each.', 'fact', 4),
    fc(26, 'Resultant of 3 and 4 units at right angles?', '5 units, at about 53° from the 3-unit field.', 'formula', 4),
    fc(27, 'Neutral point 8 cm from the centre of a 12 cm magnet: distance to each pole?', '10 cm (poles 6 cm from the centre; 6-8-10 triangle).', 'example', 4),
    fc(28, 'How do you plot a field line with a compass?', 'Mark both ends of the needle, move it on, join the dots and add an arrow from N to S.', 'concept', 2),
    fc(29, 'Why is repulsion a sure test but attraction not?', 'Unmagnetised iron is attracted too, but only a magnet can repel a pole.', 'concept', 1),
    fc(30, 'Where is the magnetic field of the magnet strongest?', 'At its poles, where the field lines are crowded.', 'fact', 2),
  ],
  status: 'draft',
  provenance: PROV,
};
