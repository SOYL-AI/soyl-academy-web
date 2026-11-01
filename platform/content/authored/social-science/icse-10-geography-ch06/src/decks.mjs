// ICSE 10 Geography ch06 Climate of India — two decks: Part 1 (t01–t03) factors affecting India's climate, distribution of
// temperature, rainfall and winds in summer and winter, the monsoon and its mechanism; Part 2 (t04–t06) the four seasons,
// local winds and seasonal weather, interpreting climate data (illustrative station data computed from svgs.mjs).
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { CLIMO_P, CLIMO_Q, CLIMO_R, MONSOON, STATIONS, range, total } from './svgs.mjs';

const V = {
  monsoon: svgV(MONSOON, 'Summer and winter panels: low pressure over land draws moist sea winds in summer; high pressure over land sends dry winds to the sea in winter'),
  p: svgV(CLIMO_P, 'Climate graph of an illustrative west-coast station with very heavy rain from June to September and a small temperature range'),
  q: svgV(CLIMO_Q, 'Climate graph of an illustrative northern-plain station with hot summers, cool winters and moderate monsoon rain'),
  r: svgV(CLIMO_R, 'Climate graph of an illustrative south-east coast station with most rain from October to December'),
};
const P = STATIONS.P;
const Q = STATIONS.Q;
const R = STATIONS.R;
const rOND = R.rain[9] + R.rain[10] + R.rain[11];

