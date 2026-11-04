// ch12 Earth as a System: Energy, Matter and Life. Question bank. MCQ keys are placed by the builder (balanced).
// AR keys: a (ar-greenhouse), c (ar-season), a (ar-nitro), d (ar-decomp), b (ar-monsoon), a (ar-carbon).
// Numericals are computed here, interpolated into stem and solution, and re-solved by the check passed to add().
import { mk, add, r, near, sig } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;

// ---------------------------------------------------------------- t01 interconnected spheres
add('chk-sphere', mcq({
  stem: 'Meltwater from a Himalayan glacier feeds a river, and the river is used to irrigate wheat fields in Punjab. In which order does the water pass through the spheres?',
  right: 'Cryosphere, hydrosphere, biosphere',
  wrong: ['Biosphere, hydrosphere, cryosphere', 'Atmosphere, geosphere, cryosphere', 'Geosphere, biosphere, atmosphere'],
  sol: 'Glacier ice is the cryosphere. The river water is the hydrosphere. The wheat crop that takes up the water is part of the biosphere — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('volcano-mcq', mcq({
  stem: 'A volcano erupts and throws ash and gases high into the sky. The eruption begins in one sphere and its ash first enters another. Which pair is correct?',
  right: 'It begins in the geosphere and the ash enters the atmosphere.',
  wrong: ['It begins in the atmosphere and the ash enters the geosphere.', 'It begins in the hydrosphere and the ash enters the biosphere.', 'It begins in the cryosphere and the ash enters the hydrosphere.'],
  sol: 'Molten rock and gases come from the hot interior of the Earth, which is part of the geosphere. The ash and gas are thrown into the air, which is the atmosphere — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('cryo-mcq', mcq({
  stem: 'Which of these belongs to the cryosphere?',
  right: 'Winter ice that covers a lake in Ladakh',
  wrong: ['Water vapour over the Arabian Sea', 'Groundwater under a Punjab wheat field', 'Soil in a Kerala rice paddy'],
  sol: 'The cryosphere is the frozen water on Earth, such as snow, glaciers and lake or sea ice — option (@K). Water vapour is in the atmosphere, groundwater is in the hydrosphere and soil is in the geosphere.',
  d: 1, c: 'understanding', t: [1],
}));
add('monsoon-mcq', mcq({
  stem: 'In summer the land of India heats up faster than the Arabian Sea and the Bay of Bengal. Moist air from the sea then flows towards the land and brings rain. Which statement describes this best?',
  right: 'Heat from the Sun links the atmosphere, the hydrosphere and the geosphere, and the rain feeds the biosphere.',
  wrong: ['Only the atmosphere is involved, because rain is just air.', 'Only the hydrosphere is involved, because the sea is water.', 'The monsoon is a separate system with no link to the Sun.'],
  sol: 'The Sun warms the land more than the sea, so the air above the land rises and moist air flows in from the sea. This links atmosphere, hydrosphere and geosphere, and the rain waters crops and forests — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('ar-monsoon', ar({
  a: 'The windward slopes of the Western Ghats receive very heavy rain in the monsoon.',
  r: 'The Sun’s heat makes water evaporate from the Arabian Sea.',
  key: 'b',
  sol: 'Both statements are true. Evaporation supplies the water vapour, but the heavy rain on the slopes is mainly because moist air is forced up the hills, where it cools and condenses. So R does not explain A — option (b).',
  d: 3, c: 'analysis', t: [1],
}));
add('tf-biosphere', tf({
  stem: 'The biosphere is only the part of the Earth where animals live on dry land.',
  key: 'f',
  sol: 'False. The biosphere is all the places where life is found, including plants, microbes, and life in water, soil and the lower air.',
  d: 2, c: 'understanding', t: [1],
}));
add('fill-cryo', fill({
  stem: 'The sphere made of snow, glaciers and sea ice is called the ______.',
  acc: [['cryosphere', 'Cryosphere']],
  sol: 'Cryosphere comes from a word meaning cold.',
  d: 1, c: 'recall', t: [1],
}));
add('s2-sphere', short({
  marks: 2,
  stem: 'Heavy rain on a hillside in the Western Ghats washes soil into a stream. Name two spheres that interact here and state what each contributes.',
  model: 'The atmosphere interacts with the geosphere. The atmosphere supplies the rain, which is water falling from clouds. The geosphere supplies the loose soil, which the moving water carries away into the stream, a part of the hydrosphere.',
  sol: 'Atmosphere supplies rain; geosphere supplies soil; stream is hydrosphere.',
  scheme: [['Two correct spheres named', 1], ['Contribution of each stated', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('s3-volcano', short({
  marks: 3,
  stem: 'A large volcanic eruption sends ash and sulfur gases into the air. Describe one effect on each of the atmosphere, the geosphere and the biosphere.',
  model: 'In the atmosphere, the fine ash and gases form a haze that can reflect some sunlight and cool the weather for a time. In the geosphere, lava and ash build new rock and cover the land. On the biosphere, ash can bury plants and animals nearby, although later it may enrich the soil with minerals.',
  sol: 'Haze cools; new rock and ash layers; plants buried then soil enriched.',
  scheme: [['An effect on the atmosphere, such as haze and cooling', 1], ['An effect on the geosphere, such as new rock or ash cover', 1], ['An effect on the biosphere, such as plants buried or soil enriched', 1]],
  d: 3, c: 'understanding', t: [1],
}));
add('long-spheres', long({
  stem: 'Name the five spheres of the Earth and state what each contains. Using a monsoon season as an example, show how at least four of them interact.',
  model: 'The atmosphere is the air around the Earth. The hydrosphere is liquid water such as seas, rivers and groundwater. The geosphere is rock, soil and the interior. The cryosphere is snow and ice. The biosphere is all living things. In the monsoon, the Sun heats the land and sea, and water evaporates from the sea into the atmosphere. Moist air rises over land, cools and falls as rain. The rain fills rivers, soaks into the soil of the geosphere and helps crops and forests of the biosphere grow. Snow on mountains in the cryosphere later melts to feed rivers.',
  sol: 'Five spheres with contents; monsoon links four or more spheres.',
  scheme: [['Five spheres named', 1], ['Contents of each sphere stated', 1.5], ['Monsoon steps in correct order: heating, evaporation, rain', 1], ['At least four spheres linked in the example', 1.5]],
  d: 3, c: 'application', t: [1],
}));
add('case-volcano', mk.case({
  passage: r`After a big volcanic eruption, a weather station near the volcano records the average temperature of the region against a normal year. The readings below are illustrative (given).

| Days after eruption | Haze in the upper air | Temperature change (°C) |
|---|---|---|
| 0 | None | 0.0 |
| 30 | Thick | −0.3 |
| 90 | Thick | −0.6 |
| 180 | Thin | −0.3 |`,
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'The haze in the upper air is a result of material that was thrown out of the volcano. The haze is therefore part of the:',
      right: 'atmosphere, made of ash and gas from the geosphere',
      wrong: ['hydrosphere, made of water from the sea', 'cryosphere, made of ice from glaciers', 'biosphere, made of living organisms'],
      sol: 'Ash and gas from the Earth’s interior came from the geosphere and now hang in the air, so the haze is in the atmosphere — option (@K).',
      d: 2, c: 'application', t: [1],
    })),
    part('b', short({
      marks: 1,
      stem: 'By how many degrees Celsius was the region coolest compared with a normal year?',
      model: 'It was coolest at 0.6 degrees below normal, after 90 days.',
      sol: 'The lowest value in the table is −0.6 °C.',
      scheme: [['0.6 °C below normal', 1]],
      d: 1, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Use the table to explain how the haze changed the temperature.',
      model: 'When the haze was thick, at 30 and 90 days, the temperature was lower. The haze reflected part of the sunlight, so less energy reached the ground. When the haze thinned at 180 days, the cooling became smaller.',
      sol: 'Thick haze, more cooling; thin haze, less cooling; less sunlight reaches the ground.',
      scheme: [['Cooling matches the thick haze in the table', 1], ['Haze reflects sunlight, so less energy reaches the ground', 1]],
      d: 3, c: 'analysis', t: [1, 2],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'The haze fades after some months. Predict what will happen to the temperature and give a reason from the table.',
        model: 'The temperature will rise back towards normal. At 180 days the haze is thin and the cooling has already fallen from 0.6 to 0.3 degrees, so as the haze clears more sunlight will reach the ground.',
        sol: 'Temperature returns to normal as haze clears.',
        scheme: [['Predicts a return towards normal temperature', 1], ['Reason from the thinner haze and smaller cooling in the table', 1]],
        d: 3, c: 'evaluation', t: [1, 2],
      }),
    ]),
  ],
}), null);

