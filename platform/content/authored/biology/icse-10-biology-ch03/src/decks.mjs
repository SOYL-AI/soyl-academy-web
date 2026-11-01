// ICSE 10 Biology ch03 Absorption by Roots and the Ascent of Sap — Part 1 (t01–t02), Part 2 (t03–t05).
import { sl, deck, table, flow, svgV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { ROOTHAIR, THISTLE, OSMOSCOPE, PLASMO, PATH, KMNO4, XYLEM } from './svgs.mjs';
import { STRIPS, ISOTONIC, FIRST_HOUR, SECOND_HOUR } from './calc.mjs';

export const V = {
  roothair: svgV(ROOTHAIR, 'A single root hair cell among soil particles'),
  thistle: svgV(THISTLE, 'Thistle funnel osmosis experiment'),
  osmoscope: svgV(OSMOSCOPE, 'Potato osmoscope with a control'),
  plasmo: svgV(PLASMO, 'Turgid, flaccid and plasmolysed cells'),
  path: svgV(PATH, 'Path of water across the root into the xylem'),
  kmno4: svgV(KMNO4, 'Diffusion of potassium permanganate in water'),
  xylem: svgV(XYLEM, 'Coloured water rising in the xylem of a balsam shoot'),
};

export const deck1 = deck({
  part: 1,
  title: 'Absorption by Roots — Part 1: Diffusion, osmosis and plasmolysis',
  goals: [
    'Distinguish imbibition, diffusion and osmosis with examples, and explain osmotic pressure',
    'Describe the potassium permanganate, thistle funnel and potato osmoscope experiments',
    'Explain turgidity, flaccidity and plasmolysis, and predict what happens to cells in hypotonic, isotonic and hypertonic solutions',
  ],
  slides: [
    sl('title', 'Absorption by Roots and the Ascent of Sap', {
      b: 'Part 1 — the physical processes that move water into and out of cells.',
      v: flow('LR', [['i', 'Imbibition'], ['d', 'Diffusion'], ['o', 'Osmosis'], ['p', 'Turgor and plasmolysis']], [['i', 'd'], ['d', 'o'], ['o', 'p']], 'Flow: imbibition, diffusion, osmosis, then turgor and plasmolysis'),
      n: 'A plant cannot drink. Yet a tall tree moves hundreds of litres of water from soil to leaves every day. It all begins with simple physical processes that move water into and out of cells.',
    }),
    sl('concept', 'Imbibition', {
      b: '**Imbibition** is the absorption of water by **dry solid materials**, which then **swell**.',
      v: table(['Example', 'What happens'], [['Dry seeds soaked overnight', 'Swell and soften; germination begins'], ['Raisins in water', 'Plump up'], ['Wooden doors in the rains', 'Swell and jam']], 'Table of three examples of imbibition'),
      n: 'Dry seeds, raisins and wood all soak up water and swell. This is imbibition. It needs no membrane and no energy. It is the first step when a seed begins to germinate.',
    }),
    sl('diagram', 'Diffusion', {
      b: '**Diffusion** is the movement of molecules from a region of **higher** concentration to **lower** concentration until they are evenly spread.',
      v: V.kmno4,
      n: 'Drop a crystal of potassium permanganate into still water. The purple colour slowly spreads until all the water is evenly coloured, without any stirring. Particles move on their own from where they are crowded to where they are fewer.',
    }),
    sl('diagram', 'Osmosis: the thistle funnel', {
      b: '**Osmosis**: movement of **water** through a **selectively permeable membrane** from a **dilute** solution to a **concentrated** one.',
      v: V.thistle,
      n: 'A funnel of sugar solution is closed with parchment and stood in water. Water can pass the parchment but sugar cannot. Water moves into the sugar solution, and the level in the stem slowly rises. That is osmosis.',
    }),
    sl('example', 'Worked example 1: reading the funnel', {
      b: 'An imagined set of readings from a thistle funnel.',
      ul: ['Step 1: rise in the first hour (0 to 60 minutes).', 'Step 2: rise in the second hour (60 to 120 minutes).', 'Step 3: explain the difference.'],
      v: table(['Period', 'Rise (mm)'], [['First hour', String(FIRST_HOUR)], ['Second hour', String(SECOND_HOUR)]], 'Worked table: eleven millimetres rise in the first hour and seven in the second'),
      n: 'The level rose eleven millimetres in the first hour but only seven in the second. As water enters, the sugar solution becomes weaker, the difference in concentration falls, and osmosis slows down.',
    }),
    sl('check', 'Quick check: osmosis', {
      b: 'Which statement defines osmosis?',
      chk: 'osmosis-mcq',
      n: 'Which molecules move, and through what?',
    }),
    sl('diagram', 'The potato osmoscope', {
      v: V.osmoscope,
      n: 'A hollowed potato with sugar solution, standing in water, also shows osmosis. The potato cells act as the membrane, and the level inside rises. An empty potato cup kept beside it is the control: it stays dry.',
    }),
    sl('concept', 'Hypotonic, isotonic, hypertonic', {
      v: table(['Outside solution', 'Compared with cell sap', 'Water movement', 'Cell becomes'], [['Hypotonic', 'Weaker', 'Into the cell (endosmosis)', 'Turgid'], ['Isotonic', 'Equal', 'No net movement', 'Unchanged (flaccid if limp)'], ['Hypertonic', 'Stronger', 'Out of the cell (exosmosis)', 'Plasmolysed']], 'Table of hypotonic, isotonic and hypertonic solutions with water movement and the state of the cell'),
      n: 'Compare the outside solution with the cell sap. If it is weaker, water enters and the cell swells. If it is equal, nothing changes. If it is stronger, water leaves and the cell shrinks. Osmotic pressure is higher in stronger solutions.',
    }),
    sl('diagram', 'Turgid, flaccid and plasmolysed cells', {
      v: V.plasmo,
      n: 'A turgid cell is full, its cytoplasm pushed against the wall. A flaccid cell is limp. In a plasmolysed cell the cytoplasm has pulled away from the wall. Put back in water quickly, a plasmolysed cell recovers: that is deplasmolysis.',
    }),
    sl('check', 'Quick check: strong salt', {
      b: 'Leaf-peel cells in strong salt with cytoplasm shrunk from the wall show…',
      chk: 'plasmolysis-mcq',
      n: 'Name the condition, not the solution.',
    }),
    sl('example', 'Worked example 2: potato strips', {
      b: 'Equal potato strips in sugar solutions for two hours (imagined data).',
      ul: ['Step 1: percentage change = change in mass divided by starting mass, times one hundred.', 'Step 2: find where the change is zero.', 'Step 3: that solution is isotonic with the cell sap.'],
      v: table(['Sugar (M)', 'Change in mass (per cent)'], STRIPS.map((s) => [String(s.conc), String(s.change)]), 'Worked table of percentage change in mass: plus twelve, plus six, zero, minus six and minus twelve as sugar strength rises'),
      n: 'Strips in weak solutions gained mass, and those in strong solutions lost it. In the zero point two molar solution there was no change, so the potato cell sap has about that strength.',
    }),
    sl('check', 'Quick check: restoring a cell', {
      b: 'True or false: a plasmolysed cell can usually be restored in water.',
      chk: 'deplasm-tf',
      n: 'What is the reverse of plasmolysis called?',
    }),
    sl('summary', 'Summary', {
      ul: ['Imbibition: dry solids absorb water and swell.', 'Diffusion: molecules spread from high to low concentration.', 'Osmosis: water crosses a selectively permeable membrane towards the stronger solution.', 'Hypotonic → turgid; isotonic → no change; hypertonic → plasmolysed.'],
      v: table(['Process', 'Needs a membrane?'], [['Imbibition', 'No'], ['Diffusion', 'No'], ['Osmosis', 'Yes, selectively permeable']], 'Summary table of whether each process needs a membrane'),
      n: 'To recap. Imbibition swells dry things. Diffusion spreads molecules. Osmosis moves water through a membrane towards the stronger solution. Cells swell in weak solutions and shrink in strong ones.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Always mention the **selectively permeable membrane** in osmosis.', 'Say **water** moves in osmosis, never "sugar" or "salt".', 'In experiments, name the **control** and say what it shows.', 'Plasmolysis is the **state**; exosmosis is the **process**.'],
      n: 'Exam tips. Mention the membrane whenever you explain osmosis. Remember that only water moves. Always identify the control in an experiment. And keep the words for the state and the process separate.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Absorption by Roots — Part 2: Root hairs, absorption and the ascent of sap',
  goals: [
    'Draw and label a root hair and list the features of roots suited for absorbing water',
    'Trace the path of water across the root and distinguish active from passive uptake of minerals',
    'Explain root pressure, cohesion, adhesion and transpiration pull, and describe the coloured-water experiment',
  ],
  slides: [
    sl('title', 'From Soil to Leaf', {
      b: 'Part 2 — how roots absorb water and minerals, and how water climbs the stem.',
      v: flow('LR', [['s', 'Soil water'], ['h', 'Root hair'], ['c', 'Cortex'], ['x', 'Xylem'], ['l', 'Leaves']], [['s', 'h'], ['h', 'c'], ['c', 'x'], ['x', 'l']], 'Flow: soil water to root hair to cortex to xylem to leaves'),
      n: 'Now we put those processes to work in a real plant. Water enters the root hairs, crosses the root to the xylem, and rises all the way to the leaves.',
    }),
    sl('diagram', 'The root hair', {
      b: 'A **root hair** is a long outgrowth of **one epidermal cell**: thin wall, no cuticle, large **vacuole** of concentrated cell sap.',
      v: V.roothair,
      n: 'Each root hair is a single cell stretched into a long tube that squeezes between soil particles. Its wall is thin, and its large vacuole holds sap that is more concentrated than the soil water, so water enters by osmosis.',
    }),
    sl('concept', 'Roots built for absorption', {
      v: table(['Feature', 'Advantage'], [['Thousands of root hairs', 'Huge surface area'], ['Thin wall, no cuticle', 'Water enters easily'], ['Concentrated cell sap', 'Water enters by osmosis'], ['Hairs grow between soil particles', 'Close contact with soil water'], ['Extensive branching', 'Explores a large volume of soil']], 'Table of five features of roots and their advantages for absorption'),
      n: 'Roots are shaped for their job. Countless root hairs give a huge surface. Thin walls and strong sap draw water in. And branching roots reach water spread through a large volume of soil.',
    }),
    sl('check', 'Quick check: what is a root hair?', {
      b: 'A root hair is…',
      chk: 'roothair-mcq',
      n: 'How many cells make up one root hair?',
    }),
    sl('diagram', 'Across the root to the xylem', {
      b: 'Root hair → **cortex** → **endodermis** → **pericycle** → **xylem**.',
      v: V.path,
      n: 'Water entering a root hair dilutes its sap, so water passes on to the next cell by osmosis. Each cell further in has slightly stronger sap. Step by step, water crosses the cortex, endodermis and pericycle into the xylem.',
    }),
    sl('concept', 'Minerals: passive and active uptake', {
      v: table(['', 'Passive uptake', 'Active uptake'], [['Direction', 'Down the concentration gradient', 'Against the gradient'], ['Energy', 'Not needed', 'Needed, from respiration'], ['Process', 'Diffusion', 'Carrier proteins pump ions in']], 'Table comparing passive and active uptake of minerals'),
      n: 'Minerals enter as dissolved ions. Some simply diffuse in. But roots often hold more ions than the soil, so they must pump them in against the gradient. That active transport uses energy from respiration, which needs oxygen in the soil.',
    }),
    sl('example', 'Worked example 1: waterlogged field', {
      b: 'After a week of flooding, a farmer’s maize plants turn pale and stop growing. Explain.',
      ul: ['Step 1: flooding drives **air** out of the soil.', 'Step 2: roots get little **oxygen**, so **respiration** slows.', 'Step 3: less energy means less **active uptake** of minerals, so the leaves turn pale.'],
      v: flow('LR', [['f', 'Flooded soil'], ['o', 'Little oxygen'], ['r', 'Less respiration'], ['m', 'Fewer minerals absorbed']], [['f', 'o'], ['o', 'r'], ['r', 'm']], 'Flow: flooded soil, little oxygen, less respiration, fewer minerals absorbed'),
      n: 'Link the steps. No air in the soil means little oxygen for the roots. Without oxygen, respiration slows and there is little energy to pump minerals in. Short of minerals such as nitrogen, the plant turns pale.',
    }),
    sl('check', 'Quick check: against the gradient', {
      b: 'Potassium taken up although there is more inside the root cells than in the soil is taken up by…',
      chk: 'active-mcq',
      n: 'Which process works against a gradient?',
    }),
    sl('concept', 'The ascent of sap', {
      v: table(['Force', 'How it works'], [['Root pressure', 'Roots push water up from below; seen as sap oozing from a cut stump'], ['Transpiration pull', 'Evaporation from leaves pulls water up the xylem'], ['Cohesion', 'Water molecules attract each other, so the column stays unbroken'], ['Adhesion', 'Water clings to the xylem walls']], 'Table of four forces in the ascent of sap and how each works'),
      n: 'Water rises in the xylem by a push and a pull. Root pressure pushes a little from below. Transpiration pull from the leaves does most of the work. Cohesion keeps the thin water column unbroken, and adhesion holds it to the vessel walls.',
    }),
    sl('diagram', 'Experiment: water travels in the xylem', {
      v: V.xylem,
      n: 'Stand a balsam shoot in water coloured with red ink. After a few hours red lines appear in the stem and veins. Cut across the stem: only the xylem part of each bundle is red. So water rises through the xylem.',
    }),
    sl('example', 'Worked example 2: hot and windy or cool and still?', {
      b: 'Two identical shoots in red ink: one in a hot, breezy window, one in a cool, still room.',
      ul: ['Step 1: which loses more water from its leaves?', 'Step 2: more loss means a stronger **transpiration pull**.', 'Step 3: the colour rises **faster** in the hot, breezy window.'],
      v: table(['Condition', 'Transpiration', 'Rise of colour'], [['Hot and breezy', 'Fast', 'Fast'], ['Cool and still', 'Slow', 'Slow']], 'Worked table: hot and breezy gives fast transpiration and fast rise; cool and still gives slow transpiration and slow rise'),
      n: 'Warm, moving air carries water vapour away from the leaves quickly. Faster transpiration means a stronger pull, so the coloured water climbs faster. This shows transpiration pull drives the ascent of sap.',
    }),
    sl('check', 'Quick check: the main lifting force', {
      b: 'In a tall tree, water is lifted mainly by…',
      chk: 'pull-mcq',
      n: 'Is it a push from below or a pull from above?',
    }),
    sl('summary', 'Summary', {
      ul: ['Root hairs absorb water by osmosis; large surface, thin wall, concentrated sap.', 'Path: root hair → cortex → endodermis → pericycle → xylem.', 'Minerals enter passively or actively (with energy).', 'Ascent of sap: root pressure, transpiration pull, cohesion, adhesion.'],
      v: table(['Stage', 'Main process'], [['Into root hair', 'Osmosis'], ['Across the root', 'Osmosis cell to cell'], ['Up the stem', 'Transpiration pull']], 'Summary table of the main process at each stage'),
      n: 'To recap. Water enters root hairs by osmosis and passes cell to cell to the xylem. Minerals enter by diffusion or by active transport. Water rises in the xylem mainly by transpiration pull, held together by cohesion and adhesion.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['A root hair is **one cell**: do not draw cross-walls in the hair.', 'Name tissues **in order** when tracing the path of water.', 'Link **oxygen**, **respiration** and **active transport**.', 'For the xylem experiment, mention the **cross-section** observation.'],
      n: 'Exam tips. Draw the root hair as a single cell. Name the root tissues in the right order. Connect oxygen, respiration and active uptake. And in the coloured water experiment, describe what the cross section shows.',
    }),
  ],
});
