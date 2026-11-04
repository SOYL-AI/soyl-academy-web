// ISC 11 Biology ch04 Plant Kingdom — Part 1 (t01 algae, t02 bryophytes), Part 2 (t03 pteridophytes, t04 gymnosperms).
import { sl, deck, table, flow, svgV } from '../../isc-11-biology-ch01/src/lib.mjs';
import { FUNARIA, FERN, PINUS, ALGA, MOSS_NAMED } from './svgs.mjs';
import { ALGAE, SHORE, SHORE_TOTAL, SHORE_BROWN_PCT, MOSS, MOSS_SPORES, MOSS_SPOROPHYTE_CHR, MOSS_SPORE_CHR, FERN as FERNN, FERN_SPORES_PER_SPORANGIUM, FERN_SPORES_PER_SORUS, FERN_SPORES_PER_FROND, FERN_2N, FERN_N, PINUS as PIN, PINUS_OVULES, PINUS_MEGASPORES, PINUS_FUNCTIONAL, PINUS_POLLEN } from './calc.mjs';

export const V = {
  funaria: svgV(FUNARIA, 'Graphic outline of the life cycle of Funaria with ploidy at each stage'),
  fern: svgV(FERN, 'Graphic outline of the life cycle of a fern with ploidy at each stage'),
  pinus: svgV(PINUS, 'Graphic outline of the life cycle of Pinus with ploidy at each stage'),
  alga: svgV(ALGA, 'A brown alga with holdfast, stipe, midrib, air bladders and frond'),
  moss: svgV(MOSS_NAMED, 'A moss plant with the sporophyte attached to the leafy gametophyte'),
};

const A = ALGAE;
const cls = (k) => [A[k].colour, A[k].pigments.join(', '), A[k].food, A[k].wall, A[k].flagella, A[k].habitat, A[k].examples.slice(0, 3).join(', ')];

