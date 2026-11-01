// ICSE 10 Geography ch08 Natural Vegetation — two decks: Part 1 (t01–t02) importance of forests, tropical evergreen and tropical
// deciduous forests; Part 2 (t03–t04) desert, littoral and mountain vegetation, forest conservation, and an ILLUSTRATIVE
// forest-area table (computed in svgs.mjs).
import { sl, deck, table, flow, svgV } from './lib.mjs';
import { RAIN_BAND, LAYERS, MOUNTAIN, MANGROVE, SHARE_BAR, STATIONS, forestFor, tempAt, LAPSE, BASE, FOREST_AREA, forestTotal, share } from './svgs.mjs';

const V = {
  rain: svgV(RAIN_BAND, 'Rainfall scale divided into bands for thorn, dry deciduous, moist deciduous and tropical evergreen forest, with four illustrative stations'),
  layers: svgV(LAYERS, 'Side view of the storeys of a tropical evergreen forest'),
  mountain: svgV(MOUNTAIN, 'Schematic mountain showing vegetation zones by altitude'),
  mangrove: svgV(MANGROVE, 'Mangrove tree with stilt roots and breathing roots between high and low tide'),
  share: svgV(SHARE_BAR, 'Bar showing illustrative shares of four forest types in an imagined state'),
};
const T2000 = tempAt(2000);
const T3000 = tempAt(3000);

