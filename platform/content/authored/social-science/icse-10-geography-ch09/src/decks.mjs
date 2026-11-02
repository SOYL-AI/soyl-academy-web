// ICSE 10 Geography ch09 Water Resources — two decks: Part 1 (t01–t02) surface water and groundwater, the need for conservation,
// rainwater harvesting; Part 2 (t03–t04) irrigation: wells, tube wells, tanks, canals, drip and sprinkler, with ILLUSTRATIVE
// harvest, district and efficiency data computed in svgs.mjs.
import { sl, deck, table, flow, svgV } from './lib.mjs';
import { SOURCES, ROOFTOP, CANALS, MODERN, EFF_CHART, harvest, DISTRICTS, EFF, NEED, applied } from './svgs.mjs';

const V = {
  sources: svgV(SOURCES, 'Cross-section showing a river, rain soaking in, the water table, an aquifer, a dug well and a tube well'),
  rooftop: svgV(ROOFTOP, 'Rooftop rainwater harvesting from roof to gutter, filter, storage tank and recharge pit'),
  canals: svgV(CANALS, 'River levels for an inundation canal and a perennial canal with a barrage'),
  modern: svgV(MODERN, 'Drip irrigation at plant roots and a sprinkler spraying a field'),
  eff: svgV(EFF_CHART, 'Bar chart of illustrative water applied per hectare by flooding, sprinkler and drip'),
};
const DAIRY = { area: 300, rain: 800, coeff: 0.8 };
const dairyL = harvest(DAIRY.area, DAIRY.rain, DAIRY.coeff);
const A = DISTRICTS.A;
const B = DISTRICTS.B;
const [fl, , dr] = EFF.map((e) => applied(e.eff));

