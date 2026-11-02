// ICSE 10 Geography ch18 Waste Management — notes and flashcards.
import { T, table, unit, PROV } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Waste Management — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Impact of waste accumulation',
      `- **Spoilage of landscape:** roadside heaps; giant dumps such as Ghazipur (Delhi) and Deonar (Mumbai); littered riverbanks and beaches.
- **Pollution:** leachate pollutes groundwater and streams; plastic clogs drains and worsens floods; burning garbage and methane fires pollute air; plastics and chemicals poison soil.
- **Health hazards:** flies, mosquitoes and rats spread cholera, typhoid, dengue and malaria; smoke causes breathing problems; waste pickers face injury and infection; cattle eat plastic.`,
      [kt('Leachate', 'The polluted liquid formed when rainwater seeps through waste.')],
      [],
      table(['Effect', 'Example'], [['Landscape', 'Garbage hills on city edges'], ['Pollution', 'Leachate in wells; clogged drains'], ['Health', 'Mosquito-borne and water-borne disease']], 'Table of three effects of waste accumulation with examples'),
      [1],
    ),
    sec(
      '2. Need for waste management',
      `- Urban population, incomes and packaging are rising, so waste is increasing.
- Land for dumps near cities is scarce and costly.
- Protects public health and prevents epidemics.
- Protects water, soil and air.
- Recovers resources (compost, paper, metals, plastics) and creates jobs.
- Swachh Bharat Mission (2014) and the Solid Waste Management Rules, 2016 require segregation at source (as of the early 2020s).`,
      [kt('Municipal solid waste', 'The everyday solid waste collected from homes, shops, offices and streets of a town.')],
      [],
      table(['Reason', 'Key word'], [['More waste', 'Urban growth'], ['Health', 'Epidemics'], ['Resources', 'Recycling, compost']], 'Table of three reasons for waste management'),
      [2],
    ),
    sec(
      '3. Key environmental terms',
      `| Term | Meaning | One cause | One effect |
|---|---|---|---|
| Global warming | Rise in Earth’s average temperature as greenhouse gases trap heat | Burning fossil fuels; methane from landfills | Melting glaciers; rising sea level |
| Acid rain | Rain made acidic by sulphur and nitrogen oxides | Smoke from power stations, factories, vehicles | Corrodes marble monuments; kills fish in lakes |
| Eutrophication | Over-enrichment of water with nutrients | Fertiliser run-off, sewage, detergents | Algal bloom; oxygen loss; fish die |
| Biomagnification | Rise in concentration of persistent poisons up a food chain | DDT, mercury in water | Thin eggshells in birds of prey; poisoning |
| Thermal pollution | Harmful heating of water bodies | Hot water from power stations, industries | Less dissolved oxygen; fish die |`,
      [kt('Greenhouse gas', 'A gas such as carbon dioxide or methane that traps heat in the atmosphere.'), kt('Algal bloom', 'A rapid, dense growth of algae in nutrient-rich water.')],
      [],
      table(['Term', 'Key substance'], [['Acid rain', 'Sulphur dioxide'], ['Eutrophication', 'Phosphates, nitrates'], ['Biomagnification', 'DDT, mercury']], 'Table of three terms and the substances involved'),
      [3],
    ),
    sec(
      '4. Segregation and dumping',
      `- **Segregation at source:** wet (biodegradable) — green bin; dry (paper, plastic, glass, metal) — blue bin; domestic hazardous (batteries, bulbs, medicines, paint) — separate.
- **Why first:** enables composting and recycling; isolates hazardous items; reduces landfill; protects waste workers; cheaper handling.
- **Open dumping:** cheap but causes leachate, methane fires, smell, flies, rats; wastes land.
- **Sanitary landfill:** clay and plastic liner; leachate collection and treatment; daily soil cover; gas vents; final clay cap with soil and grass; only inert rejects should go there.`,
      [kt('Segregation at source', 'Separating waste into wet, dry and hazardous kinds where it is produced.'), kt('Sanitary landfill', 'An engineered, lined and covered site for the safe burial of waste that cannot be recovered.')],
      [],
      table(['Bin', 'Contents'], [['Green', 'Wet, biodegradable'], ['Blue', 'Dry, recyclable'], ['Separate', 'Domestic hazardous']], 'Table of bins and what goes in each'),
      [4],
    ),
    sec(
      '5. Composting',
      `- **Composting:** aerobic decomposition of biodegradable waste by microbes into humus-rich manure; pit or bin; layers of kitchen waste, dry leaves and soil; kept moist and turned; ready in about six to eight weeks.
- **Vermicomposting:** earthworms eat the waste and produce nutrient-rich castings.
- **Landfill vs composting:** landfill uses large land for decades, produces methane and leachate, gives no product; composting needs little land, produces little methane, gives manure, but needs segregated waste and care.`,
      [kt('Composting', 'Turning biodegradable waste into manure by the action of microbes in the presence of air.'), kt('Vermicomposting', 'Composting with the help of earthworms.')],
      [],
      table(['Feature', 'Landfill', 'Compost'], [['Land', 'Large', 'Small'], ['Methane', 'Much', 'Little'], ['Product', 'None', 'Manure']], 'Table comparing landfill and composting'),
      [4],
    ),
    sec(
      '6. Reduce, reuse, recycle',
      `- **Need:** saves resources and energy; less waste to dumps; less pollution; jobs in recycling.
- **Reduce:** cloth bags, refillable bottles, refuse single-use plastic (several items banned from July 2022, as of the early 2020s), avoid food waste.
- **Reuse:** glass jars, both sides of paper, repair, pass on books and uniforms.
- **Recycle:** paper, cardboard, metal, glass, plastic to recyclers or kabadiwala; e-waste to authorised collectors.
- **Good practice:** Indore (segregation, composting), Alappuzha (home composting), Pune (waste-picker cooperative).
- **Share of a waste type** = its weight ÷ total weight × 100.`,
      [kt('Recycling', 'Processing used materials so that they can be made into new products.')],
      [],
      table(['R', 'Example'], [['Reduce', 'Cloth bag'], ['Reuse', 'Glass jar'], ['Recycle', 'Old newspapers to recycler']], 'Table of an example of each R'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Calling composting anaerobic (it needs air; landfills rot without air).
- Saying acid rain is caused by carbon monoxide.
- Writing that eutrophication adds oxygen.
- Putting batteries or medicines into the wet bin.

**How marks are usually awarded**
- Effects (1 mark each): landscape, pollution, health, each with an example.
- Key terms (2 marks): definition plus one cause and one effect.
- Methods (3 marks): segregation, landfill features or composting steps in order.
- 3Rs (1 mark each): practical, distinct examples.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Leachate?', 'Polluted liquid formed when rain seeps through waste.', 'definition', 1),
    fc(2, 'How does plastic worsen urban floods?', 'It clogs drains.', 'concept', 1),
    fc(3, 'Gas released by rotting waste in dumps?', 'Methane.', 'fact', 1),
    fc(4, 'Two diseases spread from garbage heaps?', 'Cholera and dengue (also typhoid, malaria).', 'fact', 1),
    fc(5, 'Two large dumps of Indian cities?', 'Ghazipur (Delhi), Deonar (Mumbai).', 'example', 1),
    fc(6, 'Why is waste management essential?', 'More urban waste, scarce land, health, resources.', 'concept', 2),
    fc(7, 'National mission for cleanliness launched in 2014?', 'Swachh Bharat Mission.', 'fact', 2),
    fc(8, 'Global warming?', 'Rise in Earth’s average temperature due to greenhouse gases.', 'definition', 3),
    fc(9, 'Two greenhouse gases?', 'Carbon dioxide and methane.', 'fact', 3),
    fc(10, 'Cause of acid rain?', 'Sulphur dioxide and nitrogen oxides.', 'fact', 3),
    fc(11, 'Effect of acid rain on monuments?', 'Corrodes and discolours marble.', 'concept', 3),
    fc(12, 'Eutrophication?', 'Over-enrichment of water with nutrients causing algal bloom and oxygen loss.', 'definition', 3),
    fc(13, 'Nutrients causing eutrophication?', 'Nitrates and phosphates.', 'fact', 3),
    fc(14, 'Biomagnification?', 'Rise in concentration of a persistent poison up a food chain.', 'definition', 3),
    fc(15, 'Example of a persistent poison?', 'DDT (also mercury).', 'example', 3),
    fc(16, 'Thermal pollution?', 'Harmful heating of water by hot discharges.', 'definition', 3),
    fc(17, 'Remedy for thermal pollution?', 'Cooling towers or cooling ponds.', 'concept', 3),
    fc(18, 'Segregation at source?', 'Separating wet, dry and hazardous waste where it is produced.', 'definition', 4),
    fc(19, 'Green bin holds?', 'Wet, biodegradable waste.', 'fact', 4),
    fc(20, 'Blue bin holds?', 'Dry waste: paper, plastic, glass, metal.', 'fact', 4),
    fc(21, 'Domestic hazardous waste examples?', 'Batteries, broken bulbs, medicines, paint.', 'example', 4),
    fc(22, 'Why is segregation the first step?', 'Enables composting and recycling; isolates hazards.', 'concept', 4),
    fc(23, 'Two features of a sanitary landfill?', 'Liner; leachate collection (also soil cover, gas vent, cap).', 'diagram', 4),
    fc(24, 'Composting?', 'Aerobic decay of wet waste into manure by microbes.', 'definition', 4),
    fc(25, 'Vermicomposting uses?', 'Earthworms.', 'fact', 4),
    fc(26, 'One advantage of composting over landfill?', 'Gives manure and less methane.', 'concept', 4),
    fc(27, 'Reduce example?', 'Carry a cloth bag.', 'example', 5),
    fc(28, 'Reuse example?', 'Use glass jars again.', 'example', 5),
    fc(29, 'Recycle example?', 'Sell old newspapers to a recycler.', 'example', 5),
    fc(30, 'Share of a waste type?', 'Its weight ÷ total weight × 100.', 'formula', 5),
    fc(31, 'Exam tip: key terms', 'Definition, one cause, one effect.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
