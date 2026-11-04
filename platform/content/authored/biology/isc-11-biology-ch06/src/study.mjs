// ISC 11 Biology ch06 Morphology of Root, Stem and Leaf — notes and flashcards.
import { T, table, unit, PROV } from '../../isc-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Morphology of Root, Stem and Leaf — Notes',
  language: 'en',
  sections: [
    sec(
      '1. The root',
      `**Morphology** is the study of the external form of an organism. In a flowering plant the **root system** develops from the **radicle** of the embryo and the **shoot system** from the **plumule**.

**Types of root systems.** A **tap root system** has the primary root (the radicle's continuation) with its lateral branches, as in mustard and gram (dicots). A **fibrous root system** has many thin roots that arise from the base of the stem after the primary root dies, as in wheat and rice (monocots). **Adventitious roots** arise from parts of the plant other than the radicle, such as the stem or a leaf (the roots of grass, the prop roots of banyan, the roots from the leaf of *Bryophyllum*).

**Regions of a young root (from the tip).** (1) The **root cap**, a thimble-like covering that protects the tip. (2) The **region of meristematic activity**, where cells divide. (3) The **region of elongation**, where cells lengthen and the root grows in length. (4) The **region of maturation**, where cells differentiate; some epidermal cells form **root hairs**, which absorb water and minerals.

**Modifications of roots.**
- *Storage:* **fusiform** (radish), **conical** (carrot), **napiform** (turnip, beetroot), **tuberous** (sweet potato, without a definite shape).
- *Respiration:* **pneumatophores**, upright breathing roots of plants of swampy, tidal soil such as mangroves (*Rhizophora*, *Avicennia*), with pores for gas exchange.
- *Support:* **prop roots** from branches of the banyan; **stilt roots** from the lower nodes of maize, sugarcane and *Pandanus*.

*Where books differ.* Some books list five storage types and treat beet as conical or napiform; the chapter follows the syllabus examples: carrot conical, radish fusiform, turnip napiform and sweet potato tuberous.`,
      [kt('Radicle', 'The embryonic root of a seed.'), kt('Root cap', 'A thimble-like cap that protects the root tip.'), kt('Pneumatophore', 'An upright breathing root of a swamp plant.'), kt('Adventitious root', 'A root that does not arise from the radicle.')],
      V.tip,
      [1],
      [V.rootmods],
    ),
    sec(
      '2. The stem',
      `The stem develops from the **plumule** and bears **nodes** (where leaves arise), **internodes** between them, a **terminal bud** at the tip and an **axillary bud** in the axil of each leaf. Young stems are green; the stem has no root cap.

**Modifications of the stem**
- **Underground** (for storage and perennation): **tuber** (potato: a swollen stem whose **eyes** are axillary buds on nodes); **rhizome** (ginger, turmeric: horizontal, with nodes, scale leaves and buds); **corm** (colocasia, *Crocus*: a short, thick, vertical stem with scale leaves).
- **Sub-aerial** (propagation): **runner** (grass: creeps and roots at nodes), **stolon** (strawberry, jasmine: an arching branch that touches the soil), **sucker** (mint, chrysanthemum: a lateral branch from an underground node that grows upward), **offset** (water hyacinth, *Pistia*: a short, thick branch in aquatic plants).
- **Aerial:** **tendril** (grapevine, *Passiflora*: climbing), **thorn** (*Citrus*, *Bougainvillea*: a stem from an axillary bud, protection), **phylloclade** (*Opuntia*: a green, flattened stem that photosynthesises and stores water).

**Why a potato is a stem and a sweet potato a root.** A potato has nodes (scale leaves), internodes and axillary buds, the **eyes**, that sprout into shoots. A sweet potato has no nodes, internodes or buds, and cannot form shoots from regular buds; it is a tuberous root.

*Where books differ.* Some books place the bulb (onion) among stem modifications; ISC places the **fleshy bulb leaves** in the leaf modifications and so does this chapter, noting that the bulb is a short stem with scale leaves.`,
      [kt('Node', 'The place on a stem where a leaf arises.'), kt('Eye', 'An axillary bud of a potato tuber.'), kt('Phylloclade', 'A green, flattened stem that does the work of leaves.'), kt('Runner', 'A sub-aerial stem that creeps on the soil and roots at its nodes.')],
      V.stemmods,
      [2],
    ),
    sec(
      '3. The leaf: parts, venation, simple and compound leaves, phyllotaxy',
      `A leaf arises at a node and has an axillary bud in its axil. A typical leaf has three parts: the **leaf base**, which may bear two lateral outgrowths, the **stipules** (dicots), or form a **sheath** round the stem (monocots; a swollen **pulvinus** in leguminous plants); the **petiole**, which holds the blade to the light; and the **lamina** (leaf blade), with a central **midrib** and **veins**.

**Venation** is the arrangement of veins: **reticulate** (a network; dicots) and **parallel** (veins side by side; monocots).

**Simple and compound leaves.** In a **simple leaf** the lamina is entire (or incised, but not cut to the midrib). In a **compound leaf** it is cut into **leaflets**. In a **pinnate** compound leaf the leaflets are on a common axis, the **rachis** (neem; rose); in a **palmate** compound leaf they all arise from the tip of the petiole (silk cotton). The **axillary bud** is present in the axil of a compound leaf (at the base of its petiole) but not in the axils of its leaflets, and there is no terminal bud on the rachis; a **branch** has a terminal bud and a bud in the axil of every leaf.

**Phyllotaxy** is the arrangement of leaves on a stem: **alternate** (one leaf at each node: China rose, mustard, sunflower), **opposite** (two leaves at each node: *Calotropis*, guava) and **whorled** (more than two leaves at each node: *Alstonia*).`,
      [kt('Lamina', 'The flat, green blade of a leaf.'), kt('Petiole', 'The stalk of a leaf.'), kt('Venation', 'The pattern of veins in a leaf.'), kt('Phyllotaxy', 'The arrangement of leaves on a stem.'), kt('Rachis', 'The axis that bears the leaflets of a pinnate compound leaf.')],
      V.leaf,
      [3],
      [V.types, V.phyllo],
    ),
    sec(
      '4. Leaf modifications and insectivorous plants',
      `Leaves are modified for functions other than photosynthesis:
- **Support:** leaves or leaflets become **tendrils**, as in the pea.
- **Protection:** leaves become **spines**, as in *Opuntia* (the flat green phylloclade carries on photosynthesis) and in some plants that reduce water loss.
- **Storage:** **fleshy scale leaves** of the **bulb** of onion and garlic (and succulent leaves of *Aloe*) store food and water.
- **Reproduction:** in *Bryophyllum* **adventitious buds** form in the notches of the leaf margin and grow into new plants.
- **Insect trapping:** leaves of **insectivorous plants** are modified into traps.

**Insectivorous plants** grow in soils poor in **nitrogen** and trap insects to digest and absorb nitrogen compounds. The **pitcher plant** (*Nepenthes*) has a leaf blade modified into a pitcher with a lid and digestive fluid; the **Venus flytrap** (*Dionaea*) has a two-lobed hinged blade with trigger hairs that snaps shut; the sundew (*Drosera*) has sticky tentacles; the bladderwort (*Utricularia*) has small suction bladders. They also photosynthesise, so they trap insects for nitrogen, not for energy.`,
      [kt('Tendril', 'A slender, coiling structure that helps a plant to climb.'), kt('Bulb', 'A short stem with fleshy scale leaves, as in onion.'), kt('Insectivorous plant', 'A plant that traps and digests insects to obtain nitrogen.')],
      V.leafmods,
      [4],
      [table(['Modification', 'Function', 'Example'], [['Tendril', 'Support', 'Pea'], ['Spine', 'Protection', 'Opuntia'], ['Fleshy leaf', 'Storage', 'Onion bulb'], ['Buds on margin', 'Reproduction', 'Bryophyllum'], ['Pitcher or trap', 'Capture of insects', 'Nepenthes, Dionaea']], 'Table of leaf modifications with function and example')],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Calling a sweet potato a stem (it has no nodes or buds, so it is a root) or a potato a root.
- Giving a modification without its function.
- Calling the spines of *Opuntia* modified stems; they are modified leaves, and the green flattened stem is the phylloclade.
- Telling a compound leaf from a branch by the number of leaflets instead of by the **buds**.
- Writing "alternate" for two leaves at a node; that is opposite phyllotaxy.
- Saying insectivorous plants trap insects for food energy; they need **nitrogen**.

**How marks are usually awarded**
- 1-mark subparts: a modification, a plant, a function, an adjective for venation or phyllotaxy, a give-a-reason.
- 2- and 3-mark questions: three modifications with plant and function; compound leaf versus branch; parts of a root tip.
- 5-mark questions in parts: a labelled diagram of a root tip or leaf, a table of root or stem modifications, and a reason for a potato being a stem.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Tap root vs fibrous root?', 'Tap: continues the radicle (dicots). Fibrous: many thin roots from the stem base (monocots).', 'concept', 1),
    fc(2, 'What are adventitious roots?', 'Roots that arise from parts other than the radicle.', 'definition', 1),
    fc(3, 'Four regions of a root tip from the tip?', 'Root cap, meristematic, elongation, maturation.', 'fact', 1),
    fc(4, 'Which region bears root hairs?', 'The region of maturation.', 'fact', 1),
    fc(5, 'Which region makes the root longer?', 'The region of elongation.', 'fact', 1),
    fc(6, 'Radish, carrot, turnip, sweet potato: root types?', 'Fusiform, conical, napiform, tuberous.', 'fact', 1),
    fc(7, 'Pneumatophores: function and plant?', 'Respiration in swampy soil; mangroves.', 'fact', 1),
    fc(8, 'Prop root vs stilt root?', 'From branches (banyan) vs from lower nodes (maize, sugarcane).', 'concept', 1),
    fc(9, 'What is a node?', 'The place on a stem where a leaf arises.', 'definition', 2),
    fc(10, 'Which buds does a stem bear?', 'Terminal and axillary buds.', 'fact', 2),
    fc(11, 'Underground stem modifications?', 'Tuber, rhizome, corm.', 'fact', 2),
    fc(12, 'Sub-aerial stem modifications?', 'Runner, stolon, sucker, offset.', 'fact', 2),
    fc(13, 'Aerial stem modifications?', 'Tendril, thorn, phylloclade.', 'fact', 2),
    fc(14, 'Why is a potato a stem?', 'It has nodes and eyes (axillary buds).', 'concept', 2),
    fc(15, 'Why is a sweet potato a root?', 'No nodes, internodes or buds.', 'concept', 2),
    fc(16, 'Ginger and turmeric stems?', 'Rhizomes.', 'fact', 2),
    fc(17, 'Phylloclade example?', 'Opuntia: green, flattened, photosynthetic stem.', 'fact', 2),
    fc(18, 'Three parts of a leaf?', 'Leaf base, petiole, lamina.', 'fact', 3),
    fc(19, 'Reticulate vs parallel venation?', 'Net of veins (dicots) vs veins side by side (monocots).', 'concept', 3),
    fc(20, 'Pinnate vs palmate compound leaf?', 'Leaflets along a rachis vs all from the tip of the petiole.', 'concept', 3),
    fc(21, 'How to tell a compound leaf from a branch?', 'Compound leaf has an axillary bud at the petiole base and no terminal bud; a branch has both kinds.', 'exam-tip', 3),
    fc(22, 'Alternate phyllotaxy?', 'One leaf per node (China rose, mustard).', 'fact', 3),
    fc(23, 'Opposite phyllotaxy?', 'Two leaves per node (guava, Calotropis).', 'fact', 3),
    fc(24, 'Whorled phyllotaxy?', 'More than two leaves per node (Alstonia).', 'fact', 3),
    fc(25, 'What are stipules?', 'Small lateral outgrowths of the leaf base.', 'definition', 3),
    fc(26, 'Leaf tendril: example and function?', 'Pea; support for climbing.', 'fact', 4),
    fc(27, 'Opuntia spines are modified what?', 'Leaves (protection).', 'fact', 4),
    fc(28, 'Fleshy bulb leaves: example and function?', 'Onion, garlic; storage.', 'fact', 4),
    fc(29, 'Reproduction by leaves?', 'Bryophyllum: buds in the notches of the margin.', 'fact', 4),
    fc(30, 'Why do insectivorous plants trap insects?', 'To obtain nitrogen in nitrogen-poor soil.', 'concept', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
