// ch02 Tissues: question bank. MCQ keys are placed by the builder (balanced). AR keys planned: c (ar-meristem), a (ar-xylem), d (ar-ligament), b (ar-cardiac), a (ar-vitd), c (ar-skeletal).
// Numericals are computed here, interpolated into stem and solution, and re-solved by the check passed to add().
import { mk, add, r, near, dec } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;

// ---------------------------------------------------------------- t01 levels of organisation
add('lev-mcq', mcq({
  stem: 'A banyan leaf is made of epidermis, parenchyma, xylem and phloem working together. At which level of organisation is the leaf?',
  right: 'Organ',
  wrong: ['Tissue', 'Cell', 'Organ system'],
  sol: 'A leaf is made of several tissues that work together for photosynthesis, so it is an organ — option (@K). Each separate tissue, such as xylem, would be one level lower, and the whole shoot would be an organ system.',
  d: 2, c: 'application', t: [1],
}));
add('s3-levels', short({
  marks: 3,
  stem: 'Arrange the levels of organisation of a cow from the smallest to the largest, giving an example for each level except the organism. Why is this arrangement useful?',
  model: 'The order is cell, tissue, organ, organ system and organism. For example, a muscle cell forms muscular tissue, muscles and the heart are organs, and the circulatory system is an organ system that belongs to the cow. This division of labour is useful because each level does a job that a single cell could not do well.',
  sol: 'Five levels with examples; division of labour.',
  scheme: [['Five levels in the right order', 1], ['A correct example for at least three levels', 1], ['Division of labour makes the organism efficient', 1]],
  d: 2, c: 'understanding', t: [1],
}));

add('tf-organsys', tf({
  stem: 'The stomach is an organ, and the digestive system, which includes the stomach, is an organ system.',
  key: 't',
  sol: 'True. The stomach is made of several tissues working together, and organs such as the stomach, intestine and liver together form the digestive system.',
  d: 1, c: 'understanding', t: [1],
}));
add('fill-organ', fill({
  stem: 'Several different tissues working together to do a job, as in a root or a heart, form an ______.',
  acc: [['organ']],
  sol: 'Tissues combine to form an organ, and organs combine to form an organ system.',
  d: 1, c: 'recall', t: [1],
}));
add('s2-labour', short({
  marks: 2,
  stem: 'Is a mango leaf a cell, a tissue or an organ? Give one reason, and say how the many tissues in it show division of labour.',
  model: 'A mango leaf is an organ, because it is made of several tissues working together. The epidermis protects it, the parenchyma makes food, and the xylem and phloem carry water and food, so each tissue does a separate job.',
  sol: 'Organ; epidermis, parenchyma and vessels each do one job.',
  scheme: [['Organ, because it has several tissues', 1], ['Different tissues do different jobs', 1]],
  d: 2, c: 'application', t: [1, 2],
}));

