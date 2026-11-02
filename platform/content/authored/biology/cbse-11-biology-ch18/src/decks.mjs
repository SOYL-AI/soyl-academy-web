// ch18 Neural Control and Coordination — two decks: Part 1 (t01 neuron, impulse, synapse), Part 2 (t02 CNS, t03 reflex action).
import { sl, deck, table, flow, svgV, r } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { NEURON, RESTING, ACTION, SYNAPSE, BRAIN, REFLEX } from './svgs.mjs';
import { REST, PEAK, PUMP, WE1, WE2, KNEE } from './calc.mjs';

export const V = {
  neuron: svgV(NEURON, 'Neuron with dendrites, cell body with Nissl’s granules, myelinated axon with nodes of Ranvier and synaptic knobs'),
  resting: svgV(RESTING, 'Polarised axon membrane with sodium ions outside, potassium ions inside and the sodium–potassium pump'),
  action: svgV(ACTION, 'Graph of membrane potential against time showing resting potential, depolarisation to a peak and repolarisation'),
  synapse: svgV(SYNAPSE, 'Chemical synapse with vesicles, neurotransmitter crossing the cleft and receptors on the post-synaptic membrane'),
  brain: svgV(BRAIN, 'Sagittal section of the brain labelling cerebrum, corpus callosum, thalamus, hypothalamus, midbrain, pons, cerebellum and medulla'),
  reflex: svgV(REFLEX, 'Knee-jerk reflex arc from the thigh muscle through the afferent neuron, spinal cord and efferent neuron back to the muscle'),
};

