// ICSE 10 Geography ch17 Transport — question bank (ICSE 2027 specimen style). Data items use the ILLUSTRATIVE freight
// costs and speeds exported by svgs.mjs; every computed answer is asserted. MCQ keys are placed by the builder.
import { mk, add } from './lib.mjs';
import { MODES, cost, speed, freight, hours } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const rateList = MODES.map(([m, c, v]) => `${m} ₹${c.toFixed(1)} per tonne-km at ${v} km/h`).join('; ');

// ---------------------------------------------------------------- t01 importance and modes
add('imp-chk', mcq({
  stem: 'The steel plant at Rourkela receives iron ore and coal by train and sends out steel by road, rail and sea. This shows that transport:',
  right: 'links raw materials, factories and markets',
  wrong: ['is needed only for passenger travel', 'matters only for exports', 'is unimportant once a factory is built'],
  sol: 'Transport joins sources of raw materials, industry and markets — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('integration-mcq', mcq({
  stem: 'Transport is said to promote national integration because it:',
  right: 'brings people and goods of different regions into regular contact',
  wrong: ['keeps each region self-sufficient and separate', 'reduces the number of languages spoken', 'is managed only by state governments'],
  sol: 'Option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('relief-mcq', mcq({
  stem: 'When floods cut the roads of several districts of Kerala, helicopters and boats carried food and medicines to stranded villages. This shows the importance of transport for:',
  right: 'disaster relief',
  wrong: ['tourism only', 'collecting taxes', 'the growth of plantations'],
  sol: 'Option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('chain-mcq', mcq({
  stem: 'Basmati rice from Karnal in Haryana is to be exported to the Gulf countries. Which chain of transport is most sensible?',
  right: 'Truck to a rail container depot, train to Mundra port in Gujarat, then ship to the Gulf',
  wrong: ['Aircraft for the whole consignment of several thousand tonnes', 'Barges down the Yamuna to the Arabian Sea', 'Trucks all the way to the Gulf by road'],
  sol: 'Road for the short haul, rail for the long haul, ship overseas — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('imp-tf', tf({
  stem: 'Pipelines are a form of land transport.',
  key: 't',
  sol: 'True: pipelines carry oil, gas and petroleum products over land.',
  d: 1, c: 'recall', t: [1],
}));
add('hinterland-fill', fill({
  stem: 'The area served by a port, from which it receives goods for export and to which it sends imports, is called its ___.',
  acc: [['hinterland']],
  sol: '**Hinterland**.',
  d: 1, c: 'recall', t: [1, 6],
}));
add('imp-short2', short({
  marks: 2,
  stem: 'Give two reasons why an efficient transport network is essential for India’s development.',
  model: 'It carries raw materials to factories and finished goods to markets, so agriculture, industry and trade can grow; it links remote and border areas with the rest of the country for relief, defence and national integration.',
  sol: 'Economic link; integration or relief.',
  scheme: [['First reason', 1], ['Second reason', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('imp-short3', short({
  marks: 3,
  stem: 'Explain how good transport helps (a) an apple grower in Himachal Pradesh, (b) the steel plant at Bhilai and (c) a village in a flood-hit district.',
  model: '(a) Fast road transport carries the perishable apples to markets in Delhi and other cities before they spoil, so the grower gets better prices. (b) Railways bring iron ore, coal and limestone cheaply and carry steel to distant buyers. (c) Roads, boats and helicopters bring food, medicines and rescue teams quickly.',
  sol: 'Market access; raw materials; relief.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 roadways
add('road-chk', mcq({
  stem: 'Roads in the hills of Uttarakhand are often blocked for days during the monsoon. The main reason is:',
  right: 'landslides on steep slopes after heavy rain',
  wrong: ['shifting sand dunes', 'snowfall in July', 'too little traffic'],
  sol: 'Heavy rain on steep slopes triggers landslides — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('ladakh-mcq', mcq({
  stem: 'The road over the high passes to Leh in Ladakh is closed for several months every year mainly because of:',
  right: 'heavy snowfall on the passes in winter',
  wrong: ['monsoon floods', 'shifting sand dunes', 'tidal flooding'],
  sol: 'Option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('milk-mcq', mcq({
  stem: 'Milk from hundreds of villages around Anand in Gujarat reaches the dairy every morning by road rather than by rail. The main reason is that roads:',
  right: 'allow quick, door-to-door collection over short distances',
  wrong: ['are cheaper than rail for all distances and loads', 'never suffer from traffic jams', 'carry larger loads than goods trains'],
  sol: 'Door-to-door, flexible, quick for short hauls of perishables — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('coal-truck-mcq', mcq({
  stem: 'Why would it be uneconomical to send 3,000 tonnes of coal from Jharia to a power station 1,000 km away entirely by truck?',
  right: 'Road freight is costly for bulky goods over long distances, and so many trucks would add congestion and pollution',
  wrong: ['Trucks cannot carry coal at all', 'Roads do not reach coalfields', 'Coal must always travel by air'],
  sol: 'Rail (or water) is cheaper for bulky long hauls — option (@K).',
  d: 3, c: 'analysis', t: [2, 4],
}));
add('delta-road-mcq', mcq({
  stem: 'Building roads in the Sundarbans delta of West Bengal is especially difficult and costly mainly because:',
  right: 'many tidal rivers and creeks need bridges, and the soft, flood-prone ground is unstable',
  wrong: ['the region has steep mountain slopes', 'snow blocks it for half the year', 'it is a dry, sandy desert'],
  sol: 'Rivers, creeks and soft ground — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('road-ar2', ar({
  a: 'Roads can reach hilly areas where railways are difficult to build.',
  r: 'Road transport causes no pollution.',
  key: 'c',
  sol: 'A is true (roads can climb steep slopes with bends); R is false — vehicles cause air and noise pollution — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('road-tf', tf({
  stem: 'Roads are generally cheaper to build than railways.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'understanding', t: [2],
}));
add('road-short1', short({
  marks: 1,
  stem: 'Name the organisation that builds and maintains strategic roads in the border areas of India.',
  model: 'The Border Roads Organisation.',
  sol: 'Border Roads Organisation.',
  scheme: [['Border Roads Organisation', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('road-short2', short({
  marks: 2,
  stem: 'Explain two factors that make road building difficult in the Himalayas.',
  model: 'Steep slopes and deep valleys mean that roads need hairpin bends, cuttings, retaining walls, tunnels and bridges, which are slow and costly to build; heavy rain causes landslides, and snow blocks the high passes in winter, so roads must be repaired and cleared often.',
  sol: 'Relief; climate.',
  scheme: [['Relief', 1], ['Climate', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('road-short3', short({
  marks: 3,
  stem: 'State three disadvantages of road transport.',
  model: 'It is costly and slow for carrying bulky goods such as coal or ore over long distances; vehicles cause air and noise pollution and use much fuel; roads suffer accidents and traffic congestion, and they are damaged by heavy rain and floods.',
  sol: 'Cost for bulky hauls; pollution; accidents or weather.',
  scheme: [['First', 1], ['Second', 1], ['Third', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('road-eval-short2', short({
  marks: 2,
  stem: 'A thinly populated district in the Thar desert must choose between a new road and a new railway line to link its villages with the district headquarters. Recommend one, giving two reasons.',
  model: 'A road. It is much cheaper to build and maintain than a railway, which matters where traffic is light and villages are scattered; buses and trucks can give flexible, door-to-door service to many small settlements, and a road is easier to clear of drifting sand than a railway track.',
  sol: 'Road: cost and flexibility.',
  scheme: [['Choice with cost reason', 1], ['Flexibility or maintenance reason', 1]],
  d: 3, c: 'evaluation', t: [2, 4],
}));

// ---------------------------------------------------------------- t03 expressways, highways, corridors
add('gq-chk', mcq({
  stem: 'A truck driver travels only on the Golden Quadrilateral. Which set of metropolitan cities can he reach without leaving it?',
  right: 'Delhi, Mumbai, Chennai and Kolkata',
  wrong: ['Delhi, Mumbai, Bengaluru and Hyderabad', 'Srinagar, Kanyakumari, Silchar and Porbandar', 'Kolkata, Patna, Lucknow and Delhi only'],
  sol: 'The GQ joins the four metropolitan cities — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('jhansi-mcq', mcq({
  stem: 'The North–South and East–West corridors cross each other at:',
  right: 'Jhansi',
  wrong: ['Nagpur', 'Bhopal', 'Agra'],
  sol: 'Option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('ns-mcq', mcq({
  stem: 'Which pair of places marks the northern and southern ends of the North–South Corridor?',
  right: 'Srinagar and Kanyakumari',
  wrong: ['Delhi and Chennai', 'Amritsar and Thiruvananthapuram', 'Silchar and Porbandar'],
  sol: 'Option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('expressway-mcq', mcq({
  stem: 'Which feature distinguishes an expressway from an ordinary highway?',
  right: 'Controlled entry and exit with no level crossings, built for fast traffic',
  wrong: ['It is always unpaved', 'It connects only villages', 'It is open only to bullock carts'],
  sol: 'Option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('nh-mcq', mcq({
  stem: 'National Highways in India are built and maintained by:',
  right: 'the Central Government, through agencies such as the NHAI',
  wrong: ['village panchayats', 'district councils only', 'private trucking companies'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('gq-benefit-mcq', mcq({
  stem: 'After its stretch of the Golden Quadrilateral was widened, a truck from Kolkata could reach Chennai much sooner. The main reason is that:',
  right: 'wide, divided lanes and town bypasses allow steady, high speeds',
  wrong: ['the distance between the cities became shorter', 'trucks no longer need fuel', 'the road became a railway'],
  sol: 'Better road quality, not shorter distance — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('gq-ar', ar({
  a: 'Many industries have come up along the Golden Quadrilateral.',
  r: 'Fast, reliable road links lower the cost of bringing in materials and sending out goods.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('gq-ar2', ar({
  a: 'The Golden Quadrilateral passes through Srinagar.',
  r: 'The North–South Corridor begins at Srinagar.',
  key: 'd',
  sol: 'A is false (the GQ joins Delhi, Mumbai, Chennai and Kolkata); R is true — option (d).',
  d: 2, c: 'understanding', t: [3],
}));
add('gq-tf', tf({
  stem: 'The Mumbai–Pune Expressway was India’s first access-controlled expressway.',
  key: 't',
  sol: 'True: it opened in 2002.',
  d: 1, c: 'recall', t: [3],
}));
add('gq-fill', fill({
  stem: 'The East–West Corridor runs from Silchar in Assam to ___ in Gujarat.',
  acc: [['Porbandar']],
  sol: '**Porbandar**.',
  d: 1, c: 'recall', t: [3],
}));
add('gq-short2', short({
  marks: 2,
  stem: 'What is the Golden Quadrilateral? Name the four metropolitan cities it joins.',
  model: 'A network of four- and six-lane National Highways, about 5,800 km long, built under the National Highways Development Project. It joins Delhi, Mumbai, Chennai and Kolkata.',
  sol: 'Meaning; four cities.',
  scheme: [['Meaning', 1], ['Four cities', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('corridor-short3', short({
  marks: 3,
  stem: 'State the meaning of the North–South–East–West Corridor and give two reasons why it is important.',
  model: 'It consists of two long highway corridors: the North–South Corridor from Srinagar to Kanyakumari and the East–West Corridor from Silchar to Porbandar, crossing at Jhansi. It gives fast, safe road links across the whole country, cutting travel time and freight costs; it encourages industries and towns along its route and links distant regions, aiding national integration and defence.',
  sol: 'Meaning with ends; two reasons.',
  scheme: [['Meaning and ends', 1], ['First reason', 1], ['Second reason', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('roadclass-short2', short({
  marks: 2,
  stem: 'Distinguish between a National Highway and a State Highway with reference to (a) the places they link and (b) who maintains them.',
  model: '(a) National Highways link state capitals, major cities, ports and border areas across states; State Highways link a state’s capital with its district headquarters and towns. (b) National Highways are maintained by the Central Government (NHAI); State Highways by the State Government.',
  sol: 'Places linked; maintenance.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 railways
add('rail-chk', mcq({
  stem: 'The railway network of Uttar Pradesh and Bihar is very dense. The main reason is:',
  right: 'flat land with a dense population and much farm and industrial traffic',
  wrong: ['steep slopes that need many tunnels', 'a dry desert with shifting sand', 'very few towns and villages'],
  sol: 'Relief, population and economic activity — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('thar-mcq', mcq({
  stem: 'Few railway lines cross the dunes of western Jaisalmer district. The best explanation is that:',
  right: 'shifting sand can bury tracks, and the area is thinly populated',
  wrong: ['the area receives very heavy rain', 'the land is covered with dense forest', 'it has too many large rivers'],
  sol: 'Desert conditions and low traffic — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('ne-rail-mcq', mcq({
  stem: 'Extending railways into Mizoram has been slow and costly mainly because:',
  right: 'steep, landslide-prone hills and deep valleys need many tunnels and bridges',
  wrong: ['the land is a flat alluvial plain', 'the state has no rainfall', 'there is no demand for travel at all'],
  sol: 'Rugged relief and heavy rain — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('unigauge-mcq', mcq({
  stem: 'Project Unigauge of Indian Railways aims to:',
  right: 'convert metre and narrow gauge lines to broad gauge',
  wrong: ['convert all lines to narrow gauge', 'replace railways with roads', 'build railways only in hill areas'],
  sol: 'One gauge avoids transferring goods between trains — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('konkan-mcq', mcq({
  stem: 'The Konkan Railway needed a very large number of tunnels and bridges because it runs:',
  right: 'along the coast at the foot of the Western Ghats, crossing ridges and many short, swift rivers',
  wrong: ['across the flat Ganga plain', 'through the sand dunes of the Thar', 'over the frozen plateau of Ladakh'],
  sol: 'Option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('rail-adv-mcq', mcq({
  stem: 'Coal from the Talcher coalfield of Odisha is sent to power stations hundreds of kilometres away mainly by rail because:',
  right: 'rail is cheap for bulky goods over long distances',
  wrong: ['rail gives door-to-door delivery', 'roads cannot carry any coal', 'rail is the fastest of all modes'],
  sol: 'Option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('rail-ar', ar({
  a: 'The rail network is sparse in Arunachal Pradesh.',
  r: 'Its rugged, forested hills and heavy rainfall make railway building difficult and costly.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'analysis', t: [4],
}));
add('rail-ar2', ar({
  a: 'Indian Railways carries very large amounts of coal.',
  r: 'Indian Railways employs a very large number of people.',
  key: 'b',
  sol: 'Both are true, but R does not explain A — coal goes by rail because rail is cheap for bulky, long hauls — option (b).',
  d: 3, c: 'analysis', t: [4],
}));
add('rail-tf', tf({
  stem: 'Railways provide door-to-door delivery of goods.',
  key: 'f',
  sol: 'False: they run on fixed tracks between stations; roads are needed at each end.',
  d: 1, c: 'understanding', t: [4],
}));
add('rail-fill', fill({
  stem: 'The distance between the two rails of a railway track is called the ___.',
  acc: [['gauge']],
  sol: '**Gauge**.',
  d: 1, c: 'recall', t: [4],
}));
add('konkan-fill', fill({
  stem: 'The railway opened in 1998 along the Western Ghats coast from Roha in Maharashtra to near Mangaluru, with hundreds of tunnels and bridges, is the ___ Railway.',
  acc: [['Konkan']],
  sol: '**Konkan** Railway.',
  d: 1, c: 'recall', t: [4],
}));
add('rail-short2', short({
  marks: 2,
  stem: 'Explain two reasons why the rail network is dense in the northern plains.',
  model: 'The land is flat, so lines are cheap and easy to lay with few tunnels or steep gradients; the plains are densely populated, with many towns, farms and industries that generate heavy passenger and freight traffic.',
  sol: 'Flat relief; dense population and activity.',
  scheme: [['Relief', 1], ['Population and economy', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('rail-short3', short({
  marks: 3,
  stem: 'Explain why the rail network is sparse in (a) the Himalayan region, (b) the Thar desert and (c) the hills of north-east India.',
  model: '(a) Steep slopes, high ranges and landslides require costly tunnels, bridges and gradients, and snow closes high areas. (b) Shifting sand dunes bury tracks, water is scarce and the population is sparse, so traffic is low. (c) Rugged, forested hills, very heavy rain and frequent landslides make building and maintenance difficult and expensive.',
  sol: 'Relief and snow; sand and sparse population; hills and heavy rain.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [4],
}));
add('rail-adv-short2', short({
  marks: 2,
  stem: 'State two advantages of railways over roadways for moving freight over long distances.',
  model: 'Railways carry bulky goods such as coal, ore and grain more cheaply per tonne over long distances; they have a much larger carrying capacity and use less fuel per tonne-km, so they cause less pollution and congestion.',
  sol: 'Cheaper for bulk; capacity and fuel efficiency.',
  scheme: [['First', 1], ['Second', 1]],
  d: 2, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- t05 airways
add('air-chk', mcq({
  stem: 'Port Blair in the Andaman Islands depends heavily on air services for passengers from the mainland because:',
  right: 'the islands lie across a long stretch of sea, and ships take days to reach them',
  wrong: ['the islands have no harbour at all', 'air travel is cheaper than sea travel', 'roads connect the islands to Chennai'],
  sol: 'Speed across the sea — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('fog-mcq', mcq({
  stem: 'Flights at Delhi are often delayed in December and January because of:',
  right: 'dense winter fog that reduces visibility',
  wrong: ['monsoon cyclones', 'snow on the runway', 'the loo'],
  sol: 'Option (@K).',
  d: 1, c: 'understanding', t: [5],
}));
add('vaccine-mcq', mcq({
  stem: 'Which consignment is best suited to air transport?',
  right: 'Life-saving vaccines needed urgently in Port Blair',
  wrong: ['Five thousand tonnes of iron ore from Bailadila', 'Cement for a dam in Odisha', 'Coal for a power station near Kolkata'],
  sol: 'Small, valuable, urgent cargo — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('air-ar', ar({
  a: 'Air transport is vital for Ladakh in winter.',
  r: 'Snow closes the high mountain passes over which the roads run.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'application', t: [5],
}));
add('air-tf', tf({
  stem: 'Air transport is the cheapest way of carrying coal.',
  key: 'f',
  sol: 'False: it is the costliest mode; coal goes by rail or water.',
  d: 1, c: 'recall', t: [5],
}));
add('air-short2', short({
  marks: 2,
  stem: 'Explain two reasons why air transport is important for the north-eastern states despite its high cost.',
  model: 'The region is hilly and forested, and its roads and railways are few, long and often blocked by landslides, so aircraft give the only fast link with the rest of India; air services also carry relief during floods and support defence in this border region.',
  sol: 'Difficult terrain; relief or defence.',
  scheme: [['Terrain reason', 1], ['Relief or defence', 1]],
  d: 2, c: 'application', t: [5],
}));
add('air-short3', short({
  marks: 3,
  stem: 'Give one advantage of air transport for each of the following: (a) disaster relief, (b) trade in perishable goods and (c) defence.',
  model: '(a) Aircraft and helicopters can reach flooded or earthquake-hit areas cut off by road within hours. (b) Fresh flowers, fruit and medicines reach distant markets before they spoil. (c) Troops and supplies can be moved quickly to border areas such as Ladakh and the north-east.',
  sol: 'Speed and reach in each case.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- t06 waterways
add('water-chk', mcq({
  stem: 'Cargo barges on National Waterway 1 sometimes cannot run between Patna and Prayagraj in April and May because:',
  right: 'the water level in the Ganga falls and sandbars appear in the dry season',
  wrong: ['the river freezes in summer', 'monsoon floods are at their peak', 'the river flows uphill in summer'],
  sol: 'Seasonal fall in water level and silting — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('nw3-mcq', mcq({
  stem: 'The West Coast Canal (National Waterway 3) runs through the backwaters of:',
  right: 'Kerala',
  wrong: ['Gujarat', 'West Bengal', 'Assam'],
  sol: 'Kollam to Kottapuram — option (@K).',
  d: 1, c: 'recall', t: [6],
}));
add('coastal-mcq', mcq({
  stem: 'Coal is shipped from Paradip to power stations in Tamil Nadu by sea rather than by rail. The main reason is that:',
  right: 'coastal shipping is cheap for bulky cargo and eases the load on railways',
  wrong: ['ships are faster than trains', 'there is no railway in Tamil Nadu', 'coal cannot be carried by train'],
  sol: 'Option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('peninsular-mcq', mcq({
  stem: 'Why are most peninsular rivers poorly suited to inland navigation?',
  right: 'They carry little water in the dry season and flow over rocky beds with rapids and falls',
  wrong: ['They are fed by glaciers all year', 'They flow through flat deltas for their whole length', 'They are too deep for barges'],
  sol: 'Seasonal flow and rocky, broken courses — option (@K).',
  d: 3, c: 'analysis', t: [6],
}));
add('water-ar', ar({
  a: 'Kolkata port needs constant dredging.',
  r: 'The Hooghly brings down large amounts of silt.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'application', t: [6],
}));
add('water-ar2', ar({
  a: 'Coastal shipping can reduce the load on railways.',
  r: 'Ships can sail inland across the Deccan plateau.',
  key: 'c',
  sol: 'A is true; R is false — option (c).',
  d: 2, c: 'understanding', t: [6],
}));
add('water-tf', tf({
  stem: 'Every Indian river can be used for inland navigation throughout the year.',
  key: 'f',
  sol: 'False: many rivers are seasonal, shallow in the dry season, or broken by rapids and falls.',
  d: 1, c: 'understanding', t: [6],
}));
add('water-fill', fill({
  stem: 'A wall built out into the sea to shelter a harbour from waves is called a ___.',
  acc: [['breakwater', 'break-water']],
  sol: '**Breakwater**.',
  d: 1, c: 'recall', t: [6],
}));
add('water-short1', short({
  marks: 1,
  stem: 'Name the river along which National Waterway 2 runs.',
  model: 'The Brahmaputra.',
  sol: 'Brahmaputra.',
  scheme: [['Brahmaputra', 1]],
  d: 1, c: 'recall', t: [6],
}));
add('water-short2', short({
  marks: 2,
  stem: 'Compare inland waterways and coastal shipping with reference to (a) their routes and (b) one limitation of each.',
  model: '(a) Inland waterways use rivers, canals and backwaters within the country (for example the Ganga or Kerala backwaters); coastal shipping carries cargo by sea between ports along India’s coast. (b) Inland waterways suffer from low water and silting in the dry season; coastal shipping needs well-equipped ports and is disrupted by monsoon storms.',
  sol: 'Routes; limitations.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'understanding', t: [6],
}));
add('water-short3', short({
  marks: 3,
  stem: 'State three limitations of inland water transport in India.',
  model: 'Many rivers carry little water in the dry season, so navigation stops for months; heavy silting and shifting channels block barges and need costly dredging; peninsular rivers have rapids and falls, and water drawn off for irrigation further reduces depth (also, it is slow).',
  sol: 'Seasonal water; silting; rapids or diversion.',
  scheme: [['First', 1], ['Second', 1], ['Third', 1]],
  d: 2, c: 'understanding', t: [6],
}));

// ---------------------------------------------------------------- illustrative data
const c1 = freight('Rail', 500, 600);
add('cost-num', num({
  stem: `Rail freight costs ₹${cost('Rail')} per tonne-km (illustrative). What does it cost, in rupees, to send 500 tonnes of cement 600 km by rail?`,
  value: c1, tol: 0, unit: 'rupees',
  sol: `Cost $= ${cost('Rail')} \\times 500 \\times 600 = ${c1}$ rupees.`,
  scheme: [[`${c1} rupees`, 1]],
  d: 2, c: 'application', t: [4],
}), () => 1.5 * 500 * 600 === c1 || 'cost');
const save = Math.round(((cost('Road') - cost('Rail')) / cost('Road')) * 100);
add('saving-num', num({
  stem: `Illustrative freight rates are ₹${cost('Road')} per tonne-km by road and ₹${cost('Rail')} per tonne-km by rail. By what percentage is rail cheaper than road?`,
  value: save, tol: 0, unit: '%',
  sol: `Saving $= \\dfrac{${cost('Road')} - ${cost('Rail')}}{${cost('Road')}} \\times 100 = ${save}$%.`,
  scheme: [[`${save}%`, 1]],
  d: 2, c: 'application', t: [2, 4],
}), () => save === 40 || 'saving');
const tb = hours('Inland waterway', 300);
add('barge-num', num({
  stem: `A barge on National Waterway 2 travels at an average of ${speed('Inland waterway')} km/h (illustrative). How many hours will it take to cover 300 km?`,
  value: tb, tol: 0, unit: 'h',
  sol: `Time $= 300 \\div ${speed('Inland waterway')} = ${tb}$ h.`,
  scheme: [[`${tb} h`, 1]],
  d: 1, c: 'application', t: [6],
}), () => 300 / 10 === tb || 'time');
const dR = Math.round((1200 / 40000) * 1000);
add('density-num', num({
  stem: 'State R (illustrative) has 1,200 km of railway track in an area of 40,000 sq km. What is its rail density in km of track per 1,000 sq km?',
  value: dR, tol: 0, unit: 'km per 1000 sq km',
  sol: `Density $= \\dfrac{1200}{40000} \\times 1000 = ${dR}$ km per 1000 sq km.`,
  scheme: [[`${dR}`, 1]],
  d: 2, c: 'application', t: [4],
}), () => dR === 30 || 'density');
const ore = MODES.map(([m]) => [m, freight(m, 1000, 500)]).sort((a, b) => a[1] - b[1])[0];
add('data-mcq', mcq({
  stem: `Illustrative rates: ${rateList}. Which mode is cheapest for moving 1,000 tonnes of iron ore 500 km, and what would it cost?`,
  right: `Inland waterway, ₹${ore[1]}`,
  wrong: [`Rail, ₹${freight('Rail', 1000, 500)}`, `Road, ₹${freight('Road', 1000, 500)}`, `Air, ₹${freight('Air', 1000, 500)}`],
  sol: `Waterway $= ${cost('Inland waterway')} \\times 1000 \\times 500 = ${ore[1]}$ rupees, the lowest — option (@K).`,
  d: 3, c: 'analysis', t: [6],
}), () => (ore[0] === 'Inland waterway' && ore[1] === 500000) || 'ore');

// ---------------------------------------------------------------- match
add('corridor-match', match({
  marks: 2,
  stem: 'Match each route in Column A with what it links in Column B.',
  pairs: [
    ['Golden Quadrilateral', 'Delhi, Mumbai, Chennai and Kolkata'],
    ['North–South Corridor', 'Srinagar and Kanyakumari'],
    ['East–West Corridor', 'Silchar and Porbandar'],
    ['National Waterway 3', 'Kollam and Kottapuram'],
  ],
  order: [2, 0, 3, 1],
  sol: 'GQ → four metros; North–South → Srinagar–Kanyakumari; East–West → Silchar–Porbandar; NW-3 → Kollam–Kottapuram.',
  d: 1, c: 'recall', t: [3, 6],
}));
add('goods-match', match({
  marks: 2,
  stem: 'Match each consignment in Column A with the most suitable mode in Column B.',
  pairs: [
    ['Coal from Jharia to a distant power station', 'Rail'],
    ['Urgent vaccines to Port Blair', 'Air'],
    ['Milk from villages to a nearby dairy', 'Road'],
    ['Coal from Paradip to Tuticorin', 'Coastal shipping'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Jharia coal → rail; vaccines → air; milk → road; Paradip to Tuticorin → coastal shipping.',
  d: 2, c: 'application', t: [2, 4, 5, 6],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('road-long', long({
  stem: '(a) Explain two factors that affect road development in mountainous areas. [2]\n\n(b) State two advantages of road transport. [2]\n\n(c) What is the Golden Quadrilateral? Name the cities it joins and state one benefit. [3]\n\n(d) Name the two ends of the North–South Corridor and of the East–West Corridor. Where do they cross? [3]',
  model: '(a) Steep slopes need bends, cuttings, tunnels and bridges, which raise costs; heavy rain causes landslides and snow blocks high passes, so roads need constant repair.\n\n(b) Door-to-door service; flexible and cheap for short distances, reaching hills and villages (also good for perishables, feeders to rail and ports).\n\n(c) A network of four- and six-lane National Highways about 5,800 km long joining Delhi, Mumbai, Chennai and Kolkata; it allows faster, cheaper movement of goods and people.\n\n(d) North–South: Srinagar and Kanyakumari. East–West: Silchar and Porbandar. They cross at Jhansi.',
  sol: 'Factors; advantages; GQ; corridors.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 2, c: 'understanding', t: [2, 3],
}));
add('rail-long', long({
  stem: '(a) Why is the rail network dense in the northern plains? Give two reasons. [2]\n\n(b) Why is it sparse in the Thar desert? Give two reasons. [2]\n\n(c) State three advantages of railways. [3]\n\n(d) Name the three railway gauges with their widths, and state the aim of Project Unigauge. [3]',
  model: '(a) Flat land makes lines cheap to build; dense population, towns, farms and industries create heavy traffic.\n\n(b) Shifting sand dunes bury tracks and water is scarce; the population is sparse, so traffic is low.\n\n(c) Cheap for bulky goods over long distances; huge capacity for passengers and freight at low fares; safer and less fuel and pollution per tonne-km than road (also national integration).\n\n(d) Broad gauge 1.676 m; metre gauge 1 m; narrow gauge 0.762 m (or 0.610 m). Project Unigauge converts metre and narrow gauge lines to broad gauge so that goods need not be transferred between trains.',
  sol: 'Dense; sparse; advantages; gauges.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 2, c: 'application', t: [4],
}));
add('airwater-long', long({
  stem: '(a) State two advantages of air transport. [2]\n\n(b) Why is air transport important for the Andaman and Nicobar Islands and Ladakh? [2]\n\n(c) Compare inland waterways and coastal shipping under three headings. [3]\n\n(d) State two limitations of inland waterways and name the rivers of National Waterways 1 and 2. [3]',
  model: '(a) It is the fastest mode; it crosses mountains, forests, deserts and seas without roads or tracks (also relief, defence, perishable goods).\n\n(b) The islands are separated from the mainland by a long sea crossing, so ships take days; the roads to Ladakh cross high passes that are closed by snow in winter, so aircraft are the only quick link.\n\n(c) Route: rivers, canals and backwaters inland versus the sea between coastal ports. Cargo: barges with local bulk loads versus larger ships carrying coal, oil and containers. Limitations: low water and silting versus the need for ports and disruption by monsoon storms.\n\n(d) Low water in the dry season; silting and shifting channels (also rapids, slowness). NW-1: the Ganga (Bhagirathi–Hooghly); NW-2: the Brahmaputra.',
  sol: 'Air advantages; remote areas; comparison; limitations and rivers.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 2, c: 'understanding', t: [5, 6],
}));
add('imp-long', long({
  stem: '(a) Give two reasons why transport is called the lifeline of a country’s economy. [2]\n\n(b) With an example, show how different modes of transport complement one another. [2]\n\n(c) Suggest the most suitable mode for each of these and give a reason: (i) iron ore from Bailadila to Visakhapatnam port, (ii) fresh fish from Kochi to Delhi in a day, (iii) vegetables from villages near Nashik to the town market. [3]\n\n(d) Some planners want more freight moved by rail and water instead of by road. Give three reasons in support of this view. [3]',
  model: '(a) It carries raw materials to industries and goods to markets, so production and trade can grow; it links regions and people, supporting jobs, relief, defence and national integration.\n\n(b) For example, rice from Karnal goes by truck to a container depot, by train to Mundra port and by ship abroad; road gives local collection, rail the cheap long haul and the ship the overseas link.\n\n(c) (i) Rail — bulky ore over a long distance is moved cheaply. (ii) Air — the fish is perishable and must arrive quickly. (iii) Road — short, door-to-door trips to the market.\n\n(d) Rail and water cost less per tonne-km for bulky goods; they use less fuel and cause less pollution per tonne carried; shifting heavy loads off highways reduces congestion, accidents and road damage.',
  sol: 'Importance; complementarity; choices; evaluation.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 3, c: 'application', t: [1, 2, 4, 5, 6],
}));
const LT = 400;
const LK = 900;
const lRail = freight('Rail', LT, LK);
const lRoad = freight('Road', LT, LK);
add('data-long', long({
  stem: `Study these illustrative freight rates and speeds: ${rateList}.\n\n(a) Calculate the cost of moving ${LT} tonnes of goods ${LK} km by rail and by road. [2]\n\n(b) By what percentage is the rail cost lower than the road cost? [2]\n\n(c) Calculate the time taken for the ${LK} km journey by road, by rail and by inland waterway. [3]\n\n(d) Recommend a mode, with a reason, for (i) cement for a building site 900 km away, (ii) mangoes for a market 900 km away and (iii) urgently needed machine parts. [3]`,
  model: `(a) Rail $= ${cost('Rail')} \\times ${LT} \\times ${LK} = ${lRail}$ rupees; road $= ${cost('Road')} \\times ${LT} \\times ${LK} = ${lRoad}$ rupees.\n\n(b) $\\dfrac{${lRoad} - ${lRail}}{${lRoad}} \\times 100 = ${save}$%.\n\n(c) Road $= ${LK} \\div ${speed('Road')} = ${hours('Road', LK)}$ h; rail $= ${LK} \\div ${speed('Rail')} = ${hours('Rail', LK)}$ h; waterway $= ${LK} \\div ${speed('Inland waterway')} = ${hours('Inland waterway', LK)}$ h.\n\n(d) (i) Rail — bulky, non-perishable goods are cheapest by rail. (ii) Road — mangoes are perishable, and a truck is faster than a goods train and delivers to the market door. (iii) Air — the parts are small, valuable and urgent, so speed justifies the cost.`,
  sol: `${lRail} and ${lRoad} rupees; ${save}%; ${hours('Road', LK)}, ${hours('Rail', LK)} and ${hours('Inland waterway', LK)} h; choices.`,
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 4, c: 'analysis', t: [2, 4, 6],
}), () => (lRail === 540000 && lRoad === 900000 && hours('Road', LK) === 22.5 && hours('Rail', LK) === 36 && hours('Inland waterway', LK) === 90) || 'data');
