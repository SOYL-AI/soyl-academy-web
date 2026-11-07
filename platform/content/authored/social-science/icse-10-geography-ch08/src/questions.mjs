// ICSE 10 Geography ch08 Natural Vegetation — question bank (ICSE 2027 specimen style). Data items use the ILLUSTRATIVE station
// rainfall, mountain temperatures and forest-area table exported by svgs.mjs, and every computed answer is asserted.
import { mk, add } from './lib.mjs';
import { STATIONS, forestFor, tempAt, LAPSE, BASE, FOREST_AREA, forestTotal, share } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const stQ = STATIONS.find((s) => s.id === 'Q');
const areaText = FOREST_AREA.map((r) => `${r.type.toLowerCase()} ${r.km2}`).join(', ');

// ---------------------------------------------------------------- t01 importance of forests
add('importance-chk', mcq({
  stem: 'Which of these is an ecological (environmental) benefit, rather than an economic benefit, of the forests of the Western Ghats?',
  right: 'Their roots hold the soil and slow runoff, reducing floods downstream',
  wrong: ['They supply teak and rosewood for furniture', 'They provide bamboo for paper mills', 'They yield honey and lac for sale'],
  sol: 'Protecting soil and water is an ecological benefit; the others are products — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('minor-mcq', mcq({
  stem: 'Tendu leaves collected from the forests of Chhattisgarh and Odisha are used mainly for:',
  right: 'wrapping bidis',
  wrong: ['making paper pulp', 'producing quinine', 'tanning leather'],
  sol: 'A minor forest product — option (@K).',
  d: 2, c: 'recall', t: [1],
}));
add('industry-mcq', mcq({
  stem: 'A paper mill is set up close to the bamboo forests of Assam. This shows that forests:',
  right: 'supply raw materials to industries',
  wrong: ['control the climate of the region', 'are useful only to wildlife', 'prevent soil erosion and nothing else'],
  sol: 'Bamboo is pulped for paper — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('ar-forest-rain', ar({
  a: 'Forests help to recharge groundwater.',
  r: 'Roots and a layer of fallen leaves let rainwater soak slowly into the ground instead of running off.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('tf-forest', tf({
  stem: 'Forests help to keep the air clean by absorbing carbon dioxide and releasing oxygen.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [1],
}));
add('importance-short2', short({
  marks: 2,
  stem: 'Give two ways in which the forests of the Nilgiri hills help to conserve soil and water for the plains below.',
  model: 'Tree roots bind the soil on the slopes and fallen leaves cover the ground, so heavy rain washes away less soil. The forest floor slows runoff and lets rain soak in, recharging groundwater and keeping the streams that flow to the plains running after the rains.',
  sol: 'Soil held by roots and litter; water soaks in, streams flow longer.',
  scheme: [['Soil', 1], ['Water', 1]],
  d: 2, c: 'application', t: [1],
}));
add('tribal-short2', short({
  marks: 2,
  stem: 'Explain two ways in which the forests of the Bastar region are important to the tribal people who live there.',
  model: 'They provide food, fuelwood, fodder and building material for daily needs. They also give income from minor products such as tendu leaves, lac, honey, gum and medicinal plants that the people collect and sell.',
  sol: 'Daily needs; income from minor products.',
  scheme: [['Daily needs', 1], ['Income', 1]],
  d: 2, c: 'application', t: [1],
}));
add('importance-short3', short({
  marks: 3,
  stem: 'A hill district in Uttarakhand loses most of its forest cover. Explain three effects this is likely to have on the district and the plains downstream.',
  model: 'Without roots and leaf litter, rain washes the topsoil off the slopes, so farmland loses fertility and landslides increase. Runoff reaches the rivers quickly, so floods downstream become sudden and severe, while springs dry up after the rains because less water soaks in. The eroded soil settles as silt in rivers and reservoirs, and wildlife and forest-based livelihoods are lost.',
  sol: 'Erosion; floods and drying springs; silting and loss of livelihoods.',
  scheme: [['Soil erosion', 1], ['Floods or water supply', 1], ['Silting, wildlife or livelihoods', 1]],
  d: 4, c: 'analysis', t: [1],
}));

