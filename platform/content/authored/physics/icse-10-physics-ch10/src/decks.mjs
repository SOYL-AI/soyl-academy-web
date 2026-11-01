// ICSE 10 Physics ch10 Electromagnetism — two decks: Part 1 (t01–t03) Oersted's experiment, fields of a straight wire, a
// loop and a solenoid, the right-hand thumb rule, electromagnets, the force on a conductor, Fleming's left-hand rule and
// the parts of a DC motor; Part 2 (t04–t05) electromagnetic induction, Fleming's right-hand rule, the parts of an AC
// generator, household AC, advantages of AC and transformers. Per the syllabus, the motor and generator are treated by
// parts and energy transfer only (their working is not described).
import { sl, deck, table, flow, svgV, plot, r } from './lib.mjs';
import { OERSTED, WIRE_FIELD, LOOP_FIELD, SOLENOID, ELECTROMAGNET, FLEMING_LEFT, FLEMING_RIGHT, INDUCTION, DC_MOTOR, AC_GENERATOR, TRANSFORMER } from './svgs.mjs';

const V = {
  oersted: svgV(OERSTED, 'A compass below a wire points north with no current and is deflected when a current flows'),
  wire: svgV(WIRE_FIELD, 'Concentric circular field lines round a straight wire: anticlockwise for current out of the page, clockwise for current into it'),
  loop: svgV(LOOP_FIELD, 'Field lines of a circular loop seen edge-on: circles round each crossing and a nearly straight field along the axis at the centre'),
  solenoid: svgV(SOLENOID, 'A solenoid with straight field lines inside and loops outside, north at the right end and south at the left'),
  emag: svgV(ELECTROMAGNET, 'A solenoid on a soft iron core connected to a battery and key, with iron pins clinging to its north end'),
  left: svgV(FLEMING_LEFT, 'A conductor carrying current into the page between north and south poles, with a downward force on it'),
  right: svgV(FLEMING_RIGHT, 'A conductor pushed upwards between north and south poles, with an induced current into the page'),
  induction: svgV(INDUCTION, 'A bar magnet pushed into a coil connected to a galvanometer, with the needle deflecting'),
  motor: svgV(DC_MOTOR, 'Parts of a DC motor: magnet poles, coil ABCD, split ring commutator, carbon brushes and battery'),
  gen: svgV(AC_GENERATOR, 'Parts of an AC generator: magnet poles, armature coil, two slip rings, carbon brushes and a lamp'),
  trans: svgV(TRANSFORMER, 'A step-down transformer with 1100 turns on the primary and 60 turns on the secondary, giving 12 volts from 220 volts'),
  ac: plot(
    {
      x: { min: 0, max: 40, label: 'time (ms)' },
      y: { min: -350, max: 350, label: 'mains voltage (V)' },
      functions: [{ expr: '311sin(pi*x/10)', label: 'household AC, 50 Hz', domain: [0, 40] }],
      points: [{ at: [5, 311], label: 'crest' }, { at: [15, -311], label: 'trough: direction reversed' }],
    },
    'Graph of household mains voltage against time over forty milliseconds. The voltage rises and falls smoothly like a wave, changing direction every ten milliseconds and completing one full cycle every twenty milliseconds, so there are fifty cycles each second.',
    'One cycle takes 20 ms, so the frequency is 1 ÷ 0.02 s = 50 Hz.',
  ),
};

