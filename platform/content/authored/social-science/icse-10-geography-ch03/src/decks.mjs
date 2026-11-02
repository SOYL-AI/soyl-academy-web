// ICSE 10 Geography ch03 Topographical Maps: Settlements, Land Use, Transport and Drainage. Two decks on the ONE imagined practice sheet
// (topo.mjs). Part 1: sites and services of settlements, land use and what it says about occupations, transport and communication.
// Part 2: direction of flow and drainage patterns (dendritic on the sheet; trellis and radial as separate schematics), clustered and
// dispersed settlement, natural and man-made features. Every number is computed from the module and asserted with fact().
import { sl, deck, table, flow, svgV } from './lib.mjs';
import * as T from './topo.mjs';
import { SHEET, SETT, SITE, NAND, LU_SOUTH, LU_NORTH, LU_WEST, TRANS, TRANS_LINES, DRAIN, FLOW_R, FLOW_T, CLUST, DISP, MAN, DEND, TRELLIS, RADIAL, FEAT, X140, X100, siteInfo, lenKm, fact } from './svgs.mjs';

const IMG = 'Imagined practice sheet, not a real place and not a Survey of India sheet';
const km2 = (x) => (Math.round(x * 100) / 100).toFixed(2);
const km1 = (x) => (Math.round(x * 10) / 10).toFixed(1);
const nand = FEAT.nandiwadi;
const sona = FEAT.sonakhedi;
const path = FEAT.pathrali;
const sN = siteInfo(nand);
const sS = siteInfo(sona);
const sP = siteInfo(path);
const svc = (v) => T.servicesOf(v).sort().join('+');
const nnV = (id) => T.nnMean(T.VILLAGES.find((v) => v.id === id).huts);
const dispW = T.allHuts().filter((h) => h.E >= 40 && h.E < 44 && h.N >= 74 && h.N < 77);
const mainS = T.stream('main');
const mainDir = T.flowDirection('main');
const t1 = T.stream('t1');

fact(svc(nand) === 'po+ps' && svc(sona) === 'disp' && svc(path) === '', 'deck1: Nandiwadi has a post office and a police station, Sonakhedi a dispensary, Pathrali none');
fact(sN.road[1] === 'metalled' && sN.road[2] < 0.15 && sS.road[1] === 'metalled' && sS.road[2] < 0.05 && sP.water[0][1] === 'well' && sP.water.some((w) => w[1] === 'stream' && w[2] < 0.6), 'deck1: Nandiwadi and Sonakhedi lie on the metalled road; Pathrali lies within 0.6 km of a stream and within 0.5 km of a well');
fact(sS.water.find((w) => w[1] === 'tank')[2] < 0.8 && sS.water.find((w) => w[1] === 'well')[2] < 0.7, 'deck1: Sonakhedi has a tank within 0.8 km and a well within 0.7 km');
fact(sN.slope < 60 && sS.slope < 60 && sP.slope < 60, 'deck1: all three villages stand on gentle ground (under 60 m per km)');
fact(km1(lenKm('metalled')) === '10.9' && km1(lenKm('unmetalled')) === '5.1' && km1(lenKm('cart')) === '6.8' && km1(lenKm('pack')) === '3.1' && km1(lenKm('foot')) === '2.5' && km1(lenKm('canal')) === '4.0', 'deck1: lengths of roads and tracks on the sheet: metalled 10.9 km, unmetalled 5.1, cart tracks 6.8, pack track 3.1, footpaths 2.5, canal 4.0');
const lc = { cult: 0, scrub: 0, forest: 0, water: 0 };
for (let e = 40; e < 50; e++) for (let n = 70; n < 80; n++) { const m = T.landMix(`${e}${n}`); for (const k of Object.keys(lc)) lc[k] += m[k]; }
const pc = (k) => Math.round(lc[k] / 100);
fact(pc('cult') === 45 && pc('scrub') === 33 && pc('forest') === 22, 'deck1: cultivated 45 percent, open scrub 33 percent and forest 22 percent of the sheet');
fact(T.landMix('4672').cult === 100 && T.landMix('4678').forest === 100 && T.landMix('4075').scrub === 100, 'deck1: square 4672 is wholly cultivated, 4678 wholly forest and 4075 wholly open scrub');
fact(T.directionOf({ E: X140.E, N: X140.N }, { E: X100.E, N: X100.N }) === 'south-east' && mainDir === 'south-east' && T.compassMargin(T.bearing({ E: mainS.pts[0][0], N: mainS.pts[0][1] }, { E: mainS.pts.at(-1)[0], N: mainS.pts.at(-1)[1] })) > 8, `deck2: the main river flows ${mainDir} (from ${Math.round(T.height(...mainS.pts[0]))} m to ${Math.round(T.height(...mainS.pts.at(-1)))} m); from the 140 m to the 100 m crossing it flows south-east`);
fact(T.flowDirection('t1') === 'east', 'deck2: stream T1 flows east into the main river');
fact(nnV('nandiwadi') < 0.12 && nnV('sonakhedi') < 0.12 && nnV('pathrali') < 0.12 && T.nnMean(dispW) > 0.8 && dispW.length === 3, `deck2: mean nearest-neighbour distance of huts is about 0.1 km in each village but ${km1(T.nnMean(dispW))} km among the ${dispW.length} dispersed huts of the north-west`);

