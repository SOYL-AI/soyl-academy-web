// ICSE 9 Biology ch02 Tissues — Part 1 (t01–t02, plant tissues), Part 2 (t03–t05, animal tissues and their roles).
import { sl, deck, table, flow, svgV } from '../../icse-9-biology-ch01/src/lib.mjs';
import { MERISTEMS, SIMPLE, VASCULAR, EPITHELIA, CONNECTIVE, MUSCLES, NEURON } from './svgs.mjs';
import { DYE, HEART, SHOOT } from './calc.mjs';

export const V = {
  meristems: svgV(MERISTEMS, 'Positions of apical, intercalary and lateral meristems in a plant'),
  simple: svgV(SIMPLE, 'Parenchyma, collenchyma and sclerenchyma in cross-section'),
  vascular: svgV(VASCULAR, 'Xylem vessels and phloem sieve tubes with companion cells in long section'),
  epithelia: svgV(EPITHELIA, 'Squamous, cuboidal, columnar and ciliated epithelium'),
  connective: svgV(CONNECTIVE, 'Areolar tissue, cartilage, bone and adipose tissue'),
  muscles: svgV(MUSCLES, 'Striated, unstriated and cardiac muscle'),
  neuron: svgV(NEURON, 'A neuron with dendrites, cell body, nucleus, axon and axon terminals'),
};

