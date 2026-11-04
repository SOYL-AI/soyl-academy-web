// ICSE 9 Biology ch09 Nutrition: Food and Balanced Diet — question bank in ICSE school-examination style (10-mark structured questions).
// Numbers come from calc.mjs. AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true, R does not explain.
import { mk, add, svgV, r } from '../../icse-9-biology-ch01/src/lib.mjs';
import { KJ, BREAKFAST, LUNCH, FATCARB, WATER, CALCIUM, CLINIC, FIBRE, WARD } from './calc.mjs';
import { PLATE_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const plateFig = svgV(PLATE_LETTERED, 'A plate divided into five sectors lettered A to E');
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct term', 1]], ...o });

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('carb-chk', mcq({
  stem: 'Which class of food is the main source of energy in the diet?',
  right: 'Carbohydrates', wrong: ['Proteins', 'Vitamins', 'Mineral salts'],
  sol: 'Carbohydrates are the main energy food — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('iodine-chk', mcq({
  stem: 'Deficiency of which mineral causes goitre?',
  right: 'Iodine', wrong: ['Calcium', 'Iron', 'Sodium'],
  sol: 'Iodine is needed to make thyroxine; lack of it causes goitre — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('vitc-chk', mcq({
  stem: 'Which vitamin deficiency causes scurvy?',
  right: 'Vitamin C', wrong: ['Vitamin A', 'Vitamin D', 'Vitamin K'],
  sol: 'Lack of vitamin C causes scurvy, with bleeding gums — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('vitd-chk', mcq({
  stem: 'A child with bow legs probably lacks',
  right: 'vitamin D', wrong: ['vitamin A', 'vitamin B1', 'vitamin C'],
  sol: 'Lack of vitamin D causes rickets, with soft bent bones — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('bal-chk', mcq({
  stem: 'A balanced diet is one that',
  right: 'has all the nutrients, water and roughage in the amounts the person needs', wrong: ['has only proteins and fats', 'is the same for every person', 'has only fruits and vegetables'],
  sol: 'A balanced diet suits the age, work and health of the person — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('cell-chk', mcq({
  stem: 'Cellulose is useful in the diet although humans cannot digest it, because it',
  right: 'adds bulk and helps to prevent constipation', wrong: ['gives a lot of energy', 'is changed to protein', 'supplies vitamins'],
  sol: 'Roughage adds bulk and helps the gut to push food on — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('kwash-chk', mcq({
  stem: 'A young child with a swollen belly, thin limbs and pale hair is most likely to have',
  right: 'kwashiorkor', wrong: ['marasmus', 'rickets', 'goitre'],
  sol: 'A swollen belly with thin limbs points to kwashiorkor, a lack of protein — option (@K).',
  d: 1, c: 'understanding', t: [5],
}));
add('maras-chk', mcq({
  stem: 'A wasted infant under one year with a shrunken face and visible ribs is most likely to have',
  right: 'marasmus', wrong: ['kwashiorkor', 'anaemia', 'scurvy'],
  sol: 'A wasted body without swelling points to marasmus — option (@K).',
  d: 1, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- t01 classes of food
add('fat-mcq', mcq({
  stem: 'A mountaineer wants to carry the food that gives the most energy for its mass. The best choice is',
  right: 'ghee, which is a fat', wrong: ['boiled rice, which is a carbohydrate', 'boiled pulses, which are proteins', 'cucumber, which is mostly water'],
  sol: 'Fat gives about 37 kJ per gram, more than twice the energy of carbohydrate or protein — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('protein-mcq', mcq({
  stem: 'A boy is recovering from a deep cut and a broken arm. His doctor asks him to eat more eggs, milk and pulses, because they supply',
  right: 'proteins for growth and repair', wrong: ['carbohydrates for roughage', 'fats for cooling the body', 'water for making enzymes'],
  sol: 'Proteins build and repair body cells — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('water-mcq', mcq({
  stem: 'A runner is drenched in sweat at the end of a race. The main use of the water lost in sweat is to',
  right: 'cool the body', wrong: ['build muscle', 'store energy', 'make vitamins'],
  sol: 'Evaporation of sweat cools the body — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('carbsrc-mcq', mcq({
  stem: 'A tired cyclist drinks sugarcane juice and feels fresh in a few minutes. The juice has quickly supplied',
  right: 'carbohydrate for energy', wrong: ['protein for repair', 'fat for warmth', 'iron for blood'],
  sol: 'Sugar is a carbohydrate that is quickly used for energy — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('ar-fat', ar({
  a: 'Fats are a good store of energy in the body.',
  r: 'Fats are digested to amino acids.',
  key: 'a',
  sol: 'The assertion is true. The reason is false: fats are digested to fatty acids and glycerol; amino acids come from proteins — option (a).',
  d: 3, c: 'analysis', t: [1],
}));
add('tf-fatvit', tf({
  stem: 'Fats help the body to carry the vitamins A, D, E and K.',
  key: 't',
  sol: 'True. These are the fat-soluble vitamins.',
  d: 2, c: 'understanding', t: [1],
}));
add('fill-protein', fill({
  stem: 'The class of food that is mainly needed for growth and repair of the body is ______.',
  acc: [['protein', 'proteins']],
  sol: 'Protein.',
  d: 1, c: 'recall', t: [1],
}));
add('odd-class', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: Rice, Wheat, Potato, Egg.',
  model: '**Egg**; the others are **carbohydrate-rich foods** (energy foods).', sol: 'Egg is a protein-rich food.', sch: 'Odd one and category',
  d: 2, c: 'analysis', t: [1],
}));
add('reason-sweat', term({
  stem: 'Give reason: we should drink more water in hot weather.',
  model: 'We lose much **water as sweat** to cool the body, and this water must be **replaced**.', sol: 'Water lost as sweat is replaced.', sch: 'Water lost in sweat',
  d: 2, c: 'understanding', t: [1],
}));
add('energy-num', num({
  stem: `A lunch has ${LUNCH.carbohydrate} g of carbohydrate, ${LUNCH.protein} g of protein and ${LUNCH.fat} g of fat. Taking ${KJ.carbohydrate} kJ per g for carbohydrate and protein and ${KJ.fat} kJ per g for fat, find the energy in kJ.`,
  value: LUNCH.total,
  sol: r`$${LUNCH.carbohydrate} \times ${KJ.carbohydrate} + ${LUNCH.protein} \times ${KJ.protein} + ${LUNCH.fat} \times ${KJ.fat} = ${LUNCH.kj.carbohydrate} + ${LUNCH.kj.protein} + ${LUNCH.kj.fat} = ${LUNCH.total}$ kJ.`,
  scheme: [[`${LUNCH.total}`, 1]],
  d: 3, c: 'application', t: [1],
  unit: 'kJ',
}), (q) => q.answer.value === 2695 || 'value');
add('fat-short', short({
  marks: 2,
  stem: 'State two functions of fats in the body.',
  model: 'Fats are a **store of energy** (and give more energy per gram than carbohydrates). They **insulate** the body and keep it warm, **protect** delicate organs, and **carry the fat-soluble vitamins**.',
  sol: 'Store of energy; insulation or protection.',
  scheme: [['First function', 1], ['Second function', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('prot-short', short({
  marks: 2,
  stem: 'State two functions of proteins and name two sources of proteins.',
  model: 'Proteins are needed for **growth and repair** of body cells and for making **enzymes** (and antibodies). Sources: **pulses**, **milk**, **eggs**, **fish** or **meat**.',
  sol: 'Growth and repair; enzymes; two sources.',
  scheme: [['Two functions', 1], ['Two sources', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('water-short', short({
  marks: 2,
  stem: 'State two functions of water in the human body.',
  model: 'Water is a **solvent** in which substances dissolve and are **carried round the body** (in the blood). It **cools the body** when sweat evaporates, and it is needed for chemical reactions.',
  sol: 'Solvent and transport; cooling.',
  scheme: [['First function', 1], ['Second function', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('classes-three', short({
  marks: 3,
  stem: 'Name one function and one source each of carbohydrates, fats and proteins.',
  model: '1. **Carbohydrates**: the main source of **energy**; sources are rice, wheat or potato.\n2. **Fats**: a **store of energy** that also keeps the body warm; sources are oil, ghee or butter.\n3. **Proteins**: needed for **growth and repair** of cells; sources are pulses, milk, eggs, fish or meat.',
  sol: 'Function and source for each class.',
  scheme: [['Carbohydrates: function and source', 1], ['Fats: function and source', 1], ['Proteins: function and source', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 minerals
add('goitre-mcq', mcq({
  stem: 'Many villagers in a hilly area, far from the sea, have swollen necks. Their diet most likely lacks',
  right: 'iodine', wrong: ['iron', 'calcium', 'sodium'],
  sol: 'A swollen neck (goitre) comes from lack of iodine — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('anaemia-mcq', mcq({
  stem: 'A girl looks pale and is always tired. A blood test shows that she has little haemoglobin. Her diet should include more',
  right: 'spinach and jaggery', wrong: ['butter and cream', 'rice and sugar', 'tea and biscuits'],
  sol: 'Spinach and jaggery are rich in iron, which is needed to make haemoglobin — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('calcium-mcq', mcq({
  stem: 'An old woman has weak bones that break easily. The mineral that she needs more of, from foods such as milk and ragi, is',
  right: 'calcium', wrong: ['iodine', 'sodium', 'iron'],
  sol: 'Calcium builds and strengthens bones and teeth — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('sodium-mcq', mcq({
  stem: 'A labourer working for hours in the hot sun gets painful muscle cramps. Drinking water with a little common salt helps, because the salt replaces',
  right: 'sodium lost in sweat', wrong: ['calcium lost in sweat', 'iodine lost in sweat', 'protein lost in sweat'],
  sol: 'Sodium is lost with sweat and is needed for muscles and nerves — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('ar-iodine', ar({
  a: 'People in hilly regions are advised to use iodised salt.',
  r: 'Iodine is needed by the thyroid gland to make thyroxine.',
  key: 'c',
  sol: 'Both are true, and the need for iodine to make thyroxine explains the advice — option (c).',
  d: 2, c: 'analysis', t: [2],
}));
add('fill-iodine', fill({
  stem: 'The mineral needed to make thyroxine in the thyroid gland is ______.',
  acc: [['iodine']],
  sol: 'Iodine.',
  d: 1, c: 'recall', t: [2],
}));
add('term-goitre', term({
  stem: 'Give the biological term: swelling of the neck caused by lack of iodine.',
  model: '**Goitre.**', sol: 'Goitre.', sch: 'Goitre',
  d: 1, c: 'recall', t: [2],
}));
add('reason-iodised', term({
  stem: 'Give reason: iodised salt is recommended in places far from the sea.',
  model: 'It supplies **iodine**, needed to make **thyroxine**, and so **prevents goitre**.', sol: 'Supplies iodine; prevents goitre.', sch: 'Iodine prevents goitre',
  d: 2, c: 'understanding', t: [2],
}));
add('calcium-num', num({
  stem: `A growing child needs about ${CALCIUM.need} mg of calcium a day. A glass of milk gives about ${CALCIUM.perGlass} mg. How many glasses of milk would supply the whole day's calcium?`,
  value: CALCIUM.glasses,
  sol: r`$${CALCIUM.need} \div ${CALCIUM.perGlass} = ${CALCIUM.glasses}$ glasses.`,
  scheme: [[`${CALCIUM.glasses}`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 4 || 'value');
add('iron-short', short({
  marks: 2,
  stem: 'State one function of iron and the effect of its deficiency. Name one source of iron.',
  model: 'Iron is needed to make **haemoglobin** of the red blood cells. Its lack causes **anaemia** (pale, tired, weak). A source: **spinach** (jaggery, liver or meat).',
  sol: 'Haemoglobin; anaemia; spinach.',
  scheme: [['Function and deficiency effect', 1], ['Source', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('iodine-short', short({
  marks: 2,
  stem: 'State the function of iodine in the body and the effect of its deficiency.',
  model: 'Iodine is needed by the thyroid gland to make **thyroxine**. Lack of iodine causes **goitre**, a swelling of the neck.',
  sol: 'Thyroxine; goitre.',
  scheme: [['Function', 1], ['Deficiency effect', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('calcium-short', short({
  marks: 2,
  stem: 'State two functions of calcium in the body.',
  model: 'Calcium **builds bones and teeth** and makes them hard. It also helps **blood to clot** and is needed for the working of **muscles**.',
  sol: 'Bones and teeth; blood clotting.',
  scheme: [['First function', 1], ['Second function', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('mineral-three', short({
  marks: 3,
  stem: 'Name three minerals. For each, give one function and the effect of its deficiency.',
  model: '| Mineral | Function | Deficiency |\n|---|---|---|\n| **Calcium** | Builds bones and teeth | Weak bones and teeth |\n| **Iodine** | Makes thyroxine | Goitre |\n| **Iron** | Makes haemoglobin | Anaemia |',
  sol: 'Three minerals with function and deficiency.',
  scheme: [['First mineral, function and deficiency', 1], ['Second mineral, function and deficiency', 1], ['Third mineral, function and deficiency', 1]],
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 vitamins
add('night-mcq', mcq({
  stem: 'A child eats little milk, carrot or papaya, and cannot see well in dim light in the evening. The vitamin lacking in the diet is',
  right: 'vitamin A', wrong: ['vitamin C', 'vitamin D', 'vitamin K'],
  sol: 'Lack of vitamin A causes night blindness — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('beri-mcq', mcq({
  stem: 'People whose main food is polished rice develop weak nerves and muscles and the disease beri-beri. They lack',
  right: 'vitamin B1', wrong: ['vitamin A', 'vitamin C', 'vitamin D'],
  sol: 'Beri-beri is caused by lack of vitamin B1, lost when rice is polished — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('vitk-mcq', mcq({
  stem: 'A small cut on a patient bleeds for a long time before it stops. The patient may lack',
  right: 'vitamin K', wrong: ['vitamin B1', 'vitamin D', 'vitamin A'],
  sol: 'Vitamin K helps blood to clot — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('vitsrc-mcq', mcq({
  stem: 'A doctor advises a patient with bleeding gums to eat amla and guava. These fruits are rich in',
  right: 'vitamin C', wrong: ['vitamin D', 'vitamin K', 'vitamin A'],
  sol: 'Amla and guava are rich sources of vitamin C, which prevents scurvy — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('solub-mcq', mcq({
  stem: 'Which of these vitamins dissolves in fat and is stored in the body?',
  right: 'Vitamin A', wrong: ['Vitamin B1', 'Vitamin C', 'Both vitamin B1 and vitamin C'],
  sol: 'Vitamins A, D, E and K are fat-soluble; B and C are water-soluble — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('ar-vitd', ar({
  a: 'Deficiency of vitamin D causes scurvy.',
  r: 'Vitamin D helps the body to absorb calcium.',
  key: 'b',
  sol: 'The assertion is false: lack of vitamin D causes rickets; scurvy is caused by lack of vitamin C. The reason is true — option (b).',
  d: 3, c: 'analysis', t: [3],
}));
add('tf-vitc', tf({
  stem: 'Vitamin C is a fat-soluble vitamin.',
  key: 'f',
  sol: 'False. Vitamin C is water-soluble; the fat-soluble vitamins are A, D, E and K.',
  d: 2, c: 'recall', t: [3],
}));
add('odd-vit', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: Vitamin A, Vitamin D, Vitamin K, Vitamin C.',
  model: '**Vitamin C**; the others are **fat-soluble vitamins**.', sol: 'Vitamin C is water-soluble.', sch: 'Odd one and category',
  d: 2, c: 'analysis', t: [3],
}));
add('vit-match5', match({
  marks: 5,
  stem: 'Match each vitamin in the first list with the deficiency effect in the second list.',
  pairs: [
    ['Vitamin A', 'Night blindness'],
    ['Vitamin B1', 'Beri-beri'],
    ['Vitamin C', 'Scurvy'],
    ['Vitamin D', 'Rickets'],
    ['Vitamin K', 'Bleeding that is slow to stop'],
  ],
  order: [3, 0, 4, 1, 2],
  sol: 'A night blindness; B1 beri-beri; C scurvy; D rickets; K slow clotting.',
  d: 2, c: 'understanding', t: [3],
}));
add('vitA-short', short({
  marks: 2,
  stem: 'Name two sources of vitamin A. State one effect of its deficiency.',
  model: 'Sources: **carrot**, **papaya**, milk, liver or fish liver oil. Lack of vitamin A causes **night blindness** (and dry eyes).',
  sol: 'Two sources; night blindness.',
  scheme: [['Two sources', 1], ['Deficiency effect', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('vitD-short', short({
  marks: 2,
  stem: 'State the function of vitamin D and the disease caused by its deficiency in children.',
  model: 'Vitamin D helps the body to **absorb calcium** (and phosphorus) for **strong bones**. Its lack causes **rickets** in children, with soft, bent bones.',
  sol: 'Absorbs calcium; rickets.',
  scheme: [['Function', 1], ['Deficiency disease', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('vit-three', short({
  marks: 3,
  stem: 'Tabulate the vitamins B1, C and K, giving a function and a deficiency effect of each.',
  model: '| Vitamin | Function | Deficiency |\n|---|---|---|\n| **B1** | Releases energy from carbohydrates; healthy nerves | **Beri-beri** |\n| **C** | Healthy gums and skin; heals wounds | **Scurvy** |\n| **K** | Helps blood to clot | Bleeding slow to stop |',
  sol: 'Function and deficiency of B1, C and K.',
  scheme: [['Vitamin B1: function and deficiency', 1], ['Vitamin C: function and deficiency', 1], ['Vitamin K: function and deficiency', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('passage-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [carbohydrates, proteins, iron, iodine, vitamin D, vitamin C, roughage, calcium]\n\nThe main source of energy is (a) ______. Haemoglobin is made with (b) ______. Lack of (c) ______ causes goitre, and lack of (d) ______ causes scurvy. The fibre that adds bulk to the food waste is called (e) ______.',
  acc: [['carbohydrates', 'carbohydrate'], ['iron'], ['iodine'], ['vitamin C'], ['roughage']],
  sol: '(a) carbohydrates; (b) iron; (c) iodine; (d) vitamin C; (e) roughage.',
  d: 2, c: 'understanding', t: [1, 2, 3, 4],
}));

// ---------------------------------------------------------------- t04 balanced diet and cellulose
add('bal-mcq', mcq({
  stem: 'A heavy labourer and an office clerk eat the same amount of food. The labourer feels weak, but the clerk does not. This shows that a balanced diet depends on',
  right: 'the kind of work and needs of the person', wrong: ['the colour of the food', 'the price of the food', 'the cooking vessel used'],
  sol: 'Energy needs depend on age, size and occupation — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('fibre-mcq', mcq({
  stem: 'A man who eats mostly white bread and meat often suffers from constipation. His doctor asks him to add',
  right: 'whole grains, vegetables and fruit with the peel', wrong: ['more butter and ghee', 'more sugar and sweets', 'more white bread'],
  sol: 'These foods contain cellulose (roughage), which adds bulk and helps the gut to push the food on — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('plate-mcq', mcq({
  stem: 'In the figure of a plate, sector A is the largest and sector B holds pulses, eggs and fish. Which sector mainly supplies protein?',
  right: 'B', wrong: ['A', 'C', 'E'],
  sol: 'B holds the protein foods; A is cereals, C vegetables and fruits, D milk and E oil — option (@K).',
  d: 2, c: 'application', t: [4],
  assets: [plateFig],
}));
add('ar-cell', ar({
  a: 'Humans cannot digest cellulose.',
  r: 'The human gut does not make the enzyme that breaks down cellulose.',
  key: 'c',
  sol: 'Both are true, and the lack of the enzyme explains why cellulose is not digested — option (c).',
  d: 2, c: 'analysis', t: [4],
}));
add('tf-cell', tf({
  stem: 'Humans digest cellulose and use it as their main source of energy.',
  key: 'f',
  sol: 'False. Humans cannot digest cellulose; it only adds roughage.',
  d: 2, c: 'understanding', t: [4],
}));
add('reason-roughage', term({
  stem: 'Give reason: raw vegetable salad is included in a balanced diet although its cellulose is not digested.',
  model: 'The cellulose acts as **roughage**: it adds **bulk** to the food waste and **prevents constipation**.', sol: 'Roughage adds bulk.', sch: 'Adds bulk and prevents constipation',
  d: 2, c: 'understanding', t: [4],
}));
add('fibre-num', num({
  stem: `A person eats ${FIBRE.veg} g of vegetables with ${FIBRE.per100} g of fibre in each 100 g. The target is ${FIBRE.target} g of fibre a day. How many more grams of fibre are needed?`,
  value: FIBRE.short,
  sol: r`Fibre eaten $= ${FIBRE.veg} \div 100 \times ${FIBRE.per100} = ${FIBRE.got}$ g; still needed $= ${FIBRE.target} - ${FIBRE.got} = ${FIBRE.short}$ g.`,
  scheme: [[`${FIBRE.short}`, 1]],
  d: 3, c: 'application', t: [4],
  unit: 'g',
}), (q) => q.answer.value === 21 || 'value');
add('bal-short', short({
  marks: 2,
  stem: 'What is a balanced diet? Name one factor on which the amounts of food needed depend.',
  model: 'A **balanced diet** has **all the nutrients, water and roughage in the amounts the person needs**. The amounts depend on the person\'s **age** (or sex, size, occupation or health).',
  sol: 'All nutrients in right amounts; one factor.',
  scheme: [['Meaning', 1], ['One factor', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('rough-short', short({
  marks: 2,
  stem: 'Why is cellulose useful in the diet although humans cannot digest it?',
  model: 'Cellulose forms **roughage**: it adds **bulk** to the food waste and holds water, helping the gut to push it on, and so **prevents constipation**. We cannot digest it because we **lack the enzyme** that breaks it down.',
  sol: 'Roughage adds bulk; prevents constipation.',
  scheme: [['Adds bulk or holds water', 1], ['Prevents constipation', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('diet-three', short({
  marks: 3,
  stem: 'State three reasons why a balanced diet is important.',
  model: '1. It supplies enough **energy** for work, play and growth, according to the needs of the person.\n2. It supplies proteins and minerals as materials for **growth and repair** of the body.\n3. It supplies vitamins and minerals in the right amounts, so it **prevents deficiency diseases** and keeps the body healthy.',
  sol: 'Energy; growth and repair; prevents deficiency diseases.',
  scheme: [['First reason', 1], ['Second reason', 1], ['Third reason', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('plate-draw', short({
  marks: 3, wl: null,
  stem: 'Draw a neat, labelled diagram of a plate divided into five food groups for a balanced diet. Label each group with one nutrient it supplies.',
  model: 'A circle divided into five sectors: **cereals** (largest; **carbohydrates**), **pulses, eggs and fish** (**proteins**), **vegetables and fruits** (**vitamins and minerals, roughage**), **milk** (**calcium**) and **oil, ghee or nuts** (small; **fats**). Five labels with ruled lines.',
  sol: 'Plate of five sectors with five labels.',
  scheme: [['Circle in five sectors, cereals largest', 1], ['Five food groups named', 1], ['A nutrient for each group', 1]],
  d: 2, c: 'application', t: [4],
}));
add('plate-match5', match({
  marks: 5,
  stem: 'Study the figure of a plate and match each lettered sector with the main nutrient it supplies.',
  pairs: [
    ['A', 'Carbohydrates for energy'],
    ['B', 'Proteins for growth and repair'],
    ['C', 'Vitamins, minerals and roughage'],
    ['D', 'Calcium for bones and teeth'],
    ['E', 'Fats, needed in small amounts'],
  ],
  order: [2, 4, 1, 0, 3],
  sol: 'A cereals: carbohydrates; B pulses, eggs, fish: proteins; C vegetables and fruits: vitamins, minerals, roughage; D milk: calcium; E oil: fats.',
  d: 2, c: 'application', t: [4],
  assets: [plateFig],
}));

// ---------------------------------------------------------------- t05 malnutrition
add('kwash-mcq', mcq({
  stem: 'A three-year-old child, fed mostly on rice and rice water since weaning, has a swollen belly, thin arms and legs and pale, thin hair. The child needs more',
  right: 'protein in the diet', wrong: ['iodine in the diet', 'roughage in the diet', 'vitamin K in the diet'],
  sol: 'These are the signs of kwashiorkor, which comes from lack of protein — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('maras-mcq', mcq({
  stem: 'An eight-month-old infant of a mother who has too little milk is very thin, with a wrinkled, old-looking face and ribs that can be counted. There is no swelling. The infant most likely lacks',
  right: 'food of all kinds, both energy and protein', wrong: ['protein alone', 'iodine alone', 'vitamin C alone'],
  sol: 'A wasted body with no swelling is marasmus, caused by lack of energy and protein — option (@K).',
  d: 3, c: 'analysis', t: [5],
}));
add('prevent-mcq', mcq({
  stem: 'A health worker wants to reduce kwashiorkor in a village. The most useful advice for mothers is to',
  right: 'give weaning foods made with pulses, milk and eggs', wrong: ['stop all feeding when the child has fever', 'feed only rice and sugar water', 'give extra salt in every meal'],
  sol: 'Protein-rich weaning foods prevent kwashiorkor — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('ar-mal', ar({
  a: 'Kwashiorkor is caused by deficiency of protein.',
  r: 'Marasmus mostly affects infants.',
  key: 'd',
  sol: 'Both are true, but the second statement does not explain the first — option (d).',
  d: 3, c: 'analysis', t: [5],
}));
add('tf-maras', tf({
  stem: 'A child with marasmus has a swollen belly.',
  key: 'f',
  sol: 'False. A swollen belly is a sign of kwashiorkor; in marasmus the body is wasted with no swelling.',
  d: 2, c: 'understanding', t: [5],
}));
add('reason-kwash', term({
  stem: 'Give reason: a young child fed only on rice may develop kwashiorkor.',
  model: 'Rice is mostly **carbohydrate** and has **little protein**, so the child lacks the **protein** needed for growth and repair.', sol: 'Diet lacks protein.', sch: 'Diet lacks protein',
  d: 2, c: 'understanding', t: [5],
}));
add('kwash-short', short({
  marks: 2,
  stem: 'State the cause of kwashiorkor and two of its symptoms.',
  model: 'Kwashiorkor is caused by **deficiency of protein** in the diet. Its symptoms include a **swollen belly**, **thin arms and legs**, a puffy face and pale, thin hair.',
  sol: 'Lack of protein; two symptoms.',
  scheme: [['Cause', 1], ['Two symptoms', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('km-table', short({
  marks: 3,
  stem: 'Tabulate three differences between kwashiorkor and marasmus.',
  model: '| Kwashiorkor | Marasmus |\n|---|---|\n| Caused by lack of **protein** | Caused by lack of **all food** (energy and protein) |\n| Usually in children of **1 to 5 years** | Usually in **infants** under one year |\n| **Swollen belly**, thin limbs | **No swelling**; very thin, wasted body |\n| Puffy face, pale thin hair | **Shrunken, old-looking** face |',
  sol: 'Cause; age; belly and body.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('prevent-three', short({
  marks: 3,
  stem: 'State three ways of preventing malnutrition in children.',
  model: '1. **Breast-feeding** of infants.\n2. **Protein-rich weaning foods** such as pulses, milk and eggs.\n3. A **balanced diet** for the family (with clean water, vaccination and health education).',
  sol: 'Breast-feeding; protein-rich weaning foods; balanced diet.',
  scheme: [['First way', 1], ['Second way', 1], ['Third way', 1]],
  d: 2, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('meal-long', long({
  marks: 10, wl: null,
  stem: `A school lunch has ${LUNCH.carbohydrate} g of carbohydrate, ${LUNCH.protein} g of protein and ${LUNCH.fat} g of fat. Take ${KJ.carbohydrate} kJ per g for carbohydrate and protein, and ${KJ.fat} kJ per g for fat.\n\n(a) Calculate the energy from each class and the total energy of the lunch. [3]\n\n(b) Which class gives the most energy per gram? Give one reason why it is useful as an energy store. [2]\n\n(c) State one function and one source of proteins. [2]\n\n(d) Draw a neat, labelled bar graph of the energy from the three classes. [3]`,
  model: `**(a)** Carbohydrate = ${LUNCH.carbohydrate} × ${KJ.carbohydrate} = **${LUNCH.kj.carbohydrate} kJ**; protein = ${LUNCH.protein} × ${KJ.protein} = **${LUNCH.kj.protein} kJ**; fat = ${LUNCH.fat} × ${KJ.fat} = **${LUNCH.kj.fat} kJ**; total = **${LUNCH.total} kJ**.\n\n**(b)** **Fat** (${KJ.fat} kJ per g, over twice the energy of carbohydrate); it stores a lot of energy in a small mass and also insulates the body.\n\n**(c)** Proteins are needed for **growth and repair**; sources: **pulses**, **milk** or **eggs**.\n\n**(d)** Three bars: carbohydrate ${LUNCH.kj.carbohydrate}, protein ${LUNCH.kj.protein} and fat ${LUNCH.kj.fat} kJ; the vertical axis labelled energy (kJ), the horizontal axis labelled with the three classes.`,
  sol: `${LUNCH.kj.carbohydrate}, ${LUNCH.kj.protein}, ${LUNCH.kj.fat}, ${LUNCH.total} kJ; fat; growth and repair; bar graph.`,
  scheme: [[`${LUNCH.kj.carbohydrate} kJ and ${LUNCH.kj.protein} kJ`, 1], [`${LUNCH.kj.fat} kJ`, 1], [`${LUNCH.total} kJ in all`, 1], ['Fat', 1], ['A reason', 1], ['Function of proteins', 1], ['A source of proteins', 1], ['Three bars of the right heights', 2], ['Axes labelled', 1]],
  d: 3, c: 'application', t: [1],
}), (q) => LUNCH.total === 2695 || 'total');
add('mineral-long', long({
  marks: 10, wl: null,
  stem: `A health camp in a hilly village finds three problems: many villagers have swollen necks, a teenage girl is pale and always tired, and an elderly man has weak bones. A growing child in the village needs about ${CALCIUM.need} mg of calcium a day, and a glass of milk gives about ${CALCIUM.perGlass} mg.\n\n(a) Name the mineral whose deficiency is the likely cause of each problem. [3]\n\n(b) State the function of each of these three minerals. [3]\n\n(c) How many glasses of milk give a child the daily calcium? [2]\n\n(d) Draw a neat, labelled outline of the human body showing where iodine and iron are mainly needed. [2]`,
  model: `**(a)** Swollen necks: **iodine** (goitre); pale and tired girl: **iron** (anaemia); weak bones: **calcium**.\n\n**(b)** **Iodine**: needed to make **thyroxine** in the thyroid gland. **Iron**: makes **haemoglobin** of red blood cells. **Calcium**: builds **bones and teeth**.\n\n**(c)** ${CALCIUM.need} ÷ ${CALCIUM.perGlass} = **${CALCIUM.glasses} glasses**.\n\n**(d)** A body outline with the **thyroid gland** (iodine) marked in the neck, and the **blood or heart** (iron) marked in the chest. Two labels.`,
  sol: `Iodine, iron, calcium; thyroxine, haemoglobin, bones; ${CALCIUM.glasses} glasses; labelled body outline.`,
  scheme: [['Iodine for goitre', 1], ['Iron for the pale girl', 1], ['Calcium for weak bones', 1], ['Function of iodine', 1], ['Function of iron', 1], ['Function of calcium', 1], [`${CALCIUM.glasses} glasses`, 2], ['Body outline with the two places marked and labelled', 2]],
  d: 3, c: 'application', t: [2],
}), (q) => CALCIUM.glasses === 4 || 'glasses');
add('vit-long', long({
  marks: 10, wl: null,
  stem: `A clinic records ${CLINIC.total} patients with a vitamin deficiency: ${CLINIC.A} lack vitamin A, ${CLINIC.B1} lack B1, ${CLINIC.C} lack C, ${CLINIC.D} lack D and ${CLINIC.K} lack K.\n\n(a) What percentage of the patients lack vitamin D? [2]\n\n(b) How many patients lack a water-soluble vitamin, and what percentage is this? [2]\n\n(c) Name the deficiency disease of vitamins A, C and D. [3]\n\n(d) Draw a neat, labelled bar graph of the number of patients for each vitamin. [3]`,
  model: `**(a)** ${CLINIC.D} ÷ ${CLINIC.total} × 100 = **${CLINIC.pctD} percent**.\n\n**(b)** Water-soluble vitamins are B1 and C: ${CLINIC.B1} + ${CLINIC.C} = **${CLINIC.water}** patients; ${CLINIC.water} ÷ ${CLINIC.total} × 100 = **${CLINIC.pctWater} percent**.\n\n**(c)** Vitamin A: **night blindness**; vitamin C: **scurvy**; vitamin D: **rickets**.\n\n**(d)** Five bars of heights ${CLINIC.A}, ${CLINIC.B1}, ${CLINIC.C}, ${CLINIC.D} and ${CLINIC.K}; the axes labelled (vitamin lacking; number of patients).`,
  sol: `${CLINIC.pctD} percent; ${CLINIC.water} patients and ${CLINIC.pctWater} percent; night blindness, scurvy, rickets; bar graph.`,
  scheme: [['Working for the percentage', 1], [`${CLINIC.pctD} percent`, 1], [`${CLINIC.water} patients`, 1], [`${CLINIC.pctWater} percent`, 1], ['Night blindness', 1], ['Scurvy', 1], ['Rickets', 1], ['Five bars of the right heights', 2], ['Axes labelled', 1]],
  d: 3, c: 'application', t: [3],
}), (q) => CLINIC.pctD === 30 || 'pct');
add('diet-long', long({
  marks: 10, wl: null,
  stem: `A nutritionist plans meals for a college hostel. One student eats ${FIBRE.veg} g of vegetables a day, with ${FIBRE.per100} g of fibre in each 100 g. The daily target is ${FIBRE.target} g of fibre.\n\n(a) Define a balanced diet. [2]\n\n(b) Explain why cellulose cannot be digested by humans and why it is still useful. [3]\n\n(c) Calculate the fibre from the vegetables and the fibre still needed. [2]\n\n(d) Draw a neat, labelled diagram of a plate showing five food groups for a balanced diet. [3]`,
  model: `**(a)** A **balanced diet** contains **all the nutrients, water and roughage in the amounts the person needs**, according to age, sex, size, occupation and health.\n\n**(b)** Humans **lack the enzyme** that breaks cellulose down. It is useful as **roughage**: it adds **bulk**, holds water and helps the gut to push the food on, so it **prevents constipation**.\n\n**(c)** Fibre eaten = ${FIBRE.veg} ÷ 100 × ${FIBRE.per100} = **${FIBRE.got} g**; still needed = ${FIBRE.target} − ${FIBRE.got} = **${FIBRE.short} g**.\n\n**(d)** A circle in five sectors: **cereals** (largest), **pulses, eggs and fish**, **vegetables and fruits**, **milk** and **oil**. Five labels.`,
  sol: `All nutrients in right amounts; no enzyme, adds bulk; ${FIBRE.got} g and ${FIBRE.short} g; labelled plate.`,
  scheme: [['All nutrients, water and roughage', 1], ['In the amounts the person needs', 1], ['No enzyme to digest it', 1], ['Adds bulk', 1], ['Prevents constipation', 1], [`${FIBRE.got} g`, 1], [`${FIBRE.short} g`, 1], ['Plate with five sectors', 1], ['Five labels', 2]],
  d: 3, c: 'application', t: [4],
}), (q) => FIBRE.short === 21 || 'short');
add('child-long', long({
  marks: 10, wl: null,
  stem: `A children's ward has ${WARD.children} undernourished children: ${WARD.kwashiorkor} with kwashiorkor, ${WARD.marasmus} with marasmus, and the rest with mild malnutrition.\n\n(a) Calculate the number with mild malnutrition and the percentage with kwashiorkor. [3]\n\n(b) Tabulate three differences between kwashiorkor and marasmus. [3]\n\n(c) State two ways of preventing malnutrition. [2]\n\n(d) Draw a neat, labelled diagram of a child with marasmus, showing two signs. [2]`,
  model: `**(a)** Mild = ${WARD.children} − ${WARD.kwashiorkor} − ${WARD.marasmus} = **${WARD.mild}**; kwashiorkor = ${WARD.kwashiorkor} ÷ ${WARD.children} × 100 = **${WARD.pctK} percent**.\n\n**(b)**\n\n| Kwashiorkor | Marasmus |\n|---|---|\n| Lack of **protein** | Lack of **all food** (energy and protein) |\n| Children of about **1 to 5 years** | **Infants** under one year |\n| **Swollen belly**, thin limbs | **No swelling**; wasted body |\n\n**(c)** **Breast-feeding** of infants; **protein-rich weaning foods**; a **balanced diet**; clean water and health education (any two).\n\n**(d)** A very thin child with **ribs showing** and a **shrunken, old-looking face** labelled, and thin limbs.`,
  sol: `${WARD.mild} children and ${WARD.pctK} percent; three differences; two preventive steps; labelled marasmus child.`,
  scheme: [[`${WARD.mild} children`, 1], ['Working for the percentage', 1], [`${WARD.pctK} percent`, 1], ['First difference', 1], ['Second difference', 1], ['Third difference', 1], ['First way of prevention', 1], ['Second way of prevention', 1], ['Child drawn with two signs labelled', 2]].map(([a, b]) => [a, b]),
  d: 3, c: 'application', t: [5],
}), (q) => WARD.pctK === 40 || 'pctK');
add('water-long', long({
  marks: 10, wl: null,
  stem: `About ${WATER.percent} percent of the body mass is water. A student has a mass of ${WATER.mass} kg and runs a race on a hot day.\n\n(a) Calculate the mass of water in the body of the student. [2]\n\n(b) State three functions of water in the body. [3]\n\n(c) Explain why the student feels cooler after sweating, and why the student should drink water and take a little salt after the race. [2]\n\n(d) Draw a neat flow diagram, with labels, to show how sweating cools the body. [3]`,
  model: `**(a)** ${WATER.percent} ÷ 100 × ${WATER.mass} = **${WATER.kg} kg**.\n\n**(b)** **Solvent** for substances; **carries** nutrients, gases and wastes round the body; **cools** the body (sweat); needed for **chemical reactions** (any three).\n\n**(c)** Sweat takes heat from the body as it **evaporates**, so the body is cooled. The water and **sodium** lost in sweat must be **replaced**.\n\n**(d)** Body gets hot → sweat glands make **sweat** → sweat **evaporates** taking heat → body **cools**.`,
  sol: `${WATER.kg} kg; solvent, transport, cooling; evaporation of sweat; flow diagram.`,
  scheme: [['Working', 1], [`${WATER.kg} kg`, 1], ['First function', 1], ['Second function', 1], ['Third function', 1], ['Evaporation of sweat cools the body', 1], ['Water and sodium replaced', 1], ['Four steps in the right order', 2], ['Arrows and labels', 1]],
  d: 3, c: 'application', t: [1, 2],
}), (q) => WATER.kg === 35 || 'kg');
add('mystery-long', long({
  marks: 10, wl: null,
  stem: 'Four patients visit a clinic. P has bleeding gums. Q is a child with bow legs who rarely plays in the sun. R is a three-year-old with a swollen belly and thin limbs. S is a woman who is pale and tired, with little haemoglobin.\n\n(a) Name the deficiency disease of P, Q, R and S. [4]\n\n(b) Name the nutrient that each patient lacks. [2]\n\n(c) Suggest one food that would help P and one that would help S. [2]\n\n(d) Draw a neat, labelled diagram of patient R, showing two signs of the disease. [2]',
  model: '**(a)** P: **scurvy**; Q: **rickets**; R: **kwashiorkor**; S: **anaemia**.\n\n**(b)** P: **vitamin C**; Q: **vitamin D** (with calcium); R: **protein**; S: **iron**.\n\n**(c)** P: **amla, guava or orange**; S: **spinach, jaggery or liver**.\n\n**(d)** A child with a **swollen belly** and **thin arms and legs** (and a puffy face with pale thin hair), labelled.',
  sol: 'Scurvy, rickets, kwashiorkor, anaemia; vitamin C, vitamin D, protein, iron; amla and spinach; labelled child.',
  scheme: [['P', 1], ['Q', 1], ['R', 1], ['S', 1], ['Nutrients for P and Q', 1], ['Nutrients for R and S', 1], ['Food for P', 1], ['Food for S', 1], ['Child drawn with two signs labelled', 2]].map(([a, b]) => [a, b]),
  d: 4, c: 'analysis', t: [2, 3, 5],
}));
