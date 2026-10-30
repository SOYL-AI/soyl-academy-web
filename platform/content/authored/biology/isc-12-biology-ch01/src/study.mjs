// ISC 12 Biology ch01 notes and flashcards.
import { T, table, flow, unit, PROV } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Sexual Reproduction in Flowering Plants: Pre-fertilisation — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Stamen, microsporangium and pollen grain',
      `**Flower.** The site of sexual reproduction in angiosperms. The **androecium** (whorl of stamens) is the male reproductive organ and the **gynoecium** (pistil) the female.

**Stamen.** A long, slender **filament** and a terminal, usually **bilobed** anther. Each lobe has two **thecae** (dithecous), so a typical anther is **tetrasporangiate**: four **microsporangia** at the corners, which develop into **pollen sacs**.

**Wall of the microsporangium** (outside to inside):
- **Epidermis** — protection.
- **Endothecium** — fibrous thickenings help in **dehiscence** of the anther.
- **Middle layers** (two or three) — protection; degenerate later.
- **Tapetum** — innermost; **nourishes** the developing pollen grains; cells have dense cytoplasm and usually **more than one nucleus**.

**Microsporogenesis.** Cells of the **sporogenous tissue** act as **pollen (microspore) mother cells, PMC (2n)**. Each divides by **meiosis** to form a **microspore tetrad (n)**. As the anther matures and dehydrates, the microspores dissociate and develop into **pollen grains**.

**Pollen grain.** Usually spherical, 25–50 µm across, with two wall layers:
- **Exine** of **sporopollenin**, one of the most resistant organic materials known: it withstands high temperatures and strong acids and alkalis, and no enzyme is known to degrade it — so pollen is well preserved as **fossils**. **Germ pores** are apertures where sporopollenin is absent.
- **Intine**: thin, continuous, of **cellulose and pectin**.

The mature pollen grain contains a large **vegetative cell** (abundant food reserve, large irregular nucleus) and a small, spindle-shaped **generative cell** floating in its cytoplasm. In **over 60 percent** of angiosperms pollen is shed at this **2-celled** stage; in the rest, the generative cell divides mitotically to give **two male gametes** before shedding (**3-celled** stage).

**Viability and economic importance.**
- Viability: about **30 minutes** in rice and wheat; **months** in some members of Rosaceae, Leguminosae and Solanaceae.
- **Pollen banks**: pollen stored for years in **liquid nitrogen (about −196 °C)** for crop-breeding programmes.
- **Allergy**: pollen of many species (e.g. **Parthenium**, carrot grass, which came to India as a contaminant with imported wheat) causes chronic respiratory disorders such as asthma and bronchitis.
- **Food supplements**: pollen is rich in nutrients; pollen tablets and syrups are marketed.`,
      [kt('Microsporangium', 'A pollen sac of the anther; a typical anther has four.'), kt('Tapetum', 'The innermost wall layer of the microsporangium, which nourishes the developing pollen grains.'), kt('Microsporogenesis', 'Formation of microspores from a pollen mother cell by meiosis.'), kt('Sporopollenin', 'The highly resistant material of the exine.'), kt('Germ pore', 'An aperture in the exine without sporopollenin, through which the pollen tube emerges.')],
      V.anther,
      [1],
      [V.pollen],
    ),
    sec(
      '2. Pistil, megasporangium and embryo sac',
      `**Pistil.** Stigma (landing platform for pollen), style (elongated slender part) and ovary (swollen base). Inside the ovary cavity (**locule**) ovules arise from the **placenta**. A gynoecium may be **monocarpellary** or **multicarpellary**, with carpels free (**apocarpous**, e.g. Michelia) or fused (**syncarpous**, e.g. Papaver).

**Ovule (megasporangium).** Attached to the placenta by the **funicle**; the junction of ovule and funicle is the **hilum**. One or two protective **integuments** cover the ovule except at the **micropyle**. Opposite the micropyle is the **chalaza**, the basal part. The **nucellus**, a mass of cells with abundant food reserve, is enclosed by the integuments; it contains the **embryo sac** (female gametophyte). The common angiosperm ovule is **anatropous** (inverted).

**Megasporogenesis.** One **megaspore mother cell (MMC, 2n)**, large with dense cytoplasm and a prominent nucleus, differentiates in the **micropylar region** of the nucellus. It undergoes **meiosis** to form **four megaspores (n)**. In most flowering plants **one is functional** and **three degenerate**. Formation of the embryo sac from a **single megaspore** is called **monosporic** development.

**Female gametophyte.** The nucleus of the functional megaspore divides **mitotically** to form two nuclei, which move to opposite poles (**2-nucleate** embryo sac). Two more **free-nuclear** divisions at each pole give **4-nucleate** and then **8-nucleate** stages; cell walls form only after the 8-nucleate stage.
- **Micropylar end:** the **egg apparatus** — two **synergids** and one **egg cell**. Synergids have **filiform apparatus**, special cellular thickenings that guide the pollen tube into a synergid.
- **Chalazal end:** three **antipodals**.
- **Centre:** the large **central cell** with **two polar nuclei**.
So a typical mature embryo sac is **8-nucleate and 7-celled**. All its nuclei are **haploid**.`,
      [kt('Megasporogenesis', 'Formation of megaspores from the megaspore mother cell by meiosis.'), kt('Monosporic development', 'Formation of the embryo sac from a single functional megaspore.'), kt('Free-nuclear division', 'Nuclear division not followed immediately by cell wall formation.'), kt('Filiform apparatus', 'Cellular thickenings at the micropylar tip of the synergids that guide the pollen tube.'), kt('Anatropous ovule', 'An inverted ovule in which the micropyle lies close to the funicle.')],
      V.ovule,
      [2],
      [V.sac],
    ),
    sec(
      '3. Pollination: kinds and agencies',
      `**Pollination** is the transfer of pollen grains from the anther to the stigma of a pistil.

**Kinds by source of pollen:**
- **Autogamy** — to the stigma of the **same flower**. Complete autogamy is rare in open flowers, as it needs synchrony of pollen release and stigma receptivity and close anthers and stigma. **Chasmogamous** flowers have exposed anthers and stigma; **cleistogamous** flowers never open, so they are invariably autogamous and give **assured seed set** even without pollinators (e.g. **Viola** (common pansy), **Oxalis**, **Commelina**, which produce both kinds).
- **Geitonogamy** — to another flower of the **same plant**: functionally cross-pollination (involves an agent) but **genetically similar to autogamy**.
- **Xenogamy** — to the stigma of a **different plant**: brings **genetically different** pollen.

**Agencies.**
- **Wind (anemophily):** light, non-sticky pollen produced in large numbers; well-exposed stamens; large, often feathery stigma to trap pollen; usually a **single ovule** in each ovary; numerous flowers packed into an inflorescence (the corn cob’s **tassels** are stigmas and styles); common in grasses.
- **Water (hydrophily):** rare, about **30 genera**, mostly monocots: **Vallisneria**, **Hydrilla** (fresh water), **Zostera** (marine sea grass). In **Vallisneria** female flowers reach the surface on long stalks and male flowers, released on the surface, are carried passively to them. In sea grasses, female flowers stay submerged and **long, ribbon-like** pollen grains are carried in the water; pollen of water-pollinated species has a **mucilaginous** covering against wetting. Not all aquatic plants use water: water hyacinth and water lily are pollinated by insects or wind.
- **Animals (zoophily):** bees, butterflies, flies, beetles, wasps, ants, moths, birds (sunbirds, hummingbirds), bats, some primates and reptiles. Insects, especially **bees**, dominate. Flowers are **large, colourful, fragrant** and rich in **nectar**; small flowers are clustered. Pollen is generally **sticky**. **Floral rewards** are nectar and pollen. **Amorphophallus** (tallest flower, about 6 feet) and **Yucca** with its moth show flowers that offer **safe places to lay eggs**. **Pollen/nectar robbers** consume rewards without pollinating.

**Advantages.** Self-pollination: needs no agent, seed set assured, maintains purity of line, less waste of pollen. Cross-pollination: produces **genetic variation**, healthier and more vigorous offspring, and adaptability; continued self-pollination results in **inbreeding depression**.`,
      [kt('Autogamy', 'Transfer of pollen to the stigma of the same flower.'), kt('Geitonogamy', 'Transfer of pollen to another flower of the same plant.'), kt('Xenogamy', 'Transfer of pollen to the stigma of a flower on a different plant.'), kt('Cleistogamy', 'Pollination in flowers that never open.'), kt('Inbreeding depression', 'Loss of vigour and fertility after continued self-pollination.')],
      V.poll,
      [3],
      [table(['Agent', 'Pollen', 'Stigma', 'Example'], [['Wind', 'Light, dry, abundant', 'Large, feathery, exposed', 'Grasses, maize'], ['Water', 'Long, ribbon-like, mucilage-coated', 'Submerged or at surface', 'Vallisneria, Hydrilla, Zostera'], ['Insects', 'Sticky, fewer', 'Sticky, inside flower', 'Most bright, scented flowers']], 'Table of pollen and stigma features for three pollinating agents')],
    ),
    sec(
      '4. Outbreeding devices, pollen–pistil interaction and artificial hybridisation',
      `**Outbreeding devices** (contrivances that discourage self-pollination):
1. **Dichogamy** — pollen release and stigma receptivity are **not synchronised**: **protandry** (anthers mature first) or **protogyny** (stigma receptive first).
2. **Herkogamy** — anther and stigma are placed at **different positions**, so pollen cannot reach the stigma of the same flower.
3. **Self-incompatibility** — a **genetic** mechanism that prevents self-pollen (from the same flower or other flowers of the same plant) from **germinating** or its tube from **growing** in the pistil.
4. **Unisexual flowers** — **monoecious** plants (male and female flowers on the same plant: **castor, maize**) prevent **autogamy but not geitonogamy**; **dioecious** plants (male and female flowers on different plants: **papaya**) prevent **both**.

**Pollen–pistil interaction.** Pollination does not guarantee the right pollen. The pistil **recognises** compatible pollen of the same species and **rejects** the rest by preventing germination on the stigma or tube growth in the style. Recognition is mediated by **chemical components** of the pollen interacting with those of the pistil. Compatible pollen germinates to produce a **pollen tube** through one of the **germ pores**; the contents of the pollen grain move into the tube, which grows through the stigma and style to reach the ovary. In plants that shed 2-celled pollen, the generative cell divides into two male gametes during tube growth. The tube enters the ovule through the **micropyle** and then a **synergid**, guided by the **filiform apparatus**. All events from pollen deposition to tube entry are **pollen–pistil interaction**; understanding them helps breeders manipulate crosses, even incompatible ones.

**Artificial hybridisation** — crossing chosen parents in crop improvement:
- **Emasculation**: removing the anthers from the flower **bud** of a bisexual female parent **before** they dehisce, using forceps.
- **Bagging**: covering the emasculated flower with a bag of suitable size, usually **butter paper**, to prevent contamination by unwanted pollen.
- When the stigma becomes **receptive**, mature pollen from the chosen male parent is dusted on it, and the flower is **rebagged** to let the fruit develop.
- If the female parent bears **unisexual flowers**, emasculation is not needed: female buds are simply bagged before they open.`,
      [kt('Dichogamy', 'Maturation of anthers and stigma at different times (protandry or protogyny).'), kt('Herkogamy', 'Placement of anther and stigma at positions that prevent self-pollination.'), kt('Self-incompatibility', 'A genetic mechanism that blocks self-pollen from fertilising ovules of the same plant.'), kt('Emasculation', 'Removal of anthers from a bisexual flower bud before they dehisce.'), kt('Bagging', 'Covering an emasculated flower to keep out unwanted pollen.')],
      table(['Device', 'Example or effect'], [['Dichogamy', 'Protandry or protogyny'], ['Herkogamy', 'Anther and stigma apart'], ['Self-incompatibility', 'Self-pollen fails to germinate or grow'], ['Monoecy', 'Castor, maize: stops autogamy only'], ['Dioecy', 'Papaya: stops autogamy and geitonogamy']], 'Table of outbreeding devices with examples or effects'),
      [4, 5],
      [flow('LR', [['e', 'Emasculation'], ['b', 'Bagging'], ['d', 'Dusting chosen pollen'], ['r', 'Rebagging']], [['e', 'b'], ['b', 'd'], ['d', 'r']], 'Flow of the steps of artificial hybridisation')],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Calling the tapetum the outermost layer (it is the innermost and nourishes pollen).
- Writing that exine covers the germ pores (germ pores lack sporopollenin).
- Saying the embryo sac has eight cells (it has seven cells and eight nuclei).
- Calling geitonogamy genetic cross-pollination.
- Saying monoecy prevents geitonogamy (only dioecy does).
- Forgetting that emasculation is done in the bud, before dehiscence.

**How marks are usually awarded**
- 1-mark subparts: a term, a reason in one sentence, an example, an option.
- 2–3-mark questions: labelled diagram (anther T.S., pollen grain, ovule L.S., embryo sac); differences between pairs; steps of a process.
- 5-mark questions in parts: microsporogenesis or megasporogenesis with a diagram; agencies with adaptations; outbreeding devices with examples; artificial hybridisation.
- Diagrams: drawn in pencil, label lines horizontal and not crossing, labels on one side.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Why is a typical anther called dithecous?', 'Each of its two lobes has two thecae.', 'concept', 1),
    fc(2, 'How many microsporangia in a typical anther?', 'Four (tetrasporangiate).', 'fact', 1),
    fc(3, 'Wall layers of a microsporangium, outside in?', 'Epidermis, endothecium, middle layers, tapetum.', 'fact', 1),
    fc(4, 'Function of the tapetum?', 'Nourishes the developing pollen grains.', 'concept', 1),
    fc(5, 'What is microsporogenesis?', 'Formation of microspores from a pollen mother cell by meiosis.', 'definition', 1),
    fc(6, 'Material of the exine?', 'Sporopollenin, extremely resistant to heat, acids, alkalis and enzymes.', 'fact', 1),
    fc(7, 'What is a germ pore?', 'An aperture in the exine where sporopollenin is absent.', 'definition', 1),
    fc(8, 'Material of the intine?', 'Cellulose and pectin.', 'fact', 1),
    fc(9, 'Two cells of a mature pollen grain?', 'Large vegetative cell and small spindle-shaped generative cell.', 'fact', 1),
    fc(10, 'Stage at which most pollen is shed?', '2-celled stage (over 60 percent of angiosperms).', 'fact', 1),
    fc(11, 'Pollen viability in rice and wheat?', 'About 30 minutes.', 'fact', 1),
    fc(12, 'How are pollen grains stored long-term?', 'In pollen banks in liquid nitrogen at about −196 °C.', 'fact', 1),
    fc(13, 'Pollen allergen weed that came with imported wheat?', 'Parthenium (carrot grass).', 'fact', 1),
    fc(14, 'Parts of an ovule?', 'Funicle, hilum, integuments, micropyle, chalaza, nucellus, embryo sac.', 'concept', 2),
    fc(15, 'What is an anatropous ovule?', 'An inverted ovule with the micropyle close to the funicle.', 'definition', 2),
    fc(16, 'Where does the MMC differentiate?', 'In the micropylar region of the nucellus.', 'fact', 2),
    fc(17, 'What is monosporic development?', 'Embryo sac formed from a single functional megaspore.', 'definition', 2),
    fc(18, 'How many free-nuclear mitoses form the embryo sac?', 'Three, giving eight nuclei.', 'fact', 2),
    fc(19, 'Cells and nuclei of a mature embryo sac?', '7 cells, 8 nuclei.', 'fact', 2),
    fc(20, 'What is the egg apparatus?', 'One egg cell and two synergids at the micropylar end.', 'definition', 2),
    fc(21, 'Function of the filiform apparatus?', 'Guides the pollen tube into a synergid.', 'concept', 2),
    fc(22, 'Autogamy vs geitonogamy vs xenogamy?', 'Same flower; another flower of same plant; flower of a different plant.', 'concept', 3),
    fc(23, 'Why is geitonogamy genetically like autogamy?', 'The pollen comes from the same plant.', 'exam-tip', 3),
    fc(24, 'Cleistogamous flowers: two examples?', 'Viola, Oxalis, Commelina.', 'fact', 3),
    fc(25, 'Advantage of cleistogamy?', 'Assured seed set even without pollinators.', 'concept', 3),
    fc(26, 'Three adaptations for wind pollination?', 'Light non-sticky pollen; exposed stamens; large feathery stigma.', 'concept', 3),
    fc(27, 'Water-pollinated plants?', 'Vallisneria, Hydrilla, Zostera.', 'fact', 3),
    fc(28, 'Why is sea-grass pollen mucilage-coated?', 'To protect it from wetting.', 'concept', 3),
    fc(29, 'Plant that cannot complete its life cycle without a moth?', 'Yucca.', 'fact', 3),
    fc(30, 'Protandry and protogyny?', 'Anthers mature first; stigma receptive first.', 'definition', 4),
    fc(31, 'Which prevents geitonogamy: monoecy or dioecy?', 'Dioecy (e.g. papaya).', 'exam-tip', 4),
    fc(32, 'Basis of pollen–pistil recognition?', 'Chemical components of pollen interacting with those of the pistil.', 'concept', 4),
    fc(33, 'What is emasculation?', 'Removing anthers from a bisexual flower bud before they dehisce.', 'definition', 5),
    fc(34, 'Why bag an emasculated flower?', 'To keep out unwanted pollen.', 'concept', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
