// ch07 Structural Organisation in Animals — two decks: Part 1 (t01 animal tissues), Part 2 (t02 frog).
import { sl, deck, table, flow, svgV, r } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { EPITHELIA, CONNECTIVE, MUSCLES, NEURON, FROG_EXT, FROG_HEART, FROG_UROGEN } from './svgs.mjs';
import { actualUm, pct, survive } from './calc.mjs';

export const V = {
  epithelia: svgV(EPITHELIA, 'Four simple epithelia on a basement membrane: squamous, cuboidal, columnar and ciliated columnar, with examples of where each is found'),
  connective: svgV(CONNECTIVE, 'Areolar tissue with collagen and elastic fibres, fibroblast, macrophage and mast cell; cartilage with chondrocytes in lacunae; bone with osteocytes in a hard matrix'),
  muscles: svgV(MUSCLES, 'Skeletal muscle with striated multinucleate fibres, smooth muscle with spindle cells, and branched cardiac muscle with intercalated discs'),
  neuron: svgV(NEURON, 'A neuron with dendrites, cell body, nucleus, axon and axon terminals, surrounded by neuroglial cells'),
  frogExt: svgV(FROG_EXT, 'Dorsal view of a frog showing nostrils, eyes, tympanum, head and trunk, four-digit forelimbs and five-digit webbed hind limbs'),
  frogHeart: svgV(FROG_HEART, 'Frog heart with two atria, one ventricle, sinus venosus and conus arteriosus inside the pericardium'),
  frogUrogen: svgV(FROG_UROGEN, 'Male frog urinogenital system: testes, vasa efferentia, kidneys with Bidder’s canal, urinogenital ducts, urinary bladder and cloaca'),
};

// ---------------------------------------------------------------- computed numbers
const MAG = { mm: 6, mag: 400 };
MAG.um = actualUm(MAG.mm, MAG.mag);
const FROGS = { eggs: 2800, hatch: 60, meta: 5 };
FROGS.tadpoles = survive(FROGS.eggs, FROGS.hatch);
FROGS.froglets = survive(FROGS.eggs, FROGS.hatch, FROGS.meta);
const COUNT = { cuboidal: 27, squamous: 9, total: 36 };
COUNT.pc = pct(COUNT.cuboidal, COUNT.total, 0);

