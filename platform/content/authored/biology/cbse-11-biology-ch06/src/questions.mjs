// ch06 Anatomy of Flowering Plants — question bank. AR keys: a b d a c c d (in bank order below).
import { mk, add, r, svgV } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { N, FIELD, BUNDLE2, LAYERS, LEAF_LETTERS, actualUm, density, patches, pct, SAMPLE, GRASS, round } from './calc.mjs';
import { LEAF_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const leafAsset = svgV(LEAF_LETTERED, 'Transverse section of a dicot leaf with five parts marked A to E');

// ---------------------------------------------------------------- t01 tissues and tissue systems
add('interc-mcq', mcq({
  stem: 'A lawn mower slices off the top of the grass leaves, yet the leaves soon grow back from their base. Which tissue is responsible for the regrowth?',
  right: 'Intercalary meristem at the leaf base',
  wrong: ['Apical meristem at the root tip', 'Collenchyma beneath the epidermis', 'Cambium between xylem and phloem'],
  sol: 'Grasses have intercalary meristems at the base of leaves and internodes, which allow regrowth after grazing or mowing — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('collen-mcq', mcq({
  stem: 'When the strings are pulled off a celery stalk, a student sees under the microscope living cells with unevenly thickened corners, some of them containing chloroplasts. The tissue is',
  right: 'collenchyma',
  wrong: ['sclerenchyma', 'parenchyma', 'xylem'],
  sol: 'Collenchyma is a living tissue with corners thickened by cellulose, hemicellulose and pectin; it may contain chloroplasts and supports young petioles — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('sclerid-mcq', mcq({
  stem: 'Biting into a ripe pear, a child feels small gritty particles. These are clusters of',
  right: 'sclereids, dead cells with thick lignified walls',
  wrong: ['collenchyma, living cells with thickened corners', 'phloem fibres, long and still alive', 'parenchyma cells packed with chloroplasts'],
  sol: 'The grit in pear and guava pulp is made of sclereids, rounded sclerenchyma cells that are dead and lignified — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('fibre-mcq', mcq({
  stem: 'Which statement about sclerenchyma is correct?',
  right: 'Its cells are usually dead and have thick, lignified walls with a narrow cavity.',
  wrong: ['Its cells are living and have thin cellulose walls with large vacuoles.', 'Its cells are living and have walls thickened only at the corners.', 'Its cells are dead and have thin walls with large air spaces between them.'],
  sol: 'Sclerenchyma (fibres and sclereids) is dead at maturity, with thick lignified walls and a very narrow lumen — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('vessel-mcq', mcq({
  stem: 'A tube made of many cells joined end to end, dead at maturity and with perforated end walls, carries water in a flowering plant. This element is a',
  right: 'vessel',
  wrong: ['sieve tube element', 'companion cell', 'phloem fibre'],
  sol: 'Vessels are long tubes of dead cells with perforated end walls and carry water and minerals in xylem; sieve tube elements belong to phloem — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('companion-mcq', mcq({
  stem: 'A sieve tube element has no nucleus at maturity, yet it stays alive and conducts food. Which neighbouring cell helps it, and has a nucleus?',
  right: 'Companion cell',
  wrong: ['Phloem fibre', 'Tracheid', 'Xylem parenchyma cell'],
  sol: 'Each sieve tube element is associated with a nucleated companion cell that keeps it functioning — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('protoxylem-mcq', mcq({
  stem: 'In a transverse section of a root, the first-formed xylem elements lie towards the periphery; in a stem section they lie towards the pith. These two arrangements are called respectively',
  right: 'exarch and endarch',
  wrong: ['endarch and exarch', 'exarch and exarch', 'endarch and endarch'],
  sol: 'Root xylem is exarch (protoxylem outside); stem xylem is endarch (protoxylem towards the pith) — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('phloemfood-mcq', mcq({
  stem: 'A student removes a narrow ring of outer tissue, including the phloem but leaving the xylem, from a young herbaceous stem. A few weeks later the region just above the ring is swollen with sugars, while the stem keeps taking up water. This shows that',
  right: 'phloem carries food from the leaves, whereas xylem continues to carry water',
  wrong: ['xylem carries food from the leaves, whereas phloem carries water', 'the cortex alone carries both food and water to the roots', 'companion cells carry water up the stem without any xylem'],
  sol: 'Phloem conducts food from the leaves; when it is cut, food piles up above the cut. Water still rises through the intact xylem — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('stomata-mcq', mcq({
  stem: 'A peel from a maize leaf shows each stoma with two dumbbell-shaped guard cells. A peel from a sunflower leaf will show',
  right: 'bean-shaped guard cells',
  wrong: ['dumbbell-shaped guard cells as well', 'a sclerenchyma ring around each pore', 'no guard cells, because dicots lack stomata'],
  sol: 'Guard cells are dumbbell-shaped in grasses and bean-shaped in dicots such as sunflower — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('ground-mcq', mcq({
  stem: 'Which of these belongs to the ground tissue system of a stem?',
  right: 'Pith',
  wrong: ['Stomata', 'Xylem', 'Cuticle'],
  sol: 'The ground tissue system includes cortex, pericycle, pith and medullary rays; stomata and cuticle are epidermal and xylem is vascular — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('bundle-mcq', mcq({
  stem: 'A stem section shows a vascular bundle with phloem outside, xylem inside, and a thin strip of dividing cells between them. This bundle is',
  right: 'conjoint and open',
  wrong: ['conjoint and closed', 'radial and open', 'radial and closed'],
  sol: 'Xylem and phloem on the same radius make a conjoint bundle; cambium between them makes it open — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('radial-mcq', mcq({
  stem: 'In a transverse section of a primary root, how are the xylem and phloem arranged?',
  right: 'On different radii, alternating with each other',
  wrong: ['On the same radius, with phloem outside the xylem', 'On the same radius, with cambium between them', 'In scattered bundles with sclerenchymatous sheaths'],
  sol: 'Roots have radial bundles, with xylem and phloem on different radii — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('parench-mcq', mcq({
  stem: 'The soft white flesh of a potato tuber, which stores starch, is made mainly of',
  right: 'parenchyma',
  wrong: ['collenchyma', 'sclerenchyma', 'phloem fibres'],
  sol: 'Parenchyma is the tissue of storage, photosynthesis and secretion — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('sclerenchyma-ar', ar({
  a: 'Sclerenchyma cells are dead at maturity.',
  r: 'Their walls are heavily thickened with lignin, and the protoplast is lost.',
  key: 'a',
  sol: 'Both are true, and the thick lignified walls with loss of the protoplast explain why mature sclerenchyma cells are dead — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('xylempar-ar', ar({
  a: 'Xylem parenchyma is the only living element of xylem.',
  r: 'Tracheids and vessels are dead, lignified cells.',
  key: 'b',
  sol: 'Both are true, but the deadness of tracheids and vessels does not explain why xylem parenchyma is living; it is a separate fact — option (b). (Xylem fibres are also dead.)',
  d: 3, c: 'understanding', t: [1],
}));
add('stomata-ar', ar({
  a: 'The guard cells of a grass leaf are bean-shaped.',
  r: 'The guard cells of dicot leaves are bean-shaped.',
  key: 'd',
  sol: 'A is false: grass guard cells are dumbbell-shaped. R is true — option (d).',
  d: 2, c: 'understanding', t: [1],
}));
add('collen-tf', tf({
  stem: 'The cell walls of collenchyma are thickened with lignin, and the cells are dead at maturity.',
  key: 'f',
  sol: 'False. Collenchyma is living, with corners thickened by cellulose, hemicellulose and pectin.',
  d: 1, c: 'recall', t: [1],
}));
add('vessel-tf', tf({
  stem: 'Tracheids and vessels have no living protoplasm at maturity.',
  key: 't',
  sol: 'True. They are dead, lignified water-conducting cells.',
  d: 1, c: 'recall', t: [1],
}));
add('closed-fill', fill({
  stem: 'Conjoint vascular bundles that have no cambium between xylem and phloem are called ______ bundles.',
  acc: [['closed']],
  sol: 'Closed.',
  d: 1, c: 'recall', t: [1],
}));
add('tissue-match', match({
  stem: 'Match each tissue or cell (column I) with its feature (column II).',
  pairs: [
    ['Parenchyma', 'Thin-walled living cells for photosynthesis and storage'],
    ['Collenchyma', 'Living cells with thickened corners'],
    ['Sclerenchyma', 'Dead cells with thick lignified walls'],
    ['Companion cell', 'Nucleated cell beside a sieve tube element'],
  ],
  order: [3, 1, 0, 2],
  sol: 'Parenchyma is thin-walled and living; collenchyma has thickened corners; sclerenchyma is dead and lignified; companion cells sit beside sieve tubes.',
  d: 1, c: 'recall', t: [1],
}));
add('mag-num', num({
  stem: 'A fibre in transverse section measures 30 mm across on a print magnified 500 times. What is its real width, in micrometres?',
  value: N.fibreUm, unit: 'micrometres',
  sol: r`Real size $= \dfrac{30 \times 1000}{500} = ${N.fibreUm}$ micrometres.`,
  scheme: [['Divides by the magnification and converts to micrometres', 0.5], [`${N.fibreUm} micrometres`, 0.5]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === actualUm(30, 500) || 'value');
add('sto-num', num({
  stem: 'A student counts 28 stomata in a field of view of 0.25 square millimetres on the lower epidermis of a leaf. What is the density of stomata, per square millimetre?',
  value: N.sto112,
  sol: r`$\dfrac{28}{0.25} = ${N.sto112}$ stomata per square millimetre.`,
  scheme: [[`${N.sto112}`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === density(28, 0.25) || 'value');
add('meristem-short', short({
  marks: 2,
  stem: 'Distinguish between apical and intercalary meristems on the basis of their position and the growth they bring about.',
  model: '**Apical meristems** lie at the **tips of roots and shoots** and make the plant longer; this is **primary growth**. **Intercalary meristems** lie at the **base of leaves or internodes**, as in **grasses**, and allow the leaf or internode to grow again after it has been cut or grazed.',
  sol: 'Position and effect.',
  scheme: [['Apical: tips; primary growth in length', 1], ['Intercalary: base of leaves or internodes; regrowth', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('collsc-short', short({
  marks: 2,
  stem: 'A strip taken from a young leaf stalk and a piece of a coconut shell are examined. Name the tissue that makes up each and give one difference between them.',
  model: 'The **young leaf stalk** has **collenchyma**, made of **living** cells whose **corners are thickened** with cellulose and pectin, giving flexible support. The **coconut shell** has **sclerenchyma**, made of **dead** cells with **thick lignified walls** and a narrow cavity, giving rigid strength.',
  sol: 'Collenchyma versus sclerenchyma.',
  scheme: [['Names of the two tissues', 1], ['A difference: living versus dead, or the wall thickening', 1]],
  d: 2, c: 'application', t: [1],
}));
add('xylemel-short', short({
  marks: 2,
  stem: 'Name the four elements of xylem and state which one is living.',
  model: 'The four elements of **xylem** are **tracheids**, **vessels**, **xylem fibres** and **xylem parenchyma**. Tracheids, vessels and fibres are **dead** and have lignified walls. **Xylem parenchyma** is the only **living** element; it stores food and helps in radial conduction of water.',
  sol: 'Four elements; parenchyma living.',
  scheme: [['Four elements named', 1], ['Parenchyma is living; others dead', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('phloemel-short', short({
  marks: 2,
  stem: 'Name the four elements of phloem and say what is special about a mature sieve tube element.',
  model: 'The elements of **phloem** are **sieve tube elements**, **companion cells**, **phloem parenchyma** and **phloem fibres**. A mature **sieve tube element** is a long tube with perforated end walls, the **sieve plates**; it has peripheral cytoplasm and **no nucleus**, and depends on its companion cell.',
  sol: 'Four elements; sieve tube features.',
  scheme: [['Four elements', 1], ['Sieve plates, no nucleus', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('epidermis-short', short({
  marks: 2,
  stem: 'Describe the epidermal tissue system, naming three structures found in it and one role of each.',
  model: 'The **epidermis** is the outermost layer, covered by a **cuticle** in aerial parts, which reduces water loss. It bears **stomata**, pores with two guard cells that control gas exchange and transpiration, and **root hairs**, which absorb water and minerals. **Trichomes** on the stem are hairs that cut down loss of water.',
  sol: 'Epidermis, cuticle, stomata, root hairs, trichomes.',
  scheme: [['Epidermis and cuticle', 1], ['Stomata, root hairs or trichomes with roles', 1]],
  wl: [30, 60],
  d: 2, c: 'understanding', t: [1],
}));
add('simple-short', short({
  marks: 3,
  stem: 'Name the three simple permanent tissues and state the structure and function of each.',
  model: '**Parenchyma** has living, thin-walled, roundish cells and carries out photosynthesis, storage and secretion. **Collenchyma** has living cells with **corners thickened** by cellulose, hemicellulose and pectin, and supports young stems and petioles. **Sclerenchyma** has **dead** cells with thick lignified walls and a narrow cavity, as fibres or sclereids, and gives mechanical strength.',
  sol: 'Three tissues, structure and function.',
  scheme: [['Parenchyma', 1], ['Collenchyma', 1], ['Sclerenchyma', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('xylphl-short', short({
  marks: 3,
  stem: 'Compare xylem and phloem on any three points.',
  model: '**Xylem** conducts **water and minerals** upward and gives support; **phloem** conducts **food** from the leaves to other parts. Xylem has tracheids, vessels, fibres and parenchyma, mostly **dead**; phloem has sieve tube elements, companion cells, parenchyma and fibres, with **living** conducting cells. In a stem the protoxylem is towards the pith, and the phloem lies outside the xylem.',
  sol: 'Function, elements, living or dead.',
  scheme: [['Function compared', 1], ['Elements compared', 1], ['Living or dead, or position', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('bundle-short', short({
  marks: 3,
  stem: 'Distinguish radial, conjoint open and conjoint closed vascular bundles, with the organ in which each is found.',
  model: 'In a **radial** bundle, found in **roots**, xylem and phloem lie on **different radii**, alternating. In a **conjoint open** bundle, found in **dicot stems**, xylem and phloem lie on the **same radius** with a strip of **cambium** between them. In a **conjoint closed** bundle, found in **monocot stems**, they lie on the same radius but there is **no cambium**.',
  sol: 'Three types of bundle with organs.',
  scheme: [['Radial in roots', 1], ['Conjoint open with cambium, dicot stem', 1], ['Conjoint closed without cambium, monocot stem', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('ground-short', short({
  marks: 3,
  stem: 'What is the ground tissue system? Name its parts in the stem and in the leaf.',
  model: 'The **ground tissue system** includes all tissues except the **epidermis** and the **vascular bundles**. It is mostly parenchyma, though it may also be collenchyma or sclerenchyma. In stems and roots it includes the **cortex, pericycle, pith and medullary rays**. In leaves it is the **mesophyll**, rich in chloroplasts, which carries out photosynthesis.',
  sol: 'Definition; stem parts; mesophyll.',
  scheme: [['Definition: all except epidermis and bundles', 1], ['Cortex, pericycle, pith, medullary rays', 1], ['Mesophyll in leaves', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('tissues-long', long({
  stem: 'Describe the three simple permanent tissues of plants with their structure, location and function, and explain why sclerenchyma is called a dead tissue.',
  model: '**Parenchyma** has thin-walled, living, roundish or polygonal cells with small intercellular spaces. It forms the cortex, pith and mesophyll, and carries out photosynthesis, storage and secretion.\n\n**Collenchyma** has living cells with corners thickened by cellulose, hemicellulose and pectin; some have chloroplasts. It lies below the epidermis of dicot stems and in petioles, and gives flexible support to young parts.\n\n**Sclerenchyma** has cells with thick, lignified walls and a narrow cavity, as long pointed **fibres** or rounded **sclereids** (fruit walls of nuts, pulp of pear and guava, seed coats). It gives strength. It is called dead because the lignified walls prevent exchange, so the **protoplast is lost** at maturity.',
  sol: 'Three tissues with structure, location, function; why sclerenchyma is dead.',
  scheme: [['Parenchyma', 1.5], ['Collenchyma', 1.5], ['Sclerenchyma: fibres, sclereids, function', 1], ['Why dead', 1]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [1],
}));
add('complex-long', long({
  stem: 'Describe the structure and functions of the two complex tissues, xylem and phloem, naming their elements and saying which are living.',
  model: '**Xylem** conducts **water and minerals** from roots to leaves and gives mechanical support. Its elements are **tracheids** and **vessels** (dead, lignified, water-conducting), **xylem fibres** (dead, supporting) and **xylem parenchyma** (the only living element, storing food). The first-formed xylem is protoxylem and the later is metaxylem.\n\n**Phloem** conducts **food** from the leaves to other parts. Its elements are **sieve tube elements** (long tubes with sieve plates, living but without a nucleus), **companion cells** (nucleated, helping the sieve tubes), **phloem parenchyma** (absent in most monocots) and **phloem fibres** (dead, sclerenchymatous).',
  sol: 'Xylem and phloem elements, functions, living or dead.',
  scheme: [['Xylem function and protoxylem or metaxylem', 1], ['Xylem elements, living or dead', 1.5], ['Phloem function', 0.5], ['Phloem elements, living or dead', 2]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [1],
}));
add('systems-long', long({
  stem: 'Describe the three tissue systems of a flowering plant with the tissues that make up each, and distinguish the types of vascular bundle.',
  model: '**Epidermal system:** the epidermis, with a cuticle on aerial parts, stomata guarded by two guard cells (bean-shaped in dicots, dumbbell-shaped in grasses), root hairs and trichomes.\n\n**Ground tissue system:** everything except the epidermis and vascular bundles: cortex, pericycle, pith and medullary rays in stems and roots, and mesophyll in leaves.\n\n**Vascular system:** xylem and phloem, with cambium in dicot stems. **Radial** bundles in roots have xylem and phloem on different radii. **Conjoint** bundles in stems and leaves have them on the same radius; they are **open** with cambium between them (dicot stems) or **closed** without cambium (monocot stems).',
  sol: 'Three tissue systems and bundle types.',
  scheme: [['Epidermal system', 1.5], ['Ground tissue system', 1.5], ['Vascular system', 1], ['Radial, open and closed bundles', 1]],
  wl: [80, 240],
  d: 3, c: 'understanding', t: [1],
}));
add('ink-long', long({
  stem: 'A leafy herbaceous shoot is cut under water and kept in red ink for two hours. Thin sections then show red colour in a part of each vascular bundle, but not in the cortex or pith. Name the tissue that carried the ink, its elements and their nature, say where in a dicot stem bundle the colour will appear, and predict what would happen to food movement if the phloem were cut.',
  model: 'The **xylem** carried the ink, as it conducts **water and minerals**. Its conducting elements are **tracheids and vessels**, which are **dead** with lignified walls; the fibres give support and xylem parenchyma is living. In a dicot stem the bundle is **conjoint and open**, with xylem on the **inner side** of the cambium, nearest the pith, so the colour appears there, with the **protoxylem towards the pith**. If the **phloem** were cut, **food from the leaves** could not be **conducted** to the roots and other parts, so sugars would pile up above the cut and the roots would starve, although water would still rise through the xylem.',
  sol: 'Xylem, elements, position in a dicot bundle, effect of cutting phloem.',
  scheme: [['Xylem identified with function', 1], ['Elements dead, lignified', 1], ['Inner side of the open bundle; endarch', 1.5], ['Phloem cut: food not conducted; water still rises', 1.5]],
  wl: [80, 260],
  d: 3, c: 'analysis', t: [1, 2],
}));
{
  const dm = N.cellUm;
  add('tissue-case', mk.case({
    passage: `A student prepares a thin transverse section of a celery petiole and a squash of a pear fruit. In the petiole she sees a ring of cells beneath the epidermis with thickened corners; some contain chloroplasts. In the pear squash she finds clusters of hard, rounded cells with very thick walls. She photographs one of these cells at 900 times magnification, and it measures 36 mm across on the print.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'The rounded, hard cells in the pear are',
        right: 'sclereids',
        wrong: ['collenchyma cells', 'sieve tube elements', 'guard cells'],
        sol: 'Rounded, thick-walled, dead cells in the pulp of pear are sclereids — option (@K).',
        d: 1, c: 'recall', t: [1],
      })),
      part('b', num({
        stem: 'What is the real width of the photographed cell, in micrometres?',
        value: dm, unit: 'micrometres',
        sol: r`$\dfrac{36 \times 1000}{900} = ${dm}$ micrometres.`,
        scheme: [[`${dm} micrometres`, 1]],
        d: 2, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'Why can the cells with thickened corners in the petiole stretch with the growing organ, whereas the cells in the pear grit cannot?',
        model: 'The petiole cells are **collenchyma**: **living**, with walls thickened only at the **corners** by cellulose and pectin, so they stay flexible and support growing parts. The pear cells are **sclerenchyma**: **dead**, with **thick lignified** walls and almost no cavity, so they are rigid and cannot stretch.',
        sol: 'Living flexible collenchyma versus dead rigid sclerenchyma.',
        scheme: [['Collenchyma: living, corners thickened, flexible', 1], ['Sclereids: dead, lignified, rigid', 1]],
        d: 2, c: 'application', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'Name the tissue that makes up most of the soft flesh of the pear between the grit clusters, and state two functions of this tissue in plants.',
          model: 'The soft flesh is mostly **parenchyma**, with living, thin-walled cells. In plants, parenchyma carries out **photosynthesis** (when it has chloroplasts), **storage** of food and **secretion**.',
          sol: 'Parenchyma; two functions.',
          scheme: [['Parenchyma', 1], ['Two functions', 1]],
          d: 2, c: 'understanding', t: [1],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 40 || 'value');
}
{
  const g = GRASS;
  const dens = N.grassDensity;
  add('stomata-case', mk.case({
    passage: `A student takes epidermal peels from the upper and lower surfaces of a sunflower leaf and of a maize leaf. In the sunflower leaf, a field of ${FIELD.area} square millimetres shows ${FIELD.upper} stomata on the upper peel and ${FIELD.lower} on the lower peel. In the maize leaf, a field of ${g.area} square millimetres shows ${g.upper} stomata on each peel.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which description of the guard cells is correct?',
        right: 'Sunflower guard cells are bean-shaped; maize guard cells are dumbbell-shaped.',
        wrong: ['Sunflower guard cells are dumbbell-shaped; maize guard cells are bean-shaped.', 'Both have bean-shaped guard cells.', 'Both have dumbbell-shaped guard cells.'],
        sol: 'Dicot guard cells are bean-shaped and grass guard cells dumbbell-shaped — option (@K).',
        d: 1, c: 'recall', t: [1],
      })),
      part('b', num({
        stem: 'What is the stomatal density on one surface of the maize leaf, per square millimetre?',
        value: dens,
        sol: r`$\dfrac{${g.upper}}{${g.area}} = ${dens}$ stomata per square millimetre.`,
        scheme: [[`${dens}`, 1]],
        d: 2, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'Use the sunflower counts to find how many times more stomata the lower surface has than the upper, and say what this suggests about the leaf.',
        model: `Upper density is $\\dfrac{${FIELD.upper}}{${FIELD.area}} = ${N.stoUpper}$ and lower density is $\\dfrac{${FIELD.lower}}{${FIELD.area}} = ${N.stoLower}$ per square millimetre, so the lower surface has **${N.stoRatio} times** as many. This suggests a **dorsiventral** leaf, as in dicots, with most stomata on the lower side.`,
        sol: 'Ratio 4; dorsiventral leaf.',
        scheme: [['Densities and ratio of 4', 1], ['Dorsiventral dicot leaf', 1]],
        d: 2, c: 'application', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'What does the equal number of stomata on the two surfaces of the maize leaf suggest about its type, and how is its mesophyll arranged?',
          model: 'Equal numbers on both surfaces suggest an **isobilateral** leaf, as in monocots such as maize. Its **mesophyll is not differentiated** into palisade and spongy parenchyma; the cells are alike throughout.',
          sol: 'Isobilateral; undifferentiated mesophyll.',
          scheme: [['Isobilateral leaf', 1], ['Mesophyll not differentiated', 1]],
          d: 2, c: 'understanding', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 45 && q.children[2].answer.model_answer_md.length > 0 || 'value');
}

// ---------------------------------------------------------------- t02 anatomy of dicot and monocot root, stem and leaf
add('casp-mcq', mcq({
  stem: 'Water from the soil must pass through the cytoplasm of the cells of one layer of the root before it reaches the xylem, because the walls of this layer carry bands of suberin. The layer is the',
  right: 'endodermis',
  wrong: ['epidermis', 'pericycle', 'hypodermis'],
  sol: 'The endodermis of the root has Casparian strips of suberin on its radial and transverse walls — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('pericycle-mcq', mcq({
  stem: 'A botanist sees a new lateral root pushing out through the cortex of a sunflower root. It arose from the',
  right: 'pericycle',
  wrong: ['endodermis', 'epidermis', 'pith'],
  sol: 'Lateral roots arise from the pericycle, the layer just inside the endodermis — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('monoroot-mcq', mcq({
  stem: 'A transverse section of a root shows eight patches of xylem alternating with eight of phloem, and a large pith. The root is',
  right: 'monocot, with polyarch xylem',
  wrong: ['dicot, with tetrarch xylem', 'dicot, with polyarch xylem', 'monocot, with diarch xylem'],
  sol: 'More than six xylem bundles (polyarch) and a large, well-developed pith indicate a monocot root — option (@K).',
  d: 2, c: 'application', t: [2],
}), () => patches(8) === 16 || 'patches');
add('dicotroot-mcq', mcq({
  stem: 'A transverse section shows two to four patches of xylem alternating with phloem, a very small pith, and an endodermis with Casparian strips. The organ is',
  right: 'a dicot root',
  wrong: ['a dicot stem', 'a monocot root', 'a monocot stem'],
  sol: 'Few xylem patches (diarch to tetrarch), a small pith and an endodermis with Casparian strips are features of a dicot root — option (@K).',
  d: 1, c: 'application', t: [2],
}));
add('dicstem-mcq', mcq({
  stem: 'In a transverse section of a sunflower stem the vascular bundles lie in a ring. Which tissue lies between neighbouring bundles?',
  right: 'Parenchyma forming the medullary rays',
  wrong: ['Sclerenchymatous bundle sheath', 'Phloem fibres only', 'Casparian strips'],
  sol: 'In a dicot stem the parenchyma between the bundles forms the medullary rays — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('hypodermis-mcq', mcq({
  stem: 'Below the epidermis of one stem section a student finds sclerenchyma; below the epidermis of another she finds collenchyma. The first stem is most probably',
  right: 'a monocot stem and the second a dicot stem',
  wrong: ['a dicot stem and the second a monocot stem', 'a dicot stem and the second also a dicot stem', 'a monocot stem and the second also a monocot stem'],
  sol: 'The hypodermis is sclerenchymatous in monocot stems and collenchymatous in dicot stems — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('monostem-mcq', mcq({
  stem: 'Which feature will a student find in a maize stem but not in a sunflower stem?',
  right: 'Scattered bundles, each surrounded by a sclerenchymatous sheath',
  wrong: ['A ring of conjoint bundles with cambium in each', 'A collenchymatous hypodermis below the epidermis', 'Medullary rays between the bundles'],
  sol: 'Monocot stems have many scattered closed bundles with sclerenchymatous sheaths; the other features belong to dicot stems — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('medullary-mcq', mcq({
  stem: 'The radial strips of parenchyma lying between the vascular bundles of a sunflower stem are called',
  right: 'medullary rays',
  wrong: ['pericycle', 'bundle sheath', 'starch sheath'],
  sol: 'The parenchyma between the bundles of dicot stems forms the medullary rays — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('palisade-mcq', mcq({
  stem: 'A student wants to find where most of the chloroplasts lie in a transverse section of a dicot leaf. Which layer should she examine?',
  right: 'Palisade parenchyma, just below the upper epidermis',
  wrong: ['Spongy parenchyma, next to the lower epidermis', 'The upper epidermis, which is always full of chloroplasts', 'The bundle sheath around the vein'],
  sol: 'The palisade cells, tall and tightly packed below the upper epidermis, carry most of the chloroplasts — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('isobil-mcq', mcq({
  stem: 'A leaf peel shows about the same number of stomata on both surfaces, and the mesophyll is not divided into palisade and spongy parts. The leaf is',
  right: 'isobilateral, as in a grass',
  wrong: ['dorsiventral, as in a mango', 'dorsiventral, as in a grass', 'isobilateral, as in a mustard'],
  sol: 'Stomata on both surfaces and undifferentiated mesophyll mark an isobilateral leaf, typical of monocots such as grasses — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('bsheath-mcq', mcq({
  stem: 'Each vascular bundle in the veins of a leaf is surrounded by a layer of thick-walled cells called the',
  right: 'bundle sheath',
  wrong: ['pericycle', 'endodermis of the root', 'cuticle'],
  sol: 'The vascular bundles of leaves are surrounded by a bundle sheath of thick-walled cells — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('leaflet-mcq', mcq({
  stem: 'In the lettered section of a dicot leaf, which letter marks the tall, closely packed cells just below the upper epidermis?',
  right: `Part ${LEAF_LETTERS.palisade}`,
  wrong: [`Part ${LEAF_LETTERS.guard}`, `Part ${LEAF_LETTERS.spongy}`, `Part ${LEAF_LETTERS.xylem}`],
  sol: `The palisade parenchyma, part ${LEAF_LETTERS.palisade}, forms tall, tightly packed cells below the upper epidermis — option (@K).`,
  assets: [leafAsset],
  d: 1, c: 'recall', t: [2],
}));
add('leaflet2-mcq', mcq({
  stem: 'In the lettered section of a dicot leaf, a student wants to find the tissue that carries water to the mesophyll cells. Which letter should she choose?',
  right: `Part ${LEAF_LETTERS.xylem}`,
  wrong: [`Part ${LEAF_LETTERS.epi}`, `Part ${LEAF_LETTERS.spongy}`, `Part ${LEAF_LETTERS.guard}`],
  sol: `Xylem in the vein, part ${LEAF_LETTERS.xylem}, carries water; it lies towards the upper side of the bundle — option (@K).`,
  assets: [leafAsset],
  d: 2, c: 'application', t: [2],
}));
add('dicstem-ar', ar({
  a: 'The vascular bundles of a dicot stem are described as open.',
  r: 'A strip of cambium lies between the xylem and the phloem of each bundle.',
  key: 'a',
  sol: 'Both are true, and the presence of cambium between xylem and phloem is exactly what makes a conjoint bundle open — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('leaf-ar', ar({
  a: 'In a dicot leaf the palisade parenchyma lies just below the upper epidermis.',
  r: 'Palisade parenchyma has large air spaces between its cells.',
  key: 'c',
  sol: 'A is true. R is false: palisade cells are tightly packed; the large air spaces are in the spongy parenchyma — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('grass-ar', ar({
  a: 'Grass leaves roll inward when water is scarce.',
  r: 'Bulliform cells are small, thick-walled and lignified cells of the lower epidermis.',
  key: 'c',
  sol: 'A is true. R is false: bulliform cells are large, empty, colourless cells of the upper epidermis that lose turgor and let the leaf roll — option (c).',
  d: 3, c: 'application', t: [2],
}));
add('monoroot-ar', ar({
  a: 'The pith of a monocot root is small and inconspicuous.',
  r: 'A monocot root has more than six patches of xylem, that is, it is polyarch.',
  key: 'd',
  sol: 'A is false: a monocot root has a large, well-developed pith. R is true — option (d).',
  d: 2, c: 'understanding', t: [2],
}));
add('pith-tf', tf({
  stem: 'The pith of a dicot root is large and well developed.',
  key: 'f',
  sol: 'False. A dicot root has a small pith or none; a large pith is characteristic of the monocot root.',
  d: 1, c: 'recall', t: [2],
}));
add('closed-tf', tf({
  stem: 'The vascular bundles of a monocot stem have no cambium.',
  key: 't',
  sol: 'True. They are conjoint and closed, surrounded by a sclerenchymatous sheath.',
  d: 1, c: 'recall', t: [2],
}));
add('suberin-fill', fill({
  stem: 'The Casparian strips in the endodermis of a root are bands of ______ in the cell walls.',
  acc: [['suberin']],
  sol: 'Suberin.',
  d: 1, c: 'recall', t: [2],
}));
add('bulliform-fill', fill({
  stem: 'Large, empty, colourless cells in the upper epidermis of a grass leaf, which help the leaf to roll, are called ______ cells.',
  acc: [['bulliform', 'motor']],
  sol: 'Bulliform.',
  d: 1, c: 'recall', t: [2],
}));
add('organ-match', match({
  stem: 'Match each feature (column I) with the organ in which it is found (column II).',
  pairs: [
    ['Starch sheath as the innermost cortical layer', 'Dicot stem'],
    ['Water-containing cavity in a bundle', 'Monocot stem'],
    ['Endodermis with Casparian strips', 'Root'],
    ['Bulliform cells', 'Grass leaf'],
  ],
  order: [1, 3, 2, 0],
  sol: 'The starch sheath is the endodermis of the dicot stem; the water cavity occurs in monocot stem bundles; Casparian strips belong to the root; bulliform cells belong to the grass leaf.',
  d: 2, c: 'understanding', t: [2],
}));
add('bundle-num', num({
  stem: `A student counts ${BUNDLE2.counted} vascular bundles in a field of ${BUNDLE2.field} square millimetres of a maize stem section. Assuming an even spread, how many bundles are in a section of ${BUNDLE2.section} square millimetres?`,
  value: N.bundle2Section,
  sol: r`Density: $\dfrac{${BUNDLE2.counted}}{${BUNDLE2.field}} = ${N.bundle2Density}$ per square millimetre; section: $${N.bundle2Density} \times ${BUNDLE2.section} = ${N.bundle2Section}$ bundles.`,
  scheme: [['Density', 0.5], [`${N.bundle2Section}`, 0.5]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 90 || 'value');
add('layer-num', num({
  stem: `In a section of a dicot leaf the upper epidermis is ${LAYERS.upperEpi} micrometres thick, the palisade layer ${LAYERS.palisade}, the spongy layer ${LAYERS.spongy} and the lower epidermis ${LAYERS.lowerEpi}. What is the thickness of the mesophyll, in micrometres?`,
  value: N.mesophyll, unit: 'micrometres',
  sol: r`Mesophyll = palisade + spongy $= ${LAYERS.palisade} + ${LAYERS.spongy} = ${N.mesophyll}$ micrometres.`,
  scheme: [[`${N.mesophyll} micrometres`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 160 || 'value');
add('patch-num', num({
  stem: 'A monocot root has 8 xylem arms alternating with an equal number of phloem patches. How many patches of vascular tissue (xylem and phloem together) are there in all?',
  value: N.monoPatches,
  sol: r`Eight xylem patches and eight phloem patches: $2 \times 8 = ${N.monoPatches}$.`,
  scheme: [[`${N.monoPatches}`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => q.answer.value === patches(8) || 'value');
add('sample-num', num({
  stem: `A student identifies ${SAMPLE.total} cells in a field of a stem section: ${SAMPLE.collenchyma} collenchyma, ${SAMPLE.parenchyma} parenchyma and ${SAMPLE.sclerenchyma} sclerenchyma. What percentage of the cells are collenchyma?`,
  value: N.sampleCollenPct, unit: 'percent',
  sol: r`$\dfrac{${SAMPLE.collenchyma}}{${SAMPLE.total}} \times 100 = ${N.sampleCollenPct}$ percent.`,
  scheme: [[`${N.sampleCollenPct} percent`, 1]],
  d: 1, c: 'application', t: [1],
}), (q) => q.answer.value === pct(20, 80) || 'value');
add('endo-short', short({
  marks: 2,
  stem: 'Describe the endodermis of a root and explain the role of the Casparian strips.',
  model: 'The **endodermis** is a single layer of **barrel-shaped** cells forming the innermost layer of the cortex. Its walls carry **Casparian strips**, bands of **suberin**, so water and minerals must pass through the **cytoplasm** of its cells, which lets the plant control what reaches the xylem.',
  sol: 'Endodermis; Casparian strips make water pass through cells.',
  scheme: [['Single layer, barrel-shaped, innermost cortex', 1], ['Casparian strips of suberin; water must enter the cells', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('monostem-short', short({
  marks: 2,
  stem: 'List four anatomical features of a monocot stem as seen in transverse section.',
  model: 'A **monocot stem** has a **sclerenchymatous hypodermis** and a large **undifferentiated ground tissue**. Its **vascular bundles are scattered**, each **conjoint and closed** with a **sclerenchymatous sheath**. **Phloem parenchyma is absent**, and a **water-containing cavity** is present in the bundle.',
  sol: 'Four features of the monocot stem.',
  scheme: [['Hypodermis and ground tissue', 1], ['Bundles scattered, closed, sheath; no phloem parenchyma', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('leafpar-short', short({
  marks: 2,
  stem: 'A student cuts a transverse section of a mustard leaf. Name the two kinds of mesophyll she will see and state one difference between them.',
  model: 'The mesophyll has **palisade parenchyma** and **spongy parenchyma**. The palisade cells are **elongated, tightly packed** and lie below the **upper** epidermis with many chloroplasts, whereas the spongy cells are **oval or round, loosely arranged** with **large air spaces**, towards the lower epidermis.',
  sol: 'Palisade versus spongy.',
  scheme: [['Two kinds named', 1], ['One difference', 1]],
  d: 2, c: 'application', t: [2],
}));
add('bulliform-short', short({
  marks: 2,
  stem: 'In a dry spell a farmer notices that the leaves of his wheat plants curl inward. Which cells are involved, and how does the curling help the plant?',
  model: '**Bulliform cells**, large, empty, colourless cells on the **upper epidermis**, lose water and **turgor**, so the leaf **rolls inward**. This exposes less surface to the air and so **minimises water loss** by transpiration.',
  sol: 'Bulliform cells; rolling reduces water loss.',
  scheme: [['Bulliform cells lose turgor; leaf rolls', 1], ['Reduces water loss', 1]],
  d: 2, c: 'application', t: [2],
}));
add('root-short', short({
  marks: 3,
  stem: 'Distinguish a dicot root from a monocot root on three anatomical points.',
  model: 'A **dicot root** has **two to four** xylem patches (diarch to tetrarch) and a **small pith**. A **monocot root** has **more than six** xylem bundles, that is **polyarch**, and a **large, well-developed pith**. In both, the xylem is **exarch**, the bundles are **radial**, and there is an endodermis with Casparian strips.',
  sol: 'Number of xylem bundles; pith; shared features.',
  scheme: [['Number of xylem bundles', 1], ['Pith', 1], ['Shared radial, exarch plan', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('dicstem-short', short({
  marks: 3,
  stem: 'Describe the layers seen, from outside to inside, in a transverse section of a dicot stem up to the vascular bundles.',
  model: 'The outermost layer is the **epidermis** with a cuticle, a few stomata and multicellular trichomes. Below it is the **hypodermis** of a few layers of **collenchyma**. The **cortex** has several layers of parenchyma with intercellular spaces, and its innermost layer is the **endodermis** or **starch sheath**. Inside it lies the **pericycle**, often as **sclerenchyma** caps over the vascular bundles.',
  sol: 'Epidermis, hypodermis, cortex, endodermis, pericycle.',
  scheme: [['Epidermis with cuticle, stomata, trichomes', 1], ['Collenchymatous hypodermis and cortex', 1], ['Endodermis and pericycle', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('leaves-short', short({
  marks: 3,
  stem: 'Distinguish a dorsiventral leaf from an isobilateral leaf on three points, naming the plant group in which each is usually found.',
  model: 'A **dorsiventral** leaf, usually of **dicots**, has **more stomata on the lower** epidermis and mesophyll divided into **palisade and spongy** parenchyma. An **isobilateral** leaf, usually of **monocots**, has **stomata on both** surfaces in about equal numbers and **undifferentiated** mesophyll, and its upper epidermis has **bulliform cells**.',
  sol: 'Stomata, mesophyll, bulliform cells; plant groups.',
  scheme: [['Stomata distribution', 1], ['Mesophyll', 1], ['Bulliform cells; plant groups', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('root-long', long({
  stem: 'Describe the anatomy of a dicot root as seen in transverse section, and state how a monocot root differs.',
  model: 'From outside: the **epidermis** bears unicellular **root hairs**. The **cortex** has several layers of thin-walled parenchyma with intercellular spaces. The **endodermis** is a single layer of barrel-shaped cells with **Casparian strips** of suberin. The **pericycle**, a few layers of thick-walled parenchyma, gives rise to **lateral roots**. There are **two to four** patches of **exarch xylem** alternating with phloem, the **radial** arrangement, with **conjunctive tissue** between them, and a **small pith**.\n\nA **monocot root** has the same plan, but **more than six** xylem bundles (polyarch) and a **large, well-developed pith**.',
  sol: 'Layers of the dicot root; monocot differences.',
  scheme: [['Epidermis and cortex', 1], ['Endodermis with Casparian strips', 1], ['Pericycle and lateral roots', 1], ['Radial exarch xylem and phloem, conjunctive tissue, pith', 1], ['Monocot differences', 1]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [2],
}));
add('stem-long', long({
  stem: 'Compare the transverse sections of a dicot stem and a monocot stem on the hypodermis, the ground tissue, the vascular bundles and the phloem.',
  model: '**Hypodermis:** collenchymatous in the dicot stem; sclerenchymatous in the monocot stem.\n\n**Ground tissue:** in the dicot stem it is differentiated into cortex, endodermis (starch sheath), pericycle, medullary rays and a large pith. In the monocot stem it is a large, undifferentiated mass of parenchyma.\n\n**Vascular bundles:** in the dicot stem they are few and arranged in a **ring**, conjoint, **open** (with cambium) and endarch. In the monocot stem they are **many and scattered**, conjoint and **closed**, each with a sclerenchymatous sheath, smaller and more numerous near the periphery.\n\n**Phloem:** phloem parenchyma is present in the dicot stem and absent in the monocot stem; the monocot bundle has a water-containing cavity.',
  sol: 'Four points of comparison.',
  scheme: [['Hypodermis', 1], ['Ground tissue', 1.5], ['Vascular bundles', 1.5], ['Phloem parenchyma and cavity', 1]],
  wl: [80, 240],
  d: 3, c: 'analysis', t: [2],
}));
add('leaf-long', long({
  stem: 'Describe the anatomy of a dicot leaf as seen in transverse section, and state how an isobilateral leaf differs.',
  model: 'The **upper and lower epidermis** are covered by a cuticle; the lower epidermis has **more stomata**, each with two bean-shaped guard cells. The **mesophyll**, between the epidermises, has **palisade parenchyma**, elongated, tightly packed cells below the upper epidermis rich in chloroplasts, and **spongy parenchyma**, loosely arranged cells with **large air spaces** towards the lower side. **Vascular bundles** in the veins are surrounded by a **bundle sheath**, with xylem towards the upper side and phloem towards the lower.\n\nAn **isobilateral** leaf has **stomata on both** surfaces, **undifferentiated** mesophyll and **bulliform cells** in the upper epidermis.',
  sol: 'Layers of a dicot leaf; isobilateral leaf.',
  scheme: [['Epidermis, cuticle, stomata', 1], ['Palisade parenchyma', 1], ['Spongy parenchyma', 1], ['Vascular bundles and sheath', 1], ['Isobilateral differences', 1]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [2],
}));
add('catalog-long', long({
  stem: 'A student wrote these notes on three plant samples. Stem sample: “vascular bundles in a ring with cambium, so the bundles are closed.” Leaf sample: “palisade and spongy parenchyma are present, so it is an isobilateral leaf.” Root sample: “xylem lies towards the pith, so it is exarch.” Evaluate each statement, correct the errors, and say what the notes should have concluded in each case.',
  model: '**Stem.** Bundles in a ring with cambium are **open**, not closed; a closed bundle lacks cambium. The sample is probably a **dicot stem**. **Leaf.** Palisade and spongy parenchyma mean a **dorsiventral** leaf, not isobilateral; an isobilateral leaf has undifferentiated mesophyll. It is probably a dicot leaf. **Root.** Xylem with the protoxylem towards the **pith** is **endarch**, the stem pattern; exarch means protoxylem towards the periphery, as in roots. So the notes confuse the terms.\n\n**Judgement.** All three statements are wrong: each conclusion contradicts the observation that was recorded.',
  sol: 'Evaluates three statements; corrects each.',
  scheme: [['Stem: open, dicot', 1.5], ['Leaf: dorsiventral, dicot', 1.5], ['Root versus stem xylem terms', 1], ['Overall judgement', 1]],
  wl: [80, 240],
  d: 4, c: 'evaluation', t: [1, 2],
}));
{
  const patchesMono = N.monoPatches;
  add('root-case', mk.case({
    passage: `A student cuts a thin transverse section of a young root and examines it. She sees an epidermis bearing root hairs, a wide cortex, and a ring of cells inside it. Within this ring there are eight patches of xylem, each with its smallest vessels towards the outside, alternating with eight patches of phloem. At the centre is a large region of parenchyma.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'What kind of root is this?',
        right: 'A monocot root, because the xylem is polyarch and the pith is large',
        wrong: ['A dicot root, because the xylem is polyarch and the pith is large', 'A monocot stem, because the bundles are radial', 'A dicot stem, because the pith is large'],
        sol: 'More than six xylem bundles and a large pith are typical of a monocot root — option (@K).',
        d: 1, c: 'application', t: [2],
      })),
      part('b', num({
        stem: 'How many patches of vascular tissue (xylem and phloem together) does the section show?',
        value: patchesMono,
        sol: r`$8 + 8 = ${patchesMono}$ patches.`,
        scheme: [[`${patchesMono}`, 1]],
        d: 1, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'The smallest vessels lie towards the outside of each xylem patch. Name this arrangement and state which vessels these are.',
        model: 'The arrangement is **exarch**, the pattern of roots. The smallest vessels, towards the periphery, are the **protoxylem**, the first-formed xylem, while the larger vessels towards the centre are the **metaxylem**, formed later.',
        sol: 'Exarch; protoxylem outside.',
        scheme: [['Exarch', 1], ['Protoxylem outside, metaxylem inside', 1]],
        d: 2, c: 'application', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'Name the region at the centre of the section and compare it with the same region in a dicot root.',
          model: 'The central region is the **pith**, made of **parenchyma**. In this monocot root it is **large and well developed**, whereas in a **dicot root** the pith is **small** or may be absent.',
          sol: 'Large pith versus small pith.',
          scheme: [['Pith of parenchyma, large here', 1], ['Small or absent in dicot root', 1]],
          d: 2, c: 'understanding', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 16 || 'value');
}
{
  const dens = N.bundle2Density;
  add('stem-case', mk.case({
    passage: `A student cuts a transverse section of a stem and sees many vascular bundles scattered through a large mass of parenchyma. Each bundle is surrounded by a ring of thick-walled cells, and contains xylem and phloem but no cambium. In a field of ${BUNDLE2.field} square millimetres she counts ${BUNDLE2.counted} bundles. The bundles are smaller and closer together near the outer edge.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'What type of vascular bundle is described?',
        right: 'Conjoint and closed',
        wrong: ['Conjoint and open', 'Radial and open', 'Radial and closed'],
        sol: 'Xylem and phloem on the same radius with no cambium make a conjoint, closed bundle, typical of a monocot stem — option (@K).',
        d: 1, c: 'application', t: [1],
      })),
      part('b', num({
        stem: 'How many bundles per square millimetre did she count?',
        value: dens,
        sol: r`$\dfrac{${BUNDLE2.counted}}{${BUNDLE2.field}} = ${dens}$ bundles per square millimetre.`,
        scheme: [[`${dens}`, 1]],
        d: 1, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'Name the stem type and give two other features of its section that would confirm this.',
        model: 'This is a **monocot stem**. Further confirmation comes from the **sclerenchymatous hypodermis**, the **undifferentiated ground tissue**, the **absence of phloem parenchyma** and a **water-containing cavity** in the bundles.',
        sol: 'Monocot stem and two more features.',
        scheme: [['Monocot stem', 1], ['Two confirming features', 1]],
        d: 2, c: 'application', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'Why is a simple count of bundles per square millimetre only an estimate for the whole section?',
          model: 'The bundles are **not evenly spread**: they are **smaller and more crowded near the periphery** and fewer, larger ones lie near the centre. A count from one field therefore does not represent the whole section, so scaling it up gives only an **estimate**.',
          sol: 'Uneven distribution of bundles.',
          scheme: [['Bundles crowded at the periphery, not even', 1], ['So scaling up is only an estimate', 1]],
          d: 3, c: 'analysis', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 6 || 'value');
}
void round;
