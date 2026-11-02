// ICSE 10 Geography ch03 Topographical Maps: Settlements, Land Use, Transport and Drainage: notes and flashcards (imagined practice sheet).
import { T, table, unit, PROV } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const IMG = 'Imagined practice sheet';

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Topographical Maps: Settlements, Land Use, Transport and Drainage: Notes',
  language: 'en',
  sections: [
    sec(
      '1. Settlements: site and services',
      `- The **site** of a settlement is the exact spot where it stands. Good sites have **water** (stream, tank, well), **gentle fertile land**, a **road or track**, and safety from floods.
- Services are shown by letters beside a small black square: **PO** (post office), **PS** (police station), **Dis** (dispensary).
- On the imagined practice sheet (not a real place, not a Survey of India sheet) Nandiwadi has a PO and a PS, Sonakhedi a dispensary and Pathrali none. All three villages stand on gentle ground near water and a track.`,
      [kt('Site', 'The exact location of a settlement and its local advantages.'), kt('Service centre', 'A settlement whose facilities (post office, police station, dispensary) serve nearby villages.')],
      [],
      table(['Village', 'Services'], [['Nandiwadi', 'PO, PS'], ['Sonakhedi', 'Dispensary'], ['Pathrali', 'None shown']], 'Table of the services of three villages on the imagined sheet', IMG),
      [1],
    ),
    sec(
      '2. Land use and land cover',
      `- **Yellow:** cultivated land. **Green:** forest. **White (with small green ticks):** open scrub, uncultivated land. **Blue:** water.
- **Fallow** land is cultivated land left unsown for a season; the imagined sheet does not mark it separately.
- On the imagined sheet about 45% is cultivated, 33% open scrub and 22% forest.
- Inferring occupations: yellow land with a tank or canal suggests agriculture; green steep land with no huts suggests forestry; white scrub with scattered huts suggests grazing or dry farming.`,
      [kt('Land use', 'The way an area of land is used, such as farming or forest.'), kt('Open scrub', 'Uncultivated land with scattered bushes and grass, shown white with small ticks.')],
      [],
      table(['Evidence', 'Occupation'], [['Yellow, tank, canal', 'Agriculture'], ['Green, steep, no huts', 'Forestry'], ['White, scattered huts', 'Grazing, dry farming']], 'Table of map evidence and the occupation it suggests', IMG),
      [2],
    ),
    sec(
      '3. Transport and communication',
      `- **Metalled road:** thick red line (about 10.9 km on the sheet). **Unmetalled road:** thick black broken line. **Cart track:** thin black line. **Pack track:** thin broken line. **Footpath:** dotted line.
- A **bridge** carries a road across a river. A **canal** is a blue line that follows a contour.
- Communication also includes the post office. The metalled road links Sonakhedi and Nandiwadi; the unmetalled road links Sonakhedi, Pathrali and Nandiwadi.`,
      [kt('Metalled road', 'A road with a hard surface, shown in red.'), kt('Pack track', 'A track for pack animals, shown by a thin broken line.')],
      [],
      table(['Type', 'Symbol'], [['Metalled road', 'Thick red line'], ['Unmetalled road', 'Thick black broken line'], ['Cart track', 'Thin black line'], ['Footpath', 'Dotted line']], 'Table of the types of road and track and their symbols', IMG),
      [3],
    ),
    sec(
      '4. Drainage: direction of flow',
      `- Rivers flow from **higher to lower** ground: heights along the river decrease downstream.
- Where a river crosses contours, the **V-shaped bends point upstream** (towards higher ground).
- **Tributaries join at acute angles pointing downstream.**
- On the imagined sheet the main river flows south-east, falling from about 274 m to about 41 m; a tributary at A (217 m) flows east to B (149 m).`,
      [kt('Tributary', 'A stream that flows into a larger river.'), kt('Upstream', 'Towards the source of a river, where the ground is higher.')],
      [],
      table(['Clue', 'Meaning'], [['Heights fall along the river', 'Direction of flow'], ['V-bends of contours', 'Point upstream'], ['Acute junctions', 'Point downstream']], 'Table of three clues to the direction of flow', IMG),
      [4],
    ),
    sec(
      '5. Drainage patterns',
      `- **Dendritic:** tree-like; tributaries join at acute angles; the pattern on the imagined sheet.
- **Trellis:** long parallel streams with short tributaries at right angles (shown here only as a separate schematic).
- **Radial:** streams flow outwards from a central high point, like the spokes of a wheel (schematic only).`,
      [kt('Dendritic pattern', 'A tree-like drainage pattern on fairly uniform ground.'), kt('Trellis pattern', 'A fence-like pattern of parallel streams joined at right angles.'), kt('Radial pattern', 'Streams flowing outwards from a dome or conical hill.')],
      [],
      table(['Pattern', 'Looks like', 'Forms on'], [['Dendritic', 'Tree branches', 'Uniform ground'], ['Trellis', 'Garden fence', 'Folded or banded rock'], ['Radial', 'Wheel spokes', 'Dome or cone']], 'Table of three drainage patterns', IMG),
      [4],
    ),
    sec(
      '6. Settlement patterns and natural or man-made features',
      `- **Clustered:** huts close together (about 0.1 km apart in each village on the sheet); reasons: water, road, safety, shared fields.
- **Dispersed:** huts far apart (over 1 km in the north-west); reasons: thin land, grazing, dry farming, no single water source.
- **Natural:** river, streams, hill, ridge, escarpment, forest, scrub. **Man-made:** canal, embankment, bridge, roads, tracks, huts, wells, tank (dug and banked), temple, post office.`,
      [kt('Clustered settlement', 'A settlement in which the huts stand close together.'), kt('Dispersed settlement', 'A settlement in which the huts are scattered far apart.')],
      [],
      table(['Natural', 'Man-made'], [['River, hill, ridge, forest', 'Canal, bridge, road, hut, well, tank']], 'Table of natural and man-made features of the imagined sheet', IMG),
      [5, 6],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Giving a one-word reason such as "water" instead of naming the source on the map.
- Naming an occupation without citing the tint, water or facilities.
- Saying a river flows uphill, or placing the V-bends the wrong way.
- Naming a pattern without describing its shape.
- Calling the tank or canal natural.

**How marks are usually awarded**
- Site (2 to 3 marks): each reason tied to map evidence.
- Land use and occupation (2 marks): the tint and the inference.
- Drainage (2 marks): direction with evidence; pattern with its shape.
- Settlement pattern (2 marks): the pattern and a reason.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is the site of a settlement?', 'The exact spot where it stands, with its local advantages.', 'definition', 1),
    fc(2, 'Name three site factors.', 'Water, gentle fertile land, a road or track.', 'fact', 1),
    fc(3, 'PO stands for?', 'Post office.', 'fact', 1),
    fc(4, 'PS stands for?', 'Police station.', 'fact', 1),
    fc(5, 'Dis stands for?', 'Dispensary.', 'fact', 1),
    fc(6, 'Which village on the imagined sheet has a PO and a PS?', 'Nandiwadi.', 'example', 1),
    fc(7, 'Which village on the imagined sheet has a dispensary?', 'Sonakhedi.', 'example', 1),
    fc(8, 'Why is a village near a road an advantage?', 'It gives trade and travel links.', 'concept', 1),
    fc(9, 'Yellow tint?', 'Cultivated land.', 'fact', 2),
    fc(10, 'Green tint?', 'Forest.', 'fact', 2),
    fc(11, 'White with small ticks?', 'Open scrub, uncultivated land.', 'fact', 2),
    fc(12, 'What is fallow land?', 'Cultivated land left unsown for a season.', 'definition', 2),
    fc(13, 'Yellow land with a tank and canal suggests?', 'Agriculture.', 'concept', 2),
    fc(14, 'Steep green land with no huts suggests?', 'Forestry.', 'concept', 2),
    fc(15, 'White scrub with scattered huts suggests?', 'Grazing or dry farming.', 'concept', 2),
    fc(16, 'Symbol of a metalled road?', 'Thick red line.', 'diagram', 3),
    fc(17, 'Symbol of an unmetalled road?', 'Thick black broken line.', 'diagram', 3),
    fc(18, 'Symbol of a cart track?', 'Thin black line.', 'diagram', 3),
    fc(19, 'Symbol of a pack track?', 'Thin broken line.', 'diagram', 3),
    fc(20, 'Symbol of a footpath?', 'Dotted line.', 'diagram', 3),
    fc(21, 'What carries a road over a river?', 'A bridge (a short thick bar across the river).', 'fact', 3),
    fc(22, 'Which way do V-bends of contours at a river point?', 'Upstream, towards higher ground.', 'concept', 4),
    fc(23, 'How do tributaries join the main river?', 'At acute angles pointing downstream.', 'concept', 4),
    fc(24, 'How do you find the direction of flow?', 'Water flows from the higher end to the lower end.', 'concept', 4),
    fc(25, 'Dendritic pattern?', 'Tree-like; the pattern on the imagined sheet.', 'definition', 4),
    fc(26, 'Trellis pattern?', 'Parallel streams joined by short tributaries at right angles.', 'definition', 4),
    fc(27, 'Radial pattern?', 'Streams flowing outwards from a central high point.', 'definition', 4),
    fc(28, 'Clustered settlement?', 'Huts close together around a centre.', 'definition', 5),
    fc(29, 'Dispersed settlement?', 'Huts scattered far apart.', 'definition', 5),
    fc(30, 'Is a canal natural or man-made?', 'Man-made.', 'fact', 6),
  ],
  status: 'draft',
  provenance: PROV,
};
