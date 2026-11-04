// ICSE 9 Biology ch12 notes and flashcards.
import { T, unit, PROV } from '../../icse-9-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'The Skin — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Structure and functions of the skin',
      `The skin is the largest organ of the body. A vertical section shows two layers over a fat layer.

**Epidermis** (outer layer, no blood vessels)
- **Horny layer** (outermost): dead, flat cells filled with **keratin**; waterproof; protects against germs and wear; the cells rub off and are replaced.
- **Malpighian layer** (innermost): living cells that keep **dividing** to replace the horny layer; contains **melanin**, the dark pigment that shields the body from the harmful rays of sunlight and gives the skin its colour.

**Dermis** (inner, thick layer of connective tissue) contains **blood vessels**, **nerve endings** (touch, pain, pressure, heat and cold), **sweat glands**, **sebaceous glands**, **hair follicles** with their **erector muscles**, and, at its lower edge, **fat cells** that form a fat layer (subcutaneous fat) which stores fat and insulates.

**Functions of the skin**
1. **Protection** from germs, water loss, injury and sunlight.
2. **Sense organ**: touch, pain, pressure, heat and cold.
3. **Temperature control** (sweating and changes in blood vessels).
4. **Excretion**: sweat removes water, salts and a little urea.
5. **Vitamin D**: sunlight on the skin helps to make vitamin D.
6. **Storage and insulation**: fat in the fat layer.

Books vary in whether the fat layer is called part of the dermis or a separate layer (hypodermis), and in how many sub-layers of the epidermis they name; this chapter names the horny and Malpighian layers.`,
      [kt('Epidermis', 'The outer layer of the skin, made of the horny layer and the Malpighian layer.'), kt('Dermis', 'The thick inner layer of the skin with blood vessels, nerves and glands.'), kt('Keratin', 'The tough protein in the horny layer, hair and nails.'), kt('Melanin', 'The dark pigment made in the Malpighian layer that shields the skin from sunlight.')],
      V.skin,
      [1],
    ),
    sec(
      '2. Derivatives of the skin',
      `**Derivatives** are structures that grow out of the skin.

| Derivative | Description | Function |
|---|---|---|
| **Sweat glands** | Coiled tubes in the dermis opening by pores | Make **sweat** (water, salts, a little urea); cool the body; excretion |
| **Sebaceous glands** | Small glands opening into hair follicles | Make **sebum**, an oil that keeps skin and hair soft and waterproof |
| **Hair** | Keratin shaft growing from a follicle | Protects, traps warm air, senses touch |
| **Nails** | Keratin plates on the fingers and toes | Protect the tips; help in picking up small objects |
| **Mammary glands** | Glands in the breast of a female | Make **milk** to feed the baby |

The visible shaft of a hair and the nail plate are dead; they grow from a living root, so cutting them does not hurt. The mammary glands are modified sweat glands in structure. The **erector muscle** attached to a hair follicle pulls the hair upright.`,
      [kt('Sweat', 'The watery liquid made by sweat glands, with salts and a little urea.'), kt('Sebum', 'The oily secretion of the sebaceous glands.'), kt('Hair follicle', 'The pit in the dermis from which a hair grows.'), kt('Mammary gland', 'The gland that makes milk.')],
      null,
      [2],
    ),
    sec(
      '3. Heat regulation: vasodilation and vasoconstriction',
      `The temperature inside the body is kept at about **37 degrees Celsius** (about 98.6 degrees Fahrenheit), the temperature at which enzymes work best. The brain monitors it and the skin responds.

| | **Hot day** | **Cold day** |
|---|---|---|
| Skin blood vessels | **Widen** (**vasodilation**) | **Narrow** (**vasoconstriction**) |
| Blood near the surface | More | Less |
| Heat loss (radiation, contact) | More | Less |
| Sweating | Much; sweat **evaporates** and takes heat from the skin | Little |
| Hairs | Lie flat | Erector muscles pull them up; they trap air, a poor conductor of heat |
| Appearance | Skin red and warm | Skin pale and cold |
| Other | Heat loss by radiation | **Shivering** releases heat from muscles |

Heat is gained from respiration, exercise and a warm environment. Evaporation of 1 mL of sweat takes away about 2.4 kilojoules of heat (a commonly quoted value). In humans the erector muscles raise only small hairs, so this response is weak compared with that of furry mammals.`,
      [kt('Vasodilation', 'Widening of the blood vessels of the skin, so that more heat is lost.'), kt('Vasoconstriction', 'Narrowing of the blood vessels of the skin, so that less heat is lost.'), kt('Evaporation', 'The change of sweat into vapour, which takes heat from the skin.')],
      V.climate,
      [3],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Swapping **vasodilation** and **vasoconstriction**, or the hot and cold days.
- Placing the **sweat glands in the epidermis**; they lie in the **dermis**.
- Saying the **horny layer is living**, or leaving out **keratin**.
- Writing that sweating cools the body, without saying that sweat **evaporates** and takes heat.
- Forgetting **melanin** in the Malpighian layer.

**How marks are usually awarded**
- 1 mark: a term, an odd one out **with its category**, a give-reason item.
- 2 marks: two functions or two points, matched.
- 3 marks: a three-row comparison (hot day and cold day) or three functions.
- 10-mark structured question: a short situation or diagram with parts of 2 to 4 marks; one part is a labelled diagram.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Two layers of the skin?', 'Epidermis (outer) and dermis (inner).', 'fact', 1),
    fc(2, 'Outermost layer of the epidermis?', 'The horny layer: dead cells with keratin.', 'fact', 1),
    fc(3, 'Inner layer of the epidermis?', 'The Malpighian layer: living cells that divide.', 'fact', 1),
    fc(4, 'What is melanin?', 'The dark pigment in the Malpighian layer that shields from sunlight.', 'definition', 1),
    fc(5, 'What is keratin?', 'A tough protein in the horny layer, hair and nails.', 'definition', 1),
    fc(6, 'Does the epidermis have blood vessels?', 'No.', 'fact', 1),
    fc(7, 'What does the dermis contain?', 'Blood vessels, nerve endings, glands, hair follicles, erector muscles.', 'fact', 1),
    fc(8, 'What does the fat layer do?', 'Stores fat and insulates the body.', 'fact', 1),
    fc(9, 'Name six functions of the skin.', 'Protection, sense organ, temperature control, excretion, vitamin D, storage and insulation.', 'fact', 1),
    fc(10, 'Which vitamin does sunlight help the skin to make?', 'Vitamin D.', 'fact', 1),
    fc(11, 'What does sweat contain?', 'Water, salts and a little urea.', 'fact', 2),
    fc(12, 'Function of sweat glands?', 'Make sweat, which cools the body and removes wastes.', 'fact', 2),
    fc(13, 'What is sebum and who makes it?', 'An oil made by the sebaceous glands.', 'definition', 2),
    fc(14, 'Function of sebum?', 'Keeps skin and hair soft and waterproof.', 'fact', 2),
    fc(15, 'Function of hair?', 'Protects, traps warm air, senses touch.', 'fact', 2),
    fc(16, 'Function of nails?', 'Protect the tips of fingers and toes.', 'fact', 2),
    fc(17, 'Function of mammary glands?', 'Make milk to feed the baby.', 'fact', 2),
    fc(18, 'What is the erector muscle for?', 'It pulls a hair upright.', 'fact', 2),
    fc(19, 'Why does cutting hair or nails not hurt?', 'The shaft and the nail plate are dead; the living root is below the skin.', 'concept', 2),
    fc(20, 'Where are sweat glands?', 'In the dermis; they open by pores on the surface.', 'fact', 2),
    fc(21, 'Normal body temperature?', 'About 37 degrees Celsius.', 'fact', 3),
    fc(22, 'Why must body temperature be steady?', 'Enzymes work best at this temperature.', 'concept', 3),
    fc(23, 'Vasodilation?', 'Widening of the blood vessels of the skin; more heat is lost.', 'definition', 3),
    fc(24, 'Vasoconstriction?', 'Narrowing of the blood vessels of the skin; less heat is lost.', 'definition', 3),
    fc(25, 'Which of vasodilation and vasoconstriction happens on a hot day?', 'Vasodilation.', 'fact', 3),
    fc(26, 'How does sweating cool the body?', 'Sweat evaporates and takes heat from the skin.', 'concept', 3),
    fc(27, 'Why does the skin look red on a hot day?', 'More blood flows near the surface.', 'concept', 3),
    fc(28, 'Why does the skin look pale on a cold day?', 'Less blood flows near the surface.', 'concept', 3),
    fc(29, 'Why do hairs stand up in the cold?', 'They trap a layer of air, a poor conductor of heat.', 'concept', 3),
    fc(30, 'What does shivering do?', 'Muscles contract rapidly and release heat.', 'fact', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
