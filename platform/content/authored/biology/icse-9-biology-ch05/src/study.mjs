// ICSE 9 Biology ch05 notes and flashcards.
import { T, unit, PROV } from '../../icse-9-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Seeds: Structure and Germination — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Structure of a bean seed and a maize grain',
      `A **seed** is a ripened ovule: a **seed coat**, an **embryo** and a **food store**.

**Bean (dicot) seed**
- **External:** seed coat; **hilum** (scar where the seed was attached); **micropyle** (tiny pore that takes in water and lets the radicle out).
- **Internal:** **two cotyledons** that store food; the **embryo axis** with the **plumule** (future shoot) and **radicle** (future root).

**Maize (monocot) grain**: really a **fruit with one seed**; the fruit wall and seed coat are joined.
- **Endosperm:** large food store (mainly starch).
- **Scutellum:** the single cotyledon; passes food from the endosperm to the embryo.
- **Plumule** inside the **coleoptile** (sheath); **radicle** inside the **coleorhiza** (sheath).

**Diagrams:** draw the bean seed from outside and opened, and the maize grain in long section, with ruled labels.`,
      [kt('Cotyledon', 'A seed leaf; stores food (bean) or passes it on (scutellum of maize).'), kt('Plumule', 'The part of the embryo that grows into the shoot.'), kt('Radicle', 'The part of the embryo that grows into the root.'), kt('Hilum', 'The scar on a seed where it was attached to the fruit.'), kt('Micropyle', 'A tiny pore in the seed coat.'), kt('Coleoptile', 'Sheath that protects the plumule of a maize grain.'), kt('Coleorhiza', 'Sheath that protects the radicle of a maize grain.')],
      V.bean,
      [1],
      [V.maize],
    ),
    sec(
      '2. Differences between monocot and dicot seeds',
      `| Feature | Dicot seed (bean) | Monocot seed (maize) |
|---|---|---|
| Cotyledons | Two | One (scutellum) |
| Food store | In the cotyledons; no separate endosperm when mature | In a large separate endosperm |
| Covering | Seed coat only | Fruit wall joined to the seed coat |
| Sheaths on the embryo | None | Coleoptile and coleorhiza |
| Germination (examples) | Epigeal (bean) | Hypogeal (maize) |

Books differ on whether to call the bean "non-endospermic" and maize "endospermic"; this chapter follows that usual division. Some dicot seeds (castor) do keep an endosperm, and the germination type is not fixed by the number of cotyledons (broad bean and pea are dicots with hypogeal germination).`,
      [kt('Dicot', 'A flowering plant with two cotyledons in its seed.'), kt('Monocot', 'A flowering plant with one cotyledon in its seed.')],
      null,
      [2],
    ),
    sec(
      '3. Germination; hypogeal and epigeal',
      `**Germination** is the growth of the embryo into a seedling.

**Bean:** water enters by the micropyle and the seed swells; the coat splits; the **radicle** emerges first; the **hypocotyl** lengthens, arches and pulls the cotyledons above the soil (**epigeal**); the plumule opens into the first leaves; the cotyledons shrink as their food is used.

**Maize:** the grain swells; the radicle breaks through the **coleorhiza**; the **coleoptile** pushes up with the plumule inside; the plumule breaks out; the **scutellum** passes food from the endosperm. The cotyledon stays in the soil (**hypogeal**).

| | Epigeal | Hypogeal |
|---|---|---|
| Part that lengthens | Hypocotyl | Epicotyl |
| Cotyledons | Carried above the soil | Stay below the soil |
| Examples | Bean, castor, cotton | Pea, gram, maize |

Books differ for "bean": the French (kidney) bean used here is epigeal, while the broad bean is hypogeal.`,
      [kt('Germination', 'The growth of the embryo of a seed into a seedling.'), kt('Epigeal', 'Germination in which the cotyledons are lifted above the soil.'), kt('Hypogeal', 'Germination in which the cotyledons stay below the soil.')],
      V.germination,
      [3],
    ),
    sec(
      '4. Conditions for germination and experiments',
      `- **Water:** softens the coat, activates enzymes, carries food to the embryo.
- **Oxygen:** for respiration, which releases energy for growth.
- **Suitable temperature:** enzymes work best in warmth; too cold or too hot stops germination.
- Most seeds do not need light to germinate.

**Experiment:** use four tubes with the same kind and number of seeds, changing **one condition at a time**. (1) Dry cotton wool: no water. (2) Seeds under boiled, cooled water with a layer of oil: no oxygen. (3) Moist cotton wool in an ice bath: low temperature. (4) Moist cotton wool at room temperature, open to the air: all conditions (the **control**). Only the control germinates well.`,
      [kt('Control', 'The set-up with every condition present, used for comparison.')],
      V.tubes,
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Calling the **scutellum** the endosperm (it is the cotyledon).
- Forgetting the **hilum and micropyle** in the external view.
- Mixing up **epigeal** (cotyledons above soil, hypocotyl lengthens) with **hypogeal** (below soil, epicotyl lengthens).
- Changing **more than one** condition in an experiment, or leaving out the **control**.
- Naming a condition without a **reason**.

**How marks are usually awarded**
- 1 mark: a term, an odd one out **with its category**, a give-reason item.
- 2 marks: two differences or two functions, matched point for point.
- 3 marks: a labelled diagram or three matched points.
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
    fc(1, 'Parts of every seed?', 'Seed coat, embryo, food store.', 'fact', 1),
    fc(2, 'Hilum?', 'Scar where the seed was attached to the fruit.', 'definition', 1),
    fc(3, 'Micropyle?', 'Tiny pore in the seed coat; water enters and the radicle leaves.', 'definition', 1),
    fc(4, 'Cotyledons of a bean?', 'Two thick halves that store food.', 'fact', 1),
    fc(5, 'Plumule?', 'Part of the embryo that becomes the shoot.', 'definition', 1),
    fc(6, 'Radicle?', 'Part of the embryo that becomes the root.', 'definition', 1),
    fc(7, 'A maize grain is a?', 'Fruit with one seed (fruit wall joined to seed coat).', 'fact', 1),
    fc(8, 'Endosperm of maize?', 'Large food store, mainly starch.', 'fact', 1),
    fc(9, 'Scutellum?', 'The single cotyledon of maize; passes food to the embryo.', 'definition', 1),
    fc(10, 'Coleoptile?', 'Sheath protecting the plumule of maize.', 'definition', 1),
    fc(11, 'Coleorhiza?', 'Sheath protecting the radicle of maize.', 'definition', 1),
    fc(12, 'Dicot seed?', 'Two cotyledons.', 'definition', 2),
    fc(13, 'Monocot seed?', 'One cotyledon.', 'definition', 2),
    fc(14, 'Where is food stored in bean?', 'In the cotyledons.', 'fact', 2),
    fc(15, 'Where is food stored in maize?', 'In the endosperm.', 'fact', 2),
    fc(16, 'Which has sheaths on the embryo?', 'Maize (coleoptile and coleorhiza).', 'fact', 2),
    fc(17, 'Germination?', 'Growth of the embryo into a seedling.', 'definition', 3),
    fc(18, 'What emerges first from a germinating seed?', 'The radicle.', 'fact', 3),
    fc(19, 'How does water enter a bean seed?', 'Through the micropyle.', 'fact', 3),
    fc(20, 'Epigeal germination?', 'Cotyledons are lifted above the soil; hypocotyl lengthens.', 'definition', 3),
    fc(21, 'Hypogeal germination?', 'Cotyledons stay below the soil; epicotyl lengthens.', 'definition', 3),
    fc(22, 'Epigeal examples?', 'Bean, castor, cotton.', 'fact', 3),
    fc(23, 'Hypogeal examples?', 'Pea, gram, maize.', 'fact', 3),
    fc(24, 'Role of the scutellum in germination?', 'Passes food from the endosperm to the seedling.', 'fact', 3),
    fc(25, 'Conditions for germination?', 'Water, oxygen, suitable temperature.', 'fact', 4),
    fc(26, 'Why is water needed?', 'Softens the coat, activates enzymes, carries food.', 'concept', 4),
    fc(27, 'Why is oxygen needed?', 'For respiration to release energy.', 'concept', 4),
    fc(28, 'Why boiled water with oil?', 'Boiling removes dissolved air; oil keeps air out.', 'concept', 4),
    fc(29, 'What is a control?', 'The set-up with all conditions present, for comparison.', 'definition', 4),
    fc(30, 'Do most seeds need light to germinate?', 'No.', 'fact', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
