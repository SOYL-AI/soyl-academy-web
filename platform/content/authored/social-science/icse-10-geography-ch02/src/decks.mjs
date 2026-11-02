// ICSE 10 Geography ch02 Topographical Maps: Colours, Symbols, Scale, Distance and Direction. Two decks on the ONE imagined practice sheet
// (topo.mjs). Part 1: colour tints, conventional symbols, the three kinds of scale and conversions. Part 2: straight-line distance, area from
// full grid squares only, and direction with the eight compass points. Straight-line distance only; area from complete squares only
// (syllabus removed_topics). Every number is computed from the module and asserted with fact().
import { sl, deck, table, flow, svgV } from './lib.mjs';
import * as T from './topo.mjs';
import { SHEET, SYMBOLS, LINES, SCALE5, DIST1, DIST3, AREA_CULT, AREA_FOREST, DIR1, ROSE, FEAT, fact } from './svgs.mjs';

const IMG = 'Imagined practice sheet, not a real place and not a Survey of India sheet';
const km1 = (a, b) => T.round1(T.dist(FEAT[a], FEAT[b]));
const deg = (a, b) => Math.round(T.bearing(FEAT[a], FEAT[b]));
const dirw = (a, b) => T.directionOf(FEAT[a], FEAT[b]);

// scale facts
fact(T.KM_PER_CM * 100000 === 50000 && T.RF_DENOM === 50000, 'deck1: 1 cm to 0.5 km is 50 000 cm to 1 cm, so the RF is 1 : 50 000');
fact(100000 / 2 === 50000 && 25000 / 100000 === 0.25 && 100000 / 100000 === 1, 'deck1: 2 cm to 1 km is an RF of 1 : 50 000; 1 : 25 000 is 1 cm to 0.25 km');
fact(T.kmToCm(5) === 10 && T.cmToKm(7.2) === 3.6, 'deck1: 5 km is 10 cm; 7.2 cm is 3.6 km');
// colour shares
const lc = { cult: 0, scrub: 0, forest: 0, water: 0 };
for (const e of Array.from({ length: 10 }, (_, i) => 40 + i)) for (const n of Array.from({ length: 10 }, (_, i) => 70 + i)) { const m = T.landMix(`${e}${n}`); for (const k of Object.keys(lc)) lc[k] += m[k]; }
const pc = (k) => Math.round(lc[k] / 100);
fact(pc('cult') === 45 && pc('scrub') === 33 && pc('forest') === 22, `deck1: land-use shares by area are cultivated ${pc('cult')} percent, open scrub ${pc('scrub')} percent, forest ${pc('forest')} percent`);
// distance, area, direction
fact(km1('ps1', 'temple1') === 0.9 && Math.round(T.kmToCm(T.dist(FEAT.ps1, FEAT.temple1)) * 10) / 10 === 1.8, `deck2: police station to temple is ${km1('ps1', 'temple1')} km (1.8 cm on the sheet)`);
fact(km1('sonakhedi', 'temple1') === 4 && dirw('sonakhedi', 'temple1') === 'north-east', `deck2: Sonakhedi to the temple is ${T.dist(FEAT.sonakhedi, FEAT.temple1).toFixed(2)} km, about 4 km, to the north-east`);
const cultSq = T.fullSquares('cult', { e0: 45, e1: 48, n0: 73, n1: 76 });
const forSq = T.fullSquares('forest', { e0: 43, e1: 47, n0: 78, n1: 80 });
fact(cultSq.length === 9 && forSq.length === 6, `deck2: full cultivated squares in E45-48, N73-76: ${cultSq.length}; full forest squares in E43-47, N78-80: ${forSq.length}`);
fact(deg('disp1', 'temple1') === 58 && dirw('disp1', 'temple1') === 'north-east' && dirw('temple1', 'disp1') === 'south-west', 'deck2: the temple lies north-east of the dispensary (bearing 58 degrees); the dispensary lies south-west of the temple');
fact(T.compassMargin(T.bearing(FEAT.ps1, FEAT.temple1)) > 8 && T.compassMargin(T.bearing(FEAT.disp1, FEAT.temple1)) > 8, 'deck2: the direction examples are not close to a boundary between two compass points (margin over 8 degrees)');

