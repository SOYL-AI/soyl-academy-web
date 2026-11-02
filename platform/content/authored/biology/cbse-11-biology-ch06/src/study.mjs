// ch06 notes and flashcards.
import { T, unit, PROV } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = [], formulas = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Anatomy of Flowering Plants — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Plant tissues and tissue systems',
      `Anatomy is the study of internal structure. A **tissue** is a group of similar cells, usually of common origin, that perform a common function. This chapter deals with the **primary** structure of the plant body; secondary growth is not part of this syllabus.

**Meristematic tissues.** Cells divide continually; they are small, thin-walled and rich in cytoplasm. **Apical meristems** at the tips of roots and shoots give **primary growth** in length. **Intercalary meristems**, at the base of leaves or internodes (grasses), allow regrowth after grazing or mowing.

**Permanent tissues** have stopped dividing and are **simple** (one kind of cell) or **complex** (more than one kind).
- **Parenchyma:** living, thin-walled cellulose cells, roundish, with small intercellular spaces; photosynthesis (chlorenchyma), storage and secretion.
- **Collenchyma:** living, with **thickened corners** (cellulose, hemicellulose, pectin); may contain chloroplasts; supports young stems and petioles; found beneath the epidermis of dicot stems.
- **Sclerenchyma:** dead cells with thick **lignified** walls and a narrow lumen; **fibres** (long, pointed) and **sclereids** (spherical, oval or cylindrical; seen in fruit walls of nuts, pulp of guava, pear and sapota, seed coats of legumes and in tea leaves); give mechanical strength.
- **Xylem** (complex) conducts **water and minerals** and supports: **tracheids**, **vessels**, **xylem fibres** (dead, lignified) and **xylem parenchyma** (living). The first-formed xylem is **protoxylem** and the later is **metaxylem**. In stems the protoxylem lies towards the pith (**endarch**); in roots it lies towards the periphery (**exarch**).
- **Phloem** (complex) conducts **food**: **sieve tube elements** (long tubes with perforated end walls, the sieve plates; peripheral cytoplasm and no nucleus at maturity), **companion cells** (nucleated; keep the sieve tube functioning), **phloem parenchyma** (absent in most monocots) and **phloem fibres** (bast fibres; dead, lignified).

**Tissue systems.** (1) **Epidermal system:** the epidermis (a single layer, covered by a waxy **cuticle** in aerial parts), **stomata** (a pore bounded by two **guard cells**, bean-shaped in dicots and dumbbell-shaped in grasses, sometimes with subsidiary cells), **root hairs** (unicellular outgrowths that absorb water and minerals) and **trichomes** (multicellular hairs on stems that reduce water loss). (2) **Ground tissue system:** all tissues except epidermis and vascular bundles: cortex, pericycle, pith and medullary rays in stems and roots; mesophyll in leaves. (3) **Vascular system:** xylem and phloem (and, in dicot stems, cambium). **Radial** bundles (roots) have xylem and phloem on different radii; **conjoint** bundles (stems and leaves) have them on the same radius, **open** if cambium lies between them (dicot stems) and **closed** if not (monocot stems).`,
      [kt('Meristem', 'Tissue whose cells divide continually: apical at root and shoot tips, intercalary at the base of leaves or internodes.'), kt('Sclereid', 'A dead, thick-walled sclerenchyma cell of rounded shape, as in the pulp of pear and guava.'), kt('Conjoint bundle', 'A vascular bundle with xylem and phloem on the same radius, as in stems and leaves.'), kt('Open bundle', 'A conjoint bundle with cambium between xylem and phloem, as in dicot stems.'), kt('Endarch', 'Xylem with the protoxylem towards the pith, as in stems.')],
      V.tissues,
      [1],
      [V.meristem, V.simple, V.xylem, V.phloem, V.guard, V.systems, V.bundles],
    ),
    sec(
      '2. Anatomy of dicot and monocot root, stem and leaf',
      `**Dicot root** (e.g. sunflower), transverse section from outside: the **epidermis** with unicellular **root hairs**; the **cortex**, several layers of thin-walled parenchyma; the **endodermis**, a single layer of barrel-shaped cells with **Casparian strips** of suberin on their walls; the **pericycle**, a few layers of thick-walled parenchyma from which lateral roots arise; a **small pith**; and **conjunctive tissue** between the xylem and phloem. There are usually **two to four** patches of **exarch xylem** (diarch to tetrarch) alternating with phloem patches (radial bundles). **Monocot root:** the same plan, but **more than six** xylem bundles (**polyarch**) and a **large, well-developed pith**.

**Dicot stem** (sunflower): epidermis with cuticle and trichomes, a few stomata; **hypodermis** of collenchyma; **cortex** of parenchyma with a few layers; **endodermis** (starch sheath) as the innermost cortical layer; **pericycle** as semilunar patches of sclerenchyma over the bundles; **medullary rays** between the bundles; **vascular bundles in a ring**, **conjoint, open and endarch**; a large **pith** of rounded parenchyma. **Monocot stem** (maize): **sclerenchymatous hypodermis**; a large, **undifferentiated ground tissue** of parenchyma; **many scattered** vascular bundles, each surrounded by a **sclerenchymatous bundle sheath**; bundles **conjoint and closed**, often with a **water-containing cavity**; **phloem parenchyma absent**; smaller and more numerous bundles near the periphery.

**Dicot leaf** (**dorsiventral**): **upper and lower epidermis** with cuticle, with **more stomata on the lower** surface; **mesophyll** differentiated into **palisade parenchyma** (adaxial, elongated cells arranged vertically, chloroplast-rich) and **spongy parenchyma** (abaxial, oval or round, loosely arranged, with large air spaces and connecting to the stomata); **vascular bundles** in the veins and midrib, each surrounded by a thick-walled **bundle sheath**; **xylem towards the upper** and **phloem towards the lower** side. The **monocot leaf** is **isobilateral**: stomata are present on **both** surfaces in about equal numbers, the mesophyll is **not differentiated**, vascular bundles are nearly the same size (parallel venation), and the upper epidermis has **bulliform cells** (large, empty, colourless) that help the leaf roll inwards to minimise water loss.`,
      [kt('Casparian strip', 'A band of suberin on the radial and transverse walls of endodermal cells of the root.'), kt('Pericycle', 'Layer inside the endodermis of the root; lateral roots arise from it.'), kt('Dorsiventral leaf', 'A leaf whose upper and lower sides differ; mesophyll is palisade above and spongy below.'), kt('Isobilateral leaf', 'A leaf (usually monocot) with stomata on both surfaces and undifferentiated mesophyll.'), kt('Bulliform cell', 'A large, empty, colourless cell of the upper epidermis in grass leaves that helps the leaf roll in dry weather.')],
      V.dicotstem,
      [2],
      [V.dicotroot, V.monoroot, V.monostem, V.leaf, V.roots, V.stems, V.leaves],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying collenchyma is dead or lignified (it is living, with corners thickened by cellulose and pectin).
- Writing that phloem fibres or companion cells conduct food (the sieve tube elements conduct; the others help or support).
- Placing xylem outside the phloem in a conjoint bundle (phloem is outside, towards the periphery, in a stem).
- Calling the dicot stem bundle closed (it has cambium, so it is open).
- Giving a small pith for a monocot root (it is large, and the xylem is polyarch).
- Putting palisade tissue towards the lower surface of a dicot leaf.

**How marks are usually awarded**
- 1-mark items: a tissue and its living or dead nature, shape of guard cells, type of vascular bundle.
- 2–3-mark answers: apical and intercalary meristems; xylem and phloem elements; differences between dicot and monocot roots or stems.
- 5-mark answers: the three simple tissues; tissue systems; a labelled section of a dicot stem, a monocot stem or a dicot leaf.
- Numericals: real size from magnification, stomatal density, bundle counts, layer thickness — show each step.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is a tissue?', 'A group of similar cells, usually of common origin, performing a common function.', 'definition', 1),
    fc(2, 'Apical versus intercalary meristem?', 'Apical: tips of roots and shoots. Intercalary: base of leaves or internodes, as in grasses.', 'concept', 1),
    fc(3, 'Three simple permanent tissues?', 'Parenchyma, collenchyma, sclerenchyma.', 'fact', 1),
    fc(4, 'Functions of parenchyma?', 'Photosynthesis, storage and secretion.', 'fact', 1),
    fc(5, 'What makes collenchyma special?', 'Living cells with corners thickened by cellulose, hemicellulose and pectin; support young organs.', 'concept', 1),
    fc(6, 'What are sclereids?', 'Dead, rounded, thick-walled cells in nut shells, guava and pear pulp, seed coats.', 'definition', 1),
    fc(7, 'Sclerenchyma: living or dead?', 'Dead, with thick lignified walls and a narrow lumen.', 'fact', 1),
    fc(8, 'Elements of xylem?', 'Tracheids, vessels, xylem fibres, xylem parenchyma.', 'fact', 1),
    fc(9, 'Which xylem element is living?', 'Xylem parenchyma.', 'fact', 1),
    fc(10, 'Endarch versus exarch?', 'Protoxylem towards pith (stem) versus towards the periphery (root).', 'concept', 1),
    fc(11, 'Elements of phloem?', 'Sieve tube elements, companion cells, phloem parenchyma, phloem fibres.', 'fact', 1),
    fc(12, 'What is special about sieve tube elements?', 'Perforated end walls (sieve plates); no nucleus at maturity; helped by companion cells.', 'concept', 1),
    fc(13, 'Which phloem element is absent in most monocots?', 'Phloem parenchyma.', 'fact', 1),
    fc(14, 'Three tissue systems?', 'Epidermal, ground, vascular.', 'fact', 1),
    fc(15, 'Guard cell shape in dicots and grasses?', 'Bean-shaped in dicots; dumbbell-shaped in grasses.', 'fact', 1),
    fc(16, 'Root hairs and trichomes?', 'Root hairs are epidermal outgrowths absorbing water; trichomes are hairs on stems that cut water loss.', 'concept', 1),
    fc(17, 'What makes up the ground tissue?', 'Everything except epidermis and vascular bundles: cortex, pericycle, pith, medullary rays, mesophyll.', 'fact', 1),
    fc(18, 'Radial, conjoint open, conjoint closed?', 'Roots; dicot stem (cambium); monocot stem (no cambium).', 'concept', 1),
    fc(19, 'Endodermis of the root?', 'Single layer of barrel-shaped cells with Casparian strips of suberin.', 'fact', 2),
    fc(20, 'Role of the pericycle in a root?', 'Lateral roots arise from it.', 'fact', 2),
    fc(21, 'Dicot versus monocot root?', 'Two to four xylem patches and a small pith versus more than six (polyarch) and a large pith.', 'concept', 2),
    fc(22, 'Hypodermis in dicot and monocot stems?', 'Collenchymatous in dicot; sclerenchymatous in monocot.', 'concept', 2),
    fc(23, 'Arrangement of bundles in dicot stem?', 'A ring of conjoint, open, endarch bundles.', 'fact', 2),
    fc(24, 'What are medullary rays?', 'Parenchyma between vascular bundles in dicot stems and roots.', 'definition', 2),
    fc(25, 'Features of the monocot stem?', 'Scattered closed bundles with sclerenchymatous sheaths; no phloem parenchyma; undifferentiated ground tissue.', 'concept', 2),
    fc(26, 'Dorsiventral leaf?', 'Palisade above, spongy below; more stomata on the lower side; dicot.', 'concept', 2),
    fc(27, 'Where does palisade parenchyma lie?', 'Just below the upper epidermis; tall, tightly packed, chloroplast-rich.', 'fact', 2),
    fc(28, 'Isobilateral leaf?', 'Stomata on both surfaces, mesophyll not differentiated; monocot.', 'concept', 2),
    fc(29, 'What are bulliform cells?', 'Large empty colourless cells of the upper epidermis in grasses; help the leaf roll in dry weather.', 'definition', 2),
    fc(30, 'In a leaf vein, which side faces up?', 'Xylem faces the upper side; phloem faces the lower side.', 'fact', 2),
    fc(31, 'Bundle sheath of a leaf?', 'A layer of thick-walled cells around each vascular bundle.', 'fact', 2),
  ],
  status: 'draft',
  provenance: PROV,
};
