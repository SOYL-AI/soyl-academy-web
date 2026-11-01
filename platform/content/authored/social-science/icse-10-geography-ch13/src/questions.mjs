// ICSE 10 Geography ch13 Food Crops — question bank (ICSE 2027 specimen style). Data items use the ILLUSTRATIVE four-district
// rice table exported by svgs.mjs; every computed answer is asserted. MCQ keys are placed by the builder.
import { mk, add } from './lib.mjs';
import { DIST, yld, totArea, totProd } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const fmt = (v) => (Number.isInteger(v) ? v.toFixed(1) : String(v));
const distList = DIST.map(([d, a, p]) => `District ${d}: ${a} thousand ha, ${p} thousand tonnes`).join('; ');
const AVG = Math.round((totProd() / totArea()) * 100) / 100;
const shareC = Math.round((DIST[2][1] / totArea()) * 1000) / 10;

// ---------------------------------------------------------------- t01 rice
add('rice-chk', mcq({
  stem: 'In the transplanting method, where are rice seedlings raised before they are planted in the main field?',
  right: 'In a small nursery bed where seed is sown thickly',
  wrong: ['In the main field after the wheat harvest, without water', 'In terraced tea gardens on hill slopes', 'In dry sandy soil far from any water'],
  sol: 'Seedlings grow in a nursery for four to six weeks — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('rice-chk2', mcq({
  stem: 'The Kuttanad region of Kerala and the Cauvery delta of Tamil Nadu are both important rice areas. What do they have in common?',
  right: 'Flat land, clayey alluvial soil, high temperatures and plenty of water',
  wrong: ['Sandy soil, cold winters and very little rain', 'Steep slopes with frost for several months', 'Black soil and a long dry season without irrigation'],
  sol: 'These are the conditions rice needs — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('rice-temp-mcq', mcq({
  stem: 'Farmers in the Cauvery delta of Tamil Nadu can grow two or even three rice crops in a year mainly because:',
  right: 'temperatures stay high all year and canal water is available in the dry months',
  wrong: ['the delta gets snow in winter', 'rice there needs no water', 'the soil is sandy and drains quickly'],
  sol: 'Year-round warmth plus irrigation allow several crops — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('rice-soil-mcq', mcq({
  stem: 'Why are heavy clayey soils of river deltas well suited to rice?',
  right: 'They hold water, so the fields stay flooded',
  wrong: ['They drain water away very quickly', 'They contain no nutrients', 'They stay frozen in winter'],
  sol: 'Rice needs standing water; clay holds it — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('transplant-adv-mcq', mcq({
  stem: 'Why do most farmers in the Ganga delta of West Bengal transplant their paddy rather than broadcast the seed?',
  right: 'Transplanting saves seed, gives evenly spaced plants and a higher yield',
  wrong: ['Transplanting needs no labour at all', 'Broadcast seed cannot grow in the delta', 'Transplanting lets rice grow without water'],
  sol: 'Nursery-raised seedlings in rows grow better — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('rice-states-mcq', mcq({
  stem: 'Which group consists of leading rice-producing states of India?',
  right: 'West Bengal, Uttar Pradesh and Punjab',
  wrong: ['Rajasthan, Gujarat and Himachal Pradesh', 'Goa, Sikkim and Mizoram', 'Jammu and Kashmir, Ladakh and Uttarakhand'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('rice-ar', ar({
  a: 'Rice is a kharif crop in most of India.',
  r: 'Rice needs high temperatures and plenty of water during growth, which the monsoon season provides.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('rice-ar2', ar({
  a: 'Some districts of West Bengal raise three rice crops in a year.',
  r: 'Rice is the staple food of most people in West Bengal.',
  key: 'b',
  sol: 'Both are true, but R does not explain A — three crops are possible because of year-round warmth, monsoon rain and irrigation — option (b).',
  d: 3, c: 'analysis', t: [1],
}));
add('rice-tf', tf({
  stem: 'Paddy can be grown well on the sand dunes around Jaisalmer without any irrigation.',
  key: 'f',
  sol: 'False: the area is too dry and the sandy soil cannot hold the standing water rice needs.',
  d: 1, c: 'application', t: [1],
}));
add('rice-fill', fill({
  stem: 'The method in which rice seedlings raised in a nursery are planted out in a flooded field is called ___.',
  acc: [['transplantation', 'transplanting']],
  sol: '**Transplantation**.',
  d: 1, c: 'recall', t: [1],
}));
add('rice-short1', short({
  marks: 1,
  stem: 'Name the state that is a leading producer of rice in India (the largest as of the early 2020s).',
  model: 'West Bengal.',
  sol: 'West Bengal.',
  scheme: [['West Bengal', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('rice-short2', short({
  marks: 2,
  stem: 'State the temperature and rainfall conditions required for rice.',
  model: 'High temperature, above about 22–25 °C throughout the growing season; heavy rainfall of 100–200 cm or more, with fields kept under standing water, or irrigation where rainfall is less.',
  sol: 'Temperature; rainfall.',
  scheme: [['Temperature', 1], ['Rainfall', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('rice-delta-short2', short({
  marks: 2,
  stem: 'Give two geographical reasons why the Krishna–Godavari delta of Andhra Pradesh is a major rice-growing area.',
  model: 'The delta has fertile, clayey alluvial soil that holds water, on flat land that is easy to flood; it is hot for most of the year and gets monsoon rain plus canal water from the two rivers, so two crops a year can be grown.',
  sol: 'Soil and relief; climate and water.',
  scheme: [['Soil or relief', 1], ['Temperature and water', 1]],
  d: 2, c: 'application', t: [1],
}));
add('rice-method-short3', short({
  marks: 3,
  stem: 'Describe the transplantation method of rice cultivation in three steps.',
  model: 'First, the seed is sown thickly in a small, well-watered nursery bed. Second, after about four to six weeks the young seedlings are pulled out in bundles. Third, they are planted in rows in the main field, which has been ploughed and puddled under standing water.',
  sol: 'Nursery; uproot; plant in flooded field.',
  scheme: [['Nursery', 1], ['Uprooting', 1], ['Planting in puddled field', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 wheat
add('wheat-chk', mcq({
  stem: 'Light winter showers in January help the wheat crop of Punjab and Haryana because they:',
  right: 'add moisture to the soil during the dry winter growing season',
  wrong: ['flood the fields for transplanting', 'raise the temperature for ripening', 'wash away all pests from the fields'],
  sol: 'Western disturbances bring useful winter rain — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('wheat-ripen-mcq', mcq({
  stem: 'Wheat sown near Hisar in Haryana in November is ready in April. Which weather in the last weeks before harvest helps its grain to ripen?',
  right: 'Warm, dry and sunny days',
  wrong: ['Heavy monsoon rain', 'Frost and snowfall', 'Cloudy, humid weather with drizzle'],
  sol: 'Ripening needs warmth and sunshine — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('wheat-soil-mcq', mcq({
  stem: 'Large areas of wheat are grown on the black soils of the Malwa plateau in Madhya Pradesh. This shows that wheat:',
  right: 'can grow on well-drained loamy and black soils, not only on river alluvium',
  wrong: ['needs flooded fields like rice', 'can grow only on sandy desert soils', 'cannot grow outside the Ganga plain'],
  sol: 'Wheat grows on loamy alluvium and on black soil — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('wheat-states-mcq', mcq({
  stem: 'Which state is a leading producer of wheat in India (the largest as of the early 2020s)?',
  right: 'Uttar Pradesh',
  wrong: ['Kerala', 'West Bengal', 'Assam'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('hail-mcq', mcq({
  stem: 'An unusually hot spell in March lowered the wheat yield in parts of Punjab. The most likely reason is that:',
  right: 'the grain ripened too quickly in the heat and shrivelled',
  wrong: ['the heat brought frost to the fields', 'the crop could not be sown in time', 'hot weather caused the fields to flood'],
  sol: 'Wheat needs a gradual, moderately warm ripening period — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('wheat-ar', ar({
  a: 'Wheat yields are high in Punjab and Haryana.',
  r: 'These states have assured irrigation, fertile alluvial soil and widespread use of HYV seeds.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'application', t: [2],
}));
add('wheat-ar2', ar({
  a: 'Wheat is a kharif crop of the Ganga plain.',
  r: 'Wheat needs a cool growing season.',
  key: 'd',
  sol: 'A is false (wheat is a rabi crop); R is true — option (d).',
  d: 2, c: 'understanding', t: [2],
}));
add('wheat-tf', tf({
  stem: 'Frost at the time of flowering can damage the wheat crop.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'understanding', t: [2],
}));
add('wheat-fill', fill({
  stem: 'Wheat is sown in October–December and harvested in March–April, so it is a ___ crop.',
  acc: [['rabi']],
  sol: '**Rabi**.',
  d: 1, c: 'recall', t: [2],
}));
add('wheat-short2', short({
  marks: 2,
  stem: 'Explain why wheat is grown as a rabi crop in north India and how winter rain helps it.',
  model: 'Wheat needs cool, moist weather while it grows and warm, dry, sunny weather to ripen, which the season from November to April provides. Light winter showers from western disturbances moisten the soil during the dry growing period, reducing the need for irrigation.',
  sol: 'Cool growing, warm ripening; winter rain adds moisture.',
  scheme: [['Rabi reason', 1], ['Winter rain', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('wheat-short3', short({
  marks: 3,
  stem: 'Name three leading wheat-producing states and explain why yields are high in any one of them.',
  model: 'Uttar Pradesh, Punjab and Madhya Pradesh (also Haryana, Rajasthan). In Punjab yields are high because canals and tube wells give assured irrigation, the alluvial soil is fertile and well drained, and farmers use HYV seeds and fertilisers (winter rain also helps).',
  sol: 'Three states; reasons for one.',
  scheme: [['States', 1], ['First reason', 1], ['Second reason', 1]],
  d: 2, c: 'application', t: [2],
}));
add('ricewheat-short3', short({
  marks: 3,
  stem: 'A field near Ludhiana grows paddy in one season and wheat in the next. Contrast the two crops in terms of (a) season, (b) water needs and (c) temperature needs.',
  model: '(a) Paddy is a kharif crop grown from about June to October; wheat is a rabi crop grown from about November to April. (b) Paddy needs a great deal of water and standing water in the field (here from canals and tube wells); wheat needs only moderate water, about 50–75 cm. (c) Paddy needs high temperatures throughout; wheat needs cool weather to grow and warm weather to ripen.',
  sol: 'Season; water; temperature.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [1, 2],
}));

// ---------------------------------------------------------------- t03 millets
add('millet-chk', mcq({
  stem: 'Millets cover large areas of the dry interior of Karnataka and Maharashtra because they:',
  right: 'tolerate drought, ripen quickly and grow on poor soils',
  wrong: ['need standing water in the fields', 'require frost to form grain', 'grow only on fertile delta alluvium'],
  sol: 'Millets are hardy dryland crops — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('jowar-mcq', mcq({
  stem: 'Which state is a leading producer of jowar (as of the early 2020s)?',
  right: 'Maharashtra',
  wrong: ['Punjab', 'West Bengal', 'Kerala'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('bajra-mcq', mcq({
  stem: 'Bajra fields stretch across the sandy land around Churu and Jhunjhunu in Rajasthan. Which feature of bajra explains this?',
  right: 'It grows with very little rain on light, sandy soils',
  wrong: ['It needs flooded fields for most of its growth', 'It grows only in cool winter weather', 'It needs heavy clayey soils'],
  sol: 'Bajra is the hardiest millet — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('ragi-mcq', mcq({
  stem: 'Farmers on the red-soil plateau around Kolar in Karnataka, with moderate and uncertain rain, often grow ragi rather than rice. The best reason is that ragi:',
  right: 'grows well on red, light soils and needs far less water than rice',
  wrong: ['needs standing water like rice', 'grows only in snowy regions', 'needs black cotton soil to survive'],
  sol: 'Ragi is a hardy millet of red soils — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('millet-nutri-mcq', mcq({
  stem: 'Nutrition experts recommend adding ragi and jowar to school midday meals because millets are:',
  right: 'rich in fibre, iron and calcium',
  wrong: ['free of all carbohydrates', 'the richest source of animal protein', 'always cheaper than water'],
  sol: 'Millets are nutritious — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('millet-ar', ar({
  a: 'Millets are widely grown in the rain-shadow areas of the Deccan plateau.',
  r: 'Millets need little water and can withstand dry spells.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'application', t: [3],
}));
add('millet-ar2', ar({
  a: 'Jowar is grown as a rabi crop in parts of Maharashtra and Karnataka.',
  r: 'Jowar needs standing water throughout its growth.',
  key: 'c',
  sol: 'A is true (rabi jowar uses moisture stored in black soil); R is false — option (c).',
  d: 3, c: 'analysis', t: [3],
}));
add('millet-tf', tf({
  stem: 'Millets need more water than rice.',
  key: 'f',
  sol: 'False: millets need far less water than rice.',
  d: 1, c: 'understanding', t: [3],
}));
add('millet-fill', fill({
  stem: 'Pearl millet, the hardiest millet of the sandy plains of Rajasthan, is commonly known in India as ___.',
  acc: [['bajra']],
  sol: '**Bajra**.',
  d: 1, c: 'recall', t: [3],
}));
add('millet-short2', short({
  marks: 2,
  stem: 'Explain two reasons why millets are suited to dry areas and poor soils.',
  model: 'They are drought-tolerant and have a short growing season, so they ripen before the soil dries out; they can grow on thin, sandy or red soils with few inputs of water or fertiliser.',
  sol: 'Drought tolerance and short season; poor soils, few inputs.',
  scheme: [['First reason', 1], ['Second reason', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('millet-short3', short({
  marks: 3,
  stem: 'Name one leading state (as of the early 2020s) for each of jowar, bajra and ragi, and state one soil or rainfall condition for each.',
  model: 'Jowar — Maharashtra; black or red soil, about 50–100 cm of rain. Bajra — Rajasthan; light sandy soil, about 40–50 cm. Ragi — Karnataka; red, light soils with moderate rain.',
  sol: 'State and condition for each.',
  scheme: [['Jowar', 1], ['Bajra', 1], ['Ragi', 1]],
  d: 2, c: 'recall', t: [3],
}));
add('millet-adv-short2', short({
  marks: 2,
  stem: 'A farmer near Solapur in Maharashtra has shallow black soil and about 60 cm of uncertain rain. Advise him whether to grow rice or jowar, giving two reasons.',
  model: 'Jowar. Solapur lies in a rain-shadow area and 60 cm of uncertain rain is far too little for rice, which needs over 100 cm and standing water; jowar tolerates dry spells and grows on black soil, even as a rabi crop using moisture stored after the rains.',
  sol: 'Jowar; rain too low for rice, jowar drought-tolerant on black soil.',
  scheme: [['Choice with water reason', 1], ['Soil or drought reason', 1]],
  d: 2, c: 'application', t: [1, 3],
}));

// ---------------------------------------------------------------- t04 pulses
add('pulse-chk', mcq({
  stem: 'Farmers in Madhya Pradesh often sow gram after harvesting soya bean. Including a pulse such as gram in the rotation helps because:',
  right: 'bacteria in its root nodules fix nitrogen from the air, enriching the soil',
  wrong: ['gram needs more fertiliser than any other crop', 'gram must be grown under standing water', 'gram removes all nutrients from the soil'],
  sol: 'Legumes fix nitrogen — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('pulse-states-mcq', mcq({
  stem: 'Which state is a leading producer of pulses in India (the largest as of the early 2020s)?',
  right: 'Madhya Pradesh',
  wrong: ['Kerala', 'Punjab', 'Assam'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('pulse-diet-mcq', mcq({
  stem: 'Dal made from arhar or moong is eaten daily in millions of Indian homes. Pulses are especially important in the Indian diet because:',
  right: 'they are the main source of protein for a large vegetarian population',
  wrong: ['they are the main source of fat', 'they contain no protein but much sugar', 'they are eaten only during festivals'],
  sol: 'Protein for vegetarians — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('gram-mcq', mcq({
  stem: 'Gram (chana) in Rajasthan is sown in October–November and harvested in March. It is therefore a:',
  right: 'rabi pulse',
  wrong: ['kharif pulse', 'zayad cereal', 'plantation crop'],
  sol: 'Sown after the monsoon, harvested in spring — option (@K).',
  d: 1, c: 'application', t: [4],
}));
add('arhar-mcq', mcq({
  stem: 'Which pair names a kharif pulse first and a rabi pulse second?',
  right: 'Arhar, then gram',
  wrong: ['Gram, then arhar', 'Masoor, then peas', 'Wheat, then moong'],
  sol: 'Arhar (tur) is kharif; gram is rabi — option (@K).',
  d: 2, c: 'analysis', t: [4],
}));
add('pulse-import-mcq', mcq({
  stem: 'India grows more pulses than almost any other country, yet it still imports pulses (as of the early 2020s). The main reason is that:',
  right: 'demand is larger than production, because most pulses are rain-fed with low yields',
  wrong: ['Indian soils cannot grow any pulses', 'pulses are not eaten in India', 'all Indian pulses are exported'],
  sol: 'Low yields and huge demand — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('pulse-ar', ar({
  a: 'Pulses improve the fertility of the soil.',
  r: 'Leguminous plants have root nodules containing nitrogen-fixing bacteria.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('pulse-ar2', ar({
  a: 'Pulses are grown mostly as rain-fed crops in the drier parts of India.',
  r: 'Pulses are a cheap source of protein.',
  key: 'b',
  sol: 'Both are true, but R does not explain A — pulses grow in dry areas because they need little water — option (b).',
  d: 3, c: 'analysis', t: [4],
}));
add('pulse-tf', tf({
  stem: 'Pulses need large doses of chemical nitrogen fertiliser to grow well.',
  key: 'f',
  sol: 'False: pulses fix their own nitrogen through root nodules.',
  d: 2, c: 'understanding', t: [4],
}));
add('pulse-fill', fill({
  stem: 'Gram, arhar and moong belong to the ___ family of plants, whose root nodules fix nitrogen.',
  acc: [['legume', 'leguminous', 'pea']],
  sol: '**Legume** (leguminous) family.',
  d: 1, c: 'recall', t: [4],
}));
add('pulse-tf2', tf({
  stem: 'Arhar (tur) is sown at the start of the south-west monsoon and is a kharif pulse.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [4],
}));
add('nodule-fill', fill({
  stem: 'Small swellings on the roots of gram plants, which hold nitrogen-fixing bacteria, are called root ___.',
  acc: [['nodules', 'nodule']],
  sol: 'Root **nodules**.',
  d: 1, c: 'recall', t: [4],
}));
add('wheat-short1', short({
  marks: 1,
  stem: 'Name the weather systems that bring light winter rain to the wheat fields of Punjab and Haryana.',
  model: 'Western disturbances.',
  sol: 'Western disturbances.',
  scheme: [['Western disturbances', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('pulse-short2', short({
  marks: 2,
  stem: 'Give one reason why pulses are important in crop rotation and one reason why they are important in the Indian diet.',
  model: 'Crop rotation: their root nodules hold bacteria that fix nitrogen from the air, so the soil is richer for the next crop and less fertiliser is needed. Diet: they are the main source of protein for India’s large vegetarian population.',
  sol: 'Nitrogen fixation; protein.',
  scheme: [['Rotation', 1], ['Diet', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('pulse-short3', short({
  marks: 3,
  stem: 'Name two kharif pulses and two rabi pulses, and name two leading pulse-producing states.',
  model: 'Kharif: arhar (tur) and moong (or urad). Rabi: gram and masoor (or peas). States: Madhya Pradesh and Maharashtra (also Rajasthan, Uttar Pradesh, Karnataka).',
  sol: 'Kharif; rabi; states.',
  scheme: [['Kharif pulses', 1], ['Rabi pulses', 1], ['States', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('pulse-eval-short2', short({
  marks: 2,
  stem: 'Some planners suggest replacing part of the summer paddy area of Punjab with pulses such as moong. Give one argument for and one against this idea.',
  model: 'For: pulses need far less water than paddy, so groundwater would be saved, and they add nitrogen to the soil. Against: farmers earn assured income from paddy through government purchase, and pulse yields are lower and prices less certain, so incomes might fall unless purchase is guaranteed.',
  sol: 'For: water and soil; against: income risk.',
  scheme: [['For', 1], ['Against', 1]],
  d: 3, c: 'evaluation', t: [1, 4],
}));

// ---------------------------------------------------------------- illustrative district data
const yB = yld('B');
add('data-chk', mcq({
  stem: `Illustrative rice figures are as follows — ${distList}. Which district has the highest yield?`,
  right: 'District A',
  wrong: ['District B', 'District C', 'District D'],
  sol: `Yields: A ${fmt(yld('A'))}, B ${yld('B')}, C ${yld('C')}, D ${yld('D')} t/ha — option (@K).`,
  d: 1, c: 'application', t: [1],
}), () => [...DIST].sort((a, b) => b[2] / b[1] - a[2] / a[1])[0][0] === 'A' || 'highest');
add('lowest-mcq', mcq({
  stem: `Illustrative rice figures are as follows — ${distList}. The district with the lowest yield is most likely one where:`,
  right: 'District C — rice is largely rain-fed on poorer upland soils',
  wrong: ['District A — fields are fully canal-irrigated', 'District B — the delta has canals and alluvium', 'District D — it has the largest area under rice'],
  sol: `C has the lowest yield (${yld('C')} t/ha), typical of rain-fed farming — option (@K).`,
  d: 3, c: 'analysis', t: [1],
}), () => [...DIST].sort((a, b) => a[2] / a[1] - b[2] / b[1])[0][0] === 'C' || 'lowest');
add('yieldB-num', num({
  stem: `In an illustrative region, District B produces ${DIST[1][2]} thousand tonnes of rice from ${DIST[1][1]} thousand hectares. What is its yield in tonnes per hectare?`,
  value: yB, tol: 0, unit: 't/ha',
  sol: `Yield $= ${DIST[1][2]} \\div ${DIST[1][1]} = ${yB}$ t/ha.`,
  scheme: [[`${yB} t/ha`, 1]],
  d: 1, c: 'application', t: [1],
}), () => 1050 / 300 === yB || 'yield B');
add('avg-num', num({
  stem: `Illustrative rice figures are as follows — ${distList}. What is the average yield of the whole region in tonnes per hectare?`,
  value: AVG, tol: 0, unit: 't/ha',
  sol: `Average $= ${totProd()} \\div ${totArea()} = ${fmt(AVG)}$ t/ha.`,
  scheme: [[`${fmt(AVG)} t/ha`, 1]],
  d: 2, c: 'application', t: [1],
}), () => 4500 / 1500 === AVG || 'average');
add('shareC-num', num({
  stem: `In an illustrative region of four districts with ${totArea()} thousand hectares under rice in all, District C has ${DIST[2][1]} thousand hectares. What percentage of the region’s rice area lies in District C?`,
  value: shareC, tol: 0, unit: '%',
  sol: `Share $= \\dfrac{${DIST[2][1]}}{${totArea()}} \\times 100 = ${shareC}$%.`,
  scheme: [[`${shareC}%`, 1]],
  d: 2, c: 'application', t: [1],
}), () => shareC === 40 || 'share');
add('prodD-num', num({
  stem: `District D (illustrative) has ${DIST[3][1]} thousand hectares under rice and a yield of ${yld('D')} tonnes per hectare. What is its production in thousand tonnes?`,
  value: DIST[3][2], tol: 0, unit: 'thousand tonnes',
  sol: `Production $= ${yld('D')} \\times ${DIST[3][1]} = ${DIST[3][2]}$ thousand tonnes.`,
  scheme: [[`${DIST[3][2]} thousand tonnes`, 1]],
  d: 2, c: 'application', t: [1],
}), () => yld('D') * DIST[3][1] === DIST[3][2] || 'production');

// ---------------------------------------------------------------- match
add('crop-match', match({
  marks: 2,
  stem: 'Match each crop in Column A with the condition that especially suits it in Column B.',
  pairs: [
    ['Rice', 'Standing water and over 100 cm of rain'],
    ['Wheat', 'Cool growing season and warm, dry ripening'],
    ['Bajra', 'Light sandy soil and about 40–50 cm of rain'],
    ['Gram', 'Rabi season; roots that fix nitrogen'],
  ],
  order: [3, 0, 2, 1],
  sol: 'Rice → standing water; wheat → cool then warm; bajra → sandy soil; gram → rabi legume.',
  d: 2, c: 'understanding', t: [1, 2, 3, 4],
}));
add('state-match', match({
  marks: 2,
  stem: 'Match each crop in Column A with a leading producing state (as of the early 2020s) in Column B.',
  pairs: [
    ['Rice', 'West Bengal'],
    ['Wheat', 'Uttar Pradesh'],
    ['Bajra', 'Rajasthan'],
    ['Ragi', 'Karnataka'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Rice → West Bengal; wheat → Uttar Pradesh; bajra → Rajasthan; ragi → Karnataka.',
  d: 1, c: 'recall', t: [1, 2, 3],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('rice-long', long({
  stem: '(a) State the temperature and rainfall needed for rice. [2]\n\n(b) Which type of soil suits rice? Why? [2]\n\n(c) Describe the transplantation method of growing rice. [3]\n\n(d) Name three leading rice-producing states and explain why West Bengal can grow more than one rice crop a year. [3]',
  model: '(a) High temperature, above about 22–25 °C throughout growth; heavy rainfall of 100–200 cm or more, or irrigation.\n\n(b) Heavy clayey or loamy alluvium, as in deltas and river valleys, because it holds water and keeps the fields flooded.\n\n(c) Seed is sown thickly in a nursery bed; after four to six weeks the seedlings are uprooted in bundles; they are planted in rows in a field that has been ploughed and puddled under standing water.\n\n(d) West Bengal, Uttar Pradesh and Punjab (also Andhra Pradesh, Odisha, Tamil Nadu). West Bengal is warm all year, gets heavy monsoon rain and has irrigation and fertile delta soils, so aus, aman and boro crops can follow one another.',
  sol: 'Climate; soil; transplanting; states and West Bengal.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 2, c: 'understanding', t: [1],
}));
add('wheat-long', long({
  stem: '(a) State the temperature conditions wheat needs during growth and during ripening. [2]\n\n(b) What is the source of winter rain in Punjab, and how does it help wheat? [2]\n\n(c) Describe how wheat is cultivated, from sowing to harvesting. [3]\n\n(d) Name the two main wheat-growing zones of India and give one reason why Punjab has high wheat yields. [3]',
  model: '(a) Cool, moist weather of about 10–15 °C while growing; warm, dry, sunny weather of about 20–25 °C while ripening.\n\n(b) Western disturbances; light showers add moisture to the soil in the dry winter and reduce the need for irrigation.\n\n(c) The field is ploughed after the kharif harvest; seed is drilled or broadcast in October–December; the crop is irrigated four to six times and given fertiliser; it is harvested in March–April, often by combine harvester, and threshed.\n\n(d) The Ganga–Satluj plains of the north-west and the black-soil region of the Deccan and Malwa. Punjab has assured canal and tube-well irrigation (also fertile alluvium, HYV seeds, winter rain).',
  sol: 'Temperature; winter rain; cultivation; zones.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 2, c: 'understanding', t: [2],
}));
add('millet-long', long({
  stem: '(a) Why are millets often called dryland crops? Give two reasons. [2]\n\n(b) State the rainfall and soil needed for jowar and name a leading jowar state. [2]\n\n(c) Compare bajra and ragi with respect to soil and a leading state. [3]\n\n(d) Explain why the area under millets fell after the Green Revolution and why millets are now being encouraged again. [3]',
  model: '(a) They tolerate drought and have a short growing season; they grow on poor, sandy or shallow soils with little irrigation.\n\n(b) About 50–100 cm of rain; black or red soils of the Deccan. Maharashtra (as of the early 2020s).\n\n(c) Bajra grows on light sandy soils with very low rain (about 40–50 cm), and Rajasthan leads; ragi grows on red and light soils with moderate rain, and Karnataka leads.\n\n(d) Irrigation, HYV seeds and support prices made rice and wheat more profitable, so farmers switched from millets. Millets are now encouraged because they are rich in fibre, iron and calcium, need little water in an age of falling water tables, and suit rain-fed farms threatened by uncertain monsoons.',
  sol: 'Dryland; jowar; bajra and ragi; decline and revival.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 3, c: 'analysis', t: [3],
}));
add('pulse-long', long({
  stem: '(a) Name two kharif and two rabi pulses. [2]\n\n(b) State the climatic conditions suited to pulses. [2]\n\n(c) Explain the importance of pulses in crop rotation and in the Indian diet. [3]\n\n(d) Name two leading pulse-producing states and explain why India still imports pulses although it is a very large producer. [3]',
  model: '(a) Kharif: arhar (tur), moong (or urad). Rabi: gram, masoor (or peas).\n\n(b) Moderate temperatures of about 20–27 °C and low to moderate rainfall (roughly 25–60 cm); they grow mostly without irrigation on light loams, black and red soils.\n\n(c) Their root nodules contain bacteria that fix atmospheric nitrogen, so a pulse crop leaves the soil richer for the next cereal and saves fertiliser; they are the main source of protein for India’s large vegetarian population and are cheap compared with animal protein.\n\n(d) Madhya Pradesh and Maharashtra (also Rajasthan, Uttar Pradesh). Most pulses are rain-fed with low yields, the area under them has not grown as fast as demand, and demand is very large, so production falls short (as of the early 2020s).',
  sol: 'Kinds; climate; importance; states and imports.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 3, c: 'analysis', t: [4],
}));
add('data-long', long({
  stem: `Study these illustrative rice figures — ${distList}.\n\n(a) Calculate the yields of District A and District C. [2]\n\n(b) Calculate the average yield of the whole region. [2]\n\n(c) One district is a canal-irrigated alluvial plain and another is a rain-fed upland. Identify each, giving reasons from the data. [3]\n\n(d) Suggest three measures to raise the yield of the lowest-yielding district. [3]`,
  model: `(a) A $= ${DIST[0][2]} \\div ${DIST[0][1]} = ${fmt(yld('A'))}$ t/ha; C $= ${DIST[2][2]} \\div ${DIST[2][1]} = ${yld('C')}$ t/ha.\n\n(b) $${totProd()} \\div ${totArea()} = ${fmt(AVG)}$ t/ha.\n\n(c) District A is the canal-irrigated plain: it has the highest yield (${fmt(yld('A'))} t/ha), well above the average, as assured water, HYV seeds and fertiliser allow. District C is the rain-fed upland: it has the lowest yield (${yld('C')} t/ha) despite the largest area, typical of uncertain rain and poorer soils.\n\n(d) Provide irrigation through tanks, wells or check dams; use HYV or drought-tolerant varieties with balanced fertiliser; adopt better methods such as transplanting in rows and soil and water conservation (also credit and training).`,
  sol: `${fmt(yld('A'))} and ${yld('C')} t/ha; ${fmt(AVG)} t/ha; A irrigated, C rain-fed; measures.`,
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 4, c: 'analysis', t: [1],
}), () => (yld('A') === 4 && yld('C') === 2.25 && AVG === 3) || 'data');
