// ch17 notes and flashcards.
import { T, table, unit, PROV } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { RELAXED, CONTRACTED, TOTAL_N, AXIAL_N, APPEND_N } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = [], formulas = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Locomotion and Movement — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Types of movement; muscle structure and contraction',
      `**Movement** is a significant feature of living beings. Voluntary movements that result in a change of place or location are **locomotion** (walking, running, climbing, flying, swimming). All locomotions are movements, but all movements are not locomotions. In *Paramecium*, cilia move food through the cytopharynx and also help in locomotion; *Hydra* uses its tentacles to capture prey and to move.

**Types of movement in human cells**
- **Amoeboid:** macrophages and leucocytes in blood move by **pseudopodia**, formed by streaming of protoplasm (as in *Amoeba*); cytoskeletal elements such as microfilaments are involved.
- **Ciliary:** occurs in internal tubular organs lined by ciliated epithelium; coordinated beating of cilia in the **trachea** removes dust particles and foreign substances inhaled with air, and passage of **ova** through the female reproductive tract is helped by ciliary movement.
- **Muscular:** movement of limbs, jaws and tongue needs muscular movement; locomotion needs the coordinated activity of the muscular, skeletal and neural systems.

**Muscle** is a specialised tissue of **mesodermal** origin forming about **40–50 percent** of an adult’s body weight; it shows excitability, contractility, extensibility and elasticity.
- **Skeletal** muscles are attached to bones, striated and voluntary; they help in locomotion and changes of body posture.
- **Visceral** muscles lie in the inner walls of hollow visceral organs (alimentary canal, reproductive tract); they are smooth (non-striated) and involuntary, and help, for example, in moving food through the digestive tract and gametes through the genital tract.
- **Cardiac** muscles form the heart; many cells assemble in a branching pattern; they are striated and involuntary.

**Structure of a skeletal muscle.** A muscle is made of bundles called **fascicles**, held together by a collagenous connective tissue layer, the **fascia**. Each **muscle fibre** is lined by the plasma membrane (**sarcolemma**) around the **sarcoplasm**; the fibre is a **syncytium** (many nuclei). The endoplasmic reticulum, the **sarcoplasmic reticulum**, is the **store of calcium ions**. Many parallel **myofibrils** (myofilaments) in the sarcoplasm show alternate dark and light bands: the **light I band** contains **actin** and is **isotropic**; the **dark A band** contains **myosin** and is **anisotropic**. An elastic **Z line** bisects each I band; thin filaments are firmly attached to it. Thick filaments in the A band are held together in the middle by the thin **M line**. The central part of the A band not overlapped by thin filaments is the **H zone**. The portion of the myofibril between two successive Z lines is a **sarcomere**, the functional unit of contraction.

**Contractile proteins.** Each actin (thin) filament is made of two **F (filamentous) actins** helically wound; each F-actin is a polymer of **G (globular) actins**. Two filaments of **tropomyosin** run close to the F-actins along their length, and the complex protein **troponin** is distributed at regular intervals; in the resting state a subunit of troponin **masks the active binding sites for myosin**. Each myosin (thick) filament is a polymerised protein; its monomer, **meromyosin**, has a globular **head with a short arm** (**heavy meromyosin, HMM**) and a **tail** (**light meromyosin, LMM**). The HMM projects outwards from the filament as a **cross arm**; the globular head is an active **ATPase** with binding sites for ATP and active sites for actin.

**Mechanism: the sliding filament theory.** Contraction of a muscle fibre takes place by the sliding of the thin filaments over the thick filaments.
1. A signal from the CNS via a **motor neuron** reaches the **neuromuscular junction** (motor end plate); a motor neuron with the fibres it supplies is a **motor unit**.
2. **Acetylcholine** released there generates an **action potential** in the sarcolemma, which spreads through the fibre.
3. **Calcium ions** are released from the sarcoplasmic reticulum into the sarcoplasm.
4. Ca²⁺ binds to a subunit of **troponin** on the actin filaments, removing the masking of the active sites for myosin.
5. Using energy from **ATP hydrolysis**, the myosin head binds to the exposed sites on actin to form a **cross bridge**, which pulls the attached actin filaments towards the centre of the **A band**. The Z lines are pulled inwards and the sarcomere shortens (contraction). The **I bands shorten**, the **H zone narrows**, and the **A band keeps its length**.
6. The myosin, releasing ADP and Pi, goes back to its relaxed state; a new ATP binds and the cross bridge is broken. The cycle of cross-bridge formation and breakage repeats, causing further sliding.
7. The process continues until Ca²⁺ ions are pumped back into the sarcoplasmic cisternae, which again masks the actin filaments; the Z lines return to their original position (**relaxation**).

With illustrative lengths, a ${RELAXED.L} μm sarcomere with a ${RELAXED.A} μm A band has an I band of ${RELAXED.I} μm and an H zone of ${RELAXED.H} μm; at ${CONTRACTED.L} μm these become ${CONTRACTED.I} μm and ${CONTRACTED.H} μm, while the A band stays ${CONTRACTED.A} μm.

**Fatigue.** Repeated activation of muscles can lead to accumulation of **lactic acid** from the anaerobic breakdown of glycogen, causing fatigue. **Red fibres** contain plenty of the red, oxygen-storing pigment **myoglobin** and many mitochondria, and are called **aerobic muscles**. **White fibres** have very little myoglobin and fewer mitochondria but a large amount of sarcoplasmic reticulum, and depend on anaerobic processes for energy.`,
      [kt('Locomotion', 'A voluntary movement that changes the place or location of the body.'), kt('Sarcomere', 'The part of a myofibril between two successive Z lines; the functional unit of contraction.'), kt('Sarcoplasmic reticulum', 'The endoplasmic reticulum of a muscle fibre; the store of calcium ions.'), kt('Cross bridge', 'The link formed when a myosin head binds to an exposed active site on actin.'), kt('Myoglobin', 'A red, oxygen-storing pigment abundant in red (aerobic) muscle fibres.')],
      V.sarcomere,
      [1],
      [V.proteins],
    ),
    sec(
      '2. Skeletal system and joints',
      `The skeletal system is a framework of **bones** and a few **cartilages**. Bone has a very hard matrix due to **calcium salts**; cartilage has a slightly pliable matrix due to **chondroitin salts**. In human beings the skeletal system has **${TOTAL_N} bones**, grouped into the **axial skeleton (${AXIAL_N} bones)** and the **appendicular skeleton (${APPEND_N} bones)**.

**Axial skeleton** — skull, vertebral column, sternum and ribs.
- **Skull:** 8 **cranial** bones forming the hard protective cranium, and 14 **facial** bones forming the front part; a single U-shaped **hyoid** bone at the base of the buccal cavity and three **ear ossicles** (malleus, incus, stapes) in each middle ear are included in the skull region (29 bones). The skull joins the vertebral column through **two occipital condyles** (dicondylic skull).
- **Vertebral column:** 26 serially arranged vertebrae, dorsally placed: **cervical 7, thoracic 12, lumbar 5, sacral 1 (fused), coccygeal 1 (fused)**. Each vertebra has a central **neural canal** through which the spinal cord passes. The first vertebra, the **atlas**, articulates with the occipital condyles. The number of cervical vertebrae is seven in almost all mammals, including humans. The column protects the spinal cord, supports the head and gives attachment to the ribs and back muscles.
- **Sternum:** a flat bone on the ventral midline of the thorax.
- **Ribs:** 12 pairs; each is a thin flat bone joined dorsally to the vertebral column and ventrally to the sternum, with two articulation surfaces on its dorsal end (**bicephalic**). The first seven pairs are **true ribs**, attached ventrally to the sternum by hyaline cartilage; the **8th, 9th and 10th** pairs do not join the sternum directly but join the seventh rib by hyaline cartilage (**vertebrochondral** or false ribs); the **11th and 12th** pairs are not connected ventrally (**floating ribs**). Thoracic vertebrae, ribs and sternum together form the **rib cage**.

**Appendicular skeleton** — limbs and girdles.
- **Fore limb (hand):** humerus, radius and ulna, 8 **carpals** (wrist), 5 **metacarpals** (palm) and 14 **phalanges** (digits) — 30 bones.
- **Hind limb (leg):** **femur** (thigh bone, the longest bone), tibia and fibula, 7 **tarsals** (ankle), 5 **metatarsals** and 14 phalanges, and a cup-shaped **patella** covering the knee ventrally (knee cap) — 30 bones.
- **Pectoral girdle:** each half has a **clavicle** (collar bone) and a **scapula**; the scapula, a large triangular flat bone in the dorsal part of the thorax between the second and seventh ribs, has a flat projection, the **acromion**, which articulates with the clavicle, and below it a depression, the **glenoid cavity**, which articulates with the head of the humerus to form the shoulder joint.
- **Pelvic girdle:** two **coxal** bones, each formed by fusion of the **ilium, ischium and pubis**; at their point of fusion is a cavity, the **acetabulum**, to which the thigh bone articulates. The two halves meet ventrally to form the **pubic symphysis** (fibrous cartilage).

**Joints** are points of contact between bones, or between bones and cartilages. Force generated by the muscles is used to carry out movement through joints, where the joint acts as a **fulcrum**.
- **Fibrous joints** do not allow any movement; flat skull bones fuse end to end with dense fibrous connective tissue as **sutures** to form the cranium.
- **Cartilaginous joints** have the bones joined together with cartilage and permit **limited** movement, for example between adjacent vertebrae.
- **Synovial joints** have a fluid-filled **synovial cavity** between the articulating surfaces and allow **considerable** movement: **ball and socket** (humerus and pectoral girdle), **hinge** (knee joint), **pivot** (atlas and axis), **gliding** (between the carpals), **saddle** (carpal and metacarpal of the thumb).`,
      [kt('Axial skeleton', `The ${AXIAL_N} bones along the main axis: skull, vertebral column, sternum and ribs.`), kt('Appendicular skeleton', `The ${APPEND_N} bones of the limbs and girdles.`), kt('Floating ribs', 'The 11th and 12th pairs of ribs, not connected ventrally.'), kt('Synovial joint', 'A joint with a fluid-filled synovial cavity between the articulating bones, allowing considerable movement.'), kt('Acetabulum', 'The cavity of the coxal bone, at the fusion of ilium, ischium and pubis, into which the thigh bone fits.')],
      V.skeleton,
      [2],
      [V.vertebral, V.joints],
    ),
    sec(
      '3. Disorders of the muscular and skeletal systems',
      `- **Myasthenia gravis:** an **autoimmune** disorder affecting the **neuromuscular junction**, leading to fatigue, weakening and paralysis of skeletal muscle.
- **Muscular dystrophy:** progressive **degeneration of skeletal muscle**, mostly due to a **genetic** disorder.
- **Tetany:** rapid spasms (wild contractions) in muscle due to **low Ca²⁺** in body fluid.
- **Arthritis:** **inflammation of joints**.
- **Osteoporosis:** an **age-related** disorder characterised by **decreased bone mass** and increased chances of **fractures**; **decreased levels of oestrogen** is a common cause.
- **Gout:** inflammation of joints due to accumulation of **uric acid crystals**.`,
      [kt('Myasthenia gravis', 'Autoimmune disorder of the neuromuscular junction causing fatigue, weakness and paralysis of skeletal muscle.'), kt('Tetany', 'Rapid spasms in muscle due to low Ca²⁺ in body fluid.'), kt('Osteoporosis', 'Age-related loss of bone mass with more fractures; low oestrogen is a common cause.')],
      table(['Disorder', 'Part affected', 'Cause in brief'], [['Myasthenia gravis', 'Neuromuscular junction', 'Autoimmune'], ['Muscular dystrophy', 'Skeletal muscle', 'Mostly genetic'], ['Tetany', 'Muscle', 'Low Ca²⁺ in body fluid'], ['Arthritis', 'Joints', 'Inflammation'], ['Osteoporosis', 'Bone', 'Ageing; low oestrogen'], ['Gout', 'Joints', 'Uric acid crystals']], 'Table of six disorders with the part affected and cause'),
      [3],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing that the A band shortens during contraction (it stays constant; the I band and H zone shorten).
- Putting actin in the A band only or myosin in the I band (the I band has only actin; the A band has myosin, overlapped by actin except in the H zone).
- Saying calcium binds to tropomyosin or to myosin (it binds to a subunit of troponin).
- Saying ATP is needed only to form cross bridges (a new ATP is also needed to break the cross bridge).
- Counting the hyoid and ear ossicles outside the skull region, or forgetting the patella in the hind limb.
- Calling ribs 8–10 floating ribs (they are false, vertebrochondral ribs; 11–12 are floating).
- Mixing up gout (uric acid) and tetany (low Ca²⁺).

**How marks are usually awarded**
- 1-mark items: name a band, a protein, a joint, a bone or a disorder.
- 2–3-mark answers: types of muscle; red and white fibres; actin or myosin structure; kinds of ribs; joints with examples; disorders.
- 5-mark answers: sliding filament theory with a labelled sarcomere; the axial and appendicular skeleton with counts; joints.
- Case-based items: sarcomere measurements, fibre types and fatigue, an injured joint, or clinic cases of disorders, with a 2-mark part with an internal choice.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Movement vs locomotion?', 'Locomotion is movement that changes the place of the body; not all movements are locomotion.', 'concept', 1),
    fc(2, 'Amoeboid movement in humans?', 'Macrophages and leucocytes, by pseudopodia.', 'fact', 1),
    fc(3, 'Two examples of ciliary movement?', 'Dust removal in the trachea; passage of ova in the female reproductive tract.', 'fact', 1),
    fc(4, 'Three kinds of muscle?', 'Skeletal (striated, voluntary), visceral (smooth, involuntary), cardiac (striated, involuntary).', 'concept', 1),
    fc(5, 'Bundles of muscle fibres are called?', 'Fascicles, held by fascia.', 'definition', 1),
    fc(6, 'Store of calcium in a muscle fibre?', 'Sarcoplasmic reticulum.', 'fact', 1),
    fc(7, 'I band contains? A band contains?', 'I band: actin (isotropic). A band: myosin (anisotropic).', 'fact', 1),
    fc(8, 'What is a sarcomere?', 'Portion of a myofibril between two successive Z lines; functional unit of contraction.', 'definition', 1),
    fc(9, 'H zone?', 'Central part of the A band not overlapped by thin filaments.', 'definition', 1),
    fc(10, 'Actin filament structure?', 'Two F-actins (polymers of G-actin) helically wound, with tropomyosin and troponin.', 'concept', 1),
    fc(11, 'Parts of meromyosin?', 'Heavy meromyosin (head and short arm) and light meromyosin (tail).', 'fact', 1),
    fc(12, 'Myosin head activities?', 'ATPase; binding sites for ATP and actin.', 'fact', 1),
    fc(13, 'Neurotransmitter at the motor end plate?', 'Acetylcholine.', 'fact', 1),
    fc(14, 'Ca²⁺ binds to?', 'A subunit of troponin, unmasking myosin-binding sites on actin.', 'concept', 1),
    fc(15, 'Which band stays constant in contraction?', 'A band (I band and H zone shorten).', 'concept', 1),
    fc(16, 'What breaks the cross bridge?', 'Binding of a new ATP to the myosin head.', 'concept', 1),
    fc(17, 'Cause of muscle fatigue?', 'Lactic acid from anaerobic breakdown of glycogen.', 'concept', 1),
    fc(18, 'Red vs white fibres?', 'Red: much myoglobin, many mitochondria, aerobic. White: little myoglobin, much sarcoplasmic reticulum, anaerobic.', 'concept', 1),
    fc(19, 'Bones in the human skeleton?', `${TOTAL_N}: axial ${AXIAL_N}, appendicular ${APPEND_N}.`, 'fact', 2),
    fc(20, 'Bones in the skull region?', '29: 8 cranial, 14 facial, hyoid, 6 ear ossicles.', 'fact', 2),
    fc(21, 'Vertebral formula?', 'Cervical 7, thoracic 12, lumbar 5, sacral 1, coccygeal 1 = 26.', 'formula', 2),
    fc(22, 'True, false and floating ribs?', 'True 1–7; false (vertebrochondral) 8–10; floating 11–12.', 'fact', 2),
    fc(23, 'Bones of one fore limb?', 'Humerus, radius, ulna, 8 carpals, 5 metacarpals, 14 phalanges = 30.', 'fact', 2),
    fc(24, 'Three bones fused in a coxal bone?', 'Ilium, ischium and pubis.', 'fact', 2),
    fc(25, 'Glenoid cavity and acetabulum?', 'Glenoid cavity (scapula) takes the humerus; acetabulum (coxal bone) takes the femur.', 'fact', 2),
    fc(26, 'Three kinds of joints?', 'Fibrous (no movement), cartilaginous (limited), synovial (considerable).', 'concept', 2),
    fc(27, 'Five synovial joints with examples?', 'Ball and socket (shoulder), hinge (knee), pivot (atlas–axis), gliding (carpals), saddle (thumb carpal–metacarpal).', 'fact', 2),
    fc(28, 'Myasthenia gravis?', 'Autoimmune disorder of the neuromuscular junction: fatigue, weakness, paralysis.', 'definition', 3),
    fc(29, 'Tetany vs gout?', 'Tetany: spasms from low Ca²⁺. Gout: joint inflammation from uric acid crystals.', 'concept', 3),
    fc(30, 'Osteoporosis?', 'Age-related loss of bone mass, more fractures; low oestrogen a common cause.', 'definition', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
