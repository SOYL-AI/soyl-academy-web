// ICSE 10 Geography ch09 Water Resources — notes and flashcards.
import { T, table, unit, PROV } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Water Resources — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Surface water and groundwater',
      `- **Surface water:** rivers, lakes, ponds, tanks, reservoirs; fed by rain and (in the north) snowmelt.
- **Groundwater:** water that has soaked into the ground and fills pores and cracks below the **water table**, in **aquifers**; reached by wells and tube wells; recharged by rain and seepage from rivers and canals.
- **Northern plains:** perennial snow-fed rivers; porous alluvium with plentiful, shallow groundwater.
- **Peninsula:** seasonal rain-fed rivers; hard crystalline rock with limited groundwater; tanks.`,
      [kt('Water table', 'The upper level of the saturated zone below the ground, under which rocks are full of water.'), kt('Aquifer', 'A layer of porous rock or sediment that holds and yields groundwater.')],
      [],
      table(['Surface water', 'Groundwater'], [['Rivers, lakes, tanks', 'Below the water table'], ['Seen on the surface', 'Reached by wells'], ['Loses water by evaporation', 'Little evaporation']], 'Table contrasting surface water and groundwater'),
      [1],
    ),
    sec(
      '2. Need for water conservation',
      `- Rain is **seasonal** (three to four monsoon months) and **uneven** across regions.
- **Rising demand:** population, irrigation, industry, cities.
- **Over-use of groundwater:** water tables falling in parts of Punjab, Haryana, western Uttar Pradesh, Rajasthan and Tamil Nadu.
- **Pollution** of rivers and lakes by sewage, industrial waste and farm chemicals.
- **Recurring droughts** when the monsoon fails.
- **Ways to conserve:** rainwater harvesting, efficient irrigation (drip, sprinkler), less thirsty crops, recycling waste water, fixing leaks, protecting lakes and rivers from pollution.`,
      [kt('Water conservation', 'Using water carefully and protecting its sources so that enough clean water remains for the future.')],
      [],
      table(['Cause of scarcity', 'Remedy'], [['Over-pumping', 'Recharge pits, drip irrigation'], ['Pollution', 'Treat sewage and waste'], ['Seasonal rain', 'Store and harvest rain']], 'Table of causes of water scarcity and remedies'),
      [1],
    ),
    sec(
      '3. Rainwater harvesting',
      `- **Meaning:** collecting and storing rain where it falls, for use or to recharge groundwater.
- **Rooftop harvesting:** roof → gutter → down pipe → first-flush device → filter (sand, gravel) → storage tank → overflow to a recharge pit or well → aquifer.
- **Other methods:** recharge pits and trenches, check dams, percolation tanks, farm ponds, reviving village tanks.
- **Importance:** raises the water table; water in the dry season; less street flooding in cities; less soil erosion; better groundwater quality (dilutes fluoride and salts); cheap; people's participation.
- **Harvest (litres)** = roof area (m²) × rainfall (mm) × runoff coefficient.`,
      [kt('Rainwater harvesting', 'Collecting and storing rainwater for use or for recharging groundwater.'), kt('Recharge pit', 'A pit filled with gravel and sand through which harvested water soaks down to the groundwater.'), kt('Runoff coefficient', 'The fraction of rain falling on a surface that can actually be collected.')],
      [],
      table(['Step', 'Part'], [['Collect', 'Roof, gutter, down pipe'], ['Clean', 'First-flush, filter'], ['Store', 'Tank'], ['Recharge', 'Pit or old well']], 'Table of the stages of rooftop harvesting'),
      [2],
    ),
    sec(
      '4. Irrigation: need, wells and tube wells',
      `- **Need:** seasonal, uncertain and uneven rain; dry rabi season; thirsty crops (rice, sugarcane); multiple cropping; high-yielding seeds; porous soils.
- **Wells:** dug to the water table; water lifted by hand, Persian wheel or pump; cheap, owned by farmers; small areas.
- **Tube wells:** deep bores with electric or diesel pumps; large supplies.
- Wells and tube wells are the **leading source of irrigation** (as of the early 2020s): Punjab, Haryana, Uttar Pradesh, Bihar, Gujarat.
- **Why tube wells in the northern plains:** soft alluvium easy to bore; plentiful recharged groundwater; electricity; flat land; high demand.`,
      [kt('Irrigation', 'The artificial supply of water to crops.'), kt('Tube well', 'A deep, narrow bore into an aquifer from which water is lifted by a power-driven pump.')],
      [],
      table(['Feature', 'Well', 'Tube well'], [['Depth', 'Shallow', 'Deep'], ['Lifting', 'Hand, animal, small pump', 'Electric or diesel pump'], ['Area watered', 'Small', 'Larger']], 'Table comparing wells and tube wells'),
      [3],
    ),
    sec(
      '5. Tank irrigation',
      `- **Tank:** natural or man-made depression (often an earth embankment across a stream) that stores rainwater.
- **Where:** Tamil Nadu, Karnataka, Telangana, Andhra Pradesh.
- **Why in the peninsula:** hard impervious rock (little groundwater); seasonal rain-fed rivers; undulating land with natural hollows; rain concentrated in a short season; small scattered fields.
- **Drawbacks:** dry up in droughts; silting; evaporation loss; occupy fertile land; small command area.`,
      [kt('Tank', 'A small reservoir, natural or made by an embankment, that stores rainwater for irrigation.')],
      [],
      table(['Advantage', 'Drawback'], [['Cheap, local', 'Dries up in droughts'], ['Stores monsoon rain', 'Silting, evaporation']], 'Table of advantages and drawbacks of tanks'),
      [3],
    ),
    sec(
      '6. Canals and modern irrigation',
      `- **Inundation canals:** from a river without a barrage; water only in floods (rainy season); unreliable.
- **Perennial canals:** from a barrage, weir or dam; water all year; northern plains (Punjab, Haryana, Uttar Pradesh) and southern deltas.
- **Examples:** Indira Gandhi Canal, Upper Ganga Canal, Western Yamuna Canal, Sirhind Canal.
- **Disadvantages:** waterlogging; salinity and alkalinity (reh, kallar); mosquitoes and malaria; seepage and evaporation losses; costly; only on flat land; tail-end farms short of water.
- **Drip irrigation:** water drop by drop at the roots through pipes and emitters; least waste; orchards, sugarcane, vegetables in dry areas.
- **Sprinkler irrigation:** water sprayed like rain; uneven land, sandy soils; wheat, pulses, vegetables, tea.`,
      [kt('Perennial canal', 'A canal taken from a river at a barrage or dam, which flows throughout the year.'), kt('Inundation canal', 'A canal taken from a river without a barrage, which carries water only when the river is in flood.'), kt('Drip irrigation', 'Supplying water drop by drop directly to the root zone of plants through pipes and emitters.')],
      [],
      table(['Head', 'Perennial', 'Inundation'], [['Headworks', 'Barrage, weir or dam', 'None'], ['Flow', 'All year', 'Only in floods'], ['Reliability', 'High', 'Low']], 'Table comparing perennial and inundation canals'),
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Calling water in a reservoir "groundwater".
- Saying inundation canals flow all year.
- Placing tank irrigation in Punjab instead of the southern plateau.
- Leaving out the runoff coefficient in harvest calculations.

**How marks are usually awarded**
- Reasons (1 mark each): the geographical factor and how it acts, with a named region.
- Canal comparison: headworks, period of flow, reliability.
- Harvest sums: rule, substitution, answer with unit.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Surface water?', 'Water in rivers, lakes, ponds, tanks, reservoirs.', 'definition', 1),
    fc(2, 'Groundwater?', 'Water below the water table in aquifers.', 'definition', 1),
    fc(3, 'Aquifer?', 'Porous rock layer that holds groundwater.', 'definition', 1),
    fc(4, 'Why plentiful groundwater in the northern plains?', 'Porous alluvium recharged by rain and rivers.', 'concept', 1),
    fc(5, 'Why little groundwater in the peninsula?', 'Hard, impervious crystalline rock.', 'concept', 1),
    fc(6, 'Two reasons to conserve water?', 'Seasonal rain; falling water tables.', 'fact', 1),
    fc(7, 'Rainwater harvesting?', 'Collecting rain for use or recharge.', 'definition', 2),
    fc(8, 'Order of a rooftop system?', 'Roof, gutter, first-flush, filter, tank, recharge pit.', 'diagram', 2),
    fc(9, 'Harvest formula?', 'Area (m²) × rain (mm) × runoff coefficient = litres.', 'formula', 2),
    fc(10, '1 mm of rain on 1 m² gives?', 'About 1 litre.', 'fact', 2),
    fc(11, 'Purpose of a first-flush device?', 'Discards the dirty first rain.', 'concept', 2),
    fc(12, 'How does harvesting help cities?', 'Recharges wells; reduces street flooding.', 'concept', 2),
    fc(13, 'Irrigation?', 'Artificial supply of water to crops.', 'definition', 3),
    fc(14, 'Two reasons India needs irrigation?', 'Seasonal and uncertain monsoon.', 'fact', 3),
    fc(15, 'Leading source of irrigation?', 'Wells and tube wells (as of the early 2020s).', 'fact', 3),
    fc(16, 'Tube well?', 'Deep bore with a powered pump.', 'definition', 3),
    fc(17, 'Why tube wells in Haryana?', 'Soft alluvium, plentiful groundwater, electricity.', 'concept', 3),
    fc(18, 'States with tank irrigation?', 'Tamil Nadu, Karnataka, Telangana.', 'fact', 3),
    fc(19, 'Why tanks in the south?', 'Hard rock, seasonal rivers, natural hollows.', 'concept', 3),
    fc(20, 'Two drawbacks of tanks?', 'Dry up; silt up.', 'fact', 3),
    fc(21, 'Perennial canal?', 'From a barrage; flows all year.', 'definition', 4),
    fc(22, 'Inundation canal?', 'No barrage; flows only in floods.', 'definition', 4),
    fc(23, 'Canal in Rajasthan?', 'Indira Gandhi Canal.', 'example', 4),
    fc(24, 'Waterlogging?', 'Water table rises to the surface.', 'definition', 4),
    fc(25, 'Reh or kallar?', 'Salty crust on canal-irrigated land.', 'definition', 4),
    fc(26, 'Two disadvantages of canals?', 'Waterlogging; salinity.', 'fact', 4),
    fc(27, 'Drip irrigation?', 'Water drop by drop at the roots.', 'definition', 4),
    fc(28, 'Sprinkler irrigation?', 'Water sprayed like rain.', 'definition', 4),
    fc(29, 'Why does drip save water?', 'Little evaporation or runoff; only roots wetted.', 'concept', 4),
    fc(30, 'Water applied?', 'Crop need ÷ efficiency.', 'formula', 4),
    fc(31, 'Exam tip: tanks versus tube wells', 'Compare rock, groundwater, rivers, relief.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
