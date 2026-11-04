// ISC 11 Biology ch20 Neural Control and Coordination. Part 1: neurons, nervous system, brain, spinal cord (t01 to t03). Part 2: nerve impulse and synapse (t04).
import { sl, deck, table, flow, svgV, r } from '../../isc-11-biology-ch01/src/lib.mjs';
import { NEURON, NEURON_TYPES, BRAIN, SPINAL_CORD, ACTION, SYNAPSE, CONDUCTION } from './svgs.mjs';
import { CRANIAL_PAIRS, SPINAL, SPINAL_PAIRS, NERVE_PAIRS, NERVES, REFLEX, REFLEX_AFF, REFLEX_TOTAL, RESTING, THRESHOLD, PEAK, UNDERSHOOT, AMPLITUDE, TO_THRESHOLD, PUMP, pump, V_MYELINATED, V_NONMYELINATED, LEN, T_MYELINATED, T_NONMYELINATED, FOLD, NODES, INTERNODE_MM, REFRACTORY_MS, maxRate, CYCLES } from './calc.mjs';

export const V = {
  neuron: svgV(NEURON, 'A myelinated multipolar neuron with dendrites, cell body, axon, myelin sheath, nodes of Ranvier and axon terminals'),
  types: svgV(NEURON_TYPES, 'Unipolar, bipolar, pseudounipolar and multipolar neurons'),
  brain: svgV(BRAIN, 'Vertical section of the human brain with forebrain, midbrain and hindbrain parts labelled'),
  cord: svgV(SPINAL_CORD, 'Transverse section of the spinal cord with grey and white matter, roots and ganglion'),
  action: svgV(ACTION, 'Model action potential from resting potential to peak and back'),
  conduction: svgV(CONDUCTION, 'Continuous conduction in a non-myelinated fibre and saltatory conduction in a myelinated fibre'),
  synapse: svgV(SYNAPSE, 'A chemical synapse with vesicles, cleft and receptors'),
};

const f = (x) => String(x);
const P = pump(CYCLES);
const sp = Object.values(SPINAL).join(' + ');

