// ch06 notes and flashcards.
import { T, table, flow, unit, PROV } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Control and Coordination — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Why coordination? Receptors, neurons and synapses',
      `A **stimulus** is a change in the surroundings (light, heat, sound, touch, chemicals). Organisms respond to stimuli in a controlled way; **control and coordination** make the right parts act together, at the right time and in the right amount. In animals this is done by the **nervous system** and the **endocrine (hormonal) system**.

**Receptors** are specialised cells, usually in sense organs, that detect stimuli: photoreceptors (eye), phonoreceptors (ear), olfactory receptors (nose), gustatory receptors (tongue), and touch, heat and pain receptors (skin). **Effectors** are the muscles and glands that respond.

A **neuron** is the structural and functional unit of the nervous system: **dendrites** acquire information → **cell body** (with nucleus) → **axon** carries the **electrical impulse** → **nerve endings**. At the nerve ending the impulse causes the release of **chemicals**, which cross a small gap, the **synapse**, and start a new electrical impulse in the dendrite of the next neuron. A similar junction passes impulses to muscles and glands. Because chemicals are released only at the axon end, impulses cross a synapse in **one direction only**.`,
      [kt('Stimulus', 'A change in the environment to which an organism responds.'), kt('Receptor', 'A cell or group of cells that detects a particular stimulus.'), kt('Effector', 'A muscle or gland that carries out the response.'), kt('Synapse', 'The gap between the nerve ending of one neuron and the dendrite of the next, crossed by chemicals.')],
      V.neuron,
      [1],
      [V.synapse],
    ),
    sec(
      '2. Reflex action and the reflex arc',
      `Actions are **voluntary** (by choice, controlled by the forebrain, e.g. writing), **involuntary** (automatic, controlled by the midbrain and hindbrain, e.g. heartbeat, salivation) or **reflex** (a sudden, automatic response to a stimulus without conscious thought, e.g. pulling the hand away from a flame).

The path of a reflex is the **reflex arc**: **receptor → sensory neuron → relay neuron in the spinal cord → motor neuron → effector**. Reflex arcs are formed in the **spinal cord**, close to where the nerves enter, so the response is very quick and protects the body. The impulse also travels to the brain, which becomes aware of the event after the response has begun — that is why pain is felt a moment after the hand moves.

Reflex arcs are thought to have evolved because they are efficient where real thinking is not fast enough; the brain still handles the complex decisions.`,
      [kt('Reflex action', 'A sudden, automatic, involuntary response to a stimulus.'), kt('Reflex arc', 'The pathway of a reflex: receptor, sensory neuron, relay neuron, motor neuron, effector.'), kt('Relay neuron', 'A neuron in the spinal cord connecting the sensory neuron to the motor neuron.')],
      V.reflex,
      [2],
      [table(['Action', 'Type', 'Controlled by'], [['Writing', 'Voluntary', 'Forebrain'], ['Heartbeat', 'Involuntary', 'Hindbrain (medulla)'], ['Pulling hand from flame', 'Reflex', 'Spinal cord']], 'Table classifying writing, heartbeat and pulling the hand from a flame as voluntary, involuntary and reflex, with the controlling part')],
    ),
    sec(
      '3. The human brain',
      `The **central nervous system (CNS)** is the brain and the spinal cord; the **peripheral nervous system (PNS)** is the **cranial nerves** (from the brain) and **spinal nerves** (from the spinal cord).

- **Forebrain (cerebrum):** the main thinking part. Sensory areas receive impulses (sight, hearing, smell, touch); association areas link them with memory; motor areas control **voluntary** muscles.
- **Midbrain:** some involuntary actions, including reflex movements of the head and eyes.
- **Hindbrain:** **medulla** — blood pressure, salivation and vomiting; **pons** — helps regulate breathing; **cerebellum** — posture, balance and the precision of voluntary actions (walking straight, riding a bicycle, picking up a pencil).`,
      [kt('Cerebrum', 'The large forebrain; thinking, memory, senses and voluntary actions.'), kt('Cerebellum', 'Part of the hindbrain that maintains posture and balance and makes movements precise.'), kt('Medulla', 'Part of the hindbrain that controls blood pressure, salivation and vomiting.')],
      V.brain,
      [3],
    ),
    sec(
      '4. Protection, movement and the limits of nerve impulses',
      `The brain lies in a bony box, the **skull (cranium)**, and is cushioned by **fluid** that absorbs shocks. The spinal cord is protected by the **vertebral column**.

When an impulse reaches a muscle, special **proteins** in the muscle cells change their shape and arrangement, the cells **shorten**, and the part moves.

Electrical impulses have limits: they reach **only cells connected by nervous tissue**, and a cell needs time to **reset** after each impulse before it can send another. So multicellular organisms also use **chemical communication** — hormones carried by the blood, which reach all cells (only cells with the right receptors respond). Plants, which have no nervous tissue, rely on chemical and electrical-chemical signals.`,
      [kt('Vertebral column', 'The backbone, which encloses and protects the spinal cord.')],
      table(['Feature', 'Nerve impulses', 'Hormones'], [['Speed', 'Very fast', 'Slower'], ['Reach', 'Only cells joined by nerves', 'All cells reached by blood'], ['Effect', 'Short-lived', 'Longer-lasting']], 'Table comparing nerve impulses and hormones by speed, reach and duration'),
      [1, 3],
    ),
    sec(
      '5. Movements in plants',
      `Plants have no nervous system, yet they respond to stimuli in two ways.

**Immediate response (no growth):** the leaflets of the **touch-me-not** (*Mimosa pudica*) fold and droop within seconds of a touch. Information passes from cell to cell by electrical-chemical means, and certain cells change shape by **losing water**. The movement is not directional and involves no growth (a nastic movement).

**Growth movements (tropisms):** directional growth towards (positive) or away from (negative) a stimulus, caused by unequal growth on two sides:
- **Phototropism** — shoots grow towards light; roots away from it.
- **Geotropism** — roots grow towards gravity (positive); shoots away (negative).
- **Hydrotropism** — roots grow towards water.
- **Chemotropism** — the pollen tube grows towards the ovule.
- **Thigmotropism** — tendrils coil around a support because the side touching it grows more slowly than the side away from it.`,
      [kt('Tropism', 'A directional growth movement of a plant part in response to a stimulus.'), kt('Positive tropism', 'Growth towards the stimulus, e.g. roots towards gravity.'), kt('Nastic movement', 'A non-directional response, e.g. folding of touch-me-not leaflets.')],
      V.tropism,
      [4],
      [V.mimosa, V.tendril],
    ),
    sec(
      '6. Plant hormones',
      `Plant hormones (phytohormones) coordinate growth and responses.

- **Auxin** — made at the shoot tip; makes cells **elongate**. When light comes from one side, auxin diffuses to the **shaded side**, cells there grow longer, and the shoot bends towards the light.
- **Gibberellins** — help the **growth of the stem**.
- **Cytokinins** — promote **cell division**; found in high concentration where cells divide rapidly, such as fruits and seeds.
- **Abscisic acid** — **inhibits growth**; its effects include the **wilting of leaves**; it is linked with responses to water stress.`,
      [kt('Auxin', 'Plant hormone made at the shoot tip that causes cell elongation.'), kt('Abscisic acid', 'Plant hormone that inhibits growth and causes wilting of leaves.')],
      V.auxin,
      [5],
      [table(['Hormone', 'Role'], [['Auxin', 'Cell elongation; phototropism'], ['Gibberellins', 'Stem growth'], ['Cytokinins', 'Cell division'], ['Abscisic acid', 'Inhibits growth; wilting']], 'Table of four plant hormones and their roles')],
    ),
    sec(
      '7. Hormones in animals and feedback',
      `**Endocrine glands** are ductless: they release **hormones** directly into the blood, which carries them to **target cells**.

| Gland | Hormone | Function |
|---|---|---|
| Hypothalamus | Releasing hormones | Stimulate the pituitary |
| Pituitary | Growth hormone | Growth and development; deficiency in childhood causes dwarfism |
| Thyroid | Thyroxine | Controls carbohydrate, protein and fat metabolism; needs **iodine** |
| Pancreas | Insulin | Lowers blood sugar; deficiency causes **diabetes** |
| Adrenal | Adrenaline | Prepares the body for emergencies |
| Testes | Testosterone | Changes in males at puberty |
| Ovaries | Oestrogen | Changes in females at puberty |

**Adrenaline** is released into the blood in an emergency: the heart beats faster, sending more oxygen to the muscles; blood supply to the digestive system and skin is reduced as small arteries there contract; breathing becomes faster. **Iodised salt** prevents iodine deficiency and **goitre** (swollen neck).

**Feedback mechanism:** the timing and amount of hormone release are regulated by feedback. For example, when blood sugar rises, cells of the pancreas detect it and release more insulin; as the level falls, insulin secretion is reduced.`,
      [kt('Endocrine gland', 'A ductless gland that releases hormones directly into the blood.'), kt('Hormone', 'A chemical messenger made in one place and acting on target cells elsewhere.'), kt('Feedback mechanism', 'Control in which the effect of a hormone regulates further release of that hormone.')],
      V.glands,
      [6],
      [flow('LR', [['h', 'Blood sugar high'], ['i', 'More insulin'], ['n', 'Sugar back to normal'], ['l', 'Less insulin']], [['h', 'i'], ['i', 'n'], ['n', 'l'], ['l', 'h', 'next meal']], 'Feedback loop between blood sugar level and insulin release')],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing the impulse direction backwards (it is dendrite → cell body → axon → nerve ending).
- Calling the synapse a physical joint; it is a gap crossed by chemicals, in one direction only.
- Saying reflexes are controlled by the brain; the reflex arc is in the spinal cord (the brain is informed afterwards).
- Mixing up cerebrum (thinking) and cerebellum (balance).
- Calling the touch-me-not response a tropism; it is an immediate, non-growth, non-directional movement.
- Saying light "pulls" the shoot; bending is due to unequal growth caused by auxin.
- Writing that insulin raises blood sugar, or that goitre is caused by too much iodine.

**How marks are usually awarded**
- 1-mark items: correct option, term or matching pair.
- 2–3-mark answers: correct term (1) + mechanism or pathway (1) + example or reason (1).
- 5-mark answers: labelled diagram (neuron, reflex arc or brain) (2) + explanation in the correct order (2) + one extra point such as significance or a comparison (1).
- Case-based items: two 1-mark parts from the passage and a 2-mark part with an internal choice, often interpreting data.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is a stimulus?', 'A change in the surroundings (light, heat, sound, touch, chemicals) to which an organism responds.', 'definition', 1),
    fc(2, 'Name the receptors for taste and smell.', 'Gustatory receptors (taste buds of the tongue) and olfactory receptors (nose).', 'fact', 1),
    fc(3, 'Order in which an impulse travels through a neuron?', 'Dendrite → cell body → axon → nerve ending.', 'concept', 1),
    fc(4, 'What is a synapse?', 'The gap between the nerve ending of one neuron and the dendrite of the next; chemicals released at the nerve ending cross it.', 'definition', 1),
    fc(5, 'Why does an impulse cross a synapse in one direction only?', 'Chemicals are released only at the axon ending and are received by the dendrite of the next neuron.', 'concept', 1),
    fc(6, 'What are effectors?', 'Muscles and glands that carry out a response.', 'definition', 1),
    fc(7, 'Define a reflex action.', 'A sudden, automatic, involuntary response to a stimulus, without conscious thinking.', 'definition', 2),
    fc(8, 'Parts of a reflex arc, in order?', 'Receptor → sensory neuron → relay neuron (spinal cord) → motor neuron → effector.', 'diagram', 2),
    fc(9, 'Where are reflex arcs formed?', 'In the spinal cord.', 'fact', 2),
    fc(10, 'Why do you feel pain only after pulling your hand away?', 'The reflex response is made by the spinal cord; the message reaches the brain slightly later.', 'concept', 2),
    fc(11, 'Give one voluntary, one involuntary and one reflex action.', 'Writing (voluntary); heartbeat (involuntary); withdrawing the hand from a flame (reflex).', 'example', 2),
    fc(12, 'What makes up the central nervous system?', 'The brain and the spinal cord.', 'fact', 3),
    fc(13, 'Cranial nerves and spinal nerves arise from…?', 'Cranial nerves from the brain; spinal nerves from the spinal cord. Together they form the peripheral nervous system.', 'fact', 3),
    fc(14, 'Functions of the medulla?', 'Controls blood pressure, salivation and vomiting.', 'fact', 3),
    fc(15, 'Function of the cerebellum?', 'Maintains posture and balance; makes voluntary movements precise.', 'fact', 3),
    fc(16, 'Which part of the brain controls thinking and voluntary actions?', 'The forebrain (cerebrum).', 'fact', 3),
    fc(17, 'How is the brain protected?', 'By the bony skull (cranium) and a cushion of fluid that absorbs shocks.', 'fact', 3),
    fc(18, 'How does a muscle cell move?', 'Special proteins change their shape and arrangement, so the cell shortens.', 'concept', 1),
    fc(19, 'Two limitations of nerve impulses?', 'They reach only cells connected by nerves, and cells need time to reset before the next impulse.', 'concept', 1),
    fc(20, 'How do touch-me-not leaves fold?', 'Electrical-chemical signals pass between cells; cells lose water and change shape. No growth is involved.', 'concept', 4),
    fc(21, 'Define tropism.', 'A directional growth movement of a plant part in response to a stimulus.', 'definition', 4),
    fc(22, 'Root vs shoot: geotropism?', 'Roots are positively geotropic (grow down); shoots are negatively geotropic (grow up).', 'concept', 4),
    fc(23, 'Pollen tube growing towards the ovule is…?', 'Chemotropism.', 'example', 4),
    fc(24, 'Why does a tendril coil around a stick?', 'The side touching the stick grows more slowly than the side away from it (thigmotropism).', 'concept', 4),
    fc(25, 'How does auxin cause a shoot to bend towards light?', 'Auxin moves to the shaded side; cells there elongate more, so the shoot curves towards the light.', 'concept', 5),
    fc(26, 'Roles of gibberellins and cytokinins?', 'Gibberellins: stem growth. Cytokinins: promote cell division (high in fruits and seeds).', 'fact', 5),
    fc(27, 'Which plant hormone inhibits growth?', 'Abscisic acid (also causes wilting of leaves).', 'fact', 5),
    fc(28, 'What are endocrine glands?', 'Ductless glands that release hormones directly into the blood.', 'definition', 6),
    fc(29, 'Why is iodised salt advised?', 'Iodine is needed to make thyroxine; lack of it causes goitre.', 'concept', 6),
    fc(30, 'Insulin: gland and job?', 'Pancreas; lowers blood sugar. Too little causes diabetes.', 'fact', 6),
    fc(31, 'Effects of adrenaline?', 'Faster heartbeat and breathing; more blood to muscles, less to the gut and skin — ready for an emergency.', 'fact', 6),
    fc(32, 'What is a feedback mechanism?', 'Control in which the level of a substance regulates hormone release: high blood sugar → more insulin; normal sugar → less insulin.', 'concept', 6),
    fc(33, 'Exam tip: nastic or tropic?', 'Touch-me-not folding is not a growth movement and not directional — do not call it a tropism.', 'exam-tip', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
