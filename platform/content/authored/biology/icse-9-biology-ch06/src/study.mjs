// ICSE 9 Biology ch06 notes and flashcards.
import { T, unit, PROV } from '../../icse-9-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Respiration in Plants — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Outline of respiration: glycolysis and the Krebs cycle',
      `**Respiration** is the chemical breakdown of food (mainly glucose) in the cells to release energy. It goes on in every living cell, day and night. It is not the same as breathing or gas exchange.

| | Glycolysis | Krebs cycle |
|---|---|---|
| Place | **Cytoplasm** | **Mitochondria** |
| Oxygen | Not needed | Needed |
| Starts with | Glucose (6 carbon atoms) | Pyruvate (3 carbon atoms) |
| Produces | Two **pyruvate** and a little energy | **Carbon dioxide**, **water** and much more energy |

Significance: the energy released is used for growth, active transport, building new substances and other life processes. Without oxygen the Krebs cycle cannot run and the cell is left with the energy from glycolysis alone.

Books differ in how much detail they give; this chapter gives only the outline, and quotes energy as a number of units per glucose (about 36 for aerobic and 2 for anaerobic respiration; some books give 38).`,
      [kt('Respiration', 'Breakdown of food in cells to release energy.'), kt('Glycolysis', 'Splitting of glucose into two pyruvate in the cytoplasm; no oxygen needed.'), kt('Krebs cycle', 'Complete breakdown of pyruvate in the mitochondria; needs oxygen.'), kt('Mitochondrion', 'The cell structure where the Krebs cycle takes place.')],
      V.cell,
      [1],
    ),
    sec(
      '2. Aerobic and anaerobic respiration',
      `**Aerobic** (with oxygen): complete breakdown, large energy.

$$\\ce{C6H12O6 + 6O2 -> 6CO2 + 6H2O + energy}$$

**Anaerobic** (without oxygen), in plants and yeast: incomplete breakdown, small energy, alcohol (ethanol) is formed.

$$\\ce{C6H12O6 -> 2C2H5OH + 2CO2 + energy}$$

| Feature | Aerobic | Anaerobic |
|---|---|---|
| Oxygen | Needed | Not needed |
| Breakdown of glucose | Complete | Incomplete |
| End products | Carbon dioxide and water | Alcohol and carbon dioxide |
| Energy | Large (about 36 units per glucose) | Small (2 units per glucose) |
| Site | Cytoplasm and mitochondria | Cytoplasm |

Anaerobic respiration occurs in yeast (fermentation), in roots in waterlogged soil and in seeds with no air. In animals it gives lactic acid, which is not part of this chapter.`,
      [kt('Aerobic respiration', 'Respiration that uses oxygen and breaks glucose down completely.'), kt('Anaerobic respiration', 'Respiration without oxygen; in plants it gives alcohol and carbon dioxide.'), kt('Fermentation', 'Anaerobic respiration of sugar by yeast.')],
      null,
      [2],
    ),
    sec(
      '3. Gaseous exchange in plants; carbon dioxide from germinating seeds',
      `Plants have no lungs; gases move by **diffusion**.
- **Leaves and young stems:** through **stomata**.
- **Woody stems:** through **lenticels**.
- **Roots:** through root hairs and surface cells, taking oxygen from air spaces in the soil.

In light a green plant makes more oxygen by photosynthesis than it uses; in the dark only respiration goes on, so oxygen is taken in and carbon dioxide given out.

**Experiment.** Put soaked germinating seeds in flask X, and the same mass of boiled and cooled (dead) seeds in flask Y. Fit each with a cork and a delivery tube dipping into lime water. After a few hours the lime water in X turns **milky** (carbon dioxide); in Y it stays **clear**. Flask Y is the **control**: only the life of the seeds differs.`,
      [kt('Stomata', 'Tiny pores in leaves and young stems for gas exchange.'), kt('Lenticels', 'Small pores in the bark of woody stems for gas exchange.'), kt('Lime water', 'A clear solution that turns milky with carbon dioxide.')],
      V.co2,
      [3],
    ),
    sec(
      '4. Heat produced in respiration; need for a control',
      `Respiration releases some of the energy as **heat**.

**Experiment.** Put soaked germinating seeds in a vacuum (thermos) flask and soaked seeds that were boiled and cooled in a second flask. Close each with cotton wool through which a thermometer passes, with its bulb among the seeds. The cotton wool lets air in but keeps heat. After a few days the thermometer in the flask of living seeds shows a **rise** in temperature; the other does not.

The flask of boiled seeds is the **control**. It is set up in exactly the same way except that the seeds are dead, so it shows that the heat comes from living seeds and not from the surroundings or the apparatus. Both flasks must start at the same temperature and hold the same mass of seeds.`,
      [kt('Control', 'A set-up identical except for the one factor being tested, used for comparison.')],
      V.thermos,
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Calling respiration **breathing**, or writing the equation of photosynthesis by mistake.
- Writing an **unbalanced** equation or leaving out **energy**.
- Forgetting that anaerobic respiration in plants gives **alcohol** (not lactic acid).
- Putting the Krebs cycle in the **cytoplasm**: it is in the **mitochondria**.
- Not naming the **control** (boiled, dead seeds) or not saying why it is needed.

**How marks are usually awarded**
- 1 mark: a term, an odd one out **with its category**, a give-reason item.
- 2 marks: two differences or two functions, matched point for point.
- 3 marks: a balanced equation with energy, or three matched points.
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
    fc(1, 'Respiration?', 'Breakdown of food in cells to release energy.', 'definition', 1),
    fc(2, 'Is respiration the same as breathing?', 'No. Respiration is chemical and inside cells; breathing is gas exchange.', 'exam-tip', 1),
    fc(3, 'Where does glycolysis take place?', 'In the cytoplasm.', 'fact', 1),
    fc(4, 'Where does the Krebs cycle take place?', 'In the mitochondria.', 'fact', 1),
    fc(5, 'Glycolysis starts with and makes?', 'Starts with glucose; makes two pyruvate and a little energy.', 'fact', 1),
    fc(6, 'Does glycolysis need oxygen?', 'No.', 'fact', 1),
    fc(7, 'Does the Krebs cycle need oxygen?', 'Yes.', 'fact', 1),
    fc(8, 'Products of the Krebs cycle?', 'Carbon dioxide, water and much energy.', 'fact', 1),
    fc(9, 'Mitochondrion?', 'The cell structure where the Krebs cycle takes place.', 'definition', 1),
    fc(10, 'Aerobic respiration?', 'Respiration with oxygen; complete breakdown of glucose.', 'definition', 2),
    fc(11, 'Equation of aerobic respiration?', 'C6H12O6 + 6O2 → 6CO2 + 6H2O + energy', 'fact', 2),
    fc(12, 'Anaerobic respiration?', 'Respiration without oxygen; incomplete breakdown.', 'definition', 2),
    fc(13, 'Equation of anaerobic respiration in plants?', 'C6H12O6 → 2C2H5OH + 2CO2 + energy', 'fact', 2),
    fc(14, 'End products of anaerobic respiration in plants?', 'Alcohol and carbon dioxide.', 'fact', 2),
    fc(15, 'Which gives more energy, aerobic or anaerobic?', 'Aerobic (about 36 units against 2 per glucose).', 'fact', 2),
    fc(16, 'Fermentation?', 'Anaerobic respiration of sugar by yeast.', 'definition', 2),
    fc(17, 'Where does anaerobic respiration occur?', 'Yeast, roots in waterlogged soil, seeds without air.', 'fact', 2),
    fc(18, 'How do gases enter a leaf?', 'Through stomata.', 'fact', 3),
    fc(19, 'How do gases pass through woody stems?', 'Through lenticels.', 'fact', 3),
    fc(20, 'How do roots get oxygen?', 'From air spaces in the soil through root hairs and surface cells.', 'fact', 3),
    fc(21, 'Process by which gases move in plants?', 'Diffusion.', 'fact', 3),
    fc(22, 'Gas given out by germinating seeds?', 'Carbon dioxide.', 'fact', 3),
    fc(23, 'What turns lime water milky?', 'Carbon dioxide.', 'fact', 3),
    fc(24, 'Control in the carbon dioxide experiment?', 'Flask of boiled (dead) seeds.', 'fact', 3),
    fc(25, 'What is kept the same in both flasks?', 'Apparatus, mass of seeds, temperature, time.', 'concept', 3),
    fc(26, 'Which other change shows respiration in seeds?', 'A rise in temperature (heat is released).', 'fact', 4),
    fc(27, 'Why use a vacuum flask?', 'It keeps the heat in, so a small rise can be read.', 'concept', 4),
    fc(28, 'Why cotton wool in the flask?', 'It lets air in but keeps heat.', 'concept', 4),
    fc(29, 'Why boil the seeds in the control?', 'Dead seeds do not respire.', 'concept', 4),
    fc(30, 'What does the control prove?', 'The heat or gas comes from living seeds, not from the apparatus.', 'concept', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
