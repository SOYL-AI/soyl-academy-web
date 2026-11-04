// ICSE 9 Biology ch02 Tissues — question bank in ICSE school-examination style (10-mark structured questions).
// Numbers come from calc.mjs. AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true, R does not explain.
import { mk, add, svgV, r } from '../../icse-9-biology-ch01/src/lib.mjs';
import { SHOOT, DYE2, HEART2, BUNDLE, SLIDE, RINGS, IMPULSE } from './calc.mjs';
import { NEURON_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const neuronFig = svgV(NEURON_LETTERED, 'A neuron with parts lettered A to E');
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct term', 1]], ...o });

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('apical-mcq', mcq({
  stem: 'Which meristem is found at the tip of a root?',
  right: 'Apical meristem', wrong: ['Lateral meristem', 'Intercalary meristem', 'Cambium'],
  sol: 'The tips of roots and shoots hold the apical meristems — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('colleno-mcq', mcq({
  stem: 'Which tissue gives flexible support to leaf stalks and young stems?',
  right: 'Collenchyma', wrong: ['Sclerenchyma', 'Xylem', 'Cuboidal epithelium'],
  sol: 'Living collenchyma with thickened corners supports parts that bend — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('phloem-mcq', mcq({
  stem: 'Which plant tissue carries food from the leaves to the other parts of the plant?',
  right: 'Phloem', wrong: ['Xylem', 'Parenchyma', 'Sclerenchyma'],
  sol: 'Sieve tubes of the phloem conduct food — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('squam-mcq', mcq({
  stem: 'Which epithelium lines the air sacs of the lungs?',
  right: 'Squamous epithelium', wrong: ['Columnar epithelium', 'Cuboidal epithelium', 'Ciliated epithelium'],
  sol: 'Thin flat cells let gases diffuse easily — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('adipose-mcq', mcq({
  stem: 'Which connective tissue stores fat?',
  right: 'Adipose tissue', wrong: ['Areolar tissue', 'Cartilage', 'Bone'],
  sol: 'Adipose cells are filled with fat — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('cardiac-mcq', mcq({
  stem: 'Which muscle is striated but involuntary?',
  right: 'Cardiac muscle', wrong: ['Skeletal muscle', 'Smooth muscle', 'Muscle of the limbs'],
  sol: 'Cardiac muscle is striped but works without our control — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('axon-mcq', mcq({
  stem: 'Which feature of a neuron suits it to carry impulses over long distances?',
  right: 'A long axon', wrong: ['A large vacuole', 'Thick cellulose wall', 'Many chloroplasts'],
  sol: 'The long axon carries the impulse far from the cell body — option (@K).',
  d: 1, c: 'understanding', t: [4, 5],
}));

// ---------------------------------------------------------------- t01 meristematic tissues
add('girth-mcq', mcq({
  stem: 'A wire loosely tied round a young tree trunk is found years later buried in the wood because the trunk has thickened. The tissue that thickened it is the',
  right: 'cambium, a lateral meristem', wrong: ['apical meristem at the shoot tip', 'intercalary meristem at the nodes', 'xylem parenchyma only'],
  sol: 'The cambium adds new tissue on its sides and increases girth — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('intercal-mcq', mcq({
  stem: 'After a lawn mower cuts off the tops of grass leaves, the leaves go on lengthening from their bases. The tissue responsible is the',
  right: 'intercalary meristem', wrong: ['apical meristem of the root', 'cambium', 'cork'],
  sol: 'Grasses have an intercalary meristem at the base of the leaves and internodes — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('meristem-feat-mcq', mcq({
  stem: 'Under a microscope a student sees small, closely packed cells with thin walls, dense cytoplasm, a large nucleus, no vacuole and no spaces between them. The tissue is',
  right: 'meristematic tissue', wrong: ['parenchyma', 'sclerenchyma', 'xylem'],
  sol: 'These are features of dividing, meristematic cells — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('shoot-num', num({
  stem: `A shoot tip grows ${SHOOT.cmPerDay} cm every day. How many centimetres does it lengthen in ${SHOOT.days} days?`,
  value: SHOOT.total, unit: 'cm',
  sol: r`$${SHOOT.cmPerDay} \times ${SHOOT.days} = ${SHOOT.total}$ cm.`,
  scheme: [[`${SHOOT.total} cm`, 1]],
  d: 1, c: 'application', t: [1],
}), (q) => q.answer.value === 28 || 'value');
add('term-cambium', term({
  stem: 'Give the biological term: the lateral meristem that increases the girth of a stem.',
  model: '**Cambium.**', sol: 'Cambium.', sch: 'Cambium',
  d: 1, c: 'recall', t: [1],
}));
add('meristem-tf', tf({
  stem: 'Meristematic cells have a large central vacuole and thick walls.',
  key: 'f',
  sol: 'False. Meristematic cells have thin walls, dense cytoplasm and no large vacuole.',
  d: 2, c: 'understanding', t: [1],
}));
add('meristem-short', short({
  marks: 2,
  stem: 'Distinguish between an apical meristem and a lateral meristem on their position and the kind of growth each causes.',
  model: 'An **apical meristem** lies at the **tips of roots and shoots** and increases the **length** of the plant. A **lateral meristem** (cambium) lies **along the sides** of stems and roots and increases their **girth**.',
  sol: 'Tip and length; sides and girth.',
  scheme: [['Apical: tips, length', 1], ['Lateral: sides, girth', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('meristem-three', short({
  marks: 3,
  stem: 'Name the three kinds of meristem. State where each is found and the effect it has on the plant.',
  model: '1. **Apical**: tips of roots and shoots; increases **length**.\n2. **Intercalary**: base of leaves or internodes, as in grasses; increases length at the nodes.\n3. **Lateral**: sides of stems and roots (cambium); increases **girth**.',
  sol: 'Apical, intercalary, lateral with positions and effects.',
  scheme: [['Apical', 1], ['Intercalary', 1], ['Lateral', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 permanent tissues
add('sclere-mcq', mcq({
  stem: 'Tough, long fibres from a coconut husk are used to make doormats. The fibres are made of',
  right: 'sclerenchyma', wrong: ['parenchyma', 'collenchyma', 'phloem parenchyma'],
  sol: 'Dead, thick-walled sclerenchyma fibres give strength — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('paren-mcq', mcq({
  stem: 'The cells of a potato tuber are living and thin-walled, with small gaps between them, and they are packed with starch. The tissue is',
  right: 'parenchyma', wrong: ['collenchyma', 'sclerenchyma', 'xylem'],
  sol: 'Thin-walled living cells with spaces that store food are parenchyma — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('flex-mcq', mcq({
  stem: 'A young stem bends in the wind but does not snap. The tissue below its epidermis that allows this has living cells with',
  right: 'walls thickened at the corners', wrong: ['walls thickened all round with lignin', 'no wall at all', 'a large central nucleus and no cytoplasm'],
  sol: 'Collenchyma gives flexible support through corner thickening — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('chlorench-mcq', mcq({
  stem: 'The parenchyma of a leaf that contains chloroplasts and makes food is called',
  right: 'chlorenchyma', wrong: ['aerenchyma', 'sclereid', 'cambium'],
  sol: 'Green parenchyma is chlorenchyma — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('ring-mcq', mcq({
  stem: 'A ring of bark including the phloem is cut away from a branch. After some weeks the region just above the cut swells. The swelling is due to',
  right: 'food from the leaves collecting above the cut', wrong: ['water from the roots collecting above the cut', 'new xylem growing outwards', 'the death of the cambium'],
  sol: 'Phloem carries food down from the leaves; with it cut, food piles up above the ring — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('xylemdead-mcq', mcq({
  stem: 'Which part of the xylem is made of living cells?',
  right: 'Xylem parenchyma', wrong: ['Vessels', 'Tracheids', 'Xylem fibres'],
  sol: 'Only the xylem parenchyma is living — option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('sieve-mcq', mcq({
  stem: 'A sieve tube element has no nucleus, yet it stays alive and works. This is possible because',
  right: 'the nucleus of the neighbouring companion cell controls it', wrong: ['it is filled with lignin', 'it receives water from the xylem vessels only', 'its end walls are completely closed'],
  sol: 'The companion cell, with its nucleus, controls the sieve tube — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('ar-sclero', ar({
  a: 'Sclerenchyma tissue gives strength and hardness to plant parts.',
  r: 'The walls of sclerenchyma cells are thickened with lignin.',
  key: 'c',
  sol: 'Both are true, and the lignified walls are why the tissue is strong and hard — option (c).',
  d: 2, c: 'analysis', t: [2],
}));
add('ar-sieve', ar({
  a: 'Sieve tubes of the phloem are living cells.',
  r: 'Sieve tubes have a prominent nucleus.',
  key: 'a',
  sol: 'The assertion is true. The reason is false: sieve tubes have no nucleus; the companion cell has one — option (a).',
  d: 3, c: 'analysis', t: [2],
}));
add('ar-vessel', ar({
  a: 'Vessels of the xylem carry water upwards efficiently.',
  r: 'Vessels are long tubes of dead cells joined end to end without cross-walls.',
  key: 'c',
  sol: 'Both are true, and the continuous hollow tube is why water moves efficiently — option (c).',
  d: 2, c: 'analysis', t: [2, 5],
}));
add('xylem-tf', tf({
  stem: 'Xylem conducts water and minerals from the roots to the leaves.',
  key: 't',
  sol: 'True. Xylem carries water and minerals upwards.',
  d: 1, c: 'recall', t: [2],
}));
add('odd-simple', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: Parenchyma, Collenchyma, Xylem, Sclerenchyma.',
  model: '**Xylem**; the others are **simple permanent tissues**.', sol: 'Xylem is a complex tissue.', sch: 'Odd one and category',
  d: 2, c: 'analysis', t: [2],
}));
add('odd-xylem', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: Tracheid, Vessel, Sieve tube, Xylem fibre.',
  model: '**Sieve tube**; the others are **components of xylem**.', sol: 'The sieve tube is part of phloem.', sch: 'Odd one and category',
  d: 3, c: 'analysis', t: [2],
}));
add('reason-sclero', term({
  stem: 'Give reason: sclerenchyma cells are dead when mature.',
  model: 'Their walls are thickened with **lignin**, which blocks the passage of water and food into the cell, so the **cytoplasm dies**.', sol: 'Lignin blocks entry of materials.', sch: 'Lignin thickening stops entry',
  d: 2, c: 'understanding', t: [2],
}));
add('fill-matrix-p', fill({
  stem: 'The wide, dead tubes of the xylem that carry water are called ______.',
  acc: [['vessels', 'vessel']],
  sol: 'Vessels.',
  d: 1, c: 'recall', t: [2],
}));
add('collen-sclero-short', short({
  marks: 2,
  stem: 'Distinguish between collenchyma and sclerenchyma on the nature of the cells and the thickening of the wall.',
  model: '**Collenchyma** cells are **living**, with walls thickened only at the **corners**. **Sclerenchyma** cells are **dead**, with walls thickened all round with **lignin**, leaving a very narrow cavity.',
  sol: 'Living and corners; dead and lignin.',
  scheme: [['Collenchyma: living, corner thickening', 1], ['Sclerenchyma: dead, lignified', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('sieve-short', short({
  marks: 2,
  stem: 'State the part played by the sieve tubes and by the companion cells in the phloem.',
  model: '**Sieve tubes** are living tubes that **conduct food** from the leaves to other parts. **Companion cells** lie beside them and, having a **nucleus**, **control** the working of the sieve tubes, which have none.',
  sol: 'Sieve tubes carry food; companion cells control.',
  scheme: [['Sieve tubes conduct food', 1], ['Companion cells control them', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('parenchyma-short', short({
  marks: 3,
  stem: 'Describe the structure of parenchyma and state two of its functions.',
  model: 'Parenchyma is made of **living**, rounded cells with **thin cellulose walls** and **gaps** between them. Its functions include **storage** of food and water, and **photosynthesis** in green parts such as leaves (chlorenchyma).',
  sol: 'Living, thin-walled, spaces; storage; photosynthesis.',
  scheme: [['Living thin-walled cells', 1], ['Intercellular spaces', 1], ['Two functions', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('xylem-phloem-table', short({
  marks: 3,
  stem: 'Tabulate three differences between xylem and phloem.',
  model: '| Xylem | Phloem |\n|---|---|\n| Carries **water and minerals** | Carries **food** |\n| Conducts **upwards** | Conducts **up and down** |\n| Has **vessels** and tracheids (dead) | Has **sieve tubes** (living) and companion cells |\n| Mostly **dead** cells | Mostly **living** cells |',
  sol: 'Substance, direction, components, living or dead.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('dye2-num', num({
  stem: `Red ink rises ${DYE2.cm} cm in ${DYE2.min} minutes along a stalk. At what speed does it rise, in cm per hour?`,
  value: DYE2.cmPerHour, unit: 'cm per hour',
  sol: r`${DYE2.cm} cm in ${DYE2.min} min; in 60 min: $${DYE2.cm} \div ${DYE2.min} \times 60 = ${DYE2.cmPerHour}$ cm per hour.`,
  scheme: [[`${DYE2.cmPerHour} cm per hour`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 36 || 'value');
add('bundle-num', num({
  stem: `A stem section has ${BUNDLE.n} vascular bundles. Each carries ${BUNDLE.sievePer} sieve tubes. How many sieve tubes are there in all?`,
  value: BUNDLE.sieve,
  sol: r`$${BUNDLE.n} \times ${BUNDLE.sievePer} = ${BUNDLE.sieve}$ sieve tubes.`,
  scheme: [[`${BUNDLE.sieve}`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 240 || 'value');

// ---------------------------------------------------------------- t03 epithelial and connective tissues
add('ciliated-mcq', mcq({
  stem: 'A heavy smoker\'s windpipe loses the cilia of its lining cells. Which job is most affected?',
  right: 'Sweeping mucus and dust out of the air passage', wrong: ['Absorbing digested food', 'Storing fat', 'Joining muscle to bone'],
  sol: 'Ciliated epithelium moves mucus and dust upwards — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('joint-mcq', mcq({
  stem: 'A strong, slightly elastic band holds the thigh bone to the shin bone at the knee. It is a',
  right: 'ligament', wrong: ['tendon', 'cartilage plate', 'adipose pad'],
  sol: 'A ligament joins bone to bone — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('bone-mcq', mcq({
  stem: 'The hardness of bone tissue is mainly due to',
  right: 'calcium salts in its matrix', wrong: ['fat in its cells', 'cilia on its cells', 'cellulose in its walls'],
  sol: 'The matrix of bone contains calcium salts — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('epi-mcq', mcq({
  stem: 'A section through the lining of the small intestine shows tall, closely packed cells with their nuclei near the base. The epithelium is',
  right: 'columnar', wrong: ['squamous', 'cuboidal', 'stratified'],
  sol: 'Tall cells with basal nuclei form columnar epithelium — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('blood-mcq', mcq({
  stem: 'Blood is classed as a connective tissue because',
  right: 'its cells lie in a fluid matrix and it links distant parts of the body', wrong: ['it contains muscle fibres', 'it has no cells at all', 'it is made of neurons'],
  sol: 'Blood has cells in a fluid matrix (plasma) and connects the body by transport — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('ar-squam', ar({
  a: 'The air sacs of the lungs are lined by squamous epithelium.',
  r: 'The windpipe is lined by ciliated epithelium.',
  key: 'd',
  sol: 'Both are true, but the second statement does not explain the first — option (d).',
  d: 3, c: 'analysis', t: [3],
}));
add('odd-epith', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: Squamous, Cuboidal, Columnar, Cartilage.',
  model: '**Cartilage**; the others are **types of epithelium**.', sol: 'Cartilage is a connective tissue.', sch: 'Odd one and category',
  d: 2, c: 'analysis', t: [3],
}));
add('term-tendon', term({
  stem: 'Give the biological term: the strong tissue that joins a muscle to a bone.',
  model: '**Tendon.**', sol: 'Tendon.', sch: 'Tendon',
  d: 1, c: 'recall', t: [3],
}));
add('fill-matrix', fill({
  stem: 'The non-living material in which the cells of a connective tissue lie is called the ______.',
  acc: [['matrix']],
  sol: 'Matrix.',
  d: 1, c: 'recall', t: [3],
}));
add('reason-squam', term({
  stem: 'Give reason: the walls of the lung air sacs are lined by very thin, flat cells.',
  model: 'Thin **squamous** cells let **oxygen and carbon dioxide diffuse** quickly across the lining.', sol: 'Easy diffusion.', sch: 'Thin cells allow quick diffusion',
  d: 2, c: 'understanding', t: [3, 5],
}));
add('tendon-short', short({
  marks: 2,
  stem: 'Distinguish between a tendon and a ligament.',
  model: 'A **tendon** joins a **muscle to a bone** and is strong but inelastic. A **ligament** joins **one bone to another** at a joint and is elastic.',
  sol: 'Muscle to bone; bone to bone.',
  scheme: [['Tendon: muscle to bone', 1], ['Ligament: bone to bone', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('ciliated-short', short({
  marks: 2,
  stem: 'Name the epithelium that lines the windpipe, state its function and say how its cilia help.',
  model: 'The windpipe is lined by **ciliated columnar epithelium**. Its **cilia beat** to sweep **mucus with trapped dust and germs** upwards and out of the air passage, keeping the lungs clean.',
  sol: 'Ciliated columnar; sweeps mucus and dust.',
  scheme: [['Ciliated columnar epithelium', 1], ['Cilia move mucus and dust out', 1]],
  d: 2, c: 'application', t: [3],
}));
add('connective-three', short({
  marks: 3,
  stem: 'Name three connective tissues, and for each give one place where it is found and one function.',
  model: '1. **Adipose tissue**: under the skin; stores fat and insulates.\n2. **Cartilage**: ear or nose tip; gives flexible support.\n3. **Bone**: skeleton; gives hard support and protects organs. (Areolar tissue, tendon, ligament or blood may also be given.)',
  sol: 'Any three with place and function.',
  scheme: [['First tissue, place, function', 1], ['Second tissue, place, function', 1], ['Third tissue, place, function', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 muscular and nervous tissues
add('smooth-mcq', mcq({
  stem: 'Food is pushed along the gut by waves of contraction that we cannot control. The muscle responsible is',
  right: 'unstriated (smooth) muscle', wrong: ['striated (skeletal) muscle', 'muscle attached to bones', 'cardiac muscle'],
  sol: 'The gut wall has involuntary, unstriated muscle — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('dendrite-mcq', mcq({
  stem: 'A neuron in a fingertip is stimulated by a pin-prick. The part of the neuron that first receives the stimulus is the',
  right: 'dendrite', wrong: ['axon terminal', 'myelin sheath', 'nucleus'],
  sol: 'Dendrites receive impulses and pass them to the cell body — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('figN-mcq', mcq({
  stem: 'In the figure of a neuron, which letter marks the part that carries the impulse away from the cell body?',
  right: 'D', wrong: ['A', 'B', 'C'],
  sol: 'D is the axon; A is the group of dendrites, B the cell body and C its nucleus — option (@K).',
  d: 2, c: 'application', t: [4],
  assets: [neuronFig],
}));
add('ar-smooth', ar({
  a: 'Smooth muscle is under voluntary control.',
  r: 'Smooth muscle has no striations.',
  key: 'b',
  sol: 'The assertion is false: smooth muscle is involuntary. The reason is true — option (b).',
  d: 3, c: 'analysis', t: [4],
}));
add('cardiac-tf', tf({
  stem: 'Cardiac muscle shows stripes and is under voluntary control.',
  key: 'f',
  sol: 'False. Cardiac muscle is striated but involuntary.',
  d: 2, c: 'understanding', t: [4],
}));
add('fill-cyton', fill({
  stem: 'The part of a neuron that contains the nucleus is the ______.',
  acc: [['cell body', 'cyton']],
  sol: 'Cell body (cyton).',
  d: 1, c: 'recall', t: [4],
}));
add('term-neuron', term({
  stem: 'Give the biological term for a nerve cell, the cell that carries impulses.',
  model: '**Neuron.**', sol: 'Neuron (nerve cell).', sch: 'Neuron',
  d: 1, c: 'recall', t: [4],
}));
add('heart2-num', num({
  stem: `A resting heart beats ${HEART2.perMin} times a minute. How many times does it beat in one hour?`,
  value: HEART2.perHour,
  sol: r`$${HEART2.perMin} \times 60 = ${HEART2.perHour}$ beats.`,
  scheme: [[`${HEART2.perHour} beats`, 1]],
  d: 2, c: 'application', t: [4],
}), (q) => q.answer.value === 3600 || 'value');
add('smooth-short', short({
  marks: 2,
  stem: 'State two differences between striated muscle and unstriated muscle.',
  model: '1. Striated muscle shows **stripes** and has **long, cylindrical** fibres with many nuclei; unstriated muscle has **no stripes** and **spindle-shaped** cells with one nucleus.\n2. Striated muscle is **voluntary**; unstriated muscle is **involuntary**.',
  sol: 'Stripes and shape; control.',
  scheme: [['First difference', 1], ['Second difference', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('neuron-short', short({
  marks: 2,
  stem: 'State the function of the dendrites and of the axon of a neuron.',
  model: '**Dendrites** receive impulses from other neurons or from receptors and pass them to the cell body. The **axon** carries the impulse **away** from the cell body to the axon terminals, which pass it on.',
  sol: 'Dendrites receive; axon carries away.',
  scheme: [['Dendrites receive impulses', 1], ['Axon carries impulses away', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('muscle-table', short({
  marks: 3,
  stem: 'Tabulate three differences between striated muscle and cardiac muscle.',
  model: '| Striated muscle | Cardiac muscle |\n|---|---|\n| **Voluntary** | **Involuntary** |\n| Fibres **unbranched** | Fibres **branched** |\n| Found in **limbs**, attached to bones | Found only in the **heart** |\n| Tires with prolonged work | **Does not tire** |',
  sol: 'Control, branching, position, fatigue.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('neuron-draw', short({
  marks: 3, wl: null,
  stem: 'Draw a neat, labelled diagram of a neuron. Label the dendrites, cell body, nucleus, axon and axon terminals.',
  model: 'A **cell body** with a round **nucleus**; several branched **dendrites** at one end; one long **axon** (with segments of myelin sheath) running to the other end, which divides into **axon terminals**. Five labels with ruled lines.',
  sol: 'Cell body with nucleus, dendrites, axon, terminals; labels.',
  scheme: [['Cell body with nucleus and dendrites', 1], ['Long axon with terminals', 1], ['Five correct labels', 1]],
  d: 2, c: 'application', t: [4],
}));
add('slide-num', num({
  stem: `On a slide, ${SLIDE.striped} of ${SLIDE.cells} muscle cells counted show stripes. What percentage of the cells are striped?`,
  value: SLIDE.pctStriped, unit: 'percent',
  sol: r`$\dfrac{${SLIDE.striped}}{${SLIDE.cells}} \times 100 = ${SLIDE.pctStriped}$ percent.`,
  scheme: [[`${SLIDE.pctStriped} percent`, 1]],
  d: 2, c: 'application', t: [4],
}), (q) => q.answer.value === 36 || 'value');

// ---------------------------------------------------------------- t05 role of tissues
add('passage-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [xylem, phloem, sclerenchyma, collenchyma, squamous, cardiac, apical, neuron]\n\nThe tips of roots and shoots grow in length by the activity of the (a) ______ meristem. Water and minerals rise through the (b) ______, while food is carried by the (c) ______. Very thin (d) ______ epithelium lets gases pass easily in the lungs, and a (e) ______ carries impulses.',
  acc: [['apical'], ['xylem'], ['phloem'], ['squamous'], ['neuron']],
  sol: '(a) apical; (b) xylem; (c) phloem; (d) squamous; (e) neuron.',
  d: 2, c: 'understanding', t: [1, 2, 5],
}));
add('neuron-match5', match({
  marks: 5,
  stem: 'Study the diagram of a neuron and match each lettered part with its function.',
  pairs: [
    ['A', 'Receive impulses and pass them to the cell body'],
    ['B', 'Contains the nucleus; controls the working of the neuron'],
    ['C', 'Controls the activities of the neuron'],
    ['D', 'Carries the impulse away from the cell body'],
    ['E', 'Pass the impulse on to the next cell'],
  ],
  order: [1, 4, 3, 0, 2],
  sol: 'A dendrites; B cell body; C nucleus; D axon; E axon terminals.',
  d: 2, c: 'application', t: [4, 5],
  assets: [neuronFig],
}));
add('function-short', short({
  marks: 2,
  stem: 'Explain how the structure of xylem vessels suits their function.',
  model: 'Vessels are **long, hollow tubes** of **dead** cells joined end to end with **no cross-walls**, so water flows through easily. Their **thick, lignified walls** also stop them collapsing under the pull of water.',
  sol: 'Hollow continuous tube; thick walls.',
  scheme: [['Long hollow tube, no cross-walls', 1], ['Thick walls resist collapse', 1]],
  d: 3, c: 'analysis', t: [5, 2],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('girth-long', long({
  marks: 10, wl: null,
  stem: `A forester drives a nail into a young teak sapling at a height of 1.5 m above the ground. Nine years later the sapling is a tree whose trunk is much thicker, but the nail is still at 1.5 m. A cut across the trunk shows ${RINGS.n} rings of new wood, each ${RINGS.cm} cm wide.\n\n(a) Explain why the nail stayed at the same height although the tree grew taller. [2]\n\n(b) Name the tissue that thickened the trunk. Calculate the thickness of wood added by the ${RINGS.n} rings. [3]\n\n(c) State one function of collenchyma and one of sclerenchyma in a young stem. [2]\n\n(d) Draw a neat, labelled diagram of a young plant showing the apical meristem of the shoot, the apical meristem of the root and the lateral meristem. [3]`,
  model: `**(a)** The tree grew taller only at its **tip**, by the **apical meristem**; the part of the trunk already formed does not lengthen, so the nail, fixed in older tissue, stays at the same height.\n\n**(b)** The **cambium** (lateral meristem). Thickness = ${RINGS.n} × ${RINGS.cm} = **${RINGS.radiusCm} cm**.\n\n**(c)** **Collenchyma** gives **flexible support** to the young stem; **sclerenchyma** gives **strength and hardness**.\n\n**(d)** A plant with a shoot above and a root below the soil; the **shoot-tip** and **root-tip** marked as apical meristems and the **cambium** marked along the stem as the lateral meristem. Three labels with ruled lines.`,
  sol: `Apical growth at the tip; cambium; ${RINGS.radiusCm} cm; collenchyma flexible, sclerenchyma strong; labelled plant.`,
  scheme: [['Growth is at the tip', 1], ['Older tissue does not lengthen', 1], ['Cambium named', 1], [`Working ${RINGS.n} × ${RINGS.cm}`, 1], [`${RINGS.radiusCm} cm`, 1], ['Collenchyma function', 1], ['Sclerenchyma function', 1], ['Plant drawn with shoot and root', 1], ['Three labels', 2]],
  d: 4, c: 'analysis', t: [1, 2],
}), (q) => RINGS.radiusCm === 3.6 || 'rings');
add('celery-long', long({
  marks: 10, wl: null,
  stem: `A student stands a fresh celery stalk in red ink. After ${DYE2.min} minutes the colour has climbed ${DYE2.cm} cm up the stalk. She then cuts the stalk across and sees red dots in a ring near the outer edge.\n\n(a) Calculate the speed of the ink in cm per hour. [2]\n\n(b) Name the tissue that carried the ink and state two parts that make it up. [2]\n\n(c) State two features that make this tissue suitable for carrying water. [3]\n\n(d) Draw a neat, labelled diagram of the long section of the tissue that carries food, naming the sieve tube, sieve plate and companion cell. [3]`,
  model: `**(a)** ${DYE2.cm} cm in ${DYE2.min} min; in 60 min: ${DYE2.cm} ÷ ${DYE2.min} × 60 = **${DYE2.cmPerHour} cm per hour**.\n\n**(b)** **Xylem**; made of **vessels, tracheids**, xylem fibres and xylem parenchyma (any two).\n\n**(c)** Vessels are **long hollow tubes** with **no cross-walls**; the cells are **dead**, so there is no cytoplasm to block the flow; **thick lignified walls** keep the tubes from collapsing. (any two features; third mark for a correct reason)\n\n**(d)** A column of **sieve tube** cells joined end to end, with a **sieve plate** at each joint and a **companion cell** with a nucleus beside each. Three labels.`,
  sol: `${DYE2.cmPerHour} cm per hour; xylem with vessels and tracheids; hollow dead tubes; labelled phloem.`,
  scheme: [['Working', 1], [`${DYE2.cmPerHour} cm per hour`, 1], ['Xylem', 1], ['Two parts', 1], ['Two features', 2], ['Reason', 1], ['Sieve tubes with sieve plates and companion cells drawn', 1], ['Three labels', 2]],
  d: 3, c: 'application', t: [2],
}));
add('epith-long', long({
  marks: 10, wl: null,
  stem: 'A doctor examines two slides of lining tissue. Slide P, from the windpipe, shows tall cells with hair-like projections on the free surface. Slide Q, from the wall of a lung air sac, shows a single layer of very thin, flat cells.\n\n(a) Name the type of epithelium on each slide. [2]\n\n(b) State the function of the projections on slide P and say what would happen if they were damaged. [3]\n\n(c) Explain why the cells on slide Q are suited to the lung air sac. [2]\n\n(d) Draw a neat, labelled diagram of the tissue on slide P, naming the cilia, nucleus and basement layer. [3]',
  model: '**(a)** P: **ciliated columnar epithelium**; Q: **squamous epithelium**.\n\n**(b)** The **cilia** beat and **sweep mucus with dust and germs** upwards and out of the air passage. If damaged, the mucus would **collect in the lungs**, so dust and germs would not be removed and infection would be more likely.\n\n**(c)** The cells are **thin and flat**, so oxygen and carbon dioxide **diffuse** across them very quickly.\n\n**(d)** A row of **tall cells** standing on a **basement layer**, each with a **nucleus** near the base and **cilia** on the free surface. Three labels.',
  sol: 'Ciliated columnar and squamous; cilia sweep mucus; thin cells for diffusion; labelled diagram.',
  scheme: [['Ciliated columnar', 1], ['Squamous', 1], ['Cilia sweep mucus and dust', 1], ['Mucus collects in the lungs', 1], ['Infection more likely', 1], ['Thin and flat', 1], ['Quick diffusion', 1], ['Tall cells on basement layer with cilia', 1], ['Nucleus and three labels', 2]],
  d: 3, c: 'application', t: [3],
}));
add('muscle-long', long({
  marks: 10, wl: null,
  stem: `A student studies three prepared slides. On slide X, ${SLIDE.striped} of the ${SLIDE.cells} cells counted show stripes. Slide Y shows striped cells that are branched and joined by dark lines. Slide Z shows spindle-shaped cells with one nucleus each and no stripes.\n\n(a) What percentage of the cells counted on slide X are striped? [2]\n\n(b) Name the muscle on slide Y and give two reasons for your answer. [3]\n\n(c) State where the muscle on slide Z is found and whether it is voluntary or involuntary. [1]\n\n(d) Draw a neat, labelled diagram of a cell of the muscle on slide Z, naming the cell membrane, nucleus and cytoplasm. [4]`,
  model: `**(a)** ${SLIDE.striped} ÷ ${SLIDE.cells} × 100 = **${SLIDE.pctStriped} percent**.\n\n**(b)** **Cardiac muscle**: its cells are **striped and branched**, and are joined by **intercalated discs**, as in the wall of the heart. (any two reasons)\n\n**(c)** In the **wall of the gut** (or blood vessels); **involuntary**.\n\n**(d)** A **spindle-shaped** cell, tapering at both ends, with a **nucleus** in the middle, **cytoplasm** and **cell membrane** labelled; no stripes drawn.`,
  sol: `${SLIDE.pctStriped} percent; cardiac muscle; smooth muscle in gut, involuntary; labelled spindle cell.`,
  scheme: [['Working', 1], [`${SLIDE.pctStriped} percent`, 1], ['Cardiac muscle', 1], ['Two reasons', 2], ['Location and involuntary', 1], ['Spindle-shaped outline with no stripes', 2], ['Nucleus', 1], ['Membrane and cytoplasm labels', 1]],
  d: 3, c: 'application', t: [4],
}), (q) => SLIDE.pctStriped === 36 || 'pct');
add('neuron-long', long({
  marks: 10, wl: null,
  stem: `A girl touches a hot pan and pulls her hand away at once. The impulse travels along the axon of a neuron, which is ${IMPULSE.axonM} m long, at ${IMPULSE.mPerS} m per second.\n\n(a) State, in order, the parts of the neuron that the impulse passes through, starting where it is received. [3]\n\n(b) Calculate the time taken, in milliseconds, for the impulse to travel along this axon. [2]\n\n(c) Name the type of muscle that moves her arm and state whether it is voluntary or involuntary. [1]\n\n(d) Draw a neat, labelled diagram of a neuron, naming five parts. [4]`,
  model: `**(a)** **Dendrites** (receive) → **cell body** (with nucleus) → **axon** → **axon terminals** (pass the impulse on).\n\n**(b)** Time = ${IMPULSE.axonM} ÷ ${IMPULSE.mPerS} = 0.012 s = **${IMPULSE.ms} milliseconds**.\n\n**(c)** **Striated (skeletal) muscle**; **voluntary**.\n\n**(d)** A **cell body** with **nucleus**; branched **dendrites**; a long **axon** with myelin sheath; **axon terminals**. Five labels.`,
  sol: `Dendrites, cell body, axon, terminals; ${IMPULSE.ms} ms; striated voluntary muscle; labelled neuron.`,
  scheme: [['Dendrites and cell body', 1], ['Axon', 1], ['Axon terminals', 1], ['Working', 1], [`${IMPULSE.ms} milliseconds`, 1], ['Striated, voluntary', 1], ['Neuron outline with cell body and dendrites', 1], ['Axon and terminals', 1], ['Five labels', 2]],
  d: 3, c: 'application', t: [4],
}), (q) => IMPULSE.ms === 12 || 'ms');
add('connective-long', long({
  marks: 10, wl: null,
  stem: 'A student looks at three slides of connective tissue. Slide L shows large round cells with their nuclei pushed to the edge. Slide M shows rounded cells lying singly in small spaces in a firm, bendy matrix. Slide N shows rings of hard matrix round a central canal.\n\n(a) Name the tissue on each slide. [3]\n\n(b) Give one place in the body where tissue L and tissue M are found. [2]\n\n(c) State the function of tissue L in an animal living in a very cold place. [2]\n\n(d) Draw a neat, labelled diagram of tissue L, showing the cell, nucleus and fat droplet. [3]',
  model: '**(a)** L: **adipose tissue**; M: **cartilage**; N: **bone**.\n\n**(b)** L: **under the skin** (or around the kidneys); M: **tip of the ear** or nose (or the ends of bones).\n\n**(c)** It **stores fat** that is a reserve of energy and acts as an **insulating layer** that reduces heat loss.\n\n**(d)** A group of **large round cells**, each with a big **fat droplet** filling the cell and a small **nucleus** pushed to the edge. Three labels.',
  sol: 'Adipose, cartilage, bone; places; fat store and insulation; labelled adipose cells.',
  scheme: [['Adipose', 1], ['Cartilage', 1], ['Bone', 1], ['Place for L', 1], ['Place for M', 1], ['Fat store', 1], ['Insulation', 1], ['Large round cells with edge nuclei', 1], ['Three labels', 2]],
  d: 3, c: 'application', t: [3],
}));
