// ICSE 10 Biology ch04 Transpiration — question bank in ICSE 2027 style, experiment-heavy.
// Water losses, rates, bubble movements, volumes and stomata ratios are computed by calc.mjs.
// AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true, R does not explain.
import { mk, add, svgV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { WEIGHT, POT, COBALT, BUDGET } from './calc.mjs';
import { STOMA_LETTERED, POTOMETER, BELLJAR, COBALT_FIG, WEIGHT_FIG, POT_CHART } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, match, part } = mk;
const stomaFig = svgV(STOMA_LETTERED, 'An open and a closed stoma with parts of the open stoma lettered A to E');
const potFig = svgV(POTOMETER, "Ganong's potometer");
const jarFig = svgV(BELLJAR, 'Bell jar experiment with a test and a control set-up');
const cobaltFig = svgV(COBALT_FIG, 'Cobalt chloride paper on both surfaces of a dorsiventral leaf');
const weightFig = svgV(WEIGHT_FIG, 'Loss-of-weight experiment with a leafy and a leafless shoot');
const chartFig = svgV(POT_CHART, 'Potometer readings under four conditions');
const [still, fan, dark, bag] = POT.rows;

// ---------------------------------------------------------------- t01 transpiration and its importance
add('def-mcq', mcq({
  stem: 'Transpiration is the loss of water',
  right: 'as water vapour from the aerial parts of a plant', wrong: ['as liquid drops from the margins of leaves', 'as sap from a cut stem', 'from the roots into the soil'],
  sol: 'Transpiration is evaporation of water, as vapour, mainly through the stomata of leaves — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('route-mcq', mcq({
  stem: 'Most of the water lost in transpiration escapes through the',
  right: 'stomata', wrong: ['cuticle', 'lenticels', 'hydathodes'],
  sol: 'Stomatal transpiration accounts for most of the loss; the cuticle and lenticels lose only a little — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('pull-mcq', mcq({
  stem: 'On a hot afternoon, water rises to the top leaves of a tall tree mainly because',
  right: 'evaporation from the leaves creates a pull on the columns of water in the xylem', wrong: ['root pressure pushes it up every hour', 'the phloem pumps it upwards', 'the leaves absorb water from the air'],
  sol: 'Transpiration pull draws water up through the xylem from the roots — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('cool-mcq', mcq({
  stem: 'On a very hot day, the leaves of a well-watered plant stay cooler than a metal plate placed in the same sunshine. This is because',
  right: 'the evaporation of water from the leaves takes away heat', wrong: ['leaves reflect all the sunlight', 'leaves have no blood to carry heat', 'the metal plate makes its own heat'],
  sol: 'Evaporation absorbs heat (latent heat), so transpiration cools the leaf — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('budget-num', num({
  stem: `A potted plant absorbed ${BUDGET.absorbed} mL of water in a day and kept only ${BUDGET.kept} mL in its cells and in photosynthesis. What percentage of the absorbed water was lost by transpiration?`,
  value: BUDGET.pctLost, unit: '%',
  sol: `Water lost: ${BUDGET.absorbed} − ${BUDGET.kept} gives ${BUDGET.lost} mL. Percentage: $\\dfrac{${BUDGET.lost}}{${BUDGET.absorbed}} \\times 100 = ${BUDGET.pctLost}$ per cent.`,
  scheme: [[`${BUDGET.pctLost} per cent`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === 98.8 || 'value');
add('evil-ar', ar({
  a: 'Transpiration is often called a necessary evil.',
  r: 'Transpiration wastes much of the water a plant absorbs, but it also cools the leaves and draws water and minerals upwards.',
  key: 'c',
  sol: 'Both are true, and its harmful water loss together with its useful effects is exactly why it is called a necessary evil — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('transp-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the loss of water in the form of vapour from the aerial parts of a plant.',
  model: '**Transpiration.**',
  sol: 'Transpiration.', scheme: [['Transpiration', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('odd-routes', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Stomata, Cuticle, Lenticels, Root hairs.',
  model: '**Root hairs**; the others are **routes through which water is lost in transpiration**.',
  sol: 'Root hairs absorb water.', scheme: [['Odd one and category', 1]],
  d: 2, c: 'analysis', t: [1],
}));
add('importance-short', short({
  marks: 2,
  stem: 'State two ways in which transpiration is useful to a plant.',
  model: '1. It creates a **transpiration pull** that draws **water and dissolved minerals** up from the roots through the xylem.\n2. Evaporation of water **cools the leaves** in hot sunshine.',
  sol: 'Transpiration pull; cooling.',
  scheme: [['First use', 1], ['Second use', 1]],
  d: 1, c: 'recall', t: [1],
}));

// ---------------------------------------------------------------- t02 stomatal opening and closing: K+ ion exchange
add('kion-mcq', mcq({
  stem: 'According to the potassium ion exchange theory, stomata open when',
  right: 'potassium ions enter the guard cells and water follows by osmosis, making them turgid', wrong: ['potassium ions leave the guard cells, making them flaccid', 'the guard cells lose water to the epidermal cells', 'the thick inner walls of the guard cells stretch more than the outer walls'],
  sol: 'K+ entry raises the solute concentration of the guard cells; water enters and they swell and curve apart — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('wall-mcq', mcq({
  stem: 'When guard cells become turgid, the stomatal pore opens because',
  right: 'their thin outer walls stretch more than their thick inner walls, so the cells curve apart', wrong: ['their thick inner walls stretch more than the outer walls', 'the epidermal cells push them apart', 'the pore is pulled open by the chloroplasts'],
  sol: 'Unequal thickening makes the swelling cells bow outwards, pulling the inner walls apart — option (@K).',
  d: 3, c: 'understanding', t: [2],
}));
add('night-mcq', mcq({
  stem: 'Stomata of most plants close at night because',
  right: 'potassium ions move out of the guard cells and water follows, making them flaccid', wrong: ['potassium ions move into the guard cells', 'the guard cells take in water at night', 'the cuticle covers the pores at night'],
  sol: 'In darkness K+ leaves the guard cells, water leaves by osmosis and the cells straighten, closing the pore — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('fig-pore-mcq', mcq({
  stem: 'In the figure, which letter marks the opening through which water vapour escapes from the leaf?',
  right: 'B', wrong: ['A', 'C', 'D'],
  sol: 'B is the stomatal pore. A is a guard cell, C a chloroplast, D the thick inner wall and E an epidermal cell — option (@K).',
  d: 2, c: 'application', t: [2],
  assets: [stomaFig],
}));
add('chloro-ar', ar({
  a: 'Guard cells contain chloroplasts, unlike the other cells of the epidermis.',
  r: 'Guard cells open and close the stomatal pore.',
  key: 'd',
  sol: 'Both are true, but controlling the pore does not by itself explain the presence of chloroplasts — option (d).',
  d: 3, c: 'analysis', t: [2],
}));
add('kion-ar', ar({
  a: 'Stomata close when potassium ions move into the guard cells.',
  r: 'Water moves by osmosis towards a region of higher solute concentration.',
  key: 'b',
  sol: 'The assertion is false: K+ entry makes guard cells turgid and opens stomata. The reason is true — option (b).',
  d: 3, c: 'analysis', t: [2],
}));
add('kion-fill', fill({
  stem: 'The opening of stomata in light is linked to the entry of ______ ions into the guard cells.',
  acc: [['potassium', 'K+', 'potassium (K+)']],
  sol: 'Potassium (K+) ions.',
  d: 1, c: 'recall', t: [2],
}));
add('guard-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the pair of bean-shaped cells that surround a stomatal pore.',
  model: '**Guard cells.**',
  sol: 'Guard cells.', scheme: [['Guard cells', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('reason-thick', short({
  marks: 1, wl: null,
  stem: 'Give reason: the wall of a guard cell facing the pore is thicker than its outer wall.',
  model: 'When the cell becomes **turgid**, the thin outer wall **stretches more**, so the cell **curves outwards** and the pore **opens**.',
  sol: 'Unequal stretching opens the pore.', scheme: [['Thin wall stretches more; cell curves; pore opens', 1]],
  d: 3, c: 'understanding', t: [2],
}));
add('mechanism-short', short({
  marks: 3,
  stem: 'Explain the potassium ion exchange theory of the opening and closing of stomata.',
  model: 'In **light**, **potassium ions** move from the neighbouring epidermal cells **into the guard cells**. Their solute concentration rises, so **water enters by osmosis**, the guard cells become **turgid**, curve apart and the pore **opens**. In **darkness** potassium ions move **out**, water follows, the guard cells become **flaccid** and the pore **closes**.',
  sol: 'K+ in, water in, turgid: open. K+ out, water out, flaccid: closed.',
  scheme: [['K+ enters guard cells in light', 1], ['Water follows by osmosis; turgid; pore opens', 1], ['Reverse in dark; flaccid; pore closes', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('stoma-draw', short({
  marks: 3, wl: null,
  stem: 'Draw a neat, labelled diagram of an open stoma in surface view. Label the guard cell, stomatal pore, chloroplast and epidermal cell.',
  model: 'Two **bean-shaped guard cells** facing each other with a lens-shaped **stomatal pore** between them; small **chloroplasts** and a nucleus in each guard cell; thick inner walls; irregular **epidermal cells** around them.',
  sol: 'Labelled stoma.',
  scheme: [['Two guard cells with a pore between', 1], ['Chloroplasts and thick inner walls shown', 1], ['Four correct labels', 1]],
  d: 2, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 experiments: loss of weight, bell jar, cobalt chloride paper
add('cobalt-mcq', mcq({
  stem: 'Dry cobalt chloride paper is',
  right: 'blue, and turns pink when it absorbs water vapour', wrong: ['pink, and turns blue when it absorbs water vapour', 'white, and turns blue when it absorbs water vapour', 'green, and turns yellow in light'],
  sol: 'Anhydrous cobalt chloride is blue; the hydrated salt is pink — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('lower-mcq', mcq({
  stem: 'In the cobalt chloride paper experiment on a dorsiventral leaf, the paper on the lower surface turns pink first because the lower surface',
  right: 'has many more stomata than the upper surface', wrong: ['receives more sunlight', 'has a thicker cuticle', 'has no stomata at all'],
  sol: 'More stomata on the lower surface means faster loss of water vapour there — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('polythene-mcq', mcq({
  stem: 'In the bell jar experiment, the pot and soil are wrapped in polythene in order to',
  right: 'stop water evaporating from the soil and pot, so that all the moisture collected comes from the plant', wrong: ['keep the roots warm', 'stop the plant from absorbing water', 'let more light reach the leaves'],
  sol: 'Without the cover, evaporation from the soil would also mist the jar and spoil the result — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('oil-mcq', mcq({
  stem: 'In the loss-of-weight experiment, a layer of oil is poured over the water in the flask to',
  right: 'stop water evaporating from the water surface', wrong: ['provide food for the shoot', 'keep the shoot upright', 'make the leaves lose more water'],
  sol: 'Oil seals the surface, so any loss in weight is due to the shoot alone — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('control-mcq', mcq({
  stem: 'Which is the best control for the bell jar experiment on transpiration?',
  right: 'An identical set-up with a covered pot of soil but no plant', wrong: ['The same plant kept in a dark room without a bell jar', 'A second plant with its pot left uncovered', 'A bell jar with a bowl of water in it'],
  sol: 'The control differs only in the absence of the plant, so any moisture difference must be due to the plant — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('rate-num', num({
  stem: `A flask with a leafy shoot weighed ${WEIGHT.leafy.start.toFixed(1)} g at 9 a.m. and ${WEIGHT.leafy.end.toFixed(1)} g at 5 p.m. Find the average rate of water loss in grams per hour.`,
  value: WEIGHT.leafy.rate, unit: 'g per hour',
  sol: `Loss: ${WEIGHT.leafy.start.toFixed(1)} − ${WEIGHT.leafy.end.toFixed(1)} gives ${WEIGHT.leafy.loss} g in ${WEIGHT.hours} hours. Rate: $${WEIGHT.leafy.loss} \\div ${WEIGHT.hours} = ${WEIGHT.leafy.rate}$ g per hour.`,
  scheme: [[`${WEIGHT.leafy.rate} g per hour`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => q.answer.value === 1.4 || 'value');
add('isob-ar', ar({
  a: 'Cobalt chloride papers clipped to both surfaces of a maize (isobilateral) leaf turn pink at about the same time.',
  r: 'An isobilateral leaf has stomata in roughly equal numbers on both surfaces.',
  key: 'c',
  sol: 'Both are true, and the equal distribution of stomata is why both papers change together — option (c).',
  d: 3, c: 'analysis', t: [3],
}));
add('cobalt-term', short({
  marks: 1, wl: null,
  stem: 'Name the chemical paper that turns from blue to pink when it absorbs water vapour.',
  model: '**Cobalt chloride paper.**',
  sol: 'Cobalt chloride paper.', scheme: [['Cobalt chloride paper', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('odd-exp', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Bell jar, Cobalt chloride paper, Potometer, Iodine solution.',
  model: '**Iodine solution**; the others are **used in experiments on transpiration**.',
  sol: 'Iodine is used in the starch test.', scheme: [['Odd one and category', 1]],
  d: 2, c: 'analysis', t: [3, 4],
}));
add('belljar-short', short({
  marks: 2,
  stem: 'Describe briefly how you would show that a potted plant gives off water vapour, using a bell jar. State what you would observe.',
  model: 'Water a potted plant, **cover the pot and soil with polythene**, and place it under a **bell jar** on a glass plate in sunlight, with a control set-up having no plant. After a few hours **drops of water** collect on the **inner wall** of the jar with the plant, but not in the control.',
  sol: 'Set-up and observation.',
  scheme: [['Set-up with covered pot and control', 1], ['Drops inside the jar with the plant only', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 Ganong's potometer
add('measures-mcq', mcq({
  stem: 'A potometer directly measures',
  right: 'the rate of water uptake by a leafy shoot', wrong: ['the rate of photosynthesis', 'the exact amount of water vapour lost by the leaves', 'the number of stomata on a leaf'],
  sol: 'It measures uptake; since almost all absorbed water is transpired, this approximates the transpiration rate — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('underwater-mcq', mcq({
  stem: 'The shoot for a potometer is cut under water because',
  right: 'this stops air from entering and blocking the xylem vessels', wrong: ['this makes the leaves open their stomata', 'this washes dust off the leaves', 'this kills the cells at the cut end'],
  sol: 'An air bubble in the xylem would break the water column and stop uptake — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('reservoir-mcq', mcq({
  stem: 'The reservoir of a potometer is used to',
  right: 'push the air bubble back to the start of the scale before a new reading', wrong: ['supply food to the shoot', 'measure the area of the leaves', 'trap carbon dioxide'],
  sol: 'Opening the stopcock lets water from the reservoir reset the bubble — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('fan-mcq', mcq({
  stem: 'A fan is switched on near a potometer set up in still air. The air bubble will',
  right: 'move faster towards the shoot', wrong: ['stop moving', 'move away from the shoot', 'keep moving at the same speed'],
  sol: 'Wind removes humid air near the leaves, so transpiration and uptake speed up — option (@K).',
  d: 2, c: 'application', t: [4, 5],
}));
add('approx-ar', ar({
  a: 'A potometer gives only an approximate value of the rate of transpiration.',
  r: 'A potometer measures the exact amount of water vapour released by the leaves.',
  key: 'a',
  sol: 'The assertion is true. The reason is false: a potometer measures water uptake, not the vapour released — option (a).',
  d: 3, c: 'analysis', t: [4],
}));
add('potometer-fill', fill({
  stem: "The apparatus used to measure the rate of water uptake by a cut leafy shoot is Ganong's ______.",
  acc: [['potometer']],
  sol: 'Potometer.',
  d: 1, c: 'recall', t: [4],
}));
add('reason-uptake', short({
  marks: 1, wl: null,
  stem: 'Give reason: the rate measured by a potometer is only roughly equal to the rate of transpiration.',
  model: 'It measures **water taken up**, and a small part of this is **used** in photosynthesis and kept in the cells, so uptake is not exactly equal to loss.',
  sol: 'Uptake, not loss.', scheme: [['Measures uptake; some water is used', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('limit-short', short({
  marks: 2,
  stem: "State two limitations of Ganong's potometer.",
  model: '1. It measures **water uptake**, not the actual **loss** of water vapour; some water is used by the shoot.\n2. It uses a **cut shoot**, not a whole plant with roots, and readings are upset by **air leaks** or changes in temperature.',
  sol: 'Uptake not loss; cut shoot and leaks.',
  scheme: [['First limitation', 1], ['Second limitation', 1]],
  d: 2, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- t05 factors affecting the rate; adaptations
add('humid-mcq', mcq({
  stem: 'Transpiration is slowest when the air around the plant is',
  right: 'humid and still', wrong: ['dry and windy', 'dry and still', 'warm and windy'],
  sol: 'Humid, still air keeps a moist layer around the leaf, so water vapour diffuses out slowly — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('light-mcq', mcq({
  stem: 'Transpiration increases in bright light mainly because',
  right: 'the stomata open in light', wrong: ['light makes the cuticle thinner', 'light increases the humidity of the air', 'light closes the stomata'],
  sol: 'Light opens stomata (and warms the leaf), so more water vapour escapes — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('cactus-mcq', mcq({
  stem: 'The leaves of Opuntia (a cactus) are reduced to spines. This helps the plant mainly by',
  right: 'reducing the surface from which water is lost', wrong: ['increasing the rate of transpiration', 'absorbing water from the air', 'making more food in the spines'],
  sol: 'Less leaf surface means far fewer stomata and less water loss; the green stem carries out photosynthesis — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('sunken-mcq', mcq({
  stem: 'Sunken stomata in desert plants reduce water loss mainly because',
  right: 'moist air trapped in the pit above each stoma lowers the loss of water vapour', wrong: ['the pits fill with liquid water', 'sunken stomata never open', 'the pits collect dew that the leaf absorbs'],
  sol: 'Still, humid air in the pit reduces the diffusion of water vapour out of the stoma — option (@K).',
  d: 3, c: 'analysis', t: [5],
}));
add('fastest-mcq', mcq({
  stem: 'Study the chart of potometer readings. Under which condition was water uptake fastest?',
  right: fan.cond, wrong: [still.cond, dark.cond, bag.cond],
  sol: `The bubble moved fastest, ${fan.rate} mm per minute, with the fan on — option (@K).`,
  d: 1, c: 'application', t: [5],
  assets: [chartFig],
}));
add('predict-mcq', mcq({
  stem: 'A potometer with a leafy shoot is moved from a bright, dry, breezy balcony into a dark, steamy bathroom. What will happen to the bubble, and why?',
  right: 'It slows down greatly, because the stomata close in the dark and the humid, still air reduces evaporation', wrong: ['It speeds up, because warm moist air increases evaporation', 'It does not change, because uptake does not depend on surroundings', 'It moves away from the shoot, because the shoot gives out water'],
  sol: 'Three factors now all lower the rate: darkness closes stomata, high humidity and still air slow diffusion — option (@K).',
  d: 4, c: 'analysis', t: [4, 5],
}));
add('temp-ar', ar({
  a: 'The rate of transpiration rises with a rise in temperature.',
  r: 'Most stomata of a dorsiventral leaf are on its lower surface.',
  key: 'd',
  sol: 'Both are true, but the position of stomata does not explain the effect of temperature, which works by speeding evaporation — option (d).',
  d: 2, c: 'analysis', t: [5],
}));
add('odd-factors', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Light, Humidity, Wind speed, Colour of the flowers.',
  model: '**Colour of the flowers**; the others are **factors that affect the rate of transpiration**.',
  sol: 'Flower colour has no effect.', scheme: [['Odd one and category', 1]],
  d: 1, c: 'analysis', t: [5],
}));
add('reason-wilt', short({
  marks: 1, wl: null,
  stem: 'Give reason: the leaves of a plant may droop on a hot, windy afternoon even though the soil is moist.',
  model: 'Water is **lost by transpiration faster than the roots can absorb** it, so the cells lose **turgor** and the leaves wilt.',
  sol: 'Loss exceeds uptake.', scheme: [['Loss faster than uptake; turgor lost', 1]],
  d: 3, c: 'application', t: [5],
}));
add('adapt-short', short({
  marks: 2,
  stem: 'State two structural adaptations of desert plants that reduce transpiration.',
  model: '1. **Leaves reduced to spines** (as in cactus), so there is very little leaf surface.\n2. A **thick waxy cuticle** and **sunken stomata**, which cut down the escape of water vapour.',
  sol: 'Any two adaptations.',
  scheme: [['First adaptation', 1], ['Second adaptation', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('factors-short', short({
  marks: 3,
  stem: 'Explain how light, humidity and wind each affect the rate of transpiration.',
  model: '**Light:** stomata **open** in light, so transpiration **increases**; in darkness most stomata close.\n**Humidity:** in humid air the leaf and air differ little in moisture, so water vapour diffuses out **more slowly**.\n**Wind:** wind **blows away** the moist air near the leaf and keeps the outside dry, so transpiration **increases**.',
  sol: 'Light up, humidity down, wind up.',
  scheme: [['Light', 1], ['Humidity', 1], ['Wind', 1]],
  d: 2, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- t06 guttation and bleeding
add('gutt-mcq', mcq({
  stem: 'Early on a humid morning, a row of tiny drops is seen along the tips and edges of grass leaves even though there was no rain or dew. The drops are due to',
  right: 'guttation through hydathodes', wrong: ['transpiration through stomata', 'bleeding from cut leaves', 'absorption of moisture from the air'],
  sol: 'When root pressure is high and transpiration is low, liquid water is pushed out through hydathodes — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('bleed-mcq', mcq({
  stem: 'Sap oozing from the cut stump of a freshly pruned vine is called',
  right: 'bleeding', wrong: ['guttation', 'transpiration', 'wilting'],
  sol: 'Bleeding is the flow of sap from a cut or injured part, driven by root pressure — option (@K).',
  d: 1, c: 'recall', t: [6],
}));
add('gutt-ar', ar({
  a: 'Guttation is most often seen at night and early in the morning.',
  r: 'At such times root pressure is high while transpiration is low.',
  key: 'c',
  sol: 'Both are true, and high root pressure with little transpiration is exactly what forces liquid water out — option (c).',
  d: 2, c: 'understanding', t: [6],
}));
add('gutt-tf', tf({
  stem: 'The liquid given out in guttation is pure water.',
  key: 'f',
  sol: 'False. It contains dissolved mineral salts and some other substances, which may be left as a crust when it dries.',
  d: 2, c: 'understanding', t: [6],
}));
add('guttation-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the loss of water in liquid form from the tips and margins of leaves.',
  model: '**Guttation.**',
  sol: 'Guttation.', scheme: [['Guttation', 1]],
  d: 1, c: 'recall', t: [6],
}));
add('gutt-transp-short', short({
  marks: 2,
  stem: 'Give two differences between guttation and transpiration.',
  model: '1. In **guttation** water is lost as **liquid drops**; in **transpiration** it is lost as **vapour**.\n2. Guttation takes place through **hydathodes** at the leaf margins, mostly at night; transpiration takes place mainly through **stomata**, mostly by day.',
  sol: 'Form; route and time.',
  scheme: [['Liquid vs vapour', 1], ['Hydathodes vs stomata', 1]],
  d: 2, c: 'understanding', t: [6, 1],
}));
add('bleed-short', short({
  marks: 2,
  stem: 'What is bleeding in plants? State one way in which it differs from guttation.',
  model: '**Bleeding** is the oozing of **sap from a cut or injured** part of a plant, caused by root pressure. It differs from guttation, which takes place from **uninjured leaves** through **hydathodes**.',
  sol: 'Sap from wounds vs drops from hydathodes.',
  scheme: [['Meaning of bleeding', 1], ['Difference from guttation', 1]],
  d: 2, c: 'understanding', t: [6],
}));

// ---------------------------------------------------------------- 5-mark Question 2 style items
add('mechanism-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [potassium, sodium, osmosis, turgid, flaccid, guard cells, open, close]\n\nIn light, (a) ______ ions move into the (b) ______. Water then enters these cells by (c) ______, so they become (d) ______ and curve apart, and the stomata (e) ______.',
  acc: [['potassium', 'K+'], ['guard cells'], ['osmosis'], ['turgid'], ['open']],
  sol: '(a) potassium; (b) guard cells; (c) osmosis; (d) turgid; (e) open.',
  d: 2, c: 'understanding', t: [2],
}));
add('exp-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [cobalt chloride, iodine, pink, blue, lower, upper, polythene, oil]\n\nDry (a) ______ paper is blue and turns (b) ______ in moist air. When it is clipped to both surfaces of a dorsiventral leaf, the paper on the (c) ______ surface changes colour first. In the bell jar experiment the pot is wrapped in (d) ______, and in the loss-of-weight experiment a layer of (e) ______ covers the water in the flask.',
  acc: [['cobalt chloride'], ['pink'], ['lower'], ['polythene'], ['oil']],
  sol: '(a) cobalt chloride; (b) pink; (c) lower; (d) polythene; (e) oil.',
  d: 2, c: 'understanding', t: [3],
}));
add('stoma-match5', match({
  marks: 5,
  stem: 'Study the figure of an open stoma and match each lettered part with its description.',
  pairs: [
    ['A', 'Changes shape as it gains or loses water, opening or closing the pore'],
    ['B', 'Opening through which water vapour and gases pass'],
    ['C', 'Green body found in this kind of cell but not in ordinary epidermal cells'],
    ['D', 'Thickened part of the wall that stretches less, so the cell curves when turgid'],
    ['E', 'Protective surface cell around the stomatal apparatus'],
  ],
  order: [2, 4, 0, 3, 1],
  sol: 'A guard cell; B stomatal pore; C chloroplast; D thick inner wall; E epidermal cell.',
  d: 2, c: 'application', t: [2],
  assets: [stomaFig],
}));

// ---------------------------------------------------------------- case-based (10 marks, experiment-based)
add('belljar-case', mk.case({
  stem: 'Study the figure and answer the questions.',
  passage: 'Tanvi set up two bell jars on glass plates in a sunny room. Under jar A she placed a watered potted plant; under jar B, a pot of watered soil with no plant. Both pots were wrapped in polythene. After three hours the inside of jar A was misty with drops, while jar B stayed clear.',
  d: 3, c: 'application',
  assets: [jarFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name the process shown by the drops in jar A.', model: '**Transpiration.**', sol: 'Transpiration.', scheme: [['Transpiration', 1]], d: 1, c: 'recall', t: [1, 3] })),
    part('b', short({ marks: 2, stem: 'Why did Tanvi wrap both pots in polythene?', model: 'To stop water **evaporating from the soil and the pot**. Then any drops that form must come only from the **aerial parts of the plant**.', sol: 'Prevents evaporation from soil.', scheme: [['Stops evaporation from soil and pot', 1], ['Drops then come only from the plant', 1]], d: 2, c: 'understanding', t: [3] })),
    part('c', short({ marks: 2, stem: 'What is the purpose of set-up B?', model: 'It is the **control**. It is the same as A except that it has **no plant**, so it shows that the drops in A came from the **plant** and not from the soil, pot or air.', sol: 'Control.', scheme: [['Control', 1], ['Shows drops come from the plant', 1]], d: 2, c: 'understanding', t: [3] })),
    part('d', short({ marks: 2, stem: 'Predict what Tanvi would see if she repeated the experiment with jar A kept in a dark cupboard. Explain.', model: '**Fewer drops**, forming more slowly. In darkness most **stomata close**, so far **less water vapour** escapes from the leaves.', sol: 'Fewer drops: stomata closed.', scheme: [['Fewer drops', 1], ['Stomata close in dark', 1]], d: 3, c: 'application', t: [5, 2] })),
    part('e', short({ marks: 3, stem: 'Describe a simple test to show that the drops in jar A are water, and give one importance of the process to the plant.', model: 'Touch the drops with **dry blue cobalt chloride paper** (or sprinkle **white anhydrous copper sulphate**): it turns **pink** (or **blue**), showing that the liquid is **water**. The process is important because it creates the **transpiration pull** that draws water and minerals up the stem (and it cools the leaves).', sol: 'Cobalt chloride turns pink; transpiration pull.', scheme: [['Correct test reagent', 1], ['Colour change showing water', 1], ['One importance', 1]], d: 2, c: 'application', t: [3, 1] }), [
      short({ marks: 3, stem: 'State three precautions Tanvi should take in this experiment.', model: '1. **Wrap the pot and soil** completely in polythene so no water evaporates from them.\n2. Make the bell jar **airtight** on the glass plate, for example with Vaseline at the rim.\n3. Use a **dry** bell jar and keep both set-ups in the **same conditions** of light and temperature.', sol: 'Three precautions.', scheme: [['First precaution', 1], ['Second precaution', 1], ['Third precaution', 1]], d: 2, c: 'application', t: [3] }),
    ]),
  ],
}));
add('cobalt-case', mk.case({
  stem: 'Study the figure and answer the questions.',
  passage: `Aman clipped strips of dry cobalt chloride paper, each covered by a glass slide, to the upper and lower surfaces of a leaf of a potted hibiscus plant. The paper on the lower surface changed colour in ${COBALT.lowerMin} minutes; the paper on the upper surface took ${COBALT.upperMin} minutes. His teacher said a leaf of this kind has about ${COBALT.lowerStomata} stomata per square millimetre on the lower surface and about ${COBALT.upperStomata} on the upper surface.`,
  d: 3, c: 'analysis',
  assets: [cobaltFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'State the colour change that Aman saw.', model: 'From **blue** to **pink**.', sol: 'Blue to pink.', scheme: [['Blue to pink', 1]], d: 1, c: 'recall', t: [3] })),
    part('b', num({ stem: 'How many times as many stomata are there on the lower surface as on the upper surface?', value: COBALT.stomataTimes, sol: `$${COBALT.lowerStomata} \\div ${COBALT.upperStomata} = ${COBALT.stomataTimes}$ times.`, scheme: [[`${COBALT.stomataTimes} times`, 1]], d: 1, c: 'application', t: [3] })),
    part('c', short({ marks: 2, stem: 'Explain why the paper on the lower surface changed colour first.', model: 'The lower surface has **many more stomata**, so **more water vapour** escapes from it in the same time. The paper there absorbs moisture faster and turns **pink** sooner.', sol: 'More stomata, more vapour.', scheme: [['More stomata on the lower surface', 1], ['More vapour absorbed faster', 1]], d: 2, c: 'understanding', t: [3] })),
    part('d', short({ marks: 2, stem: 'Why did Aman cover each paper with a glass slide?', model: 'The slide keeps out **moisture from the surrounding air**, so the paper changes colour only because of water vapour coming **from the leaf**; it also holds the paper flat against the leaf.', sol: 'Keeps out air moisture.', scheme: [['Keeps out moisture of the air', 1], ['Colour change due only to the leaf', 1]], d: 2, c: 'understanding', t: [3] })),
    part('e', short({ marks: 2, stem: 'Why must the cobalt chloride paper be kept dry, for example in a desiccator, until it is used?', model: 'Cobalt chloride paper turns pink with **any** moisture. If it absorbed moisture from the air before use, it would already be **pink or partly pink**, and the result would be **unreliable**.', sol: 'Avoids false pink.', scheme: [['Absorbs any moisture', 1], ['Result would be unreliable', 1]], d: 2, c: 'understanding', t: [3] })),
    part('f', short({ marks: 2, stem: 'Predict the result if Aman repeated the experiment on a maize leaf, and explain.', model: 'Both papers would turn pink at **about the same time**, because a maize leaf is **isobilateral** and has stomata in **nearly equal numbers** on both surfaces.', sol: 'Same time: isobilateral.', scheme: [['About the same time', 1], ['Equal stomata on both surfaces', 1]], d: 3, c: 'analysis', t: [3] }), [
      short({ marks: 2, stem: 'Predict the result if Aman first coated the lower surface of the hibiscus leaf with Vaseline, and explain.', model: 'The lower paper would stay **blue much longer**, perhaps longer than the upper one, because the Vaseline **blocks the stomata** on that surface, so little water vapour can escape.', sol: 'Lower paper stays blue.', scheme: [['Lower paper changes slowly', 1], ['Stomata blocked by Vaseline', 1]], d: 3, c: 'analysis', t: [3] }),
    ]),
  ],
}));
add('potometer-case', mk.case({
  stem: 'Study the figure and the data, and answer the questions.',
  passage: `A class used the apparatus shown to study a leafy shoot. They recorded how far the air bubble moved in ${POT.minutes} minutes under four conditions:\n\n| Condition | Distance moved (mm) |\n|---|---|\n${POT.rows.map((r) => `| ${r.cond} | ${r.mm} |`).join('\n')}`,
  d: 3, c: 'analysis',
  assets: [potFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name the apparatus.', model: "**Ganong's potometer.**", sol: 'Potometer.', scheme: [['Potometer', 1]], d: 1, c: 'recall', t: [4] })),
    part('b', num({ marks: 2, stem: 'Calculate the rate of bubble movement in still air and bright light, in mm per minute.', value: still.rate, unit: 'mm per minute', sol: `$${still.mm} \\div ${POT.minutes} = ${still.rate}$ mm per minute.`, scheme: [['Distance divided by time', 1], [`${still.rate} mm per minute`, 1]], d: 2, c: 'application', t: [4] })),
    part('c', short({ marks: 2, stem: 'Why did the bubble move faster when the fan was on?', model: 'Wind **removes the moist air** next to the leaves, so water vapour diffuses out faster and **transpiration increases**. The shoot then **takes up water faster**, pulling the bubble along.', sol: 'Wind increases transpiration.', scheme: [['Wind removes humid air', 1], ['Faster transpiration and uptake', 1]], d: 2, c: 'understanding', t: [5] })),
    part('d', short({ marks: 2, stem: 'Why did the bubble move so slowly in the dark cupboard and inside the plastic bag?', model: 'In the **dark**, most **stomata close**, so little water is lost. Inside the **bag** the air soon becomes **humid**, so water vapour diffuses out slowly. In both, transpiration and therefore uptake fall.', sol: 'Stomata close; humid air.', scheme: [['Dark: stomata close', 1], ['Bag: humid air', 1]], d: 3, c: 'analysis', t: [5, 2] })),
    part('e', num({ stem: `The capillary tube has a cross-section of ${POT.area} square millimetre. What volume of water (in cubic millimetres) did the shoot take up in ${POT.minutes} minutes in the dark?`, value: dark.vol, unit: 'cubic millimetres', sol: `Volume $= ${dark.mm} \\times ${POT.area} = ${dark.vol}$ cubic millimetres.`, scheme: [[`${dark.vol}`, 1]], d: 3, c: 'application', t: [4] })),
    part('f', short({ marks: 2, stem: 'State two precautions needed to get reliable readings with this apparatus.', model: '1. Cut the shoot **under water** and fit it under water, so that **no air enters** the xylem.\n2. Make every joint **airtight** with Vaseline, and keep the **temperature steady** while taking readings.', sol: 'Under water; airtight.', scheme: [['First precaution', 1], ['Second precaution', 1]], d: 2, c: 'application', t: [4] })),
  ],
}));
add('weight-case', mk.case({
  stem: 'Study the figure and answer the questions.',
  passage: `Two flasks of water, each with a layer of oil on the water, held shoots of the same plant: flask A a leafy shoot and flask B a shoot with all its leaves removed. They were weighed at 9 a.m. and again at 5 p.m.:\n\n| Flask | 9 a.m. (g) | 5 p.m. (g) |\n|---|---|---|\n| A (leafy) | ${WEIGHT.leafy.start.toFixed(1)} | ${WEIGHT.leafy.end.toFixed(1)} |\n| B (leafless) | ${WEIGHT.leafless.start.toFixed(1)} | ${WEIGHT.leafless.end.toFixed(1)} |`,
  d: 3, c: 'application',
  assets: [weightFig],
  children: [
    part('a', num({ marks: 2, stem: 'How much weight did flask A lose (in grams)?', value: WEIGHT.leafy.loss, unit: 'g', sol: `${WEIGHT.leafy.start.toFixed(1)} − ${WEIGHT.leafy.end.toFixed(1)} = ${WEIGHT.leafy.loss} g.`, scheme: [['Subtracts the readings', 1], [`${WEIGHT.leafy.loss} g`, 1]], d: 1, c: 'application', t: [3] })),
    part('b', num({ stem: 'What was the average rate of loss of flask A, in grams per hour?', value: WEIGHT.leafy.rate, unit: 'g per hour', sol: `$${WEIGHT.leafy.loss} \\div ${WEIGHT.hours} = ${WEIGHT.leafy.rate}$ g per hour.`, scheme: [[`${WEIGHT.leafy.rate} g per hour`, 1]], d: 2, c: 'application', t: [3] })),
    part('c', short({ marks: 2, stem: 'Why was a layer of oil placed on the water in each flask?', model: 'To **stop evaporation** from the water surface, so that any loss in weight is due **only to water lost by the shoot**.', sol: 'Stops evaporation.', scheme: [['Stops evaporation from water', 1], ['Loss due only to the shoot', 1]], d: 2, c: 'understanding', t: [3] })),
    part('d', short({ marks: 2, stem: 'Flask B also lost a little weight. Suggest how.', model: 'Some water is lost from the **stem itself**, through its **cuticle** and any **lenticels** or young stomata on the stem, and a little may escape around the **cut ends** where the leaves were removed.', sol: 'Loss through the stem.', scheme: [['Water lost through the stem surface', 1], ['Cuticle, lenticels or leaf scars named', 1]], d: 3, c: 'analysis', t: [1, 3] })),
    part('e', short({ marks: 3, stem: 'Work out how much water was lost through the leaves alone, and state the conclusion of the experiment.', model: `Loss from A = ${WEIGHT.leafy.loss} g; loss from B = ${WEIGHT.leafless.loss} g. Water lost through the leaves ≈ ${WEIGHT.leafy.loss} − ${WEIGHT.leafless.loss} = **${WEIGHT.byLeaves} g**. Conclusion: plants lose water by **transpiration**, and most of it is lost through the **leaves**.`, sol: `${WEIGHT.byLeaves} g; leaves are the main site.`, scheme: [['Loss of B found and subtracted', 1], [`${WEIGHT.byLeaves} g`, 1], ['Conclusion: most water is lost through leaves', 1]], d: 3, c: 'analysis', t: [3] })),
  ],
}));
add('stoma-case', mk.case({
  stem: 'Study the figure and answer the questions.',
  passage: 'The figure shows the surface view of the same stoma on a leaf at noon and at midnight. Parts of the stoma at noon are lettered A to E.',
  d: 3, c: 'analysis',
  assets: [stomaFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name the cell labelled A.', model: '**Guard cell.**', sol: 'Guard cell.', scheme: [['Guard cell', 1]], d: 1, c: 'recall', t: [2] })),
    part('b', short({ marks: 2, stem: 'State the role of the part labelled D in opening the stoma.', model: 'D is the **thick inner wall**. Because it **stretches less** than the thin outer wall, a turgid guard cell **curves outwards**, pulling the inner walls apart and **opening** the pore.', sol: 'Unequal thickening.', scheme: [['Thick inner wall named', 1], ['Stretches less, so cell curves and pore opens', 1]], d: 2, c: 'understanding', t: [2] })),
    part('c', short({ marks: 3, stem: 'Using the potassium ion exchange theory, explain why the stoma is open at noon and closed at midnight.', model: 'At noon, in light, **potassium ions** move **into the guard cells** from the epidermal cells. Water follows by **osmosis**, the guard cells become **turgid** and curve apart: the pore opens. At midnight potassium ions move **out**, water leaves, the guard cells become **flaccid** and straight: the pore closes.', sol: 'K+ in by day, out at night.', scheme: [['K+ enters in light', 1], ['Water enters; turgid; open', 1], ['K+ leaves at night; flaccid; closed', 1]], d: 3, c: 'analysis', t: [2] })),
    part('d', short({ marks: 2, stem: 'How is the opening of stomata in daylight useful to the plant, besides allowing transpiration?', model: 'Open stomata let **carbon dioxide** diffuse into the leaf for **photosynthesis**, which takes place only in light, and let **oxygen** out.', sol: 'Carbon dioxide for photosynthesis.', scheme: [['Carbon dioxide enters', 1], ['For photosynthesis in light', 1]], d: 2, c: 'application', t: [2] })),
    part('e', short({ marks: 2, stem: 'Name the cell E and give one way in which A differs from it.', model: 'E is an **epidermal cell**. A (the guard cell) is **bean-shaped** and contains **chloroplasts**, while E is irregular in shape and has **no chloroplasts**.', sol: 'Epidermal cell; chloroplasts.', scheme: [['Epidermal cell', 1], ['One difference', 1]], d: 2, c: 'understanding', t: [2] })),
  ],
}));
add('garden-case', mk.case({
  passage: 'Meher keeps a cactus in a pot on a sunny windowsill and has a small lawn of grass. On humid mornings she sees tiny drops lined up along the tips of the grass blades, which vanish by mid-morning. On a hot, dry, windy afternoon she notices the lawn grass drooping slightly, while the cactus looks unchanged.',
  d: 3, c: 'analysis',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name the process that produces the morning drops on the grass.', model: '**Guttation.**', sol: 'Guttation.', scheme: [['Guttation', 1]], d: 1, c: 'application', t: [6] })),
    part('b', short({ marks: 2, stem: 'Why are such drops seen in the early morning but not in the afternoon?', model: 'In the early morning **root pressure is high** and, because the air is humid and stomata are mostly closed, **transpiration is low**, so water is pushed out as drops through **hydathodes**. By afternoon transpiration is high and the drops do not form.', sol: 'High root pressure, low transpiration.', scheme: [['High root pressure', 1], ['Low transpiration in the morning', 1]], d: 2, c: 'understanding', t: [6] })),
    part('c', short({ marks: 2, stem: 'Why did the grass droop on the hot, windy afternoon?', model: 'Heat, dry air and wind made the grass **transpire very fast**. It **lost water faster than its roots could absorb** it, so its cells lost **turgor** and the blades wilted.', sol: 'Loss exceeded uptake.', scheme: [['Very high transpiration', 1], ['Loss faster than uptake: wilting', 1]], d: 3, c: 'application', t: [5] })),
    part('d', short({ marks: 2, stem: 'State two features of the cactus that help it to survive the same conditions.', model: '1. Its **leaves are reduced to spines**, so it has very little surface for transpiration.\n2. Its fleshy green stem has a **thick waxy cuticle** and **few, sunken stomata**, and it stores water.', sol: 'Spines; thick cuticle and sunken stomata.', scheme: [['First feature', 1], ['Second feature', 1]], d: 2, c: 'understanding', t: [5] })),
    part('e', short({ marks: 3, stem: 'Give three differences between the drops seen on the grass and the water lost by the cactus.', model: '1. **Form:** the grass loses **liquid drops**; the cactus loses water **vapour**.\n2. **Route:** the drops come out through **hydathodes**; the vapour escapes through **stomata** (and cuticle).\n3. **Time:** guttation happens at **night or early morning**; transpiration mostly by **day**. The drops also carry dissolved **salts**.', sol: 'Form, route, time.', scheme: [['Form', 1], ['Route', 1], ['Time or contents', 1]], d: 3, c: 'analysis', t: [6, 1] }), [
      short({ marks: 3, stem: 'Meher cuts a stem of a rose bush and sees sap oozing from the cut end of the plant. Name this process and give two ways in which it differs from what she saw on the grass.', model: 'This is **bleeding**. 1. It occurs from a **cut or injured** part, while guttation occurs from **uninjured leaves**. 2. Bleeding releases **sap** from the cut tissues, while guttation releases drops through **hydathodes** at the leaf tips and margins.', sol: 'Bleeding; two differences.', scheme: [['Bleeding', 1], ['First difference', 1], ['Second difference', 1]], d: 2, c: 'understanding', t: [6] }),
    ]),
  ],
}));
