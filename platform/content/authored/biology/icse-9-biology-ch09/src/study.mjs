// ICSE 9 Biology ch09 notes and flashcards.
import { T, unit, PROV } from '../../icse-9-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Nutrition: Food and Balanced Diet — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Classes of food: carbohydrates, fats, proteins and water',
      `| Class | Functions | Common sources |
|---|---|---|
| **Carbohydrates** | Main source of **energy** (about 17 kJ per g) | Rice, wheat, potato, sugar, fruits |
| **Fats** | **Store** of energy (about 37 kJ per g); keep the body **warm** (insulation); **protect** organs; carry **fat-soluble vitamins** | Oil, ghee, butter, nuts |
| **Proteins** | **Growth and repair** of cells; make **enzymes**, hormones and antibodies; can give energy (about 17 kJ per g) | Pulses, milk, eggs, fish, meat |
| **Water** (about 70 percent of the body mass) | **Solvent**; **carries** nutrients, gases and wastes; **cools** the body by sweat; needed for chemical reactions | Drinks, fruits, vegetables |

Energy values are approximate (books also use 4, 4 and 9 kilocalories per gram). **Weight for weight, fat gives a little more than twice the energy of carbohydrate.**`,
      [kt('Nutrient', 'A substance in food that the body needs for energy, growth, repair or protection.'), kt('Carbohydrate', 'The main energy food, such as starch and sugar.'), kt('Protein', 'A body-building food needed for growth and repair.')],
      V.meal,
      [1],
    ),
    sec(
      '2. Mineral salts: calcium, iodine, iron and sodium',
      `| Mineral | Function | Deficiency | Sources |
|---|---|---|---|
| **Calcium** | Builds **bones and teeth**; helps blood **clot**; muscle action | Weak bones and teeth; **rickets** in children (with lack of vitamin D) | Milk, cheese, ragi, green leafy vegetables |
| **Iodine** | Needed to make **thyroxine** in the thyroid gland | **Goitre** (swollen neck) | Iodised salt, sea fish |
| **Iron** | Makes **haemoglobin** of red blood cells | **Anaemia** (pale, tired, weak) | Spinach, jaggery, liver, meat |
| **Sodium** | **Nerve messages**; water balance; muscle action | **Muscle cramps**, weakness (as after heavy sweating) | Common salt |

Minerals are needed in small amounts and are taken from food and water.`,
      [kt('Goitre', 'Swelling of the neck caused by lack of iodine.'), kt('Anaemia', 'A shortage of haemoglobin, usually from lack of iron.'), kt('Haemoglobin', 'The red pigment of red blood cells that carries oxygen.')],
      V.bodymap,
      [2],
    ),
    sec(
      '3. Vitamins: sources, functions and deficiency diseases',
      `| Vitamin | Function | Deficiency disease | Sources |
|---|---|---|---|
| **A** | Healthy eyes and skin | **Night blindness**; dry eyes | Carrot, papaya, milk, liver, fish liver oil |
| **B1** (thiamine) | Releases energy from carbohydrates; healthy nerves | **Beri-beri** | Whole grains, pulses, yeast, unpolished rice |
| **C** | Healthy gums and skin; heals wounds | **Scurvy** (bleeding gums) | Amla, orange, lemon, guava |
| **D** | Helps absorb **calcium and phosphorus** for bones | **Rickets** in children (bow legs) | Sunlight on the skin, egg yolk, fish liver oil |
| **K** | Helps blood to **clot** | Bleeding that is slow to stop | Green vegetables |

**Vitamins A, D, E and K** are **fat-soluble**; **B and C** are **water-soluble**. Vitamin E (protects cells; some books link it to fertility) is not asked in detail. Cooking can destroy vitamin C.`,
      [kt('Vitamin', 'An organic substance needed in tiny amounts to keep the body healthy.'), kt('Fat-soluble vitamin', 'A vitamin that dissolves in fat: A, D, E and K.'), kt('Deficiency disease', 'A disease caused by a long-term lack of a nutrient.')],
      null,
      [3],
    ),
    sec(
      '4. Balanced diet and the role of cellulose (roughage)',
      `A **balanced diet** contains **all the food classes, mineral salts, vitamins, water and roughage in the right amounts**. The amounts depend on **age, sex, body size, occupation and state of health**: a growing child needs more protein, a heavy labourer more energy foods. It supplies energy, allows growth and repair, and prevents deficiency diseases.

**Cellulose** is the fibre of plant cell walls. Humans **cannot digest** it, because they do not make the enzyme that breaks it down. It is still useful as **roughage**: it adds **bulk** to the food waste, holds **water**, and helps the muscles of the gut to push the food on, so it **prevents constipation**. Sources: vegetables, fruits with peel, whole grains, pulses.

**Plate model:** a plate with cereals (largest share), pulses/eggs/fish, vegetables and fruits, milk and a little oil is one simple picture; the shares in the figure are illustrative and books differ.`,
      [kt('Balanced diet', 'A diet with all nutrients, water and roughage in the amounts the person needs.'), kt('Roughage', 'Indigestible plant fibre, mainly cellulose, that adds bulk to the diet.'), kt('Cellulose', 'The carbohydrate of plant cell walls, not digested by humans.')],
      V.plate,
      [4],
    ),
    sec(
      '5. Malnutrition: kwashiorkor and marasmus',
      `**Malnutrition** is a condition caused by a diet that is lacking in, or has too much of, one or more nutrients.

| Feature | Kwashiorkor | Marasmus |
|---|---|---|
| Cause | Too little **protein** (diet mostly starchy foods); energy may be enough | Too little food of **all kinds**: lack of **energy and protein** |
| Usual age | Young children, about **1 to 5 years**, often after weaning | **Infants** under one year |
| Belly and limbs | **Swollen belly** (fluid, oedema); **thin** limbs | **No swelling**; very **thin, wasted** body |
| Face and hair | Puffy face; pale, thin hair; skin sores | **Shrunken, old-looking** face; ribs show |
| Behaviour | Irritable, listless | Weak, hungry, cries little |

**Prevention:** breast-feeding of infants; protein-rich weaning foods (pulses, milk, eggs); a balanced diet for the family; clean water, vaccination and treatment of infections; health education.`,
      [kt('Malnutrition', 'Ill-health caused by a diet that lacks or has too much of a nutrient.'), kt('Kwashiorkor', 'Severe protein deficiency in young children, with a swollen belly.'), kt('Marasmus', 'Severe deficiency of food, energy and protein, in infants, with a wasted body.')],
      V.children,
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Mixing up **scurvy** (vitamin C) and **rickets** (vitamin D), or **goitre** (iodine) and **anaemia** (iron).
- Giving a function without a **deficiency disease** and a **source**.
- Writing that fat gives "nine" or "thirty-seven" without the unit or the "per gram".
- Writing that cellulose is digested, or that roughage "gives energy".
- Calling marasmus a protein-only deficiency, or kwashiorkor a lack of all food.
- Forgetting that a balanced diet **depends on the person** (age, work).

**How marks are usually awarded**
- 1 mark: a term, a deficiency disease, an odd one out **with its category**, a reason.
- 2 marks: two functions, or two differences matched point for point.
- 3 marks: a table of three differences, or three points with an example.
- 10-mark structured question: a short situation with parts of 2 to 4 marks; one part is usually a labelled diagram or a graph.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Main function of carbohydrates?', 'Provide energy.', 'fact', 1),
    fc(2, 'Functions of fats?', 'Store energy, insulate, protect organs, carry fat-soluble vitamins.', 'fact', 1),
    fc(3, 'Functions of proteins?', 'Growth and repair; enzymes and antibodies.', 'fact', 1),
    fc(4, 'Energy from 1 g of fat?', 'About 37 kJ, more than twice that of carbohydrate.', 'fact', 1),
    fc(5, 'Energy from 1 g of carbohydrate or protein?', 'About 17 kJ.', 'fact', 1),
    fc(6, 'Functions of water?', 'Solvent, transport, cooling by sweat, chemical reactions.', 'fact', 1),
    fc(7, 'Sources of protein?', 'Pulses, milk, eggs, fish, meat.', 'fact', 1),
    fc(8, 'Function of calcium?', 'Builds bones and teeth; helps blood clot.', 'fact', 2),
    fc(9, 'Function of iodine?', 'Needed to make thyroxine.', 'fact', 2),
    fc(10, 'Deficiency of iodine?', 'Goitre.', 'fact', 2),
    fc(11, 'Function of iron?', 'Makes haemoglobin.', 'fact', 2),
    fc(12, 'Deficiency of iron?', 'Anaemia.', 'fact', 2),
    fc(13, 'Function of sodium?', 'Nerve messages and water balance.', 'fact', 2),
    fc(14, 'Source of sodium?', 'Common salt.', 'fact', 2),
    fc(15, 'Vitamin A: function and deficiency?', 'Healthy eyes; night blindness.', 'fact', 3),
    fc(16, 'Vitamin B1: deficiency?', 'Beri-beri.', 'fact', 3),
    fc(17, 'Vitamin C: deficiency?', 'Scurvy.', 'fact', 3),
    fc(18, 'Vitamin D: function?', 'Helps absorb calcium for bones.', 'fact', 3),
    fc(19, 'Vitamin D: deficiency?', 'Rickets.', 'fact', 3),
    fc(20, 'Vitamin K: function?', 'Helps blood to clot.', 'fact', 3),
    fc(21, 'Fat-soluble vitamins?', 'A, D, E and K.', 'exam-tip', 3),
    fc(22, 'Water-soluble vitamins?', 'B and C.', 'exam-tip', 3),
    fc(23, 'Balanced diet?', 'All nutrients, water and roughage in the amounts the person needs.', 'definition', 4),
    fc(24, 'What decides a person\'s diet needs?', 'Age, sex, size, occupation and health.', 'concept', 4),
    fc(25, 'Cellulose?', 'Plant fibre that humans cannot digest.', 'definition', 4),
    fc(26, 'Why is roughage useful?', 'Adds bulk and prevents constipation.', 'concept', 4),
    fc(27, 'Kwashiorkor: cause and sign?', 'Lack of protein; swollen belly.', 'fact', 5),
    fc(28, 'Marasmus: cause and sign?', 'Lack of all food; wasted body with ribs showing.', 'fact', 5),
    fc(29, 'Which age group gets marasmus?', 'Infants under one year.', 'fact', 5),
    fc(30, 'Two ways to prevent malnutrition?', 'Breast-feeding; protein-rich weaning foods and a balanced diet.', 'exam-tip', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
