// ICSE 9 Biology ch12 The Skin — question bank in ICSE school-examination style (10-mark structured questions).
// Numbers come from calc.mjs. AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true, R does not explain.
import { mk, add, svgV } from '../../icse-9-biology-ch01/src/lib.mjs';
import { NORMAL, FEVER, ABOVE, SOLE, SOLE_AREA, SOLE_GLANDS, KJ_PER_ML, CYC_SWEAT, CYC_HEAT, SWEAT, SWEAT_RATIO, SWEAT_EXTRA, SWEAT_EXTRA_HEAT, TOE, TOE_FALL, TOE_PER_MIN, FORE, FORE_RISE, WIDTH, WIDTH_RATIO } from './calc.mjs';
import { SKIN_LETTERED, CLIMATE_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const skinFig = svgV(SKIN_LETTERED, 'A vertical section of human skin with parts lettered A to E');
const climFig = svgV(CLIMATE_LETTERED, 'Two sections of skin, P and Q, with parts lettered A to D');
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct term', 1]], ...o });

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('chk-melanin', mcq({
  stem: 'The dark pigment that protects the skin from sunlight is made in the Malpighian layer. It is called',
  right: 'melanin', wrong: ['keratin', 'sebum', 'bile'],
  sol: 'Melanin shields the skin and gives it colour — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('chk-horny', mcq({
  stem: 'The outermost layer of the epidermis is made of dead cells filled with keratin. It is the',
  right: 'horny layer', wrong: ['Malpighian layer', 'dermis', 'fat layer'],
  sol: 'The horny layer is the dead, waterproof outer layer — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('chk-sebum', mcq({
  stem: 'Sebum, an oily secretion that keeps skin and hair soft, is made by the',
  right: 'sebaceous glands', wrong: ['sweat glands', 'mammary glands', 'salivary glands'],
  sol: 'Sebaceous glands make sebum — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('chk-dilate', mcq({
  stem: 'The widening of blood vessels in the skin on a hot day is called',
  right: 'vasodilation', wrong: ['vasoconstriction', 'evaporation', 'shivering'],
  sol: 'Vasodilation means widening of the vessels — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('chk-constrict', mcq({
  stem: 'The narrowing of blood vessels in the skin on a cold day is called',
  right: 'vasoconstriction', wrong: ['vasodilation', 'sweating', 'emulsification'],
  sol: 'Vasoconstriction means narrowing of the vessels — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('chk-evap', mcq({
  stem: 'Sweating cools the body because',
  right: 'the sweat evaporates and takes heat from the skin', wrong: ['the sweat is colder than the body', 'the sweat widens the blood vessels', 'the sweat makes the hair stand up'],
  sol: 'Evaporation of sweat takes heat from the skin — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t01 structure and functions
add('divide-mcq', mcq({
  stem: 'The horny layer of the epidermis is rubbed off every day, yet the skin does not wear away. This is because the layer below has living cells that',
  right: 'keep dividing to replace it', wrong: ['make sweat to wet it', 'carry blood to it', 'store fat for it'],
  sol: 'The Malpighian layer keeps dividing and renews the horny layer — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('tan-mcq', mcq({
  stem: 'A farmer who works in the open for many months has darker skin than his sister who works indoors. The extra pigment is made by cells of the',
  right: 'Malpighian layer', wrong: ['horny layer', 'fat layer', 'erector muscles'],
  sol: 'Melanin is made in the Malpighian layer — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('dermis-mcq', mcq({
  stem: 'A paper cut that bleeds and hurts has cut through the epidermis into the',
  right: 'dermis', wrong: ['horny layer', 'Malpighian layer only', 'hair shaft'],
  sol: 'Blood vessels and nerve endings lie in the dermis — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('nerve-mcq', mcq({
  stem: 'A girl touches a hot pan and pulls her hand away at once. The heat was first detected by',
  right: 'nerve endings in the skin', wrong: ['sweat glands in the skin', 'the horny layer of the skin', 'fat cells in the skin'],
  sol: 'Nerve endings in the skin sense heat and send messages to the brain — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('fatlayer-mcq', mcq({
  stem: 'A layer of fat below the dermis helps the body because it',
  right: 'insulates the body and stores food', wrong: ['makes sweat and sebum', 'produces melanin', 'detects touch and pain'],
  sol: 'Fat is a poor conductor of heat and is a store of food — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('vitD-mcq', mcq({
  stem: 'A child who is kept indoors all day lacks a vitamin that the skin makes in sunlight. The vitamin is',
  right: 'vitamin D', wrong: ['vitamin A', 'vitamin C', 'vitamin K'],
  sol: 'Sunlight helps the skin to make vitamin D — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('figSkinB-mcq', mcq({
  stem: 'In the figure of the skin, which letter marks the layer of living cells that keep dividing and hold the dark pigment?',
  right: 'B', wrong: ['A', 'C', 'E'],
  sol: 'B is the Malpighian layer; A is the horny layer, C a sebaceous gland, D a sweat gland and E a blood vessel — option (@K).',
  d: 2, c: 'application', t: [1],
  assets: [skinFig],
}));
add('figSkinE-mcq', mcq({
  stem: 'In the figure of the skin, which letter marks the structure that carries heat in the blood to the surface?',
  right: 'E', wrong: ['A', 'B', 'C'],
  sol: 'E is a blood vessel in the dermis — option (@K).',
  d: 2, c: 'application', t: [1],
  assets: [skinFig],
}));
add('ar-horny', ar({
  a: 'The horny layer of the skin protects the body from germs.',
  r: 'The horny layer is made of dead cells filled with keratin and is waterproof.',
  key: 'c',
  sol: 'Both are true, and the tough keratin-filled dead layer forms the barrier — option (c).',
  d: 2, c: 'analysis', t: [1],
}));
add('epi-tf', tf({
  stem: 'The epidermis contains many blood vessels.',
  key: 'f',
  sol: 'False. Blood vessels are in the dermis; the epidermis has none.',
  d: 1, c: 'recall', t: [1],
}));
add('term-keratin', term({
  stem: 'Give the biological term: the tough protein found in the horny layer, hair and nails.',
  model: '**Keratin.**', sol: 'Keratin.', sch: 'Keratin',
  d: 1, c: 'recall', t: [1],
}));
add('odd-layer', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: Epidermis, Dermis, Fat layer, Sebum.',
  model: '**Sebum**; the others are **layers of the skin**.', sol: 'Sebum is a secretion.', sch: 'Odd one and category',
  d: 2, c: 'analysis', t: [1],
}));
add('reason-horny', term({
  stem: 'Give reason: the skin on the heel is thick and tough.',
  model: 'The **horny layer** of dead, keratin-filled cells becomes thick where the skin is **rubbed and pressed** the most, giving **protection**.', sol: 'Thick horny layer protects.', sch: 'Thick horny layer protects',
  d: 2, c: 'application', t: [1],
}));
add('sole-num', num({
  stem: `A patch of skin on a sole is ${SOLE.l} cm by ${SOLE.w} cm and has ${SOLE.density} sweat glands on every square centimetre. How many sweat glands are on the patch?`,
  value: SOLE_GLANDS,
  sol: `Area = ${SOLE.l} × ${SOLE.w} = ${SOLE_AREA} square centimetres; glands = ${SOLE_AREA} × ${SOLE.density} = ${SOLE_GLANDS}.`,
  scheme: [[`${SOLE_GLANDS}`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === 2500 || 'value');
add('layers-short2', short({
  marks: 2,
  stem: 'Name the two layers of the epidermis and state which one is made of dead cells.',
  model: 'The epidermis has the **horny layer** (outer) and the **Malpighian layer** (inner). The **horny layer** is made of dead cells filled with keratin.',
  sol: 'Horny layer and Malpighian layer; horny layer is dead.',
  scheme: [['Horny and Malpighian layers', 1], ['Horny layer is dead', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('melanin-short2', short({
  marks: 2,
  stem: 'Where is melanin made and what is its function?',
  model: 'Melanin is made in the **Malpighian layer** of the epidermis. It is a **dark pigment** that gives the skin its colour and **shields it from the harmful rays of sunlight**.',
  sol: 'Malpighian layer; pigment that protects from sunlight.',
  scheme: [['Malpighian layer', 1], ['Pigment protecting from sunlight', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('senses-short2', short({
  marks: 2,
  stem: 'Name two sensations detected by the skin and the part of the skin that detects them.',
  model: 'The skin detects **touch**, **pain**, **pressure**, **heat** and **cold** (any two). They are detected by **nerve endings** in the dermis (and the epidermis).',
  sol: 'Two sensations; nerve endings.',
  scheme: [['Two sensations', 1], ['Nerve endings', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('func-short3', short({
  marks: 3,
  stem: 'State three functions of the skin.',
  model: '1. It **protects** the body from germs, water loss and sunlight.\n2. It is a **sense organ**: nerve endings detect touch, pain, heat and cold.\n3. It helps to **control body temperature** by sweating and by changes in its blood vessels. (Others: excretion in sweat; making vitamin D; storing fat.)',
  sol: 'Any three functions.',
  scheme: [['First function', 1], ['Second function', 1], ['Third function', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('layers-table3', short({
  marks: 3,
  stem: 'Tabulate three differences between the horny layer and the Malpighian layer.',
  model: '| Horny layer | Malpighian layer |\n|---|---|\n| **Outermost** layer of the epidermis | **Innermost** layer of the epidermis |\n| Made of **dead** cells | Made of **living** cells |\n| Cells filled with **keratin** | Cells **divide** and hold **melanin** |',
  sol: 'Position; living or dead; contents or function.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('match5', match({
  marks: 5,
  stem: 'Study the diagram of the skin and match each lettered part with its description.',
  pairs: [
    ['A', 'Outer layer of dead cells filled with keratin'],
    ['B', 'Living cells that divide and hold melanin'],
    ['C', 'Makes oil that keeps hair and skin soft'],
    ['D', 'Coiled gland that makes sweat'],
    ['E', 'Carries blood and helps in the control of heat loss'],
  ],
  order: [4, 0, 2, 1, 3],
  sol: 'A horny layer; B Malpighian layer; C sebaceous gland; D sweat gland; E blood vessel.',
  d: 2, c: 'application', t: [1, 2],
  assets: [skinFig],
}));

// ---------------------------------------------------------------- t02 derivatives
add('milk-mcq', mcq({
  stem: 'A baby is fed on milk produced by the',
  right: 'mammary glands of the mother', wrong: ['sweat glands of the mother', 'sebaceous glands of the mother', 'salivary glands of the baby'],
  sol: 'Mammary glands make milk — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('nail-mcq', mcq({
  stem: 'Hair and nails are both made of the same hard protein. It is',
  right: 'keratin', wrong: ['melanin', 'sebum', 'glycogen'],
  sol: 'Hair, nails and the horny layer are made of keratin — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('hair-mcq', mcq({
  stem: 'A barber cuts a boy\'s hair and the boy feels no pain. This is because the part of the hair that is cut is',
  right: 'dead and has no nerves', wrong: ['alive but has no blood', 'made of living cells of the dermis', 'full of sweat'],
  sol: 'The shaft of a hair is made of dead keratin cells — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('oily-mcq', mcq({
  stem: 'A washerwoman\'s hands become dry and rough after using strong soap for many hours, because the soap washes away the oil made by the',
  right: 'sebaceous glands', wrong: ['sweat glands', 'mammary glands', 'erector muscles'],
  sol: 'Sebum is an oil that keeps the skin soft — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('derivative-mcq', mcq({
  stem: 'Which one of these is not a derivative of the skin?',
  right: 'Kidney', wrong: ['Nail', 'Hair', 'Sweat gland'],
  sol: 'The kidney is an excretory organ, not a structure that grows out of the skin — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('sweat-mcq', mcq({
  stem: 'A hiker finds white crystals on his shirt after the sweat has dried. Besides water, sweat contains',
  right: 'salts and a little urea', wrong: ['starch and fat', 'bile and sugar', 'keratin and melanin'],
  sol: 'Sweat is mostly water with salts and a little urea — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('erector-mcq', mcq({
  stem: 'When the hair on an arm stands up, the part of the skin that pulls it upright is the',
  right: 'erector muscle', wrong: ['sebaceous gland', 'sweat gland', 'nerve ending'],
  sol: 'A small erector muscle is attached to each hair follicle — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('ar-nails', ar({
  a: 'Nails protect the tips of the fingers and toes.',
  r: 'The nail plate is made of living cells with blood vessels.',
  key: 'a',
  sol: 'The assertion is true. The reason is false: the nail plate is made of dead keratin cells, and only the root is living — option (a).',
  d: 2, c: 'analysis', t: [2],
}));
add('ar-sweat', ar({
  a: 'Sweating helps to cool the body.',
  r: 'Sweat contains water, salts and a little urea.',
  key: 'd',
  sol: 'Both are true, but the composition of sweat does not explain the cooling, which is due to evaporation — option (d).',
  d: 3, c: 'analysis', t: [2, 3],
}));
add('sweatgland-tf', tf({
  stem: 'Sweat glands open on the skin surface through tiny pores.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [2],
}));
add('term-derivative', term({
  stem: 'Give the biological term: structures such as hair and nails that grow out of the skin.',
  model: '**Derivatives of the skin.**', sol: 'Derivatives of the skin.', sch: 'Derivatives',
  d: 1, c: 'recall', t: [2],
}));
add('odd-deriv', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: Hair, Nails, Sweat gland, Blood vessel.',
  model: '**Blood vessel**; the others are **derivatives of the skin**.', sol: 'A blood vessel is not a derivative.', sch: 'Odd one and category',
  d: 2, c: 'analysis', t: [2],
}));
add('reason-hairnail', term({
  stem: 'Give reason: cutting the nails does not cause pain.',
  model: 'The visible nail plate is made of **dead cells** with no nerves; the living **root** is under the skin.', sol: 'Nail plate is dead.', sch: 'Dead cells',
  d: 2, c: 'understanding', t: [2],
}));
add('hairnail-short2', short({
  marks: 2,
  stem: 'State one function each of (i) hair and (ii) nails.',
  model: '(i) **Hair** protects the head from sun and cold by trapping warm air (and senses touch). (ii) **Nails** protect the tips of the fingers and toes.',
  sol: 'Hair protects or keeps warm; nails protect the tips.',
  scheme: [['Function of hair', 1], ['Function of nails', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('deriv-short2', short({
  marks: 2,
  stem: 'State the function of (i) the sebaceous glands and (ii) the mammary glands.',
  model: '(i) The **sebaceous glands** make **sebum**, an oil that keeps the skin and hair soft and waterproof. (ii) The **mammary glands** make **milk** to feed the baby.',
  sol: 'Sebum for soft skin; milk for the baby.',
  scheme: [['Sebaceous glands: sebum', 1], ['Mammary glands: milk', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('sweatcomp-short2', short({
  marks: 2,
  stem: 'Name two substances present in sweat other than water and state one use of sweat to the body.',
  model: 'Sweat contains **salts** and a little **urea**. It **cools the body** when it evaporates (and removes small amounts of waste).',
  sol: 'Salts and urea; cools the body.',
  scheme: [['Salts and urea', 1], ['One use', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('deriv-short3', short({
  marks: 3,
  stem: 'Name three derivatives of the skin and state a function of each.',
  model: '**Sweat glands** make sweat, which cools the body. **Sebaceous glands** make sebum, which keeps skin and hair soft. **Hair** protects and keeps the body warm. (Or **nails** protect the finger tips; **mammary glands** make milk.)',
  sol: 'Three derivatives with a function each.',
  scheme: [['First derivative with function', 1], ['Second derivative with function', 1], ['Third derivative with function', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('sweat-seb-table3', short({
  marks: 3,
  stem: 'Tabulate three differences between sweat glands and sebaceous glands.',
  model: '| Sweat glands | Sebaceous glands |\n|---|---|\n| Make **sweat** (water, salts, urea) | Make **sebum** (oil) |\n| **Coiled** tubes deep in the dermis, opening by a **pore** | Small glands that open into a **hair follicle** |\n| **Cool** the body and remove some waste | Keep skin and hair **soft and waterproof** |',
  sol: 'Secretion; structure and opening; function.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('nonskin-short3', short({
  marks: 3,
  stem: 'A girl has dry, cracked skin on her hands, and brittle nails, and finds that her scalp is oily. Name the derivative responsible for the oil and state its secretion and function.',
  model: 'The **sebaceous glands** are responsible. They secrete **sebum**, an oily substance that keeps the skin and hair **soft and waterproof**; if it is too much the scalp becomes oily, and if it is too little the skin becomes dry.',
  sol: 'Sebaceous gland; sebum; keeps skin and hair soft.',
  scheme: [['Sebaceous glands', 1], ['Sebum', 1], ['Function', 1]],
  d: 2, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 heat regulation
add('hot-mcq', mcq({
  stem: 'After a long run, a boy\'s face turns red and feels warm. This is because the blood vessels of his skin have',
  right: 'widened, so more blood flows near the surface', wrong: ['narrowed, so more blood flows near the surface', 'widened, so less blood flows near the surface', 'closed completely'],
  sol: 'Vasodilation brings more warm blood to the surface — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('cold-mcq', mcq({
  stem: 'A man\'s hands turn pale and cold in a very cold room because the blood vessels of the skin have',
  right: 'narrowed, so less blood reaches the surface', wrong: ['widened, so more blood reaches the surface', 'narrowed, so more blood reaches the surface', 'widened and the sweat has evaporated'],
  sol: 'Vasoconstriction reduces blood flow near the surface and heat loss — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('humid-mcq', mcq({
  stem: 'On a very humid day we feel hotter and stickier than on a dry day at the same temperature, because the sweat',
  right: 'evaporates slowly, so less heat is taken away', wrong: ['evaporates quickly and cools us too much', 'is not produced at all', 'makes the vessels of the skin narrow'],
  sol: 'In humid air evaporation is slow, so cooling is poor — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('shiver-mcq', mcq({
  stem: 'A man standing in the cold begins to shiver. Shivering helps because the muscles',
  right: 'contract rapidly and release heat', wrong: ['absorb heat from the skin', 'make more sweat', 'widen the blood vessels'],
  sol: 'Rapid muscle contractions release heat — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('goose-mcq', mcq({
  stem: 'In the cold, the hairs on the arm stand up and trap a layer of air. This helps because air is',
  right: 'a poor conductor of heat', wrong: ['a good conductor of heat', 'a source of heat', 'a store of water'],
  sol: 'A layer of trapped air insulates the skin — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('figVasoP-mcq', mcq({
  stem: 'In the figure of two sections of skin, which section, P or Q, shows the skin on a hot day?',
  right: 'P, because the blood vessel is wide and sweat is present', wrong: ['Q, because the blood vessel is wider and sweat is present', 'P, because the hairs are standing up', 'Q, because the hairs are standing up'],
  sol: 'On a hot day the vessels widen and sweat is made; section P shows both — option (@K).',
  d: 2, c: 'application', t: [3],
  assets: [climFig],
}));
add('figVasoC-mcq', mcq({
  stem: 'In the figure of two sections of skin, which letter marks the structure that reduces heat loss by standing up to trap air?',
  right: 'D', wrong: ['A', 'B', 'C'],
  sol: 'D marks the erect hairs in section Q; A and C are blood vessels and B is sweat — option (@K).',
  d: 3, c: 'application', t: [3],
  assets: [climFig],
}));
add('ar-vaso', ar({
  a: 'On a cold day the blood vessels of the skin widen.',
  r: 'Narrowing of the skin vessels reduces the heat lost from the body.',
  key: 'b',
  sol: 'The assertion is false: on a cold day the vessels narrow. The reason is true — option (b).',
  d: 2, c: 'analysis', t: [3],
}));
add('vessel-tf', tf({
  stem: 'On a cold day the blood vessels of the skin widen.',
  key: 'f',
  sol: 'False. They narrow (vasoconstriction), so less heat is lost.',
  d: 1, c: 'recall', t: [3],
}));
add('shiver-tf', tf({
  stem: 'Shivering releases heat because the muscles contract rapidly.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [3],
}));
add('reason-red', term({
  stem: 'Give reason: the face looks red after hard exercise.',
  model: 'The **blood vessels widen** (vasodilation), so **more blood flows near the surface** to lose heat.', sol: 'Vasodilation.', sch: 'Vessels widen',
  d: 2, c: 'application', t: [3],
}));
add('reason-pale', term({
  stem: 'Give reason: a person\'s skin looks pale and feels cold in very cold weather.',
  model: 'The **blood vessels narrow** (vasoconstriction), so **less blood flows near the surface** and less heat is lost.', sol: 'Vasoconstriction.', sch: 'Vessels narrow',
  d: 2, c: 'application', t: [3],
}));
add('fever-num', num({
  stem: `The normal body temperature is ${NORMAL} degrees Celsius. A patient\'s temperature is ${FEVER} degrees. By how many degrees is it above normal?`,
  value: ABOVE,
  sol: `${FEVER} − ${NORMAL} = ${ABOVE} degrees.`,
  scheme: [[`${ABOVE}`, 1]],
  d: 1, c: 'application', t: [3],
}), (q) => q.answer.value === 2 || 'value');
add('sweat-num', num({
  stem: `A boy sweats ${SWEAT.cool} mL an hour in a cool room and ${SWEAT.hot} mL an hour in a hot room. How many times more sweat does he make in the hot room?`,
  value: SWEAT_RATIO,
  sol: `${SWEAT.hot} ÷ ${SWEAT.cool} = ${SWEAT_RATIO} times.`,
  scheme: [[`${SWEAT_RATIO}`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => q.answer.value === 6 || 'value');
add('heat-num', num({
  stem: `Each millilitre of sweat that evaporates takes away about ${KJ_PER_ML} kilojoules of heat. In the boy\'s case the extra sweat in the hot room is ${SWEAT_EXTRA} mL an hour. How many kilojoules of extra heat does it carry away?`,
  value: SWEAT_EXTRA_HEAT,
  sol: `${SWEAT_EXTRA} × ${KJ_PER_ML} = ${SWEAT_EXTRA_HEAT} kilojoules.`,
  scheme: [[`${SWEAT_EXTRA_HEAT}`, 1]],
  d: 3, c: 'application', t: [3],
}), (q) => q.answer.value === 240 || 'value');
add('fore-num', num({
  stem: `The skin of a boy\'s forehead is ${FORE[0]} degrees before a game and ${FORE[1]} degrees after 10 minutes of running. By how many degrees has it risen?`,
  value: FORE_RISE,
  sol: `${FORE[1]} − ${FORE[0]} = ${FORE_RISE} degrees.`,
  scheme: [[`${FORE_RISE}`, 1]],
  d: 1, c: 'application', t: [3],
}), (q) => q.answer.value === 3 || 'value');
add('width-num', num({
  stem: `A blood vessel in the skin is ${WIDTH.hot} micrometres wide on a hot day and ${WIDTH.cold} micrometres wide on a cold day. How many times wider is it on the hot day?`,
  value: WIDTH_RATIO,
  sol: `${WIDTH.hot} ÷ ${WIDTH.cold} = ${WIDTH_RATIO} times.`,
  scheme: [[`${WIDTH_RATIO}`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => q.answer.value === 3 || 'value');
add('fill-heat', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [melanin, keratin, sebum, vasodilation, vasoconstriction, dermis, epidermis, sweat]\n\nThe horny layer is made of dead cells filled with (a) ______. The dark pigment (b) ______ is made in the Malpighian layer. The oily secretion of the sebaceous glands is (c) ______. On a hot day the skin blood vessels widen, a process called (d) ______. On a cold day they narrow, a process called (e) ______.',
  acc: [['keratin'], ['melanin'], ['sebum'], ['vasodilation'], ['vasoconstriction']],
  sol: '(a) keratin; (b) melanin; (c) sebum; (d) vasodilation; (e) vasoconstriction.',
  d: 2, c: 'understanding', t: [1, 2, 3],
}));
add('vaso-short2', short({
  marks: 2,
  stem: 'State what happens to the blood vessels of the skin on (i) a hot day and (ii) a cold day.',
  model: '(i) On a hot day they **widen** (vasodilation), so more heat is lost. (ii) On a cold day they **narrow** (vasoconstriction), so less heat is lost.',
  sol: 'Widen on a hot day; narrow on a cold day.',
  scheme: [['Widen on a hot day', 1], ['Narrow on a cold day', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('evap-short2', short({
  marks: 2,
  stem: 'Explain how sweating helps to cool the body.',
  model: 'The sweat glands pour **sweat** on to the skin. When the sweat **evaporates**, it **takes heat** from the skin, so the body is cooled.',
  sol: 'Sweat evaporates and takes heat.',
  scheme: [['Sweat made and poured on to the skin', 1], ['Evaporation takes heat from the body', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('cold-short2', short({
  marks: 2,
  stem: 'State two responses of the body to cold, other than the narrowing of the blood vessels of the skin.',
  model: 'The **hairs stand up** and trap a layer of air, which is a poor conductor of heat. The body **shivers**, so the muscles contract and release heat.',
  sol: 'Hairs erect; shivering.',
  scheme: [['Hairs stand up and trap air', 1], ['Shivering releases heat', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('why-short2', short({
  marks: 2,
  stem: 'Why must the body temperature be kept almost steady at about 37 degrees Celsius?',
  model: 'The **enzymes** in the cells work best at about this temperature. If the body becomes **too hot or too cold**, the reactions in the cells slow down or go wrong.',
  sol: 'Enzymes work best at this temperature.',
  scheme: [['Enzymes work best at this temperature', 1], ['Reactions go wrong if too hot or cold', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('vaso-table3', short({
  marks: 3,
  stem: 'Tabulate three differences between vasodilation and vasoconstriction.',
  model: '| Vasodilation | Vasoconstriction |\n|---|---|\n| Skin vessels **widen** | Skin vessels **narrow** |\n| Occurs on a **hot** day | Occurs on a **cold** day |\n| **More** blood near the surface, **more** heat lost | **Less** blood near the surface, **less** heat lost |',
  sol: 'Vessel width; day; heat loss.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('hot-short3', short({
  marks: 3,
  stem: 'State three ways in which the skin helps the body to lose heat on a hot day.',
  model: '1. The blood vessels **widen** (vasodilation), so more blood flows near the surface and heat is lost by radiation.\n2. The **sweat glands** make more sweat.\n3. The sweat **evaporates** and takes heat from the skin.',
  sol: 'Vasodilation; more sweat; evaporation.',
  scheme: [['Vasodilation', 1], ['More sweat made', 1], ['Evaporation takes heat', 1]],
  d: 2, c: 'application', t: [3],
}));
add('cold-short3', short({
  marks: 3,
  stem: 'Describe three changes that take place in the skin and the body of a person who stands in cold winds, and state the use of each.',
  model: 'The **blood vessels of the skin narrow** so less heat is lost. The **hairs stand up** and trap air that insulates the skin. The person **shivers**, and the muscles release heat.',
  sol: 'Vasoconstriction; erect hairs; shivering.',
  scheme: [['Vasoconstriction and its use', 1], ['Hairs erect and use', 1], ['Shivering and use', 1]],
  d: 2, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('skinfig-long', long({
  marks: 10, wl: null,
  stem: 'Study the diagram of a vertical section of the human skin. Parts are lettered A to E.\n\n(a) Name the parts A, D and E. [3]\n\n(b) Name the part B and state one of its functions. [2]\n\n(c) Name the part C and state its secretion. [2]\n\n(d) Draw a neat, labelled diagram of a hair with its follicle and erector muscle, naming three parts. [3]',
  model: '**(a)** A is the **horny layer**, D is a **sweat gland** and E is a **blood vessel**.\n\n**(b)** B is the **Malpighian layer**; its cells **divide** to replace the horny layer (or it holds **melanin**, which shields the skin from sunlight).\n\n**(c)** C is a **sebaceous gland**; it secretes **sebum**, an oil that keeps the skin and hair soft and waterproof.\n\n**(d)** A **hair shaft** growing out of a **hair follicle** in the dermis, with an **erector muscle** attached to the follicle and a **bulb** at the base; three labels.',
  sol: 'Horny layer, sweat gland, blood vessel; Malpighian layer and a function; sebaceous gland, sebum; labelled hair follicle.',
  scheme: [['A horny layer', 1], ['D sweat gland', 1], ['E blood vessel', 1], ['B Malpighian layer', 1], ['A function of B', 1], ['C sebaceous gland', 1], ['Sebum', 1], ['Hair and follicle drawn', 1], ['Three labels', 2]],
  d: 2, c: 'application', t: [1, 2],
  assets: [skinFig],
}));
add('palm-long', long({
  marks: 10, wl: null,
  stem: `A patch of skin on a sole is ${SOLE.l} cm by ${SOLE.w} cm. It has ${SOLE.density} sweat glands on every square centimetre. A student also finds that the skin of the heel is much thicker than the skin of the arm.\n\n(a) Calculate the number of sweat glands on the patch. [2]\n\n(b) Name the layer of the skin that is thicker on the heel and give a reason for the thickness. [2]\n\n(c) State the substances that the sweat contains besides water. [2]\n\n(d) Draw a neat, labelled diagram of a sweat gland with its duct and pore, naming three parts. [4]`,
  model: `**(a)** Area = ${SOLE.l} × ${SOLE.w} = ${SOLE_AREA} square centimetres; glands = ${SOLE_AREA} × ${SOLE.density} = **${SOLE_GLANDS}**.\n\n**(b)** The **horny layer** of the epidermis; it is thicker where the skin is **rubbed and pressed** most, which gives **protection**.\n\n**(c)** **Salts** and a little **urea**.\n\n**(d)** A **coiled tube** in the dermis, a **duct** running up through the epidermis and a **pore** on the surface; three labels.`,
  sol: `${SOLE_GLANDS} glands; horny layer, rubbing; salts and urea; labelled sweat gland.`,
  scheme: [['Area', 1], [`${SOLE_GLANDS}`, 1], ['Horny layer', 1], ['Reason: rubbing and protection', 1], ['Salts', 1], ['Urea', 1], ['Sweat gland drawn', 2], ['Three labels', 2]],
  d: 3, c: 'application', t: [1, 2],
}), () => SOLE_GLANDS === 2500 || 'glands');
add('deriv-long', long({
  marks: 10, wl: null,
  stem: 'A mountaineer returns from a long trek. His lips and hands are dry and cracked, his nails are broken, his head is sunburnt where the hair is thin, and he notes that his sweat glands and sebaceous glands seem to be working differently.\n\n(a) Name the gland that makes the oil that keeps skin soft and state the name of the oil. [2]\n\n(b) State the function of (i) hair and (ii) nails. [2]\n\n(c) Name the gland that makes milk and state in whom it works. [2]\n\n(d) Draw a neat, labelled vertical section of the skin, naming four parts. [4]',
  model: '**(a)** The **sebaceous gland** makes **sebum**.\n\n**(b)** (i) **Hair** protects the head from the sun and cold by trapping warm air. (ii) **Nails** protect the tips of the fingers and toes.\n\n**(c)** The **mammary gland**; it works in a **mother** (female) to feed her baby.\n\n**(d)** The **epidermis** (horny layer, Malpighian layer), **dermis** with a **sweat gland**, **hair follicle** and **blood vessel**, and the **fat layer**; four labels.',
  sol: 'Sebaceous gland, sebum; hair, nails; mammary gland, mother; labelled skin.',
  scheme: [['Sebaceous gland', 1], ['Sebum', 1], ['Function of hair', 1], ['Function of nails', 1], ['Mammary gland', 1], ['Female or mother', 1], ['Skin section drawn', 2], ['Four labels', 2]],
  d: 2, c: 'application', t: [2],
}));
add('hot-long', long({
  marks: 10, wl: null,
  stem: `A cyclist rides for an hour in the midday sun and sweats ${CYC_SWEAT} mL. Each millilitre of sweat that evaporates takes away about ${KJ_PER_ML} kilojoules of heat. His face turns red and the skin of his arms feels warm.\n\n(a) Calculate the heat taken away by the sweat in the hour. [2]\n\n(b) Name the change in the blood vessels of the skin and explain how it helps. [2]\n\n(c) State why the sweat must evaporate in order to cool the body. [2]\n\n(d) Draw a neat, labelled diagram of a section of the skin on a hot day, showing a blood vessel, a sweat gland and a pore, with four labels. [4]`,
  model: `**(a)** ${CYC_SWEAT} × ${KJ_PER_ML} = **${CYC_HEAT} kilojoules**.\n\n**(b)** **Vasodilation**: the vessels **widen**, so **more warm blood flows near the surface** and more heat is lost.\n\n**(c)** Evaporation **takes heat from the skin**; sweat that only runs off the skin would not cool it.\n\n**(d)** A **wide blood vessel** near the surface, a **sweat gland** with its **duct** and **pore** and **drops of sweat** on the surface; four labels.`,
  sol: `${CYC_HEAT} kilojoules; vasodilation; evaporation takes heat; labelled hot-day skin.`,
  scheme: [['Working', 1], [`${CYC_HEAT} kilojoules`, 1], ['Vasodilation', 1], ['More blood near the surface, more heat lost', 1], ['Evaporation takes heat from the skin', 1], ['Sweat that does not evaporate does not cool', 1], ['Skin drawn', 2], ['Four labels', 2]],
  d: 3, c: 'application', t: [3],
  assets: [climFig],
}), () => CYC_HEAT === 1080 || 'heat');
add('cold-long', long({
  marks: 10, wl: null,
  stem: `A mountaineer\'s toe has a temperature of ${TOE[0]} degrees when she steps into the snow. It is ${TOE[1]} degrees after 5 minutes and ${TOE[2]} degrees after 10 minutes. Her skin looks pale and her arm hairs stand up.\n\n(a) Calculate the total fall in temperature and the mean fall each minute. [2]\n\n(b) Name the change in the skin blood vessels and explain the pale colour. [2]\n\n(c) State two ways in which the standing hairs and the shivering that follows help her. [2]\n\n(d) Draw a neat, labelled diagram of a section of the skin on a cold day, showing a blood vessel, a hair and the erector muscle, with four labels. [4]`,
  model: `**(a)** Fall = ${TOE[0]} − ${TOE[2]} = **${TOE_FALL} degrees**; mean = ${TOE_FALL} ÷ 10 = **${TOE_PER_MIN} degrees a minute**.\n\n**(b)** **Vasoconstriction**: the vessels **narrow**, so **less blood flows near the surface**, which makes the skin look pale.\n\n**(c)** The standing hairs **trap a layer of air**, a poor conductor of heat; shivering makes the muscles **release heat**.\n\n**(d)** A **narrow blood vessel**, a **hair standing erect**, the **erector muscle** attached to the follicle, and the **epidermis** and **dermis**; four labels.`,
  sol: `${TOE_FALL} degrees and ${TOE_PER_MIN} a minute; vasoconstriction, less blood at the surface; trapped air, shivering; labelled cold-day skin.`,
  scheme: [[`${TOE_FALL} degrees`, 1], [`${TOE_PER_MIN} a minute`, 1], ['Vasoconstriction', 1], ['Less blood at the surface', 1], ['Hairs trap air', 1], ['Shivering releases heat', 1], ['Skin drawn', 2], ['Four labels', 2]],
  d: 3, c: 'application', t: [3],
}), () => TOE_FALL === 12 && TOE_PER_MIN === 1.2 || 'fall');
add('design-long', long({
  marks: 10, wl: null,
  stem: 'A rare condition leaves a boy with almost no sweat glands. His parents find that he overheats quickly while playing and that his skin is dry.\n\n(a) Explain why he overheats on a hot day. [2]\n\n(b) State one precaution that would help to protect him. [2]\n\n(c) Name one other response of the skin that still helps him lose heat and explain how. [2]\n\n(d) Draw a neat, labelled vertical section of the skin, naming four parts. [4]',
  model: '**(a)** Without sweat glands he cannot **sweat**, so there is no cooling by **evaporation of sweat**, and heat builds up in the body.\n\n**(b)** Any one: **stay in the shade**, **wear light, wet clothing**, **drink plenty of water** and rest, or use fans, so that heat can be lost by other means.\n\n**(c)** **Vasodilation**: the blood vessels of the skin widen, so **more warm blood flows near the surface** and more heat is lost by radiation.\n\n**(d)** The **epidermis** (horny layer, Malpighian layer), the **dermis** with a **blood vessel**, **hair follicle** and **sebaceous gland**, and the **fat layer**; four labels.',
  sol: 'No sweat so no evaporative cooling; shade or wet clothing; vasodilation; labelled skin.',
  scheme: [['Cannot sweat', 1], ['No cooling by evaporation', 1], ['A suitable precaution', 2], ['Vasodilation', 1], ['More blood near the surface, more heat lost', 1], ['Skin section drawn', 2], ['Four labels', 2]],
  d: 4, c: 'evaluation', t: [3, 1],
}));