// ---------------------------------------------------------------- t02 solar energy
add('chk-greenhouse', mcq({
  stem: 'Which statement describes the natural greenhouse effect correctly?',
  right: 'Some gases in the air absorb heat radiated by the ground and send part of it back, which keeps the surface warmer.',
  wrong: ['A layer of glass in the sky stops sunlight from reaching the ground.', 'Heat from inside the Earth is the main source of warmth at the surface.', 'Greenhouse gases reflect all the sunlight back into space.'],
  sol: 'The ground warms and gives out infrared radiation. Greenhouse gases such as carbon dioxide and water vapour absorb some of it and send part back down, so the surface is warmer than it would otherwise be — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('spectrum-mcq', mcq({
  stem: 'On a winter morning in Shimla you stand in the sunshine and feel warmth on your face, although you cannot see the radiation that is mainly responsible. Which radiation is it?',
  right: 'Infrared radiation',
  wrong: ['Ultraviolet radiation', 'Visible light', 'Sound waves'],
  sol: 'Sunlight contains infrared, visible and ultraviolet radiation. Infrared is invisible and is felt mainly as heat — option (@K). Sound waves are not part of sunlight.',
  d: 2, c: 'application', t: [2],
}));
add('reflect-mcq', mcq({
  stem: 'On a sunny day a freshly snow-covered field stays much cooler than a black tar road next to it. The best explanation is that the snow:',
  right: 'reflects most of the sunlight, while the tar absorbs most of it',
  wrong: ['absorbs more sunlight than the tar', 'gives out heat of its own', 'is higher up and nearer to the Sun'],
  sol: 'Light-coloured surfaces such as fresh snow reflect most sunlight, so they absorb little energy. Dark tar absorbs most of it and gets hot — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('car-mcq', mcq({
  stem: 'A car parked in the sun with its windows shut becomes much hotter inside than outside. How is this like the greenhouse effect?',
  right: 'Sunlight passes in through the glass, and the heat given out by the seats and dashboard is held in.',
  wrong: ['The glass makes new sunlight inside the car.', 'The engine heats the car even when it is off.', 'The glass reflects all the sunlight away from the seats.'],
  sol: 'Sunlight enters through the glass and warms the objects inside. They give out infrared radiation, which cannot easily pass out, so the air inside heats up. Greenhouse gases act in a similar way — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('lat-mcq', mcq({
  stem: 'A torch held straight above a table makes a small bright circle. Tilted, it makes a bigger, dimmer oval. What does this show about places near the poles?',
  right: 'Sunlight falls at a slant there, so the same energy is spread over a larger area.',
  wrong: ['The Sun is much farther from the poles.', 'There is no sunlight at the poles in any month.', 'Sunlight at the poles is a different kind of radiation.'],
  sol: 'Near the poles the Sun’s rays reach the ground at a low angle, like the tilted torch. The same energy covers a larger area, so each square metre is heated less — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('tilt-mcq', mcq({
  stem: 'Delhi has its hot summer around June, while Sydney is cool at that time. This is mainly because in June:',
  right: 'the Northern Hemisphere leans towards the Sun because of the tilt of the Earth’s axis',
  wrong: ['the Earth is at its nearest point to the Sun', 'the Sun gives out more energy in June', 'the Earth stops rotating for some weeks'],
  sol: 'The axis of the Earth is tilted by about 23.5 degrees. In June the northern half leans towards the Sun, so it gets more direct sunlight and longer days. The southern half leans away — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('chk-season', mcq({
  stem: 'The Earth is a little nearer to the Sun in early January, when it is winter in India. What does this tell us about the cause of the seasons?',
  right: 'Distance from the Sun is not the main cause, and the tilt of the axis is.',
  wrong: ['Winter in India is caused by the Earth being closest to the Sun.', 'The Earth’s orbit is exactly a circle, so there are no seasons.', 'Seasons are caused by the Moon.'],
  sol: 'If distance were the cause, January would be warm in India. It is cold, so the cause is the tilt of the axis, which changes how directly sunlight falls — option (@K).',
  d: 3, c: 'evaluation', t: [2],
}));
add('ar-greenhouse', ar({
  a: 'Without any greenhouse gases the average temperature at the Earth’s surface would be far below freezing (about −18 °C, approximate).',
  r: 'Greenhouse gases absorb part of the heat radiated by the ground and send some of it back.',
  key: 'a',
  sol: 'Both statements are true. The returned heat is what raises the surface temperature to the present average of about 15 °C, so R explains A — option (a).',
  d: 3, c: 'analysis', t: [2],
}));
add('ar-season', ar({
  a: 'When it is summer in Australia it is winter in India.',
  r: 'In that month the whole Earth is nearer to the Sun.',
  key: 'c',
  sol: 'A is true because the two hemispheres lean in opposite directions. R is false, because the distance is not the cause and the whole Earth cannot be near and far at once for two places — option (c).',
  d: 3, c: 'analysis', t: [2],
}));
add('tf-visible', tf({
  stem: 'Sunlight contains only visible light.',
  key: 'f',
  sol: 'False. Sunlight also contains infrared radiation, which we feel as heat, and a small share of ultraviolet radiation.',
  d: 1, c: 'recall', t: [2],
}));
add('fill-infrared', fill({
  stem: 'Radiation with a wavelength just longer than that of red light is called ______ radiation.',
  acc: [['infrared', 'Infrared', 'infra-red', 'infra red']],
  sol: 'Infrared lies beyond the red end of the visible spectrum.',
  d: 1, c: 'recall', t: [2],
}));
add('match-radiation', match({
  pairs: [['Ultraviolet', 'Can cause sunburn on skin'], ['Visible light', 'Used by plants in photosynthesis'], ['Infrared', 'Felt as warmth'], ['Greenhouse gas', 'Absorbs heat radiated by the ground']],
  order: [3, 1, 0, 2],
  stem: 'Match each item (column I) with a statement about it (column II).',
  sol: 'Ultraviolet radiation can burn skin; visible light drives photosynthesis; infrared is felt as warmth; a greenhouse gas absorbs heat radiated by the ground.',
  d: 2, c: 'understanding', t: [2],
}));
add('num-absorbed', (() => {
  const S0 = 1361;
  const refl = 0.3;
  const absorbed = S0 * (1 - refl);
  return num({
    stem: `Just above the atmosphere, sunlight delivers about ${S0} W m⁻² to a surface facing the Sun (approximate). About ${refl * 100} % of this sunlight is reflected back to space (approximate), and the rest is absorbed by the air, land and sea. Taking these values, find the power absorbed by each square metre of such a surface. Give the answer to the nearest whole number.`,
    value: sig(absorbed, 3), tol: 1, unit: 'W m⁻²',
    sol: r`Fraction absorbed $= 1 - ${refl} = ${sig(1 - refl, 2)}$. Power absorbed $= ${S0} \times ${sig(1 - refl, 2)} = ${absorbed.toFixed(1)} \approx ${sig(absorbed, 3)}\ \text{W m}^{-2}$.`,
    scheme: [['Fraction absorbed = 1 − 0.30 = 0.70', 1], ['1361 × 0.70 = 952.7, about 953 W m⁻²', 1]],
    marks: 2, d: 2, c: 'application', t: [2],
  });
})(), (q) => near(1361 * 0.7, 952.7, 1e-9) && q.answer.value === 953 || 'absorbed');
add('num-latitude', (() => {
  const eq = 900;
  const phi = 60;
  const factor = 1 / Math.cos((phi * Math.PI) / 180);
  const at60 = eq / Math.round(factor);
  return num({
    stem: `At noon on an equinox day, level ground at the equator receives about ${eq} W m⁻² of sunlight (given). At ${phi}° N the same beam is spread over ${Math.round(factor)} times the ground area, because 1 divided by cos ${phi}° is ${Math.round(factor)}. Find the sunlight received by each square metre of level ground at ${phi}° N under the same conditions.`,
    value: at60, tol: 0, unit: 'W m⁻²',
    sol: r`Area is ${Math.round(factor)} times larger, so each square metre gets $\dfrac{1}{${Math.round(factor)}}$ of the equator value. Sunlight per square metre $= \dfrac{${eq}}{${Math.round(factor)}} = ${at60}\ \text{W m}^{-2}$.`,
    scheme: [['Spread over twice the area, so half the energy per square metre', 1], ['900 / 2 = 450 W m⁻²', 1]],
    marks: 2, d: 2, c: 'application', t: [2],
  });
})(), (q) => near(900 * Math.cos(Math.PI / 3), 450, 1e-9) && q.answer.value === 450 || 'latitude');
add('s2-spectrum', short({
  marks: 2,
  stem: 'Name the three kinds of radiation in sunlight that reach the Earth. State one effect of each.',
  model: 'Sunlight has infrared, visible and ultraviolet radiation. Infrared is felt as heat and warms the surface. Visible light lets us see and is used by plants for photosynthesis. Ultraviolet radiation can burn skin and kill germs in small amounts.',
  sol: 'Infrared warms; visible light for sight and photosynthesis; ultraviolet burns skin.',
  scheme: [['Three radiations named', 1], ['One correct effect of each', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('s2-latitude', short({
  marks: 2,
  stem: 'Why is the weather at 60° N, such as in Norway, colder than at the equator, even on the same day with a clear sky?',
  model: 'At 60° N the Sun’s rays strike the ground at a slant, so the same beam of energy is spread over about twice the ground area compared with the equator. Each square metre therefore receives less energy and is heated less.',
  sol: 'Slanting rays spread the energy over a larger area.',
  scheme: [['Rays strike at a slant at higher latitude', 1], ['The same energy spreads over a larger area, so less per square metre', 1]],
  d: 2, c: 'application', t: [2],
}));
add('s3-greenhouse', short({
  marks: 3,
  stem: 'Explain the greenhouse effect. Name two greenhouse gases and say why the effect is useful to life.',
  model: 'The ground absorbs sunlight and gives out heat as infrared radiation. Greenhouse gases such as carbon dioxide and methane absorb part of this heat and send some back towards the ground. This natural effect keeps the average temperature of the Earth near 15 degrees Celsius, so water stays liquid and life is possible.',
  sol: 'Ground gives out infrared; gases absorb and return some; keeps Earth warm for life.',
  scheme: [['Ground gives out heat as infrared radiation', 1], ['Greenhouse gases absorb part and return it, two gases named', 1], ['Keeps the Earth warm enough for liquid water and life', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('s3-seasons', short({
  marks: 3,
  stem: 'Explain, with the tilt of the Earth’s axis, why Delhi has a longer, warmer day in June than in December.',
  model: 'The axis of the Earth is tilted by about 23.5 degrees and always points the same way as the Earth goes round the Sun. In June the Northern Hemisphere leans towards the Sun, so sunlight falls more directly and the days are longer. In December it leans away, so the sunlight is more slanting and the days are shorter.',
  sol: 'Tilt; north leans towards Sun in June; more direct rays and longer days.',
  scheme: [['Axis tilted by about 23.5 degrees, pointing the same way all year', 1], ['In June the north leans towards the Sun: direct rays and longer days', 1], ['In December it leans away: slanting rays and shorter days', 1]],
  d: 3, c: 'application', t: [2],
}));
add('long-solar', long({
  stem: 'Describe what happens to the sunlight that reaches the Earth, and explain how latitude and the tilt of the axis cause different amounts of heating and the seasons.',
  model: 'About 30 percent of the sunlight is reflected back to space by clouds, ice and the surface, and the rest is absorbed by the air, land and oceans, which warm up. The warm ground gives out infrared radiation, and greenhouse gases return part of it, which keeps the surface warm. Near the equator the rays are almost overhead, so energy is concentrated. Near the poles the rays are slanting, so the same energy spreads over a larger area. The tilt of 23.5 degrees makes each hemisphere lean towards the Sun for half the year, giving summer, and away for the rest, giving winter.',
  sol: 'Reflected, absorbed, re-radiated; latitude spreads energy; tilt gives seasons.',
  scheme: [['About 30 % reflected and the rest absorbed (approximate values)', 1], ['Ground radiates infrared and greenhouse gases return part of it', 1], ['Latitude: direct rays at the equator, slanting rays and larger area near the poles', 1.5], ['Tilt of the axis gives summer when leaning towards the Sun and winter when leaning away', 1.5]],
  d: 3, c: 'analysis', t: [2],
}));
add('case-sun', mk.case({
  passage: r`In a school science fair, students leave three surfaces in bright sunshine for 30 minutes. They measure the temperature of each surface before and after (readings given).

| Surface | Starting temperature (°C) | Final temperature (°C) |
|---|---|---|
| Fresh white paper | 30 | 34 |
| Green grass | 30 | 37 |
| Black tar sheet | 30 | 48 |`,
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which surface absorbed the most of the sunlight that fell on it?',
      right: 'The black tar sheet',
      wrong: ['The fresh white paper', 'The green grass', 'All three absorbed equal amounts'],
      sol: 'The tar sheet shows the biggest rise in temperature, so it absorbed the most energy — option (@K).',
      d: 1, c: 'application', t: [2],
    })),
    part('b', short({
      marks: 1,
      stem: 'Calculate the rise in temperature of the black tar sheet.',
      model: 'The rise is 18 degrees Celsius, because 48 minus 30 is 18.',
      sol: '48 − 30 = 18 °C.',
      scheme: [['18 °C', 1]],
      d: 1, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain the readings for the white paper and the tar sheet in terms of absorption and reflection.',
      model: 'The white paper reflects most of the sunlight, so it absorbs little energy and warms by only 4 degrees. The black tar absorbs most of the sunlight and reflects little, so its temperature rises by 18 degrees.',
      sol: 'White reflects more and warms less; black absorbs more and warms more.',
      scheme: [['White paper reflects most light, so small rise of 4 °C', 1], ['Black tar absorbs most light, so large rise of 18 °C', 1]],
      d: 3, c: 'analysis', t: [2],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'A city wants to reduce the heat of its roofs in summer. Use the table to suggest a roof colour and explain.',
        model: 'The city should paint the roofs white. The white paper warmed by only 4 degrees, while the black tar warmed by 18 degrees, so a white roof reflects more sunlight and stays cooler.',
        sol: 'White roofs reflect more sunlight.',
        scheme: [['Suggests white or light roofs', 1], ['Uses the table: white rose 4 °C against black 18 °C', 1]],
        d: 3, c: 'evaluation', t: [2],
      }),
    ]),
  ],
}), null);

// ---------------------------------------------------------------- t03 carbon, nitrogen and water cycles
add('chk-carbon', mcq({
  stem: 'A banyan tree in a village has grown for fifty years and now weighs several tonnes. Most of the carbon in its wood came from:',
  right: 'carbon dioxide in the air, taken in by its leaves',
  wrong: ['minerals taken in from the soil', 'carbon in the water that it absorbed', 'oxygen gas taken in at night'],
  sol: 'Plants build sugars and wood from carbon dioxide of the air during photosynthesis. Soil minerals and water do not supply the carbon of wood — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('coal-mcq', mcq({
  stem: 'The carbon stored in a lump of coal was once part of:',
  right: 'plants that were buried and changed over millions of years',
  wrong: ['rocks that melted in a volcano', 'sea water that evaporated', 'gases that came from the Moon'],
  sol: 'Coal formed from the remains of ancient plants that were buried and changed by heat and pressure over millions of years — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('chk-nitro', mcq({
  stem: 'A farmer pulls up a gram plant and sees small swellings on its roots. Bacteria inside them change nitrogen gas of the air into compounds that the plant can use. This process is called:',
  right: 'nitrogen fixation',
  wrong: ['nitrification', 'denitrification', 'transpiration'],
  sol: 'Turning nitrogen gas into usable compounds is nitrogen fixation, done by bacteria such as Rhizobium in root nodules — option (@K). Nitrification changes ammonia to nitrates, and denitrification returns nitrogen gas to the air.',
  d: 2, c: 'application', t: [3],
}));
add('nitrify-mcq', mcq({
  stem: 'Soil bacteria in a vegetable garden change ammonia from rotting leaves into nitrates, which the vegetable roots then absorb. This step is called:',
  right: 'nitrification',
  wrong: ['denitrification', 'nitrogen fixation from the air', 'photosynthesis'],
  sol: 'The change of ammonia to nitrates by soil bacteria is nitrification — option (@K). Nitrogen fixation starts from nitrogen gas, and denitrification ends with nitrogen gas.',
  d: 2, c: 'application', t: [3],
}));
add('lightning-mcq', mcq({
  stem: 'Air is about 78 % nitrogen (approximate), yet a wheat plant without any nitrogen compounds in the soil turns yellow and grows poorly. Why?',
  right: 'Plants cannot use nitrogen gas directly, so it must first be changed into nitrates or ammonium compounds.',
  wrong: ['The nitrogen in the air is too heavy to reach the leaves.', 'Wheat needs oxygen gas only and does not need nitrogen.', 'Plants take in nitrogen gas only at night.'],
  sol: 'Nitrogen gas is very unreactive and plants cannot take it up. Fixation by bacteria, or lightning, or fertiliser factories, makes compounds that roots can absorb — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('water-mcq', mcq({
  stem: 'A steel tumbler of cold lemonade soon has drops of water on its outside. Which step of the water cycle is the same process?',
  right: 'Condensation of water vapour into cloud droplets',
  wrong: ['Evaporation of sea water', 'Transpiration from leaves', 'Infiltration into the soil'],
  sol: 'Water vapour in the warm air touches the cold steel and turns into liquid drops. This is condensation, the same step that forms cloud droplets — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('transp-mcq', mcq({
  stem: 'A leafy plant in a pot is covered with a transparent polythene bag and kept in the sun. After some hours drops of water appear on the inside of the bag. Which part of the water cycle does this model?',
  right: 'Transpiration followed by condensation',
  wrong: ['Infiltration followed by runoff', 'Precipitation followed by evaporation', 'Nitrification followed by respiration'],
  sol: 'The leaves lose water vapour by transpiration. The vapour cools on the bag and condenses into drops — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('ar-carbon', ar({
  a: 'Burning petrol in a scooter adds to the carbon dioxide in the air that was out of circulation for millions of years.',
  r: 'Petrol is made from the remains of ancient living things that took in carbon dioxide when they were alive.',
  key: 'a',
  sol: 'Both statements are true. The carbon in petrol was taken from the air long ago and stored underground. Burning it releases that carbon again, so R explains A — option (a).',
  d: 3, c: 'analysis', t: [3],
}));
add('ar-nitro', ar({
  a: 'Farmers in Punjab often grow gram or moong between two wheat crops to improve the soil.',
  r: 'Pulse plants have root nodules with bacteria that fix nitrogen of the air.',
  key: 'a',
  sol: 'Both statements are true. The bacteria add nitrogen compounds to the soil, which the next crop can use, so R explains A — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('ar-decomp', ar({
  a: 'The nitrogen cycle would work well even if all decomposers were removed.',
  r: 'Dead plants and animals contain nitrogen compounds.',
  key: 'd',
  sol: 'A is false: decomposers turn nitrogen compounds in dead remains and wastes back into ammonia, so the cycle would stall without them. R is a true statement — option (d).',
  d: 3, c: 'analysis', t: [3],
}));
add('tf-nitrogas', tf({
  stem: 'Wheat plants can absorb nitrogen gas straight from the air through their leaves.',
  key: 'f',
  sol: 'False. Plants take up nitrogen as nitrates or ammonium compounds from the soil, after bacteria, lightning or factories have changed nitrogen gas.',
  d: 2, c: 'understanding', t: [3],
}));
add('fill-nitrate', fill({
  stem: 'In nitrification, soil bacteria change ammonia into ______, which plant roots can absorb.',
  acc: [['nitrates', 'Nitrates', 'nitrate', 'Nitrate']],
  sol: 'Nitrates are the main form in which nitrogen is taken up by roots.',
  d: 1, c: 'recall', t: [3],
}));
add('match-cycle', match({
  pairs: [['Nitrogen fixation', 'Nitrogen gas is changed into usable compounds'], ['Denitrification', 'Nitrates are changed back into nitrogen gas'], ['Condensation', 'Water vapour forms droplets in clouds'], ['Photosynthesis', 'Carbon dioxide is built into sugars']],
  order: [2, 0, 3, 1],
  stem: 'Match each process (column I) with what happens in it (column II).',
  sol: 'Fixation makes usable compounds from nitrogen gas; denitrification returns nitrogen gas to the air; condensation forms droplets; photosynthesis builds sugars from carbon dioxide.',
  d: 2, c: 'understanding', t: [3],
}));
add('num-pond', (() => {
  const area = 2000;
  const depthMm = 5;
  const m3 = area * (depthMm / 1000);
  const litres = m3 * 1000;
  return num({
    stem: `A village pond has a surface area of ${area} m² (given). On a hot summer day its water level falls by ${depthMm} mm only because of evaporation (given). How many litres of water evaporate in that day? (1 m³ = 1000 litres)`,
    value: litres, tol: 0, unit: 'litres',
    sol: r`Depth $= ${depthMm}\ \text{mm} = ${depthMm / 1000}\ \text{m}$. Volume $= ${area} \times ${depthMm / 1000} = ${m3}\ \text{m}^3$. In litres, $${m3} \times 1000 = ${litres}$.`,
    scheme: [['Volume = area × depth = 2000 × 0.005 = 10 m³', 1], ['10 × 1000 = 10000 litres', 1]],
    marks: 2, d: 2, c: 'application', t: [3],
  });
})(), (q) => near(2000 * 0.005 * 1000, 10000, 1e-9) && q.answer.value === 10000 || 'pond');
add('num-urea', (() => {
  const bags = 6;
  const kgBag = 50;
  const pct = 46;
  const total = bags * kgBag;
  const nitrogen = (total * pct) / 100;
  return num({
    stem: `A farmer in Punjab spreads ${bags} bags of urea on a wheat field. Each bag holds ${kgBag} kg of urea, which is about ${pct} % nitrogen by mass (approximate). How many kilograms of nitrogen does the farmer add to the field?`,
    value: nitrogen, tol: 0, unit: 'kg',
    sol: r`Mass of urea $= ${bags} \times ${kgBag} = ${total}\ \text{kg}$. Nitrogen $= ${total} \times \dfrac{${pct}}{100} = ${nitrogen}\ \text{kg}$.`,
    scheme: [['Total urea = 6 × 50 = 300 kg', 1], ['300 × 46 / 100 = 138 kg of nitrogen', 1]],
    marks: 2, d: 2, c: 'application', t: [3, 4],
  });
})(), (q) => near(6 * 50 * 0.46, 138, 1e-9) && q.answer.value === 138 || 'urea');
add('s2-fixation', short({
  marks: 2,
  stem: 'Name two ways in which nitrogen gas of the air is changed into compounds that plants can use.',
  model: 'Bacteria such as Rhizobium in the root nodules of pulse plants fix nitrogen into ammonium compounds. Lightning also makes nitrogen react with oxygen to form oxides, which rain carries into the soil. Fertiliser factories make ammonia from nitrogen too.',
  sol: 'Rhizobium in root nodules; lightning; factories.',
  scheme: [['One correct natural way, such as bacteria in root nodules', 1], ['A second correct way, such as lightning or fertiliser factories', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('s2-carbon', short({
  marks: 2,
  stem: 'Name two processes that take carbon dioxide out of the air and two that put it back into the air.',
  model: 'Photosynthesis by plants and algae, and the dissolving of carbon dioxide in the sea, take it out of the air. Respiration by living things, and the burning of wood and fuels, put carbon dioxide back into the air.',
  sol: 'Out: photosynthesis, dissolving in sea. In: respiration, burning.',
  scheme: [['Two correct processes that remove carbon dioxide', 1], ['Two correct processes that release carbon dioxide', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('s3-water', short({
  marks: 3,
  stem: 'Describe how a drop of sea water can fall as rain on a hill in Kerala and return to the sea. Name the processes in order.',
  model: 'The Sun’s heat makes sea water evaporate as vapour. The vapour rises, cools and condenses into cloud droplets. The droplets fall as rain on the hill, which is precipitation. The water flows down as runoff into streams and rivers, and the rivers carry it back to the sea.',
  sol: 'Evaporation, condensation, precipitation, runoff to the sea.',
  scheme: [['Evaporation from the sea by the Sun’s heat', 1], ['Condensation into clouds and precipitation as rain', 1], ['Runoff through rivers back to the sea', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('long-cycles', long({
  stem: 'Explain the carbon cycle in the biosphere and the atmosphere. Include photosynthesis, respiration, decomposition, burning of fuels and the part played by the ocean.',
  model: 'Plants and algae take in carbon dioxide from the air and build it into sugars and wood by photosynthesis. Animals get carbon by eating plants. All living things release carbon dioxide by respiration. When plants and animals die, bacteria and fungi decompose them and release carbon dioxide, and some remains are buried and become coal, oil and gas over millions of years. Burning wood and these fossil fuels returns the carbon dioxide quickly. The ocean takes in carbon dioxide from the air and also gives it back.',
  sol: 'Photosynthesis in; respiration, decomposition, burning out; ocean exchange.',
  scheme: [['Photosynthesis removes carbon dioxide and builds sugars; animals eat plants', 1.5], ['Respiration and decomposition release carbon dioxide', 1], ['Fossil fuels form over millions of years; burning returns carbon', 1.5], ['Ocean absorbs and releases carbon dioxide', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('long-nitrogen', long({
  stem: 'Describe the nitrogen cycle. Explain nitrogen fixation, nitrification and denitrification, and the role of decomposers and of plants.',
  model: 'Air is about 78 percent nitrogen gas, which plants cannot use. In nitrogen fixation, bacteria such as Rhizobium in root nodules, lightning and fertiliser factories change it into ammonia or nitrates. In nitrification, soil bacteria change ammonia into nitrates. Plants absorb nitrates and make proteins, and animals get nitrogen by eating plants. Decomposers break down dead remains and wastes into ammonia. In denitrification, bacteria in waterlogged soil change nitrates back into nitrogen gas, which returns to the air.',
  sol: 'Fixation, nitrification, uptake by plants, decomposers, denitrification.',
  scheme: [['Air is mostly nitrogen gas that plants cannot use; fixation by bacteria, lightning, factories', 1.5], ['Nitrification: ammonia to nitrates by soil bacteria', 1], ['Plants take up nitrates; animals eat plants', 1], ['Decomposers return ammonia; denitrification returns nitrogen gas', 1.5]],
  d: 3, c: 'understanding', t: [3],
}));
add('case-nitrogen', mk.case({
  passage: r`A farmer in Haryana grows wheat on three similar plots for one season. Plot A had wheat in the previous season and receives no fertiliser. Plot B had gram, a pulse crop, in the previous season and receives no fertiliser. Plot C had wheat in the previous season and receives urea. The wheat yield is recorded (values illustrative, given).

| Plot | Previous crop | Fertiliser added | Wheat yield (tonnes per hectare) |
|---|---|---|---|
| A | Wheat | None | 2.0 |
| B | Gram | None | 2.9 |
| C | Wheat | Urea | 3.4 |`,
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'The higher yield of plot B compared with plot A is best explained by:',
      right: 'nitrogen compounds added to the soil by bacteria in the gram roots',
      wrong: ['extra sunlight on plot B', 'more carbon dioxide in the soil of plot B', 'the wheat grains being heavier at the start'],
      sol: 'The only difference between A and B is the earlier gram crop. Its root nodule bacteria fixed nitrogen, so the soil of plot B had more nitrogen compounds — option (@K).',
      d: 2, c: 'analysis', t: [3],
    })),
    part('b', short({
      marks: 1,
      stem: 'By what percentage was the yield of plot B higher than that of plot A?',
      model: 'It was 45 percent higher, because 0.9 divided by 2.0 is 0.45.',
      sol: '(2.9 − 2.0) / 2.0 × 100 = 45 %.',
      scheme: [['45 %', 1]],
      d: 2, c: 'application', t: [3],
    }), []),
    part('c', short({
      marks: 2,
      stem: 'Explain why plot C gave the highest yield, and name one risk of using a lot of urea.',
      model: 'Urea supplies nitrogen compounds that wheat roots can take up quickly, so the crop grew well. A risk is that extra urea washes off the field into ponds and rivers, where it can cause algae to grow too much.',
      sol: 'Urea gives nitrogen; excess runs off and pollutes water.',
      scheme: [['Urea supplies nitrogen that the crop can absorb', 1], ['A risk such as runoff causing water pollution or algal growth', 1]],
      d: 3, c: 'evaluation', t: [3, 4],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'The farmer wants to lower the cost of fertiliser. Use the table to suggest a change in farming and explain.',
        model: 'The farmer can grow gram before wheat, because plot B gave 2.9 tonnes without any fertiliser. The bacteria in the gram roots put nitrogen in the soil, so less urea would be needed.',
        sol: 'Grow a pulse crop first to fix nitrogen.',
        scheme: [['Suggests growing a pulse crop before wheat', 1], ['Uses the table: plot B yield without fertiliser; nodule bacteria fix nitrogen', 1]],
        d: 3, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}), null);

// ---------------------------------------------------------------- t04 human impact
add('chk-impact', mcq({
  stem: 'A large forest is cleared and burned to make room for a farm. What is the effect on the carbon cycle?',
  right: 'Carbon dioxide is released by the burning and fewer trees remain to take it back from the air.',
  wrong: ['Carbon dioxide is removed from the air, because the ash takes it in.', 'There is no effect, because trees do not hold carbon.', 'Oxygen is turned into carbon dioxide inside the soil.'],
  sol: 'The carbon stored in the trees is released as carbon dioxide when they are burned, and fewer trees are left to carry out photosynthesis — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('fert-mcq', mcq({
  stem: 'After heavy rain, fertiliser from nearby fields washes into a lake. Soon the lake turns green with algae, and later many fish die. The most likely reason for the fish deaths is that:',
  right: 'decomposers use up the oxygen dissolved in the water as the dead algae rot',
  wrong: ['the fertiliser is a poison that kills fish at once', 'the algae eat the fish', 'the lake becomes too cold for the fish'],
  sol: 'The extra nitrogen and other nutrients make algae grow very fast. When the algae die, decomposers feed on them and use up the oxygen of the water, so the fish cannot breathe — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('fossil-mcq', mcq({
  stem: 'A town wants to reduce the extra carbon dioxide it adds to the air. Which pair of actions would help?',
  right: 'Plant trees along the roads and generate electricity from solar panels',
  wrong: ['Burn crop waste in the fields and plant trees', 'Use more coal for power and use more fertiliser', 'Cut forests for timber and use solar panels'],
  sol: 'Trees take carbon dioxide from the air, and solar panels produce power without burning fuel — option (@K). The other pairs each include an action that adds carbon dioxide.',
  d: 2, c: 'understanding', t: [4],
}));
add('s2-fert', short({
  marks: 2,
  stem: 'Explain why using too much fertiliser on a farm can harm a nearby river.',
  model: 'Extra fertiliser washes off the field into the river and adds nutrients to the water. This makes algae grow too much, and when the algae die, decomposers use up the oxygen, so fish and other water life may die.',
  sol: 'Runoff adds nutrients; algae grow; oxygen used up by decomposers.',
  scheme: [['Fertiliser runoff adds nutrients and makes algae grow too much', 1], ['Decomposers use up the oxygen, harming fish', 1]],
  d: 2, c: 'application', t: [4],
}));
add('s3-impact', short({
  marks: 3,
  stem: 'State three human activities that disturb the carbon or nitrogen cycle and write one effect of each.',
  model: 'Burning coal, petrol and diesel adds carbon dioxide, which strengthens the greenhouse effect and warms the Earth. Cutting forests lowers the uptake of carbon dioxide and releases the stored carbon. Using too much nitrogen fertiliser washes nitrates into water, which makes algae grow too much and causes fish to die.',
  sol: 'Fossil fuels add carbon dioxide; deforestation; excess fertiliser.',
  scheme: [['Burning fossil fuels with its effect', 1], ['Deforestation with its effect', 1], ['Excess fertiliser with its effect', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('long-impact', long({
  stem: 'Explain how human activities have changed the amount of carbon dioxide in the air and affected the climate. Suggest three actions that can reduce the problem.',
  model: 'Before the late 1800s the air held about 280 ppm of carbon dioxide. As of the early 2020s it is about 420 ppm, mainly because we burn coal, oil and gas and cut forests. Extra carbon dioxide absorbs more heat radiated by the ground, so the average temperature of the Earth has risen by about 1.1 degrees Celsius. Ice melts, sea level rises and weather becomes more extreme. We can use solar and wind power, plant trees, use public transport, and use fertiliser carefully.',
  sol: 'CO2 rise from fuels and forests; stronger greenhouse effect; three remedies.',
  scheme: [['Carbon dioxide has risen from about 280 to about 420 ppm (early 2020s)', 1], ['Causes: burning fossil fuels and cutting forests', 1], ['More heat is absorbed, so the Earth warms and ice melts', 1.5], ['Three sensible actions', 1.5]],
  d: 3, c: 'evaluation', t: [4],
}));
add('num-co2', (() => {
  const before = 280;
  const now = 420;
  const rise = now - before;
  const pct = (rise / before) * 100;
  return num({
    stem: `Before the late 1800s the air held about ${before} ppm of carbon dioxide, and as of the early 2020s it holds about ${now} ppm (both approximate). By what percentage has the concentration risen?`,
    value: pct, tol: 0, unit: '%',
    sol: r`Rise $= ${now} - ${before} = ${rise}\ \text{ppm}$. Percentage rise $= \dfrac{${rise}}{${before}} \times 100 = ${pct}\%$.`,
    scheme: [['Rise = 420 − 280 = 140 ppm', 1], ['140 / 280 × 100 = 50 %', 1]],
    marks: 2, d: 2, c: 'application', t: [4],
  });
})(), (q) => near((420 - 280) / 280 * 100, 50, 1e-9) && q.answer.value === 50 || 'co2');
add('case-co2', mk.case({
  passage: r`The table gives the carbon dioxide concentration in the air, measured at a mountain observatory in Hawaii. The values are rounded and approximate.

| Year | Carbon dioxide (ppm) |
|---|---|
| 1960 | 317 |
| 1980 | 339 |
| 2000 | 370 |
| 2020 | 414 |`,
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'During which 20-year period did the concentration rise by the most?',
      right: '2000 to 2020',
      wrong: ['1960 to 1980', '1980 to 2000', 'All three periods had the same rise'],
      sol: 'The rises are 22 ppm (1960 to 1980), 31 ppm (1980 to 2000) and 44 ppm (2000 to 2020). The last period has the biggest rise — option (@K).',
      d: 2, c: 'application', t: [4],
    })),
    part('b', short({
      marks: 1,
      stem: 'Find the total rise in carbon dioxide from 1960 to 2020.',
      model: 'The rise is 97 ppm, because 414 minus 317 is 97.',
      sol: '414 − 317 = 97 ppm.',
      scheme: [['97 ppm', 1]],
      d: 1, c: 'application', t: [4],
    }), []),
    part('c', short({
      marks: 2,
      stem: 'State two human activities that explain this trend and say how they change the carbon cycle.',
      model: 'Burning coal, oil and gas releases carbon that was stored underground for millions of years. Cutting and burning forests releases stored carbon and reduces photosynthesis, so less carbon dioxide is removed from the air.',
      sol: 'Fossil fuel burning; deforestation.',
      scheme: [['Burning fossil fuels releases long-stored carbon', 1], ['Deforestation releases carbon and reduces uptake by plants', 1]],
      d: 3, c: 'analysis', t: [4],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'A student says: “Because the rise is only about 100 ppm out of a million, it cannot matter.” Evaluate this claim.',
        model: 'The claim is weak. A small amount of a greenhouse gas can absorb a lot of heat, and the rise of 97 ppm is a large increase of the carbon dioxide already in the air, nearly one third over 1960. So it does matter for climate.',
        sol: 'Small amounts can still strengthen the greenhouse effect.',
        scheme: [['Rejects the claim: a small amount of greenhouse gas still absorbs much heat', 1], ['Uses the table: a rise of 97 ppm on 317 is about 30 percent', 1]],
        d: 4, c: 'evaluation', t: [4],
      }),
    ]),
  ],
}), null);