export const deck1 = deck({
  part: 1,
  title: 'Water Resources — Part 1: Sources, conservation and rainwater harvesting',
  goals: [
    'Distinguish surface water from groundwater with examples',
    'Explain why water conservation is needed in India',
    'Describe rooftop rainwater harvesting and explain how it recharges groundwater',
  ],
  slides: [
    sl('title', 'Water: plenty, yet scarce', {
      b: 'Part 1 — India receives a great deal of rain, yet many towns queue for tankers in May and many villages see their wells run dry. The answer lies in **where**, **when** and **how** water is found and used.',
      v: table(['Source', 'Type', 'Example'], [['Rivers', 'Surface water', 'Ganga, Godavari'], ['Lakes and tanks', 'Surface water', 'Lakes of Kashmir, tanks of Tamil Nadu'], ['Reservoirs', 'Surface water', 'Behind dams'], ['Groundwater', 'Below the surface', 'Wells and tube wells of the Ganga plain']], 'Table of sources of fresh water with type and example'),
      n: 'Namaste! India gets plenty of rain in the monsoon, yet many towns wait for water tankers in summer and wells in many villages dry up. Why? Water is not spread evenly through the country or through the year, and we often use it carelessly. In this part we look at where our water comes from, why we must conserve it, and how we can harvest the rain.',
    }),
    sl('diagram', 'Surface water and groundwater', {
      b: '**Surface water** is water on the surface of the land: **rivers, lakes, ponds, tanks and reservoirs**. It is fed by rain and, in the north, by melting snow. **Groundwater** is water that has **soaked into the ground** and fills the pores and cracks of rocks below the **water table**, in layers called **aquifers**. It is drawn up through **wells** and **tube wells** and is renewed (**recharged**) when rain soaks in.',
      v: V.sources,
      n: 'Surface water is the water we can see: rivers, lakes, ponds, tanks and reservoirs. Groundwater is hidden. Rain soaks into the ground and fills the tiny spaces in soil and rock below a level called the water table. Rock layers that hold this water are called aquifers. We reach groundwater with wells and tube wells, and it is refilled when rain soaks in again.',
    }),
    sl('concept', 'Where India’s water is found', {
      b: '**Northern plains:** large **perennial rivers** fed by Himalayan snow and monsoon rain; thick, porous **alluvium** stores plenty of **groundwater**, close to the surface. **Peninsular plateau:** rivers are **rain-fed** and shrink in the dry season; hard, **impervious crystalline rocks** hold little groundwater, so water is stored in **tanks** and reservoirs. **Western Rajasthan:** scanty rain, few rivers, deep and often salty groundwater. **Coasts and the north-east:** heavy rain, but much of it runs off quickly to the sea.',
      v: table(['Region', 'Surface water', 'Groundwater'], [['Northern plains', 'Perennial snow-fed rivers', 'Plentiful, shallow (porous alluvium)'], ['Peninsular plateau', 'Seasonal rain-fed rivers, tanks', 'Limited (hard rock)'], ['Western Rajasthan', 'Very scarce', 'Deep, often salty']], 'Table comparing surface water and groundwater in three regions of India'),
      n: 'Water is not shared evenly. The northern plains have big rivers fed by Himalayan snow, and their deep, porous soil holds a lot of groundwater close to the surface. On the peninsular plateau the rivers depend on rain and shrink in the dry season, and the hard rock holds little groundwater, so people store water in tanks. Western Rajasthan has very little water of either kind.',
    }),
    sl('check', 'Quick check: surface or groundwater?', {
      b: 'Classify a source of water.',
      n: 'Quick check. Rivers, lakes and tanks are surface water; water below the water table is groundwater.',
      chk: 'sources-chk',
    }),
    sl('concept', 'Why water must be conserved', {
      b: '**Uneven in time:** most rain falls in **three to four monsoon months**; the rest of the year is dry. **Uneven in space:** the north-east and west coast are very wet, Rajasthan and the rain-shadow Deccan dry. **Rising demand:** a growing population, expanding **irrigation**, industries and cities. **Over-use of groundwater:** water tables are falling in parts of Punjab, Haryana, western Uttar Pradesh, Rajasthan and Tamil Nadu. **Pollution** of rivers and lakes by sewage, industrial waste and farm chemicals reduces usable water. **Droughts** recur when the monsoon fails.',
      v: flow('LR', [['a', 'Rain in a few months'], ['b', 'Rising demand'], ['c', 'Groundwater over-drawn'], ['d', 'Pollution'], ['e', 'Water scarcity: conserve and manage']], [['a', 'e'], ['b', 'e'], ['c', 'e'], ['d', 'e']], 'Flow of four causes joining to make water conservation necessary'),
      n: 'Why must we save water? Most of our rain falls in just a few monsoon months, and some regions get far less than others. Meanwhile, more people, more farms, more factories and bigger cities all need more water. In many districts pumps draw groundwater faster than rain can refill it, so the water table keeps falling. And polluted rivers and lakes cannot be used safely.',
    }),
    sl('example', 'Worked example: a falling water table', {
      b: '**Problem.** In a district of central Punjab, farmers have to deepen their tube wells every few years, though canals and rivers flow nearby. Explain why, and suggest two remedies.\n\n**Step 1. Demand.** Water-hungry crops such as rice and sugarcane are grown, often in the dry season too.\n\n**Step 2. Pumping.** Thousands of powerful pumps draw water day and night; cheap electricity encourages over-use.\n\n**Step 3. Recharge.** Recharge from rain is far smaller than the water pumped out, so the water table drops year after year.\n\n**Remedies.** Switch some area to less thirsty crops; use **drip or sprinkler** irrigation; build **recharge pits** and check dams to harvest rain.',
      v: flow('LR', [['a', 'Thirsty crops in all seasons'], ['b', 'Heavy pumping'], ['c', 'Pumping exceeds recharge'], ['d', 'Water table falls'], ['e', 'Wells deepened']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow showing how heavy pumping for thirsty crops makes the water table fall'),
      n: 'Why must Punjab farmers keep deepening their tube wells? Rice and sugarcane need a great deal of water, and powerful pumps run for long hours. Rain refills the ground far more slowly than the pumps empty it, so the water table sinks every year. Growing less thirsty crops, using drip or sprinkler irrigation and building recharge pits can help the water table recover.',
    }),
    sl('check', 'Quick check: need for conservation', {
      b: 'Identify a reason for water scarcity.',
      n: 'Quick check. When pumping is faster than recharge, the water table falls.',
      chk: 'conserve-chk',
    }),
    sl('concept', 'Rainwater harvesting: meaning and methods', {
      b: '**Rainwater harvesting** is collecting and storing rainwater where it falls, either for **direct use** or to **recharge groundwater**. **Methods:** **rooftop harvesting** into tanks or recharge pits; **recharge pits, trenches and wells** that let runoff soak in; **check dams** and **percolation tanks** across small streams; **farm ponds**; reviving **traditional village tanks and ponds**. It is simple, cheap and can be done by every household, school, office and village.',
      v: table(['Method', 'Where used', 'How it helps'], [['Rooftop harvesting', 'Houses, schools, offices', 'Stores water; recharges wells'], ['Recharge pit or trench', 'Gardens, roadsides', 'Runoff soaks into the ground'], ['Check dam', 'Small streams', 'Slows flow; water seeps in'], ['Farm pond', 'Fields', 'Stores runoff for irrigation']], 'Table of rainwater harvesting methods with where they are used and how they help'),
      n: 'Rainwater harvesting means catching the rain where it falls and keeping it, either to use or to let it soak into the ground. Rain can be collected from roofs into tanks or recharge pits. Pits and trenches let runoff soak in. Small check dams slow streams so water seeps into the ground, and farm ponds store runoff for crops. Even old village tanks can be cleaned and used again.',
    }),
    sl('diagram', 'Rooftop rainwater harvesting', {
      b: 'Rain falling on a **roof** is led by **gutters** into a **down pipe**. A **first-flush** device throws away the dirty first rain; a **filter** of sand and gravel cleans the rest. The water goes to a **storage tank** for use, and the **overflow** goes into a **recharge pit** or an old well, from which it **percolates** down to the **aquifer**, raising the **water table**. Every millimetre of rain on one square metre of roof gives about one litre of water.',
      v: V.rooftop,
      n: 'Here is how rooftop harvesting works. Rain on the roof runs into gutters and a down pipe. The first rain, which washes dust off the roof, is thrown away. The rest passes through a filter of sand and gravel into a storage tank. When the tank is full, the overflow goes into a recharge pit, where it slowly soaks down and refills the groundwater. One millimetre of rain on one square metre gives about one litre.',
    }),
    sl('example', 'Worked example: how much rain can a roof catch?', {
      b: `**Problem.** A dairy cooperative near Anand has a shed roof of ${DAIRY.area} m². The area gets about ${DAIRY.rain} mm of rain a year, and about ${DAIRY.coeff * 100}% of the rain on the roof can be collected (runoff coefficient ${DAIRY.coeff}). How much water can it harvest in a year? (Illustrative figures.)\n\n**Step 1. Rule.** Litres harvested = roof area (m²) × rainfall (mm) × runoff coefficient.\n\n**Step 2.** $${DAIRY.area} \\times ${DAIRY.rain} \\times ${DAIRY.coeff} = ${dairyL}$ litres.\n\n**Step 3. Interpret.** That is ${dairyL / 1000} cubic metres a year — enough to wash the sheds for many months or, through a recharge pit, to raise the local water table.`,
      v: table(['Quantity', 'Value'], [['Roof area', `${DAIRY.area} m²`], ['Annual rainfall', `${DAIRY.rain} mm`], ['Runoff coefficient', String(DAIRY.coeff)], ['Harvest', `${dairyL} litres`]], 'Table of the illustrative figures and the harvest for a shed roof'),
      n: 'Let us estimate the harvest from a dairy shed roof. Multiply the roof area, three hundred square metres, by the yearly rainfall, eight hundred millimetres, and then by the share of rain that can be collected, about four fifths. The answer is one hundred and ninety two thousand litres in a year. Stored or sent into a recharge pit, that water makes a real difference.',
    }),
    sl('check', 'Quick check: rooftop harvesting', {
      b: 'Explain a part of a rooftop harvesting system.',
      n: 'Quick check. The recharge pit lets overflow water soak down to the groundwater.',
      chk: 'rwh-chk',
    }),
    sl('concept', 'Why rainwater harvesting matters', {
      b: '**Importance:** it **raises the water table** and revives dried wells and handpumps; provides water in the **dry season**; reduces dependence on distant rivers and tankers; reduces **flooding of streets** and drains in cities, since less water runs off; reduces **soil erosion**; **dilutes** fluoride and salts in groundwater, improving its quality; is **low-cost** and needs little energy; and involves **people** in managing their own water. Several states and cities have made rooftop harvesting a condition for new buildings.',
      v: flow('LR', [['a', 'Rain captured where it falls'], ['b', 'Less runoff'], ['c', 'More water soaks in'], ['d', 'Water table rises; wells revive'], ['e', 'Fewer flooded streets']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['b', 'e']], 'Flow showing how harvesting rain reduces runoff, recharges groundwater and reduces urban flooding'),
      n: 'Rainwater harvesting helps in many ways. It refills groundwater, so dried wells and handpumps start working again. It gives water in the dry season and cuts the need for tankers. In cities, less water rushes into the streets, so there is less flooding. It also improves the quality of groundwater, costs little, and lets ordinary people take charge of their own water.',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Surface water: rivers, lakes, ponds, tanks, reservoirs. Groundwater: water below the water table in aquifers, reached by wells and tube wells.',
        'Northern plains: perennial rivers and plentiful groundwater; peninsula: seasonal rivers, hard rock, tanks.',
        'Conservation is needed because rain is seasonal and uneven, demand is rising, groundwater is over-drawn and water is polluted.',
        'Rainwater harvesting: rooftop systems, recharge pits, check dams, farm ponds; harvest = area × rainfall × runoff coefficient.',
      ],
      v: table(['Idea', 'Key point'], [['Groundwater', 'Recharged by rain soaking in'], ['Scarcity', 'Uneven rain, rising demand'], ['Harvesting', 'Store or recharge'], ['Formula', 'Area × rain × coefficient']], 'Summary table of Part 1'),
      n: 'Let us sum up Part 1. Surface water flows in rivers and stands in lakes and tanks; groundwater lies below the water table and is reached by wells. The northern plains are rich in both, the peninsula much less. We must conserve water because rain is seasonal and uneven, demand is rising and groundwater is over used. Rainwater harvesting stores rain and refills the ground.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Give named examples for surface water and groundwater sources.',
        'For "need for conservation", give at least three separate reasons.',
        'Describe rooftop harvesting in order: roof, gutter, filter, tank, recharge pit.',
        'In harvest sums, write the rule, substitute, then state the units (litres).',
      ],
      v: table(['Slip', 'Fix'], [['Groundwater is in rivers', 'It is below the water table'], ['Harvesting only stores water', 'It also recharges groundwater'], ['Forgetting the runoff coefficient', 'Multiply by it']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some tips. Name real examples of surface water and groundwater. When asked why conservation is needed, give at least three different reasons. Describe rooftop harvesting in the order the water flows, from roof to recharge pit. And in calculations, write the rule first, put in the numbers, and give your answer in litres.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Water Resources — Part 2: Irrigation',
  goals: [
    'Explain why irrigation is needed in India',
    'Explain why tank irrigation is common in peninsular India and tube wells in the northern plains',
    'Compare perennial and inundation canals and state disadvantages of canal irrigation',
    'Explain how drip and sprinkler irrigation save water',
  ],
  slides: [
    sl('title', 'Water for the fields', {
      b: 'Part 2 — **irrigation** is the artificial supply of water to crops. It turned the dry fields of Punjab into India’s granary and lets farmers in Tamil Nadu grow a second crop. India uses several methods, each suited to its region.',
      v: table(['Method', 'Typical region'], [['Wells and tube wells', 'Northern plains, Gujarat'], ['Tanks', 'Tamil Nadu, Karnataka, Telangana'], ['Canals', 'Punjab, Haryana, Uttar Pradesh, river deltas'], ['Drip and sprinkler', 'Maharashtra, Rajasthan, Karnataka']], 'Table of irrigation methods and typical regions'),
      n: 'Irrigation means giving water to crops by artificial means instead of waiting for rain. It made Punjab the granary of India and lets farmers in many states grow two or three crops a year. India waters its fields with wells and tube wells, tanks, canals, and newer methods such as drip and sprinkler irrigation. Each suits a particular kind of land and water supply.',
    }),
    sl('concept', 'Why irrigation is needed in India', {
      b: '**Seasonal rain:** most rain falls in three to four months; rabi crops grow in the dry winter. **Uncertain monsoon:** onset may be late, with long breaks or failure. **Uneven rain:** large areas such as Rajasthan, Gujarat and the rain-shadow Deccan get too little. **Thirsty crops:** rice, sugarcane and jute need much more water than rain gives in many areas. **Multiple cropping and high-yielding seeds** need an assured water supply. **Porous soils** such as sandy and red soils do not hold water.',
      v: table(['Reason', 'Example'], [['Seasonal rain', 'Wheat grown in dry winter'], ['Uncertain monsoon', 'Breaks in July harm young rice'], ['Low rainfall', 'Western Rajasthan'], ['Thirsty crops', 'Sugarcane in Maharashtra'], ['High-yielding seeds', 'Need regular water']], 'Table of reasons for irrigation with an example of each'),
      n: 'Why do Indian farmers need irrigation? Most rain falls in a few monsoon months, but crops such as wheat grow in the dry winter. The monsoon is uncertain: it may come late or stop for weeks. Some regions get very little rain. Crops like rice and sugarcane need a lot of water, and high yielding seeds need water on time. Sandy and red soils also lose water quickly.',
    }),
    sl('concept', 'Wells and tube wells', {
      b: '**Wells** are pits dug down to the water table; water is lifted by hand, by the **Persian wheel** or by pumps. They are cheap, simple and owned by individual farmers, but irrigate small areas and may dry up. **Tube wells** are deep, narrow holes **bored** into the aquifer, with a pipe and an **electric or diesel pump**; they can lift large amounts of water from great depths. Wells and tube wells together are the **leading source of irrigation in India (as of the early 2020s)**, especially in **Punjab, Haryana, Uttar Pradesh, Bihar, Gujarat** and parts of Rajasthan.',
      v: flow('LR', [['a', 'Rain and rivers recharge the aquifer'], ['b', 'Tube well bored into aquifer'], ['c', 'Electric pump lifts water'], ['d', 'Water when the farmer needs it']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow from aquifer recharge to tube well and pump to water on demand'),
      n: 'A well is a pit dug down to the water table, from which water is lifted by hand, by an animal turning a Persian wheel, or by a pump. Wells are cheap and belong to the farmer, but they water only a small area. A tube well is a deep, narrow bore with a powerful electric or diesel pump. Wells and tube wells are now the biggest source of irrigation in India.',
    }),
    sl('example', 'Worked example: why tube wells suit the northern plains', {
      b: '**Problem.** Give geographical reasons why tube wells are the main source of irrigation in western Uttar Pradesh and Haryana.\n\n**Step 1. Soil.** Deep, soft **alluvium** is easy and cheap to bore through.\n\n**Step 2. Water.** The porous alluvium stores plenty of **groundwater**, recharged by monsoon rain and by **perennial Himalayan rivers** and canals; the water table was high.\n\n**Step 3. Power and land.** Rural **electricity** is widely available; the land is **flat**, so water spreads easily.\n\n**Step 4. Demand.** Fertile soil, dense farming and high-yielding wheat and rice create a large, year-round demand for water.',
      v: flow('LR', [['a', 'Soft deep alluvium'], ['b', 'Plentiful, recharged groundwater'], ['c', 'Electricity, flat land'], ['d', 'High demand for water'], ['e', 'Tube wells widespread']], [['a', 'e'], ['b', 'e'], ['c', 'e'], ['d', 'e']], 'Flow of four reasons leading to widespread tube wells in the northern plains'),
      n: 'Why are tube wells so common in Haryana and western Uttar Pradesh? The soft, deep alluvium is easy to drill. It holds a lot of groundwater, refilled by monsoon rain and by snow fed rivers and canals. Electricity reaches most villages, and the flat land lets water spread easily. And the fertile soil and intensive farming of wheat and rice create a huge demand for water.',
    }),
    sl('check', 'Quick check: wells and tube wells', {
      b: 'Explain where tube wells suit best.',
      n: 'Quick check. Soft alluvium with plentiful groundwater suits tube wells.',
      chk: 'tubewell-chk',
    }),
    sl('concept', 'Tank irrigation', {
      b: 'A **tank** is a natural or man-made depression, often made by building an **earthen embankment** across a small stream, that stores **rainwater** for irrigation. **Where:** **Tamil Nadu, Karnataka, Telangana and Andhra Pradesh** (and parts of Odisha, Madhya Pradesh). **Why in the peninsula:** hard, **impervious rock** lets little water percolate, so groundwater is scarce and wells are hard to dig; rivers are **rain-fed and seasonal**, unfit for perennial canals; **undulating land** has natural hollows, making tanks easy to build; rain is concentrated in a short season and must be stored; small, scattered fields. **Drawbacks:** tanks **dry up** in long dry spells; they **silt up**; much water is lost by **evaporation**; they occupy fertile land and irrigate small areas.',
      v: table(['Reason for tanks', 'Explanation'], [['Hard rock', 'Little groundwater; wells difficult'], ['Seasonal rivers', 'No water for canals in the dry season'], ['Undulating land', 'Natural hollows easily dammed'], ['Short rainy season', 'Rain must be stored']], 'Table of reasons why tank irrigation is common in peninsular India'),
      n: 'A tank is a hollow, natural or made by building an earth bank across a small stream, that stores rainwater. Tanks are common in Tamil Nadu, Karnataka, Telangana and Andhra Pradesh. There, the hard rock holds little groundwater, the rivers dry up after the rains, and the rolling land has many natural hollows to store water. But tanks can dry up, fill with silt and lose water to evaporation.',
    }),
    sl('example', 'Worked example: reading irrigation data', {
      b: `**Problem.** Two illustrative districts irrigate their fields as shown (share of net irrigated area). Which is more likely to be on the Deccan plateau of Tamil Nadu, and which on the Ganga plain? Give reasons.\n\n| Source | ${A.label} | ${B.label} |\n|---|---|---|\n| Wells and tube wells | ${A.wells}% | ${B.wells}% |\n| Canals | ${A.canals}% | ${B.canals}% |\n| Tanks | ${A.tanks}% | ${B.tanks}% |\n| Other | ${A.other}% | ${B.other}% |\n\n**${A.label}:** wells and tube wells dominate (${A.wells}%), tanks almost absent → **Ganga plain**: soft alluvium, rich groundwater.\n\n**${B.label}:** tanks are the largest source (${B.tanks}%) → **Tamil Nadu plateau**: hard rock, seasonal rivers, natural hollows.\n\n**Check.** Each column adds to $${A.wells} + ${A.canals} + ${A.tanks} + ${A.other} = 100$.`,
      v: table(['Source', A.label, B.label], [['Wells, tube wells', `${A.wells}%`, `${B.wells}%`], ['Canals', `${A.canals}%`, `${B.canals}%`], ['Tanks', `${A.tanks}%`, `${B.tanks}%`], ['Other', `${A.other}%`, `${B.other}%`]], 'Table of illustrative irrigation shares in two districts'),
      n: 'Compare the two imagined districts. In District A, wells and tube wells water nearly three quarters of the land and tanks hardly matter. That fits the Ganga plain, with its soft soil and rich groundwater. In District B, tanks are the biggest source. That fits the Tamil Nadu plateau, where hard rock holds little groundwater and rain must be stored in tanks.',
    }),
    sl('check', 'Quick check: tank irrigation', {
      b: 'Explain why tanks suit the peninsula.',
      n: 'Quick check. Hard rock and seasonal rivers make tanks the best way to store rain.',
      chk: 'tank-chk',
    }),
    sl('diagram', 'Canal irrigation: inundation and perennial canals', {
      b: '**Inundation canals** are taken straight from a river **without a barrage**; water enters only when the river is **in flood** during the rainy season, so they are unreliable. **Perennial canals** are taken from a river through a **barrage, weir or dam**, which holds the water up so the canal flows **all year**. Perennial canals are found mainly in **Punjab, Haryana, Uttar Pradesh** and the **deltas** of the Godavari, Krishna and Kaveri, where land is flat, soil is deep and rivers carry water all year. Examples: the **Indira Gandhi Canal** (Rajasthan), the **Upper Ganga Canal**, the **Western Yamuna Canal**, the **Sirhind Canal**.',
      v: V.canals,
      n: 'An inundation canal is cut from a river without any barrage, so water flows into it only when the river is in flood, during the rains. A perennial canal starts at a barrage, weir or dam that holds the river water high, so the canal flows all year. Perennial canals irrigate the flat plains of Punjab, Haryana and Uttar Pradesh and the deltas of the south, such as the Kaveri delta.',
    }),
    sl('concept', 'Disadvantages of canal irrigation', {
      b: '**Waterlogging:** over-irrigation and seepage from unlined canals raise the water table to the surface. **Salinity and alkalinity:** as waterlogged land dries, salts rise and form a white crust (called **reh** or **kallar**), making land barren. **Disease:** stagnant water breeds **mosquitoes** (malaria). **Wastage:** much water is lost by **seepage and evaporation**. **Cost:** canals are expensive to build and maintain, and suit only **flat** land. **Unfairness:** farms at the **tail end** may get little water.',
      v: flow('LR', [['a', 'Over-irrigation and canal seepage'], ['b', 'Water table rises'], ['c', 'Waterlogging'], ['d', 'Salts rise as land dries'], ['e', 'Saline, barren land (reh, kallar)']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow showing how over-irrigation by canals leads to waterlogging and saline land'),
      n: 'Canals have problems too. When fields are over watered and unlined canals leak, the water table rises until the land is waterlogged. As it dries, salts come up and form a white crust that makes the soil barren. Standing water breeds mosquitoes. Much water is lost on the way through seepage and evaporation, and farms at the far end of a canal may get very little.',
    }),
    sl('check', 'Quick check: canals', {
      b: 'Compare perennial and inundation canals or name a canal problem.',
      n: 'Quick check. Perennial canals flow all year because of a barrage; inundation canals flow only in floods.',
      chk: 'canal-chk',
    }),
    sl('diagram', 'Modern methods: drip and sprinkler irrigation', {
      b: '**Drip irrigation:** water flows through a network of pipes and comes out **drop by drop** from emitters at the **root zone** of each plant. Very little is lost to **evaporation, runoff or weeds**; fertiliser can be mixed in the water. Suits **orchards, sugarcane, vegetables, grapes and cotton** in dry areas such as **Maharashtra, Karnataka and Rajasthan**. **Sprinkler irrigation:** water is pumped through pipes and **sprayed like rain** by rotating nozzles. Suits **uneven land and sandy soils** where flooding would waste water, and crops such as wheat, pulses, vegetables and tea.',
      v: V.modern,
      n: 'Drip irrigation carries water in pipes and lets it out drop by drop right at the roots of each plant. Almost nothing is lost to evaporation or runoff, and weeds between rows get no water. It suits fruit, sugarcane and vegetables in dry areas. Sprinkler irrigation sprays water over the crop like rain. It suits uneven land and sandy soil, where flooding the field would waste most of the water.',
    }),
    sl('example', 'Worked example: how much water does drip save?', {
      b: `**Problem.** A crop needs ${NEED} m³ of water per hectare at its roots (illustrative). Flooding delivers only ${Math.round(EFF[0].eff * 100)}% of applied water to the roots, drip ${Math.round(EFF[2].eff * 100)}%. How much water must be applied by each method, and what is saved?\n\n**Step 1. Flooding.** Applied $= \\frac{${NEED}}{${EFF[0].eff}} = ${fl}$ m³.\n\n**Step 2. Drip.** Applied $= \\frac{${NEED}}{${EFF[2].eff}} = ${dr}$ m³.\n\n**Step 3. Saving.** $${fl} - ${dr} = ${fl - dr}$ m³ per hectare — water that could irrigate more land or stay in the aquifer.`,
      v: V.eff,
      n: 'Suppose a crop needs four thousand five hundred cubic metres of water at its roots on each hectare. Flooding wastes half the water applied, so the farmer must apply nine thousand. Drip delivers nine tenths of the water to the roots, so only five thousand is needed. The saving is four thousand cubic metres on every hectare, enough to water much more land.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Irrigation is needed because rain is seasonal, uncertain and uneven, and thirsty crops and high-yielding seeds need assured water.',
        'Wells and tube wells: leading source; tube wells suit the soft, groundwater-rich northern plains.',
        'Tanks: peninsula (Tamil Nadu, Karnataka, Telangana) — hard rock, seasonal rivers, natural hollows.',
        'Canals: perennial (barrage, all year) versus inundation (floods only); problems of waterlogging, salinity, seepage.',
        'Drip and sprinkler save water by delivering it where and as it is needed.',
      ],
      v: table(['Method', 'Best suited to'], [['Tube wells', 'Alluvial plains'], ['Tanks', 'Hard-rock plateau'], ['Perennial canals', 'Flat plains, deltas'], ['Drip, sprinkler', 'Dry areas, uneven land']], 'Summary table of irrigation methods and the areas they suit'),
      n: 'Let us sum up Part 2. Irrigation is needed because our rain is seasonal, uncertain and uneven. Wells and tube wells are the biggest source, especially on the northern plains. Tanks suit the hard rock plateau of the south. Perennial canals flow all year from barrages, while inundation canals flow only in floods; canals can cause waterlogging and salty soil. Drip and sprinkler methods save water.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        '"Why tanks in the south, tube wells in the north": compare rock, groundwater, rivers and relief.',
        'Perennial versus inundation: barrage or no barrage; all year or only in floods.',
        'Name at least two disadvantages of canals with the process (waterlogging, then salinity).',
        'Drip: water at the roots; sprinkler: spray like rain; both reduce waste.',
      ],
      v: table(['Slip', 'Fix'], [['Inundation canals flow all year', 'Only during floods'], ['Tanks common in Punjab', 'Common in the southern plateau'], ['Drip floods the field', 'It wets only the root zone']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. To explain tanks in the south and tube wells in the north, compare the rock, the groundwater, the rivers and the shape of the land. For canals, remember: a barrage means water all year, no barrage means water only in floods. Explain canal problems step by step. And say clearly how drip and sprinkler methods cut waste.',
    }),
  ],
});
