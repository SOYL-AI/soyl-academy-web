// ICSE 10 Geography ch07 Soil Resources — two decks: Part 1 (t01–t03) alluvial, black, red and laterite soils; Part 2 (t04–t05)
// soil erosion and soil conservation (with an ILLUSTRATIVE field trial computed in svgs.mjs).
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { PROFILE, KB, EROSION, CONSERVE, LOSS_CHART, LOSS, cut } from './svgs.mjs';

const V = {
  profile: svgV(PROFILE, 'Soil profile with topsoil, subsoil, weathered rock and bedrock'),
  kb: svgV(KB, 'Cross-section of a river plain with khadar beside the river and bhangar on the higher terrace'),
  erosion: svgV(EROSION, 'Three panels showing sheet erosion, gully erosion and wind erosion'),
  conserve: svgV(CONSERVE, 'Terraced hill slope and contour furrows running across a slope'),
  loss: svgV(LOSS_CHART, 'Bar chart of illustrative soil loss under four farming methods'),
};

export const deck1 = deck({
  part: 1,
  title: 'Soil Resources — Part 1: The major soils of India',
  goals: [
    'Distinguish khadar from bhangar and name the crops of alluvial soil',
    'Explain how black soil forms from lava and why it suits cotton',
    'Explain the colour of red soil and the leaching that forms laterite',
    'Compare red and laterite soils by texture, fertility and crops',
  ],
  slides: [
    sl('title', 'The ground beneath the crops', {
      b: 'Part 1 — a wheat field in Punjab, a cotton field near Akola, a groundnut plot near Anantapur and a cashew orchard in Goa all stand on different soils. Four soil groups cover most of India.',
      v: table(['Soil', 'Typical region', 'Typical crop'], [['Alluvial', 'Northern plains, deltas', 'Wheat, rice, sugarcane'], ['Black (regur)', 'Deccan lava plateau', 'Cotton'], ['Red', 'Old crystalline plateau', 'Millets, groundnut'], ['Laterite', 'Heavy-rain hill tops', 'Cashew, tea, coffee']], 'Table of the four main soil groups of India with a region and a crop for each'),
      n: 'Namaste! The soil under a wheat field in Punjab is very different from the soil under a cotton field in Maharashtra or a cashew orchard in Goa. India has four main soil groups: alluvial, black, red and laterite. In this part we see how each one forms, where it is found, what it is like, and which crops grow well in it.',
    }),
    sl('concept', 'What soil is and how it forms', {
      b: '**Soil** is the thin, loose top layer of the land, made of weathered rock particles, **humus** (decayed plant and animal matter), water and air. It forms very slowly as **parent rock** is broken down by weathering and mixed with organic matter. Its type depends on the **parent rock**, **climate** (rain and temperature), **relief**, **vegetation** and **time**. A vertical section through soil, the **soil profile**, shows layers called horizons.',
      v: V.profile,
      n: 'Soil is the thin, loose layer that covers the land. It is made of tiny pieces of weathered rock mixed with humus, which is decayed plant and animal matter, along with water and air. Soil forms very slowly from the rock beneath it. The kind of soil depends on the parent rock, the climate, the slope of the land, the vegetation and the time it has had to develop.',
    }),
    sl('concept', 'Alluvial soil: formation and distribution', {
      b: '**Formation:** deposited by rivers — the Indus, Ganga and Brahmaputra systems in the north, and the east-coast rivers in their **deltas**. **Distribution:** the largest soil group, covering roughly two-fifths of India: the Punjab–Haryana plain, Uttar Pradesh, Bihar, West Bengal, the Brahmaputra valley, and the deltas of the Mahanadi, Godavari, Krishna and Kaveri. **Composition:** sand, silt and clay; generally rich in **potash and lime**, but poor in **nitrogen and humus**. Texture is coarse near the foothills and finer (more clayey) down-river and in the deltas.',
      v: table(['Feature', 'Alluvial soil'], [['Formed by', 'River deposits'], ['Found in', 'Northern plains, river deltas, coastal plains'], ['Rich in', 'Potash, lime'], ['Poor in', 'Nitrogen, humus'], ['Crops', 'Wheat, rice, sugarcane, jute, pulses, oilseeds']], 'Table of the formation, distribution, composition and crops of alluvial soil'),
      n: 'Alluvial soil is laid down by rivers. It covers the great northern plains, from Punjab to West Bengal and the Brahmaputra valley, and the deltas of the east coast rivers. It is the largest soil group in India. It is usually rich in potash and lime but short of nitrogen and humus. Near the hills it is coarse and sandy, and farther downstream it becomes fine and clayey.',
    }),
    sl('diagram', 'Khadar and bhangar', {
      b: '**Khadar** is **new alluvium** on the low floodplains next to rivers. It is renewed almost every year by floods, is light-coloured, fine and very **fertile**. **Bhangar** is **old alluvium** on the higher river terraces, above the usual flood level. It is darker, more clayey, less fertile and contains lime nodules called **kankar**. Both grow wheat, rice and sugarcane, but khadar needs little manure.',
      v: V.kb,
      n: 'The northern plains have two kinds of alluvium. Khadar is new alluvium on the low ground beside a river. Floods cover it almost every year and leave a fresh layer of fine silt, so it stays very fertile. Bhangar is old alluvium on the higher terraces, above the reach of normal floods. It is older, more clayey and less fertile, and it often contains lumps of lime called kankar.',
    }),
    sl('check', 'Quick check: khadar or bhangar?', {
      b: 'Decide which type of alluvium a field lies on.',
      n: 'Quick check. Khadar lies low beside the river and is renewed by floods; bhangar lies higher up.',
      chk: 'khadar-chk',
    }),
    sl('concept', 'Black soil (regur)', {
      b: '**Formation:** weathering of **basalt**, the lava rock of the **Deccan trap**. **Distribution:** Maharashtra, the Malwa plateau of Madhya Pradesh, Saurashtra in Gujarat, and parts of Karnataka, Telangana and Andhra Pradesh. **Characteristics:** fine, **clayey**; holds **moisture** for a long time; becomes **sticky** when wet and develops **deep cracks** when dry, so air reaches deep down and loose soil falls into the cracks ("**self-ploughing**"); rich in lime, iron, magnesia and potash; poor in nitrogen, phosphorus and humus. **Crops:** **cotton** (hence "black cotton soil"), sugarcane, jowar, wheat, groundnut, tobacco.',
      v: table(['Feature', 'Black soil'], [['Parent rock', 'Basalt (Deccan lava)'], ['Texture', 'Fine, clayey'], ['Water', 'Holds moisture for long'], ['In dry season', 'Deep cracks (self-ploughing)'], ['Main crop', 'Cotton']], 'Table of the main features of black soil'),
      n: 'Black soil, also called regur, formed from the weathering of basalt, the lava rock that covers much of the Deccan plateau. It is common in Maharashtra, the Malwa plateau and Saurashtra. Being very clayey, it holds water for a long time. It turns sticky after rain and cracks deeply in the dry season. Its most famous crop is cotton, which is why it is also called black cotton soil.',
    }),
    sl('example', 'Worked example: why cotton thrives on the Malwa plateau', {
      b: '**Problem.** Farmers on the Malwa plateau grow cotton on black soil, often with little irrigation, though the plateau gets only moderate rain. Give geographical reasons.\n\n**Step 1. Moisture.** The clayey soil holds water from the monsoon for a long time, feeding the deep roots of cotton after the rains end.\n\n**Step 2. Nutrients.** It is rich in lime, potash and magnesia, which cotton needs.\n\n**Step 3. Aeration.** Cracks that open in the dry season let air into the soil and turn it over.\n\n**Step 4. Climate.** Moderate rain and a long, sunny, frost-free season suit the cotton plant.',
      v: flow('LR', [['a', 'Basalt (Deccan lava)'], ['b', 'Weathers to fine clayey black soil'], ['c', 'Holds monsoon moisture'], ['d', 'Cotton grows with little irrigation']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow from basalt rock to black soil to stored moisture to cotton growing'),
      n: 'Why can cotton grow on the Malwa plateau with little irrigation? First, black soil is clayey, so it soaks up monsoon rain and releases it slowly to the deep cotton roots. Second, it is rich in lime, potash and magnesia. Third, the cracks of the dry season let air in. Finally, the long, sunny, frost free season of the plateau suits cotton well.',
    }),
    sl('check', 'Quick check: black soil', {
      b: 'Link a feature of black soil to its cause.',
      n: 'Quick check. Black soil comes from lava rock, holds moisture and cracks when dry.',
      chk: 'black-chk',
    }),
    sl('concept', 'Red soil', {
      b: '**Formation:** weathering of old **crystalline and metamorphic rocks** such as granite and gneiss, mostly in areas of low to moderate rainfall. **Colour:** **iron oxide** spread through the soil makes it **red**; where the iron oxide is hydrated, it looks **yellow**. **Distribution:** Tamil Nadu, Karnataka, Telangana and Andhra Pradesh, Odisha, Chhattisgarh and the Chota Nagpur plateau of Jharkhand. **Characteristics:** light, sandy to loamy, porous; does not hold water well; poor in nitrogen, phosphorus and humus. **Crops** (with fertilisers and irrigation): millets such as ragi and jowar, groundnut, pulses, tobacco, rice in the lowlands.',
      v: table(['Feature', 'Red soil'], [['Parent rock', 'Granite, gneiss (old crystalline)'], ['Colour from', 'Iron oxide (yellow when hydrated)'], ['Texture', 'Sandy to loamy, porous'], ['Fertility', 'Low; needs fertilisers'], ['Crops', 'Ragi, jowar, groundnut, pulses']], 'Table of the main features of red soil'),
      n: 'Red soil formed from the ancient crystalline rocks of the peninsula, such as granite and gneiss, mostly where rainfall is low or moderate. It gets its red colour from iron oxide spread through it, and where that iron oxide holds water it looks yellow. Red soil is light and porous, so it does not hold water well, and it is poor in nitrogen and humus. With fertiliser and irrigation it grows millets, groundnut and pulses.',
    }),
    sl('concept', 'Laterite soil and leaching', {
      b: 'The name comes from the Latin *later*, "brick". **Formation:** under **high temperature** and **heavy rainfall** with alternate wet and dry seasons. Heavy rain soaks through the soil and **leaches** (washes down) lime and silica, leaving behind oxides of **iron and aluminium**. **Characteristics:** coarse, acidic, poor in nitrogen, lime and humus; it **hardens like brick** when dry and exposed to air. **Distribution:** summits of the Western and Eastern Ghats, Kerala, Karnataka, Goa, Odisha hills, Meghalaya. **Crops** (with manure): **cashew**, **tea**, **coffee**, rubber, coconut.',
      v: flow('TB', [['a', 'High temperature and heavy rain'], ['b', 'Water percolates through soil'], ['c', 'Lime and silica washed down (leaching)'], ['d', 'Iron and aluminium oxides left behind'], ['e', 'Laterite: acidic, infertile, hardens in air']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow showing how heavy rain leaches lime and silica and leaves iron and aluminium oxides to form laterite'),
      n: 'Laterite forms where it is hot and very wet, with a dry season in between. Heavy rain soaks down through the soil and carries away lime and silica. This washing out is called leaching. What remains is rich in iron and aluminium oxides, but poor in plant food. Laterite becomes hard like brick when it dries in the air. With plenty of manure it grows cashew, tea, coffee and rubber.',
    }),
    sl('example', 'Worked example: comparing red and laterite soils', {
      b: '**Problem.** A student says, "Red soil and laterite are both reddish, so they are the same." Compare them under three heads to correct this.\n\n**Formation.** Red soil comes from the weathering of crystalline rocks in **low to moderate** rain; laterite forms by **leaching** under **heavy** rain and high temperature.\n\n**Texture and fertility.** Red soil is sandy-loamy and porous, low in nitrogen and humus but improves well with fertiliser; laterite is coarse, **acidic** and **very infertile**, and hardens into brick.\n\n**Crops.** Red soil: millets, groundnut, pulses. Laterite: plantation crops such as cashew, tea and coffee on hill slopes.',
      v: table(['Head', 'Red soil', 'Laterite soil'], [['Rainfall', 'Low to moderate', 'Heavy, with a dry season'], ['Process', 'Weathering of crystalline rock', 'Intense leaching'], ['Texture', 'Sandy to loamy', 'Coarse; hardens in air'], ['Fertility', 'Low, responds to fertiliser', 'Very low, acidic'], ['Crops', 'Millets, groundnut', 'Cashew, tea, coffee']], 'Table comparing red and laterite soils by rainfall, process, texture, fertility and crops'),
      n: 'Red and laterite soils both look reddish, but they differ. Red soil forms from crystalline rock where rain is moderate, while laterite forms where heavy rain leaches the soil. Red soil is sandy and porous and responds well to fertiliser, while laterite is coarse, acidic and very poor, and hardens like brick. Red soil grows millets and groundnut; laterite suits cashew, tea and coffee.',
    }),
    sl('check', 'Quick check: laterite', {
      b: 'Identify the process or conditions behind laterite.',
      n: 'Quick check. Laterite forms where heavy rain leaches away lime and silica.',
      chk: 'laterite-chk',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Alluvial: river-laid; northern plains and deltas; khadar new and fertile, bhangar old with kankar; wheat, rice, sugarcane.',
        'Black (regur): from Deccan basalt; clayey, moisture-retentive, self-ploughing; cotton.',
        'Red: from crystalline rocks; red from iron oxide, yellow when hydrated; porous, low fertility; millets, groundnut.',
        'Laterite: leaching under heavy rain; iron and aluminium oxides; acidic, hardens in air; cashew, tea, coffee.',
      ],
      v: table(['Soil', 'Key word'], [['Alluvial', 'River deposits'], ['Black', 'Lava, moisture, cotton'], ['Red', 'Iron oxide'], ['Laterite', 'Leaching']], 'Summary table giving one key idea for each soil'),
      n: 'Let us sum up Part 1. Alluvial soil is laid down by rivers; khadar is new and fertile, bhangar is old and holds kankar. Black soil comes from lava, holds moisture and suits cotton. Red soil gets its colour from iron oxide and is light and porous. Laterite forms by leaching under heavy rain and is poor, but grows plantation crops with manure.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'For each soil, learn four heads: formation, distribution, characteristics, crops.',
        'Khadar versus bhangar: age, height above floods, fertility, kankar.',
        'Give two reasons for "black soil suits cotton": moisture retention and nutrients (self-ploughing is a bonus).',
        'Say "leaching" for laterite and "iron oxide" for the colour of red soil.',
      ],
      v: table(['Slip', 'Fix'], [['Bhangar is new alluvium', 'Bhangar is old; khadar is new'], ['Black soil from river silt', 'From weathered basalt lava'], ['Laterite is very fertile', 'It is leached and infertile']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some tips for the exam. For every soil, remember formation, distribution, characteristics and crops. In khadar and bhangar answers, mention age, height above flood level, fertility and kankar. To explain why black soil suits cotton, give moisture retention and nutrients. And always use the word leaching for laterite and iron oxide for the colour of red soil.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Soil Resources — Part 2: Soil erosion and conservation',
  goals: [
    'Explain sheet, gully and wind erosion',
    'Identify human causes of soil erosion such as deforestation and overgrazing',
    'Describe terrace farming, contour ploughing, shelter belts and afforestation and say where each suits',
    'Interpret illustrative data on soil loss under different methods',
  ],
  slides: [
    sl('title', 'When the soil walks away', {
      b: 'Part 2 — a centimetre of fertile topsoil can take hundreds of years to form, yet one violent storm can strip it from a bare slope in an afternoon. Protecting soil is protecting food.',
      v: table(['Agent', 'Where it does most damage'], [['Running water', 'Bare slopes, ravine lands of the Chambal'], ['Wind', 'Dry sandy lands of western Rajasthan'], ['Waves', 'Coasts'], ['Glaciers', 'High Himalaya']], 'Table of agents of soil erosion and the kinds of place where each is most active'),
      n: 'Topsoil forms very slowly, over hundreds of years, but it can be lost in a single storm if the ground is bare. Running water, wind, waves and glaciers can all carry soil away. In India the worst damage is done by running water on slopes and in ravine lands, and by wind in the dry west. In this part we study erosion and the ways to stop it.',
    }),
    sl('concept', 'Soil erosion and its types', {
      b: '**Soil erosion** is the removal of the top layer of soil by natural agents, faster than new soil can form. **Sheet erosion:** running water removes a **thin, even layer** of topsoil from a large area; it is hard to notice until the land loses fertility. **Gully erosion:** water running down slopes cuts **deep channels (gullies)**; they widen and join until the land becomes **ravines** — the Chambal valley of Madhya Pradesh, Rajasthan and Uttar Pradesh is a well-known example. **Wind erosion:** strong winds blow away **loose, dry, bare** soil, as in western Rajasthan.',
      v: V.erosion,
      n: 'Soil erosion is the removal of topsoil faster than new soil can form. In sheet erosion, rainwater flowing over a slope removes a thin layer evenly from a wide area, so the loss is hard to notice. In gully erosion, water cuts deep channels that grow into ravines, as in the Chambal valley. In wind erosion, strong winds lift loose, dry soil from bare land, as in the Thar region.',
    }),
    sl('concept', 'Human causes of soil erosion', {
      b: '**Deforestation:** tree roots bind soil and leaves break the force of rain; cutting forests on hill slopes exposes the soil. **Overgrazing:** too many cattle, sheep and goats eat grass down to the roots and their hooves loosen the soil, as on many Himalayan and Aravalli slopes. **Faulty farming:** ploughing **up and down** slopes, leaving fields bare after harvest, and **shifting cultivation** (jhum) on north-eastern hills. **Other:** mining, quarrying, road building and construction strip the land of its cover.',
      v: flow('LR', [['a', 'Forest cleared or overgrazed'], ['b', 'Roots and grass cover lost'], ['c', 'Rain hits bare soil; runoff speeds up'], ['d', 'Topsoil washed away']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow showing how loss of plant cover leads to faster runoff and loss of topsoil'),
      n: 'People speed up erosion in many ways. When forests are cut on slopes, nothing holds the soil or breaks the force of the rain. When too many animals graze, the grass is eaten to its roots and hooves loosen the ground. Ploughing up and down a slope makes channels for water to rush down. Shifting cultivation, mining and building also leave the soil bare.',
    }),
    sl('check', 'Quick check: types of erosion', {
      b: 'Name the type of erosion from a description.',
      n: 'Quick check. Sheet erosion removes a thin even layer; gully erosion cuts deep channels.',
      chk: 'sheet-chk',
    }),
    sl('example', 'Worked example: how the Chambal ravines formed', {
      b: '**Problem.** Explain how large areas along the Chambal river became ravine land unfit for farming.\n\n**Step 1. Soil.** The valley has deep, soft alluvial soil that is easily cut by water.\n\n**Step 2. Rain.** Most rain falls in short, heavy monsoon downpours, so runoff is fast.\n\n**Step 3. Cover.** Natural vegetation was cleared and slopes were overgrazed, leaving the soil bare.\n\n**Step 4. Gullying.** Runoff cut small channels that deepened and joined, eating back into the farmland: **gully erosion** produced **ravines** (badlands).',
      v: flow('LR', [['a', 'Soft deep alluvium'], ['b', 'Heavy monsoon downpours'], ['c', 'Bare, overgrazed slopes'], ['d', 'Gullies deepen and join'], ['e', 'Ravines']], [['a', 'd'], ['b', 'd'], ['c', 'd'], ['d', 'e']], 'Flow of three causes joining to produce gullies and then ravines in the Chambal valley'),
      n: 'How did the Chambal ravines form? The valley has deep, soft soil that water cuts easily. Monsoon rain comes in short, heavy bursts, so water rushes off the land. Much of the natural cover was cleared or grazed away. The running water cut small channels that grew deeper and wider and joined together, until whole stretches of farmland turned into a maze of ravines.',
    }),
    sl('concept', 'Why soil conservation matters', {
      b: '**Soil conservation** means protecting soil from erosion and keeping it fertile. It matters because: soil forms **very slowly** and lost topsoil cannot be replaced in a lifetime; most of India depends on **farming**; eroded soil fills **reservoirs and rivers** with silt, reducing water storage and causing floods; and the loss of fertile land can push farmers into poverty. Methods include **terrace farming**, **contour ploughing**, **strip cropping**, **shelter belts**, **afforestation**, **plugging gullies** with check dams, and **controlled grazing**.',
      v: table(['Reason', 'Example of the effect'], [['Soil forms slowly', 'Lost topsoil cannot be replaced quickly'], ['Farming needs soil', 'Lower yields on eroded fields'], ['Silt in rivers', 'Reservoirs fill up; floods rise'], ['Livelihoods', 'Farmers leave ravine land']], 'Table of four reasons for soil conservation and an example of each'),
      n: 'Why conserve soil? Topsoil forms very slowly, so once it is lost it is gone for generations. Most Indians depend on farming, which depends on soil. Eroded soil ends up as silt in rivers and reservoirs, cutting the water they can store and making floods worse. That is why farmers and governments use terraces, contour ploughing, shelter belts, tree planting and check dams.',
    }),
    sl('diagram', 'Terrace farming and contour ploughing', {
      b: '**Terrace farming:** a steep slope is cut into a series of **flat steps (terraces)**; each step slows water and holds soil. Suited to **steep hill slopes** — the Himalayas of Uttarakhand, Himachal Pradesh and Sikkim, and the north-eastern hills. **Contour ploughing:** ploughing **across** the slope along lines of equal height (contours), so each furrow acts as a small barrier that slows runoff and lets water soak in. Suited to **gentle slopes** such as the uplands of the Chota Nagpur plateau.',
      v: V.conserve,
      n: 'On steep hill slopes, farmers cut the land into flat steps called terraces. Water stops on each step instead of rushing down, so the soil stays in place. This is common in the Himalayas and the north east. On gentler slopes, farmers plough across the slope along the contours. Each furrow becomes a little barrier that slows the water and lets it sink in.',
    }),
    sl('check', 'Quick check: contour ploughing', {
      b: 'Explain how contour ploughing works.',
      n: 'Quick check. Furrows across the slope hold back water and soil.',
      chk: 'contour-chk',
    }),
    sl('concept', 'Shelter belts, afforestation and other methods', {
      b: '**Shelter belts:** rows of trees and shrubs planted along field edges at right angles to the prevailing wind; they cut wind speed and trap blowing sand — used in **western Rajasthan**, Haryana and Punjab. **Afforestation:** planting trees on bare slopes and wasteland so roots bind the soil and leaf litter adds humus. **Strip cropping:** strips of grass or a cover crop alternate with strips of the main crop to break the force of wind or water. **Plugging gullies:** check dams and planting in gullies stop them growing (Chambal). **Controlled grazing:** rotation of pastures.',
      v: table(['Method', 'Best suited to', 'Region (example)'], [['Terrace farming', 'Steep hill slopes', 'Uttarakhand, Sikkim'], ['Contour ploughing', 'Gentle slopes', 'Chota Nagpur uplands'], ['Shelter belts', 'Windy dry plains', 'Western Rajasthan'], ['Plugging gullies', 'Gullied land', 'Chambal valley'], ['Afforestation', 'Bare slopes, wasteland', 'Shivalik hills']], 'Table matching soil conservation methods to the land they suit and an example region'),
      n: 'Other methods suit other lands. Shelter belts are rows of trees planted across the path of the wind; they slow it down and trap sand, which helps farms in western Rajasthan. Afforestation covers bare slopes with trees whose roots grip the soil. Strip cropping alternates a crop with strips of grass. Check dams plug gullies, and controlled grazing lets pastures recover.',
    }),
    sl('diagram', 'Reading an illustrative field trial', {
      b: `In an imagined trial on a slope, four plots were farmed in different ways and the soil lost each year was measured (illustrative values). Up-and-down ploughing lost ${LOSS.updown} t per hectare; terraces only ${LOSS.terrace} t. The more the method slows running water, the smaller the loss.`,
      v: V.loss,
      n: 'This chart shows imagined results of a field trial on a slope. Ploughing up and down the slope lost forty tonnes of soil per hectare in a year. Contour ploughing cut the loss to twenty two tonnes, contour ploughing with grass strips to fourteen, and terracing to only eight. The pattern is clear: the better a method slows running water, the less soil is lost.',
    }),
    sl('example', 'Worked example: percentage reduction in soil loss', {
      b: r`**Problem.** Using the illustrative trial, by what percentage does contour ploughing with strip cropping reduce soil loss compared with up-and-down ploughing?` + `\n\n**Step 1.** Reduction $= ${LOSS.updown} - ${LOSS.strip} = ${LOSS.updown - LOSS.strip}$ t per hectare.\n\n**Step 2.** Percentage $= \\frac{${LOSS.updown - LOSS.strip}}{${LOSS.updown}} \\times 100 = ${cut('strip')}$%.\n\n**Step 3. Interpret.** Combining contour furrows with grass strips removes about two-thirds of the loss; only terracing does better.`,
      v: table(['Method', 'Loss (t per hectare)', 'Reduction'], [['Up and down', String(LOSS.updown), '—'], ['Contour + strips', String(LOSS.strip), `${cut('strip')}%`]], 'Table of the up-and-down and strip-cropping plots with the reduction'),
      n: 'Let us work out the saving from contour ploughing with grass strips. Subtract its loss of fourteen tonnes from the forty tonnes lost by up and down ploughing to get a saving of twenty six tonnes. Divide by forty and multiply by one hundred. The answer is sixty five per cent. So this method keeps nearly two thirds of the soil that would otherwise be lost.',
    }),
    sl('check', 'Quick check: choosing a method', {
      b: 'Pick the best conservation method for a named area.',
      n: 'Quick check. Match the method to the land: steep slope, gentle slope, windy desert or gullied valley.',
      chk: 'method-chk',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Erosion: removal of topsoil faster than it forms; agents water, wind, waves, ice.',
        'Sheet erosion removes a thin layer; gully erosion cuts ravines (Chambal); wind erosion in dry Rajasthan.',
        'Human causes: deforestation, overgrazing, up-and-down ploughing, shifting cultivation, mining.',
        'Conservation: terraces on steep slopes, contour ploughing on gentle slopes, shelter belts in windy dry lands, afforestation, check dams in gullies.',
      ],
      v: table(['Problem', 'Remedy'], [['Steep slope', 'Terraces'], ['Gentle slope', 'Contour ploughing, strips'], ['Strong winds', 'Shelter belts'], ['Gullies', 'Check dams, planting']], 'Summary table of erosion problems and remedies'),
      n: 'Let us sum up Part 2. Soil erosion removes topsoil faster than it can form. Sheet erosion strips a thin layer, gully erosion cuts ravines, and wind blows dry soil away. Cutting forests, overgrazing and careless ploughing make it worse. Terraces protect steep slopes, contour ploughing protects gentle ones, shelter belts protect windy dry lands, and trees and check dams heal gullies.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Define erosion with "faster than soil forms" and name the agent.',
        'Always tie a method to a type of land and a named region.',
        'For human causes, explain the link: no roots, no cover, faster runoff.',
        'In data questions, show the subtraction and the percentage step.',
      ],
      v: table(['Slip', 'Fix'], [['Contour ploughing is up and down the slope', 'It is across the slope'], ['Shelter belts stop gullies', 'They break the wind'], ['Terraces for flat plains', 'Terraces for steep slopes']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. Define erosion as the loss of topsoil faster than it forms, and name the agent. Match each conservation method to the kind of land it suits and give a named region. When you explain a human cause, show the chain: no plant cover, faster runoff, soil washed away. And in data questions, show both the subtraction and the percentage step.',
    }),
  ],
});
