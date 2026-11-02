// ch06 Anatomy of Flowering Plants — two decks: Part 1 (t01 tissues and tissue systems), Part 2 (t02 anatomy of dicot and monocot root, stem, leaf).
import { sl, deck, table, flow, svgV, r } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { TISSUES, BUNDLES, DICOTROOT, MONOROOT, DICOTSTEM, MONOSTEM, LEAF } from './svgs.mjs';
import { N, FIELD, BUNDLE, LAYERS } from './calc.mjs';

export const V = {
  tissues: svgV(TISSUES, 'Transverse views of parenchyma, collenchyma with thickened corners and sclerenchyma with thick lignified walls'),
  bundles: svgV(BUNDLES, 'Radial, conjoint open and conjoint closed vascular bundles'),
  dicotroot: svgV(DICOTROOT, 'Labelled transverse section of a dicot root with four xylem patches and a small pith'),
  monoroot: svgV(MONOROOT, 'Labelled transverse section of a monocot root with eight xylem patches and a large pith'),
  dicotstem: svgV(DICOTSTEM, 'Labelled transverse section of a dicot stem with a ring of conjoint open vascular bundles'),
  monostem: svgV(MONOSTEM, 'Labelled transverse section of a monocot stem with scattered conjoint closed vascular bundles and one enlarged bundle'),
  leaf: svgV(LEAF, 'Labelled transverse section of a dicot leaf with palisade and spongy parenchyma, vein and stoma'),
  meristem: table(
    ['Meristem', 'Where', 'Effect'],
    [['Apical', 'Tips of roots and shoots', 'Increase in length (primary growth)'], ['Intercalary', 'Base of leaves or internodes, as in grasses', 'Regrowth after grazing or mowing']],
    'Table of apical and intercalary meristems',
  ),
  simple: table(
    ['Tissue', 'Cells', 'Walls', 'Function'],
    [['Parenchyma', 'Living, roundish, small spaces', 'Thin, cellulose', 'Photosynthesis, storage, secretion'], ['Collenchyma', 'Living, may have chloroplasts', 'Thick at corners (cellulose, hemicellulose, pectin)', 'Support of young stems and petioles'], ['Sclerenchyma', 'Dead, fibres and sclereids', 'Thick, lignified, narrow lumen', 'Mechanical strength']],
    'Table of the three simple permanent tissues',
  ),
  xylem: table(
    ['Element', 'Living or dead', 'Note'],
    [['Tracheids', 'Dead', 'Elongated, tapering, lignified; carry water'], ['Vessels', 'Dead', 'Long tubes of cells with perforated ends'], ['Xylem fibres', 'Dead', 'Thick walls; support'], ['Xylem parenchyma', 'Living', 'Stores food, helps radial conduction']],
    'Table of the four elements of xylem',
  ),
  phloem: table(
    ['Element', 'Note'],
    [['Sieve tube elements', 'Long tubes with sieve plates; peripheral cytoplasm and no nucleus'], ['Companion cells', 'Nucleated; keep the sieve tube functioning'], ['Phloem parenchyma', 'Stores food; absent in most monocots'], ['Phloem fibres', 'Sclerenchyma, giving strength']],
    'Table of the four elements of phloem',
  ),
  systems: table(
    ['Tissue system', 'Includes', 'Role'],
    [['Epidermal', 'Epidermis, cuticle, stomata, root hairs, trichomes', 'Protection and exchange'], ['Ground', 'Cortex, pericycle, pith, medullary rays; mesophyll in leaves', 'Photosynthesis, storage, support'], ['Vascular', 'Xylem and phloem (and cambium in dicot stems)', 'Conduction']],
    'Table of the three tissue systems',
  ),
  guard: table(
    ['Feature', 'Dicot leaf', 'Grass leaf'],
    [['Guard cells', 'Bean-shaped', 'Dumbbell-shaped'], ['Stomata', 'Mostly on lower surface', 'On both surfaces'], ['Mesophyll', 'Palisade and spongy', 'Not differentiated']],
    'Table comparing guard cells and stomata of dicot and grass leaves',
  ),
  roots: table(
    ['Feature', 'Dicot root', 'Monocot root'],
    [['Xylem bundles', 'Two to four (di- to tetrarch)', 'More than six (polyarch)'], ['Pith', 'Small or none', 'Large, well developed'], ['Both', 'Epidermis with root hairs, cortex, endodermis with Casparian strips, pericycle, radial bundles, exarch xylem', 'The same plan']],
    'Table comparing dicot and monocot roots',
  ),
  stems: table(
    ['Feature', 'Dicot stem', 'Monocot stem'],
    [['Hypodermis', 'Collenchymatous', 'Sclerenchymatous'], ['Ground tissue', 'Cortex, endodermis, pericycle, medullary rays, pith', 'Undifferentiated parenchyma'], ['Vascular bundles', 'Few, in a ring; conjoint, open', 'Many, scattered; conjoint, closed, with sheath'], ['Phloem parenchyma', 'Present', 'Absent']],
    'Table comparing dicot and monocot stems',
  ),
  leaves: table(
    ['Feature', 'Dicot (dorsiventral) leaf', 'Monocot (isobilateral) leaf'],
    [['Stomata', 'More on the lower epidermis', 'Equal on both epidermises'], ['Mesophyll', 'Palisade above, spongy below', 'Alike throughout'], ['Special cells', 'None', 'Bulliform cells on the upper epidermis'], ['Veins', 'Different sizes; reticulate', 'Similar size; parallel']],
    'Table comparing dicot and monocot leaves',
  ),
};

