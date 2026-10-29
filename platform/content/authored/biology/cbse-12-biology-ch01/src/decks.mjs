// ch01 Sexual Reproduction in Flowering Plants — three decks: Part 1 (t01), Part 2 (t02), Part 3 (t03–t04).
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { ANTHER, POLLEN, OVULE, EMBRYO_SAC, DOUBLE_FERT, POLL_TYPES, DICOT_EMBRYO, MONOCOT_EMBRYO } from './svgs.mjs';
import { ploidy, pollenFromAnther, seedsToMeioses } from './calc.mjs';

export const V = {
  anther: svgV(ANTHER, 'Transverse section of a young anther with four microsporangia, and one microsporangium enlarged to show epidermis, endothecium, middle layers, tapetum and sporogenous tissue'),
  pollen: svgV(POLLEN, 'Mature two-celled pollen grain with exine, germ pore, intine, vegetative cell and generative cell'),
  ovule: svgV(OVULE, 'Inverted ovule in section: funicle, hilum, outer and inner integuments, micropyle, nucellus, embryo sac and chalaza', 'Schematic, not to scale.'),
  embryoSac: svgV(EMBRYO_SAC, 'Mature embryo sac with three antipodals, a central cell with two polar nuclei, an egg cell and two synergids with a filiform apparatus', 'Seven cells, eight nuclei.'),
  doubleFert: svgV(DOUBLE_FERT, 'Pollen tube entering a synergid and releasing two male gametes: one fuses with the egg, the other with the two polar nuclei'),
  pollTypes: svgV(POLL_TYPES, 'Autogamy within one flower, geitonogamy between two flowers of one plant, and xenogamy between flowers of two plants'),
  dicot: svgV(DICOT_EMBRYO, 'Dicot embryo with plumule, epicotyl, two cotyledons, hypocotyl, radicle and root cap'),
  monocot: svgV(MONOCOT_EMBRYO, 'Grass embryo with scutellum, coleoptile around the shoot apex, epiblast, and coleorhiza around the radicle and root cap'),
};

// ---------------------------------------------------------------- worked-example numbers (computed)
const WE1 = pollenFromAnther({ sporangia: 4, mmcPerSporangium: 45 }); // 4 × 45 × 4
const WE2 = ploidy(18); // leaf 2n = 18
const WE3 = ploidy(24);
const WE4 = seedsToMeioses(10);

