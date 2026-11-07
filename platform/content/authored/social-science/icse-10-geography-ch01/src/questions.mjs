// ICSE 10 Geography ch01 question bank (ICSE 2027 specimen style). Every map item is set on the ONE imagined practice sheet (topo.mjs);
// each answer is computed from the module's coordinates and heights and re-checked by the function passed to add(). MCQ keys are placed
// by the builder.
import { mk, add, svgV } from './lib.mjs';
import * as T from './topo.mjs';
import { GRID_SYM, GRID_SYM2, GRID_BARE, HILL, HILL_MARK, RIDGE, ESC, GENTLE, PROF_ESC, PROF_GENTLE } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const pt = (id) => T.POINTS.find((p) => p.id === id);
const temple = pt('temple1');
const po = pt('po1');
const ps = pt('ps1');
const w1 = pt('well1');
const w2 = pt('well2');
const dis = pt('disp1');
const sp3 = pt('spot3');
const sp6 = pt('spot6');
const sp9 = pt('spot9');
const sp11 = pt('spot11');
const s1 = pt('spot1');
const s2 = pt('spot2');
const trig1 = pt('trig1');
const trig2 = pt('trig2');
const four = (p) => T.fourFig(p.E, p.N);
const six = (p) => T.sixFig(p.E, p.N);
const sixSp = (p) => `${six(p).slice(0, 3)} ${six(p).slice(3)}`;
const IMG = 'Imagined practice sheet, not a real place and not a Survey of India sheet';
const fig = (spec, alt) => svgV(spec, `${alt}. ${IMG}`, IMG);
const fSym = fig(GRID_SYM, 'Extract of the imagined sheet, squares 4673 to 4875, with the points A, B and C ringed and lettered; names are hidden');
const fSym2 = fig(GRID_SYM2, 'Extract of the imagined sheet, squares 4372 to 4574, with the points P, Q and R ringed and lettered; names are hidden');
const fBare = fig(GRID_BARE, 'Extract of the imagined sheet, squares 4673 to 4875, with the names hidden');
const fHill = fig(HILL, 'Extract of the imagined sheet showing closed brown contours around a triangulated height');
const fHillM = fig(HILL_MARK, 'Extract of the imagined sheet with the point X marked on a hill');
const fRidge = fig(RIDGE, 'Extract of the imagined sheet showing long narrow closed contours with a triangulated height');
const fEsc = fig(ESC, 'Extract of the imagined sheet showing contours bunched along a line with spot heights at both sides');
const fGentle = fig(GENTLE, 'Extract of the imagined sheet showing the gentle south-western plain with a tank and a village');
const fProfEsc = fig(PROF_ESC, 'Cross-section across the escarpment of the imagined sheet');
const fProfGentle = fig(PROF_GENTLE, 'Cross-section across the gentle plain of the imagined sheet');
const sp = (p) => ({ E: p.E, N: p.N });
const gEsc = T.gradientBetween(s2, s1);
const gPlain = Math.round(((pt('spot7').value - sp11.value) / T.round1(T.dist(pt('spot7'), sp11))) * 10) / 10;

