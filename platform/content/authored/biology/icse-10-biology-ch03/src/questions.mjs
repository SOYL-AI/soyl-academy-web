// ICSE 10 Biology ch03 Absorption by Roots and the Ascent of Sap — question bank in ICSE 2027 style.
// Experiment readings are imagined; percentages and rates are computed by calc.mjs.
// AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true, R does not explain.
import { mk, add, svgV, r } from '../../icse-10-biology-ch01/src/lib.mjs';
import { STRIPS, ISOTONIC, FUNNEL, FIRST_HOUR, SECOND_HOUR } from './calc.mjs';
import { ROOTHAIR_LETTERED, THISTLE, OSMOSCOPE, PLASMO } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, match, part } = mk;
const hairFig = svgV(ROOTHAIR_LETTERED, 'A root hair cell with parts lettered A to F');
const funnelFig = svgV(THISTLE, 'Thistle funnel osmosis experiment');
const scopeFig = svgV(OSMOSCOPE, 'Potato osmoscope with a control');
const plasmoFig = svgV(PLASMO, 'Turgid, flaccid and plasmolysed cells');
const stripTable = `| Sugar solution (M) | Mass at start (g) | Mass after 2 hours (g) |\n|---|---|---|\n${STRIPS.map((s) => `| ${s.conc} | ${s.start.toFixed(1)} | ${s.end.toFixed(1)} |`).join('\n')}`;

