// ICSE 10 Biology ch07 Circulatory System: Blood and Lymph — Part 1 (t01–t03 blood, red cells, clotting), Part 2 (t04–t05 lymph, blood groups).
import { sl, deck, table, flow, svgV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { BLOOD_CELLS, RBC, CLOT, LYMPH, TYPING } from './svgs.mjs';
import { BLOOD, DIFF, GROUPS, antibodies, canGive } from './calc.mjs';

export const V = {
  cells: svgV(BLOOD_CELLS, 'Red blood cell, five kinds of white blood cell and platelets'),
  rbc: svgV(RBC, 'Features that make a red blood cell an efficient oxygen carrier'),
  clot: svgV(CLOT, 'A blood clot: fibrin threads trapping red cells'),
  lymph: svgV(LYMPH, 'Formation of tissue fluid and lymph at a capillary'),
  typing: svgV(TYPING, 'A blood-grouping slide with anti-A and anti-B sera'),
};
const yn = (b) => (b ? 'Yes' : 'No');
const ag = { A: 'A', B: 'B', AB: 'A and B', O: 'None' };

export const deck1 = deck({
  part: 1,
  title: 'Blood and Lymph — Part 1: Blood, its cells and clotting',
  goals: [
    'State the functions of plasma, red blood cells, white blood cells and platelets',
    'Identify blood cells from diagrams and explain why mammalian red cells are efficient',
    'Outline the steps from injury to clot formation',
  ],
  slides: [
    sl('title', 'Circulatory System: Blood and Lymph', {
      b: 'Part 1 — what blood is made of, and how it seals a wound.',
      v: flow('LR', [['b', 'Blood: a fluid connective tissue'], ['p', 'Plasma: about 55 percent'], ['f', 'Cells and platelets: about 45 percent']], [['b', 'p'], ['b', 'f']], 'Flow: blood is made of plasma, about fifty-five percent, and cells and platelets, about forty-five percent'),
      n: 'Blood carries food, oxygen, wastes and heat around the body. It also fights germs and seals its own leaks. In this part we look at what blood is made of, why red cells are so good at their job, and how a clot forms.',
    }),
    sl('concept', 'Composition of blood', {
      b: '**Blood** is a fluid connective tissue: liquid **plasma** carrying **red cells, white cells and platelets**.',
      v: table(['Part', 'Contains', 'Main job'], [['Plasma (about 55%)', 'Water (about 90%), proteins (albumin, globulins, fibrinogen, prothrombin), glucose, amino acids, salts, urea, hormones, carbon dioxide', 'Transport; clotting proteins; antibodies'], ['Red blood cells', 'Haemoglobin', 'Carry oxygen'], ['White blood cells', 'Nucleus; some have granules', 'Defence'], ['Platelets', 'Cell fragments', 'Start clotting']], 'Table of the parts of blood, what each contains and its main job'),
      n: 'Plasma is mostly water with many things dissolved in it: food, wastes, hormones and proteins. Floating in the plasma are the red cells, the white cells and the platelets. Each has its own job.',
    }),
    sl('example', 'Worked example 1: how much plasma?', {
      b: `An adult has about **${BLOOD.litres} litres** of blood; about **${BLOOD.plasmaPct}%** of it is plasma.`,
      ul: [`Step 1: plasma = ${BLOOD.litres} × ${BLOOD.plasmaPct} ÷ 100 = **${BLOOD.plasma} litres**.`, `Step 2: cells and platelets = ${BLOOD.litres} − ${BLOOD.plasma} = **${BLOOD.cells} litres**.`, 'Step 3: so a little more than half the blood is plasma.'],
      v: table(['Part of blood', 'Volume (litres)'], [['Plasma', String(BLOOD.plasma)], ['Cells and platelets', String(BLOOD.cells)], ['Total', String(BLOOD.litres)]], 'Worked table: plasma two point seven five litres, cells and platelets two point two five litres, total five litres'),
      n: 'Multiply the total volume by the plasma share. Five litres of blood holds about two and three quarter litres of plasma. The rest, a little under half, is cells and platelets.',
    }),
    sl('diagram', 'Blood cells under the microscope', {
      b: 'A stained blood smear shows **red cells**, five kinds of **white cells**, and **platelets**.',
      v: V.cells,
      n: 'Red cells are the most common. They are discs with a pale centre and no nucleus. White cells all have a nucleus, and its shape tells you the kind. Platelets are tiny fragments.',
    }),
    sl('concept', 'Red cells, white cells and platelets', {
      v: table(['Feature', 'Red blood cells', 'White blood cells', 'Platelets'], [['Number per cubic mm', 'About 5 million', '5000 to 10 000', '2.5 to 4 lakh'], ['Nucleus', 'Absent (mammals)', 'Present', 'Absent'], ['Made in', 'Red bone marrow', 'Bone marrow, lymph nodes', 'Bone marrow'], ['Life', 'About 120 days', 'A few days', 'About a week'], ['Function', 'Carry oxygen', 'Fight germs', 'Start clotting']], 'Table comparing red cells, white cells and platelets in number, nucleus, place of formation, life and function'),
      n: 'Compare the three. Red cells are millions to every cubic millimetre, live about four months and carry oxygen. White cells are far fewer and fight germs. Platelets are fragments that help blood clot.',
    }),
    sl('check', 'Quick check: the oxygen carrier', {
      b: 'Fill in: the red, iron-containing pigment of red cells that combines with oxygen is ______.',
      chk: 'haemo-fill',
      n: 'It gives blood its red colour.',
    }),
    sl('concept', 'Kinds of white blood cells', {
      v: table(['Cell', 'Nucleus', 'Role'], [['Neutrophil (most numerous)', '3 to 5 lobes', 'Engulfs bacteria (phagocytosis)'], ['Eosinophil', '2 lobes', 'Rises in allergies and worm infections'], ['Basophil', 'S-shaped', 'Releases histamine and heparin'], ['Lymphocyte', 'Large, round', 'Makes antibodies'], ['Monocyte (largest)', 'Kidney-shaped', 'Becomes a large scavenger cell (macrophage)']], 'Table of five kinds of white blood cell with their nucleus and role'),
      n: 'Neutrophils, eosinophils and basophils have granules and lobed nuclei. Lymphocytes and monocytes do not. Neutrophils and monocytes eat germs. Lymphocytes make antibodies. White cells can squeeze out of capillaries to reach an infection. This is called diapedesis.',
    }),
    sl('example', 'Worked example 2: a differential count', {
      b: `A student counts **${DIFF.total}** white cells in a smear.`,
      ul: [`Step 1: neutrophils ${DIFF.neutrophils} of ${DIFF.total} = **${DIFF.pct.neutrophils}%**.`, `Step 2: lymphocytes ${DIFF.lymphocytes} of ${DIFF.total} = **${DIFF.pct.lymphocytes}%**.`, 'Step 3: neutrophils are the most common, basophils the rarest.'],
      v: table(['Cell', 'Number', 'Percentage'], Object.keys(DIFF.pct).map((k) => [k[0].toUpperCase() + k.slice(1), String(DIFF[k]), `${DIFF.pct[k]}%`]), 'Worked table: neutrophils sixty-two percent, lymphocytes twenty-eight percent, monocytes five percent, eosinophils four percent, basophils one percent'),
      n: 'Divide each count by the total and multiply by a hundred. Neutrophils come out at about sixty two percent and lymphocytes at about twenty eight percent. A big change from this pattern helps a doctor spot an infection or an allergy.',
    }),
    sl('check', 'Quick check: white cells', {
      b: 'True or false: mature white blood cells have no nucleus.',
      chk: 'wbc-nucleus-tf',
      n: 'Which cells in the smear lacked a nucleus?',
    }),
    sl('diagram', 'Why the red cell is so efficient', {
      b: 'Mammalian red cells: **no nucleus**, **no mitochondria**, **biconcave**.',
      v: V.rbc,
      n: 'No nucleus means more room for haemoglobin. No mitochondria means the cell does not use the oxygen it carries. The biconcave shape gives a large surface and a thin centre, and the cell can bend through the narrowest capillaries.',
    }),
    sl('check', 'Quick check: no nucleus', {
      b: 'Why is the lack of a nucleus useful to a red cell?',
      chk: 'no-nucleus-mcq',
      n: 'Think about what fills a red cell.',
    }),
    sl('concept', 'How blood clots', {
      v: flow('TB', [['i', 'Injury: platelets and tissue release thromboplastin'], ['t', 'Prothrombin becomes thrombin (needs calcium ions)'], ['f', 'Fibrinogen becomes fibrin threads'], ['c', 'Fibrin mesh traps cells: clot']], [['i', 't'], ['t', 'f'], ['f', 'c']], 'Flow: thromboplastin is released, prothrombin becomes thrombin with calcium, fibrinogen becomes fibrin, the fibrin mesh traps cells to form a clot'),
      n: 'Clotting is a chain. Thromboplastin from platelets and damaged tissue, helped by calcium, turns prothrombin into thrombin. Thrombin turns soluble fibrinogen into insoluble fibrin threads. Vitamin K is needed to make prothrombin.',
    }),
    sl('diagram', 'Inside a clot', {
      b: '**Fibrin** threads form a mesh that traps red cells and seals the wound. The fluid that oozes out later is **serum**.',
      v: V.clot,
      n: 'Under a microscope a clot is a tangle of fibrin threads with red cells caught in it. As the clot shrinks, a pale yellow fluid called serum is squeezed out. Serum is plasma without its clotting proteins.',
    }),
    sl('check', 'Quick check: the clotting chain', {
      b: 'Which sequence of events in blood clotting is correct?',
      chk: 'clot-order-mcq',
      n: 'Start at the wound and end with the threads.',
    }),
    sl('summary', 'Summary', {
      ul: ['Blood = plasma (about 55%) + red cells, white cells and platelets.', 'Red cells carry oxygen; white cells defend; platelets start clotting.', 'Red cells: no nucleus, no mitochondria, biconcave: efficient oxygen carriers.', 'Clotting: thromboplastin → thrombin → fibrin mesh.'],
      v: table(['Component', 'One-word job'], [['Plasma', 'Transport'], ['Red cells', 'Oxygen'], ['White cells', 'Defence'], ['Platelets', 'Clotting']], 'Summary table of one-word jobs of plasma, red cells, white cells and platelets'),
      n: 'To recap. Plasma transports, red cells carry oxygen, white cells defend and platelets start clotting. The red cell is built for one job only, and clotting is a short chain that ends in a mesh of fibrin.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Write **thromboplastin → thrombin → fibrin** in the right order and mention **calcium**.', 'Identify white cells by the **shape of the nucleus**.', 'Serum = plasma **minus fibrinogen**.', 'For red-cell efficiency, give the **feature and its advantage** together.'],
      n: 'Exam tips. Keep the clotting chain in order and mention calcium. Use the nucleus to name white cells. Remember serum has no fibrinogen. And always pair a feature of the red cell with the advantage it brings.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Blood and Lymph — Part 2: Lymph, spleen and blood groups',
  goals: [
    'Explain how tissue fluid forms and becomes lymph, and state the functions of the lymphatic system, spleen and tonsils',
    'Identify universal donor and universal recipient groups and explain why',
    'Explain the risk of Rh incompatibility',
  ],
  slides: [
    sl('title', 'Lymph and Blood Groups', {
      b: 'Part 2 — the fluid that bathes our cells, and why blood must be matched before a transfusion.',
      v: flow('LR', [['p', 'Plasma in capillaries'], ['t', 'Tissue fluid around cells'], ['l', 'Lymph in lymph vessels'], ['b', 'Back into the blood']], [['p', 't'], ['t', 'l'], ['l', 'b']], 'Flow: plasma leaks from capillaries as tissue fluid, which drains as lymph and returns to the blood'),
      n: 'Blood never touches most of your cells directly. A watery fluid leaks out of the capillaries and bathes them. Some of it returns as lymph through a second set of vessels. Later we see why a transfusion needs the right blood group.',
    }),
    sl('diagram', 'Tissue fluid and lymph', {
      b: 'Plasma filters out at the **arterial end** of capillaries as **tissue fluid**; most returns at the **venous end**; the extra drains as **lymph**.',
      v: V.lymph,
      n: 'At the arterial end, pressure pushes fluid out between the cells. It carries food and oxygen to them and collects their wastes. Most of it seeps back at the venous end. The extra enters lymph capillaries, which have closed ends, and becomes lymph.',
    }),
    sl('concept', 'Plasma, tissue fluid and lymph', {
      v: table(['Feature', 'Plasma', 'Tissue fluid', 'Lymph'], [['Where', 'Blood vessels', 'Spaces between cells', 'Lymph vessels'], ['Red cells', 'Present in blood', 'None', 'None'], ['Proteins', 'Many', 'Few', 'Few'], ['White cells', 'All kinds in blood', 'A few', 'Many lymphocytes']], 'Table comparing plasma, tissue fluid and lymph'),
      n: 'Tissue fluid and lymph are both plasma that has filtered out. Big proteins and red cells stay behind in the blood. Lymph picks up many lymphocytes as it passes through the lymph nodes.',
    }),
    sl('check', 'Quick check: tissue fluid', {
      b: 'How does tissue fluid differ from plasma?',
      chk: 'tissue-fluid-mcq',
      n: 'What cannot pass through the capillary wall?',
    }),
    sl('concept', 'The lymphatic system', {
      v: table(['Part', 'What it does'], [['Lymph capillaries', 'Closed-ended tubes that collect extra tissue fluid'], ['Lymph vessels', 'Carry lymph towards the heart; valves stop backflow'], ['Lymph nodes', 'Filter germs; make lymphocytes'], ['Lacteals in villi', 'Absorb digested fats'], ['Main lymph ducts', 'Empty lymph into large veins near the heart']], 'Table of the parts of the lymphatic system and what each does'),
      n: 'Lymph has no pump of its own. Muscles squeeze the vessels, and valves keep the flow going one way, towards the heart. On the way, lymph nodes act as filters. If the vessels are blocked, fluid collects and the limb swells.',
    }),
    sl('concept', 'Spleen and tonsils', {
      v: table(['Organ', 'Functions'], [['Spleen (largest lymphoid organ)', 'Destroys worn-out red cells; makes lymphocytes; filters blood; stores blood'], ['Tonsils (back of the throat)', 'Trap and destroy germs entering through the mouth and nose']], 'Table of the functions of the spleen and the tonsils'),
      n: 'The spleen is called the graveyard of red cells, because worn out red cells are broken down there. It also stores blood for emergencies. The tonsils guard the throat. When they are overwhelmed by germs they swell up.',
    }),
    sl('check', 'Quick check: the spleen', {
      b: 'True or false: the spleen stores some blood and releases it when the body loses blood.',
      chk: 'spleen-tf',
      n: 'Think of the spleen as a reservoir.',
    }),
    sl('concept', 'The ABO blood groups', {
      b: 'Red cells may carry **antigen A**, **antigen B**, both or neither. Plasma carries **antibodies** against the antigens a person lacks.',
      v: table(['Group', 'Antigen on red cells', 'Antibodies in plasma'], GROUPS.map((g) => [g, ag[g], antibodies(g).length ? antibodies(g).join(' and ') : 'None']), 'Table of the four ABO groups with their antigens and antibodies'),
      n: 'Group A has antigen A and anti-B in the plasma. Group B is the reverse. Group AB has both antigens and no antibodies. Group O has no antigens and both antibodies. A person never makes antibodies against his own antigens.',
    }),
    sl('example', 'Worked example 1: who can give to whom?', {
      b: 'Rule: the **donor\'s antigens** must not meet a matching **antibody** in the patient\'s plasma.',
      ul: ['Step 1: list the antigens on the donor\'s red cells.', 'Step 2: list the antibodies in the patient\'s plasma.', 'Step 3: a match (A with anti-A, B with anti-B) means **agglutination**: not safe.'],
      v: table(['Donor', ...GROUPS.map((g) => `To ${g}`)], GROUPS.map((d) => [d, ...GROUPS.map((rr) => yn(canGive(d, rr)))]), 'Worked table: group O can give to all groups; group AB can give only to AB; group A can give to A and AB; group B can give to B and AB'),
      n: 'Use the table row by row. Group O cells have no antigens, so they can go to anyone: O is the universal donor. Group AB plasma has no antibodies, so AB can receive from anyone: AB is the universal recipient.',
    }),
    sl('check', 'Quick check: the universal donor', {
      b: 'Which group is called the universal donor?',
      chk: 'universal-donor-mcq',
      n: 'Which red cells carry no antigen at all?',
    }),
    sl('diagram', 'Finding a blood group', {
      b: 'A drop of blood is mixed with **anti-A** and **anti-B** serum. **Clumping** (agglutination) shows which antigen is present.',
      v: V.typing,
      n: 'Look at each row. If the blood clumps with anti-A serum, its cells carry antigen A. If it clumps with anti-B, they carry antigen B. Clumping with both means group AB, and with neither means group O.',
    }),
    sl('example', 'Worked example 2: reading the slide', {
      b: 'Read each person\'s two drops.',
      ul: ['Step 1: clumped with anti-A only → group **A**.', 'Step 2: clumped with both → group **AB**; with neither → group **O**.', 'Step 3: clumped with anti-B only → group **B**.'],
      v: table(['Person', 'Anti-A', 'Anti-B', 'Group'], [['P', 'Clumps', 'No change', 'A'], ['Q', 'Clumps', 'Clumps', 'AB'], ['R', 'No change', 'No change', 'O'], ['S', 'No change', 'Clumps', 'B']], 'Worked table: P group A, Q group AB, R group O, S group B'),
      n: 'Clumping with a serum means the matching antigen is present. So P is A, Q is AB, R is O and S is B. Notice that R, the group O person, could donate to all the others.',
    }),
    sl('concept', 'The Rh factor', {
      b: 'The **Rh factor** is another antigen on red cells: people are **Rh-positive** or **Rh-negative**.',
      v: flow('TB', [['m', 'Rh-negative mother, Rh-positive baby'], ['f', 'First birth: baby\'s cells enter mother\'s blood'], ['a', 'Mother forms anti-Rh antibodies'], ['s', 'Next Rh-positive baby: antibodies destroy its red cells'], ['p', 'Prevented by an anti-Rh injection after the first delivery']], [['m', 'f'], ['f', 'a'], ['a', 's'], ['s', 'p', 'avoid']], 'Flow: an Rh-negative mother with an Rh-positive baby forms anti-Rh antibodies after the first birth, which can destroy the red cells of the next Rh-positive baby; an injection after the first delivery prevents this'),
      n: 'Most people are Rh-positive. Trouble arises when an Rh-negative mother carries an Rh-positive baby. After the first birth she may form anti-Rh antibodies, which can attack a later baby. An injection given soon after the first delivery prevents this.',
    }),
    sl('check', 'Quick check: Rh transfusions', {
      b: 'True or false: an Rh-negative person can safely receive Rh-positive blood again and again.',
      chk: 'rh-tf',
      n: 'What does the body make after the first exposure?',
    }),
    sl('summary', 'Summary', {
      ul: ['Tissue fluid filters out of capillaries; the extra drains as lymph.', 'Lymphatic system: returns fluid, absorbs fats, defends the body.', 'Spleen destroys old red cells and stores blood; tonsils trap germs.', 'O is the universal donor; AB is the universal recipient.', 'Rh-negative mother, Rh-positive baby: risk to a later baby.'],
      v: table(['Group', 'Can receive from'], GROUPS.map((rr) => [rr, GROUPS.filter((d) => canGive(d, rr)).join(', ')]), 'Summary table of the groups each ABO group can receive red cells from'),
      n: 'To recap. Lymph begins as tissue fluid and returns to the blood. Lymph nodes, the spleen and the tonsils help to defend the body. Blood must be matched by its antigens, and the Rh factor matters in pregnancy as well as in transfusion.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Antigens are on the **red cells**; antibodies are in the **plasma**.', 'Explain universal donor and recipient by **antigens** and **antibodies**.', 'Rh problem: **Rh-negative mother**, **Rh-positive baby**, usually the **second** pregnancy.', 'Lymph flows **one way** because of **valves**.'],
      n: 'Exam tips. Put antigens on the cells and antibodies in the plasma. Explain donor and recipient rules with them. For Rh, name the mother and the baby correctly and say it is the later baby at risk. And remember the valves in lymph vessels.',
    }),
  ],
});
