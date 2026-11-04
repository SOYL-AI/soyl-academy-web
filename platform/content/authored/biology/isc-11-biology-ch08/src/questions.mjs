// ISC 11 Biology ch08 Anatomy of Flowering Plants — question bank in ISC school-examination style.
// Numbers come from calc.mjs. AR keys (ISC options): c a b d a d.
import { mk, add, svgV, r } from '../../isc-11-biology-ch01/src/lib.mjs';
import { DIV2, CELLS2, RING2, RING2_VESSELS, ROOT10, ROOT10_STRANDS, SECTION2, PITH2_PCT, LEAF2, LEAF2_STOMATA, APHID, APHID_SAP, GUAVA, GUAVA_CELLS, CANE, CANE_CENTRAL, TRIARCH, TRIARCH_STRANDS, N_XYLEM, N_DEAD_XYLEM } from './calc.mjs';
import { DICOT_STEM_LETTERED, DICOT_LEAF_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const stemFig = svgV(DICOT_STEM_LETTERED, 'A transverse section of a stem with five structures marked A to E');
const leafFig = svgV(DICOT_LEAF_LETTERED, 'A vertical section of a leaf with five structures marked A to E');

// ---------------------------------------------------------------- t01 meristems
add('ck-meristem-mcq', mcq({
  stem: 'Over several years a tree trunk becomes much thicker. The tissue responsible for this increase in girth is the',
  right: 'lateral meristem (cambium)',
  wrong: ['apical meristem', 'intercalary meristem', 'parenchyma of the pith'],
  sol: 'Lateral meristems, the vascular cambium and cork cambium, add to the girth — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('root-apical-mcq', mcq({
  stem: 'A student nips off the extreme tip of a young root with a blade. The root stops lengthening because the',
  right: 'apical meristem has been removed',
  wrong: ['lateral meristem has been removed', 'cork cambium has been removed', 'root hairs have been removed'],
  sol: 'Cell division that lengthens a root takes place in its apical meristem — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('bamboo-mcq', mcq({
  stem: 'The internodes of a bamboo shoot go on lengthening from their bases even after the shoot tip has been cut off. This is possible because of the',
  right: 'intercalary meristem',
  wrong: ['apical meristem', 'lateral meristem', 'vascular cambium'],
  sol: 'Intercalary meristems at the bases of internodes add length — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('ar-meri', ar({
  a: 'The cells of a meristem are closely packed with no intercellular spaces.',
  r: 'Meristematic cells have thick lignified walls.',
  key: 'c',
  sol: 'A is true. R is false: meristematic cells have thin primary walls, and lignified walls belong to sclerenchyma — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('apical-short2', short({
  marks: 2,
  stem: 'Distinguish between apical and lateral meristems on their position and on the kind of growth each brings about.',
  model: '**Apical** meristems lie at the **tips of roots and shoots** and increase the **length** of the plant (primary growth). **Lateral** meristems, the vascular cambium and cork cambium, lie along the **sides** of stem and root and increase their **girth** (secondary growth).',
  sol: 'Position and growth.',
  scheme: [['Apical: position and length', 1], ['Lateral: position and girth', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('cells-num', num({
  stem: `The cells of a root-tip meristem divide once every ${DIV2.hours} hours. Starting from one cell, how many cells are there after ${DIV2.spanHours} hours?`,
  value: CELLS2,
  sol: r`${DIV2.spanHours} $\div$ ${DIV2.hours} $= 5$ divisions, so $2^5 = ${CELLS2}$ cells.`,
  scheme: [[`${CELLS2}`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === 32 || 'value');
add('meri-long', long({
  stem: '(a) Name the three kinds of meristem according to position and state where each is found. [3]\n(b) A grass plant is grazed to the ground but grows again within days. Explain why. [2]',
  model: '(a) **Apical** meristems lie at the **tips of roots and shoots**; **intercalary** meristems lie at the **bases of leaves and internodes**; **lateral** meristems, the vascular cambium and cork cambium, lie along the **sides** of stems and roots.\n\n(b) The leaves of grass grow from an **intercalary meristem** at their **bases**, which lie near the ground and are not removed by grazing. Its cells keep **dividing and elongating**, so the leaf **regrows** quickly.',
  sol: 'Three kinds; grass regrowth.',
  scheme: [['(a) Apical with position', 1], ['(a) Intercalary and lateral with positions', 2], ['(b) Intercalary meristem at the base', 1], ['(b) Continued division and regrowth', 1]],
  wl: [60, 200],
  d: 2, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 permanent tissues
add('coll-mcq', mcq({
  stem: 'The ridges of a young pumpkin stem are firm yet flexible. Under the microscope the cells just below the epidermis are living and have corners thickened with cellulose and pectin. The tissue is',
  right: 'collenchyma',
  wrong: ['sclerenchyma', 'parenchyma', 'xylem'],
  sol: 'Living cells with thickened corners form collenchyma — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('stone-mcq', mcq({
  stem: 'A guava has gritty particles in its flesh. They are groups of cells with very thick, lignified walls and a narrow cavity. These cells are',
  right: 'sclereids of sclerenchyma',
  wrong: ['cells of collenchyma', 'cells of parenchyma', 'companion cells'],
  sol: 'Stone cells (sclereids) are dead cells of sclerenchyma — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('jute-mcq', mcq({
  stem: 'The long, strong fibres obtained from the jute stem and used for making ropes are mainly',
  right: 'sclerenchyma',
  wrong: ['collenchyma', 'chlorenchyma', 'sieve tube elements'],
  sol: 'Fibres are elongated sclerenchyma cells with lignified walls — option (@K).',
  d: 1, c: 'application', t: [2],
}));
add('aeren-mcq', mcq({
  stem: 'The leaf stalks of a water lily have large air cavities that help them float. The tissue forming them is',
  right: 'parenchyma with large air spaces (aerenchyma)',
  wrong: ['collenchyma with thick corners', 'sclerenchyma with lignified walls', 'xylem with vessels'],
  sol: 'Parenchyma with large air cavities is aerenchyma — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('aphid-mcq', mcq({
  stem: 'An aphid pushes its fine mouthpart into a young stem and sugary sap flows into it. The mouthpart has entered',
  right: 'sieve tube elements of the phloem',
  wrong: ['vessels of the xylem', 'tracheids of the xylem', 'xylem fibres'],
  sol: 'Sugary sap is carried in the sieve tubes of the phloem — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('ck-complex-mcq', mcq({
  stem: 'Which living cell, with a nucleus, lies beside a sieve tube element and controls its working?',
  right: 'Companion cell',
  wrong: ['Vessel', 'Tracheid', 'Phloem fibre'],
  sol: 'The companion cell, which has a nucleus, supports the enucleate sieve tube element — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('ar-coll', ar({
  a: 'Collenchyma gives flexible support to growing parts of a plant.',
  r: 'Collenchyma cells are living and their walls are thickened with cellulose and pectin.',
  key: 'a',
  sol: 'Both are true, and R explains A: the living cells with cellulose-pectin thickening can support yet stretch as the organ grows — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('ar-xylem', ar({
  a: 'Xylem carries water and minerals from the roots to the leaves.',
  r: 'Phloem carries food from the leaves to the other parts of the plant.',
  key: 'b',
  sol: 'Both are true, but R does not explain A: they describe two different tissues — option (b).',
  d: 2, c: 'understanding', t: [2],
}));
add('reason-sieve', short({
  marks: 1,
  stem: 'Give a reason: a sieve tube element stays alive and conducts food although it has no nucleus.',
  model: 'The nucleated companion cell beside it controls its activities.',
  sol: 'Companion cell.',
  scheme: [['Controlled by the companion cell', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('reason-scl', short({
  marks: 1,
  stem: 'Give a reason: sclerenchyma cells are dead at maturity.',
  model: 'Heavy lignin deposition on the walls cuts off the protoplasm from its supplies, so it dies.',
  sol: 'Lignin deposition.',
  scheme: [['Lignin deposit kills the protoplast', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('xylem-short2', short({
  marks: 2,
  stem: 'Name the four elements of xylem and state which of them is living.',
  model: 'The four elements of **xylem** are **tracheids**, **vessels**, **xylem fibres** and **xylem parenchyma**. Of these, the tracheids, vessels and fibres are **dead** at maturity, and only the **xylem parenchyma** is **living**.',
  sol: 'Four elements; the living one.',
  scheme: [['Four elements', 1], ['Living element', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('phloem-short2', short({
  marks: 2,
  stem: 'State the roles of the sieve tube elements and of the companion cells of phloem.',
  model: '**Sieve tube elements** are tubes joined end to end through sieve plates and **conduct food** such as sucrose, although they have no nucleus at maturity. **Companion cells** are nucleated living cells beside them that **control** the sieve tube elements and help in loading and unloading food.',
  sol: 'Conduction; control.',
  scheme: [['Sieve tube elements conduct food', 1], ['Companion cells control them', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('coll-short2', short({
  marks: 2,
  stem: 'Distinguish between collenchyma and sclerenchyma on the nature of the wall and on whether the cells are living.',
  model: 'In **collenchyma** the wall is **unevenly thickened at the corners** with cellulose and pectin, and the cells are **living**. In **sclerenchyma** the wall is **thick and lignified throughout**, and the cells are **dead** at maturity.',
  sol: 'Wall and living state.',
  scheme: [['Collenchyma wall and state', 1], ['Sclerenchyma wall and state', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('simple-short3', short({
  marks: 3,
  stem: 'Describe the structure, the location and the functions of parenchyma.',
  model: '**Parenchyma** is made of living cells that are usually rounded, with **thin cellulose walls** and small intercellular spaces. It is found in the **cortex and pith** of stems and roots, in the **mesophyll** of leaves and in fruits. It **stores food**, carries out **photosynthesis** when it has chloroplasts, and secretes substances.',
  sol: 'Structure, location, function.',
  scheme: [['Structure', 1], ['Location', 1], ['Functions', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('xyl-phl-short3', short({
  marks: 3,
  stem: 'Compare xylem and phloem on three points.',
  model: '**Xylem** conducts **water and minerals** upward from the roots; **phloem** conducts **food** from the leaves to other parts. Xylem is made mainly of **dead** elements (tracheids, vessels, fibres), whereas **most** phloem elements are **living** (sieve tube elements, companion cells, parenchyma). Xylem has **vessels and tracheids**; phloem has **sieve tubes with sieve plates**.',
  sol: 'Three points of comparison.',
  scheme: [['Substance conducted', 1], ['Living or dead elements', 1], ['Characteristic elements', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('vessels-num', num({
  stem: `A dicot stem has a ring of ${RING2.bundles} bundles, each with ${RING2.vessels} vessels and ${RING2.sieve} sieve tube elements. How many vessels are there in the ring?`,
  value: RING2_VESSELS,
  sol: r`$${RING2.bundles} \times ${RING2.vessels} = ${RING2_VESSELS}$.`,
  scheme: [[`${RING2_VESSELS}`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 105 || 'value');
add('aphid-num', num({
  stem: `An aphid taking sap from the phloem of a stem collects ${APHID.ulPerHour} microlitres of sap every hour. How many microlitres does it collect in ${APHID.hours} hours?`,
  value: APHID_SAP,
  sol: r`$${APHID.ulPerHour} \times ${APHID.hours} = ${APHID_SAP}$ microlitres.`,
  scheme: [[`${APHID_SAP}`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => q.answer.value === 54 || 'value');
add('guava-num', num({
  stem: `A sample of guava flesh has ${GUAVA.clusters} clusters of stone cells, each with ${GUAVA.cells} cells. How many stone cells does the sample have?`,
  value: GUAVA_CELLS,
  sol: r`$${GUAVA.clusters} \times ${GUAVA.cells} = ${GUAVA_CELLS}$.`,
  scheme: [[`${GUAVA_CELLS}`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 450 || 'value');
add('tissue-long', long({
  stem: '(a) Compare parenchyma, collenchyma and sclerenchyma in the nature of the wall and in function. [3]\n(b) Name the two complex tissues of a plant and say which element of each is living. [2]',
  model: '(a) **Parenchyma** has **thin cellulose** walls and stores food or photosynthesises. **Collenchyma** has walls **thickened at the corners** with cellulose and pectin and gives **flexible support**. **Sclerenchyma** has **thick lignified** walls, is dead, and gives **mechanical strength**.\n\n(b) The complex tissues are **xylem** and **phloem**. In xylem the **parenchyma** is living; in phloem the **sieve tube elements, companion cells and parenchyma** are living.',
  sol: 'Three simple tissues; xylem and phloem.',
  scheme: [['(a) Parenchyma', 1], ['(a) Collenchyma', 1], ['(a) Sclerenchyma', 1], ['(b) Xylem and phloem named', 1], ['(b) Living elements', 1]],
  wl: [60, 200],
  d: 2, c: 'understanding', t: [2],
}));
// ---------------------------------------------------------------- t03 tissue systems
add('ck-system-mcq', mcq({
  stem: 'The pith of a stem belongs to the',
  right: 'ground tissue system',
  wrong: ['epidermal tissue system', 'vascular tissue system', 'cambial tissue system'],
  sol: 'Pith, cortex and medullary rays are ground tissue — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('epi-mcq', mcq({
  stem: 'Which pair of structures belongs to the epidermal tissue system?',
  right: 'Stomata and root hairs',
  wrong: ['Cortex and pith', 'Xylem and phloem', 'Cambium and pericycle'],
  sol: 'Stomata, root hairs, trichomes and the cuticle belong to the epidermal system — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('bundle-mcq', mcq({
  stem: 'In the vascular bundles of a stem the xylem and phloem lie on the same radius. Such bundles are called',
  right: 'conjoint',
  wrong: ['radial', 'closed', 'concentric only'],
  sol: 'Xylem and phloem on the same radius make a conjoint bundle — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('system-short2', short({
  marks: 2,
  stem: 'Name the three tissue systems of a flowering plant and give two parts of the ground tissue system of a stem.',
  model: 'The three tissue systems are the **epidermal**, **ground** and **vascular** tissue systems. The ground tissue system of a stem includes the **cortex**, the **pericycle**, the **pith** and the **medullary rays**.',
  sol: 'Three systems; two parts.',
  scheme: [['Three systems', 1], ['Two ground tissue parts', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('bundle-short2', short({
  marks: 2,
  stem: 'Distinguish between radial and conjoint vascular bundles, with the organ in which each is found.',
  model: 'In a **radial** bundle the xylem and phloem lie on **different radii**, alternating with each other, as in **roots**. In a **conjoint** bundle they lie together on the **same radius**, as in **stems and leaves**.',
  sol: 'Arrangement and organ.',
  scheme: [['Radial with organ', 1], ['Conjoint with organ', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('epidermal-short3', short({
  marks: 3,
  stem: 'Describe the epidermal tissue system, naming three structures that belong to it and one role of each.',
  model: 'The **epidermis** is usually a single layer of closely packed cells with a waxy **cuticle** that **reduces water loss**. **Stomata**, each with two guard cells, allow **gas exchange and transpiration**. **Root hairs**, outgrowths of the root epidermis, **absorb water and minerals**, and **trichomes** on the shoot reduce water loss or protect.',
  sol: 'Epidermis, stomata, root hairs.',
  scheme: [['Epidermis and cuticle', 1], ['Stomata', 1], ['Root hairs or trichomes', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 roots and stems
add('ck-root-mcq', mcq({
  stem: 'A transverse section of a root shows eight xylem arms alternating with eight phloem patches, and a large pith. The root is',
  right: 'a monocot root',
  wrong: ['a dicot root', 'a dicot stem', 'a monocot stem'],
  sol: 'More than six xylem arms and a large pith are features of a monocot root — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('endo-mcq', mcq({
  stem: 'In a transverse section of a root, bands of suberin on the radial walls of a single layer of barrel-shaped cells make water pass through their cytoplasm. This layer is the',
  right: 'endodermis, with Casparian strips',
  wrong: ['epiblema, with root hairs', 'pericycle, with lateral root primordia', 'hypodermis, with collenchyma'],
  sol: 'Casparian strips are bands in the walls of the endodermis — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('pericycle-mcq', mcq({
  stem: 'Lateral roots arise from the',
  right: 'pericycle',
  wrong: ['epiblema', 'cortex', 'endodermis'],
  sol: 'The pericycle, a layer inside the endodermis, gives rise to lateral roots — option (@K).',
  d: 2, c: 'recall', t: [4],
}));
add('exarch-mcq', mcq({
  stem: 'In a transverse section of a root, the first-formed xylem elements (protoxylem) lie',
  right: 'towards the periphery, next to the pericycle',
  wrong: ['towards the centre, next to the pith', 'in the cortex', 'between the phloem and the epiblema'],
  sol: 'Root xylem is exarch: protoxylem outwards, metaxylem inwards — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('ck-stem-mcq', mcq({
  stem: 'A transverse section of a stem shows many vascular bundles scattered through the ground tissue, each without cambium. The stem is',
  right: 'a monocot stem',
  wrong: ['a dicot stem', 'a dicot root', 'a monocot root'],
  sol: 'Scattered closed bundles belong to a monocot stem — option (@K).',
  d: 1, c: 'application', t: [4],
}));
add('cambium-mcq', mcq({
  stem: 'In a stem section each vascular bundle has phloem outside, xylem inside and a thin strip of dividing cells between them. The bundle is',
  right: 'conjoint and open',
  wrong: ['conjoint and closed', 'radial and open', 'radial and closed'],
  sol: 'A conjoint bundle with cambium is open — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('cane-mcq', mcq({
  stem: 'A section of a sugarcane stem shows no cortex, no medullary rays and no pith, with sclerenchymatous sheaths around the bundles. These features show that the stem is',
  right: 'monocot',
  wrong: ['dicot', 'a root', 'a gymnosperm stem'],
  sol: 'Undifferentiated ground tissue and sclerenchymatous bundle sheaths indicate a monocot stem — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('stem-fig1-mcq', mcq({
  stem: 'In the lettered figure of a stem section, the layer that gives flexible support just below the epidermis is marked',
  right: 'A',
  wrong: ['B', 'C', 'E'],
  sol: 'A is the hypodermis of collenchyma — option (@K).',
  d: 2, c: 'application', t: [4],
  assets: [stemFig],
}));
add('stem-fig2-mcq', mcq({
  stem: 'In the same figure, the tissue that carries food from the leaves to the stem is marked',
  right: 'C',
  wrong: ['A', 'D', 'E'],
  sol: 'C is the phloem — option (@K).',
  d: 2, c: 'application', t: [4],
  assets: [stemFig],
}));
add('stem-fig3-mcq', mcq({
  stem: 'In the same figure, the large central region marked E, made of rounded thin-walled cells, is the',
  right: 'pith',
  wrong: ['cortex', 'pericycle', 'medullary ray'],
  sol: 'E is the pith, ground tissue at the centre of the stem — option (@K).',
  d: 1, c: 'application', t: [4],
  assets: [stemFig],
}));
add('stem-fig4-mcq', mcq({
  stem: 'In the same figure, the first-formed elements (protoxylem) of the tissue marked D lie towards',
  right: 'E',
  wrong: ['A', 'B', 'C'],
  sol: 'In a dicot stem the xylem is endarch, with the protoxylem towards the pith, E — option (@K).',
  d: 3, c: 'analysis', t: [4],
  assets: [stemFig],
}));
add('pith-tf', tf({
  stem: 'A monocot root usually has a large, well-developed pith.',
  key: 't',
  sol: 'True: a large pith is a feature of the monocot root.',
  d: 1, c: 'recall', t: [4],
}));
add('casp-fill', fill({
  stem: 'The bands of suberin on the radial walls of the cells of the endodermis are called ______ strips.',
  acc: [['Casparian', 'casparian']],
  sol: 'Casparian.',
  d: 1, c: 'recall', t: [4],
}));
add('organ-match', match({
  stem: 'Match each organ (column I) with its feature (column II).',
  pairs: [['Dicot stem', 'Conjoint, open bundles in a ring'], ['Monocot stem', 'Scattered closed bundles'], ['Dicot root', 'Two to four xylem arms'], ['Monocot root', 'Large pith and many xylem arms']],
  order: [2, 0, 3, 1],
  sol: 'Dicot stem: open bundles in a ring; monocot stem: scattered closed bundles; dicot root: two to four arms; monocot root: large pith.',
  d: 2, c: 'understanding', t: [4],
}));
add('ar-mstem', ar({
  a: 'The vascular bundles of a monocot stem are closed.',
  r: 'There is no cambium between the xylem and the phloem of the bundles of a monocot stem.',
  key: 'a',
  sol: 'Both are true, and R explains A: a bundle without cambium is called closed — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('reason-endo', short({
  marks: 1,
  stem: 'Give a reason: water entering the vascular cylinder of a root must pass through the cytoplasm of endodermal cells.',
  model: 'The Casparian strips of suberin on their radial walls are waterproof, so water cannot pass between the cells.',
  sol: 'Casparian strips.',
  scheme: [['Waterproof Casparian strips on radial walls', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('reason-mstem', short({
  marks: 1,
  stem: 'Give a reason: a monocot stem cannot increase in girth in the way a dicot stem does.',
  model: 'Its vascular bundles are closed and have no cambium, so there is no lateral meristem to add new tissue.',
  sol: 'No cambium.',
  scheme: [['No cambium in closed bundles', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('root-short2', short({
  marks: 2,
  stem: 'State two anatomical differences between a dicot root and a monocot root.',
  model: 'A **dicot root** has **two to four** xylem arms (di- to tetrarch), whereas a **monocot root** has **more than six** (polyarch). The **pith** is **small or absent** in a dicot root and **large and well developed** in a monocot root. A dicot root also shows secondary growth, which a monocot root lacks.',
  sol: 'Two differences.',
  scheme: [['Xylem arms', 1], ['Pith or secondary growth', 1]],
  d: 1, c: 'understanding', t: [4],
}));
add('stem-short2', short({
  marks: 2,
  stem: 'State two differences between the vascular bundles of a dicot stem and those of a monocot stem.',
  model: 'In a **dicot stem** the bundles are arranged **in a ring** and are **open**, with cambium between the xylem and phloem. In a **monocot stem** the bundles are **scattered** through the ground tissue and are **closed**, with no cambium; each is also surrounded by a sclerenchymatous sheath.',
  sol: 'Arrangement and type.',
  scheme: [['Arrangement', 1], ['Open and closed', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('endo-short2', short({
  marks: 2,
  stem: 'What are Casparian strips? State their role in the root.',
  model: '**Casparian strips** are bands of **suberin** on the radial and transverse walls of the cells of the **endodermis**. They are **waterproof**, so water and minerals cannot move between the cells and must pass **through their cytoplasm**, which controls what enters the vascular cylinder.',
  sol: 'Definition; role.',
  scheme: [['Suberin bands in the endodermis', 1], ['Force water through the cytoplasm', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('dstem-short3', short({
  marks: 3,
  stem: 'Describe the arrangement of the tissues, from the outside inwards, in a transverse section of a dicot stem up to the vascular bundles.',
  model: 'The outermost layer is the **epidermis**, often with trichomes and a cuticle. Below it is the **hypodermis** of several layers of **collenchyma**. Next comes the **cortex** of **parenchyma**, and its innermost layer is the **endodermis**, rich in starch grains (starch sheath). Inside it the **pericycle**, often patches of **sclerenchyma**, lies outside the vascular bundles.',
  sol: 'Layers in order.',
  scheme: [['Epidermis and hypodermis', 1], ['Cortex', 1], ['Endodermis and pericycle', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('mstem-short3', short({
  marks: 3,
  stem: 'List three anatomical features of a monocot stem as seen in transverse section.',
  model: 'A monocot stem has a **sclerenchymatous hypodermis** below the epidermis. Its **ground tissue** is not differentiated into cortex, pericycle, medullary rays and pith. The **vascular bundles** are **many and scattered**, smaller near the periphery, each **conjoint and closed** with a sclerenchymatous sheath, and **phloem parenchyma is absent**.',
  sol: 'Three features.',
  scheme: [['Hypodermis', 1], ['Undifferentiated ground tissue', 1], ['Scattered closed bundles', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('root-short3', short({
  marks: 3,
  stem: 'Describe the layers of a dicot root, from the outside inwards, up to the pericycle.',
  model: 'The outer layer is the **epiblema**, whose cells bear **root hairs**. Below it is the wide **cortex** of thin-walled **parenchyma** cells with intercellular spaces. Its innermost layer is the **endodermis**, a ring of barrel-shaped cells with **Casparian strips** on the radial walls. Next comes the **pericycle**, a layer of thin-walled cells from which lateral roots arise.',
  sol: 'Layers in order.',
  scheme: [['Epiblema', 1], ['Cortex and endodermis', 1], ['Pericycle', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('stemcomp-short3', short({
  marks: 3,
  stem: 'A student has two stem sections, X with a ring of bundles and a large pith and Y with scattered bundles and no pith. Identify each section and give three further differences between the two stems.',
  model: '**X** is a **dicot** stem and **Y** a **monocot** stem. In X the hypodermis is **collenchymatous**, the bundles are **open** (with cambium) and **medullary rays** are present; in Y the hypodermis is **sclerenchymatous**, the bundles are **closed** (no cambium) and the ground tissue is **not differentiated**, with no medullary rays.',
  sol: 'Identification; three differences.',
  scheme: [['X and Y identified', 1], ['Hypodermis and bundle type', 1], ['Medullary rays or ground tissue', 1]],
  d: 3, c: 'application', t: [4],
}));
add('wheat-num', num({
  stem: `A monocot root has ${ROOT10.xylem} xylem arms with an equal number of phloem patches alternating with them. How many strands of vascular tissue does it have in all?`,
  value: ROOT10_STRANDS,
  sol: r`$${ROOT10.xylem} + ${ROOT10.xylem} = ${ROOT10_STRANDS}$.`,
  scheme: [[`${ROOT10_STRANDS}`, 1]],
  d: 2, c: 'application', t: [4],
}), (q) => q.answer.value === 20 || 'value');
add('triarch-num', num({
  stem: `A dicot root has ${TRIARCH.arms} xylem arms. How many strands of xylem and phloem together does a transverse section show?`,
  value: TRIARCH_STRANDS,
  sol: r`$${TRIARCH.arms} \times 2 = ${TRIARCH_STRANDS}$.`,
  scheme: [[`${TRIARCH_STRANDS}`, 1]],
  d: 1, c: 'application', t: [4],
}), (q) => q.answer.value === 6 || 'value');
add('pith-num', num({
  stem: `In a transverse section of a stem the section has a radius of ${SECTION2.r} mm and the pith has a radius of ${SECTION2.pith} mm. What percentage of the area of the section is occupied by the pith?`,
  value: PITH2_PCT, tol: 0.01, unit: '%',
  sol: r`$(${SECTION2.pith} \div ${SECTION2.r})^2 \times 100 = ${PITH2_PCT}$ percent.`,
  scheme: [[`${PITH2_PCT}`, 1]],
  d: 3, c: 'application', t: [4],
}), (q) => q.answer.value === 6.25 || 'value');
add('cane-num', num({
  stem: `A sugarcane stem section shows ${CANE.bundles} vascular bundles. One bundle in every four is small and peripheral and the rest are central. How many central bundles are there?`,
  value: CANE_CENTRAL,
  sol: r`Peripheral $= 40 \div 4 = 10$; central $= 40 - 10 = ${CANE_CENTRAL}$.`,
  scheme: [[`${CANE_CENTRAL}`, 1]],
  d: 2, c: 'application', t: [4],
}), (q) => q.answer.value === 30 || 'value');
add('dstem-long', long({
  stem: '(a) Draw a labelled diagram of a transverse section of a dicot stem, naming at least six parts. [3]\n(b) State two differences between this stem and a monocot stem. [2]',
  model: '(a) A circular section: **epidermis**, **hypodermis** (collenchyma), **cortex** (parenchyma), **endodermis**, **pericycle**, **vascular bundles in a ring** each with **phloem** outside, **cambium** and **xylem** inside, **medullary rays** and a **pith**; all labelled.\n\n(b) The dicot stem has bundles **in a ring** and **open** (cambium present); the monocot stem has bundles **scattered** and **closed**. The dicot hypodermis is **collenchymatous**, the monocot **sclerenchymatous**.',
  sol: 'Labelled T.S.; two differences.',
  scheme: [['(a) Layers in order', 1], ['(a) Bundle drawn', 1], ['(a) Six parts labelled', 1], ['(b) First difference', 1], ['(b) Second difference', 1]],
  wl: [60, 200],
  d: 2, c: 'understanding', t: [4],
}));
add('mstem-long', long({
  stem: '(a) Draw a labelled diagram of a transverse section of a monocot stem, naming at least five parts. [3]\n(b) Explain why the stem does not show secondary growth. [2]',
  model: '(a) A circular section: **epidermis**, **sclerenchymatous hypodermis**, **ground tissue** of parenchyma, and many **scattered vascular bundles**, smaller near the edge, each with a **sclerenchymatous sheath**, **xylem** inside and **phloem** outside; all labelled.\n\n(b) The bundles are **closed** and have **no cambium** between xylem and phloem. Without a lateral meristem there is no new vascular tissue added, so the stem **cannot thicken** by secondary growth.',
  sol: 'Labelled T.S.; no secondary growth.',
  scheme: [['(a) Layers and bundles drawn', 1], ['(a) Five parts labelled', 2], ['(b) Closed bundles, no cambium', 1], ['(b) No girth growth', 1]],
  wl: [60, 200],
  d: 2, c: 'understanding', t: [4],
}));
add('droot-long', long({
  stem: '(a) Draw a labelled diagram of a transverse section of a dicot root, naming at least six parts. [3]\n(b) State two differences between it and a monocot root. [2]',
  model: '(a) A circular section: **epiblema** with **root hairs**, **cortex**, **endodermis** with **Casparian strips**, **pericycle**, **xylem arms** (two to four) alternating with **phloem** patches, **conjunctive tissue** and a very small **pith**; all labelled.\n\n(b) A dicot root has **two to four** xylem arms and a **small or absent pith**; a monocot root has **more than six** arms and a **large pith**.',
  sol: 'Labelled T.S.; two differences.',
  scheme: [['(a) Layers in order', 1], ['(a) Vascular cylinder drawn', 1], ['(a) Six parts labelled', 1], ['(b) Xylem arms', 1], ['(b) Pith', 1]],
  wl: [60, 200],
  d: 2, c: 'understanding', t: [4],
}));
add('anat-d4-mcq', mcq({
  stem: 'A student writes four statements about stem sections: (i) a monocot stem has a ring of open bundles; (ii) a dicot stem has bundles in a ring; (iii) a dicot stem has a hypodermis of collenchyma; (iv) a dicot root has a large pith. Which statements are correct?',
  right: '(ii) and (iii) only',
  wrong: ['(i) and (iv) only', '(i), (ii) and (iii) only', '(ii), (iii) and (iv) only'],
  sol: 'A monocot stem has scattered closed bundles, so (i) is wrong; a dicot root has a small pith, so (iv) is wrong; (ii) and (iii) are correct — option (@K).',
  d: 4, c: 'analysis', t: [4],
}));

// ---------------------------------------------------------------- t05 leaves
add('ck-leaf-mcq', mcq({
  stem: 'In a section of a leaf the mesophyll is a single kind of loosely packed cell and groups of large thin-walled cells lie in the upper epidermis. The leaf is',
  right: 'isobilateral, from a monocot',
  wrong: ['dorsiventral, from a dicot', 'isobilateral, from a dicot', 'dorsiventral, from a monocot'],
  sol: 'Undifferentiated mesophyll and bulliform cells indicate an isobilateral monocot leaf — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('leaf-fig1-mcq', mcq({
  stem: 'In the lettered figure of a leaf section, most photosynthesis takes place in the layer marked',
  right: 'B',
  wrong: ['A', 'C', 'E'],
  sol: 'B is the palisade parenchyma, rich in chloroplasts and placed under the upper epidermis — option (@K).',
  d: 2, c: 'application', t: [5],
  assets: [leafFig],
}));
add('leaf-fig2-mcq', mcq({
  stem: 'In the same figure, water brought by the vein to the leaf flows in the tissue marked',
  right: 'D',
  wrong: ['A', 'B', 'C'],
  sol: 'D is the xylem of the bundle — option (@K).',
  d: 2, c: 'application', t: [5],
  assets: [leafFig],
}));
add('leaf-fig3-mcq', mcq({
  stem: 'In the same figure, the pair of bean-shaped cells marked E controls',
  right: 'the opening of the pore for gas exchange and loss of water vapour',
  wrong: ['the conduction of food', 'the storage of starch in the leaf', 'the support of the blade'],
  sol: 'E is a guard cell; guard cells open and close the stoma — option (@K).',
  d: 2, c: 'application', t: [5],
  assets: [leafFig],
}));
add('palisade-mcq', mcq({
  stem: 'In a section of a leaf a student finds the tall, tightly packed cells with the most chloroplasts just below the',
  right: 'upper epidermis',
  wrong: ['lower epidermis', 'bundle sheath', 'guard cells'],
  sol: 'Palisade parenchyma lies just below the upper epidermis — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('bulliform-mcq', mcq({
  stem: 'In dry weather the blade of a grass leaf rolls inwards, reducing water loss. This movement is brought about by the loss of water from',
  right: 'bulliform cells',
  wrong: ['guard cells only', 'palisade cells', 'sieve tube elements'],
  sol: 'Large thin-walled bulliform cells of the upper epidermis lose water and become flaccid, so the blade rolls — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('dorsi-mcq', mcq({
  stem: 'A leaf has most of its stomata on the lower surface, tall palisade cells below the upper epidermis and spongy tissue below them. It is',
  right: 'dorsiventral',
  wrong: ['isobilateral', 'a needle leaf', 'a leaf without mesophyll'],
  sol: 'Palisade and spongy mesophyll with more stomata below mark a dorsiventral leaf — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('ar-leaf', ar({
  a: 'The mesophyll of a monocot leaf is differentiated into palisade and spongy tissue.',
  r: 'Monocot leaves have stomata only on the lower surface.',
  key: 'd',
  sol: 'Both are false: the mesophyll of a monocot leaf is not differentiated, and stomata are found on both surfaces — option (d).',
  d: 3, c: 'understanding', t: [5],
}));
add('reason-palisade', short({
  marks: 1,
  stem: 'Give a reason: the palisade cells are placed just below the upper epidermis of a dicot leaf.',
  model: 'Light falls on the upper surface, so the chloroplast-rich palisade cells get the most light for photosynthesis.',
  sol: 'Light.',
  scheme: [['Most light reaches them', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('reason-spongy', short({
  marks: 1,
  stem: 'Give a reason: the spongy parenchyma of a leaf has large air spaces.',
  model: 'The spaces allow gases such as carbon dioxide and oxygen to move quickly between the stomata and the cells.',
  sol: 'Gas exchange.',
  scheme: [['Gas exchange', 1]],
  d: 1, c: 'understanding', t: [5],
}));
add('guard-short2', short({
  marks: 2,
  stem: 'Describe a stoma and state its function.',
  model: 'A **stoma** is a minute **pore** in the epidermis of a leaf, bounded by two bean-shaped **guard cells** that contain chloroplasts. It lies over a **sub-stomatal cavity**. Stomata allow **exchange of gases** and the **loss of water vapour** in transpiration, and the guard cells open and close the pore.',
  sol: 'Structure; function.',
  scheme: [['Pore with two guard cells', 1], ['Gas exchange and transpiration', 1]],
  d: 1, c: 'understanding', t: [5],
}));
add('dleaf-short3', short({
  marks: 3,
  stem: 'Describe the mesophyll of a dicot leaf and the position of its vascular bundles.',
  model: 'The **mesophyll** has two parts. The **palisade parenchyma** is a layer of tall, closely packed cells with many chloroplasts under the upper epidermis. The **spongy parenchyma** below is made of loosely arranged rounded cells with large **air spaces**. The **vascular bundles** lie in the mesophyll, each with a **bundle sheath**, the xylem towards the upper surface and the phloem towards the lower.',
  sol: 'Palisade; spongy; bundle.',
  scheme: [['Palisade', 1], ['Spongy', 1], ['Bundle with sheath and position', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('mleaf-short3', short({
  marks: 3,
  stem: 'Describe three anatomical features of a monocot leaf as seen in a vertical section.',
  model: 'The **epidermis** on both surfaces is similar and carries **stomata on both**. Groups of large thin-walled **bulliform cells** lie in the upper epidermis and help the leaf to roll. The **mesophyll** is **not differentiated** into palisade and spongy tissue, and the **vascular bundles** run parallel, each with a sheath.',
  sol: 'Three features.',
  scheme: [['Epidermis and stomata', 1], ['Bulliform cells', 1], ['Mesophyll undifferentiated', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('leafcomp-short3', short({
  marks: 3,
  stem: 'A student has a leaf of mango and a leaf of paddy. Explain how a section of each would differ in the mesophyll, the distribution of stomata and the epidermis of the upper surface.',
  model: 'In the **mango** (dicot) leaf the mesophyll has **palisade and spongy** layers, stomata lie **mostly on the lower** surface, and the upper epidermis has no special large cells. In the **paddy** (monocot) leaf the mesophyll is **not differentiated**, stomata are about **equal on both** surfaces, and the upper epidermis has **bulliform cells**.',
  sol: 'Three differences with plants.',
  scheme: [['Mesophyll', 1], ['Stomata', 1], ['Upper epidermis', 1]],
  d: 2, c: 'application', t: [5],
}));
add('stomata-num', num({
  stem: `The lower surface of a leaf has an area of ${LEAF2.areaCm2} square centimetres and carries ${LEAF2.perMm2} stomata per square millimetre. How many stomata are on this surface?`,
  value: LEAF2_STOMATA,
  sol: r`${LEAF2.areaCm2} cm² $= ${LEAF2.areaCm2 * 100}$ mm²; $${LEAF2.perMm2} \times ${LEAF2.areaCm2 * 100} = ${LEAF2_STOMATA}$.`,
  scheme: [[`${LEAF2_STOMATA}`, 1]],
  d: 3, c: 'application', t: [5],
}), (q) => q.answer.value === 720000 || 'value');
add('dleaf-long', long({
  stem: '(a) Draw a labelled diagram of a vertical section of a dicot leaf, naming at least six parts. [3]\n(b) State two ways in which a monocot leaf differs. [2]',
  model: '(a) **Upper epidermis** with cuticle; **palisade parenchyma**; **spongy parenchyma** with air spaces; **vascular bundle** with **xylem** on the upper side, **phloem** below and a **bundle sheath**; **lower epidermis** with a **stoma** and **guard cells**; all labelled.\n\n(b) A monocot leaf has **mesophyll not differentiated** into palisade and spongy tissue, **stomata on both** surfaces and **bulliform cells** in the upper epidermis.',
  sol: 'Labelled V.S.; two differences.',
  scheme: [['(a) Layers in order', 1], ['(a) Bundle drawn', 1], ['(a) Six parts labelled', 1], ['(b) First difference', 1], ['(b) Second difference', 1]],
  wl: [60, 200],
  d: 2, c: 'understanding', t: [5],
}));
add('mleaf-long', long({
  stem: '(a) Draw a labelled diagram of a vertical section of a monocot leaf, naming at least five parts. [3]\n(b) Explain how bulliform cells help the leaf in dry weather. [2]',
  model: '(a) **Upper and lower epidermis** with **stomata** on both; groups of **bulliform cells** in the upper epidermis; undifferentiated **mesophyll**; **vascular bundles** with **bundle sheath**, **xylem** and **phloem**; all labelled.\n\n(b) In dry weather the **bulliform cells lose water** and become flaccid, so the upper surface **shrinks** and the blade **rolls inwards**, which **reduces** the surface exposed and so the loss of **water vapour**.',
  sol: 'Labelled V.S.; bulliform cells.',
  scheme: [['(a) Layers drawn', 1], ['(a) Five parts labelled', 2], ['(b) Cells lose water', 1], ['(b) Leaf rolls, reducing loss', 1]],
  wl: [60, 200],
  d: 2, c: 'understanding', t: [5],
}));
