// ICSE 10 Geography ch01 Topographical Maps: Grid References, Contours and Heights. Two decks on the ONE imagined practice sheet
// (topo.mjs). Part 1: the grid, four-figure and six-figure references, contours and contour interval, slope from spacing.
// Part 2: landforms (conical hill, ridge, escarpment, steep and gentle slopes), triangulated and spot heights, relative height.
// Every number below is computed from the module and asserted with fact().
import { sl, deck, table, flow, svgV } from './lib.mjs';
import * as T from './topo.mjs';
import { SHEET, GRIDX, HILL, RIDGE, ESC, PROF_ESC, PROF_HILL, PROF_GENTLE, fact } from './svgs.mjs';

const pt = (id) => T.POINTS.find((p) => p.id === id);
const temple = pt('temple1');
const po = pt('po1');
const ps = pt('ps1');
const w2 = pt('well2');
const dis = pt('disp1');
const w1 = pt('well1');
const trig1 = pt('trig1');
const trig2 = pt('trig2');
const s1 = pt('spot1');
const s2 = pt('spot2');
const IMG = 'Imagined practice sheet, not a real place and not a Survey of India sheet';
const sixS = (p) => `${T.sixFig(p.E, p.N).slice(0, 3)} ${T.sixFig(p.E, p.N).slice(3)}`;

fact(T.fourFig(temple.E, temple.N) === '4674' && T.sixFig(temple.E, temple.N) === '463746', 'deck1: the temple is in square 4674 with six-figure reference 463746');
fact(T.sixFig(dis.E, dis.N) === '431726' && T.sixFig(w1.E, w1.N) === '435728' && T.sixFig(po.E, po.N) === '468738', 'deck1: dispensary 431726, Sonakhedi well 435728, post office 468738');
const between = T.LEVELS.filter((L) => L > 200 && L < 300);
fact(between.join(',') === '220,240,260,280', 'deck1: four ordinary contours (220, 240, 260, 280) lie between the 200 m and 300 m index contours, so the interval is 100 / 5 = 20 m');
const gEsc = Math.round(T.gradientBetween(s2, s1));
const sp7 = pt('spot7');
const sp11 = pt('spot11');
const gFlat = Math.round(((sp7.value - sp11.value) / T.round1(T.dist(sp7, sp11))) * 10) / 10;
fact(s1.value - s2.value === 108 && gEsc === 83, `deck1/2: escarpment foot ${s2.value} m and top ${s1.value} m: 108 m in ${T.round1(T.dist(s1, s2))} km is about ${gEsc} m per km`);
fact(sp7.value === 131 && sp11.value === 91 && gFlat === 14.8, `deck1: two spot heights on the southern plain, 131 m and 91 m, ${T.round1(T.dist(sp7, sp11))} km apart: ${gFlat} m per km`);
fact(trig1.value === 478 && trig2.value === 398 && Math.round(T.height(temple.E, temple.N)) === 152, 'deck2: trig 478 m on the hill, 398 m on the ridge, ground at the temple 152 m');

const V = {
  sheet: svgV(SHEET, `Full imagined practice sheet with grid, contours, drainage, roads, settlements and land use. ${IMG}.`, `${IMG}`),
  grid: svgV(GRIDX, 'Extract of the imagined practice sheet showing squares 4673 to 4875 with a temple, a police station, a post office, a well, a river and a canal', `${IMG}`),
  hill: svgV(HILL, 'Extract of the imagined practice sheet showing closed brown contours rising to a triangulated height of 478 metres on a conical hill', `${IMG}`),
  ridge: svgV(RIDGE, 'Extract of the imagined practice sheet showing long, narrow closed contours of a ridge with a triangulated height of 398 metres', `${IMG}`),
  esc: svgV(ESC, 'Extract of the imagined practice sheet showing very closely spaced contours of an escarpment, with spot heights of 154 and 262 metres on either side', `${IMG}`),
  profEsc: svgV(PROF_ESC, 'Cross-section across the escarpment: gentle ground at 154 metres, a steep rise and a flat top at 262 metres', `${IMG}; vertical scale exaggerated`),
  profHill: svgV(PROF_HILL, 'South to north cross-section over the conical hill: ground rises steeply from about 180 metres to a summit of 478 metres and falls again', `${IMG}; vertical scale exaggerated`),
  profFlat: svgV(PROF_GENTLE, 'West to east cross-section across the gentle southern plain: heights change by only a few tens of metres in three kilometres', `${IMG}; vertical scale exaggerated`),
};

