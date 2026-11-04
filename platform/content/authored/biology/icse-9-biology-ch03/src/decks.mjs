// ICSE 9 Biology ch03 The Flower — Part 1 (t01 and the non-essential whorls of t02), Part 2 (stamen and pistil of t02; t03).
import { sl, deck, table, flow, svgV } from '../../icse-9-biology-ch01/src/lib.mjs';
import { FLOWER, WHORLS, STAMEN_PISTIL, INFLORESCENCE } from './svgs.mjs';
import { PARTS, POLLEN, MANGO } from './calc.mjs';

export const V = {
  flower: svgV(FLOWER, 'A bisexual flower in long section with its parts labelled'),
  whorls: svgV(WHORLS, 'The four whorls of a flower seen from above'),
  stamenPistil: svgV(STAMEN_PISTIL, 'A stamen and a pistil with their parts labelled'),
  inflorescence: svgV(INFLORESCENCE, 'A single flower and an inflorescence'),
};

export const deck1 = deck({
  part: 1,
  title: 'The Flower — Part 1: Structure of a flower, and its outer whorls',
  goals: [
    'Draw and label the parts of a bisexual flower',
    'Distinguish complete from incomplete flowers',
    'Explain the roles of sepals and petals',
  ],
  slides: [
    sl('title', 'The Flower', {
      b: 'Part 1 — the reproductive organ of a flowering plant and the whorls it is built from.',
      v: flow('LR', [['p', 'Pedicel: stalk'], ['t', 'Thalamus: tip of the stalk'], ['w', 'Four whorls: calyx, corolla, androecium, gynoecium']], [['p', 't'], ['t', 'w']], 'Flow from the pedicel to the thalamus to the four whorls of a flower'),
      n: 'A flower is a shoot that has become specialised for reproduction. It stands on a stalk, and the tip of the stalk carries four rings of parts, called whorls, one inside another.',
    }),
    sl('diagram', 'A bisexual flower', {
      b: 'A **bisexual flower** has both **stamens** (male) and a **pistil** (female) in the same flower.',
      v: V.flower,
      n: 'Here is a flower cut lengthways. Outside are the green sepals and the coloured petals. Inside are the stamens, each with an anther on a filament, and in the centre the pistil with its stigma, style and ovary.',
    }),
    sl('concept', 'Parts of the flower', {
      v: table(['Part', 'What it is'], [['Pedicel', 'The stalk that holds the flower'], ['Thalamus', 'The swollen tip of the pedicel that carries all the whorls'], ['Calyx', 'The outermost whorl: sepals, usually green'], ['Corolla', 'The next whorl: petals, usually coloured'], ['Androecium', 'The male whorl: all the stamens'], ['Gynoecium', 'The female whorl: the pistil, made of carpels']], 'Table of the pedicel, thalamus, calyx, corolla, androecium and gynoecium'),
      n: 'Learn the order from outside to inside: calyx, corolla, androecium and gynoecium. All of them sit on the thalamus, which is the swollen tip of the flower stalk, called the pedicel.',
    }),
    sl('check', 'Quick check: the swollen tip', {
      b: 'Which part of a flower carries all the whorls?',
      chk: 'thalamus-chk',
      n: 'It is the swollen tip of the stalk.',
    }),
    sl('diagram', 'The four whorls', {
      b: 'The **calyx** and **corolla** are the **non-essential** whorls; the **androecium** and **gynoecium** are the **essential** whorls.',
      v: V.whorls,
      n: 'Seen from above, the whorls form rings. The outer two protect the flower and attract insects, but the flower can still reproduce without them. The inner two, the stamens and the pistil, are the essential parts.',
    }),
    sl('concept', 'Complete and incomplete flowers', {
      v: table(['Kind of flower', 'Meaning', 'Example'], [['Complete', 'Has all four whorls: calyx, corolla, androecium and gynoecium', 'Hibiscus'], ['Incomplete', 'Lacks one or more of the four whorls', 'Wheat; male flower of papaya'], ['Bisexual', 'Has both stamens and a pistil', 'Hibiscus, wheat'], ['Unisexual', 'Has only stamens or only a pistil', 'Male or female flower of papaya']], 'Table of complete, incomplete, bisexual and unisexual flowers with meaning and example'),
      n: 'A complete flower has all four whorls. Anything less is incomplete. Bisexual and unisexual describe the essential whorls only. So a wheat flower is bisexual but incomplete, because it has no showy sepals or petals.',
    }),
    sl('example', 'Worked example 1: classifying flowers', {
      b: 'Flower X has sepals, petals, stamens and a pistil. Flower Y has stamens only. Flower Z has stamens and a pistil but no petals. Classify each.',
      ul: ['Step 1: count the **whorls**. X has **four**, Y has **one**, Z has **three** (calyx may be absent too).', 'Step 2: all four means **complete**; fewer means **incomplete**.', 'Step 3: check the essential whorls: X and Z have **both**, so are **bisexual**; Y has only stamens, so is **unisexual**.'],
      v: table(['Flower', 'Complete?', 'Sexual condition'], [['X', 'Complete', 'Bisexual'], ['Y', 'Incomplete', 'Unisexual (male)'], ['Z', 'Incomplete', 'Bisexual']], 'Worked table classifying flowers X, Y and Z as complete or incomplete and bisexual or unisexual'),
      n: 'First count the whorls. All four makes a flower complete. Then look at the stamens and the pistil. Both present means bisexual, only one means unisexual. So flower Z is incomplete but bisexual.',
    }),
    sl('check', 'Quick check: a complete flower', {
      b: 'A flower is called complete when it has',
      chk: 'complete-chk',
      n: 'Count the whorls.',
    }),
    sl('concept', 'Roles of sepals and petals', {
      v: table(['Whorl', 'Usual colour', 'Roles'], [['Calyx (sepals)', 'Green', 'Protects the flower bud; makes food by photosynthesis; later supports the opened flower'], ['Corolla (petals)', 'Bright', 'Attracts insects for pollination; may have scent and nectar; protects stamens and pistil']], 'Table of the roles of the calyx and the corolla'),
      n: 'Sepals are like a green cover that protects the bud. Petals are the advertisement. Their colour and scent draw insects to the flower, which helps carry pollen from flower to flower.',
    }),
    sl('example', 'Worked example 2: counting parts', {
      b: `A flower has ${PARTS.sepals} sepals, ${PARTS.petals} petals, ${PARTS.stamens} stamens and ${PARTS.pistils} pistil. How many parts does it have, and how many are essential?`,
      ul: [`Step 1: total = ${PARTS.sepals} + ${PARTS.petals} + ${PARTS.stamens} + ${PARTS.pistils} = **${PARTS.total}**.`, `Step 2: non-essential = sepals and petals = ${PARTS.sepals} + ${PARTS.petals} = **${PARTS.nonEssential}**.`, `Step 3: essential = stamens and pistil = ${PARTS.stamens} + ${PARTS.pistils} = **${PARTS.essential}**.`],
      v: table(['Group', 'Parts'], [['Non-essential (calyx and corolla)', String(PARTS.nonEssential)], ['Essential (androecium and gynoecium)', String(PARTS.essential)], ['All parts', String(PARTS.total)]], 'Worked table: ten non-essential parts, eleven essential parts and twenty-one parts in all'),
      n: 'Sort the parts into the two groups first. Sepals and petals are the non-essential ones. Stamens and the pistil are the essential ones. Then add the groups to find the total number of parts.',
    }),
    sl('check', 'Quick check: the coloured whorl', {
      b: 'Which whorl attracts insects to a flower?',
      chk: 'corolla-chk',
      n: 'Think of the bright part.',
    }),
    sl('summary', 'Summary', {
      ul: ['Pedicel, thalamus, calyx, corolla, androecium, gynoecium.', 'Bisexual: stamens and pistil together. Complete: all four whorls.', 'Calyx protects; corolla attracts.', 'Androecium and gynoecium are the essential whorls.'],
      v: table(['Whorl', 'Made of', 'Job'], [['Calyx', 'Sepals', 'Protect'], ['Corolla', 'Petals', 'Attract'], ['Androecium', 'Stamens', 'Make pollen'], ['Gynoecium', 'Pistil', 'Hold ovules']], 'Summary table of the four whorls, what each is made of and its job'),
      n: 'To recap. A flower has four whorls on the thalamus. The calyx protects, the corolla attracts, the androecium makes pollen and the gynoecium holds the ovules. A complete flower has all four.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['A **complete** flower has all **four whorls**; **bisexual** only refers to stamens and pistil.', 'Write the whorls from **outside to inside**.', 'In a diagram show the **thalamus** and **pedicel** too.', 'Label with **ruled lines** that touch the part.'],
      n: 'Exam tips. Do not mix up complete and bisexual. Complete means all four whorls, bisexual means both stamens and pistil. Name the whorls from outside to inside, include the thalamus in your drawing, and label with ruled lines.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'The Flower — Part 2: Stamen, pistil, inflorescence and placentation',
  goals: [
    'State the parts of the stamen and the pistil and their functions',
    'Explain why the androecium and gynoecium are essential',
    'Define inflorescence and placentation',
  ],
  slides: [
    sl('title', 'Stamen, Pistil and Arrangement', {
      b: 'Part 2 — the male and female organs, and how flowers and ovules are arranged.',
      v: flow('LR', [['f', 'Flower'], ['s', 'Stamen: makes pollen'], ['p', 'Pistil: holds ovules']], [['f', 's'], ['f', 'p']], 'Flow from the flower to the stamen that makes pollen and the pistil that holds ovules'),
      n: 'The stamens and the pistil are the parts that actually make new seeds. After studying them we look at two ideas about arrangement: how flowers are grouped, and how ovules sit inside the ovary.',
    }),
    sl('diagram', 'Stamen and pistil', {
      b: 'A **stamen** has an **anther** and a **filament**. A **pistil** has a **stigma**, a **style** and an **ovary** with **ovules**.',
      v: V.stamenPistil,
      n: 'The anther at the top of the stamen makes the pollen grains, and the filament holds it up. In the pistil, the sticky stigma catches pollen, the style carries it down, and the ovary holds the ovules.',
    }),
    sl('concept', 'Functions of the parts', {
      v: table(['Part', 'Whorl', 'Function'], [['Anther', 'Stamen', 'Makes and holds pollen grains in pollen sacs'], ['Filament', 'Stamen', 'Holds the anther up so that pollen can be carried away'], ['Stigma', 'Pistil', 'Sticky top that receives pollen grains'], ['Style', 'Pistil', 'Stalk joining the stigma to the ovary'], ['Ovary', 'Pistil', 'Swollen base that contains the ovules']], 'Table of anther, filament, stigma, style and ovary with the whorl and function of each'),
      n: 'Each part has one clear job. Anthers make pollen, filaments hold anthers up, stigmas catch pollen, styles connect, and the ovary protects the ovules inside it.',
    }),
    sl('check', 'Quick check: the stamen', {
      b: 'Which two parts make up a stamen?',
      chk: 'stamen-chk',
      n: 'Think of the male whorl.',
    }),
    sl('example', 'Worked example 1: counting pollen', {
      b: `A flower has ${POLLEN.stamens} stamens. Each anther has ${POLLEN.sacs} pollen sacs, and each sac holds ${POLLEN.perSac} pollen grains. How many pollen grains does the flower make?`,
      ul: [`Step 1: grains in one anther = ${POLLEN.sacs} × ${POLLEN.perSac} = **${POLLEN.perAnther}**.`, `Step 2: grains in the flower = ${POLLEN.stamens} × ${POLLEN.perAnther} = **${POLLEN.total}**.`],
      v: table(['Step', 'Result'], [['Pollen per anther', String(POLLEN.perAnther)], ['Stamens in the flower', String(POLLEN.stamens)], ['Pollen in the flower', String(POLLEN.total)]], 'Worked table: one thousand two hundred grains per anther, six stamens and seven thousand two hundred grains in the flower'),
      n: 'Work from the smallest unit. Multiply the number of pollen sacs by the grains in each sac to get the grains in one anther. Then multiply by the number of stamens to get the total for the flower.',
    }),
    sl('check', 'Quick check: the pistil', {
      b: 'Which part of the pistil receives the pollen grains?',
      chk: 'pistil-chk',
      n: 'It is sticky.',
    }),
    sl('concept', 'Essential and non-essential whorls', {
      v: table(['Whorls', 'Called', 'Why'], [['Calyx and corolla', 'Non-essential (accessory)', 'Protect and attract, but seeds can form without them'], ['Androecium and gynoecium', 'Essential', 'Make the gametes and the seeds; without them no seeds form']], 'Table of the essential and non-essential whorls with reasons'),
      n: 'The outer whorls help but are not necessary for making seeds. The stamens make the male gametes, and the pistil holds the ovules with the female gametes. So these two are called the essential whorls.',
    }),
    sl('diagram', 'One flower or many', {
      b: 'An **inflorescence** is a group of flowers borne together on one **flowering axis**.',
      v: V.inflorescence,
      n: 'Some plants bear a flower on its own stalk. Many others carry a whole group of small flowers on one main stalk. That group, with its stalk, is called an inflorescence.',
    }),
    sl('concept', 'Inflorescence: the meaning', {
      v: table(['Term', 'Meaning'], [['Inflorescence', 'The arrangement of a group of flowers on a flowering axis'], ['Peduncle', 'The main stalk of the inflorescence'], ['Pedicel', 'The stalk of one flower'], ['Use', 'Many small flowers together become conspicuous to insects']], 'Table giving the meaning of inflorescence, peduncle, pedicel and the use of an inflorescence'),
      n: 'An inflorescence is a flower cluster on one stalk. Only the meaning is needed for this course. Small flowers grouped together make a bigger, more visible display, which helps insects find them.',
    }),
    sl('check', 'Quick check: a flower cluster', {
      b: 'A group of flowers borne together on one flowering axis is called',
      chk: 'inflo-chk',
      n: 'The name begins with in.',
    }),
    sl('example', 'Worked example 2: fruit set on a branch', {
      b: `A mango inflorescence has ${MANGO.flowers} flowers and ${MANGO.percent} percent of them set fruit. How many fruits form, and how many flowers do not?`,
      ul: [`Step 1: fruits = ${MANGO.percent} percent of ${MANGO.flowers} = ${MANGO.percent} ÷ 100 × ${MANGO.flowers} = **${MANGO.fruits}**.`, `Step 2: flowers without fruit = ${MANGO.flowers} − ${MANGO.fruits} = **${MANGO.dropped}**.`],
      v: table(['Quantity', 'Value'], [['Flowers', String(MANGO.flowers)], ['Fruits set', String(MANGO.fruits)], ['Flowers not setting fruit', String(MANGO.dropped)]], 'Worked table: one hundred and twenty flowers, eighteen fruits and one hundred and two flowers without fruit'),
      n: 'Find the percentage of the total first. Fifteen percent of one hundred and twenty is eighteen fruits. Take that away from the total to find how many flowers did not set fruit.',
    }),
    sl('concept', 'Placentation: the meaning', {
      v: table(['Term', 'Meaning'], [['Ovule', 'Small body in the ovary that holds the egg cell and becomes a seed'], ['Placenta', 'The cushion on the ovary wall to which the ovules are attached'], ['Placentation', 'The arrangement of ovules on the placenta inside the ovary']], 'Table giving the meaning of ovule, placenta and placentation'),
      n: 'Inside the ovary the ovules are fixed to a cushion called the placenta. How the ovules are arranged on it is called placentation. For this course, the meaning alone is needed.',
    }),
    sl('check', 'Quick check: inside the ovary', {
      b: 'The arrangement of ovules inside the ovary is called',
      chk: 'placentation-chk',
      n: 'The word comes from placenta.',
    }),
    sl('summary', 'Summary', {
      ul: ['Stamen: anther (makes pollen) and filament.', 'Pistil: stigma (receives pollen), style, ovary (holds ovules).', 'Androecium and gynoecium are essential; calyx and corolla are not.', 'Inflorescence: flowers grouped on one axis. Placentation: arrangement of ovules.'],
      v: table(['Term', 'One-line meaning'], [['Anther', 'Makes pollen'], ['Stigma', 'Catches pollen'], ['Inflorescence', 'Cluster of flowers'], ['Placentation', 'Ovule arrangement']], 'Summary table of four terms with one-line meanings'),
      n: 'To recap. The stamen makes pollen and the pistil receives it and holds the ovules. These are the essential whorls. An inflorescence is a flower cluster, and placentation is how the ovules are arranged inside the ovary.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Name the **parts of the stamen** and the **parts of the pistil** separately.', 'For **inflorescence** and **placentation** give the **meaning only**.', 'Do not call the ovary the **female whorl**: the whorl is the **gynoecium**.', 'In a pistil diagram label **stigma**, **style**, **ovary** and **ovule**.'],
      n: 'Exam tips. Keep the parts of the stamen and the pistil separate. For inflorescence and placentation, give just the meaning. Remember that the whorl is the gynoecium, and the ovary is only one part of it. Label stigma, style, ovary and ovule in a drawing.',
    }),
  ],
});
