// ch17 Locomotion and Movement — question bank. AR keys: a b c d a.
import { mk, add, r } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { Q_IBAND, Q_HZONE, Q_FIBRE, CASE_R, CASE_C, CASE_LIMIT, NOT_STERNAL, UPPER_WITH_GIRDLE, PHALANGES_N, FORE_N, MYOSIN, ACTIN, RIB_PAIRS, GIRDLES } from './calc.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;

// ---------------------------------------------------------------- t01 movement, muscle, contraction
add('amoeboid-mcq', mcq({
  stem: 'In a cut on a child’s knee, certain white blood cells crawl out of the capillaries towards invading bacteria by pushing out temporary projections of their cytoplasm. Which type of movement is this?',
  right: 'Amoeboid movement, using pseudopodia',
  wrong: ['Ciliary movement', 'Muscular movement', 'Flagellar swimming'],
  sol: 'Macrophages and leucocytes move by pseudopodia formed by streaming of protoplasm, as in Amoeba — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('cilia-mcq', mcq({
  stem: 'Fine soot inhaled by a traffic policeman is trapped in mucus and carried up the windpipe towards the throat. Which kind of movement clears it?',
  right: 'Coordinated beating of cilia lining the trachea',
  wrong: ['Amoeboid movement of the tracheal cells', 'Voluntary contraction of skeletal muscle in the trachea', 'Contraction of cardiac muscle'],
  sol: 'Coordinated movement of cilia in the trachea removes dust particles and foreign substances inhaled with the atmospheric air — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('visceral-mcq', mcq({
  stem: 'Smooth, involuntary muscles located in the inner walls of hollow organs such as the alimentary canal are called',
  right: 'visceral muscles',
  wrong: ['skeletal muscles', 'cardiac muscles', 'striated muscles'],
  sol: 'Visceral muscles line the inner walls of hollow visceral organs; they are smooth and involuntary — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('cardiac-mcq', mcq({
  stem: 'Which combination of features describes cardiac muscle?',
  right: 'Striated, involuntary, cells assembled in a branching pattern',
  wrong: ['Smooth, voluntary, unbranched cells', 'Striated, voluntary, attached to bones', 'Smooth, involuntary, found in the walls of the gut'],
  sol: 'Cardiac muscle cells assemble in a branching pattern; the muscle is striated and involuntary — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('sr-mcq', mcq({
  stem: 'The endoplasmic reticulum of a muscle fibre, which stores calcium ions, is known as the',
  right: 'sarcoplasmic reticulum',
  wrong: ['sarcolemma', 'fascia', 'sarcomere'],
  sol: 'The sarcoplasmic reticulum is the store of calcium ions; the sarcolemma is the plasma membrane and the fascia binds fascicles — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('iband-mcq', mcq({
  stem: 'The light band of a myofibril, which is isotropic, contains',
  right: 'actin filaments only',
  wrong: ['myosin filaments only', 'both actin and myosin throughout', 'myoglobin and mitochondria'],
  sol: 'The light (I) band contains actin and is isotropic; the dark (A) band contains myosin and is anisotropic — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('calcium-mcq', mcq({
  stem: 'Calcium ions released into the sarcoplasm during excitation of a muscle fibre bind to',
  right: 'a subunit of troponin on the actin filaments',
  wrong: ['the tail of light meromyosin', 'acetylcholine receptors on the sarcolemma', 'the M line of the A band'],
  sol: 'Calcium binds with a subunit of troponin on the actin filaments and thereby removes the masking of the active sites for myosin — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('masking-mcq', mcq({
  stem: 'In a resting skeletal muscle fibre, myosin heads cannot attach to the thin filaments because',
  right: 'a subunit of troponin masks the active binding sites for myosin on actin',
  wrong: ['the myosin heads have no ATPase activity at rest', 'actin filaments are absent from the I band at rest', 'the sarcoplasmic reticulum holds the myosin filaments'],
  sol: 'In the resting state a subunit of troponin masks the active binding sites for myosin on the actin filaments — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('hmm-mcq', mcq({
  stem: 'Which part of a myosin monomer (meromyosin) acts as an ATPase and carries the binding site for actin?',
  right: 'The globular head of heavy meromyosin',
  wrong: ['The tail of light meromyosin', 'The troponin complex', 'The Z line'],
  sol: 'The globular head with its short arm is heavy meromyosin (HMM); the head is an active ATPase with binding sites for ATP and actin — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('achblock-mcq', mcq({
  stem: 'A snake venom blocks the receptors for acetylcholine on the sarcolemma at the motor end plate. What is the most likely immediate effect on the prey’s skeletal muscles?',
  right: 'Nerve signals fail to set off action potentials in the muscle fibres, so the muscles cannot contract.',
  wrong: ['The muscles contract continuously because calcium is released without stopping.', 'The muscles switch from aerobic to anaerobic respiration only.', 'The A bands of the sarcomeres shorten.'],
  sol: 'Acetylcholine at the neuromuscular junction generates the action potential in the sarcolemma; with its receptors blocked, the signal does not pass and the fibres do not contract — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('redfibre-mcq', mcq({
  stem: 'The breast muscles of a migratory goose keep working for many hours of continuous flight. Their fibres are most likely to be rich in',
  right: 'myoglobin and mitochondria (red fibres)',
  wrong: ['sarcoplasmic reticulum, with very little myoglobin (white fibres)', 'uric acid crystals', 'chondroitin salts'],
  sol: 'Sustained aerobic work needs red fibres, with plenty of myoglobin to store oxygen and many mitochondria — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('sprint-mcq', mcq({
  stem: 'After a 400-metre race run at full speed, a student’s thigh muscles feel heavy and tired. Which substance has most probably built up in them?',
  right: 'Lactic acid from the anaerobic breakdown of glycogen',
  wrong: ['Uric acid from protein breakdown', 'Myoglobin released from the fibres', 'Acetylcholine from the motor neurons'],
  sol: 'Repeated activation of muscles can lead to accumulation of lactic acid from anaerobic breakdown of glycogen, causing fatigue — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('rigor-mcq', mcq({
  stem: 'In an experiment, isolated muscle fibres are allowed to use up all their ATP. Their myosin heads are then found locked onto the actin filaments. Which step of the contraction cycle has been blocked?',
  right: 'Breaking of the cross bridge, which needs a new ATP to bind to the myosin head',
  wrong: ['Release of calcium from the sarcoplasmic reticulum', 'Binding of acetylcholine to the sarcolemma', 'Formation of G-actin from F-actin'],
  sol: 'Myosin releases ADP and Pi and a new ATP binds, breaking the cross bridge; without ATP the heads stay attached — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('hgone-mcq', mcq({
  stem: 'An electron micrograph of a strongly contracted fibre shows that the H zone can no longer be seen, although the A band has its usual width. What best explains this?',
  right: 'The thin filaments from both ends have slid inwards until they meet at the centre of the A band.',
  wrong: ['The myosin filaments have shortened to half their length.', 'The Z lines have dissolved.', 'The actin filaments have been converted into myosin.'],
  sol: 'The H zone is the part of the A band not overlapped by thin filaments; when the thin filaments slide right in, it disappears while the A band (myosin length) is unchanged — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));

// ---------------------------------------------------------------- t02 skeleton and joints
add('floating-mcq', mcq({
  stem: 'Which ribs are called floating ribs?',
  right: 'The 11th and 12th pairs, which are not connected ventrally',
  wrong: ['The 8th, 9th and 10th pairs, which join the seventh rib by cartilage', 'The first seven pairs, which join the sternum directly', 'All ribs attached to the lumbar vertebrae'],
  sol: 'The last two pairs (11th and 12th) are not connected ventrally and are called floating ribs — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('atlas-mcq', mcq({
  stem: 'The first vertebra, which articulates with the occipital condyles of the skull, is the',
  right: 'atlas',
  wrong: ['axis', 'sacrum', 'coccyx'],
  sol: 'The first vertebra is the atlas, and it articulates with the occipital condyles — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('pivot-mcq', mcq({
  stem: 'The joint between the atlas and the axis is a',
  right: 'pivot joint',
  wrong: ['hinge joint', 'saddle joint', 'fibrous joint'],
  sol: 'The atlas–axis joint is the standard example of a pivot joint — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('saddle-mcq', mcq({
  stem: 'A rock climber’s thumb can be swung across the palm and also tilted in a wide arc, which no finger can do. Which joint makes this possible?',
  right: 'A saddle joint between the carpal and metacarpal of the thumb',
  wrong: ['A pivot joint between the atlas and the axis', 'A fibrous joint between the carpals', 'A cartilaginous joint between the phalanges'],
  sol: 'The joint between the carpal and metacarpal of the thumb is a saddle joint — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('knee-mcq', mcq({
  stem: 'A football player can bend and straighten her knee freely but cannot twist her lower leg round in a circle at the knee. What type of joint is the knee?',
  right: 'Hinge joint',
  wrong: ['Ball and socket joint', 'Pivot joint', 'Gliding joint'],
  sol: 'The knee is a hinge joint, allowing movement mainly in one plane — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('shoulder-mcq', mcq({
  stem: 'A fast bowler whirls his arm through a complete circle at the shoulder during his run-up. Which joint allows this, and between which bones?',
  right: 'Ball and socket joint, between the humerus and the pectoral girdle',
  wrong: ['Hinge joint, between the humerus and the ulna', 'Saddle joint, between the clavicle and the sternum', 'Pivot joint, between the scapula and the ribs'],
  sol: 'The head of the humerus fits the glenoid cavity of the scapula: a ball and socket joint between the humerus and the pectoral girdle — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('vertjoint-mcq', mcq({
  stem: 'The joints between adjacent vertebrae, where the bones are joined by cartilage, allow',
  right: 'only limited movement (cartilaginous joints)',
  wrong: ['no movement at all (fibrous joints)', 'considerable movement through a synovial cavity', 'rotation through a full circle'],
  sol: 'Cartilaginous joints, such as those between adjacent vertebrae, permit limited movement — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('suture-mcq', mcq({
  stem: 'Flat bones of the cranium fuse end to end with dense fibrous connective tissue. These sutures are an example of',
  right: 'fibrous joints that allow no movement',
  wrong: ['synovial joints that allow free movement', 'cartilaginous joints that allow limited movement', 'gliding joints'],
  sol: 'Fibrous joints do not allow any movement; the skull sutures are the example — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('coxal-mcq', mcq({
  stem: 'An anthropologist studying a hip bone finds a deep cup-shaped cavity at the point where three fused bones meet. Name the cavity and the bone that fits into it.',
  right: 'Acetabulum; the femur (thigh bone)',
  wrong: ['Glenoid cavity; the humerus', 'Neural canal; the spinal cord', 'Acetabulum; the tibia'],
  sol: 'The ilium, ischium and pubis fuse to form the coxal bone; at their point of fusion lies the acetabulum, to which the thigh bone articulates — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('patella-mcq', mcq({
  stem: 'Comparing an arm and a leg bone by bone, a student finds one bone in the leg with no partner in the arm. It is cup-shaped and covers the front of the knee. It is the',
  right: 'patella',
  wrong: ['fibula', 'femur', 'tarsal'],
  sol: 'The patella (knee cap) covers the knee ventrally; the fibula pairs with the ulna, the femur with the humerus, tarsals with carpals — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('gliding-mcq', mcq({
  stem: 'When a pianist flexes her wrist, the small wrist bones slide slightly over one another. These joints between the carpals are',
  right: 'gliding joints',
  wrong: ['hinge joints', 'pivot joints', 'fibrous sutures'],
  sol: 'Joints between the carpals are gliding joints — option (@K).',
  d: 2, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 disorders
add('myasthenia-mcq', mcq({
  stem: 'A patient’s immune system makes antibodies that attack the junctions between his motor nerves and skeletal muscles, so his eyelids droop and his limbs tire quickly. The disorder is',
  right: 'myasthenia gravis',
  wrong: ['muscular dystrophy', 'gout', 'osteoporosis'],
  sol: 'Myasthenia gravis is an autoimmune disorder affecting the neuromuscular junction, leading to fatigue, weakening and paralysis of skeletal muscle — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('tetany-mcq', mcq({
  stem: 'Blood tests on a patient with sudden, painful, rapid spasms of the hand muscles show an unusually low level of calcium ions. The condition is',
  right: 'tetany',
  wrong: ['gout', 'arthritis', 'myasthenia gravis'],
  sol: 'Tetany is rapid spasms (wild contractions) in muscle due to low Ca²⁺ in body fluid — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('osteo-mcq', mcq({
  stem: 'A 62-year-old woman, several years past menopause, breaks her wrist in a minor fall, and a scan shows low bone mass. Which factor is a common cause of her disorder?',
  right: 'Decreased levels of oestrogen',
  wrong: ['Accumulation of uric acid crystals', 'Antibodies against the neuromuscular junction', 'Excess calcium ions in body fluid'],
  sol: 'Osteoporosis is an age-related disorder with decreased bone mass and more fractures; decreased levels of oestrogen is a common cause — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('dystrophy-mcq', mcq({
  stem: 'Progressive degeneration of skeletal muscle, mostly due to a genetic disorder, is called',
  right: 'muscular dystrophy',
  wrong: ['tetany', 'arthritis', 'muscle fatigue'],
  sol: 'Muscular dystrophy is the progressive degeneration of skeletal muscle, mostly due to a genetic disorder — option (@K).',
  d: 1, c: 'recall', t: [3],
}));

// ---------------------------------------------------------------- assertion-reason
add('aband-ar', ar({
  a: 'The length of the A band remains unchanged when a sarcomere contracts.',
  r: 'During contraction the thin actin filaments slide over the thick myosin filaments, which do not themselves shorten.',
  key: 'a',
  sol: 'Both are true; the A band is the length of the myosin filaments, which do not shorten while actin slides over them — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('striated-ar', ar({
  a: 'Skeletal muscles are called striated muscles.',
  r: 'Skeletal muscles are closely associated with the skeletal components of the body.',
  key: 'b',
  sol: 'Both are true, but the striped appearance comes from the alternate dark and light bands of the myofibrils, not from their attachment to bones — option (b).',
  d: 2, c: 'understanding', t: [1],
}));
add('ribs-ar', ar({
  a: 'The 11th and 12th pairs of ribs are called floating ribs.',
  r: 'The 11th and 12th pairs of ribs join the sternum through the hyaline cartilage of the seventh rib.',
  key: 'c',
  sol: 'A is true; R is false, because it is the 8th, 9th and 10th pairs that join the seventh rib, while the 11th and 12th are not connected ventrally at all — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('gout-ar', ar({
  a: 'Gout is caused by a fall in the level of calcium ions in body fluids.',
  r: 'Gout is inflammation of joints due to accumulation of uric acid crystals.',
  key: 'd',
  sol: 'A is false (low calcium causes tetany); R is true — option (d).',
  d: 2, c: 'understanding', t: [3],
}));
add('fatigue-ar', ar({
  a: 'A muscle that is made to contract repeatedly and vigorously soon becomes fatigued.',
  r: 'Repeated activation can lead to accumulation of lactic acid from the anaerobic breakdown of glycogen in the muscle.',
  key: 'a',
  sol: 'Both are true, and lactic acid accumulation explains the fatigue — option (a).',
  d: 3, c: 'analysis', t: [1],
}));

// ---------------------------------------------------------------- true-false, fill, match
add('myofibril-tf', tf({
  stem: 'The striated appearance of a skeletal muscle fibre is due to the distribution pattern of actin and myosin proteins in its myofibrils.',
  key: 't',
  sol: 'True. The alternate dark and light bands arise from the arrangement of actin and myosin.',
  d: 1, c: 'recall', t: [1],
}));
add('sternum-tf', tf({
  stem: 'The sternum is a bone of the appendicular skeleton.',
  key: 'f',
  sol: 'False. The sternum, a flat bone on the ventral midline of the thorax, belongs to the axial skeleton.',
  d: 1, c: 'understanding', t: [2],
}));
add('ova-tf', tf({
  stem: 'Ciliary movement helps the passage of ova through the female reproductive tract.',
  key: 't',
  sol: 'True. Ciliated epithelium in the tract moves the ova along.',
  d: 1, c: 'recall', t: [1],
}));
add('gactin-fill', fill({
  stem: 'Each F-actin of a thin filament is a polymer of monomeric ______ actins.',
  acc: [['G', 'globular', 'G (globular)']],
  sol: 'G (globular) actins.',
  d: 1, c: 'recall', t: [1],
}));
add('synovial-fill', fill({
  stem: 'Joints that have a fluid-filled cavity between the articulating surfaces of the two bones are called ______ joints.',
  acc: [['synovial']],
  sol: 'Synovial joints.',
  d: 1, c: 'recall', t: [2],
}));
add('ach-fill', fill({
  stem: 'At the neuromuscular junction, the motor neuron releases the neurotransmitter ______, which generates an action potential in the sarcolemma.',
  acc: [['acetylcholine']],
  sol: 'Acetylcholine.',
  d: 1, c: 'recall', t: [1],
}));
add('joints-match', match({
  stem: 'Match each synovial joint (column I) with its example (column II).',
  pairs: [
    ['Ball and socket joint', 'Humerus and pectoral girdle'],
    ['Hinge joint', 'Knee joint'],
    ['Pivot joint', 'Atlas and axis'],
    ['Gliding joint', 'Between the carpals'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Ball and socket — shoulder (humerus and pectoral girdle); hinge — knee; pivot — atlas and axis; gliding — between carpals.',
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- numerical
add('iband-num', num({
  stem: `A sarcomere in a frog muscle is 2.3 μm long and its A band measures ${MYOSIN} μm. What is the total width of its I band (both halves together), in micrometres?`,
  value: Q_IBAND.I, tol: 0.01, unit: 'μm',
  sol: r`I band $= 2.3 - ${MYOSIN} = ${Q_IBAND.I}$ μm, shared as two halves on either side of the A band.`,
  scheme: [[`${Q_IBAND.I} μm`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === 0.7 || 'value');
add('hzone-num', num({
  stem: `In a sarcomere 2.4 μm long, each set of actin filaments extends ${ACTIN.toFixed(1)} μm inwards from its Z line. How wide is the H zone, in micrometres?`,
  value: Q_HZONE.H, tol: 0.01, unit: 'μm',
  sol: r`H zone $= 2.4 - 2 \times ${ACTIN.toFixed(1)} = ${Q_HZONE.H}$ μm, the central part of the A band not reached by thin filaments.`,
  scheme: [[`${Q_HZONE.H} μm`, 1]],
  d: 3, c: 'application', t: [1],
}), (q) => q.answer.value === 0.4 || 'value');
add('shorten-num', num({
  stem: `A muscle fibre ${Q_FIBRE.cm} cm long is made of sarcomeres, each ${Q_FIBRE.from} μm long, arranged end to end. If every sarcomere shortens to ${Q_FIBRE.to} μm, by how many millimetres does the fibre shorten? (1 cm = 10,000 μm)`,
  value: Q_FIBRE.mm, tol: 0.01, unit: 'mm',
  sol: r`Number of sarcomeres $= \dfrac{30000}{${Q_FIBRE.from}} = ${Q_FIBRE.n}$. Each shortens by $${Q_FIBRE.from} - ${Q_FIBRE.to} = ${Q_FIBRE.d}$ μm. Total $= ${Q_FIBRE.n} \times ${Q_FIBRE.d} = ${Q_FIBRE.um}$ μm $= ${Q_FIBRE.mm}$ mm.`,
  scheme: [[`${Q_FIBRE.n} sarcomeres`, 0.5], [`${Q_FIBRE.mm} mm`, 0.5]],
  d: 4, c: 'application', t: [1],
}), (q) => q.answer.value === 3.6 || 'value');
add('phalanges-num', num({
  stem: 'How many phalanges are there in the whole human skeleton?',
  value: PHALANGES_N,
  sol: r`Each fore limb and each hind limb has 14 phalanges: $4 \times 14 = ${PHALANGES_N}$.`,
  scheme: [[`${PHALANGES_N}`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 56 || 'value');
add('ribsnot-num', num({
  stem: 'How many individual ribs in an adult are NOT joined directly to the sternum?',
  value: NOT_STERNAL,
  sol: r`False ribs (8th–10th pairs) and floating ribs (11th–12th pairs): $2 \times (${RIB_PAIRS.false} + ${RIB_PAIRS.floating}) = ${NOT_STERNAL}$ ribs.`,
  scheme: [[`${NOT_STERNAL}`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 10 || 'value');
add('upperlimb-num', num({
  stem: 'How many bones are there in both upper limbs together with both halves of the pectoral girdle?',
  value: UPPER_WITH_GIRDLE,
  sol: r`Two fore limbs and two clavicles and two scapulae: $2 \times ${FORE_N} + ${GIRDLES.pectoral} = ${UPPER_WITH_GIRDLE}$ bones.`,
  scheme: [[`${UPPER_WITH_GIRDLE}`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 64 || 'value');

// ---------------------------------------------------------------- short answers
add('redwhite-short', short({
  marks: 2,
  stem: 'Distinguish between red and white muscle fibres on the basis of myoglobin, mitochondria and the way they obtain energy.',
  model: '**Red fibres** contain plenty of the red, oxygen-storing pigment **myoglobin** and many **mitochondria**; they use stored oxygen for **aerobic** ATP production and are called aerobic muscles. **White fibres** have very little myoglobin and few mitochondria but much sarcoplasmic reticulum, and depend on **anaerobic** processes.',
  sol: 'Myoglobin, mitochondria, aerobic or anaerobic.',
  scheme: [['Red: myoglobin, mitochondria, aerobic', 1], ['White: little myoglobin, few mitochondria, anaerobic', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('actin-short', short({
  marks: 2,
  stem: 'Describe the structure of an actin (thin) filament and state the role of troponin in a resting muscle.',
  model: 'An actin filament is made of **two F (filamentous) actins** wound helically; each F-actin is a polymer of **G (globular) actin** monomers. Two filaments of **tropomyosin** run along it, with **troponin** at regular intervals. At rest, a **subunit of troponin masks** the active binding sites for myosin.',
  sol: 'F-actin, G-actin, tropomyosin, troponin.',
  scheme: [['F-actin of G-actin, tropomyosin, troponin', 1], ['Troponin masks myosin-binding sites', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('myosin-short', short({
  marks: 2,
  stem: 'Describe the structure of a myosin monomer and name the two properties of its head that are needed for contraction.',
  model: 'The monomer, **meromyosin**, has a globular **head with a short arm**, the **heavy meromyosin (HMM)**, and a **tail**, the **light meromyosin (LMM)**. The HMM projects from the thick filament as a **cross arm**. The head is an active **ATPase** and has **binding sites for ATP and actin**.',
  sol: 'HMM, LMM, ATPase, actin site.',
  scheme: [['HMM head and LMM tail', 1], ['ATPase activity and actin-binding site', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('ribs-short', short({
  marks: 2,
  stem: 'An X-ray of a patient’s chest is labelled with rib numbers 1 to 12 on each side. Explain how the ribs would be grouped into true, false and floating ribs, and why.',
  model: 'Ribs **1–7** are **true ribs**: joined dorsally to thoracic vertebrae and ventrally to the **sternum** by hyaline cartilage. Ribs **8–10** are **false (vertebrochondral) ribs**: they join the **seventh rib** by cartilage, not the sternum. Ribs **11–12** are **floating ribs**, not connected ventrally.',
  sol: 'Grouping by ventral attachment.',
  scheme: [['True 1–7 to sternum', 1], ['False 8–10 to seventh rib; floating 11–12 free', 1]],
  d: 2, c: 'application', t: [2],
}));
add('squat-short', short({
  marks: 2,
  stem: 'During a squat the knee bends deeply, yet a weightlifter cannot rotate her knee the way she rotates her shoulder. Name both joints and explain the difference in their movement.',
  model: 'The knee is a **hinge joint**, which allows movement mainly in **one plane**, like a door. The shoulder is a **ball and socket joint** between the head of the humerus and the glenoid cavity of the pectoral girdle, which allows movement in **many directions**, including rotation.',
  sol: 'Hinge versus ball and socket.',
  scheme: [['Knee hinge: one plane', 1], ['Shoulder ball and socket: many directions', 1]],
  d: 3, c: 'application', t: [2],
}));
add('osteo-short', short({
  marks: 2,
  stem: 'A grandmother in her late sixties fractured her hip after a slight stumble, and her doctor said her bones had become thin. Name the likely disorder and state its main features and a common cause.',
  model: 'She probably has **osteoporosis**, an **age-related** disorder in which **bone mass decreases** and the chances of **fractures increase**, so even a small fall can break a bone. **Decreased levels of oestrogen** after menopause is a common cause.',
  sol: 'Osteoporosis.',
  scheme: [['Osteoporosis: low bone mass, fractures', 1], ['Low oestrogen', 1]],
  d: 2, c: 'application', t: [3],
}));
add('calcblock-short', short({
  marks: 2,
  stem: 'A chemical prevents the sarcoplasmic reticulum from releasing calcium ions, although nerve impulses still reach the muscle normally. Predict, with reason, whether the muscle will contract.',
  model: 'It **will not contract**. Without released Ca²⁺, nothing binds to the **troponin** subunit, so the **active sites on actin stay masked**. Myosin heads cannot form **cross bridges**, so the thin filaments cannot slide, even though the sarcolemma is excited.',
  sol: 'No calcium, no unmasking, no cross bridges.',
  scheme: [['No contraction', 1], ['Sites stay masked: no cross bridges', 1]],
  d: 3, c: 'application', t: [1],
}));
add('bands-short3', short({
  marks: 3,
  stem: 'A student viewing myofibrils under an electron microscope records the A band, I band, H zone and sarcomere length, first in a relaxed fibre and then in a contracted one. Predict what she will observe for each, and explain the observations.',
  model: '**A band:** unchanged, because it equals the length of the **myosin** filaments, which do not shorten.\n\n**I band:** shorter, because the Z lines move closer as **actin** slides over myosin.\n\n**H zone:** narrower or absent, because the thin filaments slide in towards the **centre of the A band**.\n\n**Sarcomere:** shorter, as the Z lines are pulled inwards.',
  sol: 'Sliding filament predictions.',
  scheme: [['A band unchanged with reason', 1], ['I band and sarcomere shorter with reason', 1], ['H zone narrows with reason', 1]],
  d: 3, c: 'application', t: [1],
}));
add('steps-short3', short({
  marks: 3,
  stem: 'Describe, in order, the events from the arrival of a nerve signal at the neuromuscular junction to the formation of cross bridges in a skeletal muscle fibre.',
  model: '1. The signal reaches the **neuromuscular junction** through a motor neuron, which releases **acetylcholine**.\n2. An **action potential** is generated in the **sarcolemma** and spreads through the fibre.\n3. **Ca²⁺** is released from the **sarcoplasmic reticulum** into the sarcoplasm.\n4. Ca²⁺ binds a subunit of **troponin**, unmasking the active sites on **actin**.\n5. Myosin heads, energised by **ATP hydrolysis**, bind these sites to form **cross bridges**.',
  sol: 'Ordered steps.',
  scheme: [['Acetylcholine and action potential', 1], ['Calcium released, binds troponin', 1], ['Myosin with ATP forms cross bridges', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('axial-short3', short({
  marks: 3,
  stem: 'List the components of the axial skeleton with the number of bones in each, and show that they add up to 80.',
  model: '**Skull region (29):** 8 cranial bones forming the cranium, 14 facial bones, 1 U-shaped hyoid and 6 ear ossicles (three in each middle ear).\n\n**Vertebral column (26):** cervical 7, thoracic 12, lumbar 5, sacral 1 (fused) and coccygeal 1 (fused).\n\n**Sternum (1)**, a flat ventral bone, and **ribs (24)**, in 12 pairs joined to the thoracic vertebrae.\n\nTotal: $29 + 26 + 1 + 24 = 80$ bones.',
  sol: 'Counts and sum.',
  scheme: [['Skull region 29 with parts', 1], ['Vertebral column 26 with regions', 1], ['Sternum, ribs and the total 80', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('clinic-short3', short({
  marks: 3,
  stem: 'Name the disorder in each case and give its cause: (i) a boy whose leg muscles have been wasting away steadily since early childhood, as in his maternal uncle; (ii) a man with a painful, swollen big-toe joint and a high level of uric acid; (iii) a woman with muscle weakness caused by her own antibodies acting at the neuromuscular junction.',
  model: '(i) **Muscular dystrophy** — progressive degeneration of skeletal muscle, mostly due to a **genetic disorder**, which explains the affected relative.\n\n(ii) **Gout** — inflammation of the joint due to accumulation of **uric acid crystals**.\n\n(iii) **Myasthenia gravis** — an **autoimmune** disorder affecting the **neuromuscular junction**, causing fatigue, weakening and even paralysis.',
  sol: 'Three disorders with causes.',
  scheme: [['Muscular dystrophy, genetic', 1], ['Gout, uric acid', 1], ['Myasthenia gravis, autoimmune', 1]],
  d: 2, c: 'application', t: [3],
}));
add('muscles-short3', short({
  marks: 3,
  stem: 'Compare skeletal, visceral and cardiac muscles with respect to their location, appearance and control.',
  model: '**Skeletal:** attached to bones; **striated**; **voluntary**; used in locomotion and posture.\n\n**Visceral:** in the inner walls of hollow organs such as the alimentary canal and reproductive tract; **smooth**, not striated; **involuntary**.\n\n**Cardiac:** in the heart, cells assembled in a branching pattern; **striated**; **involuntary**.',
  sol: 'Three muscle types compared.',
  scheme: [['Skeletal', 1], ['Visceral', 1], ['Cardiac', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- long answers
add('sliding-long', long({
  stem: 'Explain the sliding filament theory of muscle contraction. Describe the events from the nerve signal to relaxation, and state how each band of the sarcomere changes.',
  model: 'According to the **sliding filament theory**, a muscle fibre contracts because the **thin (actin) filaments slide over the thick (myosin) filaments**; neither set of filaments shortens.\n\n**Excitation.** A signal from the central nervous system reaches the **neuromuscular junction** through a **motor neuron**, which releases **acetylcholine**. This generates an **action potential** in the **sarcolemma** that spreads through the fibre and causes the release of **Ca²⁺** from the **sarcoplasmic reticulum**.\n\n**Cross-bridge cycle.** Ca²⁺ binds a subunit of **troponin**, removing the masking of the active sites on actin. The myosin head, energised by **hydrolysing ATP**, binds the exposed site to form a **cross bridge** and pulls the actin filament towards the centre of the **A band**. Releasing ADP and Pi, the head relaxes; a **new ATP** binds and the cross bridge breaks. Repeated cycles cause further sliding.\n\n**Band changes.** The **Z lines** are pulled inwards, so the **sarcomere shortens**; the **I bands shorten**, the **H zone narrows or disappears**, but the **A band keeps its length**.\n\n**Relaxation.** Ca²⁺ is pumped back into the sarcoplasmic reticulum, the actin sites are masked again, and the Z lines return to their original positions.',
  sol: 'Theory, excitation, cross bridges, bands, relaxation.',
  scheme: [['Statement of the theory', 0.5], ['Nerve signal, acetylcholine, action potential, Ca²⁺', 1.5], ['Troponin, ATP, cross bridge, pulling, breaking', 1.5], ['Band changes', 1], ['Relaxation', 0.5]],
  wl: [80, 240],
  d: 3, c: 'understanding', t: [1],
}));
add('fibre-long', long({
  stem: 'Describe the structure of a skeletal muscle, from the whole muscle to its contractile proteins. Explain why its fibres appear striated.',
  model: '**Muscle to fibre.** A skeletal muscle is made of bundles called **fascicles**, held together by a collagenous connective tissue layer, the **fascia**. Each fascicle contains many **muscle fibres**. A fibre is lined by the **sarcolemma** around the **sarcoplasm**, which has many nuclei (a **syncytium**). Its endoplasmic reticulum, the **sarcoplasmic reticulum**, stores **calcium ions**.\n\n**Myofibrils and striations.** Many parallel **myofibrils** fill the sarcoplasm. They show alternate **light I bands**, containing **actin** (isotropic), and **dark A bands**, containing **myosin** (anisotropic). This regular pattern of actin and myosin gives the **striated** appearance. An elastic **Z line** bisects each I band; an **M line** holds the thick filaments in the middle of the A band; the **H zone** is the part of the A band not overlapped by thin filaments. The unit between two Z lines is the **sarcomere**.\n\n**Contractile proteins.** Each thin filament has **two F-actins**, polymers of **G-actin**, helically wound, with **tropomyosin** along them and **troponin** at intervals; a troponin subunit masks myosin-binding sites at rest. Each thick filament is a polymer of **meromyosin**: a globular **heavy meromyosin** head with a short arm, projecting as a **cross arm**, and a **light meromyosin** tail. The head is an **ATPase** with binding sites for ATP and actin.',
  sol: 'Levels of organisation, bands, proteins.',
  scheme: [['Fascicles, fibre, sarcolemma, sarcoplasm, sarcoplasmic reticulum', 1.5], ['Bands, lines, H zone, sarcomere, striation', 1.5], ['Actin filament proteins', 1], ['Myosin structure', 1]],
  wl: [80, 240],
  d: 3, c: 'understanding', t: [1],
}));
add('skeleton-long', long({
  stem: 'Describe the human axial and appendicular skeleton, giving the number of bones in each part.',
  model: 'The human skeleton has **206 bones**: **80 axial** and **126 appendicular**.\n\n**Axial skeleton.** The **skull region (29)** has 8 cranial bones forming the protective cranium, 14 facial bones, the U-shaped **hyoid** at the base of the buccal cavity and 3 **ear ossicles** in each middle ear; it joins the vertebral column by two occipital condyles (dicondylic). The **vertebral column (26)** has cervical 7, thoracic 12, lumbar 5, sacral 1 and coccygeal 1 vertebrae; the first, the **atlas**, articulates with the occipital condyles, and each vertebra has a **neural canal** for the spinal cord. The **sternum (1)** is a flat ventral bone. There are **12 pairs of ribs (24)**: true ribs 1–7, false ribs 8–10, floating ribs 11–12. Thoracic vertebrae, ribs and sternum form the **rib cage**.\n\n**Appendicular skeleton.** Each **fore limb (30)** has the humerus, radius, ulna, 8 carpals, 5 metacarpals and 14 phalanges. Each **hind limb (30)** has the femur, tibia, fibula, 7 tarsals, 5 metatarsals, 14 phalanges and the patella. The **pectoral girdle** has a clavicle and a scapula on each side; the glenoid cavity of the scapula takes the humerus. The **pelvic girdle** has two **coxal bones**, each of fused ilium, ischium and pubis, with an **acetabulum** for the femur; they meet at the **pubic symphysis**.',
  sol: 'Axial and appendicular with counts.',
  scheme: [['Total and division', 0.5], ['Skull region', 1], ['Vertebral column, sternum and ribs', 1.5], ['Limbs', 1], ['Girdles', 1]],
  wl: [80, 240],
  d: 3, c: 'understanding', t: [2],
}));
add('joints-long', long({
  stem: 'A physiotherapist examining a gymnast checks the skull sutures, the spine, the shoulder, the knee, the neck rotation, the wrist and the thumb. Classify the joints at each of these places, and explain how the structure of each class of joint determines the movement it allows.',
  model: '**Fibrous joints — skull sutures.** The flat cranial bones are fused end to end by dense **fibrous connective tissue**, so **no movement** is possible; this protects the brain.\n\n**Cartilaginous joints — the spine.** Adjacent **vertebrae** are joined by **cartilage**, which allows only **limited** bending, so the column is flexible yet protects the spinal cord.\n\n**Synovial joints** have a fluid-filled **synovial cavity** between the articulating surfaces, permitting **considerable movement**:\n- **Shoulder:** **ball and socket** joint between the humerus and the pectoral girdle; movement in many directions.\n- **Knee:** **hinge** joint; movement mainly in one plane.\n- **Neck rotation:** **pivot** joint between the **atlas and axis**, letting the head turn.\n- **Wrist:** **gliding** joints between the carpals; small sliding movements.\n- **Thumb:** **saddle** joint between the carpal and metacarpal; a wide range of movement.\n\nIn every case the joint acts as a **fulcrum** through which the force of muscle contraction produces movement.',
  sol: 'Classify and relate structure to movement.',
  scheme: [['Fibrous: sutures, no movement', 1], ['Cartilaginous: vertebrae, limited', 1], ['Synovial cavity, considerable', 0.5], ['Five synovial examples correctly placed', 2], ['Joint as fulcrum', 0.5]],
  wl: [80, 240],
  d: 3, c: 'application', t: [2],
}));
add('athlete-long', long({
  stem: 'A coach claims: “A marathon runner and a 100-metre sprinter need exactly the same kind of muscle fibres, and both tire for the same reason.” Evaluate this claim using your knowledge of red and white fibres, the energy needs of contraction and muscle fatigue.',
  model: '**Shared basis.** In both athletes contraction works the same way: Ca²⁺ released from the sarcoplasmic reticulum unmasks actin, and myosin heads use **ATP** to form and break **cross bridges**. So both need a steady supply of ATP.\n\n**Different fibres.** A **marathon** lasts hours and needs ATP made **aerobically**. This suits **red fibres**, rich in the oxygen-storing pigment **myoglobin** and in **mitochondria**; they are called aerobic muscles. A **sprint** lasts seconds and needs very rapid, powerful contraction. **White fibres**, with little myoglobin and few mitochondria but much **sarcoplasmic reticulum**, depend on **anaerobic** processes and suit such bursts.\n\n**Fatigue.** In the sprinter, intense repeated activation drives **anaerobic breakdown of glycogen**, and **lactic acid** accumulates quickly, causing fatigue. The marathon runner works mostly aerobically, so lactic acid builds up far more slowly; tiredness comes much later and has other contributing causes.\n\n**Judgement.** The claim is **only partly correct**. The contraction mechanism is the same, but the two events favour **different fibre types**, and fatigue does not arise in the same way or at the same rate.',
  sol: 'Mechanism shared; fibre types and fatigue differ; judgement.',
  scheme: [['Common ATP-dependent mechanism', 1], ['Red fibres for endurance with reasons', 1.5], ['White fibres for sprint with reasons', 1], ['Fatigue and lactic acid compared; judgement', 1.5]],
  wl: [80, 240],
  d: 4, c: 'evaluation', t: [1],
}));

// ---------------------------------------------------------------- cases
add('sarcomere-case', mk.case({
  passage: `A research student measured the same sarcomere of a rabbit muscle fibre in an electron microscope before and after stimulating the fibre.\n\n| State | Sarcomere (μm) | A band (μm) | Actin from each Z line (μm) |\n|---|---|---|---|\n| Relaxed | ${CASE_R.L} | ${CASE_R.A} | ${ACTIN.toFixed(1)} |\n| Contracted | ${CASE_C.L} | ${CASE_C.A} | ${ACTIN.toFixed(1)} |`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which observation in the table supports the sliding filament theory most directly?',
      right: 'The A band has the same width in both states while the sarcomere shortens.',
      wrong: ['The actin filaments become shorter on contraction.', 'The sarcomere becomes longer on contraction.', 'The A band shortens as much as the sarcomere.'],
      sol: 'Filaments keep their lengths; the sarcomere shortens with the A band constant, so the filaments must slide — option (@K).',
      d: 2, c: 'analysis', t: [1],
    })),
    part('b', num({
      stem: 'What is the total width of the I band in the contracted state, in micrometres?',
      value: CASE_C.I, tol: 0.01, unit: 'μm',
      sol: r`I band $= ${CASE_C.L} - ${CASE_C.A} = ${CASE_C.I}$ μm.`,
      scheme: [[`${CASE_C.I} μm`, 1]],
      d: 2, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: `Calculate the width of the H zone in the relaxed and contracted states, and explain why it narrows.`,
      model: `Relaxed: $${CASE_R.L} - 2 \\times ${ACTIN.toFixed(1)} = ${CASE_R.H}$ μm; contracted: $${CASE_C.L} - 2 \\times ${ACTIN.toFixed(1)} = ${CASE_C.H}$ μm. The H zone is the part of the A band **not overlapped by thin filaments**; as actin slides towards the M line, the gap between the two sets of thin filaments **narrows**.`,
      sol: 'H zone from sarcomere minus both actin lengths.',
      scheme: [['Both widths', 1], ['Thin filaments slide inwards', 1]],
      d: 3, c: 'application', t: [1],
    }), [
      short({
        marks: 2,
        stem: `If the same sarcomere shortened further to ${CASE_LIMIT.L.toFixed(1)} μm, what would happen to its H zone and I band? Explain.`,
        model: `The H zone would **disappear**: $${CASE_LIMIT.L.toFixed(1)} - 2 \\times ${ACTIN.toFixed(1)} = 0$, because the thin filaments from the two Z lines would **meet at the centre** of the A band. The I band would narrow to $${CASE_LIMIT.L.toFixed(1)} - ${MYOSIN} = ${CASE_LIMIT.I}$ μm, while the A band would stay ${MYOSIN} μm.`,
        sol: 'H zone vanishes; I band 0.4 μm.',
        scheme: [['H zone disappears with reason', 1], ['I band narrows; A band constant', 1]],
        d: 3, c: 'application', t: [1],
      }),
    ]),
  ],
}), (q) => (q.children[1].answer.value === 0.6 && CASE_LIMIT.I === 0.4) || 'value');
add('biopsy-case', mk.case({
  passage: 'A sports scientist examined small samples of thigh muscle from two volunteers. Sample P, from a long-distance cyclist, was deep red; its fibres were packed with mitochondria and had a high myoglobin content. Sample Q, from a weightlifter, was pale; its fibres had few mitochondria, very little myoglobin and an extensive sarcoplasmic reticulum.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Sample P is made mainly of',
      right: 'red fibres, which work aerobically',
      wrong: ['white fibres, which work anaerobically', 'visceral muscle fibres', 'cardiac muscle fibres'],
      sol: 'High myoglobin and many mitochondria mark red (aerobic) fibres — option (@K).',
      d: 1, c: 'application', t: [1],
    })),
    part('b', mcq({
      stem: 'During a set of very heavy lifts, which substance is most likely to accumulate in the fibres of type Q and cause fatigue?',
      right: 'Lactic acid',
      wrong: ['Myoglobin', 'Uric acid', 'Acetylcholine'],
      sol: 'White fibres depend on anaerobic breakdown of glycogen, which produces lactic acid — option (@K).',
      d: 2, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why the fibres of sample P suit the cyclist’s long rides.',
      model: 'Long rides need ATP for hours. Red fibres store oxygen in **myoglobin** and have many **mitochondria**, so they make ATP **aerobically** and steadily. They therefore avoid rapid lactic acid build-up and **resist fatigue** during sustained activity.',
      sol: 'Myoglobin, mitochondria, aerobic supply.',
      scheme: [['Myoglobin and mitochondria', 1], ['Aerobic, sustained ATP, less fatigue', 1]],
      d: 2, c: 'application', t: [1],
    }), [
      short({
        marks: 2,
        stem: 'Explain why the extensive sarcoplasmic reticulum of sample Q matters for contraction.',
        model: 'The sarcoplasmic reticulum is the **store of Ca²⁺**. When the fibre is excited it releases Ca²⁺, which binds **troponin** and unmasks actin for cross bridges; pumping Ca²⁺ back ends contraction. A large reticulum allows **quick release and recapture** of calcium.',
        sol: 'Calcium store; release and recapture.',
        scheme: [['Calcium store released on excitation', 1], ['Ca²⁺ unmasks actin; rapid cycles', 1]],
        d: 3, c: 'analysis', t: [1],
      }),
    ]),
  ],
}));
add('shoulder-case', mk.case({
  passage: 'During a cricket match, a fielder dived for a catch and landed hard on his outstretched arm. An X-ray showed that the rounded head of his upper-arm bone had slipped out of the shallow cavity of the shoulder blade that normally holds it. The bones themselves were not broken.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The cavity of the shoulder blade from which the bone slipped is the',
      right: 'glenoid cavity of the scapula',
      wrong: ['acetabulum of the coxal bone', 'neural canal of a vertebra', 'acromion of the clavicle'],
      sol: 'The glenoid cavity of the scapula articulates with the head of the humerus to form the shoulder joint — option (@K).',
      d: 1, c: 'application', t: [2],
    })),
    part('b', num({
      stem: 'How many bones are there in one human fore limb (not counting the girdle)?',
      value: FORE_N,
      sol: r`Humerus, radius, ulna, 8 carpals, 5 metacarpals, 14 phalanges: $1 + 1 + 1 + 8 + 5 + 14 = ${FORE_N}$.`,
      scheme: [[`${FORE_N}`, 1]],
      d: 1, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Name the type of joint at the shoulder and explain why a joint that allows so much movement can also be dislocated quite easily.',
      model: 'It is a **ball and socket** synovial joint between the humerus and the pectoral girdle. The **rounded head** sits in a **shallow cavity**, giving movement in **many directions**; the same shallow fit means a strong force can push the head out of the socket.',
      sol: 'Ball and socket; shallow socket.',
      scheme: [['Ball and socket', 1], ['Shallow socket: mobility and risk', 1]],
      d: 3, c: 'analysis', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'Describe the features of the synovial joint found at the fielder’s shoulder that allow smooth movement.',
        model: 'A synovial joint has a fluid-filled **synovial cavity** between the articulating surfaces of the bones. The bone ends are covered by smooth cartilage, and the joint is enclosed by a capsule, so the bones move **freely and smoothly**, allowing **considerable movement**.',
        sol: 'Synovial cavity, fluid, considerable movement.',
        scheme: [['Synovial cavity with fluid', 1], ['Considerable smooth movement', 1]],
        d: 2, c: 'understanding', t: [2],
      }),
    ]),
  ],
}), (q) => q.children[1].answer.value === 30 || 'value');
add('clinic-case', mk.case({
  passage: 'Three patients visited an orthopaedic clinic on the same morning.\n\n- **Patient P**, 35, had sudden, painful cramps of the hand muscles; her blood calcium level was well below normal.\n- **Patient Q**, 58, had a red, swollen, very painful joint at the base of his big toe; his blood uric acid level was high.\n- **Patient R**, 70, a woman long past menopause, had broken a vertebra while lifting a bucket; a scan showed low bone mass.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Patient P is suffering from',
      right: 'tetany',
      wrong: ['gout', 'muscular dystrophy', 'osteoporosis'],
      sol: 'Rapid spasms due to low Ca²⁺ in body fluid are tetany — option (@K).',
      d: 1, c: 'application', t: [3],
    })),
    part('b', mcq({
      stem: 'Patient Q’s joint pain is due to',
      right: 'gout, the accumulation of uric acid crystals in the joint',
      wrong: ['tetany, a shortage of calcium ions', 'myasthenia gravis, an autoimmune attack on the neuromuscular junction', 'fatigue caused by lactic acid'],
      sol: 'Gout is inflammation of joints due to accumulation of uric acid crystals — option (@K).',
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Name Patient R’s disorder, and explain why women of her age are particularly at risk.',
      model: 'Patient R has **osteoporosis**, an age-related disorder with **decreased bone mass** and increased chances of **fractures**. After menopause the level of **oestrogen falls**, and decreased oestrogen is a common cause, so older women are especially at risk.',
      sol: 'Osteoporosis; low oestrogen.',
      scheme: [['Osteoporosis with features', 1], ['Low oestrogen after menopause', 1]],
      d: 2, c: 'application', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'A fourth patient has drooping eyelids and limb muscles that weaken quickly with use, because his antibodies act at the neuromuscular junction. Name the disorder and explain why his muscles weaken.',
        model: 'He has **myasthenia gravis**, an **autoimmune** disorder affecting the **neuromuscular junction**. Signals from motor neurons are not passed on properly to the muscle fibres, so the muscles show **fatigue, weakening** and, in severe cases, **paralysis**.',
        sol: 'Myasthenia gravis.',
        scheme: [['Myasthenia gravis, autoimmune', 1], ['Junction affected: weakness', 1]],
        d: 2, c: 'application', t: [3],
      }),
    ]),
  ],
}));
