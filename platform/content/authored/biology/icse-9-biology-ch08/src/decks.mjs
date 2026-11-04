// ICSE 9 Biology ch08 Economic Importance of Bacteria and Fungi — Part 1 (t01 medicine, t02 nitrogen cycle, t03 tea and leather), Part 2 (t04 harmful bacteria, t05 useful fungi).
// The industrial manufacture of products with fungi is a removed topic and is not taught or asked.
import { sl, deck, table, flow, svgV } from '../../icse-9-biology-ch01/src/lib.mjs';
import { NCYCLE, ROOT, YEAST_DOUGH, MUSHROOM, SPOIL_CHART } from './svgs.mjs';
import { VACC, AIR, SPOIL, YEAST, DOUGH, BREW } from './calc.mjs';

export const V = {
  ncycle: svgV(NCYCLE, 'The nitrogen cycle with the bacteria that carry out each step'),
  root: svgV(ROOT, 'Root nodules of a pulse plant with Rhizobium bacteria enlarged'),
  yeast: svgV(YEAST_DOUGH, 'A budding yeast cell and dough before and after rising'),
  mushroom: svgV(MUSHROOM, 'An edible mushroom with cap, gills, stalk and mycelium'),
  spoil: svgV(SPOIL_CHART, 'Bar chart of bacteria doubling every thirty minutes in cooked rice'),
};

