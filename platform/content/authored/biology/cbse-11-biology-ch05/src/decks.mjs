// ch05 Morphology of Flowering Plants — two decks: Part 1 (t01 root, stem, leaf), Part 2 (t02 inflorescence, flower, fruit, seed; t03 Solanaceae).
import { sl, deck, table, flow, svgV, r } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { FLOWER, PLAC, SEEDS, SOLFLOR, ROOTZONES } from './svgs.mjs';
import { N, ELONG, MANGO, SOL_TEX, SOL_TEXT, SOL_FACTS, FLOWERS, facts, formulaTex } from './calc.mjs';

export const V = {
  zones: svgV(ROOTZONES, 'Labelled tip of a young root with root cap, region of meristematic activity, region of elongation and region of maturation with root hairs'),
  flower: svgV(FLOWER, 'Labelled longitudinal section of a typical flower showing pedicel, thalamus, sepal, petal, stamen with filament and anther, and carpel with stigma, style, ovary and ovules'),
  plac: svgV(PLAC, 'Five ovary sections showing marginal, axile, parietal, free central and basal placentation, each with an example plant'),
  seeds: svgV(SEEDS, 'Labelled longitudinal sections of a bean seed and a maize grain showing seed coat, hilum, micropyle, cotyledons, embryonal axis, endosperm, aleurone layer, scutellum, coleoptile and coleorhiza'),
  solflor: svgV(SOLFLOR, 'Floral diagram of Solanaceae with mother axis, five united sepals, five united petals, five epipetalous stamens and a bicarpellary syncarpous ovary with axile placentation'),
  roots: table(
    ['Root system', 'Origin', 'Typical plants'],
    [['Tap root', 'Radicle grows into the primary root, which bears lateral roots', 'Mustard, gram, other dicots'], ['Fibrous roots', 'Primary root is short-lived; many roots arise from the base of the stem', 'Wheat, rice, other monocots'], ['Adventitious roots', 'Arise from parts of the plant other than the radicle', 'Grass, Monstera, banyan']],
    'Table comparing tap root, fibrous root and adventitious root systems',
  ),
  rootmods: table(
    ['Modification', 'Function', 'Example'],
    [['Storage tap root, swollen', 'Stores food', 'Carrot, turnip (adventitious: sweet potato)'], ['Prop roots', 'Support heavy branches', 'Banyan'], ['Stilt roots', 'Support from the lower nodes', 'Maize, sugarcane'], ['Pneumatophores', 'Take in air in swampy soil', 'Rhizophora (mangrove)']],
    'Table of root modifications with function and example',
  ),
  stemmods: table(
    ['Modification', 'Arises from', 'Function', 'Example'],
    [['Underground stems', 'Stem', 'Store food, survive harsh seasons', 'Potato, ginger, turmeric, Colocasia'], ['Tendrils', 'Axillary bud', 'Climbing', 'Watermelon, cucumber, grape vine'], ['Thorns', 'Axillary bud', 'Protection', 'Citrus, Bougainvillea'], ['Flattened green stem', 'Stem', 'Photosynthesis', 'Opuntia']],
    'Table of stem modifications with origin, function and example',
  ),
  leaf: table(
    ['Part', 'What it is'],
    [['Leaf base', 'Attaches leaf to stem; may carry two small stipules (dicots), form a sheath (monocots) or swell into a pulvinus (legumes)'], ['Petiole', 'Stalk that holds the blade to light; waves the lamina'], ['Lamina (blade)', 'Green expanded part with a midrib and veins']],
    'Table of the three parts of a leaf',
  ),
  venation: table(
    ['Feature', 'Dicot leaf', 'Monocot leaf'],
    [['Venation', 'Reticulate (network)', 'Parallel'], ['Leaf base', 'Often with stipules', 'Expands into a sheath'], ['Examples', 'Mango, mustard', 'Maize, banana']],
    'Table comparing dicot and monocot leaves',
  ),
  phyllo: table(
    ['Phyllotaxy', 'Leaves at each node', 'Example'],
    [['Alternate', 'One', 'China rose, mustard, sunflower'], ['Opposite', 'Two, on opposite sides', 'Calotropis, guava'], ['Whorled', 'More than two in a circle', 'Alstonia']],
    'Table of alternate, opposite and whorled phyllotaxy with examples',
  ),
  leafmods: table(
    ['Leaf modified into', 'Function', 'Example'],
    [['Tendrils', 'Climbing', 'Pea'], ['Spines', 'Protection, less water loss', 'Cacti'], ['Fleshy leaves', 'Store food', 'Onion, garlic'], ['Insect-trapping structures', 'Trap insects', 'Pitcher plant, Venus flytrap']],
    'Table of leaf modifications with function and example',
  ),
  inflor: table(
    ['Feature', 'Racemose', 'Cymose'],
    [['Main axis', 'Grows continuously', 'Ends in a flower, so growth stops'], ['Flower order', 'Older at base, younger near tip (acropetal)', 'Older at top, younger below (basipetal)'], ['Example', 'Mustard', 'Solanum']],
    'Table comparing racemose and cymose inflorescences',
  ),
  whorls: table(
    ['Whorl', 'Members', 'Role'],
    [['Calyx', 'Sepals', 'Protect the bud'], ['Corolla', 'Petals', 'Attract insects'], ['Androecium', 'Stamens (filament and anther)', 'Male: make pollen'], ['Gynoecium', 'Carpels (stigma, style, ovary)', 'Female: ovules and seeds']],
    'Table of the four whorls of a flower with members and roles',
  ),
  ovarypos: table(
    ['Flower type', 'Position of ovary', 'Example'],
    [['Hypogynous', 'Superior, above the other whorls', 'Mustard, china rose, brinjal'], ['Perigynous', 'Half inferior, on the rim of a cup-shaped thalamus', 'Plum, rose, peach'], ['Epigynous', 'Inferior, below the other whorls', 'Guava, cucumber']],
    'Table of hypogynous, perigynous and epigynous flowers',
  ),
  fruit: table(
    ['Term', 'Meaning'],
    [['Fruit', 'A mature ovary, usually after fertilisation'], ['Pericarp', 'Fruit wall: epicarp, mesocarp, endocarp'], ['Drupe', 'One-seeded fruit with a fleshy mesocarp and a stony endocarp (mango, coconut)'], ['Parthenocarpic fruit', 'Develops without fertilisation (banana)']],
    'Table of fruit terms',
  ),
  seedtab: table(
    ['Feature', 'Bean (dicot)', 'Maize (monocot)'],
    [['Cotyledons', 'Two, store food', 'One, scutellum'], ['Endosperm', 'Absent in the mature seed', 'Large, with aleurone layer'], ['Seed coat', 'Separate testa and tegmen', 'Membranous, fused with fruit wall'], ['Protective sheaths', 'None', 'Coleoptile and coleorhiza']],
    'Table comparing a bean seed and a maize grain',
  ),
  solfeat: table(
    ['Part', 'Solanaceae'],
    [['Habit', 'Herbs, shrubs, small trees'], ['Stem', 'Herbaceous, rarely woody; aerial or underground (potato)'], ['Leaves', 'Alternate, simple, rarely pinnately compound, without stipules; reticulate venation'], ['Inflorescence', 'Solitary, axillary or cymose'], ['Flower', 'Bisexual, actinomorphic'], ['Calyx and corolla', 'Five sepals united; five petals united'], ['Androecium', 'Five stamens, epipetalous'], ['Gynoecium', 'Bicarpellary, syncarpous, superior, two-chambered; swollen placentae with many ovules'], ['Fruit and seed', 'Berry or capsule; many endospermous seeds']],
    'Table of vegetative and floral characters of Solanaceae',
  ),
  symbols: table(
    ['Symbol', 'Meaning'],
    [['Br', 'Bracteate'], ['⊕', 'Actinomorphic flower'], ['%', 'Zygomorphic flower'], ['⚥', 'Bisexual flower'], ['K, C, A, G', 'Calyx, corolla, androecium, gynoecium'], ['( ) round a number', 'Members of the whorl are united'], ['Line under G', 'Superior ovary'], ['Line over G', 'Inferior ovary']],
    'Table of symbols used in floral formulae',
  ),
};