// ---------------------------------------------------------------- t02 evergreen and deciduous forests
add('evergreen-chk', mcq({
  stem: 'The tropical evergreen forests of the Andaman Islands look green throughout the year because:',
  right: 'trees shed their leaves at different times, as there is no marked dry season',
  wrong: ['the trees never shed any leaves at all', 'they grow only on sand dunes near the sea', 'their leaves are needle-shaped and waxy'],
  sol: 'Leaf fall is spread through the year — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('evergreen-where-mcq', mcq({
  stem: 'Tropical evergreen forests are found mainly on:',
  right: 'the western slopes of the Western Ghats, the north-eastern hills and the Andaman and Nicobar Islands',
  wrong: ['the Thar desert and Kutch', 'the interior Deccan plateau and the Malwa plateau', 'the plains of western Uttar Pradesh'],
  sol: 'These are the areas with over 200 cm of rain — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('exploit-mcq', mcq({
  stem: 'The evergreen forests of Arunachal Pradesh are rich in hardwoods, yet they supply less commercial timber than the deciduous forests of Madhya Pradesh. A main reason is that:',
  right: 'trees of many species grow mixed together in dense forest that is hard to reach',
  wrong: ['they contain no hardwood trees', 'their trees shed all their leaves in summer', 'they grow only in the rain-shadow'],
  sol: 'Mixed stands, dense growth and difficult access make logging costly — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('tree-evergreen-mcq', mcq({
  stem: 'Which group contains only trees of the tropical evergreen forests?',
  right: 'Ebony, mahogany and rosewood',
  wrong: ['Teak, sal and sandalwood', 'Deodar, pine and spruce', 'Babul, khejri and kikar'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('deciduous-chk', mcq({
  stem: 'Teak and sal trees on the Chota Nagpur plateau shed their leaves for some weeks in the dry summer mainly to:',
  right: 'reduce the loss of water through their leaves',
  wrong: ['make room for new branches', 'protect themselves from frost', 'attract insects for pollination'],
  sol: 'Leaf fall cuts transpiration during the dry season — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('moist-dry-mcq', mcq({
  stem: 'A forest in south Bihar receives about 85 cm of rain a year, and teak, peepal and neem grow in open stands with grassy patches. It is best classed as:',
  right: 'tropical dry deciduous forest',
  wrong: ['tropical evergreen forest', 'tropical moist deciduous forest', 'littoral (mangrove) forest'],
  sol: '70–100 cm with open stands → dry deciduous — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('station-mcq', mcq({
  stem: `An illustrative station on the ${stQ.where} receives ${stQ.cm} cm of rain a year. The natural vegetation expected there is:`,
  right: 'tropical moist deciduous forest',
  wrong: ['tropical evergreen forest', 'tropical thorn forest', 'alpine meadow'],
  sol: `${stQ.cm} cm lies between 100 and 200 cm → moist deciduous — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => forestFor(stQ.cm) === 'Moist deciduous' || forestFor(stQ.cm));
add('sandal-mcq', mcq({
  stem: 'Sandalwood, used for carving and for perfume oil, comes mainly from the deciduous forests of:',
  right: 'Karnataka',
  wrong: ['Rajasthan', 'Punjab', 'the Sundarbans'],
  sol: 'Option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('sal-use-mcq', mcq({
  stem: 'Sal timber is widely used for railway sleepers and construction because it is:',
  right: 'hard, strong and durable',
  wrong: ['light and soft', 'rich in latex', 'strongly scented'],
  sol: 'Option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('commercial-mcq', mcq({
  stem: 'Tropical deciduous forests are commercially the most important forests of India because:',
  right: 'they cover a large area and yield valuable timber such as teak and sal in fairly pure stands',
  wrong: ['they are found only on the Andaman Islands', 'their trees never shed leaves', 'they consist mostly of softwood conifers'],
  sol: 'Option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('ar-evergreen', ar({
  a: 'Tropical evergreen forests have several storeys of trees.',
  r: 'Heavy rain and high temperatures throughout the year allow plants to grow all the time and compete for sunlight.',
  key: 'c',
  sol: 'Both are true, and R explains the layered structure — option (c).',
  d: 3, c: 'analysis', t: [2],
}));
add('ar-deciduous', ar({
  a: 'Tropical deciduous forests are also called monsoon forests.',
  r: 'They grow in regions that have no dry season.',
  key: 'a',
  sol: 'A is true; R is false: these forests have a marked dry season, when the trees shed their leaves — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('tf-evergreen', tf({
  stem: 'A lowland station receiving only 40 cm of rain a year would naturally support tropical evergreen forest.',
  key: 'f',
  sol: 'False: under about 70 cm supports only thorn forest and scrub.',
  d: 2, c: 'application', t: [2],
}), () => forestFor(40) === 'Tropical desert (thorn)' || 'band');
add('fill-monsoon', fill({
  stem: 'Tropical deciduous forests are also called ___ forests.',
  acc: [['monsoon']],
  sol: '**Monsoon** forests.',
  d: 1, c: 'recall', t: [2],
}));
add('fill-cinchona', fill({
  stem: 'Quinine, a medicine for malaria, is obtained from the bark of the ___ tree of the evergreen forests.',
  acc: [['cinchona']],
  sol: '**Cinchona**.',
  d: 1, c: 'recall', t: [2],
}));
add('s1-teak', short({
  marks: 1,
  stem: 'Name one tree of the tropical moist deciduous forests that yields valuable timber.',
  model: 'Teak (sal is also accepted).',
  sol: 'Teak.',
  scheme: [['Teak / sal', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('evergreen-short2', short({
  marks: 2,
  stem: 'Relate two features of the forests on the windward slopes of the Western Ghats to the climate of the region.',
  model: 'Heavy rain (over 200 cm) and high temperatures all year let plants grow continuously, so the forest is very dense with several storeys of tall trees. As there is no long dry season, trees shed leaves at different times and the forest stays green all year.',
  sol: 'Dense and storeyed (rain, warmth); evergreen (no dry season).',
  scheme: [['Dense, storeyed with reason', 1], ['Evergreen with reason', 1]],
  d: 2, c: 'application', t: [2],
}));
add('deciduous-short2', short({
  marks: 2,
  stem: 'A forest in Chhattisgarh gets about 150 cm of rain a year and one on the plains of south Bihar about 80 cm. Name the forest type of each and one tree found in each.',
  model: 'Chhattisgarh: tropical moist deciduous forest, with sal (or teak, bamboo). South Bihar: tropical dry deciduous forest, with neem (or peepal, teak).',
  sol: 'Moist deciduous with sal; dry deciduous with neem.',
  scheme: [['Chhattisgarh', 1], ['South Bihar', 1]],
  d: 2, c: 'application', t: [2],
}), () => (forestFor(150) === 'Moist deciduous' && forestFor(80) === 'Dry deciduous') || 'bands');
add('compare-short3', short({
  marks: 3,
  stem: 'Compare tropical evergreen and tropical deciduous forests under three heads: rainfall, leaf shedding and commercial value.',
  model: 'Rainfall: evergreen forests need over about 200 cm; deciduous forests grow with about 70–200 cm. Leaf shedding: evergreen trees shed leaves at different times, so the forest is never bare; deciduous trees shed their leaves together in the dry season. Commercial value: evergreen forests are hard to exploit because species are mixed and access is poor; deciduous forests, with fairly pure stands of teak and sal, are the main source of timber.',
  sol: 'Rainfall; leaf shedding; commercial value.',
  scheme: [['Rainfall', 1], ['Leaf shedding', 1], ['Commercial value', 1]],
  d: 3, c: 'analysis', t: [2],
}));

// ---------------------------------------------------------------- t03 desert, littoral and mountain vegetation
add('desert-adapt-mcq', mcq({
  stem: 'Plants such as babul and cactus in western Rajasthan have small or thorny leaves mainly to:',
  right: 'reduce the loss of water by transpiration',
  wrong: ['catch more sunlight', 'store salt from the sea', 'let snow slide off'],
  sol: 'Small leaves lose less water — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('roots-mcq', mcq({
  stem: 'A khejri tree near Barmer stays green through months without rain. The most likely reason is that:',
  right: 'its long roots reach water deep below the surface',
  wrong: ['it receives rain in every month of the year', 'it grows in standing water', 'its large broad leaves trap dew'],
  sol: 'Deep roots tap groundwater — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('mangrove-chk', mcq({
  stem: 'Mangrove trees of the Sundarbans have roots that grow upward out of the mud. These breathing roots help the trees to:',
  right: 'take in air, because the waterlogged mud has little oxygen',
  wrong: ['store water for the dry season', 'climb other trees to reach sunlight', 'absorb salt from the air'],
  sol: 'Pneumatophores take in air at low tide — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('sundari-mcq', mcq({
  stem: 'Timber of the sundari tree of the Ganga–Brahmaputra delta is valued for boat-building mainly because it is:',
  right: 'hard and durable, even in water',
  wrong: ['soft and easy to bend into baskets', 'the source of quinine', 'grown only in deserts'],
  sol: 'Option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('mangrove-where-mcq', mcq({
  stem: 'Littoral (tidal) forests are found mainly in:',
  right: 'the deltas of the Ganga, Mahanadi, Godavari, Krishna and Kaveri',
  wrong: ['the Thar desert', 'the Malwa plateau', 'the Himalayas above 4000 m'],
  sol: 'Tidal deltas — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('cyclone-mcq', mcq({
  stem: 'After a cyclone, villages behind a thick belt of mangroves on the Odisha coast suffered less damage than open stretches of coast nearby. The best explanation is that mangroves:',
  right: 'break the force of storm waves and hold the coastal mud in place',
  wrong: ['stop cyclones from forming over the sea', 'raise the land far above sea level', 'absorb all the cyclone’s rain'],
  sol: 'Dense roots and trunks act as a natural barrier — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('mountain-chk', mcq({
  stem: 'Climbing from the foothills towards the snowline in Himachal Pradesh, a trekker passes sal forest, then oak and chestnut, then pine and deodar, and finally meadows. The main reason for this change is that:',
  right: 'temperature falls as altitude increases',
  wrong: ['rainfall increases steadily with height', 'the soil becomes more fertile with height', 'the land becomes flatter with height'],
  sol: 'Cooling with height produces belts of vegetation — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('conifer-mcq', mcq({
  stem: 'Deodar, pine, spruce and fir are typical of which belt of Himalayan vegetation?',
  right: 'Temperate coniferous forest, roughly 2000 to 3000 m',
  wrong: ['Tropical moist deciduous forest of the foothills', 'Littoral forest', 'Tropical thorn forest'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('meadow-mcq', mcq({
  stem: 'In summer, Gujjar and Bakarwal herders take their flocks up to:',
  right: 'alpine meadows high in the Himalayas',
  wrong: ['the mangrove swamps of the Sundarbans', 'the thorn forests of Kutch', 'the evergreen forests of the Andamans'],
  sol: 'High pastures above the tree line are used for summer grazing — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('ar-mountain', ar({
  a: 'Vegetation in the Himalayas changes from tropical to alpine types as one climbs.',
  r: 'The Himalayas receive no rainfall.',
  key: 'a',
  sol: 'A is true; R is false: the change is due to falling temperature, and the Himalayas do receive rain and snow — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('ar-mangrove', ar({
  a: 'Mangrove forests grow widely on the Malwa plateau.',
  r: 'Mangroves can tolerate salty water.',
  key: 'b',
  sol: 'A is false: mangroves grow on tidal coasts and deltas; R is true — option (b).',
  d: 2, c: 'understanding', t: [3],
}));
add('tf-tidal', tf({
  stem: 'Littoral forests grow mainly on the deltas of rivers and on coasts flooded by tides.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [3],
}));
add('tf-alpine', tf({
  stem: 'A trekker in Uttarakhand who finds oak and chestnut forest at about 1500 m can expect alpine meadows, not sal forest, at about 4000 m.',
  key: 't',
  sol: 'True: vegetation belts rise in order of falling temperature; meadows lie above the tree line.',
  d: 2, c: 'application', t: [3],
}));
add('fill-pneumato', fill({
  stem: 'The upward-growing breathing roots of mangrove trees are called ___.',
  acc: [['pneumatophores', 'pneumatophore', 'breathing roots']],
  sol: '**Pneumatophores**.',
  d: 1, c: 'recall', t: [3],
}));
add('fill-conifer', fill({
  stem: 'Cone-bearing trees with needle-shaped leaves, such as pine and deodar, are called ___ trees.',
  acc: [['coniferous', 'conifer', 'conifers']],
  sol: '**Coniferous** trees.',
  d: 1, c: 'recall', t: [3],
}));
add('match-zone', match({
  marks: 2,
  stem: 'Match each approximate altitude in the Himalayas (Column A) with its typical vegetation (Column B).',
  pairs: [
    ['Foothills, below about 1000 m', 'Sal forest'],
    ['About 1000–2000 m', 'Oak and chestnut'],
    ['About 2000–3000 m', 'Pine and deodar'],
    ['Above about 3600 m', 'Alpine meadows'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Foothills → sal; 1000–2000 m → oak, chestnut; 2000–3000 m → pine, deodar; above 3600 m → meadows.',
  d: 2, c: 'understanding', t: [3],
}));
add('match-tree', match({
  marks: 2,
  stem: 'Match each forest type in Column A with a tree typical of it in Column B.',
  pairs: [
    ['Tropical evergreen', 'Ebony'],
    ['Tropical moist deciduous', 'Teak'],
    ['Tropical thorn', 'Babul'],
    ['Littoral', 'Sundari'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Evergreen → ebony; moist deciduous → teak; thorn → babul; littoral → sundari.',
  d: 1, c: 'recall', t: [2, 3],
}));
add('desert-short2', short({
  marks: 2,
  stem: 'Explain two ways in which trees such as babul and khejri near Barmer are able to survive the dry climate.',
  model: 'Their roots grow very long and spread wide, so they can reach water deep underground. Their leaves are small, thorny or waxy, so they lose very little water through transpiration (some desert plants also store water in fleshy stems).',
  sol: 'Long roots; small, thorny or waxy leaves.',
  scheme: [['Roots', 1], ['Leaves', 1]],
  d: 2, c: 'application', t: [3],
}));
add('mangrove-short2', short({
  marks: 2,
  stem: 'Explain two ways in which mangrove trees of the Sundarbans survive in salty, tidal mud.',
  model: 'They tolerate salt water that would kill most plants, and their stilt roots anchor them firmly in the soft mud against the tides. Breathing roots grow upward out of the mud and take in air at low tide, since the waterlogged mud has little oxygen.',
  sol: 'Salt tolerance and stilt roots; breathing roots.',
  scheme: [['Salt tolerance or stilt roots', 1], ['Breathing roots', 1]],
  d: 2, c: 'application', t: [3],
}));
add('mountain-short3', short({
  marks: 3,
  stem: 'Describe how vegetation changes with altitude in the Himalayas, naming one tree in each of three belts.',
  model: 'Temperature falls with height, so vegetation changes in belts. In the foothills below about 1000 m, tropical moist deciduous forest with sal grows. From about 1000 to 2000 m there is wet temperate forest of oak and chestnut; from about 2000 to 3000 m, coniferous forest of pine, deodar and fir. Higher up come alpine trees such as birch and juniper, then alpine meadows, mosses and lichens.',
  sol: 'Belts with altitude, one tree each.',
  scheme: [['Reason: temperature falls', 1], ['Two belts with trees', 1], ['Third belt with tree', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 forest conservation
add('conserve-chk', mcq({
  stem: 'Planting trees on a stretch of bare, rocky wasteland near Jodhpur where no forest has existed in living memory is an example of:',
  right: 'afforestation',
  wrong: ['reforestation', 'agroforestry', 'shifting cultivation'],
  sol: 'New forest on land without one — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('reforest-mcq', mcq({
  stem: 'After a fire destroyed part of a sal forest in Jharkhand, the forest department planted young sal trees on the burnt patch. This is:',
  right: 'reforestation',
  wrong: ['afforestation', 'agroforestry', 'social forestry'],
  sol: 'An existing forest is restored — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('social-mcq', mcq({
  stem: 'A panchayat in Haryana plants trees along roadsides, canal banks and the village common land to supply fuelwood and fodder to villagers. This is:',
  right: 'social forestry',
  wrong: ['agroforestry', 'reforestation of a reserved forest', 'a commercial timber plantation'],
  sol: 'Public land, community benefit — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('agro-mcq', mcq({
  stem: 'A farmer in Punjab grows poplar trees along the edges of his wheat fields and between rows of crops. This practice is:',
  right: 'agroforestry',
  wrong: ['social forestry', 'reforestation', 'shifting cultivation'],
  sol: 'Trees and crops on the same farm — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('vanm-mcq', mcq({
  stem: 'Van Mahotsav, started in 1950, is:',
  right: 'a tree-planting festival held every year in July',
  wrong: ['a movement in which villagers hugged trees', 'a law that bans all tree felling', 'a national park in the Himalayas'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('ar-agro', ar({
  a: 'Agroforestry can give farmers extra income.',
  r: 'Van Mahotsav is celebrated in the first week of July.',
  key: 'd',
  sol: 'Both are true, but the date of Van Mahotsav does not explain why agroforestry adds income (timber, fruit and fodder from the trees do) — option (d).',
  d: 3, c: 'analysis', t: [4],
}));
add('tf-reforest', tf({
  stem: 'Reforestation means planting trees on land that has never carried a forest.',
  key: 'f',
  sol: 'False: that is afforestation; reforestation is replanting where forest was cut or destroyed.',
  d: 1, c: 'understanding', t: [4],
}));
add('fill-vanm', fill({
  stem: 'The tree-planting festival held in India every year in the first week of July is called ___.',
  acc: [['Van Mahotsav', 'Vana Mahotsav', 'Van Mahotsava', 'Vanamahotsav']],
  sol: '**Van Mahotsav**.',
  d: 1, c: 'recall', t: [4],
}));
add('s1-vanm', short({
  marks: 1,
  stem: 'State the aim of Van Mahotsav.',
  model: 'To make people aware of the value of trees and encourage them to plant and care for saplings.',
  sol: 'Awareness and tree planting.',
  scheme: [['Aim', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('conserve-short2', short({
  marks: 2,
  stem: 'Distinguish between afforestation and reforestation.',
  model: 'Afforestation is planting trees on land that has not carried forest, such as wasteland or dunes, to create a new forest. Reforestation is replanting trees on land where a forest has been cut, burnt or otherwise destroyed, to restore it.',
  sol: 'New forest versus restored forest.',
  scheme: [['Afforestation', 1], ['Reforestation', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('socialagro-short2', short({
  marks: 2,
  stem: 'Distinguish between social forestry and agroforestry, giving an example of each.',
  model: 'Social forestry is planting trees on public and community land, such as roadsides, canal banks and village commons, to meet local needs for fuel and fodder; for example, trees along canal banks in Haryana. Agroforestry is growing trees together with crops on private farmland; for example, poplar among wheat fields in Punjab.',
  sol: 'Public land versus farmland, with examples.',
  scheme: [['Social forestry with example', 1], ['Agroforestry with example', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('plan-short3', short({
  marks: 3,
  stem: 'A treeless village on the plains of Haryana needs fuelwood and fodder and wants to protect its fields from hot summer winds. Suggest three forest-conservation measures from this chapter, with a reason for each.',
  model: 'Social forestry: plant fast-growing trees on roadsides, canal banks and the village common land to supply fuelwood and fodder without cutting other forests. Agroforestry: farmers grow trees such as poplar or shisham on field boundaries, which also gives extra income and acts as a windbreak against hot winds. Celebrate Van Mahotsav each July with school and village planting drives, so that people care for the saplings.',
  sol: 'Social forestry; agroforestry; Van Mahotsav (afforestation of wasteland also accepted).',
  scheme: [['Measure 1 with reason', 1], ['Measure 2 with reason', 1], ['Measure 3 with reason', 1]],
  d: 3, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- numericals on illustrative data
const t2000 = tempAt(2000);
const t3600 = tempAt(3600);
add('temp2000-num', num({
  stem: `At the foot of a Himalayan range (illustrative) the mean summer temperature is ${BASE.temp} °C. If temperature falls by ${LAPSE} °C for every 1000 m, what is the expected temperature at 2000 m, in °C?`,
  value: t2000, tol: 0.1, unit: '°C',
  sol: `Temperature $= ${BASE.temp} - ${LAPSE} \\times 2 = ${t2000}$ °C.`,
  scheme: [[`${t2000} °C`, 1]],
  d: 2, c: 'application', t: [3],
}), () => t2000 === 17 || `t2000 ${t2000}`);
add('temp3600-num', num({
  stem: `Using the same illustrative figures (${BASE.temp} °C at the foot of the range, a fall of ${LAPSE} °C per 1000 m), find the expected temperature, in °C, at 3600 m, near the upper limit of trees.`,
  value: t3600, tol: 0.1, unit: '°C',
  sol: `Fall $= ${LAPSE} \\times 3.6 = ${Math.round(LAPSE * 3.6 * 10) / 10}$ °C; temperature $= ${BASE.temp} - ${Math.round(LAPSE * 3.6 * 10) / 10} = ${t3600}$ °C.`,
  scheme: [['Fall in temperature', 0.5], [`${t3600} °C`, 0.5]],
  d: 3, c: 'application', t: [3],
}), () => t3600 === 6.6 || `t3600 ${t3600}`);
const sMoist = share('Moist deciduous');
const sEver = share('Tropical evergreen');
add('share-moist-num', num({
  stem: `An imagined state has the following forest areas in sq km (illustrative): ${areaText}. What percentage of its forest is moist deciduous?`,
  value: sMoist, tol: 0.1, unit: '%',
  sol: `Total $= ${FOREST_AREA.map((r) => r.km2).join(' + ')} = ${forestTotal}$ sq km; share $= \\frac{${FOREST_AREA[0].km2}}{${forestTotal}} \\times 100 = ${sMoist}$, so ${sMoist}%.`,
  scheme: [['Total', 0.5], [`${sMoist}%`, 0.5]],
  d: 2, c: 'application', t: [2],
}), () => (forestTotal === 12000 && sMoist === 50) || `moist ${sMoist}`);
add('share-ever-num', num({
  stem: `Using the same illustrative forest areas (${areaText} sq km), find the share of tropical evergreen forest as a percentage of the total.`,
  value: sEver, tol: 0.1, unit: '%',
  sol: `Share $= \\frac{${FOREST_AREA[2].km2}}{${forestTotal}} \\times 100 = ${sEver}$, so ${sEver}%.`,
  scheme: [[`${sEver}%`, 1]],
  d: 2, c: 'application', t: [2],
}), () => sEver === 15 || `ever ${sEver}`);

// ---------------------------------------------------------------- 10-mark structured questions
add('long-importance', long({
  stem: '(a) State two ecological benefits of forests. [2]\n\n(b) State two economic benefits of forests, naming a forest product for each. [2]\n\n(c) Correlate three features of tropical evergreen forests with the climate in which they grow. [3]\n\n(d) Name three trees of tropical evergreen forests and state one use of each. [3]',
  model: '(a) They check soil erosion and floods, as roots bind soil and litter slows runoff; they recharge groundwater and moderate the climate (also give oxygen and shelter wildlife).\n\n(b) Timber for furniture and building (teak, rosewood); raw material for industry, such as bamboo for paper (also minor products like lac, honey and tendu leaves).\n\n(c) Heavy rain over 200 cm and high temperature all year → very dense forest with several storeys of tall trees; no marked dry season → leaves shed at different times, so the forest is evergreen; constant warmth and moisture → many species grow mixed together, with climbers and undergrowth.\n\n(d) Ebony — fine furniture and carving; mahogany or rosewood — high-quality furniture; cinchona — quinine for malaria (rubber — latex).',
  sol: 'Ecological; economic; features with climate; trees with uses.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 2, c: 'understanding', t: [1, 2],
}));
const sDry = share('Dry deciduous');
add('long-deciduous', long({
  stem: `(a) Why are tropical deciduous forests also called monsoon forests? [2]\n\n(b) An imagined state has these forest areas in sq km (illustrative): ${areaText}. Calculate the share of moist deciduous and of dry deciduous forest in its total forest area. [2]\n\n(c) Give three reasons why tropical deciduous forests are commercially the most important forests of India. [3]\n\n(d) Name three trees of tropical deciduous forests and state one use of each. [3]`,
  model: `(a) They grow in regions of monsoon climate with a distinct dry season, and their trees shed leaves for some weeks in that dry season to save water.\n\n(b) Total $= ${forestTotal}$ sq km; moist deciduous $= \\frac{${FOREST_AREA[0].km2}}{${forestTotal}} \\times 100 = ${sMoist}$%; dry deciduous $= \\frac{${FOREST_AREA[1].km2}}{${forestTotal}} \\times 100 = ${sDry}$%.\n\n(c) They cover the largest area of any forest type; they yield valuable timber such as teak and sal; trees of one kind grow in fairly pure stands, and the forests are more accessible, so logging is easier and cheaper.\n\n(d) Teak — furniture, doors and boats; sal — railway sleepers and building; sandalwood — carving and perfume oil (bamboo — paper pulp).`,
  sol: `Monsoon climate; ${sMoist}% and ${sDry}%; area, timber, pure stands; trees with uses.`,
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 3, c: 'application', t: [2],
}), () => sDry === 30 || `dry ${sDry}`);
add('long-desert-mangrove', long({
  stem: '(a) Name two regions of India where tropical desert vegetation is found. [2]\n\n(b) Name two trees of littoral forests and state where such forests grow. [2]\n\n(c) Explain three ways in which desert plants are adapted to a dry climate. [3]\n\n(d) Explain why mangroves are important for the coastal people of the Sundarbans. [3]',
  model: '(a) Western Rajasthan and Kutch in Gujarat (also south-west Punjab and Haryana).\n\n(b) Sundari and keora (also agar, nipa); in the tidal deltas of the Ganga–Brahmaputra, Mahanadi, Godavari, Krishna and Kaveri, and on the Andaman and Nicobar coasts.\n\n(c) Long roots reach water deep below the surface; small, thorny or waxy leaves reduce water loss by transpiration; thick, fleshy stems store water for the dry months, and plants grow far apart.\n\n(d) Mangroves break the force of storm waves and cyclones and stop the coast from being eroded; they provide timber for boats, fuelwood, honey and thatch; their roots shelter fish, crabs and prawns, on which many families depend.',
  sol: 'Desert regions; littoral trees and areas; adaptations; value of mangroves.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 3, c: 'application', t: [3],
}));
add('long-mountain', long({
  stem: `(a) Why does natural vegetation change with altitude in the Himalayas? [2]\n\n(b) The mean summer temperature at the foot of a range is ${BASE.temp} °C (illustrative), and it falls by ${LAPSE} °C for every 1000 m. Calculate the expected temperature at 1000 m and at 3000 m. [2]\n\n(c) Describe the vegetation found between about 1000 m and 3000 m, naming two trees. [3]\n\n(d) Explain how the alpine meadows and the coniferous forests of the Himalayas are useful to people. [3]`,
  model: `(a) Temperature falls with height (and conditions become colder and windier), so plants suited to warmth give way to those suited to cold, producing belts of vegetation.\n\n(b) At 1000 m: $${BASE.temp} - ${LAPSE} = ${tempAt(1000)}$ °C; at 3000 m: $${BASE.temp} - ${LAPSE} \\times 3 = ${tempAt(3000)}$ °C.\n\n(c) From about 1000 to 2000 m: wet temperate forest of broad-leaved trees such as oak and chestnut. From about 2000 to 3000 m: temperate coniferous forest of tall, cone-shaped trees with needle leaves, such as pine, deodar, spruce and silver fir.\n\n(d) Alpine meadows provide summer pasture for the flocks of herders such as the Gujjars and Bakarwals. Coniferous forests give softwood for construction, furniture and paper pulp, resin from pine for turpentine, and fuelwood; they also protect slopes from erosion.`,
  sol: `Temperature falls; ${tempAt(1000)} °C and ${tempAt(3000)} °C; oak, chestnut, pine, deodar; pastures and softwood.`,
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 4, c: 'analysis', t: [3],
}), () => (tempAt(1000) === 23.5 && tempAt(3000) === 10.5) || 'temps');
add('long-conserve', long({
  stem: '(a) Distinguish between afforestation and reforestation. [2]\n\n(b) What is Van Mahotsav? When did it begin? [2]\n\n(c) Explain social forestry and agroforestry, with an example of each. [3]\n\n(d) Give three reasons why forest conservation is necessary in India. [3]',
  model: '(a) Afforestation creates new forest by planting trees on land without forest, such as wasteland; reforestation restores forest by replanting where it has been cut or burnt.\n\n(b) A national tree-planting festival held every year in the first week of July to spread awareness of the value of trees; it began in 1950.\n\n(c) Social forestry is planting trees on public and community land, such as roadsides, canal banks and village commons, to meet local needs for fuel, fodder and small timber — for example, canal-bank planting in Haryana. Agroforestry is growing trees along with crops on farmland, giving extra income and protecting the soil — for example, poplar among wheat fields in Punjab.\n\n(d) Forests are being lost to clearing, overgrazing and fires, which leads to soil erosion, floods and silting of reservoirs; many people depend on forests for fuel, fodder and income; forests are home to wildlife and help keep the climate and water cycle balanced.',
  sol: 'Afforestation and reforestation; Van Mahotsav; social forestry and agroforestry; reasons.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 2, c: 'understanding', t: [1, 4],
}));
