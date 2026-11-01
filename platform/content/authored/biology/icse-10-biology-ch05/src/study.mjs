// ICSE 10 Biology ch05 Photosynthesis — notes and flashcards.
import { T, table, unit, PROV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { HYD } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Photosynthesis — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Photosynthesis: definition, equation and significance',
      String.raw`**Photosynthesis** is the process by which green plants make **glucose** from **carbon dioxide** and **water**, using **light energy** absorbed by **chlorophyll**, and release **oxygen** as a by-product.

$$\ce{6CO2 + 12H2O ->[\text{sunlight}][\text{chlorophyll}] C6H12O6 + 6O2 + 6H2O}$$

Glucose is converted to **starch** for storage. Light energy is converted into **chemical energy** stored in food.

**Significance:** the source of **food** for almost all living things; keeps up the **oxygen** of the air; removes **carbon dioxide**; traps **solar energy**; the energy in **fossil fuels** came from photosynthesis long ago.`,
      [kt('Photosynthesis', 'Making of glucose from carbon dioxide and water using light energy trapped by chlorophyll.'), kt('By-product', 'A substance formed alongside the main product; oxygen in photosynthesis.')],
      V.equation,
      [1],
    ),
    sec(
      '2. The chloroplast; stomata and carbon dioxide',
      `**Chloroplast:** an oval organelle bounded by a **double membrane** (envelope). Inside are **grana** (stacks of disc-shaped **thylakoids** whose membranes contain **chlorophyll**), joined by **stroma lamellae**, lying in the colourless **stroma**, which contains **enzymes** (and starch grains).
- **Light phase** → **grana**. **Dark phase** → **stroma**.

**Stomata:** in light, **potassium ions** enter the guard cells, water follows by osmosis, the guard cells become turgid and the stomata **open**, letting **carbon dioxide** in and **oxygen** out.`,
      [kt('Granum', 'A stack of thylakoids containing chlorophyll; site of the light phase.'), kt('Stroma', 'Colourless matrix of the chloroplast; site of the dark phase.')],
      V.chloroplast,
      [2],
    ),
    sec(
      '3. Light (photochemical) phase',
      `Takes place in the **grana** and needs **light**.
1. **Activation of chlorophyll:** chlorophyll absorbs light energy and becomes activated.
2. **Photolysis of water:** the energy splits water into hydrogen (ions and electrons) and **oxygen**.
3. **Release of oxygen:** the oxygen escapes from the leaf. The oxygen of photosynthesis therefore comes from **water**.
4. **Formation of ATP and NADPH:** light energy is stored in **ATP**; hydrogen is carried by **NADPH**.

**Products:** ATP, NADPH (used in the dark phase) and oxygen (released).`,
      [kt('Photolysis', 'Splitting of water by light energy.'), kt('ATP', 'Energy-carrying molecule formed in the light phase.'), kt('NADPH', 'Hydrogen-carrying molecule formed in the light phase.')],
      V.light,
      [3],
    ),
    sec(
      '4. Dark (biosynthetic) phase',
      `Takes place in the **stroma** and does **not need light directly**, but uses **ATP** and **NADPH** from the light phase (so it stops soon after the light phase stops).
- **Carbon dioxide** combines with **hydrogen** from NADPH, using **energy** from ATP, to form **glucose**; glucose is stored as **starch**. (Detailed equations of this phase are not in the syllabus.)

| Point | Light phase | Dark phase |
|---|---|---|
| Site | Grana | Stroma |
| Needs | Light, chlorophyll, water | Carbon dioxide, ATP, NADPH |
| Products | ATP, NADPH, oxygen | Glucose |`,
      [kt('Dark phase', 'Fixation of carbon dioxide into glucose in the stroma using ATP and NADPH.')],
      V.dark,
      [4],
    ),
    sec(
      '5. Adaptations of leaves for photosynthesis',
      `- **Broad, flat lamina:** large surface to absorb light.
- **Thin:** short distance for carbon dioxide and light to reach all cells.
- **Palisade cells** packed with **chloroplasts**, just below the upper surface where light is strongest.
- **Spongy tissue** with large **air spaces** for diffusion of gases.
- Many **stomata** for exchange of carbon dioxide and oxygen.
- A network of **veins**: xylem brings water and minerals; phloem carries away food.
- Leaves arranged so that they do not shade one another.`,
      [kt('Palisade tissue', 'Tall cells packed with chloroplasts below the upper epidermis.'), kt('Spongy tissue', 'Loosely packed cells with large air spaces.')],
      V.leaf,
      [5],
    ),
    sec(
      '6. Experiments on photosynthesis',
      `**Destarching:** keep the plant in **darkness for one to two days** so that its leaves have no starch.

**Starch test:** (1) boil the leaf in **water** (kills the cells, makes them permeable); (2) boil in **alcohol** in a **water bath** (removes chlorophyll; alcohol is flammable); (3) dip in **warm water** (softens the brittle leaf); (4) add **iodine solution**: **blue-black** = starch present; brown = no starch.

**Light is necessary:** black paper strip on both sides of a leaf of a destarched plant; after sunlight, the covered part has no starch.

**Carbon dioxide is necessary:** **Moll's half-leaf experiment**: half the leaf inside a bottle containing **potassium hydroxide** (absorbs carbon dioxide), cork sealed with Vaseline; that half has no starch. (Or two destarched plants under bell jars, one with potassium hydroxide and one, the control, with water.)

**Chlorophyll is necessary:** **variegated leaf** (for example croton): only the green parts turn blue-black.

**Oxygen is released:** **hydrilla** under a funnel in water in sunlight; bubbles collect in a test tube; the gas **rekindles a glowing splinter**. The rate rises with more light (for example ${HYD.rows[0].rate} bubbles per minute with a lamp at ${HYD.rows[0].cm} cm, ${HYD.rows[3].rate} at ${HYD.rows[3].cm} cm) and with **sodium bicarbonate**, which supplies carbon dioxide.`,
      [kt('Destarching', 'Removing starch from leaves by keeping the plant in darkness.'), kt('Variegated leaf', 'Leaf with green and non-green (white) areas.')],
      V.bath,
      [6],
      [V.screen, V.moll, V.vari, V.hydrilla],
    ),
    sec(
      '7. The carbon cycle',
      `Carbon circulates between the **air** (as carbon dioxide), **living things** and **fossil fuels**.
- **Photosynthesis** by green plants **removes** carbon dioxide from the air.
- **Feeding** passes carbon from plants to animals.
- **Respiration** by plants, animals and decomposers **returns** carbon dioxide to the air.
- **Decomposition** of dead bodies and wastes by bacteria and fungi returns carbon dioxide.
- Some dead matter, buried for millions of years, forms **fossil fuels**; their **combustion** returns carbon dioxide.

Cutting forests and burning more fuel add carbon dioxide faster than photosynthesis removes it.`,
      [kt('Carbon cycle', 'Circulation of carbon between the air, living things and fossil fuels.'), kt('Decomposers', 'Bacteria and fungi that break down dead matter and release carbon dioxide.')],
      V.carbon,
      [7],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing 6 H₂O on the left of the equation, or leaving out sunlight and chlorophyll.
- Saying the oxygen comes from carbon dioxide (it comes from water).
- Saying the dark phase happens only at night.
- Forgetting to destarch, or forgetting the control, in experiment answers.
- Mixing up potassium hydroxide (absorbs carbon dioxide) and sodium bicarbonate (supplies it).

**How marks are usually awarded**
- 1 mark: a term, a colour, an odd one out **with its category**.
- 2 marks: a step of the starch test with its reason, or two differences.
- 3 marks: the light phase in sequence, an experiment with set-up, result and conclusion, or a labelled chloroplast or carbon cycle.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Raw materials of photosynthesis?', 'Carbon dioxide and water.', 'fact', 1),
    fc(2, 'Products of photosynthesis?', 'Glucose (stored as starch) and oxygen.', 'fact', 1),
    fc(3, 'Conditions over the arrow?', 'Sunlight and chlorophyll.', 'exam-tip', 1),
    fc(4, 'Water molecules on the left of the equation?', '12.', 'exam-tip', 1),
    fc(5, 'Energy change in photosynthesis?', 'Light energy to chemical energy.', 'concept', 1),
    fc(6, 'Site of the light phase?', 'Grana (thylakoids).', 'fact', 2),
    fc(7, 'Site of the dark phase?', 'Stroma.', 'fact', 2),
    fc(8, 'Granum?', 'Stack of thylakoids with chlorophyll.', 'definition', 2),
    fc(9, 'How does carbon dioxide enter the leaf?', 'Through open stomata.', 'fact', 2),
    fc(10, 'First event of the light phase?', 'Activation of chlorophyll by light.', 'fact', 3),
    fc(11, 'Photolysis?', 'Splitting of water by light.', 'definition', 3),
    fc(12, 'Source of the oxygen released?', 'Water.', 'exam-tip', 3),
    fc(13, 'Products of the light phase?', 'ATP, NADPH, oxygen.', 'fact', 3),
    fc(14, 'What happens in the dark phase?', 'Carbon dioxide fixed into glucose using ATP and NADPH.', 'concept', 4),
    fc(15, 'Does the dark phase need light directly?', 'No; it needs ATP and NADPH.', 'concept', 4),
    fc(16, 'Why are leaves broad?', 'To absorb more light.', 'concept', 5),
    fc(17, 'Why are leaves thin?', 'Gases and light reach all cells.', 'concept', 5),
    fc(18, 'Role of air spaces?', 'Diffusion of carbon dioxide.', 'concept', 5),
    fc(19, 'How is a plant destarched?', 'Kept in darkness for 1–2 days.', 'fact', 6),
    fc(20, 'Why boil the leaf in water?', 'Kill cells; make them permeable.', 'exam-tip', 6),
    fc(21, 'Why boil in alcohol?', 'Remove chlorophyll.', 'exam-tip', 6),
    fc(22, 'Why a water bath?', 'Alcohol is flammable.', 'exam-tip', 6),
    fc(23, 'Colour of starch with iodine?', 'Blue-black.', 'fact', 6),
    fc(24, 'Experiment for light?', 'Black paper strip on a leaf.', 'fact', 6),
    fc(25, 'Role of potassium hydroxide?', 'Absorbs carbon dioxide.', 'fact', 6),
    fc(26, 'Experiment for chlorophyll?', 'Variegated leaf.', 'fact', 6),
    fc(27, 'Test for oxygen from hydrilla?', 'Rekindles a glowing splinter.', 'fact', 6),
    fc(28, 'Role of sodium bicarbonate?', 'Supplies carbon dioxide.', 'fact', 6),
    fc(29, 'Process removing carbon dioxide from air?', 'Photosynthesis.', 'fact', 7),
    fc(30, 'Three processes returning carbon dioxide?', 'Respiration, decomposition, combustion.', 'fact', 7),
  ],
  status: 'draft',
  provenance: PROV,
};
