// ISC 12 Biology ch01 Sexual Reproduction in Flowering Plants: Pre-fertilisation — two decks: Part 1 (t01–t02), Part 2 (t03–t05).
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { ANTHER, POLLEN, OVULE, EMBRYO_SAC, POLL_TYPES } from './svgs.mjs';
import { ploidy, pollenFromAnther, sacNuclei } from './calc.mjs';

export const V = {
  anther: svgV(ANTHER, 'Transverse section of a young anther and one enlarged microsporangium with its wall layers labelled'),
  pollen: svgV(POLLEN, 'A two-celled pollen grain with exine, germ pore, intine, vegetative cell and generative cell labelled'),
  ovule: svgV(OVULE, 'Longitudinal section of an anatropous ovule with its parts labelled'),
  sac: svgV(EMBRYO_SAC, 'A seven-celled, eight-nucleate embryo sac with antipodals, polar nuclei, egg cell, synergids and filiform apparatus labelled'),
  poll: svgV(POLL_TYPES, 'Autogamy, geitonogamy and xenogamy shown between flowers of two plants'),
};

// ---------------------------------------------------------------- computed numbers
const AN = pollenFromAnther({ sporangia: 4, mmcPerSporangium: 30 });
const PL = ploidy(24);
const NUC = sacNuclei(3);