export const deck1 = deck({
  part: 1,
  title: 'Morphology of Flowering Plants — Part 1: Root, stem and leaf',
  goals: [
    'Distinguish tap, fibrous and adventitious roots and describe the regions of a root',
    'Describe the modifications of root, stem and leaf with examples',
    'Describe leaf parts, venation, compound leaves and phyllotaxy',
  ],
  slides: [
    sl('title', 'Morphology of flowering plants', {
      b: 'Part 1 — the vegetative parts: root, stem and leaf.',
      v: flow('LR', [['r', 'Root system (below ground)'], ['s', 'Shoot system'], ['st', 'Stem'], ['l', 'Leaf']], [['r', 's'], ['s', 'st'], ['s', 'l']], 'Flow showing the flowering plant divided into root system and shoot system, with stem and leaf in the shoot'),
      n: 'Morphology is the study of the form and external features of an organism. A flowering plant has a root system that lives below the ground and a shoot system above it, made of the stem, the leaves and, later, flowers and fruits. In this part we look at the vegetative organs.',
    }),
    sl('concept', 'Three kinds of root system', {
      b: 'In most **dicots** the **radicle** becomes a **tap root**; in **monocots** it is short-lived and a mass of **fibrous roots** takes over. Roots from any other part of the plant are **adventitious**.',
      v: V.roots,
      n: 'Think of the radicle as the first root of the seedling. In mustard and gram it grows into a thick primary root with branches. In wheat and rice it dies early and many thin roots arise from the base of the stem. Roots that come from places other than the radicle, such as from grass nodes, are adventitious.',
    }),
    sl('diagram', 'Regions of a young root', {
      b: 'A **root cap** covers the tip. Behind it, the **meristematic region** divides, the **region of elongation** enlarges the cells, and in the **region of maturation** cells differentiate and **root hairs** absorb water and minerals.',
      v: V.zones,
      n: 'The root cap is like a thimble that protects the tip as it pushes through soil. Just behind it, small thin walled cells divide again and again. Further up, the new cells grow longer, and this is what lengthens the root. Higher still, cells take on special roles, and fine root hairs take up water and minerals.',
    }),
    sl('example', 'Worked example 1: where does a root grow?', {
      b: `A root tip is marked with ink every 1 mm for ten intervals, counted from the tip. After a day the growth in each interval is: ${ELONG.join(', ')} mm. Find the total growth and the interval that grew most.`,
      ul: [
        r`Add all ten values: $${ELONG.join(' + ')} = ${N.elongTotal}$ mm.`,
        `The largest value is ${Math.max(...ELONG)} mm, in interval ${N.elongMaxInterval} from the tip.`,
        'Intervals 3 to 6 lie in the region of elongation; intervals 7 to 10 did not grow because that region has matured.',
      ],
      v: table(['Intervals from the tip', 'Growth (mm)', 'Region'], [['1 and 2', String(N.elongMeri), 'Meristematic'], ['3 to 6', String(N.elongElong), 'Elongation'], ['7 to 10', String(N.elongMature), 'Maturation']], 'Worked table of root growth by region'),
      n: 'Add the ten growth values to get the total elongation. The biggest increase is in the fourth interval from the tip, which lies in the region of elongation. The oldest intervals, near the root hairs, have stopped growing because their cells have already matured.',
    }),
    sl('concept', 'Modified roots', {
      b: 'Roots may be modified for **storage**, **support** and **breathing**.',
      v: V.rootmods,
      n: 'A carrot is a swollen tap root that stores food. The banyan sends down pillar like prop roots from its branches to support them. Maize and sugarcane put out stilt roots from the lowest nodes. Mangrove plants growing in swampy soil send up pneumatophores, upright roots with pores that bring air to the roots below.',
    }),
    sl('check', 'Quick check: root modifications', {
      b: 'Match the root to its job.',
      n: 'Quick check. Think about where the root arises and what job it does.',
      chk: 'prop-mcq',
    }),
    sl('concept', 'The stem', {
      b: 'The stem develops from the **plumule**. It has **nodes** where leaves arise and **internodes** between them, and bears **buds**: terminal buds at the tip and **axillary buds** in the leaf axils.',
      v: flow('LR', [['p', 'Plumule'], ['s', 'Stem: nodes and internodes'], ['b', 'Buds: terminal and axillary'], ['f', 'Branches, leaves, flowers, fruits']], [['p', 's'], ['s', 'b'], ['b', 'f']], 'Flow from plumule to stem with nodes and buds and then branches, leaves, flowers and fruits'),
      n: 'The stem grows upward from the plumule of the embryo. The points where leaves are attached are nodes, and the stretches between are internodes. Buds at the tip let the stem grow longer, and buds in the leaf axils form branches or flowers. The stem spreads branches, holds leaves, flowers and fruits, and carries water, minerals and food.',
    }),
    sl('concept', 'Modified stems', {
      b: 'Stems can be modified to **store food**, to **climb**, to **protect** and to **photosynthesise**.',
      v: V.stemmods,
      n: 'The potato, ginger and turmeric are underground stems swollen with stored food. Watermelon and grape vines climb with tendrils that grow from axillary buds. Thorns, as in citrus and bougainvillea, are hard pointed stems from axillary buds that guard the plant. In the prickly pear, the stem itself is flat, green and fleshy, and does the photosynthesis.',
    }),
    sl('check', 'Quick check: stems', {
      b: 'Decide what the “eyes” of a potato are.',
      n: 'Quick check. Ask what a bud in a leaf axil can become.',
      chk: 'potato-mcq',
    }),
    sl('concept', 'The leaf: parts and venation', {
      b: 'A typical leaf has a **leaf base**, a **petiole** and a **lamina**. **Venation** is the arrangement of veins: **reticulate** in dicots, **parallel** in monocots.',
      v: V.leaf,
      n: 'The leaf base attaches the leaf to the stem. In many dicots it carries two small stipules, while in monocots it spreads into a sheath. The petiole holds the blade out to the light. The lamina is the green blade, with a midrib and veins. Dicot leaves have a network of veins, and monocot leaves have veins running side by side.',
    }),
    sl('concept', 'Simple and compound leaves', {
      b: 'A **simple** leaf has one lamina, even if deeply cut. In a **compound** leaf the lamina is broken into **leaflets**: **pinnately** along a rachis (neem) or **palmately** from one point (silk cotton). A bud sits in the axil of a leaf, never of a leaflet.',
      v: V.venation,
      n: 'In a compound leaf the blade is divided into separate leaflets. If the leaflets sit along a central axis called the rachis, the leaf is pinnately compound, as in neem. If they all arise from the tip of the petiole, like fingers from a palm, it is palmately compound, as in silk cotton.',
    }),
    sl('check', 'Quick check: venation', {
      b: 'Identify the plant group from the leaf.',
      n: 'Quick check. Look at how the veins run.',
      chk: 'venation-mcq',
    }),
    sl('concept', 'Phyllotaxy', {
      b: '**Phyllotaxy** is the pattern of leaf arrangement on the stem: **alternate**, **opposite** or **whorled**.',
      v: V.phyllo,
      n: 'Count the leaves at one node. If there is a single leaf, the arrangement is alternate. Two leaves facing each other make it opposite. More than two leaves in a circle make it whorled.',
    }),
    sl('example', 'Worked example 2: counting leaves', {
      b: `A guava branch has 7 nodes. An Alstonia shoot has 5 nodes. A mustard shoot has 9 nodes. How many leaves does each carry?`,
      ul: [
        r`Guava is opposite, two leaves per node: $7 \times 2 = ${N.opp}$.`,
        r`Alstonia is whorled, here four leaves per node: $5 \times 4 = ${N.whorl}$.`,
        r`Mustard is alternate, one leaf per node: $9 \times 1 = ${N.alt}$.`,
      ],
      v: table(['Plant', 'Phyllotaxy', 'Nodes', 'Leaves'], [['Guava', 'Opposite', '7', String(N.opp)], ['Alstonia', 'Whorled', '5', String(N.whorl)], ['Mustard', 'Alternate', '9', String(N.alt)]], `Worked table: ${N.opp}, ${N.whorl} and ${N.alt} leaves`),
      n: 'Multiply the number of nodes by the number of leaves at each node. Guava with seven nodes and two leaves a node gives fourteen leaves. Alstonia with five nodes and four leaves a node gives twenty. Mustard with nine nodes and one leaf a node gives nine.',
    }),
    sl('concept', 'Modified leaves', {
      b: 'Leaves may become **tendrils**, **spines**, **fleshy storage leaves** or **insect-trapping** structures.',
      v: V.leafmods,
      n: 'In the pea plant some leaflets become tendrils that help it climb. In cacti, leaves are reduced to spines, which protect the plant and cut down water loss. The leaves of onion and garlic are fleshy and store food. In the pitcher plant and Venus flytrap, leaves become traps for insects.',
    }),
    sl('check', 'Quick check: counting leaves', {
      b: 'Work out the number of leaves on a shoot.',
      n: 'Quick check. First decide the phyllotaxy, then count.',
      chk: 'opp-num',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Tap root (dicots), fibrous roots (monocots), adventitious roots (from other parts).',
        'Root regions from the tip: root cap, meristematic, elongation, maturation (root hairs).',
        'Root modifications: storage, prop, stilt roots and pneumatophores.',
        'Stem: nodes, internodes, buds; modified for storage, climbing, protection and photosynthesis.',
        'Leaf: base, petiole, lamina; reticulate or parallel venation; simple or compound.',
        'Phyllotaxy: alternate, opposite, whorled. Leaves can become tendrils, spines, fleshy or trapping.',
      ],
      v: V.venation,
      n: 'To recap: roots anchor and absorb, and may be modified for storage, support or breathing. The stem bears nodes and buds, and can store food, climb, protect or photosynthesise. Leaves have a base, a petiole and a blade, with reticulate or parallel veins, arranged alternately, oppositely or in whorls.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Always give **an example** with every modification.',
        'Say **where the organ arises**: a thorn is a stem, a spine is a leaf.',
        'Name the **root regions in order** from the tip upwards.',
        'Count **leaves per node** to decide phyllotaxy.',
      ],
      n: 'Exam tips. Give one example with every modification. Say which organ the structure comes from, since thorns are stems and spines are leaves. List the root regions in order from the tip. And count the leaves at one node before naming the phyllotaxy.',
    }),
  ],
});