export const deck1 = deck({
  part: 1,
  title: 'Topographical Maps: Grid References, Contours and Heights, Part 1: The grid and contours',
  goals: [
    'Give the four-figure and six-figure grid reference of a feature, eastings first',
    'Name the feature at a given grid reference',
    'Define a contour and find the contour interval of a sheet',
    'Judge steep and gentle slopes from the spacing of contours',
  ],
  slides: [
    sl('title', 'Reading a topographical sheet', {
      b: 'A **topographical sheet** is a large-scale map of a small area. It shows relief, rivers, settlements, roads and land use in one picture. In the ICSE map paper you read a real Survey of India sheet. To practise, this chapter uses one **imagined practice sheet** that we built ourselves: it is **not a real place** and it is **not copied from any official sheet**.',
      v: table(['Item', 'Imagined practice sheet'], [['Grid', 'Eastings 40 to 50, northings 70 to 80 (100 squares of 1 km)'], ['Scale', '1 cm to 0.5 km (RF 1 : 50 000)'], ['Contour interval', '20 m'], ['Highest point', `${trig1.value} m (a triangulated height)`], ['Lowest ground', `about ${Math.round(T.H_MIN)} m, where the river leaves the sheet`]], 'Table of the grid, scale, contour interval and height range of the imagined practice sheet', IMG),
      n: 'A topographical sheet is a detailed map of a small area. It shows hills, rivers, villages, roads and fields all at once. In the exam you will read a real sheet from the Survey of India. For practice we use one imagined sheet that we built ourselves. It is not a real place, and every answer in this chapter is worked out from its own data.',
    }),
    sl('concept', 'The grid: eastings and northings', {
      b: 'Grid lines divide the sheet into squares of **1 km by 1 km**; on a printed sheet at 1 cm to 0.5 km each square is **2 cm by 2 cm**. The **vertical lines** are **eastings** and are numbered along the top and bottom edges; the numbers increase towards the east. The **horizontal lines** are **northings**, numbered along the left and right edges; the numbers increase towards the north. Here the eastings run from 40 to 50 and the northings from 70 to 80.',
      v: V.sheet,
      n: 'Look at the grid first. Vertical lines are called eastings, and their numbers grow as you move east. Horizontal lines are called northings, and their numbers grow as you move north. Each square is one kilometre by one kilometre. On this imagined sheet the eastings run from forty to fifty and the northings from seventy to eighty.',
    }),
    sl('concept', 'Four-figure grid references', {
      b: `A **four-figure reference** names one grid square. Rule: read the **easting first** (along the bottom), then the **northing** (up the side), using the two lines that meet at the **south-west (bottom-left) corner** of the square. Remember it as "along the corridor, then up the stairs". The temple lies between easting lines 46 and 47 and between northing lines 74 and 75, so it is in square **4674**.`,
      v: V.grid,
      n: 'A four figure reference names a whole square. Always read the easting first, along the bottom, and then the northing, up the side. Use the two lines that meet at the bottom left corner of the square. The temple lies just right of line forty six and just above line seventy four, so it is in square four six seven four.',
    }),
    sl('concept', 'Six-figure grid references', {
      b: `To pinpoint a point feature, imagine each side of the square divided into **ten equal parts (tenths, of 0.1 km)**. The six figures are: easting (2 digits) + tenths eastwards (1 digit), then northing (2 digits) + tenths northwards (1 digit). The temple is 3 tenths east of line 46 and 6 tenths north of line 74, so its six-figure reference is **${T.sixFig(temple.E, temple.N)}**.`,
      v: table(['Feature', 'Easting and tenths', 'Northing and tenths', 'Six-figure reference'], [['Temple', '46 and 3', '74 and 6', T.sixFig(temple.E, temple.N)], ['Police station', '46 and 4', '73 and 7', T.sixFig(ps.E, ps.N)], ['Well near Nandiwadi', '46 and 9', '73 and 2', T.sixFig(w2.E, w2.N)]], 'Table showing how the six-figure references of a temple, a police station and a well are built from easting, northing and tenths', IMG),
      n: 'For a point feature we need six figures. Divide each side of the square into ten equal parts. Write the easting number, then how many tenths east of it the feature lies, then the northing number and its tenths. The temple is three tenths east of line forty six and six tenths north of line seventy four, so its reference is four six three seven four six.',
    }),
    sl('example', 'Worked example: a reference for the dispensary', {
      b: `**Problem.** Give the four-figure and the six-figure reference of the dispensary (Dis) in Sonakhedi.\n\n**Step 1.** Find the easting line just west of it: **43**. The dispensary is about 1 tenth east of it (0.15 km).\n\n**Step 2.** Find the northing line just south of it: **72**. It is about 6 tenths north of it (0.62 km).\n\n**Step 3.** Four-figure reference: **4372**. Six-figure reference: 43 + 1 and 72 + 6 gives **${T.sixFig(dis.E, dis.N)}**.`,
      v: flow('LR', [['a', 'Easting line west of feature: 43'], ['b', 'Tenths east: 1'], ['c', 'Northing line south of feature: 72'], ['d', 'Tenths north: 6'], ['e', 'Six-figure reference 431726']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow of the steps for writing the six-figure reference of the dispensary', IMG),
      n: 'Let us find the reference of the dispensary. The easting line just to its west is forty three, and the dispensary is about one tenth east of it. The northing line just below it is seventy two, and it is about six tenths above that line. So the four figure reference is four three seven two, and the six figure reference is four three one seven two six.',
    }),
    sl('check', 'Quick check: six-figure references', {
      b: 'Build a six-figure reference from easting, northing and tenths.',
      n: 'Quick check. Remember: easting first, then northing, and tenths come from the bottom left corner.',
      chk: 'grid-chk',
    }),
    sl('concept', 'Finding the feature at a reference', {
      b: `To name the feature at a given reference, reverse the steps: split the number into easting and northing, go to that point, and read the symbol using the key. For **${T.sixFig(po.E, po.N)}**: easting 46 and 8 tenths, northing 73 and 8 tenths gives the **post office** at the edge of Nandiwadi.`,
      v: table(['Reference', 'Square', 'Feature at that point'], [[T.sixFig(temple.E, temple.N), '4674', 'Temple'], [T.sixFig(ps.E, ps.N), '4673', 'Police station'], [T.sixFig(po.E, po.N), '4673', 'Post office'], [T.sixFig(w2.E, w2.N), '4673', 'Well']], 'Table of four six-figure references on the imagined sheet and the feature found at each', IMG),
      n: 'To find what lies at a reference, work backwards. Split the six figures into the easting part and the northing part, go to that point on the sheet, and read the symbol using the key. Four six eight seven three eight leads to the post office on the edge of Nandiwadi. Always check that you did not swap the two halves.',
    }),
    sl('diagram', 'Contours and the contour interval', {
      b: 'A **contour** is an imaginary line joining places of **equal height** above mean sea level; on the sheet it is a thin **brown** line. The **contour interval** is the constant difference in height between two neighbouring contours: **20 m** here. Every fifth line is an **index contour** (100 m, 200 m, 300 m, 400 m), drawn thicker and labelled with its height.',
      v: V.hill,
      n: 'A contour is a line joining places of equal height. On our sheet contours are thin brown lines. The difference in height between two neighbouring contours is the contour interval, which is twenty metres here. Every fifth contour is thicker and carries a number. These are the index contours, at one hundred, two hundred, three hundred and four hundred metres.',
    }),
    sl('example', 'Worked example: finding the contour interval', {
      b: `**Problem.** The index contours marked 200 and 300 are the only two numbered lines near a slope. How would you find the contour interval?\n\n**Step 1.** Count the thin lines between them: **${between.length}** (they stand for ${between.join(', ')} m).\n\n**Step 2.** The gap of 100 m is divided into ${between.length} + 1 = ${between.length + 1} equal intervals.\n\n**Step 3.** Interval = 100 ÷ ${between.length + 1} = **20 m**.`,
      v: flow('LR', [['a', 'Two index contours: 200 m and 300 m'], ['b', 'Count lines between: 4'], ['c', 'Number of gaps: 5'], ['d', '100 m divided by 5: 20 m']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of the steps for finding the contour interval from two index contours', IMG),
      n: 'To find the contour interval, take two labelled contours, such as two hundred metres and three hundred metres. Count the thin lines between them. There are four. Four lines make five gaps, so divide the difference of one hundred metres by five. The contour interval is twenty metres.',
    }),
    sl('check', 'Quick check: contour interval', {
      b: 'Find the contour interval from two neighbouring contours.',
      n: 'Quick check. The interval is the height difference between two neighbouring contours.',
      chk: 'ci-chk',
    }),
    sl('concept', 'Spacing of contours shows the slope', {
      b: `**Close** contours mean a **steep** slope (height changes quickly over a short distance). **Widely spaced** contours mean a **gentle** slope. **Evenly spaced** lines mean a uniform slope. You can measure it: average gradient = height difference ÷ distance. On the sheet, the escarpment rises ${s1.value - s2.value} m in ${T.round1(T.dist(s1, s2))} km (about ${gEsc} m per km); the southern plain changes only ${sp7.value - sp11.value} m in ${T.round1(T.dist(sp7, sp11))} km (about ${gFlat} m per km).`,
      v: table(['Place on the sheet', 'Height difference', 'Distance', 'Average gradient'], [['Escarpment, foot to top', `${s1.value - s2.value} m`, `${T.round1(T.dist(s1, s2))} km`, `${gEsc} m per km`], ['Southern plain', `${sp7.value - sp11.value} m`, `${T.round1(T.dist(sp7, sp11))} km`, `${gFlat} m per km`]], 'Table comparing the average gradient of the escarpment and the southern plain of the imagined sheet', IMG),
      n: 'Contours show slope. When the lines are close together the ground rises quickly, so the slope is steep. When they are far apart the ground rises slowly, so the slope is gentle. You can even measure it by dividing the height difference by the distance. On our sheet the escarpment is much steeper than the southern plain.',
    }),
    sl('diagram', 'A cross-section makes the slope visible', {
      b: 'A **cross-section** (profile) is drawn by reading heights along a line. This one runs west to east across the escarpment: the ground is **gentle** at the foot (154 m), **steep** in the middle where the contours are bunched, and **flat** again at the top (262 m). Vertical scale is exaggerated.',
      v: V.profEsc,
      n: 'This cross section was drawn by reading heights along one line across the escarpment. On the left the ground is nearly flat. In the middle it climbs steeply, and this is where the contours on the map are bunched together. On the right the top is flat again. The vertical scale is exaggerated so the shape is easy to see.',
    }),
    sl('check', 'Quick check: spacing and slope', {
      b: 'Link contour spacing to steepness of slope.',
      n: 'Quick check. Close contours mean a steep slope; wide spacing means a gentle slope.',
      chk: 'spacing-chk',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Eastings are vertical lines numbered west to east; northings are horizontal lines numbered south to north.',
        'Four-figure reference: easting first, then northing, from the south-west corner of the square.',
        'Six-figure reference: add tenths of the square, easting digits first (temple 463746).',
        'A contour joins equal heights; the contour interval here is 20 m; index contours are every 100 m.',
        'Close contours: steep slope. Wide contours: gentle slope.',
      ],
      v: table(['Idea', 'Rule'], [['Four figures', 'Easting, northing: the square'], ['Six figures', 'Add tenths: the point'], ['Interval', 'Height difference of neighbouring contours'], ['Slope', 'Close lines steep, wide lines gentle']], 'Summary table of grid references, contour interval and slope', IMG),
      n: 'Let us sum up Part 1. Eastings are the vertical lines and northings the horizontal ones. Always read the easting first. Four figures name a square and six figures name a point. A contour joins places of equal height, and the contour interval on our sheet is twenty metres. Close contours mean a steep slope, and wide contours mean a gentle slope.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Write the reference as digits only, with no brackets, and give easting before northing.',
        'Use the lines at the SOUTH-WEST corner of the square; do not read the north-east corner.',
        'Show the count of contours when you work out the interval.',
        'Say "contours are close together" when you explain a steep slope, and name the place.',
      ],
      v: table(['Slip', 'Fix'], [['Northing before easting', 'Along the corridor first, then up the stairs'], ['Reading tenths from the top right', 'Tenths come from the bottom left'], ['Dividing by the number of lines', 'Divide by the number of gaps, one more than the lines']], 'Table of three common slips with grid references and contour interval, and their fixes', IMG),
      n: 'Some tips for the paper. Write only digits in a grid reference, easting first. Use the bottom left corner of the square. When you find the contour interval, count the gaps between contours, not the lines. And when you explain a steep slope, say that the contours are close together and name the place you mean.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Topographical Maps: Grid References, Contours and Heights, Part 2: Landforms and heights',
  goals: [
    'Recognise a conical hill, a ridge, an escarpment, and steep and gentle slopes from their contours',
    'Distinguish a triangulated height from a spot height',
    'Calculate relative height and relative depth between two points',
  ],
  slides: [
    sl('title', 'Landforms hidden in the contours', {
      b: 'Contours let you see **landforms** on a flat sheet. On our imagined sheet you can find a **conical hill** in the north, a **ridge** in the north-west, an **escarpment** in the east, a **river valley** running south-east and a **gentle plain** in the south and south-west. This part shows how to read each one.',
      v: table(['Landform', 'Where on the imagined sheet'], [['Conical hill', 'Squares 4678 and 4679, summit 478 m'], ['Ridge', 'Squares 4177 to 4378, crest 398 m'], ['Escarpment', 'Squares 4875 and 4975'], ['Gentle plain', 'South and south-west, squares 4270 to 4572']], 'Table of four landforms of the imagined sheet and the squares where they lie', IMG),
      n: 'Contours turn a flat sheet into a landscape. On our imagined sheet there is a conical hill in the north, a long ridge in the north west, and an escarpment in the east. The south and south west form a gentle plain. In this part we learn to recognise each of these from the pattern of the contours.',
    }),
    sl('concept', 'Landforms and their contour patterns', {
      b: '**Conical hill:** closed, roughly circular contours, one inside another, with a summit in the middle. **Ridge:** long, narrow closed contours or a long crest with slopes falling on both sides. **Escarpment:** contours crowded together along a line (a long steep face) with widely spaced lines on one side and a flat top on the other. **Steep slope:** close contours. **Gentle slope:** wide spacing. **Valley:** V-shaped bends pointing to higher ground.',
      v: table(['Landform', 'Contour pattern'], [['Conical hill', 'Concentric closed rings, steep on all sides'], ['Ridge', 'Elongated closed contours, crest in the middle'], ['Escarpment', 'Contours bunched along one line'], ['Steep slope', 'Close contours'], ['Gentle slope', 'Wide spacing']], 'Table of landforms and the contour pattern that shows each', IMG),
      n: 'Here is the code. A conical hill shows as closed rings, one inside another, with the summit in the middle. A ridge is a long narrow set of closed contours. An escarpment is a line along which many contours are crowded together. Close contours are a steep slope, and wide spacing is a gentle slope. A valley shows as bends that point to higher ground.',
    }),
    sl('diagram', 'The conical hill', {
      b: `The extract shows concentric closed contours around a triangulated height of **${trig1.value} m** near easting 46, northing 78. Notice how the lines are **evenly crowded on every side**: the slopes are steep in all directions, and the top is small. The 300 m index contour encloses the summit, so the hill rises about ${trig1.value - 300} m above it.`,
      v: V.hill,
      n: 'This is the conical hill. The contours form closed rings, one inside another, round a small summit with a triangulated height of four hundred and seventy eight metres. The rings are close together on every side, so the slopes are steep in all directions. The three hundred metre contour encloses the summit, so the hill rises a further one hundred seventy eight metres above that line.',
    }),
    sl('diagram', 'The ridge', {
      b: `The ridge in the north-west is a **long, narrow** upland. Its contours are stretched into long loops, and its crest carries a triangulated height of **${trig2.value} m**. The slopes on the two long sides are steep; the crest is nearly level for about 2 km. Notice that the ridge is **lower** than the conical hill, and that a lower saddle lies between the two.`,
      v: V.ridge,
      n: 'Now the ridge in the north west. Its contours are stretched into long narrow loops, so the landform is long and narrow rather than round. The crest has a triangulated height of three hundred and ninety eight metres. The two long sides are steep, and the crest is nearly level. It is lower than the conical hill we just studied.',
    }),
    sl('check', 'Quick check: recognising a landform', {
      b: 'Name the landform from its contour pattern.',
      n: 'Quick check. Concentric closed rings with a summit in the middle show a conical hill.',
      chk: 'landform-chk',
    }),
    sl('diagram', 'The escarpment', {
      b: `An **escarpment** is a long, steep face that separates a higher flat area from lower ground. On the extract, contours are **bunched** between easting 48 and 49, then **spread out** on the flat top to the east. The foot is at ${s2.value} m and the top at ${s1.value} m, so the face is about ${s1.value - s2.value} m high.`,
      v: V.esc,
      n: 'This is the escarpment in the east. Many contours are bunched together along a line, which shows a long steep face. To the west the ground is gentle, and to the east the top is flat again, with widely spaced lines. The foot is at one hundred and fifty four metres, and the top is at two hundred and sixty two.',
    }),
    sl('example', 'Worked example: naming landforms from descriptions', {
      b: '**Problem.** Name the landform in each description.\n\n**(a)** Closed, nearly circular contours, one inside another, with a triangulated height at the centre. **Conical hill.**\n\n**(b)** Contours bunched along a line for 2 km; to the east they open out at about 260 m. **Escarpment** (steep face and a flat top).\n\n**(c)** Long narrow loops with the highest value in the middle; the slopes on both long sides are steep. **Ridge.**',
      v: table(['Description', 'Landform', 'Reason'], [['Concentric rings, summit marked', 'Conical hill', 'Steep on all sides'], ['Bunched lines, then widely spaced', 'Escarpment', 'Steep face, flat top'], ['Long narrow loops', 'Ridge', 'Elongated crest']], 'Table of three contour descriptions with the landform and the reason for each', IMG),
      n: 'Let us name some landforms. Closed circular contours, one inside another, with a triangulated height at the centre, show a conical hill. Contours bunched along a line, with wide spacing beyond, show an escarpment. Long narrow loops with the highest value in the middle show a ridge. Always give the reason along with the name.',
    }),
    sl('check', 'Quick check: ridge or escarpment', {
      b: 'Tell a ridge from an escarpment.',
      n: 'Quick check. A ridge has steep sides on both long edges; an escarpment is steep on one side only.',
      chk: 'ridge-chk',
    }),
    sl('concept', 'Reading the hill from a cross-section', {
      b: `The cross-section runs south to north along easting 46.05 over the conical hill. Heights climb from about ${Math.round(T.height(46.05, 76.0) / 10) * 10} m at northing 76 to the summit of **${trig1.value} m** at northing 78.45 and fall again. The **steepest** stretches are the flanks where contours crowd; near the top the ground flattens.`,
      v: V.profHill,
      n: 'Here is a cross section drawn over the conical hill from south to north. The ground climbs from about one hundred and eighty metres to the summit at four hundred and seventy eight metres and then falls away again. The steepest parts are the flanks, where the contours on the map are crowded, and the very top is rounded and flatter.',
    }),
    sl('concept', 'Triangulated heights and spot heights', {
      b: `A **triangulated height** (black triangle with a figure) is a point fixed by the survey's triangulation network on a **summit or prominent point**; it is the most accurate height. A **spot height** (black dot with a figure) is a height measured at an ordinary place, such as a road junction or a plain, to fill gaps between contours. Both give height in **metres above mean sea level**. The summit triangle here reads ${trig1.value}; spot heights read ${s2.value}, ${s1.value} and others.`,
      v: table(['', 'Triangulated height', 'Spot height'], [['Symbol', 'Black triangle with a number', 'Black dot with a number'], ['Where', 'Summits and survey stations', 'Plains, junctions, gaps between contours'], ['On this sheet', `${trig1.value} m (hill) and ${trig2.value} m (ridge)`, 'Eleven spot heights (for example 154 m and 262 m)']], 'Table comparing a triangulated height with a spot height', IMG),
      n: 'Two symbols give exact heights. A triangulated height is a black triangle with a number. It marks a summit or survey station and is the most accurate. A spot height is a black dot with a number, placed on ordinary ground such as a plain or a junction to fill the gaps between contours. Both give the height in metres above mean sea level.',
    }),
    sl('example', 'Worked example: relative height of the escarpment', {
      b: `**Problem.** Find the relative height of the escarpment from the spot heights at its top (${s1.value} m, reference ${T.sixFig(s1.E, s1.N)}) and its foot (${s2.value} m, reference ${T.sixFig(s2.E, s2.N)}).\n\n**Step 1.** Higher point: ${s1.value} m. Lower point: ${s2.value} m.\n\n**Step 2.** Relative height = ${s1.value} − ${s2.value} = **${s1.value - s2.value} m**.\n\nSo the top is 108 m higher than the foot; the foot is 108 m lower than the top (a relative **depth** if you look from the top).`,
      v: V.profEsc,
      n: 'Relative height is the difference in height between two points. The spot height at the top of the escarpment is two hundred and sixty two metres, and at the foot it is one hundred and fifty four. Subtract the smaller from the larger, and the escarpment is one hundred and eight metres high. Seen from the top, the foot is one hundred and eight metres lower.',
    }),
    sl('concept', 'Relative height and relative depth', {
      b: `**Relative height** = height of the higher point − height of the lower point. **Relative depth** is the same difference, measured downwards from the higher point (for example the depth of a valley below a ridge). Never add the two heights. Example: the summit (${trig1.value} m) stands ${trig1.value - Math.round(T.height(temple.E, temple.N))} m above the temple, whose ground height is ${Math.round(T.height(temple.E, temple.N))} m.`,
      v: table(['From', 'To', 'Calculation', 'Result'], [['Temple ground', 'Hill summit', `${trig1.value} − ${Math.round(T.height(temple.E, temple.N))}`, `${trig1.value - Math.round(T.height(temple.E, temple.N))} m higher`], ['Escarpment top', 'Escarpment foot', `${s1.value} − ${s2.value}`, '108 m lower'], ['Hill summit', 'Ridge crest', `${trig1.value} − ${trig2.value}`, `${trig1.value - trig2.value} m higher`]], 'Table of three relative height calculations on the imagined sheet', IMG),
      n: 'Relative height is found by subtracting the lower height from the higher one. Relative depth is the same number, measured downwards. Never add the two heights together. For example the summit is four hundred and seventy eight metres and the ground at the temple is one hundred and fifty two metres, so the summit stands three hundred and twenty six metres higher.',
    }),
    sl('check', 'Quick check: triangulated and spot heights', {
      b: 'Identify a triangulated height or a spot height by its symbol.',
      n: 'Quick check. A black triangle with a number is a triangulated height.',
      chk: 'spot-chk',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Conical hill: concentric closed contours; ridge: long narrow closed contours; escarpment: contours bunched along a line.',
        'Steep slope: close contours; gentle slope: wide spacing; check with height difference divided by distance.',
        'Triangulated height: black triangle on a summit; spot height: black dot on ordinary ground.',
        'Relative height: higher minus lower (never the sum).',
      ],
      v: table(['Landform', 'Sheet example'], [['Conical hill', '478 m summit'], ['Ridge', '398 m crest'], ['Escarpment', '108 m face']], 'Summary table of three landforms and their heights on the imagined sheet', IMG),
      n: 'Let us sum up Part 2. A conical hill shows as closed rings, a ridge as long narrow loops, and an escarpment as contours bunched along a line. Steep slopes have close contours and gentle slopes have wide ones. A triangulated height is a triangle, a spot height is a dot, and relative height is the higher value minus the lower one.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Name the landform, then give the evidence: the shape and spacing of the contours.',
        'Quote the heights with the unit (m) and the grid reference of the point.',
        'For relative height, write the subtraction.',
        'If asked to sketch, draw the contours first and label the highest value.',
      ],
      v: table(['Slip', 'Fix'], [['Calling a ridge a hill', 'Check whether the loops are long and narrow'], ['Adding two heights', 'Subtract the smaller from the larger'], ['Forgetting the unit', 'Always write metres']], 'Table of three common slips in reading landforms and heights, and their fixes', IMG),
      n: 'Final tips. Name the landform and give your evidence from the contours. Quote heights with the unit and the grid reference. For relative height, show the subtraction. If you are asked to sketch a landform, draw the contours first and label the highest value. These small habits earn marks in the map question.',
    }),
  ],
});
