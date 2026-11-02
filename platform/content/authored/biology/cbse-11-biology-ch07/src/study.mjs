// ch07 notes and flashcards.
import { T, table, unit, PROV } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = [], formulas = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Structural Organisation in Animals — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Animal tissues: epithelial and connective',
      `A **tissue** is a group of similar cells, together with the intercellular substance, that performs a specific function. Organs are built from tissues and organs work together as organ systems. Animal tissues are of four basic types: **epithelial, connective, muscular and neural**.

**Epithelial tissue** covers body surfaces and lines body cavities, ducts and tubes. Its cells are compactly packed with little intercellular matrix and rest on a **basement membrane**.
- **Simple epithelium** (one layer): **squamous** — a single thin layer of flat cells with irregular boundaries, in the walls of blood vessels and the air sacs of lungs, where diffusion occurs; **cuboidal** — cube-like cells in the ducts of glands and the tubular parts of nephrons, with **microvilli** on the cells of the proximal convoluted tubule; **columnar** — tall, slender cells with nuclei at the base, lining the stomach and intestine, with microvilli for absorption; **ciliated** — cuboidal or columnar cells bearing cilia that move particles or mucus in one direction, in the bronchioles and fallopian tubes.
- **Glandular epithelium**: cuboidal or columnar cells specialised for secretion. **Unicellular** glands are isolated cells such as the **goblet cells** of the alimentary canal; **multicellular** glands are clusters such as the **salivary gland**. **Exocrine** glands secrete mucus, saliva, earwax, oil, milk and digestive enzymes through ducts; **endocrine** glands have no ducts and release **hormones** directly into the fluid bathing the gland.
- **Compound epithelium** (two or more layers) has a limited role in secretion and absorption; it protects against chemical and mechanical stresses. It covers the dry surface of the **skin** and lines the moist **buccal cavity, pharynx**, the inner lining of the ducts of **salivary glands** and of **pancreatic ducts**.
- **Cell junctions**: **tight junctions** stop substances leaking across a tissue; **adhering junctions** cement neighbouring cells together; **gap junctions** connect the cytoplasm of adjoining cells for rapid transfer of ions, small molecules and sometimes big molecules.

**Connective tissues** are the most abundant and widely distributed tissues; they link and support other tissues. In all except blood, the cells secrete fibres of **collagen** or **elastin**, which give strength, elasticity and flexibility, and modified polysaccharides that form the **matrix** (ground substance).
- **Loose connective tissue**: cells and fibres loosely arranged in a semi-fluid ground substance. **Areolar tissue** beneath the skin supports the epithelium and contains **fibroblasts** (which make fibres), **macrophages** and **mast cells**. **Adipose tissue**, also beneath the skin, stores fats made from nutrients not used immediately.
- **Dense connective tissue**: fibres and fibroblasts compactly packed. **Dense regular**: collagen fibres in parallel rows between rows of fibroblasts — **tendons** attach skeletal muscle to bone and **ligaments** attach bone to bone. **Dense irregular**: fibres oriented in different directions, as in the **skin**.
- **Specialised connective tissue**: **cartilage** — a solid, pliable matrix of chondroitin salts that resists compression, with **chondrocytes** in small cavities (lacunae); found at the tip of the nose, outer ear joints, between adjacent vertebrae and in the limbs and hands of adults. **Bone** — a hard, non-pliable matrix rich in **calcium salts and collagen**, with **osteocytes** in lacunae; it supports and protects soft organs, interacts with muscles for movement, and the **bone marrow** of some bones produces blood cells. **Blood** — a fluid connective tissue of plasma, red blood cells, white blood cells and platelets, the main circulating fluid that transports substances.`,
      [kt('Basement membrane', 'The thin layer on which epithelial cells rest.'), kt('Exocrine gland', 'A gland that releases its secretion through a duct.'), kt('Gap junction', 'A junction that connects the cytoplasm of adjoining cells for rapid transfer of ions and molecules.'), kt('Tendon', 'Dense regular connective tissue attaching skeletal muscle to bone.'), kt('Ligament', 'Dense regular connective tissue attaching one bone to another.')],
      V.epithelia,
      [1],
      [V.connective],
    ),
    sec(
      '2. Animal tissues: muscular and neural',
      `**Muscle tissue** is made of long, cylindrical fibres arranged in parallel; each fibre contains many fine **myofibrils**. Fibres contract (shorten) in response to stimulation and then relax, in a coordinated way, to move the body and its parts.
- **Skeletal muscle**: closely attached to skeletal bones; fibres are **striated**, unbranched and **multinucleate**, bundled together in parallel; **voluntary** (for example the biceps).
- **Smooth muscle**: fibres **taper at both ends** (fusiform) and show **no striations**; cell junctions hold them together in bundles; found in the walls of **blood vessels, stomach and intestine**; **involuntary**.
- **Cardiac muscle**: the contractile tissue found **only in the heart**; striated and branched; cell junctions fuse the plasma membranes of cardiac cells, and **communication junctions (intercalated discs)** at some fusion points allow the cells to **contract as a unit**; involuntary.

**Neural tissue** exerts the greatest control over the body’s responsiveness to changing conditions. **Neurons**, the unit of the neural system, are excitable cells. **Neuroglial cells** protect and support neurons and make up **more than half the volume** of neural tissue in our body. When a neuron is suitably stimulated, an electrical disturbance is generated which travels swiftly along its plasma membrane; its arrival at the neuron’s endings (axon terminals) triggers stimulation or inhibition of adjacent neurons and other cells.`,
      [kt('Myofibril', 'A fine contractile fibril inside a muscle fibre.'), kt('Intercalated disc', 'A communication junction between cardiac muscle cells that lets them contract as a unit.'), kt('Neuroglia', 'Cells that protect and support neurons; over half the volume of neural tissue.')],
      V.muscles,
      [1],
      [V.neuron],
    ),
    sec(
      '3. The frog: morphology',
      `The common Indian frog is ***Rana tigrina***. Frogs live on land and in fresh water and belong to the class **Amphibia** of phylum Chordata.

**Habits.** Frogs are **cold-blooded (poikilotherms)**: their body temperature varies with the environment. They can **change colour** to hide from enemies (**camouflage**). They take shelter in deep burrows to protect themselves from extreme heat in summer (**aestivation**, summer sleep) and from extreme cold in winter (**hibernation**, winter sleep).

**External features.** The skin is smooth and slippery because of mucus and is always moist. The dorsal side is olive green with dark irregular spots; the ventral side is uniformly pale yellow. The frog **never drinks water** but absorbs it through the skin. The body is divided into **head and trunk**; a **neck and tail are absent**. Above the mouth is a pair of **nostrils**. The **eyes** are bulged and covered by a **nictitating membrane** that protects them while in water. On either side of the eyes a membranous **tympanum** (ear) receives sound signals. **Forelimbs** end in **four digits**; **hind limbs**, larger and more muscular, end in **five digits**, and the feet have **webbed digits** that help in swimming. Limbs are used for swimming, walking, leaping and burrowing.

**Sexual dimorphism.** Male frogs have sound-producing **vocal sacs** and a **copulatory pad** on the first digit of each forelimb; these are absent in females.`,
      [kt('Poikilotherm', 'An animal whose body temperature varies with its surroundings.'), kt('Aestivation', 'Summer sleep: inactivity in burrows to escape heat and drought.'), kt('Hibernation', 'Winter sleep: inactivity in burrows to escape cold.'), kt('Nictitating membrane', 'A membrane that covers and protects the frog’s eye in water.')],
      V.frogExt,
      [2],
    ),
    sec(
      '4. The frog: anatomy',
      `**Digestive system.** The alimentary canal is **short** because frogs are **carnivores**, so the intestine is reduced. Mouth → buccal cavity → pharynx → oesophagus → stomach → intestine → rectum → **cloaca**. The **liver** secretes bile, stored in the **gall bladder**; the **pancreas** produces pancreatic juice with digestive enzymes. Food is captured by the **bilobed tongue**. In the stomach, **HCl and gastric juices** digest food; the partly digested food, **chyme**, passes to the **duodenum**, which receives bile and pancreatic juice through a **common bile duct**. Bile emulsifies fat; pancreatic juice digests carbohydrates and proteins. Final digestion occurs in the intestine, and the products are absorbed by **villi and microvilli**. Undigested waste passes out through the cloaca.

**Respiration.** In water, the skin acts as the respiratory organ (**cutaneous respiration**): dissolved oxygen is exchanged by diffusion. On land, the **buccal cavity, skin and lungs** serve; the lungs are a pair of elongated, pink, sac-like structures in the upper trunk (thorax), and air enters through the nostrils into the buccal cavity and then the lungs (**pulmonary respiration**). During aestivation and hibernation, gas exchange occurs through the skin.

**Circulation.** The blood vascular system is **closed**; there is also a **lymphatic system** of lymph, lymph channels and lymph nodes. The **heart** is muscular, **three-chambered** (two atria, one ventricle), lies in the upper body cavity and is covered by a **pericardium**. A triangular **sinus venosus** joins the right atrium and receives blood through the **venae cavae**. The ventricle opens into a sac-like **conus arteriosus** on the ventral side. Arteries carry blood away from the heart (arterial system) and veins bring it back (venous system). The **hepatic portal system** links the liver and intestine; the **renal portal system** links the kidneys and the lower body. Blood has plasma and cells — **red blood cells (nucleated, with haemoglobin)**, white blood cells and platelets. **Lymph** lacks a few proteins and red blood cells. Blood carries nutrients, gases and water.

**Excretion.** A pair of **kidneys**, ureters, the cloaca and the **urinary bladder**. The kidneys are compact, dark red and bean-like, a little posterior in the body cavity on either side of the vertebral column; each is made of many **uriniferous tubules (nephrons)**. In the **male**, the ureters act as **urinogenital ducts** opening into the cloaca; in the **female**, the ureters and oviducts open **separately** into the cloaca. The thin-walled bladder lies ventral to the rectum and opens into the cloaca. The frog excretes **urea** and is **ureotelic**.

**Control and coordination.** Endocrine glands: pituitary, thyroid, parathyroid, thymus, pineal body, pancreatic islets, adrenals and gonads. The nervous system has a **central** part (brain and spinal cord), a **peripheral** part (cranial and spinal nerves) and an **autonomic** part (sympathetic and parasympathetic). **Ten pairs of cranial nerves** arise from the brain, which is enclosed in the **cranium**. **Forebrain**: olfactory lobes, paired cerebral hemispheres, unpaired diencephalon; **midbrain**: a pair of **optic lobes**; **hindbrain**: cerebellum and **medulla oblongata**, which passes through the **foramen magnum** and continues into the spinal cord in the vertebral column. Sense organs: sensory papillae (touch), taste buds, nasal epithelium (smell), eyes (vision) and tympanum with internal ears (hearing); the eyes and internal ears are well organised, the rest are cellular aggregations around nerve endings. The eyes are a pair of spherical **simple eyes** in the orbits. There is **no external ear**; the ear serves for **hearing and balance**.

**Reproduction.** Male: a pair of yellowish, ovoid **testes** attached to the upper part of the kidneys by a double fold of peritoneum, the **mesorchium**; **10–12 vasa efferentia** from each testis enter the kidney and open into **Bidder’s canal**, which communicates with the urinogenital duct opening into the cloaca. The **cloaca** is a small median chamber that passes faecal matter, urine and sperms to the outside. Female: a pair of **ovaries** near the kidneys with **no functional connection** to them; a pair of **oviducts** opens separately into the cloaca. A mature female can lay **2500–3000 ova** at a time. **Fertilisation is external**, in water; development involves a larval stage, the **tadpole**, which undergoes **metamorphosis** into the adult.

**Importance.** Frogs eat insects and protect crops; they maintain ecological balance as an important link in food chains and food webs; their muscular legs are eaten in some countries.`,
      [kt('Sinus venosus', 'Triangular chamber that receives blood from the venae cavae and opens into the right atrium.'), kt('Conus arteriosus', 'Sac-like vessel through which the ventricle sends blood into the arteries.'), kt('Ureotelic', 'Excreting nitrogenous waste mainly as urea.'), kt('Bidder’s canal', 'Canal inside the frog’s kidney into which the vasa efferentia open.'), kt('Cloaca', 'Common chamber passing faecal matter, urine and gametes to the outside.')],
      V.frogHeart,
      [2],
      [V.frogUrogen],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Calling a tendon a ligament (tendon: muscle to bone; ligament: bone to bone).
- Saying endocrine glands have ducts.
- Describing cardiac muscle as voluntary or unstriated.
- Giving the frog a neck, a tail or an external ear.
- Saying frog red blood cells have no nucleus.
- Mixing up aestivation (summer) and hibernation (winter).
- Writing that the female frog has a urinogenital duct (the ureters and oviducts open separately).

**How marks are usually awarded**
- 1-mark items: name a tissue from its location, a junction, a frog structure or a brain part.
- 2–3-mark answers: compare exocrine and endocrine glands; tendons and ligaments; three muscles; digestion or respiration in the frog; path of blood through the heart.
- 5-mark answers: epithelial or connective tissues with examples; two organ systems of the frog; evaluation of the frog’s adaptations.
- Case-based items: identifying tissues from slides, an injury, a pond survey or a dissection model, with a 2-mark part with an internal choice.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Four basic animal tissues?', 'Epithelial, connective, muscular and neural.', 'concept', 1),
    fc(2, 'Where is squamous epithelium found?', 'Walls of blood vessels and air sacs of the lungs.', 'fact', 1),
    fc(3, 'Where is cuboidal epithelium found?', 'Ducts of glands and tubular parts of nephrons.', 'fact', 1),
    fc(4, 'What do microvilli do?', 'Increase the surface area for absorption.', 'concept', 1),
    fc(5, 'Where is ciliated epithelium found?', 'Bronchioles and fallopian tubes.', 'fact', 1),
    fc(6, 'Example of a unicellular gland?', 'Goblet cells of the alimentary canal.', 'fact', 1),
    fc(7, 'Exocrine versus endocrine?', 'Exocrine glands have ducts; endocrine glands are ductless and release hormones into body fluid.', 'definition', 1),
    fc(8, 'Role of compound epithelium?', 'Protection against chemical and mechanical stresses.', 'concept', 1),
    fc(9, 'Three cell junctions?', 'Tight (seal), adhering (cement), gap (communication).', 'concept', 1),
    fc(10, 'Fibres secreted by connective tissue cells?', 'Collagen or elastin.', 'fact', 1),
    fc(11, 'Cells of areolar tissue?', 'Fibroblasts, macrophages and mast cells.', 'fact', 1),
    fc(12, 'Tendon versus ligament?', 'Tendon: muscle to bone; ligament: bone to bone.', 'definition', 1),
    fc(13, 'Example of dense irregular tissue?', 'The skin.', 'fact', 1),
    fc(14, 'Cells of cartilage and bone?', 'Chondrocytes and osteocytes, each in lacunae.', 'fact', 1),
    fc(15, 'Three kinds of muscle?', 'Skeletal (striated, voluntary), smooth (spindle, involuntary), cardiac (branched, heart).', 'concept', 1),
    fc(16, 'What lets cardiac cells contract as a unit?', 'Intercalated discs (communication junctions).', 'concept', 1),
    fc(17, 'Share of neural tissue made by neuroglia?', 'More than half the volume.', 'fact', 1),
    fc(18, 'Common Indian frog?', 'Rana tigrina.', 'fact', 2),
    fc(19, 'Aestivation and hibernation?', 'Summer sleep and winter sleep in burrows.', 'definition', 2),
    fc(20, 'Body divisions of the frog?', 'Head and trunk; no neck, no tail.', 'fact', 2),
    fc(21, 'Digits on frog limbs?', 'Forelimb four; hind limb five, webbed.', 'fact', 2),
    fc(22, 'Features of a male frog?', 'Vocal sacs and copulatory pads on the first digit of the forelimbs.', 'fact', 2),
    fc(23, 'Why is the frog’s gut short?', 'It is carnivorous.', 'concept', 2),
    fc(24, 'Respiratory organs of the frog on land?', 'Buccal cavity, skin and lungs.', 'fact', 2),
    fc(25, 'Chambers of the frog heart?', 'Two atria and one ventricle, plus sinus venosus and conus arteriosus.', 'fact', 2),
    fc(26, 'Two portal systems of the frog?', 'Hepatic portal (liver–intestine) and renal portal (kidney–lower body).', 'fact', 2),
    fc(27, 'Nitrogenous waste of the frog?', 'Urea: the frog is ureotelic.', 'fact', 2),
    fc(28, 'Path of sperms in the male frog?', 'Testis → vasa efferentia → Bidder’s canal → urinogenital duct → cloaca.', 'concept', 2),
    fc(29, 'Parts of the frog brain?', 'Forebrain (olfactory lobes, cerebral hemispheres, diencephalon), midbrain (optic lobes), hindbrain (cerebellum, medulla).', 'fact', 2),
    fc(30, 'Fertilisation and development in the frog?', 'External, in water; tadpole larva undergoes metamorphosis.', 'fact', 2),
  ],
  status: 'draft',
  provenance: PROV,
};