export const deck1 = deck({
  part: 1,
  title: 'Sexual Reproduction in Flowering Plants — Part 1: The flower and its gametophytes',
  goals: [
    'Describe the structure of the stamen, anther and microsporangium',
    'Explain microsporogenesis and the structure of a pollen grain',
    'Describe the pistil and the parts of an ovule',
    'Explain megasporogenesis and the development of the embryo sac',
  ],
  slides: [
    sl('title', 'Sexual Reproduction in Flowering Plants', {
      b: 'Part 1 — inside the stamen and the pistil: how a flower makes its male and female gametophytes before pollination.',
      v: flow('LR', [['f', 'Flower'], ['s', 'Stamen: pollen grains (male gametophyte)'], ['p', 'Pistil: ovule with embryo sac (female gametophyte)'], ['po', 'Pollination'], ['fe', 'Double fertilisation'], ['sd', 'Seed and fruit']], [['f', 's'], ['f', 'p'], ['s', 'po'], ['p', 'po'], ['po', 'fe'], ['fe', 'sd']], 'Flow from the flower to stamen and pistil, then pollination, double fertilisation, and seed and fruit'),
      n: 'Every mango you eat and every grain of rice began inside a flower. A flower is not just decoration. It is the reproductive organ of flowering plants. In this part we open up the stamen and the pistil, and follow how tiny male and female structures form long before any pollen reaches a stigma.',
    }),
    sl('concept', 'The flower: events before fertilisation', {
      b: 'Long before a flower opens, its fate is decided by **hormonal and structural changes** that turn a shoot apex into a floral bud. Inside the bud, the **androecium** (whorl of stamens) and the **gynoecium** (pistils) develop.',
      v: table(['', 'Male side', 'Female side'], [['Whorl', 'Androecium (stamens)', 'Gynoecium (pistils)'], ['Spore-forming organ', 'Microsporangium in the anther', 'Megasporangium (ovule) in the ovary'], ['Mother cell', 'Microspore mother cell', 'Megaspore mother cell'], ['Gametophyte', 'Pollen grain', 'Embryo sac'], ['Gametes', 'Two male gametes', 'One egg cell']], 'Table comparing the male and female sides of a flower: whorl, spore-forming organ, mother cell, gametophyte and gametes'),
      n: 'Think of the flower as having two production lines. The male line runs through the stamens and ends with pollen grains. The female line runs through the pistil and ends with the embryo sac inside each ovule. Keep this two-column picture in mind; almost every term in this part fits into one of the two columns.',
    }),
    sl('diagram', 'Stamen and anther', {
      b: 'A **stamen** has a long **filament** and a terminal, usually **bilobed** anther. Each lobe has **two thecae**, so a typical anther is **dithecous** and holds **four microsporangia** at its corners. The microsporangia later become **pollen sacs**.',
      v: V.anther,
      n: 'Look at the left drawing. A young anther cut across looks like four rounded chambers, two in each lobe, held together by a central connective that carries a vascular bundle. Each chamber is a microsporangium. When the anther matures, these chambers fill with pollen, and that is why we also call them pollen sacs.',
    }),
    sl('concept', 'Wall layers of a microsporangium', {
      b: 'In section, a microsporangium looks almost circular. Its wall has **four layers**; the outer three protect the sac and help it split open (**dehiscence**); the innermost, the **tapetum**, feeds the developing pollen.',
      v: table(['Layer (outside → inside)', 'Main role'], [['Epidermis', 'Outer protective layer'], ['Endothecium', 'Protection; helps the anther split to release pollen'], ['Middle layers', 'Protection; help in dehiscence'], ['Tapetum', 'Nourishes developing pollen; cells have dense cytoplasm and often more than one nucleus']], 'Table of the four wall layers of a microsporangium from outside to inside with their roles'),
      n: 'Remember the order from outside in: epidermis, endothecium, middle layers, tapetum. The first three are like the walls of a storeroom: they protect the contents and later crack open to release pollen. The tapetum is the kitchen. Its cells are packed with cytoplasm and often have more than one nucleus, because they work hard to feed the growing pollen.',
    }),
    sl('concept', 'Microsporogenesis', {
      b: 'While the anther is young, the centre of each microsporangium is filled with compactly arranged **sporogenous tissue**. Each of these cells can act as a **microspore mother cell** (pollen mother cell). It undergoes **meiosis** to form a cluster of four haploid cells, the **microspore tetrad**.',
      v: flow('LR', [['s', 'Sporogenous cell'], ['m', 'Microspore mother cell (diploid)'], ['t', 'Microspore tetrad (four haploid cells)'], ['p', 'Microspores separate'], ['g', 'Pollen grains']], [['s', 'm'], ['m', 't', 'meiosis'], ['t', 'p', 'anther matures and dries'], ['p', 'g', 'develop']], 'Flow of microsporogenesis from sporogenous cell to microspore mother cell, meiosis to a tetrad, and separation into pollen grains'),
      n: 'Microsporogenesis simply means the making of microspores. One diploid mother cell divides by meiosis and gives four haploid microspores, still stuck together as a tetrad. As the anther matures and loses water, the four separate and each develops into a pollen grain. So every single meiosis gives exactly four pollen grains, a fact you will use in calculations.',
    }),
    sl('check', 'Quick check: what forms the tetrad?', {
      b: 'Which division forms the microspore tetrad, and what is the ploidy of each microspore?',
      n: 'Quick check. Think about how many cells one mother cell gives, and whether the chromosome number is kept or halved.',
      chk: 'tetrad-mcq',
    }),
    sl('diagram', 'The pollen grain', {
      b: 'Pollen grains are usually spherical, about **25–50 micrometres** across. The hard outer **exine** is made of **sporopollenin**, one of the most resistant organic materials known: it survives high temperature and strong acids and alkalis, and no known enzyme breaks it down. Where sporopollenin is absent, the exine has **germ pores**. The thin inner **intine** is of cellulose and pectin.',
      v: V.pollen,
      n: 'A pollen grain is a tiny survival capsule. Its outer wall, the exine, is made of sporopollenin, which is so tough that pollen is preserved as fossils for millions of years. The wall has gaps called germ pores, and that is where the pollen tube will later grow out. Inside the exine sits a thin, soft layer called the intine.',
    }),
    sl('concept', 'Inside a mature pollen grain', {
      b: 'A mature pollen grain holds **two cells**: a large **vegetative cell** with abundant food reserve and an irregular nucleus, and a small, spindle-shaped **generative cell** floating in its cytoplasm. The generative cell divides by **mitosis** to form the **two male gametes**.',
      v: table(['Stage at shedding', 'Contents', 'Share of flowering plants'], [['Two-celled', 'Vegetative cell + generative cell; the generative cell divides later, in the pollen tube', 'More than 60 percent'], ['Three-celled', 'Vegetative cell + two male gametes', 'The rest']], 'Table comparing two-celled and three-celled pollen grains at shedding and how common each is'),
      n: 'Here is the key point. The vegetative cell is the big one; it stores food and will grow the pollen tube. The generative cell is small. In most flowering plants, more than sixty percent, pollen is shed at the two-celled stage and the generative cell divides inside the pollen tube. In the rest, it divides before shedding, so the pollen is three-celled.',
    }),
    sl('example', 'Worked example 1: counting pollen grains', {
      b: `An anther has ${WE1.sporangia} microsporangia, and each contains ${WE1.mmc} microspore mother cells. How many pollen grains can the anther produce, and how many meiotic divisions does this need?`,
      ul: [
        r`Step 1 — Mother cells in the anther $= ${WE1.sporangia} \times ${WE1.mmc} = ${WE1.totalMmc}$.`,
        r`Step 2 — Each mother cell undergoes **one meiosis** and gives **4** microspores.`,
        r`Step 3 — Pollen grains $= ${WE1.totalMmc} \times 4 = ${WE1.pollen}$; meiotic divisions $= ${WE1.totalMmc}$.`,
        r`Check — working backwards, $${WE1.pollen} \div 4 = ${WE1.totalMmc}$ meioses.`,
      ],
      v: table(['Quantity', 'Value'], [['Microsporangia', String(WE1.sporangia)], ['Mother cells per microsporangium', String(WE1.mmc)], ['Meiotic divisions', String(WE1.totalMmc)], ['Pollen grains', String(WE1.pollen)]], `Worked table: ${WE1.sporangia} microsporangia with ${WE1.mmc} mother cells each give ${WE1.totalMmc} meioses and ${WE1.pollen} pollen grains`),
      n: `Count the mother cells first: four chambers times forty-five cells gives one hundred and eighty. Each mother cell undergoes one meiosis and gives four pollen grains, so the anther can make seven hundred and twenty pollen grains from one hundred and eighty meiotic divisions. Always remember: one meiosis, four pollen grains.`,
    }),
    sl('concept', 'Pollen and people', {
      b: 'Pollen matters beyond the flower: it can trigger **allergies**, it is a **food supplement**, and it can be **stored** for plant breeding.',
      v: table(['Topic', 'Fact'], [['Allergy', 'Pollen of many plants, for example carrot grass (Parthenium), can cause asthma and bronchitis'], ['Nutrition', 'Pollen is rich in nutrients and is sold as tablets and syrups'], ['Viability', 'Rice and wheat pollen lose viability within about 30 minutes; pollen of some rose, pea and potato family members stays viable for months'], ['Storage', 'Pollen can be kept for years in liquid nitrogen at about −196 °C, in pollen banks for crop breeding']], 'Table of pollen facts on allergy, nutrition, viability and storage'),
      n: 'Carrot grass, called Parthenium, arrived in India with imported wheat and spread everywhere; its pollen causes allergies in many people. Pollen is also eaten as a health supplement. How long pollen stays alive varies hugely: in rice and wheat only about half an hour, but in some plants for months. Breeders store pollen in liquid nitrogen for years.',
    }),
    sl('check', 'Quick check: why does pollen fossilise so well?', {
      b: 'Judge the assertion and the reason about the pollen wall.',
      n: 'Quick check. Decide separately whether the assertion is true and whether the reason is true, then ask whether the reason explains the assertion.',
      chk: 'exine-ar',
    }),
    sl('diagram', 'The pistil and the ovule', {
      b: 'A **pistil** has a **stigma** (landing platform for pollen), a **style** and a swollen **ovary**. A gynoecium may have one pistil (**monocarpellary**) or many (**multicarpellary**); several pistils may be fused (**syncarpous**, as in poppy) or free (**apocarpous**, as in Michelia). Inside the ovary, **ovules** (megasporangia) arise from the **placenta**.',
      v: V.ovule,
      n: 'An ovule is attached to the placenta by a stalk, the funicle. The point where the ovule body joins the funicle is the hilum. One or two protective integuments wrap around the ovule but leave a small opening, the micropyle. Opposite it lies the chalaza, the base of the ovule. Inside the integuments is the nucellus, and inside the nucellus sits the embryo sac.',
    }),
    sl('concept', 'Megasporogenesis', {
      b: 'A single **megaspore mother cell**, large and with dense cytoplasm, differentiates in the **micropylar region of the nucellus**. It undergoes **meiosis** to form **four megaspores**. In most flowering plants **one megaspore is functional** and the other three degenerate. An embryo sac formed from a single megaspore is called **monosporic**.',
      v: flow('LR', [['n', 'Nucellus (micropylar region)'], ['m', 'Megaspore mother cell (diploid)'], ['f', 'Four megaspores (haploid)'], ['d', 'Three degenerate'], ['u', 'One functional megaspore']], [['n', 'm'], ['m', 'f', 'meiosis'], ['f', 'd'], ['f', 'u']], 'Flow of megasporogenesis: megaspore mother cell undergoes meiosis to form four megaspores, three degenerate and one is functional'),
      n: 'Compare this with the anther. There, every meiosis gives four useful pollen grains. Here, one mother cell gives four megaspores, but in most plants only one survives and the other three degenerate. So each ovule usually contains just one functional megaspore, and that single cell will build the entire female gametophyte.',
    }),
    sl('concept', 'Building the embryo sac', {
      b: 'The nucleus of the functional megaspore divides by **mitosis** three times, without cell walls at first (**free nuclear** divisions): 1 → 2 → 4 → 8 nuclei. Then walls form. Six nuclei are enclosed in cells; the remaining **two polar nuclei** sit in the large **central cell**.',
      v: table(['After division', 'Nuclei', 'Where they are'], [['First mitosis', '2', 'One moves to each pole'], ['Second mitosis', '4', 'Two at each pole'], ['Third mitosis', '8', 'Four at each pole'], ['Wall formation', '8 nuclei, 7 cells', 'One nucleus from each pole moves to the centre as a polar nucleus']], 'Table of the three free nuclear mitoses giving two, four and eight nuclei, then wall formation giving seven cells'),
      n: 'Three rounds of mitosis turn one nucleus into eight. Four nuclei end up at each end. Then one nucleus from each end travels to the middle; these two are the polar nuclei. Walls now form around the six nuclei at the ends. The result is a sac with seven cells but eight nuclei, because the central cell holds two.',
    }),
    sl('diagram', 'The mature embryo sac', {
      b: 'At the **micropylar end**, three cells form the **egg apparatus**: two **synergids** and one **egg cell**. Synergids carry special thickenings at their micropylar tip, the **filiform apparatus**, which guides the pollen tube. At the **chalazal end** are three **antipodal** cells. The large **central cell** holds the two polar nuclei.',
      v: V.embryoSac,
      n: 'Learn this picture well; examiners love it. At the micropyle end sits the egg apparatus: the egg cell with two synergids beside it. The synergids have a brush-like filiform apparatus that guides the pollen tube in. Three antipodal cells sit at the far, chalazal end. The central cell, with its two polar nuclei, fills the middle.',
    }),
    sl('example', 'Worked example 2: who carries how many chromosomes?', {
      b: `A plant has ${WE2.diploid} chromosomes in each leaf cell. Find the chromosome number in its megaspore mother cell, functional megaspore, egg, synergid, antipodal cell, each polar nucleus, nucellus cell and integument cell.`,
      ul: [
        `Step 1 — Leaf cells are diploid, so $2n = ${WE2.diploid}$ and $n = ${WE2.haploid}$.`,
        `Step 2 — The megaspore mother cell, nucellus and integuments are **sporophyte** tissue: ${WE2.diploid} each.`,
        `Step 3 — The megaspore is made by **meiosis**, and every cell of the embryo sac comes from it by **mitosis**, so each has ${WE2.haploid}.`,
        'Conclusion — everything inside the embryo sac is haploid; everything around it is diploid.',
      ],
      v: table(['Cell', 'Origin', 'Chromosomes'], [['Megaspore mother cell', 'Sporophyte', String(WE2.diploid)], ['Nucellus, integument', 'Sporophyte', String(WE2.diploid)], ['Functional megaspore', 'Meiosis', String(WE2.haploid)], ['Egg, synergid, antipodal, each polar nucleus', 'Mitosis from the megaspore', String(WE2.haploid)]], `Worked table: sporophyte cells have ${WE2.diploid} chromosomes; the megaspore and every embryo sac nucleus have ${WE2.haploid}`),
      n: `Sort every cell into one of two groups. Cells of the parent plant, like the nucellus and integuments, are diploid, eighteen here. The megaspore comes from meiosis, so it has nine, and all the embryo sac nuclei come from it by mitosis, so they also have nine. Each polar nucleus is haploid; they only become part of a triploid nucleus after fertilisation.`,
    }),
    sl('check', 'Quick check: count the embryo sac', {
      b: 'How many cells and nuclei does a typical mature embryo sac have?',
      n: 'Quick check. Count the cells at each end, then the central cell, and remember that one cell holds two nuclei.',
      chk: 'sac-count-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Anther: usually bilobed and dithecous, with **four microsporangia**; wall of epidermis, endothecium, middle layers and **tapetum** (nourishes pollen).',
        '**Microsporogenesis:** microspore mother cell → meiosis → tetrad → four pollen grains.',
        'Pollen: **exine** of sporopollenin with germ pores, **intine** of cellulose and pectin; vegetative cell + generative cell (two male gametes by mitosis).',
        'Ovule: funicle, hilum, integuments, micropyle, chalaza, nucellus, embryo sac.',
        '**Megasporogenesis:** one mother cell → meiosis → four megaspores → one functional (monosporic).',
        'Three free nuclear mitoses → **8 nuclei, 7 cells**: egg apparatus (egg + 2 synergids), 3 antipodals, central cell with 2 polar nuclei.',
      ],
      v: table(['', 'Male gametophyte', 'Female gametophyte'], [['Name', 'Pollen grain', 'Embryo sac'], ['Formed in', 'Microsporangium', 'Nucellus of the ovule'], ['Spores per meiosis that survive', 'Four', 'One (three degenerate)'], ['Cells when mature', '2 or 3', '7 (8 nuclei)']], 'Summary table comparing the male and female gametophytes'),
      n: 'Let us recap. The anther makes pollen through microsporogenesis, and the tapetum feeds it. The pollen wall has a tough exine and a soft intine. In the ovule, one megaspore survives and three rounds of mitosis build a seven-celled, eight-nucleate embryo sac. Now the stage is set for pollination, the subject of Part 2.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Draw and label the **embryo sac** with the micropylar end at the bottom; label both ends and the filiform apparatus.',
        'Write "**seven-celled, eight-nucleate**" for the embryo sac; examiners look for both numbers.',
        'Pollen counts: **one meiosis gives four pollen grains**; one ovule usually needs **one meiosis** for its megaspore.',
        'Ploidy: cells inside the embryo sac and the pollen are **haploid**; nucellus, integuments and mother cells are **diploid**.',
        'Do not confuse **monosporic** (one megaspore forms the sac) with monoecious (both sexes on one plant).',
      ],
      n: 'Three quick tips. First, label the embryo sac with both ends named. Second, in counting questions, one meiosis gives four pollen grains but only one functional megaspore. Third, for ploidy questions, ask whether a cell belongs to the parent plant or to the gametophyte. That one question sorts out almost every case.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Sexual Reproduction in Flowering Plants — Part 2: Pollination',
  goals: [
    'Distinguish autogamy, geitonogamy and xenogamy, and chasmogamous and cleistogamous flowers',
    'Relate floral features to wind, water and animal pollination',
    'Explain outbreeding devices and pollen–pistil interaction',
    'Describe emasculation and bagging in artificial hybridisation',
  ],
  slides: [
    sl('title', 'Pollination', {
      b: 'Part 2 — how pollen, which cannot move by itself, reaches a stigma, and how plants encourage cross-pollination.',
      v: flow('LR', [['a', 'Anther dehisces'], ['p', 'Pollen carried by an agent'], ['s', 'Pollen lands on a stigma'], ['r', 'Pistil accepts or rejects it']], [['a', 'p'], ['p', 's', 'pollination'], ['s', 'r', 'pollen–pistil interaction']], 'Flow from anther dehiscence to pollen transfer, landing on the stigma and acceptance or rejection'),
      n: 'Male and female gametes in plants cannot walk or swim to each other. Pollen must be carried to a stigma, and that transfer is called pollination. Plants have evolved remarkable ways to get it done, using wind, water and animals, and clever tricks to avoid pollinating themselves. Let us see how.',
    }),
    sl('diagram', 'Three kinds of pollination', {
      b: '**Autogamy:** pollen reaches the stigma of the **same flower**. **Geitonogamy:** pollen reaches **another flower of the same plant**. **Xenogamy:** pollen reaches a flower of a **different plant**.',
      v: V.pollTypes,
      n: 'Geitonogamy is a tricky case. It looks like cross-pollination because an agent carries pollen from one flower to another. But both flowers belong to the same plant, so genetically it is just like self-pollination. Only xenogamy brings in genetically different pollen, and that is what creates new combinations of characters.',
    }),
    sl('concept', 'Open and closed flowers', {
      b: 'For **autogamy**, anther dehiscence and stigma receptivity must coincide, and anther and stigma must be close. Some plants, such as Viola (common pansy), Oxalis and Commelina, make **two kinds of flowers**.',
      v: table(['', 'Chasmogamous flowers', 'Cleistogamous flowers'], [['Opening', 'Open, anthers and stigma exposed', 'Never open'], ['Pollination', 'Self or cross', 'Only autogamy'], ['Pollinator needed', 'Usually', 'No'], ['Seed set', 'Depends on pollinators', 'Assured, even without pollinators'], ['Variation', 'Possible', 'Very little']], 'Table comparing chasmogamous and cleistogamous flowers'),
      n: 'Cleistogamous flowers never open, so pollen from their own anthers falls onto their own stigma inside the closed bud. This guarantees seeds even when no pollinator visits. The price is variation: offspring of such seeds are almost copies of the parent. That is why these plants keep both kinds of flowers.',
    }),
    sl('example', 'Worked example 1: name the pollination', {
      b: 'Classify each event as autogamy, geitonogamy or xenogamy.',
      ul: [
        'P — Pollen from the tassel of a maize plant lands on the silks of a cob on the **same plant**: two flowers, one plant → **geitonogamy**.',
        'Q — A closed flower of Commelina sets seed: pollen and stigma of the **same flower** → **autogamy**.',
        'R — A bee carries pollen from a male papaya tree to a female papaya tree: **two plants** → **xenogamy**.',
        'S — A bisexual pea flower is pollinated by its own anthers before opening → **autogamy**.',
      ],
      v: table(['Event', 'Flowers involved', 'Plants involved', 'Type'], [['P', '2', '1', 'Geitonogamy'], ['Q', '1', '1', 'Autogamy'], ['R', '2', '2', 'Xenogamy'], ['S', '1', '1', 'Autogamy']], 'Worked table classifying four pollination events by the number of flowers and plants involved'),
      n: 'Use two counts. How many flowers? How many plants? One flower is autogamy. Two flowers on one plant is geitonogamy. Two plants is xenogamy. Notice that papaya must be xenogamous, because male and female flowers grow on separate trees.',
    }),
    sl('check', 'Quick check: is geitonogamy really cross-pollination?', {
      b: 'Judge the assertion and the reason about geitonogamy.',
      n: 'Quick check. Think about where the pollen comes from genetically, not just which flower it comes from.',
      chk: 'geitono-ar',
    }),
    sl('concept', 'Agents of pollination', {
      b: 'Plants use **abiotic** agents (wind, water) and **biotic** agents (animals). Most plants use animals; only a small number use abiotic agents.',
      v: table(['Agent', 'Examples', 'Notes'], [['Wind', 'Grasses, maize', 'Commonest abiotic agent'], ['Water', 'Vallisneria, Hydrilla, Zostera', 'About 30 genera, mostly monocots'], ['Insects', 'Bees, butterflies, flies, beetles, wasps, moths', 'Bees are the dominant biotic agents'], ['Other animals', 'Sunbirds, hummingbirds, bats; some primates, lizards and rodents', 'Usually larger flowers']], 'Table of pollination agents: wind, water, insects and other animals, with examples'),
      n: 'Abiotic pollination is a matter of chance, so wind and water pollinated plants produce enormous numbers of pollen grains. Animals are far more targeted. Bees are the champion pollinators, but sunbirds, bats and even some lizards, rodents and primates carry pollen too.',
    }),
    sl('concept', 'Wind pollination', {
      b: 'Wind-pollinated flowers are built to release pollen into the air and to catch it.',
      v: table(['Feature', 'Why it helps'], [['Light, non-sticky pollen', 'Easily carried by air currents'], ['Well-exposed stamens', 'Pollen is shed into the wind'], ['Large, often feathery stigma', 'Traps airborne pollen'], ['A single ovule in each ovary', 'One pollen grain is enough'], ['Many flowers packed in an inflorescence', 'Many chances to catch pollen'], ['Small, dull, scentless flowers', 'No need to attract animals']], 'Table of features of wind-pollinated flowers and why each helps'),
      n: 'Picture a maize field. The tassel at the top sheds clouds of light, dry pollen. The cob below has long silky threads hanging out; each thread is a stigma and style, waving in the wind to catch pollen. The flowers are dull and have no scent or nectar, because there is no animal to attract.',
    }),
    sl('concept', 'Water pollination', {
      b: 'Water pollination is rare: about **30 genera**, mostly monocots. Many aquatic plants, such as **water hyacinth** and **water lily**, still use insects or wind.',
      v: table(['Plant', 'How pollen travels'], [['Vallisneria', 'Female flowers reach the surface on long stalks; male flowers or pollen float on the surface and drift to them'], ['Seagrasses such as Zostera', 'Female flowers stay submerged; long, ribbon-like pollen is carried inside the water'], ['All water-pollinated plants', 'Pollen is protected from wetting by a mucilaginous covering']], 'Table of water pollination in Vallisneria and seagrasses, and the mucilage covering on pollen'),
      n: 'Vallisneria shows the clever version. Its female flower rises to the water surface on a long, coiled stalk. Male flowers break free and float on the surface; if one drifts against a female flower, pollen reaches the stigma. Seagrasses do it under water with long ribbon-shaped pollen. In every case, a slimy coating keeps the pollen from getting soaked.',
    }),
    sl('concept', 'Insect and animal pollination', {
      b: 'Animal-pollinated flowers **advertise** and **reward**. The pollinator gets food or shelter; the plant gets its pollen carried.',
      v: table(['Feature or reward', 'Example'], [['Large, colourful, fragrant flowers rich in nectar', 'Most bee-pollinated flowers'], ['Small flowers clustered into a showy head', 'Sunflower family'], ['Foul smell', 'Flowers visited by flies and beetles'], ['Nectar and pollen as food', 'Most insect-pollinated flowers'], ['A safe place to lay eggs', 'Amorphophallus, one of the tallest flowers'], ['Partnership with one insect species', 'Yucca and its moth: the moth lays eggs in the ovary; the larvae eat some seeds']], 'Table of features and rewards of animal-pollinated flowers with examples'),
      n: 'Yucca and its moth cannot live without each other. The moth pollinates the flower and lays its eggs in the ovary. The larvae hatch and eat some of the developing seeds, but plenty are left for the plant. Not every visitor is honest, though. Some insects take nectar or pollen without pollinating; they are called pollen or nectar robbers.',
    }),
    sl('check', 'Quick check: spot the wind flower', {
      b: 'Which set of features best fits a wind-pollinated flower?',
      n: 'Quick check. Think about what a flower needs if nobody is coming to visit it.',
      chk: 'wind-features-mcq',
    }),
    sl('concept', 'Outbreeding devices', {
      b: 'Continued self-pollination causes **inbreeding depression**. Plants have evolved **outbreeding devices** that discourage self-pollination and encourage cross-pollination.',
      v: table(['Device', 'How it works'], [['Timing', 'Pollen is released before the stigma is receptive, or after it stops being receptive'], ['Position', 'Anther and stigma placed apart, so pollen cannot reach the stigma of the same flower'], ['Self-incompatibility', 'A genetic mechanism stops pollen from germinating or growing on the pistil of the same flower or plant'], ['Unisexual flowers', 'Male and female flowers separate: on one plant (monoecious) or on different plants (dioecious)']], 'Table of four outbreeding devices and how each works'),
      n: 'Why would a plant avoid its own pollen? Because repeated self-pollination makes harmful recessive traits show up, and the plants become weaker; this is inbreeding depression. So flowers mistime pollen release, keep anther and stigma apart, chemically reject their own pollen, or separate male and female flowers altogether.',
    }),
    sl('example', 'Worked example 2: which device stops which pollination?', {
      b: 'Castor and maize are **monoecious**; papaya is **dioecious**. Which kinds of self-pollination does each prevent?',
      ul: [
        'Step 1 — In both, a flower is either male or female, so pollen can never land on the stigma of the **same flower**: **autogamy is prevented** in all three.',
        'Step 2 — In castor and maize, male and female flowers are on the **same plant**, so pollen can still move between them: **geitonogamy is possible**.',
        'Step 3 — In papaya, male and female flowers are on **different plants**: both autogamy and geitonogamy are prevented, so only **xenogamy** can happen.',
      ],
      v: table(['Plant', 'Condition', 'Autogamy', 'Geitonogamy'], [['Castor, maize', 'Monoecious', 'Prevented', 'Possible'], ['Papaya', 'Dioecious', 'Prevented', 'Prevented']], 'Worked table: monoecious castor and maize prevent autogamy but not geitonogamy; dioecious papaya prevents both'),
      n: 'This comparison is a favourite exam question. Unisexual flowers always rule out autogamy, because no single flower has both anthers and a stigma. But only when the sexes are on different plants is geitonogamy ruled out too. So dioecy is the strongest guarantee of cross-pollination.',
    }),
    sl('concept', 'Pollen–pistil interaction', {
      b: 'Not every pollen grain that lands on a stigma can fertilise. The pistil **recognises** compatible pollen of the right species, through chemical signals between pollen and pistil, and **promotes** it; it **inhibits** incompatible pollen.',
      v: flow('TB', [['l', 'Pollen lands on the stigma'], ['c', 'Recognition by chemical signals'], ['y', 'Compatible: pollen germinates through a germ pore'], ['t', 'Pollen tube grows through stigma and style to the ovary'], ['m', 'Tube enters the ovule through the micropyle'], ['s', 'Filiform apparatus guides it into a synergid'], ['n', 'Incompatible: germination or tube growth is stopped']], [['l', 'c'], ['c', 'y'], ['c', 'n'], ['y', 't'], ['t', 'm'], ['m', 's']], 'Flow of pollen–pistil interaction: recognition, then germination and tube growth to the synergid for compatible pollen, or rejection for incompatible pollen'),
      n: 'Think of the stigma as a security desk. Every pollen grain must pass a chemical check. Compatible pollen is allowed in: it germinates, and its tube grows down the style, into the ovary, through the micropyle, and is steered by the filiform apparatus into a synergid. Incompatible pollen is stopped. In some plants you can watch pollen germinate on a glass slide in sugar and boric acid solution.',
    }),
    sl('check', 'Quick check: the pollen tube’s route', {
      b: 'Through which opening does the pollen tube usually enter the ovule?',
      n: 'Quick check. Recall the small opening left by the integuments, near the egg apparatus.',
      chk: 'tube-entry-mcq',
    }),
    sl('concept', 'Artificial hybridisation', {
      b: 'Breeders cross chosen parents so that only the **desired pollen** reaches the stigma. Two steps protect the stigma: **emasculation** and **bagging**.',
      v: flow('LR', [['e', 'Emasculation: remove anthers from the bud before they dehisce'], ['b', 'Bagging: cover with a butter-paper bag'], ['d', 'Stigma becomes receptive: dust it with chosen pollen'], ['r', 'Rebag and let the fruit develop']], [['e', 'b'], ['b', 'd'], ['d', 'r']], 'Flow of artificial hybridisation: emasculation, bagging, dusting with chosen pollen, and rebagging'),
      n: 'If the flower is bisexual, its own anthers must be removed with forceps while it is still a bud, before they release pollen; this is emasculation. Then the flower is covered with a butter-paper bag so stray pollen cannot reach it. When the stigma is ready, the breeder dusts it with pollen from the chosen father plant and bags it again. Female flowers of unisexual plants need no emasculation, only bagging.',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Autogamy (same flower), geitonogamy (another flower, same plant: genetically like autogamy), xenogamy (different plant).',
        'Cleistogamous flowers never open: assured seed set, little variation.',
        'Wind: light pollen, exposed stamens, feathery stigma, one ovule per ovary. Water: Vallisneria, Zostera; mucilage-covered pollen.',
        'Animal pollination: colour, scent, nectar, pollen, shelter; Yucca–moth partnership.',
        'Outbreeding devices: timing, position, self-incompatibility, unisexual flowers (dioecy prevents both autogamy and geitonogamy).',
        'Pollen–pistil interaction: recognition, then promotion or inhibition. Hybridisation: emasculation, bagging, rebagging.',
      ],
      v: table(['Pollination', 'Genetically different pollen?', 'Agent needed?'], [['Autogamy', 'No', 'Not always'], ['Geitonogamy', 'No', 'Yes'], ['Xenogamy', 'Yes', 'Yes']], 'Summary table: only xenogamy brings genetically different pollen; geitonogamy and xenogamy need an agent'),
      n: 'To recap: three kinds of pollination, only xenogamy brings in new genes. Wind, water and animals each shape flowers in their own way. Outbreeding devices protect against inbreeding depression, the pistil screens every pollen grain, and breeders use emasculation and bagging to control crosses. Next, in Part 3, we follow the pollen tube into the embryo sac.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Always say **why** geitonogamy is "functionally cross but genetically self".',
        'For "monoecious versus dioecious", state which of autogamy and geitonogamy each prevents.',
        'Water pollination: name **Vallisneria** and **Zostera**, and mention that water hyacinth and water lily are **not** water pollinated.',
        'Hybridisation answers need both steps: **emasculation** (only for bisexual flowers) and **bagging**, with the reason for each.',
      ],
      n: 'Exam tips. When you mention geitonogamy, add the reason it is genetically like self-pollination. For unisexual flowers, separate the two kinds of self-pollination clearly. And in hybridisation questions, give both steps with their purpose: emasculation removes the flower’s own pollen, bagging keeps out unwanted pollen.',
    }),
  ],
});

