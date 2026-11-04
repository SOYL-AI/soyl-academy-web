// ISC 11 Biology ch07 Morphology of the Flower and Inflorescence — notes and flashcards.
import { T, unit, PROV } from '../../isc-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { LILY_MEMBERS, LILY_TEPALS, PEA, HIBISCUS_SACS, RACEME, RACEME_GAP } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Morphology of the Flower and Inflorescence — Notes',
  language: 'en',
  sections: [
    sec(
      '1. The flower: structure, symmetry, merous condition',
      `The **flower** is the reproductive unit of an angiosperm: a modified shoot of limited growth. It sits on a stalk, the **pedicel**, whose swollen tip, the **thalamus** (receptacle), bears four **whorls**: **calyx** (sepals), **corolla** (petals), **androecium** (stamens) and **gynoecium** (carpels). The calyx and corolla are the **non-essential** (accessory) whorls; the androecium and gynoecium are the **essential** whorls, because they produce the gametes. A flower is drawn in longitudinal section with the parts labelled: pedicel, thalamus, sepal, petal, stamen (filament and anther), carpel (stigma, style, ovary with ovules).

**Bract.** A small leaf at the base of the pedicel is a **bract**. A flower with a bract is **bracteate** (Bougainvillea); one without is **ebracteate** (mustard).

**Symmetry.** An **actinomorphic** (regular) flower can be cut into two equal halves by any vertical plane through the centre (datura, lily). A **zygomorphic** (bilaterally symmetrical) flower can be so cut in **one** plane only (gulmohar, bean, pea). An **asymmetric** (irregular) flower cannot be cut into equal halves by any vertical plane (canna).

**Merous condition.** If the members of each whorl are in threes the flower is **trimerous** (typical of monocots, for example lily: ${LILY_TEPALS} tepals, ${LILY_TEPALS} stamens and 3 carpels, ${LILY_MEMBERS} members in all); in fours, **tetramerous** (mustard); in fives, **pentamerous** (typical of dicots).

**Complete and incomplete.** A flower with all four whorls is **complete**; if one or more whorls are missing it is **incomplete**. A flower with both stamens and carpels is **bisexual**; one with only one of them is **unisexual** (the male flower of pumpkin has no gynoecium, so it is incomplete).`,
      [kt('Thalamus', 'The swollen tip of the pedicel that bears the floral whorls.'), kt('Actinomorphic', 'Radially symmetrical; equal halves by any vertical plane.'), kt('Zygomorphic', 'Bilaterally symmetrical; equal halves by one vertical plane only.'), kt('Complete flower', 'A flower with calyx, corolla, androecium and gynoecium.')],
      V.flower,
      [1],
    ),
    sec(
      '2. Calyx, corolla and aestivation',
      `The **calyx** is made of **sepals**, usually green, which protect the bud. If the sepals are free the calyx is **polysepalous**; if joined, **gamosepalous**. The **corolla** is made of **petals**, usually coloured, which attract pollinators; free petals make it **polypetalous**, joined petals **gamopetalous**. When the calyx and corolla cannot be told apart, as in lily, the two whorls together form a **perianth**, and its members are **tepals**.

**Aestivation** is the mode of arrangement of sepals or petals in a floral bud, in relation to the other members of the same whorl.
- **Valvate** — the margins of adjacent members just touch without overlapping (*Calotropis*).
- **Twisted** — one margin of each member overlaps the next, and the other is overlapped by the previous one (cotton, okra).
- **Imbricate** — the margins overlap in no definite direction; one member is wholly outside and one wholly inside (gulmohar, *Cassia*).
- **Vexillary** (papilionaceous) — the large posterior petal, the **standard**, overlaps the two lateral **wings**, which in turn overlap the two smallest anterior petals, the **keel** (pea, bean).

Books differ in how finely they describe imbricate and twisted aestivation; the four types above are those named in the syllabus.`,
      [kt('Perianth', 'Calyx and corolla looking alike; its members are tepals.'), kt('Aestivation', 'Arrangement of sepals or petals in the bud.'), kt('Vexillary', 'Aestivation with a standard, two wings and a keel, as in pea.'), kt('Valvate', 'Members meet edge to edge without overlapping.')],
      V.aest,
      [2],
    ),
    sec(
      '3. Androecium: cohesion, adhesion and anthers',
      `The **androecium** is made of **stamens**; each has a **filament** and an **anther**, in which pollen grains are formed. Stamens may be free or united.

**Cohesion** (union of stamens with each other):
- **Monadelphous** — filaments joined in one bundle (hibiscus, cotton).
- **Diadelphous** — filaments in two bundles; in the pea and bean, ${PEA.joined} are joined and ${PEA.free} is free.
- **Polyadelphous** — filaments in more than two bundles (*Bombax*, citrus, castor).
- **Syngenesious** — anthers joined, filaments free (sunflower).
- **Synandrous** — filaments and anthers all joined (pumpkin, cucumber).

**Adhesion** (union of stamens with another whorl): **epipetalous** — stamens attached to the petals (datura, brinjal, sunflower florets); **epiphyllous** — attached to the tepals (lily).

**Anthers.** A **dithecous** anther has two lobes (**thecae**) joined by a **connective**, each with two **pollen sacs**, so four pollen sacs in all (sunflower, most flowers). A **monothecous** anther is kidney shaped, with one lobe and two pollen sacs (hibiscus, cotton). A hibiscus flower with sixty stamens therefore has ${HIBISCUS_SACS} pollen sacs.

*Where books differ.* Some books describe the pollen sacs of a monothecous anther as fused into a single chamber; the notes follow the two-sac description used with the syllabus.`,
      [kt('Cohesion', 'Union of stamens with one another.'), kt('Adhesion', 'Union of stamens with another whorl.'), kt('Dithecous', 'Anther with two lobes and four pollen sacs.'), kt('Monothecous', 'Anther with one lobe and two pollen sacs.')],
      V.stamens,
      [3],
      [V.anthers],
    ),
    sec(
      '4. Gynoecium: ovary position, carpels and placentation',
      `The **gynoecium** is made of one or more **carpels** (pistils); each has a **stigma**, a **style** and an **ovary** with **ovules**. If the carpels are **free** the gynoecium is **apocarpous** (lotus, rose); if **fused**, **syncarpous** (tomato, cotton). The ovary of a syncarpous gynoecium is divided into chambers called **locules**.

**Position of the ovary.**
- **Hypogynous** — the ovary is **superior**; the other whorls arise below it (mustard, datura, tomato).
- **Perigynous** — the ovary is **half-inferior**, in a cup-shaped thalamus whose rim bears the other whorls (rose, plum).
- **Epigynous** — the ovary is **inferior**; the thalamus fuses with it and the other whorls arise above it (sunflower, cucumber).

**Placentation** is the arrangement of ovules on the **placenta**.
- **Axile** — ovules on the central axis of a chambered ovary (tomato, lemon, lily).
- **Parietal** — ovules on the inner wall of a one-chambered ovary (mustard, *Argemone*, cucumber).
- **Free central** — ovules on a central column without partitions (*Dianthus*, primrose).
- **Basal** — a single ovule at the base of a one-chambered ovary (sunflower, marigold).
- **Marginal** — ovules along one margin of a one-carpelled ovary (pea, bean).

*Where books differ.* A few plants are placed differently in different books (for example the position of the pea ovary), so the notes use the examples listed above.`,
      [kt('Syncarpous', 'Gynoecium with fused carpels.'), kt('Locule', 'A chamber of the ovary.'), kt('Placentation', 'Arrangement of ovules on the placenta.'), kt('Epigynous', 'Ovary inferior; other whorls above it.')],
      V.ovary,
      [4],
      [V.plac],
    ),
    sec(
      '5. Inflorescence: racemose and cymose',
      `The arrangement of flowers on the floral axis is the **inflorescence**. Its two main kinds differ in the main axis and in the order of opening of flowers.
- **Racemose** — the main axis **keeps growing** and bears flowers laterally in an **acropetal** order: the **oldest flowers are at the base** and the **youngest near the tip** (radish, golden shower tree).
- **Cymose** — the main axis **ends in a flower**, so its growth is limited; the flowers are borne in a **basipetal** order: the **oldest flower is at the top** and the **younger ones below** (jasmine, Bougainvillea).

*Removed from the syllabus:* the subtypes of racemose and cymose inflorescence are not required. A raceme of ${RACEME.flowers} flowers in which one flower opens every two days has the topmost flower opening ${RACEME_GAP} days after the lowest.`,
      [kt('Inflorescence', 'The arrangement of flowers on the floral axis.'), kt('Racemose', 'Axis keeps growing; oldest flowers at the base.'), kt('Cymose', 'Axis ends in a flower; oldest flower at the top.')],
      V.inflo,
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Calling a flower with no gynoecium "complete"; it is incomplete (and unisexual).
- Mixing **cohesion** (stamens with stamens) and **adhesion** (stamens with petals or tepals).
- Writing the pea as monadelphous; it is diadelphous (nine joined, one free).
- Saying a dithecous anther has two pollen sacs; it has four.
- Naming the ovary position from the number of carpels instead of from where the other whorls arise.
- Giving parietal placentation for a chambered ovary with ovules on the axis; that is axile.
- Writing that in a raceme the youngest flower is at the base.

**How marks are usually awarded**
- 1-mark subparts: a term for a condition, an example plant, a lettered figure, a give-a-reason.
- 2- and 3-mark questions: actinomorphic against zygomorphic; cohesion against adhesion; racemose against cymose; two types of placentation with examples.
- 5-mark questions in parts: a labelled diagram of a flower in L.S.; aestivation with examples; ovary position and placentation.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Name the four whorls of a flower from outside in.', 'Calyx, corolla, androecium, gynoecium.', 'fact', 1),
    fc(2, 'Which whorls are essential?', 'Androecium and gynoecium.', 'fact', 1),
    fc(3, 'What is a bract?', 'A small leaf at the base of the pedicel.', 'definition', 1),
    fc(4, 'Actinomorphic flower: one example.', 'Datura (or lily).', 'fact', 1),
    fc(5, 'Zygomorphic flower: one example.', 'Gulmohar (or bean, pea).', 'fact', 1),
    fc(6, 'An asymmetric flower?', 'Canna.', 'fact', 1),
    fc(7, 'Merous condition of a lily?', 'Trimerous.', 'fact', 1),
    fc(8, 'When is a flower incomplete?', 'When one or more whorls are missing.', 'definition', 1),
    fc(9, 'Free sepals: what term?', 'Polysepalous.', 'definition', 2),
    fc(10, 'Joined petals: what term?', 'Gamopetalous.', 'definition', 2),
    fc(11, 'What is a perianth?', 'Calyx and corolla looking alike; members are tepals.', 'definition', 2),
    fc(12, 'What is aestivation?', 'Arrangement of sepals or petals in the bud.', 'definition', 2),
    fc(13, 'Valvate aestivation: example?', 'Calotropis.', 'fact', 2),
    fc(14, 'Twisted aestivation: example?', 'Cotton (or okra).', 'fact', 2),
    fc(15, 'Imbricate aestivation: example?', 'Gulmohar.', 'fact', 2),
    fc(16, 'Vexillary aestivation: parts?', 'Standard, two wings, keel (pea).', 'concept', 2),
    fc(17, 'Cohesion versus adhesion?', 'Stamens joined to each other versus to another whorl.', 'concept', 3),
    fc(18, 'Monadelphous example?', 'Hibiscus.', 'fact', 3),
    fc(19, 'Diadelphous: how many in each bundle in pea?', 'Nine joined, one free.', 'exam-tip', 3),
    fc(20, 'Syngenesious: what is joined?', 'The anthers (filaments free); sunflower.', 'concept', 3),
    fc(21, 'Epiphyllous example?', 'Lily (stamens on tepals).', 'fact', 3),
    fc(22, 'Pollen sacs in a dithecous anther?', 'Four.', 'exam-tip', 3),
    fc(23, 'Pollen sacs in a monothecous anther?', 'Two (one lobe).', 'exam-tip', 3),
    fc(24, 'Hypogynous: where is the ovary?', 'Superior; other whorls below it.', 'concept', 4),
    fc(25, 'Epigynous example?', 'Sunflower or cucumber.', 'fact', 4),
    fc(26, 'Apocarpous versus syncarpous?', 'Free carpels versus fused carpels.', 'concept', 4),
    fc(27, 'Placentation of tomato?', 'Axile.', 'fact', 4),
    fc(28, 'Placentation of Dianthus?', 'Free central.', 'fact', 4),
    fc(29, 'In a raceme, which flowers are oldest?', 'Those at the base.', 'concept', 5),
    fc(30, 'In a cyme, which flower opens first?', 'The terminal (top) flower.', 'concept', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
