// ISC 11 Biology ch20 Neural Control and Coordination: question bank in ISC school-examination style.
// Nerve counts, conduction times, potentials and the pump come from calc.mjs. AR keys (ISC options): a b c d.
import { mk, add, svgV, r } from '../../isc-11-biology-ch01/src/lib.mjs';
import { NEURON_Q, SPINAL_Q } from './svgs.mjs';
import { CRANIAL_PAIRS, SPINAL, SPINAL_PAIRS, NERVE_PAIRS, NERVES, REFLEX, REFLEX_AFF, REFLEX_TOTAL, RESTING, THRESHOLD, PEAK, UNDERSHOOT, PUMP, kFromNa, maxRate, V_MYELINATED, V_NONMYELINATED, LEN, T_MYELINATED, T_NONMYELINATED, TOUCH, PAIN, NODES_Q, SPINAL_UPPER, THR_TO_PEAK, REF_Q, FIBRES, FIBRE_V, round } from './calc.mjs';

const { mcq, ar, tf, fill, num, short, long, part } = mk;
const neuFig = svgV(NEURON_Q, 'A myelinated neuron with five parts marked A to E');
const cordFig = svgV(SPINAL_Q, 'A transverse section of the spinal cord with five parts marked A to E');

// ---------------------------------------------------------------- t01 neurons and nerves
add('pseudo-mcq', mcq({
  stem: 'A sensory neuron in a dorsal root ganglion has one process leaving its cell body, which divides into two branches a short distance away: one runs to the skin and the other to the spinal cord. This neuron is',
  right: 'pseudounipolar',
  wrong: ['bipolar', 'multipolar', 'a neuron with no axon'],
  sol: 'A single process that divides into two near the cell body is the pseudounipolar type — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('bipolar-mcq', mcq({
  stem: 'Light-sensitive cells of the retina pass their signals to neurons that each have one dendrite and one axon, at opposite ends of the cell body. These neurons are',
  right: 'bipolar',
  wrong: ['unipolar', 'pseudounipolar', 'multipolar'],
  sol: 'One axon and one dendrite from opposite ends: bipolar — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('dendrite-mcq', mcq({
  stem: 'In a motor neuron of the spinal cord, the impulse reaches the cell body along the',
  right: 'dendrites',
  wrong: ['axon', 'nodes of Ranvier', 'axon terminals'],
  sol: 'Dendrites carry impulses towards the cell body; the axon carries them away — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('myelinformer-mcq', mcq({
  stem: 'A section of a peripheral nerve shows axons wrapped in layers of fatty membrane. These layers belong to the',
  right: 'Schwann cells that form the myelin sheath',
  wrong: ['Nissl granules of the cell body', 'synaptic vesicles of the axon terminals', 'dendrites of the neuron'],
  sol: 'Schwann cells form the myelin sheath of peripheral axons — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('neuronq-mcq', mcq({
  stem: 'In the figure, which lettered part is the site from which the neurotransmitter is released to the next cell?',
  right: 'Part E',
  wrong: ['Part A', 'Part B', 'Part D'],
  sol: 'The swollen axon terminals (E) hold the synaptic vesicles — option (@K).',
  assets: [neuFig],
  d: 1, c: 'application', t: [1],
}));
add('nissl-tf', tf({
  stem: 'Nissl granules are present in the cell body and dendrites of a neuron but are absent from its axon.',
  key: 't',
  sol: 'True.',
  d: 2, c: 'understanding', t: [1],
}));
add('nerve-fill', fill({
  stem: 'A bundle of axons wrapped in connective tissue forms a ______.',
  acc: [['nerve']],
  sol: 'Nerve.',
  d: 1, c: 'recall', t: [1],
}));
add('dendrite-analogy', short({
  marks: 1,
  stem: 'Complete the analogy: Dendrite : carries impulses towards the cell body :: axon : ______.',
  model: '**Carries impulses away from the cell body.**',
  sol: 'Away from the cell body.',
  scheme: [['Away from the cell body', 1]],
  wl: null,
  d: 1, c: 'understanding', t: [1],
}));
add('neuronq-short', short({
  marks: 2,
  stem: 'In the figure, name the parts labelled B, C and D, and state the function of D.',
  model: '**B** is the **cell body (cyton)**, **C** is a **node of Ranvier** and **D** is a segment of the **myelin sheath**. The myelin sheath is an **insulating layer** that stops ions crossing the membrane and so makes the impulse **jump from node to node**, speeding up conduction.',
  sol: 'B cell body; C node; D myelin; insulation.',
  scheme: [['B, C and D named', 1], ['Function of myelin', 1]],
  assets: [neuFig],
  d: 2, c: 'application', t: [1],
}));
add('types-short2', short({
  marks: 2,
  stem: 'Distinguish a bipolar neuron from a multipolar neuron by their processes, and give one place where each is found.',
  model: 'A **bipolar** neuron has **one axon and one dendrite**, at opposite ends of the cell body; it is found in the **retina** or the lining of the nose. A **multipolar** neuron has **one axon and several dendrites**; it is found in the **cerebral cortex** and as the motor neurons of the spinal cord.',
  sol: 'Processes; locations.',
  scheme: [['Bipolar with place', 1], ['Multipolar with place', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('nerves-short3', short({
  marks: 3,
  stem: 'Distinguish sensory, motor and mixed nerves by the direction in which they carry impulses, and give an example of a mixed nerve.',
  model: '**Sensory (afferent)** nerves carry impulses **from receptors to the central nervous system**. **Motor (efferent)** nerves carry impulses **from the central nervous system to muscles or glands**. **Mixed** nerves contain **both sensory and motor fibres** and carry impulses in both directions; the **spinal nerves** are mixed nerves.',
  sol: 'Three kinds; example.',
  scheme: [['Sensory nerves', 1], ['Motor nerves', 1], ['Mixed nerve with example', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('neuron-long', long({
  stem: '(a) Draw a labelled diagram of a myelinated multipolar neuron. [2]\n(b) State the function of the dendrites, the axon and the myelin sheath. [2]\n(c) Name the type of neuron in which several dendrites arise from the cell body, and give one place where it is found. [1]',
  model: '(a) **Diagram:** a cell body with a **nucleus** and **Nissl granules**, branched **dendrites**, an **axon** with the **axon hillock**, **myelin sheath** segments separated by **nodes of Ranvier**, and **axon terminals**.\n\n(b) **Dendrites** receive impulses and carry them to the cell body; the **axon** carries impulses **away** from it; the **myelin sheath** **insulates** the axon and makes conduction faster.\n\n(c) A **multipolar** neuron, for example in the **cerebral cortex**.',
  sol: 'Labelled neuron; functions; multipolar.',
  scheme: [['(a) Labelled neuron', 2], ['(b) Dendrite and axon', 1], ['(b) Myelin sheath', 1], ['(c) Multipolar with place', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 divisions of the nervous system
add('ans-mcq', mcq({
  stem: 'Watching a thrilling film, a student notices that her pupils widen, her heart beats faster and her mouth goes dry, without any decision on her part. These changes are produced mainly by the',
  right: 'sympathetic division of the autonomic nervous system',
  wrong: ['parasympathetic division of the autonomic nervous system', 'somatic nervous system', 'central nervous system alone'],
  sol: 'Emergency responses are produced by the sympathetic division — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('somatic-mcq', mcq({
  stem: 'Which of these actions is controlled by the somatic neural system?',
  right: 'Raising a hand to answer a question',
  wrong: ['Narrowing of the pupil in bright light', 'Movement of food along the intestine', 'Slowing of the heart during sleep'],
  sol: 'The somatic system supplies skeletal muscles under voluntary control — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('pns-mcq', mcq({
  stem: `Nerves that emerge directly from the brain, ${CRANIAL_PAIRS} pairs in a human, are called`,
  right: 'cranial nerves',
  wrong: ['spinal nerves', 'autonomic ganglia', 'dorsal roots'],
  sol: `${CRANIAL_PAIRS} pairs of cranial nerves arise from the brain — option (@K).`,
  d: 1, c: 'recall', t: [2],
}));
add('parasym-mcq', mcq({
  stem: 'A man dozes off after a heavy lunch. Which change is brought about mainly by the parasympathetic division?',
  right: 'Increased movement and secretion in the digestive tract',
  wrong: ['Widening of the pupils', 'A faster heartbeat', 'Widening of the air passages'],
  sol: 'The parasympathetic division promotes digestion; the other changes are sympathetic — option (@K).',
  d: 2, c: 'application', t: [2],
}));
{
  add('pairs-num', num({
    stem: 'How many pairs of spinal nerves arise from the cervical, thoracic and lumbar regions of the cord together?',
    value: SPINAL_UPPER, unit: 'pairs',
    sol: r`$${SPINAL.cervical} + ${SPINAL.thoracic} + ${SPINAL.lumbar} = ${SPINAL_UPPER}$.`,
    scheme: [[`${SPINAL_UPPER}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 25 || 'value');
}
add('nerves-num', num({
  stem: 'How many individual nerves, counting those on both sides of the body, leave the brain and spinal cord of a human?',
  value: NERVES, unit: 'nerves',
  sol: r`Pairs $= ${CRANIAL_PAIRS} + ${SPINAL_PAIRS} = ${NERVE_PAIRS}$; nerves $= 2 \times ${NERVE_PAIRS} = ${NERVES}$.`,
  scheme: [[`${NERVE_PAIRS} pairs`, 0.5], [`${NERVES} nerves`, 0.5]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 86 || 'value');
add('ans-ar', ar({
  a: 'Stimulation of the parasympathetic nerves to the heart slows the heartbeat.',
  r: 'The parasympathetic division prepares the body for fight or flight.',
  key: 'c',
  sol: 'A is true. R is false: it is the sympathetic division that prepares the body for fight or flight; the parasympathetic division restores calm — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('divisions-short2', short({
  marks: 2,
  stem: 'Name the two divisions of the efferent peripheral nervous system and state which organs each supplies.',
  model: 'The **somatic nervous system** carries impulses to the **skeletal muscles**, which are under voluntary control. The **visceral (autonomic) nervous system** carries impulses to the **smooth muscles, cardiac muscle and glands** of the internal organs, which work involuntarily.',
  sol: 'Somatic and visceral with targets.',
  scheme: [['Somatic with skeletal muscles', 1], ['Autonomic with internal organs', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('autonomic-short3', short({
  marks: 3,
  stem: 'Compare the effects of the sympathetic and parasympathetic divisions on the pupil, the heart and the digestive tract.',
  model: 'The **sympathetic** division **dilates the pupil**, **raises the heart rate** and **slows digestion**, preparing the body for emergencies. The **parasympathetic** division **constricts the pupil**, **slows the heart** and **stimulates digestion**, restoring and conserving energy. The two usually have **opposite effects** on the same organ.',
  sol: 'Three organs, two divisions.',
  scheme: [['Pupil', 1], ['Heart', 1], ['Digestive tract', 1]],
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 brain and spinal cord
add('cerebellum-mcq', mcq({
  stem: 'After a blow to the back of the head, a boxer can think and speak normally but sways, staggers and cannot touch his nose smoothly with his finger. Which part of the brain is most likely damaged?',
  right: 'Cerebellum',
  wrong: ['Cerebrum', 'Thalamus', 'Hypothalamus'],
  sol: 'Loss of balance and smooth movement points to the cerebellum — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('occipital-mcq', mcq({
  stem: 'A patient’s eyes and optic nerves are normal, but after a stroke at the back of the cerebral hemispheres he cannot see. Which lobe has been damaged?',
  right: 'Occipital lobe',
  wrong: ['Frontal lobe', 'Parietal lobe', 'Temporal lobe'],
  sol: 'The visual area lies in the occipital lobe — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('medulla-mcq', mcq({
  stem: 'A neurotoxin from a snake stops the brain stem centre that controls breathing and blood pressure, although the patient is conscious. The part affected is the',
  right: 'medulla oblongata',
  wrong: ['cerebellum', 'corpus callosum', 'thalamus'],
  sol: 'Breathing, heartbeat and blood pressure are controlled from the medulla — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('hypo-mcq', mcq({
  stem: 'Which part of the brain links the nervous system with the endocrine system by controlling the pituitary gland?',
  right: 'Hypothalamus',
  wrong: ['Thalamus', 'Pons', 'Cerebellum'],
  sol: 'The hypothalamus controls the pituitary — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('quad-mcq', mcq({
  stem: 'A cyclist turns her head instantly towards a sudden bang and flash of light before she knows what happened. The reflex centres for this response lie in the',
  right: 'corpora quadrigemina of the midbrain',
  wrong: ['cerebellum', 'medulla oblongata', 'corpus callosum'],
  sol: 'The midbrain’s corpora quadrigemina control reflexes to sight and sound — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('pia-mcq', mcq({
  stem: 'Which meninx is thin, rich in blood vessels and in direct contact with the surface of the brain?',
  right: 'Pia mater',
  wrong: ['Dura mater', 'Arachnoid', 'Periosteum of the skull'],
  sol: 'The innermost meninx, the pia mater, hugs the brain — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('spinalq-mcq', mcq({
  stem: 'In the figure of a transverse section of the spinal cord, which lettered part contains the cell bodies of the sensory neurons?',
  right: 'Part B',
  wrong: ['Part A', 'Part C', 'Part E'],
  sol: 'The swelling on the dorsal root is the dorsal root ganglion, which holds the sensory cell bodies — option (@K).',
  assets: [cordFig],
  d: 2, c: 'application', t: [3],
}));
add('spinalq-short', short({
  marks: 2,
  stem: 'In the figure of the spinal cord, name the parts A and E, and state what fills the cavity A.',
  model: '**A** is the **central canal** and **E** is the **white matter**, made of myelinated nerve fibres. The central canal is filled with **cerebrospinal fluid**.',
  sol: 'A central canal; E white matter; CSF.',
  scheme: [['A and E named', 1], ['Cerebrospinal fluid', 1]],
  assets: [cordFig],
  d: 2, c: 'application', t: [3],
}));
add('reflex-mcq', mcq({
  stem: 'A girl touches a cactus spine and her hand jerks away. Which sequence correctly shows the pathway?',
  right: 'Skin receptor → sensory neuron → relay neuron in the spinal cord → motor neuron → muscle',
  wrong: ['Skin receptor → motor neuron → relay neuron → sensory neuron → muscle', 'Muscle → sensory neuron → cerebrum → motor neuron → skin', 'Skin receptor → cerebrum → relay neuron → muscle only'],
  sol: 'A reflex arc runs from receptor through sensory, relay and motor neurons to the effector — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('dorsal-mcq', mcq({
  stem: 'In a road accident, only the dorsal roots of the nerves of one leg are cut. The patient will',
  right: 'lose all sensation in the leg but still be able to move it voluntarily',
  wrong: ['feel the leg normally but be unable to move it', 'lose both sensation and movement in the leg', 'feel pain but not touch'],
  sol: 'Dorsal roots carry sensory fibres into the cord; motor fibres in the ventral roots are intact — option (@K).',
  d: 3, c: 'application', t: [3],
}));
{
  add('reflex-num', num({
    stem: `The sensory fibre of a reflex arc is ${REFLEX.len} m long and conducts impulses at ${REFLEX.v} m per second. How long does an impulse take to travel along it, in milliseconds?`,
    value: REFLEX_AFF, tol: 0.05, unit: 'ms',
    sol: r`$\dfrac{${REFLEX.len}}{${REFLEX.v}} = ${REFLEX_AFF / 1000}$ s $= ${REFLEX_AFF}$ ms.`,
    scheme: [[`${REFLEX_AFF} ms`, 1]],
    d: 2, c: 'application', t: [3],
  }), (q) => q.answer.value === 15 || 'value');
  add('reflexall-num', num({
    stem: `In a withdrawal reflex, a sensory fibre and a motor fibre, each ${REFLEX.len} m long, conduct at ${REFLEX.v} m per second. The impulse crosses ${REFLEX.synapses} synapses, and each adds ${REFLEX.delay} ms. How long does the whole reflex arc take, in milliseconds?`,
    value: REFLEX_TOTAL, tol: 0.05, unit: 'ms',
    sol: r`$${REFLEX_AFF} + ${REFLEX_AFF} + ${REFLEX.synapses} \times ${REFLEX.delay} = ${REFLEX_TOTAL}$ ms.`,
    scheme: [[`${REFLEX_TOTAL} ms`, 1]],
    d: 3, c: 'application', t: [3],
  }), (q) => q.answer.value === 31 || 'value');
}
add('spinal-ar', ar({
  a: 'In a transverse section of the spinal cord, the grey matter lies inside the white matter.',
  r: 'Grey matter is made mainly of nerve cell bodies, whereas white matter is made mainly of myelinated nerve fibres.',
  key: 'a',
  sol: 'Both are true; the arrangement follows from the composition: cell bodies are inside and fibre tracts outside — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('central-fill', fill({
  stem: 'The narrow channel in the centre of the spinal cord that contains cerebrospinal fluid is the ______ canal.',
  acc: [['central']],
  sol: 'Central canal.',
  d: 1, c: 'recall', t: [3],
}));
add('thalamus-tf', tf({
  stem: 'The thalamus is a part of the hindbrain.',
  key: 'f',
  sol: 'False. The thalamus is part of the forebrain.',
  d: 1, c: 'recall', t: [3],
}));
add('cortex-reason', short({
  marks: 1,
  stem: 'Give a reason: The cerebral cortex looks grey, but the outer part of the spinal cord looks white.',
  model: 'The cortex is rich in **nerve cell bodies**, whereas the outer spinal cord is made of **myelinated nerve fibres**, and myelin is white.',
  sol: 'Cell bodies vs myelinated fibres.',
  scheme: [['Cell bodies grey; myelinated fibres white', 1]],
  wl: null,
  d: 2, c: 'understanding', t: [3],
}));
add('hypo-analogy', short({
  marks: 1,
  stem: 'Complete the analogy: Thalamus : relay station for sensory signals :: hypothalamus : ______.',
  model: '**Control of body temperature, hunger and thirst (and of the pituitary gland).**',
  sol: 'Temperature, hunger, thirst.',
  scheme: [['Temperature, hunger, thirst, pituitary', 1]],
  wl: null,
  d: 2, c: 'understanding', t: [3],
}));
add('hindbrain-short2', short({
  marks: 2,
  stem: 'Name the three parts of the hindbrain, and state the function of the cerebellum and of the medulla oblongata.',
  model: 'The hindbrain consists of the **cerebellum**, the **pons** and the **medulla oblongata**. The **cerebellum** controls **balance, posture and coordination of movement**; the **medulla oblongata** contains centres controlling the **heartbeat, breathing and blood pressure**.',
  sol: 'Parts and two functions.',
  scheme: [['Three parts named', 1], ['Functions of cerebellum and medulla', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('hypothal-short2', short({
  marks: 2,
  stem: 'State two functions of the hypothalamus, and explain how it influences the pituitary gland.',
  model: 'The **hypothalamus** regulates **body temperature** and the urges for **hunger and thirst**. It has **neurosecretory cells** that make hormones; these **control the secretion of the pituitary gland**, linking the nervous and endocrine systems.',
  sol: 'Two functions; control of pituitary.',
  scheme: [['Two functions', 1], ['Pituitary control by hormones', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('meninges-short3', short({
  marks: 3,
  stem: 'Name the three meninges that protect the brain, in order from outside to inside, and state one function of the cerebrospinal fluid.',
  model: 'The meninges are the **dura mater** (outer, tough), the **arachnoid** (middle, web-like) and the **pia mater** (inner, thin and in contact with the brain, rich in blood vessels). The **cerebrospinal fluid** lies below the arachnoid and in the cavities of the brain; it **cushions the brain** against shocks and helps to supply it with nutrients.',
  sol: 'Meninges in order; CSF.',
  scheme: [['Three meninges named', 1], ['Order from outside to inside', 1], ['Function of the fluid', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('cerebrum-short3', short({
  marks: 3,
  stem: 'Name the four lobes of the cerebral cortex and state one function of each.',
  model: 'The cerebral cortex is divided into four lobes. The **frontal lobe** controls **voluntary movement, speech and thinking**. The **parietal lobe** receives **general sensations** such as touch, pain and temperature from the body. The **temporal lobe** is concerned with **hearing and memory**. The **occipital lobe**, at the back, is the centre of **vision**.',
  sol: 'Four lobes with functions.',
  scheme: [['Frontal', 1], ['Parietal and temporal', 1], ['Occipital', 1]],
  d: 2, c: 'recall', t: [3],
}));
add('cord-short3', short({
  marks: 3,
  stem: 'Describe the arrangement of grey and white matter in a transverse section of the spinal cord, and name the two roots of a spinal nerve.',
  model: 'The **grey matter** is inside, **butterfly-shaped**, with **dorsal and ventral horns** around the **central canal**; it consists mainly of **cell bodies**. The **white matter** lies outside it and consists of **myelinated fibres**. A spinal nerve forms from a **dorsal root** (sensory, with a ganglion) and a **ventral root** (motor).',
  sol: 'Grey inside; white outside; two roots.',
  scheme: [['Grey matter shape and position', 1], ['White matter', 1], ['Dorsal and ventral roots', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('reflex-short3', short({
  marks: 3,
  stem: 'A boy steps on a thorn and lifts his foot before he feels pain. Trace the path of the impulse and explain why the response is so quick.',
  model: 'Receptors in the skin send an impulse along a **sensory neuron** to the cord through the **dorsal root**; a **relay neuron in the grey matter** passes it to a **motor neuron**, which leaves through the **ventral root** and makes the leg muscle contract. The path is short and **does not wait for the brain**, so the response is **involuntary and quick**; the brain is informed afterwards.',
  sol: 'Reflex arc and reason.',
  scheme: [['Sensory neuron through dorsal root', 1], ['Relay and motor neuron via ventral root', 1], ['Spinal cord not brain, so quick', 1]],
  d: 3, c: 'application', t: [3],
}));
add('brain-long', long({
  stem: '(a) Draw a labelled diagram of a vertical section of the human brain showing the cerebrum, thalamus, hypothalamus, midbrain, pons, cerebellum and medulla oblongata. [2]\n(b) State the function of the cerebellum and of the thalamus. [2]\n(c) Name the structure that joins the two cerebral hemispheres. [1]',
  model: '(a) **Diagram:** the **cerebrum** with the **corpus callosum**; below it the **thalamus** and **hypothalamus** with the pituitary; the **midbrain**, **pons** and **medulla oblongata** forming the brain stem; the **cerebellum** behind the pons.\n\n(b) The **cerebellum** controls **balance, posture and coordination** of movement; the **thalamus** is the **relay station** for sensory and motor signals going to and from the cerebrum.\n\n(c) The **corpus callosum**.',
  sol: 'Labelled brain; functions; corpus callosum.',
  scheme: [['(a) Labelled brain', 2], ['(b) Cerebellum', 1], ['(b) Thalamus', 1], ['(c) Corpus callosum', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [3],
}));
add('cord-long', long({
  stem: '(a) Draw a labelled diagram of a transverse section of the spinal cord showing the dorsal and ventral roots. [2]\n(b) Explain, with the path of the impulse, how a reflex action such as blinking or withdrawing the hand takes place through the spinal cord. [2]\n(c) State two functions of the spinal cord. [1]',
  model: '(a) **Diagram:** **white matter** outside; butterfly-shaped **grey matter** with **dorsal and ventral horns** and a **central canal**; the **dorsal root** with its **ganglion**, the **ventral root**, and the **spinal nerve**.\n\n(b) The **receptor** sends an impulse along a **sensory neuron** (dorsal root) to a **relay neuron** in the grey matter, then to a **motor neuron** (ventral root) and the **effector muscle**, which contracts without waiting for the brain.\n\n(c) The cord is the **centre of reflexes** and **conducts impulses** between the body and the brain.',
  sol: 'T.S. diagram; reflex arc; functions.',
  scheme: [['(a) Labelled T.S.', 2], ['(b) Receptor to sensory neuron to relay', 1], ['(b) Motor neuron to effector', 1], ['(c) Two functions', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [3],
}));
add('cord-case', mk.case({
  passage: 'Two patients, P and Q, each have an injury to the nerve roots of the left leg in the lower back. Both are normal on the right side. When the sole of the left foot is pricked with a pin, patient P says that she feels the pin but cannot move her foot, and patient Q moves nothing and says that he feels nothing, although he can move the foot when asked to do so.',
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which roots are most likely damaged in patient P?',
      right: 'The ventral (motor) roots',
      wrong: ['The dorsal (sensory) roots', 'Both the dorsal and the ventral roots', 'The meninges'],
      sol: 'P feels the pin, so sensory fibres work; she cannot move, so motor fibres are cut — option (@K).',
      d: 2, c: 'application', t: [3],
    })),
    part('b', short({
      marks: 1,
      stem: 'Name the structure on the damaged root of patient Q that holds the cell bodies of his sensory neurons.',
      model: 'The **dorsal root ganglion**.',
      sol: 'Dorsal root ganglion.',
      scheme: [['Dorsal root ganglion', 1]],
      wl: null,
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why patient Q shows no withdrawal reflex even though his motor neurons are intact.',
      model: 'The reflex needs an impulse to reach the cord through the **sensory neurons of the dorsal root**; these are damaged, so no impulse reaches the **relay neuron** and **motor neuron**, although the motor neurons are intact and the foot can be moved **voluntarily** by the brain’s commands.',
      sol: 'Sensory path broken.',
      scheme: [['Sensory arm of the arc damaged', 1], ['Motor neurons not stimulated; voluntary movement still possible', 1]],
      d: 3, c: 'analysis', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'Explain why patient P cannot withdraw her foot even though she feels the pin.',
        model: 'The sensory neurons carry the impulse to the cord, but the **motor neurons of the ventral root are cut**, so the impulse cannot reach the **muscle** and the **effector** does not respond; she feels the pin because the message also goes up to the **brain**.',
        sol: 'Motor arm cut.',
        scheme: [['Motor arm of the arc damaged', 1], ['Sensation reaches the brain', 1]],
        d: 3, c: 'analysis', t: [3],
      }),
    ]),
  ],
}), (q) => q.children[0].answer.option_ids?.length === 1 || 'part a');

// ---------------------------------------------------------------- t04 nerve impulse and synapse
add('resting-mcq', mcq({
  stem: 'A student places one microelectrode inside a resting axon and another in the fluid outside it. What does the meter show?',
  right: `The inside is about ${-RESTING} mV negative to the outside`,
  wrong: [`The inside is about ${-RESTING} mV positive to the outside`, 'No difference of potential', `The inside is about +${PEAK} mV to the outside`],
  sol: `A resting axon is polarised, negative inside, about ${RESTING} mV — option (@K).`,
  d: 1, c: 'application', t: [4],
}));
add('ouabain-mcq', mcq({
  stem: 'Ouabain blocks the sodium-potassium pump. If a neuron is soaked in it for a long time, its resting potential will',
  right: 'gradually become less negative as the ion gradients run down',
  wrong: ['become more negative', 'stay exactly the same', 'become positive at once'],
  sol: 'Without the pump the Na⁺ and K⁺ gradients dissipate, so the resting potential falls towards zero — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('highK-mcq', mcq({
  stem: 'A nerve fibre is placed in a bath with a very high concentration of K⁺ outside. Its resting potential will',
  right: 'become less negative, because less K⁺ leaves the cell',
  wrong: ['become more negative, because more K⁺ leaves the cell', 'be unchanged, because only Na⁺ matters', 'reverse at once to +30 mV'],
  sol: 'The resting potential depends largely on K⁺ leaving; with K⁺ high outside, less leaves — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('na-mcq', mcq({
  stem: 'During the rising phase of an action potential, the membrane potential changes from the resting level to a positive value. This is mainly due to',
  right: 'entry of Na⁺ ions through voltage-gated channels',
  wrong: ['exit of K⁺ ions through leak channels', 'action of the sodium-potassium pump', 'entry of Cl⁻ ions'],
  sol: 'Depolarisation is caused by Na⁺ entry — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('allornone-mcq', mcq({
  stem: 'A single neuron is stimulated first at twice its threshold strength and then at ten times its threshold strength. The action potentials produced will',
  right: 'be of the same size, but may occur more often at the stronger stimulus',
  wrong: ['be five times larger at the stronger stimulus', 'be smaller at the stronger stimulus', 'not be produced at the weaker stimulus'],
  sol: 'An action potential follows the all-or-none rule; strength is coded by frequency — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('myelin-mcq', mcq({
  stem: 'In multiple sclerosis the myelin of nerve fibres in the brain and spinal cord is destroyed, and impulses become slow or fail. The best explanation is that',
  right: 'the insulation is lost, so the impulse can no longer jump from node to node',
  wrong: ['sodium ions can no longer enter the axon at all', 'the nodes of Ranvier become thicker', 'the neurotransmitter is released too quickly'],
  sol: 'Loss of myelin destroys saltatory conduction — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('saltatory-mcq', mcq({
  stem: 'In a myelinated nerve fibre, exchange of ions across the axon membrane takes place only at the',
  right: 'nodes of Ranvier',
  wrong: ['axon terminals only', 'internodes under the myelin', 'cell body only'],
  sol: 'Myelin blocks ion exchange; it happens at the nodes — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('cleft-mcq', mcq({
  stem: 'Botulinum toxin stops the release of acetylcholine from the endings of motor neurons. The expected effect on the muscles it supplies is',
  right: 'paralysis, because no transmitter crosses the cleft to stimulate the muscle',
  wrong: ['continuous contraction, because the cleft widens', 'faster contraction, because acetylcholine accumulates', 'no change, because the impulse crosses the cleft directly'],
  sol: 'Without transmitter release the post-synaptic membrane is not excited — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('op-mcq', mcq({
  stem: 'An insecticide inhibits acetylcholinesterase. At a synapse of an insect treated with it, acetylcholine will',
  right: 'remain in the cleft and keep stimulating the post-synaptic membrane',
  wrong: ['be destroyed too fast', 'never be released', 'be taken back by the post-synaptic neuron at once'],
  sol: 'The enzyme normally breaks down acetylcholine; blocking it prolongs the stimulation — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('oneway-mcq', mcq({
  stem: 'Impulses cross a chemical synapse from the pre-synaptic to the post-synaptic neuron only, and never backwards, because',
  right: 'transmitter is released only by the pre-synaptic terminal and receptors lie only on the post-synaptic membrane',
  wrong: ['the cleft is too wide for the transmitter to cross backwards', 'the post-synaptic neuron has no membrane', 'both membranes release transmitter at once'],
  sol: 'Vesicles are on one side and receptors on the other — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('calcium-mcq', mcq({
  stem: 'Which ion entering the axon terminal triggers the fusion of synaptic vesicles with the membrane?',
  right: 'Ca²⁺',
  wrong: ['K⁺', 'Cl⁻', 'Mg²⁺'],
  sol: 'Calcium entry triggers release of the transmitter — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
{
  const k = kFromNa(2100);
  add('pump-num', num({
    stem: 'In a short interval the sodium-potassium pumps of a small stretch of membrane move 2100 sodium ions out of the cell. How many potassium ions do they bring in?',
    value: k, unit: 'ions',
    sol: r`${PUMP.na} Na⁺ out for ${PUMP.k} K⁺ in: $\dfrac{2100}{${PUMP.na}} \times ${PUMP.k} = ${k}$.`,
    scheme: [[`${k}`, 1]],
    d: 2, c: 'application', t: [4],
  }), (q) => q.answer.value === 1400 || 'value');
}
add('thrpeak-num', num({
  stem: `An action potential starts when the membrane reaches ${THRESHOLD} mV and rises to +${PEAK} mV. By how many millivolts does the potential rise after threshold has been reached?`,
  value: THR_TO_PEAK, unit: 'mV',
  sol: r`$${PEAK} - (${THRESHOLD}) = ${THR_TO_PEAK}$ mV.`,
  scheme: [[`${THR_TO_PEAK}`, 1]],
  d: 2, c: 'application', t: [4],
}), (q) => q.answer.value === 85 || 'value');
add('refrac-num', num({
  stem: `After firing, a neuron cannot fire again for ${REF_Q} ms (the absolute refractory period). What is the greatest number of impulses it can carry in one second?`,
  value: maxRate(REF_Q), unit: 'per second',
  sol: r`$\dfrac{1000}{${REF_Q}} = ${maxRate(REF_Q)}$ per second.`,
  scheme: [[`${maxRate(REF_Q)}`, 1]],
  d: 3, c: 'application', t: [4],
}), (q) => q.answer.value === 250 || 'value');
add('nodes-num', num({
  stem: `A myelinated axon ${NODES_Q.len} m long has a node of Ranvier every ${NODES_Q.mm} mm. How many nodes does it have, approximately?`,
  value: NODES_Q.n, tol: 1, unit: 'nodes',
  sol: r`$\dfrac{${NODES_Q.len} \times 1000}{${NODES_Q.mm}} = ${NODES_Q.n}$.`,
  scheme: [[`${NODES_Q.n}`, 1]],
  d: 2, c: 'application', t: [4],
}), (q) => q.answer.value === 300 || 'value');
add('touch-num', num({
  stem: `A touch impulse travels ${TOUCH.len} m along a myelinated fibre at ${V_MYELINATED} m per second. How long does it take, in milliseconds?`,
  value: TOUCH.ms, tol: 0.05, unit: 'ms',
  sol: r`$\dfrac{${TOUCH.len}}{${V_MYELINATED}} = ${TOUCH.ms / 1000}$ s $= ${TOUCH.ms}$ ms.`,
  scheme: [[`${TOUCH.ms} ms`, 1]],
  d: 2, c: 'application', t: [4],
}), (q) => q.answer.value === 15 || 'value');
add('syn-ar', ar({
  a: 'Chemical synapses allow impulses to pass in one direction only.',
  r: 'Acetylcholine is a neurotransmitter.',
  key: 'b',
  sol: 'Both are true, but the existence of acetylcholine does not explain the one-way passage; that is due to release on one side and receptors on the other — option (b).',
  d: 3, c: 'analysis', t: [4],
}));
add('rest-ar', ar({
  a: 'The inside of a resting axon is positive with respect to the outside.',
  r: 'The resting membrane is far more permeable to sodium ions than to potassium ions.',
  key: 'd',
  sol: 'Both are false: the inside is negative, and the resting membrane is more permeable to potassium than to sodium — option (d).',
  d: 3, c: 'analysis', t: [4],
}));
add('acetyl-fill', fill({
  stem: 'The enzyme that breaks down acetylcholine in the synaptic cleft is ______.',
  acc: [['acetylcholinesterase', 'cholinesterase']],
  sol: 'Acetylcholinesterase.',
  d: 1, c: 'recall', t: [4],
}));
add('psp-tf', tf({
  stem: 'A neurotransmitter always excites the post-synaptic neuron.',
  key: 'f',
  sol: 'False. Some transmitters or receptors inhibit the post-synaptic neuron.',
  d: 2, c: 'understanding', t: [4],
}));
add('energy-reason', short({
  marks: 1,
  stem: 'Give a reason: A myelinated fibre uses less energy than a non-myelinated fibre of the same length to carry the same impulses.',
  model: 'Ions cross the membrane **only at the nodes of Ranvier**, so the **sodium-potassium pump** has far fewer ions to restore after each impulse.',
  sol: 'Ion exchange only at nodes.',
  scheme: [['Ions cross only at nodes, so less pumping', 1]],
  wl: null,
  d: 3, c: 'understanding', t: [4],
}));
add('impulse-short2', short({
  marks: 2,
  stem: 'Explain why the inside of a resting neuron is negative compared with the outside.',
  model: '**Potassium ions leak out** through the membrane much more easily than sodium leaks in, while **large negatively charged molecules stay inside**. The **sodium-potassium pump** also moves **three sodium ions out for two potassium ions in**, so more positive charge is removed than returned, leaving the inside **negative**.',
  sol: 'Leak, trapped anions, pump.',
  scheme: [['Potassium leak and trapped anions', 1], ['Pump moves 3 Na out and 2 K in', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('depol-short2', short({
  marks: 2,
  stem: 'State which ion moves, and in which direction, during depolarisation and during repolarisation of an axon.',
  model: 'During **depolarisation**, voltage-gated **sodium channels open** and **sodium ions enter** the axon, making the inside positive. During **repolarisation**, the sodium channels close, **potassium channels open** and **potassium ions leave**, so the inside becomes negative again.',
  sol: 'Sodium in; potassium out.',
  scheme: [['Depolarisation: sodium enters', 1], ['Repolarisation: potassium leaves', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('sal-short3', short({
  marks: 3,
  stem: 'Explain why a nerve impulse travels much faster along a myelinated fibre than along a non-myelinated fibre of the same thickness.',
  model: 'The **myelin sheath insulates** the axon, so ions can cross the membrane only at the **nodes of Ranvier**. The **local current** flows through the axon from one node to the next and the impulse **jumps from node to node** (**saltatory conduction**). In a non-myelinated fibre the impulse must excite **every point** of the membrane in turn, which is **much slower**.',
  sol: 'Insulation, nodes, saltatory vs continuous.',
  scheme: [['Myelin insulates; ions cross at nodes', 1], ['Impulse jumps node to node', 1], ['Non-myelinated: every point, slower', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('synapse-short3', short({
  marks: 3,
  stem: 'Describe how an impulse is transmitted across a chemical synapse.',
  model: 'The impulse reaches the **axon terminal**; **calcium ions** enter and make **synaptic vesicles** fuse with the membrane, releasing **neurotransmitter** into the **synaptic cleft**. It diffuses across and binds **receptors on the post-synaptic membrane**, opening ion channels and generating a new **post-synaptic potential**. The transmitter is then **broken down or taken back**.',
  sol: 'Calcium, release, binding, removal.',
  scheme: [['Calcium entry and vesicle release', 1], ['Diffusion and receptor binding', 1], ['New potential; removal of transmitter', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('compare-short3', short({
  marks: 3,
  stem: 'Distinguish between electrical and chemical synapses on three points.',
  model: 'In an **electrical synapse** the membranes are very close and **ions pass directly** through gap junctions, so transmission is **very fast** and can go **either way**; such synapses are **rare in humans**. In a **chemical synapse** there is a **synaptic cleft** and a **neurotransmitter** carries the message, so there is a **slight delay** and transmission is **one-way**; most human synapses are of this kind.',
  sol: 'Gap, speed, direction, occurrence.',
  scheme: [['Gap and mode of transfer', 1], ['Speed', 1], ['Direction and occurrence', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('lowna-short3', short({
  marks: 3,
  stem: 'A squid axon is moved from sea water to a bath containing only one third of the normal sodium concentration. Predict the effect on its resting potential and on its action potential, and give the reasons.',
  model: 'The **resting potential changes very little**, because at rest the membrane is mainly **permeable to potassium**, not sodium. The **action potential becomes smaller**, because **less sodium** is available to **enter** the axon, so the **peak is lower** and the rise is slower; sodium entry is what causes depolarisation.',
  sol: 'Rest unchanged; action potential smaller.',
  scheme: [['Resting potential almost unchanged, with reason', 1], ['Action potential lower and slower', 1], ['Reason: less Na entering', 1]],
  d: 4, c: 'analysis', t: [4],
}));
add('impulse-long', long({
  stem: '(a) Explain how the resting potential of a neuron is maintained. [2]\n(b) Describe the changes in ion movement and membrane potential when the neuron is stimulated beyond threshold. [2]\n(c) What is the refractory period? [1]',
  model: `(a) The membrane is more permeable to **potassium** than to sodium, so potassium **leaks out**; negatively charged molecules stay inside, and the **sodium-potassium pump** moves **${PUMP.na} sodium out and ${PUMP.k} potassium in** each cycle, keeping the inside about **${RESTING} mV**.\n\n(b) At **threshold** (${THRESHOLD} mV) sodium channels open and **sodium enters**, so the membrane **depolarises** to about **+${PEAK} mV**; then sodium channels close, **potassium channels open** and **potassium leaves**, so it **repolarises**, and the pump restores the resting state.\n\n(c) The short time after firing when the membrane **cannot respond to a new stimulus**.`,
  sol: 'Resting potential; action potential; refractory period.',
  scheme: [['(a) Leak and trapped anions', 1], ['(a) Pump 3:2', 1], ['(b) Depolarisation with sodium entry', 1], ['(b) Repolarisation with potassium exit', 1], ['(c) Refractory period', 1]],
  wl: [60, 200],
  d: 3, c: 'understanding', t: [4],
}));
add('conduct-long', long({
  stem: '(a) Explain saltatory conduction of a nerve impulse. [2]\n(b) Compare a myelinated and a non-myelinated nerve fibre in a table of three points. [2]\n(c) State one effect on conduction of the loss of myelin. [1]',
  model: '(a) The **myelin sheath insulates** the axon, so ions cross only at the **nodes of Ranvier**; the **local current** flows from node to node and the impulse **jumps** from one node to the next.\n\n(b) **Myelinated:** has myelin from Schwann cells; ions cross only at nodes; **fast, saltatory** conduction. **Non-myelinated:** no myelin; ions cross at every point; **slow, continuous** conduction. The myelinated fibre also **uses less energy**.\n\n(c) Conduction becomes **slow or fails**.',
  sol: 'Saltatory; comparison; demyelination.',
  scheme: [['(a) Insulation and ion exchange at nodes', 1], ['(a) Jumping from node to node', 1], ['(b) Three points of comparison', 2], ['(c) Slow or failed conduction', 1]],
  wl: [60, 200],
  d: 3, c: 'understanding', t: [4],
}));
add('synapse-long', long({
  stem: '(a) Draw a labelled diagram of a chemical synapse. [2]\n(b) Describe the steps of synaptic transmission. [2]\n(c) State what happens to the neurotransmitter afterwards. [1]',
  model: '(a) **Diagram:** a **pre-synaptic axon terminal** with **mitochondria** and **synaptic vesicles**, the **synaptic cleft**, and the **post-synaptic membrane** with **receptors**.\n\n(b) The impulse opens **calcium channels**; calcium makes vesicles release **neurotransmitter** into the cleft; it **diffuses across** and binds **receptors**, opening ion channels and causing a new **potential** in the post-synaptic neuron.\n\n(c) It is **broken down** (acetylcholine by acetylcholinesterase) or **taken back** into the terminal.',
  sol: 'Labelled synapse; steps; removal.',
  scheme: [['(a) Labelled synapse', 2], ['(b) Calcium and release', 1], ['(b) Binding and new potential', 1], ['(c) Breakdown or reuptake', 1]],
  wl: [60, 200],
  d: 3, c: 'understanding', t: [4],
}));
{
  const rows = FIBRES.map((f, i) => `| ${f.name} | ${f.distance} | ${f.ms} |`).join('\n');
  add('conduction-case', mk.case({
    passage: `A student stimulated three single fibres, X, Y and Z, of an isolated nerve and recorded how long an impulse took to cross a 0.12 m length of each.\n\n| Fibre | Distance (m) | Time (ms) |\n|---|---|---|\n${rows}`,
    d: 3, c: 'analysis',
    children: [
      part('a', num({
        stem: 'Calculate the speed of conduction of fibre Z, in metres per second.',
        value: FIBRE_V[2], tol: 0.1, unit: 'm per second',
        sol: r`$\dfrac{${FIBRES[2].distance}}{${FIBRES[2].ms / 1000}} = ${FIBRE_V[2]}$ m per second.`,
        scheme: [[`${FIBRE_V[2]} m per second`, 1]],
        d: 2, c: 'application', t: [4],
      })),
      part('b', mcq({
        stem: 'Which fibre is most likely thick and myelinated?',
        right: 'Fibre X, the fastest',
        wrong: ['Fibre Y, the slowest', 'Fibre Z, because it is faster than Y', 'None, because all three are of the same length'],
        sol: `X conducts at ${FIBRE_V[0]} m per second, the fastest, which is typical of a myelinated fibre — option (@K).`,
        d: 3, c: 'analysis', t: [4],
      })),
      part('c', short({
        marks: 2,
        stem: 'Suggest why fibre Y conducts so slowly.',
        model: 'Fibre Y is probably **thin and non-myelinated**, so the impulse must **excite every point** of the membrane in turn instead of **jumping between nodes of Ranvier**; this **continuous conduction** is slow.',
        sol: 'Non-myelinated.',
        scheme: [['Non-myelinated or thin', 1], ['Continuous conduction at every point', 1]],
        d: 3, c: 'analysis', t: [4],
      }), [
        short({
          marks: 2,
          stem: 'Predict what would happen to the time recorded for fibre X if its myelin were stripped off, and explain.',
          model: 'The time would **increase**, because without **myelin** the impulse can no longer **jump from node to node**; it would have to travel **continuously** along the membrane, as in a **non-myelinated** fibre, which is slower.',
          sol: 'Time increases.',
          scheme: [['Time increases', 1], ['Loss of saltatory conduction', 1]],
          d: 3, c: 'analysis', t: [4],
        }),
      ]),
    ],
  }), (q) => q.children[0].answer.value === 20 || 'value');
}
