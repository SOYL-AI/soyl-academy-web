// ICSE 10 Geography ch16 Mineral-based Industries: Iron and Steel, Petrochemicals and Electronics — two decks: Part 1 (t01–t02)
// integrated iron and steel plants, Tata Steel, Rourkela and Visakhapatnam; Part 2 (t03–t04) petrochemicals and electronics.
// ILLUSTRATIVE raw-material, transport and petrochemical figures are computed in svgs.mjs.
import { sl, deck, table, flow, svgV } from './lib.mjs';
import { STEEL_FLOW, TKM_CHART, PETRO_TREE, RAW, rawTotal, need, ITEMS, tkm, tkmTotal, PETRO, petroTotal, petroShare } from './svgs.mjs';

const V = {
  steel: svgV(STEEL_FLOW, 'Integrated steel plant flow from raw materials through coke ovens and blast furnace to steel'),
  tkm: svgV(TKM_CHART, 'Stacked bars comparing transport needed per tonne of steel at an ore-field site and a market site'),
  petro: svgV(PETRO_TREE, 'Tree from crude oil and natural gas through a cracker to plastics, fibres, rubber and other chemicals'),
};
const CAP = 3; // million tonnes of steel a year (illustrative plant)

export const deck1 = deck({
  part: 1,
  title: 'Mineral-based Industries — Part 1: Iron and steel',
  goals: [
    'List the raw materials of the iron and steel industry',
    'Explain why iron and steel plants are located near coal and iron-ore fields or ports',
    'State the location, ownership and sources of raw materials of Tata Steel, Rourkela and Visakhapatnam',
  ],
  slides: [
    sl('title', 'The industry behind all industries', {
      b: 'Part 1 — rails, bridges, tractors, ships and cooking pots all need **steel**. An **integrated steel plant** handles everything from raw materials to finished steel at one site. We study what it needs, where it is built, and three famous plants.',
      v: table(['Plant', 'State', 'Ownership'], [['Tata Steel, Jamshedpur', 'Jharkhand', 'Private'], ['Rourkela Steel Plant', 'Odisha', 'Public (SAIL)'], ['Visakhapatnam Steel Plant', 'Andhra Pradesh', 'Public (RINL)']], 'Table of three steel plants with their states and ownership'),
      n: 'Namaste! Rails, bridges, tractors, ships and the pots in our kitchens all need steel, so the steel industry supports almost every other industry. An integrated steel plant does everything at one site, from turning coal into coke to rolling finished steel. In this part we learn what raw materials it needs, why it is built where it is, and the story of three famous plants.',
    }),
    sl('concept', 'Raw materials of the iron and steel industry', {
      b: `An integrated plant needs **iron ore** (mainly hematite), **coking coal** (turned into coke, which is both fuel and the agent that removes oxygen from the ore), **limestone and dolomite** (a **flux** that removes impurities as slag), **manganese** (to harden steel), **refractory materials** such as fire clay for lining furnaces, huge amounts of **water** for cooling, and **power**. Illustrative quantities per tonne of steel: ${RAW.map((r) => `${r.k.toLowerCase()} ${r.t} t`).join(', ')} — about ${rawTotal} t of solids for one tonne of steel.`,
      v: table(['Raw material', 'Role', 'Illustrative tonnes per tonne of steel'], RAW.map((r) => [r.k, { 'Iron ore': 'Source of iron', 'Coking coal': 'Fuel; removes oxygen from ore', 'Limestone and dolomite': 'Flux: removes impurities', 'Manganese ore': 'Hardens steel' }[r.k], String(r.t)]), 'Table of raw materials of steel with their role and illustrative quantities'),
      n: 'A steel plant needs several raw materials. Iron ore supplies the iron. Coking coal is turned into coke, which burns to melt the ore and also pulls oxygen out of it. Limestone and dolomite act as a flux, carrying away impurities as slag. Manganese hardens the steel. Fire clay lines the furnaces, and the plant also needs plenty of water and power. Altogether, nearly three tonnes of material make one tonne of steel.',
    }),
    sl('diagram', 'Inside an integrated steel plant', {
      b: '**Coke ovens** bake coking coal into coke. In the **blast furnace**, iron ore, coke and limestone are charged from the top and hot air is blown in from below; the coke burns and reduces the ore to molten **hot metal** (pig iron), and the limestone combines with impurities as **slag** (sold to cement plants). In the **steel melting shop** the carbon content is lowered and alloys added to make **steel**, which is cast and shaped in **rolling mills** into plates, sheets, rails and bars.',
      v: V.steel,
      n: 'Inside the plant, coal is first baked into coke. Iron ore, coke and limestone are fed into the top of the blast furnace while hot air is blown in from below. The coke burns, the ore melts into hot metal, and the limestone carries off impurities as slag, which can go to cement factories. The hot metal is refined into steel and then rolled into plates, sheets, rails and bars.',
    }),
    sl('check', 'Quick check: raw materials', {
      b: 'Name a raw material of steel and its role.',
      n: 'Quick check. Coke melts and reduces the ore; limestone removes impurities.',
      chk: 'raw-chk',
    }),
    sl('concept', 'Where steel plants are built', {
      b: 'Because the raw materials are **heavy and bulky** and lose much weight in processing, steel plants are built where the **cost of assembling raw materials** is lowest: **(1) near coalfields** (the Damodar valley); **(2) near iron-ore fields** (Odisha, Chhattisgarh); **(3) between the two**, so that trains carry ore one way and coal the other (Jamshedpur); or **(4) at ports**, where **imported coking coal** can be landed and steel exported (Visakhapatnam). Every plant also needs **water**, **railways**, cheap **labour** and a **market**.',
      v: flow('LR', [['a', 'Heavy, bulky raw materials'], ['b', 'Large weight loss in smelting'], ['c', 'Minimise transport of inputs'], ['d', 'Near coal, near ore, between them, or at a port']], [['a', 'c'], ['b', 'c'], ['c', 'd']], 'Flow explaining why steel plants are located near raw materials or ports'),
      n: 'Steel plants use huge amounts of heavy raw material, and much of that weight is lost in the furnace. So they are built where raw materials can be gathered most cheaply: beside coalfields, beside iron ore mines, at a point between the two, or at a port where imported coking coal can be landed and steel shipped out. Every plant also needs water, railways, workers and buyers.',
    }),
    sl('example', 'Worked example: weighing transport costs', {
      b: `**Problem.** Compare the transport needed per tonne of steel at two illustrative sites, measured in tonne-kilometres (tonnes × kilometres).\n\n**Site A (beside the ore field):** ${ITEMS.map((i) => `${i.toLowerCase()} ${tkm('A', i)}`).join(' + ')} = **${tkmTotal('A')}**.\n\n**Site B (in the market city):** ${ITEMS.map((i) => `${i.toLowerCase()} ${tkm('B', i)}`).join(' + ')} = **${tkmTotal('B')}**.\n\n**Conclusion.** Carrying ${rawTotal} t of raw material is costlier than carrying 1 t of steel, so site A, near the raw materials, needs about half the transport.`,
      v: V.tkm,
      n: 'Let us compare two imagined sites. At site A, beside the iron ore field, we carry coal and limestone in and steel out, about one thousand and seventy tonne kilometres for each tonne of steel. At site B, in the market city, all the heavy raw materials must travel far, more than two thousand two hundred tonne kilometres. The plant near the raw materials needs about half the transport.',
    }),
    sl('check', 'Quick check: location', {
      b: 'Explain a location choice for a steel plant.',
      n: 'Quick check. Heavy raw materials pull plants towards coal, ore, or ports for imported coal.',
      chk: 'loc-chk',
    }),
    sl('concept', 'Tata Steel, Jamshedpur', {
      b: '**Location:** Jamshedpur in Jharkhand, at the meeting of the **Subarnarekha** and **Kharkai** rivers. **Ownership:** **private sector** (Tata Steel); founded in **1907**, India’s first large integrated steel plant. **Raw materials:** **iron ore** from Noamundi (Jharkhand) and Joda (Odisha); **coking coal** from **Jharia** and West Bokaro; **manganese** from Joda; **limestone and dolomite** from Odisha and Chhattisgarh. **Other advantages:** water from the two rivers; the Kolkata–Mumbai railway; **Kolkata port** about 250 km away; cheap labour from the region.',
      v: table(['Head', 'Tata Steel, Jamshedpur'], [['State', 'Jharkhand'], ['Ownership', 'Private (Tata Steel), founded 1907'], ['Iron ore', 'Noamundi, Joda'], ['Coal', 'Jharia, West Bokaro'], ['Water', 'Subarnarekha and Kharkai rivers'], ['Port', 'Kolkata']], 'Table of the location, ownership and raw materials of Tata Steel, Jamshedpur'),
      n: 'Tata Steel at Jamshedpur in Jharkhand, founded in nineteen hundred and seven, was India’s first large integrated steel plant, and it is in the private sector. It gets iron ore from Noamundi and Joda, coking coal from Jharia and West Bokaro, and manganese from Joda. Water comes from the Subarnarekha and Kharkai rivers, the main railway line passes nearby, and Kolkata port is not far away.',
    }),
    sl('concept', 'Rourkela Steel Plant', {
      b: '**Location:** Rourkela in **Sundargarh district, Odisha**, near the meeting of the Sankh and South Koel rivers that form the Brahmani. **Ownership:** **public sector** — the Steel Authority of India (SAIL); set up with **German** collaboration and commissioned in **1959**, the first integrated plant in the public sector. **Raw materials:** **iron ore** from Barsua and Kalta (Sundargarh) and Keonjhar; **coal** from Jharia and Talcher; **limestone and dolomite** from Purnapani and Birmitrapur (Sundargarh); **manganese** from Keonjhar. **Water** from the Brahmani system (Mandira dam); **power** from Hirakud.',
      v: table(['Head', 'Rourkela'], [['State', 'Odisha (Sundargarh)'], ['Ownership', 'Public (SAIL); German collaboration; 1959'], ['Iron ore', 'Barsua, Kalta, Keonjhar'], ['Coal', 'Jharia, Talcher'], ['Limestone, dolomite', 'Purnapani, Birmitrapur'], ['Water and power', 'Brahmani (Mandira dam); Hirakud']], 'Table of the location, ownership and raw materials of the Rourkela Steel Plant'),
      n: 'Rourkela Steel Plant stands in Sundargarh district of Odisha, near where two rivers meet to form the Brahmani. It belongs to the Steel Authority of India and was built with German help, starting work in nineteen fifty nine. Its iron ore, limestone and dolomite come from mines in Sundargarh and Keonjhar, its coal from Jharia and Talcher, its water from the Mandira dam, and its power from Hirakud.',
    }),
    sl('concept', 'Visakhapatnam Steel Plant', {
      b: '**Location:** Visakhapatnam on the coast of **Andhra Pradesh**. **Ownership:** **public sector** — Rashtriya Ispat Nigam Limited (RINL) **(as of the early 2020s)**; commissioned in the early 1990s as India’s **first shore-based integrated steel plant**. **Raw materials:** **iron ore** from **Bailadila** (Chhattisgarh) by rail; **coking coal** largely **imported** (for example from Australia) through Visakhapatnam port, with some from Indian coalfields; **limestone and dolomite** from Andhra Pradesh and Telangana. **Advantages of the coastal site:** a deep-water **port** for imports and **exports** of steel, and water from nearby reservoirs.',
      v: table(['Head', 'Visakhapatnam'], [['State', 'Andhra Pradesh (coast)'], ['Ownership', 'Public (RINL), as of the early 2020s'], ['Iron ore', 'Bailadila (Chhattisgarh)'], ['Coking coal', 'Mostly imported via the port'], ['Special feature', 'First shore-based integrated plant']], 'Table of the location, ownership and raw materials of the Visakhapatnam Steel Plant'),
      n: 'The Visakhapatnam Steel Plant on the Andhra Pradesh coast was India’s first integrated steel plant built at a port. It is run by Rashtriya Ispat Nigam, a public sector company. Its iron ore comes by rail from Bailadila, but much of its coking coal is imported by sea and landed at the port next door, which also lets the plant export its steel.',
    }),
    sl('example', 'Worked example: comparing the three plants', {
      b: `**Problem.** Contrast the location logic of the three plants and estimate a plant’s raw-material needs.\n\n**Jamshedpur:** between the ore of Singhbhum–Odisha and the coal of Jharia — trains can carry ore and coal both ways.\n\n**Rourkela:** on the iron-ore, limestone and dolomite fields of Sundargarh, with coal brought from Jharia and Talcher.\n\n**Visakhapatnam:** at a port, because it depends on imported coking coal and exports steel.\n\n**Needs.** For an illustrative plant making ${CAP} million t of steel a year: iron ore $= ${RAW[0].t} \\times ${CAP} = ${need('Iron ore', CAP)}$ million t; coking coal $= ${RAW[1].t} \\times ${CAP} = ${need('Coking coal', CAP)}$ million t.`,
      v: table(['Plant', 'Location type', 'Key reason'], [['Jamshedpur', 'Between coal and ore', 'Two-way rail traffic'], ['Rourkela', 'On the ore field', 'Ore, limestone, dolomite at hand'], ['Visakhapatnam', 'At a port', 'Imported coking coal, exports']], 'Table contrasting the location types of the three steel plants'),
      n: 'Each plant follows a different logic. Jamshedpur lies between the iron ore fields and the Jharia coalfield, so trains carry ore one way and coal the other. Rourkela sits on its own ore, limestone and dolomite. Visakhapatnam is at a port because it imports coking coal and exports steel. A plant making three million tonnes of steel needs nearly five million tonnes of ore every year.',
    }),
    sl('check', 'Quick check: the three plants', {
      b: 'Match a plant with its state, ownership or raw-material source.',
      n: 'Quick check. Jamshedpur is private; Rourkela and Visakhapatnam are public sector plants.',
      chk: 'plant-chk',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Raw materials: iron ore, coking coal, limestone and dolomite, manganese, refractories, water, power; nearly three tonnes of solids per tonne of steel (illustrative).',
        'Location: near coal, near ore, between them, or at ports for imported coal and exports.',
        'Tata Steel, Jamshedpur (Jharkhand): private, 1907; ore Noamundi and Joda; coal Jharia; Subarnarekha and Kharkai rivers.',
        'Rourkela (Odisha): public (SAIL), German help, 1959; Sundargarh ore and flux; coal Jharia and Talcher; Hirakud power.',
        'Visakhapatnam (Andhra Pradesh): public (RINL); first shore-based plant; Bailadila ore; imported coking coal.',
      ],
      v: table(['Plant', 'One-line reason for its site'], [['Jamshedpur', 'Between coal and ore'], ['Rourkela', 'On the ore and flux fields'], ['Visakhapatnam', 'Port for imported coal']], 'Summary table of the location reason of each plant'),
      n: 'Let us sum up Part 1. A steel plant needs iron ore, coking coal, limestone, dolomite, manganese, water and power, nearly three tonnes of material for every tonne of steel. So plants are built near coal, near ore, between them or at ports. Jamshedpur is private and lies between coal and ore, Rourkela is a public plant on its ore field, and Visakhapatnam is a public plant at a port.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'For each plant learn four heads: state, ownership, raw materials with sources, special advantage.',
        'Say why coke is needed: fuel and reducing agent.',
        'Explain location with weight: heavy inputs, weight loss, transport cost.',
        'Mark ownership and figures that may change "as of the early 2020s".',
      ],
      v: table(['Slip', 'Fix'], [['Tata Steel is public sector', 'It is private'], ['Visakhapatnam gets coal from Jharia only', 'Mostly imported coking coal'], ['Limestone is the fuel', 'Limestone is the flux']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some tips. For each plant, learn its state, its owner, where its raw materials come from and its special advantage. Explain that coke is both a fuel and the agent that removes oxygen from the ore. Explain location in terms of weight and transport cost. And be careful with facts such as ownership that can change over time.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Mineral-based Industries — Part 2: Petrochemicals and electronics',
  goals: [
    'Name petrochemical products and key centres of the industry',
    'Explain the importance of petrochemicals in modern life',
    'Name key electronics centres such as Bengaluru and explain the factors behind their growth',
  ],
  slides: [
    sl('title', 'From oil wells to mobile phones', {
      b: 'Part 2 — the plastic bucket, the polyester shirt, the tyre on a bus, and the mobile phone in your pocket are products of two modern industries: **petrochemicals** and **electronics**.',
      v: table(['Industry', 'Raw material or input', 'Typical products'], [['Petrochemicals', 'Crude oil, natural gas', 'Plastics, synthetic fibres, rubber, detergents'], ['Electronics', 'Components, skilled engineers', 'Phones, computers, TVs, telecom and defence equipment']], 'Table of the petrochemical and electronics industries with inputs and products'),
      n: 'Look around. The plastic bucket, the polyester shirt, the rubber tyre and the mobile phone are all products of two modern industries. Petrochemicals are made from crude oil and natural gas. Electronics depend on components and, above all, on skilled engineers. In this part we look at what these industries make, where they are, and why they matter so much today.',
    }),
    sl('concept', 'What petrochemicals are', {
      b: '**Petrochemicals** are chemicals made from **crude oil** and **natural gas**. At a **refinery and cracker**, oil fractions such as naphtha, or natural gas, are broken down into basic building blocks such as **ethylene, propylene and benzene**. These are joined into long chains (**polymers**) and other compounds to make **plastics** (polyethylene, PVC), **synthetic fibres** (polyester, nylon, acrylic), **synthetic rubber**, **detergents**, **paints**, **solvents**, dyes, and raw materials for **fertilisers** and **medicines**.',
      v: flow('LR', [['a', 'Crude oil, natural gas'], ['b', 'Refinery and cracker'], ['c', 'Ethylene, propylene, benzene'], ['d', 'Polymers and other compounds'], ['e', 'Plastics, fibres, rubber, detergents']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow from crude oil and natural gas to building blocks to petrochemical products'),
      n: 'Petrochemicals are chemicals made from crude oil and natural gas. In a refinery and cracker, oil or gas is broken into simple building blocks such as ethylene and propylene. These are linked into long chains called polymers to make plastics, synthetic fibres like polyester and nylon, and synthetic rubber. Other petrochemicals become detergents, paints, solvents and raw materials for medicines and fertilisers.',
    }),
    sl('diagram', 'The petrochemical tree', {
      b: `The illustrative tree shows how one imagined complex divides its ${petroTotal} thousand tonnes of yearly output: ${PETRO.map((p) => `${p.k.toLowerCase()} ${p.kt} (${petroShare(p.k)}%)`).join(', ')}. Share = output of a group ÷ total × 100. Plastics form the largest group, which is typical of the industry.`,
      v: V.petro,
      n: 'This tree shows an imagined petrochemical complex that makes twelve hundred thousand tonnes of products a year. Half of it is plastics, used for pipes, packaging and bottles. One fifth is synthetic fibre such as polyester, one tenth is synthetic rubber for tyres, and the remaining fifth is other chemicals for detergents and paints.',
    }),
    sl('check', 'Quick check: petrochemical products', {
      b: 'Identify a petrochemical product.',
      n: 'Quick check. Plastics, polyester and synthetic rubber are petrochemicals.',
      chk: 'petro-chk',
    }),
    sl('concept', 'Key petrochemical centres', {
      b: 'The industry is concentrated near **refineries, oil and gas fields, pipelines and ports**. **Gujarat** is the leading region **(as of the early 2020s)**: **Jamnagar** (one of the world’s largest refining and petrochemical complexes), **Vadodara** (Koyali), **Hazira** near Surat and **Dahej**. **Maharashtra:** **Mumbai** (Trombay) and **Thane–Belapur**. Others: **Haldia** (West Bengal), **Panipat** (Haryana), **Mangaluru** (Karnataka), **Chennai** (Manali), **Kochi** (Kerala), **Barauni** (Bihar), **Bongaigaon** (Assam) and **Paradip** (Odisha).',
      v: table(['State', 'Centres'], [['Gujarat', 'Jamnagar, Vadodara (Koyali), Hazira, Dahej'], ['Maharashtra', 'Mumbai (Trombay), Thane–Belapur'], ['West Bengal', 'Haldia'], ['Haryana', 'Panipat'], ['Karnataka, Tamil Nadu, Kerala', 'Mangaluru, Chennai (Manali), Kochi'], ['Assam, Odisha', 'Bongaigaon, Paradip']], 'Table of key petrochemical centres by state'),
      n: 'Petrochemical plants are built near refineries, oil and gas fields, pipelines and ports. Gujarat leads, with huge complexes at Jamnagar, Vadodara, Hazira and Dahej. In Maharashtra the industry is around Mumbai and Thane. Other centres include Haldia in West Bengal, Panipat in Haryana, Mangaluru, Chennai and Kochi in the south, and Bongaigaon in Assam.',
    }),
    sl('concept', 'Why petrochemicals matter', {
      b: '**Relevance:** petrochemical products are **cheap, light, strong, durable and resistant** to water and rust, so they **replace wood, metal, glass, cotton and jute** in many uses. **Agriculture:** irrigation pipes, drip lines, mulch sheets, fertilisers and pesticides. **Health:** syringes, blood bags, medicine packaging. **Daily life:** clothes, footwear, furniture, packaging, paints, detergents. **Industry:** tyres, cables, vehicle parts. The industry gives **employment** and **export** income. **Concerns:** most plastics are **not biodegradable**, so careless disposal pollutes land, rivers and seas — recycling and responsible use are essential.',
      v: table(['Field', 'Petrochemical use'], [['Agriculture', 'Drip pipes, mulch sheets, fertilisers'], ['Health', 'Syringes, blood bags'], ['Clothing', 'Polyester, nylon'], ['Transport', 'Tyres, vehicle parts'], ['Concern', 'Plastic waste is not biodegradable']], 'Table of fields where petrochemicals are used, with one concern'),
      n: 'Why do petrochemicals matter? Their products are cheap, light, strong and long lasting, so they replace wood, metal, glass and natural fibres. Farmers use plastic pipes and drip lines, hospitals use syringes and blood bags, and we wear polyester and walk on synthetic soles. But most plastics do not rot, so careless disposal pollutes land, rivers and seas. Recycling and careful use are essential.',
    }),
    sl('example', 'Worked example: why Gujarat’s coast attracts petrochemicals', {
      b: '**Problem.** Explain why the coast of Gujarat, from Jamnagar to Hazira and Dahej, has become India’s leading petrochemical region.\n\n**Step 1. Raw material.** Large refineries at Jamnagar and Koyali, and natural gas from offshore fields and import terminals, supply feedstock on the spot.\n\n**Step 2. Ports.** Deep-water ports handle imported crude oil and export finished products.\n\n**Step 3. Linked industries.** Textile mills of Surat and Ahmedabad buy synthetic fibres; plastics and chemical units cluster nearby.\n\n**Step 4. Policy and capital.** Industrial estates, special economic zones and private investment.',
      v: flow('LR', [['a', 'Refineries and gas'], ['b', 'Deep-water ports'], ['c', 'Textile and plastic users nearby'], ['d', 'Industrial estates, capital'], ['e', 'Gujarat coast petrochemical belt']], [['a', 'e'], ['b', 'e'], ['c', 'e'], ['d', 'e']], 'Flow of four factors leading to the Gujarat coast petrochemical belt'),
      n: 'Why is the Gujarat coast India’s petrochemical hub? Big refineries at Jamnagar and Koyali, and natural gas brought by sea and pipeline, supply the raw material right there. Deep water ports bring in crude oil and ship out products. The textile mills of Surat and Ahmedabad buy synthetic fibres, and industrial estates and private investment have helped many plants grow side by side.',
    }),
    sl('example', 'Worked example: reading output shares', {
      b: `**Problem.** The imagined complex makes ${petroTotal} thousand tonnes a year. (a) What share is plastics? (b) If synthetic-fibre output rises by 60 thousand tonnes while the rest stays the same, what will its new share be?\n\n**(a)** $\\frac{${PETRO[0].kt}}{${petroTotal}} \\times 100 = ${petroShare(PETRO[0].k)}$%.\n\n**(b)** New fibre output $= ${PETRO[1].kt} + 60 = ${PETRO[1].kt + 60}$; new total $= ${petroTotal} + 60 = ${petroTotal + 60}$; share $= \\frac{${PETRO[1].kt + 60}}{${petroTotal + 60}} \\times 100 = ${Math.round(((PETRO[1].kt + 60) / (petroTotal + 60)) * 1000) / 10}$%.`,
      v: table(['Group', 'Output (thousand t)', 'Share'], PETRO.map((p) => [p.k, String(p.kt), `${petroShare(p.k)}%`]), 'Table of illustrative output and shares of four petrochemical groups'),
      n: 'Plastics make six hundred of the twelve hundred thousand tonnes, so their share is fifty per cent. If fibre output grows by sixty thousand tonnes, it becomes three hundred, and the total becomes twelve hundred and sixty. Dividing three hundred by twelve hundred and sixty and multiplying by one hundred gives a new share of about twenty three point eight per cent.',
    }),
    sl('check', 'Quick check: petrochemical centres', {
      b: 'Name a petrochemical centre or explain its location.',
      n: 'Quick check. Jamnagar, Vadodara and Hazira in Gujarat are major centres.',
      chk: 'centre-chk',
    }),
    sl('concept', 'The electronics industry and its relevance', {
      b: '**Products:** mobile phones, computers, televisions, telecom equipment, medical equipment, satellites and **defence electronics**, and components such as circuit boards. **Relevance in the modern world:** it underpins **communication**, banking, education, health care, transport and governance (digital services); it is vital for **defence and space**; it is closely linked to the **information technology (IT)** and software industry; it gives jobs to many skilled young people and earns **exports**. It needs little raw material but much **skill, research and capital**, so it is a **footloose** industry that can locate near educated workers and good infrastructure.',
      v: table(['Field', 'Role of electronics'], [['Communication', 'Mobile networks, internet'], ['Defence and space', 'Radar, satellites, missiles'], ['Health', 'Scanners, monitors'], ['Economy', 'Skilled jobs, exports, digital services']], 'Table of fields where electronics matters and its role in each'),
      n: 'The electronics industry makes phones, computers, televisions, telecom and medical equipment, and the electronics used in satellites and defence. Modern life runs on it: communication, banking, schooling, health care and government services all depend on electronic devices. It needs very little raw material but a great deal of skill and research, so it grows where educated workers and good infrastructure are found.',
    }),
    sl('concept', 'Key electronics centres', {
      b: '**Bengaluru** is called the **electronic capital of India**: Electronics City, Bharat Electronics (BEL), ITI, HAL avionics, ISRO and many private firms. Other centres **(as of the early 2020s)**: **Hyderabad**, **Chennai** and nearby **Sriperumbudur** (mobile phones and telecom equipment), **Noida and Greater Noida** in Uttar Pradesh (mobile phones and consumer electronics), **Pune**, **Mumbai**, **Gurugram** and Delhi, **Kolkata** (Salt Lake), **Thiruvananthapuram** (Technopark), **Gandhinagar** and **Mohali**.',
      v: table(['Centre', 'Known for (as of the early 2020s)'], [['Bengaluru', 'Electronics City, BEL, ITI, ISRO, design firms'], ['Chennai–Sriperumbudur', 'Mobile phones, telecom equipment'], ['Noida–Greater Noida', 'Mobile phones, consumer electronics'], ['Hyderabad', 'Electronics and defence units, IT'], ['Pune, Mumbai', 'Electronics, automobiles electronics'], ['Thiruvananthapuram', 'Technopark']], 'Table of key electronics centres and what each is known for'),
      n: 'Bengaluru is called the electronic capital of India. It has Electronics City, Bharat Electronics, ITI, the aircraft electronics of HAL, the space agency ISRO and many private firms. Other important centres are Hyderabad, Chennai and nearby Sriperumbudur, Noida in Uttar Pradesh, Pune, Mumbai, Gurugram, Kolkata, Thiruvananthapuram and Gandhinagar. Chennai and Noida have become big mobile phone manufacturing hubs.',
    }),
    sl('example', 'Worked example: how Bengaluru became the electronic capital', {
      b: '**Problem.** Explain the factors behind the growth of the electronics industry in Bengaluru.\n\n**Step 1. Early public sector base.** Bharat Electronics, ITI, HAL and later ISRO were set up here, building a pool of trained engineers and suppliers.\n\n**Step 2. Education and research.** The Indian Institute of Science and many engineering colleges supply skilled graduates.\n\n**Step 3. Climate.** A pleasant, moderate plateau climate with little dust suits precision work and attracts professionals.\n\n**Step 4. Policy and infrastructure.** Electronics City, software technology parks, an international airport and support from the state government.\n\n**Step 5. Capital and enterprise.** Private firms, start-ups and investors cluster where others already succeed.',
      v: flow('LR', [['a', 'Public sector units: BEL, ITI, HAL, ISRO'], ['b', 'Institutes and engineering colleges'], ['c', 'Moderate, dust-free climate'], ['d', 'Electronics City, airport, policy'], ['e', 'Electronic capital of India']], [['a', 'e'], ['b', 'e'], ['c', 'e'], ['d', 'e']], 'Flow of factors behind the growth of the electronics industry in Bengaluru'),
      n: 'How did Bengaluru become the electronic capital? Big public sector units such as Bharat Electronics, ITI, HAL and ISRO were set up there and trained thousands of engineers. Institutes like the Indian Institute of Science and many colleges supply skilled graduates. The mild, dust free plateau climate suits delicate work. Electronics City, technology parks and a good airport attracted more firms, and success drew still more investment.',
    }),
    sl('check', 'Quick check: electronics', {
      b: 'Name an electronics centre or a factor in its growth.',
      n: 'Quick check. Skilled engineers, research institutes and good infrastructure attract electronics firms.',
      chk: 'elec-chk',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Petrochemicals are made from crude oil and natural gas: plastics, synthetic fibres, synthetic rubber, detergents, paints, solvents.',
        'Centres: Jamnagar, Vadodara, Hazira, Dahej (Gujarat); Mumbai and Thane (Maharashtra); Haldia, Panipat, Mangaluru, Chennai, Kochi, Bongaigaon.',
        'Relevance: cheap, light, durable substitutes; vital for farming, health and industry; concern over plastic waste.',
        'Electronics: footloose, skill-based; Bengaluru (electronic capital), Hyderabad, Chennai–Sriperumbudur, Noida, Pune, Mumbai; key to communication, defence and the economy.',
      ],
      v: table(['Industry', 'Leading area', 'Key factor'], [['Petrochemicals', 'Gujarat coast', 'Refineries, gas, ports'], ['Electronics', 'Bengaluru', 'Skills, research, infrastructure']], 'Summary table of the two industries, their leading area and key factor'),
      n: 'Let us sum up Part 2. Petrochemicals are made from crude oil and natural gas and include plastics, synthetic fibres, rubber and detergents. They are made mainly along the Gujarat coast and near refineries elsewhere, and they touch every part of modern life, though plastic waste is a serious problem. Electronics is a skill based industry led by Bengaluru, with other hubs in Hyderabad, Chennai, Noida and Pune.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Name at least four petrochemical products and four centres.',
        'For relevance, give uses in different fields plus one concern.',
        'For Bengaluru, give at least three factors: public sector base, institutes and skills, climate, policy and infrastructure.',
        'Mark centres that change fast "as of the early 2020s".',
      ],
      v: table(['Slip', 'Fix'], [['Cotton is a petrochemical', 'Polyester is; cotton is natural'], ['Electronics needs bulky raw material', 'It needs skills, not bulk'], ['Jamnagar is in Maharashtra', 'Jamnagar is in Gujarat']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. Name at least four petrochemical products and four centres. When asked about relevance, give uses in farming, health and daily life, and mention the problem of plastic waste. For Bengaluru, give at least three clear factors. And remember that electronics hubs change quickly, so present such facts as true for the early twenty twenties.',
    }),
  ],
});