const sol = SOL_FACTS;
export const deck2 = deck({
  part: 2,
  title: 'Morphology of Flowering Plants — Part 2: Inflorescence, flower, fruit, seed and Solanaceae',
  goals: [
    'Distinguish racemose and cymose inflorescences',
    'Describe the parts of a flower, ovary position, aestivation and placentation',
    'Describe a fruit, a dicot seed and a monocot seed',
    'Write the floral formula and describe the floral diagram of Solanaceae',
  ],
  slides: [
    sl('title', 'The flower, fruit and seed', {
      b: 'Part 2 — the reproductive parts, ending with the family Solanaceae.',
      v: flow('LR', [['i', 'Inflorescence'], ['f', 'Flower'], ['fr', 'Fruit'], ['s', 'Seed']], [['i', 'f'], ['f', 'fr'], ['fr', 's']], 'Flow from inflorescence to flower, fruit and seed'),
      n: 'The flower is the reproductive unit of a flowering plant. Flowers are grouped in inflorescences, and after fertilisation the ovary becomes a fruit and the ovules become seeds. We end by describing one plant family in full.',
    }),
    sl('concept', 'Inflorescence', {
      b: 'An **inflorescence** is the arrangement of flowers on the floral axis. It is **racemose** or **cymose**.',
      v: V.inflor,
      n: 'In a racemose inflorescence, the main axis keeps growing, and flowers are borne along its sides, with the oldest at the base. In a cymose inflorescence, the main axis ends in a flower, so growth stops, and the younger flowers are found below the older one.',
    }),
    sl('example', 'Worked example 1: a raceme', {
      b: `A raceme has ${N.racemeTotal} flowers. One flower opens each day, starting at the base. How many buds are closed at the end of day ${N.racemeDay}, and which flower opens on day 8?`,
      ul: [
        r`Flowers opened by day ${N.racemeDay}: ${N.racemeDay}. Buds left: $${N.racemeTotal} - ${N.racemeDay} = ${N.racemeBuds}$.`,
        'Opening goes from the base to the tip (acropetal), so on day 8 the eighth flower from the base opens.',
        'The youngest flower is near the tip, as expected for a racemose axis.',
      ],
      v: table(['Day', 'Flowers open', 'Buds closed'], [['1', '1', String(N.racemeTotal - 1)], [String(N.racemeDay), String(N.racemeDay), String(N.racemeBuds)], ['8', '8', String(N.racemeTotal - 8)]], `Worked table: ${N.racemeBuds} buds closed on day ${N.racemeDay}`),
      n: 'Each day one more flower opens, moving up the axis from the oldest flower at the base. After five days, five flowers are open and seven buds remain. On day eight, the eighth flower from the base opens.',
    }),
    sl('diagram', 'Parts of a flower', {
      b: 'A flower sits on a **pedicel** and **thalamus**. From outside in: **calyx** (sepals), **corolla** (petals), **androecium** (stamens: filament and anther), **gynoecium** (carpel: stigma, style, ovary with ovules).',
      v: V.flower,
      n: 'Sepals, usually green, protect the bud. Petals are often brightly coloured to attract insects. A stamen is a filament carrying an anther, which makes pollen. At the centre is the carpel, made of a stigma that receives pollen, a style, and an ovary containing the ovules.',
    }),
    sl('concept', 'Types of flowers', {
      b: '**Symmetry:** actinomorphic (radial) or zygomorphic (one plane). **Position of the ovary** gives hypogynous, perigynous or epigynous flowers. **Aestivation:** valvate, twisted, imbricate or vexillary.',
      v: V.ovarypos,
      n: 'A flower that can be cut into equal halves along any vertical plane is actinomorphic, while one that can be cut in only one plane is zygomorphic. When the ovary lies above the other parts the flower is hypogynous, when it lies below it is epigynous, and when it sits halfway on a cup it is perigynous.',
    }),
    sl('check', 'Quick check: ovary position', {
      b: 'Name the type of flower from the position of its ovary.',
      n: 'Quick check. Ask whether the other parts arise above or below the ovary.',
      chk: 'ovarypos-mcq',
    }),
    sl('diagram', 'Placentation', {
      b: '**Placentation** is how ovules are attached inside the ovary: **marginal** (pea), **axile** (tomato, lemon), **parietal** (mustard), **free central** (Dianthus), **basal** (sunflower).',
      v: V.plac,
      n: 'Placentation describes the arrangement of ovules on the placenta. In marginal placentation, a single chamber has ovules along one edge. In axile placentation, the ovules sit on the central axis of a chamber ovary with several chambers. In parietal placentation, they are on the wall. In free central, they sit on a column with no partitions. In basal, a single ovule sits at the base.',
    }),
    sl('check', 'Quick check: placentation', {
      b: 'Identify a placentation type in the lettered diagram.',
      n: 'Quick check. Look at where the ovules are attached.',
      chk: 'plac-mcq',
    }),
    sl('concept', 'Fruit', {
      b: 'A **fruit** is a mature ovary. Its wall, the **pericarp**, has an **epicarp**, **mesocarp** and **endocarp**. A **drupe** has a fleshy mesocarp and stony endocarp. Some fruits, like the banana, are **parthenocarpic**.',
      v: V.fruit,
      n: 'After fertilisation the ovary turns into a fruit and the ovules into seeds. The fruit wall is the pericarp. In a mango, the thin skin is the epicarp, the juicy part is the mesocarp, and the hard stone around the seed is the endocarp. Fruits that form without fertilisation, such as the banana, are called parthenocarpic.',
    }),
    sl('example', 'Worked example 2: a mango and a tomato', {
      b: `A mango weighs ${MANGO.total} g: skin ${MANGO.epicarp} g, stone with seed ${MANGO.stone} g. A tomato ovary has 2 chambers with 30 ovules each, and 80 percent become seeds. Find the mass of the flesh and the number of seeds.`,
      ul: [
        r`Mesocarp: $${MANGO.total} - ${MANGO.epicarp} - ${MANGO.stone} = ${MANGO.mesocarp}$ g, that is ${MANGO.mesoPct} percent of the fruit.`,
        r`Ovules: $2 \times 30 = ${N.tomatoOvules}$.`,
        r`Seeds: $${N.tomatoOvules} \times \dfrac{80}{100} = ${N.tomatoSeeds}$.`,
      ],
      v: table(['Quantity', 'Value'], [['Mango flesh (mesocarp)', `${MANGO.mesocarp} g`], ['Tomato ovules', String(N.tomatoOvules)], ['Tomato seeds', String(N.tomatoSeeds)]], `Worked table: ${MANGO.mesocarp} g flesh, ${N.tomatoOvules} ovules, ${N.tomatoSeeds} seeds`),
      n: 'Take the skin and the stone away from the total mass to get the flesh, which is three hundred and ten grams. For the tomato, two chambers with thirty ovules each give sixty ovules, and four fifths of them become seeds, which is forty eight.',
    }),
    sl('diagram', 'Dicot and monocot seeds', {
      b: 'A bean has a **seed coat** (testa and tegmen), **hilum**, **micropyle**, **two cotyledons** and an **embryonal axis**. A maize grain has a membranous coat fused with the fruit wall, a large **endosperm** with an **aleurone layer**, one **scutellum**, **coleoptile** and **coleorhiza**.',
      v: V.seeds,
      n: 'In the bean, two fleshy cotyledons store food and the endosperm is absent in the mature seed. The hilum is the scar where the seed was attached, and the micropyle is a tiny pore. In the maize grain, the seed coat is fused with the fruit wall, a large endosperm stores food, and one shield shaped cotyledon, the scutellum, lies next to the embryo, with sheaths over its shoot and root.',
    }),
    sl('check', 'Quick check: seeds', {
      b: 'Find the feature found in maize but not in bean.',
      n: 'Quick check. Think about where each seed stores its food.',
      chk: 'maize-mcq',
    }),
    sl('concept', 'Family Solanaceae: vegetative and floral features', {
      b: 'The family includes **potato**, **tomato**, **brinjal**, **chilli**, **tobacco**, **ashwagandha**, **belladonna** and **petunia**.',
      v: V.solfeat,
      n: 'Solanaceae are herbs, shrubs and small trees. The leaves are alternate and simple, with network venation. The flower is bisexual and radially symmetrical, with five united sepals, five united petals, five stamens attached to the petals, and two united carpels with the ovary above. The fruit is a berry or a capsule with many seeds.',
    }),
    sl('diagram', 'Floral diagram of Solanaceae', {
      b: 'A **floral diagram** shows the number, arrangement and fusion of the floral members in a transverse view, with the **mother axis** at the top.',
      m: [SOL_TEX],
      v: V.solflor,
      n: 'In the diagram, the mother axis is at the top. Moving inwards we see five sepals joined together, five petals joined together, and five stamens that alternate with the petals and are attached to them. At the centre, two united carpels form a chambered ovary, with the ovules on swollen placentae.',
    }),
    sl('example', 'Worked example 3: reading a floral formula', {
      b: `Read the formula of Solanaceae, $${SOL_TEX}$: what does each part say, and how many floral members are there in all?`,
      ul: [
        r`$\oplus$ : radially symmetrical (actinomorphic); the flower is bisexual.`,
        r`$K_{(5)}$ and $C_{(5)}$: five sepals and five petals, each set united by the brackets.`,
        r`$A_{5}$ : five stamens, not united with one another; $\underline{G}_{(2)}$ : two united carpels, ovary superior (line below G).`,
        r`Count the members: $5 + 5 + 5 + 2 = ${sol.members}$.`,
      ],
      v: V.symbols,
      n: 'Read the formula from left to right. The circle with a plus sign says the flower is radially symmetrical. Brackets around a number show that the members of that whorl are united, so the sepals and the petals are united. The five stamens are not bracketed, and the line under the G shows that the ovary is superior. In all there are seventeen floral members.',
    }),
    sl('check', 'Quick check: floral formula', {
      b: 'Describe a flower from its floral formula.',
      n: 'Quick check. Look for brackets and for the line near the G.',
      chk: 'formula-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Racemose: axis grows, flowers acropetal. Cymose: axis ends in a flower, basipetal.',
        'Flower whorls: calyx, corolla, androecium, gynoecium; symmetry, ovary position and aestivation vary.',
        'Placentation: marginal, axile, parietal, free central, basal.',
        'Fruit is a ripened ovary; pericarp has epicarp, mesocarp, endocarp; parthenocarpic fruit forms without fertilisation.',
        'Dicot seed: two cotyledons, usually no endosperm; monocot grain: endosperm, scutellum, coleoptile, coleorhiza.',
        `Solanaceae: bisexual, actinomorphic, K(5) C(5) A5 G(2) superior; berry or capsule.`,
      ],
      v: V.whorls,
      n: 'To recap: flowers are arranged in racemose or cymose inflorescences. Each flower has a calyx, corolla, androecium and gynoecium, and types differ in symmetry, ovary position, aestivation and placentation. The fruit is a ripened ovary and the seed a ripened ovule. Solanaceae have a distinctive floral formula and diagram.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Draw the **floral diagram** with the mother axis at the top.',
        'Write the **formula** with brackets for fusion and a line under G for a superior ovary.',
        'Give **an example** for each placentation and each type of ovary position.',
        'In seed questions, state **cotyledons, endosperm and seed coat** for both seeds.',
      ],
      n: 'Exam tips. Draw the floral diagram with the mother axis at the top. In a formula use brackets for fused whorls and a line under the G for a superior ovary. Give an example for each type of placentation. And for seeds, always compare the cotyledons, the endosperm and the seed coat.',
    }),
  ],
});
void facts;
void FLOWERS;
void formulaTex;
void SOL_TEXT;
