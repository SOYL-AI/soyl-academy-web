// ISC 11 Biology ch07 Morphology of the Flower and Inflorescence — Part 1 (t01 the flower, t02 calyx and corolla, t03 androecium),
// Part 2 (t04 gynoecium, t05 inflorescence).
import { sl, deck, table, flow, svgV } from '../../isc-11-biology-ch01/src/lib.mjs';
import { FLOWER_NAMED, AESTIVATION, STAMENS, ANTHERS, OVARY_POS, PLAC_NAMED, INFLORESCENCE } from './svgs.mjs';
import { PENTA, PENTA_MEMBERS, PENTA_ESSENTIAL, LILY, LILY_MEMBERS, HIBISCUS, HIBISCUS_SACS, SACS, SACS_IF_DITHECOUS, SUNFLOWER_FLORET, SUNFLOWER_SACS, OVARY, OVULES, SEEDS, RACEME, RACEME_GAP, RACEME_DAY20, RACEME_CLOSED20, CYME, CYME_LAST } from './calc.mjs';

export const V = {
  flower: svgV(FLOWER_NAMED, 'A flower in longitudinal section with pedicel, thalamus, sepals, petals, stamens and carpel'),
  aest: svgV(AESTIVATION, 'Valvate, twisted, imbricate and vexillary aestivation'),
  stamens: svgV(STAMENS, 'Monadelphous, diadelphous, polyadelphous, syngenesious, epipetalous and epiphyllous stamens'),
  anthers: svgV(ANTHERS, 'A dithecous and a monothecous anther in transverse section'),
  ovary: svgV(OVARY_POS, 'Hypogynous, perigynous and epigynous flowers in longitudinal section'),
  plac: svgV(PLAC_NAMED, 'Axile, parietal, free central, basal and marginal placentation'),
  inflo: svgV(INFLORESCENCE, 'Racemose and cymose inflorescence with the order of opening of flowers'),
};

