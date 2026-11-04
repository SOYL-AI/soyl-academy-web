// ch12 Earth as a System: Energy, Matter and Life. Two decks.
// Part 1 (t01, t02): the five spheres, sunlight and its energy, latitude and tilt.
// Part 2 (t03, t04): carbon, nitrogen and water cycles, and human impact.
import { sl, deck, table, flow, svgV } from './lib.mjs';
import { SPHERES, SUNLIGHT_LAT, AXIAL_TILT, CARBON_CYCLE, NITROGEN_CYCLE, WATER_CYCLE } from './svgs.mjs';

// Numbers used in the worked examples, computed and asserted here.
const E30 = 800 * Math.cos((30 * Math.PI) / 180);
if (Math.abs(E30 - 692.8) > 0.05 || Math.abs(1 / Math.cos((30 * Math.PI) / 180) - 1.155) > 0.001) throw new Error('example 30 degrees');
if (Math.abs(900 * 0.84 - 756) > 1e-9) throw new Error('example absorbed');
if (Math.abs(500 * 0.004 - 2) > 1e-9 || Math.abs(500 * 0.004 * 1000 - 2000) > 1e-9) throw new Error('example tank');
if (Math.abs(((360 - 300) / 300) * 100 - 20) > 1e-9) throw new Error('example ppm');

