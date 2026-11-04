// ICSE 9 Biology ch11 Skeleton: Movement and Locomotion — question bank in ICSE school-examination style (10-mark structured questions).
// Numbers come from calc.mjs. AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true, R does not explain.
import { mk, add, svgV } from '../../icse-9-biology-ch01/src/lib.mjs';
import { CRANIAL, FACIAL, SKULL, MOVABLE_V, VERT, VERT_CHILD, COLUMN_ADULT, UPPER_LIMB, BOTH_ARMS, PHALANGES_HAND, BOTH_HANDS, AXIAL, APPENDICULAR, DIFF, HAND_TOTAL, MODEL_LEFT, TOTAL } from './calc.mjs';
import { SKELETON_LETTERED, JOINTS_LETTERED, COLUMN_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const skelFig = svgV(SKELETON_LETTERED, 'The human skeleton from the front with parts lettered A to E');
const jointFig = svgV(JOINTS_LETTERED, 'Four freely movable joints lettered A to D with movement arrows');
const colFig = svgV(COLUMN_LETTERED, 'The vertebral column in five regions lettered A to E');
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct term', 1]], ...o });

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('chk-protect', mcq({
  stem: 'The brain is protected by the',
  right: 'skull', wrong: ['rib cage', 'vertebral column', 'pelvic girdle'],
  sol: 'The cranium forms a rigid box round the brain — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('chk-axial', mcq({
  stem: 'Which of these bones belongs to the axial skeleton?',
  right: 'Sternum', wrong: ['Clavicle', 'Femur', 'Scapula'],
  sol: 'The sternum lies along the middle line of the chest — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('chk-limb', mcq({
  stem: 'The humerus belongs to the',
  right: 'appendicular skeleton', wrong: ['axial skeleton', 'skull', 'vertebral column'],
  sol: 'The humerus is the bone of the upper arm, so it is part of the limbs — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('chk-sutures', mcq({
  stem: 'The joints between the bones of the cranium are',
  right: 'immovable', wrong: ['slightly movable', 'ball and socket', 'hinge'],
  sol: 'The edges of the skull bones interlock and do not move — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('chk-hinge', mcq({
  stem: 'A joint that moves back and forth like a door on its hinges is found at the',
  right: 'elbow', wrong: ['shoulder', 'hip', 'wrist'],
  sol: 'The elbow is a hinge joint — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('chk-pivot', mcq({
  stem: 'Turning the head to say no happens mainly at a',
  right: 'pivot joint', wrong: ['hinge joint', 'gliding joint', 'immovable joint'],
  sol: 'The atlas turns on the axis, a pivot joint — option (@K).',
  d: 1, c: 'recall', t: [3],
}));

// ---------------------------------------------------------------- t01 functions
add('ribcage-mcq', mcq({
  stem: 'A boy is hit on the chest by a cricket ball. The ribs take the force and the soft organs beneath are saved. The organs guarded by the rib cage are the',
  right: 'heart and lungs', wrong: ['brain and spinal cord', 'kidneys and bladder', 'stomach and intestines'],
  sol: 'The ribs and sternum form a cage round the heart and lungs — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('marrow-mcq', mcq({
  stem: 'A patient with damaged red bone marrow becomes pale and weak. Which function of the skeleton is mainly affected?',
  right: 'Making of blood cells', wrong: ['Protection of the brain', 'Support of the body', 'Movement at joints'],
  sol: 'Red bone marrow makes blood cells — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('mineral-mcq', mcq({
  stem: 'The bones of an old woman break easily because they have lost much of their store of',
  right: 'calcium', wrong: ['glucose', 'oxygen', 'chlorophyll'],
  sol: 'Bones store calcium and phosphorus, which make them hard — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('lever-mcq', mcq({
  stem: 'When a person lifts a bag, the bones of the arm act as',
  right: 'levers moved by muscles', wrong: ['pumps for blood', 'filters for waste', 'glands for hormones'],
  sol: 'Muscles pull on bones, which turn about joints like levers — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('attach-mcq', mcq({
  stem: 'Muscles are fixed firmly to bones by strong cords called',
  right: 'tendons', wrong: ['ligaments', 'nerves', 'veins'],
  sol: 'Tendons join muscle to bone; ligaments join bone to bone — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('spinal-mcq', mcq({
  stem: 'A swimmer injures her backbone and the doctors move her with great care. The backbone needs this care because it surrounds and protects the',
  right: 'spinal cord', wrong: ['brain', 'heart', 'liver'],
  sol: 'The vertebrae form a canal round the spinal cord — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('ar-armour', ar({
  a: 'Bones are a store of calcium for the body.',
  r: 'Red bone marrow makes blood cells.',
  key: 'd',
  sol: 'Both statements are true, but the second does not explain the first — option (d).',
  d: 2, c: 'analysis', t: [1],
}));
add('rib-tf', tf({
  stem: 'The ribs and the sternum together protect the heart and the lungs.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [1],
}));
add('term-marrow', term({
  stem: 'Give the biological term: the soft tissue inside some bones that makes blood cells.',
  model: '**Red bone marrow.**', sol: 'Red bone marrow.', sch: 'Red bone marrow',
  d: 1, c: 'recall', t: [1],
}));
add('reason-skull', term({
  stem: 'Give reason: the cranium is a hard, rigid box.',
  model: 'It must **protect the brain**, which is soft and easily damaged.', sol: 'To protect the brain.', sch: 'Protects the brain',
  d: 2, c: 'understanding', t: [1],
}));
add('func-short2', short({
  marks: 2,
  stem: 'Name the organ protected by (i) the skull and (ii) the rib cage.',
  model: '(i) The skull protects the **brain**. (ii) The rib cage, formed by the ribs and the sternum, protects the **heart and lungs**.',
  sol: 'Brain; heart and lungs.',
  scheme: [['Brain', 1], ['Heart and lungs', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('blood-short', short({
  marks: 2,
  stem: 'State (i) where blood cells are made in the skeleton and (ii) the two minerals stored in bones.',
  model: '(i) Blood cells are made in the **red bone marrow** of some bones. (ii) Bones store **calcium** and **phosphorus**, which make them hard and strong.',
  sol: 'Red bone marrow; calcium and phosphorus.',
  scheme: [['Red bone marrow', 1], ['Calcium and phosphorus', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('move-short', short({
  marks: 2,
  stem: 'Explain how the skeleton helps the body to move.',
  model: '**Muscles** are fixed to the bones by **tendons**. When a muscle contracts it pulls on a bone, which **turns about a joint** like a lever and moves a part of the body.',
  sol: 'Muscles pull on bones, which act as levers at joints.',
  scheme: [['Muscles attached to bones, pull on them', 1], ['Bones act as levers at joints', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('func-short3', short({
  marks: 3,
  stem: 'State three functions of the human skeleton and give one example of each.',
  model: '1. **Support**: it holds the body upright and gives it its shape.\n2. **Protection**: the skull protects the brain (or the rib cage the heart and lungs).\n3. **Movement**: muscles pull on the bones, which act as levers at the joints. (Others: making blood cells in red bone marrow; storing calcium.)',
  sol: 'Any three functions with examples.',
  scheme: [['First function with example', 1], ['Second function with example', 1], ['Third function with example', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('lastfn-short3', short({
  marks: 3,
  stem: 'A girl falls from her cycle on to her head wearing a helmet and is unhurt. Name the part of the skeleton that normally protects the brain and state two other functions of the skeleton.',
  model: 'The **skull** (cranium) normally protects the brain. Two other functions: the skeleton **supports** the body and gives it shape, and **muscles pull on bones** to produce movement. (It also makes blood cells and stores calcium.)',
  sol: 'Skull; two other functions.',
  scheme: [['Skull', 1], ['Second function', 1], ['Third function', 1]],
  d: 2, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 axial and appendicular
add('axial-mcq', mcq({
  stem: 'Which group lists only bones of the axial skeleton?',
  right: 'Skull, sternum, ribs, vertebrae', wrong: ['Skull, clavicle, ribs, sternum', 'Sternum, scapula, vertebrae, ribs', 'Ribs, femur, skull, sternum'],
  sol: 'The clavicle, scapula and femur are appendicular — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('app-mcq', mcq({
  stem: 'Which group lists only bones of the appendicular skeleton?',
  right: 'Scapula, femur, humerus, hip bone', wrong: ['Skull, humerus, femur, ulna', 'Clavicle, ribs, tibia, radius', 'Sternum, tibia, ulna, hip bone'],
  sol: 'The skull, ribs and sternum are axial — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('girdle-mcq', mcq({
  stem: 'The pelvic girdle joins the lower limbs to the',
  right: 'vertebral column', wrong: ['skull', 'sternum', 'ribs'],
  sol: 'The hip bones are joined to the sacrum of the vertebral column — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('neck-mcq', mcq({
  stem: 'A giraffe has a very long neck, yet its neck has the same number of cervical vertebrae as a human neck. How many cervical vertebrae does a human have?',
  right: '7', wrong: ['5', '12', '24'],
  sol: `Humans have ${VERT.cervical} cervical vertebrae — option (@K).`,
  d: 2, c: 'understanding', t: [2],
}));
add('child-mcq', mcq({
  stem: 'A baby has more separate bones in its backbone than an adult because some vertebrae fuse as the child grows. Which two parts of the column are formed by such fusion?',
  right: 'The sacrum and the coccyx', wrong: ['The cervical and thoracic regions', 'The thoracic and lumbar regions', 'The cervical and lumbar regions'],
  sol: 'Five sacral vertebrae fuse into the sacrum and four coccygeal ones into the coccyx — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('figSkelD-mcq', mcq({
  stem: 'In the figure of the skeleton, which two letters mark bones of the appendicular skeleton?',
  right: 'D and E', wrong: ['A and B', 'B and C', 'A and C'],
  sol: 'D is the pelvic girdle and E the femur; A is the skull, B the ribs and C the vertebral column — option (@K).',
  d: 2, c: 'application', t: [2],
  assets: [skelFig],
}));
add('figSkelC-mcq', mcq({
  stem: 'In the figure of the skeleton, which letter marks the bones that protect the spinal cord?',
  right: 'C', wrong: ['A', 'B', 'E'],
  sol: 'C is the vertebral column — option (@K).',
  d: 2, c: 'application', t: [2],
  assets: [skelFig],
}));
add('figColB-mcq', mcq({
  stem: 'In the figure of the vertebral column, which letter marks the region whose vertebrae carry the ribs?',
  right: 'B', wrong: ['A', 'C', 'E'],
  sol: 'B is the thoracic region, with twelve vertebrae — option (@K).',
  d: 2, c: 'application', t: [2],
  assets: [colFig],
}));
add('figColD-mcq', mcq({
  stem: 'In the figure of the vertebral column, which letter marks the triangular bone formed by fused vertebrae and joined to the hip bones?',
  right: 'D', wrong: ['A', 'C', 'E'],
  sol: 'D is the sacrum — option (@K).',
  d: 3, c: 'application', t: [2],
  assets: [colFig],
}));
add('ar-skull', ar({
  a: 'The skull belongs to the appendicular skeleton.',
  r: 'The skull is made of cranial bones and facial bones.',
  key: 'b',
  sol: 'The assertion is false: the skull is part of the axial skeleton. The reason is true — option (b).',
  d: 2, c: 'analysis', t: [2],
}));
add('scapula-tf', tf({
  stem: 'The scapula is a bone of the axial skeleton.',
  key: 'f',
  sol: 'False. The scapula is part of the pectoral girdle, which belongs to the appendicular skeleton.',
  d: 2, c: 'understanding', t: [2],
}));
add('term-appendicular', term({
  stem: 'Give the biological term: the part of the skeleton made up of the girdles and the bones of the limbs.',
  model: '**Appendicular skeleton.**', sol: 'Appendicular skeleton.', sch: 'Appendicular skeleton',
  d: 1, c: 'recall', t: [2],
}));
add('odd-axial', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: Skull, Sternum, Humerus, Ribs.',
  model: '**Humerus**; the others are **bones of the axial skeleton**.', sol: 'The humerus is a limb bone.', sch: 'Odd one and category',
  d: 2, c: 'analysis', t: [2],
}));
add('skull-num', num({
  stem: `A student counts ${CRANIAL} bones in the cranium and ${FACIAL} bones in the face of a model skull. How many bones does the skull have in all?`,
  value: SKULL,
  sol: `${CRANIAL} + ${FACIAL} = ${SKULL} bones.`,
  scheme: [[`${SKULL}`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => q.answer.value === 22 || 'value');
add('vert-num', num({
  stem: `The vertebral column has ${VERT.cervical} cervical, ${VERT.thoracic} thoracic and ${VERT.lumbar} lumbar vertebrae that remain separate. How many vertebrae are separate (movable) in all?`,
  value: MOVABLE_V,
  sol: `${VERT.cervical} + ${VERT.thoracic} + ${VERT.lumbar} = ${MOVABLE_V}.`,
  scheme: [[`${MOVABLE_V}`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 24 || 'value');
add('hand-num', num({
  stem: `Each hand has ${PHALANGES_HAND} phalanges (finger bones). How many phalanges are there in both hands?`,
  value: BOTH_HANDS,
  sol: `2 × ${PHALANGES_HAND} = ${BOTH_HANDS}.`,
  scheme: [[`${BOTH_HANDS}`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => q.answer.value === 28 || 'value');
add('diff-num', num({
  stem: `An adult skeleton has ${AXIAL} bones in the axial part and ${APPENDICULAR} in the appendicular part. How many more bones does the appendicular skeleton have?`,
  value: DIFF,
  sol: `${APPENDICULAR} − ${AXIAL} = ${DIFF}.`,
  scheme: [[`${DIFF}`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 46 || 'value');
add('model-num', num({
  stem: `A plastic model has every bone of an adult skeleton (${TOTAL} bones) except the two hands, which have ${HAND_TOTAL} bones each. How many bones does the model have?`,
  value: MODEL_LEFT,
  sol: `Bones missing = 2 × ${HAND_TOTAL} = ${2 * HAND_TOTAL}; left = ${TOTAL} − ${2 * HAND_TOTAL} = ${MODEL_LEFT}.`,
  scheme: [[`${MODEL_LEFT}`, 1]],
  d: 3, c: 'application', t: [2],
}), (q) => q.answer.value === 152 || 'value');
add('fill-skel', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [axial, appendicular, hinge, ball and socket, immovable, pivot, gliding, synovial]\n\nThe skull, ribs and sternum belong to the (a) ______ skeleton, and the bones of the limbs to the (b) ______ skeleton. The knee is a (c) ______ joint. The joints between the bones of the skull are (d) ______. The joint between the atlas and the axis is a (e) ______ joint.',
  acc: [['axial'], ['appendicular'], ['hinge'], ['immovable', 'fixed'], ['pivot']],
  sol: '(a) axial; (b) appendicular; (c) hinge; (d) immovable; (e) pivot.',
  d: 2, c: 'understanding', t: [2, 3],
}));
add('girdle-short', short({
  marks: 2,
  stem: 'Name the girdle that joins (i) the arm and (ii) the leg to the axial skeleton.',
  model: '(i) The **pectoral girdle** (clavicle and scapula) joins the arm. (ii) The **pelvic girdle** (hip bones) joins the leg.',
  sol: 'Pectoral girdle; pelvic girdle.',
  scheme: [['Pectoral girdle', 1], ['Pelvic girdle', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('axapp-short', short({
  marks: 2,
  stem: 'Name two bones of the axial skeleton and two bones of the appendicular skeleton.',
  model: 'Axial: any two of **skull, vertebra, rib, sternum**. Appendicular: any two of **clavicle, scapula, humerus, femur, hip bone**.',
  sol: 'Two axial, two appendicular bones.',
  scheme: [['Two axial bones', 1], ['Two appendicular bones', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('ribs-short', short({
  marks: 2,
  stem: 'The ribs of a human are 12 pairs. State the number of ribs in the whole rib cage and name the bone to which most ribs are joined at the front.',
  model: 'There are 12 pairs, so **24 ribs** in all. At the front most of the ribs are joined to the **sternum** (breastbone).',
  sol: '24 ribs; sternum.',
  scheme: [['24 ribs', 1], ['Sternum', 1]],
  d: 2, c: 'application', t: [2],
}));
add('axapp-table3', short({
  marks: 3,
  stem: 'Tabulate three differences between the axial skeleton and the appendicular skeleton.',
  model: `| Axial skeleton | Appendicular skeleton |\n|---|---|\n| Lies along the **axis** of the body | Forms the **limbs** and their **girdles** |\n| Skull, vertebral column, ribs, sternum | Clavicle, scapula, hip bones and limb bones |\n| About **${AXIAL}** bones in an adult | About **${APPENDICULAR}** bones in an adult |\n| Mainly **protects** organs and supports the body | Mainly helps **movement** |`,
  sol: 'Position; bones included; number; main function.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('vcol-short3', short({
  marks: 3,
  stem: 'Name three regions of the vertebral column from the top and state the number of vertebrae in each.',
  model: `The **cervical** region in the neck has **${VERT.cervical}** vertebrae; the **thoracic** region in the chest has **${VERT.thoracic}**; the **lumbar** region in the lower back has **${VERT.lumbar}**. (The sacrum has 5 fused vertebrae and the coccyx 4.)`,
  sol: 'Cervical 7, thoracic 12, lumbar 5.',
  scheme: [['Cervical 7', 1], ['Thoracic 12', 1], ['Lumbar 5', 1]],
  d: 2, c: 'recall', t: [2],
}));
add('match5', match({
  marks: 5,
  stem: 'Study the diagram of the skeleton and match each lettered part with its description.',
  pairs: [
    ['A', 'Rigid box that protects the brain'],
    ['B', 'Curved bones that protect the heart and lungs'],
    ['C', 'Stack of bones that protects the spinal cord and supports the body'],
    ['D', 'Bone ring that joins the lower limbs to the vertebral column'],
    ['E', 'Longest bone, in the thigh'],
  ],
  order: [2, 4, 1, 0, 3],
  sol: 'A skull; B ribs (rib cage); C vertebral column; D pelvic girdle; E femur.',
  d: 2, c: 'application', t: [2],
  assets: [skelFig],
}));

// ---------------------------------------------------------------- t03 joints
add('hip-mcq', mcq({
  stem: 'A dancer can swing her leg forwards, backwards and sideways and can also turn it round. The joint at her hip is a',
  right: 'ball and socket joint', wrong: ['hinge joint', 'pivot joint', 'gliding joint'],
  sol: 'A ball and socket joint allows movement in all directions and rotation — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('knee-mcq', mcq({
  stem: 'A carpenter fits a gate on hinges so that it swings in one plane only. Which joint of the body works in the same way?',
  right: 'Knee', wrong: ['Shoulder', 'Hip', 'Joint between atlas and axis'],
  sol: 'The knee is a hinge joint — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('gliding-mcq', mcq({
  stem: 'The small bones of the wrist slide a little over each other. This type of joint is called a',
  right: 'gliding joint', wrong: ['hinge joint', 'pivot joint', 'ball and socket joint'],
  sol: 'Flat surfaces that slide over each other form a gliding joint — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('fixed-mcq', mcq({
  stem: 'The bones of the skull cannot move over one another. This is because their edges',
  right: 'interlock in immovable joints', wrong: ['are joined by synovial fluid', 'form ball and socket joints', 'are joined by pads of cartilage that stretch'],
  sol: 'Immovable joints keep the skull a rigid box — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('disc-mcq', mcq({
  stem: 'Two neighbouring vertebrae are joined by a pad of cartilage and can move only a little. This joint is',
  right: 'slightly movable', wrong: ['immovable', 'a hinge joint', 'a ball and socket joint'],
  sol: 'Joints between vertebrae are slightly movable — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('synovial-mcq', mcq({
  stem: 'Which part of a freely movable joint reduces the friction between the bone ends?',
  right: 'Synovial fluid and cartilage', wrong: ['Ligaments', 'Red bone marrow', 'Tendons'],
  sol: 'The fluid lubricates and the cartilage gives a smooth surface — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('figC-mcq', mcq({
  stem: 'In the figure of four joints, which letter marks the pivot joint?',
  right: 'C', wrong: ['A', 'B', 'D'],
  sol: 'C shows a peg turning in a ring, a pivot joint; A is ball and socket, B hinge and D gliding — option (@K).',
  d: 2, c: 'application', t: [3],
  assets: [jointFig],
}));
add('figA-mcq', mcq({
  stem: 'In the figure of four joints, which letter marks the type of joint found at the shoulder?',
  right: 'A', wrong: ['B', 'C', 'D'],
  sol: 'The shoulder is a ball and socket joint, shown as A — option (@K).',
  d: 2, c: 'application', t: [3],
  assets: [jointFig],
}));
add('ar-shoulder', ar({
  a: 'The shoulder can move in more directions than the elbow.',
  r: 'The shoulder is a ball and socket joint, while the elbow is a hinge joint.',
  key: 'c',
  sol: 'Both are true, and the shape of the joints explains the difference in movement — option (c).',
  d: 2, c: 'analysis', t: [3],
}));
add('ar-elbow', ar({
  a: 'The elbow is a hinge joint.',
  r: 'A hinge joint allows movement in all directions.',
  key: 'a',
  sol: 'The assertion is true. The reason is false: a hinge joint allows movement in one plane only — option (a).',
  d: 2, c: 'analysis', t: [3],
}));
add('knee-tf', tf({
  stem: 'The joints at the elbow and at the knee are both ball and socket joints.',
  key: 'f',
  sol: 'False. The elbow and the knee are hinge joints.',
  d: 1, c: 'recall', t: [3],
}));
add('skulljoint-tf', tf({
  stem: 'The joints between the bones of the skull allow a slight movement.',
  key: 'f',
  sol: 'False. They are immovable.',
  d: 1, c: 'recall', t: [3],
}));
add('term-joint', term({
  stem: 'Give the biological term: a place where two or more bones meet.',
  model: '**Joint.**', sol: 'Joint.', sch: 'Joint',
  d: 1, c: 'recall', t: [3],
}));
add('odd-joint', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: Hinge, Pivot, Suture, Gliding.',
  model: '**Suture**; the others are **types of freely movable joints**.', sol: 'A suture is an immovable joint.', sch: 'Odd one and category',
  d: 3, c: 'analysis', t: [3],
}));
add('reason-disc', term({
  stem: 'Give reason: the backbone can bend and twist although each joint between two vertebrae moves only a little.',
  model: 'There are many (**twenty-four**) movable vertebrae, so the **small movements add up**.', sol: 'Many small movements add up.', sch: 'Many joints',
  d: 3, c: 'application', t: [3],
}));
add('term-synovial', term({
  stem: 'Give the biological term: the fluid that lubricates a freely movable joint.',
  model: '**Synovial fluid.**', sol: 'Synovial fluid.', sch: 'Synovial fluid',
  d: 1, c: 'recall', t: [3],
}));
add('suture-short', short({
  marks: 2,
  stem: 'Name the kind of joint found between the bones of the skull and state its use.',
  model: 'The skull bones are held by **immovable (fixed) joints**. They keep the skull a **rigid box** that protects the brain.',
  sol: 'Immovable; keeps the skull rigid to protect the brain.',
  scheme: [['Immovable joint', 1], ['Keeps skull rigid to protect the brain', 1]],
  d: 1, c: 'understanding', t: [3],
}));
add('slight-short', short({
  marks: 2,
  stem: 'Name the kind of joint between two vertebrae and state one advantage of such a joint.',
  model: 'A **slightly movable joint**, in which the bones are joined by a pad of cartilage. It lets the backbone **bend a little** and the pad **absorbs shocks** when we walk or jump.',
  sol: 'Slightly movable; flexibility or shock absorption.',
  scheme: [['Slightly movable', 1], ['One advantage', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('pivot-short', short({
  marks: 2,
  stem: 'Name the joint that lets you shake your head to say no, and name the two bones that form it.',
  model: 'A **pivot joint**, formed by the **atlas** (first vertebra), which turns on the **axis** (second vertebra).',
  sol: 'Pivot joint; atlas and axis.',
  scheme: [['Pivot joint', 1], ['Atlas and axis', 1]],
  d: 2, c: 'recall', t: [3],
}));
add('synovial-short', short({
  marks: 2,
  stem: 'State two features of a freely movable joint that make it smooth and strong.',
  model: '**Cartilage** and **synovial fluid** make the bone ends smooth and reduce friction. **Ligaments** hold the bones together.',
  sol: 'Cartilage and synovial fluid; ligaments.',
  scheme: [['Cartilage or synovial fluid for smoothness', 1], ['Ligaments for strength', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('ballhinge-table3', short({
  marks: 3,
  stem: 'Tabulate three differences between a ball and socket joint and a hinge joint.',
  model: '| Ball and socket joint | Hinge joint |\n|---|---|\n| Movement in **all directions** and rotation | Movement in **one plane** only |\n| A rounded end fits into a **cup** | Bones joined by a **pin-like** arrangement, like a door |\n| **Shoulder, hip** | **Elbow, knee** |',
  sol: 'Movement; structure; location.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('three-joints-short3', short({
  marks: 3,
  stem: 'Name the three kinds of joint classified by the amount of movement and give one place in the body where each is found.',
  model: '**Immovable** joints allow no movement and are found between the bones of the skull. **Slightly movable** joints allow a small movement and are found between the vertebrae. **Freely movable** joints allow a wide range of movement and are found at the shoulder, elbow, hip or knee.',
  sol: 'Immovable: skull; slightly movable: vertebrae; freely movable: shoulder or knee.',
  scheme: [['Immovable with skull', 1], ['Slightly movable with vertebrae', 1], ['Freely movable with an example', 1]],
  d: 2, c: 'recall', t: [3],
}));
add('glidepiv-short3', short({
  marks: 3,
  stem: 'Compare a pivot joint and a gliding joint in respect of (i) movement, (ii) an example and (iii) one bone or set of bones involved.',
  model: '(i) A **pivot joint** allows **rotation** of one bone round another; a **gliding joint** allows small **sliding** movements. (ii) Pivot: the **neck**; gliding: the **wrist** or **ankle**. (iii) Pivot: the **atlas and axis**; gliding: the **carpals** (or tarsals).',
  sol: 'Rotation or sliding; neck or wrist; atlas and axis or carpals.',
  scheme: [['Movement of each', 1], ['An example of each', 1], ['Bones involved', 1]],
  d: 3, c: 'analysis', t: [3],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('func-long', long({
  marks: 10, wl: null,
  stem: 'A hospital has X-ray films of a skull, a rib cage and a backbone.\n\n(a) Name the organ that each of these three structures protects. [3]\n\n(b) State two other functions of the skeleton, with an example of each. [2]\n\n(c) A child has a low number of red blood cells. Name the soft tissue in the bones that makes them and state the two minerals that the bones store. [2]\n\n(d) Draw a neat, labelled diagram of the rib cage with the sternum and the vertebral column, naming four parts. [3]',
  model: '**(a)** The skull protects the **brain**; the rib cage protects the **heart and lungs**; the backbone protects the **spinal cord**.\n\n**(b)** Any two: **support** (holds the body upright and gives it shape); **movement** (muscles pull on the bones, which act as levers); **attachment of muscles**.\n\n**(c)** **Red bone marrow** makes blood cells; bones store **calcium** and **phosphorus**.\n\n**(d)** A **sternum** in the middle, **ribs** curving round from the **thoracic vertebrae** of the **vertebral column**; four labels.',
  sol: 'Brain; heart and lungs; spinal cord; two other functions; red bone marrow, calcium and phosphorus; labelled rib cage.',
  scheme: [['Brain', 1], ['Heart and lungs', 1], ['Spinal cord', 1], ['First other function', 1], ['Second other function', 1], ['Red bone marrow', 1], ['Calcium and phosphorus', 1], ['Rib cage drawn', 1], ['Four labels', 2]],
  d: 2, c: 'application', t: [1],
}));
add('axial-long', long({
  marks: 10, wl: null,
  stem: `Study the diagram of the human skeleton. Parts are lettered A to E.\n\n(a) Name the parts A, B and C. [3]\n\n(b) Classify the parts D and E as axial or appendicular, and name D. [2]\n\n(c) Each upper limb has ${UPPER_LIMB} bones. Calculate the bones in both upper limbs, and the phalanges in both hands if each hand has ${PHALANGES_HAND}. [2]\n\n(d) Draw a neat, labelled diagram of the bones of one lower limb, naming four bones. [3]`,
  model: `**(a)** A is the **skull**, B is the **rib cage** (ribs) and C is the **vertebral column**.\n\n**(b)** D is the **pelvic girdle** (hip bones) and E is the **femur**; **both are appendicular**.\n\n**(c)** 2 × ${UPPER_LIMB} = **${BOTH_ARMS}** bones; 2 × ${PHALANGES_HAND} = **${BOTH_HANDS}** phalanges.\n\n**(d)** The **femur**, then the **patella** at the knee, the **tibia** and **fibula** side by side and the **bones of the foot**; four labels.`,
  sol: `Skull, ribs, vertebral column; pelvic girdle, femur, appendicular; ${BOTH_ARMS} and ${BOTH_HANDS}; labelled lower limb.`,
  scheme: [['A skull', 1], ['B ribs', 1], ['C vertebral column', 1], ['D pelvic girdle', 1], ['D and E appendicular', 1], [`${BOTH_ARMS} bones`, 1], [`${BOTH_HANDS} phalanges`, 1], ['Lower limb drawn', 1], ['Four labels', 2]],
  d: 3, c: 'application', t: [2],
  assets: [skelFig],
}), () => BOTH_ARMS === 60 && BOTH_HANDS === 28 || 'counts');
add('column-long', long({
  marks: 10, wl: null,
  stem: `Study the diagram of the vertebral column. Regions are lettered A to E.\n\n(a) Name the regions A, B and C and state the number of vertebrae in each. [3]\n\n(b) Name the parts D and E and explain why each is a single bone in an adult. [2]\n\n(c) A child has ${VERT_CHILD} vertebrae. State the number of bones in the adult column and show how the number falls. [2]\n\n(d) Draw a neat, labelled diagram of the rib cage with the sternum, naming four parts. [3]`,
  model: `**(a)** A is the **cervical** region (**${VERT.cervical}**), B the **thoracic** (**${VERT.thoracic}**) and C the **lumbar** (**${VERT.lumbar}**).\n\n**(b)** D is the **sacrum** and E the **coccyx**; each is formed by **fused vertebrae** (five and four).\n\n**(c)** The adult column has **${COLUMN_ADULT}** bones: ${MOVABLE_V} separate vertebrae + 1 sacrum + 1 coccyx, because ${VERT.sacral + VERT.coccygeal} vertebrae fuse into two bones.\n\n**(d)** A **sternum** in the middle with **ribs** curving round from the back; the **true ribs** joined to the sternum and the **floating ribs** free; four labels.`,
  sol: `Cervical 7, thoracic 12, lumbar 5; sacrum and coccyx fused; ${COLUMN_ADULT} bones; labelled rib cage.`,
  scheme: [['A cervical 7', 1], ['B thoracic 12', 1], ['C lumbar 5', 1], ['D sacrum, E coccyx', 1], ['Fused vertebrae', 1], [`${COLUMN_ADULT} bones`, 1], ['Working shown', 1], ['Rib cage drawn', 1], ['Four labels', 2]],
  d: 3, c: 'application', t: [2],
  assets: [colFig],
}), () => COLUMN_ADULT === 26 || 'column');
add('joint-long', long({
  marks: 10, wl: null,
  stem: 'Study the diagram of four freely movable joints. They are lettered A to D.\n\n(a) Name the joints A, B and C. [3]\n\n(b) Give one place in the body where each of A and B is found. [2]\n\n(c) State the movement allowed by C and by D. [2]\n\n(d) Draw a neat, labelled diagram of the joint A, naming three parts. [3]',
  model: '**(a)** A is a **ball and socket** joint, B a **hinge** joint and C a **pivot** joint.\n\n**(b)** A: the **shoulder** or **hip**; B: the **elbow** or **knee**.\n\n**(c)** C allows **rotation** of one bone round another; D (a gliding joint) allows small **sliding** movements.\n\n**(d)** A **rounded head** of one bone fitting into the **cup (socket)** of the other, with **cartilage**, **synovial fluid** or **ligaments** shown; three labels.',
  sol: 'Ball and socket, hinge, pivot; shoulder and elbow; rotation and sliding; labelled joint.',
  scheme: [['A ball and socket', 1], ['B hinge', 1], ['C pivot', 1], ['Place for A', 1], ['Place for B', 1], ['Movement of C', 1], ['Movement of D', 1], ['Joint drawn', 1], ['Three labels', 2]],
  d: 2, c: 'application', t: [3],
  assets: [jointFig],
}));
add('casejoint-long', long({
  marks: 10, wl: null,
  stem: 'A gymnast swings her arm round in a full circle, bends her knee and turns her head to look behind her.\n\n(a) Name the joint at the shoulder and the kind of movement that makes the full circle possible. [2]\n\n(b) Name the joint at the knee and state how its movement differs from that at the shoulder. [2]\n\n(c) Name the joint that turns the head and the two bones that form it. [2]\n\n(d) Draw a neat, labelled diagram of the joint at her knee, naming four parts. [4]',
  model: '**(a)** A **ball and socket** joint; it moves in **all directions** and can **rotate**.\n\n**(b)** A **hinge** joint; it moves in **one plane only** (back and forth), not in all directions.\n\n**(c)** A **pivot** joint between the **atlas** and the **axis**.\n\n**(d)** The **femur** and **tibia** meeting at the knee with **cartilage** on the bone ends, **synovial fluid** in a capsule and **ligaments**; the **direction of movement** shown by an arrow; four labels.',
  sol: 'Ball and socket, all directions; hinge, one plane; pivot, atlas and axis; labelled hinge joint.',
  scheme: [['Ball and socket', 1], ['All directions and rotation', 1], ['Hinge', 1], ['One plane only', 1], ['Pivot', 1], ['Atlas and axis', 1], ['Hinge joint drawn', 2], ['Four labels', 2]],
  d: 3, c: 'application', t: [3],
}));
add('design-long', long({
  marks: 10, wl: null,
  stem: 'A robot designer builds a model arm with hinge joints at the shoulder, elbow and wrist and claims that it can move exactly like a human arm.\n\n(a) Name the kind of joint found in a human shoulder and in a human wrist. [2]\n\n(b) State one movement that a human can make at the shoulder which the hinge joint of the model cannot. [2]\n\n(c) Suggest which kind of joint the designer should use at the shoulder and give a reason. [2]\n\n(d) Draw a neat, labelled diagram of the bones of one human upper limb, naming four bones. [4]',
  model: '**(a)** The shoulder is a **ball and socket** joint; the wrist has **gliding** joints.\n\n**(b)** A hinge moves in one plane only. A human can **swing the arm in a full circle** or **rotate it** at the shoulder, in **all directions**, which a hinge cannot do.\n\n**(c)** A **ball and socket** joint, because it allows movement in **all directions** and rotation, as in the human shoulder.\n\n**(d)** **Humerus**, then **radius and ulna** side by side, then **carpals, metacarpals and phalanges** of the hand; four labels.',
  sol: 'Ball and socket; gliding; rotation in all directions; ball and socket at the shoulder; labelled arm bones.',
  scheme: [['Shoulder ball and socket', 1], ['Wrist gliding', 1], ['A movement in all directions', 1], ['A hinge works in one plane only', 1], ['Ball and socket suggested', 1], ['Reason', 1], ['Upper limb drawn', 2], ['Four labels', 2]],
  d: 4, c: 'evaluation', t: [3],
}));
