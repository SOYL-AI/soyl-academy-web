// ICSE 10 Geography ch03 question bank (ICSE 2027 specimen style). Every map item is set on the ONE imagined practice sheet (topo.mjs);
// each answer is computed from the module's coordinates and heights and re-checked by the function passed to add(). Trellis and radial
// patterns appear only in separate schematic diagrams. MCQ keys are placed by the builder.
import { mk, add, svgV } from './lib.mjs';
import * as T from './topo.mjs';
import { SHEET, SETT, NAND, LU_MARK, LU_SOUTH, LU_WEST, TRANS, TRANS_LINES, DRAIN, FLOW_R, FLOW_T, CLUST, DISP, MAN, DEND, TRELLIS, RADIAL, FEAT, X140, X100, siteInfo, lenKm } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const IMG = 'Imagined practice sheet, not a real place and not a Survey of India sheet';
const fig = (spec, alt) => svgV(spec, `${alt}. ${IMG}`, IMG);
const fSett = fig(SETT, 'Extract of the imagined sheet showing Pathrali and Nandiwadi with roads, a canal and a river');
const fNand = fig(NAND, 'Extract of the imagined sheet showing Nandiwadi with a post office, a police station and a well');
const fLU = fig(LU_MARK, 'The imagined practice sheet with the squares P, Q and R marked; names are hidden');
const fLUS = fig(LU_SOUTH, 'Extract of the imagined sheet with yellow cultivated land, a tank and part of Sonakhedi');
const fLUW = fig(LU_WEST, 'Extract of the imagined sheet with white open scrub and three scattered huts');
const fTrans = fig(TRANS, 'Extract of the imagined sheet with the road links between Sonakhedi, Pathrali and Nandiwadi');
const fTransL = fig(TRANS_LINES, 'Extract of the imagined sheet with a metalled road, unmetalled road, tracks, footpaths, a bridge, a canal and streams');
const fDrain = fig(DRAIN, 'Extract of the imagined sheet with a main river and its tributaries');
const fFlowR = fig(FLOW_R, 'Extract of the imagined sheet with P and Q marked where the river crosses the 140 m and 100 m contours');
const fFlowT = fig(FLOW_T, 'Extract of the imagined sheet with the start A and the end B of a stream marked');
const fClust = fig(CLUST, 'Extract of the imagined sheet with the clustered huts of Nandiwadi');
const fDisp = fig(DISP, 'Extract of the imagined sheet with three scattered huts on open scrub');
const fMan = fig(MAN, 'Extract of the imagined sheet with a river, a canal, a bridge, roads, huts, a temple and wells');
const fDend = svgV(DEND, 'Schematic of a dendritic drainage pattern. Schematic, not from the sheet', 'Schematic, not from the sheet');
const fTrel = svgV(TRELLIS, 'Schematic of a trellis drainage pattern. Schematic, not from the sheet', 'Schematic, not from the sheet');
const fRad = svgV(RADIAL, 'Schematic of a radial drainage pattern. Schematic, not from the sheet', 'Schematic, not from the sheet');
const nand = FEAT.nandiwadi;
const sona = FEAT.sonakhedi;
const path = FEAT.pathrali;
const sN = siteInfo(nand);
const sS = siteInfo(sona);
const sP = siteInfo(path);
const t1 = T.stream('t1');
const mainS = T.stream('main');
const h = (p) => Math.round(T.height(p[0], p[1]));
const nn = (id) => T.nnMean(T.VILLAGES.find((v) => v.id === id).huts);
const dispW = T.allHuts().filter((x) => x.E >= 40 && x.E < 44 && x.N >= 74 && x.N < 77);
const svc = (v) => T.servicesOf(v).sort().join('+');
const tankD = sS.water.find((w) => w[1] === 'tank')[2];
const r2 = (x) => (Math.round(x * 100) / 100).toFixed(2);
const r1 = (x) => (Math.round(x * 10) / 10).toFixed(1);

