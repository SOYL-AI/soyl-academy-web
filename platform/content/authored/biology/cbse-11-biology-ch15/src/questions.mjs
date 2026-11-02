// ch15 Body Fluids and Circulation — question bank. AR keys: b c a d a d.
import { mk, add, r } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { N, HEART, BLOOD, output, rateFromQrs, cycleSec, round, share, donorsFor, isHypertensive } from './calc.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;

// ---------------------------------------------------------------- t01 blood, groups, clotting, lymph
add('plasma-mcq', mcq({
  stem: 'A test tube of blood treated to stop clotting is left standing. A pale straw-coloured fluid forming a little more than half of the column collects at the top. This fluid is',
  right: 'plasma, about 55 percent of blood',
  wrong: ['lymph, the fluid of the lymphatic vessels', 'the formed elements, about 45 percent of blood', 'haemoglobin released from burst red cells'],
  sol: 'The fluid matrix of blood is plasma, a straw-coloured viscous fluid forming about 55 percent of blood — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('fibrinogen-mcq', mcq({
  stem: 'A patient’s liver makes too little of one plasma protein, and even a small cut on her finger keeps oozing blood for a long time. Which protein is most likely to be deficient?',
  right: 'Fibrinogen',
  wrong: ['Albumin', 'Globulin', 'Haemoglobin'],
  sol: 'Fibrinogen is needed for clotting; albumins help osmotic balance and globulins defence, while haemoglobin is in red cells, not plasma — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('rbc-mcq', mcq({
  stem: 'Which statement about the mature red blood cells of most mammals, including humans, is correct?',
  right: 'They have no nucleus and are biconcave in shape.',
  wrong: ['They have a large nucleus and are spherical.', 'They are made in the spleen and destroyed in the bone marrow.', 'They live for about 12 days.'],
  sol: 'Most mammalian RBCs are devoid of a nucleus and biconcave; they are formed in red bone marrow, live about 120 days and are destroyed in the spleen — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('neutro-mcq', mcq({
  stem: 'A laboratory technician identifies and tallies 200 white blood cells in a stained smear from a healthy adult. Which type will she most probably tally most often?',
  right: 'Neutrophils',
  wrong: ['Basophils', 'Monocytes', 'Eosinophils'],
  sol: 'Neutrophils are the most abundant leucocytes, 60–65 percent; basophils are the least, 0.5–1 percent — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('eosin-mcq', mcq({
  stem: 'A boy with hay fever, who sneezes every spring when grasses flower, shows a raised count of one kind of granulocyte. Which leucocyte is it most likely to be?',
  right: 'Eosinophils',
  wrong: ['Lymphocytes', 'Monocytes', 'Erythrocytes'],
  sol: 'Eosinophils (2–3 percent of WBCs) resist infections and are associated with allergic reactions; lymphocytes and monocytes are agranulocytes — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('donor-mcq', mcq({
  stem: 'A patient of blood group B needs a transfusion of red cells. Donors of groups A, B, AB and O are available. Which donors are compatible?',
  right: `Groups ${donorsFor('B').join(' and ')} only`,
  wrong: ['Group B only', 'Groups A, B and AB', 'All four groups'],
  sol: `Group B plasma has anti-A antibodies, so red cells carrying antigen A (groups A and AB) would be attacked. Groups ${donorsFor('B').join(' and ')} carry no antigen A — option (@K).`,
  d: 2, c: 'application', t: [1],
}), (q) => donorsFor('B').join() === 'B,O' || 'donors');
add('rhmother-mcq', mcq({
  stem: 'An Rh-negative woman had an Rh-positive first baby and received no treatment after delivery. She is now carrying a second Rh-positive foetus. What is the main risk?',
  right: 'Her anti-Rh antibodies may enter the foetal blood and destroy its red cells (erythroblastosis foetalis).',
  wrong: ['The foetus will make antibodies that destroy the mother’s red cells during the pregnancy.', 'There is no risk, because Rh antigens and antibodies can never cross the placenta.', 'Her own blood group will change to Rh positive after the second delivery.'],
  sol: 'She was sensitised at the first delivery and now has anti-Rh antibodies, which can leak into the Rh-positive foetus and destroy its RBCs, causing severe anaemia and jaundice — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('calcium-mcq', mcq({
  stem: 'Blood banks add a citrate salt, which binds calcium ions, to the bags in which donated blood is collected. Why?',
  right: 'Calcium ions are needed for coagulation, so removing them keeps the blood from clotting.',
  wrong: ['Calcium ions destroy red blood cells during storage.', 'Citrate supplies energy to the platelets so that they multiply.', 'Calcium ions turn fibrin back into fibrinogen.'],
  sol: 'Calcium ions play a very important role in the clotting cascade; binding them prevents coagulation of stored blood — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('lymph-mcq', mcq({
  stem: 'Compared with blood, lymph lacks',
  right: 'red blood cells and the larger plasma proteins',
  wrong: ['water and the dissolved minerals of plasma', 'lymphocytes and all other white blood cells', 'all dissolved nutrients, such as glucose'],
  sol: 'Tissue fluid forms as water and small water-soluble substances leave the capillaries, leaving larger proteins and most formed elements behind; lymph is colourless but contains lymphocytes — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('megak-fill', fill({
  stem: 'Platelets are cell fragments produced from large cells of the bone marrow called ______.',
  acc: [['megakaryocytes', 'megakaryocyte']],
  sol: 'Megakaryocytes.',
  d: 1, c: 'recall', t: [1],
}));
add('universal-tf', tf({
  stem: 'A person of blood group O is a universal recipient because his plasma has no anti-A or anti-B antibodies.',
  key: 'f',
  sol: 'False. Group O plasma has both anti-A and anti-B; group O is the universal donor because its red cells carry no A or B antigen. Group AB, with no antibodies, is the universal recipient.',
  d: 2, c: 'understanding', t: [1],
}));
add('wbc-match', match({
  stem: 'Match each leucocyte (column I) with its main role (column II).',
  pairs: [
    ['Neutrophils', 'Most abundant phagocytes, destroying foreign organisms'],
    ['Basophils', 'Release histamine, serotonin and heparin'],
    ['Eosinophils', 'Resist infections; linked with allergic reactions'],
    ['Lymphocytes', 'B and T cells responsible for immune responses'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Neutrophils are the main phagocytes; basophils release histamine, serotonin and heparin; eosinophils are linked with allergies; lymphocytes (B and T) carry out immune responses.',
  d: 1, c: 'recall', t: [1],
}));
add('rbc-ar', ar({
  a: 'A healthy adult man has about 5 to 5.5 million red blood cells per cubic millimetre of blood.',
  r: 'In adults, red blood cells are formed in the red bone marrow.',
  key: 'b',
  sol: 'Both statements are true, but the site of formation does not explain the count — option (b).',
  d: 2, c: 'understanding', t: [1],
}));
add('rh-ar', ar({
  a: 'An Rh-negative person who receives Rh-positive blood can produce antibodies against the Rh antigen.',
  r: 'Every Rh-negative person carries anti-Rh antibodies in the plasma from birth.',
  key: 'c',
  sol: 'A is true; R is false, because anti-Rh antibodies form only after exposure to Rh-positive blood — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('plasma-num', num({
  stem: `A large adult has about 6000 mL of blood. If plasma makes up ${BLOOD.plasmaPct} percent of blood, what volume of plasma, in mL, does this person have?`,
  value: N.plasma6000, unit: 'mL',
  sol: r`$6000 \times \dfrac{${BLOOD.plasmaPct}}{100} = ${N.plasma6000}$ mL.`,
  scheme: [[`${N.plasma6000} mL`, 1]],
  d: 1, c: 'application', t: [1],
}), (q) => q.answer.value === 3300 || 'value');
add('lympho-num', num({
  stem: 'A boy’s total leucocyte count is 8000 per cubic millimetre, of which 25 percent are lymphocytes. How many lymphocytes are there per cubic millimetre?',
  value: N.lympho8000,
  sol: r`$8000 \times \dfrac{25}{100} = ${N.lympho8000}$ lymphocytes per cubic millimetre.`,
  scheme: [[`${N.lympho8000}`, 1]],
  d: 1, c: 'application', t: [1],
}), (q) => q.answer.value === share(8000, 25) || 'value');
add('rhclass-num', num({
  stem: `A school blood-donation camp tests 40 students. If the textbook figure of nearly ${BLOOD.rhPositivePct} percent Rh-positive people holds, about how many students are expected to be Rh positive?`,
  value: N.rhClass,
  sol: r`$40 \times \dfrac{${BLOOD.rhPositivePct}}{100} = ${N.rhClass}$ students.`,
  scheme: [[`${N.rhClass}`, 1]],
  d: 1, c: 'application', t: [1],
}), (q) => q.answer.value === 32 || 'value');
add('plasma-short', short({
  marks: 2,
  stem: 'List the main constituents of plasma and state the role of each of its three major proteins.',
  model: 'Plasma is **90–92 percent water** with **6–8 percent proteins**, plus minerals, glucose, amino acids, lipids and inactive clotting factors. **Fibrinogen** is needed for clotting, **globulins** are mainly involved in defence, and **albumins** help maintain osmotic balance.',
  sol: 'Constituents and protein roles.',
  scheme: [['Water, proteins and other solutes', 1], ['Roles of fibrinogen, globulins, albumins', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('lymph-short', short({
  marks: 2,
  stem: 'How is tissue fluid formed, and what are two functions of lymph?',
  model: 'As blood flows through capillaries, **water and small water-soluble substances** move into the spaces between cells, leaving larger proteins and most formed elements behind: this is **tissue fluid**. Lymph returns it to major veins, carries **lymphocytes** for immunity, and transports **absorbed fats** from the lacteals.',
  sol: 'Formation and two functions.',
  scheme: [['Formation of tissue fluid', 1], ['Two functions of lymph', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('abo-short', short({
  marks: 3,
  stem: 'Using antigens and antibodies, explain why a person of group A must not receive red cells from a group B donor, whereas a person of group AB can safely receive them.',
  model: 'Group B red cells carry **antigen B**. A group A person has **anti-B antibodies** in the plasma, which would react with the donated cells and cause them to **clump and be destroyed**, a dangerous transfusion reaction.\n\nA group AB person has **both antigens A and B** on his own cells and therefore **no anti-A or anti-B antibodies**, so nothing attacks the donated group B cells. This is why AB is called the **universal recipient**.',
  sol: 'Antigen–antibody reasoning.',
  scheme: [['Group B cells carry antigen B; group A plasma has anti-B', 1], ['Clumping and destruction of donated cells', 1], ['AB has no antibodies, so safe; universal recipient', 1]],
  d: 2, c: 'application', t: [1],
}));
add('erythro-short', short({
  marks: 3,
  stem: 'An Rh-positive man and an Rh-negative woman are expecting their first child, who is Rh positive. Explain why this first baby is usually unharmed but a second Rh-positive baby may be at risk, and how the risk is prevented.',
  model: 'In the first pregnancy the **placenta keeps the two bloods apart**, so the mother is not exposed to the Rh antigen and the baby is unharmed. At **delivery**, a little Rh-positive foetal blood may enter her circulation and she starts making **anti-Rh antibodies**. In a second Rh-positive pregnancy these can leak into the foetus and destroy its red cells, causing **erythroblastosis foetalis**. Giving the mother **anti-Rh antibodies immediately after the first delivery** prevents this.',
  sol: 'Sensitisation at delivery; prevention.',
  scheme: [['First pregnancy: bloods separated by placenta', 1], ['Sensitisation at delivery; antibodies destroy foetal RBCs later', 1], ['Anti-Rh antibodies to mother after first delivery', 1]],
  d: 3, c: 'application', t: [1],
}));
add('clot-short', short({
  marks: 3,
  stem: 'Describe the sequence of events by which blood clots at the site of an injury.',
  model: 'An injury stimulates **platelets** to release certain factors, and damaged **tissues** release others. These start a **cascade** of linked enzymic reactions among inactive plasma factors, forming the enzyme complex **thrombokinase**. Thrombokinase helps convert inactive **prothrombin** into **thrombin**. Thrombin converts soluble **fibrinogen** into **fibrin** threads, which form a network trapping dead and damaged formed elements: the **clot**. **Calcium ions** are essential throughout.',
  sol: 'Thrombokinase, thrombin, fibrin, calcium ions.',
  scheme: [['Platelet and tissue factors start a cascade forming thrombokinase', 1], ['Prothrombin to thrombin; fibrinogen to fibrin network', 1.5], ['Role of calcium ions', 0.5]],
  d: 2, c: 'understanding', t: [1],
}));
add('blood-long', long({
  stem: 'Describe the composition of human blood, giving the main features, normal counts and functions of each kind of formed element.',
  model: '**Blood** is a special connective tissue of a fluid matrix, plasma, and formed elements.\n\n**Plasma** (about 55 percent) is a straw-coloured, viscous fluid of 90–92 percent water and 6–8 percent proteins: fibrinogen for clotting, globulins for defence and albumins for osmotic balance. It also carries minerals such as sodium, calcium, magnesium, bicarbonate and chloride ions, glucose, amino acids, lipids and inactive clotting factors.\n\n**Formed elements** (about 45 percent):\n- **Erythrocytes**, the most abundant cells, number 5–5.5 million per cubic millimetre. Formed in red bone marrow, they lack a nucleus in most mammals and are biconcave. Their haemoglobin, 12–16 g per 100 mL of blood, transports respiratory gases. They live about 120 days and are destroyed in the spleen.\n- **Leucocytes** (6000–8000 per cubic millimetre) are colourless, nucleated and short-lived. Neutrophils (60–65 percent) and monocytes (6–8 percent) are phagocytic; basophils (0.5–1 percent) secrete histamine, serotonin and heparin; eosinophils (2–3 percent) resist infection and are linked with allergy; lymphocytes (20–25 percent), B and T, give immune responses.\n- **Platelets** (1.5–3.5 lakh per cubic millimetre) are fragments of megakaryocytes that release clotting factors; too few cause bleeding disorders.',
  sol: 'Plasma; RBCs, WBCs, platelets with counts and functions.',
  scheme: [['Plasma and its proteins', 1.5], ['Erythrocytes', 1], ['Leucocytes: types, shares, roles', 1.5], ['Platelets', 1]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [1],
}));
add('groups-long', long({
  stem: 'A hospital must give an emergency transfusion to a road-accident victim whose blood group is not yet known, and later the same hospital treats an Rh-negative pregnant woman. Explain the ABO and Rh systems, why only group O Rh-negative red cells are given before typing, and how Rh incompatibility in pregnancy is handled.',
  model: '**ABO system.** Grouping depends on the presence or absence of antigens A and B on red cells. Plasma has natural antibodies against the absent antigen: group A has anti-B, group B anti-A, group AB neither, and group O both. If donated cells carry an antigen against which the recipient has antibodies, they clump and are destroyed.\n\n**Before typing.** Group O red cells carry neither A nor B antigen, so no recipient’s antibodies can attack them: O is the universal donor. Choosing Rh-negative cells also avoids exposing an Rh-negative victim to the Rh antigen.\n\n**Rh system.** Nearly 80 percent of people carry the Rh antigen (Rh positive). An Rh-negative person forms anti-Rh antibodies only after exposure to Rh-positive blood.\n\n**Pregnancy.** If an Rh-negative mother carries an Rh-positive foetus, the placenta keeps the bloods apart in the first pregnancy, but at delivery a little foetal blood may enter her and she begins making anti-Rh antibodies. In a later Rh-positive pregnancy these can leak into the foetus and destroy its red cells, causing severe anaemia and jaundice, erythroblastosis foetalis. It is prevented by giving the mother anti-Rh antibodies immediately after the first delivery.',
  sol: 'ABO, universal donor, Rh, pregnancy.',
  scheme: [['ABO antigens and antibodies', 1.5], ['Why O Rh-negative cells before typing', 1], ['Rh antigen and sensitisation', 1], ['Erythroblastosis foetalis and prevention', 1.5]],
  wl: [80, 240],
  d: 3, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 circulatory pathways, heart, cycle, ECG
add('open-mcq', mcq({
  stem: 'In which pair of animal groups does blood pumped by the heart flow into open spaces or body cavities called sinuses?',
  right: 'Arthropods and molluscs',
  wrong: ['Annelids and chordates', 'Birds and mammals', 'Fishes and amphibians'],
  sol: 'Arthropods and molluscs have an open circulatory system; annelids and chordates have a closed one — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('chambers-mcq', mcq({
  stem: 'A student dissecting a preserved heart finds two thin-walled atria opening into a single ventricle. The heart most likely came from a',
  right: 'frog',
  wrong: ['rohu fish', 'crocodile', 'pigeon'],
  sol: 'Amphibians and most reptiles have a three-chambered heart; fishes have two chambers and crocodiles, birds and mammals four — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('fish-mcq', mcq({
  stem: 'Why is the circulation of a fish described as single circulation?',
  right: 'Its heart pumps deoxygenated blood to the gills, from where it goes to the body, so blood passes through the heart once per circuit.',
  wrong: ['Its heart has only one chamber, which pumps blood straight to all parts of the body.', 'Its blood flows through open sinuses and never passes through capillaries.', 'Oxygenated and deoxygenated blood mix in its single ventricle before leaving the heart.'],
  sol: 'A fish heart (one atrium, one ventricle) pumps deoxygenated blood to the gills, from where oxygenated blood goes to the body; blood passes through the heart once per circuit — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('mitral-mcq', mcq({
  stem: 'The opening between the left atrium and the left ventricle of the human heart is guarded by the',
  right: 'bicuspid (mitral) valve',
  wrong: ['tricuspid valve', 'semilunar valve of the aorta', 'semilunar valve of the pulmonary artery'],
  sol: 'The bicuspid or mitral valve guards the left atrioventricular opening; the tricuspid guards the right — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('san-mcq', mcq({
  stem: 'Which part of the nodal tissue acts as the pacemaker of the human heart?',
  right: 'Sino-atrial node',
  wrong: ['Atrio-ventricular node', 'Bundle of His', 'Purkinje fibres'],
  sol: `The sino-atrial node generates the maximum number of action potentials, ${HEART.sanRate.join('–')} per minute, and so sets the rhythm — option (@K).`,
  d: 1, c: 'recall', t: [2],
}));
add('diastole-mcq', mcq({
  stem: 'A cardiologist describes the moment when all four chambers of the heart are relaxed. Which combination of valve positions and blood flow is correct at that moment?',
  right: 'Tricuspid and bicuspid valves open, semilunar valves closed; blood flows from the veins through the atria into the ventricles.',
  wrong: ['Tricuspid and bicuspid valves closed, semilunar valves open; blood leaves the ventricles.', 'All four valves closed; no blood moves.', 'All four valves open; blood flows backwards into the atria.'],
  sol: 'In joint diastole the AV valves are open and the semilunar valves closed, so blood from the pulmonary veins and venae cavae flows through the atria into the ventricles — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('lub-mcq', mcq({
  stem: 'A doctor listening with a stethoscope hears the first heart sound, lub. Which event produces it?',
  right: 'Closure of the tricuspid and bicuspid valves at the start of ventricular systole',
  wrong: ['Closure of the semilunar valves at the start of ventricular diastole', 'Opening of the semilunar valves', 'Contraction of the atria'],
  sol: 'Lub is associated with closure of the tricuspid and bicuspid valves as the ventricles contract; dub with closure of the semilunar valves — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('ecgp-mcq', mcq({
  stem: 'In a standard ECG, the P wave represents',
  right: 'electrical excitation (depolarisation) of the atria',
  wrong: ['electrical excitation (depolarisation) of the ventricles', 'return of the ventricles to the normal state (repolarisation)', 'closure of the semilunar valves at the end of systole'],
  sol: 'The P wave is atrial depolarisation, which leads to contraction of both atria — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('qrs-mcq', mcq({
  stem: 'While watching a patient’s ECG monitor, a nurse wants to note the instant at which the ventricles begin to contract. Which part of the trace should she watch?',
  right: 'The QRS complex, shortly after Q',
  wrong: ['The P wave', 'The end of the T wave', 'The flat line between T and the next P'],
  sol: 'The QRS complex is ventricular depolarisation; contraction of the ventricles starts shortly after Q and marks the beginning of systole — option (@K).',
  d: 2, c: 'application', t: [2],
}));
{
  const rate = rateFromQrs(20, 15);
  add('ecgrate-mcq', mcq({
    stem: 'A 15-second ECG strip from a resting student shows 20 QRS complexes. What is his heart rate?',
    right: `${rate} beats per minute`,
    wrong: ['20 beats per minute', '60 beats per minute', '300 beats per minute'],
    sol: r`Each QRS complex is one beat: $\dfrac{20 \times 60}{15} = ${rate}$ beats per minute — option (@K).`,
    d: 2, c: 'application', t: [2],
  }), () => rate === 80 || 'rate');
}
add('auto-ar', ar({
  a: 'A human heart removed for transplantation can go on beating for a while after the nerves to it have been cut.',
  r: 'The nodal tissue of the heart is autoexcitable and can generate action potentials without any external stimulus.',
  key: 'a',
  sol: 'Both are true, and the autoexcitable nodal tissue (the heart is myogenic) explains why the beat continues without nerves — option (a).',
  d: 3, c: 'understanding', t: [2],
}));
add('valve-ar', ar({
  a: 'The semilunar valves lie between the atria and the ventricles of the human heart.',
  r: 'The valves of the heart allow blood to flow in one direction only.',
  key: 'd',
  sol: 'A is false: the semilunar valves guard the openings of the pulmonary artery and aorta; the AV openings have tricuspid and bicuspid valves. R is true — option (d).',
  d: 2, c: 'understanding', t: [2],
}));
add('dub-tf', tf({
  stem: 'The second heart sound, dub, is produced by the closure of the semilunar valves.',
  key: 't',
  sol: 'True. Dub comes from closure of the semilunar valves when the ventricles relax.',
  d: 1, c: 'recall', t: [2],
}));
add('cycle-fill', fill({
  stem: 'When the heart beats 72 times a minute, the duration of one cardiac cycle is about ______ second.',
  acc: [['0.8', '0.8 s', '0.83']],
  sol: r`About 0.8 s: $\dfrac{60}{72} \approx 0.83$.`,
  d: 1, c: 'recall', t: [2],
}), (q) => round(cycleSec(72), 1) === 0.8 || 'cycle');
add('output-num', num({
  stem: 'During light exercise a woman’s heart rate is 75 beats per minute and her stroke volume stays at 70 mL. What is her cardiac output in mL per minute?',
  value: N.out75, unit: 'mL per minute',
  sol: r`Cardiac output is stroke volume times heart rate: $70 \times 75 = ${N.out75}$ mL per minute.`,
  scheme: [['Formula', 0.5], [`${N.out75} mL per minute`, 0.5]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === output(70, 75) || 'value');
add('cycle90-num', num({
  stem: 'After climbing stairs, a teacher’s heart rate rises to 90 beats per minute. How long does one cardiac cycle last now, in seconds? (Two decimal places.)',
  value: N.cycle90, tol: 0.01, unit: 's',
  sol: r`$\dfrac{60}{90} \approx 0.67$ s, shorter than the resting value of about 0.8 s.`,
  scheme: [[`${N.cycle90} s`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 0.67 || 'value');
add('svex-num', num({
  stem: 'At peak effort a trained cyclist’s cardiac output reaches 25 litres per minute at a heart rate of 180 beats per minute. Estimate the stroke volume in mL, to the nearest whole number.',
  value: N.svEx, tol: 1, unit: 'mL',
  sol: r`Stroke volume is cardiac output divided by heart rate: $\dfrac{25000}{180} \approx 138.9$, about ${N.svEx} mL, roughly twice the resting value of about 70 mL.`,
  scheme: [['Divides output by rate in mL', 0.5], [`About ${N.svEx} mL`, 0.5]],
  d: 3, c: 'application', t: [2],
}), (q) => q.answer.value === 139 || 'value');
add('open-short', short({
  marks: 2,
  stem: 'Distinguish between open and closed circulatory systems, naming two animal groups with each.',
  model: 'In an **open** system, blood pumped by the heart passes through large vessels into open spaces or body cavities called **sinuses**, as in **arthropods and molluscs**. In a **closed** system, blood always flows within a closed network of vessels, so flow can be **regulated more precisely**, as in **annelids and chordates**.',
  sol: 'Sinuses versus vessels, with groups.',
  scheme: [['Open: sinuses; arthropods, molluscs', 1], ['Closed: vessels, precise regulation; annelids, chordates', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('nodal-short', short({
  marks: 2,
  stem: 'Trace the path of a cardiac impulse through the nodal tissue, from where it starts to the ventricle walls.',
  model: 'The impulse starts in the **sino-atrial node** in the upper right corner of the right atrium and spreads over the atria to the **atrio-ventricular node**. It passes along the **AV bundle** through the septum into the **right and left bundles**, which branch into **Purkinje fibres** throughout the ventricular muscle.',
  sol: 'SAN → AVN → AV bundle → bundles → Purkinje fibres.',
  scheme: [['SAN to AVN', 1], ['AV bundle, bundles, Purkinje fibres', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('ecg-short', short({
  marks: 2,
  stem: 'A patient’s ECG shows normal P waves, but each is followed by a QRS complex only every second time. Using what each wave represents, explain what is happening in her heart.',
  model: 'The **P wave** shows atrial depolarisation, so her **atria are excited and contract normally**. The **QRS complex** shows ventricular depolarisation, which starts ventricular contraction. As only every second P wave is followed by a QRS, the **impulse is not reaching the ventricles** each time, so they contract at **half the atrial rate**.',
  sol: 'Atria normal; conduction to ventricles failing.',
  scheme: [['P: atria excited normally', 1], ['Missing QRS: ventricles not excited every time', 1]],
  d: 3, c: 'application', t: [2],
}));
add('cycle-short', short({
  marks: 3,
  stem: 'Describe the events of one cardiac cycle, starting from joint diastole.',
  model: 'In **joint diastole** all chambers are relaxed; AV valves are open and blood flows from the veins through the atria into the ventricles. The **SAN** fires and both **atria contract**, adding about 30 percent more blood. The impulse spreads through the AVN and bundle of His and the **ventricles contract**; the **AV valves close (lub)** and the **semilunar valves open**, sending blood into the pulmonary artery and aorta. The ventricles then **relax**, the **semilunar valves close (dub)**, the AV valves reopen and joint diastole returns.',
  sol: 'Joint diastole, atrial systole, ventricular systole, ventricular diastole.',
  scheme: [['Joint diastole and atrial systole', 1], ['Ventricular systole with valve events', 1], ['Ventricular diastole and return to joint diastole', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('heart-long', long({
  stem: 'Describe the structure of the human heart, including its chambers, septa, valves and the nodal tissue that controls its beat.',
  model: '**Position and covering.** The heart, mesodermal in origin, lies in the thoracic cavity between the lungs, slightly tilted to the left, and is about the size of a clenched fist. It is enclosed in the double-walled pericardium containing pericardial fluid.\n\n**Chambers and septa.** It has two small upper atria and two larger lower ventricles with much thicker walls. A thin interatrial septum separates the atria and a thick interventricular septum the ventricles. A thick fibrous atrio-ventricular septum separates the atrium and ventricle of each side.\n\n**Valves.** The right atrioventricular opening is guarded by the tricuspid valve and the left by the bicuspid or mitral valve. Semilunar valves guard the openings of the right ventricle into the pulmonary artery and of the left ventricle into the aorta. Valves let blood flow one way only.\n\n**Nodal tissue.** The sino-atrial node lies in the right upper corner of the right atrium and the atrio-ventricular node in the lower left corner of the right atrium. The AV bundle runs from the AVN through the septum and divides into right and left bundles, which give rise to Purkinje fibres in the ventricle walls; together these form the bundle of His. Nodal muscle is autoexcitable; the SAN produces the most action potentials, 70–75 per minute, and is the pacemaker, so the heart is myogenic.',
  sol: 'Position, chambers, septa, valves, nodal tissue.',
  scheme: [['Position and pericardium', 0.5], ['Chambers and septa', 1.5], ['Valves', 1.5], ['Nodal tissue and pacemaker', 1.5]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [2],
}));
add('cycle-long', long({
  stem: `Explain the cardiac cycle and the origin of the two heart sounds. A healthy person has a heart rate of ${HEART.rate} per minute and a stroke volume of ${HEART.stroke} mL: work out the duration of one cycle and the cardiac output, and state what an ECG would show during each cycle.`,
  model: `**Events.** In joint diastole all chambers are relaxed, the tricuspid and bicuspid valves are open and the semilunar valves closed, and blood flows from the venae cavae and pulmonary veins through the atria into the ventricles. The SAN fires and both atria contract, increasing ventricular filling by about 30 percent. The impulse reaches the ventricles through the AVN, AV bundle and bundle of His, and the ventricles contract while the atria relax. Rising pressure closes the AV valves and then forces open the semilunar valves, so blood enters the pulmonary artery and aorta. When the ventricles relax the semilunar valves close; the AV valves then open and the cycle restarts.\n\n**Sounds.** Lub is produced by closure of the tricuspid and bicuspid valves; dub by closure of the semilunar valves.\n\n**Calculations.** One cycle lasts $\\dfrac{60}{${HEART.rate}} \\approx ${HEART.cycleExact}$ s, about ${HEART.cycle} s. Cardiac output is stroke volume times heart rate: $${HEART.stroke} \\times ${HEART.rate} = ${HEART.output}$ mL per minute, about 5 litres.\n\n**ECG.** Each cycle shows a P wave (atrial depolarisation), a QRS complex (ventricular depolarisation, start of systole) and a T wave (ventricular repolarisation, end of systole).`,
  sol: 'Events, sounds, calculations, ECG.',
  scheme: [['Sequence of events with valves', 2], ['Lub and dub', 1], ['Cycle length and cardiac output', 1], ['ECG waves', 1]],
  wl: [80, 240],
  d: 3, c: 'application', t: [2],
}), (q) => q.answer.model_answer_md.includes(String(HEART.output)) || 'output');

// ---------------------------------------------------------------- t03 double circulation and regulation
add('portal-mcq', mcq({
  stem: 'Blood leaving the small intestine after a meal reaches the liver before it enters the general circulation. The vessel that carries it is the',
  right: 'hepatic portal vein',
  wrong: ['hepatic artery', 'pulmonary vein', 'coronary artery'],
  sol: 'The hepatic portal system links the digestive tract and liver; the hepatic portal vein carries blood from the intestine to the liver — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('medulla-mcq', mcq({
  stem: 'The special neural centre that can moderate the rate and force of the heartbeat through the autonomic nervous system is located in the',
  right: 'medulla oblongata',
  wrong: ['cerebellum', 'cerebral cortex', 'spinal cord at the lumbar region'],
  sol: 'A neural centre in the medulla oblongata moderates cardiac function through the autonomic nervous system — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('symp-mcq', mcq({
  stem: 'A sprinter waits for the starting signal of a race. Increased activity of which nerves would raise both his heart rate and the force of his ventricular contraction?',
  right: 'Sympathetic nerves',
  wrong: ['Parasympathetic nerves', 'Sensory nerves from the skin', 'Nerves of the somatic system to the leg muscles'],
  sol: 'Sympathetic signals increase the rate of the heartbeat and the strength of ventricular contraction, raising cardiac output — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('vagus-mcq', mcq({
  stem: 'A drug copies the effect of parasympathetic nerve signals on the heart. What would it do?',
  right: 'Lower the heart rate and slow the conduction of action potentials, reducing cardiac output',
  wrong: ['Raise the heart rate and the force of ventricular contraction, increasing cardiac output', 'Stop the sino-atrial node permanently, so the heart beats only from the AV node', 'Increase the release of adrenal medullary hormones and so raise cardiac output'],
  sol: 'Parasympathetic signals decrease the heart rate and the speed of conduction of the action potential, and thereby the cardiac output — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('double-mcq', mcq({
  stem: 'A red blood cell leaves the left ventricle and travels round the body until it is back in the left ventricle. Through which heart chambers must it pass on the way?',
  right: 'Right atrium, right ventricle and left atrium',
  wrong: ['Right atrium only', 'Left atrium only', 'Right ventricle and left atrium only'],
  sol: 'Systemic circuit: left ventricle → body → venae cavae → right atrium → right ventricle; pulmonary circuit: → lungs → pulmonary veins → left atrium → left ventricle — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('double-ar', ar({
  a: 'In birds and mammals, oxygenated and deoxygenated blood do not mix in the heart.',
  r: 'Their hearts have two atria and two ventricles, and blood passes through the heart twice in one complete circuit.',
  key: 'a',
  sol: 'Both are true; the complete separation of the two sides in a four-chambered heart, with two circuits, keeps the bloods apart — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('double-short', short({
  marks: 3,
  stem: 'What is meant by double circulation? Trace the two circuits and state one function of each.',
  model: 'Blood passes **through the heart twice** in one complete circuit.\n\n**Pulmonary circulation:** the right ventricle pumps deoxygenated blood into the **pulmonary artery** to the **lungs**; oxygenated blood returns by the **pulmonary veins** to the left atrium. It **oxygenates** the blood.\n\n**Systemic circulation:** the left ventricle pumps oxygenated blood into the **aorta**, through arteries, arterioles and capillaries to the **tissues**; veins and **venae cavae** return it to the right atrium. It **supplies nutrients and oxygen** and removes carbon dioxide.',
  sol: 'Definition, two circuits, functions.',
  scheme: [['Definition', 1], ['Pulmonary circuit and function', 1], ['Systemic circuit and function', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('regulation-short', short({
  marks: 3,
  stem: 'A dog suddenly barks at a girl and her heart starts pounding; some minutes later it slows back to normal. Explain the neural and hormonal control of the heart involved.',
  model: 'The heart beats on its own because the nodal tissue is **autoexcitable (myogenic)**, but a neural centre in the **medulla oblongata** moderates it through the autonomic nervous system. In the fright, **sympathetic nerves** raise the **heart rate** and the **force of ventricular contraction**, and **adrenal medullary hormones** further increase cardiac output. Later, **parasympathetic signals** lower the heart rate and slow conduction, returning output to normal.',
  sol: 'Myogenic base; medulla; sympathetic, hormones, parasympathetic.',
  scheme: [['Myogenic heart moderated by medulla oblongata', 1], ['Sympathetic and adrenal medullary hormones raise output', 1], ['Parasympathetic slows it back', 1]],
  d: 2, c: 'application', t: [3],
}));
add('double-long', long({
  stem: 'Compare the circulation of a fish, a frog and a human, and explain why double circulation is considered more efficient. Describe also the hepatic portal and coronary systems of humans.',
  model: '**Fish.** The heart has two chambers, an atrium and a ventricle. It pumps out deoxygenated blood, which is oxygenated in the gills and supplied to the body; deoxygenated blood returns to the heart. Blood passes through the heart once per circuit: single circulation.\n\n**Frog.** The heart has three chambers, two atria and one ventricle. The left atrium receives oxygenated blood from the lungs and skin and the right atrium deoxygenated blood from the body, but the two mix in the single ventricle, which pumps out mixed blood: incomplete double circulation.\n\n**Human.** The four-chambered heart keeps the two sides apart. In the pulmonary circulation the right ventricle sends deoxygenated blood to the lungs, and the pulmonary veins return oxygenated blood to the left atrium. In the systemic circulation the left ventricle pumps oxygenated blood through the aorta to the tissues, and the venae cavae return deoxygenated blood to the right atrium.\n\n**Why more efficient.** Oxygenated and deoxygenated blood never mix, so tissues receive fully oxygenated blood, and the left ventricle can pump it to the body under high pressure.\n\n**Special systems.** The hepatic portal vein carries blood from the intestine to the liver before it enters the systemic circulation. The coronary system of vessels serves only the circulation of blood to and from the heart muscle.',
  sol: 'Fish, frog, human compared; efficiency; portal and coronary systems.',
  scheme: [['Fish: single circulation', 1], ['Frog: mixing in one ventricle', 1], ['Human: two circuits', 1], ['Why efficient', 1], ['Hepatic portal and coronary systems', 1]],
  wl: [80, 240],
  d: 3, c: 'analysis', t: [2, 3],
}));

// ---------------------------------------------------------------- t04 disorders
add('bpread-mcq', mcq({
  stem: 'Repeated checks over a month show a man’s blood pressure at 146/94 mm Hg. How should these readings be classified?',
  right: 'Hypertension, because the readings are 140/90 mm Hg or higher',
  wrong: ['Normal, because the textbook normal is 150/100 mm Hg', 'Low blood pressure', 'Normal, because only the diastolic value matters'],
  sol: 'Normal blood pressure is about 120/80 mm Hg; repeated readings of 140/90 or higher indicate hypertension — option (@K).',
  d: 2, c: 'application', t: [4],
}), () => isHypertensive([146, 94]) || 'bp');
add('angina-mcq', mcq({
  stem: 'Angina pectoris is best described as',
  right: 'acute chest pain when not enough oxygen reaches the heart muscle',
  wrong: ['the complete stopping of the heartbeat, also called cardiac arrest', 'an infection of the pericardium that fills it with fluid', 'a blood pressure that stays at 140/90 mm Hg or higher'],
  sol: 'Angina is a symptom of acute chest pain that appears when the heart muscle receives too little oxygen — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('cad-mcq', mcq({
  stem: 'In coronary artery disease, the lumen of the arteries supplying the heart muscle becomes narrower because of deposits of',
  right: 'calcium, fat, cholesterol and fibrous tissue',
  wrong: ['uric acid crystals and urea', 'clumped red blood cells only', 'lymph and excess tissue fluid'],
  sol: 'CAD, often called atherosclerosis, is caused by deposits of calcium, fat, cholesterol and fibrous tissue — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('failure-mcq', mcq({
  stem: 'Three patients are described: P’s heart has stopped beating; Q’s heart muscle was suddenly damaged when a coronary artery became blocked; R’s heart keeps beating but cannot pump enough blood for the body’s needs, and fluid congests her lungs. Which option names the conditions correctly?',
  right: 'P cardiac arrest, Q heart attack, R heart failure',
  wrong: ['P heart failure, Q cardiac arrest, R heart attack', 'P heart attack, Q heart failure, R cardiac arrest', 'All three have heart failure'],
  sol: 'Cardiac arrest: the heart stops beating. Heart attack: muscle suddenly damaged by inadequate blood supply. Heart failure: pumping not effective enough, with lung congestion — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('bp-ar', ar({
  a: 'A single resting reading of 130/85 mm Hg shows that a person has hypertension.',
  r: 'Normal blood pressure is about 120/80 mm Hg, where 120 is the systolic and 80 the diastolic pressure.',
  key: 'd',
  sol: 'A is false: hypertension is diagnosed when repeated checks show 140/90 mm Hg or higher, and 130/85 is below that. R is true — option (d).',
  d: 3, c: 'application', t: [4],
}), () => !isHypertensive([130, 85]) || 'bp');
add('failure-tf', tf({
  stem: 'Heart failure is another name for cardiac arrest.',
  key: 'f',
  sol: 'False. In heart failure the heart beats but does not pump effectively enough for the body’s needs; in cardiac arrest the heart stops beating.',
  d: 1, c: 'understanding', t: [4],
}));
add('hyper-fill', fill({
  stem: 'If repeated checks of blood pressure show a reading of ______ mm Hg or higher, the person is said to have hypertension.',
  acc: [['140/90', '140 over 90']],
  sol: '140/90 mm Hg (normal is 120/80).',
  d: 1, c: 'recall', t: [4],
}));
add('hyper-short', short({
  marks: 2,
  stem: 'What is hypertension, and why is it considered dangerous?',
  model: 'Hypertension is blood pressure **higher than normal (120/80 mm Hg)**; it is diagnosed when **repeated checks show 140/90 mm Hg or higher**. It is dangerous because it **leads to heart diseases** and also damages **vital organs such as the brain and kidneys**.',
  sol: 'Definition with values; effects.',
  scheme: [['Definition with 140/90', 1], ['Effects on heart, brain, kidneys', 1]],
  d: 1, c: 'understanding', t: [4],
}));
add('cad-short', short({
  marks: 2,
  stem: 'A 60-year-old man feels a crushing chest pain whenever he climbs a steep hill, which settles when he rests. Name the symptom and the disease that most probably causes it, and explain the link.',
  model: 'The symptom is **angina pectoris**, acute chest pain. It is probably caused by **coronary artery disease (atherosclerosis)**: deposits of calcium, fat, cholesterol and fibrous tissue **narrow the coronary arteries**, so during exertion **too little oxygen reaches the heart muscle**.',
  sol: 'Angina due to CAD.',
  scheme: [['Angina pectoris', 1], ['CAD narrows arteries; too little oxygen on exertion', 1]],
  d: 3, c: 'application', t: [4],
}));
add('disorders-long', long({
  stem: 'A health magazine claims: “If your heart is beating, you cannot have heart failure, and chest pain on exercise is nothing to worry about as long as your blood pressure is normal.” Evaluate this claim, using what you know about hypertension, coronary artery disease, angina and heart failure.',
  model: '**First part.** The claim confuses heart failure with cardiac arrest. In cardiac arrest the heart stops beating, but in heart failure the heart is still beating; it simply does not pump blood effectively enough to meet the body’s needs. Congestion of the lungs is a main symptom, so it is also called congestive heart failure. A beating heart therefore does not rule it out.\n\n**Second part.** Chest pain on exertion is typical of angina pectoris, which appears when not enough oxygen reaches the heart muscle. Its usual cause is coronary artery disease, or atherosclerosis, in which deposits of calcium, fat, cholesterol and fibrous tissue narrow the coronary arteries. This can be present even when blood pressure is normal, and a blocked artery can lead to a heart attack, in which heart muscle is suddenly damaged by inadequate blood supply.\n\n**Blood pressure.** Normal pressure, about 120/80 mm Hg, is reassuring, and hypertension (repeated readings of 140/90 or higher) is itself a danger to the heart, brain and kidneys. But a normal reading does not exclude coronary disease.\n\n**Judgement.** Both parts of the claim are wrong: heart failure can occur in a beating heart, and exercise chest pain needs medical attention whatever the blood pressure.',
  sol: 'Evaluates both parts using the four disorders.',
  scheme: [['Heart failure versus cardiac arrest', 1.5], ['Angina and CAD explained', 1.5], ['Hypertension and normal values', 1], ['Reasoned judgement', 1]],
  wl: [80, 240],
  d: 4, c: 'evaluation', t: [4],
}));

// ---------------------------------------------------------------- cases
{
  const pts = ['A', 'B', 'AB', 'O'];
  const n = donorsFor('A').length;
  add('donor-case', mk.case({
    passage: `A district hospital blood bank has four volunteers ready to donate: Meera (group A), Iqbal (group B), Tenzin (group AB) and Ruth (group O). A farmer of group A, Rh positive, needs red cells after a tractor accident.\n\n| Volunteer | ${pts.map((p) => `Group ${p}`).join(' | ')} |\n|---|---|---|---|---|\n| Red-cell antigens | ${pts.map((p) => (p === 'O' ? 'none' : p.split('').join(' and '))).join(' | ')} |`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which antibody is present in the farmer’s plasma?',
        right: 'Anti-B',
        wrong: ['Anti-A', 'Both anti-A and anti-B', 'Neither anti-A nor anti-B'],
        sol: 'Group A plasma carries natural antibodies against the absent antigen, B — option (@K).',
        d: 1, c: 'recall', t: [1],
      })),
      part('b', num({
        stem: 'How many of the four volunteers can safely give red cells to the farmer?',
        value: n,
        sol: `Only volunteers whose red cells carry no antigen B are safe: Meera (A) and Ruth (O), so $${n}$ volunteers. Count: $1 + 1 = ${n}$.`,
        scheme: [[`${n}`, 1]],
        d: 2, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain why Ruth’s blood could be given to a patient of any ABO group, but Tenzin could receive red cells from all four volunteers.',
        model: 'Ruth is **group O**: her red cells carry **neither antigen A nor B**, so no recipient’s antibodies attack them — a **universal donor**. Tenzin is **group AB**: his plasma has **no anti-A or anti-B antibodies**, so he can accept red cells of any ABO group — a **universal recipient**.',
        sol: 'Universal donor and recipient.',
        scheme: [['O cells lack A and B antigens', 1], ['AB plasma lacks antibodies', 1]],
        d: 2, c: 'understanding', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'Ruth is Rh negative. Why should she avoid receiving Rh-positive blood herself, even though a first exposure causes no reaction?',
          model: 'The first exposure to the **Rh antigen** makes an Rh-negative person **produce anti-Rh antibodies**. If she later received Rh-positive blood again, these antibodies would **destroy the donated red cells**; in a future pregnancy they could also harm an **Rh-positive foetus**.',
          sol: 'Sensitisation to the Rh antigen.',
          scheme: [['First exposure produces anti-Rh antibodies', 1], ['Later exposure destroys donated cells or harms a foetus', 1]],
          d: 3, c: 'application', t: [1],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 2 || 'value');
}
{
  add('clot-case', mk.case({
    passage: `A student cuts his finger while slicing vegetables. The bleeding stops within a few minutes. Later his blood report reads: platelets 2.4 lakh per cubic millimetre; clotting time normal. In the school laboratory, the teacher shows that blood collected in a tube containing a citrate salt, which binds calcium ions, stays liquid, while blood in a plain tube clots within minutes.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which enzyme converts fibrinogen into the fibrin threads of the student’s clot?',
        right: 'Thrombin',
        wrong: ['Thrombokinase', 'Prothrombin', 'Heparin'],
        sol: 'Thrombin converts fibrinogen into fibrin; thrombokinase is needed to form thrombin from prothrombin — option (@K).',
        d: 2, c: 'understanding', t: [1],
      })),
      part('b', num({
        stem: 'Write his platelet count as a number of platelets per cubic millimetre.',
        value: N.platelets24,
        sol: r`One lakh is 100000, so $2.4 \times 100000 = ${N.platelets24}$ platelets per cubic millimetre, within the normal 1.5–3.5 lakh.`,
        scheme: [[`${N.platelets24}`, 1]],
        d: 1, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain why the blood in the citrate tube stays liquid while blood in the plain tube clots.',
        model: 'Clotting needs a **cascade** of plasma factors forming thrombokinase, then **thrombin** and **fibrin**, and **calcium ions** are essential for these reactions. The citrate **binds the calcium ions**, so the cascade cannot proceed and no fibrin forms; the plain tube still has calcium, so it clots.',
        sol: 'Calcium ions needed for coagulation.',
        scheme: [['Calcium ions needed in the clotting reactions', 1], ['Citrate removes them, so no fibrin forms', 1]],
        d: 2, c: 'application', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'Suggest what might happen to a person whose platelet count fell far below 1.5 lakh per cubic millimetre, and why.',
          model: 'Platelets release substances that **start the clotting cascade** at an injury. With far too few platelets, **clotting would be slow or poor**, leading to a **clotting disorder** with **excessive loss of blood** even from small cuts or bruises.',
          sol: 'Clotting disorder, excessive bleeding.',
          scheme: [['Platelets start coagulation', 1], ['Clotting disorder; excessive blood loss', 1]],
          d: 2, c: 'application', t: [1],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 240000 || 'value');
}
{
  const n = 21, t = 15, rate = rateFromQrs(n, t);
  add('ecg-case', mk.case({
    passage: `During a school health check, a 16-year-old athlete’s resting ECG is recorded for ${t} seconds. The trace shows ${n} identical beats, each with a small P wave, a tall QRS complex and a rounded T wave. The doctor notes that every P wave is followed by a QRS complex.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'What does the T wave in each beat represent?',
        right: 'Return of the ventricles from the excited to the normal state (repolarisation)',
        wrong: ['Electrical excitation (depolarisation) of the two atria', 'Depolarisation of the ventricles, which starts their contraction', 'Contraction of the atria that adds blood to the ventricles'],
        sol: 'The T wave is ventricular repolarisation; its end marks the end of systole — option (@K).',
        d: 1, c: 'recall', t: [2],
      })),
      part('b', num({
        stem: 'Calculate the athlete’s heart rate in beats per minute.',
        value: rate,
        sol: r`$\dfrac{${n} \times 60}{${t}} = ${rate}$ beats per minute.`,
        scheme: [[`${rate} beats per minute`, 1]],
        d: 2, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'What does the observation that every P wave is followed by a QRS complex tell the doctor about the conduction of impulses in the heart?',
        model: 'Each P wave shows that the **SAN impulse has excited the atria**. A QRS after every P shows that **each impulse passes through the AV node, AV bundle and bundle of His** to excite the **ventricles**, so conduction from atria to ventricles is **normal**.',
        sol: 'Normal atrioventricular conduction.',
        scheme: [['P: atria excited by SAN impulse', 1], ['QRS each time: impulse conducted to ventricles normally', 1]],
        d: 2, c: 'application', t: [2],
      }), [
        short({
          marks: 2,
          stem: `If the athlete’s stroke volume is ${HEART.stroke} mL, calculate his cardiac output and say how it compares with the textbook average.`,
          model: `Cardiac output is stroke volume times heart rate: $${HEART.stroke} \\times ${rate} = ${output(HEART.stroke, rate)}$ mL per minute. This is **a little above** the textbook average of about **5000 mL (5 litres) per minute**, as expected with his faster rate.`,
          sol: 'Output from stroke volume and rate.',
          scheme: [['Correct calculation with units', 1], ['Comparison with 5 L per minute', 1]],
          d: 3, c: 'application', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 84 || 'value');
}
{
  const out = N.out65x80;
  add('bp-case', mk.case({
    passage: `A 52-year-old office worker who rarely exercises has his blood pressure measured on four days.\n\n| Day | 1 | 2 | 3 | 4 |\n|---|---|---|---|---|\n| Blood pressure (mm Hg) | 148/92 | 152/96 | 145/91 | 150/94 |\n\nHis resting heart rate is 80 beats per minute and his estimated stroke volume 65 mL.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'What do the four readings indicate?',
        right: 'Hypertension: all readings are at or above 140/90 mm Hg.',
        wrong: ['Normal blood pressure for his age', 'Low blood pressure', 'Heart failure, since the systolic value is high'],
        sol: 'Repeated readings of 140/90 mm Hg or higher indicate hypertension — option (@K).',
        d: 1, c: 'application', t: [4],
      })),
      part('b', num({
        stem: 'Calculate his resting cardiac output in mL per minute.',
        value: out,
        sol: r`$65 \times 80 = ${out}$ mL per minute.`,
        scheme: [[`${out} mL per minute`, 1]],
        d: 2, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'Why should his doctor treat these readings seriously, even though he feels well?',
        model: 'Persistent **hypertension** strains the heart and **leads to heart diseases**; it also damages **vital organs such as the brain and kidneys**. These harms develop silently, so the pressure should be **controlled early**, before symptoms appear.',
        sol: 'Effects of hypertension.',
        scheme: [['Leads to heart disease', 1], ['Affects brain and kidneys; silent', 1]],
        d: 2, c: 'understanding', t: [4],
      }), [
        short({
          marks: 2,
          stem: 'Which division of the autonomic nervous system would lower his heart rate and cardiac output, and how?',
          model: 'The **parasympathetic** division. Acting through the neural centre in the **medulla oblongata**, its signals **decrease the heart rate** and **slow the conduction of action potentials** through the heart, so the **cardiac output falls**.',
          sol: 'Parasympathetic slows the heart.',
          scheme: [['Parasympathetic, via the medulla', 1], ['Lower rate and conduction speed; output falls', 1]],
          d: 2, c: 'understanding', t: [3],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 5200 && [[148, 92], [152, 96], [145, 91], [150, 94]].every(isHypertensive) || 'value');
}
