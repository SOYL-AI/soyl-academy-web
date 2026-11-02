// ch17 Locomotion and Movement — two decks: Part 1 (t01 movement and muscle), Part 2 (t02 skeleton and joints, t03 disorders).
import { sl, deck, table, flow, svgV, r } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { SARCOMERE, PROTEINS, JOINTS, SKELETON, VERTEBRAL } from './svgs.mjs';
import { RELAXED, CONTRACTED, MYOSIN, ACTIN, WE2, SKULL, SKULL_N, VERT, VERT_N, RIBS_N, AXIAL_N, FORE, HIND, FORE_N, HIND_N, LIMBS_N, GIRDLES, GIRDLES_N, APPEND_N, TOTAL_N } from './calc.mjs';

export const V = {
  sarcomere: svgV(SARCOMERE, 'Two sarcomeres to scale: relaxed with wide I band and H zone, contracted with narrow I band and H zone, A band unchanged'),
  proteins: svgV(PROTEINS, 'Actin filament with G-actin beads, tropomyosin and troponin; myosin monomer with HMM head and LMM tail'),
  joints: svgV(JOINTS, 'Section of a synovial joint with cartilage, cavity, fluid and capsule, beside the three kinds of joints'),
  skeleton: svgV(SKELETON, 'Tree dividing the 206 bones into axial 80 and appendicular 126 with their parts'),
  vertebral: svgV(VERTEBRAL, 'Vertebral column with its five regions and the true, false and floating ribs'),
};

