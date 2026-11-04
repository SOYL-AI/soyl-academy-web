// ISC 11 Biology ch06 Morphology of Root, Stem and Leaf — question bank in ISC school-examination style. Numbers come from calc.mjs.
// AR keys (ISC options): a b c d.
import { mk, add, svgV } from '../../isc-11-biology-ch01/src/lib.mjs';
import { rootMod, rootFn, stemMod, stemPos, TIP, TIP_MATURE, GROWTH, GROWTH_WEEK, POTATO, POTATO_EYES, RUNNER, RUNNER_NODES, LEAVES_PER_NODE, leaves, LEAF_WHORL, pinnateLeaflets, LEAFLETS_NEEM, LEAFLETS_ROSE, BRYO, BRYO_PLANTLETS, PITCHER, PITCHER_INSECTS, ONION, ONION_SCALES, MANGROVE, PNEUMATOPHORES, PALMATE, LEAFLETS_COMPOUND_TWIG, MIX_LEAFLETS, MIX_TOTAL } from './calc.mjs';
import { ROOT_TIP_LETTERED, LEAF_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, part } = mk;
const tipFig = svgV(ROOT_TIP_LETTERED, 'A root tip with four regions marked A to D');
const leafFig = svgV(LEAF_LETTERED, 'A simple leaf with parts marked A to E');

