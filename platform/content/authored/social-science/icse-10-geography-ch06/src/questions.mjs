// ICSE 10 Geography ch06 Climate of India — question bank (ICSE 2027 specimen style). Climate-data items use the
// ILLUSTRATIVE station data exported by svgs.mjs, and every computed answer is asserted. MCQ keys are placed by the builder.
import { mk, add } from './lib.mjs';
import { STATIONS, range, total } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const P = STATIONS.P;
const Q = STATIONS.Q;
const R = STATIONS.R;
const fmt = (a) => a.join(', ');

// ---------------------------------------------------------------- t01 factors
add('factor-mcq', mcq({
  stem: 'Mumbai has a much smaller difference between its May and January temperatures than Delhi. The main reason is:',
  right: 'Mumbai lies on the coast, where the sea moderates temperature',
  wrong: ['Mumbai is at a higher altitude than Delhi', 'Mumbai lies north of the Tropic of Cancer', 'Mumbai receives western disturbances'],
  sol: 'Continentality: coastal places have an equable climate — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('altitude-mcq', mcq({
  stem: 'In May, Shimla is much cooler than Chandigarh, though the two are only about 100 km apart. This is mainly due to:',
  right: 'altitude',
  wrong: ['latitude', 'distance from the sea', 'El Niño'],
  sol: 'Temperature falls with height; Shimla is over 2000 m higher — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('himalaya-mcq', mcq({
  stem: 'Which statement about the Himalayas and India’s climate is correct?',
  right: 'They keep out cold Central Asian winds in winter and make monsoon winds rise and shed rain',
  wrong: ['They bring cold winds into India in winter', 'They prevent the monsoon from reaching the Ganga plain', 'They cause the western disturbances'],
  sol: 'Barrier and relief effects — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('elnino-mcq', mcq({
  stem: 'Meteorologists issue a warning of a possibly weak monsoon when they observe:',
  right: 'unusually warm surface water in the eastern Pacific Ocean (El Niño)',
  wrong: ['heavy snow in the western Himalayas in December', 'a cold winter in Punjab', 'early mango showers in Kerala'],
  sol: 'El Niño years often bring a deficient Indian monsoon — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('tropic-tf', tf({
  stem: 'The Tropic of Cancer passes through the middle of India, dividing it into a tropical and a sub-tropical part.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [1],
}));
add('equable-fill', fill({
  stem: 'A climate with a small annual range of temperature, typical of coastal places, is called an ___ climate.',
  acc: [['equable', 'maritime']],
  sol: '**Equable** (maritime).',
  d: 1, c: 'recall', t: [1],
}));
add('factor-ar', ar({
  a: 'Places in the northern plains are colder in winter than places at the same height in the peninsula.',
  r: 'The northern plains lie in the sub-tropical zone, farther from the Equator.',
  key: 'a',
  sol: 'Both are true, and R explains A (latitude) — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('factor-short2', short({
  marks: 2,
  stem: 'Give two ways in which the Himalayas influence the climate of India.',
  model: 'They act as a barrier to the bitterly cold winds from Central Asia, keeping north India warmer in winter; they force the moist monsoon winds to rise, giving heavy rain to the northern plains and north-east (and trap the monsoon within the subcontinent).',
  sol: 'Barrier; relief rain.',
  scheme: [['Barrier to cold winds', 1], ['Cause of monsoon rain', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('distance-short3', short({
  marks: 3,
  stem: 'Explain how (a) distance from the sea, (b) altitude and (c) the jet stream affect the climate of named parts of India.',
  model: '(a) Coastal Mumbai or Chennai has a small annual range because the sea heats and cools slowly; interior Delhi or Nagpur has a large range. (b) Hill stations such as Shimla, Darjeeling or Ooty are cool because temperature falls with height. (c) The westerly jet stream steers western disturbances into Punjab, Haryana and Jammu and Kashmir in winter, bringing rain and snow; its shift northward in summer helps the monsoon to set in.',
  sol: 'Continentality; altitude; jet stream.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 summer and winter
add('summer-mcq', mcq({
  stem: 'In May, the lowest atmospheric pressure in India is found over:',
  right: 'north-west India and the Thar desert',
  wrong: ['the Kerala coast', 'the Bay of Bengal', 'the Andaman Islands'],
  sol: 'Intense heating creates a low over the north-west — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('winter-mcq', mcq({
  stem: 'In January, which of these places is likely to record frost at night?',
  right: 'Ludhiana in Punjab',
  wrong: ['Thiruvananthapuram in Kerala', 'Mumbai in Maharashtra', 'Port Blair in the Andaman Islands'],
  sol: 'The north-west plains are the coldest part of the plains in winter — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('winter-tf', tf({
  stem: 'In winter, temperatures in India generally decrease from south to north.',
  key: 't',
  sol: 'True: the south is closer to the Equator.',
  d: 1, c: 'understanding', t: [2],
}));
add('summer-short2', short({
  marks: 2,
  stem: 'State two differences between the pressure and wind conditions over north-west India in summer and in winter.',
  model: 'Summer: low pressure over north-west India, with hot dry winds (loo) and inflowing moist winds later. Winter: high pressure over north-west India, with cold dry winds blowing outward towards the sea (north-east winds).',
  sol: 'Low vs high pressure; inflow vs outflow.',
  scheme: [['Pressure', 1], ['Winds', 1]],
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 monsoon mechanism
add('mech-mcq', mcq({
  stem: 'In June, moist winds blow from the Indian Ocean towards the Indian landmass because:',
  right: 'the heated land has low pressure while the ocean has higher pressure',
  wrong: ['the land is cooler than the ocean', 'the Himalayas push winds southward', 'western disturbances pull winds inland'],
  sol: 'Winds blow from high to low pressure — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('branch-mcq', mcq({
  stem: 'Pune, just east of the Western Ghats, receives much less monsoon rain than Mumbai on the coast. Pune lies in the:',
  right: 'rain-shadow area of the Arabian Sea branch',
  wrong: ['path of the Bay of Bengal branch', 'region of western disturbances', 'zone of the retreating monsoon'],
  sol: 'Leeward side of the Ghats — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('burst-mcq', mcq({
  stem: 'The sudden onset of heavy monsoon rain on the Kerala coast in early June is called:',
  right: 'the burst of the monsoon',
  wrong: ['the break of the monsoon', 'the retreat of the monsoon', 'October heat'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('deflect-mcq', mcq({
  stem: 'The south-east trade winds become the south-west monsoon after crossing the Equator because:',
  right: 'the rotation of the Earth deflects them to the right in the northern hemisphere',
  wrong: ['they are blocked by the Himalayas', 'they meet the loo over Rajasthan', 'El Niño reverses them'],
  sol: 'Coriolis deflection — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('ne-mcq', mcq({
  stem: 'Rainfall from the Bay of Bengal branch decreases from Kolkata to Delhi to Bikaner mainly because:',
  right: 'the winds lose moisture as they travel farther inland',
  wrong: ['the land rises steadily towards the west', 'the winds blow from the Thar desert', 'western disturbances block them'],
  sol: 'Moisture is used up along the way — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('monsoon-ar', ar({
  a: 'The Konkan coast receives very heavy rain from the south-west monsoon.',
  r: 'The monsoon winds blow almost parallel to the Western Ghats.',
  key: 'c',
  sol: 'A is true; R is false: the winds strike the Ghats almost at right angles and rise, giving heavy rain — option (c).',
  d: 3, c: 'analysis', t: [3],
}));
add('monsoon-ar2', ar({
  a: 'Mawsynram in Meghalaya is one of the wettest places on Earth.',
  r: 'Moist winds of the Bay of Bengal branch are trapped and forced up by the funnel-shaped Khasi hills.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('monsoon-tf', tf({
  stem: 'The word monsoon comes from an Arabic word meaning “season”.',
  key: 't',
  sol: 'True: mausim.',
  d: 1, c: 'recall', t: [3],
}));
add('rainshadow-fill', fill({
  stem: 'The area on the leeward side of a mountain range that receives little rain is called a ___ area.',
  acc: [['rain-shadow', 'rain shadow', 'rainshadow']],
  sol: '**Rain-shadow**.',
  d: 1, c: 'recall', t: [3],
}));
add('mech-short3', short({
  marks: 3,
  stem: 'Explain the mechanism of the south-west monsoon in three steps.',
  model: '(1) In summer the land heats much faster than the sea, creating intense low pressure over north-west India while high pressure lies over the Indian Ocean. (2) The ITCZ shifts north over the Ganga plain, and the south-east trade winds are drawn across the Equator towards this low. (3) On crossing the Equator they are deflected to the right by the Earth’s rotation and blow from the south-west, laden with moisture from the ocean.',
  sol: 'Heating → pressure → deflected moist winds.',
  scheme: [['Differential heating and pressure', 1], ['Movement of winds/ITCZ', 1], ['Deflection and moisture', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('branch-short2', short({
  marks: 2,
  stem: 'Name the two branches of the south-west monsoon and one region that gets very heavy rain from each.',
  model: 'Arabian Sea branch — Western Ghats / Konkan and Malabar coasts. Bay of Bengal branch — Meghalaya (Mawsynram, Cherrapunji) / Assam.',
  sol: 'Two branches with regions.',
  scheme: [['Arabian Sea branch', 1], ['Bay of Bengal branch', 1]],
  d: 1, c: 'recall', t: [3],
}));

// ---------------------------------------------------------------- t04 seasons
add('season-mcq', mcq({
  stem: 'The Coromandel coast of Tamil Nadu receives most of its annual rainfall during:',
  right: 'October to December, from the retreating (north-east) monsoon',
  wrong: ['June to September, from the Arabian Sea branch', 'March to May, from mango showers', 'January to February, from western disturbances'],
  sol: 'North-east winds over the Bay of Bengal — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('october-mcq', mcq({
  stem: '“October heat” is experienced because:',
  right: 'skies clear after the monsoon while the air remains hot and humid',
  wrong: ['the loo blows in October', 'western disturbances bring hot winds', 'the sun is overhead at the Tropic of Cancer in October'],
  sol: 'High temperature with high humidity — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('cyclone-mcq', mcq({
  stem: 'Tropical cyclones most often strike the coasts of Odisha and Andhra Pradesh during:',
  right: 'the retreating monsoon season',
  wrong: ['the cold weather season', 'the onset of the south-west monsoon only', 'the hot weather season only'],
  sol: 'Cyclones form over the Bay of Bengal in October–November — option (@K).',
  d: 2, c: 'recall', t: [4],
}));
add('break-tf', tf({
  stem: 'Monsoon rainfall is continuous from June to September without any dry spells.',
  key: 'f',
  sol: 'False: there are breaks (dry spells) within the monsoon.',
  d: 1, c: 'understanding', t: [4],
}));
add('season-fill', fill({
  stem: 'The season from October to November, when the monsoon withdraws, is called the ___ monsoon season.',
  acc: [['retreating', 'withdrawing']],
  sol: '**Retreating**.',
  d: 1, c: 'recall', t: [4],
}));
add('season-ar', ar({
  a: 'The Tamil Nadu coast receives little rain from the south-west monsoon.',
  r: 'It lies in the rain-shadow of the Western Ghats, and the Bay of Bengal branch blows nearly parallel to its coast.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 3, c: 'analysis', t: [4],
}));
add('season-short3', short({
  marks: 3,
  stem: 'Describe the cold weather season in India with reference to (a) temperature, (b) winds and pressure and (c) rainfall.',
  model: '(a) Temperatures fall from south to north; the north-west is coldest with frost; snow in the Himalayas. (b) High pressure over the north-west; light dry north-east winds blow outward from land to sea. (c) Generally dry, except light rain from western disturbances in the north-west and rain on the Tamil Nadu coast from north-east winds.',
  sol: 'Temperature; winds; rainfall.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('chennai-short2', short({
  marks: 2,
  stem: 'Give two reasons why Chennai receives most of its rainfall in October–December.',
  model: 'During the south-west monsoon it lies in the rain-shadow and the winds blow parallel to its coast; in October–December north-east winds pick up moisture over the Bay of Bengal and strike the coast (cyclones add rain).',
  sol: 'Rain-shadow in summer; NE winds in winter.',
  scheme: [['Summer reason', 1], ['Winter reason', 1]],
  d: 2, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- t05 local winds
add('local-mcq', mcq({
  stem: 'Violent evening thunderstorms with strong winds that occur in West Bengal and Assam in April–May are called:',
  right: 'Kalbaisakhi',
  wrong: ['Loo', 'Mango showers', 'Western disturbances'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('mango-mcq', mcq({
  stem: 'A fruit grower in coastal Karnataka welcomes the pre-monsoon showers of late April. These are:',
  right: 'mango showers, which help the mangoes ripen',
  wrong: ['the loo, which dries the fruit', 'western disturbances, which help wheat', 'Kalbaisakhi, which help jute'],
  sol: 'Option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('wd-mcq', mcq({
  stem: 'Light winter rain in Punjab and Haryana, useful for the wheat crop, is brought by:',
  right: 'western disturbances from the Mediterranean region',
  wrong: ['the south-west monsoon', 'the retreating monsoon over the Bay of Bengal', 'the loo'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('loo-ar', ar({
  a: 'The loo can cause heatstroke in the northern plains.',
  r: 'The loo is a hot, dry wind that blows in the afternoons of May and June.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 1, c: 'understanding', t: [5],
}));
add('blossom-fill', fill({
  stem: 'Pre-monsoon showers in Karnataka that help coffee plants to flower are called ___ showers.',
  acc: [['blossom', 'cherry blossom']],
  sol: '**Blossom** showers.',
  d: 1, c: 'recall', t: [5],
}));
add('local-match', match({
  marks: 2,
  stem: 'Match each local weather phenomenon in Column A with the region in Column B.',
  pairs: [
    ['Loo', 'Northern plains'],
    ['Kalbaisakhi', 'West Bengal and Assam'],
    ['Mango showers', 'Kerala and coastal Karnataka'],
    ['Western disturbances', 'Punjab and Haryana'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Loo → northern plains; Kalbaisakhi → Bengal, Assam; mango showers → Kerala, coastal Karnataka; western disturbances → Punjab, Haryana.',
  d: 1, c: 'recall', t: [5],
}));
add('wd-short2', short({
  marks: 2,
  stem: 'What are western disturbances? State their importance for agriculture in north-west India.',
  model: 'Low-pressure weather systems that originate over the Mediterranean region and are carried eastward by the westerly jet stream in winter. They bring light rain to Punjab, Haryana and western Uttar Pradesh, which is very useful for the rabi (wheat) crop, and snow to the Himalayas.',
  sol: 'Definition; rain for wheat.',
  scheme: [['Definition', 1], ['Importance', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('local-short1', short({
  marks: 1,
  stem: 'Name the hot, dry wind that blows over the northern plains in May and June.',
  model: 'Loo.',
  sol: 'Loo.',
  scheme: [['Loo', 1]],
  d: 1, c: 'recall', t: [5],
}));

// ---------------------------------------------------------------- t06 climate data
const rP = range(P);
const rQ = range(Q);
const rR = range(R);
const tR = total(R);
const tQ = total(Q);
add('data-mcq', mcq({
  stem: `A station’s monthly mean temperatures (°C), January to December, are: ${fmt(Q.temp)}. Its annual range of temperature is:`,
  right: `${rQ} °C`,
  wrong: [`${Math.max(...Q.temp)} °C`, `${Math.min(...Q.temp)} °C`, '12 °C'],
  sol: `Range $= ${Math.max(...Q.temp)} - ${Math.min(...Q.temp)} = ${rQ}$ °C — option (@K).`,
  d: 2, c: 'application', t: [6],
}), () => rQ === 19.5 || 'range');
add('identify-mcq', mcq({
  stem: `A station has an annual range of ${rR} °C and receives about ${Math.round(((R.rain[9] + R.rain[10] + R.rain[11]) / tR) * 100)}% of its rain in October–December. It is most likely located on the:`,
  right: 'Coromandel (Tamil Nadu) coast',
  wrong: ['Konkan coast', 'northern plains', 'Thar desert'],
  sol: 'Small range → coastal; winter rain → retreating monsoon on the south-east coast — option (@K).',
  d: 3, c: 'analysis', t: [6],
}));
add('pq-mcq', mcq({
  stem: `Two stations have annual ranges of ${rP} °C and ${rQ} °C. Which conclusion is most reasonable?`,
  right: 'The first is near the sea; the second is in the interior',
  wrong: ['The first is in the interior; the second is near the sea', 'Both are hill stations', 'Both receive rain only in winter'],
  sol: 'Small range → maritime; large range → continental — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('total-num', num({
  stem: `A station’s monthly rainfall (mm), January to December, is: ${fmt(R.rain)}. What is its total annual rainfall in mm?`,
  value: tR, tol: 0, unit: 'mm',
  sol: `Total $= ${R.rain.join(' + ')} = ${tR}$ mm.`,
  scheme: [[`${tR} mm`, 1]],
  d: 2, c: 'application', t: [6],
}), () => tR === 1244 || 'total');
add('range-num', num({
  stem: `A station’s monthly mean temperatures (°C), January to December, are: ${fmt(P.temp)}. What is its annual range of temperature in °C?`,
  value: rP, tol: 0, unit: '°C',
  sol: `Range $= ${Math.max(...P.temp)} - ${Math.min(...P.temp)} = ${rP}$ °C.`,
  scheme: [[`${rP} °C`, 1]],
  d: 2, c: 'application', t: [6],
}), () => rP === 5.6 || 'range');
const jjas = Q.rain[5] + Q.rain[6] + Q.rain[7] + Q.rain[8];
add('share-num', num({
  stem: `A station’s monthly rainfall (mm), January to December, is: ${fmt(Q.rain)}. How many millimetres fall in June–September?`,
  value: jjas, tol: 0, unit: 'mm',
  sol: `June–September $= ${Q.rain[5]} + ${Q.rain[6]} + ${Q.rain[7]} + ${Q.rain[8]} = ${jjas}$ mm (of a total ${tQ} mm).`,
  scheme: [[`${jjas} mm`, 1]],
  d: 2, c: 'application', t: [6],
}), () => jjas === 630 || 'jjas');
add('data-tf', tf({
  stem: 'The annual range of temperature is the difference between the highest and lowest monthly mean temperatures of a station.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [6],
}));
add('data-short3', short({
  marks: 3,
  stem: `Study the data for a station. Temperature (°C): ${fmt(P.temp)}. Rainfall (mm): ${fmt(P.rain)}. (a) Calculate the annual range of temperature. (b) Calculate the total rainfall. (c) Is the station coastal or interior, and which wind brings most of its rain? Give a reason.`,
  model: `(a) $${Math.max(...P.temp)} - ${Math.min(...P.temp)} = ${rP}$ °C. (b) ${total(P)} mm. (c) Coastal (small range); most rain falls in June–September from the south-west monsoon (Arabian Sea branch), so it is on the west coast.`,
  sol: `${rP} °C; ${total(P)} mm; coastal, SW monsoon.`,
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'analysis', t: [6],
}), () => total(P) === 2063 || 'total');

// ---------------------------------------------------------------- additional items
const hotIdx = P.temp.indexOf(Math.max(...P.temp));
const MONTHNAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
add('hotmonth-mcq', mcq({
  stem: `A west-coast station’s monthly mean temperatures (°C), January to December, are: ${fmt(P.temp)}. Its hottest month is May rather than June because:`,
  right: 'from June, monsoon clouds and rain lower the temperature',
  wrong: ['the sun is overhead at the station only in May', 'western disturbances cool it in June', 'the loo blows on the coast in June'],
  sol: `Highest value ${Math.max(...P.temp)} °C in ${MONTHNAMES[hotIdx]}; cloud cover and rain cool June — option (@K).`,
  d: 3, c: 'analysis', t: [4, 6],
}), () => hotIdx === 4 || 'month');
add('nw-mcq', mcq({
  stem: 'A station has a large annual range of temperature (about 20 °C), most of its rain in July–August, and a little rain in January–February. It most probably lies in:',
  right: 'the north-western plains',
  wrong: ['the Konkan coast', 'the Coromandel coast', 'the Andaman Islands'],
  sol: 'Extreme climate, monsoon rain and winter rain from western disturbances — option (@K).',
  d: 3, c: 'analysis', t: [5, 6],
}));
add('windward-mcq', mcq({
  stem: 'A moist wind blowing from the west meets a north–south mountain range. Heavy rain is most likely:',
  right: 'on the western (windward) slopes',
  wrong: ['on the eastern (leeward) slopes', 'equally on both slopes', 'only on the summit plateau beyond the range'],
  sol: 'Air rises and cools on the windward side — option (@K).',
  d: 2, c: 'application', t: [3],
}));
const ond = R.rain[9] + R.rain[10] + R.rain[11];
add('ond-num', num({
  stem: `A south-east coast station’s rainfall (mm) for October, November and December is ${R.rain[9]}, ${R.rain[10]} and ${R.rain[11]}. How much rain (mm) falls in these three months?`,
  value: ond, tol: 0, unit: 'mm',
  sol: `Rain $= ${R.rain[9]} + ${R.rain[10]} + ${R.rain[11]} = ${ond}$ mm.`,
  scheme: [[`${ond} mm`, 1]],
  d: 1, c: 'application', t: [6],
}), () => ond === 770 || 'ond');
add('rangeR-num', num({
  stem: `A station’s monthly mean temperatures (°C), January to December, are: ${fmt(R.temp)}. Find its annual range of temperature in °C.`,
  value: rR, tol: 0, unit: '°C',
  sol: `Range $= ${Math.max(...R.temp)} - ${Math.min(...R.temp)} = ${rR}$ °C.`,
  scheme: [[`${rR} °C`, 1]],
  d: 1, c: 'application', t: [6],
}));
add('totalQ-tf', tf({
  stem: `A station whose monthly rainfall (mm) is ${fmt(Q.rain)} receives more than 1000 mm a year.`,
  key: 'f',
  sol: `False: the total is ${tQ} mm.`,
  d: 2, c: 'application', t: [6],
}), () => tQ < 1000 || 'total');
add('kochi-short2', short({
  marks: 2,
  stem: 'Predict, with a reason, which of Kochi (on the Kerala coast) and Nagpur (in the centre of the peninsula) has the larger annual range of temperature, and which receives more rain in June–July.',
  model: 'Nagpur has the larger range: it is far from the sea (continental climate), while Kochi is moderated by the sea. Kochi gets more rain: it faces the Arabian Sea branch of the south-west monsoon first, while Nagpur lies inland.',
  sol: 'Nagpur larger range; Kochi more rain.',
  scheme: [['Range with reason', 1], ['Rain with reason', 1]],
  d: 3, c: 'application', t: [1, 3],
}));
add('jet-mcq', mcq({
  stem: 'The westerly jet stream affects India’s winter weather by:',
  right: 'steering western disturbances into north-west India',
  wrong: ['bringing the south-west monsoon to Kerala', 'causing the loo', 'creating cyclones in the Bay of Bengal'],
  sol: 'Option (@K).',
  d: 2, c: 'understanding', t: [1, 5],
}));

// ---------------------------------------------------------------- match
add('season-match', match({
  marks: 2,
  stem: 'Match each season in Column A with a feature in Column B.',
  pairs: [
    ['Hot weather season', 'Loo over the northern plains'],
    ['South-west monsoon', 'Burst of rain on the Kerala coast'],
    ['Retreating monsoon', 'October heat'],
    ['Cold weather season', 'Frost in Punjab'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Hot weather → loo; SW monsoon → burst in Kerala; retreating → October heat; cold weather → frost.',
  d: 2, c: 'application', t: [4, 5],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('factor-long', long({
  stem: '(a) Name two factors that make the climate of Mumbai different from that of Delhi. [2]\n\n(b) How does El Niño affect the Indian monsoon? [2]\n\n(c) Explain the role of the Himalayas in the climate of India. [3]\n\n(d) Explain how the jet stream and western disturbances affect the weather of north-west India in winter. [3]',
  model: '(a) Distance from the sea (Mumbai coastal, equable; Delhi interior, extreme) and latitude (Delhi farther north, colder winters); also rainfall from the Arabian Sea branch.\n\n(b) El Niño, a warming of the eastern Pacific, weakens the pressure contrast that drives the monsoon, so India often gets deficient rain or drought.\n\n(c) They block cold Central Asian winds, keeping north India warmer in winter; they force the monsoon winds to rise, causing heavy rain on the plains and the north-east; they confine the monsoon to the subcontinent.\n\n(d) The westerly jet stream, flowing south of the Himalayas in winter, carries western disturbances from the Mediterranean region into north-west India; these bring cloudy weather, light rain for the wheat crop and snow in the western Himalayas.',
  sol: 'Factors; El Niño; Himalayas; jet stream.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 3, c: 'understanding', t: [1, 5],
}));
add('monsoon-long', long({
  stem: '(a) What is meant by the monsoon? [2]\n\n(b) State two features of monsoon rainfall in India. [2]\n\n(c) Explain the mechanism by which the south-west monsoon is set up over India. [3]\n\n(d) Explain why (i) the western slopes of the Western Ghats receive heavy rain, (ii) Meghalaya receives very heavy rain and (iii) rainfall decreases westward along the Ganga plain. [3]',
  model: '(a) A seasonal reversal of winds: moist south-west winds from sea to land in summer and dry north-east winds from land to sea in winter.\n\n(b) Uncertain (onset and amount vary); uneven in distribution; with breaks; most rain in four months (any two).\n\n(c) The land heats more than the sea, creating low pressure over north-west India and high pressure over the Indian Ocean; the ITCZ moves north; south-east trades cross the Equator, are deflected right and blow as moist south-west winds.\n\n(d) (i) The Arabian Sea branch strikes the Ghats at right angles and rises — relief rain. (ii) The Bay of Bengal branch is funnelled into the Khasi hills and forced up. (iii) The winds lose moisture as they move inland.',
  sol: 'Definition; features; mechanism; three reasons.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 3, c: 'analysis', t: [3, 4],
}));
add('season-long', long({
  stem: '(a) Name the four seasons of India with their months. [2]\n\n(b) What is “October heat”? Why does it occur? [2]\n\n(c) Explain why the Coromandel coast gets heavy rain in winter while most of India is dry. [3]\n\n(d) Name and describe three local weather phenomena of the hot weather season. [3]',
  model: '(a) Hot weather (March–May), south-west monsoon (June–September), retreating monsoon (October–November), cold weather (December–February).\n\n(b) Hot and humid weather in October; the monsoon has withdrawn and skies clear, but the ground and air are still moist, so the heat is oppressive.\n\n(c) As the monsoon retreats, winds over the Bay of Bengal blow from the north-east; they pick up moisture and strike the Tamil Nadu coast; cyclones add more rain. In summer this coast is in the rain-shadow.\n\n(d) Loo — hot dry afternoon wind of the northern plains; mango showers — pre-monsoon rain in Kerala and coastal Karnataka that ripens mangoes; Kalbaisakhi — violent evening storms of Bengal and Assam that help tea and jute (also blossom showers in Karnataka).',
  sol: 'Seasons; October heat; Coromandel rain; local weather.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 2, c: 'understanding', t: [4, 5],
}));
add('data-long', long({
  stem: `Study the data for Station X. Temperature (°C): ${fmt(Q.temp)}. Rainfall (mm): ${fmt(Q.rain)}.\n\n(a) Calculate the annual range of temperature. [2]\n\n(b) Calculate the total annual rainfall. [2]\n\n(c) Name the season of maximum rainfall and the wind responsible. Is the station coastal or interior? Give a reason. [3]\n\n(d) The station receives some rain in January and February. Name the cause, and state one crop that benefits. Suggest the part of India in which the station lies. [3]`,
  model: `(a) $${Math.max(...Q.temp)} - ${Math.min(...Q.temp)} = ${rQ}$ °C.\n\n(b) ${tQ} mm.\n\n(c) July–August (south-west monsoon season), brought by the Bay of Bengal branch of the south-west monsoon; interior, because the annual range (${rQ} °C) is large (extreme climate).\n\n(d) Western disturbances; wheat (rabi crop). The northern plains (north-west India, around Delhi or Haryana).`,
  sol: `${rQ} °C; ${tQ} mm; SW monsoon, interior; western disturbances.`,
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 4, c: 'analysis', t: [6],
}), () => tQ === 736 || 'total');
add('compare-long', long({
  stem: `Station P has temperatures (°C) ${fmt(P.temp)} and rainfall (mm) ${fmt(P.rain)}. Station R has temperatures ${fmt(R.temp)} and rainfall ${fmt(R.rain)}.\n\n(a) Calculate the annual range of each station. [2]\n\n(b) In which months does each receive most of its rain? [2]\n\n(c) Name the wind that brings most rain to each station and explain the difference. [3]\n\n(d) Suggest a likely location for each station and give one reason why both have a small annual range. [3]`,
  model: `(a) P: $${Math.max(...P.temp)} - ${Math.min(...P.temp)} = ${rP}$ °C; R: $${Math.max(...R.temp)} - ${Math.min(...R.temp)} = ${rR}$ °C.\n\n(b) P: June–September; R: October–December.\n\n(c) P: south-west monsoon (Arabian Sea branch), which strikes the west coast; R: the retreating / north-east monsoon over the Bay of Bengal, since R lies in the rain-shadow during the south-west monsoon.\n\n(d) P: west (Konkan/Malabar) coast; R: Coromandel (Tamil Nadu) coast. Both are coastal, and the sea moderates their temperatures.`,
  sol: 'Ranges; seasons; winds; locations.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 3, c: 'application', t: [4, 6],
}), () => rR === 8 || 'range');
