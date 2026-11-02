// ch05 Morphology of Flowering Plants — question bank. AR keys: a c a b d c d (in bank order below).
import { mk, add, r, svgV } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { N, ELONG, MANGO, FLOWERS, SOL_TEX, SOL_FACTS, facts, formulaTex, placLetter, FLOWER_LETTERS, leavesOnBranch, seeds, budsLeft, stamensIn, sum, round } from './calc.mjs';
import { PLAC_LETTERED, FLOWER_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const fx = (spec) => `$${formulaTex(spec)}$`;

// ---------------------------------------------------------------- t01 root, stem and leaf
add('taproot-mcq', mcq({
  stem: 'A botany class uproots a mustard seedling and a wheat seedling from a garden bed. The mustard has one thick central root with thinner side branches, while the wheat has a dense cluster of thin roots of similar size. Which statement is correct?',
  right: 'Mustard has a tap root that grew from the radicle; wheat has a fibrous root system.',
  wrong: ['Mustard has a fibrous root system; wheat has a tap root that grew from the radicle.', 'Both have tap roots, because every seedling begins with a radicle.', 'Both have adventitious roots, because both are flowering plants.'],
  sol: 'In most dicots such as mustard the radicle persists as the tap root; in monocots such as wheat it is short-lived and fibrous roots arise from the stem base — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('zones-mcq', mcq({
  stem: 'A student sprouts gram seeds on wet cotton and sees a fuzz of fine hairs a few centimetres behind each root tip, but none right at the tip. These hairs arise in the',
  right: 'region of maturation, above the region of elongation',
  wrong: ['root cap, which covers the tip', 'meristematic region, where cells divide', 'region of elongation, where cells enlarge'],
  sol: 'Root hairs develop in the region of maturation, where cells differentiate; the root cap, meristematic region and region of elongation lie nearer the tip — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('prop-mcq', mcq({
  stem: 'An old banyan tree has thick pillar-like roots growing down from its horizontal branches into the soil, while a maize plant has thick roots growing obliquely from its lowest stem nodes. These roots are respectively',
  right: 'prop roots and stilt roots',
  wrong: ['stilt roots and prop roots', 'pneumatophores and prop roots', 'prop roots and storage roots'],
  sol: 'Banyan prop roots hang from branches to support them; maize and sugarcane have stilt roots from the lower nodes — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('pneumo-mcq', mcq({
  stem: 'Mangrove plants such as Rhizophora grow in swampy, waterlogged mud where little air reaches the roots below. Which modification helps them?',
  right: 'Upright roots that grow out of the mud and have pores to take in air',
  wrong: ['Prop roots that store food for the dry season', 'Tap roots that swell to store starch in the mud', 'Stilt roots that help the plant climb nearby trees'],
  sol: 'Mangrove plants develop pneumatophores, upright roots with pores that bring air to the roots below — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('potato-mcq', mcq({
  stem: 'When a potato is kept in a dark cupboard, shoots sprout from small depressions on its surface. These depressions, the “eyes”, are best described as',
  right: 'nodes with axillary buds on a modified underground stem',
  wrong: ['adventitious roots swollen with starch', 'lateral roots that store food', 'leaf tips modified into buds'],
  sol: 'A potato is an underground stem swollen with food; each eye is a node bearing an axillary bud that can grow into a shoot — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('thorn-mcq', mcq({
  stem: 'A gardener trimming a Bougainvillea hedge is pricked by hard, pointed thorns. These thorns develop from',
  right: 'axillary buds, so they are modified stems that protect the plant',
  wrong: ['leaves, so they are modified leaves that protect the plant', 'epidermal hairs, so they have no special origin', 'adventitious roots, so they are modified roots'],
  sol: 'Thorns of Citrus and Bougainvillea arise from axillary buds; they are modified stems for protection (spines, as in cacti, are modified leaves) — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('tendril-mcq', mcq({
  stem: 'One climber has a coiled tendril arising in the axil of a leaf, where a branch would normally develop. Another climber has tendrils in place of the terminal leaflets of its compound leaf. These tendrils are respectively modifications of',
  right: 'an axillary bud (stem) and leaflets (leaf)',
  wrong: ['a leaf and an axillary bud', 'adventitious roots and an axillary bud', 'stipules and leaf bases'],
  sol: 'Stem tendrils (watermelon, grape vine) arise from axillary buds; leaf tendrils (pea) are modified leaflets — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('venation-mcq', mcq({
  stem: 'A leaf is held up to the light. Its veins run side by side from the base to the tip and do not form a network. The plant most probably is',
  right: 'a monocot such as banana, with parallel venation',
  wrong: ['a dicot such as mango, with reticulate venation', 'a dicot such as mustard, with parallel venation', 'a monocot such as maize, with reticulate venation'],
  sol: 'Parallel venation is typical of monocots (maize, banana); dicots (mango, mustard) have reticulate venation — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('phyllo-mcq', mcq({
  stem: 'In a guava shoot two leaves arise at every node, on opposite sides of the stem. This arrangement is called',
  right: 'opposite phyllotaxy',
  wrong: ['alternate phyllotaxy', 'whorled phyllotaxy', 'reticulate venation'],
  sol: 'Two leaves at each node, facing each other, is opposite phyllotaxy (guava, Calotropis) — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('leafbase-mcq', mcq({
  stem: 'The swollen leaf base found in many leguminous plants is called the',
  right: 'pulvinus',
  wrong: ['stipule', 'rachis', 'lamina'],
  sol: 'A pulvinus is the swollen leaf base of some legumes; stipules are small outgrowths, the rachis is the axis of a compound leaf, and the lamina is the blade — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('compound-mcq', mcq({
  stem: 'A leaf has its blade divided into several leaflets that all arise from the tip of the petiole, like fingers from a palm. It is a',
  right: 'palmately compound leaf, as in silk cotton',
  wrong: ['pinnately compound leaf, as in neem', 'simple leaf with a deeply cut lamina', 'simple leaf with a long petiole'],
  sol: 'Leaflets from one point at the tip of the petiole make a palmately compound leaf (silk cotton); neem has leaflets along a rachis — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('opuntia-mcq', mcq({
  stem: 'In the desert plant Opuntia a green, flattened, fleshy branch carries sharp spines. Which statement is correct?',
  right: 'The flat part is a modified stem that photosynthesises, and the spines are modified leaves.',
  wrong: ['The flat part is a modified leaf that photosynthesises, and the spines are modified stems.', 'The flat part is a modified root, and the spines are modified leaves.', 'The flat part is a modified stem, and the spines are modified roots.'],
  sol: 'In Opuntia the stem is flattened and fleshy and does the photosynthesis, while the leaves are reduced to spines — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('rootcap-ar', ar({
  a: 'The tip of a growing root is covered by a thimble-like root cap.',
  r: 'The root cap protects the delicate meristematic region as the root pushes through the soil.',
  key: 'a',
  sol: 'Both statements are true, and the protection of the dividing cells behind it explains the cap — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('eyes-ar', ar({
  a: 'A potato tuber sprouts new shoots from its eyes.',
  r: 'Each eye of a potato is a primordium of an adventitious root.',
  key: 'c',
  sol: 'A is true; R is false, because each eye is a node with an axillary bud, not a root primordium — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('adv-tf', tf({
  stem: 'Adventitious roots always grow directly from the radicle of the seed.',
  key: 'f',
  sol: 'False. Adventitious roots arise from parts of the plant other than the radicle, such as stem nodes in grass.',
  d: 1, c: 'recall', t: [1],
}));
add('elong-fill', fill({
  stem: 'In a growing root, the cells enlarge the most, and so lengthen the root, in the region of ______.',
  acc: [['elongation', 'the region of elongation', 'elongation zone']],
  sol: 'Elongation.',
  d: 1, c: 'recall', t: [1],
}));
add('rootmod-match', match({
  stem: 'Match each root modification (column I) with an example plant (column II).',
  pairs: [
    ['Storage tap root', 'Carrot'],
    ['Prop roots', 'Banyan'],
    ['Stilt roots', 'Sugarcane'],
    ['Pneumatophores', 'Rhizophora'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Carrot stores food in a swollen tap root; the banyan has prop roots; sugarcane has stilt roots; Rhizophora has pneumatophores.',
  d: 1, c: 'recall', t: [1],
}));
add('opp-num', num({
  stem: 'A Calotropis shoot has 7 nodes, and two leaves arise at each node. How many leaves does the shoot carry?',
  value: N.opp,
  sol: r`Opposite phyllotaxy has two leaves per node: $7 \times 2 = ${N.opp}$ leaves.`,
  scheme: [[`${N.opp}`, 1]],
  d: 1, c: 'application', t: [1],
}), (q) => q.answer.value === leavesOnBranch(7, 2) || 'value');
add('elong-num', num({
  stem: `A root tip is marked with ink at 1 mm intervals, giving ten intervals counted from the tip. After a day the growth of each interval (mm), from interval 1 to interval 10, is: ${ELONG.join(', ')}. What is the total elongation of the marked region, in mm?`,
  value: N.elongTotal, tol: 0.05, unit: 'mm',
  sol: r`$${ELONG.join(' + ')} = ${N.elongTotal}$ mm, nearly all of it in intervals 3 to 6, the region of elongation.`,
  scheme: [[`${N.elongTotal} mm`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === sum(ELONG) || 'value');
add('rootshort', short({
  marks: 2,
  stem: 'Distinguish a tap root system from a fibrous root system, giving one plant as an example of each.',
  model: 'In a **tap root system** the **radicle** grows into a persistent primary root bearing lateral roots, as in **mustard or gram** (dicots). In a **fibrous root system** the primary root is short-lived and many similar roots arise from the **base of the stem**, as in **wheat or rice** (monocots).',
  sol: 'Origin and examples of the two systems.',
  scheme: [['Tap root: radicle persists; example', 1], ['Fibrous: roots from stem base; example', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('rootmod-short', short({
  marks: 2,
  stem: 'A farmer grows mangrove saplings on a tidal mud flat where the soil has almost no air. Name the special roots these plants develop, and explain how they help.',
  model: 'Mangrove plants develop **pneumatophores**, roots that grow **vertically upwards** out of the mud. They have **pores** through which air enters, and the air reaches the underground roots, which cannot get enough **oxygen** from the waterlogged soil.',
  sol: 'Pneumatophores take in air.',
  scheme: [['Pneumatophores: upright roots with pores', 1], ['Bring air to the roots in oxygen-poor mud', 1]],
  d: 2, c: 'application', t: [1],
}));
add('stemmod-short', short({
  marks: 2,
  stem: 'Name any three modifications of the stem and give one function and one example for each.',
  model: '**Underground stems** such as potato and ginger **store food**. **Tendrils**, as in watermelon and grape vine, arise from axillary buds and help the plant **climb**. **Thorns**, as in Citrus and Bougainvillea, are hard pointed stems that **protect** the plant. A **flattened green stem**, as in Opuntia, **photosynthesises**.',
  sol: 'Three modifications with function and example.',
  scheme: [['Any two modifications with function and example', 1], ['The third modification with function and example', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('leaf-short', short({
  marks: 2,
  stem: 'Name the three parts of a typical leaf and state what each does.',
  model: 'The **leaf base** attaches the leaf to the stem and may carry two small **stipules** in dicots, or form a sheath in monocots. The **petiole** is the stalk that holds the blade to the light. The **lamina** is the green, expanded blade, with a midrib and veins, where photosynthesis mainly occurs.',
  sol: 'Leaf base, petiole, lamina.',
  scheme: [['Leaf base and petiole with roles', 1], ['Lamina with midrib and veins', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('phyllo-short', short({
  marks: 3,
  stem: 'What is phyllotaxy? Describe its three types, giving one example of each.',
  model: '**Phyllotaxy** is the pattern in which leaves are arranged on the stem. In **alternate** phyllotaxy a single leaf arises at each node, as in china rose or mustard. In **opposite** phyllotaxy two leaves arise at each node on opposite sides, as in guava or Calotropis. In **whorled** phyllotaxy more than two leaves form a circle at a node, as in Alstonia.',
  sol: 'Definition and three types with examples.',
  scheme: [['Definition', 1], ['Alternate and opposite with examples', 1], ['Whorled with example', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('venation-short', short({
  marks: 3,
  stem: 'Compare a typical dicot leaf and a typical monocot leaf in venation and leaf base, giving one example plant of each.',
  model: 'A **dicot** leaf, as in **mango or mustard**, has **reticulate venation**, a network of veins and veinlets, and its leaf base often carries two small **stipules**. A **monocot** leaf, as in **maize or banana**, has **parallel venation**, with veins running side by side, and its leaf base **expands into a sheath** that partly or wholly covers the stem.',
  sol: 'Venation and leaf base compared.',
  scheme: [['Reticulate versus parallel venation', 1], ['Stipules versus sheathing base', 1], ['Examples of both', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('leafmod-short', short({
  marks: 3,
  stem: 'A pea plant uses leaflets as tendrils, a cactus has leaves that are tiny spines, and an onion bulb is made of fleshy leaves. For each plant explain what the modification does.',
  model: 'In **pea**, some leaflets are modified into **tendrils**, which coil round supports and let the weak stem **climb** towards light. In **cacti**, leaves are reduced to **spines** that **protect** the plant and cut down **loss of water**. In **onion**, leaves are **fleshy** and **store food**.',
  sol: 'Tendrils climb; spines protect and save water; fleshy leaves store food.',
  scheme: [['Pea tendrils for climbing', 1], ['Cactus spines for protection and water saving', 1], ['Onion fleshy leaves store food', 1]],
  d: 3, c: 'application', t: [1],
}));
add('root-long', long({
  stem: 'Describe the regions seen at the tip of a young root, and explain how the roots of carrot, banyan, maize and mangrove plants are modified for different functions.',
  model: '**Regions.** The tip is covered by a **root cap**, which protects it as it pushes through soil. Just behind it is the **region of meristematic activity**, with small, thin-walled cells that divide. Cells in the **region of elongation** enlarge and lengthen the root. In the **region of maturation** cells differentiate into tissues, and **root hairs** absorb water and minerals.\n\n**Modifications.** The **tap root of carrot** swells to **store food**. The **banyan** forms **prop roots**, which hang from branches and support them. **Maize** forms **stilt roots** from its lower nodes for support. **Mangrove** plants form **pneumatophores**, upright roots with pores that take in air.',
  sol: 'Four root regions and four modifications.',
  scheme: [['Root cap and meristematic region', 1], ['Regions of elongation and maturation with root hairs', 1], ['Carrot storage root', 1], ['Prop and stilt roots with examples', 1], ['Pneumatophores', 1]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [1],
}));
add('stem-long', long({
  stem: 'A gardener finds that a hedge plant has sharp thorns, a climbing vine has coiled tendrils, a desert plant has a flat, green, fleshy stem, and a field crop has swollen underground stems. For each, state the modification, the part it arises from, its function and one example.',
  model: '**Thorns** (Citrus, Bougainvillea) arise from **axillary buds** and **protect** the plant from browsing animals. **Tendrils** (watermelon, grape vine, cucumber) also arise from **axillary buds** and let the weak stem **climb** and reach light. The **flattened green stem** of **Opuntia** is a modified stem; it is fleshy and **photosynthesises**, since its leaves are reduced to spines. **Swollen underground stems** (potato, ginger, turmeric, Colocasia) **store food** and help the plant survive harsh seasons; the eyes of potato are nodes with axillary buds that sprout in the next season.',
  sol: 'Four stem modifications with origin, function and example.',
  scheme: [['Thorns: origin, function, example', 1], ['Tendrils: origin, function, example', 1], ['Flattened stem: function, example', 1.5], ['Underground stems: function, example', 1.5]],
  wl: [80, 240],
  d: 3, c: 'application', t: [1],
}));
add('leaf-long', long({
  stem: 'Describe the parts of a typical leaf, the two main kinds of venation, simple and compound leaves, and the three kinds of phyllotaxy, giving an example in each case.',
  model: '**Parts.** A leaf has a **leaf base**, a **petiole** and a **lamina**. The base may carry stipules (many dicots), form a sheath (monocots) or swell into a pulvinus (some legumes).\n\n**Venation.** In **reticulate** venation (mango, mustard) veins form a network; in **parallel** venation (maize, banana) they run side by side.\n\n**Simple and compound.** A **simple** leaf has an undivided lamina. A **compound** leaf has leaflets, **pinnately** arranged along a rachis (neem) or **palmately** from the petiole tip (silk cotton).\n\n**Phyllotaxy.** Leaves are **alternate** (china rose, mustard), **opposite** (guava, Calotropis) or **whorled** (Alstonia).',
  sol: 'Parts, venation, simple and compound, phyllotaxy.',
  scheme: [['Three parts and the leaf base variations', 1], ['Reticulate and parallel venation with examples', 1], ['Simple versus compound; pinnate and palmate', 1.5], ['Three phyllotaxies with examples', 1.5]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [1],
}));
{
  const g = ELONG;
  add('root-case', mk.case({
    passage: `In a school experiment, the root tip of a maize seedling was marked with ink at 1 mm intervals along the first 10 mm from the tip. After 24 hours the students measured how much each interval had lengthened.\n\n| Interval from the tip | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |\n|---|---|---|---|---|---|---|---|---|---|---|\n| Growth (mm) | ${g.join(' | ')} |`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Interval 4 lengthened the most. In which region of the root did it lie?',
        right: 'Region of elongation',
        wrong: ['Region of maturation', 'Root cap', 'Region of root hairs only'],
        sol: 'The interval that grew most lies in the region of elongation, where cells enlarge — option (@K).',
        d: 1, c: 'application', t: [1],
      })),
      part('b', num({
        stem: 'What is the length of the marked region, in mm, after 24 hours?',
        value: N.elongFinalLength, tol: 0.05, unit: 'mm',
        sol: r`Original length 10 mm plus total growth $${N.elongTotal}$ mm gives $10 + ${N.elongTotal} = ${N.elongFinalLength}$ mm.`,
        scheme: [[`${N.elongFinalLength} mm`, 1]],
        d: 2, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'Intervals 7 to 10 did not lengthen at all. Explain why, and say what structures would be seen on this part of the root.',
        model: 'Intervals 7 to 10 lie in the **region of maturation**. Their cells have **stopped growing** and have **differentiated** into the tissues of the root. This part bears **root hairs**, which absorb water and minerals.',
        sol: 'Region of maturation: no growth; root hairs.',
        scheme: [['Cells have matured and stopped elongating', 1], ['Root hairs seen here', 1]],
        d: 2, c: 'application', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'Intervals 1 and 2 grew very little although cells are dividing there. Name the region and explain how it still adds to root length.',
          model: 'Intervals 1 and 2 lie in the **meristematic region**, where small, thin-walled cells **divide**. The new cells are pushed back into the **region of elongation**, where they **enlarge**, so division here supplies the cells that later make the root longer.',
          sol: 'Meristematic region supplies new cells.',
          scheme: [['Meristematic region: dividing cells', 1], ['New cells pass to the region of elongation and enlarge', 1]],
          d: 3, c: 'application', t: [1],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 18.6 || 'value');
}

// ---------------------------------------------------------------- t02 inflorescence, flower, fruit, seed
add('racemose-mcq', mcq({
  stem: 'In the inflorescence of mustard the main axis keeps growing and bears flowers along its sides, the oldest at the base and the youngest near the tip. This inflorescence is',
  right: 'racemose, with flowers in acropetal order',
  wrong: ['cymose, with flowers in basipetal order', 'racemose, with flowers in basipetal order', 'cymose, with flowers in acropetal order'],
  sol: 'A growing main axis with flowers borne laterally in acropetal order is racemose — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('cymose-mcq', mcq({
  stem: 'A florist examines a branch whose main axis ends in a flower; the next flowers arise below it, so the oldest flower is at the top. This branch carries',
  right: 'a cymose inflorescence, with flowers in basipetal order',
  wrong: ['a racemose inflorescence, with flowers in acropetal order', 'a racemose inflorescence whose main axis grows indefinitely', 'a single flower that never branches again'],
  sol: 'When the main axis terminates in a flower and younger flowers lie below, the inflorescence is cymose, with basipetal order — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('symmetry-mcq', mcq({
  stem: 'A student cuts through the centre of a mustard flower and of a pea flower along different vertical planes. The mustard flower gives two equal halves along any plane, but the pea flower only along one. The two flowers are respectively',
  right: 'actinomorphic and zygomorphic',
  wrong: ['zygomorphic and actinomorphic', 'both actinomorphic', 'both zygomorphic'],
  sol: 'Radial symmetry along any plane is actinomorphic (mustard); symmetry along one plane only is zygomorphic (pea) — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('ovarypos-mcq', mcq({
  stem: 'In a guava flower the other floral whorls arise above the ovary, which is sunk in the thalamus; in a china rose they arise below the ovary. The two flowers are respectively',
  right: 'epigynous and hypogynous',
  wrong: ['hypogynous and epigynous', 'perigynous and hypogynous', 'epigynous and perigynous'],
  sol: 'Guava is epigynous (inferior ovary) and china rose hypogynous (superior ovary) — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('stamen-mcq', mcq({
  stem: 'In a pea flower nine stamens are united by their filaments into one bundle and the tenth is free, while in a china rose all the filaments form a single tube. These conditions are respectively',
  right: 'diadelphous and monoadelphous',
  wrong: ['monoadelphous and diadelphous', 'polyadelphous and monoadelphous', 'diadelphous and polyadelphous'],
  sol: 'Two bundles, as in pea, is diadelphous; one bundle, as in china rose, is monoadelphous — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('plac-mcq', mcq({
  stem: 'A cross-section of a tomato ovary shows its ovules attached to the central axis where the partitions between the chambers meet. Which lettered diagram shows this arrangement?',
  right: `Diagram ${placLetter('axile')}`,
  wrong: [`Diagram ${placLetter('parietal')}`, `Diagram ${placLetter('marginal')}`, `Diagram ${placLetter('free central')}`],
  sol: `Ovules on the axis of a chambered ovary are axile placentation, shown in diagram ${placLetter('axile')} — option (@K).`,
  assets: [svgV(PLAC_LETTERED, 'Five ovary sections labelled A to E, each showing a different placentation')],
  d: 2, c: 'application', t: [2],
}));
add('plac2-mcq', mcq({
  stem: 'A sunflower ovary holds a single ovule at its base. Which lettered diagram shows this placentation?',
  right: `Diagram ${placLetter('basal')}`,
  wrong: [`Diagram ${placLetter('axile')}`, `Diagram ${placLetter('parietal')}`, `Diagram ${placLetter('marginal')}`],
  sol: `A single ovule at the base is basal placentation, shown in diagram ${placLetter('basal')} — option (@K).`,
  assets: [svgV(PLAC_LETTERED, 'Five ovary sections labelled A to E, each showing a different placentation')],
  d: 2, c: 'application', t: [2],
}));
add('flowerlet-mcq', mcq({
  stem: 'In the lettered diagram of a flower, which letter marks the part that develops into the fruit after fertilisation?',
  right: `Part ${FLOWER_LETTERS.ovary}`,
  wrong: [`Part ${FLOWER_LETTERS.anther}`, `Part ${FLOWER_LETTERS.sepal}`, `Part ${FLOWER_LETTERS.petal}`],
  sol: `The ovary, part ${FLOWER_LETTERS.ovary}, ripens into the fruit; the anther makes pollen, the sepal protects the bud and the petal attracts insects — option (@K).`,
  assets: [svgV(FLOWER_LETTERED, 'Longitudinal section of a flower with five parts marked A to E')],
  d: 1, c: 'recall', t: [2],
}));
add('pericarp-mcq', mcq({
  stem: 'In a mango the thin skin, the juicy edible pulp and the hard stone round the seed are respectively the',
  right: 'epicarp, mesocarp and endocarp',
  wrong: ['mesocarp, epicarp and endocarp', 'endocarp, mesocarp and epicarp', 'epicarp, endocarp and mesocarp'],
  sol: 'The mango is a drupe: skin is the epicarp, fleshy pulp the mesocarp and the stony layer the endocarp — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('maize-mcq', mcq({
  stem: 'A student soaks a maize grain and a bean seed overnight and cuts each lengthwise. Which feature will she find in the maize grain but not in the bean seed?',
  right: 'A large endosperm with a single shield-shaped scutellum beside the embryo',
  wrong: ['Two large fleshy cotyledons filling most of the seed', 'An embryonal axis with a radicle and a plumule', 'A seed coat that protects the embryo'],
  sol: 'The maize grain has a large endosperm and one scutellum; the bean has two cotyledons that store food, and both seeds have a seed coat and an embryonal axis — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('radicle-mcq', mcq({
  stem: 'When a bean seed germinates, which part of the embryo grows into the first root of the seedling?',
  right: 'Radicle',
  wrong: ['Plumule', 'Cotyledon', 'Micropyle'],
  sol: 'The radicle of the embryonal axis develops into the primary root; the plumule forms the shoot, cotyledons store food and the micropyle is a pore — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('raceme-ar', ar({
  a: 'In a raceme the flowers open in acropetal order.',
  r: 'The main axis of a raceme keeps growing and bears flowers laterally, so the newest flowers form at its tip.',
  key: 'a',
  sol: 'Both are true; the continued growth of the axis produces younger flowers towards the tip, which explains acropetal opening — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('zygo-ar', ar({
  a: 'The flower of a pea plant is zygomorphic.',
  r: 'The pea flower has a diadelphous androecium.',
  key: 'b',
  sol: 'Both are true, but the type of androecium does not explain the symmetry of the flower — option (b).',
  d: 2, c: 'understanding', t: [2],
}));
add('guava-ar', ar({
  a: 'The ovary of a guava flower is superior.',
  r: 'In an epigynous flower the margin of the thalamus grows upward, enclosing the ovary and fusing with it.',
  key: 'd',
  sol: 'A is false: guava is epigynous, so its ovary is inferior. R is true — option (d).',
  d: 3, c: 'application', t: [2],
}));
add('racemose-tf', tf({
  stem: 'In a racemose inflorescence the youngest flowers are found near the tip of the main axis.',
  key: 't',
  sol: 'True. The axis keeps growing, so flowers are in acropetal order and the youngest are near the tip.',
  d: 1, c: 'recall', t: [2],
}));
add('bean-tf', tf({
  stem: 'A mature bean seed has a large endosperm that stores the food for the embryo.',
  key: 'f',
  sol: 'False. The bean is a non-endospermous dicot seed at maturity; its two cotyledons store the food. Maize is the endospermous example.',
  d: 2, c: 'understanding', t: [2],
}));
add('parthen-fill', fill({
  stem: 'A fruit that develops from the ovary without fertilisation, as in banana, is called a ______ fruit.',
  acc: [['parthenocarpic', 'parthenocarpic fruit']],
  sol: 'Parthenocarpic.',
  d: 1, c: 'recall', t: [2],
}));
add('aestiv-match', match({
  stem: 'Match each plant (column I) with the aestivation of its petals (column II).',
  pairs: [
    ['Calotropis', 'Valvate'],
    ['China rose', 'Twisted'],
    ['Cassia', 'Imbricate'],
    ['Pea', 'Vexillary'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Calotropis is valvate; china rose is twisted; Cassia is imbricate; pea is vexillary.',
  d: 2, c: 'understanding', t: [2],
}));
add('tomato-num', num({
  stem: 'A tomato ovary has 2 chambers with 30 ovules in each. If 80 percent of the ovules are fertilised and develop into seeds, how many seeds does the fruit contain?',
  value: N.tomatoSeeds,
  sol: r`Ovules: $2 \times 30 = ${N.tomatoOvules}$. Seeds: $${N.tomatoOvules} \times \dfrac{80}{100} = ${N.tomatoSeeds}$.`,
  scheme: [['Ovules counted', 0.5], [`${N.tomatoSeeds} seeds`, 0.5]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === seeds(2, 30, 80) || 'value');
add('mango-num', num({
  stem: `A mango weighs ${MANGO.total} g. Its skin weighs ${MANGO.epicarp} g and the stone with the seed inside weighs ${MANGO.stone} g. What is the mass of the edible mesocarp, in g?`,
  value: MANGO.mesocarp, unit: 'g',
  sol: r`$${MANGO.total} - ${MANGO.epicarp} - ${MANGO.stone} = ${MANGO.mesocarp}$ g.`,
  scheme: [[`${MANGO.mesocarp} g`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 310 || 'value');
add('raceme-num', num({
  stem: `A raceme has ${N.racemeTotal} flowers. One flower opens each day, starting from the base. How many buds are still closed at the end of day ${N.racemeDay}?`,
  value: N.racemeBuds,
  sol: r`${N.racemeDay} flowers are open: $${N.racemeTotal} - ${N.racemeDay} = ${N.racemeBuds}$ buds.`,
  scheme: [[`${N.racemeBuds}`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => q.answer.value === budsLeft(12, 5) || 'value');
add('inflor-short', short({
  marks: 2,
  stem: 'Distinguish between racemose and cymose inflorescences on the basis of the main axis and the order in which the flowers open.',
  model: 'In a **racemose** inflorescence the **main axis keeps growing** and flowers are borne laterally in **acropetal** order, the youngest near the tip. In a **cymose** inflorescence the **main axis ends in a flower**, so its growth is limited, and the flowers are in **basipetal** order, the youngest at the base.',
  sol: 'Axis and order of flowers.',
  scheme: [['Racemose: axis grows, acropetal', 1], ['Cymose: axis ends in flower, basipetal', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('aestiv-short', short({
  marks: 2,
  stem: 'What is aestivation? Name two types with one plant example for each.',
  model: '**Aestivation** is the arrangement of sepals or petals in a floral bud with respect to the other members of the whorl. In **valvate** aestivation the margins just touch without overlapping, as in **Calotropis**. In **twisted** aestivation each petal overlaps the next, as in **china rose**.',
  sol: 'Definition; two types with examples.',
  scheme: [['Definition', 1], ['Two types with examples', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('placent-short', short({
  marks: 2,
  stem: 'A student cuts open a mustard ovary and sees its ovules fixed on the inner wall of one chamber. Name this placentation, define the term and give one other type with an example.',
  model: '**Placentation** is the arrangement of ovules on the placenta within the ovary. The mustard ovary shows **parietal** placentation, with ovules on the **inner wall**. Another type is **axile**, with ovules on the central axis of a chambered ovary, as in **tomato or lemon**.',
  sol: 'Definition; parietal; one other type.',
  scheme: [['Definition and parietal in mustard', 1], ['Another type with example', 1]],
  d: 2, c: 'application', t: [2],
}));
add('ovary-short', short({
  marks: 3,
  stem: 'Distinguish hypogynous, perigynous and epigynous flowers on the basis of the position of the ovary, giving one example of each.',
  model: 'In a **hypogynous** flower the gynoecium is at the highest point and the other parts arise below it; the ovary is **superior**, as in **mustard, china rose or brinjal**. In a **perigynous** flower the ovary is at the same level as the other parts on the rim of the thalamus, so it is **half inferior**, as in **plum, rose or peach**. In an **epigynous** flower the other parts arise above the ovary, which is **inferior**, as in **guava or cucumber**.',
  sol: 'Three ovary positions with examples.',
  scheme: [['Hypogynous: superior; example', 1], ['Perigynous: half inferior; example', 1], ['Epigynous: inferior; example', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('seeddiff-short', short({
  marks: 3,
  stem: 'Distinguish a bean seed from a maize grain on any three points.',
  model: 'A **bean** seed has **two cotyledons**, which store the food, and **no endosperm** in the mature seed; its seed coat is a separate **testa and tegmen**. A **maize** grain has **one cotyledon, the scutellum**, a large **endosperm** with an aleurone layer, and a **membranous seed coat fused with the fruit wall**; the plumule and radicle carry a **coleoptile and coleorhiza**.',
  sol: 'Cotyledons, endosperm, seed coat compared.',
  scheme: [['Number and role of cotyledons', 1], ['Endosperm', 1], ['Seed coat and sheaths', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('flower-short', short({
  marks: 3,
  stem: 'Name the four whorls of a complete flower from outside to inside, and state the function of each.',
  model: 'The **calyx**, made of sepals, protects the flower in the bud. The **corolla**, made of petals, is often brightly coloured and **attracts insects** for pollination. The **androecium**, made of stamens with anthers, is the **male** part and produces **pollen**. The **gynoecium**, made of carpels with stigma, style and ovary, is the **female** part and contains the **ovules**.',
  sol: 'Four whorls with functions.',
  scheme: [['Calyx and corolla with functions', 1], ['Androecium with function', 1], ['Gynoecium with function', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('flower-long', long({
  stem: 'Describe the parts of a typical flower, and explain the terms actinomorphic, zygomorphic, hypogynous and epigynous with one example each.',
  model: '**Parts.** A flower arises on a **pedicel** and a swollen **thalamus**. The **calyx** (sepals) protects the bud; the **corolla** (petals) attracts insects; the **androecium** is made of stamens, each with a filament and an anther that makes pollen; the **gynoecium** is made of carpels, each with a stigma, style and an ovary containing ovules.\n\n**Symmetry.** A flower that can be divided into two equal radial halves in any vertical plane is **actinomorphic** (mustard); one divisible in only one plane is **zygomorphic** (pea).\n\n**Ovary position.** In a **hypogynous** flower the ovary is superior, above the other whorls (china rose). In an **epigynous** flower the ovary is inferior, below them (guava).',
  sol: 'Parts, symmetry, ovary position.',
  scheme: [['Pedicel, thalamus, calyx and corolla', 1], ['Androecium and gynoecium parts', 1.5], ['Actinomorphic and zygomorphic with examples', 1], ['Hypogynous and epigynous with examples', 1.5]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [2],
}));
add('seed-long', long({
  stem: 'Describe the structure of a bean seed and of a maize grain, and bring out four differences between them.',
  model: '**Bean (dicot).** The seed has a **seed coat** of outer testa and inner tegmen, a scar called the **hilum**, and a tiny pore, the **micropyle**. The embryo has an **embryonal axis** with a **radicle** and a **plumule**, and **two fleshy cotyledons** that store food; there is no endosperm in the mature seed.\n\n**Maize (monocot).** The **membranous seed coat is fused with the fruit wall**. A large **endosperm**, bounded by a proteinaceous **aleurone layer**, stores food. A single shield-shaped **scutellum** lies on one side of the embryonal axis; the plumule is covered by the **coleoptile** and the radicle by the **coleorhiza**.\n\n**Differences:** number of cotyledons, endosperm, seed coat and coleoptile with coleorhiza.',
  sol: 'Both seeds described; four differences.',
  scheme: [['Bean: coat, hilum, micropyle', 1], ['Bean: embryo, cotyledons', 1], ['Maize: coat, endosperm, aleurone', 1], ['Maize: scutellum, coleoptile, coleorhiza', 1], ['Four differences', 1]],
  wl: [80, 240],
  d: 3, c: 'understanding', t: [2],
}));
add('catalog-long', long({
  stem: 'A student wrote this herbarium note about a plant: “Roots: fibrous, so the plant is a dicot. Leaves: parallel venation. Flower: ovary above the other whorls, so it is epigynous. Fruit: develops from the ovary after fertilisation. Seed: has one cotyledon.” Evaluate each statement, correct any error, and decide whether the plant is a monocot or a dicot.',
  model: '**Roots.** Fibrous roots are typical of **monocots**, not dicots; the statement “so it is a dicot” is **wrong**. **Leaves.** Parallel venation is typical of monocots and agrees with fibrous roots. **Flower.** An ovary above the other whorls is **superior**, which makes the flower **hypogynous**; epigynous flowers have an inferior ovary, so this is **wrong**. **Fruit.** A fruit is a mature ovary, usually after fertilisation, so this is **correct**. **Seed.** One cotyledon is a **monocot** character.\n\n**Judgement.** Three observations agree and point to a **monocot**; the two errors are the dicot conclusion and the word epigynous, which should be hypogynous.',
  sol: 'Evaluates five statements; plant is a monocot.',
  scheme: [['Roots: fibrous means monocot', 1], ['Leaves and seed consistent with monocot', 1], ['Flower: hypogynous, not epigynous', 1.5], ['Fruit statement correct', 0.5], ['Reasoned conclusion: monocot', 1]],
  wl: [80, 240],
  d: 4, c: 'evaluation', t: [1, 2],
}));
{
  const lemon = N.lemonSeeds;
  add('flower-case', mk.case({
    passage: `A seed company technician examines a lemon flower. She notes that the sepals, petals and stamens arise below the ovary. She cuts the ovary across and sees 5 chambers, with the ovules attached to the central axis where the partitions meet, 4 ovules in each chamber. Later, when the fruit ripened, 75 percent of the ovules had become seeds.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'What type of placentation does the lemon ovary show?',
        right: 'Axile',
        wrong: ['Parietal', 'Basal', 'Marginal'],
        sol: 'Ovules attached to the central axis of a multi-chambered ovary show axile placentation — option (@K).',
        d: 1, c: 'application', t: [2],
      })),
      part('b', num({
        stem: 'How many seeds does one lemon fruit contain?',
        value: lemon,
        sol: r`Ovules: $5 \times 4 = ${N.lemonOvules}$. Seeds: $${N.lemonOvules} \times \dfrac{75}{100} = ${lemon}$.`,
        scheme: [[`${lemon}`, 1]],
        d: 2, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'What name is given to a flower in which the other whorls arise below the ovary? State the position of the ovary in such a flower and give one other example of such a flower.',
        model: 'Such a flower is **hypogynous**. The gynoecium is at the highest position on the thalamus, so the ovary is **superior**, lying above the other whorls. Other examples are **mustard, china rose** and **brinjal**.',
        sol: 'Hypogynous, superior ovary, example.',
        scheme: [['Hypogynous; ovary superior', 1], ['Another example', 1]],
        d: 2, c: 'application', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'After fertilisation, which part of the lemon flower becomes the fruit and which parts become the seeds? Name the three layers of the fruit wall.',
          model: 'The **ovary** becomes the **fruit** and the **ovules** become the **seeds**. The fruit wall, the **pericarp**, has three layers: the outer **epicarp**, the middle **mesocarp** and the inner **endocarp**.',
          sol: 'Ovary to fruit; ovules to seeds; pericarp layers.',
          scheme: [['Ovary becomes fruit; ovules become seeds', 1], ['Epicarp, mesocarp, endocarp', 1]],
          d: 2, c: 'understanding', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 15 || 'value');
}
{
  const endo = N.maizeEndo;
  add('seed-case', mk.case({
    passage: `A student dissects a soaked maize grain and a soaked bean seed. In the maize grain she finds that the thin outer covering cannot be peeled away from the grain, and that most of the grain is a starchy tissue with a small embryo on one side. A 250 g sample of grain was found to be 82 percent endosperm. In the bean she finds two large, fleshy halves and no starchy tissue outside the embryo.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which part of the maize grain is the single cotyledon of the embryo?',
        right: 'Scutellum',
        wrong: ['Coleoptile', 'Aleurone layer', 'Coleorhiza'],
        sol: 'The scutellum is the single shield-shaped cotyledon of the maize embryo; the coleoptile and coleorhiza are protective sheaths and the aleurone layer bounds the endosperm — option (@K).',
        d: 1, c: 'recall', t: [2],
      })),
      part('b', num({
        stem: 'How many grams of endosperm are there in the 250 g sample?',
        value: endo, unit: 'g',
        sol: r`$250 \times \dfrac{82}{100} = ${endo}$ g.`,
        scheme: [[`${endo} g`, 1]],
        d: 2, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'The student finds that the outer covering of the maize grain cannot be peeled off. Explain why, and say where the bean seed stores its food.',
        model: 'In maize the **membranous seed coat is fused with the fruit wall**, so the covering cannot be separated; the grain is a fruit that looks like a seed. The bean has **no endosperm** in the mature seed; it stores food in its **two fleshy cotyledons**.',
        sol: 'Fused coat and fruit wall; bean stores food in cotyledons.',
        scheme: [['Seed coat fused with fruit wall in maize', 1], ['Bean food in cotyledons; no endosperm', 1]],
        d: 2, c: 'application', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'Name the layer that bounds the endosperm of the maize grain, and the two sheaths that cover the plumule and the radicle.',
          model: 'The **aleurone layer**, rich in protein, bounds the endosperm. The **coleoptile** covers the plumule and the **coleorhiza** covers the radicle; they protect these parts as the seedling pushes out of the grain.',
          sol: 'Aleurone layer, coleoptile, coleorhiza.',
          scheme: [['Aleurone layer', 1], ['Coleoptile over plumule; coleorhiza over radicle', 1]],
          d: 2, c: 'understanding', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 205 || 'value');
}

// ---------------------------------------------------------------- t03 family Solanaceae
add('soleco-mcq', mcq({
  stem: 'A pharmacist stocks ashwagandha and belladonna, two medicinal plants, and also sells tobacco leaves and petunia seeds. Which family do all four plants belong to?',
  right: 'Solanaceae, the family of potato and tomato',
  wrong: ['Brassicaceae, the family of mustard', 'Fabaceae, the family of pea', 'Liliaceae, the family of onion'],
  sol: 'Ashwagandha, belladonna, tobacco and petunia are all Solanaceae, as are potato, tomato, brinjal and chilli — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('solveg-mcq', mcq({
  stem: 'Which description fits the leaves of a typical member of the Solanaceae?',
  right: 'Alternate, simple, without stipules, with reticulate venation',
  wrong: ['Opposite, pinnately compound, with stipules and parallel venation', 'Whorled, simple, without stipules, with parallel venation', 'Alternate, palmately compound, with stipules and parallel venation'],
  sol: 'Solanaceae have alternate, simple leaves (rarely pinnately compound), without stipules and with reticulate venation — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('solflower-mcq', mcq({
  stem: 'Which description of the gynoecium of a flower of the Solanaceae is correct?',
  right: 'Bicarpellary and syncarpous, with a superior two-chambered ovary and swollen placentae bearing many ovules',
  wrong: ['Tricarpellary and apocarpous, with an inferior ovary and a single basal ovule', 'Monocarpellary, with marginal placentation and one chamber', 'Pentacarpellary and syncarpous, with an inferior one-chambered ovary'],
  sol: 'Solanaceae have two united carpels forming a superior, two-chambered ovary with swollen placentae and many ovules — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('formula-mcq', mcq({
  stem: `The floral formula of a flower is ${fx(FLOWERS.solanum)}. This flower is`,
  right: 'radially symmetrical, with united sepals and petals, five stamens and two united carpels in a superior ovary',
  wrong: ['bilaterally symmetrical, with free sepals and petals, five stamens and two free carpels in an inferior ovary', 'radially symmetrical, with united sepals and petals, five united stamens and two free carpels in an inferior ovary', 'radially symmetrical, with free sepals and petals, ten stamens and five united carpels in a superior ovary'],
  sol: 'The circle with a plus sign is radial symmetry; brackets on K and C show united sepals and petals; A with no bracket gives five free stamens; G with a line below and (2) is two united carpels with a superior ovary — option (@K).',
  d: 2, c: 'application', t: [3],
}), () => SOL_FACTS.gamosepalous && SOL_FACTS.gamopetalous && SOL_FACTS.syncarpous && SOL_FACTS.superior || 'facts');
add('formula2-mcq', mcq({
  stem: 'A flower is radially symmetrical, with four free sepals, four free petals, six free stamens and a single carpel whose ovary lies below the other whorls. Which is its floral formula?',
  right: fx(FLOWERS.imaginary),
  wrong: [
    fx({ ...FLOWERS.imaginary, K: { n: 4, fused: true }, C: { n: 4, fused: true } }),
    fx({ ...FLOWERS.imaginary, G: { ...FLOWERS.imaginary.G, pos: 'superior' } }),
    fx({ ...FLOWERS.imaginary, sym: 'zygo' }),
  ],
  sol: 'Free members have no brackets: K with 4, C with 4, A with 6; a single carpel is G with 1; the line above G marks an inferior ovary; the circle with a plus sign marks radial symmetry — option (@K).',
  d: 3, c: 'analysis', t: [3],
}), () => formulaTex(FLOWERS.imaginary) === '\\oplus\\ K_{4}\\ C_{4}\\ A_{6}\\ \\overline{G}_{1}' || 'tex');
add('sol-ar', ar({
  a: 'The ovary of a Solanum flower is superior.',
  r: 'The ovary of a Solanum flower is made of a single carpel.',
  key: 'c',
  sol: 'A is true; R is false, because the ovary is bicarpellary and syncarpous — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
add('brackets-ar', ar({
  a: 'In the formula K(5), the brackets show that the five sepals are free from one another.',
  r: 'In a floral formula, brackets round a number show that the members of that whorl are united.',
  key: 'd',
  sol: 'A is false: brackets show united sepals. R is true — option (d).',
  d: 3, c: 'application', t: [3],
}));
add('formula-tf', tf({
  stem: 'In the floral formula of Solanaceae, the line below the letter G shows that the ovary is inferior.',
  key: 'f',
  sol: 'False. A line below G shows a superior ovary; a line above G shows an inferior ovary.',
  d: 1, c: 'understanding', t: [3],
}));
add('united-fill', fill({
  stem: 'In the floral formula K(5) C(5) A5 G(2), the brackets round 5 and 2 show that the members of those whorls are ______.',
  acc: [['united', 'fused', 'joined']],
  sol: 'United (fused).',
  d: 1, c: 'recall', t: [3],
}));
add('stam-num', num({
  stem: 'A Solanum flower has the formula given for Solanaceae. How many stamens are there altogether in 40 such flowers?',
  value: N.stamens40,
  sol: r`Each flower has A with 5, so five stamens: $40 \times 5 = ${N.stamens40}$.`,
  scheme: [[`${N.stamens40}`, 1]],
  d: 1, c: 'application', t: [3],
}), (q) => q.answer.value === stamensIn(40, 5) || 'value');
add('sol-short2', short({
  marks: 2,
  stem: 'Write the floral formula of the family Solanaceae and explain what the symbols ⊕, K(5) and G with a line below it mean.',
  model: `The formula is ${fx(FLOWERS.solanum)}. The symbol **⊕** means the flower is **actinomorphic**. **K(5)** means **five sepals, united** in brackets. The **line below G** means the **ovary is superior**, and G(2) means two united carpels.`,
  sol: 'Formula and meaning of the symbols.',
  scheme: [['Correct formula', 1], ['Meaning of ⊕, K(5) and the line below G', 1]],
  d: 1, c: 'understanding', t: [3],
}));
add('formula-short2', short({
  marks: 2,
  stem: `A flower has the floral formula ${fx(FLOWERS.zygo)}. Describe the flower in words.`,
  model: 'The **%** sign shows a **zygomorphic** flower. It has **five united sepals** (brackets), **five free petals**, **ten stamens** and a **single carpel** with a **superior ovary** (line below G).',
  sol: 'Zygomorphic; K(5), C5, A10, G1 superior.',
  scheme: [['Symmetry and calyx', 1], ['Corolla, stamens, carpel and ovary position', 1]],
  d: 2, c: 'application', t: [3],
}), () => facts(FLOWERS.zygo).members === 21 || 'facts');
add('sol-short3', short({
  marks: 3,
  stem: 'Describe the vegetative characters and the fruit of the family Solanaceae, and name two plants of the family that give food.',
  model: 'Solanaceae are mostly **herbs, shrubs or small trees**. The stem is herbaceous and rarely woody, **aerial or underground** as in potato. The leaves are **alternate, simple**, rarely pinnately compound, **without stipules**, with **reticulate venation**. The fruit is a **berry or capsule** with many **endospermous** seeds. Food plants are **potato, tomato and brinjal**.',
  sol: 'Habit, stem, leaves, fruit, food plants.',
  scheme: [['Habit and stem', 1], ['Leaves and venation', 1], ['Fruit, seeds and food plants', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('sol-long', long({
  stem: 'Describe the family Solanaceae under the following heads: vegetative characters, inflorescence and flower (with floral formula), fruit and seed, and economic importance. Name the parts shown in its floral diagram.',
  model: `**Vegetative.** Herbs, shrubs or small trees; stem aerial or underground (potato); leaves alternate, simple, without stipules, with reticulate venation.\n\n**Flower.** Inflorescence solitary, axillary or cymose. The flower is bisexual and actinomorphic, with five united sepals, five united petals, five epipetalous stamens and a bicarpellary, syncarpous, superior, two-chambered ovary with many ovules on swollen placentae. Formula: ${fx(FLOWERS.solanum)}.\n\n**Fruit and seed.** Berry or capsule; many endospermous seeds.\n\n**Importance.** Food: potato, tomato, brinjal; spice: chilli; medicine: ashwagandha, belladonna; tobacco; ornamental petunia.\n\n**Floral diagram.** Mother axis, five united sepals, five united petals, five stamens attached to the petals, two united carpels.`,
  sol: 'Vegetative, floral, fruit, uses, diagram.',
  scheme: [['Vegetative characters', 1], ['Flower description and formula', 1.5], ['Fruit and seed', 0.5], ['Economic importance', 1], ['Parts in the floral diagram', 1]],
  wl: [80, 260],
  d: 2, c: 'understanding', t: [3],
}));
{
  const a = facts(FLOWERS.solanum);
  const b = facts(FLOWERS.imaginary);
  add('formula-long', long({
    stem: `Two flowers have the floral formulae X: ${fx(FLOWERS.solanum)} and Y: ${fx(FLOWERS.imaginary)}. Compare the two flowers in symmetry, fusion of the sepals, the position of the ovary and the number of floral members, and say which could belong to the Solanaceae.`,
    model: `**Symmetry.** Both formulae carry the circle with a plus sign, so both flowers are **actinomorphic**.\n\n**Fusion of sepals.** X has K(5) in brackets, so its five sepals are **united**; Y has K with 4 and no brackets, so its four sepals are **free**.\n\n**Ovary.** In X the line is below G, so the ovary is **superior** and the flower hypogynous; in Y the line is above G, so the ovary is **inferior** and the flower epigynous.\n\n**Members.** X has 5 + 5 + 5 + 2 = ${a.members}; Y has 4 + 4 + 6 + 1 = ${b.members}.\n\n**Family.** X matches the Solanaceae formula: united sepals and petals, five stamens, two united carpels, superior ovary. Y does not.`,
    sol: 'Compares symmetry, sepals, ovary and number of members; X is Solanaceae.',
    scheme: [['Symmetry', 0.5], ['Fusion of sepals', 1], ['Ovary position', 1.5], ['Member counts', 1], ['Family decision with reason', 1]],
    wl: [80, 240],
    d: 3, c: 'analysis', t: [3],
  }), () => a.members === 17 && b.members === 15 || 'members');
}
{
  const tot = SOL_FACTS.members;
  add('solanum-case', mk.case({
    passage: `A student studies a brinjal flower and records its floral formula as ${fx(FLOWERS.solanum)}. She draws a floral diagram, placing the mother axis at the top, and finds that each of the five stamens is attached to a petal. The fruit she collects is a berry with many seeds.\n\n| Whorl | Calyx | Corolla | Androecium | Gynoecium |\n|---|---|---|---|---|\n| Number of members | 5 | 5 | 5 | 2 |`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'What does the line drawn below the letter G in the formula show?',
        right: 'The ovary is superior',
        wrong: ['The ovary is inferior', 'The carpels are free from each other', 'The flower is zygomorphic'],
        sol: 'A line below G marks a superior ovary — option (@K).',
        d: 1, c: 'understanding', t: [3],
      })),
      part('b', num({
        stem: 'Using the table, how many floral members does the flower have in all?',
        value: tot,
        sol: r`$5 + 5 + 5 + 2 = ${tot}$ members.`,
        scheme: [[`${tot}`, 1]],
        d: 1, c: 'application', t: [3],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain why the stamens of this flower are described as epipetalous, and say how the student’s floral diagram shows this.',
        model: '**Epipetalous** stamens have their filaments **attached to the petals**. In the floral diagram each stamen is drawn alternating with the petals and **joined to the corolla** by a line, which shows that the androecium is fused with the corolla.',
        sol: 'Epipetalous: stamens attached to petals; diagram joins them.',
        scheme: [['Definition: stamens attached to petals', 1], ['Diagram shows stamens joined to corolla', 1]],
        d: 2, c: 'application', t: [3],
      }), [
        short({
          marks: 2,
          stem: 'Explain why the gynoecium of the brinjal flower is called bicarpellary and syncarpous, and name its placentation.',
          model: 'It is **bicarpellary** because it has **two carpels**, shown by G(2). It is **syncarpous** because the carpels are **united**, so they form one ovary with two chambers. The ovules are borne on swollen placentae in the centre: **axile placentation**.',
          sol: 'Two carpels, united, axile placentation.',
          scheme: [['Two carpels; united', 1], ['Two chambers with axile placentation', 1]],
          d: 2, c: 'understanding', t: [3],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 17 || 'value');
}
void round;