export const deck1 = deck({
  part: 1,
  title: 'Tissues — Part 1: Plant tissues',
  goals: [
    'Classify meristems as apical, intercalary and lateral and say where each is found',
    'Compare parenchyma, collenchyma and sclerenchyma in structure and function',
    'State the components and functions of xylem and phloem',
  ],
  slides: [
    sl('title', 'Tissues', {
      b: 'Part 1 — how plants divide the work: growing tissues and permanent tissues.',
      v: flow('LR', [['t', 'Plant tissues'], ['m', 'Meristematic: dividing'], ['p', 'Permanent: specialised']], [['t', 'm'], ['t', 'p']], 'Flow splitting plant tissues into meristematic tissue that divides and permanent tissue that is specialised'),
      n: 'A tissue is a group of similar cells that work together to do one job. In a plant some tissues keep dividing so that the plant grows. Others have stopped dividing and have settled into a particular job.',
    }),
    sl('diagram', 'Where the meristems lie', {
      b: '**Meristems** are tissues whose cells keep dividing. They are **apical**, **intercalary** or **lateral**.',
      v: V.meristems,
      n: 'Look at where growth happens. The tips of the shoot and the root hold the apical meristems. At the base of an internode lies the intercalary meristem. And along the stem a thin layer called the cambium forms the lateral meristem.',
    }),
    sl('concept', 'Three kinds of meristem', {
      v: table(['Meristem', 'Position', 'Effect on the plant'], [['Apical', 'Tips of roots and shoots', 'Increases length'], ['Intercalary', 'Base of leaves or internodes, as in grasses', 'Increases length at the nodes'], ['Lateral', 'Along the sides of stems and roots (cambium)', 'Increases girth (thickness)']], 'Table of apical, intercalary and lateral meristems with position and effect'),
      n: 'Apical and intercalary meristems lengthen the plant. The lateral meristem makes stems and roots thicker. Meristematic cells are small, have thin walls, dense cytoplasm and a large nucleus, and have no big vacuole.',
    }),
    sl('check', 'Quick check: increasing length', {
      b: 'Which meristem is found at the tip of a root?',
      chk: 'apical-mcq',
      n: 'The name tells you the position.',
    }),
    sl('example', 'Worked example 1: which meristem is at work?', {
      b: `A gardener marks a bean shoot tip. It grows ${SHOOT.cmPerDay} cm a day. How much longer is it after ${SHOOT.days} days, and which meristem is responsible?`,
      ul: [`Step 1: growth is **${SHOOT.cmPerDay} cm** a day for **${SHOOT.days} days**.`, `Step 2: ${SHOOT.cmPerDay} × ${SHOOT.days} = **${SHOOT.total} cm**.`, 'Step 3: growth in **length** at a **tip** is due to the **apical meristem**.'],
      v: table(['Clue', 'Conclusion'], [['Length increases', 'Apical or intercalary'], ['Growth is at the shoot tip', 'Apical meristem'], [`${SHOOT.cmPerDay} cm a day for ${SHOOT.days} days`, `${SHOOT.total} cm longer`]], 'Worked table linking each clue about the shoot to the apical meristem and the total growth'),
      n: 'First work out the length gained by multiplying the daily growth by the number of days. Then name the meristem. Growth in length at a tip is the work of the apical meristem.',
    }),
    sl('diagram', 'Simple permanent tissues', {
      b: 'In **simple permanent tissues** all the cells are alike: **parenchyma**, **collenchyma** and **sclerenchyma**.',
      v: V.simple,
      n: 'Parenchyma cells are thin walled and living, with spaces between them. Collenchyma cells are living too, but their corners are thickened. Sclerenchyma cells are dead with thick, hard walls.',
    }),
    sl('concept', 'Comparing the simple tissues', {
      v: table(['Tissue', 'Cells', 'Function', 'Where found'], [['Parenchyma', 'Living, thin wall, spaces between cells', 'Storage; photosynthesis in green ones', 'Soft parts of stems, roots, leaves, fruits'], ['Collenchyma', 'Living, corners of the wall thickened', 'Flexible support', 'Below the epidermis of stems and in leaf stalks'], ['Sclerenchyma', 'Dead, thick lignified wall, no spaces', 'Strength and hardness', 'Husks, seed coats, fibres of jute']], 'Table comparing parenchyma, collenchyma and sclerenchyma on cells, function and where found'),
      n: 'Parenchyma stores food. Collenchyma supports parts that must bend, like leaf stalks. Sclerenchyma is the hard, strong tissue, as in the fibres of jute and the shell of a nut.',
    }),
    sl('check', 'Quick check: flexible support', {
      b: 'Which tissue gives flexible support to leaf stalks and young stems?',
      chk: 'colleno-mcq',
      n: 'Its cells are living, with thickened corners.',
    }),
    sl('diagram', 'Xylem and phloem', {
      b: '**Complex permanent tissues** have more than one kind of cell: **xylem** carries water and minerals, **phloem** carries food.',
      v: V.vascular,
      n: 'Xylem vessels are wide dead tubes that carry water and minerals upwards. Phloem sieve tubes are living but have no nucleus, and each has a companion cell beside it that does. Phloem carries food in both directions.',
    }),
    sl('concept', 'Components of xylem and phloem', {
      v: table(['Tissue', 'Components', 'Function'], [['Xylem', 'Tracheids, vessels, xylem fibres, xylem parenchyma', 'Conducts water and minerals upwards; supports'], ['Phloem', 'Sieve tubes, companion cells, phloem fibres, phloem parenchyma', 'Conducts food from leaves to all parts']], 'Table of the components and functions of xylem and phloem'),
      n: 'Each of these tissues is made of several kinds of cell. Xylem has tracheids, vessels, fibres and parenchyma. Phloem has sieve tubes, companion cells, fibres and parenchyma. Only the xylem fibres, tracheids and vessels are dead.',
    }),
    sl('example', 'Worked example 2: the stained celery', {
      b: `A celery stalk stands in red ink. The colour climbs ${DYE.cm} cm in ${DYE.min} minutes. Which tissue is stained, and how far will the ink rise in two hours at this speed?`,
      ul: ['Step 1: the ink moves **up** through narrow dead tubes: **xylem**.', `Step 2: speed = ${DYE.cm} cm in ${DYE.min} minutes = **${DYE.cmPerHour} cm an hour**.`, `Step 3: in two hours: ${DYE.cmPerHour} × 2 = **${DYE.after2h} cm**.`],
      v: table(['Step', 'Result'], [['Tissue stained', 'Xylem'], ['Speed', `${DYE.cmPerHour} cm an hour`], ['Rise in two hours', `${DYE.after2h} cm`]], 'Worked table: xylem is stained, the ink rises thirty centimetres an hour and sixty centimetres in two hours'),
      n: 'The red ink shows the path of water, so the stained strands are xylem. Fifteen centimetres in half an hour is thirty centimetres in a full hour, so in two hours the ink would climb sixty centimetres.',
    }),
    sl('check', 'Quick check: carrying food', {
      b: 'Which plant tissue carries food from the leaves to the other parts?',
      chk: 'phloem-mcq',
      n: 'Its sieve tubes are living.',
    }),
    sl('summary', 'Summary', {
      ul: ['Meristems divide: apical and intercalary lengthen, lateral thickens.', 'Parenchyma stores, collenchyma flexibly supports, sclerenchyma strengthens.', 'Xylem: tracheids, vessels, fibres, parenchyma; carries water and minerals.', 'Phloem: sieve tubes, companion cells, fibres, parenchyma; carries food.'],
      v: table(['Tissue', 'Living or dead'], [['Parenchyma', 'Living'], ['Collenchyma', 'Living'], ['Sclerenchyma', 'Dead'], ['Xylem vessels', 'Dead'], ['Phloem sieve tubes', 'Living']], 'Summary table showing which plant tissues are living and which are dead'),
      n: 'To recap. Meristems keep dividing. Parenchyma stores, collenchyma bends and supports, sclerenchyma is hard and dead. Xylem moves water upwards and phloem moves food.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Say **apical** for length at tips and **lateral** for girth.', 'Sclerenchyma is **dead**; collenchyma is **living**: do not swap them.', 'Sieve tubes are **living** but have **no nucleus**; the **companion cell** has it.', 'Tabulate with **matching points** side by side.'],
      n: 'Exam tips. Name apical meristems for length and lateral meristems for thickness. Sclerenchyma is dead and collenchyma is alive. Sieve tubes lack a nucleus, so the companion cell controls them. Write comparisons point against point.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Tissues — Part 2: Animal tissues and their roles',
  goals: [
    'Identify types of epithelium and connective tissue with their location and function',
    'Compare striated, unstriated and cardiac muscle and describe a neuron',
    'Relate the structure of a tissue to its role in transport, support and coordination',
  ],
  slides: [
    sl('title', 'Animal Tissues', {
      b: 'Part 2 — covering, joining, moving and signalling tissues.',
      v: flow('LR', [['a', 'Animal tissues'], ['e', 'Epithelial: cover and line'], ['c', 'Connective: join and support'], ['m', 'Muscular: move'], ['n', 'Nervous: coordinate']], [['a', 'e'], ['a', 'c'], ['a', 'm'], ['a', 'n']], 'Flow from animal tissues to epithelial, connective, muscular and nervous tissue'),
      n: 'Animals have four main kinds of tissue. Epithelial tissue covers and lines. Connective tissue joins and supports. Muscular tissue moves. And nervous tissue carries messages for coordination.',
    }),
    sl('diagram', 'Epithelial tissue', {
      b: '**Epithelium** forms the lining and covering of the body. Cells sit closely packed on a basement layer.',
      v: V.epithelia,
      n: 'Squamous cells are thin and flat. Cuboidal cells are cubes. Columnar cells are tall. In the windpipe the columnar cells carry cilia that sweep mucus along.',
    }),
    sl('concept', 'Types of epithelium', {
      v: table(['Type', 'Where found', 'Function'], [['Squamous', 'Air sacs of lungs, lining of blood vessels, mouth', 'Protection; easy diffusion'], ['Cuboidal', 'Kidney tubules, ducts of glands', 'Secretion and absorption'], ['Columnar', 'Lining of the stomach and intestine', 'Secretion and absorption'], ['Ciliated', 'Windpipe, tubes of the respiratory tract', 'Moves mucus and dust along']], 'Table of the types of epithelium with location and function'),
      n: 'Match the shape to the job. Thin flat cells let gases pass easily. Cube-shaped and tall cells secrete or absorb. Ciliated cells in the windpipe sweep dust and mucus upwards.',
    }),
    sl('check', 'Quick check: a thin lining', {
      b: 'Which epithelium lines the air sacs of the lungs?',
      chk: 'squam-mcq',
      n: 'Gases must pass through it easily.',
    }),
    sl('diagram', 'Connective tissues', {
      b: '**Connective tissues** have cells set in a **matrix**. They bind, support and fill. Blood is a connective tissue with a fluid matrix.',
      v: V.connective,
      n: 'Areolar tissue fills spaces and binds skin to muscle. Cartilage is firm but bendy. Bone has a hard matrix of salts. Adipose tissue stores fat. Blood, a fluid tissue, carries substances around the body.',
    }),
    sl('concept', 'Types of connective tissue', {
      v: table(['Tissue', 'Where found', 'Function'], [['Areolar', 'Under the skin; around organs', 'Binds and fills spaces'], ['Adipose', 'Under the skin; around kidneys', 'Stores fat; insulates'], ['Cartilage', 'Ear, nose, ends of bones', 'Flexible support'], ['Bone', 'Skeleton', 'Hard support; protects organs'], ['Tendon', 'Between muscle and bone', 'Joins muscle to bone'], ['Ligament', 'Between bone and bone at joints', 'Joins bone to bone'], ['Blood', 'Blood vessels', 'Transports substances']], 'Table of areolar, adipose, cartilage, bone, tendon, ligament and blood with location and function'),
      n: 'Learn each tissue by where it is and what it does. Tendons join muscle to bone and ligaments join bone to bone. Blood has a fluid matrix called plasma.',
    }),
    sl('example', 'Worked example 1: naming the tissue', {
      b: 'A boy tears the strong cord joining his calf muscle to the heel bone. Which tissue is torn, and what is its job?',
      ul: ['Step 1: the cord joins **muscle to bone**.', 'Step 2: a connective tissue that does this is a **tendon**.', 'Step 3: it passes the pull of the muscle on to the bone.'],
      v: table(['What it joins', 'Tissue'], [['Muscle to bone', 'Tendon'], ['Bone to bone', 'Ligament']], 'Table: tendon joins muscle to bone and ligament joins bone to bone'),
      n: 'Ask what the cord joins. Muscle to bone means a tendon. Bone to bone means a ligament. The tendon passes the pull of the muscle to the bone so that the bone moves.',
    }),
    sl('check', 'Quick check: storing fat', {
      b: 'Which connective tissue stores fat?',
      chk: 'adipose-mcq',
      n: 'Its cells are large with a fat droplet.',
    }),
    sl('diagram', 'Muscular tissue', {
      b: '**Muscles** contract to bring about movement. They are **striated**, **unstriated** or **cardiac**.',
      v: V.muscles,
      n: 'Skeletal muscle is striped, with many nuclei, and we control it. Smooth muscle has no stripes and works without our control. Cardiac muscle is striped and branched and forms the wall of the heart.',
    }),
    sl('concept', 'Three kinds of muscle', {
      v: table(['Point', 'Striated', 'Unstriated', 'Cardiac'], [['Stripes', 'Present', 'Absent', 'Present'], ['Control', 'Voluntary', 'Involuntary', 'Involuntary'], ['Cell shape', 'Long, cylindrical, unbranched', 'Spindle-shaped', 'Branched'], ['Nuclei', 'Many', 'One', 'Usually one'], ['Where found', 'Limbs, attached to bones', 'Gut, blood vessels', 'Heart']], 'Table comparing striated, unstriated and cardiac muscle'),
      n: 'Compare them in a table. Striated muscle moves the limbs and is voluntary. Unstriated muscle moves food along the gut without our control. Cardiac muscle is found only in the heart.',
    }),
    sl('example', 'Worked example 2: a tireless muscle', {
      b: `A resting heart beats ${HEART.perMin} times a minute. How many beats in an hour and in a day? Which muscle is this?`,
      ul: [`Step 1: ${HEART.perMin} × 60 = **${HEART.perHour} beats** in an hour.`, `Step 2: ${HEART.perHour} × 24 = **${HEART.perDay} beats** in a day.`, 'Step 3: the muscle of the heart is **cardiac muscle**, which does not tire.'],
      v: table(['Time', 'Beats'], [['One minute', String(HEART.perMin)], ['One hour', String(HEART.perHour)], ['One day', String(HEART.perDay)]], 'Worked table of heartbeats in a minute, an hour and a day'),
      n: 'Multiply step by step. Seventy two beats in each minute gives four thousand three hundred and twenty in an hour. Multiply by twenty four hours for the whole day. Only cardiac muscle can keep this up.',
    }),
    sl('check', 'Quick check: muscle control', {
      b: 'Which muscle is striated but involuntary?',
      chk: 'cardiac-mcq',
      n: 'Think of the muscle of the heart.',
    }),
    sl('diagram', 'Nervous tissue: the neuron', {
      b: 'A **neuron** has **dendrites**, a **cell body** with a **nucleus**, a long **axon** and **axon terminals**. It carries **impulses**.',
      v: V.neuron,
      n: 'Dendrites pick up messages and pass them to the cell body. The axon carries the impulse away to the terminals, which pass it on to the next neuron or to a muscle. A myelin sheath speeds the impulse.',
    }),
    sl('concept', 'Structure and role: tissues at work', {
      v: table(['Process', 'Tissue', 'How its structure suits the job'], [['Transport in plants', 'Xylem and phloem', 'Long tubes joined end to end'], ['Support in plants', 'Sclerenchyma, collenchyma', 'Thick, hard or thickened walls'], ['Gas exchange', 'Squamous epithelium', 'Very thin cells'], ['Movement', 'Muscular tissue', 'Fibres that contract'], ['Coordination', 'Nervous tissue', 'Long branched cells that carry impulses']], 'Table relating tissues to the processes of transport, support, gas exchange, movement and coordination'),
      n: 'In every case the shape of the cells suits the work. Long tubes carry fluids. Thick walls support. Thin cells let gases through. Contracting fibres move the body. Long, branched neurons carry messages.',
    }),
    sl('check', 'Quick check: structure and job', {
      b: 'Which feature of a neuron suits it to carry impulses over long distances?',
      chk: 'axon-mcq',
      n: 'Think about its shape.',
    }),
    sl('summary', 'Summary', {
      ul: ['Epithelium: squamous, cuboidal, columnar, ciliated.', 'Connective: areolar, adipose, cartilage, bone, tendon, ligament, blood.', 'Muscle: striated (voluntary), unstriated and cardiac (involuntary).', 'Nervous tissue: neurons carry impulses.'],
      v: table(['Tissue', 'Main job'], [['Epithelial', 'Cover and line'], ['Connective', 'Bind and support'], ['Muscular', 'Movement'], ['Nervous', 'Coordination']], 'Summary table of the main job of each animal tissue'),
      n: 'To recap. Epithelium covers and lines. Connective tissue binds, supports and transports. Muscle moves the body and its organs. Nervous tissue carries impulses so that the parts of the body work together.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['**Tendon**: muscle to bone. **Ligament**: bone to bone.', '**Cardiac** muscle is **striated** yet **involuntary**.', 'In a neuron diagram label **dendrites**, **cell body**, **nucleus**, **axon**, **axon terminals**.', 'Give **location and function** together when asked to identify a tissue.'],
      n: 'Exam tips. Do not swap tendons and ligaments. Remember that cardiac muscle is striped but involuntary. When you draw a neuron, label the dendrites, cell body, nucleus, axon and terminals. And always give the location along with the function.',
    }),
  ],
});
