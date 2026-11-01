// ICSE 10 Biology ch10 notes and flashcards.
import { T, table, unit, PROV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Nervous System — Notes',
  language: 'en',
  sections: [
    sec(
      '1. The neuron and the divisions of the nervous system',
      `**Neuron (nerve cell):** the structural and functional unit of the nervous system.
- **Dendrites:** short branches that **receive** impulses and carry them **towards** the cell body.
- **Cell body (cyton):** contains the **nucleus** and granules; controls the cell.
- **Axon:** a single long fibre carrying impulses **away** from the cell body; covered by a fatty **myelin sheath** (insulates, speeds conduction) broken at **nodes of Ranvier**; ends in branched **axon endings**.
- **Synapse:** the junction between the axon ending of one neuron and the dendrite of the next; a **chemical** released by the axon ending carries the impulse across, so impulses pass in **one direction** only.

**Kinds of neuron:** **sensory** (receptor → CNS), **motor** (CNS → effector), **relay** (within the CNS).

| Division | Parts | Role |
|---|---|---|
| **Central (CNS)** | Brain and spinal cord | Receives, interprets, decides, commands |
| **Peripheral (PNS)** | 12 pairs of cranial nerves, 31 pairs of spinal nerves | Connects the CNS with receptors and effectors |
| **Autonomic (ANS)** | Nerves to internal organs | Controls involuntary activities: heartbeat, gut, glands, pupil |`,
      [kt('Neuron', 'Nerve cell; unit of the nervous system.'), kt('Myelin sheath', 'Fatty covering of an axon that insulates it and speeds the impulse.'), kt('Synapse', 'Junction between two neurons where a chemical carries the impulse across.'), kt('Autonomic nervous system', 'Part controlling involuntary organs.')],
      V.neuron,
      [1],
    ),
    sec(
      '2. The brain',
      `The brain lies in the skull (cranium). Its main parts:

| Part | Position | Functions | Effect of damage |
|---|---|---|---|
| **Cerebrum** | Largest; two folded hemispheres joined by the corpus callosum | Thinking, memory, intelligence, speech, **voluntary actions**, interpreting sensations | Loss of memory, speech or voluntary movement |
| **Cerebellum** | Back, below the cerebrum | **Balance**, posture, coordination of muscle movements | Staggering, clumsy movements |
| **Thalamus** | Deep in the centre | **Relays** sensory impulses (except smell) to the cerebrum | Disturbed sensations |
| **Hypothalamus** | Below the thalamus | **Body temperature, hunger, thirst, sleep**; controls the pituitary | Temperature or appetite out of control |
| **Pons** | Bulge on the brain stem | **Connects** parts of the brain; helps regulate **breathing** | Disturbed breathing |
| **Medulla oblongata** | Lowest part, continues as the spinal cord | **Heartbeat, breathing, blood pressure**, swallowing, coughing, sneezing, vomiting | Often fatal |`,
      [kt('Cerebrum', 'Largest part of the brain; thinking and voluntary actions.'), kt('Cerebellum', 'Part of the brain that maintains balance.'), kt('Hypothalamus', 'Part regulating temperature, hunger and thirst.'), kt('Medulla oblongata', 'Lowest part of the brain; controls heartbeat and breathing.')],
      V.brain,
      [2],
    ),
    sec(
      '3. The spinal cord; grey and white matter',
      `The **spinal cord** runs from the medulla oblongata down through the **vertebral column**, which protects it. It has a **central canal**.
- **Grey matter** = cell bodies of neurons; **white matter** = nerve fibres with white **myelin**.
- In the **cerebrum**: grey matter **outside** (cortex), white matter **inside**.
- In the **spinal cord**: white matter **outside**, grey matter **inside** (butterfly-shaped).

**Functions of the spinal cord:** the white matter **conducts impulses** to and from the brain; the grey matter is the **centre for spinal reflexes**. Spinal nerves leave it through a **dorsal (sensory) root** with a ganglion and a **ventral (motor) root**.`,
      [kt('Grey matter', 'Nervous tissue made of cell bodies.'), kt('White matter', 'Nervous tissue made of myelinated fibres.')],
      V.greywhite,
      [3],
    ),
    sec(
      '4. Voluntary, involuntary and reflex actions; the reflex arc',
      `| Action | Features | Examples |
|---|---|---|
| **Voluntary** | At will, after thinking; controlled by the **cerebrum**; slower | Writing, walking, speaking |
| **Involuntary** | Not under the will; controlled by the **medulla** and autonomic system | Heartbeat, breathing, peristalsis |
| **Reflex** | Sudden, **automatic** response to a stimulus, without thinking | Knee-jerk, sneezing, coughing, blinking |

**Reflex arc** — the pathway of a reflex: **receptor** → **sensory neuron** → **relay neuron** (grey matter of the spinal cord) → **motor neuron** → **effector** (muscle or gland).
- **Spinal reflexes** (knee-jerk, withdrawal from a hot object) pass through the spinal cord; **reflexes of the brain** (blinking, narrowing of the pupil) through the brain.
- Pain is felt **after** the withdrawal, because the impulse takes longer to reach the brain.
- Reflexes **protect** the body by their speed and leave the brain free for other work.`,
      [kt('Reflex action', 'Quick, automatic response to a stimulus without thinking.'), kt('Reflex arc', 'Pathway of impulses in a reflex action.'), kt('Effector', 'Muscle or gland that responds.')],
      V.arc,
      [4],
    ),
    sec(
      '5. Natural and acquired reflexes',
      `| Natural (unconditioned) | Acquired (conditioned) |
|---|---|
| Inborn, inherited | Learnt after birth |
| No practice needed | Developed by repeated experience |
| Same in all members of a species | Differ from person to person; may be lost |
| Sneezing, blinking, coughing, a baby sucking, salivation when food is in the mouth | Braking at a red light, typing, cycling, salivation at the sight or smell of a favourite food |

**Pavlov's experiment:** a bell was rung each time a dog was fed. After many repeats the bell alone made the dog salivate — a **conditioned reflex**. Acquired reflexes need the **cerebrum** (learning and memory).`,
      [kt('Natural reflex', 'An inborn reflex needing no learning.'), kt('Acquired reflex', 'A reflex learnt by repeated experience.')],
      table(['Reflex', 'Natural or acquired'], [['Blinking', 'Natural'], ['Typing without looking', 'Acquired']], 'Table: blinking is a natural reflex; typing without looking is acquired'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Reversing the direction of the impulse: dendrites carry it **in**, the axon carries it **out**.
- Writing that the cerebrum has grey matter inside: it is the **spinal cord** that has grey matter inside.
- Calling the knee-jerk a voluntary action, or a learnt skill a natural reflex.
- Leaving out the **relay neuron** from a reflex arc.

**How marks are usually awarded**
- 1 mark: a term (synapse, reflex arc, cyton), a brain part for a function, an odd one out **with its category**.
- 2 marks: two differences, an effect of damage with its reason.
- 3 marks: a labelled neuron or reflex arc; functions of three brain parts.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Unit of the nervous system?', 'Neuron.', 'definition', 1),
    fc(2, 'Dendrites carry impulses…', 'Towards the cell body.', 'fact', 1),
    fc(3, 'Axon carries impulses…', 'Away from the cell body.', 'fact', 1),
    fc(4, 'Job of the myelin sheath?', 'Insulates the axon; speeds the impulse.', 'concept', 1),
    fc(5, 'Synapse?', 'Junction between two neurons; chemical carries the impulse.', 'definition', 1),
    fc(6, 'Sensory vs motor neuron?', 'Sensory: to the CNS. Motor: from the CNS.', 'exam-tip', 1),
    fc(7, 'CNS?', 'Brain and spinal cord.', 'fact', 1),
    fc(8, 'Pairs of cranial and spinal nerves?', '12 cranial, 31 spinal.', 'fact', 1),
    fc(9, 'What does the autonomic system control?', 'Involuntary organs: heart, gut, glands.', 'concept', 1),
    fc(10, 'Largest part of the brain?', 'Cerebrum.', 'fact', 2),
    fc(11, 'Centre of thinking and memory?', 'Cerebrum.', 'fact', 2),
    fc(12, 'Balance and posture?', 'Cerebellum.', 'fact', 2),
    fc(13, 'Relay station to the cerebrum?', 'Thalamus.', 'fact', 2),
    fc(14, 'Temperature, hunger and thirst?', 'Hypothalamus.', 'fact', 2),
    fc(15, 'Heartbeat and breathing?', 'Medulla oblongata.', 'fact', 2),
    fc(16, 'Why does a drunk person stagger?', 'Alcohol affects the cerebellum.', 'concept', 2),
    fc(17, 'Grey matter is made of…', 'Cell bodies of neurons.', 'fact', 3),
    fc(18, 'White matter is made of…', 'Myelinated nerve fibres.', 'fact', 3),
    fc(19, 'Grey matter in the spinal cord?', 'Inside (butterfly-shaped).', 'exam-tip', 3),
    fc(20, 'Two functions of the spinal cord?', 'Conducts impulses; centre for reflexes.', 'fact', 3),
    fc(21, 'Reflex action?', 'Quick, automatic response without thinking.', 'definition', 4),
    fc(22, 'Five parts of a reflex arc?', 'Receptor, sensory neuron, relay neuron, motor neuron, effector.', 'exam-tip', 4),
    fc(23, 'Where is the relay neuron?', 'Grey matter of the spinal cord.', 'fact', 4),
    fc(24, 'Example of a spinal reflex?', 'Knee-jerk.', 'fact', 4),
    fc(25, 'Example of a brain reflex?', 'Blinking.', 'fact', 4),
    fc(26, 'Why is pain felt after the hand moves?', 'The impulse reaches the brain later.', 'concept', 4),
    fc(27, 'Natural reflex?', 'Inborn; needs no learning.', 'definition', 5),
    fc(28, 'Acquired reflex?', 'Learnt by repeated experience.', 'definition', 5),
    fc(29, 'Pavlov\'s experiment showed…', 'A bell paired with food became enough to cause salivation.', 'concept', 5),
    fc(30, 'Brain part needed for acquired reflexes?', 'Cerebrum.', 'fact', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
