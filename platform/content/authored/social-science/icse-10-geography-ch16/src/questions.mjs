// ICSE 10 Geography ch16 Mineral-based Industries: Iron and Steel, Petrochemicals and Electronics — question bank (ICSE 2027
// specimen style). Data items use the ILLUSTRATIVE raw-material, tonne-km and petrochemical figures exported by svgs.mjs, and
// every computed answer is asserted. MCQ keys are placed by the builder.
import { mk, add } from './lib.mjs';
import { RAW, rawTotal, need, ITEMS, SITES, tkm, tkmTotal, PETRO, petroTotal, petroShare } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const r1 = (x) => Math.round(x * 10) / 10;
const rawText = RAW.map((r) => `${r.k.toLowerCase()} ${r.t} t`).join(', ');
const kmText = (id) => ITEMS.map((i) => `${i.toLowerCase()} ${SITES[id].km[i]} km`).join(', ');
const petroText = PETRO.map((p) => `${p.k.toLowerCase()} ${p.kt}`).join(', ');

// ---------------------------------------------------------------- t01 raw materials and location
add('raw-chk', mcq({
  stem: 'In the blast furnaces at Rourkela, limestone is charged along with iron ore and coke mainly to:',
  right: 'combine with impurities and remove them as slag',
  wrong: ['supply the iron in the steel', 'act as the main fuel', 'harden the finished steel'],
  sol: 'Limestone is the flux — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('coke-mcq', mcq({
  stem: 'Coking coal is essential to a blast furnace because the coke made from it:',
  right: 'burns to give intense heat and removes oxygen from the iron ore',
  wrong: ['supplies most of the iron', 'is used to cool the furnace', 'is added to make the steel rust-proof'],
  sol: 'Coke is both fuel and reducing agent — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('mn-mcq', mcq({
  stem: 'Small amounts of manganese ore are added during steel making mainly to:',
  right: 'harden the steel',
  wrong: ['make the steel lighter than aluminium', 'replace iron ore', 'colour the steel red'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('loc-chk', mcq({
  stem: 'A company plans an integrated steel plant that will depend mainly on coking coal imported from Australia and will export much of its steel. The best site is:',
  right: 'beside a deep-water port on the east coast',
  wrong: ['in the Thar desert', 'at a hill station in the Himalayas', 'in the middle of the Ganga plain, far from any port'],
  sol: 'Imported coal and exports favour a port — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('weight-mcq', mcq({
  stem: `Illustrative inputs per tonne of steel are: ${rawText}. Which conclusion about location follows best?`,
  right: `About ${rawTotal} t of inputs are moved for every tonne of steel, so carrying inputs costs more than carrying steel and plants go near raw materials`,
  wrong: ['Steel weighs more than its inputs, so plants go near markets', 'Inputs are so light that location does not matter', 'Only manganese decides the location of a steel plant'],
  sol: `Total inputs $= ${RAW.map((r) => r.t).join(' + ')} = ${rawTotal}$ t per tonne of steel — option (@K).`,
  d: 3, c: 'analysis', t: [1],
}), () => rawTotal === 2.72 || `raw ${rawTotal}`);
add('between-mcq', mcq({
  stem: 'Jamshedpur lies between the Jharia coalfield and the iron-ore mines of Singhbhum and northern Odisha. This position is an advantage because:',
  right: 'goods wagons can carry coal one way and iron ore the other, cutting transport costs',
  wrong: ['the plant needs no coal at all', 'iron ore can be floated down the rivers to the sea', 'it is far from all raw materials, so land is cheap'],
  sol: 'Two-way traffic uses wagons in both directions — option (@K).',
  d: 3, c: 'analysis', t: [1, 2],
}));
add('slag-mcq', mcq({
  stem: 'A steel plant sells the slag from its blast furnaces to a nearby factory that grinds it as a raw material. The factory most likely makes:',
  right: 'cement',
  wrong: ['sugar', 'cotton cloth', 'silk yarn'],
  sol: 'Slag is used in making cement — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('ar-loc', ar({
  a: 'Integrated steel plants are usually located close to their raw materials or at ports.',
  r: 'The raw materials of steel are heavy and lose much of their weight during smelting.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('ar-water', ar({
  a: 'An integrated steel plant needs very little water.',
  r: 'Large amounts of water are used to cool furnaces, coke and hot steel.',
  key: 'd',
  sol: 'A is false: steel plants need huge amounts of water; R is true — option (d).',
  d: 2, c: 'understanding', t: [1],
}));
add('tf-flux', tf({
  stem: 'Limestone acts as a flux in the blast furnace.',
  key: 't',
  sol: 'True: it combines with impurities to form slag.',
  d: 1, c: 'recall', t: [1],
}));
add('fill-coke', fill({
  stem: 'Coking coal is heated in ovens without air to make ___, the fuel of the blast furnace.',
  acc: [['coke']],
  sol: '**Coke**.',
  d: 1, c: 'recall', t: [1],
}));
add('raw-short2', short({
  marks: 2,
  stem: 'Name four raw materials of an integrated steel plant.',
  model: 'Iron ore, coking coal, limestone (or dolomite) and manganese ore (also refractory clay, water).',
  sol: 'Iron ore, coking coal, limestone, manganese.',
  scheme: [['Two raw materials', 1], ['Two more', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('loc-short3', short({
  marks: 3,
  stem: 'Explain, with an Indian example of each, why an integrated steel plant may be located (a) between coal and iron-ore fields, (b) on an iron-ore field, and (c) at a port.',
  model: '(a) Wagons can carry coal one way and ore the other, cutting the cost of assembling raw materials — Jamshedpur between Jharia and the Singhbhum–Odisha ore. (b) Iron ore is the heaviest input, so building on the ore field avoids carrying it — Rourkela on the Sundargarh ore and flux. (c) A port allows imported coking coal to be landed cheaply and steel to be exported — Visakhapatnam.',
  sol: 'Two-way traffic; heaviest input; imports and exports.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [1, 2],
}));
const S2 = 2;
const ore2 = need('Iron ore', S2);
add('raw-num', num({
  stem: `Using the illustrative figure of ${RAW[0].t} t of iron ore per tonne of steel, how many million tonnes of iron ore does a plant making ${S2} million tonnes of steel a year need?`,
  value: ore2, tol: 0, unit: 'million t',
  sol: `Iron ore $= ${RAW[0].t} \\times ${S2} = ${ore2}$ million t.`,
  scheme: [[`${ore2} million t`, 1]],
  d: 2, c: 'application', t: [1],
}), () => ore2 === 3.2 || `ore ${ore2}`);
const S45 = 4.5;
const coal45 = need('Coking coal', S45);
add('coal-num', num({
  stem: `Using the illustrative figure of ${RAW[1].t} t of coking coal per tonne of steel, how many million tonnes of coking coal does a plant making ${S45} million tonnes of steel need in a year?`,
  value: coal45, tol: 0, unit: 'million t',
  sol: `Coking coal $= ${RAW[1].t} \\times ${S45} = ${coal45}$ million t.`,
  scheme: [[`${coal45} million t`, 1]],
  d: 2, c: 'application', t: [1],
}), () => coal45 === 3.6 || `coal ${coal45}`);
const tA = tkmTotal('A');
add('tkm-num', num({
  stem: `Per tonne of steel, illustrative tonnages carried are iron ore 1.6 t, coking coal 0.8 t, limestone and dolomite 0.3 t and finished steel 1 t. At site A (beside the iron-ore field) the distances are: ${kmText('A')}. What is the total transport in tonne-kilometres per tonne of steel?`,
  value: tA, tol: 0, unit: 'tonne-km',
  sol: `Total $= ${ITEMS.map((i) => tkm('A', i)).join(' + ')} = ${tA}$ tonne-km.`,
  scheme: [[`${tA} tonne-km`, 1]],
  d: 3, c: 'application', t: [1],
}), () => tA === 1070 || `tA ${tA}`);

// ---------------------------------------------------------------- t02 the three plants
add('plant-chk', mcq({
  stem: 'Which of these steel plants is in the private sector?',
  right: 'Tata Steel, Jamshedpur',
  wrong: ['Rourkela Steel Plant', 'Visakhapatnam Steel Plant', 'Bhilai Steel Plant'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('jam-river-mcq', mcq({
  stem: 'The Tata steel works at Jamshedpur draw their water from:',
  right: 'the Subarnarekha and Kharkai rivers',
  wrong: ['the Godavari and Krishna rivers', 'the Sutlej and Beas rivers', 'the Narmada and Tapi rivers'],
  sol: 'Option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('jam-coal-mcq', mcq({
  stem: 'Tata Steel at Jamshedpur gets most of its coking coal from:',
  right: 'Jharia and West Bokaro',
  wrong: ['Neyveli', 'Bailadila', 'Digboi'],
  sol: 'Option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('rkl-german-mcq', mcq({
  stem: 'The Rourkela Steel Plant was set up in collaboration with:',
  right: 'Germany',
  wrong: ['the Soviet Union', 'Britain', 'Japan'],
  sol: 'Option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('rkl-flux-mcq', mcq({
  stem: 'Limestone and dolomite quarried at Purnapani and Birmitrapur in Sundargarh district travel a short distance by rail to be used as flux. Which steel plant do they mainly supply?',
  right: 'Rourkela',
  wrong: ['Visakhapatnam', 'Jamshedpur', 'Bokaro'],
  sol: 'Purnapani and Birmitrapur supply flux to Rourkela in the same district — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('vsp-coast-mcq', mcq({
  stem: 'The Visakhapatnam Steel Plant was built beside the sea mainly because it:',
  right: 'depends on imported coking coal and exports steel by ship',
  wrong: ['uses sea water as its iron ore', 'needs no railway links at all', 'gets its coal from offshore oil wells'],
  sol: 'A port site suits imported coal and exports — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('vsp-ore-mcq', mcq({
  stem: 'Iron ore for the Visakhapatnam Steel Plant is brought by rail mainly from:',
  right: 'Bailadila in Chhattisgarh',
  wrong: ['Jharia in Jharkhand', 'Khetri in Rajasthan', 'Digboi in Assam'],
  sol: 'Option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('compare-mcq', mcq({
  stem: 'Which statement correctly compares the Jamshedpur and Visakhapatnam steel plants?',
  right: 'Jamshedpur is a private inland plant between coal and ore; Visakhapatnam is a public sector plant at a port',
  wrong: ['Both are public sector plants built on coalfields', 'Jamshedpur is at a port; Visakhapatnam is between coal and ore', 'Both depend mainly on imported iron ore'],
  sol: 'Ownership and location type both differ — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('ar-tata', ar({
  a: 'Tata Steel at Jamshedpur was India’s first large integrated steel plant.',
  r: 'It is owned by the Steel Authority of India.',
  key: 'c',
  sol: 'A is true; R is false: Tata Steel is a private company — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('ar-vsp', ar({
  a: 'The Visakhapatnam Steel Plant is a shore-based integrated plant.',
  r: 'The Visakhapatnam Steel Plant is run by Rashtriya Ispat Nigam Limited.',
  key: 'b',
  sol: 'Both are true, but the name of the owner does not explain why the plant is on the shore (imported coal and exports do) — option (b).',
  d: 3, c: 'analysis', t: [2],
}));
add('tf-rkl', tf({
  stem: 'The Rourkela Steel Plant is located in Jharkhand.',
  key: 'f',
  sol: 'False: it is in Sundargarh district, Odisha.',
  d: 1, c: 'recall', t: [2],
}));
add('fill-sail', fill({
  stem: 'The Rourkela Steel Plant is run by the Steel ___ of India Limited, a public sector company.',
  acc: [['Authority']],
  sol: 'Steel **Authority** of India Limited.',
  d: 1, c: 'recall', t: [2],
}));
add('s1-jam', short({
  marks: 1,
  stem: 'In which state is Jamshedpur?',
  model: 'Jharkhand.',
  sol: 'Jharkhand.',
  scheme: [['Jharkhand', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('match-source', match({
  marks: 2,
  stem: 'Match each mining area in Column A with the steel-plant supply it is known for in Column B.',
  pairs: [
    ['Noamundi', 'Iron ore for Jamshedpur'],
    ['Barsua', 'Iron ore for Rourkela'],
    ['Bailadila', 'Iron ore for Visakhapatnam'],
    ['Jharia', 'Coking coal for Jamshedpur and Rourkela'],
  ],
  order: [1, 3, 2, 0],
  sol: 'Noamundi → Jamshedpur ore; Barsua → Rourkela ore; Bailadila → Visakhapatnam ore; Jharia → coking coal.',
  d: 2, c: 'application', t: [2],
}));
add('plants-short2', short({
  marks: 2,
  stem: 'State the ownership and one source of iron ore for (a) the Rourkela Steel Plant and (b) the Visakhapatnam Steel Plant.',
  model: '(a) Rourkela: public sector, Steel Authority of India; iron ore from Barsua or Kalta in Sundargarh (or Keonjhar). (b) Visakhapatnam: public sector, Rashtriya Ispat Nigam Limited; iron ore from Bailadila in Chhattisgarh.',
  sol: 'SAIL and Barsua; RINL and Bailadila.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('vsp-short2', short({
  marks: 2,
  stem: 'Give two reasons why a coastal site was chosen for the Visakhapatnam Steel Plant.',
  model: 'Much of its coking coal is imported, and a port lets the heavy coal be landed beside the plant without a long rail haul. The port also allows the plant to export steel by sea and to receive other bulk materials cheaply (sea water and nearby reservoirs supply water).',
  sol: 'Imported coal; exports.',
  scheme: [['Imported coal', 1], ['Exports or bulk transport', 1]],
  d: 2, c: 'application', t: [2],
}));
add('jam-short3', short({
  marks: 3,
  stem: 'Explain three geographical advantages that led to Jamshedpur being chosen for India’s first large integrated steel plant.',
  model: 'It lies close to rich iron ore of Noamundi and northern Odisha, and to the coking coal of Jharia and West Bokaro, so raw materials can be assembled cheaply, with two-way rail traffic. The Subarnarekha and Kharkai rivers supply plenty of water. It stands on the Kolkata–Mumbai railway, with Kolkata port and market within reach, and cheap labour was available from the surrounding region.',
  sol: 'Raw materials; water; transport, port and labour.',
  scheme: [['Raw materials', 1], ['Water', 1], ['Transport, market or labour', 1]],
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 petrochemicals
add('petro-chk', mcq({
  stem: 'Which of these is a petrochemical product?',
  right: 'Polyester yarn',
  wrong: ['Raw jute', 'Cotton lint', 'Silk cocoons'],
  sol: 'Polyester is made from oil and gas derivatives — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('feed-mcq', mcq({
  stem: 'Petrochemicals are made mainly from:',
  right: 'crude oil and natural gas',
  wrong: ['iron ore and coal', 'bauxite and limestone', 'sugarcane and cotton'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('centre-chk', mcq({
  stem: 'Which group lists only petrochemical centres in Gujarat?',
  right: 'Jamnagar, Vadodara (Koyali) and Hazira',
  wrong: ['Haldia, Panipat and Kochi', 'Rourkela, Bokaro and Bhilai', 'Noida, Pune and Gurugram'],
  sol: 'Option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('haldia-mcq', mcq({
  stem: 'The petrochemical centre of West Bengal, near the mouth of the Hugli, is:',
  right: 'Haldia',
  wrong: ['Hazira', 'Panipat', 'Mangaluru'],
  sol: 'Option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('substitute-mcq', mcq({
  stem: 'A farmer near Jalgaon replaces his old iron irrigation pipes with plastic ones. Which property of petrochemical products benefits him most?',
  right: 'They are light, cheap and do not rust',
  wrong: ['They conduct electricity well', 'They are heavier and stronger than steel', 'They dissolve in water after use'],
  sol: 'Option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('concern-mcq', mcq({
  stem: 'The drains of a town choke every monsoon with discarded plastic bags. This shows which problem of petrochemical products?',
  right: 'Most plastics are not biodegradable',
  wrong: ['Plastics are too expensive to use', 'Plastics rust quickly in water', 'Plastics cannot be made into bags'],
  sol: 'Option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('port-mcq', mcq({
  stem: 'Why are many petrochemical plants located beside coastal refineries such as those at Jamnagar and Mangaluru?',
  right: 'Feedstock from the refinery is at hand, and ports handle imported crude oil and exports of products',
  wrong: ['Petrochemicals can be made only from sea water', 'Coastal areas have the largest iron-ore deposits', 'Sea breezes are needed to dry plastics'],
  sol: 'Raw material and port advantages combine — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('ar-petro', ar({
  a: 'Petrochemical products have replaced wood, metal and natural fibres in many uses.',
  r: 'Petrochemical products are light, cheap, durable and resistant to water and rust.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('ar-polyester', ar({
  a: 'Synthetic fibres such as polyester are petrochemical products.',
  r: 'Polyester is made from cotton grown on the black soils of the Deccan.',
  key: 'c',
  sol: 'A is true; R is false: polyester is made from chemicals derived from oil and gas — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
add('tf-petro', tf({
  stem: 'Synthetic rubber used in tyres is a petrochemical product.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [3],
}));
add('fill-cracker', fill({
  stem: 'A plant that breaks down naphtha or natural gas into ethylene and propylene is called a ___.',
  acc: [['cracker', 'naphtha cracker', 'gas cracker', 'cracking unit']],
  sol: 'A **cracker**.',
  d: 1, c: 'recall', t: [3],
}));
add('petro-short2', short({
  marks: 2,
  stem: 'A family in Jaipur uses a plastic water tank, polyester clothes and a car with synthetic-rubber tyres. Choose two of these petrochemical products and state the property that makes each useful.',
  model: 'Plastic water tank — light, cheap, does not rust and resists water. Polyester clothes — strong, wrinkle-resistant and quick-drying (synthetic-rubber tyres — tough, elastic and long-lasting).',
  sol: 'Two products with properties.',
  scheme: [['Product 1 with property', 1], ['Product 2 with property', 1]],
  d: 2, c: 'application', t: [3],
}));
add('relevance-short3', short({
  marks: 3,
  stem: 'Explain the importance of petrochemicals in (a) agriculture and (b) health care, and (c) state one environmental concern they raise.',
  model: '(a) Plastic pipes, drip lines and mulch sheets save water and labour, and petrochemicals are raw materials for fertilisers and pesticides. (b) Disposable syringes, blood bags, tubes and medicine packaging are made of plastics, which are cheap, light and hygienic. (c) Most plastics are not biodegradable, so discarded bags and bottles choke drains and pollute land, rivers and seas.',
  sol: 'Agriculture; health; plastic waste.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [3],
}));
const shPl = petroShare(PETRO[0].k);
add('share-num', num({
  stem: `An imagined petrochemical complex makes (thousand tonnes a year, illustrative): ${petroText}. What percentage of its output is plastics?`,
  value: shPl, tol: 0.1, unit: '%',
  sol: `Total $= ${PETRO.map((p) => p.kt).join(' + ')} = ${petroTotal}$; share $= \\frac{${PETRO[0].kt}}{${petroTotal}} \\times 100 = ${shPl}$, so ${shPl}%.`,
  scheme: [['Total', 0.5], [`${shPl}%`, 0.5]],
  d: 2, c: 'application', t: [3],
}), () => (petroTotal === 1200 && shPl === 50) || `share ${shPl}`);
const ADD = 80;
const newRub = r1(((PETRO[2].kt + ADD) / (petroTotal + ADD)) * 100);
add('rubber-num', num({
  stem: `In the same illustrative complex, synthetic-rubber output (${PETRO[2].kt} thousand t) rises by ${ADD} thousand t while all other outputs stay the same. What is the new share of synthetic rubber in total output, to one decimal place?`,
  value: newRub, tol: 0.1, unit: '%',
  sol: `New rubber $= ${PETRO[2].kt} + ${ADD} = ${PETRO[2].kt + ADD}$; new total $= ${petroTotal} + ${ADD} = ${petroTotal + ADD}$; share $= \\frac{${PETRO[2].kt + ADD}}{${petroTotal + ADD}} \\times 100 = ${newRub}$, about ${newRub}%.`,
  scheme: [[`${newRub}%`, 1]],
  d: 3, c: 'analysis', t: [3],
}), () => newRub === 15.6 || `rub ${newRub}`);

// ---------------------------------------------------------------- t04 electronics
add('elec-chk', mcq({
  stem: 'Which city is often called the electronic capital of India?',
  right: 'Bengaluru',
  wrong: ['Jamshedpur', 'Jamnagar', 'Rourkela'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('footloose-mcq', mcq({
  stem: 'The electronics industry is described as "footloose" because:',
  right: 'it uses little bulky raw material, so it can locate wherever skilled workers and infrastructure are available',
  wrong: ['it must be built on top of iron-ore mines', 'its factories move from place to place every year', 'it needs huge quantities of coking coal'],
  sol: 'Option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('bel-mcq', mcq({
  stem: 'Public sector units such as Bharat Electronics, ITI and HAL were set up in Bengaluru decades before the boom in private electronics firms. How did they help the later boom?',
  right: 'They trained a large pool of engineers and attracted suppliers, making it easier for new firms to start',
  wrong: ['They supplied iron ore to the new firms', 'They kept all private firms out of the city', 'They turned the city’s climate dusty and hot'],
  sol: 'A skilled workforce and supplier base draw more firms — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('phone-mcq', mcq({
  stem: 'In the early 2020s, which pair of areas emerged as major mobile-phone manufacturing hubs of India?',
  right: 'Noida–Greater Noida and Chennai–Sriperumbudur',
  wrong: ['Jamnagar and Haldia', 'Rourkela and Bhilai', 'Jharia and Talcher'],
  sol: 'Option (@K).',
  d: 2, c: 'recall', t: [4],
}));
add('climate-mcq', mcq({
  stem: 'A maker of precision electronic components chooses Bengaluru over a hot, dusty town on the plains. Which factor most favours Bengaluru here?',
  right: 'Its moderate, relatively dust-free plateau climate suits delicate assembly',
  wrong: ['It has the country’s largest coalfield', 'It lies on a delta with fertile soil', 'It receives the heaviest rainfall in India'],
  sol: 'Option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('technopark-mcq', mcq({
  stem: 'Technopark, a major electronics and information technology park, is located in:',
  right: 'Thiruvananthapuram',
  wrong: ['Jamshedpur', 'Haldia', 'Rourkela'],
  sol: 'Option (@K).',
  d: 2, c: 'recall', t: [4],
}));
add('relevance-mcq', mcq({
  stem: 'Before a cyclone strikes the Odisha coast, warnings reach fishing villages through weather satellites, radar and mobile phones. This shows the importance of the electronics industry for:',
  right: 'communication and disaster management',
  wrong: ['producing coking coal', 'growing sugarcane', 'making cotton yarn'],
  sol: 'Option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('ar-elec', ar({
  a: 'Bengaluru became a leading centre of the electronics industry.',
  r: 'The city had a large pool of skilled engineers trained in public sector units and institutes such as the Indian Institute of Science.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('ar-elec2', ar({
  a: 'Electronics factories must be built next to coalfields.',
  r: 'Electronic goods are assembled from small, light components.',
  key: 'd',
  sol: 'A is false: electronics is footloose and needs skills, not coal; R is true — option (d).',
  d: 2, c: 'application', t: [4],
}));
add('tf-elec', tf({
  stem: 'Like iron and steel, the electronics industry is strongly tied to the location of its raw materials.',
  key: 'f',
  sol: 'False: electronics is footloose; it depends on skills, research and infrastructure.',
  d: 2, c: 'understanding', t: [4],
}));
add('fill-ec', fill({
  stem: 'The industrial area on the edge of Bengaluru set aside for electronics firms is called Electronics ___.',
  acc: [['City']],
  sol: 'Electronics **City**.',
  d: 1, c: 'recall', t: [4],
}));
add('s1-elec', short({
  marks: 1,
  stem: 'Name one electronics manufacturing centre in Uttar Pradesh.',
  model: 'Noida (Greater Noida is also accepted).',
  sol: 'Noida.',
  scheme: [['Noida / Greater Noida', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('elec-short2', short({
  marks: 2,
  stem: 'Give two ways in which products of the electronics industry help a cotton farmer in a village of Vidarbha today.',
  model: 'With a mobile phone he can check market prices, weather forecasts and advice from agricultural experts before sowing or selling. He can receive subsidies and payments directly in his bank account and pay or borrow through digital banking without travelling to town.',
  sol: 'Information by phone; digital banking.',
  scheme: [['First way', 1], ['Second way', 1]],
  d: 2, c: 'application', t: [4],
}));
add('blr-short3', short({
  marks: 3,
  stem: 'A company making satellite components chooses Bengaluru although land is cheaper in a small town nearby. Explain three factors that probably influenced its choice.',
  model: 'Bengaluru has a large pool of skilled engineers, trained by institutes such as the Indian Institute of Science and by public sector units like BEL, HAL and ISRO. Suppliers, research labs and partner firms are already there, especially ISRO and its contractors. Its moderate, dust-free climate suits precision work, and Electronics City, technology parks and an international airport provide the infrastructure the company needs.',
  sol: 'Skills; existing cluster; climate and infrastructure.',
  scheme: [['Skilled workforce', 1], ['Existing cluster or research', 1], ['Climate or infrastructure', 1]],
  d: 3, c: 'application', t: [4],
}));

add('tf-port', tf({
  stem: 'A steel plant that depends mainly on imported coking coal would usually save transport by being built at a port rather than on an inland iron-ore field.',
  key: 't',
  sol: 'True: the imported coal needs no long inland haul, and the steel can be exported from the same port.',
  d: 2, c: 'application', t: [1],
}));
add('match-centre', match({
  marks: 2,
  stem: 'Match each centre in Column A with the industry it is best known for in Column B.',
  pairs: [
    ['Jamnagar', 'Oil refining and petrochemicals'],
    ['Sriperumbudur', 'Mobile phones and telecom equipment'],
    ['Jamshedpur', 'Private integrated steel plant'],
    ['Visakhapatnam', 'Shore-based public sector steel plant'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Jamnagar → petrochemicals; Sriperumbudur → phones and telecom; Jamshedpur → private steel; Visakhapatnam → shore-based public steel.',
  d: 2, c: 'application', t: [2, 3, 4],
}));

// ---------------------------------------------------------------- 10-mark structured questions
const S4 = 4;
const in4 = RAW.slice(0, 3).map((r) => need(r.k, S4));
add('long-steel', long({
  stem: `(a) Name four raw materials of an integrated steel plant. [2]\n\n(b) State the role of (i) coke and (ii) limestone in the blast furnace. [2]\n\n(c) Explain why integrated steel plants are located near coal and iron-ore fields or at ports. [3]\n\n(d) Using illustrative needs per tonne of steel (${rawText}), calculate the iron ore, coking coal and limestone and dolomite needed by a plant making ${S4} million tonnes of steel a year. [3]`,
  model: `(a) Iron ore, coking coal, limestone (and dolomite), manganese (also refractory clay, water).\n\n(b) (i) Coke burns to give intense heat and removes oxygen from the ore. (ii) Limestone acts as a flux, combining with impurities to form slag.\n\n(c) The raw materials are heavy and bulky and lose much weight in smelting, so moving them costs more than moving steel; plants are built near coal, near ore or between them, and plants that import coking coal or export steel are built at ports.\n\n(d) Iron ore $= ${RAW[0].t} \\times ${S4} = ${in4[0]}$ million t; coking coal $= ${RAW[1].t} \\times ${S4} = ${in4[1]}$ million t; limestone and dolomite $= ${RAW[2].t} \\times ${S4} = ${in4[2]}$ million t.`,
  sol: `Raw materials; roles; location; ${in4.join(', ')} million t.`,
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 3, c: 'application', t: [1],
}), () => (in4[0] === 6.4 && in4[1] === 3.2 && in4[2] === 1.2) || 'in4');
add('long-plants', long({
  stem: '(a) State the location (state) and ownership of the Tata Steel, Rourkela and Visakhapatnam steel plants. [2]\n\n(b) Name the sources of iron ore and coking coal for Tata Steel, Jamshedpur. [2]\n\n(c) Describe the sources of raw materials, water and power of the Rourkela Steel Plant. [3]\n\n(d) Explain why the Visakhapatnam Steel Plant is described as a shore-based plant and how its location helps it. [3]',
  model: '(a) Tata Steel — Jharkhand, private sector; Rourkela — Odisha, public sector (SAIL); Visakhapatnam — Andhra Pradesh, public sector (RINL).\n\n(b) Iron ore from Noamundi (Jharkhand) and Joda (Odisha); coking coal from Jharia and West Bokaro.\n\n(c) Iron ore from Barsua and Kalta in Sundargarh and from Keonjhar; limestone and dolomite from Purnapani and Birmitrapur; coal from Jharia and Talcher; water from the Brahmani system (Mandira dam); power from Hirakud.\n\n(d) It was India’s first integrated steel plant built on the coast, beside Visakhapatnam port. The port lets it import coking coal by sea and export steel, while iron ore comes by rail from Bailadila; nearby reservoirs supply water.',
  sol: 'States and owners; Jamshedpur sources; Rourkela inputs; Visakhapatnam port advantages.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 2, c: 'understanding', t: [2],
}));
const tB = tkmTotal('B');
add('long-tkm', long({
  stem: `Per tonne of steel, illustrative tonnages carried are iron ore 1.6 t, coking coal 0.8 t, limestone and dolomite 0.3 t and finished steel 1 t. Site A lies beside an iron-ore field (${kmText('A')}). Site B lies in a large market city (${kmText('B')}).\n\n(a) Calculate the total tonne-kilometres per tonne of steel at site A. [2]\n\n(b) Calculate the same for site B. [2]\n\n(c) Which site should be chosen? Explain your answer using the idea of weight loss. [3]\n\n(d) Visakhapatnam was built at a port rather than beside an ore field. Using this method, explain what change in the inputs makes a port site the cheaper choice. [3]`,
  model: `(a) A $= ${ITEMS.map((i) => tkm('A', i)).join(' + ')} = ${tA}$ tonne-km.\n\n(b) B $= ${ITEMS.map((i) => tkm('B', i)).join(' + ')} = ${tB}$ tonne-km.\n\n(c) Site A, which needs about half the transport. About ${rawTotal} t of inputs are needed for each tonne of steel, and most of that weight is lost in the furnace, so it is cheaper to carry the single tonne of steel to the market than the heavy inputs to the city.\n\n(d) When coking coal is imported, it arrives by sea; at a port it needs no inland haul, while at an inland ore field it would have to be carried hundreds of kilometres by rail. Iron ore can come by rail (Bailadila) and steel can be exported from the same port, so the total tonne-kilometres become lowest at the port.`,
  sol: `A ${tA}; B ${tB}; choose A; imported coal favours a port.`,
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 4, c: 'analysis', t: [1, 2],
}), () => (tA === 1070 && tB === 2210) || 'tkm');
add('long-petro', long({
  stem: `(a) What are petrochemicals? [2]\n\n(b) Name four centres of the petrochemical industry in India. [2]\n\n(c) Explain three reasons why petrochemicals are important in modern life. [3]\n\n(d) An imagined complex makes (thousand tonnes a year, illustrative): ${petroText}. Calculate the share of synthetic fibres and of other chemicals, and state one environmental concern of the industry. [3]`,
  model: `(a) Chemicals and products made from crude oil and natural gas, such as plastics, synthetic fibres, synthetic rubber and detergents.\n\n(b) Jamnagar, Vadodara (Koyali), Hazira (Gujarat); Mumbai (Trombay) (also Haldia, Panipat, Mangaluru, Chennai, Kochi, Bongaigaon).\n\n(c) They give cheap, light, durable substitutes for wood, metal, glass and natural fibres; they are vital to farming (pipes, drip lines, fertilisers) and health care (syringes, blood bags); they supply clothing, tyres, paints and packaging, and create jobs and exports.\n\n(d) Synthetic fibres $= \\frac{${PETRO[1].kt}}{${petroTotal}} \\times 100 = ${petroShare(PETRO[1].k)}$%; other chemicals $= \\frac{${PETRO[3].kt}}{${petroTotal}} \\times 100 = ${petroShare(PETRO[3].k)}$%. Concern: most plastics are not biodegradable and pollute land, rivers and seas.`,
  sol: `Definition; centres; importance; ${petroShare(PETRO[1].k)}% and ${petroShare(PETRO[3].k)}%; plastic waste.`,
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 3, c: 'application', t: [3],
}), () => (petroShare(PETRO[1].k) === 20 && petroShare(PETRO[3].k) === 20) || 'petro');
add('long-elec', long({
  stem: '(a) Name four products of the electronics industry. [2]\n\n(b) Name four centres of the electronics industry in India. [2]\n\n(c) Explain three factors that have made Bengaluru the electronic capital of India. [3]\n\n(d) Compare the factors that decide the location of an electronics factory with those that decide the location of an integrated steel plant. [3]',
  model: '(a) Mobile phones, computers, televisions, telecom equipment (also medical equipment, satellites, defence electronics).\n\n(b) Bengaluru, Hyderabad, Chennai (Sriperumbudur), Noida (also Pune, Mumbai, Gurugram, Kolkata, Thiruvananthapuram).\n\n(c) Public sector units such as BEL, ITI, HAL and ISRO built up a pool of trained engineers and suppliers; institutes such as the Indian Institute of Science and many engineering colleges supply skilled graduates; a moderate, dust-free climate, Electronics City, technology parks, an international airport and state support attracted private firms.\n\n(d) An electronics factory uses small, light components, so it is footloose and locates near skilled labour, research, markets and good infrastructure. A steel plant uses heavy, bulky raw materials that lose weight in smelting, so it is tied to coalfields, iron-ore fields or ports, and also needs huge amounts of water.',
  sol: 'Products; centres; Bengaluru factors; footloose versus raw-material-oriented.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 3, c: 'analysis', t: [4, 1],
}));