export const deck1 = deck({
  part: 1,
  title: 'Locomotion and Movement — Part 1: Movement and muscle contraction',
  goals: [
    'Distinguish amoeboid, ciliary and muscular movement, and movement from locomotion',
    'Compare skeletal, visceral and cardiac muscle',
    'Describe the structure of a skeletal muscle fibre, a sarcomere and the contractile proteins',
    'Explain contraction by the sliding filament theory, and muscle fatigue',
  ],
  slides: [
    sl('title', 'Locomotion and Movement', {
      b: 'Part 1 — how cells and muscles move, and how a muscle fibre contracts.',
      v: flow('LR', [['a', 'Amoeboid movement'], ['c', 'Ciliary movement'], ['m', 'Muscular movement']], [['a', 'c'], ['c', 'm']], 'Flow of the three types of movement in human cells and tissues'),
      n: 'Movement is one of the significant features of living beings. Some movements, such as walking, running or swimming, change the place of the whole body; these are called locomotion. Cells of the human body show three main types of movement: amoeboid, ciliary and muscular.',
    }),
    sl('concept', 'Movement and locomotion', {
      b: 'All locomotions are movements, but **all movements are not locomotions**. Methods of locomotion are usually linked to changing habitats and needs, such as finding food, shelter, mates or escaping enemies.',
      v: table(['Type of movement', 'How it works', 'Example in humans'], [['Amoeboid', 'Pseudopodia formed by streaming of protoplasm, with cytoskeletal elements such as microfilaments', 'Macrophages and leucocytes in blood'], ['Ciliary', 'Coordinated beating of cilia', 'Removal of dust in the trachea; passage of ova through the female reproductive tract'], ['Muscular', 'Contraction of muscles', 'Movement of limbs, jaws and tongue']], 'Table of amoeboid, ciliary and muscular movement with examples'),
      n: 'Paramecium uses its cilia both to move food into its gullet and to swim, and the tentacles of Hydra catch prey and can also help it move. In our own bodies, white blood cells crawl by pseudopodia, cilia sweep the windpipe clean, and muscles move our limbs.',
    }),
    sl('concept', 'Three kinds of muscle', {
      b: 'Muscle is a specialised tissue of **mesodermal** origin; about **40 to 50 percent** of an adult’s body weight is muscle. Muscle shows excitability, contractility, extensibility and elasticity.',
      v: table(['Feature', 'Skeletal', 'Visceral', 'Cardiac'], [['Location', 'Attached to bones', 'Inner walls of hollow organs such as the alimentary canal and reproductive tract', 'Heart'], ['Striations', 'Striated', 'Smooth, not striated', 'Striated'], ['Control', 'Voluntary', 'Involuntary', 'Involuntary'], ['Role', 'Locomotion and changes of posture', 'Moving food through the gut, gametes through the genital tract', 'Pumping blood']], 'Table comparing skeletal, visceral and cardiac muscle'),
      n: 'Skeletal muscles are attached to bones, look striped and work under our will. Visceral muscles line hollow organs such as the gut; they are smooth and involuntary. Cardiac muscle is found only in the heart; its cells join together, it is striated, and it works without our control.',
    }),
    sl('diagram', 'Inside a skeletal muscle', {
      b: 'A skeletal muscle is made of bundles called **fascicles**, held by a collagenous connective tissue layer called **fascia**. Each muscle fibre is lined by the **sarcolemma**; its cytoplasm, the **sarcoplasm**, holds many nuclei (a syncytium), and its endoplasmic reticulum, the **sarcoplasmic reticulum**, is the **store of calcium ions**.',
      v: flow('TB', [['m', 'Skeletal muscle'], ['f', 'Fascicles (bundles)'], ['b', 'Muscle fibres (cells)'], ['y', 'Myofibrils (myofilaments)'], ['s', 'Sarcomeres in series']], [['m', 'f'], ['f', 'b'], ['b', 'y'], ['y', 's']], 'Flow from a whole muscle to fascicles, fibres, myofibrils and sarcomeres'),
      n: 'Think of a muscle as a rope of ropes. The muscle is made of fascicles, each fascicle of many muscle fibres, and each fibre is packed with parallel myofibrils. Alternate dark and light bands on the myofibrils give the fibre its striped look.',
    }),
    sl('diagram', 'The sarcomere', {
      b: 'The **light (I) bands** contain **actin** and are **isotropic**; the **dark (A) bands** contain **myosin** and are **anisotropic**. An elastic **Z line** bisects each I band, and the thin filaments are firmly attached to it. The thick filaments in the A band are held together in the middle by a thin **M line**. The part of the A band not overlapped by thin filaments is the **H zone**. The portion between two successive Z lines is the **sarcomere**, the functional unit of contraction.',
      v: V.sarcomere,
      n: 'Each sarcomere runs from one Z line to the next. Thin actin filaments are anchored to the Z lines, and thick myosin filaments sit in the middle, held by the M line. When the muscle contracts, the thin filaments slide inwards, so the I band and the H zone narrow while the A band keeps its length.',
    }),
    sl('check', 'Quick check: bands', {
      b: 'Which protein makes up the light, isotropic band of a myofibril?',
      n: 'Quick check. Which filaments are attached to the Z line in the middle of the light band?',
      chk: 'iband-mcq',
    }),
    sl('diagram', 'Contractile proteins', {
      b: 'Each **actin (thin) filament** is made of two **F (filamentous) actins** helically wound together; each F-actin is a polymer of monomeric **G (globular) actins**. Two filaments of **tropomyosin** run along it, with the complex protein **troponin** at regular intervals. In the resting state, a subunit of troponin **masks the active binding sites for myosin**. Each **myosin (thick) filament** is a polymer of **meromyosin** monomers: a globular head with a short arm (**heavy meromyosin, HMM**) and a tail (**light meromyosin, LMM**). The head is an active **ATPase** with binding sites for ATP and actin.',
      v: V.proteins,
      n: 'The thin filament is a twisted double chain of actin beads, with tropomyosin running along it and troponin attached at intervals. The thick filament is a bundle of myosin molecules whose heads stick out as cross arms. Those heads can split ATP and grab actin.',
    }),
    sl('example', 'Worked example 1: band widths', {
      b: `A relaxed sarcomere is ${RELAXED.L} μm long. Its myosin filaments are ${MYOSIN} μm long, and each actin filament reaches ${ACTIN.toFixed(1)} μm from its Z line. Find the A band, I band and H zone, at rest and after it shortens to ${CONTRACTED.L} μm.`,
      ul: [
        `A band = length of the myosin filaments = ${MYOSIN} μm, in both states.`,
        r`Relaxed: I band $= ${RELAXED.L} - ${MYOSIN} = ${RELAXED.I}$ μm; H zone $= ${RELAXED.L} - 2 \times ${ACTIN.toFixed(1)} = ${RELAXED.H}$ μm.`,
        r`Contracted: I band $= ${CONTRACTED.L} - ${MYOSIN} = ${CONTRACTED.I}$ μm; H zone $= ${CONTRACTED.L} - 2 \times ${ACTIN.toFixed(1)} = ${CONTRACTED.H}$ μm.`,
        'The A band is unchanged; the I band and H zone shorten because the thin filaments slide over the thick ones.',
      ],
      v: table(['Band', 'Relaxed (μm)', 'Contracted (μm)'], [['Sarcomere', String(RELAXED.L), String(CONTRACTED.L)], ['A band', String(RELAXED.A), String(CONTRACTED.A)], ['I band', String(RELAXED.I), String(CONTRACTED.I)], ['H zone', String(RELAXED.H), String(CONTRACTED.H)]], 'Worked table of band widths in a relaxed and a contracted sarcomere'),
      n: 'The A band is simply the length of the myosin filaments, so it cannot change. The I band is what is left of the sarcomere outside the myosin, and the H zone is the gap between the tips of the two sets of actin filaments. Both shrink as the Z lines are pulled closer. These lengths are typical values chosen for illustration.',
    }),
    sl('concept', 'How contraction starts', {
      b: 'Contraction is initiated by a signal from the central nervous system through a **motor neuron**. A motor neuron with the muscle fibres it supplies is a **motor unit**; their junction is the **neuromuscular junction (motor end plate)**.',
      v: flow('TB', [['n', 'Signal reaches the neuromuscular junction'], ['a', 'Acetylcholine released'], ['p', 'Action potential spreads through the sarcolemma'], ['c', 'Ca²⁺ released from the sarcoplasmic reticulum'], ['t', 'Ca²⁺ binds a troponin subunit; myosin-binding sites on actin are exposed']], [['n', 'a'], ['a', 'p'], ['p', 'c'], ['c', 't']], 'Flow from the nerve signal through acetylcholine and calcium release to the unmasking of binding sites'),
      n: 'A nerve signal at the motor end plate releases acetylcholine, which sets off an action potential in the sarcolemma. This spreads through the fibre and causes calcium ions to be released from the sarcoplasmic reticulum. Calcium binds to troponin, which removes the mask from the active sites on actin, so myosin can now bind.',
    }),
    sl('check', 'Quick check: calcium', {
      b: 'Calcium ions released into the sarcoplasm start contraction by binding to which protein?',
      n: 'Quick check. Which protein masks the binding sites on actin at rest?',
      chk: 'calcium-mcq',
    }),
    sl('concept', 'The cross-bridge cycle', {
      b: 'Myosin heads, energised by ATP hydrolysis, bind to the exposed sites on actin to form **cross bridges**, and pull the attached actin filaments towards the centre of the A band. The Z lines are pulled inwards, the sarcomere shortens, and the I bands shorten while the A bands keep their length.',
      v: flow('LR', [['h', 'Head hydrolyses ATP and is energised'], ['x', 'Head binds actin: cross bridge'], ['p', 'Actin pulled to the A band centre; ADP and Pi released'], ['n', 'New ATP binds; cross bridge breaks']], [['h', 'x'], ['x', 'p'], ['p', 'n'], ['n', 'h', 'repeat']], 'Cycle of ATP hydrolysis, cross-bridge formation, pulling and release'),
      n: 'The myosin head splits ATP and becomes energised. It binds actin, forming a cross bridge, and pulls the thin filament towards the middle. Releasing ADP and phosphate, the head returns to its relaxed state; a fresh ATP binds and the cross bridge breaks. Repeating this cycle slides the filaments further. When calcium is pumped back into the sarcoplasmic reticulum, the actin sites are masked again and the Z lines return to their original positions.',
    }),
    sl('concept', 'Fatigue, red and white fibres', {
      b: 'Repeated activation of muscles can lead to accumulation of **lactic acid** from the anaerobic breakdown of glycogen, causing **fatigue**.',
      v: table(['Feature', 'Red fibres', 'White fibres'], [['Myoglobin (red, oxygen-storing pigment)', 'High content', 'Very little'], ['Mitochondria', 'Plenty', 'Few'], ['Sarcoplasmic reticulum', 'Less', 'High amount'], ['Energy', 'Aerobic: also called aerobic muscles', 'Mainly anaerobic']], 'Table comparing red and white muscle fibres'),
      n: 'Red fibres are packed with myoglobin and mitochondria, so they use the stored oxygen for steady aerobic work. White fibres are pale, with few mitochondria but plenty of sarcoplasmic reticulum, and rely on anaerobic energy. Hard repeated work makes lactic acid build up, and the muscle tires.',
    }),
    sl('example', 'Worked example 2: shortening a myofibril', {
      b: `A myofibril has ${WE2.n} sarcomeres in series, each ${WE2.from} μm long at rest. During a contraction each shortens to ${WE2.to} μm. Find the myofibril’s length before and after, and the percentage shortening.`,
      ul: [
        r`Before: $${WE2.n} \times ${WE2.from} = ${WE2.umBefore}$ μm, which is ${WE2.lenBefore} mm.`,
        r`After: $${WE2.n} \times ${WE2.to} = ${WE2.umAfter}$ μm, which is ${WE2.lenAfter} mm.`,
        r`Shortening: $${WE2.n} \times ${WE2.d} = ${WE2.um}$ μm, or ${WE2.mm} mm; percentage $= \dfrac{${WE2.d}}{${WE2.from}} \times 100 = ${WE2.pct}$.`,
        'Tiny shortenings of thousands of sarcomeres in series add up to a visible movement.',
      ],
      v: table(['Quantity', 'Value'], [['Sarcomeres in series', String(WE2.n)], ['Length at rest', `${WE2.lenBefore} mm`], ['Length contracted', `${WE2.lenAfter} mm`], ['Shortening', `${WE2.mm} mm (${WE2.pct} percent)`]], `Worked table: a myofibril of ${WE2.n} sarcomeres shortens by ${WE2.mm} mm`),
      n: 'Each sarcomere shortens by less than half a micrometre, far too little to see. But four thousand of them in a row shorten the whole myofibril by more than a millimetre and a half, the same fraction, sixteen percent, as each single sarcomere.',
    }),
    sl('check', 'Quick check: the A band', {
      b: 'Judge the assertion and the reason about the A band during contraction.',
      n: 'Quick check. Do the myosin filaments themselves get shorter?',
      chk: 'aband-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Movements: amoeboid (macrophages, leucocytes), ciliary (trachea, oviduct), muscular (limbs, jaws, tongue); locomotion changes the place of the body.',
        'Muscle: skeletal (striated, voluntary), visceral (smooth, involuntary), cardiac (striated, involuntary).',
        'Muscle → fascicles → fibres (sarcolemma, sarcoplasm, sarcoplasmic reticulum storing Ca²⁺) → myofibrils → sarcomeres.',
        'I band: actin, isotropic; A band: myosin, anisotropic; Z line, M line, H zone; sarcomere between two Z lines.',
        'Nerve signal → acetylcholine → action potential → Ca²⁺ → troponin → cross bridges (ATP) → actin slides; I band and H zone shorten, A band constant.',
        'Fatigue: lactic acid; red fibres aerobic (myoglobin, mitochondria), white fibres anaerobic.',
      ],
      v: table(['Band', 'Change on contraction'], [['A band', 'No change'], ['I band', 'Shortens'], ['H zone', 'Shortens or disappears'], ['Sarcomere', 'Shortens']], 'Summary table of band changes during contraction'),
      n: 'To recap: cells move by pseudopodia, cilia or muscles. A muscle fibre is a chain of sarcomeres. A nerve signal releases calcium, calcium frees the binding sites on actin, and myosin heads powered by ATP pull the thin filaments inwards. The A band stays the same while the I band and H zone shrink.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Draw a **labelled sarcomere**: Z line, M line, A band, I band, H zone, actin and myosin.',
        'Write the **sequence** from the motor neuron to the power stroke in order.',
        'State which bands **shorten** and which **stays constant**.',
        'Give the roles of **troponin**, **tropomyosin**, **calcium** and **ATP**.',
      ],
      n: 'Exam tips. Practise drawing and labelling a sarcomere. Learn the steps of contraction in order, from the nerve signal to the sliding of actin. Remember that the A band stays constant. And be ready to explain the roles of calcium, troponin and ATP.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Locomotion and Movement — Part 2: Skeleton, joints and disorders',
  goals: [
    'Describe the axial and appendicular skeleton and count their bones',
    'Classify joints and give examples of each kind of synovial joint',
    'Describe common disorders of the muscular and skeletal systems',
  ],
  slides: [
    sl('title', 'Skeletal system and joints', {
      b: 'Part 2 — the framework of bones and cartilages, the joints that let it move, and what can go wrong.',
      v: flow('LR', [['a', 'Axial skeleton'], ['p', 'Appendicular skeleton'], ['j', 'Joints'], ['d', 'Disorders']], [['a', 'p'], ['p', 'j'], ['j', 'd']], 'Flow from the axial and appendicular skeleton to joints and disorders'),
      n: 'The skeletal system is a framework of bones and a few cartilages. Bone has a very hard matrix because of calcium salts, while cartilage has a slightly pliable matrix because of chondroitin salts. Together with muscles, the skeleton makes movement possible.',
    }),
    sl('diagram', 'Two divisions: 206 bones', {
      b: `In human beings the skeletal system is made up of **${TOTAL_N} bones** and a few cartilages. It is grouped into the **axial skeleton** (${AXIAL_N} bones along the main axis of the body) and the **appendicular skeleton** (${APPEND_N} bones of the limbs and girdles).`,
      v: V.skeleton,
      n: 'The axial skeleton runs along the main axis of the body: the skull, the vertebral column, the sternum and the ribs. The appendicular skeleton is made of the bones of the limbs and the girdles that attach them to the axial skeleton.',
    }),
    sl('concept', 'The skull', {
      b: `The skull has **${SKULL.cranial} cranial bones**, forming the hard protective cranium around the brain, and **${SKULL.facial} facial bones**, forming the front part of the skull. A single U-shaped **hyoid** bone lies at the base of the buccal cavity, and each middle ear has **three tiny ear ossicles**: malleus, incus and stapes. The skull articulates with the vertebral column by **two occipital condyles** (a **dicondylic** skull).`,
      v: table(['Part', 'Number of bones'], [['Cranial bones', String(SKULL.cranial)], ['Facial bones', String(SKULL.facial)], ['Hyoid', String(SKULL.hyoid)], ['Ear ossicles (3 on each side)', String(SKULL.ossicles)], ['Skull region in all', String(SKULL_N)]], 'Table of the bones of the skull region'),
      n: 'Eight cranial bones form a strong box around the brain and fourteen bones shape the face. Add the small hyoid bone in the floor of the mouth and three ossicles in each middle ear, and the skull region has twenty nine bones.',
    }),
    sl('diagram', 'Vertebral column and ribs', {
      b: `The **vertebral column** has **${VERT_N} serially arranged vertebrae** and is dorsally placed. Each vertebra has a central hollow, the **neural canal**, through which the spinal cord passes. The first vertebra is the **atlas**, which articulates with the occipital condyles. The column protects the spinal cord, supports the head and serves as the point of attachment for the ribs and musculature of the back. The **sternum** is a flat bone on the ventral midline of the thorax. There are **12 pairs of ribs**; each rib is a thin flat bone joined dorsally to the vertebral column and ventrally (in most) to the sternum, with two articulation surfaces on its dorsal end (**bicephalic**).`,
      v: V.vertebral,
      n: 'From the neck down there are seven cervical, twelve thoracic and five lumbar vertebrae, then a fused sacrum and a fused coccyx. Notice that the first seven pairs of ribs reach the sternum directly, the next three reach it through the cartilage of the seventh rib, and the last two float free at the front. The thoracic vertebrae, ribs and sternum together form the rib cage.',
    }),
    sl('example', 'Worked example 1: adding up the axial skeleton', {
      b: 'Use the counts of each part to show that the axial skeleton has 80 bones.',
      ul: [
        r`Skull region: $${SKULL.cranial} + ${SKULL.facial} + ${SKULL.hyoid} + ${SKULL.ossicles} = ${SKULL_N}$.`,
        r`Vertebral column: $${VERT.cervical} + ${VERT.thoracic} + ${VERT.lumbar} + ${VERT.sacral} + ${VERT.coccygeal} = ${VERT_N}$.`,
        r`Ribs: $12 \times 2 = ${RIBS_N}$; sternum: 1.`,
        r`Axial skeleton: $${SKULL_N} + ${VERT_N} + 1 + ${RIBS_N} = ${AXIAL_N}$.`,
      ],
      v: table(['Part', 'Bones'], [['Skull region', String(SKULL_N)], ['Vertebral column', String(VERT_N)], ['Sternum', '1'], ['Ribs', String(RIBS_N)], ['Axial skeleton', String(AXIAL_N)]], `Worked table: the axial skeleton totals ${AXIAL_N} bones`),
      n: 'Count the skull region first: eight, fourteen, one and six make twenty nine. The vertebral column gives twenty six. Twelve pairs of ribs give twenty four, and the sternum adds one. Twenty nine plus twenty six plus one plus twenty four is eighty.',
    }),
    sl('check', 'Quick check: ribs', {
      b: 'Which pairs of ribs are called floating ribs, and why?',
      n: 'Quick check. Which ribs are not joined to anything at the front?',
      chk: 'floating-mcq',
    }),
    sl('concept', 'Limbs and girdles', {
      b: 'Each limb has 30 bones. The **pectoral girdle** (a clavicle and a scapula on each side) and the **pelvic girdle** (two coxal bones) attach the limbs to the axial skeleton.',
      v: table(['Part', 'Bones'], [['Fore limb (hand and arm)', 'Humerus, radius and ulna, 8 carpals (wrist), 5 metacarpals (palm), 14 phalanges (digits)'], ['Hind limb (leg)', 'Femur (longest bone), tibia and fibula, 7 tarsals (ankle), 5 metatarsals, 14 phalanges, and the patella (knee cap)'], ['Pectoral girdle', 'Clavicle (collar bone) and scapula; the glenoid cavity of the scapula takes the head of the humerus; the acromion forms the highest point of the shoulder'], ['Pelvic girdle', 'Two coxal bones, each formed by fusion of the ilium, ischium and pubis; the acetabulum takes the thigh bone; the two halves meet ventrally at the pubic symphysis']], 'Table of the bones of the limbs and girdles'),
      n: 'The arm and the leg have a matching plan: one upper bone, two lower bones, a group of wrist or ankle bones, five long bones in the palm or sole, and fourteen phalanges. The leg has one extra bone, the knee cap, but one fewer ankle bone than the wrist has carpals, so each limb has thirty bones.',
    }),
    sl('example', 'Worked example 2: the appendicular skeleton', {
      b: 'Show that the appendicular skeleton has 126 bones and the whole skeleton 206.',
      ul: [
        r`Fore limb: $${FORE.humerus} + ${FORE.radius} + ${FORE.ulna} + ${FORE.carpals} + ${FORE.metacarpals} + ${FORE.phalanges} = ${FORE_N}$.`,
        r`Hind limb: $${HIND.femur} + ${HIND.tibia} + ${HIND.fibula} + ${HIND.tarsals} + ${HIND.metatarsals} + ${HIND.phalanges} + ${HIND.patella} = ${HIND_N}$.`,
        r`Limbs: $2 \times ${FORE_N} + 2 \times ${HIND_N} = ${LIMBS_N}$; girdles: $${GIRDLES.pectoral} + ${GIRDLES.pelvic} = ${GIRDLES_N}$.`,
        r`Appendicular: $${LIMBS_N} + ${GIRDLES_N} = ${APPEND_N}$; whole skeleton: $${AXIAL_N} + ${APPEND_N} = ${TOTAL_N}$.`,
      ],
      v: table(['Part', 'Bones'], [['Two fore limbs', String(2 * FORE_N)], ['Two hind limbs', String(2 * HIND_N)], ['Pectoral girdles', String(GIRDLES.pectoral)], ['Pelvic girdles', String(GIRDLES.pelvic)], ['Appendicular skeleton', String(APPEND_N)]], `Worked table: the appendicular skeleton totals ${APPEND_N} bones`),
      n: 'Each fore limb has thirty bones, and so does each hind limb, giving one hundred and twenty for all four limbs. The two pectoral girdles add four and the two coxal bones add two. That makes one hundred and twenty six, and with the eighty axial bones the skeleton has two hundred and six.',
    }),
    sl('check', 'Quick check: phalanges', {
      b: 'How many phalanges are there in the whole human skeleton?',
      n: 'Quick check. Each hand and each foot has fourteen.',
      chk: 'phalanges-num',
    }),
    sl('diagram', 'Joints', {
      b: 'Joints are points of contact between bones, or between bones and cartilages. Joints are essential for all movements involving the bony parts of the body; locomotory movements are no exception. **Force generated by the muscles is used to carry out movement through joints, where the joint acts as a fulcrum.**',
      v: V.joints,
      n: 'Joints are classified by how much movement they allow. Fibrous joints, such as the sutures between flat skull bones, allow none. Cartilaginous joints, such as those between neighbouring vertebrae, allow a little. Synovial joints have a fluid-filled cavity between the bones and allow considerable movement.',
    }),
    sl('concept', 'Five kinds of synovial joint', {
      b: 'Synovial joints are characterised by a fluid-filled **synovial cavity** between the articulating surfaces of the two bones. They allow considerable movement and play a significant role in locomotion and many other movements.',
      v: table(['Synovial joint', 'Example'], [['Ball and socket', 'Between the humerus and the pectoral girdle'], ['Hinge', 'Knee joint'], ['Pivot', 'Between the atlas and the axis'], ['Gliding', 'Between the carpals'], ['Saddle', 'Between the carpal and metacarpal of the thumb']], 'Table of five kinds of synovial joint with examples'),
      n: 'A ball and socket joint, as at the shoulder, lets the arm move in almost every direction. A hinge, as at the knee, works in one plane like a door. A pivot lets the head turn on the neck. Gliding joints let small bones slide over each other, and a saddle joint gives the thumb its wide range.',
    }),
    sl('check', 'Quick check: joints', {
      b: 'What type of joint is found between the atlas and the axis?',
      n: 'Quick check. Which joint lets one bone turn on another?',
      chk: 'pivot-mcq',
    }),
    sl('concept', 'Disorders of muscles and bones', {
      b: 'Some disorders affect the junction between nerve and muscle, some the muscle itself, and some the bones and joints.',
      v: table(['Disorder', 'What happens'], [['Myasthenia gravis', 'Autoimmune disorder affecting the neuromuscular junction: fatigue, weakening and paralysis of skeletal muscle'], ['Muscular dystrophy', 'Progressive degeneration of skeletal muscle, mostly due to a genetic disorder'], ['Tetany', 'Rapid spasms (wild contractions) in muscle due to low Ca²⁺ in body fluid'], ['Arthritis', 'Inflammation of joints'], ['Osteoporosis', 'Age-related disorder: decreased bone mass and increased chances of fractures; decreased levels of oestrogen is a common cause'], ['Gout', 'Inflammation of joints due to accumulation of uric acid crystals']], 'Table of six disorders of the muscular and skeletal systems'),
      n: 'In myasthenia gravis the body attacks its own neuromuscular junctions, so muscles weaken. Muscular dystrophy is an inherited, steady wasting of muscle. Too little calcium in body fluids causes the spasms of tetany. Arthritis inflames joints, gout does so through uric acid crystals, and osteoporosis thins the bones with age.',
    }),
    sl('check', 'Quick check: gout', {
      b: 'Judge the assertion and the reason about gout.',
      n: 'Quick check. Which crystals collect in the joints in gout?',
      chk: 'gout-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        `${TOTAL_N} bones: axial ${AXIAL_N} (skull ${SKULL_N}, vertebrae ${VERT_N}, sternum 1, ribs ${RIBS_N}) and appendicular ${APPEND_N} (limbs ${LIMBS_N}, girdles ${GIRDLES_N}).`,
        'Vertebrae: cervical 7, thoracic 12, lumbar 5, sacral 1, coccygeal 1; atlas articulates with the occipital condyles.',
        'Ribs: true 1–7, false (vertebrochondral) 8–10, floating 11–12.',
        'Joints: fibrous (skull sutures), cartilaginous (vertebrae), synovial (ball and socket, hinge, pivot, gliding, saddle).',
        'Disorders: myasthenia gravis, muscular dystrophy, tetany, arthritis, osteoporosis, gout.',
      ],
      v: table(['Joint', 'Movement'], [['Fibrous', 'None'], ['Cartilaginous', 'Limited'], ['Synovial', 'Considerable']], 'Summary table of the three kinds of joints and their movement'),
      n: 'To recap: the skeleton has two hundred and six bones, eighty axial and one hundred and twenty six appendicular. Joints range from fixed sutures to freely moving synovial joints. And disorders can strike the neuromuscular junction, the muscle, the bone or the joint.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Learn the **bone counts** of each part and check that they add up.',
        'Match each **synovial joint** with its **standard example**.',
        'Distinguish **true, false and floating ribs**.',
        'For disorders, give the **cause** in a few words: autoimmune, genetic, low Ca²⁺, uric acid, low oestrogen.',
      ],
      n: 'Exam tips. Learn the number of bones in each part of the skeleton and check that they add up. Pair each kind of synovial joint with its example. Know the three kinds of ribs. And for each disorder, state its cause in a few words.',
    }),
  ],
});
