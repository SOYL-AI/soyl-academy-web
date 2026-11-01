// ICSE 10 Physics ch03 Machines — two decks: Part 1 (t01–t03) machines, MA, VR and efficiency, the three classes of lever,
// levers in the human body; Part 2 (t04) pulleys: single fixed, single movable, block and tackle (with the weight of the
// movable block and friction). Numbers in worked examples are computed here.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { LEVER_CLASSES, BLOCK_TACKLE, PULLEYS } from './svgs.mjs';

const f = (x, n = 3) => String(Number(x.toPrecision(n)));
const V = {
  levers: svgV(LEVER_CLASSES, 'The three classes of lever showing the positions of fulcrum, load and effort with an example of each'),
  tackle: svgV(BLOCK_TACKLE, 'A block and tackle with four strands supporting the lower block, giving a velocity ratio of four'),
  pulleys: svgV(PULLEYS, 'A single fixed pulley and a single movable pulley with their velocity ratios'),
};
// Worked example data
const L1 = 600;
const E1 = 150;
const dE1 = 2.0;
const dL1 = 0.4;
const MA1 = L1 / E1;
const VR1 = dE1 / dL1;
const eta1 = MA1 / VR1;
// Block and tackle: n = 4, load 900 N, movable block 100 N, no friction
const n4 = 4;
const L4 = 900;
const w4 = 100;
const E4 = (L4 + w4) / n4;

