// ch02 Tissues: two decks. Part 1 (t01, t02): levels of organisation and plant tissues.
// Part 2 (t03, t04): animal tissues, joints and care of the musculoskeletal system.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { MERISTEMS, SIMPLE_TISSUES, XYLEM_PHLOEM, EPITHELIA, CONNECTIVE, NEURON, MUSCLES, JOINT_TYPES } from './svgs.mjs';
import { XYL, CALC } from './data.mjs';

export const V = {
  meristems: svgV(MERISTEMS, 'A plant with apical meristems at the shoot and root tips, an intercalary meristem at the base of an internode, and a cross-section showing the cambium ring that makes the stem thicker', 'Where the meristems lie: schematic, not to scale.'),
  simple: svgV(SIMPLE_TISSUES, 'Cross-sections of parenchyma with thin rounded cells, collenchyma with thickened corners and sclerenchyma with very thick walls', 'Three simple permanent tissues: schematic.'),
  xylemPhloem: svgV(XYLEM_PHLOEM, 'Xylem vessels with ring-thickened walls carrying water upwards, and a phloem sieve tube with sieve plates and a companion cell carrying food both ways', 'Xylem and phloem in long section: schematic.'),
  epithelia: svgV(EPITHELIA, 'Squamous, cuboidal, columnar and ciliated columnar epithelium sitting on a basement membrane', 'Four epithelial tissues: schematic.'),
  connective: svgV(CONNECTIVE, 'Blood, bone, cartilage and a tendon or ligament drawn side by side', 'Four connective tissues: schematic.'),
  neuron: svgV(NEURON, 'A neuron with branched dendrites, a cell body with a nucleus, a long axon and branched nerve endings', 'A neuron: schematic.'),
  muscles: svgV(MUSCLES, 'Striated, smooth and cardiac muscle fibres drawn side by side with their nuclei and stripes', 'Three kinds of muscle: schematic.'),
  joints: svgV(JOINT_TYPES, 'Ball and socket, hinge, pivot, gliding and fixed joints, each with its example and movement', 'Five kinds of joint: schematic.'),
  levels: table(
    ['Level', 'Plant example', 'Animal example'],
    [
      ['Cell', 'A palisade cell of a leaf', 'A muscle cell'],
      ['Tissue', 'Xylem', 'Muscular tissue'],
      ['Organ', 'Leaf or root', 'Heart or stomach'],
      ['Organ system', 'Shoot system', 'Digestive system'],
      ['Organism', 'Mango tree', 'Cow'],
    ],
    'Table of the five levels of organisation with a plant and an animal example for each',
  ),
  simpleTable: table(
    ['Tissue', 'Cells', 'Where', 'Job'],
    [
      ['Parenchyma', 'Living, thin walls, loosely packed', 'Potato tuber, leaf, stem pith', 'Stores food; chlorenchyma makes food; aerenchyma floats aquatic plants'],
      ['Collenchyma', 'Living, corners thickened', 'Leaf stalk, young stem (celery strings)', 'Flexible support'],
      ['Sclerenchyma', 'Dead, thick lignified walls', 'Coconut husk, seed coat, veins', 'Strength and hardness'],
    ],
    'Table of parenchyma, collenchyma and sclerenchyma with their cells, places and jobs',
  ),
  xyPhTable: table(
    ['Feature', 'Xylem', 'Phloem'],
    [
      ['Carries', 'Water and minerals', 'Food made in leaves'],
      ['Direction', 'Upwards only', 'Upwards and downwards'],
      ['Main parts', 'Vessels, tracheids, fibres, parenchyma', 'Sieve tubes, companion cells, fibres, parenchyma'],
      ['Living or dead', 'Mostly dead cells', 'Mostly living cells'],
    ],
    'Table comparing xylem and phloem',
  ),
  epiTable: table(
    ['Type', 'Where found', 'Job'],
    [
      ['Squamous', 'Lining of mouth, blood vessels, skin surface', 'Protects; allows easy exchange'],
      ['Cuboidal', 'Kidney tubules, ducts of glands', 'Absorbs and secretes'],
      ['Columnar', 'Lining of the small intestine', 'Absorbs food; secretes mucus'],
      ['Ciliated columnar', 'Windpipe', 'Cilia sweep dust-laden mucus out'],
      ['Glandular', 'Salivary and sweat glands', 'Makes and releases secretions'],
    ],
    'Table of epithelial tissue types with where they occur and their jobs',
  ),
  connTable: table(
    ['Tissue', 'Key feature', 'Job'],
    [
      ['Areolar', 'Loose, fills spaces', 'Packs between organs; helps repair'],
      ['Adipose', 'Cells store fat', 'Stores energy; insulates'],
      ['Blood', 'Cells in liquid plasma', 'Transports oxygen, food, wastes; defends'],
      ['Bone', 'Hard matrix of calcium and phosphorus salts', 'Supports and protects'],
      ['Cartilage', 'Firm, flexible', 'Smooth surfaces at joints; shapes ear and nose'],
      ['Ligament', 'Strong, elastic', 'Joins bone to bone'],
      ['Tendon', 'Strong, little stretch', 'Joins muscle to bone'],
    ],
    'Table of seven connective tissues with their features and jobs',
  ),
  muscleTable: table(
    ['Feature', 'Striated', 'Smooth', 'Cardiac'],
    [
      ['Stripes', 'Yes', 'No', 'Yes'],
      ['Nuclei', 'Many', 'One', 'One'],
      ['Shape', 'Long, unbranched', 'Spindle', 'Branched'],
      ['Control', 'Voluntary', 'Involuntary', 'Involuntary'],
      ['Place', 'Limbs, body wall', 'Food pipe, blood vessels', 'Heart'],
    ],
    'Table comparing striated, smooth and cardiac muscle',
  ),
};

