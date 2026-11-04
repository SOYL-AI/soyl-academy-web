// ISC 11 Biology ch04 Plant Kingdom — question bank in ISC school-examination style. Numbers come from calc.mjs.
// AR keys (ISC options): a b c d.
import { mk, add, svgV } from '../../isc-11-biology-ch01/src/lib.mjs';
import { ALGAE, classOfPigment, classOfFood, sporesFrom, haploid, chromosomes, MOSS_SPOROPHYTE_CHR, FERN, FERN_SPORES_PER_SPORANGIUM, FERN_SPORES_PER_SORUS, FERN_N, FERN_2N, MOSS_SPORES, MOSS, PINUS, PINUS_OVULES, PINUS_MEGASPORES, PINUS_FUNCTIONAL, PINUS_DEGENERATE, PINUS_POLLEN, PINUS_N, SHORE, SHORE_TOTAL, SHORE_BROWN_PCT, SHORE_FLAGELLATE } from './calc.mjs';
import { MOSS_LETTERED, MOSS_NAMED } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const mossFig = svgV(MOSS_LETTERED, 'A moss plant with five parts marked A to E');
const mossNamed = svgV(MOSS_NAMED, 'A moss plant with its parts named');
void mossNamed;

// ---------------------------------------------------------------- t01 algae
add('ck-pigment-mcq', mcq({
  stem: 'A seaweed contains chlorophyll a and d together with phycoerythrin and stores floridean starch. It belongs to the class',
  right: 'Rhodophyceae',
  wrong: ['Chlorophyceae', 'Phaeophyceae', 'Bryopsida'],
  sol: 'Phycoerythrin and floridean starch are the marks of red algae, Rhodophyceae — option (@K).',
  d: 1, c: 'application', t: [1],
}), () => classOfPigment('phycoerythrin') === 'Rhodophyceae' && classOfFood('Floridean') === 'Rhodophyceae' || 'class');
add('mannitol-mcq', mcq({
  stem: 'A slimy, olive-brown seaweed has a cell wall coated with algin and stores mannitol and laminarin. Its flagellated reproductive cells are',
  right: 'two in number, unequal in length and attached at the side',
  wrong: ['two to eight, equal and attached at the tip', 'absent at every stage of the life cycle', 'a single long flagellum at the base only'],
  sol: 'Algin and mannitol identify a brown alga (Phaeophyceae), whose zoospores and gametes have two unequal lateral flagella — option (@K).',
  d: 3, c: 'application', t: [1],
}), () => ALGAE.Phaeophyceae.flagella.includes('unequal') || 'flagella');
add('red-depth-mcq', mcq({
  stem: 'Which statement about red algae is correct?',
  right: 'No motile cell appears at any stage, so water currents carry their spores and male gametes',
  wrong: ['They store mannitol and laminarin as reserve food', 'Their zoospores have two unequal lateral flagella', 'They are confined to fresh water ponds'],
  sol: 'Rhodophyceae have no flagellated stage; they store floridean starch and are mostly marine — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('agar-mcq', mcq({
  stem: 'A student wishes to prepare solid culture plates for bacteria. The gelling agent comes from',
  right: 'Gelidium, a red alga',
  wrong: ['Laminaria, a brown alga', 'Chlorella, a green alga', 'Sphagnum, a moss'],
  sol: 'Agar is extracted from Gelidium and Gracilaria, which are red algae — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('aniso-mcq', mcq({
  stem: 'Under a microscope an algologist watches two motile gametes of one alga come together and fuse; one gamete is clearly larger than the other. This process is',
  right: 'anisogamy',
  wrong: ['isogamy', 'oogamy', 'formation of zoospores'],
  sol: 'Fusion of motile gametes unlike in size is anisogamy; isogamy has alike gametes and oogamy a non-motile egg — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('holdfast-mcq', mcq({
  stem: 'The holdfast of a large brown alga differs from the root of a flowering plant because the holdfast',
  right: 'only anchors the alga to its support and does not conduct water',
  wrong: ['stores mannitol for the whole year', 'contains xylem and phloem', 'bears the air bladders'],
  sol: 'Algae have no vascular tissue; the holdfast is purely an anchor — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('single-cell-mcq', mcq({
  stem: 'A company grows Spirulina in shallow outdoor tanks, dries it and sells it as a protein-rich powder. The product is best described as',
  right: 'single-cell protein from an alga',
  wrong: ['agar from a red alga', 'peat from a moss', 'algin from a brown alga'],
  sol: 'Spirulina and Chlorella are grown as single-cell protein — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('shore-pct-num', num({
  stem: `A survey of a rocky shore records ${SHORE_TOTAL} algae, of which ${SHORE.brown} are brown, ${SHORE.green} are green and the rest are red. What percentage of the algae are brown?`,
  value: SHORE_BROWN_PCT, unit: '%',
  sol: `Brown share = ${SHORE.brown} ÷ ${SHORE_TOTAL} × 100 = ${SHORE_BROWN_PCT} percent.`,
  scheme: [[`${SHORE_BROWN_PCT}`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === 45 || 'value');
add('flagellate-num', num({
  stem: `Of the ${SHORE_TOTAL} shore algae (${SHORE.green} green, ${SHORE.brown} brown, ${SHORE.red} red), how many belong to classes in which flagellated reproductive cells occur?`,
  value: SHORE_FLAGELLATE,
  sol: `Only green and brown algae form flagellated cells: ${SHORE.green} + ${SHORE.brown} = ${SHORE_FLAGELLATE}.`,
  scheme: [[`${SHORE_FLAGELLATE}`, 1]],
  d: 3, c: 'analysis', t: [1],
}), (q) => q.answer.value === 45 || 'value');
add('algae-reason-short', short({
  marks: 1,
  stem: 'Give a reason: Red algae can live at greater depths in the sea than green algae.',
  model: 'Their pigment **phycoerythrin** absorbs the **blue-green light** that penetrates deepest into water.',
  sol: 'Phycoerythrin and blue-green light.',
  scheme: [['Phycoerythrin absorbs the light that reaches deep water', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('alg-ar', ar({
  a: 'Brown algae are common on rocky sea shores, where waves break against the rocks.',
  r: 'Their holdfast fixes them firmly to the rock, and their thallus is protected by a slimy gel of algin.',
  key: 'a',
  sol: 'Both statements are true, and anchoring plus the gel protection explains why they survive wave action — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('grade-short', short({
  marks: 2,
  stem: 'Name the pigments and the stored food of brown algae, and state the substance in their cell wall that has commercial use.',
  model: 'Brown algae have **chlorophyll a and c** with the brown pigment **fucoxanthin**. They store food as **mannitol** and **laminarin**. The outer cell wall has a gel of **algin**, used as a thickener.',
  sol: 'Pigments; stored food; algin.',
  scheme: [['Pigments including fucoxanthin', 1], ['Mannitol or laminarin, and algin', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('gamy-short', short({
  marks: 2,
  stem: 'Distinguish isogamy from oogamy in algae, giving one example of each.',
  model: 'In **isogamy** the two fusing gametes are **alike in size and motile**, as in **Ulothrix**. In **oogamy** a **large non-motile egg** fuses with a **small motile male gamete**, as in **Volvox** or **Fucus**.',
  sol: 'Contrast with examples.',
  scheme: [['Isogamy described with example', 1], ['Oogamy described with example', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('algae-use-short', short({
  marks: 2,
  stem: 'State two ways in which algae help to maintain life on Earth, apart from being eaten.',
  model: 'Algae carry out about **half of the carbon dioxide fixation** on Earth and **release oxygen**. As **primary producers** they form the **base of aquatic food chains**, supporting fish and other animals.',
  sol: 'Photosynthesis and food chains.',
  scheme: [['Oxygen release or carbon fixation', 1], ['Primary producers of aquatic food chains', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('algae-compare-short3', short({
  marks: 3,
  stem: 'Tabulate three differences between green algae and brown algae.',
  model: '| Feature | Green algae | Brown algae |\n|---|---|---|\n| Pigments | Chlorophyll a and b | Chlorophyll a and c, and fucoxanthin |\n| Stored food | Starch | Mannitol and laminarin |\n| Flagella | Two to eight, equal, at the tip | Two, unequal, at the side |\n\nGreen algae are mostly freshwater; brown algae are mostly marine.',
  sol: 'Any three rows.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  wl: [30, 90],
  d: 2, c: 'understanding', t: [1],
}));
add('algae-uses-short3', short({
  marks: 3,
  stem: 'Name three algae of economic importance and state, for each, the product or use obtained from it.',
  model: '1. **Gelidium** or **Gracilaria** (red algae) yield **agar**, used as the gel in laboratory culture media and in making food jellies.\n2. **Laminaria** and other brown algae yield **algin**, a thickener for ice cream and paints, and some, such as *Laminaria*, are eaten as seaweed.\n3. **Chlorella** is grown in tanks as **single-cell protein**, a protein-rich food supplement.',
  sol: 'Three algae with products.',
  scheme: [['Agar from red algae', 1], ['Algin or food from brown algae', 1], ['Chlorella or Spirulina as protein', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('algae-reproduction-short3', short({
  marks: 3,
  stem: 'Describe vegetative, asexual and sexual reproduction in algae, with one example of an alga for any one of them.',
  model: 'In **vegetative** reproduction the thallus **fragments** and each piece grows into a new alga, as in **Spirogyra**. In **asexual** reproduction, **zoospores** are produced in sporangia; red algae form **non-motile spores**. In **sexual** reproduction two **gametes fuse**, and the gametes may be alike (isogamous), unlike in size (anisogamous) or an egg and a male gamete (oogamous).',
  sol: 'Three modes.',
  scheme: [['Vegetative by fragmentation', 1], ['Asexual by zoospores', 1], ['Sexual by gametes, with types or example', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('algae-long', long({
  stem: '(a) Tabulate four differences among Chlorophyceae, Phaeophyceae and Rhodophyceae. [3]\n(b) Name one alga from each class. [1]\n(c) State one use of an alga from the class that has no flagellated stage. [1]',
  model: '(a) | Feature | Chlorophyceae | Phaeophyceae | Rhodophyceae |\n|---|---|---|---|\n| Pigments | Chlorophyll a, b | Chlorophyll a, c, fucoxanthin | Chlorophyll a, d, phycoerythrin |\n| Stored food | Starch | Mannitol, laminarin | Floridean starch |\n| Cell wall | Cellulose | Cellulose with algin | Cellulose with pectin and polysulphate esters |\n| Flagella | 2–8, equal, apical | 2, unequal, lateral | Absent at all stages |\n\n(b) Spirogyra (or Chara); Laminaria (or Fucus); Polysiphonia (or Porphyra).\n\n(c) Red algae: **Gelidium** and **Gracilaria** yield **agar**; Porphyra is eaten.',
  sol: 'Table; examples; use.',
  scheme: [['(a) Four rows correct (three marks: all four, three, or two rows)', 3], ['(b) Three examples', 1], ['(c) Use of a red alga', 1]],
  wl: [60, 200],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 bryophytes
add('moss-fig-mcq', mcq({
  stem: 'In the figure of a moss plant, meiosis occurs in the cells inside the part marked',
  right: 'A',
  wrong: ['B', 'C', 'D'],
  sol: 'A is the capsule; spore mother cells inside it divide by meiosis to form haploid spores — option (@K).',
  d: 2, c: 'application', t: [2],
  assets: [mossFig],
}));
add('moss-fig2-mcq', mcq({
  stem: 'In the same figure, which marked part is haploid?',
  right: 'C, the leafy shoot',
  wrong: ['A, the capsule', 'B, the long stalk', 'A and B together, since they are the sporophyte'],
  sol: 'The leafy shoot is the gametophyte and is haploid; A and B belong to the diploid sporophyte — option (@K).',
  d: 3, c: 'analysis', t: [2],
  assets: [mossFig],
}));
add('moss-fig3-mcq', mcq({
  stem: 'In the same figure, the structures marked D resemble the roots of a flowering plant in anchoring the plant, but they',
  right: 'are rhizoids, with no vascular tissue',
  wrong: ['are part of the diploid sporophyte', 'bear the sex organs', 'produce spores by meiosis'],
  sol: 'D are rhizoids of the gametophyte; bryophytes lack xylem and phloem — option (@K).',
  d: 2, c: 'understanding', t: [2],
  assets: [mossFig],
}));
add('gemma-mcq', mcq({
  stem: 'Small green discs found inside cup-shaped structures on a liverwort thallus are used for',
  right: 'asexual reproduction',
  wrong: ['sexual reproduction by antherozoids', 'absorbing water from the soil', 'storing food for the sporophyte'],
  sol: 'Gemmae in gemma cups detach and grow into new thalli, an asexual method — option (@K).',
  d: 1, c: 'application', t: [2],
}));
add('sphagnum-mcq', mcq({
  stem: 'Gardeners wrap the roots of seedlings in damp Sphagnum while sending them to distant markets. This use depends on the moss',
  right: 'holding a large quantity of water',
  wrong: ['fixing atmospheric nitrogen', 'containing agar-like gels', 'killing soil-borne pests'],
  sol: 'Sphagnum has great water-holding capacity, so it is used as packing for live plants — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('protonema-mcq-extra', mcq({
  stem: 'The protonema stage of a moss is',
  right: 'haploid and grows from a spore',
  wrong: ['diploid and grows from the zygote', 'haploid and grows from the zygote', 'diploid and grows from a spore'],
  sol: 'Spores are haploid and germinate into the protonema, which is also haploid — option (@K).',
  d: 2, c: 'understanding', t: [2],
}), () => chromosomes('protonema', 12) === 12 || 'ploidy');
add('ck-protonema-mcq', mcq({
  stem: 'Which stage of Funaria develops directly from a germinating spore?',
  right: 'A creeping, branched, thread-like protonema',
  wrong: ['An upright leafy shoot bearing sex organs', 'A capsule on a seta', 'A zygote'],
  sol: 'The spore grows into the protonema, which later produces the leafy gametophyte — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('amph-mcq', mcq({
  stem: 'The bryophytes are called "amphibians of the plant kingdom" because they',
  right: 'live on land but need water for the antherozoids to swim to the egg',
  wrong: ['live partly in water and partly in air as adults', 'have a dominant sporophyte', 'have both xylem and phloem'],
  sol: 'Their antherozoids are flagellated and swim in a water film — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('succession-mcq', mcq({
  stem: 'Mosses often appear first on bare rock and later give way to larger plants. Which role do mosses play?',
  right: 'They are pioneers of succession that bind particles and add organic matter',
  wrong: ['They are climax plants that exclude other species', 'They fix atmospheric nitrogen in root nodules', 'They only pollinate flowers'],
  sol: 'Mosses form mats, trap soil particles and prepare the substratum — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('moss-ar', ar({
  a: 'The sporophyte of Funaria remains attached to the gametophyte throughout its life.',
  r: 'The capsule of the sporophyte forms haploid spores by meiosis.',
  key: 'b',
  sol: 'Both statements are true, but meiosis in the capsule does not explain why the sporophyte stays attached; the foot absorbing water and food does — option (b).',
  d: 2, c: 'understanding', t: [2],
}));
add('ck-spores-num', num({
  stem: 'How many spores would a capsule with 125 spore mother cells release by meiosis?',
  value: sporesFrom(125),
  sol: `125 × 4 = ${sporesFrom(125)}.`,
  scheme: [[`${sporesFrom(125)}`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => q.answer.value === 500 || 'value');
add('moss-fill', fill({
  stem: 'In Funaria the sporophyte consists of a foot, a seta and a ______.',
  acc: [['capsule', 'Capsule']],
  sol: 'The capsule bears the spores.',
  d: 1, c: 'recall', t: [2],
}));
add('moss-reason-short', short({
  marks: 1,
  stem: 'Give a reason: Bryophytes do not grow to a large size.',
  model: 'They have **no xylem or phloem**, so water and food cannot be carried over long distances.',
  sol: 'No vascular tissue.',
  scheme: [['No vascular tissue for conduction', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('sphag-short', short({
  marks: 2,
  stem: 'State two economic uses of Sphagnum.',
  model: '**Peat** from Sphagnum is used as **fuel**. Because it can hold a great deal of water, it is used to **pack and transport live plants** and as a **soil conditioner** in horticulture.',
  sol: 'Two uses.',
  scheme: [['Peat as fuel', 1], ['Packing or soil conditioner', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('water-short', short({
  marks: 2,
  stem: 'During a long dry spell no young sporophytes appear on a moss clump growing on a garden wall, although its gametophytes are healthy. Explain why.',
  model: 'The **antherozoids are flagellated** and must **swim through a film of water** from the antheridium to the egg in the archegonium. In dry weather no water film forms, so **fertilisation fails** and **no zygote or sporophyte** develops.',
  sol: 'Flagellated antherozoids need a water film.',
  scheme: [['Antherozoids swim and need a water film', 1], ['No fertilisation, so no sporophyte', 1]],
  d: 2, c: 'application', t: [2],
}));
add('dep-short', short({
  marks: 2,
  stem: 'Which generation is dominant in Funaria? State two ways in which the sporophyte depends on it.',
  model: 'The **gametophyte** (haploid leafy plant) is dominant. The sporophyte **remains attached** to it by its **foot**, and receives **water and mineral salts** and **food** from it.',
  sol: 'Gametophyte; dependence.',
  scheme: [['Gametophyte dominant', 1], ['Foot absorbs water, minerals and food from the gametophyte', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('liver-moss-short3', short({
  marks: 3,
  stem: 'Give three differences between liverworts and mosses, naming one example of each.',
  model: '| Feature | Liverworts | Mosses |\n|---|---|---|\n| Gametophyte | Flat, dorsiventral thallus | Protonema, then an upright leafy axis |\n| Asexual reproduction | Gemmae in gemma cups | Budding of the secondary protonema |\n| Example | Marchantia | Funaria |\n\nThe examples are named in the last row.',
  sol: 'Three differences with examples.',
  scheme: [['Gametophyte', 1], ['Asexual reproduction', 1], ['Examples of both', 1]],
  wl: [30, 90],
  d: 2, c: 'understanding', t: [2],
}));
add('bryo-uses-short3', short({
  marks: 3,
  stem: 'Describe three ecological or economic roles of bryophytes.',
  model: '1. **Sphagnum** gives **peat**, a fuel, and holds water for packing plants.\n2. Mosses grow on bare rock and soil and **bind the soil**, reducing **erosion**.\n3. They are **pioneers of succession**, adding organic matter so that larger plants can follow.',
  sol: 'Three roles.',
  scheme: [['Peat and packing', 1], ['Soil binding', 1], ['Succession', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('funaria-sporophyte-short3', short({
  marks: 3,
  stem: 'Starting from the zygote, describe how the sporophyte of Funaria develops and how it releases spores.',
  model: 'The **diploid zygote** divides to form an embryo that grows into the **sporophyte** with a **foot, seta and capsule**. The foot is embedded in the gametophyte. In the capsule **spore mother cells** divide by **meiosis** to give **haploid spores**, released when the lid opens.',
  sol: 'Zygote to spores.',
  scheme: [['Zygote grows into foot, seta, capsule', 1], ['Meiosis of spore mother cells', 1], ['Haploid spores released', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('alt-short3', short({
  marks: 3,
  stem: 'What is alternation of generations? Explain how it differs in a moss and in a fern.',
  model: 'It is the **alternation of a haploid gametophyte** (forming gametes) **with a diploid sporophyte** (forming spores). In a **moss** the gametophyte is **dominant** and the sporophyte depends on it; in a **fern** the sporophyte is **dominant** and the small prothallus is free-living.',
  sol: 'Definition and the contrast.',
  scheme: [['Definition', 1], ['Moss: gametophyte dominant', 1], ['Fern: sporophyte dominant', 1]],
  d: 2, c: 'understanding', t: [2, 3],
}));
add('funaria-long', long({
  stem: '(a) Draw a graphic outline of the life cycle of Funaria, marking the haploid and diploid stages. [3]\n(b) Which generation is dominant? [1]\n(c) Name the process by which spores are formed and the structure in which it occurs. [1]',
  model: '(a) **Spore (n)** → **protonema (n)** → **leafy gametophyte (n)** with **antheridia** and **archegonia** → **antherozoid (n)** + **egg (n)** → **zygote (2n)** → **sporophyte (2n)** of foot, seta and capsule → **spore mother cells (2n)** → meiosis → spores (n).\n\n(b) The **gametophyte** (leafy plant) is dominant.\n\n(c) **Meiosis**, in the **capsule** of the sporophyte.',
  sol: 'Outline with ploidy; dominant generation; meiosis in the capsule.',
  scheme: [['(a) Stages in order', 2], ['(a) n and 2n marked correctly', 1], ['(b) Gametophyte', 1], ['(c) Meiosis in the capsule', 1]],
  wl: [50, 180],
  d: 2, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 pteridophytes
add('class-mcq', mcq({
  stem: 'A student finds a plant of damp ground with a ridged, jointed green stem and whorls of tiny scale-like leaves at each joint, bearing spore-forming cones. It belongs to the class',
  right: 'Sphenopsida',
  wrong: ['Psilopsida', 'Lycopsida', 'Pteropsida'],
  sol: 'A jointed stem with whorled scale leaves is the horsetail Equisetum of Sphenopsida — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('selag-mcq', mcq({
  stem: 'A club-moss relative bears small leaves and two kinds of spores, the larger developing into female gametophytes. The plant is',
  right: 'Selaginella, which is heterosporous',
  wrong: ['Lycopodium, which is homosporous', 'Dryopteris, which is homosporous', 'Psilotum, which is homosporous'],
  sol: 'Two kinds of spores identify a heterosporous plant such as Selaginella — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('ck-hetero-mcq', mcq({
  stem: 'Which of these pteridophytes is heterosporous?',
  right: 'Salvinia',
  wrong: ['Dryopteris', 'Equisetum', 'Lycopodium'],
  sol: 'Salvinia, Marsilea and Selaginella are heterosporous — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('prothallus-mcq', mcq({
  stem: 'A small, flat, green heart-shaped structure lives on damp soil under a fern. It',
  right: 'is the haploid gametophyte that bears antheridia and archegonia',
  wrong: ['is the diploid sporophyte of the fern', 'bears sori on its lower surface', 'forms spores by meiosis'],
  sol: 'This is the prothallus, a haploid gametophyte — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('sorus-mcq', mcq({
  stem: 'A botany student turns over a fern leaf and sees rows of small brown dots. A hand lens shows that each dot is a cluster of tiny stalked capsules. The dots are',
  right: 'sori, each a group of sporangia',
  wrong: ['clusters of antheridia', 'gemma cups', 'ovules on scales'],
  sol: 'Brown dots on the lower surface of a fern frond are sori, groups of sporangia — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('azolla-mcq', mcq({
  stem: 'A farmer adds a floating water fern to a paddy field to improve the nitrogen supply of the rice. The fern is',
  right: 'Azolla, which hosts the cyanobacterium Anabaena',
  wrong: ['Equisetum, which hosts mycorrhiza', 'Marsilea, which hosts Rhizobium', 'Adiantum, which hosts Nostoc'],
  sol: 'Azolla and Anabaena fix atmospheric nitrogen — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('seed-habit-mcq', mcq({
  stem: 'Retention of the female gametophyte inside the megasporangium of Selaginella is considered a step towards',
  right: 'the seed habit',
  wrong: ['vegetative propagation', 'homospory', 'alternation of generations'],
  sol: 'Such retention and nourishment of the embryo foreshadow the seed — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('prothallus-num', num({
  stem: `The sporophyte cells of a fern have ${FERN_2N} chromosomes. How many chromosomes does a cell of its prothallus have?`,
  value: FERN_N,
  sol: `The prothallus is haploid: ${FERN_2N} ÷ 2 = ${FERN_N}.`,
  scheme: [[`${FERN_N}`, 1]],
  d: 1, c: 'application', t: [3],
}), () => haploid(48) === 24 || 'value');
add('ck-sorus-num', num({
  stem: `How many spores does one sorus of ${FERN.sporangiaPerSorus} sporangia produce, if each sporangium has ${FERN.mothersPerSporangium} spore mother cells?`,
  value: FERN_SPORES_PER_SORUS,
  sol: `Each sporangium: ${FERN.mothersPerSporangium} × 4 = ${FERN_SPORES_PER_SPORANGIUM}; sorus: ${FERN_SPORES_PER_SPORANGIUM} × ${FERN.sporangiaPerSorus} = ${FERN_SPORES_PER_SORUS}.`,
  scheme: [[`${FERN_SPORES_PER_SORUS}`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => q.answer.value === 2560 || 'value');
add('fern-ar', ar({
  a: 'The prothallus of a fern is a diploid plant that bears sori on its lower surface.',
  r: 'The prothallus develops from the zygote formed after fertilisation.',
  key: 'd',
  sol: 'A is false: the prothallus is a haploid gametophyte bearing antheridia and archegonia. R is false: it grows from a spore, not from a zygote — option (d).',
  d: 3, c: 'analysis', t: [3],
}));
add('hetero-short', short({
  marks: 2,
  stem: 'What is heterospory? Name two pteridophytes that show it.',
  model: '**Heterospory** is the formation of **two kinds of spores**, small **microspores** and large **megaspores**, which give male and female gametophytes. **Selaginella** and **Salvinia** (also Marsilea) are heterosporous.',
  sol: 'Definition and examples.',
  scheme: [['Two kinds of spores, micro and mega', 1], ['Two examples', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('prothallus-short', short({
  marks: 2,
  stem: 'Describe the gametophyte of a fern and say why it needs a damp habitat.',
  model: 'It is a small, green, **heart-shaped, free-living prothallus** of **haploid** cells, bearing **antheridia** and **archegonia** on the lower surface. It needs **water** because the **antherozoids are flagellated** and swim to the egg.',
  sol: 'Features and water.',
  scheme: [['Heart-shaped haploid prothallus with sex organs', 1], ['Water for swimming antherozoids', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('fernuse-short', short({
  marks: 2,
  stem: 'State two ways in which pteridophytes are useful to human beings.',
  model: 'Ferns such as **Adiantum** and **Nephrolepis** are grown as **ornamentals**. **Azolla** with **Anabaena** is used as a **biofertiliser** that adds nitrogen to paddy fields. (Giant ferns of the past also formed **coal**.)',
  sol: 'Two uses.',
  scheme: [['Ornamental use', 1], ['Azolla as biofertiliser, or coal', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('class-short3', short({
  marks: 3,
  stem: 'Name any three classes of pteridophytes, giving one example of each.',
  model: '1. **Psilopsida**: *Psilotum*.\n2. **Lycopsida**: *Lycopodium* or *Selaginella*.\n3. **Sphenopsida**: *Equisetum*.\n(The fourth class, **Pteropsida**, includes *Dryopteris*, *Pteris* and *Adiantum*.)',
  sol: 'Three classes and examples.',
  scheme: [['First class and example', 1], ['Second class and example', 1], ['Third class and example', 1]],
  wl: [25, 70],
  d: 1, c: 'recall', t: [3],
}));
add('homo-short3', short({
  marks: 3,
  stem: 'Distinguish homosporous from heterosporous pteridophytes on the spores, the gametophytes and one example of each.',
  model: '**Homosporous** pteridophytes form **one kind of spore**, which grows into a **bisexual, free-living gametophyte** (*Dryopteris*). **Heterosporous** ones form **microspores** and **megaspores**, which give **male and female gametophytes** (*Selaginella*). In heterosporous plants the female gametophyte may be retained in the sporangium, an advance towards the seed habit.',
  sol: 'Three contrasts.',
  scheme: [['Spores: one kind vs two kinds', 1], ['Gametophytes', 1], ['Examples', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('fern-sporophyte-short3', short({
  marks: 3,
  stem: 'Describe the sporophyte of a fern and explain where its spores are produced and by what division.',
  model: 'The **sporophyte** is a diploid plant with a **rhizome, roots and large compound leaves (fronds)**. The sporangia are in **sori** on the lower surface of the fronds. Inside each sporangium **spore mother cells** divide by **meiosis** to form **haploid spores**.',
  sol: 'Body; sori; meiosis.',
  scheme: [['Rhizome, roots, fronds', 1], ['Sori on the lower surface', 1], ['Meiosis of spore mother cells', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('fern-long', long({
  stem: '(a) Draw a graphic outline of the life cycle of a fern, marking n and 2n and the point of meiosis. [3]\n(b) Is a fern homosporous or heterosporous? Define the term you choose. [1]\n(c) Why does fertilisation in a fern need water? [1]',
  model: '(a) **Sporophyte (2n)** → **spore mother cells (2n)** in sporangia of sori → **meiosis** → **spores (n)** → **prothallus (n)** with **antheridia** and **archegonia** → **antherozoids (n)** and **egg (n)** → **zygote (2n)** → young sporophyte.\n\n(b) A fern such as Dryopteris is **homosporous**: it forms only **one kind of spore**.\n\n(c) The **antherozoids are flagellated** and must **swim** in water to the egg in the archegonium.',
  sol: 'Outline; homospory; water.',
  scheme: [['(a) Stages in order with meiosis', 2], ['(a) Ploidy marked', 1], ['(b) Homosporous defined', 1], ['(c) Swimming antherozoids need water', 1]],
  wl: [50, 180],
  d: 2, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 gymnosperms
add('naked-mcq', mcq({
  stem: 'The seeds of Pinus are described as naked because',
  right: 'the ovules are not enclosed in an ovary',
  wrong: ['the seeds have no embryo', 'the seed coat is absent', 'seeds are produced without fertilisation'],
  sol: 'Gymnosperms lack an ovary, so ovules and seeds lie exposed on the scales — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('cycas-root-mcq', mcq({
  stem: 'The coralloid roots of Cycas, which are found near the soil surface, contain',
  right: 'cyanobacteria that fix nitrogen',
  wrong: ['fungal hyphae forming mycorrhiza', 'nodules of Rhizobium', 'chloroplast-free algae that store agar'],
  sol: 'Coralloid roots harbour nitrogen-fixing cyanobacteria; mycorrhiza belongs to Pinus — option (@K).',
  d: 2, c: 'recall', t: [4],
}));
add('needle-mcq', mcq({
  stem: 'Conifers growing on cold, dry mountain slopes have needle-like leaves with a thick cuticle and sunken stomata. This feature mainly reduces',
  right: 'loss of water by transpiration',
  wrong: ['loss of heat by radiation', 'attack by wind-borne pollen', 'the need for mycorrhiza'],
  sol: 'A small area, thick cuticle and sunken stomata cut water loss — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('megaspore-mcq', mcq({
  stem: 'In the ovule of Pinus, one megaspore mother cell gives rise to',
  right: 'four haploid megaspores, of which only one is functional',
  wrong: ['four diploid megaspores, all functional', 'one haploid megaspore and three polar bodies', 'two pollen grains and two eggs'],
  sol: 'Meiosis gives four haploid megaspores; three degenerate — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('ck-meg-mcq', mcq({
  stem: 'How many megaspores of one Pinus ovule normally degenerate?',
  right: 'Three',
  wrong: ['One', 'Two', 'Four'],
  sol: 'Four are formed and one is functional, so three degenerate — option (@K).',
  d: 1, c: 'recall', t: [4],
}), () => PINUS_DEGENERATE / PINUS_OVULES === 3 || 'value');
add('pollentube-mcq', mcq({
  stem: 'Which feature enables gymnosperms to fertilise in dry habitats?',
  right: 'A pollen tube that delivers the male gametes',
  wrong: ['Flagellated antherozoids', 'Free-living prothallus', 'A thick holdfast'],
  sol: 'The pollen tube carries non-motile male gametes to the egg, so water is not needed — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('sago-mcq', mcq({
  stem: 'Sago pearls are made from starch extracted from the stem of a palm-like plant whose roots near the soil surface are coralloid and contain cyanobacteria. The plant is',
  right: 'Cycas',
  wrong: ['Pinus', 'Ephedra', 'Cedrus'],
  sol: 'Cycas has coralloid roots with cyanobacteria and its stem gives sago — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('cone-mcq', mcq({
  stem: 'Male cones of Pinus differ from female cones in that male cones',
  right: 'bear microsporophylls with microsporangia producing pollen',
  wrong: ['bear ovules on their scales', 'contain archegonia', 'produce megaspores by meiosis'],
  sol: 'Male cones have microsporophylls; ovules and megaspores belong to the female cone — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('ovules-num', num({
  stem: `A female pine cone has ${PINUS.scales} scales, and each scale bears ${PINUS.ovulesPerScale} ovules. How many functional megaspores will the cone form?`,
  value: PINUS_FUNCTIONAL,
  sol: `Ovules = ${PINUS.scales} × ${PINUS.ovulesPerScale} = ${PINUS_OVULES}; each ovule has one functional megaspore, so ${PINUS_FUNCTIONAL}.`,
  scheme: [[`${PINUS_FUNCTIONAL}`, 1]],
  d: 3, c: 'application', t: [4],
}), (q) => q.answer.value === 120 || 'value');
add('degenerate-num', num({
  stem: `For the same cone (${PINUS.scales} scales, ${PINUS.ovulesPerScale} ovules per scale), how many megaspores in all degenerate?`,
  value: PINUS_DEGENERATE,
  sol: `Megaspores formed = ${PINUS_OVULES} × 4 = ${PINUS_MEGASPORES}; functional ${PINUS_FUNCTIONAL}; degenerate ${PINUS_MEGASPORES} − ${PINUS_FUNCTIONAL} = ${PINUS_DEGENERATE}.`,
  scheme: [[`${PINUS_DEGENERATE}`, 1]],
  d: 4, c: 'analysis', t: [4],
}), (q) => q.answer.value === 360 || 'value');
add('pollen-num', num({
  stem: `A male cone has ${PINUS.pollenMothers} pollen mother cells. How many pollen grains can it release?`,
  value: PINUS_POLLEN,
  sol: `${PINUS.pollenMothers} × 4 = ${PINUS_POLLEN}.`,
  scheme: [[`${PINUS_POLLEN}`, 1]],
  d: 2, c: 'application', t: [4],
}), (q) => q.answer.value === 2000 || 'value');
add('ck-water-tf', tf({
  stem: 'Gymnosperms need water for fertilisation because their antherozoids are flagellated.',
  key: 'f',
  sol: 'False. Gymnosperms use a pollen tube to carry non-motile male gametes, so water is not needed for fertilisation.',
  d: 1, c: 'understanding', t: [4],
}));
add('gym-ar', ar({
  a: 'Pinus grows well in cold regions with low rainfall.',
  r: 'Its needle-like leaves have a thick cuticle and sunken stomata that reduce loss of water.',
  key: 'a',
  sol: 'Both are true, and the leaf features explain the success — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('gym2-ar', ar({
  a: 'In a Pinus ovule only one of the four megaspores forms the female gametophyte.',
  r: 'The four megaspores are diploid cells produced from the megaspore mother cell by mitosis.',
  key: 'c',
  sol: 'A is true: three megaspores degenerate. R is false: the megaspores are haploid and are produced by meiosis — option (c).',
  d: 3, c: 'analysis', t: [4],
}));
add('naked-reason-short', short({
  marks: 1,
  stem: 'Give a reason: Gymnosperms are called naked-seeded plants.',
  model: 'Their **ovules are not enclosed by an ovary**, so the seeds are **not covered by a fruit**.',
  sol: 'No ovary.',
  scheme: [['Ovules not enclosed in an ovary', 1]],
  d: 1, c: 'understanding', t: [4],
}));
add('pollen-short', short({
  marks: 2,
  stem: 'On a dry mountain slope pine trees set abundant seed, whereas ferns grow only in the damp ravines. Which feature of the pine explains this? Give a reason.',
  model: 'The **pollen tube** carries the **male gametes directly to the egg**, so fertilisation **does not depend on water**, whereas fern antherozoids must **swim in water** to reach the egg. This lets the pine reproduce on **dry land**.',
  sol: 'Pollen tube, no water needed.',
  scheme: [['Pollen tube delivers male gametes', 1], ['No need for water, unlike ferns', 1]],
  d: 2, c: 'application', t: [4],
}));
add('gymuse-short', short({
  marks: 2,
  stem: 'Name two products obtained from gymnosperms and the plant that gives each.',
  model: '**Sago** comes from the stem of **Cycas**; **resin**, from which turpentine and rosin are made, comes from **Pinus**. (Taxol is obtained from **Taxus** and ephedrine from **Ephedra**.)',
  sol: 'Two products with plants.',
  scheme: [['First product with plant', 1], ['Second product with plant', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('gym-features-short3', short({
  marks: 3,
  stem: 'State three characteristic features of gymnosperms, with an example.',
  model: '1. The **ovules are naked**, not enclosed in an ovary, and no **fruits or flowers** form.\n2. They are **heterosporous**, bearing **microspores and megaspores** on sporophylls grouped in **cones**.\n3. The **gametophytes are reduced**, and a **pollen tube** delivers the male gametes. Examples: *Pinus*, *Cycas*.',
  sol: 'Three features.',
  scheme: [['Naked ovules and seeds', 1], ['Heterospory and cones', 1], ['Reduced gametophyte and pollen tube', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('gym-pter-short3', short({
  marks: 3,
  stem: 'Gymnosperms show advances over pteridophytes. State three such advances.',
  model: '1. Gymnosperms form **seeds**; pteridophytes do not.\n2. Their **female gametophyte stays within the ovule** instead of living freely as a prothallus.\n3. A **pollen tube** removes the need for **water** in fertilisation. They are also **always heterosporous**, whereas most pteridophytes make only one kind of spore, so their sexes are separated earlier in the life cycle.',
  sol: 'Seeds, retained gametophyte, pollen tube.',
  scheme: [['Seeds', 1], ['Retained reduced gametophyte', 1], ['Pollen tube, no water needed', 1]],
  d: 2, c: 'understanding', t: [3, 4],
}));
add('pine-ovule-short3', short({
  marks: 3,
  stem: 'Describe what happens to the megaspore mother cell in a pine ovule until the archegonia are formed.',
  model: 'The **megaspore mother cell** (diploid) divides by **meiosis** to form **four haploid megaspores**. **Three degenerate**; the **one functional megaspore** grows into the **female gametophyte**, which develops **archegonia**, each with an egg. The female gametophyte is retained within the ovule and is nourished by the sporophyte.',
  sol: 'Meiosis; one functional; female gametophyte.',
  scheme: [['Meiosis gives four megaspores', 1], ['Three degenerate, one functional', 1], ['Female gametophyte with archegonia', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('cone-short3', short({
  marks: 3,
  stem: 'A pine tree produces far more pollen grains than ovules. Give three facts about its pollination that explain why.',
  model: 'Pollination is by **wind**, so most pollen never reaches a cone. The pollen grains are **winged**, which helps them float, but many are lost. Producing **very large numbers** of pollen grains therefore ensures that **some reach the ovules**; the loss of the rest is the price of not needing water or an animal carrier.',
  sol: 'Wind pollination, wastage, numbers.',
  scheme: [['Wind pollination is chancy', 1], ['Winged grains lost in the air', 1], ['Large numbers ensure some reach the ovule', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('pinus-long', long({
  stem: '(a) Draw a graphic outline of the life cycle of Pinus showing the sporophyte, the two kinds of cones, the spores and the fertilisation. Mark n and 2n. [3]\n(b) How many of the four megaspores formed in an ovule survive? [1]\n(c) Name the generation that is dominant and state one way in which it differs from the dominant generation of a moss. [1]',
  model: '(a) **Pine tree (2n)** → **male cone**: pollen mother cells (2n) → meiosis → **pollen grains (n)**, winged; **female cone**: ovule with **megaspore mother cell (2n)** → meiosis → **functional megaspore (n)** → **female gametophyte (n)** with **archegonia** → egg; **pollen tube** → **fertilisation** → **zygote (2n)** → **embryo** in a **naked seed**.\n\n(b) **One** survives; three degenerate.\n\n(c) The **sporophyte** is dominant. In a moss the **gametophyte** is dominant and the sporophyte is dependent; in Pinus the sporophyte is a **tall independent tree**.',
  sol: 'Outline; one megaspore; dominant sporophyte.',
  scheme: [['(a) Cones, spores and fertilisation in order', 2], ['(a) Ploidy marked', 1], ['(b) One survives', 1], ['(c) Sporophyte dominant, with a difference', 1]],
  wl: [60, 190],
  d: 3, c: 'application', t: [4],
}));
add('compare-long', long({
  stem: '(a) Name one homosporous and one heterosporous pteridophyte. [1]\n(b) Compare pteridophytes and gymnosperms in four ways. [3]\n(c) Why is Selaginella regarded as a step towards the seed habit? [1]',
  model: '(a) **Dryopteris** (homosporous) and **Salvinia** (heterosporous).\n\n(b) **Seeds:** absent in pteridophytes, naked in gymnosperms. **Spores:** mostly homosporous vs always heterosporous. **Gametophyte:** free-living prothallus vs reduced, retained. **Water for fertilisation:** needed vs not needed.\n\n(c) In **Selaginella** the **female gametophyte stays inside the megasporangium** and nourishes the young embryo.',
  sol: 'Examples; four comparisons; Selaginella.',
  scheme: [['(a) Dryopteris and Salvinia or Selaginella', 1], ['(b) Four comparisons (three marks: four, three, or two)', 3], ['(c) Retained female gametophyte', 1]],
  wl: [50, 170],
  d: 3, c: 'analysis', t: [3, 4],
}));

add('seta-num', num({
  stem: 'The cells of the leafy gametophyte of a moss have 12 chromosomes each. How many chromosomes are present in a cell of the seta of the same plant?',
  value: MOSS_SPOROPHYTE_CHR,
  sol: `The seta belongs to the diploid sporophyte: 2 × ${MOSS.n} = ${MOSS_SPOROPHYTE_CHR}.`,
  scheme: [[`${MOSS_SPOROPHYTE_CHR}`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 24 || 'value');
add('ploid-mcq', mcq({
  stem: 'Which pair of structures consists of two diploid stages?',
  right: 'The zygote of a fern and the spore mother cell of a pine ovule',
  wrong: ['The spore of a moss and the egg of a fern', 'The prothallus of a fern and the pollen grain of a pine', 'The protonema of a moss and the zygote of a moss'],
  sol: 'Zygotes and spore mother cells are diploid; spores, eggs, prothalli, pollen grains and protonemata are haploid — option (@K).',
  d: 3, c: 'analysis', t: [2, 3, 4],
}), () => (chromosomes('zygote', 5) === 10 && chromosomes('spore mother cell', 5) === 10) || 'ploidy');
add('dichot-mcq', mcq({
  stem: 'A student keys out four unknown plants. W has no vascular tissue and a dominant gametophyte; X has vascular tissue, no seeds and a free-living prothallus; Y has naked seeds on cones; Z has a creeping protonema. Which assignment is correct?',
  right: 'W: liverwort, X: fern, Y: Pinus, Z: moss',
  wrong: ['W: fern, X: liverwort, Y: Pinus, Z: moss', 'W: moss, X: Pinus, Y: fern, Z: liverwort', 'W: liverwort, X: Pinus, Y: fern, Z: alga'],
  sol: 'W is a bryophyte lacking vascular tissue (a liverwort), X is a pteridophyte, Y a gymnosperm, and a protonema marks a moss — option (@K).',
  d: 3, c: 'analysis', t: [2, 3, 4],
}));
add('antheridium-mcq', mcq({
  stem: 'A student scrapes the tip of a leafy moss shoot and sees club-shaped bodies releasing coiled biflagellate cells into a drop of water. The cells are',
  right: 'antherozoids, which are haploid male gametes',
  wrong: ['spores, which are diploid', 'eggs, which are haploid', 'zoospores, which are asexual'],
  sol: 'Antheridia release biflagellate antherozoids, the haploid male gametes — option (@K).',
  d: 2, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- case-based
add('shore-case', mk.case({
  passage: 'A class collected five plants on a field trip and recorded what they saw.\n\n| Specimen | Observation |\n|---|---|\n| P | Brown, slimy; holdfast, stipe and flat frond; stores mannitol |\n| Q | Flat, ribbon-like green thallus with gemma cups |\n| R | Heart-shaped green plate on damp soil under a fern, 5 mm across |\n| S | Large tree with needles and cones; ovules lie bare on the scales |\n| T | Feathery plant with sori on the underside of its fronds |',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which specimen is a gametophyte that bears antheridia and archegonia?',
      right: 'R',
      wrong: ['T', 'S', 'P'],
      sol: 'R is the prothallus, the haploid gametophyte of a fern — option (@K).',
      d: 2, c: 'application', t: [3],
    })),
    part('b', mcq({
      stem: 'Which specimens lack xylem and phloem?',
      right: 'P, Q and R',
      wrong: ['Q, R and T', 'P, S and T', 'R, S and T'],
      sol: 'P is an alga, Q a liverwort and R the prothallus of a fern, a gametophyte; none has vascular tissue. S and T are sporophytes with xylem and phloem — option (@K).',
      d: 3, c: 'analysis', t: [1, 2, 3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Specimen S has naked seeds. Name its group and state one way in which its gametophyte differs from specimen R.',
      model: 'S is a **gymnosperm** (such as Pinus). Its gametophytes are **reduced and retained within the sporophyte**, but the gametophyte R is a **free-living prothallus**.',
      sol: 'Group and difference.',
      scheme: [['Gymnosperm', 1], ['Reduced and retained vs free-living', 1]],
      d: 2, c: 'application', t: [3, 4],
    })),
  ],
}));
