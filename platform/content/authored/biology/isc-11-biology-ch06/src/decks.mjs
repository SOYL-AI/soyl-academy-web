// ISC 11 Biology ch06 Morphology of Root, Stem and Leaf — Part 1 (t01 roots, t02 stems), Part 2 (t03 leaves, t04 leaf modifications).
import { sl, deck, table, flow, svgV } from '../../isc-11-biology-ch01/src/lib.mjs';
import { ROOT_TIP_NAMED, ROOT_MODS, STEM_MODS, LEAF_NAMED, LEAF_TYPES, PHYLLOTAXY, LEAF_MODS } from './svgs.mjs';
import { TIP, TIP_MATURE, TIP_ELONG_PCT, GROWTH, GROWTH_WEEK, POTATO, POTATO_EYES, RUNNER, RUNNER_NODES, LEAF_ALT, LEAF_OPP, LEAF_WHORL, LEAVES_PER_NODE, LEAFLETS_NEEM, LEAFLETS_ROSE, LEAFLETS_COMPOUND_TWIG, PALMATE, BRYO, BRYO_PLANTLETS, PITCHER, PITCHER_INSECTS, ONION, ONION_SCALES } from './calc.mjs';

export const V = {
  tip: svgV(ROOT_TIP_NAMED, 'A young root tip with root cap, meristematic region, elongation region and maturation region with root hairs'),
  rootmods: svgV(ROOT_MODS, 'Fusiform, conical, napiform and tuberous storage roots; prop, stilt and pneumatophore roots'),
  stemmods: svgV(STEM_MODS, 'Tuber, rhizome, corm, runner, tendril and thorn'),
  leaf: svgV(LEAF_NAMED, 'A simple leaf with lamina, midrib, petiole, leaf base and stipules'),
  types: svgV(LEAF_TYPES, 'Reticulate and parallel venation, pinnate and palmate compound leaves'),
  phyllo: svgV(PHYLLOTAXY, 'Alternate, opposite and whorled phyllotaxy'),
  leafmods: svgV(LEAF_MODS, 'Leaf tendrils of pea, leaf spines, a pitcher and an onion bulb'),
};