export const deck1 = deck({
  part: 1,
  title: 'Plant Kingdom — Part 1: Algae and bryophytes',
  goals: [
    'Compare green, brown and red algae and list the uses of algae',
    'Describe liverworts and mosses and draw the life cycle of Funaria',
    'Explain alternation of generations with the dominant gametophyte of bryophytes',
  ],
  slides: [
    sl('title', 'Plant Kingdom', {
      b: 'Part 1 — from simple algae to the first land plants.',
      v: flow('LR', [['a', 'Algae'], ['b', 'Bryophytes'], ['p', 'Pteridophytes'], ['g', 'Gymnosperms'], ['n', 'Angiosperms']], [['a', 'b'], ['b', 'p'], ['p', 'g'], ['g', 'n']], 'Flow from algae through bryophytes, pteridophytes and gymnosperms to angiosperms, in order of increasing body complexity'),
      n: 'Plants range from microscopic algae to giant trees. Botanists group them by body organisation, by whether vascular tissue is present, and by whether seeds are formed. In this part we study the algae and the bryophytes, the groups without vascular tissue.',
    }),
    sl('concept', 'What are algae?', {
      b: 'Algae are simple, **chlorophyll-bearing, thalloid** autotrophs. They have no true root, stem or leaf and no vascular tissue.',
      v: table(['Feature', 'In algae'], [['Body', 'Thallus: unicellular, colonial, filamentous or leaf-like'], ['Nutrition', 'Autotrophic by photosynthesis'], ['Habitat', 'Fresh water, sea water, moist soil and rocks'], ['Reproduction', 'Vegetative, asexual and sexual'], ['Reproductive organs', 'Mostly single-celled, without a protective jacket']], 'Table of general features of algae'),
      n: 'An alga has a thallus, a body that is not differentiated into root, stem and leaf. It may be a single cell, a colony or a long filament. Most algae live in water, and all of them make food by photosynthesis, so they are producers in aquatic food chains.',
    }),
    sl('diagram', 'A brown alga: body plan', {
      b: 'Large brown algae show the most elaborate thallus: a **holdfast** that anchors the plant, a **stipe**, and a leaf-like **frond** that may carry **air bladders** to keep it afloat.',
      v: V.alga,
      n: 'The holdfast fixes the alga to a rock but does not absorb water the way a root does. The stipe lifts the frond towards the light. Each part of the body can absorb minerals directly from the sea water, and the air bladders help the frond to float.',
    }),
    sl('concept', 'Green, brown and red algae compared', {
      b: 'The three classes differ in pigments, stored food, cell wall, flagella and habitat.',
      v: table(['Feature', 'Chlorophyceae', 'Phaeophyceae', 'Rhodophyceae'], [
        ['Colour', ...['Chlorophyceae', 'Phaeophyceae', 'Rhodophyceae'].map((k) => cls(k)[0])],
        ['Pigments', ...['Chlorophyceae', 'Phaeophyceae', 'Rhodophyceae'].map((k) => cls(k)[1])],
        ['Stored food', ...['Chlorophyceae', 'Phaeophyceae', 'Rhodophyceae'].map((k) => cls(k)[2])],
        ['Cell wall', ...['Chlorophyceae', 'Phaeophyceae', 'Rhodophyceae'].map((k) => cls(k)[3])],
        ['Flagella', ...['Chlorophyceae', 'Phaeophyceae', 'Rhodophyceae'].map((k) => cls(k)[4])],
        ['Habitat', ...['Chlorophyceae', 'Phaeophyceae', 'Rhodophyceae'].map((k) => cls(k)[5])],
        ['Examples', ...['Chlorophyceae', 'Phaeophyceae', 'Rhodophyceae'].map((k) => cls(k)[6])],
      ], 'Table comparing the pigments, stored food, cell wall, flagella, habitat and examples of green, brown and red algae'),
      n: 'Green algae have the same chlorophylls as land plants and store starch. Brown algae carry a brown pigment called fucoxanthin and store mannitol and laminarin, and their walls are coated with a gel called algin. Red algae have the red pigment phycoerythrin, store floridean starch and never form flagellate cells.',
    }),
    sl('concept', 'How algae reproduce', {
      b: 'Reproduction is **vegetative** (fragmentation), **asexual** (zoospores; non-motile spores in red algae) and **sexual** (isogamous, anisogamous or oogamous).',
      v: table(['Method', 'What happens', 'Example'], [['Vegetative', 'A filament breaks into fragments, each growing into a new thallus', 'Spirogyra'], ['Asexual', 'Flagellated zoospores formed in sporangia; red algae form non-motile spores', 'Chlamydomonas'], ['Sexual: isogamous', 'Fusion of similar gametes', 'Ulothrix'], ['Sexual: anisogamous', 'Fusion of dissimilar gametes', 'Eudorina'], ['Sexual: oogamous', 'Large non-motile egg fuses with a small motile male gamete', 'Volvox, Fucus']], 'Table of vegetative, asexual and sexual reproduction in algae with examples'),
      n: 'Algae reproduce in three ways. A filament may simply fragment. Many form motile zoospores. In sexual reproduction the gametes may look alike, or differ in size, or be an egg and a small swimming male cell. Red algae have no motile cells, so their spores and male gametes are carried by the water.',
    }),
    sl('example', 'Worked example 1: name the class', {
      b: `A rocky-shore collection has ${SHORE_TOTAL} algae: ${SHORE.green} green, ${SHORE.brown} brown and ${SHORE.red} red. Find what share is brown and how many have flagellate cells.`,
      ul: [
        `Brown share = ${SHORE.brown} out of ${SHORE_TOTAL}, which is **${SHORE_BROWN_PCT} percent**.`,
        `Red algae never form flagellate cells, so only the green and brown algae can: ${SHORE.green} + ${SHORE.brown} = **${SHORE.green + SHORE.brown}**.`,
        'A specimen with phycoerythrin and floridean starch must be a red alga; one with fucoxanthin and mannitol, a brown alga.',
      ],
      v: table(['Clue', 'Class'], [['Chlorophyll b, starch in pyrenoids', 'Chlorophyceae'], ['Fucoxanthin, mannitol, algin', 'Phaeophyceae'], ['Phycoerythrin, floridean starch, no flagella', 'Rhodophyceae']], 'Table matching diagnostic clues to the class of alga'),
      n: 'First turn the counts into a share: twenty-seven brown algae out of sixty is forty-five percent. Next use the rule that red algae never have flagella, so only the green and the brown ones can; that gives forty-five. Pigments and stored food are the surest clues to the class.',
    }),
    sl('check', 'Quick check: pigments', {
      b: 'Which class of algae is identified by phycoerythrin and floridean starch?',
      n: 'Quick check. The red pigment gives the name of the class.',
      chk: 'ck-pigment-mcq',
    }),
    sl('concept', 'Economic importance of algae', {
      b: 'Algae fix about **half of the carbon dioxide** used on Earth, and many are useful to people.',
      v: table(['Use', 'Alga', 'Product or role'], [['Food', 'Porphyra, Laminaria, Sargassum', 'Eaten as seaweed'], ['Gel for laboratories and food', 'Gelidium, Gracilaria', 'Agar'], ['Thickener', 'Brown algae', 'Algin; red algae give carrageen'], ['Single-cell protein', 'Chlorella, Spirulina', 'Protein-rich food supplement'], ['Primary production', 'Phytoplankton', 'Base of aquatic food chains; releases oxygen']], 'Table of economic uses of algae'),
      n: 'Algae supply a large share of the oxygen we breathe and form the base of food chains in the sea. People eat some seaweeds, extract agar from red algae and algin from brown algae, and use Chlorella as a protein-rich supplement.',
    }),
    sl('concept', 'Bryophytes: liverworts and mosses', {
      b: 'Bryophytes are **amphibians of the plant kingdom**: they live on land but need water for fertilisation. They have **rhizoids**, no true roots and no vascular tissue.',
      v: table(['Feature', 'Liverworts', 'Mosses'], [['Gametophyte', 'Flat, ribbon-like thallus, dorsiventral', 'Two stages: creeping protonema, then an upright leafy stem'], ['Asexual reproduction', 'Gemmae in gemma cups; fragmentation', 'Fragmentation and budding of the secondary protonema'], ['Examples', 'Marchantia, Riccia', 'Funaria, Polytrichum, Sphagnum']], 'Table comparing liverworts and mosses'),
      n: 'Bryophytes are small plants of damp places. They lack xylem and phloem, so they cannot grow tall. Liverworts have a flat thallus that often forms little gemma cups. Mosses have a protonema stage followed by an upright leafy shoot.',
    }),
    sl('diagram', 'A moss plant', {
      b: 'The green, leafy **gametophyte** is the dominant, haploid plant. The **sporophyte** — foot, seta and capsule — stays attached to it and gets water and food from it.',
      v: V.moss,
      n: 'The leafy shoot is the gametophyte. The sporophyte grows out of its tip. Its foot is sunk into the gametophyte, the long seta holds up the capsule, and the capsule is where spores are made. A little cap, the calyptra, covers the young capsule.',
    }),
    sl('diagram', 'Life cycle of Funaria', {
      b: 'A haploid spore gives a **protonema**, then the leafy gametophyte with **antheridia** and **archegonia**. After fertilisation the **diploid sporophyte** forms spores by **meiosis**.',
      v: V.funaria,
      n: 'Start at the spore. It germinates into a creeping protonema, which grows into the leafy plant. Antherozoids swim in a film of water to the egg in the archegonium. The zygote grows into a sporophyte, and meiosis in its capsule gives new haploid spores.',
    }),
    sl('example', 'Worked example 2: spores and chromosomes in a moss', {
      b: `An imagined moss has ${MOSS.n} chromosomes in each gametophyte cell, and each capsule holds ${MOSS.smcPerCapsule} spore mother cells.`,
      ul: [
        `Sporophyte cells are diploid: 2 × ${MOSS.n} = **${MOSS_SPOROPHYTE_CHR}** chromosomes.`,
        `Each spore mother cell gives four spores by meiosis: ${MOSS.smcPerCapsule} × 4 = **${MOSS_SPORES}** spores.`,
        `Each spore is haploid, so it carries **${MOSS_SPORE_CHR}** chromosomes.`,
      ],
      v: table(['Stage', 'Ploidy', 'Chromosomes'], [['Spore, protonema, leafy plant, gametes', 'Haploid', String(MOSS_SPORE_CHR)], ['Zygote, sporophyte, spore mother cell', 'Diploid', String(MOSS_SPOROPHYTE_CHR)]], 'Table of ploidy and chromosome numbers at each moss stage'),
      n: 'The sporophyte is diploid, so double the gametophyte number. Meiosis turns each spore mother cell into four haploid spores, so two hundred and fifty mother cells give one thousand spores, each with the haploid number of chromosomes.',
    }),
    sl('check', 'Quick check: spores', {
      b: 'How many spores would a capsule with 125 spore mother cells release?',
      n: 'Quick check. Each mother cell divides by meiosis.',
      chk: 'ck-spores-num',
    }),
    sl('check', 'Quick check: moss stages', {
      b: 'Which stage of the moss life cycle grows directly from a germinating spore?',
      n: 'Quick check. It is a creeping, thread-like stage.',
      chk: 'ck-protonema-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Algae: chlorophyll-bearing thalloid autotrophs; green (starch), brown (mannitol, algin) and red (floridean starch, no flagella).',
        'Uses: food, agar, algin, carrageen, Chlorella as single-cell protein, oxygen and food-chain base.',
        'Bryophytes: liverworts and mosses; rhizoids; need water for fertilisation; dominant gametophyte.',
        'Funaria: spore, protonema, leafy gametophyte, gametes, zygote, sporophyte (foot, seta, capsule), meiosis, spores.',
        'Sporophyte of a bryophyte is dependent on the gametophyte.',
      ],
      v: table(['Group', 'Dominant generation', 'Sporophyte'], [['Algae', 'Varies', 'Often small or absent'], ['Bryophytes', 'Gametophyte', 'Dependent on gametophyte']], 'Summary table of the dominant generation in algae and bryophytes'),
      n: 'To recap: algae are simple chlorophyll-bearing plants grouped by pigments into green, brown and red, with many economic uses. Bryophytes are small land plants whose haploid gametophyte dominates and whose sporophyte depends on it.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'In an algae table, always give **pigments, stored food, cell wall and flagella** for each class.',
        'Draw the life cycle as a graphic outline and **mark n and 2n** at every stage.',
        'Write that the moss sporophyte is **attached to and dependent on** the gametophyte.',
        'Name the product with the organism: **agar from Gelidium**, **algin from brown algae**.',
      ],
      n: 'Exam tips. Compare the classes on pigments, stored food, cell wall and flagella. Mark the chromosome number at every stage of a life cycle. State clearly that the moss sporophyte depends on the gametophyte. And pair every product with its alga.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Plant Kingdom — Part 2: Pteridophytes and gymnosperms',
  goals: [
    'Name the four classes of pteridophytes and distinguish homospory from heterospory',
    'Draw the life cycles of a fern and of Pinus',
    'Compare gymnosperms with pteridophytes and state their economic importance',
  ],
  slides: [
    sl('title', 'Vascular plants without flowers', {
      b: 'Part 2 — ferns and their allies, and the naked-seeded plants.',
      v: flow('LR', [['b', 'Bryophyte: gametophyte dominant'], ['p', 'Pteridophyte: sporophyte dominant, spores'], ['g', 'Gymnosperm: sporophyte dominant, naked seeds']], [['b', 'p'], ['p', 'g']], 'Flow from bryophytes to pteridophytes to gymnosperms, showing sporophyte dominance and seed formation'),
      n: 'Pteridophytes are the first plants with xylem and phloem, so they can grow tall. Gymnosperms go one step further and keep their spores inside ovules, which become naked seeds. In both groups the sporophyte is the dominant plant.',
    }),
    sl('concept', 'Pteridophytes: four classes', {
      b: 'Pteridophytes have **true roots, stems and leaves** with **xylem and phloem**, but **no seeds**. Their sporophyte is dominant.',
      v: table(['Class', 'Examples', 'Note'], [['Psilopsida', 'Psilotum', 'Simplest living vascular plants, no true roots'], ['Lycopsida', 'Lycopodium, Selaginella', 'Small leaves; some are heterosporous'], ['Sphenopsida', 'Equisetum', 'Jointed stem with whorled scale leaves'], ['Pteropsida', 'Dryopteris, Pteris, Adiantum, Marsilea, Salvinia', 'Large leaves (fronds); the ferns']], 'Table of the four classes of pteridophytes with examples'),
      n: 'The four classes are Psilopsida, Lycopsida, Sphenopsida and Pteropsida. Psilotum is the simplest. Selaginella and Lycopodium belong to the club mosses, Equisetum is the horsetail, and the ferns such as Dryopteris are in Pteropsida.',
    }),
    sl('diagram', 'Life cycle of a fern', {
      b: 'The leafy **sporophyte** bears **sporangia in sori**. Spores give a small, heart-shaped, free-living **prothallus** bearing antheridia and archegonia; the zygote grows into a new sporophyte.',
      v: V.fern,
      n: 'The fern plant you see is the diploid sporophyte. Spore mother cells in sporangia divide by meiosis. The spore grows into a tiny prothallus, the haploid gametophyte. Antherozoids need water to reach the egg. The zygote then develops into a new fern plant.',
    }),
    sl('concept', 'Sporophyte and gametophyte of a fern', {
      b: 'Both generations are **independent and photosynthetic** in a fern, but the sporophyte is much larger.',
      v: table(['Feature', 'Sporophyte', 'Gametophyte (prothallus)'], [['Ploidy', 'Diploid', 'Haploid'], ['Size', 'Large, with rhizome and fronds', 'Small, a few millimetres across'], ['Reproductive structures', 'Sporangia in sori', 'Antheridia and archegonia'], ['Product', 'Spores by meiosis', 'Gametes by mitosis'], ['Life', 'Dominant', 'Independent, short-lived']], 'Table comparing the sporophyte and the prothallus of a fern'),
      n: 'The fern sporophyte makes spores by meiosis. The prothallus makes gametes by mitosis, because it is already haploid. Unlike a moss, the fern sporophyte is independent of the gametophyte once it has established itself.',
    }),
    sl('concept', 'Homospory and heterospory', {
      b: 'Most pteridophytes are **homosporous**; a few — **Selaginella, Salvinia, Marsilea** — are **heterosporous**.',
      v: table(['Feature', 'Homosporous', 'Heterosporous'], [['Spores', 'One kind, all alike', 'Microspores and megaspores'], ['Gametophyte', 'Bisexual, free-living', 'Male from microspore, female from megaspore'], ['Examples', 'Dryopteris, Lycopodium, Equisetum', 'Selaginella, Salvinia, Marsilea'], ['Importance', 'Primitive condition', 'Forerunner of the seed habit']], 'Table comparing homosporous and heterosporous pteridophytes'),
      n: 'In homosporous plants all spores look alike and give one kind of gametophyte. Heterosporous plants make small microspores and large megaspores. In Selaginella the female gametophyte stays inside the megaspore wall, which is a step towards the seed.',
    }),
    sl('example', 'Worked example 1: counting fern spores', {
      b: `A fern sporangium has ${FERNN.mothersPerSporangium} spore mother cells. A sorus has ${FERNN.sporangiaPerSorus} sporangia and a frond has ${FERNN.sorusPerFrond} sori. The sporophyte has ${FERN_2N} chromosomes.`,
      ul: [
        `Spores per sporangium: ${FERNN.mothersPerSporangium} × 4 = **${FERN_SPORES_PER_SPORANGIUM}**.`,
        `Spores per sorus: ${FERN_SPORES_PER_SPORANGIUM} × ${FERNN.sporangiaPerSorus} = **${FERN_SPORES_PER_SORUS}**.`,
        `Spores per frond: ${FERN_SPORES_PER_SORUS} × ${FERNN.sorusPerFrond} = **${FERN_SPORES_PER_FROND}**.`,
        `Each spore, and the prothallus, has ${FERN_2N} ÷ 2 = **${FERN_N}** chromosomes.`,
      ],
      v: table(['Level', 'Count'], [['Spores per sporangium', String(FERN_SPORES_PER_SPORANGIUM)], ['Spores per sorus', String(FERN_SPORES_PER_SORUS)], ['Spores per frond', String(FERN_SPORES_PER_FROND)], ['Chromosomes in a prothallus cell', String(FERN_N)]], 'Worked table of fern spore numbers and chromosome count'),
      n: 'Sixteen spore mother cells make sixty-four spores. Multiply by the number of sporangia in a sorus, then by the number of sori on a frond. The huge total shows how many spores one fern can release. Each spore is haploid, so it has half the number of chromosomes of the sporophyte.',
    }),
    sl('check', 'Quick check: spores per sorus', {
      b: 'How many spores does one sorus of 40 sporangia produce, if each sporangium has 16 spore mother cells?',
      n: 'Quick check. First find the spores in one sporangium.',
      chk: 'ck-sorus-num',
    }),
    sl('check', 'Quick check: heterospory', {
      b: 'Which pteridophyte is heterosporous?',
      n: 'Quick check. Look for two kinds of spores.',
      chk: 'ck-hetero-mcq',
    }),
    sl('concept', 'Economic importance of pteridophytes', {
      b: 'Pteridophytes are used as ornamentals, as biofertiliser and as a source of coal in the geological past.',
      v: table(['Use', 'Example', 'Detail'], [['Ornamental', 'Adiantum, Nephrolepis', 'Ferns in gardens and pots'], ['Biofertiliser', 'Azolla', 'Hosts nitrogen-fixing Anabaena in paddy fields'], ['Soil binding', 'Equisetum', 'Grows on loose soil and stabilises it'], ['Fossil fuel', 'Giant tree ferns of the Carboniferous', 'Buried and changed into coal']], 'Table of economic uses of pteridophytes'),
      n: 'Many ferns are grown as ornamental plants. Azolla grows with a nitrogen-fixing cyanobacterium and is added to paddy fields as a green manure. Giant ferns of ancient forests were buried and slowly turned into coal.',
    }),
    sl('concept', 'Gymnosperms: naked seeds', {
      b: '**Gymnos** means naked: the **ovules are not enclosed in an ovary**, so the seeds are exposed. Most are woody trees or shrubs, and none forms flowers or fruits.',
      v: table(['Feature', 'In gymnosperms', 'Example'], [['Roots', 'Tap roots; mycorrhiza in Pinus; coralloid roots with cyanobacteria in Cycas', 'Pinus, Cycas'], ['Stem', 'Unbranched in Cycas; branched in Pinus, Cedrus', 'Cycas, Cedrus'], ['Leaves', 'Needle-like in conifers; pinnate in Cycas', 'Pinus, Cycas'], ['Spores', 'Heterosporous: microspores and megaspores', 'All'], ['Reproductive units', 'Cones: microsporophylls and megasporophylls', 'Pinus']], 'Table of characteristics of gymnosperms'),
      n: 'Gymnosperms bear naked seeds on cones. They are heterosporous, forming microspores that become pollen grains and megaspores that stay inside ovules. Conifer leaves are needles with a thick cuticle and sunken stomata, which reduces water loss.',
    }),
    sl('diagram', 'Life cycle of Pinus', {
      b: 'The **tree is the dominant sporophyte**. **Pollen** from male cones is carried by wind; one **functional megaspore** in each ovule forms the **female gametophyte**; the **pollen tube** delivers the male gametes.',
      v: V.pinus,
      n: 'Male cones make pollen grains by meiosis. In the female cone each ovule has a megaspore mother cell, which forms four megaspores, of which only one survives. The pollen tube grows to the archegonium, and fertilisation gives a zygote that becomes the embryo inside a naked seed. No water is needed for fertilisation.',
    }),
    sl('example', 'Worked example 2: ovules and pollen in a pine', {
      b: `A female pine cone has ${PIN.scales} scales with ${PIN.ovulesPerScale} ovules each. A male cone has ${PIN.pollenMothers} pollen mother cells.`,
      ul: [
        `Ovules: ${PIN.scales} × ${PIN.ovulesPerScale} = **${PINUS_OVULES}**.`,
        `Each ovule has one megaspore mother cell giving 4 megaspores: ${PINUS_OVULES} × 4 = **${PINUS_MEGASPORES}**, of which **${PINUS_FUNCTIONAL}** are functional.`,
        `Pollen grains: ${PIN.pollenMothers} × 4 = **${PINUS_POLLEN}**.`,
      ],
      v: table(['Item', 'Number'], [['Ovules', String(PINUS_OVULES)], ['Megaspores formed', String(PINUS_MEGASPORES)], ['Functional megaspores', String(PINUS_FUNCTIONAL)], ['Pollen grains', String(PINUS_POLLEN)]], 'Worked table of ovules, megaspores and pollen grains in Pinus'),
      n: 'Count the ovules first, one hundred and twenty. Each has one megaspore mother cell, giving four megaspores, but only one survives, so there are one hundred and twenty functional megaspores. Pollen is made in far greater numbers, two thousand from five hundred mother cells, because wind pollination is wasteful.',
    }),
    sl('check', 'Quick check: functional megaspores', {
      b: 'How many megaspores in a Pinus ovule normally degenerate?',
      n: 'Quick check. Four are formed by meiosis.',
      chk: 'ck-meg-mcq',
    }),
    sl('concept', 'Gymnosperms compared with pteridophytes', {
      b: 'Gymnosperms have moved a step beyond ferns: **seeds, pollen tubes and a reduced gametophyte**.',
      v: table(['Feature', 'Pteridophytes', 'Gymnosperms'], [['Seeds', 'Absent', 'Naked seeds'], ['Spores', 'Mostly homosporous', 'Always heterosporous'], ['Gametophyte', 'Free-living prothallus', 'Reduced, retained in the sporophyte'], ['Water for fertilisation', 'Needed', 'Not needed: pollen tube'], ['Habit', 'Mostly herbs', 'Woody trees and shrubs']], 'Table comparing pteridophytes and gymnosperms'),
      n: 'A fern needs water for its antherozoids to swim, and its gametophyte lives on its own. A gymnosperm keeps its gametophytes inside the sporophyte, uses wind-borne pollen and a pollen tube, and so fertilisation does not depend on water.',
    }),
    sl('concept', 'Economic importance of gymnosperms', {
      b: 'Gymnosperms supply **timber, resin, paper pulp and medicines**.',
      v: table(['Use', 'Plant', 'Product'], [['Timber', 'Pinus, Cedrus', 'Softwood for buildings and furniture'], ['Resin', 'Pinus', 'Turpentine and rosin'], ['Starch', 'Cycas', 'Sago from the stem'], ['Medicine', 'Ephedra, Taxus', 'Ephedrine; taxol against cancer'], ['Ornamental', 'Thuja, Araucaria', 'Garden trees']], 'Table of economic uses of gymnosperms'),
      n: 'Conifers give softwood timber and resin, from which turpentine is made. The stem of Cycas yields sago starch. Ephedra gives the drug ephedrine, and the bark of yew trees gives taxol, used in cancer treatment.',
    }),
    sl('check', 'Quick check: seeds', {
      b: 'Judge the statement: gymnosperms need water for fertilisation because they have flagellate antherozoids.',
      n: 'Quick check. Think of the pollen tube.',
      chk: 'ck-water-tf',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Pteridophytes: Psilopsida, Lycopsida, Sphenopsida, Pteropsida; vascular, no seeds; sporophyte dominant; prothallus free-living.',
        `Homosporous (Dryopteris) and heterosporous (Selaginella, Salvinia): heterospory leads towards the seed habit.`,
        `Fern: ${FERNN.mothersPerSporangium} spore mother cells give ${FERN_SPORES_PER_SPORANGIUM} spores per sporangium.`,
        'Gymnosperms: naked seeds, cones, heterosporous, pollen tube, no water needed; Pinus life cycle.',
        'Uses: ornamentals, Azolla biofertiliser; timber, resin, sago, ephedrine, taxol.',
      ],
      v: table(['Group', 'Dominant', 'Seeds', 'Water for fertilisation'], [['Bryophytes', 'Gametophyte', 'No', 'Yes'], ['Pteridophytes', 'Sporophyte', 'No', 'Yes'], ['Gymnosperms', 'Sporophyte', 'Naked', 'No']], 'Summary table of dominant generation, seeds and need for water in bryophytes, pteridophytes and gymnosperms'),
      n: 'To recap: pteridophytes are vascular plants that reproduce by spores, with a dominant sporophyte and a free-living prothallus. Gymnosperms are woody, heterosporous plants with naked seeds, a reduced gametophyte and fertilisation by a pollen tube.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Draw a **graphic outline** of each life cycle with n and 2n and the place of **meiosis**.',
        'For heterospory, give the two kinds of spore and an **example of each type of plant**.',
        'Compare gymnosperms and pteridophytes on **seeds, spores, gametophyte and water**.',
        'In Pinus say that **only one of the four megaspores** is functional.',
      ],
      n: 'Exam tips. Draw each life cycle as a graphic outline and mark meiosis. Name examples for homospory and heterospory. Compare gymnosperms and pteridophytes point by point. And remember that only one of the four megaspores survives in a pine ovule.',
    }),
  ],
});
