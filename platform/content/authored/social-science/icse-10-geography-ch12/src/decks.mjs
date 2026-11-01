// ICSE 10 Geography ch12 Agriculture in India — two decks: Part 1 (t01–t02) importance, problems and remedies of Indian
// agriculture and the first Green Revolution; Part 2 (t03–t04) types of farming and the agricultural seasons. Farm, plot and
// yield figures are ILLUSTRATIVE and computed from svgs.mjs.
import { sl, deck, table, flow, svgV } from './lib.mjs';
import { CALENDAR, PLOTMAP, GRCHART, PLOTS, plotTotal, YIELD, yieldOf, rise, FARM, gross, intensity } from './svgs.mjs';

const V = {
  cal: svgV(CALENDAR, 'Crop calendar with sowing, growing and harvesting months for kharif, rabi and zayad'),
  plots: svgV(PLOTMAP, 'A farm in five scattered plots beside the same area joined into one block after consolidation'),
  gr: svgV(GRCHART, 'Bar chart of illustrative wheat yields rising from 1960 to 2000'),
};
const r60 = rise(1960, 1980);

export const deck1 = deck({
  part: 1,
  title: 'Agriculture in India — Part 1: Importance, problems and the Green Revolution',
  goals: [
    'Explain the importance of agriculture to India’s economy',
    'Identify problems such as small holdings, dependence on the monsoon and soil degradation, and suggest remedies',
    'Explain the meaning and inputs of the Green Revolution and evaluate its positive and negative impacts',
  ],
  slides: [
    sl('title', 'Fields that feed a nation', {
      b: 'Part 1 — From the wheat fields of Punjab to the paddy of the Godavari delta and the tea gardens of Assam, farming shapes India’s landscape and economy. We look at why it matters, what holds it back, and how the **Green Revolution** changed it.',
      v: table(['Region', 'Typical farm scene'], [['Punjab plains', 'Wheat and rice with tube wells'], ['Godavari delta', 'Paddy fields and canals'], ['Assam hills', 'Tea estates'], ['Deccan plateau', 'Cotton and millets on black and red soil']], 'Table of four Indian regions and a typical farm scene in each'),
      n: 'Namaste! Travel across India and you will see wheat in Punjab, paddy in the river deltas, tea on the hills of Assam and cotton on the black soils of the Deccan. Farming feeds the country and employs a huge number of people. In this part we ask why agriculture matters, what problems farmers face, and how the Green Revolution transformed Indian farming.',
    }),
    sl('concept', 'Why agriculture matters', {
      b: '**Livelihood:** a very large part of India’s workers — nearly half (as of the early 2020s) — depend on farming. **Food security:** it feeds a population of over 1.4 billion (as of the early 2020s). **Raw materials:** cotton for the mills of Ahmedabad and Mumbai, jute for Kolkata, sugarcane for sugar mills, oilseeds for oil mills. **Exports:** rice, tea, spices, cotton, fruit. **Rural demand:** farm incomes buy fertilisers, tractors and consumer goods, helping industry. Its share of national income has fallen as industry and services grew, but it remains the base of the rural economy.',
      v: table(['Role', 'Example'], [['Employment', 'Nearly half of all workers'], ['Food', 'Rice, wheat, pulses for the nation'], ['Raw materials', 'Cotton, jute, sugarcane, oilseeds'], ['Exports', 'Rice, tea, spices']], 'Table of four roles of agriculture in India with examples'),
      n: 'Agriculture matters for many reasons. Nearly half of India’s workers earn their living from it. It grows the food for well over a billion people. It feeds raw materials to the cotton, jute and sugar mills. Rice, tea and spices earn money abroad. And when farmers earn more, they buy tractors, fertilisers and goods, which helps industry too.',
    }),
    sl('concept', 'Problems and remedies', {
      b: '**Small and fragmented holdings:** land divided among heirs into tiny scattered plots — remedy: **consolidation of holdings**, cooperative farming. **Dependence on the monsoon:** rain is uncertain and uneven; droughts and floods — remedy: irrigation, watershed management, drought-resistant crops. **Soil degradation:** erosion, loss of fertility, waterlogging and salinity — remedy: contour ploughing, crop rotation, balanced fertiliser, drainage. **Low yields and outdated methods**, **lack of cheap credit** (debt to moneylenders), **poor storage and marketing** — remedies: better seeds, **Kisan Credit Card** and cooperative banks, crop insurance, cold storage, regulated markets and minimum support prices.',
      v: table(['Problem', 'Remedy'], [['Small, scattered holdings', 'Consolidation; cooperative farming'], ['Dependence on monsoon', 'Irrigation; drought-resistant crops'], ['Soil degradation', 'Crop rotation; contour ploughing; drainage'], ['Lack of credit', 'Kisan Credit Card; cooperative banks'], ['Poor storage and marketing', 'Cold storage; regulated markets; MSP']], 'Table of five problems of Indian agriculture and a remedy for each'),
      n: 'Indian farmers face several problems. Land is divided among heirs until each owns a few tiny, scattered plots. Many fields depend on uncertain monsoon rain. Soils lose fertility, and some become waterlogged or salty. Farmers often lack cheap loans, good storage and fair markets. Remedies include joining plots together, more irrigation, careful soil care, bank credit, crop insurance and support prices.',
    }),
    sl('check', 'Quick check: importance of agriculture', {
      b: 'Link agriculture to industry or employment.',
      n: 'Quick check. Agriculture supplies raw materials such as cotton, jute and sugarcane to industries.',
      chk: 'imp-chk',
    }),
    sl('diagram', 'Fragmented holdings and consolidation', {
      b: `An illustrative farm near Muzaffarpur in Bihar has **${PLOTS.length} scattered plots** (${PLOTS.join(', ')} ha). The farmer wastes time walking between them, cannot install one well or use a tractor easily, and boundary ridges waste land. **Consolidation of holdings** (chakbandi) exchanges plots so each farmer gets one compact block of about the same total area — here **${plotTotal()} ha**.`,
      v: V.plots,
      n: 'Here is an imaginary farm in Bihar split into five small plots scattered around the village. The farmer walks from plot to plot, cannot run one well or tractor across all of them, and loses land to boundary ridges. Consolidation swaps plots between farmers so that each one gets a single compact block of the same total area, which is far easier to farm.',
    }),
    sl('example', 'Worked example: diagnosing a farm’s problems', {
      b: '**Problem.** A groundnut farmer near Anantapur in Andhra Pradesh has three small plots, no well, and borrows from a moneylender each season. Last year the July rains failed. Identify three problems and suggest a remedy for each.\n\n**Step 1. Monsoon dependence:** no irrigation, so a delayed monsoon ruins the crop → farm ponds, drip irrigation, drought-tolerant varieties.\n\n**Step 2. Fragmented holding:** three plots waste time and effort → consolidation.\n\n**Step 3. Costly credit:** moneylender’s high interest → Kisan Credit Card or cooperative bank loan, plus crop insurance.',
      v: flow('LR', [['a', 'Rain fails'], ['b', 'Crop lost'], ['c', 'Debt to moneylender'], ['d', 'Remedies: irrigation, credit, insurance']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow from rain failure to crop loss and debt, ending in remedies'),
      n: 'This farmer near Anantapur depends wholly on the monsoon, so when the July rains fail his groundnut crop is lost. His land is split into three plots, which wastes effort. And he borrows from a moneylender at high interest. The remedies follow from the problems: farm ponds or drip irrigation, consolidation of his plots, and a bank loan through a Kisan Credit Card with crop insurance.',
    }),
    sl('concept', 'The Green Revolution: meaning and inputs', {
      b: 'In the mid-1960s, after droughts and food shortages, India adopted a package of new methods that sharply raised the output of food grains, especially **wheat** (later **rice**). This is called the **Green Revolution**. Inputs: **high-yielding variety (HYV) seeds** (dwarf wheat from Mexico, developed further in India under scientists such as M. S. Swaminathan); **assured irrigation** (canals, tube wells); **chemical fertilisers** and **pesticides**; **farm machinery**; **credit** and **minimum support prices**. It spread first in **Punjab, Haryana and western Uttar Pradesh**.',
      v: flow('LR', [['a', 'HYV seeds'], ['b', 'Assured irrigation'], ['c', 'Fertilisers and pesticides'], ['d', 'Machines, credit, support prices'], ['e', 'Much higher yields of wheat and rice']], [['a', 'e'], ['b', 'e'], ['c', 'e'], ['d', 'e']], 'Flow of the inputs of the Green Revolution leading to higher yields'),
      n: 'In the middle of the nineteen sixties India faced droughts and had to import food. It then adopted a package of new methods: high yielding seeds of wheat and later rice, assured irrigation from canals and tube wells, chemical fertilisers and pesticides, machines, cheap credit and support prices. Yields jumped, first in Punjab, Haryana and western Uttar Pradesh. This change is called the Green Revolution.',
    }),
    sl('check', 'Quick check: Green Revolution inputs', {
      b: 'Identify the package of inputs.',
      n: 'Quick check. High yielding seeds needed assured irrigation and fertilisers to give big harvests.',
      chk: 'gr-chk',
    }),
    sl('diagram', 'Yields before and after', {
      b: `The chart shows illustrative wheat yields of District P. Yield rose from ${yieldOf(1960).toFixed(1)} t/ha in 1960 to ${yieldOf(1980)} t/ha in 1980 and ${yieldOf(2000)} t/ha in 2000. **Yield** = production ÷ area under the crop. HYV seeds give big harvests only when water and fertiliser are assured — which is why the gains were greatest in canal- and tube-well-irrigated districts.`,
      v: V.gr,
      n: 'This chart shows imaginary wheat yields in one district. Before the new seeds, a hectare gave about one tonne. Within twenty years it gave nearly three, and by the end of the century over four. Remember that yield means production divided by the area under the crop. The biggest gains came where water and fertiliser were assured, as in the irrigated plains of the north-west.',
    }),
    sl('example', 'Worked example: reading the yield chart', {
      b: `**Problem.** Using District P’s data, (a) find the percentage rise in yield from 1960 to 1980, and (b) explain the rise.\n\n**(a)** Rise $= \\dfrac{${yieldOf(1980)} - ${yieldOf(1960).toFixed(1)}}{${yieldOf(1960).toFixed(1)}} \\times 100 = ${r60}$%.\n\n**(b)** HYV wheat seeds were sown widely; canals and tube wells gave assured water; fertiliser use rose; farmers received credit and support prices, so they could invest in inputs.`,
      v: table(['Year', 'Yield (t/ha)'], YIELD.map(([y, v]) => [String(y), v.toFixed(1)]), 'Table of illustrative wheat yields of District P from 1960 to 2000'),
      n: 'To find the percentage rise, subtract the old yield from the new, divide by the old yield and multiply by one hundred. Here the yield almost trebled, a rise of one hundred and eighty per cent. The reasons are the new seeds, assured water from canals and tube wells, more fertiliser, and credit and fixed prices that let farmers buy these inputs.',
    }),
    sl('concept', 'Impact of the first Green Revolution', {
      b: '**Positive:** India became **self-sufficient in food grains** and stopped depending on food aid; **buffer stocks** guard against famine; farm incomes and rural jobs in agro-industries rose; demand for fertilisers, pumps and tractors helped industry. **Negative:** **regional inequality** — irrigated north-west gained, rain-fed regions lagged; **crop inequality** — wheat and rice gained, pulses and millets were neglected; **soil and water damage** — overuse of fertilisers, waterlogging and salinity, falling water tables in Punjab and Haryana; pesticide pollution; richer farmers gained more than small farmers.',
      v: table(['Positive', 'Negative'], [['Self-sufficiency in food grains', 'Regional inequality'], ['Buffer stocks', 'Pulses and millets neglected'], ['Higher farm incomes', 'Falling water tables, salinity'], ['Growth of agro-industries', 'Small farmers gained less']], 'Table of positive and negative impacts of the first Green Revolution'),
      n: 'The Green Revolution made India self sufficient in food grains, built up buffer stocks against famine and raised farm incomes. But it had costs. Irrigated regions gained far more than dry ones. Wheat and rice gained while pulses and millets were neglected. Heavy use of water and chemicals has lowered water tables, made some soils salty and polluted streams, and richer farmers gained more than poor ones.',
    }),
    sl('check', 'Quick check: impact of the Green Revolution', {
      b: 'Pick out a negative effect.',
      n: 'Quick check. Gains were concentrated in irrigated regions, widening the gap with dry regions.',
      chk: 'gr-impact-chk',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Agriculture gives jobs to nearly half of workers (as of the early 2020s), food for all, raw materials and exports.',
        'Problems: small, fragmented holdings; monsoon dependence; soil degradation; low yields; costly credit; poor storage and markets.',
        'Remedies: consolidation, irrigation, soil conservation, credit, insurance, regulated markets, support prices.',
        'Green Revolution: HYV seeds + irrigation + fertilisers; wheat and rice; Punjab, Haryana, western Uttar Pradesh.',
        'Impact: self-sufficiency and buffer stocks, but regional and crop inequality and soil-water damage.',
      ],
      v: table(['Topic', 'Key words'], [['Importance', 'Jobs, food, raw materials, exports'], ['Problems', 'Holdings, monsoon, soil, credit'], ['Green Revolution', 'HYV, irrigation, fertiliser'], ['Impact', 'Self-sufficiency vs inequality and damage']], 'Summary table of key words for each topic in Part 1'),
      n: 'To sum up Part 1. Farming gives jobs to nearly half of India’s workers, food to everyone and raw materials to industry. Its problems include tiny holdings, uncertain rain, tired soils and costly credit, and each has a remedy. The Green Revolution used new seeds, water and fertiliser to make India self sufficient in grain, but it also widened inequalities and harmed soil and water.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Pair every problem with a matching remedy.',
        'Name the inputs of the Green Revolution and the region where it succeeded.',
        'For impact questions, give both sides with named regions or crops.',
        'Show the working when calculating yield or percentage change.',
      ],
      v: table(['Slip', 'Fix'], [['Green Revolution helped all crops equally', 'Mainly wheat and rice'], ['HYV seeds need no irrigation', 'They need assured water'], ['Yield = area ÷ production', 'Yield = production ÷ area']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some tips. Whenever you name a problem, give a remedy that fits it. Learn the inputs of the Green Revolution and the states where it worked best. For questions on its impact, write both good and bad effects with examples. And in calculations, remember that yield is production divided by area, and show every step.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Agriculture in India — Part 2: Types of farming and agricultural seasons',
  goals: [
    'Distinguish subsistence from commercial farming and intensive from extensive farming',
    'Describe the features of plantation and mixed farming with Indian examples',
    'State the sowing and harvesting months of kharif, rabi and zayad and name two crops of each',
  ],
  slides: [
    sl('title', 'Many ways to farm', {
      b: 'Part 2 — Indian farms range from tiny hill plots that feed one family to vast tea estates with their own factories. The type of farming depends on land, labour, capital, climate and markets. Crops also follow a calendar of **three seasons**.',
      v: table(['Type', 'Indian example'], [['Subsistence', 'Hill farms of Mizoram and Uttarakhand'], ['Commercial', 'Grapes of Nashik; sugarcane of Maharashtra'], ['Intensive', 'Paddy of the Ganga delta and Kerala'], ['Plantation', 'Tea in Assam; rubber in Kerala'], ['Mixed', 'Crops and dairy in Haryana']], 'Table of five types of farming with an Indian example of each'),
      n: 'Indian farms come in many types. A hill family may grow food only for itself, while a grape grower sells everything to traders. Some farmers squeeze two or three crops a year out of tiny plots, and tea estates cover whole hillsides with their own factories. In this part we compare these types and then learn the calendar of the three crop seasons.',
    }),
    sl('concept', 'Subsistence and commercial farming', {
      b: '**Subsistence farming:** crops grown mainly to feed the farmer’s family; small plots, simple tools, family labour, little use of fertiliser; little surplus to sell; a mix of food crops. Examples: hill farms of the north-east and Uttarakhand, much of rain-fed central India. **Commercial farming:** crops grown mainly **for sale**; larger farms, purchased inputs (HYV seeds, fertilisers, machines), often one main crop. Examples: grapes of **Nashik**, sugarcane of western Maharashtra, wheat and rice of Punjab.',
      v: table(['Feature', 'Subsistence', 'Commercial'], [['Purpose', 'Family food', 'Sale in the market'], ['Size', 'Small', 'Medium to large'], ['Inputs', 'Family labour, simple tools', 'Machines, HYV seeds, fertilisers'], ['Crops', 'Several food crops', 'Often one main crop']], 'Table comparing subsistence and commercial farming'),
      n: 'In subsistence farming the family grows food mainly for itself, on small plots with simple tools and family labour, and has little left to sell. In commercial farming crops are grown to be sold. Farms are larger and use bought seeds, fertilisers and machines, often for one main crop. The grape farms of Nashik and the sugarcane farms of Maharashtra are commercial.',
    }),
    sl('concept', 'Intensive and extensive farming', {
      b: '**Intensive farming:** small holdings in densely populated areas; much **labour and inputs per hectare**; two or three crops a year (**multiple cropping**); **high yield per hectare**. Examples: the Ganga–Brahmaputra delta of West Bengal, coastal Kerala, Tamil Nadu deltas. **Extensive farming:** large farms in thinly populated areas; heavy use of **machines**, little labour per hectare; usually one crop a year; **low yield per hectare but high output per worker**. It is uncommon in India; large mechanised farms are found in only a few areas.',
      v: table(['Feature', 'Intensive', 'Extensive'], [['Farm size', 'Small', 'Large'], ['Labour per hectare', 'High', 'Low (machines)'], ['Crops a year', 'Two or three', 'Usually one'], ['Yield per hectare', 'High', 'Low'], ['Output per worker', 'Low', 'High']], 'Table comparing intensive and extensive farming'),
      n: 'Intensive farming is found where land is scarce and people are many, as in the delta of West Bengal or coastal Kerala. Farmers put a great deal of labour and manure into each small field and raise two or three crops a year, so the yield per hectare is high. Extensive farming uses large farms and machines with few workers. Each hectare yields less, but each worker produces much more.',
    }),
    sl('check', 'Quick check: types of farming', {
      b: 'Classify a farm from its description.',
      n: 'Quick check. A family that grows food mainly for itself practises subsistence farming.',
      chk: 'type-chk',
    }),
    sl('concept', 'Plantation farming', {
      b: '**Plantation farming** grows a **single cash crop** on a **large estate**. Features: large capital investment; many hired workers (often migrants), living on the estate; scientific methods; **processing on or near the estate** (tea factories); good transport links to ports and markets; output mostly for sale or export. Indian examples: **tea** in Assam (Brahmaputra valley), Darjeeling and the Nilgiris; **coffee** in Karnataka; **rubber** in Kerala; spices and coconut in the south. Many plantations were set up in the colonial period.',
      v: flow('LR', [['a', 'Large estate, one crop'], ['b', 'Hired labour and capital'], ['c', 'Processing factory on estate'], ['d', 'Transport to port or market'], ['e', 'Sale and export']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow from a plantation estate through processing and transport to sale'),
      n: 'Plantation farming grows one cash crop on a very large estate. It needs plenty of money and many hired workers, who often live on the estate. The crop is usually processed nearby, as in the tea factories of Assam, and then sent by road or rail to ports and markets. Tea in Assam and Darjeeling, coffee in Karnataka and rubber in Kerala are grown this way.',
    }),
    sl('concept', 'Mixed farming', {
      b: '**Mixed farming** combines **growing crops** with **rearing animals** (cattle, buffaloes, poultry) on the same farm. Crops provide fodder for animals; animal dung returns to the fields as manure; milk, eggs and meat give a **steady daily income** that cushions crop losses. Common in **Punjab, Haryana and western Uttar Pradesh**, where wheat, rice and fodder crops are grown alongside dairy buffaloes, and in many villages across India.',
      v: table(['Farm part', 'Gives', 'Receives'], [['Crops', 'Grain and fodder', 'Dung manure'], ['Animals', 'Milk, dung, draught power', 'Fodder and crop waste'], ['Family', 'Labour', 'Daily income from milk']], 'Table of how crops, animals and the farm family support one another in mixed farming'),
      n: 'Mixed farming means growing crops and keeping animals on the same farm. The fields supply fodder to cattle and buffaloes, and their dung goes back to the fields as manure. Milk gives the family money every day, even when a crop fails. Farms in Haryana and Punjab often grow wheat and fodder and keep dairy buffaloes in exactly this way.',
    }),
    sl('example', 'Worked example: classifying farms', {
      b: '**Problem.** Classify each farm and give a reason: (a) a 400-hectare tea estate near Dibrugarh with its own factory; (b) a half-hectare plot near Kozhikode giving two paddy crops and a vegetable crop each year; (c) a farm near Karnal growing wheat and fodder and selling buffalo milk; (d) a hill plot in Mizoram growing rice and maize for the family.\n\n**(a)** Plantation — one crop, large estate, processing on site. **(b)** Intensive — tiny plot, three crops a year. **(c)** Mixed — crops plus dairy. **(d)** Subsistence — food for the family.',
      v: table(['Farm', 'Type', 'Clue'], [['Tea estate, Dibrugarh', 'Plantation', 'One crop, factory'], ['Half hectare, Kozhikode', 'Intensive', 'Three crops a year'], ['Wheat and buffaloes, Karnal', 'Mixed', 'Crops plus animals'], ['Hill plot, Mizoram', 'Subsistence', 'Family food']], 'Table classifying four farms by type with the clue for each'),
      n: 'Look for the clue in each description. A huge tea estate with its own factory is plantation farming. A tiny plot in Kerala that gives three crops a year is intensive farming. A Haryana farm with wheat, fodder and milk buffaloes is mixed farming. And a hill family growing rice and maize to eat is practising subsistence farming.',
    }),
    sl('check', 'Quick check: plantation farming', {
      b: 'Identify a feature of plantations.',
      n: 'Quick check. Plantations grow one crop on a large estate with processing close by.',
      chk: 'plant-chk',
    }),
    sl('diagram', 'The three agricultural seasons', {
      b: '**Kharif:** sown with the onset of the south-west monsoon (**June–July**), harvested **September–October** — rice, jowar, bajra, maize, cotton, groundnut, jute, soya bean. **Rabi:** sown **October–December** after the monsoon, harvested **March–April** — wheat, gram, mustard, barley, peas; helped by winter rain from western disturbances in the north-west. **Zayad:** a short season between rabi and kharif (**March–June**) on irrigated land — watermelon, muskmelon, cucumber, vegetables, fodder.',
      v: V.cal,
      n: 'India has three crop seasons. Kharif crops such as rice, cotton and maize are sown when the monsoon arrives in June and July and harvested in September and October. Rabi crops such as wheat, gram and mustard are sown from October to December and harvested in March and April. In between, from March to June, irrigated fields can grow quick zayad crops such as watermelon and cucumber.',
    }),
    sl('concept', 'Why the seasons differ', {
      b: '**Kharif** crops need **heat and plenty of water**, which the monsoon provides. **Rabi** crops need a **cool growing period** and a **dry, sunny ripening period**; they use moisture stored in the soil, irrigation and light winter rain from **western disturbances** (Punjab, Haryana). **Zayad** crops are quick-growing and need **irrigation** because summer is hot and dry. With irrigation, one field can carry a kharif and a rabi crop — and sometimes a zayad crop — in a single year.',
      v: table(['Season', 'Weather needed', 'Water source'], [['Kharif', 'Hot, wet', 'Monsoon rain'], ['Rabi', 'Cool growing, dry ripening', 'Soil moisture, irrigation, winter rain'], ['Zayad', 'Hot, sunny', 'Irrigation']], 'Table of the weather and water source for each season'),
      n: 'The seasons suit different crops. Kharif crops love heat and water, which the monsoon supplies. Rabi crops need cool weather to grow and dry sunny days to ripen, and they draw on soil moisture, irrigation and gentle winter showers in the north-west. Zayad crops grow quickly in the hot dry months, so they need irrigation. With water, one field can carry two or even three crops a year.',
    }),
    sl('check', 'Quick check: crop seasons', {
      b: 'Work out the season from sowing and harvesting months.',
      n: 'Quick check. Wheat sown in November is harvested in March or April.',
      chk: 'season-chk',
    }),
    sl('example', 'Worked example: how hard is a field worked?', {
      b: `**Problem.** An illustrative farm near Muzaffarpur has a **net sown area** of ${FARM.net} ha. It grows rice on ${FARM.kharif} ha in kharif, wheat on ${FARM.rabi} ha in rabi and vegetables on ${FARM.zayad} ha in zayad. Find (a) the gross cropped area and (b) the cropping intensity.\n\n**(a)** Gross cropped area $= ${FARM.kharif} + ${FARM.rabi} + ${FARM.zayad} = ${gross()}$ ha.\n\n**(b)** Cropping intensity $= \\dfrac{${gross()}}{${FARM.net}} \\times 100 = ${intensity()}$%. A value of ${intensity()}% means each hectare carries two crops a year on average — intensive farming made possible by irrigation.`,
      v: table(['Season', 'Crop', 'Area (ha)'], [['Kharif', 'Rice', String(FARM.kharif)], ['Rabi', 'Wheat', String(FARM.rabi)], ['Zayad', 'Vegetables', String(FARM.zayad)], ['Gross cropped area', '', String(gross())]], 'Table of crops and areas by season on an illustrative farm'),
      n: 'Gross cropped area counts a field once for every crop it carries in the year, so we add the three seasons. Cropping intensity compares this with the net sown area: divide the gross area by the net area and multiply by one hundred. This farm scores two hundred, which means each hectare grows two crops a year on average, a sign of intensive farming with irrigation.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Subsistence: food for the family; commercial: crops for sale.',
        'Intensive: small farms, much labour, multiple cropping, high yield per hectare; extensive: large mechanised farms, low yield per hectare, high output per worker.',
        'Plantation: one cash crop on a large estate with capital, hired labour and processing — tea, coffee, rubber.',
        'Mixed: crops plus livestock — Punjab, Haryana.',
        'Kharif (June–July to September–October), rabi (October–December to March–April), zayad (March–June).',
      ],
      v: table(['Season', 'Two crops'], [['Kharif', 'Rice, cotton'], ['Rabi', 'Wheat, gram'], ['Zayad', 'Watermelon, cucumber']], 'Summary table of two crops of each season'),
      n: 'To sum up Part 2. Subsistence farmers grow food for themselves, while commercial farmers grow for the market. Intensive farming gets high yields from small plots with much labour, while extensive farming uses big machines on large farms. Plantations grow one cash crop on a large estate, and mixed farms combine crops with animals. Kharif, rabi and zayad crops follow the rhythm of the monsoon and the winter.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'In “distinguish” answers, write matching points for both types (purpose, size, inputs, yield).',
        'Always give an Indian example for each type of farming.',
        'Learn sowing and harvesting months for each season with two crops.',
        'Cropping intensity = gross cropped area ÷ net sown area × 100.',
      ],
      v: table(['Slip', 'Fix'], [['Kharif crops sown in winter', 'Sown with the monsoon, June–July'], ['Extensive gives higher yield per hectare', 'Intensive does'], ['Mixed farming = several crops only', 'Crops plus animals']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. When asked to distinguish two types of farming, compare them point by point on purpose, size, inputs and yield. Give an Indian example every time. Learn the months and two crops for each season. And remember that mixed farming means crops together with animals, not just a mixture of crops.',
    }),
  ],
});