export const deck1 = deck({
  part: 1,
  title: 'Morphology of Root, Stem and Leaf — Part 1: Roots and stems',
  goals: [
    'Distinguish tap, fibrous and adventitious roots and describe the regions of a root tip',
    'Identify root modifications for storage, respiration and support',
    'Classify the modifications of the stem and explain why a potato is a stem and a sweet potato a root',
  ],
  slides: [
    sl('title', 'Morphology of root, stem and leaf', {
      b: 'Part 1 — the organs below the soil and the axis that bears the leaves.',
      v: flow('LR', [['s', 'Seed'], ['r', 'Radicle: root system'], ['p', 'Plumule: shoot system'], ['l', 'Stem, branches, leaves']], [['s', 'r'], ['s', 'p'], ['p', 'l']], 'Flow from seed to the root system from the radicle and the shoot system from the plumule'),
      n: 'Morphology is the study of external form. A flowering plant has a root system that develops from the radicle of the seed, and a shoot system, from the plumule, made of the stem, branches and leaves. Both systems show many modifications that suit particular jobs.',
    }),
    sl('concept', 'Tap, fibrous and adventitious roots', {
      b: 'A **tap root** is the radicle growing on; a **fibrous root** system replaces the radicle with many thin roots; **adventitious** roots arise from parts of the plant other than the radicle.',
      v: table(['Root system', 'Origin', 'Found in', 'Example'], [['Tap root', 'Radicle persists as main root with lateral branches', 'Dicots', 'Mustard, gram'], ['Fibrous root', 'Radicle is short-lived; many roots from the base of the stem', 'Monocots', 'Wheat, rice'], ['Adventitious root', 'From stem, leaf or other parts', 'Both; often modified', 'Banyan prop roots, grass, Bryophyllum leaf']], 'Table of tap, fibrous and adventitious roots with their origin, occurrence and examples'),
      n: 'Dicot plants usually keep the main root, the tap root, with branches. In monocots the primary root soon dies and a mat of fibrous roots grows from the base of the stem. Adventitious roots come from other parts, such as the lower nodes of a stem.',
    }),
    sl('diagram', 'Regions of a root tip', {
      b: 'From the tip upward: **root cap**, region of **meristematic activity**, region of **elongation**, and region of **maturation** with **root hairs**.',
      v: V.tip,
      n: 'The root cap protects the delicate tip as it pushes through the soil. Cells just behind it divide rapidly. Further back they lengthen, which pushes the tip forward. In the oldest region the cells mature and some form root hairs that absorb water and minerals.',
    }),
    sl('example', 'Worked example 1: a root tip', {
      b: `A young root is ${TIP.total} millimetres long. The cap is ${TIP.cap} millimetre, the meristematic region ${TIP.meristem} millimetres and the elongation region ${TIP.elongation} millimetres. Find the length of the maturation region, the share taken by elongation, and the growth in a week at ${GROWTH.perDay} millimetres a day.`,
      ul: [
        `Maturation region: ${TIP.total} − ${TIP.cap} − ${TIP.meristem} − ${TIP.elongation} = **${TIP_MATURE}** millimetres.`,
        `Elongation share: ${TIP.elongation} ÷ ${TIP.total} × 100 = **${TIP_ELONG_PCT} percent**.`,
        `Growth in a week: ${GROWTH.perDay} × ${GROWTH.days} = **${GROWTH_WEEK}** millimetres.`,
      ],
      v: table(['Region', 'Length in millimetres'], [['Root cap', String(TIP.cap)], ['Meristematic', String(TIP.meristem)], ['Elongation', String(TIP.elongation)], ['Maturation (with root hairs)', String(TIP_MATURE)]], 'Worked table of the lengths of the regions of the root tip'),
      n: 'Subtract the three growing regions from the total to get the length of the maturation region. Elongation is only a small share of the root, yet it is where the root gains most of its length. Multiply the daily growth by seven to get the weekly growth.',
    }),
    sl('check', 'Quick check: root regions', {
      b: 'In which region of the root do root hairs appear?',
      n: 'Quick check. Think of where water is absorbed.',
      chk: 'ck-roottip-mcq',
    }),
    sl('diagram', 'Modified roots', {
      b: 'Roots modified for **storage** (fusiform, conical, napiform, tuberous), **support** (prop, stilt) and **respiration** (pneumatophores).',
      v: V.rootmods,
      n: 'Radish is spindle-shaped, carrot is cone-shaped and turnip is almost round. Sweet potato has no definite shape. Banyan prop roots and maize stilt roots hold the plant up, and the pneumatophores of mangroves take in air in muddy soil.',
    }),
    sl('concept', 'Root modifications and their jobs', {
      b: 'Match the shape to the plant and the job.',
      v: table(['Modification', 'Example', 'Function'], [['Fusiform', 'Radish', 'Storage'], ['Conical', 'Carrot', 'Storage'], ['Napiform', 'Turnip, beet', 'Storage'], ['Tuberous', 'Sweet potato', 'Storage'], ['Pneumatophore', 'Mangrove (Rhizophora)', 'Respiration in waterlogged soil'], ['Prop root', 'Banyan', 'Support of a spreading branch'], ['Stilt root', 'Maize, sugarcane', 'Support']], 'Table of root modifications with examples and functions'),
      n: 'Remember the pairs: radish is fusiform, carrot is conical, turnip is napiform and sweet potato is tuberous. Prop roots hang down from branches of the banyan, while stilt roots grow from the lower nodes of maize. Pneumatophores are breathing roots.',
    }),
    sl('check', 'Quick check: modifications', {
      b: 'Which root modification is shown by a carrot?',
      n: 'Quick check. Think of the shape of a cone.',
      chk: 'ck-rootmod-mcq',
    }),
    sl('concept', 'The stem: nodes, internodes and buds', {
      b: 'A stem has **nodes** that bear leaves and buds, **internodes** between them, and a **terminal bud** at the tip; each leaf has an **axillary bud** in its axil.',
      v: table(['Feature', 'Stem', 'Root'], [['Nodes and internodes', 'Present', 'Absent'], ['Buds', 'Terminal and axillary', 'Absent'], ['Leaves or scale leaves', 'Borne at nodes', 'Never borne'], ['Colour', 'Usually green when young', 'Not green'], ['Root cap', 'Absent', 'Present at the tip']], 'Table comparing a stem with a root'),
      n: 'These features tell a stem from a root. A stem has nodes where leaves or scale leaves arise, and buds in the axils. A root has none of these, but it has a cap at the tip. This is the key to the potato and the sweet potato puzzle.',
    }),
    sl('diagram', 'Modified stems', {
      b: '**Underground:** tuber, rhizome, corm. **Sub-aerial:** runner, sucker, stolon, offset. **Aerial:** tendril, thorn, phylloclade.',
      v: V.stemmods,
      n: 'A potato tuber is a swollen underground stem with eyes, which are buds. A ginger rhizome has nodes and scale leaves. A runner creeps over the ground and roots at each node. A tendril helps a plant to climb, and a thorn gives protection.',
    }),
    sl('concept', 'Stem modifications compared', {
      b: 'Position, example and function.',
      v: table(['Position', 'Modification', 'Example', 'Function'], [['Underground', 'Tuber', 'Potato', 'Storage and propagation'], ['Underground', 'Rhizome', 'Ginger, turmeric', 'Storage and perennation'], ['Underground', 'Corm', 'Colocasia', 'Storage'], ['Sub-aerial', 'Runner, stolon, sucker, offset', 'Grass, strawberry, mint, water hyacinth', 'Vegetative propagation'], ['Aerial', 'Tendril', 'Grapevine', 'Climbing'], ['Aerial', 'Thorn', 'Citrus, Bougainvillea', 'Protection'], ['Aerial', 'Phylloclade', 'Opuntia', 'Photosynthesis and storage']], 'Table of stem modifications with position, example and function'),
      n: 'Underground stems store food and carry the plant through unfavourable seasons. Sub-aerial stems run along or just under the soil and spread the plant. Aerial stems may climb, protect or photosynthesise, as in the green flattened stem of Opuntia.',
    }),
    sl('example', 'Worked example 2: stem or root?', {
      b: `A potato has small depressions that sprout shoots; a sweet potato has none. Count: ${POTATO.tubers} potatoes with ${POTATO.eyes} eyes each, and a grass runner ${RUNNER.length_cm} centimetres long with a node every ${RUNNER.spacing_cm} centimetres.`,
      ul: [
        'The potato has **eyes**, which are axillary buds on nodes, so it is a **stem tuber**.',
        'The sweet potato has no nodes, internodes or buds and can form adventitious shoots only, so it is a **tuberous root**.',
        `Eyes on ${POTATO.tubers} potatoes: ${POTATO.tubers} × ${POTATO.eyes} = **${POTATO_EYES}**; nodes on the runner: ${RUNNER.length_cm} ÷ ${RUNNER.spacing_cm} = **${RUNNER_NODES}**.`,
      ],
      v: table(['Feature', 'Potato', 'Sweet potato'], [['Nodes and buds', 'Present (eyes)', 'Absent'], ['Organ', 'Stem', 'Root']], 'Worked table comparing a potato and a sweet potato'),
      n: 'Look for nodes and buds. The eyes of a potato are buds on nodes, so it is a stem. A sweet potato has none, so it is a root. Counts follow by multiplication and division, such as eight eyes on each of five potatoes.',
    }),
    sl('check', 'Quick check: runner', {
      b: 'How many nodes does a 300 cm runner have if there is a node every 12 cm?',
      n: 'Quick check. Divide the length by the spacing.',
      chk: 'ck-runner-num',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Roots: tap, fibrous, adventitious; the tip has a cap, meristematic, elongation and maturation regions.',
        'Modified roots: fusiform, conical, napiform, tuberous (storage); pneumatophores (respiration); prop and stilt (support).',
        'Stem: nodes, internodes, terminal and axillary buds.',
        'Underground stems: tuber, rhizome, corm; sub-aerial: runner, stolon, sucker, offset; aerial: tendril, thorn, phylloclade.',
        'A potato is a stem (eyes are buds); a sweet potato is a root.',
      ],
      v: table(['Plant', 'Organ', 'Modification'], [['Carrot', 'Root', 'Conical'], ['Potato', 'Stem', 'Tuber'], ['Ginger', 'Stem', 'Rhizome'], ['Mangrove', 'Root', 'Pneumatophore']], 'Summary table of four plants, the modified organ and the modification'),
      n: 'To recap: roots are tap, fibrous or adventitious, and may be modified for storage, support or respiration. Stems have nodes and buds, and may be modified underground, above ground or just at the surface. Use nodes and buds to decide stem or root.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Give the **function** with every modification you name.',
        'Say **why**: the potato is a stem because it has **eyes (buds) on nodes**.',
        'Name the four regions of a root tip **from the tip upward**.',
        'Label diagrams of modified roots and stems with the **plant name** as well as the type.',
      ],
      n: 'Exam tips. Always give the function of a modification. Justify with nodes and buds when a question asks whether an organ is a stem or a root. Name the root regions from the tip upward. And write the plant name on each diagram.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Morphology of Root, Stem and Leaf — Part 2: Leaves and their modifications',
  goals: [
    'Name the parts of a leaf and distinguish venation, simple and compound leaves and phyllotaxy',
    'Distinguish a compound leaf from a branch bearing simple leaves',
    'Relate leaf modifications to their functions, including insectivorous plants',
  ],
  slides: [
    sl('title', 'The leaf', {
      b: 'Part 2 — the organ of photosynthesis and its many forms.',
      v: flow('LR', [['b', 'Leaf base'], ['p', 'Petiole'], ['l', 'Lamina']], [['b', 'p'], ['p', 'l']], 'Flow of the three parts of a typical leaf from base to lamina'),
      n: 'A leaf arises at a node and has an axillary bud in its axil. A typical leaf has three parts: the leaf base, the petiole and the lamina. Leaves differ in venation, in being simple or compound, and in how they are arranged on the stem.',
    }),
    sl('diagram', 'Parts of a simple leaf', {
      b: 'The **leaf base** attaches to the stem and may bear **stipules**; the **petiole** holds the **lamina** to the light; the lamina has a **midrib** and **veins**.',
      v: V.leaf,
      n: 'The leaf base may have two small leaf-like stipules, as in many dicots. In grasses the base forms a sheath around the stem. The petiole lets the blade move to catch light. The lamina has a central midrib and branching veins that carry water and food.',
    }),
    sl('diagram', 'Venation, simple and compound leaves', {
      b: '**Reticulate** venation (dicots), **parallel** venation (monocots); **pinnate** and **palmate** compound leaves.',
      v: V.types,
      n: 'In reticulate venation the veins form a network. In parallel venation they run side by side. In a simple leaf the blade is whole. In a compound leaf the blade is cut into leaflets, borne on a rachis in a pinnate leaf and all from one point in a palmate leaf.',
    }),
    sl('concept', 'Compound leaf or branch?', {
      b: 'A compound leaf and a branch bearing simple leaves can look alike. The **bud** tells them apart.',
      v: table(['Feature', 'Compound leaf', 'Branch with simple leaves'], [['Bud in the axil of the main axis', 'Present at the base of the petiole', 'Present in the axil of the branch'], ['Bud at the tip of the main axis', 'Absent', 'Present (terminal bud)'], ['Buds in the axils of leaflets or leaves', 'Absent in leaflets', 'Present in each leaf axil'], ['Leaflets or leaves arranged', 'On a rachis in one plane', 'On nodes, often in a spiral']], 'Table distinguishing a compound leaf from a branch bearing simple leaves'),
      n: 'Look for buds. A compound leaf has an axillary bud only at the base of its petiole, and no bud at the tip. A branch has a terminal bud and an axillary bud in the axil of every leaf.',
    }),
    sl('example', 'Worked example 1: counting leaflets', {
      b: `Count the leaflets: (a) a neem leaf with ${LEAFLETS_NEEM / 2} pairs and no terminal leaflet; (b) a rose leaf with 3 pairs and a terminal leaflet; (c) a twig with 6 palmate leaves of ${PALMATE} leaflets each.`,
      ul: [
        `Neem: ${LEAFLETS_NEEM / 2} × 2 = **${LEAFLETS_NEEM}**.`,
        `Rose: 3 × 2 + 1 = **${LEAFLETS_ROSE}**.`,
        `Palmate twig: 6 × ${PALMATE} = **${LEAFLETS_COMPOUND_TWIG}**.`,
      ],
      v: table(['Leaf', 'Calculation', 'Leaflets'], [['Neem, paripinnate', `${LEAFLETS_NEEM / 2} × 2`, String(LEAFLETS_NEEM)], ['Rose, imparipinnate', '3 × 2 + 1', String(LEAFLETS_ROSE)], ['Six palmate leaves', `6 × ${PALMATE}`, String(LEAFLETS_COMPOUND_TWIG)]], 'Worked table of leaflet counts for three leaves'),
      n: 'In a pinnate leaf the leaflets are in pairs along the rachis, so double the number of pairs. If there is also a terminal leaflet, add one. For palmate leaves, multiply the number of leaves by the leaflets in each leaf.',
    }),
    sl('check', 'Quick check: leaflets', {
      b: 'How many leaflets does a pinnate leaf with 4 pairs and a terminal leaflet have?',
      n: 'Quick check. Double the pairs and add the terminal one.',
      chk: 'ck-leaflets-num',
    }),
    sl('diagram', 'Phyllotaxy', {
      b: '**Alternate:** one leaf per node (China rose, mustard). **Opposite:** two per node (guava, Calotropis). **Whorled:** more than two per node (Alstonia).',
      v: V.phyllo,
      n: 'Phyllotaxy is the arrangement of leaves on the stem. One leaf at each node, on alternate sides, is the alternate type. Two leaves facing each other is the opposite type. More than two around the node is whorled.',
    }),
    sl('example', 'Worked example 2: leaves on a twig', {
      b: `Count leaves: an alternate twig with 14 nodes; an opposite twig with 9 nodes; a whorled twig with 5 nodes and ${LEAVES_PER_NODE.whorled} leaves at each.`,
      ul: [
        `Alternate: ${LEAVES_PER_NODE.alternate} × 14 = **${LEAF_ALT}**.`,
        `Opposite: ${LEAVES_PER_NODE.opposite} × 9 = **${LEAF_OPP}**.`,
        `Whorled: ${LEAVES_PER_NODE.whorled} × 5 = **${LEAF_WHORL}**.`,
      ],
      v: table(['Phyllotaxy', 'Leaves per node', 'Nodes', 'Leaves'], [['Alternate', String(LEAVES_PER_NODE.alternate), '14', String(LEAF_ALT)], ['Opposite', String(LEAVES_PER_NODE.opposite), '9', String(LEAF_OPP)], ['Whorled', String(LEAVES_PER_NODE.whorled), '5', String(LEAF_WHORL)]], 'Worked table of leaves per node, nodes and leaves for three phyllotaxies'),
      n: 'The number of leaves is the number of leaves at each node times the number of nodes. One leaf per node is alternate, two is opposite, and more than two is whorled.',
    }),
    sl('check', 'Quick check: phyllotaxy', {
      b: 'A China rose twig bears one leaf at each node, on alternate sides. What is its phyllotaxy?',
      n: 'Quick check. Count the leaves at one node.',
      chk: 'ck-phyllo-mcq',
    }),
    sl('diagram', 'Modified leaves', {
      b: 'Leaves may become **tendrils** (support), **spines** (protection), **fleshy scale leaves** (storage), **pitchers** (trapping insects) or form **buds** (reproduction).',
      v: V.leafmods,
      n: 'In the pea the upper leaflets become tendrils. In Opuntia the leaves are spines and the flat green stem makes the food. An onion bulb is a short stem with fleshy leaves that store food. In Bryophyllum, buds on the leaf margin grow into new plants.',
    }),
    sl('concept', 'Leaf modifications and their jobs', {
      b: 'Match the modification to the function.',
      v: table(['Function', 'Modification', 'Example'], [['Support', 'Leaf tendril', 'Pea, Lathyrus'], ['Protection', 'Leaf spines', 'Opuntia, Aloe margins'], ['Storage', 'Fleshy scale leaves', 'Onion, garlic bulb'], ['Reproduction', 'Buds in the notches of the leaf margin', 'Bryophyllum'], ['Trapping insects', 'Pitcher, trap', 'Nepenthes, Dionaea']], 'Table of leaf modifications with function and example'),
      n: 'Tendrils climb, spines protect and reduce water loss, and fleshy leaves store food and water. Bryophyllum makes tiny plantlets in the notches of its leaves, and these fall off and grow into new plants.',
    }),
    sl('concept', 'Insectivorous plants', {
      b: 'Plants of **nitrogen-poor** soil trap insects and digest them to get **nitrogen**.',
      v: table(['Plant', 'Trap', 'How it works'], [['Pitcher plant (Nepenthes)', 'Leaf blade becomes a pitcher with a lid', 'Insects slip into digestive fluid and are digested'], ['Venus flytrap (Dionaea)', 'Two hinged lobes with trigger hairs', 'Lobes snap shut on an insect'], ['Sundew (Drosera)', 'Sticky tentacles on the blade', 'Tentacles bend over the prey'], ['Bladderwort (Utricularia)', 'Small bladders', 'Suction traps tiny aquatic animals']], 'Table of insectivorous plants with trap and mechanism'),
      n: 'These plants make food by photosynthesis, but grow in places where the soil lacks nitrogen. They trap insects with modified leaves and digest them with enzymes to obtain nitrogen compounds. The pitcher plant and the Venus flytrap are the common examples.',
    }),
    sl('check', 'Quick check: pitchers', {
      b: 'Six pitchers trap 14 insects a week each. How many insects do they trap in 4 weeks?',
      n: 'Quick check. Multiply the three numbers.',
      chk: 'ck-pitcher-num',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Leaf: leaf base (with stipules), petiole, lamina with midrib and veins.',
        'Reticulate venation (dicots) and parallel venation (monocots); simple and compound (pinnate, palmate) leaves.',
        'A compound leaf has an axillary bud at the base of the petiole only; a branch has a terminal bud and axillary buds.',
        'Phyllotaxy: alternate, opposite, whorled.',
        'Leaf modifications: tendrils, spines, fleshy scale leaves, buds (Bryophyllum), pitchers and traps.',
      ],
      v: table(['Phyllotaxy', 'Leaves per node', 'Example'], [['Alternate', '1', 'China rose, mustard'], ['Opposite', '2', 'Guava, Calotropis'], ['Whorled', 'More than 2', 'Alstonia']], 'Summary table of the three kinds of phyllotaxy'),
      n: 'To recap: a leaf has a base, a petiole and a lamina. Venation may be reticulate or parallel, leaves may be simple or compound, and phyllotaxy may be alternate, opposite or whorled. Leaves may be modified for support, protection, storage, reproduction or trapping insects.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'To tell a compound leaf from a branch, **name the buds**: terminal and axillary.',
        'Give the **venation** with the **plant group**: reticulate in dicots, parallel in monocots.',
        'In phyllotaxy give **the number of leaves at a node** and an example.',
        'Explain that insectivorous plants trap insects to get **nitrogen**, not energy.',
      ],
      n: 'Exam tips. Use buds to tell a compound leaf from a branch. Link venation to the plant group. State the number of leaves at a node for each phyllotaxy. And remember that insects supply nitrogen to these plants.',
    }),
  ],
});
void BRYO;
void BRYO_PLANTLETS;
void PITCHER;
void PITCHER_INSECTS;
void ONION;
void ONION_SCALES;
