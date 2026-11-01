// ICSE 10 Geography ch11 Energy Resources — two decks: Part 1 (t01–t03) coal, petroleum and natural gas, hydel power
// (Bhakra Nangal and Hirakud); Part 2 (t04–t05) solar, wind and tidal energy, geothermal, nuclear and biogas, and reading an
// energy mix (illustrative State Z data computed from svgs.mjs).
import { sl, deck, table, flow, svgV } from './lib.mjs';
import { THERMAL, HYDEL, BIOGAS, MIXCHART, mw, mixTotal, pct, renewMW } from './svgs.mjs';

const V = {
  thermal: svgV(THERMAL, 'Flow of a thermal power station from coal and boiler to turbine, generator and grid, with smoke, fly ash and a condenser loop'),
  hydel: svgV(HYDEL, 'Cross-section of a dam, reservoir, penstock, power house and river downstream, with the head marked'),
  biogas: svgV(BIOGAS, 'Biogas plant with inlet tank, underground digester, gas pipe to a stove and outlet tank for slurry manure'),
  mix: svgV(MIXCHART, 'Bar chart of the illustrative installed capacity of State Z by source'),
};

export const deck1 = deck({
  part: 1,
  title: 'Energy Resources — Part 1: Coal, oil, natural gas and hydel power',
  goals: [
    'Name the types of coal and the main coalfields of India, and weigh the advantages and disadvantages of coal',
    'Name the main onshore and offshore oil fields and explain why natural gas is a cleaner fuel than coal',
    'State the river, state and benefits of the Bhakra Nangal and Hirakud projects and the advantages of hydel power',
  ],
  slides: [
    sl('title', 'Power for a growing country', {
      b: 'Part 1 — Homes, farms, railways and factories all run on energy. India gets most of its commercial energy from **conventional sources** (coal, petroleum, natural gas, hydel), and is adding **non-conventional sources** (sun, wind, tides, the Earth’s heat, atoms and biogas) — Part 2.',
      v: table(['Conventional sources', 'Non-conventional sources'], [['Coal', 'Solar'], ['Petroleum', 'Wind'], ['Natural gas', 'Tidal'], ['Hydel (large dams)', 'Geothermal, nuclear, biogas']], 'Table listing conventional and non-conventional sources of energy studied in this chapter'),
      n: 'Namaste! Every switch you press, every train and every factory needs energy. Most of India’s power still comes from the conventional sources: coal, petroleum, natural gas and water stored behind big dams. In this part we study these four. In the next part we turn to the sun, the wind, the tides, the Earth’s inner heat, nuclear fuel and biogas.',
    }),
    sl('concept', 'Types of coal', {
      b: 'Coal formed from plants buried in swamps millions of years ago and slowly compressed. The longer and deeper the burial, the higher the **carbon content** and heat value. **Anthracite** — hardest, highest carbon, little smoke; small deposits in Jammu and Kashmir. **Bituminous** — the most widely used; its **coking** variety is used in iron and steel. **Lignite** — brown coal, high moisture, low carbon (Tamil Nadu, Gujarat, Rajasthan). **Peat** — the first stage, low carbon, smoky.',
      v: table(['Type', 'Carbon content', 'Main use or note', 'Indian example'], [['Anthracite', 'Highest (about 80–95%)', 'Best quality, little smoke', 'Jammu and Kashmir (small)'], ['Bituminous', 'High (about 60–80%)', 'Power; coking coal for steel', 'Jharia, Raniganj, Korba'], ['Lignite', 'Low (about 40–55%)', 'Pit-head power stations', 'Tamil Nadu, Gujarat, Rajasthan'], ['Peat', 'Lowest (under 40%)', 'Smoky domestic fuel', 'Marshy areas']], 'Table of the four types of coal with carbon content, use and examples'),
      n: 'Coal is made from ancient plants that were buried and squeezed over millions of years. The deeper and longer the burial, the more carbon the coal holds and the more heat it gives. Anthracite is the hardest and best but rare in India. Bituminous coal is the common workhorse, and its coking type is vital for steel. Lignite is a soft brown coal, and peat is the earliest, smokiest stage.',
    }),
    sl('concept', 'Where India’s coal is found', {
      b: '**Gondwana coal** (over 200 million years old) gives most of India’s coal, from river valleys of the peninsula: **Damodar valley** (Jharia, Bokaro, Giridih in Jharkhand; Raniganj in West Bengal), **Mahanadi valley** (Talcher in Odisha; Korba in Chhattisgarh), **Son valley** (Singrauli), **Godavari valley** (Singareni in Telangana). **Tertiary coal** (younger, more sulphur) occurs in Assam (Makum), Meghalaya and Arunachal Pradesh. **Lignite**: Neyveli (Tamil Nadu), Panandhro (Gujarat), Palana (Rajasthan).',
      v: table(['Group', 'River valley or region', 'Coalfields'], [['Gondwana', 'Damodar', 'Jharia, Bokaro, Raniganj, Giridih'], ['Gondwana', 'Mahanadi', 'Talcher, Korba'], ['Gondwana', 'Son and Godavari', 'Singrauli; Singareni'], ['Tertiary', 'North-east', 'Makum (Assam), Meghalaya'], ['Lignite', 'Coastal and western India', 'Neyveli, Panandhro, Palana']], 'Table of coal groups, the valleys or regions where they occur, and named coalfields'),
      n: 'Most of India’s coal is old Gondwana coal lying in the river valleys of the peninsula. The Damodar valley holds Jharia, Bokaro and Raniganj. The Mahanadi valley has Talcher and Korba, and the Godavari valley has Singareni. Younger Tertiary coal, with more sulphur, is mined in Assam and Meghalaya, while soft lignite comes from Tamil Nadu, Gujarat and Rajasthan.',
    }),
    sl('check', 'Quick check: coal', {
      b: 'Recognise a type of coal and its use.',
      n: 'Quick check. Bituminous coal is the most used type, and coking coal from it is needed to make steel.',
      chk: 'coal-chk',
    }),
    sl('diagram', 'Coal at work: a thermal power station', {
      b: 'Most of India’s electricity comes from **coal-fired thermal power stations**. Coal is burnt to boil water; the steam spins a turbine joined to a generator. **Advantages of coal:** large reserves in Jharkhand, Odisha and Chhattisgarh; steady power day and night in any weather; coking coal for steel. **Disadvantages:** non-renewable; smoke with carbon dioxide and sulphur dioxide; Indian coal has a high **ash** content, so ash ponds and fly ash are a problem; mining scars the land.',
      v: V.thermal,
      n: 'In a thermal power station, coal is burnt in a boiler to turn water into steam. The steam spins a turbine, the turbine turns a generator, and electricity flows into the grid. Coal is plentiful in India and gives steady power in any weather. But it will run out one day, its smoke adds carbon dioxide and sulphur dioxide to the air, and Indian coal leaves a great deal of ash behind.',
    }),
    sl('example', 'Worked example: why does coal still lead?', {
      b: '**Problem.** Give three geographical reasons why coal remains India’s main source of electricity, and one reason why the country is trying to reduce its use.\n\n**Step 1.** Large reserves lie within the country, in the Damodar, Mahanadi, Son and Godavari valleys, so supply is secure.\n\n**Step 2.** Thermal stations can be built near coalfields or linked by rail, and they run round the clock in any season.\n\n**Step 3.** Coal is cheaper than imported oil, saving foreign exchange.\n\n**Against.** Burning coal releases greenhouse gases and fly ash; it is non-renewable.',
      v: flow('LR', [['a', 'Large home reserves'], ['b', 'Power stations near coalfields or on rail links'], ['c', 'Steady, cheaper power'], ['d', 'But: smoke, ash, non-renewable']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow showing why coal leads Indian electricity and its main drawback'),
      n: 'Why does coal still lead? First, India has large reserves of its own in the river valleys of the peninsula, so the supply is secure. Second, power stations near coalfields or on railway lines can run day and night in every season. Third, coal costs less than imported oil. Against this, coal smoke warms the climate, ash piles up, and the reserves will not last for ever.',
    }),
    sl('concept', 'Petroleum: onshore and offshore fields', {
      b: 'Petroleum (mineral oil) is found in **sedimentary rocks**, trapped in folds and faults. **Onshore fields:** Assam — **Digboi** (among the oldest in Asia), Naharkatiya, Moran; Gujarat (Cambay or Khambhat basin) — **Ankleshwar**, Kalol, Lunej, Mehsana; Rajasthan — Mangala (Barmer). **Offshore fields:** **Mumbai High** on the continental shelf of the Arabian Sea, Bassein (gas), and the **Krishna–Godavari basin** off Andhra Pradesh. India produces only a small part of the crude oil it uses and imports the rest (as of the early 2020s).',
      v: table(['Region', 'Onshore or offshore', 'Fields'], [['Assam', 'Onshore', 'Digboi, Naharkatiya, Moran'], ['Gujarat', 'Onshore', 'Ankleshwar, Kalol, Lunej, Mehsana'], ['Rajasthan', 'Onshore', 'Mangala (Barmer)'], ['Arabian Sea', 'Offshore', 'Mumbai High, Bassein'], ['Bay of Bengal', 'Offshore', 'Krishna–Godavari basin']], 'Table of the main oil and gas regions of India, whether onshore or offshore, and their fields'),
      n: 'Petroleum is found in sedimentary rocks, where oil collects in folds and cracks. On land, the old fields of Assam such as Digboi, the Gujarat fields such as Ankleshwar and Kalol, and the newer Barmer fields of Rajasthan are important. Out at sea, Mumbai High lies on the continental shelf of the Arabian Sea, and more oil and gas come from the Krishna Godavari basin.',
    }),
    sl('check', 'Quick check: oil fields', {
      b: 'Tell an onshore field from an offshore one.',
      n: 'Quick check. Mumbai High is under the sea; Digboi and Ankleshwar are on land.',
      chk: 'oil-chk',
    }),
    sl('concept', 'Natural gas: the cleaner fuel', {
      b: 'Natural gas occurs with petroleum or alone (Mumbai High, Bassein, Krishna–Godavari basin, Tripura). It is carried by **pipelines** such as the Hazira–Vijaipur–Jagdishpur (HVJ) line to fertiliser and power plants in the north. **Why cleaner:** it is mostly methane and burns almost completely, giving **less carbon dioxide per unit of heat, almost no ash or soot, and very little sulphur dioxide**. **Uses:** power stations, fertiliser (urea) plants, petrochemicals, cooking gas through pipes, and **CNG** for buses and autos.',
      v: table(['Feature', 'Coal', 'Natural gas'], [['Ash after burning', 'A lot', 'Almost none'], ['Sulphur dioxide', 'Often high', 'Very low'], ['Carbon dioxide per unit of heat', 'Higher', 'Lower'], ['Transport', 'Rail wagons', 'Pipelines']], 'Table comparing coal and natural gas as fuels'),
      n: 'Natural gas is found with oil or on its own, both on land and under the sea. Long pipelines carry it from the west coast to fertiliser and power plants in the north. It is called a cleaner fuel because it burns almost completely, leaving no ash, very little sulphur dioxide and less carbon dioxide than coal for the same heat. Cities also use it as compressed gas for buses.',
    }),
    sl('example', 'Worked example: gas for a fertiliser plant', {
      b: '**Problem.** A fertiliser plant at Jagdishpur in Uttar Pradesh, far from any gas field, uses natural gas. Explain (a) how the gas reaches it, (b) why gas is used rather than coal, and (c) one limitation.\n\n**(a)** Through the HVJ pipeline from the west coast, which links gas from the Mumbai High–Bassein area to the north.\n\n**(b)** Gas is both a **raw material** for urea and a clean fuel; it leaves no ash and moves cheaply by pipe.\n\n**(c)** Reserves are limited and non-renewable, and pipelines are costly to build.',
      v: flow('LR', [['a', 'Offshore gas, west coast'], ['b', 'HVJ pipeline'], ['c', 'Fertiliser and power plants in the north'], ['d', 'Urea for farms']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of natural gas from the west coast by pipeline to plants in the north'),
      n: 'How does a fertiliser plant in Uttar Pradesh get gas from under the Arabian Sea? A long pipeline carries the gas north from the west coast. The plant prefers gas to coal because gas is the raw material for urea as well as a clean fuel, it leaves no ash, and it travels cheaply by pipe. Its limit is that gas reserves, like oil, will one day run out.',
    }),
    sl('diagram', 'Hydel power: water falling from a height', {
      b: 'A dam stores river water in a reservoir; water falls through a **penstock** to turn turbines in a power house. **Advantages over thermal power:** renewable (rain refills the reservoir); no smoke or ash; low running cost once built; dams are **multipurpose** — irrigation, flood control, drinking water, fishing. **Disadvantages:** high building cost; people and forests displaced; output falls in a drought; reservoirs fill with silt. Sites need a **perennial river**, a large **head** and a narrow valley — the Himalayas and the north-east have the most potential.',
      v: V.hydel,
      n: 'In a hydel station, a dam stores river water, and the water rushes down a large pipe to spin turbines in a power house below. Water is renewed by rain, so hydel power is renewable, and it makes no smoke or ash. Once the dam is built, the power is cheap, and the same dam gives irrigation and flood control. But dams are costly, uproot villages and drown forests, and they suffer in drought years.',
    }),
    sl('check', 'Quick check: hydel projects', {
      b: 'Link a dam with its river.',
      n: 'Quick check. Bhakra is on the Sutlej; Hirakud is on the Mahanadi.',
      chk: 'hydel-chk',
    }),
    sl('concept', 'Bhakra Nangal and Hirakud projects', {
      b: '**Bhakra Nangal** — on the **Sutlej**; Bhakra dam in **Himachal Pradesh** (Bilaspur district) with the **Gobind Sagar** reservoir, Nangal dam downstream in **Punjab**. Benefits: canal irrigation for **Punjab, Haryana and Rajasthan** (a base for the Green Revolution); hydroelectricity for these states, Himachal Pradesh and Delhi; flood control on the Sutlej. **Hirakud** — on the **Mahanadi** near **Sambalpur, Odisha**; one of the longest earthen dams in the world. Benefits: **flood control** in the Mahanadi delta, irrigation, power for industries of Odisha.',
      v: table(['Project', 'River', 'State', 'Main benefits'], [['Bhakra Nangal', 'Sutlej', 'Himachal Pradesh and Punjab', 'Irrigation (Punjab, Haryana, Rajasthan), power, flood control'], ['Hirakud', 'Mahanadi', 'Odisha', 'Flood control in the delta, irrigation, power']], 'Table of the Bhakra Nangal and Hirakud projects with river, state and benefits'),
      n: 'Two projects stand out. Bhakra Nangal is on the Sutlej. The tall Bhakra dam in Himachal Pradesh holds back the Gobind Sagar, and the smaller Nangal dam lies downstream in Punjab. Its canals water Punjab, Haryana and Rajasthan. Hirakud, near Sambalpur in Odisha, is a very long earthen dam on the Mahanadi. Its main aim was to tame the floods of the Mahanadi delta, and it also gives irrigation and power.',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Coal: anthracite, bituminous, lignite, peat; Gondwana fields in the Damodar, Mahanadi, Son and Godavari valleys; Tertiary coal in the north-east.',
        'Petroleum: onshore Assam (Digboi), Gujarat (Ankleshwar), Rajasthan (Barmer); offshore Mumbai High and the Krishna–Godavari basin.',
        'Natural gas: cleaner — little ash, little sulphur, less carbon dioxide; HVJ pipeline; fertiliser, power, CNG.',
        'Hydel: renewable, clean, multipurpose; Bhakra Nangal (Sutlej) and Hirakud (Mahanadi).',
      ],
      v: table(['Source', 'Renewable?', 'Main drawback'], [['Coal', 'No', 'Smoke and ash'], ['Petroleum', 'No', 'Mostly imported'], ['Natural gas', 'No', 'Limited reserves'], ['Hydel', 'Yes', 'Displacement, drought']], 'Summary table of the four conventional sources, whether renewable, and their drawbacks'),
      n: 'Let us sum up Part 1. Coal comes in four types and is mined mostly in the river valleys of the peninsula. Oil comes from Assam, Gujarat, Rajasthan and offshore fields such as Mumbai High. Natural gas is the cleanest of the fossil fuels. Hydel power is renewable and clean, and the Bhakra Nangal and Hirakud projects show how one dam can serve many purposes.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Always name the river and the state for Bhakra Nangal and Hirakud.',
        'For coalfields, give the river valley and the state together.',
        'Say why natural gas is cleaner in two parts: less ash or soot, less carbon dioxide and sulphur dioxide.',
        'For advantages of hydel power, compare directly with thermal power.',
      ],
      v: table(['Slip', 'Fix'], [['Hirakud is on the Sutlej', 'Hirakud is on the Mahanadi'], ['Mumbai High is in the Bay of Bengal', 'It is in the Arabian Sea'], ['Lignite has the most carbon', 'Anthracite has the most carbon']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some tips. When you write about a dam, always give its river and its state. For coalfields, name the river valley and the state together. When asked why natural gas is cleaner, mention both the lack of ash and the smaller amounts of carbon dioxide and sulphur dioxide. And when listing the merits of hydel power, compare them point by point with thermal power.',
    }),
  ],
});

const coalP = pct(mw('Coal (thermal)'));
const renP = pct(renewMW());
export const deck2 = deck({
  part: 2,
  title: 'Energy Resources — Part 2: Non-conventional sources',
  goals: [
    'Name important areas for solar, wind and tidal energy in India and state their advantages and disadvantages',
    'Name important areas for geothermal and nuclear energy in India',
    'Explain how biogas is produced and why it benefits rural households',
    'Interpret a table of installed capacity by source',
  ],
  slides: [
    sl('title', 'Energy that need not run out', {
      b: 'Part 2 — **Non-conventional sources** are newer ways of producing power. Most are **renewable** and cause little pollution, so India is expanding them fast. Each needs the right geography: sunshine, steady wind, a high tidal range, hot rocks, nuclear minerals or cattle dung.',
      v: table(['Source', 'Needs', 'Example area'], [['Solar', 'Clear skies, open land', 'Western Rajasthan, Gujarat'], ['Wind', 'Strong, steady winds', 'Tamil Nadu, Gujarat coast'], ['Tidal', 'High tidal range, narrow gulf', 'Gulfs of Khambhat and Kutch'], ['Geothermal', 'Hot rocks near the surface', 'Puga valley, Manikaran'], ['Nuclear', 'Uranium, cooling water', 'Tarapur, Kalpakkam'], ['Biogas', 'Cattle dung, farm waste', 'Villages across India']], 'Table of six non-conventional sources, what each needs and an example area'),
      n: 'Coal, oil and gas will not last for ever, and they pollute the air. So India is turning to newer sources: the sun, the wind, the tides, the Earth’s inner heat, nuclear fuel and biogas. Most of these are renewable and clean. But each one needs the right geography, and in this part we find out where each works best and why.',
    }),
    sl('concept', 'Solar energy', {
      b: '**Photovoltaic (PV) cells** turn sunlight directly into electricity; **solar thermal** devices (cookers, water heaters) use the sun’s heat. India gets strong sunshine on most days of the year. Large **solar parks** stand on dry, open land — **Bhadla** (Jodhpur, Rajasthan), **Charanka** (Patan, Gujarat), **Pavagada** (Karnataka). Rooftop panels and solar pumps serve homes and farms. **Advantages:** renewable, no fuel cost, no smoke, suits remote places. **Disadvantages:** no output at night and less on cloudy days; needs storage; large parks take much land.',
      v: flow('LR', [['a', 'Sunlight'], ['b', 'Photovoltaic panels'], ['c', 'Inverter'], ['d', 'Grid or batteries'], ['e', 'Homes, pumps, industry']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow from sunlight through photovoltaic panels and an inverter to the grid and users'),
      n: 'Solar panels made of photovoltaic cells turn sunlight straight into electricity, while solar cookers and water heaters use the sun’s heat. Huge solar parks now cover dry open land at Bhadla in Rajasthan, Charanka in Gujarat and Pavagada in Karnataka. Solar power needs no fuel and makes no smoke. But it stops at night, falls on cloudy days and needs batteries or the grid to fill the gaps.',
    }),
    sl('concept', 'Wind energy', {
      b: 'Wind turbines turn the energy of moving air into electricity. They need **strong, steady winds** — on coasts, open plains and mountain gaps. **Tamil Nadu** is a leading state for wind power, with large wind farms around **Muppandal** (Kanyakumari district), where winds funnel through a gap in the Western Ghats. Other areas: Gujarat (Kutch coast), Maharashtra, Rajasthan (Jaisalmer), Karnataka. **Advantages:** renewable, clean, cheap to run. **Disadvantages:** output varies with the wind; noise; birds may be harmed; needs wide open land.',
      v: table(['State', 'Wind area (example)'], [['Tamil Nadu', 'Muppandal, Kanyakumari district'], ['Gujarat', 'Kutch coast'], ['Rajasthan', 'Jaisalmer'], ['Maharashtra', 'Satara district plateaus']], 'Table of states with important wind farms and example areas'),
      n: 'Wind turbines change the energy of moving air into electricity, but they need winds that are both strong and steady. Tamil Nadu is a leader, with thousands of turbines near Muppandal, where the monsoon winds rush through a gap in the hills. Gujarat, Rajasthan and Maharashtra also have big wind farms. Wind power is clean and cheap to run, but it rises and falls with the wind.',
    }),
    sl('check', 'Quick check: solar and wind', {
      b: 'Explain why a place suits wind or solar power.',
      n: 'Quick check. Wind farms need strong, steady winds, such as those that funnel through a gap in the hills.',
      chk: 'wind-chk',
    }),
    sl('concept', 'Tidal energy', {
      b: 'The sea rises and falls twice a day. Where the **tidal range** is large and the coast forms a **narrow, funnel-shaped gulf**, a barrage with gates can trap water at high tide and release it through turbines at low tide. Suitable sites in India: the **Gulf of Khambhat** and the **Gulf of Kutch** (Gujarat) and the **Sundarbans** (West Bengal). **Advantages:** renewable and predictable. **Disadvantages:** very high cost; few suitable sites; harm to mangroves, fish and shipping. Large tidal plants have been studied but not yet built in India (as of the early 2020s).',
      v: flow('LR', [['a', 'High tide fills the basin'], ['b', 'Gates closed'], ['c', 'Low tide outside'], ['d', 'Water released through turbines'], ['e', 'Electricity']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow of how a tidal power barrage traps and releases water to make electricity'),
      n: 'Twice a day the sea rises and falls. In a narrow funnel-shaped gulf the difference between high and low tide can be very large. A barrage can trap sea water at high tide and let it out through turbines at low tide. The Gulfs of Khambhat and Kutch in Gujarat and the Sundarbans are the best sites in India, but tidal plants are costly and can harm mangroves and fish.',
    }),
    sl('example', 'Worked example: matching a source to a place', {
      b: '**Problem.** Suggest the most suitable non-conventional source for (a) a village near Jaisalmer, (b) the coast near Kanyakumari, (c) the shore of the Gulf of Kutch, (d) a dairy village in Haryana. Give a reason for each.\n\n**(a)** Solar — clear skies most of the year and open, barren land.\n\n**(b)** Wind — strong, steady winds through the gap in the Western Ghats.\n\n**(c)** Tidal — a large tidal range in a narrow gulf.\n\n**(d)** Biogas — plenty of cattle dung.',
      v: table(['Place', 'Source', 'Reason'], [['Near Jaisalmer', 'Solar', 'Clear skies, open land'], ['Near Kanyakumari', 'Wind', 'Funnelled, steady winds'], ['Gulf of Kutch', 'Tidal', 'Large tidal range'], ['Dairy village, Haryana', 'Biogas', 'Plenty of dung']], 'Table matching four places to a suitable non-conventional source with a reason'),
      n: 'To choose a source, look at what the place has. Near Jaisalmer there is blazing sunshine and open land, so solar is best. Near Kanyakumari the winds are strong and steady, so wind farms fit. The Gulf of Kutch has a large tidal range, so tidal power is possible. And a dairy village has plenty of dung, which is ideal for a biogas plant.',
    }),
    sl('check', 'Quick check: tidal energy', {
      b: 'Identify the condition needed for tidal power.',
      n: 'Quick check. Tidal power needs a large tidal range in a narrow gulf.',
      chk: 'tidal-chk',
    }),
    sl('concept', 'Geothermal and nuclear energy', {
      b: '**Geothermal energy** uses heat from inside the Earth, seen at **hot springs**. Sites explored in India: **Puga valley** (Ladakh) and **Manikaran** (Parvati valley, Himachal Pradesh). It is clean and steady, but usable sites are few and remote. **Nuclear energy** comes from splitting atoms of **uranium** (mined at **Jaduguda**, Jharkhand) or **thorium** (from monazite sands of the Kerala coast). Stations: **Tarapur** (Maharashtra, India’s first), **Rawatbhata** (Rajasthan), **Kalpakkam** and **Kudankulam** (Tamil Nadu), **Narora** (Uttar Pradesh), **Kakrapar** (Gujarat), **Kaiga** (Karnataka). A little fuel gives a lot of power without smoke, but there are risks of radiation leaks and radioactive waste.',
      v: table(['Nuclear station', 'State'], [['Tarapur', 'Maharashtra'], ['Rawatbhata', 'Rajasthan'], ['Kalpakkam, Kudankulam', 'Tamil Nadu'], ['Narora', 'Uttar Pradesh'], ['Kakrapar', 'Gujarat'], ['Kaiga', 'Karnataka']], 'Table of nuclear power stations of India and their states'),
      n: 'Geothermal energy taps the heat inside the Earth, which shows itself in hot springs such as those of the Puga valley in Ladakh and Manikaran in Himachal Pradesh. Nuclear energy comes from splitting uranium atoms. Uranium is mined at Jaduguda in Jharkhand, and thorium comes from the beach sands of Kerala. India has nuclear stations at Tarapur, Rawatbhata, Kalpakkam, Kudankulam, Narora, Kakrapar and Kaiga.',
    }),
    sl('diagram', 'Biogas: fuel and manure from dung', {
      b: '**How biogas is made:** cattle dung (and farm or kitchen waste) is mixed with water and fed into an airtight **digester**. Bacteria break it down **without air** (anaerobic decay), giving a gas that is mainly **methane**. **Benefits for rural households:** smokeless cooking fuel (healthier for women and children); saves firewood, so fewer trees are cut; the leftover **slurry** is a rich manure, better than burning dung cakes; cleaner villages. Community plants serve several families.',
      v: V.biogas,
      n: 'In a biogas plant, cattle dung is mixed with water and fed into a closed pit called a digester. There, bacteria break it down without air and give off a gas that is mostly methane. The gas is piped to the kitchen for cooking and lighting. Families get a smokeless fuel, save firewood and keep the slurry, which is excellent manure for the fields.',
    }),
    sl('check', 'Quick check: biogas', {
      b: 'State a benefit of biogas for a village home.',
      n: 'Quick check. Biogas gives smokeless fuel and leaves manure behind.',
      chk: 'biogas-chk',
    }),
    sl('diagram', 'Reading an energy mix', {
      b: `The chart shows the **installed capacity** of an illustrative State Z. Total $= ${MIXROWS()}= ${mixTotal()}$ MW. Coal is the largest single source; solar is second. Renewable sources (solar, hydel and wind) together give ${renewMW()} MW.`,
      v: V.mix,
      n: 'This bar chart shows how much power each source can supply in an imaginary state. Coal is clearly the largest, with solar in second place. Hydel, wind, natural gas and nuclear follow. To read such a chart, first find the total by adding all the bars. Then you can work out each source’s share of the total and compare renewable with non-renewable sources.',
    }),
    sl('example', 'Worked example: shares from the table', {
      b: `**Problem.** Using State Z’s figures, find (a) the share of coal, (b) the share of renewable sources (solar, hydel, wind), and (c) suggest one way to reduce dependence on coal.\n\n**(a)** Coal share $= \\dfrac{${mw('Coal (thermal)')}}{${mixTotal()}} \\times 100 = ${coalP}$%.\n\n**(b)** Renewables $= ${mw('Solar')} + ${mw('Hydel')} + ${mw('Wind')} = ${renewMW()}$ MW; share $= \\dfrac{${renewMW()}}{${mixTotal()}} \\times 100 = ${renP}$%.\n\n**(c)** Add more solar or wind capacity, if the state has sunny land or steady winds.`,
      v: table(['Quantity', 'Working', 'Answer'], [['Total', 'Sum of six sources', `${mixTotal()} MW`], ['Coal share', `${mw('Coal (thermal)')} of ${mixTotal()}`, `${coalP}%`], ['Renewables', 'Solar, hydel, wind', `${renewMW()} MW (${renP}%)`]], 'Table of the working for total, coal share and renewable share of State Z'),
      n: 'Divide the coal figure by the total and multiply by one hundred: coal gives half of the state’s capacity. Next add solar, hydel and wind to get the renewable total, and divide by the total again: renewables give two fifths. To depend less on coal, the state could add more solar or wind farms, choosing places with strong sunshine or steady winds.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Solar: Rajasthan, Gujarat, Karnataka parks; clean but stops at night.',
        'Wind: Tamil Nadu (Muppandal), Gujarat, Rajasthan, Maharashtra; clean but varies with the wind.',
        'Tidal: Gulfs of Khambhat and Kutch, Sundarbans; predictable but costly, few sites.',
        'Geothermal: Puga valley, Manikaran. Nuclear: uranium from Jaduguda; Tarapur, Rawatbhata, Kalpakkam, Narora, Kaiga, Kakrapar, Kudankulam.',
        'Biogas: dung digested without air gives methane and manure.',
      ],
      v: table(['Source', 'One advantage', 'One disadvantage'], [['Solar', 'No fuel cost', 'No output at night'], ['Wind', 'Clean', 'Unsteady output'], ['Tidal', 'Predictable', 'Very costly'], ['Nuclear', 'Much power from little fuel', 'Radioactive waste'], ['Biogas', 'Fuel plus manure', 'Needs steady dung supply']], 'Summary table of an advantage and a disadvantage of each non-conventional source'),
      n: 'To sum up Part 2. Solar parks shine in Rajasthan and Gujarat, wind farms spin in Tamil Nadu and Gujarat, and tidal power waits in the Gulfs of Khambhat and Kutch. Geothermal heat rises at Puga and Manikaran. Nuclear stations run on uranium from Jaduguda. Biogas turns dung into cooking gas and manure. Each source has its own strengths and limits.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'For each source, give one named Indian area, one advantage and one disadvantage.',
        'Explain biogas in steps: dung and water, digester, bacteria without air, methane, slurry as manure.',
        'Name a nuclear station with its state; do not mix up Kaiga, Kakrapar and Kalpakkam.',
        'In data questions, show the total and the division before giving a percentage.',
      ],
      v: table(['Slip', 'Fix'], [['Tidal power suits any coast', 'Needs a large tidal range in a narrow gulf'], ['Biogas is mainly carbon dioxide', 'It is mainly methane'], ['Kaiga is in Gujarat', 'Kaiga is in Karnataka; Kakrapar is in Gujarat']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. For every source, learn one place, one advantage and one disadvantage. Describe biogas step by step, from dung to methane and manure. Keep the nuclear stations straight: Kaiga is in Karnataka, Kakrapar in Gujarat and Kalpakkam in Tamil Nadu. And in data questions, always show the total and your division before you write the percentage.',
    }),
  ],
});
function MIXROWS() {
  return `${mw('Coal (thermal)')} + ${mw('Solar')} + ${mw('Hydel')} + ${mw('Wind')} + ${mw('Natural gas')} + ${mw('Nuclear')} `;
}
