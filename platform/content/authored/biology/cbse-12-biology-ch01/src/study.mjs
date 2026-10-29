// ch01 notes and flashcards.
import { T, table, flow, unit, PROV } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Sexual Reproduction in Flowering Plants — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Stamen, anther and microsporogenesis',
      `The flower is the reproductive organ of flowering plants (angiosperms). Hormonal and structural changes turn a shoot apex into a floral bud, in which the **androecium** (stamens) and **gynoecium** (pistils) develop.

A **stamen** has a **filament** and an **anther**. A typical anther is **bilobed** and **dithecous** (two thecae per lobe), with **four microsporangia** at its corners that later become **pollen sacs**.

**Wall of a microsporangium (outside → inside):** epidermis, endothecium, middle layers (these three protect and help dehiscence) and **tapetum**, which nourishes the developing pollen; tapetal cells have dense cytoplasm and often more than one nucleus.

**Microsporogenesis:** cells of the **sporogenous tissue** act as **microspore (pollen) mother cells** (diploid). Each undergoes **meiosis** to form a **microspore tetrad** of four haploid cells. As the anther matures and dehydrates, the microspores separate and develop into **pollen grains**. One meiosis → four pollen grains.`,
      [kt('Microsporangium', 'Pollen sac of the anther in which pollen grains develop.'), kt('Tapetum', 'Innermost wall layer of the microsporangium; nourishes the developing pollen.'), kt('Microsporogenesis', 'Formation of microspores from a microspore mother cell by meiosis.')],
      V.anther,
      [1],
    ),
    sec(
      '2. The pollen grain (male gametophyte)',
      `Pollen grains are usually spherical, about 25–50 micrometres in diameter, with a two-layered wall.

- **Exine:** hard outer layer of **sporopollenin**, one of the most resistant organic materials; it withstands high temperatures and strong acids and alkalis, and no known enzyme degrades it, so pollen is well preserved as fossils. **Germ pores** are gaps where sporopollenin is absent.
- **Intine:** thin, continuous inner layer of **cellulose and pectin**.

A mature pollen grain contains a large **vegetative cell** (abundant food reserve, large irregular nucleus) and a small, spindle-shaped **generative cell** floating in its cytoplasm. In over 60 percent of angiosperms, pollen is shed at this **two-celled** stage; in the rest, the generative cell divides by mitosis into **two male gametes** before shedding (**three-celled** stage).

**Pollen and people:** pollen of many plants (for example Parthenium, carrot grass) causes allergies such as asthma and bronchitis; pollen is used as a food supplement; viability ranges from about 30 minutes (rice, wheat) to months (some members of the rose, pea and potato families); pollen can be stored for years in **liquid nitrogen (about −196 °C)** in pollen banks for breeding.`,
      [kt('Sporopollenin', 'Highly resistant organic material that makes up the exine of pollen.'), kt('Germ pore', 'Region of the exine without sporopollenin, through which the pollen tube emerges.'), kt('Generative cell', 'Small cell of the pollen grain that divides to form two male gametes.')],
      V.pollen,
      [1],
    ),
    sec(
      '3. Pistil, ovule and the embryo sac',
      `The **gynoecium** may be **monocarpellary** (one pistil) or **multicarpellary** (many); pistils may be **syncarpous** (fused, as in poppy) or **apocarpous** (free, as in Michelia). Each pistil has a **stigma**, a **style** and an **ovary**; ovules arise from the **placenta** in the ovarian cavity.

**Ovule (megasporangium):** attached to the placenta by the **funicle**; the junction with the ovule body is the **hilum**. One or two **integuments** enclose it except at the **micropyle**; the opposite, basal end is the **chalaza**. Inside the integuments is the **nucellus**, which holds the **embryo sac** (female gametophyte). An ovule usually has one embryo sac.

**Megasporogenesis:** a single **megaspore mother cell** differentiates in the micropylar region of the nucellus and undergoes **meiosis** to form **four megaspores**. In most flowering plants one is **functional** and three degenerate; the embryo sac formed from one megaspore is **monosporic**.

**Embryo sac development:** the functional megaspore nucleus divides by mitosis three times, free-nuclear, giving 2, 4 and then 8 nuclei (four at each pole). Six nuclei are walled off into cells; one nucleus from each pole moves to the centre as a **polar nucleus**. The mature embryo sac is **7-celled and 8-nucleate**:
- micropylar end: **egg apparatus** = egg cell + two **synergids** (with the **filiform apparatus**, which guides the pollen tube);
- chalazal end: three **antipodal** cells;
- centre: large **central cell** with two polar nuclei.`,
      [kt('Megasporogenesis', 'Formation of megaspores from the megaspore mother cell by meiosis.'), kt('Monosporic development', 'Formation of the embryo sac from a single functional megaspore.'), kt('Filiform apparatus', 'Finger-like thickenings at the micropylar tip of the synergids that guide the pollen tube.')],
      V.ovule,
      [1],
      [V.embryoSac],
    ),
    sec(
      '4. Pollination: kinds and agents',
      `**Pollination** is the transfer of pollen grains from an anther to a stigma.

| Kind | Pollen from | Genetically |
|---|---|---|
| Autogamy | Same flower | Self |
| Geitonogamy | Another flower of the same plant (needs an agent) | Self |
| Xenogamy | A flower of a different plant | Cross: new gene combinations |

**Chasmogamous** flowers open and expose anthers and stigma; **cleistogamous** flowers never open and are always autogamous, giving **assured seed set** even without pollinators (Viola, Oxalis, Commelina have both kinds).

**Wind:** light, non-sticky pollen; well-exposed stamens; large, often feathery stigma; usually a single ovule per ovary; many flowers in an inflorescence (maize tassels shed pollen; the silks of the cob are stigmas and styles). Common in grasses.

**Water:** about 30 genera, mostly monocots: **Vallisneria** (female flowers reach the surface on long stalks; male flowers or pollen float to them), **Hydrilla**, seagrasses such as **Zostera** (long ribbon-like pollen carried under water). Pollen is protected by a **mucilaginous covering**. Water hyacinth and water lily, though aquatic, are pollinated by insects or wind.

**Animals:** bees are the dominant biotic agents; others include butterflies, flies, beetles, wasps, moths, sunbirds, hummingbirds and bats. Flowers are large, colourful, fragrant and rich in nectar, or small and clustered; fly- and beetle-pollinated flowers may smell foul. Rewards are **nectar and pollen**, or a **safe place to lay eggs** (Amorphophallus). **Yucca and its moth** depend on each other: the moth lays eggs in the ovary and its larvae eat some seeds. Pollen and nectar **robbers** take rewards without pollinating.`,
      [kt('Geitonogamy', 'Transfer of pollen to another flower of the same plant; functionally cross but genetically self-pollination.'), kt('Xenogamy', 'Transfer of pollen to the stigma of a flower on a different plant.'), kt('Cleistogamous flower', 'A flower that never opens and is always self-pollinated.')],
      V.pollTypes,
      [2],
    ),
    sec(
      '5. Outbreeding devices, pollen–pistil interaction and hybridisation',
      `Continued self-pollination leads to **inbreeding depression**. **Outbreeding devices**:
1. Pollen release and stigma receptivity **not synchronised**.
2. Anther and stigma at **different positions**.
3. **Self-incompatibility:** a genetic mechanism that prevents pollen of the same flower or plant from germinating or growing in the pistil.
4. **Unisexual flowers:** **monoecious** plants (castor, maize) prevent autogamy but **not** geitonogamy; **dioecious** plants (papaya) prevent **both**.

**Pollen–pistil interaction:** the pistil recognises compatible pollen through chemical components of the pollen and pistil, and promotes it; incompatible pollen is inhibited at germination or tube growth. Compatible pollen germinates through a **germ pore**; the **pollen tube** grows through the stigma and style into the ovary (a two-celled pollen grain's generative cell divides in the tube), enters the ovule through the **micropyle**, and is guided by the **filiform apparatus** into a **synergid**.

**Artificial hybridisation:** ensures only the desired pollen reaches the stigma.
- **Emasculation:** removal of anthers from a bisexual flower bud before dehiscence (not needed for female flowers of unisexual plants).
- **Bagging:** covering the flower with a butter-paper bag to keep out unwanted pollen; when the stigma is receptive, it is dusted with the chosen pollen and **rebagged**.`,
      [kt('Self-incompatibility', 'Genetic mechanism that stops pollen from fertilising ovules of the same flower or plant.'), kt('Emasculation', 'Removal of anthers from a bisexual flower bud before they dehisce.'), kt('Bagging', 'Covering an emasculated or female flower with a bag to prevent contamination by unwanted pollen.')],
      flow('LR', [['l', 'Pollen on stigma'], ['r', 'Recognition'], ['g', 'Germination and tube growth'], ['m', 'Micropyle'], ['s', 'Synergid']], [['l', 'r'], ['r', 'g', 'compatible'], ['g', 'm'], ['m', 's']], 'Flow of the route of a compatible pollen tube from stigma to synergid'),
      [2],
      [table(['Plant', 'Autogamy', 'Geitonogamy'], [['Monoecious (castor, maize)', 'Prevented', 'Possible'], ['Dioecious (papaya)', 'Prevented', 'Prevented']], 'Table of which self-pollinations monoecious and dioecious plants prevent')],
    ),
    sec(
      '6. Double fertilisation, endosperm and embryo',
      `The pollen tube releases **two male gametes** into a synergid.
- **Syngamy:** male gamete + egg → **zygote (2n)**.
- **Triple fusion:** male gamete + two polar nuclei → **primary endosperm nucleus (3n)**; the central cell becomes the **primary endosperm cell**.

Two fusions in one embryo sac = **double fertilisation**, a feature of flowering plants.

**Endosperm** develops **before** the embryo. The primary endosperm cell divides repeatedly to form triploid endosperm with reserve food. Commonly it is first **free-nuclear** and later becomes **cellular**: in coconut, the water is free-nuclear endosperm (thousands of nuclei) and the white kernel is cellular endosperm. The endosperm may be consumed completely before seed maturity (**non-albuminous** seeds: pea, groundnut, beans) or persist (**albuminous** seeds: wheat, maize, barley, castor, coconut). Persistent nucellus is **perisperm** (black pepper, beet).

**Embryo:** the zygote, at the micropylar end, divides after some endosperm forms: proembryo → globular → heart-shaped → mature embryo.
- **Dicot:** embryonal axis + two cotyledons; **epicotyl** (above cotyledons) ends in the **plumule**; **hypocotyl** (below) ends in the **radicle** with a **root cap**.
- **Monocot (grass):** one cotyledon, the **scutellum**, lateral; **coleoptile** encloses the shoot apex and leaf primordia; **coleorhiza** encloses the radicle and root cap; an **epiblast** may be present.`,
      [kt('Triple fusion', 'Fusion of a male gamete with the two polar nuclei, forming the triploid primary endosperm nucleus.'), kt('Perisperm', 'Persistent remains of the nucellus in some seeds, such as black pepper and beet.'), kt('Scutellum', 'The single, shield-shaped cotyledon of a grass embryo.')],
      V.doubleFert,
      [3],
      [V.dicot, V.monocot],
    ),
    sec(
      '7. Seed and fruit',
      `The **seed** is a fertilised ovule. **Integuments → seed coat**; the **micropyle** remains as a pore that lets oxygen and water in during germination. Mature seeds dry to about **10–15 percent moisture** by mass; metabolism slows and the embryo may become **dormant** until conditions are favourable.

The **ovary → fruit** and the **ovary wall → pericarp** (fleshy, as in guava and orange, or dry, as in groundnut and mustard). In **false fruits** the **thalamus** also contributes (apple, strawberry, cashew). **Parthenocarpic** fruits develop **without fertilisation** and are seedless (banana); they can be induced with growth hormones.

**Advantages of seeds:** pollination and fertilisation are free of water; seeds are dispersed widely and colonise new areas; stored food nourishes the seedling; the hard seed coat protects the embryo; seeds of sexual reproduction carry **variation**; dormancy lets them be stored, which is the basis of agriculture. Some seeds stay viable for very long: an Arctic lupine seed germinated after about **10,000 years**, and a date palm seed about **2000 years** old has germinated.`,
      [kt('Pericarp', 'Wall of the fruit, developed from the ovary wall.'), kt('False fruit', 'A fruit in which the thalamus also contributes to the fleshy part, such as apple.'), kt('Parthenocarpy', 'Development of a fruit without fertilisation; the fruit is seedless.')],
      table(['Part of flower', 'After fertilisation becomes'], [['Ovule', 'Seed'], ['Integuments', 'Seed coat'], ['Zygote', 'Embryo'], ['Primary endosperm cell', 'Endosperm'], ['Ovary', 'Fruit'], ['Ovary wall', 'Pericarp']], 'Table of the parts of the flower and what each becomes after fertilisation'),
      [3, 4],
    ),
    sec(
      '8. Apomixis and polyembryony',
      `**Apomixis:** formation of **seeds without fertilisation**, a form of asexual reproduction that mimics sexual reproduction (some members of the sunflower family, grasses).
- A **diploid egg** forms without reduction division and develops into an embryo without fertilisation; or
- cells of the **nucellus** (or integuments) divide, protrude into the embryo sac and develop into embryos.

**Polyembryony:** more than one embryo in a seed, often from nucellar cells, as in many **Citrus** and **mango** varieties.

**Importance:** hybrid seeds give high yields, but progeny of hybrids **segregate**, so farmers must buy fresh hybrid seed every year. If hybrids were made **apomictic**, there would be no segregation, and farmers could keep using their own hybrid seed. Scientists are trying to identify the genes for apomixis and transfer them into hybrid varieties.`,
      [kt('Apomixis', 'Formation of seeds without fertilisation.'), kt('Polyembryony', 'Occurrence of more than one embryo in a seed.')],
      flow('LR', [['h', 'Hybrid crop'], ['s', 'Seed saved by the farmer'], ['g', 'Characters segregate: yield falls'], ['a', 'Apomictic hybrid: no segregation']], [['h', 's'], ['s', 'g', 'normal seed'], ['s', 'a', 'if apomictic']], 'Flow showing that seed saved from a hybrid crop segregates, while an apomictic hybrid would not'),
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing that the embryo sac has eight cells: it has **seven cells and eight nuclei**.
- Calling geitonogamy cross-pollination without adding that it is genetically self-pollination.
- Saying monoecious plants prevent geitonogamy (only dioecious plants do).
- Giving the endosperm as diploid: it is **triploid** (in typical flowering plants).
- Treating the seed coat or pericarp as products of fertilisation; they are maternal tissue.
- Mixing up apomixis (seed without fertilisation) and parthenocarpy (fruit without fertilisation).
- Naming water hyacinth or water lily as water-pollinated.

**How marks are usually awarded**
- 1-mark items: correct option, term, ploidy or example.
- 2–3-mark answers: term or name (1) + process or reason (1) + example, comparison point or labelled sketch (1).
- 5-mark answers: labelled diagram (embryo sac, anther, ovule, embryo) (2) + process in the correct order (2) + significance or one more point (1).
- Case-based items: two 1-mark parts from the passage and a 2-mark part with an internal choice, often reading data or applying a counting rule.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'How many microsporangia does a typical anther have?', 'Four: the anther is bilobed and dithecous.', 'fact', 1),
    fc(2, 'Wall layers of a microsporangium, outside to inside?', 'Epidermis, endothecium, middle layers, tapetum.', 'diagram', 1),
    fc(3, 'Function of the tapetum?', 'Nourishes the developing pollen grains.', 'concept', 1),
    fc(4, 'Define microsporogenesis.', 'Formation of microspores from a pollen mother cell by meiosis.', 'definition', 1),
    fc(5, 'Exine is made of…?', 'Sporopollenin, resistant to heat, strong acids and alkalis and to enzymes.', 'fact', 1),
    fc(6, 'What are germ pores?', 'Gaps in the exine where sporopollenin is absent; the pollen tube emerges there.', 'definition', 1),
    fc(7, 'Two cells of a mature pollen grain?', 'Large vegetative cell (food, tube) and small generative cell (forms two male gametes).', 'concept', 1),
    fc(8, 'How is pollen stored for breeding?', 'In liquid nitrogen at about −196 °C (pollen banks).', 'fact', 1),
    fc(9, 'Parts of an ovule?', 'Funicle, hilum, integuments, micropyle, chalaza, nucellus, embryo sac.', 'diagram', 1),
    fc(10, 'What is monosporic development?', 'The embryo sac forms from a single functional megaspore; the other three degenerate.', 'definition', 1),
    fc(11, 'Cells and nuclei in a mature embryo sac?', '7 cells, 8 nuclei.', 'fact', 1),
    fc(12, 'What makes up the egg apparatus?', 'One egg cell and two synergids, at the micropylar end.', 'diagram', 1),
    fc(13, 'Role of the filiform apparatus?', 'Guides the pollen tube into the synergid.', 'concept', 1),
    fc(14, 'Autogamy, geitonogamy, xenogamy?', 'Same flower; another flower of the same plant; a flower of another plant.', 'definition', 2),
    fc(15, 'Why is geitonogamy genetically self-pollination?', 'The pollen comes from the same plant, so it carries the same genes.', 'concept', 2),
    fc(16, 'Advantage of cleistogamous flowers?', 'Assured seed set even without pollinators.', 'concept', 2),
    fc(17, 'Three features of wind-pollinated flowers?', 'Light non-sticky pollen, exposed stamens, large feathery stigma (also one ovule per ovary).', 'fact', 2),
    fc(18, 'Name two water-pollinated plants.', 'Vallisneria and Zostera (also Hydrilla).', 'example', 2),
    fc(19, 'What keeps water-borne pollen dry?', 'A mucilaginous covering.', 'fact', 2),
    fc(20, 'Yucca and its moth?', 'The moth pollinates the flower and lays eggs in its ovary; larvae eat some seeds.', 'example', 2),
    fc(21, 'Which prevents geitonogamy: monoecy or dioecy?', 'Dioecy (papaya). Monoecy (castor, maize) prevents only autogamy.', 'exam-tip', 2),
    fc(22, 'What is self-incompatibility?', 'A genetic mechanism that stops pollen from the same flower or plant growing in the pistil.', 'definition', 2),
    fc(23, 'Emasculation and bagging?', 'Removing anthers before dehiscence; covering the flower to keep out unwanted pollen.', 'definition', 2),
    fc(24, 'Two fusions of double fertilisation?', 'Syngamy (gamete + egg → zygote, 2n) and triple fusion (gamete + 2 polar nuclei → PEN, 3n).', 'concept', 3),
    fc(25, 'Coconut water and kernel?', 'Water = free-nuclear endosperm; kernel = cellular endosperm.', 'example', 3),
    fc(26, 'Albuminous vs non-albuminous: examples?', 'Albuminous: wheat, maize, castor. Non-albuminous: pea, groundnut.', 'example', 3),
    fc(27, 'What is perisperm?', 'Residual, persistent nucellus in seeds such as black pepper and beet.', 'definition', 3),
    fc(28, 'Coleoptile and coleorhiza?', 'Sheaths around the shoot apex and the radicle of a grass embryo.', 'diagram', 3),
    fc(29, 'Seed coat and pericarp come from…?', 'Integuments and ovary wall (maternal tissue).', 'fact', 3),
    fc(30, 'Example of a false fruit, and why?', 'Apple: the thalamus forms most of the fleshy part.', 'example', 4),
    fc(31, 'Parthenocarpy: meaning and example?', 'Fruit formed without fertilisation, seedless; banana.', 'definition', 4),
    fc(32, 'Apomixis and its use?', 'Seeds without fertilisation; apomictic hybrids would not segregate, so farmers could reuse hybrid seed.', 'concept', 4),
    fc(33, 'Polyembryony: examples?', 'Citrus and mango (extra embryos from nucellar cells).', 'example', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
