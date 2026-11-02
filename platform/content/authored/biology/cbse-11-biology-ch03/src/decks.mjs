// ch03 Plant Kingdom — two decks: Part 1 (t01 algae, bryophytes, pteridophytes, life cycles), Part 2 (t02 gymnosperms and angiosperms).
import { sl, deck, table, flow, svgV, r } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { BROWN_ALGA, MOSS, FERN, CYCAS, FLOWER, SAC_SVG } from './svgs.mjs';
import { ALGAE, GROUPS, CYCLES, N, SAC, algaFromClue, ploidy, sporesFrom } from './calc.mjs';

const yn = (b) => (b ? 'Yes' : 'No');
export const V = {
  brown: svgV(BROWN_ALGA, 'Labelled body of a brown alga showing frond, stipe and holdfast'),
  moss: svgV(MOSS, 'Moss plant with a leafy haploid gametophyte and a sporophyte made of foot, seta and capsule'),
  fern: svgV(FERN, 'Fern sporophyte with rhizome, roots, young coiled frond, pinnate frond and sori'),
  cycas: svgV(CYCAS, 'Cycas plant with unbranched stem, pinnate leaves, male cone, tap root and coralloid roots'),
  flower: svgV(FLOWER, 'Longitudinal section of a flower with sepals, petals, stamens and a pistil with ovules'),
  sac: svgV(SAC_SVG, 'Embryo sac with egg apparatus, central cell with two polar nuclei and three antipodal cells'),
  algae: table(
    ['Class', 'Pigments', 'Stored food', 'Cell wall', 'Habitat', 'Examples'],
    ALGAE.map((a) => [`${a.cls} (${a.common})`, a.pigments.join(', '), a.store, a.wall, a.habitat, a.egs.join(', ')]),
    'Table comparing green, brown and red algae on pigments, stored food, cell wall, habitat and examples',
  ),
  cycles: table(
    ['Life-cycle type', 'Dominant, photosynthetic phase', 'Sporophyte', 'Examples'],
    CYCLES.map((c) => [c.type, c.dominant, c.sporophyte, c.egs]),
    'Table of haplontic, diplontic and haplo-diplontic life cycles',
  ),
  groups: table(
    ['Group', 'Vascular tissue', 'Seeds', 'Fruit', 'Water needed for fertilisation', 'Dominant phase'],
    GROUPS.map((g) => [g.name, yn(g.vascular), yn(g.seed), yn(g.fruit), yn(g.water), g.dominant]),
    'Table comparing the five plant groups on vascular tissue, seeds, fruit, water for fertilisation and dominant phase',
  ),
};