export const deck1 = deck({
  part: 1,
  title: 'Economic Importance of Bacteria and Fungi — Part 1: Medicine, soil and industry',
  goals: [
    'Explain how bacteria help to make antibiotics, serums and vaccines',
    'Draw and explain the nitrogen cycle and name the bacteria in each step',
    'Describe the role of bacteria in curing tea and tanning leather',
  ],
  slides: [
    sl('title', 'Bacteria that Help Us', {
      b: 'Part 1 — bacteria in medicine, in the soil and in industry.',
      v: flow('LR', [['b', 'Bacteria'], ['m', 'Medicine'], ['s', 'Soil fertility'], ['i', 'Industry']], [['b', 'm'], ['b', 's'], ['b', 'i']], 'Flow from bacteria to their uses in medicine, soil fertility and industry'),
      n: 'Many people think of bacteria only as germs. But most bacteria are harmless and many are very useful. They give us medicines, keep soil fertile and take part in some industries.',
    }),
    sl('concept', 'Antibiotics, serums and vaccines', {
      v: table(['Product', 'What it is', 'How it works', 'Example'], [['Antibiotic', 'A chemical made by a microbe that stops or kills other microbes', 'Attacks disease-causing bacteria', 'Streptomycin from Streptomyces bacteria'], ['Vaccine', 'Weakened or killed germs, or their harmless products', 'Makes the body produce its own antibodies', 'Vaccine against typhoid or tetanus'], ['Serum', 'Liquid from the blood of an immunised animal, rich in ready-made antibodies', 'Gives quick, short-lived protection', 'Anti-snake-venom serum, made in horses']], 'Table comparing an antibiotic, a vaccine and a serum by what it is, how it works and an example'),
      n: 'An antibiotic is a chemical that kills or stops germs, and some come from bacteria. A vaccine trains the body to make its own antibodies. A serum gives ready made antibodies, so it acts at once but protects only for a short time.',
    }),
    sl('check', 'Quick check: a vaccine', {
      b: 'What does a vaccine contain?',
      chk: 'vaccine-chk',
      n: 'Think of how the body learns to fight a germ.',
    }),
    sl('example', 'Worked example 1: a vaccination drive', {
      b: `A village has ${VACC.children} children. A health team vaccinates ${VACC.vaccinated} of them in the first week. What percentage is vaccinated, and how many remain?`,
      ul: [`Step 1: remaining = ${VACC.children} − ${VACC.vaccinated} = **${VACC.left}**.`, `Step 2: percentage vaccinated = ${VACC.vaccinated} ÷ ${VACC.children} × 100 = **${VACC.pct} percent**.`, `Step 3: percentage still to be vaccinated = **${VACC.pctLeft} percent**.`],
      v: table(['Quantity', 'Value'], [['Children in the village', String(VACC.children)], ['Vaccinated', `${VACC.vaccinated} (${VACC.pct} percent)`], ['Still to be vaccinated', `${VACC.left} (${VACC.pctLeft} percent)`]], 'Worked table of a vaccination drive: six hundred children, four hundred and fifty vaccinated and one hundred and fifty left'),
      n: 'Subtract the vaccinated children from the total to find how many are left. Then divide the vaccinated number by the total and multiply by one hundred. Four hundred and fifty out of six hundred is seventy five percent.',
    }),
    sl('diagram', 'Nodules on the roots of a pulse plant', {
      b: 'Air is about **seventy-eight percent nitrogen**, but plants cannot use nitrogen gas. **Rhizobium** in **root nodules** changes it into a usable form.',
      v: V.root,
      n: 'Plants need nitrogen to make proteins, but they cannot take up the gas from the air. In the roots of pulse plants, such as gram and pea, live Rhizobium bacteria in small swellings called nodules. They make nitrogen compounds that the plant can use.',
    }),
    sl('diagram', 'The nitrogen cycle', {
      b: 'Nitrogen moves between the **air**, the **soil**, **plants** and **animals**, with bacteria in four of the steps.',
      v: V.ncycle,
      n: 'Follow the cycle. Nitrogen fixing bacteria turn nitrogen gas into ammonia compounds. Nitrifying bacteria change ammonia into nitrates. Plants absorb nitrates and animals eat plants. Decay bacteria return ammonia from dead remains, and denitrifying bacteria send nitrogen back to the air.',
    }),
    sl('concept', 'The bacteria of the cycle', {
      v: table(['Group', 'What they do', 'Examples'], [['Nitrogen-fixing', 'Change nitrogen gas into nitrogen compounds', 'Rhizobium (in root nodules); Azotobacter and Clostridium (free in the soil)'], ['Decay (ammonifying)', 'Break down dead remains and wastes to release ammonia', 'Many soil bacteria'], ['Nitrifying', 'Change ammonia to nitrites, and nitrites to nitrates', 'Nitrosomonas, then Nitrobacter'], ['Denitrifying', 'Change nitrates back to nitrogen gas', 'Pseudomonas']], 'Table of the four groups of bacteria in the nitrogen cycle with what they do and examples'),
      n: 'Learn the four groups. Fixing bacteria, such as Rhizobium, take nitrogen from the air. Decay bacteria make ammonia. Nitrifying bacteria make nitrates. Denitrifying bacteria return nitrogen to the air.',
    }),
    sl('check', 'Quick check: nitrogen fixing', {
      b: 'Which bacteria live in the root nodules of pulse plants?',
      chk: 'nfix-chk',
      n: 'Think of gram and pea plants.',
    }),
    sl('example', 'Worked example 2: nitrogen in air', {
      b: `A tank holds ${AIR.litres} litres of air. If air is ${AIR.percent} percent nitrogen, how many litres of nitrogen are there, and how much is other gases?`,
      ul: [`Step 1: nitrogen = ${AIR.percent} ÷ 100 × ${AIR.litres} = **${AIR.nitrogen} litres**.`, `Step 2: other gases = ${AIR.litres} − ${AIR.nitrogen} = **${AIR.other} litres**.`],
      v: table(['Gas', 'Share', 'Litres'], [['Nitrogen', `${AIR.percent} percent`, String(AIR.nitrogen)], ['Oxygen, carbon dioxide and others', `${100 - AIR.percent} percent`, String(AIR.other)], ['All the air', '100 percent', String(AIR.litres)]], 'Worked table of nitrogen and other gases in five hundred litres of air'),
      n: 'Find seventy eight percent of five hundred, which is three hundred and ninety litres of nitrogen. The rest of the air, one hundred and ten litres, is oxygen and other gases. Yet plants still cannot use this nitrogen directly.',
    }),
    sl('check', 'Quick check: ammonia to nitrate', {
      b: 'Nitrosomonas and Nitrobacter are examples of which group of bacteria?',
      chk: 'nitrify-chk',
      n: 'They make nitrates.',
    }),
    sl('concept', 'Tea and leather', {
      v: table(['Industry', 'Role of bacteria', 'Result'], [['Curing tea leaves', 'Bacteria act on the dried and rolled leaves during curing', 'Gives the tea its flavour and aroma'], ['Tanning leather', 'Bacteria act on the soaked hides, loosening hair and fat', 'The hide becomes soft and flexible leather']], 'Table of the role of bacteria in curing tea and tanning leather'),
      n: 'Bacteria also work in industry. In curing tea, they help to give the leaves their flavour. In tanning, bacteria loosen the hair and fat on a hide, so that it can be made into soft, flexible leather.',
    }),
    sl('check', 'Quick check: a tannery', {
      b: 'Bacteria help in the tanning of leather by',
      chk: 'tan-chk',
      n: 'Think of what must be removed from the hide.',
    }),
    sl('summary', 'Summary', {
      ul: ['Antibiotics kill germs; vaccines teach the body to make antibodies; serums give ready-made antibodies.', 'Nitrogen cycle: fixation, decay, nitrification, denitrification.', 'Rhizobium lives in the root nodules of pulse plants.', 'Bacteria help in curing tea and tanning leather.'],
      v: table(['Step', 'Bacteria'], [['Nitrogen gas to ammonia compounds', 'Nitrogen-fixing: Rhizobium, Azotobacter'], ['Dead remains to ammonia', 'Decay bacteria'], ['Ammonia to nitrates', 'Nitrosomonas, Nitrobacter'], ['Nitrates to nitrogen gas', 'Pseudomonas']], 'Summary table of the four steps of the nitrogen cycle and the bacteria involved'),
      n: 'To recap. Bacteria give us antibiotics, vaccines and serums. They keep the soil fertile through the nitrogen cycle, and they play a part in curing tea and tanning leather.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['A **vaccine** gives **long-lasting** protection; a **serum** gives **quick, short** protection.', 'Name the **bacteria** at each step of the nitrogen cycle, not just the step.', 'In a nitrogen cycle diagram, add **arrows** and **labels** on each arrow.', '**Nitrification** makes nitrates; **denitrification** returns nitrogen to the air.'],
      n: 'Exam tips. Do not mix up a vaccine and a serum. Name the bacteria at each step of the nitrogen cycle. Draw arrows with labels. And remember that nitrification makes nitrates, but denitrification returns nitrogen to the air.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Economic Importance of Bacteria and Fungi — Part 2: Harmful bacteria and useful fungi',
  goals: [
    'Give examples of harm caused by bacteria and suggest ways to prevent food spoilage',
    'Explain the role of yeast in baking and brewing',
    'Name other uses of fungi: cheese making and edible mushrooms',
  ],
  slides: [
    sl('title', 'Harmful Bacteria and Useful Fungi', {
      b: 'Part 2 — how bacteria spoil food and cause disease, and how fungi help in the kitchen.',
      v: flow('LR', [['h', 'Harmful bacteria: spoilage, disease'], ['p', 'Prevention'], ['f', 'Useful fungi: yeast, cheese, mushrooms']], [['h', 'p'], ['p', 'f']], 'Flow from harmful bacteria to prevention to useful fungi'),
      n: 'Some bacteria are harmful. They spoil our food and cause disease. We can stop many of them. And some fungi, such as yeast and mushrooms, are very useful to us.',
    }),
    sl('concept', 'Harm done by bacteria', {
      v: table(['Harm', 'Example'], [['Food spoilage', 'Cooked rice, milk and meat turn sour or smelly; some bacteria also cause food poisoning'], ['Diseases of plants', 'Citrus canker of lemon and orange trees'], ['Diseases of humans and animals', 'Cholera, typhoid, tuberculosis, tetanus, anthrax'], ['Bio-weapons', 'Spores of the anthrax bacterium have been misused as a weapon']], 'Table of the harm done by bacteria with an example of each'),
      n: 'Bacteria spoil food and cause diseases of plants, animals and people. A few dangerous kinds, such as the anthrax bacterium, have been misused as weapons, which is why such weapons are banned.',
    }),
    sl('diagram', 'How fast bacteria multiply', {
      b: 'In a warm kitchen, bacteria in cooked rice can **double every thirty minutes**.',
      v: V.spoil,
      n: 'Look at the bars. The numbers double every half hour, so the increase gets faster and faster. After three hours, a small starting number has grown to a very large one.',
    }),
    sl('example', 'Worked example 1: bacteria in rice', {
      b: `Cooked rice has ${SPOIL.start} bacteria. They double every ${SPOIL.every} minutes. How many are there after ${SPOIL.minutes} minutes (three hours)?`,
      ul: [`Step 1: number of doublings = ${SPOIL.minutes} ÷ ${SPOIL.every} = **${SPOIL.n}**.`, `Step 2: bacteria = ${SPOIL.start} × 2 six times = ${SPOIL.start} × ${2 ** SPOIL.n} = **${SPOIL.final}**.`],
      v: table(['Time (minutes)', 'Bacteria'], [['0', String(SPOIL.series[0])], ['60', String(SPOIL.at60)], ['120', String(SPOIL.at120)], ['180', String(SPOIL.final)]], 'Worked table of bacteria in rice at zero, sixty, one hundred and twenty and one hundred and eighty minutes'),
      n: 'First count how many times the bacteria can double in the time. Three hours is one hundred and eighty minutes, which is six doublings. Multiply one hundred by sixty four. The answer is six thousand four hundred bacteria.',
    }),
    sl('check', 'Quick check: spoiled rice', {
      b: 'Cooked rice left overnight in a warm kitchen turns sour because',
      chk: 'spoil-chk',
      n: 'Think of what grows in warm food.',
    }),
    sl('concept', 'Preventing food spoilage', {
      v: table(['Method', 'Why it works', 'Used for'], [['Refrigeration', 'Low temperature slows the growth of bacteria', 'Milk, cooked food'], ['Boiling and pasteurisation', 'Heat kills the bacteria', 'Milk'], ['Canning and sealing', 'Kills germs and keeps new ones out', 'Fruit, vegetables'], ['Salting, adding sugar or vinegar', 'Draws water out of bacteria or makes the food too sour for them', 'Pickles, jams, fish'], ['Drying', 'Without water, bacteria cannot grow', 'Grains, fish, spices']], 'Table of five methods of preventing food spoilage with the reason each works and what it is used for'),
      n: 'Bacteria need warmth, water and food. Each method takes away one of these or kills the bacteria. Cold slows them. Heat kills them. Salt, sugar, vinegar and drying take away the water or make the food unsuitable.',
    }),
    sl('check', 'Quick check: a pickle', {
      b: 'Pickles can be stored for months mainly because',
      chk: 'prevent-chk',
      n: 'Salt and oil are used.',
    }),
    sl('diagram', 'Yeast and dough', {
      b: '**Yeast** is a **single-celled fungus** that multiplies by **budding**. In dough it breaks down sugar and releases **carbon dioxide**.',
      v: V.yeast,
      n: 'On the left is a yeast cell forming a bud. Yeast is a fungus and its cells multiply by budding. In dough, yeast breaks down sugar and gives off carbon dioxide gas. The gas makes bubbles, and the dough swells.',
    }),
    sl('concept', 'Baking and brewing', {
      v: table(['Industry', 'What yeast does', 'Result'], [['Bakery (bread, cakes)', 'Breaks down sugar in the dough, releasing carbon dioxide', 'The bubbles make the dough rise and the bread soft and spongy; baking drives off the alcohol'], ['Brewery (beer, wine)', 'Breaks down sugar from grain or grape juice without oxygen, making alcohol and carbon dioxide', 'Alcoholic drinks'], ['Equation in words', 'Glucose → alcohol + carbon dioxide', 'Two of each from one glucose molecule']], 'Table of the role of yeast in baking and brewing'),
      n: 'Yeast is used in bakeries and breweries. In a bakery, the carbon dioxide makes the dough rise. In a brewery, yeast breaks down sugar without air and makes alcohol and carbon dioxide. This process is called fermentation.',
    }),
    sl('example', 'Worked example 2: yeast numbers and dough', {
      b: `${YEAST.start} yeast cells in a sugar solution double every ${YEAST.every} minutes. How many cells are there after ${YEAST.minutes} minutes? Dough of ${DOUGH.before} mL rises to ${DOUGH.after} mL: what is the percentage increase?`,
      ul: [`Step 1: doublings = ${YEAST.minutes} ÷ ${YEAST.every} = **${YEAST.n}**; cells = ${YEAST.start} × ${2 ** YEAST.n} = **${YEAST.final}**.`, `Step 2: gain in dough = ${DOUGH.after} − ${DOUGH.before} = **${DOUGH.gain} mL**.`, `Step 3: increase = ${DOUGH.gain} ÷ ${DOUGH.before} × 100 = **${DOUGH.pct} percent**.`],
      v: table(['Quantity', 'Value'], [['Yeast doublings', String(YEAST.n)], ['Yeast cells at the end', String(YEAST.final)], ['Dough gain', `${DOUGH.gain} mL`], ['Increase in dough', `${DOUGH.pct} percent`]], 'Worked table: four doublings, sixty four yeast cells, a gain of six hundred millilitres and one hundred and fifty percent increase in the dough'),
      n: 'Four cells doubling four times gives sixty four cells. The dough gains six hundred millilitres. Divide by the starting four hundred and multiply by one hundred to get a one hundred and fifty percent increase.',
    }),
    sl('check', 'Quick check: rising dough', {
      b: 'The gas that makes bread dough rise is',
      chk: 'yeast-chk',
      n: 'It is released when yeast breaks down sugar.',
    }),
    sl('diagram', 'An edible mushroom', {
      b: 'A **mushroom** is a **fungus**. Its **cap** and **stalk** are the part we eat; the **mycelium** below the soil absorbs food.',
      v: V.mushroom,
      n: 'A mushroom is a fungus, not a plant, because it has no chlorophyll. The part we see is the cap on a stalk. Below the soil is a network of fine threads, called the mycelium, which absorbs food from the compost.',
    }),
    sl('concept', 'Cheese and mushrooms', {
      v: table(['Use', 'Role of the fungus', 'Examples'], [['Cheese making', 'Moulds growing in the curd ripen it and give each cheese its flavour and texture', 'Blue cheese with blue-green veins'], ['Edible mushrooms', 'Grown on compost in trays and eaten as a food rich in protein and low in fat', 'Button mushroom, oyster mushroom'], ['Caution', 'Some wild mushrooms are poisonous and must never be eaten unless known to be safe', '—']], 'Table of the uses of fungi in cheese making and as edible mushrooms'),
      n: 'Certain moulds are used to ripen cheese and give it its taste. Some mushrooms are grown on compost for food, and they are rich in protein. But some wild mushrooms are poisonous, so never eat one unless you are sure.',
    }),
    sl('check', 'Quick check: a mushroom', {
      b: 'A mushroom belongs to the group of',
      chk: 'mush-chk',
      n: 'It has no chlorophyll.',
    }),
    sl('summary', 'Summary', {
      ul: ['Bacteria spoil food and cause disease in plants, animals and people.', 'Spoilage is prevented by cold, heat, drying, salt, sugar and vinegar.', `Yeast breaks down sugar: carbon dioxide raises dough and alcohol is made in brewing.`, 'Moulds ripen cheese; edible mushrooms are fungi grown for food.'],
      v: table(['Fungus', 'Use'], [['Yeast', 'Bread rising; alcoholic drinks'], ['Cheese mould', 'Ripens cheese'], ['Edible mushroom', 'Protein-rich food']], 'Summary table of three fungi and their uses'),
      n: 'To recap. Bacteria spoil food, but cold, heat, drying, salt, sugar and vinegar prevent this. Yeast makes dough rise and makes alcohol. Moulds ripen cheese, and edible mushrooms give us protein.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Give the **reason** for each method of food preservation.', 'Write **carbon dioxide** for dough rising and **alcohol and carbon dioxide** for brewing.', 'A mushroom is a **fungus**, not a plant.', 'Name an **example** of each harmful and useful microbe.'],
      n: 'Exam tips. For every preservation method, give the reason it works. Remember carbon dioxide for the dough and alcohol with carbon dioxide for brewing. A mushroom is a fungus, and always add an example.',
    }),
  ],
});
