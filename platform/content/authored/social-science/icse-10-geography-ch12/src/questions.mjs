// ICSE 10 Geography ch12 Agriculture in India — question bank (ICSE 2027 specimen style). Data items use the ILLUSTRATIVE
// farm, plot and yield figures exported by svgs.mjs (and two illustrative farms below); every computed answer is asserted.
import { mk, add } from './lib.mjs';
import { PLOTS, plotTotal, plotMean, FARM, gross, intensity, YIELD, yieldOf, rise, AREA2000, PROD2000 } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const r1 = (x) => Math.round(x * 10) / 10;
// two illustrative farms for intensive versus extensive farming
const FA = { t: 6, ha: 1, workers: 3 };
const FB = { t: 30, ha: 15, workers: 2 };
const yA = FA.t / FA.ha;
const yB = FB.t / FB.ha;
const wA = FA.t / FA.workers;
const wB = FB.t / FB.workers;
const yieldList = YIELD.map(([y, v]) => `${y}: ${v.toFixed(1)}`).join('; ');

// ---------------------------------------------------------------- t01 importance, problems, remedies
add('imp-chk', mcq({
  stem: 'The cotton mills of Ahmedabad, the jute mills along the Hooghly and the sugar mills of western Uttar Pradesh all depend on Indian farms for:',
  right: 'their raw materials',
  wrong: ['their supply of electricity', 'their skilled engineers', 'their export markets abroad'],
  sol: 'Agriculture supplies raw materials to agro-based industries — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('workforce-mcq', mcq({
  stem: 'Which statement best explains why agriculture is still vital to India, even though its share of national income has fallen?',
  right: 'It gives a livelihood to a very large part of the population and food to the whole nation',
  wrong: ['It earns more than industry and services together', 'It needs very few workers because farms are fully mechanised', 'It produces nothing that is exported'],
  sol: 'Employment and food security — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('monsoon-mcq', mcq({
  stem: 'A groundnut farmer near Anantapur in Andhra Pradesh, with no well or canal, loses his crop when the July rains fail. His loss illustrates the problem of:',
  right: 'dependence on the monsoon',
  wrong: ['fragmentation of holdings', 'overuse of chemical fertilisers', 'shortage of farm machinery'],
  sol: 'A rain-fed crop fails when the monsoon fails — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('holding-mcq', mcq({
  stem: 'A farmer in Darbhanga district of Bihar owns six tiny plots scattered around his village. The main disadvantage of such a holding is that:',
  right: 'time and effort are wasted moving between plots, and a well or tractor cannot serve them all efficiently',
  wrong: ['the plots receive too much sunlight', 'he must pay higher prices for his seeds', 'the soil of small plots cannot grow rice'],
  sol: 'Fragmented holdings waste labour and make irrigation and machines uneconomic — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('remedy-mcq', mcq({
  stem: 'Several farmers of a village in Uttar Pradesh agree to exchange their scattered strips so that each gets one compact block. This measure is called:',
  right: 'consolidation of holdings',
  wrong: ['crop insurance', 'minimum support price', 'shifting cultivation'],
  sol: 'Option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('soil-mcq', mcq({
  stem: 'White salt crusts and waterlogged patches have appeared on fields in parts of south-western Punjab. The most likely cause is:',
  right: 'heavy canal irrigation over many years without proper drainage',
  wrong: ['too little irrigation in the rabi season', 'the shifting of the monsoon to the south', 'the planting of trees along field boundaries'],
  sol: 'Over-irrigation raises the water table and leaves salts at the surface — option (@K).',
  d: 3, c: 'analysis', t: [1, 2],
}));
add('credit-ar', ar({
  a: 'Many small farmers in India remain in debt to village moneylenders.',
  r: 'They lack easy access to cheap institutional credit, and their incomes are uncertain.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('imp-ar', ar({
  a: 'Agriculture supplies raw materials to several Indian industries.',
  r: 'Most Indian farmers own large, fully mechanised farms.',
  key: 'c',
  sol: 'A is true (cotton, jute, sugarcane); R is false — most holdings are small — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('imp-tf', tf({
  stem: 'Tea, spices and rice are among India’s farm exports.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [1],
}));
add('holding-tf', tf({
  stem: 'Most farm holdings in India are smaller than two hectares (as of the early 2020s).',
  key: 't',
  sol: 'True: the great majority of holdings are marginal or small.',
  d: 1, c: 'recall', t: [1],
}));
add('consol-fill', fill({
  stem: 'Regrouping a farmer’s scattered plots into one compact block is called ___ of holdings.',
  acc: [['consolidation']],
  sol: '**Consolidation** (chakbandi).',
  d: 1, c: 'recall', t: [1],
}));
add('imp-short2', short({
  marks: 2,
  stem: 'Give two reasons why agriculture is important to the Indian economy.',
  model: 'It gives employment to a very large share of India’s workers (nearly half, as of the early 2020s) and food for the whole population; it supplies raw materials such as cotton, jute and sugarcane to industries and earns foreign exchange through exports of rice, tea and spices.',
  sol: 'Employment and food; raw materials or exports.',
  scheme: [['First reason', 1], ['Second reason', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('problem-short3', short({
  marks: 3,
  stem: 'State three problems of Indian agriculture and suggest a suitable remedy for each.',
  model: 'Small and fragmented holdings — consolidation of holdings or cooperative farming. Dependence on the uncertain monsoon — expansion of irrigation and drought-resistant varieties. Soil degradation through erosion, salinity and loss of fertility — crop rotation, contour ploughing, balanced fertiliser use and drainage. (Lack of cheap credit — Kisan Credit Card and cooperative banks.)',
  sol: 'Three problems with matching remedies.',
  scheme: [['Problem and remedy 1', 1], ['Problem and remedy 2', 1], ['Problem and remedy 3', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('vidarbha-short2', short({
  marks: 2,
  stem: 'Cotton farmers in the Vidarbha region of Maharashtra often fall into debt after a crop failure. Suggest two measures that would reduce their hardship.',
  model: 'Give them cheap loans through a Kisan Credit Card or cooperative bank so they need not borrow from moneylenders; insure the crop so a failure is compensated; and extend irrigation (farm ponds, drip) to reduce dependence on uncertain rain.',
  sol: 'Credit; insurance or irrigation.',
  scheme: [['First measure', 1], ['Second measure', 1]],
  d: 2, c: 'application', t: [1],
}));
add('problem-short1', short({
  marks: 1,
  stem: 'Name one scheme or institution that gives Indian farmers loans at low interest.',
  model: 'The Kisan Credit Card scheme (or cooperative credit societies, regional rural banks, NABARD).',
  sol: 'Kisan Credit Card or a cooperative or rural bank.',
  scheme: [['Any one', 1]],
  d: 1, c: 'recall', t: [1],
}));

// ---------------------------------------------------------------- t02 Green Revolution
add('gr-chk', mcq({
  stem: 'Which package of inputs was at the heart of the first Green Revolution?',
  right: 'High-yielding variety seeds, assured irrigation and chemical fertilisers',
  wrong: ['Shifting cultivation, hand tools and rainfall alone', 'Organic manure with traditional seeds only', 'Plantation estates and terraces on hill slopes'],
  sol: 'HYV seeds give big harvests only with water and fertiliser — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('gr-region-mcq', mcq({
  stem: 'The first Green Revolution made its greatest impact in:',
  right: 'Punjab, Haryana and western Uttar Pradesh',
  wrong: ['Odisha, Jharkhand and Chhattisgarh', 'Kerala and the Konkan coast', 'the hill states of the north-east'],
  sol: 'Irrigated north-western plains — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('gr-crop-mcq', mcq({
  stem: 'The crops whose output rose most during the first Green Revolution were:',
  right: 'wheat and, later, rice',
  wrong: ['pulses and millets', 'tea and coffee', 'jute and cotton'],
  sol: 'HYV seeds were developed first for wheat and rice — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('gr-why-mcq', mcq({
  stem: 'In the late 1960s, HYV wheat spread much faster in Ludhiana district of Punjab than in rain-fed districts of the Deccan plateau. The main reason was that Ludhiana had:',
  right: 'assured irrigation from canals and tube wells, which HYV seeds need',
  wrong: ['heavier monsoon rain than any part of the Deccan', 'no other crop to grow', 'thick forest that protected the fields'],
  sol: 'HYV seeds need assured water — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('gr-neg-mcq', mcq({
  stem: 'A farmer in Sangrur district of Punjab has to deepen his tube well every few years. This is mainly a result of:',
  right: 'heavy pumping of groundwater to irrigate rice and wheat year after year',
  wrong: ['too much monsoon rain in Punjab', 'the building of the Hirakud dam', 'the spread of plantation farming'],
  sol: 'Over-extraction lowers the water table — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('gr-impact-chk', mcq({
  stem: 'Which of the following was a negative effect of the first Green Revolution?',
  right: 'A widening gap between irrigated and rain-fed regions',
  wrong: ['India had to import more food grains than before', 'Wheat production fell sharply', 'Farmers stopped using fertilisers'],
  sol: 'Gains were concentrated in irrigated areas — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('gr-policy-mcq', mcq({
  stem: 'Planners in Punjab want to slow the fall of the water table without cutting farm incomes. Which step would be most effective?',
  right: 'Help farmers shift part of the rice area to maize or pulses with assured purchase, and promote drip irrigation',
  wrong: ['Give free electricity for pumping so that more groundwater can be used', 'Ban all crops in the rabi season', 'Replace wheat with more rice in summer'],
  sol: 'Less water-hungry crops and efficient irrigation save groundwater while keeping income — option (@K).',
  d: 3, c: 'evaluation', t: [2],
}));
add('gr-ar', ar({
  a: 'The first Green Revolution did little for pulses and millets.',
  r: 'High-yielding varieties were developed mainly for wheat and rice.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('gr-ar2', ar({
  a: 'The Green Revolution helped India build up buffer stocks of food grains.',
  r: 'India became the world’s largest exporter of pulses.',
  key: 'c',
  sol: 'A is true; R is false — India grows and imports pulses; the gains were in wheat and rice — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('gr-tf', tf({
  stem: 'Rain-fed dryland districts gained as much from the first Green Revolution as canal-irrigated districts.',
  key: 'f',
  sol: 'False: HYV seeds needed assured water, so irrigated districts gained far more.',
  d: 2, c: 'understanding', t: [2],
}));
add('hyv-fill', fill({
  stem: 'Seeds bred to give much larger harvests when supplied with enough water and fertiliser are called high-___ variety seeds.',
  acc: [['yielding', 'yield']],
  sol: 'High-**yielding** variety (HYV) seeds.',
  d: 1, c: 'recall', t: [2],
}));
add('saline-fill', fill({
  stem: 'Years of heavy irrigation without proper drainage have left some fields of south-western Punjab waterlogged and ___, with white salt crusts on the surface.',
  acc: [['saline', 'salty', 'alkaline']],
  sol: '**Saline** (salty).',
  d: 1, c: 'recall', t: [1, 2],
}));
add('gr-short1', short({
  marks: 1,
  stem: 'Name the Indian agricultural scientist often called the father of the Green Revolution in India.',
  model: 'M. S. Swaminathan.',
  sol: 'M. S. Swaminathan.',
  scheme: [['M. S. Swaminathan', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('gr-short2', short({
  marks: 2,
  stem: 'What is meant by the Green Revolution? Name two of its inputs.',
  model: 'The large and rapid increase in the production of food grains, mainly wheat and rice, in India from the mid-1960s through the use of modern farming inputs. Inputs: high-yielding variety seeds and assured irrigation (also chemical fertilisers, pesticides, machines).',
  sol: 'Meaning; two inputs.',
  scheme: [['Meaning', 1], ['Two inputs', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('gr-pos-short3', short({
  marks: 3,
  stem: 'State three positive effects of the first Green Revolution on India.',
  model: 'India became self-sufficient in food grains and no longer depended on imported food aid; large buffer stocks were built up to guard against drought and famine; farm incomes rose in the irrigated north-west, creating rural jobs and demand for fertilisers, pumps and tractors made by Indian industry.',
  sol: 'Self-sufficiency; buffer stocks; incomes and industry.',
  scheme: [['First effect', 1], ['Second effect', 1], ['Third effect', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('gr-eval-short3', short({
  marks: 3,
  stem: 'Evaluate the impact of the first Green Revolution on (a) India’s food supply, (b) the soil and water of Punjab and (c) small farmers.',
  model: '(a) Strongly positive: wheat and rice output rose sharply, India became self-sufficient in food grains and built buffer stocks. (b) Negative: heavy irrigation and fertiliser use caused falling water tables, waterlogging, salinity and chemical pollution. (c) Mixed: richer farmers with land, wells and credit gained most, while many small and rain-fed farmers could not afford the inputs and gained little.',
  sol: 'Food positive; soil-water negative; small farmers mixed.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'evaluation', t: [2],
}));
add('gr-fix-short2', short({
  marks: 2,
  stem: 'Suggest two ways in which farmers in Punjab could reduce the damage the Green Revolution has done to their soil and water.',
  model: 'Use drip or sprinkler irrigation and grow less water-hungry crops such as maize or pulses in place of some rice, so less groundwater is pumped; apply fertiliser according to soil tests, add organic manure and rotate crops with legumes to restore soil health.',
  sol: 'Save water; restore soil.',
  scheme: [['Water measure', 1], ['Soil measure', 1]],
  d: 2, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 types of farming
add('type-chk', mcq({
  stem: 'A family on the hill slopes of Mizoram grows rice, maize and vegetables mainly to feed itself and sells very little. This is an example of:',
  right: 'subsistence farming',
  wrong: ['commercial farming', 'plantation farming', 'extensive farming'],
  sol: 'Food mainly for the family — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('intensive-mcq', mcq({
  stem: 'On the crowded coastal plain of Kerala, farmers raise two or three crops a year on tiny plots, using much family labour and manure. This is:',
  right: 'intensive farming',
  wrong: ['extensive farming', 'plantation farming', 'shifting cultivation'],
  sol: 'Much labour and input per hectare, multiple cropping — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('extensive-mcq', mcq({
  stem: 'Which description fits extensive farming?',
  right: 'Large farms, much use of machines, low yield per hectare but high output per worker',
  wrong: ['Tiny farms, much hand labour, two or three crops a year', 'One cash crop on an estate with its own factory', 'Crops grown only for the family’s own food'],
  sol: 'Option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('plant-chk', mcq({
  stem: 'Which feature is shared by the tea estates of upper Assam and the rubber estates of Kerala?',
  right: 'A single crop grown on a large estate, with much capital, hired labour and processing close by',
  wrong: ['Several food crops grown mainly for the family', 'Crops grown only with the help of winter rain', 'Fields that are left fallow every second year'],
  sol: 'Features of plantation farming — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('mixed-mcq', mcq({
  stem: 'A farmer near Karnal in Haryana grows wheat and berseem fodder and keeps buffaloes, selling their milk and spreading their dung on the fields. This is:',
  right: 'mixed farming',
  wrong: ['plantation farming', 'subsistence farming', 'shifting cultivation'],
  sol: 'Crops and livestock together — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('commercial-mcq', mcq({
  stem: 'Grape growers near Nashik in Maharashtra sell almost their whole harvest to traders, exporters and wineries. Their farming is best described as:',
  right: 'commercial farming',
  wrong: ['subsistence farming', 'shifting cultivation', 'extensive farming'],
  sol: 'Grown mainly for sale — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('yieldab-mcq', mcq({
  stem: `Farm A (illustrative, Kerala) produces ${FA.t} tonnes of grain from ${FA.ha} hectare with ${FA.workers} workers. Farm B (illustrative, mechanised) produces ${FB.t} tonnes from ${FB.ha} hectares with ${FB.workers} workers. Which statement is correct?`,
  right: 'Farm A has the higher yield per hectare, but Farm B has the higher output per worker',
  wrong: ['Farm B has the higher yield per hectare and the higher output per worker', 'Both farms have the same yield per hectare', 'Farm A has the higher output per worker'],
  sol: `Yield: A $= ${FA.t} \\div ${FA.ha} = ${yA}$ t/ha, B $= ${FB.t} \\div ${FB.ha} = ${yB}$ t/ha; per worker: A $= ${wA}$ t, B $= ${wB}$ t — option (@K).`,
  d: 3, c: 'analysis', t: [3],
}), () => (yA > yB && wB > wA) || 'compare');
add('type-ar', ar({
  a: 'Intensive farming is common in the densely populated Ganga delta of West Bengal.',
  r: 'Where land is scarce and labour plentiful, farmers try to get the most out of every hectare.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'analysis', t: [3],
}));
add('type-ar2', ar({
  a: 'Plantation farming needs large amounts of capital.',
  r: 'Plantations grow several food crops mainly for the owner’s family.',
  key: 'c',
  sol: 'A is true (estates, factories, transport, labour); R is false — plantations grow one cash crop for sale — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
add('type-tf', tf({
  stem: 'In mixed farming, crops are grown and animals are reared on the same farm.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [3],
}));
add('type-tf2', tf({
  stem: 'Extensive farming gives a higher yield per hectare than intensive farming.',
  key: 'f',
  sol: 'False: intensive farming gives the higher yield per hectare; extensive farming gives higher output per worker.',
  d: 2, c: 'understanding', t: [3],
}));
add('subs-fill', fill({
  stem: 'Farming in which crops are grown mainly to feed the farmer’s own family is called ___ farming.',
  acc: [['subsistence']],
  sol: '**Subsistence** farming.',
  d: 1, c: 'recall', t: [3],
}));
add('type-short2', short({
  marks: 2,
  stem: 'Distinguish between intensive and extensive farming with reference to (a) size of farms and use of labour and (b) yield.',
  model: '(a) Intensive farming uses small farms with a great deal of labour per hectare, whereas extensive farming uses large farms worked mainly by machines with little labour. (b) Intensive farming gives a high yield per hectare (often several crops a year); extensive farming gives a low yield per hectare but a high output per worker.',
  sol: 'Size and labour; yield.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('plant-short3', short({
  marks: 3,
  stem: 'Describe three characteristics of the tea estates of Assam that make them plantation farms.',
  model: 'Each estate grows a single cash crop, tea, over hundreds of hectares; it needs large capital and employs many hired workers who often live on the estate; the leaves are processed in the estate’s own factory and the tea is sent by road, rail or river to Kolkata or Guwahati for sale and export.',
  sol: 'Single crop on large estate; capital and labour; processing and market.',
  scheme: [['Single crop, large estate', 1], ['Capital and labour', 1], ['Processing and market', 1]],
  d: 2, c: 'application', t: [3],
}));
add('mixed-short2', short({
  marks: 2,
  stem: 'Give two advantages of mixed farming for a farmer in Haryana.',
  model: 'Milk from buffaloes or cows gives a steady daily income even if a crop fails; crop residues and fodder feed the animals while their dung manures the fields, cutting the cost of fertiliser.',
  sol: 'Steady income; dung and fodder recycling.',
  scheme: [['First advantage', 1], ['Second advantage', 1]],
  d: 2, c: 'application', t: [3],
}));
add('type-short3', short({
  marks: 3,
  stem: 'Compare a hill farm in Uttarakhand that grows food for the family with a sugarcane farm in western Maharashtra that supplies a sugar mill, under the headings (a) purpose, (b) size and (c) inputs.',
  model: '(a) The hill farm grows food mainly for the family (subsistence); the sugarcane farm grows a cash crop for sale to the mill (commercial). (b) The hill farm is a few small terraced plots; the sugarcane farm is larger and compact. (c) The hill farm uses family labour, simple tools and manure; the sugarcane farm uses irrigation, fertilisers, improved varieties and hired labour or machines.',
  sol: 'Purpose; size; inputs.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 seasons
add('season-chk', mcq({
  stem: 'A farmer in the Ganga plain of Bihar sows wheat in November. In which months will she most probably harvest it?',
  right: 'March–April',
  wrong: ['July–August', 'September–October', 'December–January'],
  sol: 'Rabi crops are harvested in spring — option (@K).',
  d: 1, c: 'application', t: [4],
}));
add('kharif-mcq', mcq({
  stem: 'A farmer near Raichur in Karnataka sows his fields as soon as the south-west monsoon arrives in June. Which pair of crops is he most likely to sow?',
  right: 'Jowar and cotton',
  wrong: ['Wheat and mustard', 'Gram and barley', 'Watermelon and cucumber'],
  sol: 'Kharif crops are sown with the monsoon — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('rabi-mcq', mcq({
  stem: 'Fields of mustard in Rajasthan turn bright yellow with flowers in January. Mustard is therefore a:',
  right: 'rabi crop',
  wrong: ['kharif crop', 'zayad crop', 'plantation crop'],
  sol: 'Sown in October–November, harvested in spring — option (@K).',
  d: 1, c: 'application', t: [4],
}));
add('zayad-mcq', mcq({
  stem: 'Muskmelons grown on the sandy beds of the Yamuna near Agra in April and May are an example of a:',
  right: 'zayad crop',
  wrong: ['kharif crop', 'rabi crop', 'plantation crop'],
  sol: 'Short irrigated summer season between rabi and kharif — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('rabi-why-mcq', mcq({
  stem: 'Why is wheat grown as a rabi crop in the plains of Uttar Pradesh?',
  right: 'It needs a cool season to grow and a warm, dry, sunny period to ripen',
  wrong: ['It needs heavy rain throughout its growth', 'It grows only in standing water', 'It needs frost-free hot weather all year'],
  sol: 'Winter growth and spring ripening suit wheat — option (@K).',
  d: 2, c: 'analysis', t: [4],
}));
add('season-ar', ar({
  a: 'Kharif crops are sown in winter.',
  r: 'Kharif crops depend on the rain of the south-west monsoon.',
  key: 'd',
  sol: 'A is false (they are sown in June–July); R is true — option (d).',
  d: 2, c: 'understanding', t: [4],
}));
add('season-ar2', ar({
  a: 'Zayad crops are grown between the rabi and kharif seasons.',
  r: 'Watermelon and cucumber are examples of zayad crops.',
  key: 'b',
  sol: 'Both are true, but naming examples does not explain when the season falls — option (b).',
  d: 2, c: 'understanding', t: [4],
}));
add('season-tf', tf({
  stem: 'Gram and peas are kharif crops.',
  key: 'f',
  sol: 'False: gram and peas are rabi crops.',
  d: 1, c: 'recall', t: [4],
}));
add('kharif-fill', fill({
  stem: 'Crops sown with the onset of the south-west monsoon in June–July are called ___ crops.',
  acc: [['kharif']],
  sol: '**Kharif**.',
  d: 1, c: 'recall', t: [4],
}));
add('season-short2', short({
  marks: 2,
  stem: 'Name two crops each of the rabi and zayad seasons.',
  model: 'Rabi: wheat and gram (also mustard, barley, peas). Zayad: watermelon and cucumber (also muskmelon, vegetables, fodder).',
  sol: 'Two rabi; two zayad.',
  scheme: [['Rabi', 1], ['Zayad', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('season-short3', short({
  marks: 3,
  stem: 'State the sowing and harvesting months of the kharif, rabi and zayad seasons.',
  model: 'Kharif: sown in June–July with the onset of the monsoon, harvested in September–October. Rabi: sown in October–December, harvested in March–April. Zayad: sown around March, after the rabi harvest, and harvested by June.',
  sol: 'Months for each season.',
  scheme: [['Kharif', 1], ['Rabi', 1], ['Zayad', 1]],
  d: 2, c: 'recall', t: [4],
}));
add('rotation-short2', short({
  marks: 2,
  stem: 'A farmer near Meerut in western Uttar Pradesh grows rice in kharif and wheat in rabi on the same field. Explain how the seasons and irrigation make this possible.',
  model: 'Rice grows in the hot, wet monsoon months from June to October and is harvested in time for wheat to be sown in November, which grows through the cool winter and is harvested in April. Canal or tube-well irrigation supplies water for wheat in the dry winter and tops up the rice when rain is short.',
  sol: 'Two seasons in sequence; irrigation.',
  scheme: [['Seasonal sequence', 1], ['Role of irrigation', 1]],
  d: 2, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- illustrative data
const pt = plotTotal();
const pm = plotMean();
add('plots-num', num({
  stem: `An illustrative farm near Muzaffarpur in Bihar is split into five scattered plots of ${PLOTS.join(', ')} hectares. What is the average size of a plot in hectares?`,
  value: pm, tol: 0, unit: 'ha',
  sol: `Total $= ${PLOTS.join(' + ')} = ${pt}$ ha; average $= ${pt} \\div ${PLOTS.length} = ${pm}$ ha.`,
  scheme: [[`${pm} ha`, 1]],
  d: 2, c: 'application', t: [1],
}), () => (r1(PLOTS.reduce((a, b) => a + b, 0) / 5) === 0.8 && pt === 4) || 'mean');
const ci = intensity();
add('intensity-num', num({
  stem: `An illustrative farm has a net sown area of ${FARM.net} ha. It grows rice on ${FARM.kharif} ha in kharif, wheat on ${FARM.rabi} ha in rabi and vegetables on ${FARM.zayad} ha in zayad. Calculate its cropping intensity (gross cropped area as a percentage of net sown area).`,
  value: ci, tol: 0, unit: '%',
  sol: `Gross cropped area $= ${FARM.kharif} + ${FARM.rabi} + ${FARM.zayad} = ${gross()}$ ha; intensity $= \\dfrac{${gross()}}{${FARM.net}} \\times 100 = ${ci}$%.`,
  scheme: [[`${ci}%`, 1]],
  d: 3, c: 'application', t: [3, 4],
}), () => ((4 + 3 + 1) / 4) * 100 === ci || 'intensity');
const r6080 = rise(1960, 1980);
add('rise-num', num({
  stem: `Illustrative wheat yields of District P (tonnes per hectare) are: ${yieldList}. By what percentage did the yield rise from 1960 to 1980?`,
  value: r6080, tol: 0, unit: '%',
  sol: `Rise $= \\dfrac{${yieldOf(1980)} - ${yieldOf(1960).toFixed(1)}}{${yieldOf(1960).toFixed(1)}} \\times 100 = ${r6080}$%.`,
  scheme: [[`${r6080}%`, 1]],
  d: 2, c: 'application', t: [2],
}), () => Math.round(((2.8 - 1) / 1) * 100) === r6080 || 'rise');
const y2000 = r1(PROD2000 / AREA2000);
add('yield-num', num({
  stem: `In 2000, District P (illustrative) produced ${PROD2000} thousand tonnes of wheat from ${AREA2000} thousand hectares. What was its yield in tonnes per hectare?`,
  value: y2000, tol: 0, unit: 't/ha',
  sol: `Yield $= ${PROD2000} \\div ${AREA2000} = ${y2000}$ t/ha.`,
  scheme: [[`${y2000} t/ha`, 1]],
  d: 2, c: 'application', t: [2],
}), () => (y2000 === yieldOf(2000) && y2000 * AREA2000 === PROD2000) || 'yield');

// ---------------------------------------------------------------- match
add('type-match', match({
  marks: 2,
  stem: 'Match each farm in Column A with the type of farming in Column B.',
  pairs: [
    ['A tea estate with its own factory near Dibrugarh', 'Plantation farming'],
    ['Wheat fields with dairy buffaloes near Karnal', 'Mixed farming'],
    ['A hill family in Mizoram growing food for itself', 'Subsistence farming'],
    ['Grape vineyards near Nashik selling to wineries', 'Commercial farming'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Tea estate → plantation; Karnal → mixed; Mizoram → subsistence; Nashik → commercial.',
  d: 2, c: 'application', t: [3],
}));
add('season-match', match({
  marks: 2,
  stem: 'Match each pair of crops in Column A with its season or type in Column B.',
  pairs: [
    ['Paddy and cotton', 'Kharif'],
    ['Wheat and gram', 'Rabi'],
    ['Watermelon and cucumber', 'Zayad'],
    ['Tea and rubber', 'Plantation crops'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Paddy, cotton → kharif; wheat, gram → rabi; watermelon, cucumber → zayad; tea, rubber → plantation.',
  d: 1, c: 'recall', t: [3, 4],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('imp-long', long({
  stem: '(a) Give two reasons why agriculture is important to India. [2]\n\n(b) What is meant by fragmentation of holdings? State one harmful effect. [2]\n\n(c) Explain why dependence on the monsoon is a problem for Indian farmers and suggest two remedies. [3]\n\n(d) Name three measures taken to help farmers obtain credit, protect their income or sell their produce. [3]',
  model: '(a) It employs a very large share of the workforce and feeds the population; it supplies raw materials to agro-based industries and earns foreign exchange through exports.\n\n(b) The division of a farmer’s land into many small, scattered plots, mostly through inheritance. Effect: time and labour are wasted and machines or wells cannot be used efficiently.\n\n(c) Monsoon rain is uncertain in timing and amount and unevenly spread, so droughts or floods destroy rain-fed crops. Remedies: expand irrigation such as canals, tube wells, farm ponds and drip; grow drought-resistant varieties; manage watersheds.\n\n(d) Kisan Credit Card and cooperative or rural banks for cheap credit; crop insurance against crop failure; minimum support prices and regulated markets for fair prices (also cold storage).',
  sol: 'Importance; fragmentation; monsoon; measures.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 2, c: 'understanding', t: [1],
}));
add('gr-long', long({
  stem: '(a) What is meant by the Green Revolution? [2]\n\n(b) Name the two crops and two states that gained most from it. [2]\n\n(c) State three positive effects of the first Green Revolution. [3]\n\n(d) State three negative effects of the first Green Revolution. [3]',
  model: '(a) The rapid increase in food-grain production in India from the mid-1960s, achieved through high-yielding variety seeds, assured irrigation, chemical fertilisers and pesticides, machines and credit.\n\n(b) Crops: wheat and rice. States: Punjab and Haryana (also western Uttar Pradesh).\n\n(c) Self-sufficiency in food grains; buffer stocks against famine; higher farm incomes and growth of industries making fertilisers, pumps and tractors.\n\n(d) Regional inequality between irrigated and rain-fed areas; neglect of pulses and millets; falling water tables, waterlogging, salinity and chemical pollution (also small farmers gained less).',
  sol: 'Meaning; crops and states; positive; negative.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 2, c: 'understanding', t: [2],
}));
add('types-long', long({
  stem: '(a) Distinguish between subsistence and commercial farming. [2]\n\n(b) Give two differences between intensive and extensive farming. [2]\n\n(c) State three features of plantation farming and name two plantation crops of India with a state for each. [3]\n\n(d) What is mixed farming? Give two advantages of it. [3]',
  model: '(a) Subsistence farming grows crops mainly for the farmer’s family, on small plots with simple tools; commercial farming grows crops mainly for sale, using bought inputs such as HYV seeds, fertilisers and machines.\n\n(b) Intensive: small farms, much labour per hectare, high yield per hectare, multiple cropping. Extensive: large farms, machines, low yield per hectare but high output per worker, usually one crop.\n\n(c) A single cash crop on a large estate; large capital and many hired workers; processing on or near the estate and production mainly for sale or export. Examples: tea — Assam; coffee — Karnataka (rubber — Kerala).\n\n(d) Growing crops and rearing livestock together on the same farm. Advantages: milk and animal products give a steady income; dung manures the fields while crops provide fodder, so costs fall and risk is spread.',
  sol: 'Subsistence/commercial; intensive/extensive; plantation; mixed.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 2, c: 'understanding', t: [3],
}));
add('season-long', long({
  stem: `(a) Name the months of sowing and harvesting of kharif crops and two kharif crops. [2]\n\n(b) Why is light winter rain in Punjab and Haryana useful for rabi crops? Name its source. [2]\n\n(c) What is the zayad season? Why are zayad crops usually grown on irrigated land? [3]\n\n(d) An illustrative farm has a net sown area of ${FARM.net} ha and grows crops on ${FARM.kharif} ha in kharif, ${FARM.rabi} ha in rabi and ${FARM.zayad} ha in zayad. Calculate its cropping intensity and state what the value shows. [3]`,
  model: `(a) Sown in June–July with the onset of the south-west monsoon, harvested in September–October; rice and cotton (also jowar, bajra, maize, groundnut, jute).\n\n(b) The rabi crops such as wheat grow in the dry winter; light showers add moisture to the soil during growth and reduce the need for irrigation. The rain comes from western disturbances.\n\n(c) A short season from about March to June between the rabi harvest and kharif sowing, for quick crops such as watermelon, cucumber and vegetables. The months are hot and dry with little rain, so the crops need irrigation.\n\n(d) Gross cropped area $= ${FARM.kharif} + ${FARM.rabi} + ${FARM.zayad} = ${gross()}$ ha; intensity $= \\dfrac{${gross()}}{${FARM.net}} \\times 100 = ${ci}$%. Each hectare carries two crops a year on average — intensive use of land made possible by irrigation.`,
  sol: `Kharif; western disturbances; zayad; ${ci}%.`,
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 3, c: 'application', t: [4],
}), () => ci === 200 || 'intensity');
add('data-long', long({
  stem: `Study the illustrative wheat yields of District P (tonnes per hectare): ${yieldList}. In 2000 the district had ${AREA2000} thousand hectares under wheat.\n\n(a) Calculate the percentage rise in yield between 1960 and 1980. [2]\n\n(b) Calculate the district’s wheat production in 2000. [2]\n\n(c) Give three reasons for the rise in yield after 1960. [3]\n\n(d) State two problems that such rapid growth may have caused in the district, and suggest one remedy. [3]`,
  model: `(a) $\\dfrac{${yieldOf(1980)} - ${yieldOf(1960).toFixed(1)}}{${yieldOf(1960).toFixed(1)}} \\times 100 = ${r6080}$%.\n\n(b) Production $= ${yieldOf(2000)} \\times ${AREA2000} = ${PROD2000}$ thousand tonnes.\n\n(c) Sowing of HYV wheat seeds; assured irrigation from canals and tube wells; greater use of fertilisers and pesticides, supported by credit and minimum support prices.\n\n(d) Falling water table from heavy pumping; soil salinity or loss of fertility from overuse of water and chemicals (also neglect of pulses, inequality). Remedy: drip irrigation and crop diversification, or soil testing and organic manure.`,
  sol: `${r6080}%; ${PROD2000} thousand tonnes; reasons; problems and remedy.`,
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 4, c: 'analysis', t: [2],
}), () => (r1(yieldOf(2000) * AREA2000) === PROD2000 && r6080 === 180) || 'data');