export const deck1 = deck({
  part: 1,
  title: 'Pre-fertilisation — Part 1: Microsporogenesis and megasporogenesis',
  goals: [
    'Draw and label the T.S. of a mature anther and a two-celled pollen grain',
    'Describe microsporogenesis and the development of the pollen grain',
    'Draw and label the L.S. of an anatropous ovule',
    'Describe megasporogenesis and the development of a seven-celled, eight-nucleate embryo sac',
  ],
  slides: [
    sl('title', 'Sexual Reproduction in Flowering Plants: Pre-fertilisation', {
      b: 'Part 1 — how the male and female gametophytes are formed inside the flower.',
      v: flow('LR', [['f', 'Flower (site of sexual reproduction)'], ['a', 'Androecium: stamens make pollen'], ['g', 'Gynoecium: pistil holds ovules']], [['f', 'a'], ['f', 'g']], 'Flow from the flower to its male and female reproductive whorls'),
      n: 'The flower is the organ of sexual reproduction in angiosperms. Long before a flower opens, the decision to flower has been taken, and the floral buds develop. Inside them, the stamens and the pistil prepare the male and female gametophytes. This part follows how each one forms.',
    }),
    sl('concept', 'The two reproductive whorls', {
      b: 'A **stamen** has a slender **filament** and a terminal **anther**. A typical angiosperm anther is **bilobed** and **dithecous**: each lobe has two thecae, so the anther holds **four microsporangia**. The **pistil** has **stigma**, **style** and **ovary**; the ovary contains **ovules** attached to the **placenta**.',
      v: table(['Whorl', 'Unit', 'Parts'], [['Androecium', 'Stamen', 'Filament, anther (four microsporangia)'], ['Gynoecium', 'Pistil (carpel)', 'Stigma, style, ovary with ovules on the placenta']], 'Table of the male and female whorls with their parts'),
      n: 'Think of the stamen as a stalk carrying a four-chambered bag of pollen, and the pistil as a landing platform, a tube and a chamber holding the ovules. A flower may have one pistil or many, free or fused.',
    }),
    sl('diagram', 'Transverse section of the anther', {
      b: 'In T.S. the anther is **tetragonal**. Each **microsporangium** is surrounded by four wall layers: **epidermis**, **endothecium**, **middle layers** and **tapetum**. The centre holds **sporogenous tissue**.',
      v: V.anther,
      n: 'The outer three layers protect the sporangium and help the anther to split open and release pollen. The innermost layer, the tapetum, feeds the developing pollen grains. Its cells have dense cytoplasm and often more than one nucleus.',
    }),
    sl('concept', 'Microsporogenesis', {
      b: 'Each cell of the sporogenous tissue can act as a **pollen mother cell (PMC)** or **microspore mother cell**. It divides by **meiosis** to form a **microspore tetrad**. As the anther matures and dehydrates, the microspores separate and develop into **pollen grains**.',
      v: flow('LR', [['s', 'Sporogenous tissue (2n)'], ['p', 'Pollen mother cell (2n)'], ['t', 'Microspore tetrad (4 × n)'], ['g', 'Pollen grains (n)']], [['s', 'p'], ['p', 't', 'meiosis'], ['t', 'g', 'separate, develop']], 'Flow of microsporogenesis from sporogenous tissue to pollen grains'),
      n: 'The process of forming microspores from a pollen mother cell by meiosis is called microsporogenesis. One mother cell gives four microspores, so every pollen grain carries a single set of chromosomes.',
    }),
    sl('diagram', 'The pollen grain', {
      b: 'The pollen grain wall has a hard **exine** of **sporopollenin**, one of the most resistant organic materials known, with **germ pores** where sporopollenin is absent; and a thin **intine** of **cellulose and pectin**. A mature grain has a large **vegetative cell** and a small, spindle-shaped **generative cell**.',
      v: V.pollen,
      n: 'Sporopollenin withstands high temperature, strong acids and alkalis, and no known enzyme degrades it, which is why pollen is so well preserved as fossils. In over sixty percent of angiosperms pollen is shed at this two-celled stage; in the rest, the generative cell first divides into two male gametes.',
    }),
    sl('example', 'Worked example 1: counting pollen and chromosomes', {
      b: `An anther has ${AN.sporangia} microsporangia, each with ${AN.mmc} pollen mother cells. The plant has 2n = ${PL.diploid}. How many pollen grains form, and how many chromosomes does each microspore nucleus have?`,
      ul: [
        r`Pollen mother cells $= ${AN.sporangia} \times ${AN.mmc} = ${AN.totalMmc}$.`,
        r`Each meiosis gives 4 microspores: pollen $= ${AN.totalMmc} \times 4 = ${AN.pollen}$.`,
        r`Meiosis halves the number: microspore nucleus $= \dfrac{${PL.diploid}}{2} = ${PL.haploid}$ chromosomes.`,
      ],
      v: table(['Quantity', 'Value'], [['Pollen mother cells', String(AN.totalMmc)], ['Pollen grains', String(AN.pollen)], ['Chromosomes per microspore', String(PL.haploid)]], `Worked table: ${AN.pollen} pollen grains with ${PL.haploid} chromosomes each`),
      n: 'Multiply the sporangia by the mother cells to get one hundred and twenty mother cells, and multiply by four because each meiosis gives a tetrad. That gives four hundred and eighty pollen grains. Each has half the parent number, twelve chromosomes.',
    }),
    sl('check', 'Quick check: tapetum', {
      b: 'Which wall layer of the microsporangium nourishes the developing pollen grains?',
      n: 'Quick check. Think of the innermost wall layer.',
      chk: 'tapetum-mcq',
    }),
    sl('concept', 'Pollen viability and economic importance', {
      b: '**Viability** is the period for which pollen remains able to germinate. It depends on the species and on temperature and humidity.',
      v: table(['Aspect', 'Detail'], [['Short viability', 'Rice and wheat: about 30 minutes after release'], ['Long viability', 'Some members of Rosaceae, Leguminosae and Solanaceae: months'], ['Storage', 'Pollen banks store pollen for years in liquid nitrogen at about −196 °C for crop breeding'], ['Allergy', 'Pollen of many species, such as Parthenium (carrot grass), causes asthma and bronchitis'], ['Food supplement', 'Pollen tablets and syrups are marketed to improve health and athletic performance']], 'Table of pollen viability and economic importance'),
      n: 'Some pollen lives only for minutes, other pollen for months. Plant breeders store pollen in liquid nitrogen so that crosses can be made long after flowering. Pollen also matters to health, as an allergen and as a nutrient-rich supplement.',
    }),
    sl('diagram', 'The pistil and the ovule', {
      b: 'An **ovule** is attached to the placenta by a stalk, the **funicle**, at the **hilum**. One or two **integuments** cover the **nucellus**, leaving an opening, the **micropyle**; the basal region opposite it is the **chalaza**. In an **anatropous** ovule, the body is inverted so the micropyle lies close to the funicle.',
      v: V.ovule,
      n: 'Inside the nucellus lies the embryo sac, the female gametophyte. Ovules usually have a single embryo sac formed from one megaspore. The number of ovules in an ovary may be one, as in wheat, paddy and mango, or many, as in papaya, watermelon and orchids.',
    }),
    sl('concept', 'Megasporogenesis', {
      b: 'A single **megaspore mother cell (MMC)** differentiates in the micropylar region of the nucellus. It divides by **meiosis** to give four megaspores. Usually **one is functional** and three degenerate. Development of the embryo sac from a single megaspore is **monosporic**.',
      v: flow('LR', [['m', 'Megaspore mother cell (2n)'], ['f', 'Four megaspores (n)'], ['o', 'One functional megaspore'], ['e', 'Embryo sac']], [['m', 'f', 'meiosis'], ['f', 'o', 'three degenerate'], ['o', 'e', 'three free-nuclear mitoses']], 'Flow of megasporogenesis to the embryo sac'),
      n: 'The functional megaspore nucleus divides by mitosis three times without forming walls, giving eight free nuclei. Only then do cell walls form. Free-nuclear division means nuclear division not followed at once by cell wall formation.',
    }),
    sl('diagram', 'The mature embryo sac', {
      b: 'Six of the eight nuclei are surrounded by cell walls: three cells at the micropylar end form the **egg apparatus** (one **egg cell** and two **synergids** with a **filiform apparatus**), three at the chalazal end are **antipodals**, and the two **polar nuclei** remain in the large **central cell**.',
      v: V.sac,
      n: 'The typical angiosperm embryo sac is therefore seven-celled and eight-nucleate. The filiform apparatus, a set of cellular thickenings at the tip of the synergids, guides the pollen tube into a synergid.',
    }),
    sl('example', 'Worked example 2: nuclei and ploidy in the embryo sac', {
      b: `The functional megaspore nucleus of a plant with 2n = ${PL.diploid} divides three times by free-nuclear mitosis. How many nuclei result, how many cells form, and what is the ploidy of each nucleus?`,
      ul: [
        r`Nuclei $= 2^{3} = ${NUC}$.`,
        'Cells: 3 antipodals + 2 synergids + 1 egg + 1 central cell = **7 cells** (the central cell has 2 polar nuclei).',
        r`All nuclei come from a haploid megaspore by mitosis, so each has $n = ${PL.haploid}$ chromosomes.`,
      ],
      v: table(['Cell', 'Number', 'Nuclei'], [['Antipodals', '3', '3'], ['Synergids', '2', '2'], ['Egg cell', '1', '1'], ['Central cell', '1', '2'], ['Total', '7', String(NUC)]], `Worked table: 7 cells, ${NUC} nuclei, each with ${PL.haploid} chromosomes`),
      n: 'Three rounds of doubling give eight nuclei. Six become separate cells and two share the central cell, so there are seven cells. Because mitosis copies the haploid megaspore nucleus, every one of these nuclei has twelve chromosomes.',
    }),
    sl('check', 'Quick check: monosporic development', {
      b: 'How many megaspores take part in forming a monosporic embryo sac?',
      n: 'Quick check. Remember how many megaspores stay functional.',
      chk: 'monosporic-mcq',
    }),
    sl('check', 'Quick check: embryo sac', {
      b: 'Judge the assertion and the reason about the embryo sac.',
      n: 'Quick check. Count the cells and the nuclei separately.',
      chk: 'sac-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Anther: bilobed, dithecous, four microsporangia; wall: epidermis, endothecium, middle layers, tapetum (nourishes).',
        'Microsporogenesis: PMC → meiosis → microspore tetrad → pollen grains.',
        'Pollen: exine of sporopollenin with germ pores; intine of cellulose and pectin; vegetative and generative cells.',
        'Ovule: funicle, hilum, integuments, micropyle, chalaza, nucellus; anatropous.',
        'Megasporogenesis: MMC → meiosis → 4 megaspores → 1 functional (monosporic) → 3 mitoses → 7 cells, 8 nuclei.',
      ],
      v: table(['Male side', 'Female side'], [['Microsporangium', 'Megasporangium (ovule)'], ['Pollen mother cell', 'Megaspore mother cell'], ['Pollen grain (male gametophyte)', 'Embryo sac (female gametophyte)']], 'Summary table comparing male and female development'),
      n: 'To recap: in the anther, pollen mother cells undergo meiosis to form pollen grains with a tough exine. In the ovule, one megaspore mother cell gives four megaspores, of which one forms the seven-celled, eight-nucleate embryo sac.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Draw the **T.S. of anther** and the **L.S. of an anatropous ovule** in pencil with neat label lines.',
        'Give the **function of the tapetum** and the **reason exine survives** (sporopollenin).',
        'State **monosporic** development and show the **8-nucleate, 7-celled** count.',
        'Write ploidy correctly: PMC and MMC 2n; pollen, megaspore and all embryo-sac nuclei n.',
      ],
      n: 'Exam tips. Practise the anther and ovule diagrams in pencil. Know what the tapetum does and why exine lasts. Explain monosporic development. And write the ploidy of every cell correctly.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Pre-fertilisation — Part 2: Pollination, outbreeding devices and artificial hybridisation',
  goals: [
    'Distinguish autogamy, chasmogamy, cleistogamy, geitonogamy and xenogamy',
    'Relate floral adaptations to wind, water and insect pollination',
    'Explain outbreeding devices and pollen–pistil interaction',
    'Describe emasculation and bagging in artificial hybridisation',
  ],
  slides: [
    sl('title', 'Pollination', {
      b: 'Part 2 — getting the pollen to the stigma, and the controls that decide which pollen succeeds.',
      v: flow('LR', [['p', 'Pollen released'], ['t', 'Transfer to a stigma'], ['r', 'Recognition by the pistil'], ['g', 'Pollen tube grows to the ovule']], [['p', 't'], ['t', 'r'], ['r', 'g']], 'Flow from pollen release to pollen tube growth'),
      n: 'Male and female gametes are non-motile in flowering plants, so pollen must be brought to the stigma. This transfer is pollination. Plants have evolved many devices both to achieve it and to control which pollen is accepted.',
    }),
    sl('diagram', 'Kinds of pollination', {
      b: '**Autogamy**: pollen to the stigma of the same flower. **Geitonogamy**: to another flower of the **same plant** (functionally cross-pollination, but genetically like autogamy). **Xenogamy**: to the stigma of a **different plant**, bringing genetically different pollen.',
      v: V.poll,
      n: 'Geitonogamy needs an agent to carry pollen between flowers, so it works like cross-pollination. But because the two flowers share one plant, the pollen is genetically the same, so the offspring are no more varied than with self-pollination. Only xenogamy brings new genes.',
    }),
    sl('concept', 'Chasmogamy and cleistogamy', {
      b: '**Chasmogamous** flowers open, exposing anthers and stigma. **Cleistogamous** flowers never open; anthers and stigma lie close together, so pollen sheds directly on the stigma.',
      v: table(['Feature', 'Chasmogamous', 'Cleistogamous'], [['Flower opens?', 'Yes', 'No'], ['Pollination', 'Self or cross', 'Autogamy only'], ['Seed set', 'Depends on agents', 'Assured, even without pollinators'], ['Examples', 'Most flowers', 'Viola (pansy), Oxalis, Commelina (which also bear chasmogamous flowers)']], 'Table comparing chasmogamous and cleistogamous flowers'),
      n: 'Cleistogamous flowers guarantee seed even when pollinators are absent, but every seed comes from self-pollination. Plants such as Viola, Oxalis and Commelina hedge their bets by producing both kinds of flowers.',
    }),
    sl('concept', 'Wind and water pollination', {
      b: '**Wind (anemophily)** is the commonest abiotic agent. **Water (hydrophily)** is rare, found in about 30 genera, mostly monocots.',
      v: table(['Agent', 'Adaptations and examples'], [['Wind', 'Light, non-sticky pollen in large numbers; well-exposed stamens; large, often feathery stigma; usually a single ovule per ovary; flowers packed in inflorescences; the familiar tassels of maize are stigmas and styles waving in the wind'], ['Water', 'Vallisneria, Hydrilla and the marine sea grass Zostera; in Vallisneria female flowers reach the surface on long stalks and released male flowers float to them; in sea grasses long, ribbon-like pollen is carried in the water and protected by a mucilaginous covering']], 'Table of wind and water pollination adaptations with examples'),
      n: 'Wind is wasteful, so wind-pollinated plants produce pollen in enormous quantities. Water pollination is rare. Note that not all aquatic plants use water: water hyacinth and water lily emerge above the surface and are pollinated by insects or wind.',
    }),
    sl('concept', 'Animal pollination', {
      b: 'Bees, butterflies, flies, beetles, wasps, ants, moths, birds (sunbirds, hummingbirds), bats and even some primates and reptiles act as pollinators. **Insects**, especially **bees**, are the dominant biotic agents.',
      v: table(['Feature', 'Purpose'], [['Large, colourful, fragrant flowers rich in nectar', 'Attract animals; small flowers clustered into an inflorescence'], ['Floral rewards: nectar and pollen', 'Repeat visits'], ['Sticky pollen', 'Sticks to the animal’s body'], ['Shelter for egg-laying', 'Amorphophallus, the tallest flower, gives a safe place to lay eggs; a moth species and Yucca cannot complete their life cycles without each other']], 'Table of features of animal-pollinated flowers and their purposes'),
      n: 'Animal-pollinated flowers advertise themselves with colour and scent and pay their visitors with nectar or pollen. Some visitors take nectar or pollen without pollinating; they are called pollen or nectar robbers.',
    }),
    sl('example', 'Worked example 1: identify the agent', {
      b: 'Three flowers are described. Suggest the likely pollinating agent and give one reason for each.',
      ul: [
        'Flower X: small, dull, no scent; feathery stigma; anthers on long filaments hanging out → **wind**: exposed anthers and feathery stigma.',
        'Flower Y: large, bright, scented, with nectar; sticky pollen → **insect**: colour, scent and reward.',
        'Flower Z: submerged plant; pollen ribbon-like with a mucilage coat → **water**: long pollen carried by currents.',
      ],
      v: table(['Flower', 'Agent', 'Key evidence'], [['X', 'Wind', 'Feathery stigma, exposed anthers'], ['Y', 'Insect', 'Bright, scented, nectar, sticky pollen'], ['Z', 'Water', 'Ribbon-like pollen with mucilage']], 'Worked table matching three flowers to their pollinating agents'),
      n: 'Look for the clues. Exposed anthers and a feathery stigma suit wind. Colour, scent, nectar and sticky pollen suit insects. A submerged plant with long, coated pollen grains suits water.',
    }),
    sl('check', 'Quick check: agent', {
      b: 'Which feature suggests that a flower is wind-pollinated?',
      n: 'Quick check. Wind cannot be attracted by colour.',
      chk: 'wind-mcq',
    }),
    sl('concept', 'Self- versus cross-pollination', {
      b: 'Each mode has advantages.',
      v: table(['Self-pollination', 'Cross-pollination'], [['Needs no agent; seed set assured', 'Brings genetically different pollen'], ['Maintains pure lines', 'Produces variation, the raw material for evolution'], ['Little pollen wasted', 'Offspring often more vigorous and adaptable'], ['But continued selfing can cause inbreeding depression', 'But depends on agents and wastes more pollen']], 'Table comparing advantages of self- and cross-pollination'),
      n: 'Self-pollination is economical and reliable, but continued self-pollination leads to inbreeding depression. Cross-pollination costs more but produces varied, often more vigorous, offspring. Most flowering plants produce hermaphrodite flowers, so they have evolved devices to discourage self-pollination.',
    }),
    sl('concept', 'Outbreeding devices', {
      b: 'Devices that discourage self-pollination and encourage cross-pollination:',
      v: table(['Device', 'How it works'], [['Dichogamy', 'Pollen release and stigma receptivity are not synchronised: protandry (anthers mature first) or protogyny (stigma first)'], ['Herkogamy', 'Anther and stigma placed at different positions, so pollen cannot reach the stigma of the same flower'], ['Self-incompatibility', 'A genetic mechanism prevents self-pollen (from the same flower or other flowers of the same plant) from germinating or growing in the pistil'], ['Unisexual flowers', 'Monoecious plants (castor, maize) prevent autogamy but not geitonogamy; dioecious plants (papaya) prevent both']], 'Table of outbreeding devices and how they work'),
      n: 'Timing, position, genetics and separation of the sexes all discourage self-pollination. Notice the difference between monoecious and dioecious plants: only when male and female flowers are on different plants is self-pollination of every kind prevented.',
    }),
    sl('example', 'Worked example 2: which device stops which pollination?', {
      b: 'For each plant, state whether autogamy and geitonogamy are possible.',
      ul: [
        'Castor (monoecious: male and female flowers on one plant): autogamy **not possible**; geitonogamy **possible**.',
        'Papaya (dioecious: male and female plants): autogamy and geitonogamy **both not possible**; only xenogamy.',
        'A self-incompatible hermaphrodite: pollen of the same plant **fails** in the pistil, so seed comes only from xenogamy.',
      ],
      v: table(['Plant', 'Autogamy', 'Geitonogamy', 'Xenogamy'], [['Castor, maize (monoecious)', 'No', 'Yes', 'Yes'], ['Papaya (dioecious)', 'No', 'No', 'Yes'], ['Self-incompatible bisexual', 'No seed', 'No seed', 'Yes']], 'Worked table of which kinds of pollination are possible in three plants'),
      n: 'A unisexual flower cannot pollinate itself, so autogamy is ruled out. But if male and female flowers grow on the same plant, pollen can still move between them. Only separate male and female plants, or self-incompatibility, rule out both forms of self-pollination.',
    }),
    sl('check', 'Quick check: outbreeding', {
      b: 'Judge the assertion and the reason about monoecious plants.',
      n: 'Quick check. Can pollen move between flowers on the same plant?',
      chk: 'monoecious-ar',
    }),
    sl('concept', 'Pollen–pistil interaction', {
      b: 'The pistil can **recognise** whether pollen is compatible. Compatible pollen is accepted and germinates; incompatible pollen is rejected by stopping germination on the stigma or tube growth in the style. Recognition depends on **chemical components** of the pollen interacting with those of the pistil.',
      v: flow('TB', [['l', 'Pollen lands on stigma'], ['r', 'Chemical recognition'], ['c', 'Compatible: germinates through a germ pore'], ['t', 'Pollen tube grows through stigma and style, carrying the cell contents'], ['o', 'Enters ovule through micropyle; filiform apparatus guides it into a synergid'], ['i', 'Incompatible: germination or tube growth blocked']], [['l', 'r'], ['r', 'c'], ['c', 't'], ['t', 'o'], ['r', 'i']], 'Flow of pollen–pistil interaction'),
      n: 'All the events from pollen landing on the stigma to the pollen tube entering the ovule are called pollen–pistil interaction. It is a dynamic, chemically controlled dialogue, and plant breeders use their understanding of it to make crosses that would otherwise fail.',
    }),
    sl('concept', 'Artificial hybridisation', {
      b: 'To cross chosen parents, breeders make sure that **only the desired pollen** reaches the stigma.',
      v: flow('LR', [['e', 'Emasculation: remove anthers from the bud of the bisexual female parent before they dehisce'], ['b', 'Bagging: cover the flower with a butter-paper bag'], ['p', 'When the stigma is receptive, dust it with pollen from the male parent'], ['r', 'Rebag and allow fruit and seed to develop']], [['e', 'b'], ['b', 'p'], ['p', 'r']], 'Flow of emasculation and bagging in artificial hybridisation'),
      n: 'Emasculation removes the flower’s own anthers so it cannot self-pollinate. Bagging keeps out unwanted pollen. If the female parent already has unisexual flowers, emasculation is not needed; the female buds are simply bagged. Hybridisation combines desirable characters, which is the basis of crop improvement.',
    }),
    sl('check', 'Quick check: emasculation', {
      b: 'Why is emasculation done before the anthers dehisce?',
      n: 'Quick check. What would happen if the anthers had already released pollen?',
      chk: 'emasc-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Autogamy, geitonogamy (genetically like autogamy), xenogamy; chasmogamous and cleistogamous (Viola, Oxalis, Commelina) flowers.',
        'Wind: light pollen, exposed stamens, feathery stigma, single ovule. Water: Vallisneria, Hydrilla, Zostera. Insects: colour, scent, nectar, sticky pollen; Amorphophallus; Yucca and its moth.',
        'Outbreeding devices: dichogamy, herkogamy, self-incompatibility, unisexuality (monoecious castor and maize; dioecious papaya).',
        'Pollen–pistil interaction: chemical recognition, germination, tube growth, entry via micropyle and synergid.',
        'Artificial hybridisation: emasculation, bagging, pollination, rebagging.',
      ],
      v: table(['Term', 'Prevents'], [['Monoecy', 'Autogamy only'], ['Dioecy', 'Autogamy and geitonogamy'], ['Self-incompatibility', 'Seed from self-pollen']], 'Summary table of what three conditions prevent'),
      n: 'To recap: flowers are adapted to their pollinating agents, and many have devices that favour cross-pollination. The pistil recognises compatible pollen, and breeders exploit all of this through emasculation and bagging.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Explain why **geitonogamy** is functionally cross- but genetically self-pollination.',
        'Give **three adaptations** each for wind and insect pollination.',
        'For outbreeding devices, give a **named example** where the syllabus has one.',
        '**Give reasons** questions: answer in one precise sentence with the key term.',
      ],
      n: 'Exam tips. Be ready to explain geitonogamy. Learn three adaptations for each agent. Give named examples for outbreeding devices. And answer give-a-reason questions in one precise sentence that uses the key term.',
    }),
  ],
});