// ================================================================ t01 grid references
add('grid-chk', mcq({
  stem: 'A well lies 0.55 km east of easting line 43 and 0.85 km north of northing line 72. Its six-figure grid reference is:',
  right: '435728',
  wrong: ['728435', '438572', '435827'],
  sol: 'Easting 43 and 5 tenths gives 435; northing 72 and 8 tenths gives 728. Easting first: 435728 — option (@K).',
  d: 2, c: 'application', t: [1],
}), () => six(w1) === '435728' || 'six');
add('sq-mcq', mcq({
  stem: 'The point marked Q in the extract is a well. The four-figure reference of the grid square that contains it is:',
  right: four(w1),
  wrong: ['7243', '4373', '4472'],
  sol: `Q lies east of line 43 and north of line 72, so the square is ${four(w1)} — option (@K).`,
  d: 2, c: 'application', t: [1], assets: [fSym2],
}), () => four(w1) === '4372' || 'four');
add('sixsym-mcq', mcq({
  stem: 'In the extract, the feature marked A is shown by a small flag on a square. It is a:',
  right: 'temple',
  wrong: ['well', 'police station', 'post office'],
  sol: 'A flag on a small square is the symbol for a temple — option (@K).',
  d: 1, c: 'recall', t: [1], assets: [fSym],
}), () => pt('temple1').kind === 'temple' && Math.abs(temple.E - 46.35) < 1e-9 || 'temple');
add('atref-mcq', mcq({
  stem: 'In the extract, the feature at grid reference 469732 is a:',
  right: 'well',
  wrong: ['temple', 'post office', 'police station'],
  sol: `Easting 46 and 9 tenths, northing 73 and 2 tenths: a circle with a dot, a well (marked C) — option (@K).`,
  d: 2, c: 'application', t: [1], assets: [fSym],
}), () => T.pointAtSix('469732')?.kind === 'well' || 'well');
add('eastnorth-mcq', mcq({
  stem: 'In the four-figure grid reference 4372, the easting is:',
  right: '43',
  wrong: ['72', '4', '2'],
  sol: 'The first two digits are the easting — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('order-tf', tf({
  stem: 'In a grid reference the northing is always written before the easting.',
  key: 'f',
  sol: 'False: the easting is written first.',
  d: 1, c: 'recall', t: [1],
}));
add('corner-tf', tf({
  stem: 'The four-figure reference of a grid square is taken from the lines at its south-west (bottom-left) corner.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [1],
}));
add('po-fill', fill({
  stem: 'In the extract, the post office is the feature marked B. Its six-figure grid reference is ___.',
  acc: [[six(po), sixSp(po)]],
  sol: `Easting 46 and 8 tenths, northing 73 and 8 tenths: **${six(po)}**.`,
  d: 2, c: 'application', t: [1], assets: [fSym],
}), () => six(po) === '468738' || 'six');
add('corner-fill', fill({
  stem: 'The four-figure reference of a square is read from the ___ corner of the square.',
  acc: [['south-west', 'southwest', 'bottom-left', 'bottom left', 'lower left']],
  sol: '**South-west** (bottom-left).',
  d: 1, c: 'recall', t: [1],
}));
add('grid-ar', ar({
  a: 'The grid references 4674 and 4746 name different squares of the sheet.',
  r: 'In a grid reference the easting digits are written before the northing digits.',
  key: 'c',
  sol: '4674 is easting 46, northing 74. 4746 is easting 47, northing 46. The order of reading (easting first) explains why they differ — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('gridrule-short2', short({
  marks: 2,
  stem: `State the rule for reading a four-figure grid reference, and give the four-figure reference of the square that contains the dispensary at easting ${dis.E} and northing ${dis.N} on the imagined practice sheet.`,
  model: `Read the easting (vertical line) first and then the northing (horizontal line), using the lines at the south-west corner of the square. The dispensary lies between easting lines 43 and 44 and between northing lines 72 and 73, so the reference is ${four(dis)}.`,
  sol: `Easting first; ${four(dis)}.`,
  scheme: [['Easting first, then northing, from the south-west corner', 1], [`Square ${four(dis)}`, 1]],
  d: 2, c: 'application', t: [1],
}), () => four(dis) === '4372' || 'four');
add('grid-short3', short({
  marks: 3,
  stem: 'Study the extract of the imagined practice sheet. (a) Give the four-figure reference of the square that contains the police station. (b) Give its six-figure reference. (c) Name the village it serves.',
  model: `(a) The police station lies in square ${four(ps)}. (b) Its six-figure reference is ${six(ps)} (easting 46 and 4 tenths; northing 73 and 7 tenths). (c) It stands beside the huts of Nandiwadi, so it serves Nandiwadi.`,
  sol: `${four(ps)}; ${six(ps)}; Nandiwadi.`,
  scheme: [['(a) square', 1], ['(b) six figures', 1], ['(c) village', 1]],
  d: 2, c: 'application', t: [1], assets: [fig(T.extract(46, 73, 3, 3, { abbr: true }), 'Extract of the imagined sheet, squares 4673 to 4875, with labels')],
}), () => four(ps) === '4673' && six(ps) === '464737' && T.servicesOf(T.VILLAGES.find((v) => v.id === 'nandiwadi')).includes('ps') || 'ps');
add('grid-match', match({
  marks: 2,
  stem: 'Match each six-figure reference in Column A with the feature at that point on the extract of the imagined practice sheet (Column B).',
  pairs: [[six(temple), 'Temple'], [six(ps), 'Police station'], [six(po), 'Post office'], [six(w2), 'Well']],
  order: [2, 0, 3, 1],
  sol: `${six(temple)} is the temple; ${six(ps)} the police station; ${six(po)} the post office; ${six(w2)} the well.`,
  d: 2, c: 'application', t: [1], assets: [fBare],
}), () => T.pointAtSix(six(temple)).kind === 'temple' && T.pointAtSix(six(ps)).kind === 'ps' && T.pointAtSix(six(po)).kind === 'po' && T.pointAtSix(six(w2)).kind === 'well' || 'match');
add('sym2-short3', short({
  marks: 3,
  stem: 'In the extract of the imagined practice sheet, the points P and Q are marked. P is the dispensary and Q is a well. (a) Give the six-figure reference of P. (b) Give the six-figure reference of Q. (c) State which of the two lies farther east.',
  model: `(a) P: easting 43 and 1 tenth, northing 72 and 6 tenths: ${six(dis)}. (b) Q: easting 43 and 5 tenths, northing 72 and 8 tenths: ${six(w1)}. (c) Q is farther east, because 435 is greater than 431.`,
  sol: `${six(dis)}; ${six(w1)}; Q.`,
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [1], assets: [fSym2],
}), () => six(dis) === '431726' && six(w1) === '435728' && w1.E > dis.E || 'pq');

