// ch06 Control and Coordination — two decks: Part 1 (t01–t03) animals' nervous system; Part 2 (t04–t06) plants and hormones.
import { sl, deck, table, flow, svgV, plot, r } from './lib.mjs';
import { NEURON, SYNAPSE, REFLEX, BRAIN, MIMOSA, TROPISM, AUXIN, TENDRIL, GLANDS } from './svgs.mjs';

export const V = {
  neuron: svgV(NEURON, 'Labelled neuron: dendrites, cell body with nucleus, axon and nerve endings, with an arrow showing the impulse travelling from dendrite to nerve ending', 'Information is picked up at the dendrite tips and leaves from the nerve endings.'),
  synapse: svgV(SYNAPSE, 'Synapse: the impulse reaches the axon ending, chemicals cross the gap and start a new impulse in the dendrite of the next neuron', 'The gap is far too small to see with the eye; it is drawn large here.'),
  reflex: svgV(REFLEX, 'Reflex arc from a skin receptor through a sensory neuron, a relay neuron in the spinal cord and a motor neuron to a muscle, with a branch to the brain', 'Colours only help you follow the three neurons.'),
  brain: svgV(BRAIN, 'Labelled side view of the brain showing forebrain, midbrain, pons, medulla, cerebellum, pituitary gland and spinal cord', 'Schematic, not to scale. The midbrain is mostly hidden under the forebrain in a real brain.'),
  mimosa: svgV(MIMOSA, 'Touch-me-not leaf with open leaflets before touching and folded leaflets on a drooping stalk a few seconds after touching'),
  tropism: svgV(TROPISM, 'Left: a potted seedling bending its shoot towards light from one side. Right: a seedling on its side in the dark, shoot turning up and root turning down'),
  auxin: svgV(AUXIN, 'Shoot tip lit from the left: auxin collects on the shaded right side, cells there grow longer, and the shoot bends towards the light'),
  tendril: svgV(TENDRIL, 'A tendril coiling around a stick because the side away from the stick grows faster than the side touching it'),
  glands: svgV(GLANDS, 'Outline of the human body with the pineal gland, hypothalamus, pituitary, thyroid, thymus, pancreas, adrenal glands, ovaries and testes marked', 'Ovaries are found only in females and testes only in males; both are shown on one outline.'),
};

const glucosePlot = plot(
  {
    x: { min: 0, max: 150, label: 'Time after the meal (minutes)' },
    y: { min: 60, max: 280, label: 'Blood glucose (mg per dL)' },
    series: [
      { label: 'Healthy person', kind: 'line', points: [[0, 90], [30, 140], [60, 128], [90, 108], [120, 94], [150, 90]] },
      { label: 'Person with untreated diabetes', kind: 'line', points: [[0, 150], [30, 230], [60, 262], [90, 245], [120, 222], [150, 205]] },
    ],
  },
  'Line graph of blood glucose after a meal: the healthy person rises from 90 to 140 and returns to 90 within two and a half hours; the person with untreated diabetes starts at 150, rises to about 260 and is still above 200 at 150 minutes',
  'Typical values for illustration, not a medical reference.',
);

