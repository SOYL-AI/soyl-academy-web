// ch18 Neural Control and Coordination — question bank. AR keys: a b c d a.
import { mk, add, r } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { REST, PEAK, AMPLITUDE, PUMP, kForNa, Q_NET, Q_COND, Q_RATIO, CASE_AXON, Q_REFLEX, CASE_KNEE } from './calc.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;

// ---------------------------------------------------------------- t01 neural system, neuron, impulse, synapse
add('cns-mcq', mcq({
  stem: 'The central neural system of a human consists of',
  right: 'the brain and the spinal cord',
  wrong: ['the brain and the cranial nerves', 'the spinal cord and the spinal nerves', 'all the nerves associated with the brain'],
  sol: 'The CNS includes the brain and spinal cord; the nerves associated with them form the PNS — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('afferent-mcq', mcq({
  stem: 'When you touch an ice cube, which nerve fibres carry the message from the skin to the spinal cord?',
  right: 'Afferent fibres',
  wrong: ['Efferent fibres', 'Fibres of the corpus callosum', 'Fibres of the autonomic system going to smooth muscle'],
  sol: 'Afferent fibres transmit impulses from tissues and organs to the CNS — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('autonomic-mcq', mcq({
  stem: 'When a dog suddenly barks behind you, your heart races and the muscles of your gut wall slow down, without any decision on your part. Which part of the peripheral neural system relays these impulses to the involuntary organs and smooth muscles?',
  right: 'The autonomic neural system',
  wrong: ['The somatic neural system', 'The afferent fibres of the skin', 'The corpus callosum'],
  sol: 'The autonomic neural system transmits impulses from the CNS to the involuntary organs and smooth muscles; the somatic system serves skeletal muscles — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('visceralns-mcq', mcq({
  stem: 'The whole complex of nerves, fibres, ganglia and plexuses by which impulses travel from the CNS to the viscera and back is called the',
  right: 'visceral nervous system',
  wrong: ['somatic neural system', 'limbic system', 'central neural system'],
  sol: 'This part of the PNS is the visceral nervous system — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('nissl-mcq', mcq({
  stem: 'A stained neuron seen under a microscope shows dark granular bodies in its cell body and in its short branched processes, but none in its long process. Identify the granules and the short processes.',
  right: 'Nissl’s granules; the short processes are dendrites',
  wrong: ['Synaptic vesicles; the short processes are axons', 'Nodes of Ranvier; the short processes are Schwann cells', 'Myelin; the short processes are synaptic knobs'],
  sol: 'The cell body contains granular bodies called Nissl’s granules, and the short, repeatedly branched dendrites also contain them; the long axon does not — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('bipolar-mcq', mcq({
  stem: 'A neuron with one axon and one dendrite is described as',
  right: 'bipolar',
  wrong: ['multipolar', 'unipolar', 'non-polar'],
  sol: 'Bipolar neurons have one axon and one dendrite, as in the retina of the eye — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('schwann-mcq', mcq({
  stem: 'A histology slide of a spinal nerve shows axons wrapped in a sheath with regular gaps. The sheath and the gaps are',
  right: 'a myelin sheath formed by Schwann cells, with nodes of Ranvier between sheaths',
  wrong: ['a sarcolemma formed by muscle cells, with Z lines between them', 'a pia mater formed by the arachnoid, with synaptic clefts between them', 'Nissl’s granules, with synaptic knobs between them'],
  sol: 'Myelinated fibres, as in spinal and cranial nerves, are enveloped by Schwann cells forming a myelin sheath; the gaps are nodes of Ranvier — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('cortexneuron-mcq', mcq({
  stem: 'A neuroscientist studying a cell from the cerebral cortex finds that it has one axon and many dendrites. The cell is',
  right: 'a multipolar neuron',
  wrong: ['a bipolar neuron', 'a unipolar neuron', 'a Schwann cell'],
  sol: 'One axon with two or more dendrites makes a multipolar neuron, found in the cerebral cortex — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('polarised-mcq', mcq({
  stem: 'Which statement correctly describes a resting (polarised) axonal membrane?',
  right: 'It is more permeable to K⁺ than to Na⁺, and its outer surface is positive with respect to the inner surface.',
  wrong: ['It is freely permeable to Na⁺, and its inner surface is positive.', 'It is equally permeable to all ions, and both surfaces carry the same charge.', 'It is impermeable to K⁺, and its outer surface is negative.'],
  sol: 'At rest the membrane is more permeable to K⁺ and nearly impermeable to Na⁺; the outer surface is positive and the inner negative — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('pump-mcq', mcq({
  stem: 'In a short interval, the sodium–potassium pumps on a tiny patch of axon move 30 sodium ions out of the cell. How many potassium ions do they bring in during the same interval?',
  right: '20',
  wrong: ['45', '30', '10'],
  sol: 'The pump transports 3 Na⁺ outwards for 2 K⁺ inwards, so 30 Na⁺ out goes with 20 K⁺ in — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('depol-mcq', mcq({
  stem: 'When a stimulus is applied at a site on a polarised axon, the membrane at that site becomes freely permeable to',
  right: 'Na⁺, which rushes in and reverses the polarity',
  wrong: ['K⁺, which rushes in and makes the inside more negative', 'negatively charged proteins, which leave the axoplasm', 'Cl⁻ only, which leaves the axon'],
  sol: 'The membrane becomes freely permeable to Na⁺; a rapid influx of Na⁺ makes the inner surface positive (depolarisation) — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('repol-mcq', mcq({
  stem: 'A drug prevents the rise in K⁺ permeability that normally follows the peak of an action potential. Which event will be delayed?',
  right: 'Repolarisation, the return of the membrane to the resting potential',
  wrong: ['Depolarisation by Na⁺ influx', 'Release of the stimulus', 'Formation of the myelin sheath'],
  sol: 'The resting potential is restored when K⁺ permeability rises and K⁺ diffuses out; blocking this delays repolarisation — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('nosodium-mcq', mcq({
  stem: 'An isolated axon is placed in a bathing fluid that contains almost no Na⁺ and is then stimulated. What is the most likely result?',
  right: 'No action potential develops, because there is no Na⁺ to rush in and depolarise the membrane.',
  wrong: ['A larger action potential develops, because K⁺ rushes in instead.', 'The axon stays permanently depolarised.', 'The impulse travels faster than normal.'],
  sol: 'Depolarisation depends on a rapid influx of Na⁺ from outside; without Na⁺ outside, the polarity cannot reverse — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('currentflow-mcq', mcq({
  stem: 'Site A of an axon is depolarised while the next site B is still at rest. In which direction does current flow on the inner surface of the membrane?',
  right: 'From A to B',
  wrong: ['From B to A', 'Across the membrane from outside to inside only', 'No current flows until B is stimulated from outside'],
  sol: 'On the inner surface, current flows from the positive site A to the negative site B, and on the outer surface from B to A — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('cleft-mcq', mcq({
  stem: 'At a chemical synapse, the signal is carried across the synaptic cleft by',
  right: 'neurotransmitter molecules released from synaptic vesicles',
  wrong: ['an electric current flowing directly between the membranes', 'Schwann cells moving across the gap', 'K⁺ ions pumped out of the post-synaptic neuron'],
  sol: 'Synaptic vesicles release neurotransmitters into the cleft; these bind receptors on the post-synaptic membrane — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('receptorblock-mcq', mcq({
  stem: 'A plant toxin occupies the receptors on the post-synaptic membrane without opening any ion channels. What happens when an impulse reaches the pre-synaptic knob?',
  right: 'Neurotransmitter is released but cannot generate a new potential in the post-synaptic neuron.',
  wrong: ['No neurotransmitter is released at all.', 'The post-synaptic neuron fires more strongly than usual.', 'The impulse jumps across as an electric current instead.'],
  sol: 'Ions enter only when neurotransmitter binds receptors and opens ion channels; with receptors blocked, no new potential is generated — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('inhibit-mcq', mcq({
  stem: 'The new potential generated in a post-synaptic neuron after neurotransmitter binding may be',
  right: 'either excitatory or inhibitory',
  wrong: ['only excitatory', 'only inhibitory', 'always equal to the resting potential'],
  sol: 'The new potential developed in the post-synaptic neuron may be either excitatory or inhibitory — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 brain
add('meninges-mcq', mcq({
  stem: 'After opening the skull, a neurosurgeon must pass through each cranial meninx in turn to reach the brain tissue. In which order will she meet them?',
  right: 'Dura mater, then arachnoid, then pia mater',
  wrong: ['Pia mater, then arachnoid, then dura mater', 'Arachnoid, then dura mater, then pia mater', 'Dura mater, then pia mater, then arachnoid'],
  sol: 'The outer layer is the dura mater, the very thin middle layer the arachnoid, and the inner layer, in contact with brain tissue, the pia mater — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('callosum-mcq', mcq({
  stem: 'To control very severe seizures, surgeons sometimes cut the broad tract of nerve fibres through which the two cerebral hemispheres communicate. Which structure is cut?',
  right: 'Corpus callosum',
  wrong: ['Corpora quadrigemina', 'Cerebral aqueduct', 'Pons'],
  sol: 'The corpus callosum is the tract of nerve fibres connecting the left and right cerebral hemispheres — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('grey-mcq', mcq({
  stem: 'The cerebral cortex appears grey mainly because',
  right: 'neuron cell bodies are concentrated in it',
  wrong: ['it is made of myelinated fibre tracts', 'it is covered by the dura mater', 'it contains the cerebral aqueduct'],
  sol: 'The cortex is called grey matter because neuron cell bodies are concentrated there; myelinated tracts form the white matter — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('hypothalamus-mcq', mcq({
  stem: 'Which part of the forebrain contains centres that control body temperature and the urge for eating and drinking?',
  right: 'Hypothalamus',
  wrong: ['Thalamus', 'Corpus callosum', 'Pons'],
  sol: 'The hypothalamus, at the base of the thalamus, contains these centres — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('thalamus-mcq', mcq({
  stem: 'A small stroke damages a structure deep in the forebrain, wrapped by the cerebrum, and the patient’s sensory and motor signals are no longer coordinated properly, although body temperature and appetite are normal. Which structure is most likely damaged?',
  right: 'Thalamus',
  wrong: ['Hypothalamus', 'Medulla', 'Cerebral aqueduct'],
  sol: 'The thalamus is a major coordinating centre for sensory and motor signalling; normal temperature and appetite suggest the hypothalamus is spared — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('limbic-mcq', mcq({
  stem: 'After an injury deep inside the cerebral hemispheres that damaged the amygdala and hippocampus, a patient’s expression of fear and rage changed markedly. Which system was affected?',
  right: 'The limbic system',
  wrong: ['The somatic neural system', 'The corpora quadrigemina', 'The visceral nervous system'],
  sol: 'The amygdala, hippocampus and inner parts of the hemispheres form the limbic system, which with the hypothalamus regulates emotional reactions, sexual behaviour and motivation — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('medulla-mcq', mcq({
  stem: 'After a fall onto the back of his neck, a mountaineer’s breathing and heart rate became dangerously irregular, although he could think clearly. Which part of the brain was most probably injured?',
  right: 'Medulla oblongata',
  wrong: ['Cerebral cortex', 'Corpus callosum', 'Thalamus'],
  sol: 'The medulla contains centres that control respiration and cardiovascular reflexes — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('cerebellum-mcq', mcq({
  stem: 'Under a microscope, one region of the hindbrain shows an extremely convoluted surface that provides extra space for a great many neurons. This region is the',
  right: 'cerebellum',
  wrong: ['pons', 'medulla', 'midbrain'],
  sol: 'The cerebellum has a very convoluted surface to provide additional space for many more neurons — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('quadrigemina-mcq', mcq({
  stem: 'The four round swellings on the dorsal portion of the midbrain are called the',
  right: 'corpora quadrigemina',
  wrong: ['corpus callosum', 'association areas', 'nodes of Ranvier'],
  sol: 'The dorsal midbrain consists mainly of four round swellings, the corpora quadrigemina — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('brainstem-mcq', mcq({
  stem: 'The brain stem, which connects the brain with the spinal cord, is formed by the',
  right: 'midbrain, pons and medulla oblongata',
  wrong: ['cerebrum, thalamus and hypothalamus', 'pons, cerebellum and cerebrum', 'thalamus, midbrain and cerebellum'],
  sol: 'Midbrain, pons and medulla oblongata form the brain stem — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('pons-mcq', mcq({
  stem: 'A region of the hindbrain made largely of fibre tracts interconnecting different regions of the brain is the',
  right: 'pons',
  wrong: ['medulla', 'hypothalamus', 'corpora quadrigemina'],
  sol: 'The pons consists of fibre tracts that interconnect different regions of the brain — option (@K).',
  d: 1, c: 'recall', t: [2],
}));

// ---------------------------------------------------------------- t03 reflex action
add('kneeroot-mcq', mcq({
  stem: 'An injury destroys the dorsal nerve roots of the spinal cord segment that serves a patient’s knee-jerk reflex. Which neurons of the reflex arc can no longer bring impulses into the spinal cord?',
  right: 'The afferent (sensory) neurons',
  wrong: ['The efferent (motor) neurons', 'The neurons of the corpus callosum', 'The neurosecretory cells of the hypothalamus'],
  sol: 'The afferent neuron transmits the impulse via a dorsal nerve root into the CNS at the level of the spinal cord — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('hotpan-mcq', mcq({
  stem: 'A cook jerks her hand away from a hot pan handle before she even feels the pain. Where is the decision to withdraw the hand made?',
  right: 'In the spinal cord, through a reflex arc, without conscious effort',
  wrong: ['In the association areas of the cerebral cortex', 'In the corpora quadrigemina of the midbrain', 'In the receptor in the skin itself'],
  sol: 'A reflex action is an involuntary response involving part of the CNS, such as the spinal cord, without conscious thought — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('minimal-mcq', mcq({
  stem: 'What is the minimum set of neurons a reflex pathway must contain?',
  right: 'At least one afferent neuron and one efferent neuron in series',
  wrong: ['At least three neurons, all in the brain', 'Only one efferent neuron', 'Only one afferent neuron'],
  sol: 'The reflex pathway comprises at least one afferent and one efferent neuron appropriately arranged in a series — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- assertion-reason
add('electrical-ar', ar({
  a: 'Impulse transmission across an electrical synapse is faster than across a chemical synapse.',
  r: 'At an electrical synapse the pre- and post-synaptic membranes are in very close proximity, and electric current flows directly from one neuron into the other.',
  key: 'a',
  sol: 'Both are true, and the direct flow of current explains the faster transmission — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('myelin-ar', ar({
  a: 'Myelinated nerve fibres are found in the spinal and cranial nerves.',
  r: 'The myelin sheath around an axon is formed by Schwann cells.',
  key: 'b',
  sol: 'Both statements are true, but who forms the sheath does not explain where myelinated fibres occur — option (b).',
  d: 2, c: 'understanding', t: [1],
}));
add('greyw-ar', ar({
  a: 'The cerebral cortex is referred to as grey matter.',
  r: 'The cerebral cortex consists mainly of nerve fibres covered with a myelin sheath.',
  key: 'c',
  sol: 'A is true; R is false, because myelinated fibres form the white matter, while the cortex is grey because neuron cell bodies are concentrated there — option (c).',
  d: 3, c: 'analysis', t: [2],
}));
add('reflex-ar', ar({
  a: 'A reflex action requires conscious thought in the cerebrum before the response.',
  r: 'A reflex pathway comprises at least one afferent neuron and one efferent neuron arranged in a series.',
  key: 'd',
  sol: 'A is false: a reflex is involuntary, without conscious effort; R is true — option (d).',
  d: 2, c: 'understanding', t: [3],
}));
add('influx-ar', ar({
  a: 'At the site of a stimulus, the inner surface of the axonal membrane becomes positively charged.',
  r: 'At that site the membrane becomes freely permeable to Na⁺, leading to a rapid influx of Na⁺.',
  key: 'a',
  sol: 'Both are true, and the influx of positive Na⁺ explains the reversal of polarity — option (a).',
  d: 3, c: 'analysis', t: [1],
}));

// ---------------------------------------------------------------- true-false, fill, match
add('neurosecretory-tf', tf({
  stem: 'The hypothalamus contains groups of neurosecretory cells that secrete hypothalamic hormones.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [2],
}));
add('unipolar-tf', tf({
  stem: 'Unipolar neurons are the common type of neuron in the adult cerebral cortex.',
  key: 'f',
  sol: 'False. Unipolar neurons are usually found in the embryonic stage; the cerebral cortex has multipolar neurons.',
  d: 2, c: 'understanding', t: [1],
}));
add('somatic-tf', tf({
  stem: 'The somatic neural system relays impulses from the CNS to the skeletal muscles.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [1],
}));
add('ranvier-fill', fill({
  stem: 'The gaps between two adjacent myelin sheaths along an axon are called nodes of ______.',
  acc: [['Ranvier']],
  sol: 'Nodes of Ranvier.',
  d: 1, c: 'recall', t: [1],
}));
add('pia-fill', fill({
  stem: 'The innermost cranial meninx, which is in contact with the brain tissue, is the ______ mater.',
  acc: [['pia']],
  sol: 'Pia mater.',
  d: 1, c: 'recall', t: [2],
}));
add('aqueduct-fill', fill({
  stem: 'The canal that passes through the midbrain is called the cerebral ______.',
  acc: [['aqueduct']],
  sol: 'Cerebral aqueduct.',
  d: 1, c: 'recall', t: [2],
}));
add('brain-match', match({
  stem: 'Match each part of the brain (column I) with its role (column II).',
  pairs: [
    ['Hypothalamus', 'Controls body temperature and the urge for eating and drinking'],
    ['Medulla', 'Controls respiration, cardiovascular reflexes and gastric secretions'],
    ['Thalamus', 'Major coordinating centre for sensory and motor signalling'],
    ['Corpus callosum', 'Connects the left and right cerebral hemispheres'],
  ],
  order: [3, 1, 0, 2],
  sol: 'Hypothalamus — temperature, eating and drinking; medulla — respiration, cardiovascular reflexes, gastric secretions; thalamus — sensory and motor coordination; corpus callosum — joins the hemispheres.',
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- numerical
add('cond-num', num({
  stem: `A nerve impulse travels ${Q_COND.d} m along a motor fibre from the spinal cord to a foot muscle at ${Q_COND.v} m per second. How long does it take, in milliseconds?`,
  value: Q_COND.t, tol: 0.1, unit: 'ms',
  sol: r`Time $= \dfrac{${Q_COND.d}}{${Q_COND.v}} = ${Q_COND.s}$ s $= ${Q_COND.s} \times 1000 = ${Q_COND.t}$ ms.`,
  scheme: [[`${Q_COND.t} ms`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === 20 || 'value');
add('ratio-num', num({
  stem: `Two fibres of a frog nerve are each ${Q_RATIO.d} m long. One conducts at ${Q_RATIO.fast} m per second, the other at ${Q_RATIO.slow} m per second. How many times longer does the slower fibre take to carry an impulse along its length?`,
  value: Q_RATIO.ratio, tol: 0.01,
  sol: r`Fast: $\dfrac{${Q_RATIO.d}}{${Q_RATIO.fast}} \times 1000 = ${Q_RATIO.tFast}$ ms; slow: $\dfrac{${Q_RATIO.d}}{${Q_RATIO.slow}} \times 1000 = ${Q_RATIO.tSlow}$ ms; ratio $= \dfrac{${Q_RATIO.tSlow}}{${Q_RATIO.tFast}} = ${Q_RATIO.ratio}$.`,
  scheme: [[`${Q_RATIO.ratio}`, 1]],
  d: 3, c: 'application', t: [1],
}), (q) => q.answer.value === 20 || 'value');
add('pump-num', num({
  stem: 'During one period of activity, the sodium–potassium pumps of a small patch of axon move 900 sodium ions out of the cell. How many potassium ions do they move in?',
  value: kForNa(900),
  sol: r`Each cycle moves 3 Na⁺ out and 2 K⁺ in: $\dfrac{900}{${PUMP.na}} \times ${PUMP.k} = ${kForNa(900)}$ K⁺ ions.`,
  scheme: [[`${kForNa(900)}`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === 600 || 'value');
add('net-num', num({
  stem: `In ${Q_NET.cycles} cycles of the sodium–potassium pump, how many more positive charges leave the cell than enter it?`,
  value: Q_NET.netOut,
  sol: r`Na⁺ out $= 3 \times ${Q_NET.cycles} = ${Q_NET.naOut}$; K⁺ in $= 2 \times ${Q_NET.cycles} = ${Q_NET.kIn}$; net $= ${Q_NET.naOut} - ${Q_NET.kIn} = ${Q_NET.netOut}$ positive charges out.`,
  scheme: [[`${Q_NET.netOut}`, 1]],
  d: 3, c: 'analysis', t: [1],
}), (q) => q.answer.value === 450 || 'value');
add('amplitude-num', num({
  stem: `A recording shows an axon at rest at ${REST} mV; during an action potential the potential reaches +${PEAK} mV. By how many millivolts does the membrane potential change from rest to the peak?`,
  value: AMPLITUDE, unit: 'mV',
  sol: r`Change $= ${PEAK} - (${REST}) = ${AMPLITUDE}$ mV.`,
  scheme: [[`${AMPLITUDE} mV`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === 100 || 'value');
add('reflex-num', num({
  stem: `In a withdrawal reflex, the afferent neuron is ${Q_REFLEX.aff.toFixed(1)} m long and the efferent neuron ${Q_REFLEX.eff} m long; both conduct at ${Q_REFLEX.v} m per second, and the signal crosses ${Q_REFLEX.synapses} synapse with a delay of ${Q_REFLEX.delay} ms. Estimate the total reflex time in milliseconds.`,
  value: Q_REFLEX.total, tol: 0.1, unit: 'ms',
  sol: r`Conduction $= \dfrac{${Q_REFLEX.aff.toFixed(1)} + ${Q_REFLEX.eff}}{${Q_REFLEX.v}} \times 1000 = ${Q_REFLEX.cond}$ ms; total $= ${Q_REFLEX.cond} + ${Q_REFLEX.delay} = ${Q_REFLEX.total}$ ms.`,
  scheme: [[`Conduction ${Q_REFLEX.cond} ms`, 0.5], [`Total ${Q_REFLEX.total} ms`, 0.5]],
  d: 4, c: 'application', t: [3],
}), (q) => q.answer.value === 30.5 || 'value');

// ---------------------------------------------------------------- short answers
add('fibres-short', short({
  marks: 2,
  stem: 'Distinguish between myelinated and non-myelinated nerve fibres, and state where each is commonly found.',
  model: '**Myelinated** fibres are enveloped by **Schwann cells** that form a **myelin sheath**, with gaps called **nodes of Ranvier**; they occur in **spinal and cranial nerves**. **Non-myelinated** fibres are enclosed by a Schwann cell that forms **no myelin sheath**; they are common in the **autonomous and somatic neural systems**.',
  sol: 'Sheath and location.',
  scheme: [['Myelinated: sheath, nodes, spinal and cranial nerves', 1], ['Non-myelinated: no sheath, autonomous and somatic systems', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('types-short', short({
  marks: 2,
  stem: 'Classify neurons on the basis of the number of axons and dendrites, giving where each type is found.',
  model: '**Multipolar** neurons have one axon and two or more dendrites; they are found in the **cerebral cortex**. **Bipolar** neurons have one axon and one dendrite, as in the **retina of the eye**. **Unipolar** neurons have a cell body with **one axon only** and are usually found in the **embryonic stage**.',
  sol: 'Three types with locations.',
  scheme: [['Multipolar and bipolar with locations', 1], ['Unipolar with location', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('resting-short', short({
  marks: 2,
  stem: 'How does an axon keep its membrane polarised at rest?',
  model: 'The membrane is **more permeable to K⁺** and nearly **impermeable to Na⁺** and to the negative proteins of the axoplasm. The **sodium–potassium pump** moves **3 Na⁺ out for 2 K⁺ in**, maintaining high Na⁺ outside and high K⁺ inside, so the **outside stays positive** and the **inside negative**.',
  sol: 'Permeability and pump.',
  scheme: [['Selective permeability', 1], ['Pump 3 Na⁺ out, 2 K⁺ in; outside positive', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('toxin-short', short({
  marks: 2,
  stem: 'A toxin from a puffer fish blocks the channels through which Na⁺ enters an axon. Predict how this affects nerve impulses, with a reason.',
  model: 'Nerve impulses will **not be generated or conducted**. An action potential needs the membrane to become **freely permeable to Na⁺** so that a rapid **influx of Na⁺** can **depolarise** it. With the Na⁺ channels blocked, the polarity cannot reverse, so no impulse arises.',
  sol: 'No Na⁺ influx, no depolarisation.',
  scheme: [['No impulse', 1], ['Na⁺ influx needed for depolarisation', 1]],
  d: 3, c: 'application', t: [1],
}));
add('meninges-short', short({
  marks: 2,
  stem: 'Name the cranial meninges in order from outside to inside and describe the position of each.',
  model: 'The brain, inside the skull, is covered by three cranial meninges: the outer **dura mater**; a very thin middle layer, the **arachnoid**; and the inner **pia mater**, which is in **contact with the brain tissue**.',
  sol: 'Dura, arachnoid, pia.',
  scheme: [['Correct order of three names', 1], ['Position of each', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('thalhypo-short', short({
  marks: 2,
  stem: 'Both the thalamus and the hypothalamus lie deep in the forebrain. Distinguish between them by position and role.',
  model: 'The **thalamus** is wrapped by the cerebrum and is a major **coordinating centre for sensory and motor signalling**. The **hypothalamus** lies at the **base of the thalamus**; it controls **body temperature** and the **urge for eating and drinking**, and its neurosecretory cells secrete **hypothalamic hormones**.',
  sol: 'Position and role.',
  scheme: [['Thalamus: sensory and motor coordination', 1], ['Hypothalamus: base of thalamus; temperature, hunger, thirst, hormones', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('hotplate-short', short({
  marks: 2,
  stem: 'A child touches a hot iron and pulls her hand back before she feels any pain. Explain why the withdrawal is so quick.',
  model: 'Withdrawal is a **reflex action**. The impulse travels along an **afferent neuron** into the **spinal cord**, where it is passed directly to an **efferent neuron** that makes the arm muscles contract. It need not reach the **brain** for conscious thought, so the response is **involuntary and fast**.',
  sol: 'Reflex through the spinal cord.',
  scheme: [['Reflex arc via spinal cord', 1], ['No conscious thought: faster', 1]],
  d: 2, c: 'application', t: [3],
}));
add('impulse-short3', short({
  marks: 3,
  stem: 'Describe how an action potential is generated at a site on an axon and how the membrane then returns to its resting state.',
  model: '**Resting:** the membrane is polarised, outside positive and inside negative, more permeable to K⁺.\n\n**Depolarisation:** a stimulus makes the membrane at that site **freely permeable to Na⁺**; a rapid **influx of Na⁺** makes the inner surface **positive** and the outer negative. This potential difference is the **action potential** (nerve impulse).\n\n**Repolarisation:** the rise in Na⁺ permeability is very short-lived; **K⁺ permeability rises**, K⁺ diffuses out, and the **resting potential is restored**.',
  sol: 'Resting, depolarisation, repolarisation.',
  scheme: [['Polarised resting state', 1], ['Na⁺ influx, reversed polarity', 1], ['K⁺ out, resting potential restored', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('conduct-short3', short({
  marks: 3,
  stem: 'Site A of an axon has just been depolarised, while site B next to it is still at rest. Explain how the impulse moves from A to B.',
  model: 'At A the **inner surface is positive** and the outer negative, while at B the inner surface is still **negative**. **Current flows on the inner surface from A to B** and on the outer surface from B to A, completing a circuit. This makes B **depolarise** and an **action potential** is generated at B, while A **repolarises**. The sequence repeats along the axon, so the impulse is **conducted**.',
  sol: 'Local currents depolarise B.',
  scheme: [['Charges at A and B', 1], ['Current from A to B inside, B to A outside', 1], ['B depolarises; sequence repeats', 1]],
  d: 3, c: 'application', t: [1],
}));
add('chemsyn-short3', short({
  marks: 3,
  stem: 'Explain, step by step, how an impulse is transmitted across a chemical synapse.',
  model: '1. The impulse reaches the **axon terminal** of the pre-synaptic neuron.\n2. It stimulates the **synaptic vesicles** to move to the plasma membrane and fuse with it, releasing **neurotransmitters** into the fluid-filled **synaptic cleft**.\n3. The neurotransmitters bind to **specific receptors** on the **post-synaptic membrane**.\n4. Binding **opens ion channels**; the entry of ions can generate a **new potential** in the post-synaptic neuron, which may be **excitatory or inhibitory**.',
  sol: 'Vesicles, cleft, receptors, new potential.',
  scheme: [['Vesicles release neurotransmitter into the cleft', 1], ['Binding to receptors', 1], ['Ion channels open; excitatory or inhibitory potential', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('regions-short3', short({
  marks: 3,
  stem: 'Name the brain region most likely affected in each case, with a reason: (i) a woman who no longer feels hungry or thirsty and whose body temperature swings widely; (ii) a man whose breathing and gastric secretions are disturbed after an injury where the brain joins the spinal cord; (iii) a patient whose left and right hemispheres cannot exchange information.',
  model: '(i) **Hypothalamus** — it contains centres that control **body temperature** and the **urge for eating and drinking**.\n\n(ii) **Medulla oblongata** — it is connected to the spinal cord and controls **respiration**, cardiovascular reflexes and **gastric secretions**.\n\n(iii) **Corpus callosum** — this tract of nerve fibres **connects the two cerebral hemispheres**.',
  sol: 'Three regions with functions.',
  scheme: [['Hypothalamus with reason', 1], ['Medulla with reason', 1], ['Corpus callosum with reason', 1]],
  d: 2, c: 'application', t: [2],
}));
add('arc-short3', short({
  marks: 3,
  stem: 'What is a reflex action? Describe the components of a reflex arc, using the knee jerk as the example.',
  model: 'A **reflex action** is an **involuntary** response to a peripheral stimulus, without conscious effort, involving part of the **CNS**.\n\nIn the **knee jerk**, a tap below the knee cap stretches the thigh muscle. The **afferent neuron** carries the impulse from the receptor via the **dorsal nerve root** into the **spinal cord**. There it passes across a synapse to the **efferent neuron**, which carries it to the **effector**, the thigh muscle, so the leg kicks.',
  sol: 'Definition and arc.',
  scheme: [['Definition', 1], ['Afferent neuron via dorsal root to spinal cord', 1], ['Efferent neuron to effector muscle', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- long answers
add('impulse-long', long({
  stem: 'Explain how a nerve impulse is generated and conducted along an axon. Include the resting potential, depolarisation, conduction to the next site and repolarisation.',
  model: '**Resting potential.** Ion channels in the axonal membrane are selectively permeable. At rest the membrane is **more permeable to K⁺** and nearly **impermeable to Na⁺** and to the negatively charged proteins of the axoplasm. The axoplasm has **high K⁺** and **low Na⁺**; the fluid outside has **low K⁺** and **high Na⁺**. The **sodium–potassium pump** moves **3 Na⁺ out for 2 K⁺ in**. The outer surface is therefore **positive** and the inner **negative**: the membrane is **polarised**, and this potential difference is the resting potential.\n\n**Depolarisation.** When a stimulus is applied at a site A, the membrane there becomes **freely permeable to Na⁺**. A rapid **influx of Na⁺** reverses the polarity: the outer surface becomes negative and the inner positive. This is the **action potential**, or nerve impulse.\n\n**Conduction.** At the adjacent site B the inner surface is still negative, so **current flows on the inner surface from A to B** and on the outer surface from B to A. B is depolarised and an action potential is generated there. The sequence is repeated along the length of the axon.\n\n**Repolarisation.** The rise in Na⁺ permeability is extremely short-lived; it is quickly followed by a rise in **K⁺ permeability**. K⁺ diffuses out and the **resting potential is restored**, so the fibre is ready to respond to further stimulation.',
  sol: 'Resting, depolarisation, conduction, repolarisation.',
  scheme: [['Ion distribution, permeability and pump', 1.5], ['Depolarisation and action potential', 1.5], ['Conduction by local currents', 1], ['Repolarisation', 1]],
  wl: [80, 240],
  d: 3, c: 'understanding', t: [1],
}));
add('neuron-long', long({
  stem: 'Describe the structure of a neuron. Classify neurons by the number of their processes, distinguish myelinated from non-myelinated fibres, and explain how an impulse passes to the next neuron at a chemical synapse.',
  model: '**Structure.** A neuron has a **cell body**, **dendrites** and an **axon**. The cell body contains cytoplasm with typical organelles and **Nissl’s granules**. **Dendrites** are short, repeatedly branched fibres, also with Nissl’s granules, that carry impulses **towards** the cell body. The **axon** is a long fibre whose distal end is branched; each branch ends in a bulb-like **synaptic knob** with **synaptic vesicles** containing **neurotransmitters**. Axons carry impulses **away** from the cell body.\n\n**Types.** **Multipolar** neurons (one axon, two or more dendrites) occur in the cerebral cortex; **bipolar** (one axon, one dendrite) in the retina of the eye; **unipolar** (one axon only) usually in the embryonic stage.\n\n**Fibres.** In **myelinated** fibres, **Schwann cells** form a **myelin sheath** with **nodes of Ranvier** between adjacent sheaths; these occur in spinal and cranial nerves. In **non-myelinated** fibres a Schwann cell encloses the axon without forming a sheath; these are common in the autonomous and somatic neural systems.\n\n**Chemical synapse.** An impulse at the axon terminal makes the vesicles fuse with the membrane and release neurotransmitters into the **synaptic cleft**. They bind **receptors** on the post-synaptic membrane, opening **ion channels**; the entry of ions can generate a new, **excitatory or inhibitory** potential.',
  sol: 'Structure, types, fibres, synapse.',
  scheme: [['Parts of the neuron', 1.5], ['Three types with examples', 1], ['Myelinated and non-myelinated', 1], ['Chemical synapse transmission', 1.5]],
  wl: [80, 240],
  d: 3, c: 'understanding', t: [1],
}));
add('brain-long', long({
  stem: 'Describe the protection, parts and functions of the human brain, organised as forebrain, midbrain and hindbrain.',
  model: '**Protection.** The brain lies in the **skull** and is covered by three cranial **meninges**: the outer **dura mater**, the very thin middle **arachnoid** and the inner **pia mater**, in contact with brain tissue.\n\n**Forebrain.** The **cerebrum**, the major part, is divided by a deep cleft into **left and right hemispheres**, joined by the **corpus callosum**. Its folded **cerebral cortex** is **grey matter**, where neuron cell bodies are concentrated; it has **motor**, **sensory** and **association areas** (intersensory associations, memory, communication). Myelinated tracts inside form **white matter**. The cerebrum wraps the **thalamus**, a coordinating centre for sensory and motor signalling. The **hypothalamus** at its base controls **body temperature** and **eating and drinking** and secretes hypothalamic hormones. With the **limbic system** (amygdala, hippocampus) it regulates sexual behaviour, emotions and motivation.\n\n**Midbrain.** It lies between the thalamus or hypothalamus and the pons; the **cerebral aqueduct** passes through it, and its dorsal part has the four **corpora quadrigemina**.\n\n**Hindbrain.** The **pons** has fibre tracts linking brain regions; the **cerebellum** has a very convoluted surface that gives space for many more neurons; the **medulla**, joined to the spinal cord, controls **respiration**, **cardiovascular reflexes** and **gastric secretions**. The midbrain, pons and medulla form the **brain stem**.',
  sol: 'Protection and three regions.',
  scheme: [['Meninges', 0.5], ['Cerebrum and cortex', 1.5], ['Thalamus, hypothalamus, limbic system', 1], ['Midbrain', 0.5], ['Hindbrain and brain stem', 1.5]],
  wl: [80, 240],
  d: 3, c: 'understanding', t: [2],
}));
add('kneejerk-long', long({
  stem: 'A doctor taps just below a patient’s knee cap and the lower leg kicks forward. Explain this response as a reflex action, tracing the reflex arc, and explain why such reflexes are useful and why doctors test them.',
  model: '**Reflex action.** The kick is a **reflex action**: an **involuntary** response to a peripheral stimulus, made without conscious effort or thought but involving a part of the **central nervous system**, here the **spinal cord**.\n\n**Reflex arc.** The tap stretches the thigh muscle, stimulating receptors in it. An **afferent (sensory) neuron** carries the impulse from the receptor via the **dorsal nerve root** into the **spinal cord**. In the grey matter it passes across a **synapse** to an **efferent (motor) neuron**. The efferent neuron carries the impulse back to the **effector**, the thigh muscle, which contracts so the leg kicks. A reflex pathway needs **at least one afferent and one efferent neuron** in series; the knee jerk uses just these two.\n\n**Usefulness.** Because the impulse does not have to travel to the brain and back, and crosses very few synapses, reflexes are **fast and automatic**. Withdrawal reflexes, for example, pull a hand away from a hot object before damage is done.\n\n**Why doctors test it.** A normal knee jerk shows that the **receptor, afferent neuron, spinal cord segment, efferent neuron and muscle** are all working. A missing or abnormal response points to damage somewhere along the arc.',
  sol: 'Reflex, arc, usefulness, testing.',
  scheme: [['Reflex action defined', 1], ['Afferent, dorsal root, spinal cord, synapse', 1.5], ['Efferent neuron and effector', 1], ['Usefulness and diagnostic value', 1.5]],
  wl: [80, 240],
  d: 3, c: 'application', t: [3],
}));
add('control-long', long({
  stem: 'A student writes: “Every response of the human body is decided by the cerebrum.” Evaluate this statement using your knowledge of the divisions of the neural system, the roles of the hypothalamus and medulla, and reflex action.',
  model: '**What is right.** The **cerebrum** is the major part of the brain. Its cortex has **motor areas** that control voluntary movement, **sensory areas** and **association areas** for memory, communication and intersensory association. Conscious, voluntary responses are indeed directed from here, through the **somatic neural system** to skeletal muscles.\n\n**What is wrong.** Many responses are not decided by the cerebrum.\n- The **autonomic neural system**, with its **sympathetic** and **parasympathetic** divisions, relays impulses from the CNS to the **involuntary organs and smooth muscles** without conscious control.\n- The **hypothalamus** controls **body temperature** and the urge to **eat and drink**, and secretes hormones; with the **limbic system** it shapes emotions and motivation.\n- The **medulla** contains centres for **respiration**, **cardiovascular reflexes** and **gastric secretions**, which go on even during sleep.\n- **Reflex actions**, such as the knee jerk or withdrawing from a hot object, are **involuntary**: the arc of afferent neuron, spinal cord and efferent neuron produces the response **without conscious thought** in the cerebrum.\n\n**Judgement.** The statement is **too broad**. The cerebrum decides voluntary and conscious responses, but vital involuntary functions are run by the hypothalamus, medulla and autonomic system, and reflexes are handled at the level of the spinal cord.',
  sol: 'Partly true; many responses bypass the cerebrum.',
  scheme: [['Role of the cerebrum in voluntary responses', 1], ['Autonomic system', 1], ['Hypothalamus and medulla', 1], ['Reflex actions', 1], ['Reasoned judgement', 1]],
  wl: [80, 240],
  d: 4, c: 'evaluation', t: [2, 3],
}));

// ---------------------------------------------------------------- cases
add('axon-case', mk.case({
  passage: `A physiology class recorded the membrane potential of a large isolated axon with a fine electrode. At rest the inside read ${REST} mV. When a brief stimulus was applied, the reading rose sharply to +${PEAK} mV and then returned to ${REST} mV within a few milliseconds. A second electrode ${CASE_AXON.d * 100} cm further along the axon picked up the same change a little later; the impulse travelled at ${CASE_AXON.v} m per second.`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The sharp rise of the reading from the resting value to the peak is caused by',
      right: 'a rapid influx of Na⁺ into the axon',
      wrong: ['a rapid outflow of K⁺ from the axon', 'the sodium–potassium pump moving K⁺ in', 'neurotransmitter binding to the axon'],
      sol: 'A stimulus makes the membrane freely permeable to Na⁺, which rushes in and depolarises it — option (@K).',
      d: 2, c: 'application', t: [1],
    })),
    part('b', num({
      stem: 'How long, in milliseconds, did the impulse take to travel from the first electrode to the second?',
      value: CASE_AXON.t, tol: 0.1, unit: 'ms',
      sol: r`Time $= \dfrac{${CASE_AXON.d}}{${CASE_AXON.v}} \times 1000 = ${CASE_AXON.t}$ ms.`,
      scheme: [[`${CASE_AXON.t} ms`, 1]],
      d: 2, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: `Explain why the reading returned to ${REST} mV so quickly after the peak.`,
      model: 'The rise in **Na⁺ permeability** is extremely **short-lived**. It is quickly followed by a rise in **K⁺ permeability**, so **K⁺ diffuses out** of the axon. The inside becomes negative again and the **resting potential is restored** (repolarisation), ready for the next stimulus.',
      sol: 'Repolarisation by K⁺ outflow.',
      scheme: [['Na⁺ permeability short-lived', 1], ['K⁺ diffuses out: repolarisation', 1]],
      d: 2, c: 'understanding', t: [1],
    }), [
      short({
        marks: 2,
        stem: 'Explain how the change recorded at the first electrode caused the same change at the second electrode a little later.',
        model: 'At the depolarised site the inner surface is positive, while the next site is still negative inside. **Current flows on the inner surface** towards the resting site and back on the outer surface, **depolarising** it, so an action potential arises there. Repeated site by site, the impulse **travels along the axon**.',
        sol: 'Local currents.',
        scheme: [['Current flows to the next site', 1], ['Next site depolarises; repeated along axon', 1]],
        d: 3, c: 'application', t: [1],
      }),
    ]),
  ],
}), (q) => q.children[1].answer.value === 6 || 'value');
add('toxin-case', mk.case({
  passage: 'Researchers studied a toxin from a soil bacterium on nerve–nerve junctions grown in a dish. When a pre-synaptic neuron was stimulated, impulses still reached its axon terminals normally, but the synaptic vesicles there no longer fused with the membrane. No new potential arose in the post-synaptic neurons. Electron micrographs showed that the gap between the two membranes was filled with fluid.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'From the micrographs, what type of synapse was being studied?',
      right: 'A chemical synapse, with a fluid-filled synaptic cleft',
      wrong: ['An electrical synapse, with membranes in very close contact', 'A neuromuscular junction between nerve and bone', 'A node of Ranvier'],
      sol: 'A fluid-filled synaptic cleft between the membranes marks a chemical synapse — option (@K).',
      d: 1, c: 'application', t: [1],
    })),
    part('b', mcq({
      stem: 'Which step of transmission does the toxin block?',
      right: 'Release of neurotransmitter into the cleft by fusion of vesicles with the membrane',
      wrong: ['Conduction of the impulse along the pre-synaptic axon', 'Pumping of Na⁺ out of the pre-synaptic neuron', 'Opening of ion channels in the pre-synaptic axon'],
      sol: 'Impulses reach the terminal, but vesicles cannot fuse to release neurotransmitter — option (@K).',
      d: 2, c: 'analysis', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Describe what normally happens after the neurotransmitter is released, which the toxin prevents.',
      model: 'The neurotransmitter crosses the **synaptic cleft** and binds to **specific receptors** on the **post-synaptic membrane**. This binding **opens ion channels**, allowing ions to enter, which can generate a **new potential** in the post-synaptic neuron, either **excitatory or inhibitory**.',
      sol: 'Receptors, ion channels, new potential.',
      scheme: [['Binding to receptors on post-synaptic membrane', 1], ['Ion channels open: new potential', 1]],
      d: 2, c: 'understanding', t: [1],
    }), [
      short({
        marks: 2,
        stem: 'Would the toxin stop transmission at an electrical synapse too? Explain.',
        model: '**No.** At an electrical synapse the two membranes are in **very close proximity**, and **electric current flows directly** from one neuron into the other. No neurotransmitter or vesicle fusion is involved, so blocking vesicle fusion would not affect it.',
        sol: 'Electrical synapses use direct current.',
        scheme: [['No', 1], ['Direct current flow; no vesicles needed', 1]],
        d: 3, c: 'analysis', t: [1],
      }),
    ]),
  ],
}));
add('injury-case', mk.case({
  passage: 'A motorcyclist without a helmet hit the back of his head. He remained fully conscious and could speak, but over the next hour his breathing became slow and irregular and his heart rate changed unpredictably. A scan showed swelling in the lowest part of the brain, where it joins the spinal cord, and bruising of the membranes covering the brain at the back.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The swollen part of the brain is most probably the',
      right: 'medulla oblongata',
      wrong: ['hypothalamus', 'corpus callosum', 'cerebral cortex'],
      sol: 'The medulla joins the spinal cord and controls respiration and cardiovascular reflexes — option (@K).',
      d: 2, c: 'application', t: [2],
    })),
    part('b', mcq({
      stem: 'The membrane directly in contact with the bruised brain tissue is the',
      right: 'pia mater',
      wrong: ['dura mater', 'arachnoid', 'myelin sheath'],
      sol: 'The pia mater is the inner meninx, in contact with the brain tissue — option (@K).',
      d: 1, c: 'recall', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Name the three parts of the brain stem and state why an injury to this region is so dangerous.',
      model: 'The brain stem is formed by the **midbrain**, **pons** and **medulla oblongata**. It **connects the brain with the spinal cord**, and the medulla contains centres for **respiration** and **cardiovascular reflexes**, so damage here can stop vital functions.',
      sol: 'Three parts; vital centres.',
      scheme: [['Midbrain, pons, medulla', 1], ['Connection and vital centres', 1]],
      d: 2, c: 'application', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'Explain why the man could still think and speak clearly despite this injury.',
        model: 'Thinking, speech and memory depend on the **cerebral cortex** of the **cerebrum**, with its **association areas**, which lies in the forebrain far from the injured site. The **medulla** controls vital involuntary functions, so its injury disturbed **breathing and heart rate** but not thought.',
        sol: 'Cortex spared; medulla injured.',
        scheme: [['Cerebral cortex and association areas spared', 1], ['Medulla controls involuntary vital functions', 1]],
        d: 3, c: 'analysis', t: [2],
      }),
    ]),
  ],
}));
add('knee-case', mk.case({
  passage: `During a medical check-up, a doctor tapped the tendon just below a student’s knee cap with a rubber hammer, and the lower leg kicked forward at once. In this student the afferent and efferent neurons of the reflex are each about ${CASE_KNEE.aff} m long and conduct at about ${CASE_KNEE.v} m per second; the single synapse in the spinal cord adds a delay of about ${CASE_KNEE.delay} ms.`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The kick of the leg is an example of',
      right: 'a reflex action',
      wrong: ['a voluntary action controlled by the cerebral cortex', 'an action controlled by hormones', 'amoeboid movement'],
      sol: 'It is an involuntary response to a peripheral stimulus, without conscious effort — a reflex action — option (@K).',
      d: 1, c: 'understanding', t: [3],
    })),
    part('b', num({
      stem: 'Estimate the total time, in milliseconds, from the tap to the arrival of the impulse at the thigh muscle.',
      value: CASE_KNEE.total, tol: 0.1, unit: 'ms',
      sol: r`Conduction $= \dfrac{${CASE_KNEE.aff} + ${CASE_KNEE.eff}}{${CASE_KNEE.v}} \times 1000 = 24$ ms; total $= 24 + ${CASE_KNEE.delay} = ${CASE_KNEE.total}$ ms.`,
      scheme: [[`${CASE_KNEE.total} ms`, 1]],
      d: 3, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Trace the path of the impulse in this reflex, from the receptor to the effector.',
      model: 'The tap stimulates a **receptor** in the thigh muscle. The **afferent neuron** carries the impulse via the **dorsal nerve root** into the **spinal cord**. It crosses a synapse to the **efferent neuron**, which carries it to the **effector**, the thigh muscle, which contracts.',
      sol: 'Receptor, afferent, spinal cord, efferent, effector.',
      scheme: [['Receptor, afferent neuron, dorsal root, spinal cord', 1], ['Efferent neuron to effector muscle', 1]],
      d: 2, c: 'understanding', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'In another patient the tap produces no kick, although she can move her leg voluntarily. Suggest where the fault might lie, with a reason.',
        model: 'The fault is probably in the **afferent neuron or dorsal nerve root**, or in the **receptor** or the synapse in the spinal cord. Voluntary movement shows the **efferent pathway and muscle** work, so the **reflex arc** must be broken on the incoming side.',
        sol: 'Afferent side of the arc.',
        scheme: [['Afferent neuron, dorsal root or receptor', 1], ['Reason: efferent and muscle work', 1]],
        d: 4, c: 'analysis', t: [3],
      }),
    ]),
  ],
}), (q) => q.children[1].answer.value === 24.5 || 'value');
