// ICSE 10 Geography ch02 question bank (ICSE 2027 specimen style). Every map item is set on the ONE imagined practice sheet (topo.mjs);
// each answer is computed from the module's coordinates and re-checked by the function passed to add(). Distance is straight-line only; area
// is from complete grid squares only (syllabus removed_topics). MCQ keys are placed by the builder.
import { mk, add, svgV } from './lib.mjs';
import * as T from './topo.mjs';
import { SYM_Q, LINES_Q, SCALE5, DIST1, DIST2, DIST3, AREA_CULT2, AREA_FOREST, AREA_SCRUB, DIR1, DIR2, SHEET, FEAT } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const IMG = 'Imagined practice sheet, not a real place and not a Survey of India sheet';
const fig = (spec, alt) => svgV(spec, `${alt}. ${IMG}`, IMG);
const fSym = fig(SYM_Q, 'Extract of the imagined sheet with the points A, B and C ringed and lettered; names are hidden');
const fLines = fig(LINES_Q, 'Extract of the imagined sheet with the lines K, L, M, N and O ringed and lettered');
const fScale = fig(SCALE5, 'Extract of the imagined sheet with a linear scale bar of 5 km');
const fDist1 = fig(DIST1, 'Extract of the imagined sheet with the police station A and the temple B marked and a scale bar');
const fDist2 = fig(DIST2, 'Extract of the imagined sheet with the dispensary P and a well Q marked and a scale bar');
const fDist3 = fig(DIST3, 'Extract of the imagined sheet with Sonakhedi S and the temple T marked and a scale bar');
const fCult = fig(AREA_CULT2, 'Extract of the imagined sheet, squares 4370 to 4772, yellow cultivated land and a tank');
const fForest = fig(AREA_FOREST, 'Extract of the imagined sheet, squares 4378 to 4679, with green forest');
const fScrub = fig(AREA_SCRUB, 'Extract of the imagined sheet, squares 4074 to 4375, white open scrub');
const fDir1 = fig(DIR1, 'Extract of the imagined sheet with the dispensary D and the temple T marked');
const fDir2 = fig(DIR2, 'Extract of the imagined sheet with Pathrali A and the police station B marked');
const fSheet = fig(SHEET, 'Full imagined practice sheet with its key');
const d = (a, b) => T.dist(FEAT[a], FEAT[b]);
const dir = (a, b) => T.directionOf(FEAT[a], FEAT[b]);
const brg = (a, b) => T.bearing(FEAT[a], FEAT[b]);
const okMargin = (a, b) => T.compassMargin(brg(a, b)) >= 8;
const cultSq = T.fullSquares('cult', { e0: 43, e1: 48, n0: 70, n1: 73 });
const forSq = T.fullSquares('forest', { e0: 43, e1: 47, n0: 78, n1: 80 });
const scrSq = T.fullSquares('scrub', { e0: 40, e1: 44, n0: 74, n1: 76 });

