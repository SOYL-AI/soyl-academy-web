// ISC 12 Biology ch01 Pre-fertilisation — question bank in ISC style (1-mark objective and give-a-reason subparts,
// 2- and 3-mark short answers, diagram-based items, 5-mark structured questions). AR keys (ISC options): b d a c d.
import { mk, add, svgV, r } from './lib.mjs';
import { ploidy, pollenFromAnther, sacNuclei } from './calc.mjs';
import { EMBRYO_SAC_Q, ANTHER_Q } from './svgs.mjs';

const { mcq, ar, fill, num, short, long, part } = mk;
const sacFig = svgV(EMBRYO_SAC_Q, 'Unlabelled embryo sac with parts marked A to E');
const antherFig = svgV(ANTHER_Q, 'Unlabelled microsporangium wall with layers marked P to T');

// ---------------------------------------------------------------- t01 stamen, microsporangium, pollen
add('tapetum-mcq', mcq({
  stem: 'Which wall layer of a microsporangium nourishes the developing pollen grains?',
  right: 'Tapetum',
  wrong: ['Epidermis', 'Endothecium', 'Middle layers'],
  sol: 'The innermost layer, the tapetum, nourishes the developing pollen grains — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('endothecium-mcq', mcq({
  stem: 'Fibrous thickenings in which layer help an anther to split open (dehisce)?',
  right: 'Endothecium',
  wrong: ['Tapetum', 'Sporogenous tissue', 'Connective'],
  sol: 'The endothecium, below the epidermis, helps in dehiscence — option (@K).',
  d: 2, c: 'recall', t: [1],
}));
add('exine-mcq', mcq({
  stem: 'Pollen grains recovered from rock layers millions of years old still show their surface patterns clearly. Which property explains this?',
  right: 'The exine contains sporopollenin, which resists high temperature, strong acids and alkalis, and no known enzyme degrades it.',
  wrong: ['The intine contains cellulose, which never decays.', 'The generative cell secretes a protective wax.', 'Pollen grains are coated with mucilage.'],
  sol: 'Sporopollenin in the exine is one of the most resistant organic materials known, so pollen fossilises well — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('germpore-mcq', mcq({
  stem: 'When a pollen grain germinates, the pollen tube always emerges at particular points on its surface. Why?',
  right: 'These are germ pores, where sporopollenin is absent from the exine.',
  wrong: ['These points have the thickest exine.', 'The generative cell pushes through the thinnest intine anywhere.', 'These points are where the tapetum was attached.'],
  sol: 'Germ pores lack sporopollenin, so the tube can push out there — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('pollenstage-mcq', mcq({
  stem: 'In over 60 percent of angiosperms, pollen grains are shed at the',
  right: '2-celled stage',
  wrong: ['1-celled stage', '3-celled stage', '4-celled tetrad stage'],
  sol: 'Most angiosperms shed pollen with a vegetative and a generative cell; the rest shed it at the 3-celled stage — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('viability-mcq', mcq({
  stem: 'A rice breeder must use pollen collected in the field for a cross planned next season. What should she do?',
  right: 'Store the pollen in liquid nitrogen at about −196 °C in a pollen bank.',
  wrong: ['Keep it in an open dish at room temperature; rice pollen stays viable for months.', 'Dry it in sunlight to kill the generative cell.', 'Soak it in water until it is needed.'],
  sol: 'Rice pollen loses viability within about 30 minutes, so it must be cryopreserved in liquid nitrogen — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('parthenium-mcq', mcq({
  stem: 'Pollen of which weed, which entered India as a contaminant with imported wheat, causes allergies such as asthma?',
  right: 'Parthenium (carrot grass)',
  wrong: ['Eichhornia (water hyacinth)', 'Vallisneria', 'Commelina'],
  sol: 'Parthenium pollen is a common allergen — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('anther-fig-mcq', mcq({
  stem: 'The figure shows the wall of a microsporangium with layers marked P to T. Which letter marks the layer whose cells have dense cytoplasm, often more than one nucleus, and feed the developing pollen?',
  right: 'S',
  wrong: ['P', 'Q', 'T'],
  sol: 'From outside in: P epidermis, Q endothecium, R middle layers, S tapetum, T sporogenous tissue. The tapetum is S — option (@K).',
  d: 3, c: 'application', t: [1],
  assets: [antherFig],
}));
{
  const a = pollenFromAnther({ sporangia: 4, mmcPerSporangium: 25 });
  const anthers = 5;
  const total = a.pollen * anthers;
  add('pollen-num', num({
    stem: 'A flower has 5 stamens. Each anther has 4 microsporangia, and each microsporangium has 25 pollen mother cells. How many pollen grains can the flower produce?',
    value: total,
    sol: r`Mother cells per anther $= 4 \times 25 = ${a.totalMmc}$; pollen per anther $= ${a.totalMmc} \times 4 = ${a.pollen}$; flower $= ${a.pollen} \times ${anthers} = ${total}$.`,
    scheme: [[`${total}`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 2000 || 'value');
}
{
  const p = ploidy(16);
  add('generative-num', num({
    stem: 'The leaf cells of a plant have 16 chromosomes. How many chromosomes are present in the generative cell of its pollen grain?',
    value: p.haploid,
    sol: r`The pollen grain develops from a microspore formed by meiosis, so its cells are haploid: $\dfrac{16}{2} = ${p.haploid}$.`,
    scheme: [[`${p.haploid}`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 8 || 'value');
}
add('sporopollenin-fill', fill({
  stem: 'The exine of the pollen grain is made of ______.',
  acc: [['sporopollenin']],
  sol: 'Sporopollenin.',
  d: 1, c: 'recall', t: [1],
}));
add('exine-ar', ar({
  a: 'Pollen grains are well preserved as fossils.',
  r: 'The intine of the pollen grain is made of cellulose and pectin.',
  key: 'b',
  sol: 'Both statements are true, but fossil preservation is due to sporopollenin in the exine, not the intine — option (b).',
  d: 3, c: 'analysis', t: [1],
}));
add('tapetum-ar', ar({
  a: 'The tapetum is the outermost wall layer of the microsporangium.',
  r: 'The main function of the tapetum is to provide mechanical protection to the anther.',
  key: 'd',
  sol: 'The tapetum is the innermost wall layer and it nourishes the developing pollen, so both statements are false — option (d).',
  d: 2, c: 'understanding', t: [1],
}));
add('rice-short', short({
  marks: 1,
  stem: 'Give a reason: Pollen grains of rice and wheat must be used for pollination soon after they are shed.',
  model: 'Their pollen loses **viability** within about **30 minutes** of release.',
  sol: 'Short viability.',
  scheme: [['Viability lost in about 30 minutes', 1]],
  d: 2, c: 'application', t: [1],
}));
add('microsp-short', short({
  marks: 2,
  stem: 'Define microsporogenesis and state the ploidy of the pollen mother cell and of the microspores.',
  model: '**Microsporogenesis** is the formation of **microspores** from a **pollen (microspore) mother cell** by **meiosis**, giving a **microspore tetrad**. The pollen mother cell is **diploid (2n)** and each microspore is **haploid (n)**.',
  sol: 'Definition and ploidy.',
  scheme: [['Definition with meiosis and tetrad', 1], ['PMC 2n, microspores n', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('viability-short', short({
  marks: 2,
  stem: 'A seed company wants to cross a wheat variety that flowers in March with one that flowers in May. Explain why pollen viability is a problem and how it can be overcome.',
  model: 'Wheat pollen stays **viable for only about 30 minutes**, so pollen from the March-flowering parent would be dead by May. It can be collected and stored in a **pollen bank** in **liquid nitrogen at about −196 °C**, where it stays viable for years, and used when the other parent flowers.',
  sol: 'Short viability; cryopreservation.',
  scheme: [['Short viability of wheat pollen', 1], ['Storage in liquid nitrogen (pollen bank)', 1]],
  d: 3, c: 'application', t: [1],
}));
add('pollen-short', short({
  marks: 3,
  stem: 'Draw a neat, labelled diagram of a mature two-celled pollen grain and state the function of any two labelled parts.',
  model: '**Diagram labels:** exine with **germ pore**, intine, **vegetative cell** with its nucleus, **generative cell**.\n\n**Functions:** the **exine** of sporopollenin protects the grain against heat, acids, alkalis and enzymes; the **germ pore** is where the pollen tube emerges; the **generative cell** divides to form **two male gametes**; the **vegetative cell** stores food and forms the pollen tube.',
  sol: 'Diagram with labels; two functions.',
  scheme: [['Diagram with at least four correct labels', 2], ['Two functions', 1]],
  wl: [40, 96],
  d: 2, c: 'application', t: [1],
}));
add('anther-short', short({
  marks: 3,
  stem: 'Draw a labelled diagram of the transverse section of a young anther showing one microsporangium in detail. Why is a typical anther called tetrasporangiate?',
  model: '**Diagram labels:** two anther lobes, **connective**, four **microsporangia**; in one sporangium the wall layers **epidermis, endothecium, middle layers, tapetum** around the **sporogenous tissue**.\n\nThe anther is **bilobed** and each lobe has **two thecae** (dithecous), so there are **four microsporangia** — it is **tetrasporangiate**.',
  sol: 'Diagram and reason.',
  scheme: [['Diagram with lobes and four sporangia', 1], ['Wall layers labelled in order', 1], ['Reason: two lobes × two thecae', 1]],
  wl: [40, 96],
  d: 2, c: 'application', t: [1],
}));
add('microsporogenesis-long', long({
  stem: '(a) Describe the wall layers of a microsporangium, stating one function each of the endothecium and the tapetum. [2]\n(b) Describe microsporogenesis and the development of the pollen grain up to the two-celled stage. [2]\n(c) Give one economic importance of pollen grains. [1]',
  model: '(a) From outside in, the wall has the **epidermis**, **endothecium**, two or three **middle layers** and the **tapetum**. The **endothecium** has fibrous thickenings that help the anther to **dehisce**; the **tapetum**, with dense cytoplasm and often more than one nucleus, **nourishes** the developing pollen grains.\n\n(b) The centre of a young microsporangium has **sporogenous tissue**. Its cells act as **pollen mother cells (2n)**, each of which divides by **meiosis** to form a **tetrad of four haploid microspores**. As the anther dehydrates, the microspores separate and each develops a wall of **exine** (sporopollenin, with germ pores) and **intine** (cellulose and pectin). The microspore nucleus divides by **mitosis** to form a large **vegetative cell** and a small **generative cell**: the **two-celled pollen grain**.\n\n(c) Pollen is stored in **pollen banks** for crop breeding (or: pollen tablets are used as **food supplements**; pollen of some plants such as **Parthenium** causes allergies).',
  sol: 'Wall layers with functions; microsporogenesis; one importance.',
  scheme: [['(a) Four layers and two functions', 2], ['(b) PMC meiosis to tetrad', 1], ['(b) Microspore to two-celled pollen', 1], ['(c) One economic importance', 1]],
  wl: [80, 200],
  d: 3, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 pistil, ovule, embryo sac
add('monosporic-mcq', mcq({
  stem: 'In a monosporic embryo sac, how many megaspores take part in forming the female gametophyte?',
  right: 'One',
  wrong: ['Two', 'Four', 'Eight'],
  sol: 'Of the four megaspores, one is functional and three degenerate — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('mmc-mcq', mcq({
  stem: 'The megaspore mother cell differentiates in which region of the ovule?',
  right: 'The micropylar region of the nucellus',
  wrong: ['The chalazal end of the integument', 'The funicle', 'The hilum'],
  sol: 'A single MMC differentiates in the micropylar region of the nucellus — option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('anatropous-mcq', mcq({
  stem: 'In an anatropous ovule,',
  right: 'the body of the ovule is inverted so that the micropyle lies close to the funicle',
  wrong: ['the micropyle lies opposite the funicle in a straight line', 'there are no integuments', 'the embryo sac lies outside the nucellus'],
  sol: 'Anatropous means inverted: the micropyle comes to lie near the funicle and hilum — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('sac-fig-mcq', mcq({
  stem: 'In the figure of an embryo sac, parts are marked A to E. Which part guides the pollen tube into the embryo sac?',
  right: 'E, the filiform apparatus of the synergids',
  wrong: ['A, the antipodal cells', 'B, the polar nuclei', 'C, the egg cell'],
  sol: 'E marks the filiform apparatus at the micropylar tip of the synergids, which guides the pollen tube — option (@K).',
  d: 3, c: 'application', t: [2],
  assets: [sacFig],
}));
add('sac-fig2-mcq', mcq({
  stem: 'In the same figure (parts A to E), which two letters mark nuclei that will later fuse with a male gamete to form the primary endosperm nucleus?',
  right: 'B (the two polar nuclei)',
  wrong: ['A (the antipodals)', 'D (the synergids)', 'C and D together'],
  sol: 'The two polar nuclei in the central cell (B) take part in triple fusion — option (@K).',
  d: 3, c: 'application', t: [2],
  assets: [sacFig],
}));
add('synergid-mcq', mcq({
  stem: 'A scientist destroys both synergids of an embryo sac before pollination. Which event is most likely to fail?',
  right: 'Guidance and entry of the pollen tube into the embryo sac',
  wrong: ['Meiosis in the megaspore mother cell', 'Formation of the antipodal cells', 'Formation of the funicle'],
  sol: 'The synergids, with their filiform apparatus, guide the pollen tube into the embryo sac — option (@K).',
  d: 3, c: 'application', t: [2],
}));
{
  const k = 3, nuc = sacNuclei(k);
  add('sacnuclei-num', num({
    stem: 'The nucleus of a functional megaspore undergoes three successive free-nuclear mitoses. How many nuclei does the embryo sac then contain?',
    value: nuc,
    sol: r`Each division doubles the nuclei: $2^{3} = ${nuc}$.`,
    scheme: [[`${nuc}`, 1]],
    d: 1, c: 'application', t: [2],
  }), (q) => q.answer.value === 8 || 'value');
}
{
  const p = ploidy(40);
  add('antipodal-num', num({
    stem: 'The nucellus cells of an ovule have 40 chromosomes each. How many chromosomes does each antipodal cell of its embryo sac have?',
    value: p.haploid,
    sol: r`Embryo-sac cells come from a haploid megaspore by mitosis: $\dfrac{40}{2} = ${p.haploid}$.`,
    scheme: [[`${p.haploid}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 20 || 'value');
}
add('sac-ar', ar({
  a: 'A typical mature embryo sac is 8-nucleate but 7-celled.',
  r: 'The two polar nuclei lie together in a single large central cell.',
  key: 'a',
  sol: 'Both are true, and the two polar nuclei sharing one central cell explains why there are eight nuclei but only seven cells — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('freenuclear-short', short({
  marks: 1,
  stem: 'Give a reason: The early divisions in the developing embryo sac are called free-nuclear divisions.',
  model: 'The nuclei divide but **cell walls are not formed** until the 8-nucleate stage.',
  sol: 'No wall formation.',
  scheme: [['Nuclear division without cell wall formation', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('ovule-short', short({
  marks: 2,
  stem: 'Name the parts of an ovule that (i) attaches it to the placenta, (ii) is the opening in the integuments, (iii) is the basal region opposite this opening, and (iv) is the mass of cells enclosing the embryo sac.',
  model: '(i) **Funicle** (joining at the hilum); (ii) **micropyle**; (iii) **chalaza**; (iv) **nucellus**, a tissue with abundant food reserve that encloses the embryo sac.',
  sol: 'Four parts.',
  scheme: [['Funicle and micropyle', 1], ['Chalaza and nucellus', 1]],
  wl: [12, 50],
  d: 1, c: 'recall', t: [2],
}));
add('megaspore-short', short({
  marks: 3,
  stem: 'Describe megasporogenesis and explain what is meant by monosporic development of the embryo sac.',
  model: 'A single large **megaspore mother cell (2n)**, with dense cytoplasm and a prominent nucleus, differentiates in the **micropylar region** of the **nucellus**. It divides by **meiosis** to give **four haploid megaspores**, usually in a linear row. In most flowering plants **one megaspore is functional** and the other **three degenerate**. Because the whole embryo sac then develops from this **single** megaspore, the development is called **monosporic**.',
  sol: 'MMC, meiosis, one functional megaspore.',
  scheme: [['MMC in micropylar nucellus', 1], ['Meiosis: four megaspores, three degenerate', 1], ['Monosporic explained', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('sac-short', short({
  marks: 3,
  stem: 'Draw a labelled diagram of a mature embryo sac. How many cells and nuclei does it contain, and what is the ploidy of these nuclei?',
  model: '**Diagram labels:** at the **micropylar end**, the **egg apparatus** — **egg cell** and two **synergids** with **filiform apparatus**; in the centre, the **central cell** with **two polar nuclei**; at the **chalazal end**, three **antipodal cells**.\n\nIt has **7 cells** and **8 nuclei**; all are **haploid**, as they arise from a haploid megaspore by mitosis.',
  sol: 'Diagram; 7 cells, 8 nuclei; haploid.',
  scheme: [['Diagram with egg apparatus, central cell and antipodals', 2], ['7 cells, 8 nuclei, all haploid', 1]],
  wl: [40, 96],
  d: 2, c: 'application', t: [2],
}));
add('sac-long', long({
  stem: '(a) Draw a neat, labelled diagram of the L.S. of an anatropous ovule. [2]\n(b) Describe the development of the female gametophyte from the functional megaspore. [2]\n(c) A student says, “The female gametophyte has eight cells.” Correct the statement. [1]',
  model: '(a) **Labels:** funicle, hilum, outer and inner integuments, micropyle, chalaza, nucellus and embryo sac, with the micropyle lying close to the funicle (inverted ovule).\n\n(b) The nucleus of the **functional megaspore** divides by mitosis into two nuclei, which move to opposite poles (2-nucleate embryo sac). Two further **free-nuclear** mitoses at each pole give the **4-nucleate** and then the **8-nucleate** stage. Cell walls then form: three cells at the micropylar end make the **egg apparatus** (two **synergids** and an **egg cell**), three at the chalazal end are **antipodals**, and the two remaining **polar nuclei** stay in the large **central cell**.\n\n(c) The female gametophyte has **eight nuclei but seven cells**, because the two polar nuclei share one central cell.',
  sol: 'Ovule diagram; development; correction.',
  scheme: [['(a) Labelled anatropous ovule', 2], ['(b) Three free-nuclear divisions to 8 nuclei', 1], ['(b) Arrangement into 7 cells', 1], ['(c) Seven cells, eight nuclei', 1]],
  wl: [70, 200],
  d: 3, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 pollination
add('wind-mcq', mcq({
  stem: 'Which feature suggests that a flower is wind-pollinated?',
  right: 'A large, feathery stigma and well-exposed stamens',
  wrong: ['Bright petals and strong scent', 'Abundant nectar and sticky pollen', 'Flowers that never open'],
  sol: 'Wind-pollinated flowers expose their stamens and trap airborne pollen with feathery stigmas — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('geitono-mcq', mcq({
  stem: 'Pollen from one flower of a mango tree is carried by a bee to another flower on the same tree. This is',
  right: 'geitonogamy, which is genetically similar to autogamy',
  wrong: ['xenogamy, which brings genetically different pollen', 'cleistogamy', 'autogamy within a single flower'],
  sol: 'Transfer between flowers of the same plant is geitonogamy; the pollen is genetically the same — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('cleisto-mcq', mcq({
  stem: 'Which plant produces both chasmogamous and cleistogamous flowers?',
  right: 'Commelina',
  wrong: ['Vallisneria', 'Papaya', 'Maize'],
  sol: 'Viola, Oxalis and Commelina bear both kinds of flowers — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('vallisneria-mcq', mcq({
  stem: 'How does pollination take place in Vallisneria?',
  right: 'Female flowers reach the surface on long stalks, and released male flowers float to them on the water.',
  wrong: ['Pollen is carried by bats at night.', 'Flowers never open and self-pollinate.', 'Pollen is carried under water by fish.'],
  sol: 'Vallisneria is pollinated at the water surface by floating male flowers — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('mucilage-mcq', mcq({
  stem: 'Why do pollen grains of most water-pollinated species have a mucilaginous covering?',
  right: 'To protect them from wetting',
  wrong: ['To attract insects', 'To make them heavier so they sink to the stigma', 'To store food for the pollen tube'],
  sol: 'The mucilage protects the pollen from wetting — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('hyacinth-mcq', mcq({
  stem: 'Water hyacinth grows in ponds, yet it is not pollinated by water. What is the best explanation?',
  right: 'Its flowers emerge above the water surface and are pollinated by insects or wind.',
  wrong: ['It has no flowers at all.', 'Its flowers are always cleistogamous.', 'Its pollen sinks to the pond floor.'],
  sol: 'Like the water lily, water hyacinth raises its flowers above water, where insects or wind pollinate them — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('yucca-mcq', mcq({
  stem: 'A plant and a moth species cannot complete their life cycles without each other: the moth lays eggs in the plant’s ovary and pollinates it. The plant is',
  right: 'Yucca',
  wrong: ['Amorphophallus', 'Zostera', 'Oxalis'],
  sol: 'Yucca and its moth depend on each other — option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('robber-mcq', mcq({
  stem: 'Some insects visit flowers and take nectar without carrying pollen to other flowers. They are called',
  right: 'nectar or pollen robbers',
  wrong: ['pollinators', 'emasculators', 'detritivores'],
  sol: 'Visitors that consume floral rewards without pollinating are pollen or nectar robbers — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('cleisto-ar', ar({
  a: 'Cleistogamous flowers produce assured seed set.',
  r: 'Cleistogamous flowers depend on insects to carry their pollen.',
  key: 'c',
  sol: 'A is true: cleistogamous flowers never open and self-pollinate without an agent. R is false — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
add('analogy-short', short({
  marks: 1,
  stem: 'Complete the analogy: Vallisneria : water :: maize : ______.',
  model: '**Wind** (maize is wind-pollinated).',
  sol: 'Pollinating agent.',
  scheme: [['Wind', 1]],
  wl: null,
  d: 2, c: 'application', t: [3],
}));
add('windpollen-short', short({
  marks: 1,
  stem: 'Give a reason: Wind-pollinated plants produce pollen grains in very large numbers.',
  model: 'Wind carries pollen **randomly**, so most of it is **wasted**; large numbers ensure that some reach a stigma.',
  sol: 'Wastage in random transfer.',
  scheme: [['Random transfer, much pollen wasted', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('cleistoself-short', short({
  marks: 1,
  stem: 'Give a reason: Cleistogamous flowers are invariably autogamous.',
  model: 'They **never open**, so pollen from their anthers can reach only their **own stigma**.',
  sol: 'Closed flower.',
  scheme: [['Flowers never open; only own pollen reaches stigma', 1]],
  d: 2, c: 'application', t: [3],
}));
add('kinds-short', short({
  marks: 2,
  stem: 'Distinguish between geitonogamy and xenogamy, stating which one brings genetic variation.',
  model: '**Geitonogamy** is transfer of pollen to another flower of the **same plant**; it needs an agent but the pollen is **genetically the same**. **Xenogamy** is transfer to a flower of a **different plant**, bringing **genetically different pollen**, so only **xenogamy** produces genetic variation.',
  sol: 'Source of pollen; variation.',
  scheme: [['Both defined', 1], ['Xenogamy brings variation', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('selfcross-short', short({
  marks: 2,
  stem: 'Give two advantages of self-pollination and two of cross-pollination.',
  model: '**Self-pollination:** **seed set is assured** without any agent; it **maintains pure lines** and wastes little pollen. **Cross-pollination:** it produces **genetic variation** and **more vigorous, adaptable offspring**, avoiding inbreeding depression.',
  sol: 'Two each.',
  scheme: [['Two advantages of self-pollination', 1], ['Two advantages of cross-pollination', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('geito-short', short({
  marks: 2,
  stem: 'A gardener grows a single isolated tree of a self-compatible species and finds that bees visit its many flowers. Explain why its seedlings show little genetic variation even though insects pollinated the flowers.',
  model: 'With only one tree, bees carry pollen **between flowers of the same plant**: **geitonogamy**. Although an agent is involved, the pollen is **genetically identical** to the ovules’ parent, so it is **genetically equivalent to self-pollination** and gives little variation.',
  sol: 'Geitonogamy is genetically selfing.',
  scheme: [['Identifies geitonogamy', 1], ['Same genotype: like autogamy', 1]],
  d: 3, c: 'application', t: [3],
}));
add('agents-short', short({
  marks: 3,
  stem: 'Compare wind-pollinated and insect-pollinated flowers in respect of (i) the pollen, (ii) the stigma and (iii) the corolla and nectar.',
  model: '(i) **Pollen:** wind — **light, dry, non-sticky** and produced in **huge numbers**; insect — **sticky** and fewer.\n\n(ii) **Stigma:** wind — **large, often feathery**, well exposed; insect — usually **sticky** and within the flower.\n\n(iii) **Corolla and nectar:** wind — flowers small, **dull, unscented**, no nectar; insect — **large, colourful, fragrant**, with **nectar** as a reward.',
  sol: 'Three comparisons.',
  scheme: [['Pollen', 1], ['Stigma', 1], ['Corolla and nectar', 1]],
  d: 2, c: 'analysis', t: [3],
}));
add('water-short', short({
  marks: 3,
  stem: 'Describe how pollination takes place in (i) Vallisneria and (ii) a marine sea grass such as Zostera. Why is water pollination rare?',
  model: '(i) **Vallisneria:** female flowers reach the **water surface** on **long stalks**; male flowers or pollen are released on the surface and **carried passively** by currents, some reaching the female flowers.\n\n(ii) **Sea grasses:** female flowers stay **submerged**; **long, ribbon-like** pollen grains, protected by **mucilage**, are carried **inside the water** to the stigmas.\n\nWater pollination is rare (about **30 genera**, mostly monocots) because most flowers are borne above water, where wind and animals are more efficient carriers.',
  sol: 'Two mechanisms; rarity.',
  scheme: [['Vallisneria', 1], ['Sea grass with ribbon-like pollen', 1], ['Rarity: about 30 genera', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('pollination-long', long({
  stem: '(a) Distinguish between chasmogamous and cleistogamous flowers, naming one plant that bears both. [2]\n(b) Explain how a flower such as Amorphophallus or Yucca benefits its pollinator besides offering nectar. [1]\n(c) A farmer finds that a crop gives poor seed set in a year when bees are scarce, while a weed nearby sets seed normally. Suggest one floral feature of the weed that could explain this, and its disadvantage. [2]',
  model: '(a) **Chasmogamous** flowers **open**, exposing anthers and stigma, so they can be self- or cross-pollinated. **Cleistogamous** flowers **never open**; anthers and stigma lie close together, so they are always **autogamous**. **Commelina** (also Viola, Oxalis) bears both.\n\n(b) These flowers offer the insect a **safe place to lay eggs**; in Yucca the moth’s larvae develop in the ovary, while the moth pollinates the flower.\n\n(c) The weed may bear **cleistogamous flowers**, which self-pollinate without any agent and so give **assured seed set** when bees are scarce. Their disadvantage is that seeds come only from **self-pollination**, so the offspring have **little genetic variation** (and may suffer inbreeding depression).',
  sol: 'Chasmogamy and cleistogamy; egg-laying site; assured seed set versus variation.',
  scheme: [['(a) Distinction', 1], ['(a) Example', 1], ['(b) Egg-laying site', 1], ['(c) Cleistogamy giving assured seed set', 1], ['(c) Disadvantage: little variation', 1]],
  wl: [70, 200],
  d: 4, c: 'analysis', t: [3],
}));

// ---------------------------------------------------------------- t04 outbreeding and pollen–pistil interaction; t05 hybridisation
add('outbreed-mcq', mcq({
  stem: 'A plant species prevents both autogamy and geitonogamy. Which condition does it most likely show?',
  right: 'Dioecy, as in papaya',
  wrong: ['Monoecy, as in castor', 'Cleistogamy, as in Viola', 'Bisexual flowers with synchronised maturation'],
  sol: 'Only when male and female flowers are on different plants are both forms of self-pollination prevented — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('protandry-mcq', mcq({
  stem: 'In a flower showing protandry,',
  right: 'the anthers release pollen before the stigma becomes receptive',
  wrong: ['the stigma becomes receptive before the anthers mature', 'anther and stigma mature together', 'the flower has no stamens'],
  sol: 'Protandry is a form of dichogamy in which the anthers mature first — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('herkogamy-mcq', mcq({
  stem: 'In a certain flower, the stigma projects far beyond the anthers so that its own pollen cannot fall on it. This outbreeding device is',
  right: 'herkogamy',
  wrong: ['protogyny', 'self-incompatibility', 'cleistogamy'],
  sol: 'Placing anther and stigma at different positions is herkogamy — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('selfincomp-mcq', mcq({
  stem: 'Pollen of a plant lands on its own stigma at the right time but fails to germinate, while pollen from another plant of the species germinates normally. This is due to',
  right: 'self-incompatibility, a genetic mechanism recognised through chemical components of pollen and pistil',
  wrong: ['dichogamy', 'the pollen being dead', 'the absence of a germ pore'],
  sol: 'Self-incompatibility prevents self-pollen from germinating or growing in the pistil — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('monoecious-ar', ar({
  a: 'Monoecious plants such as maize prevent both autogamy and geitonogamy.',
  r: 'In monoecious plants, male and female flowers are borne on different plants.',
  key: 'd',
  sol: 'Monoecious plants bear male and female flowers on the same plant, so they prevent autogamy but not geitonogamy. Both statements are false — option (d).',
  d: 3, c: 'analysis', t: [4],
}));
add('pistil-short', short({
  marks: 2,
  stem: 'What is meant by pollen–pistil interaction? On what does the pistil’s ability to recognise compatible pollen depend?',
  model: 'Pollen–pistil interaction is the series of events from the **deposition of pollen on the stigma** until the **pollen tube enters the ovule**. The pistil recognises compatible pollen through the interaction of **chemical components** of the pollen with those of the pistil.',
  sol: 'Definition and chemical basis.',
  scheme: [['Definition', 1], ['Chemical components of pollen and pistil', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('outbreed-short', short({
  marks: 3,
  stem: 'Most flowering plants have bisexual flowers, yet many avoid self-pollination. Describe three devices that discourage self-pollination.',
  model: '1. **Dichogamy:** pollen release and stigma receptivity are **not synchronised** — anthers mature first (**protandry**) or the stigma does (**protogyny**).\n2. **Herkogamy:** **anther and stigma** are placed at **different positions**, so pollen cannot reach the stigma of the same flower.\n3. **Self-incompatibility:** a **genetic** mechanism stops self-pollen from **germinating** or its tube from **growing** in the pistil.',
  sol: 'Three devices.',
  scheme: [['Dichogamy', 1], ['Herkogamy', 1], ['Self-incompatibility', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('emasc-mcq', mcq({
  stem: 'Why is emasculation carried out before the anthers dehisce?',
  right: 'To prevent the flower’s own pollen from reaching its stigma',
  wrong: ['To make the stigma receptive', 'To increase the number of ovules', 'To help the anthers release pollen'],
  sol: 'Removing anthers before they shed pollen prevents self-pollination of the female parent — option (@K).',
  d: 1, c: 'understanding', t: [5],
}));
add('unisexual-mcq', mcq({
  stem: 'A breeder uses a maize plant as the female parent in a cross. Which step of artificial hybridisation can she skip?',
  right: 'Emasculation, because the female flowers are unisexual',
  wrong: ['Bagging, because maize pollen is heavy', 'Dusting pollen, because maize self-pollinates', 'Rebagging, because maize seeds form instantly'],
  sol: 'In unisexual female flowers there are no anthers to remove; the female buds only need bagging — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('butter-fill', fill({
  stem: 'Emasculated flowers are usually covered with bags made of ______ paper to prevent contamination by unwanted pollen.',
  acc: [['butter', 'butter-paper']],
  sol: 'Butter paper.',
  d: 1, c: 'recall', t: [5],
}));
add('rebag-short', short({
  marks: 1,
  stem: 'Give a reason: An emasculated flower is rebagged after it has been dusted with the desired pollen.',
  model: 'To keep out **unwanted pollen** while the fruit and seeds develop.',
  sol: 'Prevent contamination.',
  scheme: [['Prevents contamination by other pollen', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('hybrid-short', short({
  marks: 3,
  stem: 'A breeder wants to combine high yield from variety P (bisexual flowers) with disease resistance from variety Q. Describe the steps she should follow, using P as the female parent.',
  model: '1. **Emasculation:** remove the **anthers** from flower **buds** of **P** with forceps **before they dehisce**.\n2. **Bagging:** cover the emasculated buds with **butter-paper bags** to keep out unwanted pollen.\n3. When the **stigma becomes receptive**, dust it with **pollen from Q**, then **rebag** the flower and let the fruit and seeds develop; the seeds give hybrid plants to be screened for both characters.',
  sol: 'Emasculation, bagging, pollination and rebagging.',
  scheme: [['Emasculation of P before dehiscence', 1], ['Bagging', 1], ['Dusting Q pollen at receptivity and rebagging', 1]],
  d: 2, c: 'application', t: [5],
}));
add('hybrid-long', long({
  stem: '(a) What is the significance of artificial hybridisation in plant breeding? [1]\n(b) Describe emasculation and bagging, explaining why each is necessary. [2]\n(c) A breeder emasculated flowers of a bisexual variety but forgot to bag them. Predict two possible outcomes for the seeds formed, with reasons. [2]',
  model: '(a) It allows breeders to **combine desirable characters** of two parents (such as yield and resistance) in one variety, which is the basis of **crop improvement**.\n\n(b) **Emasculation** is removal of the **anthers** from a **bud** of the bisexual female parent **before dehiscence**, so that its **own pollen** cannot pollinate it. **Bagging** is covering the emasculated flower with a **butter-paper bag** so that **no unwanted pollen** reaches the stigma; only the chosen pollen is dusted on it later.\n\n(c) The open flowers could receive **pollen from other plants** carried by wind or insects. Some seeds may then be **hybrids with an unknown male parent**, and some flowers may set **no seed** if no pollen arrives; either way the cross would not be the one intended.',
  sol: 'Significance; steps; prediction.',
  scheme: [['(a) Combining desirable characters', 1], ['(b) Emasculation with reason', 1], ['(b) Bagging with reason', 1], ['(c) Unknown pollen parent', 1], ['(c) Possible failure of seed set or wrong hybrids', 1]],
  wl: [70, 200],
  d: 3, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- stimulus-based (case) items
{
  const a = pollenFromAnther({ sporangia: 4, mmcPerSporangium: 40 });
  add('anther-case', mk.case({
    passage: 'A student made thin transverse sections of anthers from a flower bud at three ages and recorded what she saw in one microsporangium.\n\n| Stage | Observation |\n|---|---|\n| Young bud | A compact mass of large cells in the centre, surrounded by four wall layers |\n| Older bud | Groups of four cells held together in the centre |\n| Open flower | Many separate grains, each with a thick outer wall and a few thin areas |',
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'The groups of four cells seen in the older bud are',
        right: 'microspore tetrads formed by meiosis',
        wrong: ['tapetal cells', 'groups of synergids', 'pollen tubes'],
        sol: 'Each pollen mother cell divides by meiosis into a tetrad of microspores — option (@K).',
        d: 2, c: 'understanding', t: [1],
      })),
      part('b', num({
        stem: 'If each of the 4 microsporangia had 40 pollen mother cells, how many pollen grains would one anther produce?',
        value: a.pollen,
        sol: r`$4 \times 40 = ${a.totalMmc}$ mother cells; $${a.totalMmc} \times 4 = ${a.pollen}$ pollen grains.`,
        scheme: [[`${a.pollen}`, 1]],
        d: 2, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'What are the “thin areas” in the wall of the open-flower grains, and why are they important?',
        model: 'They are **germ pores**, where the exine lacks **sporopollenin**. The **pollen tube** emerges through a germ pore when the grain germinates on the stigma.',
        sol: 'Germ pores.',
        scheme: [['Germ pores without sporopollenin', 1], ['Pollen tube emerges there', 1]],
        d: 2, c: 'application', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'Which wall layer, present in the young bud, would no longer be needed once the grains are mature, and why?',
          model: 'The **tapetum**, the innermost wall layer, **nourishes the developing pollen**; once the pollen grains are **mature**, this nourishing role is complete, so the layer is no longer needed.',
          sol: 'Tapetum.',
          scheme: [['Tapetum', 1], ['Its role of nourishing developing pollen is over', 1]],
          d: 3, c: 'analysis', t: [1],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 640 || 'value');
}
add('crop-case', mk.case({
  passage: 'Three crop plants were studied in a field.\n\n| Plant | Flowers |\n|---|---|\n| P | Male and female flowers on the same plant; tassels of long styles hang out in the wind |\n| Q | Separate male and female plants |\n| R | Bisexual flowers in which the stigma matures several days after the anthers have shed their pollen |',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Plant P is best described as',
      right: 'monoecious and wind-pollinated',
      wrong: ['dioecious and insect-pollinated', 'cleistogamous', 'water-pollinated'],
      sol: 'Male and female flowers on one plant make it monoecious; hanging styles show wind pollination, as in maize — option (@K).',
      d: 2, c: 'application', t: [3, 4],
    })),
    part('b', mcq({
      stem: 'Which outbreeding device does plant R show?',
      right: 'Protandry',
      wrong: ['Protogyny', 'Herkogamy', 'Dioecy'],
      sol: 'Anthers mature before the stigma: protandry, a form of dichogamy — option (@K).',
      d: 2, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'Which of P and Q can undergo geitonogamy? Explain.',
      model: '**P** can: its male and female flowers are on the **same plant**, so pollen can move between flowers of that plant. **Q** cannot, because each plant bears flowers of **only one sex**.',
      sol: 'Monoecious P only.',
      scheme: [['P can, flowers of both sexes on one plant', 1], ['Q cannot, plants unisexual', 1]],
      d: 3, c: 'analysis', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'If plant P is used as the female parent in a cross, which step of artificial hybridisation is not needed, and which step is still essential?',
        model: '**Emasculation** is not needed because the female flowers have **no anthers**. **Bagging** of the female flowers before they open is still essential to keep out **unwanted pollen**.',
        sol: 'No emasculation; bagging needed.',
        scheme: [['Emasculation not needed', 1], ['Bagging essential', 1]],
        d: 2, c: 'application', t: [5],
      }),
    ]),
  ],
}));