export const deck1 = deck({
  part: 1,
  title: 'Neural Control and Coordination — Part 1: Neurons, impulses and synapses',
  goals: [
    'Describe the organisation of the human neural system',
    'Describe the structure and types of neurons',
    'Explain the resting potential, the action potential and conduction of a nerve impulse',
    'Explain transmission of impulses across electrical and chemical synapses',
  ],
  slides: [
    sl('title', 'Neural Control and Coordination', {
      b: 'Part 1 — how the neural system is organised, and how neurons generate and pass on impulses.',
      v: flow('LR', [['s', 'Stimulus'], ['r', 'Receptor'], ['c', 'Central neural system'], ['e', 'Effector: muscle or gland']], [['s', 'r'], ['r', 'c'], ['c', 'e']], 'Flow from a stimulus through receptors and the central neural system to effectors'),
      n: 'Coordination is the process through which two or more organs interact and complement each other’s functions. During exercise, for example, muscles need more oxygen, so breathing, heart rate and blood flow all rise together. The neural system and the endocrine system jointly coordinate and integrate the activities of the organs. The neural system gives an organised network of point to point connections for quick coordination.',
    }),
    sl('concept', 'The human neural system', {
      b: 'The **central neural system (CNS)** includes the **brain and the spinal cord** and is the site of information processing and control. The **peripheral neural system (PNS)** has all the nerves associated with the CNS.',
      v: table(['Division', 'What it does'], [['Afferent fibres', 'Carry impulses from tissues and organs to the CNS'], ['Efferent fibres', 'Carry regulatory impulses from the CNS to the peripheral tissues and organs'], ['Somatic neural system', 'Relays impulses from the CNS to skeletal muscles'], ['Autonomic neural system', 'Relays impulses from the CNS to the involuntary organs and smooth muscles; divided into sympathetic and parasympathetic'], ['Visceral nervous system', 'Part of the PNS: nerves, fibres, ganglia and plexuses carrying impulses between the CNS and the viscera']], 'Table of the divisions of the peripheral neural system'),
      n: 'Afferent fibres bring messages in to the brain and spinal cord; efferent fibres carry orders out. The somatic system works our skeletal muscles. The autonomic system, with its sympathetic and parasympathetic divisions, runs the involuntary organs and smooth muscles.',
    }),
    sl('diagram', 'The neuron', {
      b: 'A **neuron** is a microscopic structure made of three major parts: the **cell body**, **dendrites** and the **axon**. The cell body contains cytoplasm with typical organelles and granular **Nissl’s granules**. Short, repeatedly branched **dendrites** (which also contain Nissl’s granules) carry impulses **towards** the cell body. The **axon** is a long fibre whose distal end is branched; each branch ends as a bulb-like **synaptic knob** containing **synaptic vesicles** with **neurotransmitters**. Axons carry impulses **away** from the cell body to a synapse or a neuromuscular junction.',
      v: V.neuron,
      n: 'Dendrites are the receiving branches, the cell body is the control centre with its nucleus and Nissl’s granules, and the axon is the long sending cable. In a myelinated axon, Schwann cells wrap a myelin sheath around the axon, leaving small gaps called the nodes of Ranvier.',
    }),
    sl('concept', 'Kinds of neurons and nerve fibres', {
      b: 'Neurons are classified by the number of axons and dendrites; axons are **myelinated** or **non-myelinated**.',
      v: table(['Type', 'Structure', 'Where found'], [['Multipolar', 'One axon, two or more dendrites', 'Cerebral cortex'], ['Bipolar', 'One axon, one dendrite', 'Retina of the eye'], ['Unipolar', 'Cell body with one axon only', 'Usually in the embryonic stage'], ['Myelinated fibre', 'Schwann cells form a myelin sheath; gaps are nodes of Ranvier', 'Spinal and cranial nerves'], ['Non-myelinated fibre', 'A Schwann cell encloses the axon but forms no myelin sheath', 'Autonomous and somatic neural systems']], 'Table of multipolar, bipolar and unipolar neurons and myelinated and non-myelinated fibres'),
      n: 'Count the processes: many dendrites and one axon make a multipolar neuron, one of each a bipolar neuron, and an axon alone a unipolar neuron. Then look at the axon: wrapped in myelin, as in spinal and cranial nerves, or not.',
    }),
    sl('check', 'Quick check: neuron types', {
      b: 'A neuron has one axon and one dendrite. What type is it?',
      n: 'Quick check. Count the processes leaving the cell body.',
      chk: 'bipolar-mcq',
    }),
    sl('diagram', 'The resting membrane', {
      b: 'Ion channels in the axonal membrane are selectively permeable. At rest the membrane is **more permeable to K⁺** and **nearly impermeable to Na⁺**, and impermeable to the negatively charged proteins of the axoplasm. The axoplasm has a **high K⁺** and **low Na⁺** concentration; the fluid outside has **low K⁺** and **high Na⁺**. The **sodium–potassium pump** transports **3 Na⁺ outwards for 2 K⁺ into the cell**. The outer surface is positive and the inner surface negative: the membrane is **polarised**, and the potential difference is the **resting potential**.',
      v: V.resting,
      n: 'At rest, the axon keeps sodium mostly outside and potassium mostly inside. The pump moves three sodium ions out for every two potassium ions it brings in, so the outside stays positive and the inside negative. This charge difference across the membrane is the resting potential.',
    }),
    sl('example', 'Worked example 1: counting the pump', {
      b: `A patch of axonal membrane completes ${WE1.cycles} cycles of the sodium–potassium pump. How many Na⁺ ions leave, how many K⁺ ions enter, and how many positive charges are moved out overall?`,
      ul: [
        r`Na⁺ out: $${PUMP.na} \times ${WE1.cycles} = ${WE1.naOut}$.`,
        r`K⁺ in: $${PUMP.k} \times ${WE1.cycles} = ${WE1.kIn}$.`,
        r`Net positive charges moved out: $${WE1.naOut} - ${WE1.kIn} = ${WE1.netOut}$, one per cycle.`,
        'The pump therefore helps keep the outside of the membrane positive with respect to the inside.',
      ],
      v: table(['Ion', 'Per cycle', `In ${WE1.cycles} cycles`], [['Na⁺ moved out', String(PUMP.na), String(WE1.naOut)], ['K⁺ moved in', String(PUMP.k), String(WE1.kIn)], ['Net charge moved out', '1', String(WE1.netOut)]], `Worked table: ${WE1.cycles} pump cycles move ${WE1.naOut} sodium out and ${WE1.kIn} potassium in`),
      n: 'Each cycle sends three sodium ions out and brings two potassium ions in. So two hundred cycles move six hundred sodium out and four hundred potassium in, a net loss of two hundred positive charges from the inside. That is why the pump helps keep the inside negative.',
    }),
    sl('diagram', 'The action potential', {
      b: `When a **stimulus** is applied at a site on the polarised membrane, the membrane there becomes **freely permeable to Na⁺**. A rapid **influx of Na⁺** reverses the polarity: the outer surface becomes negative and the inner surface positive, so the site is **depolarised**. The electrical potential difference across the membrane at that site is the **action potential**, which is in fact termed a **nerve impulse**. The rise in Na⁺ permeability is extremely short-lived; it is quickly followed by a rise in **K⁺ permeability**, K⁺ diffuses out, and the resting potential is restored (**repolarisation**). Typical values: about ${REST} mV at rest and about +${PEAK} mV at the peak.`,
      v: V.action,
      n: 'A stimulus opens the way for sodium ions to flood in, and for a moment the inside of the membrane becomes positive. Almost at once, potassium ions flow out and the membrane returns to its resting state, ready to respond to a further stimulation. The voltages shown are typical values, not exact figures for every neuron.',
    }),
    sl('check', 'Quick check: depolarisation', {
      b: 'A stimulus makes the membrane at one site freely permeable to which ion, causing depolarisation?',
      n: 'Quick check. Which ion is far more concentrated outside the axon?',
      chk: 'depol-mcq',
    }),
    sl('concept', 'Conduction along the axon', {
      b: 'At the depolarised site A, the inner surface is positive while the adjacent site B is still negative inside. **Current flows on the inner surface from A to B**, and on the outer surface from B to A, completing a circuit. Site B is then depolarised and an action potential is generated there, while site A repolarises. The sequence repeats along the length of the axon, so the **impulse is conducted**.',
      v: flow('LR', [['a', 'Site A depolarised'], ['c', 'Current flows from A to B'], ['b', 'Site B depolarised'], ['r', 'Site A repolarises'], ['n', 'Next site, and so on']], [['a', 'c'], ['c', 'b'], ['b', 'r'], ['r', 'n']], 'Flow of an impulse spreading from site A to site B along an axon'),
      n: 'Think of a line of falling dominoes that stand themselves back up. Each depolarised patch makes local currents flow to the patch next door, which then fires, while the first patch recovers. In this way the impulse travels along the whole axon.',
    }),
    sl('example', 'Worked example 2: how long does an impulse take?', {
      b: `An impulse travels ${WE2.d} m along a myelinated fibre at ${WE2.fast} m per second, and the same distance along a non-myelinated fibre at ${WE2.slow} m per second (typical illustrative speeds). Find each time in milliseconds and compare.`,
      ul: [
        r`Myelinated: $\dfrac{${WE2.d}}{${WE2.fast}} \times 1000 = ${WE2.tFast}$ ms.`,
        r`Non-myelinated: $\dfrac{${WE2.d}}{${WE2.slow}} \times 1000 = ${WE2.tSlow}$ ms.`,
        r`Ratio: $\dfrac{${WE2.tSlow}}{${WE2.tFast}} = ${WE2.ratio}$, so the myelinated fibre is ${WE2.ratio} times faster here.`,
        'Speeds vary widely with the fibre; myelinated fibres conduct much faster than non-myelinated fibres of similar size.',
      ],
      v: table(['Fibre', 'Speed (m per second)', 'Time (ms)'], [['Myelinated', String(WE2.fast), String(WE2.tFast)], ['Non-myelinated', String(WE2.slow), String(WE2.tSlow)]], `Worked table: ${WE2.tFast} milliseconds against ${WE2.tSlow} milliseconds`),
      n: 'Time is distance divided by speed. Point eight metres at fifty metres a second takes sixteen milliseconds, but at one metre a second it takes eight hundred milliseconds, fifty times as long. The speeds are only typical values chosen for the example.',
    }),
    sl('diagram', 'The synapse', {
      b: 'A nerve impulse is transmitted from one neuron to another through junctions called **synapses**. A synapse is formed by the membranes of a **pre-synaptic** neuron and a **post-synaptic** neuron, which may or may not be separated by a gap called the **synaptic cleft**. At a **chemical synapse**, an impulse arriving at the axon terminal stimulates the movement of the synaptic vesicles towards the membrane, where they fuse and release **neurotransmitters** into the cleft. These bind to specific **receptors** on the post-synaptic membrane, opening **ion channels**; the entry of ions can generate a **new potential**, which may be **excitatory or inhibitory**.',
      v: V.synapse,
      n: 'At a chemical synapse the message changes from electrical to chemical and back. The impulse releases neurotransmitter from vesicles, the molecules cross the fluid-filled cleft, bind to receptors and open ion channels, and a new potential may start in the next neuron.',
    }),
    sl('concept', 'Electrical and chemical synapses', {
      b: 'There are two types of synapses.',
      v: table(['Feature', 'Electrical synapse', 'Chemical synapse'], [['Membranes', 'Pre- and post-synaptic membranes in very close proximity', 'Separated by a fluid-filled synaptic cleft'], ['How the signal crosses', 'Electric current flows directly from one neuron into the other', 'Neurotransmitters released into the cleft bind to receptors'], ['Speed', 'Always faster; similar to conduction along a single axon', 'Slower'], ['In our system', 'Rare', 'Common']], 'Table comparing electrical and chemical synapses'),
      n: 'Electrical synapses pass current straight across from one neuron to the next, so they are very fast, but they are rare in our system. Most of our synapses are chemical, using neurotransmitters to carry the signal across the cleft.',
    }),
    sl('check', 'Quick check: synapses', {
      b: 'Judge the assertion and the reason about electrical synapses.',
      n: 'Quick check. How close are the two membranes at an electrical synapse?',
      chk: 'electrical-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'CNS: brain and spinal cord; PNS: afferent and efferent fibres; somatic and autonomic (sympathetic, parasympathetic); visceral nervous system.',
        'Neuron: cell body with Nissl’s granules, dendrites (towards), axon (away) ending in synaptic knobs; multipolar, bipolar, unipolar.',
        'Myelinated fibres (Schwann cells, nodes of Ranvier) in spinal and cranial nerves; non-myelinated in autonomous and somatic systems.',
        'Resting: more permeable to K⁺; pump 3 Na⁺ out for 2 K⁺ in; outside positive, inside negative (polarised).',
        'Stimulus: Na⁺ influx, depolarisation, action potential; K⁺ out, repolarisation; local currents conduct the impulse.',
        'Synapses: electrical (direct current, faster, rare) and chemical (neurotransmitter, receptors, ion channels; excitatory or inhibitory).',
      ],
      v: table(['State', 'Inside of membrane'], [['Resting (polarised)', 'Negative'], ['Depolarised (action potential)', 'Positive'], ['Repolarised', 'Negative again']], 'Summary table of membrane charge in three states'),
      n: 'To recap: neurons receive signals on dendrites and send them along axons. At rest the membrane is polarised. A stimulus lets sodium rush in, producing an action potential, and potassium flowing out restores the resting state. Impulses pass to the next cell across electrical or chemical synapses.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Draw and label a **myelinated neuron**: dendrites, cell body, Nissl’s granules, axon, myelin sheath, node of Ranvier, synaptic knob.',
        'State the **ion distribution** and the **3 : 2 pump** for the resting potential.',
        'Explain **depolarisation** (Na⁺ in) and **repolarisation** (K⁺ out) in order.',
        'Describe **chemical transmission** step by step: vesicles, cleft, receptors, ion channels.',
      ],
      n: 'Exam tips. Practise a labelled neuron. Learn which ion is high on each side and how the pump keeps it so. Explain depolarisation and repolarisation in the right order. And describe each step of transmission at a chemical synapse.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Neural Control and Coordination — Part 2: The brain and reflex action',
  goals: [
    'Describe how the brain is protected',
    'Describe the parts and functions of the forebrain, midbrain and hindbrain',
    'Explain reflex action and the reflex arc, using the knee jerk',
  ],
  slides: [
    sl('title', 'The central neural system', {
      b: 'Part 2 — the brain, the central information-processing organ, and the reflex arcs of the spinal cord.',
      v: flow('LR', [['f', 'Forebrain'], ['m', 'Midbrain'], ['h', 'Hindbrain'], ['s', 'Spinal cord and reflexes']], [['f', 'm'], ['m', 'h'], ['h', 's']], 'Flow from forebrain through midbrain and hindbrain to the spinal cord'),
      n: 'The brain is the central information processing organ of the body and acts as the command and control system. It controls voluntary movements, the balance of the body, the functioning of vital involuntary organs such as the lungs, heart and kidneys, thermoregulation, hunger and thirst, circadian rhythms, the activities of several endocrine glands, and human behaviour. It is also the site for processing of vision, hearing, speech, memory, intelligence, emotions and thoughts.',
    }),
    sl('concept', 'Protection of the brain', {
      b: 'The human brain is well protected by the **skull**. Inside the skull, the brain is covered by **cranial meninges**, three layers.',
      v: table(['Layer', 'Position and nature'], [['Dura mater', 'Outer layer'], ['Arachnoid', 'Very thin middle layer'], ['Pia mater', 'Inner layer, in contact with the brain tissue']], 'Table of the three cranial meninges from outside in'),
      n: 'Outside, the hard skull guards the brain. Underneath lie three membranes: the tough dura mater on the outside, the very thin arachnoid in the middle, and the pia mater, which clings to the surface of the brain itself.',
    }),
    sl('diagram', 'The brain in section', {
      b: 'The brain can be divided into three major parts: the **forebrain**, the **midbrain** and the **hindbrain**.',
      v: V.brain,
      n: 'Look first at the big cerebrum on top, joined across the middle by the corpus callosum. Deep inside sit the thalamus and, below it, the hypothalamus. The short midbrain links up to the pons, the cerebellum lies behind, and the medulla continues down into the spinal cord.',
    }),
    sl('concept', 'Forebrain: the cerebrum', {
      b: 'The forebrain consists of the **cerebrum**, **thalamus** and **hypothalamus**. A deep cleft divides the cerebrum longitudinally into **left and right cerebral hemispheres**, connected by a tract of nerve fibres, the **corpus callosum**.',
      v: table(['Part', 'Features'], [['Cerebral cortex', 'Layer of cells covering the hemispheres, thrown into prominent folds; called grey matter because neuron cell bodies are concentrated here'], ['Motor areas, sensory areas, association areas', 'The cortex contains motor and sensory areas, and large regions that are neither, the association areas, responsible for complex functions such as intersensory associations, memory and communication'], ['White matter', 'Fibres of the tracts, covered with a myelin sheath, form the inner part of the cerebral hemisphere and give it an opaque white appearance']], 'Table of the parts of the cerebrum'),
      n: 'The cerebrum forms the major part of the human brain. Its folded grey cortex holds the cell bodies of neurons, with motor, sensory and association areas. Beneath lies white matter, made of myelinated fibres, which links regions together.',
    }),
    sl('concept', 'Thalamus, hypothalamus and limbic system', {
      b: 'The cerebrum wraps around the thalamus, the hypothalamus and the inner parts of the cerebral hemispheres.',
      v: table(['Part', 'Role'], [['Thalamus', 'A major coordinating centre for sensory and motor signalling'], ['Hypothalamus', 'At the base of the thalamus; contains centres that control body temperature and the urge for eating and drinking; groups of neurosecretory cells secrete hypothalamic hormones'], ['Limbic system (amygdala, hippocampus and other inner parts)', 'Along with the hypothalamus, involved in the regulation of sexual behaviour, expression of emotional reactions such as excitement, pleasure, rage and fear, and motivation']], 'Table of the thalamus, hypothalamus and limbic system'),
      n: 'The thalamus is a relay and coordinating centre for sensory and motor signals. The hypothalamus, just below it, controls body temperature, hunger and thirst, and makes hormones. Inner parts of the hemispheres, such as the amygdala and hippocampus, form the limbic system, which with the hypothalamus shapes emotions, sexual behaviour and motivation.',
    }),
    sl('check', 'Quick check: hypothalamus', {
      b: 'Which part of the forebrain contains centres that control body temperature and the urge for eating and drinking?',
      n: 'Quick check. It lies at the base of the thalamus.',
      chk: 'hypothalamus-mcq',
    }),
    sl('example', 'Worked example 1: which region is affected?', {
      b: 'Use the functions of brain regions to work out the part most likely affected in each person.',
      ul: [
        'A person whose body temperature swings wildly and who never feels thirsty → **hypothalamus** (centres for body temperature, eating and drinking).',
        'A patient whose breathing and heart rate become irregular after an injury at the base of the brain → **medulla** (respiration and cardiovascular reflexes).',
        'A patient in whom signals cannot pass between the left and right cerebral hemispheres → **corpus callosum** (tract joining the hemispheres).',
        'A person showing unusual rage and fear after damage deep in the hemispheres → **limbic system** (amygdala, hippocampus).',
      ],
      v: table(['Sign', 'Region'], [['Temperature, thirst', 'Hypothalamus'], ['Breathing, heart rate', 'Medulla'], ['Hemispheres not communicating', 'Corpus callosum'], ['Emotional reactions', 'Limbic system']], 'Worked table matching four signs with the brain regions responsible'),
      n: 'Match each sign with a known function. Temperature and thirst point to the hypothalamus. Breathing and heart rhythm point to the medulla. Two hemispheres unable to share information point to the corpus callosum. And changes in emotional reactions point to the limbic system.',
    }),
    sl('concept', 'Midbrain and hindbrain', {
      b: 'The **midbrain** lies between the thalamus or hypothalamus of the forebrain and the pons of the hindbrain. A canal, the **cerebral aqueduct**, passes through it. Its dorsal portion has mainly four round swellings called the **corpora quadrigemina**. The **hindbrain** comprises the **pons**, **cerebellum** and **medulla** (medulla oblongata).',
      v: table(['Part', 'Features or role'], [['Pons', 'Fibre tracts that interconnect different regions of the brain'], ['Cerebellum', 'Very convoluted surface, giving additional space for many more neurons'], ['Medulla', 'Connected to the spinal cord; centres control respiration, cardiovascular reflexes and gastric secretions'], ['Brain stem', 'Midbrain, pons and medulla oblongata; connects the brain to the spinal cord']], 'Table of the parts of the hindbrain and the brain stem'),
      n: 'The midbrain carries the cerebral aqueduct and the four swellings of the corpora quadrigemina on its back. In the hindbrain, the pons links brain regions together, the much folded cerebellum packs in a great many neurons, and the medulla runs breathing, heart and gut reflexes. Midbrain, pons and medulla together make the brain stem.',
    }),
    sl('check', 'Quick check: brain stem', {
      b: 'Which three parts form the brain stem?',
      n: 'Quick check. The brain stem links the brain to the spinal cord.',
      chk: 'brainstem-mcq',
    }),
    sl('diagram', 'The reflex arc', {
      b: 'The entire process of response to a peripheral nervous stimulation that occurs **involuntarily**, without conscious effort or thought and requiring the involvement of a part of the central nervous system, is called a **reflex action**. The reflex pathway comprises at least one **afferent neuron** (receptor) and one **efferent** (effector or excitor) **neuron** appropriately arranged in a series.',
      v: V.reflex,
      n: 'In the knee jerk, a tap below the knee cap stretches the thigh muscle. The afferent neuron carries the signal through the dorsal nerve root into the spinal cord. There it passes directly to an efferent neuron, which carries the signal back to the muscle, and the leg kicks out.',
    }),
    sl('concept', 'Steps of a reflex action', {
      b: 'The afferent neuron receives the signal from a sensory organ and transmits the impulse via a **dorsal nerve root** into the CNS (at the level of the spinal cord). The efferent neuron then carries signals from the CNS to the **effector**. The stimulus and response thus form a **reflex arc**.',
      v: flow('LR', [['s', 'Stimulus'], ['r', 'Receptor'], ['a', 'Afferent neuron'], ['c', 'Spinal cord (grey matter)'], ['e', 'Efferent neuron'], ['f', 'Effector responds']], [['s', 'r'], ['r', 'a'], ['a', 'c'], ['c', 'e'], ['e', 'f']], 'Flow of a reflex arc from stimulus to effector'),
      n: 'Every reflex follows the same path: a stimulus, a receptor, an afferent neuron into the spinal cord, an efferent neuron out, and an effector that responds. Because the signal need not travel up to the cerebrum and back, the response is quick and automatic.',
    }),
    sl('example', 'Worked example 2: timing a knee jerk', {
      b: `In a knee jerk, the afferent and efferent neurons are each about ${KNEE.aff} m long and conduct at ${KNEE.v} m per second, and the single synapse in the spinal cord adds a delay of ${KNEE.delay} ms (typical illustrative values). Estimate the reflex time.`,
      ul: [
        r`Afferent: $\dfrac{${KNEE.aff}}{${KNEE.v}} \times 1000 = ${KNEE.tAff}$ ms.`,
        r`Efferent: $\dfrac{${KNEE.eff}}{${KNEE.v}} \times 1000 = ${KNEE.tEff}$ ms.`,
        r`Total: $${KNEE.tAff} + ${KNEE.tEff} + ${KNEE.delay} = ${KNEE.total}$ ms.`,
        'Only one synapse is crossed, so the reflex is very quick.',
      ],
      v: table(['Stage', 'Time (ms)'], [['Afferent conduction', String(KNEE.tAff)], ['Synaptic delay', String(KNEE.delay)], ['Efferent conduction', String(KNEE.tEff)], ['Total', String(KNEE.total)]], `Worked table: the knee jerk takes about ${KNEE.total} milliseconds`),
      n: 'Each neuron carries the signal nought point nine metres at ninety metres a second, which takes ten milliseconds. Add the half millisecond delay at the synapse and the total is about twenty and a half milliseconds, far quicker than a response that has to be thought about.',
    }),
    sl('check', 'Quick check: reflexes', {
      b: 'Judge the assertion and the reason about reflex actions.',
      n: 'Quick check. Does a reflex need conscious thought?',
      chk: 'reflex-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Protection: skull and cranial meninges (dura mater, arachnoid, pia mater).',
        'Forebrain: cerebrum (hemispheres, corpus callosum, cortex as grey matter with motor, sensory and association areas, white matter), thalamus, hypothalamus, limbic system (amygdala, hippocampus).',
        'Midbrain: cerebral aqueduct, corpora quadrigemina. Hindbrain: pons, cerebellum, medulla. Brain stem: midbrain, pons, medulla.',
        'Reflex action: involuntary response; reflex arc of receptor, afferent neuron (dorsal root), CNS, efferent neuron, effector; knee jerk.',
      ],
      v: table(['Region', 'Key role'], [['Hypothalamus', 'Temperature, eating, drinking; hormones'], ['Thalamus', 'Sensory and motor coordination'], ['Medulla', 'Respiration, cardiovascular reflexes, gastric secretions'], ['Corpus callosum', 'Joins the two hemispheres']], 'Summary table of key brain regions and roles'),
      n: 'To recap: the brain is guarded by the skull and three meninges. The forebrain thinks, senses and controls drives; the midbrain and hindbrain relay signals and run vital reflexes. And reflex arcs through the spinal cord give fast, automatic responses such as the knee jerk.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Draw a **sagittal section of the brain** and label at least eight parts.',
        'Give **one function** for each of the thalamus, hypothalamus, medulla and corpus callosum.',
        'Name the **three meninges** in order from outside.',
        'Draw a **reflex arc** with arrows showing the direction of the impulse.',
      ],
      n: 'Exam tips. Practise a labelled section of the brain. Learn one clear function for each major part. Remember the order of the meninges. And draw the reflex arc with arrows from receptor to effector.',
    }),
  ],
});