export const deck1 = deck({
  part: 1,
  title: 'Morphology of the Flower and Inflorescence — Part 1: The flower, calyx and corolla, androecium',
  goals: [
    'Draw and label a typical flower and describe it by symmetry, merous condition and completeness',
    'Identify the types of aestivation of the calyx and corolla',
    'Name the cohesion and adhesion of stamens and distinguish monothecous from dithecous anthers',
  ],
  slides: [
    sl('title', 'The flower and its parts', {
      b: 'Part 1 — the four whorls of a flower, and how the outer whorls and the stamens are described.',
      v: flow('LR', [['t', 'Thalamus'], ['c', 'Calyx'], ['o', 'Corolla'], ['a', 'Androecium'], ['g', 'Gynoecium']], [['t', 'c'], ['c', 'o'], ['o', 'a'], ['a', 'g']], 'Four whorls arranged on the thalamus from outside to inside: calyx, corolla, androecium and gynoecium'),
      n: 'The flower is the reproductive shoot of a flowering plant. Its parts are arranged in rings, called whorls, on the swollen tip of the stalk, the thalamus. From outside to inside they are the calyx, corolla, androecium and gynoecium.',
    }),
    sl('diagram', 'A typical flower', {
      b: 'A flower sits on a stalk, the **pedicel**. The **calyx** (sepals) and **corolla** (petals) are the non-essential whorls; the **androecium** (stamens) and **gynoecium** (carpels) are the essential whorls.',
      v: V.flower,
      n: 'The outer green sepals form the calyx, and the coloured petals form the corolla. Inside are the stamens, each with a filament and an anther that holds pollen. At the centre is the carpel, with a stigma to receive pollen, a style, and an ovary containing ovules.',
    }),
    sl('concept', 'Bracteate, ebracteate and symmetry', {
      b: 'Flowers are described by whether a **bract** is present and by how they can be cut into equal halves.',
      v: table(['Term', 'Meaning', 'Example'], [['Bracteate', 'A small leaf, the bract, arises at the base of the pedicel', 'Bougainvillea'], ['Ebracteate', 'No bract at the base of the pedicel', 'Mustard'], ['Actinomorphic', 'Radially symmetrical: cut into equal halves by any vertical plane through the centre', 'Datura, lily'], ['Zygomorphic', 'Bilaterally symmetrical: equal halves by one vertical plane only', 'Gulmohar, bean'], ['Asymmetric', 'No vertical plane gives equal halves', 'Canna']], 'Table of bracteate, ebracteate, actinomorphic, zygomorphic and asymmetric flowers with examples'),
      n: 'A flower with a bract at the base of its stalk is bracteate; one without is ebracteate. A radially symmetrical flower such as datura can be halved in many planes. A zygomorphic flower such as gulmohar has just one plane, and an asymmetric flower such as canna has none.',
    }),
    sl('concept', 'Merous condition; complete and incomplete flowers', {
      b: 'The number of members in each whorl gives the **merous** condition. A flower with all four whorls is **complete**; one that lacks any whorl is **incomplete**.',
      v: table(['Term', 'Meaning', 'Example'], [['Trimerous', 'Whorls in threes', 'Lily (monocot)'], ['Tetramerous', 'Whorls in fours', 'Mustard'], ['Pentamerous', 'Whorls in fives', 'Most dicots, such as datura'], ['Complete flower', 'Calyx, corolla, androecium and gynoecium all present', 'Datura'], ['Incomplete flower', 'One or more whorls missing', 'Male flower of pumpkin: no gynoecium']], 'Table of merous condition and of complete and incomplete flowers'),
      n: 'Count the members in each whorl. Threes make the flower trimerous, fours tetramerous, fives pentamerous. A flower is complete only when all four whorls are present. The male flower of the pumpkin has no carpels, so it is incomplete.',
    }),
    sl('example', 'Worked example 1: describing a flower', {
      b: `A flower has ${PENTA.sepals} sepals, ${PENTA.petals} petals, ${PENTA.stamens} stamens and ${PENTA.carpels} carpels. It can be cut into equal halves by many planes. Describe it.`,
      ul: [
        `Five sepals, five petals and five stamens: the whorls are in fives, so it is **pentamerous**.`,
        `Calyx, corolla, androecium and gynoecium are all present: it is a **complete** flower.`,
        `Equal halves along many vertical planes: **actinomorphic**.`,
        `Members altogether: ${PENTA.sepals} + ${PENTA.petals} + ${PENTA.stamens} + ${PENTA.carpels} = ${PENTA_MEMBERS}; of these ${PENTA_ESSENTIAL} belong to the essential whorls.`,
      ],
      v: table(['Whorl', 'Members'], [['Calyx', String(PENTA.sepals)], ['Corolla', String(PENTA.petals)], ['Androecium', String(PENTA.stamens)], ['Gynoecium', String(PENTA.carpels)], ['Total', String(PENTA_MEMBERS)]], `Worked table: ${PENTA_MEMBERS} members in all`),
      n: 'Take the description in steps. First count the members in each whorl, then see whether every whorl is there, then test the symmetry. This flower is pentamerous, complete and radially symmetrical, with seventeen members in all, seven of them in the essential whorls.',
    }),
    sl('check', 'Quick check: symmetry', {
      b: 'Which flower can be cut into two equal halves by only one vertical plane?',
      n: 'Quick check. How many planes of symmetry has the flower?',
      chk: 'ck-symm-mcq',
    }),
    sl('concept', 'Calyx, corolla and perianth', {
      b: 'The sepals may be free (**polysepalous**) or joined (**gamosepalous**); the petals free (**polypetalous**) or joined (**gamopetalous**). When the calyx and corolla look alike they form a **perianth**, whose members are tepals.',
      v: table(['Whorl', 'Free', 'Joined'], [['Calyx (sepals)', 'Polysepalous', 'Gamosepalous'], ['Corolla (petals)', 'Polypetalous', 'Gamopetalous']], 'Table of free and joined sepals and petals'),
      n: 'Joined members carry the prefix gamo, free ones the prefix poly. In a lily the calyx and corolla cannot be told apart, and together they are called the perianth, whose six parts are tepals.',
    }),
    sl('diagram', 'Aestivation', {
      b: '**Aestivation** is the arrangement of sepals or petals in the bud, in relation to one another.',
      v: V.aest,
      n: 'In valvate aestivation the edges just touch, as in Calotropis. In twisted aestivation each petal overlaps the next, as in cotton. In imbricate aestivation one is wholly outside and one wholly inside, as in gulmohar. In vexillary aestivation a large standard covers two wings, which cover two keel petals, as in the pea.',
    }),
    sl('check', 'Quick check: aestivation', {
      b: 'Name the aestivation of a pea flower.',
      n: 'Quick check. Which petal is the largest and lies outermost in the bud?',
      chk: 'ck-aest-mcq',
    }),
    sl('diagram', 'Androecium: cohesion and adhesion', {
      b: 'Stamens may be **free** or **united**. Union among stamens is **cohesion**; union with another whorl is **adhesion**.',
      v: V.stamens,
      n: 'Cohesion means stamens joined to each other. Monadelphous stamens form one bundle, diadelphous two, polyadelphous many. In syngenesious stamens only the anthers are joined. Adhesion means stamens attached to another whorl: to the petals, epipetalous, or to the tepals, epiphyllous.',
    }),
    sl('diagram', 'Anthers: monothecous and dithecous', {
      b: 'A **dithecous** anther has two lobes (thecae), each with two pollen sacs; a **monothecous** anther has one lobe with two pollen sacs.',
      v: V.anthers,
      n: 'Most anthers are bilobed, or dithecous, with two lobes joined by the connective and four pollen sacs in all. The kidney-shaped anther of hibiscus and cotton has a single lobe, so it is monothecous, with just two pollen sacs.',
    }),
    sl('example', 'Worked example 2: counting pollen sacs', {
      b: `A hibiscus flower has ${HIBISCUS.stamens} stamens, each monothecous. A sunflower floret has ${SUNFLOWER_FLORET.stamens} stamens, each dithecous. Find the pollen sacs in each.`,
      ul: [
        `A monothecous anther has ${SACS.monothecous} pollen sacs, so the hibiscus flower has ${HIBISCUS.stamens} × ${SACS.monothecous} = ${HIBISCUS_SACS}.`,
        `A dithecous anther has ${SACS.dithecous} pollen sacs, so the floret has ${SUNFLOWER_FLORET.stamens} × ${SACS.dithecous} = ${SUNFLOWER_SACS}.`,
        `If the hibiscus anthers were dithecous the flower would have ${SACS_IF_DITHECOUS}, twice as many.`,
      ],
      v: table(['Flower', 'Stamens', 'Pollen sacs per anther', 'Pollen sacs'], [['Hibiscus', String(HIBISCUS.stamens), String(SACS.monothecous), String(HIBISCUS_SACS)], ['Sunflower floret', String(SUNFLOWER_FLORET.stamens), String(SACS.dithecous), String(SUNFLOWER_SACS)]], `Worked table: ${HIBISCUS_SACS} pollen sacs in hibiscus, ${SUNFLOWER_SACS} in a sunflower floret`),
      n: 'Multiply the number of stamens by the number of pollen sacs in one anther. A monothecous anther has two, a dithecous one has four. So sixty monothecous stamens give one hundred twenty sacs, and five dithecous stamens give twenty.',
    }),
    sl('check', 'Quick check: stamens', {
      b: 'In which condition are the stamens of a pea flower?',
      n: 'Quick check. Nine filaments are joined and one stands free.',
      chk: 'ck-andro-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Whorls: calyx, corolla, androecium, gynoecium on the thalamus.',
        'Described by bract, symmetry (actinomorphic, zygomorphic, asymmetric), merous condition and completeness.',
        'Calyx and corolla: gamo- or poly-; perianth when alike; aestivation valvate, twisted, imbricate, vexillary.',
        'Stamens: cohesion (mono-, di-, polyadelphous, syngenesious), adhesion (epipetalous, epiphyllous).',
        'Anthers: dithecous (four sacs) or monothecous (two sacs).',
      ],
      v: table(['Condition', 'Example'], [['Valvate', 'Calotropis'], ['Twisted', 'Cotton'], ['Imbricate', 'Gulmohar'], ['Vexillary', 'Pea'], ['Diadelphous', 'Pea'], ['Syngenesious', 'Sunflower']], 'Summary table of aestivation and stamen conditions with examples'),
      n: 'To recap: describe a flower by its bracts, symmetry, merous condition and completeness; name the aestivation of its calyx and corolla; and state the cohesion or adhesion of its stamens and whether its anthers have one lobe or two.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Say **which** whorl is missing when you call a flower incomplete.',
        'Give an **example** with every term: pea for diadelphous, sunflower for syngenesious, hibiscus for monadelphous.',
        'Do not mix **cohesion** (stamens with stamens) and **adhesion** (stamens with another whorl).',
        'Count pollen sacs: **four** in a dithecous anther, **two** in a monothecous one.',
      ],
      n: 'Exam tips. When you call a flower incomplete, name the missing whorl. Give an example for every term. Keep cohesion and adhesion apart. And remember that a dithecous anther has four pollen sacs and a monothecous anther has two.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Morphology of the Flower and Inflorescence — Part 2: Gynoecium and inflorescence',
  goals: [
    'Identify hypogynous, perigynous and epigynous flowers from diagrams',
    'Distinguish apocarpous from syncarpous gynoecia and name the five types of placentation',
    'Distinguish racemose from cymose inflorescence by the order in which flowers open',
  ],
  slides: [
    sl('title', 'The gynoecium and the inflorescence', {
      b: 'Part 2 — the carpels at the centre of the flower, and the way flowers are arranged on a shoot.',
      v: flow('LR', [['s', 'Stigma'], ['y', 'Style'], ['o', 'Ovary'], ['u', 'Ovules']], [['s', 'y'], ['y', 'o'], ['o', 'u']], 'The carpel from stigma through style to the ovary that holds the ovules'),
      n: 'A carpel has three parts: the stigma, which receives pollen, the style, and the swollen ovary at the base. The ovary holds the ovules, which become seeds. Flowers themselves are arranged on the shoot in a pattern called the inflorescence.',
    }),
    sl('diagram', 'Position of the ovary', {
      b: 'The position of the ovary relative to the other whorls gives three kinds of flower.',
      v: V.ovary,
      n: 'If the other whorls arise below the ovary, which is superior, the flower is hypogynous. If they arise on the rim of a cup around the ovary, it is perigynous. If the thalamus fuses with the ovary and the whorls arise above it, the ovary is inferior and the flower is epigynous.',
    }),
    sl('concept', 'Hypogynous, perigynous and epigynous', {
      b: 'Compare the three conditions in a table.',
      v: table(['Flower', 'Ovary', 'Other whorls', 'Examples'], [['Hypogynous', 'Superior', 'Arise below the ovary', 'Mustard, datura, tomato'], ['Perigynous', 'Half inferior', 'On the rim of a cup at the level of the ovary', 'Rose, plum'], ['Epigynous', 'Inferior', 'Arise above the ovary', 'Sunflower, cucumber']], 'Table of hypogynous, perigynous and epigynous flowers with ovary position and examples'),
      n: 'Remember the position of the ovary by the prefix. Hypo means below, so the other whorls are below the ovary. Epi means above, so they are above the ovary. In perigynous flowers, as in the rose, they arise round it.',
    }),
    sl('check', 'Quick check: ovary position', {
      b: 'Which flower has an inferior ovary?',
      n: 'Quick check. Where do the sepals and petals arise in relation to the ovary?',
      chk: 'ck-ovary-mcq',
    }),
    sl('concept', 'Apocarpous and syncarpous; locules', {
      b: 'A gynoecium of **free** carpels is **apocarpous**; one of **fused** carpels is **syncarpous**. A **locule** is a chamber of the ovary.',
      v: table(['Feature', 'Apocarpous', 'Syncarpous'], [['Carpels', 'Free from one another', 'Fused together'], ['Ovaries', 'Many, separate', 'One compound ovary'], ['Locules', 'One in each carpel', 'Often as many as the carpels'], ['Example', 'Lotus, rose', 'Tomato, cotton']], 'Table comparing apocarpous and syncarpous gynoecia'),
      n: 'Where the carpels stay separate, each with its own ovary, the gynoecium is apocarpous. Where they fuse into one ovary, it is syncarpous, and the ovary is divided into chambers, the locules, usually as many as the fused carpels.',
    }),
    sl('diagram', 'Placentation', {
      b: '**Placentation** is the arrangement of ovules on the **placenta**, the tissue inside the ovary that bears them.',
      v: V.plac,
      n: 'In axile placentation the ovules sit on a central axis in a chambered ovary. In parietal they lie on the inner wall. In free central they sit on a central column with no partitions. In basal there is one ovule at the base, and in marginal the ovules run along one edge.',
    }),
    sl('concept', 'Types of placentation', {
      b: 'Each type has its own kind of ovary and its own examples.',
      v: table(['Type', 'Where the ovules are borne', 'Examples'], [['Axile', 'Central axis; ovary has several chambers', 'Tomato, lemon, lily'], ['Parietal', 'Inner wall of a one-chambered ovary', 'Mustard, Argemone, cucumber'], ['Free central', 'Central column, no partitions', 'Dianthus, primrose'], ['Basal', 'Base of a one-chambered ovary; one ovule', 'Sunflower, marigold'], ['Marginal', 'Along one margin of a one-carpelled ovary', 'Pea, bean']], 'Table of types of placentation with position of ovules and examples'),
      n: 'Match the type to its ovary. Axile needs a chambered ovary, with the ovules on the axis where the partitions meet. Free central has the column but no partitions. Marginal is found in a single carpel, as in the pea family.',
    }),
    sl('example', 'Worked example 1: carpels, locules and ovules', {
      b: `A syncarpous ovary with axile placentation has ${OVARY.locules} locules, each with ${OVARY.perLocule} ovules. How many carpels fused to form it, how many ovules are there, and how many seeds form if three of every four ovules develop into seeds?`,
      ul: [
        `With axile placentation the number of locules equals the number of fused carpels: **${OVARY.locules} carpels**.`,
        `Ovules = ${OVARY.locules} × ${OVARY.perLocule} = **${OVULES}**.`,
        `Seeds = ${OVULES} ÷ 4 × 3 = **${SEEDS}**.`,
      ],
      v: table(['Step', 'Result'], [['Carpels fused', String(OVARY.locules)], ['Ovules', String(OVULES)], ['Seeds', String(SEEDS)]], `Worked table: ${OVARY.locules} carpels, ${OVULES} ovules, ${SEEDS} seeds`),
      n: 'In an axile ovary there is one locule for each fused carpel, so four locules mean four carpels. Multiply locules by ovules in each to find the total. Then take three quarters for the seeds that develop.',
    }),
    sl('check', 'Quick check: placentation', {
      b: 'Study the lettered figure of five ovaries and answer the question.',
      n: 'Quick check. Look at where the ovules are attached.',
      chk: 'ck-plac-mcq',
    }),
    sl('diagram', 'Inflorescence', {
      b: 'An **inflorescence** is the arrangement of flowers on the floral axis. In **racemose** inflorescences the main axis keeps growing; in **cymose** inflorescences it ends in a flower.',
      v: V.inflo,
      n: 'In the racemose type the main axis goes on growing, and the flowers open from the base upward, so the youngest is near the tip. In the cymose type the axis ends in a flower, which opens first, and the younger flowers lie below it.',
    }),
    sl('concept', 'Racemose and cymose compared', {
      b: 'The two kinds differ in the main axis and in the order of opening of flowers.',
      v: table(['Feature', 'Racemose', 'Cymose'], [['Main axis', 'Grows indefinitely', 'Ends in a flower; growth stops'], ['Order of opening', 'Oldest at the base, youngest at the tip (acropetal)', 'Oldest at the top, youngest below (basipetal)'], ['Examples', 'Radish, golden shower tree', 'Jasmine, Bougainvillea']], 'Table comparing racemose and cymose inflorescence'),
      n: 'The key test is the main axis. If it keeps growing and flowers open from the base upward, the inflorescence is racemose, as in radish. If the axis ends in a flower and the younger flowers are below, it is cymose, as in jasmine.',
    }),
    sl('example', 'Worked example 2: order of opening', {
      b: `A radish raceme has ${RACEME.flowers} flowers; one opens every ${RACEME.everyDays} days, starting from the base. (a) How many days separate the opening of the lowest and the topmost flower? (b) How many flowers are open on day 20? A jasmine cyme has ${CYME.flowers} flowers; the first opens on day 0 and one more every ${CYME.everyDays} days. (c) On which day does the youngest open?`,
      ul: [
        `(a) ${RACEME.flowers - 1} gaps × ${RACEME.everyDays} days = **${RACEME_GAP} days**.`,
        `(b) Flowers opened by day 20: 20 ÷ ${RACEME.everyDays} + 1 = **${RACEME_DAY20}**, leaving ${RACEME_CLOSED20} buds.`,
        `(c) ${CYME.flowers - 1} gaps × ${CYME.everyDays} days = day **${CYME_LAST}**.`,
      ],
      v: table(['Part', 'Answer'], [['(a)', `${RACEME_GAP} days`], ['(b)', `${RACEME_DAY20} open`], ['(c)', `Day ${CYME_LAST}`]], `Worked table: ${RACEME_GAP} days, ${RACEME_DAY20} flowers, day ${CYME_LAST}`),
      n: 'With a number of flowers, there is one gap less than the number of flowers. Multiply the gaps by the interval to find the time between the first and the last. To count open flowers, divide the day by the interval and add the flower that opened on day zero.',
    }),
    sl('check', 'Quick check: inflorescence', {
      b: 'True or false about the order of opening in a raceme.',
      n: 'Quick check. Which flowers are the oldest in a raceme?',
      chk: 'ck-inflo-tf',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Ovary position: hypogynous (superior), perigynous (half inferior), epigynous (inferior).',
        'Apocarpous: free carpels; syncarpous: fused carpels; locules are chambers of the ovary.',
        'Placentation: axile, parietal, free central, basal, marginal.',
        'Inflorescence: racemose (axis keeps growing, flowers open base to tip) and cymose (axis ends in a flower, oldest at the top).',
      ],
      v: table(['Placentation', 'Example'], [['Axile', 'Tomato'], ['Parietal', 'Mustard'], ['Free central', 'Dianthus'], ['Basal', 'Sunflower'], ['Marginal', 'Pea']], 'Summary table of placentation with examples'),
      n: 'To recap: name the position of the ovary, say whether the carpels are free or fused, identify the placentation from the diagram, and tell racemose from cymose by whether the main axis goes on growing and which flowers open first.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'In a diagram of a flower, look at **where the other whorls arise** to name the ovary position.',
        'For placentation, count the **chambers** first, then see where the ovules are attached.',
        'Compare racemose and cymose on **two points**: main axis and order of opening.',
        'Do **not** write the subtypes of inflorescence; they are not in the syllabus.',
      ],
      n: 'Exam tips. To name the ovary position, see where the other whorls arise. For placentation, count the chambers and then see where the ovules are fixed. Compare the two inflorescences on the main axis and the order of opening. You need not learn their subtypes.',
    }),
  ],
});
