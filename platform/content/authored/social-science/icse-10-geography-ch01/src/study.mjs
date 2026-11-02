// ICSE 10 Geography ch01 Topographical Maps: Grid References, Contours and Heights: notes and flashcards (imagined practice sheet).
import { T, table, unit, PROV } from './lib.mjs';
import * as M from './topo.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const IMG = 'Imagined practice sheet';
const pt = (id) => M.POINTS.find((p) => p.id === id);
const temple = pt('temple1');
const po = pt('po1');
const dis = pt('disp1');

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Topographical Maps: Grid References, Contours and Heights: Notes',
  language: 'en',
  sections: [
    sec(
      '1. The sheet and its grid',
      `- A **topographical sheet** is a large-scale map of a small area showing relief, drainage, settlements, communications and land use.
- The ICSE paper uses a real Survey of India sheet. These notes use an **imagined practice sheet** (not a real place, not a Survey of India sheet).
- **Eastings** are the vertical grid lines, numbered west to east along the top and bottom (here 40 to 50).
- **Northings** are the horizontal grid lines, numbered south to north along the sides (here 70 to 80).
- Each grid square is 1 km by 1 km (1 sq km); at 1 cm to 0.5 km it measures 2 cm by 2 cm on the printed sheet.`,
      [kt('Easting', 'A vertical grid line; its number increases towards the east.'), kt('Northing', 'A horizontal grid line; its number increases towards the north.')],
      [],
      table(['Item', 'Value on the imagined sheet'], [['Eastings', '40 to 50'], ['Northings', '70 to 80'], ['Square', '1 km by 1 km']], 'Table of the grid of the imagined sheet', IMG),
      [1],
    ),
    sec(
      '2. Four-figure and six-figure grid references',
      `- **Four-figure reference** (a square): **easting first, then northing**, taken from the lines at the **south-west corner** of the square. The temple is in square **4674**.
- **Six-figure reference** (a point): easting (2 digits) + tenths eastwards, northing (2 digits) + tenths northwards. The temple is **${M.sixFig(temple.E, temple.N)}**, the post office **${M.sixFig(po.E, po.N)}** and the dispensary **${M.sixFig(dis.E, dis.N)}**.
- To find the feature at a reference, split it into the easting half and the northing half, go to that point and read the symbol with the key.`,
      [kt('Four-figure grid reference', 'Two digits for the easting then two for the northing; names a whole 1 km square.'), kt('Six-figure grid reference', 'Adds a tenth digit to each half; names a point to the nearest 0.1 km.')],
      [],
      table(['Feature', 'Four-figure', 'Six-figure'], [['Temple', '4674', M.sixFig(temple.E, temple.N)], ['Post office', '4673', M.sixFig(po.E, po.N)], ['Dispensary', '4372', M.sixFig(dis.E, dis.N)]], 'Table of grid references of three features of the imagined sheet', IMG),
      [1],
    ),
    sec(
      '3. Contours and the contour interval',
      `- A **contour** is a line joining places of equal height above mean sea level (brown on the sheet).
- The **contour interval** is the constant height difference between neighbouring contours: **20 m** on the imagined sheet.
- **Index contours** (every 100 m here) are thicker and labelled.
- Finding the interval: height difference between two labelled contours divided by the number of **gaps** (lines between + 1).
- Heights between contours: a point between the 160 m and 180 m contours has a height between 160 m and 180 m.`,
      [kt('Contour interval', 'The constant difference in height between two neighbouring contours.'), kt('Index contour', 'Every fifth contour, drawn thicker and labelled with its height.')],
      [],
      table(['Index contours', 'Lines between', 'Interval'], [['200 m and 300 m', '4', '100 ÷ 5 = 20 m']], 'Table showing the contour interval worked out from two index contours', IMG),
      [2],
    ),
    sec(
      '4. Slope from contour spacing',
      `- **Close** contours: **steep** slope. **Wide** spacing: **gentle** slope. **Even** spacing: uniform slope.
- Average gradient = height difference ÷ horizontal distance.
- On the imagined sheet the escarpment rises 108 m in about 1.3 km (about 83 m per km); the southern plain changes about 14.8 m per km.
- A **cross-section** drawn from the heights along a line shows the slope as a profile.`,
      [kt('Gradient', 'Height difference divided by horizontal distance, for example in metres per km.'), kt('Cross-section', 'A profile drawn from the heights along a chosen line.')],
      [],
      table(['Spacing', 'Slope'], [['Close', 'Steep'], ['Wide', 'Gentle'], ['Even', 'Uniform']], 'Table linking contour spacing to slope', IMG),
      [2, 3],
    ),
    sec(
      '5. Landforms from contours',
      `- **Conical hill:** concentric closed contours, steep on all sides, small summit (478 m here).
- **Ridge:** long narrow closed contours with a crest (398 m here), steep on both long sides.
- **Escarpment:** contours bunched along a line (the steep face) with wide spacing on one side and a flat top on the other.
- **Steep slope** and **gentle slope** follow the spacing; a **valley** shows V-shaped bends pointing to higher ground.
- Sketch each by drawing the contours and labelling the highest value.`,
      [kt('Conical hill', 'A hill with steep slopes on all sides shown by concentric closed contours.'), kt('Escarpment', 'A long steep face between a higher flat area and lower ground.'), kt('Ridge', 'A long narrow upland with a crest and slopes falling on both sides.')],
      [],
      table(['Landform', 'Contour pattern'], [['Conical hill', 'Concentric rings'], ['Ridge', 'Elongated loops'], ['Escarpment', 'Bunched line, then wide spacing']], 'Table of three landforms and their contour patterns', IMG),
      [3],
    ),
    sec(
      '6. Triangulated heights, spot heights and relative height',
      `- **Triangulated height:** black triangle with a figure, fixed by survey triangulation on a summit or prominent point (478 m on the hill, 398 m on the ridge).
- **Spot height:** black dot with a figure, measured at ordinary ground to fill gaps between contours.
- Both are in metres above mean sea level.
- **Relative height** = higher height − lower height (for example 262 m − 154 m = 108 m for the escarpment). **Relative depth** is the same difference measured downwards.
- Never add the two heights.`,
      [kt('Triangulated height', 'A height fixed by a survey network and marked by a black triangle on a summit or prominent point.'), kt('Spot height', 'A height of an ordinary point, marked by a black dot and a figure.'), kt('Relative height', 'The difference in height between two points.')],
      [],
      table(['Symbol', 'Meaning'], [['Black triangle and figure', 'Triangulated height'], ['Black dot and figure', 'Spot height']], 'Table of the two height symbols and their meanings', IMG),
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing the northing before the easting.
- Reading tenths from the top right instead of the south-west corner.
- Dividing by the number of lines instead of the number of gaps when finding the contour interval.
- Adding two heights instead of subtracting for relative height.
- Calling a ridge a hill, or forgetting units.

**How marks are usually awarded**
- Grid reference (1 mark each): correct digits in the right order.
- Contour interval or height (1 to 2 marks): value with the unit and the working.
- Landform (2 marks): the name and the contour evidence.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is a topographical sheet?', 'A large-scale map of a small area showing relief, drainage, settlements, communications and land use.', 'definition', 1),
    fc(2, 'Which grid lines are eastings?', 'The vertical lines, numbered west to east.', 'fact', 1),
    fc(3, 'Which grid lines are northings?', 'The horizontal lines, numbered south to north.', 'fact', 1),
    fc(4, 'Size of one grid square at 1 cm to 0.5 km?', '1 km by 1 km, which is 2 cm by 2 cm on the sheet.', 'fact', 1),
    fc(5, 'Order of figures in a grid reference?', 'Easting first, then northing.', 'exam-tip', 1),
    fc(6, 'Which corner of the square gives a four-figure reference?', 'The south-west (bottom-left) corner.', 'concept', 1),
    fc(7, 'Four-figure reference of the temple on the imagined sheet?', '4674.', 'example', 1),
    fc(8, 'Six-figure reference of the temple?', `${M.sixFig(temple.E, temple.N)} (46 and 3 tenths, 74 and 6 tenths).`, 'example', 1),
    fc(9, 'Tenths in a six-figure reference are counted from?', 'The south-west corner of the square, eastwards and northwards.', 'concept', 1),
    fc(10, 'What does a four-figure reference name?', 'A whole 1 km square.', 'definition', 1),
    fc(11, 'What does a six-figure reference name?', 'A point to the nearest 0.1 km.', 'definition', 1),
    fc(12, 'Feature at 468738 on the imagined sheet?', 'The post office at Nandiwadi.', 'example', 1),
    fc(13, 'Define a contour.', 'A line joining places of equal height above mean sea level.', 'definition', 2),
    fc(14, 'Colour of contours on a sheet?', 'Brown.', 'fact', 2),
    fc(15, 'Define contour interval.', 'The constant height difference between neighbouring contours.', 'definition', 2),
    fc(16, 'Contour interval of the imagined sheet?', '20 m.', 'fact', 2),
    fc(17, 'How often are index contours drawn here?', 'Every 100 m (every fifth contour); thicker and labelled.', 'fact', 2),
    fc(18, 'Contour interval from two labelled contours?', 'Height difference divided by the number of gaps (lines between + 1).', 'formula', 2),
    fc(19, 'What do close contours show?', 'A steep slope.', 'concept', 2),
    fc(20, 'What do widely spaced contours show?', 'A gentle slope.', 'concept', 2),
    fc(21, 'Average gradient formula?', 'Height difference ÷ horizontal distance.', 'formula', 2),
    fc(22, 'Contour pattern of a conical hill?', 'Concentric closed contours, steep on all sides.', 'diagram', 3),
    fc(23, 'Contour pattern of a ridge?', 'Long narrow closed contours with a crest in the middle.', 'diagram', 3),
    fc(24, 'Contour pattern of an escarpment?', 'Contours bunched along a line, wide spacing beyond (steep face, flat top).', 'diagram', 3),
    fc(25, 'V-shaped contour bends point to?', 'Higher ground (a valley).', 'concept', 3),
    fc(26, 'Symbol of a triangulated height?', 'A black triangle with a figure.', 'fact', 4),
    fc(27, 'Symbol of a spot height?', 'A black dot with a figure.', 'fact', 4),
    fc(28, 'Relative height formula?', 'Higher height minus lower height.', 'formula', 4),
    fc(29, 'Relative height of the escarpment on the imagined sheet?', '262 m − 154 m = 108 m.', 'example', 4),
    fc(30, 'Heights on a sheet are measured above?', 'Mean sea level.', 'fact', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
