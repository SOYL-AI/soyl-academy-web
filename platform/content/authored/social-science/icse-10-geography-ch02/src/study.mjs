// ICSE 10 Geography ch02 Topographical Maps: Colours, Symbols, Scale, Distance and Direction: notes and flashcards (imagined practice sheet).
import { T, table, unit, PROV } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const IMG = 'Imagined practice sheet';

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Topographical Maps: Colours, Symbols, Scale, Distance and Direction: Notes',
  language: 'en',
  sections: [
    sec(
      '1. Colour tints',
      `- **Yellow:** cultivated land. **Green:** forest (and orchards). **White:** uncultivated land such as open scrub or barren ground.
- **Blue:** water (streams, tanks, canals). **Brown:** relief, shown by contours. **Black:** man-made features: huts, tracks, names. **Red:** metalled roads. Real Survey of India sheets differ in some details (for example the colour of grid lines and settlements); follow the key printed on the sheet you are given.
- On the imagined practice sheet (not a real place, not a Survey of India sheet) about 45% of the area is cultivated, 33% open scrub and 22% forest.
- Always read the key of the sheet.`,
      [kt('Key (legend)', 'The list of symbols and tints used on a sheet, with their meanings.'), kt('Tint', 'A colour wash that shows a kind of land cover.')],
      [],
      table(['Colour', 'Shows'], [['Yellow', 'Cultivated land'], ['Green', 'Forest'], ['White', 'Uncultivated land'], ['Blue', 'Water'], ['Brown', 'Contours'], ['Red', 'Metalled roads']], 'Table of colours and what they show', IMG),
      [1],
    ),
    sec(
      '2. Conventional symbols: points',
      `- **Huts:** small black squares (clustered in a village or dispersed).
- **Temple:** flag on a square. **Well:** circle with a dot. **Tank:** blue shape.
- **PO** post office, **PS** police station, **Dis** dispensary.
- **Triangulated height:** black triangle with a figure. **Spot height:** black dot with a figure.`,
      [kt('Conventional symbol', 'A standard sign that shows an object on a map without drawing it to scale.')],
      [],
      table(['Symbol', 'Feature'], [['Black squares', 'Huts'], ['Flag on a square', 'Temple'], ['Circle with a dot', 'Well'], ['PO, PS, Dis', 'Post office, police station, dispensary']], 'Table of point symbols and the features they show', IMG),
      [1],
    ),
    sec(
      '3. Conventional symbols: lines',
      `- **Metalled road:** thick red line. **Unmetalled road:** thick black broken line. **Cart track:** thin black line. **Pack track:** thin broken line. **Footpath:** dotted line.
- **Perennial stream:** continuous blue line. **Seasonal stream:** dashed blue line. **Canal:** thick blue line along a contour. **Embankment:** line with short ticks. **Bridge:** short thick bar across the river.`,
      [kt('Metalled road', 'A road with a hard surface of stone or tar, shown in red.'), kt('Seasonal stream', 'A stream that carries water only in the rains, shown by a dashed blue line.')],
      [],
      table(['Line', 'Meaning'], [['Thick red', 'Metalled road'], ['Dotted black', 'Footpath'], ['Dashed blue', 'Seasonal stream']], 'Table of line symbols and their meanings', IMG),
      [1],
    ),
    sec(
      '4. Scale',
      `- **Statement scale:** in words (1 cm to 0.5 km). **Representative fraction (RF):** a ratio with no units (1 : 50 000). **Linear scale:** a bar marked in km.
- Statement scale to RF: convert the ground distance to cm. 0.5 km = 50 000 cm, so RF 1 : 50 000.
- RF to statement: 1 : 25 000 means 1 cm to 25 000 cm = 0.25 km.
- 1 km = 1 000 m = 100 000 cm. On the imagined sheet one grid square (1 km) is 2 cm.`,
      [kt('Representative fraction', 'The scale written as a ratio without units, such as 1 : 50 000.'), kt('Linear scale', 'A bar divided into ground distances, usable at any enlargement.')],
      [],
      table(['Scale', 'Value'], [['Statement', '1 cm to 0.5 km'], ['RF', '1 : 50 000'], ['Linear', 'Bar of 5 km']], 'Table of the three scales of the imagined sheet', IMG),
      [2],
    ),
    sec(
      '5. Distance and area',
      `- **Distance:** only the straight-line (direct) distance is measured. Measure in cm and multiply by 0.5 km per cm. For example 1.8 cm is 0.9 km. A check from the grid: distance = square root of (east-west difference squared plus north-south difference squared).
- **Area:** count only complete 1 km squares; each is 1 sq km. A block 3 squares by 3 squares has 9 sq km. Part squares are not counted.`,
      [kt('Direct distance', 'The straight-line distance between two places, not along a road or river.')],
      [],
      table(['Item', 'Method'], [['Distance', 'cm times 0.5 gives km'], ['Area', 'Number of full squares gives sq km']], 'Table of the methods for distance and area', IMG),
      [3, 4],
    ),
    sec(
      '6. Direction',
      `- Eight points: N, NE, E, SE, S, SW, W, NW (45 degrees apart). North is at the top of a sheet unless an arrow shows otherwise.
- Give the direction from the first place to the second. Reversing the places gives the opposite point (NE becomes SW).
- On the imagined sheet the temple is north-east of the dispensary and about 3.8 km away; the police station is south of the temple.`,
      [kt('Intercardinal points', 'North-east, south-east, south-west and north-west, between the four cardinal points.')],
      [],
      table(['Point', 'Opposite'], [['North-east', 'South-west'], ['North-west', 'South-east'], ['North', 'South'], ['East', 'West']], 'Table of the compass points and their opposites', IMG),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing units in an RF, or forgetting to convert km to cm.
- Measuring distance along a road instead of the straight line.
- Counting part squares when finding area.
- Giving a direction from the second place to the first.
- Confusing seasonal (dashed) and perennial (continuous) streams.

**How marks are usually awarded**
- Colour or symbol (1 mark): the feature, not just the colour.
- Scale (1 to 2 marks): the unit conversion shown and the RF written correctly.
- Distance, area (2 marks): working and unit.
- Direction (1 mark): one of the eight points.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Yellow tint on a sheet?', 'Cultivated land.', 'fact', 1),
    fc(2, 'Green tint?', 'Forest (and orchards).', 'fact', 1),
    fc(3, 'White areas?', 'Uncultivated land such as open scrub.', 'fact', 1),
    fc(4, 'Blue on a sheet?', 'Water: streams, tanks, canals.', 'fact', 1),
    fc(5, 'Brown on a sheet?', 'Contours (relief).', 'fact', 1),
    fc(6, 'Red lines?', 'Metalled roads.', 'fact', 1),
    fc(7, 'Black on a sheet?', 'Man-made features such as huts, tracks and names.', 'fact', 1),
    fc(8, 'Symbol for a well?', 'A circle with a dot.', 'diagram', 1),
    fc(9, 'Symbol for a temple?', 'A flag on a small square.', 'diagram', 1),
    fc(10, 'PO, PS, Dis stand for?', 'Post office, police station, dispensary.', 'definition', 1),
    fc(11, 'Dashed blue line?', 'A seasonal stream.', 'fact', 1),
    fc(12, 'Dotted black line?', 'A footpath.', 'fact', 1),
    fc(13, 'Where is the key of a sheet?', 'In the margin or below the map; it lists all symbols and tints.', 'concept', 1),
    fc(14, 'Three types of scale?', 'Statement scale, representative fraction, linear scale.', 'fact', 2),
    fc(15, 'Statement scale of the imagined sheet?', '1 cm to 0.5 km.', 'fact', 2),
    fc(16, 'RF of 1 cm to 0.5 km?', '1 : 50 000.', 'example', 2),
    fc(17, 'How many cm in 1 km?', '100 000 cm.', 'fact', 2),
    fc(18, 'RF 1 : 25 000 means 1 cm to?', '0.25 km.', 'example', 2),
    fc(19, 'What is a linear scale?', 'A bar marked in ground distances (km).', 'definition', 2),
    fc(20, 'Why use a linear scale?', 'It stays correct if the map is enlarged or reduced.', 'concept', 2),
    fc(21, 'Distance formula on this sheet?', 'Map cm times 0.5 gives km.', 'formula', 3),
    fc(22, 'What kind of distance is measured?', 'Straight-line (direct) distance only.', 'concept', 3),
    fc(23, 'Real distance of 7.2 cm on this sheet?', '3.6 km.', 'example', 3),
    fc(24, 'Area of one grid square?', '1 sq km.', 'fact', 4),
    fc(25, 'How is area found from the grid?', 'Count only complete squares; each is 1 sq km.', 'concept', 4),
    fc(26, 'Number of compass points used?', 'Eight.', 'fact', 5),
    fc(27, 'Opposite of north-east?', 'South-west.', 'fact', 5),
    fc(28, 'Which way is north on a sheet?', 'To the top, unless an arrow shows otherwise.', 'fact', 5),
    fc(29, 'Direction is given from which place?', 'From the first-named place to the second.', 'exam-tip', 5),
    fc(30, 'Exam tip on RF?', 'Write it without units: 1 : 50 000.', 'exam-tip', 2),
  ],
  status: 'draft',
  provenance: PROV,
};
