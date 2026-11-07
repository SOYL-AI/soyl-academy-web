// ICSE 10 Geography ch07 Soil Resources — question bank (ICSE 2027 specimen style). Data items use the ILLUSTRATIVE field-trial
// and shelter-belt figures exported by svgs.mjs, and every computed answer is asserted. MCQ keys are placed by the builder.
import { mk, add } from './lib.mjs';
import { TRIAL, LOSS, cut, WIND, windCut } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const trialText = TRIAL.rows.map((r) => `${r.method.toLowerCase()} ${r.loss}`).join('; ');

// ---------------------------------------------------------------- t01 alluvial soil
add('khadar-chk', mcq({
  stem: 'A farmer’s field lies on the low floodplain beside the Ghaghara in eastern Uttar Pradesh, and a fresh layer of fine silt is left on it after most monsoon floods. The soil of this field is:',
  right: 'khadar (new alluvium)',
  wrong: ['bhangar (old alluvium)', 'regur', 'laterite'],
  sol: 'Low-lying land renewed by floods carries new alluvium — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('kankar-mcq', mcq({
  stem: 'While digging a well on a raised river terrace near Meerut, workers find many small, hard lumps of lime in the soil. These lumps, typical of bhangar, are called:',
  right: 'kankar',
  wrong: ['humus', 'regur', 'gneiss'],
  sol: 'Lime nodules in old alluvium are kankar — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('alluvial-crop-mcq', mcq({
  stem: 'Which group of crops is most widely grown on the alluvial soils of the Punjab–Haryana plain?',
  right: 'Wheat, rice and sugarcane',
  wrong: ['Tea, coffee and rubber', 'Cashew, coconut and cardamom', 'Ragi, tea and saffron'],
  sol: 'Fertile alluvium of the plains grows food and cash crops such as wheat, rice and sugarcane — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('texture-mcq', mcq({
  stem: 'Alluvial soil near the Himalayan foothills in Uttarakhand is coarse and pebbly, while the soil of the Sundarbans delta is fine and clayey. The best explanation is that:',
  right: 'rivers drop coarse material first where they leave the hills and carry only fine silt and clay to the delta',
  wrong: ['the delta soil has formed from basalt lava', 'the foothill soil has been leached by heavy rain into laterite', 'wind has blown sand from the Thar onto the foothills'],
  sol: 'A river slows on reaching the plain and sorts its load: heavy particles first, finest last — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('delta-mcq', mcq({
  stem: 'The deltas of the Mahanadi, Godavari, Krishna and Kaveri are covered mainly by:',
  right: 'alluvial soil',
  wrong: ['black soil', 'laterite soil', 'desert soil'],
  sol: 'Deltas are built of river deposits — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('ar-khadar', ar({
  a: 'Bhangar is renewed by a fresh layer of silt during floods every year.',
  r: 'Bhangar contains nodules of lime called kankar.',
  key: 'b',
  sol: 'A is false: bhangar lies on higher terraces above normal flood level, so it is not renewed each year (khadar is). R is true — option (b).',
  d: 2, c: 'understanding', t: [1],
}));
add('tf-khadar', tf({
  stem: 'Khadar soil is renewed by fresh deposits of silt brought by river floods.',
  key: 't',
  sol: 'True: khadar is new alluvium on floodplains.',
  d: 1, c: 'recall', t: [1],
}));
add('fill-bhangar', fill({
  stem: 'Old alluvium found on the higher terraces of the northern plains, above normal flood level, is called ___.',
  acc: [['bhangar', 'bangar']],
  sol: '**Bhangar**.',
  d: 1, c: 'recall', t: [1],
}));
add('plots-short2', short({
  marks: 2,
  stem: 'A farmer near Kanpur owns one plot on the low floodplain of the Ganga and another on higher ground some kilometres from the river. State two ways in which the soils of the two plots are likely to differ.',
  model: 'The floodplain plot has khadar: new alluvium that floods renew almost every year, lighter in colour and more fertile. The higher plot has bhangar: older alluvium lying above flood level, more clayey, less fertile and containing kankar nodules.',
  sol: 'Khadar (new, renewed, fertile) versus bhangar (old, above floods, kankar).',
  scheme: [['Age and renewal by floods', 1], ['Fertility or kankar', 1]],
  d: 2, c: 'application', t: [1],
}));
add('gradient-short3', short({
  marks: 3,
  stem: 'Explain how alluvial soil is formed, and why it is coarse near the Himalayan foothills but fine and clayey in the Ganga–Brahmaputra delta.',
  model: 'Rivers wear down the mountains and carry the eroded material to the plains, where it settles in layers as alluvium. Where a river leaves the hills its speed falls sharply, so the heavy, coarse particles such as pebbles and sand are dropped first. Only the lightest silt and clay travel all the way and settle in the slow water of the delta.',
  sol: 'Deposition by rivers; sorting by speed: coarse near the hills, fine in the delta.',
  scheme: [['Formation by river deposition', 1], ['Coarse near foothills (speed falls)', 1], ['Fine in delta (lightest carried farthest)', 1]],
  d: 4, c: 'analysis', t: [1],
}));

