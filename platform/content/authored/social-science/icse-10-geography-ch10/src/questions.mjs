// ICSE 10 Geography ch10 Mineral Resources — question bank (ICSE 2027 specimen style). Data items use the ILLUSTRATIVE ore
// grades, process ratios and mine outputs exported by svgs.mjs, and every computed answer is asserted.
import { mk, add } from './lib.mjs';
import { fe, ironIn, oreFor, ALU, bauxiteFor, aluminaFor, CU, cuIn, MINES, minesTotal, mineShare } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const minesText = MINES.map((m) => `${m.mine} ${m.out}`).join(', ');

// ---------------------------------------------------------------- t01 iron ore: types, uses, distribution
add('types-chk', mcq({
  stem: 'A geologist finds a yellowish-brown, earthy iron ore of fairly low grade that contains water in its structure. It is most likely:',
  right: 'limonite',
  wrong: ['magnetite', 'hematite', 'siderite'],
  sol: 'Yellow-brown, hydrated and of lower grade — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('hematite-mcq', mcq({
  stem: 'Most of the iron ore mined in Odisha and Chhattisgarh for Indian steel plants is reddish and has a high iron content. This ore is:',
  right: 'hematite',
  wrong: ['magnetite', 'limonite', 'siderite'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('keonjhar-mcq', mcq({
  stem: 'Joda and Barbil are iron-ore mining centres in:',
  right: 'Keonjhar district of Odisha',
  wrong: ['Durg district of Chhattisgarh', 'Bellary district of Karnataka', 'Jhunjhunu district of Rajasthan'],
  sol: 'Option (@K).',
  d: 2, c: 'recall', t: [1],
}));
add('dalli-mcq', mcq({
  stem: 'The Bhilai steel plant obtains much of its iron ore from the nearby mines of:',
  right: 'Dalli-Rajhara',
  wrong: ['Noamundi', 'Khetri', 'Malanjkhand'],
  sol: 'Dalli-Rajhara in Chhattisgarh lies close to Bhilai — option (@K).',
  d: 2, c: 'recall', t: [1],
}));
add('leading-mcq', mcq({
  stem: 'Which two states were the leading producers of iron ore in India in the early 2020s?',
  right: 'Odisha and Chhattisgarh',
  wrong: ['Punjab and Haryana', 'Kerala and Tamil Nadu', 'Rajasthan and Gujarat'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('iron-dist-chk', mcq({
  stem: 'A steel company wants to buy high-grade hematite from a single large deposit. Which source would be most suitable?',
  right: 'The Bailadila range in Dantewada, Chhattisgarh',
  wrong: ['The Khetri belt in Jhunjhunu, Rajasthan', 'The Jamnagar coast in Gujarat', 'Lohardaga in Jharkhand'],
  sol: 'Bailadila is famous for very high-grade hematite; the others are copper or bauxite areas — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('location-mcq', mcq({
  stem: 'Steel plants such as Rourkela and Bhilai were built close to iron-ore mines mainly because:',
  right: 'iron ore is heavy and bulky, so carrying it long distances is costly',
  wrong: ['steel can be made only inside forests', 'iron ore spoils quickly in storage', 'mines are always next to sea ports'],
  sol: 'Weight and bulk of the raw material favour locations near the ore — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('opencast-mcq', mcq({
  stem: 'Iron ore in the Bailadila and Keonjhar hills is mined mainly by open-cast methods because:',
  right: 'the ore lies in thick deposits close to the surface',
  wrong: ['the ore lies thousands of metres below the surface', 'open-cast mining needs no machines', 'the ore is found dissolved in sea water'],
  sol: 'Near-surface deposits can be dug from open pits after removing the overburden — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('grade-mcq', mcq({
  stem: 'Why would a steel plant prefer high-grade hematite to a low-grade siderite ore?',
  right: 'It gives more iron per tonne, so less rock has to be mined, carried and smelted',
  wrong: ['Siderite cannot be found anywhere in the world', 'Hematite contains no iron', 'Low-grade ore always melts faster'],
  sol: 'Higher grade means less waste per tonne of iron — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('ar-hem', ar({
  a: 'Most of the iron ore mined in India is hematite.',
  r: 'India has large deposits of high-grade hematite in Odisha, Chhattisgarh, Jharkhand and Karnataka.',
  key: 'c',
  sol: 'Both are true, and the large hematite deposits explain why it dominates mining — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('ar-mag', ar({
  a: 'Magnetite has the highest iron content of the iron ores.',
  r: 'Magnetite is a carbonate of iron.',
  key: 'a',
  sol: 'A is true; R is false: magnetite is an oxide of iron; siderite is the carbonate — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('tf-limonite', tf({
  stem: 'A plant would need to mine less rock to obtain 100 tonnes of iron from limonite than from magnetite.',
  key: 'f',
  sol: 'False: limonite has a lower iron content, so more rock is needed.',
  d: 2, c: 'application', t: [1],
}), () => fe('Limonite') < fe('Magnetite') || 'grades');
add('fill-magnetite', fill({
  stem: 'The black iron ore that is attracted by a magnet is called ___.',
  acc: [['magnetite']],
  sol: '**Magnetite**.',
  d: 1, c: 'recall', t: [1],
}));
add('fill-blast', fill({
  stem: 'Iron ore is smelted with coke and limestone in a ___ furnace to make pig iron.',
  acc: [['blast']],
  sol: '**Blast** furnace.',
  d: 1, c: 'recall', t: [1],
}));
add('s1-chh', short({
  marks: 1,
  stem: 'Name one iron-ore mining area in Chhattisgarh.',
  model: 'Bailadila (Dalli-Rajhara is also accepted).',
  sol: 'Bailadila.',
  scheme: [['Bailadila / Dalli-Rajhara', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('types-short2', short({
  marks: 2,
  stem: 'Name the four types of iron ore in order of decreasing iron content, and state which of them is mined most in India.',
  model: 'Magnetite, hematite, limonite, siderite. Hematite is mined most in India.',
  sol: 'Order; hematite.',
  scheme: [['Order of the four ores', 1], ['Hematite', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('backbone-short2', short({
  marks: 2,
  stem: 'Why is iron ore often called the backbone of industrial development? Give two reasons.',
  model: 'Iron ore is the raw material for iron and steel, which almost every other industry needs for its machines, tools, buildings and transport. Steel is also needed for railways, bridges, ships, vehicles and defence equipment, so the growth of a nation’s economy depends on it.',
  sol: 'Raw material for steel; steel needed by all sectors.',
  scheme: [['Basis of steel and machinery', 1], ['Transport, construction or defence', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('dist-short2', short({
  marks: 2,
  stem: 'Name the two leading iron-ore producing states of India and one mining area in each.',
  model: 'Odisha — Keonjhar (Joda, Barbil), Sundargarh or Mayurbhanj (Gorumahisani). Chhattisgarh — Bailadila or Dalli-Rajhara.',
  sol: 'Odisha and Chhattisgarh with areas.',
  scheme: [['Odisha with area', 1], ['Chhattisgarh with area', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('steel-short3', short({
  marks: 3,
  stem: 'Give three reasons why the region where Odisha, Jharkhand and Chhattisgarh meet has several large steel plants.',
  model: 'Rich deposits of high-grade hematite lie in Keonjhar, Sundargarh, Singhbhum and Chhattisgarh, and iron ore is heavy, so plants are built near it. Coking coal from the Jharkhand fields, and limestone, dolomite and manganese, are found in the same region. A dense railway network links mines, coalfields and plants, and rivers provide water for cooling.',
  sol: 'Iron ore; other raw materials; transport and water.',
  scheme: [['Iron ore nearby', 1], ['Coal, limestone, manganese', 1], ['Railways, water', 1]],
  d: 3, c: 'application', t: [1],
}));
const IRON_T = 2400;
const ironIn2400 = ironIn('Hematite', IRON_T);
add('iron-num', num({
  stem: `An illustrative hematite deposit has ore containing ${fe('Hematite')}% iron. How many tonnes of iron are contained in ${IRON_T} t of this ore?`,
  value: ironIn2400, tol: 0, unit: 't',
  sol: `Iron $= \\frac{${fe('Hematite')}}{100} \\times ${IRON_T} = ${ironIn2400}$ t.`,
  scheme: [[`${ironIn2400} t`, 1]],
  d: 2, c: 'application', t: [1],
}), () => ironIn2400 === 1560 || `iron ${ironIn2400}`);
const LIM_FE = 900;
const limOre = oreFor('Limonite', LIM_FE);
add('limonite-num', num({
  stem: `How many tonnes of limonite ore containing ${fe('Limonite')}% iron (illustrative) must be smelted to obtain ${LIM_FE} t of iron?`,
  value: limOre, tol: 0, unit: 't',
  sol: `Ore $= \\frac{${LIM_FE}}{${fe('Limonite') / 100}} = ${limOre}$ t.`,
  scheme: [[`${limOre} t`, 1]],
  d: 3, c: 'application', t: [1],
}), () => limOre === 2000 || `lim ${limOre}`);

// ---------------------------------------------------------------- t02 manganese
add('mn-chk', mcq({
  stem: 'Manganese is essential to the steel industry mainly because:',
  right: 'as ferro-manganese it hardens steel and removes impurities',
  wrong: ['it is the main fuel of blast furnaces', 'it gives steel a red colour', 'it replaces iron ore completely'],
  sol: 'Option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('mn-uses-mcq', mcq({
  stem: 'Apart from steel making, manganese is used in making:',
  right: 'dry-cell batteries, bleaching powder and paints',
  wrong: ['cotton cloth and yarn', 'jute bags and sacks', 'tea and coffee'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('mn-area-mcq', mcq({
  stem: 'Balaghat and Chhindwara are important manganese-mining districts of:',
  right: 'Madhya Pradesh',
  wrong: ['Odisha', 'Rajasthan', 'Kerala'],
  sol: 'Option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('mn-region-mcq', mcq({
  stem: 'A battery factory near Nagpur buys manganese ore from mines less than a hundred kilometres away. These mines are most likely in:',
  right: 'the Nagpur–Bhandara belt of Maharashtra',
  wrong: ['the Jamnagar coast of Gujarat', 'the Khetri belt of Rajasthan', 'the Sundarbans of West Bengal'],
  sol: 'Nagpur and Bhandara districts have manganese mines — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('ar-mn', ar({
  a: 'Odisha produces both iron ore and manganese.',
  r: 'Manganese is used in making dry-cell batteries.',
  key: 'd',
  sol: 'Both are true, but a use of manganese does not explain where the two minerals occur — option (d).',
  d: 3, c: 'analysis', t: [1, 2],
}));
add('tf-mn', tf({
  stem: 'Manganese is grouped with the ferrous minerals because it is used mainly with iron in making steel.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'understanding', t: [2],
}));
add('fill-mn', fill({
  stem: 'An alloy of iron and manganese used in steel making is called ___.',
  acc: [['ferro-manganese', 'ferromanganese', 'ferro manganese']],
  sol: '**Ferro-manganese**.',
  d: 1, c: 'recall', t: [2],
}));
add('mn-short2', short({
  marks: 2,
  stem: 'State two uses of manganese, one of which is in the steel industry.',
  model: 'It is made into ferro-manganese, which hardens steel and removes impurities such as sulphur and oxygen. It is also used to make dry-cell batteries (or bleaching powder, paints, insecticides).',
  sol: 'Steel hardening; batteries or bleaching powder.',
  scheme: [['Steel use', 1], ['Other use', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('mn-short3', short({
  marks: 3,
  stem: 'Name two leading manganese-producing states and one mining area in each. Why is it useful to steel plants that manganese is often found near iron-ore regions?',
  model: 'Madhya Pradesh — Balaghat or Chhindwara; Maharashtra — Nagpur or Bhandara (Odisha — Keonjhar or Sundargarh is also accepted). Every steel plant needs manganese to harden steel and remove impurities; when it is mined in the same region as iron ore, as in Odisha, both raw materials can be brought cheaply over short distances.',
  sol: 'Two states with areas; nearness cuts transport cost.',
  scheme: [['First state with area', 1], ['Second state with area', 1], ['Reason', 1]],
  d: 3, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 copper
add('cu-chk', mcq({
  stem: 'Which alloy is made by mixing copper with zinc?',
  right: 'Brass',
  wrong: ['Bronze', 'Steel', 'Ferro-manganese'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('bronze-mcq', mcq({
  stem: 'Craftsmen in Thanjavur cast temple statues from an alloy of copper and tin. This alloy is:',
  right: 'bronze',
  wrong: ['brass', 'steel', 'alumina'],
  sol: 'Copper + tin = bronze — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('malanj-mcq', mcq({
  stem: 'Malanjkhand, a large open-cast copper mine, lies in:',
  right: 'Balaghat district of Madhya Pradesh',
  wrong: ['Jhunjhunu district of Rajasthan', 'Singhbhum district of Jharkhand', 'Keonjhar district of Odisha'],
  sol: 'Option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('khetri-mcq', mcq({
  stem: 'The Khetri copper complex is located in:',
  right: 'Rajasthan',
  wrong: ['Madhya Pradesh', 'Odisha', 'Karnataka'],
  sol: 'Khetri is in Jhunjhunu district, Rajasthan — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('import-mcq', mcq({
  stem: 'India imports a large share of the copper it uses. The main reason is that:',
  right: 'its copper ores are limited and mostly of low grade, while demand from power and electronics is high',
  wrong: ['copper has no use in India', 'Indian factories cannot use metal wires', 'India’s copper ores are too pure to process'],
  sol: 'Small, low-grade reserves cannot meet rising demand — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('demand-mcq', mcq({
  stem: 'A state launches a large programme to wire every village for electricity and to set up electric-motor workshops. The demand for which mineral is most likely to rise?',
  right: 'Copper',
  wrong: ['Gypsum', 'Salt', 'Limestone'],
  sol: 'Wiring and motors use copper — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('ar-cu', ar({
  a: 'Copper is widely used for electrical wiring.',
  r: 'Copper is an excellent conductor of electricity and can be drawn into thin wires.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
add('tf-cu', tf({
  stem: 'Bronze is an alloy of copper and tin.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [3],
}));
add('fill-cu', fill({
  stem: 'The Malanjkhand copper mine is in the ___ district of Madhya Pradesh.',
  acc: [['Balaghat']],
  sol: '**Balaghat**.',
  d: 1, c: 'recall', t: [3],
}));
add('s1-cu', short({
  marks: 1,
  stem: 'Name the copper-mining belt of Jharkhand.',
  model: 'The Singhbhum belt (Ghatsila, Mosabani).',
  sol: 'Singhbhum.',
  scheme: [['Singhbhum', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('cu-short2', short({
  marks: 2,
  stem: 'State two uses of copper and the property of copper on which each depends.',
  model: 'Electrical wires and cables — copper is an excellent conductor of electricity and is ductile. Cooking vessels and heat exchangers — it conducts heat well and resists corrosion (alloys such as brass and bronze are also accepted with a property).',
  sol: 'Wires (conductivity); utensils (heat conduction).',
  scheme: [['Use 1 with property', 1], ['Use 2 with property', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('cu-dist-short3', short({
  marks: 3,
  stem: 'A cable manufacturer in Indore wants to buy copper mined in India. Name two states, with one mining area in each, from which it could obtain copper, and explain why it may still have to import part of its copper.',
  model: 'Madhya Pradesh — Malanjkhand in Balaghat district (close to Indore); Rajasthan — Khetri–Singhana in Jhunjhunu district (Jharkhand — Ghatsila or Mosabani in Singhbhum is also accepted). India’s copper reserves are small and mostly of low grade, so domestic output falls well short of the demand from cable, power and electronics makers, and the rest has to be imported.',
  sol: 'Madhya Pradesh and Rajasthan with areas; limited, low-grade reserves.',
  scheme: [['First state with area', 1], ['Second state with area', 1], ['Reason for imports', 1]],
  d: 3, c: 'application', t: [3],
}));
const CU_T = 25000;
const cu25 = cuIn(CU_T);
add('cu-num', num({
  stem: `An illustrative copper ore contains ${CU.grade}% copper. How many tonnes of copper can be obtained from ${CU_T} t of ore?`,
  value: cu25, tol: 0, unit: 't',
  sol: `Copper $= \\frac{${CU.grade}}{100} \\times ${CU_T} = ${cu25}$ t.`,
  scheme: [[`${cu25} t`, 1]],
  d: 2, c: 'application', t: [3],
}), () => cu25 === 300 || `cu ${cu25}`);
const CU_NEED = 900;
const cuOre = Math.round(CU_NEED / (CU.grade / 100));
add('cu-ore-num', num({
  stem: `With the same illustrative grade (${CU.grade}% copper), how many tonnes of ore must be mined to obtain ${CU_NEED} t of copper?`,
  value: cuOre, tol: 0, unit: 't',
  sol: `Ore $= \\frac{${CU_NEED}}{${CU.grade / 100}} = ${cuOre}$ t.`,
  scheme: [[`${cuOre} t`, 1]],
  d: 3, c: 'application', t: [3],
}), () => (cuOre === 75000 && cuIn(cuOre) === CU_NEED) || `cuOre ${cuOre}`);

// ---------------------------------------------------------------- t04 bauxite
add('bx-chk', mcq({
  stem: 'Before it is smelted into aluminium, bauxite is first refined into:',
  right: 'alumina',
  wrong: ['pig iron', 'ferro-manganese', 'brass'],
  sol: 'Bauxite → alumina → aluminium — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('aircraft-mcq', mcq({
  stem: 'Aluminium rather than steel is used for most of the body of an aircraft mainly because aluminium is:',
  right: 'light yet strong, and does not rust',
  wrong: ['heavier and stiffer than steel', 'strongly magnetic', 'a poor conductor of heat'],
  sol: 'Option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('powerline-mcq', mcq({
  stem: 'Long overhead high-voltage transmission lines often use aluminium conductors rather than copper. Which reason best explains this?',
  right: 'Aluminium is much lighter and cheaper, while still conducting electricity well',
  wrong: ['Aluminium conducts electricity better than any other metal', 'Copper cannot be drawn into wires', 'Aluminium is heavier, so the lines sag less'],
  sol: 'Lightness and cost matter for long spans on towers — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('bx-state-mcq', mcq({
  stem: 'Which two states were the leading producers of bauxite in India in the early 2020s?',
  right: 'Odisha and Gujarat',
  wrong: ['Punjab and Haryana', 'Kerala and Tamil Nadu', 'Bihar and Uttar Pradesh'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('smelter-mcq', mcq({
  stem: 'Aluminium smelters such as those at Renukoot and Hirakud are located close to sources of cheap electricity because:',
  right: 'turning alumina into aluminium uses very large amounts of electricity',
  wrong: ['bauxite is mined only near power stations', 'aluminium must be stored in water', 'electricity makes bauxite lighter to carry'],
  sol: 'Smelting by electrolysis is power-hungry — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('bx-dist-chk', mcq({
  stem: 'Which group lists only bauxite-producing areas?',
  right: 'Koraput, Lohardaga and Jamnagar',
  wrong: ['Khetri, Malanjkhand and Ghatsila', 'Chhindwara, Nagpur and Bhandara', 'Bailadila, Noamundi and Joda'],
  sol: 'The other groups are copper, manganese and iron-ore areas — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('refinery-mcq', mcq({
  stem: 'An alumina refinery, such as the one at Damanjodi in Odisha, is usually built close to the bauxite mines because:',
  right: 'bauxite is bulky and loses much of its weight when refined, so it is cheaper to refine it near the mine',
  wrong: ['alumina cannot be transported at all', 'refining needs sea water', 'bauxite gains weight when refined'],
  sol: 'A weight-losing raw material is processed near its source — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('ar-bx', ar({
  a: 'Bauxite is used mainly as a fuel in thermal power stations.',
  r: 'Bauxite is the main ore of aluminium.',
  key: 'b',
  sol: 'A is false: bauxite is not a fuel; R is true — option (b).',
  d: 1, c: 'understanding', t: [4],
}));
add('ar-smelter', ar({
  a: 'An aluminium smelter was set up at Hirakud in Odisha.',
  r: 'The Hirakud dam supplies hydroelectricity, and smelting aluminium needs large amounts of power.',
  key: 'c',
  sol: 'Both are true, and the cheap power explains the location — option (c).',
  d: 3, c: 'analysis', t: [4],
}));
add('tf-bx', tf({
  stem: 'Bauxite is smelted directly into aluminium without any intermediate product.',
  key: 'f',
  sol: 'False: it is first refined into alumina, which is then smelted.',
  d: 1, c: 'understanding', t: [4],
}));
add('tf-smelter', tf({
  stem: 'Smelting alumina into aluminium needs only a little electricity, so smelters can be built anywhere.',
  key: 'f',
  sol: 'False: smelting by electrolysis needs very large amounts of electricity, so smelters are sited near cheap power.',
  d: 1, c: 'understanding', t: [4],
}));
add('fill-alumina', fill({
  stem: 'The white powder obtained by refining bauxite, which is then smelted into aluminium, is called ___.',
  acc: [['alumina', 'aluminium oxide', 'aluminum oxide']],
  sol: '**Alumina**.',
  d: 1, c: 'recall', t: [4],
}));
add('bx-short2', short({
  marks: 2,
  stem: 'State two uses of aluminium and link each to a property of the metal.',
  model: 'Aircraft and vehicle bodies — it is light yet strong. Overhead power cables — it conducts electricity well and is light (also utensils, as it conducts heat and does not rust; foil and cans, as it rolls thin).',
  sol: 'Two uses with properties.',
  scheme: [['Use 1 with property', 1], ['Use 2 with property', 1]],
  d: 2, c: 'application', t: [4],
}));
add('bx-short3', short({
  marks: 3,
  stem: 'In Odisha, alumina is made at Damanjodi near the Koraput bauxite mines, while aluminium is smelted at Angul, near large power stations. Explain why the two stages are located differently.',
  model: 'Bauxite is bulky and about half its weight is lost when it is refined into alumina, so refining near the mines (Damanjodi near Koraput) avoids carrying waste. Alumina is much lighter and more valuable per tonne, so it can bear the cost of transport to the smelter. Smelting alumina into aluminium by electrolysis needs enormous amounts of electricity, so the smelter is placed where cheap power is available, as at Angul with its thermal power stations.',
  sol: 'Weight loss favours the mine; power demand favours the power source.',
  scheme: [['Refinery near mine', 1], ['Alumina easier to transport', 1], ['Smelter near cheap power', 1]],
  d: 4, c: 'analysis', t: [4],
}));
const AL_T = 30000;
const bx30 = bauxiteFor(AL_T);
add('bx-num', num({
  stem: `Using the rounded illustrative ratio of ${ALU.bauxite} t of bauxite for every ${ALU.aluminium} t of aluminium, how many tonnes of bauxite are needed to make ${AL_T} t of aluminium?`,
  value: bx30, tol: 0, unit: 't',
  sol: `Bauxite $= ${AL_T} \\times ${ALU.bauxite} = ${bx30}$ t.`,
  scheme: [[`${bx30} t`, 1]],
  d: 2, c: 'application', t: [4],
}), () => bx30 === 150000 || `bx ${bx30}`);
const shA = mineShare('Mine A');
add('share-num', num({
  stem: `An imagined company’s four bauxite mines produce (lakh tonnes a year, illustrative): ${minesText}. What percentage of the company’s output comes from Mine A?`,
  value: shA, tol: 0.1, unit: '%',
  sol: `Total $= ${MINES.map((m) => m.out).join(' + ')} = ${minesTotal}$; share $= \\frac{${MINES[0].out}}{${minesTotal}} \\times 100 = ${shA}$, so ${shA}%.`,
  scheme: [['Total', 0.5], [`${shA}%`, 0.5]],
  d: 2, c: 'application', t: [4],
}), () => (minesTotal === 25 && shA === 48) || `share ${shA}`);

// ---------------------------------------------------------------- match
add('match-area', match({
  marks: 2,
  stem: 'Match each mineral in Column A with a mining area in Column B.',
  pairs: [
    ['Iron ore', 'Noamundi'],
    ['Manganese', 'Bhandara'],
    ['Copper', 'Khetri'],
    ['Bauxite', 'Lohardaga'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Iron ore → Noamundi; manganese → Bhandara; copper → Khetri; bauxite → Lohardaga.',
  d: 2, c: 'application', t: [1, 2, 3, 4],
}));
add('match-use', match({
  marks: 2,
  stem: 'Match each mineral in Column A with a typical use in Column B.',
  pairs: [
    ['Iron ore', 'Railway lines'],
    ['Manganese', 'Dry-cell batteries'],
    ['Copper', 'Electrical wiring'],
    ['Bauxite', 'Aircraft bodies'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Iron ore → rails; manganese → batteries; copper → wiring; bauxite → aircraft.',
  d: 1, c: 'recall', t: [1, 2, 3, 4],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('long-iron', long({
  stem: '(a) Name the four types of iron ore. Which of them is the richest? [2]\n\n(b) State two uses of iron. [2]\n\n(c) Name the two leading iron-ore producing states of India and two mining areas in each. [3]\n\n(d) Explain three reasons why steel plants such as Bhilai and Rourkela are located near iron-ore mines. [3]',
  model: '(a) Magnetite, hematite, limonite and siderite; magnetite is the richest.\n\n(b) Making steel for railways, bridges and buildings; machinery, vehicles, tools and utensils (also ships and defence equipment).\n\n(c) Odisha — Keonjhar (Joda, Barbil), Sundargarh (Bonai) or Mayurbhanj (Gorumahisani). Chhattisgarh — Bailadila (Dantewada) and Dalli-Rajhara.\n\n(d) Iron ore is heavy and bulky, so carrying it long distances raises costs; coking coal, limestone, dolomite and manganese are found in the same region; railways link the mines to the plants, and nearby rivers supply water.',
  sol: 'Types; uses; states and areas; location reasons.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 2, c: 'understanding', t: [1],
}));
const T3 = 3000;
const h3 = ironIn('Hematite', T3);
const l3 = ironIn('Limonite', T3);
add('long-mn', long({
  stem: `(a) State two uses of manganese. [2]\n\n(b) Name two leading manganese-producing states and one mining area in each. [2]\n\n(c) Using illustrative grades of ${fe('Hematite')}% iron for hematite and ${fe('Limonite')}% for limonite, calculate the iron contained in ${T3} t of each ore and the difference. [3]\n\n(d) Using your answer to (c), explain why steel plants prefer high-grade ore, and why they also need manganese. [3]`,
  model: `(a) Making ferro-manganese, which hardens steel and removes impurities; dry-cell batteries (also bleaching powder, paints, insecticides).\n\n(b) Madhya Pradesh — Balaghat or Chhindwara; Maharashtra — Nagpur or Bhandara (Odisha — Keonjhar also accepted).\n\n(c) Hematite: $\\frac{${fe('Hematite')}}{100} \\times ${T3} = ${h3}$ t; limonite: $\\frac{${fe('Limonite')}}{100} \\times ${T3} = ${l3}$ t; difference $= ${h3} - ${l3} = ${h3 - l3}$ t.\n\n(d) The same tonnage of hematite yields ${h3 - l3} t more iron, so less rock must be mined, carried and smelted for each tonne of steel, saving fuel and transport and producing less waste. Manganese is still needed because, as ferro-manganese, it hardens the steel and removes impurities such as sulphur and oxygen.`,
  sol: `Uses; states; ${h3} t, ${l3} t, difference ${h3 - l3} t; grade and manganese.`,
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 4, c: 'analysis', t: [1, 2],
}), () => (h3 === 1950 && l3 === 1350) || 'grades');
const CU60 = 60000;
const cu60 = cuIn(CU60);
add('long-cu', long({
  stem: `(a) State two uses of copper. [2]\n\n(b) What are brass and bronze? [2]\n\n(c) Name the two leading copper-producing states and one mining area in each, and a copper belt of Jharkhand. [3]\n\n(d) A mine works ore containing ${CU.grade}% copper (illustrative). Calculate the copper obtained from ${CU60} t of ore, and use your answer to explain why India imports much of its copper. [3]`,
  model: `(a) Electrical wires and cables; motors, transformers and electronics (also utensils, coins).\n\n(b) Brass is an alloy of copper and zinc; bronze is an alloy of copper and tin.\n\n(c) Madhya Pradesh — Malanjkhand (Balaghat); Rajasthan — Khetri–Singhana (Jhunjhunu). Jharkhand — the Singhbhum belt (Ghatsila, Mosabani).\n\n(d) Copper $= \\frac{${CU.grade}}{100} \\times ${CU60} = ${cu60}$ t. Almost all of the rock is waste, so production is costly; India’s reserves are small and of low grade, while demand for wiring, power equipment and electronics keeps rising, so the shortfall is met by imports.`,
  sol: `Uses; alloys; areas; ${cu60} t and imports.`,
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 3, c: 'application', t: [3],
}), () => cu60 === 720 || `cu60 ${cu60}`);
const AL40 = 40000;
add('long-bx', long({
  stem: `(a) State two uses of aluminium. [2]\n\n(b) Name the two leading bauxite-producing states and one mining area in each. [2]\n\n(c) Describe the stages by which bauxite is turned into aluminium, naming one place in Odisha for each stage. [3]\n\n(d) Using the rounded illustrative ratio ${ALU.bauxite} : ${ALU.alumina} : ${ALU.aluminium} (bauxite : alumina : aluminium), calculate the alumina and bauxite needed by a smelter making ${AL40} t of aluminium, and state why the smelter needs cheap power. [3]`,
  model: `(a) Aircraft and vehicle bodies; overhead electric cables (also utensils, foil and cans, window frames).\n\n(b) Odisha — Koraput (Panchpatmali) or Kalahandi; Gujarat — Jamnagar, Kutch or Bhavnagar.\n\n(c) Bauxite is mined (Panchpatmali, Koraput); it is refined into alumina at a refinery (Damanjodi); alumina is smelted by electrolysis into aluminium at a smelter (Angul or Hirakud).\n\n(d) Alumina $= ${AL40} \\times ${ALU.alumina} = ${aluminaFor(AL40)}$ t; bauxite $= ${AL40} \\times ${ALU.bauxite} = ${bauxiteFor(AL40)}$ t. Smelting alumina into aluminium uses very large amounts of electricity, so cheap power keeps costs down.`,
  sol: `Uses; states; stages; ${aluminaFor(AL40)} t alumina, ${bauxiteFor(AL40)} t bauxite.`,
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 3, c: 'application', t: [4],
}), () => (aluminaFor(AL40) === 80000 && bauxiteFor(AL40) === 200000) || 'alu');
const cd = mineShare('Mine C') + mineShare('Mine D');
add('long-mix', long({
  stem: `(a) Classify iron ore, manganese, copper and bauxite as ferrous or non-ferrous minerals. [2]\n\n(b) Name the mineral mined at each of: Malanjkhand, Koraput, Noamundi and Balaghat–Chhindwara. [2]\n\n(c) An imagined company’s four bauxite mines produce (lakh tonnes a year, illustrative): ${minesText}. Calculate the share of Mine A and the combined share of Mines C and D in the total output. [3]\n\n(d) Explain three reasons why Odisha has become a major centre of mineral-based industries such as steel and aluminium. [3]`,
  model: `(a) Ferrous: iron ore and manganese. Non-ferrous: copper and bauxite.\n\n(b) Malanjkhand — copper; Koraput — bauxite; Noamundi — iron ore; Balaghat–Chhindwara — manganese.\n\n(c) Total $= ${MINES.map((m) => m.out).join(' + ')} = ${minesTotal}$ lakh tonnes. Mine A $= \\frac{${MINES[0].out}}{${minesTotal}} \\times 100 = ${shA}$%; Mines C and D $= \\frac{${MINES[2].out} + ${MINES[3].out}}{${minesTotal}} \\times 100 = ${cd}$%.\n\n(d) Odisha has rich deposits of iron ore (Keonjhar, Sundargarh), manganese and bauxite (Koraput) close together; coal from its own Talcher and Ib valley fields and from Jharkhand provides power and coke; hydel and thermal power (Hirakud, Angul), railways and the port of Paradip support heavy industry and exports.`,
  sol: `Ferrous and non-ferrous; four areas; ${shA}% and ${cd}%; reasons for Odisha.`,
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 3, c: 'analysis', t: [1, 2, 3, 4],
}), () => cd === 20 || `cd ${cd}`);
