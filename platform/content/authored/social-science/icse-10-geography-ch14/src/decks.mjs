// ICSE 10 Geography ch14 Cash Crops — two decks: Part 1 (t01–t03) sugarcane (ratooning, north–south yield contrast with
// illustrative figures), oilseeds (groundnut, mustard, soya bean) and cotton; Part 2 (t04–t05) jute (retting, the delta) and
// tea (slopes, plucking, processing), with an illustrative leaf-to-tea calculation.
import { sl, deck, table, flow, svgV } from './lib.mjs';
import { RATOON, CANECHART, RETTING, TEAHILL, CANE, caneYield, caneGap, LEAF_RATIO } from './svgs.mjs';

const V = {
  ratoon: svgV(RATOON, 'Three panels: cane grown from setts, cane cut leaving stubble, and stubble sprouting as a ratoon crop'),
  cane: svgV(CANECHART, 'Bar chart of illustrative sugarcane yields of a northern and a peninsular state'),
  ret: svgV(RETTING, 'Jute bundles held under water in a pond, then fibre hung to dry'),
  tea: svgV(TEAHILL, 'Tea bushes and shade trees on a well-drained slope with rain and downhill drainage'),
};
const LEAF = 1200;
const MADE = LEAF / LEAF_RATIO;

export const deck1 = deck({
  part: 1,
  title: 'Cash Crops — Part 1: Sugarcane, oilseeds and cotton',
  goals: [
    'State the climatic and soil needs of sugarcane, explain ratooning, and explain why yields are higher in peninsular India',
    'State the season, requirements and leading states for groundnut, mustard and soya bean',
    'Explain why black soil and a long frost-free period suit cotton and name the leading states',
  ],
  slides: [
    sl('title', 'Crops grown for sale', {
      b: 'Part 1 — **Cash crops** are grown mainly for sale and as raw materials for industry: sugar mills, oil mills and textile mills. They bring farmers money income and feed India’s agro-based industries and exports.',
      v: table(['Crop', 'Season', 'A leading state (early 2020s)', 'Industry'], [['Sugarcane', 'Long, year-round', 'Uttar Pradesh', 'Sugar, gur'], ['Groundnut', 'Mainly kharif', 'Gujarat', 'Edible oil'], ['Cotton', 'Kharif', 'Gujarat', 'Textiles'], ['Jute', 'Kharif', 'West Bengal', 'Sacking, ropes'], ['Tea', 'Plantation, year-round', 'Assam', 'Beverage, export']], 'Table of five cash crops with season, a leading state and the industry they supply'),
      n: 'Namaste! Cash crops are grown mainly to be sold. Sugarcane feeds the sugar mills, groundnut and mustard the oil mills, and cotton the textile mills. Jute becomes sacks and ropes, and tea is drunk at home and sold abroad. In this part we study sugarcane, the oilseeds and cotton. Jute and tea follow in Part 2.',
    }),
    sl('concept', 'Sugarcane: what it needs', {
      b: 'Sugarcane is a **tropical and sub-tropical** crop with a **long growing period** of ten to eighteen months, so it does not fit a single season. **Temperature:** hot and humid, about **21–27 °C**; **frost** and the dry, hot **loo** harm it. **Rainfall:** about **75–150 cm**; elsewhere **irrigation** is essential. **Soil:** deep, fertile, well-drained **alluvial** or **black** soil, with plenty of manure and fertiliser. **Labour:** much labour for planting, weeding, irrigating and cutting. Sugar mills must be close, because cut cane **loses sugar** within a day and is bulky.',
      v: table(['Condition', 'Sugarcane needs'], [['Temperature', 'About 21–27 °C, no frost'], ['Rainfall', 'About 75–150 cm or irrigation'], ['Soil', 'Deep alluvial or black soil'], ['Growing period', 'Ten to eighteen months'], ['Other', 'Much labour; mill nearby']], 'Table of the conditions needed for sugarcane'),
      n: 'Sugarcane is a crop of warm, humid lands, and it stays in the field for ten to eighteen months. It needs warmth without frost, about seventy five to one hundred and fifty centimetres of rain or plenty of irrigation, and deep fertile soil with lots of manure. It needs many hands, and a sugar mill nearby, because cut cane starts losing its sugar within a day.',
    }),
    sl('diagram', 'Planting and ratooning', {
      b: 'Sugarcane is planted from **setts** — pieces of stem with two or three buds — laid in furrows. After the first harvest, the **stubble** left in the ground sprouts again and gives a second crop, called the **ratoon** crop; this practice is **ratooning**. **Advantages:** no new setts or ploughing needed, so it saves money and time; the crop matures sooner. **Disadvantages:** yields fall with each ratoon, and pests and diseases build up, so after two or three ratoons the field is replanted.',
      v: V.ratoon,
      n: 'Farmers plant sugarcane by laying pieces of stem, called setts, in furrows. When the tall canes are cut, the stubble left in the ground sprouts again and grows into a second crop, the ratoon crop. Ratooning saves the cost of new setts and ploughing, and the crop ripens sooner. But each ratoon gives a smaller yield and more pests, so after two or three the field is replanted.',
    }),
    sl('check', 'Quick check: ratooning', {
      b: 'Name the practice of letting stubble sprout again.',
      n: 'Quick check. Letting the stubble sprout into a new crop is called ratooning.',
      chk: 'cane-chk',
    }),
    sl('diagram', 'North and south: why yields differ', {
      b: `**Uttar Pradesh** is a leading producer (the largest as of the early 2020s) because of its huge area under cane, but **yields per hectare** are generally higher in **peninsular India** (Maharashtra, Tamil Nadu, Karnataka). Reasons: a **tropical, frost-free** climate and a **longer growing season**; **higher sugar content** in the cane; moisture-holding **black soil** and good **irrigation**; well-run **cooperative mills**. In the north, **cold winters, frost and the hot loo** shorten growth. Illustrative chart: ${caneYield('N')} t/ha in State N and ${caneYield('S')} t/ha in State S.`,
      v: V.cane,
      n: 'Uttar Pradesh grows the most cane because it plants such a huge area. But each hectare usually yields more in the peninsula, in states such as Maharashtra and Tamil Nadu. There the climate is tropical and frost free, the cane grows for longer and holds more sugar, black soils keep moisture and irrigation is good. In the north, cold winters and the hot loo cut growth short.',
    }),
    sl('example', 'Worked example: comparing cane yields', {
      b: `**Problem.** State N (illustrative) produces ${CANE.N.prod} thousand tonnes of cane from ${CANE.N.area} thousand ha; State S produces ${CANE.S.prod} thousand tonnes from ${CANE.S.area} thousand ha. (a) Find each yield. (b) By what percentage is S’s yield higher? (c) Explain the difference.\n\n**(a)** N $= ${CANE.N.prod} \\div ${CANE.N.area} = ${caneYield('N')}$ t/ha; S $= ${CANE.S.prod} \\div ${CANE.S.area} = ${caneYield('S')}$ t/ha.\n\n**(b)** $\\dfrac{${caneYield('S')} - ${caneYield('N')}}{${caneYield('N')}} \\times 100 = ${caneGap()}$%.\n\n**(c)** S is tropical and frost-free with a longer season, black soil and irrigation; N has cold winters and loo.`,
      v: table(['State', 'Area (thousand ha)', 'Production (thousand t)', 'Yield (t/ha)'], [['N', String(CANE.N.area), String(CANE.N.prod), String(caneYield('N'))], ['S', String(CANE.S.area), String(CANE.S.prod), String(caneYield('S'))]], 'Table of illustrative cane area, production and yield for two states'),
      n: 'Divide production by area for each state: the northern state gets eighty tonnes a hectare and the southern state one hundred. The difference is twenty, which is a quarter of eighty, so the southern yield is twenty five per cent higher. The reasons are geographical: a frost free tropical climate, a longer season, moisture holding black soil and good irrigation.',
    }),
    sl('concept', 'Oilseeds: groundnut, mustard and soya bean', {
      b: '**Groundnut:** mainly **kharif** (also rabi in the south); about **20–30 °C**, **50–75 cm** rain; light **sandy loam** or red soil that is loose and well drained, because the **pods form underground**. Leading: **Gujarat** (as of the early 2020s), Rajasthan, Tamil Nadu, Andhra Pradesh. **Mustard (rapeseed and mustard):** **rabi**; cool weather, little rain (about **25–40 cm**); loamy soils. Leading: **Rajasthan** (as of the early 2020s), Haryana, Madhya Pradesh, Uttar Pradesh. **Soya bean:** **kharif**; warm, moderate rain; well-drained **black** and loamy soils of the **Malwa plateau**. Leading: **Madhya Pradesh** (as of the early 2020s), Maharashtra, Rajasthan. Oilcake left after pressing is cattle feed and manure.',
      v: table(['Oilseed', 'Season', 'Soil', 'A leading state (early 2020s)'], [['Groundnut', 'Kharif (mainly)', 'Light sandy loam', 'Gujarat'], ['Mustard', 'Rabi', 'Loam', 'Rajasthan'], ['Soya bean', 'Kharif', 'Black, loamy', 'Madhya Pradesh']], 'Table of three oilseeds with season, soil and a leading state'),
      n: 'Groundnut is mostly a kharif crop. Its pods grow underground, so it needs loose, sandy, well drained soil, and Gujarat is a leading grower. Mustard is a winter crop that needs little rain, and Rajasthan leads. Soya bean is a kharif crop of the black soils of the Malwa plateau, where Madhya Pradesh leads. The cake left after pressing the oil feeds cattle and fertilises fields.',
    }),
    sl('example', 'Worked example: which oilseed where?', {
      b: '**Problem.** Suggest a suitable oilseed for (a) the light sandy-loam soils of Saurashtra in the kharif season, (b) the dry winter fields of Bharatpur in Rajasthan, (c) the black soils around Indore in the kharif season. Give a reason for each.\n\n**(a)** Groundnut — loose, well-drained soil lets the pods develop underground.\n\n**(b)** Mustard — a rabi crop needing cool weather and little water.\n\n**(c)** Soya bean — a kharif crop suited to well-drained black soil and moderate monsoon rain.',
      v: table(['Place and season', 'Oilseed', 'Reason'], [['Saurashtra, kharif', 'Groundnut', 'Loose soil for pods'], ['Bharatpur, rabi', 'Mustard', 'Cool, dry winter'], ['Indore, kharif', 'Soya bean', 'Black soil, monsoon rain']], 'Table matching places and seasons to oilseeds with reasons'),
      n: 'Match the crop to the soil and season. The loose sandy loam of Saurashtra lets groundnut pods swell underground, so groundnut suits the kharif season there. The cool, dry winter of Bharatpur suits mustard. And the black soils around Indore, watered by the monsoon, are ideal for soya bean, which is why Madhya Pradesh is called the soya state.',
    }),
    sl('check', 'Quick check: oilseeds', {
      b: 'Explain why a soil suits groundnut.',
      n: 'Quick check. Groundnut pods form underground, so the soil must be loose and well drained.',
      chk: 'oil-chk',
    }),
    sl('concept', 'Cotton: what it needs', {
      b: 'Cotton is a **kharif** crop. **Temperature:** high, about **21–30 °C**. **Frost-free period:** about **210 days**, because the plant grows slowly to maturity. **Rainfall:** moderate, about **50–100 cm**; **bright sunshine and dry weather** when the bolls open, since rain stains the fibre. **Soil:** the **black soil (regur)** of the Deccan — it holds moisture for a long time and is rich in lime, potash and magnesium; also irrigated alluvium in Punjab, Haryana and Rajasthan.',
      v: table(['Condition', 'Cotton needs'], [['Temperature', 'About 21–30 °C'], ['Frost-free days', 'About 210'], ['Rainfall', 'About 50–100 cm; dry at picking'], ['Soil', 'Black soil (regur); irrigated alluvium']], 'Table of the conditions needed for cotton'),
      n: 'Cotton is a kharif crop of hot lands. It needs about seven months without frost, moderate rain while it grows, and dry, sunny weather when the bolls burst open, because rain would stain the fibre. The black soil of the Deccan suits it best, because it holds moisture for months and is rich in lime and potash. With irrigation, cotton also grows in Punjab and Haryana.',
    }),
    sl('concept', 'From field to mill', {
      b: '**Cultivation:** sown with the monsoon (or with irrigation earlier in the north-west); bolls ripen after about six months; **picked by hand** in several rounds as bolls open at different times; **ginning** separates the fibre (lint) from the seed; lint is pressed into **bales** for spinning mills; seeds give oil and cattle feed. **Leading states:** **Gujarat**, **Maharashtra**, **Telangana**, Haryana, Rajasthan, Punjab, Karnataka (Gujarat and Maharashtra lead, as of the early 2020s).',
      v: flow('LR', [['a', 'Bolls picked by hand'], ['b', 'Ginning: lint from seed'], ['c', 'Bales'], ['d', 'Spinning and weaving mills'], ['e', 'Seeds: oil, cattle feed']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['b', 'e']], 'Flow from picking cotton to ginning, baling and the mills, with seeds as a by-product'),
      n: 'Cotton bolls open at different times, so they are picked by hand in several rounds. Ginning then separates the soft fibre from the seeds. The fibre is pressed into bales and sent to spinning and weaving mills, while the seeds give oil and cattle feed. Gujarat and Maharashtra are the leading cotton states, followed by Telangana, Haryana and Rajasthan.',
    }),
    sl('check', 'Quick check: cotton', {
      b: 'Explain why black soil suits cotton.',
      n: 'Quick check. Black soil holds moisture for a long time and is rich in lime and potash.',
      chk: 'cotton-chk',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Sugarcane: 21–27 °C, 75–150 cm or irrigation, deep alluvial or black soil; setts; ratooning; higher yields in the frost-free peninsula; Uttar Pradesh leads in output.',
        'Groundnut (kharif, sandy loam, Gujarat); mustard (rabi, Rajasthan); soya bean (kharif, black soil, Madhya Pradesh).',
        'Cotton: kharif, 21–30 °C, about 210 frost-free days, 50–100 cm, dry at picking, black soil; Gujarat and Maharashtra lead.',
      ],
      v: table(['Crop', 'Key soil', 'A leading state (early 2020s)'], [['Sugarcane', 'Alluvial, black', 'Uttar Pradesh'], ['Groundnut', 'Sandy loam', 'Gujarat'], ['Mustard', 'Loam', 'Rajasthan'], ['Soya bean', 'Black', 'Madhya Pradesh'], ['Cotton', 'Black (regur)', 'Gujarat']], 'Summary table of soils and leading states for Part 1 crops'),
      n: 'To sum up Part 1. Sugarcane needs warmth, water and deep soil, is grown from setts and can be ratooned, and gives higher yields in the frost free south. Groundnut likes loose sandy soil, mustard the cool dry winter, and soya bean the black soils of Malwa. Cotton needs a long frost free season, black soil and dry weather at picking time.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Define ratooning and give one advantage and one disadvantage.',
        'For higher southern cane yields, give climate, season length, soil and irrigation reasons.',
        'For cotton, link black soil to moisture retention and minerals, and mention the frost-free period.',
        'Write “a leading producer” and add “as of the early 2020s” for any ranking.',
      ],
      v: table(['Slip', 'Fix'], [['Mustard is a kharif crop', 'Mustard is rabi'], ['Rain at boll opening helps cotton', 'It stains the fibre'], ['Ratoon crops give higher yields', 'Yields fall with each ratoon']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some tips. Learn a clear definition of ratooning with one advantage and one disadvantage. When explaining why southern cane yields are higher, mention climate, the length of the season, soil and irrigation. For cotton, link black soil to moisture and minerals, and remember the long frost free period. And always write a leading producer rather than a fixed rank.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Cash Crops — Part 2: Jute and tea',
  goals: [
    'Describe the retting process and explain why jute is concentrated in the Ganga–Brahmaputra delta',
    'Explain why tea is grown on well-drained hill slopes, and describe plucking and processing',
    'Name the leading jute- and tea-producing states',
  ],
  slides: [
    sl('title', 'A fibre and a beverage', {
      b: 'Part 2 — **Jute**, the golden fibre, grows on the hot, wet floodplains of the Ganga–Brahmaputra delta. **Tea**, a plantation crop, grows on the rainy hill slopes of Assam, Darjeeling and the Nilgiris. Both need heavy rain, but in very different landscapes.',
      v: table(['Feature', 'Jute', 'Tea'], [['Type of crop', 'Kharif fibre crop', 'Plantation beverage crop'], ['Landscape', 'Flat delta floodplains', 'Well-drained hill slopes'], ['Water', 'Heavy rain; water for retting', 'Heavy rain but no waterlogging'], ['Leading state (early 2020s)', 'West Bengal', 'Assam']], 'Table comparing jute and tea'),
      n: 'In this part we meet two crops that both love heavy rain. Jute, the golden fibre, grows on the flat, flooded plains of the Ganga Brahmaputra delta. Tea grows on the steep, rainy hill slopes of Assam, Darjeeling and the Nilgiris, where water drains away quickly. Let us see what each needs and how each is turned into a product.',
    }),
    sl('concept', 'Jute: what it needs', {
      b: 'Jute is a **kharif** fibre crop. **Temperature:** hot, above about **25 °C** (up to about 35 °C). **Rainfall:** heavy, about **150–250 cm**, with **high humidity**. **Soil:** light sandy or clayey **loam** of floodplains, whose fertility is **renewed every year by fresh silt** from floods, because jute exhausts the soil. **Water:** plenty of clean, slow-moving or still water is needed for **retting**. **Labour:** much cheap labour for cutting, retting and stripping.',
      v: table(['Condition', 'Jute needs'], [['Temperature', 'Above about 25 °C'], ['Rainfall', 'About 150–250 cm, humid'], ['Soil', 'Floodplain loam renewed by silt'], ['Water', 'Ponds or slow streams for retting'], ['Labour', 'Plentiful and cheap']], 'Table of the conditions needed for jute'),
      n: 'Jute is a kharif crop of hot, steamy lands. It needs temperatures above about twenty five degrees, heavy rain and high humidity. Because it uses up the soil’s nutrients, it grows best on floodplains where fresh silt is spread every year. It also needs plenty of slow moving water for retting, and many workers to cut, soak and strip the stalks.',
    }),
    sl('diagram', 'Retting: freeing the fibre', {
      b: 'About four months after sowing, the plants are **cut** close to the ground. The stalks are tied in **bundles** and **soaked** in ponds, ditches or slow-moving streams for about **two to three weeks**, weighted down to stay under water. **Bacteria** rot the soft tissue that binds the fibre to the stem — this is **retting**. The fibre is then **stripped** off by hand, **washed**, **dried** in the sun and pressed into **bales** for the jute mills.',
      v: V.ret,
      n: 'When the jute is ready, farmers cut the plants, tie the stalks in bundles and sink them in ponds or slow streams for two to three weeks. Bacteria in the water rot the soft tissue that glues the fibre to the stem. This is called retting. The workers then strip off the long fibres, wash them, dry them in the sun and press them into bales for the mills.',
    }),
    sl('check', 'Quick check: retting', {
      b: 'Name the process that loosens jute fibre.',
      n: 'Quick check. Soaking jute stalks in water so that bacteria loosen the fibre is called retting.',
      chk: 'jute-chk',
    }),
    sl('concept', 'Where jute grows, and its uses', {
      b: '**Leading states:** **West Bengal** (a leading producer — the largest as of the early 2020s), **Bihar**, **Assam**, Odisha and Meghalaya — all in or near the **Ganga–Brahmaputra delta**. Most jute mills line the **Hooghly** near Kolkata. **Uses:** gunny bags for grain, sugar and cement, ropes, carpets, mats, and newer eco-friendly bags and fabrics. **Problems:** competition from cheaper **synthetic** fibres; low prices for farmers. **Hope:** jute is **biodegradable**, so it is promoted as a substitute for plastic.',
      v: table(['Aspect', 'Details'], [['Leading states', 'West Bengal, Bihar, Assam'], ['Mill centre', 'Banks of the Hooghly near Kolkata'], ['Uses', 'Gunny bags, ropes, carpets, eco-bags'], ['Challenge', 'Synthetic substitutes'], ['Strength', 'Biodegradable, eco-friendly']], 'Table of jute regions, mills, uses, challenge and strength'),
      n: 'Nearly all of India’s jute grows in West Bengal, Bihar and Assam, in and around the great delta, and most jute mills stand along the Hooghly near Kolkata. Jute is made into sacks, ropes, mats and carpets. Cheap plastic and synthetic fibres have taken some of its markets, but because jute rots away naturally, it is now promoted as an eco friendly replacement for plastic bags.',
    }),
    sl('example', 'Worked example: why the delta?', {
      b: '**Problem.** Explain why jute cultivation in India is concentrated in the Ganga–Brahmaputra delta.\n\n**Step 1. Climate:** hot and humid, with 150–250 cm of rain — exactly what jute needs.\n\n**Step 2. Soil:** floods spread fresh silt every year, restoring the fertility that jute uses up.\n\n**Step 3. Water:** countless ponds, channels and slow rivers provide water for retting.\n\n**Step 4. Labour and market:** a dense rural population supplies cheap labour, and the Hooghly mills and Kolkata port are close at hand.',
      v: flow('LR', [['a', 'Hot, humid, heavy rain'], ['b', 'Silt renewed by floods'], ['c', 'Water for retting'], ['d', 'Cheap labour, Kolkata mills'], ['e', 'Jute belt of the delta']], [['a', 'e'], ['b', 'e'], ['c', 'e'], ['d', 'e']], 'Flow of four reasons that concentrate jute in the Ganga–Brahmaputra delta'),
      n: 'Why the delta? Its hot, humid climate and heavy rain suit jute perfectly. Every year floods lay down fresh silt, renewing the soil that jute exhausts. Ponds, channels and slow rivers everywhere supply water for retting. And the crowded villages give cheap labour, while the mills along the Hooghly and the port of Kolkata are close by.',
    }),
    sl('check', 'Quick check: the jute belt', {
      b: 'Explain the location of jute growing.',
      n: 'Quick check. The delta offers heat, heavy rain, flood silt, retting water and cheap labour.',
      chk: 'delta-chk',
    }),
    sl('concept', 'Tea: what it needs', {
      b: 'Tea is a **plantation** crop made from the young leaves of an evergreen bush. **Temperature:** warm, about **20–30 °C**, frost-free. **Rainfall:** heavy, about **150–250 cm**, **well distributed** through the year; frequent light showers keep fresh leaves growing. **Soil:** deep, fertile, **well-drained**, slightly **acidic** soil rich in **humus** and iron (forest or laterite soils). **Relief:** **hill slopes**, because water must not stand around the roots. **Shade trees** protect young bushes. **Labour:** large, skilled labour force (many of them women pluckers).',
      v: table(['Condition', 'Tea needs'], [['Temperature', 'About 20–30 °C, frost-free'], ['Rainfall', 'About 150–250 cm, well spread'], ['Soil', 'Well-drained, acidic, humus-rich'], ['Relief', 'Hill slopes; no waterlogging'], ['Labour', 'Large, skilled, for plucking']], 'Table of the conditions needed for tea'),
      n: 'Tea is a bush grown on large estates for its young leaves. It needs warm weather, no frost, and heavy rain spread across the year, with frequent showers that keep new leaves coming. The soil must be deep, fertile, slightly acidic and well drained, which is why tea grows on hill slopes, where rain runs off instead of soaking the roots. Plucking needs a large, skilled workforce.',
    }),
    sl('diagram', 'A tea garden on the slopes', {
      b: 'On a slope, heavy rain **drains away quickly**, so water does not collect around the roots, which would rot them. Bushes are planted in rows along the slope and pruned to waist height for easy plucking; **shade trees** shelter them from strong sun and add leaf litter to the soil. The estate’s **factory** usually stands nearby, so fresh leaves are processed within hours.',
      v: V.tea,
      n: 'Look at this sketch of a tea garden. The bushes grow in rows on a slope, so the heavy rain runs off quickly instead of drowning the roots. Tall shade trees protect the bushes from fierce sun and drop leaves that enrich the soil. The factory stands close by, because the leaves must be processed within hours of plucking.',
    }),
    sl('concept', 'Plucking and processing', {
      b: '**Plucking:** only the tender tips — **two leaves and a bud** — are picked by hand every one to two weeks during the growing season. **Processing** in the estate factory: **withering** (leaves spread out to lose moisture) → **rolling** (or crushing, tearing and curling — CTC) to break the cells → **fermentation** (oxidation; leaves turn copper-brown) → **drying** (firing) → **grading and packing**. **Green tea** skips fermentation. **Leading states:** **Assam** (a leading producer — the largest as of the early 2020s), **West Bengal** (Darjeeling, Dooars), **Tamil Nadu** (Nilgiris), **Kerala**.',
      v: flow('LR', [['a', 'Plucking: two leaves and a bud'], ['b', 'Withering'], ['c', 'Rolling'], ['d', 'Fermentation'], ['e', 'Drying'], ['f', 'Grading and packing']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e'], ['e', 'f']], 'Flow of tea from plucking through withering, rolling, fermentation and drying to packing'),
      n: 'Pluckers pick only the youngest tips, two leaves and a bud, every week or two. In the factory the leaves are first withered to lose moisture, then rolled or crushed to break them open, then left to ferment until they turn coppery brown, and finally dried, graded and packed. Assam is a leading producer, followed by West Bengal, Tamil Nadu and Kerala.',
    }),
    sl('check', 'Quick check: tea', {
      b: 'Explain a step in tea plucking or processing.',
      n: 'Quick check. Only the young tips are plucked, because tender leaves make the best tea.',
      chk: 'tea-chk',
    }),
    sl('example', 'Worked example: from leaf to cup', {
      b: `**Problem.** In a tea garden near Jorhat, pluckers bring in ${LEAF} kg of green leaf in a day. If about ${LEAF_RATIO} kg of green leaf gives 1 kg of made tea (an illustrative round figure), (a) how much made tea is produced? (b) Why must the leaf reach the factory quickly?\n\n**(a)** Made tea $= ${LEAF} \\div ${LEAF_RATIO} = ${MADE}$ kg.\n\n**(b)** Plucked leaves start to wilt and ferment on their own; processing within hours keeps the flavour and quality, which is why every estate has its own factory.`,
      v: table(['Quantity', 'Value'], [['Green leaf plucked', `${LEAF} kg`], ['Leaf for 1 kg of made tea', `${LEAF_RATIO} kg (illustrative)`], ['Made tea', `${MADE} kg`]], 'Table of the illustrative leaf-to-made-tea calculation'),
      n: 'Most of the weight of fresh tea leaves is water, which is driven off in the factory. If about four kilograms of leaf make one kilogram of tea, then twelve hundred kilograms of leaf give three hundred kilograms of tea. The leaves must reach the factory within hours, because they begin to wilt and ferment on their own, which spoils the flavour.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Jute: kharif; above about 25 °C; 150–250 cm; humid; flood-renewed silt; water for retting; West Bengal, Bihar, Assam.',
        'Retting: bundles soaked two to three weeks; bacteria loosen fibre; stripped, washed, dried, baled.',
        'Tea: 20–30 °C; 150–250 cm well spread; well-drained acidic soil on slopes; shade trees.',
        'Plucking two leaves and a bud; withering, rolling, fermentation, drying, grading.',
        'Tea states: Assam, West Bengal, Tamil Nadu, Kerala.',
      ],
      v: table(['Crop', 'Key process', 'A leading state (early 2020s)'], [['Jute', 'Retting', 'West Bengal'], ['Tea', 'Withering to drying', 'Assam']], 'Summary table of the key process and a leading state for jute and tea'),
      n: 'To sum up Part 2. Jute needs heat, heavy rain, flood silt and water for retting, which is why it is concentrated in the delta of West Bengal, Bihar and Assam. Tea needs heavy, well spread rain but must not stand in water, so it grows on slopes. Its tender tips are plucked and then withered, rolled, fermented and dried. Assam leads in tea.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Describe retting in steps: cut, bundle, soak two to three weeks, bacteria act, strip, wash, dry.',
        'For the jute belt, give climate, soil renewal, retting water and labour or market.',
        'For tea on slopes, stress drainage: water must not collect around the roots.',
        'Learn the tea processing order: withering, rolling, fermentation, drying.',
      ],
      v: table(['Slip', 'Fix'], [['Jute grows in dry areas', 'It needs heavy rain and humidity'], ['Tea needs waterlogged soil', 'It needs well-drained soil'], ['Fermentation before rolling', 'Rolling comes first']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. Describe retting as a clear sequence of steps. When explaining the jute belt, cover climate, the yearly silt, water for retting, and labour and mills. For tea, stress that water must drain away from the roots, which is why slopes are used. And learn the factory order: withering, rolling, fermentation and drying.',
    }),
  ],
});
