// ISC 11 Biology ch19 Locomotion and Movement: question bank in ISC school-examination style.
// Sarcomere bands, shortening, stimulation intervals and bone counts come from calc.mjs. AR keys (ISC options): a b c d.
import { mk, add, svgV, r } from '../../isc-11-biology-ch01/src/lib.mjs';
import { SARC_Q } from './svgs.mjs';
import { HAND, FOOT, GEO, REL, CON, B_REL, B_CON, SERIES, SARC_SERIES, bands, shortenPct, inSeries, fibreShortMm, interval, response, TWITCH, SKULL, SKULL_N, VERT, VERT_N, VERT_CHILD, RIB_N, RIBS, AXIAL_N, APPEND_N, APPEND, TOTAL, HAND_N, FOOT_N, HANDS_FEET, AXIAL, round, eq } from './calc.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const sarcFig = svgV(SARC_Q, 'A relaxed sarcomere with five parts marked A to E');
const um = r`\ \mu\text{m}`;

// ---------------------------------------------------------------- t01 types of movement, properties, red and white fibres
add('palate-mcq', mcq({
  stem: 'In a classic demonstration, fine carbon powder is dusted on the moist roof of a frog’s mouth and slowly drifts towards the gullet. The drift is caused by',
  right: 'coordinated beating of cilia on the lining cells',
  wrong: ['contraction of striated muscle in the roof of the mouth', 'the lashing of a single flagellum on each cell', 'pseudopodia of the lining cells'],
  sol: 'A moving cover of cilia, all beating in one direction, sweeps particles along — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('flagella-mcq', mcq({
  stem: 'A drop of pond water under a microscope shows green *Euglena* swimming towards the lighted side of the slide. Which structure propels it?',
  right: 'A long whip-like flagellum',
  wrong: ['A fringe of short cilia all over the body', 'Contraction of muscle fibres', 'Temporary pseudopodia'],
  sol: '*Euglena* swims by a flagellum, as a sperm does — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('henmeat-mcq', mcq({
  stem: 'A butcher notices that the leg of a domestic hen is dark while its breast meat is pale. The dark colour of the leg muscle shows that its fibres have',
  right: 'more myoglobin and mitochondria, and rely on aerobic respiration',
  wrong: ['more sarcoplasmic reticulum and make lactic acid by glycolysis', 'no myoglobin but many nuclei', 'fewer myofibrils and no sarcomeres'],
  sol: 'Red fibres are rich in myoglobin and mitochondria and make ATP aerobically — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('muscleprop-mcq', mcq({
  stem: 'A strip of relaxed muscle lengthens when a small weight is hung from it, and returns to its original length when the weight is removed. The two properties shown are, in order,',
  right: 'extensibility and elasticity',
  wrong: ['contractility and excitability', 'excitability and extensibility', 'elasticity and contractility'],
  sol: 'Stretching shows extensibility; recoil shows elasticity — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('cardiac-mcq', mcq({
  stem: 'A histology slide shows long, branched fibres with cross-striations, joined end to end at dark lines, from the wall of an organ that beats without any conscious control. The tissue is',
  right: 'cardiac muscle',
  wrong: ['skeletal muscle', 'smooth muscle', 'ciliated epithelium'],
  sol: 'Branched, striated, involuntary fibres joined end to end: cardiac muscle — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('smooth-mcq', mcq({
  stem: 'A pathologist examining the wall of the small intestine finds spindle-shaped cells with a single nucleus each and no cross-striations. This muscle is',
  right: 'smooth muscle, which is involuntary',
  wrong: ['skeletal muscle, which is voluntary', 'cardiac muscle, which is branched', 'skeletal muscle, which is multinucleate'],
  sol: 'Unstriated, uninucleate, involuntary fibres: smooth (visceral) muscle — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('myoglobin-fill', fill({
  stem: 'The oxygen-storing pigment that gives red muscle fibres their colour is ______.',
  acc: [['myoglobin']],
  sol: 'Myoglobin.',
  d: 1, c: 'recall', t: [1],
}));
add('muscletype-tf', tf({
  stem: 'Cardiac muscle fibres are striated and are under voluntary control.',
  key: 'f',
  sol: 'False. Cardiac muscle is striated but involuntary.',
  d: 1, c: 'recall', t: [1],
}));
add('fibre-ar', ar({
  a: 'Red muscle fibres can work for a long time without tiring.',
  r: 'White muscle fibres contain less myoglobin than red muscle fibres.',
  key: 'b',
  sol: 'Both are true, but the low myoglobin of white fibres does not explain why red fibres resist fatigue (their aerobic ATP supply does) — option (b).',
  d: 3, c: 'understanding', t: [1],
}));
add('redwhite-short', short({
  marks: 2,
  stem: 'State two differences between red and white skeletal muscle fibres, and name one place where white fibres are abundant.',
  model: '**Red fibres** have much **myoglobin** and many **mitochondria**, respire **aerobically** and contract slowly without tiring; **white fibres** have little myoglobin and few mitochondria, use **anaerobic glycolysis** (forming **lactic acid**) and contract quickly but tire soon. White fibres are abundant in the **breast muscle of a domestic hen** and in the **muscles of the eyeball**.',
  sol: 'Two differences; one place.',
  scheme: [['Two differences between red and white fibres', 1], ['Place where white fibres abound', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('seal-reason', short({
  marks: 1,
  stem: 'Give a reason: A diving seal can stay under water for a long time even though its muscles keep working.',
  model: 'Its red muscle fibres hold a large store of **oxygen bound to myoglobin**, so they keep respiring **aerobically** while the seal is not breathing.',
  sol: 'Myoglobin oxygen store.',
  scheme: [['Myoglobin stores oxygen for aerobic respiration', 1]],
  wl: null,
  d: 2, c: 'application', t: [1],
}));
add('trachea-analogy', short({
  marks: 1,
  stem: 'Complete the analogy: Lining of the windpipe : ciliary movement :: swimming sperm : ______.',
  model: '**Flagellar movement.**',
  sol: 'Flagellum.',
  scheme: [['Flagellar movement', 1]],
  wl: null,
  d: 1, c: 'understanding', t: [1],
}));
add('types-short3', short({
  marks: 3,
  stem: 'Distinguish ciliary, flagellar and muscular movement by the structure responsible, and give one human example of each.',
  model: '**Ciliary movement** is produced by many short **cilia** beating in step, as in the **windpipe lining** that clears mucus and dust. **Flagellar movement** is produced by a single long **flagellum**, as in the **sperm**. **Muscular movement** is produced by **contraction of muscle fibres** pulling on bones or organ walls, as in **walking** or the **heartbeat**.',
  sol: 'Three types with structures and examples.',
  scheme: [['Ciliary with example', 1], ['Flagellar with example', 1], ['Muscular with example', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('fibres-short3', short({
  marks: 3,
  stem: 'A domestic hen can walk and scratch the ground all day but flies only in short bursts before tiring. Relate this to the kinds of muscle fibre in its legs and breast.',
  model: 'The **leg muscles** are mostly **red fibres**, rich in **myoglobin** and **mitochondria**, which make ATP **aerobically** and so work for long periods without fatigue. The **breast muscles** are mostly **white fibres**, with few mitochondria, which depend on **anaerobic glycolysis**: they contract fast and strongly but **tire quickly** as **lactic acid** builds up, so the hen flies only briefly.',
  sol: 'Legs red; breast white; reason.',
  scheme: [['Legs: red fibres, aerobic, sustained', 1], ['Breast: white fibres, glycolysis, fatigue', 1], ['Link to walking all day and brief flight', 1]],
  d: 3, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 muscle structure, contraction
add('sarcq-mcq', mcq({
  stem: 'In the figure of a relaxed sarcomere, which lettered part is the region in the middle of the A band that has only thick filaments?',
  right: 'Part D',
  wrong: ['Part A', 'Part B', 'Part E'],
  sol: 'D is the gap between the ends of the thin filaments: the H zone — option (@K).',
  assets: [sarcFig],
  d: 2, c: 'application', t: [2],
}));
add('sarcq-short', short({
  marks: 2,
  stem: 'In the figure of a relaxed sarcomere, name the parts labelled B, C and E, and state which of the three keeps its length when the muscle contracts.',
  model: '**B** is the **I band** (only thin filaments), **C** is the **A band** (the region of the thick filaments) and **E** is the **M line** in the middle of the thick filaments. The **A band (C)** keeps its length, because the filaments slide and do not shorten.',
  sol: 'B I band, C A band, E M line; C unchanged.',
  scheme: [['B, C, E named', 1], ['A band unchanged', 1]],
  assets: [sarcFig],
  d: 2, c: 'application', t: [2],
}));
add('nocalcium-mcq', mcq({
  stem: 'A researcher treats isolated muscle fibres with a chemical that prevents calcium ions from binding to troponin, and then stimulates the nerve normally. What will she observe?',
  right: 'No contraction, because tropomyosin continues to cover the myosin-binding sites on actin',
  wrong: ['No contraction, because the sarcolemma cannot depolarise', 'Contraction, because myosin heads bind actin anyway', 'Rigor, because the heads cannot release ATP'],
  sol: 'Without calcium on troponin, tropomyosin stays over the binding sites, so no cross bridges form — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('detach-mcq', mcq({
  stem: 'During one cycle of contraction, a fresh ATP molecule binds to a myosin head that has just completed its power stroke. The immediate result is that the head',
  right: 'lets go of the actin filament',
  wrong: ['binds more strongly to actin', 'releases calcium ions into the sarcoplasm', 'moves tropomyosin away from actin'],
  sol: 'Binding of ATP breaks the cross bridge — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('slide-mcq', mcq({
  stem: 'Electron micrographs of the same muscle at rest and after contraction show the Z lines much closer together in the second, yet the dark bands are of equal width. This shows that during contraction',
  right: 'thin filaments slide between the thick filaments without changing length',
  wrong: ['thick filaments shorten and pull the Z lines inwards', 'thin filaments shorten while thick filaments stay long', 'new thick filaments are made in the middle of the sarcomere'],
  sol: 'An unchanged A band with Z lines nearer shows sliding, not shortening, of filaments — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('srpump-mcq', mcq({
  stem: 'A mutant muscle fibre cannot pump calcium ions back into its sarcoplasmic reticulum after being stimulated. After a single stimulus the fibre is expected to',
  right: 'stay contracted and relax very slowly',
  wrong: ['fail to contract at all', 'relax faster than normal', 'lose its striations'],
  sol: 'Calcium left in the sarcoplasm keeps the troponin–tropomyosin switch on, so relaxation is delayed — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('rigor-mcq', mcq({
  stem: 'A body is found with limbs that were limp at one hour after death but stiff at five hours. The stiffness is best explained by',
  right: 'lack of ATP, so myosin heads stay attached to actin',
  wrong: ['a rise in ATP, which keeps heads locked on actin', 'uptake of calcium by the sarcoplasmic reticulum', 'continued nerve impulses to the muscle'],
  sol: 'After death ATP is no longer made, so cross bridges cannot be broken — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('sarcomere-fill', fill({
  stem: 'The segment of a myofibril between two successive Z lines, which is the unit of contraction, is called a ______.',
  acc: [['sarcomere']],
  sol: 'Sarcomere.',
  d: 1, c: 'recall', t: [2],
}));
add('troponin-fill', fill({
  stem: 'On the thin filament, the protein that binds calcium ions and so starts contraction is ______.',
  acc: [['troponin']],
  sol: 'Troponin.',
  d: 1, c: 'recall', t: [2],
}));
{
  const h = bands(CON).h;
  add('hzone-num', num({
    stem: `In a model muscle the A band is ${GEO.a} µm long and each thin filament is ${GEO.thin} µm long. What is the width of the H zone when the sarcomere is ${CON} µm long? (Give the answer in µm.)`,
    value: h, tol: 0.01, unit: 'µm',
    sol: r`I band $= ${CON} - ${GEO.a} = ${B_CON.i}$; thin filament inside the A band, each side $= ${GEO.thin} - ${B_CON.halfI} = ${B_CON.overlap}$; H zone $= ${GEO.a} - 2 \times ${B_CON.overlap} = ${h}${um}$.`,
    scheme: [[`${h} µm`, 1]],
    d: 3, c: 'application', t: [2],
  }), (q) => q.answer.value === 0.2 || 'value');
}
{
  const p = shortenPct(REL, CON);
  add('pct-num', num({
    stem: `A sarcomere shortens from ${REL} µm to ${CON} µm on contraction. By what percentage does it shorten? (One decimal place.)`,
    value: p, tol: 0.1, unit: '%',
    sol: r`$\dfrac{${REL} - ${CON}}{${REL}} \times 100 = ${p}$ percent.`,
    scheme: [[`${p}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 21.4 || 'value');
}
{
  const n = inSeries(4.2, REL);
  const mm = fibreShortMm(4.2, REL, CON);
  add('fibre-num', num({
    stem: `A muscle fibre 4.2 cm long consists of sarcomeres of ${REL} µm joined end to end. If every sarcomere shortens to ${CON} µm, by how many millimetres does the whole fibre shorten?`,
    value: mm, tol: 0.05, unit: 'mm',
    sol: r`Number of sarcomeres $= \dfrac{42000}{${REL}} = ${n}$; each shortens by $${REL} - ${CON} = 0.6\ \mu\text{m}$; total $= ${n} \times 0.6 = 9000\ \mu\text{m} = ${mm}$ mm.`,
    scheme: [[`${n} sarcomeres`, 0.5], [`${mm} mm`, 0.5]],
    d: 3, c: 'application', t: [2],
  }), (q) => q.answer.value === 9 || 'value');
}
{
  const iv = interval(25);
  add('interval-num', num({
    stem: 'A stimulator delivers 25 shocks per second to an isolated muscle. What is the time between two successive shocks, in milliseconds?',
    value: iv, tol: 0.1, unit: 'ms',
    sol: r`$\dfrac{1000}{25} = ${iv}$ ms.`,
    scheme: [[`${iv} ms`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 40 || 'value');
}
add('sliding-ar', ar({
  a: 'During contraction of a sarcomere, the Z lines move closer to each other.',
  r: 'The thick filaments shorten during contraction and pull the Z lines towards the centre.',
  key: 'c',
  sol: 'A is true. R is false: the thick filaments keep their length; it is the thin filaments that slide inwards — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('rigor-ar', ar({
  a: 'The muscles of a dead body become stiff a few hours after death.',
  r: 'After death no ATP is made, so myosin heads cannot detach from actin.',
  key: 'a',
  sol: 'Both are true, and the absence of ATP, which is needed to break cross bridges, explains the stiffness — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('relax-ar', ar({
  a: 'In a relaxed skeletal muscle fibre the myosin-binding sites on actin are uncovered.',
  r: 'In a relaxed fibre calcium ions are bound to troponin.',
  key: 'd',
  sol: 'Both are false: in a relaxed fibre tropomyosin covers the sites and calcium is stored in the sarcoplasmic reticulum — option (d).',
  d: 3, c: 'analysis', t: [2],
}));
add('sr-tf', tf({
  stem: 'The calcium ions that start muscle contraction are released from the sarcoplasmic reticulum.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [2],
}));
add('atp-reason', short({
  marks: 1,
  stem: 'Give a reason: A muscle fibre needs ATP even to relax.',
  model: 'A fresh **ATP** must bind each myosin head to **break the cross bridge**, and ATP also powers the pump that returns **calcium** to the sarcoplasmic reticulum.',
  sol: 'ATP detaches heads.',
  scheme: [['ATP needed to detach heads / pump calcium', 1]],
  wl: null,
  d: 3, c: 'understanding', t: [2],
}));
add('filament-analogy', short({
  marks: 1,
  stem: 'Complete the analogy: Actin : thin filament :: myosin : ______.',
  model: '**Thick filament.**',
  sol: 'Thick filament.',
  scheme: [['Thick filament', 1]],
  wl: null,
  d: 1, c: 'recall', t: [2],
}));
add('cross-short', short({
  marks: 2,
  stem: 'Describe, in order, what happens to a myosin head from the moment it binds actin until it is ready to bind again.',
  model: 'The head carrying **ADP and phosphate** binds actin, forming a **cross bridge**; in the **power stroke** it bends and pulls the thin filament inward, releasing ADP and phosphate. A new **ATP** binds and the head **detaches**; ATP is then **split**, which **recocks** the head.',
  sol: 'Bind, power stroke, detach, recock.',
  scheme: [['Cross bridge and power stroke', 1], ['ATP binds, detaches, recocked', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('thin-short', short({
  marks: 2,
  stem: 'Describe the structure of a thin filament, naming the three proteins in it and where each lies.',
  model: 'A **thin filament** has two strands of **actin**, each a chain of globular **G-actin** beads, twisted together. A thread of **tropomyosin** runs in the groove between the strands, and a **troponin** complex is attached to the tropomyosin at regular intervals.',
  sol: 'Actin, tropomyosin, troponin.',
  scheme: [['Actin strands', 1], ['Tropomyosin and troponin positions', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('summ-short', short({
  marks: 2,
  stem: 'Define summation and tetanus, and state what must be true of the interval between stimuli for each to occur.',
  model: '**Summation** is the adding up of contractions when a second stimulus arrives **before the muscle has fully relaxed** from the first, so tension rises above that of a single twitch. **Tetanus** is a smooth, **sustained** contraction produced when stimuli follow **very rapidly**, at intervals too short for any relaxation.',
  sol: 'Definitions with intervals.',
  scheme: [['Summation with interval', 1], ['Tetanus with interval', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('calcium-short3', short({
  marks: 3,
  stem: 'Explain how calcium ions and troponin switch on contraction in a resting muscle fibre.',
  model: 'In a resting fibre **tropomyosin** lies over the **myosin-binding sites** on **actin**, so heads cannot attach. An impulse releases **calcium ions** from the **sarcoplasmic reticulum**; calcium **binds troponin**, which pulls tropomyosin aside and **uncovers the binding sites**. Myosin heads can now form **cross bridges** and the thin filaments slide.',
  sol: 'Resting block; release; unblocking.',
  scheme: [['Tropomyosin covers sites at rest', 1], ['Calcium released and binds troponin', 1], ['Sites uncovered; cross bridges form', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('bands-short3', short({
  marks: 3,
  stem: `Under the electron microscope a relaxed sarcomere of a frog muscle is ${REL} µm long with an H zone of ${B_REL.h} µm. A contracted sarcomere is ${CON} µm long. State what happens to the I band, H zone and A band, and explain why.`,
  model: `The **I band narrows** (${B_REL.i} to ${B_CON.i} µm) and the **H zone narrows** (${B_REL.h} to ${B_CON.h} µm) because the **thin filaments slide inwards** over the thick filaments, pulling the **Z lines** closer. The **A band stays ${GEO.a} µm** because the **thick filaments do not change length**; the filaments slide, and neither group shortens.`,
  sol: 'I and H narrow; A unchanged; sliding.',
  scheme: [['I band and H zone narrow', 1], ['A band unchanged', 1], ['Explanation by sliding', 1]],
  d: 3, c: 'application', t: [2],
}), () => (B_REL.i > B_CON.i && B_REL.h > B_CON.h && B_REL.a === B_CON.a) || 'bands');
add('rigor-short3', short({
  marks: 3,
  stem: 'A detective notes that the body in a room was limp when first found but stiff some hours later, and the stiffness had gone after two days. Explain the stiffness and why it passes off.',
  model: 'The stiffness is **rigor mortis**. After death **ATP is no longer made**, so new ATP cannot bind the myosin heads and **cross bridges cannot be broken**; the muscles stay **locked and stiff**. It passes off after a day or two because the **muscle proteins break down** (autolysis), so the filaments no longer hold together.',
  sol: 'Rigor mortis; no ATP; protein breakdown.',
  scheme: [['Named as rigor mortis', 1], ['No ATP so heads stay on actin', 1], ['Passes off as proteins break down', 1]],
  d: 3, c: 'application', t: [2],
}));
add('organise-short3', short({
  marks: 3,
  stem: 'Starting with a whole skeletal muscle, describe its organisation down to the myofilaments, and name the two proteins that form the filaments.',
  model: 'A **muscle** is made of **bundles (fascicles)** of **muscle fibres**; each fibre is a long, **multinucleate** cell enclosed by the **sarcolemma**. A fibre contains many **myofibrils**, which are made of **myofilaments**: the **thin filaments of actin** and the **thick filaments of myosin**, arranged in repeating **sarcomeres**.',
  sol: 'Muscle, fascicle, fibre, myofibril, filaments.',
  scheme: [['Muscle, bundles, fibres', 1], ['Myofibrils and sarcomeres', 1], ['Actin and myosin', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('atproles-short3', short({
  marks: 3,
  stem: 'A poison stops muscle fibres from making ATP but leaves nerve impulses and calcium release unchanged. Describe the state of a stimulated fibre and explain why it resembles a muscle in rigor mortis.',
  model: 'Calcium is released, troponin and tropomyosin move aside, and the myosin heads **attach to actin** and complete a power stroke, so the fibre **contracts once**. With **no ATP**, the heads **cannot detach**, so the cross bridges **stay locked** and the fibre remains **stiff and shortened**. This is the same condition as in **rigor mortis**, where ATP is absent after death.',
  sol: 'Attach but no detach.',
  scheme: [['Contracts once; heads attach', 1], ['No ATP so heads cannot detach', 1], ['Compared with rigor mortis', 1]],
  d: 4, c: 'analysis', t: [2],
}));
add('sliding-long', long({
  stem: '(a) Draw a labelled diagram of a sarcomere showing the Z lines, A band, I band, H zone and M line. [2]\n(b) Explain muscle contraction on the basis of the sliding filament theory. [2]\n(c) State what happens to the I band, the A band and the H zone when a muscle contracts. [1]',
  model: `(a) **Diagram:** two **Z lines** at the ends; **thin (actin)** filaments attached to the Z lines; **thick (myosin)** filaments in the middle with an **M line**; labelled **A band** (thick filaments), **I band** (thin only) and **H zone** (middle of the A band without thin filaments).\n\n(b) Myosin heads attach to actin, **pull the thin filaments inwards** past the thick ones, release and attach again using **ATP**, so the **Z lines move closer** and the sarcomere shortens; the filaments themselves **do not shorten**.\n\n(c) The **I band** and **H zone narrow**; the **A band** is **unchanged**.`,
  sol: 'Diagram; sliding; band changes.',
  scheme: [['(a) Labelled sarcomere', 2], ['(b) Sliding by cross bridges', 1], ['(b) Z lines closer, filaments not shortened', 1], ['(c) I and H narrow, A same', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [2],
}));
add('chem-long', long({
  stem: '(a) Describe the events at the neuromuscular junction that lead to an action potential in the muscle fibre. [1]\n(b) Explain how calcium ions cause cross bridges to form. [2]\n(c) Describe how a muscle fibre relaxes. [2]',
  model: `(a) A nerve impulse reaches the **motor end plate** and **acetylcholine** is released; it sets up an **action potential in the sarcolemma**.\n\n(b) The action potential makes the **sarcoplasmic reticulum** release **calcium ions**; calcium **binds troponin**, so **tropomyosin** moves aside and **uncovers the myosin-binding sites**; myosin heads bind actin to form **cross bridges**, and ATP drives repeated power strokes.\n\n(c) When the impulse stops, **calcium is pumped back** into the sarcoplasmic reticulum; **tropomyosin covers the sites** again, **ATP** detaches the heads, and the thin filaments slide back so the muscle returns to its resting length.`,
  sol: 'Junction; calcium; relaxation.',
  scheme: [['(a) Acetylcholine and action potential', 1], ['(b) Calcium binds troponin, tropomyosin moves', 1], ['(b) Cross bridges, power strokes', 1], ['(c) Calcium pumped back', 1], ['(c) Heads detach, resting length', 1]],
  wl: [60, 200],
  d: 3, c: 'understanding', t: [2],
}));
{
  const rows = SERIES.map((b) => `| ${b.sarc} | ${b.i} | ${b.h} | ${b.a} |`).join('\n');
  add('sarc-case', mk.case({
    passage: `A student measured the widths of the bands in myofibrils fixed at five different sarcomere lengths. All widths are in µm.\n\n| Sarcomere length | I band (total) | H zone | A band |\n|---|---|---|---|\n${rows}`,
    d: 3, c: 'analysis',
    children: [
      part('a', num({
        stem: 'By how many µm does the total I band change between the sarcomere lengths of 2.8 and 2.2?',
        value: round(B_REL.i - B_CON.i, 2), tol: 0.01, unit: 'µm',
        sol: r`$${B_REL.i} - ${B_CON.i} = ${round(B_REL.i - B_CON.i, 2)}${um}$.`,
        scheme: [[`${round(B_REL.i - B_CON.i, 2)} µm`, 1]],
        d: 2, c: 'application', t: [2],
      })),
      part('b', mcq({
        stem: 'Which conclusion about the filaments do these band measurements support?',
        right: 'The thin filaments slide inwards while the thick filaments keep a constant length.',
        wrong: ['The thick filaments shorten as the sarcomere shortens.', 'The thin filaments get longer as the sarcomere shortens.', 'The H zone widens as the sarcomere shortens.'],
        sol: 'A constant A band with narrowing I band and H zone means sliding, not shortening, of filaments — option (@K).',
        d: 3, c: 'analysis', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: `Explain why the H zone is absent at a sarcomere length of ${SARC_SERIES[4]} µm.`,
        model: `At ${SARC_SERIES[4]} µm the thin filaments from the **two Z lines have slid so far inwards** that their ends **meet in the middle**, so no part of the A band is free of thin filaments. The region with **only thick filaments**, the **H zone**, has therefore **closed**.`,
        sol: 'Thin filaments meet.',
        scheme: [['Thin filaments slide inwards', 1], ['Ends meet; no thin-free region', 1]],
        d: 3, c: 'analysis', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'What does the constant A band tell you about the thick filaments, and what supplies the energy for the sliding?',
          model: 'The **thick filaments keep a constant length**: they do not shorten. The energy comes from **ATP**, split by the **ATPase** of the **myosin heads**, which drives the repeated attach, pull and release.',
          sol: 'Constant length; ATP.',
          scheme: [['Thick filaments unchanged', 1], ['ATP split by myosin heads', 1]],
          d: 3, c: 'analysis', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[0].answer.value === 0.6 || 'value');
}
{
  const rates = [4, 8, 12, 20, 40];
  const rows = rates.map((n) => `| ${n} | ${interval(n)} | ${response(interval(n))} |`).join('\n');
  add('stim-case', mk.case({
    passage: `A physiology class stimulated an isolated frog muscle at different rates. In this model a twitch lasts ${TWITCH.total} ms and its contraction phase ${TWITCH.rise} ms.\n\n| Shocks per second | Interval (ms) | Response |\n|---|---|---|\n${rows}`,
    d: 3, c: 'analysis',
    children: [
      part('a', num({
        stem: 'At how many shocks per second does the muscle first show summation? (Take the first rate in the table that gives summation.)',
        value: rates.find((n) => response(interval(n)) === 'summation'), tol: 0, unit: 'shocks per second',
        sol: r`Intervals of ${interval(4)} ms and ${interval(8)} ms are longer than the twitch of ${TWITCH.total} ms: separate twitches. At ${rates.find((n) => response(interval(n)) === 'summation')} per second the interval is ${interval(rates.find((n) => response(interval(n)) === 'summation'))} ms, shorter than a twitch: summation.`,
        scheme: [['12', 1]],
        d: 3, c: 'application', t: [2],
      })),
      part('b', mcq({
        stem: 'Which statement explains the response at 40 shocks per second?',
        right: 'The interval is shorter than the contraction phase, so the muscle has no time to relax and the contractions fuse.',
        wrong: ['The interval is longer than a twitch, so each twitch is complete.', 'Calcium is no longer released by the sarcoplasmic reticulum.', 'The muscle has run out of myoglobin.'],
        sol: 'At 25 ms the next stimulus comes before any relaxation: fused tetanus — option (@K).',
        d: 3, c: 'analysis', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'Why does tension rise during summation?',
        model: 'The next stimulus arrives **before the muscle has relaxed**, so **calcium is still present** and more cross bridges are formed on top of those already active; the contractions **add up**.',
        sol: 'Calcium still present.',
        scheme: [['Next stimulus before relaxation', 1], ['More cross bridges; contractions add', 1]],
        d: 3, c: 'analysis', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'A person with a long, sustained muscle spasm after a wound infection is said to have tetanus. How is this related to the response at 40 shocks per second?',
          model: 'In both, the **muscle is held in a sustained, fused contraction** because stimuli arrive **too fast for relaxation**. In the infection the toxin causes **repeated nerve stimulation**, so the muscles stay **contracted and rigid**.',
          sol: 'Fused contraction.',
          scheme: [['Sustained fused contraction', 1], ['Repeated rapid stimulation', 1]],
          d: 3, c: 'analysis', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[0].answer.value === 12 || 'value');
}

// ---------------------------------------------------------------- t03 skeleton
add('axial-mcq', mcq({
  stem: 'A museum label lists bones of the axial skeleton. Which list is correct?',
  right: 'Hyoid, sternum, sacrum and ribs',
  wrong: ['Clavicle, sternum, sacrum and ribs', 'Hyoid, scapula, sacrum and femur', 'Sternum, patella, ribs and mandible'],
  sol: 'Hyoid, sternum, sacrum and ribs are all axial; clavicle, scapula, femur and patella belong to the appendicular skeleton — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('girdle-mcq', mcq({
  stem: 'Each half of the pectoral girdle in an adult consists of',
  right: 'one clavicle and one scapula',
  wrong: ['one scapula only', 'one humerus and one scapula', 'two hip bones'],
  sol: 'The collar bone (clavicle) and shoulder blade (scapula) form each half — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('vertebra-mcq', mcq({
  stem: `A child’s backbone is described as having ${VERT_CHILD} vertebrae, but an adult’s has only ${VERT_N} bones. The difference arises because`,
  right: 'five sacral vertebrae fuse to form the sacrum and four coccygeal vertebrae fuse to form the coccyx',
  wrong: ['seven cervical vertebrae fuse into one', 'the lumbar vertebrae are lost with age', 'the ribs fuse with the thoracic vertebrae'],
  sol: `${VERT_CHILD} − ${VERT_N} = ${VERT_CHILD - VERT_N}: the sacral and coccygeal vertebrae fuse — option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => VERT_CHILD - VERT_N === 7 || 'fusion');
add('marrow-mcq', mcq({
  stem: 'A patient whose red bone marrow is damaged by radiation becomes severely anaemic. Which function of the skeleton has been affected?',
  right: 'Formation of blood cells',
  wrong: ['Protection of internal organs', 'Storage of calcium and phosphate', 'Attachment of muscles'],
  sol: 'Red bone marrow makes blood cells — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('ribs-mcq', mcq({
  stem: 'On a model of the rib cage, the eighth, ninth and tenth pairs join the cartilage of the rib above rather than the sternum. These ribs are',
  right: 'false ribs',
  wrong: ['true ribs', 'floating ribs', 'cervical ribs'],
  sol: 'Ribs 8 to 10 are false (vertebrochondral) ribs — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('ossicle-mcq', mcq({
  stem: 'How many ear ossicles (malleus, incus and stapes) are there in the two ears of one person together?',
  right: String(SKULL.ossicles),
  wrong: ['3', '2', '12'],
  sol: `Three in each ear: ${SKULL.ossicles} in all — option (@K).`,
  d: 1, c: 'recall', t: [3],
}), () => SKULL.ossicles === 6 || 'ossicles');
{
  add('handsfeet-num', num({
    stem: 'A forensic team recovers only the hands and feet (both of each) of an adult skeleton. How many bones is this in all?',
    value: HANDS_FEET, unit: 'bones',
    sol: r`Hand $= ${HAND.carpals} + ${HAND.metacarpals} + ${HAND.phalanges} = ${HAND_N}$; foot $= ${FOOT.tarsals} + ${FOOT.metatarsals} + ${FOOT.phalanges} = ${FOOT_N}$; total $= 2 \times (${HAND_N} + ${FOOT_N}) = ${HANDS_FEET}$.`,
    scheme: [[`${HANDS_FEET}`, 1]],
    d: 3, c: 'application', t: [3],
  }), (q) => q.answer.value === 106 || 'value');
}
{
  add('sternumribs-num', num({
    stem: 'Besides the skull and the vertebral column, how many other bones does the axial skeleton contain (sternum and ribs)?',
    value: AXIAL.sternum + AXIAL.ribs, unit: 'bones',
    sol: r`Sternum $${AXIAL.sternum}$ + ribs $${RIB_N}$ $= ${AXIAL.sternum + AXIAL.ribs}$.`,
    scheme: [[`${AXIAL.sternum + AXIAL.ribs}`, 1]],
    d: 2, c: 'application', t: [3],
  }), (q) => q.answer.value === 25 || 'value');
}
add('hyoid-fill', fill({
  stem: 'The only bone of the body that does not articulate with any other bone is the ______.',
  acc: [['hyoid']],
  sol: 'Hyoid.',
  d: 1, c: 'recall', t: [3],
}));
add('skeletonfunc-short', short({
  marks: 2,
  stem: 'State four functions of the human skeleton.',
  model: 'The skeleton (i) **supports** the body and gives it shape, (ii) **protects** soft organs such as the brain, heart and lungs, (iii) provides **levers and attachment** for muscles so that movement is possible, and (iv) forms **blood cells** in the red marrow and **stores calcium and phosphate**.',
  sol: 'Four functions.',
  scheme: [['Two functions', 1], ['Two more functions', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('ribcage-short', short({
  marks: 2,
  stem: `Distinguish true, false and floating ribs, giving the number of pairs of each kind and the total number of ribs.`,
  model: `**True ribs** (${RIBS.true} pairs) join the sternum **directly** through their own cartilage. **False ribs** (${RIBS.false} pairs) join the sternum **indirectly**, through the cartilage of the rib above. **Floating ribs** (${RIBS.floating} pairs) are **not attached to the sternum** at the front. In all there are ${RIB_N} ribs.`,
  sol: 'Three kinds; total.',
  scheme: [['True and false ribs with numbers', 1], ['Floating ribs and total', 1]],
  d: 2, c: 'understanding', t: [3],
}), () => RIB_N === 24 || 'ribs');
add('vertebral-short3', short({
  marks: 3,
  stem: 'Name the regions of the adult vertebral column in order from the skull downwards, with the number of bones in each, and explain how the total is reached.',
  model: `**Cervical ${VERT.cervical}** (the first is the atlas, the second the axis), **thoracic ${VERT.thoracic}** (bearing ribs), **lumbar ${VERT.lumbar}**, **sacrum ${VERT.sacrum}** (fused sacral vertebrae) and **coccyx ${VERT.coccyx}** (fused coccygeal vertebrae). The total is ${VERT.cervical} + ${VERT.thoracic} + ${VERT.lumbar} + ${VERT.sacrum} + ${VERT.coccyx} = **${VERT_N}**.`,
  sol: 'Regions with numbers; total.',
  scheme: [['Cervical, thoracic, lumbar', 1], ['Sacrum and coccyx as fused', 1], ['Total of 26', 1]],
  d: 2, c: 'understanding', t: [3],
}), () => VERT_N === 26 || 'vert');
add('limb-short3', short({
  marks: 3,
  stem: 'List the bones of one human upper limb from the shoulder to the fingertips, with the number of each, and give the total for both upper limbs.',
  model: `One upper limb: **humerus 1**, **radius 1**, **ulna 1**, **carpals ${HAND.carpals}**, **metacarpals ${HAND.metacarpals}**, **phalanges ${HAND.phalanges}**. That is ${3 + HAND_N} bones in one limb (${HAND_N} in the hand), so the **two upper limbs have ${APPEND.upper} bones**; the pectoral girdle (clavicle and scapula) adds ${APPEND.pectoral} more.`,
  sol: 'List; totals.',
  scheme: [['Humerus, radius, ulna', 1], ['Carpals, metacarpals, phalanges', 1], ['Total 60 for both limbs', 1]],
  d: 2, c: 'understanding', t: [3],
}), () => APPEND.upper === 60 || 'limb');
add('skeleton-long', long({
  stem: `(a) Classify the ${TOTAL} bones of the adult skeleton into axial and appendicular parts, giving the number of bones in each. [2]\n(b) Name the groups of bones that make up the axial skeleton, with their numbers. [2]\n(c) Name the girdle that joins the lower limb to the axis of the body and the socket in it that receives the femur. [1]`,
  model: `(a) The **axial skeleton** has **${AXIAL_N}** bones and the **appendicular skeleton** has **${APPEND_N}**; ${AXIAL_N} + ${APPEND_N} = **${TOTAL}**.\n\n(b) **Skull ${SKULL_N}** (cranium ${SKULL.cranium}, face ${SKULL.face}, hyoid ${SKULL.hyoid}, ear ossicles ${SKULL.ossicles}), **vertebral column ${VERT_N}**, **sternum ${AXIAL.sternum}** and **ribs ${RIB_N}**.\n\n(c) The **pelvic girdle** (two hip bones); the socket is the **acetabulum**.`,
  sol: 'Classification; axial groups; pelvic girdle.',
  scheme: [['(a) Axial and appendicular numbers', 2], ['(b) Skull and vertebral column', 1], ['(b) Sternum and ribs', 1], ['(c) Pelvic girdle and acetabulum', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [3],
}));
add('child-reason', short({
  marks: 1,
  stem: 'Give a reason: A young child’s backbone has more separate vertebrae than an adult’s.',
  model: `Some vertebrae **fuse** as the child grows: the five sacral vertebrae form the **sacrum** and the four coccygeal vertebrae form the **coccyx**.`,
  sol: 'Fusion.',
  scheme: [['Sacral and coccygeal vertebrae fuse', 1]],
  wl: null,
  d: 2, c: 'application', t: [3],
}));
add('fibula-analogy', short({
  marks: 1,
  stem: 'Complete the analogy: Radius : forearm :: fibula : ______.',
  model: '**Leg (lower leg), between the knee and ankle.**',
  sol: 'Lower leg.',
  scheme: [['Leg / shank', 1]],
  wl: null,
  d: 1, c: 'recall', t: [3],
}));

// ---------------------------------------------------------------- t04 joints
add('pubic-mcq', mcq({
  stem: 'The two pubic bones in front of the pelvis are joined by a pad of fibrocartilage, which allows only slight movement. This joint is',
  right: 'cartilaginous',
  wrong: ['fibrous', 'a synovial pivot joint', 'a synovial gliding joint'],
  sol: 'Bones joined by cartilage and slightly movable: cartilaginous — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('hip-mcq', mcq({
  stem: 'A ballet dancer swings her leg forward, sideways and backwards, and also turns it in its socket, at the hip. The hip joint is a',
  right: 'ball and socket joint',
  wrong: ['hinge joint', 'pivot joint', 'saddle joint'],
  sol: 'The rounded head of the femur in the acetabulum allows movement in all directions — option (@K).',
  d: 1, c: 'application', t: [4],
}));
add('pivot-mcq', mcq({
  stem: 'When you shake your head to say “no”, the first cervical vertebra turns on a peg of the second. This joint is',
  right: 'a pivot joint',
  wrong: ['a hinge joint', 'a gliding joint', 'a ball and socket joint'],
  sol: 'The atlas rotates around the odontoid peg of the axis: a pivot joint — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('hinge-mcq', mcq({
  stem: 'An engineer copying the human elbow for a robot arm needs a joint that bends and straightens in one plane only. She should use a',
  right: 'hinge joint',
  wrong: ['ball and socket joint', 'pivot joint', 'saddle joint'],
  sol: 'The elbow is a hinge joint — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('synovial-mcq', mcq({
  stem: 'Which pair correctly names a feature of a synovial joint and its function?',
  right: 'Synovial fluid — reduces friction between the bone ends',
  wrong: ['Ligament — joins muscle to bone', 'Articular cartilage — secretes synovial fluid', 'Fibrous capsule — forms blood cells'],
  sol: 'Synovial fluid lubricates the joint; ligaments join bone to bone; the synovial membrane secretes the fluid — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('ligament-fill', fill({
  stem: 'Bands of tough connective tissue that join one bone to another at a joint are called ______.',
  acc: [['ligaments', 'ligament']],
  sol: 'Ligaments.',
  d: 1, c: 'recall', t: [4],
}));
add('knee-tf', tf({
  stem: 'The knee is a ball and socket joint.',
  key: 'f',
  sol: 'False. The knee is a hinge joint.',
  d: 1, c: 'recall', t: [4],
}));
add('joint-match', match({
  stem: 'Match each joint (column I) with its type (column II).',
  pairs: [
    ['Elbow', 'Gliding'],
    ['Hip', 'Pivot'],
    ['Atlas and axis', 'Hinge'],
    ['Between carpal bones', 'Ball and socket'],
  ],
  order: [2, 3, 1, 0],
  sol: 'Elbow — hinge; hip — ball and socket; atlas and axis — pivot; carpals — gliding.',
  d: 2, c: 'understanding', t: [4],
}));
add('jointclass-short', short({
  marks: 2,
  stem: 'Classify joints on the basis of what lies between the bones, with one example of each class.',
  model: '**Fibrous** joints have **dense fibrous tissue** between the bones and are **fixed**, for example the **sutures of the skull**. **Cartilaginous** joints have **cartilage** and are **slightly movable**, for example the joints **between vertebrae**. **Synovial** joints have a **fluid-filled cavity** and are **freely movable**, for example the **shoulder**.',
  sol: 'Three classes with examples.',
  scheme: [['Fibrous and cartilaginous with examples', 1], ['Synovial with example', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('synfunc-short', short({
  marks: 2,
  stem: 'Name two parts of a synovial joint that reduce friction, and the structure that holds the bones together.',
  model: '**Articular cartilage** covers the bone ends and is smooth, and **synovial fluid**, made by the **synovial membrane**, lubricates the cavity. The bones are held together by the **fibrous capsule** and the **ligaments**, which join bone to bone.',
  sol: 'Cartilage, fluid; capsule and ligaments.',
  scheme: [['Cartilage and fluid', 1], ['Capsule and ligaments', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('saddle-short3', short({
  marks: 3,
  stem: 'Name any three types of synovial joint and, for each, give a location in the body and the kind of movement it permits.',
  model: '**Ball and socket** at the **shoulder** or hip: movement in all directions with rotation. **Hinge** at the **elbow** or knee: bending and straightening in one plane. **Pivot** between the **atlas and axis**: rotation, as in turning the head. (A **gliding** joint between carpals allows sliding, and a **saddle** joint at the base of the thumb allows movement in two planes.)',
  sol: 'Three types with location and movement.',
  scheme: [['Ball and socket', 1], ['Hinge', 1], ['Pivot or another type', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('joints-long', long({
  stem: '(a) State the three structural classes of joint with an example of each. [2]\n(b) Draw a labelled diagram of a synovial joint. [2]\n(c) Name the type of joint between the atlas and axis and state its function. [1]',
  model: `(a) **Fibrous:** immovable, as in the **skull sutures**; **cartilaginous:** slightly movable, as between **vertebrae**; **synovial:** freely movable, as at the **shoulder**.\n\n(b) **Diagram:** two bone ends with **articular cartilage**, a **joint cavity with synovial fluid**, **synovial membrane**, **fibrous capsule** and **ligaments**.\n\n(c) A **pivot joint**; it allows the head to **rotate** from side to side.`,
  sol: 'Classes; synovial diagram; pivot.',
  scheme: [['(a) Three classes with examples', 2], ['(b) Labelled synovial joint', 2], ['(c) Pivot, rotation of head', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [4],
}));
add('suture-reason', short({
  marks: 1,
  stem: 'Give a reason: A person can move the lower jaw but cannot move the bones of the upper skull.',
  model: 'The upper skull bones are joined by **fibrous sutures**, which are **fixed**, whereas the lower jaw meets the skull at a **synovial joint**, which is **freely movable**.',
  sol: 'Fibrous vs synovial.',
  scheme: [['Sutures fixed; jaw joint synovial', 1]],
  wl: null,
  d: 2, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- t05 disorders
add('gout-mcq', mcq({
  stem: 'A man wakes at night with a hot, swollen, intensely painful big toe after a heavy meal rich in meat. A blood test shows a high level of uric acid. His condition is most likely',
  right: 'gout',
  wrong: ['osteoporosis', 'tetany', 'muscular dystrophy'],
  sol: 'Uric acid crystals in the joint cause gout — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('tetany-mcq', mcq({
  stem: 'After a neck operation, a girl develops tingling and painful spasms of the hands and feet. Her blood calcium is found to be low. Which glands were most likely damaged?',
  right: 'The parathyroid glands, so the calcium level in body fluid fell',
  wrong: ['The adrenal glands, so the sodium level rose', 'The pancreas, so the blood glucose level rose', 'The thymus, so the immune response failed'],
  sol: 'Low parathormone lowers blood calcium, causing the spasms of tetany — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('osteo-mcq', mcq({
  stem: 'An elderly woman has shrunk in height by 5 cm, has a stooped back, and has fractured a vertebra by coughing. An X-ray shows low bone density. Which factor helps most to keep up bone mass in later life?',
  right: 'Adequate calcium and vitamin D with weight-bearing exercise',
  wrong: ['A diet rich in uric acid precursors', 'Complete rest in bed', 'Avoiding all exposure to sunlight'],
  sol: 'Calcium, vitamin D and exercise protect bone mass against osteoporosis — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('mg-mcq', mcq({
  stem: 'In myasthenia gravis, muscles become weak because',
  right: 'antibodies attack the acetylcholine receptors at the neuromuscular junction',
  wrong: ['the blood calcium level falls', 'uric acid crystals form in the joints', 'the dystrophin gene is absent'],
  sol: 'It is an autoimmune disorder of the neuromuscular junction — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('arthritis-mcq', mcq({
  stem: 'Which statement distinguishes osteoarthritis from rheumatoid arthritis?',
  right: 'Osteoarthritis is mainly wear of the articular cartilage; rheumatoid arthritis is an autoimmune attack on the synovial membrane.',
  wrong: ['Osteoarthritis is autoimmune; rheumatoid arthritis is caused by uric acid crystals.', 'Osteoarthritis affects only the skull; rheumatoid arthritis affects the limbs.', 'Rheumatoid arthritis is caused by loss of bone mass.'],
  sol: 'Cartilage wear versus autoimmune attack on the synovial membrane — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('uric-fill', fill({
  stem: 'Gout is caused by the deposition of crystals of ______ acid in the joints.',
  acc: [['uric']],
  sol: 'Uric acid.',
  d: 1, c: 'recall', t: [5],
}));
add('disorder-match', match({
  stem: 'Match each disorder (column I) with its cause (column II).',
  pairs: [
    ['Myasthenia gravis', 'Low level of calcium ions in body fluid'],
    ['Tetany', 'Uric acid crystals in joints'],
    ['Gout', 'Decreased bone mass'],
    ['Osteoporosis', 'Autoimmune attack on acetylcholine receptors'],
  ],
  order: [3, 0, 1, 2],
  sol: 'Myasthenia gravis — antibodies against acetylcholine receptors; tetany — low calcium; gout — uric acid crystals; osteoporosis — decreased bone mass.',
  d: 2, c: 'understanding', t: [5],
}));
add('tetany-short', short({
  marks: 2,
  stem: 'What is tetany? State its cause and its main symptom.',
  model: '**Tetany** is a disorder of rapid, painful **muscle spasms**. It is caused by a **low level of calcium ions** in the body fluids, for example when the **parathyroid glands** do not make enough **parathormone**. Low calcium makes nerves and muscles **over-excitable**.',
  sol: 'Cause and symptom.',
  scheme: [['Spasms as symptom', 1], ['Low calcium as cause', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('arthritis-short', short({
  marks: 2,
  stem: 'What is arthritis? Name two ways in which a joint can be damaged in it.',
  model: '**Arthritis** is **inflammation of the joints**, with pain, stiffness and swelling. A joint may be damaged by **wearing away of the articular cartilage** (osteoarthritis) or by an **autoimmune attack on the synovial membrane** (rheumatoid arthritis).',
  sol: 'Inflammation; two causes.',
  scheme: [['Inflammation of joints, symptoms', 1], ['Two types or causes', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('disorders-short3', short({
  marks: 3,
  stem: 'Name the disorder in each case and give its cause: (i) a boy whose leg muscles have wasted slowly since early childhood, with other boys in his mother’s family affected; (ii) a woman whose eyelids droop and who cannot chew for long; (iii) a man with sudden severe pain in the big toe.',
  model: '(i) **Muscular dystrophy**: a **genetic** disorder (Duchenne type is **X-linked**) with progressive degeneration of skeletal muscle. (ii) **Myasthenia gravis**: **antibodies attack acetylcholine receptors** at the neuromuscular junction, so signals fail and muscles tire. (iii) **Gout**: **uric acid crystals** deposit in the joint and cause inflammation.',
  sol: 'Three disorders and causes.',
  scheme: [['Muscular dystrophy with cause', 1], ['Myasthenia gravis with cause', 1], ['Gout with cause', 1]],
  d: 3, c: 'application', t: [5],
}));
add('osteo-short3', short({
  marks: 3,
  stem: 'Explain why women are more at risk of osteoporosis after menopause, and state two measures that help to prevent it.',
  model: '**Osteoporosis** is a **decrease in bone mass** that makes bones brittle. After **menopause** the level of **oestrogen** falls, and with it the protection of bone, so bone mass is lost faster. It can be reduced by a diet rich in **calcium and vitamin D** and by regular **weight-bearing exercise**, started early in life.',
  sol: 'Oestrogen fall; two preventions.',
  scheme: [['Definition of osteoporosis', 1], ['Fall of oestrogen after menopause', 1], ['Two preventive measures', 1]],
  d: 2, c: 'application', t: [5],
}));
add('disorders-long', long({
  stem: '(a) Name the muscle disorder that results from the action of antibodies on the neuromuscular junction, and state two symptoms. [2]\n(b) Differentiate between tetany and muscular dystrophy. [2]\n(c) Name the disorder caused by a high level of uric acid in the blood. [1]',
  model: '(a) **Myasthenia gravis**: antibodies block **acetylcholine receptors**; symptoms are **muscle weakness and fatigue** and **drooping eyelids**.\n\n(b) **Tetany** is caused by **low calcium** in body fluids and gives rapid **spasms**, which can be relieved when calcium is restored; **muscular dystrophy** is **genetic**, with **progressive degeneration** of muscle that is not reversed.\n\n(c) **Gout**, in which **uric acid crystals** collect in joints.',
  sol: 'Myasthenia gravis; tetany vs dystrophy; gout.',
  scheme: [['(a) Myasthenia gravis and symptoms', 2], ['(b) Tetany cause and symptom', 1], ['(b) Dystrophy cause and symptom', 1], ['(c) Gout', 1]],
  wl: [60, 200],
  d: 3, c: 'understanding', t: [5],
}));
add('osteo-reason', short({
  marks: 1,
  stem: 'Give a reason: Older people often break a bone after a minor fall.',
  model: 'Their **bone mass has decreased** (osteoporosis), so the bones are **thin and brittle** and break easily.',
  sol: 'Reduced bone mass.',
  scheme: [['Decreased bone mass, brittle bones', 1]],
  wl: null,
  d: 2, c: 'understanding', t: [5],
}));
