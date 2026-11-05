// ICSE 9 Biology ch08 Economic Importance of Bacteria and Fungi — question bank in ICSE school-examination style (10-mark structured questions).
// Numbers come from calc.mjs. The industrial manufacture of products with fungi is a removed topic: it is not asked anywhere.
// AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true, R does not explain.
import { mk, add, svgV, r } from '../../icse-9-biology-ch01/src/lib.mjs';
import { VACC, AIR2, SPOIL, MILK, YEAST2, MUSH, TAN, BREAD } from './calc.mjs';
import { NCYCLE_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const cycleFig = svgV(NCYCLE_LETTERED, 'The nitrogen cycle with five processes lettered A to E');
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct term', 1]], ...o });

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('vaccine-chk', mcq({
  stem: 'What does a vaccine contain?',
  right: 'Weakened or killed germs, or their harmless products', wrong: ['Ready-made antibodies from an animal', 'A chemical that kills all bacteria', 'Live, fully active disease germs'],
  sol: 'A vaccine has weakened or killed germs that make the body produce its own antibodies — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('nfix-chk', mcq({
  stem: 'Which bacteria live in the root nodules of pulse plants?',
  right: 'Rhizobium', wrong: ['Nitrobacter', 'Pseudomonas', 'Streptomyces'],
  sol: 'Rhizobium fixes nitrogen in the root nodules of pulse plants — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('nitrify-chk', mcq({
  stem: 'Nitrosomonas and Nitrobacter are examples of',
  right: 'nitrifying bacteria', wrong: ['denitrifying bacteria', 'nitrogen-fixing bacteria', 'decay bacteria'],
  sol: 'They change ammonia to nitrites and then to nitrates — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('tan-chk', mcq({
  stem: 'Bacteria help in the tanning of leather by',
  right: 'loosening the hair and fat on the hide', wrong: ['colouring the hide', 'making the hide waterproof', 'killing the animal tissue'],
  sol: 'Bacteria loosen the hair and fat, so the hide can be made soft and flexible — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('spoil-chk', mcq({
  stem: 'Cooked rice left overnight in a warm kitchen turns sour because',
  right: 'bacteria multiply in it', wrong: ['the rice makes its own acid', 'oxygen is added to it', 'the rice loses its starch'],
  sol: 'Warm, moist food lets bacteria multiply and spoil it — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('prevent-chk', mcq({
  stem: 'Pickles can be stored for months mainly because salt and vinegar',
  right: 'prevent the growth of bacteria', wrong: ['add bacteria to the pickle', 'make the pickle sweeter', 'increase the water in the food'],
  sol: 'Salt draws out water and vinegar makes the food too sour for bacteria — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('yeast-chk', mcq({
  stem: 'The gas that makes bread dough rise is',
  right: 'carbon dioxide', wrong: ['oxygen', 'nitrogen', 'hydrogen'],
  sol: 'Yeast breaks down sugar and releases carbon dioxide — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('mush-chk', mcq({
  stem: 'A mushroom belongs to the group of',
  right: 'fungi', wrong: ['bacteria', 'green plants', 'algae'],
  sol: 'A mushroom has no chlorophyll and is a fungus — option (@K).',
  d: 1, c: 'recall', t: [5],
}));

// ---------------------------------------------------------------- t01 medicine
add('serum-mcq', mcq({
  stem: 'A farmer is bitten by a venomous snake and is rushed to a hospital. The doctor injects a liquid made from the blood of an immunised horse. This liquid is a',
  right: 'serum', wrong: ['vaccine', 'antibiotic', 'vitamin'],
  sol: 'Blood liquid of an immunised animal with ready-made antibodies is a serum — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('vaccine-how', mcq({
  stem: 'A health worker gives a baby weakened germs of a disease by injection. The purpose is to',
  right: 'make the body of the baby produce its own antibodies', wrong: ['kill the germs already present in the baby', 'give the baby ready-made antibodies', 'make the baby immune for one day only'],
  sol: 'A vaccine stimulates the body to make antibodies and gives long-lasting protection — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('strepto-mcq', mcq({
  stem: 'Streptomycin, a medicine used against some bacterial diseases, is obtained from',
  right: 'a soil bacterium called Streptomyces', wrong: ['the blood of a horse', 'weakened tuberculosis germs', 'the yeast used in bread'],
  sol: 'Streptomycin is an antibiotic made by the bacterium Streptomyces — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('ar-serum', ar({
  a: 'A person bitten by a venomous snake is given a serum and not a vaccine.',
  r: 'A serum contains ready-made antibodies that act at once.',
  key: 'c',
  sol: 'Both are true, and the immediate action of ready-made antibodies explains why a serum is used — option (c).',
  d: 2, c: 'analysis', t: [1],
}));
add('ar-antib', ar({
  a: 'Streptomycin is an antibiotic obtained from a bacterium.',
  r: 'A vaccine makes the body produce its own antibodies.',
  key: 'd',
  sol: 'Both are true, but the second statement does not explain the first — option (d).',
  d: 3, c: 'analysis', t: [1],
}));
add('tf-vacc', tf({
  stem: 'A vaccine contains ready-made antibodies taken from the blood of an animal.',
  key: 'f',
  sol: 'False. A serum contains ready-made antibodies; a vaccine contains weakened or killed germs.',
  d: 2, c: 'understanding', t: [1],
}));
add('term-antibiotic', term({
  stem: 'Give the biological term: a chemical made by a microbe that stops the growth of, or kills, other microbes.',
  model: '**Antibiotic.**', sol: 'Antibiotic.', sch: 'Antibiotic',
  d: 1, c: 'recall', t: [1],
}));
add('serum-short', short({
  marks: 2,
  stem: 'State two differences between a vaccine and a serum.',
  model: 'A **vaccine** contains **weakened or killed germs** and the body makes **its own antibodies**, giving **long-lasting** protection. A **serum** contains **ready-made antibodies** and acts **at once**, but only for a **short time**.',
  sol: 'What it contains; how long it protects.',
  scheme: [['First difference', 1], ['Second difference', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('antib-short', short({
  marks: 2,
  stem: 'Define an antibiotic. Name one antibiotic and the bacterium from which it is obtained.',
  model: 'An **antibiotic** is a chemical made by a microbe that **kills or stops the growth of other microbes**. Example: **streptomycin**, from the bacterium **Streptomyces**.',
  sol: 'Chemical from a microbe; streptomycin from Streptomyces.',
  scheme: [['Definition', 1], ['Example and bacterium', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('vacc-serum-table', short({
  marks: 3,
  stem: 'Tabulate three differences between a vaccine and a serum.',
  model: '| Vaccine | Serum |\n|---|---|\n| Contains **weakened or killed germs** | Contains **ready-made antibodies** |\n| Body makes **its own antibodies** | Antibodies are **taken from an immunised animal** |\n| Protection is **slow** to start but **long-lasting** | Protection is **immediate** but **short-lived** |\n| Given to **prevent** a disease | Given for **quick help**, as after a snake bite |',
  sol: 'Contents; source of antibodies; speed and duration.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 nitrogen cycle
add('nodule-mcq', mcq({
  stem: 'A farmer uproots a gram plant and finds small round swellings on its roots. The bacteria living inside them are',
  right: 'Rhizobium', wrong: ['Nitrosomonas', 'Pseudomonas', 'Azotobacter'],
  sol: 'Root nodules of pulse plants house Rhizobium, which fixes nitrogen — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('flood-mcq', mcq({
  stem: 'A field was flooded for many days, and the farmer found that the soil had lost much of its nitrates. The bacteria responsible are the',
  right: 'denitrifying bacteria', wrong: ['nitrifying bacteria', 'nitrogen-fixing bacteria', 'decay bacteria'],
  sol: 'Denitrifying bacteria change nitrates back to nitrogen gas, mainly in waterlogged soil — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('rot-mcq', mcq({
  stem: 'A heap of fallen leaves and dead insects in a garden slowly rots, and a sharp smell of ammonia is noticed. The ammonia is released by',
  right: 'decay bacteria', wrong: ['Rhizobium', 'Pseudomonas', 'Nitrobacter'],
  sol: 'Decay bacteria break down proteins in dead remains and release ammonia — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('nitrate-mcq', mcq({
  stem: 'Nitrobacter changes nitrites in the soil into',
  right: 'nitrates, which plants can absorb', wrong: ['ammonia, which plants can absorb', 'nitrogen gas, which plants can absorb', 'proteins, which animals can absorb'],
  sol: 'The last step of nitrification gives nitrates — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('figA-mcq', mcq({
  stem: 'In the figure of the nitrogen cycle, which letter marks nitrogen fixation?',
  right: 'A', wrong: ['B', 'C', 'D'],
  sol: 'A is the change of nitrogen gas into ammonia compounds; B is decay, C nitrification, D denitrification and E absorption by plants — option (@K).',
  d: 2, c: 'application', t: [2],
  assets: [cycleFig],
}));
add('figD-mcq', mcq({
  stem: 'In the figure of the nitrogen cycle, the process that returns nitrogen gas to the air is marked',
  right: 'D', wrong: ['A', 'B', 'E'],
  sol: 'D is denitrification, carried out by Pseudomonas — option (@K).',
  d: 2, c: 'application', t: [2],
  assets: [cycleFig],
}));
add('pulse-mcq', mcq({
  stem: 'A farmer grows groundnut in a field after a wheat crop. The next wheat crop grows better, mainly because the groundnut plants',
  right: 'leave nitrogen compounds in the soil through Rhizobium in their roots', wrong: ['add oxygen to the soil', 'kill all the bacteria in the soil', 'make nitrogen gas from nitrates'],
  sol: 'Rhizobium in the root nodules of groundnut fixes nitrogen and enriches the soil — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('ar-legume', ar({
  a: 'Pulse crops make the soil richer in nitrogen compounds.',
  r: 'Rhizobium in the root nodules changes nitrates into nitrogen gas.',
  key: 'a',
  sol: 'The assertion is true. The reason is false: Rhizobium changes nitrogen gas into nitrogen compounds — option (a).',
  d: 3, c: 'analysis', t: [2],
}));
add('tf-denit', tf({
  stem: 'Nitrifying bacteria return nitrogen gas from the soil to the air.',
  key: 'f',
  sol: 'False. Nitrifying bacteria make nitrates; denitrifying bacteria return nitrogen to the air.',
  d: 2, c: 'understanding', t: [2],
}));
add('fill-nodule', fill({
  stem: 'Rhizobium bacteria live inside swellings on the roots of pulse plants called root ______.',
  acc: [['nodules', 'nodule']],
  sol: 'Nodules.',
  d: 1, c: 'recall', t: [2],
}));
add('odd-nbact', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: Rhizobium, Azotobacter, Clostridium, Nitrosomonas.',
  model: '**Nitrosomonas**; the others are **nitrogen-fixing bacteria**.', sol: 'Nitrosomonas is a nitrifying bacterium.', sch: 'Odd one and category',
  d: 2, c: 'analysis', t: [2],
}));
add('reason-pulse', term({
  stem: 'Give reason: farmers grow pulses in rotation with cereals.',
  model: '**Rhizobium** in the root nodules of pulses **fixes nitrogen** and **enriches the soil** with nitrogen compounds.', sol: 'Rhizobium fixes nitrogen.', sch: 'Nitrogen fixation by Rhizobium',
  d: 2, c: 'understanding', t: [2],
}));
add('air-num', num({
  stem: `Air is ${AIR2.percent} percent nitrogen by volume. How many litres of nitrogen are there in ${AIR2.litres} litres of air?`,
  value: AIR2.nitrogen,
  sol: r`$\frac{${AIR2.percent}}{100} \times ${AIR2.litres} = ${AIR2.nitrogen}$ litres.`,
  scheme: [[`${AIR2.nitrogen}`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 1560 || 'value');
add('nitrify-short', short({
  marks: 2,
  stem: 'What is nitrification? Name the two bacteria that bring it about.',
  model: '**Nitrification** is the change of **ammonia** into **nitrites** and then into **nitrates** in the soil. It is brought about by **Nitrosomonas** (ammonia to nitrite) and **Nitrobacter** (nitrite to nitrate).',
  sol: 'Ammonia to nitrates; Nitrosomonas and Nitrobacter.',
  scheme: [['Ammonia to nitrites to nitrates', 1], ['Nitrosomonas and Nitrobacter', 1]],
  d: 2, c: 'recall', t: [2],
}));
add('fix-short', short({
  marks: 2,
  stem: 'Name one nitrogen-fixing bacterium that lives in root nodules and one that lives freely in the soil.',
  model: 'In the root nodules of pulse plants the bacterium is **Rhizobium**. A bacterium living freely in the soil is **Azotobacter** (or **Clostridium**). Both change nitrogen gas into nitrogen compounds.',
  sol: 'Rhizobium; Azotobacter.',
  scheme: [['Rhizobium in nodules', 1], ['A free-living example', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('nbact-table', short({
  marks: 3,
  stem: 'Tabulate three differences between nitrifying bacteria and denitrifying bacteria.',
  model: '| Nitrifying bacteria | Denitrifying bacteria |\n|---|---|\n| Change **ammonia into nitrates** | Change **nitrates into nitrogen gas** |\n| Examples: **Nitrosomonas**, **Nitrobacter** | Example: **Pseudomonas** |\n| **Increase** the nitrates available to plants | **Reduce** the nitrates, lowering soil fertility |\n| Active in well-aerated soil | Active mainly in waterlogged soil |',
  sol: 'Change brought about; examples; effect on fertility.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('nodule-draw', short({
  marks: 3, wl: null,
  stem: 'Draw a neat, labelled diagram of the root system of a pulse plant showing the root nodules. Label the main root, a lateral root and a root nodule.',
  model: 'A **main root** running down from the soil level, with **lateral roots** branching off it; small round **root nodules** on the lateral roots, and the nodules enlarged to show **Rhizobium**. Three labels with ruled lines.',
  sol: 'Root system with nodules; three labels.',
  scheme: [['Main and lateral roots drawn', 1], ['Nodules on the lateral roots', 1], ['Three correct labels', 1]],
  d: 2, c: 'application', t: [2],
}));
add('passage-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [nitrates, ammonia, nitrogen, Rhizobium, nodules, denitrification, nitrification, antibiotic]\n\nPlants cannot use (a) ______ gas from the air. In pulse plants the bacterium (b) ______ lives in root (c) ______. Nitrifying bacteria change (d) ______ to nitrates, and the return of nitrogen to the air is called (e) ______.',
  acc: [['nitrogen'], ['Rhizobium'], ['nodules', 'nodule'], ['ammonia'], ['denitrification']],
  sol: '(a) nitrogen; (b) Rhizobium; (c) nodules; (d) ammonia; (e) denitrification.',
  d: 2, c: 'understanding', t: [2],
}));
add('cycle-match5', match({
  marks: 5,
  stem: 'Study the diagram of the nitrogen cycle and match each lettered process with the organisms or structures responsible.',
  pairs: [
    ['A', 'Rhizobium and Azotobacter'],
    ['B', 'Bacteria of decay'],
    ['C', 'Nitrosomonas and Nitrobacter'],
    ['D', 'Pseudomonas'],
    ['E', 'Root hairs of plants'],
  ],
  order: [1, 4, 0, 3, 2],
  sol: 'A nitrogen fixation: Rhizobium and Azotobacter; B decay: decay bacteria; C nitrification: Nitrosomonas and Nitrobacter; D denitrification: Pseudomonas; E absorption: root hairs.',
  d: 3, c: 'application', t: [2],
  assets: [cycleFig],
}));

// ---------------------------------------------------------------- t03 tea and leather
add('tea-mcq', mcq({
  stem: 'A tea taster says that the flavour and aroma of a cup of tea partly come from changes made in the leaves during curing. These changes are helped by',
  right: 'bacteria', wrong: ['viruses', 'yeast', 'mushrooms'],
  sol: 'Bacteria act on the leaves during curing and give flavour and aroma — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('leather-mcq', mcq({
  stem: 'Animal hides are soaked in large vats for several days before being made into leather. Bacteria in the vats help by',
  right: 'loosening the hair and fat of the hide', wrong: ['making the hide stronger and thicker', 'adding colour to the hide', 'killing the other bacteria in the vat'],
  sol: 'Bacterial action loosens the hair and fat so that the hide becomes soft — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('term-curing', term({
  stem: 'Give the biological term: the process in which bacteria act on dried tea leaves to develop their flavour and aroma.',
  model: '**Curing** (of tea leaves).', sol: 'Curing.', sch: 'Curing',
  d: 1, c: 'recall', t: [3],
}));
add('tea-short', short({
  marks: 2,
  stem: 'State the role of bacteria in the curing of tea leaves. What quality do they give to the tea?',
  model: 'Bacteria **act on the dried, rolled tea leaves** during curing. They give the tea its **flavour and aroma**.',
  sol: 'Act on leaves; flavour and aroma.',
  scheme: [['Bacteria act on the leaves', 1], ['Flavour and aroma', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('leather-short', short({
  marks: 2,
  stem: 'Explain how bacteria help in the tanning of leather.',
  model: 'The hides are **soaked in vats**, where **bacteria loosen the hair and fat** on them. The hide then becomes **soft and flexible** and can be made into leather.',
  sol: 'Loosen hair and fat; soft hide.',
  scheme: [['Bacteria loosen hair and fat', 1], ['Hide becomes soft, flexible leather', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('tea-leather-three', short({
  marks: 3,
  stem: 'Describe the role of bacteria in (i) curing tea and (ii) tanning leather.',
  model: '(i) **Curing tea:** bacteria act on the dried and rolled leaves and give the tea its **flavour and aroma**.\n(ii) **Tanning:** the hides are soaked in vats and the bacteria **loosen the hair and fat**; the hide becomes **soft and flexible** leather.',
  sol: 'Tea: flavour and aroma. Tanning: loosen hair and fat; soft leather.',
  scheme: [['Bacteria in tea curing', 1], ['Flavour and aroma', 1], ['Bacteria in tanning, with the effect on the hide', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 harmful bacteria
add('anthrax-mcq', mcq({
  stem: 'Spores of a certain bacterium that causes a serious disease of cattle and humans have been misused as a weapon in some countries. The bacterium causes',
  right: 'anthrax', wrong: ['malaria', 'measles', 'dengue'],
  sol: 'Anthrax spores have been misused as a bio-weapon — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('canker-mcq', mcq({
  stem: 'The leaves and fruits of a lemon tree show raised, brown, corky spots. The disease, called citrus canker, is caused by',
  right: 'a bacterium', wrong: ['a green plant', 'a yeast', 'an echinoderm'],
  sol: 'Citrus canker is a bacterial disease of plants — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('jam-mcq', mcq({
  stem: 'A jar of jam containing a very high amount of sugar stays fresh for a long time, because the sugar',
  right: 'draws water out of bacteria and so stops their growth', wrong: ['gives the bacteria more food', 'makes the jam warmer', 'adds oxygen to the jam'],
  sol: 'A strong sugar solution draws water out of bacterial cells — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('milk-mcq', mcq({
  stem: 'Packet milk that has been heated to a fixed temperature for a short time stays fresh longer than raw milk, because heating',
  right: 'kills most of the bacteria in the milk', wrong: ['adds antibodies to the milk', 'removes the water from the milk', 'turns the milk into curd'],
  sol: 'Pasteurisation kills the bacteria that spoil milk — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('poison-mcq', mcq({
  stem: 'A few hours after eating stale cooked meat at a picnic, several children have vomiting and stomach pain. The most likely cause is',
  right: 'bacteria that multiplied in the meat', wrong: ['too much oxygen in the meat', 'lack of sunlight on the meat', 'a lack of salt in the meat'],
  sol: 'Bacteria that grow in stale food can cause food poisoning — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('ar-spoil', ar({
  a: 'Food kept in a refrigerator stays fresh longer.',
  r: 'Low temperature slows the growth of bacteria.',
  key: 'c',
  sol: 'Both are true, and slow bacterial growth explains why food lasts longer — option (c).',
  d: 2, c: 'analysis', t: [4],
}));
add('tf-bioweapon', tf({
  stem: 'All bacteria are harmful to humans.',
  key: 'f',
  sol: 'False. Many bacteria are useful: they make antibiotics and vaccines, fix nitrogen and help in tanning and curing tea.',
  d: 1, c: 'understanding', t: [1, 4],
}));
add('reason-pickle', term({
  stem: 'Give reason: pickles and jams do not spoil easily.',
  model: '**Salt, vinegar or sugar** draw water out of bacteria or make the food unsuitable, so **bacteria cannot grow**.', sol: 'Bacteria cannot grow.', sch: 'Bacterial growth prevented',
  d: 2, c: 'understanding', t: [4],
}));
add('milk-num', num({
  stem: `A sample of milk contains ${MILK.start} bacteria. They double every ${MILK.every} minutes. How many bacteria are there after ${MILK.minutes} minutes?`,
  value: MILK.final,
  sol: r`Number of doublings $= ${MILK.minutes} \div ${MILK.every} = ${MILK.n}$; bacteria $= ${MILK.start} \times 2^{${MILK.n}} = ${MILK.final}$.`,
  scheme: [[`${MILK.final}`, 1]],
  d: 3, c: 'application', t: [4],
}), (q) => q.answer.value === 2000 || 'value');
add('bioweapon-short', short({
  marks: 2,
  stem: 'What is meant by a bio-weapon? Name one bacterium that has been misused in this way.',
  model: 'A **bio-weapon** is a **disease-causing microbe**, or its toxin, misused to harm people, animals or crops. Example: the **anthrax bacterium** (its spores).',
  sol: 'Disease-causing microbe misused; anthrax.',
  scheme: [['Meaning of bio-weapon', 1], ['Example', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('spoil-short', short({
  marks: 2,
  stem: 'Name two ways of preventing the spoilage of food by bacteria and state the reason each works.',
  model: '**Refrigeration**: low temperature slows the growth of bacteria. **Boiling or canning**: heat kills the bacteria. (**Salting, sugar, vinegar** or **drying** also stop growth by removing water.)',
  sol: 'Two methods with reasons.',
  scheme: [['First method with reason', 1], ['Second method with reason', 1]],
  d: 2, c: 'application', t: [4],
}));
add('harm-three', short({
  marks: 3,
  stem: 'Give three ways in which bacteria are harmful to us. Name an example of each.',
  model: '1. **Spoil food**: cooked rice, milk and meat turn sour; some cause food poisoning.\n2. **Cause diseases of plants**: citrus canker of lemon.\n3. **Cause diseases of humans and animals**: cholera, typhoid, tuberculosis, tetanus or anthrax. (Some, such as anthrax, have been misused as **bio-weapons**.)',
  sol: 'Spoilage; plant disease; human and animal disease, each with an example.',
  scheme: [['Food spoilage with example', 1], ['Plant disease with example', 1], ['Human or animal disease with example', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('spoil-methods-short', short({
  marks: 3,
  stem: 'Name three methods of preventing food spoilage and state the principle of each.',
  model: '1. **Refrigeration**: low temperature slows the growth of bacteria.\n2. **Boiling, pasteurisation or canning**: heat kills the bacteria (and canning keeps new ones out).\n3. **Salting, adding sugar or vinegar, or drying**: these remove water or make the food too sour, so bacteria cannot grow.',
  sol: 'Cold slows growth; heat kills; removing water or making food sour stops growth.',
  scheme: [['First method with principle', 1], ['Second method with principle', 1], ['Third method with principle', 1]],
  d: 2, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- t05 useful fungi
add('bread-mcq', mcq({
  stem: 'A baker mixes flour, sugar, warm water and yeast. In another bowl, the same mixture is made with yeast that was first boiled. Only the first dough rises, because',
  right: 'living yeast breaks down sugar and gives off carbon dioxide', wrong: ['boiled yeast makes more oxygen', 'living yeast makes the dough colder', 'boiled yeast turns the sugar to starch'],
  sol: 'Living yeast ferments the sugar and releases carbon dioxide, which makes the dough rise — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('wine-mcq', mcq({
  stem: 'Sweet grape juice is kept in a closed vessel with yeast for some days. It loses its sweetness and a gas escapes. The new liquid contains',
  right: 'alcohol', wrong: ['starch', 'vinegar only', 'protein'],
  sol: 'Yeast breaks down the sugar into alcohol and carbon dioxide — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('bud-mcq', mcq({
  stem: 'Under a microscope, a student sees tiny oval cells with small outgrowths in a sugar solution. The cells are multiplying by',
  right: 'budding', wrong: ['pollination', 'germination', 'tanning'],
  sol: 'Yeast cells form small buds that separate to become new cells — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('cheese-mcq', mcq({
  stem: 'The blue-green veins seen in some ripened cheeses are caused by',
  right: 'moulds, which are fungi', wrong: ['viruses that ripen the curd', 'algae growing in the cheese', 'bacteria that make antibiotics'],
  sol: 'Moulds growing in the curd ripen the cheese and give the veins — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('mush-mcq', mcq({
  stem: 'A student says that a mushroom is a plant because it grows in the soil. This is wrong because a mushroom',
  right: 'has no chlorophyll and takes in food from compost', wrong: ['has no cells', 'makes its food by photosynthesis', 'has roots, stem and leaves'],
  sol: 'A mushroom is a fungus: no chlorophyll, and it absorbs food — option (@K).',
  d: 3, c: 'analysis', t: [5],
}));
add('ar-dough', ar({
  a: 'Dough rises because yeast gives off oxygen.',
  r: 'Yeast breaks down sugar and releases carbon dioxide.',
  key: 'b',
  sol: 'The assertion is false: the gas is carbon dioxide, not oxygen. The reason is true — option (b).',
  d: 3, c: 'analysis', t: [5],
}));
add('ar-mush', ar({
  a: 'Mushrooms are classified as fungi.',
  r: 'Mushrooms have no chlorophyll and absorb their food.',
  key: 'c',
  sol: 'Both are true, and the lack of chlorophyll with absorbed food explains why they are fungi — option (c).',
  d: 2, c: 'analysis', t: [5],
}));
add('tf-yeast', tf({
  stem: 'Yeast is a single-celled fungus that multiplies by budding.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [5],
}));
add('tf-mush', tf({
  stem: 'A mushroom is a green plant that makes food by photosynthesis.',
  key: 'f',
  sol: 'False. A mushroom is a fungus with no chlorophyll.',
  d: 1, c: 'understanding', t: [5],
}));
add('odd-fungus', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: Yeast, Mushroom, Mould, Rhizobium.',
  model: '**Rhizobium**; the others are **fungi**.', sol: 'Rhizobium is a bacterium.', sch: 'Odd one and category',
  d: 2, c: 'analysis', t: [5],
}));
add('reason-dough', term({
  stem: 'Give reason: bread dough rises when yeast is added to it.',
  model: 'Yeast breaks down the **sugar** in the dough and releases **carbon dioxide**, which forms bubbles and **raises** the dough.', sol: 'Carbon dioxide from sugar.', sch: 'Carbon dioxide released',
  d: 2, c: 'understanding', t: [5],
}));
add('yeast-num', num({
  stem: `${YEAST2.start} yeast cells in a sugar solution double in number ${YEAST2.n} times by budding. How many cells are there at the end?`,
  value: YEAST2.final,
  sol: r`$${YEAST2.start} \times 2^{${YEAST2.n}} = ${YEAST2.start} \times ${2 ** YEAST2.n} = ${YEAST2.final}$.`,
  scheme: [[`${YEAST2.final}`, 1]],
  d: 2, c: 'application', t: [5],
}), (q) => q.answer.value === 40 || 'value');
add('yeast-short', short({
  marks: 2,
  stem: 'Explain why yeast is used in a bakery.',
  model: 'Yeast **breaks down the sugar** in the dough and releases **carbon dioxide**. The gas forms **bubbles** that make the dough **rise**, so the bread becomes soft and spongy.',
  sol: 'Carbon dioxide; dough rises.',
  scheme: [['Carbon dioxide from sugar', 1], ['Dough rises, bread soft', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('cheese-short', short({
  marks: 2,
  stem: 'State one use of a fungus in cheese making and one use of mushrooms as food.',
  model: '**Moulds** growing in the curd **ripen** the cheese and give it its **flavour and texture**. **Edible mushrooms** are grown on compost and eaten as a food **rich in protein** and low in fat.',
  sol: 'Moulds ripen cheese; mushrooms are protein-rich food.',
  scheme: [['Role of moulds in cheese', 1], ['Mushrooms as food', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('yeast-uses-short', short({
  marks: 3,
  stem: 'Explain the role of yeast in (i) a bakery and (ii) a brewery.',
  model: '(i) **Bakery:** yeast breaks down the sugar in the dough and releases **carbon dioxide**; the bubbles make the dough **rise**.\n(ii) **Brewery:** yeast breaks down the sugar of grain or grape juice **without oxygen** into **alcohol** and carbon dioxide, giving beer or wine.',
  sol: 'Bakery: carbon dioxide raises the dough. Brewery: alcohol from sugar.',
  scheme: [['Bakery: gas from sugar', 1], ['Bakery: dough rises', 1], ['Brewery: alcohol from sugar', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('mushroom-draw', short({
  marks: 3, wl: null,
  stem: 'Draw a neat, labelled diagram of an edible mushroom. Label the cap, stalk and mycelium.',
  model: 'A **cap** on a **stalk** above the soil level, with **gills** under the cap; below the soil a network of fine threads, the **mycelium**. Three labels with ruled lines.',
  sol: 'Mushroom with cap, stalk and mycelium.',
  scheme: [['Cap and stalk drawn', 1], ['Mycelium below the soil', 1], ['Three correct labels', 1]],
  d: 2, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('farm-long', long({
  marks: 10, wl: null,
  stem: 'A farmer grows groundnut in a field after a wheat crop. A student uproots a groundnut plant and sees small swellings on its roots. The student reads that air is 78 percent nitrogen.\n\n(a) Name the swellings and the bacteria that live in them. [2]\n\n(b) Explain why the groundnut plant cannot use the nitrogen of the air directly, although it is so plentiful. [2]\n\n(c) Name the process that returns nitrogen gas to the air and the bacterium that carries it out. [2]\n\n(d) Draw a neat flow chart of the nitrogen cycle, showing nitrogen in air, ammonia, nitrates, plants and animals, with the name of the process on each arrow. [4]',
  model: '**(a)** The swellings are **root nodules**; they contain **Rhizobium** bacteria.\n\n**(b)** Plants can take up only **nitrogen compounds such as nitrates**, not nitrogen gas. Rhizobium (nitrogen fixation) must first change the gas into a usable form.\n\n**(c)** **Denitrification**, carried out by **Pseudomonas**.\n\n**(d)** Nitrogen in air → (**nitrogen fixation**, Rhizobium) → ammonia compounds → (**nitrification**, Nitrosomonas and Nitrobacter) → nitrates → (**absorption**) → plants → animals; dead remains → (**decay**) → ammonia; nitrates → (**denitrification**) → air.',
  sol: 'Root nodules with Rhizobium; only nitrates usable; denitrification by Pseudomonas; flow chart of the cycle.',
  scheme: [['Root nodules', 1], ['Rhizobium', 1], ['Plants take up only nitrogen compounds', 1], ['Nitrogen must first be fixed', 1], ['Denitrification', 1], ['Pseudomonas', 1], ['Cycle drawn with air, ammonia, nitrates, plants and animals', 2], ['Processes named on the arrows', 2]],
  d: 3, c: 'application', t: [2],
}));
add('vacc-long', long({
  marks: 10, wl: null,
  stem: `A health team visits a village with ${VACC.children} children and vaccinates ${VACC.vaccinated} of them in a week. Later a girl in the village is bitten by a venomous snake.\n\n(a) Calculate the number of children not yet vaccinated and the percentage who have been vaccinated. [2]\n\n(b) What is a vaccine? State how it protects a child. [3]\n\n(c) Explain why the girl is given a serum and not a vaccine. [2]\n\n(d) Draw a neat flow chart of the steps by which a vaccine gives protection against a disease. [3]`,
  model: `**(a)** Not yet vaccinated = ${VACC.children} − ${VACC.vaccinated} = **${VACC.left}**; percentage vaccinated = ${VACC.vaccinated} ÷ ${VACC.children} × 100 = **${VACC.pct} percent**.\n\n**(b)** A **vaccine** is a preparation of **weakened or killed germs** (or their harmless products). It makes the body produce **antibodies** against the germ and **remember** it, so the child is protected for a **long time**.\n\n**(c)** A serum contains **ready-made antibodies** that act **at once**; the girl needs quick help, and a vaccine would take too long to make the body produce antibodies.\n\n**(d)** Vaccine (weakened germs) injected → body detects the germ → body makes **antibodies** → body remembers → **protected** if the real germ enters later.`,
  sol: `${VACC.left} children and ${VACC.pct} percent; weakened germs make antibodies; serum acts at once; flow chart.`,
  scheme: [[`${VACC.left} children`, 1], [`${VACC.pct} percent`, 1], ['Weakened or killed germs', 1], ['Body makes antibodies', 1], ['Long-lasting protection', 1], ['Serum has ready-made antibodies', 1], ['Acts at once, vaccine is slow', 1], ['Flow chart of three or more steps in order', 2], ['Arrows and labels', 1]],
  d: 3, c: 'application', t: [1],
}), (q) => VACC.pct === 75 || 'pct');
add('tan-long', long({
  marks: 10, wl: null,
  stem: `A tea estate sends cured leaves to a packing unit, and a tannery in the same town has ${TAN.vats} vats with ${TAN.perVat} hides in each. After soaking, ${TAN.redo} percent of all the hides need to be soaked again.\n\n(a) State the role of bacteria in the curing of tea leaves. [2]\n\n(b) State the role of bacteria in the tanning of leather. [2]\n\n(c) Calculate the number of hides in the tannery, the number to be soaked again and the number that are ready. [3]\n\n(d) Draw a neat flow chart showing the steps from a fresh hide to leather. [3]`,
  model: `**(a)** Bacteria **act on the dried, rolled leaves** and give the tea its **flavour and aroma**.\n\n**(b)** Bacteria in the vats **loosen the hair and fat** on the hide, making it **soft and flexible**.\n\n**(c)** Hides = ${TAN.vats} × ${TAN.perVat} = **${TAN.hides}**; soaked again = ${TAN.redo} ÷ 100 × ${TAN.hides} = **${TAN.again}**; ready = ${TAN.hides} − ${TAN.again} = **${TAN.done}**.\n\n**(d)** Fresh hide → soaked in vats → **bacteria loosen hair and fat** → hide made soft and flexible → **tanned** → leather.`,
  sol: `Flavour and aroma; hair and fat loosened; ${TAN.hides}, ${TAN.again}, ${TAN.done}; flow chart.`,
  scheme: [['Bacteria act on the leaves', 1], ['Flavour and aroma', 1], ['Loosen hair and fat', 1], ['Soft and flexible hide', 1], [`${TAN.hides} hides`, 1], [`${TAN.again} soaked again`, 1], [`${TAN.done} ready`, 1], ['Steps in the right order', 2], ['Arrows and labels', 1]],
  d: 3, c: 'application', t: [3],
}), (q) => TAN.done === 48 || 'done');
add('spoil-long', long({
  marks: 10, wl: null,
  stem: `A cook leaves a pan of milk on a warm table. The milk starts with ${MILK.start} bacteria, and they double every ${MILK.every} minutes.\n\n(a) Calculate the number of bacteria after one hour and after two hours. [3]\n\n(b) Explain why the milk would stay fresh for longer in a refrigerator. [2]\n\n(c) Name three methods of preventing food spoilage and state the principle of each. [3]\n\n(d) Draw a neat, labelled bar graph of the number of bacteria at 0, 20, 40 and 60 minutes. [2]`,
  model: `**(a)** After one hour: ${MILK.start} × 2 three times = **${MILK.final}**. After two hours there are six doublings: ${MILK.start} × ${2 ** 6} = **${MILK.at120}**.\n\n**(b)** The **low temperature slows** the growth and division of bacteria, so they multiply far more **slowly**.\n\n**(c)** **Refrigeration**: cold slows growth. **Boiling or pasteurisation**: heat kills bacteria. **Salting, sugar, vinegar or drying**: remove water or make the food unsuitable.\n\n**(d)** Time (minutes) on the x-axis and number of bacteria on the y-axis, with four bars: ${MILK.series.join(', ')}. Both axes labelled.`,
  sol: `${MILK.final} and ${MILK.at120}; cold slows growth; three methods; bar graph.`,
  scheme: [[`${MILK.final} after one hour`, 1], ['Six doublings in two hours', 1], [`${MILK.at120} after two hours`, 1], ['Low temperature', 1], ['Slows the growth of bacteria', 1], ['Three methods named', 1], ['Principle of each', 2], ['Bars of correct heights with axes labelled', 2]].map(([a, b]) => [a, b]),
  d: 3, c: 'application', t: [4],
}), (q) => MILK.at120 === 16000 || 'at120');
add('bake-long', long({
  marks: 10, wl: null,
  stem: `A baker mixes flour, sugar, warm water and yeast. The dough is ${BREAD.before} mL at the start and ${BREAD.after} mL after two hours in a warm place.\n\n(a) Calculate the percentage increase in the volume of the dough. [2]\n\n(b) Name the gas that makes the dough rise and explain how it is produced. [3]\n\n(c) State what yeast does to grape juice in a brewery and name the two products. [2]\n\n(d) Draw a neat, labelled diagram of a yeast cell forming a bud. [3]`,
  model: `**(a)** Gain = ${BREAD.after} − ${BREAD.before} = ${BREAD.gain} mL; percentage increase = ${BREAD.gain} ÷ ${BREAD.before} × 100 = **${BREAD.pct} percent**.\n\n**(b)** **Carbon dioxide**. Yeast **breaks down the sugar** in the dough and releases the gas, which forms **bubbles** that make the dough **rise**.\n\n**(c)** Yeast breaks down the sugar **without oxygen** (fermentation) into **alcohol** and **carbon dioxide**.\n\n**(d)** A **cell** with a **cell wall**, **nucleus** and **vacuole**, and a small **bud** growing from it. Four labels.`,
  sol: `${BREAD.pct} percent; carbon dioxide from sugar; alcohol and carbon dioxide; labelled budding yeast.`,
  scheme: [[`${BREAD.gain} mL gain`, 1], [`${BREAD.pct} percent`, 1], ['Carbon dioxide', 1], ['Yeast breaks down sugar', 1], ['Bubbles raise the dough', 1], ['Alcohol', 1], ['Carbon dioxide in brewing', 1], ['Cell with a bud drawn', 1], ['Labels', 2]],
  d: 3, c: 'application', t: [5],
}), (q) => BREAD.pct === 120 || 'pct');
add('mush-long', long({
  marks: 10, wl: null,
  stem: `A mushroom farm has ${MUSH.trays} trays of compost. Every tray gives ${MUSH.perTray} mushrooms at each picking, and the farmer picks ${MUSH.flushes} times.\n\n(a) Calculate the number of mushrooms picked at one picking and in all. [2]\n\n(b) Give two reasons why a mushroom is classified as a fungus and not as a plant. [2]\n\n(c) State one use of a fungus in cheese making. [2]\n\n(d) Draw a neat, labelled diagram of a mushroom, naming the cap, gills, stalk and mycelium. [4]`,
  model: `**(a)** One picking = ${MUSH.trays} × ${MUSH.perTray} = **${MUSH.perFlush}**; in all = ${MUSH.perFlush} × ${MUSH.flushes} = **${MUSH.total}**.\n\n**(b)** It has **no chlorophyll**, so it cannot make food by photosynthesis; it **absorbs food** from the compost; it has a body of thread-like **hyphae** (mycelium) and no true roots, stem and leaves.\n\n**(c)** **Moulds** growing in the curd **ripen** the cheese and give it its flavour and texture (blue cheese).\n\n**(d)** A **cap** with **gills** underneath, a **stalk** above the soil and a network of **mycelium** below it. Four labels with ruled lines.`,
  sol: `${MUSH.perFlush} and ${MUSH.total}; no chlorophyll, absorbs food; moulds ripen cheese; labelled mushroom.`,
  scheme: [[`${MUSH.perFlush} at one picking`, 1], [`${MUSH.total} in all`, 1], ['No chlorophyll', 1], ['Absorbs food', 1], ['Moulds in the curd', 1], ['Ripen the cheese', 1], ['Mushroom outline with cap and stalk', 1], ['Four labels', 3]].map(([a, b]) => [a, b]),
  d: 3, c: 'application', t: [5],
}), (q) => MUSH.total === 72 || 'total');
add('cycle-long', long({
  marks: 10, wl: null,
  stem: 'Study the diagram of the nitrogen cycle, in which five processes are lettered A to E. A farmer finds that a flooded field has lost much of its nitrogen.\n\n(a) Name the processes A, C and D. [3]\n\n(b) Name one symbiotic and one free-living bacterium that carry out process A. [2]\n\n(c) Which process, lettered in the diagram, has become faster in the flooded field? Explain why the field has lost fertility. [2]\n\n(d) Draw a neat, labelled diagram of the root of a pulse plant showing the root nodules and the bacteria in them. [3]',
  model: '**(a)** A: **nitrogen fixation**; C: **nitrification**; D: **denitrification**.\n\n**(b)** Symbiotic: **Rhizobium** (in root nodules); free-living: **Azotobacter** (or Clostridium).\n\n**(c)** **D, denitrification**. Denitrifying bacteria change the **nitrates** in the waterlogged soil into **nitrogen gas**, which escapes to the air, so the soil has **fewer nitrates** for the plants.\n\n**(d)** A **main root** with **lateral roots**; **nodules** on the lateral roots; one nodule enlarged to show **Rhizobium**. Labels.',
  sol: 'Fixation, nitrification, denitrification; Rhizobium and Azotobacter; denitrification removes nitrates; labelled root with nodules.',
  scheme: [['A named', 1], ['C named', 1], ['D named', 1], ['Rhizobium', 1], ['Free-living example', 1], ['Denitrification (D)', 1], ['Nitrates change to nitrogen gas, so fewer nitrates', 1], ['Root and nodules drawn', 1], ['Labels', 2]],
  d: 4, c: 'analysis', t: [2],
  assets: [cycleFig],
}));
