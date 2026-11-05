// ICSE 9 Biology ch04 notes and flashcards.
import { T, unit, PROV } from '../../icse-9-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Pollination and Fertilisation — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Self-pollination and cross-pollination',
      `**Pollination** is the transfer of **pollen grains** from an **anther** to a **stigma**.

| | Self-pollination | Cross-pollination |
|---|---|---|
| Transfer | Anther to the stigma of the **same flower** (or another flower of the same plant) | Anther of a flower to the stigma of a flower on a **different plant** of the same kind |
| Agent | Often none | Always needed |

**Self-pollination**
- Advantages: sure to happen; needs no agent; little pollen is wasted; good traits are kept.
- Disadvantages: little variation; offspring may become weaker over many generations.

**Cross-pollination**
- Advantages: new combinations of traits; healthier, more varied seedlings; better chance to adapt.
- Disadvantages: depends on agents; much pollen is wasted; poor traits may also spread.

Books differ slightly on pollen moved between two flowers of the same plant; here it is treated as self-pollination (the pollen comes from the same plant).`,
      [kt('Pollination', 'Transfer of pollen grains from an anther to a stigma.'), kt('Self-pollination', 'Pollen reaches a stigma of the same flower or the same plant.'), kt('Cross-pollination', 'Pollen reaches the stigma of a flower on a different plant of the same kind.')],
      V.insectWind,
      [1],
    ),
    sec(
      '2. Agents of pollination and flower adaptations',
      `Pollen is carried by **insects**, **wind**, **water** and sometimes birds, bats or snails.

| Feature | Insect-pollinated | Wind-pollinated |
|---|---|---|
| Petals | Large, bright, scented | Small, dull or absent |
| Nectar | Present | Absent |
| Pollen | Sticky or spiny; moderate amount | Light, dry, smooth; **huge** amount |
| Stigma | Small and sticky | Large, feathery, often hanging out |
| Anthers | Inside the flower | Hang out on long filaments |

**Water-pollinated flowers** (for example **Vallisneria**): the male flowers form under water, break off and float to the surface; the female flower is carried to the surface on a long, coiled stalk; the floating male flowers touch the female flower and pollen is transferred.

**Diagram:** draw an insect-pollinated and a wind-pollinated flower side by side with their features labelled.`,
      [kt('Nectar', 'Sweet liquid that rewards insect visitors.'), kt('Vallisneria', 'A water plant pollinated at the surface of the water.')],
      V.water,
      [2],
    ),
    sec(
      '3. How nature favours cross-pollination',
      `| Device | What happens | Example |
|---|---|---|
| **Unisexuality** | Male and female flowers are separate, often on different plants | Papaya |
| **Dichogamy** | Anthers and stigma of a bisexual flower ripen at different times | Sunflower (anthers first: **protandry**) |
| **Self-sterility** | Pollen of a flower cannot grow on the stigma of the same flower or plant | Passion fruit |

In **protandry** the anthers ripen first; in **protogyny** the stigma ripens first. Unisexual flowers on **different** plants (dioecious) make self-pollination impossible; flowers of the same plant (monoecious, for example maize) can still be pollinated by pollen from the same plant, so this device is only partly effective.`,
      [kt('Unisexuality', 'Flowers that carry only stamens or only a pistil.'), kt('Dichogamy', 'Anthers and stigma of one flower ripen at different times.'), kt('Protandry', 'Anthers ripen before the stigma.'), kt('Self-sterility', 'A flower\'s own pollen fails to fertilise it.')],
      null,
      [3],
    ),
    sec(
      '4. From pollination to fertilisation',
      `1. A pollen grain lands on a **compatible stigma** and takes up the sugary fluid on it.
2. It **germinates**: a **pollen tube** grows out, led by the **tube nucleus**, down the **style**.
3. The **generative nucleus** divides to form **two male gametes**.
4. The tube enters the **ovule** through the **micropyle** and reaches the **embryo sac**, where it releases the two male gametes.
5. The **embryo sac** holds the **egg cell** with two **synergids** at the micropyle end, two **polar nuclei** in the centre and three **antipodal cells** at the far end.
6. One male gamete fuses with the **egg cell** to form the **zygote** (**fertilisation**).

**Pollination** moves pollen; **fertilisation** is the fusion of male and female gametes. The tube may take several hours to grow through the style; the time varies with the plant.`,
      [kt('Pollen tube', 'A tube that grows from a pollen grain through the style to the ovule.'), kt('Micropyle', 'The small opening in the ovule through which the pollen tube enters.'), kt('Embryo sac', 'The female gametophyte inside the ovule; it holds the egg cell and polar nuclei.'), kt('Zygote', 'The cell formed by fusion of a male gamete and the egg cell.')],
      V.carpel,
      [4],
      [V.embryosac],
    ),
    sec(
      '5. Double fertilisation, triple fusion, fruit and seed',
      `In a flowering plant **two** fusions happen in one embryo sac, so it is called **double fertilisation**:
- male gamete 1 + **egg cell** gives the **zygote** (it grows into the embryo);
- male gamete 2 + **two polar nuclei** gives the **primary endosperm nucleus**. Three nuclei fuse, so this is **triple fusion**; it grows into the **endosperm**, a food store.

**After fertilisation**
| Flower part | Becomes |
|---|---|
| Ovary | Fruit |
| Ovule | Seed |
| Integuments | Seed coat |
| Zygote | Embryo |
| Primary endosperm nucleus | Endosperm |
| Petals, stamens, style, stigma | Usually wither and fall |

**Significance:** the **seed** holds the embryo and its food, survives unfavourable periods and grows into a new plant; the **fruit** protects the seeds and helps to spread them.

Chromosome counts: the gametes are haploid, the zygote is diploid and the endosperm (two polar nuclei plus one male gamete) is triploid. Counts are used only as simple arithmetic here.`,
      [kt('Double fertilisation', 'Two fusions in one embryo sac: one forms the zygote, the other the endosperm nucleus.'), kt('Triple fusion', 'Fusion of a male gamete with the two polar nuclei.'), kt('Endosperm', 'The food-storing tissue formed from the primary endosperm nucleus.')],
      null,
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing **fertilisation** when the question asks for **pollination** (moving pollen is not fusing gametes).
- Giving only one side in a comparison. Give a **matching point** for each side.
- Forgetting that **cross-pollination always needs an agent**.
- Writing triple fusion as a separate event instead of **one of the two fusions** of double fertilisation.
- Mixing up **ovary** (becomes the fruit) and **ovule** (becomes the seed).
- Naming dichogamy without saying **which part ripens first**.

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
    fc(1, 'Pollination?', 'Transfer of pollen grains from an anther to a stigma.', 'definition', 1),
    fc(2, 'Self-pollination?', 'Pollen reaches the stigma of the same flower or plant.', 'definition', 1),
    fc(3, 'Cross-pollination?', 'Pollen goes to the stigma of a flower on a different plant of the same kind.', 'definition', 1),
    fc(4, 'Which kind always needs an agent?', 'Cross-pollination.', 'fact', 1),
    fc(5, 'Two advantages of self-pollination?', 'Sure to happen; needs no agent (also little pollen wasted).', 'fact', 1),
    fc(6, 'Two disadvantages of self-pollination?', 'Little variation; offspring may weaken.', 'fact', 1),
    fc(7, 'Two advantages of cross-pollination?', 'New combinations of traits; healthier, varied seedlings.', 'fact', 1),
    fc(8, 'Two disadvantages of cross-pollination?', 'Depends on agents; much pollen wasted.', 'fact', 1),
    fc(9, 'Agents of pollination?', 'Insects, wind, water; sometimes birds, bats, snails.', 'fact', 2),
    fc(10, 'Petals of an insect-pollinated flower?', 'Large, bright and scented.', 'fact', 2),
    fc(11, 'Pollen of a wind-pollinated flower?', 'Light, dry, smooth; produced in huge amounts.', 'fact', 2),
    fc(12, 'Stigma of a wind-pollinated flower?', 'Large and feathery, often hanging out.', 'fact', 2),
    fc(13, 'Anthers of a wind-pollinated flower?', 'Hang out on long filaments.', 'fact', 2),
    fc(14, 'Why do wind flowers lack nectar?', 'They do not need to attract insects.', 'concept', 2),
    fc(15, 'Pollination in Vallisneria?', 'Male flowers float on the water and touch the female flower at the surface.', 'fact', 2),
    fc(16, 'Unisexuality?', 'Male and female flowers are separate, for example papaya.', 'definition', 3),
    fc(17, 'Dichogamy?', 'Anthers and stigma of a flower ripen at different times.', 'definition', 3),
    fc(18, 'Protandry?', 'Anthers ripen before the stigma (sunflower).', 'definition', 3),
    fc(19, 'Protogyny?', 'Stigma ripens before the anthers.', 'definition', 3),
    fc(20, 'Self-sterility?', 'A flower\'s own pollen cannot grow on its own stigma.', 'definition', 3),
    fc(21, 'What makes a pollen grain germinate?', 'Sugary fluid on a compatible stigma.', 'fact', 4),
    fc(22, 'Which nucleus leads the pollen tube?', 'The tube nucleus.', 'fact', 4),
    fc(23, 'What does the generative nucleus form?', 'Two male gametes.', 'fact', 4),
    fc(24, 'Opening through which the tube enters the ovule?', 'Micropyle.', 'fact', 4),
    fc(25, 'Cells of the embryo sac?', 'Egg cell, two synergids, two polar nuclei, three antipodal cells.', 'fact', 4),
    fc(26, 'Fertilisation?', 'Fusion of a male gamete and the egg cell to form the zygote.', 'definition', 4),
    fc(27, 'Double fertilisation?', 'Two fusions in one embryo sac: egg + gamete, and polar nuclei + gamete.', 'definition', 5),
    fc(28, 'Triple fusion?', 'A male gamete fuses with the two polar nuclei.', 'definition', 5),
    fc(29, 'Ovary becomes? Ovule becomes?', 'Ovary becomes the fruit; ovule becomes the seed.', 'fact', 5),
    fc(30, 'Zygote becomes? Primary endosperm nucleus becomes?', 'Embryo; endosperm (food store).', 'fact', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