export const deck1 = deck({
  part: 1,
  title: 'Natural Vegetation — Part 1: Forests, evergreen and deciduous',
  goals: [
    'Explain the ecological and economic importance of forests',
    'Correlate the features of tropical evergreen and deciduous forests with rainfall and temperature',
    'Name important trees of each type and their uses',
  ],
  slides: [
    sl('title', 'From rainforest to thorn scrub', {
      b: 'Part 1 — **natural vegetation** is the plant cover that grows on its own, without being planted by people. In India it changes mainly with **rainfall**, and in the mountains with **altitude**.',
      v: table(['Vegetation type', 'Rough annual rainfall', 'Example area'], [['Tropical evergreen', 'Over 200 cm', 'Western Ghats (western slopes)'], ['Moist deciduous', '100–200 cm', 'Chota Nagpur, Odisha'], ['Dry deciduous', '70–100 cm', 'South Bihar, interior plateau'], ['Tropical desert (thorn)', 'Under 70 cm', 'Western Rajasthan'], ['Littoral (mangrove)', 'Tidal coasts', 'Sundarbans'], ['Mountain', 'Changes with height', 'Himalayas']], 'Table of the main vegetation types of India with rough rainfall and an example area'),
      n: 'Namaste! Natural vegetation means the plants that grow on their own, without being planted. India has dense rainforests, monsoon forests that drop their leaves, thorny scrub in the desert, mangroves on muddy coasts and changing belts of trees on the mountains. Mostly, it is the amount of rain that decides which kind grows where. In this part we study why forests matter and the two great tropical forest types.',
    }),
    sl('concept', 'Ecological importance of forests', {
      b: '**Forests protect the environment:** trees take in carbon dioxide and give out oxygen; they **moderate temperature** and add moisture to the air through transpiration, helping rainfall; **roots bind the soil** and leaf litter slows runoff, so forests **check soil erosion and floods**; rainwater soaks in slowly, **recharging groundwater** and keeping streams flowing after the rains; they provide **habitat** for wildlife and conserve biodiversity; leaf litter adds **humus** to the soil.',
      v: flow('LR', [['a', 'Forest cover'], ['b', 'Roots bind soil; litter slows water'], ['c', 'Rain soaks into the ground'], ['d', 'Less erosion and flooding'], ['e', 'Springs and streams flow longer']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['c', 'e']], 'Flow showing how forest cover slows water, reduces erosion and floods, and keeps streams flowing'),
      n: 'Forests look after the environment. Trees take in carbon dioxide and give out oxygen, and the water they release into the air helps cool it and bring rain. Their roots hold the soil, and fallen leaves slow the flow of rainwater, so less soil is washed away and floods are smaller. Water soaks into the ground and feeds springs long after the rains. Forests are also home to countless animals and plants.',
    }),
    sl('concept', 'Economic importance of forests', {
      b: '**Forests support livelihoods and industry:** **timber** for buildings, furniture, railway sleepers and boats; **fuelwood** and **fodder** for villages; **raw materials** for paper (bamboo, softwood), plywood, matches, rayon and sports goods; **minor forest products** — lac, gum, resin, honey, cane, tendu leaves (for bidis), medicinal plants such as cinchona (quinine); food and income for **tribal communities**; and **tourism** in national parks.',
      v: table(['Forest product', 'Use'], [['Teak, sal', 'Timber, furniture, sleepers'], ['Bamboo', 'Paper pulp, building, crafts'], ['Tendu leaves', 'Wrapping bidis'], ['Lac', 'Varnish, bangles'], ['Cinchona bark', 'Quinine for malaria'], ['Resin from pine', 'Turpentine, varnish']], 'Table of forest products and their uses'),
      n: 'Forests also feed the economy. They give timber for houses, furniture and railway sleepers, firewood and fodder for villages, and raw materials for paper, plywood and match factories. They give lac, gum, honey, cane and medicinal plants, and the leaves used to wrap bidis. For many tribal families the forest is their store, their pharmacy and their source of income.',
    }),
    sl('check', 'Quick check: why forests matter', {
      b: 'Tell an ecological benefit from an economic one.',
      n: 'Quick check. Ecological benefits protect soil, water, air and wildlife; economic benefits are products and income.',
      chk: 'importance-chk',
    }),
    sl('diagram', 'Rainfall decides the forest type', {
      b: 'In the tropical lowlands of India, **annual rainfall** is the main control: over about **200 cm** — tropical evergreen; **100–200 cm** — moist deciduous; **70–100 cm** — dry deciduous; **under 70 cm** — thorn forest and scrub. Temperature matters too: these forests need warmth all year, which is why altitude changes the picture in the mountains.',
      v: V.rain,
      n: 'Look at this rainfall scale. Where more than about two hundred centimetres of rain falls each year, we find tropical evergreen forest. Between one hundred and two hundred centimetres, moist deciduous forest grows. From seventy to one hundred, dry deciduous forest. Below seventy, only thorny trees and bushes survive. Each illustrative station sits in the band that matches its rainfall.',
    }),
    sl('concept', 'Tropical evergreen forests', {
      b: '**Climate:** rainfall over 200 cm, high temperature (about 25–27 °C) and humidity all year. **Distribution:** western slopes of the **Western Ghats**, hills of the **north-east** (Meghalaya, Assam, Arunachal), the **Andaman and Nicobar Islands**. **Characteristics:** very **dense**, with several **storeys**; tall trees (often 40–60 m); trees shed leaves at different times, so the forest is **green all year**; many species grow **mixed together**; climbers and undergrowth. **Trees:** ebony, mahogany, rosewood, rubber, cinchona, with bamboo and canes. **Hardwoods** are valuable but hard to extract.',
      v: V.layers,
      n: 'Tropical evergreen forests grow where it is hot and wet all year, with more than two hundred centimetres of rain. They cover the western slopes of the Western Ghats, the north eastern hills and the Andaman Islands. They are so dense that sunlight barely reaches the ground, and the trees grow in several storeys. There is no fixed season of leaf fall, so the forest stays green. Ebony, mahogany and rosewood grow here.',
    }),
    sl('example', 'Worked example: rich forest, little timber', {
      b: '**Problem.** The evergreen forests of the north-east contain valuable hardwoods, yet they supply far less commercial timber than the deciduous forests of Madhya Pradesh. Give reasons.\n\n**Step 1. Mixed stands.** Many species grow together, so a logger finds only a few trees of any one kind in an area.\n\n**Step 2. Density and terrain.** Thick undergrowth, climbers and hilly ground make felling and hauling difficult and costly.\n\n**Step 3. Transport.** Remote areas have few roads, and the hardwood logs are very heavy.\n\n**Step 4. Climate.** Heavy rain for much of the year limits the working season.',
      v: flow('LR', [['a', 'Many species mixed'], ['b', 'Few trees of one kind'], ['c', 'Dense growth, hilly land, few roads'], ['d', 'Costly to log and transport'], ['e', 'Less commercial timber']], [['a', 'b'], ['b', 'd'], ['c', 'd'], ['d', 'e']], 'Flow showing why mixed, dense, remote evergreen forests yield little commercial timber'),
      n: 'Why do these rich forests give so little timber to industry? Many kinds of trees grow mixed together, so there are few trees of any one kind in one place. The forest is thick with climbers and bushes, often on steep hills with few roads, and hardwood logs are very heavy. Heavy rain also shortens the season when work is possible. So logging is slow and expensive.',
    }),
    sl('check', 'Quick check: evergreen forests', {
      b: 'Explain a feature of tropical evergreen forests.',
      n: 'Quick check. Trees shed leaves at different times, so the forest stays green.',
      chk: 'evergreen-chk',
    }),
    sl('concept', 'Tropical deciduous (monsoon) forests', {
      b: 'The most widespread forests of India, also called **monsoon forests**. Trees **shed their leaves for six to eight weeks** in the dry summer to **reduce water loss**. **Moist deciduous** (100–200 cm): the north-eastern states along the Himalayan foothills, Jharkhand, Odisha, Chhattisgarh, eastern slopes of the Western Ghats — **teak, sal, shisham, sandalwood, bamboo, khair, arjun**. **Dry deciduous** (70–100 cm): drier parts of the peninsular plateau and the plains of Bihar and Uttar Pradesh — open stands of **teak, sal, peepal, neem**; grassy patches. Fairly **pure stands** of one species make them **commercially the most important** forests.',
      v: table(['Head', 'Moist deciduous', 'Dry deciduous'], [['Rainfall', '100–200 cm', '70–100 cm'], ['Areas', 'Chota Nagpur, Odisha, foothills, eastern Ghats slopes', 'Plateau interior, Bihar and UP plains'], ['Trees', 'Teak, sal, sandalwood, bamboo', 'Teak, sal, peepal, neem'], ['Density', 'Fairly dense', 'Open, with grass']], 'Table comparing moist and dry deciduous forests'),
      n: 'Tropical deciduous forests are the most widespread in India and are often called monsoon forests. In the dry hot season their trees drop their leaves for some weeks to save water. Moist deciduous forests grow where rain is between one hundred and two hundred centimetres, with teak, sal and sandalwood. Dry deciduous forests grow in drier areas and are more open, with teak, peepal and neem.',
    }),
    sl('concept', 'Important trees and their uses', {
      b: 'Learn trees **with their uses**: **teak** — strong, durable timber for furniture, doors and boats; **sal** — hard timber for railway sleepers and building; **sandalwood** (Karnataka) — carving, perfume oil, incense; **shisham** — furniture; **bamboo** — paper pulp, building, baskets; **khair** — katha; **ebony** — fine furniture and carving; **mahogany** and **rosewood** — high-quality furniture; **cinchona** — quinine; **rubber** — latex.',
      v: table(['Tree', 'Forest type', 'Use'], [['Teak', 'Deciduous', 'Furniture, doors, boats'], ['Sal', 'Deciduous', 'Railway sleepers, building'], ['Sandalwood', 'Deciduous', 'Carving, perfume oil'], ['Ebony', 'Evergreen', 'Fine furniture'], ['Cinchona', 'Evergreen', 'Quinine'], ['Bamboo', 'Both', 'Paper pulp, building']], 'Table of important trees with their forest type and use'),
      n: 'In the exam, name a tree together with its use. Teak gives strong timber for furniture and boats. Sal gives hard timber for railway sleepers. Sandalwood from Karnataka is carved and used for perfume oil. Ebony, mahogany and rosewood make fine furniture. Cinchona bark gives quinine, a medicine for malaria, and bamboo is pulped to make paper.',
    }),
    sl('example', 'Worked example: matching stations to forests', {
      b: `**Problem.** Four illustrative stations have these annual rainfall totals. Name the natural vegetation of each and one typical tree.\n\n${STATIONS.map((st) => `**${st.id}** (${st.where}, ${st.cm} cm) → ${forestFor(st.cm).toLowerCase()}`).join('\n\n')}\n\n**Trees.** P: ebony or rosewood; Q: sal or teak; R: teak, peepal or neem; S: babul or khejri.\n\n**Method.** Compare each total with the band limits (200, 100 and 70 cm).`,
      v: table(['Station', 'Rainfall (cm)', 'Vegetation'], STATIONS.map((st) => [st.id, String(st.cm), forestFor(st.cm)]), 'Table of four illustrative stations with rainfall and expected vegetation'),
      n: 'To classify a station, compare its rainfall with the band limits. Station P, on the windward Western Ghats, gets far more than two hundred centimetres, so it has evergreen forest. Station Q, on the Chota Nagpur plateau, falls between one and two hundred, so moist deciduous. Station R gets between seventy and one hundred, so dry deciduous. Station S, in the desert, has thorn forest.',
    }),
    sl('check', 'Quick check: deciduous forests', {
      b: 'Explain leaf fall or identify a deciduous forest.',
      n: 'Quick check. Deciduous trees drop their leaves in the dry season to save water.',
      chk: 'deciduous-chk',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Forests: ecological value (soil, water, climate, oxygen, wildlife) and economic value (timber, fuel, fodder, industry, minor products, tribal livelihoods).',
        'Tropical evergreen: over 200 cm, hot and humid; dense, storeyed, green all year; ebony, mahogany, rosewood; hard to exploit.',
        'Tropical deciduous: monsoon forests; shed leaves in the dry season; moist (100–200 cm) and dry (70–100 cm); teak, sal, sandalwood; most important commercially.',
      ],
      v: table(['Forest', 'Rain', 'Key tree'], [['Evergreen', 'Over 200 cm', 'Ebony'], ['Moist deciduous', '100–200 cm', 'Teak, sal'], ['Dry deciduous', '70–100 cm', 'Neem, peepal']], 'Summary table of forest types with rainfall and a key tree'),
      n: 'Let us sum up Part 1. Forests protect soil, water and climate, and give timber, fuel, fodder and many other products. Tropical evergreen forests grow in the wettest areas; they are dense and green all year but hard to log. Tropical deciduous forests, the monsoon forests, drop their leaves in the dry season and give valuable teak and sal.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        '"Correlate with climate": link each feature to rain or temperature (dense because of heavy rain; leaf fall because of a dry season).',
        'Give distribution with named regions, not just "the south".',
        'Name trees with their uses.',
        'Separate ecological and economic importance clearly.',
      ],
      v: table(['Slip', 'Fix'], [['Evergreen trees never shed leaves', 'They shed at different times'], ['Teak is an evergreen tree', 'Teak is deciduous'], ['Deciduous forests are hard to log', 'They are the main source of timber']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some tips. When asked to correlate a forest with climate, link each feature to the rain or temperature that causes it. Name regions when you give distribution. Always add a use when you name a tree. And keep ecological benefits, which protect nature, separate from economic benefits, which are products and income.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Natural Vegetation — Part 2: Desert, littoral and mountain vegetation; conservation',
  goals: [
    'Explain how desert plants and mangroves are adapted to their environment',
    'Describe the change in vegetation with altitude in the Himalayas',
    'Distinguish afforestation from reforestation and social forestry from agroforestry',
    'State the aim of Van Mahotsav',
  ],
  slides: [
    sl('title', 'Plants at the edges', {
      b: 'Part 2 — some of India’s plants live in very harsh places: dry sand, salty tidal mud and cold mountain slopes. Each has special features that help it survive. We also see how India is trying to protect and extend its forests.',
      v: table(['Harsh condition', 'Vegetation', 'Example place'], [['Very little rain', 'Thorn forest and scrub', 'Barmer, Kutch'], ['Salty, tidal mud', 'Mangroves', 'Sundarbans, Mahanadi delta'], ['Cold, high altitude', 'Coniferous and alpine', 'Himachal Pradesh, Sikkim']], 'Table of harsh conditions, the vegetation found there and an example place'),
      n: 'Some plants live in very harsh conditions. In the desert there is little water, on muddy coasts the water is salty and the tide comes and goes, and on high mountains it is cold. Each kind of vegetation has special features that help it survive. In this part we look at desert, tidal and mountain vegetation, and then at how we can protect and grow our forests.',
    }),
    sl('concept', 'Tropical desert (thorn) vegetation', {
      b: '**Climate:** rainfall under about 70 cm, long dry season, hot summers. **Distribution:** western Rajasthan, Kutch and Saurashtra in Gujarat, south-west Punjab and Haryana, dry parts of the Deccan in the rain-shadow. **Adaptations:** **long roots** that reach deep water; **small, thorny or waxy leaves** that lose little water; **thick, fleshy stems** that store water (cacti, euphorbias); trees widely scattered. **Plants:** babul (acacia), khejri, kikar, ber, wild palms, cacti, euphorbias. **Uses:** fuel, fodder, gum from babul, tanning bark.',
      v: table(['Adaptation', 'How it helps'], [['Long roots', 'Reach water deep underground'], ['Small or thorny leaves', 'Less water lost by transpiration'], ['Waxy coating', 'Seals in moisture'], ['Fleshy stems', 'Store water for dry months']], 'Table of desert plant adaptations and how each helps'),
      n: 'In the desert there is very little rain and a long dry season. Plants such as babul, khejri and cacti survive by saving water. Their roots run very deep to reach water underground. Their leaves are small, thorny or waxy, so they lose little water. Some have thick fleshy stems that store water. The trees grow far apart, each one drawing water from a wide area.',
    }),
    sl('diagram', 'Littoral or tidal forests: mangroves', {
      b: '**Where:** on muddy coasts and **deltas** washed by tides — the **Ganga–Brahmaputra delta (Sundarbans)**, the deltas of the **Mahanadi, Godavari, Krishna and Kaveri**, and the Andaman and Nicobar Islands. **Adaptations:** they tolerate **salty water**; **stilt (prop) roots** hold them in soft mud; **breathing roots (pneumatophores)** grow upward and take in air at low tide, because waterlogged mud lacks oxygen. **Trees:** **sundari** (hard, durable timber for boats), keora, agar, nipa palm. **Value:** protect coasts from storm waves and erosion; fish breeding grounds; habitat of the Bengal tiger in the Sundarbans.',
      v: V.mangrove,
      n: 'Mangroves are the forests of muddy, salty coasts and deltas, such as the Sundarbans. The tide floods them twice a day. They have stilt roots that hold them firmly in the soft mud, and breathing roots that poke up out of the mud to take in air when the tide goes out. The sundari tree gives hard, lasting timber for boats. Mangroves also shield the coast from storm waves.',
    }),
    sl('check', 'Quick check: mangroves', {
      b: 'Explain a mangrove adaptation.',
      n: 'Quick check. Breathing roots take in air because the wet mud lacks oxygen.',
      chk: 'mangrove-chk',
    }),
    sl('diagram', 'Mountain vegetation: zones with altitude', {
      b: 'In the Himalayas, **temperature falls with altitude** (about 6.5 °C per 1000 m), so vegetation changes in belts, much as it would travelling towards the poles. Approximate zones: **foothills** — tropical moist deciduous (sal); **about 1000–2000 m** — wet temperate forest of **oak and chestnut**; **about 2000–3000 m** — **coniferous** forest of **pine, deodar, spruce, silver fir, cedar**; **about 3000–3600 m** — alpine forest of silver fir, juniper, birch, rhododendron; **above about 3600 m** — **alpine meadows**, used for summer grazing by herders such as the Gujjars and Bakarwals; higher still, mosses and lichens, then snow.',
      v: V.mountain,
      n: 'As you climb a mountain it gets colder, so the plants change in belts. In the Himalayan foothills sal forests grow. Higher up come forests of oak and chestnut, then cone bearing trees such as pine, deodar, spruce and fir. Near the tree line there are junipers, birches and rhododendrons. Above that are alpine meadows where herders graze their flocks in summer, and finally only mosses and lichens below the snow.',
    }),
    sl('example', 'Worked example: temperature and altitude', {
      b: `**Problem.** At the foot of a Himalayan range (illustrative) the mean summer temperature is ${BASE.temp} °C. Taking a fall of ${LAPSE} °C per 1000 m, estimate the temperature at 2000 m and at 3000 m, and say which forest you would expect at each.\n\n**Step 1.** At 2000 m: $${BASE.temp} - ${LAPSE} \\times 2 = ${T2000}$ °C → cool: the boundary between oak–chestnut and coniferous forest.\n\n**Step 2.** At 3000 m: $${BASE.temp} - ${LAPSE} \\times 3 = ${T3000}$ °C → cold: the upper limit of coniferous forest, giving way to alpine trees.\n\n**Step 3. Conclusion.** Falling temperature, not rainfall, explains the belts of mountain vegetation.`,
      v: table(['Altitude (m)', 'Illustrative temperature (°C)', 'Vegetation'], [['0', String(BASE.temp), 'Sal (tropical deciduous)'], ['2000', String(T2000), 'Oak, chestnut to conifers'], ['3000', String(T3000), 'Conifers to alpine']], 'Table of illustrative temperatures at three altitudes with the vegetation expected'),
      n: 'Suppose it is thirty degrees at the foot of a range and the air cools by six and a half degrees for every thousand metres. At two thousand metres it would be about seventeen degrees, cool enough for oak and conifers. At three thousand metres it would be about ten and a half degrees, near the upper limit of the conifers. So it is falling temperature that makes the belts.',
    }),
    sl('check', 'Quick check: mountain zones', {
      b: 'Explain the order of vegetation belts on a mountain.',
      n: 'Quick check. As altitude rises, temperature falls and vegetation changes in belts.',
      chk: 'mountain-chk',
    }),
    sl('diagram', 'Reading forest data (illustrative)', {
      b: `An imagined state has ${forestTotal} sq km of forest (illustrative). Share of each type is its area ÷ total × 100: ${FOREST_AREA.map((r) => `${r.type} ${share(r.type)}%`).join(', ')}. Deciduous forests together make up ${share('Moist deciduous') + share('Dry deciduous')}% — as in India as a whole, the monsoon forests dominate.`,
      v: V.share,
      n: 'Here is an imagined state with twelve thousand square kilometres of forest. To find the share of one type, divide its area by the total and multiply by one hundred. Moist deciduous forest makes up half, dry deciduous almost a third, evergreen fifteen per cent and mangroves five per cent. Together the deciduous forests make up four fifths, just as monsoon forests dominate in India.',
    }),
    sl('concept', 'Why forests must be conserved', {
      b: 'Forests are lost to **clearing for farms, roads, dams, mines and towns**, **overgrazing**, **fuelwood cutting**, **forest fires** and **shifting cultivation**. Loss of forest brings **soil erosion, floods and droughts**, **silting of reservoirs**, loss of **wildlife**, and hardship for people who depend on forests. **Forest conservation** means protecting existing forests and **increasing tree cover** through planned planting and careful use.',
      v: flow('LR', [['a', 'Clearing, overgrazing, fuelwood, fires'], ['b', 'Forest cover shrinks'], ['c', 'Erosion, floods, silting'], ['d', 'Loss of wildlife and livelihoods']], [['a', 'b'], ['b', 'c'], ['b', 'd']], 'Flow showing causes of forest loss and its effects'),
      n: 'Forests are cleared for farms, roads, dams, mines and towns. Too many animals graze, people cut wood for fuel, and fires spread. When forests disappear, soil is washed away, floods and droughts grow worse, reservoirs fill with silt, wildlife loses its home and forest people lose their living. Conservation means protecting the forests we have and adding new tree cover.',
    }),
    sl('concept', 'Methods: afforestation, reforestation, social forestry, agroforestry', {
      b: '**Afforestation:** planting trees on land that has **not had forest** (or not for a very long time), such as wasteland and dunes. **Reforestation:** **replanting** trees where a forest has been **cut or burnt**. **Social forestry:** planting trees on **public and community land** — roadsides, canal banks, railway land, village commons — to meet local needs for **fuel, fodder and small timber**, with people’s participation. **Agroforestry:** growing **trees together with crops** (and sometimes livestock) on the **same farmland**, giving extra income and protecting the soil. **Van Mahotsav:** a **tree-planting festival** started in **1950**, held every year in the **first week of July** to make people aware of the value of trees and to plant saplings.',
      v: table(['Method', 'Where trees are planted', 'Main aim'], [['Afforestation', 'Land without forest', 'Create new forest'], ['Reforestation', 'Land where forest was cut or burnt', 'Restore forest'], ['Social forestry', 'Public and community land', 'Fuel, fodder for villagers'], ['Agroforestry', 'Farmland, with crops', 'Extra income, soil care'], ['Van Mahotsav', 'Everywhere (festival, July)', 'Awareness and planting']], 'Table comparing afforestation, reforestation, social forestry, agroforestry and Van Mahotsav'),
      n: 'Afforestation means planting trees where there was no forest, such as on wasteland. Reforestation means replanting where a forest has been cut or burnt. Social forestry plants trees on public land, like roadsides and canal banks, to give villagers fuel and fodder. Agroforestry grows trees and crops together on a farm. And Van Mahotsav is a tree planting festival held every July since nineteen fifty.',
    }),
    sl('example', 'Worked example: naming the method', {
      b: '**Problem.** Name the method in each case and give a reason.\n\n**(a)** Saplings are planted on sand dunes near Bikaner that have never carried forest. → **Afforestation:** new forest on land without one.\n\n**(b)** A sal forest burnt in Jharkhand is replanted. → **Reforestation:** an old forest is restored.\n\n**(c)** A panchayat in Haryana plants neem and shisham along canal banks for villagers’ fuel and fodder. → **Social forestry:** public land, community benefit.\n\n**(d)** A Punjab farmer grows poplar between rows of wheat. → **Agroforestry:** trees and crops on the same farm.',
      v: flow('TB', [['a', 'Was there forest before?'], ['b', 'No: afforestation'], ['c', 'Yes, cut or burnt: reforestation'], ['d', 'Public land for local needs: social forestry'], ['e', 'On a farm with crops: agroforestry']], [['a', 'b'], ['a', 'c'], ['a', 'd'], ['a', 'e']], 'Decision flow for naming a forest conservation method'),
      n: 'To name the method, ask a few questions. Was there a forest before? If not, planting is afforestation. If the forest was cut or burnt and is being replanted, it is reforestation. If trees are planted on public land to meet the needs of villagers, it is social forestry. And if a farmer grows trees among his crops, it is agroforestry.',
    }),
    sl('check', 'Quick check: conservation methods', {
      b: 'Name a forest conservation method from a description.',
      n: 'Quick check. Afforestation makes new forest; reforestation restores an old one.',
      chk: 'conserve-chk',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Desert vegetation: under 70 cm rain; long roots, small thorny or waxy leaves, fleshy stems; babul, khejri, cacti.',
        'Littoral forests: deltas and tidal coasts; salt-tolerant, stilt and breathing roots; sundari; protect coasts.',
        'Mountain vegetation changes with altitude because temperature falls: sal, oak and chestnut, conifers, alpine trees, meadows.',
        'Conservation: afforestation (new), reforestation (restore), social forestry (public land), agroforestry (farms), Van Mahotsav (July festival since 1950).',
      ],
      v: table(['Type', 'Key adaptation or idea'], [['Desert', 'Save water'], ['Mangrove', 'Salt, breathing roots'], ['Mountain', 'Belts with altitude'], ['Conservation', 'Plant and protect']], 'Summary table of Part 2'),
      n: 'Let us sum up Part 2. Desert plants save water with deep roots and small, thorny leaves. Mangroves live in salty tidal mud, with stilt roots and breathing roots, and protect the coast. Mountain vegetation changes in belts because it gets colder as you climb. To protect forests, India uses afforestation, reforestation, social forestry, agroforestry and the Van Mahotsav festival.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'For adaptations, state the feature and how it helps (deep roots → reach water).',
        'Mountain zones: say "temperature falls with altitude" and name a tree in each belt.',
        'Afforestation versus reforestation: was there a forest before?',
        'Social forestry is on public land; agroforestry is on farmland.',
      ],
      v: table(['Slip', 'Fix'], [['Mangroves in deserts', 'In tidal deltas'], ['Rainfall causes mountain belts', 'Falling temperature does'], ['Social forestry on private farms', 'That is agroforestry']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. For every adaptation, give the feature and explain how it helps the plant. For mountain vegetation, say that temperature falls with height and name a tree in each belt. To tell afforestation from reforestation, ask whether there was a forest before. And remember: social forestry is on public land, agroforestry is on farms.',
    }),
  ],
});