const V = {
  sheet: svgV(SHEET, `Full imagined practice sheet with its key. ${IMG}.`, IMG),
  symbols: svgV(SYMBOLS, 'Extract of the imagined practice sheet with labelled symbols: temple, huts of Nandiwadi, police station, post office, well, a river, a canal and a footpath', IMG),
  lines: svgV(LINES, 'Extract of the imagined practice sheet showing a metalled road with a bridge, an unmetalled road, cart track, footpaths, a river, a canal and a seasonal stream', IMG),
  scale: svgV(SCALE5, 'Extract of the imagined practice sheet with a linear scale bar of five kilometres under the grid', IMG),
  dist1: svgV(DIST1, 'Extract of the imagined practice sheet with the police station marked A and the temple marked B and a linear scale bar', IMG),
  dist3: svgV(DIST3, 'Extract of the imagined practice sheet with Sonakhedi marked S and the temple marked T and a linear scale bar', IMG),
  cult: svgV(AREA_CULT, 'Extract of the imagined practice sheet, squares 4573 to 4775, all covered by yellow cultivated land', IMG),
  forest: svgV(AREA_FOREST, 'Extract of the imagined practice sheet, squares 4378 to 4679, with green forest', IMG),
  dir1: svgV(DIR1, 'Extract of the imagined practice sheet with the dispensary marked D and the temple marked T', IMG),
  rose: svgV(ROSE, 'Compass rose with the eight points and their bearings in degrees', 'Compass rose'),
};

