// ch03 Plant Kingdom — question bank. AR keys: b a c d a b d.
import { mk, add, r, svgV } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { N, SAC, SAMPLES, classOf, algaFromClue, ploidy, sporesFrom, meioses, male, G, namesWhere } from './calc.mjs';
import { BROWN_ALGA_L, MOSS_L, FERN_L, FLOWER_L, SAC_L } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const L = {
  brown: svgV(BROWN_ALGA_L, 'Body of a large brown alga with three parts marked A, B and C'),
  moss: svgV(MOSS_L, 'Moss plant with five parts marked A to E'),
  fern: svgV(FERN_L, 'Fern sporophyte with six parts marked A to F'),
  flower: svgV(FLOWER_L, 'Flower in longitudinal section with six parts marked A to F'),
  sac: svgV(SAC_L, 'Embryo sac with five parts marked A to E'),
};

// ---------------------------------------------------------------- t01 algae
add('alga-class-mcq', mcq({
  stem: 'A marine biologist collects an olive-brown alga from a rocky shore. It is anchored by a holdfast and stores mannitol. Which pigment is mainly responsible for its colour?',
  right: 'Fucoxanthin',
  wrong: ['r-Phycoerythrin', 'Chlorophyll b', 'Chlorophyll d'],
  sol: 'Brown algae (Phaeophyceae) have chlorophyll a, c and the brown xanthophyll fucoxanthin and store laminarin and mannitol — option (@K).',
  d: 2, c: 'application', t: [1],
}), () => algaFromClue({ pigment: 'fucoxanthin' }) === 'Phaeophyceae' || 'class');
add('pyren-mcq', mcq({
  stem: 'Cells of a freshwater filamentous alga contain bodies called pyrenoids that turn blue-black with iodine. Which food reserve and class does this indicate?',
  right: 'Starch; Chlorophyceae',
  wrong: ['Floridean starch; Rhodophyceae', 'Laminarin; Phaeophyceae', 'Mannitol; Phaeophyceae'],
  sol: 'Green algae store starch in pyrenoids; floridean starch belongs to red algae, laminarin and mannitol to brown algae — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('agar-mcq', mcq({
  stem: 'A food-technology student wants to extract agar for a laboratory culture medium. Which alga should she harvest?',
  right: 'Gelidium, a red alga',
  wrong: ['Laminaria, a brown alga', 'Chlamydomonas, a green alga', 'Spirogyra, a green alga'],
  sol: 'Agar is obtained from the red algae Gelidium and Gracilaria; algin comes from brown algae — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('zoo-mcq', mcq({
  stem: 'Under a microscope a student sees a pear-shaped motile cell with two unequal flagella attached to its side. Which kind of alga most probably released it?',
  right: 'A brown alga',
  wrong: ['A green alga', 'A red alga, which has no motile cells', 'A diatom-like green alga with no flagella'],
  sol: 'Brown algae have two unequal, laterally attached flagella on their motile cells; green algae have two to eight equal apical flagella and red algae have none — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('half-mcq', mcq({
  stem: 'Algae are important to the whole planet because they',
  right: 'fix about half of the total carbon dioxide taken up by photosynthesis on Earth',
  wrong: ['fix almost all the carbon dioxide taken up by photosynthesis on Earth', 'fix only about a tenth of the carbon dioxide taken up by photosynthesis', 'release carbon dioxide but never oxygen into water'],
  sol: 'Algae carry out about half of the total carbon dioxide fixation on Earth and raise the dissolved oxygen of their surroundings — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('holdfast-mcq', mcq({
  stem: 'In the drawing of a brown alga, which part anchors the alga to the rock, and what is it called?',
  right: 'C, the holdfast',
  wrong: ['A, the stipe', 'B, the frond', 'B, the holdfast'],
  sol: 'C is the branched root-like holdfast; B is the stipe (stalk) and A the frond (blade) — option (@K).',
  assets: [L.brown],
  d: 2, c: 'application', t: [1],
}));
add('sample-mcq', mcq({
  stem: 'A student states: "An alga that has chlorophyll b and stores starch in its pyrenoids belongs to the same class as Spirogyra." Which class is meant, and is she right?',
  right: 'Chlorophyceae; she is right',
  wrong: ['Phaeophyceae; she is right', 'Rhodophyceae; she is wrong', 'Chlorophyceae; she is wrong'],
  sol: 'Chlorophyll b and starch mark the green algae (Chlorophyceae), which include Spirogyra — option (@K).',
  d: 2, c: 'application', t: [1],
}));
// ---------------------------------------------------------------- t01 bryophytes
add('bryo-mcq', mcq({
  stem: 'Bryophytes are called the amphibians of the plant kingdom because they',
  right: 'live in soil and on land but need water to complete sexual reproduction',
  wrong: ['spend half of their life under water and half in air', 'have gills like some animals when they are young', 'have two kinds of vascular tissue, xylem and phloem'],
  sol: 'Bryophytes grow on land but the antherozoids must swim in water to reach the egg — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('liver-mcq', mcq({
  stem: 'On a damp garden wall a student finds a flat green thallus with small cups, each holding tiny green discs. These cups and discs are most probably',
  right: 'gemma cups and gemmae of a liverwort, used for asexual reproduction',
  wrong: ['antheridia and archegonia of a moss, used for sexual reproduction', 'sori and sporangia of a fern, used for spore dispersal', 'coralloid roots of a cycad, used for nitrogen fixation'],
  sol: 'Liverworts such as Marchantia produce green multicellular buds, gemmae, in gemma cups on the thallus; they detach and grow into new individuals — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('stage-mcq', mcq({
  stem: 'A moss spore lands on moist soil and grows into a creeping, green, branched, thread-like stage. This stage is the',
  right: 'protonema',
  wrong: ['prothallus', 'capsule', 'seta'],
  sol: 'In mosses a spore develops directly into the creeping green protonema; the prothallus belongs to pteridophytes — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('mosscap-mcq', mcq({
  stem: 'In the drawing of a moss plant, in which marked part does meiosis produce the spores?',
  right: 'A',
  wrong: ['B', 'D', 'E'],
  sol: 'The capsule (A) at the top of the sporophyte makes haploid spores by meiosis; B is the seta, D the leaf-like flaps and E the rhizoids — option (@K).',
  assets: [L.moss],
  d: 2, c: 'application', t: [1],
}));
add('mossgam-mcq', mcq({
  stem: 'In the drawing of a moss plant, which two marked parts both belong to the haploid gametophyte?',
  right: 'D and E',
  wrong: ['A and B', 'B and C', 'A and D'],
  sol: 'The leaf-like flaps (D) and rhizoids (E) are parts of the gametophyte; the capsule (A), seta (B) and foot (C) form the sporophyte — option (@K).',
  assets: [L.moss],
  d: 3, c: 'analysis', t: [1],
}));
add('peat-mcq', mcq({
  stem: 'A nursery packs live seedlings in moist moss before sending them by lorry, and a village burns dried moss deposits from a bog as fuel. The moss in both cases is',
  right: 'Sphagnum, which holds a great deal of water and forms peat',
  wrong: ['Funaria, which holds a great deal of water and forms peat', 'Marchantia, which holds a great deal of water and forms coal', 'Sphagnum, which has vascular tissue and forms coal'],
  sol: 'Sphagnum provides peat used as fuel, and its water-holding capacity makes it a packing material for living plants — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('gamdom-mcq', mcq({
  stem: 'In which plant is the gametophyte the dominant, independent phase, with the sporophyte depending on it?',
  right: 'Funaria',
  wrong: ['Dryopteris', 'Pinus', 'Selaginella'],
  sol: 'In bryophytes such as the moss Funaria the sporophyte is attached to and nourished by the gametophyte; in ferns, Selaginella and pine the sporophyte dominates — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
// ---------------------------------------------------------------- t01 pteridophytes and life cycles
add('fern-mcq', mcq({
  stem: 'Which feature do pteridophytes have that bryophytes lack?',
  right: 'Xylem and phloem in a sporophyte with true roots, stem and leaves',
  wrong: ['A gametophyte that needs water for fertilisation', 'Spores produced by meiosis in sporangia', 'Antheridia and archegonia as sex organs'],
  sol: 'Pteridophytes are the first terrestrial plants with vascular tissue; the other three features are shared with bryophytes — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('sorus-mcq', mcq({
  stem: 'In the drawing of a fern sporophyte, which marked part is a cluster of sporangia?',
  right: 'C',
  wrong: ['A', 'B', 'F'],
  sol: 'C is the sorus, a cluster of sporangia on the underside of a pinna; A is the frond, B a pinna and F the roots — option (@K).',
  assets: [L.fern],
  d: 2, c: 'application', t: [1],
}));
add('prothal-mcq', mcq({
  stem: 'A forester finds a small, heart-shaped, green, free-living plant on a damp shady forest floor beneath ferns. It bears antheridia and archegonia. This plant is',
  right: 'the prothallus, the haploid gametophyte of a fern',
  wrong: ['a young fern sporophyte, which is diploid', 'a protonema of a moss, which is diploid', 'the embryo sac of a flowering plant'],
  sol: 'The prothallus is the small, multicellular, free-living, photosynthetic gametophyte of pteridophytes and bears the sex organs — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('seedhab-mcq', mcq({
  stem: 'In Selaginella and Salvinia the female gametophyte is retained on the parent sporophyte and the zygote starts to develop inside it. Why is this event important in plant evolution?',
  right: 'It is a precursor of the seed habit',
  wrong: ['It shows that these plants have no spores', 'It makes the plants homosporous', 'It removes the need for any gametophyte'],
  sol: 'Retention of the female gametophyte and development of the zygote into an embryo on the parent are a step towards the seed habit — option (@K).',
  d: 3, c: 'understanding', t: [1],
}));
add('fucus-mcq', mcq({
  stem: 'The body of an alga is diploid, and only its gametes are haploid. Which life-cycle pattern does it follow, and which alga is an example?',
  right: 'Diplontic; Fucus',
  wrong: ['Haplontic; Fucus', 'Diplontic; Spirogyra', 'Haplo-diplontic; Volvox'],
  sol: 'A dominant diploid body with haploid gametes is the diplontic pattern, seen in Fucus; Volvox and Spirogyra are haplontic — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('cycle-mcq', mcq({
  stem: 'In a pond alga the cells are haploid, and the zygote divides by meiosis to form four haploid cells. Its life-cycle pattern is',
  right: 'haplontic',
  wrong: ['diplontic', 'haplo-diplontic with a free-living sporophyte', 'diplontic with a multicellular gametophyte'],
  sol: 'Only the zygote is diploid and it divides by meiosis, so the pattern is haplontic (as in Spirogyra) — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('moss-ar', ar({
  a: 'Bryophytes need water for sexual reproduction.',
  r: 'The sporophyte of a bryophyte depends on the gametophyte for nutrition.',
  key: 'b',
  sol: 'Both are true, but the dependence of the sporophyte does not explain the need for water; antherozoids swim in water to reach the egg — option (b).',
  d: 2, c: 'understanding', t: [1],
}));
add('fern-ar', ar({
  a: 'A fern frond carrying sori is the gametophyte generation of the fern.',
  r: 'The sporangia of a fern produce spores by meiosis.',
  key: 'd',
  sol: 'A is false: the frond belongs to the diploid sporophyte, and the gametophyte is the small prothallus. R is true — option (d).',
  d: 2, c: 'understanding', t: [1],
}));
add('brown-ar', ar({
  a: 'Brown algae look olive green to brown although they contain chlorophyll.',
  r: 'Brown algae contain a large amount of the xanthophyll fucoxanthin.',
  key: 'a',
  sol: 'Both are true; the abundant fucoxanthin masks the green of chlorophyll and explains the colour — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('red-ar', ar({
  a: 'Some red algae grow at great depths in the sea.',
  r: 'Red algae store floridean starch, similar to amylopectin and glycogen.',
  key: 'b',
  sol: 'Both statements are true, but the food reserve does not explain the depth at which they live — option (b).',
  d: 2, c: 'understanding', t: [1],
}));
add('prothallus-tf', tf({
  stem: 'The prothallus of a fern is a diploid plant on which the sori are borne.',
  key: 'f',
  sol: 'False. The prothallus is the haploid gametophyte with antheridia and archegonia; sori are borne on the diploid sporophyte.',
  d: 1, c: 'understanding', t: [1],
}));
add('protonema-tf', tf({
  stem: 'In a moss, the protonema develops directly from a spore.',
  key: 't',
  sol: 'True. The spore germinates into the creeping, green, branched protonema, which later gives the leafy stage.',
  d: 1, c: 'recall', t: [1],
}));
add('gemmae-fill', fill({
  stem: 'Green, multicellular asexual buds that develop in gemma cups on the thallus of a liverwort are called ______.',
  acc: [['gemmae', 'gemma']],
  sol: 'Gemmae.',
  d: 1, c: 'recall', t: [1],
}));
add('zoospore-fill', fill({
  stem: 'Algae reproduce asexually by means of flagellated, motile spores called ______.',
  acc: [['zoospores', 'zoospore']],
  sol: 'Zoospores.',
  d: 1, c: 'recall', t: [1],
}));
add('group-match', match({
  stem: 'Match each structure (column I) with the plant group in which it is found (column II).',
  pairs: [
    ['Gemma cup', 'Liverwort'],
    ['Sorus', 'Fern'],
    ['Coralloid root', 'Cycas'],
    ['Embryo sac', 'Flowering plant'],
  ],
  order: [3, 1, 0, 2],
  sol: 'Gemma cups are liverwort structures, sori belong to ferns, coralloid roots to Cycas and the embryo sac to angiosperms.',
  d: 1, c: 'recall', t: [1, 2],
}));
add('moss-num', num({
  stem: `A moss capsule contains 40 spore mother cells. Assuming that every cell completes meiosis, how many spores does the capsule release?`,
  value: N.moss,
  sol: r`Each spore mother cell gives 4 spores: $40 \times 4 = ${N.moss}$.`,
  scheme: [[`${N.moss}`, 1]],
  d: 1, c: 'application', t: [1],
}), (q) => q.answer.value === sporesFrom(40) || 'value');
add('sorus-num', num({
  stem: `A fern sorus has ${N.fernSporangia} sporangia and each sporangium holds 16 spore mother cells. How many spores can one sorus release?`,
  value: N.fernPerSorus,
  sol: r`Spore mother cells: $${N.fernSporangia} \times 16 = ${N.fernSporangia * 16}$. Each gives 4 spores: $${N.fernSporangia * 16} \times 4 = ${N.fernPerSorus}$.`,
  scheme: [['Spore mother cells', 0.5], [`${N.fernPerSorus} spores`, 0.5]],
  d: 3, c: 'application', t: [1],
}), (q) => q.answer.value === 1600 || 'value');
add('survey-num', num({
  stem: `A botany club lists twelve plants it found on a field trip.\n\n| Plant | Group |\n|---|---|\n${['Marchantia', 'Funaria', 'Sphagnum', 'Selaginella', 'Equisetum', 'Dryopteris', 'Cycas', 'Pinus', 'Wolffia', 'Eucalyptus', 'Spirogyra', 'Fucus'].map((p) => `| ${p} | ${{ Marchantia: 'bryophyte', Funaria: 'bryophyte', Sphagnum: 'bryophyte', Selaginella: 'pteridophyte', Equisetum: 'pteridophyte', Dryopteris: 'pteridophyte', Cycas: 'gymnosperm', Pinus: 'gymnosperm', Wolffia: 'angiosperm', Eucalyptus: 'angiosperm', Spirogyra: 'alga', Fucus: 'alga' }[p]} |`).join('\n')}\n\nHow many of these twelve plants have vascular tissue (xylem and phloem)?`,
  value: N.surveyVascular,
  sol: `Pteridophytes (3), gymnosperms (2) and angiosperms (2) have vascular tissue: $3 + 2 + 2 = ${N.surveyVascular}$. Bryophytes and algae have none.`,
  scheme: [[`${N.surveyVascular}`, 1]],
  d: 2, c: 'application', t: [1, 2],
}), () => N.surveyVascular === 7 || 'value');

add('classif-short', short({
  marks: 2,
  stem: 'Distinguish between an artificial and a natural system of plant classification, with one feature used in each.',
  model: 'An **artificial** system uses a few easily seen gross characters, such as **habit, colour, or the number and shape of leaves**. A **natural** system uses **natural affinities** among organisms, including **internal features** such as ultrastructure, anatomy, embryology and phytochemistry, so related plants are grouped together.',
  sol: 'Artificial: few gross characters; natural: many characters including internal ones.',
  scheme: [['Artificial: few gross characters with an example', 1], ['Natural: natural affinities with an example', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('bryo-amph-short', short({
  marks: 2,
  stem: 'Why are bryophytes called the amphibians of the plant kingdom? Name their two classes.',
  model: 'Bryophytes **live on land** in damp, shaded places, but they **depend on water for sexual reproduction**, because the biflagellate antherozoids must swim to the egg in the archegonium. Their two classes are **liverworts and mosses**.',
  sol: 'Land habit, water needed; liverworts and mosses.',
  scheme: [['Land-living but water needed for fertilisation', 1.5], ['Liverworts and mosses', 0.5]],
  d: 1, c: 'understanding', t: [1],
}));
add('gemmae-short', short({
  marks: 2,
  stem: 'A student sees a liverwort thallus dotted with cups holding green discs. Name these structures and explain how they help the plant.',
  model: 'They are **gemma cups** holding **gemmae**, which are green, multicellular **asexual buds**. A gemma **detaches from the parent** and **germinates into a new thallus**, so the liverwort multiplies without gametes or fertilisation.',
  sol: 'Gemmae in gemma cups: asexual reproduction.',
  scheme: [['Gemma cups and gemmae named', 1], ['Detach and germinate: asexual multiplication', 1]],
  d: 2, c: 'application', t: [1],
}));
add('homo-short', short({
  marks: 2,
  stem: 'Distinguish between homosporous and heterosporous pteridophytes, with one example of the second kind.',
  model: 'In **homosporous** plants all the spores are of **one kind**, as in most ferns. **Heterosporous** plants produce **two kinds of spores**, large **megaspores** and small **microspores**, which grow into female and male gametophytes; examples are **Selaginella** and **Salvinia**.',
  sol: 'One kind versus two kinds of spores; Selaginella.',
  scheme: [['Homosporous: one kind of spore', 1], ['Heterosporous: macro- and microspores; example', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('prothal-short', short({
  marks: 2,
  stem: 'What is a prothallus, and why does its need for water and shade limit the spread of ferns?',
  model: 'The **prothallus** is the small, multicellular, free-living, mostly photosynthetic **gametophyte** of a pteridophyte, bearing antheridia and archegonia. It needs **cool, damp, shady places** to grow, and **water for the antherozoids to reach the egg**, so ferns are restricted to narrow geographical regions.',
  sol: 'Gametophyte; damp shade and water needed.',
  scheme: [['Prothallus described', 1], ['Water and shade needed, limiting spread', 1]],
  d: 2, c: 'application', t: [1],
}));
add('seedhab-short', short({
  marks: 2,
  stem: 'Explain how heterospory in Selaginella can be seen as a step towards the seed habit.',
  model: 'In Selaginella **megaspores and microspores** grow into **female and male gametophytes**. The **female gametophyte is retained on the parent sporophyte**, and the **zygote develops into a young embryo inside it**. Keeping the embryo on the parent in this way is a **precursor of the seed habit**.',
  sol: 'Retained female gametophyte and embryo development: seed habit.',
  scheme: [['Heterospory with female gametophyte retained', 1], ['Embryo develops inside; precursor of seed', 1]],
  d: 3, c: 'application', t: [1],
}));
add('algaeuse-short', short({
  marks: 2,
  stem: 'Name two commercial products obtained from algae, with the class of alga that yields each.',
  model: '**Agar**, used in culture media and food, is obtained from the **red algae** *Gelidium* and *Gracilaria*. **Algin**, a water-holding hydrocolloid, is obtained from **brown algae**. (Carrageen from red algae is another example.)',
  sol: 'Agar from red algae; algin from brown algae.',
  scheme: [['Agar with red algae', 1], ['Algin with brown algae', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('gymadapt-short', short({
  marks: 2,
  stem: 'A pine tree thrives on a cold, windy slope where water is scarce in winter. Name two features of its leaves that help it and say how.',
  model: 'Pine leaves are **needle-like**, which **reduces the surface area** exposed to wind and sun. They also have a **thick cuticle** and **sunken stomata**, which further **reduce loss of water** by transpiration, so the tree survives extremes of temperature, humidity and wind.',
  sol: 'Needle shape, thick cuticle, sunken stomata reduce water loss.',
  scheme: [['Two features named', 1], ['Reduced water loss explained', 1]],
  d: 2, c: 'application', t: [2],
}));
add('dicot-short', short({
  marks: 2,
  stem: 'State two differences between dicotyledons and monocotyledons, with one example of each.',
  model: '**Dicots** have **two cotyledons** in the seed and **reticulate venation** in leaves, with flowers of four or five parts (pea, mustard). **Monocots** have **one cotyledon** and **parallel venation**, with flowers of three parts (wheat, maize).',
  sol: 'Cotyledons and venation, with examples.',
  scheme: [['Two differences', 1], ['Examples', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('sac-short', short({
  marks: 2,
  stem: `Describe the structure of a mature angiosperm embryo sac, giving the number of cells and nuclei.`,
  model: `The embryo sac has **${SAC.cells} cells and ${SAC.nuclei} nuclei**. At the micropylar end is the **egg apparatus** of one **egg cell and two synergids**; at the other end are **three antipodal cells**; and the large **central cell** contains **two polar nuclei**.`,
  sol: 'Seven cells, eight nuclei; arrangement.',
  scheme: [['7 cells and 8 nuclei', 1], ['Egg apparatus, antipodals, central cell with polar nuclei', 1]],
  d: 2, c: 'understanding', t: [2],
}), () => SAC.cells === 7 && SAC.nuclei === 8 || 'sac');
add('algae3-short', short({
  marks: 3,
  stem: 'Distinguish green, brown and red algae on the basis of their pigments and stored food.',
  model: '**Green algae** have **chlorophyll a and b** and store **starch** in pyrenoids. **Brown algae** have **chlorophyll a and c** and the brown pigment **fucoxanthin**, and store **laminarin and mannitol**. **Red algae** have **chlorophyll a and d** and the red pigment **r-phycoerythrin**, and store **floridean starch**.',
  sol: 'Pigments and food reserves of the three classes.',
  scheme: [['Green: chlorophyll a, b; starch', 1], ['Brown: chlorophyll a, c, fucoxanthin; laminarin, mannitol', 1], ['Red: chlorophyll a, d, phycoerythrin; floridean starch', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('cycles3-short', short({
  marks: 3,
  stem: 'Distinguish between the haplontic and diplontic life cycles, giving one example of each.',
  model: 'In the **haplontic** cycle the dominant, free-living body is the **haploid gametophyte**, and the sporophyte is only the **one-celled zygote**, which divides by meiosis; examples are **Volvox and Spirogyra**. In the **diplontic** cycle the **diploid sporophyte** is dominant and the gametophyte is reduced to a few cells; examples are **gymnosperms, angiosperms and the alga Fucus**.',
  sol: 'Dominant phase and zygote or gametophyte in each.',
  scheme: [['Haplontic: haploid dominant, zygote only diploid; example', 1.5], ['Diplontic: diploid dominant, gametophyte few cells; example', 1.5]],
  d: 2, c: 'understanding', t: [1],
}));
add('mosslife-short', short({
  marks: 3,
  stem: 'A student pulls a moss plant from a wall and notices a thin stalk topped by a small capsule growing from its tip. Which generation does each part belong to, how are they related and what happens in the capsule?',
  model: 'The **leafy shoot with rhizoids** is the **haploid gametophyte**. The **foot, seta and capsule** form the **diploid sporophyte**, which grows from the zygote, is **attached to the gametophyte** and **depends on it for nutrition**. In the capsule, cells undergo **meiosis** to make **haploid spores**, which germinate into a protonema.',
  sol: 'Gametophyte and sporophyte parts, dependence, meiosis in capsule.',
  scheme: [['Leafy shoot is gametophyte; foot, seta, capsule are sporophyte', 1], ['Sporophyte dependent on gametophyte', 1], ['Meiosis in capsule gives spores', 1]],
  d: 2, c: 'application', t: [1],
}));
add('gymrep-short', short({
  marks: 3,
  stem: 'Describe how the male and female gametophytes of a gymnosperm are formed and where they live.',
  model: 'In the **male cone**, microsporangia produce **microspores**, which develop into the very reduced male gametophyte, the **pollen grain**. In the **female cone**, a **megaspore mother cell** of the ovule divides by meiosis into **four megaspores**; one becomes the multicellular **female gametophyte** with **archegonia**. Neither is free-living: both stay **within the sporangia on the sporophyte**.',
  sol: 'Microspore to pollen grain; megaspore to female gametophyte; not free-living.',
  scheme: [['Microspore becomes pollen grain', 1], ['Megaspore mother cell, four megaspores, one gametophyte with archegonia', 1], ['Not free-living; retained on sporophyte', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('dfert-short', short({
  marks: 3,
  stem: 'What is double fertilisation? Name its two events and the product and ploidy of each.',
  model: 'In **double fertilisation** two fusions occur in one embryo sac. **Syngamy** is the fusion of a male gamete with the **egg**, giving the **diploid zygote**, which becomes the embryo. **Triple fusion** is the fusion of the other male gamete with the **two polar nuclei**, giving the **triploid primary endosperm nucleus**, which becomes the endosperm. It is unique to **flowering plants**.',
  sol: 'Syngamy and triple fusion with products and ploidy.',
  scheme: [['Definition: two fusions in one embryo sac', 1], ['Syngamy: zygote, diploid', 1], ['Triple fusion: PEN, triploid', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('gymangio-short', short({
  marks: 3,
  stem: 'State three differences between gymnosperms and angiosperms.',
  model: '**Gymnosperms** have **naked ovules and seeds**, with no flower or fruit, and no embryo sac. **Angiosperms** have **flowers**, with ovules enclosed in an **ovary** that becomes a **fruit** enclosing the seeds; they have a seven-celled **embryo sac**. In angiosperms **double fertilisation** forms a **triploid endosperm**, which gymnosperms lack.',
  sol: 'Naked versus enclosed seeds; flowers and fruits; double fertilisation.',
  scheme: [['Naked versus enclosed ovules and seeds', 1], ['Flower and fruit only in angiosperms', 1], ['Embryo sac and double fertilisation only in angiosperms', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('pteri3-short', short({
  marks: 3,
  stem: 'Describe the main plant body of a fern and the way its spores give rise to the next generation.',
  model: 'The main plant body is the **diploid sporophyte** with **true root, stem and leaves** and vascular tissue. **Sporangia** on the leaves make spores by **meiosis in spore mother cells**. A spore germinates into a small, free-living, haploid **prothallus** that bears **antheridia and archegonia**. After fertilisation in water the **zygote** grows into a new sporophyte.',
  sol: 'Sporophyte, spores by meiosis, prothallus, zygote.',
  scheme: [['Sporophyte with true organs and vascular tissue', 1], ['Spores by meiosis; prothallus', 1], ['Fertilisation and new sporophyte', 1]],
  d: 2, c: 'understanding', t: [1],
}));

add('algae-long', long({
  stem: 'Describe the three classes of algae, comparing their pigments, stored food, cell wall, habitat and examples, and mention two ways in which algae are useful to humans.',
  model: '**Chlorophyceae (green algae)** have chlorophyll a and b, store starch in pyrenoids, have cellulose walls and live in fresh, brackish and salt water; examples are *Chlamydomonas*, *Volvox*, *Spirogyra* and *Chara*.\n\n**Phaeophyceae (brown algae)** have chlorophyll a and c and fucoxanthin, store laminarin and mannitol, have cellulose walls with an algin coating and live mainly in brackish and salt water; examples are *Laminaria*, *Sargassum* and *Fucus*. Their body shows a holdfast, stipe and frond.\n\n**Rhodophyceae (red algae)** have chlorophyll a and d and r-phycoerythrin, store floridean starch, have walls of cellulose, pectin and polysulphate esters, are mostly marine, in warmer areas and at great depths, and have no flagella; examples are *Polysiphonia*, *Porphyra*, *Gracilaria* and *Gelidium*.\n\n**Uses.** Algae fix about half the carbon dioxide taken up in photosynthesis, adding oxygen to water; agar comes from *Gelidium* and *Gracilaria*, and *Chlorella* and *Spirulina* are protein-rich food supplements.',
  sol: 'Three classes compared; two uses.',
  scheme: [['Green algae', 1], ['Brown algae', 1], ['Red algae', 1], ['Habitat and examples', 1], ['Two uses', 1]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [1],
}));
add('bryo-long', long({
  stem: 'Describe the general features of bryophytes, compare liverworts with mosses, and explain their life cycle and their importance.',
  model: '**General features.** Bryophytes live in damp, shaded places and need water for fertilisation. The plant body is a haploid gametophyte, thallus-like or leafy, without true roots, stem or leaves, anchored by rhizoids. The antheridium makes biflagellate antherozoids and the flask-shaped archegonium one egg.\n\n**Liverworts and mosses.** A liverwort such as *Marchantia* has a flat, dorsiventral thallus and reproduces asexually by fragmentation and by gemmae in gemma cups. A moss such as *Funaria* has a creeping protonema that grows from a spore and an upright leafy stage with spirally arranged leaves and branched rhizoids; it multiplies by fragmentation and budding.\n\n**Life cycle.** Antherozoids swim to the egg; the zygote grows into a sporophyte of foot, seta and capsule, which depends on the gametophyte. Meiosis in the capsule makes haploid spores that grow into new gametophytes.\n\n**Importance.** *Sphagnum* gives peat and a packing material; mosses and lichens colonise bare rock, helping succession, and mats of moss reduce soil erosion.',
  sol: 'Features, liverwort versus moss, life cycle, importance.',
  scheme: [['General features', 1.5], ['Liverworts versus mosses', 1.5], ['Life cycle', 1], ['Importance', 1]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [1],
}));
add('pteri-long', long({
  stem: 'Explain why pteridophytes are called the first vascular land plants. Describe their sporophyte and gametophyte, the four classes, and the significance of heterospory.',
  model: '**First vascular plants.** Pteridophytes are the first terrestrial plants with xylem and phloem, which move water and food through a sporophyte with true roots, stem and leaves, small (microphylls, *Selaginella*) or large (macrophylls, ferns).\n\n**Sporophyte and gametophyte.** The sporophyte is dominant. Sporangia on sporophylls, sometimes in strobili as in *Selaginella* and *Equisetum*, make spores by meiosis of spore mother cells. A spore grows into a small, free-living, photosynthetic prothallus with antheridia and archegonia. It needs cool, damp, shady places and water for the antherozoids, which restricts spread. The zygote grows into the sporophyte.\n\n**Classes.** Psilopsida (*Psilotum*), Lycopsida (*Selaginella*, *Lycopodium*), Sphenopsida (*Equisetum*) and Pteropsida (*Dryopteris*, *Pteris*, *Adiantum*).\n\n**Heterospory.** *Selaginella* and *Salvinia* make megaspores and microspores; the female gametophyte is kept on the parent and the zygote begins to develop in it, a precursor of the seed habit.',
  sol: 'Vascular tissue; sporophyte and prothallus; classes; heterospory.',
  scheme: [['Vascular tissue and sporophyte body', 1], ['Sporangia, spores and prothallus; limits on spread', 1.5], ['Four classes with examples', 1], ['Heterospory and seed habit', 1.5]],
  wl: [80, 240],
  d: 3, c: 'application', t: [1],
}));
add('cycles-long', long({
  stem: 'Explain alternation of generations in plants. Distinguish the haplontic, diplontic and haplo-diplontic patterns, and place the bryophytes, pteridophytes and seed plants among them with reasons.',
  model: '**Alternation.** A haploid gametophyte makes gametes by mitosis; their fusion gives a diploid zygote that grows into a sporophyte; the sporophyte makes haploid spores by meiosis, and the spores grow into new gametophytes.\n\n**Haplontic.** The dominant, free-living body is the haploid gametophyte. The sporophyte is only the one-celled zygote, which divides by meiosis. Examples: *Volvox*, *Spirogyra*.\n\n**Diplontic.** The diploid sporophyte is dominant, independent and photosynthetic, and the gametophyte is a few cells. Examples: *Fucus*, gymnosperms and angiosperms.\n\n**Haplo-diplontic.** Both phases are multicellular and free-living, as in *Ectocarpus* and kelps.\n\n**Placing the groups.** Bryophytes and pteridophytes are haplo-diplontic, because both a gametophyte and a sporophyte are multicellular and the two alternate; in bryophytes the gametophyte dominates, and in pteridophytes the sporophyte does. Seed plants are diplontic: the sporophyte dominates and the gametophytes are tiny and kept on it.',
  sol: 'Alternation; three patterns; placing the groups.',
  scheme: [['Alternation of generations described', 1], ['Haplontic and diplontic', 2], ['Haplo-diplontic', 1], ['Placing bryophytes, pteridophytes, seed plants with reasons', 1]],
  wl: [80, 240],
  d: 3, c: 'analysis', t: [1, 2],
}));
add('gym-long', long({
  stem: 'Describe the general features of gymnosperms, with examples, and explain how the male and female gametophytes are formed and how fertilisation leads to a seed.',
  model: '**Features.** Gymnosperms bear ovules that are not enclosed by an ovary wall, so their seeds are naked. They are medium to tall trees and shrubs (*Sequoia* is among the tallest). Roots are tap roots, with mycorrhiza in *Pinus* and coralloid roots with cyanobacteria in *Cycas*. Stems are unbranched (*Cycas*) or branched (*Pinus*, *Cedrus*). Leaves are pinnate in *Cycas* and needle-like in conifers, with a thick cuticle and sunken stomata that cut water loss.\n\n**Gametophytes.** Gymnosperms are heterosporous. Microspores form in male cones and develop into pollen grains, a reduced male gametophyte. In ovules of female cones a megaspore mother cell divides by meiosis into four megaspores; one forms the female gametophyte with archegonia. Cones may be on the same tree (*Pinus*) or on different trees (*Cycas*). The gametophytes are not free-living.\n\n**Seed.** Pollen is carried by air to the ovule; the pollen tube delivers the male gametes to the archegonium. The zygote becomes an embryo and the ovule a naked seed.',
  sol: 'Features; gametophytes; fertilisation and seed.',
  scheme: [['Naked seeds and body features with examples', 2], ['Adaptations of leaves and roots', 1], ['Male and female gametophytes', 1], ['Fertilisation and naked seed', 1]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [2],
}));
add('angio-long', long({
  stem: 'Describe the angiosperms: the two classes with distinguishing features, the male and female organs of the flower, the structure of the embryo sac, and double fertilisation with its products.',
  model: `**Angiosperms** bear pollen grains and ovules in flowers and have seeds enclosed in fruits. **Dicots** have two cotyledons, reticulate venation and flowers of four or five parts; **monocots** have one cotyledon, parallel venation and flowers of three parts.\n\n**Flower.** The male organ is the stamen, with a filament and an anther holding pollen grains. The female organ is the pistil, with stigma, style and an ovary containing ovules.\n\n**Embryo sac.** The female gametophyte has ${SAC.cells} cells and ${SAC.nuclei} nuclei: an egg and two synergids at the micropylar end, three antipodals at the other end, and a central cell with two polar nuclei.\n\n**Double fertilisation.** The pollen tube releases two male gametes. One fuses with the egg (syngamy) to form the diploid zygote; the other fuses with the two polar nuclei (triple fusion) to form the triploid primary endosperm nucleus. The zygote becomes the embryo and the nucleus the endosperm; ovules become seeds and the ovary a fruit.`,
  sol: 'Classes; flower; embryo sac; double fertilisation.',
  scheme: [['Dicots and monocots', 1], ['Stamen and pistil', 1], ['Embryo sac', 1], ['Syngamy, triple fusion, products', 2]],
  wl: [80, 240],
  d: 3, c: 'application', t: [2],
}));
add('compare-long', long({
  stem: 'A student writes: "Vascular tissue and seeds appeared together in plants, so a plant with xylem and phloem always makes seeds, and any plant that lives on land no longer needs water to reproduce." Evaluate this statement using the five plant groups.',
  model: '**Vascular tissue without seeds.** The statement is wrong in its first part. Pteridophytes, such as ferns, *Selaginella* and *Equisetum*, are the first plants with xylem and phloem, but they have no seeds: they reproduce by spores. Seeds appear only in gymnosperms and angiosperms.\n\n**Land plants and water.** The second part is also wrong. Bryophytes live on land, and pteridophytes too, but both need water for the antherozoids to reach the egg, which is why they stay in damp places; a free-living prothallus also needs damp shade. Only seed plants do without free water, because the pollen tube carries the male gametes to the egg.\n\n**Evidence from the groups.** Algae and bryophytes lack vascular tissue; pteridophytes have it but not seeds; gymnosperms have naked seeds; angiosperms have seeds in fruits.\n\n**Judgement.** Vascular tissue came before seeds, and living on land does not by itself end the need for water. Only the seed habit does.',
  sol: 'Evaluates both claims using the five groups.',
  scheme: [['Pteridophytes: vascular but no seeds', 1.5], ['Bryophytes and pteridophytes need water; seed plants do not', 1.5], ['Evidence from the five groups', 1], ['Reasoned judgement', 1]],
  wl: [80, 240],
  d: 4, c: 'evaluation', t: [1, 2],
}), () => namesWhere((g) => g.vascular && !g.seed).join() === 'Pteridophytes' || 'groups');

// ---------------------------------------------------------------- t02 gymnosperms and angiosperms
add('gymno-mcq', mcq({
  stem: 'Which feature defines a gymnosperm?',
  right: 'Its ovules are not enclosed by an ovary wall, so its seeds are naked.',
  wrong: ['Its seeds are enclosed inside a fleshy or dry fruit wall.', 'Its ovules develop in an ovary at the base of a flower.', 'Its spores are all of one kind and grow into a prothallus.'],
  sol: 'Gymnos means naked: the ovules and seeds are not covered by an ovary or fruit wall — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('cycasroot-mcq', mcq({
  stem: 'Small, branched, coral-like roots growing near the soil surface of a Cycas contain a blue-green organism. What is their function?',
  right: 'Nitrogen fixation through an association with cyanobacteria',
  wrong: ['Absorption of water through an association with fungi as mycorrhiza', 'Storage of the starch made in the leaves for the winter', 'Production of the spores that grow into male gametophytes'],
  sol: 'Coralloid roots of Cycas are associated with nitrogen-fixing cyanobacteria; mycorrhiza (fungal) occurs in Pinus — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('needle-mcq', mcq({
  stem: 'A conifer on a windy mountain has needle-like leaves with a thick cuticle and sunken stomata. What is the main advantage?',
  right: 'Reduced loss of water',
  wrong: ['Faster uptake of water by the leaves', 'Greater surface area for sunlight', 'Faster release of pollen'],
  sol: 'The small needle shape, thick cuticle and sunken stomata all reduce water loss in extreme conditions — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('pollen-mcq', mcq({
  stem: 'The pollen grain of a pine is best described as',
  right: 'a highly reduced male gametophyte formed from a microspore',
  wrong: ['a male gamete formed directly by meiosis of a pollen sac wall', 'the whole sporophyte generation of the pine', 'a diploid cell that grows into a prothallus'],
  sol: 'Microspores develop into a male gametophyte confined to a few cells: the pollen grain — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('cones-mcq', mcq({
  stem: 'A forest officer finds a Cycas bearing only male cones and a neighbouring Cycas bearing only female cones, whereas a pine nearby bears both kinds. What does this show?',
  right: 'Cycas has male and female cones on different plants, but pine has them on the same tree',
  wrong: ['Pine has male and female cones on different trees, but Cycas has them on the same plant', 'Neither tree is a seed plant, since they have separate cones', 'Both trees are angiosperms, which bear their sex organs in cones'],
  sol: 'Male or female cones may be borne on the same tree (Pinus) or on different trees (Cycas) — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('monocot-mcq', mcq({
  stem: 'A seed is cut open and found to have only one cotyledon. Which leaf and flower features would you expect in the plant?',
  right: 'Parallel venation and flowers with three parts',
  wrong: ['Reticulate venation and flowers with four or five parts', 'Parallel venation and flowers with five parts', 'Reticulate venation and flowers with three parts'],
  sol: 'Monocots have one cotyledon, parallel venation and trimerous flowers — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('anther-mcq', mcq({
  stem: 'In the drawing of a flower, in which marked part are pollen grains formed?',
  right: 'E',
  wrong: ['A', 'C', 'F'],
  sol: 'The anther (E) holds pollen grains; A is the stigma, C the ovary and F the filament — option (@K).',
  assets: [L.flower],
  d: 2, c: 'application', t: [2],
}));
add('ovary-mcq', mcq({
  stem: 'In the drawing of a flower, which marked part will become the fruit after fertilisation, and which part the seed?',
  right: 'C becomes the fruit and D becomes the seed',
  wrong: ['A becomes the fruit and E becomes the seed', 'D becomes the fruit and C becomes the seed', 'B becomes the fruit and F becomes the seed'],
  sol: 'The ovary (C) becomes the fruit and the ovule (D) inside it becomes the seed — option (@K).',
  assets: [L.flower],
  d: 3, c: 'application', t: [2],
}));
add('polar-mcq', mcq({
  stem: 'In the drawing of an embryo sac, one male gamete will fuse with the nuclei in which marked part during triple fusion?',
  right: 'C',
  wrong: ['A', 'B', 'D'],
  sol: 'Triple fusion joins a male gamete with the two polar nuclei of the central cell (C); B is the egg and A the synergids — option (@K).',
  assets: [L.sac],
  d: 2, c: 'application', t: [2],
}));
add('double-mcq', mcq({
  stem: 'How many haploid nuclei fuse together in triple fusion, and what do they form?',
  right: 'Three, forming the primary endosperm nucleus',
  wrong: ['Two, forming the zygote', 'Three, forming the zygote', 'Two, forming the primary endosperm nucleus'],
  sol: 'One male gamete and two polar nuclei, three haploid nuclei in all, form the primary endosperm nucleus — option (@K).',
  d: 2, c: 'understanding', t: [2],
}), () => N.triple === 3 || 'triple');
add('endo-mcq', mcq({
  stem: `A flowering plant has 20 chromosomes in each leaf cell. How many chromosomes are present in a cell of the endosperm of its seed?`,
  right: `${N.endo10}`,
  wrong: ['10', '20', '40'],
  sol: r`The leaf cell is diploid, so $n = 20 \div 2 = 10$. The endosperm is triploid: $3 \times 10 = ${N.endo10}$ — option (@K).`,
  d: 3, c: 'application', t: [2],
}), () => N.endo10 === 30 || 'value');
add('antipodal-mcq', mcq({
  stem: 'Which statement about a mature angiosperm embryo sac is correct?',
  right: `It has ${SAC.cells} cells and ${SAC.nuclei} nuclei, including a central cell with two polar nuclei.`,
  wrong: ['It has 8 cells and 8 nuclei, all of them identical in structure.', 'It has 7 cells and 7 nuclei, with one polar nucleus.', 'It has 3 cells and 3 nuclei, formed from a pollen grain.'],
  sol: 'The embryo sac is a 7-celled, 8-nucleate female gametophyte; the central cell carries two polar nuclei — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('wolffia-tf', tf({
  stem: 'Wolffia, among the smallest flowering plants, and Eucalyptus trees taller than one hundred metres both belong to the angiosperms.',
  key: 't',
  sol: 'True. Angiosperms range from the minute Wolffia to very tall Eucalyptus trees.',
  d: 1, c: 'recall', t: [2],
}));
add('gymfruit-tf', tf({
  stem: 'A pine tree produces seeds that are enclosed inside a fruit.',
  key: 'f',
  sol: 'False. Pine is a gymnosperm; its seeds are naked and no fruit is formed.',
  d: 1, c: 'understanding', t: [2],
}));
add('sporophyll-fill', fill({
  stem: 'In gymnosperms the sporangia are borne on sporophylls arranged spirally along an axis to form cones, also called ______.',
  acc: [['strobili', 'strobilus']],
  sol: 'Strobili.',
  d: 1, c: 'recall', t: [2],
}));
add('syngamy-fill', fill({
  stem: 'The fusion of a male gamete with the egg cell in an embryo sac is called ______.',
  acc: [['syngamy']],
  sol: 'Syngamy.',
  d: 1, c: 'recall', t: [2],
}));
add('endo-ar', ar({
  a: 'The endosperm of an angiosperm seed is triploid.',
  r: 'The endosperm forms by the fusion of one male gamete with the egg cell.',
  key: 'c',
  sol: 'A is true; R is false, because the endosperm forms by triple fusion of a male gamete with the two polar nuclei, while the egg fuses to make the zygote — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('gym-ar', ar({
  a: 'Pinus and Cycas bear their seeds enclosed within fruits.',
  r: 'The ovules of gymnosperms are not enclosed by an ovary wall.',
  key: 'd',
  sol: 'A is false: gymnosperm seeds are naked and no fruit forms. R is true — option (d).',
  d: 2, c: 'understanding', t: [2],
}));
add('water-ar', ar({
  a: 'Gymnosperms do not need free water for fertilisation.',
  r: 'In gymnosperms a pollen tube carries the male gametes to the archegonia.',
  key: 'a',
  sol: 'Both are true; because the pollen tube delivers the male gametes, no swimming through water is needed — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('pen-num', num({
  stem: `The egg cell of an angiosperm has 9 chromosomes. How many chromosomes does its primary endosperm nucleus have after triple fusion?`,
  value: N.pen9,
  sol: r`Triple fusion joins three haploid nuclei: $3 \times 9 = ${N.pen9}$.`,
  scheme: [[`${N.pen9}`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === ploidy('PEN', 9) || 'value');
add('pmc-num', num({
  stem: `A stamen's anther produces 100 pollen grains by meiosis of pollen mother cells. How many pollen mother cells were needed?`,
  value: N.pmc,
  sol: r`Each pollen mother cell gives 4 pollen grains: $100 \div 4 = ${N.pmc}$.`,
  scheme: [[`${N.pmc}`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === meioses(100) || 'value');
add('male-num', num({
  stem: `An ovary has ${N.ovules} ovules, and every ovule is fertilised by its own pollen tube. Each pollen tube carries two male gametes. How many male gametes are delivered in all?`,
  value: N.malesNeeded,
  sol: r`${N.tubes} tubes $\times 2 = ${N.malesNeeded}$ male gametes.`,
  scheme: [[`${N.malesNeeded}`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === male(30) || 'value');

// ---------------------------------------------------------------- cases
{
  const rows = SAMPLES.map(([id, p, f]) => `| ${id} | ${p} | ${f} |`).join('\n');
  add('algae-case', mk.case({
    passage: `A coastal self-help group tests five samples of seaweed before deciding which to dry for sale. The lab sheet reads:\n\n| Sample | Main pigment | Stored food |\n|---|---|---|\n${rows}`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'To which class does sample S1 belong?',
        right: 'Phaeophyceae, the brown algae',
        wrong: ['Chlorophyceae, the green algae', 'Rhodophyceae, the red algae', 'It cannot be placed in any class of algae'],
        sol: 'Fucoxanthin with laminarin marks the brown algae — option (@K).',
        d: 1, c: 'application', t: [1],
      })),
      part('b', num({
        stem: 'How many of the five samples are red algae?',
        value: N.redSamples,
        sol: `r-Phycoerythrin with floridean starch occurs in S2 and S5, so the answer is $${N.redSamples}$.`,
        scheme: [[`${N.redSamples}`, 1]],
        d: 2, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'The group wants to prepare agar. Which class of alga should it choose, and name one genus from that class?',
        model: 'It should choose a **red alga** (Rhodophyceae), because **agar is obtained from red algae**, which carry the red pigment r-phycoerythrin and live mostly in the sea. Example genera are **Gelidium** and **Gracilaria**; a brown alga would give algin instead.',
        sol: 'Red algae; Gelidium or Gracilaria.',
        scheme: [['Red algae', 1], ['Gelidium or Gracilaria', 1]],
        d: 2, c: 'application', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'Sample S3 has chlorophyll b and stores starch. Name its class and say where the starch is stored in its cells.',
          model: 'It belongs to the **green algae** (Chlorophyceae), because chlorophyll b occurs only in this class, which also has cellulose walls. Its food reserve, **starch**, is stored in the cells in small bodies called **pyrenoids**.',
          sol: 'Chlorophyceae; pyrenoids.',
          scheme: [['Green algae with reason', 1], ['Pyrenoids', 1]],
          d: 2, c: 'application', t: [1],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 2 || 'value');
}
{
  add('moss-case', mk.case({
    passage: `After the rains, a school's shaded wall is covered with a green carpet of moss. Tiny brown capsules on thin stalks rise from the carpet. Under the hand lens a student sees that one capsule contains ${36} spore mother cells before meiosis. Nearby, on the damp floor of the same courtyard, a small heart-shaped green plant is growing beside a fern.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'The green carpet of the moss is made of',
        right: 'haploid gametophytes',
        wrong: ['diploid sporophytes', 'haploid sporophytes', 'diploid gametophytes'],
        sol: 'The leafy green moss plant is the haploid gametophyte; the capsule and stalk are the sporophyte — option (@K).',
        d: 1, c: 'understanding', t: [1],
      })),
      part('b', num({
        stem: 'How many spores will that capsule produce from its 36 spore mother cells?',
        value: N.moss36,
        sol: r`$36 \times 4 = ${N.moss36}$ spores.`,
        scheme: [[`${N.moss36}`, 1]],
        d: 2, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'The small heart-shaped plant beside the fern is growing only in a damp, shaded corner. Identify it and explain why it needs such a place.',
        model: 'It is a **prothallus**, the small, free-living **gametophyte of the fern**. It needs a **cool, damp, shady** place and **water for the antherozoids to swim** to the egg in the archegonium.',
        sol: 'Prothallus; damp shade and water needed.',
        scheme: [['Prothallus identified', 1], ['Water and shade needed for fertilisation', 1]],
        d: 2, c: 'application', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'The fern grows taller than the moss on the same wall. Suggest, from the structure of each, why it can.',
          model: 'The **fern sporophyte** has **xylem and phloem** and true roots, stem and leaves, which **carry water and food** and support a larger body. The moss has **no vascular tissue** and is held by **rhizoids**, so it stays small and close to the surface.',
          sol: 'Vascular tissue in the fern; none in the moss.',
          scheme: [['Fern has xylem and phloem', 1], ['Moss has none, only rhizoids; stays small', 1]],
          d: 3, c: 'application', t: [1],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 144 || 'value');
}
{
  add('cycas-case', mk.case({
    passage: `A botanical garden has a pair of Cycas plants. Plant X carries a tall central cone that sheds yellow dust in summer. Plant Y carries a loose cluster of leaf-like structures bearing ovules. The roots of both plants include small, branched, coral-like outgrowths near the soil surface. A pollen grain of Cycas in the garden's research file is recorded as having ${N.cycasN} chromosomes.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'The coral-like roots are associated with',
        right: 'nitrogen-fixing cyanobacteria',
        wrong: ['fungal hyphae forming mycorrhiza', 'nitrogen-fixing fungi only', 'photosynthetic algae that make agar'],
        sol: 'Coralloid roots of Cycas host nitrogen-fixing cyanobacteria — option (@K).',
        d: 1, c: 'recall', t: [2],
      })),
      part('b', num({
        stem: 'How many chromosomes would a leaf cell of this Cycas contain?',
        value: N.cycasLeaf,
        sol: r`The pollen grain is haploid, $n = ${N.cycasN}$, so a leaf cell of the sporophyte is $2n = ${N.cycasLeaf}$.`,
        scheme: [[`${N.cycasLeaf}`, 1]],
        d: 2, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain why a Cycas will not produce seeds if only plant X is grown in the garden.',
        model: 'Plant X bears only **male cones**, which make **pollen grains**, while **ovules are borne only on female plants** such as Y. In Cycas the male and female cones are on **different plants**, so without a female plant there are **no ovules to fertilise** and no seeds.',
        sol: 'Separate male and female plants; no ovules on X.',
        scheme: [['Male cones on X only; ovules on female plants', 1], ['Different plants, so no seeds', 1]],
        d: 2, c: 'application', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'Why are the seeds of Cycas called naked seeds?',
          model: 'In Cycas the **ovules are not enclosed by an ovary wall**, so after fertilisation the **seeds are uncovered**, with no fruit around them. This is the meaning of gymnosperm: naked seed, unlike angiosperms, whose seeds are enclosed in fruits.',
          sol: 'Ovules not enclosed by an ovary.',
          scheme: [['Ovules not enclosed by an ovary wall', 1], ['Seeds uncovered; no fruit', 1]],
          d: 1, c: 'understanding', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 22 || 'value');
}
{
  add('dfert-case', mk.case({
    passage: `A gardener studies a mango-like flowering tree whose egg cell has ${N.mangoN} chromosomes. Pollen from one flower lands on the stigma of another and a pollen tube grows down the style into an ovule, where it releases two male gametes into the embryo sac. Weeks later the ovary has swollen into a fruit.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which part of the flower has swollen to become the fruit?',
        right: 'The ovary',
        wrong: ['The stigma', 'The anther', 'The filament'],
        sol: 'After fertilisation the ovary becomes the fruit and the ovules become seeds — option (@K).',
        d: 1, c: 'understanding', t: [2],
      })),
      part('b', num({
        stem: 'How many chromosomes does a cell of the endosperm of this tree contain?',
        value: N.mangoPen,
        sol: r`The egg cell is haploid, $n = ${N.mangoN}$. The primary endosperm nucleus is triploid: $3 \times ${N.mangoN} = ${N.mangoPen}$.`,
        scheme: [[`${N.mangoPen}`, 1]],
        d: 2, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain why two male gametes are needed in the embryo sac of this tree.',
        model: 'One male gamete **fuses with the egg** (syngamy) to form the **zygote**, and the second **fuses with the two polar nuclei** (triple fusion) to form the **primary endosperm nucleus**. Both fusions need a male gamete, so **two male gametes** are needed.',
        sol: 'One for syngamy, one for triple fusion.',
        scheme: [['One male gamete fuses with the egg: zygote', 1], ['Other fuses with polar nuclei: PEN', 1]],
        d: 2, c: 'understanding', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'State the chromosome number of the zygote of this tree and say what it develops into.',
          model: `The zygote forms by syngamy, the fusion of two haploid nuclei (the egg and one male gamete), so it has **${N.mangoZygote} chromosomes** and is diploid. It then divides repeatedly and develops into the **embryo** of the seed.`,
          sol: 'Zygote 28, embryo.',
          scheme: [[`${N.mangoZygote} chromosomes`, 1], ['Develops into the embryo', 1]],
          d: 2, c: 'application', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 42 || 'value');
}
