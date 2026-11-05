// ICSE 9 Biology ch10 notes and flashcards.
import { T, unit, PROV } from '../../icse-9-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Teeth and the Digestive System — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Structure of a tooth; types of teeth; dental formula',
      `A tooth has three regions: the **crown** (above the gum), the **neck** (at the gum) and the **root** (in a socket of the jaw bone).

| Part | Description | Function |
|---|---|---|
| **Enamel** | Hardest substance in the body; covers the crown | Protects against wear and acid |
| **Dentine** | Bone-like, yellowish; most of the tooth | Shape and strength |
| **Pulp cavity** | Soft; blood vessels and nerves | Nourishes the tooth; gives the sense of pain |
| **Cement** | Thin bony layer round the root | Fixes the root in the jaw bone |
| **Gum** | Soft tissue round the neck | Holds the tooth and protects the root |

| Type | Function |
|---|---|
| **Incisors** | Cutting and biting |
| **Canines** | Tearing and piercing |
| **Premolars** | Crushing and grinding |
| **Molars** | Grinding food finely |

**Dental formula of an adult** (one half of each jaw): incisors 2, canines 1, premolars 2, molars 3 above, and the same below. Each half jaw has 8 teeth, each jaw 16 and the whole mouth **32** teeth: 8 incisors, 4 canines, 8 premolars and 12 molars.

The four last molars (third molars, or wisdom teeth) appear late and some adults never grow them, so a mouth can have 28 teeth.`,
      [kt('Enamel', 'The hardest covering of the crown.'), kt('Dentine', 'The bone-like tissue that forms most of a tooth.'), kt('Pulp cavity', 'The central cavity holding blood vessels and nerves.'), kt('Dental formula', 'The number of each type of tooth in one half of the upper and lower jaw.')],
      V.tooth,
      [1],
    ),
    sec(
      '2. The alimentary canal and the digestive glands',
      `The **alimentary canal** is a long muscular tube from the **mouth** to the **anus**: mouth (buccal cavity), pharynx, **oesophagus**, **stomach**, **small intestine** (duodenum, jejunum, ileum), **large intestine** (colon and rectum) and **anus**. Food passes through it; digestion and absorption take place along it.

| Gland | Secretion | Poured into |
|---|---|---|
| **Salivary glands** | Saliva | Mouth |
| **Gastric glands** (in the stomach wall) | Gastric juice | Stomach |
| **Liver** | Bile (stored in the **gall bladder**) | Duodenum |
| **Pancreas** | Pancreatic juice | Duodenum |
| **Intestinal glands** (in the wall of the small intestine) | Intestinal juice | Small intestine |

The **liver**, **gall bladder** and **pancreas** are *accessory organs*: food never passes through them. The liver is the largest gland in the body.`,
      [kt('Alimentary canal', 'The tube from mouth to anus through which food passes.'), kt('Duodenum', 'The first part of the small intestine, where bile and pancreatic juice enter.'), kt('Bile', 'Green-yellow juice made in the liver and stored in the gall bladder.')],
      V.digestive,
      [2],
    ),
    sec(
      '3. Digestive enzymes and their action',
      `**Digestion** changes large insoluble food molecules into small soluble ones with the help of **enzymes**.

| Region | Enzyme | Substrate | End product |
|---|---|---|---|
| Mouth | Salivary amylase | Starch | Maltose |
| Stomach | **Pepsin** (with HCl) | Protein | Peptones |
| Stomach | Rennin (infants) | Milk protein | Curd |
| Small intestine | Pancreatic amylase | Starch | Maltose |
| Small intestine | Trypsin | Proteins, peptones | Peptides, amino acids |
| Small intestine | Lipase | Emulsified fats | Fatty acids and glycerol |
| Small intestine | Maltase | Maltose | Glucose |
| Small intestine | Sucrase | Sucrose | Glucose and fructose |
| Small intestine | Lactase | Lactose | Glucose and galactose |
| Small intestine | Erepsin | Peptides | Amino acids |

**Bile** contains no enzyme. It makes the food alkaline and **emulsifies** fats (breaks big drops into tiny droplets), giving lipase a larger surface to act on. **Hydrochloric acid** in gastric juice kills germs and gives the acid medium for pepsin. Mucus protects the stomach wall.

Books differ slightly in the names and the list of enzymes; this chapter follows the common ICSE list.`,
      [kt('Enzyme', 'A protein that speeds up a reaction without being used up.'), kt('Emulsification', 'Breaking a fat into tiny droplets by bile.'), kt('Substrate', 'The substance an enzyme acts on.')],
      null,
      [3],
    ),
    sec(
      '4. Absorption and assimilation',
      `**Absorption** is the passage of digested food through the wall of the small intestine into the blood or lymph. Most absorption takes place in the **small intestine**; the large intestine absorbs mainly water.

**Villi** are finger-like projections of the wall of the small intestine. Adaptations: millions of villi give a **large surface**; the wall is **one cell thick**; a dense network of **capillaries** carries away glucose and amino acids; a central **lacteal** takes up fatty acids and glycerol; muscle fibres move the villi.

- **Glucose and amino acids** go into capillaries, then by the **hepatic portal vein** to the **liver**.
- **Fatty acids and glycerol** go into the lacteals (lymph) and reach the blood later.

**Assimilation** is the use of absorbed food by cells.
- Glucose gives **energy**; extra is stored as **glycogen** in the liver and muscles.
- Amino acids build **proteins** for growth and repair.
- Fats form **cell membranes** and are stored as fat under the skin and round organs; fat is also a source of energy.
- Undigested food is passed out as **faeces**.`,
      [kt('Absorption', 'Passage of digested food into the blood or lymph.'), kt('Villus', 'A finger-like projection of the small intestine wall that absorbs food.'), kt('Assimilation', 'The use of absorbed food by the cells for energy, growth and repair.'), kt('Lacteal', 'The lymph tube in the middle of a villus.')],
      V.villus,
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing the dental formula for the **whole mouth** and forgetting that it is given for **half** of each jaw.
- Calling **bile** an enzyme, or saying the **gall bladder makes** bile.
- Naming only the enzyme and leaving out the **substrate** or the **end product**.
- Sending **fats into capillaries**; they go into the **lacteal**.
- Leaving out the **gum** or the **pulp cavity** in a tooth diagram.

**How marks are usually awarded**
- 1 mark: a term, an odd one out **with its category**, a give-reason item.
- 2 marks: two functions or two points, matched.
- 3 marks: a three-row comparison or three enzymes with substrate and end product.
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
    fc(1, 'Three regions of a tooth?', 'Crown, neck and root.', 'fact', 1),
    fc(2, 'Hardest part of a tooth?', 'Enamel.', 'fact', 1),
    fc(3, 'What forms most of a tooth?', 'Dentine.', 'fact', 1),
    fc(4, 'What does the pulp cavity contain?', 'Blood vessels and nerves.', 'fact', 1),
    fc(5, 'Function of cement?', 'Fixes the root in the jaw bone.', 'fact', 1),
    fc(6, 'Function of incisors?', 'Cutting and biting.', 'fact', 1),
    fc(7, 'Function of canines?', 'Tearing and piercing.', 'fact', 1),
    fc(8, 'Function of premolars and molars?', 'Crushing and grinding.', 'fact', 1),
    fc(9, 'Adult dental formula (one half of each jaw)?', 'Incisors 2, canines 1, premolars 2, molars 3, above and below.', 'fact', 1),
    fc(10, 'How many teeth in an adult mouth?', '32.', 'fact', 1),
    fc(11, 'Parts of the alimentary canal in order?', 'Mouth, pharynx, oesophagus, stomach, small intestine, large intestine, anus.', 'fact', 2),
    fc(12, 'Name the five digestive glands.', 'Salivary, gastric, liver, pancreas, intestinal.', 'fact', 2),
    fc(13, 'What does the liver secrete?', 'Bile.', 'fact', 2),
    fc(14, 'Where is bile stored?', 'In the gall bladder.', 'fact', 2),
    fc(15, 'Where do bile and pancreatic juice enter?', 'The duodenum.', 'fact', 2),
    fc(16, 'Largest gland in the body?', 'The liver.', 'fact', 2),
    fc(17, 'Enzyme in saliva, substrate and product?', 'Salivary amylase; starch; maltose.', 'fact', 3),
    fc(18, 'Enzyme of the stomach for protein?', 'Pepsin; protein to peptones.', 'fact', 3),
    fc(19, 'Role of hydrochloric acid in the stomach?', 'Kills germs and gives the acid medium for pepsin.', 'fact', 3),
    fc(20, 'Does bile contain an enzyme?', 'No; it emulsifies fats and makes the food alkaline.', 'concept', 3),
    fc(21, 'Emulsification?', 'Breaking fat into tiny droplets by bile.', 'definition', 3),
    fc(22, 'Enzymes of pancreatic juice?', 'Amylase, trypsin and lipase.', 'fact', 3),
    fc(23, 'End products of fat digestion?', 'Fatty acids and glycerol.', 'fact', 3),
    fc(24, 'Maltase acts on what?', 'Maltose, giving glucose.', 'fact', 3),
    fc(25, 'Erepsin acts on what?', 'Peptides, giving amino acids.', 'fact', 3),
    fc(26, 'Absorption?', 'Passage of digested food into the blood or lymph.', 'definition', 4),
    fc(27, 'Villi are adapted by?', 'Large surface, thin wall, capillaries, lacteal.', 'concept', 4),
    fc(28, 'Where do fatty acids and glycerol go?', 'Into the lacteal.', 'fact', 4),
    fc(29, 'Assimilation?', 'The use of absorbed food by cells for energy, growth and repair.', 'definition', 4),
    fc(30, 'How is extra glucose stored?', 'As glycogen in the liver and muscles.', 'fact', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