export const deck3 = deck({
  part: 3,
  title: 'Sexual Reproduction in Flowering Plants — Part 3: Double fertilisation, seed and fruit',
  goals: [
    'Explain double fertilisation and the products of syngamy and triple fusion',
    'Describe the development of endosperm and embryo, and compare dicot and monocot embryos',
    'Describe how the ovule becomes a seed and the ovary a fruit',
    'Explain apomixis, polyembryony and parthenocarpy and their uses',
  ],
  slides: [
    sl('title', 'Double fertilisation and after', {
      b: 'Part 3 — what happens when the pollen tube reaches the embryo sac, and how an ovule becomes a seed and an ovary becomes a fruit.',
      v: flow('LR', [['t', 'Pollen tube enters a synergid'], ['f', 'Double fertilisation'], ['e', 'Endosperm and embryo develop'], ['s', 'Ovule → seed'], ['fr', 'Ovary → fruit']], [['t', 'f'], ['f', 'e'], ['e', 's'], ['s', 'fr']], 'Flow from pollen tube entry to double fertilisation, endosperm and embryo, seed and fruit'),
      n: 'The pollen tube has found its way to the embryo sac. What happens next is unique to flowering plants: not one fertilisation but two, at the same time. After that, the ovule becomes a seed, the ovary becomes a fruit, and a new plant waits inside, ready to grow.',
    }),
    sl('concept', 'Into the embryo sac', {
      b: 'The pollen tube enters one of the **synergids** and releases **two male gametes** into its cytoplasm. Each gamete has a different partner.',
      v: flow('LR', [['t', 'Pollen tube enters a synergid'], ['g', 'Two male gametes released'], ['a', 'Gamete 1 + egg'], ['b', 'Gamete 2 + two polar nuclei']], [['t', 'g'], ['g', 'a', 'syngamy'], ['g', 'b', 'triple fusion']], 'Flow: the pollen tube releases two male gametes; one fuses with the egg, the other with the polar nuclei'),
      n: 'Once inside the synergid, the tube bursts and releases its two male gametes. They do not compete; they share the work. One heads for the egg cell. The other moves into the central cell to meet the two polar nuclei. Both fusions happen in the same embryo sac.',
    }),
    sl('diagram', 'Syngamy and triple fusion', {
      b: '**Syngamy:** one male gamete fuses with the egg nucleus → diploid **zygote**. **Triple fusion:** the other male gamete fuses with the **two polar nuclei** → triploid **primary endosperm nucleus**; the central cell becomes the **primary endosperm cell**. Two fusions in one embryo sac = **double fertilisation**.',
      v: V.doubleFert,
      n: 'Syngamy is the true fertilisation: male gamete plus egg gives a diploid zygote, which will become the embryo. Triple fusion involves three haploid nuclei, one male gamete and two polar nuclei, so the product is triploid. This primary endosperm nucleus will build the endosperm, a food store for the embryo.',
    }),
    sl('example', 'Worked example 1: ploidy after double fertilisation', {
      b: `In a plant, the root tip cells have ${WE3.diploid} chromosomes. Find the chromosome number in the male gamete, zygote, primary endosperm nucleus, endosperm cell, embryo cell and seed coat cell.`,
      ul: [
        r`Step 1 — Root cells are diploid: $2n = ${WE3.diploid}$, so $n = ${WE3.haploid}$; a male gamete has ${WE3.haploid}.`,
        r`Step 2 — Zygote $= n + n = ${WE3.haploid} + ${WE3.haploid} = ${WE3.diploid}$; embryo cells come from it by mitosis: ${WE3.diploid}.`,
        r`Step 3 — Primary endosperm nucleus $= n + n + n = ${WE3.triploid}$; endosperm cells: ${WE3.triploid}.`,
        `Step 4 — The seed coat comes from the integuments of the **mother plant**: ${WE3.diploid}.`,
      ],
      v: table(['Cell', 'Made from', 'Chromosomes'], [['Male gamete', 'Generative cell (mitosis)', String(WE3.haploid)], ['Zygote, embryo', 'Male gamete + egg', String(WE3.diploid)], ['Primary endosperm nucleus, endosperm', 'Male gamete + 2 polar nuclei', String(WE3.triploid)], ['Seed coat', 'Integuments (mother plant)', String(WE3.diploid)]], `Worked table of chromosome numbers: male gamete ${WE3.haploid}, zygote and embryo ${WE3.diploid}, endosperm ${WE3.triploid}, seed coat ${WE3.diploid}`),
      n: 'Add up the nuclei that fused. The zygote has two haploid sets, so twenty-four. The primary endosperm nucleus has three, so thirty-six, and the endosperm keeps that number. The seed coat is a trap: it is not a product of fertilisation at all. It comes from the integuments of the mother plant, so it is diploid.',
    }),
    sl('check', 'Quick check: product of triple fusion', {
      b: 'What does triple fusion produce?',
      n: 'Quick check. Count the nuclei that fuse in the central cell and name what they form.',
      chk: 'triple-mcq',
    }),
    sl('concept', 'Endosperm comes first', {
      b: 'Endosperm development **precedes** embryo development. The primary endosperm cell divides repeatedly to form a **triploid endosperm** tissue, packed with reserve food for the developing embryo. Most commonly, the nucleus first divides many times **without walls** (free-nuclear endosperm); walls form later (cellular endosperm).',
      v: flow('LR', [['p', 'Primary endosperm nucleus (triploid)'], ['f', 'Free-nuclear endosperm: many nuclei, no walls'], ['c', 'Cellular endosperm: walls form'], ['u', 'Food for the embryo']], [['p', 'f', 'repeated division'], ['f', 'c'], ['c', 'u']], 'Flow of endosperm development from the primary endosperm nucleus to free-nuclear and then cellular endosperm'),
      n: 'Why does the endosperm start first? Because the embryo needs a food supply ready before it grows. A tender coconut shows both stages. The coconut water is free-nuclear endosperm, made of thousands of nuclei floating in fluid. The white kernel around it is cellular endosperm.',
    }),
    sl('concept', 'Albuminous and non-albuminous seeds', {
      b: 'In some seeds the developing embryo **uses up** the endosperm completely before the seed matures; in others, part of it **persists** in the mature seed. In a few seeds, remnants of the **nucellus** also persist as the **perisperm**.',
      v: table(['Seed type', 'Endosperm in mature seed', 'Examples'], [['Non-albuminous (ex-albuminous)', 'Used up; food stored in cotyledons', 'Pea, groundnut, beans'], ['Albuminous', 'Persists and is used during germination', 'Wheat, maize, barley, castor, coconut'], ['With perisperm', 'Residual nucellus persists', 'Black pepper, beet']], 'Table of non-albuminous and albuminous seeds and seeds with perisperm, with examples'),
      n: 'Split a soaked groundnut: the two big halves are cotyledons, full of stored food, and no endosperm is left. A grain of wheat is different; most of it is endosperm, which is why wheat flour is mostly starch. Black pepper and beet keep some of the old nucellus as perisperm.',
    }),
    sl('concept', 'From zygote to embryo', {
      b: 'The **zygote** lies at the **micropylar end** of the embryo sac. Most zygotes divide only after some endosperm has formed. Early stages are similar in dicots and monocots.',
      v: flow('LR', [['z', 'Zygote'], ['p', 'Proembryo'], ['g', 'Globular embryo'], ['h', 'Heart-shaped embryo'], ['m', 'Mature embryo']], [['z', 'p'], ['p', 'g'], ['g', 'h'], ['h', 'm']], 'Flow of embryo development: zygote, proembryo, globular, heart-shaped and mature embryo'),
      n: 'The zygote waits for the food supply to be ready, then divides to form a proembryo. This becomes a ball of cells, the globular stage, and then a heart-shaped embryo as the cotyledons begin to bulge. Finally it matures into an embryo with a clear shoot end and root end.',
    }),
    sl('diagram', 'A dicot embryo', {
      b: 'A typical dicot embryo has an **embryonal axis** and **two cotyledons**. The part above the cotyledons is the **epicotyl**, ending in the **plumule** (stem tip). The part below is the **hypocotyl**, ending in the **radicle** (root tip) covered by a **root cap**.',
      v: V.dicot,
      n: 'Use the cotyledons as your reference point. Above them, epi means upon, so epicotyl, ending in the plumule, the future shoot. Below them, hypo means under, so hypocotyl, ending in the radicle, the future root, protected by a root cap. A bean or gram seed shows this clearly when you split it.',
    }),
    sl('diagram', 'A monocot (grass) embryo', {
      b: 'Monocot embryos have **one cotyledon**. In grasses it is the **scutellum**, on one side of the axis. The **plumule** and leaf primordia are enclosed in a hollow foliar sheath, the **coleoptile**; the **radicle** and root cap are enclosed in an undifferentiated sheath, the **coleorhiza**.',
      v: V.monocot,
      n: 'In a grass embryo, the single cotyledon is a shield-shaped scutellum that absorbs food from the endosperm. Each growing tip has its own protective sleeve: the coleoptile around the shoot and the coleorhiza around the root. Some grasses also have a small flap, the epiblast. Remember: coleoptile on top, coleorhiza at the root end.',
    }),
    sl('check', 'Quick check: sheaths of a grass embryo', {
      b: 'Which structure encloses the radicle and root cap in a grass embryo?',
      n: 'Quick check. One sheath protects the shoot, the other protects the root. Which is which?',
      chk: 'coleorhiza-mcq',
    }),
    sl('concept', 'Ovule to seed', {
      b: 'The **seed** is the final product of sexual reproduction: a **fertilised ovule**. It has a **seed coat**, cotyledons and an embryonal axis. As it matures it dries to about **10–15 percent moisture** by mass, its metabolism slows down, and it may enter **dormancy**.',
      v: table(['Part of ovule', 'Becomes'], [['Integuments', 'Seed coat (testa and tegmen)'], ['Micropyle', 'Small pore in the seed coat: lets in oxygen and water during germination'], ['Zygote', 'Embryo'], ['Primary endosperm cell', 'Endosperm'], ['Nucellus', 'Usually used up; perisperm in a few seeds'], ['Ovule as a whole', 'Seed']], 'Table showing which part of the ovule becomes which part of the seed'),
      n: 'Every part of the seed can be traced back to the ovule. The integuments harden into the seed coat, and the micropyle remains as a tiny pore through which water enters when the seed germinates. Drying out is essential: a dry, dormant seed can wait through a bad season and germinate only when moisture and temperature are right.',
    }),
    sl('concept', 'Ovary to fruit', {
      b: 'The **ovary** develops into the **fruit**, and the **ovary wall** becomes the **pericarp**, fleshy as in guava and orange or dry as in groundnut and mustard. In some plants the **thalamus** also forms part of the fruit, giving **false fruits**. Some fruits form **without fertilisation**: **parthenocarpy**.',
      v: table(['Kind of fruit', 'Develops from', 'Examples'], [['True fruit', 'Ovary only', 'Mango, tomato, groundnut'], ['False fruit', 'Ovary plus thalamus', 'Apple, strawberry, cashew'], ['Parthenocarpic fruit', 'Ovary without fertilisation; seedless', 'Banana; can be induced with growth hormones']], 'Table of true, false and parthenocarpic fruits with what they develop from and examples'),
      n: 'Bite into an apple and most of what you eat is swollen thalamus, not ovary, so the apple is called a false fruit. The core is the real ovary. Banana is parthenocarpic: the fruit develops without fertilisation, so it has no viable seeds. Growers can also induce seedless fruits by spraying growth hormones.',
    }),
    sl('example', 'Worked example 2: how many pollen grains and meioses?', {
      b: `A pea pod contains ${WE4.seeds} seeds. What is the minimum number of ovules fertilised, pollen grains, male gametes and meiotic divisions involved?`,
      ul: [
        `Step 1 — Each seed is one fertilised ovule: **${WE4.seeds} ovules**.`,
        `Step 2 — One pollen tube serves one ovule and delivers both its male gametes there: **${WE4.seeds} pollen grains**, **${WE4.gametes} male gametes**.`,
        r`Step 3 — Female side: one meiosis per ovule gives ${WE4.seeds} meioses. Male side: one meiosis gives 4 pollen grains, so at least $\lceil ${WE4.seeds}/4 \rceil = ${WE4.maleMeioses}$.`,
        `Total — at least **${WE4.total}** meiotic divisions.`,
      ],
      v: table(['Quantity', 'Minimum number'], [['Ovules fertilised', String(WE4.seeds)], ['Pollen grains', String(WE4.seeds)], ['Male gametes', String(WE4.gametes)], ['Meioses (female + male)', `${WE4.seeds} + ${WE4.maleMeioses} = ${WE4.total}`]], `Worked table: ${WE4.seeds} seeds need ${WE4.seeds} ovules, ${WE4.seeds} pollen grains, ${WE4.gametes} male gametes and at least ${WE4.total} meioses`),
      n: `Each seed needs one ovule, one pollen grain and two male gametes, because double fertilisation uses both. So ten seeds need ten pollen grains and twenty male gametes. Meiosis is lopsided: each ovule needs its own meiosis, but one meiosis in the anther gives four pollen grains. Ten divided by four, rounded up, is three. So the minimum is thirteen meioses.`,
    }),
    sl('concept', 'Why seeds matter', {
      b: 'Seeds are the basis of agriculture and of plant survival on land.',
      v: table(['Advantage', 'Explanation'], [['Independence from water', 'Pollination and fertilisation do not need water'], ['Dispersal', 'Seeds and fruits spread to new places'], ['Food store', 'Endosperm or cotyledons feed the seedling'], ['Protection', 'Hard seed coat protects the embryo'], ['Variation', 'Seeds come from sexual reproduction, giving new combinations'], ['Long viability', 'An Arctic lupine seed germinated after about 10,000 years; a date palm seed about 2000 years old has germinated']], 'Table of the advantages of seeds, including records of long seed viability'),
      n: 'Seeds let plants wait. Dormant seeds can be stored for the next sowing season, which is the foundation of farming. Some seeds stay alive for astonishing times: a lupine seed from the Arctic grew after about ten thousand years, and a date palm seed around two thousand years old also germinated. Fruits help too, by protecting seeds and helping their dispersal.',
    }),
    sl('concept', 'Apomixis', {
      b: '**Apomixis** is the formation of **seeds without fertilisation**: an asexual process that mimics sexual reproduction. It occurs in some members of the sunflower family and in grasses.',
      v: flow('TB', [['a', 'Apomixis: seed without fertilisation'], ['d', 'Diploid egg formed without meiosis develops into an embryo'], ['n', 'Nucellus or integument cells divide, push into the embryo sac and form embryos'], ['c', 'Offspring genetically like the mother']], [['a', 'd', 'route 1'], ['a', 'n', 'route 2'], ['d', 'c'], ['n', 'c']], 'Flow of two routes of apomixis, both giving offspring genetically like the mother'),
      n: 'In apomixis a seed forms, but no fertilisation takes place. Either an egg is formed without meiosis, so it is already diploid and grows into an embryo by itself, or cells of the nucellus or integuments push into the embryo sac and become embryos. Either way, the offspring are genetic copies of the mother plant.',
    }),
    sl('concept', 'Polyembryony and hybrid seeds', {
      b: 'When nucellar cells form extra embryos, a seed may hold **more than one embryo**: **polyembryony**, as in many **Citrus** and **mango** varieties. Apomixis interests the **hybrid seed industry**.',
      v: table(['Problem with hybrid seeds today', 'How apomixis could help'], [['Seeds from a hybrid crop show segregation, so the hybrid characters are lost', 'Apomictic seeds would not segregate'], ['Farmers must buy new hybrid seed every year', 'Farmers could save and resow their own hybrid seed'], ['Hybrid seed is costly to produce', 'Hybrid seed could be multiplied cheaply']], 'Table of problems with hybrid seeds and how apomictic hybrids could solve them'),
      n: 'Squeeze the seed of an orange or a mango and you may find several seedlings coming out of one seed; that is polyembryony. Now think of a farmer growing a high-yielding hybrid. If she sows seeds from her crop, the characters segregate and the yield falls. If scientists could make hybrids apomictic, she could save her own seed year after year.',
    }),
    sl('check', 'Quick check: seed without fertilisation', {
      b: 'Judge the assertion and the reason about apomixis and parthenocarpy.',
      n: 'Quick check. One process makes a seed without fertilisation, the other makes a fruit without fertilisation. Read carefully.',
      chk: 'apo-parth-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Double fertilisation: **syngamy** (gamete + egg → diploid zygote) and **triple fusion** (gamete + 2 polar nuclei → triploid primary endosperm nucleus).',
        'Endosperm develops before the embryo; free-nuclear then cellular (coconut water and kernel).',
        'Non-albuminous seeds (pea, groundnut) vs albuminous seeds (wheat, maize, castor); perisperm in black pepper and beet.',
        'Dicot embryo: plumule, epicotyl, cotyledons, hypocotyl, radicle, root cap. Grass embryo: scutellum, coleoptile, coleorhiza, epiblast.',
        'Ovule → seed (integuments → seed coat); ovary → fruit (wall → pericarp); false fruits include thalamus.',
        '**Apomixis**: seed without fertilisation; **polyembryony**: many embryos in a seed; **parthenocarpy**: fruit without fertilisation.',
      ],
      v: table(['Term', 'Fertilisation?', 'Product'], [['Double fertilisation', 'Yes, two fusions', 'Zygote and endosperm'], ['Apomixis', 'No', 'Seed with a mother-like embryo'], ['Parthenocarpy', 'No', 'Seedless fruit']], 'Summary table of double fertilisation, apomixis and parthenocarpy'),
      n: 'To recap. Two male gametes, two fusions: a diploid zygote and a triploid endosperm. Endosperm grows first and feeds the embryo. The ovule becomes the seed and the ovary becomes the fruit. And apomixis, polyembryony and parthenocarpy are special cases that break the usual rules, with real uses in agriculture.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Name both fusions in double fertilisation and give the **ploidy** of each product.',
        'The seed coat and pericarp are **maternal, diploid** tissue, not products of fertilisation.',
        'Coconut: water = **free-nuclear** endosperm; kernel = **cellular** endosperm.',
        'Do not mix up **apomixis** (seed, no fertilisation) and **parthenocarpy** (fruit, no seed).',
        'In counting questions, both male gametes of one pollen tube are used in **one** ovule.',
      ],
      n: 'Final tips. Give the ploidy every time you mention syngamy or triple fusion. Remember that the seed coat and fruit wall belong to the mother plant. Keep apomixis and parthenocarpy apart: one gives a seed without fertilisation, the other a fruit without seeds. And in counting questions, one pollen grain serves one ovule.',
    }),
  ],
});
