// ch06 Control and Coordination — question bank. MCQ keys are placed by the builder (balanced); AR keys planned: a a a b b c c d d.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const near = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol;

// ---------------------------------------------------------------- t01 neurons and synapses
add('impulse-order-mcq', mcq({
  stem: 'In which order does a nerve impulse travel through a neuron?',
  right: 'Dendrite → cell body → axon → nerve ending',
  wrong: ['Axon → cell body → dendrite → nerve ending', 'Cell body → dendrite → axon → nerve ending', 'Nerve ending → axon → cell body → dendrite'],
  sol: 'Information is picked up at the tips of the dendrites, passes through the cell body, travels along the axon and leaves at the nerve ending — option (@K). The other orders start at the wrong end or skip the cell body.',
  d: 1, c: 'recall', t: [1],
}));
add('syn-direction-mcq', mcq({
  stem: 'The axon ending of neuron **P** lies next to a dendrite of neuron **Q**, separated by a synapse. Which statement is correct?',
  right: 'A message can pass from P to Q, but not from Q to P.',
  wrong: ['A message can pass from Q to P, but not from P to Q.', 'Messages pass equally well in both directions.', 'No message can pass, because the two neurons do not touch.'],
  sol: 'Step 1 — Chemicals are released only at an axon ending and act on a dendrite.\n\nStep 2 — P has the axon ending and Q has the dendrite, so the message goes from P to Q only — option (@K).\n\nStep 3 — (@1) reverses the direction; (@2) ignores the one-way release of chemicals; (@3) forgets that chemicals carry the message across the gap.',
  d: 2, c: 'understanding', t: [1],
}));
add('synapse-chem-mcq', mcq({
  stem: 'How does a nerve message cross a synapse?',
  right: 'Chemicals released at the nerve ending cross the gap and start a new impulse in the next neuron.',
  wrong: ['The electrical impulse jumps directly across the gap.', 'Blood carries the message from one neuron to the next.', 'The two neurons join together for a moment so that the impulse can pass.'],
  sol: 'At the end of the axon, the electrical impulse sets off the release of chemicals. They cross the synapse and start a new electrical impulse in the dendrite of the next neuron — option (@K). The impulse cannot jump the gap (@1), blood is not involved (@2), and neurons do not join (@3).',
  d: 2, c: 'understanding', t: [1],
}));
add('receptor-cold-mcq', mcq({
  stem: 'Ritu has a heavy cold with a blocked nose. At a perfume shop she cannot smell the scent sprayed on her wrist, yet she clearly feels that the spray is cool and wet. Which receptors are not being stimulated?',
  right: 'Olfactory receptors in the nose',
  wrong: ['Touch and cold receptors in the skin', 'Gustatory receptors in the tongue', 'Photoreceptors in the eye'],
  sol: 'Step 1 — She feels the cool, wet spray, so the touch and cold receptors in her skin (@1) are working.\n\nStep 2 — Smell is detected by olfactory receptors in the nose; the blocked nose stops the scent from reaching them — option (@K).\n\nStep 3 — Taste (@2) and sight (@3) have nothing to do with smelling the perfume.',
  d: 2, c: 'application', t: [1],
}));
add('effector-mcq', mcq({
  stem: 'Which of these is an **effector**?',
  right: 'The salivary gland that releases saliva when food is smelt',
  wrong: ['The taste bud that detects sweetness', 'The spinal cord that connects sensory and motor neurons', 'The sensory nerve from the skin of the hand'],
  sol: 'Effectors are muscles and glands that carry out a response. The salivary gland responds by releasing saliva — option (@K). A taste bud is a receptor (@1), the spinal cord is part of the central nervous system (@2), and a sensory nerve only carries impulses to it (@3).',
  d: 2, c: 'understanding', t: [1],
}));
add('drug-synapse-mcq', mcq({
  stem: 'A poison stops the release of chemicals at every nerve ending in the body. Which effect would you expect?',
  right: 'Messages could not pass from neuron to neuron or to muscles, so both reflexes and voluntary movements would fail.',
  wrong: ['Only voluntary actions would stop; reflexes would continue because they do not use the brain.', 'Only hormones would stop working; nerve messages would be unaffected.', 'Nerve messages would travel faster because there would be no delay at synapses.'],
  sol: 'Step 1 — Every nerve pathway, including a reflex arc, passes messages across synapses and to muscles using chemicals.\n\nStep 2 — With no chemicals released, no message can reach the next neuron or the muscle, so all nerve-controlled responses fail — option (@K).\n\nStep 3 — (@1) is wrong because reflex arcs also have synapses; (@2) confuses nerves with hormones; (@3) is wrong because without chemicals the message does not cross at all.',
  d: 4, c: 'analysis', t: [1, 2],
}));
add('sensory-damage-mcq', mcq({
  stem: 'In an accident, the **sensory** nerves from Aarav’s right hand are damaged, but the **motor** nerves are unharmed. What is most likely?',
  right: 'He can move the hand when he decides to, but cannot feel a pin prick on it.',
  wrong: ['He can feel a pin prick on the hand but cannot move it.', 'He can neither feel nor move the hand.', 'He can feel and move the hand normally; only his reflexes are lost.'],
  sol: 'Step 1 — Sensory nerves carry impulses from receptors to the brain and spinal cord; without them, touch and pain from the hand cannot be felt.\n\nStep 2 — Motor nerves carry instructions to the muscles; these work, so he can still move the hand voluntarily — option (@K).\n\nStep 3 — (@1) swaps the roles of the two nerves; (@2) needs both kinds of nerve damaged; (@3) is wrong because feeling depends on the sensory nerves.',
  d: 4, c: 'analysis', t: [1, 2],
}));
add('syn-oneway-ar', ar({
  a: 'A nerve impulse crosses a synapse in only one direction.',
  r: 'Chemicals are released only at the axon ending of one neuron and act on the dendrite of the next neuron.',
  key: 'a',
  sol: 'Both statements are true. Because the chemicals are released only from the axon ending and received by the next dendrite, the message can only go one way. R explains A — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('neuron-parts-short', short({
  marks: 2,
  stem: '(a) Name the part of a neuron where information is first picked up, and the part along which it travels as an electrical impulse.\n\n(b) What happens at the end of the axon so that the message reaches the next neuron?',
  model: '(a) Information is picked up at the tips of the **dendrites**, and it travels as an electrical impulse along the **axon**.\n\n(b) The impulse sets off the release of **chemicals** at the nerve ending. These cross the **synapse** and start a new electrical impulse in the dendrite of the next neuron.',
  sol: 'Step 1 — Recall the direction of travel: dendrite → cell body → axon → nerve ending.\n\nStep 2 — At the nerve ending the electrical signal becomes a chemical one, which crosses the gap.',
  scheme: [['(a) Dendrite and axon (0.5 each)', 1], ['(b) Chemicals released, cross the synapse and start a new impulse', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('impulse-limits-short', short({
  marks: 3,
  stem: 'Kiran argues: "Nerve impulses are the fastest messages in the body, so the body should use nerves for every kind of control, including growth." Evaluate his claim by answering the following.\n\n(a) State two limitations of electrical impulses.\n\n(b) How do hormones overcome these limitations?\n\n(c) Why can plants coordinate their growth using chemicals alone?',
  model: '(a) Impulses reach only cells connected by nervous tissue, and a cell needs time to reset after each impulse, so it cannot send impulses continuously.\n\n(b) Hormones travel in the blood to every cell, and their effect lasts long — exactly what slow, body-wide jobs such as growth need.\n\n(c) Plants have no nervous tissue, and growth is slow, so chemicals moving from cell to cell are enough.\n\nSo Kiran is wrong: speed is not the only need.',
  sol: 'Step 1 — Recall the two limits: reach (only connected cells) and the reset time.\n\nStep 2 — Hormones travel in the blood to all cells and act for long periods.\n\nStep 3 — Plants lack nerves and their growth responses are slow, so the claim fails.',
  scheme: [['(a) Two limitations (0.5 each)', 1], ['(b) Hormones reach all cells through the blood and act for long', 1], ['(c) No nervous tissue; slow responses suit chemical signals', 1]],
  d: 3, c: 'evaluation', t: [1],
}));
add('neuron-long', long({
  stem: '(a) Draw a neat, labelled diagram of a neuron and mark the direction in which the impulse travels.\n\n(b) Describe how information picked up by a receptor is passed from one neuron to the next.\n\n(c) Explain why the message travels in one direction only.',
  model: '(a) Diagram with labels: **dendrites**, **cell body**, **nucleus**, **axon**, **nerve endings**; an arrow from the dendrites towards the nerve endings.\n\n(b) A stimulus at the dendrite tip sets off a chemical reaction that produces an **electrical impulse**. The impulse travels from the dendrite to the cell body and along the axon to the nerve ending. There it causes the release of **chemicals**, which cross the **synapse** and start a similar electrical impulse in the dendrite of the next neuron. In this way the message is relayed until it reaches the brain or spinal cord, or a muscle or gland.\n\n(c) The chemicals are released only from the axon ending and are received only by the dendrite of the next neuron, so the message cannot travel backwards.',
  sol: 'Step 1 — Draw and label the five parts, with the direction arrow.\n\nStep 2 — Describe the electrical part (inside the neuron) and the chemical part (across the synapse).\n\nStep 3 — Link one-way travel to where the chemicals are released.',
  scheme: [['(a) Neat diagram with at least four correct labels', 1.5], ['(a) Arrow showing the direction of the impulse', 0.5], ['(b) Electrical impulse from dendrite through cell body and axon', 1], ['(b) Chemicals cross the synapse and start a new impulse', 1], ['(c) One-way release and reception of chemicals', 1]],
  d: 3, c: 'understanding', t: [1],
}));
add('cns-pns-short', short({
  marks: 2,
  stem: 'An infection damages Rahul’s facial nerve, a nerve that arises from the brain and supplies the muscles of the face. One side of his face cannot smile, but he moves his arms normally.\n\n(a) Is the facial nerve part of the central or the peripheral nervous system? Give a reason.\n\n(b) Why are his arm movements unaffected?',
  model: '(a) The **peripheral** nervous system. It is a **cranial nerve**: it arises from the brain and connects it to the face muscles; the central nervous system is only the brain and spinal cord.\n\n(b) His arm muscles receive instructions through **spinal nerves** from the spinal cord, which are not damaged.',
  sol: 'Step 1 — Nerves arising from the brain are cranial nerves, part of the peripheral system.\n\nStep 2 — The arms are served by a different route: spinal nerves.',
  scheme: [['(a) Peripheral, because it is a cranial nerve linking the brain to the face', 1], ['(b) Arms are supplied by undamaged spinal nerves', 1]],
  d: 3, c: 'application', t: [1, 3],
}));

// ---------------------------------------------------------------- t02 reflexes
add('reflex-example-mcq', mcq({
  stem: 'Which of the following is a reflex action?',
  right: 'Pulling your foot back suddenly on stepping on a sharp stone',
  wrong: ['Writing your name on an answer sheet', 'Choosing ripe bananas at a fruit stall', 'Kicking a football towards the goal'],
  sol: 'A reflex is a sudden, automatic response to a stimulus, made without thinking. Pulling the foot off a sharp stone fits — option (@K). The other three are voluntary actions that need thought and choice.',
  d: 1, c: 'understanding', t: [2],
}));
add('reflex-where', mcq({
  stem: 'In a reflex such as pulling your foot off a sharp stone, where is the sensory neuron connected to the motor neuron?',
  right: 'In the spinal cord',
  wrong: ['In the cerebellum', 'In the forebrain', 'In the muscle of the leg'],
  sol: 'Reflex arcs are formed in the spinal cord, where a relay neuron connects the sensory neuron to the motor neuron — option (@K). The brain is informed but does not make this connection (@1, @2); the leg muscle is the effector (@3).',
  d: 1, c: 'recall', t: [2],
}));
add('motor-damage-mcq', mcq({
  stem: 'Gita steps on a nail. She feels the sharp pain at once, but her foot does not pull away, and she also finds she cannot move that leg when she tries to. Which part of the pathway is most likely damaged?',
  right: 'The motor neuron to the leg muscles',
  wrong: ['The sensory neuron from the foot', 'The pain receptors in the skin of the foot', 'The forebrain, where pain is felt'],
  sol: 'Step 1 — She feels the pain, so the receptors (@2), the sensory neuron (@1) and the route to the forebrain (@3) are all working.\n\nStep 2 — Neither the reflex nor her own decision can move the leg. Both use the motor neuron to reach the muscle, so the motor neuron is the likely damaged part — option (@K).',
  d: 4, c: 'analysis', t: [1, 2],
}));
add('reflex-classify-mcq', mcq({
  stem: 'Four things happen to Lakshmi one morning. Which one is a reflex action produced by the spinal cord?',
  right: 'She jerks her hand back when it brushes against a hot iron.',
  wrong: ['Her heart beats faster as she climbs the stairs.', 'She decides to drink water because she feels thirsty.', 'She keeps her balance while standing in a moving bus.'],
  sol: 'Step 1 — Jerking the hand from a hot iron is sudden, automatic and protective: a spinal reflex — option (@K).\n\nStep 2 — A faster heartbeat (@1) is an involuntary action controlled by the hindbrain; deciding to drink (@2) is a voluntary action of the forebrain; balance (@3) is maintained by the cerebellum.',
  d: 3, c: 'application', t: [2, 3],
}));
add('reflex-ar', ar({
  a: 'A reflex action takes less time than an action that needs thinking.',
  r: 'In a reflex action, the impulse first goes to the brain, which decides the response.',
  key: 'c',
  sol: 'A is true: the reflex path is short. R is false: the reflex arc is completed in the spinal cord, and the brain is informed only afterwards — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('reflex-brain-tf', tf({
  stem: 'In a reflex action, information about the stimulus never reaches the brain.',
  key: 'f',
  sol: 'False. The reflex response is produced by the spinal cord, but the message also travels up to the brain, which becomes aware of it a moment later.',
  d: 2, c: 'understanding', t: [2],
}));
add('reflex-time-num', num({
  marks: 2,
  stem: r`A withdrawal reflex sends an impulse $0.9\ \text{m}$ from a fingertip to the spinal cord and $0.9\ \text{m}$ back to the arm muscles. If impulses in these neurons travel at $60\ \text{m/s}$, how long, in **milliseconds**, does the conduction take? (Ignore delays at synapses.)`,
  value: 30, tol: 0.5, unit: 'ms',
  sol: r`Step 1 — Total distance $= 0.9 + 0.9 = 1.8\ \text{m}$.

Step 2 — Time $= \dfrac{\text{distance}}{\text{speed}} = \dfrac{1.8}{60} = 0.03\ \text{s}$.

Step 3 — In milliseconds: $0.03 \times 1000 = 30\ \text{ms}$.`,
  scheme: [['Total distance 1.8 m', 0.5], ['Time = distance ÷ speed = 0.03 s', 1], ['Converted to 30 ms', 0.5]],
  d: 3, c: 'application', t: [2],
}), () => near(((0.9 + 0.9) / 60) * 1000, 30) || 'time');
add('hot-iron-short', short({
  marks: 2,
  stem: 'Kabir accidentally touches a hot iron and jerks his hand away. Only a moment later does he feel the pain. Explain both observations.',
  model: 'Pulling the hand away is a **reflex action**: impulses from heat receptors travel along a sensory neuron to the **spinal cord**, where a relay neuron passes them to a motor neuron, and the arm muscle contracts. The message reaches the **brain** later, by a longer path, so the pain is felt after the hand has moved.',
  sol: 'Step 1 — Identify the reflex arc through the spinal cord.\n\nStep 2 — Explain the delay: the brain receives the message later.',
  scheme: [['Reflex arc through the spinal cord gives the quick withdrawal', 1], ['Message reaches the brain later, so the pain is felt afterwards', 1]],
  d: 3, c: 'application', t: [2],
}));
add('spinal-injury-short', short({
  marks: 3,
  stem: 'Meenakshi’s spinal cord was injured in the middle of her back. When a doctor pricks her toe with a pin, her leg pulls away, but she says she felt nothing.\n\n(a) Which part of her nervous system produced the leg movement? Explain.\n\n(b) Why did she feel nothing?\n\n(c) She can still feel a pin prick on her hand. Why?',
  model: '(a) A **reflex arc** in the spinal cord **below** the injury: receptor in the toe → sensory neuron → relay neuron in the spinal cord → motor neuron → leg muscle. The brain is not needed for this response.\n\n(b) To be felt, the impulse must travel up the spinal cord to the brain; the injury blocks this path, so the brain never receives the message.\n\n(c) Nerves from the hand join the spinal cord **above** the injury, so their impulses can still reach the brain.',
  sol: 'Step 1 — Movement without feeling means a reflex that does not need the brain.\n\nStep 2 — Feeling needs the message to reach the brain; the injury cuts that route.\n\nStep 3 — Compare where the nerves from the hand and from the foot join the spinal cord.',
  scheme: [['(a) Reflex arc in the spinal cord below the injury', 1], ['(b) The route up to the brain is blocked', 1], ['(c) Hand nerves join the cord above the injury', 1]],
  d: 5, c: 'analysis', t: [2, 3],
}));
add('reflex-long', long({
  stem: '(a) What is a reflex action? Give two examples.\n\n(b) Draw a labelled diagram of a reflex arc.\n\n(c) Why are reflex arcs completed in the spinal cord, even though the brain is the main thinking centre?',
  model: '(a) A reflex action is a sudden, automatic response to a stimulus, made without conscious thinking. Examples: pulling the hand away from a candle flame; pulling the foot off a sharp thorn.\n\n(b) Diagram labels: **receptor** (in the skin), **sensory neuron**, **spinal cord** with **relay neuron**, **motor neuron**, **effector** (muscle), with arrows showing the direction of the impulse.\n\n(c) Thinking takes time, and in danger there is no time to waste. Because the sensory and motor neurons are connected in the spinal cord, close to where the nerves enter, the message travels a short path and the response is very quick, protecting the body. The brain is still informed, so it can decide what to do next.',
  sol: 'Step 1 — Define a reflex and give two protective examples.\n\nStep 2 — Draw the five parts of the arc with arrows.\n\nStep 3 — Explain the benefit of the short path.',
  scheme: [['(a) Definition', 1], ['(a) Two examples', 1], ['(b) Labelled reflex arc with arrows', 2], ['(c) Short path gives a quick protective response; brain informed later', 1]],
  d: 3, c: 'understanding', t: [2],
}));
add('action-match', match({
  stem: 'Match each action in Column A with the part of the nervous system that mainly controls it in Column B.',
  pairs: [['Pulling the hand away from a flame', 'Spinal cord'], ['Keeping blood pressure steady', 'Medulla'], ['Writing an essay', 'Forebrain (cerebrum)'], ['Riding a bicycle without wobbling', 'Cerebellum']],
  order: [2, 0, 3, 1],
  sol: 'A reflex is controlled by the spinal cord (1 → r); blood pressure by the medulla (2 → p); thinking and writing by the forebrain (3 → s); balance and precise movement by the cerebellum (4 → q).',
  d: 2, c: 'understanding', t: [2, 3],
}));

// ---------------------------------------------------------------- t03 brain
add('brain-cerebellum-mcq', mcq({
  stem: 'After a head injury, a cyclist can think and speak clearly but cannot keep his balance or pick up a pen precisely. Which part of the brain is most likely affected?',
  right: 'Cerebellum',
  wrong: ['Medulla', 'Forebrain (cerebrum)', 'Pituitary gland'],
  sol: 'Balance and precise movement are controlled by the cerebellum — option (@K). His thinking is normal, which rules out the forebrain (@2); the medulla (@1) controls blood pressure, salivation and vomiting; the pituitary (@3) is a gland, not a control centre for movement.',
  d: 3, c: 'application', t: [3],
}));
add('medulla-mcq', mcq({
  stem: 'Blood pressure, salivation and vomiting are controlled by the:',
  right: 'medulla',
  wrong: ['cerebellum', 'cerebrum', 'pituitary gland'],
  sol: 'These involuntary actions are controlled by the medulla in the hindbrain — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('cns-mcq', mcq({
  stem: 'The central nervous system consists of:',
  right: 'the brain and the spinal cord',
  wrong: ['the brain and the cranial nerves', 'the spinal cord and the spinal nerves', 'all the nerves of the body'],
  sol: 'The central nervous system is the brain and the spinal cord — option (@K). Cranial and spinal nerves belong to the peripheral nervous system.',
  d: 1, c: 'recall', t: [3],
}));
add('forebrain-mcq', mcq({
  stem: 'Asha hears someone call her name, recognises her friend’s voice and decides to turn and wave. Which part of the brain links the sound with her memory and makes the decision?',
  right: 'Forebrain',
  wrong: ['Cerebellum', 'Medulla', 'Spinal cord'],
  sol: 'Recognising a voice, using memory and deciding to act are jobs of the forebrain (cerebrum) — option (@K). The cerebellum makes the wave smooth but does not decide; the medulla controls involuntary actions; the spinal cord handles reflexes.',
  d: 2, c: 'understanding', t: [3],
}));
add('back-injury-mcq', mcq({
  stem: 'After a bad fall from a tree, a farm worker complains of severe pain in his back. First-aid trainers say he must not be lifted in a way that bends his back. Why?',
  right: 'Bending a broken backbone could crush the spinal cord inside it and cut the link between the brain and the body.',
  wrong: ['Bending the back would drain the fluid that cushions the brain.', 'Bending the back would stop the cerebellum from controlling balance.', 'Bending the back would stop the release of adrenaline.'],
  sol: 'Step 1 — The spinal cord runs inside the vertebral column, which protects it.\n\nStep 2 — If the backbone is broken, bending it can crush the cord; messages between the brain and the body below the injury could then be cut, causing loss of feeling and movement — option (@K).\n\nStep 3 — The fluid around the brain (@1), the cerebellum (@2) and adrenaline (@3) are not what the precaution protects.',
  d: 3, c: 'application', t: [3],
}));
add('brain-ar', ar({
  a: 'The cerebellum controls all the involuntary actions of the body.',
  r: 'Blood pressure and salivation are controlled by the medulla.',
  key: 'd',
  sol: 'A is false: the cerebellum maintains balance and posture and makes voluntary movements precise; involuntary actions are controlled mainly by the midbrain and hindbrain, for example the medulla. R is true — option (d).',
  d: 2, c: 'understanding', t: [3],
}));
add('nerves-fill', fill({
  stem: 'Nerves arising from the brain are called ___ nerves, and those arising from the spinal cord are called ___ nerves.',
  acc: [['cranial'], ['spinal']],
  sol: '**Cranial** nerves arise from the brain and **spinal** nerves from the spinal cord; together they form the peripheral nervous system.',
  d: 1, c: 'recall', t: [3],
}));
add('protect-short', short({
  marks: 2,
  stem: 'How are (a) the brain and (b) the spinal cord protected in the human body?',
  model: '(a) The brain is enclosed in a bony box, the **skull (cranium)**. Inside it, the brain is surrounded by a **fluid-filled** cushion that absorbs shocks.\n\n(b) The spinal cord runs inside the **vertebral column** (backbone), which protects it from injury.',
  sol: 'Name the bony protection of each organ, and the shock-absorbing fluid around the brain.',
  scheme: [['(a) Skull and fluid cushion', 1], ['(b) Vertebral column', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('brain-three-short', short({
  marks: 3,
  wl: null,
  stem: 'Name the part of the brain mainly responsible in each case, and the region (forebrain, midbrain or hindbrain) it belongs to.\n\n(a) A tightrope walker at a village fair keeps her balance.\n\n(b) A patient’s blood pressure stays steady while he sleeps.\n\n(c) A student plans and writes an answer in an examination.',
  model: '(a) **Cerebellum** — hindbrain.\n\n(b) **Medulla** — hindbrain.\n\n(c) **Cerebrum** — forebrain.',
  sol: 'Step 1 — Identify the function: balance; an automatic body function; thinking and voluntary action.\n\nStep 2 — Match each function to the part and its region.',
  scheme: [['(a) Cerebellum, hindbrain', 1], ['(b) Medulla, hindbrain', 1], ['(c) Cerebrum, forebrain', 1]],
  d: 3, c: 'application', t: [3],
}));
add('brain-long', long({
  stem: '(a) Draw a labelled diagram of the human brain showing the forebrain, midbrain, cerebellum, pons and medulla.\n\n(b) State one function each of the forebrain, the cerebellum and the medulla.\n\n(c) How does an impulse arriving along a motor neuron make a muscle move?',
  model: '(a) Diagram labels: **forebrain (cerebrum)** on top, **midbrain** below it, and the hindbrain — **cerebellum** at the back, **pons** and **medulla** — with the medulla continuing as the **spinal cord**.\n\n(b) Forebrain: thinking, memory and control of voluntary actions. Cerebellum: posture, balance and precision of voluntary movements. Medulla: controls blood pressure, salivation and vomiting.\n\n(c) At the junction between the nerve and the muscle, chemicals are released. Special proteins in the muscle cells respond by changing their shape and arrangement. As a result the muscle cells shorten, the muscle pulls on the bone, and the body part moves.',
  sol: 'Step 1 — Draw the three regions with the hindbrain parts.\n\nStep 2 — One correct function for each part.\n\nStep 3 — Describe the change in muscle proteins that shortens the cells.',
  scheme: [['(a) Labelled diagram with at least four correct parts', 2], ['(b) Three functions (0.5 each)', 1.5], ['(c) Muscle proteins change shape and arrangement', 1], ['(c) Muscle cells shorten and the part moves', 0.5]],
  d: 3, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 plant movements
add('mimosa-mcq', mcq({
  stem: 'The leaflets of a touch-me-not plant fold within seconds of being touched. This happens because:',
  right: 'cells at the base of the leaflets lose water and change shape',
  wrong: ['the leaflets grow rapidly towards the touch', 'muscle cells in the leaf contract', 'auxin collects on the side that is touched'],
  sol: 'The response is too quick to involve growth. Electrical-chemical signals pass between cells, and certain cells lose water and change shape, so the leaflets fold — option (@K). Plants have no muscles (@2), growth is far slower (@1), and auxin acts on growth, not on this quick movement (@3).',
  d: 2, c: 'understanding', t: [4],
}));
add('geo-mcq', mcq({
  stem: 'The downward growth of roots in response to gravity is called:',
  right: 'positive geotropism',
  wrong: ['negative geotropism', 'positive phototropism', 'hydrotropism'],
  sol: 'Growth towards the pull of gravity is positive geotropism — option (@K). Shoots, which grow upwards, show negative geotropism.',
  d: 1, c: 'recall', t: [4],
}));
add('sideways-seedling-mcq', mcq({
  stem: 'Rani lays a germinating bean seedling on its side inside a dark cupboard. What will she see after two days?',
  right: 'The shoot curves upwards and the root curves downwards.',
  wrong: ['Both the shoot and the root curve downwards.', 'The shoot curves downwards and the root curves upwards.', 'Neither changes direction, because there is no light.'],
  sol: 'Step 1 — Gravity acts even in the dark, so geotropism still works.\n\nStep 2 — The shoot is negatively geotropic (curves up) and the root positively geotropic (curves down) — option (@K).\n\nStep 3 — (@3) wrongly assumes that light is needed for every tropism.',
  d: 3, c: 'application', t: [4],
}));
add('clinostat-mcq', mcq({
  stem: 'Seedlings in a box with one hole on the right side bend towards the right. If the same box is kept slowly rotating on a turntable, so that the hole faces every direction in turn, the seedlings will most likely:',
  right: 'grow nearly straight up, because each side receives light equally over time',
  wrong: ['bend even more strongly to the right', 'bend to the left, away from the hole', 'stop growing, because the light keeps changing direction'],
  sol: 'Step 1 — Bending happens when one side is shaded for long enough for auxin to build up there.\n\nStep 2 — On a slowly turning box, every side is lit and shaded in turn, so growth evens out and the shoots grow nearly straight — option (@K).\n\nStep 3 — (@1) and (@2) assume light from one fixed side; (@3) is wrong because light still reaches the shoots.',
  d: 4, c: 'analysis', t: [4, 5],
}));
add('hydro-mcq', mcq({
  stem: 'Near a leaking water pipe in a garden, the roots of a neem tree are found growing sideways towards the pipe. This is an example of:',
  right: 'positive hydrotropism',
  wrong: ['positive geotropism', 'negative phototropism', 'chemotropism'],
  sol: 'The roots are growing towards a source of water, so this is positive hydrotropism — option (@K). Geotropism (@1) would be straight down; light (@2) and chemicals (@3) are not the stimulus here.',
  d: 2, c: 'application', t: [4],
}));
add('tendril-ar', ar({
  a: 'The tendrils of a pea plant coil around a support.',
  r: 'The shoot of a plant grows towards light.',
  key: 'b',
  sol: 'Both statements are true, but tendril coiling is a response to touch (the side touching the support grows more slowly), not to light. R does not explain A — option (b).',
  d: 2, c: 'understanding', t: [4],
}));
add('tropism-tf', tf({
  stem: 'Tropic movements are growth movements whose direction depends on the direction of the stimulus.',
  key: 't',
  sol: 'True. In a tropism, a plant part grows towards (positive) or away from (negative) the stimulus.',
  d: 2, c: 'understanding', t: [4],
}));
add('chemo-fill', fill({
  stem: 'The growth of a pollen tube towards the ovule is an example of ___.',
  acc: [['chemotropism', 'positive chemotropism']],
  sol: 'The pollen tube follows chemicals released near the ovule, so it shows **chemotropism**.',
  d: 1, c: 'recall', t: [4],
}));
add('mimosa-vs-photo-short', short({
  marks: 2,
  stem: 'Give two differences between the folding of touch-me-not leaflets when touched and the bending of a shoot towards light.',
  model: 'Touch-me-not folding is **quick** (seconds) and involves **no growth**: cells lose water and change shape, whatever the direction of the touch. Bending towards light is **slow** (hours or days) and is a **growth movement**: shaded-side cells grow longer, and its direction depends on where the light comes from.',
  sol: 'Compare speed, whether growth is involved, the mechanism and whether the movement is directional.',
  scheme: [['Difference 1 (speed or growth involved)', 1], ['Difference 2 (mechanism or direction)', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('tendril-short', short({
  marks: 3,
  stem: 'A bitter gourd vine is planted next to a bamboo pole. After a week, its tendrils are wound tightly around the pole.\n\n(a) Name this response.\n\n(b) Explain how the coiling happens.\n\n(c) How does this response help the plant?',
  model: '(a) **Thigmotropism** — a growth response to touch.\n\n(b) The part of the tendril touching the pole grows more slowly than the part away from it. The outer side becomes longer, so the tendril curls around the pole.\n\n(c) The vine has a weak stem. By climbing the pole it lifts its leaves up into the sunlight for photosynthesis without having to build a thick, strong stem.',
  sol: 'Step 1 — The stimulus is touch, so the response is thigmotropism.\n\nStep 2 — Unequal growth on the two sides of the tendril causes coiling.\n\nStep 3 — Climbing gives access to light.',
  scheme: [['(a) Thigmotropism', 1], ['(b) Unequal growth: the side touching the pole grows more slowly', 1], ['(c) Climbing helps the leaves reach sunlight', 1]],
  d: 3, c: 'application', t: [4],
}));
add('tropism-long', long({
  stem: '(a) What is a tropism? How is it different from the folding of touch-me-not leaves?\n\n(b) Design a simple experiment, using a seedling in a pot, a cardboard box and a lamp, to show that a shoot is positively phototropic. State what you would observe.\n\n(c) Explain the role of auxin in the result.',
  model: '(a) A tropism is a **directional growth movement** of a plant part in response to a stimulus. Touch-me-not folding is quick, involves **no growth** and does not depend on the direction of the stimulus.\n\n(b) Water a potted seedling and place it inside a cardboard box with a single hole cut in one side. Keep a lamp shining through the hole, and keep a second seedling in an identical box lit evenly from above as a control. After three to four days, the shoot in the first box bends towards the hole, while the control grows straight up.\n\n(c) Auxin, made at the shoot tip, moves to the **shaded side**. Cells there **grow longer** than on the lit side, so the shoot curves towards the light.',
  sol: 'Step 1 — Define tropism and contrast it with a non-growth movement.\n\nStep 2 — Light from one side only, a control, and the observation.\n\nStep 3 — Auxin, shaded side, cell elongation, bending.',
  scheme: [['(a) Definition of tropism', 1], ['(a) Difference from touch-me-not folding', 0.5], ['(b) Set-up with one-sided light and a control', 1.5], ['(b) Observation: shoot bends towards the light', 0.5], ['(c) Auxin moves to the shaded side, cells there elongate, shoot bends', 1.5]],
  d: 4, c: 'analysis', t: [4, 5],
}));

// ---------------------------------------------------------------- t05 plant hormones
add('aba-mcq', mcq({
  stem: 'Which plant hormone inhibits growth and is associated with the wilting of leaves?',
  right: 'Abscisic acid',
  wrong: ['Auxin', 'Gibberellin', 'Cytokinin'],
  sol: 'Abscisic acid inhibits growth; its effects include the wilting of leaves — option (@K). Auxin, gibberellins and cytokinins promote growth.',
  d: 1, c: 'recall', t: [5],
}));
add('cytokinin-mcq', mcq({
  stem: 'A plant tissue-culture laboratory in Bengaluru wants a small piece of leaf tissue to divide rapidly and form a mass of new cells. Which plant hormone is most useful for this?',
  right: 'Cytokinin',
  wrong: ['Abscisic acid', 'Gibberellin', 'Oestrogen'],
  sol: 'Cytokinins promote cell division, so they are added to make the tissue divide — option (@K). Abscisic acid inhibits growth (@1); gibberellins mainly help stems grow (@2); oestrogen is a human hormone (@3).',
  d: 2, c: 'application', t: [5],
}));
add('sugarcane-ga-mcq', mcq({
  stem: 'A sugarcane farmer in Maharashtra wants the stems of his crop to grow taller. Which plant hormone would help most?',
  right: 'Gibberellin',
  wrong: ['Abscisic acid', 'Cytokinin', 'Adrenaline'],
  sol: 'Gibberellins help the growth of the stem — option (@K). Abscisic acid inhibits growth (@1); cytokinins mainly promote cell division (@2); adrenaline is an animal hormone (@3).',
  d: 2, c: 'application', t: [5],
}));
add('auxin-side-mcq', mcq({
  stem: 'Light falls on a growing shoot only from the **east**. Where does auxin collect, and which way does the shoot bend?',
  right: 'On the west side; the shoot bends towards the east.',
  wrong: ['On the east side; the shoot bends towards the east.', 'On the west side; the shoot bends towards the west.', 'Evenly on both sides; the shoot grows straight.'],
  sol: 'Step 1 — Auxin moves to the shaded side, which here is the west side.\n\nStep 2 — Cells on the west side grow longer, so the shoot curves towards the east, where the light is — option (@K).',
  d: 3, c: 'application', t: [4, 5],
}));
add('auxin-ar', ar({
  a: 'A shoot lit from one side bends towards the light.',
  r: 'Auxin diffuses towards the shaded side of the shoot and makes the cells there grow longer.',
  key: 'a',
  sol: 'Both are true, and the extra growth on the shaded side caused by auxin is exactly why the shoot bends towards the light — option (a).',
  d: 2, c: 'understanding', t: [4, 5],
}));
add('cytokinin-fill', fill({
  stem: 'The plant hormone that promotes cell division is ___.',
  acc: [['cytokinin', 'cytokinins']],
  sol: '**Cytokinin** promotes cell division.',
  d: 1, c: 'recall', t: [5],
}));
add('plant-hormone-match', match({
  stem: 'Match each plant hormone in Column A with its main role in Column B.',
  pairs: [['Auxin', 'Cell elongation at the shoot tip'], ['Gibberellin', 'Growth of the stem'], ['Cytokinin', 'Promotes cell division'], ['Abscisic acid', 'Inhibits growth; wilting of leaves']],
  order: [1, 3, 0, 2],
  sol: 'Auxin → cell elongation (1 → q); gibberellin → stem growth (2 → s); cytokinin → cell division (3 → p); abscisic acid → inhibits growth (4 → r).',
  d: 2, c: 'understanding', t: [5],
}));
add('drought-aba-short', short({
  marks: 2,
  stem: 'During a long dry spell, the leaves of a mango sapling droop and its growth almost stops. Name the plant hormone mainly involved, and explain how its action can help the sapling survive the dry spell.',
  model: '**Abscisic acid.** Its level rises when water is short. By **inhibiting growth**, it lets the sapling use less water and food, and it is linked with wilting and the closing of stomata, which cuts water loss. This helps the plant survive until it rains.',
  sol: 'Step 1 — Wilting and stopped growth point to the growth inhibitor.\n\nStep 2 — Link slower growth and less water loss to survival.',
  scheme: [['Names abscisic acid', 1], ['Explains how inhibiting growth and reducing water loss helps survival', 1]],
  d: 3, c: 'application', t: [5],
}));
add('three-hormones-short', short({
  marks: 3,
  wl: null,
  stem: 'Nisha notices three things in her family’s kitchen garden. For each, name the plant hormone mainly involved and state whether it promotes or inhibits growth.\n\n(a) A money plant on the windowsill has turned its stem towards the window.\n\n(b) Young brinjals are swelling quickly as their cells divide.\n\n(c) Chilli plants droop and stop growing when the garden is not watered for a week.',
  model: '(a) **Auxin** — promotes growth (cells on the shaded side elongate).\n\n(b) **Cytokinin** — promotes growth (cell division).\n\n(c) **Abscisic acid** — inhibits growth (and causes wilting).',
  sol: 'Identify the process in each case — bending towards light, cell division, wilting under water stress — and match it to the hormone.',
  scheme: [['(a) Auxin, promotes', 1], ['(b) Cytokinin, promotes', 1], ['(c) Abscisic acid, inhibits', 1]],
  d: 3, c: 'application', t: [4, 5],
}));
add('aba-tf', tf({
  stem: 'Abscisic acid promotes the growth of the stem.',
  key: 'f',
  sol: 'False. Abscisic acid inhibits growth; gibberellins help the stem to grow.',
  d: 2, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- t06 animal hormones
add('thyroxine-iodine-mcq', mcq({
  stem: 'Iodine is needed by the body to make the hormone:',
  right: 'thyroxine',
  wrong: ['insulin', 'adrenaline', 'growth hormone'],
  sol: 'The thyroid gland uses iodine to make thyroxine — option (@K).',
  d: 1, c: 'recall', t: [6],
}));
add('dwarf-mcq', mcq({
  stem: 'Doctors find that a ten-year-old boy is much shorter than his classmates because his body makes too little growth hormone. Which gland is not working properly?',
  right: 'Pituitary gland',
  wrong: ['Thyroid gland', 'Adrenal gland', 'Pancreas'],
  sol: 'Growth hormone is secreted by the pituitary gland; too little in childhood causes dwarfism — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('scare-mcq', mcq({
  stem: 'A stray bull suddenly charges at Kunal. His heart races, he breathes faster, and more blood flows to his leg muscles so that he can run. Which hormone causes these changes?',
  right: 'Adrenaline',
  wrong: ['Insulin', 'Thyroxine', 'Oestrogen'],
  sol: 'In an emergency the adrenal glands release adrenaline, which speeds up the heart and breathing and sends more blood to the muscles — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('puberty-mcq', mcq({
  stem: 'Which hormone brings about changes such as a deeper voice and facial hair in boys at puberty?',
  right: 'Testosterone',
  wrong: ['Oestrogen', 'Thyroxine', 'Insulin'],
  sol: 'Testosterone, made by the testes, causes the changes of puberty in boys — option (@K). Oestrogen does this in girls.',
  d: 1, c: 'recall', t: [6],
}));
add('diabetes-data-mcq', mcq({
  stem: 'A health camp in Lucknow measured the blood sugar of four adults after an overnight fast.\n\n| Person | P | Q | R | S |\n|---|---|---|---|---|\n| Fasting blood sugar (mg/dL) | 88 | 96 | 168 | 79 |\n\nA fasting value of 126 mg/dL or more, confirmed by a repeat test, suggests diabetes. Who should be sent for further tests, and which hormone is probably not acting properly?',
  right: 'R; insulin',
  wrong: ['S; insulin', 'R; adrenaline', 'P; thyroxine'],
  sol: 'Step 1 — Only R (168 mg/dL) is above 126 mg/dL.\n\nStep 2 — High blood sugar suggests too little insulin, or cells not responding to it — option (@K).\n\nStep 3 — S has the lowest value (@1); adrenaline (@2) and thyroxine (@3) are not the hormones that lower blood sugar.',
  d: 3, c: 'application', t: [6],
}));
add('hypothalamus-mcq', mcq({
  stem: 'A growth in a child’s hypothalamus damages it. Tests show that the pituitary gland itself is healthy, yet very little growth hormone is being released. Which explanation fits best?',
  right: 'The hypothalamus can no longer send the releasing hormones that stimulate the pituitary.',
  wrong: ['The hypothalamus makes growth hormone, so none is being made.', 'The pituitary has started making insulin instead of growth hormone.', 'The hypothalamus normally breaks down extra growth hormone in the blood.'],
  sol: 'Step 1 — The pituitary is healthy, so the problem is with the signal it receives.\n\nStep 2 — The hypothalamus releases hormones that stimulate the pituitary to release growth hormone; without them, little growth hormone is released — option (@K).\n\nStep 3 — Growth hormone is made by the pituitary, not the hypothalamus (@1); (@2) and (@3) describe things these glands do not do.',
  d: 4, c: 'analysis', t: [6],
}));
add('insulin-ar', ar({
  a: 'Diabetes can often be managed with injections of insulin.',
  r: 'Insulin is secreted by the adrenal glands.',
  key: 'c',
  sol: 'A is true: injected insulin helps lower blood sugar. R is false: insulin is secreted by the pancreas — option (c).',
  d: 2, c: 'understanding', t: [6],
}));
add('feedback-ar', ar({
  a: 'The amount of insulin released falls when blood sugar returns to normal.',
  r: 'The release of many hormones is regulated by a feedback mechanism.',
  key: 'a',
  sol: 'Both are true. Falling insulin release as sugar returns to normal is an example of feedback control, so R explains A — option (a).',
  d: 3, c: 'understanding', t: [6],
}));
add('hypothal-ar', ar({
  a: 'The hypothalamus helps to control the release of growth hormone.',
  r: 'The pituitary gland lies at the base of the brain.',
  key: 'b',
  sol: 'Both are true, but the position of the pituitary does not explain why the hypothalamus controls growth hormone; that is because the hypothalamus releases hormones that stimulate the pituitary — option (b).',
  d: 3, c: 'analysis', t: [6],
}));
add('target-ar', ar({
  a: 'A hormone acts only on the gland that releases it.',
  r: 'Hormones are carried by the blood to target cells away from the gland.',
  key: 'd',
  sol: 'A is false: hormones act on target cells elsewhere in the body. R is true — option (d).',
  d: 2, c: 'understanding', t: [6],
}));
add('endocrine-tf', tf({
  stem: 'Endocrine glands release their hormones directly into the blood.',
  key: 't',
  sol: 'True. Endocrine glands are ductless; their hormones pass directly into the blood.',
  d: 1, c: 'recall', t: [6],
}));
add('goitre-fill', fill({
  stem: 'A lack of iodine in the diet can cause ___, a swelling of the thyroid gland in the neck.',
  acc: [['goitre', 'goiter']],
  sol: 'Without iodine the thyroid cannot make enough thyroxine and enlarges: **goitre**.',
  d: 1, c: 'recall', t: [6],
}));
add('gland-match', match({
  stem: 'Match each gland in Column A with the hormone it secretes in Column B.',
  pairs: [['Pituitary', 'Growth hormone'], ['Thyroid', 'Thyroxine'], ['Pancreas', 'Insulin'], ['Adrenal', 'Adrenaline']],
  order: [3, 1, 0, 2],
  sol: 'Pituitary → growth hormone (1 → s); thyroid → thyroxine (2 → q); pancreas → insulin (3 → p); adrenal → adrenaline (4 → r).',
  d: 1, c: 'recall', t: [6],
}));
add('iodine-num', num({
  stem: 'An adult needs about 150 micrograms of iodine a day. A packet of iodised salt states that it contains 30 micrograms of iodine in every gram of salt. How many **grams** of this salt would supply one day’s iodine?',
  value: 5, tol: 0, unit: 'g',
  sol: r`Step 1 — Iodine needed $= 150\ \mu\text{g}$; iodine per gram of salt $= 30\ \mu\text{g}$.

Step 2 — Mass of salt $= \dfrac{150}{30} = 5$, so about $5\ \text{g}$ of salt a day.`,
  scheme: [['Divides 150 by 30 to get 5 g', 1]],
  d: 2, c: 'application', t: [6],
}), () => near(150 / 30, 5) || 'salt');
add('feedback-short', short({
  marks: 2,
  stem: 'What is meant by a feedback mechanism in the control of hormones? Explain with the example of insulin and blood sugar.',
  model: 'In a feedback mechanism, the **level** of a substance controls how much hormone is released, so that the timing and amount of the hormone are just right. When blood sugar rises after a meal, cells of the pancreas detect it and release **more insulin**. As blood sugar falls back to normal, **insulin release is reduced**.',
  sol: 'Define feedback, then describe both halves of the loop: more insulin when sugar is high, less when it is normal.',
  scheme: [['Meaning of feedback control', 1], ['Insulin example with both directions', 1]],
  d: 2, c: 'understanding', t: [6],
}));
add('diabetes-short', short({
  marks: 2,
  stem: 'A doctor tells Mr Iyer that his pancreas is not producing enough insulin.\n\n(a) What problem is he likely to have, and why?\n\n(b) Why may he be advised to take insulin injections and to limit sugary food?',
  model: '(a) **Diabetes**: without enough insulin, glucose is not taken up properly by the cells, so his blood sugar stays high.\n\n(b) Injected insulin does the job his pancreas cannot, lowering blood sugar. Limiting sugary food avoids sharp rises in blood sugar that his body cannot bring down.',
  sol: 'Step 1 — Link low insulin to high blood sugar (diabetes).\n\nStep 2 — Explain the two remedies in terms of blood sugar.',
  scheme: [['(a) Diabetes, with the reason', 1], ['(b) Both remedies explained', 1]],
  d: 3, c: 'application', t: [6],
}));
add('goitre-short', short({
  marks: 3,
  stem: 'A health survey in a hilly district finds that many people have a swelling in the front of the neck.\n\n(a) Name the condition and the gland involved.\n\n(b) Explain how a shortage in the diet leads to this condition.\n\n(c) Suggest one public health measure to prevent it.',
  model: '(a) **Goitre**; the **thyroid** gland.\n\n(b) The thyroid needs **iodine** to make **thyroxine**. Soil and water in some hilly areas contain little iodine, so people’s diets lack it. The thyroid cannot make enough thyroxine and enlarges, causing the swelling.\n\n(c) Make sure everyone uses **iodised salt**, for example through ration shops and awareness campaigns.',
  sol: 'Step 1 — Swollen neck → goitre → thyroid.\n\nStep 2 — Iodine shortage → too little thyroxine → enlarged gland.\n\nStep 3 — Iodised salt.',
  scheme: [['(a) Goitre and thyroid', 1], ['(b) Iodine needed for thyroxine; shortage enlarges the gland', 1], ['(c) Iodised salt (or another sensible measure)', 1]],
  d: 3, c: 'application', t: [6],
}));
add('nerve-vs-hormone-short', short({
  marks: 3,
  stem: 'Give three differences between nervous and hormonal coordination in animals.',
  model: '(1) Nervous coordination uses **electrical impulses** along neurons; hormonal coordination uses **chemical messengers** (hormones) carried in the blood. (2) Nerve messages are **very fast** and their effect is short-lived; hormones act **more slowly**, but their effect lasts longer. (3) Nerve impulses reach only the cells connected by nerves; hormones reach **all cells** through the blood, but only target cells respond.',
  sol: 'Compare the type of message, speed and duration, and how widely the message reaches.',
  scheme: [['Difference 1 (type of message)', 1], ['Difference 2 (speed or duration)', 1], ['Difference 3 (reach)', 1]],
  d: 2, c: 'understanding', t: [1, 6],
}));
add('adrenaline-long', long({
  stem: 'Late one evening, Divya is walking home when a dog suddenly barks and runs at her. She jumps back at once, and for several minutes afterwards her heart keeps pounding.\n\n(a) Which part of her response was controlled mainly by the nervous system, and which by a hormone? Explain.\n\n(b) Name the hormone and the gland that releases it.\n\n(c) Describe three changes the hormone causes in the body, and how each helps her face the danger.',
  model: '(a) Jumping back at once was controlled by the **nervous system**, which acts in a fraction of a second. The pounding heart that lasted for minutes was due to a **hormone**, which acts more slowly but for longer.\n\n(b) **Adrenaline**, released by the **adrenal glands** on top of the kidneys.\n\n(c) The heart beats faster, so more oxygen reaches the muscles. Small arteries around the digestive system and skin contract, so more blood goes to the skeletal muscles. Breathing becomes faster because the diaphragm and rib muscles contract more, so more oxygen is taken in. All three prepare her body to run or to defend herself.',
  sol: 'Step 1 — Fast and brief means nerves; slow and lasting means a hormone.\n\nStep 2 — Adrenaline from the adrenal glands.\n\nStep 3 — Heart rate, diversion of blood, breathing — each linked to more energy for the muscles.',
  scheme: [['(a) Nervous for the jump, hormonal for the lasting heartbeat, with reason', 1], ['(b) Adrenaline and adrenal glands (0.5 each)', 1], ['(c) Three changes, each with its benefit (1 each)', 3]],
  d: 3, c: 'application', t: [6],
}));
add('endocrine-long', long({
  stem: '(a) What are endocrine glands? Why are they called ductless glands?\n\n(b) Name the hormone secreted by each of these glands and state one function of each: thyroid, pancreas, pituitary, testes.\n\n(c) Explain, with an example, how a feedback mechanism controls the amount of a hormone released.',
  model: '(a) Endocrine glands make hormones, chemical messengers that act on target cells elsewhere in the body. They have no ducts and release their hormones **directly into the blood**, so they are called ductless glands.\n\n(b) Thyroid — **thyroxine**: controls the use of carbohydrates, proteins and fats. Pancreas — **insulin**: lowers blood sugar. Pituitary — **growth hormone**: controls growth and development. Testes — **testosterone**: brings about the changes of puberty in boys.\n\n(c) When blood sugar rises after a meal, the pancreas detects it and releases more insulin, which lowers the sugar. As the level returns to normal, insulin release is reduced. The level of sugar thus feeds back to control the amount of insulin.',
  sol: 'Step 1 — Define endocrine glands and explain "ductless".\n\nStep 2 — Four gland–hormone–function sets.\n\nStep 3 — Both halves of the feedback loop.',
  scheme: [['(a) Definition and reason for "ductless"', 1], ['(b) Four hormones with functions (0.5 each)', 2], ['(c) Feedback explained with an example in both directions', 2]],
  d: 3, c: 'understanding', t: [6],
}));

// ---------------------------------------------------------------- case-based
add('ruler-case', mk.case({
  passage: 'In a science club in Pune, students tested how quickly they react. One student held a 30 cm ruler upright, just above a partner’s open thumb and finger, and let it go without warning. The partner caught it as fast as possible, and the distance the ruler fell before being caught was noted: the shorter the distance, the quicker the reaction. Each result is the average of five tries for the same student. The reaction time was worked out from the distance using a formula from the club’s physics teacher.\n\n| Condition | Average distance fallen (cm) | Reaction time (s) |\n|---|---|---|\n| Alert, watching the ruler | 15 | 0.17 |\n| Counting backwards aloud while watching | 24 | 0.22 |\n| After ten practice rounds | 12 | 0.16 |',
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Catching the ruler in this test is best described as:',
      right: 'a voluntary action that needs the brain',
      wrong: ['a reflex action controlled only by the spinal cord', 'an involuntary action controlled by the medulla', 'a hormonal response caused by adrenaline'],
      sol: 'The partner must see the ruler fall and decide to close the fingers: eye → brain → hand muscles. It is a voluntary action — option (@K).',
      d: 2, c: 'understanding', t: [2],
    })),
    part('b', short({
      marks: 1,
      stem: 'Name the receptors that detect the start of the fall in this test.',
      model: '**Photoreceptors** in the eye (retina), because the partner sees the ruler begin to fall.',
      sol: 'The stimulus is seen, so the receptors are in the eye.',
      scheme: [['Photoreceptors in the eye', 1]],
      d: 2, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why the average distance was larger while counting backwards aloud, and smaller after practice.',
      model: 'While counting aloud, the brain is busy with another task, so it takes longer to process the sight of the falling ruler and send instructions to the hand: the distance rose from 15 cm to 24 cm. With practice, the brain becomes better at this pathway, so the response is quicker and the distance fell to 12 cm.',
      sol: 'From the table, the distance rose from 15 to 24 cm when distracted and fell from 15 to 12 cm after practice; link each change to the time the brain takes to process the signal and respond.',
      scheme: [['Distraction: the brain processes the signal more slowly (with data)', 1], ['Practice: a quicker response (with data)', 1]],
      d: 4, c: 'analysis', t: [1, 3],
    }), [
      short({
        marks: 2,
        stem: 'A student claims, "Catching the ruler is a reflex, because it is so fast." Use the data to evaluate this claim.',
        model: 'The claim is wrong. The reaction time rises from 0.17 s to 0.22 s when the catcher is distracted and falls to 0.16 s with practice, so the brain must be involved: the eye signals the brain, which instructs the hand. Spinal reflexes do not depend on attention like this. Catching the ruler is a quick **voluntary** action.',
        sol: 'Point out that the time depends on attention and practice, which means the brain is involved, so it is not a reflex.',
        scheme: [['Uses the data on attention or practice', 1], ['Concludes it is a voluntary action involving the brain', 1]],
        d: 4, c: 'evaluation', t: [2, 3],
      }),
    ]),
  ],
}), () => [[0.15, 0.17], [0.24, 0.22], [0.12, 0.16]].every(([d, t]) => Math.abs(Math.sqrt((2 * d) / 9.8) - t) < 0.006) || 'reaction times');
add('kitchen-case', mk.case({
  passage: 'Sana was helping her grandmother make rotis on a hot tava. While reaching for the dough, the back of her hand touched the edge of the tava. Before she even realised what had happened, her hand had jerked away. A moment later she felt a sharp, burning pain and cried out. Her grandmother cooled the spot under running tap water. "Your body protected you before you could think," she said. Sana’s brother, who studies biology, explained that the message from the skin had taken a short cut.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'In Sana’s response, the effector is:',
      right: 'the muscles of her arm',
      wrong: ['the skin on the back of her hand', 'her spinal cord', 'the sensory neuron from her hand'],
      sol: 'The effector carries out the response; her arm muscles contracted to pull the hand away — option (@K). The skin contains the receptors (@1); the spinal cord makes the connection (@2); the sensory neuron carries the impulse in (@3).',
      d: 2, c: 'understanding', t: [2],
    })),
    part('b', fill({
      stem: 'The "short cut" her brother mentioned is the reflex arc, in which the sensory and motor neurons are connected in the ___.',
      acc: [['spinal cord']],
      sol: 'The reflex arc is completed in the **spinal cord**.',
      d: 1, c: 'recall', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Trace the path of the message in Sana’s reflex, from the stimulus to the response.',
      model: 'Heat (stimulus) → heat and pain **receptors** in the skin → **sensory neuron** → **relay neuron** in the spinal cord → **motor neuron** → arm **muscles** (effector) contract → hand is pulled away.',
      sol: 'List the five parts of the reflex arc in order, starting from the stimulus.',
      scheme: [['Receptor, sensory neuron, relay neuron in the order given', 1], ['Motor neuron, effector and response', 1]],
      d: 3, c: 'application', t: [2],
      wl: null,
    }), [
      short({
        marks: 2,
        stem: 'Sana says, "My brain told my hand to move away." Is she correct? Explain.',
        model: 'No. Her hand moved because of a **reflex arc** completed in the **spinal cord**: the sensory neuron passed the message to a motor neuron through a relay neuron, without waiting for the brain. The message reached her brain only afterwards, which is why she felt the pain a moment later.',
        sol: 'Judge the claim using the location of the reflex arc and the timing of the pain.',
        scheme: [['States the claim is incorrect: the spinal cord produced the movement', 1], ['Explains the brain was informed afterwards (pain felt later)', 1]],
        d: 3, c: 'evaluation', t: [2],
      }),
    ]),
  ],
}));
add('helmet-case', mk.case({
  passage: 'At a road-safety talk in a Chennai school, Dr Fernandes explained that the brain is soft and floats in a fluid inside the bony skull. In a crash, the head stops suddenly, and the brain can be thrown against the skull. She described two patients from her hospital. Patient X, a scooter rider without a helmet, was injured at the lower back of the head. He remembers everything and speaks normally, but walks unsteadily and cannot touch his nose accurately with a finger. Patient Y was injured where the brain joins the spinal cord; for some days, machines and medicines were needed to keep his blood pressure and breathing steady.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which part of Patient X’s brain is most likely injured?',
      right: 'Cerebellum',
      wrong: ['Cerebrum', 'Medulla', 'Midbrain'],
      sol: 'Unsteady walking and inaccurate movements, with normal memory and speech, point to the cerebellum, which controls balance and precision — option (@K).',
      d: 3, c: 'application', t: [3],
    })),
    part('b', short({
      marks: 1,
      stem: 'Name the part of the hindbrain most likely injured in Patient Y.',
      model: 'The **medulla**, which controls blood pressure (the hindbrain, including the pons, also helps regulate breathing).',
      sol: 'Where the brain joins the spinal cord, controlling blood pressure: the medulla.',
      scheme: [['Medulla', 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Why is an injury like Patient Y’s usually more dangerous to life than Patient X’s?',
      model: 'The medulla and nearby hindbrain control **involuntary functions needed for life**, such as blood pressure and breathing; if they fail, the person cannot survive without support. The cerebellum controls balance and the precision of movement; damage to it makes movement clumsy but does not stop these vital functions.',
      sol: 'Compare the functions of the two parts: vital involuntary control versus balance and precision.',
      scheme: [['Medulla controls vital involuntary functions', 1], ['Cerebellum damage affects coordination, not survival', 1]],
      d: 4, c: 'analysis', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'How do the skull and the fluid protect the brain, and how does a helmet add to this protection?',
        model: 'The hard skull forms a bony box that stops objects from reaching the brain, and the fluid around the brain acts as a cushion that absorbs shocks. A helmet adds a padded outer layer that spreads and absorbs the force of a blow before it reaches the skull, so less force reaches the brain.',
        sol: 'Describe the role of the bone and of the fluid, then the extra cushioning given by the helmet.',
        scheme: [['Skull as a bony box and fluid as a shock absorber', 1], ['Helmet absorbs and spreads the force', 1]],
        d: 3, c: 'understanding', t: [3],
      }),
    ]),
  ],
}));
add('seedling-case', mk.case({
  passage: 'Students in Bhopal grew maize seedlings in three identical shoe boxes for three days, at the same temperature and with the same watering.\n\n| Box | Set-up | Result after three days |\n|---|---|---|\n| A | Hole cut in the right side; lamp outside the hole | Shoots bent about 40 degrees towards the hole |\n| B | No hole; box kept completely dark | Shoots grew straight up, tall, thin and pale |\n| C | Hole in the right side, lamp outside, but each shoot tip covered with a small foil cap | Shoots grew straight up |',
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which box shows positive phototropism?',
      right: 'Box A',
      wrong: ['Box B', 'Box C', 'Boxes B and C'],
      sol: 'Only in box A did the shoots grow towards the light — option (@K).',
      d: 1, c: 'understanding', t: [4],
    })),
    part('b', short({
      marks: 1,
      stem: 'Why did the shoots in box C not bend, although light entered from one side?',
      model: 'The foil caps stopped the **tips** from sensing the direction of light, so auxin was not moved to one side and growth stayed even.',
      sol: 'The tip senses light; covering it prevents the unequal spread of auxin.',
      scheme: [['Tip covered, so the direction of light is not sensed and auxin stays even', 1]],
      d: 3, c: 'analysis', t: [4, 5],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain, in terms of auxin, why the shoots in box A bent towards the hole.',
      model: 'Auxin is made at the shoot tip. With light coming from the right, auxin moved to the **shaded left side** of each shoot. Cells on the left side **grew longer** than those on the lit side, so the shoots curved to the right, towards the hole.',
      sol: 'Auxin made at the tip, moves to the shaded side, cells there elongate more, so the shoot curves towards the light.',
      scheme: [['Auxin moves to the shaded side', 1], ['Greater elongation there bends the shoot towards the light', 1]],
      d: 3, c: 'understanding', t: [5],
    }), [
      short({
        marks: 2,
        stem: 'After the three days, the students turn box A around so that the hole now faces left. Predict what will happen to the shoots over the next three days, and explain.',
        model: 'The growing tips will gradually curve towards the **left**, where the hole now is. Light now comes from the left, so auxin moves to the new shaded (right) side, and cells there grow longer. The older, lower parts stay bent, because they have stopped growing.',
        sol: 'Apply the auxin mechanism to light from the new direction; note that only the growing region can respond.',
        scheme: [['Predicts the shoots curve towards the left', 1], ['Explains with auxin on the new shaded side', 1]],
        d: 4, c: 'analysis', t: [4, 5],
      }),
    ]),
  ],
}));
add('grape-case', mk.case({
  passage: 'Mr Pawar grows table grapes near Nashik. A few weeks after flowering, he sprays a dilute solution of a plant hormone on the bunches. The stalks of the bunches grow longer, the grapes are less crowded, and the berries grow larger. His neighbour, whose vines were not watered during a long dry spell, noticed that the leaves drooped and the vines almost stopped growing; an agricultural officer explained that a growth-inhibiting hormone had built up in them. The officer added that the developing berries are rich in another hormone, because their cells are dividing rapidly.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The hormone Mr Pawar sprays to make the bunch stalks grow longer is most likely:',
      right: 'gibberellin',
      wrong: ['abscisic acid', 'cytokinin', 'insulin'],
      sol: 'Gibberellins help stems and stalks to grow — option (@K). Abscisic acid inhibits growth (@1); cytokinin mainly promotes cell division (@2); insulin is an animal hormone (@3).',
      d: 2, c: 'application', t: [5],
    })),
    part('b', short({
      marks: 1,
      stem: 'Name the hormone that built up in the neighbour’s vines during the dry spell.',
      model: '**Abscisic acid** (it inhibits growth and causes wilting).',
      sol: 'Drooping leaves and stopped growth point to abscisic acid.',
      scheme: [['Abscisic acid', 1]],
      d: 2, c: 'application', t: [5],
    })),
    part('c', short({
      marks: 2,
      stem: 'Why are the developing berries richer in cytokinins than the older leaves of the vine?',
      model: 'Cytokinins **promote cell division**. The developing berries are growing quickly and their cells are dividing rapidly, so they contain more cytokinins; older leaves have stopped growing, so they need far less.',
      sol: 'Link cytokinins to cell division and compare a growing berry with an old leaf.',
      scheme: [['Cytokinins promote cell division', 1], ['Berries have rapid cell division; old leaves do not', 1]],
      d: 3, c: 'understanding', t: [5],
    }), [
      short({
        marks: 2,
        stem: 'Mr Pawar’s cousin suggests spraying abscisic acid to make the vines grow faster. Evaluate this suggestion.',
        model: 'The suggestion is wrong. Abscisic acid **inhibits growth** and causes wilting, so spraying it would slow the vines down rather than speed them up. To promote growth of the stalks, a growth-promoting hormone such as **gibberellin** is used.',
        sol: 'Compare the effect of abscisic acid with the aim of faster growth.',
        scheme: [['States that abscisic acid inhibits growth, so the suggestion fails', 1], ['Names a growth-promoting hormone instead', 1]],
        d: 3, c: 'evaluation', t: [5],
      }),
    ]),
  ],
}));
add('glucose-case', mk.case({
  passage: 'For a school health project, Dr Nair asked two adult volunteers to come without breakfast. Each drank the same glucose drink, and their blood glucose was measured every 30 minutes.\n\n| Time after the drink (min) | 0 | 30 | 60 | 90 | 120 |\n|---|---|---|---|---|---|\n| Volunteer A (mg/dL) | 88 | 150 | 125 | 100 | 90 |\n| Volunteer B (mg/dL) | 140 | 230 | 255 | 240 | 215 |\n\nDr Nair explained that in a healthy person a hormone from the pancreas brings the level back down within about two hours.',
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which hormone brought Volunteer A’s blood glucose down after 30 minutes?',
      right: 'Insulin',
      wrong: ['Adrenaline', 'Thyroxine', 'Growth hormone'],
      sol: 'Insulin from the pancreas lowers blood sugar — option (@K).',
      d: 1, c: 'recall', t: [6],
    })),
    part('b', num({
      stem: 'By how many mg/dL did Volunteer A’s blood glucose fall between 30 minutes and 120 minutes?',
      value: 60, tol: 0, unit: 'mg/dL',
      sol: r`Fall $= 150 - 90 = 60$ mg/dL.`,
      scheme: [['60 mg/dL', 1]],
      d: 2, c: 'application', t: [6],
    })),
    part('c', short({
      marks: 2,
      stem: 'Use the idea of feedback to explain why Volunteer A’s blood glucose returned to about its starting value and did not keep falling.',
      model: 'When the glucose rose to 150 mg/dL, the pancreas detected the high level and released **more insulin**, so the level fell. As it came back towards normal (90 mg/dL at 120 minutes), the pancreas **reduced** insulin release. Because the glucose level itself controls how much insulin is made, the level settles near normal instead of falling too low.',
      sol: 'Describe both halves of the loop and refer to the data.',
      scheme: [['High glucose → more insulin → level falls (with data)', 1], ['Near-normal glucose → less insulin, so the level steadies', 1]],
      d: 4, c: 'analysis', t: [6],
    }), [
      short({
        marks: 2,
        stem: 'Suggest why Volunteer B’s blood glucose stayed high, and give two ways in which B could manage the condition.',
        model: 'B’s pancreas is probably not making enough insulin (or B’s cells do not respond to it), so glucose stays in the blood: B may have **diabetes**, to be confirmed by a doctor. B could manage it with a **low-sugar diet**, regular **exercise** and, if advised, **medicines or insulin injections**.',
        sol: 'Link the persistently high level to too little insulin action, then give two sensible management steps.',
        scheme: [['Too little insulin (or poor response) as the reason', 1], ['Two ways to manage the condition (0.5 each)', 1]],
        d: 3, c: 'application', t: [6],
      }),
    ]),
  ],
}), (q) => near(150 - 90, q.children[1].answer.value) || 'fall');

