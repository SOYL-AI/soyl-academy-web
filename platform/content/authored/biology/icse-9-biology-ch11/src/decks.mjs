// ICSE 9 Biology ch11 Skeleton: Movement and Locomotion — Part 1 (t01–t02), Part 2 (t03).
import { sl, deck, table, flow, svgV } from '../../icse-9-biology-ch01/src/lib.mjs';
import { SKELETON, JOINTS, COLUMN } from './svgs.mjs';
import { SKULL, CRANIAL, FACIAL, VERT, MOVABLE_V, VERT_CHILD, COLUMN_ADULT, RIBS, HYOID, OSSICLES, AXIAL, UPPER_LIMB, LOWER_LIMB, PECTORAL, APPENDICULAR, TOTAL, JOINT_LIST, N_FREE, N_FIXED, N_SLIGHT, N_BALL, N_HINGE } from './calc.mjs';

export const V = {
  skeleton: svgV(SKELETON, 'The human skeleton from the front with the axial skeleton in blue and the appendicular skeleton in green'),
  joints: svgV(JOINTS, 'Four freely movable joints: ball and socket, hinge, pivot and gliding, with movement arrows'),
  column: svgV(COLUMN, 'The vertebral column in five regions with the number of vertebrae in each'),
};

export const deck1 = deck({
  part: 1,
  title: 'Skeleton: Movement and Locomotion — Part 1: Functions of the skeleton, axial and appendicular parts',
  goals: [
    'List the functions of the human skeleton',
    'Name the parts of the axial and the appendicular skeleton',
    'Classify named bones as axial or appendicular',
  ],
  slides: [
    sl('title', 'The Human Skeleton', {
      b: 'Part 1 — what the bones do, and how the skeleton is organised.',
      v: flow('LR', [['b', 'Bones joined together'], ['s', 'Skeleton'], ['f', 'Support, protection and movement']], [['b', 's'], ['s', 'f']], 'Flow from bones joined together to the skeleton and its functions'),
      n: 'Without a skeleton your body would be a soft heap. Your bones are joined together to form a framework that holds you up, guards soft organs and lets you move. In this part we look at what the skeleton does and how it is organised.',
    }),
    sl('concept', 'Functions of the skeleton', {
      v: table(['Function', 'Example'], [['Support and shape', 'Gives the body its upright shape and holds it up'], ['Protection', 'Skull guards the brain; ribs guard the heart and lungs; vertebral column guards the spinal cord'], ['Movement', 'Muscles pull on bones, which act as levers'], ['Attachment of muscles', 'Bones give firm places for muscles to attach'], ['Making blood cells', 'Red bone marrow makes red and white blood cells'], ['Storing minerals', 'Bones store calcium and phosphorus']], 'Table of six functions of the human skeleton with examples'),
      n: 'The skeleton supports the body and gives it shape. It protects soft organs. It allows movement because muscles pull on bones. The red bone marrow makes blood cells, and the bones store calcium and phosphorus.',
    }),
    sl('concept', 'Who guards what', {
      v: table(['Bones', 'Protect'], [['Skull (cranium)', 'Brain'], ['Rib cage with sternum', 'Heart and lungs'], ['Vertebral column', 'Spinal cord']], 'Table of the bones that protect the brain, the heart and lungs, and the spinal cord'),
      b: 'The **cranium** is a rigid box; the **ribs** form a cage; the **vertebrae** form a canal around the cord.',
      n: 'Three groups of bones act as armour. The skull is a hard box around the brain. The ribs and breastbone form a cage around the heart and lungs. The vertebrae are stacked to form a tunnel that guards the spinal cord.',
    }),
    sl('check', 'Quick check: protecting the brain', {
      b: 'The brain is protected by the',
      chk: 'chk-protect',
      n: 'Think of the bony box in the head.',
    }),
    sl('diagram', 'Axial and appendicular skeleton', {
      b: 'The **axial** skeleton forms the main axis of the body; the **appendicular** skeleton forms the limbs and their girdles.',
      v: V.skeleton,
      n: 'The skeleton is divided into two parts. The axial skeleton lies along the middle line of the body and has the skull, the vertebral column, the ribs and the breastbone. The appendicular skeleton has the limb bones and the girdles that join them to the axis.',
    }),
    sl('concept', 'The axial skeleton', {
      v: table(['Part', 'Bones', 'Number'], [['Skull', `Cranium ${CRANIAL} + face ${FACIAL}`, String(SKULL)], ['Vertebral column', 'Neck, chest, lower back, sacrum, coccyx', `${VERT_CHILD} in a child; ${COLUMN_ADULT} in an adult`], ['Ribs', '12 pairs', String(RIBS)], ['Sternum', 'Breastbone', '1'], ['Small bones', 'Hyoid (1) and ear bones (6)', String(HYOID + OSSICLES)]], 'Table of the parts of the axial skeleton and the number of bones in each'),
      n: 'The axial skeleton has the skull, made of cranial and facial bones. It has the vertebral column, twelve pairs of ribs and the sternum. Many books also count the hyoid bone and the small bones of the ears. Together they make about eighty bones in an adult.',
    }),
    sl('diagram', 'The vertebral column', {
      b: `${VERT.cervical} + ${VERT.thoracic} + ${VERT.lumbar} movable vertebrae, then the **sacrum** and the **coccyx**, where vertebrae have fused.`,
      v: V.column,
      n: 'The vertebral column has five regions. Seven cervical vertebrae are in the neck, twelve thoracic vertebrae carry the ribs, and five lumbar vertebrae are in the lower back. Then come the sacrum and the coccyx, each formed by vertebrae that fuse together as a child grows.',
    }),
    sl('check', 'Quick check: an axial bone', {
      b: 'Which of these bones belongs to the axial skeleton?',
      chk: 'chk-axial',
      n: 'It lies in the middle of the chest.',
    }),
    sl('example', 'Worked example 1: counting the axial skeleton', {
      b: 'Find the number of bones in the axial skeleton of an adult from its parts.',
      ul: [`Step 1: skull ${CRANIAL} + ${FACIAL} = **${SKULL}**; hyoid **${HYOID}**; ear bones 3 × 2 = **${OSSICLES}**.`, `Step 2: vertebral column ${MOVABLE_V} movable + 1 sacrum + 1 coccyx = **${COLUMN_ADULT}**; sternum **1**; ribs 12 × 2 = **${RIBS}**.`, `Step 3: total = ${SKULL} + ${HYOID} + ${OSSICLES} + ${COLUMN_ADULT} + 1 + ${RIBS} = **${AXIAL}**.`],
      v: table(['Part', 'Bones'], [['Skull', String(SKULL)], ['Hyoid', String(HYOID)], ['Ear bones', String(OSSICLES)], ['Vertebral column', String(COLUMN_ADULT)], ['Sternum', '1'], ['Ribs', String(RIBS)], ['Axial skeleton', String(AXIAL)]], 'Worked table adding twenty-two, one, six, twenty-six, one and twenty-four to give eighty'),
      n: 'Add the parts one by one. The skull has twenty-two bones, the hyoid one, the ear bones six, the vertebral column twenty-six, the sternum one and the ribs twenty-four. The total is eighty bones.',
    }),
    sl('concept', 'The appendicular skeleton', {
      v: table(['Part', 'Bones', 'Number'], [['Pectoral girdle (shoulder)', 'Clavicle and scapula, on each side', String(PECTORAL)], ['Upper limbs', 'Humerus, radius, ulna, carpals, metacarpals, phalanges', `${UPPER_LIMB} in each`], ['Pelvic girdle (hip)', 'Two hip bones', '2'], ['Lower limbs', 'Femur, patella, tibia, fibula, tarsals, metatarsals, phalanges', `${LOWER_LIMB} in each`]], 'Table of the parts of the appendicular skeleton and the number of bones in each'),
      n: 'The appendicular skeleton has two girdles and four limbs. The pectoral girdle at the shoulder has a clavicle and a scapula on each side. The pelvic girdle has two hip bones. Each upper limb and each lower limb has thirty bones.',
    }),
    sl('example', 'Worked example 2: counting the appendicular skeleton', {
      b: 'Add the bones of the girdles and the four limbs, and then find the bones in the whole adult skeleton.',
      ul: [`Step 1: pectoral girdle = 2 + 2 = **${PECTORAL}**; pelvic girdle = **2**.`, `Step 2: limbs = 2 × ${UPPER_LIMB} + 2 × ${LOWER_LIMB} = **${2 * UPPER_LIMB + 2 * LOWER_LIMB}**.`, `Step 3: appendicular = ${PECTORAL} + 2 + ${2 * UPPER_LIMB + 2 * LOWER_LIMB} = **${APPENDICULAR}**; whole skeleton = ${AXIAL} + ${APPENDICULAR} = **${TOTAL}**.`],
      v: table(['Part', 'Bones'], [['Pectoral girdle', String(PECTORAL)], ['Pelvic girdle', '2'], ['Four limbs', String(2 * UPPER_LIMB + 2 * LOWER_LIMB)], ['Appendicular skeleton', String(APPENDICULAR)], ['Axial skeleton', String(AXIAL)], ['Whole skeleton', String(TOTAL)]], 'Worked table giving one hundred twenty-six appendicular bones and two hundred six in all'),
      n: 'The girdles have six bones, and the four limbs have one hundred twenty. That is one hundred twenty-six bones in the appendicular skeleton. Add the eighty bones of the axial skeleton and an adult has two hundred six bones.',
    }),
    sl('check', 'Quick check: a limb bone', {
      b: 'The humerus belongs to the',
      chk: 'chk-limb',
      n: 'Think of the arm.',
    }),
    sl('example', 'Worked example 3: sorting named bones', {
      b: 'Classify each bone as axial or appendicular: skull, humerus, sternum, femur, scapula, rib, vertebra, hip bone.',
      ul: ['Step 1: bones on the **middle line** or in the **head and trunk case** are axial.', 'Step 2: bones of the **limbs** and the **girdles** that carry them are appendicular.', 'Step 3: sort the list using these two rules.'],
      v: table(['Axial', 'Appendicular'], [['Skull', 'Humerus'], ['Sternum', 'Femur'], ['Rib', 'Scapula'], ['Vertebra', 'Hip bone']], 'Worked table sorting eight bones into four axial and four appendicular'),
      n: 'Use two rules. Bones of the head, the chest and the backbone are axial. Bones of the limbs, and the shoulder and hip girdles that hold them, are appendicular. So the skull, sternum, rib and vertebra are axial, and the other four are appendicular.',
    }),
    sl('summary', 'Summary', {
      ul: ['The skeleton supports, protects, helps movement, makes blood cells and stores minerals.', 'Axial: skull, vertebral column, ribs, sternum.', 'Appendicular: pectoral girdle, pelvic girdle and the limb bones.'],
      v: table(['Axial', 'Appendicular'], [['Skull, vertebral column, ribs, sternum', 'Girdles and the bones of the limbs']], 'Summary table of the axial and appendicular skeleton'),
      n: 'To recap. The skeleton has six main jobs: support, protection, movement, muscle attachment, making blood cells and storing minerals. The axial skeleton is the skull, backbone, ribs and sternum. The appendicular skeleton is the girdles and limbs.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Give functions as **short separate points**, with an example of each.', 'Say that the **skull protects the brain**, the **rib cage the heart and lungs**, the **vertebral column the spinal cord**.', '**Girdles belong to the appendicular skeleton**, not to the axial one.', 'In a labelled sketch, name the **clavicle, scapula, humerus** and **femur** correctly.'],
      n: 'Exam tips. Write the functions as short separate points with an example. Match each protective bone with the organ it guards. Remember that the girdles belong to the appendicular skeleton. And spell the limb bones correctly in a labelled sketch.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Skeleton: Movement and Locomotion — Part 2: Joints',
  goals: [
    'Classify joints as immovable, slightly movable and freely movable, with locations',
    'Compare hinge, ball and socket, gliding and pivot joints',
    'Name the joint used in a given movement',
  ],
  slides: [
    sl('title', 'Joints', {
      b: 'Part 2 — where bones meet and how that decides how we move.',
      v: flow('LR', [['b', 'Two bones meet'], ['j', 'Joint'], ['m', 'Type of movement']], [['b', 'j'], ['j', 'm']], 'Flow from two bones meeting to a joint and to the type of movement'),
      n: 'A joint is a place where two or more bones meet. The kind of joint decides how much the bones can move. Some joints do not move at all, some move a little, and some move freely in different ways.',
    }),
    sl('concept', 'Three kinds of joints', {
      v: table(['Kind', 'Movement', 'Where found'], [['Immovable (fixed)', 'None', 'Between the bones of the skull'], ['Slightly movable', 'A little', 'Between the vertebrae; the pubic joint of the pelvis'], ['Freely movable', 'Wide range', 'Shoulder, elbow, hip, knee, wrist, ankle, neck']], 'Table of the three kinds of joints with their movement and where each is found'),
      n: 'Joints are grouped into three kinds. Immovable joints, such as those between skull bones, do not move. Slightly movable joints, such as those between the vertebrae, move a little. Freely movable joints, such as the shoulder and knee, move through a wide range.',
    }),
    sl('concept', 'Immovable joints', {
      v: table(['Feature', 'Detail'], [['Where', 'Between the bones of the cranium (and the face)'], ['Movement', 'None; the edges of the bones interlock'], ['Use', 'Keeps the skull a strong, rigid box that protects the brain']], 'Table giving the location, movement and use of immovable joints'),
      n: 'The bones of the skull are held together by joints that cannot move. The edges of the bones interlock like pieces of a jigsaw. This keeps the skull a rigid box, which is just what is needed to protect the brain.',
    }),
    sl('check', 'Quick check: joints of the skull', {
      b: 'The joints between the bones of the cranium are',
      chk: 'chk-sutures',
      n: 'Think of what the skull has to do.',
    }),
    sl('concept', 'Slightly movable joints', {
      v: table(['Feature', 'Detail'], [['Where', 'Between neighbouring vertebrae; the front of the pelvis'], ['Movement', 'A little; the bones are joined by pads of cartilage'], ['Use', 'Lets the backbone bend and twist a little, and absorbs shocks']], 'Table giving the location, movement and use of slightly movable joints'),
      n: 'Between two vertebrae lies a pad of cartilage. It lets each vertebra move only a little. But with twenty-four movable vertebrae together, the backbone can bend and twist, and the pads also soften the shock of walking and jumping.',
    }),
    sl('concept', 'Freely movable joints', {
      v: table(['Part', 'Job'], [['Cartilage on bone ends', 'Smooth surface that reduces friction'], ['Synovial fluid', 'Oily fluid that lubricates the joint'], ['Ligaments', 'Strong bands that hold the bones together']], 'Table of three parts common to freely movable joints and the job of each'),
      b: 'Most freely movable joints are enclosed in a capsule containing **synovial fluid**.',
      n: 'Freely movable joints have smooth cartilage on the bone ends and a lubricating fluid inside a capsule. Strong bands called ligaments hold the bones together. There are four main kinds: ball and socket, hinge, gliding and pivot.',
    }),
    sl('diagram', 'Four freely movable joints', {
      b: 'The shape of the joint decides the movement.',
      v: V.joints,
      n: 'In a ball and socket joint, a rounded end fits into a cup, so the bone can move in all directions. A hinge joint swings in one plane only, like a door. In a pivot joint, one bone turns around another. In a gliding joint, flat surfaces slide over each other.',
    }),
    sl('concept', 'Four joints compared', {
      v: table(['Joint', 'Movement', 'Location'], [['Ball and socket', 'In all directions, and rotation', 'Shoulder, hip'], ['Hinge', 'Back and forth in one plane', 'Elbow, knee, finger joints'], ['Pivot', 'Rotation of one bone round another', 'Atlas on axis (turning the head)'], ['Gliding', 'Small sliding movements', 'Wrist, ankle']], 'Table comparing ball and socket, hinge, pivot and gliding joints by movement and location'),
      n: 'The shoulder and the hip are ball and socket joints and allow the widest movement. The elbow and knee are hinge joints and bend in one plane. The joint between the first two neck bones is a pivot. The wrist and ankle have gliding joints.',
    }),
    sl('check', 'Quick check: the hinge joint', {
      b: 'A joint that moves back and forth like a door on its hinges is found at the',
      chk: 'chk-hinge',
      n: 'Think of bending the arm.',
    }),
    sl('example', 'Worked example 1: which joint does the action?', {
      b: 'Name the joint that allows each action: swinging the arm in a full circle, bending the knee, shaking the head to say no, and sliding the wrist bones when you write.',
      ul: ['Step 1: a full circle needs movement in **all directions**: **ball and socket**, at the shoulder.', 'Step 2: bending in one plane is a **hinge**, at the knee.', 'Step 3: turning the head is **rotation** of one bone on another: **pivot**, between the atlas and axis.', 'Step 4: small slides are **gliding**, at the wrist.'],
      v: table(['Action', 'Joint'], [['Swing the arm in a circle', 'Ball and socket'], ['Bend the knee', 'Hinge'], ['Shake the head for no', 'Pivot'], ['Slide the wrist bones', 'Gliding']], 'Worked table matching four actions with ball and socket, hinge, pivot and gliding joints'),
      n: 'Ask what kind of movement the action needs. A full circle needs all directions, so ball and socket. Bending one way and back is a hinge. Turning is a pivot. Tiny slides are a gliding joint.',
    }),
    sl('example', 'Worked example 2: sorting a list of joints', {
      b: `A student lists eight joints. Count how many are immovable, slightly movable and freely movable, and how many of the freely movable ones are hinge or ball and socket.`,
      ul: [`Step 1: the suture between skull bones is **immovable** (${N_FIXED}); the joint between two vertebrae is **slightly movable** (${N_SLIGHT}).`, `Step 2: the other six are **freely movable** (${N_FREE}).`, `Step 3: shoulder and hip are **ball and socket** (${N_BALL}); elbow and knee are **hinge** (${N_HINGE}); the wrist and the atlas-axis joint are the other two.`],
      v: table(['Joint', 'Kind'], JOINT_LIST.map((j) => [j.name, j.cls === 'fixed' ? 'Immovable' : j.cls === 'slight' ? 'Slightly movable' : `Freely movable: ${j.kind}`]), 'Worked table of eight joints with their kind'),
      n: 'Sort the list. The skull suture does not move and the joint between vertebrae moves a little. The other six are freely movable. Of those, two are ball and socket, two are hinge, and one each are gliding and pivot.',
    }),
    sl('check', 'Quick check: turning the head', {
      b: 'Turning the head to say no happens mainly at a',
      chk: 'chk-pivot',
      n: 'One bone turns round the peg of another.',
    }),
    sl('concept', 'Why have different kinds of joints?', {
      v: table(['Joint', 'Advantage'], [['Immovable', 'Strong and rigid; protects organs'], ['Slightly movable', 'Flexible and shock absorbing'], ['Freely movable', 'Allows the movements needed for locomotion and work']], 'Table giving the advantage of immovable, slightly movable and freely movable joints'),
      n: 'Each kind of joint suits a job. Immovable joints make a strong box for the brain. Slightly movable joints make the backbone flexible and absorb shocks. Freely movable joints let us walk, run, throw and write.',
    }),
    sl('summary', 'Summary', {
      ul: ['Three kinds: immovable (skull), slightly movable (vertebrae) and freely movable.', 'Freely movable: ball and socket (shoulder, hip), hinge (elbow, knee), pivot (atlas on axis), gliding (wrist, ankle).', 'Cartilage, synovial fluid and ligaments make freely movable joints smooth and strong.'],
      v: table(['Joint', 'Example'], [['Ball and socket', 'Shoulder'], ['Hinge', 'Elbow'], ['Pivot', 'Neck'], ['Gliding', 'Wrist']], 'Summary table of four freely movable joints with an example of each'),
      n: 'To recap. Joints may be immovable, slightly movable or freely movable. The four freely movable kinds are ball and socket, hinge, pivot and gliding, and each has its own examples in the body.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Always give a **location** with the joint.', 'Describe the **movement** in a few words: **all directions**, **one plane**, **rotation**, **sliding**.', 'The **skull** joints are **immovable**; the joints between **vertebrae** are **slightly movable**.', 'Do not say the **knee** is a ball and socket joint: it is a **hinge**.'],
      n: 'Exam tips. Give a place for every joint. Describe the movement in a few words, such as all directions, one plane, rotation or sliding. Skull joints are immovable, and the joints between vertebrae move a little. The knee is a hinge, not a ball and socket.',
    }),
  ],
});