// ================================================================ t01 settlements and services
add('site-chk', mcq({
  stem: 'Which of these is the best reason for the site of a village on a topographical sheet?',
  right: 'It stands on gentle ground near a well and a road',
  wrong: ['It stands on a very steep slope', 'It stands far from any water', 'It stands in the middle of dense forest'],
  sol: 'Villages grow where there is water, gentle land and a road — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('service-mcq', mcq({
  stem: 'In the extract, which village has both a post office (PO) and a police station (PS)?',
  right: 'Nandiwadi',
  wrong: ['Pathrali', 'Sonakhedi', 'None of the villages'],
  sol: 'The letters PO and PS are beside the huts of Nandiwadi — option (@K).',
  d: 1, c: 'application', t: [1], assets: [fSett],
}), () => svc(nand) === 'po+ps' && svc(path) === '' || 'svc');
add('site2-mcq', mcq({
  stem: `Pathrali lies ${r2(sP.water.find((w) => w[1] === 'stream')[2])} km from a stream and ${r2(sP.water[0][2])} km from a well. Which statement gives a reason for its site?`,
  right: 'It has a nearby stream and well for water supply',
  wrong: ['It stands on the highest hill of the sheet', 'It stands beside the metalled road', 'It lies in the middle of the forest'],
  sol: 'Water sources close by explain the site; the village is not on the metalled road or on the hill — option (@K).',
  d: 2, c: 'application', t: [1], assets: [fSett],
}), () => sP.water[0][1] === 'well' && sP.water.some((w) => w[1] === 'stream' && w[2] < 0.6) || 'site');
add('service-fill', fill({
  stem: 'The letters PS beside a small black square on a sheet stand for ___ station.',
  acc: [['police']],
  sol: '**Police** station.',
  d: 1, c: 'recall', t: [1],
}));
add('site-ar', ar({
  a: 'Nandiwadi has grown beside the metalled road.',
  r: 'A road gives a village links for trade and travel.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 2, c: 'understanding', t: [1],
}), () => sN.road[1] === 'metalled' && sN.road[2] < 0.15 || 'road');
add('service-match', match({
  marks: 2,
  stem: 'Match each map abbreviation or symbol in Column A with its meaning in Column B.',
  pairs: [['PO', 'Post office'], ['PS', 'Police station'], ['Dis', 'Dispensary'], ['Thick red line', 'Metalled road']],
  order: [2, 0, 3, 1],
  sol: 'PO: post office. PS: police station. Dis: dispensary. Thick red line: metalled road.',
  d: 1, c: 'recall', t: [1, 3],
}));
add('site-short2', short({
  marks: 2,
  stem: `Nandiwadi lies ${r2(sN.road[2])} km from the metalled road and ${r2(sN.water[0][2])} km from a well. Give two geographical reasons for the site of Nandiwadi.`,
  model: 'It stands beside the metalled road, which gives links for trade and travel, and it is close to a well (and a canal) for water. It also stands on gentle ground suitable for building and farming.',
  sol: 'Road link; water supply; gentle ground.',
  scheme: [['Reason 1 with map evidence', 1], ['Reason 2 with map evidence', 1]],
  d: 2, c: 'application', t: [1],
}), () => sN.road[2] < 0.15 && sN.water[0][1] === 'well' || 'site');
add('site-short3', short({
  marks: 3,
  stem: `Study the extract of the imagined practice sheet that shows Sonakhedi. A tank lies ${r2(tankD)} km from the village and a well ${r2(sS.water[0][2])} km. Give three reasons for the site of Sonakhedi.`,
  model: `(1) Water: a tank (${r2(tankD)} km) and a well (${r2(sS.water[0][2])} km) are close. (2) Land: it stands on gentle ground (${Math.round(sS.slope)} m per km) in the middle of cultivated land. (3) Communication: the metalled road passes through the village, and an unmetalled road and a cart track branch off.`,
  sol: 'Water; gentle fertile land; road links.',
  scheme: [['Water', 1], ['Land', 1], ['Communication', 1]],
  d: 2, c: 'application', t: [1], assets: [fLUS],
}), () => tankD < 0.8 && sS.road[1] === 'metalled' && sS.slope < 60 || 'site');

