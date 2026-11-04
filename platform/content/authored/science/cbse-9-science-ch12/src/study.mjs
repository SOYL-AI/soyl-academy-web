// ch12 Earth as a System: Energy, Matter and Life. Notes and flashcards.
import { T, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Earth as a System: Energy, Matter and Life: Notes',
  language: 'en',
  sections: [
    sec(
      '1. The Earth as interconnected spheres',
      r`The Earth works as one **system** made of five parts, called **spheres**: the **atmosphere** (air), the **hydrosphere** (liquid water), the **cryosphere** (frozen water), the **geosphere** (rock, soil and the interior) and the **biosphere** (all life). Matter and energy move between them all the time, and the Sun drives most of the movement.

One event usually touches several spheres. In the monsoon, heat from the Sun makes sea water evaporate (hydrosphere to atmosphere). Moist air flows over the hot land, rises and cools, and rain falls on hills and fields (atmosphere to geosphere and biosphere). A volcanic eruption begins in the geosphere, puts ash and gas in the atmosphere, can melt ice of the cryosphere and buries plants of the biosphere, and its haze can cool the weather for a time.`,
      [kt('System', 'A set of parts that interact with one another.'), kt('Atmosphere', 'The layer of air around the Earth.'), kt('Hydrosphere', 'All liquid water on and under the ground.'), kt('Cryosphere', 'Frozen water: snow, glaciers and sea ice.'), kt('Geosphere', 'Rock, soil and the interior of the Earth.'), kt('Biosphere', 'All living things and the places where they live.')],
      [],
      V.sphereTable,
      [1],
      [V.spheres, V.volcano, V.dropTrace],
    ),
    sec(
      '2. Sunlight: radiation that warms the Earth',
      r`Sunlight is **electromagnetic radiation**, which travels through empty space. It has three main parts. **Infrared** (about half of the energy, approximate) is felt as heat. **Visible light** (about 40 percent, approximate) lets us see and powers photosynthesis. **Ultraviolet** (under 10 percent, approximate) can burn skin, and the ozone layer stops most of it.

At the top of the atmosphere a surface facing the Sun receives about **1361 W m⁻²** (approximate). About **30 percent** of the sunlight is **reflected** by clouds, ice and the surface (approximate). The rest, about 70 percent, is **absorbed** by the air, land and sea, which warm up and give out infrared radiation. Light surfaces such as fresh snow reflect more and stay cooler; dark surfaces such as tar absorb more and get hotter.`,
      [kt('Electromagnetic radiation', 'Energy that travels as waves, even through empty space.'), kt('Infrared', 'Invisible radiation just beyond red light, felt as heat.'), kt('Ultraviolet', 'Invisible radiation just beyond violet light; it can burn skin.'), kt('Reflection and absorption', 'Light is turned back, or taken in and changed into heat.')],
      [],
      V.spectrum,
      [2],
      [V.fate, V.surfaces],
    ),
    sec(
      '3. The greenhouse effect, latitude and the seasons',
      r`The warm ground gives out infrared radiation. **Greenhouse gases** such as carbon dioxide, methane and water vapour absorb some of it and send part back down. This **greenhouse effect** keeps the average surface temperature near 15 °C instead of about −18 °C (approximate). The effect is natural and useful; trouble starts when extra gases strengthen it.

**Latitude.** At the equator the Sun is nearly overhead. At higher latitudes its rays slant, so a beam of the same width covers a larger patch of ground, of length $1/\cos(\text{latitude})$ times the width. At 60° the patch is twice as long, so each square metre receives about half the energy.

**Seasons.** The axis of the Earth is tilted by about **23.5 degrees** and points the same way all year. The hemisphere that leans towards the Sun gets more direct rays and longer days (summer). The other has winter. Distance from the Sun is not the cause: the Earth is nearest to the Sun in early January.`,
      [kt('Greenhouse gas', 'A gas such as carbon dioxide or methane that absorbs heat radiated by the ground.'), kt('Latitude', 'The angle north or south of the equator, from 0 degrees to 90 degrees.'), kt('Axial tilt', 'The angle of about 23.5 degrees between the Earth’s axis and the vertical to its orbit.')],
      [],
      V.cosines,
      [2],
      [V.lat, V.tilt, V.seasons],
    ),
    sec(
      '4. The carbon cycle',
      r`Carbon moves between the air, living things, the ocean and rocks. Plants and algae take in **carbon dioxide** by photosynthesis and build sugars and wood. Animals get carbon by eating. **Respiration** by all living things, and **decomposition** by bacteria and fungi, return carbon dioxide to the air. Some buried remains change over millions of years into **fossil fuels**: coal, oil and natural gas. Burning them, or burning wood, releases carbon dioxide at once. The ocean takes in and gives out the gas.

The air held about 280 ppm of carbon dioxide before the late 1800s and about 420 ppm as of the early 2020s (both approximate).`,
      [kt('Photosynthesis', 'The process by which plants use light to turn carbon dioxide and water into sugars.'), kt('Respiration', 'The process by which living things release energy from food and give out carbon dioxide.'), kt('Fossil fuel', 'Coal, oil or natural gas, formed from ancient living things.'), kt('ppm', 'Parts per million: the number of molecules of a gas in a million molecules of air.')],
      [],
      V.carbonRoutes,
      [3],
      [V.carbon],
    ),
    sec(
      '5. The nitrogen and water cycles',
      r`**Nitrogen.** Air is about 78 percent nitrogen gas (approximate), but plants cannot take it up. **Nitrogen fixation** changes it into ammonia or nitrates: bacteria such as *Rhizobium* in the root nodules of pulses, lightning, and fertiliser factories do this. **Nitrification** is the change of ammonia to nitrates by soil bacteria. Plants absorb nitrates and make proteins, and animals eat the plants. **Decomposers** turn dead remains and wastes into ammonia. **Denitrification** by bacteria in waterlogged soil changes nitrates back to nitrogen gas.

**Water.** The Sun’s heat causes **evaporation** and plants lose vapour by **transpiration**. The vapour cools and **condenses** into clouds. **Precipitation** brings rain and snow. **Runoff** and **infiltration** return water to rivers, groundwater and the sea. About 97 percent of the water on Earth is in the oceans (approximate).`,
      [kt('Nitrogen fixation', 'Changing nitrogen gas into compounds that plants can use.'), kt('Nitrification', 'Changing ammonia into nitrates by soil bacteria.'), kt('Denitrification', 'Changing nitrates back into nitrogen gas by bacteria.'), kt('Transpiration', 'Loss of water vapour from the leaves of plants.'), kt('Precipitation', 'Water falling from clouds as rain, snow or hail.')],
      [],
      V.nitroProcesses,
      [3],
      [V.nitrogen, V.waterSteps, V.water],
    ),
    sec(
      '6. Human impact on the cycles and the climate',
      r`Burning **fossil fuels** moves carbon that was stored for millions of years into the air within a short time. **Deforestation** releases the carbon stored in trees and leaves fewer trees to take carbon dioxide in. Rice fields and cattle give out **methane**. These add to the greenhouse gases, strengthen the greenhouse effect and raise the average temperature, by about 1.1 °C since the late 1800s (approximate, as of the early 2020s). Effects include melting ice, rising sea level and more extreme weather.

Too much nitrogen **fertiliser** washes into ponds and rivers and makes algae grow too much. When the algae die, decomposers use up the dissolved oxygen and fish die.

**What we can do:** use solar, wind and hydro power; plant and protect trees; use public transport, cycles or walking; use fertiliser only as needed and grow pulses; save energy and water.`,
      [kt('Deforestation', 'Clearing forests on a large scale.'), kt('Climate change', 'A long-term change in the average weather, such as a rise in temperature.'), kt('Fertiliser runoff', 'Fertiliser washed from fields into water by rain.')],
      [],
      V.causes,
      [4],
      [V.effects, V.eutroph, V.actions],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying that distance from the Sun causes the seasons.
- Writing that the greenhouse effect is always harmful, or that carbon dioxide is the only greenhouse gas.
- Writing that plants absorb nitrogen gas directly.
- Mixing up nitrification (ammonia to nitrates) and denitrification (nitrates to nitrogen gas).
- Giving numbers such as 30 % reflected or 420 ppm without saying they are approximate, or without a date.
- Drawing a cycle without arrows showing direction.

**How marks are usually awarded**
- 1-mark items: a name, a sphere or one process.
- 2-mark items: two points or one cause and one effect.
- 3-mark items: three short correct points, often with an example.
- 5-mark items: a labelled diagram or flow, ordered steps and examples.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Name the five spheres of the Earth system.', 'Atmosphere, hydrosphere, cryosphere, geosphere and biosphere.', 'fact', 1),
    fc(2, 'What does the cryosphere contain?', 'Frozen water: snow, glaciers, sea ice and lake ice.', 'concept', 1),
    fc(3, 'What is the biosphere?', 'All living things and the places where life is found.', 'concept', 1),
    fc(4, 'Which sphere does groundwater belong to?', 'The hydrosphere.', 'fact', 1),
    fc(5, 'Which spheres does a volcanic eruption link?', 'It begins in the geosphere and affects the atmosphere, the cryosphere and the biosphere.', 'example', 1),
    fc(6, 'Name one way the monsoon links two spheres.', 'The Sun heats the sea, so water moves from the hydrosphere to the atmosphere and later falls as rain.', 'example', 1),
    fc(7, 'What kind of energy is sunlight?', 'Electromagnetic radiation, which can travel through empty space.', 'concept', 2),
    fc(8, 'Name the three main parts of sunlight.', 'Infrared, visible light and ultraviolet radiation.', 'fact', 2),
    fc(9, 'Which part of sunlight is felt mainly as heat?', 'Infrared radiation.', 'fact', 2),
    fc(10, 'What does the ozone layer do?', 'It stops most of the ultraviolet radiation from the Sun.', 'concept', 2),
    fc(11, 'About how much sunlight is reflected back to space?', 'About 30 percent (approximate).', 'fact', 2),
    fc(12, 'What happens to the sunlight that is not reflected?', 'It is absorbed by the air, land and sea, which warm up and give out infrared radiation.', 'concept', 2),
    fc(13, 'Why does fresh snow stay cold in sunshine?', 'It reflects most of the light, so it absorbs little energy.', 'concept', 2),
    fc(14, 'What is the greenhouse effect?', 'Greenhouse gases absorb some of the heat radiated by the ground and send part back, keeping the surface warmer.', 'concept', 2),
    fc(15, 'Name three greenhouse gases.', 'Carbon dioxide, methane and water vapour.', 'fact', 2),
    fc(16, 'Why are higher latitudes colder?', 'Sunlight arrives at a slant, so the same energy spreads over a larger area.', 'concept', 2),
    fc(17, 'How much larger is the sunlit patch at 60 degrees latitude?', 'About twice as long, because 1 divided by cos 60 degrees is 2.', 'fact', 2),
    fc(18, 'By how many degrees is the Earth’s axis tilted?', 'About 23.5 degrees.', 'fact', 2),
    fc(19, 'What causes the seasons?', 'The tilt of the axis, which changes how directly sunlight falls on each hemisphere. Not the distance from the Sun.', 'exam-tip', 2),
    fc(20, 'Which hemisphere has summer in June?', 'The Northern Hemisphere, because it leans towards the Sun.', 'fact', 2),
    fc(21, 'How do plants take carbon from the air?', 'They take in carbon dioxide by photosynthesis and build sugars and wood.', 'concept', 3),
    fc(22, 'Name two processes that return carbon dioxide to the air.', 'Respiration, decomposition and burning.', 'fact', 3),
    fc(23, 'How are fossil fuels formed?', 'Buried remains of ancient living things change over millions of years into coal, oil and gas.', 'concept', 3),
    fc(24, 'What percentage of air is nitrogen gas?', 'About 78 percent (approximate).', 'fact', 3),
    fc(25, 'What is nitrogen fixation?', 'Changing nitrogen gas into compounds plants can use, by bacteria such as Rhizobium, lightning or factories.', 'concept', 3),
    fc(26, 'What is nitrification?', 'The change of ammonia into nitrates by soil bacteria.', 'concept', 3),
    fc(27, 'What is denitrification?', 'The change of nitrates back into nitrogen gas by bacteria in waterlogged soil.', 'concept', 3),
    fc(28, 'List the steps of the water cycle.', 'Evaporation, transpiration, condensation, precipitation, runoff and infiltration.', 'fact', 3),
    fc(29, 'How much carbon dioxide was in the air as of the early 2020s?', 'About 420 ppm, compared with about 280 ppm before the late 1800s (approximate).', 'fact', 4),
    fc(30, 'Name two human activities that raise carbon dioxide.', 'Burning fossil fuels and cutting forests.', 'fact', 4),
    fc(31, 'Why is too much fertiliser harmful to a lake?', 'Runoff makes algae grow too much; when they die, decomposers use up the oxygen and fish die.', 'concept', 4),
    fc(32, 'Give three actions that reduce human impact on the cycles and climate.', 'Use solar or wind power, plant trees and use fertiliser carefully.', 'exam-tip', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