export const deck1 = deck({
  part: 1,
  title: 'Topographical Maps: Colours, Symbols, Scale, Distance and Direction, Part 1: Colours, symbols and scale',
  goals: [
    'State what each colour tint on a topographical sheet shows',
    'Recognise the common conventional symbols for settlements, water, roads and tracks',
    'Name the three types of scale and convert a statement scale to a representative fraction and back',
  ],
  slides: [
    sl('title', 'The language of a topographical sheet', {
      b: 'A topographical sheet carries a lot of information in a small space, so the survey uses **colours** and **symbols** that mean the same thing on every sheet. A **scale** tells you how the map shrinks the ground. This chapter uses the **imagined practice sheet** (not a real place, not a Survey of India sheet) to learn all three.',
      v: table(['Idea', 'What it tells you'], [['Colour tint', 'The kind of land or feature'], ['Symbol', 'A single object, such as a well or a road'], ['Scale', 'How far the ground distance is for each map distance']], 'Table of three ideas of the chapter: colour, symbol and scale', IMG),
      n: 'A topographical sheet packs a lot of information into a small space. It does this with colours, with symbols and with a scale. The colours and symbols mean the same thing on every sheet. The scale tells you how the ground has been shrunk to fit on paper. In this chapter we use our imagined practice sheet to learn all three.',
    }),
    sl('concept', 'Colour tints and what they show', {
      b: `By the usual convention: **yellow** is **cultivated land**, **green** is **forest** (and orchards), **white** is **uncultivated** land such as open scrub or barren ground, **blue** is **water** (streams, tanks, canals), **brown** is **relief** (contours), **black** is man-made features such as huts, tracks and names, and **red** is used for **metalled roads**. On the imagined sheet by area: cultivated ${pc('cult')}%, open scrub ${pc('scrub')}%, forest ${pc('forest')}%.`,
      v: table(['Colour', 'Shows', 'Example on the imagined sheet'], [['Yellow', 'Cultivated land', `Southern plain (about ${pc('cult')}% of the sheet)`], ['Green', 'Forest', 'The conical hill and the ridge'], ['White', 'Uncultivated land, open scrub', 'North-west and the plateau top'], ['Blue', 'Water', 'River, streams, canal, tank'], ['Brown', 'Contours and relief', 'Hill, ridge, escarpment'], ['Black', 'Huts, tracks, names', 'Villages and footpaths'], ['Red', 'Metalled roads', 'The east-west road']], 'Table of seven colours on the sheet, what each shows and an example from the imagined sheet', IMG),
      n: 'Each colour has a job. Yellow shows cultivated land. Green shows forest. White shows land that is not farmed, such as open scrub. Blue is for water, brown is for contours, black is for huts, tracks and names, and red is for metalled roads. On our imagined sheet nearly half the area is yellow, a third is white and about a fifth is green.',
    }),
    sl('diagram', 'Reading the key of the sheet', {
      b: 'Every sheet has a **key** (legend) that lists its symbols. Always check the key before you answer. The key of the imagined practice sheet is printed below the map. It shows the line symbols, the point symbols and the colour tints used on this sheet.',
      v: V.sheet,
      n: 'Every sheet comes with a key. It lists every symbol and tint used on that sheet. Before you answer any question, find the symbol in the key and read what it means. Here the key is printed below our imagined sheet. It shows the lines, the points and the colours that we use in this chapter.',
    }),
    sl('concept', 'Point symbols: settlements, services and water', {
      b: '**Huts** are small black squares: close together they form a **settlement**, scattered they are **dispersed huts**. A **temple** is a small flag on a square, a **well** is a circle with a dot, and a **tank** is a blue shape. **PO** marks a post office, **PS** a police station and **Dis** a dispensary. Black **triangles** and **dots** with figures are triangulated and spot heights.',
      v: V.symbols,
      n: 'Now the point symbols. Small black squares are huts. Close together they make a village, and scattered they are dispersed huts. A temple is a flag on a small square, and a well is a circle with a dot. The letters PO, PS and Dis stand for post office, police station and dispensary. A tank, which is a small lake, is drawn in blue.',
    }),
    sl('check', 'Quick check: colours', {
      b: 'Match a colour tint to what it shows.',
      n: 'Quick check. Yellow tint is cultivated land and green tint is forest.',
      chk: 'colour-chk',
    }),
    sl('concept', 'Line symbols: roads, tracks, streams and canals', {
      b: '**Roads:** a **metalled road** is a thick **red** line; an **unmetalled road** is a thick black broken line; a **cart track** is a thin black line; a **pack track** is a thin broken line; a **footpath** is a dotted line. **Water lines:** a **perennial stream** is a continuous blue line, a **seasonal stream** is a **dashed** blue line, a **canal** is a thick blue line that follows a contour. A short thick bar across a river on a road is a **bridge**.',
      v: V.lines,
      n: 'Line symbols come next. A metalled road is thick and red. An unmetalled road is thick, black and broken. A cart track is a thin black line, a pack track is thin and broken, and a footpath is a line of dots. In blue, a stream that flows all year is a solid line, a seasonal stream is dashed, and a canal is a thick line that follows a contour. A short bar across a river is a bridge.',
    }),
    sl('example', 'Worked example: naming features from symbols', {
      b: '**Problem.** In the extract, name (a) the thick red line, (b) the dashed blue line, (c) the dotted black line, (d) the black square with a flag.\n\n**(a)** Metalled road (red, thick).\n\n**(b)** Seasonal stream (blue, dashed): it carries water only in the rains.\n\n**(c)** Footpath (black dots).\n\n**(d)** Temple (flag on a square).',
      v: table(['Symbol in the extract', 'Feature', 'Colour or style'], [['Thick red line', 'Metalled road', 'Red, continuous'], ['Dashed blue line', 'Seasonal stream', 'Blue, dashed'], ['Dotted black line', 'Footpath', 'Black dots'], ['Flag on a square', 'Temple', 'Black']], 'Table of four symbols from the extract with the feature each shows', IMG),
      n: 'Let us name some features. A thick red line is a metalled road. A dashed blue line is a seasonal stream, which carries water only in the rains. A dotted black line is a footpath. A small flag on a black square is a temple. For each one, quote the symbol and then say what it means.',
    }),
    sl('concept', 'Three kinds of scale', {
      b: `The **scale** of a map is the relation between a distance on the map and the same distance on the ground. There are three ways to state it. **Statement scale:** in words, such as **1 cm to 0.5 km**. **Representative fraction (RF):** a ratio with no units, **1 : 50 000**. **Linear scale:** a **bar** divided into km (and tenths) that you can measure against. The imagined sheet uses all three, and one grid square (1 km) is **2 cm** on a printed sheet.`,
      v: table(['Type', 'Form', 'On the imagined sheet'], [['Statement scale', 'Words', '1 cm to 0.5 km'], ['Representative fraction', 'Ratio, no units', '1 : 50 000'], ['Linear scale', 'A bar marked in km', 'The bar below the map']], 'Table of the three types of scale and how each appears on the imagined sheet', IMG),
      n: 'A scale tells you how the ground has been shrunk. There are three ways to give it. A statement scale uses words, like one centimetre to half a kilometre. A representative fraction is a ratio with no units, like one to fifty thousand. A linear scale is a bar marked in kilometres that you can measure against. Our imagined sheet shows all three.',
    }),
    sl('example', 'Worked example: statement scale to representative fraction', {
      b: '**Problem.** Convert the statement scale **1 cm to 0.5 km** to a representative fraction.\n\n**Step 1.** Convert the ground distance to centimetres: 0.5 km = 0.5 × 1 000 × 100 = **50 000 cm**.\n\n**Step 2.** So 1 cm on the map stands for 50 000 cm on the ground.\n\n**Step 3.** RF = 1 : 50 000.\n\nCheck with another scale: 2 cm to 1 km: 1 km = 100 000 cm, so 1 cm stands for 50 000 cm: RF 1 : 50 000 again.',
      v: flow('LR', [['a', '1 cm to 0.5 km'], ['b', '0.5 km is 50 000 cm'], ['c', '1 cm to 50 000 cm'], ['d', 'RF 1 : 50 000']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of the steps for converting a statement scale into a representative fraction', IMG),
      n: 'To change a statement scale into a representative fraction, put both distances in centimetres. Half a kilometre is five hundred metres, which is fifty thousand centimetres. So one centimetre on the map stands for fifty thousand centimetres on the ground. The representative fraction is one to fifty thousand. Two centimetres to one kilometre gives the same ratio.',
    }),
    sl('check', 'Quick check: representative fraction', {
      b: 'Convert a statement scale to an RF.',
      n: 'Quick check. Change the ground distance to centimetres and write one to that number.',
      chk: 'rf-chk',
    }),
    sl('diagram', 'The linear scale', {
      b: 'A **linear scale** is a bar divided into equal parts, each standing for a ground distance. The first division is usually split into tenths so that small distances can be read. On the extract the bar is **5 km** long and each black or white block is **1 km**, the same length as one grid square. To use it, mark the map distance on a strip of paper and lay the strip on the bar.',
      v: V.scale,
      n: 'This is a linear scale. It is a bar divided into equal blocks, and each block stands for one kilometre here. The same length is one grid square. To use it, mark the distance on a strip of paper and lay the strip along the bar, then read off the kilometres. A linear scale is useful because it stays correct even if the map is enlarged or reduced.',
    }),
    sl('example', 'Worked example: representative fraction to statement scale', {
      b: '**Problem.** A sheet has an RF of **1 : 25 000**. Write its statement scale.\n\n**Step 1.** 1 cm on the map stands for 25 000 cm on the ground.\n\n**Step 2.** 25 000 cm = 250 m = **0.25 km**.\n\n**Step 3.** Statement scale: **1 cm to 0.25 km**. (At 1 : 100 000, 1 cm would stand for 1 km.)',
      v: table(['RF', '1 cm on map stands for', 'Statement scale'], [['1 : 25 000', '25 000 cm = 0.25 km', '1 cm to 0.25 km'], ['1 : 50 000', '50 000 cm = 0.5 km', '1 cm to 0.5 km'], ['1 : 100 000', '100 000 cm = 1 km', '1 cm to 1 km']], 'Table of three representative fractions with their statement scales', IMG),
      n: 'Now the other way. A map has a representative fraction of one to twenty five thousand. One centimetre on the map stands for twenty five thousand centimetres on the ground. That is two hundred and fifty metres, or a quarter of a kilometre. So the statement scale is one centimetre to point two five kilometres. A smaller second number means a larger scale map.',
    }),
    sl('check', 'Quick check: types of scale', {
      b: 'Name the type of scale from its form.',
      n: 'Quick check. A bar marked in kilometres is a linear scale.',
      chk: 'scaletype-chk',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Yellow: cultivated land; green: forest; white: uncultivated land; blue: water; brown: contours; black: man-made features; red: metalled roads.',
        'Point symbols: huts, temple, well, tank, PO, PS, Dis, triangulated and spot heights.',
        'Three scales: statement (1 cm to 0.5 km), RF (1 : 50 000), linear (bar).',
        'Statement to RF: convert the ground distance to cm.',
      ],
      v: table(['Convert', 'Method'], [['Statement to RF', 'Ground distance in cm, then 1 : number'], ['RF to statement', 'Ground cm to km'], ['Map cm to ground km', 'Multiply by 0.5 on this sheet']], 'Summary table of scale conversions', IMG),
      n: 'Let us sum up Part 1. Colours show the kind of land or feature, and the key explains each symbol. The three kinds of scale are the statement scale, the representative fraction and the linear scale. To change a statement scale into a representative fraction, put the ground distance in centimetres. On our sheet every centimetre on the map is half a kilometre on the ground.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Quote both the colour and the feature: "yellow: cultivated land".',
        'Write an RF with no units: 1 : 50 000, not 1 cm : 50 000 cm.',
        'Show the unit conversion (km to cm) when you work out an RF.',
        'Always check the key; two sheets may use slightly different symbols.',
      ],
      v: table(['Slip', 'Fix'], [['Writing units in the RF', 'An RF is a pure ratio'], ['Forgetting to convert km to cm', '1 km = 100 000 cm'], ['Mixing seasonal and perennial streams', 'Dashed is seasonal, continuous is perennial']], 'Table of three common slips with colours, symbols and scale, and their fixes', IMG),
      n: 'Some tips. Say both the colour and the feature, for example yellow means cultivated land. Write a representative fraction without units. When you convert a scale, show the change from kilometres to centimetres, because one kilometre is one lakh centimetres. And always look at the key before you answer, because it is the final word on a symbol.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Topographical Maps: Colours, Symbols, Scale, Distance and Direction, Part 2: Distance, area and direction',
  goals: [
    'Calculate the straight-line distance between two places using the scale',
    'Calculate the area of a region from full grid squares only',
    'State the direction of one place from another using the eight points of the compass',
  ],
  slides: [
    sl('title', 'Measuring on the sheet', {
      b: 'With the scale you can turn map measurements into ground measurements. In the ICSE paper you only measure **straight-line (direct) distance**, you find **area** only from **complete grid squares**, and you give **direction** with the **eight points of the compass**. We practise all three on the imagined practice sheet.',
      v: table(['Measure', 'How', 'Unit'], [['Distance', 'Straight line, then use the scale', 'km'], ['Area', 'Count full 1 km squares', 'sq km'], ['Direction', 'Eight compass points', 'N, NE, E, SE, S, SW, W, NW']], 'Table of the three measurements of the chapter and how each is made', IMG),
      n: 'Now we measure on the sheet. We use the scale to turn map distances into ground distances, but only in a straight line. We find area by counting complete grid squares only. And we give directions using the eight points of the compass. All the examples use our imagined practice sheet.',
    }),
    sl('concept', 'Straight-line distance', {
      b: `To find the **direct (straight-line) distance** between two places: join them with a straight line; measure it in **cm** with a ruler (or on a strip of paper against the **linear scale**); multiply by the scale (here **0.5 km per cm**). On the extract the police station A and the temple B are about **${T.kmToCm(T.dist(FEAT.ps1, FEAT.temple1)).toFixed(1)} cm** apart on a printed sheet, so the ground distance is about **${km1('ps1', 'temple1')} km**. Roads and rivers are not measured here, only straight lines.`,
      v: V.dist1,
      n: 'To find the straight line distance between two places, join them with a straight line and measure it with a ruler. Then multiply the centimetres by the scale. On this sheet every centimetre stands for half a kilometre. The police station and the temple are about one point eight centimetres apart on a printed sheet, so the ground distance is about nine tenths of a kilometre.',
    }),
    sl('example', 'Worked example: Sonakhedi to the temple', {
      b: `**Problem.** On a printed sheet the centre of Sonakhedi (S) and the temple (T) are about 7.9 cm apart. Find the ground distance.\n\n**Step 1.** Scale: 1 cm to 0.5 km.\n\n**Step 2.** Distance = 7.9 × 0.5 = **3.95 km**, about **4 km**.\n\n**Check with the grid.** S and T differ by ${(FEAT.temple1.E - FEAT.sonakhedi.E).toFixed(2)} km east-west and ${(FEAT.temple1.N - FEAT.sonakhedi.N).toFixed(2)} km north-south, so the distance is √(3.25² + 2.25²) = ${T.dist(FEAT.sonakhedi, FEAT.temple1).toFixed(2)} km.`,
      v: V.dist3,
      n: 'Let us work an example. Sonakhedi and the temple are about seven point nine centimetres apart on a printed sheet. Multiply by the scale of half a kilometre per centimetre and you get three point nine five kilometres, which is about four kilometres. You can check this from the grid, because the two places are three and a quarter kilometres apart east to west and two and a quarter kilometres north to south.',
    }),
    sl('check', 'Quick check: distance', {
      b: 'Convert a map length to a ground distance.',
      n: 'Quick check. Multiply the centimetres on the map by half a kilometre.',
      chk: 'dist-chk',
    }),
    sl('concept', 'Area from full grid squares', {
      b: `Every grid square is 1 km by 1 km, so it covers **1 sq km**. To find the area of a region, count only the **complete squares** that the region covers and give the number as **sq km**. Squares that are only partly covered are **not** counted in this course. On the extract, the **yellow** cultivated land fills a block of 3 squares by 3 squares (eastings 45 to 48, northings 73 to 76): **${cultSq.length} full squares**, so the area is **${cultSq.length} sq km**.`,
      v: V.cult,
      n: 'Each grid square covers one square kilometre. To find an area, count only the complete squares the region fills, and write the number in square kilometres. Part squares are not counted in this course. In the extract the yellow cultivated land fills a block three squares wide and three squares high, so it has nine complete squares and an area of nine square kilometres.',
    }),
    sl('example', 'Worked example: area of forest', {
      b: `**Problem.** Find the area of forest (green) in the block between eastings 43 and 47 and northings 78 and 80 that fills **complete** squares.\n\n**Step 1.** Look at each square in the block: the squares ${forSq.join(', ')} are wholly green.\n\n**Step 2.** Count them: **${forSq.length}** full squares.\n\n**Step 3.** Area = ${forSq.length} × 1 sq km = **${forSq.length} sq km**. Squares only partly green are left out.`,
      v: V.forest,
      n: 'Now the forest. In the block between easting forty three and forty seven, and northing seventy eight and eighty, we look at each square. Six of them are wholly green. We count those six and leave out the squares that are only partly green. Each full square is one square kilometre, so the forest area is six square kilometres.',
    }),
    sl('check', 'Quick check: area', {
      b: 'Find an area from complete grid squares.',
      n: 'Quick check. Count only complete squares, each one square kilometre.',
      chk: 'area-chk',
    }),
    sl('concept', 'The eight points of the compass', {
      b: 'The four **cardinal points** are north (N), east (E), south (S) and west (W). The four **intercardinal points** lie between them: north-east (NE), south-east (SE), south-west (SW) and north-west (NW). On a topographical sheet **north is at the top** unless an arrow says otherwise, so east is to the right, south down and west to the left. Each point covers 45° of the circle.',
      v: V.rose,
      n: 'The compass has four main points: north, east, south and west. Between them are north east, south east, south west and north west. On a topographical sheet north is at the top, so east is to the right, south is at the bottom and west is to the left. Each of the eight points covers forty five degrees of the circle.',
    }),
    sl('concept', 'Giving the direction of one place from another', {
      b: `Name the direction **from** the first place **to** the second. Draw a line from the first to the second and see which of the eight points it follows. From the police station the temple lies **${dirw('ps1', 'temple1')}**. Reverse the two places and the direction reverses: the police station is **${dirw('temple1', 'ps1')}** of the temple.`,
      v: table(['From', 'To', 'Direction', 'Reverse direction'], [['Police station', 'Temple', dirw('ps1', 'temple1'), dirw('temple1', 'ps1')], ['Dispensary', 'Temple', dirw('disp1', 'temple1'), dirw('temple1', 'disp1')], ['Pathrali', 'Police station', dirw('pathrali', 'ps1'), dirw('ps1', 'pathrali')], ['Temple', 'Well near Pathrali', dirw('temple1', 'well3'), dirw('well3', 'temple1')]], 'Table of four pairs of places with the direction from the first to the second and the reverse direction', IMG),
      n: 'To give a direction, say which way you must go from the first place to reach the second. Draw a line between them and see which of the eight points it follows. From the police station the temple lies to the north. If you reverse the two places, the direction reverses, so the police station lies to the south of the temple.',
    }),
    sl('example', 'Worked example: direction and distance together', {
      b: `**Problem.** In which direction is the temple (T) from the dispensary (D), and how far?\n\n**Step 1.** The temple is ${(FEAT.temple1.E - FEAT.disp1.E).toFixed(1)} km east and ${(FEAT.temple1.N - FEAT.disp1.N).toFixed(1)} km north of D, so the line points between north and east: **north-east**.\n\n**Step 2.** Distance = √(3.2² + 2.0²) = **${T.dist(FEAT.disp1, FEAT.temple1).toFixed(1)} km**.\n\n**Answer.** The temple is about ${T.round1(T.dist(FEAT.disp1, FEAT.temple1))} km **north-east** of the dispensary; the dispensary is south-west of the temple.`,
      v: V.dir1,
      n: 'Let us find the direction from the dispensary to the temple. The temple is about three kilometres east and two kilometres north of the dispensary, so the line points between north and east. That is north east. The distance, found from the two sides, is about three point eight kilometres. So the temple is three point eight kilometres north east of the dispensary.',
    }),
    sl('check', 'Quick check: direction', {
      b: 'Give a direction and its reverse.',
      n: 'Quick check. Swap the two places and the direction reverses.',
      chk: 'dir-chk',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Distance: straight line, in cm, then multiply by 0.5 km per cm on this sheet.',
        'Area: count only complete 1 km squares; each is 1 sq km.',
        'Direction: eight points; give the direction from the first place to the second; the reverse swaps to the opposite point.',
        'North is at the top of a sheet unless an arrow shows otherwise.',
      ],
      v: table(['Question', 'Method', 'Example answer'], [['Distance', 'cm times 0.5', '1.8 cm is 0.9 km'], ['Area', 'Count full squares', '9 squares is 9 sq km'], ['Direction', 'Eight points', 'Temple is north-east of the dispensary']], 'Summary table of distance, area and direction with example answers', IMG),
      n: 'Let us sum up Part 2. For distance, measure the straight line in centimetres and multiply by half a kilometre. For area, count only the complete squares, each one square kilometre. For direction, use the eight compass points from the first place to the second, and remember that reversing the places gives the opposite point.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Show the working: measurement in cm, the scale, the answer in km.',
        'Give the unit: km for distance, sq km for area.',
        'Only straight-line distances and full squares are asked; do not follow roads or estimate part squares.',
        'Give direction from the first-named place to the second.',
      ],
      v: table(['Slip', 'Fix'], [['Measuring along the road', 'Measure the straight line'], ['Counting part squares', 'Count only complete squares'], ['Giving the reverse direction', 'From the first place to the second']], 'Table of three common slips with distance, area and direction, and their fixes', IMG),
      n: 'Final tips. Show your measurement, the scale and the answer with its unit, kilometres for distance and square kilometres for area. The paper asks only for straight line distances and for complete squares, so do not follow roads and do not guess part squares. Give directions from the first named place to the second.',
    }),
  ],
});
