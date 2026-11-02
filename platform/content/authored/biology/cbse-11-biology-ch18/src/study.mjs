// ch18 notes and flashcards.
import { T, unit, PROV } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { REST, PEAK, PUMP, KNEE } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = [], formulas = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Neural Control and Coordination — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Neural system, neuron, nerve impulse and synapse',
      `**Coordination** is the process through which two or more organs interact and complement the functions of one another; during physical exercise, for example, the rise in energy demand is matched by increases in breathing, heart rate and blood flow. The **neural system** and the **endocrine system** jointly coordinate and integrate the activities of the organs; the neural system gives an organised network of point-to-point connections for quick coordination.

**Organisation.** The **central neural system (CNS)** includes the **brain and spinal cord** and is the site of information processing and control. The **peripheral neural system (PNS)** comprises all the nerves of the body associated with the CNS. Its nerve fibres are of two types: **afferent fibres** transmit impulses from tissues and organs to the CNS, and **efferent fibres** transmit regulatory impulses from the CNS to the peripheral tissues and organs. The PNS is divided into the **somatic neural system**, which relays impulses from the CNS to **skeletal muscles**, and the **autonomic neural system**, which transmits impulses from the CNS to the **involuntary organs and smooth muscles**; the autonomic system is further classified into the **sympathetic** and **parasympathetic** neural systems. The **visceral nervous system** is the part of the PNS comprising the whole complex of nerves, fibres, ganglia and plexuses by which impulses travel from the CNS to the viscera and from the viscera to the CNS.

**Neuron.** A neuron has a **cell body** (cytoplasm, organelles and **Nissl’s granules**), **dendrites** (short, repeatedly branched fibres, also with Nissl’s granules, carrying impulses **towards** the cell body) and an **axon** (a long fibre whose distal end is branched, each branch ending in a bulb-like **synaptic knob** with **synaptic vesicles** containing **neurotransmitters**; axons carry impulses **away** from the cell body to a synapse or a neuromuscular junction).
- **Multipolar** (one axon, two or more dendrites): cerebral cortex. **Bipolar** (one axon, one dendrite): retina of the eye. **Unipolar** (cell body with one axon only): usually found in the embryonic stage.
- **Myelinated** fibres are enveloped by **Schwann cells** forming a **myelin sheath** around the axon; the gaps between adjacent sheaths are the **nodes of Ranvier**; they occur in spinal and cranial nerves. **Unmyelinated** fibres are enclosed by a Schwann cell that does not form a myelin sheath; they are commonly found in the autonomous and the somatic neural systems.

**Resting potential.** Neurons are excitable cells because their membranes are polarised. Ion channels are selectively permeable. At rest the axonal membrane is **more permeable to K⁺**, **nearly impermeable to Na⁺**, and impermeable to the negatively charged proteins of the axoplasm. The axoplasm contains a **high K⁺**, negatively charged proteins and **low Na⁺**; the fluid outside has **low K⁺** and **high Na⁺**. These gradients are maintained by the **sodium–potassium pump**, which transports **${PUMP.na} Na⁺ outwards for ${PUMP.k} K⁺ into the cell**. The outer surface is therefore **positive** and the inner surface **negative**: the membrane is **polarised**, and the electrical potential difference across it is the **resting potential** (typically about ${REST} mV).

**Action potential and conduction.** When a stimulus is applied at a site (say A), the membrane there becomes **freely permeable to Na⁺**; a rapid **influx of Na⁺** reverses the polarity, making the outer surface negative and the inner surface positive (**depolarisation**). This potential difference is the **action potential**, also termed a **nerve impulse** (typically peaking at about +${PEAK} mV). At the adjacent site B the inner surface is still negative, so **current flows on the inner surface from A to B** and on the outer surface from B to A, completing a circuit; B is depolarised and an action potential is generated there. The sequence repeats along the axon, conducting the impulse. The rise in Na⁺ permeability is extremely short-lived; it is quickly followed by a rise in **K⁺ permeability**, K⁺ diffuses outside, and the resting potential is restored (**repolarisation**), so the fibre becomes ready to respond to further stimulation.

**Synapses.** A synapse is formed by the membranes of a **pre-synaptic** and a **post-synaptic** neuron, which may or may not be separated by a gap called the **synaptic cleft**.
- **Electrical synapses:** the membranes are in very close proximity; electric current flows directly from one neuron into the other; transmission is very similar to conduction along a single axon and is **always faster** than across a chemical synapse; they are **rare** in our system.
- **Chemical synapses:** the membranes are separated by a fluid-filled **synaptic cleft**. **Neurotransmitters** are involved. An impulse arriving at the axon terminal stimulates the synaptic vesicles to move to the plasma membrane, fuse with it and release neurotransmitters into the cleft. They bind to specific **receptors** on the post-synaptic membrane; the binding opens **ion channels**, allowing ions to enter, which can generate a **new potential** in the post-synaptic neuron. The new potential may be **excitatory or inhibitory**.`,
      [kt('Afferent fibre', 'A nerve fibre carrying impulses from tissues and organs to the CNS.'), kt('Nodes of Ranvier', 'Gaps between adjacent myelin sheaths on a myelinated axon.'), kt('Resting potential', 'The potential difference across the polarised axonal membrane at rest, outside positive and inside negative.'), kt('Action potential', 'The reversed potential difference at a depolarised site of the membrane; the nerve impulse.'), kt('Synaptic cleft', 'The fluid-filled gap between pre- and post-synaptic membranes at a chemical synapse.')],
      V.neuron,
      [1],
      [V.resting, V.action, V.synapse],
    ),
    sec(
      '2. Central neural system: the brain',
      `The **brain** is the central information-processing organ and the command and control system. It controls voluntary movements, the balance of the body, the functioning of vital involuntary organs (lungs, heart, kidneys), thermoregulation, hunger and thirst, circadian (24-hour) rhythms, the activities of several endocrine glands and human behaviour, and it is the site of processing of vision, hearing, speech, memory, intelligence, emotions and thoughts.

**Protection.** The brain is protected by the **skull**. Inside the skull it is covered by the **cranial meninges**: an outer **dura mater**, a very thin middle **arachnoid**, and an inner **pia mater** in contact with the brain tissue.

**Forebrain** — cerebrum, thalamus and hypothalamus.
- The **cerebrum** forms the major part of the brain. A deep cleft divides it longitudinally into **left and right cerebral hemispheres**, connected by a tract of nerve fibres, the **corpus callosum**. The layer of cells covering the hemispheres, the **cerebral cortex**, is thrown into prominent folds; it is called **grey matter** because neuron cell bodies are concentrated there. The cortex contains **motor areas**, **sensory areas** and large regions that are neither, the **association areas**, responsible for complex functions such as intersensory associations, memory and communication. Fibres of the tracts, covered with a myelin sheath, form the inner part of the hemisphere and give it an opaque white appearance (**white matter**).
- The cerebrum wraps around the **thalamus**, a major coordinating centre for sensory and motor signalling.
- The **hypothalamus**, at the base of the thalamus, contains centres that control **body temperature** and the **urge for eating and drinking**; it also contains groups of neurosecretory cells that secrete **hypothalamic hormones**.
- The inner parts of the cerebral hemispheres and a group of associated deep structures such as the **amygdala** and **hippocampus** form the **limbic system** (limbic lobe), which, along with the hypothalamus, is involved in the regulation of sexual behaviour, the expression of emotional reactions (excitement, pleasure, rage, fear) and motivation.

**Midbrain** — between the thalamus or hypothalamus of the forebrain and the pons of the hindbrain. A canal, the **cerebral aqueduct**, passes through it. Its dorsal portion consists mainly of four round swellings (lobes) called the **corpora quadrigemina**.

**Hindbrain** — **pons**, **cerebellum** and **medulla** (medulla oblongata).
- The **pons** consists of fibre tracts that interconnect different regions of the brain.
- The **cerebellum** has a very convoluted surface, providing additional space for many more neurons.
- The **medulla** is connected to the spinal cord and contains centres that control **respiration**, **cardiovascular reflexes** and **gastric secretions**.

The **midbrain, pons and medulla oblongata** form the **brain stem**, which forms the connection between the brain and the spinal cord.`,
      [kt('Cranial meninges', 'The three coverings of the brain: dura mater, arachnoid and pia mater.'), kt('Corpus callosum', 'The tract of nerve fibres connecting the left and right cerebral hemispheres.'), kt('Hypothalamus', 'Region at the base of the thalamus controlling body temperature, eating and drinking, and secreting hypothalamic hormones.'), kt('Limbic system', 'Inner parts of the hemispheres with the amygdala and hippocampus; with the hypothalamus, regulates emotions, sexual behaviour and motivation.'), kt('Brain stem', 'Midbrain, pons and medulla oblongata; connects the brain and the spinal cord.')],
      V.brain,
      [2],
    ),
    sec(
      '3. Reflex action and reflex arc',
      `The entire process of response to a peripheral nervous stimulation that occurs **involuntarily**, i.e., without conscious effort or thought and requiring the involvement of a part of the central nervous system, is called a **reflex action**. The reflex pathway comprises **at least one afferent neuron** (receptor) and **one efferent** (effector or excitor) neuron appropriately arranged in a series.

The **afferent neuron** receives the signal from a sensory organ and transmits the impulse via a **dorsal nerve root** into the CNS (at the level of the spinal cord). The **efferent neuron** then carries signals from the CNS to the **effector**. The stimulus and response thus form a **reflex arc**, as in the **knee jerk reflex**: a tap below the knee cap stretches the thigh muscle; the afferent neuron carries the impulse into the grey matter of the spinal cord, where it passes across a synapse to an efferent neuron, which carries it back to the thigh muscle; the muscle contracts and the leg kicks forward.

Because the impulse need not travel to the brain and back, reflexes are fast and automatic. (With typical illustrative values, two neurons of about ${KNEE.aff} m conducting at ${KNEE.v} m per second and one synapse delay of ${KNEE.delay} ms give a knee-jerk time of about ${KNEE.total} ms.)`,
      [kt('Reflex action', 'An involuntary response to a peripheral stimulus, without conscious effort, involving part of the CNS.'), kt('Reflex arc', 'The pathway of a reflex: receptor, afferent neuron, CNS, efferent neuron and effector.'), kt('Dorsal nerve root', 'The root through which the afferent neuron carries the impulse into the spinal cord.')],
      V.reflex,
      [3],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying dendrites carry impulses away from the cell body (they carry them towards it; the axon carries them away).
- Reversing the charges: at rest the outside is positive and the inside negative.
- Writing that the pump moves 2 Na⁺ out and 3 K⁺ in (it is 3 Na⁺ out, 2 K⁺ in).
- Saying depolarisation is caused by K⁺ entering (Na⁺ rushes in; K⁺ moves out during repolarisation).
- Calling the cerebral cortex white matter (it is grey matter; the myelinated fibres inside form white matter).
- Putting the pons or medulla in the forebrain, or leaving the midbrain out of the brain stem.
- Saying the brain controls a reflex action consciously.

**How marks are usually awarded**
- 1-mark items: name a part of a neuron, a meninx, a brain region or the ion involved in a phase.
- 2–3-mark answers: types of neurons; myelinated and non-myelinated fibres; resting potential; chemical synapse; functions of forebrain parts; reflex arc.
- 5-mark answers: generation and conduction of a nerve impulse; structure and functions of the brain; reflex action with a labelled arc.
- Case-based items: axon recordings, a toxin at a synapse, a head injury, or a knee-jerk test, with a 2-mark part with an internal choice.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What does the CNS include?', 'Brain and spinal cord.', 'fact', 1),
    fc(2, 'Afferent vs efferent fibres?', 'Afferent: tissues to CNS. Efferent: CNS to tissues and organs.', 'concept', 1),
    fc(3, 'Somatic vs autonomic neural system?', 'Somatic: CNS to skeletal muscles. Autonomic: CNS to involuntary organs and smooth muscles.', 'concept', 1),
    fc(4, 'Two divisions of the autonomic system?', 'Sympathetic and parasympathetic.', 'fact', 1),
    fc(5, 'Visceral nervous system?', 'Part of the PNS: nerves, fibres, ganglia and plexuses linking the CNS and the viscera.', 'definition', 1),
    fc(6, 'Where are Nissl’s granules?', 'Cell body and dendrites.', 'fact', 1),
    fc(7, 'Synaptic knob contains?', 'Synaptic vesicles with neurotransmitters.', 'fact', 1),
    fc(8, 'Multipolar, bipolar, unipolar: where?', 'Cerebral cortex; retina of the eye; embryonic stage.', 'fact', 1),
    fc(9, 'Who forms the myelin sheath?', 'Schwann cells; gaps are nodes of Ranvier.', 'fact', 1),
    fc(10, 'Where are myelinated fibres found?', 'Spinal and cranial nerves.', 'fact', 1),
    fc(11, 'Permeability at rest?', 'More permeable to K⁺, nearly impermeable to Na⁺.', 'concept', 1),
    fc(12, 'Sodium–potassium pump ratio?', '3 Na⁺ out for 2 K⁺ in.', 'fact', 1),
    fc(13, 'Charge at rest?', 'Outside positive, inside negative: polarised.', 'concept', 1),
    fc(14, 'Cause of depolarisation?', 'Rapid influx of Na⁺ after the membrane becomes freely permeable to Na⁺.', 'concept', 1),
    fc(15, 'Cause of repolarisation?', 'Rise in K⁺ permeability; K⁺ diffuses out.', 'concept', 1),
    fc(16, 'How is the impulse conducted from A to B?', 'Current flows on the inner surface from A to B and on the outer from B to A; B depolarises.', 'concept', 1),
    fc(17, 'Electrical vs chemical synapse?', 'Electrical: direct current, faster, rare. Chemical: neurotransmitter across a cleft.', 'concept', 1),
    fc(18, 'What do neurotransmitters bind to?', 'Specific receptors on the post-synaptic membrane, opening ion channels.', 'fact', 1),
    fc(19, 'Cranial meninges, outside in?', 'Dura mater, arachnoid, pia mater.', 'fact', 2),
    fc(20, 'What joins the cerebral hemispheres?', 'Corpus callosum.', 'fact', 2),
    fc(21, 'Why is the cortex grey matter?', 'Neuron cell bodies are concentrated there.', 'concept', 2),
    fc(22, 'Association areas do what?', 'Complex functions such as intersensory associations, memory and communication.', 'fact', 2),
    fc(23, 'Thalamus?', 'Major coordinating centre for sensory and motor signalling.', 'fact', 2),
    fc(24, 'Hypothalamus?', 'Controls body temperature, eating and drinking; secretes hypothalamic hormones.', 'fact', 2),
    fc(25, 'Limbic system?', 'Amygdala, hippocampus and inner parts; with hypothalamus regulates sexual behaviour, emotions, motivation.', 'concept', 2),
    fc(26, 'Corpora quadrigemina?', 'Four round swellings on the dorsal midbrain.', 'definition', 2),
    fc(27, 'Medulla controls?', 'Respiration, cardiovascular reflexes, gastric secretions.', 'fact', 2),
    fc(28, 'Brain stem?', 'Midbrain, pons and medulla oblongata.', 'fact', 2),
    fc(29, 'Reflex action?', 'Involuntary response to a peripheral stimulus, without conscious effort, involving part of the CNS.', 'definition', 3),
    fc(30, 'Path of a reflex arc?', 'Receptor → afferent neuron (dorsal root) → spinal cord → efferent neuron → effector.', 'concept', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
