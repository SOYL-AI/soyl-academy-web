// ICSE 9 Biology ch03 notes and flashcards.
import { T, table, unit, PROV } from '../../icse-9-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'The Flower — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Structure of a bisexual flower; complete and incomplete flowers',
      `A **flower** is the reproductive organ of a flowering plant. It stands on a stalk, the **pedicel**, whose swollen tip is the **thalamus** (receptacle). The thalamus carries four **whorls**, from outside to inside:
1. **Calyx**: the sepals (usually green).
2. **Corolla**: the petals (usually coloured).
3. **Androecium**: the stamens (male).
4. **Gynoecium** (pistil): the carpels (female).

A **bisexual flower** has both stamens and pistil (Hibiscus); a **unisexual flower** has only one of them (papaya has male and female flowers on different plants).

| Kind | Meaning | Examples |
|---|---|---|
| **Complete** | All four whorls present | Hibiscus |
| **Incomplete** | One or more whorls missing | Wheat (no showy sepals or petals); male flower of papaya |

A complete flower is always bisexual. A bisexual flower may be incomplete.

**Diagram:** draw the flower in long section: pedicel, thalamus, sepal, petal, stamen (filament, anther), pistil (stigma, style, ovary, ovule).`,
      [kt('Bisexual flower', 'A flower with both stamens and a pistil.'), kt('Complete flower', 'A flower with calyx, corolla, androecium and gynoecium.'), kt('Thalamus', 'The swollen tip of the flower stalk that carries the whorls.'), kt('Pedicel', 'The stalk of a flower.')],
      V.flower,
      [1],
      [V.whorls],
    ),
    sec(
      '2. Essential and non-essential whorls',
      `**Non-essential (accessory) whorls**
- **Calyx (sepals):** green; **protect** the bud; can make food by photosynthesis; support the opened flower.
- **Corolla (petals):** coloured, often scented, with nectar; **attract insects** for pollination; protect the stamens and the pistil.

**Essential whorls** (needed to form seeds)
- **Androecium:** a number of **stamens**. Each stamen has an **anther** (usually two lobes with pollen sacs that make and hold **pollen grains**) and a **filament** that holds the anther.
- **Gynoecium (pistil):** one or more **carpels**; each has a **stigma** (sticky top that **receives pollen**), a **style** (stalk joining stigma and ovary) and an **ovary** (swollen base containing **ovules**, each holding an egg cell). After fertilisation ovules develop into seeds.`,
      [kt('Calyx', 'The outermost whorl of sepals.'), kt('Corolla', 'The whorl of petals.'), kt('Androecium', 'The male whorl, all the stamens.'), kt('Gynoecium', 'The female whorl, the pistil.'), kt('Stigma', 'The sticky part of the pistil that receives pollen.')],
      V.stamenPistil,
      [2],
    ),
    sec(
      '3. Inflorescence and placentation (meaning only)',
      `**Inflorescence** is the arrangement of a group of flowers on a **flowering axis** (the main stalk is the **peduncle**; each flower has its own pedicel). Small flowers grouped in an inflorescence are more conspicuous to insects and wind. The **types of inflorescence** are not required in this course.

**Placentation** is the **arrangement of the ovules on the placenta inside the ovary**. The **placenta** is the cushion of tissue on the ovary wall to which the ovules are attached. The **types of placentation** are not required; the meaning alone is asked.`,
      [kt('Inflorescence', 'A group of flowers borne together on one flowering axis.'), kt('Placenta', 'Tissue of the ovary wall to which the ovules are attached.'), kt('Placentation', 'The arrangement of ovules in the ovary.')],
      V.inflorescence,
      [3],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Mixing up **complete** (all four whorls) and **bisexual** (stamens and pistil together).
- Writing the ovary or the pistil as the whole of the female whorl without naming the **gynoecium**.
- Giving only the colour as the role of petals, without **attracting insects**.
- Drawing the stigma below the ovary, or leaving out the **thalamus** and **pedicel**.
- Writing types of inflorescence or placentation: only the **meaning** is required.

**How marks are usually awarded**
- 1 mark: a term, a part, an odd one out **with its category**.
- 2 marks: two functions or two differences matched point for point.
- 3 marks: a neat, labelled diagram (outline of the parts, key features, correct labels).
- 10-mark structured question: a short situation or diagram with parts of 3, 3 and 4 marks; one part is usually a labelled diagram.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is a flower?', 'The reproductive organ of a flowering plant.', 'definition', 1),
    fc(2, 'Pedicel?', 'The stalk of a flower.', 'definition', 1),
    fc(3, 'Thalamus?', 'Swollen tip of the pedicel; carries the whorls.', 'definition', 1),
    fc(4, 'Four whorls from outside to inside?', 'Calyx, corolla, androecium, gynoecium.', 'exam-tip', 1),
    fc(5, 'Bisexual flower?', 'Has both stamens and a pistil.', 'definition', 1),
    fc(6, 'Unisexual flower?', 'Has only stamens or only a pistil.', 'definition', 1),
    fc(7, 'Complete flower?', 'Has all four whorls.', 'definition', 1),
    fc(8, 'Incomplete flower?', 'Lacks one or more whorls.', 'definition', 1),
    fc(9, 'Example of a complete flower?', 'Hibiscus.', 'fact', 1),
    fc(10, 'Is a complete flower bisexual?', 'Yes, always; but a bisexual flower may be incomplete.', 'exam-tip', 1),
    fc(11, 'Calyx is made of?', 'Sepals.', 'fact', 2),
    fc(12, 'Corolla is made of?', 'Petals.', 'fact', 2),
    fc(13, 'Function of sepals?', 'Protect the bud; photosynthesis.', 'fact', 2),
    fc(14, 'Function of petals?', 'Attract insects; protect stamens and pistil.', 'fact', 2),
    fc(15, 'Non-essential whorls?', 'Calyx and corolla.', 'fact', 2),
    fc(16, 'Essential whorls?', 'Androecium and gynoecium.', 'fact', 2),
    fc(17, 'Androecium?', 'All the stamens: the male whorl.', 'definition', 2),
    fc(18, 'Parts of a stamen?', 'Anther and filament.', 'fact', 2),
    fc(19, 'Function of the anther?', 'Makes and holds pollen grains.', 'fact', 2),
    fc(20, 'Function of the filament?', 'Holds the anther up.', 'fact', 2),
    fc(21, 'Gynoecium?', 'The pistil: the female whorl made of carpels.', 'definition', 2),
    fc(22, 'Parts of a pistil?', 'Stigma, style, ovary.', 'fact', 2),
    fc(23, 'Function of the stigma?', 'Receives pollen; it is sticky.', 'fact', 2),
    fc(24, 'Function of the style?', 'Joins the stigma to the ovary.', 'fact', 2),
    fc(25, 'What does the ovary hold?', 'Ovules.', 'fact', 2),
    fc(26, 'Inflorescence?', 'A group of flowers on one flowering axis.', 'definition', 3),
    fc(27, 'Main stalk of an inflorescence?', 'Peduncle.', 'fact', 3),
    fc(28, 'Why are flowers grouped in an inflorescence?', 'Together they are more conspicuous to pollinators.', 'concept', 3),
    fc(29, 'Placenta?', 'Tissue on the ovary wall to which ovules are attached.', 'definition', 3),
    fc(30, 'Placentation?', 'The arrangement of ovules on the placenta in the ovary.', 'definition', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