export const deck1 = deck({
  part: 1,
  title: 'Climate of India — Part 1: Controls of climate and the monsoon',
  goals: [
    'Explain how latitude, altitude, distance from the sea, winds, the Himalayas, jet streams and El Niño affect India’s climate',
    'Describe the pattern of temperature, rainfall and winds in summer and in winter',
    'Explain the mechanism of the south-west monsoon',
  ],
  slides: [
    sl('title', 'One country, many climates', {
      b: 'Part 1 — India has a **tropical monsoon** climate, yet Leh freezes while Chennai sweats, and Mawsynram floods while western Rajasthan stays dry. Several controls explain the differences.',
      v: table(['Place type', 'Typical climate feature'], [['Himalayan town', 'Cold winters, snowfall'], ['Thar desert', 'Very hot days, scanty rain'], ['Konkan coast', 'Mild temperatures, very heavy summer rain'], ['Tamil Nadu coast', 'Rain mainly in October–December']], 'Table of four types of place in India and a typical feature of the climate of each'),
      n: 'Namaste! India is one country but has many climates. Mountain towns get snow, the desert bakes, the west coast is drenched in summer, and the Tamil Nadu coast gets its rain in early winter. All of India shares a tropical monsoon climate, but several factors make each region different. In this part we look at those factors and at the monsoon itself.',
    }),
    sl('concept', 'Factors affecting India’s climate (1)', {
      b: '**Latitude:** the Tropic of Cancer runs through the middle of India; the south lies in the tropical zone (hot all year), the north in the sub-tropical zone (greater seasonal contrast). **Altitude:** temperature falls with height (about 6.5 °C per km), so hill stations such as Shimla and Ooty are cool. **Distance from the sea (continentality):** the sea warms and cools slowly, so coastal places have a **small annual range** (equable climate) while interior places have a **large range** (extreme climate) — Mumbai’s range is small, Delhi’s large.',
      v: table(['Factor', 'Example of its effect'], [['Latitude', 'South warmer in winter than the north'], ['Altitude', 'Shimla cooler than Chandigarh in summer'], ['Distance from sea', 'Mumbai equable, Delhi extreme']], 'Table of three climatic factors and examples of their effects'),
      n: 'Three factors come first. Latitude: the Tropic of Cancer crosses the middle of India, so the south is hot all year while the north has warm summers and cool winters. Altitude: temperature drops with height, so hill stations are cool. Distance from the sea: the sea heats and cools slowly, so coastal Mumbai has a small difference between summer and winter, while inland Delhi has a large one.',
    }),
    sl('concept', 'Factors affecting India’s climate (2)', {
      b: '**Winds:** the seasonal reversal of winds (monsoon) brings rain in summer and dry weather in winter. **The Himalayas:** they block the cold Central Asian winds in winter, keeping north India warmer, and force the monsoon winds to rise and shed rain over the plains. **Jet streams:** fast upper-air westerly winds south of the Himalayas in winter bring **western disturbances**; their shift north in summer, and an easterly jet over the peninsula, help the monsoon set in. **El Niño:** warming of the eastern Pacific Ocean every few years tends to **weaken the Indian monsoon**, causing droughts.',
      v: table(['Factor', 'Effect on India'], [['Monsoon winds', 'Wet summers, dry winters'], ['Himalayas', 'Block cold winds; cause relief rain'], ['Jet streams', 'Western disturbances; monsoon onset'], ['El Niño', 'Often a weak monsoon']], 'Table of four more climatic factors and their effects on India'),
      n: 'The monsoon winds themselves change direction with the seasons, bringing rain in summer and dry weather in winter. The Himalayas shut out freezing winds from Central Asia and make the moist monsoon winds rise and rain over the plains. Fast winds high in the sky, called jet streams, guide winter storms into the north and help start the monsoon. And El Niño, a warming of the far Pacific Ocean, often weakens the monsoon.',
    }),
    sl('check', 'Quick check: climatic factors', {
      b: 'Link a factor to its effect on climate.',
      n: 'Quick check. Coastal places have a small annual range of temperature because of the sea.',
      chk: 'factor-mcq',
    }),
    sl('concept', 'Summer and winter patterns', {
      b: '**Summer (March–May):** the sun is overhead near the Tropic of Cancer; temperatures rise from south to north, reaching 45 °C or more in the north-west; a low-pressure area forms over north-west India; hot dry winds (loo) blow in the north. **Winter (December–February):** temperatures fall from south to north; the north-west gets very cold, with frost and snow in the hills; high pressure over the north-west sends dry winds out towards the sea; rain only in the north-west (western disturbances) and on the Tamil Nadu coast.',
      v: table(['Feature', 'Summer', 'Winter'], [['Hottest / coldest region', 'North-west plains', 'North-west and Himalayas'], ['Pressure over north-west India', 'Low', 'High'], ['Winds over land', 'Hot, dry (loo)', 'Dry, offshore (north-east)'], ['Rain', 'Pre-monsoon showers', 'North-west (western disturbances), Tamil Nadu coast']], 'Table comparing temperature, pressure, winds and rain in summer and winter'),
      n: 'In summer the sun shines almost straight down on northern India, so temperatures climb towards the north-west, sometimes above forty five degrees, and a region of low pressure forms there. In winter the pattern reverses: the north-west becomes the coldest part, high pressure builds over it, and dry winds blow out towards the sea. Winter rain falls only in the north-west and on the Tamil Nadu coast.',
    }),
    sl('diagram', 'The monsoon: a seasonal reversal of winds', {
      b: 'The word **monsoon** comes from the Arabic *mausim*, “season”. **Mechanism:** in summer the land heats much faster than the sea; intense **low pressure** develops over north-west India while **high pressure** lies over the Indian Ocean. The **ITCZ** (low-pressure belt) shifts north over the Ganga plain, and the south-east trade winds of the southern hemisphere cross the Equator, are **deflected to the right** (Coriolis effect) and blow as the **south-west monsoon**, laden with moisture. In winter the pressure pattern reverses and dry north-east winds blow from land to sea.',
      v: V.monsoon,
      n: 'Monsoon means a seasonal wind. In summer the land heats up much faster than the sea, so low pressure develops over north-west India while the ocean stays under high pressure. The trade winds of the southern hemisphere cross the Equator, swing to the right, and blow in from the south-west, full of moisture: the south-west monsoon. In winter the land cools, high pressure forms over it, and dry winds blow out to sea.',
    }),
    sl('example', 'Worked example: explaining monsoon behaviour', {
      b: '**Problem.** Explain (a) why the south-west monsoon is a moist wind, (b) why it is called “south-west” although it starts as a south-east trade wind, and (c) why the monsoon failed in some El Niño years.\n\n**(a)** It crosses thousands of kilometres of warm Indian Ocean, picking up water vapour.\n\n**(b)** On crossing the Equator, the Earth’s rotation deflects it to the right, so it arrives from the south-west.\n\n**(c)** El Niño warms the eastern Pacific, shifting low pressure away from the Indian region and weakening the pressure difference that drives the monsoon.',
      v: flow('LR', [['a', 'SE trade winds (southern hemisphere)'], ['b', 'Cross the Equator'], ['c', 'Deflected right (Coriolis)'], ['d', 'SW monsoon over India']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of south-east trade winds crossing the Equator and turning into the south-west monsoon'),
      n: 'The monsoon is moist because it blows over a huge stretch of warm ocean before reaching India. It begins as a south-east trade wind south of the Equator, but once it crosses the Equator the spin of the Earth turns it to the right, so it arrives from the south-west. In El Niño years the eastern Pacific is unusually warm, which weakens the pressure pattern that pulls the monsoon in, and rainfall can fail.',
    }),
    sl('check', 'Quick check: the monsoon mechanism', {
      b: 'Explain a step in the onset of the south-west monsoon.',
      n: 'Quick check. In summer the land is under low pressure and the sea under high pressure.',
      chk: 'mech-mcq',
    }),
    sl('concept', 'Arabian Sea and Bay of Bengal branches', {
      b: 'The south-west monsoon reaches the **Kerala coast around 1 June** (the “burst” of the monsoon) and splits into two branches. The **Arabian Sea branch** strikes the Western Ghats, giving very heavy rain on the windward western slopes and little on the leeward Deccan plateau (**rain-shadow area**). The **Bay of Bengal branch** moves north-east, is deflected west by the Himalayas and the Garo–Khasi hills, gives very heavy rain in the north-east (Mawsynram, Cherrapunji) and decreasing rain westward along the Ganga plain. The monsoon covers the whole country by mid-July.',
      v: table(['Branch', 'Strikes', 'Heavy rain in', 'Rain-shadow or dry'], [['Arabian Sea', 'Western Ghats', 'Konkan and Malabar coasts', 'Leeward Deccan'], ['Bay of Bengal', 'North-east hills, Himalayas', 'Meghalaya, Assam, West Bengal', 'Rain decreases westward to Rajasthan']], 'Table of the two branches of the south-west monsoon and the areas they affect'),
      n: 'The monsoon arrives on the Kerala coast around the first of June, with a sudden burst of rain, and divides into two branches. The Arabian Sea branch hits the Western Ghats and pours rain on their western slopes, leaving the land beyond in a rain shadow. The Bay of Bengal branch is turned westward by the mountains of the north-east, drenching Meghalaya, and gives less and less rain as it moves up the Ganga plain.',
    }),
    sl('example', 'Worked example: why the west coast is wetter', {
      b: '**Problem.** Mangaluru on the west coast receives far more rain in July than Bengaluru on the plateau, though both lie at similar latitudes. Explain.\n\n**Step 1.** The Arabian Sea branch meets the Western Ghats almost at right angles.\n\n**Step 2.** Forced to rise, the air cools and its vapour condenses: heavy **orographic (relief) rain** on the windward side, where Mangaluru lies.\n\n**Step 3.** Descending on the leeward side, the air warms and dries, so Bengaluru lies in a partial **rain-shadow**.',
      v: flow('LR', [['a', 'Moist SW wind'], ['b', 'Rises over Western Ghats'], ['c', 'Cools, heavy rain on windward side'], ['d', 'Descends, warms, dry leeward side']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of relief rainfall over the Western Ghats with a rain-shadow beyond'),
      n: 'Both towns lie at about the same latitude, so the difference comes from relief. The monsoon wind blows straight into the Western Ghats, rises, cools and drops heavy rain on the western side, where Mangaluru is. On the far side the air sinks and warms, so it holds on to its moisture, leaving the plateau around Bengaluru much drier.',
    }),
    sl('check', 'Quick check: branches of the monsoon', {
      b: 'Identify where a monsoon branch gives heavy rain or a rain-shadow.',
      n: 'Quick check. Windward slopes are wet; leeward areas lie in a rain shadow.',
      chk: 'branch-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Controls: latitude, altitude, distance from the sea, winds, Himalayas, jet streams, El Niño.',
        'Summer: low pressure over the north-west, loo, highest temperatures in the north-west; winter: high pressure, cold north-west, offshore winds.',
        'Monsoon: seasonal reversal of winds caused by differential heating of land and sea and the northward shift of the ITCZ.',
        'Arabian Sea branch: Western Ghats, rain-shadow Deccan; Bay of Bengal branch: north-east India, decreasing westward.',
      ],
      v: table(['Season', 'Pressure over land', 'Wind'], [['Summer', 'Low', 'SW, moist'], ['Winter', 'High', 'NE, dry']], 'Summary table of pressure and winds in summer and winter'),
      n: 'Let us sum up Part 1. India’s climate is controlled by latitude, altitude, distance from the sea, the winds, the Himalayas, jet streams and El Niño. In summer, low pressure over the land draws in the moist south-west monsoon; in winter, high pressure sends dry winds out to sea. The monsoon’s two branches drench the west coast and the north-east.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Explain the monsoon with three steps: differential heating, pressure difference, deflection of winds.',
        'Use the terms windward, leeward and rain-shadow with named places.',
        'For “equable vs extreme”, compare a coastal and an interior city.',
        'Mention the Himalayas both as a barrier to cold winds and as a cause of rain.',
      ],
      v: table(['Slip', 'Fix'], [['Monsoon blows from land in summer', 'From sea to land in summer'], ['Rain-shadow on the windward side', 'On the leeward side'], ['El Niño strengthens the monsoon', 'It usually weakens it']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some tips. Explain the monsoon step by step: the land heats more than the sea, pressure differences form, and the winds are deflected as they cross the Equator. Name places when you write windward, leeward or rain shadow. Compare a coastal and an inland city for equable and extreme climates. And remember that El Niño usually weakens the monsoon.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Climate of India — Part 2: Seasons, local winds and climate data',
  goals: [
    'Describe temperature, pressure, winds and rainfall in each of the four seasons',
    'Explain why the Tamil Nadu coast gets rain in winter',
    'Name the local winds and storms of the hot season and explain western disturbances',
    'Calculate annual range and total rainfall from a station’s data and identify its location',
  ],
  slides: [
    sl('title', 'The year in four seasons', {
      b: 'Part 2 — the Indian Meteorological Department recognises four seasons. Each has its own pressure, winds and weather, and each leaves a signature in a station’s climate graph.',
      v: table(['Season', 'Months (approx.)'], [['Hot weather season', 'March–May'], ['South-west monsoon season', 'June–September'], ['Retreating monsoon season', 'October–November'], ['Cold weather season', 'December–February']], 'Table of the four seasons of India and their approximate months'),
      n: 'India’s year is divided into four seasons: the hot weather season from March to May, the south-west monsoon from June to September, the retreating monsoon in October and November, and the cold weather season from December to February. Each season has its own winds and weather, and in this part we also learn to read the story of a place’s climate from a graph.',
    }),
    sl('concept', 'Hot weather and south-west monsoon seasons', {
      b: '**Hot weather (March–May):** temperatures rise northward; low pressure over the north-west; dry hot winds; local storms (next slide). **South-west monsoon (June–September):** onset in Kerala about 1 June; most of India gets **75–90% of its annual rain**; rainfall is **uncertain and uneven** — with **breaks** of dry spells, heavy rain on windward slopes, and decreasing rain from east to west in the north. Temperatures drop slightly when the rains arrive, but humidity is high.',
      v: table(['Feature', 'Hot weather', 'SW monsoon'], [['Temperature', 'Rising, highest in NW', 'Slightly lower, humid'], ['Pressure over land', 'Low, deepening', 'Low'], ['Winds', 'Hot, dry, variable', 'Moist south-westerly'], ['Rain', 'Local pre-monsoon showers', 'Most of the year’s rain']], 'Table comparing the hot weather and south-west monsoon seasons'),
      n: 'In the hot weather season the land heats up steadily and the low pressure over the north-west deepens. Then, from early June, the south-west monsoon arrives and brings most of the year’s rain to most of India. Monsoon rain is uncertain: it may come early or late, and there are dry breaks between wet spells. Temperatures fall a little, but the air stays humid.',
    }),
    sl('concept', 'Retreating monsoon and cold weather seasons', {
      b: '**Retreating monsoon (October–November):** the sun moves south, the low pressure over the north weakens and the monsoon withdraws; clear skies and high humidity cause oppressive “**October heat**”. Winds over the Bay of Bengal now blow from the **north-east**, pick up moisture over the bay and bring **heavy rain to the Tamil Nadu coast** (which lies in the rain-shadow of the south-west monsoon). Tropical **cyclones** from the Bay strike the east coast. **Cold weather (December–February):** clear, cool, dry; frost in the north-west; snow in the Himalayas; rain from western disturbances in Punjab and Haryana (useful for wheat).',
      v: table(['Feature', 'Retreating monsoon', 'Cold weather'], [['Temperature', 'High humidity, “October heat”', 'Cool to cold; frost in NW'], ['Winds', 'NE over the Bay of Bengal', 'Dry NE trades over land'], ['Rain', 'Tamil Nadu coast; cyclones on east coast', 'Western disturbances in NW; Tamil Nadu']], 'Table comparing the retreating monsoon and cold weather seasons'),
      n: 'In October and November the monsoon withdraws as the sun moves south. Skies clear, but humidity stays high, giving uncomfortable October heat. Winds now blow from the north-east across the Bay of Bengal, gather moisture, and bring heavy rain to the Tamil Nadu coast, which missed most of the summer monsoon. Cyclones may strike the east coast. The cold season that follows is clear and dry, with frost in the north-west and snow in the hills.',
    }),
    sl('check', 'Quick check: seasons', {
      b: 'Match a weather feature with its season.',
      n: 'Quick check. The Tamil Nadu coast gets most of its rain from the retreating monsoon.',
      chk: 'season-mcq',
    }),
    sl('concept', 'Local winds and seasonal weather', {
      b: '**Loo:** strong, hot, dry winds blowing in the afternoons over the northern plains in May–June; can cause heatstroke. **Mango showers:** pre-monsoon thundershowers in Kerala and coastal Karnataka that help mangoes ripen. **Kalbaisakhi** (“calamity of Baisakh”): violent evening thunderstorms with strong winds in West Bengal and Assam in April–May; useful for tea, jute and rice. **Blossom showers:** pre-monsoon showers in Karnataka that help coffee flowers bloom. **Western disturbances:** low-pressure systems from the Mediterranean region, carried east by the westerly jet stream in winter; they bring light rain to Punjab, Haryana and western Uttar Pradesh (good for wheat) and snow to the western Himalayas.',
      v: table(['Name', 'Season', 'Region', 'Effect'], [['Loo', 'May–June', 'Northern plains', 'Heatstroke'], ['Mango showers', 'April–May', 'Kerala, coastal Karnataka', 'Ripens mangoes'], ['Kalbaisakhi', 'April–May', 'West Bengal, Assam', 'Helps tea, jute, rice'], ['Blossom showers', 'April–May', 'Karnataka', 'Coffee flowering'], ['Western disturbances', 'Winter', 'North-west India', 'Rain for wheat, Himalayan snow']], 'Table of local winds and seasonal weather with season, region and effect'),
      n: 'Several local winds and showers have names. The loo is a scorching afternoon wind over the northern plains in early summer. Mango showers in Kerala help mangoes ripen, and blossom showers in Karnataka help coffee plants flower. Kalbaisakhi are violent evening storms in Bengal and Assam that help tea and jute. In winter, western disturbances drift in from the Mediterranean region and bring gentle rain for wheat in the north-west.',
    }),
    sl('example', 'Worked example: why does Chennai get winter rain?', {
      b: '**Problem.** Chennai receives most of its rain in October–December, unlike most of India. Explain.\n\n**Step 1.** During June–September Chennai lies in the **rain-shadow** of the Western Ghats and the south-west monsoon blows parallel to the coast — little rain.\n\n**Step 2.** In October–November, as the monsoon retreats, winds over the Bay of Bengal blow from the **north-east**.\n\n**Step 3.** Crossing the bay, they pick up moisture and strike the Coromandel coast, giving heavy rain; cyclones add more.',
      v: flow('LR', [['a', 'Retreat of SW monsoon'], ['b', 'NE winds over Bay of Bengal'], ['c', 'Pick up moisture'], ['d', 'Heavy rain on Tamil Nadu coast']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow explaining the winter rain of the Tamil Nadu coast'),
      n: 'During the summer monsoon, Chennai is sheltered by the Western Ghats and the winds blow along its coast rather than onto it, so it gets little rain. When the monsoon retreats, winds over the Bay of Bengal swing round to come from the north-east. They gather moisture over the bay and hit the Tamil Nadu coast head-on, giving it most of its rain in October to December.',
    }),
    sl('check', 'Quick check: local winds', {
      b: 'Identify a local wind or seasonal storm.',
      n: 'Quick check. Kalbaisakhi are evening thunderstorms of Bengal; the loo is a hot wind of the northern plains.',
      chk: 'local-mcq',
    }),
    sl('diagram', 'Reading a climate graph: a west-coast station', {
      b: `**Annual range of temperature** = highest monthly mean − lowest monthly mean. **Total rainfall** = sum of the twelve monthly totals. For Station P (illustrative data): range $= ${Math.max(...P.temp)} - ${Math.min(...P.temp)} = ${range(P)}$ °C (small → **coastal**, equable); total rainfall $= ${total(P)}$ mm, almost all in **June–September** (south-west monsoon); hottest month May (before the rains). A west-coast station facing the Arabian Sea branch.`,
      v: V.p,
      n: 'To read a climate graph, find the annual range of temperature by subtracting the coldest month’s mean from the hottest month’s mean, and add up the twelve rainfall bars for the total. This station has a range of only about five and a half degrees, which tells us it is on the coast, and over two thousand millimetres of rain, nearly all from June to September. It must be on the west coast, facing the monsoon.',
    }),
    sl('diagram', 'An interior station', {
      b: `Station Q (illustrative): range $= ${Math.max(...Q.temp)} - ${Math.min(...Q.temp)} = ${range(Q)}$ °C (large → **interior**, extreme climate); January mean ${Q.temp[0]} °C (cool winter: northern latitude); total rainfall ${total(Q)} mm, mostly July–August, with a little winter rain (**western disturbances**). A station on the northern plains.`,
      v: V.q,
      n: 'This station has a very large annual range, nearly twenty degrees, so it must be far from the sea. Its cool January points to a northern location. Its moderate rainfall comes mainly in July and August, with a little in winter from western disturbances. All this fits a city on the northern plains.',
    }),
    sl('example', 'Worked example: identifying a station', {
      b: `**Problem.** Station R (illustrative) has the data shown. (a) Find its annual range of temperature and total rainfall. (b) In which months does it get most rain, and why? (c) Is it coastal or interior?\n\n**(a)** Range $= ${Math.max(...R.temp)} - ${Math.min(...R.temp)} = ${range(R)}$ °C; total $= ${total(R)}$ mm.\n\n**(b)** October–December: $${R.rain[9]} + ${R.rain[10]} + ${R.rain[11]} = ${rOND}$ mm, about ${Math.round((rOND / total(R)) * 100)}% of the year’s rain — from the **retreating (north-east) monsoon**.\n\n**(c)** Small range (${range(R)} °C) → coastal: the **Coromandel (Tamil Nadu) coast**.`,
      v: V.r,
      n: 'Subtract the lowest monthly temperature from the highest to get a range of eight degrees, which is small, so the station is near the sea. Adding the rainfall bars gives about twelve hundred and forty millimetres, and more than half of it falls from October to December. Rain at that time of year comes from the retreating monsoon, so this is a station on the Tamil Nadu coast.',
    }),
    sl('check', 'Quick check: climate data', {
      b: 'Calculate an annual range or identify a station from its data.',
      n: 'Quick check. A small range means a coastal station; winter rain in the south-east means the Tamil Nadu coast.',
      chk: 'data-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Hot weather (Mar–May), SW monsoon (Jun–Sep), retreating monsoon (Oct–Nov), cold weather (Dec–Feb).',
        'Tamil Nadu coast: rain-shadow in summer; heavy rain from NE winds and cyclones in Oct–Dec.',
        'Local weather: loo, mango showers, blossom showers, Kalbaisakhi; western disturbances bring winter rain to the north-west.',
        'From a station’s figures: range = highest − lowest monthly mean; total = sum of monthly rain; small range → coastal; season of maximum rain → location.',
      ],
      v: table(['Station clue', 'Inference'], [['Range under about 8 °C', 'Coastal or southern'], ['Range over about 15 °C', 'Interior, northern'], ['Rain peak Jun–Sep', 'SW monsoon region'], ['Rain peak Oct–Dec', 'Tamil Nadu coast']], 'Summary table of clues in climate data and what they show'),
      n: 'Let us sum up Part 2. India has four seasons: hot weather, south-west monsoon, retreating monsoon and cold weather. The Tamil Nadu coast is wettest in early winter. Local winds and showers such as the loo, mango showers and Kalbaisakhi mark the hot season, and western disturbances bring winter rain to the north-west. From a station’s data, the range and the timing of rain tell us where it is.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Show the subtraction for annual range and the addition for total rainfall.',
        'Name the season of maximum rainfall and the wind that brings it.',
        'Link local winds to their region and effect on crops.',
        'Climate-data questions often ask: coastal or interior? north or south? which monsoon?',
      ],
      v: table(['Slip', 'Fix'], [['Range = highest − lowest rainfall', 'Use temperatures'], ['Tamil Nadu rain from SW monsoon', 'From the retreating (NE) monsoon'], ['Western disturbances in summer', 'They come in winter']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. In climate data questions, show your subtraction for the range and your addition for the total rainfall. Say which months are wettest and which wind brings the rain. Link each local wind to its region and its effect. And remember that western disturbances are a winter feature.',
    }),
  ],
});