export const deck1 = deck({
  part: 1,
  title: 'Electromagnetism — Part 1: Magnetic effect of a current',
  goals: [
    'Describe Oersted’s experiment and draw the field of a straight wire and a loop',
    'Use the right-hand thumb rule to find the direction of a magnetic field',
    'Describe a solenoid and an electromagnet; list ways to make an electromagnet stronger',
    'Use Fleming’s left-hand rule and name the parts of a DC motor and its energy conversion',
  ],
  slides: [
    sl('title', 'Electricity that behaves like a magnet', {
      b: 'Part 1 — a wire carrying current is surrounded by a magnetic field. Coils of wire make electromagnets, and a magnet can push on a wire that carries current.',
      v: table(['Device', 'Uses the magnetic effect of current by'], [['Electric bell', 'An electromagnet pulls an iron striker'], ['Crane in a scrapyard', 'A large electromagnet lifts iron'], ['Ceiling fan', 'A motor: force on coils in a magnetic field'], ['Loudspeaker', 'Force on a coil makes a cone vibrate']], 'Table of devices that use the magnetic effect of an electric current'),
      n: 'Namaste! In this part we discover that an electric current behaves like a magnet. A wire carrying current pushes a compass needle aside. Wind the wire into a coil and you get an electromagnet that you can switch on and off. Put a current-carrying wire near a magnet and it is pushed, which is how every electric motor turns.',
    }),
    sl('diagram', 'Oersted’s experiment', {
      b: 'In 1820 **Hans Christian Oersted** placed a compass needle just below a wire stretched along the north–south line. With **no current**, the needle pointed north along the wire. When a **current flowed**, the needle was **deflected**; reversing the current reversed the deflection. **Conclusion:** an electric current produces a **magnetic field** around it.',
      v: V.oersted,
      n: 'Over two hundred years ago, Oersted noticed something surprising. A compass needle lying under a wire turned away from north as soon as a current flowed in the wire. When he reversed the current, the needle turned the other way. He concluded that an electric current produces a magnetic field around it. This linked electricity and magnetism for the first time.',
    }),
    sl('diagram', 'Field of a straight wire; the right-hand thumb rule', {
      b: 'The field lines round a long straight wire are **concentric circles** centred on the wire, in a plane at right angles to it. The field is **stronger close to the wire** and **stronger for a larger current**. **Right-hand thumb rule:** hold the wire in the right hand with the **thumb along the current**; the **curled fingers** show the **direction of the field lines**.',
      v: V.wire,
      n: 'Around a straight wire the field lines are circles with the wire at their centre. They are close together near the wire, where the field is strong, and spread out farther away. To find their direction, grip the wire in your right hand with your thumb along the current. Your fingers curl the way the field lines go.',
    }),
    sl('check', 'Quick check: the right-hand thumb rule', {
      b: 'Find the direction of the field beside a wire.',
      n: 'Quick check. Point your right thumb along the current and see which way your fingers curl.',
      chk: 'thumb-mcq',
    }),
    sl('diagram', 'Field of a circular loop', {
      b: 'Bend the wire into a **circular loop**. Near each part of the wire the lines are still small circles, but towards the **centre** they become **almost straight** and point **along the axis** of the loop. All the field lines inside the loop point the same way, so the loop behaves like a **thin flat magnet**: one face is a **north** pole and the other a **south** pole. More turns or more current give a stronger field at the centre.',
      v: V.loop,
      n: 'When the wire is bent into a loop, the circles round each part of the wire all point the same way inside the loop. Near the centre they join up into almost straight lines along the axis. So a current loop acts like a flat magnet, with a north face and a south face. More current, or more turns, make it stronger.',
    }),
    sl('diagram', 'The solenoid', {
      b: 'A **solenoid** is a long coil of many turns of insulated wire. Its field is like that of a **bar magnet**: inside, the lines are **straight and parallel** (a nearly uniform field); outside, they loop from one end to the other. **Polarity (clock rule):** look at an end — if the current there flows **anticlockwise**, that end is a **north** pole; **clockwise** — a **south** pole.',
      v: V.solenoid,
      n: 'A solenoid is a long coil with many turns. Its field looks just like a bar magnet’s field. Inside the coil the lines are straight and evenly spaced. Outside, they loop round from one end to the other. To name the poles, look at one end. If the current there goes anticlockwise, that end is a north pole. If it goes clockwise, it is a south pole.',
    }),
    sl('example', 'Worked example: which electromagnet is stronger?', {
      b: r`**Problem.** Two coils are wound on identical soft iron cores. Coil P has 200 turns and carries 1.5 A; coil Q has 500 turns and carries 0.5 A. The strength of each electromagnet increases with both the number of turns and the current. Compare them using N × I.

**P:** $N \times I = 200 \times 1.5 = 300$.

**Q:** $N \times I = 500 \times 0.5 = 250$.

**Answer:** P is the stronger electromagnet, although Q has more turns.`,
      v: table(['Coil', 'Turns N', 'Current I (A)', 'N × I'], [['P', '200', '1.5', '300'], ['Q', '500', '0.5', '250']], 'Table comparing turns, current and their product for two electromagnets'),
      n: 'Both the number of turns and the current make an electromagnet stronger, so we compare turns times current. Coil P has two hundred turns carrying one and a half amperes, giving three hundred. Coil Q has five hundred turns but only half an ampere, giving two hundred and fifty. So P is stronger, even though Q has more turns.',
    }),
    sl('concept', 'Electromagnets and permanent magnets', {
      b: 'An **electromagnet** is a solenoid wound on a **soft iron core**. Soft iron is **strongly magnetised** while current flows and **loses almost all its magnetism** when the current stops. **To make it stronger:** increase the **number of turns**, increase the **current**, use a **soft iron core** (a U-shaped core brings the poles close together). **Uses:** electric bell, cranes that lift scrap iron, relays, separating iron from waste, loudspeakers and motors.',
      v: table(['Feature', 'Electromagnet', 'Permanent magnet'], [['Magnetism', 'Only while current flows', 'Always present'], ['Strength', 'Can be changed with current or turns', 'Fixed'], ['Polarity', 'Reversed by reversing the current', 'Fixed'], ['Core material', 'Soft iron', 'Steel or special alloys']], 'Table comparing an electromagnet with a permanent magnet'),
      n: 'An electromagnet is a coil wound on soft iron. Soft iron becomes a strong magnet while current flows and loses its magnetism as soon as the current stops. To make it stronger, add more turns, increase the current or use a soft iron core. Unlike a permanent magnet, it can be switched off, its strength can be changed, and its poles can be reversed.',
    }),
    sl('diagram', 'An electromagnet at work', {
      b: 'With the key **closed**, current in the coil magnetises the soft iron core and it **attracts iron pins**. When the key is **opened**, the core is **demagnetised** and the pins **drop**. A **steel** core would keep some magnetism, so the pins would not fall — which is why electromagnets use **soft iron**.',
      v: V.emag,
      n: 'Close the key and the core becomes a magnet that picks up iron pins. Open the key and the pins fall at once, because soft iron does not stay magnetised. If the core were made of steel, it would keep some of its magnetism and hold on to the pins. That is why the core of an electromagnet is always soft iron.',
    }),
    sl('check', 'Quick check: electromagnets', {
      b: 'Decide how to make an electromagnet stronger.',
      n: 'Quick check. Think of turns, current and the core material.',
      chk: 'emag-mcq',
    }),
    sl('diagram', 'Force on a conductor; Fleming’s left-hand rule', {
      b: 'A conductor carrying a current in a magnetic field experiences a **force**. The force is **greatest** when the conductor is **at right angles** to the field and **zero** when it lies **along** the field. Reversing either the current or the field reverses the force. **Fleming’s left-hand rule:** stretch the **thumb, forefinger and middle finger** of the **left hand** at right angles. **Forefinger → field, middle finger → current, thumb → force (motion).**',
      v: V.left,
      n: 'A wire carrying current between the poles of a magnet is pushed sideways. The push is strongest when the wire is at right angles to the field, and there is no push when the wire lies along the field. To find the direction, use your left hand. Forefinger along the field, middle finger along the current, and your thumb shows the force.',
    }),
    sl('example', 'Worked example: using the left-hand rule', {
      b: '**Problem.** A horizontal wire runs from west to east and carries a current towards the east. A magnetic field acts vertically **downwards** on it. Find the direction of the force on the wire.\n\n**Step 1.** Forefinger (field): point it **down**.\n\n**Step 2.** Middle finger (current): point it **east**.\n\n**Step 3.** Thumb (force): it points **north**.\n\n**Answer:** the wire is pushed **towards the north**, horizontally.',
      v: table(['Finger of the left hand', 'Points along', 'Direction here'], [['Forefinger', 'Field', 'Vertically down'], ['Middle finger', 'Current', 'East'], ['Thumb', 'Force', 'North']], 'Table applying Fleming’s left-hand rule to a wire carrying current east in a downward field'),
      n: 'Set your left hand step by step. Point your forefinger down, along the field. Turn your hand so the middle finger points east, along the current. Your thumb now points north. So the wire is pushed towards the north. Practise this with your own hand, keeping all three fingers at right angles.',
    }),
    sl('diagram', 'The DC motor: parts and energy', {
      b: 'A **DC motor** converts **electrical energy into mechanical (kinetic) energy**. Its main parts: a strong **field magnet** (N and S poles); a rectangular **coil (armature)** ABCD of many turns on a soft iron core, free to turn on an **axle**; a **split ring commutator** joined to the ends of the coil; two **carbon brushes** pressing on the split rings and joined to the **battery**. Motors are used in fans, mixers, washing machines and electric vehicles.',
      v: V.motor,
      n: 'An electric motor turns electrical energy into motion. Its main parts are a strong magnet, a coil called the armature that can turn on an axle, a split ring commutator joined to the ends of the coil, and two carbon brushes that press on the split rings and connect the coil to the battery. Fans, mixers and washing machines all contain motors.',
    }),
    sl('check', 'Quick check: the DC motor', {
      b: 'Recall the energy change in a DC motor.',
      n: 'Quick check. A motor takes in electrical energy. What does it give out?',
      chk: 'motor-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Oersted: a current produces a magnetic field around it.',
        'Straight wire: concentric circles; right-hand thumb rule gives the direction.',
        'Loop and solenoid: field like a magnet; clock rule — anticlockwise end is N.',
        'Electromagnet: coil on soft iron; stronger with more turns, more current; temporary, adjustable, reversible.',
        'Force on a conductor: Fleming’s left-hand rule; DC motor: electrical → mechanical energy.',
      ],
      v: table(['Rule', 'Gives'], [['Right-hand thumb rule', 'Field direction round a wire'], ['Clock rule', 'Pole at the end of a solenoid'], ['Fleming’s left-hand rule', 'Force on a current in a field']], 'Summary table of the three rules of Part 1'),
      n: 'Let us sum up Part 1. A current makes a magnetic field. Round a straight wire the lines are circles, and the right-hand thumb rule gives their direction. A loop or a solenoid behaves like a magnet. Wound on soft iron, a solenoid becomes an electromagnet. A current in a magnetic field feels a force, given by the left-hand rule, and a motor uses it.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Use the right hand for the field of a current and the left hand for the force on a current.',
        'Draw field lines round a wire as circles that get farther apart away from the wire, with arrows.',
        'For a solenoid, look at the end and use the clock rule: clockwise is S, anticlockwise is N.',
        'For the DC motor, name the parts and the energy change; do not confuse split rings with slip rings.',
      ],
      v: table(['Slip', 'Fix'], [['Left hand for the field of a wire', 'Right-hand thumb rule'], ['Steel core for an electromagnet', 'Soft iron core'], ['Force when the wire lies along the field', 'No force in that case']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some tips. Use your right hand for the field round a wire, and your left hand for the force on a wire in a field. Draw field lines with arrows, spreading out away from the wire. Use the clock rule for the ends of a solenoid. For the motor, learn its parts and its energy change, and remember that a motor uses split rings.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Electromagnetism — Part 2: Induction, generators and transformers',
  goals: [
    'Describe how moving a magnet near a coil induces a current, and what affects its size',
    'Use Fleming’s right-hand rule to find the direction of an induced current',
    'Name the parts of an AC generator and state its energy conversion; relate frequency and period of household AC',
    'Give the advantages of AC and compare step-up and step-down transformers',
  ],
  slides: [
    sl('title', 'Making electricity with magnets', {
      b: 'Part 2 — a changing magnetic field can **create** a current. This idea powers every generator in a power station and every transformer on the way to your home.',
      v: table(['Device', 'Idea used'], [['Bicycle dynamo', 'Magnet turning near a coil'], ['Power station generator', 'Coil turned in a magnetic field'], ['Phone charger', 'Step-down transformer'], ['Pole transformer', 'Step-down to 220 V']], 'Table of devices that use electromagnetic induction'),
      n: 'In the first part, a current made a magnetic field. Now we turn the idea round. A changing magnetic field can make a current flow in a coil. This is called electromagnetic induction. It is how power stations generate electricity and how transformers change the voltage before it reaches your home.',
    }),
    sl('diagram', 'Electromagnetic induction', {
      b: 'Connect a coil to a **galvanometer**. **Push a magnet into the coil:** the needle deflects. **Hold it still:** no deflection. **Pull it out:** the needle deflects the **other way**. A current is induced **only while the magnetic field linked with the coil is changing**. Moving the coil instead of the magnet has the same effect. This is **electromagnetic induction**; the current is an **induced current**.',
      v: V.induction,
      n: 'Join a coil to a galvanometer and push a magnet into it. The needle moves. Hold the magnet still and the needle returns to zero. Pull the magnet out and the needle moves the other way. A current flows only while the magnetic field through the coil is changing. This effect is called electromagnetic induction.',
    }),
    sl('concept', 'What makes the induced current larger?', {
      b: 'The induced current is **larger** when: (1) the magnet or coil moves **faster**; (2) the coil has **more turns**; (3) a **stronger magnet** is used; (4) the coil has a **soft iron core**. It is **reversed** when the motion is reversed or the other pole is used. There is **no** induced current without **relative motion** (or another change in the field).',
      v: table(['Change', 'Effect on the deflection'], [['Magnet moved in faster', 'Larger'], ['Coil with more turns', 'Larger'], ['Stronger magnet', 'Larger'], ['Magnet pulled out instead', 'Reversed'], ['Magnet at rest', 'Zero']], 'Table of changes and their effect on the induced current'),
      n: 'You can increase the induced current in four ways. Move the magnet faster, use a coil with more turns, use a stronger magnet, or put soft iron inside the coil. Reversing the motion, or using the other pole, reverses the current. And if nothing moves and nothing changes, there is no induced current at all.',
    }),
    sl('check', 'Quick check: induction', {
      b: 'Decide when a current is induced.',
      n: 'Quick check. A current is induced only while the magnetic field through the coil is changing.',
      chk: 'induce-mcq',
    }),
    sl('diagram', 'Fleming’s right-hand rule', {
      b: 'When a **straight conductor moves across a magnetic field**, a current is induced in it (if the circuit is complete). **Fleming’s right-hand rule:** stretch the thumb, forefinger and middle finger of the **right hand** at right angles. **Thumb → motion, forefinger → field, middle finger → induced current.** Use the **right** hand for **generators** (induced current) and the **left** hand for **motors** (force).',
      v: V.right,
      n: 'Move a straight wire across a magnetic field and a current is induced in it. To find its direction, use your right hand. Point your thumb along the motion and your forefinger along the field. Your middle finger then gives the induced current. Remember, the right hand is for generators, and the left hand is for motors.',
    }),
    sl('example', 'Worked example: direction of an induced current', {
      b: '**Problem.** A straight wire lies between a north pole on the left and a south pole on the right. It is pushed **downwards** across the field. Find the direction of the induced current.\n\n**Step 1.** Field (forefinger): from N to S, that is **to the right**.\n\n**Step 2.** Motion (thumb): **downwards**.\n\n**Step 3.** Induced current (middle finger): **out of the page**, towards you.\n\n**Check:** pushing the wire **up** instead gives a current **into** the page, as in the figure.',
      v: table(['Finger of the right hand', 'Points along', 'Direction here'], [['Thumb', 'Motion', 'Down'], ['Forefinger', 'Field', 'Right (N to S)'], ['Middle finger', 'Induced current', 'Out of the page']], 'Table applying Fleming’s right-hand rule to a wire pushed down between the poles'),
      n: 'Set your right hand step by step. Forefinger to the right, from north to south. Thumb pointing down, along the motion. Your middle finger now points towards you, out of the page, so that is the direction of the induced current. If the wire is pushed up instead, everything reverses and the current flows into the page.',
    }),
    sl('diagram', 'The AC generator: parts and energy', {
      b: 'An **AC generator** converts **mechanical energy into electrical energy**. Its main parts: a **field magnet** (N and S poles); an **armature coil** ABCD of many turns, turned on an **axle** by a turbine or engine; **two slip rings**, each a full ring joined to one end of the coil; and two **carbon brushes** that press on the slip rings and lead the current to the **external circuit**. The output current is **alternating**.',
      v: V.gen,
      n: 'A generator does the opposite job to a motor. It turns mechanical energy into electrical energy. Its main parts are a strong magnet, an armature coil turned on an axle by a turbine or an engine, two complete slip rings, one joined to each end of the coil, and two carbon brushes that carry the current out to the circuit.',
    }),
    sl('diagram', 'Household AC: frequency 50 Hz', {
      b: 'In **alternating current (AC)** the current keeps **reversing its direction**; in **direct current (DC)** it flows one way only (cells, batteries). The household supply in India is AC of **frequency 50 Hz**: **50 complete cycles every second**. One cycle takes $T = \\dfrac{1}{f} = 0.02$ s (20 ms), and the direction reverses **twice in each cycle**.',
      v: V.ac,
      n: 'The current from a cell flows one way only. This is direct current. The current from the mains keeps reversing direction. This is alternating current. In India it completes fifty cycles every second, so its frequency is fifty hertz. Each cycle lasts twenty milliseconds, and the direction changes twice in every cycle.',
    }),
    sl('example', 'Worked example: frequency and period', {
      b: r`**Problem.** (a) Find the time for one cycle of the 50 Hz mains. (b) How many times does the current change direction in one second? (c) How many cycles are completed in 2 minutes?

**(a)** $T = \dfrac{1}{50} = 0.02$ s, that is 20 ms.

**(b)** Two reversals per cycle: $2 \times 50 = 100$ times.

**(c)** $50 \times 120 = 6000$ cycles.`,
      v: table(['Quantity', 'Value'], [['Frequency', '50 Hz'], ['Time for one cycle', '0.02 s = 20 ms'], ['Reversals per second', '100'], ['Cycles in 2 minutes', '6000']], 'Table of the frequency, period and number of reversals of household AC'),
      n: 'The period is one divided by the frequency, so one divided by fifty gives two hundredths of a second, or twenty milliseconds. The current reverses twice in every cycle, so it changes direction a hundred times each second. In two minutes, which is one hundred and twenty seconds, the supply completes six thousand cycles.',
    }),
    sl('check', 'Quick check: household AC', {
      b: 'Relate the period and the frequency of the mains.',
      n: 'Quick check. Frequency is one divided by the time for one cycle.',
      chk: 'freq-mcq',
    }),
    sl('concept', 'Advantages of AC over DC', {
      b: '**Advantages of AC:** (1) its voltage can be **stepped up or down easily with transformers**, so power can be sent at a very high voltage and a small current, with **little loss** in the lines; (2) AC generators are **simpler and cheaper** to build for large power; (3) AC can easily be **converted into DC** (rectified) when needed. **DC** is still needed for **charging batteries**, **electroplating** and electronic circuits.',
      v: table(['Feature', 'AC', 'DC'], [['Direction', 'Reverses (50 times each way per second)', 'One way only'], ['Change of voltage', 'Easy, with a transformer', 'Not with a transformer'], ['Source', 'AC generator, mains', 'Cell, battery, solar cell'], ['Needed for', 'Long-distance transmission', 'Charging, electroplating']], 'Table comparing alternating and direct current'),
      n: 'Why is the mains supply alternating? The main reason is that alternating current can be stepped up or down easily with a transformer. Power can be sent at a very high voltage with a small current, so little energy is lost in the wires. Direct current is still needed for charging batteries and for electroplating.',
    }),
    sl('diagram', 'The transformer', {
      b: 'A **transformer** changes an **alternating voltage**. It has a **primary coil** (connected to the AC input) and a **secondary coil** (giving the output), wound on a **laminated soft iron core**. The voltages are in the ratio of the turns: $\\dfrac{V_{s}}{V_{p}} = \\dfrac{N_{s}}{N_{p}}$. **Step-up:** $N_{s} > N_{p}$, so $V_{s} > V_{p}$. **Step-down:** $N_{s} < N_{p}$, so $V_{s} < V_{p}$. A transformer **does not work on steady DC**.',
      v: V.trans,
      n: 'A transformer has two coils on a soft iron core. The primary coil takes in alternating current, and the secondary coil gives out a different voltage. If the secondary has more turns, the voltage goes up, and it is a step-up transformer. If it has fewer turns, the voltage goes down, and it is a step-down transformer. It does not work with steady direct current.',
    }),
    sl('example', 'Worked example: transformer voltages', {
      b: r`**Problem.** (a) A step-down transformer in a doorbell has 2200 turns on its primary and 80 turns on its secondary. Find the output voltage from the 220 V mains. (b) A step-up transformer raises 220 V to 4400 V. Its primary has 150 turns. How many turns are on the secondary?

**(a)** $V_{s} = V_{p} \times \dfrac{N_{s}}{N_{p}} = 220 \times \dfrac{80}{2200} = 8$ V.

**(b)** $N_{s} = N_{p} \times \dfrac{V_{s}}{V_{p}} = 150 \times \dfrac{4400}{220} = 3000$ turns.`,
      v: table(['Transformer', 'Np', 'Ns', 'Vp', 'Vs'], [['Doorbell (step-down)', '2200', '80', '220 V', '8 V'], ['Step-up', '150', '3000', '220 V', '4400 V']], 'Table of turns and voltages for the two transformers in the example'),
      n: 'Use the turns ratio. For the doorbell transformer, the secondary has eighty turns out of two thousand two hundred, so the output is two hundred and twenty times eighty divided by two thousand two hundred, which is eight volts. For the step-up transformer, the voltage rises twenty times, so the secondary needs twenty times as many turns: three thousand.',
    }),
    sl('check', 'Quick check: transformers', {
      b: 'Identify a step-up or step-down transformer.',
      n: 'Quick check. Compare the number of turns on the secondary with the primary.',
      chk: 'trans-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'A current is induced in a coil only while the magnetic field linked with it changes.',
        'Induced current is larger for faster motion, more turns, a stronger magnet or a soft iron core.',
        'Fleming’s right-hand rule: thumb — motion, forefinger — field, middle finger — induced current.',
        'AC generator: mechanical → electrical energy; slip rings. Household AC in India: 50 Hz.',
        'Transformer: Vs ÷ Vp = Ns ÷ Np; step-up Ns > Np, step-down Ns < Np; works only on AC.',
      ],
      v: table(['Machine', 'Energy change', 'Rings'], [['DC motor', 'Electrical → mechanical', 'Split rings'], ['AC generator', 'Mechanical → electrical', 'Slip rings'], ['Transformer', 'AC at one voltage → AC at another', 'None']], 'Summary table comparing the motor, generator and transformer'),
      n: 'Let us sum up Part 2. A changing magnetic field induces a current, and the right-hand rule gives its direction. A generator turns mechanical energy into electrical energy and gives alternating current, which in India has a frequency of fifty hertz. Transformers step alternating voltages up or down in the ratio of the turns, which makes long-distance transmission efficient.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Right hand for generators (induced current); left hand for motors (force).',
        'Say “while the magnetic field linked with the coil changes” when explaining induction.',
        'Generator: two slip rings; motor: split rings (commutator).',
        'In transformer sums write Vs ÷ Vp = Ns ÷ Np and say whether it is step-up or step-down.',
      ],
      v: table(['Slip', 'Fix'], [['A magnet at rest inside a coil induces a current', 'No change, so no induced current'], ['Transformer used on a battery', 'Works only on AC'], ['Step-up has more turns on the primary', 'Step-up has more turns on the secondary']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. Use your right hand for generators and your left hand for motors. When you explain induction, mention that the magnetic field through the coil must be changing. Remember that a generator has slip rings while a motor has split rings. And in transformer problems, write the turns ratio and say whether the transformer steps up or steps down.',
    }),
  ],
});