const V = {
  sheet: svgV(SHEET, `Full imagined practice sheet with its key. ${IMG}.`, IMG),
  sett: svgV(SETT, 'Extract of the imagined practice sheet showing the villages of Pathrali and Nandiwadi, with the metalled road, unmetalled road, a canal and a river', IMG),
  site: svgV(SITE, 'Extract of the imagined practice sheet showing Sonakhedi beside a tank with an embankment, a well and a metalled road', IMG),
  nand: svgV(NAND, 'Extract of the imagined practice sheet showing the huts of Nandiwadi with a post office and a police station, a well and a metalled road', IMG),
  luSouth: svgV(LU_SOUTH, 'Extract of the imagined practice sheet showing yellow cultivated land with a tank and part of Sonakhedi', IMG),
  luNorth: svgV(LU_NORTH, 'Extract of the imagined practice sheet showing green forest on a conical hill with white open scrub below it', IMG),
  luWest: svgV(LU_WEST, 'Extract of the imagined practice sheet showing white open scrub in the west with three scattered huts', IMG),
  transLines: svgV(TRANS_LINES, 'Extract of the imagined practice sheet showing a metalled road, unmetalled road, cart track, footpaths, a bridge, a canal and streams', IMG),
  trans: svgV(TRANS, 'Extract of the imagined practice sheet showing the road links between Sonakhedi, Pathrali and Nandiwadi', IMG),
  drain: svgV(DRAIN, 'Extract of the imagined practice sheet showing a main river with two tributaries that join it at acute angles', IMG),
  flowR: svgV(FLOW_R, 'Extract of the imagined practice sheet with two points P and Q marked where the river crosses contours', IMG),
  flowT: svgV(FLOW_T, 'Extract of the imagined practice sheet with the start A and the end B of a tributary marked', IMG),
  clust: svgV(CLUST, 'Extract of the imagined practice sheet showing the clustered huts of Nandiwadi', IMG),
  disp: svgV(DISP, 'Extract of the imagined practice sheet showing three dispersed huts on open scrub', IMG),
  man: svgV(MAN, 'Extract of the imagined practice sheet showing a river, a canal, a bridge, roads, huts, a temple and wells', IMG),
  dend: svgV(DEND, 'Schematic of a dendritic drainage pattern', 'Schematic, not from the sheet'),
  trellis: svgV(TRELLIS, 'Schematic of a trellis drainage pattern', 'Schematic, not from the sheet'),
  radial: svgV(RADIAL, 'Schematic of a radial drainage pattern', 'Schematic, not from the sheet'),
};

