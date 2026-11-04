// ISC 11 Biology ch08 Anatomy of Flowering Plants — notes and flashcards.
import { T, unit, PROV } from '../../isc-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Anatomy of Flowering Plants — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Meristematic tissues',
      `**Anatomy** is the study of the internal structure of an organism. Plant growth is localised: it takes place in **meristems**, groups of cells that retain the power of division.

**Characteristics of meristematic cells:** small, thin-walled (primary wall only), closely packed with **no intercellular spaces**, dense cytoplasm, a prominent nucleus and very small or no vacuoles.

**Classification by origin.** **Primary** meristems arise from the embryo and are present from the beginning (apical and intercalary). **Secondary** meristems arise later from permanent tissue that becomes meristematic again (the cambia).

**Classification by position.**
- **Apical meristems** at the tips of roots and shoots: they add **length** (primary growth).
- **Intercalary meristems** between mature tissues, at the bases of leaves and above the nodes of grasses: they add length and allow regrowth of grazed grass.
- **Lateral meristems** (vascular cambium and cork cambium) along the sides of stem and root: they add **girth** (secondary growth).`,
      [kt('Meristem', 'A region of cells that keeps dividing.'), kt('Apical meristem', 'Meristem at the tip of a root or shoot; adds length.'), kt('Intercalary meristem', 'Meristem at the base of an internode or leaf; adds length.'), kt('Lateral meristem', 'Cambium; adds girth.')],
      V.mer,
      [1],
    ),
    sec(
      '2. Permanent tissues',
      `Cells produced by meristems mature and lose the power of division; they form **permanent tissues**.

**Simple tissues** have one kind of cell.
- **Parenchyma** — living cells with **thin cellulose walls**, usually rounded, with intercellular spaces. Found in the cortex, pith, mesophyll and fruits. Functions: storage, photosynthesis (as chlorenchyma), secretion, and buoyancy in water plants (aerenchyma).
- **Collenchyma** — living cells with walls **unevenly thickened at the corners** with cellulose and pectin. Found below the epidermis of dicot stems and in leaf stalks. Function: mechanical support to **growing** parts, with flexibility.
- **Sclerenchyma** — **dead** cells with thick, **lignified** walls and a narrow lumen: **fibres** (long, pointed) and **sclereids** (stone cells; in fruits such as guava and in seed coats). Function: mechanical strength.

**Complex tissues** have more than one kind of cell that work together.
- **Xylem** conducts **water and minerals**. Elements: **tracheids**, **vessels**, **xylem fibres** (all dead) and **xylem parenchyma** (living).
- **Phloem** conducts **food**. Elements: **sieve tube elements** (living, with no nucleus at maturity, sieve plates at their end walls), **companion cells** (living, with a nucleus; control the sieve tube), **phloem parenchyma** and **phloem fibres** (dead).

*Where books differ.* Some books say that phloem parenchyma is absent in most monocots; the notes state that for the monocot stem only.`,
      [kt('Collenchyma', 'Living cells with corners thickened by cellulose and pectin.'), kt('Sclerenchyma', 'Dead cells with thick lignified walls.'), kt('Vessel', 'A dead water-conducting tube of cells joined end to end.'), kt('Companion cell', 'Nucleated living cell beside a sieve tube element.')],
      V.simple,
      [2],
      [V.vasc],
    ),
    sec(
      '3. Tissue systems',
      `Tissues are grouped into three systems by their structure and position.
- **Epidermal tissue system** — the **epidermis** (usually a single layer of closely packed cells, often with a waxy **cuticle**), **stomata** (two guard cells around a pore), **root hairs** (unicellular outgrowths of the epidermis of the root, called **epiblema**) and **trichomes** (hairs on shoots).
- **Ground tissue system** — all tissues except the epidermis and the vascular bundles: **cortex, pericycle, pith and medullary rays** in stems and roots; the **mesophyll** (palisade and spongy parenchyma) in leaves.
- **Vascular tissue system** — **xylem and phloem**; in dicots a strip of **cambium** lies between them in the bundle. Bundles are **radial** (xylem and phloem on different radii, alternating, as in roots) or **conjoint** (xylem and phloem on the same radius, as in stems and leaves); conjoint bundles are **open** (with cambium) or **closed** (without).`,
      [kt('Epidermal system', 'Outer covering with cuticle, stomata, root hairs and trichomes.'), kt('Ground tissue system', 'Everything except epidermis and vascular bundles.'), kt('Conjoint bundle', 'Xylem and phloem on the same radius.'), kt('Radial bundle', 'Xylem and phloem on different radii.')],
      V.vasc,
      [3],
    ),
    sec(
      '4. Internal structure of roots and stems (T.S.)',
      `**Dicot root.** From outside: **epiblema** (with root hairs), **cortex** (thin-walled parenchyma with intercellular spaces), **endodermis** (one layer of barrel-shaped cells with **Casparian strips** of suberin on radial walls), **pericycle** (thin-walled; gives rise to lateral roots and to cambium during secondary growth), **vascular bundles** — radial, with **two to four** xylem arms alternating with phloem patches, with **conjunctive tissue** between them — and a **small or absent pith**. Xylem is **exarch** (protoxylem towards the periphery).

**Monocot root.** The same layers, but **more than six** xylem arms (polyarch) and a **large, well-developed pith**; no secondary growth.

**Dicot stem.** **Epidermis** (with trichomes), **hypodermis** of **collenchyma**, **cortex** of parenchyma, **endodermis** (the starch sheath), **pericycle** (often patches of sclerenchyma over the bundles), **medullary rays** and a large **pith**. The vascular bundles are **in a ring**, **conjoint, collateral and open** (cambium between phloem and xylem), with **endarch** xylem (protoxylem towards the pith).

**Monocot stem.** **Sclerenchymatous hypodermis**; **ground tissue not differentiated** into cortex, pericycle, medullary rays and pith; **many scattered bundles**, smaller and more crowded near the periphery, each **conjoint and closed** (no cambium) and wrapped in a **sclerenchymatous bundle sheath**; **no phloem parenchyma**; often with water-containing cavities (protoxylem lacuna).

| Feature | Dicot root | Monocot root |
|---|---|---|
| Xylem arms | Two to four | More than six |
| Pith | Small or absent | Large |
| Secondary growth | Present | Absent |

| Feature | Dicot stem | Monocot stem |
|---|---|---|
| Bundles | In a ring | Scattered |
| Cambium | Present (open) | Absent (closed) |
| Hypodermis | Collenchyma | Sclerenchyma |
| Pith and medullary rays | Present | Absent |`,
      [kt('Casparian strip', 'A band of suberin on the radial walls of endodermal cells.'), kt('Epiblema', 'The outer layer of the root, with root hairs.'), kt('Open bundle', 'A conjoint bundle with cambium.'), kt('Closed bundle', 'A conjoint bundle without cambium.')],
      V.droot,
      [4],
      [V.mroot, V.dstem, V.mstem],
    ),
    sec(
      '5. Internal structure of leaves (V.S.)',
      `**Dicot (dorsiventral) leaf.** **Upper epidermis** with a cuticle; **mesophyll** of **palisade parenchyma** (one or two layers of tall, closely packed, chloroplast-rich cells under the upper epidermis) and **spongy parenchyma** (loosely arranged, rounded cells with large air spaces); **lower epidermis** with more **stomata**. Each stoma has two bean-shaped **guard cells** and lies over a **sub-stomatal cavity**. **Vascular bundles** are surrounded by a **bundle sheath** of parenchyma; the xylem is towards the upper surface and the phloem towards the lower. Venation is reticulate.

**Monocot (isobilateral) leaf.** Similar on both sides: **stomata on both surfaces** in about equal numbers; **mesophyll not differentiated** into palisade and spongy; large thin-walled **bulliform cells** in groups in the upper epidermis, which help the leaf roll inwards in dry weather by losing water; **parallel venation**, the bundles of similar size with sclerenchyma above and below.

| Feature | Dicot leaf | Monocot leaf |
|---|---|---|
| Mesophyll | Palisade and spongy | Not differentiated |
| Stomata | More below | About equal on both |
| Bulliform cells | Absent | Present |`,
      [kt('Palisade parenchyma', 'Tall, closely packed photosynthetic cells under the upper epidermis.'), kt('Spongy parenchyma', 'Loosely arranged mesophyll cells with air spaces.'), kt('Bulliform cells', 'Large epidermal cells that help a grass leaf to roll.'), kt('Guard cells', 'Pair of cells that surround a stoma.')],
      V.dleaf,
      [5],
      [V.mleaf],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying that lateral meristems add length; they add girth.
- Writing that collenchyma is dead or lignified; it is living, with cellulose and pectin.
- Saying that all xylem elements are dead; the xylem parenchyma lives.
- Saying that sieve tube elements have a nucleus; it is the companion cell that has one.
- Giving the monocot stem a ring of bundles or cambium.
- Placing the pith or cortex in the vascular system; both belong to the ground tissue system.
- Drawing a leaf section with no bundle sheath or with the phloem on the upper side.

**How marks are usually awarded**
- 1-mark subparts: a meristem, an element of xylem or phloem, open or closed, a lettered figure, a give-a-reason.
- 2- and 3-mark questions: parenchyma against collenchyma; xylem against phloem; dicot against monocot stem; the endodermis.
- 5-mark questions in parts: a labelled diagram of a T.S. of a stem, root or leaf, with differences.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is a meristem?', 'A region of cells that keeps dividing.', 'definition', 1),
    fc(2, 'Features of meristematic cells?', 'Small, thin wall, dense cytoplasm, big nucleus, no intercellular spaces.', 'fact', 1),
    fc(3, 'What do apical meristems add?', 'Length.', 'fact', 1),
    fc(4, 'Where is the intercalary meristem?', 'Base of leaves, above the nodes of grasses.', 'fact', 1),
    fc(5, 'What do lateral meristems add?', 'Girth.', 'fact', 1),
    fc(6, 'Name the two lateral meristems.', 'Vascular cambium and cork cambium.', 'fact', 1),
    fc(7, 'Wall of parenchyma?', 'Thin, cellulose; cells living.', 'fact', 2),
    fc(8, 'Wall of collenchyma?', 'Thickened at corners with cellulose and pectin; living.', 'fact', 2),
    fc(9, 'Wall of sclerenchyma?', 'Thick and lignified; dead.', 'fact', 2),
    fc(10, 'Function of collenchyma?', 'Flexible support to growing parts.', 'concept', 2),
    fc(11, 'Two forms of sclerenchyma?', 'Fibres and sclereids (stone cells).', 'fact', 2),
    fc(12, 'Four elements of xylem?', 'Tracheids, vessels, fibres, parenchyma.', 'exam-tip', 2),
    fc(13, 'Four elements of phloem?', 'Sieve tube elements, companion cells, parenchyma, fibres.', 'exam-tip', 2),
    fc(14, 'Which xylem element is living?', 'Xylem parenchyma.', 'fact', 2),
    fc(15, 'Which phloem element is dead?', 'Phloem fibre.', 'fact', 2),
    fc(16, 'Sieve tube element: nucleus?', 'Absent at maturity; companion cell controls it.', 'concept', 2),
    fc(17, 'Three tissue systems?', 'Epidermal, ground, vascular.', 'fact', 3),
    fc(18, 'Parts of the ground tissue system in a stem?', 'Cortex, pericycle, pith, medullary rays.', 'fact', 3),
    fc(19, 'Conjoint versus radial bundle?', 'Xylem and phloem on the same radius versus on different radii.', 'concept', 3),
    fc(20, 'Open bundle?', 'Conjoint with cambium (dicot stem).', 'definition', 3),
    fc(21, 'What are Casparian strips?', 'Suberin bands on radial walls of endodermal cells.', 'fact', 4),
    fc(22, 'Xylem arms in a dicot root?', 'Two to four.', 'fact', 4),
    fc(23, 'Xylem arms in a monocot root?', 'More than six (polyarch).', 'fact', 4),
    fc(24, 'Pith: dicot versus monocot root?', 'Small or absent versus large.', 'concept', 4),
    fc(25, 'Bundles in a dicot stem?', 'In a ring; conjoint and open.', 'fact', 4),
    fc(26, 'Bundles in a monocot stem?', 'Scattered; conjoint and closed.', 'fact', 4),
    fc(27, 'Hypodermis: dicot versus monocot stem?', 'Collenchyma versus sclerenchyma.', 'concept', 4),
    fc(28, 'Two kinds of mesophyll in a dicot leaf?', 'Palisade and spongy parenchyma.', 'fact', 5),
    fc(29, 'Which cells help a grass leaf to roll?', 'Bulliform cells.', 'fact', 5),
    fc(30, 'Stomata in dicot versus monocot leaf?', 'More on the lower surface versus about equal on both.', 'concept', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
