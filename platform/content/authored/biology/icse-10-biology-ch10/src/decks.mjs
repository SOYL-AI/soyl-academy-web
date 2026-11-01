// ICSE 10 Biology ch10 Nervous System — Part 1 (t01–t03 neuron, divisions, brain, spinal cord), Part 2 (t04–t05 actions, reflexes).
import { sl, deck, table, flow, svgV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { NEURON, BRAIN, ARC, GREYWHITE } from './svgs.mjs';
import { RULER, NERVE } from './calc.mjs';

export const V = {
  neuron: svgV(NEURON, 'A neuron: dendrites, cell body, axon with myelin sheath and axon endings'),
  brain: svgV(BRAIN, 'Vertical section of the human brain with its main parts'),
  arc: svgV(ARC, 'A reflex arc through a section of the spinal cord'),
  greywhite: svgV(GREYWHITE, 'Grey and white matter in the cerebrum and the spinal cord'),
};

export const deck1 = deck({
  part: 1,
  title: 'Nervous System — Part 1: Neurons, the brain and the spinal cord',
  goals: [
    'Draw and label a neuron and distinguish the central, peripheral and autonomic nervous systems',
    'State one function of each part of the brain and predict the effect of damage to it',
    'Describe the arrangement of grey and white matter in the brain and spinal cord',
  ],
  slides: [
    sl('title', 'Nervous System', {
      b: 'Part 1 — the cells and organs that carry and handle messages in the body.',
      v: flow('LR', [['s', 'Stimulus'], ['r', 'Receptor (sense organ)'], ['c', 'Brain or spinal cord'], ['e', 'Effector (muscle or gland)'], ['o', 'Response']], [['s', 'r'], ['r', 'c'], ['c', 'e'], ['e', 'o']], 'Flow: a stimulus is detected by a receptor, passed to the brain or spinal cord, and a command goes to an effector, giving a response'),
      n: 'Your nervous system is the body\'s fast messaging service. Sense organs pick up changes, nerves carry messages as electrical impulses, and the brain and spinal cord decide what to do. In this part we meet the nerve cell, the brain and the spinal cord.',
    }),
    sl('concept', 'Divisions of the nervous system', {
      v: table(['Division', 'Made of', 'Role'], [['Central (CNS)', 'Brain and spinal cord', 'Receives information, decides, sends commands'], ['Peripheral (PNS)', '12 pairs of cranial and 31 pairs of spinal nerves', 'Links the CNS with sense organs, muscles and glands'], ['Autonomic (ANS)', 'Nerves to internal organs', 'Controls involuntary activities: heartbeat, gut, glands']], 'Table of the central, peripheral and autonomic nervous systems, what each is made of and its role'),
      n: 'The brain and spinal cord form the central nervous system, the control centre. The nerves that spread out from them form the peripheral system. The autonomic system looks after organs we cannot control at will, such as the heart and the gut.',
    }),
    sl('diagram', 'The neuron', {
      b: 'A **neuron** has **dendrites**, a **cell body (cyton)** with a nucleus, and a long **axon** wrapped in a **myelin sheath**.',
      v: V.neuron,
      n: 'Dendrites bring impulses in. The cell body keeps the cell alive. The axon carries impulses away, sometimes for a whole metre. Its fatty myelin sheath insulates it and speeds the impulse, which jumps from one node of Ranvier to the next.',
    }),
    sl('concept', 'Parts of a neuron and the synapse', {
      v: table(['Part', 'Job'], [['Dendrites', 'Receive impulses; carry them to the cell body'], ['Cell body (cyton)', 'Contains the nucleus; controls the cell'], ['Axon', 'Carries impulses away from the cell body'], ['Myelin sheath', 'Insulates the axon; speeds the impulse'], ['Axon endings', 'Release a chemical that carries the impulse across the synapse'], ['Synapse', 'Junction between the axon ending of one neuron and the dendrite of the next']], 'Table of the parts of a neuron and the synapse, with the job of each'),
      n: 'Neurons do not touch one another. At a synapse the axon ending releases a chemical that starts an impulse in the next neuron. Because only axon endings release it, impulses cross synapses in one direction only.',
    }),
    sl('check', 'Quick check: the junction', {
      b: 'Fill in: the junction between the axon ending of one neuron and the dendrite of the next is a ______.',
      chk: 'synapse-fill',
      n: 'It begins with the letter s.',
    }),
    sl('example', 'Worked example 1: how fast is an impulse?', {
      b: `An impulse travels **${NERVE.metres} m** from a toe to the spinal cord.`,
      ul: [`Step 1: myelinated fibre at ${NERVE.fast} m per s: time = ${NERVE.metres} ÷ ${NERVE.fast} s = **${NERVE.fastMs} ms**.`, `Step 2: a fibre without myelin at about ${NERVE.slow} m per s: time = **${NERVE.slowMs} ms**.`, `Step 3: the myelinated fibre is about **${NERVE.times}** times faster.`],
      v: table(['Fibre', 'Speed (m per s)', `Time for ${NERVE.metres} m`], [['With myelin', String(NERVE.fast), `${NERVE.fastMs} ms`], ['Without myelin', String(NERVE.slow), `${NERVE.slowMs} ms`]], 'Worked table: a myelinated fibre at one hundred metres a second takes ten milliseconds; an unmyelinated fibre at one metre a second takes a whole second'),
      n: 'Time equals distance divided by speed. A myelinated fibre carries the message from your toe in about a hundredth of a second. Without myelin it would take a whole second, far too slow to save you from a sharp stone.',
    }),
    sl('concept', 'Three kinds of neuron', {
      v: table(['Neuron', 'Carries impulses', 'Example'], [['Sensory (afferent)', 'From receptors to the CNS', 'From the skin of a finger to the spinal cord'], ['Relay (intermediate)', 'Within the CNS, from sensory to motor neurons', 'In the grey matter of the spinal cord'], ['Motor (efferent)', 'From the CNS to effectors', 'From the spinal cord to an arm muscle']], 'Table of sensory, relay and motor neurons with the direction of their impulses and an example'),
      n: 'Sensory neurons bring news in. Motor neurons take orders out. Relay neurons, inside the brain and spinal cord, link the two. Remember: sensory in, motor out.',
    }),
    sl('check', 'Quick check: the CNS', {
      b: 'The central nervous system consists of…',
      chk: 'cns-mcq',
      n: 'Name the two organs protected by the skull and the backbone.',
    }),
    sl('diagram', 'The human brain', {
      b: '**Cerebrum**, **thalamus**, **hypothalamus**, **pons**, **medulla oblongata** and **cerebellum**.',
      v: V.brain,
      n: 'The folded cerebrum fills most of the skull. Deep inside lie the thalamus and, below it, the hypothalamus. The brain stem runs down through the pons and the medulla into the spinal cord. The cerebellum sits at the back, under the cerebrum.',
    }),
    sl('concept', 'Functions of the parts of the brain', {
      v: table(['Part', 'Main functions'], [['Cerebrum (largest)', 'Thinking, memory, intelligence, voluntary actions, sensations'], ['Cerebellum', 'Balance and posture; coordinates muscle movements'], ['Thalamus', 'Relays sensory impulses to the cerebrum'], ['Hypothalamus', 'Body temperature, hunger, thirst, sleep; controls the pituitary'], ['Pons', 'Connects parts of the brain; helps regulate breathing'], ['Medulla oblongata', 'Heartbeat, breathing, blood pressure, swallowing, coughing, sneezing']], 'Table of the main functions of the six parts of the brain'),
      n: 'Link each part to one clear job. Cerebrum, thinking. Cerebellum, balance. Thalamus, relay station. Hypothalamus, temperature, hunger and thirst. Pons, bridge and breathing. Medulla, the vital centres for heartbeat and breathing.',
    }),
    sl('check', 'Quick check: keeping balance', {
      b: 'Fill in: the part of the brain that maintains balance and posture is the ______.',
      chk: 'cerebellum-fill',
      n: 'It is the little brain at the back.',
    }),
    sl('example', 'Worked example 2: predicting the effect of damage', {
      b: 'Work out the function first, then what would be lost.',
      ul: ['Step 1: name the part and its function.', 'Step 2: say what would happen without that function.', 'Step 3: check whether the loss is life-threatening.'],
      v: table(['Part damaged', 'Likely effect'], [['Cerebellum', 'Unsteady walk; clumsy, jerky movements'], ['Medulla oblongata', 'Breathing or heartbeat may stop: often fatal'], ['Hypothalamus', 'Body temperature, hunger or thirst out of control'], ['Part of the cerebrum', 'Loss of memory, speech or voluntary movement']], 'Worked table of four brain parts and the likely effect of damage to each'),
      n: 'Effects of damage follow from functions. A blow to the back of the head that harms the cerebellum makes a person stagger. Damage to the medulla is the most dangerous, because breathing and heartbeat depend on it.',
    }),
    sl('diagram', 'Grey matter and white matter', {
      b: 'Cerebrum: **grey outside**, white inside. Spinal cord: **white outside**, grey inside.',
      v: V.greywhite,
      n: 'Grey matter is made of cell bodies. White matter is made of nerve fibres with white myelin. In the cerebrum the grey matter forms the outer cortex. In the spinal cord the arrangement is reversed, with a butterfly of grey matter in the middle.',
    }),
    sl('check', 'Quick check: inside or outside?', {
      b: 'True or false: in the cerebrum, grey matter lies inside and white matter outside.',
      chk: 'grey-tf',
      n: 'What is the outer layer of the cerebrum called?',
    }),
    sl('summary', 'Summary', {
      ul: ['CNS: brain and spinal cord. PNS: cranial and spinal nerves. ANS: involuntary organs.', 'Neuron: dendrites in, axon out; myelin speeds the impulse; synapses pass it on by a chemical.', 'Cerebrum thinks, cerebellum balances, medulla keeps us alive.', 'Grey matter outside in the cerebrum, inside in the spinal cord.'],
      v: table(['Spinal cord', 'Function'], [['White matter', 'Carries impulses to and from the brain'], ['Grey matter', 'Centre for spinal reflexes']], 'Summary table of the functions of the white and grey matter of the spinal cord'),
      n: 'To recap. Neurons carry impulses one way, from dendrites to axon endings. The brain has specialised parts, each with its own job. And the spinal cord both carries messages to and from the brain and handles reflexes on its own.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Give **one precise function** for each brain part.', 'Dendrite **towards**, axon **away from** the cell body.', 'Remember the **reversed** grey and white matter of the spinal cord.', 'In neuron drawings show **myelin**, **nodes** and an **arrow** for the impulse.'],
      n: 'Exam tips. Be precise about each brain part. Get the direction of the impulse right. Remember that the spinal cord has its grey matter inside. And label your neuron fully, with an arrow for the impulse.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Nervous System — Part 2: Voluntary, involuntary and reflex actions',
  goals: [
    'Distinguish voluntary, involuntary and reflex actions with examples',
    'Draw a reflex arc from receptor to effector',
    'Differentiate natural and acquired reflexes',
  ],
  slides: [
    sl('title', 'Actions and Reflexes', {
      b: 'Part 2 — the actions we choose, and the ones that happen by themselves.',
      v: flow('LR', [['v', 'Voluntary: by will'], ['i', 'Involuntary: no control'], ['r', 'Reflex: quick, automatic']], [['v', 'i'], ['i', 'r']], 'Flow listing voluntary, involuntary and reflex actions'),
      n: 'Some actions we choose, like writing or kicking a ball. Others go on without our control, like the beating of the heart. And some happen in a flash before we can think, like pulling a hand from a flame. These are reflexes.',
    }),
    sl('concept', 'Three kinds of action', {
      v: table(['Action', 'Controlled by', 'Examples'], [['Voluntary', 'Cerebrum, at will', 'Writing, walking, speaking'], ['Involuntary', 'Medulla and autonomic system', 'Heartbeat, breathing, peristalsis'], ['Reflex', 'Spinal cord or brain, automatically', 'Knee-jerk, sneezing, withdrawing the hand']], 'Table of voluntary, involuntary and reflex actions, what controls them and examples'),
      n: 'A voluntary action needs a decision by the cerebrum, so it is slower. Involuntary actions run all the time without our attention. A reflex is a sudden, automatic response to a particular stimulus, usually handled by the spinal cord.',
    }),
    sl('check', 'Quick check: what is a reflex?', {
      b: 'A reflex action is…',
      chk: 'reflex-def-mcq',
      n: 'Is there time to think?',
    }),
    sl('diagram', 'The reflex arc', {
      b: 'Receptor → sensory neuron → relay neuron → motor neuron → effector.',
      v: V.arc,
      n: 'Touch a hot plate and receptors in the skin fire. The sensory neuron carries the impulse into the spinal cord. A relay neuron in the grey matter passes it straight to a motor neuron, which makes the arm muscle pull the hand away.',
    }),
    sl('concept', 'Steps in a reflex arc', {
      v: flow('TB', [['r', 'Receptor detects the stimulus'], ['s', 'Sensory neuron carries the impulse in'], ['c', 'Relay neuron in the spinal cord passes it on'], ['m', 'Motor neuron carries the command out'], ['e', 'Effector (muscle or gland) responds']], [['r', 's'], ['s', 'c'], ['c', 'm'], ['m', 'e']], 'Flow of the five steps of a reflex arc from receptor to effector'),
      n: 'Learn the five links in order. A copy of the message also goes up to the brain, which is why you feel the pain a moment later. By then the reflex has already moved your hand.',
    }),
    sl('check', 'Quick check: the order', {
      b: 'Which sequence shows the path of an impulse in a reflex arc?',
      chk: 'arc-order-mcq',
      n: 'Start where the stimulus is detected.',
    }),
    sl('example', 'Worked example 1: classifying actions', {
      b: 'Ask: did it need thinking? Can it be stopped at will? Was it a sudden response to one stimulus?',
      ul: ['Step 1: needs a decision → **voluntary**.', 'Step 2: goes on all the time, cannot be stopped → **involuntary**.', 'Step 3: sudden, automatic response to a stimulus → **reflex**.'],
      v: table(['Action', 'Type'], [['Answering a question in class', 'Voluntary'], ['Food moving along the intestine', 'Involuntary'], ['Coughing when crumbs enter the windpipe', 'Reflex'], ['Knee kicking when the tendon is tapped', 'Reflex']], 'Worked table classifying four actions as voluntary, involuntary or reflex'),
      n: 'Run through the three questions in order. Answering in class needs thought, so it is voluntary. Peristalsis never stops, so it is involuntary. Coughing at a crumb is sudden and automatic, so it is a reflex.',
    }),
    sl('concept', 'Spinal and brain reflexes', {
      v: table(['Reflex', 'Centre', 'Example'], [['Spinal reflex', 'Spinal cord', 'Knee-jerk; pulling the hand from a hot object'], ['Reflex of the brain', 'Brain', 'Blinking; narrowing of the pupil in bright light; sneezing']], 'Table of spinal reflexes and reflexes of the brain with examples'),
      n: 'Most reflexes of the limbs pass through the spinal cord. Reflexes of the head, such as blinking and the pupil narrowing in bright light, have their centres in the brain. Both are fast and automatic.',
    }),
    sl('concept', 'Natural and acquired reflexes', {
      v: table(['Natural (unconditioned)', 'Acquired (conditioned)'], [['Inborn; inherited', 'Learnt after birth'], ['Need no practice', 'Develop by repeated experience'], ['Same in all members of a species', 'Differ between individuals'], ['Sneezing, blinking, a baby sucking', 'Braking at a red light, typing, cycling']], 'Table comparing natural and acquired reflexes'),
      n: 'Natural reflexes come with us at birth. Acquired reflexes are learnt. When you first learn to cycle you think about every move, but after practice your feet and hands respond automatically. That is an acquired reflex.',
    }),
    sl('check', 'Quick check: a learnt reflex', {
      b: 'Which of these is an acquired (conditioned) reflex?',
      chk: 'acquired-mcq',
      n: 'Which one could a newborn baby not do?',
    }),
    sl('example', 'Worked example 2: the ruler test', {
      b: 'A ruler is dropped between Nikita\'s fingers; the distance it falls shows how quickly she reacts.',
      ul: [`Step 1: mean before practice = ${RULER.before.join(' + ')} ÷ 5 = **${RULER.meanBefore} cm**.`, `Step 2: mean after practice = ${RULER.after.join(' + ')} ÷ 5 = **${RULER.meanAfter} cm**.`, `Step 3: fall in distance = ${RULER.drop} ÷ ${RULER.meanBefore} × 100 = **${RULER.pctShorter}%**.`],
      v: table(['Tries', 'Mean distance (cm)'], [['Before practice', String(RULER.meanBefore)], ['After practice', String(RULER.meanAfter)]], 'Worked table: mean distance sixteen centimetres before practice and twelve after'),
      n: 'Catching the ruler is voluntary: she must see it fall and decide to grip. A shorter distance means a quicker response. With a week of practice the distance fell by a quarter, as the action became more automatic.',
    }),
    sl('concept', 'How a reflex is learnt', {
      v: flow('LR', [['f', 'Food: dog salivates (natural)'], ['p', 'Bell rung each time food is given'], ['b', 'Bell alone: dog salivates (acquired)']], [['f', 'p'], ['p', 'b', 'many repeats']], 'Flow of Pavlov\'s experiment: food causes salivation, a bell is paired with food many times, then the bell alone causes salivation'),
      n: 'The scientist Pavlov rang a bell every time he fed a dog. After many repeats the dog salivated at the bell alone. It had learnt to link a new stimulus with food. Such learnt reflexes need the cerebrum.',
    }),
    sl('check', 'Quick check: inherited?', {
      b: 'True or false: acquired reflexes are inherited from the parents.',
      chk: 'acquired-tf',
      n: 'How does a reflex become acquired?',
    }),
    sl('summary', 'Summary', {
      ul: ['Voluntary: by will, cerebrum. Involuntary: automatic, medulla and autonomic system. Reflex: sudden, automatic response.', 'Reflex arc: receptor, sensory neuron, relay neuron, motor neuron, effector.', 'Spinal reflexes pass through the spinal cord; head reflexes through the brain.', 'Natural reflexes are inborn; acquired reflexes are learnt.'],
      v: table(['Reflex', 'Type'], [['Sneezing', 'Natural'], ['Braking at a red light', 'Acquired']], 'Summary table: sneezing is a natural reflex; braking at a red light is an acquired reflex'),
      n: 'To recap. Actions may be voluntary, involuntary or reflex. A reflex runs along a five-part arc and protects us by its speed. Some reflexes we are born with, and others we learn by practice.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Name all **five** parts of a reflex arc in order.', 'Place the **relay neuron** in the **grey matter** of the spinal cord.', 'For acquired reflexes, use **learnt** examples, not inborn ones.', 'Explain why pain is felt **after** the hand moves.'],
      n: 'Exam tips. Give all five parts of the arc in the right order. Put the relay neuron in the grey matter. Choose examples carefully for natural and acquired reflexes. And remember the brain feels the pain after the reflex is done.',
    }),
  ],
});