export const deck1 = deck({
  part: 1,
  title: 'Plant Kingdom — Part 1: Algae, bryophytes, pteridophytes and life cycles',
  goals: [
    'Distinguish green, brown and red algae by pigments and stored food',
    'Describe the features, classes and importance of bryophytes and pteridophytes',
    'Name the three life-cycle patterns and place plant groups in them',
  ],
  slides: [
    sl('title', 'Plant Kingdom', {
      b: 'Part 1 — the five groups of plants, then algae, bryophytes and pteridophytes.',
      v: flow('LR', [['a', 'Algae'], ['b', 'Bryophytes'], ['p', 'Pteridophytes'], ['g', 'Gymnosperms'], ['an', 'Angiosperms']], [['a', 'b'], ['b', 'p'], ['p', 'g'], ['g', 'an']], 'Flow of the five plant groups from algae to angiosperms'),
      n: 'The plant kingdom ranges from tiny green cells in a pond to giant trees. Biologists arrange plants in five groups: algae, bryophytes, pteridophytes, gymnosperms and angiosperms. This part covers the first three, and ends with the life cycles that link all five.',
    }),
    sl('concept', 'How plants are classified', {
      b: 'Early systems were **artificial**, using a few easy characters. **Natural** systems use many natural affinities, including internal features. **Phylogenetic** systems use **evolutionary relationships**.',
      v: table(
        ['System', 'Basis', 'Example of a feature used'],
        [['Artificial', 'Gross morphology, a few characters', 'Habit, colour, number and shape of leaves; androecium structure'], ['Natural', 'Natural affinities among organisms', 'Ultrastructure, anatomy, embryology, phytochemistry'], ['Phylogenetic', 'Evolutionary relationships', 'Common ancestry; fossil evidence']],
        'Table of artificial, natural and phylogenetic systems of classification',
      ),
      n: 'Artificial systems grouped plants by easy features like habit or leaf shape. Natural systems looked at many characters, including internal structure and chemistry. Modern phylogenetic systems arrange plants by their evolutionary relationships, and newer tools such as numerical taxonomy and chemotaxonomy help.',
    }),
    sl('concept', 'Algae: body, reproduction and uses', {
      b: '**Algae** are chlorophyll-bearing, simple, thalloid, autotrophic and largely aquatic. The body may be **unicellular** (*Chlamydomonas*), **colonial** (*Volvox*), **filamentous** (*Ulothrix*, *Spirogyra*) or **massive** (kelps).',
      v: table(
        ['Mode', 'How', 'Example'],
        [['Vegetative', 'Fragmentation', 'Spirogyra filament breaks into pieces'], ['Asexual', 'Flagellated zoospores', 'Chlamydomonas, Ulothrix'], ['Sexual', 'Isogamous, anisogamous or oogamous fusion of gametes', 'Isogamous: Spirogyra; oogamous: Volvox, Fucus']],
        'Table of vegetative, asexual and sexual reproduction in algae',
      ),
      n: 'Algae live in fresh water, sea water, on moist stones and soil. They fix about half of all the carbon dioxide taken up by photosynthesis on Earth, and add oxygen to their surroundings. Agar comes from red algae, algin from brown algae, and Chlorella and Spirulina are protein-rich food supplements.',
    }),
    sl('concept', 'Three classes of algae', {
      b: 'Algae are grouped by **pigments**, **stored food** and **cell wall**.',
      v: V.algae,
      n: 'Green algae have chlorophyll a and b, store starch and have cellulose walls. Brown algae have chlorophyll a and c with the brown pigment fucoxanthin, and store laminarin and mannitol. Red algae carry the red pigment phycoerythrin and store floridean starch; most are marine, some at great depths.',
    }),
    sl('diagram', 'Body of a brown alga', {
      b: 'A large brown alga is anchored by a **holdfast**; the **stipe** supports the leaf-like **frond**. Brown algae have two unequal, lateral flagella on their zoospores.',
      v: V.brown,
      n: 'The holdfast grips a rock under water. Above it the stalk, called the stipe, carries the broad frond, which does the photosynthesis. Examples are Laminaria, Sargassum and Fucus. A gelatinous coat of algin around the cellulose wall helps hold water when the tide goes out.',
    }),
    sl('check', 'Quick check: algal class', {
      b: 'Decide the class of an alga from its pigment and food reserve.',
      n: 'Quick check. Which pigment gives brown algae their colour, and what do they store?',
      chk: 'alga-class-mcq',
    }),
    sl('example', 'Worked example 1: naming the class of an alga', {
      b: 'Three unknown algae are examined. P has chlorophyll b and stores starch; Q has fucoxanthin and stores laminarin; R has r-phycoerythrin and floridean starch. Name each class.',
      ul: [
        `**P:** chlorophyll b appears only in one class, so **${algaFromClue({ pigment: 'chlorophyll b' })}** (green).`,
        `**Q:** fucoxanthin and laminarin point to **${algaFromClue({ pigment: 'fucoxanthin' })}** (brown).`,
        `**R:** phycoerythrin and floridean starch point to **${algaFromClue({ pigment: 'r-phycoerythrin' })}** (red).`,
      ],
      v: table(['Alga', 'Clue', 'Class'], [['P', 'Chlorophyll b', 'Chlorophyceae'], ['Q', 'Fucoxanthin, laminarin', 'Phaeophyceae'], ['R', 'Phycoerythrin, floridean starch', 'Rhodophyceae']], 'Worked table naming the class of each alga from its pigments and food reserve'),
      n: 'Pick the clue that is unique. Chlorophyll b belongs only to green algae. Fucoxanthin and laminarin belong to brown algae. Phycoerythrin and floridean starch belong to red algae. One good clue is enough to name the class.',
    }),
    sl('concept', 'Bryophytes: the amphibians of the plant kingdom', {
      b: '**Bryophytes** live on land but need **water for fertilisation**. No true roots, stem or leaves; **rhizoids** anchor them. The dominant body is the haploid **gametophyte**; the **sporophyte** depends on it.',
      v: table(['Feature', 'Liverworts', 'Mosses'], [['Body', 'Thalloid, dorsiventral, flat on the substrate', 'Protonema stage, then upright leafy stage'], ['Asexual reproduction', 'Fragmentation; gemmae in gemma cups', 'Fragmentation and budding in the protonema'], ['Sporophyte', 'Foot, seta, capsule', 'Foot, seta, capsule'], ['Examples', 'Marchantia', 'Funaria, Polytrichum, Sphagnum']], 'Table comparing liverworts and mosses'),
      n: 'Bryophytes are the amphibians of the plant world: they grow on land but need water for the male gamete to swim to the egg. The antheridium makes biflagellate antherozoids and the flask-shaped archegonium makes a single egg. Sphagnum gives peat, and mosses help succession on bare rock.',
    }),
    sl('diagram', 'A moss plant', {
      b: 'The **leafy gametophyte** bears **antheridia and archegonia** at its tip. After fertilisation the zygote grows into a **sporophyte** of **foot, seta and capsule**; meiosis in the capsule makes haploid spores.',
      v: V.moss,
      n: 'The green leafy shoot is the gametophyte, held down by branched threads called rhizoids. The sporophyte grows from its tip. Its foot is embedded in the shoot, a seta lifts the capsule, and spores form in the capsule after meiosis. Each spore grows into a new protonema.',
    }),
    sl('check', 'Quick check: bryophytes', {
      b: 'Judge the assertion and the reason about a bryophyte.',
      n: 'Quick check. Think about how the male gamete reaches the egg, and what the sporophyte depends on.',
      chk: 'moss-ar',
    }),
    sl('concept', 'Pteridophytes: first vascular plants', {
      b: '**Ferns, horsetails and club mosses.** First terrestrial plants with **xylem and phloem**. The main body is the **sporophyte** with true root, stem and leaves; the small free-living gametophyte is the **prothallus**. Water is still needed for fertilisation.',
      v: table(['Class', 'Example', 'Note'], [['Psilopsida', 'Psilotum', 'Simple, no true roots'], ['Lycopsida', 'Selaginella, Lycopodium', 'Small leaves (microphylls)'], ['Sphenopsida', 'Equisetum', 'Horsetails; cones (strobili)'], ['Pteropsida', 'Dryopteris, Pteris, Adiantum', 'Ferns with large leaves (macrophylls)']], 'Table of the four classes of pteridophytes with examples'),
      n: 'Sporangia sit on leaf-like sporophylls, sometimes packed into cones called strobili. Most pteridophytes are homosporous with one kind of spore. Selaginella and Salvinia are heterosporous, with large megaspores and small microspores. The female gametophyte keeps the zygote, a first step towards the seed habit.',
    }),
    sl('diagram', 'A fern sporophyte', {
      b: 'The fern **rhizome** bears roots and large **fronds**. **Sori** of sporangia lie on the underside of the **pinnae**; spores germinate into the heart-shaped **prothallus**.',
      v: V.fern,
      n: 'The fern is a sporophyte with a horizontal stem, roots and large compound leaves called fronds. Young fronds are coiled. Sori, which are clusters of sporangia, form on the lower surface of the leaflets. Meiosis in sporangia makes the haploid spores that grow into the small prothallus.',
    }),
    sl('check', 'Quick check: pteridophytes', {
      b: 'Which feature do pteridophytes share with bryophytes, and which sets them apart?',
      n: 'Quick check. What do pteridophytes have that bryophytes lack?',
      chk: 'fern-mcq',
    }),
    sl('concept', 'Alternation of generations', {
      b: 'A haploid **gametophyte** makes gametes; a diploid **sporophyte** makes spores by meiosis. The two alternate. Three patterns occur: **haplontic**, **diplontic** and **haplo-diplontic**.',
      v: V.cycles,
      n: 'In the haplontic pattern the dominant plant is haploid and only the zygote is diploid, as in Spirogyra. In the diplontic pattern the diploid sporophyte dominates, as in seed plants. In the haplo-diplontic pattern both phases are multicellular, as in bryophytes and pteridophytes.',
    }),
    sl('example', 'Worked example 2: spore counts and chromosome numbers', {
      b: `A moss capsule has 40 spore mother cells. Its gametophyte cells have ${N.mossN} chromosomes. A fern sporophyte has ${N.fern2n} chromosomes in each cell. Find the spores in the capsule, the moss sporophyte number and the prothallus number.`,
      ul: [
        `Each spore mother cell divides by meiosis into 4 spores: $40 \\times 4 = ${N.moss}$ spores.`,
        `Moss sporophyte cells are diploid: $2 \\times ${N.mossN} = ${N.mossSporophyte}$ chromosomes.`,
        `The prothallus is haploid: $${N.fern2n} \\div 2 = ${N.prothallus}$ chromosomes.`,
      ],
      v: table(['Quantity', 'Value'], [['Spores from 40 mother cells', String(N.moss)], ['Moss sporophyte cell', `${N.mossSporophyte} chromosomes`], ['Fern prothallus cell', `${N.prothallus} chromosomes`]], `Worked table: ${N.moss} spores, ${N.mossSporophyte} chromosomes in the sporophyte, ${N.prothallus} in the prothallus`),
      n: 'One diploid spore mother cell gives four haploid spores, so forty cells give one hundred and sixty spores. The sporophyte has double the gametophyte number. The prothallus is haploid, so it has half the sporophyte number.',
    }),
    sl('check', 'Quick check: life cycles', {
      b: 'Name the life-cycle pattern of the plant described.',
      n: 'Quick check. In which pattern is only the zygote diploid?',
      chk: 'cycle-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Plant classification: artificial, natural and phylogenetic systems.',
        'Algae: green (chlorophyll a and b, starch), brown (fucoxanthin, laminarin and mannitol), red (phycoerythrin, floridean starch).',
        'Bryophytes: liverworts and mosses; dominant gametophyte; sporophyte of foot, seta, capsule.',
        'Pteridophytes: first vascular plants; dominant sporophyte; prothallus; homospory and heterospory.',
        'Life cycles: haplontic, diplontic and haplo-diplontic.',
      ],
      v: V.cycles,
      n: 'To recap: algae are classified by pigment and stored food. Bryophytes have a dominant gametophyte, pteridophytes a dominant sporophyte with vascular tissue. Life cycles may be haplontic, diplontic or haplo-diplontic, depending on which phase is dominant.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Learn the **pigment and stored food** of each algal class as a table.',
        'Say **gametophyte** is dominant in bryophytes and **sporophyte** in pteridophytes.',
        'Label **foot, seta and capsule** on a moss sporophyte.',
        'Spore mother cells: **one meiosis gives four spores**.',
      ],
      n: 'Exam tips. Learn the algal classes as a table of pigments and food. Remember which generation dominates in each group. Label a moss sporophyte correctly. And for spore counts, one meiosis gives four spores.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Plant Kingdom — Part 2: Gymnosperms and angiosperms',
  goals: [
    'Describe the features and reproduction of gymnosperms',
    'Describe angiosperms, dicots and monocots, and double fertilisation',
    'Compare gymnosperms and angiosperms',
  ],
  slides: [
    sl('title', 'Seed plants', {
      b: 'Part 2 — plants with seeds: naked seeds, or seeds inside fruits.',
      v: flow('LR', [['s', 'Seed plants'], ['g', 'Gymnosperms: naked seeds'], ['a', 'Angiosperms: seeds in fruits']], [['s', 'g'], ['s', 'a']], 'Flow showing seed plants divided into gymnosperms and angiosperms'),
      n: 'Gymnosperms and angiosperms are the seed plants. In gymnosperms the ovules are not enclosed by an ovary wall, so the seeds are naked. In angiosperms the ovules lie in an ovary that becomes a fruit. This part compares them.',
    }),
    sl('concept', 'Gymnosperms', {
      b: '**Gymnos** means naked and **sperma** means seed: the **ovules are not enclosed by an ovary wall**, so seeds stay uncovered. Medium to tall trees and shrubs; *Sequoia* is among the tallest trees.',
      v: table(['Part', 'Feature', 'Example'], [['Roots', 'Tap roots; mycorrhiza in Pinus; coralloid roots with cyanobacteria in Cycas', 'Pinus, Cycas'], ['Stem', 'Unbranched or branched', 'Cycas unbranched; Pinus, Cedrus branched'], ['Leaves', 'Simple or compound; needles in conifers', 'Cycas pinnate; pine needles'], ['Spores', 'Heterosporous: microspores and megaspores', 'All gymnosperms']], 'Table of roots, stems, leaves and spores in gymnosperms'),
      n: 'Gymnosperms include conifers such as Pinus and Cedrus, and cycads such as Cycas. Roots are tap roots, sometimes with fungi as mycorrhiza or with cyanobacteria in special coralloid roots. Needle shaped leaves, a thick cuticle and sunken stomata reduce water loss in dry or cold conditions.',
    }),
    sl('diagram', 'A cycad: Cycas', {
      b: '*Cycas* has an **unbranched stem**, **pinnate leaves**, **coralloid roots** that host nitrogen-fixing cyanobacteria and **separate male and female plants**.',
      v: V.cycas,
      n: 'The unbranched stem carries a crown of large pinnate leaves that last for a few years. The male cone stands at the centre of a male plant. Near the soil surface, small coralloid roots live with nitrogen fixing cyanobacteria, while the tap root goes deeper.',
    }),
    sl('concept', 'Gymnosperm reproduction', {
      b: 'Male cones bear **microsporophylls** making **pollen grains** (the reduced male gametophyte). Female cones bear **megasporophylls** with **ovules**. The gametophytes stay on the sporophyte, and the seeds are not covered.',
      v: flow(
        'TB',
        [['m', 'Male cone: microsporangia make microspores'], ['p', 'Pollen grain = male gametophyte, carried by air'], ['f', 'Female cone: ovule with megaspore mother cell'], ['g', 'Four megaspores; one becomes the female gametophyte with archegonia'], ['e', 'Pollen tube reaches archegonium; fertilisation'], ['s', 'Zygote becomes embryo; ovule becomes a naked seed']],
        [['m', 'p'], ['p', 'e'], ['f', 'g'], ['g', 'e'], ['e', 's']],
        'Flow of gymnosperm reproduction from male and female cones to a naked seed',
      ),
      n: 'Microspores form inside the male cone and develop into pollen grains, a highly reduced male gametophyte. In the ovule one megaspore mother cell divides by meiosis into four megaspores. One grows into the female gametophyte with archegonia. A pollen tube carries the male gametes to the archegonia.',
    }),
    sl('check', 'Quick check: naked seeds', {
      b: 'Choose the feature that defines a gymnosperm.',
      n: 'Quick check. What is naked about the seeds of a gymnosperm?',
      chk: 'gymno-mcq',
    }),
    sl('concept', 'Angiosperms: flowering plants', {
      b: '**Angiosperms** bear pollen grains and ovules in **flowers**; seeds are enclosed in **fruits**. From *Wolffia*, the smallest, to *Eucalyptus* trees over a hundred metres tall.',
      v: table(['Feature', 'Dicotyledons', 'Monocotyledons'], [['Cotyledons in the seed', 'Two', 'One'], ['Leaf venation', 'Reticulate', 'Parallel'], ['Flower parts', 'Tetramerous or pentamerous', 'Trimerous'], ['Examples', 'Pea, mustard, sunflower', 'Wheat, maize, onion']], 'Table comparing dicotyledons and monocotyledons'),
      n: 'Angiosperms are the dominant land plants and supply food, fodder, fuel and medicines. They fall into two classes. Dicots have seeds with two cotyledons, net veined leaves and flowers with four or five parts. Monocots have one cotyledon, parallel veins and flowers with three parts.',
    }),
    sl('diagram', 'The flower', {
      b: 'The **stamen** (filament and anther with pollen) is the male organ. The **pistil** (stigma, style, ovary with ovules) is the female organ.',
      v: V.flower,
      n: 'Each stamen has a filament and an anther holding pollen grains. The pistil has a sticky stigma, a narrow style and an ovary with one or more ovules. After fertilisation the ovules become seeds and the ovary becomes the fruit.',
    }),
    sl('check', 'Quick check: dicot or monocot', {
      b: 'A seed has one cotyledon. What else would you expect?',
      n: 'Quick check. Which leaf venation goes with one cotyledon?',
      chk: 'monocot-mcq',
    }),
    sl('diagram', 'The embryo sac', {
      b: `The female gametophyte is the **embryo sac**: **${SAC.cells} cells, ${SAC.nuclei} nuclei**. Egg apparatus (one egg and two synergids) at the micropylar end, three antipodals at the other end, and a **central cell with two polar nuclei**.`,
      v: V.sac,
      n: 'The embryo sac forms from a megaspore. Its seven cells are the egg and two synergids, three antipodals, and one large central cell. The central cell has two polar nuclei, which makes eight nuclei in all. The egg apparatus lies at the micropylar end.',
    }),
    sl('concept', 'Double fertilisation', {
      b: 'A pollen tube releases **two male gametes**. One fuses with the egg (**syngamy**) to form the **zygote**; the other fuses with the **two polar nuclei** (**triple fusion**) to form the **primary endosperm nucleus**. This is unique to angiosperms.',
      v: flow('LR', [['t', 'Pollen tube: two male gametes'], ['s', 'Syngamy: male gamete + egg'], ['z', 'Zygote → embryo'], ['tf', 'Triple fusion: male gamete + two polar nuclei'], ['p', 'PEN → endosperm']], [['t', 's'], ['s', 'z'], ['t', 'tf'], ['tf', 'p']], 'Flow of double fertilisation giving zygote and primary endosperm nucleus'),
      n: 'Two fusions occur in one embryo sac. Syngamy joins one male gamete with the egg to form the zygote. Triple fusion joins the other male gamete with the two polar nuclei to make the primary endosperm nucleus, which grows into the nutritive endosperm. Together they are called double fertilisation.',
    }),
    sl('example', 'Worked example 1: chromosome numbers in double fertilisation', {
      b: `In an angiosperm the egg cell has ${N.egg} chromosomes. Find the number in the zygote and in the primary endosperm nucleus.`,
      ul: [
        `Egg and male gamete are haploid, each ${N.egg}.`,
        `Zygote (syngamy, 2 nuclei): $${N.egg} + ${N.egg} = ${N.zygote}$ chromosomes.`,
        `PEN (triple fusion, 3 nuclei): $${N.egg} \\times 3 = ${N.pen}$ chromosomes, so the endosperm is triploid.`,
      ],
      v: table(['Product', 'Nuclei fused', 'Chromosomes'], [['Zygote', '2', String(N.zygote)], ['Primary endosperm nucleus', '3', String(N.pen)]], `Worked table: zygote ${N.zygote} chromosomes, primary endosperm nucleus ${N.pen}`),
      n: 'Syngamy joins two haploid nuclei, so the zygote is diploid, with twenty four chromosomes. Triple fusion joins three haploid nuclei, so the endosperm nucleus is triploid, with thirty six chromosomes.',
    }),
    sl('check', 'Quick check: double fertilisation', {
      b: 'How many nuclei take part in triple fusion?',
      n: 'Quick check. Which nuclei fuse with the second male gamete?',
      chk: 'double-mcq',
    }),
    sl('example', 'Worked example 2: pollen and ovules', {
      b: `An ovary has ${N.ovules} ovules. Each ovule is fertilised by one pollen tube, and each tube carries 2 male gametes. How many pollen tubes, male gametes and seeds result? How many meiotic divisions make 100 pollen grains?`,
      ul: [
        `Pollen tubes: one per ovule, so ${N.tubes}.`,
        `Male gametes: $${N.tubes} \\times 2 = ${N.malesNeeded}$.`,
        `Seeds: one per fertilised ovule, so ${N.seeds}.`,
        `100 pollen grains need $100 \\div 4 = ${N.pmc}$ meiotic divisions of pollen mother cells.`,
      ],
      v: table(['Quantity', 'Value'], [['Pollen tubes', String(N.tubes)], ['Male gametes', String(N.malesNeeded)], ['Seeds', String(N.seeds)], ['Meiotic divisions for 100 pollen grains', String(N.pmc)]], `Worked table: ${N.tubes} tubes, ${N.malesNeeded} male gametes, ${N.seeds} seeds, ${N.pmc} meiotic divisions`),
      n: 'Thirty ovules need thirty pollen tubes, each carrying two male gametes, so sixty in all. Each fertilised ovule becomes one seed. Because each pollen mother cell gives four pollen grains, one hundred grains need twenty five meiotic divisions.',
    }),
    sl('concept', 'Comparing the five groups', {
      b: 'Water for fertilisation is lost with the **seed habit**; vascular tissue appears with **pteridophytes**; fruits are found only in **angiosperms**.',
      v: V.groups,
      n: 'Algae and bryophytes lack vascular tissue. Pteridophytes are the first vascular plants but have no seeds. Gymnosperms have naked seeds, and angiosperms have seeds inside fruits. Seed plants no longer need free water for fertilisation because the pollen tube carries the male gametes.',
    }),
    sl('check', 'Quick check: comparing groups', {
      b: 'Judge the assertion and the reason about gymnosperms and pteridophytes.',
      n: 'Quick check. What do gymnosperms use in place of swimming sperm?',
      chk: 'water-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Gymnosperms: naked seeds, heterosporous, pollen grain and female gametophyte kept on the sporophyte; Cycas, Pinus.',
        'Angiosperms: flowers and fruits; dicots (two cotyledons) and monocots (one).',
        'Embryo sac: 7 cells, 8 nuclei.',
        'Double fertilisation: syngamy (zygote) and triple fusion (PEN, triploid endosperm).',
        'Seed plants are diplontic with a dominant sporophyte.',
      ],
      v: V.groups,
      n: 'To recap: gymnosperms have naked seeds and angiosperms have seeds in fruits. The angiosperm embryo sac has seven cells and eight nuclei. Double fertilisation makes a diploid zygote and a triploid endosperm. In seed plants the sporophyte dominates.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Write **naked seeds** and **ovules not enclosed in an ovary** for gymnosperms.',
        'Give **two reasons** when comparing dicots and monocots, not one.',
        'Say **syngamy and triple fusion** together for double fertilisation.',
        '**Zygote 2n, PEN 3n, egg n**: show the arithmetic.',
      ],
      n: 'Exam tips. Define gymnosperms by their naked ovules and seeds. Compare dicots and monocots with at least two points. Name both syngamy and triple fusion. And show the chromosome arithmetic for the zygote and the endosperm.',
    }),
  ],
});