export const deck1 = deck({
  part: 1,
  title: 'Control and Coordination — Part 1: The nervous system',
  goals: [
    'Explain why multicellular organisms need control and coordination',
    'Draw and label a neuron and describe how an impulse crosses a synapse',
    'Distinguish voluntary, involuntary and reflex actions and trace a reflex arc',
    'State the functions of the forebrain, midbrain, hindbrain and spinal cord, and how they are protected',
  ],
  slides: [
    sl('title', 'Control and Coordination', {
      b: 'Part 1 — how your body senses a change, sends a message and responds in a fraction of a second.',
      v: flow('LR', [['s', 'Stimulus (a change)'], ['r', 'Receptor'], ['n', 'Nerves carry impulses'], ['c', 'Brain or spinal cord decides'], ['e', 'Effector: muscle or gland'], ['o', 'Response']], [['s', 'r'], ['r', 'n'], ['n', 'c'], ['c', 'e'], ['e', 'o']], 'Flow from a stimulus to a receptor, along nerves to the brain or spinal cord, then to an effector that produces a response'),
      n: 'Namaste! Imagine a cricket ball flying towards you. In less than a second your eyes spot it, your brain judges its speed, and your hands move to catch it. Dozens of muscles work together, each at the right moment. This teamwork is called coordination. In this part we discover the system that makes it possible: the nervous system, with its neurons, reflexes, brain and spinal cord.',
    }),
    sl('concept', 'Why living things need coordination', {
      b: 'A **stimulus** is a change in the surroundings, such as heat, light, sound or touch. Living things respond to stimuli in a controlled way. **Control and coordination** make sure the right body parts act together, at the right time, in the right amount.',
      v: table(['Stimulus', 'Response', 'Why it matters'], [['Hot tava touched', 'Hand pulled back at once', 'Prevents a burn'], ['Smell of food', 'Mouth waters', 'Prepares for digestion'], ['Bright sunlight', 'Pupils become smaller', 'Protects the retina'], ['Ball thrown at you', 'Hands move to catch it', 'Needs many muscles to work together']], 'Table of stimuli and the coordinated responses they cause, with the reason each response helps'),
      n: 'Every moment, your surroundings change. It gets hot or cold, bright or dark, noisy or quiet. A living body cannot react randomly. If you touched a hot tava and your legs moved instead of your hand, you would be burnt. So the body needs a system that senses the change and makes exactly the right parts respond. In animals, two systems share this job: the nervous system and the hormonal system.',
    }),
    sl('concept', 'Receptors: the body’s sensors', {
      b: '**Receptors** are specialised cells, usually in sense organs, that detect a stimulus and start a message. Each kind of receptor responds to one kind of stimulus.',
      v: table(['Receptor', 'Found in', 'Detects'], [['Photoreceptors', 'Eye (retina)', 'Light'], ['Phonoreceptors', 'Inner ear', 'Sound'], ['Olfactory receptors', 'Nose', 'Smell'], ['Gustatory receptors', 'Tongue (taste buds)', 'Taste'], ['Touch and heat receptors', 'Skin', 'Touch, pressure, heat, cold, pain']], 'Table of receptors, the sense organ each is found in and the stimulus each detects'),
      n: 'Your body has its own set of sensors. Photoreceptors in the eye respond to light. Receptors in the ear respond to sound. Olfactory receptors in the nose pick up smells, and gustatory receptors in the taste buds pick up tastes. The skin is full of receptors for touch, heat, cold and pain. When a receptor is stimulated, it starts a message that travels along nerve cells.',
    }),
    sl('diagram', 'The neuron: a cell built to carry messages', {
      b: 'A **neuron** (nerve cell) is the unit of the nervous system. Its **dendrites** pick up information, the **cell body** contains the nucleus, the long **axon** carries the impulse, and the **nerve endings** pass it on.',
      v: V.neuron,
      n: 'Look at the shape of a neuron. It is long and thin, a little like an electric wire with branched ends. The short branches, called dendrites, collect information. The cell body, with its nucleus, keeps the cell alive. The long axon carries the message, and the nerve endings at the far end hand it over. Some axons in your legs are almost a metre long.',
    }),
    sl('concept', 'How a nerve impulse travels', {
      b: 'At the dendrite tips, a stimulus sets off a chemical reaction that creates an **electrical impulse**. The impulse travels from the dendrite to the cell body, along the axon, to the nerve ending.',
      v: flow('LR', [['d', 'Dendrite tip picks up information'], ['c', 'Cell body'], ['a', 'Axon carries the electrical impulse'], ['e', 'Nerve ending releases chemicals']], [['d', 'c'], ['c', 'a'], ['a', 'e']], 'Flow of a nerve impulse: dendrite tip, cell body, axon, nerve ending'),
      n: 'Inside a neuron, information travels as a tiny electrical signal called a nerve impulse. It always moves the same way: from the dendrite, into the cell body, along the axon and out to the nerve ending. Remember the order with a simple phrase: dendrites receive, axons send. Exam answers often lose marks because the direction is written backwards.',
    }),
    sl('diagram', 'Crossing the gap: the synapse', {
      b: 'Neurons do not touch. Between the nerve ending of one neuron and the dendrite of the next is a tiny gap, the **synapse**. The electrical impulse makes the nerve ending release **chemicals**, which cross the gap and start a new electrical impulse in the next neuron.',
      v: V.synapse,
      n: 'If neurons do not touch, how does the message jump across? Think of a relay race where runners cannot hand over the baton directly, so they throw a ball across a small gap instead. At the end of the axon, the electrical impulse releases chemicals. They drift across the synapse and start a fresh impulse in the next dendrite. The same kind of junction passes messages from neurons to muscles and glands.',
    }),
    sl('check', 'Quick check: which way does the message go?', {
      b: 'A message must pass from neuron P to neuron Q across a synapse. Which statement is correct?',
      n: 'Quick check. Recall which end of a neuron releases the chemicals and which end receives them. Then decide which way a message can travel across the gap.',
      chk: 'syn-oneway-ar',
    }),
    sl('two-column', 'Voluntary, involuntary and reflex actions', {
      b: 'Actions can be sorted by whether we think about them.',
      cols: [
        '**Voluntary** — done by choice, after thinking; controlled by the **forebrain**. Examples: writing, talking, kicking a ball.\n\n**Involuntary** — happen on their own, without our choice; controlled mainly by the **midbrain and hindbrain**. Examples: heartbeat, breathing, salivation.',
        '**Reflex action** — a sudden, automatic response to a stimulus, without conscious thought; usually controlled by the **spinal cord**. Examples: pulling the hand away from a flame, pulling the foot off a sharp stone.',
      ],
      v: table(['Type', 'Thinking involved?', 'Controlled by', 'Example'], [['Voluntary', 'Yes', 'Forebrain', 'Writing a letter'], ['Involuntary', 'No', 'Midbrain and hindbrain', 'Heartbeat'], ['Reflex', 'No, and very fast', 'Spinal cord', 'Hand pulled from a flame']], 'Table comparing voluntary, involuntary and reflex actions by thinking involved, controlling part and an example'),
      n: 'Some actions you choose, like writing your name. These are voluntary. Some happen all the time without your choice, like your heartbeat. These are involuntary. And some happen suddenly when you are in danger, like snatching your hand away from a candle flame before you even think. These are reflex actions. Reflexes are the body’s emergency shortcuts.',
    }),
    sl('diagram', 'The reflex arc', {
      b: 'The pathway of a reflex is a **reflex arc**: **receptor → sensory neuron → relay neuron in the spinal cord → motor neuron → effector** (muscle or gland). The connection is made in the spinal cord, so the response is very quick. The message also travels on to the brain.',
      v: V.reflex,
      n: 'Here is the shortcut. The receptor in the skin fires an impulse along a sensory neuron into the spinal cord. There, a relay neuron passes it straight to a motor neuron, which makes the muscle contract. The brain is not asked first. That saves precious time. A copy of the message still goes up to the brain, which is why you feel the pain a moment after you have already moved.',
    }),
    sl('example', 'Worked example 1: tracing a reflex in the kitchen', {
      b: 'Meera’s finger touches a hot pressure-cooker lid and she pulls her hand back instantly. Trace the reflex arc and explain why she feels the pain only afterwards.',
      ul: [
        'Step 1 — **Stimulus**: heat. **Receptor**: heat and pain receptors in the skin of the finger.',
        'Step 2 — The **sensory neuron** carries the impulse to the **spinal cord**.',
        'Step 3 — A **relay neuron** in the spinal cord passes it to a **motor neuron**.',
        'Step 4 — The motor neuron reaches the arm **muscle (effector)**, which contracts and pulls the hand away.',
        'Step 5 — The impulse also travels up to the brain; it arrives slightly later, so the pain is felt after the hand has moved.',
      ],
      v: flow('LR', [['h', 'Heat'], ['r', 'Skin receptor'], ['s', 'Sensory neuron'], ['c', 'Spinal cord: relay neuron'], ['m', 'Motor neuron'], ['e', 'Arm muscle contracts'], ['b', 'Brain: pain felt a moment later']], [['h', 'r'], ['r', 's'], ['s', 'c'], ['c', 'm'], ['m', 'e'], ['c', 'b', 'copy of the message']], 'Flow tracing the reflex from heat to skin receptor, sensory neuron, spinal cord, motor neuron and arm muscle, with a branch to the brain'),
      n: 'Let us trace it step by step, the way examiners like. Name the stimulus and the receptor first. Then follow the impulse along the sensory neuron to the spinal cord, across the relay neuron, out along the motor neuron, and into the muscle. Finally, explain the delay in feeling pain: the message to the brain travels further, so awareness comes after the action.',
    }),
    sl('check', 'Quick check: where is the reflex arc?', {
      b: 'In a reflex such as pulling your foot off a sharp stone, where is the sensory neuron connected to the motor neuron?',
      n: 'Your turn. Think about the shortcut we just traced. Where does the impulse turn around, before the brain is involved?',
      chk: 'reflex-where',
    }),
    sl('concept', 'Central and peripheral nervous system', {
      b: 'The **central nervous system (CNS)** is the **brain** and the **spinal cord**. The **peripheral nervous system (PNS)** is made of **cranial nerves** (from the brain) and **spinal nerves** (from the spinal cord), which connect the CNS to every part of the body.',
      v: flow('TB', [['ns', 'Human nervous system'], ['c', 'Central nervous system'], ['p', 'Peripheral nervous system'], ['b', 'Brain'], ['s', 'Spinal cord'], ['cr', 'Cranial nerves (from the brain)'], ['sp', 'Spinal nerves (from the spinal cord)']], [['ns', 'c'], ['ns', 'p'], ['c', 'b'], ['c', 's'], ['p', 'cr'], ['p', 'sp']], 'Tree: the nervous system divides into the central nervous system (brain and spinal cord) and the peripheral nervous system (cranial and spinal nerves)'),
      n: 'Think of the central nervous system as the head office and the peripheral nerves as the telephone lines to every branch. The brain and spinal cord receive information from all over the body, process it and send out instructions. Cranial nerves start from the brain and serve the head, while spinal nerves start from the spinal cord and serve the rest of the body.',
    }),
    sl('diagram', 'The human brain', {
      b: 'The brain has three regions: the **forebrain**, the **midbrain** and the **hindbrain**. The hindbrain includes the **cerebellum**, the **pons** and the **medulla**, which continues as the spinal cord.',
      v: V.brain,
      n: 'The brain is the main coordinating centre of the body. The large, folded forebrain sits on top. Below it lies the small midbrain. At the back and bottom is the hindbrain, made of the cerebellum, the pons and the medulla. The medulla runs down into the spinal cord. The pea-sized pituitary gland hangs just below the brain; we will meet it again with hormones.',
    }),
    sl('concept', 'The forebrain: thinking and voluntary action', {
      b: 'The **forebrain (cerebrum)** is the main thinking part. It has areas that receive sensations — sight, hearing, smell, touch — and areas that control **voluntary muscles**. It also stores memory and links information to decide what to do.',
      v: table(['Forebrain area', 'Job', 'Example'], [['Sensory areas', 'Receive impulses from receptors', 'Recognising your friend’s voice'], ['Association areas', 'Combine information with memory to decide', 'Choosing the right answer in a quiz'], ['Motor areas', 'Send instructions to voluntary muscles', 'Writing the answer']], 'Table of forebrain areas, their jobs and everyday examples'),
      n: 'When you smell jalebis frying, the impulse reaches a smell area of the forebrain. Another area remembers how sweet jalebis taste, and you decide to buy some. Then the forebrain sends instructions to your leg muscles to walk to the stall. Sensing, remembering, deciding and moving on purpose are all jobs of the forebrain.',
    }),
    sl('concept', 'The midbrain and hindbrain: automatic control', {
      b: 'Many involuntary actions are controlled by the **midbrain** and **hindbrain**. The **medulla** controls blood pressure, salivation and vomiting. The **pons** helps regulate breathing. The **cerebellum** keeps **posture and balance** and makes voluntary movements **precise**.',
      v: table(['Part', 'Region', 'Controls'], [['Medulla', 'Hindbrain', 'Blood pressure, salivation, vomiting'], ['Pons', 'Hindbrain', 'Regulation of breathing'], ['Cerebellum', 'Hindbrain', 'Balance, posture, precise movements'], ['Midbrain', 'Midbrain', 'Some involuntary actions and reflex movements of the head and eyes']], 'Table of the medulla, pons, cerebellum and midbrain with the region each belongs to and what it controls'),
      n: 'You never have to remind yourself to keep your blood pressure steady or to make saliva when food arrives. The medulla in the hindbrain looks after these. The cerebellum is the body’s balance expert. Walking along a narrow wall, riding a cycle, or threading a needle all need the cerebellum to make your movements smooth and accurate.',
    }),
    sl('example', 'Worked example 2: which part of the brain?', {
      b: 'Decide which part of the brain is mainly involved in each situation.',
      ul: [
        'Step 1 — Ravi walks along a narrow railway platform edge without falling → balance → **cerebellum** (hindbrain).',
        'Step 2 — Saliva comes into Anu’s mouth when she sees pani puri → salivation → **medulla** (hindbrain).',
        'Step 3 — Kiran solves a sudoku and writes the numbers → thinking and voluntary action → **forebrain**.',
        'Step 4 — Check: thinking or choosing points to the forebrain; balance and precision to the cerebellum; automatic body functions to the medulla.',
      ],
      v: table(['Situation', 'Function', 'Brain part'], [['Walking on a narrow edge', 'Balance and posture', 'Cerebellum'], ['Mouth waters at food', 'Salivation', 'Medulla'], ['Solving and writing a sudoku', 'Thinking, voluntary action', 'Forebrain']], 'Worked table matching three situations to the function involved and the brain part responsible'),
      n: 'Here is a method that works every time. First, name the function hidden in the situation: is it balance, an automatic body function, or thinking and choosing? Then match the function to the brain part. Balance means cerebellum. Automatic functions like saliva and blood pressure mean medulla. Thinking and voluntary movement mean forebrain.',
    }),
    sl('check', 'Quick check: a fall from a cycle', {
      b: 'After a head injury, a cyclist can think and speak clearly but cannot keep his balance or pick up a pen precisely. Which part of the brain is most likely affected?',
      n: 'Quick check. Thinking and speaking are fine, so rule out the thinking part. Which part looks after balance and precise movement?',
      chk: 'brain-cerebellum-mcq',
    }),
    sl('concept', 'Protecting the brain and spinal cord', {
      b: 'The brain sits inside a bony box, the **skull (cranium)**, cushioned by **fluid** that absorbs shocks. The spinal cord runs inside the **vertebral column** (backbone).',
      v: table(['Organ', 'Bony protection', 'Extra protection'], [['Brain', 'Skull (cranium)', 'Fluid-filled cushion that absorbs shocks'], ['Spinal cord', 'Vertebral column (backbone)', 'Membranes and fluid around it']], 'Table showing the brain protected by the skull and fluid, and the spinal cord by the vertebral column'),
      n: 'The brain is soft and delicate, so the body packs it carefully, just as a shopkeeper packs eggs in a padded box. The hard skull keeps out bumps, and a cushion of fluid inside stops the brain from hitting the bone. The spinal cord is threaded through the backbone. This is also why helmets and seat belts matter: they add one more layer of protection.',
    }),
    sl('concept', 'From impulse to movement', {
      b: 'When a motor neuron’s impulse reaches a muscle, special **proteins** in the muscle cells change their shape and arrangement. The muscle cells **shorten**, and the body part moves.',
      v: flow('LR', [['i', 'Impulse arrives along the motor neuron'], ['c', 'Chemicals released at the muscle'], ['p', 'Muscle proteins change shape and arrangement'], ['s', 'Muscle cells shorten'], ['m', 'Body part moves']], [['i', 'c'], ['c', 'p'], ['p', 's'], ['s', 'm']], 'Flow from an impulse reaching a muscle to proteins changing shape, the muscle shortening and the body part moving'),
      n: 'How does an electrical message become movement? At the junction between nerve and muscle, chemicals are released, just as at a synapse. Inside the muscle cells, special proteins respond by changing their shape and the way they are arranged. The cells become shorter, the muscle pulls on the bone, and your arm bends. Every movement you make, even a blink, works this way.',
    }),
    sl('concept', 'Limits of electrical impulses', {
      b: 'Nerve impulses are fast, but they reach **only cells connected by nerves**. After firing, a cell needs time to **reset** before it can fire again. So the body also uses **chemical messengers (hormones)**, carried by the blood to all cells.',
      v: table(['Feature', 'Nerve impulses', 'Hormones'], [['Speed', 'Very fast', 'Slower'], ['Reach', 'Only cells joined by nerves', 'Every cell the blood reaches'], ['Effect', 'Short-lived', 'Longer-lasting'], ['Used for', 'Quick responses', 'Growth, development, steady control']], 'Table comparing nerve impulses and hormones by speed, reach, how long the effect lasts and typical use'),
      n: 'Nerve impulses are like phone calls: very fast, but they only reach houses that have a phone line. Hormones are like a radio broadcast: slower, but anyone with a receiver can pick them up. A neuron also needs a short rest after each impulse. For slow, widespread jobs like growth, the body therefore uses hormones. That is the bridge to Part 2.',
    }),
    sl('example', 'Worked example 3: how fast is a reflex?', {
      b: r`In a withdrawal reflex, the impulse travels $0.8\ \text{m}$ from a toe to the spinal cord and $0.8\ \text{m}$ back to the leg muscle. Nerve impulses here travel at $80\ \text{m/s}$. Find the time taken for conduction.`,
      ul: [
        r`Step 1 — Total distance $= 0.8 + 0.8 = 1.6\ \text{m}$.`,
        r`Step 2 — Time $= \dfrac{\text{distance}}{\text{speed}} = \dfrac{1.6}{80} = 0.02\ \text{s}$.`,
        r`Step 3 — In milliseconds: $0.02 \times 1000 = 20\ \text{ms}$.`,
        'Check — a message to the brain and back would travel much further, so a reflex is faster than a decision made by the brain.',
      ],
      v: table(['Quantity', 'Value'], [['Distance toe to spinal cord', r`$0.8\ \text{m}$`], ['Distance spinal cord to muscle', r`$0.8\ \text{m}$`], ['Speed of impulse', r`$80\ \text{m/s}$`], ['Conduction time', r`$0.02\ \text{s} = 20\ \text{ms}$`]], 'Worked table: total path 1.6 metres at 80 metres per second takes 0.02 seconds, or 20 milliseconds'),
      n: 'Let us put numbers on the speed of a reflex. Add the two distances to get one point six metres. Divide by the speed, eighty metres per second, to get two hundredths of a second, which is twenty milliseconds. Real reflexes take a little longer because each synapse adds a tiny delay. Still, it is far quicker than sending the message all the way to the brain and waiting for a decision.',
    }),
    sl('summary', 'Summary: the nervous system', {
      ul: [
        'Receptors detect stimuli; effectors (muscles and glands) carry out responses.',
        'A neuron: dendrite → cell body → axon → nerve ending; impulses are electrical inside, chemical across the synapse.',
        'Reflex arc: receptor → sensory neuron → relay neuron (spinal cord) → motor neuron → effector.',
        'CNS = brain + spinal cord; PNS = cranial and spinal nerves.',
        'Forebrain: thinking and voluntary actions. Medulla: blood pressure, salivation, vomiting. Cerebellum: balance and precision.',
        'Skull and fluid protect the brain; the vertebral column protects the spinal cord.',
      ],
      v: table(['Part', 'Key job'], [['Neuron', 'Carries electrical impulses'], ['Synapse', 'Passes the message on by chemicals, one way'], ['Spinal cord', 'Reflex arcs; link between brain and body'], ['Forebrain', 'Thinking, senses, voluntary movement'], ['Hindbrain', 'Involuntary control, balance']], 'Summary table of the neuron, synapse, spinal cord, forebrain and hindbrain with their key jobs'),
      n: 'Let us recap. Receptors sense, nerves carry, the brain or spinal cord decides, and effectors act. Inside a neuron the message is electrical; across a synapse it is chemical, and it goes one way only. Reflexes use a short cut through the spinal cord. The forebrain thinks, the hindbrain runs the automatic jobs and keeps you balanced, and bone and fluid keep it all safe.',
    }),
    sl('exam-tips', 'Exam tips: nervous system', {
      ul: [
        'Write the impulse direction correctly: **dendrite → cell body → axon → nerve ending**.',
        'In a reflex arc, name all five parts in order and say the connection is in the **spinal cord**.',
        'Do not write that reflexes involve "no brain at all"; the brain is informed, but it does not make the response.',
        'Neuron diagram (2 marks usually): dendrite, cell body, nucleus, axon, nerve ending, plus an arrow for direction.',
        'Match functions precisely: blood pressure and salivation → **medulla**; balance → **cerebellum**.',
        'Typical 3-mark split: definition (1) + labelled pathway or diagram (1) + reason or example (1).',
      ],
      v: table(['Common mistake', 'Correct idea'], [['Impulse travels axon to dendrite', 'Dendrite to cell body to axon to nerve ending'], ['Cerebellum controls thinking', 'Forebrain controls thinking; cerebellum controls balance'], ['Synapse is a physical connection', 'Synapse is a gap crossed by chemicals'], ['Reflexes never reach the brain', 'The brain is informed, after the response']], 'Table of common mistakes about the nervous system and the correct ideas'),
      n: 'Here is how to pick up easy marks. Always draw an arrow showing the direction of the impulse on a neuron. In a reflex arc question, list all five parts in order and mention the spinal cord. Avoid saying the brain plays no part in a reflex; it is informed, just not in charge of the response. And learn the brain functions as exact pairs.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Control and Coordination — Part 2: Plants and hormones',
  goals: [
    'Distinguish immediate responses, such as in touch-me-not, from growth-dependent tropic movements',
    'Describe phototropism, geotropism, hydrotropism, chemotropism and thigmotropism with examples',
    'State the roles of auxins, gibberellins, cytokinins and abscisic acid',
    'Match endocrine glands with their hormones and functions, and explain feedback regulation',
  ],
  slides: [
    sl('title', 'Coordination in plants and hormones in animals', {
      b: 'Part 2 — how plants respond without a nervous system, and how chemical messengers coordinate both plants and animals.',
      v: flow('LR', [['st', 'Stimulus'], ['p', 'Plants: chemical signals and changes in cells'], ['a', 'Animals: nerves and hormones'], ['r', 'Coordinated response']], [['st', 'p'], ['st', 'a'], ['p', 'r'], ['a', 'r']], 'Flow showing a stimulus leading to a coordinated response through chemical signals in plants and nerves and hormones in animals'),
      n: 'Plants have no brain, no nerves and no muscles. Yet a sunflower faces the sun, a money plant climbs a wall, and a seed always sends its root down. How do they do it? In this part we explore how plants respond, then meet the hormones that act as chemical messengers in both plants and animals.',
    }),
    sl('concept', 'Two kinds of movement in plants', {
      b: 'Plants respond in two ways: **immediate movements** that do not involve growth, and slow **growth movements** in which one side of an organ grows more than the other.',
      v: table(['', 'Immediate response', 'Growth movement'], [['Speed', 'Seconds', 'Hours or days'], ['Growth involved?', 'No', 'Yes'], ['How it happens', 'Cells change shape by gaining or losing water', 'Unequal growth on two sides'], ['Example', 'Touch-me-not leaves folding', 'Shoot bending towards light']], 'Table comparing immediate plant responses with growth movements by speed, growth, mechanism and example'),
      n: 'Some plant movements are fast. Touch a touch-me-not plant and its leaves fold within seconds. No growth can be that quick. Other movements are slow, like a shoot turning to face a window over a few days. These happen because one side grows faster than the other. Keep these two kinds separate in your answers.',
    }),
    sl('diagram', 'Touch-me-not: a quick response', {
      b: 'When a **touch-me-not** (*Mimosa pudica*) leaf is touched, its leaflets fold and droop within seconds. Information passes from cell to cell by **electrical-chemical signals**, and cells at the base of the leaflets **lose water**, change shape, and the leaflets fold.',
      v: V.mimosa,
      n: 'Next time you see a touch-me-not, called chhui mui in many places, try this gently. The leaflets fold as if shy. The plant has no nerves, so the message passes from cell to cell as electrical and chemical changes. Special cells lose water quickly, become limp, and the leaflets close. When water returns, the leaves open again. Notice that the plant does not grow during this movement.',
    }),
    sl('concept', 'Tropisms: growth towards or away from a stimulus', {
      b: 'A **tropism** is a **directional growth movement** in response to a stimulus. Growth **towards** the stimulus is **positive**; growth **away** is **negative**.',
      v: table(['Tropism', 'Stimulus', 'Example'], [['Phototropism', 'Light', 'Shoot grows towards light (positive)'], ['Geotropism', 'Gravity', 'Root grows downwards (positive); shoot grows upwards (negative)'], ['Hydrotropism', 'Water', 'Roots grow towards moist soil'], ['Chemotropism', 'Chemicals', 'Pollen tube grows towards the ovule'], ['Thigmotropism', 'Touch', 'Tendrils coil around a support']], 'Table of five tropisms with their stimulus and an example of each'),
      n: 'Tropism comes from a Greek word meaning turning. Each tropism is named after its stimulus: photo for light, geo for the earth’s gravity, hydro for water, chemo for chemicals and thigmo for touch. If the plant part grows towards the stimulus we call it positive; if it grows away, negative. A shoot is positively phototropic and negatively geotropic. A root is the opposite.',
    }),
    sl('diagram', 'Phototropism and geotropism in action', {
      b: 'Shoots grow **towards light** and **away from gravity**. Roots grow **towards gravity**. Lay a seedling on its side in the dark and both bend within a day or two.',
      v: V.tropism,
      n: 'Try this at home. Keep a potted seedling near a window for a week, and the shoot bends towards the light. Now lay a germinating seed on its side in a dark box. In a day or two, the shoot curves upwards and the root curves downwards, even without light. This shows that gravity alone can direct growth. Both responses help the plant: leaves reach light, and roots reach water and anchorage.',
    }),
    sl('concept', 'More tropisms: water, chemicals and touch', {
      b: 'Roots grow towards moist soil (**hydrotropism**). A **pollen tube** grows down the style towards the ovule, guided by chemicals (**chemotropism**). **Tendrils** of climbers coil around supports (**thigmotropism**): the side touching the support grows more slowly than the side away from it.',
      v: V.tendril,
      n: 'Look closely at a bitter gourd or pea plant climbing a fence. Its thin tendrils wrap around the wire. Where a tendril touches the support, it grows slowly, while the outer side keeps growing faster, so the tendril curls around. Underground, roots bend towards moist soil. And inside a flower, the pollen tube follows a chemical trail all the way to the ovule.',
    }),
    sl('check', 'Quick check: the pollen tube', {
      b: 'The growth of a pollen tube towards the ovule is an example of which response?',
      n: 'Quick check. What guides the pollen tube: light, gravity, water, touch or chemicals? Name the tropism from its stimulus.',
      chk: 'chemo-fill',
    }),
    sl('diagram', 'How auxin bends a shoot', {
      b: '**Auxin** is a plant hormone made at the shoot tip. When light falls from one side, auxin moves to the **shaded side**. There it makes cells **grow longer**, so the shaded side grows more and the shoot **bends towards the light**.',
      v: V.auxin,
      n: 'Here is the chemistry behind phototropism. The shoot tip makes a hormone called auxin, which makes cells stretch and grow longer. When light comes from one side, auxin collects on the darker side. Cells there grow longer than cells on the lit side. A shoot that grows more on one side must curve, and it curves towards the light. No muscles, just clever growth.',
    }),
    sl('example', 'Worked example 1: reading a seedling experiment', {
      b: 'Three sets of oat seedlings are lit from the right for two days. Explain the results.',
      ul: [
        'Step 1 — Set A (tip uncovered): bends right. Light from the right moves auxin to the left (shaded) side, which grows more.',
        'Step 2 — Set B (tip covered by a foil cap): grows straight. The tip cannot sense the direction of light, so auxin is spread evenly.',
        'Step 3 — Set C (tip cut off): little growth, no bending. The tip, the source of auxin, is gone.',
        'Conclusion — the **tip** senses light and makes **auxin**; unequal auxin causes **unequal growth**, which is bending.',
      ],
      v: table(['Set', 'Treatment', 'Result after two days', 'Reason'], [['A', 'Tip uncovered', 'Bends towards light', 'Auxin moves to shaded side'], ['B', 'Tip covered with foil cap', 'Grows straight up', 'Tip cannot sense light direction'], ['C', 'Tip removed', 'Little growth, no bending', 'No source of auxin']], 'Worked table of three seedling treatments, their results and the reasons, showing that the tip senses light and makes auxin'),
      n: 'This experiment is like a detective story. Each set changes one thing about the tip. When the tip is free, the seedling bends. Cover the tip, and it grows straight. Remove the tip, and growth almost stops. So the tip must both sense light and send a growth signal down the stem. That signal is auxin. In exams, always link the result to the reason.',
    }),
    sl('concept', 'Plant hormones', {
      b: 'Plant hormones (**phytohormones**) are chemicals made in one part of a plant that coordinate growth and responses in other parts.',
      v: table(['Hormone', 'Main role', 'Example'], [['Auxin', 'Cell elongation at the shoot tip; bending towards light', 'Phototropism'], ['Gibberellins', 'Growth of the stem', 'Taller stems; longer grape bunches'], ['Cytokinins', 'Promote cell division', 'High in fruits and seeds'], ['Abscisic acid', 'Inhibits growth; causes wilting of leaves', 'Response to water stress']], 'Table of four plant hormones, their main roles and an example of each'),
      n: 'Plants use four main hormones in your syllabus. Auxin makes cells grow longer. Gibberellins help stems grow. Cytokinins encourage cell division, so they are plentiful where cells divide fast, in fruits and seeds. Abscisic acid is the brake: it slows growth and is linked with the wilting of leaves, especially when water is short. Three promote growth; one holds it back.',
    }),
    sl('check', 'Quick check: the growth inhibitor', {
      b: 'Which plant hormone inhibits growth and is associated with the wilting of leaves?',
      n: 'Your turn. Three of the four plant hormones promote growth. Which one acts as the brake?',
      chk: 'aba-mcq',
    }),
    sl('concept', 'Hormones in animals', {
      b: '**Hormones** are chemical messengers made by **endocrine glands**. These glands have **no ducts**; they release hormones **directly into the blood**, which carries them to **target cells** that respond.',
      v: flow('LR', [['g', 'Endocrine gland'], ['b', 'Hormone released into the blood'], ['t', 'Target cells with receptors'], ['r', 'Response']], [['g', 'b'], ['b', 't', 'carried all over the body'], ['t', 'r']], 'Flow from an endocrine gland releasing a hormone into the blood to target cells that respond'),
      n: 'A hormone is like a letter posted to a particular address. The gland drops it into the bloodstream, which reaches every part of the body. But only cells with the right receptors, the target cells, open the letter and respond. Because endocrine glands have no ducts, they are also called ductless glands. Together they form the endocrine system.',
    }),
    sl('diagram', 'The endocrine glands', {
      b: 'Major endocrine glands: **hypothalamus**, **pituitary**, **pineal**, **thyroid**, **thymus**, **pancreas**, **adrenal glands**, **testes** (males) and **ovaries** (females).',
      v: V.glands,
      n: 'Here is a map of the endocrine glands. In the head are the hypothalamus, the pituitary and the pineal gland. The thyroid sits in the neck like a butterfly. The thymus is in the chest. The pancreas lies in the abdomen, and the adrenal glands sit on top of the kidneys like caps. The testes in males and the ovaries in females make the sex hormones.',
    }),
    sl('concept', 'Glands, hormones and their functions', {
      b: 'Each gland releases particular hormones with particular jobs.',
      v: table(['Gland', 'Hormone', 'Function'], [['Hypothalamus', 'Releasing hormones', 'Stimulate the pituitary to release its hormones'], ['Pituitary', 'Growth hormone', 'Growth and development of the body'], ['Thyroid', 'Thyroxine', 'Controls the use of carbohydrates, proteins and fats'], ['Pancreas', 'Insulin', 'Lowers blood sugar'], ['Adrenal', 'Adrenaline', 'Prepares the body for emergencies'], ['Testes', 'Testosterone', 'Changes in boys at puberty'], ['Ovaries', 'Oestrogen', 'Changes in girls at puberty']], 'Table of seven glands with the hormone each makes and its function'),
      n: 'This table is worth learning well, because it appears in many questions. Read across each row: gland, hormone, job. A handy trick is to group them. The hypothalamus and pituitary are the control pair in the head. Thyroxine and insulin manage how the body uses food. Adrenaline is for emergencies. Testosterone and oestrogen bring the changes of puberty.',
    }),
    sl('concept', 'Thyroxine, iodine and goitre', {
      b: 'The thyroid needs **iodine** to make **thyroxine**. Without enough iodine in the diet, the thyroid swells, causing **goitre** (a swollen neck). **Iodised salt** supplies the iodine we need.',
      v: flow('LR', [['l', 'Too little iodine in the diet'], ['t', 'Thyroid cannot make enough thyroxine'], ['s', 'Thyroid gland enlarges'], ['g', 'Goitre: swollen neck']], [['l', 't'], ['t', 's'], ['s', 'g']], 'Flow from low dietary iodine to too little thyroxine, an enlarged thyroid and goitre'),
      n: 'Iodine is needed in very small amounts, but it is essential. The thyroid gland uses it to make thyroxine, which controls how your body uses carbohydrates, proteins and fats. In areas where soil and water have little iodine, such as some hilly regions, goitre was once common. Adding iodine to common salt has prevented this for millions of people across India.',
    }),
    sl('concept', 'Growth hormone and puberty', {
      b: '**Growth hormone** from the pituitary controls growth. Too little in childhood causes **dwarfism**; too much causes **gigantism**. At **puberty**, **testosterone** (testes) and **oestrogen** (ovaries) bring about the changes of growing up.',
      v: table(['Hormone', 'Too little', 'Too much / role'], [['Growth hormone', 'Dwarfism (very short height)', 'Gigantism (very tall height)'], ['Testosterone', 'Delayed changes in boys', 'Deeper voice, facial hair, muscle growth'], ['Oestrogen', 'Delayed changes in girls', 'Breast development, start of the menstrual cycle']], 'Table of growth hormone and sex hormones with the effects of too little and their roles'),
      n: 'Have you noticed how classmates grow at different speeds in Classes nine and ten? That is hormones at work. Growth hormone from the pituitary decides how tall we grow. The sex hormones start the changes of puberty. These changes happen at different ages for different people, and that is perfectly normal. Doctors can treat many hormone problems if they are found early.',
    }),
    sl('concept', 'Insulin and diabetes', {
      b: '**Insulin**, made by the **pancreas**, helps cells take up glucose and so **lowers blood sugar**. If too little insulin is made, sugar builds up in the blood: this is **diabetes**. Many patients control it with diet, exercise, medicines or **insulin injections**.',
      v: flow('LR', [['m', 'Meal: blood sugar rises'], ['p', 'Pancreas releases insulin'], ['c', 'Cells take up glucose'], ['n', 'Blood sugar falls to normal']], [['m', 'p'], ['p', 'c'], ['c', 'n']], 'Flow from a meal raising blood sugar to the pancreas releasing insulin, cells taking up glucose and blood sugar returning to normal'),
      n: 'After you eat a plate of rice, glucose floods into your blood. The pancreas senses this and releases insulin, which helps body cells take up glucose. Blood sugar comes back to normal. In diabetes, the pancreas does not make enough insulin, so blood sugar stays high and damages the body over time. India has a very large number of people with diabetes, so understanding insulin really matters.',
    }),
    sl('diagram', 'Feedback: keeping hormones in balance', {
      b: 'The **timing and amount** of a hormone are controlled by **feedback**. When blood sugar rises, the pancreas releases more insulin; as sugar falls back to normal, insulin release is **reduced**.',
      v: flow('LR', [['h', 'Blood sugar high'], ['i', 'More insulin released'], ['f', 'Blood sugar falls'], ['n', 'Normal level reached'], ['l', 'Less insulin released']], [['h', 'i', 'pancreas detects'], ['i', 'f'], ['f', 'n'], ['n', 'l', 'pancreas detects'], ['l', 'h', 'after the next meal']], 'Feedback loop: high blood sugar causes more insulin, sugar falls to normal, insulin release drops, until sugar rises again'),
      n: 'Think of a ceiling fan with a regulator that adjusts itself. When the room heats up, the fan speeds up; when it cools, the fan slows down. Hormones work the same way. The result of a hormone feeds back to the gland and changes how much it releases. This feedback keeps the level just right, never too high and never too low.',
    }),
    sl('example', 'Worked example 2: reading a blood sugar graph', {
      b: 'The graph shows blood glucose after the same meal for two people. Interpret it.',
      ul: [
        'Step 1 — Healthy person: rises from 90 to 140 at 30 minutes, back to 90 by 150 minutes.',
        'Step 2 — Explanation: rising sugar triggers insulin; insulin lowers sugar; as sugar falls, less insulin is released (feedback).',
        'Step 3 — Second person: starts high (150), peaks near 260 and is still above 200 after 150 minutes.',
        'Conclusion — too little insulin (or cells not responding to it): signs of **diabetes**; a doctor would confirm with further tests.',
      ],
      v: glucosePlot,
      n: 'Graphs like this often appear in case-based questions. Read the starting value, the peak and the time to return. For the healthy person, sugar rises after the meal but comes back down within two and a half hours, thanks to insulin and feedback. For the second person, sugar stays high, which suggests the body is not making or using enough insulin. Always describe, then explain.',
    }),
    sl('check', 'Quick check: why feedback?', {
      b: 'Judge the assertion and the reason about feedback control of hormones.',
      n: 'Quick check. Read both statements carefully. Is each true on its own? Then ask whether the reason really explains the assertion.',
      chk: 'feedback-ar',
    }),
    sl('two-column', 'Nervous and hormonal coordination compared', {
      b: 'Both systems coordinate the body, but in different ways.',
      cols: ['**Nervous system**\n\n- Electrical impulses along nerves\n- Very fast; effect is short\n- Reaches only cells connected by nerves\n- Example: reflex action', '**Endocrine system**\n\n- Chemical messengers in the blood\n- Slower; effect lasts longer\n- Reaches all cells; only target cells respond\n- Example: growth, puberty, blood sugar'],
      v: table(['Feature', 'Nervous', 'Hormonal'], [['Message', 'Electrical impulse', 'Chemical (hormone)'], ['Carried by', 'Neurons', 'Blood'], ['Speed', 'Fast', 'Slow'], ['Duration of effect', 'Short', 'Long']], 'Table comparing nervous and hormonal coordination by message, carrier, speed and duration'),
      n: 'Here is the big picture. The nervous system is the body’s express service: quick, precise and short-lived. The endocrine system is the slow, steady postal service: it reaches everywhere and its effects last. They often work together. When you are frightened, nerves make you jump at once, and adrenaline keeps your heart racing for several minutes afterwards.',
    }),
    sl('summary', 'Summary: plants and hormones', {
      ul: [
        'Touch-me-not: immediate movement by water loss from cells, no growth.',
        'Tropisms are directional growth movements: photo-, geo-, hydro-, chemo- and thigmotropism.',
        'Auxin moves to the shaded side, cells there grow longer, and the shoot bends towards light.',
        'Auxin and gibberellins promote growth, cytokinins promote cell division, abscisic acid inhibits growth.',
        'Endocrine glands release hormones into the blood; feedback controls the amount and timing.',
        'Iodine → thyroxine (goitre if lacking); insulin lowers blood sugar (diabetes if lacking).',
      ],
      v: table(['Hormone', 'Source', 'Key fact'], [['Auxin', 'Shoot tip', 'Bending towards light'], ['Abscisic acid', 'Plant tissues', 'Inhibits growth'], ['Thyroxine', 'Thyroid', 'Needs iodine'], ['Insulin', 'Pancreas', 'Lowers blood sugar'], ['Adrenaline', 'Adrenal glands', 'Emergency response']], 'Summary table of five hormones with their source and one key fact'),
      n: 'Let us wrap up. Plants move quickly by changing the water in their cells, or slowly by growing unequally, guided by auxin and other hormones. Animals add a hormonal system to their nerves. Endocrine glands post their chemical messages into the blood, and feedback keeps the levels right. Remember the two classic deficiency stories: no iodine causes goitre, and too little insulin causes diabetes.',
    }),
    sl('exam-tips', 'Exam tips: plants and hormones', {
      ul: [
        'Do not call the touch-me-not response a tropism; it is not a growth movement and not directional.',
        'Write "positive" or "negative" with each tropism, e.g. roots are **positively geotropic**.',
        'For phototropism, mention all three: auxin made at the tip, moves to the shaded side, cells there elongate.',
        'Spell and match carefully: thyroxine–thyroid, insulin–pancreas, adrenaline–adrenal.',
        'Feedback answers need both directions: more hormone when the level is high, less when it returns to normal.',
        'Typical 3-mark split: name (1) + mechanism (1) + example or effect (1).',
      ],
      v: table(['Common mistake', 'Correct idea'], [['Shoot bends because light pushes it', 'Unequal growth caused by auxin on the shaded side'], ['Hormones go only to their target organ', 'Hormones reach all cells; only target cells respond'], ['Insulin increases blood sugar', 'Insulin lowers blood sugar'], ['Goitre is caused by too much iodine', 'Goitre is caused by too little iodine']], 'Table of common mistakes about plant movements and hormones with the correct ideas'),
      n: 'Here is how to avoid the usual traps. Never say light pushes or pulls a shoot; growth does the bending. Give the full auxin story in three steps. When writing about hormones, always pair the gland with its hormone and its job. And in feedback questions, describe both halves of the loop. Examiners reward precise words like elongation, target cells and ductless.',
    }),
  ],
});
