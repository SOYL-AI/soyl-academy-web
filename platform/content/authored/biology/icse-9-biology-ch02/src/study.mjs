// ICSE 9 Biology ch02 notes and flashcards.
import { T, table, unit, PROV } from '../../icse-9-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T), });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Tissues — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Plant tissues: meristematic tissues',
      `A **tissue** is a group of similar cells with a common origin that perform a particular function. Plant tissues are of two groups: **meristematic** (dividing) and **permanent** (specialised, not dividing).

**Features of meristematic cells:** small, thin-walled, closely packed with **no intercellular spaces**, dense cytoplasm, a large nucleus and no (or very small) vacuoles; they divide actively.

| Meristem | Position | Function |
|---|---|---|
| **Apical** | Tips of roots and shoots | Increases **length** |
| **Intercalary** | Base of leaves or internodes (as in grasses) | Increases length at the nodes |
| **Lateral** | Along the sides of stems and roots (**cambium**) | Increases **girth** (thickness) |`,
      [kt('Tissue', 'A group of similar cells that do one job together.'), kt('Meristem', 'Tissue whose cells keep dividing.'), kt('Cambium', 'The lateral meristem that thickens stems and roots.')],
      V.meristems,
      [1],
    ),
    sec(
      '2. Plant tissues: permanent tissues',
      `**Simple permanent tissues** (all cells alike):
- **Parenchyma:** **living**, thin cellulose walls, **intercellular spaces**; **stores** food, and in green parts (**chlorenchyma**) makes food by photosynthesis; air-filled parenchyma in aquatic plants (aerenchyma) gives buoyancy.
- **Collenchyma:** **living**, walls **unevenly thickened at the corners** with cellulose and pectin; gives **flexible support** to young stems and leaf stalks.
- **Sclerenchyma:** **dead**, very thick **lignified** walls, narrow cavity, no spaces; gives **strength and hardness**. **Fibres** (jute, coconut husk) are long; **sclereids** (stone cells in guava, nut shells) are short.

**Complex permanent tissues** (several kinds of cell working together):
- **Xylem:** **tracheids, vessels, xylem fibres, xylem parenchyma**. Conducts **water and minerals** from roots to leaves (upwards) and gives support. All except the parenchyma are dead.
- **Phloem:** **sieve tubes, companion cells, phloem fibres, phloem parenchyma**. Conducts **food** from the leaves to all parts (up and down). Sieve tubes are **living but have no nucleus**; the **companion cell** has a nucleus and controls them.`,
      [kt('Parenchyma', 'Living thin-walled tissue that stores food.'), kt('Collenchyma', 'Living tissue with thickened corners; flexible support.'), kt('Sclerenchyma', 'Dead lignified tissue; strength.'), kt('Xylem', 'Tissue that carries water and minerals.'), kt('Phloem', 'Tissue that carries food.')],
      V.simple,
      [2],
      [V.vascular],
    ),
    sec(
      '3. Animal tissues: epithelial and connective',
      `**Epithelial tissue** covers the body and lines cavities and tubes. Cells are closely packed with little matrix, resting on a basement layer.
| Type | Where | Function |
|---|---|---|
| **Squamous** | Air sacs of lungs, blood vessels, mouth | Protection; diffusion |
| **Cuboidal** | Kidney tubules, ducts of glands | Secretion, absorption |
| **Columnar** | Stomach and intestine lining | Secretion, absorption |
| **Ciliated** | Windpipe | Moves mucus and dust |
**Glandular epithelium** (goblet cells, salivary glands) secretes.

**Connective tissue** has cells scattered in a **matrix**; it binds, supports and fills.
| Tissue | Where | Function |
|---|---|---|
| **Areolar** | Under the skin, around organs | Binds, fills spaces |
| **Adipose** | Under skin, around kidneys | Stores fat; insulates |
| **Cartilage** | Ear, nose, ends of bones | Flexible support |
| **Bone** | Skeleton | Hard support; protection |
| **Tendon** | Muscle to bone | Strong, inelastic; transmits pull |
| **Ligament** | Bone to bone | Elastic; holds joints |
| **Blood** | Vessels | Transports; fluid matrix **plasma** |`,
      [kt('Epithelium', 'Tissue that covers and lines.'), kt('Matrix', 'Material between the cells of a connective tissue.'), kt('Tendon', 'Connects muscle to bone.'), kt('Ligament', 'Connects bone to bone.')],
      V.epithelia,
      [3],
      [V.connective],
    ),
    sec(
      '4. Animal tissues: muscular and nervous',
      `| Point | Striated (skeletal) | Unstriated (smooth) | Cardiac |
|---|---|---|---|
| Stripes | Present | Absent | Present |
| Control | Voluntary | Involuntary | Involuntary |
| Cell | Long, cylindrical, unbranched, many nuclei | Spindle-shaped, one nucleus | Branched, usually one nucleus; intercalated discs |
| Found in | Limbs, attached to bones | Walls of gut, blood vessels | Heart |
| Fatigue | Tires | Tires slowly | Does not tire |

**Nervous tissue** is made of **neurons**. A neuron has **dendrites** (receive impulses), a **cell body (cyton)** with a **nucleus**, a long **axon** (carries impulses away, often wrapped in a **myelin sheath**) and **axon terminals** (pass on the impulse). Neurons are the structural and functional units of the nervous system.`,
      [kt('Striated muscle', 'Voluntary muscle with stripes.'), kt('Cardiac muscle', 'Striped involuntary muscle of the heart.'), kt('Neuron', 'A nerve cell that carries impulses.'), kt('Axon', 'Long fibre carrying the impulse away from the cell body.')],
      V.muscles,
      [4],
      [V.neuron],
    ),
    sec(
      '5. Role of tissues in physiological processes',
      `Structure fits function:
- **Transport in plants:** xylem (water and minerals up) and phloem (food up and down): long tubes joined end to end.
- **Support:** sclerenchyma (hard dead fibres), collenchyma (flexible), and in animals bone and cartilage.
- **Storage:** parenchyma (starch, water), adipose tissue (fat).
- **Gas exchange:** thin squamous epithelium of the air sacs.
- **Protection:** epithelium of the skin; sclerenchyma husks.
- **Movement:** muscular tissue, whose fibres contract; tendons pass the pull to bones.
- **Coordination:** nervous tissue, whose long branched neurons carry impulses.`,
      [kt('Tissue specialisation', 'Cells of a tissue are built to suit one particular job.')],
      table(['Process', 'Tissue'], [['Transport in plants', 'Xylem and phloem'], ['Gas exchange', 'Squamous epithelium'], ['Coordination', 'Nervous tissue']], 'Table of three processes and the tissue that carries them out'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Calling sclerenchyma living, or collenchyma dead.
- Saying sieve tubes have a nucleus; it is the companion cell that has one.
- Mixing up tendons (muscle to bone) and ligaments (bone to bone).
- Writing that cardiac muscle is unstriated or voluntary.
- Forgetting the cambium: it is the **lateral** meristem that increases girth.

**How marks are usually awarded**
- 1 mark: a term, a location, an odd one out **with its category**.
- 2 marks: two differences matched point for point; two functions.
- 3 marks: a neat, labelled diagram of a neuron (outline, key features, labels) or three differences in a table.
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
    fc(1, 'Tissue?', 'A group of similar cells doing one job together.', 'definition', 1),
    fc(2, 'Meristem?', 'Tissue whose cells keep dividing.', 'definition', 1),
    fc(3, 'Apical meristem: where and what?', 'Tips of roots and shoots; increases length.', 'fact', 1),
    fc(4, 'Intercalary meristem: where?', 'Base of leaves or internodes, as in grasses.', 'fact', 1),
    fc(5, 'Lateral meristem?', 'Cambium; increases girth.', 'fact', 1),
    fc(6, 'Features of meristematic cells?', 'Small, thin wall, dense cytoplasm, large nucleus, no big vacuole.', 'fact', 1),
    fc(7, 'Parenchyma: living or dead? Job?', 'Living; stores food, makes food if green.', 'fact', 2),
    fc(8, 'Collenchyma: where and why?', 'Under the epidermis; flexible support.', 'fact', 2),
    fc(9, 'Sclerenchyma: living or dead?', 'Dead, with thick lignified walls.', 'exam-tip', 2),
    fc(10, 'Two kinds of sclerenchyma?', 'Fibres and sclereids.', 'fact', 2),
    fc(11, 'Components of xylem?', 'Tracheids, vessels, fibres, parenchyma.', 'fact', 2),
    fc(12, 'Components of phloem?', 'Sieve tubes, companion cells, fibres, parenchyma.', 'fact', 2),
    fc(13, 'Xylem carries?', 'Water and minerals upwards.', 'fact', 2),
    fc(14, 'Phloem carries?', 'Food from leaves to all parts.', 'fact', 2),
    fc(15, 'Cell of phloem with a nucleus that controls sieve tubes?', 'Companion cell.', 'exam-tip', 2),
    fc(16, 'Epithelium lining air sacs?', 'Squamous.', 'fact', 3),
    fc(17, 'Epithelium with cilia: where?', 'Windpipe; moves mucus.', 'fact', 3),
    fc(18, 'Epithelium of the intestine?', 'Columnar.', 'fact', 3),
    fc(19, 'Tissue that stores fat?', 'Adipose.', 'fact', 3),
    fc(20, 'Tendon versus ligament?', 'Tendon: muscle to bone. Ligament: bone to bone.', 'exam-tip', 3),
    fc(21, 'Tissue of the ear and nose tip?', 'Cartilage.', 'fact', 3),
    fc(22, 'Fluid matrix of blood?', 'Plasma.', 'fact', 3),
    fc(23, 'Striated muscle: control?', 'Voluntary.', 'fact', 4),
    fc(24, 'Smooth muscle: stripes and nuclei?', 'No stripes; one nucleus.', 'fact', 4),
    fc(25, 'Cardiac muscle features?', 'Striped, branched, involuntary, never tires.', 'exam-tip', 4),
    fc(26, 'Unit of the nervous system?', 'Neuron.', 'definition', 4),
    fc(27, 'Parts of a neuron?', 'Dendrites, cell body, nucleus, axon, axon terminals.', 'fact', 4),
    fc(28, 'Dendrites receive; axon?', 'Axon carries the impulse away.', 'concept', 4),
    fc(29, 'Why are air sac cells squamous?', 'Thin cells let gases diffuse quickly.', 'concept', 5),
    fc(30, 'Why do xylem vessels suit water transport?', 'Long, hollow, dead tubes joined end to end.', 'concept', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