export const deck1 = deck({
  part: 1,
  title: 'Machines — Part 1: Mechanical advantage, efficiency and levers',
  goals: [
    'Define load, effort, mechanical advantage, velocity ratio and efficiency',
    'Derive efficiency = MA / VR and explain why MA < VR in practice',
    'Classify levers and predict whether MA is more or less than 1',
    'Identify levers in the human body',
  ],
  slides: [
    sl('title', 'Doing more with less', {
      b: 'Part 1 — a machine lets a small effort move a large load, or a slow movement become a fast one. Every machine follows the same rules of work and energy.',
      v: table(['Machine', 'What it helps with'], [['Crowbar', 'Lifting a heavy stone with a small effort'], ['Tongs', 'Gripping quickly at a distance'], ['Pulley on a well', 'Pulling down instead of lifting up'], ['Wheelbarrow', 'Carrying a heavy load']], 'Table of four simple machines and how each helps'),
      n: 'Namaste! A crowbar lets you shift a stone far too heavy to lift by hand, and a pulley lets you draw water by pulling down instead of up. Machines make jobs easier, but they never give out more work than you put in. In this part we measure how much a machine helps, and meet the three classes of lever.',
    }),
    sl('concept', 'Load, effort, MA and VR', {
      b: r`A **machine** is a device by which a force applied at one point (**effort**, $E$) overcomes a force at another point (**load**, $L$). **Mechanical advantage** $\text{MA} = \dfrac{L}{E}$ (no unit). **Velocity ratio** $\text{VR} = \dfrac{d_E}{d_L} = \dfrac{\text{distance moved by effort}}{\text{distance moved by load}}$ (no unit). A machine can be a **force multiplier** (MA > 1), a **speed multiplier** (MA < 1, load moves farther or faster), or simply **change the direction** of the force.`,
      v: table(['Term', 'Definition', 'Unit'], [['Load L', 'Force overcome by the machine', 'N'], ['Effort E', 'Force applied to the machine', 'N'], ['MA', 'L / E', 'None'], ['VR', 'dE / dL', 'None']], 'Table defining load, effort, mechanical advantage and velocity ratio'),
      n: 'In a machine, the force you apply is the effort and the force it overcomes is the load. Mechanical advantage is load divided by effort and tells you how much the force is multiplied. Velocity ratio is the distance moved by the effort divided by the distance moved by the load. Neither has a unit, because each is a ratio of two similar quantities.',
    }),
    sl('concept', 'Efficiency and η = MA / VR', {
      b: r`**Work input** $= E \times d_E$; **work output** $= L \times d_L$. **Efficiency** $\eta = \dfrac{\text{output}}{\text{input}} = \dfrac{L\,d_L}{E\,d_E} = \dfrac{L}{E} \times \dfrac{d_L}{d_E} = \dfrac{\text{MA}}{\text{VR}}$. In an **ideal machine** (no friction, weightless parts) $\eta = 1$ and MA = VR. In a **practical machine** some input is wasted against friction and in lifting moving parts, so output < input: $\eta < 1$ and **MA < VR**. VR depends only on the design; MA depends on friction and the load.`,
      v: flow('LR', [['a', 'Work input E × dE'], ['b', 'Work output L × dL'], ['c', 'Wasted: friction, moving parts']], [['a', 'b', 'useful'], ['a', 'c', 'lost']], 'Flow of work input splitting into useful work output and work wasted against friction'),
      n: 'The work you put in is effort times the distance it moves; the useful work out is load times the distance it moves. Efficiency is output divided by input. Rearranging shows it equals mechanical advantage divided by velocity ratio. A perfect machine would have an efficiency of one, but every real machine wastes some work on friction and on lifting its own parts, so its mechanical advantage is always less than its velocity ratio.',
    }),
    sl('example', 'Worked example: a machine’s efficiency', {
      b: r`**Problem.** In a machine an effort of ${E1} N lifts a load of ${L1} N. The effort moves ${dE1} m while the load rises ${dL1} m. Find MA, VR, efficiency, and the work wasted.

**MA** $= L/E = ${L1} \div ${E1} = ${f(MA1)}$.

**VR** $= d_E/d_L = ${dE1} \div ${dL1} = ${f(VR1)}$.

**Efficiency** $= \text{MA}/\text{VR} = ${f(MA1)} \div ${f(VR1)} = ${f(eta1)}$, that is ${f(eta1 * 100)}%.

**Wasted** $= E\,d_E - L\,d_L = ${E1 * dE1} - ${L1 * dL1} = ${E1 * dE1 - L1 * dL1}\ \text{J}$.`,
      v: table(['Quantity', 'Value'], [['MA', f(MA1)], ['VR', f(VR1)], ['Efficiency', `${f(eta1 * 100)}%`], ['Input', `${E1 * dE1} J`], ['Output', `${L1 * dL1} J`]], 'Table of results for the machine example'),
      n: 'The load is four times the effort, so the mechanical advantage is four. The effort moves five times as far as the load, so the velocity ratio is five. Efficiency is four divided by five, or eighty percent. The input is three hundred joules and the output two hundred and forty, so sixty joules are wasted.',
    }),
    sl('check', 'Quick check: MA, VR and efficiency', {
      b: 'Calculate MA, VR or efficiency.',
      n: 'Quick check. Efficiency equals mechanical advantage divided by velocity ratio.',
      chk: 'eff-mcq',
    }),
    sl('diagram', 'Levers: the three classes', {
      b: r`A **lever** is a rigid bar free to turn about a fixed point, the **fulcrum**. **Principle of the lever:** load × load arm = effort × effort arm, so $\text{MA} = \dfrac{\text{effort arm}}{\text{load arm}}$ (ideal). **Class I:** fulcrum between load and effort — MA > 1, = 1 or < 1 (see-saw, scissors, crowbar, beam balance). **Class II:** load between fulcrum and effort — effort arm always longer, **MA > 1** (nutcracker, wheelbarrow, bottle opener). **Class III:** effort between fulcrum and load — effort arm always shorter, **MA < 1**, a speed multiplier (forceps, fishing rod, sugar tongs).`,
      v: V.levers,
      n: 'A lever is a rigid bar that turns about a fixed point called the fulcrum. By the principle of moments, load times load arm equals effort times effort arm. In class one levers, like a see-saw, the fulcrum is in the middle. In class two, like a wheelbarrow, the load is in the middle and the mechanical advantage is always more than one. In class three, like forceps, the effort is in the middle and the mechanical advantage is always less than one.',
    }),
    sl('example', 'Worked example: classifying and calculating', {
      b: r`**Problem.** (a) A wheelbarrow carries a 600 N load 0.4 m from the wheel axle; the handles are 1.2 m from the axle. Find the effort and MA. (b) Classify a pair of sugar tongs and say why its MA is less than 1.

**(a)** Class II. $E \times 1.2 = 600 \times 0.4$, so $E = ${f((600 * 0.4) / 1.2)}\ \text{N}$; $\text{MA} = 600 \div ${f((600 * 0.4) / 1.2)} = ${f(1.2 / 0.4)}$.

**(b)** Class III (effort applied between the hinge and the sugar cube). The effort arm is shorter than the load arm, so MA < 1 — but the tips move farther and faster than the fingers.`,
      v: table(['Lever', 'Class', 'MA'], [['Wheelbarrow', 'II', f(1.2 / 0.4)], ['Sugar tongs', 'III', 'Less than 1']], 'Table classifying a wheelbarrow and sugar tongs with their mechanical advantages'),
      n: 'In a wheelbarrow the axle is the fulcrum and the load sits between it and the handles, so it is a class two lever. Taking moments, the effort at the handles is two hundred newtons, and the mechanical advantage is three. Sugar tongs are squeezed between the hinge and the tips, so they are class three levers with a mechanical advantage below one, but the tips move more than your fingers.',
    }),
    sl('check', 'Quick check: classes of lever', {
      b: 'Classify a lever and predict its MA.',
      n: 'Quick check. Look for what lies in the middle: fulcrum, load or effort.',
      chk: 'class-mcq',
    }),
    sl('concept', 'Levers in the human body', {
      b: '**Head nodding on the neck:** the fulcrum (top of the spine) lies between the weight of the face (load) and the neck muscles at the back (effort) — **class I**. **Raising the body on the toes:** the toes are the fulcrum, the body’s weight acts through the ankle (load) and the calf muscle pulls up at the heel (effort) — **class II**. **Lifting a weight in the hand:** the elbow is the fulcrum, the biceps pulls between the elbow and the hand (effort), and the weight is in the hand (load) — **class III**, MA < 1, so the hand moves fast.',
      v: table(['Action', 'Fulcrum', 'Load', 'Effort', 'Class'], [['Nodding the head', 'Top of spine', 'Weight of face', 'Neck muscles', 'I'], ['Standing on toes', 'Toes', 'Body weight at ankle', 'Calf muscle at heel', 'II'], ['Lifting a load in the hand', 'Elbow', 'Load in hand', 'Biceps', 'III']], 'Table of three levers in the human body with fulcrum, load, effort and class'),
      n: 'Our bodies use all three classes of lever. When you nod, the top of the spine is the fulcrum between your face and your neck muscles: class one. When you rise onto your toes, the toes are the fulcrum, your weight acts at the ankle and the calf muscle pulls the heel: class two. When you lift a weight in your hand, the elbow is the fulcrum and the biceps pulls in between: class three.',
    }),
    sl('check', 'Quick check: levers in the body', {
      b: 'Identify the class of a lever in the body.',
      n: 'Quick check. In the forearm the biceps pulls between the elbow and the hand.',
      chk: 'body-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'MA = L / E; VR = dE / dL; both have no unit.',
        'Efficiency η = output / input = MA / VR; practical machines: η < 1 and MA < VR.',
        'Lever principle: L × load arm = E × effort arm.',
        'Class I: fulcrum in middle; Class II: load in middle (MA > 1); Class III: effort in middle (MA < 1).',
        'Body: neck (I), toes (II), forearm (III).',
      ],
      v: table(['Class', 'Middle', 'MA'], [['I', 'Fulcrum', '>, = or < 1'], ['II', 'Load', '> 1'], ['III', 'Effort', '< 1']], 'Summary table of lever classes'),
      n: 'Let us sum up Part 1. Mechanical advantage is load over effort, velocity ratio is effort distance over load distance, and efficiency is their ratio. Real machines always have efficiency below one. Levers come in three classes, depending on whether the fulcrum, the load or the effort is in the middle, and our bodies use all three.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Write the derivation η = MA/VR from output/input step by step.',
        'Give efficiency as a fraction or a percentage, never more than 1 (100%).',
        'To classify a lever, name what is in the middle.',
        'Explain why class III levers are useful: they gain speed or distance.',
      ],
      v: table(['Slip', 'Fix'], [['MA = 0.5 is useless', 'It gains speed (class III)'], ['Efficiency 120%', 'Impossible: output < input'], ['VR depends on friction', 'VR depends only on design']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some tips. Learn to derive efficiency equals mechanical advantage over velocity ratio. Efficiency can never be more than one hundred percent. To classify a lever, say which of fulcrum, load or effort lies in the middle. And remember that a mechanical advantage below one is not useless: the load moves faster and farther.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Machines — Part 2: Pulleys',
  goals: [
    'State MA, VR and the use of a single fixed pulley',
    'Find MA, VR and efficiency of a single movable pulley',
    'Calculate MA, VR and efficiency of a block and tackle, including the weight of the movable block',
    'Explain why a single fixed pulley is used though its MA is 1',
  ],
  slides: [
    sl('title', 'Wheels with a groove', {
      b: 'Part 2 — a pulley is a grooved wheel turning on an axle, with a string or rope round it. Arranged in blocks, pulleys lift engines and building materials.',
      v: table(['Pulley system', 'Where it is used'], [['Single fixed pulley', 'Drawing water from a well, raising a flag'], ['Single movable pulley', 'Lifting loads on a building site'], ['Block and tackle', 'Cranes, garage engine hoists, ships']], 'Table of three pulley systems and where each is used'),
      n: 'A pulley is a wheel with a groove for a rope. A single pulley fixed at the top of a well lets you draw water by pulling down. Pulleys that move with the load share its weight between several strands of rope. Combined in blocks, they let a mechanic lift a car engine by hand.',
    }),
    sl('diagram', 'Single fixed and single movable pulleys', {
      b: '**Single fixed pulley:** the axle is fixed; effort and load are on the two ends of one string. Ideal MA = 1 and VR = 1 (effort moves as far as the load). In practice MA < 1 because of friction. **Use:** it **changes the direction** of the effort — pulling down is easier and safer than lifting up, and you can use your own weight. **Single movable pulley:** the pulley moves with the load, hanging in a loop of string fixed at one end. Two strands support the load, so **VR = 2** and ideal MA = 2.',
      v: V.pulleys,
      n: 'A single fixed pulley does not reduce the force: its mechanical advantage is one, or a little less because of friction. Its value lies in changing direction, so you can pull down using your own weight instead of lifting up. A single movable pulley hangs in a loop of rope and moves with the load. Two strands share the load, so the velocity ratio is two.',
    }),
    sl('example', 'Worked example: a movable pulley with a heavy block', {
      b: r`**Problem.** A single movable pulley of weight 20 N is used to lift a load of 180 N. Ignoring friction, find the effort, MA, VR and efficiency.

**Effort:** two strands support load + pulley: $2E = 180 + 20$, so $E = ${f((180 + 20) / 2)}\ \text{N}$.

**MA** $= 180 \div ${f((180 + 20) / 2)} = ${f(180 / 100)}$; **VR** = 2.

**Efficiency** $= ${f(180 / 100)} \div 2 = ${f(0.9)}$, that is ${f(90)}%: the pulley’s own weight wastes some of the input.`,
      v: table(['Quantity', 'Value'], [['Effort', '100 N'], ['MA', '1.8'], ['VR', '2'], ['Efficiency', '90%']], 'Table of results for the movable pulley example'),
      n: 'The two strands hold up both the load and the pulley, two hundred newtons in all, so each strand, and so the effort, carries a hundred newtons. The mechanical advantage is one hundred and eighty divided by one hundred, which is one point eight. The velocity ratio is two, so the efficiency is ninety percent.',
    }),
    sl('check', 'Quick check: single pulleys', {
      b: 'State the VR or use of a single pulley.',
      n: 'Quick check. A fixed pulley changes direction; a movable pulley has two supporting strands.',
      chk: 'fixed-mcq',
    }),
    sl('diagram', 'Block and tackle', {
      b: r`A **block and tackle** has an upper block of fixed pulleys and a lower block of movable pulleys, with **one continuous string** passing round all of them. If $n$ strands support the lower block: **VR = n** (the effort must move $n$ times as far as the load). With **no friction** and a movable block of weight $w$: tension in each strand $= E$, so $nE = L + w$ and $\text{MA} = \dfrac{L}{E} = \dfrac{nL}{L + w}$. Efficiency $= \dfrac{\text{MA}}{\text{VR}} = \dfrac{L}{L + w}$.`,
      v: V.tackle,
      n: 'In a block and tackle, the top block of pulleys is fixed and the bottom block moves with the load, and one rope runs round them all. If n strands hold up the bottom block, the effort end must be pulled n times as far as the load rises, so the velocity ratio is n. The same tension acts in every strand, so n times the effort holds up the load plus the weight of the lower block.',
    }),
    sl('example', 'Worked example: a block and tackle', {
      b: r`**Problem.** A block and tackle with ${n4} strands supporting the lower block lifts a load of ${L4} N. The lower block weighs ${w4} N; friction is negligible. Find (a) VR, (b) the effort, (c) MA and (d) efficiency.

**(a)** VR = ${n4}.

**(b)** $${n4}E = ${L4} + ${w4}$, so $E = ${f(E4)}\ \text{N}$.

**(c)** $\text{MA} = ${L4} \div ${f(E4)} = ${f(L4 / E4)}$.

**(d)** $\eta = ${f(L4 / E4)} \div ${n4} = ${f(L4 / E4 / n4)}$, that is ${f((L4 / E4 / n4) * 100)}% $= L/(L + w)$.`,
      v: table(['Quantity', 'Value'], [['VR', String(n4)], ['Effort', `${f(E4)} N`], ['MA', f(L4 / E4)], ['Efficiency', `${f((L4 / E4 / n4) * 100)}%`]], 'Table of results for the block and tackle example'),
      n: 'Four strands support the lower block, so the velocity ratio is four. Together they carry the load and the block, a thousand newtons, so each strand, and the effort, is two hundred and fifty newtons. The mechanical advantage is nine hundred divided by two hundred and fifty, which is three point six, and the efficiency is ninety percent.',
    }),
    sl('check', 'Quick check: block and tackle', {
      b: 'Find VR or effort for a block and tackle.',
      n: 'Quick check. The velocity ratio equals the number of strands supporting the lower block.',
      chk: 'tackle-mcq',
    }),
    sl('concept', 'Why MA is less than VR in pulley systems', {
      b: 'In a practical block and tackle, part of the effort is used **to lift the lower block** and **to overcome friction** at the axles, and the string has some weight. So MA < VR and η < 1. **Efficiency improves** as the load increases (the block’s weight becomes a smaller fraction of the total), and when the pulleys are light and well lubricated. VR stays the same because it depends only on the number of strands.',
      v: table(['Change', 'Effect on MA', 'Effect on VR', 'Effect on η'], [['Heavier lower block', 'Decreases', 'No change', 'Decreases'], ['More friction', 'Decreases', 'No change', 'Decreases'], ['Larger load', 'Increases', 'No change', 'Increases'], ['More strands', 'Increases', 'Increases', 'Usually decreases (more friction, heavier block)']], 'Table of how changes affect mechanical advantage, velocity ratio and efficiency of a block and tackle'),
      n: 'In a real block and tackle, some of the effort goes into lifting the lower block and overcoming friction, so the mechanical advantage is less than the velocity ratio. A larger load raises the efficiency, because the block’s weight becomes a smaller share of the total. The velocity ratio does not change at all, since it depends only on how many strands support the lower block.',
    }),
    sl('example', 'Worked example: efficiency rises with load', {
      b: r`**Problem.** A block and tackle has VR 4 and a lower block of weight 100 N; friction is negligible. Find the efficiency when it lifts (a) 300 N, (b) 900 N and (c) 1900 N.

**Rule:** $\eta = \dfrac{L}{L + w}$.

**(a)** $300 \div 400 = ${f(300 / 400)}$ (${f(75)}%). **(b)** $900 \div 1000 = ${f(0.9)}$ (90%). **(c)** $1900 \div 2000 = ${f(0.95)}$ (95%).

The block’s weight matters less as the load grows, so heavy loads are lifted more efficiently.`,
      v: table(['Load (N)', 'Effort (N)', 'MA', 'Efficiency'], [['300', String((300 + 100) / 4), f(300 / 100), '75%'], ['900', String((900 + 100) / 4), f(900 / 250), '90%'], ['1900', String((1900 + 100) / 4), f(1900 / 500), '95%']], 'Table of effort, mechanical advantage and efficiency of a block and tackle at three loads'),
      n: 'Use efficiency equals load divided by load plus block weight. With a three hundred newton load, the efficiency is seventy five percent; with nine hundred, ninety percent; with nineteen hundred, ninety five percent. The block weighs the same each time, so it wastes a smaller share of the work as the load gets bigger.',
    }),
    sl('check', 'Quick check: efficiency of pulleys', {
      b: 'Predict how a change affects MA, VR or efficiency.',
      n: 'Quick check. Velocity ratio depends only on the number of supporting strands.',
      chk: 'improve-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Single fixed pulley: MA = VR = 1 (ideal); changes the direction of effort.',
        'Single movable pulley: VR = 2; with pulley weight w, 2E = L + w.',
        'Block and tackle: VR = n (strands supporting the lower block); nE = L + w; η = L / (L + w) (no friction).',
        'MA < VR because of friction and the weight of moving parts; η rises with load.',
      ],
      v: table(['System', 'VR'], [['Single fixed', '1'], ['Single movable', '2'], ['Block and tackle', 'n']], 'Summary table of velocity ratios of pulley systems'),
      n: 'Let us sum up Part 2. A single fixed pulley does not multiply force but changes its direction. A single movable pulley has a velocity ratio of two. A block and tackle has a velocity ratio equal to the number of strands holding up the lower block. The weight of that block and friction make the mechanical advantage less than the velocity ratio.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Count only the strands that support the lower (movable) block.',
        'Include the weight of the lower block when finding the effort.',
        'For a fixed pulley, give its advantage as “change of direction”, not “force gain”.',
        'Show nE = L + w before solving for E.',
      ],
      v: table(['Slip', 'Fix'], [['Counting the effort strand from a fixed pulley twice', 'Count strands supporting the lower block'], ['Ignoring block weight', 'nE = L + w'], ['Fixed pulley MA = 2', 'MA = 1']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. Count only the strands that hold up the lower block. Include that block’s weight when you work out the effort. Describe the use of a single fixed pulley as changing the direction of the force. And write the equation n times effort equals load plus block weight before solving.',
    }),
  ],
});
