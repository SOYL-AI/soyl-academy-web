// ISC 11 Biology ch07 Morphology of the Flower and Inflorescence — question bank in ISC school-examination style.
// Numbers come from calc.mjs. AR keys (ISC options): c a d b a.
import { mk, add, svgV, r } from '../../isc-11-biology-ch01/src/lib.mjs';
import { LILY_MEMBERS, SURVEY, SURVEY_TOTAL, SURVEY_ACTINO_PCT, HIB2, HIB2_SACS, FLORETS12, FLORETS12_SACS, PEA, PEA_FLOWERS, PEA_JOINED, OV2, OV2_OVULES, HEAD2, HEAD2_SEEDS, R2, R2_GAP, R2_DAY30, R2_CLOSED30, R3, R3_GAP, BUD1, BUD2, aestivation, SACS, SUNFLOWER_SACS, SACS_IF_DITHECOUS, SUNFLOWER_FLORET } from './calc.mjs';
import { FLOWER_LETTERED, PLAC_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const flowerFig = svgV(FLOWER_LETTERED, 'A flower in longitudinal section with five parts marked A to E');
const placFig = svgV(PLAC_LETTERED, 'Five ovaries marked A to E showing where the ovules are attached');

// ---------------------------------------------------------------- t01 the flower
add('ck-symm-mcq', mcq({
  stem: 'A florist cuts a bean flower and a lily flower along vertical planes through the centre. Which statement about the bean flower is correct?',
  right: 'It gives two equal halves along one vertical plane only.',
  wrong: ['It gives two equal halves along every vertical plane.', 'It cannot be cut into equal halves along any vertical plane.', 'It has no petals, so symmetry cannot be judged.'],
  sol: 'The bean flower is zygomorphic: equal halves by one vertical plane only — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('flower-fig1-mcq', mcq({
  stem: 'In the lettered figure of a flower, the part that receives the pollen grains is marked',
  right: 'A',
  wrong: ['B', 'C', 'E'],
  sol: 'A is the stigma, which receives pollen — option (@K).',
  d: 1, c: 'application', t: [1],
  assets: [flowerFig],
}));
add('flower-fig2-mcq', mcq({
  stem: 'In the same figure, after fertilisation the structure marked D develops into a',
  right: 'seed',
  wrong: ['fruit wall', 'petal', 'stigma'],
  sol: 'D is an ovule; after fertilisation an ovule becomes a seed, while the ovary wall becomes the fruit wall — option (@K).',
  d: 2, c: 'application', t: [1],
  assets: [flowerFig],
}));
add('flower-fig3-mcq', mcq({
  stem: 'In the same figure, the two parts that make up the non-essential whorls are marked',
  right: 'C and E',
  wrong: ['A and B', 'B and D', 'A and D'],
  sol: 'C (petal) belongs to the corolla and E (sepal) to the calyx, the non-essential whorls — option (@K).',
  d: 2, c: 'application', t: [1],
  assets: [flowerFig],
}));
add('symm-mcq', mcq({
  stem: 'A student tries to cut a gulmohar flower and a datura flower into two equal halves by vertical planes through the centre. She succeeds in only one plane for the gulmohar and in many planes for the datura. The two flowers are respectively',
  right: 'zygomorphic and actinomorphic',
  wrong: ['actinomorphic and zygomorphic', 'asymmetric and actinomorphic', 'zygomorphic and asymmetric'],
  sol: 'One plane only means zygomorphic; many planes mean actinomorphic — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('bract-mcq', mcq({
  stem: 'Along a Bougainvillea branch each flower stalk carries a small leaf-like structure at its base. The flower is described as',
  right: 'bracteate',
  wrong: ['ebracteate', 'asymmetric', 'incomplete'],
  sol: 'A flower with a bract at the base of the pedicel is bracteate — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('incomplete-mcq', mcq({
  stem: 'A male flower of pumpkin has sepals, petals and five stamens, but no carpels. The flower is',
  right: 'incomplete, because the gynoecium is absent',
  wrong: ['complete, because it has the androecium', 'incomplete, because the androecium is absent', 'complete, because it has a calyx and a corolla'],
  sol: 'A complete flower has all four whorls; this flower lacks the gynoecium — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('merous-mcq', mcq({
  stem: 'A flower has two whorls of three tepals, two whorls of three stamens and three carpels. It is',
  right: 'trimerous, a condition typical of monocots',
  wrong: ['tetramerous, a condition typical of dicots', 'pentamerous, a condition typical of monocots', 'trimerous, a condition typical of dicots'],
  sol: 'Parts in threes make a flower trimerous, as in many monocots — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('canna-tf', tf({
  stem: 'A flower that cannot be divided into two equal halves by any vertical plane is described as zygomorphic.',
  key: 'f',
  sol: 'False: such a flower, for example canna, is asymmetric; a zygomorphic flower can be divided by one plane.',
  d: 1, c: 'recall', t: [1],
}));
add('whorl-fill', fill({
  stem: 'The androecium and the gynoecium are called the ______ whorls of a flower.',
  acc: [['essential', 'reproductive']],
  sol: 'Essential.',
  d: 1, c: 'recall', t: [1],
}));
add('ar-zygo', ar({
  a: 'A zygomorphic flower can be cut into two equal halves by only one vertical plane.',
  r: 'A zygomorphic flower is radially symmetrical.',
  key: 'c',
  sol: 'A is true. R is false: a zygomorphic flower is bilaterally symmetrical; radial symmetry belongs to an actinomorphic flower — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('ar-incomplete', ar({
  a: 'A pumpkin flower that has no stamens is an incomplete flower.',
  r: 'A complete flower has the calyx, the corolla, the androecium and the gynoecium.',
  key: 'a',
  sol: 'Both are true, and R explains A: the flower lacks one whorl, so it is incomplete — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('reason-essential', short({
  marks: 1,
  stem: 'Give a reason: the androecium and the gynoecium are called the essential whorls of a flower.',
  model: 'They produce the male and the female gametes needed for sexual reproduction, whereas the calyx and corolla only protect the bud and attract pollinators.',
  sol: 'Gametes are made by the stamens and carpels.',
  scheme: [['Produce gametes', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('reason-incomplete', short({
  marks: 1,
  stem: 'Give a reason: the male flower of a pumpkin is called an incomplete flower.',
  model: 'It lacks one of the four whorls, the gynoecium, although it has the calyx, the corolla and the androecium.',
  sol: 'Whorl missing.',
  scheme: [['A whorl is missing', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('symm-short2', short({
  marks: 2,
  stem: 'Distinguish between actinomorphic and zygomorphic flowers, giving one example of each.',
  model: 'An **actinomorphic** flower is radially symmetrical: any vertical plane through the centre gives two equal halves, as in **datura**. A **zygomorphic** flower is bilaterally symmetrical: only **one** vertical plane gives equal halves, as in **gulmohar**.',
  sol: 'Planes of symmetry with examples.',
  scheme: [['Actinomorphic with example', 1], ['Zygomorphic with example', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('merous-short2', short({
  marks: 2,
  stem: 'What is meant by the merous condition of a flower? Name the terms used when the whorls are in threes and in fives, and name the group of plants in which each is typical.',
  model: 'The **merous condition** is the number of members in each whorl of a flower. Whorls in threes make the flower **trimerous**, typical of **monocots**; whorls in fives make it **pentamerous**, typical of **dicots**.',
  sol: 'Meaning and two terms.',
  scheme: [['Meaning of merous', 1], ['Trimerous and pentamerous with groups', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('describe-short3', short({
  marks: 3,
  stem: 'A student records a flower: a small bract at the base of the stalk; five sepals, five petals and five stamens; one gynoecium; equal halves along any vertical plane. Using the terms for describing flowers, describe it in three points.',
  model: 'The flower is **bracteate**, because it has a bract at the base of the pedicel. It is **pentamerous**, because the sepals, petals and stamens are in fives, and **complete**, because all four whorls, calyx, corolla, androecium and gynoecium, are present. It is **actinomorphic**, since any vertical plane through the centre divides it into equal halves.',
  sol: 'Bract, merous, completeness, symmetry.',
  scheme: [['Bracteate', 1], ['Pentamerous and complete', 1], ['Actinomorphic with reason', 1]],
  d: 2, c: 'application', t: [1],
}));
add('whorl-short3', short({
  marks: 3,
  stem: 'Name the four whorls of a flower from outside to inside and state one function of each.',
  model: 'The **calyx**, made of sepals, protects the bud. The **corolla**, made of petals, is often coloured and attracts pollinators. The **androecium**, made of stamens, produces pollen grains, the male gametophytes. The **gynoecium**, made of carpels, bears the ovules and, after fertilisation, forms the fruit and seeds.',
  sol: 'Four whorls with functions.',
  scheme: [['Calyx and corolla with functions', 1], ['Androecium with function', 1], ['Gynoecium with function', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('flower-long', long({
  stem: '(a) Draw a labelled diagram of a typical flower in longitudinal section, showing the pedicel, thalamus, sepal, petal, stamen and carpel. [3]\n(b) Which whorls are essential and which are non-essential? Give one function of each non-essential whorl. [2]',
  model: '(a) A flower on a **pedicel**; the **thalamus** bearing **sepals** outside, **petals** inside them, **stamens** each with **filament** and **anther**, and in the centre the **carpel** with **stigma**, **style** and **ovary** containing **ovules**; all parts labelled.\n\n(b) The **androecium** and the **gynoecium** are the **essential** whorls, as they produce the gametes. The **calyx** and the **corolla** are the **non-essential** whorls: the calyx **protects** the bud and the corolla **attracts** pollinators.',
  sol: 'Diagram; essential and non-essential whorls.',
  scheme: [['(a) Flower drawn in section', 1], ['(a) Six parts labelled', 2], ['(b) Essential whorls named', 1], ['(b) Functions of calyx and corolla', 1]],
  wl: [60, 200],
  d: 2, c: 'understanding', t: [1],
}));
{
  add('members-num', num({
    stem: 'A trimerous flower has a perianth of two whorls of three tepals each, two whorls of three stamens each and a gynoecium of three carpels. How many floral members does it have in all?',
    value: LILY_MEMBERS,
    sol: r`$6 + 6 + 3 = ${LILY_MEMBERS}$.`,
    scheme: [[`${LILY_MEMBERS}`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 15 || 'value');
  add('survey-num', num({
    stem: `On a garden path a student examines ${SURVEY_TOTAL} flowers: ${SURVEY.actino} can be halved along many vertical planes, ${SURVEY.zygo} along one plane only and the rest cannot be halved. What percentage of the flowers are actinomorphic?`,
    value: SURVEY_ACTINO_PCT, unit: '%',
    sol: r`$\dfrac{${SURVEY.actino}}{${SURVEY_TOTAL}} \times 100 = ${SURVEY_ACTINO_PCT}$ percent.`,
    scheme: [[`${SURVEY_ACTINO_PCT}`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 65 || 'value');
}

// ---------------------------------------------------------------- t02 calyx, corolla, aestivation
add('aest-valvate-mcq', mcq({
  stem: 'In a bud of Calotropis the margins of neighbouring petals touch one another without overlapping. This aestivation is',
  right: 'valvate',
  wrong: ['twisted', 'imbricate', 'vexillary'],
  sol: 'Edge-to-edge contact without overlapping is valvate — option (@K).',
  d: 1, c: 'application', t: [2],
}));
add('aest-twisted-mcq', mcq({
  stem: 'In a cotton bud, each petal overlaps one neighbour with one margin and is overlapped by the other neighbour with its other margin. The aestivation is',
  right: 'twisted',
  wrong: ['valvate', 'vexillary', 'imbricate, with one petal wholly outside'],
  sol: 'Each petal overlapping the next and overlapped by the previous in a cycle is twisted — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('ck-aest-mcq', mcq({
  stem: 'In the bud of a pea flower the largest petal covers two lateral petals, which cover the two small petals in front. The aestivation is',
  right: 'vexillary',
  wrong: ['valvate', 'twisted', 'imbricate'],
  sol: 'Standard over wings over keel is vexillary — option (@K).',
  d: 1, c: 'application', t: [2],
}));
add('vex-parts-mcq', mcq({
  stem: 'In a bean flower the large posterior petal, the standard, overlaps which petals in the bud?',
  right: 'The two lateral wings',
  wrong: ['The two keel petals only', 'The sepals', 'The stamens'],
  sol: 'The standard covers the wings, which in turn cover the keel — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('perianth-mcq', mcq({
  stem: 'In a lily the sepals and petals look alike and cannot be told apart. Together they form the',
  right: 'perianth, whose members are tepals',
  wrong: ['androecium, whose members are tepals', 'perianth, whose members are bracts', 'calyx, whose members are petals'],
  sol: 'Calyx and corolla that look alike make the perianth, with tepals as members — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('gamo-mcq', mcq({
  stem: 'The petals of a datura flower are joined into a tube. The corolla is',
  right: 'gamopetalous',
  wrong: ['polypetalous', 'gamosepalous', 'polysepalous'],
  sol: 'Joined petals make the corolla gamopetalous — option (@K).',
  d: 1, c: 'application', t: [2],
}));
add('aest-fill', fill({
  stem: 'The mode of arrangement of sepals or petals in a floral bud, in relation to the other members of the same whorl, is called ______.',
  acc: [['aestivation']],
  sol: 'Aestivation.',
  d: 1, c: 'recall', t: [2],
}));
add('aest-match', match({
  stem: 'Match each plant (column I) with the aestivation of its corolla (column II).',
  pairs: [['Calotropis', 'Valvate'], ['Cotton', 'Twisted'], ['Pea', 'Vexillary'], ['Gulmohar', 'Imbricate']],
  order: [2, 0, 3, 1],
  sol: 'Calotropis valvate; cotton twisted; pea vexillary; gulmohar imbricate.',
  d: 2, c: 'understanding', t: [2],
}));
add('ar-vex', ar({
  a: 'The aestivation of a pea flower is valvate.',
  r: 'In valvate aestivation the petals overlap one another in the bud.',
  key: 'd',
  sol: 'Both are false: the pea flower has vexillary aestivation, and in valvate aestivation the margins only touch without overlapping — option (d).',
  d: 3, c: 'understanding', t: [2],
}));
add('reason-vexillary', short({
  marks: 1,
  stem: 'Give a reason: the aestivation of the pea flower is called vexillary.',
  model: 'The large standard petal overlaps the two wings, which overlap the two keel petals, like a flag (vexillum) over the other petals.',
  sol: 'Standard over wings over keel.',
  scheme: [['Standard covers wings and keel', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('aest-short2', short({
  marks: 2,
  stem: 'Define aestivation. Name any two of its types, giving one plant for each.',
  model: '**Aestivation** is the arrangement of sepals or petals in a floral bud, in relation to the other members of the same whorl. In **valvate** aestivation the margins just touch, as in **Calotropis**; in **twisted** aestivation each member overlaps the next, as in **cotton**.',
  sol: 'Definition; two types with plants.',
  scheme: [['Definition', 1], ['Two types with plants', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('perianth-short2', short({
  marks: 2,
  stem: 'What is a perianth? Name its members and one plant in which it occurs.',
  model: 'A **perianth** is the calyx and corolla together when they cannot be told apart in colour or form. Its members are called **tepals**, as in the **lily**.',
  sol: 'Perianth; tepals; lily.',
  scheme: [['Perianth defined', 1], ['Tepals and a plant', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('aest-short3', short({
  marks: 3,
  stem: 'What is aestivation? Describe any three of its types, with one plant as an example of each.',
  model: '**Aestivation** is the arrangement of petals or sepals in the bud. In **valvate** aestivation the edges of neighbouring members meet without overlapping, as in **Calotropis**. In **twisted** aestivation each member overlaps the next and is overlapped by the previous one, as in **cotton**. In **vexillary** aestivation the large **standard** covers the two **wings**, which cover the **keel**, as in the **pea**.',
  sol: 'Definition and three types.',
  scheme: [['Definition', 1], ['Two types described', 1], ['Third type with examples', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('calyxcor-short3', short({
  marks: 3,
  stem: 'A gardener says that the petals of datura are joined while those of a rose are free, and that the sepals of both flowers are green. Name the terms for the condition of the corolla in each, and explain what a botanist would call the calyx and corolla of a lily.',
  model: 'The joined petals of datura make the corolla **gamopetalous**; the free petals of rose make it **polypetalous**. In a lily the sepals and petals are alike in colour and form, so the two whorls together are called a **perianth**, and each member is a **tepal**.',
  sol: 'Gamopetalous, polypetalous, perianth.',
  scheme: [['Datura gamopetalous', 1], ['Rose polypetalous', 1], ['Lily perianth and tepals', 1]],
  d: 2, c: 'application', t: [2],
}));
add('aest-long', long({
  stem: '(a) What is aestivation? [1]\n(b) Draw labelled sketches of the corolla of a pea bud and of a Calotropis bud in transverse section, to show their aestivation. [2]\n(c) What is a perianth? Give one example of a plant that has it. [2]',
  model: '(a) **Aestivation** is the arrangement of sepals or petals in the floral bud in relation to the other members of the whorl.\n\n(b) **Pea:** the **standard** outside, covering two **wings**, which cover two **keel** petals (**vexillary**). **Calotropis:** five petals whose margins just touch in a ring without overlapping (**valvate**); each sketch is labelled.\n\n(c) A **perianth** is the calyx and the corolla together when they look alike; its members are **tepals**. The **lily** has a perianth.',
  sol: 'Definition; two sketches; perianth.',
  scheme: [['(a) Definition', 1], ['(b) Vexillary sketch labelled', 1], ['(b) Valvate sketch labelled', 1], ['(c) Perianth defined', 1], ['(c) Example', 1]],
  wl: [60, 200],
  d: 2, c: 'understanding', t: [2],
}));
add('overlap-d4-mcq', mcq({
  stem: 'A student sketches the bud of a five-petalled flower and records, for each petal, how many neighbours it overlaps (O) and how many neighbours overlap it (U): petal 1 (O 2, U 0); petals 2, 3 and 4 (O 1, U 1 each); petal 5 (O 0, U 2). Which conclusion is correct?',
  right: 'The aestivation is imbricate: petal 1 is wholly outside and petal 5 wholly inside.',
  wrong: ['The aestivation is twisted, because most petals overlap one neighbour.', 'The aestivation is valvate, because the totals of O and U are equal.', 'The record is impossible, because the totals of O and U differ.'],
  sol: r`The totals agree (O $= 2+1+1+1+0 = 5$, U $= 0+1+1+1+2 = 5$), so the record is possible. A twisted bud would have O 1 and U 1 for every petal, a valvate bud O 0 and U 0 for every petal; here one petal is wholly outside and one wholly inside, which is imbricate — option (@K).`,
  d: 4, c: 'analysis', t: [2],
}), () => aestivation(BUD1) === 'imbricate' && aestivation(BUD2) === 'twisted' || 'aest');

// ---------------------------------------------------------------- t03 androecium
add('ck-andro-mcq', mcq({
  stem: 'Nine of the ten stamens of a pea flower are joined by their filaments into one bundle and the tenth stands free. The stamens are',
  right: 'diadelphous',
  wrong: ['monadelphous', 'polyadelphous', 'syngenesious'],
  sol: 'Two bundles, one of nine and one of one, make the condition diadelphous — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('mono-mcq', mcq({
  stem: 'The filaments of all the stamens of a hibiscus flower are joined into a single tube round the style. The stamens are',
  right: 'monadelphous',
  wrong: ['diadelphous', 'syngenesious', 'epipetalous'],
  sol: 'One tube of united filaments is monadelphous — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('poly-mcq', mcq({
  stem: 'The filaments of a Bombax flower are joined into many separate bundles. The stamens are',
  right: 'polyadelphous',
  wrong: ['monadelphous', 'diadelphous', 'epiphyllous'],
  sol: 'Filaments in more than two bundles are polyadelphous — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('sun-mcq', mcq({
  stem: 'In a sunflower floret the five anthers are joined in a ring around the style, while the five filaments are free. This condition is',
  right: 'syngenesious',
  wrong: ['monadelphous', 'synandrous, with filaments and anthers all joined', 'epipetalous'],
  sol: 'Anthers united with free filaments are syngenesious — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('epipet-mcq', mcq({
  stem: 'When the corolla tube of a datura flower is pulled away, the stamens come away with it, because they are attached to the petals. The stamens are',
  right: 'epipetalous',
  wrong: ['epiphyllous', 'diadelphous', 'syngenesious'],
  sol: 'Stamens attached to the petals are epipetalous — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('sacs-mcq', mcq({
  stem: 'A transverse section of an anther shows two lobes joined by a connective, with two pollen sacs in each lobe. The anther is',
  right: 'dithecous, with four pollen sacs',
  wrong: ['monothecous, with four pollen sacs', 'dithecous, with two pollen sacs', 'monothecous, with two pollen sacs'],
  sol: 'Two lobes (thecae) with two sacs each give four sacs — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('andro-fill', fill({
  stem: 'The union of stamens with one another is called ______, and their union with another whorl is called adhesion.',
  acc: [['cohesion']],
  sol: 'Cohesion.',
  d: 1, c: 'recall', t: [3],
}));
add('andro-match', match({
  stem: 'Match each plant (column I) with the condition of its stamens (column II).',
  pairs: [['Hibiscus', 'Monadelphous'], ['Pea', 'Diadelphous'], ['Sunflower', 'Syngenesious'], ['Datura', 'Epipetalous']],
  order: [1, 3, 0, 2],
  sol: 'Hibiscus monadelphous; pea diadelphous; sunflower syngenesious; datura epipetalous.',
  d: 2, c: 'understanding', t: [3],
}));
add('syn-tf', tf({
  stem: 'In syngenesious stamens the filaments are joined together and the anthers are free.',
  key: 'f',
  sol: 'False: in syngenesious stamens the anthers are joined and the filaments are free.',
  d: 2, c: 'understanding', t: [3],
}));
add('ar-pea', ar({
  a: 'The stamens of a pea flower are diadelphous.',
  r: 'The corolla of a pea flower shows vexillary aestivation.',
  key: 'b',
  sol: 'Both are true, but R is not the explanation of A: the condition of the stamens does not depend on the aestivation of the petals — option (b).',
  d: 2, c: 'understanding', t: [3],
}));
add('reason-mono', short({
  marks: 1,
  stem: 'Give a reason: the anther of a hibiscus flower is called monothecous.',
  model: 'It has only one lobe, or theca, with two pollen sacs, so it is kidney-shaped.',
  sol: 'One lobe.',
  scheme: [['One lobe with two pollen sacs', 1]],
  d: 2, c: 'understanding', t: [3],
}));
{
  add('sacs-num', num({
    stem: `A hibiscus flower has ${HIB2.stamens} stamens with monothecous anthers. How many pollen sacs does the flower have?`,
    value: HIB2_SACS,
    sol: r`$${HIB2.stamens} \times ${SACS.monothecous} = ${HIB2_SACS}$.`,
    scheme: [[`${HIB2_SACS}`, 1]],
    d: 2, c: 'application', t: [3],
  }), (q) => q.answer.value === 96 || 'value');
  add('florets-num', num({
    stem: `Each sunflower floret has ${SUNFLOWER_FLORET.stamens} stamens with dithecous anthers. How many pollen sacs are there in ${FLORETS12} florets?`,
    value: FLORETS12_SACS,
    sol: r`One floret: $5 \times 4 = ${SUNFLOWER_SACS}$; ${FLORETS12} florets: $${SUNFLOWER_SACS} \times ${FLORETS12} = ${FLORETS12_SACS}$.`,
    scheme: [[`${FLORETS12_SACS}`, 1]],
    d: 3, c: 'application', t: [3],
  }), (q) => q.answer.value === 240 && SACS_IF_DITHECOUS === 240 || 'value');
  add('pea-num', num({
    stem: `In a pea flower nine of the ten stamens are joined and one is free. How many filaments are joined into bundles in ${PEA_FLOWERS} such flowers?`,
    value: PEA_JOINED,
    sol: r`$${PEA.joined} \times ${PEA_FLOWERS} = ${PEA_JOINED}$.`,
    scheme: [[`${PEA_JOINED}`, 1]],
    d: 2, c: 'application', t: [3],
  }), (q) => q.answer.value === 72 || 'value');
}
add('coh-short2', short({
  marks: 2,
  stem: 'Distinguish between cohesion and adhesion of stamens, giving one example of each.',
  model: '**Cohesion** is the union of stamens with **one another**, as in the **monadelphous** stamens of hibiscus. **Adhesion** is the union of stamens with **another whorl** of the flower, as in the **epipetalous** stamens of datura, attached to the petals.',
  sol: 'Cohesion and adhesion with examples.',
  scheme: [['Cohesion with example', 1], ['Adhesion with example', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('anther-short2', short({
  marks: 2,
  stem: 'Distinguish between a dithecous and a monothecous anther on the number of lobes and of pollen sacs, and name a plant with each.',
  model: 'A **dithecous** anther has **two lobes** joined by a connective and **four** pollen sacs, as in sunflower. A **monothecous** anther is kidney-shaped, with **one lobe** and **two** pollen sacs, as in hibiscus.',
  sol: 'Lobes and sacs.',
  scheme: [['Dithecous: lobes, sacs, plant', 1], ['Monothecous: lobe, sacs, plant', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('cohesion-short3', short({
  marks: 3,
  stem: 'Describe three conditions of cohesion in the androecium, giving one plant for each.',
  model: 'In **monadelphous** stamens all the filaments are joined into **one** bundle, as in **hibiscus**. In **diadelphous** stamens they form **two** bundles, nine joined and one free, as in **pea**. In **syngenesious** stamens only the **anthers** are joined and the filaments are free, as in **sunflower**.',
  sol: 'Three conditions with plants.',
  scheme: [['First condition', 1], ['Second condition', 1], ['Third condition', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('adhesion-short3', short({
  marks: 3,
  stem: 'A student examines the flower of a datura and of a lily and finds that the stamens of each are attached to another whorl. Name the two conditions and explain how they differ.',
  model: 'In **datura** the stamens are attached to the petals of the corolla tube, so they are **epipetalous**. In **lily** the stamens are attached to the **tepals** of the perianth, so they are **epiphyllous**. Both are examples of **adhesion**, the union of stamens with another whorl, but they differ in the whorl to which the stamens are attached.',
  sol: 'Epipetalous, epiphyllous, adhesion.',
  scheme: [['Datura epipetalous', 1], ['Lily epiphyllous', 1], ['Difference in the whorl', 1]],
  d: 2, c: 'application', t: [3],
}));
add('androecium-long', long({
  stem: '(a) Draw a labelled diagram of a dithecous anther in transverse section. [2]\n(b) Name three conditions of cohesion of stamens, with one plant for each. [2]\n(c) How many pollen sacs are there in a flower with 20 stamens that are monothecous? [1]',
  model: `(a) Two **lobes (thecae)** joined by the **connective**, each lobe containing two **pollen sacs**, all labelled.\n\n(b) **Monadelphous** (hibiscus), **diadelphous** (pea) and **syngenesious** (sunflower); other conditions are polyadelphous (Bombax) and synandrous (pumpkin).\n\n(c) A monothecous anther has **${SACS.monothecous}** pollen sacs, so the flower has 20 × ${SACS.monothecous} = **${20 * SACS.monothecous}** pollen sacs.`,
  sol: 'Anther diagram; cohesion; pollen sacs.',
  scheme: [['(a) Anther drawn', 1], ['(a) Parts labelled', 1], ['(b) Three conditions', 1], ['(b) Three plants', 1], ['(c) Number of sacs', 1]],
  wl: [60, 200],
  d: 2, c: 'application', t: [3],
}), () => 20 * SACS.monothecous === 40 || 'sacs');

// ---------------------------------------------------------------- t04 gynoecium
add('hypo-mcq', mcq({
  stem: 'The sepals, petals and stamens of a mustard flower arise from the thalamus below the ovary. The flower is',
  right: 'hypogynous, with a superior ovary',
  wrong: ['epigynous, with an inferior ovary', 'perigynous, with a superior ovary', 'hypogynous, with an inferior ovary'],
  sol: 'Whorls below the ovary mean a hypogynous flower with a superior ovary — option (@K).',
  d: 1, c: 'application', t: [4],
}));
add('ck-ovary-mcq', mcq({
  stem: 'Which of these flowers has an inferior ovary?',
  right: 'Cucumber',
  wrong: ['Mustard', 'Datura', 'Tomato'],
  sol: 'The cucumber flower is epigynous, so its ovary is inferior — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('peri-mcq', mcq({
  stem: 'In a plum flower the thalamus forms a cup around the ovary and the sepals, petals and stamens arise from its rim, at about the level of the ovary. The flower is',
  right: 'perigynous',
  wrong: ['hypogynous', 'epigynous', 'apocarpous'],
  sol: 'Whorls on the rim of a cup around the ovary make the flower perigynous — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('syn-mcq', mcq({
  stem: 'A cut tomato ovary shows two chambers formed from carpels that have fused. The gynoecium is',
  right: 'syncarpous, with two locules',
  wrong: ['apocarpous, with two locules', 'syncarpous, with one locule', 'apocarpous, with one locule'],
  sol: 'Fused carpels make the gynoecium syncarpous, and the chambers are locules — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('apo-mcq', mcq({
  stem: 'A lotus flower has many carpels, each with its own ovary, style and stigma, free from the others. The gynoecium is',
  right: 'apocarpous',
  wrong: ['syncarpous', 'epigynous', 'axile'],
  sol: 'Free carpels make the gynoecium apocarpous — option (@K).',
  d: 1, c: 'application', t: [4],
}));
add('ck-plac-mcq', mcq({
  stem: 'In the lettered figure of five ovaries, the placentation in which a single ovule is attached at the base of a one-chambered ovary is shown by',
  right: 'D',
  wrong: ['A', 'B', 'E'],
  sol: 'D shows one ovule at the base: basal placentation, as in sunflower — option (@K).',
  d: 1, c: 'application', t: [4],
  assets: [placFig],
}));
add('plac-fig1-mcq', mcq({
  stem: 'In the same figure, the ovary in which the ovules are borne on a central axis where the partitions of the chambers meet is',
  right: 'B',
  wrong: ['A', 'C', 'E'],
  sol: 'B shows axile placentation, as in tomato — option (@K).',
  d: 2, c: 'application', t: [4],
  assets: [placFig],
}));
add('plac-fig2-mcq', mcq({
  stem: 'In the same figure, the ovary marked E has its ovules on the inner wall of a one-chambered ovary. A plant with this placentation is',
  right: 'mustard',
  wrong: ['tomato', 'Dianthus', 'sunflower'],
  sol: 'E shows parietal placentation, as in mustard — option (@K).',
  d: 2, c: 'application', t: [4],
  assets: [placFig],
}));
add('plac-fig3-mcq', mcq({
  stem: 'In the same figure, the ovary marked A has a central column with ovules and no partitions. The plant with this placentation is',
  right: 'Dianthus',
  wrong: ['tomato', 'pea', 'sunflower'],
  sol: 'A shows free central placentation, as in Dianthus and primrose — option (@K).',
  d: 2, c: 'application', t: [4],
  assets: [placFig],
}));
add('locule-fill', fill({
  stem: 'A chamber of the ovary is called a ______.',
  acc: [['locule']],
  sol: 'Locule.',
  d: 1, c: 'recall', t: [4],
}));
add('synca-tf', tf({
  stem: 'The gynoecium of a tomato flower, in which the carpels are fused, is described as syncarpous.',
  key: 't',
  sol: 'True: fused carpels make the gynoecium syncarpous.',
  d: 1, c: 'recall', t: [4],
}));
add('ar-epig', ar({
  a: 'The ovary of a sunflower floret is inferior.',
  r: 'The thalamus of the sunflower floret fuses with the ovary, so that the other whorls arise above it.',
  key: 'a',
  sol: 'Both are true, and R explains A: when the thalamus encloses and fuses with the ovary, the other whorls arise above it and the ovary is inferior — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('reason-halfinf', short({
  marks: 1,
  stem: 'Give a reason: the ovary of a rose flower is described as half-inferior.',
  model: 'It lies in a cup-shaped thalamus whose rim bears the other whorls at its level, so it is neither wholly above nor wholly below them.',
  sol: 'Cup-shaped thalamus.',
  scheme: [['Ovary in a cup with whorls on the rim', 1]],
  d: 2, c: 'understanding', t: [4],
}));
{
  add('ovule-num', num({
    stem: `A syncarpous ovary with axile placentation has ${OV2.locules} locules and ${OV2.perLocule} ovules in each locule. How many ovules does the ovary have?`,
    value: OV2_OVULES,
    sol: r`$${OV2.locules} \times ${OV2.perLocule} = ${OV2_OVULES}$.`,
    scheme: [[`${OV2_OVULES}`, 1]],
    d: 2, c: 'application', t: [4],
  }), (q) => q.answer.value === 60 || 'value');
  add('headseed-num', num({
    stem: `A sunflower head has ${HEAD2.florets} florets, and each ovary has one ovule at its base. If five of every six ovules develop into seeds, how many seeds does the head produce?`,
    value: HEAD2_SEEDS,
    sol: r`$${HEAD2.florets} \div 6 \times 5 = ${HEAD2_SEEDS}$.`,
    scheme: [[`${HEAD2_SEEDS}`, 1]],
    d: 3, c: 'application', t: [4],
  }), (q) => q.answer.value === 500 || 'value');
}
add('ovary-short2', short({
  marks: 2,
  stem: 'Distinguish between hypogynous and epigynous flowers on the position of the ovary, giving one example of each.',
  model: 'In a **hypogynous** flower the ovary is **superior** and the other whorls arise **below** it, as in **mustard**. In an **epigynous** flower the ovary is **inferior**, because the thalamus fuses with it, and the other whorls arise **above** it, as in **sunflower**.',
  sol: 'Ovary position with examples.',
  scheme: [['Hypogynous with example', 1], ['Epigynous with example', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('apo-short2', short({
  marks: 2,
  stem: 'Distinguish between an apocarpous and a syncarpous gynoecium, giving one plant for each.',
  model: 'In an **apocarpous** gynoecium the carpels are **free** from one another, each with its own ovary, as in **lotus**. In a **syncarpous** gynoecium the carpels are **fused** into one compound ovary with chambers called **locules**, as in **tomato**.',
  sol: 'Free and fused carpels.',
  scheme: [['Apocarpous with plant', 1], ['Syncarpous with plant', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('ovary-short3', short({
  marks: 3,
  stem: 'A botanist examines three flowers in longitudinal section. In flower P the sepals, petals and stamens arise below the ovary; in Q they arise from the rim of a cup round the ovary; in R they arise above the ovary. Name the condition of each flower, state the position of its ovary and give one example.',
  model: '**P** is **hypogynous**: the ovary is **superior**, as in mustard. **Q** is **perigynous**: the ovary is **half-inferior**, in a cup-shaped thalamus, as in rose. **R** is **epigynous**: the thalamus is fused with the ovary, which is **inferior**, as in sunflower or cucumber.',
  sol: 'Three flowers.',
  scheme: [['P with position and example', 1], ['Q with position and example', 1], ['R with position and example', 1]],
  d: 3, c: 'application', t: [4],
}));
add('plac-short3', short({
  marks: 3,
  stem: 'Define placentation. Describe the axile, parietal and basal types, with one plant for each.',
  model: '**Placentation** is the arrangement of **ovules** on the **placenta** inside the ovary. In **axile** placentation the ovules are on a central axis of a chambered ovary, as in **tomato**. In **parietal** placentation they lie on the inner wall of a one-chambered ovary, as in **mustard**. In **basal** placentation a single ovule is attached at the base, as in **sunflower**.',
  sol: 'Definition and three types.',
  scheme: [['Definition', 1], ['Axile and parietal', 1], ['Basal', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('carpel-short3', short({
  marks: 3,
  stem: 'A student compares a pea ovary with a Dianthus ovary and finds the ovules of the first along one margin of a single chamber, and those of the second on a central column without partitions. Name the placentation of each and explain how the two differ.',
  model: 'The pea shows **marginal** placentation: the ovules are borne along one **margin** of a one-chambered, single-carpelled ovary. *Dianthus* shows **free central** placentation: the ovules are borne on a **central column** that is not joined to the wall by partitions. They differ in the position of the ovules: on the margin of the ovary, or on a column in its centre.',
  sol: 'Marginal; free central; difference.',
  scheme: [['Pea marginal', 1], ['Dianthus free central', 1], ['Difference', 1]],
  d: 3, c: 'application', t: [4],
}));
add('gyn-long', long({
  stem: '(a) Draw a labelled diagram of a flower in longitudinal section to show hypogynous condition. [2]\n(b) Distinguish between an apocarpous and a syncarpous gynoecium. [1]\n(c) Name the placentation of tomato and of sunflower and state where the ovules are borne in each. [2]',
  model: '(a) A thalamus with the **sepals, petals and stamens** attached **below** a **superior ovary**, which bears the **style** and **stigma**; the parts are labelled.\n\n(b) An **apocarpous** gynoecium has **free** carpels; a **syncarpous** gynoecium has **fused** carpels, usually with chambers.\n\n(c) **Tomato** shows **axile** placentation, the ovules on the central axis of a chambered ovary. **Sunflower** shows **basal** placentation, one ovule at the base of a one-chambered ovary.',
  sol: 'Hypogynous flower; carpels; placentation.',
  scheme: [['(a) Whorls below ovary', 1], ['(a) Labelled', 1], ['(b) Apocarpous and syncarpous', 1], ['(c) Axile in tomato', 1], ['(c) Basal in sunflower', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [4],
}));
add('plac-long', long({
  stem: '(a) What is placentation? Name the five types. [2]\n(b) Draw labelled diagrams of an ovary in transverse section to show axile and parietal placentation. [2]\n(c) Which type of placentation is shown by pea? [1]',
  model: '(a) **Placentation** is the arrangement of **ovules** on the **placenta** in the ovary. The types are **axile, parietal, free central, basal** and **marginal**.\n\n(b) **Axile:** a round ovary divided into chambers by partitions meeting at the centre, with ovules on the **central axis**. **Parietal:** a one-chambered ovary with ovules on the **inner wall**; the placenta and ovules are labelled.\n\n(c) The pea ovary shows **marginal** placentation, with ovules along one margin of the single chamber.',
  sol: 'Definition and types; two diagrams; pea.',
  scheme: [['(a) Definition', 1], ['(a) Five types', 1], ['(b) Axile diagram', 1], ['(b) Parietal diagram', 1], ['(c) Marginal', 1]],
  wl: [60, 200],
  d: 2, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- t05 inflorescence
add('rac-mcq', mcq({
  stem: 'In a radish shoot the main axis keeps growing and bears flowers on its sides; the flowers at the base opened first and the buds are near the tip. The inflorescence is',
  right: 'racemose',
  wrong: ['cymose', 'a perianth', 'epigynous'],
  sol: 'An axis that keeps growing, with the oldest flowers at the base, is racemose — option (@K).',
  d: 1, c: 'application', t: [5],
}));
add('cym-mcq', mcq({
  stem: 'On a jasmine branch the main axis ends in a flower, which opened first, and the younger flowers lie below it on side branches. The inflorescence is',
  right: 'cymose',
  wrong: ['racemose', 'syncarpous', 'vexillary'],
  sol: 'An axis that ends in a flower, with the oldest flower at the top, is cymose — option (@K).',
  d: 1, c: 'application', t: [5],
}));
add('ck-inflo-tf', tf({
  stem: 'The terminal flower of a cymose inflorescence is the last one to open.',
  key: 'f',
  sol: 'False: in a cymose inflorescence the terminal flower is the oldest and opens first.',
  d: 2, c: 'understanding', t: [5],
}));
add('acro-fill', fill({
  stem: 'The opening of flowers from the base towards the tip of the axis, as in a raceme, is called ______ succession.',
  acc: [['acropetal']],
  sol: 'Acropetal.',
  d: 2, c: 'recall', t: [5],
}));
add('reason-cyme', short({
  marks: 1,
  stem: 'Give a reason: the main axis of a cymose inflorescence does not keep growing in length.',
  model: 'Its main axis ends in a flower, so its growth is limited.',
  sol: 'Axis ends in a flower.',
  scheme: [['Axis ends in a flower', 1]],
  d: 1, c: 'understanding', t: [5],
}));
add('inflo-short2', short({
  marks: 2,
  stem: 'Define inflorescence. State two differences between racemose and cymose inflorescence.',
  model: 'An **inflorescence** is the arrangement of flowers on the floral axis. In a **racemose** inflorescence the main axis **keeps growing** and the **oldest flowers are at the base**; in a **cymose** one the axis **ends in a flower** and the **oldest flower is at the top**.',
  sol: 'Definition; two differences.',
  scheme: [['Definition', 1], ['Two differences', 1]],
  d: 1, c: 'understanding', t: [5],
}));
add('inflo-short3', short({
  marks: 3,
  stem: 'A florist has a bunch of radish shoots and a bunch of jasmine shoots. Explain how she can tell the two inflorescences apart by looking at the main axis and at the order in which the flowers open.',
  model: 'In **radish** the main axis **keeps growing** and bears flowers on its sides, so the inflorescence is **racemose**; the **oldest flowers are at the base** and the youngest near the tip. In **jasmine** the main axis **ends in a flower**, so the inflorescence is **cymose**; the **oldest flower is at the top** and the younger flowers lie below it.',
  sol: 'Main axis and order of opening.',
  scheme: [['Radish: axis grows, racemose', 1], ['Jasmine: axis ends in a flower, cymose', 1], ['Order of opening in each', 1]],
  d: 2, c: 'application', t: [5],
}));
{
  add('raceme-num', num({
    stem: `A raceme has ${R2.flowers} flowers and one flower opens every ${R2.everyDays} days, starting from the base. How many flowers are open on day 30, counting the one that opened on day 0?`,
    value: R2_DAY30,
    sol: r`$30 \div ${R2.everyDays} + 1 = ${R2_DAY30}$ flowers open, so ${R2_CLOSED30} buds are still closed.`,
    scheme: [[`${R2_DAY30}`, 1]],
    d: 3, c: 'application', t: [5],
  }), (q) => q.answer.value === 11 && R2_CLOSED30 === 19 && R2_GAP === 87 || 'value');
}
add('inflo-long', long({
  stem: `(a) Define inflorescence. [1]\n(b) Draw labelled diagrams of a racemose and of a cymose inflorescence, numbering the flowers in the order of opening. [2]\n(c) In a raceme of ${R3.flowers} flowers, one flower opens every ${R3.everyDays} days from the base upward. How many days pass between the opening of the lowest and the topmost flower? [1]\n(d) Name one plant with a racemose inflorescence. [1]`,
  model: `(a) An **inflorescence** is the arrangement of flowers on the floral axis.\n\n(b) **Racemose:** a main axis that keeps growing, with flowers numbered **1 at the base** and the highest numbers near the tip. **Cymose:** a main axis that ends in a flower numbered **1**, with younger flowers numbered below it.\n\n(c) There are ${R3.flowers - 1} gaps between ${R3.flowers} flowers, so ${R3.flowers - 1} × ${R3.everyDays} = **${R3_GAP} days**.\n\n(d) **Radish** (or the golden shower tree).`,
  sol: 'Definition; diagrams; days; example.',
  scheme: [['(a) Definition', 1], ['(b) Racemose drawn and numbered', 1], ['(b) Cymose drawn and numbered', 1], ['(c) Days', 1], ['(d) Example', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [5],
}), () => R3_GAP === 34 || 'gap');

void SURVEY;
