// ISC 11 Biology ch19 Locomotion and Movement. Part 1: movement, muscle, contraction (t01, t02). Part 2: skeleton, joints, disorders (t03 to t05).
import { sl, deck, table, flow, svgV, r } from '../../isc-11-biology-ch01/src/lib.mjs';
import { SARCOMERE, FILAMENTS, TETANUS, SKELETON, JOINTS, SYNOVIAL } from './svgs.mjs';
import { GEO, REL, CON, B_REL, B_CON, SERIES, inSeries, fibreShortMm, shortenPct, interval, response, TWITCH, SKULL, SKULL_N, VERT, VERT_N, VERT_CHILD, SACRAL_FUSED, COCCYX_FUSED, RIB_N, AXIAL, AXIAL_N, APPEND, APPEND_N, TOTAL, HAND, FOOT, HAND_N, FOOT_N, HANDS_FEET, ARM_N, LEG_N } from './calc.mjs';

export const V = {
  sarcomere: svgV(SARCOMERE, 'A sarcomere drawn relaxed and contracted, with Z lines, I band, A band, H zone and M line'),
  filaments: svgV(FILAMENTS, 'A thin filament with actin, tropomyosin and troponin, and a myosin molecule with head and tail'),
  tetanus: svgV(TETANUS, 'Tension recordings showing a single twitch, summation and tetanus'),
  skeleton: svgV(SKELETON, 'Tree of the 206 bones of the adult skeleton: axial 80 and appendicular 126'),
  joints: svgV(JOINTS, 'Five types of synovial joint with an example of each'),
  synovial: svgV(SYNOVIAL, 'Section of a synovial joint with cartilage, cavity, membrane, capsule and ligament'),
};

// ---------------------------------------------------------------- computed numbers used on the slides
const FIB = { len: 4.2 };
export const N_SARC = inSeries(FIB.len, REL);
export const SHORT_MM = fibreShortMm(FIB.len, REL, CON);
export const SHORT_PCT = shortenPct(REL, CON);
const f = (x) => String(x);