// ================================================================ t01 colours and symbols
add('colour-chk', mcq({
  stem: 'On a topographical sheet, an area tinted yellow shows:',
  right: 'cultivated land',
  wrong: ['forest', 'water', 'a metalled road'],
  sol: 'Yellow is the tint for cultivated land — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('yellow-mcq', mcq({
  stem: 'On the imagined practice sheet, Sonakhedi and Nandiwadi lie on a yellow-tinted plain. This suggests that most of the people there:',
  right: 'farm the land',
  wrong: ['cut timber from dense forest', 'fish in a large lake', 'work in a mine'],
  sol: 'Yellow is cultivated land, so farming is the main occupation — option (@K).',
  d: 2, c: 'application', t: [1], assets: [fSheet],
}));
add('green-mcq', mcq({
  stem: 'On the imagined practice sheet, the conical hill in the north is tinted green. The tint shows:',
  right: 'forest',
  wrong: ['cultivated land', 'a tank', 'uncultivated white land'],
  sol: 'Green is the tint for forest — option (@K).',
  d: 1, c: 'application', t: [1], assets: [fSheet],
}));
add('sym-mcq', mcq({
  stem: 'In the extract, the feature marked C is shown by a circle with a dot. It is a:',
  right: 'well',
  wrong: ['temple', 'post office', 'tank'],
  sol: 'A circle with a dot is the symbol of a well — option (@K).',
  d: 1, c: 'recall', t: [1], assets: [fSym],
}));
add('line-mcq', mcq({
  stem: 'In the extract, the thick red line marked K is a:',
  right: 'metalled road',
  wrong: ['unmetalled road', 'canal', 'footpath'],
  sol: 'A thick red line is a metalled road — option (@K).',
  d: 1, c: 'application', t: [1], assets: [fLines],
}), () => T.LINEAR.find((l) => l.id === 'M1').type === 'metalled' || 'M1');
add('canal-mcq', mcq({
  stem: 'In the extract, the thick blue line marked L runs along a contour and starts at a river. It is a:',
  right: 'canal',
  wrong: ['seasonal stream', 'metalled road', 'cart track'],
  sol: 'A thick blue line that follows a contour and leaves the river is a canal (man-made) — option (@K).',
  d: 2, c: 'application', t: [1], assets: [fLines],
}), () => T.LINEAR.find((l) => l.id === 'K1').type === 'canal' || 'K1');
add('unmet-mcq', mcq({
  stem: 'In the extract, the thick black broken line marked N is a:',
  right: 'unmetalled road',
  wrong: ['metalled road', 'perennial stream', 'embankment'],
  sol: 'A thick black broken line is an unmetalled road — option (@K).',
  d: 2, c: 'application', t: [1], assets: [fLines],
}), () => T.LINEAR.find((l) => l.id === 'U1').type === 'unmetalled' || 'U1');
add('foot-fill', fill({
  stem: 'In the extract, the dotted black line marked M is a ___.',
  acc: [['footpath', 'foot path', 'foot-path']],
  sol: 'A dotted black line is a **footpath**.',
  d: 1, c: 'application', t: [1], assets: [fLines],
}), () => T.LINEAR.find((l) => l.id === 'F1').type === 'foot' || 'F1');
add('colour-fill', fill({
  stem: 'On a topographical sheet, forest is shown by a ___ tint.',
  acc: [['green']],
  sol: '**Green**.',
  d: 1, c: 'recall', t: [1],
}));
add('stream-tf', tf({
  stem: 'A dashed blue line on a topographical sheet shows a perennial stream.',
  key: 'f',
  sol: 'False: a dashed blue line shows a seasonal stream; a continuous blue line is perennial.',
  d: 2, c: 'understanding', t: [1],
}));
add('colour-ar', ar({
  a: 'Cultivated land on the sheet is shown in yellow.',
  r: 'Yellow is the conventional tint for cultivated land.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 1, c: 'understanding', t: [1],
}));
add('colour-match', match({
  marks: 2,
  stem: 'Match each colour in Column A with what it shows on a topographical sheet in Column B.',
  pairs: [['Yellow', 'Cultivated land'], ['Green', 'Forest'], ['Blue', 'Water'], ['Red', 'Metalled road']],
  order: [3, 0, 2, 1],
  sol: 'Yellow: cultivated land. Green: forest. Blue: water. Red: metalled road.',
  d: 1, c: 'recall', t: [1],
}));
add('symbol-match', match({
  marks: 2,
  stem: 'Match each symbol in Column A with the feature it shows in Column B (imagined practice sheet).',
  pairs: [['Dashed blue line', 'Seasonal stream'], ['Thick red line', 'Metalled road'], ['Dotted black line', 'Footpath'], ['Circle with a dot', 'Well']],
  order: [1, 2, 0, 3],
  sol: 'Dashed blue: seasonal stream. Thick red: metalled road. Dotted black: footpath. Circle with a dot: well.',
  d: 1, c: 'recall', t: [1],
}));
add('colour-short2', short({
  marks: 2,
  stem: 'State what the yellow tint and the green tint show on a topographical sheet. Name one place on the imagined practice sheet for each.',
  model: 'Yellow shows cultivated land, for example the southern plain around Sonakhedi and Nandiwadi. Green shows forest, for example the conical hill and the ridge in the north.',
  sol: 'Yellow: cultivated; green: forest; one place each.',
  scheme: [['Yellow: cultivated land, with a place', 1], ['Green: forest, with a place', 1]],
  d: 2, c: 'application', t: [1],
}));
add('road-short2', short({
  marks: 2,
  stem: 'Distinguish between a metalled road and an unmetalled road as shown on the imagined practice sheet.',
  model: 'A metalled road has a hard surface and is shown by a thick red line. An unmetalled road has no hard surface and is shown by a thick black broken line.',
  sol: 'Red thick versus black broken.',
  scheme: [['Metalled: hard surface, red line', 1], ['Unmetalled: unsurfaced, black broken line', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('lines-short3', short({
  marks: 3,
  stem: 'In the extract of the imagined practice sheet, name (a) the line K, (b) the line L and (c) the line M, and give the colour or style that identifies each.',
  model: '(a) K is a metalled road: a thick red line. (b) L is a canal: a thick blue line that follows a contour. (c) M is a footpath: a dotted black line.',
  sol: 'Metalled road; canal; footpath.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [1], assets: [fLines],
}));

// ================================================================ t02 scale
add('rf-chk', mcq({
  stem: 'A map has a statement scale of 1 cm to 0.5 km. Its representative fraction is:',
  right: '1 : 50 000',
  wrong: ['1 : 5 000', '1 : 500 000', '1 : 0.5'],
  sol: '0.5 km = 50 000 cm, so 1 cm to 50 000 cm: 1 : 50 000 — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('scaletype-chk', mcq({
  stem: 'A scale drawn as a bar divided into equal parts and marked in kilometres is a:',
  right: 'linear scale',
  wrong: ['statement scale', 'representative fraction', 'compass scale'],
  sol: 'A bar marked in ground distances is a linear scale — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('rf-mcq', mcq({
  stem: 'A sheet has a scale of 2 cm to 1 km. Its representative fraction is:',
  right: '1 : 50 000',
  wrong: ['1 : 20 000', '1 : 100 000', '1 : 200 000'],
  sol: '1 km = 100 000 cm, so 2 cm stand for 100 000 cm: 1 cm stands for 50 000 cm — option (@K).',
  d: 2, c: 'application', t: [2],
}), () => 100000 / 2 === 50000 || 'rf');
add('stm-mcq', mcq({
  stem: 'A map has an RF of 1 : 100 000. Its statement scale is:',
  right: '1 cm to 1 km',
  wrong: ['1 cm to 0.1 km', '1 cm to 10 km', '1 cm to 100 km'],
  sol: '100 000 cm = 1 km, so 1 cm to 1 km — option (@K).',
  d: 2, c: 'application', t: [2],
}), () => 100000 / 100000 === 1 || 'stm');
add('barscale-mcq', mcq({
  stem: 'On the extract, a straight line measured against the bar (the linear scale) is exactly as long as three black and white blocks. The ground distance is:',
  right: '3 km',
  wrong: ['1.5 km', '6 km', '0.3 km'],
  sol: 'Each block of the bar stands for 1 km, so three blocks stand for 3 km — option (@K).',
  d: 2, c: 'application', t: [2], assets: [fScale],
}));
add('rf-tf', tf({
  stem: 'A representative fraction such as 1 : 50 000 is written without any units.',
  key: 't',
  sol: 'True: it is a pure ratio.',
  d: 1, c: 'recall', t: [2],
}));
add('lin-tf', tf({
  stem: 'A linear scale remains correct if the map is photocopied at a smaller size.',
  key: 't',
  sol: 'True: the bar shrinks with the map, so it still shows the right ground distance.',
  d: 2, c: 'understanding', t: [2],
}));
add('scale-fill', fill({
  stem: 'The scale 1 cm to 0.5 km has the representative fraction 1 : ___.',
  acc: [['50000', '50 000', '50,000']],
  sol: '0.5 km = 50 000 cm, so **50 000**.',
  d: 2, c: 'application', t: [2],
}), () => 0.5 * 100000 === 50000 || 'rf');
add('scale-ar', ar({
  a: 'An RF of 1 : 50 000 means that 1 cm on the map stands for 50 000 cm on the ground.',
  r: 'A representative fraction is always written with units, such as 1 cm : 50 000 cm.',
  key: 'c',
  sol: 'A is true. R is false: an RF is a ratio without units — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('scale-num', num({
  stem: 'On a sheet with a scale of 1 cm to 0.5 km, a path measures 8 cm. What is its length on the ground in km?',
  value: 4, tol: 0, unit: 'km',
  sol: '8 × 0.5 = 4 km.',
  scheme: [['4 km', 1]],
  d: 1, c: 'application', t: [2, 3],
}), () => T.cmToKm(8) === 4 || 'cm');
add('sh2-rf', short({
  marks: 2,
  stem: 'A map has a scale of 1 cm to 2 km. Convert it to a representative fraction.',
  model: '2 km = 2 × 100 000 = 200 000 cm, so 1 cm stands for 200 000 cm: RF = 1 : 200 000.',
  sol: '1 : 200 000.',
  scheme: [['2 km = 200 000 cm', 1], ['RF 1 : 200 000', 1]],
  d: 2, c: 'application', t: [2],
}), () => 2 * 100000 === 200000 || 'rf');
add('sh2-lin', short({
  marks: 2,
  stem: 'Name the three types of scale used on a topographical sheet and state one advantage of the linear scale.',
  model: 'The statement scale, the representative fraction and the linear scale. A linear scale stays correct when the map is enlarged or reduced, and it can be used directly with a strip of paper.',
  sol: 'Three types; advantage.',
  scheme: [['Three types named', 1], ['One advantage', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('sym-short1', short({
  marks: 1,
  stem: 'Name the feature shown by a circle with a dot in the middle on the imagined practice sheet.',
  model: 'A well.',
  sol: 'A well.',
  scheme: [['Well', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('rf-short1', short({
  marks: 1,
  stem: 'State the representative fraction of the imagined practice sheet.',
  model: '1 : 50 000.',
  sol: '1 : 50 000.',
  scheme: [['1 : 50 000', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('scale-short3', short({
  marks: 3,
  stem: 'The imagined practice sheet has the scale 1 cm to 0.5 km. (a) Name this type of scale. (b) Convert it to a representative fraction. (c) State the length in cm of one grid square on a printed sheet.',
  model: '(a) A statement scale. (b) 0.5 km = 50 000 cm, so the RF is 1 : 50 000. (c) One grid square is 1 km, which is 2 cm on the sheet.',
  sol: 'Statement scale; 1 : 50 000; 2 cm.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [2],
}), () => T.kmToCm(1) === 2 || 'cm');

// ================================================================ t03 distance
add('dist-chk', mcq({
  stem: 'On a sheet with a scale of 1 cm to 0.5 km, two places are 6 cm apart in a straight line. The ground distance is:',
  right: '3 km',
  wrong: ['6 km', '12 km', '0.3 km'],
  sol: '6 × 0.5 = 3 km — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('dist-mcq', mcq({
  stem: 'Using the linear scale, the straight-line distance from the dispensary P to the well Q in the extract is closest to:',
  right: '4 km',
  wrong: ['2 km', '3 km', '8 km'],
  sol: `The two points are ${(FEAT.well2.E - FEAT.disp1.E).toFixed(2)} km east and ${(FEAT.well2.N - FEAT.disp1.N).toFixed(2)} km north apart: distance ${d('disp1', 'well2').toFixed(2)} km, about 4 km — option (@K).`,
  d: 3, c: 'application', t: [3], assets: [fDist2],
}), () => Math.abs(d('disp1', 'well2') - 3.85) < 0.01 || 'dist');
add('dist2-mcq', mcq({
  stem: 'In the extract, S is the centre of Sonakhedi and T is the temple. The straight-line distance between them is closest to:',
  right: '4 km',
  wrong: ['2 km', '6 km', '8 km'],
  sol: `S and T are 3.25 km east and 2.25 km north apart: distance ${d('sonakhedi', 'temple1').toFixed(2)} km, about 4 km — option (@K).`,
  d: 3, c: 'application', t: [3], assets: [fDist3],
}), () => Math.abs(d('sonakhedi', 'temple1') - 3.95) < 0.01 || 'dist');
add('dist-num', num({
  stem: 'On a printed sheet of the imagined practice sheet the police station and the temple measure 1.8 cm apart in a straight line. Find the ground distance in km.',
  value: 0.9, tol: 0.05, unit: 'km',
  sol: '1.8 × 0.5 = 0.9 km.',
  scheme: [['0.9 km', 1]],
  d: 1, c: 'application', t: [3],
}), () => Math.abs(d('ps1', 'temple1') - 0.9) < 0.05 && Math.abs(T.kmToCm(d('ps1', 'temple1')) - 1.8) < 0.1 || 'dist');
add('grid-num', num({
  stem: 'Two features differ by 3.0 km in easting and 4.0 km in northing. Calculate the straight-line distance between them in km.',
  value: 5, tol: 0, unit: 'km',
  sol: 'Distance = √(3² + 4²) = √25 = 5 km.',
  scheme: [['5 km', 1]],
  d: 2, c: 'application', t: [3],
}), () => Math.hypot(3, 4) === 5 || 'dist');
add('cm-num', num({
  stem: `On the imagined practice sheet the centre of Sonakhedi and the temple are ${d('sonakhedi', 'temple1').toFixed(2)} km apart on the ground. How many cm apart are they on a printed sheet? Give your answer to 1 decimal place.`,
  value: 7.9, tol: 0.05, unit: 'cm',
  sol: `${d('sonakhedi', 'temple1').toFixed(2)} km ÷ 0.5 km per cm = 7.9 cm.`,
  scheme: [['7.9 cm', 1]],
  d: 2, c: 'application', t: [3],
}), () => Math.abs(T.kmToCm(d('sonakhedi', 'temple1')) - 7.9) < 0.05 || 'cm');
add('dist-fill', fill({
  stem: 'A straight line of 5.0 cm on a sheet with a scale of 1 cm to 0.5 km stands for ___ km on the ground.',
  acc: [['2.5', '2.50']],
  sol: '5.0 × 0.5 = **2.5** km.',
  d: 1, c: 'understanding', t: [3],
}), () => T.cmToKm(5) === 2.5 || 'cm');
add('dist-ar', ar({
  a: 'In this course, the distance between two places on a sheet is measured along the road that joins them.',
  r: 'Only the direct, straight-line distance between two places is measured on the sheet.',
  key: 'd',
  sol: 'A is false: only the straight-line distance is measured. R is true — option (d).',
  d: 2, c: 'understanding', t: [3],
}));
add('dist-short2', short({
  marks: 2,
  stem: 'Describe how you would find the direct distance between two villages on a printed sheet with a scale of 1 cm to 0.5 km.',
  model: 'Join the two villages with a straight line and measure it in cm with a ruler (or mark it on a paper strip and lay it on the linear scale). Multiply the length in cm by 0.5 to get the distance in km.',
  sol: 'Straight line; measure; multiply by 0.5.',
  scheme: [['Measure the straight line', 1], ['Multiply by the scale', 1]],
  d: 2, c: 'application', t: [3],
}));
add('dist-short3', short({
  marks: 3,
  stem: 'In the extract, A is the police station and B is the temple, measured 1.8 cm apart on the printed sheet. (a) Calculate the ground distance. (b) State the direction of B from A. (c) Name the type of distance measured.',
  model: `(a) 1.8 × 0.5 = 0.9 km. (b) ${dir('ps1', 'temple1')}. (c) The direct (straight-line) distance.`,
  sol: `0.9 km; ${dir('ps1', 'temple1')}; straight-line.`,
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [3, 5], assets: [fDist1],
}), () => dir('ps1', 'temple1') === 'north' && okMargin('ps1', 'temple1') || 'dir');

// ================================================================ t04 area (complete squares only)
add('area-chk', mcq({
  stem: 'A region covers 12 complete grid squares of 1 km by 1 km. Its area is:',
  right: '12 sq km',
  wrong: ['12 km', '24 sq km', '6 sq km'],
  sol: 'Each complete square is 1 sq km, so 12 sq km — option (@K).',
  d: 1, c: 'application', t: [4],
}));
add('area-mcq', mcq({
  stem: 'In the extract, the yellow cultivated land completely fills the block between eastings 43 and 48 and northings 70 and 73 (the tank and the tinted edges are ignored). The area of this block of full squares is:',
  right: '15 sq km',
  wrong: ['8 sq km', '10 sq km', '30 sq km'],
  sol: 'The block is 5 squares wide and 3 squares high: 5 × 3 = 15 full squares, so 15 sq km — option (@K).',
  d: 2, c: 'application', t: [4], assets: [fCult],
}), () => cultSq.length === 15 || `cult ${cultSq.length}`);
add('area2-mcq', mcq({
  stem: 'In the extract, count the squares that are wholly green (forest) between eastings 43 and 47 and northings 78 and 80. The forest area is:',
  right: '6 sq km',
  wrong: ['4 sq km', '8 sq km', '12 sq km'],
  sol: `The wholly green squares are ${forSq.join(', ')}: 6 full squares, so 6 sq km — option (@K).`,
  d: 3, c: 'application', t: [4], assets: [fForest],
}), () => forSq.length === 6 || `forest ${forSq.length}`);
add('area-num', num({
  stem: 'In the extract of the imagined practice sheet, the open scrub (white) fills the block between eastings 40 and 44 and northings 74 and 76. Calculate its area in sq km from the complete squares.',
  value: 8, tol: 0, unit: 'sq km',
  sol: `The block is 4 squares wide and 2 high: 4 × 2 = 8 sq km (full squares ${scrSq.join(', ')}).`,
  scheme: [['8 sq km', 1]],
  d: 2, c: 'application', t: [4], assets: [fScrub],
}), () => scrSq.length === 8 || `scrub ${scrSq.length}`);
add('area-tf', tf({
  stem: 'A grid square that is only half covered by a forest is counted as half a square kilometre when finding area.',
  key: 'f',
  sol: 'False: only complete squares are counted in this course.',
  d: 2, c: 'understanding', t: [4],
}));
add('area-fill', fill({
  stem: 'A region that covers 9 complete grid squares has an area of ___ sq km.',
  acc: [['9']],
  sol: '**9** sq km.',
  d: 1, c: 'understanding', t: [4],
}));
add('area-ar', ar({
  a: 'Each complete grid square of the sheet stands for an area of 1 sq km on the ground.',
  r: 'The eastings of the sheet are numbered from west to east.',
  key: 'b',
  sol: 'Both statements are true, but the way the eastings are numbered does not explain the area of a square — option (b).',
  d: 2, c: 'understanding', t: [4],
}));
add('area-short2', short({
  marks: 2,
  stem: 'A block of forest fills 4 complete squares from west to east and 3 complete squares from south to north on the imagined practice sheet. Calculate its area and state the rule you used.',
  model: 'Area = 4 × 3 = 12 sq km. Only complete 1 km squares are counted, and each stands for 1 sq km.',
  sol: '12 sq km; count complete squares.',
  scheme: [['12 sq km', 1], ['Rule: count complete squares only', 1]],
  d: 2, c: 'application', t: [4],
}));
add('area-short3', short({
  marks: 3,
  stem: 'In the extract of the imagined practice sheet, the white open scrub fills the block between eastings 40 and 44 and northings 74 and 76. (a) State what the white colour shows. (b) Calculate the area of the block from its complete squares. (c) Name the unit of the answer.',
  model: `(a) White shows uncultivated land (open scrub). (b) ${scrSq.length} complete squares, so ${scrSq.length} sq km. (c) Square kilometres (sq km).`,
  sol: 'Uncultivated land; 8 sq km; sq km.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [1, 4], assets: [fScrub],
}), () => scrSq.length === 8 || 'scrub');

// ================================================================ t05 direction
add('dir-chk', mcq({
  stem: 'If a village A lies to the north-west of a village B, then B lies to the ___ of A.',
  right: 'south-east',
  wrong: ['north-east', 'south-west', 'north-west'],
  sol: 'The reverse of north-west is south-east — option (@K).',
  d: 1, c: 'understanding', t: [5],
}));
add('dir-mcq', mcq({
  stem: 'In the extract, the direction of the temple T from the dispensary D is:',
  right: 'north-east',
  wrong: ['north-west', 'south-east', 'east'],
  sol: `The temple is 3.2 km east and 2.0 km north of D, bearing ${Math.round(brg('disp1', 'temple1'))} degrees: north-east — option (@K).`,
  d: 2, c: 'application', t: [5], assets: [fDir1],
}), () => dir('disp1', 'temple1') === 'north-east' && okMargin('disp1', 'temple1') || 'dir');
add('dir2-mcq', mcq({
  stem: 'In the extract, B is the police station and A is the centre of Pathrali. The direction of B from A is:',
  right: 'south-east',
  wrong: ['north-east', 'south-west', 'south'],
  sol: `B is 1.7 km east and 1.3 km south of A, bearing ${Math.round(brg('pathrali', 'ps1'))} degrees: south-east — option (@K).`,
  d: 2, c: 'application', t: [5], assets: [fDir2],
}), () => dir('pathrali', 'ps1') === 'south-east' && okMargin('pathrali', 'ps1') || 'dir');
add('rev-mcq', mcq({
  stem: 'The temple is north-east of the dispensary on the imagined practice sheet. So the dispensary is ___ of the temple.',
  right: 'south-west',
  wrong: ['south-east', 'north-west', 'south'],
  sol: 'Reverse north-east to get south-west — option (@K).',
  d: 2, c: 'application', t: [5],
}), () => dir('temple1', 'disp1') === 'south-west' || 'rev');
add('north-tf', tf({
  stem: 'On a topographical sheet, north is normally at the top of the sheet unless an arrow shows otherwise.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [5],
}));
add('dir-fill', fill({
  stem: 'The direction opposite to south-east is ___.',
  acc: [['north-west', 'north west', 'northwest']],
  sol: '**North-west**.',
  d: 1, c: 'recall', t: [5],
}));
add('dir-ar', ar({
  a: 'If B lies to the north-east of A, then A lies to the south-west of B.',
  r: 'Reversing the two places reverses the direction to the opposite compass point.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [5],
}));
add('dir-short2', short({
  marks: 2,
  stem: 'State the direction of the temple from the police station on the imagined practice sheet, and the direction of the police station from the temple.',
  model: `The temple is to the ${dir('ps1', 'temple1')} of the police station, so the police station is to the ${dir('temple1', 'ps1')} of the temple.`,
  sol: 'North and south.',
  scheme: [['Temple from police station: north', 1], ['Police station from temple: south', 1]],
  d: 2, c: 'application', t: [5],
}), () => dir('ps1', 'temple1') === 'north' && dir('temple1', 'ps1') === 'south' || 'dir');
add('dir-short3', short({
  marks: 3,
  stem: 'In the extract, A is the centre of Pathrali and B is the police station. (a) State the direction of B from A. (b) State the direction of A from B. (c) Calculate the straight-line distance from the grid differences of 1.7 km east and 1.3 km south, to 1 decimal place.',
  model: `(a) South-east. (b) North-west. (c) √(1.7² + 1.3²) = √4.58 = ${d('pathrali', 'ps1').toFixed(1)} km.`,
  sol: 'South-east; north-west; 2.1 km.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [3, 5], assets: [fDir2],
}), () => dir('pathrali', 'ps1') === 'south-east' && dir('ps1', 'pathrali') === 'north-west' && Math.abs(Math.hypot(1.7, 1.3) - 2.14) < 0.01 || 'dir');

// ================================================================ 10-mark structured questions
add('long-dist', long({
  stem: 'Study the extract of the imagined practice sheet in which S is the centre of Sonakhedi and T is the temple. (a) State the scale of the sheet as a representative fraction. [2]\n\n(b) S and T are 7.9 cm apart on a printed sheet. Calculate the ground distance. [2]\n\n(c) Check your answer from the grid, given that T is 3.25 km east and 2.25 km north of S. [3]\n\n(d) State the direction of T from S and name the type of distance you measured. [3]',
  model: `(a) 1 cm to 0.5 km: 0.5 km = 50 000 cm, so the RF is 1 : 50 000.\n\n(b) 7.9 × 0.5 = 3.95 km, about 4 km.\n\n(c) Distance = √(3.25² + 2.25²) = √15.63 = ${d('sonakhedi', 'temple1').toFixed(2)} km, which agrees with part (b).\n\n(d) T lies to the north-east of S. The distance measured is the direct (straight-line) distance.`,
  sol: 'RF; 3.95 km; check 3.95 km; north-east and straight-line.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 3, c: 'application', t: [2, 3, 5], assets: [fDist3],
}), () => Math.abs(d('sonakhedi', 'temple1') - 3.95) < 0.01 && dir('sonakhedi', 'temple1') === 'north-east' || 'dist');
add('long-area', long({
  stem: 'Study the extracts of the imagined practice sheet that show the cultivated land (yellow) in the south and the open scrub (white) in the west. (a) State what the yellow and white tints show. [2]\n\n(b) Calculate the area of the yellow block between eastings 43 and 48 and northings 70 and 73, from its complete squares. [2]\n\n(c) Calculate the area of the white block between eastings 40 and 44 and northings 74 and 76, and say how much larger the yellow block is. [3]\n\n(d) Explain why only complete squares are counted and give the unit of your answers. [3]',
  model: `(a) Yellow shows cultivated land; white shows uncultivated land (open scrub).\n\n(b) 5 squares by 3 squares: ${cultSq.length} sq km.\n\n(c) 4 squares by 2 squares: ${scrSq.length} sq km. The yellow block is ${cultSq.length} − ${scrSq.length} = ${cultSq.length - scrSq.length} sq km larger.\n\n(d) Each complete square stands for exactly 1 sq km, so counting complete squares gives a clear whole number; part squares are not counted in this course. The unit is the square kilometre (sq km).`,
  sol: 'Cultivated and uncultivated; 15 sq km; 8 sq km and 7 sq km larger; rule and unit.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 3, c: 'application', t: [1, 4], assets: [fCult, fScrub],
}), () => cultSq.length === 15 && scrSq.length === 8 || 'area');
add('long-colour', long({
  stem: 'Study the extract of the imagined practice sheet in which the lines K, L, M and N are marked, and the full sheet with its key. (a) Name the features shown by K and L. [2]\n\n(b) Name M and N and describe the symbol of each. [2]\n\n(c) State the meaning of the yellow, green and blue colours on the sheet. [3]\n\n(d) Explain why you should always read the key before answering a map question. [3]',
  model: '(a) K is a metalled road and L is a canal.\n\n(b) M is a footpath, a dotted black line; N is an unmetalled road, a thick black broken line.\n\n(c) Yellow shows cultivated land, green shows forest and blue shows water (streams, canal, tank).\n\n(d) The key lists every symbol and tint used on that sheet and its meaning, so reading it prevents wrong identification; symbols can differ between sheets, and the key is the final authority.',
  sol: 'Road and canal; footpath and unmetalled road; three colours; key explains symbols.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 2, c: 'application', t: [1], assets: [fLines, fSheet],
}));
add('long-dir', long({
  stem: 'Study the extracts of the imagined practice sheet. In the first, D is the dispensary and T is the temple; in the second, A is the centre of Pathrali and B is the police station. (a) State the direction of T from D. [2]\n\n(b) State the direction of D from T. [2]\n\n(c) Calculate the straight-line distance from D to T, given 3.2 km east and 2.0 km north, to 1 decimal place. [3]\n\n(d) State the direction of B from A and its reverse, and explain how the two are related. [3]',
  model: `(a) North-east.\n\n(b) South-west.\n\n(c) √(3.2² + 2.0²) = √14.24 = ${d('disp1', 'temple1').toFixed(1)} km.\n\n(d) B is to the south-east of A, and A is to the north-west of B. Reversing the two places reverses the direction to the opposite compass point.`,
  sol: 'North-east; south-west; 3.8 km; south-east and north-west.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 3, c: 'analysis', t: [3, 5], assets: [fDir1, fDir2],
}), () => dir('disp1', 'temple1') === 'north-east' && Math.abs(Math.hypot(3.2, 2.0) - 3.77) < 0.01 && dir('pathrali', 'ps1') === 'south-east' || 'dir');
add('long-scale', long({
  stem: 'A student studies the imagined practice sheet, whose scale is 1 cm to 0.5 km. (a) Name the three types of scale and give the form of each for this sheet. [2]\n\n(b) Another sheet has an RF of 1 : 25 000. Write its statement scale. [2]\n\n(c) Using the linear-scale extract, a straight line of 4 blocks of the bar is drawn. State the ground distance and the length in cm on a printed sheet. [3]\n\n(d) Explain which of the two sheets, 1 : 50 000 or 1 : 25 000, shows more detail and give a reason. [3]',
  model: '(a) Statement scale: 1 cm to 0.5 km. Representative fraction: 1 : 50 000. Linear scale: a bar marked in km.\n\n(b) 25 000 cm = 250 m = 0.25 km, so 1 cm to 0.25 km.\n\n(c) Each block is 1 km, so four blocks are 4 km; on a printed sheet 4 ÷ 0.5 = 8 cm.\n\n(d) The 1 : 25 000 sheet is the larger scale: 1 cm stands for a smaller ground distance (0.25 km), so the same area occupies more paper and can show more detail.',
  sol: 'Three scales; 1 cm to 0.25 km; 4 km and 8 cm; larger scale shows more detail.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 4, c: 'analysis', t: [2, 3], assets: [fScale],
}), () => 25000 / 100000 === 0.25 && T.kmToCm(4) === 8 || 'scale');
