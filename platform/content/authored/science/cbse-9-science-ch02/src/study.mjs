// ch02 Tissues: notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Tissues: Notes',
  language: 'en',
  sections: [
    sec(
      '1. Levels of organisation',
      r`A multicellular organism is built in levels: **cell, tissue, organ, organ system, organism**. A **tissue** is a group of cells with the same structure that do a particular job. An **organ** (leaf, root, heart, stomach) is made of several tissues. An **organ system** (digestive system, shoot system) is a group of organs working together. This division of labour makes the organism efficient.

Actual size from a drawing: $\text{actual size} = \dfrac{\text{size of drawing}}{\text{magnification}}$, and $1\ \text{mm} = 1000\ \mu\text{m}$.`,
      [kt('Tissue', 'A group of cells with the same structure that carry out a particular job.'), kt('Organ', 'Several tissues working together to do a job, such as a leaf or a heart.'), kt('Organ system', 'A group of organs that work together, such as the digestive system.')],
      [fm(r`\text{actual size} = \dfrac{\text{size of drawing}}{\text{magnification}}`, 'Actual size from a drawing')],
      V.levels,
      [1],
    ),
    sec(
      '2. Meristematic tissue',
      r`**Meristematic** cells are small, thin-walled and closely packed, with dense cytoplasm, a large nucleus and no large vacuole. They divide again and again.

- **Apical meristem:** tips of roots and shoots; adds length.
- **Lateral meristem (cambium):** along the sides of stems and roots; adds girth.
- **Intercalary meristem:** at the base of leaves or internodes (as in grass); adds length and lets grass regrow after grazing.

Cells made by the meristems become **permanent** tissue.`,
      [kt('Meristem', 'A tissue whose cells keep dividing to make the plant grow.'), kt('Cambium', 'The lateral meristem that makes stems and roots thicker.'), kt('Differentiation', 'The process by which new cells take up a fixed shape and job.')],
      [],
      V.meristems,
      [2],
    ),
    sec(
      '3. Simple and complex permanent tissues of plants',
      r`**Simple permanent tissues:** parenchyma (living, thin-walled; stores food; chlorenchyma makes food; aerenchyma floats aquatic plants), collenchyma (living, corners thickened; flexible support) and sclerenchyma (dead, thick lignified walls; strength).

**Complex permanent tissues:** **xylem** (tracheids, vessels, fibres, parenchyma) carries water and minerals upwards; **phloem** (sieve tubes, companion cells, fibres, parenchyma) carries food both upwards and downwards.`,
      [kt('Parenchyma', 'Simple tissue of living, thin-walled cells that stores food or makes it.'), kt('Collenchyma', 'Simple tissue of living cells with thickened corners that gives flexible support.'), kt('Sclerenchyma', 'Simple tissue of dead cells with thick hard walls that gives strength.'), kt('Xylem', 'Complex tissue that carries water and minerals upwards.'), kt('Phloem', 'Complex tissue that carries food made in leaves to all parts.')],
      [],
      V.simpleTable,
      [2],
      [V.simple, V.xylemPhloem, V.xyPhTable],
    ),
    sec(
      '4. Protective tissue of plants',
      r`The **epidermis** is usually one layer of tightly packed cells. In aerial parts it has a waxy **cuticle** that reduces water loss. **Stomata**, pores each between two **guard cells**, let gases and water vapour pass. In roots, epidermal cells make **root hairs** that absorb water. Older stems are covered by **cork**, dead cells with a waterproof coating that protect the stem.`,
      [kt('Stomata', 'Tiny pores in the epidermis, each between two guard cells, for exchange of gases.'), kt('Cuticle', 'A waxy layer on the outer wall of epidermal cells that reduces water loss.'), kt('Cork', 'Dead cells with a waterproof wall that cover the older stem.')],
      [],
      table(['Part', 'Job'], [['Epidermis', 'Protects the plant body'], ['Stomata', 'Gas exchange; water vapour loss'], ['Root hairs', 'Absorb water and minerals'], ['Cork', 'Protects older stems']], 'Table of protective tissues of plants and their jobs'),
      [2],
    ),
    sec(
      '5. Animal tissues: epithelial and connective',
      r`**Epithelial tissue** has tightly packed cells on a basement membrane: squamous (flat; mouth, blood vessels, skin), cuboidal (kidney tubules), columnar (small intestine), ciliated columnar (windpipe) and glandular (sweat and salivary glands).

**Connective tissue** has cells scattered in a matrix. **Blood** (plasma with red cells, white cells and platelets), **bone** (hard matrix of calcium and phosphorus salts), **cartilage** (firm, flexible), **ligament** (joins bone to bone), **tendon** (joins muscle to bone), **areolar** (fills spaces) and **adipose** (stores fat).`,
      [kt('Epithelial tissue', 'Tissue of tightly packed cells that covers surfaces and lines organs.'), kt('Matrix', 'The material between connective tissue cells; it may be liquid, firm or hard.'), kt('Tendon', 'A strong cord of connective tissue that joins muscle to bone.'), kt('Ligament', 'A strong, elastic band of connective tissue that joins bone to bone.')],
      [],
      V.epiTable,
      [3],
      [V.epithelia, V.connective, V.connTable],
    ),
    sec(
      '6. Animal tissues: muscular and nervous',
      r`**Striated (skeletal)** muscle: stripes, many nuclei, long unbranched fibres, voluntary. **Smooth** muscle: no stripes, one nucleus, spindle-shaped, involuntary (food pipe, blood vessels). **Cardiac** muscle: stripes, one nucleus, branched, involuntary, in the heart only.

**Nervous tissue** is made of **neurons**. Dendrites receive signals, the cell body holds the nucleus, the axon carries the impulse away, and nerve endings pass it on. An axon can be about a metre long.`,
      [kt('Voluntary muscle', 'Muscle that we can control, such as the muscles of the arm.'), kt('Involuntary muscle', 'Muscle that works without our control, such as heart muscle.'), kt('Neuron', 'A nerve cell with dendrites, a cell body, an axon and nerve endings.')],
      [],
      V.muscleTable,
      [3],
      [V.muscles, V.neuron],
    ),
    sec(
      '7. Joints and care of the musculoskeletal system',
      r`**Joints:** ball and socket (shoulder, hip; all directions), hinge (elbow, knee; one plane), pivot (neck; rotation), gliding (wrist, ankle; sliding) and fixed (skull; no movement). Ligaments hold the bones and cartilage cushions the ends.

**Care:** keep good posture, exercise regularly, and eat food with **calcium** (milk, curd, ragi, sesame, green leafy vegetables). **Vitamin D** (from sunlight, egg yolk and fish) helps the body absorb calcium. Too little vitamin D in children can cause soft, bent bones (rickets).`,
      [kt('Joint', 'A place where two bones meet.'), kt('Posture', 'The way the body is held when sitting, standing or moving.'), kt('Vitamin D', 'A vitamin that helps the body absorb calcium for bones.')],
      [],
      table(['Joint', 'Example', 'Movement'], [['Ball and socket', 'Shoulder, hip', 'All directions'], ['Hinge', 'Elbow, knee', 'One plane'], ['Pivot', 'Neck', 'Rotation'], ['Gliding', 'Wrist, ankle', 'Small sliding'], ['Fixed', 'Skull', 'None']], 'Table of five kinds of joint with example and movement'),
      [4],
      [V.joints],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing that phloem carries water, or that xylem carries food.
- Saying that sclerenchyma is living.
- Mixing up tendon (muscle to bone) and ligament (bone to bone).
- Calling cardiac muscle voluntary, or smooth muscle striped.
- Writing that vitamin D builds bone instead of helping calcium absorption.

**How marks are usually awarded**
- 1-mark items: a name, a place or one function.
- 2-mark items: two points, one mark each.
- 3-mark items: three short, correct points with an example.
- 5-mark items: a neat labelled diagram (about 2 marks) and a clear comparison or description.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'List the levels of organisation in a multicellular organism.', 'Cell, tissue, organ, organ system, organism.', 'concept', 1),
    fc(2, 'What is a tissue?', 'A group of cells with the same structure that carry out a particular job.', 'definition', 1),
    fc(3, 'Name the two main groups of plant tissue.', 'Meristematic and permanent.', 'fact', 2),
    fc(4, 'What are three features of meristematic cells?', 'Small, thin-walled and closely packed, with dense cytoplasm and a large nucleus.', 'concept', 2),
    fc(5, 'Where is the apical meristem and what does it do?', 'At the tips of roots and shoots; adds length.', 'fact', 2),
    fc(6, 'What is the job of the lateral meristem?', 'It makes stems and roots thicker (cambium).', 'fact', 2),
    fc(7, 'Why does grass regrow after being grazed?', 'The intercalary meristem at the base of the leaves keeps dividing.', 'concept', 2),
    fc(8, 'Name the three simple permanent tissues.', 'Parenchyma, collenchyma, sclerenchyma.', 'fact', 2),
    fc(9, 'What is chlorenchyma?', 'Parenchyma that contains chloroplasts and makes food.', 'definition', 2),
    fc(10, 'What is aerenchyma and where is it found?', 'Parenchyma with large air spaces, found in aquatic plants; helps them float.', 'definition', 2),
    fc(11, 'Which plant tissue has thickened corners and gives flexible support?', 'Collenchyma, as in the strings of celery.', 'fact', 2),
    fc(12, 'Why is sclerenchyma strong?', 'Its dead cells have very thick, hard, lignified walls.', 'concept', 2),
    fc(13, 'What does xylem carry, and in which direction?', 'Water and minerals, upwards.', 'concept', 2),
    fc(14, 'What does phloem carry, and in which direction?', 'Food made in the leaves, upwards and downwards.', 'concept', 2),
    fc(15, 'Name the parts of phloem.', 'Sieve tubes, companion cells, phloem fibres and phloem parenchyma.', 'fact', 2),
    fc(16, 'What are stomata?', 'Tiny pores in the epidermis, each between two guard cells, for exchange of gases.', 'definition', 2),
    fc(17, 'What is cork?', 'Dead cells with a waterproof wall that protect older stems.', 'definition', 2),
    fc(18, 'Two features of epithelial tissue?', 'Tightly packed cells, resting on a basement membrane.', 'concept', 3),
    fc(19, 'Where is ciliated columnar epithelium found?', 'In the windpipe, where cilia sweep mucus and dust out.', 'fact', 3),
    fc(20, 'What is the matrix of blood?', 'Liquid plasma.', 'fact', 3),
    fc(21, 'What does a tendon join? A ligament?', 'Tendon: muscle to bone. Ligament: bone to bone.', 'concept', 3),
    fc(22, 'What makes bone hard?', 'Calcium and phosphorus salts in its matrix.', 'fact', 3),
    fc(23, 'Where do you find cartilage?', 'Ear, nose, windpipe rings and the ends of bones at joints.', 'fact', 3),
    fc(24, 'Three kinds of cell in blood and their jobs?', 'Red cells carry oxygen; white cells fight germs; platelets help clotting.', 'concept', 3),
    fc(25, 'Striated muscle: stripes, nuclei, control?', 'Stripes, many nuclei, voluntary.', 'concept', 3),
    fc(26, 'Smooth muscle: stripes, nuclei, where?', 'No stripes, one nucleus, spindle-shaped; in food pipe and blood vessels.', 'concept', 3),
    fc(27, 'Where is cardiac muscle found and is it voluntary?', 'Only in the heart; involuntary.', 'fact', 3),
    fc(28, 'Name the parts of a neuron.', 'Dendrites, cell body, axon, nerve endings.', 'fact', 3),
    fc(29, 'Name five types of joint with one example each.', 'Ball and socket (hip), hinge (knee), pivot (neck), gliding (wrist), fixed (skull).', 'example', 4),
    fc(30, 'How do calcium and vitamin D help bones?', 'Calcium builds bone; vitamin D helps the body absorb calcium.', 'concept', 4),
    fc(31, 'Name two daily habits that protect bones and muscles.', 'Good posture, and regular exercise.', 'exam-tip', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
