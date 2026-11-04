// ISC 11 Biology ch19 notes and flashcards.
import { T, table, unit, PROV } from '../../isc-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { GEO, REL, CON, B_REL, B_CON, SKULL, SKULL_N, VERT, VERT_N, VERT_CHILD, RIB_N, RIBS, AXIAL_N, APPEND, APPEND_N, TOTAL, HAND_N, FOOT_N, HANDS_FEET, TWITCH } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Locomotion and Movement — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Types of movement; muscle properties; red and white fibres',
      `**Movement** is a basic property of living organisms; **locomotion** is movement from one place to another, so all locomotion is movement but not all movement is locomotion (a tentacle of *Hydra* waving is movement without locomotion). Three kinds of movement are studied in humans:
- **Ciliary movement:** coordinated beating of **cilia** in one direction. The ciliated epithelium of the trachea sweeps dust and mucus towards the throat; cilia of the oviduct and the ciliated cells of the fallopian tube help to move the ovum.
- **Flagellar movement:** a long **flagellum** drives the cell, as in a **sperm** or in *Euglena*.
- **Muscular movement:** **contraction of muscle fibres**, which moves limbs, jaws, the tongue and also the heart and gut.

**General properties of muscle:** **excitability** (responds to a stimulus), **contractility** (can shorten), **extensibility** (can be stretched) and **elasticity** (returns to its original length after stretching).

**Kinds of muscle:** **skeletal** (striated, voluntary, attached to bones), **smooth or visceral** (unstriated, involuntary, in walls of hollow organs) and **cardiac** (striated, branched, involuntary, in the heart).

**Red and white fibres of skeletal muscle**
| Feature | Red fibres | White fibres |
|---|---|---|
| Myoglobin | Abundant (look red) | Little (look pale) |
| Mitochondria | Many | Few |
| Sarcoplasmic reticulum | Less | More |
| ATP made by | Aerobic respiration | Anaerobic glycolysis (lactic acid) |
| Contraction | Slow, sustained, resists fatigue | Fast, powerful, fatigues quickly |
| Examples | Leg muscles of a hen; muscles of diving mammals such as seals | Breast muscles of a domestic hen; muscles of the eyeball |

*Note on books:* some books give only the first four rows; the contrast of breast (white) and leg (red) muscle of a hen is a common textbook illustration.`,
      [kt('Locomotion', 'Movement of the whole body from one place to another.'), kt('Excitability', 'Ability of muscle to respond to a stimulus.'), kt('Myoglobin', 'Oxygen-storing pigment of muscle; abundant in red fibres.'), kt('Red fibre', 'Slow, aerobic, fatigue-resistant fibre rich in myoglobin and mitochondria.')],
      table(['Feature', 'Red', 'White'], [['Myoglobin', 'Abundant', 'Little'], ['Mitochondria', 'Many', 'Few'], ['Energy', 'Aerobic', 'Glycolysis'], ['Fatigue', 'Slow', 'Fast']], 'Table of red and white fibres'),
      [1],
    ),
    sec(
      '2a. Structure of skeletal muscle and the contractile proteins',
      `A skeletal muscle is a bundle of **fascicles**; each fascicle contains many **muscle fibres**. A fibre is a long, multinucleate cell enclosed in the **sarcolemma**; its cytoplasm is the **sarcoplasm**, and its modified endoplasmic reticulum, the **sarcoplasmic reticulum**, stores **calcium ions**. A fibre contains many parallel **myofibrils**, each made of **myofilaments** of two kinds.

**Sarcomere:** the **functional unit of contraction**, the segment of a myofibril between two successive **Z lines**.
- **A band (anisotropic, dark):** the length of the **thick (myosin) filaments**; the central part of the A band with no thin filaments in a relaxed fibre is the **H zone**; the **M line** in its middle holds the thick filaments.
- **I band (isotropic, light):** only **thin (actin) filaments**; it is bisected by the **Z line**.

**Contractile proteins**
- **Actin:** the thin filament is a double helix of **F-actin**, each a polymer of globular **G-actin**; a thread of **tropomyosin** lies in the groove and a **troponin** complex sits at regular intervals.
- **Myosin:** the thick filament is a bundle of **myosin** molecules. Each has a rod-like **tail (light meromyosin)** and a double **head (heavy meromyosin)** that projects as a cross bridge; the head has an **ATPase** site and an **actin-binding site**.

In the chapter, a model sarcomere is used with an A band of ${GEO.a} µm and thin filaments ${GEO.thin} µm long; book values differ slightly (the A band is usually about 1.5 to 1.6 µm), so the arithmetic is illustrative.`,
      [kt('Sarcomere', 'Unit of contraction between two Z lines.'), kt('A band', 'Dark band formed by thick filaments; length unchanged in contraction.'), kt('I band', 'Light band of thin filaments only; bisected by the Z line.'), kt('H zone', 'Middle of the A band without thin filaments.'), kt('Tropomyosin', 'Thread that covers the myosin-binding sites on actin in a resting muscle.')],
      V.sarcomere,
      [2],
      [V.filaments],
    ),
    sec(
      '2b. Sliding filament theory, summation, tetanus and rigor mortis',
      `**Sliding filament theory (Huxley and Huxley, 1954):** during contraction the **thin filaments slide inwards over the thick filaments** towards the M line; the filaments themselves do not shorten.

**Chemical events**
1. A nerve impulse reaches the **motor end plate**; **acetylcholine** is released and sets up an **action potential in the sarcolemma**.
2. The **sarcoplasmic reticulum** releases **calcium ions** into the sarcoplasm.
3. Calcium **binds troponin**; **tropomyosin** moves aside and uncovers the **myosin-binding sites** on actin.
4. A myosin head carrying **ADP and phosphate** binds actin: a **cross bridge**.
5. **Power stroke:** the head bends, releasing ADP and phosphate and pulling the thin filament towards the M line.
6. A fresh **ATP** binds the head, which **detaches**; ATP is split, which **recocks** the head. The cycle repeats while calcium is present.
7. **Relaxation:** calcium is pumped back into the sarcoplasmic reticulum; tropomyosin covers the sites again and the muscle returns to its resting length.

**Effect on the sarcomere:** the **Z lines come closer**; the **I band** and **H zone** narrow (the H zone may disappear); the **A band keeps its length**. With the model values, a sarcomere of ${REL} µm has an I band of ${B_REL.i} µm and an H zone of ${B_REL.h} µm; at ${CON} µm they are ${B_CON.i} µm and ${B_CON.h} µm.

**Twitch, summation, tetanus:** a single stimulus gives a **twitch**. If a second stimulus arrives before the muscle has relaxed, the contractions **add up** (**summation**). At a high rate of stimulation the contractions fuse into a smooth, sustained, stronger contraction: **tetanus**. (Model: twitch ${TWITCH.total} ms, contraction ${TWITCH.rise} ms; the boundaries are illustrative.)

**Rigor mortis:** after death **ATP is no longer made**, so myosin heads **cannot detach** from actin and the muscles stay stiff; it sets in a few hours after death and passes off after a day or two, when the muscle proteins break down.`,
      [kt('Motor end plate', 'Junction between a motor neuron and a muscle fibre.'), kt('Cross bridge', 'Link formed when a myosin head binds actin.'), kt('Summation', 'Adding up of contractions when stimuli come before relaxation.'), kt('Tetanus', 'Smooth, sustained contraction at a high rate of stimulation.'), kt('Rigor mortis', 'Stiffness after death due to lack of ATP.')],
      V.tetanus,
      [2],
    ),
    sec(
      '3. The human skeleton',
      `The adult skeleton has **${TOTAL} bones**: **axial skeleton ${AXIAL_N}** and **appendicular skeleton ${APPEND_N}**.

**Axial skeleton (${AXIAL_N}):**
- **Skull ${SKULL_N}:** cranium **${SKULL.cranium}** (frontal 1, parietal 2, temporal 2, occipital 1, sphenoid 1, ethmoid 1), face **${SKULL.face}** (maxillae 2, zygomatic 2, nasal 2, lacrimal 2, palatine 2, inferior nasal conchae 2, vomer 1, mandible 1), **hyoid** ${SKULL.hyoid}, and **ear ossicles** ${SKULL.ossicles} (malleus, incus, stapes in each ear).
- **Vertebral column ${VERT_N}:** cervical ${VERT.cervical} (the first is the **atlas**, the second the **axis**), thoracic ${VERT.thoracic}, lumbar ${VERT.lumbar}, sacrum ${VERT.sacrum} (fused sacral vertebrae) and coccyx ${VERT.coccyx} (fused coccygeal vertebrae). A child has ${VERT_CHILD} separate vertebrae.
- **Sternum 1.**
- **Ribs ${RIB_N}** (12 pairs): ${RIBS.true} **true** pairs, ${RIBS.false} **false** pairs, ${RIBS.floating} **floating** pairs.

**Appendicular skeleton (${APPEND_N}):** **pectoral girdle ${APPEND.pectoral}** (clavicle and scapula on each side); **upper limbs ${APPEND.upper}** (humerus, radius, ulna, 8 carpals, 5 metacarpals, 14 phalanges, each limb); **pelvic girdle ${APPEND.pelvic}** (two hip bones, each of ilium, ischium and pubis fused, with the cup-shaped **acetabulum**); **lower limbs ${APPEND.lower}** (femur, tibia, fibula, patella, 7 tarsals, 5 metatarsals, 14 phalanges, each limb). A hand has ${HAND_N} bones and a foot ${FOOT_N}, so both hands and both feet have ${HANDS_FEET}.

**Functions:** support, protection of organs, movement (bones as levers), attachment of muscles, **blood cell formation** in red bone marrow, and storage of **calcium and phosphate** (and fat in yellow marrow).

*Note on books:* the axial skeleton is ${AXIAL_N} only when the **hyoid and six ear ossicles** are counted in the skull (${SKULL_N}); books that count the skull as ${SKULL.cranium + SKULL.face} bones give a smaller axial total. The **hyoid** is the only bone that does not articulate with another bone.`,
      [kt('Axial skeleton', 'Skull, vertebral column, sternum and ribs: ' + AXIAL_N + ' bones.'), kt('Appendicular skeleton', 'Girdles and limbs: ' + APPEND_N + ' bones.'), kt('Floating ribs', 'The last two pairs, not attached to the sternum.'), kt('Acetabulum', 'Socket of the hip bone that receives the head of the femur.')],
      V.skeleton,
      [3],
    ),
    sec(
      '4. Joints',
      `A **joint** is the place where two or more bones meet. By structure there are three classes:
- **Fibrous joints:** the bones are joined by **dense fibrous connective tissue**; **immovable** (fixed). Example: the **sutures** between the flat bones of the skull.
- **Cartilaginous joints:** the bones are joined by **cartilage**; **slightly movable**. Examples: between the bodies of **adjacent vertebrae** and the **pubic symphysis**.
- **Synovial joints:** a **fluid-filled synovial cavity** between the bone ends; **freely movable**. The ends are covered with **articular cartilage**, the cavity is lined by the **synovial membrane**, which secretes **synovial fluid**, and a **fibrous capsule** with **ligaments** (bone to bone) holds the joint together.

**Types of synovial joint**
| Type | Movement | Examples |
|---|---|---|
| Ball and socket | All directions, including rotation | Shoulder, hip |
| Hinge | One plane (bend and straighten) | Elbow, knee, finger joints |
| Pivot | Rotation about a peg | Atlas and axis (turning the head) |
| Gliding | Sliding of flat surfaces | Between carpals; between tarsals |
| Saddle | Two planes at right angles | Base of the thumb (carpometacarpal) |

*Note on books:* the knee is treated as a hinge in most school books, though it also allows a little rotation; the wrist between radius and carpals is called an ellipsoid (condyloid) joint in some books and is left out of the five-type list in others.`,
      [kt('Suture', 'Fibrous joint between skull bones.'), kt('Synovial fluid', 'Lubricating fluid made by the synovial membrane.'), kt('Ligament', 'Band of connective tissue joining bone to bone.'), kt('Pivot joint', 'Joint in which one bone rotates about a peg of another.')],
      V.joints,
      [4],
      [V.synovial],
    ),
    sec(
      '5. Disorders of muscles and bones',
      `| Disorder | Cause | Main symptom |
|---|---|---|
| **Myasthenia gravis** | Autoimmune: antibodies block **acetylcholine receptors** at the neuromuscular junction | Muscle weakness and fatigue; drooping eyelids, difficulty in swallowing |
| **Tetany** | **Low calcium** ions in the body fluid (for example, fall in parathormone) | Rapid, painful **spasms** of muscles |
| **Muscular dystrophy** | **Genetic**; progressive degeneration of skeletal muscle (the Duchenne type is X-linked and lacks the protein dystrophin) | Progressive wasting and weakness |
| **Arthritis** | **Inflammation of joints**: wear of cartilage (osteoarthritis) or autoimmune attack on the synovial membrane (rheumatoid arthritis) | Pain, stiffness, swelling of joints |
| **Osteoporosis** | **Decreased bone mass**, common in old age and after menopause because of **low oestrogen**; low calcium intake adds to it | Brittle bones; fractures |
| **Gout** | **Uric acid crystals** deposited in joints (high uric acid level) | Sudden, severe pain and swelling, often of the big toe |

Treatment is not asked: drugs that prolong the action of acetylcholine help in myasthenia gravis, and calcium, vitamin D and exercise help to keep bone mass.`,
      [kt('Myasthenia gravis', 'Autoimmune disorder at the neuromuscular junction.'), kt('Tetany', 'Muscle spasms from low calcium.'), kt('Osteoporosis', 'Loss of bone mass; brittle bones.'), kt('Gout', 'Joint inflammation due to uric acid crystals.')],
      table(['Disorder', 'Cause'], [['Myasthenia gravis', 'Antibodies against acetylcholine receptors'], ['Tetany', 'Low calcium'], ['Muscular dystrophy', 'Genetic degeneration'], ['Osteoporosis', 'Decreased bone mass'], ['Gout', 'Uric acid crystals']], 'Table of disorders and causes'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying the A band shortens in contraction (it does not; the I band and H zone narrow).
- Saying the filaments themselves shorten (they slide).
- Forgetting ATP is needed to **detach** the myosin head, not to attach it; this is why rigor mortis happens.
- Mixing up the sarcomere (Z to Z) with the A band (the length of the thick filaments).
- Confusing true, false and floating ribs, or giving the wrong totals (${TOTAL}, ${AXIAL_N}, ${APPEND_N}).
- Naming the knee a ball-and-socket joint (it is a hinge).
- Writing "tetany" for "tetanus": tetany is low calcium; tetanus (muscle) is a fused contraction.

**How marks are usually awarded**
- 1-mark subparts: a band or protein, a bone or joint example, a disorder named from its cause, a give-a-reason.
- 2–3-mark questions: red and white fibres; the role of calcium; rigor mortis; classification of joints; bone counts.
- 5-mark questions in parts: sliding filament theory with a labelled sarcomere; skeleton with numbers; joints with examples; disorders.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Three kinds of movement in humans?', 'Ciliary, flagellar, muscular.', 'fact', 1),
    fc(2, 'Give a human example of flagellar movement.', 'A swimming sperm.', 'fact', 1),
    fc(3, 'Four general properties of muscle?', 'Excitability, contractility, extensibility, elasticity.', 'fact', 1),
    fc(4, 'Which muscle is striated and involuntary?', 'Cardiac muscle.', 'concept', 1),
    fc(5, 'Why are red fibres red?', 'They contain a lot of myoglobin.', 'concept', 1),
    fc(6, 'How do white fibres make ATP?', 'By anaerobic glycolysis, producing lactic acid.', 'concept', 1),
    fc(7, 'What is a sarcomere?', 'The unit of contraction between two Z lines.', 'definition', 2),
    fc(8, 'What is the sarcoplasmic reticulum for?', 'Stores calcium ions.', 'fact', 2),
    fc(9, 'Which band is dark and which is light?', 'A band dark (thick filaments); I band light (thin filaments only).', 'fact', 2),
    fc(10, 'What is the H zone?', 'Middle of the A band without thin filaments.', 'definition', 2),
    fc(11, 'Which band does not change in contraction?', 'The A band.', 'exam-tip', 2),
    fc(12, 'Name the proteins of the thin filament.', 'Actin, tropomyosin, troponin.', 'fact', 2),
    fc(13, 'What do myosin heads have that makes them work?', 'An ATPase site and an actin-binding site.', 'concept', 2),
    fc(14, 'Who proposed the sliding filament theory?', 'Huxley and Huxley (1954).', 'fact', 2),
    fc(15, 'What does calcium bind in contraction?', 'Troponin; tropomyosin then moves aside.', 'concept', 2),
    fc(16, 'What does a new ATP do to a myosin head?', 'Makes it detach from actin.', 'exam-tip', 2),
    fc(17, 'Define summation.', 'Contractions add up when a stimulus comes before relaxation is complete.', 'definition', 2),
    fc(18, 'Why does rigor mortis occur?', 'No ATP after death, so myosin heads stay attached to actin.', 'concept', 2),
    fc(19, 'How many bones are in the adult skeleton?', `${TOTAL}: axial ${AXIAL_N}, appendicular ${APPEND_N}.`, 'fact', 3),
    fc(20, 'Components of the axial skeleton?', `Skull ${SKULL_N}, vertebral column ${VERT_N}, sternum 1, ribs ${RIB_N}.`, 'fact', 3),
    fc(21, 'Bones of the skull count (with ossicles and hyoid)?', `Cranium ${SKULL.cranium}, face ${SKULL.face}, hyoid ${SKULL.hyoid}, ear ossicles ${SKULL.ossicles}.`, 'fact', 3),
    fc(22, 'Adult vertebral regions?', `${VERT.cervical} cervical, ${VERT.thoracic} thoracic, ${VERT.lumbar} lumbar, sacrum, coccyx.`, 'fact', 3),
    fc(23, 'Which ribs are floating?', 'The last two pairs; not joined to the sternum.', 'fact', 3),
    fc(24, 'Which bone does not articulate with another bone?', 'The hyoid.', 'fact', 3),
    fc(25, 'Three classes of joint?', 'Fibrous, cartilaginous, synovial.', 'fact', 4),
    fc(26, 'Example of each synovial type?', 'Ball and socket: hip; hinge: elbow; pivot: atlas and axis; gliding: carpals; saddle: thumb base.', 'exam-tip', 4),
    fc(27, 'What makes synovial fluid?', 'The synovial membrane lining the joint cavity.', 'fact', 4),
    fc(28, 'Cause of myasthenia gravis?', 'Antibodies against acetylcholine receptors.', 'concept', 5),
    fc(29, 'Cause of tetany?', 'Low calcium in body fluids.', 'concept', 5),
    fc(30, 'Cause of gout and osteoporosis?', 'Gout: uric acid crystals in joints. Osteoporosis: decreased bone mass.', 'concept', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