// ---------------------------------------------------------------- t01 roots
add('ck-roottip-mcq', mcq({
  stem: 'In which region of a young root do root hairs appear?',
  right: 'The region of maturation',
  wrong: ['The root cap', 'The region of meristematic activity', 'The region of elongation'],
  sol: 'Root hairs form from epidermal cells of the region of maturation, above the zone of elongation — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('tip-fig-mcq', mcq({
  stem: 'In the figure of a root tip, the cells increase in length mainly in the region marked',
  right: 'C',
  wrong: ['A', 'B', 'D'],
  sol: 'C is the region of elongation, where cells lengthen and push the tip forward — option (@K).',
  d: 2, c: 'application', t: [1],
  assets: [tipFig],
}));
add('tip-fig2-mcq', mcq({
  stem: 'In the same figure, the cells that divide actively to add new cells to the root lie in the region marked',
  right: 'B',
  wrong: ['A', 'C', 'D'],
  sol: 'B is the region of meristematic activity — option (@K).',
  d: 2, c: 'application', t: [1],
  assets: [tipFig],
}));
add('tip-fig3-mcq', mcq({
  stem: 'In the same figure, a plant transplanted carelessly loses most of the structures that arise in the region marked D. The plant will wilt because',
  right: 'it can no longer absorb enough water and minerals',
  wrong: ['its root cap is lost', 'the cells of the meristem stop dividing at once', 'its root stops lengthening at once'],
  sol: 'D is the region of maturation with root hairs, the main absorbing surface — option (@K).',
  d: 3, c: 'analysis', t: [1],
  assets: [tipFig],
}));
add('tapfib-mcq', mcq({
  stem: 'A farmer pulls up a young cereal plant and finds a dense bunch of thin roots of nearly equal thickness arising from the base of the stem, with no main root. This is a',
  right: 'fibrous root system, typical of monocots',
  wrong: ['tap root system, typical of dicots', 'system of adventitious prop roots', 'system of pneumatophores'],
  sol: 'Many thin roots from the stem base with no primary root form a fibrous system — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('adventi-mcq', mcq({
  stem: 'Thin roots grow from the nodes of a creeping grass stem touching the soil. These roots are',
  right: 'adventitious, because they do not arise from the radicle',
  wrong: ['tap roots, because they grow downward', 'lateral roots of the radicle', 'pneumatophores, because they grow in moist soil'],
  sol: 'Roots arising from a stem are adventitious — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('ck-rootmod-mcq', mcq({
  stem: 'Which root modification is shown by a carrot?',
  right: 'Conical',
  wrong: ['Fusiform', 'Napiform', 'Tuberous'],
  sol: 'A carrot is broad at the top and tapers gradually: conical — option (@K).',
  d: 1, c: 'recall', t: [1],
}), () => rootMod('carrot') === 'conical' || 'mod');
add('beet-mcq', mcq({
  stem: 'A storage root is almost spherical in its upper part and tapers abruptly below, like a turnip. Its type is',
  right: 'napiform',
  wrong: ['fusiform', 'conical', 'tuberous'],
  sol: 'A nearly round root with an abrupt taper is napiform — option (@K).',
  d: 2, c: 'application', t: [1],
}), () => rootMod('turnip') === 'napiform' || 'mod');
add('stilt-mcq', mcq({
  stem: 'Sugarcane stalks lean in strong winds yet stay upright, held by roots that arise from the lowest nodes and slope into the soil. These are',
  right: 'stilt roots',
  wrong: ['prop roots from branches', 'pneumatophores', 'napiform roots'],
  sol: 'Roots from the lower nodes of the stem that give support are stilt roots — option (@K).',
  d: 2, c: 'application', t: [1],
}), () => rootMod('sugarcane') === 'stilt root' || 'mod');
add('pneumato-mcq', mcq({
  stem: 'Spike-like roots rise vertically above the soil around mangrove trees on a tidal mud flat. They',
  right: 'take in air for respiration through pores',
  wrong: ['store starch for the dry season', 'support the horizontal branches', 'absorb nitrogen from insects'],
  sol: 'Pneumatophores are breathing roots of swamp plants — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('tip-num', num({
  stem: `A young root is ${TIP.total} mm long. Its cap measures ${TIP.cap} mm, the meristematic region ${TIP.meristem} mm and the region of elongation ${TIP.elongation} mm. What is the length, in mm, of the region of maturation?`,
  value: TIP_MATURE, unit: 'mm',
  sol: `${TIP.total} − ${TIP.cap} − ${TIP.meristem} − ${TIP.elongation} = ${TIP_MATURE} mm.`,
  scheme: [[`${TIP_MATURE}`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === 31 || 'value');
add('growth-num', num({
  stem: `A root lengthens by ${GROWTH.perDay} mm every day. By how many millimetres will it have lengthened in ${GROWTH.days} days?`,
  value: GROWTH_WEEK, unit: 'mm',
  sol: `${GROWTH.perDay} × ${GROWTH.days} = ${GROWTH_WEEK} mm.`,
  scheme: [[`${GROWTH_WEEK}`, 1]],
  d: 1, c: 'application', t: [1],
}), (q) => q.answer.value === 21 || 'value');
add('pneumato-num', num({
  stem: `A mangrove plot of ${MANGROVE.area} square metres has ${MANGROVE.perM2} pneumatophores in every square metre. How many pneumatophores does the plot have?`,
  value: PNEUMATOPHORES,
  sol: `${MANGROVE.area} × ${MANGROVE.perM2} = ${PNEUMATOPHORES}.`,
  scheme: [[`${PNEUMATOPHORES}`, 1]],
  d: 1, c: 'application', t: [1],
}), (q) => q.answer.value === 180 || 'value');
add('ar-pneumato', ar({
  a: 'Pneumatophores are found in mangrove plants growing in tidal mud.',
  r: 'The waterlogged mud has very little oxygen, so the roots must reach air above the surface.',
  key: 'a',
  sol: 'Both are true and R explains A — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('cap-short1', short({
  marks: 1,
  stem: 'Give a reason: The tip of a growing root is covered by a root cap.',
  model: 'The cap **protects the delicate meristem** from damage as the root pushes through soil.',
  sol: 'Protection of the tip.',
  scheme: [['Protects the tip', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('fibrous-short1', short({
  marks: 1,
  stem: 'Give a reason: A lawn of fibrous-rooted grass prevents soil erosion.',
  model: 'The **dense mat of fibrous roots** binds the soil particles together near the surface.',
  sol: 'Roots bind soil.',
  scheme: [['Dense mat of roots binds the soil', 1]],
  d: 2, c: 'application', t: [1],
}));
add('root-regions-short2', short({
  marks: 2,
  stem: 'State the function of (i) the root cap and (ii) the region of maturation of a root.',
  model: '(i) The **root cap** protects the soft **growing tip** as the root pushes through the soil. (ii) In the **region of maturation** cells differentiate, and the **root hairs** formed here **absorb water and minerals** from the soil.',
  sol: 'Two functions.',
  scheme: [['Root cap protects the tip', 1], ['Maturation region with root hairs absorbs water', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('adventi-short2', short({
  marks: 2,
  stem: 'What are adventitious roots? Give two examples of such roots from different plants.',
  model: '**Adventitious roots** arise from parts of the plant **other than the radicle**, such as the stem or a leaf. Examples are the **prop roots of banyan** and the **roots of grass** growing from the nodes (or the roots from the leaf of *Bryophyllum*).',
  sol: 'Definition and two examples.',
  scheme: [['Definition', 1], ['Two examples', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('pneumato-short2', short({
  marks: 2,
  stem: 'Explain why mangrove trees growing in tidal mud develop pneumatophores.',
  model: 'The **waterlogged mud** contains **very little oxygen**, so ordinary roots cannot respire. **Pneumatophores** grow **upward above the mud** and have **pores** through which **air enters** and reaches the roots.',
  sol: 'Little oxygen; pores for air.',
  scheme: [['Waterlogged mud has little oxygen', 1], ['Pneumatophores take in air through pores', 1]],
  d: 2, c: 'application', t: [1],
}));
add('rootmod-short3', short({
  marks: 3,
  stem: 'Name three kinds of storage roots, giving one plant for each and the shape that identifies it.',
  model: '1. **Fusiform**: **radish**, swollen in the middle and tapering at both ends.\n2. **Conical**: **carrot**, broad at the top and tapering gradually towards the base.\n3. **Napiform**: **turnip**, nearly spherical at the top and tapering abruptly below. (Sweet potato is **tuberous**, with no definite shape.)',
  sol: 'Three types with plants and shapes.',
  scheme: [['Fusiform with radish and shape', 1], ['Conical with carrot and shape', 1], ['Napiform with turnip and shape', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('roothair-short3', short({
  marks: 3,
  stem: 'A gardener lifts a seedling from a nursery bed with a tight pull and replants it. It wilts for several days and then recovers. Explain what was damaged and how it recovered.',
  model: 'The pull tore off many **root hairs** of the **region of maturation**, which **absorb water and minerals**, so the plant **wilted**. The **meristematic region** continued to divide and the cells in the **region of elongation** lengthened, so the root grew and produced **new root hairs**, and the plant recovered.',
  sol: 'Root hairs lost; new growth.',
  scheme: [['Root hairs absorb water, and were lost', 1], ['Meristem and elongation regions continued growth', 1], ['New root hairs restored absorption', 1]],
  d: 3, c: 'analysis', t: [1],
}));
add('tip-long', long({
  stem: '(a) Draw a labelled diagram of a young root tip showing the four regions. [3]\n(b) State one function of each of the root cap and the region of elongation. [2]',
  model: '(a) A vertical root tip with, from the apex upward, the **root cap**, the region of **meristematic activity**, the region of **elongation** and the region of **maturation** bearing **root hairs**; each region is labelled.\n\n(b) The **root cap** protects the delicate tip as it pushes through the soil. In the **region of elongation** cells increase in length, which makes the root grow longer.',
  sol: 'Diagram; two functions.',
  scheme: [['(a) Four regions drawn in order', 2], ['(a) Four labels incl. root hairs', 1], ['(b) Root cap', 1], ['(b) Elongation', 1]],
  wl: [50, 150],
  d: 2, c: 'application', t: [1],
}));
add('rootmod-long', long({
  stem: '(a) Tabulate four modifications of roots for storage, with one plant each. [2]\n(b) Name the modified root for respiration and the plants that bear it. [1]\n(c) Name two kinds of supporting roots and give a plant for each. [2]',
  model: '(a) | Modification | Plant |\n|---|---|\n| Fusiform | Radish |\n| Conical | Carrot |\n| Napiform | Turnip (or beet) |\n| Tuberous | Sweet potato |\n\n(b) **Pneumatophores** of mangrove plants (*Rhizophora*).\n\n(c) **Prop roots** from branches, as in the **banyan**; **stilt roots** from the lower nodes, as in **maize** or **sugarcane**.',
  sol: 'Table; pneumatophores; prop and stilt roots.',
  scheme: [['(a) Four correct pairs (two marks for four, one for two or three)', 2], ['(b) Pneumatophores with a plant', 1], ['(c) Two kinds with plants', 2]],
  wl: [40, 150],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 stems
add('potato-mcq', mcq({
  stem: 'Which observation shows that a potato tuber is a stem and not a root?',
  right: 'It has scars of scale leaves with buds (eyes) in their axils',
  wrong: ['It is underground', 'It stores starch', 'It is swollen'],
  sol: 'Nodes with axillary buds mark a stem; roots have none — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('sweet-mcq', mcq({
  stem: 'A student examines a sweet potato and finds no nodes, no internodes and no axillary buds. She concludes that it is',
  right: 'a tuberous root',
  wrong: ['a stem tuber', 'a rhizome', 'a corm'],
  sol: 'Without nodes and buds it is a root, a tuberous storage root — option (@K).',
  d: 2, c: 'application', t: [2],
}), () => stemPos('potato') === 'underground' || 'pos');
add('rhizome-mcq', mcq({
  stem: 'A horizontal, thick underground stem with distinct nodes, scale leaves and buds is used as a spice. It is a',
  right: 'rhizome, as in ginger',
  wrong: ['tuber, as in potato', 'corm, as in colocasia', 'runner, as in grass'],
  sol: 'A horizontal underground stem with nodes and scale leaves is a rhizome — option (@K).',
  d: 2, c: 'application', t: [2],
}), () => stemMod('ginger') === 'rhizome' || 'mod');
add('colocasia-mcq', mcq({
  stem: 'A short, thick, vertical underground stem with rings of scale leaves is eaten as a vegetable. It is a',
  right: 'corm',
  wrong: ['rhizome', 'tuber', 'sucker'],
  sol: 'A vertical, swollen underground stem as in colocasia is a corm — option (@K).',
  d: 2, c: 'application', t: [2],
}), () => stemMod('colocasia') === 'corm' || 'mod');
add('runner-mcq', mcq({
  stem: 'A lawn grass spreads by a slender stem that creeps along the soil surface and roots at its nodes. This is a',
  right: 'runner, a sub-aerial stem',
  wrong: ['tendril, an aerial stem', 'rhizome, an underground stem', 'thorn, an aerial stem'],
  sol: 'A creeping stem that roots at the nodes is a sub-aerial runner — option (@K).',
  d: 1, c: 'application', t: [2],
}), () => stemMod('grass (Cynodon)') === 'runner' && stemPos('grass (Cynodon)') === 'sub-aerial' || 'mod');
add('phyllo-mcq', mcq({
  stem: 'In Opuntia the flat, green, fleshy pad bears small spines and does the work of photosynthesis. The pad is',
  right: 'a phylloclade, a modified stem',
  wrong: ['a modified leaf', 'a modified root', 'a compound leaf'],
  sol: 'A flattened green stem is a phylloclade; the spines are the modified leaves — option (@K).',
  d: 2, c: 'application', t: [2, 4],
}));
add('thorn-mcq', mcq({
  stem: 'A hard, pointed thorn on a lemon plant arises in the axil of a leaf. It is',
  right: 'a modified axillary bud, so it is a stem modification',
  wrong: ['a modified leaf, so it is a spine', 'a modified root', 'a stipule'],
  sol: 'A structure arising from an axillary bud is a stem modification: a thorn — option (@K).',
  d: 3, c: 'analysis', t: [2],
}), () => stemMod('citrus') === 'thorn' || 'mod');
add('tendril-mcq', mcq({
  stem: 'A grapevine climbs a trellis by slender coiled structures that arise opposite a leaf. Because they arise from a bud on the stem they are',
  right: 'stem tendrils',
  wrong: ['leaf tendrils', 'prop roots', 'stolons'],
  sol: 'These tendrils arise from axillary buds and are modified stems — option (@K).',
  d: 3, c: 'application', t: [2],
}), () => stemMod('grapevine') === 'tendril' || 'mod');
add('ck-runner-num', num({
  stem: `How many nodes does a runner of ${RUNNER.length_cm} cm have if there is a node every ${RUNNER.spacing_cm} cm?`,
  value: RUNNER_NODES,
  sol: `${RUNNER.length_cm} ÷ ${RUNNER.spacing_cm} = ${RUNNER_NODES}.`,
  scheme: [[`${RUNNER_NODES}`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => q.answer.value === 25 || 'value');
add('potato-eyes-num', num({
  stem: `A basket holds ${POTATO.tubers} potato tubers with ${POTATO.eyes} eyes on each. How many axillary buds are there in all?`,
  value: POTATO_EYES,
  sol: `Each eye is an axillary bud: ${POTATO.tubers} × ${POTATO.eyes} = ${POTATO_EYES}.`,
  scheme: [[`${POTATO_EYES}`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => q.answer.value === 40 || 'value');
add('ar-potato', ar({
  a: 'The potato is a modified stem.',
  r: 'The potato tuber is rich in starch.',
  key: 'b',
  sol: 'Both are true, but storing starch does not show that it is a stem; the nodes and buds do — option (b).',
  d: 2, c: 'understanding', t: [2],
}));
add('stem-fill', fill({
  stem: 'The point on a stem from which a leaf arises is called the ______.',
  acc: [['node', 'Node']],
  sol: 'The stem is divided into nodes and internodes: the answer is node.',
  d: 1, c: 'recall', t: [2],
}));
add('tuber-short2', short({
  marks: 2,
  stem: 'Distinguish a tuber from a rhizome with an example of each.',
  model: 'A **tuber** is a **swollen, rounded** underground stem with **eyes** on the surface, as in **potato**. A **rhizome** is a **horizontal, elongated** underground stem with distinct **nodes and scale leaves**, as in **ginger**.',
  sol: 'Two contrasts with examples.',
  scheme: [['Tuber described with example', 1], ['Rhizome described with example', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('sucker-short2', short({
  marks: 2,
  stem: 'How does a sucker differ from a runner? Give a plant for each.',
  model: 'A **runner** grows **horizontally along the soil surface** and roots at its nodes, as in **grass**. A **sucker** arises from a **lateral underground node**, grows obliquely upward and gives a new plant, as in **mint**.',
  sol: 'Runner vs sucker.',
  scheme: [['Runner with plant', 1], ['Sucker with plant', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('phyllo-short2', short({
  marks: 2,
  stem: 'Why is the green, flat part of Opuntia a stem and not a leaf? State one function it performs.',
  model: 'It bears **nodes with buds and spines** (the real leaves are modified into **spines**), so it is a **stem**, a **phylloclade**. It carries out **photosynthesis** because the true leaves are reduced, and it also **stores water**.',
  sol: 'Nodes and buds; photosynthesis.',
  scheme: [['Has nodes and buds, leaves are spines', 1], ['Photosynthesis or water storage', 1]],
  d: 3, c: 'application', t: [2, 4],
}));
add('stemmod-short3', short({
  marks: 3,
  stem: 'Name three underground stem modifications, giving a plant and a function for each.',
  model: '1. **Tuber**: **potato**, a swollen underground stem that stores food and propagates through its eyes, which are axillary buds.\n2. **Rhizome**: **ginger** or turmeric, a horizontal stem with nodes and scale leaves that stores food and helps the plant to survive an unfavourable season (perennation).\n3. **Corm**: **colocasia**, a short, thick, vertical stem with scale leaves that stores food.',
  sol: 'Three modifications with plants and functions.',
  scheme: [['Tuber with plant and function', 1], ['Rhizome with plant and function', 1], ['Corm with plant and function', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('subaerial-short3', short({
  marks: 3,
  stem: 'Name three sub-aerial stem modifications and state their common function.',
  model: '**Runner** (grass), **stolon** (strawberry) and **sucker** (mint), and also **offset** (water hyacinth), are **sub-aerial stems**. They lie along or just below the soil surface and their common function is **vegetative propagation**: their nodes root and give rise to new plants, so that a single plant can spread quickly over a wide area without seeds.',
  sol: 'Three examples and function.',
  scheme: [['Runner with plant', 1], ['Stolon, sucker or offset with plant', 1], ['Vegetative propagation', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('stem-vs-root-short3', short({
  marks: 3,
  stem: 'A student is given a potato and a sweet potato and asked which is a stem. Give three observations that settle the question.',
  model: 'The **potato** has **eyes**, which are **axillary buds** on nodes with scale-leaf scars, and a terminal bud; it is a **stem**. The **sweet potato** has **no nodes, internodes or buds**, so it is a **root**. Only the potato sprouts shoots from the regular buds, and the sweet potato forms adventitious shoots.',
  sol: 'Nodes and buds.',
  scheme: [['Potato has eyes (axillary buds)', 1], ['Sweet potato has no nodes or buds', 1], ['Conclusion with sprouting', 1]],
  d: 3, c: 'application', t: [2],
}));
add('stem-long', long({
  stem: '(a) Tabulate three underground stem modifications with a plant and a function for each. [3]\n(b) Name one sub-aerial stem modification and state what it does. [1]\n(c) Name one aerial modification and its function. [1]',
  model: '(a) | Modification | Plant | Function |\n|---|---|---|\n| Tuber | Potato | Storage and propagation |\n| Rhizome | Ginger | Storage and perennation |\n| Corm | Colocasia | Storage |\n\n(b) A **runner** (grass) creeps over the soil and **roots at the nodes**, giving new plants by vegetative propagation.\n\n(c) A **tendril** (grapevine) is for **climbing**; a **thorn** (*Citrus*) is for **protection**; a **phylloclade** (*Opuntia*) carries out **photosynthesis**.',
  sol: 'Table; runner; aerial modification.',
  scheme: [['(a) Tuber row', 1], ['(a) Rhizome row', 1], ['(a) Corm row', 1], ['(b) Runner and function', 1], ['(c) Aerial modification and function', 1]],
  wl: [40, 150],
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 leaves
add('leaf-fig-mcq', mcq({
  stem: 'In the figure of a leaf, which letter marks the petiole?',
  right: 'C',
  wrong: ['A', 'B', 'D'],
  sol: 'C is the stalk that joins the lamina to the stem — option (@K).',
  d: 1, c: 'application', t: [3],
  assets: [leafFig],
}));
add('leaf-fig2-mcq', mcq({
  stem: 'In the same figure, the paired outgrowths marked E at the leaf base are',
  right: 'stipules, found in many dicot leaves',
  wrong: ['leaflets of a compound leaf', 'tendrils', 'a sheath, as in grasses'],
  sol: 'The two small lateral outgrowths of the leaf base are stipules — option (@K).',
  d: 2, c: 'application', t: [3],
  assets: [leafFig],
}));
add('leaf-fig3-mcq', mcq({
  stem: 'In the same figure the region marked D is the leaf base. In a grass leaf this part',
  right: 'forms a sheath round the stem',
  wrong: ['forms a pair of stipules only', 'is modified into a tendril', 'is absent'],
  sol: 'In monocots the leaf base expands into a sheath that clasps the stem — option (@K).',
  d: 2, c: 'understanding', t: [3],
  assets: [leafFig],
}));
add('venation-mcq', mcq({
  stem: 'A botanist finds a leaf whose blade is narrow, with many veins running side by side from the base to the tip. Its venation and the likely group of plant are',
  right: 'parallel, in a monocot',
  wrong: ['reticulate, in a monocot', 'parallel, in a dicot', 'reticulate, in a dicot'],
  sol: 'Parallel venation is typical of monocots — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('compound-mcq', mcq({
  stem: 'A student wants to know whether a feather-like structure on a tree is one compound leaf or a branch of simple leaves. The best test is to look for',
  right: 'a bud in the axil of the main axis and the absence of a terminal bud on it',
  wrong: ['the number of leaflets', 'the colour of the blade', 'the length of the petiole'],
  sol: 'A compound leaf has a bud only in the axil of its petiole, and no terminal bud on the rachis — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('whorl-mcq', mcq({
  stem: 'Alstonia has several leaves arising together at each node and spreading around the stem. Its phyllotaxy is',
  right: 'whorled',
  wrong: ['alternate', 'opposite', 'spiral with one leaf per node'],
  sol: 'More than two leaves at a node make a whorl — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('ck-phyllo-mcq', mcq({
  stem: 'On a twig of China rose one leaf arises at each node, and successive leaves lie on alternate sides. What is its phyllotaxy?',
  right: 'Alternate',
  wrong: ['Opposite', 'Whorled', 'Compound'],
  sol: 'One leaf per node on alternate sides is alternate phyllotaxy — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('ck-leaflets-num', num({
  stem: 'How many leaflets does a pinnate compound leaf have if it bears 4 pairs of leaflets and a terminal leaflet?',
  value: pinnateLeaflets(4),
  sol: `4 × 2 + 1 = ${pinnateLeaflets(4)}.`,
  scheme: [[`${pinnateLeaflets(4)}`, 1]],
  d: 1, c: 'application', t: [3],
}), (q) => q.answer.value === 9 || 'value');
add('leaflet-num', num({
  stem: `A neem leaf has ${LEAFLETS_NEEM / 2} pairs of leaflets and no terminal leaflet. How many leaflets does it have?`,
  value: LEAFLETS_NEEM,
  sol: `${LEAFLETS_NEEM / 2} × 2 = ${LEAFLETS_NEEM}.`,
  scheme: [[`${LEAFLETS_NEEM}`, 1]],
  d: 1, c: 'application', t: [3],
}), (q) => q.answer.value === 18 || 'value');
add('palmate-num', num({
  stem: `A twig bears 6 palmate compound leaves of ${PALMATE} leaflets each. How many leaflets does the twig carry?`,
  value: LEAFLETS_COMPOUND_TWIG,
  sol: `6 × ${PALMATE} = ${LEAFLETS_COMPOUND_TWIG}.`,
  scheme: [[`${LEAFLETS_COMPOUND_TWIG}`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => q.answer.value === 30 || 'value');
add('whorl-num', num({
  stem: `A whorled twig has 5 nodes and ${LEAVES_PER_NODE.whorled} leaves at each node. How many leaves does the twig bear?`,
  value: LEAF_WHORL,
  sol: `5 × ${LEAVES_PER_NODE.whorled} = ${LEAF_WHORL}.`,
  scheme: [[`${LEAF_WHORL}`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => q.answer.value === 30 && leaves('whorled', 5) === 30 || 'value');
add('mix-num', num({
  stem: 'A shoot has 6 nodes with opposite leaves and 4 nodes with whorls of 6 leaves. Each opposite leaf is a pinnate compound leaf of 3 pairs of leaflets and a terminal leaflet; each whorled leaf is simple. How many separate blades (leaflets and simple blades) does the shoot carry?',
  value: MIX_TOTAL,
  sol: `Opposite leaves: 6 × 2 = 12, each with ${LEAFLETS_ROSE} leaflets: 12 × ${LEAFLETS_ROSE} = ${MIX_LEAFLETS}. Whorled simple leaves: 4 × 6 = ${leaves('whorled', 4)}. Total = ${MIX_LEAFLETS} + ${leaves('whorled', 4)} = ${MIX_TOTAL}.`,
  scheme: [[`${MIX_TOTAL}`, 1]],
  d: 4, c: 'analysis', t: [3],
}), (q) => q.answer.value === 108 || 'value');
add('leaf-tf', tf({
  stem: 'Each leaflet of a pinnate compound leaf bears a bud in its axil.',
  key: 'f',
  sol: 'False. A bud is present in the axil of the compound leaf (at the base of its petiole) but not in the axils of the leaflets.',
  d: 2, c: 'understanding', t: [3],
}));
add('leaf-fill', fill({
  stem: 'The stalk that joins the lamina of a leaf to the stem is called the ______.',
  acc: [['petiole', 'Petiole']],
  sol: 'The answer is the petiole.',
  d: 1, c: 'recall', t: [3],
}));
add('venation-short2', short({
  marks: 2,
  stem: 'Distinguish reticulate venation from parallel venation, naming the plant group in which each is typical.',
  model: 'In **reticulate venation** the veins form a **network** and the midrib gives branching veins; it is typical of **dicots**. In **parallel venation** the veins run **side by side** from base to tip; it is typical of **monocots**.',
  sol: 'Two types with groups.',
  scheme: [['Reticulate: network, dicots', 1], ['Parallel: side by side, monocots', 1]],
  d: 1, c: 'understanding', t: [3],
}));
add('stipule-short2', short({
  marks: 2,
  stem: 'What are stipules? How does the leaf base of a grass differ from that of a dicot leaf?',
  model: '**Stipules** are small **lateral outgrowths of the leaf base**, found in many dicot leaves. The leaf base of a **grass** expands into a **sheath** that clasps the stem, whereas in many dicots it is small and bears stipules.',
  sol: 'Stipules and sheath.',
  scheme: [['Stipules defined', 1], ['Sheath in grasses', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('compound-short2', short({
  marks: 2,
  stem: 'State two points that distinguish a pinnate compound leaf from a branch bearing simple leaves.',
  model: 'A **compound leaf** has a **bud only in the axil of its petiole** and **no terminal bud** on its rachis, and the **leaflets have no buds** in their axils. A **branch** has a **terminal bud** and a **bud in the axil of every leaf**.',
  sol: 'Terminal bud and axillary buds.',
  scheme: [['Terminal bud absent vs present', 1], ['Axillary buds in leaflets absent vs in leaves present', 1]],
  d: 2, c: 'application', t: [3],
}));
add('leafparts-short3', short({
  marks: 3,
  stem: 'Name the three parts of a typical dicot leaf and state one function of each.',
  model: 'The **leaf base** attaches the leaf to the stem and may bear **stipules**. The **petiole** holds the **lamina** to the light and lets it move. The **lamina** (blade) is the flat green part that carries out **photosynthesis** and has a **midrib** and **veins** that conduct water and food.',
  sol: 'Three parts and functions.',
  scheme: [['Leaf base', 1], ['Petiole', 1], ['Lamina', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('phyllotaxy-short3', short({
  marks: 3,
  stem: 'Define phyllotaxy and describe its three types, giving one plant for each.',
  model: '**Phyllotaxy** is the **arrangement of leaves on a stem**. In **alternate** phyllotaxy one leaf arises at each node (China rose, mustard); in **opposite** phyllotaxy two leaves arise at each node (*Calotropis*, guava); in **whorled** phyllotaxy more than two leaves arise at a node (*Alstonia*).',
  sol: 'Definition and three types.',
  scheme: [['Definition', 1], ['Alternate and opposite with plants', 1], ['Whorled with plant', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('compound-short3', short({
  marks: 3,
  stem: 'Distinguish a pinnate compound leaf from a palmate compound leaf, naming one plant for each, and say how a compound leaf differs from a branch.',
  model: 'In a **pinnate** compound leaf the leaflets lie along a common axis, the **rachis** (neem). In a **palmate** compound leaf they all arise from the **tip of the petiole** (silk cotton). A compound leaf has an **axillary bud at its base** and **no terminal bud**, whereas a **branch** has a terminal bud and buds in the axils of its leaves.',
  sol: 'Pinnate vs palmate; compound leaf vs branch.',
  scheme: [['Pinnate with rachis and plant', 1], ['Palmate with plant', 1], ['Bud test', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('leaf-long', long({
  stem: '(a) Draw a labelled diagram of a simple dicot leaf attached to a stem, naming the leaf base, petiole, lamina, midrib and stipules. [3]\n(b) What type of venation does it show? [1]\n(c) Name one feature by which a compound leaf is told from a branch. [1]',
  model: '(a) A **stem** with a node; the **leaf base** with a pair of **stipules**, the **petiole**, and the **lamina** with its **midrib** and veins, all labelled.\n\n(b) **Reticulate** venation, as is typical of dicots.\n\n(c) A compound leaf has **no terminal bud** on its rachis and **no buds in the axils of its leaflets**.',
  sol: 'Diagram; reticulate; bud test.',
  scheme: [['(a) Leaf drawn on the stem', 1], ['(a) Five parts labelled', 2], ['(b) Reticulate', 1], ['(c) Bud feature', 1]],
  wl: [50, 150],
  d: 2, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 leaf modifications
add('bryo-mcq', mcq({
  stem: 'Tiny plantlets form in the notches of the fleshy leaves of a house plant and fall off to grow into new plants. This is an example of leaf modification for',
  right: 'reproduction, as in Bryophyllum',
  wrong: ['storage, as in onion', 'support, as in pea', 'protection, as in Opuntia'],
  sol: 'Adventitious buds on the leaf margin of Bryophyllum give new plants — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('onion-mcq', mcq({
  stem: 'A cut onion bulb shows concentric, fleshy, colourless layers around a small, flat stem at the base. The layers are',
  right: 'fleshy scale leaves that store food',
  wrong: ['scale leaves that capture insects', 'modified roots that store water', 'tendrils that support the plant'],
  sol: 'The layers of a bulb are fleshy scale leaves storing food — option (@K).',
  d: 1, c: 'application', t: [4],
}));
add('pitcher-mcq', mcq({
  stem: 'A pitcher plant grows on soil that is very poor in nitrogen. Its pitcher is a modified',
  right: 'leaf blade, which traps insects to obtain nitrogen',
  wrong: ['stem, which stores nitrogen', 'root, which absorbs insects', 'stipule, which makes food'],
  sol: 'The pitcher of Nepenthes is a modified leaf that traps and digests insects for nitrogen — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('flytrap-mcq', mcq({
  stem: 'The Venus flytrap snaps its two lobes shut when an insect touches its trigger hairs. These lobes are',
  right: 'the two halves of a modified leaf blade',
  wrong: ['two modified stipules', 'two modified stems', 'two modified roots'],
  sol: 'The hinged trap of Dionaea is a modified leaf blade — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('pea-mcq', mcq({
  stem: 'In a garden pea the upper leaflets are coiled and cling to a support. These coils are',
  right: 'leaf tendrils, modified leaflets for climbing',
  wrong: ['stem tendrils from axillary buds', 'stilt roots', 'thorns'],
  sol: 'Modified leaflets that coil for support are leaf tendrils — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('ck-pitcher-num', num({
  stem: `${PITCHER.pitchers} pitchers each trap ${PITCHER.insectsPerWeek} insects a week. How many insects do they trap in ${PITCHER.weeks} weeks?`,
  value: PITCHER_INSECTS,
  sol: `${PITCHER.pitchers} × ${PITCHER.insectsPerWeek} × ${PITCHER.weeks} = ${PITCHER_INSECTS}.`,
  scheme: [[`${PITCHER_INSECTS}`, 1]],
  d: 2, c: 'application', t: [4],
}), (q) => q.answer.value === 336 || 'value');
add('bryo-num', num({
  stem: `${BRYO.leaves} Bryophyllum leaves each bear ${BRYO.plantlets} plantlets in their notches. How many plantlets are there?`,
  value: BRYO_PLANTLETS,
  sol: `${BRYO.leaves} × ${BRYO.plantlets} = ${BRYO_PLANTLETS}.`,
  scheme: [[`${BRYO_PLANTLETS}`, 1]],
  d: 1, c: 'application', t: [4],
}), (q) => q.answer.value === 36 || 'value');
add('onion-num', num({
  stem: `Each onion bulb has ${ONION.scaleLeaves} fleshy scale leaves. How many scale leaves are there in ${ONION.bulbs} bulbs?`,
  value: ONION_SCALES,
  sol: `${ONION.scaleLeaves} × ${ONION.bulbs} = ${ONION_SCALES}.`,
  scheme: [[`${ONION_SCALES}`, 1]],
  d: 1, c: 'application', t: [4],
}), (q) => q.answer.value === 96 || 'value');
add('ar-tendril', ar({
  a: 'The tendrils of a pea plant are modified leaflets.',
  r: 'Tendrils of all plants are modified roots.',
  key: 'c',
  sol: 'A is true. R is false: tendrils may be modified leaves, leaflets or stems, but not roots — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('ar-insect', ar({
  a: 'Insectivorous plants cannot make their own food.',
  r: 'They trap insects because their soil is rich in nitrogen.',
  key: 'd',
  sol: 'Both are false: they photosynthesise and trap insects because the soil is poor in nitrogen — option (d).',
  d: 2, c: 'understanding', t: [4],
}));
add('trap-short1', short({
  marks: 1,
  stem: 'Give a reason: Pitcher plants grow in marshy soil and still trap insects.',
  model: 'The soil is **poor in nitrogen**, and the insects supply **nitrogen compounds**.',
  sol: 'Nitrogen from insects.',
  scheme: [['Nitrogen supply from insects', 1]],
  d: 2, c: 'application', t: [4],
}));
add('bryo-short2', short({
  marks: 2,
  stem: 'How does Bryophyllum reproduce from its leaves? Name the type of leaf modification.',
  model: 'In **Bryophyllum** **adventitious buds** form in the **notches of the leaf margin**. They develop into **small plantlets**, which fall to the soil and grow into new plants. This is a leaf modification for **reproduction**.',
  sol: 'Buds in notches; reproduction.',
  scheme: [['Plantlets from buds in the notches', 1], ['Leaf modified for reproduction', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('tendril-short2', short({
  marks: 2,
  stem: 'A leaf tendril and a stem tendril both help in climbing. How can you tell them apart?',
  model: 'A **stem tendril** arises from an **axillary bud** (as in grapevine), so it occupies the position of a branch. A **leaf tendril** is a **modified leaf or leaflet** (as in pea) and has **no axillary bud of its own**; it arises from the leaf itself.',
  sol: 'Origin.',
  scheme: [['Stem tendril from axillary bud', 1], ['Leaf tendril is a leaf or leaflet, no bud', 1]],
  d: 3, c: 'analysis', t: [2, 4],
}));
add('leafmod-short3', short({
  marks: 3,
  stem: 'Give three modifications of leaves with a function and a plant for each.',
  model: '1. **Tendrils** for **support** and climbing, as in the **pea**.\n2. **Spines** for **protection** (and less water loss), as in **Opuntia**.\n3. **Fleshy scale leaves** for **storage** of food and water, as in the **onion bulb**. (Buds on the margin of *Bryophyllum* serve for reproduction.)',
  sol: 'Three modifications with function and plant.',
  scheme: [['Tendrils with function and plant', 1], ['Spines with function and plant', 1], ['Fleshy leaves with function and plant', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('insect-short3', short({
  marks: 3,
  stem: 'Why do some green plants trap insects? Describe how a pitcher plant or a Venus flytrap does so.',
  model: 'They grow on soils **poor in nitrogen** and use insects as a source of **nitrogen**. In the **pitcher plant** the **leaf blade forms a pitcher with a lid** and digestive fluid into which insects slip and are **digested**. In the **Venus flytrap** the **two lobes of the blade** **snap shut** when **trigger hairs** are touched.',
  sol: 'Nitrogen; trap.',
  scheme: [['Nitrogen-poor soil', 1], ['Pitcher or flytrap structure', 1], ['Digestion or closing mechanism', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('opuntia-short3', short({
  marks: 3,
  stem: 'In Opuntia the leaves are spines, but the plant is green and makes its own food. Explain how, with the name of the part involved.',
  model: 'The **leaves are reduced to spines**, which **protect** the plant and lose little water. The **stem is flat, green and fleshy**, a **phylloclade**, which contains **chlorophyll** and carries out **photosynthesis**, and also **stores water** in the desert, where water is scarce and a large leaf surface would lose too much of it.',
  sol: 'Spines; phylloclade does photosynthesis.',
  scheme: [['Leaves are spines for protection', 1], ['Phylloclade is green and photosynthetic', 1], ['Water storage', 1]],
  d: 3, c: 'analysis', t: [2, 4],
}));
add('leafmod-long', long({
  stem: '(a) Name three leaf modifications for support, storage and reproduction, with a plant for each. [3]\n(b) What do insectivorous plants obtain from the insects they trap and why do they need it? [1]\n(c) Name two insectivorous plants. [1]',
  model: '(a) **Support:** leaf tendrils of **pea**. **Storage:** fleshy scale leaves of **onion**. **Reproduction:** buds in the notches of the leaf margin of **Bryophyllum**.\n\n(b) They obtain **nitrogen compounds**, needed because their soil is **poor in nitrogen**.\n\n(c) **Nepenthes** (pitcher plant) and **Dionaea** (Venus flytrap); also **Drosera** and **Utricularia**.',
  sol: 'Three modifications; nitrogen; two plants.',
  scheme: [['(a) Support with plant', 1], ['(a) Storage with plant', 1], ['(a) Reproduction with plant', 1], ['(b) Nitrogen', 1], ['(c) Two plants', 1]],
  wl: [40, 150],
  d: 2, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- case-based
add('garden-case', mk.case({
  passage: 'A student collected five plant parts from a kitchen garden.\n\n| Specimen | Observations |\n|---|---|\n| P | Thick, cone-shaped, orange, no nodes; leaves grow from its top |\n| Q | Underground, horizontal, jointed, with scale leaves and buds |\n| R | Green, flat, fleshy pad with small spines |\n| S | Coiled thread arising in a leaf axil of a climbing vine |\n| T | Several leaves around each node of a woody twig |',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which specimen is a root, and which type of root is it?',
      right: 'P, conical',
      wrong: ['Q, tuberous', 'R, fusiform', 'S, napiform'],
      sol: 'P has no nodes and a conical shape, like a carrot — option (@K).',
      d: 2, c: 'application', t: [1],
    }), []),
    part('b', mcq({
      stem: 'Which pair of specimens is stems?',
      right: 'Q and S',
      wrong: ['P and Q', 'P and T', 'R and T'],
      sol: 'Q is a rhizome and S, a tendril from an axillary position, is a stem tendril — option (@K).',
      d: 3, c: 'analysis', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Name the phyllotaxy of specimen T and give one plant that shows it.',
      model: 'T shows **whorled phyllotaxy**, with **more than two leaves at a node**, as in *Alstonia*.',
      sol: 'Whorled; Alstonia.',
      scheme: [['Whorled', 1], ['A plant', 1]],
      wl: [10, 40],
      d: 2, c: 'application', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'Name the plant part R and say what its spines are.',
        model: 'R is a **phylloclade**, a modified **stem**, and its **spines** are **modified leaves**, as in *Opuntia*.',
        sol: 'Phylloclade; leaf spines.',
        scheme: [['Phylloclade', 1], ['Spines are leaves', 1]],
        wl: [10, 40],
        d: 3, c: 'application', t: [2, 4],
      }),
    ]),
  ],
}));
void rootFn;
