// ISC 11 Biology ch08 Anatomy of Flowering Plants — Part 1 (t01 meristems, t02 permanent tissues, t03 tissue systems),
// Part 2 (t04 roots and stems, t05 leaves).
import { sl, deck, table, flow, svgV } from '../../isc-11-biology-ch01/src/lib.mjs';
import { MERISTEMS, SIMPLE_TISSUES, VASCULAR, DICOT_ROOT, MONOCOT_ROOT, DICOT_STEM, MONOCOT_STEM, DICOT_LEAF, MONOCOT_LEAF } from './svgs.mjs';
import { DIV, DIVISIONS, CELLS_AFTER, BAMBOO, BAMBOO_GROWTH, RING, RING_VESSELS, RING_SIEVE, N_DEAD_XYLEM, N_DEAD_PHLOEM, N_DEAD_ALL, WHEAT, WHEAT_STRANDS, SECTION, PITH_AREA_PCT, MANGO, MANGO_STOMATA, PADDY, PADDY_STOMATA } from './calc.mjs';

export const V = {
  mer: svgV(MERISTEMS, 'Apical, intercalary and lateral meristems'),
  simple: svgV(SIMPLE_TISSUES, 'Parenchyma, collenchyma and sclerenchyma in transverse section'),
  vasc: svgV(VASCULAR, 'Elements of xylem and phloem'),
  droot: svgV(DICOT_ROOT, 'Transverse section of a dicot root'),
  mroot: svgV(MONOCOT_ROOT, 'Transverse section of a monocot root'),
  dstem: svgV(DICOT_STEM, 'Transverse section of a dicot stem'),
  mstem: svgV(MONOCOT_STEM, 'Transverse section of a monocot stem'),
  dleaf: svgV(DICOT_LEAF, 'Vertical section of a dicot leaf'),
  mleaf: svgV(MONOCOT_LEAF, 'Vertical section of a monocot leaf'),
};

