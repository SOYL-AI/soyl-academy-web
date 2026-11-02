// ICSE 10 Geography ch10 Mineral Resources — two decks: Part 1 (t01–t02) iron ore and manganese; Part 2 (t03–t04) copper and
// bauxite, with ILLUSTRATIVE ore grades, process ratios and mine outputs computed in svgs.mjs.
import { sl, deck, table, flow, svgV } from './lib.mjs';
import { GRADES, OPENCAST, ALU_CHAIN, MINE_CHART, fe, ironIn, oreFor, ALU, bauxiteFor, CU, cuIn, MINES, minesTotal, mineShare } from './svgs.mjs';

const V = {
  grades: svgV(GRADES, 'Bars showing the approximate iron content of magnetite, hematite, limonite and siderite'),
  pit: svgV(OPENCAST, 'Cross-section of an open-cast mine with benches cut into the ore body'),
  alu: svgV(ALU_CHAIN, 'Boxes showing about five tonnes of bauxite giving two tonnes of alumina and one tonne of aluminium'),
  mines: svgV(MINE_CHART, 'Bar chart of illustrative output of four bauxite mines'),
};
const T_EX = 1000;
const CU_ORE = 40000;
const AL_PLANT = 50000;

export const deck1 = deck({
  part: 1,
  title: 'Mineral Resources — Part 1: Iron ore and manganese',
  goals: [
    'Name the types of iron ore and state uses of iron',
    'Name two leading iron-ore producing states and a prominent mining area in each',
    'State the uses of manganese and name two leading states with their mining areas',
  ],
  slides: [
    sl('title', 'Metals that build a nation', {
      b: 'Part 1 — rails, bridges, buses and pressure cookers all begin as rock dug from the hills of Odisha, Chhattisgarh and Jharkhand. This chapter studies four metallic minerals: **iron ore**, **manganese**, **copper** and **bauxite**.',
      v: table(['Mineral', 'Type', 'Main use'], [['Iron ore', 'Ferrous', 'Iron and steel'], ['Manganese', 'Ferrous', 'Hardening steel'], ['Copper', 'Non-ferrous', 'Electrical wires'], ['Bauxite', 'Non-ferrous', 'Aluminium']], 'Table of the four minerals in this chapter with type and main use'),
      n: 'Namaste! Railway lines, bridges, buses and even the pressure cooker in your kitchen began as rock dug out of the hills of eastern and central India. In this chapter we study four metallic minerals. Iron ore and manganese are ferrous minerals, used for iron and steel. Copper and bauxite are non ferrous. Let us start with iron ore and manganese.',
    }),
    sl('concept', 'Minerals, ores and their grade', {
      b: 'A **mineral** is a naturally occurring substance with a definite chemical composition. An **ore** is a mineral or rock from which a metal can be extracted **profitably**. The **grade** of an ore is the share of metal in it: a high-grade ore gives more metal per tonne and less waste. **Ferrous** minerals contain iron or are used with it (iron ore, manganese); **non-ferrous** metallic minerals do not (copper, bauxite).',
      v: table(['Term', 'Meaning', 'Example'], [['Mineral', 'Natural substance of definite composition', 'Hematite'], ['Ore', 'Rock from which a metal is extracted profitably', 'Iron ore'], ['Grade', 'Share of metal in the ore', 'High-grade hematite'], ['Ferrous', 'Contains or used with iron', 'Manganese'], ['Non-ferrous', 'Contains no iron', 'Copper, bauxite']], 'Table of terms used for minerals and ores with examples'),
      n: 'A mineral is a natural substance with a fixed chemical make up. When a metal can be taken out of a rock at a profit, we call that rock an ore. The grade of an ore tells us how much metal it contains: the higher the grade, the more metal and the less waste. Iron ore and manganese are ferrous minerals; copper and bauxite are non ferrous.',
    }),
    sl('diagram', 'Types of iron ore', {
      b: '**Magnetite:** black, **magnetic**, the **richest** ore (up to about 70% iron). **Hematite:** **reddish**, about 60–70% iron; it is the ore **most mined in India** and feeds most of our steel plants. **Limonite:** **yellowish-brown**, contains water, lower grade (roughly 35–50%). **Siderite:** a **carbonate** of iron with many impurities and a low iron content. Approximate values; grades vary from deposit to deposit.',
      v: V.grades,
      n: 'There are four main iron ores. Magnetite is black and magnetic, and it is the richest. Hematite is reddish and also rich, and it is the ore mined most in India. Limonite is yellowish brown, holds water in its structure and is of lower grade. Siderite is a carbonate of iron with many impurities and the least iron of the four.',
    }),
    sl('check', 'Quick check: types of iron ore', {
      b: 'Identify an iron ore from its description.',
      n: 'Quick check. Magnetite is black and magnetic, hematite reddish, limonite yellowish brown, siderite a carbonate.',
      chk: 'types-chk',
    }),
    sl('concept', 'Uses of iron', {
      b: 'Iron is the **basic metal of modern industry**. Iron ore is smelted with **coke** (from coking coal) and **limestone** in a **blast furnace** to make **pig iron**, which is refined into **steel**. Steel is used for **railways, bridges, ships, buildings, machinery, vehicles, tools, pipes, utensils** and defence equipment. Because almost every other industry needs iron and steel, iron ore is called the **backbone** of industrial development.',
      v: flow('LR', [['a', 'Iron ore + coke + limestone'], ['b', 'Blast furnace'], ['c', 'Pig iron'], ['d', 'Steel'], ['e', 'Rails, bridges, machines, vehicles']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow from iron ore, coke and limestone through the blast furnace to pig iron, steel and finished goods'),
      n: 'Iron ore is melted with coke and limestone in a blast furnace to make pig iron, which is then refined into steel. Steel goes into railway lines, bridges, ships, buildings, machines, cars, tools and kitchen utensils. Since nearly every other industry needs iron and steel, iron ore is often called the backbone of industry.',
    }),
    sl('concept', 'Distribution of iron ore', {
      b: 'India has large reserves of high-grade **hematite** and **magnetite**. **Leading states (as of the early 2020s): Odisha and Chhattisgarh**, followed by **Karnataka** and **Jharkhand**. **Odisha:** **Keonjhar** (Joda, Barbil), **Sundargarh** (Bonai) and **Mayurbhanj** (Gorumahisani, Badampahar, Sulaipat). **Chhattisgarh:** **Bailadila** range in Dantewada (very high-grade hematite) and **Dalli-Rajhara** in Balod–Durg (feeds the Bhilai steel plant). **Jharkhand:** **Noamundi** and Gua in Singhbhum. **Karnataka:** **Bellary–Hospet** (Sandur).',
      v: table(['State', 'Mining areas'], [['Odisha', 'Keonjhar (Joda, Barbil); Sundargarh (Bonai); Mayurbhanj (Gorumahisani)'], ['Chhattisgarh', 'Bailadila (Dantewada); Dalli-Rajhara'], ['Jharkhand', 'Noamundi, Gua (Singhbhum)'], ['Karnataka', 'Bellary–Hospet (Sandur)']], 'Table of iron-ore producing states and their mining areas'),
      n: 'Most of India’s iron ore comes from the old rocks of the eastern and central plateau. Odisha and Chhattisgarh are the leading producers. In Odisha the main mines are in Keonjhar, Sundargarh and Mayurbhanj districts. In Chhattisgarh, the Bailadila hills give very rich hematite, and the Dalli Rajhara mines supply the Bhilai steel plant. Jharkhand and Karnataka are also important.',
    }),
    sl('diagram', 'How iron ore is mined: open-cast mining', {
      b: 'Much of India’s iron ore lies in **thick deposits near the surface** of hill ranges such as Bailadila and the Keonjhar hills, so it is mined by **open-cast (open-pit) methods**: the **overburden** of soil and waste rock is removed and the ore is cut in **benches** (steps) by machines, then carried away by trucks, conveyors and railways. Open-cast mining is cheaper and safer than underground mining but scars the land, so pits must later be **reclaimed** and replanted.',
      v: V.pit,
      n: 'Iron ore in India often lies in thick layers close to the surface, on the tops of hills. So it is mined in open pits. First the soil and waste rock on top, called overburden, is removed. Then machines cut the ore in a series of steps called benches, and trucks carry it out. This is cheaper and safer than tunnelling, but the land must be repaired afterwards.',
    }),
    sl('example', 'Worked example: why steel plants stand near iron-ore mines', {
      b: '**Problem.** Explain why the Bhilai steel plant was built in Chhattisgarh and the Rourkela plant in Odisha.\n\n**Step 1. Bulky raw material.** Several tonnes of raw materials go into each tonne of steel, and iron ore is the heaviest; carrying it far is costly, so plants are built near the ore (Dalli-Rajhara for Bhilai; Keonjhar–Sundargarh for Rourkela).\n\n**Step 2. Other inputs nearby.** Coal from the Jharkhand–Chhattisgarh–Odisha fields, limestone, manganese and dolomite are found in the same region.\n\n**Step 3. Transport and water.** Railway lines link mines and plants; rivers supply water for cooling.',
      v: flow('LR', [['a', 'Iron ore heavy and bulky'], ['b', 'Coal, limestone, manganese nearby'], ['c', 'Railways and water'], ['d', 'Steel plants near the mines']], [['a', 'd'], ['b', 'd'], ['c', 'd']], 'Flow of three reasons leading steel plants to locate near iron-ore mines'),
      n: 'Why are Bhilai and Rourkela where they are? Steel needs several tonnes of raw material for every tonne of product, and iron ore is the heaviest part, so it is cheaper to build the plant near the mines. Coal, limestone and manganese are also found in the same region. Railways connect the mines to the plants, and nearby rivers provide water.',
    }),
    sl('check', 'Quick check: iron-ore areas', {
      b: 'Link a mining area to iron ore and its state.',
      n: 'Quick check. Keonjhar and Bailadila are rich iron ore areas of Odisha and Chhattisgarh.',
      chk: 'iron-dist-chk',
    }),
    sl('concept', 'Manganese: uses and distribution', {
      b: '**Uses:** mainly in the **iron and steel industry** — as **ferro-manganese**, an alloy that **hardens steel** and **removes impurities** such as sulphur and oxygen; also in **dry-cell batteries**, **bleaching powder**, **insecticides**, **paints**, glass and ceramics. **Distribution:** leading states **(as of the early 2020s)** include **Madhya Pradesh**, **Maharashtra** and **Odisha**, with Karnataka. **Madhya Pradesh:** **Balaghat** and **Chhindwara**. **Maharashtra:** **Nagpur** and **Bhandara**. **Odisha:** **Keonjhar**, **Sundargarh** and **Koraput**. **Karnataka:** **Sandur** (Bellary).',
      v: table(['State', 'Manganese areas'], [['Madhya Pradesh', 'Balaghat, Chhindwara'], ['Maharashtra', 'Nagpur, Bhandara'], ['Odisha', 'Keonjhar, Sundargarh, Koraput'], ['Karnataka', 'Sandur (Bellary)']], 'Table of manganese-producing states and their mining areas'),
      n: 'Manganese is mostly used in making steel. Mixed with iron as ferro manganese, it makes steel hard and tough and removes harmful impurities. It is also used in batteries, bleaching powder, paints and insecticides. Madhya Pradesh, Maharashtra and Odisha are leading producers. The main areas are Balaghat and Chhindwara in Madhya Pradesh, Nagpur and Bhandara in Maharashtra, and Keonjhar and Sundargarh in Odisha.',
    }),
    sl('example', 'Worked example: grade and tonnage', {
      b: `**Problem.** Using the illustrative grades (hematite ${fe('Hematite')}%, limonite ${fe('Limonite')}%), how much iron is contained in ${T_EX} t of each ore? How much limonite would be needed to give as much iron as ${T_EX} t of hematite?\n\n**Step 1.** Hematite: $\\frac{${fe('Hematite')}}{100} \\times ${T_EX} = ${ironIn('Hematite', T_EX)}$ t of iron.\n\n**Step 2.** Limonite: $\\frac{${fe('Limonite')}}{100} \\times ${T_EX} = ${ironIn('Limonite', T_EX)}$ t of iron.\n\n**Step 3.** Limonite needed $= \\frac{${ironIn('Hematite', T_EX)}}{${fe('Limonite') / 100}} = ${oreFor('Limonite', ironIn('Hematite', T_EX))}$ t (rounded).\n\n**Interpret.** A low-grade ore means far more rock to mine, carry and smelt for the same iron — one reason high-grade hematite is prized.`,
      v: table(['Ore', 'Iron content', `Iron in ${T_EX} t`], [['Hematite', `${fe('Hematite')}%`, `${ironIn('Hematite', T_EX)} t`], ['Limonite', `${fe('Limonite')}%`, `${ironIn('Limonite', T_EX)} t`]], 'Table of illustrative iron content in a thousand tonnes of hematite and of limonite'),
      n: 'Let us compare two ores. A thousand tonnes of hematite at sixty five per cent iron contains six hundred and fifty tonnes of iron. The same weight of limonite at forty five per cent contains only four hundred and fifty tonnes. To get six hundred and fifty tonnes of iron from limonite, we would need about one thousand four hundred and forty four tonnes of rock. Grade really matters.',
    }),
    sl('check', 'Quick check: manganese', {
      b: 'State a use of manganese or name a manganese area.',
      n: 'Quick check. Manganese hardens steel; Balaghat and Nagpur are manganese areas.',
      chk: 'mn-chk',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Iron ores: magnetite (richest, magnetic), hematite (most mined in India), limonite (yellow-brown, hydrated), siderite (carbonate, low grade).',
        'Uses of iron: steel for railways, bridges, ships, machinery, vehicles, buildings, tools.',
        'Leading iron-ore states: Odisha (Keonjhar, Sundargarh, Mayurbhanj) and Chhattisgarh (Bailadila, Dalli-Rajhara); also Jharkhand (Noamundi) and Karnataka (Bellary–Hospet).',
        'Manganese: hardens steel (ferro-manganese), batteries, bleaching powder, paints; Madhya Pradesh (Balaghat), Maharashtra (Nagpur), Odisha (Keonjhar).',
      ],
      v: table(['Mineral', 'Leading states', 'One area each'], [['Iron ore', 'Odisha, Chhattisgarh', 'Keonjhar; Bailadila'], ['Manganese', 'Madhya Pradesh, Maharashtra', 'Balaghat; Nagpur']], 'Summary table of leading states and areas for iron ore and manganese'),
      n: 'Let us sum up Part 1. The four iron ores are magnetite, hematite, limonite and siderite, and hematite is the one mined most in India. Iron is turned into steel for almost everything. Odisha and Chhattisgarh lead in iron ore. Manganese hardens steel and is used in batteries and bleaching powder; Balaghat, Nagpur and Keonjhar are important manganese areas.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Learn the four iron ores in order of iron content.',
        'For distribution, always pair a state with a named mining area.',
        'Give at least two uses for each mineral, not just "industry".',
        'Mark ranks with care: production ranks can change from year to year.',
      ],
      v: table(['Slip', 'Fix'], [['Limonite is the richest ore', 'Magnetite is'], ['Bailadila is in Odisha', 'It is in Chhattisgarh'], ['Manganese is a non-ferrous mineral', 'It is ferrous (used with iron)']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some tips. Remember the four iron ores in order of iron content. Whenever you name a state, add a mining area. Give at least two specific uses for each mineral. And be careful with rankings of producing states, because these can change from year to year.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Mineral Resources — Part 2: Copper and bauxite',
  goals: [
    'State the uses of copper and name two leading states with their mining areas',
    'State the uses of bauxite and name two leading states with their mining areas',
    'Follow the journey from ore to metal and work with ore grades',
  ],
  slides: [
    sl('title', 'Wires and wings', {
      b: 'Part 2 — the wiring in your home is probably copper; the overhead power line outside and the body of an aeroplane are largely aluminium, made from **bauxite**. Both are **non-ferrous** metals.',
      v: table(['Mineral', 'Metal', 'Key property', 'Typical use'], [['Copper ore', 'Copper', 'Excellent conductor, ductile', 'Electrical wiring'], ['Bauxite', 'Aluminium', 'Light, strong, rust-resistant', 'Aircraft, power lines, utensils']], 'Table of copper and bauxite with their metals, properties and uses'),
      n: 'Look around you. The wires inside the walls are probably copper. The power lines on tall towers and the body of an aeroplane are mostly aluminium, which is made from bauxite. Copper and aluminium are non ferrous metals: they contain no iron. In this part we study where their ores are found and what they are used for.',
    }),
    sl('concept', 'Copper: uses', {
      b: 'Copper is an **excellent conductor** of electricity and heat, is **ductile** (can be drawn into thin wires) and **malleable**, and resists corrosion. **Uses:** **electrical cables and wires**, **motors, transformers and generators**, **electronics** and telephone cables, **utensils** and heat exchangers, coins, and alloys: **brass** (copper + zinc) for fittings and decorative ware; **bronze** (copper + tin) for statues, bells and bearings.',
      v: flow('LR', [['a', 'Copper'], ['b', '+ zinc: brass (taps, fittings)'], ['c', '+ tin: bronze (statues, bells)'], ['d', 'Pure: wires, motors, electronics']], [['a', 'b'], ['a', 'c'], ['a', 'd']], 'Flow showing copper used pure for wires and alloyed into brass and bronze'),
      n: 'Copper carries electricity and heat extremely well, can be drawn into fine wires and does not rust. So it is used for electrical wiring, motors, transformers and electronic goods, as well as for utensils. Mixed with zinc it makes brass, used for taps and fittings. Mixed with tin it makes bronze, used for statues and bells, like the famous bronzes of Thanjavur.',
    }),
    sl('concept', 'Copper: distribution', {
      b: 'India has **limited reserves** of copper, mostly of **low grade**, and **imports** much of what it uses. **Leading states (as of the early 2020s): Madhya Pradesh and Rajasthan**, with **Jharkhand**. **Madhya Pradesh:** **Malanjkhand** in **Balaghat** district, a large open-cast mine. **Rajasthan:** **Khetri–Singhana** in **Jhunjhunu** district (Khetri copper complex), also Alwar. **Jharkhand:** the **Singhbhum** copper belt (**Ghatsila, Mosabani, Rakha**).',
      v: table(['State', 'Copper areas'], [['Madhya Pradesh', 'Malanjkhand (Balaghat)'], ['Rajasthan', 'Khetri–Singhana (Jhunjhunu); Alwar'], ['Jharkhand', 'Singhbhum: Ghatsila, Mosabani, Rakha']], 'Table of copper-producing states and their mining areas'),
      n: 'India does not have much copper, and most of its ore is of low grade, so the country imports a lot. The leading copper states are Madhya Pradesh and Rajasthan, with Jharkhand. Malanjkhand in Balaghat district of Madhya Pradesh is a large open pit mine. Khetri in Jhunjhunu district of Rajasthan is a famous copper complex. In Jharkhand, the Singhbhum belt has mines at Ghatsila and Mosabani.',
    }),
    sl('check', 'Quick check: copper', {
      b: 'Name a copper alloy or a copper-mining area.',
      n: 'Quick check. Brass is copper with zinc; bronze is copper with tin; Malanjkhand and Khetri are copper mines.',
      chk: 'cu-chk',
    }),
    sl('example', 'Worked example: why so much rock for so little copper', {
      b: `**Problem.** An Indian copper ore contains about ${CU.grade}% copper (illustrative). How much copper can be obtained from ${CU_ORE} t of ore, and what does this tell us?\n\n**Step 1.** Copper $= \\frac{${CU.grade}}{100} \\times ${CU_ORE} = ${cuIn(CU_ORE)}$ t.\n\n**Step 2.** Waste rock $= ${CU_ORE} - ${cuIn(CU_ORE)} = ${CU_ORE - cuIn(CU_ORE)}$ t.\n\n**Interpret.** Almost all the rock is waste, so mining, crushing and concentrating copper is costly and produces huge heaps of tailings. With limited, low-grade ore and rising demand for wires and electronics, India must **import** much of its copper.`,
      v: table(['Quantity', 'Tonnes'], [['Ore mined', String(CU_ORE)], ['Copper obtained', String(cuIn(CU_ORE))], ['Waste rock', String(CU_ORE - cuIn(CU_ORE))]], 'Table of illustrative ore mined, copper obtained and waste rock'),
      n: 'Suppose our copper ore contains a little over one per cent copper. From forty thousand tonnes of ore we get only about four hundred and eighty tonnes of copper; everything else is waste rock. That makes copper expensive to produce. Since our deposits are small and of low grade, while demand for wires and electronics keeps growing, India has to import much of its copper.',
    }),
    sl('concept', 'Bauxite: uses', {
      b: '**Bauxite** is the **ore of aluminium** — a clay-like rock rich in hydrated aluminium oxide. Aluminium is **light, strong, a good conductor**, **does not rust** and can be rolled thin. **Uses of aluminium:** **aircraft** and vehicles, **overhead electric cables**, **utensils**, **packaging** (foil, cans), window frames and building panels. **Bauxite** itself is also used in making **cement**, **abrasives** and heat-resistant **refractory** bricks.',
      v: table(['Property of aluminium', 'Use'], [['Light and strong', 'Aircraft, vehicles'], ['Good conductor, light', 'Overhead power cables'], ['Does not rust; conducts heat', 'Utensils'], ['Rolls into thin sheets', 'Foil, cans, packaging']], 'Table linking properties of aluminium to its uses'),
      n: 'Bauxite is the ore from which aluminium is made. Aluminium is light but strong, carries electricity well, does not rust and can be rolled into thin foil. So it is used to build aircraft and vehicles, to make overhead power cables, cooking utensils, food foil and drink cans, and window frames. Bauxite itself is also used in cement and heat resistant bricks.',
    }),
    sl('diagram', 'From bauxite to aluminium', {
      b: `Bauxite is mined, then **refined** into a white powder, **alumina** (aluminium oxide), at a **refinery** — for example at **Damanjodi** in Odisha, near the Koraput mines. Alumina is then **smelted** by electrolysis into **aluminium** at a **smelter** such as **Angul** or **Hirakud** in Odisha or **Renukoot** in Uttar Pradesh. Smelting uses **huge amounts of electricity**, so smelters are sited near **cheap power**. Rounded illustrative ratio: about ${ALU.bauxite} t bauxite → ${ALU.alumina} t alumina → ${ALU.aluminium} t aluminium.`,
      v: V.alu,
      n: 'Bauxite goes on a journey. First it is refined into a white powder called alumina, at a refinery near the mines, such as Damanjodi in Odisha. Then the alumina is split into aluminium using a great deal of electricity, at a smelter such as Angul, Hirakud or Renukoot. Roughly five tonnes of bauxite give two tonnes of alumina and finally one tonne of aluminium.',
    }),
    sl('check', 'Quick check: bauxite and aluminium', {
      b: 'Explain a step from bauxite to aluminium.',
      n: 'Quick check. Bauxite is refined to alumina, then smelted to aluminium using much electricity.',
      chk: 'bx-chk',
    }),
    sl('concept', 'Bauxite: distribution', {
      b: 'Bauxite forms in **laterite** areas of the plateaus and hills. **Leading states (as of the early 2020s): Odisha** (by far the largest) and **Gujarat**, with **Jharkhand**, **Chhattisgarh**, **Maharashtra** and **Madhya Pradesh**. **Odisha:** **Koraput** (Panchpatmali hills) and **Kalahandi**. **Gujarat:** **Jamnagar**, **Kutch** and **Bhavnagar** (Saurashtra). **Jharkhand:** **Lohardaga**. **Chhattisgarh:** **Mainpat** plateau (Surguja) and the **Amarkantak** plateau. **Maharashtra:** **Kolhapur** and **Ratnagiri**.',
      v: table(['State', 'Bauxite areas'], [['Odisha', 'Koraput (Panchpatmali), Kalahandi'], ['Gujarat', 'Jamnagar, Kutch, Bhavnagar'], ['Jharkhand', 'Lohardaga'], ['Chhattisgarh', 'Mainpat, Amarkantak plateau'], ['Maharashtra', 'Kolhapur, Ratnagiri']], 'Table of bauxite-producing states and their mining areas'),
      n: 'Bauxite is found on the laterite capped plateaus and hills of India. Odisha is by far the largest producer, from Koraput and Kalahandi districts. Gujarat is another leading state, with deposits in Jamnagar and Kutch. Lohardaga in Jharkhand, the Mainpat and Amarkantak plateaus in Chhattisgarh, and Kolhapur in Maharashtra are other important areas.',
    }),
    sl('example', 'Worked example: supplying a smelter', {
      b: `**Problem.** A smelter plans to make ${AL_PLANT} t of aluminium a year. Using the rounded illustrative ratio (${ALU.bauxite} t bauxite → ${ALU.alumina} t alumina → ${ALU.aluminium} t aluminium), how much alumina and bauxite does it need? Why should it be close to a power station?\n\n**Step 1.** Alumina $= ${AL_PLANT} \\times ${ALU.alumina} = ${AL_PLANT * ALU.alumina}$ t.\n\n**Step 2.** Bauxite $= ${AL_PLANT} \\times ${ALU.bauxite} = ${bauxiteFor(AL_PLANT)}$ t.\n\n**Step 3. Location.** Smelting by electrolysis needs very large amounts of electricity, so a smelter is best placed near cheap hydel or thermal power, while the refinery stays near the bulky bauxite.`,
      v: flow('LR', [['a', `${bauxiteFor(AL_PLANT)} t bauxite`], ['b', `${AL_PLANT * ALU.alumina} t alumina (refinery near mine)`], ['c', `${AL_PLANT} t aluminium (smelter near cheap power)`]], [['a', 'b'], ['b', 'c']], 'Flow of illustrative tonnages from bauxite to alumina to aluminium for one smelter'),
      n: 'To make fifty thousand tonnes of aluminium, the smelter needs twice as much alumina, one hundred thousand tonnes, which comes from five times as much bauxite, two hundred and fifty thousand tonnes. The refinery is placed near the mines, because bauxite is bulky. The smelter is placed near a cheap supply of electricity, because splitting alumina into aluminium uses enormous amounts of power.',
    }),
    sl('diagram', 'Reading mine data (illustrative)', {
      b: `An imagined company runs four bauxite mines with a total output of ${minesTotal} lakh tonnes a year. Share of a mine = its output ÷ total × 100: ${MINES.map((m) => `${m.mine} ${mineShare(m.mine)}%`).join(', ')}. The two largest mines together give ${mineShare('Mine A') + mineShare('Mine B')}% of the output.`,
      v: V.mines,
      n: 'Here is an imagined company with four bauxite mines producing twenty five lakh tonnes a year in all. To find a mine’s share, divide its output by the total and multiply by one hundred. Mine A, with twelve lakh tonnes, gives forty eight per cent, and Mine B gives thirty two per cent. Together the two largest mines give four fifths of the company’s bauxite.',
    }),
    sl('check', 'Quick check: bauxite areas', {
      b: 'Identify bauxite-producing areas.',
      n: 'Quick check. Koraput, Lohardaga and Jamnagar are bauxite areas.',
      chk: 'bx-dist-chk',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Copper: excellent conductor, ductile; wires, motors, electronics, utensils; alloys brass (with zinc) and bronze (with tin).',
        'Copper areas: Madhya Pradesh (Malanjkhand, Balaghat), Rajasthan (Khetri, Jhunjhunu), Jharkhand (Singhbhum); low-grade ores, so India imports copper.',
        'Bauxite: ore of aluminium; aluminium is light, strong, rust-free — aircraft, power cables, utensils, packaging.',
        'Bauxite areas: Odisha (Koraput, Kalahandi), Gujarat (Jamnagar, Kutch), Jharkhand (Lohardaga), Chhattisgarh, Maharashtra. Bauxite → alumina (refinery) → aluminium (smelter, cheap power).',
      ],
      v: table(['Mineral', 'Leading states', 'One area each'], [['Copper', 'Madhya Pradesh, Rajasthan', 'Malanjkhand; Khetri'], ['Bauxite', 'Odisha, Gujarat', 'Koraput; Jamnagar']], 'Summary table of leading states and areas for copper and bauxite'),
      n: 'Let us sum up Part 2. Copper conducts electricity very well and is used for wires, motors and electronics, and in brass and bronze. It is mined at Malanjkhand, Khetri and in Singhbhum. Bauxite is the ore of aluminium, a light, strong metal used for aircraft, power lines and utensils. Odisha and Gujarat lead in bauxite, and smelters are built near cheap electricity.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Link each use to a property (conductor → wires; light → aircraft).',
        'Pair every state with a named mining area: Malanjkhand (Madhya Pradesh), Khetri (Rajasthan), Koraput (Odisha), Jamnagar (Gujarat).',
        'Remember the chain: bauxite → alumina → aluminium.',
        'Brass is copper + zinc; bronze is copper + tin.',
      ],
      v: table(['Slip', 'Fix'], [['Bronze is copper + zinc', 'Bronze is copper + tin'], ['Khetri is in Madhya Pradesh', 'Khetri is in Rajasthan'], ['Bauxite is smelted directly', 'It is refined to alumina first']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. Always link a use to a property of the metal. Pair each state with a named mining area, such as Malanjkhand, Khetri, Koraput and Jamnagar. Remember the chain from bauxite to alumina to aluminium. And do not mix up the alloys: brass is copper and zinc, bronze is copper and tin.',
    }),
  ],
});
