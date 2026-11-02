// ICSE 10 Geography ch17 Transport — two decks: Part 1 (t01–t03) importance and modes of transport, roadways, expressways,
// National Highways, the NSEW Corridor and the Golden Quadrilateral; Part 2 (t04–t06) railways, airways and waterways, with
// illustrative freight cost, speed and network figures computed from svgs.mjs.
import { sl, deck, table, flow, svgV } from './lib.mjs';
import { COSTCHART, CORRIDOR, GAUGECHART, PORT, MODES, cost, freight, hours, NET, density } from './svgs.mjs';

const V = {
  cost: svgV(COSTCHART, 'Bar chart of illustrative freight cost per tonne-kilometre for road, rail, inland waterway and air'),
  gq: svgV(CORRIDOR, 'Schematic network of the Golden Quadrilateral and the North–South and East–West corridors crossing at Jhansi'),
  gauge: svgV(GAUGECHART, 'Broad, metre and narrow gauge tracks drawn to one scale'),
  port: svgV(PORT, 'Seaport with breakwater, dredged channel, ship, cranes and rail and road links'),
};
const T = 200;
const KM = 800;

export const deck1 = deck({
  part: 1,
  title: 'Transport — Part 1: Importance, roadways and highway corridors',
  goals: [
    'Explain why an efficient transport network is essential for development',
    'Explain the factors that affect road development in different terrains and list advantages and disadvantages of road transport',
    'State the meaning and importance of expressways, National Highways, the NSEW Corridor and the Golden Quadrilateral',
  ],
  slides: [
    sl('title', 'The arteries of a nation', {
      b: 'Part 1 — A tea packet from Assam, a car from Chennai and a sack of wheat from Punjab all reach your town by **transport**. India uses **land** transport (roads, railways, pipelines), **water** transport (inland, coastal, overseas) and **air** transport. In this part we study why transport matters and how India’s roads and highway corridors are organised.',
      v: table(['Mode', 'Main types', 'Typical use'], [['Land', 'Roads, railways, pipelines', 'People and goods across the country'], ['Water', 'Inland, coastal, overseas', 'Heavy, bulky goods'], ['Air', 'Domestic and international', 'Fast travel, valuable goods']], 'Table of the three modes of transport with types and uses'),
      n: 'Namaste! Think of the tea from Assam, the cars from Chennai and the wheat from Punjab that reach your town. All of them travel by land, by water or by air. Transport links farms with markets, mines with factories and people with jobs. In this part we see why transport matters so much and how India’s roads and highway corridors are organised.',
    }),
    sl('concept', 'Why transport matters', {
      b: 'An efficient transport network is essential for **development**. It carries **raw materials** to factories and **finished goods** to markets; lets farmers sell **perishable** crops in distant cities; widens **trade**, both inside the country and abroad through ports; creates **jobs** in transport itself; supports **tourism**; helps **defence** and **disaster relief** reach border and remote areas quickly; and promotes **national integration** by bringing people of different regions together.',
      v: table(['Role', 'Example'], [['Raw materials to industry', 'Iron ore from Odisha to steel plants'], ['Goods to market', 'Apples from Himachal to Delhi'], ['Trade', 'Containers through ports'], ['Relief and defence', 'Supplies to border and flood areas'], ['Integration', 'People of all regions travel and meet']], 'Table of five roles of transport with examples'),
      n: 'A country cannot develop without good transport. It carries iron ore to steel plants and finished goods to shops. It lets an apple grower in Himachal sell fruit in Delhi before it spoils. It carries goods to ports for trade, gives jobs, brings tourists, helps soldiers and relief teams reach distant places, and brings people of different regions together.',
    }),
    sl('concept', 'Modes working together', {
      b: 'Modes **complement** one another. A consignment often moves by road from a farm or factory to a railway yard, by rail across the country, by road again to a port, and by ship overseas. **Pipelines** carry crude oil, gas and petroleum products. Each mode suits certain loads, distances and terrains — the skill is in combining them.',
      v: flow('LR', [['a', 'Farm or factory'], ['b', 'Road (short haul)'], ['c', 'Rail (long haul)'], ['d', 'Port'], ['e', 'Ship (overseas)']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow of goods from a farm or factory by road, then rail, to a port and ship'),
      n: 'Transport modes work best together. Goods often travel by truck from a farm or factory to a railway yard, by train across the country, by truck again to a port, and by ship to another country. Pipelines quietly carry oil and gas. Each mode suits certain loads and distances, and a good transport system joins them smoothly.',
    }),
    sl('check', 'Quick check: importance of transport', {
      b: 'Link transport to development.',
      n: 'Quick check. Transport links raw materials, factories and markets.',
      chk: 'imp-chk',
    }),
    sl('concept', 'What affects road building?', {
      b: '**Relief:** roads are easy and cheap to build on the **level plains**; in **mountains** they need hairpin bends, retaining walls, tunnels and bridges, and **landslides** block them. **Climate:** heavy rain and **floods** wash roads away (north-east India, coastal plains); **snow** closes high passes for months (Ladakh). **Rivers:** many bridges are needed on the plains and deltas. **Soil:** clayey soils turn to mud; sandy desert soils shift. **Population and economy:** dense, productive regions justify dense road networks. **Capital:** hill and border roads are very costly; the **Border Roads Organisation** builds and maintains strategic roads.',
      v: table(['Factor', 'Easy', 'Difficult'], [['Relief', 'Level plains', 'Mountains, steep slopes'], ['Climate', 'Moderate rain', 'Heavy rain, floods, snow'], ['Rivers', 'Few crossings', 'Many wide rivers'], ['Population', 'Dense, productive', 'Sparse, remote']], 'Table of factors that make road building easy or difficult'),
      n: 'Roads are easy to build on flat plains but hard in the mountains, where engineers must cut hairpin bends, tunnels and walls, and landslides often block the way. Heavy rain and floods wash roads away, and snow closes high passes for months. Many rivers mean many bridges. And busy, crowded regions need and can pay for more roads than empty ones.',
    }),
    sl('example', 'Worked example: a road to Tawang', {
      b: '**Problem.** Give three geographical reasons why building and keeping open a road to Tawang in the hills of Arunachal Pradesh is difficult, and suggest one solution.\n\n**Step 1. Relief:** steep slopes need many bends, cuttings and bridges, raising cost.\n\n**Step 2. Climate:** very heavy monsoon rain causes landslides; snow blocks high passes in winter.\n\n**Step 3. Sparse population:** few users, so returns are low, though the road matters for defence.\n\n**Solution:** the Border Roads Organisation builds all-weather roads and tunnels through the high passes.',
      v: table(['Problem', 'Cause', 'Response'], [['High cost', 'Steep slopes, bends, bridges', 'Central funding'], ['Landslides', 'Heavy monsoon rain', 'Retaining walls, drains'], ['Winter closure', 'Snow on high passes', 'Tunnels, snow clearing']], 'Table of problems of a mountain road with causes and responses'),
      n: 'Why is a road to Tawang so hard? The slopes are steep, so the road needs many bends, cuttings and bridges, which makes it costly. Heavy monsoon rain sets off landslides, and in winter snow can block the high passes. Few people live there, yet the road is vital for defence, so the Border Roads Organisation builds tunnels and all-weather roads.',
    }),
    sl('check', 'Quick check: road building', {
      b: 'Identify a factor that makes road building difficult.',
      n: 'Quick check. Steep slopes, landslides, floods and snow make roads hard to build and keep open.',
      chk: 'road-chk',
    }),
    sl('concept', 'Roads: advantages and disadvantages', {
      b: '**Advantages:** **door-to-door** service; flexible routes and timings; cheaper and quicker than rail for **short distances**; can climb steep, hilly terrain where railways cannot; ideal for **perishables** (milk, vegetables, fruit); act as **feeders** to railway stations, ports and airports; lower construction cost than railways. **Disadvantages:** costly and slow for **bulky goods over long distances**; **air pollution** and noise; **accidents** and congestion; damaged by heavy rain and floods; heavy fuel use.',
      v: table(['Advantages', 'Disadvantages'], [['Door-to-door', 'Costly for long hauls of bulky goods'], ['Flexible, good for short distances', 'Pollution and noise'], ['Reaches hills and villages', 'Accidents, congestion'], ['Good for perishables; feeder', 'Damaged by rain and floods']], 'Table of advantages and disadvantages of road transport'),
      n: 'Road transport takes goods from door to door, runs at any time and on any route, and is cheapest for short trips. It climbs hills that trains cannot, and it is ideal for milk, fruit and vegetables. It also feeds stations, ports and airports. But for heavy goods over long distances it is costly and slow, and it causes pollution, noise, accidents and traffic jams.',
    }),
    sl('concept', 'Classes of roads and expressways', {
      b: '**Expressways:** wide, multi-lane, **access-controlled** highways with no level crossings, built for fast, safe, long-distance traffic — the Mumbai–Pune Expressway (the first, opened in 2002), the Yamuna Expressway (Greater Noida to Agra) and the Agra–Lucknow Expressway. **National Highways:** main roads linking state capitals, big cities, ports and border areas; built and maintained by the **Central Government** (NHAI). **State Highways:** link state capitals with district towns (State Governments). **District roads** link district headquarters with towns; **village roads** link villages (Pradhan Mantri Gram Sadak Yojana). **Border roads** serve strategic areas.',
      v: table(['Class', 'Links', 'Built by'], [['Expressway', 'Big cities, fast traffic', 'Central or State agencies'], ['National Highway', 'State capitals, cities, ports', 'Central Government (NHAI)'], ['State Highway', 'Capital to district towns', 'State Government'], ['District road', 'District HQ to towns', 'District bodies'], ['Village road', 'Villages to towns', 'PMGSY, local bodies'], ['Border road', 'Strategic border areas', 'Border Roads Organisation']], 'Table of classes of roads with what they link and who builds them'),
      n: 'Indian roads come in classes. Expressways are wide, fenced roads with no crossings, built for fast traffic, like the Mumbai Pune Expressway. National Highways join state capitals, big cities and ports and are looked after by the central government. State Highways, district roads and village roads carry traffic down to the smallest settlements, and border roads serve the frontier.',
    }),
    sl('diagram', 'The Golden Quadrilateral and the NSEW Corridor', {
      b: 'The **Golden Quadrilateral (GQ)**, about 5,800 km of four- and six-lane highways, joins the four metropolitan cities **Delhi, Mumbai, Chennai and Kolkata**. The **North–South Corridor** links **Srinagar** with **Kanyakumari**, and the **East–West Corridor** links **Silchar** (Assam) with **Porbandar** (Gujarat); the two cross at **Jhansi**. Both were built under the National Highways Development Project. **Importance:** faster, safer movement of goods and people; lower fuel and vehicle costs; growth of industries and towns along the routes; national integration.',
      v: V.gq,
      n: 'The Golden Quadrilateral is a ring of wide highways joining Delhi, Mumbai, Chennai and Kolkata, the four great metropolitan cities. Across it run two long corridors: one from Srinagar in the north to Kanyakumari in the south, and one from Silchar in the east to Porbandar in the west. They meet at Jhansi. These roads cut travel times and help industry grow along them.',
    }),
    sl('example', 'Worked example: planning a truck journey', {
      b: '**Problem.** A transporter must send machinery from a factory in Pune to a buyer in Kolkata. (a) Which highway system would the truck mainly use? (b) Give three benefits of these highways.\n\n**(a)** It joins the Golden Quadrilateral near Mumbai or Pune and follows it via Chennai (or via Delhi) to Kolkata, using the Mumbai–Pune Expressway at the start.\n\n**(b)** Four- and six-lane divided roads allow higher, steadier speeds; bypasses avoid town congestion, saving time and fuel; fewer accidents and less wear on vehicles lower costs.',
      v: flow('LR', [['a', 'Pune factory'], ['b', 'Expressway'], ['c', 'Golden Quadrilateral'], ['d', 'Kolkata buyer']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of a truck journey from Pune by expressway onto the Golden Quadrilateral to Kolkata'),
      n: 'A truck from Pune would first use the expressway, then join the Golden Quadrilateral and follow it round to Kolkata. Because these highways are wide, divided and bypass crowded towns, the truck moves faster and more steadily, uses less fuel, suffers less wear and is less likely to crash. That lowers the cost of moving goods across the country.',
    }),
    sl('check', 'Quick check: highway corridors', {
      b: 'Recall the cities and corridors.',
      n: 'Quick check. The Golden Quadrilateral joins Delhi, Mumbai, Chennai and Kolkata; the corridors cross at Jhansi.',
      chk: 'gq-chk',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Transport is vital for industry, trade, farming, defence, relief and national integration; modes complement one another.',
        'Road building depends on relief, climate, rivers, soil, population and capital.',
        'Roads: door-to-door, flexible, good for short distances and hills; costly for bulky long hauls, polluting.',
        'Expressways (access-controlled), National Highways (Central Government), State, district, village and border roads.',
        'Golden Quadrilateral: Delhi, Mumbai, Chennai, Kolkata; NSEW: Srinagar–Kanyakumari and Silchar–Porbandar, crossing at Jhansi.',
      ],
      v: table(['Network', 'Key cities'], [['Golden Quadrilateral', 'Delhi, Mumbai, Chennai, Kolkata'], ['North–South Corridor', 'Srinagar to Kanyakumari'], ['East–West Corridor', 'Silchar to Porbandar']], 'Summary table of highway networks and key cities'),
      n: 'To sum up Part 1. Transport carries the goods and people that development depends on, and the modes work best together. Road building is shaped by relief, climate, rivers and population. Roads are flexible and reach everywhere but are costly over long distances. The Golden Quadrilateral links the four metropolitan cities, and two corridors cross the country, meeting at Jhansi.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'For importance of transport, give at least three distinct roles with examples.',
        'Link each road-building factor to a named region (Ladakh snow, north-east landslides, Thar sand).',
        'Learn the four GQ cities and the four ends of the NSEW Corridor.',
        'Say who builds each class of road.',
      ],
      v: table(['Slip', 'Fix'], [['GQ links Delhi, Mumbai, Bengaluru, Kolkata', 'Delhi, Mumbai, Chennai, Kolkata'], ['NSEW crosses at Nagpur', 'It crosses at Jhansi'], ['Roads are cheapest for long hauls of coal', 'Rail or water is cheaper']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some tips. When asked why transport matters, give three different roles with examples. Tie each road-building difficulty to a real place. Learn the four cities of the Golden Quadrilateral and the four ends of the corridors, and remember that they cross at Jhansi. And remember that for heavy goods over long distances, rail or water is cheaper than road.',
    }),
  ],
});

const rP = density('P');
const rQ = density('Q');
const road = freight('Road', T, KM);
const rail = freight('Rail', T, KM);
export const deck2 = deck({
  part: 2,
  title: 'Transport — Part 2: Railways, airways and waterways',
  goals: [
    'Explain why the rail network is dense in the northern plains and sparse in hilly and desert areas',
    'Explain why air transport is important for remote and hilly areas despite its high cost',
    'Compare inland and coastal waterways and state their advantages and limitations',
    'Compare modes using freight cost and time',
  ],
  slides: [
    sl('title', 'Rails, wings and water', {
      b: 'Part 2 — **Indian Railways** is one of the largest railway systems in the world under a single management. **Airways** shrink great distances, and **waterways** — rivers, canals, backwaters and the coast — carry heavy loads cheaply. Each mode has its own geography.',
      v: table(['Mode', 'Best for', 'Main limitation'], [['Railways', 'Bulky goods, long distances', 'Fixed routes; costly in hills'], ['Airways', 'Speed; remote areas', 'Very high cost'], ['Waterways', 'Heavy, bulky, cheap cargo', 'Slow; navigable routes only']], 'Table of railways, airways and waterways with best use and main limitation'),
      n: 'In this part we look at railways, airways and waterways. India’s railways form one of the biggest networks in the world under one management. Aircraft cross mountains and seas in hours. Rivers, canals and the coast carry heavy cargo cheaply. Each mode suits some places and some goods better than others, and geography explains why.',
    }),
    sl('concept', 'Where railways are dense, and why', {
      b: 'The rail network is **densest in the northern plains** (Punjab to West Bengal): flat land, fertile soil, **dense population**, many towns, farms and industries generating traffic, and low building costs. It is **sparse** in the **Himalayas and the north-east hills** (steep slopes, landslides, heavy rain, need for tunnels and bridges), in the **Thar desert** (shifting sand dunes, sparse population, little water) and in **thick forests** and **swampy deltas**. The **Konkan Railway** (1998) along the Western Ghats coast needed many tunnels and bridges, showing the cost of difficult terrain.',
      v: table(['Region', 'Network', 'Reasons'], [['Northern plains', 'Dense', 'Flat, populous, productive'], ['Himalayas, north-east', 'Sparse', 'Steep, landslides, heavy rain'], ['Thar desert', 'Sparse', 'Shifting sand, few people'], ['Western Ghats coast', 'Costly', 'Tunnels and bridges needed']], 'Table of regions with dense or sparse rail networks and reasons'),
      n: 'Railways are thickest on the northern plains, where the land is flat, people are many and farms and factories create plenty of traffic. They are thin in the Himalayas and the north-east, where steep slopes, landslides and heavy rain make building hard, and in the Thar desert, where sand shifts and few people live. The Konkan Railway needed hundreds of tunnels and bridges.',
    }),
    sl('diagram', 'Railway gauges', {
      b: 'The **gauge** is the distance between the two rails. **Broad gauge** (1.676 m) carries the heaviest, fastest traffic and is now the main gauge; **metre gauge** (1 m) and **narrow gauge** (0.762 m or 0.610 m) survive mainly on hill and branch lines such as Kalka–Shimla. Under **Project Unigauge**, most lines have been converted to broad gauge so that trains need not stop and transfer goods where gauges change.',
      v: V.gauge,
      n: 'The gauge is the distance between the rails. Broad gauge is the widest and carries most of India’s trains. Metre gauge and narrow gauge are found mainly on hill and branch lines, such as the little line from Kalka to Shimla. Most lines have been converted to broad gauge, so goods no longer need to be shifted from one train to another where the gauge changed.',
    }),
    sl('check', 'Quick check: railways', {
      b: 'Explain the density of the rail network.',
      n: 'Quick check. The rail network is densest on the flat, crowded, productive northern plains.',
      chk: 'rail-chk',
    }),
    sl('example', 'Worked example: comparing rail density', {
      b: `**Problem.** ${NET.P.name} has ${NET.P.rail} km of railway in ${NET.P.area} sq km; ${NET.Q.name} has ${NET.Q.rail} km in ${NET.Q.area} sq km. (a) Find the rail density of each, in km per 1000 sq km. (b) Explain the difference.\n\n**(a)** P $= \\dfrac{${NET.P.rail}}{${NET.P.area}} \\times 1000 = ${rP}$; Q $= \\dfrac{${NET.Q.rail}}{${NET.Q.area}} \\times 1000 = ${rQ}$.\n\n**(b)** P is flat, densely populated and productive, so lines are cheap to build and well used; Q’s steep slopes, landslides and sparse population make railways costly and little used.`,
      v: table(['State', 'Track (km)', 'Area (sq km)', 'Density (km per 1000 sq km)'], [['P (plain)', String(NET.P.rail), String(NET.P.area), String(rP)], ['Q (hilly)', String(NET.Q.rail), String(NET.Q.area), String(rQ)]], 'Table of illustrative rail length, area and density for two states'),
      n: 'Divide the length of track by the area and multiply by one thousand to get kilometres of railway for every thousand square kilometres. The plain state has fifty, the hilly state only five, ten times fewer. The plain state is flat, crowded and busy, so railways are cheap and well used, while the hilly state’s slopes, landslides and scattered villages make them costly.',
    }),
    sl('concept', 'Railways: advantages and disadvantages', {
      b: '**Advantages:** cheapest land transport for **bulky goods** (coal, iron ore, food grains, cement) over **long distances**; carry huge numbers of passengers cheaply; safer and less affected by weather than roads; use less fuel and pollute less per tonne-km than trucks; promote national integration and employ many people. **Disadvantages:** **fixed routes and timetables**, no door-to-door service; very **high capital cost**; difficult and costly in **hilly** and desert terrain; goods must be loaded and unloaded at stations (transshipment); less economical for short distances.',
      v: table(['Advantages', 'Disadvantages'], [['Cheap for bulky, long hauls', 'Fixed routes, no door-to-door'], ['Huge capacity, cheap fares', 'High capital cost'], ['Safer; less weather-bound', 'Hard in hills and deserts'], ['Less fuel per tonne-km', 'Transshipment needed']], 'Table of advantages and disadvantages of railways'),
      n: 'Railways move coal, ore, grain and cement cheaply over long distances, and carry millions of passengers at low fares. They are safer than roads, less troubled by weather, and use less fuel for each tonne carried. But they run only on fixed tracks and timetables, cost a great deal to build, struggle in hills and deserts, and need trucks at each end.',
    }),
    sl('concept', 'Airways', {
      b: '**Advantages:** the **fastest** mode; crosses **mountains, deserts, forests and seas** with no need for roads or tracks; vital for **remote and hilly areas** — the **north-east**, **Ladakh**, the **Andaman and Nicobar** and **Lakshadweep** islands — where land routes are long or blocked; essential in **floods, earthquakes** and other **emergencies**; important for **defence**, tourism and business travel; carries **perishable and high-value** goods (flowers, medicines, electronics). **Disadvantages:** **very high cost** of fuel, aircraft and airports; small capacity for bulky goods; disrupted by **fog**, storms and poor visibility; noise and emissions.',
      v: table(['Advantages', 'Disadvantages'], [['Fastest', 'Very costly'], ['Crosses any terrain', 'Small capacity for bulky goods'], ['Links remote areas and islands', 'Affected by fog and storms'], ['Relief and defence', 'Noise and emissions']], 'Table of advantages and disadvantages of air transport'),
      n: 'Air transport is the fastest of all and does not care about mountains, forests or seas. That makes it vital for the hilly north-east, Ladakh and the island groups, where roads are long or blocked, and for rushing help to flood and earthquake areas. It carries flowers, medicines and electronics quickly. But it is very costly, carries little bulky cargo and is grounded by thick fog.',
    }),
    sl('check', 'Quick check: airways', {
      b: 'Explain the value of air transport in remote areas.',
      n: 'Quick check. Aircraft cross mountains and seas, so they serve remote hills and islands despite the cost.',
      chk: 'air-chk',
    }),
    sl('concept', 'Inland and coastal waterways', {
      b: '**Inland waterways** use rivers, canals, lakes and backwaters. National Waterways include **NW-1** on the **Ganga–Bhagirathi–Hooghly** (Prayagraj to Haldia), **NW-2** on the **Brahmaputra** (Sadiya to Dhubri) and **NW-3**, the **West Coast Canal** of Kerala (Kollam to Kottapuram); many more were declared in 2016. Barges on the Mandovi and Zuari in Goa long carried iron ore to the coast. **Limitations:** water levels fall in the dry season; **silting** and shifting channels; rapids and falls in peninsular rivers; slow. **Coastal shipping** moves cargo between Indian ports — for example coal from Paradip to power stations in Tamil Nadu — cheaply, but it needs good ports and is affected by monsoon storms.',
      v: table(['Feature', 'Inland waterways', 'Coastal shipping'], [['Route', 'Rivers, canals, backwaters', 'Along the coast between ports'], ['Example', 'NW-1 Ganga, NW-2 Brahmaputra, NW-3 Kerala', 'Coal from Paradip to Tamil Nadu'], ['Advantage', 'Cheap, low fuel, natural route', 'Cheap for bulky cargo, eases rail load'], ['Limitation', 'Low water, silting, rapids', 'Needs ports; monsoon storms']], 'Table comparing inland waterways and coastal shipping'),
      n: 'Inland waterways use rivers, canals and backwaters, such as the Ganga between Prayagraj and Haldia, the Brahmaputra in Assam and the West Coast Canal of Kerala. They are cheap but slow, and in the dry season the water may be too shallow; silt and shifting channels are further problems. Coastal ships carry heavy cargo such as coal from port to port, easing the load on railways.',
    }),
    sl('diagram', 'A seaport', {
      b: 'Ports link sea routes with the land. A **breakwater** shelters the harbour from waves; a **dredged channel** gives ships enough depth; **berths, cranes and warehouses** handle cargo; **rail and road links** connect the port with its **hinterland** (the area it serves). Natural harbours (Mumbai, Visakhapatnam, Kochi) need less building; river ports such as Kolkata need constant dredging, which is why **Haldia** was developed downstream.',
      v: V.port,
      n: 'A port is where sea and land transport meet. A breakwater shelters the ships from waves. A channel is dredged deep enough for loaded ships to reach the quay. Cranes and warehouses handle the cargo, and railways and roads carry it inland to the hinterland. River ports like Kolkata silt up, so they need constant dredging.',
    }),
    sl('check', 'Quick check: waterways', {
      b: 'State a limitation of inland waterways.',
      n: 'Quick check. Low water in the dry season and silting limit inland waterways.',
      chk: 'water-chk',
    }),
    sl('diagram', 'Comparing freight costs', {
      b: `The chart shows illustrative freight costs per tonne-kilometre. Waterways (₹${cost('Inland waterway').toFixed(1)}) are cheapest, then rail (₹${cost('Rail')}), road (₹${cost('Road')}) and air (₹${cost('Air')}). Cheap modes are slower: this is why bulky, low-value goods (coal, ore, cement) go by water or rail, while perishable or valuable goods go by road or air.`,
      v: V.cost,
      n: 'This chart compares the cost of carrying one tonne for one kilometre. Waterways are the cheapest, then rail, then road, while air is many times dearer. The cheapest modes are also the slowest. So heavy, low value goods such as coal and ore go by water or rail, while fresh flowers, medicines and urgent parcels pay for road or air.',
    }),
    sl('example', 'Worked example: choosing a mode', {
      b: `**Problem.** ${T} tonnes of cement must travel ${KM} km. Using the illustrative costs and speeds, find (a) the cost by road and by rail, (b) the saving by rail as a percentage of the road cost, and (c) the time by road and by rail.\n\n**(a)** Road $= ${cost('Road')} \\times ${T} \\times ${KM} = ${road}$ rupees; rail $= ${cost('Rail')} \\times ${T} \\times ${KM} = ${rail}$ rupees.\n\n**(b)** Saving $= \\dfrac{${road} - ${rail}}{${road}} \\times 100 = ${Math.round(((road - rail) / road) * 100)}$%.\n\n**(c)** Road $= ${KM} \\div ${MODES[0][2]} = ${hours('Road', KM)}$ h; rail $= ${KM} \\div ${MODES[1][2]} = ${hours('Rail', KM)}$ h. Rail is cheaper but slower — fine for cement, which does not spoil.`,
      v: table(['Mode', 'Cost (rupees)', 'Time (hours)'], [['Road', String(road), String(hours('Road', KM))], ['Rail', String(rail), String(hours('Rail', KM))]], 'Table of illustrative cost and time for moving cement by road and by rail'),
      n: 'Multiply the cost per tonne kilometre by the tonnes and the kilometres. By road the cement costs four lakh rupees to move, by rail only two lakh forty thousand, a saving of forty per cent. Divide distance by speed for the time: twenty hours by road and thirty two by rail. Cement does not spoil, so the cheaper, slower railway is the sensible choice.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Rail network dense on the northern plains; sparse in the Himalayas, the north-east, the Thar and forests.',
        'Gauges: broad 1.676 m, metre 1 m, narrow 0.762 m or 0.610 m; Project Unigauge.',
        'Railways: cheap for bulky long hauls, but fixed routes and high capital cost.',
        'Airways: fastest, cross any terrain, vital for remote areas and emergencies, but very costly.',
        'Waterways: NW-1 Ganga, NW-2 Brahmaputra, NW-3 Kerala; cheapest but slow; low water and silting; coastal shipping eases rail load.',
      ],
      v: table(['Mode', 'Cost per tonne-km (illustrative)'], MODES.map(([m, c]) => [m, `₹${c.toFixed(1)}`]), 'Summary table of illustrative freight costs by mode'),
      n: 'To sum up Part 2. Railways are thick on the northern plains and thin in mountains and deserts; they move bulky goods cheaply but run only on fixed tracks. Aircraft are fastest and reach remote hills and islands but cost the most. Waterways are cheapest but slow and depend on enough water. Choosing the right mode means weighing cost, speed and the nature of the goods.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Explain rail density with relief, population and economic activity, naming regions.',
        'For airways in remote areas, name the north-east, Ladakh or the islands and say why land routes fail.',
        'Learn the three National Waterways with their rivers and end points.',
        'In cost questions, multiply rate × tonnes × kilometres and show the working.',
      ],
      v: table(['Slip', 'Fix'], [['NW-2 is on the Ganga', 'NW-2 is on the Brahmaputra'], ['Air is cheapest for heavy goods', 'Water and rail are cheapest'], ['Railways are dense in the Thar', 'They are sparse there']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. When explaining where railways are dense or sparse, use relief, population and economic activity, and name regions. When writing about airways, name remote areas such as the north-east, Ladakh or the islands. Learn the three National Waterways and their rivers. And in cost questions, multiply the rate by the tonnes and the distance, showing each step.',
    }),
  ],
});
