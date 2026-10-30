// ISC 12 Biology ch02 Fertilisation, Seed and Fruit — question bank in ISC style. AR keys (ISC options): d a c b d.
import { mk, add, svgV, r } from '../../isc-12-biology-ch01/src/lib.mjs';
import { seedTissues, seedsToMeioses, gametesFor, ploidy } from './calc.mjs';
import { MAIZE_Q } from './svgs.mjs';

const { mcq, ar, fill, num, short, long, part, match } = mk;
const maizeFig = svgV(MAIZE_Q, 'Unlabelled L.S. of a maize grain with parts marked A to F');

// ---------------------------------------------------------------- t01 double fertilisation
add('triple-mcq', mcq({
  stem: 'Triple fusion in an angiosperm embryo sac involves the fusion of',
  right: 'a male gamete with the two polar nuclei',
  wrong: ['a male gamete with the egg and a synergid', 'two male gametes with the egg', 'the egg with two antipodal cells'],
  sol: 'The second male gamete fuses with the two polar nuclei to form the triploid PEN — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('synergid-entry-mcq', mcq({
  stem: 'Into which cell of the embryo sac does the pollen tube release its two male gametes?',
  right: 'One of the synergids',
  wrong: ['The egg cell', 'The central cell', 'An antipodal cell'],
  sol: 'The pollen tube enters a synergid, guided by the filiform apparatus, and discharges the gametes there — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('degenerate-mcq', mcq({
  stem: 'Immediately after double fertilisation, which cells of the embryo sac degenerate?',
  right: 'The synergids and the antipodals',
  wrong: ['The egg and the central cell', 'The zygote and the PEN', 'The integuments and the nucellus'],
  sol: 'Only the zygote and the primary endosperm cell develop further; the synergids and antipodals degenerate — option (@K).',
  d: 2, c: 'recall', t: [1],
}));
add('waste-mcq', mcq({
  stem: 'In a flowering plant, endosperm forms only in ovules that have been fertilised. What advantage does this give the plant?',
  right: 'Food reserves are not wasted on ovules that will never form seeds.',
  wrong: ['It allows seeds to form without pollination.', 'It makes the embryo triploid.', 'It removes the need for a seed coat.'],
  sol: 'Because triple fusion is linked to fertilisation, the plant invests food only in ovules that become seeds — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
{
  const t = seedTissues(20);
  add('pen-num', num({
    stem: 'The root-tip cells of a plant have 20 chromosomes. How many chromosomes are present in its primary endosperm nucleus?',
    value: t.pen,
    sol: r`$n = \dfrac{20}{2} = 10$; PEN $= 3n = 3 \times 10 = ${t.pen}$.`,
    scheme: [[`${t.pen}`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 30 || 'value');
}
{
  const g = gametesFor(25);
  add('gametes-num', num({
    stem: 'A fruit contains 25 seeds, each formed by double fertilisation. How many male gametes were used in triple fusion alone?',
    value: g.tripleFusion,
    sol: r`Each seed uses one male gamete for triple fusion: $25 \times 1 = ${g.tripleFusion}$ (and ${g.syngamy} more in syngamy, ${g.total} in all).`,
    scheme: [[`${g.tripleFusion}`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 25 || 'value');
}
add('df-reason-short', short({
  marks: 1,
  stem: 'Give a reason: The primary endosperm nucleus is triploid.',
  model: 'It forms by the fusion of **three haploid nuclei** — **two polar nuclei** and **one male gamete**.',
  sol: 'Three haploid nuclei.',
  scheme: [['Two polar nuclei + one male gamete', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('df-short', short({
  marks: 2,
  stem: 'What is double fertilisation? State its significance.',
  model: '**Double fertilisation** is the occurrence of **two fusions** in one embryo sac: **syngamy** (male gamete + egg → **diploid zygote**) and **triple fusion** (male gamete + two polar nuclei → **triploid primary endosperm nucleus**). **Significance:** it forms the **endosperm** that nourishes the embryo, and only when an egg is fertilised, so food is not wasted.',
  sol: 'Two fusions; significance.',
  scheme: [['Both fusions with products', 1], ['Significance', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('df-long', long({
  stem: '(a) Describe the events from the entry of the pollen tube into the ovule to the formation of the zygote and the primary endosperm nucleus. [3]\n(b) A plant has 2n = 18. State the number of chromosomes in (i) the zygote, (ii) the endosperm, (iii) a cell of the seed coat, and (iv) an antipodal cell before it degenerates. [2]',
  model: `(a) The pollen tube enters the ovule through the **micropyle** and then enters one of the **synergids**, guided by the **filiform apparatus**. It discharges **two male gametes** into the synergid's cytoplasm. One male gamete moves to the **egg cell** and fuses with its nucleus (**syngamy**), forming the **diploid zygote**. The other moves to the **central cell** and fuses with the **two polar nuclei** (**triple fusion**), forming the **triploid primary endosperm nucleus**; the central cell becomes the primary endosperm cell. These two fusions make up **double fertilisation**.\n\n(b) With $n = 9$: (i) zygote **${seedTissues(18).zygote}**; (ii) endosperm **${seedTissues(18).endosperm}**; (iii) seed coat **${seedTissues(18).seedCoat}** (maternal, from the integuments); (iv) antipodal **${seedTissues(18).antipodal}** (haploid).`,
  sol: 'Events of double fertilisation; ploidy.',
  scheme: [['(a) Tube entry via micropyle and synergid; two gametes released', 1], ['(a) Syngamy', 1], ['(a) Triple fusion', 1], ['(b) Four chromosome numbers (½ each)', 2]],
  wl: [70, 200],
  d: 3, c: 'application', t: [1],
}), (q) => (seedTissues(18).endosperm === 27 && seedTissues(18).antipodal === 9) || 'values');

// ---------------------------------------------------------------- t02 endosperm, perisperm, embryo
add('coconut-endo-mcq', mcq({
  stem: 'Tender coconut water is an example of',
  right: 'free-nuclear endosperm',
  wrong: ['cellular endosperm', 'perisperm', 'liquid nucellus'],
  sol: 'Coconut water is free-nuclear endosperm with thousands of nuclei; the white kernel is cellular endosperm — option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('cellular-mcq', mcq({
  stem: 'In which type of endosperm is every division of the primary endosperm nucleus followed by wall formation?',
  right: 'Cellular endosperm, as in Petunia and Datura',
  wrong: ['Nuclear endosperm, as in coconut', 'Helobial endosperm, as in many monocots', 'Perisperm, as in black pepper'],
  sol: 'Cellular endosperm forms a wall after each nuclear division — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('helobial-mcq', mcq({
  stem: 'A botanist sees that the first division of the primary endosperm cell of a monocot forms two unequal cells; the larger then divides free-nuclearly. This endosperm is',
  right: 'helobial',
  wrong: ['cellular', 'nuclear throughout', 'perisperm'],
  sol: 'Two unequal chambers developing differently define helobial endosperm, common in monocots — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('pepper-mcq', mcq({
  stem: 'In a black pepper seed, the food-storing tissue is diploid and derived from the nucellus. It is called',
  right: 'perisperm',
  wrong: ['endosperm', 'scutellum', 'aleurone layer'],
  sol: 'Persistent nucellus is perisperm, found in black pepper and beet — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('coleorhiza-mcq', mcq({
  stem: 'In a grass embryo, the sheath that encloses the radicle and root cap is the',
  right: 'coleorhiza',
  wrong: ['coleoptile', 'scutellum', 'epiblast'],
  sol: 'The coleorhiza covers the radicle; the coleoptile covers the plumule — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('heart-mcq', mcq({
  stem: 'Which sequence shows the correct order of stages in the development of a dicot embryo?',
  right: 'Zygote → proembryo → globular → heart-shaped → mature embryo',
  wrong: ['Zygote → heart-shaped → globular → proembryo → mature embryo', 'Proembryo → zygote → mature embryo → globular', 'Zygote → mature embryo → heart-shaped → globular'],
  sol: 'The zygote forms the proembryo, then globular and heart-shaped stages, then the mature embryo — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('epicotyl-mcq', mcq({
  stem: 'In a dicot embryo, the portion of the embryonal axis above the level of the cotyledons that ends in the plumule is the',
  right: 'epicotyl',
  wrong: ['hypocotyl', 'radicle', 'coleorhiza'],
  sol: 'Above the cotyledons is the epicotyl, ending in the plumule — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('perisperm-ar', ar({
  a: 'Perisperm is a triploid tissue.',
  r: 'Perisperm is formed as a result of triple fusion.',
  key: 'd',
  sol: 'Perisperm is the persistent, diploid nucellus; it is not formed by triple fusion. Both statements are false — option (d).',
  d: 2, c: 'understanding', t: [2],
}));
add('endosperm-ar', ar({
  a: 'In pea, the endosperm persists in the mature seed.',
  r: 'Pea has albuminous seeds.',
  key: 'd',
  sol: 'In pea the endosperm is consumed by the embryo, so the seed is non-albuminous. Both statements are false — option (d).',
  d: 2, c: 'understanding', t: [2, 3],
}));
add('first-short', short({
  marks: 1,
  stem: 'Give a reason: In most plants the zygote divides only after some endosperm has formed.',
  model: 'This ensures **assured nutrition** for the developing embryo.',
  sol: 'Nutrition.',
  scheme: [['Food available for the embryo', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('analogy2-short', short({
  marks: 1,
  stem: 'Complete the analogy: Coconut water : free-nuclear endosperm :: black pepper food tissue : ______.',
  model: '**Perisperm** (persistent nucellus).',
  sol: 'Perisperm.',
  scheme: [['Perisperm', 1]],
  wl: null,
  d: 2, c: 'application', t: [2],
}));
add('perisperm-short', short({
  marks: 2,
  stem: 'Distinguish between endosperm and perisperm with respect to origin, ploidy and one example each.',
  model: '**Endosperm** develops from the **primary endosperm cell** after **triple fusion**; it is **triploid (3n)**, e.g. **castor, coconut, wheat**. **Perisperm** is the **persistent nucellus**, a maternal tissue that is **diploid (2n)**, e.g. **black pepper, beet**.',
  sol: 'Origin, ploidy, examples.',
  scheme: [['Endosperm: origin, 3n, example', 1], ['Perisperm: nucellus, 2n, example', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('embryo-short', short({
  marks: 2,
  stem: 'Name the parts of a grass embryo that (i) is the single cotyledon, (ii) covers the shoot apex, (iii) covers the radicle and (iv) may represent a second cotyledon.',
  model: '(i) **Scutellum**; (ii) **coleoptile**, a hollow foliar sheath enclosing the shoot apex and leaf primordia; (iii) **coleorhiza**, an undifferentiated sheath; (iv) **epiblast**.',
  sol: 'Four parts.',
  scheme: [['Scutellum and coleoptile', 1], ['Coleorhiza and epiblast', 1]],
  wl: [12, 50],
  d: 1, c: 'recall', t: [2],
}));
add('endosperm-short', short({
  marks: 3,
  stem: 'Describe the three types of endosperm development, giving one example of each.',
  model: '1. **Nuclear:** the primary endosperm nucleus divides repeatedly by **free-nuclear** division; walls may form later from the periphery — e.g. **coconut**, whose water is free-nuclear and kernel cellular.\n2. **Cellular:** every nuclear division is followed by **wall formation** — e.g. **Petunia, Datura**.\n3. **Helobial:** the first division gives **two unequal cells**; the larger divides free-nuclearly and the smaller cellularly or not at all — common in **monocots**.',
  sol: 'Three types with examples.',
  scheme: [['Nuclear with example', 1], ['Cellular with example', 1], ['Helobial with example', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('dicot-short', short({
  marks: 3,
  stem: 'Draw a labelled diagram of a mature dicot embryo and name the stages through which it develops from the zygote.',
  model: '**Diagram labels:** two **cotyledons** on the **embryonal axis**; above them the **epicotyl** ending in the **plumule**; below them the **hypocotyl** ending in the **radicle** with a **root cap**.\n\n**Stages:** zygote → **proembryo** → **globular** → **heart-shaped** → **mature embryo**.',
  sol: 'Diagram and stages.',
  scheme: [['Diagram with cotyledons, plumule, radicle', 1], ['Epicotyl, hypocotyl, root cap labelled', 1], ['Stages in order', 1]],
  wl: [30, 96],
  d: 2, c: 'application', t: [2],
}));
add('ploidy-short', short({
  marks: 3,
  stem: 'A plant with 2n = 14 forms seeds. Give the number of chromosomes in (i) the embryo, (ii) the endosperm, (iii) the perisperm, (iv) the seed coat, (v) the pericarp and (vi) a synergid before fertilisation, explaining the principle you used.',
  model: `With $n = 7$: (i) embryo **${seedTissues(14).embryo}**; (ii) endosperm **${seedTissues(14).endosperm}**; (iii) perisperm **${seedTissues(14).perisperm}**; (iv) seed coat **${seedTissues(14).seedCoat}**; (v) pericarp **${seedTissues(14).pericarp}**; (vi) synergid **${seedTissues(14).synergid}**.\n\n**Principle:** embryo and endosperm come from fusions (n + n and n + n + n); perisperm, seed coat and pericarp are **maternal** tissues (nucellus, integuments, ovary wall) and stay **2n**; embryo-sac cells are **haploid**.`,
  sol: 'Six values and principle.',
  scheme: [['Embryo and endosperm', 1], ['Maternal tissues 2n', 1], ['Synergid n and principle', 1]],
  d: 3, c: 'application', t: [2],
}), () => (seedTissues(14).endosperm === 21 && seedTissues(14).synergid === 7) || 'values');
add('embryo-long', long({
  stem: '(a) Draw a labelled diagram of the L.S. of a grass (monocot) embryo. [2]\n(b) Compare the dicot and monocot embryos in any three respects. [3]',
  model: '(a) **Labels:** **scutellum** (single cotyledon) on one side of the axis; **coleoptile** enclosing the **shoot apex** and leaf primordia; **epiblast**; **coleorhiza** enclosing the **radicle** and **root cap**.\n\n(b) 1. **Cotyledons:** dicot has **two**, attached to the axis; monocot has **one**, the **scutellum**, lateral to the axis.\n2. **Shoot tip:** in dicots the **plumule** is free at the end of the epicotyl; in grasses it is enclosed in a sheath, the **coleoptile**.\n3. **Root tip:** in dicots the **radicle** with root cap is not sheathed; in grasses it is enclosed in the **coleorhiza**. (Also: an epiblast occurs in some grasses.)',
  sol: 'Diagram; three comparisons.',
  scheme: [['(a) Labelled grass embryo', 2], ['(b) Three comparisons', 3]],
  wl: [60, 200],
  d: 2, c: 'analysis', t: [2],
}));

// ---------------------------------------------------------------- t03 seeds
add('albumin-mcq', mcq({
  stem: 'Which of these seeds is non-albuminous?',
  right: 'Groundnut',
  wrong: ['Castor', 'Wheat', 'Coconut'],
  sol: 'Groundnut stores food in its cotyledons; the others retain endosperm — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('aleurone-mcq', mcq({
  stem: 'The protein-rich layer forming the outer part of the endosperm in a maize grain is the',
  right: 'aleurone layer',
  wrong: ['scutellum', 'coleoptile', 'tegmen'],
  sol: 'The aleurone layer surrounds the starchy endosperm — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('maize-fig-mcq', mcq({
  stem: 'In the L.S. of a maize grain, parts are marked A to F. Which letter marks the structure through which the embryo absorbs food from the endosperm during germination?',
  right: 'D (scutellum)',
  wrong: ['B (aleurone layer)', 'E (coleoptile)', 'F (coleorhiza)'],
  sol: 'D is the shield-shaped scutellum, the cotyledon that absorbs food from the endosperm — option (@K).',
  d: 3, c: 'application', t: [3],
  assets: [maizeFig],
}));
add('maize-fig2-mcq', mcq({
  stem: 'In the same figure (A to F), why is part A described as a fusion of two layers?',
  right: 'A is the pericarp (fruit wall) fused with the seed coat, so the maize grain is a fruit.',
  wrong: ['A is the aleurone layer fused with the endosperm.', 'A is the coleoptile fused with the plumule.', 'A is the testa fused with the tegmen of the embryo.'],
  sol: 'In a cereal grain the membranous seed coat is fused with the pericarp — option (@K).',
  d: 3, c: 'analysis', t: [3],
  assets: [maizeFig],
}));
add('flesh-mcq', mcq({
  stem: 'A student opens a seed and finds a thin seed coat and two thick, fleshy cotyledons filling the whole seed, with no other food tissue. What can she conclude?',
  right: 'The seed is non-albuminous; its endosperm was used up and food is stored in the cotyledons.',
  wrong: ['The seed is albuminous; the cotyledons are endosperm.', 'The seed has perisperm in its cotyledons.', 'The seed is a monocot grain.'],
  sol: 'No separate food tissue and fleshy cotyledons mean the endosperm was consumed — a non-albuminous dicot seed — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('coleoptile-app-mcq', mcq({
  stem: 'When a maize grain germinates, the first leaf pushes up through the soil inside a protective sheath. This sheath is the',
  right: 'coleoptile',
  wrong: ['coleorhiza', 'scutellum', 'aleurone layer'],
  sol: 'The coleoptile encloses the shoot apex and leaf primordia and protects them as they emerge — option (@K).',
  d: 2, c: 'application', t: [2, 3],
}));
add('hilum-mcq', mcq({
  stem: 'A scar on the seed coat of a bean shows where the seed was attached to its stalk. It is the',
  right: 'hilum',
  wrong: ['micropyle', 'tegmen', 'chalaza'],
  sol: 'The hilum marks the attachment of the seed to the funicle — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('dormant-mcq', mcq({
  stem: 'Seeds stored in a grain warehouse for a year still germinate when sown. Which property of mature seeds makes this possible?',
  right: 'Low water content (about 10–15 percent) and dormancy, which slow metabolism',
  wrong: ['A triploid embryo', 'Continuous photosynthesis by the cotyledons', 'Absence of a seed coat'],
  sol: 'As seeds mature they dry out and their metabolism slows; many enter dormancy, which allows storage — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('seeds-short', short({
  marks: 2,
  stem: 'Distinguish between albuminous and non-albuminous seeds, giving two examples of each.',
  model: '**Albuminous** seeds **retain part of the endosperm** at maturity, e.g. **wheat, maize, castor**. **Non-albuminous** seeds have **no residual endosperm**, because the embryo consumes it and food is stored in the **cotyledons**, e.g. **pea, groundnut**.',
  sol: 'Definitions and examples.',
  scheme: [['Albuminous with two examples', 1], ['Non-albuminous with two examples', 1]],
  d: 1, c: 'understanding', t: [3],
}));
add('maize-short', short({
  marks: 3,
  stem: 'Draw a labelled diagram of the L.S. of a maize grain. Why is the maize grain called a fruit and not a seed?',
  model: '**Diagram labels:** **pericarp fused with seed coat**, **aleurone layer**, **endosperm**, **scutellum**, **coleoptile** with **plumule**, **coleorhiza** with **radicle**.\n\nIt is a **fruit** because its outer covering is the **pericarp** (fruit wall from the ovary wall) **fused** with the seed coat; it is a one-seeded fruit.',
  sol: 'Diagram and reason.',
  scheme: [['Diagram with endosperm and aleurone', 1], ['Embryo parts labelled', 1], ['Pericarp fused with seed coat: fruit', 1]],
  wl: [30, 96],
  d: 2, c: 'application', t: [3],
}));
add('bean-short', short({
  marks: 3,
  stem: 'Describe the structure of a bean seed, naming the layers of its seed coat and the parts of its embryo. Is it albuminous? Give a reason.',
  model: 'The **seed coat** has an outer **testa** and inner **tegmen**; the **hilum** is the scar of attachment, with the **micropyle** beside it. Inside, the **embryo** has two large fleshy **cotyledons** and an **embryonal axis** with **plumule** and **radicle**.\n\nIt is **non-albuminous**: the **endosperm is consumed** during development and food is stored in the **cotyledons**.',
  sol: 'Seed coat, embryo, non-albuminous.',
  scheme: [['Testa, tegmen, hilum, micropyle', 1], ['Cotyledons and axis', 1], ['Non-albuminous with reason', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 fruits
add('false-mcq', mcq({
  stem: 'Which of these is a false fruit?',
  right: 'Strawberry',
  wrong: ['Mango', 'Tomato', 'Pea pod'],
  sol: 'In strawberry, as in apple and cashew, the thalamus contributes to the fruit — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('mango-mcq', mcq({
  stem: 'Which part of the mango fruit do we eat?',
  right: 'The fleshy mesocarp',
  wrong: ['The stony endocarp', 'The endosperm', 'The thalamus'],
  sol: 'In mango the edible part is the fleshy mesocarp of the pericarp — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('coir-mcq', mcq({
  stem: 'Coconuts that fall into the sea can float for long distances and germinate on distant shores. Which layer of the fruit helps it to float?',
  right: 'The fibrous mesocarp',
  wrong: ['The hard endocarp', 'The liquid endosperm', 'The embryo'],
  sol: 'The thick fibrous mesocarp (coir) makes the fruit buoyant, aiding dispersal by water — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('drupe-match', match({
  stem: 'Match each part of a coconut or mango (column I) with its description (column II).',
  pairs: [
    ['Mango mesocarp', 'Fleshy, edible fruit wall layer'],
    ['Mango endocarp', 'Hard, stony layer around the seed'],
    ['Coconut mesocarp', 'Fibrous layer (coir)'],
    ['Coconut kernel', 'Solid, cellular endosperm'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Mango mesocarp — fleshy; mango endocarp — stony; coconut mesocarp — coir; coconut kernel — cellular endosperm.',
  d: 2, c: 'understanding', t: [4],
}));
add('apple-ar', ar({
  a: 'Apple is called a false fruit.',
  r: 'The thalamus contributes to the fleshy part of the apple.',
  key: 'a',
  sol: 'Both are true; a fruit that includes the thalamus is a false fruit — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('coconut-ar', ar({
  a: 'Tender coconut water is free-nuclear endosperm.',
  r: 'The mesocarp of the coconut is fibrous.',
  key: 'b',
  sol: 'Both statements are true, but the fibrous mesocarp has nothing to do with the nature of the endosperm — option (b).',
  d: 3, c: 'analysis', t: [2, 4],
}));
add('truefalse-short', short({
  marks: 2,
  stem: 'Distinguish between a true fruit and a false fruit, giving one example of each.',
  model: 'A **true fruit** develops only from the **ovary**, e.g. **mango** (or tomato, pea). A **false fruit** develops from the ovary **together with other floral parts**, especially the **thalamus**, e.g. **apple** (or strawberry, cashew).',
  sol: 'Origin and examples.',
  scheme: [['True fruit with example', 1], ['False fruit with example', 1]],
  d: 1, c: 'understanding', t: [4],
}));
add('cashew-short', short({
  marks: 1,
  stem: 'Give a reason: Cashew is called a false fruit.',
  model: 'Besides the **ovary**, the **thalamus** (swollen stalk) contributes to the fleshy part of the fruit.',
  sol: 'Thalamus contributes.',
  scheme: [['Thalamus or other floral part contributes', 1]],
  d: 2, c: 'application', t: [4],
}));
add('mango-short', short({
  marks: 2,
  stem: 'Name the layers of the pericarp of a mango from outside inwards, and state which one is eaten.',
  model: 'From outside: **epicarp** (thin skin), **mesocarp** (thick, fleshy) and **endocarp** (hard, stony), which encloses the seed. The **mesocarp** is the edible part; mango is a **drupe**.',
  sol: 'Three layers; mesocarp.',
  scheme: [['Three layers in order', 1], ['Mesocarp eaten', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('dispersal-short', short({
  marks: 2,
  stem: 'A tree drops all its seeds directly beneath itself. Explain two problems this would cause and how fruits help to avoid them.',
  model: 'Seedlings would face **crowding and competition** with each other and with the parent for light, water and nutrients, and the species could not **colonise new areas**. Fruits **protect** the seeds and help **disperse** them by wind, water or animals, spreading them away from the parent.',
  sol: 'Crowding; no colonisation; dispersal by fruits.',
  scheme: [['Two problems', 1], ['Role of fruits in dispersal', 1]],
  d: 3, c: 'application', t: [4],
}));
add('coconut-short', short({
  marks: 3,
  stem: 'Draw a labelled diagram of the L.S. of a coconut. Which part is eaten, and from which fusion does it arise?',
  model: '**Diagram labels:** **epicarp**, fibrous **mesocarp** (coir), hard **endocarp** (shell), **white solid endosperm** (kernel), **liquid endosperm** (coconut water), **embryo**.\n\nWe eat the **endosperm** (kernel and water), which arises from **triple fusion** (male gamete + two polar nuclei), so it is **triploid**.',
  sol: 'Diagram; endosperm from triple fusion.',
  scheme: [['Three pericarp layers labelled', 1], ['Solid and liquid endosperm and embryo', 1], ['Endosperm from triple fusion', 1]],
  wl: [30, 96],
  d: 2, c: 'application', t: [4],
}));
add('seedfruit-long', long({
  stem: '(a) State three advantages that seeds have given to flowering plants. [3]\n(b) Seeds of an arctic lupine about 10,000 years old germinated. What does this show about seeds, and why is this property important to agriculture? [2]',
  model: '(a) 1. Pollination and fertilisation do **not depend on water**, so seed formation is more dependable. 2. Seeds carry **food reserves** that nourish the young seedling until it can photosynthesise, and a **hard seed coat** protects the embryo. 3. Being products of sexual reproduction, seeds produce **new genetic combinations** (variation); with fruits they also allow **dispersal** to new habitats.\n\n(b) It shows that seeds can remain **dormant** and **viable** for very long periods because of their low water content and slowed metabolism. This matters to agriculture because seeds can be **stored** as food and as **planting material** for later seasons.',
  sol: 'Advantages; dormancy and storage.',
  scheme: [['(a) Three advantages', 3], ['(b) Dormancy and long viability', 1], ['(b) Storage for food and sowing', 1]],
  wl: [60, 200],
  d: 2, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- t05 apomixis, polyembryony, parthenocarpy
add('parthenocarpy-mcq', mcq({
  stem: 'Seedless banana fruits develop without fertilisation. This is called',
  right: 'parthenocarpy',
  wrong: ['apomixis', 'polyembryony', 'cleistogamy'],
  sol: 'Fruit development without fertilisation is parthenocarpy — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('polyembryony-mcq', mcq({
  stem: 'An orange seed, when germinated, gives three seedlings. The extra embryos most likely arose from',
  right: 'nucellar cells that grew into the embryo sac',
  wrong: ['three male gametes fusing with the egg', 'the antipodal cells after triple fusion', 'the aleurone layer'],
  sol: 'In citrus, nucellar cells surrounding the embryo sac develop into extra embryos (polyembryony) — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('apomixis-mcq', mcq({
  stem: 'Why would apomictic hybrid varieties benefit farmers?',
  right: 'Their seeds would not segregate, so farmers could reuse the seed every year without losing hybrid characters.',
  wrong: ['Their seeds would need no water to germinate.', 'They would produce seedless fruits.', 'They would be pollinated only by insects.'],
  sol: 'Apomictic seeds are genetically identical to the parent, so hybrid characters are kept — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('apomixis-ar', ar({
  a: 'Seeds formed by apomixis are genetically identical to the parent plant.',
  r: 'Apomixis involves the fusion of male and female gametes.',
  key: 'c',
  sol: 'A is true; R is false, because apomixis forms seeds without fertilisation — option (c).',
  d: 2, c: 'understanding', t: [5],
}));
{
  const g = gametesFor(12);
  add('gametes12-num', num({
    stem: 'A pea pod has 12 seeds. How many male gametes in total took part in the double fertilisations that formed them?',
    value: g.total,
    sol: r`Each seed needs 2 male gametes (syngamy and triple fusion): $12 \times 2 = ${g.total}$.`,
    scheme: [[`${g.total}`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 24 || 'value');
}
add('hormone-fill', fill({
  stem: 'Parthenocarpy can be induced in some crops by applying growth ______.',
  acc: [['hormones', 'hormone', 'regulators']],
  sol: 'Hormones.',
  d: 1, c: 'recall', t: [5],
}));
{
  const s = seedsToMeioses(60);
  add('meioses-num', num({
    stem: 'A fruit has 60 seeds. What is the minimum number of meiotic divisions needed to form them? (One megaspore mother cell per ovule; four pollen grains per pollen mother cell.)',
    value: s.total,
    sol: r`Female meioses $= 60$; male meioses $= \dfrac{60}{4} = 15$; total $= 60 + 15 = ${s.total}$.`,
    scheme: [[`${s.total}`, 1]],
    d: 3, c: 'application', t: [1, 5],
  }), (q) => q.answer.value === 75 || 'value');
}
add('apomixis-short', short({
  marks: 3,
  stem: 'What is apomixis? Describe two ways in which it can occur, and explain its importance in hybrid seed production.',
  model: '**Apomixis** is the formation of **seeds without fertilisation**, found in some Asteraceae and grasses. It can occur when (i) a **diploid egg** forms without reduction division and develops into an embryo without fertilisation, or (ii) **nucellar cells** around the embryo sac divide, protrude into it and develop into embryos.\n\n**Importance:** seeds of hybrids **segregate**, so farmers must buy new hybrid seed every year; **apomictic hybrids** would not segregate, so seed could be **reused**.',
  sol: 'Definition; two ways; importance.',
  scheme: [['Definition', 1], ['Two ways', 1], ['Importance for hybrid seed', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('special-short', short({
  marks: 3,
  stem: 'A fruit grower notices (i) seedless fruits on one variety, (ii) several seedlings from a single seed of another, and (iii) seeds formed on plants whose flowers were bagged and never pollinated. Name the phenomenon in each case and give one example of each.',
  model: '(i) **Parthenocarpy** — development of a fruit without fertilisation, so the fruit is seedless, e.g. **banana**.\n\n(ii) **Polyembryony** — more than one embryo in a seed, often because nucellar cells grow into extra embryos, e.g. **citrus** or **mango**.\n\n(iii) **Apomixis** — seed formation without fertilisation, since the bagged flowers received no pollen, e.g. some **Asteraceae** and **grasses**.',
  sol: 'Three phenomena with examples.',
  scheme: [['Parthenocarpy with example', 1], ['Polyembryony with example', 1], ['Apomixis with example', 1]],
  d: 2, c: 'application', t: [5],
}));
add('apomixis-long', long({
  stem: '(a) Distinguish between apomixis and parthenocarpy. [2]\n(b) A seed company sells hybrid maize seed. Farmers who saved and sowed seed from their hybrid crop got uneven plants with lower yields. Explain why, and how apomixis could solve the problem. [3]',
  model: '(a) **Apomixis** is the formation of **seeds** without fertilisation (the embryo forms from a diploid egg or from nucellar cells), e.g. some Asteraceae and grasses. **Parthenocarpy** is the formation of **fruits** without fertilisation; such fruits are **seedless**, e.g. banana.\n\n(b) A hybrid is **heterozygous** for many genes. When its seeds are formed by sexual reproduction, the genes **segregate**, so the next generation is a mixture of genotypes; plants are uneven and many lose the hybrid vigour and yield. If the hybrid were **apomictic**, its seeds would form **without fertilisation** and be **genetically identical** to the hybrid parent, so there would be **no segregation** and farmers could **reuse the seed** every year.',
  sol: 'Distinction; segregation; apomixis as solution.',
  scheme: [['(a) Apomixis: seed without fertilisation', 1], ['(a) Parthenocarpy: seedless fruit', 1], ['(b) Segregation in hybrid progeny', 1.5], ['(b) Apomictic seed identical to parent; reuse', 1.5]],
  wl: [60, 200],
  d: 4, c: 'evaluation', t: [5],
}));

// ---------------------------------------------------------------- stimulus-based
{
  const t = seedTissues(24);
  add('ploidy-case', mk.case({
    passage: 'A student took a plant with 2n = 24 and prepared slides from several tissues of a developing seed and fruit. She recorded the source of each tissue.\n\n| Slide | Source |\n|---|---|\n| P | Cells of the young embryo |\n| Q | Food tissue formed after the second male gamete fused in the central cell |\n| R | Cells of the seed coat |\n| S | Cells of the fruit wall |',
    d: 3, c: 'application',
    children: [
      part('a', num({
        stem: 'How many chromosomes would she count in a cell of slide Q?',
        value: t.endosperm,
        sol: r`Slide Q is endosperm: $3n = 3 \times 12 = ${t.endosperm}$.`,
        scheme: [[`${t.endosperm}`, 1]],
        d: 2, c: 'application', t: [1, 2],
      })),
      part('b', mcq({
        stem: 'Which slides show the same chromosome number as the leaf of the parent plant?',
        right: 'P, R and S',
        wrong: ['Q only', 'P and Q', 'R only'],
        sol: 'The embryo (2n), seed coat (2n, maternal) and fruit wall (2n, maternal) all have 24 — option (@K).',
        d: 3, c: 'analysis', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'Although slides P and R have the same chromosome number, they differ genetically. Explain.',
        model: 'The **embryo (P)** comes from the **zygote**, which combines a **male gamete** from the pollen parent with the egg, so it carries genes from **both parents**. The **seed coat (R)** comes from the **integuments** of the ovule, so it is entirely **maternal** tissue.',
        sol: 'Biparental embryo vs maternal seed coat.',
        scheme: [['Embryo has genes of both parents', 1], ['Seed coat is maternal', 1]],
        d: 3, c: 'analysis', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'If the plant had seeds with perisperm, what chromosome number would the perisperm show, and why?',
          model: `**${t.perisperm}** chromosomes. Perisperm is the **persistent nucellus**, a **maternal, diploid** tissue of the ovule. It does not take part in fertilisation, so it keeps the same chromosome number as the leaf cells of the parent plant.`,
          sol: 'Perisperm 2n.',
          scheme: [[`${t.perisperm}`, 1], ['Persistent nucellus, maternal', 1]],
          d: 2, c: 'application', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[0].answer.value === 36 || 'value');
}
add('fruit-case', mk.case({
  passage: 'Four fruits were cut lengthwise in a class.\n\n| Fruit | Observation |\n|---|---|\n| W | Thin skin, thick juicy flesh, hard stone with one seed |\n| X | Smooth skin, thick fibrous layer, hard shell, white kernel and a liquid inside |\n| Y | Fleshy part formed mostly from the swollen thalamus; ovary in the centre |\n| Z | Fleshy fruit with no seeds, from a plant whose flowers were not fertilised |',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Fruits W and X are both',
      right: 'drupes with a stony or hard endocarp',
      wrong: ['false fruits', 'parthenocarpic fruits', 'albuminous seeds'],
      sol: 'Mango-like W and coconut-like X are one-seeded drupes with a hard endocarp — option (@K).',
      d: 2, c: 'application', t: [4],
    })),
    part('b', mcq({
      stem: 'Fruit Y is best described as',
      right: 'a false fruit, like apple',
      wrong: ['a true fruit, like mango', 'a parthenocarpic fruit, like banana', 'a drupe, like coconut'],
      sol: 'When the thalamus forms the fleshy part, the fruit is false — option (@K).',
      d: 2, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'Name the phenomenon shown by Z and state one way it can be brought about in crops.',
      model: '**Parthenocarpy** — development of a fruit **without fertilisation**, giving **seedless** fruit (e.g. banana). It can be **induced by applying growth hormones** to the flowers.',
      sol: 'Parthenocarpy; hormones.',
      scheme: [['Parthenocarpy', 1], ['Induced by growth hormones', 1]],
      d: 2, c: 'understanding', t: [5],
    }), [
      short({
        marks: 2,
        stem: 'In fruit X, which part is the endosperm, and in what form does it exist?',
        model: 'The **white kernel** and the **liquid** inside are the **endosperm**: the liquid (coconut water) is **free-nuclear** endosperm with thousands of nuclei, and the kernel is **cellular** endosperm, formed when walls develop from the periphery inwards.',
        sol: 'Kernel and liquid.',
        scheme: [['Kernel and liquid are endosperm', 1], ['Liquid free-nuclear, kernel cellular', 1]],
        d: 2, c: 'understanding', t: [2, 4],
      }),
    ]),
  ],
}));