export const deck1 = deck({
  part: 1,
  title: 'Structural Organisation in Animals — Part 1: Animal tissues',
  goals: [
    'Describe simple, glandular and compound epithelia and cell junctions',
    'Classify connective tissues with examples',
    'Compare skeletal, smooth and cardiac muscle',
    'Describe neurons and neuroglia',
  ],
  slides: [
    sl('title', 'Structural Organisation in Animals', {
      b: 'Part 1 — the four basic tissues that build every animal organ.',
      v: flow('LR', [['c', 'Cells'], ['t', 'Tissues'], ['o', 'Organs'], ['s', 'Organ systems']], [['c', 't'], ['t', 'o'], ['o', 's']], 'Flow from cells to tissues, organs and organ systems'),
      n: 'In multicellular animals, groups of similar cells together with the material between them perform a common function. Such a group is a tissue. Tissues combine to form organs, and organs work together as organ systems, which share the work of the body.',
    }),
    sl('concept', 'Four basic tissues', {
      b: 'Tissues are grouped by structure and function into four basic types.',
      v: table(['Tissue', 'Main role', 'Example'], [['Epithelial', 'Covers surfaces, lines cavities and tubes', 'Lining of the stomach'], ['Connective', 'Links and supports other tissues', 'Bone, blood, tendons'], ['Muscular', 'Contracts to cause movement', 'Biceps, heart wall'], ['Neural', 'Controls the body’s response to change', 'Brain, nerves']], 'Table of the four basic animal tissues with roles and examples'),
      n: 'Epithelium covers and lines. Connective tissue links and supports. Muscle contracts. And neural tissue controls how the body responds to changing conditions. Every organ, such as the stomach, is built from several of these tissues working together.',
    }),
    sl('diagram', 'Simple epithelium', {
      b: 'Epithelial cells are **compactly packed** with little matrix between them and rest on a **basement membrane**. **Simple** epithelium has **one layer** of cells and lines body cavities, ducts and tubes.',
      v: V.epithelia,
      n: 'Squamous cells are thin and flat, ideal where substances must diffuse, as in the air sacs of the lungs. Cuboidal cells line gland ducts and kidney tubules, where microvilli help absorption. Columnar cells line the stomach and intestine. Ciliated cells move mucus or particles in one direction.',
    }),
    sl('concept', 'Glandular epithelium', {
      b: 'Some cuboidal or columnar cells are **specialised for secretion**.',
      v: table(['Kind', 'Description', 'Example'], [['Unicellular gland', 'Isolated secretory cells', 'Goblet cells of the alimentary canal'], ['Multicellular gland', 'Clusters of secretory cells', 'Salivary gland'], ['Exocrine gland', 'Secretes through ducts', 'Mucus, saliva, earwax, oil, milk, digestive enzymes'], ['Endocrine gland', 'No ducts; hormones pass into the fluid bathing the gland', 'Glands secreting hormones']], 'Table of kinds of glandular epithelium with examples'),
      n: 'A gland may be a single cell, like a goblet cell that releases mucus, or a large cluster of cells, like a salivary gland. Exocrine glands deliver their products through ducts. Endocrine glands have no ducts and release hormones straight into the surrounding fluid.',
    }),
    sl('concept', 'Compound epithelium and cell junctions', {
      b: '**Compound** epithelium has **two or more layers**; it **protects** against chemical and mechanical stresses and has little role in secretion or absorption. It covers the **skin** and lines the **buccal cavity, pharynx** and the ducts of salivary glands and pancreas.',
      v: table(['Junction', 'Role'], [['Tight junction', 'Stops substances leaking across a tissue'], ['Adhering junction', 'Cements neighbouring cells together'], ['Gap junction', 'Connects the cytoplasm of adjoining cells for rapid transfer of ions and small molecules']], 'Table of three cell junctions and their roles'),
      n: 'In nearly all animal tissues, special junctions link cells structurally and functionally. Tight junctions seal the gaps. Adhering junctions act like cement. And gap junctions open channels between neighbouring cells so that they can communicate quickly.',
    }),
    sl('check', 'Quick check: epithelium', {
      b: 'Which surface is covered by compound epithelium?',
      n: 'Quick check. Look for a surface that faces wear and tear rather than one built for diffusion.',
      chk: 'compound-mcq',
    }),
    sl('diagram', 'Connective tissue', {
      b: 'Connective tissues are the **most abundant** tissues. Except in blood, their cells secrete fibres of **collagen** or **elastin** and modified polysaccharides that form the **matrix**.',
      v: V.connective,
      n: 'Fibres give strength, elasticity and flexibility. In areolar tissue beneath the skin, fibroblasts make fibres, macrophages engulf invaders and mast cells release chemicals. Cartilage has cells inside small cavities in a bendable matrix, while bone has a hard matrix rich in calcium salts.',
    }),
    sl('concept', 'Types of connective tissue', {
      b: 'Three types are recognised.',
      v: table(['Type', 'Features', 'Examples'], [['Loose', 'Cells and fibres loosely arranged in a semi-fluid ground substance', 'Areolar tissue beneath the skin; adipose tissue storing fat'], ['Dense regular', 'Collagen fibres in parallel rows between rows of fibroblasts', 'Tendons (muscle to bone); ligaments (bone to bone)'], ['Dense irregular', 'Fibres running in many directions', 'Skin'], ['Specialised', 'Cartilage, bone and blood', 'Tip of nose and outer ear; limb bones; blood in vessels']], 'Table of loose, dense and specialised connective tissues'),
      n: 'Loose tissues pack and cushion organs and store fat. Dense regular tissue, with fibres all in one direction, makes strong tendons and ligaments. Bone supports and protects soft organs, and its marrow makes blood cells. Blood is a fluid connective tissue that carries materials around the body.',
    }),
    sl('example', 'Worked example 1: how big is the cell?', {
      b: `A photograph of cuboidal epithelium is taken at a magnification of ${MAG.mag}. One cell measures ${MAG.mm} mm on the print. Find its real width in micrometres.`,
      ul: [
        r`Real size $= \dfrac{\text{image size}}{\text{magnification}}$.`,
        r`$\dfrac{${MAG.mm} \times 1000}{${MAG.mag}} = ${MAG.um}$ µm.`,
        'Convert millimetres to micrometres first: 1 mm = 1000 µm.',
      ],
      v: table(['Quantity', 'Value'], [['Image size', `${MAG.mm} mm = ${MAG.mm * 1000} µm`], ['Magnification', String(MAG.mag)], ['Real size', `${MAG.um} µm`]], `Worked table: real width ${MAG.um} micrometres`),
      n: 'Change the image size into micrometres, which gives six thousand. Divide by the magnification of four hundred. The cell is fifteen micrometres wide, a typical size for an epithelial cell.',
    }),
    sl('check', 'Quick check: connective tissue', {
      b: 'Where is a store of fat laid down in the body?',
      n: 'Quick check. Which loose connective tissue is specialised for storing fat?',
      chk: 'adipose-mcq',
    }),
    sl('diagram', 'Muscle tissue', {
      b: 'Muscle is made of long fibres containing **myofibrils**; fibres contract in response to stimulation and then relax.',
      v: V.muscles,
      n: 'Skeletal muscle, attached to bones, is striated and voluntary. Smooth muscle in the walls of the gut and blood vessels has spindle cells without striations and works involuntarily. Cardiac muscle is found only in the heart; its branched cells are joined by intercalated discs, so they contract as a unit.',
    }),
    sl('diagram', 'Neural tissue', {
      b: '**Neurons** are the excitable cells. **Neuroglia** protect and support neurons and make up **more than half the volume** of neural tissue.',
      v: V.neuron,
      n: 'When a neuron is suitably stimulated, an electrical disturbance is generated and travels swiftly along its plasma membrane. When it reaches the endings of the axon, it triggers stimulation or inhibition of the next neurons or other cells. Neural tissue exerts the greatest control over the body’s responsiveness.',
    }),
    sl('example', 'Worked example 2: naming a tissue from clues', {
      b: `A student scores ${COUNT.total} cells in one field of a kidney tubule slide: ${COUNT.cuboidal} are cube-shaped with round central nuclei and microvilli, and ${COUNT.squamous} are thin and flat. Name the main tissue and find its share.`,
      ul: [
        'Cube-shaped cells with central nuclei: **cuboidal epithelium**; microvilli suggest the **proximal convoluted tubule**.',
        r`Share $= \dfrac{${COUNT.cuboidal}}{${COUNT.total}} \times 100 = ${COUNT.pc}$ percent.`,
        'Thin flat cells nearby are squamous epithelium, as in other parts of the tubule and in capillary walls.',
      ],
      v: table(['Clue', 'Inference'], [['Cube-shaped cells, round central nucleus', 'Cuboidal epithelium'], ['Microvilli on free surface', 'Absorption, as in the proximal tubule'], [`${COUNT.cuboidal} of ${COUNT.total} cells`, `${COUNT.pc} percent cuboidal`]], `Worked table: ${COUNT.pc} percent of cells are cuboidal`),
      n: 'Use shape first. Cube-like cells with round central nuclei are cuboidal. Microvilli point to an absorbing surface. Twenty-seven out of thirty-six is three quarters, so seventy-five percent of the cells are cuboidal.',
    }),
    sl('check', 'Quick check: muscle', {
      b: 'Judge the assertion and the reason about cardiac muscle.',
      n: 'Quick check. Do you control your heartbeat at will?',
      chk: 'cardiac-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Epithelium: simple (squamous, cuboidal, columnar, ciliated), glandular (exocrine, endocrine) and compound; tight, adhering and gap junctions.',
        'Connective: loose (areolar, adipose), dense (regular: tendons, ligaments; irregular: skin), specialised (cartilage, bone, blood).',
        'Muscle: skeletal (striated, voluntary), smooth (spindle, involuntary), cardiac (branched, intercalated discs).',
        'Neural: neurons carry impulses; neuroglia protect and support, over half the volume.',
      ],
      v: table(['Tissue', 'Key word'], [['Epithelium', 'Covers and lines'], ['Connective', 'Links and supports'], ['Muscle', 'Contracts'], ['Neural', 'Controls']], 'Summary table of four tissues and their key roles'),
      n: 'To recap: epithelium covers and lines, connective tissue links and supports, muscle contracts and neural tissue controls. Learn one location for each kind, because questions often describe a place and ask you to name the tissue.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Give **one location** for each epithelium and connective tissue.',
        'Separate **tendon** (muscle to bone) from **ligament** (bone to bone).',
        'Tabulate the **three muscles**: shape, striations, nuclei, control.',
        'Name the **three junctions** with their roles.',
      ],
      n: 'Exam tips. Link every tissue to a location. Do not confuse tendons with ligaments. Compare the three muscles in a table. And remember the roles of tight, adhering and gap junctions.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Structural Organisation in Animals — Part 2: The frog',
  goals: [
    'Describe the habitat, habits and external features of the frog',
    'Describe its digestive, respiratory and circulatory systems',
    'Describe its excretory, nervous and reproductive systems',
    'Explain the frog’s importance to people and ecosystems',
  ],
  slides: [
    sl('title', 'The frog', {
      b: 'Part 2 — morphology and anatomy of the common Indian frog, Rana tigrina.',
      v: flow('LR', [['h', 'Habitat and habits'], ['m', 'External features'], ['a', 'Organ systems'], ['r', 'Reproduction']], [['h', 'm'], ['m', 'a'], ['a', 'r']], 'Flow from habitat to external features, organ systems and reproduction'),
      n: 'Frogs live both on land and in fresh water and belong to the class Amphibia of the phylum Chordata. Studying one animal in depth shows how tissues are organised into organs and organ systems that keep it alive.',
    }),
    sl('concept', 'Habitat and habits', {
      b: 'Frogs are **cold-blooded (poikilotherms)**: their body temperature varies with the surroundings.',
      v: table(['Feature', 'Detail'], [['Colour change', 'Can change colour to hide from enemies (camouflage)'], ['Aestivation', 'Summer sleep in deep burrows to escape heat'], ['Hibernation', 'Winter sleep in burrows to escape cold'], ['Water', 'Never drinks; absorbs water through the skin']], 'Table of habits of the frog'),
      n: 'Because they cannot keep a steady body temperature, frogs avoid extreme heat and cold by burrowing deep into the ground, in summer sleep and in winter sleep. They can change colour to blend with their surroundings, and they take in water through their moist skin instead of drinking.',
    }),
    sl('diagram', 'External features', {
      b: 'The body is divided into **head and trunk**; there is **no neck and no tail**. The skin is smooth, slippery and moist with mucus; olive green with dark spots above, pale yellow below.',
      v: V.frogExt,
      n: 'Above the mouth is a pair of nostrils. The bulging eyes are covered by a nictitating membrane in water, and behind each eye is a tympanum that receives sound. Forelimbs end in four digits; the larger, muscular hind limbs end in five webbed digits that help in swimming, leaping and burrowing.',
    }),
    sl('check', 'Quick check: external features', {
      b: 'Which structure protects the eyes of a frog under water?',
      n: 'Quick check. It is a membrane that can be drawn across the eye.',
      chk: 'nictitating-mcq',
    }),
    sl('example', 'Worked example 1: male or female?', {
      b: 'Two frogs from a pond are examined. Frog X has a swelling on the first digit of each forelimb and inflates a pair of sacs when it croaks; frog Y has neither. Identify the sexes.',
      ul: [
        'The swelling is a **copulatory pad**; the sacs are **vocal sacs**.',
        'Both are found **only in males**, so **X is male** and **Y is female**.',
        'Such external differences between the sexes are called **sexual dimorphism**.',
      ],
      v: table(['Feature', 'Frog X', 'Frog Y'], [['Copulatory pad', 'Present', 'Absent'], ['Vocal sacs', 'Present', 'Absent'], ['Sex', 'Male', 'Female']], 'Worked table: frog X male, frog Y female'),
      n: 'Look for two clues. A pad on the first finger helps the male hold the female while mating, and vocal sacs produce the croaking calls. Frog X has both, so it is the male. Frog Y lacks them, so it is the female.',
    }),
    sl('concept', 'Digestive system', {
      b: 'The alimentary canal is **short** because frogs are **carnivores**. Food is caught by the **bilobed tongue**.',
      v: flow('LR', [['m', 'Mouth and buccal cavity'], ['o', 'Pharynx and oesophagus'], ['s', 'Stomach: HCl and gastric juice'], ['d', 'Duodenum: bile and pancreatic juice'], ['i', 'Intestine: villi absorb'], ['c', 'Rectum and cloaca']], [['m', 'o'], ['o', 's'], ['s', 'd'], ['d', 'i'], ['i', 'c']], 'Flow of food through the alimentary canal of the frog'),
      n: 'In the stomach, acid and gastric juices turn food into chyme. The duodenum receives bile, stored in the gall bladder, and pancreatic juice through a common bile duct. Bile emulsifies fat, and pancreatic juice digests carbohydrates and proteins. Villi and microvilli absorb the products, and waste leaves through the cloaca.',
    }),
    sl('concept', 'Respiration', {
      b: 'The frog exchanges gases in **water and on land**.',
      v: table(['Situation', 'Respiratory organs', 'Name'], [['In water', 'Moist skin, by diffusion', 'Cutaneous respiration'], ['On land', 'Buccal cavity, skin and lungs', 'Pulmonary respiration through the lungs'], ['Aestivation and hibernation', 'Skin only', 'Cutaneous respiration']], 'Table of how the frog breathes in different situations'),
      n: 'The lungs are a pair of pink, sac-like organs in the upper part of the trunk. Air enters through the nostrils into the buccal cavity and then the lungs. In water, and while buried during summer or winter sleep, the frog relies on its moist skin.',
    }),
    sl('diagram', 'Heart and circulation', {
      b: 'The frog has a **closed** circulation and a **lymphatic system**. The heart has **three chambers** and is covered by a **pericardium**.',
      v: V.frogHeart,
      n: 'Blood returns through the venae cavae into the sinus venosus, which opens into the right atrium. The single ventricle pumps blood into the conus arteriosus and then the arteries. Special veins link the liver and intestine in the hepatic portal system, and the kidneys and lower body in the renal portal system. Red blood cells are nucleated and contain haemoglobin.',
    }),
    sl('check', 'Quick check: circulation', {
      b: 'Which chamber receives the blood brought back by the venae cavae?',
      n: 'Quick check. It is a triangular chamber on the dorsal side of the heart.',
      chk: 'sinus-mcq',
    }),
    sl('diagram', 'Excretory and male reproductive systems', {
      b: 'A pair of **dark red kidneys**, ureters, a **urinary bladder** and the **cloaca** form the excretory system. The frog excretes **urea** (ureotelic).',
      v: V.frogUrogen,
      n: 'In the male, testes are attached to the kidneys by the mesorchium. Ten to twelve vasa efferentia enter each kidney and open into Bidder’s canal, which leads to the urinogenital duct and the cloaca. In the female, the ovaries have no link with the kidneys, and the oviducts open into the cloaca separately from the ureters.',
    }),
    sl('concept', 'Nervous system and sense organs', {
      b: 'Control comes from the **neural system** and **endocrine glands** (pituitary, thyroid, parathyroid, thymus, pineal body, pancreatic islets, adrenals and gonads). The brain is enclosed in a **cranium**; **ten pairs** of cranial nerves arise from it.',
      v: table(['Part of brain', 'Includes'], [['Forebrain', 'Olfactory lobes, paired cerebral hemispheres, unpaired diencephalon'], ['Midbrain', 'A pair of optic lobes'], ['Hindbrain', 'Cerebellum and medulla oblongata, which continues as the spinal cord through the foramen magnum']], 'Table of the parts of the frog brain'),
      n: 'The nervous system has central, peripheral and autonomic parts. Sense organs include sensory papillae for touch, taste buds, the nasal epithelium for smell, simple eyes, and the tympanum with internal ears. The ear serves for both hearing and balance, and there is no external ear.',
    }),
    sl('example', 'Worked example 2: from eggs to froglets', {
      b: `A female lays ${FROGS.eggs} eggs. Suppose ${FROGS.hatch} percent hatch into tadpoles and ${FROGS.meta} percent of the tadpoles complete metamorphosis. How many young frogs result?`,
      ul: [
        r`Tadpoles $= ${FROGS.eggs} \times \dfrac{${FROGS.hatch}}{100} = ${FROGS.tadpoles}$.`,
        r`Froglets $= ${FROGS.tadpoles} \times \dfrac{${FROGS.meta}}{100} = ${FROGS.froglets}$.`,
        'A mature female can lay 2500 to 3000 eggs at a time; large numbers make up for heavy losses.',
      ],
      v: flow('LR', [['e', `${FROGS.eggs} eggs`], ['t', `${FROGS.tadpoles} tadpoles`], ['f', `${FROGS.froglets} froglets`]], [['e', 't', `${FROGS.hatch} percent hatch`], ['t', 'f', `${FROGS.meta} percent metamorphose`]], `Worked flow: ${FROGS.froglets} froglets from ${FROGS.eggs} eggs`),
      n: 'Apply each survival percentage in turn. Sixty percent of two thousand eight hundred is one thousand six hundred and eighty tadpoles. Five percent of those is eighty-four young frogs. Fertilisation is external and eggs develop in water, so many are lost.',
    }),
    sl('check', 'Quick check: brain', {
      b: 'To which part of the frog’s brain do the optic lobes belong?',
      n: 'Quick check. Recall which part of the brain is marked by a pair of lobes.',
      chk: 'brain-mcq',
    }),
    sl('concept', 'Reproduction and importance', {
      b: 'A pair of **ovaries** lies near the kidneys; **oviducts** open into the cloaca. **Fertilisation is external**, in water; development passes through a **tadpole** larva that undergoes **metamorphosis**.',
      v: table(['Value of frogs', 'Why'], [['Crop protection', 'They eat insects'], ['Ecological balance', 'Important link in food chains and food webs'], ['Food', 'Muscular legs eaten in some countries']], 'Table of the importance of frogs'),
      n: 'Frogs are beneficial to people. By eating insects they protect crops, and as prey and predator they form an important link in food chains and food webs, helping to maintain ecological balance.',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Rana tigrina: poikilotherm; camouflage; aestivation and hibernation; absorbs water through skin.',
        'Head and trunk, no neck or tail; nictitating membrane, tympanum; forelimbs four digits, hind limbs five webbed digits; males with vocal sacs and copulatory pads.',
        'Short gut; bile and pancreatic juice via common bile duct; skin, buccal cavity and lungs for respiration.',
        'Three-chambered heart with sinus venosus and conus arteriosus; hepatic and renal portal systems; nucleated RBCs.',
        'Kidneys and cloaca; ureotelic; male urinogenital duct via Bidder’s canal; ten pairs of cranial nerves; external fertilisation; tadpole.',
      ],
      v: table(['System', 'Key point'], [['Digestive', 'Short gut, common bile duct'], ['Respiratory', 'Skin in water; lungs on land'], ['Circulatory', 'Three chambers, closed'], ['Excretory', 'Ureotelic'], ['Reproductive', 'External fertilisation, tadpole']], 'Summary table of frog organ systems'),
      n: 'To recap: the frog is a cold-blooded amphibian with a head and trunk, a short carnivore gut, skin and lung breathing, a three-chambered heart, urea excretion and external fertilisation in water followed by a tadpole stage.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Give **two differences** between male and female frogs.',
        'Trace the **path of blood** through the heart chambers in order.',
        'Contrast the **male and female** routes to the cloaca.',
        'Place each **brain part** with its lobes correctly.',
      ],
      n: 'Exam tips. Know how to tell the sexes apart. Trace blood from the venae cavae to the conus arteriosus. Compare the urinogenital ducts of male and female. And place the optic lobes, cerebellum and cerebral hemispheres in the right part of the brain.',
    }),
  ],
});