export const V = {
  spheres: svgV(SPHERES, 'Five boxes for atmosphere, hydrosphere, cryosphere, geosphere and biosphere arranged in a ring around the Sun, with two-way arrows between neighbours and short notes on each link', 'The five spheres and how they interact: schematic.'),
  lat: svgV(SUNLIGHT_LAT, 'A circle for the Earth with a beam of sunlight falling straight on the equator and at a slant at 60 degrees north, where the same beam covers a ground patch twice as long', 'The same beam spreads over a larger area at higher latitude: schematic, patch lengths from 1 divided by cosine of the latitude.'),
  tilt: svgV(AXIAL_TILT, 'The Earth at two points of its orbit, June and December, with the axis tilted the same way each time, so that the northern half leans towards the Sun in June and away from it in December', 'Axial tilt and the seasons: schematic, not to scale.'),
  carbon: svgV(CARBON_CYCLE, 'Boxes for carbon dioxide in the air, plants, animals, ocean, dead remains and fossil fuels joined by arrows for photosynthesis, respiration, eating, death, decomposition, burial and burning', 'The carbon cycle: schematic.'),
  nitrogen: svgV(NITROGEN_CYCLE, 'Boxes for nitrogen gas in the air, ammonia in soil, nitrates in soil, plants, animals and dead remains joined by arrows for fixation, nitrification, uptake, eating, death, decomposition and denitrification', 'The nitrogen cycle: schematic.'),
  water: svgV(WATER_CYCLE, 'A sea, a tree, a mountain with snow and a cloud, with arrows for evaporation, transpiration, condensation, precipitation, runoff, infiltration and groundwater flow', 'The water cycle: schematic.'),
  sphereTable: table(
    ['Sphere', 'What it contains', 'Example'],
    [
      ['Atmosphere', 'The air and its gases', 'Clouds, wind, the ozone layer'],
      ['Hydrosphere', 'Liquid water on and under the ground', 'Oceans, rivers, lakes, groundwater'],
      ['Cryosphere', 'Frozen water', 'Glaciers, snow, sea ice'],
      ['Geosphere', 'Rock, soil and the Earth’s interior', 'Mountains, volcanoes, soil'],
      ['Biosphere', 'All living things and where they live', 'Forests, coral reefs, farms'],
    ],
    'Table of the five spheres, what each contains and an example',
  ),
  dropTrace: table(
    ['Step', 'What happens', 'Sphere involved'],
    [
      ['1', 'The Sun heats the Arabian Sea and water evaporates', 'Hydrosphere to atmosphere'],
      ['2', 'Moist air flows to the hot land, rises, cools and forms clouds', 'Atmosphere'],
      ['3', 'Rain falls on a hill and runs into a stream', 'Atmosphere to hydrosphere and geosphere'],
      ['4', 'A farmer’s rice crop uses the water', 'Biosphere'],
    ],
    'Table that traces a monsoon raindrop through four steps and the spheres involved',
  ),
  volcano: table(
    ['A volcano erupts', 'Sphere affected', 'Effect'],
    [
      ['Lava and ash leave the Earth’s interior', 'Geosphere', 'New rock forms; land is covered'],
      ['Ash and gas rise into the sky', 'Atmosphere', 'Haze that can cool the weather for a time'],
      ['Hot lava reaches a glacier', 'Cryosphere', 'Ice melts and a flood may follow'],
      ['Ash falls on forests and fields', 'Biosphere', 'Plants may be buried; soil later gains minerals'],
    ],
    'Table showing how one volcanic eruption affects four spheres',
  ),
  spectrum: table(
    ['Radiation', 'Wavelength compared with visible light', 'Share of sunlight (approximate)', 'Main effect'],
    [
      ['Ultraviolet', 'Shorter', 'Under 10 %', 'Can burn skin; most is stopped by the ozone layer'],
      ['Visible light', 'About 400 nm (violet) to 700 nm (red)', 'About 40 %', 'Lets us see; used in photosynthesis'],
      ['Infrared', 'Longer', 'About 50 %', 'Felt as heat; warms surfaces'],
    ],
    'Table of ultraviolet, visible and infrared radiation with wavelength, approximate share of sunlight and main effect',
  ),
  fate: flow('LR', [['a', 'Sunlight arrives'], ['b', 'About 30 % reflected (approximate)'], ['c', 'About 70 % absorbed (approximate)'], ['d', 'Warm Earth gives out infrared'], ['e', 'Greenhouse gases return some']], [['a', 'b'], ['a', 'c'], ['c', 'd'], ['d', 'e']], 'Flow chart: sunlight is partly reflected and partly absorbed, the warm Earth gives out infrared radiation and greenhouse gases return some of it'),
  greenhouse: flow('LR', [['a', 'Sunlight warms the ground'], ['b', 'Ground gives out infrared'], ['c', 'Gases absorb some of it'], ['d', 'Part is sent back down'], ['e', 'Surface stays warmer']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow chart of the greenhouse effect from sunlight warming the ground to a warmer surface'),
  surfaces: table(
    ['Surface', 'Reflects', 'Result in sunshine'],
    [['Fresh snow', 'Most of the light', 'Stays cold'], ['Green grass', 'Some of the light', 'Warms a little'], ['Black tar road', 'Very little', 'Gets very hot']],
    'Table of three surfaces, how much light each reflects and the result in sunshine',
  ),
  cosines: table(
    ['Latitude', 'Angle of the rays to the ground', '1 divided by cos (latitude)', 'Energy per square metre compared with the equator'],
    [['0° (equator)', '90°', '1.00', 'Full'], ['30° N', '60°', '1.15', 'About 0.87 times'], ['60° N', '30°', '2.00', 'Half']],
    'Table with latitude, the angle of the rays, the area factor and the energy per square metre compared with the equator',
  ),
  calc30: table(
    ['Step', 'Working'],
    [['Area factor at 30° N', `1 divided by cos 30° = 1 divided by 0.866 = about 1.15`], ['Energy per square metre', `800 × cos 30° = 800 × 0.866 = ${E30.toFixed(1)}, about 693 W m⁻²`]],
    'Table with the area factor and energy per square metre at 30 degrees north',
  ),
  calcAbs: table(
    ['Step', 'Working'],
    [['Sunlight reaching the roof', '900 W m⁻² (given)'], ['Fraction absorbed', '0.84 (given)'], ['Power absorbed per square metre', '900 × 0.84 = 756 W m⁻²']],
    'Table with the sunlight on a roof, the fraction absorbed and the power absorbed per square metre',
  ),
  seasons: table(
    ['Month', 'Northern Hemisphere', 'Southern Hemisphere'],
    [['June', 'Leans towards the Sun: summer, long days', 'Leans away: winter, short days'], ['December', 'Leans away: winter, short days', 'Leans towards the Sun: summer, long days'], ['March and September', 'Neither leans towards the Sun: days and nights nearly equal', 'Same']],
    'Table of the seasons in the two hemispheres in June, December, March and September',
  ),
  energyMatter: table(
    ['', 'Energy', 'Matter'],
    [['Source', 'Comes from the Sun', 'Already on Earth'], ['What happens', 'Flows through and leaves as heat', 'Goes round and round in cycles'], ['Examples', 'Sunlight, then heat to space', 'Carbon, nitrogen, water']],
    'Table comparing the flow of energy with the cycling of matter on Earth',
  ),
  carbonRoutes: table(
    ['Carbon moves', 'By which process', 'Speed'],
    [['Air to plants', 'Photosynthesis', 'Fast'], ['Plants and animals to air', 'Respiration', 'Fast'], ['Dead remains to air', 'Decomposition by bacteria and fungi', 'Weeks to years'], ['Remains to coal, oil, gas', 'Burial and change over millions of years', 'Very slow'], ['Fossil fuels to air', 'Burning', 'Fast']],
    'Table of how carbon moves between stores, by which process and how fast',
  ),
  nitroProcesses: table(
    ['Process', 'Change', 'Who or what does it'],
    [['Nitrogen fixation', 'Nitrogen gas to ammonia or nitrates', 'Rhizobium in root nodules, lightning, fertiliser factories'], ['Nitrification', 'Ammonia to nitrates', 'Soil bacteria'], ['Denitrification', 'Nitrates to nitrogen gas', 'Bacteria in waterlogged soil']],
    'Table of nitrogen fixation, nitrification and denitrification with the change in each and who does it',
  ),
  waterSteps: table(
    ['Step', 'What happens'],
    [['Evaporation', 'Heat turns liquid water into vapour'], ['Transpiration', 'Plants give out water vapour through their leaves'], ['Condensation', 'Vapour cools into cloud droplets'], ['Precipitation', 'Rain, snow or hail falls'], ['Runoff and infiltration', 'Water flows over the land or soaks into the ground']],
    'Table of the steps of the water cycle',
  ),
  calcTank: table(
    ['Step', 'Working'],
    [['Depth lost', '4 mm = 0.004 m (given)'], ['Volume lost', '500 × 0.004 = 2 m³'], ['In litres', '2 × 1000 = 2000 litres']],
    'Table with the depth, volume and litres of water lost by evaporation from a tank',
  ),
  calcPpm: table(
    ['Step', 'Working'],
    [['Rise in concentration', '360 − 300 = 60 ppm (illustrative)'], ['Percentage rise', '60 / 300 × 100 = 20 %']],
    'Table with the rise and percentage rise in the concentration of a gas',
  ),
  causes: table(
    ['Human activity', 'What it does', 'Effect'],
    [['Burning coal, oil and gas', 'Releases carbon stored for millions of years', 'Carbon dioxide rises; stronger greenhouse effect'], ['Cutting and burning forests', 'Releases stored carbon; fewer trees remain', 'Less carbon dioxide taken in'], ['Too much fertiliser', 'Adds nitrates that wash into water', 'Algae grow, oxygen falls, fish die'], ['Rice fields and cattle', 'Release methane, a greenhouse gas', 'More warming']],
    'Table of human activities, what each does and its effect on the cycles and the climate',
  ),
  effects: flow('LR', [['a', 'More greenhouse gases'], ['b', 'More heat held near the surface'], ['c', 'Higher average temperature'], ['d', 'Ice melts, sea level rises, weather changes']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow chart from more greenhouse gases to a higher temperature and then melting ice, rising sea and changing weather'),
  eutroph: flow('LR', [['a', 'Fertiliser washes into a lake'], ['b', 'Algae grow too much'], ['c', 'Algae die and rot'], ['d', 'Decomposers use up oxygen'], ['e', 'Fish die']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow chart from fertiliser washing into a lake to algae growing, dying, decomposers using up oxygen and fish dying'),
  actions: table(
    ['What we can do', 'How it helps'],
    [['Use solar, wind and hydro power', 'Less fossil fuel is burned'], ['Plant and protect trees', 'More carbon dioxide taken from the air'], ['Use buses, trains, cycles and walking', 'Less fuel burned per person'], ['Apply fertiliser only as needed; grow pulses', 'Less nitrate runoff; nitrogen fixed naturally'], ['Save energy and water at home', 'Lower emissions and less strain on water supplies']],
    'Table of actions that reduce the human impact on the cycles and the climate',
  ),
};

export const deck1 = deck({
  part: 1,
  title: 'Earth as a System, Part 1: the spheres, sunlight and the seasons',
  goals: [
    'Name the five spheres of the Earth and describe how they interact',
    'Describe sunlight as radiation and explain how it warms the Earth, including the greenhouse effect',
    'Explain how latitude and the tilt of the axis change heating and cause the seasons',
  ],
  slides: [
    sl('title', 'Earth as a system', {
      b: 'Part 1: the five spheres, energy from the Sun, and why places and seasons differ.',
      v: flow('LR', [['a', 'Sun’s energy'], ['b', 'Five spheres'], ['c', 'Heating differs by latitude'], ['d', 'Seasons']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow chart from the Sun’s energy to the five spheres, to heating that differs by latitude, and to the seasons'),
      n: 'The Earth is not just rock, water and air sitting side by side. They work together as one system, powered by energy from the Sun. In this part we meet the five spheres of the Earth, learn what happens to sunlight when it arrives, and find out why the poles are cold, the equator is hot, and why we have seasons.',
    }),
    sl('concept', 'Five spheres, one system', {
      b: 'The Earth system has five parts: the **atmosphere** (air), **hydrosphere** (liquid water), **cryosphere** (ice), **geosphere** (rock and soil) and **biosphere** (life). They constantly exchange matter and energy, and the Sun drives most of the exchanges.',
      v: V.spheres,
      n: 'The Earth system has five parts, called spheres. The atmosphere is the air, the hydrosphere is liquid water, the cryosphere is ice and snow, the geosphere is rock and soil, and the biosphere is all living things. None of them stands alone. They keep exchanging matter and energy, and energy from the Sun drives most of these exchanges. The arrows in the picture work both ways.',
    }),
    sl('concept', 'What is in each sphere?', {
      b: 'Many places belong to more than one sphere. Groundwater is **hydrosphere**, the soil that holds it is **geosphere**, and the roots and earthworms in it are **biosphere**.',
      v: V.sphereTable,
      n: 'This table lists what each sphere holds. Clouds and wind belong to the atmosphere. Oceans, rivers and groundwater belong to the hydrosphere. Glaciers and sea ice belong to the cryosphere. Mountains, volcanoes and soil belong to the geosphere. Forests, coral reefs and farms belong to the biosphere. Many places overlap. Soil is geosphere, but the roots and earthworms in it are the biosphere.',
    }),
    sl('example', 'Worked example: the journey of a monsoon raindrop', {
      b: `**Problem.** Trace a raindrop of the monsoon from the sea to a rice field, and name the spheres involved.

**Step 1.** The Sun heats the sea. Water leaves the **hydrosphere** and enters the **atmosphere** as vapour.

**Step 2.** The land is hotter than the sea, so moist air flows inland, rises, cools and forms clouds.

**Step 3.** Rain falls on a hill, runs into a stream and soaks the soil, which links the atmosphere, hydrosphere and **geosphere**.

**Step 4.** The rice crop, part of the **biosphere**, takes up the water.`,
      v: V.dropTrace,
      n: 'Let us follow a raindrop. First the Sun heats the sea, and water evaporates into the air. The land heats faster than the sea, so moist air flows inland, rises and cools into clouds. Rain falls on a hill, runs into a stream and soaks the soil. At the end, a rice crop in a farmer field takes up the water. In this one journey four of the five spheres were involved.',
    }),
    sl('concept', 'When a volcano erupts', {
      b: 'One event can touch every sphere. A volcano begins in the **geosphere**, but its ash and gas enter the **atmosphere**, its heat can melt the **cryosphere**, and its ash falls on the **biosphere**.',
      v: V.volcano,
      n: 'A volcanic eruption shows how connected the spheres are. Lava and ash come from the geosphere. Ash and gas rise into the atmosphere, and a haze can cool the weather for a time. Hot lava that reaches a glacier melts ice in the cryosphere. Ash falling on forests and fields can bury plants in the biosphere, though later the soil may gain minerals.',
    }),
    sl('check', 'Quick check: the spheres', {
      b: 'Follow the water through the spheres.',
      n: 'Quick check. Think about what each place in the story belongs to.',
      chk: 'chk-sphere',
    }),
    sl('concept', 'Sunlight is radiation', {
      b: 'Energy from the Sun reaches us as **electromagnetic radiation**, which can travel through empty space. Sunlight contains **infrared** (felt as heat), **visible light** and **ultraviolet** (UV). The shares given here are approximate.',
      v: V.spectrum,
      n: 'Energy from the Sun travels through empty space as electromagnetic radiation. Sunlight has three main parts. Infrared radiation is about half of it, and we feel it as heat. Visible light is about forty percent, and it lets us see and helps plants make food. Ultraviolet radiation is under ten percent, and it can burn skin. These shares are approximate. Most ultraviolet is stopped by the ozone layer.',
    }),
    sl('concept', 'What happens to sunlight on Earth?', {
      b: 'About **30 percent** of the sunlight is reflected back to space by clouds, ice and the surface (approximate). The rest, about **70 percent**, is absorbed by the air, land and sea, which warm up and then give out infrared radiation.',
      v: V.fate,
      n: 'When sunlight reaches the Earth, about thirty percent is reflected back to space by clouds, ice and bright surfaces. This is an approximate value. The other seventy percent or so is absorbed by the air, the land and the oceans. They warm up. Then the warm Earth gives out its own heat, as infrared radiation. Without this balance, the Earth would keep heating or cooling.',
    }),
    sl('concept', 'Light surfaces reflect, dark surfaces absorb', {
      b: 'How much a surface warms depends on how much light it **absorbs**. Fresh snow reflects most light and stays cold. A dark tar road absorbs most and gets hot.',
      v: V.surfaces,
      n: 'Different surfaces react differently to sunlight. Fresh snow reflects most of the light, so it stays cold. Green grass reflects some and warms a little. A black tar road reflects very little, so it absorbs most of the light and becomes very hot. That is why a white roof keeps a house cooler than a dark one.',
    }),
    sl('concept', 'The greenhouse effect', {
      b: 'The warm ground gives out **infrared radiation**. **Greenhouse gases** such as carbon dioxide, methane and water vapour absorb some of it and send part back down. This natural effect keeps the average surface temperature near **15 degrees Celsius**, instead of about minus 18 (approximate).',
      v: V.greenhouse,
      n: 'The ground warms in sunlight and gives out infrared radiation. Greenhouse gases in the air, such as carbon dioxide, methane and water vapour, absorb some of this heat and send part of it back down. This natural greenhouse effect is useful. It keeps the average temperature of the Earth near fifteen degrees Celsius. Without it, the average would be far below freezing.',
    }),
    sl('check', 'Quick check: greenhouse effect', {
      b: 'Pick the correct description.',
      n: 'Quick check. Remember what happens to the infrared radiation from the ground.',
      chk: 'chk-greenhouse',
    }),
    sl('concept', 'Latitude: the same beam, a bigger patch', {
      b: 'At the equator at noon, sunlight falls almost straight down. At **60 degrees north** it falls at a slant, so the same beam spreads over **twice** the ground area, and each square metre is heated half as much. The patch length is $1 / \\cos(\\text{latitude})$ times the beam width.',
      v: V.lat,
      n: 'Look at the picture. Two beams of sunlight have the same width. At the equator the beam falls straight down and covers a small patch of ground. At sixty degrees north it falls at a slant, and the same beam covers a patch twice as long. The energy is spread over twice the area, so each square metre is heated only half as much. This is one reason why the poles are colder than the equator.',
    }),
    sl('example', 'Worked example: energy at 30 degrees north', {
      b: `**Problem.** At noon on an equinox day the equator receives 800 W m⁻² (given). Find the energy per square metre at 30° N.

**Step 1.** The area factor is $1 / \\cos 30° = 1 / 0.866 = 1.15$, so the beam covers about 1.15 times the area.

**Step 2.** Energy per square metre $= 800 \\times \\cos 30° = 800 \\times 0.866 = ${E30.toFixed(1)}$.

**Step 3.** So about **693 W m⁻²** reaches each square metre, which is a little less than at the equator.`,
      v: V.calc30,
      n: 'Let us work out the energy at thirty degrees north. The equator gets eight hundred watts on each square metre. At thirty degrees north the same beam is spread over about one point one five times the area. So each square metre gets eight hundred times zero point eight six six, which is about six hundred and ninety three watts. That is a little less than at the equator.',
    }),
    sl('concept', 'Tilt of the axis and the seasons', {
      b: 'The Earth’s axis is tilted by about **23.5 degrees** and always points the same way as the Earth goes round the Sun. When the northern half leans towards the Sun (June), it has **summer**; when it leans away (December), **winter**. The distance to the Sun is **not** the cause.',
      v: V.tilt,
      n: 'The axis of the Earth is tilted by about twenty three and a half degrees. As the Earth goes round the Sun, the axis keeps pointing the same way. In June the northern half leans towards the Sun, so sunlight is more direct and the days are longer. That is summer in the north. Six months later it leans away, and it is winter. The Earth is actually closest to the Sun in early January, so distance is not the cause.',
    }),
    sl('check', 'Quick check: seasons', {
      b: 'What causes the seasons?',
      n: 'Quick check. Think about when the Earth is nearest to the Sun and what the weather is in India then.',
      chk: 'chk-season',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'The five spheres are atmosphere, hydrosphere, cryosphere, geosphere and biosphere. They interact, driven by the Sun.',
        'Sunlight is radiation: infrared (heat), visible light and ultraviolet. About 30 % is reflected and about 70 % absorbed (approximate).',
        'Greenhouse gases return part of the ground’s infrared radiation, keeping the Earth warm.',
        'Higher latitudes get slanting rays, so the same energy covers a larger area.',
        'The 23.5 degree tilt of the axis, not distance from the Sun, causes the seasons.',
      ],
      v: V.seasons,
      n: 'To sum up. The Earth has five interacting spheres. Sunlight is infrared, visible and ultraviolet radiation. About thirty percent is reflected and the rest is absorbed. Greenhouse gases return some of the heat that the ground gives out. Slanting rays at high latitudes spread energy over a larger area. And the tilt of the axis, not the distance from the Sun, gives us the seasons.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Name all five spheres, and for any event, say which spheres it links.',
        'Say that percentages such as 30 % reflected are approximate.',
        'Explain the greenhouse effect in order: sunlight, ground radiates infrared, gases absorb and return some.',
        'For latitude, say the same energy is spread over a larger area.',
        'Never say that distance from the Sun causes the seasons.',
      ],
      v: table(['Common slip', 'Correct idea'], [['Greenhouse effect is harmful', 'The natural effect keeps the Earth warm; extra gases strengthen it'], ['Summer is when the Earth is nearer the Sun', 'Summer is when the hemisphere leans towards the Sun'], ['The Sun is weaker at the poles', 'The same energy is spread over a larger area']], 'Table of common slips and the correct ideas'),
      n: 'Some exam tips. Name all five spheres, and say which spheres an event links. Remember that values such as thirty percent reflected are approximate. Explain the greenhouse effect in order. For latitude, say that the same energy spreads over a larger area. And never say that the distance from the Sun causes the seasons. The table lists common slips.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Earth as a System, Part 2: cycles of matter and human impact',
  goals: [
    'Explain the carbon, nitrogen and water cycles',
    'Describe nitrogen fixation, nitrification and denitrification',
    'Describe how human activities affect the cycles and the climate, and suggest actions',
  ],
  slides: [
    sl('title', 'Cycles of matter and our impact', {
      b: 'Part 2: carbon, nitrogen and water cycles, and what people do to them.',
      v: flow('LR', [['a', 'Carbon cycle'], ['b', 'Nitrogen cycle'], ['c', 'Water cycle'], ['d', 'Human impact']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow chart from the carbon cycle to the nitrogen cycle, the water cycle and human impact'),
      n: 'Energy flows through the Earth system, but matter goes round and round. The same carbon, nitrogen and water are used again and again. In this part we follow these three cycles, and then see how burning fuels, cutting forests and using fertiliser disturb them. We end with what each of us can do.',
    }),
    sl('concept', 'Energy flows, matter cycles', {
      b: 'Sunlight arrives, does its work and leaves as heat. Matter has nowhere else to go, so it **cycles** between air, water, rock and living things.',
      v: V.energyMatter,
      n: 'Energy and matter behave differently on Earth. Energy comes from the Sun, flows through the system and leaves as heat. Matter does not arrive from outside in large amounts. Carbon, nitrogen and water therefore go round in cycles, passing between air, water, rock and living things, and they are used over and over again.',
    }),
    sl('concept', 'The carbon cycle', {
      b: 'Plants and algae take **carbon dioxide** from the air by photosynthesis. Animals eat plants. Respiration and decomposition return carbon dioxide to the air. Some remains become **fossil fuels**, and burning them releases carbon dioxide. The ocean takes in and gives out carbon dioxide.',
      v: V.carbon,
      n: 'In the carbon cycle, plants and algae take carbon dioxide from the air and build it into sugars and wood by photosynthesis. Animals get carbon by eating plants. Respiration returns carbon dioxide to the air, and so do bacteria and fungi when they decompose dead remains. Over millions of years some remains turn into coal, oil and gas. Burning them releases carbon dioxide again. The ocean also takes in and gives out the gas.',
    }),
    sl('check', 'Quick check: carbon', {
      b: 'Where does the carbon of wood come from?',
      n: 'Quick check. Think about what a tree uses to build its wood.',
      chk: 'chk-carbon',
    }),
    sl('concept', 'The nitrogen cycle', {
      b: 'Air is about **78 percent nitrogen** gas (approximate), but plants cannot use it. Bacteria, lightning and factories **fix** it into compounds. Plants absorb nitrates. Decomposers return ammonia. Other bacteria send nitrogen back to the air.',
      v: V.nitrogen,
      n: 'About seventy eight percent of air is nitrogen gas, but plants cannot use it directly. It must first be changed into compounds. Bacteria in root nodules, lightning, and fertiliser factories do this. Plants then absorb nitrates and make proteins. Animals get nitrogen by eating plants. Decomposers change dead remains into ammonia, and some soil bacteria send nitrogen gas back to the air.',
    }),
    sl('concept', 'Fixation, nitrification, denitrification', {
      b: '**Fixation** changes nitrogen gas into usable compounds. **Nitrification** changes ammonia into nitrates. **Denitrification** changes nitrates back into nitrogen gas. Pulse crops such as gram and moong host *Rhizobium* in their root nodules.',
      v: V.nitroProcesses,
      n: 'Three processes are important. In nitrogen fixation, nitrogen gas is changed into compounds, by Rhizobium bacteria in root nodules of pulse plants, by lightning, and in fertiliser factories. In nitrification, soil bacteria change ammonia into nitrates. In denitrification, bacteria in waterlogged soil change nitrates back into nitrogen gas, which returns to the air.',
    }),
    sl('check', 'Quick check: nitrogen', {
      b: 'Name the process.',
      n: 'Quick check. Decide which change the bacteria in the root swellings carry out.',
      chk: 'chk-nitro',
    }),
    sl('concept', 'The water cycle', {
      b: 'The Sun’s heat drives the water cycle: **evaporation** and **transpiration** put vapour in the air, **condensation** makes clouds, **precipitation** brings rain or snow, and **runoff** and **infiltration** return water to rivers, ground and sea. About 97 percent of Earth’s water is in the oceans (approximate).',
      v: V.water,
      n: 'The water cycle is driven by the heat of the Sun. Water evaporates from seas, and plants lose vapour through their leaves by transpiration. The vapour rises and cools, and condensation makes clouds. Rain or snow falls as precipitation. Water then flows over the land as runoff, or soaks into the ground. The cycle is never ending. About ninety seven percent of Earth water is in the oceans, which is an approximate value.',
    }),
    sl('example', 'Worked example: evaporation from a tank', {
      b: `**Problem.** A water tank has a surface area of 500 m². In a day its level falls 4 mm because of evaporation (given). How many litres evaporate?

**Step 1.** Convert the depth: 4 mm = 0.004 m.

**Step 2.** Volume = area × depth = 500 × 0.004 = **2 m³**.

**Step 3.** 1 m³ = 1000 litres, so the tank loses 2 × 1000 = **2000 litres**.`,
      v: V.calcTank,
      n: 'Let us find how much water a tank loses in a day. Change four millimetres to metres, which is zero point zero zero four. Multiply the area of five hundred square metres by this depth. That gives two cubic metres. One cubic metre is one thousand litres, so the tank loses two thousand litres of water in a day by evaporation.',
    }),
    sl('concept', 'Human impact on the carbon cycle and the climate', {
      b: 'Before the late 1800s the air held about **280 ppm** of carbon dioxide. As of the early 2020s it holds about **420 ppm** (approximate). The extra gas comes mostly from burning **fossil fuels** and from **deforestation**, and it strengthens the greenhouse effect.',
      v: V.causes,
      n: 'People have changed the cycles. Before the late eighteen hundreds the air held about two hundred and eighty parts per million of carbon dioxide. As of the early twenty twenties it holds about four hundred and twenty, an approximate figure. The extra gas comes mostly from burning coal, oil and gas, and from cutting forests. Too much fertiliser and some farming practices add to the problems too.',
    }),
    sl('example', 'Worked example: how much has carbon dioxide risen?', {
      b: `**Problem.** A gas rises from 300 ppm to 360 ppm (illustrative). Find the percentage rise.

**Step 1.** Rise = 360 − 300 = 60 ppm.

**Step 2.** Percentage rise = 60 / 300 × 100 = **20 %**.

**Step 3.** A rise of this kind in a greenhouse gas holds more heat near the surface.`,
      v: V.calcPpm,
      n: 'Let us find a percentage rise. A gas goes from three hundred to three hundred and sixty parts per million. This is an illustrative case. The rise is sixty. Divide sixty by three hundred and multiply by one hundred. The answer is twenty percent. A rise like this in a greenhouse gas holds more heat near the surface.',
    }),
    sl('concept', 'Warming and its effects', {
      b: 'The Earth’s average temperature has risen by about **1.1 degrees Celsius** since the late 1800s (approximate, as of the early 2020s). Effects include melting ice, rising sea level and more extreme weather.',
      v: V.effects,
      n: 'More greenhouse gases hold more heat near the surface, so the average temperature rises. Since the late eighteen hundreds it has risen by about one point one degrees Celsius, which is approximate and given as of the early twenty twenties. The effects include melting glaciers and sea ice, a rising sea level and more extreme weather, such as heavy rain and heat waves.',
    }),
    sl('concept', 'Fertilisers and the nitrogen cycle', {
      b: 'Too much nitrogen fertiliser washes into ponds and rivers. The extra nitrates make **algae** grow too fast. When the algae die, decomposers use up the dissolved **oxygen**, and fish die.',
      v: V.eutroph,
      n: 'Fertilisers add nitrogen compounds to the soil, which helps crops. But when farmers use too much, rain washes the extra into ponds and rivers. The nitrates make algae grow very fast. Later the algae die and rot, and decomposers use up the oxygen dissolved in the water. Without oxygen, the fish cannot breathe and they die.',
    }),
    sl('check', 'Quick check: human impact', {
      b: 'Think about what happens to the carbon in the trees.',
      n: 'Quick check. Think about what happens to the carbon stored in the trees, and to the trees that are left.',
      chk: 'chk-impact',
    }),
    sl('concept', 'What can we do?', {
      b: 'Small actions add up. Cleaner energy, more trees, careful use of fertiliser and wise use of energy and water all **reduce our impact**.',
      v: V.actions,
      n: 'What can we do? We can use solar, wind and hydro power so that less fuel is burned. We can plant and protect trees. We can use buses, trains, cycles or walking. Farmers can use fertiliser only as needed and grow pulses that fix nitrogen. At home, we can save energy and water. Each action is small, but together they make a difference.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Energy flows through the Earth and leaves as heat; matter cycles.',
        'Carbon cycle: photosynthesis takes carbon dioxide in; respiration, decomposition and burning put it back.',
        'Nitrogen cycle: fixation, nitrification, uptake by plants, decomposition and denitrification.',
        'Water cycle: evaporation, transpiration, condensation, precipitation, runoff and infiltration.',
        'Burning fuels, cutting forests and over-using fertiliser disturb the cycles. We can reduce the impact.',
      ],
      v: V.waterSteps,
      n: 'To sum up. Energy flows and matter cycles. In the carbon cycle, photosynthesis takes carbon dioxide in and respiration, decomposition and burning put it back. The nitrogen cycle has fixation, nitrification, uptake by plants, decomposition and denitrification. The water cycle has evaporation, transpiration, condensation, precipitation, runoff and infiltration. Human actions disturb these cycles, but we can reduce the impact.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Draw and label the cycle when asked: use arrows to show direction.',
        'Name the bacteria or agent for each nitrogen process.',
        'Give a date for time-sensitive numbers, such as about 420 ppm as of the early 2020s.',
        'For human impact, give a cause, a link to the cycle and an effect.',
        'Suggest at least three realistic actions.',
      ],
      v: table(['Common slip', 'Correct idea'], [['Plants take in nitrogen gas', 'Plants take in nitrates; bacteria fix the gas'], ['Respiration only happens in animals', 'All living things respire'], ['Fertiliser is always harmless', 'Excess fertiliser pollutes water']], 'Table of common slips and the correct ideas'),
      n: 'Some exam tips. When you draw a cycle, label it and use arrows to show direction. Name the agent in each nitrogen process. Give a date for time sensitive numbers, such as about four hundred and twenty parts per million as of the early twenty twenties. For human impact, give a cause, link it to a cycle and state an effect. And suggest at least three realistic actions.',
    }),
  ],
});