// ================================================================ t02 land use
add('landuse-chk', mcq({
  stem: 'A plain is tinted yellow, with a tank, wells and a canal beside it. The main occupation of the people is likely to be:',
  right: 'agriculture',
  wrong: ['forestry', 'fishing in the sea', 'mining'],
  sol: 'Yellow cultivated land with irrigation points to agriculture — option (@K).',
  d: 1, c: 'application', t: [2],
}));
add('lu-mcq', mcq({
  stem: 'On the sheet, the square P (marked at the centre of square 4672) is covered by:',
  right: 'cultivated land',
  wrong: ['forest', 'open scrub', 'a tank'],
  sol: 'Square 4672 is wholly yellow, which shows cultivated land — option (@K).',
  d: 2, c: 'application', t: [2], assets: [fLU],
}), () => T.landMix('4672').cult === 100 || 'lu');
add('lu2-mcq', mcq({
  stem: 'The square Q (the centre of square 4678) lies on the conical hill. It is covered by:',
  right: 'forest',
  wrong: ['cultivated land', 'open scrub', 'a village'],
  sol: 'Square 4678 is wholly green, which shows forest — option (@K).',
  d: 2, c: 'application', t: [2], assets: [fLU],
}), () => T.landMix('4678').forest === 100 || 'lu');
add('lu3-mcq', mcq({
  stem: 'The square R (the centre of square 4075) is white with small green ticks. It shows:',
  right: 'open scrub (uncultivated land)',
  wrong: ['cultivated land', 'dense forest', 'a lake'],
  sol: 'White with small ticks is open scrub — option (@K).',
  d: 2, c: 'application', t: [2], assets: [fLU],
}), () => T.landMix('4075').scrub === 100 || 'lu');
add('occ-mcq', mcq({
  stem: 'In the extract, the western part of the sheet is white scrub with only three scattered huts and no irrigation. The most likely occupation is:',
  right: 'grazing of animals and small dry farms',
  wrong: ['rice growing with canal water', 'deep-sea fishing', 'running a large factory'],
  sol: 'Scrub with scattered huts and no irrigation suggests grazing or dry farming — option (@K).',
  d: 3, c: 'analysis', t: [2], assets: [fLUW],
}));
add('lu-ar', ar({
  a: 'The southern plain of the imagined sheet is mainly cultivated land.',
  r: 'The southern plain is tinted green on the sheet.',
  key: 'a',
  sol: 'A is true: the plain is yellow. R is false: green shows forest, not the plain — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('fallow-tf', tf({
  stem: 'Fallow land is cultivated land that is left unsown for a season.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [2],
}));
add('lu-short2', short({
  marks: 2,
  stem: 'Name the land-use class shown by each tint on the imagined practice sheet: (a) yellow, (b) green.',
  model: '(a) Yellow shows cultivated land. (b) Green shows forest.',
  sol: 'Cultivated land; forest.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('occ-short2', short({
  marks: 2,
  stem: 'The conical hill of the imagined practice sheet is tinted green and has no huts. Infer the likely use of the land and give one piece of evidence.',
  model: 'The hill is forest, used for forestry (wood and forest produce). The evidence is the green tint, the steep slopes shown by close contours and the absence of huts.',
  sol: 'Forestry; green tint and no huts.',
  scheme: [['Forestry', 1], ['Evidence from the map', 1]],
  d: 2, c: 'application', t: [2],
}));
add('lu-short3', short({
  marks: 3,
  stem: 'Study the extracts of the imagined practice sheet. Name the land-use class and the likely occupation in (a) the yellow southern plain, (b) the green conical hill, and (c) the white western scrub.',
  model: '(a) Cultivated land; farming (with tank, wells and canal). (b) Forest; forestry, collecting wood and forest produce. (c) Open scrub; grazing of animals and small dry farms.',
  sol: 'Cultivated and farming; forest and forestry; scrub and grazing.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [2], assets: [fLUS, fLUW],
}));
add('share-num', num({
  stem: 'About 45% of the 100 sq km of the imagined practice sheet is cultivated land. Calculate the area of cultivated land in sq km.',
  value: 45, tol: 0, unit: 'sq km',
  sol: '45% of 100 = 45 sq km.',
  scheme: [['45 sq km', 1]],
  d: 2, c: 'application', t: [2],
}), () => Math.round(Array.from({ length: 100 }, (_, i) => T.landMix(`${40 + (i % 10)}${70 + Math.floor(i / 10)}`).cult).reduce((a, b) => a + b, 0) / 100) === 45 || 'share');

