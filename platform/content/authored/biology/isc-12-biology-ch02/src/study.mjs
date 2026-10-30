// ISC 12 Biology ch02 notes and flashcards.
import { T, table, unit, PROV } from '../../isc-12-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Fertilisation, Seed and Fruit in Flowering Plants — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Double fertilisation',
      `**Events leading to fertilisation.** Compatible pollen germinates on the stigma; the pollen tube grows through the style, enters the ovule through the **micropyle**, and enters one of the **synergids**, guided by the **filiform apparatus**. It releases **two male gametes** into the cytoplasm of the synergid.

**Syngamy.** One male gamete fuses with the nucleus of the **egg cell** to form the **diploid zygote (2n)**.

**Triple fusion.** The other male gamete fuses with the **two polar nuclei** in the central cell to form the **triploid primary endosperm nucleus (PEN, 3n)**. Three haploid nuclei fuse, hence the name. The central cell becomes the **primary endosperm cell (PEC)**, which develops into the **endosperm**; the zygote develops into the **embryo**.

**Double fertilisation** — two fusion events (syngamy and triple fusion) in one embryo sac — is a characteristic feature of **angiosperms**.

**Significance:**
- Syngamy restores the **diploid** number and combines characters of **two parents**, giving variation.
- Triple fusion produces the **triploid endosperm**, a nutritive tissue for the embryo.
- Food tissue forms **only if fertilisation occurs**, so reserves are not wasted on unfertilised ovules.
- After fertilisation the **synergids and antipodals degenerate**.`,
      [kt('Syngamy', 'Fusion of a male gamete with the egg to form the diploid zygote.'), kt('Triple fusion', 'Fusion of a male gamete with the two polar nuclei to form the triploid primary endosperm nucleus.'), kt('Double fertilisation', 'Syngamy and triple fusion occurring in the same embryo sac.')],
      V.df,
      [1],
    ),
    sec(
      '2. Post-fertilisation events: endosperm, perisperm and embryo',
      `**Endosperm.** Endosperm development **precedes** embryo development. The PEC divides repeatedly to form a **triploid** endosperm tissue filled with reserve food, used to nourish the embryo.
- **Nuclear endosperm** (commonest): the PEN undergoes successive **free-nuclear** divisions; cell walls may later form from the periphery towards the centre. **Coconut**: tender coconut water is free-nuclear endosperm (thousands of nuclei) and the surrounding white kernel is cellular endosperm.
- **Cellular endosperm**: every nuclear division is followed by **wall formation** (e.g. **Petunia, Datura**).
- **Helobial endosperm**: the first division forms two **unequal** cells; the larger (micropylar) chamber develops free-nuclearly and the smaller (chalazal) one cellularly or not at all; common in **monocots** (e.g. Asphodelus).
- The endosperm may be **completely consumed** by the developing embryo (pea, groundnut, beans) or **persist** in the mature seed (castor, coconut, cereals).

**Perisperm.** In some seeds, remnants of the **nucellus** persist as a **residual, persistent nucellus** called **perisperm** (e.g. **black pepper, beet**). It is **diploid** and maternal.

**Embryo (embryogeny).** The embryo develops at the **micropylar end**. Most zygotes divide only after a certain amount of endosperm has formed — an adaptation that provides assured nutrition.
- **Dicot:** zygote → **proembryo** → **globular** → **heart-shaped** → mature embryo. The mature embryo has an **embryonal axis** and **two cotyledons**. The part above the cotyledons is the **epicotyl**, ending in the **plumule** (stem tip); the part below is the **hypocotyl**, ending in the **radicle** (root tip) covered by a **root cap**.
- **Monocot (grass):** only **one cotyledon**, the **scutellum**, situated towards one side (lateral) of the embryonal axis. At its lower end the axis has the radicle and root cap enclosed in an undifferentiated sheath, the **coleorhiza**. The shoot apex and a few leaf primordia are enclosed in a hollow foliar structure, the **coleoptile**. An **epiblast** (a remnant of a second cotyledon) is present in some grasses.`,
      [kt('Primary endosperm cell', 'The central cell after triple fusion, which develops into the endosperm.'), kt('Nuclear endosperm', 'Endosperm formed by free-nuclear divisions of the PEN, with walls forming later.'), kt('Helobial endosperm', 'Endosperm whose first division gives two unequal chambers developing differently.'), kt('Perisperm', 'Persistent, diploid nucellus in some seeds.'), kt('Scutellum', 'The single, shield-shaped cotyledon of a grass embryo.'), kt('Coleoptile and coleorhiza', 'Sheaths enclosing the plumule and the radicle of a grass embryo.')],
      table(['Endosperm type', 'Feature', 'Example'], [['Nuclear', 'Free-nuclear divisions first', 'Coconut'], ['Cellular', 'Wall after every division', 'Petunia, Datura'], ['Helobial', 'Two unequal chambers', 'Many monocots']], 'Table of three types of endosperm'),
      [2],
      [V.dicot, V.monocot],
    ),
    sec(
      '3. Seeds',
      `In angiosperms the **seed** is the final product of sexual reproduction, often described as the **fertilised ovule**. Seeds form inside fruits. A seed typically consists of **seed coat(s)**, **cotyledon(s)** and an **embryonal axis**.

**Dicot seed — bean.** The **seed coat** has two layers, outer **testa** and inner **tegmen**. The **hilum** is a scar where the seed was attached to the fruit (funicle); the **micropyle** is a small pore above it. The embryo has two large, fleshy **cotyledons** and an embryonal axis with **plumule** and **radicle**. No endosperm remains.

**Monocot seed — maize grain.** The seed coat is membranous and generally **fused with the fruit wall (pericarp)**. The bulky **endosperm** stores food and is separated from the embryo by an epithelial layer; its outer protein-rich layer is the **aleurone layer**. The embryo is small, in a groove at one end, with one large shield-shaped cotyledon, the **scutellum**, and a short axis with **plumule** enclosed in the **coleoptile** and **radicle** enclosed in the **coleorhiza**.

**Albuminous (endospermic) seeds** retain part of the endosperm (wheat, maize, barley, castor, coconut). **Non-albuminous (exalbuminous) seeds** have no residual endosperm, as it is consumed during embryo development (pea, groundnut, bean, gram).

As seeds mature, their **water content falls to about 10–15 percent** by mass; general metabolism slows and the embryo may enter **dormancy**. Under favourable conditions (moisture, oxygen, suitable temperature) seeds **germinate**.`,
      [kt('Testa and tegmen', 'Outer and inner layers of the seed coat.'), kt('Hilum', 'Scar on the seed coat where the seed was attached to its stalk.'), kt('Aleurone layer', 'Protein-rich outer layer of the endosperm of cereal grains.'), kt('Albuminous seed', 'A seed that retains endosperm at maturity.'), kt('Non-albuminous seed', 'A seed in which the endosperm has been used up and food is stored in the cotyledons.')],
      V.maize,
      [3],
      [V.bean],
    ),
    sec(
      '4. Fruits, their significance and dispersal',
      `**Fruit.** The ovary develops into the fruit; the ovary wall becomes the **pericarp**, which may be **fleshy** (guava, orange, mango) or **dry** (groundnut, mustard).

- **True fruits** develop only from the **ovary** (mango, coconut, tomato, pea).
- **False fruits** develop from the ovary together with other floral parts, especially the **thalamus** (**apple, strawberry, cashew**).
- **Parthenocarpic fruits** develop **without fertilisation** and are seedless (banana).

**Mango (drupe).** Develops from a monocarpellary superior ovary and is one-seeded. Pericarp: thin **epicarp** (skin), fleshy edible **mesocarp**, hard stony **endocarp**, enclosing the seed.

**Coconut (drupe).** Pericarp: smooth **epicarp**, thick **fibrous mesocarp** (coir), hard **endocarp** (shell). The seed has a **white solid endosperm** (kernel) and **liquid endosperm** (coconut water), and a small embryo below one of the three “eyes”. The fibrous mesocarp makes the fruit buoyant, aiding dispersal by water.

**Significance of seeds and fruits:**
- Pollination and fertilisation are **independent of water**, and seed formation is more dependable.
- Seeds have food reserves for the young seedling until it can photosynthesise.
- A hard seed coat protects the embryo; **dormancy** and long viability allow storage — a **lupine** seed (Lupinus arcticus) about **10,000 years** old and a **date palm** (Phoenix dactylifera) seed about **2,000 years** old have germinated.
- As products of sexual reproduction, seeds generate **new genetic combinations** (variation).
- Seeds are the basis of agriculture; fruits **protect** seeds and help their **dispersal**.
- **Dispersal** (by wind, water and animals) lets plants **colonise new areas** and reduces **crowding and competition** near the parent.`,
      [kt('Pericarp', 'The fruit wall, formed from the ovary wall.'), kt('False fruit', 'A fruit formed from the ovary together with other floral parts such as the thalamus.'), kt('Drupe', 'A fleshy one-seeded fruit with a hard stony endocarp, such as mango and coconut.'), kt('Parthenocarpy', 'Development of fruit without fertilisation, giving seedless fruit.')],
      V.mango,
      [4],
      [V.coconut],
    ),
    sec(
      '5. Apomixis, polyembryony and parthenocarpy',
      `**Apomixis** is the formation of **seeds without fertilisation**, a form of asexual reproduction that mimics sexual reproduction (found in some species of **Asteraceae** and **grasses**). Ways in which it occurs:
- A **diploid egg cell** forms without reduction division and develops into the embryo without fertilisation.
- Some **nucellar cells** surrounding the embryo sac divide, protrude into the embryo sac and develop into embryos.

**Importance:** many crop varieties are **hybrids**; if farmers sow seeds collected from a hybrid, the progeny **segregate** and lose the hybrid characters, so new hybrid seed must be bought every year. If hybrids are made **apomictic**, there is **no segregation**, and farmers can keep using the seed. Scientists are trying to identify the genes for apomixis and transfer them into hybrid varieties.

**Polyembryony** is the occurrence of **more than one embryo** in a seed; in **citrus** and **mango**, nucellar cells grow into the embryo sac and form additional embryos.

**Parthenocarpy** is the development of a **fruit without fertilisation**; such fruits are **seedless** (banana). It can be **induced by growth hormones**, and such fruits are commercially valuable.`,
      [kt('Apomixis', 'Formation of seeds without fertilisation.'), kt('Polyembryony', 'Occurrence of more than one embryo in a seed.'), kt('Nucellar embryony', 'Development of embryos from nucellar cells, as in citrus and mango.')],
      table(['Mode', 'Product', 'Example'], [['Apomixis', 'Seed without fertilisation', 'Asteraceae, grasses'], ['Polyembryony', 'Several embryos in one seed', 'Citrus, mango'], ['Parthenocarpy', 'Seedless fruit without fertilisation', 'Banana']], 'Table of three special modes with products and examples'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing the endosperm as diploid (it is triploid; perisperm is diploid).
- Calling perisperm "persistent endosperm" (it is persistent nucellus).
- Saying the coleoptile covers the radicle (it covers the plumule; the coleorhiza covers the radicle).
- Calling apple a true fruit (the thalamus forms most of it).
- Saying we eat the mesocarp of coconut (we eat the endosperm).
- Confusing apomixis (seed without fertilisation) with parthenocarpy (fruit without fertilisation).

**How marks are usually awarded**
- 1-mark subparts: ploidy, examples, a reason, an analogy, a term.
- 2–3-mark questions: double fertilisation and its significance; endosperm types; seed and fruit diagrams; differences between pairs.
- 5-mark questions in parts: double fertilisation with diagram and ploidy; embryo development; seed structures; apomixis and its use in agriculture.
- Diagrams: L.S. of maize grain, bean seed, mango and coconut, dicot and monocot embryos, drawn in pencil and labelled.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Where does the pollen tube release the male gametes?', 'Into one of the synergids.', 'fact', 1),
    fc(2, 'What is syngamy?', 'Fusion of a male gamete with the egg, giving the 2n zygote.', 'definition', 1),
    fc(3, 'What is triple fusion?', 'Fusion of a male gamete with two polar nuclei, giving the 3n PEN.', 'definition', 1),
    fc(4, 'Why "double" fertilisation?', 'Two fusions (syngamy and triple fusion) occur in one embryo sac.', 'concept', 1),
    fc(5, 'One significance of double fertilisation?', 'Food tissue (endosperm) forms only if an egg is fertilised.', 'concept', 1),
    fc(6, 'Fate of synergids and antipodals after fertilisation?', 'They degenerate.', 'fact', 1),
    fc(7, 'Which develops first: endosperm or embryo?', 'Endosperm.', 'fact', 2),
    fc(8, 'Nuclear endosperm example?', 'Coconut: water is free-nuclear, kernel is cellular.', 'fact', 2),
    fc(9, 'Cellular endosperm examples?', 'Petunia, Datura.', 'fact', 2),
    fc(10, 'What is helobial endosperm?', 'First division gives two unequal chambers; common in monocots.', 'definition', 2),
    fc(11, 'What is perisperm? Ploidy?', 'Persistent nucellus (black pepper, beet); 2n.', 'definition', 2),
    fc(12, 'Stages of dicot embryo development?', 'Proembryo, globular, heart-shaped, mature.', 'concept', 2),
    fc(13, 'Epicotyl and hypocotyl end in?', 'Plumule; radicle.', 'fact', 2),
    fc(14, 'What is the scutellum?', 'The single shield-shaped cotyledon of a grass embryo.', 'definition', 2),
    fc(15, 'Coleoptile vs coleorhiza?', 'Sheath over plumule; sheath over radicle.', 'exam-tip', 2),
    fc(16, 'Testa and tegmen?', 'Outer and inner seed coat.', 'definition', 3),
    fc(17, 'What is the hilum?', 'Scar where the seed was attached to its stalk.', 'definition', 3),
    fc(18, 'Aleurone layer?', 'Protein-rich outer layer of cereal endosperm.', 'definition', 3),
    fc(19, 'Albuminous seed examples?', 'Wheat, maize, barley, castor, coconut.', 'fact', 3),
    fc(20, 'Non-albuminous seed examples?', 'Pea, bean, groundnut, gram.', 'fact', 3),
    fc(21, 'Water content of mature seeds?', 'About 10–15 percent.', 'fact', 3),
    fc(22, 'True vs false fruit?', 'From ovary only vs ovary plus thalamus or other parts.', 'concept', 4),
    fc(23, 'False fruit examples?', 'Apple, strawberry, cashew.', 'fact', 4),
    fc(24, 'Pericarp layers of mango?', 'Epicarp, fleshy mesocarp, stony endocarp.', 'fact', 4),
    fc(25, 'Edible part of mango and coconut?', 'Mesocarp; endosperm.', 'exam-tip', 4),
    fc(26, 'Coir is which layer of coconut?', 'The fibrous mesocarp.', 'fact', 4),
    fc(27, 'Oldest viable seed recorded in the textbook?', 'Lupine, about 10,000 years.', 'fact', 4),
    fc(28, 'Two advantages of seed dispersal?', 'Colonising new areas; less crowding near the parent.', 'concept', 4),
    fc(29, 'What is apomixis?', 'Seed formation without fertilisation.', 'definition', 5),
    fc(30, 'Why are apomictic hybrids useful?', 'No segregation, so farmers can reuse the seed.', 'concept', 5),
    fc(31, 'Polyembryony examples?', 'Citrus, mango (nucellar embryos).', 'fact', 5),
    fc(32, 'What is parthenocarpy?', 'Fruit development without fertilisation (seedless), e.g. banana.', 'definition', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