export const deck1 = deck({
  part: 1,
  title: 'Anatomy of Flowering Plants — Part 1: Meristems, permanent tissues and tissue systems',
  goals: [
    'Classify meristems as apical, intercalary and lateral and state their roles',
    'Compare parenchyma, collenchyma and sclerenchyma and name the elements of xylem and phloem',
    'Describe the epidermal, ground and vascular tissue systems',
  ],
  slides: [
    sl('title', 'Anatomy of flowering plants', {
      b: 'Part 1 — how a plant grows, and the tissues that make up its body.',
      v: flow('LR', [['m', 'Meristematic tissue'], ['p', 'Permanent tissues'], ['s', 'Tissue systems'], ['o', 'Organs']], [['m', 'p'], ['p', 's'], ['s', 'o']], 'Meristematic tissue gives permanent tissues, which form tissue systems and organs'),
      n: 'Anatomy is the study of internal structure. A plant starts as dividing cells in meristems. These cells mature into permanent tissues, the tissues are grouped into three tissue systems, and the systems make up roots, stems and leaves.',
    }),
    sl('concept', 'Meristematic tissue', {
      b: '**Meristems** are regions of cells that keep dividing. Their cells are small, thin-walled and closely packed, with dense cytoplasm, a large nucleus and very small vacuoles.',
      v: table(['Feature of meristematic cells', 'Reason'], [['Dense cytoplasm, large nucleus', 'Active division and growth'], ['Thin cell wall', 'Easy to divide and to expand'], ['Very small or no vacuoles', 'Cell is actively making new material'], ['No intercellular spaces', 'Cells are packed tightly']], 'Table of the characteristics of meristematic cells with reasons'),
      n: 'A meristematic cell is built for dividing. It has dense cytoplasm and a big nucleus, a thin wall, hardly any vacuole, and no gaps between neighbouring cells.',
    }),
    sl('diagram', 'Apical, intercalary and lateral meristems', {
      b: 'By origin, meristems are **primary** (apical and intercalary) or **secondary** (lateral). By position: **apical** at tips, **intercalary** between mature tissues, **lateral** along the sides.',
      v: V.mer,
      n: 'Apical meristems at the tips of roots and shoots make the plant longer. Intercalary meristems, found at the base of leaves and above the nodes of grasses, also add length. Lateral meristems, the vascular cambium and cork cambium, add to the girth of the stem and root.',
    }),
    sl('check', 'Quick check: meristems', {
      b: 'Which meristem is responsible for the increase in thickness of a stem?',
      n: 'Quick check. Does the tissue add length or girth?',
      chk: 'ck-meristem-mcq',
    }),
    sl('example', 'Worked example 1: growth from meristems', {
      b: `(a) The cells of an apical meristem divide every ${DIV.hours} hours. Starting from one cell, how many cells are there after ${DIV.spanHours} hours? (b) An intercalary meristem at the base of a bamboo internode adds ${BAMBOO.cmPerDay} cm a day. How much length is added in ${BAMBOO.days} days?`,
      ul: [
        `(a) Divisions = ${DIV.spanHours} ÷ ${DIV.hours} = ${DIVISIONS}. Each division doubles the cells, so 2^${DIVISIONS} = **${CELLS_AFTER}** cells.`,
        `(b) ${BAMBOO.cmPerDay} × ${BAMBOO.days} = **${BAMBOO_GROWTH} cm**.`,
      ],
      v: table(['Part', 'Working', 'Answer'], [['(a)', `${DIV.spanHours} ÷ ${DIV.hours} = ${DIVISIONS} divisions; 2^${DIVISIONS}`, `${CELLS_AFTER} cells`], ['(b)', `${BAMBOO.cmPerDay} × ${BAMBOO.days}`, `${BAMBOO_GROWTH} cm`]], `Worked table: ${CELLS_AFTER} cells and ${BAMBOO_GROWTH} centimetres`),
      n: 'First find the number of divisions by dividing the time by the interval. Every division doubles the number of cells, so six divisions give sixty-four cells. For the bamboo, multiply the daily growth by the number of days.',
    }),
    sl('diagram', 'Simple permanent tissues', {
      b: 'Permanent tissues have stopped dividing. **Simple** tissues are made of one kind of cell.',
      v: V.simple,
      n: 'Parenchyma has thin-walled living cells with spaces between them. Collenchyma has living cells with thick corners. Sclerenchyma has dead cells with thick lignified walls and a very narrow cavity.',
    }),
    sl('concept', 'Parenchyma, collenchyma and sclerenchyma compared', {
      b: 'Compare wall, living or dead state, location and function.',
      v: table(['Tissue', 'Wall', 'Cells', 'Location', 'Function'], [['Parenchyma', 'Thin, cellulose', 'Living', 'Cortex, pith, mesophyll, fruit pulp', 'Storage, photosynthesis, secretion'], ['Collenchyma', 'Thickened at the corners with cellulose and pectin', 'Living', 'Below the epidermis of dicot stems and leaf stalks', 'Support to growing parts'], ['Sclerenchyma', 'Thick, lignified', 'Dead', 'Fibres in stems, stone cells in fruits and seed coats', 'Mechanical strength']], 'Table comparing parenchyma, collenchyma and sclerenchyma'),
      n: 'Parenchyma stores food and carries out photosynthesis. Collenchyma gives flexible support to young stems and leaf stalks. Sclerenchyma is dead and rigid, and gives strength, as in fibres and in the gritty stone cells of fruits.',
    }),
    sl('diagram', 'Complex tissues: xylem and phloem', {
      b: '**Complex** tissues have more than one kind of cell working together. Xylem carries water and minerals; phloem carries food.',
      v: V.vasc,
      n: 'Xylem has tracheids, vessels, fibres and parenchyma. All but the parenchyma are dead. Phloem has sieve tube elements, companion cells, parenchyma and fibres. The sieve tube elements have no nucleus, and the companion cells beside them have one.',
    }),
    sl('concept', 'Elements of xylem and phloem', {
      b: 'Each element has a job, and most xylem elements are dead.',
      v: table(['Tissue', 'Element', 'Living or dead', 'Function'], [['Xylem', 'Tracheid', 'Dead', 'Conducts water'], ['Xylem', 'Vessel', 'Dead', 'Conducts water in long tubes'], ['Xylem', 'Fibre', 'Dead', 'Support'], ['Xylem', 'Parenchyma', 'Living', 'Stores food; helps lateral conduction'], ['Phloem', 'Sieve tube element', 'Living, no nucleus', 'Conducts food'], ['Phloem', 'Companion cell', 'Living', 'Controls the sieve tube'], ['Phloem', 'Parenchyma', 'Living', 'Stores food'], ['Phloem', 'Fibre', 'Dead', 'Support']], 'Table of the elements of xylem and phloem'),
      n: 'Remember which elements are dead. In xylem the tracheids, vessels and fibres are dead; only the parenchyma lives. In phloem only the fibres are dead. The sieve tube element lives without a nucleus, with help from its companion cell.',
    }),
    sl('check', 'Quick check: complex tissues', {
      b: 'Which cell controls the working of a sieve tube element?',
      n: 'Quick check. Which neighbouring living cell has a nucleus?',
      chk: 'ck-complex-mcq',
    }),
    sl('example', 'Worked example 2: counting vascular elements', {
      b: `A dicot stem has a ring of ${RING.bundles} vascular bundles. Each has ${RING.vessels} vessels and ${RING.sieve} sieve tube elements. How many vessels and sieve tube elements are there in the ring? Of the four elements of xylem and the four of phloem, how many are dead?`,
      ul: [
        `Vessels = ${RING.bundles} × ${RING.vessels} = **${RING_VESSELS}**.`,
        `Sieve tube elements = ${RING.bundles} × ${RING.sieve} = **${RING_SIEVE}**.`,
        `Dead elements: xylem ${N_DEAD_XYLEM} (tracheid, vessel, fibre) and phloem ${N_DEAD_PHLOEM} (fibre), so **${N_DEAD_ALL}** in all.`,
      ],
      v: table(['Quantity', 'Value'], [['Vessels', String(RING_VESSELS)], ['Sieve tube elements', String(RING_SIEVE)], ['Dead kinds of element', String(N_DEAD_ALL)]], `Worked table: ${RING_VESSELS} vessels, ${RING_SIEVE} sieve tube elements, ${N_DEAD_ALL} dead kinds`),
      n: 'Multiply the number of bundles by the number of elements in each. For the dead elements, count the three dead kinds in xylem and the one dead kind in phloem, which makes four.',
    }),
    sl('concept', 'The three tissue systems', {
      b: 'Tissues are grouped by structure and position into **epidermal**, **ground** and **vascular** systems.',
      v: table(['System', 'Made of', 'Examples of parts'], [['Epidermal', 'Epidermis, cuticle, stomata, root hairs, trichomes', 'Outer covering of every organ'], ['Ground', 'All tissues except epidermis and vascular bundles', 'Cortex, pericycle, pith, medullary rays; mesophyll in leaves'], ['Vascular', 'Xylem, phloem and, in dicots, cambium', 'Vascular bundles']], 'Table of the epidermal, ground and vascular tissue systems'),
      n: 'The epidermal system is the outer skin with stomata, root hairs and trichomes. The ground system is everything between the skin and the vascular bundles. The vascular system is the xylem and phloem that conduct water and food.',
    }),
    sl('check', 'Quick check: tissue systems', {
      b: 'To which tissue system does the pith of a stem belong?',
      n: 'Quick check. Is the pith part of the skin, the conducting tissue, or neither?',
      chk: 'ck-system-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Meristems: apical and intercalary (length), lateral (girth); small thin-walled cells with dense cytoplasm.',
        'Simple tissues: parenchyma, collenchyma, sclerenchyma.',
        'Complex tissues: xylem (tracheid, vessel, fibre, parenchyma) and phloem (sieve tube, companion cell, parenchyma, fibre).',
        'Tissue systems: epidermal, ground, vascular.',
      ],
      v: table(['Tissue', 'Key point'], [['Meristem', 'Divides'], ['Collenchyma', 'Corners thickened'], ['Sclerenchyma', 'Dead, lignified'], ['Sieve tube', 'No nucleus']], 'Summary table of tissues and key points'),
      n: 'To recap: meristems divide and make the plant longer or thicker, permanent tissues are simple or complex, and the tissues are grouped into the epidermal, ground and vascular systems.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Give **wall, living or dead, location and function** when comparing simple tissues.',
        'Name which xylem elements are **dead**.',
        'Say that sieve tube elements have **no nucleus** and are helped by companion cells.',
        'Place the **pith and cortex** in the ground tissue system.',
      ],
      n: 'Exam tips. When comparing simple tissues give the wall, whether the cell is alive, where it is found and what it does. Name the dead xylem elements. Remember that sieve tubes lack a nucleus. And place the cortex and pith in the ground system.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Anatomy of Flowering Plants — Part 2: Roots, stems and leaves',
  goals: [
    'Draw and label transverse sections of dicot and monocot roots and stems',
    'List the anatomical differences between dicot and monocot roots and stems',
    'Draw and label vertical sections of a dicot and a monocot leaf',
  ],
  slides: [
    sl('title', 'Organs of a flowering plant', {
      b: 'Part 2 — how the tissues are arranged in roots, stems and leaves.',
      v: flow('LR', [['r', 'Root'], ['s', 'Stem'], ['l', 'Leaf']], [['r', 's'], ['s', 'l']], 'Root, stem and leaf as the three organs studied'),
      n: 'Cut across a root, a stem or a leaf and look through a microscope. The same three tissue systems are there, but they are arranged differently in each organ, and differently again in dicots and monocots.',
    }),
    sl('diagram', 'Dicot root', {
      b: 'From outside in: **epiblema**, wide **cortex**, **endodermis** with Casparian strips, **pericycle**, **vascular bundles** with few xylem arms, and a small pith.',
      v: V.droot,
      n: 'The outer layer is the epiblema, with root hairs. The cortex is thick parenchyma. The endodermis has waterproof Casparian strips. Inside is the pericycle and then two to four xylem arms alternating with phloem, a radial arrangement. The pith is small.',
    }),
    sl('diagram', 'Monocot root', {
      b: 'The same layers are present, but there are **more than six** xylem arms and a **large pith**.',
      v: V.mroot,
      n: 'The monocot root has the same layers as the dicot root. The difference is that it has many xylem arms, more than six, which is called polyarch, and a large pith in the centre. It does not show secondary growth.',
    }),
    sl('concept', 'Dicot and monocot roots compared', {
      b: 'Three points are usually asked.',
      v: table(['Feature', 'Dicot root', 'Monocot root'], [['Xylem arms', 'Two to four (rarely more)', 'More than six'], ['Pith', 'Small or absent', 'Large and well developed'], ['Secondary growth', 'Present', 'Absent']], 'Table comparing dicot and monocot roots'),
      n: 'Compare the number of xylem arms, the size of the pith and the secondary growth. The dicot root has few arms, a small pith and secondary growth. The monocot root has many arms, a large pith and none.',
    }),
    sl('check', 'Quick check: roots', {
      b: 'A root section shows eight xylem arms and a large pith. What kind of root is it?',
      n: 'Quick check. Count the xylem arms.',
      chk: 'ck-root-mcq',
    }),
    sl('diagram', 'Dicot stem', {
      b: 'Epidermis, **collenchymatous hypodermis**, cortex, endodermis, pericycle, **vascular bundles in a ring** (conjoint, open), medullary rays and a **pith**.',
      v: V.dstem,
      n: 'In the dicot stem the bundles form a ring. Each is conjoint and open, with phloem outside, a strip of cambium, and xylem inside, the protoxylem lying towards the pith. Medullary rays run between the bundles, and a large pith lies in the centre.',
    }),
    sl('diagram', 'Monocot stem', {
      b: 'Sclerenchymatous hypodermis; **scattered** conjoint, **closed** bundles in parenchymatous ground tissue; **no** medullary rays or pith.',
      v: V.mstem,
      n: 'In the monocot stem the bundles are scattered through the ground tissue, smaller and more crowded near the edge. Each is closed, with no cambium, and is wrapped in a sclerenchyma sheath. There is no phloem parenchyma and no separate pith.',
    }),
    sl('concept', 'Dicot and monocot stems compared', {
      b: 'Compare the arrangement and type of bundles, the hypodermis and the ground tissue.',
      v: table(['Feature', 'Dicot stem', 'Monocot stem'], [['Vascular bundles', 'In a ring', 'Scattered'], ['Type of bundle', 'Conjoint, open (cambium present)', 'Conjoint, closed (no cambium)'], ['Hypodermis', 'Collenchymatous', 'Sclerenchymatous'], ['Ground tissue', 'Cortex, medullary rays, pith', 'Not differentiated'], ['Phloem parenchyma', 'Present', 'Absent']], 'Table comparing dicot and monocot stems'),
      n: 'Dicot stems have bundles in a ring, with cambium, a collenchyma hypodermis, medullary rays and pith. Monocot stems have scattered closed bundles, a sclerenchyma hypodermis and undifferentiated ground tissue.',
    }),
    sl('example', 'Worked example 1: strands and pith area', {
      b: `(a) A wheat root has ${WHEAT.xylem} xylem bundles alternating with phloem bundles. How many vascular strands are there? (b) A stem section has a radius of ${SECTION.r} mm and its pith has a radius of ${SECTION.pith} mm. What percentage of the area of the section is the pith?`,
      ul: [
        `(a) Phloem bundles alternate, so there are ${WHEAT.xylem} of them too: ${WHEAT.xylem} + ${WHEAT.xylem} = **${WHEAT_STRANDS}** strands.`,
        `(b) Area is proportional to the square of the radius: (${SECTION.pith} ÷ ${SECTION.r})² × 100 = **${PITH_AREA_PCT} percent**.`,
      ],
      v: table(['Part', 'Answer'], [['(a)', `${WHEAT_STRANDS} strands`], ['(b)', `${PITH_AREA_PCT} percent`]], `Worked table: ${WHEAT_STRANDS} strands and ${PITH_AREA_PCT} percent`),
      n: 'In a root, phloem alternates with xylem, so the number of phloem bundles equals the number of xylem bundles. For the area, remember that area depends on the square of the radius, so divide the radii, square, and multiply by one hundred.',
    }),
    sl('check', 'Quick check: stems', {
      b: 'A stem section shows scattered closed bundles. What kind of stem is it?',
      n: 'Quick check. Are the bundles in a ring, or scattered?',
      chk: 'ck-stem-mcq',
    }),
    sl('diagram', 'Dicot leaf (dorsiventral)', {
      b: 'Upper epidermis, **palisade** parenchyma, **spongy** parenchyma with air spaces, lower epidermis with more **stomata**; the bundle has xylem towards the upper side.',
      v: V.dleaf,
      n: 'In a dicot leaf the palisade cells are tall and packed just below the upper surface. The spongy cells below are loosely arranged with air spaces. Most stomata are in the lower epidermis, each with two guard cells over a sub-stomatal cavity.',
    }),
    sl('diagram', 'Monocot leaf (isobilateral)', {
      b: 'Similar epidermis on both sides, **bulliform cells**, mesophyll **not differentiated**, stomata on **both** surfaces.',
      v: V.mleaf,
      n: 'In the monocot leaf the two surfaces look alike, and stomata are found on both. The mesophyll is one kind of cell, not divided into palisade and spongy tissue. Large bulliform cells in the upper epidermis help the leaf to roll in dry weather.',
    }),
    sl('concept', 'Dorsiventral and isobilateral leaves compared', {
      b: 'Four points distinguish the two kinds of leaf.',
      v: table(['Feature', 'Dicot leaf (dorsiventral)', 'Monocot leaf (isobilateral)'], [['Mesophyll', 'Palisade and spongy', 'Not differentiated'], ['Stomata', 'More on the lower surface', 'About equal on both surfaces'], ['Bulliform cells', 'Absent', 'Present'], ['Venation', 'Reticulate', 'Parallel']], 'Table comparing dorsiventral and isobilateral leaves'),
      n: 'A dorsiventral leaf has different upper and lower sides, with palisade and spongy mesophyll and more stomata below. An isobilateral leaf has similar sides, one kind of mesophyll, stomata on both sides and bulliform cells.',
    }),
    sl('example', 'Worked example 2: counting stomata', {
      b: `A mango leaf has ${MANGO.perMm2} stomata per square millimetre on its lower surface, which measures ${MANGO.areaCm2} square centimetres, and none on the upper. A paddy leaf has ${PADDY.perMm2} per square millimetre on each surface, one surface measuring ${PADDY.areaCm2} square centimetres. Find the stomata on each leaf.`,
      ul: [
        `Mango: ${MANGO.areaCm2} cm² = ${MANGO.areaCm2 * 100} mm²; ${MANGO.perMm2} × ${MANGO.areaCm2 * 100} = **${MANGO_STOMATA}**.`,
        `Paddy: ${PADDY.areaCm2} cm² = ${PADDY.areaCm2 * 100} mm²; ${PADDY.perMm2} × ${PADDY.areaCm2 * 100} = ${PADDY.perMm2 * PADDY.areaCm2 * 100} per surface, so **${PADDY_STOMATA}** on both.`,
      ],
      v: table(['Leaf', 'Surfaces with stomata', 'Stomata'], [['Mango (dicot)', 'Lower only', String(MANGO_STOMATA)], ['Paddy (monocot)', 'Both', String(PADDY_STOMATA)]], `Worked table: ${MANGO_STOMATA} stomata in the mango leaf and ${PADDY_STOMATA} in the paddy leaf`),
      n: 'First change the area to square millimetres by multiplying by one hundred. Then multiply by the density. In the mango only the lower surface counts. In the paddy leaf both surfaces carry stomata, so double the count for one surface.',
    }),
    sl('check', 'Quick check: leaves', {
      b: 'In a leaf section the mesophyll is a single kind of cell and the epidermis has bulliform cells. Which leaf is it?',
      n: 'Quick check. Is there a palisade layer?',
      chk: 'ck-leaf-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Root: epiblema, cortex, endodermis, pericycle, radial bundles; dicot few xylem arms and small pith, monocot many arms and large pith.',
        'Stem: dicot bundles in a ring, open, collenchymatous hypodermis, pith; monocot bundles scattered, closed, sclerenchymatous hypodermis.',
        'Leaf: dicot palisade and spongy mesophyll, more stomata below; monocot undifferentiated mesophyll, bulliform cells, stomata on both sides.',
      ],
      v: table(['Organ', 'Dicot', 'Monocot'], [['Root', 'Few xylem arms', 'Many xylem arms'], ['Stem', 'Bundles in a ring', 'Bundles scattered'], ['Leaf', 'Palisade and spongy', 'One kind of mesophyll']], 'Summary table of dicot and monocot organs'),
      n: 'To recap: roots have a radial arrangement of xylem and phloem, with more arms in monocots. Dicot stems have bundles in a ring and monocot stems have them scattered. Dicot leaves have palisade and spongy tissue, monocot leaves do not.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Draw the layers **in order** from the outside and label at least six.',
        'Write differences as **points in a table**, one feature per row.',
        'Name **open** and **closed** bundles with the presence of cambium.',
        'Mention **bulliform cells** for a monocot leaf.',
      ],
      n: 'Exam tips. Draw the layers in order from the outside and label at least six. Present differences in a table, one feature in each row. Link open and closed bundles to the presence of cambium. And mention bulliform cells in a monocot leaf.',
    }),
  ],
});
