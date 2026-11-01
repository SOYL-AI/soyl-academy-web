// ICSE 10 Geography ch13 Food Crops — two decks: Part 1 (t01–t02) rice and wheat: requirements, methods of cultivation and
// producing states; Part 2 (t03–t04) millets and pulses, and reading an illustrative district yield table from svgs.mjs.
import { sl, deck, table, flow, svgV } from './lib.mjs';
import { TRANSPLANT, RAINBAND, YIELDCHART, DIST, yld, totArea, totProd } from './svgs.mjs';

const V = {
  tp: svgV(TRANSPLANT, 'Three panels: nursery bed, uprooted seedling bundles, and seedlings planted in rows in a flooded field'),
  rain: svgV(RAINBAND, 'Range chart of approximate rainfall needs of rice, wheat, jowar, bajra and gram'),
  yc: svgV(YIELDCHART, 'Bar chart of illustrative rice yields of four districts'),
};
const avg = Math.round((totProd() / totArea()) * 100) / 100;
const fmt = (v) => (Number.isInteger(v) ? v.toFixed(1) : String(v));

export const deck1 = deck({
  part: 1,
  title: 'Food Crops — Part 1: Rice and wheat',
  goals: [
    'State the temperature, rainfall and soil needed for rice and describe the transplantation method',
    'Name the leading rice-producing states',
    'Explain why wheat is a rabi crop and why winter rain helps it, and name the leading wheat-producing states',
  ],
  slides: [
    sl('title', 'The two great cereals', {
      b: 'Part 1 — **Rice** and **wheat** are India’s two main food grains: rice is the staple of the east and south, wheat of the north and north-west. Each needs its own mix of temperature, rainfall and soil, and each has its own season.',
      v: table(['Crop', 'Season', 'Main region'], [['Rice', 'Mainly kharif', 'East, south, deltas; irrigated north-west'], ['Wheat', 'Rabi', 'Northern plains; Malwa plateau'], ['Millets', 'Mainly kharif', 'Dry Deccan and Rajasthan'], ['Pulses', 'Kharif and rabi', 'Central and western India']], 'Table of four food crops with their season and main region'),
      n: 'Namaste! India’s two great cereals are rice and wheat. Rice is the staple food of the east and the south, and wheat of the north and the north-west. In this part we look at what each crop needs in the way of temperature, rainfall and soil, how farmers grow it, and which states lead in producing it. Millets and pulses follow in Part 2.',
    }),
    sl('concept', 'Rice: what it needs', {
      b: '**Temperature:** high, above about **22–25 °C** through the growing season (up to about 32 °C). **Rainfall:** **100–200 cm** or more; fields are kept under **standing water** for much of the growing period; where rain is less, **irrigation** makes up the gap (Punjab, Haryana, Tamil Nadu). **Soil:** heavy **clayey or loamy alluvium** that holds water, with an impervious layer below — river valleys, deltas and coastal plains. **Relief:** flat land, or terraces on hill slopes. **Labour:** plenty of cheap labour for transplanting and harvesting.',
      v: table(['Condition', 'Rice needs'], [['Temperature', 'Over about 22–25 °C'], ['Rainfall', '100–200 cm or irrigation'], ['Soil', 'Clayey alluvium that holds water'], ['Relief', 'Flat plains, deltas, terraces'], ['Labour', 'Plentiful and cheap']], 'Table of the conditions needed for rice'),
      n: 'Rice is a crop of heat and water. It needs warm temperatures throughout its growth and plenty of rain, around one hundred to two hundred centimetres, because the fields are kept flooded. Where the rain is less, irrigation fills the gap. Heavy clayey soils of river valleys and deltas suit it best because they hold water, and transplanting and harvesting need many workers.',
    }),
    sl('diagram', 'Growing rice: methods of cultivation', {
      b: '**Broadcasting** — seed scattered by hand; easy but low yield. **Drilling** — seed sown in lines by a seed drill. **Dibbling** — seed placed in holes at regular spacing. **Transplantation** (most common in wet areas): (1) seed sown thickly in a **nursery**; (2) after about **four to six weeks** the seedlings are uprooted; (3) planted in rows in a **puddled, flooded field**. It saves seed, lets the main field be used for another crop meanwhile, and gives higher yields. The **Japanese method** adds HYV seeds, heavy manuring and careful row planting.',
      v: V.tp,
      n: 'Farmers sow rice in several ways. They may scatter seed by hand, sow it in lines with a drill, or place seeds in holes. In wet regions the best method is transplanting. Seed is sown thickly in a small nursery. After four to six weeks the young plants are pulled out and planted in neat rows in a muddy, flooded field. This saves seed and gives a bigger harvest.',
    }),
    sl('check', 'Quick check: transplanting', {
      b: 'Recall the first step of transplanting.',
      n: 'Quick check. Rice seedlings are first raised in a nursery bed before being planted in the field.',
      chk: 'rice-chk',
    }),
    sl('concept', 'Where rice grows', {
      b: '**Leading states:** **West Bengal** (a leading producer — the largest as of the early 2020s), **Uttar Pradesh**, **Punjab**, **Andhra Pradesh**, **Telangana**, **Odisha**, **Tamil Nadu**, **Chhattisgarh** and Bihar. In West Bengal the warm, wet climate allows up to three crops a year: **aus** (autumn), **aman** (winter, the main crop) and **boro** (summer, irrigated). Punjab and Haryana grow rice mainly for sale, with canal and tube-well irrigation; Chhattisgarh is called the rice bowl of central India.',
      v: table(['Region', 'States', 'Note'], [['Ganga–Brahmaputra delta', 'West Bengal, Assam', 'Up to three crops a year'], ['Eastern coastal deltas', 'Andhra Pradesh, Odisha, Tamil Nadu', 'Canal irrigation'], ['Ganga plain', 'Uttar Pradesh, Bihar', 'Kharif rice after monsoon'], ['North-west', 'Punjab, Haryana', 'Irrigated, mostly for sale']], 'Table of rice-growing regions, states and notes'),
      n: 'Rice is grown across eastern and southern India. West Bengal is a leading producer and can raise three crops a year: aus, aman and boro. The deltas of the Mahanadi, Godavari, Krishna and Cauvery are major rice bowls, and so is the Ganga plain of Uttar Pradesh and Bihar. Punjab and Haryana grow rice with irrigation, mostly to sell.',
    }),
    sl('example', 'Worked example: why the deltas grow rice', {
      b: '**Problem.** Give four geographical reasons why the Krishna–Godavari delta of Andhra Pradesh is a major rice-growing area.\n\n**Step 1. Temperature:** hot for most of the year, well above 25 °C in the growing season.\n\n**Step 2. Water:** heavy monsoon rain plus canals from the Krishna and Godavari keep fields flooded; two crops a year are possible.\n\n**Step 3. Soil:** fine, fertile clayey alluvium that holds water.\n\n**Step 4. Relief and labour:** flat land that is easy to flood and level, and a dense rural population for transplanting.',
      v: flow('LR', [['a', 'High temperature'], ['b', 'Rain plus delta canals'], ['c', 'Clayey alluvium'], ['d', 'Flat land, ample labour'], ['e', 'Rice bowl']], [['a', 'e'], ['b', 'e'], ['c', 'e'], ['d', 'e']], 'Flow of four conditions that make a delta a rice bowl'),
      n: 'Why does the Krishna Godavari delta grow so much rice? It is hot for most of the year. The monsoon brings heavy rain, and canals from the two great rivers keep the fields flooded, so two crops a year are possible. The soil is fine clayey alluvium that holds water. And the land is flat and densely peopled, giving plenty of hands for transplanting.',
    }),
    sl('check', 'Quick check: rice regions', {
      b: 'Explain why a region suits rice.',
      n: 'Quick check. Rice regions have heat, plenty of water, clayey alluvium and flat land.',
      chk: 'rice-chk2',
    }),
    sl('concept', 'Wheat: what it needs', {
      b: 'Wheat is a **rabi** crop. **Temperature:** **cool and moist** while growing (about 10–15 °C at sowing) and **warm, dry and sunny** for ripening (about 20–25 °C). **Rainfall:** **50–75 cm**; light **winter rain from western disturbances** in Punjab and Haryana adds soil moisture in the dry season, reducing the need for irrigation; elsewhere canals and tube wells supply water. **Soil:** well-drained **loamy alluvium**; also the **black soils** of the Malwa plateau. **Dangers:** frost at flowering, hail, and a sudden **hot spell in March** that makes the grain shrivel.',
      v: table(['Condition', 'Wheat needs'], [['Growing period', 'Cool, moist (10–15 °C)'], ['Ripening period', 'Warm, dry, sunny (20–25 °C)'], ['Rainfall', '50–75 cm, winter showers, irrigation'], ['Soil', 'Well-drained loam; black soil in Malwa']], 'Table of the conditions needed for wheat'),
      n: 'Wheat is a winter crop. It likes cool, moist weather while it grows and warm, dry, sunny days while the grain ripens. It needs only about fifty to seventy five centimetres of water. In Punjab and Haryana, light winter rain from western disturbances moistens the soil just when the crop needs it. Frost, hail or a sudden heat wave in March can damage the harvest.',
    }),
    sl('diagram', 'Comparing water needs', {
      b: 'The chart compares the approximate rainfall needs of the main food crops. **Rice** needs the most water (100–200 cm), so it grows in the wetter east and south or with heavy irrigation. **Wheat** needs much less (50–75 cm) and grows in the drier, cooler north-west winter. **Millets** and **gram** need the least, which is why they suit dry interiors.',
      v: V.rain,
      n: 'This chart shows roughly how much rain each crop needs. Rice needs by far the most, between one and two metres, so it grows where it is wet or where canals bring water. Wheat needs much less and grows through the dry winter of the north west. Jowar, bajra and gram need least of all, so they suit the dry lands of the Deccan and Rajasthan.',
    }),
    sl('concept', 'Growing wheat and where it grows', {
      b: '**Cultivation:** fields ploughed after the kharif harvest; seed **drilled** or broadcast in **October–December**; four to six irrigations; harvested in **March–April**, increasingly by combine harvesters; HYV seeds and fertilisers raised yields after the Green Revolution. **Leading states:** **Uttar Pradesh** (a leading producer — the largest as of the early 2020s), **Punjab**, **Madhya Pradesh**, **Haryana**, **Rajasthan**, Bihar and Gujarat. Two main zones: the **Ganga–Satluj plains** of the north-west and the **black-soil region** of the Deccan and Malwa.',
      v: table(['State', 'Why it grows much wheat'], [['Uttar Pradesh', 'Vast alluvial plain, canals and tube wells'], ['Punjab', 'Assured irrigation, HYV seeds, winter rain'], ['Madhya Pradesh', 'Black soils of Malwa, irrigation'], ['Haryana', 'Irrigation, fertile alluvium, winter rain']], 'Table of leading wheat states and reasons'),
      n: 'Wheat is sown from October to December, usually with a seed drill, watered several times, and harvested in March and April, often by combine harvesters. Uttar Pradesh is a leading producer, with its vast plain and many tube wells. Punjab and Haryana have assured irrigation and high yields, and Madhya Pradesh grows wheat on the black soils of the Malwa plateau.',
    }),
    sl('example', 'Worked example: rice and wheat side by side', {
      b: '**Problem.** A field near Ludhiana carries rice in kharif and wheat in rabi. Contrast the two crops under four headings.\n\n**Season:** rice — kharif (June to October); wheat — rabi (November to April).\n\n**Temperature:** rice — hot throughout; wheat — cool growing, warm ripening.\n\n**Water:** rice — much, standing water (here supplied by canals and tube wells); wheat — moderate, helped by winter showers.\n\n**Method:** rice — transplanted seedlings; wheat — seed drilled directly.',
      v: table(['Heading', 'Rice', 'Wheat'], [['Season', 'Kharif', 'Rabi'], ['Temperature', 'Hot throughout', 'Cool, then warm'], ['Water', 'Much, standing water', 'Moderate'], ['Sowing', 'Transplanted', 'Drilled']], 'Table contrasting rice and wheat under four headings'),
      n: 'On the same field near Ludhiana, rice grows through the hot, wet months from June to October and wheat through the cool, dry months from November to April. Rice needs heat all the time and standing water, which canals and tube wells supply here. Wheat needs cool weather to grow, warm weather to ripen and far less water. Rice is transplanted, while wheat seed is drilled straight into the field.',
    }),
    sl('check', 'Quick check: wheat', {
      b: 'Explain how winter rain helps wheat.',
      n: 'Quick check. Western disturbances bring light winter rain that moistens the soil for wheat.',
      chk: 'wheat-chk',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Rice: over about 22–25 °C, 100–200 cm or irrigation, clayey alluvium, flat land, much labour.',
        'Methods: broadcasting, drilling, dibbling, transplantation (nursery, uproot after four to six weeks, plant in flooded rows).',
        'Rice states: West Bengal, Uttar Pradesh, Punjab, Andhra Pradesh, Odisha, Tamil Nadu; aus, aman, boro.',
        'Wheat: rabi; cool growing, warm dry ripening; 50–75 cm; winter rain from western disturbances; loamy alluvium, black soil.',
        'Wheat states: Uttar Pradesh, Punjab, Madhya Pradesh, Haryana, Rajasthan.',
      ],
      v: table(['Crop', 'Season', 'Rain (approx.)', 'Leading state (early 2020s)'], [['Rice', 'Kharif', '100–200 cm', 'West Bengal'], ['Wheat', 'Rabi', '50–75 cm', 'Uttar Pradesh']], 'Summary table of rice and wheat'),
      n: 'To sum up Part 1. Rice needs heat, plenty of water and clayey soil, and in wet regions it is transplanted from a nursery into flooded fields. West Bengal and the eastern deltas lead in rice. Wheat is a winter crop that needs cool weather to grow and warm sunshine to ripen, helped by winter showers in the north-west. Uttar Pradesh, Punjab and Madhya Pradesh lead in wheat.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Write crop requirements under clear headings: temperature, rainfall, soil, other.',
        'Describe transplantation as three ordered steps.',
        'When asked why wheat is a rabi crop, mention both the cool growing and the warm ripening periods.',
        'Mark rankings as “a leading producer”; production changes year to year.',
      ],
      v: table(['Slip', 'Fix'], [['Rice grows well in sandy soil', 'Clayey soil that holds water'], ['Wheat needs heavy rain', 'Only 50–75 cm'], ['Winter rain harms wheat', 'Light winter rain helps it']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some tips. Set out crop needs under headings for temperature, rainfall and soil. Describe transplanting in three clear steps. When you explain why wheat is a winter crop, mention both the cool growing period and the warm, dry ripening period. And remember that light winter rain helps wheat, while heavy rain, hail or frost can harm it.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Food Crops — Part 2: Millets and pulses',
  goals: [
    'Explain why millets are suited to dry areas and poor soils and name a leading state for each millet',
    'Explain why pulses are important in crop rotation and in the Indian diet, and name the leading pulse-producing states',
    'Calculate and interpret yields from a table of area and production',
  ],
  slides: [
    sl('title', 'Hardy grains and protein crops', {
      b: 'Part 2 — **Millets** (jowar, bajra, ragi) grow where rice and wheat struggle: on thin soils with little rain. **Pulses** (gram, arhar, moong, urad, masoor) feed the soil and the people. Both are vital for the dry interior of India.',
      v: table(['Crop group', 'Examples', 'Strength'], [['Millets', 'Jowar, bajra, ragi', 'Drought-hardy, nutritious'], ['Pulses', 'Gram, arhar, moong, urad, masoor', 'Protein; fix nitrogen in soil']], 'Table of millets and pulses with examples and strengths'),
      n: 'In this part we meet two hardy groups of crops. Millets such as jowar, bajra and ragi grow on thin soils with little rain, where rice and wheat would fail. Pulses such as gram, arhar and moong give protein to millions of people and actually make the soil richer. Both matter most in the dry interior of the country.',
    }),
    sl('concept', 'Why millets suit dry lands', {
      b: 'Millets are often called coarse grains, but they are now valued as **nutri-cereals**. They **tolerate drought** and high temperatures; they have a **short growing season** (three to four months); they grow on **poor, shallow, sandy or red soils**; they need **little water and few inputs**, so they suit rain-fed farms. They are rich in **fibre, iron and calcium**, and their stalks are good **fodder**. Their area fell after the Green Revolution as farmers switched to irrigated rice and wheat, but interest is reviving.',
      v: table(['Feature', 'Why it helps in dry areas'], [['Drought tolerance', 'Survives dry spells'], ['Short season', 'Ripens before soil moisture runs out'], ['Poor soils', 'Grows on sandy, red, shallow soils'], ['Low inputs', 'Suits rain-fed small farms'], ['Fodder', 'Stalks feed cattle']], 'Table of features of millets that suit dry areas'),
      n: 'Millets are tough crops. They survive drought and heat, ripen in only three or four months, and grow on thin, sandy or red soils that would starve rice or wheat. They need little water, fertiliser or money, so small rain fed farms rely on them. Their grains are rich in fibre, iron and calcium, and their stalks make good cattle fodder.',
    }),
    sl('concept', 'Jowar, bajra and ragi', {
      b: '**Jowar (sorghum):** about **27–32 °C**, **50–100 cm**; black and red soils of the Deccan; grown as kharif and, in Maharashtra and Karnataka, as a **rabi** crop on moisture-holding black soil. Leading: **Maharashtra** (as of the early 2020s), Karnataka, Rajasthan, Madhya Pradesh. **Bajra (pearl millet):** hot, dry, **40–50 cm**, light **sandy** soils. Leading: **Rajasthan** (as of the early 2020s), Uttar Pradesh, Haryana, Gujarat, Maharashtra. **Ragi (finger millet):** dry, moderate rain, **red** and light soils, also on hill slopes; very rich in calcium and iron. Leading: **Karnataka** (as of the early 2020s), Tamil Nadu, Uttarakhand.',
      v: table(['Millet', 'Rainfall (approx.)', 'Soil', 'A leading state'], [['Jowar', '50–100 cm', 'Black, red', 'Maharashtra'], ['Bajra', '40–50 cm', 'Sandy', 'Rajasthan'], ['Ragi', 'Moderate, dry', 'Red, light', 'Karnataka']], 'Table of jowar, bajra and ragi with rainfall, soil and a leading state'),
      n: 'Jowar likes warmth and moderate rain and grows on the black and red soils of the Deccan, sometimes as a winter crop on black soil that holds moisture. Maharashtra is a leading producer. Bajra is the hardiest, growing on the sandy soils of Rajasthan with very little rain. Ragi grows on the red soils of Karnataka and on hill slopes, and is especially rich in calcium.',
    }),
    sl('check', 'Quick check: millets', {
      b: 'Explain why millets grow in dry regions.',
      n: 'Quick check. Millets tolerate drought, ripen quickly and grow on poor soils.',
      chk: 'millet-chk',
    }),
    sl('example', 'Worked example: choosing a millet', {
      b: '**Problem.** Suggest the most suitable millet for (a) the sandy plains around Bikaner, (b) the black-soil rain-shadow area around Solapur, (c) the red-soil plateau around Kolar. Give a reason for each.\n\n**(a)** Bajra — survives very low rainfall on light sandy soil.\n\n**(b)** Jowar — grows on black soil that stores moisture, even as a rabi crop after the rains.\n\n**(c)** Ragi — suits red, light soils with moderate, uncertain rain.',
      v: table(['Place', 'Soil and rain', 'Millet'], [['Around Bikaner', 'Sandy, very low rain', 'Bajra'], ['Around Solapur', 'Black soil, rain-shadow', 'Jowar'], ['Around Kolar', 'Red soil, moderate rain', 'Ragi']], 'Table matching three places to a suitable millet'),
      n: 'Look at the soil and the rain. Around Bikaner the land is sandy and very dry, so bajra, the hardiest millet, is best. Around Solapur, in the rain shadow of the Western Ghats, black soil holds moisture after the rains, which suits jowar, even as a winter crop. On the red soils around Kolar in Karnataka, ragi is the natural choice.',
    }),
    sl('concept', 'Pulses: types and requirements', {
      b: 'Pulses are **leguminous** crops. **Kharif pulses:** arhar (tur), moong, urad. **Rabi pulses:** gram (chana), masoor (lentil), peas. They need moderate temperatures (about **20–27 °C**) and **low to moderate rainfall** (roughly **25–60 cm**; gram about 40–45 cm), and grow on **light loams, black and red soils**. Mostly **rain-fed**, they are grown in dry areas, often **mixed with or rotated** with cereals, cotton or oilseeds.',
      v: table(['Season', 'Pulses'], [['Kharif', 'Arhar (tur), moong, urad'], ['Rabi', 'Gram (chana), masoor, peas']], 'Table of kharif and rabi pulses'),
      n: 'Pulses belong to the legume family. Arhar, moong and urad are grown in the kharif season, while gram, masoor and peas are rabi crops. They need moderate warmth and little rain, and grow on light loams and on black and red soils. Most are grown without irrigation in the drier parts of India, often alongside or in turn with cereals.',
    }),
    sl('diagram', 'How pulses enrich the soil', {
      b: 'The roots of pulses carry **nodules** containing **bacteria** that take **nitrogen from the air** and fix it in the soil. A pulse crop therefore leaves the field richer in nitrogen for the next crop. Farmers **rotate** pulses with cereals (gram after soya bean or rice; moong between wheat and rice) to restore fertility and cut fertiliser costs. Pulses are also the main **protein** source for India’s large vegetarian population.',
      v: flow('LR', [['a', 'Pulse crop sown'], ['b', 'Root nodule bacteria fix nitrogen'], ['c', 'Soil richer in nitrogen'], ['d', 'Next cereal crop needs less fertiliser']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow showing how a pulse crop fixes nitrogen and helps the next crop in a rotation'),
      n: 'Pull up a gram plant and you will see small lumps on its roots. These nodules hold bacteria that take nitrogen from the air and fix it in the soil. So a pulse crop leaves the field richer for the next crop, which then needs less fertiliser. That is why farmers rotate pulses with cereals. And pulses give protein to millions of vegetarian families.',
    }),
    sl('check', 'Quick check: pulses', {
      b: 'Explain the role of pulses in crop rotation.',
      n: 'Quick check. Pulses fix nitrogen through their root nodules, enriching the soil.',
      chk: 'pulse-chk',
    }),
    sl('concept', 'Where pulses grow', {
      b: '**Leading states:** **Madhya Pradesh** (a leading producer — the largest as of the early 2020s), **Maharashtra**, **Rajasthan**, **Uttar Pradesh**, **Karnataka**, Andhra Pradesh. India is among the world’s largest producers and consumers of pulses, yet it still **imports** some because yields are low (mostly rain-fed) and demand is huge (as of the early 2020s). Raising pulse output needs better seeds, irrigation at critical stages and assured prices.',
      v: table(['State', 'Main pulses'], [['Madhya Pradesh', 'Gram, urad, masoor'], ['Maharashtra', 'Arhar, gram, moong'], ['Rajasthan', 'Gram, moong'], ['Karnataka', 'Arhar, gram']], 'Table of leading pulse states and their main pulses'),
      n: 'Madhya Pradesh is a leading producer of pulses, followed by Maharashtra, Rajasthan, Uttar Pradesh and Karnataka. India grows more pulses than almost any other country, yet it still has to import some, because most pulses are rain fed with low yields while demand is enormous. Better seeds, a little irrigation at the right time and fair prices would help farmers grow more.',
    }),
    sl('diagram', 'Comparing yields across districts', {
      b: `The chart shows illustrative rice data for four districts. **Yield** = production ÷ area. District A: ${DIST[0][2]} ÷ ${DIST[0][1]} = ${fmt(yld('A'))} t/ha; District C: ${DIST[2][2]} ÷ ${DIST[2][1]} = ${yld('C')} t/ha. A high yield usually points to assured irrigation, HYV seeds and fertiliser; a low yield to rain-fed farming on poorer soils.`,
      v: V.yc,
      n: 'Here are imaginary rice figures for four districts. To find the yield, divide production by area. District A gets four tonnes from every hectare, while District C, with the largest area, gets only about two and a quarter. A high yield usually means assured water, better seed and fertiliser, while a low yield suggests rain fed fields on poorer soil.',
    }),
    sl('example', 'Worked example: average yield', {
      b: `**Problem.** Using the four districts, find (a) the total area and production, (b) the average yield of the region, and (c) which districts are above the average.\n\n**(a)** Area $= ${DIST.map((d) => d[1]).join(' + ')} = ${totArea()}$ thousand ha; production $= ${DIST.map((d) => d[2]).join(' + ')} = ${totProd()}$ thousand tonnes.\n\n**(b)** Average yield $= ${totProd()} \\div ${totArea()} = ${fmt(avg)}$ t/ha.\n\n**(c)** A (${fmt(yld('A'))}) and B (${yld('B')}) are above it; C and D are below.`,
      v: table(['District', 'Area (thousand ha)', 'Production (thousand t)', 'Yield (t/ha)'], DIST.map(([d, a, p]) => [d, String(a), String(p), fmt(yld(d))]), 'Table of illustrative area, production and yield for four districts'),
      n: 'Add the four areas and the four productions to get the regional totals, then divide total production by total area for the average yield, which here is three tonnes per hectare. Do not simply average the four yields, because the districts have different areas. Districts A and B are above the average, while C and D fall below it.',
    }),
    sl('check', 'Quick check: reading yields', {
      b: 'Pick out the district with the highest yield.',
      n: 'Quick check. Divide production by area for each district and compare.',
      chk: 'data-chk',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Millets: drought-hardy, short season, poor soils, nutritious; jowar (Maharashtra), bajra (Rajasthan), ragi (Karnataka).',
        'Pulses: legumes; kharif — arhar, moong, urad; rabi — gram, masoor, peas.',
        'Pulses fix nitrogen in root nodules, enrich soil in rotation, and supply protein.',
        'Pulse states: Madhya Pradesh, Maharashtra, Rajasthan, Uttar Pradesh, Karnataka.',
        'Yield = production ÷ area; regional average = total production ÷ total area.',
      ],
      v: table(['Crop', 'A leading state (early 2020s)'], [['Jowar', 'Maharashtra'], ['Bajra', 'Rajasthan'], ['Ragi', 'Karnataka'], ['Pulses', 'Madhya Pradesh']], 'Summary table of a leading state for each crop'),
      n: 'To sum up Part 2. Millets are hardy, quick and nutritious, which makes them ideal for dry lands: jowar in Maharashtra, bajra in Rajasthan and ragi in Karnataka. Pulses are legumes that fix nitrogen, enrich the soil and give protein; Madhya Pradesh leads in growing them. And in data questions, yield is production divided by area.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'For millets in dry areas, give at least two reasons: drought tolerance, short season, poor soils, low inputs.',
        'For pulses in rotation, name the root nodules and nitrogen fixation.',
        'Name kharif and rabi pulses separately.',
        'For an average yield, divide totals; do not average the yields.',
      ],
      v: table(['Slip', 'Fix'], [['Gram is a kharif pulse', 'Gram is rabi; arhar is kharif'], ['Bajra needs heavy rain', 'Bajra needs very little rain'], ['Average yield = mean of yields', 'Total production ÷ total area']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. When asked why millets suit dry areas, give at least two clear reasons. When asked about pulses and rotation, mention root nodules and nitrogen fixing bacteria. Keep kharif and rabi pulses apart: arhar in kharif, gram in rabi. And for an average yield, divide total production by total area rather than averaging the separate yields.',
    }),
  ],
});