export const deck1 = deck({
  part: 1,
  title: 'Locomotion and Movement, Part 1: Muscles and how they contract',
  goals: [
    'Distinguish ciliary, flagellar and muscular movement, and compare red and white muscle fibres',
    'Describe the organisation of skeletal muscle, draw and label a sarcomere, and name the contractile proteins',
    'Explain the sliding filament theory, the role of calcium and ATP, summation, tetanus and rigor mortis',
  ],
  slides: [
    sl('title', 'Movement and muscle', {
      b: 'Part 1: how cells and muscles move, and how a sarcomere shortens.',
      v: flow('LR', [['m', 'Movement'], ['c', 'Ciliary'], ['f', 'Flagellar'], ['u', 'Muscular']], [['m', 'c'], ['m', 'f'], ['m', 'u']], 'Movement divided into ciliary, flagellar and muscular movement'),
      n: 'Movement is a basic property of living things. Some cells move by tiny hairs or whips, but most of the movement we see in animals is made by muscles pulling on bones.',
    }),
    sl('concept', 'Types of movement', {
      b: 'All **locomotion** (moving from place to place) is movement, but not every movement is locomotion.',
      v: table(['Type', 'Carried out by', 'Human example'], [['Ciliary', 'Cilia beating together in one direction', 'Dust and mucus swept up the windpipe; ovum pushed along the oviduct'], ['Flagellar', 'A long whip-like flagellum', 'A sperm swimming; Euglena in a pond'], ['Muscular', 'Contraction of muscle fibres', 'Walking, chewing, heartbeat, gut movements']], 'Table of ciliary, flagellar and muscular movement'),
      n: 'Cilia are short and beat in waves like a field of grass in wind. A flagellum is long and drives the whole cell forward. Muscular movement is the most important for human locomotion.',
    }),
    sl('concept', 'Muscle: properties and kinds', {
      b: 'Muscle tissue has four general properties: **excitability** (responds to a stimulus), **contractility** (shortens), **extensibility** (can be stretched) and **elasticity** (returns to its length).',
      v: table(['Muscle', 'Striations', 'Control', 'Location'], [['Skeletal', 'Striated', 'Voluntary', 'Attached to bones'], ['Smooth (visceral)', 'Unstriated', 'Involuntary', 'Walls of hollow organs'], ['Cardiac', 'Striated, branched', 'Involuntary', 'Wall of the heart']], 'Table comparing skeletal, smooth and cardiac muscle'),
      n: 'Muscle can be stimulated, can shorten, can be stretched and then springs back. The three kinds differ in appearance, in control and in where they are found.',
    }),
    sl('concept', 'Red and white muscle fibres', {
      b: 'Skeletal muscle fibres differ in how they make ATP.',
      v: table(['Feature', 'Red fibres', 'White fibres'], [['Myoglobin', 'Plenty, so they look red', 'Little, so they look pale'], ['Mitochondria', 'Many', 'Few'], ['ATP source', 'Aerobic respiration', 'Anaerobic glycolysis, lactic acid'], ['Contraction', 'Slow, sustained, resist fatigue', 'Fast, powerful, tire quickly'], ['Example', 'Leg muscles of a hen; muscles of diving seals', 'Breast muscles of a hen']], 'Table comparing red and white muscle fibres'),
      n: 'Red fibres are packed with the oxygen-storing pigment myoglobin and with mitochondria, so they work for long periods. White fibres rely on a quick but short-lived supply of energy, so they give short bursts and tire.',
    }),
    sl('diagram', 'Organisation of a skeletal muscle', {
      b: 'A muscle is built from ever smaller parts. Each fibre is a long cell with many nuclei, covered by the **sarcolemma**, with cytoplasm called **sarcoplasm** and a store of calcium, the **sarcoplasmic reticulum**.',
      v: flow('LR', [['a', 'Muscle'], ['b', 'Bundles (fascicles)'], ['c', 'Muscle fibre (cell)'], ['d', 'Myofibrils'], ['e', 'Myofilaments: actin and myosin']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow from muscle to bundles, fibre, myofibrils and myofilaments'),
      n: 'A whole muscle contains bundles of fibres. Each fibre holds many myofibrils, and each myofibril is made of two kinds of protein filament, thin actin and thick myosin, lying side by side.',
    }),
    sl('diagram', 'The sarcomere', {
      b: 'A **sarcomere** lies between two **Z lines**. The **A band** (dark) is the length of the thick filaments; the **I band** (light) has only thin filaments and is cut by the Z line; the **H zone** is the middle of the A band with no thin filaments; the **M line** holds the thick filaments together.',
      v: V.sarcomere,
      n: 'The dark A band and the light I band give the muscle its striped look. When the sarcomere is relaxed, the thin filaments stop short of each other in the middle, leaving the H zone.',
    }),
    sl('diagram', 'Contractile proteins', {
      b: '**Thin filament:** two strands of **actin**, a thread of **tropomyosin** in the groove, and **troponin** at intervals. **Thick filament:** many **myosin** molecules; each has a tail and a double head whose **ATPase** site splits ATP and which binds actin.',
      v: V.filaments,
      n: 'Tropomyosin lies over the places on actin where myosin can bind, and troponin holds it there. The myosin head can attach to actin and also splits adenosine triphosphate to release energy.',
    }),
    sl('example', 'Worked example 1: bands of a sarcomere', {
      b: `In a model muscle, the A band is ${GEO.a} µm and each thin filament is ${GEO.thin} µm long. Find the total I band and the H zone when the sarcomere is ${REL} µm long, and again when it is ${CON} µm.`,
      ul: [
        r`Relaxed: I band $= ${REL} - ${GEO.a} = ${B_REL.i}\ \mu\text{m}$; each half $= ${B_REL.halfI}$. Thin filament inside the A band, each side $= ${GEO.thin} - ${B_REL.halfI} = ${B_REL.overlap}$. H zone $= ${GEO.a} - 2 \times ${B_REL.overlap} = ${B_REL.h}\ \mu\text{m}$.`,
        r`Contracted: I band $= ${CON} - ${GEO.a} = ${B_CON.i}$; overlap $= ${GEO.thin} - ${B_CON.halfI} = ${B_CON.overlap}$; H zone $= ${GEO.a} - 2 \times ${B_CON.overlap} = ${B_CON.h}\ \mu\text{m}$.`,
        `The A band stays ${GEO.a} µm; only the I band and H zone narrow.`,
      ],
      v: table(['State', 'Sarcomere (µm)', 'I band (µm)', 'H zone (µm)', 'A band (µm)'], [['Relaxed', f(REL), f(B_REL.i), f(B_REL.h), f(GEO.a)], ['Contracted', f(CON), f(B_CON.i), f(B_CON.h), f(GEO.a)]], `Worked table: H zone ${B_REL.h} falls to ${B_CON.h}, A band constant`),
      n: 'Subtract the A band from the sarcomere length to get the whole light band. Each thin filament then reaches further into the dark band as the light band shrinks, and the middle gap becomes narrower. The dark band does not change.',
    }),
    sl('check', 'Quick check: H zone', {
      b: 'Find the H zone at a given sarcomere length.',
      n: 'Quick check. Use the same method with a shorter sarcomere.',
      chk: 'hzone-num',
    }),
    sl('concept', 'Neuromuscular junction and calcium', {
      b: 'A motor neuron meets a fibre at the **motor end plate**. In a resting fibre, tropomyosin covers the myosin-binding sites on actin.',
      v: flow('TB', [['a', 'Nerve impulse reaches the motor end plate'], ['b', 'Acetylcholine released; action potential in the sarcolemma'], ['c', 'Sarcoplasmic reticulum releases calcium ions'], ['d', 'Calcium binds troponin; tropomyosin moves aside'], ['e', 'Myosin-binding sites on actin exposed']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow from nerve impulse to exposure of myosin-binding sites'),
      n: 'The nerve releases acetylcholine, which sets off an electrical signal along the muscle membrane. Calcium floods out of its store, binds troponin, and uncovers the sites on actin where myosin can grip.',
    }),
    sl('concept', 'Cross-bridge cycle and the sliding filaments', {
      b: 'Each myosin head repeats a four-step cycle, pulling the thin filaments towards the M line. This is the **sliding filament theory** of Huxley and Huxley.',
      v: flow('LR', [['a', 'Head with ADP and phosphate binds actin: cross bridge'], ['b', 'Power stroke: head bends, thin filament slides'], ['c', 'New ATP binds: head lets go'], ['d', 'ATP split: head recocked']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'a']], 'Cycle of attach, power stroke, detach and recock'),
      n: 'The myosin head attaches, bends and drags the thin filament inward, then a fresh molecule of adenosine triphosphate binds and the head lets go. Splitting that molecule resets the head, ready to attach again further along.',
    }),
    sl('check', 'Quick check: calcium', {
      b: 'Predict what happens when calcium binding to troponin is blocked.',
      n: 'Quick check. Think about what tropomyosin does when calcium is absent.',
      chk: 'nocalcium-mcq',
    }),
    sl('example', 'Worked example 2: shortening of a fibre', {
      b: `A muscle fibre ${FIB.len} cm long is made of sarcomeres of ${REL} µm joined end to end. When it contracts, every sarcomere shortens to ${CON} µm. How many sarcomeres are in the fibre, and by how much does it shorten?`,
      ul: [
        r`Length $= ${FIB.len} \times 10000 = ${FIB.len * 10000}\ \mu\text{m}$. Number $= \dfrac{${FIB.len * 10000}}{${REL}} = ${N_SARC}$.`,
        r`Each shortens by $${REL} - ${CON} = ${Math.round((REL - CON) * 10) / 10}\ \mu\text{m}$, so the fibre shortens by $${N_SARC} \times ${Math.round((REL - CON) * 10) / 10} = ${N_SARC * Math.round((REL - CON) * 10) / 10}\ \mu\text{m} = ${SHORT_MM}$ mm.`,
        `Each sarcomere shortens by ${SHORT_PCT} percent, so the fibre does too.`,
      ],
      v: table(['Quantity', 'Value'], [['Sarcomeres in series', f(N_SARC)], ['Shortening of one sarcomere (µm)', f(Math.round((REL - CON) * 10) / 10)], ['Shortening of the fibre (mm)', f(SHORT_MM)], ['Percentage shortening', f(SHORT_PCT)]], `Worked table: ${N_SARC} sarcomeres, ${SHORT_MM} millimetres`),
      n: 'Count the sarcomeres by dividing the fibre length by the length of one. Each one shortens by the same small amount, and because they are all in a line the tiny changes add up to a visible shortening.',
    }),
    sl('diagram', 'Twitch, summation and tetanus', {
      b: 'A single stimulus gives a **twitch**. If the next stimulus comes before relaxation is complete, the contractions add up: **summation**. At a very high rate the muscle stays smoothly contracted: **tetanus**.',
      v: V.tetanus,
      n: 'One stimulus gives one short twitch. If stimuli arrive before the muscle has relaxed, each twitch builds on the last and tension climbs. At a very high rate the twitches fuse into a steady, strong contraction called tetanus.',
    }),
    sl('concept', 'Stimulation rate and rigor mortis', {
      b: `In the model, a twitch lasts ${TWITCH.total} ms and its contraction phase ${TWITCH.rise} ms. The response depends on the interval between stimuli.`,
      v: table(['Stimuli per second', 'Interval (ms)', 'Response'], [5, 10, 25, 50].map((n) => [f(n), f(interval(n)), response(interval(n))]).concat([['None: ATP exhausted after death', '-', 'Rigor mortis: heads stay locked on actin']]), 'Table of stimulation rate, interval and response, with rigor mortis'),
      n: 'The faster the stimuli come, the less time the muscle has to relax. After death no new adenosine triphosphate is made, so myosin heads cannot let go of actin and the body becomes stiff. This is rigor mortis.',
    }),
    sl('check', 'Quick check: stimulation rate', {
      b: 'Work out the time between stimuli at a given rate.',
      n: 'Quick check. Divide one thousand milliseconds by the number of stimuli.',
      chk: 'interval-num',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Movement: ciliary, flagellar, muscular; muscle properties are excitability, contractility, extensibility, elasticity.',
        'Red fibres: myoglobin, mitochondria, aerobic, slow; white fibres: few mitochondria, glycolysis, fast, tire.',
        'Sarcomere: Z to Z; A band constant, I band and H zone narrow on contraction.',
        'Calcium binds troponin, tropomyosin moves, myosin heads cycle using ATP, thin filaments slide.',
        'Summation and tetanus come from rapid stimuli; rigor mortis is lack of ATP.',
      ],
      v: table(['Part', 'Change on contraction'], [['A band', 'None'], ['I band', 'Narrows'], ['H zone', 'Narrows or vanishes'], ['Z lines', 'Come closer']], 'Summary table of sarcomere changes'),
      n: 'To recap: muscle contraction is the sliding of thin filaments over thick ones. Calcium switches it on, adenosine triphosphate powers each cycle, and the dark band stays the same while the light band and the middle gap shrink.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Label a sarcomere with **Z line, A band, I band, H zone and M line**.',
        'State that the **A band does not change** during contraction.',
        'Name the proteins and their positions: **actin, tropomyosin, troponin, myosin**.',
        'Write the steps in order: impulse, acetylcholine, calcium, cross bridge, power stroke, ATP.',
      ],
      n: 'Exam tips. Label every band of the sarcomere. Remember that the dark band never changes length. Name each protein with its position. And give the steps of contraction in the right order.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Locomotion and Movement, Part 2: Skeleton, joints and disorders',
  goals: [
    'List the bones of the axial and appendicular skeleton with their numbers, and state the functions of the skeleton',
    'Classify joints as fibrous, cartilaginous or synovial and give an example of each synovial type',
    'State the cause and main symptom of myasthenia gravis, tetany, muscular dystrophy, arthritis, osteoporosis and gout',
  ],
  slides: [
    sl('title', 'The skeleton and its joints', {
      b: 'Part 2: bones, joints, and what goes wrong with them.',
      v: flow('LR', [['s', 'Skeleton'], ['a', 'Axial'], ['p', 'Appendicular'], ['j', 'Joints']], [['s', 'a'], ['s', 'p'], ['s', 'j']], 'Skeleton divided into axial and appendicular parts, with joints'),
      n: 'The skeleton gives the body its shape and works with muscles to produce movement. In this part we count the bones, classify the joints between them and study the commonest disorders.',
    }),
    sl('concept', 'Functions of the skeleton', {
      b: 'The skeleton does much more than hold us up.',
      v: table(['Function', 'Example'], [['Support', 'The vertebral column holds the trunk upright'], ['Protection', 'Skull guards the brain; rib cage guards heart and lungs'], ['Movement', 'Bones act as levers pulled by muscles'], ['Blood cell formation', 'Red bone marrow makes blood cells'], ['Storage', 'Calcium and phosphate; fat in yellow marrow']], 'Table of functions of the skeleton'),
      n: 'Bones support the body, protect delicate organs and act as levers for muscles. The red marrow makes blood cells, and the bone itself stores calcium and phosphate.',
    }),
    sl('diagram', 'The adult skeleton in numbers', {
      b: `The adult skeleton has **${TOTAL} bones**: the **axial skeleton** (${AXIAL_N}) forms the main axis of the body, and the **appendicular skeleton** (${APPEND_N}) includes the limbs and their girdles.`,
      v: V.skeleton,
      n: 'The axial skeleton is the skull, backbone, breastbone and ribs. The appendicular skeleton is the shoulder and hip girdles with the arms and legs. Together they make two hundred and six bones.',
    }),
    sl('concept', 'Skull and vertebral column', {
      b: `The skull has ${SKULL_N} bones in this count. The vertebral column has ${VERT_N} bones in an adult, because ${SACRAL_FUSED} sacral and ${COCCYX_FUSED} coccygeal vertebrae of a child fuse.`,
      v: table(['Part', 'Bones'], [['Cranium', f(SKULL.cranium)], ['Face', f(SKULL.face)], ['Hyoid', f(SKULL.hyoid)], ['Ear ossicles (malleus, incus, stapes in each ear)', f(SKULL.ossicles)], ['Cervical, thoracic, lumbar vertebrae', `${VERT.cervical}, ${VERT.thoracic}, ${VERT.lumbar}`], ['Sacrum and coccyx (fused)', `${VERT.sacrum} and ${VERT.coccyx}`]], 'Table of skull and vertebral column bones'),
      n: 'The skull is counted as cranium, face, the hyoid bone and the six tiny bones of the middle ears. In a child the lower end of the backbone has separate vertebrae, which later fuse into the sacrum and the coccyx.',
    }),
    sl('example', 'Worked example 1: bones of the hands and feet', {
      b: 'How many bones are there in both hands and both feet together? What fraction of the whole skeleton is this?',
      ul: [
        r`One hand: carpals ${HAND.carpals}, metacarpals ${HAND.metacarpals}, phalanges ${HAND.phalanges}: $${HAND.carpals} + ${HAND.metacarpals} + ${HAND.phalanges} = ${HAND_N}$.`,
        r`One foot: tarsals ${FOOT.tarsals}, metatarsals ${FOOT.metatarsals}, phalanges ${FOOT.phalanges}: $${FOOT.tarsals} + ${FOOT.metatarsals} + ${FOOT.phalanges} = ${FOOT_N}$.`,
        r`Both: $2 \times (${HAND_N} + ${FOOT_N}) = ${HANDS_FEET}$, a little over half of the ${TOTAL} bones.`,
      ],
      v: table(['Region', 'Bones each', 'Both sides'], [['Hand', f(HAND_N), f(2 * HAND_N)], ['Foot', f(FOOT_N), f(2 * FOOT_N)], ['Total', f(HAND_N + FOOT_N), f(HANDS_FEET)]], `Worked table: ${HANDS_FEET} bones in hands and feet`),
      n: 'Count the wrist, palm and finger bones of one hand, then the ankle, foot and toe bones of one foot, and double the total. More than half of all the bones of the body are in the hands and feet.',
    }),
    sl('check', 'Quick check: hyoid', {
      b: 'Name the bone that does not articulate with any other bone.',
      n: 'Quick check. It lies at the base of the tongue.',
      chk: 'hyoid-fill',
    }),
    sl('concept', 'Ribs, girdles and limbs', {
      b: `There are **${RIB_N} ribs** in twelve pairs: seven **true** pairs join the sternum directly, three **false** pairs join through the cartilage above, and two **floating** pairs are free in front. Each limb has ${ARM_N} bones in the arm and ${LEG_N} in the leg.`,
      v: table(['Region', 'Bones'], [['Pectoral girdle (clavicle and scapula, both sides)', f(APPEND.pectoral)], [`Upper limbs (humerus, radius, ulna, ${HAND.carpals} carpals, ${HAND.metacarpals} metacarpals, ${HAND.phalanges} phalanges, each)`, f(APPEND.upper)], ['Pelvic girdle (two hip bones)', f(APPEND.pelvic)], [`Lower limbs (femur, tibia, fibula, patella, ${FOOT.tarsals} tarsals, ${FOOT.metatarsals} metatarsals, ${FOOT.phalanges} phalanges, each)`, f(APPEND.lower)]], 'Table of the appendicular skeleton'),
      n: 'Each hip bone is formed by three fused bones. The kneecap, or patella, has no partner in the arm. The shoulder girdle is made of the collar bone and shoulder blade on each side.',
    }),
    sl('example', 'Worked example 2: adding up the skeleton', {
      b: 'Show that the axial and appendicular bones add up to the whole skeleton, and find how many vertebrae a young child has compared with an adult.',
      ul: [
        r`Axial $= ${AXIAL.skull} + ${AXIAL.vertebral} + ${AXIAL.sternum} + ${AXIAL.ribs} = ${AXIAL_N}$.`,
        r`Appendicular $= ${APPEND.pectoral} + ${APPEND.upper} + ${APPEND.pelvic} + ${APPEND.lower} = ${APPEND_N}$; total $= ${AXIAL_N} + ${APPEND_N} = ${TOTAL}$.`,
        r`Child: $${VERT.cervical} + ${VERT.thoracic} + ${VERT.lumbar} + ${SACRAL_FUSED} + ${COCCYX_FUSED} = ${VERT_CHILD}$ vertebrae; adult ${VERT_N}.`,
      ],
      v: table(['Division', 'Bones'], [['Axial', f(AXIAL_N)], ['Appendicular', f(APPEND_N)], ['Whole skeleton', f(TOTAL)], ['Vertebrae: child, adult', `${VERT_CHILD}, ${VERT_N}`]], `Worked table: ${AXIAL_N} plus ${APPEND_N} equals ${TOTAL}`),
      n: 'Add the four axial groups, then the four appendicular groups, and then the two totals. A child has more vertebrae than an adult because the lowest ones are separate until they fuse.',
    }),
    sl('check', 'Quick check: ribs', {
      b: 'Identify the type of rib from its attachment.',
      n: 'Quick check. Which ribs join the cartilage of the rib above?',
      chk: 'ribs-mcq',
    }),
    sl('concept', 'Classification of joints', {
      b: 'A **joint** is where two bones meet. Joints are classified by what lies between the bones.',
      v: table(['Class', 'Between the bones', 'Movement', 'Example'], [['Fibrous', 'Dense fibrous connective tissue', 'None (fixed)', 'Sutures of the skull'], ['Cartilaginous', 'Cartilage', 'Slight', 'Between vertebrae; pubic symphysis'], ['Synovial', 'Fluid-filled cavity', 'Free', 'Shoulder, hip, knee, elbow, wrist']], 'Table classifying joints as fibrous, cartilaginous and synovial'),
      n: 'In fibrous joints the bones are fused together by fibres and do not move. Cartilaginous joints allow a little movement. Synovial joints have a fluid-filled space and allow the greatest freedom.',
    }),
    sl('diagram', 'Types of synovial joint', {
      b: 'Synovial joints differ in the shape of the bone surfaces, and so in the movements they allow.',
      v: V.joints,
      n: 'A ball and socket joint moves in every direction. A hinge moves in one plane. A pivot allows turning. A gliding joint lets flat surfaces slide. A saddle joint allows movement at right angles, as at the base of the thumb.',
    }),
    sl('diagram', 'Structure of a synovial joint', {
      b: 'Smooth **articular cartilage** covers the bone ends; **synovial fluid** in the cavity, made by the **synovial membrane**, reduces friction; a **fibrous capsule** and **ligaments** hold the bones together.',
      v: V.synovial,
      n: 'The slippery cartilage and the oily synovial fluid keep friction very low. Ligaments join bone to bone and stop the joint from moving too far.',
    }),
    sl('check', 'Quick check: joint type', {
      b: 'Name the joint that allows a head to turn from side to side.',
      n: 'Quick check. The atlas turns around a peg of the axis.',
      chk: 'pivot-mcq',
    }),
    sl('concept', 'Disorders of muscle', {
      b: 'Three disorders affect muscle function.',
      v: table(['Disorder', 'Cause', 'Main symptom'], [['Myasthenia gravis', 'Autoimmune: antibodies attack acetylcholine receptors at the neuromuscular junction', 'Weakness and fatigue; drooping eyelids'], ['Tetany', 'Low calcium in body fluids (for example, low parathormone)', 'Rapid, painful muscle spasms'], ['Muscular dystrophy', 'Genetic; progressive degeneration of skeletal muscle (Duchenne: X-linked, no dystrophin)', 'Wasting and weakening of muscles']], 'Table of muscle disorders: cause and symptom'),
      n: 'In myasthenia gravis the body attacks its own receptors, so the signal from the nerve fails to reach the muscle. In tetany, low calcium makes nerves over-excitable, giving spasms. In muscular dystrophy the muscle fibres slowly break down.',
    }),
    sl('concept', 'Disorders of bone and joints', {
      b: 'Three disorders affect bones and joints.',
      v: table(['Disorder', 'Cause', 'Main symptom'], [['Arthritis', 'Inflammation of joints: wear of cartilage, or autoimmune attack on the synovial membrane', 'Painful, stiff, swollen joints'], ['Osteoporosis', 'Decreased bone mass, common after menopause when oestrogen falls', 'Brittle bones, fractures'], ['Gout', 'Crystals of uric acid deposited in joints', 'Sudden, very painful swelling, often of the big toe']], 'Table of bone and joint disorders: cause and symptom'),
      n: 'Arthritis means swollen painful joints. In osteoporosis the bones become thin and break easily, especially in older women. In gout, uric acid crystals collect in a joint and cause sudden severe pain.',
    }),
    sl('check', 'Quick check: gout', {
      b: 'Match a case history to its disorder.',
      n: 'Quick check. Which substance forms the crystals?',
      chk: 'gout-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        `Adult skeleton: ${TOTAL} bones; axial ${AXIAL_N} and appendicular ${APPEND_N}.`,
        `Skull ${SKULL_N}, vertebral column ${VERT_N}, sternum 1, ribs ${RIB_N}; girdles and limbs make ${APPEND_N}.`,
        'Joints: fibrous (fixed), cartilaginous (slight), synovial (free): ball and socket, hinge, pivot, gliding, saddle.',
        'Muscle disorders: myasthenia gravis, tetany, muscular dystrophy.',
        'Bone and joint disorders: arthritis, osteoporosis, gout.',
      ],
      v: table(['Joint', 'Example'], [['Ball and socket', 'Shoulder, hip'], ['Hinge', 'Elbow, knee'], ['Pivot', 'Atlas and axis'], ['Gliding', 'Between carpals'], ['Saddle', 'Base of the thumb']], 'Summary table of synovial joints with examples'),
      n: 'To recap: there are two hundred and six bones, split into an axial and an appendicular part. Joints are fibrous, cartilaginous or synovial, and each disorder has its own cause, such as antibodies, low calcium, a faulty gene, uric acid or loss of bone mass.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        `Learn the numbers: **${TOTAL}**, **${AXIAL_N}**, **${APPEND_N}**, skull **${SKULL_N}**, backbone **${VERT_N}**, ribs **${RIB_N}**.`,
        'Give a **named example** for every type of synovial joint.',
        'Write cause **and** symptom for each disorder.',
        'Mention that textbooks differ slightly in the skull count: state what you include.',
      ],
      n: 'Exam tips. Learn the bone counts and be ready to show how they add up. Give an example for each type of synovial joint. Write both the cause and the main symptom of each disorder. And say what you have included in the skull count.',
    }),
  ],
});
