// ICSE 10 Biology ch10 Nervous System — question bank in ICSE 2027 style.
// Ruler-test means and percentages and impulse travel times come from calc.mjs.
// AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true, R does not explain.
import { mk, add, svgV, r } from '../../icse-10-biology-ch01/src/lib.mjs';
import { RULER, NERVE } from './calc.mjs';
import { NEURON_LETTERED, BRAIN_LETTERED, ARC_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, match, part } = mk;
const neuronFig = svgV(NEURON_LETTERED, 'A neuron with five parts lettered A to E');
const brainFig = svgV(BRAIN_LETTERED, 'Vertical section of the brain with five parts lettered A to E');
const arcFig = svgV(ARC_LETTERED, 'A reflex arc through the spinal cord with five parts lettered A to E');

// ---------------------------------------------------------------- t01 neuron; central, peripheral and autonomic systems
add('dendrite-mcq', mcq({
  stem: 'The dendrites of a neuron',
  right: 'carry impulses towards the cell body', wrong: ['carry impulses away from the cell body', 'form the fatty covering of the axon', 'release chemicals into the blood'],
  sol: 'Dendrites receive impulses and conduct them to the cyton; the axon carries them away — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('myelin-mcq', mcq({
  stem: 'The myelin sheath round an axon',
  right: 'insulates the axon and speeds up the impulse', wrong: ['produces the nerve impulse', 'joins two neurons at a synapse', 'contains the nucleus of the neuron'],
  sol: 'The fatty myelin sheath insulates the fibre, and impulses jump between the nodes of Ranvier, travelling faster — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('synapse-mcq', mcq({
  stem: 'A synapse is the',
  right: 'junction between the axon ending of one neuron and the dendrite of the next', wrong: ['fatty covering of a nerve fibre', 'gap between two nodes of Ranvier', 'point where a nerve enters the spinal cord'],
  sol: 'At a synapse the impulse passes from one neuron to the next by a chemical — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('cns-mcq', mcq({
  stem: 'The central nervous system consists of the',
  right: 'brain and spinal cord', wrong: ['cranial and spinal nerves', 'brain and cranial nerves', 'spinal cord and spinal nerves'],
  sol: 'The brain and spinal cord form the CNS; the nerves arising from them form the peripheral nervous system — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('ans-mcq', mcq({
  stem: 'Which activity is controlled by the autonomic nervous system?',
  right: 'The beating of the heart', wrong: ['Kicking a football', 'Writing an answer', 'Choosing a book to read'],
  sol: 'The autonomic system controls involuntary organs such as the heart, glands and gut — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('neuron-fig-mcq', mcq({
  stem: 'In the figure of a neuron, which letter marks the fatty covering that speeds up the impulse?',
  right: 'D', wrong: ['A', 'B', 'E'],
  sol: 'D is the myelin sheath. A are dendrites, B the cell body, E the axon endings — option (@K).',
  d: 2, c: 'application', t: [1],
  assets: [neuronFig],
}));
add('oneway-mcq', mcq({
  stem: 'An impulse crosses a synapse in one direction only, because',
  right: 'only the axon endings release the chemical that carries the impulse across', wrong: ['dendrites have a thicker myelin sheath', 'the synapse is filled with blood', 'impulses travel only towards the brain'],
  sol: 'The chemical (neurotransmitter) is stored only in the axon endings, so the message can only pass from axon to the next dendrite — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('speed-num', num({
  stem: `An impulse travels along a myelinated sensory fibre at about ${NERVE.fast} metres per second. How long, in milliseconds, does it take to travel ${NERVE.metres} metre from a toe to the spinal cord?`,
  value: NERVE.fastMs, unit: 'ms',
  sol: r`$\dfrac{${NERVE.metres}}{${NERVE.fast}} = 0.01$ s $= ${NERVE.fastMs}$ milliseconds.`,
  scheme: [[`${NERVE.fastMs} ms`, 1]],
  d: 3, c: 'application', t: [1],
}), (q) => q.answer.value === 10 || 'value');
add('myelin-ar', ar({
  a: 'Impulses travel faster along myelinated nerve fibres.',
  r: 'The myelin sheath is a fatty layer that insulates the axon.',
  key: 'c',
  sol: 'Both are true, and the insulating sheath, broken only at the nodes, lets the impulse jump along quickly — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('synapse-ar', ar({
  a: 'A nerve impulse passes from the dendrite of one neuron to the axon of the next.',
  r: 'At a synapse the impulse is carried across by a chemical.',
  key: 'b',
  sol: 'The assertion is false: the impulse passes from the axon ending of one neuron to the dendrite of the next. The reason is true — option (b).',
  d: 3, c: 'analysis', t: [1],
}));
add('motor-tf', tf({
  stem: 'Motor neurons carry impulses from the brain or spinal cord to muscles and glands.',
  key: 't',
  sol: 'True. Motor (efferent) neurons carry commands from the CNS to effectors.',
  d: 1, c: 'recall', t: [1],
}));
add('synapse-fill', fill({
  stem: 'The functional junction between the axon ending of one neuron and the dendrite of the next is called a ______.',
  acc: [['synapse']],
  sol: 'Synapse.',
  d: 1, c: 'recall', t: [1],
}));
add('cyton-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the part of a neuron that contains the nucleus.',
  model: '**Cell body** (cyton).',
  sol: 'Cyton.', scheme: [['Cell body / cyton', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('odd-neuron', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Dendrite, Axon, Nephron, Cyton.',
  model: '**Nephron**; the others are **parts of a neuron**.',
  sol: 'A nephron is a kidney tubule.', scheme: [['Odd one and category', 1]],
  d: 1, c: 'analysis', t: [1],
}));
add('cns-pns-short', short({
  marks: 2,
  stem: 'Distinguish between the central, peripheral and autonomic nervous systems in their roles.',
  model: 'The **CNS** (brain and spinal cord) receives information, **decides** and sends commands. The **PNS** (cranial and spinal nerves) **links** the CNS with sense organs and muscles. The **autonomic** system controls **involuntary** organs such as the heart, gut and glands.',
  sol: 'Control centre; connections; involuntary organs.',
  scheme: [['CNS and PNS roles', 1], ['Autonomic role', 1]],
  d: 2, c: 'understanding', t: [1], wl: [20, 50],
}));
add('neuron-draw', short({
  marks: 3, wl: null,
  stem: 'Draw a neat, labelled diagram of a neuron. Label the dendrites, cell body, nucleus, axon and myelin sheath, and show the direction of the impulse.',
  model: 'A **cell body** with a **nucleus**, several short branched **dendrites**, a single long **axon** wrapped in **myelin sheath** segments separated by nodes, ending in branched **axon endings**; an **arrow** from the dendrites towards the axon endings.',
  sol: 'Labelled neuron.',
  scheme: [['Cell body with nucleus and dendrites', 1], ['Axon with myelin sheath and endings', 1], ['Labels and direction arrow', 1]],
  d: 3, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 the brain
add('cerebellum-mcq', mcq({
  stem: 'A man who has drunk too much alcohol staggers and cannot walk in a straight line. The part of his brain most affected is the',
  right: 'cerebellum', wrong: ['hypothalamus', 'thalamus', 'medulla oblongata'],
  sol: 'The cerebellum maintains balance and coordinates muscular movements; alcohol upsets it — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('medulla-mcq', mcq({
  stem: 'Damage to the medulla oblongata is often fatal because it controls',
  right: 'breathing and the beating of the heart', wrong: ['memory and intelligence', 'balance and posture', 'hunger and thirst'],
  sol: 'The medulla oblongata contains centres for breathing, heartbeat and blood pressure — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('hypothal-mcq', mcq({
  stem: 'After a head injury, the body temperature of Mr Rao swings between too hot and too cold, and he rarely feels thirsty, though he has no infection. The part of his brain most likely affected is the',
  right: 'hypothalamus', wrong: ['cerebellum', 'pons', 'spinal cord'],
  sol: 'The hypothalamus, below the thalamus, controls body temperature, hunger, thirst and sleep — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('thalamus-mcq', mcq({
  stem: 'Impulses from the skin, eyes and ears pass through one region deep in the brain before reaching the cerebrum. If this region were damaged, sensations would not reach the cerebrum properly. The region is the',
  right: 'thalamus', wrong: ['cerebellum', 'medulla oblongata', 'hypothalamus'],
  sol: 'The thalamus is the relay centre between the sense pathways (except smell) and the cerebrum — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('pons-mcq', mcq({
  stem: 'The pons, a bulge on the brain stem,',
  right: 'connects different parts of the brain and helps to regulate breathing', wrong: ['stores memories', 'controls hunger and thirst', 'makes antibodies'],
  sol: 'The pons acts as a bridge between parts of the brain and, with the medulla, helps control breathing — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('medulla-ar', ar({
  a: 'The medulla oblongata controls involuntary actions such as breathing.',
  r: 'The medulla oblongata is the largest part of the brain.',
  key: 'a',
  sol: 'The assertion is true. The reason is false: the cerebrum is the largest part; the medulla is small and lowest — option (a).',
  d: 2, c: 'analysis', t: [2],
}));
add('cerebellum-fill', fill({
  stem: 'The part of the brain that maintains the balance and posture of the body is the ______.',
  acc: [['cerebellum']],
  sol: 'Cerebellum.',
  d: 1, c: 'recall', t: [2],
}));
add('odd-brain', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Cerebrum, Cerebellum, Spinal nerve, Medulla oblongata.',
  model: '**Spinal nerve**; the others are **parts of the brain**.',
  sol: 'A spinal nerve belongs to the peripheral nervous system.', scheme: [['Odd one and category', 1]],
  d: 2, c: 'analysis', t: [2, 1],
}));
add('reason-medulla', short({
  marks: 1, wl: null,
  stem: 'Give reason: a severe injury to the medulla oblongata can cause death.',
  model: 'It controls **breathing and heartbeat**; if these stop, the person dies.',
  sol: 'Vital centres.', scheme: [['Controls breathing and heartbeat', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('reason-stagger', short({
  marks: 1, wl: null,
  stem: 'Give reason: a person under the influence of alcohol often staggers.',
  model: 'Alcohol affects the **cerebellum**, which maintains **balance** and coordinates movements.',
  sol: 'Cerebellum affected.', scheme: [['Cerebellum affected', 1]],
  d: 2, c: 'application', t: [2],
}));
add('damage-short', short({
  marks: 2,
  stem: 'Predict one likely effect of damage to (a) the cerebellum and (b) the hypothalamus.',
  model: '(a) **Cerebellum:** loss of **balance** and jerky, **uncoordinated movements**, for example difficulty walking straight.\n(b) **Hypothalamus:** failure to control **body temperature**, or disturbed **hunger, thirst** or sleep.',
  sol: 'Balance; temperature or hunger.',
  scheme: [['Cerebellum effect', 1], ['Hypothalamus effect', 1]],
  d: 3, c: 'application', t: [2],
}));
add('brain-func-short', short({
  marks: 3,
  stem: 'State one function each of the cerebrum, the thalamus and the pons.',
  model: '1. **Cerebrum:** centre of **thinking, memory, intelligence** and **voluntary actions**; it also interprets sensations.\n2. **Thalamus:** **relays sensory impulses** to the cerebrum (and gives a rough sense of pain).\n3. **Pons:** **connects** different parts of the brain and helps **regulate breathing**.',
  sol: 'One function each.',
  scheme: [['Cerebrum', 1], ['Thalamus', 1], ['Pons', 1]],
  d: 2, c: 'recall', t: [2], wl: [25, 70],
}));

// ---------------------------------------------------------------- t03 spinal cord; grey and white matter
add('greywhite-mcq', mcq({
  stem: 'In a transverse section of the spinal cord,',
  right: 'grey matter lies inside and white matter outside', wrong: ['grey matter lies outside and white matter inside', 'there is only grey matter', 'there is only white matter'],
  sol: 'The spinal cord has a butterfly of grey matter in the centre with white matter round it, the reverse of the cerebrum — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('white-mcq', mcq({
  stem: 'White matter looks white because it consists mainly of',
  right: 'nerve fibres covered by myelin sheaths', wrong: ['cell bodies of neurons', 'cerebrospinal fluid', 'blood capillaries'],
  sol: 'The fatty myelin sheaths of the fibres give white matter its colour; grey matter is mostly cell bodies — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('spinal-func-mcq', mcq({
  stem: 'Which pair gives two functions of the spinal cord?',
  right: 'It carries impulses to and from the brain, and it is a centre for many reflex actions', wrong: ['It stores memory, and it controls hunger', 'It pumps blood, and it filters lymph', 'It makes hormones, and it controls balance'],
  sol: 'The white matter conducts impulses up and down; the grey matter coordinates spinal reflexes — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('grey-ar', ar({
  a: 'The outer part of the spinal cord is white.',
  r: 'It consists mainly of nerve fibres covered by myelin.',
  key: 'c',
  sol: 'Both are true, and the white myelin of the fibres is why the outer part looks white — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
add('grey-tf', tf({
  stem: 'In the cerebrum, grey matter lies inside and white matter lies outside.',
  key: 'f',
  sol: 'False. In the cerebrum grey matter forms the outer cortex and white matter lies inside; the spinal cord has the reverse.',
  d: 2, c: 'understanding', t: [3],
}));
add('reason-white', short({
  marks: 1, wl: null,
  stem: 'Give reason: white matter of the brain and spinal cord appears white.',
  model: 'It is made of nerve fibres covered by **white, fatty myelin sheaths**.',
  sol: 'Myelin.', scheme: [['Myelin sheaths', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('greywhite-short', short({
  marks: 2,
  stem: 'Describe how the arrangement of grey and white matter differs between the cerebrum and the spinal cord.',
  model: 'In the **cerebrum**, **grey matter** (cell bodies) forms the **outer cortex** and **white matter** (myelinated fibres) lies **inside**. In the **spinal cord** the arrangement is **reversed**: grey matter is **inside**, shaped like a butterfly, and white matter is **outside**.',
  sol: 'Reversed arrangement.',
  scheme: [['Cerebrum: grey outside', 1], ['Spinal cord: grey inside', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 voluntary, involuntary and reflex actions; reflex arc
add('reflex-def-mcq', mcq({
  stem: 'A reflex action is',
  right: 'a quick, automatic response to a stimulus, made without thinking', wrong: ['an action done after careful thought', 'an action controlled only by hormones', 'a slow growth movement towards light'],
  sol: 'Reflexes are rapid, involuntary responses that do not need a conscious decision — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('arc-order-mcq', mcq({
  stem: 'Which sequence shows the path of an impulse in a reflex arc?',
  right: 'Receptor → sensory neuron → relay neuron → motor neuron → effector', wrong: ['Effector → motor neuron → relay neuron → sensory neuron → receptor', 'Receptor → motor neuron → brain → sensory neuron → effector', 'Sensory neuron → receptor → effector → motor neuron → relay neuron'],
  sol: 'The impulse starts at the receptor, goes in by the sensory neuron, crosses a relay neuron in the spinal cord and leaves by the motor neuron to the effector — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('voluntary-mcq', mcq({
  stem: 'Which of these is a voluntary action?',
  right: 'Writing a letter to a friend', wrong: ['Sneezing when pepper enters the nose', 'The beating of the heart', 'Pulling the hand away from a thorn'],
  sol: 'Writing is done at will and is controlled by the cerebrum; the others happen without thought — option (@K).',
  d: 1, c: 'application', t: [4],
}));
add('knee-mcq', mcq({
  stem: 'When the tendon below the kneecap is tapped, the leg kicks forward. This knee-jerk is',
  right: 'a reflex controlled by the spinal cord', wrong: ['a voluntary action controlled by the cerebrum', 'an acquired reflex learnt in childhood', 'an action of the autonomic system on the heart'],
  sol: 'The knee-jerk is a spinal reflex: the arc passes through the spinal cord without needing the brain — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('blink-mcq', mcq({
  stem: 'Kiran blinks when a cricket ball suddenly comes towards her face. This is',
  right: 'a reflex action controlled by the brain', wrong: ['a voluntary action', 'a reflex controlled only by the spinal cord', 'an involuntary action of the heart'],
  sol: 'Blinking is a reflex; its centre lies in the brain, as the eyes are served by cranial nerves (a cranial reflex) — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('arc-fig-mcq', mcq({
  stem: 'In the figure of a reflex arc, which letter marks the neuron that lies wholly inside the spinal cord?',
  right: 'C', wrong: ['A', 'B', 'D'],
  sol: 'C is the relay neuron in the grey matter. A is the receptor, B the sensory neuron, D the motor neuron — option (@K).',
  d: 2, c: 'application', t: [4],
  assets: [arcFig],
}));
add('cut-root-mcq', mcq({
  stem: 'The sensory nerve fibres from Ravi\'s left hand are cut where they enter the spinal cord, but the motor fibres are intact. If his left hand touches a hot iron, he will',
  right: 'neither feel the heat nor pull the hand away by reflex', wrong: ['feel the heat but be unable to move the hand', 'pull the hand away but not feel the heat', 'feel the heat and pull the hand away as usual'],
  sol: 'Without the sensory pathway, no impulse reaches the spinal cord or brain, so there is no sensation and no reflex, although the muscles could still work if commanded — option (@K).',
  d: 4, c: 'analysis', t: [4],
}));
add('reflex-ar', ar({
  a: 'A reflex action is quicker than a voluntary action.',
  r: 'All reflex actions are present from birth.',
  key: 'a',
  sol: 'The assertion is true: a spinal reflex need not wait for the brain to decide. The reason is false: acquired reflexes are learnt after birth — option (a).',
  d: 3, c: 'analysis', t: [4, 5],
}));
add('reflex-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the pathway followed by an impulse from a receptor to an effector in a reflex action.',
  model: '**Reflex arc.**',
  sol: 'Reflex arc.', scheme: [['Reflex arc', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('relay-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the neuron in the grey matter of the spinal cord that links the sensory neuron with the motor neuron.',
  model: '**Relay neuron** (intermediate or association neuron).',
  sol: 'Relay neuron.', scheme: [['Relay / intermediate neuron', 1]],
  d: 2, c: 'recall', t: [4],
}));
add('odd-reflex', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Sneezing, Coughing, Knee-jerk, Painting a picture.',
  model: '**Painting a picture**; the others are **reflex actions**.',
  sol: 'Painting is a voluntary action.', scheme: [['Odd one and category', 1]],
  d: 2, c: 'analysis', t: [4],
}));
add('reason-hot', short({
  marks: 1, wl: null,
  stem: 'Give reason: we pull our hand away from a hot object before we feel any pain.',
  model: 'The withdrawal is a **spinal reflex**: the spinal cord sends the command at once, while the impulse for **pain** takes longer to reach the **brain**.',
  sol: 'Spinal reflex is faster.', scheme: [['Reflex through the spinal cord before the brain registers pain', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('vol-reflex-short', short({
  marks: 2,
  stem: 'State two differences between a voluntary action and a reflex action.',
  model: '1. A voluntary action is done **at will**, after **thinking**; a reflex action is **automatic**, without thinking.\n2. A voluntary action is controlled by the **cerebrum** and is slower; a reflex is usually controlled by the **spinal cord** and is very **quick**.',
  sol: 'Will; control centre; speed.',
  scheme: [['First difference', 1], ['Second difference', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('arc-short', short({
  marks: 3,
  stem: 'Describe the path of the impulse when you step on a sharp pin and lift your foot at once.',
  model: 'The **receptor** in the skin of the sole is stimulated. The impulse travels along a **sensory neuron** to the **spinal cord**, where a **relay neuron** in the grey matter passes it to a **motor neuron**. The motor neuron carries it to the **leg muscles** (effector), which contract and lift the foot.',
  sol: 'Receptor, sensory, relay, motor, effector.',
  scheme: [['Receptor and sensory neuron', 1], ['Relay neuron in the spinal cord', 1], ['Motor neuron and effector', 1]],
  d: 2, c: 'application', t: [4],
}));
add('arc-draw', short({
  marks: 3, wl: null,
  stem: 'Draw a neat, labelled diagram of a reflex arc through the spinal cord. Label the receptor, sensory neuron, relay neuron, motor neuron and effector.',
  model: 'A **transverse section** of the spinal cord with **grey matter inside**; a **sensory neuron** from a **receptor** in the skin entering by the dorsal side (cell body in a ganglion); a **relay neuron** in the grey matter; a **motor neuron** leaving by the ventral side to a **muscle (effector)**; arrows showing the direction.',
  sol: 'Labelled reflex arc.',
  scheme: [['Spinal cord section with grey matter', 1], ['Three neurons in sequence', 1], ['Receptor, effector and labels with arrows', 1]],
  d: 3, c: 'application', t: [4, 3],
}));

// ---------------------------------------------------------------- t05 natural and acquired reflexes
add('natural-mcq', mcq({
  stem: 'Which of these is a natural (unconditioned) reflex?',
  right: 'Sneezing when dust enters the nose', wrong: ['Stopping a bicycle on seeing a red light', 'Typing quickly on a keyboard', 'Reaching for a mobile phone when it rings'],
  sol: 'Sneezing is inborn and needs no learning; the others are learnt through practice — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('acquired-mcq', mcq({
  stem: 'Which of these is an acquired (conditioned) reflex?',
  right: 'A cyclist braking at once on seeing a red traffic light', wrong: ['Blinking when an insect flies near the eye', 'The knee-jerk when the tendon is tapped', 'Coughing when food goes down the wrong way'],
  sol: 'Braking at a red light is learnt by repeated experience; the others are inborn reflexes — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('pavlov-mcq', mcq({
  stem: 'In Pavlov\'s experiment, a dog came to salivate at the sound of a bell because it had',
  right: 'learnt to link the bell with the arrival of food', wrong: ['been born with this reflex', 'damaged its salivary glands', 'eaten food that contained a bell-shaped chemical'],
  sol: 'The bell was rung each time food was given; after repetition the bell alone produced salivation, a conditioned reflex — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('conditioned-ar', ar({
  a: 'A newborn baby sucks when its lips are touched.',
  r: 'Conditioned reflexes are developed by learning.',
  key: 'd',
  sol: 'Both are true, but sucking is a natural reflex present at birth, so learning does not explain it — option (d).',
  d: 3, c: 'analysis', t: [5],
}));
add('acquired-tf', tf({
  stem: 'Acquired reflexes are inherited from the parents.',
  key: 'f',
  sol: 'False. Acquired (conditioned) reflexes are learnt by experience; natural reflexes are inherited.',
  d: 1, c: 'understanding', t: [5],
}));
add('reason-learnt', short({
  marks: 1, wl: null,
  stem: 'Give reason: a child\'s mouth watering at the sight of a favourite sweet is called an acquired reflex.',
  model: 'The child has **learnt by experience** to link the **sight** of the sweet with its taste; it is not inborn.',
  sol: 'Learnt by experience.', scheme: [['Learnt by experience, not inborn', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('natural-acq-short', short({
  marks: 2,
  stem: 'Differentiate between natural and acquired reflexes, giving one example of each.',
  model: 'A **natural (unconditioned)** reflex is **inborn** and needs no learning, for example **sneezing** or blinking. An **acquired (conditioned)** reflex is **learnt by repeated experience**, for example **braking** a bicycle on seeing a red light.',
  sol: 'Inborn vs learnt with examples.',
  scheme: [['Difference', 1], ['One example of each', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('ruler-num', num({
  stem: `In a ruler-drop test, Nikita caught the falling ruler after it had dropped ${RULER.before.join(', ')} cm in five tries. What is the mean distance, in cm?`,
  value: RULER.meanBefore, unit: 'cm',
  sol: r`$\dfrac{${RULER.before.join(' + ')}}{${RULER.before.length}} = \dfrac{${RULER.before.reduce((a, b) => a + b, 0)}}{${RULER.before.length}} = ${RULER.meanBefore}$ cm.`,
  scheme: [[`${RULER.meanBefore} cm`, 1]],
  d: 2, c: 'application', t: [4],
}), (q) => q.answer.value === 16 || 'value');

// ---------------------------------------------------------------- 5-mark Question 2 style items
add('brain-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [cerebrum, cerebellum, thalamus, hypothalamus, pons, medulla oblongata, spinal cord, corpus callosum]\n\nThinking, memory and reasoning are functions of the (a) ______. The (b) ______ keeps the body balanced while walking. Body temperature and thirst are controlled by the (c) ______. Sensory impulses are relayed to the cerebrum by the (d) ______. Breathing and heartbeat are controlled by the (e) ______.',
  acc: [['cerebrum'], ['cerebellum'], ['hypothalamus'], ['thalamus'], ['medulla oblongata', 'medulla']],
  sol: '(a) cerebrum; (b) cerebellum; (c) hypothalamus; (d) thalamus; (e) medulla oblongata.',
  d: 2, c: 'understanding', t: [2],
}));
add('neuron-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [dendrites, axon, myelin, synapse, grey, white, sensory, motor]\n\nAn impulse enters a neuron through its (a) ______ and leaves along its (b) ______. The fatty (c) ______ sheath round many nerve fibres gives white matter its colour. The impulse passes from one neuron to the next across a (d) ______. In a reflex arc, the (e) ______ neuron carries the impulse to the effector.',
  acc: [['dendrites', 'dendrite'], ['axon'], ['myelin'], ['synapse'], ['motor']],
  sol: '(a) dendrites; (b) axon; (c) myelin; (d) synapse; (e) motor.',
  d: 2, c: 'understanding', t: [1, 3, 4],
}));
add('brain-match5', match({
  marks: 5,
  stem: 'Study the diagram of the brain and match each lettered part with its function.',
  pairs: [
    ['A', 'Centre of thinking, memory and voluntary actions'],
    ['B', 'Relays sensory impulses to the cerebrum'],
    ['C', 'Regulates body temperature, hunger and thirst'],
    ['D', 'Maintains balance and coordinates muscle movements'],
    ['E', 'Controls breathing, heartbeat and swallowing'],
  ],
  order: [1, 3, 0, 4, 2],
  sol: 'A cerebrum; B thalamus; C hypothalamus; D cerebellum; E medulla oblongata.',
  d: 2, c: 'application', t: [2],
  assets: [brainFig],
}));

// ---------------------------------------------------------------- case-based (10 marks, Section B style)
add('accident-case', mk.case({
  passage: 'Sunil fell from his motorbike without a helmet and hit the back of his head. In hospital he could talk and remembered the accident clearly, but he swayed when he stood and could not walk in a straight line. The doctor kept a close watch on his breathing and heartbeat.',
  d: 3, c: 'application',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Which part of Sunil\'s brain was most likely injured?', model: 'The **cerebellum**.', sol: 'Cerebellum.', scheme: [['Cerebellum', 1]], d: 2, c: 'application', t: [2] })),
    part('b', short({ marks: 2, stem: 'Why were his speech and memory not affected?', model: 'Speech and memory are controlled by the **cerebrum**, at the front and top of the brain, which was **not damaged**; the blow struck the **back** of the head, where the cerebellum lies.', sol: 'Cerebrum intact.', scheme: [['Controlled by the cerebrum', 1], ['Cerebrum not injured', 1]], d: 3, c: 'analysis', t: [2] })),
    part('c', short({ marks: 2, stem: 'Which part of the brain, if injured, would have put his life in danger at once? Explain.', model: 'The **medulla oblongata**, at the base of the brain. It controls **breathing, heartbeat** and blood pressure, so damage to it can stop these and cause death.', sol: 'Medulla oblongata.', scheme: [['Medulla oblongata', 1], ['Controls breathing and heartbeat', 1]], d: 2, c: 'understanding', t: [2] })),
    part('d', short({ marks: 2, stem: 'State one function each of the thalamus and the hypothalamus.', model: 'The **thalamus** relays **sensory impulses** to the cerebrum. The **hypothalamus** regulates **body temperature**, hunger and thirst.', sol: 'Relay; temperature.', scheme: [['Thalamus', 1], ['Hypothalamus', 1]], d: 1, c: 'recall', t: [2] })),
    part('e', short({ marks: 3, stem: 'Name the part of the brain that controls each of these: (i) solving a mathematics problem; (ii) feeling thirsty after a run; (iii) swallowing food.', model: '(i) **Cerebrum**: thinking and reasoning.\n(ii) **Hypothalamus**: controls thirst.\n(iii) **Medulla oblongata**: controls swallowing, an involuntary action.', sol: 'Cerebrum; hypothalamus; medulla.', scheme: [['(i) cerebrum', 1], ['(ii) hypothalamus', 1], ['(iii) medulla oblongata', 1]], d: 2, c: 'application', t: [2], wl: null }), [
      short({ marks: 3, stem: 'Explain why the cerebrum is able to control so many activities, describing its structure briefly.', model: 'The cerebrum is the **largest** part of the brain, made of two **hemispheres** joined by the corpus callosum. Its surface is deeply **folded**, giving a very large area of **grey matter** (cortex) with millions of nerve cells. Different areas handle **sensations, voluntary movements, memory and thinking**.', sol: 'Large, folded cortex with many areas.', scheme: [['Largest, two hemispheres', 1], ['Folded surface, much grey matter', 1], ['Different areas for different functions', 1]], d: 3, c: 'understanding', t: [2, 3] }),
    ]),
  ],
}));
add('hotpan-case', mk.case({
  stem: 'Study the diagram and answer the questions.',
  passage: 'Riya touched a hot pan and pulled her hand away at once. Only a moment later did she feel the pain. The diagram shows the pathway involved; five parts are lettered A to E.',
  d: 3, c: 'application',
  assets: [arcFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name the type of action shown by Riya when she pulled her hand away.', model: 'A **reflex action** (spinal reflex).', sol: 'Reflex action.', scheme: [['Reflex action', 1]], d: 1, c: 'application', t: [4] })),
    part('b', short({ marks: 2, stem: 'Name the parts labelled A and E and state the role of each.', model: '**A: receptor** in the skin, which **detects the heat** and starts the impulse. **E: effector**, the **arm muscle**, which **contracts** and pulls the hand away.', sol: 'Receptor; effector.', scheme: [['A receptor with role', 1], ['E effector with role', 1]], d: 2, c: 'understanding', t: [4] })),
    part('c', short({ marks: 2, stem: 'Name the neuron labelled C and state where exactly it lies.', model: 'C is the **relay neuron** (intermediate neuron). It lies **inside the grey matter** of the **spinal cord**, linking the sensory neuron to the motor neuron.', sol: 'Relay neuron in grey matter.', scheme: [['Relay neuron', 1], ['Grey matter of the spinal cord', 1]], d: 2, c: 'understanding', t: [4, 3] })),
    part('d', short({ marks: 2, stem: 'Why did Riya feel the pain only after she had pulled her hand away?', model: 'The reflex was completed in the **spinal cord**, so the hand moved at once. The message of **pain** had to travel **up the spinal cord to the brain** (cerebrum) to be felt, which took a little **longer**.', sol: 'Brain reached later.', scheme: [['Reflex completed in the spinal cord', 1], ['Pain felt only when the impulse reaches the brain', 1]], d: 3, c: 'analysis', t: [4] })),
    part('e', short({ marks: 3, stem: 'State three ways in which reflex actions are useful to us.', model: '1. They **protect** the body from harm, such as burns or injury, by acting **very quickly**.\n2. They work **without thinking**, so the brain is **free** for other work.\n3. They control many **routine** activities, such as **coughing**, **sneezing** and blinking, that keep the airways and eyes clear.', sol: 'Protection; speed; frees the brain.', scheme: [['First use', 1], ['Second use', 1], ['Third use', 1]], d: 2, c: 'understanding', t: [4] })),
  ],
}));
add('ruler-case', mk.case({
  passage: `In a class activity, Aman held a ruler just above Nikita's open fingers and let it drop without warning. She caught it as fast as she could. The distances it fell (cm) were recorded before and after a week of daily practice.\n\n| Try | 1 | 2 | 3 | 4 | 5 |\n|---|---|---|---|---|---|\n| Before practice | ${RULER.before.join(' | ')} |\n| After practice | ${RULER.after.join(' | ')} |`,
  d: 3, c: 'analysis',
  children: [
    part('a', num({ stem: 'What was the mean distance before practice, in cm?', value: RULER.meanBefore, unit: 'cm', sol: r`$\dfrac{${RULER.before.reduce((a, b) => a + b, 0)}}{5} = ${RULER.meanBefore}$ cm.`, scheme: [[`${RULER.meanBefore} cm`, 1]], d: 1, c: 'application', t: [4] })),
    part('b', num({ stem: 'What was the mean distance after practice, in cm?', value: RULER.meanAfter, unit: 'cm', sol: r`$\dfrac{${RULER.after.reduce((a, b) => a + b, 0)}}{5} = ${RULER.meanAfter}$ cm.`, scheme: [[`${RULER.meanAfter} cm`, 1]], d: 1, c: 'application', t: [4] })),
    part('c', num({ marks: 2, stem: 'By what percentage did the mean distance fall after practice?', value: RULER.pctShorter, unit: '%', sol: r`$\dfrac{${RULER.meanBefore} - ${RULER.meanAfter}}{${RULER.meanBefore}} \times 100 = ${RULER.pctShorter}$ percent.`, scheme: [['Difference over the first mean', 1], [`${RULER.pctShorter} percent`, 1]], d: 2, c: 'application', t: [4] })),
    part('d', short({ marks: 2, stem: 'Is catching the ruler a voluntary action or a reflex action? Give a reason.', model: 'It is a **voluntary action**. Nikita must **see** the ruler fall and **decide** to close her fingers; the decision is made in the **cerebrum**, which is why it takes measurable time.', sol: 'Voluntary.', scheme: [['Voluntary', 1], ['Needs a decision by the cerebrum', 1]], d: 3, c: 'analysis', t: [4] })),
    part('e', short({ marks: 2, stem: 'Trace the path of the impulse from Nikita\'s eyes to her finger muscles.', model: 'Eye (**receptor**) → **sensory neurons** of the optic nerve → **brain** (cerebrum decides) → down the **spinal cord** → **motor neurons** → **finger muscles** (effectors).', sol: 'Eye, sensory, brain, motor, muscle.', scheme: [['Eye, sensory neurons, brain', 1], ['Spinal cord, motor neurons, muscles', 1]], d: 2, c: 'application', t: [4, 1] })),
    part('f', short({ marks: 2, stem: 'Suggest why her catching became quicker with practice.', model: 'With **repetition**, the pathway from eye to fingers becomes **well practised**, so the response needs **less conscious thought**; it starts to resemble a **learnt (acquired) reflex**.', sol: 'Practice makes it nearly automatic.', scheme: [['Repetition trains the pathway', 1], ['Less thought; like an acquired reflex', 1]], d: 3, c: 'analysis', t: [4, 5] })),
  ],
}), (q) => (q.children[0].answer.value === 16 && q.children[2].answer.value === 25) || 'value');
add('puppy-case', mk.case({
  passage: 'When Meghna\'s puppy was first brought home, it drooled only when food was actually in its mouth. Every evening she rattled its food packet before feeding it. After two weeks, the puppy ran to the kitchen and drooled as soon as it heard the packet rattle, even before seeing any food.',
  d: 3, c: 'analysis',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name the type of reflex shown when the puppy drooled with food in its mouth.', model: 'A **natural (unconditioned) reflex**.', sol: 'Natural reflex.', scheme: [['Natural / unconditioned reflex', 1]], d: 1, c: 'application', t: [5] })),
    part('b', short({ marks: 1, wl: null, stem: 'Name the type of reflex shown when it drooled at the sound of the packet.', model: 'An **acquired (conditioned) reflex**.', sol: 'Acquired reflex.', scheme: [['Acquired / conditioned reflex', 1]], d: 1, c: 'application', t: [5] })),
    part('c', short({ marks: 2, stem: 'Explain how the puppy came to drool at the sound of the packet.', model: 'The sound of the packet was **repeatedly paired** with the arrival of **food**. The puppy\'s brain **learnt to link** the two, so in time the sound alone set off drooling.', sol: 'Repeated pairing.', scheme: [['Sound repeatedly paired with food', 1], ['Learnt association', 1]], d: 2, c: 'understanding', t: [5] })),
    part('d', short({ marks: 3, stem: 'State three differences between natural and acquired reflexes.', model: '1. Natural reflexes are **inborn** (inherited); acquired reflexes are **learnt** after birth.\n2. Natural reflexes need **no practice**; acquired ones develop through **repeated experience**.\n3. Natural reflexes are **the same in all members** of a species; acquired reflexes **differ** between individuals and can be **lost** if not reinforced.', sol: 'Inborn vs learnt; practice; sameness.', scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]], d: 2, c: 'understanding', t: [5] })),
    part('e', short({ marks: 3, stem: 'Which part of the brain is needed to form an acquired reflex? Give two examples of acquired reflexes in humans.', model: 'The **cerebrum**, since learning and memory are needed. Examples: a cyclist **braking at a red signal**; a practised typist **pressing keys** without looking; reaching for a phone at its ringtone.', sol: 'Cerebrum; two examples.', scheme: [['Cerebrum', 1], ['First example', 1], ['Second example', 1]], d: 3, c: 'application', t: [5, 2] }), [
      short({ marks: 3, stem: 'Describe Pavlov\'s experiment with a dog and explain what it showed.', model: 'Pavlov **rang a bell** each time he gave a dog **food**; the dog salivated at the food (a natural reflex). After many repetitions, the dog **salivated at the bell alone**. This showed that a new stimulus, linked repeatedly with the natural one, can come to produce the response: a **conditioned reflex** is **learnt**.', sol: 'Bell paired with food.', scheme: [['Bell paired with food', 1], ['Salivation at the bell alone', 1], ['Conditioned reflex is learnt', 1]], d: 2, c: 'understanding', t: [5] }),
    ]),
  ],
}));
add('neuron-case', mk.case({
  stem: 'Study the diagram and answer the questions.',
  passage: 'The diagram shows a single nerve cell. Five parts are lettered A to E, and the arrow shows the direction of the impulse.',
  d: 3, c: 'application',
  assets: [neuronFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name the rounded part labelled B.', model: '**Cell body** (cyton).', sol: 'Cyton.', scheme: [['Cell body / cyton', 1]], d: 1, c: 'recall', t: [1] })),
    part('b', short({ marks: 2, stem: 'Name A and C and state the direction in which each carries impulses.', model: '**A: dendrites**, which carry impulses **towards** the cell body. **C: axon**, which carries impulses **away from** the cell body.', sol: 'Dendrites in; axon out.', scheme: [['A dendrites, towards the cell body', 1], ['C axon, away from the cell body', 1]], d: 2, c: 'understanding', t: [1] })),
    part('c', short({ marks: 2, stem: 'Name D and state its function.', model: 'D is the **myelin sheath**, a fatty covering of the axon. It **insulates** the axon and makes the impulse travel **faster**.', sol: 'Myelin sheath.', scheme: [['Myelin sheath', 1], ['Insulates; speeds up the impulse', 1]], d: 2, c: 'understanding', t: [1] })),
    part('d', short({ marks: 2, stem: 'What happens at E when an impulse arrives?', model: 'E are the **axon endings**. The impulse makes them **release a chemical**, which crosses the **synapse** and starts an impulse in the **dendrites of the next neuron** (or in a muscle).', sol: 'Chemical released at the synapse.', scheme: [['Chemical released', 1], ['Crosses the synapse to the next neuron', 1]], d: 3, c: 'understanding', t: [1] })),
    part('e', short({ marks: 3, stem: 'Many fibres like C, covered by D, make up white matter. Explain why white matter is white, and state where it lies in the cerebrum and in the spinal cord.', model: 'White matter is white because its nerve fibres are covered with **white, fatty myelin**. In the **cerebrum** it lies **inside**, beneath the grey cortex; in the **spinal cord** it lies **outside**, around the grey matter.', sol: 'Myelin; inside cerebrum, outside spinal cord.', scheme: [['Myelin makes it white', 1], ['Inside in the cerebrum', 1], ['Outside in the spinal cord', 1]], d: 3, c: 'analysis', t: [3] })),
  ],
}));
add('exam-case', mk.case({
  passage: 'Just before a board examination, Arnav\'s heart pounded, his mouth felt dry and his palms became sweaty. He tried to calm down, but he could not stop these changes by willing them to stop. Then he picked up his pen and began to write.',
  d: 3, c: 'application',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name the division of the nervous system that brought about the pounding heart and sweaty palms.', model: 'The **autonomic nervous system**.', sol: 'Autonomic.', scheme: [['Autonomic nervous system', 1]], d: 2, c: 'application', t: [1] })),
    part('b', short({ marks: 2, stem: 'Why are these changes called involuntary actions?', model: 'They take place **automatically**, without Arnav\'s **will** or conscious control; he could **not stop** them by deciding to, because they are not controlled by the cerebrum.', sol: 'Not under the will.', scheme: [['Not under conscious control', 1], ['Could not stop them at will', 1]], d: 2, c: 'understanding', t: [1, 4] })),
    part('c', short({ marks: 2, stem: 'Distinguish between the central and the peripheral nervous systems.', model: 'The **central** nervous system is the **brain and spinal cord**, which receive information and **decide** responses. The **peripheral** system is the **cranial and spinal nerves**, which **connect** the CNS with the sense organs, muscles and glands.', sol: 'Brain and spinal cord vs nerves.', scheme: [['CNS: brain and spinal cord, control', 1], ['PNS: nerves, connection', 1]], d: 2, c: 'understanding', t: [1] })),
    part('d', short({ marks: 2, stem: 'Name two other activities in the body that are controlled by the autonomic nervous system.', model: 'Any two: the **movements of the stomach and intestine** (peristalsis), the **secretion** of saliva and digestive juices, the **size of the pupil**, the rate of **breathing**.', sol: 'Gut movements, secretion, pupil.', scheme: [['First activity', 1], ['Second activity', 1]], d: 2, c: 'understanding', t: [1] })),
    part('e', short({ marks: 3, stem: 'Give one example from Arnav\'s morning of each: (i) a voluntary action; (ii) an involuntary action; (iii) a reflex action he might show.', model: '(i) **Voluntary:** picking up his pen and **writing**.\n(ii) **Involuntary:** his **heart pounding** (or sweating).\n(iii) **Reflex:** **blinking** if something came near his eyes, or pulling his hand away from a sharp pen nib.', sol: 'Writing; heartbeat; blinking.', scheme: [['Voluntary example', 1], ['Involuntary example', 1], ['Reflex example', 1]], d: 2, c: 'application', t: [4], wl: null }),
    ),
  ],
}));
