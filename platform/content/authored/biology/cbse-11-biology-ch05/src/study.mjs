// ch05 notes and flashcards.
import { T, unit, PROV, r } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { SOL_TEX } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = [], formulas = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Morphology of Flowering Plants — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Root, stem and leaf',
      `**Root.** The **radicle** of the seed grows into the **primary root**. In most **dicots** it persists as a **tap root** with lateral branches (mustard, gram). In **monocots** it is short-lived and replaced by **fibrous roots** arising from the base of the stem (wheat, rice). Roots arising from any part other than the radicle are **adventitious** (grass, *Monstera*, banyan). Roots absorb water and minerals, anchor the plant, store food and conduct water. Near the tip of a young root are the **root cap** (a protective thimble), the **region of meristematic activity** (small thin-walled dividing cells), the **region of elongation** (cells enlarging, which lengthens the root) and the **region of maturation** (cells differentiate; **root hairs** absorb water and minerals).

**Modified roots.** Storage: the tap root of **carrot** and **turnip** (and the adventitious roots of **sweet potato**). Support: **prop roots** hanging from branches of **banyan**; **stilt roots** from the lower nodes of **maize** and **sugarcane**. Breathing: **pneumatophores**, upright roots with pores, in mangrove plants such as *Rhizophora* growing in swampy soil.

**Stem.** The stem develops from the **plumule**. It has **nodes** (where leaves arise) and **internodes**, and bears **buds**: a **terminal bud** and **axillary buds** in the axils of leaves. It spreads branches, holds leaves, flowers and fruits, conducts water, minerals and photosynthates, and may store food, support, protect or help vegetative propagation. **Modified stems:** underground stems of **potato**, **ginger**, **turmeric**, **zaminkand** and *Colocasia* store food and help the plant survive harsh seasons (the “eyes” of a potato are nodes bearing axillary buds); axillary buds become **tendrils** (watermelon, grapevine, cucumber) for climbing, or **thorns** (*Citrus*, *Bougainvillea*) for protection; in *Opuntia* the stem is flattened, green and fleshy and photosynthesises, with the leaves reduced to spines.

**Leaf.** A leaf arises from a node and bears a bud in its axil. Its three parts are the **leaf base** (with two small **stipules** in many dicots; a **sheath** in monocots; a swollen **pulvinus** in some legumes), the **petiole** and the **lamina**. **Venation** is the arrangement of veins and veinlets: **reticulate** in dicots (mango, mustard), **parallel** in monocots (maize, banana). A **simple** leaf has an undivided lamina (even if incised); in a **compound** leaf the lamina is cut into **leaflets**, **pinnately** along a rachis (neem) or **palmately** from the tip of the petiole (silk cotton). **Phyllotaxy** is the arrangement of leaves on the stem: **alternate** (one leaf per node: china rose, mustard, sunflower), **opposite** (two per node: *Calotropis*, guava) or **whorled** (more than two: *Alstonia*). **Modified leaves:** tendrils (pea), spines (cacti), fleshy storage leaves (onion, garlic) and insect-trapping leaves (pitcher plant, Venus flytrap).`,
      [kt('Adventitious root', 'A root that arises from any part of the plant other than the radicle.'), kt('Pneumatophore', 'An upright breathing root with pores, in mangrove plants of swampy soil.'), kt('Phyllotaxy', 'The pattern of arrangement of leaves on the stem: alternate, opposite or whorled.'), kt('Venation', 'The arrangement of veins and veinlets in the lamina: reticulate or parallel.'), kt('Axillary bud', 'A bud in the axil of a leaf; it can become a branch, flower, tendril or thorn.')],
      V.zones,
      [1],
      [V.roots, V.rootmods, V.stemmods, V.leaf, V.venation, V.phyllo, V.leafmods],
    ),
    sec(
      '2. Inflorescence, flower, fruit and seed',
      `**Inflorescence.** The arrangement of flowers on the floral axis. In a **racemose** inflorescence the main axis continues to grow and flowers are borne laterally in **acropetal** succession (older at the base, younger near the tip), as in mustard. In a **cymose** inflorescence the main axis ends in a flower, so growth is limited, and the flowers are in **basipetal** order (youngest at the base).

**Flower.** The reproductive unit. It arises on a **pedicel** and a swollen **thalamus** and usually has four whorls. The **calyx** (sepals) protects the bud; the **corolla** (petals) attracts insects; the **androecium** is made of **stamens**, each with a **filament** and an **anther** that makes pollen; the **gynoecium** is made of **carpels**, each with a **stigma**, **style** and **ovary** containing **ovules**. A flower is **actinomorphic** if it can be divided into two equal radial halves along any vertical plane through the centre (mustard, chilli) and **zygomorphic** if only along one plane (pea, gulmohur); it is **bisexual** or **unisexual**. According to the position of the ovary, a flower is **hypogynous** (ovary superior; mustard, china rose, brinjal), **perigynous** (ovary half inferior, on the rim of a cup-shaped thalamus; plum, rose, peach) or **epigynous** (ovary inferior; guava, cucumber). **Aestivation** is the arrangement of sepals or petals in the bud: **valvate** (*Calotropis*), **twisted** (china rose), **imbricate** (*Cassia*, gulmohur) or **vexillary** (pea, bean). Stamens may be united: **monoadelphous** (china rose), **diadelphous** (pea) or **polyadelphous** (*Citrus*), or attached to the petals (**epipetalous**). Carpels may be free (**apocarpous**) or united (**syncarpous**). **Placentation** is the arrangement of ovules on the placenta: **marginal** (pea), **axile** (china rose, tomato, lemon), **parietal** (mustard), **free central** (*Dianthus*, primrose) and **basal** (sunflower, marigold).

**Fruit.** A fruit is a **mature ovary**, usually formed after fertilisation. The fruit wall is the **pericarp**, with an **epicarp**, **mesocarp** and **endocarp**. In a **drupe** (mango, coconut) the mesocarp is fleshy or fibrous and the endocarp is stony, and the fruit has a single seed. Fruits developing without fertilisation are **parthenocarpic** (banana).

**Seed.** A seed develops from the ovule. A **dicot seed** such as bean has a **seed coat** (outer **testa**, inner **tegmen**), a **hilum** (scar of attachment), a tiny **micropyle** and an embryo of an **embryonal axis** (**radicle** and **plumule**) and **two cotyledons** that store food; most dicot seeds have no endosperm in the mature seed (castor is endospermous). A **monocot grain** such as maize has a **membranous seed coat fused with the fruit wall**, a large **endosperm** bounded by a proteinaceous **aleurone layer**, a single **scutellum** (the cotyledon) on one side of the embryonal axis, a **coleoptile** covering the plumule and a **coleorhiza** covering the radicle.`,
      [kt('Raceme', 'Racemose inflorescence with a growing main axis; flowers acropetal.'), kt('Aestivation', 'Arrangement of sepals or petals in the floral bud.'), kt('Placentation', 'Arrangement of ovules within the ovary.'), kt('Drupe', 'A one-seeded fruit with fleshy mesocarp and stony endocarp, as in mango.'), kt('Scutellum', 'The single shield-shaped cotyledon of a monocot grain such as maize.')],
      V.flower,
      [2],
      [V.inflor, V.whorls, V.ovarypos, V.plac, V.fruit, V.seeds, V.seedtab],
    ),
    sec(
      '3. Family Solanaceae',
      `The family **Solanaceae** includes **potato** (*Solanum tuberosum*), **brinjal** (*S. melongena*), **tomato**, **chilli**, **tobacco**, **ashwagandha** (*Withania somnifera*), **belladonna** (*Atropa belladonna*) and the ornamental **petunia**.

**Vegetative characters.** Plants are mostly **herbs, shrubs and small trees**. The stem is herbaceous, rarely woody, and aerial or underground (potato). Leaves are **alternate, simple**, rarely pinnately compound, **without stipules**, with **reticulate venation**.

**Floral characters.** The inflorescence is solitary, axillary or cymose, as in *Solanum*. The flower is **bisexual** and **actinomorphic**. The **calyx** has **five sepals, united** (gamosepalous), persistent, with valvate aestivation; the **corolla** has **five petals, united**, with valvate aestivation; the **androecium** has **five stamens, epipetalous**; the **gynoecium** is **bicarpellary, syncarpous**, with a **superior, two-chambered ovary** whose swollen placentae bear many ovules (axile placentation). The **fruit** is a **berry or capsule**; the **seeds** are many and endospermous.

**Floral formula.** A floral formula is a short code for a flower: **Br** bracteate, **⊕** actinomorphic, **%** zygomorphic, **⚥** bisexual, **K** calyx, **C** corolla, **A** androecium, **G** gynoecium; the number of members follows the letter; **brackets** show that members of a whorl are united (cohesion); a **line below G** shows a superior ovary and a **line above G** an inferior ovary; adhesion of whorls (as in epipetalous stamens) is indicated by a line drawn above the letters of the fused whorls. For Solanaceae the formula is ⊕ ⚥ K(5) C(5) A5 G̲(2): the flower has five united sepals, five united petals, five stamens and two united carpels with a superior ovary.

**Floral diagram.** A transverse view of the flower bud showing the number, arrangement and fusion of the parts: the **mother axis** at the top, then the calyx, corolla, stamens and the gynoecium in the centre. In Solanaceae the five stamens alternate with the petals and are joined to them, and the two carpels are slightly oblique.`,
      [kt('Floral formula', 'A short symbolic description of a flower: symmetry, sex, number and fusion of members of each whorl, and position of the ovary.'), kt('Floral diagram', 'A transverse plan of the flower bud showing the mother axis and the number, arrangement and fusion of the floral members.'), kt('Epipetalous', 'Stamens attached to the petals.'), kt('Berry', 'A fleshy fruit with many seeds; tomato and brinjal are berries.')],
      V.solflor,
      [3],
      [V.solfeat, V.symbols],
      [{ label: 'Floral formula of Solanaceae', latex: SOL_TEX }],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Calling a thorn a modified leaf (a thorn comes from an axillary bud, so it is a stem; spines are leaves).
- Writing that all monocot seeds lack endosperm, or that a bean has a large endosperm (the mature bean seed has none; maize has a large one).
- Mixing racemose and cymose order: racemose is acropetal (youngest at the tip); cymose is basipetal.
- Putting the mother axis at the bottom of a floral diagram, or leaving the stamens off the petals in Solanaceae.
- Omitting the line below G for a superior ovary, or forgetting that brackets mean fusion.
- Treating a compound leaf’s leaflet as a leaf (the bud is in the axil of the whole leaf, not of a leaflet).

**How marks are usually awarded**
- 1-mark items: a root modification example, venation, a placentation type, a part of the seed.
- 2–3-mark answers: tap versus fibrous roots; phyllotaxy; racemose versus cymose; ovary position; aestivation; the family’s floral formula.
- 5-mark answers: modifications of root, stem and leaf; parts of a flower; structure of dicot and monocot seeds; Solanaceae with formula and diagram.
- Numericals: counting leaves, flowers, ovules and seeds — show each step.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Tap root versus fibrous roots?', 'Tap root: radicle grows into the primary root (dicots). Fibrous: many roots from the stem base (monocots).', 'concept', 1),
    fc(2, 'What are adventitious roots?', 'Roots arising from parts other than the radicle, such as grass and banyan prop roots.', 'definition', 1),
    fc(3, 'Regions of the root tip, from the tip upwards?', 'Root cap, meristematic region, region of elongation, region of maturation.', 'fact', 1),
    fc(4, 'Where do root hairs arise?', 'In the region of maturation.', 'fact', 1),
    fc(5, 'Prop roots versus stilt roots?', 'Prop: from branches (banyan). Stilt: from lower nodes of the stem (maize, sugarcane).', 'concept', 1),
    fc(6, 'What are pneumatophores?', 'Upright breathing roots with pores in mangrove plants such as Rhizophora.', 'definition', 1),
    fc(7, 'Which part of the embryo forms the stem?', 'The plumule.', 'fact', 1),
    fc(8, 'Underground stems that store food?', 'Potato, ginger, turmeric, zaminkand, Colocasia.', 'fact', 1),
    fc(9, 'Tendrils and thorns come from which stem structure?', 'Axillary buds.', 'fact', 1),
    fc(10, 'Which plant has a flattened, green, fleshy stem?', 'Opuntia; its leaves are reduced to spines.', 'fact', 1),
    fc(11, 'Three parts of a leaf?', 'Leaf base, petiole, lamina.', 'fact', 1),
    fc(12, 'Reticulate versus parallel venation?', 'Reticulate: network, dicots. Parallel: veins side by side, monocots.', 'concept', 1),
    fc(13, 'Pinnately versus palmately compound leaf?', 'Leaflets along a rachis (neem) versus from one point (silk cotton).', 'concept', 1),
    fc(14, 'Three kinds of phyllotaxy?', 'Alternate (one per node), opposite (two), whorled (more than two).', 'fact', 1),
    fc(15, 'Pulvinus?', 'Swollen leaf base in some leguminous plants.', 'definition', 1),
    fc(16, 'Racemose versus cymose inflorescence?', 'Racemose: axis grows, acropetal. Cymose: axis ends in a flower, basipetal.', 'concept', 2),
    fc(17, 'Four whorls of a flower?', 'Calyx, corolla, androecium, gynoecium.', 'fact', 2),
    fc(18, 'Actinomorphic versus zygomorphic?', 'Radial symmetry (mustard) versus one plane only (pea).', 'concept', 2),
    fc(19, 'Hypogynous, perigynous, epigynous?', 'Ovary superior, half inferior, inferior: mustard, plum, guava.', 'concept', 2),
    fc(20, 'Types of aestivation?', 'Valvate, twisted, imbricate, vexillary.', 'fact', 2),
    fc(21, 'Monoadelphous versus diadelphous?', 'Stamens united in one bundle (china rose) versus two bundles (pea).', 'concept', 2),
    fc(22, 'Five types of placentation?', 'Marginal, axile, parietal, free central, basal.', 'fact', 2),
    fc(23, 'Axile placentation example?', 'Tomato, lemon, china rose.', 'fact', 2),
    fc(24, 'Layers of the pericarp?', 'Epicarp, mesocarp, endocarp.', 'fact', 2),
    fc(25, 'What is a drupe?', 'One-seeded fruit with fleshy mesocarp and stony endocarp, as in mango.', 'definition', 2),
    fc(26, 'Parthenocarpic fruit?', 'A fruit formed without fertilisation, as in banana.', 'definition', 2),
    fc(27, 'Parts of a bean embryo?', 'Embryonal axis (radicle and plumule) and two cotyledons.', 'fact', 2),
    fc(28, 'Special parts of a maize grain?', 'Aleurone layer, scutellum, coleoptile and coleorhiza.', 'fact', 2),
    fc(29, 'Floral formula of Solanaceae?', 'Actinomorphic, bisexual: K(5) C(5) A5 G(2) with the ovary superior.', 'formula', 3),
    fc(30, 'What do brackets and a line below G show?', 'Brackets: united members. Line below G: superior ovary.', 'concept', 3),
    fc(31, 'Fruit and seed of Solanaceae?', 'Berry or capsule with many endospermous seeds.', 'fact', 3),
    fc(32, 'Name five Solanaceae plants.', 'Potato, tomato, brinjal, chilli, tobacco (also ashwagandha, belladonna, petunia).', 'fact', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
void r;