export const deck1 = deck({
  part: 1,
  title: 'Topographical Maps: Settlements, Land Use, Transport and Drainage, Part 1: Settlements, land use and transport',
  goals: [
    'Identify settlements and the services they offer, and give reasons for the site of a settlement',
    'Identify cultivated land, open scrub and forest and infer the occupations of the people',
    'Identify the types of roads and tracks and the means of communication',
  ],
  slides: [
    sl('title', 'What a sheet tells us about people', {
      b: 'A topographical sheet shows more than hills and rivers: it shows **where people live**, **how they use the land**, **how they move** and **where water drains**. This chapter reads all four on our **imagined practice sheet** (not a real place, not a Survey of India sheet). Part 1 is about **settlements, land use and transport**.',
      v: table(['Village', 'Services on the sheet'], [['Nandiwadi', 'Post office and police station'], ['Sonakhedi', 'Dispensary'], ['Pathrali', 'None shown']], 'Table of the three villages of the imagined sheet and the services shown at each', IMG),
      n: 'A topographical sheet tells us about people as well as hills. It shows where they live, how they use the land, how they travel and where the water drains. In this chapter we read all of that on our imagined practice sheet. Part one covers settlements, land use and transport. Our three villages are Nandiwadi, Sonakhedi and Pathrali.',
    }),
    sl('concept', 'Where do settlements grow? The site', {
      b: 'The **site** is the exact spot where a settlement stands. Villages grow where there is **water** (stream, tank, well), **gentle, fertile land** for fields, a **road or track** for trade, and safety from floods and steep slopes. On the sheet all three villages stand on **gentle ground** (under 60 m of fall per km) near water and a track.',
      v: table(['Village', 'Nearest road or track', 'Nearest water', 'Slope'], [['Nandiwadi', `Metalled road, ${km2(sN.road[2])} km`, `Well, ${km2(sN.water[0][2])} km`, `${Math.round(sN.slope)} m per km`], ['Sonakhedi', `Metalled road, ${km2(sS.road[2])} km`, `Well ${km2(sS.water[0][2])} km, tank ${km2(sS.water.find((w) => w[1] === 'tank')[2])} km`, `${Math.round(sS.slope)} m per km`], ['Pathrali', `Footpath, ${km2(sP.road[2])} km`, `Well ${km2(sP.water[0][2])} km, stream ${km2(sP.water.find((w) => w[1] === 'stream')[2])} km`, `${Math.round(sP.slope)} m per km`]], 'Table of the site factors of the three villages: nearest road or track, nearest water and slope, computed from the sheet', IMG),
      n: 'The site of a settlement is the exact spot where it stands. People choose a spot with water, gentle fertile land and a road or track. On our sheet all three villages stand on gentle ground. Nandiwadi and Sonakhedi are right beside the metalled road, and each has a well close by. Pathrali is near a stream and a well.',
    }),
    sl('diagram', 'Three villages on the sheet', {
      b: 'In this extract you can see **Pathrali** near a stream and a well, with footpaths and an unmetalled road, and **Nandiwadi** beside the metalled road with a canal nearby. Each village is a **cluster of huts** (small black squares) with its name in bold. Look at how roads and water lie close to the huts.',
      v: V.sett,
      n: 'Here are two of our villages. Pathrali stands near a stream and a well, and footpaths and an unmetalled road lead to it. Nandiwadi lies beside the metalled road, with a canal not far away. Each village is a cluster of small black squares, which are huts, and its name is printed in bold letters beside it.',
    }),
    sl('concept', 'Services in a settlement', {
      b: 'Services are shown by letters beside a small black square: **PO** (post office), **PS** (police station) and **Dis** (dispensary). A settlement with several services is a **service centre** for nearby villages. On the sheet **Nandiwadi** has a PO and a PS, **Sonakhedi** has a dispensary and **Pathrali** shows none, so Pathrali people must travel to the others.',
      v: V.nand,
      n: 'Services are shown by letters next to a small black square. P O is a post office, P S is a police station and Dis is a dispensary. A village that has several services serves its neighbours too. On our sheet Nandiwadi has a post office and a police station, Sonakhedi has a dispensary, and Pathrali has none shown.',
    }),
    sl('example', 'Worked example: why is Sonakhedi sited there?', {
      b: `**Problem.** Give geographical reasons for the site of Sonakhedi.\n\n**Step 1 (water).** A tank lies ${km2(sS.water.find((w) => w[1] === 'tank')[2])} km away and a well ${km2(sS.water[0][2])} km away.\n\n**Step 2 (land).** It stands on gentle ground (${Math.round(sS.slope)} m per km) in the middle of yellow cultivated land.\n\n**Step 3 (communication).** The metalled road runs through it, and an unmetalled road and a cart track branch off.\n\n**Answer.** Water supply, fertile gentle land for farming and a road link.`,
      v: V.site,
      n: 'Let us give reasons for the site of Sonakhedi. First, water: a tank and a well lie within a short walk. Second, land: the village stands on gently sloping ground in the middle of cultivated fields. Third, communication: the metalled road runs through the village, with an unmetalled road and a cart track branching off. These three reasons together explain the site.',
    }),
    sl('check', 'Quick check: site of a settlement', {
      b: 'Give a reason for the site of a settlement.',
      n: 'Quick check. Think of water, gentle land and a road.',
      chk: 'site-chk',
    }),
    sl('concept', 'Land use and land cover', {
      b: `**Land use** is how the land is used; the sheet shows it by tint. **Yellow:** cultivated land (${pc('cult')}% of the imagined sheet). **Green:** forest (${pc('forest')}%). **White with small green ticks:** open scrub, uncultivated land (${pc('scrub')}%). Land that is cultivated but left unsown for a season is **fallow**: this imagined sheet does not mark fallow separately. A small area of **blue** shows the tank.`,
      v: table(['Land use', 'Tint', 'Share of the sheet', 'Where'], [['Cultivated land', 'Yellow', `${pc('cult')}%`, 'South and centre, on low gentle ground'], ['Open scrub', 'White with ticks', `${pc('scrub')}%`, 'West, north and the high plateau'], ['Forest', 'Green', `${pc('forest')}%`, 'The conical hill, the ridge and the north-east']], 'Table of three land-use classes of the imagined sheet with tint, share of the area and location', IMG),
      n: 'Land use is how land is used, and the sheet shows it with tints. Yellow is cultivated land, which covers nearly half of our sheet. White with small green ticks is open scrub, about a third. Green is forest, about a fifth. Land that is farmed but left unsown for a season is called fallow, but this imagined sheet does not mark it separately.',
    }),
    sl('diagram', 'Cultivated land: the people farm', {
      b: 'The low gentle ground in the south is **entirely yellow**: it is **cultivated land**. Combined with a **tank** and wells for irrigation, a canal and a **metalled road** to carry produce, this tells us that the main occupation here is **agriculture**.',
      v: V.luSouth,
      n: 'The low gentle ground in the south is all yellow, so it is cultivated land. Add a tank, wells and a canal for irrigation, and a metalled road to carry the harvest, and the evidence points to agriculture as the main occupation here. Always link the land use to the occupation, and name the clues on the map.',
    }),
    sl('example', 'Worked example: land use and occupations', {
      b: '**Problem.** Infer the main occupation of people near (a) the southern plain, (b) the conical hill and (c) the western scrub.\n\n**(a)** Yellow tint, tank, wells and canal: **farming**.\n\n**(b)** Green tint on steep high ground with no huts: **forestry**, collecting wood and forest produce, and protection of the forest.\n\n**(c)** White scrub with a few scattered huts and no irrigation: **grazing of animals and small dry farms**.',
      v: V.luNorth,
      n: 'Let us infer occupations from land use. On the southern plain the yellow tint, tank, wells and canal tell us that people are farmers. On the conical hill the green tint and the steep slopes with no huts suggest forestry. In the western scrub, a few scattered huts and no irrigation suggest grazing animals and small dry farms.',
    }),
    sl('check', 'Quick check: land use', {
      b: 'Infer an occupation from the land use.',
      n: 'Quick check. Yellow land with a tank and a canal points to agriculture.',
      chk: 'landuse-chk',
    }),
    sl('concept', 'Means of transport: roads and tracks', {
      b: `Transport is shown by lines. A **metalled road** (thick red) is the best, for all vehicles. An **unmetalled road** (thick black broken) is usable by carts and vehicles in dry weather. A **cart track** (thin black) is wide enough for bullock carts. A **pack track** (thin broken) is for animals. A **footpath** (dotted) is for people on foot. On the sheet the metalled road is about **${km1(lenKm('metalled'))} km** long.`,
      v: V.transLines,
      n: 'Transport is shown by lines. A metalled road is thick and red and is the best for all vehicles. An unmetalled road is thick, black and broken, and is used mostly by carts and vehicles in dry weather. A cart track is a thin black line for bullock carts, a pack track is for animals, and a footpath is a dotted line for people on foot.',
    }),
    sl('concept', 'Communication: how places are linked', {
      b: `The **metalled road** crosses the whole sheet from west to east, linking **Sonakhedi** and **Nandiwadi**, and crosses the river at a **bridge**. The **unmetalled road** joins Sonakhedi to **Pathrali** and on to Nandiwadi. Other **communication** facilities are the **post office** and the **police station**. Lengths on the sheet: unmetalled road ${km1(lenKm('unmetalled'))} km, cart tracks ${km1(lenKm('cart'))} km, pack track ${km1(lenKm('pack'))} km, footpaths ${km1(lenKm('foot'))} km.`,
      v: V.trans,
      n: 'This extract shows how the villages are linked. The metalled road runs across the sheet from west to east, joining Sonakhedi and Nandiwadi, and it crosses the river at a bridge. An unmetalled road joins Sonakhedi to Pathrali and then goes on to Nandiwadi. The post office is a means of communication too, because it carries letters and parcels.',
    }),
    sl('check', 'Quick check: roads and tracks', {
      b: 'Name a type of road or track from its symbol.',
      n: 'Quick check. A thick red line is a metalled road.',
      chk: 'trans-chk',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Site: water, gentle fertile land, a road or track, safety from floods.',
        'Services: PO, PS, Dis; Nandiwadi has a PO and PS, Sonakhedi a dispensary.',
        'Land use: yellow cultivated, green forest, white open scrub; infer the occupation from the evidence.',
        'Transport: metalled road, unmetalled road, cart track, pack track, footpath; a bridge carries a road over a river.',
      ],
      v: table(['Evidence on the map', 'Inference'], [['Yellow tint, tank, canal', 'Agriculture'], ['Green tint, steep slope, no huts', 'Forestry'], ['White scrub, scattered huts', 'Grazing, dry farming']], 'Summary table of map evidence and the occupation it suggests', IMG),
      n: 'Let us sum up Part 1. A village stands where there is water, gentle fertile land and a road. Letters P O, P S and Dis show its services. Yellow land means farming, green means forest and white scrub means grazing or dry farming. Roads and tracks run from the thick red metalled road down to the dotted footpath, and a bridge takes a road over a river.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Give at least two reasons for a site, each tied to something visible on the map.',
        'Link land use to occupation using clues: tint, water, huts, roads.',
        'Name the type of road from its colour and style.',
        'Quote grid references when you point to a feature.',
      ],
      v: table(['Slip', 'Fix'], [['One-word reason such as "water"', 'Name the water source and the distance'], ['Calling every black line a road', 'Check whether it is a track, path or boundary'], ['Naming an occupation without evidence', 'Cite the tint and the facilities']], 'Table of three common slips in reading settlements and land use, and their fixes', IMG),
      n: 'Some tips. Give at least two reasons for a site, and tie each one to something you can see on the map, such as a tank or a metalled road. When you infer an occupation, quote the clues: the tint, the water and the huts. Name each road from its colour and style, and give grid references when you point to a feature.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Topographical Maps: Settlements, Land Use, Transport and Drainage, Part 2: Drainage, settlement patterns and features',
  goals: [
    'Find the direction of flow of a river from contours or spot heights and from tributary junctions',
    'Identify dendritic, trellis and radial drainage patterns',
    'Distinguish clustered from dispersed settlements and give a reason for each',
    'Classify features as natural or man-made',
  ],
  slides: [
    sl('title', 'Where does the water go?', {
      b: 'Rivers follow the slope of the land. On a topographical sheet you can find the **direction of flow**, recognise the **pattern** of the streams, see whether huts are **clustered** or **dispersed**, and sort features into **natural** and **man-made**. Our imagined sheet (not a real place) shows each of these.',
      v: table(['Topic', 'Key question'], [['Direction of flow', 'From higher to lower: which way?'], ['Drainage pattern', 'Tree, trellis or radial?'], ['Settlement pattern', 'Huts together or apart?'], ['Natural or man-made', 'Made by nature or by people?']], 'Table of the four topics of Part 2 and the key question of each', IMG),
      n: 'Rivers follow the slope of the land. In this part we find which way a river flows, recognise the pattern of its streams, and see whether huts are close together or far apart. Then we sort the features of the sheet into natural and man-made ones. Our imagined sheet shows examples of each.',
    }),
    sl('concept', 'Direction of flow of a river', {
      b: `Water always flows **from higher to lower ground**. Clues: **(1)** contour values or spot heights along the river decrease downstream; **(2)** where a river crosses contours, the **V-shaped bends point upstream** (towards higher ground); **(3)** **tributaries join at acute angles pointing downstream**. On the extract, the river crosses the 140 m contour at P and the 100 m contour at Q, so it flows from P towards Q, to the **south-east**.`,
      v: V.flowR,
      n: 'Water flows from higher ground to lower ground. There are three clues. Heights along the river fall in the direction of flow. Where a river crosses contours, the V shaped bends point upstream. And tributaries join the main river at acute angles that point downstream. Here the river crosses the one hundred and forty metre contour at P and the one hundred metre contour at Q, so it flows from P towards Q, to the south east.',
    }),
    sl('example', 'Worked example: which way does the stream flow?', {
      b: `**Problem.** The stream T1 on the extract has a bed height of about ${Math.round(T.height(...t1.pts[0]))} m at A and about ${Math.round(T.height(...t1.pts.at(-1)))} m at B. In which direction does it flow?\n\n**Step 1.** Water flows to the lower end: B (${Math.round(T.height(...t1.pts.at(-1)))} m).\n\n**Step 2.** B lies east of A.\n\n**Answer.** The stream flows **from A to B, towards the east**, and joins the main river there.`,
      v: V.flowT,
      n: 'Let us find the direction of flow of a stream. At A the stream bed is about two hundred and seventeen metres high, and at B it is about one hundred and forty nine metres. Water flows to the lower end, which is B. B lies east of A, so the stream flows towards the east and joins the main river there.',
    }),
    sl('check', 'Quick check: direction of flow', {
      b: 'Decide the direction of flow from heights.',
      n: 'Quick check. Water flows from the higher end to the lower end.',
      chk: 'flow-chk',
    }),
    sl('concept', 'Drainage pattern 1: dendritic', {
      b: 'A **dendritic** pattern looks like the branches of a **tree**: tributaries join the main river from all sides at **acute angles pointing downstream**. It forms on land of fairly uniform hardness and gentle slope. The **imagined sheet** shows this pattern: the main river is joined by a tributary from the west (which has itself received a smaller tributary) and by a seasonal stream from the east, all at acute angles.',
      v: V.drain,
      n: 'The first pattern is dendritic, which means tree like. Tributaries join the main river from all sides at acute angles that point downstream, just like the branches of a tree. It forms where the ground is fairly uniform. Our imagined sheet shows this pattern, with a tributary joining from the west, a smaller one joining that tributary, and a seasonal stream joining from the east.',
    }),
    sl('diagram', 'Drainage pattern 2: trellis', {
      b: 'A **trellis** pattern looks like a **garden fence**: long streams run **parallel** to one another and short tributaries join them at nearly **right angles**. It forms where alternating bands of hard and soft rock, or folded ridges and valleys, guide the streams. It is **not on the imagined sheet**; this is a separate schematic.',
      v: V.trellis,
      n: 'The second pattern is trellis, like a garden fence. Long streams run side by side, and short tributaries join them at right angles. It forms where bands of hard and soft rock, or folded ridges and valleys, guide the streams. This pattern is not on our imagined sheet, so here is a separate schematic sketch.',
    }),
    sl('diagram', 'Drainage pattern 3: radial', {
      b: 'A **radial** pattern looks like the **spokes of a wheel**: streams flow **outwards in all directions** from a central high point such as a dome or a conical hill. It is **not on the imagined sheet** (its hill drains mainly towards the south), so it is shown as a schematic. On a real sheet, a radial pattern around a hill is easy to spot from the contours.',
      v: V.radial,
      n: 'The third pattern is radial, like the spokes of a wheel. Streams flow outwards in all directions from a central high point, such as a dome or a conical hill. It is not on our imagined sheet, so here is a schematic. On a real sheet, look for streams that start near a summit and run away from it in every direction.',
    }),
    sl('check', 'Quick check: drainage pattern', {
      b: 'Name a drainage pattern from its shape.',
      n: 'Quick check. Streams flowing outwards from a central hill form a radial pattern.',
      chk: 'pattern-chk',
    }),
    sl('concept', 'Clustered settlements', {
      b: `In a **clustered** (nucleated) settlement the huts stand **close together** around a centre. Each village on the sheet is a cluster: the mean distance from a hut to its nearest neighbour is only about **${km2(nnV('nandiwadi'))} km** in Nandiwadi. Reasons: a limited supply of **water** (a well or tank), **safety**, closeness to the **road** and to shared fields.`,
      v: V.clust,
      n: 'In a clustered settlement the huts stand close together around a centre. Each village on our sheet is a cluster. In Nandiwadi the nearest neighbour of a hut is only about a tenth of a kilometre away. People cluster where water is limited to a well or tank, for safety, and to be close to the road and to shared fields.',
    }),
    sl('diagram', 'Dispersed settlements', {
      b: `In a **dispersed** settlement the huts are **scattered** far apart, each among its own land. In the north-west of the sheet there are ${dispW.length} huts with a mean nearest-neighbour distance of about **${km1(T.nnMean(dispW))} km**. Reasons: poor, **thinly spread land** (open scrub) that supports few people per sq km, **grazing** and dry farming that need space, and no single water source.`,
      v: V.disp,
      n: 'In a dispersed settlement the huts are scattered far apart. In the north west of our sheet there are three huts, more than a kilometre from one another on average. The land is open scrub that supports few people, and herders and dry farmers need space for their animals and fields. There is also no single water source to draw them together.',
    }),
    sl('example', 'Worked example: clustered or dispersed?', {
      b: `**Problem.** Decide the pattern of settlement in (a) Nandiwadi and (b) the north-west scrub, and give a reason for each.\n\n**(a)** Huts about ${km1(nnV('nandiwadi'))} km apart on average, around a well and a road: **clustered**; reasons: water, road and shared fields.\n\n**(b)** Three huts with ${km1(T.nnMean(dispW))} km between neighbours, on open scrub: **dispersed**; reasons: thin land, grazing, no single water source.`,
      v: table(['Place', 'Hut spacing', 'Pattern', 'Reason'], [['Nandiwadi', 'About 0.1 km', 'Clustered', 'Well and road'], ['North-west scrub', `About ${km1(T.nnMean(dispW))} km`, 'Dispersed', 'Thin land, grazing']], 'Table of two places with hut spacing, settlement pattern and reason', IMG),
      n: 'Let us decide the pattern. In Nandiwadi the huts are about a tenth of a kilometre apart, around a well and a road, so the pattern is clustered. In the north west the huts are more than a kilometre apart on open scrub, so the pattern is dispersed. Always give the spacing as evidence and a reason for the pattern.',
    }),
    sl('check', 'Quick check: settlement pattern', {
      b: 'Name the pattern of settlement from the spacing of huts.',
      n: 'Quick check. Huts close together form a clustered settlement.',
      chk: 'settle-chk',
    }),
    sl('concept', 'Natural and man-made features', {
      b: '**Natural features** are made by nature: the **river**, streams, the **conical hill**, the **ridge**, the **escarpment**, forest, scrub. **Man-made features** are made by people: the **canal**, the **embankment**, the **bridge**, roads, tracks, **huts**, **wells**, the **tank** (dug and banked), the temple and the post office. A tip: if it follows a straight or smooth line that ignores the terrain, or is a building, think man-made.',
      v: V.man,
      n: 'Natural features are made by nature. On our sheet they are the river and streams, the hill, the ridge, the escarpment and the forest. Man made features are made by people. They are the canal, the embankment, the bridge, the roads and tracks, the huts, the wells, the tank and the temple. If a feature follows a smooth or straight line, or is a building, it is probably man made.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Flow: from higher to lower; V-bends point upstream; tributaries join at acute angles pointing downstream.',
        'Patterns: dendritic (tree), trellis (right-angle joins), radial (outward from a dome); the sheet is dendritic.',
        'Clustered: huts close, around water or a road; dispersed: huts far apart on thin or dry land.',
        'Natural: river, hill, ridge, forest. Man-made: canal, embankment, bridge, road, hut, well, tank.',
      ],
      v: table(['Idea', 'Evidence'], [['Direction of flow', 'Heights fall along the river'], ['Pattern', 'Shape of the streams'], ['Settlement', 'Spacing of huts'], ['Natural or man-made', 'Who made it']], 'Summary table of four ideas of Part 2 and the evidence for each', IMG),
      n: 'Let us sum up Part 2. Rivers flow from higher to lower ground, V bends point upstream, and tributaries join at acute angles pointing downstream. The three drainage patterns are dendritic, trellis and radial. Huts close together form a clustered settlement and huts far apart form a dispersed one. The river and hill are natural, while the canal, bridge and roads are man made.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Give the direction of flow with evidence: heights, contours or tributary angles.',
        'Describe a pattern by its shape, then name it.',
        'Quote hut spacing or counts as evidence for a settlement pattern.',
        'When classifying features, give a short reason for each.',
      ],
      v: table(['Slip', 'Fix'], [['Saying a river flows uphill', 'Check the heights at both ends'], ['Naming a pattern without describing it', 'Say what the streams look like first'], ['Calling a tank natural', 'It is dug and banked, so man-made']], 'Table of three common slips in reading drainage and settlement, and their fixes', IMG),
      n: 'Final tips. State the direction of flow and back it up with heights, contours or the angles of tributaries. Describe a drainage pattern by its shape before you name it. Quote hut spacing as evidence for a settlement pattern. And when you sort features into natural and man made, give a short reason for each one.',
    }),
  ],
});