export const deck1 = deck({
  part: 1,
  title: 'Anatomy of Flowering Plants — Part 1: Tissues and tissue systems',
  goals: [
    'Distinguish meristematic and permanent tissues',
    'Describe simple and complex permanent tissues',
    'Describe the epidermal, ground and vascular tissue systems',
  ],
  slides: [
    sl('title', 'Anatomy of flowering plants', {
      b: 'Part 1 — tissues: how cells of one kind work together.',
      v: flow('LR', [['t', 'Tissue'], ['m', 'Meristematic'], ['p', 'Permanent: simple and complex']], [['t', 'm'], ['t', 'p']], 'Flow from tissue to meristematic and permanent tissues'),
      n: 'Anatomy is the study of internal structure. A tissue is a group of similar cells, usually with a common origin, that perform a common function. Plant tissues are of two broad kinds: those that divide, called meristematic, and those that have stopped dividing, called permanent.',
    }),
    sl('concept', 'Meristematic tissues', {
      b: 'Cells of a **meristem** divide continually. **Apical meristems** at the root and shoot tips cause **primary growth** in length. **Intercalary meristems** at the base of leaves and internodes, as in grasses, allow regrowth.',
      v: V.meristem,
      n: 'Meristematic cells are small, thin walled and full of dense cytoplasm, with prominent nuclei. Apical meristems at the tips of roots and shoots make the plant longer. Intercalary meristems, found in grasses, explain why a mown lawn grows back from the base of its leaves.',
    }),
    sl('diagram', 'Simple permanent tissues', {
      b: 'Simple tissues have **one kind of cell**: **parenchyma** (living, thin walls), **collenchyma** (living, corners thickened) and **sclerenchyma** (dead, lignified walls).',
      v: V.tissues,
      n: 'Parenchyma is the most common tissue. Its thin walled living cells carry out photosynthesis, storage and secretion. Collenchyma cells are thickened at the corners and support young stems and leaf stalks. Sclerenchyma cells are dead, with thick lignified walls, and give strength. Fibres and sclereids are its two kinds.',
    }),
    sl('check', 'Quick check: sclerenchyma', {
      b: 'Find the cause of the gritty feel in some fruits.',
      n: 'Quick check. Which dead, thick walled cells are found in the pulp of pear and guava?',
      chk: 'sclerid-mcq',
    }),
    sl('example', 'Worked example 1: real size from a micrograph', {
      b: `A parenchyma cell measures 21 mm across on a print at 600 times magnification, and a sclereid measures 45 mm at 900 times. Find their real widths.`,
      ul: [
        r`Real size = image size $\div$ magnification: $\dfrac{21 \times 1000}{600} = ${N.parenUm}$ micrometres.`,
        r`Sclereid: $\dfrac{45 \times 1000}{900} = ${N.sclereidUm}$ micrometres.`,
        'Both are tens of micrometres, the usual size of plant cells.',
      ],
      v: table(['Cell', 'Image (mm)', 'Magnification', 'Real width (micrometres)'], [['Parenchyma', '21', '600', String(N.parenUm)], ['Sclereid', '45', '900', String(N.sclereidUm)]], `Worked table: ${N.parenUm} and ${N.sclereidUm} micrometres`),
      n: 'To find the real size, divide the size in the picture by the magnification and convert millimetres to micrometres. The parenchyma cell works out to thirty five micrometres, and the sclereid to fifty micrometres.',
    }),
    sl('concept', 'Complex tissue: xylem', {
      b: '**Xylem** conducts **water and minerals** and gives support. Elements: **tracheids**, **vessels**, **xylem fibres** (all dead) and **xylem parenchyma** (living). The first-formed xylem is **protoxylem**, the later is **metaxylem**.',
      v: V.xylem,
      n: 'Xylem has more than one kind of cell, so it is a complex tissue. Tracheids and vessels carry water and are dead, with lignified walls. Xylem fibres give support, and xylem parenchyma is the only living part. In stems the protoxylem lies towards the pith, which is called endarch, while in roots it lies towards the outside, which is exarch.',
    }),
    sl('concept', 'Complex tissue: phloem', {
      b: '**Phloem** conducts **food** from leaves to other parts. Elements: **sieve tube elements**, **companion cells**, **phloem parenchyma** and **phloem fibres**.',
      v: V.phloem,
      n: 'Sieve tube elements are long tubes with perforated end walls called sieve plates. At maturity they lack a nucleus, but each is helped by a companion cell with a nucleus. Phloem parenchyma stores food and is absent in most monocots. Phloem fibres, also called bast fibres, are dead and give strength.',
    }),
    sl('check', 'Quick check: xylem', {
      b: 'Identify the xylem element.',
      n: 'Quick check. Which water carrying element is a long tube of dead cells with perforated ends?',
      chk: 'vessel-mcq',
    }),
    sl('concept', 'The epidermal tissue system', {
      b: 'The **epidermis** is the outermost layer, covered by a **cuticle** in aerial parts. It bears **stomata**, **root hairs** and **trichomes**. Each stoma has two **guard cells**: **bean-shaped** in dicots, **dumbbell-shaped** in grasses.',
      v: V.guard,
      n: 'The epidermis protects the plant and limits water loss. Stomata control gas exchange and transpiration, and each pore is guarded by two guard cells. Guard cells are bean shaped in dicots and dumbbell shaped in grasses. Root hairs are outgrowths of root epidermal cells that absorb water, and trichomes are hairs on the stem that reduce water loss.',
    }),
    sl('example', 'Worked example 2: stomatal density', {
      b: `In a field of view of ${FIELD.area} square millimetres, a student counts ${FIELD.upper} stomata on the upper epidermis of a dicot leaf and ${FIELD.lower} on the lower. Find the density on each surface and the ratio.`,
      ul: [
        r`Upper: $\dfrac{${FIELD.upper}}{${FIELD.area}} = ${N.stoUpper}$ per square millimetre.`,
        r`Lower: $\dfrac{${FIELD.lower}}{${FIELD.area}} = ${N.stoLower}$ per square millimetre.`,
        r`Ratio lower to upper: $\dfrac{${N.stoLower}}{${N.stoUpper}} = ${N.stoRatio}$.`,
      ],
      v: table(['Surface', 'Count', 'Density per square mm'], [['Upper', String(FIELD.upper), String(N.stoUpper)], ['Lower', String(FIELD.lower), String(N.stoLower)]], `Worked table: densities ${N.stoUpper} and ${N.stoLower} per square millimetre`),
      n: 'Divide each count by the area of the field. Five stomata in a quarter of a square millimetre is twenty per square millimetre above, and twenty stomata is eighty below. The lower surface has four times as many, as expected in a dicot leaf.',
    }),
    sl('check', 'Quick check: guard cells', {
      b: 'Match the guard cell shape to the leaf.',
      n: 'Quick check. Think about dicots and grasses.',
      chk: 'stomata-mcq',
    }),
    sl('concept', 'The ground tissue system', {
      b: 'All tissues except the epidermis and the vascular bundles form the **ground tissue**: **cortex**, **pericycle**, **pith** and **medullary rays** in stems and roots; **mesophyll** in leaves.',
      v: V.systems,
      n: 'Ground tissue is mostly parenchyma, though it may be collenchyma or sclerenchyma. In stems and roots it includes the cortex, the pericycle, the pith and the medullary rays. In leaves it is the mesophyll, which is rich in chloroplasts and carries out photosynthesis.',
    }),
    sl('diagram', 'The vascular tissue system', {
      b: 'Xylem and phloem form **vascular bundles**. In roots they are **radial**. In stems and leaves they are **conjoint**, on the same radius: **open** when **cambium** lies between them (dicot stems), **closed** when it is absent (monocot stems).',
      v: V.bundles,
      n: 'In a radial bundle, as in roots, xylem and phloem lie on different radii and alternate. In a conjoint bundle they lie together on the same radius, with phloem outside. If a strip of cambium separates them, the bundle is open, as in dicot stems. If there is no cambium, the bundle is closed, as in monocot stems.',
    }),
    sl('check', 'Quick check: vascular bundles', {
      b: 'Classify the bundle.',
      n: 'Quick check. Is there cambium between the xylem and phloem?',
      chk: 'bundle-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Meristems divide: apical (tips, primary growth) and intercalary (grass leaf base).',
        'Simple tissues: parenchyma, collenchyma, sclerenchyma (fibres and sclereids).',
        'Complex tissues: xylem (tracheids, vessels, fibres, parenchyma) and phloem (sieve tubes, companion cells, parenchyma, fibres).',
        'Epidermal system: cuticle, stomata with guard cells, root hairs, trichomes.',
        'Ground system: cortex, pericycle, pith, medullary rays, mesophyll.',
        'Vascular bundles: radial, conjoint open, conjoint closed.',
      ],
      v: V.systems,
      n: 'To recap: meristems divide, and permanent tissues are simple or complex. Parenchyma, collenchyma and sclerenchyma are simple. Xylem and phloem are complex. The three tissue systems are the epidermal, the ground and the vascular, and bundles are radial, conjoint open or conjoint closed.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Say **living or dead** for every tissue and element.',
        'Remember **xylem carries water** and **phloem carries food**.',
        'Link **open bundles** to cambium in **dicot stems**.',
        'Give the **shape of guard cells** with the plant group.',
      ],
      n: 'Exam tips. State whether each tissue is living or dead. Remember that xylem carries water and phloem carries food. Link open bundles with cambium in dicot stems. And give the shape of guard cells with the plant group.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Anatomy of Flowering Plants — Part 2: Dicot and monocot root, stem and leaf',
  goals: [
    'Describe the transverse section of a dicot and a monocot root',
    'Compare the anatomy of dicot and monocot stems',
    'Describe the anatomy of dorsiventral and isobilateral leaves',
  ],
  slides: [
    sl('title', 'Looking inside organs', {
      b: 'Part 2 — transverse sections of root, stem and leaf.',
      v: flow('LR', [['r', 'Root: radial bundles'], ['s', 'Stem: conjoint bundles'], ['l', 'Leaf: mesophyll and veins']], [['r', 's'], ['s', 'l']], 'Flow from root to stem to leaf, naming the main anatomical feature of each'),
      n: 'We now use the tissues from part one to read transverse sections of the main organs. Each organ has an epidermis, a ground tissue and vascular tissue, arranged in a pattern that depends on the organ and on whether the plant is a dicot or a monocot.',
    }),
    sl('diagram', 'Dicot root', {
      b: 'Epidermis with **root hairs**, a wide **cortex**, an **endodermis** with **Casparian strips**, a **pericycle**, **two to four** patches of **exarch xylem** alternating with phloem, and a **small pith**.',
      v: V.dicotroot,
      n: 'The endodermis is a single layer of barrel shaped cells whose walls carry waxy bands of suberin, the Casparian strips. Inside it, the pericycle gives rise to lateral roots. Xylem and phloem lie on different radii, with conjunctive tissue between them. The pith is small or absent.',
    }),
    sl('diagram', 'Monocot root', {
      b: 'The same plan as the dicot root, but with **more than six** xylem bundles (**polyarch**) and a **large, well developed pith**.',
      v: V.monoroot,
      n: 'The monocot root looks much like the dicot root. The differences are the number of xylem bundles, which is more than six, and the pith, which is large and well developed.',
    }),
    sl('check', 'Quick check: roots', {
      b: 'Decide dicot or monocot from the section.',
      n: 'Quick check. Count the xylem patches and look at the pith.',
      chk: 'dicotroot-mcq',
    }),
    sl('concept', 'Root: dicot and monocot compared', {
      b: 'Both roots have **radial** bundles and **exarch** xylem; they differ in the number of xylem arms and in the pith.',
      v: V.roots,
      n: 'Root xylem is exarch, meaning the protoxylem lies towards the outside. Dicot roots have two to four xylem patches, which are called diarch to tetrarch, and a small pith. Monocot roots have more than six, called polyarch, and a large pith.',
    }),
    sl('diagram', 'Dicot stem', {
      b: '**Epidermis** with cuticle and trichomes, **collenchymatous hypodermis**, **cortex**, **endodermis** (starch sheath), **pericycle**, **medullary rays**, a **ring** of **conjoint, open, endarch** bundles, and a **large pith**.',
      v: V.dicotstem,
      n: 'The dicot stem has a few layers of collenchyma just beneath the epidermis. The innermost cortical layer, rich in starch, is the endodermis. Vascular bundles lie in a ring, each with phloem outside, cambium in the middle and xylem inside, with the protoxylem towards the pith. Parenchyma between bundles forms the medullary rays.',
    }),
    sl('diagram', 'Monocot stem', {
      b: '**Sclerenchymatous hypodermis**; a large, undifferentiated **ground tissue**; **many scattered** bundles, **conjoint and closed**, each with a **sclerenchymatous sheath**; **no phloem parenchyma**; a **water-containing cavity** in each bundle.',
      v: V.monostem,
      n: 'In the monocot stem the bundles are scattered through the ground tissue rather than in a ring, and they are smaller and more crowded near the edge. Each is surrounded by a sheath of sclerenchyma. There is no cambium, so the bundles are closed, and phloem parenchyma is absent. A water filled cavity lies inside each bundle.',
    }),
    sl('example', 'Worked example 1: counting bundles', {
      b: `A student counts ${BUNDLE.counted} vascular bundles in a field of ${BUNDLE.field} square millimetres of a maize stem section. Estimate the bundles in a whole section of ${BUNDLE.section} square millimetres.`,
      ul: [
        r`Density: $\dfrac{${BUNDLE.counted}}{${BUNDLE.field}} = ${N.bundleDensity}$ bundles per square millimetre.`,
        r`Whole section: $${N.bundleDensity} \times ${BUNDLE.section} = ${N.bundlesInSection}$ bundles.`,
        'This assumes the bundles are spread evenly; they are in fact more crowded near the edge, so it is only an estimate.',
      ],
      v: table(['Quantity', 'Value'], [['Counted', `${BUNDLE.counted} in ${BUNDLE.field} square mm`], ['Density', `${N.bundleDensity} per square mm`], ['Estimate for the section', String(N.bundlesInSection)]], `Worked table: ${N.bundlesInSection} bundles estimated`),
      n: 'First find the number of bundles per square millimetre by dividing the count by the area. Thirty bundles in five square millimetres is six per square millimetre. Multiplying by twelve square millimetres gives seventy two. Since bundles crowd towards the edge, this is only an estimate.',
    }),
    sl('concept', 'Stem: dicot and monocot compared', {
      b: 'Ring of **open** bundles with **collenchymatous** hypodermis in dicots; **scattered closed** bundles with **sclerenchymatous** hypodermis in monocots.',
      v: V.stems,
      n: 'Dicot stems have a ring of few bundles, a collenchymatous hypodermis and differentiated ground tissue. Monocot stems have many scattered bundles, a sclerenchymatous hypodermis and ground tissue that is not differentiated. Dicot bundles are open, and monocot bundles are closed.',
    }),
    sl('check', 'Quick check: stems', {
      b: 'Pick the correct pair of features.',
      n: 'Quick check. Which layer lies below the epidermis in each kind of stem?',
      chk: 'hypodermis-mcq',
    }),
    sl('diagram', 'Dicot leaf', {
      b: '**Upper and lower epidermis** with cuticle and **stomata** (more below). **Mesophyll**: **palisade** (upper, elongated, chloroplast-rich) and **spongy** parenchyma (lower, air spaces). **Vascular bundles** in veins, each with a **bundle sheath**.',
      v: V.leaf,
      n: 'The dicot leaf is dorsiventral, meaning its two sides differ. The palisade cells, close to the upper surface, are tall and tightly packed and carry most of the chloroplasts. The spongy cells below are loosely arranged with air spaces connected to the stomata. In the vein, xylem faces the upper side and phloem the lower.',
    }),
    sl('concept', 'Leaf: dorsiventral and isobilateral', {
      b: 'In an **isobilateral** (grass) leaf, stomata are on **both** surfaces and the mesophyll is **not differentiated**. **Bulliform cells** on the upper epidermis help the leaf **roll** in dry weather.',
      v: V.leaves,
      n: 'Monocot leaves are usually isobilateral. Stomata are about equally common on both surfaces, and the mesophyll cells are alike. Bulliform cells are large, empty, colourless cells in the upper epidermis. When they lose water the leaf curls inward, which cuts down water loss.',
    }),
    sl('example', 'Worked example 2: layers of a leaf', {
      b: `In a leaf section the upper epidermis is ${LAYERS.upperEpi} micrometres thick, the palisade ${LAYERS.palisade}, the spongy layer ${LAYERS.spongy} and the lower epidermis ${LAYERS.lowerEpi}. Find the leaf thickness and the share taken by mesophyll.`,
      ul: [
        r`Thickness: $${LAYERS.upperEpi} + ${LAYERS.palisade} + ${LAYERS.spongy} + ${LAYERS.lowerEpi} = ${N.leafThick}$ micrometres.`,
        r`Mesophyll: $${LAYERS.palisade} + ${LAYERS.spongy} = ${N.mesophyll}$ micrometres.`,
        r`Share: $\dfrac{${N.mesophyll}}{${N.leafThick}} \times 100 = ${N.mesoPct}$ percent; the palisade alone is ${N.palisadePct} percent.`,
      ],
      v: table(['Layer', 'Thickness (micrometres)'], [['Epidermis, both sides', String(LAYERS.upperEpi + LAYERS.lowerEpi)], ['Palisade', String(LAYERS.palisade)], ['Spongy', String(LAYERS.spongy)], ['Total', String(N.leafThick)]], `Worked table: total ${N.leafThick} micrometres, mesophyll ${N.mesoPct} percent`),
      n: 'Add the four layers to get the thickness, two hundred micrometres. The mesophyll is the palisade plus the spongy layer, one hundred and sixty micrometres, which is four fifths of the leaf. This is where photosynthesis takes place.',
    }),
    sl('check', 'Quick check: reading a leaf', {
      b: 'Name the lettered layer in the leaf section.',
      n: 'Quick check. Which lettered tissue is made of tall, closely packed cells below the upper surface?',
      chk: 'leaflet-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Dicot root: 2 to 4 xylem patches, small pith; monocot root: more than 6, large pith; both have endodermis with Casparian strips, exarch xylem.',
        'Dicot stem: collenchymatous hypodermis, ring of conjoint open endarch bundles, large pith, medullary rays.',
        'Monocot stem: sclerenchymatous hypodermis, many scattered conjoint closed bundles with sheaths, no phloem parenchyma.',
        'Dicot leaf: palisade and spongy mesophyll, more stomata below, dorsiventral.',
        'Monocot leaf: isobilateral, stomata on both surfaces, bulliform cells.',
      ],
      v: V.stems,
      n: 'To recap: roots have radial bundles and exarch xylem, with polyarch xylem and a large pith in monocots. Dicot stems have a ring of open bundles, and monocot stems have scattered closed bundles. The dicot leaf has palisade and spongy mesophyll, while the monocot leaf is isobilateral with bulliform cells.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Label **from outside to inside** in the same order as the section.',
        'Mention **Casparian strips** in the endodermis of roots.',
        'Write **closed** or **open** for bundles and give the reason (cambium).',
        'For leaves give **palisade towards the upper surface**.',
      ],
      n: 'Exam tips. Label parts from the outside inward, in the order seen in the section. Mention Casparian strips in the root endodermis. Say whether bundles are open or closed and give the reason, which is cambium. And place the palisade tissue towards the upper surface of the leaf.',
    }),
  ],
});
