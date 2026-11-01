// ICSE 10 Biology ch07 Circulatory System: Blood and Lymph — question bank in ICSE 2027 style.
// Plasma volume, differential-count percentages, report differences and blood-group compatibility come from calc.mjs.
// AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true, R does not explain.
import { mk, add, svgV, r } from '../../icse-10-biology-ch01/src/lib.mjs';
import { BLOOD, DIFF, REPORT, RBC_LIFE, replacedPerDayPct, antibodies, canGive, canGiveRh, donorsFor } from './calc.mjs';
import { BLOOD_CELLS_LETTERED, TYPING } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, match, part } = mk;
const cellsFig = svgV(BLOOD_CELLS_LETTERED, 'Five blood components lettered A to E');
const typingFig = svgV(TYPING, 'Blood-grouping slide for persons P, Q, R and S with anti-A and anti-B sera');

// ---------------------------------------------------------------- t01 composition of blood
add('plasma-pct-mcq', mcq({
  stem: 'A sample of blood is spun in a centrifuge until the cells settle. The clear, straw-coloured liquid on top makes up about',
  right: '55 percent of the volume, and is plasma', wrong: ['10 percent of the volume, and is serum', '90 percent of the volume, and is lymph', '45 percent of the volume, and is tissue fluid'],
  sol: 'Plasma forms about 55 percent of blood; the cells settle as the remaining 45 percent — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('neutro-fig-mcq', mcq({
  stem: 'In the figure, which letter marks the most numerous white blood cell, which engulfs bacteria at a wound?',
  right: 'B', wrong: ['A', 'C', 'E'],
  sol: 'B has a nucleus of several lobes and a granular cytoplasm: a neutrophil. A is a red cell, C a lymphocyte, E platelets — option (@K).',
  d: 2, c: 'application', t: [1],
  assets: [cellsFig],
}));
add('antibody-cell-mcq', mcq({
  stem: 'Which white blood cells produce antibodies?',
  right: 'Lymphocytes', wrong: ['Neutrophils', 'Basophils', 'Platelets'],
  sol: 'Lymphocytes make antibodies against germs and their toxins — option (@K).',
  d: 2, c: 'recall', t: [1],
}));
add('largest-wbc-mcq', mcq({
  stem: 'In a stained smear, Tara sees the largest white cell of all, with a kidney-shaped nucleus. It is a',
  right: 'monocyte', wrong: ['lymphocyte', 'neutrophil', 'basophil'],
  sol: 'The monocyte is the largest white cell and has a kidney- or bean-shaped nucleus — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('allergy-mcq', mcq({
  stem: 'A child with a roundworm infection and frequent allergies is likely to show a raised count of',
  right: 'eosinophils', wrong: ['red blood cells', 'platelets', 'basophils only'],
  sol: 'Eosinophils increase in allergies and in infections by parasitic worms — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('infection-mcq', mcq({
  stem: 'A blood test shows 18 000 white cells per cubic millimetre; the laboratory\'s normal range is 4000 to 11 000. The most likely reason is that the person',
  right: 'is fighting an infection', wrong: ['has just eaten a large meal', 'has lost blood in an accident', 'lives at a high altitude'],
  sol: 'White cells multiply to fight invading germs, so an infection raises the count — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('bone-marrow-mcq', mcq({
  stem: 'In an adult human, red blood cells are produced in the',
  right: 'red bone marrow', wrong: ['spleen', 'liver', 'lymph nodes'],
  sol: 'After birth, red cells are made in the red bone marrow of bones such as the ribs, sternum and vertebrae — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('platelet-low-mcq', mcq({
  stem: 'During a bout of dengue fever, Kunal\'s platelet count falls sharply. The doctor watches him closely because he is at risk of',
  right: 'bleeding that does not stop easily', wrong: ['carrying too much oxygen', 'catching more bacterial infections', 'forming too many antibodies'],
  sol: 'Platelets start clotting, so too few of them means bleeding is hard to stop — option (@K).',
  d: 2, c: 'application', t: [1, 3],
}));
add('plasma-func-mcq', mcq({
  stem: 'Which of these is NOT a function of blood plasma?',
  right: 'Carrying most of the oxygen, bound to haemoglobin', wrong: ['Carrying digested food from the intestine', 'Carrying urea to the kidneys', 'Carrying hormones to target organs'],
  sol: 'Oxygen is carried mainly by haemoglobin inside red cells; plasma carries food, wastes, hormones and carbon dioxide — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('pus-mcq', mcq({
  stem: 'A thorn prick on Rahul\'s heel becomes infected, and a thick yellowish fluid collects under the skin. This fluid is made mainly of',
  right: 'dead white blood cells, dead germs and broken tissue', wrong: ['clotted platelets and fibrin only', 'red blood cells that have lost their haemoglobin', 'lymph that has leaked from the spleen'],
  sol: 'Pus forms where neutrophils have engulfed germs and died at the site of infection — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('wbc-nucleus-tf', tf({
  stem: 'Mature white blood cells have no nucleus.',
  key: 'f',
  sol: 'False. White blood cells have a nucleus; it is the mature red blood cells of mammals that lack one.',
  d: 1, c: 'recall', t: [1],
}));
add('haemo-fill', fill({
  stem: 'The red, iron-containing pigment in red blood cells that combines with oxygen is ______.',
  acc: [['haemoglobin', 'hemoglobin']],
  sol: 'Haemoglobin.',
  d: 1, c: 'recall', t: [1],
}));
add('plasma-num', num({
  stem: `An adult has ${BLOOD.litres} litres of blood, of which ${BLOOD.plasmaPct} percent is plasma. What volume of plasma, in litres, does the adult have?`,
  value: BLOOD.plasma, unit: 'L',
  sol: r`$${BLOOD.litres} \times \dfrac{${BLOOD.plasmaPct}}{100} = ${BLOOD.plasma}$ litres of plasma.`,
  scheme: [[`${BLOOD.plasma} litres`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === 2.75 || 'value');
add('diapedesis-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the squeezing of white blood cells through the walls of capillaries into the surrounding tissue.',
  model: '**Diapedesis.**',
  sol: 'Diapedesis.', scheme: [['Diapedesis', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('odd-wbc', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Neutrophil, Platelet, Lymphocyte, Monocyte.',
  model: '**Platelet**; the others are **white blood cells (leucocytes)**.',
  sol: 'Platelets are cell fragments that help clotting.', scheme: [['Odd one and category', 1]],
  d: 2, c: 'analysis', t: [1],
}));
add('reason-eosin', short({
  marks: 1, wl: null,
  stem: 'Give reason: a doctor finds a high eosinophil count in a child who has hay fever.',
  model: 'Eosinophils **increase in allergic reactions** (and in worm infections); hay fever is an **allergy**.',
  sol: 'Eosinophils rise in allergies.', scheme: [['Eosinophils rise in allergy', 1]],
  d: 2, c: 'application', t: [1],
}));
add('plasma-func-short', short({
  marks: 2,
  stem: 'Name two substances, other than water, carried by blood plasma, and state where each is carried to.',
  model: '1. **Digested food** such as glucose and amino acids, carried from the **small intestine** to all body cells.\n2. **Urea**, carried from the **liver** to the **kidneys** for removal (also hormones, carbon dioxide, plasma proteins).',
  sol: 'Glucose to cells; urea to kidneys.',
  scheme: [['First substance with destination', 1], ['Second substance with destination', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('rbc-wbc-short', short({
  marks: 2,
  stem: 'State two differences between red blood cells and white blood cells in humans.',
  model: '1. Red cells have **no nucleus** when mature; white cells **have a nucleus**.\n2. Red cells contain **haemoglobin** and carry oxygen; white cells have no haemoglobin and **defend** the body (they are also far fewer in number).',
  sol: 'Nucleus; haemoglobin and function; number.',
  scheme: [['First difference', 1], ['Second difference', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('smear-draw', short({
  marks: 3, wl: null,
  stem: 'Draw a neat diagram to show a red blood cell, a neutrophil, a lymphocyte and some platelets as seen under a microscope. Label each.',
  model: 'A **red blood cell** as a round disc with a **pale centre** and no nucleus; a **neutrophil** with a nucleus of **three to five lobes** and fine granules; a **lymphocyte** almost filled by a **large round nucleus**; **platelets** as small fragments with no nucleus.',
  sol: 'Four labelled components.',
  scheme: [['Red cell without nucleus, pale centre', 1], ['Neutrophil with lobed nucleus and lymphocyte with round nucleus', 1], ['Platelets and all labels', 1]],
  d: 3, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 efficiency of the red blood cell
add('no-nucleus-mcq', mcq({
  stem: 'The absence of a nucleus in a mature mammalian red blood cell is an advantage because it',
  right: 'leaves more room for haemoglobin', wrong: ['lets the cell divide faster', 'makes the cell live longer', 'lets the cell make its own proteins'],
  sol: 'Without a nucleus, the space is filled with haemoglobin, so each cell carries more oxygen — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('no-mito-mcq', mcq({
  stem: 'Mature mammalian red blood cells have no mitochondria. As a result they',
  right: 'do not use up the oxygen they carry, as they respire anaerobically', wrong: ['cannot carry any oxygen at all', 'release extra oxygen into the plasma', 'die within a few hours of forming'],
  sol: 'With no mitochondria, red cells respire anaerobically and deliver all the oxygen they carry — option (@K).',
  d: 3, c: 'understanding', t: [2],
}));
add('biconcave-mcq', mcq({
  stem: 'The biconcave shape of a red blood cell helps it mainly by',
  right: 'giving a large surface area for taking up oxygen', wrong: ['making it heavier, so it flows faster', 'storing extra iron in the centre', 'allowing it to divide easily'],
  sol: 'A disc hollowed on both faces has a large surface for its volume and a thin centre, so oxygen diffuses in quickly — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('altitude-mcq', mcq({
  stem: 'Deepak moves from Chennai to Leh, a town about 3500 metres above sea level. After some weeks his red blood cell count has risen, because',
  right: 'the air there holds less oxygen, so his body makes more red cells to carry enough of it', wrong: ['the cold destroys his white cells', 'his platelets turn into red cells', 'his plasma volume falls to zero'],
  sol: 'At high altitude each breath brings in less oxygen; the bone marrow makes more red cells to compensate — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('rbc-ar', ar({
  a: 'A mammalian red blood cell can carry more oxygen than it could if it had a nucleus.',
  r: 'The absence of a nucleus leaves more space for haemoglobin.',
  key: 'c',
  sol: 'Both are true, and the extra space for haemoglobin is exactly why the cell carries more oxygen — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('replace-num', num({
  stem: `A red blood cell lives for about ${RBC_LIFE} days. Assuming the number of red cells stays steady, roughly what percentage of them must be replaced every day? Give the answer to two decimal places.`,
  value: replacedPerDayPct, tol: 0.01, unit: '%',
  sol: r`One-${RBC_LIFE}th of the cells is replaced each day: $\dfrac{1}{${RBC_LIFE}} \times 100 \approx ${replacedPerDayPct}$ percent.`,
  scheme: [[`About ${replacedPerDayPct} percent`, 1]],
  d: 3, c: 'application', t: [2],
}), (q) => q.answer.value === 0.83 || 'value');
add('reason-rbc', short({
  marks: 1, wl: null,
  stem: 'Give reason: mature red blood cells in humans cannot divide.',
  model: 'They have **no nucleus**, so they cannot copy their genetic material and divide.',
  sol: 'No nucleus.', scheme: [['No nucleus', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('rbc-eff-short', short({
  marks: 2,
  stem: 'Explain two features that make a mammalian red blood cell efficient at carrying oxygen.',
  model: '1. It has **no nucleus**, so more of its space is filled with **haemoglobin**.\n2. It is a **biconcave disc**, giving a **large surface area** and a thin centre for quick diffusion of oxygen (it also has no mitochondria, so it uses none of the oxygen).',
  sol: 'No nucleus; biconcave shape; no mitochondria.',
  scheme: [['First feature explained', 1], ['Second feature explained', 1]],
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 blood coagulation
add('clot-order-mcq', mcq({
  stem: 'Which sequence of events in blood clotting is correct?',
  right: 'Thromboplastin released → prothrombin changed to thrombin → fibrinogen changed to fibrin', wrong: ['Fibrin formed → thrombin changed to prothrombin → thromboplastin released', 'Prothrombin changed to fibrinogen → thrombin released → fibrin dissolved', 'Fibrinogen changed to thromboplastin → fibrin changed to thrombin → clot dissolves'],
  sol: 'Thromboplastin, with calcium ions, turns prothrombin into thrombin; thrombin turns soluble fibrinogen into insoluble fibrin — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('vitk-mcq', mcq({
  stem: 'Which vitamin does the liver need to make prothrombin?',
  right: 'Vitamin K', wrong: ['Vitamin A', 'Vitamin C', 'Vitamin D'],
  sol: 'Vitamin K is needed for the synthesis of prothrombin; its lack delays clotting — option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('citrate-mcq', mcq({
  stem: 'A blood bank adds sodium citrate, which removes calcium ions, to every bag of donated blood. This',
  right: 'stops the blood from clotting in the bag', wrong: ['makes the blood clot faster', 'kills the white blood cells', 'changes the blood group of the donor'],
  sol: 'Calcium ions are needed to turn prothrombin into thrombin, so without them the blood stays liquid — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('clot-ar', ar({
  a: 'Blood does not normally clot inside healthy blood vessels.',
  r: 'Fibrinogen is absent from the plasma of circulating blood.',
  key: 'a',
  sol: 'The assertion is true (the smooth lining releases no thromboplastin, and heparin prevents clotting). The reason is false: fibrinogen is always present in plasma — option (a).',
  d: 3, c: 'analysis', t: [3],
}));
add('platelet-ar', ar({
  a: 'Platelets help in the clotting of blood.',
  r: 'Platelets are formed as fragments of large cells in the bone marrow.',
  key: 'd',
  sol: 'Both are true, but where platelets come from does not explain their role, which is to release thromboplastin at a wound — option (d).',
  d: 2, c: 'analysis', t: [3],
}));
add('fibrin-fill', fill({
  stem: 'The insoluble protein threads that form the mesh of a blood clot are called ______.',
  acc: [['fibrin']],
  sol: 'Fibrin.',
  d: 1, c: 'recall', t: [3],
}));
add('thrombo-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the substance released by platelets and damaged tissue at a wound that starts the clotting of blood.',
  model: '**Thromboplastin** (thrombokinase).',
  sol: 'Thromboplastin.', scheme: [['Thromboplastin / thrombokinase', 1]],
  d: 2, c: 'recall', t: [3],
}));
add('serum-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the pale yellow fluid that oozes out as a blood clot shrinks.',
  model: '**Serum.**',
  sol: 'Serum.', scheme: [['Serum', 1]],
  d: 2, c: 'recall', t: [3],
}));
add('odd-clot', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Thrombin, Heparin, Fibrin, Thromboplastin.',
  model: '**Heparin**; the others **take part in blood clotting** (heparin prevents it).',
  sol: 'Heparin is an anticoagulant.', scheme: [['Odd one and category', 1]],
  d: 3, c: 'analysis', t: [3],
}));
add('clot-short', short({
  marks: 3,
  stem: 'Outline the steps by which blood clots at a cut.',
  model: '1. Injured tissue and **platelets** release **thromboplastin**.\n2. Thromboplastin, with **calcium ions**, converts **prothrombin** into **thrombin**.\n3. Thrombin converts soluble **fibrinogen** into insoluble **fibrin** threads, which form a mesh that **traps blood cells**, forming the clot.',
  sol: 'Thromboplastin; thrombin; fibrin mesh.',
  scheme: [['Thromboplastin released', 1], ['Prothrombin to thrombin with calcium', 1], ['Fibrinogen to fibrin mesh trapping cells', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 tissue fluid, lymph, spleen, tonsils
add('tissue-fluid-mcq', mcq({
  stem: 'Tissue fluid differs from blood plasma in that it',
  right: 'has far fewer proteins and no red blood cells', wrong: ['has more red blood cells', 'contains no water', 'is found only inside arteries'],
  sol: 'Large plasma proteins and red cells cannot leak through capillary walls, so tissue fluid lacks them — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('lacteal-mcq', mcq({
  stem: 'After a meal rich in butter, most of the digested fat is absorbed in the small intestine into the',
  right: 'lacteals, the lymph vessels of the villi', wrong: ['red blood cells', 'arteries of the stomach', 'tonsils'],
  sol: 'Fatty acids and glycerol pass into the lacteals and reach the blood through the lymph — option (@K).',
  d: 2, c: 'recall', t: [4],
}));
add('node-mcq', mcq({
  stem: 'During a throat infection, small lumps under the jaw become swollen and tender. They swell because they',
  right: 'trap germs from the lymph and make more lymphocytes', wrong: ['store extra red blood cells', 'produce extra platelets', 'fill with clotted blood'],
  sol: 'Lymph nodes filter germs out of the lymph and multiply lymphocytes, so they enlarge — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('spleen-mcq', mcq({
  stem: 'Which organ is called the graveyard of red blood cells?',
  right: 'Spleen', wrong: ['Tonsil', 'Kidney', 'Bone marrow'],
  sol: 'The spleen breaks down worn-out red blood cells — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('oedema-mcq', mcq({
  stem: 'In filariasis, worms block the lymph vessels of a leg, and the leg swells badly. This happens because',
  right: 'tissue fluid cannot drain away as lymph', wrong: ['red blood cells collect under the skin', 'the arteries of the leg burst', 'the bones of the leg grow larger'],
  sol: 'Excess tissue fluid normally drains into lymph vessels; when they are blocked it builds up and the leg swells — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('exercise-mcq', mcq({
  stem: 'During a long run, the flow of lymph in Gita\'s legs increases. The main reason is that',
  right: 'her contracting leg muscles squeeze the lymph vessels, and valves keep the lymph moving towards the heart', wrong: ['the lymph has its own heart, which beats faster during exercise', 'her lymph vessels change into arteries', 'her lymph nodes pump the lymph downwards'],
  sol: 'Lymph has no pump; muscle contractions squeeze the vessels and valves prevent backflow — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('lymph-ar', ar({
  a: 'Lymph flows in one direction only, towards the heart.',
  r: 'Lymph vessels have valves.',
  key: 'c',
  sol: 'Both are true, and the valves, which stop backflow, explain the one-way flow — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('spleen-tf', tf({
  stem: 'The spleen stores some blood and releases it into circulation when the body loses blood.',
  key: 't',
  sol: 'True. The spleen acts as a blood reservoir, besides breaking down old red cells and making lymphocytes.',
  d: 2, c: 'understanding', t: [4],
}));
add('odd-lymph', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Spleen, Tonsils, Lymph nodes, Liver.',
  model: '**Liver**; the others are **lymphoid organs** (parts of the lymphatic system).',
  sol: 'The liver is a digestive gland.', scheme: [['Odd one and category', 1]],
  d: 2, c: 'analysis', t: [4],
}));
add('reason-valves', short({
  marks: 1, wl: null,
  stem: 'Give reason: lymph vessels contain many valves.',
  model: 'The valves **prevent the backflow** of lymph, so it moves **one way, towards the heart**, although there is no pump.',
  sol: 'Prevent backflow.', scheme: [['Prevent backflow; one-way flow', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('lymph-plasma-short', short({
  marks: 2,
  stem: 'State two differences between blood and lymph.',
  model: '1. Blood contains **red blood cells** and is red; lymph has **no red cells** and is colourless or pale yellow.\n2. Blood has **more proteins**; lymph has **fewer proteins** and many **lymphocytes**, and it flows only towards the heart.',
  sol: 'Red cells; proteins; direction.',
  scheme: [['First difference', 1], ['Second difference', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('lymph-func-short', short({
  marks: 3,
  stem: 'State three functions of the lymphatic system.',
  model: '1. It **returns excess tissue fluid** to the blood, so the tissues do not swell.\n2. Its **lacteals absorb digested fats** from the villi of the small intestine.\n3. Its **lymph nodes** filter out germs and make **lymphocytes**, which defend the body.',
  sol: 'Drainage; fat absorption; defence.',
  scheme: [['Returns tissue fluid', 1], ['Absorbs fats', 1], ['Defence by lymph nodes', 1]],
  d: 2, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- t05 ABO blood groups and the Rh factor
add('universal-donor-mcq', mcq({
  stem: 'The blood group whose red cells carry neither antigen A nor antigen B, and which is called the universal donor, is',
  right: 'O', wrong: ['A', 'B', 'AB'],
  sol: 'Group O red cells carry no A or B antigen, so the recipient\'s antibodies cannot clump them — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('ab-recipient-mcq', mcq({
  stem: 'A person of blood group AB can receive red cells of any ABO group because the plasma of a group AB person',
  right: 'has neither anti-A nor anti-B antibodies', wrong: ['has both anti-A and anti-B antibodies', 'has no red blood cells', 'destroys all donated antigens'],
  sol: `With no anti-A or anti-B in the plasma, nothing clumps the donated cells; AB can receive from ${donorsFor('AB').join(', ')} — option (@K).`,
  d: 2, c: 'understanding', t: [5],
}));
add('antibodies-b-mcq', mcq({
  stem: 'The plasma of a person with blood group B contains',
  right: `${antibodies('B').join(' and ')} antibodies only`, wrong: ['anti-B antibodies only', 'both anti-A and anti-B antibodies', 'no antibodies of the ABO system'],
  sol: `A person never carries antibodies against his own antigen: group B has antigen B and ${antibodies('B').join(', ')} — option (@K).`,
  d: 2, c: 'application', t: [5],
}));
{
  const opts = [['O', '-'], ['O', '+'], ['A', '+'], ['B', '-']];
  const ok = opts.filter(([g, rh]) => canGiveRh(g, rh, 'A', '-')).map(([g, rh]) => `${g} Rh${rh === '+' ? '-positive' : '-negative'}`);
  const bad = opts.filter(([g, rh]) => !canGiveRh(g, rh, 'A', '-')).map(([g, rh]) => `${g} Rh${rh === '+' ? '-positive' : '-negative'}`);
  add('rh-donor-mcq', mcq({
    stem: 'Ravi is blood group A, Rh-negative. Which donor\'s blood is safe for him?',
    right: ok[0], wrong: bad,
    sol: 'He needs red cells with no B antigen (group A or O) and no Rh antigen (Rh-negative) — option (@K).',
    d: 3, c: 'application', t: [5],
  }), () => (ok.length === 1 && bad.length === 3) || 'options');
}
add('rh-baby-mcq', mcq({
  stem: 'Rh incompatibility can harm an unborn baby when',
  right: 'an Rh-negative mother carries an Rh-positive baby in a later pregnancy', wrong: ['an Rh-positive mother carries an Rh-negative baby', 'both parents are Rh-negative', 'the mother and baby are both Rh-positive'],
  sol: 'The Rh-negative mother can make anti-Rh antibodies after her first Rh-positive baby; in a later pregnancy they attack the baby\'s red cells — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('donor-ar', ar({
  a: 'A person of blood group O is a universal recipient.',
  r: 'The red cells of group O carry neither antigen A nor antigen B.',
  key: 'b',
  sol: 'The assertion is false: group O plasma has both anti-A and anti-B, so O can receive only O; O is the universal donor. The reason is true — option (b).',
  d: 3, c: 'analysis', t: [5],
}));
add('rh-ar', ar({
  a: 'The first Rh-positive baby of an Rh-negative mother is usually born healthy.',
  r: 'The mother makes anti-Rh antibodies mainly after the baby\'s blood mixes with hers at birth.',
  key: 'c',
  sol: 'Both are true, and antibodies forming only at or after the first birth explain why the first baby escapes harm — option (c).',
  d: 3, c: 'analysis', t: [5],
}));
add('rh-tf', tf({
  stem: 'An Rh-negative person can safely receive Rh-positive blood again and again.',
  key: 'f',
  sol: 'False. The first transfusion makes the person form anti-Rh antibodies; a later one would make the donated cells clump.',
  d: 2, c: 'understanding', t: [5],
}));
add('agglut-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the clumping together of red blood cells when blood of an unsuitable group is mixed with plasma.',
  model: '**Agglutination.**',
  sol: 'Agglutination.', scheme: [['Agglutination', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('reason-o', short({
  marks: 1, wl: null,
  stem: 'Give reason: blood of group O can be given to a patient of any ABO group in an emergency.',
  model: 'Group O red cells carry **no A or B antigens**, so the patient\'s **antibodies cannot clump** them.',
  sol: 'No antigens.', scheme: [['No A or B antigen, so no agglutination', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('transfusion-short', short({
  marks: 2,
  stem: `Sameer has blood group A. Can he safely receive red cells from a group B donor? Explain.`,
  model: `**No.** The donor's red cells carry **antigen B**, and Sameer's plasma contains **${antibodies('A').join(' and ')} antibodies**. These would **clump (agglutinate)** the donated cells, blocking small vessels.`,
  sol: 'No: antigen B meets anti-B.',
  scheme: [['No', 1], ['Antigen B meets anti-B, causing agglutination', 1]],
  d: 3, c: 'application', t: [5],
}), () => canGive('B', 'A') === false || 'calc');
add('ab-donor-short', short({
  marks: 2,
  stem: 'Kunal (group AB, Rh-positive) offers to give blood to his friend, who is group O, Rh-positive. Should the blood bank accept the offer? Explain.',
  model: `**No.** Kunal's red cells carry **both antigens A and B**. His friend's group O plasma contains **${antibodies('O').join(' and ')}** antibodies, which would **clump** the donated cells. Only group O blood suits his friend.`,
  sol: 'No: antigens A and B meet anti-A and anti-B.',
  scheme: [['No', 1], ['Reason: antigens A and B meet anti-A and anti-B', 1]],
  d: 2, c: 'application', t: [5],
}), () => canGive('AB', 'O') === false || 'calc');
add('rh-short', short({
  marks: 3,
  stem: 'Explain how Rh incompatibility can harm a second baby, and how doctors prevent it.',
  model: 'An **Rh-negative mother** with an **Rh-positive baby** forms **anti-Rh antibodies** when the baby\'s blood mixes with hers at birth. In a **second Rh-positive pregnancy**, these antibodies cross the placenta and **destroy the baby\'s red cells**, causing anaemia and jaundice. Doctors give the mother an **anti-Rh injection** soon after the first delivery so that she does not form these antibodies.',
  sol: 'Antibodies after first birth; destroy second baby\'s red cells; anti-Rh injection.',
  scheme: [['Antibodies formed after the first Rh-positive baby', 1], ['They destroy the red cells of the second baby', 1], ['Anti-Rh injection after the first delivery', 1]],
  d: 3, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- 5-mark Question 2 style items
add('blood-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [plasma, serum, nucleus, haemoglobin, 120, 12, marrow, lymph]\n\nThe liquid part of blood is called (a) ______. Red blood cells are made in the red bone (b) ______. A mature red cell has no (c) ______ and is packed with (d) ______, which carries oxygen. Each red cell lives for about (e) ______ days.',
  acc: [['plasma'], ['marrow', 'bone marrow'], ['nucleus'], ['haemoglobin', 'hemoglobin'], ['120']],
  sol: '(a) plasma; (b) marrow; (c) nucleus; (d) haemoglobin; (e) 120.',
  d: 2, c: 'understanding', t: [1, 2],
}));
add('clotgroup-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [thrombin, fibrin, calcium, heparin, AB, O, Rh, sodium]\n\nAt a cut, thromboplastin acts with (a) ______ ions to change prothrombin into (b) ______, which changes fibrinogen into threads of (c) ______. A patient of group (d) ______ can receive red cells of any ABO group. An unborn baby may be harmed when it is (e) ______-positive and its mother is negative for the same factor.',
  acc: [['calcium'], ['thrombin'], ['fibrin'], ['AB'], ['Rh']],
  sol: '(a) calcium; (b) thrombin; (c) fibrin; (d) AB; (e) Rh.',
  d: 2, c: 'understanding', t: [3, 5],
}));
add('cells-match5', match({
  marks: 5,
  stem: 'Study the diagram of blood components and match each lettered component with its function.',
  pairs: [
    ['A', 'Carries oxygen as oxyhaemoglobin'],
    ['B', 'Most numerous white cell; engulfs bacteria at a wound'],
    ['C', 'Produces antibodies'],
    ['D', 'Leaves the blood and becomes a large scavenger cell in the tissues'],
    ['E', 'Releases thromboplastin to start clotting'],
  ],
  order: [1, 4, 0, 3, 2],
  sol: 'A red blood cell; B neutrophil; C lymphocyte; D monocyte; E platelets.',
  d: 2, c: 'application', t: [1],
  assets: [cellsFig],
}));

// ---------------------------------------------------------------- case-based (10 marks, Section B style)
add('report-case', mk.case({
  passage: `Anil, aged 16, has been feeling tired and breathless and has had a fever for three days. Part of his blood report is shown.\n\n| Test | Anil | Normal range |\n|---|---|---|\n| Red blood cells (million per cubic mm) | ${REPORT.rbc} | ${REPORT.rbcRange[0]} to ${REPORT.rbcRange[1]} |\n| Haemoglobin (g per 100 mL) | ${REPORT.hb} | ${REPORT.hbRange[0]} to ${REPORT.hbRange[1]} |\n| White blood cells (per cubic mm) | ${REPORT.wbc} | ${REPORT.wbcRange[0]} to ${REPORT.wbcRange[1]} |\n| Platelets (lakh per cubic mm) | ${REPORT.plt} | ${REPORT.pltRange[0]} to ${REPORT.pltRange[1]} |`,
  d: 3, c: 'analysis',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Which value in the report is above the normal range?', model: 'The **white blood cell** count.', sol: 'White cells.', scheme: [['White blood cells', 1]], d: 1, c: 'application', t: [1] })),
    part('b', num({ marks: 2, stem: 'By how many million per cubic mm is Anil\'s red cell count below the lower limit of the normal range?', value: REPORT.rbcShort, sol: r`$${REPORT.rbcRange[0]} - ${REPORT.rbc} = ${REPORT.rbcShort}$ million per cubic mm below the lower limit.`, scheme: [['Subtracts from the lower limit', 1], [`${REPORT.rbcShort} million`, 1]], d: 2, c: 'application', t: [1] })),
    part('c', short({ marks: 2, stem: 'Name the condition suggested by his red cell and haemoglobin values, and explain why it makes him tired and breathless.', model: '**Anaemia.** With too few red cells and too little **haemoglobin**, his blood **carries less oxygen** to the tissues, so the cells release less energy; he tires easily and breathes faster to make up.', sol: 'Anaemia; less oxygen.', scheme: [['Anaemia', 1], ['Less oxygen carried, less energy', 1]], d: 2, c: 'understanding', t: [1, 2] })),
    part('d', short({ marks: 2, stem: 'Suggest why his white cell count is high and state two ways in which white cells protect the body.', model: 'His fever suggests an **infection**; white cells **multiply** to fight it. **Neutrophils and monocytes engulf germs** (phagocytosis), and **lymphocytes make antibodies** that destroy germs and their toxins.', sol: 'Infection; phagocytosis; antibodies.', scheme: [['Infection', 1], ['Two ways of protection', 1]], d: 3, c: 'analysis', t: [1] })),
    part('e', short({ marks: 3, stem: 'Explain three features of a normal mammalian red blood cell that make it an efficient oxygen carrier.', model: '1. **No nucleus**: more space for **haemoglobin**, so more oxygen per cell.\n2. **No mitochondria**: the cell respires anaerobically and **does not use up** the oxygen it carries.\n3. **Biconcave disc**: a **large surface area** and thin centre for fast diffusion, and it is flexible enough to pass through narrow capillaries.', sol: 'No nucleus; no mitochondria; biconcave.', scheme: [['First feature', 1], ['Second feature', 1], ['Third feature', 1]], d: 2, c: 'understanding', t: [2] }), [
      short({ marks: 3, wl: null, stem: 'State where red blood cells are made in an adult like Anil, where worn-out ones are destroyed, and how long a red blood cell lives.', model: 'They are made in the **red bone marrow**; worn-out cells are destroyed mainly in the **spleen** (and liver); each lives for about **120 days**.', sol: 'Bone marrow; spleen; 120 days.', scheme: [['Red bone marrow', 1], ['Spleen (and liver)', 1], ['About 120 days', 1]], d: 1, c: 'recall', t: [1, 4] }),
    ]),
  ],
}));
add('smear-case', mk.case({
  passage: `A laboratory student counted the white blood cells in a stained blood smear and recorded the kinds she saw.\n\n| Kind of white cell | Number counted |\n|---|---|\n| Neutrophils | ${DIFF.neutrophils} |\n| Lymphocytes | ${DIFF.lymphocytes} |\n| Monocytes | ${DIFF.monocytes} |\n| Eosinophils | ${DIFF.eosinophils} |\n| Basophils | ${DIFF.basophils} |`,
  d: 3, c: 'application',
  children: [
    part('a', num({ marks: 2, stem: 'What percentage of the white cells counted were neutrophils?', value: DIFF.pct.neutrophils, unit: '%', sol: r`Total $= ${DIFF.neutrophils} + ${DIFF.lymphocytes} + ${DIFF.monocytes} + ${DIFF.eosinophils} + ${DIFF.basophils} = ${DIFF.total}$; $\dfrac{${DIFF.neutrophils}}{${DIFF.total}} \times 100 = ${DIFF.pct.neutrophils}$ percent.`, scheme: [['Total counted', 1], [`${DIFF.pct.neutrophils} percent`, 1]], d: 2, c: 'application', t: [1] })),
    part('b', short({ marks: 1, wl: null, stem: 'Which kind of white cell was the least common in her count?', model: '**Basophils.**', sol: 'Basophils.', scheme: [['Basophils', 1]], d: 1, c: 'application', t: [1] })),
    part('c', num({ stem: 'What percentage of the cells counted were the cells that make antibodies?', value: DIFF.pct.lymphocytes, unit: '%', sol: r`Lymphocytes make antibodies: $\dfrac{${DIFF.lymphocytes}}{${DIFF.total}} \times 100 = ${DIFF.pct.lymphocytes}$ percent.`, scheme: [[`${DIFF.pct.lymphocytes} percent (lymphocytes)`, 1]], d: 2, c: 'application', t: [1] })),
    part('d', short({ marks: 3, stem: 'How could she tell a neutrophil, a lymphocyte and a monocyte apart by their nuclei?', model: 'A **neutrophil** has a nucleus of **three to five lobes** joined by thin strands. A **lymphocyte** is small and almost filled by a **large round nucleus**. A **monocyte** is the **largest** white cell and has a **kidney-shaped (bean-shaped) nucleus**.', sol: 'Lobed; round; kidney-shaped.', scheme: [['Neutrophil: lobed', 1], ['Lymphocyte: large round', 1], ['Monocyte: kidney-shaped', 1]], d: 2, c: 'understanding', t: [1] })),
    part('e', short({ marks: 3, stem: 'Neutrophils were the most common cells. Explain how they protect the body when bacteria enter a cut.', model: 'Neutrophils squeeze out of the capillaries into the wound (**diapedesis**). They move like an amoeba towards the bacteria, **surround and engulf** them (**phagocytosis**) and **digest** them with enzymes. Dead neutrophils and germs collect as **pus**.', sol: 'Diapedesis, phagocytosis.', scheme: [['Diapedesis', 1], ['Engulf (phagocytosis)', 1], ['Digest; pus', 1]], d: 3, c: 'understanding', t: [1] }), [
      short({ marks: 3, stem: 'Name the white cells that rise in allergies and those that release histamine, and state one feature of the nucleus of each.', model: '**Eosinophils** rise in number during allergies such as hay fever and in worm infections; their nucleus has **two lobes** and the granules stain red. **Basophils** release **histamine** (and heparin); their nucleus is **S-shaped** (lobed) and is often hidden by dark granules.', sol: 'Eosinophils, basophils.', scheme: [['Eosinophils with nucleus', 1], ['Basophils with nucleus', 1], ['Correct roles', 1]], d: 3, c: 'understanding', t: [1] }),
    ]),
  ],
}));
add('cut-case', mk.case({
  passage: 'Meena cut her finger while chopping vegetables. Blood flowed at first, but within about five minutes a dark red clot had sealed the cut. Later a little pale yellow fluid oozed from the edge of the clot. Her grandfather, who takes tablets that slow clotting, bleeds for much longer from small cuts.',
  d: 3, c: 'application',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name the insoluble protein that forms the threads of Meena\'s clot.', model: '**Fibrin.**', sol: 'Fibrin.', scheme: [['Fibrin', 1]], d: 1, c: 'recall', t: [3] })),
    part('b', short({ marks: 3, stem: 'Outline the steps by which the clot formed.', model: 'Platelets and the damaged tissue release **thromboplastin**. With **calcium ions**, it converts **prothrombin** in the plasma into **thrombin**. Thrombin converts soluble **fibrinogen** into insoluble **fibrin** threads, which form a mesh that **traps red cells**: this is the clot.', sol: 'Thromboplastin, thrombin, fibrin.', scheme: [['Thromboplastin', 1], ['Prothrombin to thrombin with calcium', 1], ['Fibrinogen to fibrin, mesh traps cells', 1]], d: 2, c: 'understanding', t: [3] })),
    part('c', short({ marks: 2, stem: 'Name the pale yellow fluid and state how it differs from plasma.', model: 'It is **serum**. Serum is plasma **without fibrinogen** and the other clotting factors, which were used up in the clot, so serum **cannot clot**.', sol: 'Serum lacks fibrinogen.', scheme: [['Serum', 1], ['No fibrinogen, cannot clot', 1]], d: 2, c: 'understanding', t: [3] })),
    part('d', short({ marks: 2, stem: 'Name the vitamin needed for normal clotting and state its role.', model: '**Vitamin K.** The liver needs it to make **prothrombin**; without enough of it, too little thrombin forms and clotting is **delayed**.', sol: 'Vitamin K: prothrombin.', scheme: [['Vitamin K', 1], ['Needed to make prothrombin', 1]], d: 2, c: 'recall', t: [3] })),
    part('e', short({ marks: 2, stem: 'Why does blood not normally clot inside Meena\'s blood vessels?', model: 'The smooth lining of healthy vessels does **not damage platelets**, so **no thromboplastin** is released; the blood also carries **heparin**, which prevents clotting.', sol: 'No thromboplastin; heparin.', scheme: [['No thromboplastin from intact vessels', 1], ['Heparin', 1]], d: 3, c: 'analysis', t: [3] }), [
      short({ marks: 2, stem: 'Suggest why her grandfather is told to take care with knives and to inform his dentist about his tablets.', model: 'His tablets **slow clotting**, so even a small cut or a tooth extraction may **bleed for a long time**. The dentist may need to **adjust the treatment** or be ready to stop the bleeding.', sol: 'Slow clotting; prolonged bleeding.', scheme: [['Clotting slowed, prolonged bleeding', 1], ['Dentist must be prepared', 1]], d: 3, c: 'application', t: [3] }),
    ]),
  ],
}));
add('swelling-case', mk.case({
  passage: 'Sunita had a sore throat and fever. Her doctor felt swollen, tender lumps under her jaw and in her neck and saw that two masses of tissue at the back of her throat were red and enlarged. He explained that these are part of a system of vessels that carries a colourless fluid from the tissues back to the blood.',
  d: 3, c: 'application',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name the swollen lumps under Sunita\'s jaw.', model: '**Lymph nodes** (lymph glands).', sol: 'Lymph nodes.', scheme: [['Lymph nodes', 1]], d: 1, c: 'recall', t: [4] })),
    part('b', short({ marks: 2, stem: 'Why do these lumps swell during an infection?', model: 'Lymph nodes **filter germs** out of the lymph and trap them. During an infection they make **large numbers of lymphocytes** to fight the germs, so they **enlarge** and become tender.', sol: 'Trap germs; make lymphocytes.', scheme: [['Trap germs', 1], ['Make more lymphocytes', 1]], d: 2, c: 'understanding', t: [4] })),
    part('c', short({ marks: 2, stem: 'Name the masses of tissue at the back of her throat and state their function.', model: 'They are the **tonsils**, masses of **lymphoid tissue**. They **trap and destroy germs** entering through the mouth and nose; when overwhelmed by infection they become inflamed (tonsillitis).', sol: 'Tonsils trap germs.', scheme: [['Tonsils', 1], ['Trap and destroy germs', 1]], d: 2, c: 'recall', t: [4] })),
    part('d', short({ marks: 2, stem: 'Explain how the colourless fluid is formed from blood.', model: 'At the arterial end of capillaries, plasma **filters out** (without red cells and large proteins) to form **tissue fluid**, which bathes the cells. Most returns to the capillaries; the **extra drains into lymph capillaries**, where it is called **lymph**.', sol: 'Tissue fluid drains as lymph.', scheme: [['Tissue fluid formed from plasma', 1], ['Excess enters lymph capillaries as lymph', 1]], d: 2, c: 'understanding', t: [4] })),
    part('e', short({ marks: 3, stem: 'State three functions of the spleen, another organ of this system.', model: '1. It **destroys worn-out red blood cells** (the graveyard of red cells).\n2. It **makes lymphocytes** and filters germs from the blood.\n3. It **stores blood** and releases it into circulation after heavy bleeding.', sol: 'Destroys old red cells; lymphocytes; reservoir.', scheme: [['First function', 1], ['Second function', 1], ['Third function', 1]], d: 2, c: 'recall', t: [4] }), [
      short({ marks: 3, stem: 'State three differences between blood and lymph.', model: '1. Blood has **red blood cells** and is red; lymph has **none** and is colourless.\n2. Blood has **more plasma proteins**; lymph has **fewer**.\n3. Blood flows **both away from and back to** the heart in a closed circuit; lymph flows **only towards** the heart.', sol: 'Red cells; proteins; direction.', scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]], d: 2, c: 'understanding', t: [4] }),
    ]),
  ],
}));
add('typing-case', mk.case({
  stem: 'Study the diagram and answer the questions.',
  passage: 'In a school health camp, drops of blood from four students, P, Q, R and S, were each mixed with anti-A serum and with anti-B serum on a glass slide. The diagram shows the results after two minutes.',
  d: 3, c: 'analysis',
  assets: [typingFig],
  children: [
    part('a', short({ marks: 2, stem: 'Write the ABO blood group of each of the four students.', model: '**P: group A** (clumps with anti-A only); **Q: group AB** (clumps with both); **R: group O** (clumps with neither); **S: group B** (clumps with anti-B only).', sol: 'P A; Q AB; R O; S B.', scheme: [['Two groups correct', 1], ['All four correct', 1]], d: 2, c: 'application', t: [5] })),
    part('b', short({ marks: 1, wl: null, stem: 'Which student is a universal donor?', model: '**R** (group O).', sol: 'R.', scheme: [['R', 1]], d: 2, c: 'application', t: [5] })),
    part('c', short({ marks: 2, stem: 'Can S donate red cells to P? Explain.', model: '**No.** S is group **B**, so S\'s red cells carry **antigen B**. P is group **A**, so P\'s plasma has **anti-B antibodies**, which would **clump** the donated cells.', sol: 'No.', scheme: [['No', 1], ['Antigen B meets anti-B', 1]], d: 3, c: 'analysis', t: [5] })),
    part('d', short({ marks: 2, stem: 'Which antibodies are present in the plasma of Q and of R?', model: `**Q (group AB):** ${antibodies('AB').length ? antibodies('AB').join(' and ') : '**no** anti-A or anti-B antibodies'}. **R (group O):** **both ${antibodies('O').join(' and ')}** antibodies.`, sol: 'Q none; R both.', scheme: [['Q: none', 1], ['R: both', 1]], d: 3, c: 'application', t: [5] })),
    part('e', short({ marks: 3, stem: 'Explain why a transfusion of the wrong group of blood can be dangerous.', model: 'The patient\'s **antibodies** react with the **antigens** on the donated red cells and make them **clump (agglutinate)**. The clumps **block small blood vessels** and the cells burst, so tissues are starved of oxygen and the **kidneys** can be damaged; the reaction can be **fatal**.', sol: 'Agglutination blocks vessels.', scheme: [['Antibody meets antigen', 1], ['Agglutination', 1], ['Clumps block vessels; serious harm', 1]], d: 4, c: 'analysis', t: [5] })),
  ],
}), (q) => (canGive('B', 'A') === false && antibodies('AB').length === 0 && antibodies('O').length === 2) || 'calc');
add('rh-case', mk.case({
  passage: 'Priya, who is Rh-negative, is married to Arvind, who is Rh-positive. Their first child, Rh-positive, was born healthy. Within three days of the delivery, the doctor gave Priya an injection and explained that it would protect any future Rh-positive baby. Priya\'s blood group is B.',
  d: 4, c: 'analysis',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'What is the Rh factor?', model: 'A **protein (antigen)** on the surface of the **red blood cells** of Rh-positive people.', sol: 'An antigen on red cells.', scheme: [['Antigen on red cells', 1]], d: 1, c: 'recall', t: [5] })),
    part('b', short({ marks: 2, stem: 'Why was the first baby born healthy?', model: 'The baby\'s blood **does not mix** much with Priya\'s during pregnancy. Priya makes **anti-Rh antibodies** only after the baby\'s Rh-positive cells enter her blood at **birth**, which was too late to harm this baby.', sol: 'Antibodies form at birth.', scheme: [['Little mixing during pregnancy', 1], ['Antibodies form after delivery', 1]], d: 3, c: 'analysis', t: [5] })),
    part('c', short({ marks: 3, stem: 'What could happen to a second Rh-positive baby if Priya had not been given the injection?', model: 'Priya\'s **anti-Rh antibodies** would **cross the placenta** into the baby. They would **destroy the baby\'s red blood cells**, causing severe **anaemia and jaundice**; the baby could be stillborn or die soon after birth (haemolytic disease of the newborn).', sol: 'Antibodies destroy baby\'s red cells.', scheme: [['Antibodies cross the placenta', 1], ['Destroy baby\'s red cells', 1], ['Anaemia, jaundice or death', 1]], d: 3, c: 'analysis', t: [5] })),
    part('d', short({ marks: 1, wl: null, stem: 'What does the injection do?', model: 'It contains **anti-Rh antibodies** that destroy the baby\'s Rh-positive cells in Priya\'s blood, so she **does not make antibodies** of her own.', sol: 'Prevents antibody formation.', scheme: [['Prevents her forming anti-Rh antibodies', 1]], d: 3, c: 'understanding', t: [5] })),
    part('e', short({ marks: 3, stem: 'Years later Priya needs a blood transfusion. From which ABO and Rh groups can she safely receive red cells? Explain.', model: `She can receive **${donorsFor('B').map((g) => `${g} Rh-negative`).join('** or **')}**. Her plasma has **anti-A**, so the donor cells must carry **no antigen A** (group B or O). She is **Rh-negative** and already sensitised, so the donor must also be **Rh-negative**.`, sol: 'B or O, Rh-negative.', scheme: [['B negative and O negative named', 1], ['No antigen A because of anti-A', 1], ['Rh-negative because she is Rh-negative', 1]], d: 4, c: 'analysis', t: [5] })),
  ],
}), () => (donorsFor('B').join(',') === 'B,O' && canGiveRh('O', '-', 'B', '-') && !canGiveRh('B', '+', 'B', '-')) || 'calc');