export const deck1 = deck({
  part: 1,
  title: 'Tissues, Part 1: levels of organisation and plant tissues',
  goals: [
    'Describe the levels of organisation in a multicellular organism',
    'Distinguish meristematic and permanent plant tissues and name their types',
    'Relate the structure of parenchyma, collenchyma, sclerenchyma, xylem, phloem and epidermis to their function',
    'Find the actual size of a cell from a drawing',
  ],
  slides: [
    sl('title', 'Tissues: teams of cells', {
      b: 'Part 1: how cells are organised, and the tissues that build a plant.',
      v: V.levels,
      n: 'A single cell can do everything, but a tree or a cow needs far more. So cells work in teams, and the teams are arranged in levels. A group of similar cells doing one job is a tissue. Tissues form organs, organs form organ systems, and the systems together make the organism. In this part we meet the levels of organisation, and then the tissues of plants.',
    }),
    sl('concept', 'Levels of organisation', {
      b: 'In a multicellular organism, cells are grouped into **tissues**, tissues into **organs**, organs into **organ systems**. This is **division of labour**: each level does a job that no single cell could do well.',
      v: flow('LR', [['a', 'Cell'], ['b', 'Tissue: similar cells, one job'], ['c', 'Organ: tissues working together'], ['d', 'Organ system'], ['e', 'Organism']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow from cell to tissue, organ, organ system and organism'),
      n: 'Look at the levels. Cells of the same kind form a tissue. Several tissues join to form an organ, such as a leaf or a heart. Organs that work together form an organ system, such as the digestive system. All the systems together make a whole organism. This is called division of labour, because every level does a job that a single cell could not do well.',
    }),
    sl('concept', 'Why tissues are useful', {
      b: 'A tissue is a group of cells with the **same structure** that do a **particular job**. Because cells specialise, the organism works more efficiently.',
      v: table(['Tissue', 'Cells', 'Job'], [['Xylem', 'Long hollow tubes', 'Carries water up a tree'], ['Muscle', 'Long fibres that shorten', 'Moves the body'], ['Epidermis of a leaf', 'Flat, tightly packed cells', 'Protects the leaf']], 'Table of three tissues, the shape of their cells and their jobs'),
      n: 'A tissue is a group of cells that have the same structure and carry out one particular job. The shape of the cells suits the job. Xylem cells form hollow tubes that carry water up a tree. Muscle cells are long fibres that can shorten. Epidermis cells are flat and tightly packed, so they protect the leaf. Specialisation makes the whole organism work better.',
    }),
    sl('concept', 'Two groups of plant tissue', {
      b: 'Plant tissues are of two groups: **meristematic** tissues, which divide and make the plant grow, and **permanent** tissues, whose cells have taken a fixed shape and job.',
      v: flow('TB', [['a', 'Plant tissues'], ['b', 'Meristematic: apical, lateral, intercalary'], ['c', 'Permanent'], ['d', 'Simple: parenchyma, collenchyma, sclerenchyma'], ['e', 'Complex: xylem, phloem'], ['f', 'Protective: epidermis, cork']], [['a', 'b'], ['a', 'c'], ['c', 'd'], ['c', 'e'], ['c', 'f']], 'Tree diagram of plant tissues into meristematic and permanent, with the types of permanent tissue'),
      n: 'Plants grow in particular regions, and that is because of meristematic tissue. Its cells keep dividing. Cells made by meristems become permanent tissue, and then they stop dividing and take up a particular shape and job. Permanent tissue is simple, such as parenchyma, collenchyma and sclerenchyma, or complex, such as xylem and phloem, or protective, such as epidermis and cork.',
    }),
    sl('concept', 'Meristematic tissue', {
      b: 'Meristematic cells are **small, thin-walled, closely packed**, with dense cytoplasm, a large nucleus and no large vacuole. They divide again and again. **Apical** meristems at tips add length, **lateral** meristems (cambium) add girth, and **intercalary** meristems at the base of leaves or internodes add length where it is needed.',
      v: V.meristems,
      n: 'Meristematic cells are small, thin-walled and packed closely, with dense cytoplasm and a large nucleus. They divide again and again. The apical meristem at the tip of a root or shoot makes the plant longer. The lateral meristem, called cambium, makes a stem or root thicker. The intercalary meristem, at the base of a leaf or an internode, adds length, which is why grass regrows after grazing.',
    }),
    sl('example', 'Worked example: which meristem?', {
      b: r`**Problem.** Name the meristem responsible for each observation. (a) A lawn on a cricket ground grows back after mowing. (b) The trunk of a neem tree gets thicker every year. (c) The root of a bean seedling gets longer.

**Step 1.** Ask: is the growth in length or in thickness, and where does it happen?

**(a)** Length, at the base of the leaves, below the cut: **intercalary** meristem.

**(b)** Thickness: **lateral** meristem (cambium).

**(c)** Length, at the root tip: **apical** meristem.`,
      v: table(['Observation', 'Growth', 'Meristem'], [['Lawn regrows after mowing', 'Length, at leaf base', 'Intercalary'], ['Neem trunk widens', 'Thickness', 'Lateral (cambium)'], ['Seedling root lengthens', 'Length, at the tip', 'Apical']], 'Table linking three observations to the meristem responsible'),
      n: 'Let us find the meristem for each case. The lawn grows back after mowing because the cells at the base of the leaves keep dividing, which is intercalary meristem. A neem trunk grows thicker because of the lateral meristem, called cambium. A bean seedling root grows longer because of the apical meristem at its tip. Always ask whether the growth is in length or thickness, and where it happens.',
    }),
    sl('check', 'Quick check: meristems', {
      b: 'Match growth to a meristem.',
      n: 'Quick check. Decide first whether the plant is growing longer or thicker, and then think of where the dividing cells are.',
      chk: 'chk-meristem',
    }),
    sl('concept', 'Simple permanent tissues', {
      b: 'Simple permanent tissues are made of one kind of cell. **Parenchyma** has thin-walled living cells, **collenchyma** has living cells with thickened corners, and **sclerenchyma** has dead cells with thick lignified walls.',
      v: V.simple,
      n: 'Simple permanent tissues have only one kind of cell. Parenchyma cells are thin-walled, living and loosely packed, and they store food. Collenchyma cells have thickened corners, which gives flexible support, as in the strings of celery. Sclerenchyma cells are dead, with thick hard walls, and they give strength, as in the husk of a coconut or the shell of a nut.',
    }),
    sl('concept', 'Parenchyma, collenchyma and sclerenchyma compared', {
      b: 'Variants of parenchyma: **chlorenchyma** has chloroplasts and makes food; **aerenchyma** has large air spaces and helps aquatic plants float.',
      v: V.simpleTable,
      n: 'Compare the three tissues. Parenchyma is found in a potato tuber, in leaves and in the pith of stems. With chloroplasts it is called chlorenchyma and makes food. With large air spaces, as in water plants, it is called aerenchyma and helps the plant float. Collenchyma is found in leaf stalks and young stems. Sclerenchyma is found in coconut husk and seed coats, and its cells are dead.',
    }),
    sl('check', 'Quick check: simple tissues', {
      b: 'Match a plant part to its tissue.',
      n: 'Quick check. Think about what the part has to do, store food, bend without breaking, or be strong and hard.',
      chk: 'chk-simple',
    }),
    sl('concept', 'Complex tissues: xylem and phloem', {
      b: '**Xylem** carries water and minerals **upwards** from roots. **Phloem** carries food made in the leaves to all parts, **upwards and downwards**. Both are made of more than one kind of cell.',
      v: V.xylemPhloem,
      n: 'Complex tissues are made of more than one kind of cell. Xylem has tracheids and vessels, which are hollow tubes of dead cells with thick walls, along with fibres and parenchyma. Xylem carries water and minerals upwards. Phloem has sieve tubes, whose end walls have holes, and companion cells. Phloem carries the food made in leaves to all parts, both upwards and downwards.',
    }),
    sl('concept', 'Xylem and phloem compared', {
      b: 'Xylem is mostly dead and its main role is transport and support. Phloem is mostly living and needs its companion cells to work.',
      v: V.xyPhTable,
      n: 'Here is the comparison. Xylem carries water and minerals, and only upwards. Its main parts are vessels, tracheids, fibres and parenchyma, and most of it is dead. Phloem carries food made in leaves, upwards and downwards. Its main parts are sieve tubes, companion cells, fibres and parenchyma, and most of it is living. A good exam answer lists a few of these points.',
    }),
    sl('check', 'Quick check: xylem and phloem', {
      b: 'Decide which tissue is meant.',
      n: 'Quick check. Ask what is being carried, and in which direction, to decide between xylem and phloem.',
      chk: 'chk-xylem',
    }),
    sl('concept', 'Protective tissue: epidermis and cork', {
      b: 'The **epidermis** is usually a single layer of tightly packed cells. In leaves it has pores called **stomata**, each guarded by two **guard cells**, and a waxy **cuticle**. Older stems have **cork**, dead cells with a waterproof coating.',
      v: table(['Part', 'Feature', 'Job'], [['Epidermis of leaf', 'Tightly packed; waxy cuticle', 'Protects; reduces water loss'], ['Stomata and guard cells', 'Pores between two cells', 'Gas exchange and loss of water vapour'], ['Root hairs', 'Long extensions of epidermal cells', 'Absorb water and minerals'], ['Cork (bark)', 'Dead cells, waterproof wall', 'Protects an older stem']], 'Table of protective tissues of plants with their features and jobs'),
      n: 'Protective tissue covers the plant. The epidermis is usually one layer of tightly packed cells. In leaves it has a waxy coat that reduces loss of water, and it has tiny pores called stomata, each between two guard cells, for exchange of gases. In roots, epidermal cells form root hairs that absorb water. Older stems are covered by cork, which is made of dead cells.',
    }),
    sl('example', 'Worked example: size of a vessel', {
      b: r`**Problem.** A student draws a xylem vessel seen under a microscope. The drawing is ${XYL.image_mm} mm wide and the magnification is ${XYL.m} times. Find the actual width of the vessel in micrometres.

**Step 1.** Actual size $= \dfrac{\text{size of drawing}}{\text{magnification}} = \dfrac{${XYL.image_mm}\ \text{mm}}{${XYL.m}} = ${XYL.actual_mm}\ \text{mm}$.

**Step 2.** $${XYL.actual_mm}\ \text{mm} \times 1000 = ${XYL.actual_um}\ \mu\text{m}$.`,
      v: flow('LR', [['a', 'Drawing size'], ['b', 'Divide by magnification'], ['c', 'Actual size'], ['d', 'Convert to micrometres']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of the steps for finding actual size from a drawing'),
      n: 'Here is a short calculation. The drawing of a xylem vessel is fifteen millimetres wide, and the magnification is two hundred and fifty. Divide the drawing size by the magnification to get the actual width in millimetres. Then multiply by one thousand to change it to micrometres. The result is sixty micrometres, which is thinner than a human hair.',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Cells form tissues, tissues form organs, organs form organ systems, and these form the organism.',
        'Meristematic tissue divides: apical and intercalary add length, lateral adds girth.',
        'Simple permanent: parenchyma (stores, makes food), collenchyma (flexible support), sclerenchyma (strength, dead).',
        'Xylem carries water and minerals up; phloem carries food both ways.',
        'Epidermis protects; stomata exchange gases; cork covers older stems.',
      ],
      v: table(['Tissue', 'One-line job'], [['Meristem', 'Divides to make the plant grow'], ['Parenchyma', 'Stores or makes food'], ['Collenchyma', 'Flexible support'], ['Sclerenchyma', 'Hardness and strength'], ['Xylem and phloem', 'Transport']], 'Summary table of plant tissues and their jobs'),
      n: 'To sum up Part 1. Cells are organised into tissues, organs and organ systems. Meristematic tissue divides, with apical and intercalary meristems adding length and lateral meristem adding thickness. Permanent tissues are simple, complex or protective. Xylem carries water and minerals upwards, and phloem carries food in both directions. In Part 2 we turn to animal tissues.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Say "dead" for sclerenchyma and for most xylem, and "living" for parenchyma and phloem.',
        'In a comparison, give direction of flow for xylem and phloem.',
        'Name the meristem by where it lies, then say whether it adds length or thickness.',
        'Draw cells in a tissue diagram with a ruler for labels.',
        'Write the unit in magnification answers.',
      ],
      v: table(['Slip', 'Fix'], [['Saying phloem carries water', 'Phloem carries food; xylem carries water'], ['Writing that sclerenchyma is living', 'It is dead, with thick walls'], ['Forgetting intercalary meristem', 'It adds length at the base of leaves or internodes']], 'Table of three common slips and fixes for plant tissues'),
      n: 'Some exam tips. Be clear about which tissue is living and which is dead. In a comparison of xylem and phloem, state what each carries and in which direction. For meristems, say where the tissue lies and whether it adds length or thickness. Label diagrams with ruled lines. And always write the unit in answers about magnification.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Tissues, Part 2: animal tissues, joints and care of bones and muscles',
  goals: [
    'Relate the structure of epithelial, connective, muscular and nervous tissues to their functions',
    'Describe the structure of a neuron',
    'Identify the five types of joint',
    'Suggest ways to care for bones and muscles',
  ],
  slides: [
    sl('title', 'Animal tissues', {
      b: 'Part 2: the four tissues of animals, the joints that let us move, and how to look after them.',
      v: table(['Tissue', 'Example from your body'], [['Epithelial', 'Lining of your mouth'], ['Connective', 'Blood and bone'], ['Muscular', 'Biceps and heart'], ['Nervous', 'Nerves to your fingers']], 'Table of four animal tissues with an example from the human body'),
      n: 'Your body is a team of trillions of cells, working as four main kinds of tissue. Epithelial tissue covers and lines. Connective tissue supports and joins, and includes blood and bone. Muscular tissue moves the body, and nervous tissue carries signals. In this part we look at each, then at the joints that let you move, and at how to care for your bones and muscles.',
    }),
    sl('concept', 'The four animal tissues', {
      b: 'Animal tissues are **epithelial**, **connective**, **muscular** and **nervous**. Unlike plants, animals grow all over the body, so they have no separate meristems.',
      v: flow('TB', [['a', 'Animal tissues'], ['b', 'Epithelial: covers and lines'], ['c', 'Connective: supports and joins'], ['d', 'Muscular: moves'], ['e', 'Nervous: carries signals']], [['a', 'b'], ['a', 'c'], ['a', 'd'], ['a', 'e']], 'Tree diagram of the four animal tissues and the job of each'),
      n: 'Animals have four kinds of tissue. Epithelial tissue covers surfaces and lines hollow organs. Connective tissue supports the body and joins other tissues together. Muscular tissue contracts to produce movement. Nervous tissue carries signals quickly from one part of the body to another. Animals grow all over the body, so unlike plants they have no separate meristems.',
    }),
    sl('concept', 'Epithelial tissue', {
      b: 'Epithelial cells are **tightly packed** with very little space between them. They sit on a **basement membrane**. They form the skin, and line the mouth, blood vessels, kidney tubules, intestine and windpipe.',
      v: V.epithelia,
      n: 'Epithelial tissue forms a covering or a lining. Its cells are tightly packed with almost no space between them, and they rest on a basement membrane. Squamous cells are flat, cuboidal cells are cube-shaped, and columnar cells are tall. In the windpipe, columnar cells carry tiny hair-like cilia that sweep out mucus and dust. Glandular epithelium makes secretions such as sweat and saliva.',
    }),
    sl('concept', 'Types of epithelium and their jobs', {
      b: 'Structure matches function: thin flat cells allow easy exchange, tall cells have room for absorption and secretion.',
      v: V.epiTable,
      n: 'Here are the types. Squamous epithelium lines the mouth and blood vessels, where its thin flat cells protect and let substances pass easily. Cuboidal epithelium forms kidney tubules and gland ducts. Columnar epithelium lines the small intestine and absorbs food. Ciliated columnar epithelium in the windpipe moves mucus. Glandular epithelium makes secretions, for example in salivary and sweat glands.',
    }),
    sl('check', 'Quick check: epithelium', {
      b: 'Match an epithelium to its place.',
      n: 'Quick check. Think about the shape of the cell, and the job that its shape suits.',
      chk: 'chk-epithelial',
    }),
    sl('concept', 'Connective tissue', {
      b: 'Connective cells are **scattered in a matrix**, which may be liquid, jelly-like, firm or hard. Connective tissue supports, joins, stores, transports and protects.',
      v: V.connective,
      n: 'Connective tissue has cells scattered in a matrix, a material they make themselves. In blood the matrix is liquid plasma. In bone it is hard, with calcium and phosphorus salts. In cartilage it is firm and flexible. Tendons and ligaments are dense bands of strong fibres. A tendon joins muscle to bone, while a ligament joins one bone to another.',
    }),
    sl('concept', 'Kinds of connective tissue', {
      b: 'Blood has three kinds of cells in plasma: **red blood cells** carry oxygen, **white blood cells** fight germs, and **platelets** help blood to clot.',
      v: V.connTable,
      n: 'Here are seven connective tissues. Areolar tissue fills the spaces inside organs and helps in repair. Adipose tissue stores fat. Blood transports oxygen, food and wastes, and defends against germs. Bone supports and protects. Cartilage is firm but flexible, as in the ear and the nose. A ligament joins bone to bone, and a tendon joins muscle to bone.',
    }),
    sl('example', 'Worked example: name the tissue', {
      b: r`**Problem.** Name the tissue in each case. (a) A layer of tall cells lining the small intestine, where food is absorbed. (b) Strong cords joining the muscles of the calf to the heel bone. (c) Long cells that can send a signal over a metre.

**Step 1.** (a) Tall cells in a lining: **columnar epithelium**.

**Step 2.** (b) Muscle to bone: **tendon**, a connective tissue.

**Step 3.** (c) Signals over long distances: a **neuron**, nervous tissue.`,
      v: table(['Clue', 'Tissue'], [['Tall cells forming a lining', 'Columnar epithelium'], ['Cord joining muscle to bone', 'Tendon (connective)'], ['Long cell carrying signals', 'Neuron (nervous)']], 'Table linking three clues to the animal tissue they point to'),
      n: 'Use the clues. Tall cells forming a lining in the small intestine are columnar epithelium. A strong cord joining calf muscle to the heel bone is a tendon, which is connective tissue. A long cell that carries a signal over a distance of a metre is a neuron, which is nervous tissue. Look for the shape of the cells and the job they do.',
    }),
    sl('check', 'Quick check: connective tissue', {
      b: 'Choose the connective tissue that fits the description.',
      n: 'Quick check. Look at the clue about the matrix, whether it is liquid, firm, hard or made of strong fibres.',
      chk: 'chk-connective',
    }),
    sl('concept', 'Muscular tissue', {
      b: 'Muscle cells contain fibres that **contract** and relax. **Striated** muscle is attached to bones and is voluntary. **Smooth** muscle is in the walls of the food pipe and blood vessels. **Cardiac** muscle is found only in the heart.',
      v: V.muscles,
      n: 'Muscle cells are long, and they contract and relax to produce movement. Striated, or skeletal, muscle has light and dark stripes and many nuclei, and we control it. Smooth muscle has spindle-shaped cells with one nucleus each and no stripes, and it works without our control, for example in the food pipe. Cardiac muscle is striped, branched and found only in the heart.',
    }),
    sl('concept', 'The three muscles compared', {
      b: '**Voluntary** muscles work when we decide. **Involuntary** muscles work without our control.',
      v: V.muscleTable,
      n: 'Compare the muscles. Striated muscle has stripes, many nuclei, long unbranched fibres, and is voluntary, found in limbs and the body wall. Smooth muscle has no stripes, one nucleus and spindle-shaped cells, and is involuntary, found in the food pipe and blood vessels. Cardiac muscle has stripes, one nucleus and branched fibres, is involuntary, and is found only in the heart.',
    }),
    sl('concept', 'Nervous tissue and the neuron', {
      b: 'The **neuron** is the cell of nervous tissue. **Dendrites** receive signals, the **cell body** holds the nucleus, and the long **axon** carries the impulse away to the **nerve endings**.',
      v: V.neuron,
      n: 'Nervous tissue is made of nerve cells, or neurons. Branched dendrites receive signals and pass them to the cell body, which holds the nucleus. The long axon carries the impulse away from the cell body, and its end splits into nerve endings that pass the signal on to the next cell. An axon in a human can be about a metre long, and nerves are bundles of such fibres.',
    }),
    sl('check', 'Quick check: muscle and nerve', {
      b: 'Link structure to function in muscular and nervous tissue.',
      n: 'Quick check. Recall the shape of each cell, and then the job that the shape suits.',
      chk: 'chk-musclenerve',
    }),
    sl('concept', 'Joints', {
      b: 'A **joint** is where two bones meet. Ligaments hold bones together, and cartilage at the ends lets them move smoothly. Joints are classified by the movement they allow.',
      v: V.joints,
      n: 'Joints are the places where bones meet. A ball and socket joint, as at the shoulder and hip, allows movement in all directions. A hinge joint, as at the elbow and knee, moves back and forth in one plane. A pivot joint in the neck lets the head turn. Gliding joints at the wrist and ankle allow small sliding movements. Fixed joints in the skull allow no movement.',
    }),
    sl('concept', 'Caring for bones and muscles', {
      b: 'Good **posture**, regular **exercise** and a diet with **calcium** and **vitamin D** keep the musculoskeletal system healthy. Calcium builds bone and vitamin D helps the body absorb it.',
      v: table(['Habit', 'Why it helps'], [['Sit and stand straight; carry a school bag on both shoulders', 'Spreads load; protects the backbone'], ['Walk, run, play, stretch every day', 'Strengthens bones and muscles; keeps joints flexible'], ['Milk, curd, ragi, sesame and green leafy vegetables', 'Supply calcium'], ['Some time in morning sunlight; egg yolk, fish', 'Skin makes vitamin D; helps absorb calcium'], ['Warm up before sport; wear proper shoes', 'Prevents sprains and strains']], 'Table of habits for caring for bones and muscles and the reason for each'),
      n: 'To keep bones and muscles healthy, sit and stand straight, and carry a school bag on both shoulders. Exercise every day by walking, running, playing and stretching. Eat foods rich in calcium, such as milk, curd, ragi and green leafy vegetables. Vitamin D helps the body absorb calcium, and the skin makes it in sunlight. Too little vitamin D in children can cause soft, bent bones.',
    }),
    sl('example', 'Worked example: calcium in milk', {
      b: r`**Problem (illustrative data).** A student needs about ${CALC.need} mg of calcium a day. Milk has about ${CALC.per100} mg in 100 mL. How many ${CALC.glass_mL} mL glasses of milk would supply her whole need?

**Step 1.** Calcium in one glass $= ${CALC.per100} \times \dfrac{${CALC.glass_mL}}{100} = ${CALC.perGlass}\ \text{mg}$.

**Step 2.** Glasses needed $= \dfrac{${CALC.need}}{${CALC.perGlass}} \approx 4.2$. In practice, about three to four glasses plus calcium from other foods such as ragi and green vegetables.`,
      v: flow('LR', [['a', 'Calcium per 100 mL'], ['b', 'Scale to one glass'], ['c', 'Divide daily need by one glass'], ['d', 'Add other foods']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow showing the steps for working out how many glasses of milk supply the daily calcium'),
      n: 'Let us use some numbers. Suppose milk has about one hundred and twenty milligrams of calcium in every hundred millilitres. One glass of two hundred millilitres then gives two hundred and forty milligrams. If a student needs about one thousand milligrams a day, that is a little over four glasses. In practice she also gets calcium from other foods such as ragi, curd and green leafy vegetables.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Epithelial tissue covers and lines; its cells are tightly packed on a basement membrane.',
        'Connective tissue has cells in a matrix: blood, bone, cartilage, ligament, tendon, areolar, adipose.',
        'Striated, smooth and cardiac muscle contract to give movement.',
        'The neuron has dendrites, cell body, axon and nerve endings.',
        'Joints: ball and socket, hinge, pivot, gliding, fixed. Posture, exercise, calcium and vitamin D protect bones and muscles.',
      ],
      v: table(['Tissue', 'One-line job'], [['Epithelial', 'Covers, lines, protects'], ['Connective', 'Supports, joins, transports'], ['Muscular', 'Moves'], ['Nervous', 'Carries signals']], 'Summary table of the four animal tissues and their jobs'),
      n: 'Let us sum up. Epithelial tissue covers and lines, connective tissue supports and joins, muscular tissue moves, and nervous tissue carries signals. Blood, bone, cartilage, tendon and ligament are connective tissues. Joints are of five kinds. Good posture, regular exercise and enough calcium and vitamin D keep bones and muscles strong throughout life.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Say a tendon joins muscle to bone and a ligament joins bone to bone.',
        'Name the matrix when you describe a connective tissue.',
        'For muscles, compare stripes, nuclei, shape and control in a table.',
        'Give an example with each type of joint.',
        'For care of bones, name the food and give the reason.',
      ],
      v: table(['Slip', 'Fix'], [['Mixing up tendon and ligament', 'Tendon: muscle to bone; ligament: bone to bone'], ['Saying cardiac muscle is voluntary', 'It is involuntary'], ['Writing "vitamin D builds bone"', 'It helps absorb calcium, which builds bone']], 'Table of three common slips and fixes for animal tissues'),
      n: 'Some exam tips. A tendon joins muscle to bone and a ligament joins bone to bone. When you describe connective tissue, say what the matrix is like. Compare muscles on four points: stripes, nuclei, shape and control. Give an example with every joint. And when you write about calcium and vitamin D, say that vitamin D helps the body to absorb calcium.',
    }),
  ],
});
