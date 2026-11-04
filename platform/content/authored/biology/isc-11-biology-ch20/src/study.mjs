// ISC 11 Biology ch20 notes and flashcards.
import { T, table, unit, PROV } from '../../isc-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { CRANIAL_PAIRS, SPINAL, SPINAL_PAIRS, NERVE_PAIRS, RESTING, THRESHOLD, PEAK, UNDERSHOOT, AMPLITUDE, PUMP, V_MYELINATED, V_NONMYELINATED, REFLEX_TOTAL, REFRACTORY_MS, maxRate } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Neural Control and Coordination — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Neurons and nerves',
      `The **neuron** is the structural and functional unit of the nervous system.
- **Cell body (cyton or soma):** contains the **nucleus** and **Nissl granules** (rough endoplasmic reticulum with ribosomes, concerned with protein synthesis).
- **Dendrites:** short, branched processes that **receive** impulses and carry them **towards** the cell body.
- **Axon:** a long process that carries impulses **away** from the cell body. It begins at the **axon hillock**; its membrane is the axolemma and its cytoplasm the axoplasm. In a **myelinated fibre** the axon is wrapped in a **myelin sheath** (formed by **Schwann cells** in the peripheral nervous system), with gaps called **nodes of Ranvier**. The axon ends in branches that carry **axon terminals (synaptic knobs)** with synaptic vesicles.

**Types of neuron (by number of processes)**
| Type | Processes | Where found |
|---|---|---|
| Unipolar | One process from the cell body | Embryonic stage; some invertebrates |
| Bipolar | One axon and one dendrite, at opposite ends | Retina of the eye, lining of the nose, inner ear |
| Pseudounipolar | A single process that divides into two branches near the cell body | Dorsal root ganglia (sensory neurons) |
| Multipolar | One axon and several dendrites | Cerebral cortex, motor neurons of the spinal cord |

*Note on books:* some books group the pseudounipolar neuron with the unipolar type and then list unipolar neurons in the dorsal root ganglia; this chapter follows the four-type scheme of the syllabus.

**Nerves:** a **nerve** is a bundle of axons held together by connective tissue. **Sensory (afferent)** nerves carry impulses from receptors to the central nervous system, **motor (efferent)** nerves carry impulses from it to muscles and glands, and **mixed** nerves contain both.`,
      [kt('Neuron', 'Structural and functional unit of the nervous system.'), kt('Dendrite', 'Process that receives impulses and carries them to the cell body.'), kt('Axon', 'Process that carries impulses away from the cell body.'), kt('Node of Ranvier', 'Gap in the myelin sheath of an axon.'), kt('Nissl granules', 'Rough endoplasmic reticulum with ribosomes in the cell body.')],
      V.neuron,
      [1],
      [V.types],
    ),
    sec(
      '2. Divisions of the human nervous system',
      `- **Central nervous system (CNS):** the **brain** (in the cranial cavity) and the **spinal cord** (in the vertebral canal).
- **Peripheral nervous system (PNS):** all the **nerves** outside the CNS: **${CRANIAL_PAIRS} pairs of cranial nerves** from the brain and **${SPINAL_PAIRS} pairs of spinal nerves** from the cord (${Object.values(SPINAL).join(' + ')}: cervical, thoracic, lumbar, sacral, coccygeal), ${NERVE_PAIRS} pairs in all.
  - Functionally the PNS has an **afferent (sensory)** and an **efferent (motor)** division.
  - The efferent division is the **somatic nervous system** (to **skeletal muscles**, voluntary) and the **visceral or autonomic nervous system** (to **smooth muscle, cardiac muscle and glands**, involuntary).
- **Autonomic nervous system:** **sympathetic** (prepares the body for emergencies: increases heart rate, dilates pupils, widens air passages, slows digestion) and **parasympathetic** (restores and conserves: slows the heart, constricts pupils, stimulates digestion). Most organs receive both, and the two have opposite effects.`,
      [kt('CNS', 'Brain and spinal cord.'), kt('PNS', 'Cranial and spinal nerves outside the CNS.'), kt('Autonomic nervous system', 'Involuntary control of internal organs; sympathetic and parasympathetic parts.')],
      table(['Organ', 'Sympathetic', 'Parasympathetic'], [['Pupil', 'Dilates', 'Constricts'], ['Heart rate', 'Increases', 'Decreases'], ['Digestion', 'Slowed', 'Stimulated']], 'Table of autonomic effects'),
      [2],
    ),
    sec(
      '3a. The human brain',
      `The brain is protected by the **skull** and by three membranes, the **meninges**: the outer **dura mater**, the middle **arachnoid** and the inner **pia mater**, which is in contact with the brain. **Cerebrospinal fluid** lies in the space below the arachnoid and in the brain's ventricles.

**Forebrain**
- **Cerebrum:** the largest part, in two **hemispheres** joined by the **corpus callosum**. The outer **cortex** is **grey matter** (cell bodies) with the **frontal, parietal, temporal and occipital lobes**: thinking, memory, voluntary movement and speech (frontal), general sensation (parietal), hearing and memory (temporal), vision (occipital). The inner part is white matter.
- **Thalamus:** relay station for sensory and motor signals to and from the cortex.
- **Hypothalamus:** controls **body temperature, hunger, thirst**, emotions and the **pituitary** gland; it has neurosecretory cells. (The limbic system, with the amygdala and hippocampus, is concerned with emotion and memory.)

**Midbrain:** the **corpora quadrigemina** (four swellings) control reflex movements of the eyes and head in response to sight and sound.

**Hindbrain**
- **Cerebellum:** **balance, posture and coordination** of voluntary movement.
- **Pons:** fibre tracts linking parts of the brain; helps to regulate breathing.
- **Medulla oblongata:** centres for **heartbeat, breathing and blood pressure** and for reflexes such as swallowing, coughing, sneezing and vomiting; it continues as the spinal cord.

The midbrain, pons and medulla form the **brain stem**.`,
      [kt('Meninges', 'Three protective membranes: dura mater, arachnoid, pia mater.'), kt('Corpus callosum', 'Band of fibres joining the cerebral hemispheres.'), kt('Hypothalamus', 'Controls temperature, hunger, thirst and the pituitary.'), kt('Cerebellum', 'Balance, posture and coordination.'), kt('Medulla oblongata', 'Centres for heartbeat, breathing and blood pressure.')],
      V.brain,
      [3],
    ),
    sec(
      '3b. The spinal cord and the reflex arc',
      `The **spinal cord** lies in the vertebral canal and is protected by the meninges and cerebrospinal fluid. In **T.S.** the **grey matter**, rich in cell bodies, is **butterfly-shaped** with **dorsal (posterior) horns** and **ventral (anterior) horns** around the **central canal**; the **white matter** around it is made of **myelinated fibres** in tracts. The **dorsal root** carries **sensory** fibres into the cord and bears a **dorsal root ganglion** (cell bodies of the sensory neurons); the **ventral root** carries **motor** fibres out. The two roots join to form a mixed **spinal nerve**.

**Functions:** (i) the centre of **reflex actions**; (ii) **conduction** of impulses between the body and the brain.

**Reflex action:** a quick, automatic, involuntary response to a stimulus, carried out by the **reflex arc**: **receptor → sensory neuron → relay neuron (in the grey matter) → motor neuron → effector**. In a withdrawal reflex the brain is told only afterwards. For example, with fibres 0.9 m long at 60 m per s and two synapses of 0.5 ms each, the arc takes ${REFLEX_TOTAL} ms in the model used in this chapter.`,
      [kt('Dorsal root', 'Carries sensory fibres into the spinal cord; has a ganglion.'), kt('Ventral root', 'Carries motor fibres out of the spinal cord.'), kt('Reflex arc', 'Pathway of a reflex from receptor to effector.')],
      V.cord,
      [3],
    ),
    sec(
      '4. Generation and conduction of the nerve impulse; the synapse',
      `**Resting potential:** a neuron at rest is **polarised**: the **inside is negative** (about ${RESTING} mV) and the outside positive. The membrane is much more permeable to **potassium** than to **sodium**, so potassium leaks out; negatively charged proteins stay inside; and the **sodium-potassium pump** uses ATP to move **${PUMP.na} Na⁺ out and ${PUMP.k} K⁺ in** in each cycle.

**Action potential:** a stimulus that reaches the **threshold** (about ${THRESHOLD} mV) opens **voltage-gated sodium channels**. Sodium rushes in and the membrane **depolarises** to about **+${PEAK} mV** (the inside becomes positive). Sodium channels then close and **potassium channels open**, so potassium leaves and the membrane **repolarises**, often undershooting slightly (about ${UNDERSHOOT} mV, hyperpolarisation) before the pump restores the resting state. The action potential is **all or none**, and for a short time (the **refractory period**) the membrane cannot respond to a new stimulus; a refractory period of ${REFRACTORY_MS} ms limits the rate to ${maxRate(REFRACTORY_MS)} impulses per second.

**Conduction:** the depolarised region sets up **local currents** that depolarise the next region.
- **Non-myelinated fibre:** the impulse passes **continuously**, point by point: **slow**.
- **Myelinated fibre:** the myelin **insulates** the axon, so ions can cross only at the **nodes of Ranvier**; the impulse **jumps from node to node** (**saltatory conduction**), which is **much faster** (in this chapter, ${V_MYELINATED} m per s against ${V_NONMYELINATED} m per s) and uses less energy.

**Synaptic transmission:** the junction between two neurons is a **synapse**. In an **electrical synapse** the membranes are very close and current flows directly through gap junctions (very fast, either way, rare in humans). In a **chemical synapse** the **pre-synaptic** terminal, with **synaptic vesicles**, is separated from the **post-synaptic** membrane by the **synaptic cleft**. An impulse opens calcium channels; calcium entry makes the vesicles **fuse with the membrane and release the neurotransmitter** (for example **acetylcholine**); it diffuses across the cleft and binds **receptors**, opening ion channels and generating a **post-synaptic potential** (excitatory or inhibitory). The transmitter is then **broken down** (acetylcholine by acetylcholinesterase) or taken back. Transmission is **one-way**.

*Note on books:* the resting potential is quoted as −60 to −90 mV and conduction speeds vary widely; ${RESTING} mV, +${PEAK} mV, ${V_MYELINATED} and ${V_NONMYELINATED} m per s are the round values used for calculation in this chapter.`,
      [kt('Resting potential', 'Potential difference across an unstimulated membrane, negative inside.'), kt('Depolarisation', 'Rise of the membrane potential as sodium enters.'), kt('Repolarisation', 'Return towards the resting potential as potassium leaves.'), kt('Saltatory conduction', 'Jumping of the impulse from node to node in a myelinated fibre.'), kt('Neurotransmitter', 'Chemical released at a synapse; acetylcholine is an example.')],
      V.action,
      [4],
      [V.conduction, V.synapse],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying dendrites carry impulses away from the cell body (they carry them towards it).
- Placing the pseudounipolar neuron in the brain (it is in the dorsal root ganglion).
- Swapping the roots: the **dorsal** root is **sensory** with the ganglion; the **ventral** root is **motor**.
- Saying the impulse is conducted faster in myelinated fibres "because myelin is a good conductor" (it is an insulator; the impulse jumps between nodes).
- Reversing the ions: depolarisation is **sodium in**; repolarisation is **potassium out**.
- Saying the sodium-potassium pump moves 2 sodium out and 3 potassium in (it is 3 out, 2 in).
- Writing that the transmitter crosses the cleft in both directions (one way only).

**How marks are usually awarded**
- 1-mark subparts: a part of the neuron or brain, a type of neuron with location, the ion that moves, a give-a-reason.
- 2–3-mark questions: types of neurons; sympathetic and parasympathetic; functions of brain parts; resting and action potentials; saltatory conduction; synaptic transmission.
- 5-mark questions in parts: neuron with a labelled diagram; brain; T.S. of spinal cord with reflex arc; nerve impulse and synapse.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Direction of impulse in dendrite and axon?', 'Dendrite: towards the cell body. Axon: away from it.', 'fact', 1),
    fc(2, 'What are Nissl granules?', 'Rough endoplasmic reticulum with ribosomes in the cell body.', 'definition', 1),
    fc(3, 'What forms myelin in the PNS?', 'Schwann cells.', 'fact', 1),
    fc(4, 'What is a node of Ranvier?', 'Gap between two segments of myelin.', 'definition', 1),
    fc(5, 'Bipolar neurons: where?', 'Retina, lining of the nose, inner ear.', 'fact', 1),
    fc(6, 'Pseudounipolar neurons: where?', 'Dorsal root ganglia.', 'fact', 1),
    fc(7, 'Multipolar neurons: where?', 'Cerebral cortex and motor neurons.', 'fact', 1),
    fc(8, 'What is a mixed nerve?', 'A nerve with both sensory and motor fibres.', 'definition', 1),
    fc(9, 'What makes up the CNS?', 'Brain and spinal cord.', 'fact', 2),
    fc(10, 'Number of cranial and spinal nerve pairs?', `${CRANIAL_PAIRS} cranial; ${SPINAL_PAIRS} spinal.`, 'fact', 2),
    fc(11, 'Two divisions of the autonomic system?', 'Sympathetic and parasympathetic.', 'fact', 2),
    fc(12, 'Effect of the sympathetic system on pupil and heart?', 'Pupil dilates; heart rate increases.', 'concept', 2),
    fc(13, 'Which nerves supply skeletal muscles?', 'The somatic nervous system.', 'fact', 2),
    fc(14, 'Names of the meninges, outer to inner?', 'Dura mater, arachnoid, pia mater.', 'fact', 3),
    fc(15, 'What does the corpus callosum do?', 'Joins the two cerebral hemispheres.', 'fact', 3),
    fc(16, 'Function of the thalamus?', 'Relay of sensory and motor signals.', 'fact', 3),
    fc(17, 'Functions of the hypothalamus?', 'Temperature, hunger, thirst; controls the pituitary.', 'fact', 3),
    fc(18, 'Function of the cerebellum?', 'Balance, posture and coordination.', 'fact', 3),
    fc(19, 'What do the corpora quadrigemina do?', 'Reflexes of sight and sound (midbrain).', 'fact', 3),
    fc(20, 'Vital centres of the medulla?', 'Heartbeat, breathing, blood pressure.', 'fact', 3),
    fc(21, 'Which root carries sensory fibres?', 'Dorsal root, with the ganglion.', 'exam-tip', 3),
    fc(22, 'Order of a reflex arc?', 'Receptor, sensory neuron, relay neuron, motor neuron, effector.', 'exam-tip', 3),
    fc(23, 'Resting potential of a neuron?', `About ${RESTING} mV, inside negative.`, 'fact', 4),
    fc(24, 'What does the sodium-potassium pump do?', `Moves ${PUMP.na} sodium ions out and ${PUMP.k} potassium ions in.`, 'concept', 4),
    fc(25, 'What causes depolarisation?', 'Sodium channels open; sodium enters.', 'concept', 4),
    fc(26, 'What causes repolarisation?', 'Potassium channels open; potassium leaves.', 'concept', 4),
    fc(27, 'Why is conduction faster in myelinated fibres?', 'The impulse jumps from node to node.', 'concept', 4),
    fc(28, 'Name the steps at a chemical synapse.', 'Calcium entry, vesicle release, transmitter across the cleft, receptor binding, new potential.', 'exam-tip', 4),
    fc(29, 'One neurotransmitter?', 'Acetylcholine.', 'fact', 4),
    fc(30, 'Electrical or chemical synapses: which are common in humans?', 'Chemical synapses.', 'concept', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