// ---------------------------------------------------------------- t02 black soil
add('black-chk', mcq({
  stem: 'Which statement correctly explains a feature of the black soil of the Deccan plateau?',
  right: 'It is clayey, so it holds moisture for a long time after the rains',
  wrong: ['It is sandy, so water drains through it quickly', 'It is laid down by rivers, so it is renewed by floods every year', 'It is leached by heavy rain, so it is acidic and infertile'],
  sol: 'High clay content gives black soil its moisture retention — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('regur-mcq', mcq({
  stem: 'The black soil of the Malwa plateau and Saurashtra has formed mainly from the weathering of:',
  right: 'basalt lava rocks of the Deccan trap',
  wrong: ['river silt brought by the Ganga', 'granite and gneiss', 'wind-blown sand from the Thar'],
  sol: 'Black soil is derived from Deccan basalt — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('moisture-mcq', mcq({
  stem: 'A cotton farmer near Akola in Vidarbha says his crop survives the dry weeks after the monsoon although he has no well. The main reason is that black soil:',
  right: 'retains moisture because of its high clay content',
  wrong: ['is very porous and lets rain sink far below the roots', 'is renewed by floods each year', 'receives winter rain from western disturbances'],
  sol: 'Clayey black soil releases stored monsoon water slowly to the roots — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('black-states-mcq', mcq({
  stem: 'In which group of states is black soil most widespread?',
  right: 'Maharashtra, Madhya Pradesh and Gujarat',
  wrong: ['Punjab, Haryana and Bihar', 'Kerala, Assam and Meghalaya', 'West Bengal, Odisha and Jharkhand'],
  sol: 'The Deccan lava region covers these states — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('ar-black', ar({
  a: 'Black soil is described as "self-ploughing".',
  r: 'Deep cracks open in it during the dry season, and loose soil falls into them, turning the soil over.',
  key: 'c',
  sol: 'Both are true, and R explains why the soil is called self-ploughing — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('fill-basalt', fill({
  stem: 'The black soil of the Deccan has formed from the weathering of ___, a volcanic rock.',
  acc: [['basalt', 'lava', 'basalt lava']],
  sol: '**Basalt** (Deccan trap lava).',
  d: 1, c: 'recall', t: [2],
}));
add('s1-black', short({
  marks: 1,
  stem: 'Name the soil formed by the weathering of lava rocks on the Deccan plateau.',
  model: 'Black soil (regur).',
  sol: 'Black soil.',
  scheme: [['Black soil / regur', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('cotton-short2', short({
  marks: 2,
  stem: 'Give two geographical reasons why cotton is widely grown on the black soils of Saurashtra and Vidarbha.',
  model: 'Black soil is clayey and retains moisture for a long time, so cotton can mature on stored monsoon water with little irrigation. It is rich in lime, potash and magnesia, which the cotton plant needs, and the cracks of the dry season aerate the soil.',
  sol: 'Moisture retention; nutrients (and aeration).',
  scheme: [['Moisture retention', 1], ['Nutrients or aeration', 1]],
  d: 2, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 red and laterite soils
add('laterite-chk', mcq({
  stem: 'Laterite soil forms where:',
  right: 'high temperature and heavy rain leach away lime and silica, leaving iron and aluminium oxides',
  wrong: ['rivers deposit fresh silt every year', 'basalt lava weathers in a semi-arid climate', 'wind deposits fine sand in a desert'],
  sol: 'Laterite is the product of intense leaching — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('yellow-mcq', mcq({
  stem: 'A soil on the Chota Nagpur plateau is reddish in a dry pit wall but looks yellowish in a waterlogged hollow nearby. This is because:',
  right: 'the iron oxide in red soil looks yellow when it is hydrated',
  wrong: ['the yellow soil is alluvium brought by floods', 'water removes all the iron from the soil at once', 'the waterlogged soil has formed from basalt'],
  sol: 'Hydrated iron oxide is yellow — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('brick-mcq', mcq({
  stem: 'In parts of coastal Karnataka and Goa, blocks are cut from the soil, left to dry and used to build house walls because they become hard in air. The soil is:',
  right: 'laterite',
  wrong: ['khadar', 'black soil', 'desert soil'],
  sol: 'Laterite (from the Latin for brick) hardens on exposure — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('red-crop-mcq', mcq({
  stem: 'With fertilisers and irrigation, the red soils of interior Tamil Nadu and Karnataka are mainly used to grow:',
  right: 'millets such as ragi, groundnut and pulses',
  wrong: ['jute and mesta', 'tea and rubber', 'saffron and apples'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('laterite-crop-mcq', mcq({
  stem: 'A planter on the laterite slopes of the Western Ghats in Kerala adds plenty of manure before planting. Which crop group is he most likely to grow?',
  right: 'Tea, coffee, rubber or cashew',
  wrong: ['Wheat and gram', 'Cotton and jowar', 'Jute and mesta'],
  sol: 'Manured laterite on wet hill slopes suits plantation crops — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('ar-laterite', ar({
  a: 'Blocks of laterite are used as building bricks in parts of Kerala.',
  r: 'Laterite is rich in nitrogen and humus.',
  key: 'a',
  sol: 'A is true (laterite hardens in air); R is false: laterite is poor in nitrogen and humus — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('tf-red', tf({
  stem: 'Red soil is rich in humus and nitrogen and needs no fertiliser.',
  key: 'f',
  sol: 'False: red soil is poor in nitrogen, phosphorus and humus and needs fertilisers.',
  d: 1, c: 'understanding', t: [3],
}));
add('tf-laterite', tf({
  stem: 'Laterite soil develops where rainfall is low and temperatures are low.',
  key: 'f',
  sol: 'False: it develops under high temperature and heavy rain.',
  d: 1, c: 'recall', t: [3],
}));
add('fill-leaching', fill({
  stem: 'The washing down of lime and silica by heavy rain percolating through the soil is called ___.',
  acc: [['leaching']],
  sol: '**Leaching**.',
  d: 1, c: 'recall', t: [3],
}));
add('s1-laterite', short({
  marks: 1,
  stem: 'Name one crop grown on laterite soil in Goa or coastal Karnataka.',
  model: 'Cashew (coconut is also accepted).',
  sol: 'Cashew.',
  scheme: [['Cashew / coconut', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('redcolour-short2', short({
  marks: 2,
  stem: 'Why is red soil red? Why does it sometimes look yellow?',
  model: 'It is red because iron oxide, released from the weathered crystalline rocks, is spread through the soil. Where that iron oxide is hydrated, as in moist or waterlogged places, the soil looks yellow.',
  sol: 'Iron oxide; hydration makes it yellow.',
  scheme: [['Iron oxide', 1], ['Yellow when hydrated', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('leach-short2', short({
  marks: 2,
  stem: 'What is leaching? How does it make laterite soil infertile?',
  model: 'Leaching is the washing down of soluble minerals by rainwater soaking through the soil. Under very heavy rain it carries away lime, silica and plant nutrients, leaving mostly iron and aluminium oxides, so laterite becomes acidic and poor.',
  sol: 'Definition; removal of nutrients leaves oxides.',
  scheme: [['Meaning of leaching', 1], ['Effect on laterite', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('compare-short3', short({
  marks: 3,
  stem: 'Compare red soil and laterite soil under three heads: conditions of formation, fertility and crops grown.',
  model: 'Formation: red soil forms by the weathering of crystalline rocks such as granite where rain is low to moderate; laterite forms by intense leaching under heavy rain and high temperature. Fertility: red soil is low in nitrogen and humus but responds to fertiliser; laterite is acidic and very poor. Crops: red soil grows millets, groundnut and pulses; laterite grows cashew, tea, coffee and rubber when manured.',
  sol: 'Formation; fertility; crops.',
  scheme: [['Formation', 1], ['Fertility', 1], ['Crops', 1]],
  d: 3, c: 'analysis', t: [3],
}));

// ---------------------------------------------------------------- t04 soil erosion
add('sheet-chk', mcq({
  stem: 'After a season of heavy storms, a farmer on a gentle slope in Jharkhand notices that the dark topsoil has thinned evenly across the whole field, though no channels have formed. This is:',
  right: 'sheet erosion',
  wrong: ['gully erosion', 'wind erosion', 'leaching'],
  sol: 'An even loss of a thin layer over a wide area is sheet erosion — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('wind-mcq', mcq({
  stem: 'On farms near Jaisalmer, loose dry soil is lifted and carried away during the dusty months of May and June. The main agent of erosion here is:',
  right: 'wind',
  wrong: ['running water', 'glaciers', 'sea waves'],
  sol: 'Dry, bare sandy land in strong winds suffers wind erosion — option (@K).',
  d: 1, c: 'application', t: [4],
}));
add('overgraze-mcq', mcq({
  stem: 'On a hillside in the Aravallis, herds of goats graze until no grass is left. In the next monsoon, soil loss from the slope rises sharply because:',
  right: 'the grass cover that bound the soil and slowed runoff has been removed',
  wrong: ['goats add too much manure to the soil', 'grazing makes the slope less steep', 'grazing increases the humus in the soil'],
  sol: 'Overgrazing exposes the soil to rain and runoff — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('jhum-mcq', mcq({
  stem: 'Shifting cultivation (jhum) on the hills of north-east India increases soil erosion mainly because:',
  right: 'forest is cleared and burnt, leaving the slopes bare to heavy rain',
  wrong: ['every slope is cut into terraces', 'it adds kankar to the soil', 'shelter belts are planted across the wind'],
  sol: 'Clearing the forest exposes steep slopes — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('ar-chambal', ar({
  a: 'Gully erosion has made large areas of the Chambal valley unfit for farming.',
  r: 'The Chambal is a tributary of the Yamuna.',
  key: 'd',
  sol: 'Both statements are true, but the river’s being a tributary does not explain the gullying (soft soil, heavy downpours and bare slopes do) — option (d).',
  d: 3, c: 'analysis', t: [4],
}));
add('fill-gully', fill({
  stem: 'Running water cutting deep channels into soft soil, as in the Chambal valley, is called ___ erosion.',
  acc: [['gully']],
  sol: '**Gully** erosion.',
  d: 1, c: 'recall', t: [4],
}));
add('humancause-short2', short({
  marks: 2,
  stem: 'State two ways in which human activities have increased soil erosion on the slopes of the Shivalik hills.',
  model: 'Forests have been cut for timber, fuel and farmland, removing the roots that hold the soil and the canopy that breaks the rain. Overgrazing by goats and cattle strips the grass and loosens the soil with their hooves, so runoff carries the soil away.',
  sol: 'Deforestation; overgrazing.',
  scheme: [['Deforestation with effect', 1], ['Overgrazing with effect', 1]],
  d: 2, c: 'application', t: [4],
}));
add('sheetgully-short2', short({
  marks: 2,
  stem: 'Distinguish between sheet erosion and gully erosion.',
  model: 'In sheet erosion, running water removes a thin, even layer of topsoil over a wide area, so the loss is hardly noticed. In gully erosion, running water cuts deep channels that widen and join into ravines, as along the Chambal.',
  sol: 'Thin even layer versus deep channels.',
  scheme: [['Sheet erosion', 1], ['Gully erosion', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('causes-short3', short({
  marks: 3,
  stem: 'A hill village in Uttarakhand has cleared its oak forest for fuel, keeps large herds of goats and ploughs its terraced slopes up and down after the terrace walls collapsed. Explain three ways in which these practices increase soil erosion.',
  model: 'Clearing the oak forest removes the roots that bound the soil and the leaf cover that softened the rain, so rain strikes bare ground. Large goat herds eat the grass to its roots and loosen the soil with their hooves. Ploughing straight up and down the slope makes channels along which runoff rushes, carrying topsoil away.',
  sol: 'Deforestation; overgrazing; faulty ploughing.',
  scheme: [['Deforestation', 1], ['Overgrazing', 1], ['Up-and-down ploughing', 1]],
  d: 3, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- t05 soil conservation
add('contour-chk', mcq({
  stem: 'Contour ploughing reduces soil erosion on a gentle slope because:',
  right: 'furrows running across the slope hold back water and let it soak in',
  wrong: ['furrows running down the slope drain water away faster', 'it removes the topsoil before the rains', 'it turns the slope into flat steps with stone walls'],
  sol: 'Each furrow along a contour acts as a small barrier — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('method-chk', mcq({
  stem: 'Which pairing of area and soil conservation method is most suitable?',
  right: 'Steep slopes of Sikkim — terrace farming',
  wrong: ['Sand-blown fields of western Rajasthan — terrace farming', 'Flat plain of Punjab — check dams in ravines', 'Chambal ravines — shelter belts against wind'],
  sol: 'Terraces suit steep slopes; shelter belts suit windy dry plains; check dams suit gullies — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('shelter-mcq', mcq({
  stem: 'A farmer near Bikaner plants rows of khejri and other hardy trees along the western edge of her fields. These rows mainly:',
  right: 'reduce wind speed and trap blowing sand',
  wrong: ['carry irrigation water to the crops', 'cut the land into terraces', 'add kankar to the soil'],
  sol: 'They act as a shelter belt — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('trial-mcq', mcq({
  stem: `In an illustrative field trial on a slope, soil lost in tonnes per hectare per year was: ${trialText}. Which conclusion is best supported?`,
  right: 'Methods that slow running water on the slope reduce soil loss the most',
  wrong: ['Ploughing up and down the slope protects the soil best', 'Strip cropping protects the soil better than terracing', 'All the methods lose about the same amount of soil'],
  sol: `Loss falls from ${LOSS.updown} to ${LOSS.terrace} t as the method slows runoff more — option (@K).`,
  d: 3, c: 'analysis', t: [5],
}), () => (LOSS.updown > LOSS.contour && LOSS.contour > LOSS.strip && LOSS.strip > LOSS.terrace) || 'order');
add('ar-shelter', ar({
  a: 'Shelter belts are mainly used to check gully erosion on steep hill slopes.',
  r: 'Rows of trees reduce the speed of the wind near the ground.',
  key: 'b',
  sol: 'A is false: shelter belts protect windy dry plains from wind erosion; R is true — option (b).',
  d: 2, c: 'application', t: [5],
}));
add('tf-afforest', tf({
  stem: 'Afforestation helps to check soil erosion because tree roots bind the soil and fallen leaves add humus.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'understanding', t: [5],
}));
add('tf-terrace', tf({
  stem: 'A steep, bare slope in Meghalaya ploughed up and down will usually lose less soil than the same slope cut into terraces.',
  key: 'f',
  sol: 'False: terraces slow runoff and hold the soil, so the terraced slope loses far less.',
  d: 2, c: 'application', t: [5],
}));
add('fill-terrace', fill({
  stem: 'Cutting a steep hill slope into a series of flat steps for growing crops is called ___ farming.',
  acc: [['terrace', 'step', 'terraced']],
  sol: '**Terrace** farming.',
  d: 1, c: 'recall', t: [5],
}));
add('match-method', match({
  marks: 2,
  stem: 'Match each soil conservation method in Column A with the area where it is most useful in Column B.',
  pairs: [
    ['Terrace farming', 'Steep slopes of Uttarakhand'],
    ['Contour ploughing', 'Gentle slopes of the Chota Nagpur uplands'],
    ['Shelter belts', 'Windy fields of western Rajasthan'],
    ['Check dams', 'Gullied land of the Chambal valley'],
  ],
  order: [3, 1, 0, 2],
  sol: 'Terrace farming → steep slopes; contour ploughing → gentle slopes; shelter belts → windy dry fields; check dams → gullies.',
  d: 2, c: 'application', t: [5],
}));
add('match-crop', match({
  marks: 2,
  stem: 'Match each soil in Column A with a crop it is well known for in Column B.',
  pairs: [
    ['Alluvial soil', 'Wheat and sugarcane'],
    ['Black soil', 'Cotton'],
    ['Red soil', 'Ragi and groundnut'],
    ['Laterite soil', 'Cashew'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Alluvial → wheat, sugarcane; black → cotton; red → ragi, groundnut; laterite → cashew.',
  d: 1, c: 'recall', t: [1, 2, 3],
}));
add('importance-short3', short({
  marks: 3,
  stem: 'Give three reasons why soil conservation is important for India.',
  model: 'Topsoil forms extremely slowly, so soil that is lost cannot be replaced within a human lifetime. A very large part of India’s people depend on farming, which needs fertile soil, so erosion lowers yields and incomes. Eroded soil ends up as silt in rivers and reservoirs, reducing the water they store and making floods worse.',
  sol: 'Slow formation; dependence on farming; siltation and floods.',
  scheme: [['Slow formation', 1], ['Farming and livelihoods', 1], ['Siltation of rivers and reservoirs', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('terrace-short2', short({
  marks: 2,
  stem: 'Why is terrace farming widely practised on the hill slopes of Sikkim but not needed in the Punjab plain?',
  model: 'On the steep slopes of Sikkim, heavy rain would wash the soil downhill; level terraces slow the water, hold the soil and create flat land for crops. The Punjab plain is almost flat, so runoff is slow, slope erosion is slight and fields are already level.',
  sol: 'Steep slopes need terraces; flat plains do not.',
  scheme: [['Sikkim: steep slopes, terraces hold soil', 1], ['Punjab: flat land, slow runoff', 1]],
  d: 3, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- numericals on the illustrative trial
const cC = cut('contour');
const cT = cut('terrace');
add('contour-num', num({
  stem: `In an illustrative field trial, a plot ploughed up and down a slope lost ${LOSS.updown} tonnes of soil per hectare in a year, and a plot with contour ploughing lost ${LOSS.contour} tonnes. By what percentage did contour ploughing reduce the soil loss?`,
  value: cC, tol: 0.5, unit: '%',
  sol: `Reduction $= ${LOSS.updown} - ${LOSS.contour} = ${LOSS.updown - LOSS.contour}$ t per hectare; percentage $= \\frac{${LOSS.updown - LOSS.contour}}{${LOSS.updown}} \\times 100 = ${cC}$, so ${cC}%.`,
  scheme: [['Reduction in tonnes', 0.5], [`${cC}%`, 0.5]],
  d: 2, c: 'application', t: [5],
}), () => cC === 45 || `contour ${cC}`);
add('terrace-num', num({
  stem: `In the same illustrative trial, a terraced plot lost only ${LOSS.terrace} tonnes of soil per hectare in a year, against ${LOSS.updown} tonnes for up-and-down ploughing. Find the percentage reduction achieved by terracing.`,
  value: cT, tol: 0.5, unit: '%',
  sol: `Percentage $= \\frac{${LOSS.updown} - ${LOSS.terrace}}{${LOSS.updown}} \\times 100 = ${cT}$, so ${cT}%.`,
  scheme: [[`${cT}%`, 1]],
  d: 2, c: 'application', t: [5],
}), () => cT === 80 || `terrace ${cT}`);
const HA = 6;
const saved = HA * (LOSS.updown - LOSS.terrace);
add('farm-num', num({
  stem: `A farmer has ${HA} hectares on a slope. Ploughed up and down, the land loses ${LOSS.updown} tonnes of soil per hectare a year (illustrative). If she terraces the whole farm and the loss falls to ${LOSS.terrace} tonnes per hectare, how many tonnes of soil does she save each year?`,
  value: saved, tol: 0, unit: 't',
  sol: `Saving $= ${HA} \\times (${LOSS.updown} - ${LOSS.terrace}) = ${HA} \\times ${LOSS.updown - LOSS.terrace} = ${saved}$ t a year.`,
  scheme: [[`${saved} t`, 1]],
  d: 2, c: 'application', t: [5],
}), () => saved === 192 || `saved ${saved}`);
const wc = windCut();
add('wind-num', num({
  stem: `On an illustrative farm near Barmer, the wind speed is ${WIND.open} km/h in the open and ${WIND.behind} km/h just behind a shelter belt. By what percentage does the shelter belt reduce the wind speed?`,
  value: wc, tol: 0.5, unit: '%',
  sol: `Percentage $= \\frac{${WIND.open} - ${WIND.behind}}{${WIND.open}} \\times 100 = ${wc}$, so ${wc}%.`,
  scheme: [[`${wc}%`, 1]],
  d: 2, c: 'application', t: [5],
}), () => wc === 40 || `wind ${wc}`);
const stripVsContour = Math.round(((LOSS.contour - LOSS.strip) / LOSS.contour) * 1000) / 10;
add('trial-short3', short({
  marks: 3,
  stem: `Study the illustrative trial (soil lost in tonnes per hectare per year): ${trialText}. (a) How many more tonnes per hectare does contour ploughing alone lose than contour ploughing with strip cropping? (b) Express this difference as a percentage of the loss under contour ploughing alone (one decimal place). (c) Why does adding grass strips reduce the loss further?`,
  model: `(a) $${LOSS.contour} - ${LOSS.strip} = ${LOSS.contour - LOSS.strip}$ t per hectare. (b) $\\frac{${LOSS.contour - LOSS.strip}}{${LOSS.contour}} \\times 100 = ${stripVsContour}$, about ${stripVsContour}%. (c) The grass strips break the flow of water between the crop strips, trap soil washed from the strip above and protect the ground with a permanent cover.`,
  sol: `${LOSS.contour - LOSS.strip} t; ${stripVsContour}%; strips slow water and trap soil.`,
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'analysis', t: [5],
}), () => (LOSS.contour - LOSS.strip === 8 && stripVsContour === 36.4) || `strip ${stripVsContour}`);

// ---------------------------------------------------------------- 10-mark structured questions
add('long-alluvial', long({
  stem: '(a) Name two states where black soil is widespread and the rock from which it has formed. [2]\n\n(b) State two differences between khadar and bhangar. [2]\n\n(c) Explain three reasons why black soil is well suited to growing cotton. [3]\n\n(d) Name two crops of alluvial soil, and state how the texture of alluvial soil changes from the Himalayan foothills to the delta of the Ganga. [3]',
  model: '(a) Maharashtra and Gujarat (also Madhya Pradesh); it has formed from the weathering of basalt, the lava rock of the Deccan trap.\n\n(b) Khadar is new alluvium on low floodplains, renewed by floods almost every year; bhangar is old alluvium on higher terraces above flood level. Khadar is more fertile; bhangar is less fertile and contains kankar.\n\n(c) It is clayey and holds moisture for a long time, so cotton survives the dry weeks after the monsoon; it is rich in lime, potash and magnesia; deep cracks in the dry season let air in and turn the soil over (self-ploughing).\n\n(d) Wheat and rice (also sugarcane, jute). Near the foothills it is coarse and pebbly because rivers drop heavy material as they slow down; downstream it becomes finer, and in the delta it is fine silt and clay.',
  sol: 'Black soil states and basalt; khadar–bhangar; cotton reasons; crops and texture.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 2, c: 'understanding', t: [1, 2],
}));
add('long-redlat', long({
  stem: '(a) What gives red soil its colour, and why may it look yellow in places? [2]\n\n(b) Name two states where laterite soil is found and two crops grown on it. [2]\n\n(c) Explain how laterite soil is formed. [3]\n\n(d) Laterite is an infertile soil, yet tea, coffee and rubber plantations flourish on laterite slopes in Kerala and Karnataka. Explain why. [3]',
  model: '(a) Iron oxide spread through the soil makes it red; where the oxide is hydrated, in moist places, it looks yellow.\n\n(b) Kerala and Karnataka (also Goa, Odisha, Meghalaya); cashew and tea (also coffee, rubber, coconut).\n\n(c) It forms under high temperature and heavy rain with alternate wet and dry seasons. Rainwater percolating through the soil leaches away lime, silica and soluble nutrients. Oxides of iron and aluminium remain, giving a coarse, acidic soil that hardens in air.\n\n(d) Plantation crops need heavy rain and warm temperatures, which these slopes provide; the sloping land drains well, which tea and coffee need; planters add plenty of manure and fertiliser to make up for the poor soil, and the crops tolerate acidic conditions.',
  sol: 'Iron oxide; states and crops; leaching; climate, drainage and manuring.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 3, c: 'understanding', t: [3],
}));
add('long-erosion', long({
  stem: '(a) Define soil erosion and name two of its agents. [2]\n\n(b) Name a region of India badly affected by (i) gully erosion and (ii) wind erosion. [2]\n\n(c) Explain how the ravines of the Chambal valley were formed. [3]\n\n(d) Explain how wind erodes soil in western Rajasthan, and why the problem becomes worse in years of drought. [3]',
  model: '(a) Soil erosion is the removal of the top layer of soil by natural agents faster than new soil can form; agents include running water and wind (also waves and glaciers).\n\n(b) (i) The Chambal valley in Madhya Pradesh, Rajasthan and Uttar Pradesh (or the Shivalik foothills). (ii) Western Rajasthan (the Thar desert region).\n\n(c) The valley has deep, soft alluvial soil; monsoon rain falls in short, heavy bursts, so runoff is fast; natural cover was cleared and slopes overgrazed. Running water cut small channels that deepened, widened and joined into a maze of ravines.\n\n(d) Strong, dry winds lift loose, fine particles from bare, sandy ground and carry them away, sometimes burying fields with sand. In drought years the soil is drier and looser, crops and grass fail so the ground is bare, and more soil is blown away.',
  sol: 'Definition; regions; Chambal ravines; wind erosion and drought.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 3, c: 'application', t: [4],
}));
add('long-conserve', long({
  stem: '(a) What is meant by soil conservation? Name two methods. [2]\n\n(b) Distinguish between terrace farming and contour ploughing. [2]\n\n(c) Explain how shelter belts protect farmland in western Rajasthan. [3]\n\n(d) Suggest the most suitable method of soil conservation, with a reason, for: (i) steep slopes of the Darjeeling hills, (ii) gullies near Morena in the Chambal valley, (iii) a bare, eroded wasteland on the Shivalik slopes. [3]',
  model: '(a) Protecting soil from erosion and maintaining its fertility; for example, terrace farming and shelter belts (also contour ploughing, afforestation).\n\n(b) Terrace farming cuts a steep slope into flat steps, each holding water and soil; contour ploughing makes furrows across a gentle slope along lines of equal height, so each furrow slows the runoff.\n\n(c) Rows of trees and shrubs planted across the path of the prevailing wind slow it down near the ground; they trap blowing sand before it reaches the fields; their roots bind the soil and their shade reduces drying, so less soil is lifted.\n\n(d) (i) Terrace farming: the slopes are steep, and terraces stop water rushing down. (ii) Plugging the gullies with check dams and planting grass and trees in them: this stops the channels growing. (iii) Afforestation: tree roots bind the soil and leaf litter rebuilds humus.',
  sol: 'Meaning; terrace versus contour; shelter belts; methods for three places.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 3, c: 'application', t: [5],
}));
const HA5 = 5;
const fiveContour = HA5 * LOSS.contour;
add('long-data', long({
  stem: `Study the illustrative field trial (soil lost in tonnes per hectare per year): ${trialText}.\n\n(a) Which method gives the least soil loss, and how many tonnes per hectare less does it lose than ploughing up and down? [2]\n\n(b) Calculate the total soil lost in a year from a ${HA5}-hectare field under contour ploughing alone. [2]\n\n(c) Explain why the terraced plot loses the least soil. [3]\n\n(d) A farmer on a gentle slope in Jharkhand cannot afford to build terraces. Using the data, advise him on two methods he could use, and explain how each helps. [3]`,
  model: `(a) The terraced field; $${LOSS.updown} - ${LOSS.terrace} = ${LOSS.updown - LOSS.terrace}$ t per hectare less.\n\n(b) $${HA5} \\times ${LOSS.contour} = ${fiveContour}$ t a year.\n\n(c) Terraces turn the slope into level steps, so water stands on each step instead of running downhill; it soaks in rather than carrying soil away; the walls or banks of each step trap any soil that moves.\n\n(d) Contour ploughing, which cuts the loss from ${LOSS.updown} to ${LOSS.contour} t per hectare: furrows across the slope hold back water. Adding grass strips between crop strips (strip cropping) cuts it further to ${LOSS.strip} t: the strips slow the water and trap soil.`,
  sol: `Terraces, ${LOSS.updown - LOSS.terrace} t less; ${fiveContour} t; level steps hold water; contour ploughing and strip cropping.`,
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 4, c: 'analysis', t: [4, 5],
}), () => (LOSS.updown - LOSS.terrace === 32 && fiveContour === 110) || 'data');