// ---------------------------------------------------------------- t01 imbibition, diffusion, osmosis
add('imbibition-mcq', mcq({
  stem: 'Dry raisins placed in water swell up within a few hours. This is mainly due to',
  right: 'imbibition', wrong: ['plasmolysis', 'guttation', 'transpiration'],
  sol: 'Dry plant material absorbs water and swells by imbibition — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('diffusion-mcq', mcq({
  stem: 'The smell of a burning incense stick spreads through a closed room without any fan. This is an example of',
  right: 'diffusion', wrong: ['osmosis', 'imbibition', 'active transport'],
  sol: 'Molecules spread from a region of higher to lower concentration on their own — diffusion, option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('osmosis-mcq', mcq({
  stem: 'Osmosis is the movement of',
  right: 'water molecules through a selectively permeable membrane from a dilute solution to a concentrated one', wrong: ['solute molecules from a concentrated solution to a dilute one', 'any molecules through a fully permeable membrane', 'water molecules against a concentration gradient using energy'],
  sol: 'Osmosis is the passage of water (the solvent) across a selectively permeable membrane towards the stronger solution — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('membrane-mcq', mcq({
  stem: 'In the thistle funnel experiment, the parchment paper tied over the funnel acts as',
  right: 'a selectively permeable membrane', wrong: ['a fully permeable membrane', 'an impermeable barrier', 'a source of sugar'],
  sol: 'Parchment lets water through but not the larger sugar molecules — option (@K).',
  d: 2, c: 'understanding', t: [1],
  assets: [funnelFig],
}));
add('op-mcq', mcq({
  stem: 'Which of these solutions has the highest osmotic pressure?',
  right: 'A strong (concentrated) sugar solution', wrong: ['Pure water', 'A dilute sugar solution', 'Tap water with a pinch of sugar'],
  sol: 'The more concentrated the solution, the greater its tendency to draw in water, so its osmotic pressure is higher — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('kmno4-tf', tf({
  stem: 'A crystal of potassium permanganate dropped into still water colours all the water only if it is stirred.',
  key: 'f',
  sol: 'False. The colour spreads by itself through diffusion, though stirring speeds it up.',
  d: 1, c: 'understanding', t: [1],
}));
add('osmo-ar', ar({
  a: 'Osmosis is a special kind of diffusion.',
  r: 'In osmosis only water molecules move, and they pass through a selectively permeable membrane.',
  key: 'c',
  sol: 'Both are true; osmosis is diffusion of water across a selectively permeable membrane, which is what the reason explains — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('imbib-ar', ar({
  a: 'Wooden doors swell and jam in the rainy season.',
  r: 'Wood absorbs water by osmosis through a selectively permeable membrane.',
  key: 'a',
  sol: 'The assertion is true. The reason is false: dry wood takes up water by imbibition, not osmosis — option (a).',
  d: 3, c: 'analysis', t: [1],
}));
add('osmosis-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the absorption of water by dry solid materials such as seeds, which then swell.',
  model: '**Imbibition.**', sol: 'Imbibition.', scheme: [['Imbibition', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('op-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the pressure that must be applied to a solution to stop water entering it by osmosis.',
  model: '**Osmotic pressure.**', sol: 'Osmotic pressure.', scheme: [['Osmotic pressure', 1]],
  d: 2, c: 'recall', t: [1],
}));
add('odd-processes', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Diffusion, Osmosis, Imbibition, Active transport.',
  model: '**Active transport**; the others are **passive processes** that need no energy from the cell.',
  sol: 'Active transport uses energy.', scheme: [['Odd one and category', 1]],
  d: 3, c: 'analysis', t: [1, 4],
}));
add('diff-osmo-short', short({
  marks: 2,
  stem: 'State two differences between diffusion and osmosis.',
  model: '1. **Diffusion** is the movement of **any** molecules (gas, liquid or solute); **osmosis** is movement of **water** only.\n2. Diffusion needs **no membrane**; osmosis takes place through a **selectively permeable membrane**.',
  sol: 'Substance moved; membrane.',
  scheme: [['First difference', 1], ['Second difference', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('seed-reason', short({
  marks: 1, wl: null,
  stem: 'Give reason: seeds are soaked in water before sowing.',
  model: 'Soaking lets the seeds **imbibe water**, which softens the seed coat and starts **germination**.',
  sol: 'Imbibition starts germination.', scheme: [['Imbibition aids germination', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 turgidity, flaccidity, plasmolysis
add('turgid-mcq', mcq({
  stem: 'A plant cell kept in pure water becomes',
  right: 'turgid, with its cytoplasm pressed against the cell wall', wrong: ['plasmolysed', 'flaccid', 'burst open like a red blood cell'],
  sol: 'Water enters by endosmosis and the cell swells until the rigid wall resists further entry: turgid — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('plasmolysis-mcq', mcq({
  stem: 'Leaf-peel cells placed in strong salt solution are seen under a microscope with their cytoplasm shrunk away from the cell wall. This condition is',
  right: 'plasmolysis', wrong: ['turgidity', 'deplasmolysis', 'imbibition'],
  sol: 'Loss of water by exosmosis makes the cytoplasm pull away from the wall — option (@K).',
  d: 2, c: 'application', t: [2],
  assets: [plasmoFig],
}));
add('hypertonic-mcq', mcq({
  stem: 'A solution that is more concentrated than the cell sap, so that the cell loses water to it, is called',
  right: 'hypertonic', wrong: ['hypotonic', 'isotonic', 'neutral'],
  sol: 'A stronger outside solution is hypertonic and draws water out of the cell — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('fertiliser-mcq', mcq({
  stem: 'A farmer adds far too much fertiliser around young plants, and they wilt even though the soil is moist. The best explanation is that',
  right: 'the soil water became hypertonic, so water moved out of the root cells', wrong: ['the fertiliser blocked the stomata', 'the roots absorbed too much water and burst', 'the fertiliser stopped photosynthesis'],
  sol: 'Concentrated soil solution draws water out of root cells (exosmosis), causing plasmolysis and wilting — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('pickle-mcq', mcq({
  stem: 'Why do salted mango pieces in a pickle not rot quickly?',
  right: 'Strong salt draws water out of bacterial cells by osmosis, killing or stopping them', wrong: ['Salt adds oxygen that kills bacteria', 'Salt makes the mango cells turgid', 'Bacteria cannot reach the jar'],
  sol: 'Salt makes a hypertonic medium; microbes lose water and cannot grow — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('deplasm-tf', tf({
  stem: 'A plasmolysed cell can usually be restored by placing it in water soon afterwards.',
  key: 't',
  sol: 'True. If not left too long, water re-enters and the cell becomes turgid again — deplasmolysis.',
  d: 2, c: 'understanding', t: [2],
}));
add('turgor-ar', ar({
  a: 'Herbaceous plants stand upright when well watered.',
  r: 'Turgid cells press against one another and give support to soft stems and leaves.',
  key: 'c',
  sol: 'Both are true, and turgor pressure is what keeps soft plant parts firm and upright — option (c).',
  d: 2, c: 'analysis', t: [2],
}));
add('plasmo-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the swelling back of a plasmolysed cell when it is placed in water.',
  model: '**Deplasmolysis.**', sol: 'Deplasmolysis.', scheme: [['Deplasmolysis', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('flaccid-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the limp state of a plant cell that has lost some water and exerts no pressure on its wall.',
  model: '**Flaccidity** (the cell is flaccid).', sol: 'Flaccid.', scheme: [['Flaccid / flaccidity', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('weeds-reason', short({
  marks: 1, wl: null,
  stem: 'Give reason: sprinkling a lot of common salt on lawn weeds kills them.',
  model: 'Salt makes the soil water **hypertonic**; the weed cells **lose water** by exosmosis, become **plasmolysed** and die.',
  sol: 'Exosmosis and plasmolysis.', scheme: [['Exosmosis / plasmolysis', 1]],
  d: 3, c: 'application', t: [2],
}));
add('tonic-short', short({
  marks: 2,
  stem: 'Predict what happens to a plant cell placed in (a) a hypotonic solution and (b) an isotonic solution. Give a reason for each.',
  model: '(a) It becomes **turgid**: the outside is weaker, so water **enters** by osmosis. (b) It shows **no change**: concentrations are **equal**, so there is no net movement of water.',
  sol: 'Turgid; no change.',
  scheme: [['Hypotonic: turgid, water enters', 1], ['Isotonic: no net change', 1]],
  d: 2, c: 'application', t: [2],
}));
add('plasmo-draw', short({
  marks: 3, wl: null,
  stem: 'Draw neat, labelled diagrams of a turgid cell and a plasmolysed cell. Label the cell wall, cytoplasm and vacuole in each.',
  model: 'Turgid cell: **cytoplasm pressed against the cell wall**, a **large vacuole** in the centre. Plasmolysed cell: the **cytoplasm shrunk away** from the wall into a small mass, **small vacuole**, a **gap** between wall and cytoplasm filled with outside solution.',
  sol: 'Two labelled cells.',
  scheme: [['Turgid cell correct', 1], ['Plasmolysed cell correct', 1], ['Labels', 1]],
  d: 2, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 root hair and adaptations
add('roothair-mcq', mcq({
  stem: 'A root hair is',
  right: 'a long, thin outgrowth of a single epidermal cell of the root', wrong: ['a branch of the root with many cells', 'a hair-like part of the root cap', 'a xylem vessel that grows into the soil'],
  sol: 'Each root hair is an extension of one epidermal cell — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('surface-mcq', mcq({
  stem: 'The main advantage of the thousands of root hairs on a young root is that they',
  right: 'greatly increase the surface area for absorbing water', wrong: ['make the root heavier to anchor it', 'store food for the plant', 'carry out photosynthesis underground'],
  sol: 'More surface area means more water and minerals can be absorbed — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('hairfig-mcq', mcq({
  stem: 'In the diagram of a root hair, which letter marks the part whose sap is more concentrated than the soil water, so that water enters by osmosis?',
  right: 'E', wrong: ['A', 'C', 'F'],
  sol: 'E is the large vacuole of cell sap. A is the cell wall, C the nucleus and F a soil particle — option (@K).',
  d: 3, c: 'application', t: [3],
  assets: [hairFig],
}));
add('cuticle-tf', tf({
  stem: 'Root hairs have a thick waxy cuticle to protect them from the soil.',
  key: 'f',
  sol: 'False. Root hairs have no cuticle; their wall is thin so that water can enter easily.',
  d: 2, c: 'understanding', t: [3],
}));
add('hair-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the zone of a young root that bears root hairs.',
  model: '**Root hair zone** (zone of absorption).', sol: 'Root hair zone.', scheme: [['Root hair zone', 1]],
  d: 2, c: 'recall', t: [3],
}));
add('adapt-short', short({
  marks: 2,
  stem: 'Give two features of a root hair that make it suited for absorbing water.',
  model: '1. It is **long and thin**, with a **large surface area** in close contact with soil water.\n2. Its **cell wall is thin** and its **sap is more concentrated** than soil water, so water enters by **osmosis**.',
  sol: 'Surface area; thin wall; concentrated sap; no cuticle.',
  scheme: [['First feature', 1], ['Second feature', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('hair-draw', short({
  marks: 3, wl: null,
  stem: 'Draw a neat, labelled diagram of a single full-grown root hair. Label the cell wall, cell membrane, nucleus, cytoplasm and vacuole.',
  model: 'An epidermal cell with a **long tubular outgrowth** among soil particles; a thin **cell wall** outside the **cell membrane**; **cytoplasm** lining the cell; a **nucleus** near the base or moving into the hair; a large **vacuole** of cell sap filling the hair.',
  sol: 'Root hair with five labels.',
  scheme: [['Outline of cell with long hair', 1], ['Vacuole and nucleus correctly placed', 1], ['Five labels', 1]],
  d: 2, c: 'application', t: [3],
}));
add('transplant-reason', short({
  marks: 1, wl: null,
  stem: 'Give reason: seedlings transplanted with a ball of soil around their roots wilt less.',
  model: 'The soil ball **protects the root hairs** from damage, so the seedling can keep **absorbing water**.',
  sol: 'Root hairs intact.', scheme: [['Root hairs not damaged', 1]],
  d: 3, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 absorption of water and minerals
add('path-mcq', mcq({
  stem: 'Which is the correct path of water from the soil into a root?',
  right: 'Root hair → cortex → endodermis → pericycle → xylem', wrong: ['Xylem → cortex → root hair → endodermis', 'Root hair → xylem → cortex → endodermis', 'Cortex → root hair → pericycle → xylem'],
  sol: 'Water passes inwards from the root hair across the cortex, endodermis and pericycle into the xylem — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('active-mcq', mcq({
  stem: 'A root takes up potassium ions even though there are more potassium ions inside its cells than in the soil. This uptake is by',
  right: 'active transport, using energy from respiration', wrong: ['diffusion', 'osmosis', 'imbibition'],
  sol: 'Movement against a concentration gradient needs energy — active transport, option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('oxygen-mcq', mcq({
  stem: 'Plants in waterlogged soil often take up fewer minerals. The most likely reason is that',
  right: 'roots get little oxygen, so respiration and active transport slow down', wrong: ['water dissolves all the minerals', 'root hairs grow too long', 'the xylem fills with air'],
  sol: 'Active uptake needs energy from aerobic respiration; waterlogged soil is short of air — option (@K).',
  d: 4, c: 'analysis', t: [4],
}));
add('active-ar', ar({
  a: 'Minerals are absorbed by roots only by diffusion.',
  r: 'Active transport moves ions against their concentration gradient using energy.',
  key: 'b',
  sol: 'The assertion is false: minerals are also taken up actively, often against the gradient. The reason is true — option (b).',
  d: 3, c: 'analysis', t: [4],
}));
add('passive-short', short({
  marks: 2,
  stem: 'Distinguish between passive and active absorption of minerals by roots.',
  model: '**Passive:** ions move **down** their concentration gradient by **diffusion**, with **no energy** from the cell. **Active:** ions move **against** the gradient, using **energy (ATP)** from respiration and carrier proteins.',
  sol: 'Gradient and energy.',
  scheme: [['Passive described', 1], ['Active described', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('cell-to-cell-short', short({
  marks: 2,
  stem: 'Explain how water moves from the root hair across the cortex to the xylem.',
  model: 'Water entering the root hair makes its sap **more dilute** than the next cortex cell, so water passes on by **osmosis**. Each cell further **inwards** has slightly **stronger sap**, so water moves **cell to cell** until it reaches the **xylem**.',
  sol: 'Osmosis along a gradient.',
  scheme: [['Osmosis cell to cell', 1], ['Gradient inwards to the xylem', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('endo-fill', fill({
  stem: 'Before entering the xylem, water crosses a single layer of cells called the ______ and then the pericycle.',
  acc: [['endodermis']],
  sol: 'Endodermis.',
  d: 2, c: 'recall', t: [4],
}));

// ---------------------------------------------------------------- t05 ascent of sap
add('sap-mcq', mcq({
  stem: 'The upward movement of water and dissolved minerals from roots to leaves is called',
  right: 'ascent of sap', wrong: ['translocation of food', 'guttation', 'transpiration'],
  sol: 'Ascent of sap takes place through the xylem — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('pull-mcq', mcq({
  stem: 'In a tall tree, the main force that lifts water to the top is',
  right: 'transpiration pull from the leaves', wrong: ['root pressure alone', 'gravity', 'active pumping by phloem'],
  sol: 'Evaporation from leaves creates a pull on the continuous water column — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('cohesion-mcq', mcq({
  stem: 'The column of water in the xylem does not break even when pulled from above because water molecules',
  right: 'stick strongly to one another (cohesion)', wrong: ['repel one another', 'are pushed by gravity', 'are made in the leaves'],
  sol: 'Cohesion holds the water column together; adhesion holds it to the xylem walls — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('rootpressure-mcq', mcq({
  stem: 'When a well-watered potted balsam stem is cut just above the soil, sap oozes from the cut stump for some time. This shows',
  right: 'root pressure', wrong: ['transpiration pull', 'guttation', 'plasmolysis'],
  sol: 'The roots push water up from below even without leaves — root pressure, option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('xylem-tf', tf({
  stem: 'Water and minerals move up the stem through the phloem.',
  key: 'f',
  sol: 'False. They move up through the xylem; phloem carries food.',
  d: 1, c: 'recall', t: [5],
}));
add('sap-ar', ar({
  a: 'Water rises to the top of tall trees mainly by transpiration pull.',
  r: 'Root pressure alone is large enough to push water to the top of the tallest trees.',
  key: 'a',
  sol: 'The assertion is true. The reason is false: root pressure is small and can lift water only a short way — option (a).',
  d: 3, c: 'analysis', t: [5],
}));
add('adhesion-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the attraction between water molecules and the walls of the xylem vessels.',
  model: '**Adhesion.**', sol: 'Adhesion.', scheme: [['Adhesion', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('odd-forces', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Root pressure, Cohesion, Transpiration pull, Plasmolysis.',
  model: '**Plasmolysis**; the others are **forces that help the ascent of sap**.',
  sol: 'Plasmolysis is loss of water from a cell.', scheme: [['Odd one and category', 1]],
  d: 2, c: 'analysis', t: [5],
}));
add('ascent-short', short({
  marks: 2,
  stem: 'Explain how transpiration pull, cohesion and adhesion together raise water in a tall tree.',
  model: 'Water **evaporating** from leaves pulls on the water in the xylem (**transpiration pull**). **Cohesion** keeps the thin water column **unbroken**, and **adhesion** to the vessel walls stops it **slipping down**, so the whole column is drawn up.',
  sol: 'Pull plus cohesion and adhesion.',
  scheme: [['Transpiration pull', 1], ['Cohesion and adhesion roles', 1]],
  d: 3, c: 'understanding', t: [5],
}));
add('xylem-exp-short', short({
  marks: 3,
  stem: 'Describe an experiment to show that water is conducted upwards through the xylem.',
  model: 'Place a leafy **balsam shoot** in water coloured with **red ink (or eosin)** and keep it in light for a few hours. **Red streaks** appear in the stem and veins. A thin **cross-section** of the stem shows that only the **xylem** of each vascular bundle is stained red, so water moves up through the **xylem**.',
  sol: 'Coloured water; cross-section; xylem stained.',
  scheme: [['Set-up with coloured water', 1], ['Observation in the section', 1], ['Conclusion: xylem', 1]],
  d: 2, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- 5-mark Question 2 style items
add('absorb-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [osmosis, root hairs, xylem, diffusion, hypertonic, turgid, phloem, endodermis]\n\nWater enters a root through its (a) ______ by (b) ______, because their cell sap is more concentrated than soil water. It then passes across the cortex and the (c) ______ into the (d) ______, which carries it up the stem. Cells that have taken in plenty of water become (e) ______.',
  acc: [['root hairs', 'root hair'], ['osmosis'], ['endodermis'], ['xylem'], ['turgid']],
  sol: '(a) root hairs; (b) osmosis; (c) endodermis; (d) xylem; (e) turgid.',
  d: 2, c: 'understanding', t: [3, 4, 2],
}));
add('osmo-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [selectively permeable, imbibition, hypotonic, plasmolysis, osmotic pressure, diffusion, deplasmolysis, isotonic]\n\nThe spreading of scent in a room is (a) ______. Swelling of dry seeds in water is (b) ______. A cell placed in a (c) ______ solution gains water. A cell in strong salt solution shows (d) ______, which can be reversed in water by (e) ______.',
  acc: [['diffusion'], ['imbibition'], ['hypotonic'], ['plasmolysis'], ['deplasmolysis']],
  sol: '(a) diffusion; (b) imbibition; (c) hypotonic; (d) plasmolysis; (e) deplasmolysis.',
  d: 2, c: 'understanding', t: [1, 2],
}));
add('hair-match5', match({
  marks: 5,
  stem: 'Study the diagram of a root hair and match each lettered part with its function.',
  pairs: [
    ['A', 'Thin, freely permeable outer layer that gives shape'],
    ['B', 'Selectively permeable layer that controls what enters the cell'],
    ['C', 'Controls the activities of the cell'],
    ['E', 'Holds cell sap more concentrated than soil water'],
    ['F', 'Holds the film of water from which the hair absorbs'],
  ],
  order: [1, 4, 0, 3, 2],
  sol: 'A cell wall; B cell membrane; C nucleus; E vacuole; F soil particle.',
  d: 2, c: 'application', t: [3],
  assets: [hairFig],
}));

// ---------------------------------------------------------------- case-based (10 marks)
add('thistle-case', mk.case({
  stem: 'Study the experiment and answer the questions.',
  passage: `Neha closed the wide mouth of a thistle funnel with a piece of parchment paper, filled it with strong sugar solution and dipped it in a beaker of water. She marked the level in the stem and read it every 30 minutes:\n\n| Time (min) | ${FUNNEL.map((x) => x.t).join(' | ')} |\n|---|${FUNNEL.map(() => '---').join('|')}|\n| Rise in level (mm) | ${FUNNEL.map((x) => x.mm).join(' | ')} |`,
  d: 3, c: 'analysis',
  assets: [funnelFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name the process that makes the level rise.', model: '**Osmosis** (endosmosis).', sol: 'Osmosis.', scheme: [['Osmosis', 1]], d: 1, c: 'recall', t: [1] })),
    part('b', short({ marks: 1, wl: null, stem: 'What is the role of the parchment paper?', model: 'It acts as a **selectively permeable membrane**: water passes, sugar does not.', sol: 'Selectively permeable.', scheme: [['Selectively permeable membrane', 1]], d: 2, c: 'understanding', t: [1] })),
    part('c', num({ stem: 'By how many millimetres did the level rise in the second hour (60 to 120 minutes)?', value: SECOND_HOUR, unit: 'mm', marks: 2, sol: `Second hour: ${FUNNEL[4].mm} − ${FUNNEL[2].mm} = ${SECOND_HOUR} mm (first hour ${FIRST_HOUR} mm).`, scheme: [['Readings subtracted', 1], [`${SECOND_HOUR} mm`, 1]], d: 2, c: 'application', t: [1] })),
    part('d', short({ marks: 2, stem: 'Why did the level rise more slowly in the second hour?', model: 'As water entered, the sugar solution became **more dilute**, so the **difference in concentration** between the funnel and the beaker **fell** and osmosis **slowed**.', sol: 'Smaller concentration difference.', scheme: [['Solution diluted', 1], ['Smaller gradient, slower osmosis', 1]], d: 4, c: 'analysis', t: [1] })),
    part('e', short({ marks: 2, stem: 'Suggest a suitable control for this experiment and state its expected result.', model: 'An identical funnel filled with **water instead of sugar solution**; its level should **not rise**, showing that the rise was due to the **sugar solution**.', sol: 'Water-filled funnel; no rise.', scheme: [['Control described', 1], ['Expected result', 1]], d: 3, c: 'evaluation', t: [1] })),
    part('f', short({ marks: 2, stem: 'What would happen if the funnel held pure water and the beaker held strong sugar solution? Explain.', model: 'The level in the stem would **fall**, because water would move **out** of the funnel into the **stronger** sugar solution in the beaker (exosmosis).', sol: 'Level falls.', scheme: [['Level falls', 1], ['Water moves to the stronger solution', 1]], d: 3, c: 'application', t: [1] })),
  ],
}));
add('osmoscope-case', mk.case({
  stem: 'Study the experiment and answer the questions.',
  passage: 'Arjun peeled a large potato, scooped out two cups, A and B, and stood both in a beaker of water. He poured strong sugar solution into A and left B empty. After a few hours the level in A had risen, while B had stayed dry.',
  d: 3, c: 'application',
  assets: [scopeFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name this set-up.', model: '**Potato osmoscope.**', sol: 'Potato osmoscope.', scheme: [['Potato osmoscope', 1]], d: 1, c: 'recall', t: [1] })),
    part('b', short({ marks: 1, wl: null, stem: 'Why was cup B kept?', model: 'As a **control**, to show that the rise in A was caused by the **sugar solution**.', sol: 'Control.', scheme: [['Control', 1]], d: 2, c: 'understanding', t: [1] })),
    part('c', short({ marks: 2, stem: 'Explain why the level rose in cup A.', model: 'The sugar solution in A was **more concentrated** than the beaker water. Water moved from the beaker **through the potato cells** into A by **osmosis**, raising the level.', sol: 'Osmosis into the stronger solution.', scheme: [['Concentration difference', 1], ['Osmosis through potato tissue', 1]], d: 2, c: 'understanding', t: [1] })),
    part('d', short({ marks: 2, stem: 'What would happen if the potato cups were boiled before the experiment? Give a reason.', model: 'The level would **not rise**: boiling **kills the cells**, so their membranes are **no longer selectively permeable** and osmosis cannot take place.', sol: 'No rise; cells killed.', scheme: [['No rise', 1], ['Membranes destroyed', 1]], d: 4, c: 'analysis', t: [1] })),
    part('e', short({ marks: 3, stem: 'Give three differences between diffusion and osmosis.', model: '1. Diffusion: movement of **any substance**; osmosis: movement of **water** only.\n2. Diffusion needs **no membrane**; osmosis needs a **selectively permeable membrane**.\n3. Diffusion occurs in **gases, liquids and solids in liquids**; osmosis only between **solutions**.', sol: 'Three differences.', scheme: [['First', 1], ['Second', 1], ['Third', 1]], d: 2, c: 'understanding', t: [1] })),
    part('f', short({ marks: 1, wl: null, stem: 'Name the kind of solution the beaker water is with respect to the sugar solution in A.', model: '**Hypotonic.**', sol: 'Hypotonic.', scheme: [['Hypotonic', 1]], d: 2, c: 'application', t: [2] })),
  ],
}));
add('strips-case', mk.case({
  passage: `To find the strength of potato cell sap, Ms Fernandes weighed five equal potato strips, placed each in a different sugar solution for two hours, and weighed them again.\n\n${stripTable}`,
  d: 4, c: 'analysis',
  children: [
    part('a', num({ stem: 'Calculate the percentage change in mass of the strip in 0.4 M sugar solution.', value: STRIPS[4].change, unit: '%', marks: 2, sol: r`$\dfrac{4.4 - 5.0}{5.0} \times 100 = ${STRIPS[4].change}$ percent (a loss of mass).`, scheme: [['Method', 1], [`${STRIPS[4].change} percent`, 1]], d: 2, c: 'application', t: [2] })),
    part('b', short({ marks: 2, stem: 'In which solution did the strip neither gain nor lose mass? What does this tell you about the potato cell sap?', model: `In **${ISOTONIC} M** sugar. This solution is **isotonic** with the cell sap, so the sap has about the **same concentration** (${ISOTONIC} M).`, sol: 'Isotonic point.', scheme: [[`${ISOTONIC} M`, 1], ['Isotonic with cell sap', 1]], d: 3, c: 'analysis', t: [2] })),
    part('c', short({ marks: 2, stem: 'Explain why the strip in pure water (0 M) gained mass.', model: 'Pure water is **hypotonic** to the cell sap, so water **entered** the cells by **osmosis** (endosmosis); the cells became **turgid** and heavier.', sol: 'Endosmosis.', scheme: [['Hypotonic', 1], ['Water entered by osmosis', 1]], d: 2, c: 'understanding', t: [2] })),
    part('d', short({ marks: 3, stem: 'Describe the state of the cells in the 0.4 M strip and explain how they would change if the strip were then placed in water.', model: 'The cells are **plasmolysed**: water left them by **exosmosis** and the cytoplasm **shrank away** from the walls; the strip is limp. In water, water would **re-enter** and the cells would become **turgid** again (**deplasmolysis**), if they are still alive.', sol: 'Plasmolysis then deplasmolysis.', scheme: [['Plasmolysed state', 1], ['Exosmosis explained', 1], ['Deplasmolysis in water', 1]], d: 3, c: 'analysis', t: [2] })),
    part('e', short({ marks: 1, wl: null, stem: 'Why were all the strips cut to the same size and mass?', model: 'To make it a **fair test**, so only the **sugar concentration** differed.', sol: 'Fair test.', scheme: [['Fair test', 1]], d: 2, c: 'evaluation', t: [2] })),
  ],
}));
add('plasmo-case', mk.case({
  stem: 'Study the diagram and answer the questions.',
  passage: 'During a practical, Imran mounted three pieces of the same leaf peel: one in water, one in a solution equal in strength to the cell sap, and one in strong salt solution. He drew the cells he saw.',
  d: 3, c: 'application',
  assets: [plasmoFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'In which liquid was the peel that gave turgid cells?', model: '**Water** (a hypotonic medium).', sol: 'Water.', scheme: [['Water', 1]], d: 1, c: 'application', t: [2] })),
    part('b', short({ marks: 1, wl: null, stem: 'What fills the space between the cell wall and the shrunken cytoplasm in the plasmolysed cell?', model: 'The outside **salt solution**, which passes through the **freely permeable** cell wall.', sol: 'Salt solution.', scheme: [['Outside salt solution', 1]], d: 3, c: 'analysis', t: [2] })),
    part('c', short({ marks: 2, stem: 'Explain why the cells in salt solution became plasmolysed.', model: 'The salt solution is **hypertonic** to the cell sap, so water moves **out** of the vacuole by **exosmosis**; the cytoplasm **shrinks away** from the wall.', sol: 'Exosmosis.', scheme: [['Hypertonic', 1], ['Exosmosis and shrinking', 1]], d: 2, c: 'understanding', t: [2] })),
    part('d', short({ marks: 3, wl: null, stem: 'Draw neat, labelled diagrams of the turgid cell and the plasmolysed cell. Label the cell wall, cytoplasm and vacuole.', model: 'Turgid: **cytoplasm pressed against the cell wall**, large central **vacuole**. Plasmolysed: **cytoplasm shrunk** into a mass away from the wall, **small vacuole**, gap filled with solution.', sol: 'Two diagrams with labels.', scheme: [['Turgid cell', 1], ['Plasmolysed cell', 1], ['Labels', 1]], d: 2, c: 'application', t: [2] }), [
      short({ marks: 3, stem: 'Explain the importance of turgidity to plants, giving three points.', model: '1. It keeps soft stems and leaves **firm and upright**.\n2. It helps **guard cells** open the **stomata**.\n3. It helps young cells **enlarge** and supports **growth**; loss of turgor causes **wilting**.', sol: 'Support; stomata; growth.', scheme: [['First', 1], ['Second', 1], ['Third', 1]], d: 2, c: 'understanding', t: [2] }),
    ]),
    part('e', short({ marks: 2, stem: 'Give reason: housewives sprinkle water on leafy vegetables to keep them fresh.', model: 'Water enters the leaf cells by **osmosis**, making them **turgid**, so the leaves stay **crisp** instead of wilting.', sol: 'Turgidity.', scheme: [['Osmosis', 1], ['Turgid, fresh leaves', 1]], d: 2, c: 'application', t: [2] })),
    part('f', short({ marks: 1, wl: null, stem: 'Name the state of the cells in the solution equal in strength to the cell sap.', model: '**Flaccid** (no net movement of water).', sol: 'Flaccid.', scheme: [['Flaccid', 1]], d: 2, c: 'understanding', t: [2] })),
  ],
}));
add('roothair-case', mk.case({
  stem: 'Study the diagram and answer the questions.',
  passage: 'The diagram shows one cell from the root of a gram seedling, with its parts lettered A to F.',
  d: 3, c: 'application',
  assets: [hairFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name the part labelled E.', model: '**Vacuole** (cell sap).', sol: 'Vacuole.', scheme: [['Vacuole', 1]], d: 1, c: 'recall', t: [3] })),
    part('b', short({ marks: 1, wl: null, stem: 'Which part, A or B, is selectively permeable?', model: '**B** (the cell membrane).', sol: 'B.', scheme: [['B', 1]], d: 2, c: 'understanding', t: [3] })),
    part('c', short({ marks: 2, stem: 'Explain how water from the film around F enters the cell.', model: 'The sap in **E** is **more concentrated** than the soil water around **F**, so water passes through the wall **A** and membrane **B** into the cell by **osmosis**.', sol: 'Osmosis.', scheme: [['Concentration difference', 1], ['Osmosis through A and B', 1]], d: 2, c: 'understanding', t: [3, 4] })),
    part('d', short({ marks: 2, stem: 'State two ways in which this cell is adapted for absorption.', model: '1. Its long hair gives a **large surface area** in contact with soil water.\n2. Its **wall is thin** and it has **no cuticle**, so water enters easily.', sol: 'Two adaptations.', scheme: [['First', 1], ['Second', 1]], d: 2, c: 'understanding', t: [3] })),
    part('e', short({ marks: 3, stem: 'Trace the path of water from this cell to the xylem, naming the tissues crossed and the process involved.', model: 'From the root hair, water passes through the **cortex** cells, then the single-layered **endodermis** and the **pericycle**, and finally enters the **xylem** vessels. It moves from cell to cell by **osmosis**, because each cell further inwards has slightly **more concentrated** sap than the one before it.', sol: 'Path and osmosis.', scheme: [['Cortex and endodermis', 1], ['Pericycle and xylem', 1], ['Osmosis along a gradient', 1]], d: 3, c: 'application', t: [4] })),
    part('f', short({ marks: 1, wl: null, stem: 'How are minerals such as nitrates taken up when their concentration is higher inside this cell than in the soil?', model: 'By **active transport**, using energy from respiration.', sol: 'Active transport.', scheme: [['Active transport', 1]], d: 3, c: 'application', t: [4] })),
  ],
}));
add('sap-case', mk.case({
  passage: 'A gardener cut a leafy balsam shoot and stood it in water coloured with red ink. After three hours red lines could be seen in the stem and leaf veins. On a hot, windy afternoon the red colour reached the leaves faster than on a cool, still evening.',
  d: 3, c: 'analysis',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Which tissue in the stem would be stained red?', model: 'The **xylem**.', sol: 'Xylem.', scheme: [['Xylem', 1]], d: 1, c: 'recall', t: [5] })),
    part('b', short({ marks: 1, wl: null, stem: 'Name the upward movement of water shown by this experiment.', model: '**Ascent of sap.**', sol: 'Ascent of sap.', scheme: [['Ascent of sap', 1]], d: 1, c: 'recall', t: [5] })),
    part('c', short({ marks: 2, stem: 'Why did the colour rise faster on the hot, windy afternoon?', model: 'Heat and wind **increase transpiration** from the leaves, which **increases the transpiration pull** on the water column, so water rises **faster**.', sol: 'More transpiration pull.', scheme: [['More transpiration', 1], ['Stronger pull', 1]], d: 3, c: 'analysis', t: [5] })),
    part('d', short({ marks: 3, stem: 'Explain how cohesion and adhesion help water rise in the xylem.', model: '**Cohesion:** water molecules **attract one another**, so the water forms a **continuous column** that does not break when pulled from above. **Adhesion:** water molecules **cling to the walls** of the narrow xylem vessels, which **supports** the column and helps it rise.', sol: 'Cohesion and adhesion.', scheme: [['Cohesion', 1], ['Continuous column', 1], ['Adhesion', 1]], d: 2, c: 'understanding', t: [5] })),
    part('e', short({ marks: 2, stem: 'What is root pressure? Why can it not explain the rise of water in tall trees?', model: '**Root pressure** is the pressure that **pushes water up** from the roots, seen when sap oozes from a cut stem. It is **small**, enough to lift water only a **few metres**, not to the top of tall trees.', sol: 'Small push from roots.', scheme: [['Meaning', 1], ['Too small for tall trees', 1]], d: 3, c: 'understanding', t: [5] })),
    part('f', short({ marks: 1, wl: null, stem: 'Give one reason why the shoot was kept in light during the experiment.', model: 'Light **opens the stomata** and increases **transpiration**, so the coloured water rises faster.', sol: 'More transpiration.', scheme: [['Stomata open; more transpiration', 1]], d: 3, c: 'application', t: [5] })),
  ],
}));

// ---------------------------------------------------------------- further bank items
add('boiled-mcq', mcq({
  stem: 'A student repeats the potato osmoscope experiment with a potato that was first boiled. The level of sugar solution in the cup does not rise because',
  right: 'boiling killed the cells, so their membranes are no longer selectively permeable', wrong: ['boiling removed all the starch', 'the sugar solution became weaker', 'the water in the beaker evaporated'],
  sol: 'Osmosis needs living cell membranes; boiled cells let both water and sugar pass freely — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('wilt-tf', tf({
  stem: 'Leaves of a plant wilt on a hot afternoon when the cells lose turgor faster than water is absorbed.',
  key: 't',
  sol: 'True. When water loss exceeds uptake, cells become flaccid and the leaves droop.',
  d: 2, c: 'application', t: [2, 5],
}));
add('cuticle-reason', short({
  marks: 2,
  stem: 'Give two reasons why a seedling pulled out of dry soil without care wilts soon after it is transplanted.',
  model: '1. Its delicate **root hairs are torn off**, so the **surface area** for absorbing water is greatly reduced.\n2. Its leaves continue to **lose water by transpiration**, so water loss exceeds uptake and the cells lose **turgor**.',
  sol: 'Root hairs damaged; transpiration continues.',
  scheme: [['Root hairs damaged', 1], ['Loss exceeds uptake', 1]],
  d: 3, c: 'application', t: [3, 2],
}));