// ================================================================ t03 transport and communication
add('trans-chk', mcq({
  stem: 'On a topographical sheet a dotted black line shows a:',
  right: 'footpath',
  wrong: ['metalled road', 'canal', 'cart track'],
  sol: 'A dotted line is a footpath — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('road-mcq', mcq({
  stem: 'In the extract, which means of transport links Sonakhedi in the west with Nandiwadi in the east across the whole extract?',
  right: 'the metalled road',
  wrong: ['a footpath', 'the canal', 'a pack track'],
  sol: 'The thick red line runs from Sonakhedi to Nandiwadi — option (@K).',
  d: 2, c: 'application', t: [3], assets: [fTrans],
}));
add('bridge-mcq', mcq({
  stem: 'In the extract, a short thick bar lies across the river where the metalled road crosses it. It is a:',
  right: 'bridge',
  wrong: ['canal head', 'tank', 'cart track'],
  sol: 'A road carried across a river by a short thick bar is a bridge — option (@K).',
  d: 1, c: 'application', t: [3], assets: [fTransL],
}), () => T.BRIDGES.length === 1 || 'bridge');
add('pack-tf', tf({
  stem: 'A pack track is a track meant for pack animals and is shown by a thin broken line.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [3],
}));
add('pack-fill', fill({
  stem: 'A thin broken black line on a sheet shows a ___ track.',
  acc: [['pack']],
  sol: 'A **pack** track.',
  d: 1, c: 'recall', t: [3],
}));
add('len-num', num({
  stem: `The metalled road of the imagined practice sheet is about ${r1(lenKm('metalled'))} km long on the ground. How long is it on a printed sheet at 1 cm to 0.5 km, in cm to the nearest tenth?`,
  value: 21.8, tol: 0.1, unit: 'cm',
  sol: `${r1(lenKm('metalled'))} ÷ 0.5 = 21.8 cm.`,
  scheme: [['21.8 cm', 1]],
  d: 2, c: 'application', t: [3],
}), () => r1(lenKm('metalled')) === '10.9' && Math.abs(T.kmToCm(10.9) - 21.8) < 1e-9 || 'len');
add('tank-num', num({
  stem: `Sonakhedi is ${r2(tankD)} km from the tank. How many cm apart are they on a printed sheet at 1 cm to 0.5 km? Give your answer to 1 decimal place.`,
  value: 1.6, tol: 0.05, unit: 'cm',
  sol: `${r2(tankD)} ÷ 0.5 = 1.6 cm.`,
  scheme: [['1.6 cm', 1]],
  d: 2, c: 'application', t: [1, 3],
}), () => Math.abs(T.kmToCm(tankD) - 1.56) < 0.05 || 'tank');
add('trans-short2', short({
  marks: 2,
  stem: 'Distinguish between a metalled road and a cart track on the imagined practice sheet.',
  model: 'A metalled road has a hard surface, is shown by a thick red line and carries all vehicles. A cart track is a thin black line, is unsurfaced and is wide enough only for bullock carts.',
  sol: 'Thick red hard-surfaced versus thin black cart track.',
  scheme: [['Metalled road: red, hard surface', 1], ['Cart track: thin black, bullock carts', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('comm-short3', short({
  marks: 3,
  stem: 'Study the extract of the imagined practice sheet. (a) Name the road that crosses the river. (b) Name the feature that carries it across. (c) Name one means of communication, other than a road, shown in Nandiwadi.',
  model: '(a) The metalled road. (b) A bridge. (c) The post office (PO).',
  sol: 'Metalled road; bridge; post office.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [3], assets: [fTransL, fNand],
}));
add('foot-short1', short({
  marks: 1,
  stem: 'Name the symbol used for a footpath on the imagined practice sheet.',
  model: 'A dotted black line.',
  sol: 'Dotted black line.',
  scheme: [['Dotted black line', 1]],
  d: 1, c: 'recall', t: [3],
}));

// ================================================================ t04 drainage
add('flow-chk', mcq({
  stem: 'The bed of a stream is 217 m high at one end and 149 m high at the other. The water flows:',
  right: 'from the 217 m end to the 149 m end',
  wrong: ['from the 149 m end to the 217 m end', 'in both directions', 'it does not flow'],
  sol: 'Water flows from higher to lower ground — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('flow-mcq', mcq({
  stem: 'In the extract, the river crosses the 140 m contour at P and the 100 m contour at Q. The river flows towards the:',
  right: 'south-east',
  wrong: ['north-west', 'north-east', 'south-west'],
  sol: `P is higher (140 m) than Q (100 m), and Q is ${(X100.E - X140.E).toFixed(1)} km east and ${(X140.N - X100.N).toFixed(1)} km south of P: the river flows south-east — option (@K).`,
  d: 3, c: 'application', t: [4], assets: [fFlowR],
}), () => T.directionOf(X140, X100) === 'south-east' && T.compassMargin(T.bearing(X140, X100)) > 10 || 'flow');
add('flowT-mcq', mcq({
  stem: `The stream bed is about ${h(t1.pts[0])} m high at A and about ${h(t1.pts.at(-1))} m high at B in the extract. The stream flows towards the:`,
  right: 'east',
  wrong: ['west', 'north', 'south'],
  sol: `The lower end is B, which lies east of A: the stream flows east — option (@K).`,
  d: 3, c: 'application', t: [4], assets: [fFlowT],
}), () => T.flowDirection('t1') === 'east' || 'flow');
add('vbend-mcq', mcq({
  stem: 'Where contours cross a river, their V-shaped bends point:',
  right: 'upstream, towards higher ground',
  wrong: ['downstream, towards lower ground', 'towards the sea', 'at random'],
  sol: 'Valleys cut back into higher ground, so the V points upstream — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('pat-mcq', mcq({
  stem: 'In the extract, a main river is joined by smaller streams at acute angles pointing downstream. The drainage pattern is:',
  right: 'dendritic',
  wrong: ['trellis', 'radial', 'parallel and straight'],
  sol: 'Tree-like junctions at acute angles make a dendritic pattern — option (@K).',
  d: 2, c: 'application', t: [4], assets: [fDrain],
}));
add('trel-mcq', mcq({
  stem: 'Long parallel streams joined by short tributaries at right angles form a ___ pattern. (See the schematic.)',
  right: 'trellis',
  wrong: ['dendritic', 'radial', 'deranged'],
  sol: 'Right-angle joins between parallel streams make a trellis pattern — option (@K).',
  d: 2, c: 'understanding', t: [4], assets: [fTrel],
}));
add('radial-mcq', mcq({
  stem: 'In the schematic, streams flow outwards in all directions from a central high point. This is a ___ pattern.',
  right: 'radial',
  wrong: ['dendritic', 'trellis', 'parallel'],
  sol: 'Outward flow from a dome or hill, like spokes, is radial — option (@K).',
  d: 2, c: 'application', t: [4], assets: [fRad],
}));
add('dend-tf', tf({
  stem: 'In a dendritic pattern, the tributaries join the main river at acute angles pointing downstream.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'understanding', t: [4],
}));
add('flow-fill', fill({
  stem: 'Water always flows from ___ ground to lower ground.',
  acc: [['higher', 'high']],
  sol: '**Higher** ground.',
  d: 1, c: 'recall', t: [4],
}));
add('pat-fill', fill({
  stem: 'A tree-like drainage pattern is called a ___ pattern.',
  acc: [['dendritic']],
  sol: '**Dendritic**.',
  d: 1, c: 'recall', t: [4],
}));
add('flow-ar', ar({
  a: 'Tributaries join the main river at obtuse angles pointing upstream.',
  r: 'Tributaries join the main river at acute angles pointing downstream.',
  key: 'b',
  sol: 'A is false. R is true — option (b).',
  d: 2, c: 'understanding', t: [4],
}));
add('pat-ar', ar({
  a: 'A radial drainage pattern forms around a dome or a conical hill.',
  r: 'A dendritic pattern looks like the branches of a tree.',
  key: 'd',
  sol: 'Both are true, but R describes a different pattern and does not explain A — option (d).',
  d: 2, c: 'understanding', t: [4],
}));
add('pattern-chk', mcq({
  stem: 'Streams that flow outwards in all directions from the top of a conical hill form a ___ pattern.',
  right: 'radial',
  wrong: ['dendritic', 'trellis', 'rectangular'],
  sol: 'Outward flow from a central high point makes a radial pattern — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('pattern-match', match({
  marks: 2,
  stem: 'Match each pattern in Column A with its description in Column B.',
  pairs: [['Dendritic', 'Tree-like, with acute-angle junctions'], ['Trellis', 'Parallel streams joined at right angles'], ['Radial', 'Streams flowing outwards from a hill'], ['Clustered settlement', 'Huts close together around a centre']],
  order: [3, 1, 0, 2],
  sol: 'Dendritic: tree-like. Trellis: parallel with right-angle joins. Radial: outwards from a hill. Clustered: huts close together.',
  d: 1, c: 'recall', t: [4, 5],
}));
add('flow-short1', short({
  marks: 1,
  stem: 'State the direction of flow of the stream from A to B on the extract (bed heights 217 m and 149 m).',
  model: 'East.',
  sol: 'East.',
  scheme: [['East', 1]],
  d: 2, c: 'application', t: [4], assets: [fFlowT],
}), () => T.flowDirection('t1') === 'east' || 'flow');
add('flow-short2', short({
  marks: 2,
  stem: 'State two clues on a topographical sheet that show the direction of flow of a river.',
  model: 'Heights (contour values or spot heights) along the river decrease downstream; the V-shaped bends of contours that cross the river point upstream; tributaries join the main river at acute angles pointing downstream (any two).',
  sol: 'Falling heights; V-bends upstream; acute junctions.',
  scheme: [['Clue 1', 1], ['Clue 2', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('pat-short2', short({
  marks: 2,
  stem: 'Describe the dendritic drainage pattern of the imagined practice sheet.',
  model: 'The main river is joined by tributaries and smaller streams from several sides, like the branches of a tree. The streams join at acute angles pointing downstream.',
  sol: 'Tree-like; acute angles.',
  scheme: [['Tree-like branching', 1], ['Acute-angle junctions downstream', 1]],
  d: 2, c: 'application', t: [4], assets: [fDrain],
}));
add('fall-num', num({
  stem: `The stream T1 falls from a bed height of about ${h(t1.pts[0])} m at A to about ${h(t1.pts.at(-1))} m at B. What is the fall in height in metres?`,
  value: 68, tol: 0, unit: 'm',
  sol: `${h(t1.pts[0])} − ${h(t1.pts.at(-1))} = 68 m.`,
  scheme: [['68 m', 1]],
  d: 2, c: 'application', t: [4],
}), () => h(t1.pts[0]) - h(t1.pts.at(-1)) === 68 || 'fall');
add('grad-num', num({
  stem: `The main river falls from about ${h(mainS.pts[0])} m at its source to about ${h(mainS.pts.at(-1))} m where it leaves the sheet, a stretch of about ${r1(T.streamLen(mainS))} km. Calculate the average fall per km, to the nearest whole number.`,
  value: 26, tol: 0.5, unit: 'm per km',
  sol: `Fall = ${h(mainS.pts[0])} − ${h(mainS.pts.at(-1))} = 233 m. 233 ÷ 9.0 = 26 m per km.`,
  scheme: [['26 m per km', 1]],
  d: 3, c: 'application', t: [4],
}), () => h(mainS.pts[0]) - h(mainS.pts.at(-1)) === 233 && Math.round(233 / 9.0) === 26 && r1(T.streamLen(mainS)) === '9.0' || 'grad');
add('flow-short3', short({
  marks: 3,
  stem: 'In the extract, the river crosses the 140 m contour at P and the 100 m contour at Q. (a) State which of P and Q is upstream. (b) State the direction of flow. (c) Give a reason for your answer.',
  model: '(a) P is upstream. (b) The river flows south-east. (c) Water flows from higher to lower ground; P (140 m) is higher than Q (100 m) and Q lies to the south-east of P.',
  sol: 'P; south-east; higher to lower.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [4], assets: [fFlowR],
}), () => T.directionOf(X140, X100) === 'south-east' || 'flow');

// ================================================================ t05 settlement patterns and t06 natural and man-made
add('settle-chk', mcq({
  stem: 'Huts standing close together around a well and a road form a ___ settlement.',
  right: 'clustered',
  wrong: ['dispersed', 'linear', 'nomadic'],
  sol: 'Huts close together are clustered — option (@K).',
  d: 1, c: 'understanding', t: [5],
}));
add('clus-mcq', mcq({
  stem: `In the extract, the huts of Nandiwadi are on average about ${r1(nn('nandiwadi'))} km from their nearest neighbour. The pattern is:`,
  right: 'clustered',
  wrong: ['dispersed', 'linear along the river', 'absent'],
  sol: 'Huts about 0.1 km apart around a centre make a clustered settlement — option (@K).',
  d: 2, c: 'application', t: [5], assets: [fClust],
}), () => T.patternOf(T.VILLAGES.find((v) => v.id === 'nandiwadi').huts) === 'clustered' || 'pattern');
add('disp-mcq', mcq({
  stem: `In the extract, three huts stand on open scrub, about ${r1(T.nnMean(dispW))} km from their nearest neighbour. The pattern is:`,
  right: 'dispersed',
  wrong: ['clustered', 'nucleated', 'compact'],
  sol: 'Huts scattered far apart make a dispersed settlement — option (@K).',
  d: 2, c: 'application', t: [5], assets: [fDisp],
}), () => T.patternOf(dispW) === 'dispersed' && dispW.length === 3 || 'pattern');
add('nat-mcq', mcq({
  stem: 'Which of these features on the imagined practice sheet is man-made?',
  right: 'the canal',
  wrong: ['the river', 'the ridge', 'the conical hill'],
  sol: 'The canal is dug by people; the river, ridge and hill are natural — option (@K).',
  d: 1, c: 'understanding', t: [6],
}));
add('nat-tf', tf({
  stem: 'A tank that is dug and banked by an embankment is a natural feature.',
  key: 'f',
  sol: 'False: a dug and banked tank is man-made.',
  d: 2, c: 'understanding', t: [6],
}));
add('disp-tf', tf({
  stem: 'Dispersed settlements are common where the land is thin, such as open scrub used for grazing, and where there is no single water source.',
  key: 't',
  sol: 'True.',
  d: 2, c: 'understanding', t: [5],
}));
add('fallow-fill', fill({
  stem: 'Cultivated land that is left unsown for a season is called ___ land.',
  acc: [['fallow']],
  sol: '**Fallow** land.',
  d: 1, c: 'recall', t: [2],
}));
add('set-fill', fill({
  stem: 'Huts scattered far apart, each among its own land, form a ___ settlement.',
  acc: [['dispersed', 'scattered']],
  sol: 'A **dispersed** settlement.',
  d: 1, c: 'recall', t: [5],
}));
add('settle-ar', ar({
  a: 'The huts of each village on the imagined sheet stand close together.',
  r: 'People settle near a well, a tank and a road, which gather the huts into a cluster.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 2, c: 'understanding', t: [5],
}));
add('clus-short2', short({
  marks: 2,
  stem: 'Give two reasons why the huts of Nandiwadi form a clustered settlement.',
  model: 'Water is available only at a few points such as the well and the canal, so people settle near them; the metalled road and the shared fields also draw the huts together; living close together gives safety and shared services (any two).',
  sol: 'Water point; road and fields; safety.',
  scheme: [['Reason 1', 1], ['Reason 2', 1]],
  d: 2, c: 'application', t: [5],
}));
add('nat-short2', short({
  marks: 2,
  stem: 'Classify each feature of the imagined practice sheet as natural or man-made: (a) the ridge, (b) the embankment.',
  model: '(a) The ridge is natural. (b) The embankment is man-made, built to hold the tank.',
  sol: 'Natural; man-made.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 1, c: 'understanding', t: [6],
}));
add('settle-short3', short({
  marks: 3,
  stem: `The huts of Nandiwadi stand about ${r1(nn('nandiwadi'))} km from their nearest neighbours; the three huts of the north-west scrub stand about ${r1(T.nnMean(dispW))} km apart. (a) Name each pattern. (b) Give one reason for the first. (c) Give one reason for the second.`,
  model: '(a) Nandiwadi: clustered; north-west scrub: dispersed. (b) Water points, the road and shared fields draw the huts together. (c) The land is thin open scrub supporting few people, grazing and dry farming need space, and there is no single water source.',
  sol: 'Clustered; dispersed; two reasons.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'analysis', t: [5], assets: [fClust, fDisp],
}), () => nn('nandiwadi') < 0.12 && T.nnMean(dispW) > 0.8 || 'nn');
add('man-short3', short({
  marks: 3,
  stem: 'Study the extract of the imagined practice sheet. Name (a) one natural feature, (b) one man-made feature used for irrigation and (c) one man-made feature that carries a road across a river.',
  model: '(a) The river (or the ridge, hill or forest). (b) The canal (or the tank). (c) The bridge.',
  sol: 'River; canal; bridge.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [6], assets: [fMan],
}));

// ================================================================ 10-mark structured questions
add('long-settle', long({
  stem: 'Study the extract of the imagined practice sheet that shows Pathrali and Nandiwadi. (a) Name the services shown at Nandiwadi. [2]\n\n(b) Give two reasons for the site of Pathrali. [2]\n\n(c) State the pattern of settlement in Nandiwadi and give a reason. [3]\n\n(d) Name two means of transport that link Pathrali with other villages. [3]',
  model: `(a) A post office (PO) and a police station (PS).\n\n(b) It lies ${r2(sP.water.find((w) => w[1] === 'stream')[2])} km from a stream and ${r2(sP.water[0][2])} km from a well, so it has water; it stands on gently sloping ground close to a footpath and an unmetalled road.\n\n(c) Clustered: the huts stand about ${r1(nn('nandiwadi'))} km from their nearest neighbours, drawn together by the well, the canal, the metalled road and shared fields.\n\n(d) The unmetalled road and a footpath.`,
  sol: 'PO and PS; water and gentle land; clustered with reasons; unmetalled road and footpath.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 3, c: 'application', t: [1, 3, 5], assets: [fSett],
}), () => svc(nand) === 'po+ps' && sP.water.some((w) => w[1] === 'stream') || 'settle');
add('long-lu', long({
  stem: 'Study the sheet in which the squares P, Q and R are marked. (a) Name the land-use class of square P (4672) and of square Q (4678). [2]\n\n(b) Name the land use of square R (4075) and the tint that shows it. [2]\n\n(c) State the likely main occupation of the people near P, and give two pieces of map evidence from the extract of the plain. [3]\n\n(d) Explain why few huts are found in Q. [3]',
  model: '(a) P: cultivated land. Q: forest.\n\n(b) R: open scrub (uncultivated land), shown white with small green ticks.\n\n(c) Agriculture. Evidence: the yellow tint, and the tank, wells and canal that supply water.\n\n(d) Q is on the steep conical hill (close contours) covered by forest, where farming and building are difficult, so there are no huts.',
  sol: 'Cultivated and forest; scrub; agriculture with evidence; steep forested hill.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 3, c: 'analysis', t: [2], assets: [fLU, fLUS],
}), () => T.landMix('4672').cult === 100 && T.landMix('4678').forest === 100 && T.landMix('4075').scrub === 100 || 'lu');
add('long-drain', long({
  stem: 'Study the extracts of the imagined practice sheet. (a) State two clues to the direction of flow of a river on a sheet. [2]\n\n(b) The river crosses the 140 m contour at P and the 100 m contour at Q. State the direction of flow. [2]\n\n(c) A stream bed is about 217 m high at A and 149 m at B. Calculate the fall and state the direction of flow. [3]\n\n(d) Name the drainage pattern of the sheet and describe it. [3]',
  model: '(a) Heights fall downstream; V-bends of contours point upstream; tributaries join at acute angles pointing downstream (any two).\n\n(b) South-east, from P (higher) to Q (lower).\n\n(c) Fall = 217 − 149 = 68 m. The stream flows east (from A to B).\n\n(d) Dendritic: tree-like, with tributaries joining the main river at acute angles pointing downstream.',
  sol: 'Clues; south-east; 68 m, east; dendritic.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 3, c: 'application', t: [4], assets: [fFlowR, fFlowT, fDrain],
}), () => T.directionOf(X140, X100) === 'south-east' && h(t1.pts[0]) - h(t1.pts.at(-1)) === 68 || 'drain');
add('long-trans', long({
  stem: 'Study the extract of the imagined practice sheet. (a) Name two types of road shown in the extract and give the symbol of each. [2]\n\n(b) The metalled road is about 10.9 km long on the ground. Calculate its length in cm on a printed sheet at 1 cm to 0.5 km. [2]\n\n(c) Name the feature that carries the metalled road over the river and state what it shows about the importance of the road. [3]\n\n(d) Explain how roads and tracks help the villages of the sheet. [3]',
  model: '(a) Metalled road: a thick red line. Unmetalled road: a thick black broken line (cart track, pack track and footpath are also acceptable).\n\n(b) 10.9 ÷ 0.5 = 21.8 cm.\n\n(c) A bridge. It shows that the road is important enough for the engineering needed to cross the river all year.\n\n(d) They link the villages with one another and with the markets, so farm produce, goods and people can move; they give access to services such as the post office, police station and dispensary.',
  sol: 'Metalled and unmetalled; 21.8 cm; bridge; links and services.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 3, c: 'application', t: [3], assets: [fTransL, fTrans],
}), () => Math.abs(T.kmToCm(10.9) - 21.8) < 1e-9 || 'len');
add('long-pattern', long({
  stem: 'Study the extracts of the imagined practice sheet and the schematic diagrams of drainage. (a) Name the drainage pattern shown on the sheet and the other two patterns in the schematic diagrams. [2]\n\n(b) Describe the trellis and the radial patterns. [2]\n\n(c) Compare the huts of Nandiwadi (about 0.1 km apart) with the three huts of the north-west (more than 1 km apart), naming each pattern. [3]\n\n(d) Classify the canal, the river, the bridge and the ridge as natural or man-made, with a reason for the canal. [3]',
  model: '(a) The sheet shows a dendritic pattern; the schematics show trellis and radial patterns.\n\n(b) Trellis: long parallel streams joined by short tributaries at right angles, like a garden fence. Radial: streams flowing outwards from a central high point, like the spokes of a wheel.\n\n(c) Nandiwadi has a clustered settlement (huts close together around water and the road); the north-west has a dispersed settlement (huts far apart on thin open scrub).\n\n(d) The canal is man-made (dug by people and following a contour); the river and the ridge are natural; the bridge is man-made.',
  sol: 'Dendritic, trellis, radial; descriptions; clustered and dispersed; natural and man-made.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 4, c: 'analysis', t: [4, 5, 6], assets: [fDend, fTrel, fRad],
}), () => nn('nandiwadi') < 0.12 && T.nnMean(dispW) > 0.8 || 'pattern');