// ---------------------------------------------------------------- t02 plant tissues
add('chk-meristem', mcq({
  stem: 'A bamboo shoot grows several centimetres longer in a night, mainly from the lower part of each segment between two nodes. Which tissue is responsible for this growth?',
  right: 'Intercalary meristem',
  wrong: ['Lateral meristem', 'Apical meristem of the root', 'Sclerenchyma'],
  sol: 'Growth at the base of an internode is the work of the intercalary meristem — option (@K). The lateral meristem adds thickness, and sclerenchyma is dead tissue that cannot divide.',
  d: 2, c: 'application', t: [2],
}));
add('chk-simple', mcq({
  stem: 'The strings in a celery stalk let it bend without snapping. Which tissue gives this flexible support?',
  right: 'Collenchyma',
  wrong: ['Sclerenchyma', 'Xylem vessels', 'Aerenchyma'],
  sol: 'Collenchyma has living cells with thickened corners and gives flexible support, so the stalk can bend — option (@K). Sclerenchyma is hard and rigid, and aerenchyma has air spaces.',
  d: 2, c: 'application', t: [2],
}));
add('chk-xylem', mcq({
  stem: 'A gardener sees that a branch cut from a tree wilts quickly, even though it is in the shade. Which tissue has stopped supplying the leaves with water?',
  right: 'Xylem',
  wrong: ['Phloem', 'Epidermis', 'Cork'],
  sol: 'Water and minerals move upwards through xylem, and cutting the branch breaks that supply — option (@K). Phloem carries food, not water.',
  d: 2, c: 'application', t: [2],
}));
add('grass-mcq', mcq({
  stem: 'A herd of goats grazes a field of grass, but the grass grows back within a week. Which statement explains this best?',
  right: 'Dividing cells at the base of the leaves are not removed when the tips are eaten.',
  wrong: ['The apical meristem of the root pushes the leaves up again.', 'Sclerenchyma divides quickly after damage.', 'The lateral meristem makes the blades longer.'],
  sol: 'Intercalary meristem at the base of the leaves lies below the part that is eaten, so it keeps dividing and the leaves lengthen again — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('aeren-mcq', mcq({
  stem: 'The stem of a lotus has large air spaces between its cells. This tissue helps the plant to:',
  right: 'float and exchange gases in water',
  wrong: ['store starch in large amounts', 'carry water upwards quickly', 'resist bending in strong winds'],
  sol: 'A parenchyma with large air spaces is called aerenchyma. The air gives buoyancy, so the plant floats and gets gases — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('cambium-mcq', mcq({
  stem: 'A forest officer counts the rings in a tree trunk and finds that the trunk of a sal tree has become much wider over 40 years. The widening is due to:',
  right: 'lateral meristem that makes new xylem and phloem',
  wrong: ['apical meristem at the shoot tip', 'intercalary meristem at each node', 'cork cells dividing in the leaves'],
  sol: 'Increase in girth is the work of the lateral meristem, the cambium, which adds new xylem and phloem each year — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('coconut-mcq', mcq({
  stem: 'The tough fibres of a coconut husk are used to make ropes and doormats. They are made of:',
  right: 'sclerenchyma, whose dead cells have thick lignified walls',
  wrong: ['collenchyma, whose living cells have thick corners', 'parenchyma, whose cells store starch', 'phloem, whose sieve tubes carry food'],
  sol: 'Husk fibres are sclerenchyma: dead cells with thick hard walls that give great strength — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('phloem-mcq', mcq({
  stem: 'Sugar made in the leaves of a sugarcane plant reaches the stem, the roots and the growing tip. The tissue that carries it is:',
  right: 'phloem, which carries food both upwards and downwards',
  wrong: ['xylem, which carries food only upwards', 'phloem, which carries food only downwards', 'xylem, which carries food in both directions'],
  sol: 'Phloem carries the food made in leaves to all parts, upwards and downwards — option (@K). Xylem carries water and minerals upwards.',
  d: 2, c: 'application', t: [2],
}));
add('ink-mcq', mcq({
  stem: 'A white tuberose flower is kept for a day in a bottle of red ink diluted with water. Thin red lines appear in its petals. These lines show the position of:',
  right: 'xylem, which carries the coloured water',
  wrong: ['phloem, which carries the coloured water', 'cork, which stores the colour', 'collenchyma, which makes the pigment'],
  sol: 'The coloured water is taken up through the stem and carried upwards by xylem, so the red lines mark xylem — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('ar-meristem', ar({
  a: 'Meristematic cells are living and divide actively.',
  r: 'Meristematic cells have a large central vacuole and very thick walls.',
  key: 'c',
  sol: 'Meristematic cells are living and keep dividing, so A is true. They are small and thin-walled with dense cytoplasm and no large vacuole, so R is false — option (c).',
  d: 2, c: 'analysis', t: [2],
}));
add('ar-xylem', ar({
  a: 'Xylem can carry water to the top of a tall tree even though most of its cells are dead.',
  r: 'The dead xylem vessels are hollow tubes with thick walls and no end walls, so water can pass through them.',
  key: 'a',
  sol: 'Vessels are empty tubes of dead cells, so water passes through them without any need for living contents. R explains A — option (a).',
  d: 3, c: 'analysis', t: [2],
}));
add('tf-scl', tf({
  stem: 'Cells of sclerenchyma are alive and keep dividing to repair a damaged stem.',
  key: 'f',
  sol: 'False. Sclerenchyma cells are dead, with thick lignified walls, and permanent tissue does not divide.',
  d: 1, c: 'understanding', t: [2],
}));
add('tf-cuticle', tf({
  stem: 'The waxy cuticle on the outer wall of a leaf epidermis helps the leaf to lose less water.',
  key: 't',
  sol: 'True. The wax is waterproof, so it reduces loss of water from the surface of the leaf.',
  d: 1, c: 'understanding', t: [2],
}));
add('fill-xylem', fill({
  stem: 'The tissue that carries water and minerals up from the roots to the leaves is called ______.',
  acc: [['xylem']],
  sol: 'Xylem carries water and minerals upwards; phloem carries food.',
  d: 1, c: 'recall', t: [2],
}));
add('fill-guard', fill({
  stem: 'Each stoma in the epidermis of a leaf is surrounded by two ______ cells.',
  acc: [['guard']],
  sol: 'A pair of guard cells surrounds each stoma and controls its opening.',
  d: 1, c: 'recall', t: [2],
}));
add('match-tissue', match({
  pairs: [['Parenchyma', 'Stores starch in a potato tuber'], ['Collenchyma', 'Lets a leaf stalk bend without breaking'], ['Sclerenchyma', 'Makes the husk of a coconut tough'], ['Phloem', 'Carries sugar from leaves to roots']],
  order: [1, 3, 0, 2],
  stem: 'Match each plant tissue (column I) with its role or place (column II).',
  sol: 'Parenchyma stores starch; collenchyma gives flexible support; sclerenchyma gives hardness; phloem carries food.',
  d: 2, c: 'understanding', t: [2],
}));
add('num-vessel', (() => {
  const img = 17, M = 500;
  const mm = img / M;
  const um = mm * 1000;
  return num({
    stem: `A drawing of a xylem vessel is ${img} mm wide and the magnification is ${M}. Find the actual width of the vessel in micrometres.`,
    value: um, tol: 0.01, unit: 'µm',
    sol: r`Actual width $= \dfrac{${img}\ \text{mm}}{${M}} = ${mm}\ \text{mm}$. Converting, $${mm} \times 1000 = ${um}\ \mu\text{m}$.`,
    scheme: [['Divides drawing size by the magnification: 0.034 mm', 1], ['Converts to micrometres: 34 µm', 1]],
    marks: 2, d: 2, c: 'application', t: [2],
  });
})(), (q) => near(17 / 500 * 1000, 34, 1e-9) && near(q.answer.value, 34, 1e-9) || 'vessel');
add('s2-meristem', short({
  marks: 2,
  stem: 'State one difference between the apical meristem and the lateral meristem in position and in the growth they cause.',
  model: 'The apical meristem lies at the tips of roots and shoots and makes the plant longer. The lateral meristem, the cambium, lies along the sides of stems and roots and makes them thicker.',
  sol: 'Tips and length against sides and girth.',
  scheme: [['Apical: tips, adds length', 1], ['Lateral: sides, adds thickness', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('s2-xyph', short({
  marks: 2,
  stem: 'Give two differences between xylem and phloem.',
  model: 'Xylem carries water and minerals upwards from the roots, whereas phloem carries food made in the leaves upwards and downwards. Most xylem is made of dead cells, whereas most phloem is made of living cells such as sieve tubes and companion cells.',
  sol: 'What is carried and direction; dead against living.',
  scheme: [['Xylem carries water and minerals up; phloem carries food both ways', 1], ['Xylem mostly dead cells; phloem mostly living cells', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('s2-stomata', short({
  marks: 2,
  stem: 'A desert plant has a thick waxy coat and few stomata on its leaves. Explain how each feature helps it to survive.',
  model: 'The thick waxy cuticle forms a waterproof layer that cuts down the loss of water from the surface of the leaf. Stomata are the pores through which water vapour escapes, so having few of them further reduces water loss while still allowing some exchange of gases.',
  sol: 'Cuticle reduces water loss; few stomata reduce evaporation.',
  scheme: [['Waxy cuticle is waterproof and cuts water loss', 1], ['Few stomata means less water vapour escapes', 1]],
  d: 3, c: 'application', t: [2],
}));
add('s2-collen', short({
  marks: 2,
  stem: 'A leaf stalk is flexible while a coconut shell is hard. Name the tissue that explains each property and state one feature of its cells.',
  model: 'The leaf stalk is flexible because of collenchyma, whose living cells have thickened corners. The coconut shell is hard because of sclerenchyma, whose dead cells have very thick lignified walls.',
  sol: 'Collenchyma for flexibility; sclerenchyma for hardness.',
  scheme: [['Collenchyma with thickened corners', 1], ['Sclerenchyma with thick lignified walls', 1]],
  d: 2, c: 'application', t: [2],
}));
add('s3-simple', short({
  marks: 3,
  stem: 'Name the three simple permanent tissues of plants. For each, state whether its cells are living or dead and give one job.',
  model: 'Parenchyma has living, thin-walled cells and it stores food, or makes food when it has chloroplasts. Collenchyma has living cells with thickened corners and gives flexible support. Sclerenchyma has dead cells with thick lignified walls and gives strength and hardness.',
  sol: 'Parenchyma, collenchyma, sclerenchyma with state of cells and job.',
  scheme: [['Parenchyma: living; stores or makes food', 1], ['Collenchyma: living; flexible support', 1], ['Sclerenchyma: dead; strength', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('long-meristem', long({
  stem: '(a) Draw a labelled sketch of a plant showing where the three kinds of meristem lie.\n\n(b) State two features of meristematic cells and the function of each kind of meristem.',
  model: 'The sketch shows the apical meristem at the shoot tip and root tip, the intercalary meristem at the base of a leaf or an internode, and the lateral meristem as a ring in the stem and root. Meristematic cells are small, thin-walled and closely packed, with dense cytoplasm and a large nucleus. They divide again and again. The apical meristem adds length at the tips, the intercalary meristem adds length at the base of leaves, as in grass, and the lateral meristem adds girth.',
  sol: 'Sketch; two features; three functions.',
  scheme: [['Labelled sketch with the three meristems', 2], ['Two features of meristematic cells', 1], ['A function for each kind of meristem', 2]],
  d: 2, c: 'understanding', t: [2],
}));
add('long-xyph', long({
  stem: 'Compare xylem and phloem in terms of the parts they contain, what they carry, the direction of movement and whether the cells are living or dead. Draw a labelled diagram of a phloem sieve tube with a companion cell.',
  model: 'Xylem contains vessels, tracheids, fibres and parenchyma, and it carries water and minerals upwards from the roots. Most of its cells are dead. Phloem contains sieve tubes, companion cells, fibres and parenchyma, and it carries food made in the leaves both upwards and downwards. Most of its cells are living. The diagram of the sieve tube shows the long tube with sieve plates across its ends and a thin companion cell beside it.',
  sol: 'Four-point comparison and a labelled diagram.',
  scheme: [['Parts of each tissue', 1], ['What each carries and in which direction', 1.5], ['Living or dead', 0.5], ['Diagram with sieve tube, sieve plate and companion cell', 2]],
  d: 2, c: 'understanding', t: [2],
}));
add('case-ring', mk.case({
  passage: `A student removes a ring of bark about 2 cm wide, down to the wood, from a young branch of a guava plant. The ring cuts through the phloem but leaves the wood, which contains the xylem, untouched. After three weeks the student notes that:

- the bark just above the ring has swollen;
- the leaves above the ring are still green and fresh;
- the bark just below the ring has not swollen.`,
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'The swelling just above the ring is most likely due to:',
      right: 'food from the leaves collecting there because it cannot pass the cut phloem',
      wrong: ['water collecting there because the xylem is cut', 'minerals from the roots collecting there because the phloem is intact', 'new leaves growing from the bark'],
      sol: 'Food made in the leaves travels down through the phloem. The ring cuts the phloem, so food piles up above it and the bark swells — option (@K).',
      d: 2, c: 'analysis', t: [2],
    })),
    part('b', short({
      marks: 1,
      stem: 'Why do the leaves above the ring stay green and fresh for some time?',
      model: 'The xylem in the wood is not cut, so water and minerals still reach the leaves.',
      sol: 'Xylem still supplies water.',
      scheme: [['Xylem is intact and still carries water', 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Predict what will happen to the part of the plant below the ring over many months, and explain.',
      model: 'The part below the ring will slowly weaken and die. Food made in the leaves cannot cross the cut phloem to reach it, so its cells, including the roots, run out of food for energy and growth.',
      sol: 'No food reaches the part below the ring.',
      scheme: [['The part below the ring weakens and dies', 1], ['Cut phloem stops food reaching it', 1]],
      d: 3, c: 'analysis', t: [2],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Suggest how the result would differ if the student removed a section of the wood (xylem) but left the bark, and explain.',
        model: 'The leaves above the cut would wilt and dry quickly, because without xylem water and minerals cannot reach them. The food made earlier could still move down through the intact phloem.',
        sol: 'Without xylem, leaves wilt.',
        scheme: [['Leaves wilt because water cannot rise', 1], ['Phloem would still carry food', 1]],
        d: 3, c: 'evaluation', t: [2],
      }),
    ]),
  ],
}), null);

// ---------------------------------------------------------------- t03 animal tissues
add('chk-epithelial', mcq({
  stem: 'The cells that line the windpipe are tall and carry tiny hair-like projections that sweep mucus and dust upwards. This is:',
  right: 'ciliated columnar epithelium',
  wrong: ['squamous epithelium', 'cuboidal epithelium', 'areolar tissue'],
  sol: 'Tall cells with cilia that sweep out mucus and dust are ciliated columnar epithelium — option (@K). Squamous cells are flat, and cuboidal cells are cube-shaped.',
  d: 2, c: 'application', t: [3],
}));
add('chk-connective', mcq({
  stem: 'A tissue has cells scattered in a liquid matrix and carries oxygen, food and wastes around the body. It is:',
  right: 'blood',
  wrong: ['bone', 'cartilage', 'adipose tissue'],
  sol: 'A liquid matrix, plasma, with cells that carry oxygen, food and wastes describes blood — option (@K). Bone and cartilage have solid matrices, and adipose tissue stores fat.',
  d: 1, c: 'understanding', t: [3],
}));
add('chk-musclenerve', mcq({
  stem: 'A cell is long, with a cell body holding the nucleus and one long fibre that carries signals away. It belongs to:',
  right: 'nervous tissue',
  wrong: ['striated muscle', 'smooth muscle', 'columnar epithelium'],
  sol: 'A neuron has a cell body with a nucleus and a long axon that carries impulses away — option (@K). Muscle cells contract instead of carrying signals.',
  d: 1, c: 'understanding', t: [3],
}));
add('ligtend-mcq', mcq({
  stem: 'A physiotherapist explains that a strong cord joins a footballer’s thigh muscle to a bone below the knee, and that a strong elastic band holds the thigh bone and the shin bone together at the knee. These two structures are, in that order:',
  right: 'a tendon and a ligament',
  wrong: ['a ligament and a tendon', 'two tendons', 'two ligaments'],
  sol: 'A tendon joins muscle to bone and a ligament joins bone to bone, so the cord is a tendon and the band is a ligament — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('cardiac-mcq', mcq({
  stem: 'A slide of muscle shows branched fibres with stripes, one nucleus in each cell and dark lines between neighbouring cells. Which statement about this muscle is correct?',
  right: 'It is found only in the heart and works without our control.',
  wrong: ['It is attached to bones and is under our control.', 'It forms the wall of the food pipe and has no stripes.', 'It has many nuclei at the edge and long unbranched fibres.'],
  sol: 'Striped, branched fibres with one nucleus are cardiac muscle, which is found only in the heart and is involuntary — option (@K). The other options describe striated and smooth muscle.',
  d: 2, c: 'application', t: [3],
}));
add('neuron-mcq', mcq({
  stem: 'In a neuron, the part that carries the nerve impulse away from the cell body towards other cells is the:',
  right: 'axon',
  wrong: ['dendrite', 'nucleus', 'basement membrane'],
  sol: 'Dendrites receive signals and the axon carries the impulse away from the cell body — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('bone-mcq', mcq({
  stem: 'A doctor explains that bone is hard but cartilage can bend. The hardness of bone is mainly due to its matrix, which contains:',
  right: 'salts of calcium and phosphorus',
  wrong: ['liquid plasma', 'droplets of fat', 'elastic fibres only'],
  sol: 'Bone matrix is hard because of salts of calcium and phosphorus — option (@K). Plasma is the matrix of blood and fat is stored in adipose tissue.',
  d: 1, c: 'understanding', t: [3],
}));
add('ar-ligament', ar({
  a: 'A ligament joins a muscle to a bone.',
  r: 'A ligament is a strong and elastic band of connective tissue.',
  key: 'd',
  sol: 'A ligament joins bone to bone, so A is false. R is a true description of a ligament — option (d).',
  d: 2, c: 'analysis', t: [3],
}));
add('ar-cardiac', ar({
  a: 'Cardiac muscle shows light and dark stripes.',
  r: 'Cardiac muscle works without our control.',
  key: 'b',
  sol: 'Cardiac muscle is striated, and it is involuntary, so both are true. But stripes are not a result of being involuntary, so R does not explain A — option (b).',
  d: 2, c: 'analysis', t: [3],
}));
add('ar-skeletal', ar({
  a: 'Skeletal muscle shows light and dark stripes.',
  r: 'Skeletal muscle cells are spindle-shaped, with a single nucleus in the middle.',
  key: 'c',
  sol: 'Skeletal muscle is striated, so A is true. Its fibres are long and unbranched with many nuclei, and the spindle shape with one nucleus belongs to smooth muscle, so R is false — option (c).',
  d: 2, c: 'analysis', t: [3],
}));
add('tf-neuron', tf({
  stem: 'A single neuron in the human body can be about a metre long.',
  key: 't',
  sol: 'True. The axon of a neuron that runs from the spinal cord to the foot can be about a metre long.',
  d: 2, c: 'understanding', t: [3],
}));
add('fill-lig', fill({
  stem: 'The strong, elastic band of connective tissue that joins one bone to another is called a ______.',
  acc: [['ligament']],
  sol: 'A ligament joins bone to bone; a tendon joins muscle to bone.',
  d: 1, c: 'recall', t: [3],
}));
add('fill-cardiac', fill({
  stem: 'The muscle found only in the wall of the heart is called ______ muscle.',
  acc: [['cardiac']],
  sol: 'Cardiac muscle is striated, branched and involuntary, and is found only in the heart.',
  d: 1, c: 'recall', t: [3],
}));
add('num-heart', (() => {
  const rate = 70;
  const perDay = rate * 60 * 24;
  return num({
    stem: `The cardiac muscle of a boy contracts about ${rate} times a minute (illustrative value). About how many times does his heart contract in one full day of 24 hours?`,
    value: perDay, tol: 0,
    sol: `Minutes in a day $= 60 \\times 24 = ${60 * 24}$. Contractions in a day $= ${rate} \\times ${60 * 24} = ${perDay}$. The heart muscle works all day without stopping, because it is involuntary and does not tire like other muscles.`,
    scheme: [['Finds the minutes in a day: 1440', 1], ['Multiplies by the rate to get 100800', 1]],
    marks: 2, d: 2, c: 'application', t: [3],
  });
})(), (q) => 70 * 1440 === 100800 && q.answer.value === 100800 || 'heart');
add('s2-bonecart', short({
  marks: 2,
  stem: 'Bone and cartilage are both connective tissues. Give one difference in their matrix and one place where each is found.',
  model: 'The matrix of bone is hard because it contains calcium and phosphorus salts, and bone forms the skeleton, for example the thigh bone. The matrix of cartilage is firm but flexible, and cartilage is found in the nose, the ear and at the ends of bones in joints.',
  sol: 'Hard against flexible matrix; skeleton against ear or nose.',
  scheme: [['Bone: hard matrix; place such as the thigh bone', 1], ['Cartilage: firm flexible matrix; place such as the ear', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('s2-epi', short({
  marks: 2,
  stem: 'Why are the cells of the epithelium that lines the small intestine tall, while those lining a blood vessel are flat?',
  model: 'In the small intestine the cells are tall columnar cells, which have room to absorb food and secrete mucus. In a blood vessel the cells are thin and flat squamous cells, which let substances such as oxygen pass through them easily.',
  sol: 'Tall cells absorb and secrete; flat cells allow exchange.',
  scheme: [['Tall columnar cells: absorb food and secrete mucus', 1], ['Flat squamous cells: easy exchange of substances', 1]],
  d: 3, c: 'application', t: [3],
}));
add('s2-musc', short({
  marks: 2,
  stem: 'Give two differences between striated muscle and smooth muscle.',
  model: 'Striated muscle has light and dark stripes and many nuclei in each long fibre, whereas smooth muscle has no stripes and one nucleus in each spindle-shaped cell. Striated muscle is voluntary and attached to bones, while smooth muscle is involuntary and lines the food pipe.',
  sol: 'Stripes and nuclei; control and place.',
  scheme: [['Stripes and nuclei: present and many against absent and one', 1], ['Voluntary against involuntary, with a place', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('s3-neuron', short({
  marks: 3,
  stem: 'Describe the structure of a neuron and say what each of its three main parts does.',
  model: 'A neuron has a cell body, branched dendrites and a long axon. The cell body holds the nucleus and keeps the cell alive. The dendrites receive signals and pass them to the cell body. The axon carries the nerve impulse away from the cell body, and nerve endings at its tip pass the signal on to the next cell.',
  sol: 'Cell body, dendrites, axon, with jobs.',
  scheme: [['Cell body holds the nucleus', 1], ['Dendrites receive signals', 1], ['Axon carries the impulse away to nerve endings', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('long-connect', long({
  stem: 'Connective tissue joins, supports and transports. Name five connective tissues and for each give one feature and one function.',
  model: 'Blood has cells in liquid plasma and transports oxygen, food and wastes. Bone has a hard matrix of calcium and phosphorus salts and supports and protects the body. Cartilage is firm and flexible and smooths joint surfaces and shapes the ear. A ligament is a strong elastic band that joins bone to bone. A tendon is a strong cord that joins muscle to bone, and adipose tissue stores fat as energy.',
  sol: 'Five tissues with a feature and a function.',
  scheme: [['Five tissues named correctly', 2.5], ['A correct feature for each', 1], ['A correct function for each', 1.5]],
  d: 2, c: 'understanding', t: [3],
}));
add('long-muscle', long({
  stem: '(a) Draw labelled sketches of striated, smooth and cardiac muscle fibres.\n\n(b) Compare the three kinds of muscle in a table that includes the stripes, number of nuclei, control and place in the body.',
  model: 'The sketches show striated fibres as long, unbranched and striped with many nuclei at the edge, smooth cells as spindle-shaped with no stripes and one central nucleus, and cardiac fibres as striped and branched with one nucleus. Striated muscle is voluntary and is found in the limbs and body wall. Smooth muscle is involuntary and is found in the food pipe and blood vessels. Cardiac muscle is involuntary and is found only in the heart.',
  sol: 'Three sketches; four-point comparison.',
  scheme: [['Three labelled sketches', 2], ['Stripes and nuclei compared', 1], ['Control and place compared', 2]],
  d: 2, c: 'understanding', t: [3],
}));
add('case-muscle', mk.case({
  passage: `A student looks at three prepared slides of muscle tissue and records the features.

| Slide | Cell shape | Stripes | Nuclei | Other feature |
|---|---|---|---|---|
| P | Long, unbranched fibres | Yes | Many, at the edge | Attached to bone |
| Q | Spindle-shaped cells | No | One in each cell | Found in a food pipe |
| R | Branched fibres | Yes | One in each cell | Dark lines between cells |`,
  d: 2, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Slide R shows muscle from the:',
      right: 'heart',
      wrong: ['biceps of the arm', 'wall of the food pipe', 'tongue only'],
      sol: 'Striped, branched fibres with one nucleus and dark lines between cells are cardiac muscle, found in the heart — option (@K).',
      d: 1, c: 'application', t: [3],
    })),
    part('b', short({
      marks: 1,
      stem: 'Which slide shows a muscle that works under our control? Give a reason.',
      model: 'Slide P, because it is striated muscle attached to bone, which is voluntary.',
      sol: 'P: striated and attached to bone.',
      scheme: [['Slide P with reason', 1]],
      d: 1, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Slide Q muscle moves food along the food pipe. Explain why it is useful that this muscle works involuntarily.',
      model: 'Food must be moved along by slow, steady squeezing, even when we are sleeping or thinking about something else. Because smooth muscle works involuntarily, digestion goes on without our having to give any thought or effort to it.',
      sol: 'Digestion continues without conscious control.',
      scheme: [['Movement of food has to continue all the time, such as during sleep', 1], ['No conscious effort is needed', 1]],
      d: 3, c: 'analysis', t: [3],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'State two differences that let you tell slide P from slide Q.',
        model: 'Slide P has stripes and many nuclei at the edge of long fibres, whereas slide Q has no stripes and a single nucleus in each spindle-shaped cell.',
        sol: 'Stripes and nuclei.',
        scheme: [['Stripes in P, none in Q', 1], ['Many nuclei in P, one in Q', 1]],
        d: 2, c: 'application', t: [3],
      }),
    ]),
  ],
}), null);
add('case-nerve', mk.case({
  passage: `Meena touches the hot lid of a pressure cooker by mistake. In less than a second she pulls her hand away. Her teacher explains that tissues of four kinds took part: the skin of her finger, nerve cells that carried the signal to the spinal cord and back, a connective tissue that attaches her arm muscle to bone, and the muscle that contracted to pull the hand back.`,
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'The cells that carried the signal from the finger to the spinal cord were:',
      right: 'neurons',
      wrong: ['red blood cells', 'squamous cells', 'fat cells'],
      sol: 'Neurons carry signals as nerve impulses — option (@K). The other cells do not carry impulses.',
      d: 1, c: 'understanding', t: [3],
    })),
    part('b', short({
      marks: 1,
      stem: 'Name the connective tissue that joins the arm muscle to the bone.',
      model: 'The connective tissue that joins the arm muscle to the bone is a tendon.',
      sol: 'Tendon joins muscle to bone.',
      scheme: [['Tendon', 1]],
      d: 1, c: 'recall', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why a long axon is useful in a neuron that carries a signal from a finger to the spinal cord.',
      model: 'The finger is far from the spinal cord, so the cell must stretch the whole distance. A long axon carries the impulse along a single cell, which is quick, and it lets the signal reach its target without relay.',
      sol: 'Long axon spans the distance quickly.',
      scheme: [['The distance is long, so the cell must be long', 1], ['One cell carries the impulse quickly', 1]],
      d: 3, c: 'analysis', t: [3],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Name the kind of muscle that pulled her hand away and give two features of its cells.',
        model: 'Striated or skeletal muscle pulled her hand away. Its cells are long and unbranched fibres with light and dark stripes and many nuclei.',
        sol: 'Skeletal muscle: stripes, many nuclei.',
        scheme: [['Striated (skeletal) muscle', 1], ['Two features of the cells', 1]],
        d: 2, c: 'application', t: [3],
      }),
    ]),
  ],
}), null);

// ---------------------------------------------------------------- t04 joints and care
add('joint-mcq', mcq({
  stem: 'When you shake your head to say “no”, the first bone of the neck turns over the second bone. This movement happens at a:',
  right: 'pivot joint',
  wrong: ['hinge joint', 'gliding joint', 'fixed joint'],
  sol: 'Turning about an axis is the movement of a pivot joint, as in the neck — option (@K). A hinge joint moves back and forth in one plane, and a fixed joint does not move.',
  d: 2, c: 'application', t: [4],
}));
add('vitd-mcq', mcq({
  stem: 'A child who rarely goes out in the sun and eats very little milk or egg develops soft bones and bowed legs. The most likely cause is a shortage of:',
  right: 'vitamin D and calcium',
  wrong: ['vitamin C and iron', 'carbohydrate and water', 'protein and iodine'],
  sol: 'Soft, bent bones in a growing child point to too little calcium and too little vitamin D, which helps absorb it — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('posture-mcq', mcq({
  stem: 'Kavya carries a heavy school bag on one shoulder all day and her back starts to ache. Which change is most likely to help?',
  right: 'Carry the bag on both shoulders, keep the load light and stand straight.',
  wrong: ['Carry the bag on the other shoulder only.', 'Sit very still all day so that the back can rest.', 'Take extra calcium tablets without changing anything else.'],
  sol: 'Sharing a lighter load across both shoulders and standing straight reduces the strain on the back and bones — option (@K). Changing shoulders still leaves the load on one side, and extra tablets do not fix posture.',
  d: 3, c: 'evaluation', t: [4],
}));
add('ar-vitd', ar({
  a: 'Children who get too little vitamin D may develop soft, bent bones.',
  r: 'Vitamin D helps the body to absorb the calcium that bones need.',
  key: 'a',
  sol: 'Without enough vitamin D, calcium is not absorbed well, so bones stay soft. R explains A — option (a).',
  d: 2, c: 'analysis', t: [4],
}));
add('tf-skull', tf({
  stem: 'The joints between the flat bones of the skull allow the skull to bend freely when we nod.',
  key: 'f',
  sol: 'False. The bones of the skull are joined by fixed joints that allow no movement. Nodding happens at a joint in the neck.',
  d: 2, c: 'understanding', t: [4],
}));
add('match-joint', match({
  pairs: [['Ball and socket', 'Hip'], ['Hinge', 'Knee'], ['Pivot', 'Turning the head'], ['Fixed', 'Bones of the skull']],
  order: [3, 0, 1, 2],
  stem: 'Match each type of joint (column I) with an example or movement (column II).',
  sol: 'Ball and socket: hip; hinge: knee; pivot: head turning; fixed: skull.',
  d: 1, c: 'understanding', t: [4],
}));
add('num-calcium', (() => {
  const need = 1000, per100 = 120, mL = 150, glasses = 2;
  const got = ((per100 * mL) / 100) * glasses;
  const left = need - got;
  return num({
    stem: `A girl needs about ${need} mg of calcium a day (illustrative). She drinks ${glasses} cups of milk of ${mL} mL each in a day. Milk has about ${per100} mg of calcium per 100 mL. How many milligrams of calcium does she still need from other foods?`,
    value: left, tol: 0,
    sol: r`Calcium in one cup $= ${per100} \times \dfrac{${mL}}{100} = ${(per100 * mL) / 100}\ \text{mg}$. In ${glasses} cups $= ${got}\ \text{mg}$. Remaining $= ${need} - ${got} = ${left}\ \text{mg}$, which can come from ragi, curd, sesame and green leafy vegetables.`,
    scheme: [['Calcium from the milk: 360 mg', 1], ['Subtracts from the need: 640 mg', 1]],
    marks: 2, d: 2, c: 'application', t: [4],
  });
})(), (q) => 1000 - 2 * 1.2 * 150 === 640 && q.answer.value === 640 || 'calcium');
add('s2-posture', short({
  marks: 2,
  stem: 'Give two habits that keep the bones and muscles of a school student healthy and state why each helps.',
  model: 'Regular exercise such as walking, running or playing strengthens bones and muscles and keeps joints flexible. Standing and sitting straight and carrying a school bag on both shoulders spreads the load, which protects the backbone from strain.',
  sol: 'Exercise and posture with reasons.',
  scheme: [['Exercise strengthens bones and muscles', 1], ['Good posture or a balanced bag protects the backbone', 1]],
  d: 2, c: 'application', t: [4],
}));
add('s3-joints', short({
  marks: 3,
  stem: 'Name three types of joint. For each give an example in the human body and the kind of movement it allows.',
  model: 'A ball and socket joint, as at the shoulder or hip, allows movement in all directions. A hinge joint, as at the elbow or knee, allows movement back and forth in one plane. A pivot joint, as in the neck, allows the head to rotate. Gliding joints at the wrist and ankle allow small sliding movements, and fixed joints in the skull allow none.',
  sol: 'Three joints with examples and movements.',
  scheme: [['Ball and socket: shoulder or hip, all directions', 1], ['Hinge: elbow or knee, one plane', 1], ['A third joint such as pivot: neck, rotation', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('s3-care', short({
  marks: 3,
  stem: 'A health teacher advises students to eat ragi, curd and green leafy vegetables, to play outdoors in the morning, and to avoid carrying heavy loads on one shoulder. Give a reason for each piece of advice.',
  model: 'Ragi, curd and green leafy vegetables supply calcium, which builds strong bones. Playing outdoors in the morning gives sunlight, which lets the skin make vitamin D, and it also exercises muscles and bones. Avoiding a heavy load on one shoulder prevents strain on the backbone and bad posture.',
  sol: 'Calcium; sunlight and exercise; posture.',
  scheme: [['Calcium foods build bone', 1], ['Sunlight gives vitamin D and play exercises the body', 1], ['Even load protects the backbone', 1]],
  d: 2, c: 'application', t: [4],
}));
add('long-joints', long({
  stem: '(a) Name the five types of joint and give one example of each from the human body.\n\n(b) Explain, with the help of the tissues involved, how a hinge joint such as the knee works.',
  model: 'The five types are ball and socket, as at the shoulder, hinge, as at the knee, pivot, as in the neck, gliding, as at the wrist, and fixed, as between skull bones. At the knee the bones meet at a hinge joint, which moves back and forth in one plane. Ligaments join bone to bone and hold the joint steady. Cartilage covers the ends of the bones so that they glide smoothly. Muscles pull on tendons attached to the bones, which makes the leg bend and straighten.',
  sol: 'Five joints with examples; ligaments, cartilage, tendons and muscle at a hinge joint.',
  scheme: [['Five joints with a correct example each', 2], ['Ligaments hold bones and cartilage gives smooth movement', 1.5], ['Muscles and tendons move the joint', 1.5]],
  d: 2, c: 'application', t: [4, 3],
}));
add('long-eval', long({
  stem: 'A school plans a health week. One student proposes only calcium tablets for every child. Evaluate this plan, and suggest three other measures that would better protect the bones and muscles of the students, giving a reason for each.',
  model: 'Calcium tablets alone are not enough. Bones also need vitamin D to absorb calcium, and good food such as milk, ragi and green leafy vegetables gives calcium naturally. Three better measures are daily outdoor games, which exercise bones and muscles and give sunlight for vitamin D, a balanced diet with calcium-rich foods, and teaching good posture with light bags carried on both shoulders. Together these protect bones and muscles for life.',
  sol: 'Tablets alone are not enough; three measures with reasons.',
  scheme: [['Judges that tablets alone are not enough, with a reason', 1.5], ['Outdoor games with a reason', 1], ['Balanced diet with a reason', 1], ['Posture with a reason', 1.5]],
  d: 4, c: 'evaluation', t: [4],
}));
add('case-diet', mk.case({
  passage: `At a village health camp a doctor notes the following about three children aged 11.

| Child | Milk or curd each day | Time outdoors each day | Observation |
|---|---|---|---|
| Ravi | 2 glasses | About 1 hour of play in the morning | Strong bones, no complaints |
| Sana | None | Almost none, studies indoors | Bowed legs, tired, weak muscles |
| Tara | 2 glasses | Almost none, studies indoors | Normal height, mild bone pain |`,
  d: 3, c: 'evaluation',
  children: [
    part('a', mcq({
      stem: 'The most likely cause of Sana’s bowed legs is a shortage of:',
      right: 'calcium and vitamin D',
      wrong: ['only carbohydrate', 'only protein', 'iron and vitamin C'],
      sol: 'Sana takes no milk and gets no sunlight, so she lacks calcium and the vitamin D that helps absorb it, and her bones are soft and bend — option (@K).',
      d: 2, c: 'application', t: [4],
    })),
    part('b', short({
      marks: 1,
      stem: 'Why does Ravi, who also drinks 2 glasses of milk, have stronger bones than Tara?',
      model: 'He plays outdoors in the morning sun, so his skin makes vitamin D and exercise strengthens his bones.',
      sol: 'Sunlight gives vitamin D; exercise.',
      scheme: [['Sunlight for vitamin D and exercise', 1]],
      d: 3, c: 'analysis', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'Suggest two changes that Sana should make, with a reason for each.',
      model: 'Sana should add milk, curd, ragi or green leafy vegetables to her meals, because they supply calcium. She should also spend time outdoors in the morning sun, because her skin makes vitamin D, which helps her absorb calcium.',
      sol: 'Calcium foods; sunlight.',
      scheme: [['Calcium-rich foods, with a reason', 1], ['Time outdoors for vitamin D, with a reason', 1]],
      d: 3, c: 'evaluation', t: [4],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Tara’s family believes that two glasses of milk are enough for strong bones. Do you agree? Use the table to support your answer.',
        model: 'No. Tara drinks milk but gets almost no sunlight and shows mild bone pain. Ravi drinks the same milk and plays outdoors, and his bones are strong, so sunlight and exercise matter as well as calcium.',
        sol: 'Compare Tara and Ravi.',
        scheme: [['Disagrees, with Tara’s bone pain as evidence', 1], ['Compares with Ravi: sunlight and exercise also matter', 1]],
        d: 3, c: 'evaluation', t: [4],
      }),
    ]),
  ],
}), null);
void dec;
