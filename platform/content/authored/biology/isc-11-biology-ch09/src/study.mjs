// ISC 11 Biology ch09 Structural Organisation in Animals: Frog — notes and flashcards.
import { T, unit, PROV } from '../../isc-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Structural Organisation in Animals: Frog — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Morphology of the frog',
      `The common Indian frog (*Rana tigrina*) lives in water and on land; it is an **amphibian**. Its body is divided into **head** and **trunk**; there is **no neck and no tail** in the adult.

**Skin.** The skin is **smooth, slimy and always moist** because of mucus. The **dorsal** surface is olive green with irregular dark spots, which gives **camouflage**; the **ventral** surface is pale yellow. The frog does not drink water but absorbs it through the skin, and it can change colour slightly to hide from enemies.

**Head.** A pair of **bulging eyes** with a transparent **nictitating membrane** that protects them in water; a pair of **nostrils** at the tip of the snout; and a **tympanum** (the ear drum) on each side behind the eye, which receives sound.

**Limbs.** The **forelimbs** are short, with **four digits**, and support the body. The **hind limbs** are long and muscular with **five webbed toes**, used for **leaping, swimming and burrowing**. A **cloacal aperture** at the posterior end lets out faeces, urine and gametes.

**Sexes.** A **male** has a pair of **vocal sacs** (resonators for the call) and a rough **copulatory pad** on the first digit of each forelimb, which helps to grip the female. A **female** has neither.`,
      [kt('Tympanum', 'The ear drum on each side of the head of a frog.'), kt('Nictitating membrane', 'A transparent membrane that protects the eye under water.'), kt('Vocal sac', 'A throat pouch of the male that amplifies his call.'), kt('Copulatory pad', 'A rough pad on the first digit of the male forelimb.')],
      V.ext,
      [1],
      [V.sex],
    ),
    sec(
      '2. Digestive, respiratory and circulatory systems (brief account)',
      `**Digestive system.** The **alimentary canal is short**, because the frog is a **carnivore** (it eats insects, worms and small animals). Order: **mouth → buccal cavity → pharynx → oesophagus → stomach → duodenum → ileum → rectum → cloaca**. Food is caught by the **bilobed tongue**, which is attached at the front of the mouth. **Digestion:** in the stomach, **hydrochloric acid and gastric juice** digest food, which becomes **chyme** and passes to the **duodenum**. The **liver** makes **bile**, stored in the **gall bladder**; the **pancreas** makes **pancreatic juice** with enzymes; both are poured into the duodenum through a **common duct**. Digestion is completed in the intestine, and absorption takes place through **villi and microvilli**. Undigested waste passes to the rectum and out of the **cloaca**.

**Respiratory system.** *In water:* **cutaneous respiration** — dissolved oxygen diffuses across the moist skin. *On land:* the **skin**, the **buccal cavity** and the **lungs**. The **lungs** are a pair of elongated, pink, sac-like organs in the thorax. **Pulmonary respiration:** air enters through the nostrils into the buccal cavity; when the floor of the buccal cavity is raised, air is forced through the glottis into the lungs. During hibernation and aestivation the frog breathes through the skin alone.

**Circulatory system.** The circulation is **closed**: blood in vessels, with **lymph** as well. The **heart** is **three-chambered** — **right and left atria and one ventricle** — enclosed in a **pericardium**. The **sinus venosus** joins the right atrium, and the **truncus arteriosus** arises from the ventricle. Blood from the body enters the right atrium, and blood from the lungs enters the left atrium (blood from the skin returns through the cutaneous veins with the body blood); **both open into the ventricle, where the blood is mixed**. There are two **portal systems**: the **hepatic portal system** (intestine to liver) and the **renal portal system** (hind limbs to kidneys). The red blood cells are **nucleated** and oval.

*Where books differ.* Some books give the exact pumping of the buccal floor in more detail, or list the arches leaving the truncus arteriosus; the notes follow the brief account in the syllabus.`,
      [kt('Chyme', 'Partly digested food leaving the stomach.'), kt('Cutaneous respiration', 'Gas exchange through the skin.'), kt('Sinus venosus', 'A chamber that receives blood from the veins and opens into the right atrium.'), kt('Portal system', 'A vein that carries blood from one organ to the capillaries of another before it returns to the heart.')],
      V.alim,
      [2],
      [V.breath, V.heart],
    ),
    sec(
      '3. Excretory, nervous and reproductive systems (brief account)',
      `**Excretory system.** A pair of compact, dark red, bean-shaped **kidneys** lies on each side of the backbone. Each is made of many **nephrons** (uriniferous tubules). The frog is **ureotelic**: it excretes **urea**. In the **male** the **ureters** act as **urinogenital ducts**, carrying urine and sperms to the **cloaca**; in the **female** the **ureters** and **oviducts** open **separately** into the cloaca. A thin-walled **urinary bladder** in front of the rectum opens into the cloaca.

**Nervous system.** **Central:** the **brain** (in the cranium) and the **spinal cord**; **peripheral:** **ten pairs of cranial nerves** and the spinal nerves; and an **autonomic** system. The brain has a **forebrain** (two **olfactory lobes**, two **cerebral hemispheres**, the **diencephalon**), a **midbrain** (two **optic lobes**) and a **hindbrain** (the **cerebellum** and the **medulla oblongata**, which passes out through the foramen magnum and continues as the spinal cord). **Sense organs** are for touch, taste, smell, sight and hearing; the ear has a **tympanum** and an inner ear only.

**Reproductive system.** *Male:* a pair of yellowish **testes** attached to the kidneys; fine **vasa efferentia** carry sperms into the kidney, and the **urinogenital duct** takes them to the cloaca. *Female:* a pair of **ovaries** near the kidneys, with no functional connection with them; **oviducts** open separately into the cloaca. **Fertilisation is external**, in water; **development is indirect** through a **tadpole**, which undergoes **metamorphosis**. A female lays a large number of ova at a time, since many are lost.`,
      [kt('Ureotelic', 'Excreting urea as the main nitrogenous waste.'), kt('Cloaca', 'The common chamber for faeces, urine and gametes.'), kt('Urinogenital duct', 'In the male, the duct carrying both urine and sperms.'), kt('Metamorphosis', 'Change of a tadpole into a young frog.')],
      V.male,
      [3],
      [V.female, V.brain],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Giving the frog a neck or a tail.
- Saying that the alimentary canal is long; it is short because the frog is a carnivore.
- Saying that the stomach receives bile; bile and pancreatic juice enter the **duodenum**.
- Writing that the frog heart has four chambers, or that the blood in the ventricle is unmixed.
- Saying that a frog breathes only through lungs, or only through skin.
- Writing that in a female frog the oviducts and ureters join; they open separately into the cloaca.
- Writing that fertilisation in a frog is internal.

**How marks are usually awarded**
- 1-mark subparts: a part of the canal, the number of chambers of the heart, a lettered figure, a give-a-reason.
- 2- and 3-mark questions: male against female; the organs of respiration; the path of food; the ducts of the male and the female.
- 5-mark questions in parts: a labelled diagram of the alimentary canal, urinogenital system or brain with a short account.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Two regions of the frog body?', 'Head and trunk (no neck, no tail).', 'fact', 1),
    fc(2, 'Colour of the frog skin?', 'Olive green with dark spots above; pale yellow below.', 'fact', 1),
    fc(3, 'Why must the skin stay moist?', 'Gas exchange through the skin.', 'concept', 1),
    fc(4, 'What protects the eye under water?', 'Nictitating membrane.', 'fact', 1),
    fc(5, 'What is the tympanum?', 'The ear drum, on each side behind the eye.', 'definition', 1),
    fc(6, 'Digits on forelimb and hind limb?', 'Four and five (webbed).', 'fact', 1),
    fc(7, 'Use of webbed hind limbs?', 'Leaping, swimming, burrowing.', 'concept', 1),
    fc(8, 'Two male features?', 'Vocal sacs and copulatory pad.', 'exam-tip', 1),
    fc(9, 'Use of the copulatory pad?', 'Gripping the female.', 'concept', 1),
    fc(10, 'Parts of the canal in order?', 'Mouth, buccal cavity, pharynx, oesophagus, stomach, duodenum, ileum, rectum, cloaca.', 'exam-tip', 2),
    fc(11, 'Why is the canal short?', 'The frog is a carnivore.', 'concept', 2),
    fc(12, 'Where is the tongue attached?', 'At the front of the mouth; bilobed.', 'fact', 2),
    fc(13, 'What does the liver make?', 'Bile.', 'fact', 2),
    fc(14, 'Where is bile stored?', 'Gall bladder.', 'fact', 2),
    fc(15, 'Where do bile and pancreatic juice enter?', 'The duodenum, by a common duct.', 'exam-tip', 2),
    fc(16, 'How is digested food absorbed?', 'Through villi and microvilli of the intestine.', 'concept', 2),
    fc(17, 'Respiration in water?', 'Through the skin (cutaneous).', 'fact', 2),
    fc(18, 'Respiration on land?', 'Skin, buccal cavity and lungs.', 'fact', 2),
    fc(19, 'Where are the lungs?', 'In the thorax; a pair of sac-like organs.', 'fact', 2),
    fc(20, 'Chambers of the frog heart?', 'Two atria and one ventricle.', 'exam-tip', 2),
    fc(21, 'What happens in the ventricle?', 'Oxygenated and deoxygenated blood mix.', 'concept', 2),
    fc(22, 'Two portal systems?', 'Hepatic portal and renal portal.', 'fact', 2),
    fc(23, 'Frog is ureotelic: meaning?', 'Excretes urea.', 'definition', 3),
    fc(24, 'Structural unit of the kidney?', 'Nephron (uriniferous tubule).', 'fact', 3),
    fc(25, 'Male duct for urine and sperms?', 'Urinogenital duct (ureter).', 'exam-tip', 3),
    fc(26, 'Female: ureter and oviduct open where?', 'Separately into the cloaca.', 'exam-tip', 3),
    fc(27, 'Three regions of the brain?', 'Forebrain, midbrain, hindbrain.', 'fact', 3),
    fc(28, 'Where are the optic lobes?', 'In the midbrain.', 'fact', 3),
    fc(29, 'Pairs of cranial nerves?', 'Ten.', 'fact', 3),
    fc(30, 'Fertilisation in the frog?', 'External, in water; development through a tadpole.', 'fact', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
