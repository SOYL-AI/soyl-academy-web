// ICSE 9 Biology ch08 notes and flashcards.
import { T, unit, PROV } from '../../icse-9-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Economic Importance of Bacteria and Fungi — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Useful bacteria in medicine: antibiotics, serums and vaccines',
      `Most bacteria are harmless and many are useful. In medicine:

| Product | What it is | How it protects | Example |
|---|---|---|---|
| **Antibiotic** | A chemical made by a microbe that **kills or stops the growth** of other microbes | Attacks disease-causing bacteria | **Streptomycin**, made by the bacterium **Streptomyces** |
| **Vaccine** | **Weakened or killed germs**, or their harmless products | The body makes its **own antibodies** and remembers the germ: **long-lasting** protection | Vaccines against typhoid, tetanus |
| **Serum** | Liquid from the blood of an **immunised animal** (for example a horse), rich in **ready-made antibodies** | **Immediate** but **short-lived** protection | Anti-snake-venom serum, anti-tetanus serum |

A vaccine is given **before** infection to prevent a disease; a serum is given **after** a bite or infection when quick help is needed.`,
      [kt('Antibiotic', 'A chemical produced by a microbe that kills or stops the growth of other microbes.'), kt('Vaccine', 'A preparation of weakened or killed germs that makes the body produce antibodies.'), kt('Serum', 'Blood liquid of an immunised animal containing ready-made antibodies.')],
      null,
      [1],
    ),
    sec(
      '2. Bacteria in agriculture: the nitrogen cycle',
      `Air is about **78 percent nitrogen** by volume, but plants **cannot use nitrogen gas**. They take up **nitrates** from the soil and use them to make proteins. Bacteria move nitrogen round in a **cycle**:

1. **Nitrogen fixation:** nitrogen gas to nitrogen compounds (ammonia) by **nitrogen-fixing bacteria**: **Rhizobium** (in the **root nodules** of pulse plants such as gram, pea and groundnut) and **Azotobacter**, **Clostridium** (free in the soil). Lightning also makes some nitrates (not bacteria).
2. **Nitrification:** ammonia to nitrites by **Nitrosomonas**, then nitrites to **nitrates** by **Nitrobacter**.
3. **Absorption:** plants take up nitrates and make proteins; animals eat the plants.
4. **Decay (ammonification):** **decay bacteria** break down proteins in dead remains and wastes and release **ammonia**.
5. **Denitrification:** **Pseudomonas** (and similar bacteria) change nitrates back to **nitrogen gas**, which returns to the air.

Growing a pulse crop makes the soil richer in nitrogen compounds; denitrification is often faster in waterlogged soil and lowers fertility.

**Diagram:** draw the cycle with the air, the soil (ammonia, nitrates), plants and animals, dead remains, and the arrows labelled with the process and the bacteria.`,
      [kt('Nitrogen fixation', 'Conversion of nitrogen gas into nitrogen compounds by bacteria.'), kt('Nitrification', 'Conversion of ammonia to nitrites and then nitrates by nitrifying bacteria.'), kt('Denitrification', 'Conversion of nitrates back to nitrogen gas by denitrifying bacteria.'), kt('Root nodule', 'A swelling on the root of a pulse plant that houses Rhizobium bacteria.')],
      V.ncycle,
      [2],
      [V.root],
    ),
    sec(
      '3. Bacteria in industry: curing of tea and tanning of leather',
      `- **Curing tea:** tea leaves are dried, rolled and kept for some time. **Bacteria** act on the leaves and help to give the tea its **flavour and aroma**.
- **Tanning leather:** animal hides are soaked in vats. **Bacteria** act on the hides, **loosening the hair and fat** and helping to make the hide **soft and flexible**. Chemical tanning then makes it into leather.`,
      [kt('Curing', 'Treating tea leaves, with the help of bacteria, to develop flavour and aroma.'), kt('Tanning', 'Converting animal hides into leather; bacteria help to soften the hide and loosen hair.')],
      null,
      [3],
    ),
    sec(
      '4. Harmful bacteria: food spoilage, diseases, bio-weapons',
      `| Harm | Example |
|---|---|
| **Food spoilage** | Cooked rice, milk and meat turn sour or smelly; some bacteria cause **food poisoning** |
| **Diseases of plants** | Citrus canker of lemon and orange |
| **Diseases of humans and animals** | Cholera, typhoid, tuberculosis, tetanus, anthrax |
| **Bio-weapons** | Spores of the anthrax bacterium have been misused as a weapon; such weapons are banned |

Bacteria multiply fast by dividing: in warm food they may **double every 20 to 30 minutes**.

**Preventing food spoilage:** **refrigeration** (cold slows growth); **boiling or pasteurisation** (heat kills); **canning** (heat and sealing); **salting**, **adding sugar or vinegar** (draw out water or make the food too sour); **drying** (no water). Cleanliness in the kitchen also helps.`,
      [kt('Food spoilage', 'Change in food caused by microbes that makes it unfit to eat.'), kt('Pasteurisation', 'Heating milk to a fixed temperature for a short time to kill bacteria.'), kt('Bio-weapon', 'Disease-causing microbes misused as a weapon.')],
      V.spoil,
      [4],
    ),
    sec(
      '5. Useful fungi: breweries, bakeries, cheese and mushrooms',
      `- **Yeast** is a **single-celled fungus** that multiplies by **budding**. It breaks down sugar **without oxygen** (fermentation): glucose gives **alcohol** and **carbon dioxide**.
  - **Bakery:** the **carbon dioxide** makes bubbles in the dough, which **rises**; the alcohol evaporates during baking.
  - **Brewery:** yeast turns the sugar of grain or grape juice into **alcohol** (beer, wine).
- **Cheese:** **moulds** growing in the curd **ripen** it and give blue cheese and other cheeses their **flavour and texture**.
- **Edible mushrooms** are **fungi** (no chlorophyll). They are grown on compost in trays and are rich in **protein** and low in fat. Some wild mushrooms are **poisonous**.

The industrial manufacture of products with fungi is **not** part of this course.`,
      [kt('Yeast', 'A single-celled fungus used in baking and brewing.'), kt('Fermentation', 'Breakdown of sugar by yeast without oxygen, giving alcohol and carbon dioxide.'), kt('Mycelium', 'The network of thread-like hyphae of a fungus.')],
      V.yeast,
      [5],
      [V.mushroom],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Mixing up a **vaccine** (own antibodies, long-lasting) and a **serum** (ready-made antibodies, quick and short-lived).
- Writing "nitrogen fixation" without naming the **bacteria** or the **root nodules**.
- Saying that **nitrifying** bacteria return nitrogen to the air; that is **denitrification**.
- Writing oxygen for the gas that makes dough rise: it is **carbon dioxide**.
- Calling a mushroom a plant: it is a **fungus**.
- Giving a method of food preservation without the **reason**.

**How marks are usually awarded**
- 1 mark: a term, an odd one out **with its category**, a reason.
- 2 marks: two differences or two uses matched point for point.
- 3 marks: a neat flow chart or labelled diagram, or three points with reasons.
- 10-mark structured question: a short situation with parts of 2 to 4 marks; one part is usually a labelled diagram or flow chart.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Antibiotic?', 'A chemical made by a microbe that kills or stops other microbes.', 'definition', 1),
    fc(2, 'An antibiotic made by bacteria?', 'Streptomycin, from Streptomyces.', 'fact', 1),
    fc(3, 'Vaccine?', 'Weakened or killed germs that make the body produce antibodies.', 'definition', 1),
    fc(4, 'Serum?', 'Blood liquid of an immunised animal with ready-made antibodies.', 'definition', 1),
    fc(5, 'Which protects for longer: vaccine or serum?', 'Vaccine.', 'exam-tip', 1),
    fc(6, 'When is a serum used?', 'For quick help, as after a snake bite.', 'concept', 1),
    fc(7, 'Percentage of nitrogen in air?', 'About 78 percent.', 'fact', 2),
    fc(8, 'Why can plants not use nitrogen gas?', 'They can take up only nitrogen compounds, such as nitrates.', 'concept', 2),
    fc(9, 'Nitrogen fixation?', 'Nitrogen gas to nitrogen compounds, by bacteria.', 'definition', 2),
    fc(10, 'Symbiotic nitrogen-fixing bacteria?', 'Rhizobium, in root nodules of pulse plants.', 'fact', 2),
    fc(11, 'Free-living nitrogen-fixing bacteria?', 'Azotobacter and Clostridium.', 'fact', 2),
    fc(12, 'Nitrification?', 'Ammonia to nitrites to nitrates.', 'definition', 2),
    fc(13, 'Nitrifying bacteria?', 'Nitrosomonas, then Nitrobacter.', 'fact', 2),
    fc(14, 'Denitrification?', 'Nitrates back to nitrogen gas, by Pseudomonas.', 'definition', 2),
    fc(15, 'What do decay bacteria release?', 'Ammonia, from dead remains and wastes.', 'fact', 2),
    fc(16, 'Why grow pulses in rotation with cereals?', 'Rhizobium enriches the soil with nitrogen compounds.', 'concept', 2),
    fc(17, 'Role of bacteria in curing tea?', 'Give the leaves flavour and aroma.', 'fact', 3),
    fc(18, 'Role of bacteria in tanning?', 'Loosen hair and fat; soften the hide.', 'fact', 3),
    fc(19, 'Three kinds of harm done by bacteria?', 'Food spoilage; diseases; bio-weapons.', 'fact', 4),
    fc(20, 'A plant disease caused by bacteria?', 'Citrus canker.', 'fact', 4),
    fc(21, 'Human diseases caused by bacteria?', 'Cholera, typhoid, tuberculosis, tetanus, anthrax.', 'fact', 4),
    fc(22, 'How does refrigeration prevent spoilage?', 'Cold slows the growth of bacteria.', 'concept', 4),
    fc(23, 'How do salt and sugar preserve food?', 'They draw water out of bacteria.', 'concept', 4),
    fc(24, 'Why does boiling make milk safe?', 'Heat kills the bacteria.', 'concept', 4),
    fc(25, 'Yeast is a ...?', 'Single-celled fungus that multiplies by budding.', 'definition', 5),
    fc(26, 'Gas that makes dough rise?', 'Carbon dioxide.', 'fact', 5),
    fc(27, 'What does yeast make in a brewery?', 'Alcohol and carbon dioxide from sugar.', 'fact', 5),
    fc(28, 'What ripens blue cheese?', 'Moulds growing in the curd.', 'fact', 5),
    fc(29, 'Why is a mushroom not a plant?', 'It is a fungus: no chlorophyll.', 'concept', 5),
    fc(30, 'Nutritional value of edible mushrooms?', 'Rich in protein, low in fat.', 'fact', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
