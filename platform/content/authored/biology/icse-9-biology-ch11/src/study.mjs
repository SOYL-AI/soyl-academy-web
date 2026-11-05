// ICSE 9 Biology ch11 notes and flashcards.
import { T, unit, PROV } from '../../icse-9-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Skeleton: Movement and Locomotion — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Functions of the human skeleton',
      `The **skeleton** is the framework of bones, cartilage and joints. Its functions are:

1. **Support and shape:** it holds the body up and gives it its shape.
2. **Protection:** the **skull** protects the brain; the **rib cage** (ribs and sternum) protects the heart and lungs; the **vertebral column** protects the spinal cord.
3. **Movement and locomotion:** muscles pull on bones across joints, so the bones act as levers.
4. **Attachment of muscles:** bones give firm places for muscles to be fixed by tendons.
5. **Making blood cells:** red bone marrow in some bones makes red blood cells, white blood cells and platelets.
6. **Storage of minerals:** bones store **calcium** and **phosphorus** and release them when the body needs them.

Bones are living tissue: they grow, repair themselves and carry blood vessels. Books may add that the small bones of the middle ear carry sound and that yellow marrow stores fat; the six points above are the core.`,
      [kt('Skeleton', 'The framework of bones that supports the body.'), kt('Red bone marrow', 'The soft tissue inside some bones that makes blood cells.'), kt('Tendon', 'A strong cord that joins a muscle to a bone.')],
      null,
      [1],
    ),
    sec(
      '2. Axial and appendicular skeleton',
      `The adult skeleton has about **206** bones, in two parts.

**Axial skeleton** (lies along the axis of the body; about 80 bones):
- **Skull:** 8 cranial bones and 14 facial bones.
- **Vertebral column:** 7 **cervical** (neck), 12 **thoracic** (chest, carrying ribs), 5 **lumbar** (lower back), 5 **sacral** (fused into the **sacrum**) and 4 **coccygeal** (fused into the **coccyx**): 33 vertebrae in a child, 26 bones in an adult.
- **Ribs:** 12 pairs (7 pairs **true ribs** joined to the sternum, 3 pairs **false ribs**, 2 pairs **floating ribs**).
- **Sternum** (breastbone): 1.
- Many books also place the **hyoid** (1) and the small **ear bones** (6) here.

**Appendicular skeleton** (limbs and girdles; about 126 bones):
- **Pectoral girdle:** a clavicle (collar bone) and a scapula (shoulder blade) on each side.
- **Upper limb** (30 each): humerus, radius, ulna, 8 carpals, 5 metacarpals, 14 phalanges.
- **Pelvic girdle:** 2 hip bones (joined to the sacrum).
- **Lower limb** (30 each): femur, patella (knee cap), tibia, fibula, 7 tarsals, 5 metatarsals, 14 phalanges.

Counts differ a little between books (for example, whether the hyoid and ear bones are counted, and a child has more bones than an adult because some fuse); the totals 206, 80 and 126 are the usual ones.`,
      [kt('Axial skeleton', 'Skull, vertebral column, ribs and sternum.'), kt('Appendicular skeleton', 'The bones of the limbs and of the girdles that join them to the axial skeleton.'), kt('Girdle', 'A ring of bones that attaches a limb to the axial skeleton.')],
      V.skeleton,
      [2],
      [V.column],
    ),
    sec(
      '3. Joints',
      `A **joint** is a place where two or more bones meet.

| Kind | Movement | Location |
|---|---|---|
| **Immovable (fixed)** | None | Between the bones of the skull (sutures) |
| **Slightly movable** | A little | Between the vertebrae; the pubic joint at the front of the pelvis |
| **Freely movable** | Wide | Shoulder, elbow, hip, knee, wrist, ankle, neck |

**Types of freely movable joints**

| Type | Movement | Location |
|---|---|---|
| **Ball and socket** | In all directions, and rotation | Shoulder, hip |
| **Hinge** | Back and forth in one plane, like a door | Elbow, knee, joints of the fingers and toes |
| **Pivot** | One bone turns round another | Atlas on axis in the neck (turning the head) |
| **Gliding** | Small sliding movements | Wrist (between carpals), ankle (between tarsals) |

Most freely movable joints are enclosed in a capsule with **synovial fluid**, have **cartilage** on the bone ends and are held by **ligaments**.

The shoulder, with its shallow socket, moves most widely; the hip, with a deeper socket, is more stable. Books also describe other types (saddle, condyloid), which are not part of this chapter.`,
      [kt('Joint', 'A place where two or more bones meet.'), kt('Synovial fluid', 'The oily fluid in freely movable joints that reduces friction.'), kt('Ligament', 'A strong band that joins one bone to another.'), kt('Suture', 'The immovable joint between the bones of the skull.')],
      V.joints,
      [3],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Listing the **girdles** under the axial skeleton; they belong to the **appendicular** skeleton.
- Saying the knee or elbow is a **ball and socket** joint; both are **hinge** joints.
- Writing the skull as a **freely movable** joint; its joints are **immovable**.
- Giving a joint without its **location**, or movement without naming the **type**.
- Writing **single words** for functions with no example.

**How marks are usually awarded**
- 1 mark: a term, an odd one out **with its category**, a give-reason item.
- 2 marks: two functions or two points, matched.
- 3 marks: three differences between joints, or three functions with examples.
- 10-mark structured question: a short situation or diagram with parts of 2 to 4 marks; one part is a labelled diagram.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Name six functions of the skeleton.', 'Support, protection, movement, muscle attachment, making blood cells, storing minerals.', 'fact', 1),
    fc(2, 'What does the skull protect?', 'The brain.', 'fact', 1),
    fc(3, 'What do the ribs and sternum protect?', 'The heart and lungs.', 'fact', 1),
    fc(4, 'What does the vertebral column protect?', 'The spinal cord.', 'fact', 1),
    fc(5, 'Where are blood cells made in bones?', 'In the red bone marrow.', 'fact', 1),
    fc(6, 'Which minerals do bones store?', 'Calcium and phosphorus.', 'fact', 1),
    fc(7, 'How do bones help movement?', 'Muscles pull on them, and they act as levers.', 'concept', 1),
    fc(8, 'Tendon?', 'A cord that joins a muscle to a bone.', 'definition', 1),
    fc(9, 'Number of bones in an adult skeleton?', 'About 206.', 'fact', 2),
    fc(10, 'Parts of the axial skeleton?', 'Skull, vertebral column, ribs, sternum.', 'fact', 2),
    fc(11, 'Parts of the appendicular skeleton?', 'Girdles and limb bones.', 'fact', 2),
    fc(12, 'Bones in the skull?', '22: 8 cranial and 14 facial.', 'fact', 2),
    fc(13, 'Regions of the vertebral column?', 'Cervical 7, thoracic 12, lumbar 5, sacral 5 (fused), coccygeal 4 (fused).', 'fact', 2),
    fc(14, 'Vertebrae in a child, and bones of the column in an adult?', '33 in a child; 26 in an adult.', 'fact', 2),
    fc(15, 'How many ribs?', '12 pairs, 24 in all.', 'fact', 2),
    fc(16, 'Pectoral girdle?', 'Clavicle and scapula on each side.', 'fact', 2),
    fc(17, 'Pelvic girdle?', 'Two hip bones.', 'fact', 2),
    fc(18, 'Bones of the upper limb?', 'Humerus, radius, ulna, carpals, metacarpals, phalanges.', 'fact', 2),
    fc(19, 'Bones of the lower limb?', 'Femur, patella, tibia, fibula, tarsals, metatarsals, phalanges.', 'fact', 2),
    fc(20, 'Is the sternum axial or appendicular?', 'Axial.', 'fact', 2),
    fc(21, 'Joint?', 'A place where two or more bones meet.', 'definition', 3),
    fc(22, 'Three kinds of joints by movement?', 'Immovable, slightly movable, freely movable.', 'fact', 3),
    fc(23, 'Where are immovable joints found?', 'Between the bones of the skull.', 'fact', 3),
    fc(24, 'Where are slightly movable joints found?', 'Between vertebrae and at the front of the pelvis.', 'fact', 3),
    fc(25, 'Four freely movable joints?', 'Ball and socket, hinge, pivot, gliding.', 'fact', 3),
    fc(26, 'Ball and socket joint: movement and location?', 'All directions; shoulder and hip.', 'fact', 3),
    fc(27, 'Hinge joint: movement and location?', 'One plane; elbow and knee.', 'fact', 3),
    fc(28, 'Pivot joint: movement and location?', 'Rotation; atlas on axis in the neck.', 'fact', 3),
    fc(29, 'Gliding joint: movement and location?', 'Sliding; wrist and ankle.', 'fact', 3),
    fc(30, 'What reduces friction in a freely movable joint?', 'Synovial fluid and smooth cartilage.', 'concept', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