export const deck1 = deck({
  part: 1,
  title: 'Neural Control and Coordination, Part 1: Neurons, nervous system, brain and spinal cord',
  goals: [
    'Draw and label a myelinated neuron and distinguish unipolar, bipolar, pseudounipolar and multipolar neurons',
    'Outline the central, peripheral and visceral (autonomic) nervous systems',
    'Relate the parts of the brain and the spinal cord to their functions, and draw a T.S. of the spinal cord',
  ],
  slides: [
    sl('title', 'The nervous system', {
      b: 'Part 1: the cells, the divisions, the brain and the spinal cord.',
      v: flow('LR', [['s', 'Stimulus'], ['r', 'Receptor'], ['c', 'Central nervous system'], ['e', 'Effector']], [['s', 'r'], ['r', 'c'], ['c', 'e']], 'Pathway from stimulus to receptor, central nervous system and effector'),
      n: 'Every response of the body, from a blink to solving a problem, begins with a stimulus that a receptor detects. The message travels along nerves to the central nervous system, which decides and sends orders to muscles and glands.',
    }),
    sl('diagram', 'Structure of a neuron', {
      b: 'A **neuron** has a **cell body (cyton)** with a nucleus and **Nissl granules**, branched **dendrites** that receive impulses, and one **axon** that carries impulses away. The axon is wrapped by **myelin** (from Schwann cells) with gaps called **nodes of Ranvier**, and ends in **axon terminals**.',
      v: V.neuron,
      n: 'Dendrites bring impulses toward the cell body, and the axon carries them away. The fatty myelin sheath insulates the axon, and the gaps between its segments are the nodes of Ranvier. The tip of each branch of the axon ends in a small swelling that meets the next cell.',
    }),
    sl('concept', 'Neurons and nerves', {
      b: 'A **nerve** is a bundle of axons wrapped in connective tissue. Nerves can be sensory, motor or mixed.',
      v: table(['Kind', 'Carries impulses', 'Example'], [['Sensory (afferent)', 'From receptors to the central nervous system', 'Optic nerve, dorsal root fibres'], ['Motor (efferent)', 'From the central nervous system to muscles and glands', 'Ventral root fibres'], ['Mixed', 'Both directions', 'Spinal nerves']], 'Table of sensory, motor and mixed nerves'),
      n: 'Sensory nerves carry information in, motor nerves carry commands out, and mixed nerves contain both kinds of fibre. All the spinal nerves are mixed.',
    }),
    sl('diagram', 'Types of neurons', {
      b: 'Neurons are classified by the number of processes that leave the cell body.',
      v: V.types,
      n: 'A unipolar neuron has one process. A bipolar neuron has one axon and one dendrite. A pseudounipolar neuron has one process that splits into two just outside the cell body. A multipolar neuron has one axon and many dendrites.',
    }),
    sl('check', 'Quick check: neuron type', {
      b: 'Identify the neuron from the description of its processes.',
      n: 'Quick check. Count the processes at the cell body.',
      chk: 'pseudo-mcq',
    }),
    sl('concept', 'Divisions of the nervous system', {
      b: 'The **central nervous system (CNS)** is the brain and spinal cord. The **peripheral nervous system (PNS)** is all the nerves outside, divided into **somatic** (to skeletal muscles) and **visceral or autonomic** (to internal organs).',
      v: flow('TB', [['n', 'Nervous system'], ['c', 'CNS: brain and spinal cord'], ['p', 'PNS: cranial and spinal nerves'], ['s', 'Somatic: skeletal muscles'], ['a', 'Autonomic: sympathetic and parasympathetic']], [['n', 'c'], ['n', 'p'], ['p', 's'], ['p', 'a']], 'Tree of the divisions of the human nervous system'),
      n: 'The brain and spinal cord form the central system. All nerves outside it are the peripheral system. Its somatic part controls voluntary muscles, and its autonomic part controls the heart, glands and smooth muscles without our will.',
    }),
    sl('concept', 'The autonomic nervous system', {
      b: 'The visceral nervous system has two parts that act in opposite ways on most organs.',
      v: table(['Organ', 'Sympathetic (emergency)', 'Parasympathetic (rest)'], [['Pupil', 'Dilates', 'Constricts'], ['Heart rate', 'Increases', 'Decreases'], ['Digestion', 'Slowed', 'Stimulated'], ['Air passages', 'Widen', 'Narrow'], ['Urinary bladder', 'Relaxes', 'Contracts']], 'Table comparing sympathetic and parasympathetic effects'),
      n: 'The sympathetic part prepares the body for fight or flight, so the pupils widen and the heart races. The parasympathetic part restores calm, slows the heart and promotes digestion.',
    }),
    sl('example', 'Worked example 1: counting the nerves', {
      b: `A human has ${CRANIAL_PAIRS} pairs of cranial nerves and spinal nerves grouped as cervical, thoracic, lumbar, sacral and coccygeal. Find the pairs of spinal nerves, the pairs of nerves in all, and the number of single nerves.`,
      ul: [
        r`Spinal pairs $= ${sp} = ${SPINAL_PAIRS}$.`,
        r`All pairs $= ${CRANIAL_PAIRS} + ${SPINAL_PAIRS} = ${NERVE_PAIRS}$.`,
        r`Single nerves $= 2 \times ${NERVE_PAIRS} = ${NERVES}$.`,
      ],
      v: table(['Group', 'Pairs'], [['Cranial', f(CRANIAL_PAIRS)], ['Cervical', f(SPINAL.cervical)], ['Thoracic', f(SPINAL.thoracic)], ['Lumbar', f(SPINAL.lumbar)], ['Sacral', f(SPINAL.sacral)], ['Coccygeal', f(SPINAL.coccygeal)], ['Total pairs', f(NERVE_PAIRS)]], `Worked table: ${NERVE_PAIRS} pairs of nerves`),
      n: 'Add the five groups of spinal nerves first, then add the cranial pairs. Every pair has one nerve on each side, so double the total for the number of single nerves.',
    }),
    sl('check', 'Quick check: spinal nerves', {
      b: 'Count the pairs of nerves in a part of the nervous system.',
      n: 'Quick check. Use the same groups as in the example.',
      chk: 'pairs-num',
    }),
    sl('diagram', 'The human brain', {
      b: 'The brain is protected by the skull and three **meninges** (dura mater, arachnoid and pia mater) with cerebrospinal fluid. It has a **forebrain** (cerebrum, thalamus, hypothalamus), a **midbrain** and a **hindbrain** (pons, medulla oblongata, cerebellum).',
      v: V.brain,
      n: 'The large cerebrum fills most of the skull. Below it lie the thalamus and hypothalamus, then the midbrain, the pons and the medulla. The cerebellum sits behind the brain stem.',
    }),
    sl('concept', 'Parts of the brain and their functions', {
      b: 'Each part has its own job, but they work together.',
      v: table(['Part', 'Function'], [['Cerebrum', 'Thinking, memory, voluntary movement, speech, sensation, vision, hearing'], ['Corpus callosum', 'Joins the two cerebral hemispheres'], ['Thalamus', 'Relay station for sensory and motor signals'], ['Hypothalamus', 'Body temperature, hunger, thirst, emotions; controls the pituitary'], ['Midbrain', 'Reflexes of sight and hearing (corpora quadrigemina)'], ['Cerebellum', 'Balance, posture and smooth, coordinated movement'], ['Pons', 'Links parts of the brain; helps control breathing'], ['Medulla oblongata', 'Centres for heartbeat, breathing and blood pressure; swallowing, coughing, vomiting']], 'Table of brain parts and functions'),
      n: 'The cerebrum is the seat of intelligence and voluntary action. The cerebellum keeps balance. The medulla controls the vital automatic functions of heartbeat and breathing, so damage to it is very serious.',
    }),
    sl('check', 'Quick check: brain', {
      b: 'Match a loss of function to the part of the brain.',
      n: 'Quick check. Which part keeps the body balanced?',
      chk: 'cerebellum-mcq',
    }),
    sl('diagram', 'T.S. of the spinal cord', {
      b: 'In T.S. the **grey matter** (cell bodies) is butterfly-shaped with **dorsal and ventral horns** around the **central canal**, and the **white matter** (myelinated fibres) lies outside. The **dorsal root** (sensory, with a **ganglion**) and the **ventral root** (motor) join to form a **spinal nerve**.',
      v: V.cord,
      n: 'Sensory fibres enter at the back of the cord through the dorsal root, and their cell bodies lie in the swelling called the ganglion. Motor fibres leave at the front through the ventral root. The two roots join to make one spinal nerve.',
    }),
    sl('concept', 'The reflex arc', {
      b: 'A **reflex** is a rapid, automatic response to a stimulus, controlled by the spinal cord without waiting for the brain.',
      v: flow('LR', [['a', 'Receptor in skin'], ['b', 'Sensory neuron: dorsal root'], ['c', 'Relay neuron in grey matter'], ['d', 'Motor neuron: ventral root'], ['e', 'Effector muscle']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Reflex arc from receptor to sensory neuron, relay neuron, motor neuron and effector'),
      n: 'In a withdrawal reflex, a sensory neuron carries the message to the spinal cord, a relay neuron passes it on, and a motor neuron makes the muscle contract. The brain is told afterwards.',
    }),
    sl('example', 'Worked example 2: time taken by a reflex', {
      b: `A person steps on a thorn. The sensory and motor fibres are each ${REFLEX.len} m long and conduct at ${REFLEX.v} m per second; there are ${REFLEX.synapses} synapses, each causing a delay of ${REFLEX.delay} ms. Find the time for the reflex arc.`,
      ul: [
        r`Each fibre: $\dfrac{${REFLEX.len}}{${REFLEX.v}} = ${REFLEX_AFF / 1000}$ s $= ${REFLEX_AFF}$ ms.`,
        r`Synaptic delays $= ${REFLEX.synapses} \times ${REFLEX.delay} = ${REFLEX.synapses * REFLEX.delay}$ ms.`,
        r`Total $= ${REFLEX_AFF} + ${REFLEX_AFF} + ${REFLEX.synapses * REFLEX.delay} = ${REFLEX_TOTAL}$ ms.`,
      ],
      v: table(['Stage', 'Time (ms)'], [['Sensory fibre', f(REFLEX_AFF)], ['Two synapses', f(REFLEX.synapses * REFLEX.delay)], ['Motor fibre', f(REFLEX_AFF)], ['Whole arc', f(REFLEX_TOTAL)]], `Worked table: ${REFLEX_TOTAL} milliseconds`),
      n: 'Divide the length of each fibre by its speed, double it for the sensory and motor sides, and add the small delay at each synapse. The whole reflex takes only about three hundredths of a second.',
    }),
    sl('check', 'Quick check: reflex arc', {
      b: 'Work out the conduction time in one fibre of the arc.',
      n: 'Quick check. Divide distance by speed.',
      chk: 'reflex-num',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Neuron: dendrites, cell body with nucleus and Nissl granules, axon with myelin and nodes of Ranvier, axon terminals.',
        'Types: unipolar, bipolar, pseudounipolar, multipolar.',
        `Nervous system: CNS (brain, spinal cord); PNS (${CRANIAL_PAIRS} cranial, ${SPINAL_PAIRS} spinal pairs); somatic and autonomic (sympathetic, parasympathetic).`,
        'Brain: cerebrum, thalamus, hypothalamus; midbrain; pons, cerebellum, medulla oblongata.',
        'Spinal cord: grey and white matter, dorsal and ventral roots; reflex arc.',
      ],
      v: table(['Region', 'Key function'], [['Cerebellum', 'Balance'], ['Hypothalamus', 'Temperature, hunger, thirst'], ['Medulla', 'Heartbeat, breathing'], ['Spinal cord', 'Reflexes and conduction']], 'Summary table of brain and cord functions'),
      n: 'To recap: neurons receive and send impulses, the central system integrates them, and the peripheral system carries them. Each part of the brain has a special role, and the spinal cord handles reflexes quickly without help from the brain.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Label a neuron: **dendrite, cell body, nucleus, axon, myelin sheath, node of Ranvier, axon terminal**.',
        'Give the **location** with each type of neuron.',
        'Draw a **T.S. of the spinal cord** with dorsal and ventral roots and the ganglion.',
        'Link every brain part to **one function**.',
      ],
      n: 'Exam tips. Label every part of the neuron. Give where each type of neuron is found. Practise the cross section of the spinal cord. And connect each part of the brain with one clear function.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Neural Control and Coordination, Part 2: Nerve impulse and synapse',
  goals: [
    'Explain resting and action potentials in terms of ion movements',
    'Explain why conduction is faster in myelinated fibres',
    'Describe chemical transmission at a synapse',
  ],
  slides: [
    sl('title', 'The nerve impulse', {
      b: 'Part 2: how a neuron fires and how it passes the message on.',
      v: flow('LR', [['r', 'Resting potential'], ['d', 'Depolarisation'], ['p', 'Repolarisation'], ['s', 'Synapse']], [['r', 'd'], ['d', 'p'], ['p', 's']], 'Resting potential, depolarisation, repolarisation and synapse'),
      n: 'A nerve impulse is a wave of electrical change along the membrane of a neuron. It depends on the movement of sodium and potassium ions across the membrane.',
    }),
    sl('concept', 'Resting potential', {
      b: `A resting axon is **polarised**: the inside is negative and the outside positive, about **${RESTING} mV**. Potassium ions leak out more easily than sodium ions leak in, and the **sodium-potassium pump** moves **${PUMP.na} sodium ions out for every ${PUMP.k} potassium ions in**.`,
      v: table(['Ion', 'Higher concentration', 'Membrane at rest'], [['Sodium', 'Outside', 'Little leaks in'], ['Potassium', 'Inside', 'Leaks out more easily'], ['Large negative ions', 'Inside', 'Cannot leave']], 'Table of ion distribution across the resting membrane'),
      n: 'At rest, sodium is mostly outside and potassium inside. Potassium leaks out more freely than sodium leaks in, and the pump moves three sodium ions out for every two potassium ions in. So the inside becomes negative.',
    }),
    sl('diagram', 'The action potential', {
      b: `A stimulus that brings the membrane to the **threshold (${THRESHOLD} mV)** opens **sodium channels**: sodium floods in and the potential rises to about **+${PEAK} mV** (**depolarisation**). Then potassium channels open and potassium leaves, so the potential falls back (**repolarisation**).`,
      v: V.action,
      n: 'The curve shows the electrical event at one point on the axon. The membrane rises very quickly when sodium enters, then falls as potassium leaves, dips slightly below the resting level and returns to rest as the pump restores the ions.',
    }),
    sl('concept', 'Ion movements in each phase', {
      b: 'The action potential is **all or none**: once threshold is reached, it has the same size every time.',
      v: table(['Phase', 'Channels and ions', 'Inside of membrane'], [['Rest', 'Pump works; potassium leaks out', 'Negative'], ['Depolarisation', 'Sodium channels open; sodium rushes in', 'Becomes positive'], ['Repolarisation', 'Sodium channels close; potassium channels open; potassium leaves', 'Becomes negative again'], ['Recovery', 'Pump restores sodium outside and potassium inside', 'Back to resting level']], 'Table of ion movements in each phase of the action potential'),
      n: 'Sodium entry causes the rise, and potassium exit causes the fall. Afterwards the pump puts the ions back. Once the membrane has fired, it cannot fire again for a very short time, called the refractory period.',
    }),
    sl('example', 'Worked example 1: potentials and the pump', {
      b: `The resting potential is ${RESTING} mV, the threshold is ${THRESHOLD} mV and the peak is +${PEAK} mV. Find (i) the amplitude of the action potential, (ii) the depolarisation needed to reach threshold, and (iii) the ions moved by the pump in ${CYCLES} cycles.`,
      ul: [
        r`Amplitude $= ${PEAK} - (${RESTING}) = ${AMPLITUDE}$ mV.`,
        r`To threshold: $${THRESHOLD} - (${RESTING}) = ${TO_THRESHOLD}$ mV.`,
        r`In ${CYCLES} cycles: sodium out $= ${PUMP.na} \times ${CYCLES} = ${P.na}$; potassium in $= ${PUMP.k} \times ${CYCLES} = ${P.k}$; net positive charge out $= ${P.net}$.`,
      ],
      v: table(['Quantity', 'Value'], [['Amplitude (mV)', f(AMPLITUDE)], ['Depolarisation to threshold (mV)', f(TO_THRESHOLD)], [`Sodium out in ${CYCLES} cycles`, f(P.na)], [`Potassium in in ${CYCLES} cycles`, f(P.k)], ['Net positive charges out', f(P.net)]], `Worked table: amplitude ${AMPLITUDE} millivolts`),
      n: 'Subtract the resting value from the peak to get the full height of the impulse. The pump removes more positive charge than it brings in, which helps keep the inside of the cell negative.',
    }),
    sl('check', 'Quick check: pump', {
      b: 'Calculate the potassium taken in when a number of sodium ions are pumped out.',
      n: 'Quick check. Use the ratio of three to two.',
      chk: 'pump-num',
    }),
    sl('diagram', 'Conduction along a fibre', {
      b: 'In a **non-myelinated** fibre the impulse passes **continuously** along the membrane. In a **myelinated** fibre the myelin **insulates** the axon, so ions can cross only at the **nodes of Ranvier** and the impulse **jumps from node to node** (**saltatory conduction**).',
      v: V.conduction,
      n: 'In a bare fibre the impulse must excite every point of the membrane in turn, which is slow. Where there is myelin, the current flows through the axon to the next gap, so the impulse leaps from node to node and travels much faster.',
    }),
    sl('concept', 'Myelinated and non-myelinated fibres', {
      b: 'Myelination speeds up conduction and also saves energy.',
      v: table(['Feature', 'Non-myelinated', 'Myelinated'], [['Sheath', 'No myelin', 'Myelin from Schwann cells'], ['Ion exchange', 'At every point', 'Only at nodes of Ranvier'], ['Conduction', 'Continuous, slow', 'Saltatory, fast'], ['Energy used by the pump', 'More', 'Less'], ['Found in', 'Autonomic nerves, some sensory fibres', 'Spinal and cranial nerves, white matter']], 'Table comparing myelinated and non-myelinated fibres'),
      n: 'Because ions cross only at the nodes, a myelinated fibre needs far less pumping to restore the balance after each impulse. Thick myelinated fibres carry fast messages such as those to skeletal muscles.',
    }),
    sl('example', 'Worked example 2: speed of conduction', {
      b: `An axon ${LEN} m long conducts at ${V_MYELINATED} m per second if myelinated, or ${V_NONMYELINATED} m per second if not. Find the time in each case and how many times faster the myelinated fibre is. If a node occurs every ${INTERNODE_MM} mm, how many nodes does it have?`,
      ul: [
        r`Myelinated: $\dfrac{${LEN}}{${V_MYELINATED}} = ${T_MYELINATED / 1000}$ s $= ${T_MYELINATED}$ ms.`,
        r`Non-myelinated: $\dfrac{${LEN}}{${V_NONMYELINATED}} = ${T_NONMYELINATED / 1000}$ s $= ${T_NONMYELINATED}$ ms; ratio $= ${FOLD}$.`,
        r`Nodes $= \dfrac{${LEN} \times 1000}{${INTERNODE_MM}} = ${NODES}$.`,
      ],
      v: table(['Fibre', 'Time (ms)'], [['Myelinated', f(T_MYELINATED)], ['Non-myelinated', f(T_NONMYELINATED)], ['Ratio', f(FOLD)], ['Nodes of Ranvier', f(NODES)]], `Worked table: ${FOLD} times faster`),
      n: 'Divide the length by the speed for each fibre. In this model the myelinated fibre is one hundred times faster. Real speeds vary with fibre thickness, but myelinated fibres are always much faster.',
    }),
    sl('check', 'Quick check: myelin', {
      b: 'Explain a fall in conduction speed when myelin is lost.',
      n: 'Quick check. Where do ions cross a myelinated fibre?',
      chk: 'myelin-mcq',
    }),
    sl('diagram', 'The chemical synapse', {
      b: 'A **synapse** is the junction between two neurons. At a **chemical synapse** the **pre-synaptic** terminal releases a **neurotransmitter** into the **synaptic cleft**; it binds **receptors** on the **post-synaptic** membrane.',
      v: V.synapse,
      n: 'The axon terminal holds vesicles filled with transmitter. When an impulse arrives, calcium enters and the vesicles release their contents into the narrow gap. The transmitter binds receptors on the next cell and opens ion channels.',
    }),
    sl('concept', 'Steps of transmission', {
      b: 'Transmission at a chemical synapse takes place in one direction only.',
      v: flow('TB', [['a', 'Impulse reaches the axon terminal; calcium ions enter'], ['b', 'Vesicles fuse and release neurotransmitter (for example acetylcholine)'], ['c', 'Transmitter diffuses across the cleft and binds receptors'], ['d', 'Ion channels open: a new potential in the post-synaptic neuron'], ['e', 'Transmitter is broken down or taken back']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow of the steps of chemical transmission at a synapse'),
      n: 'The impulse triggers calcium entry, which releases the transmitter. The transmitter crosses the gap, opens channels in the next cell and starts a new potential. It is then broken down, for example by an enzyme, so the signal ends.',
    }),
    sl('concept', 'Kinds of synapse and post-synaptic potentials', {
      b: 'The new potential may excite or inhibit the next neuron.',
      v: table(['Feature', 'Electrical synapse', 'Chemical synapse'], [['Gap between membranes', 'Very narrow; gap junctions', 'Synaptic cleft'], ['Transmission', 'Direct flow of ions; very fast', 'By transmitter; slight delay'], ['Direction', 'Either way', 'One way only'], ['Occurrence in humans', 'Rare', 'Most synapses'], ['Post-synaptic potential', 'Excitatory', 'Excitatory or inhibitory']], 'Table comparing electrical and chemical synapses'),
      n: 'Electrical synapses let current pass directly and are very fast, but they are rare in humans. Most synapses are chemical, and the transmitter can either excite the next neuron or inhibit it.',
    }),
    sl('check', 'Quick check: synapse', {
      b: 'Predict what happens when transmitter release is blocked.',
      n: 'Quick check. What must cross the synaptic cleft?',
      chk: 'cleft-mcq',
    }),
    sl('check', 'Quick check: refractory period', {
      b: 'Find the highest firing rate allowed by a refractory period.',
      n: 'Quick check. Divide one thousand milliseconds by the refractory period.',
      chk: 'refrac-num',
    }),
    sl('summary', 'Summary', {
      ul: [
        `Resting potential about ${RESTING} mV: potassium leak and the sodium-potassium pump (${PUMP.na} sodium out, ${PUMP.k} potassium in).`,
        `Action potential: threshold ${THRESHOLD} mV, sodium in (depolarisation to +${PEAK} mV), potassium out (repolarisation); all or none.`,
        'Myelinated fibres: saltatory conduction at nodes of Ranvier; faster and cheaper.',
        'Chemical synapse: calcium, vesicles, transmitter, cleft, receptors; one-way.',
      ],
      v: table(['Phase', 'Main ion movement'], [['Depolarisation', 'Sodium in'], ['Repolarisation', 'Potassium out'], ['Recovery', 'Pump']], 'Summary table of the phases of the action potential'),
      n: 'To recap: the resting membrane is negative inside. A strong enough stimulus opens sodium channels, the inside becomes positive, and potassium then restores the balance. Myelin makes conduction faster, and chemical transmitters carry the message across synapses.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Name the **ion** that moves in each phase and its **direction**.',
        'State that conduction is faster in myelinated fibres because the impulse **jumps from node to node**.',
        'Give the steps at a synapse in **order**, with an example of a transmitter.',
        'Remember **one-way** transmission at chemical synapses.',
      ],
      n: 'Exam tips. For each phase of the action potential, name the ion and its direction. Explain fast conduction by saying the impulse jumps between nodes. Give the steps at a synapse in order. And note that chemical synapses work one way only.',
    }),
  ],
});
