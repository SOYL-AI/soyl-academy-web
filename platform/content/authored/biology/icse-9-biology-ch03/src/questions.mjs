// ICSE 9 Biology ch03 The Flower — question bank in ICSE school-examination style (10-mark structured questions).
// Numbers come from calc.mjs. Types of inflorescence and of placentation are a removed topic: only their meaning is asked.
// AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true, R does not explain.
import { mk, add, svgV, r } from '../../icse-9-biology-ch01/src/lib.mjs';
import { PARTS, POLLEN, PAPAYA, ANTHER, MANGO, BUNCH } from './calc.mjs';
import { FLOWER_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const flowerFig = svgV(FLOWER_LETTERED, 'A flower in long section with parts lettered A to E');
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct term', 1]], ...o });

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('thalamus-chk', mcq({
  stem: 'Which part of a flower carries all the whorls?',
  right: 'Thalamus', wrong: ['Style', 'Filament', 'Ovule'],
  sol: 'The swollen tip of the pedicel, the thalamus, carries the whorls — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('complete-chk', mcq({
  stem: 'A flower is called complete when it has',
  right: 'calyx, corolla, androecium and gynoecium', wrong: ['only stamens and a pistil', 'only sepals and petals', 'only a pistil'],
  sol: 'A complete flower has all four whorls — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('corolla-chk', mcq({
  stem: 'Which whorl attracts insects to a flower?',
  right: 'Corolla', wrong: ['Calyx', 'Androecium', 'Gynoecium'],
  sol: 'Brightly coloured petals draw insects — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('stamen-chk', mcq({
  stem: 'Which two parts make up a stamen?',
  right: 'Anther and filament', wrong: ['Stigma and style', 'Sepal and petal', 'Ovary and ovule'],
  sol: 'A stamen is an anther on a filament — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('pistil-chk', mcq({
  stem: 'Which part of the pistil receives the pollen grains?',
  right: 'Stigma', wrong: ['Style', 'Ovary', 'Anther'],
  sol: 'The sticky stigma receives pollen — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('inflo-chk', mcq({
  stem: 'A group of flowers borne together on one flowering axis is called',
  right: 'an inflorescence', wrong: ['a placenta', 'a whorl', 'a thalamus'],
  sol: 'A group of flowers on a flowering axis is an inflorescence — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('placentation-chk', mcq({
  stem: 'The arrangement of ovules inside the ovary is called',
  right: 'placentation', wrong: ['pollination', 'inflorescence', 'fertilisation'],
  sol: 'Placentation is the arrangement of ovules on the placenta — option (@K).',
  d: 1, c: 'recall', t: [3],
}));

// ---------------------------------------------------------------- t01 structure; complete and incomplete flowers
add('complete-mcq', mcq({
  stem: 'A student finds a flower with five green sepals, five red petals, many stamens and one pistil. The flower is',
  right: 'complete and bisexual', wrong: ['incomplete and bisexual', 'complete and unisexual', 'incomplete and unisexual'],
  sol: 'All four whorls are present, so it is complete; it has both stamens and a pistil, so it is bisexual — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('incomplete-mcq', mcq({
  stem: 'On a papaya tree the flowers have petals and stamens but no pistil. These flowers are',
  right: 'incomplete and unisexual', wrong: ['complete and bisexual', 'incomplete and bisexual', 'complete and unisexual'],
  sol: 'The gynoecium is missing, so the flower is incomplete, and it has only stamens, so it is unisexual — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('wheat-mcq', mcq({
  stem: 'A wheat flower has stamens and a pistil but no showy sepals or petals. It is',
  right: 'bisexual but incomplete', wrong: ['complete but unisexual', 'complete and bisexual', 'unisexual and complete'],
  sol: 'It has both essential whorls, so it is bisexual, but two whorls are missing, so it is incomplete — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('figC-mcq', mcq({
  stem: 'In the figure of a flower, which letter marks the part that receives the pollen grains?',
  right: 'C', wrong: ['A', 'B', 'D'],
  sol: 'C is the stigma; A is a petal, B an anther, D the ovary and E a sepal — option (@K).',
  d: 2, c: 'application', t: [2],
  assets: [flowerFig],
}));
add('figB-mcq', mcq({
  stem: 'In the figure of a flower, which letter marks the part in which pollen grains are made?',
  right: 'B', wrong: ['A', 'C', 'E'],
  sol: 'B is the anther, which makes pollen — option (@K).',
  d: 2, c: 'application', t: [2],
  assets: [flowerFig],
}));
add('thalamus-mcq', mcq({
  stem: 'A student pulls off the sepals, petals and stamens of a flower and finds that they were all joined at the swollen tip of the flower stalk. That swollen tip is the',
  right: 'thalamus', wrong: ['style', 'placenta', 'peduncle'],
  sol: 'The thalamus is the swollen tip of the pedicel that carries the whorls — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('ar-complete', ar({
  a: 'A complete flower is always a bisexual flower.',
  r: 'A complete flower has only the calyx and the corolla.',
  key: 'a',
  sol: 'The assertion is true. The reason is false: a complete flower has all four whorls, including stamens and pistil — option (a).',
  d: 3, c: 'analysis', t: [1],
}));
add('unisexual-tf', tf({
  stem: 'Every incomplete flower is unisexual.',
  key: 'f',
  sol: 'False. A wheat flower is incomplete (no sepals or petals) but bisexual.',
  d: 3, c: 'analysis', t: [1],
}));
add('complete-tf', tf({
  stem: 'A complete flower must have both stamens and a pistil.',
  key: 't',
  sol: 'True. All four whorls, including the androecium and gynoecium, are present.',
  d: 2, c: 'understanding', t: [1],
}));
add('fill-pedicel', fill({
  stem: 'The stalk that bears a flower is called the ______.',
  acc: [['pedicel']],
  sol: 'Pedicel.',
  d: 1, c: 'recall', t: [1],
}));
add('term-calyx', term({
  stem: 'Give the biological term: the outermost whorl of a flower, made up of sepals.',
  model: '**Calyx.**', sol: 'Calyx.', sch: 'Calyx',
  d: 1, c: 'recall', t: [1],
}));
add('reason-papaya', term({
  stem: 'Give reason: a papaya flower that has only stamens is called an incomplete flower.',
  model: 'A complete flower needs **all four whorls**; this flower has **no gynoecium** (pistil), so it is incomplete.', sol: 'Gynoecium missing.', sch: 'One whorl missing',
  d: 2, c: 'understanding', t: [1],
}));
add('complete-short', short({
  marks: 2,
  stem: 'Distinguish between a complete flower and an incomplete flower. Give one example of each.',
  model: 'A **complete flower** has all four whorls: calyx, corolla, androecium and gynoecium, for example **Hibiscus**. An **incomplete flower** lacks one or more of them, for example **wheat** or the male flower of **papaya**.',
  sol: 'Four whorls or fewer, with examples.',
  scheme: [['Complete: four whorls, example', 1], ['Incomplete: one or more missing, example', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('flower-draw', short({
  marks: 3, wl: null,
  stem: 'Draw a neat, labelled diagram of a bisexual flower in long section. Label the sepal, petal, stamen, stigma, ovary and pedicel.',
  model: 'A **pedicel** holding a **thalamus**; **sepals** below and larger **petals** around; **stamens** each with a filament and an anther; in the centre a **pistil** with a **stigma** at the top, a **style** and an **ovary** holding **ovules**. Six labels with ruled lines.',
  sol: 'Flower in long section with six labels.',
  scheme: [['Outline with whorls in the right order', 1], ['Stamen and pistil drawn in detail', 1], ['Six correct labels', 1]],
  d: 2, c: 'application', t: [1, 2],
}));
add('parts-num', num({
  stem: `A flower has ${PARTS.sepals} sepals, ${PARTS.petals} petals, ${PARTS.stamens} stamens and ${PARTS.pistils} pistil. How many of its parts are essential?`,
  value: PARTS.essential,
  sol: r`Essential parts are the stamens and the pistil: $${PARTS.stamens} + ${PARTS.pistils} = ${PARTS.essential}$.`,
  scheme: [[`${PARTS.essential}`, 1]],
  d: 2, c: 'application', t: [1, 2],
}), (q) => q.answer.value === 11 || 'value');

// ---------------------------------------------------------------- t02 whorls and their parts
add('stigma-mcq', mcq({
  stem: 'Pollen grains carried by a bee stick to the top of the pistil. The top of the pistil is sticky because it',
  right: 'must hold on to the pollen grains that land on it', wrong: ['must make pollen grains', 'must make the petals coloured', 'must protect the bud'],
  sol: 'The sticky stigma holds pollen grains — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('bright-mcq', mcq({
  stem: 'A flower pollinated by bees has bright petals and a sweet scent. The main use of these features is to',
  right: 'attract the bees to the flower', wrong: ['protect the bud', 'make food for the plant', 'hold the anthers up'],
  sol: 'Bright petals and scent attract insects — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('sepal-mcq', mcq({
  stem: 'In a bud, green leaf-like parts enclose and protect the inner parts of the flower. These are the',
  right: 'sepals', wrong: ['petals', 'stamens', 'carpels'],
  sol: 'Sepals form the calyx that protects the bud — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('anther-mcq', mcq({
  stem: 'Yellow dust that rubs off on a visitor\'s hand from a flower is made inside the',
  right: 'anther', wrong: ['stigma', 'ovary', 'sepal'],
  sol: 'Pollen grains are produced in the pollen sacs of the anther — option (@K).',
  d: 1, c: 'application', t: [2],
}));
add('ess-mcq', mcq({
  stem: 'Which pair of whorls is needed by a flower to form seeds?',
  right: 'Androecium and gynoecium', wrong: ['Calyx and corolla', 'Calyx and androecium', 'Corolla and gynoecium'],
  sol: 'Seeds are formed from the stamens and the pistil, the essential whorls — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('filament-mcq', mcq({
  stem: 'The slender stalk that holds the anther up in a flower is the',
  right: 'filament', wrong: ['style', 'pedicel', 'peduncle'],
  sol: 'The filament carries the anther — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('style-mcq', mcq({
  stem: 'The stalk-like part that joins the stigma to the ovary is the',
  right: 'style', wrong: ['filament', 'thalamus', 'pedicel'],
  sol: 'The style connects the stigma with the ovary — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('gyno-mcq', mcq({
  stem: 'A flower is cut open and only one whorl is left in the centre: a stigma, a style and an ovary. This whorl is the',
  right: 'gynoecium', wrong: ['androecium', 'corolla', 'calyx'],
  sol: 'Stigma, style and ovary make up the pistil, the gynoecium — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('ovary-mcq', mcq({
  stem: 'Small round bodies are found attached inside the swollen base of the pistil. The swollen base and its contents are the',
  right: 'ovary with ovules', wrong: ['anther with pollen', 'style with stigma', 'thalamus with sepals'],
  sol: 'The ovary contains the ovules — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('ar-stigma', ar({
  a: 'The petals of a flower are usually brightly coloured.',
  r: 'The corolla attracts insects for pollination.',
  key: 'c',
  sol: 'Both are true, and the attraction of insects explains the bright colour — option (c).',
  d: 2, c: 'analysis', t: [2],
}));
add('ar-petal', ar({
  a: 'Petals produce pollen grains.',
  r: 'The corolla helps to attract insects.',
  key: 'b',
  sol: 'The assertion is false: pollen is made in the anthers of the stamens. The reason is true — option (b).',
  d: 3, c: 'analysis', t: [2],
}));
add('ar-sepal', ar({
  a: 'Sepals are usually green.',
  r: 'The filament carries the anther.',
  key: 'd',
  sol: 'Both are true, but the second statement has no bearing on the first — option (d).',
  d: 3, c: 'analysis', t: [2],
}));
add('ar-pollen', ar({
  a: 'A flower that has only a pistil cannot make pollen grains.',
  r: 'Pollen grains are made in the anthers of the stamens.',
  key: 'c',
  sol: 'Both are true, and the second explains the first — option (c).',
  d: 2, c: 'analysis', t: [2],
}));
add('stamen-tf', tf({
  stem: 'The stamen is the female part of a flower.',
  key: 'f',
  sol: 'False. The stamen is the male part; the pistil is the female part.',
  d: 1, c: 'recall', t: [2],
}));
add('style-tf', tf({
  stem: 'The stigma and the ovary of a pistil are joined by the style.',
  key: 't',
  sol: 'True. The style connects the two.',
  d: 1, c: 'recall', t: [2],
}));
add('term-androecium', term({
  stem: 'Give the biological term: the male whorl of a flower, made up of all the stamens.',
  model: '**Androecium.**', sol: 'Androecium.', sch: 'Androecium',
  d: 1, c: 'recall', t: [2],
}));
add('term-gynoecium', term({
  stem: 'Give the biological term: the female whorl of a flower, made up of the stigma, style and ovary.',
  model: '**Gynoecium** (pistil).', sol: 'Gynoecium.', sch: 'Gynoecium',
  d: 1, c: 'recall', t: [2],
}));
add('odd-stamen', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: Anther, Filament, Pollen sac, Style.',
  model: '**Style**; the others are **parts of a stamen**.', sol: 'The style belongs to the pistil.', sch: 'Odd one and category',
  d: 2, c: 'analysis', t: [2],
}));
add('odd-pistil', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: Stigma, Style, Ovary, Filament.',
  model: '**Filament**; the others are **parts of a pistil**.', sol: 'The filament belongs to the stamen.', sch: 'Odd one and category',
  d: 2, c: 'analysis', t: [2],
}));
add('reason-petals', term({
  stem: 'Give reason: the petals of many flowers are brightly coloured and scented.',
  model: 'They **attract insects**, which help in **pollination**.', sol: 'Attract insects.', sch: 'Attract insects',
  d: 2, c: 'understanding', t: [2],
}));
add('fill-ovule', fill({
  stem: 'The ovary of a pistil contains small bodies called ______.',
  acc: [['ovules', 'ovule']],
  sol: 'Ovules.',
  d: 1, c: 'recall', t: [2],
}));
add('fill-anther', fill({
  stem: 'Pollen grains are made and held in the pollen sacs of the ______.',
  acc: [['anther', 'anthers']],
  sol: 'Anther.',
  d: 1, c: 'recall', t: [2],
}));
add('sepal-petal-short', short({
  marks: 2,
  stem: 'State one role of the sepals and one role of the petals.',
  model: '**Sepals** (calyx) are green and **protect the flower bud**, and they can make food by photosynthesis. **Petals** (corolla) are brightly coloured and **attract insects** to the flower.',
  sol: 'Sepals protect; petals attract.',
  scheme: [['Sepals protect the bud', 1], ['Petals attract insects', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('stamen-parts-short', short({
  marks: 2,
  stem: 'Name the two parts of a stamen and state the function of each.',
  model: 'The **anther** makes and holds the **pollen grains** in its pollen sacs. The **filament** is the stalk that **holds the anther up** so that pollen can be carried away.',
  sol: 'Anther makes pollen; filament holds it.',
  scheme: [['Anther and function', 1], ['Filament and function', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('essential-short', short({
  marks: 2,
  stem: 'Why are the androecium and the gynoecium called the essential whorls of a flower?',
  model: 'The **androecium** makes the **pollen grains** (male gametes) and the **gynoecium** holds the **ovules** with the egg cells. **Without them seeds cannot form**, though the calyx and corolla may be missing.',
  sol: 'They make the gametes and seeds.',
  scheme: [['Androecium makes male gametes, gynoecium female', 1], ['Seeds cannot form without them', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('stigma-short', short({
  marks: 2,
  stem: 'State two features of the stigma that suit its function.',
  model: 'The stigma is **sticky**, so pollen grains that land on it **stay there**. It also sits at the **top of the style**, in an exposed position, where pollen carried by insects or wind can reach it easily.',
  sol: 'Sticky; exposed at the top.',
  scheme: [['Sticky surface', 1], ['Exposed position at the top', 1]],
  d: 2, c: 'application', t: [2],
}));
add('pistil-three', short({
  marks: 3,
  stem: 'Name the three parts of a pistil and give one function of each.',
  model: '1. **Stigma**: sticky top that **receives pollen** grains.\n2. **Style**: the stalk that **joins the stigma to the ovary**.\n3. **Ovary**: the swollen base that **contains the ovules**.',
  sol: 'Stigma, style, ovary with functions.',
  scheme: [['Stigma and function', 1], ['Style and function', 1], ['Ovary and function', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('calyx-table', short({
  marks: 3,
  stem: 'Tabulate three differences between the calyx and the corolla of a flower.',
  model: '| Calyx | Corolla |\n|---|---|\n| Made of **sepals** | Made of **petals** |\n| Usually **green** | Usually **brightly coloured** |\n| **Outermost** whorl | Lies **inside** the calyx |\n| **Protects** the bud | **Attracts** insects |',
  sol: 'Parts; colour; position; function.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('stamen-draw', short({
  marks: 3, wl: null,
  stem: 'Draw a neat, labelled diagram of a stamen. Label the anther, pollen sac and filament.',
  model: 'A **filament** (a slender stalk) carrying a two-lobed **anther** at the top; the lobes show **pollen sacs** with **pollen grains** inside. Three labels with ruled lines.',
  sol: 'Anther with pollen sacs on filament; three labels.',
  scheme: [['Filament and two-lobed anther', 1], ['Pollen sacs drawn', 1], ['Three correct labels', 1]],
  d: 2, c: 'application', t: [2],
}));
add('essential-table', short({
  marks: 3,
  stem: 'Tabulate three differences between the androecium and the gynoecium.',
  model: '| Androecium | Gynoecium |\n|---|---|\n| **Male** whorl | **Female** whorl |\n| Made of **stamens** | Made of **carpels** (pistil) |\n| Makes **pollen grains** | Holds **ovules** |\n| Parts: anther, filament | Parts: stigma, style, ovary |',
  sol: 'Sex; parts; product; names of parts.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('pollen-num', num({
  stem: `One anther has ${ANTHER.sacs} pollen sacs and each sac holds ${ANTHER.perSac} pollen grains. How many pollen grains are in the anther?`,
  value: ANTHER.total,
  sol: r`$${ANTHER.sacs} \times ${ANTHER.perSac} = ${ANTHER.total}$ grains.`,
  scheme: [[`${ANTHER.total}`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 600 || 'value');
add('passage-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [calyx, corolla, androecium, gynoecium, thalamus, stigma, anther, ovule]\n\nAll the whorls of a flower are borne on the (a) ______. The outermost whorl is the (b) ______, and the coloured whorl inside it is the (c) ______. Pollen is made in the (d) ______ and is received by the sticky (e) ______.',
  acc: [['thalamus'], ['calyx'], ['corolla'], ['anther'], ['stigma']],
  sol: '(a) thalamus; (b) calyx; (c) corolla; (d) anther; (e) stigma.',
  d: 2, c: 'understanding', t: [1, 2],
}));
add('flower-match5', match({
  marks: 5,
  stem: 'Study the diagram of a flower and match each lettered part with its function.',
  pairs: [
    ['A', 'Attracts insects to the flower'],
    ['B', 'Makes the pollen grains'],
    ['C', 'Receives the pollen grains'],
    ['D', 'Contains the ovules'],
    ['E', 'Protects the flower in the bud stage'],
  ],
  order: [2, 4, 0, 3, 1],
  sol: 'A petal; B anther; C stigma; D ovary; E sepal.',
  d: 2, c: 'application', t: [2],
  assets: [flowerFig],
}));

// ---------------------------------------------------------------- t03 inflorescence and placentation (meaning only)
add('inflo-mcq', mcq({
  stem: 'A branch of a mango tree carries many small flowers on one branching stalk. This whole group of flowers is called an',
  right: 'inflorescence', wrong: ['androecium', 'placenta', 'whorl'],
  sol: 'A group of flowers on one flowering axis is an inflorescence — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('placent-mcq', mcq({
  stem: 'In a cut ovary, small bodies are seen fixed to a cushion of tissue on the ovary wall. How the bodies are arranged on this tissue is called',
  right: 'placentation', wrong: ['pollination', 'aestivation', 'phyllotaxy'],
  sol: 'Placentation is the arrangement of ovules on the placenta — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('placenta-mcq', mcq({
  stem: 'The tissue on the ovary wall to which the ovules are attached is the',
  right: 'placenta', wrong: ['stigma', 'filament', 'thalamus'],
  sol: 'The placenta carries the ovules — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('peduncle-mcq', mcq({
  stem: 'In an inflorescence the main stalk that bears all the flowers is called the',
  right: 'peduncle', wrong: ['pedicel', 'style', 'filament'],
  sol: 'The main stalk is the peduncle; each flower has its own pedicel — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('term-inflo', term({
  stem: 'Give the biological term: the arrangement of a group of flowers on a flowering axis.',
  model: '**Inflorescence.**', sol: 'Inflorescence.', sch: 'Inflorescence',
  d: 1, c: 'recall', t: [3],
}));
add('term-placentation', term({
  stem: 'Give the biological term: the arrangement of ovules on the placenta inside the ovary.',
  model: '**Placentation.**', sol: 'Placentation.', sch: 'Placentation',
  d: 1, c: 'recall', t: [3],
}));
add('inflo-short', short({
  marks: 2,
  stem: 'Define inflorescence. State one advantage to a plant of bearing its flowers in a group.',
  model: 'An **inflorescence** is a group of flowers borne together on one flowering axis. Small flowers grouped together are **more conspicuous**, so insects find them more easily and more flowers can be pollinated in one visit.',
  sol: 'Group of flowers on an axis; more conspicuous.',
  scheme: [['Definition', 1], ['One advantage', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('placenta-short', short({
  marks: 2,
  stem: 'Define placentation. Name the tissue to which the ovules are attached.',
  model: '**Placentation** is the **arrangement of ovules** inside the ovary. The ovules are attached to the **placenta**, a cushion of tissue on the wall of the ovary.',
  sol: 'Arrangement of ovules; placenta.',
  scheme: [['Definition of placentation', 1], ['Placenta named', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('bunch-num', num({
  stem: `A bunch of flowers on one stalk has ${BUNCH.flowers} flowers, of which ${BUNCH.buds} are still buds. How many flowers are open?`,
  value: BUNCH.open,
  sol: r`$${BUNCH.flowers} - ${BUNCH.buds} = ${BUNCH.open}$ open flowers.`,
  scheme: [[`${BUNCH.open}`, 1]],
  d: 1, c: 'application', t: [3],
}), (q) => q.answer.value === 18 || 'value');

// ---------------------------------------------------------------- 10-mark structured questions
add('hibiscus-long', long({
  marks: 10, wl: null,
  stem: 'In a practical class a student pulls apart a Hibiscus flower and finds, from outside to inside, green leaf-like parts, large bright petals, a tube of stamens and a pistil with a sticky top.\n\n(a) State whether the flower is complete or incomplete, and bisexual or unisexual. Give a reason for each. [2]\n\n(b) Name the outer two whorls and state one function of each. [3]\n\n(c) Name the parts of the pistil and state the function of the stigma. [2]\n\n(d) Draw a neat, labelled diagram of the flower in long section, naming six parts. [3]',
  model: '**(a)** **Complete**, because all four whorls (calyx, corolla, androecium, gynoecium) are present; **bisexual**, because it has both stamens and a pistil.\n\n**(b)** **Calyx** (green sepals): **protects** the bud. **Corolla** (bright petals): **attracts insects**. (Both whorls named and one function each.)\n\n**(c)** **Stigma, style and ovary**. The stigma is **sticky** and **receives the pollen grains**.\n\n**(d)** A **pedicel** and **thalamus**, **sepals**, **petals**, **stamens** (anther and filament) and a **pistil** (stigma, style, ovary). Six labels with ruled lines.',
  sol: 'Complete and bisexual; calyx protects, corolla attracts; stigma, style, ovary; labelled flower.',
  scheme: [['Complete with reason', 1], ['Bisexual with reason', 1], ['Calyx and corolla named', 1], ['Function of each', 2], ['Parts of pistil', 1], ['Function of stigma', 1], ['Flower outline in long section', 1], ['Six labels', 2]],
  d: 3, c: 'application', t: [1, 2],
}));
add('papaya-long', long({
  marks: 10, wl: null,
  stem: `A farmer has a papaya orchard. The flowers of some trees have ${PAPAYA.stamens} stamens and no pistil; the flowers of other trees have a pistil and no stamens. Each anther of a male flower has ${PAPAYA.sacs} pollen sacs, each holding ${PAPAYA.perSac} pollen grains.\n\n(a) Classify each kind of flower as complete or incomplete and as bisexual or unisexual. [3]\n\n(b) Name the whorl present only in the female tree and the whorl present only in the male tree. [2]\n\n(c) Calculate the number of pollen grains made by one male flower. [2]\n\n(d) Draw a neat, labelled diagram of a stamen. [3]`,
  model: `**(a)** Both kinds are **incomplete** and **unisexual**: the male flower has no gynoecium, the female flower has no androecium (and neither is bisexual).\n\n**(b)** Female tree: **gynoecium** (pistil). Male tree: **androecium** (stamens).\n\n**(c)** Grains per anther = ${PAPAYA.sacs} × ${PAPAYA.perSac} = ${PAPAYA.perAnther}; per flower = ${PAPAYA.stamens} × ${PAPAYA.perAnther} = **${PAPAYA.total}**.\n\n**(d)** A **filament** with a two-lobed **anther** showing **pollen sacs** with pollen grains. Three labels.`,
  sol: `Incomplete and unisexual; gynoecium and androecium; ${PAPAYA.total} grains; labelled stamen.`,
  scheme: [['Male flower classified', 1], ['Female flower classified', 1], ['Unisexual reason', 1], ['Gynoecium', 1], ['Androecium', 1], ['Grains per anther', 1], [`${PAPAYA.total}`, 1], ['Filament and anther drawn', 1], ['Three labels', 2]].map(([a, b]) => [a, b]),
  d: 3, c: 'application', t: [1, 2],
}), (q) => PAPAYA.total === 5000 || 'total');
add('wheat-long', long({
  marks: 10, wl: null,
  stem: 'A student examines a flower of wheat under a hand lens. She sees stamens with dangling anthers and a pistil with a feathery stigma, but no bright petals and no green sepals.\n\n(a) Is this flower complete? Is it bisexual? Give reasons. [2]\n\n(b) Name the essential whorls of a flower and state why they are essential. [2]\n\n(c) Suggest why a flower without bright petals may still form seeds. [2]\n\n(d) Draw a neat, labelled diagram of the pistil, naming the stigma, style, ovary and ovule. [4]',
  model: '**(a)** **Not complete**: the calyx and corolla are missing. It is **bisexual**: it has both stamens and a pistil.\n\n**(b)** The **androecium** and the **gynoecium**. They are essential because the androecium makes **pollen** and the gynoecium holds the **ovules**; **seeds cannot form without them**.\n\n**(c)** Bright petals only **attract insects**. Seeds form from the **stamens and the pistil**, so the flower can still make seeds if pollen reaches the stigma in another way (for example carried by wind).\n\n**(d)** A **stigma** on top of a **style**, joined to an **ovary** that contains one or more **ovules**. Four labels.',
  sol: 'Incomplete but bisexual; androecium and gynoecium make gametes; petals only attract; labelled pistil.',
  scheme: [['Incomplete with reason', 1], ['Bisexual with reason', 1], ['Two essential whorls', 1], ['Reason', 1], ['Petals only attract insects', 1], ['Seeds depend on stamens and pistil', 1], ['Pistil outline with stigma, style, ovary', 2], ['Ovule drawn and four labels', 2]],
  d: 3, c: 'analysis', t: [1, 2],
}));
add('mango-long', long({
  marks: 10, wl: null,
  stem: `A mango branch carries one flowering stalk with ${MANGO.flowers} small flowers. A farmer finds that only ${MANGO.percent} percent of them set fruit.\n\n(a) Define inflorescence. [2]\n\n(b) Calculate how many flowers set fruit and how many do not. [2]\n\n(c) Define placentation. [2]\n\n(d) Draw a neat, labelled diagram of an ovary in long section, showing the ovules attached to the placenta. [4]`,
  model: `**(a)** An **inflorescence** is a group of flowers borne together on one flowering axis, the main stalk being the peduncle.\n\n**(b)** Fruits = ${MANGO.percent} ÷ 100 × ${MANGO.flowers} = **${MANGO.fruits}**; not setting fruit = ${MANGO.flowers} − ${MANGO.fruits} = **${MANGO.dropped}**.\n\n**(c)** **Placentation** is the **arrangement of ovules** on the placenta inside the ovary.\n\n**(d)** An oval **ovary wall**, a **placenta** on the wall, **ovules** attached to it, and the base of the **style** above. Labels: ovary wall, placenta, ovule, style.`,
  sol: `Group of flowers on an axis; ${MANGO.fruits} fruits and ${MANGO.dropped} without; arrangement of ovules; labelled ovary.`,
  scheme: [['Group of flowers', 1], ['On a flowering axis', 1], [`${MANGO.fruits} fruits`, 1], [`${MANGO.dropped} flowers`, 1], ['Arrangement of ovules', 1], ['Inside the ovary', 1], ['Ovary with placenta and ovules drawn', 2], ['Four labels', 2]],
  d: 3, c: 'application', t: [3],
}), (q) => MANGO.fruits === 18 || 'fruits');
add('figure-long', long({
  marks: 10, wl: null,
  stem: 'Study the diagram of a flower in long section. Parts are lettered A to E.\n\n(a) Name the parts A and E and state one function of each. [3]\n\n(b) Name the part B, state which whorl it belongs to and what it makes. [2]\n\n(c) Name the parts C and D and explain how they are related in the pistil. [2]\n\n(d) Draw a neat, labelled diagram of the four whorls of a flower as seen from above. [3]',
  model: '**(a)** A is a **petal**: attracts insects. E is a **sepal**: protects the bud.\n\n**(b)** B is an **anther**, part of the **androecium**; it makes **pollen grains**.\n\n**(c)** C is the **stigma** and D the **ovary**; they are joined by the **style**: the stigma receives pollen at the top, and the ovary at the base holds the ovules.\n\n**(d)** Four **concentric rings**: **calyx** outermost, then **corolla**, then **androecium**, and the **gynoecium** at the centre. Labels.',
  sol: 'Petal, sepal; anther in androecium makes pollen; stigma and ovary joined by style; whorls from above.',
  scheme: [['A and E named', 1], ['Function of each', 2], ['Anther named and whorl', 1], ['Pollen grains', 1], ['Stigma and ovary named', 1], ['Joined by the style', 1], ['Four rings in the right order', 2], ['Four labels', 1]],
  d: 3, c: 'application', t: [1, 2],
  assets: [flowerFig],
}));
add('classify-long', long({
  marks: 10, wl: null,
  stem: 'A nursery owner sorts four kinds of flower. P has calyx, corolla, stamens and a pistil. Q has calyx, corolla and stamens only. R has calyx, corolla and a pistil only. S has stamens and a pistil only.\n\n(a) Classify each flower as complete or incomplete, and as bisexual or unisexual. [4]\n\n(b) Which flowers can make pollen grains? Give a reason. [2]\n\n(c) Explain why S is bisexual but incomplete. [2]\n\n(d) Draw a neat, labelled diagram of the stamen of flower Q, naming two parts. [2]',
  model: '**(a)** P: **complete, bisexual**. Q: **incomplete, unisexual** (male). R: **incomplete, unisexual** (female). S: **incomplete, bisexual**.\n\n**(b)** **P, Q and S** can make pollen grains, because they have **stamens**, and pollen is made in the anthers of the stamens.\n\n**(c)** S has both essential whorls, so it is **bisexual**, but the **calyx and corolla** are missing, so not all four whorls are present: it is **incomplete**.\n\n**(d)** A **filament** with an **anther** at the top; labels: filament and anther.',
  sol: 'P complete bisexual; Q and R incomplete unisexual; S incomplete bisexual; P, Q and S make pollen grains; S lacks calyx and corolla; labelled stamen.',
  scheme: [['P classified', 1], ['Q classified', 1], ['R classified', 1], ['S classified', 1], ['P, Q and S named', 1], ['Reason: stamens make pollen', 1], ['Both essential whorls present', 1], ['Calyx and corolla missing', 1], ['Stamen drawn with two labels', 2]],
  d: 4, c: 'analysis', t: [1, 2],
}));
