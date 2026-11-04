// ISC 11 Biology ch17 Body Fluids and Circulation — two decks: Part 1 (t01–t03), Part 2 (t04–t06).
import { sl, deck, table, flow, svgV, r } from '../../isc-11-biology-ch01/src/lib.mjs';
import { HEART, CYCLE, ECG, VESSELS } from './svgs.mjs';
import { BAG, BAG_SPLIT, WATER_PCT, PROTEIN_PCT, plasmaWater, plasmaProtein, recipientsOf, donorsFor, aboChild, P, rhPositive, cycleSec, PHASES, jd, SYSTOLE_S, CO1, co, CO_DAY_L, hrFromRR } from './calc.mjs';

export const V = {
  heart: svgV(HEART, 'Labelled internal structure of the human heart'),
  cycle: svgV(CYCLE, 'Timeline of the cardiac cycle with valve positions'),
  ecg: svgV(ECG, 'A normal ECG with the P wave, QRS complex and T wave'),
  vessels: svgV(VESSELS, 'Transverse sections of an artery, a vein and a capillary'),
};
const list = (a) => a.map((x) => x.replace('-', ' negative').replace('+', ' positive'));
const ab = aboChild('AB', 'AO');

export const deck1 = deck({
  part: 1,
  title: 'Body Fluids and Circulation — Part 1: blood, blood groups and lymph',
  goals: [
    'State the functions of plasma proteins and of each type of blood corpuscle, and outline blood clotting',
    'Predict compatible donors and recipients in the ABO and Rh systems and explain erythroblastosis foetalis',
    'Compare lymph with blood and open with closed circulation',
  ],
  slides: [
    sl('title', 'Body Fluids and Circulation', {
      b: 'Part 1: blood, blood groups, lymph and the types of circulatory system.',
      v: flow('LR', [['b', 'Blood: plasma and corpuscles'], ['g', 'Blood groups: ABO and Rh'], ['l', 'Lymph and the lymphatic system'], ['c', 'Open and closed circulation']], [['b', 'g'], ['g', 'l'], ['l', 'c']], 'Flow of the topics of part one'),
      n: 'Blood carries oxygen, nutrients, wastes and hormones round the body, and helps to defend it. In this part we look at what blood is made of, how it clots, how blood groups decide who can donate to whom, and how lymph and different circulatory systems compare.',
    }),
    sl('concept', 'Plasma and plasma proteins', {
      b: `**Blood** is a fluid connective tissue: about **55 percent plasma** and **45 percent formed elements**. Plasma is **${WATER_PCT - 2} to ${WATER_PCT} percent water** and **${PROTEIN_PCT - 1} to ${PROTEIN_PCT + 1} percent proteins**, with small amounts of salts, glucose, amino acids, fats, hormones and wastes.`,
      v: table(['Plasma protein', 'Function'], [['Albumin', 'Maintains the osmotic balance between blood and tissues'], ['Globulins', 'Defence: include the antibodies'], ['Fibrinogen', 'Blood clotting; plasma without it is serum']], 'Table of plasma proteins and their functions'),
      n: 'Plasma is the liquid part of blood. Most of it is water, and the rest includes three groups of proteins. Albumin holds water in the blood, globulins include antibodies, and fibrinogen is needed for clotting. Serum is plasma that has lost its clotting factors.',
    }),
    sl('example', 'Worked example 1: one bag of donated blood', {
      b: `A blood bank collects **${BAG} mL** of blood in one bag. Estimate the volume of plasma and cells, and of water and protein in the plasma.`,
      ul: [
        r`Plasma $= 55/100 \times ${BAG} = ${BAG_SPLIT.plasma}$ mL; formed elements $= ${BAG} - ${BAG_SPLIT.plasma} = ${BAG_SPLIT.cells}$ mL.`,
        r`Water (about ${WATER_PCT} percent of the plasma) $= ${WATER_PCT}/100 \times ${BAG_SPLIT.plasma} = ${plasmaWater}$ mL.`,
        r`Proteins (about ${PROTEIN_PCT} percent) $= ${PROTEIN_PCT}/100 \times ${BAG_SPLIT.plasma} \approx ${plasmaProtein}$ mL.`,
      ],
      v: table(['Part', 'Volume (mL)'], [['Plasma', String(BAG_SPLIT.plasma)], ['Formed elements', String(BAG_SPLIT.cells)], ['Water in the plasma', String(plasmaWater)], ['Protein in the plasma', String(plasmaProtein)]], 'Worked table of the volumes in one bag of blood'),
      n: 'Take fifty five percent of the bag for plasma, and the rest is cells. Then take about ninety two percent of the plasma for water and about seven percent for protein. The shares are approximate, since books give slightly different ranges.',
    }),
    sl('concept', 'Red blood cells and platelets', {
      b: 'The **formed elements** are the erythrocytes, leucocytes and platelets.',
      v: table(['Corpuscle', 'Number per mm³', 'Features', 'Function'], [['Erythrocytes (RBC)', '5 to 5.5 million', 'Biconcave, no nucleus, contain haemoglobin; made in red bone marrow; life about 120 days; destroyed in the spleen', 'Carry oxygen'], ['Platelets (thrombocytes)', '1.5 to 3.5 lakh', 'Cell fragments of megakaryocytes of the bone marrow', 'Start clotting']], 'Table of red blood cells and platelets'),
      n: 'Mature red cells of mammals have no nucleus, which leaves more room for haemoglobin. They live about four months and are broken down in the spleen. Platelets are not whole cells but fragments, and they release the substances that start clotting.',
    }),
    sl('concept', 'White blood cells', {
      b: '**Leucocytes** are colourless, nucleated cells, **6000 to 8000 per mm³**, that defend the body. They are **granulocytes** (neutrophils, eosinophils, basophils) or **agranulocytes** (lymphocytes, monocytes).',
      v: table(['Leucocyte', 'Share of total', 'Function'], [['Neutrophils', '60 to 65 percent', 'Most abundant; phagocytosis of germs'], ['Lymphocytes', '20 to 25 percent', 'B cells make antibodies; T cells give cell-mediated immunity'], ['Monocytes', '6 to 8 percent', 'Largest cells; become macrophages (phagocytosis)'], ['Eosinophils', '2 to 3 percent', 'Respond to allergy and parasites'], ['Basophils', '0.5 to 1 percent', 'Release histamine, heparin and serotonin in inflammation']], 'Table of the five types of white blood cell'),
      n: 'Neutrophils are the commonest white cells and swallow bacteria. Lymphocytes are the key cells of immunity. Monocytes become macrophages, eosinophils deal with allergy and parasites, and basophils release chemicals that are involved in inflammation.',
    }),
    sl('check', 'Quick check: red cells', {
      b: 'Link a feature of the mammalian red cell with its job.',
      n: 'Quick check. Why does a mature red cell have no nucleus?',
      chk: 'rbc-mcq',
    }),
    sl('concept', 'Coagulation of blood', {
      b: 'At an injury, **platelets and damaged tissue** release **thromboplastin** (clotting factors). With **Ca²⁺**, it converts **prothrombin** (inactive) into **thrombin**. Thrombin converts soluble **fibrinogen** into insoluble **fibrin** threads, which trap blood cells to form the **clot**.',
      v: flow('LR', [['i', 'Injury: platelets and tissue release thromboplastin'], ['t', 'Prothrombin to thrombin (needs calcium ions)'], ['f', 'Fibrinogen to fibrin threads'], ['c', 'Fibrin mesh traps blood cells: clot']], [['i', 't'], ['t', 'f'], ['f', 'c']], 'Flow of the cascade of blood clotting'),
      n: 'Clotting is a chain of steps. Injury releases thromboplastin, which with calcium ions turns prothrombin into thrombin. Thrombin changes fibrinogen into fibrin threads. The threads form a mesh that traps red cells and seals the wound.',
    }),
    sl('check', 'Quick check: clotting', {
      b: 'Predict the result of an experiment on the clotting cascade.',
      n: 'Quick check. What does thrombin act on?',
      chk: 'thrombin-mcq',
    }),
    sl('concept', 'ABO blood groups (Landsteiner)', {
      b: '**Karl Landsteiner** discovered the ABO groups in 1900. The group depends on the **antigens** on the red cells, and the plasma holds **antibodies** against the antigens a person lacks.',
      v: table(['Group', 'Antigen on RBC', 'Antibodies in plasma', 'Can donate to', 'Can receive from'], [['A', 'A', 'anti-B', 'A, AB', 'A, O'], ['B', 'B', 'anti-A', 'B, AB', 'B, O'], ['AB', 'A and B', 'None', 'AB', 'A, B, AB, O (universal recipient)'], ['O', 'None', 'anti-A and anti-B', 'A, B, AB, O (universal donor)', 'O']], 'Table of ABO groups with antigens, antibodies and compatible donors and recipients'),
      n: 'A person makes antibodies against the antigens that the red cells lack. If the wrong blood is given, these antibodies make the donor cells clump together. Group O red cells have no antigens, so they can go to anyone, while group AB people have no antibodies and can receive from anyone.',
    }),
    sl('example', 'Worked example 2: who can give to whom', {
      b: 'Red cells can be given safely if the donor has **no antigen (A, B or Rh) that the recipient lacks**. Using all eight types:',
      ul: [
        `A negative donor can give to ${recipientsOf('A-').length} types: ${list(recipientsOf('A-')).join(', ')}.`,
        `A B negative patient can receive from ${donorsFor('B-').length} types: ${list(donorsFor('B-')).join(' and ')}.`,
        `O negative can give to all ${recipientsOf('O-').length} types; AB positive can receive from all ${donorsFor('AB+').length}.`,
      ],
      v: table(['Type', 'Can give to (number)', 'Can receive from (number)'], [['O−', String(recipientsOf('O-').length), String(donorsFor('O-').length)], ['A−', String(recipientsOf('A-').length), String(donorsFor('A-').length)], ['B−', String(recipientsOf('B-').length), String(donorsFor('B-').length)], ['AB+', String(recipientsOf('AB+').length), String(donorsFor('AB+').length)]], 'Worked table of numbers of compatible recipients and donors'),
      n: 'Check three things: antigen A, antigen B and the Rh antigen. If the donor has one that the recipient lacks, the recipient will react. This is why group O negative is the universal donor and group AB positive is the universal recipient.',
    }),
    sl('check', 'Quick check: donors', {
      b: 'Choose the safe donors for a patient.',
      n: 'Quick check. Check the antigens of each donor against the patient.',
      chk: 'donor-mcq',
    }),
    sl('concept', 'Rh factor and erythroblastosis foetalis', {
      b: 'The **Rh antigen** was found by **Landsteiner and Wiener** in the rhesus monkey; about **80 to 85 percent** of people are **Rh positive**. If an **Rh-negative mother** carries an **Rh-positive foetus**, her blood may be sensitised; she is then given **anti-Rh antibodies** soon after the first delivery to prevent harm to later babies.',
      v: flow('LR', [['a', 'Rh-negative mother, Rh-positive first baby'], ['b', 'At delivery foetal red cells reach the mother'], ['c', 'Mother makes anti-Rh antibodies'], ['d', 'Second Rh-positive baby: antibodies cross the placenta and destroy its red cells']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of how erythroblastosis foetalis arises'),
      n: 'The first baby is usually safe, because the mother makes few antibodies during that pregnancy. At delivery some of the baby’s red cells enter her blood and she makes anti-Rh antibodies. In a later pregnancy these cross the placenta and destroy the red cells of an Rh-positive foetus, causing erythroblastosis foetalis.',
    }),
    sl('example', 'Worked example 3: blood groups of children', {
      b: 'A father of group AB marries a mother of group A who has an O allele (genotype IᴬIᴮ × Iᴬi). The father is Rh positive (Dd) and the mother Rh negative (dd). Predict the children.',
      ul: [
        r`ABO: gametes $I^A, I^B$ and $I^A, i$ give $I^A I^A$, $I^A i$ (group A: ${P(ab, 'A')}), $I^A I^B$ (AB: ${P(ab, 'AB')}) and $I^B i$ (B: ${P(ab, 'B')}).`,
        r`Rh: $Dd \times dd$ gives Rh positive with probability ${rhPositive('Dd', 'dd')}.`,
        'No child can be group O.',
      ],
      v: table(['Child group', 'Probability'], [['A', String(P(ab, 'A'))], ['AB', String(P(ab, 'AB'))], ['B', String(P(ab, 'B'))], ['O', String(P(ab, 'O'))]], 'Worked table of ABO probabilities of the children'),
      n: 'Write the gametes of each parent and combine them. Half the children are group A, a quarter are AB and a quarter are B. The father has no O allele, so group O cannot occur. For the Rh factor, half the children are Rh positive, which is a risk for an Rh-negative mother.',
    }),
    sl('check', 'Quick check: Rh incompatibility', {
      b: 'Decide when an Rh-negative mother needs treatment.',
      n: 'Quick check. In which pregnancy is the foetus at risk?',
      chk: 'rh-mcq',
    }),
    sl('concept', 'Lymph and the lymphatic system', {
      b: 'Some fluid leaves the capillaries as **tissue fluid**. Most returns to the blood; the rest enters the **lymph capillaries** and flows through lymph vessels and **lymph nodes** back to veins near the heart.',
      v: table(['Feature', 'Blood', 'Lymph'], [['Colour', 'Red', 'Colourless'], ['Red cells', 'Present', 'Absent'], ['White cells', 'Present', 'Lymphocytes mainly'], ['Proteins and nutrients', 'More', 'Less'], ['Platelets', 'Present', 'Few or absent']], 'Table comparing blood and lymph'),
      n: 'Lymph is like plasma without red cells and with fewer proteins. Lymph nodes filter the lymph, trap germs, and house lymphocytes and phagocytes. Lymph also returns fluid and proteins to the blood and carries absorbed fats from the intestine.',
    }),
    sl('concept', 'Open and closed circulatory systems', {
      b: 'In an **open** system the heart pumps blood into **open spaces (sinuses)**; in a **closed** system blood stays in **vessels**.',
      v: table(['Feature', 'Open', 'Closed'], [['Blood flows in', 'Open spaces (haemocoel or sinuses)', 'Vessels only'], ['Pressure and speed', 'Low; slow', 'Higher; precise control'], ['Examples', 'Arthropods (cockroach), most molluscs', 'Annelids (earthworm), chordates']], 'Table comparing open and closed circulatory systems'),
      n: 'Arthropods and most molluscs have an open system, where blood bathes the tissues directly. Earthworms and all vertebrates have a closed system, in which blood stays inside vessels, so its flow can be controlled and directed more precisely.',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Blood: 55 percent plasma, 45 percent formed elements; plasma proteins albumin, globulins and fibrinogen.',
        'Corpuscles: RBC carry oxygen; WBC defend; platelets help clotting.',
        'Clotting: thromboplastin, prothrombin to thrombin (Ca²⁺), fibrinogen to fibrin, clot.',
        'ABO and Rh: Landsteiner; O universal donor, AB universal recipient; Rh incompatibility and erythroblastosis foetalis.',
        'Lymph: less protein, no red cells; lymph nodes filter; open and closed circulation.',
      ],
      v: table(['Topic', 'Key idea'], [['Plasma', 'Albumin, globulins, fibrinogen'], ['Clotting', 'Fibrinogen to fibrin by thrombin'], ['Blood groups', 'Antigen and antibody match'], ['Lymph', 'Tissue fluid returned to blood']], 'Summary table of part one'),
      n: 'To recap: blood is plasma and cells, each with its job. Clotting seals wounds by turning fibrinogen into fibrin. Blood groups depend on antigens and antibodies, and Rh incompatibility can harm a second child. Lymph returns tissue fluid to the blood and helps defence.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Name the **antigen and the antibody** when explaining a transfusion reaction.',
        'For Rh problems, state that the **first baby** is usually unharmed and the **second** is at risk.',
        'Write the clotting steps in order, naming **Ca²⁺**.',
        'Compare lymph with blood on **at least three points**.',
      ],
      v: table(['Mistake', 'Correction'], [['Group O has no antibodies', 'Group O has both anti-A and anti-B'], ['Clot formed from thrombin', 'Thrombin makes fibrin from fibrinogen'], ['Lymph has red cells', 'Lymph has no red cells']], 'Table of common mistakes and corrections'),
      n: 'Exam tips. Name the antigen and the antibody in a transfusion answer. For Rh disease, remember it is the second child that is at risk. List the clotting steps in order. And give at least three differences between blood and lymph.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Body Fluids and Circulation — Part 2: the heart, ECG, vessels and disorders',
  goals: [
    'Draw and label the internal structure of the heart and describe the cardiac cycle',
    'Calculate cardiac output from heart rate and stroke volume',
    'Label an ECG, describe the regulation of the heartbeat, and compare artery, vein and capillary',
    'State the cause and effect of hypertension, coronary artery disease, angina and heart failure',
  ],
  slides: [
    sl('title', 'The heart and the circulation', {
      b: 'Part 2: how the heart pumps, how its beat is controlled and measured, and how it can fail.',
      v: flow('LR', [['h', 'Heart: four chambers and valves'], ['c', 'Cardiac cycle and output'], ['e', 'Nodal tissue and ECG'], ['v', 'Vessels and double circulation'], ['d', 'Disorders']], [['h', 'c'], ['c', 'e'], ['e', 'v'], ['v', 'd']], 'Flow of the topics of part two'),
      n: 'The heart is a muscular double pump. In this part we study its chambers and valves, the stages of one heartbeat, the amount of blood it pumps, the way its beat starts and is recorded, the three kinds of blood vessel, and common disorders of circulation.',
    }),
    sl('diagram', 'Internal structure of the human heart', {
      b: 'The heart lies in the **pericardium**, a double membrane. It has two **auricles** (atria) and two **ventricles**; the **left ventricle has the thickest wall**. **Valves** keep blood flowing one way: **tricuspid** (right), **bicuspid or mitral** (left), and **semilunar** valves at the aorta and pulmonary artery.',
      v: V.heart,
      n: 'Blood from the body enters the right auricle through the vena cavae and passes through the tricuspid valve to the right ventricle. The ventricle pumps it to the lungs through the pulmonary artery. Blood from the lungs returns to the left auricle, passes the bicuspid valve to the left ventricle and leaves by the aorta.',
    }),
    sl('concept', 'Chambers, vessels and valves', {
      b: 'The right side carries **deoxygenated** blood and the left side **oxygenated** blood; the **septum** keeps them apart.',
      v: table(['Chamber', 'Receives blood from', 'Passes it to', 'Valve between'], [['Right auricle', 'Superior and inferior vena cavae', 'Right ventricle', 'Tricuspid valve'], ['Right ventricle', 'Right auricle', 'Pulmonary artery (to the lungs)', 'Semilunar valve at the exit'], ['Left auricle', 'Pulmonary veins (from the lungs)', 'Left ventricle', 'Bicuspid (mitral) valve'], ['Left ventricle', 'Left auricle', 'Aorta (to the body)', 'Semilunar valve at the exit']], 'Table of the chambers of the heart with the vessels and valves'),
      n: 'Each chamber has a fixed source, a fixed destination and a valve that stops backflow. Chordae tendineae hold the flaps of the atrioventricular valves so they do not turn inside out when the ventricles contract. The left ventricle is the thickest because it pumps blood round the whole body.',
    }),
    sl('diagram', 'The cardiac cycle', {
      b: 'One heartbeat is a **cardiac cycle**: **atrial systole**, **ventricular systole** and **joint diastole**. With **75 beats a minute**, the cycle takes **0.8 second**: 0.1 + 0.3 + 0.4.',
      v: V.cycle,
      n: 'In atrial systole the auricles contract and finish filling the ventricles. In ventricular systole the ventricles contract, the valves between auricle and ventricle close, and the semilunar valves open to let blood out. In joint diastole all chambers relax and blood flows in from the veins.',
    }),
    sl('example', 'Worked example 1: the length of the cycle', {
      b: `A man’s heart beats **80 times a minute**. Find the length of one cycle, and the joint diastole if atrial systole stays ${PHASES[0][1]} s and ventricular systole ${PHASES[1][1]} s.`,
      ul: [
        r`Cycle $= 60/80 = ${cycleSec(80)}$ s.`,
        r`Joint diastole $= ${cycleSec(80)} - (${PHASES[0][1]} + ${PHASES[1][1]}) = ${cycleSec(80)} - ${SYSTOLE_S} = ${jd(80)}$ s.`,
        'Faster beating shortens **diastole** most; the heart gets less time to fill.',
      ],
      v: table(['Heart rate', 'Cycle (s)', 'Joint diastole (s)'], [['75 per minute', String(cycleSec(75)), String(jd(75))], ['80 per minute', String(cycleSec(80)), String(jd(80))], ['100 per minute', String(cycleSec(100)), String(jd(100))]], 'Worked table of cycle length and joint diastole at three heart rates'),
      n: 'Divide sixty seconds by the number of beats. At eighty beats a minute one cycle lasts three quarters of a second. The contraction times stay about the same, so it is the resting phase that shrinks when the heart beats faster.',
    }),
    sl('example', 'Worked example 2: cardiac output', {
      b: `**Stroke volume** is the blood pumped by each ventricle in one beat; **cardiac output = stroke volume × heart rate**. A woman’s heart rate is **${CO1.hr} per minute** and her stroke volume **${CO1.sv} mL**.`,
      ul: [
        r`Cardiac output $= ${CO1.sv} \times ${CO1.hr} = ${co(CO1.hr, CO1.sv)}$ mL per minute $\approx ${co(CO1.hr, CO1.sv) / 1000}$ L per minute.`,
        r`In a day (1440 minutes): $${co(CO1.hr, CO1.sv)} \times 1440 / 1000 = ${CO_DAY_L}$ L.`,
      ],
      v: table(['Quantity', 'Value'], [['Heart rate', `${CO1.hr} per minute`], ['Stroke volume', `${CO1.sv} mL`], ['Cardiac output', `${co(CO1.hr, CO1.sv)} mL per minute`], ['Per day', `${CO_DAY_L} L`]], 'Worked table of cardiac output'),
      n: 'Multiply the blood pumped in one beat by the number of beats in a minute. A resting adult pumps about five litres a minute, and a trained athlete can pump the same amount with a slower heart, because each beat pushes out more blood.',
    }),
    sl('check', 'Quick check: cardiac output', {
      b: 'Calculate a cardiac output from heart rate and stroke volume.',
      n: 'Quick check. Multiply the two numbers and check the units.',
      chk: 'co-num',
    }),
    sl('concept', 'Regulation of the heartbeat', {
      b: 'The heart is **myogenic**: its beat starts in the **sino-atrial (SA) node**, the **pacemaker**. The impulse spreads to the **atrio-ventricular (AV) node**, then down the **bundle of His** and **Purkinje fibres** to the ventricles. The **autonomic nervous system** adjusts it: **sympathetic** nerves and **adrenaline** speed it up, **parasympathetic** (vagus) nerves slow it.',
      v: flow('LR', [['s', 'SA node (pacemaker)'], ['a', 'AV node'], ['h', 'Bundle of His'], ['p', 'Purkinje fibres'], ['v', 'Ventricles contract']], [['s', 'a'], ['a', 'h'], ['h', 'p'], ['p', 'v']], 'Flow of the conduction of the impulse through the nodal tissue'),
      n: 'The pacemaker starts each beat without any signal from the brain. The impulse reaches the second node, passes down the fibres of the septum and spreads through the walls of the ventricles. Nerves of the autonomic system and the hormone adrenaline only change the rate and the force of the beat.',
    }),
    sl('diagram', 'The electrocardiogram', {
      b: 'An **ECG** records the electrical activity of the heart. The **P wave** is excitation of the auricles, the **QRS complex** is excitation of the ventricles, and the **T wave** is the return of the ventricles to the resting state. The distance between two **R peaks** is one cardiac cycle.',
      v: V.ecg,
      n: 'Three electrodes on the chest and limbs record small voltages. The small first wave comes from the auricles, the tall spike from the ventricles, and the rounded last wave when the ventricles recover. Counting the cycles in a minute gives the heart rate.',
    }),
    sl('example', 'Worked example 3: heart rate from an ECG strip', {
      b: 'An ECG strip runs at **25 mm per second**. The distance between two successive R peaks is **15 mm**. Find the heart rate.',
      ul: [
        r`Time between beats $= 15/25 = ${15 / 25}$ s.`,
        r`Beats in a minute $= 60/${15 / 25} = ${hrFromRR(15)}$.`,
        r`For comparison, an R–R distance of 30 mm gives $60/(30/25) = ${hrFromRR(30)}$ beats a minute.`,
      ],
      v: table(['R–R distance', 'Time (s)', 'Heart rate'], [['15 mm', String(15 / 25), String(hrFromRR(15))], ['20 mm', String(20 / 25), String(hrFromRR(20))], ['30 mm', String(30 / 25), String(hrFromRR(30))]], 'Worked table of heart rates from the R to R distance'),
      n: 'Change the distance between two peaks into a time using the paper speed, then divide sixty seconds by that time. A shorter distance means a faster heart. Only the pattern of the waves, not the paper speed, is asked in most examination questions.',
    }),
    sl('check', 'Quick check: reading an ECG', {
      b: 'Identify the wave that marks the excitation of the ventricles.',
      n: 'Quick check. Which letter is the tall, narrow spike?',
      chk: 'ecg-fig-mcq',
    }),
    sl('diagram', 'Artery, vein and capillary', {
      b: 'All three have a lining of **endothelium**. **Arteries** and **veins** also have a middle layer of muscle and elastic fibres and an outer coat of connective tissue. The **capillary** wall is a single layer of cells.',
      v: V.vessels,
      n: 'An artery has a thick, elastic wall and a narrow lumen because blood leaves the heart at high pressure. A vein has a thinner wall, a wide lumen and valves, because blood returns at low pressure. A capillary wall is one cell thick, which allows exchange with the tissues.',
    }),
    sl('concept', 'Double circulation', {
      b: 'Blood passes through the heart **twice** in each complete circuit: the **pulmonary circuit** (right side, to the lungs) and the **systemic circuit** (left side, to the body).',
      v: flow('LR', [['rv', 'Right ventricle'], ['l', 'Lungs (gas exchange)'], ['la', 'Left auricle and ventricle'], ['b', 'Body (aorta to tissues)'], ['ra', 'Right auricle']], [['rv', 'l'], ['l', 'la'], ['la', 'b'], ['b', 'ra'], ['ra', 'rv']], 'Flow of double circulation from the right ventricle to the lungs, the left side, the body and back'),
      n: 'The right side sends deoxygenated blood to the lungs, and oxygenated blood returns to the left side. The left side then pumps it to the body. Because the two kinds of blood never mix, the tissues receive fully oxygenated blood at high pressure.',
    }),
    sl('concept', 'Blood pressure', {
      b: 'Blood pressure is measured with a **sphygmomanometer**. The **systolic** pressure is recorded while the ventricles contract, and the **diastolic** pressure while they relax.',
      v: table(['Reading (mm Hg)', 'Meaning'], [['120 over 80', 'Normal: systolic 120, diastolic 80'], ['140 over 90 or above', 'Hypertension (high blood pressure)'], ['Difference of the two', 'Pulse pressure (for 120 over 80 it is 40 mm Hg)']], 'Table of blood pressure readings and their meaning'),
      n: 'Normal blood pressure is about one hundred twenty over eighty millimetres of mercury. A reading of one hundred forty over ninety or more, found again and again, means hypertension. The first number is the systolic pressure and the second the diastolic.',
    }),
    sl('concept', 'Disorders of circulation', {
      b: 'Several disorders affect the heart and vessels.',
      v: table(['Disorder', 'Cause', 'Effect'], [['Hypertension', 'Blood pressure above 140 over 90 (repeated readings)', 'Strains the heart; harms brain, kidneys and heart'], ['Coronary artery disease', 'Deposits of calcium, fat and cholesterol narrow the arteries supplying the heart (atherosclerosis)', 'Reduced oxygen to heart muscle'], ['Angina pectoris', 'Insufficient oxygen to the heart muscle', 'Acute chest pain, often on effort'], ['Heart failure', 'The heart cannot pump blood enough for the body', 'Congestion of the lungs; breathlessness']], 'Table of disorders of circulation with causes and effects'),
      n: 'High blood pressure forces the heart to work harder. In coronary artery disease the vessels that feed the heart narrow, which may cause angina, a pain that comes when the heart muscle lacks oxygen. In heart failure the heart cannot pump enough blood, and the lungs may become congested.',
    }),
    sl('check', 'Quick check: angina', {
      b: 'Link a symptom with its cause.',
      n: 'Quick check. What is lacking in the heart muscle during an attack of angina?',
      chk: 'angina-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Heart: four chambers, tricuspid, bicuspid and semilunar valves; left ventricle thickest.',
        'Cardiac cycle: atrial systole, ventricular systole, joint diastole; 0.8 second at 75 beats a minute.',
        'Cardiac output = stroke volume × heart rate.',
        'SA node starts the beat; ECG: P, QRS and T waves.',
        'Artery, vein and capillary; double circulation; hypertension, coronary artery disease, angina and heart failure.',
      ],
      v: table(['Quantity', 'Formula or value'], [['Cycle time', '60 / heart rate'], ['Cardiac output', 'Stroke volume × heart rate'], ['Hypertension', '140 / 90 mm Hg or above']], 'Summary table of formulae'),
      n: 'To recap: the heart pumps blood through two circuits, and its beat starts in the pacemaker. The cycle has three phases, and the output is the stroke volume multiplied by the rate. The ECG records the electrical events, and disorders arise from high pressure, narrowed coronary arteries or failure of the pump.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Draw the heart with **valves, septum and vessels** correctly connected.',
        'Link each ECG wave to **what happens in the chambers**.',
        'Write **units** with cardiac output (mL or litres per minute).',
        'Do not confuse **angina** (pain), **heart failure** (weak pumping) and **cardiac arrest** (stopped heart).',
      ],
      v: table(['Mistake', 'Correction'], [['Bicuspid valve on the right', 'Bicuspid is on the left; tricuspid on the right'], ['The P wave shows ventricular contraction', 'P wave: auricles; QRS: ventricles'], ['Veins have thick muscle', 'Arteries are thicker; veins have valves']], 'Table of common mistakes and corrections'),
      n: 'Exam tips. Connect the heart drawing correctly. Say what each wave of the electrocardiogram means. Always give units for cardiac output. And keep angina, heart failure and cardiac arrest apart.',
    }),
  ],
});