// ================================================================ t02 contours and contour interval
add('ci-chk', mcq({
  stem: 'Two neighbouring contours on a sheet are labelled 240 m and 260 m. The contour interval is:',
  right: '20 m',
  wrong: ['10 m', '40 m', '500 m'],
  sol: 'Interval = 260 − 240 = 20 m — option (@K).',
  d: 1, c: 'application', t: [2],
}));
add('contour-def', mcq({
  stem: 'A contour is best defined as a line that joins places of:',
  right: 'equal height above mean sea level',
  wrong: ['equal distance from the sea', 'equal slope in degrees', 'equal rainfall in a year'],
  sol: 'A contour joins points of the same height above mean sea level — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('between-mcq', mcq({
  stem: 'The spot height at R in the extract reads 188 m. R lies between the contours of:',
  right: '180 m and 200 m',
  wrong: ['160 m and 180 m', '200 m and 220 m', '100 m and 200 m'],
  sol: 'With an interval of 20 m, 188 m lies above the 180 m contour and below the 200 m contour — option (@K).',
  d: 2, c: 'application', t: [2], assets: [fSym2],
}), () => sp3.value === 188 && T.LEVELS.filter((L) => L <= 188).at(-1) === 180 && T.LEVELS.find((L) => L > 188) === 200 || 'between');
add('index-mcq', mcq({
  stem: 'On the imagined practice sheet, which of these contours is an index contour (thicker and labelled)?',
  right: '300 m',
  wrong: ['240 m', '260 m', '350 m'],
  sol: 'Index contours are drawn every 100 m, so 300 m is an index contour — option (@K).',
  d: 1, c: 'recall', t: [2],
}), () => T.CONTOURS.find((c) => c.level === 300).index && !T.CONTOURS.find((c) => c.level === 240).index || 'index');
add('ci-num', num({
  stem: 'On the imagined practice sheet the 200 m and 300 m index contours have four thin contours between them. Calculate the contour interval in metres.',
  value: 20, tol: 0, unit: 'm',
  sol: 'The four thin contours make 5 equal gaps. Interval = 100 ÷ 5 = 20 m.',
  scheme: [['20 m', 1]],
  d: 2, c: 'application', t: [2],
}), () => T.LEVELS.filter((L) => L > 200 && L < 300).length === 4 && 100 / 5 === 20 || 'ci');
add('int-fill1', fill({
  stem: 'On another sheet, 3 thin contours lie between a 100 m and a 200 m index contour. The contour interval on that sheet is ___ m.',
  acc: [['25']],
  sol: 'Three lines make 4 gaps: 100 ÷ 4 = **25** m.',
  d: 3, c: 'application', t: [2],
}), () => 100 / 4 === 25 || 'ci');
add('contour-tf', tf({
  stem: 'The height difference between one contour and the next is the same everywhere on a sheet.',
  key: 't',
  sol: 'True: it is the contour interval (20 m on the imagined sheet).',
  d: 1, c: 'understanding', t: [2],
}));
add('contour-ar', ar({
  a: 'Every point on one contour line has the same height above mean sea level.',
  r: 'The height difference between a contour and the next contour is different in different parts of the sheet.',
  key: 'a',
  sol: 'A is true. R is false: the contour interval is constant — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('close-mcq', mcq({
  stem: 'In the extract, the contours are crowded together between easting 48 and easting 49. This shows that the ground there:',
  right: 'rises steeply',
  wrong: ['is almost level', 'is a river valley floor', 'is covered by a lake'],
  sol: 'Close contours mean a steep slope — option (@K).',
  d: 2, c: 'application', t: [2, 3], assets: [fEsc],
}));
add('spacing-chk', mcq({
  stem: 'Where the contours on a sheet are far apart, the slope of the ground is:',
  right: 'gentle',
  wrong: ['steep', 'vertical', 'always a valley'],
  sol: 'Wide spacing means a gentle slope — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('grad-num', num({
  stem: `On the imagined practice sheet the spot heights at the foot (${s2.value} m) and at the top (${s1.value} m) of the escarpment are ${T.round1(T.dist(s1, s2))} km apart. Calculate the average gradient between them in metres per km, to the nearest whole number.`,
  value: 83, tol: 0.5, unit: 'm per km',
  sol: `Height difference = ${s1.value} − ${s2.value} = 108 m. Gradient = 108 ÷ 1.3 = 83 m per km.`,
  scheme: [['83 m per km', 1]],
  d: 3, c: 'application', t: [2, 3],
}), () => Math.round(gEsc) === 83 && Math.abs(T.dist(s1, s2) - 1.3) < 1e-9 || 'grad');
add('gentle-short2', short({
  marks: 2,
  stem: 'Study the extract and the cross-section of the south-west of the imagined practice sheet. Describe the slope of the land and give the evidence from the contours.',
  model: 'The land slopes gently. The contours are few and widely spaced (about 20 m of height over each kilometre or more), and the cross-section changes by only a few tens of metres across three kilometres.',
  sol: 'Gentle slope; contours wide apart.',
  scheme: [['Gentle slope', 1], ['Contours widely spaced, with the figures or the cross-section', 1]],
  d: 2, c: 'application', t: [2, 3], assets: [fGentle, fProfGentle],
}));
add('profile-tf', tf({
  stem: 'In a cross-section drawn from a sheet, the steepest part of the profile lies where the contours on the map are bunched together.',
  key: 't',
  sol: 'True.',
  d: 2, c: 'understanding', t: [2],
}));
add('slope-ar', ar({
  a: 'Where the contours are widely spaced, the slope is steep.',
  r: 'Contours that are close together show a steep slope.',
  key: 'b',
  sol: 'A is false: wide spacing means a gentle slope. R is true — option (b).',
  d: 2, c: 'understanding', t: [2],
}));
add('ci-short3', short({
  marks: 3,
  stem: 'Two index contours on a sheet are labelled 300 m and 400 m, and there are four thin contours between them. (a) Name the thick labelled contours. (b) Calculate the contour interval. (c) State the height of the third thin contour above the 300 m line.',
  model: '(a) Index contours. (b) Four lines make five gaps, so the interval is 100 ÷ 5 = 20 m. (c) The thin contours are 320, 340, 360 and 380 m, so the third is 360 m.',
  sol: 'Index; 20 m; 360 m.',
  scheme: [['(a) index contours', 1], ['(b) 100 ÷ 5 = 20 m', 1], ['(c) 360 m', 1]],
  d: 3, c: 'application', t: [2],
}), () => 300 + 3 * 20 === 360 && 100 / 5 === 20 || 'ci');
add('slope-short3', short({
  marks: 3,
  stem: `The escarpment of the imagined practice sheet rises 108 m between spot heights ${T.round1(T.dist(s1, s2))} km apart, while the southern plain falls ${pt('spot7').value - sp11.value} m between spot heights ${T.round1(T.dist(pt('spot7'), sp11))} km apart. (a) Calculate each average gradient. (b) Which has the closer contours? (c) Give a reason.`,
  model: `(a) Escarpment: 108 ÷ 1.3 = ${Math.round(gEsc)} m per km. Plain: ${pt('spot7').value - sp11.value} ÷ ${T.round1(T.dist(pt('spot7'), sp11))} = ${gPlain} m per km. (b) The escarpment. (c) A steeper slope packs more 20 m contours into each kilometre.`,
  sol: `${Math.round(gEsc)} and ${gPlain} m per km; escarpment.`,
  scheme: [['(a) both gradients', 1], ['(b) escarpment', 1], ['(c) reason', 1]],
  d: 3, c: 'analysis', t: [2, 3],
}), () => Math.round(gEsc) === 83 && gPlain === 14.8 || 'grad');

