// ICSE 9 Biology ch09 Nutrition: Food and Balanced Diet — Part 1 (t01 classes of food, t02 minerals, t03 vitamins), Part 2 (t04 balanced diet and roughage, t05 malnutrition).
import { sl, deck, table, flow, svgV } from '../../icse-9-biology-ch01/src/lib.mjs';
import { MEAL, PLATE_NAMED, CHILDREN, BODYMAP } from './svgs.mjs';
import { BREAKFAST, KJ, CLINIC, FIBRE, WARD, PLATE } from './calc.mjs';

export const V = {
  meal: svgV(MEAL, 'Bar chart of the energy from the carbohydrate, protein and fat of a breakfast'),
  bodymap: svgV(BODYMAP, 'A body outline showing where iodine, iron, sodium and calcium are needed'),
  plate: svgV(PLATE_NAMED, 'A plate model of a balanced diet with five food groups'),
  children: svgV(CHILDREN, 'A child with kwashiorkor beside a child with marasmus'),
};

export const deck1 = deck({
  part: 1,
  title: 'Nutrition — Part 1: Classes of food, minerals and vitamins',
  goals: [
    'State the functions and common sources of carbohydrates, fats, proteins and water',
    'State the function of calcium, iodine, iron and sodium and the effect of their deficiency',
    'Match each vitamin with its source, function and deficiency disease',
  ],
  slides: [
    sl('title', 'Food and Nutrition', {
      b: 'Part 1 — what our food is made of, and what each part does for the body.',
      v: flow('LR', [['f', 'Food'], ['m', 'Carbohydrates, fats, proteins, water'], ['s', 'Mineral salts and vitamins']], [['f', 'm'], ['f', 's']], 'Flow from food to the main food classes and to mineral salts and vitamins'),
      n: 'Food gives the body energy, materials to grow and repair, and substances that keep it working well. Biologists group food into classes, and each class has its own jobs.',
    }),
    sl('concept', 'Carbohydrates, fats, proteins and water', {
      v: table(['Class', 'Main functions', 'Common sources'], [['Carbohydrates', 'Main source of energy', 'Rice, wheat, potato, sugar, fruits'], ['Fats', 'Store of energy; keep the body warm; protect organs; carry some vitamins', 'Oil, ghee, butter, nuts'], ['Proteins', 'Growth and repair of cells; make enzymes and antibodies', 'Pulses, milk, eggs, fish, meat'], ['Water', 'Solvent for substances; carries them around the body; cools the body by sweat', 'Drinks, fruits, vegetables']], 'Table of the functions and sources of carbohydrates, fats, proteins and water'),
      n: 'Carbohydrates are the main energy food. Fats store energy and keep the body warm. Proteins build and repair the body. Water dissolves substances, carries them around the body, and cools us down when we sweat.',
    }),
    sl('diagram', 'Energy from a meal', {
      b: 'One gram of **fat** gives about **thirty-seven** kilojoules; one gram of **carbohydrate** or **protein** gives about **seventeen**.',
      v: V.meal,
      n: 'This chart shows the energy in a breakfast. Carbohydrate gives the most energy here because there is much more of it. Weight for weight, though, fat gives more than twice as much energy as carbohydrate.',
    }),
    sl('example', 'Worked example 1: energy in a breakfast', {
      b: `A breakfast has ${BREAKFAST.carbohydrate} g of carbohydrate, ${BREAKFAST.protein} g of protein and ${BREAKFAST.fat} g of fat. Using ${KJ.carbohydrate} kJ per g for carbohydrate and protein and ${KJ.fat} kJ per g for fat, find the total energy and the percentage from fat.`,
      ul: [`Step 1: carbohydrate = ${BREAKFAST.carbohydrate} × ${KJ.carbohydrate} = **${BREAKFAST.kj.carbohydrate} kJ**; protein = ${BREAKFAST.protein} × ${KJ.protein} = **${BREAKFAST.kj.protein} kJ**; fat = ${BREAKFAST.fat} × ${KJ.fat} = **${BREAKFAST.kj.fat} kJ**.`, `Step 2: total = ${BREAKFAST.kj.carbohydrate} + ${BREAKFAST.kj.protein} + ${BREAKFAST.kj.fat} = **${BREAKFAST.total} kJ**.`, `Step 3: fat share = ${BREAKFAST.kj.fat} ÷ ${BREAKFAST.total} × 100 = **${BREAKFAST.pctFat} percent**.`],
      v: table(['Class', 'Grams', 'Energy (kJ)'], [['Carbohydrate', String(BREAKFAST.carbohydrate), String(BREAKFAST.kj.carbohydrate)], ['Protein', String(BREAKFAST.protein), String(BREAKFAST.kj.protein)], ['Fat', String(BREAKFAST.fat), String(BREAKFAST.kj.fat)], ['Whole breakfast', String(BREAKFAST.grams), String(BREAKFAST.total)]], 'Worked table of the energy in a breakfast by food class and in total'),
      n: 'Multiply the grams of each class by its energy per gram. Add the three results to get sixteen hundred and forty five kilojoules. Then divide the energy from fat by the total and multiply by one hundred to get twenty two point five percent.',
    }),
    sl('check', 'Quick check: the energy food', {
      b: 'Which class of food is the main source of energy in the diet?',
      chk: 'carb-chk',
      n: 'Think of rice and wheat.',
    }),
    sl('concept', 'Mineral salts', {
      v: table(['Mineral', 'Function', 'Deficiency', 'Sources'], [['Calcium', 'Builds bones and teeth; helps blood to clot; muscle action', 'Weak bones and teeth; rickets in children', 'Milk, cheese, ragi, green leafy vegetables'], ['Iodine', 'Needed to make thyroxine in the thyroid gland', 'Goitre: swelling of the neck', 'Iodised salt, sea fish'], ['Iron', 'Makes haemoglobin of red blood cells', 'Anaemia: pale, tired, weak', 'Spinach, jaggery, liver, meat'], ['Sodium', 'Nerve messages; water balance; muscle action', 'Muscle cramps; weakness', 'Common salt']], 'Table of calcium, iodine, iron and sodium with function, deficiency and sources'),
      n: 'Minerals are needed in small amounts. Calcium builds bones and teeth. Iodine is needed for the thyroid gland. Iron makes haemoglobin, so lack of it causes anaemia. Sodium helps nerves and muscles.',
    }),
    sl('diagram', 'Where minerals are needed', {
      b: '**Iodine** works in the **thyroid**, **iron** in the **blood**, **sodium** in **nerves and muscles**, and **calcium** in **bones and teeth**.',
      v: V.bodymap,
      n: 'Here is where each mineral does its main work. Iodine is used in the thyroid gland of the neck. Iron is part of haemoglobin in blood. Sodium is used in nerves and muscles. Calcium builds the teeth and bones.',
    }),
    sl('check', 'Quick check: a swollen neck', {
      b: 'Deficiency of which mineral causes goitre?',
      chk: 'iodine-chk',
      n: 'The thyroid gland needs it.',
    }),
    sl('concept', 'Vitamins', {
      v: table(['Vitamin', 'Function', 'Deficiency disease', 'Sources'], [['A', 'Healthy eyes and skin', 'Night blindness', 'Carrot, papaya, milk, liver'], ['B1 (thiamine)', 'Releases energy from carbohydrates; healthy nerves', 'Beri-beri', 'Whole grains, pulses, yeast'], ['C', 'Healthy gums and skin; heals wounds', 'Scurvy', 'Amla, orange, lemon, guava'], ['D', 'Helps absorb calcium for bones', 'Rickets', 'Sunlight, egg yolk, fish liver oil'], ['K', 'Helps blood to clot', 'Bleeding that is slow to stop', 'Green vegetables']], 'Table of vitamins A, B1, C, D and K with function, deficiency disease and sources'),
      n: 'Vitamins are needed in very small amounts, but each has a clear job. Vitamin A for the eyes, vitamin B one for energy release and nerves, vitamin C for gums and skin, vitamin D for bones, and vitamin K for blood clotting.',
    }),
    sl('check', 'Quick check: bleeding gums', {
      b: 'Which vitamin deficiency causes scurvy?',
      chk: 'vitc-chk',
      n: 'Think of citrus fruits.',
    }),
    sl('example', 'Worked example 2: a clinic survey', {
      b: `A clinic sees ${CLINIC.total} patients with a vitamin deficiency: ${CLINIC.A} lack vitamin A, ${CLINIC.B1} lack B1, ${CLINIC.C} lack C, ${CLINIC.D} lack D and ${CLINIC.K} lack K. What percentage lack vitamin D? How many lack a water-soluble vitamin (B1 or C)?`,
      ul: [`Step 1: percentage lacking D = ${CLINIC.D} ÷ ${CLINIC.total} × 100 = **${CLINIC.pctD} percent**.`, `Step 2: water-soluble = B1 + C = ${CLINIC.B1} + ${CLINIC.C} = **${CLINIC.water}**.`, `Step 3: the other **${CLINIC.fat}** lack a fat-soluble vitamin (A, D or K).`],
      v: table(['Vitamin lacking', 'Patients', 'Type'], [['A', String(CLINIC.A), 'Fat-soluble'], ['B1', String(CLINIC.B1), 'Water-soluble'], ['C', String(CLINIC.C), 'Water-soluble'], ['D', String(CLINIC.D), 'Fat-soluble'], ['K', String(CLINIC.K), 'Fat-soluble']], 'Worked table of sixty clinic patients by the vitamin they lack and whether it is fat-soluble or water-soluble'),
      n: 'Divide the number lacking vitamin D by sixty and multiply by one hundred, which gives thirty percent. Vitamins B and C dissolve in water, so add fifteen and nine to find twenty four patients. The rest lack a fat soluble vitamin.',
    }),
    sl('check', 'Quick check: bones and sunlight', {
      b: 'A child with bow legs probably lacks which vitamin?',
      chk: 'vitd-chk',
      n: 'The skin makes it in sunlight.',
    }),
    sl('summary', 'Summary', {
      ul: ['Carbohydrates give energy; fats store it; proteins build and repair; water carries and cools.', 'Calcium: bones. Iodine: thyroid. Iron: blood. Sodium: nerves and muscles.', 'Vitamin A: night blindness. B1: beri-beri. C: scurvy. D: rickets. K: slow clotting.', 'Vitamins A, D and K are fat-soluble; B and C are water-soluble.'],
      v: table(['Lacking', 'Disease or effect'], [['Iodine', 'Goitre'], ['Iron', 'Anaemia'], ['Vitamin C', 'Scurvy'], ['Vitamin D', 'Rickets'], ['Vitamin A', 'Night blindness']], 'Summary table of five deficiencies and their effects'),
      n: 'To recap. Learn the job of each food class, and match each mineral and vitamin with its deficiency disease. Iodine and goitre, iron and anaemia, vitamin C and scurvy, vitamin D and rickets, and vitamin A and night blindness.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Give **function**, **source** and **deficiency** when a question asks about a mineral or vitamin.', 'Do not mix **scurvy** (vitamin C) with **rickets** (vitamin D).', 'Write **goitre** for iodine and **anaemia** for iron.', 'Show **units** and **steps** in an energy calculation.'],
      n: 'Exam tips. For a mineral or vitamin, give its function, a source and the deficiency disease. Do not mix up scurvy and rickets. Remember goitre for iodine and anaemia for iron. In an energy sum, show each step.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Nutrition — Part 2: Balanced diet, roughage and malnutrition',
  goals: [
    'Explain the meaning and importance of a balanced diet',
    'Explain why cellulose is useful in the diet though humans cannot digest it',
    'Distinguish kwashiorkor from marasmus by cause and symptoms',
  ],
  slides: [
    sl('title', 'Eating Well', {
      b: 'Part 2 — the balanced diet, the role of roughage, and what happens when the diet fails.',
      v: flow('LR', [['b', 'Balanced diet'], ['r', 'Roughage'], ['m', 'Malnutrition']], [['b', 'r'], ['b', 'm']], 'Flow from the balanced diet to roughage and to malnutrition'),
      n: 'A healthy body needs the right food in the right amounts. We look at what a balanced diet means, why plant fibre matters, and what goes wrong when children do not get enough food or the right food.',
    }),
    sl('concept', 'A balanced diet', {
      v: table(['Question', 'Answer'], [['What is it?', 'A diet that has all the food classes, minerals, vitamins, water and roughage, in the right amounts'], ['What decides the amounts?', 'Age, sex, body size, occupation and health'], ['Examples of differences', 'A growing child needs more protein; a heavy labourer needs more energy foods'], ['Why important?', 'Gives energy and growth, prevents deficiency diseases, keeps the body healthy']], 'Table giving the meaning of a balanced diet, what decides it and why it is important'),
      n: 'A balanced diet contains all the nutrients in the right amounts for the person. A growing child, a heavy labourer and an elderly person need different amounts. A balanced diet prevents deficiency diseases.',
    }),
    sl('diagram', 'A plate for a balanced diet', {
      b: 'A plate model: **cereals** take the biggest share, with **pulses, vegetables and fruits, milk** and a little **oil**.',
      v: V.plate,
      n: 'This plate is one way to picture a balanced diet. Cereals give energy, pulses and eggs give protein, vegetables and fruits give vitamins, minerals and roughage, milk gives calcium, and oil gives fats in a small amount. The shares are only for illustration.',
    }),
    sl('check', 'Quick check: balanced diet', {
      b: 'A balanced diet is one that',
      chk: 'bal-chk',
      n: 'Think of all the nutrients.',
    }),
    sl('concept', 'Roughage: the role of cellulose', {
      v: table(['Point', 'Explanation'], [['What is it?', 'Cellulose: the fibre in plant cell walls'], ['Digested by humans?', 'No: we do not make the enzyme that breaks it down'], ['Why useful?', 'Adds bulk to the food waste; holds water; helps the gut muscles to push food on'], ['Effect of too little', 'Constipation'], ['Sources', 'Vegetables, fruits with peel, whole grains, pulses']], 'Table about cellulose: what it is, why it is not digested, why it is useful, the effect of too little and sources'),
      n: 'Cellulose is the fibre in plant food. We cannot digest it, but it is still useful. It adds bulk, holds water, and helps the gut push food along, so it prevents constipation.',
    }),
    sl('example', 'Worked example 1: fibre in the diet', {
      b: `A person eats ${FIBRE.veg} g of vegetables a day, with ${FIBRE.per100} g of fibre in every 100 g. The daily target is ${FIBRE.target} g. How much fibre does the person get, and how much more is needed?`,
      ul: [`Step 1: fibre from vegetables = ${FIBRE.veg} ÷ 100 × ${FIBRE.per100} = **${FIBRE.got} g**.`, `Step 2: still needed = ${FIBRE.target} − ${FIBRE.got} = **${FIBRE.short} g**.`, `Step 3: the vegetables give ${FIBRE.got} ÷ ${FIBRE.target} × 100 = **${FIBRE.pct} percent** of the target; add whole grains, pulses and fruit.`],
      v: table(['Quantity', 'Grams of fibre'], [['Target per day', String(FIBRE.target)], ['From the vegetables', String(FIBRE.got)], ['Still needed', String(FIBRE.short)]], 'Worked table of the fibre target, the fibre from vegetables and the fibre still needed'),
      n: 'Three hundred grams of vegetables is three lots of one hundred, so nine grams of fibre. The target is thirty grams, so twenty one grams more are needed. The person should add whole grains, pulses and fruit.',
    }),
    sl('check', 'Quick check: why roughage', {
      b: 'Cellulose is useful in the diet although humans cannot digest it, because it',
      chk: 'cell-chk',
      n: 'Think of what it does in the gut.',
    }),
    sl('diagram', 'Two kinds of severe malnutrition', {
      b: '**Kwashiorkor** comes from a lack of **protein**; **marasmus** from a lack of **all food**, so energy and protein.',
      v: V.children,
      n: 'The child on the left has kwashiorkor. The belly is swollen, but the arms and legs are thin. The child on the right has marasmus, with a shrunken face, visible ribs and a wasted body. Malnutrition means a poor or wrong diet.',
    }),
    sl('concept', 'Kwashiorkor and marasmus', {
      v: table(['Feature', 'Kwashiorkor', 'Marasmus'], [['Cause', 'Too little protein; diet mostly starchy', 'Too little food of all kinds: energy and protein'], ['Usual age', 'Young children, 1 to 5 years, often after weaning', 'Infants under one year'], ['Belly and limbs', 'Swollen belly (fluid); thin limbs', 'No swelling; very thin, wasted body'], ['Face and hair', 'Puffy face; pale, thin hair; skin sores', 'Shrunken, old-looking face'], ['Growth', 'Slow', 'Very slow; ribs show']], 'Table comparing kwashiorkor and marasmus by cause, usual age, belly and limbs, face and hair, and growth'),
      n: 'Kwashiorkor is caused by too little protein, usually in a child after weaning. The belly swells with fluid. Marasmus is caused by too little food of every kind, usually in infants, and the body wastes away with no swelling.',
    }),
    sl('check', 'Quick check: a swollen belly', {
      b: 'A young child with a swollen belly, thin limbs and pale hair is most likely to have',
      chk: 'kwash-chk',
      n: 'The diet lacks protein.',
    }),
    sl('example', 'Worked example 2: a children\'s ward', {
      b: `A ward has ${WARD.children} children: ${WARD.kwashiorkor} with kwashiorkor, ${WARD.marasmus} with marasmus and the rest with mild malnutrition. How many have mild malnutrition? What percentage have kwashiorkor? What percentage have a severe form?`,
      ul: [`Step 1: mild = ${WARD.children} − ${WARD.kwashiorkor} − ${WARD.marasmus} = **${WARD.mild}**.`, `Step 2: kwashiorkor = ${WARD.kwashiorkor} ÷ ${WARD.children} × 100 = **${WARD.pctK} percent**.`, `Step 3: severe = ${WARD.kwashiorkor} + ${WARD.marasmus} = ${WARD.severe}, which is ${WARD.severe} ÷ ${WARD.children} × 100 = **${WARD.pctSevere} percent**.`],
      v: table(['Group', 'Children', 'Share'], [['Kwashiorkor', String(WARD.kwashiorkor), `${WARD.pctK} percent`], ['Marasmus', String(WARD.marasmus), '25 percent'], ['Mild malnutrition', String(WARD.mild), '35 percent'], ['Ward', String(WARD.children), '100 percent']], 'Worked table of forty children in a ward by kind of malnutrition with the percentage of each'),
      n: 'Take the two severe groups away from forty to find fourteen with mild malnutrition. Sixteen out of forty is forty percent with kwashiorkor. Adding sixteen and ten gives twenty six severe cases, which is sixty five percent.',
    }),
    sl('concept', 'Preventing malnutrition', {
      v: table(['Step', 'Why it helps'], [['Breast-feeding for the first months', 'Gives the infant complete food and protection from infection'], ['Weaning foods rich in protein', 'Pulses, milk, eggs and mashed vegetables prevent kwashiorkor'], ['A balanced diet for the family', 'Supplies all nutrients and roughage'], ['Clean water and vaccination', 'Fewer infections, so food is used well'], ['Health education', 'Families learn to choose nutritious, cheap foods']], 'Table of ways to prevent malnutrition and why each helps'),
      n: 'Malnutrition can be prevented. Breast-feed infants, give protein rich weaning foods, keep to a balanced diet, use clean water, and teach families which cheap foods are nutritious.',
    }),
    sl('check', 'Quick check: infants', {
      b: 'A wasted infant under one year with a shrunken face and visible ribs is most likely to have',
      chk: 'maras-chk',
      n: 'There is not enough food of any kind.',
    }),
    sl('summary', 'Summary', {
      ul: ['A balanced diet has all nutrients, water and roughage in the right amounts for the person.', 'Cellulose cannot be digested but adds bulk and prevents constipation.', 'Kwashiorkor: lack of protein, swollen belly. Marasmus: lack of all food, wasted body.', 'Prevention: breast-feeding, protein-rich weaning foods, a balanced diet.'],
      v: table(['Disease', 'Cause', 'Key sign'], [['Kwashiorkor', 'Lack of protein', 'Swollen belly, thin limbs'], ['Marasmus', 'Lack of all food', 'Wasted body, old face']], 'Summary table of kwashiorkor and marasmus by cause and key sign'),
      n: 'To recap. A balanced diet suits the age and work of the person. Cellulose adds bulk. Kwashiorkor means a lack of protein, with a swollen belly. Marasmus means a lack of all food, with a wasted body.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Define a **balanced diet** by its **nutrients, amounts and the person**.', 'Say that cellulose is **not digested** but gives **bulk** and prevents **constipation**.', 'Compare **kwashiorkor** and **marasmus** in a table: cause, age, belly, limbs.', 'Do not call marasmus a protein-only deficiency: it is **energy and protein**.'],
      n: 'Exam tips. Define a balanced diet with its nutrients and the needs of the person. Say that cellulose is not digested but adds bulk. Compare kwashiorkor and marasmus in a table, and remember that marasmus is a lack of energy and protein.',
    }),
  ],
});