// ================================================================ t03 landforms
add('landform-chk', mcq({
  stem: 'Closed contours, one inside another, with the highest value at the centre and steep slopes on all sides, show:',
  right: 'a conical hill',
  wrong: ['a ridge', 'an escarpment', 'a river valley'],
  sol: 'Concentric closed contours describe a conical hill — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('hillfig-mcq', mcq({
  stem: 'The landform around the point X in the extract is a:',
  right: 'conical hill',
  wrong: ['ridge', 'escarpment', 'gentle plain'],
  sol: 'The contours form closed rings round a triangulated height with steep slopes on all sides: a conical hill — option (@K).',
  d: 2, c: 'application', t: [3], assets: [fHillM],
}));
add('ridgefig-mcq', mcq({
  stem: 'The landform with a triangulated height of 398 m in the extract is a:',
  right: 'ridge',
  wrong: ['conical hill', 'escarpment', 'tank'],
  sol: 'Long narrow closed contours with a crest: a ridge — option (@K).',
  d: 2, c: 'application', t: [3], assets: [fRidge],
}));
add('escfig-mcq', mcq({
  stem: 'In the extract, the contours are bunched along a line between easting 48 and easting 49, and spread out on the flat ground to the east. The landform is an:',
  right: 'escarpment',
  wrong: ['conical hill', 'ridge', 'island'],
  sol: 'A steep face between a lower and a higher flat area: an escarpment — option (@K).',
  d: 2, c: 'application', t: [3], assets: [fEsc],
}));
add('ridge-chk', mcq({
  stem: 'How does a ridge differ from an escarpment on a contour map?',
  right: 'A ridge is steep on both long sides; an escarpment is steep on one side only',
  wrong: ['A ridge has no contours; an escarpment has many', 'A ridge is always lower than an escarpment', 'A ridge is a river; an escarpment is a hill'],
  sol: 'A ridge falls away on both sides of a crest; an escarpment has one steep face — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('steep-mcq', mcq({
  stem: 'Slope A rises 40 m over 2 km. Slope B rises 40 m over 0.5 km. Which statement is correct?',
  right: 'B is steeper, so its contours are closer together',
  wrong: ['A is steeper, so its contours are closer together', 'Both are equally steep', 'B is gentler, so its contours are closer together'],
  sol: 'A: 40 ÷ 2 = 20 m per km. B: 40 ÷ 0.5 = 80 m per km. B is steeper and has closer contours — option (@K).',
  d: 3, c: 'analysis', t: [3],
}), () => 40 / 2 === 20 && 40 / 0.5 === 80 || 'grad');
add('cone-mcq2', mcq({
  stem: 'The cross-section over a conical hill rises from about 180 m to a summit of 478 m and falls again. The summit of that hill on the map is shown by:',
  right: 'a black triangle with the figure 478',
  wrong: ['a black dot with the figure 478', 'a blue line marked 478', 'a red square marked 478'],
  sol: 'A summit fixed by survey is a triangulated height, drawn as a black triangle — option (@K).',
  d: 2, c: 'application', t: [3, 4],
}), () => trig1.value === 478 || 'trig');
add('ridge-tf', tf({
  stem: 'A ridge is shown on a contour map by long, narrow closed contours with a crest.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [3],
}));
add('valley-tf', tf({
  stem: 'The V-shaped bends of contours that cross a river valley point towards lower ground.',
  key: 'f',
  sol: 'False: the point of each V lies towards higher ground (upstream).',
  d: 3, c: 'understanding', t: [3],
}));
add('land-fill', fill({
  stem: 'A long, steep face that separates a higher flat area from lower ground is called an ___.',
  acc: [['escarpment']],
  sol: '**Escarpment**.',
  d: 1, c: 'recall', t: [3],
}));
add('esc-ar', ar({
  a: 'An escarpment shows on a map as contours bunched along a line.',
  r: 'A ridge shows on a map as long, narrow closed contours.',
  key: 'd',
  sol: 'Both statements are true, but R describes a different landform and does not explain A — option (d).',
  d: 2, c: 'understanding', t: [3],
}));
add('ridgehill-short2', short({
  marks: 2,
  stem: 'State two differences between a conical hill and a ridge as they appear on a contour map.',
  model: 'A conical hill has roughly circular concentric contours and a small summit; a ridge has long narrow elongated contours and a crest that runs for some distance. A hill is steep on all sides, a ridge on its two long sides.',
  sol: 'Shape of contours; summit versus crest.',
  scheme: [['Difference in shape of the contours', 1], ['Difference in summit or crest', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('why-short2', short({
  marks: 2,
  stem: 'Why do the contours round a conical hill form closed rings? Give a geographical reason.',
  model: 'Each contour joins points of the same height, and a hill falls away in every direction from its summit, so every contour must return on itself to enclose the summit.',
  sol: 'Contours join equal heights and the land falls away in all directions.',
  scheme: [['Contour joins equal heights', 1], ['Land falls in all directions from the summit', 1]],
  d: 3, c: 'analysis', t: [3],
}));
add('esc-short3', short({
  marks: 3,
  stem: 'Study the extract of the imagined practice sheet that shows the escarpment. (a) State the evidence from the contours that it is an escarpment. (b) Give the heights at its foot and its top. (c) State the type of ground on the top.',
  model: `(a) The contours are bunched along a line, showing a steep face, with wide spacing on either side. (b) The foot is about ${s2.value} m and the top about ${s1.value} m. (c) The top is nearly flat, shown by widely spaced contours.`,
  sol: `Bunched contours; ${s2.value} m and ${s1.value} m; flat.`,
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [3, 4], assets: [fEsc],
}), () => s2.value === 154 && s1.value === 262 || 'esc');
add('land-match', match({
  marks: 2,
  stem: 'Match each map symbol or pattern in Column A with its meaning in Column B (imagined practice sheet).',
  pairs: [['Black triangle with a figure', 'Triangulated height'], ['Black dot with a figure', 'Spot height'], ['Thin brown line', 'Contour'], ['Thick brown line with a figure', 'Index contour']],
  order: [1, 3, 0, 2],
  sol: 'Triangle: triangulated height. Dot: spot height. Thin brown line: contour. Thick labelled brown line: index contour.',
  d: 1, c: 'recall', t: [2, 4],
}));

// ================================================================ t04 heights
add('spot-chk', mcq({
  stem: 'A black triangle with a figure beside it on a sheet shows a:',
  right: 'triangulated height',
  wrong: ['spot height', 'well', 'bench mark in a village'],
  sol: 'The triangle is the symbol of a triangulated height — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('trig-mcq', mcq({
  stem: 'The point X in the extract is the summit of the hill. The height at X is:',
  right: `${trig1.value} m`,
  wrong: ['398 m', '300 m', '460 m'],
  sol: `The triangulated height at X reads ${trig1.value} m — option (@K).`,
  d: 1, c: 'application', t: [4], assets: [fHillM],
}), () => trig1.value === 478 && Math.round(T.height(trig1.E, trig1.N)) === 478 || 'trig');
add('relh-mcq', mcq({
  stem: 'Using the spot heights in the extract, the relative height of the escarpment (top above foot) is:',
  right: `${s1.value - s2.value} m`,
  wrong: [`${s1.value + s2.value} m`, `${s1.value} m`, `${(s1.value - s2.value) / 2} m`],
  sol: `Relative height = ${s1.value} − ${s2.value} = ${s1.value - s2.value} m — option (@K).`,
  d: 2, c: 'application', t: [4], assets: [fEsc],
}), () => s1.value - s2.value === 108 || 'relh');
add('tvs-mcq', mcq({
  stem: 'Which statement about triangulated heights and spot heights is correct?',
  right: 'A triangulated height marks a summit or survey station; a spot height marks ordinary ground',
  wrong: ['A spot height marks a summit; a triangulated height marks a village', 'Both are measured in kilometres', 'A triangulated height is a contour and a spot height is a road'],
  sol: 'Triangulated heights are fixed on summits or survey stations; spot heights fill gaps on ordinary ground — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('relh-num', num({
  stem: `On the imagined practice sheet, a spot height of ${sp9.value} m (reference ${six(sp9)}) lies in the north and a spot height of ${sp11.value} m (reference ${six(sp11)}) lies near the river on the east. Calculate the relative height between them in metres.`,
  value: 182, tol: 0, unit: 'm',
  sol: `Relative height = ${sp9.value} − ${sp11.value} = 182 m.`,
  scheme: [['182 m', 1]],
  d: 2, c: 'application', t: [4],
}), () => sp9.value - sp11.value === 182 || 'relh');
add('hill-num', num({
  stem: `The triangulated height on the conical hill is ${trig1.value} m. The ground at the temple (${six(temple)}) is ${Math.round(T.height(temple.E, temple.N))} m. By how many metres does the summit stand above the temple?`,
  value: 326, tol: 0, unit: 'm',
  sol: `${trig1.value} − ${Math.round(T.height(temple.E, temple.N))} = 326 m.`,
  scheme: [['326 m', 1]],
  d: 2, c: 'application', t: [4],
}), () => trig1.value - Math.round(T.height(temple.E, temple.N)) === 326 || 'hill');
add('tri-fill', fill({
  stem: 'A height fixed by survey triangulation on a summit and shown by a black triangle is called a ___ height.',
  acc: [['triangulated', 'trigonometrical', 'trigonometric']],
  sol: '**Triangulated** height.',
  d: 1, c: 'recall', t: [4],
}));
add('height-ar', ar({
  a: 'The relative height between two points is found by subtracting the lower height from the higher height.',
  r: 'Relative height is the difference in height between the two points.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('spot-short1', short({
  marks: 1,
  stem: 'What does a black dot with a figure beside it show on a topographical sheet?',
  model: 'A spot height, the height of that point in metres above mean sea level.',
  sol: 'Spot height.',
  scheme: [['Spot height', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('ci-short1', short({
  marks: 1,
  stem: 'State the contour interval of the imagined practice sheet.',
  model: '20 m.',
  sol: '20 m.',
  scheme: [['20 m', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('tvs-short2', short({
  marks: 2,
  stem: 'Distinguish between a triangulated height and a spot height.',
  model: 'A triangulated height is a height fixed by the survey triangulation network on a summit or prominent point and marked by a black triangle. A spot height is a height measured on ordinary ground, such as a plain or junction, marked by a black dot.',
  sol: 'Triangle on a summit; dot on ordinary ground.',
  scheme: [['Triangulated height: summit, triangle', 1], ['Spot height: ordinary ground, dot', 1]],
  d: 1, c: 'understanding', t: [4],
}));
add('rel-short2', short({
  marks: 2,
  stem: `The triangulated heights on the imagined practice sheet are ${trig1.value} m on the conical hill and ${trig2.value} m on the ridge. Calculate the relative height between them and say which is higher.`,
  model: `${trig1.value} − ${trig2.value} = 80 m. The conical hill is higher by 80 m.`,
  sol: `80 m; the conical hill.`,
  scheme: [['80 m', 1], ['Conical hill is higher', 1]],
  d: 2, c: 'application', t: [4],
}), () => trig1.value - trig2.value === 80 || 'rel');

// ================================================================ 10-mark structured questions
add('long-grid', long({
  stem: `Study the extract of the imagined practice sheet (squares 4673 to 4875). (a) Give the four-figure grid reference of the square that contains the temple. [2]\n\n(b) Give the six-figure reference of the post office. [2]\n\n(c) Name the feature at reference ${six(w2)} and give its four-figure reference. [3]\n\n(d) Explain how you would find the feature at a six-figure reference such as ${six(temple)}, and name one common mistake. [3]`,
  model: `(a) The temple lies between easting lines 46 and 47 and northing lines 74 and 75: ${four(temple)}.\n\n(b) The post office: easting 46 and 8 tenths, northing 73 and 8 tenths: ${six(po)}.\n\n(c) A well (circle with a dot); its square is ${four(w2)}.\n\n(d) Split the six figures into an easting part (46 and 3 tenths) and a northing part (74 and 6 tenths), go to that point, read the symbol using the key: the temple. A common mistake is to write the northing before the easting, or to count the tenths from the wrong corner.`,
  sol: `${four(temple)}; ${six(po)}; well in ${four(w2)}; method and mistake.`,
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 2, c: 'application', t: [1], assets: [fBare],
}), () => four(temple) === '4674' && six(po) === '468738' && T.pointAtSix(six(w2)).kind === 'well' && four(w2) === '4673' || 'grid');
add('long-contour', long({
  stem: `Study the extract of the imagined practice sheet that shows a hill. (a) Define a contour. [2]\n\n(b) The 300 m and 400 m index contours have four thin contours between them. Calculate the contour interval, showing your working. [2]\n\n(c) State the height at X and calculate how far the summit stands above the 300 m contour. [3]\n\n(d) Describe the landform and explain what the spacing of its contours tells you about its slopes. [3]`,
  model: `(a) A contour is a line joining places of equal height above mean sea level.\n\n(b) Four lines make five gaps: 100 ÷ 5 = 20 m.\n\n(c) The height at X is ${trig1.value} m, so it stands ${trig1.value} − 300 = 178 m above the 300 m contour.\n\n(d) It is a conical hill: closed circular contours one inside another round the summit. The contours are close together on all sides, so the slopes are steep all round, and the top is small.`,
  sol: `Definition; 20 m; ${trig1.value} m and 178 m; conical hill, steep.`,
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 3, c: 'application', t: [2, 3, 4], assets: [fHillM],
}), () => trig1.value - 300 === 178 && 100 / 5 === 20 || 'hill');
add('long-esc', long({
  stem: `Study the extract and the cross-section of the escarpment on the imagined practice sheet. (a) Name the landform shown by the bunched contours. [2]\n\n(b) State the spot heights at its foot and at its top. [2]\n\n(c) Calculate the relative height of the escarpment and its average gradient, the foot and top being ${T.round1(T.dist(s1, s2))} km apart. [3]\n\n(d) Explain how the spacing of the contours and the shape of the cross-section show that the face is steep while the ground on either side is gentle. [3]`,
  model: `(a) An escarpment.\n\n(b) Foot: ${s2.value} m. Top: ${s1.value} m.\n\n(c) Relative height = ${s1.value} − ${s2.value} = 108 m. Gradient = 108 ÷ 1.3 = ${Math.round(gEsc)} m per km.\n\n(d) The contours are crowded along the face and the profile climbs sharply there. On either side the contours are widely spaced and the profile is nearly flat, so those areas are gentle.`,
  sol: `Escarpment; ${s2.value} and ${s1.value} m; 108 m and ${Math.round(gEsc)} m per km; spacing and profile.`,
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 3, c: 'analysis', t: [2, 3, 4], assets: [fEsc, fProfEsc],
}), () => Math.round(gEsc) === 83 && s1.value - s2.value === 108 || 'esc');
add('long-ridge', long({
  stem: `Study the extract of the imagined practice sheet that shows a ridge in the north-west. (a) Name the symbol and the height at the centre of the ridge. [2]\n\n(b) Calculate the relative height between this point and the summit of the conical hill (${trig1.value} m). [2]\n\n(c) Describe the shape of the contours of a ridge and state two differences from those of a conical hill. [3]\n\n(d) Explain how a ridge differs from an escarpment on a contour map. [3]`,
  model: `(a) A triangulated height (black triangle): ${trig2.value} m.\n\n(b) ${trig1.value} − ${trig2.value} = 80 m.\n\n(c) The contours of a ridge are long, narrow closed loops with a crest in the middle. A conical hill has roughly circular rings, and a small summit; a ridge is much longer than it is wide and has a crest rather than a point.\n\n(d) A ridge is steep on both long sides and falls away from a central crest; an escarpment has a single steep face with contours bunched along a line, a flat top on one side and gentle ground on the other.`,
  sol: `Triangulated height ${trig2.value} m; 80 m; shape; ridge versus escarpment.`,
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 3, c: 'analysis', t: [3, 4], assets: [fRidge],
}), () => trig1.value - trig2.value === 80 || 'ridge');
add('long-plain', long({
  stem: `Study the extracts of the gentle south-west plain and of the escarpment on the imagined practice sheet. (a) Name the type of slope on the plain and on the escarpment face. [2]\n\n(b) The southern plain falls ${pt('spot7').value - sp11.value} m between two spot heights ${T.round1(T.dist(pt('spot7'), sp11))} km apart. Calculate its average gradient. [2]\n\n(c) Compare it with the gradient of the escarpment (${Math.round(gEsc)} m per km) and say how many times steeper the escarpment is, to the nearest whole number. [3]\n\n(d) Explain how contours show the difference between the two. [3]`,
  model: `(a) The plain has a gentle slope; the escarpment face has a steep slope.\n\n(b) ${pt('spot7').value - sp11.value} ÷ ${T.round1(T.dist(pt('spot7'), sp11))} = ${gPlain} m per km.\n\n(c) ${Math.round(gEsc)} ÷ ${gPlain} = about ${Math.round(Math.round(gEsc) / gPlain)} times steeper.\n\n(d) On the plain the 20 m contours are far apart (few lines in a kilometre); on the escarpment they are crowded together, many lines in a short distance.`,
  sol: `Gentle and steep; ${gPlain} m per km; about ${Math.round(Math.round(gEsc) / gPlain)} times; spacing.`,
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 4, c: 'analysis', t: [2, 3], assets: [fGentle, fEsc],
}), () => gPlain === 14.8 && Math.round(Math.round(gEsc) / 14.8) === 6 || 'plain');
