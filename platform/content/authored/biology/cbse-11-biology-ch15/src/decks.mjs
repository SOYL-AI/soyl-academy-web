// ch15 Body Fluids and Circulation — two decks: Part 1 (t01 blood and lymph, circulatory pathways), Part 2 (t02–t04 heart, cycle, ECG, double circulation, regulation, disorders).
import { sl, deck, table, flow, svgV, r } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { HEARTSEC, ECG, DOUBLE } from './svgs.mjs';
import { BLOOD, WBC_DIFF, HEART, N, ABO, donorsFor } from './calc.mjs';

export const V = {
  heart: svgV(HEARTSEC, 'Labelled section of the human heart with four chambers, valves, great vessels, sino-atrial and atrio-ventricular nodes, bundle of His and Purkinje fibres'),
  ecg: svgV(ECG, 'Standard ECG trace showing P wave, QRS complex and T wave, with one R to R interval marked as one cardiac cycle'),
  double: svgV(DOUBLE, 'Schematic of double circulation: pulmonary circuit between the right ventricle, lungs and left atrium, and systemic circuit between the left ventricle, body tissues and right atrium'),
  abo: table(
    ['Blood group', 'Antigens on red cells', 'Antibodies in plasma', 'Can receive red cells from'],
    Object.keys(ABO).map((g) => [g, ABO[g].antigen.join(', ') || 'none', ABO[g].antibody.join(', ') || 'none', donorsFor(g).join(', ')]),
    'Table of ABO blood groups with antigens, antibodies and compatible donor groups',
  ),
  wbc: table(
    ['Leucocyte', 'Share of all WBCs (percent)', 'Main role'],
    [
      [WBC_DIFF[0][0], `${WBC_DIFF[0][1]}–${WBC_DIFF[0][2]}`, 'Phagocytic: destroy foreign organisms'],
      [WBC_DIFF[1][0], `${WBC_DIFF[1][1]}–${WBC_DIFF[1][2]}`, 'B and T lymphocytes: immune responses'],
      [WBC_DIFF[2][0], `${WBC_DIFF[2][1]}–${WBC_DIFF[2][2]}`, 'Phagocytic'],
      [WBC_DIFF[3][0], `${WBC_DIFF[3][1]}–${WBC_DIFF[3][2]}`, 'Resist infections; linked with allergic reactions'],
      [WBC_DIFF[4][0], `${WBC_DIFF[4][1]}–${WBC_DIFF[4][2]}`, 'Secrete histamine, serotonin and heparin; inflammatory reactions'],
    ],
    'Table of five kinds of leucocytes with their shares and roles',
  ),
  clot: flow(
    'TB',
    [['i', 'Injury: platelets and damaged tissue release factors'], ['k', 'Cascade of plasma factors forms thrombokinase'], ['p', 'Prothrombin → thrombin'], ['f', 'Fibrinogen → fibrin threads'], ['c', 'Clot: fibrin network traps formed elements']],
    [['i', 'k'], ['k', 'p', 'calcium ions needed'], ['p', 'f'], ['f', 'c']],
    'Flow of the clotting cascade from injury through thrombokinase, thrombin and fibrin to a clot',
  ),
};

export const deck1 = deck({
  part: 1,
  title: 'Body Fluids and Circulation — Part 1: Blood, blood groups, clotting and lymph',
  goals: [
    'Describe the composition of plasma and the formed elements of blood',
    'Explain ABO and Rh grouping and their importance in transfusion and pregnancy',
    'Describe the clotting of blood and the formation and role of lymph',
  ],
  slides: [
    sl('title', 'Body Fluids and Circulation', {
      b: 'Part 1 — blood, the most common body fluid in most higher organisms, and lymph.',
      v: flow('LR', [['b', 'Blood'], ['p', 'Plasma (about 55 percent)'], ['f', 'Formed elements (about 45 percent)']], [['b', 'p'], ['b', 'f']], 'Flow showing blood made of plasma and formed elements'),
      n: 'Every living cell needs nutrients and oxygen and must get rid of wastes. Simple organisms like sponges and coelenterates circulate water from their surroundings. Most higher organisms, including us, use special fluids instead: blood and lymph. Blood is a special connective tissue made of a fluid matrix, plasma, and formed elements.',
    }),
    sl('concept', 'Plasma', {
      b: `**Plasma** is a straw-coloured, viscous fluid forming nearly **${BLOOD.plasmaPct} percent** of blood. It is **${BLOOD.waterInPlasma.join('–')} percent water**; proteins make up **${BLOOD.proteinInPlasma.join('–')} percent**.`,
      v: table(['Plasma protein', 'Main role'], [['Fibrinogen', 'Needed for clotting (coagulation) of blood'], ['Globulins', 'Mainly involved in the defence mechanisms of the body'], ['Albumins', 'Help in osmotic balance']], 'Table of three major plasma proteins and their roles'),
      n: 'Besides water and proteins, plasma carries small amounts of minerals such as sodium, calcium, magnesium, bicarbonate and chloride ions, along with glucose, amino acids and lipids that are in transit. Clotting factors are also present in an inactive form. Plasma without the clotting factors is called serum.',
    }),
    sl('concept', 'Formed elements', {
      b: `**Erythrocytes, leucocytes and platelets** together form about **${BLOOD.formedPct} percent** of blood.`,
      v: table(
        ['Formed element', 'Count per cubic millimetre', 'Key features'],
        [
          ['Erythrocytes (RBCs)', `${BLOOD.rbcMillion.join('–')} million (adult man)`, 'Made in red bone marrow; no nucleus in most mammals; biconcave; haemoglobin; live about 120 days; destroyed in the spleen'],
          ['Leucocytes (WBCs)', `${BLOOD.wbc.map((x) => x.toLocaleString('en-IN')).join('–')}`, 'Colourless, nucleated, generally short-lived; granulocytes and agranulocytes'],
          ['Platelets (thrombocytes)', '1.5–3.5 lakh', 'Cell fragments from megakaryocytes in bone marrow; release clotting factors'],
        ],
        'Table comparing erythrocytes, leucocytes and platelets',
      ),
      n: 'Red blood cells are the most abundant cells. Their red pigment, haemoglobin, carries the respiratory gases; a healthy person has twelve to sixteen grams of it in every hundred millilitres of blood. The spleen, where old red cells are destroyed, is called the graveyard of red blood cells. A fall in the platelet count can lead to clotting disorders and heavy loss of blood.',
    }),
    sl('example', 'Worked example 1: how much plasma?', {
      b: `An adult has about ${N.blood} mL of blood containing 15 g of haemoglobin per 100 mL. Using the textbook shares, how much is plasma, how much is formed elements, and how much haemoglobin is carried?`,
      ul: [
        r`Plasma: $${N.blood} \times \dfrac{${BLOOD.plasmaPct}}{100} = ${N.plasma}$ mL.`,
        r`Formed elements: $${N.blood} \times \dfrac{${BLOOD.formedPct}}{100} = ${N.formed}$ mL.`,
        r`Haemoglobin: $\dfrac{${N.blood}}{100} \times 15 = ${N.hbTotal}$ g.`,
      ],
      v: table(['Part', 'Volume or mass'], [['Plasma', `${N.plasma} mL`], ['Formed elements', `${N.formed} mL`], ['Haemoglobin', `${N.hbTotal} g`]], `Worked table: ${N.plasma} mL plasma, ${N.formed} mL formed elements, ${N.hbTotal} g haemoglobin`),
      n: 'Fifty five percent of five thousand millilitres is two thousand seven hundred and fifty millilitres of plasma, leaving two thousand two hundred and fifty for the cells. Fifty lots of fifteen grams give seven hundred and fifty grams of haemoglobin. Real blood volumes vary with body size.',
    }),
    sl('check', 'Quick check: red blood cells', {
      b: 'Answer the question about mature human red blood cells.',
      n: 'Quick check. What do most mammalian red cells lose as they mature?',
      chk: 'rbc-mcq',
    }),
    sl('concept', 'Leucocytes', {
      b: '**Granulocytes:** neutrophils, eosinophils and basophils. **Agranulocytes:** lymphocytes and monocytes.',
      v: V.wbc,
      n: 'Neutrophils are the most abundant white cells and basophils the least. Neutrophils and monocytes are phagocytic cells that destroy foreign organisms. Basophils release histamine, serotonin and heparin in inflammatory reactions. Eosinophils resist infections and are associated with allergies. Lymphocytes, of the B and T kinds, carry out immune responses.',
    }),
    sl('example', 'Worked example 2: reading a WBC count', {
      b: `A blood report gives a total leucocyte count of 7000 per cubic millimetre, with neutrophils 62 percent and lymphocytes 22 percent. Find the number of each per cubic millimetre and say whether the total is normal.`,
      ul: [
        r`Neutrophils: $7000 \times \dfrac{62}{100} = ${N.neutro}$.`,
        r`Lymphocytes: $7000 \times \dfrac{22}{100} = ${N.lympho7000}$.`,
        `The total lies inside the usual range of ${BLOOD.wbc.map((x) => x.toLocaleString('en-IN')).join(' to ')} per cubic millimetre.`,
      ],
      v: table(['Cell type', 'Percent', 'Number per cubic mm'], [['Neutrophils', '62', String(N.neutro)], ['Lymphocytes', '22', String(N.lympho7000)]], `Worked table: ${N.neutro} neutrophils and ${N.lympho7000} lymphocytes per cubic millimetre`),
      n: 'Multiply the total count by each share. Sixty two percent of seven thousand is four thousand three hundred and forty neutrophils, and twenty two percent is one thousand five hundred and forty lymphocytes. Both shares, and the total, are within the normal ranges.',
    }),
    sl('concept', 'ABO blood groups', {
      b: 'Grouping is based on the **presence or absence of two surface antigens, A and B**, on red cells. Plasma carries **natural antibodies** against the antigen that is absent.',
      v: V.abo,
      n: 'Before a transfusion, donor blood must be matched with the recipient, or the recipient’s antibodies will attack the donated red cells and cause clumping. Group O has neither antigen, so its cells can be given to anyone: a universal donor. Group AB has no antibodies and can receive from all groups: a universal recipient.',
    }),
    sl('check', 'Quick check: matching blood', {
      b: 'Choose the safe donors for the patient described.',
      n: 'Quick check. Which donor antigens would the patient’s antibodies attack?',
      chk: 'donor-mcq',
    }),
    sl('concept', 'Rh grouping and pregnancy', {
      b: `Nearly **${BLOOD.rhPositivePct} percent** of humans carry the **Rh antigen** (Rh positive). An **Rh-negative** person exposed to Rh-positive blood forms **anti-Rh antibodies**.`,
      v: flow('LR', [['m', 'Rh-negative mother, first Rh-positive baby'], ['d', 'At delivery a little foetal blood enters the mother'], ['a', 'Mother makes anti-Rh antibodies'], ['n', 'Next Rh-positive foetus: antibodies destroy its red cells'], ['e', 'Erythroblastosis foetalis']], [['m', 'd'], ['d', 'a'], ['a', 'n'], ['n', 'e']], 'Flow showing how Rh incompatibility leads to erythroblastosis foetalis'),
      n: 'In the first pregnancy the placenta keeps the two bloods apart. At delivery the mother may be exposed to a small amount of the baby’s Rh positive blood and start making antibodies. In a later pregnancy these can leak into the foetus, destroying its red cells and causing severe anaemia and jaundice. Giving anti Rh antibodies to the mother right after the first delivery prevents this.',
    }),
    sl('concept', 'Coagulation of blood', {
      b: 'A **clot** is mainly a network of **fibrin** threads in which dead and damaged formed elements are trapped. It prevents excessive loss of blood.',
      v: V.clot,
      n: 'An injury makes platelets release certain factors, and damaged tissues release others. These start a cascade of linked enzyme reactions that forms thrombokinase. Thrombokinase helps convert inactive prothrombin into the enzyme thrombin, and thrombin turns soluble fibrinogen into fibrin threads. Calcium ions play a very important role in clotting.',
    }),
    sl('check', 'Quick check: Rh factor', {
      b: 'Judge the assertion and the reason about the Rh factor.',
      n: 'Quick check. Are anti Rh antibodies present from birth, or made after exposure?',
      chk: 'rh-ar',
    }),
    sl('concept', 'Tissue fluid and lymph', {
      b: 'As blood passes through capillaries, water and small water-soluble substances move into the spaces between cells, leaving larger proteins and most formed elements behind. This is **interstitial (tissue) fluid**. The **lymphatic system** collects it and drains it back into major veins; the fluid inside it is **lymph**.',
      v: table(['Feature', 'Lymph'], [['Colour', 'Colourless'], ['Cells', 'Specialised lymphocytes for immune responses'], ['Mineral content', 'Same mineral distribution as plasma'], ['Roles', 'Exchange of nutrients and gases with cells; carries nutrients and hormones; fats absorbed through lacteals in intestinal villi']], 'Table of the features and roles of lymph'),
      n: 'Tissue fluid is the go between for blood and body cells: nutrients and gases are exchanged through it. Lymph returns this fluid to the blood, carries lymphocytes for immunity, and transports absorbed fats from the lacteals of the intestinal villi.',
    }),
    sl('check', 'Quick check: lymph', {
      b: 'How does lymph differ from blood?',
      n: 'Quick check. What stays behind in the capillaries when tissue fluid forms?',
      chk: 'lymph-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        `Plasma about ${BLOOD.plasmaPct} percent (fibrinogen, globulins, albumins); formed elements about ${BLOOD.formedPct} percent.`,
        'RBCs: 5–5.5 million per cubic mm, haemoglobin 12–16 g per 100 mL, life 120 days; WBCs: 6000–8000; platelets: 1.5–3.5 lakh.',
        'ABO groups depend on antigens A and B; O universal donor, AB universal recipient.',
        'Rh incompatibility can cause erythroblastosis foetalis; prevented by anti-Rh antibodies after the first delivery.',
        'Clotting: thrombokinase, prothrombin to thrombin, fibrinogen to fibrin; calcium ions needed.',
        'Lymph returns tissue fluid to veins, carries lymphocytes and absorbed fats.',
      ],
      v: table(['Fluid', 'Key idea'], [['Plasma', 'Fluid matrix with proteins and clotting factors'], ['Serum', 'Plasma without clotting factors'], ['Lymph', 'Tissue fluid in lymphatic vessels']], 'Summary table of plasma, serum and lymph'),
      n: 'To recap: blood is plasma plus formed elements. Red cells carry gases, white cells defend, and platelets help clotting. Blood groups decide who can donate to whom, and Rh incompatibility matters in pregnancy. Lymph returns tissue fluid to the blood.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Learn the **three plasma proteins** with one role each.',
        'Draw the **ABO table** from antigens and antibodies; do not memorise it blindly.',
        'Write the clotting sequence in order: **thrombokinase → thrombin → fibrin**, with **calcium ions**.',
        'Do not confuse **serum** with **plasma**, or **universal donor** with **universal recipient**.',
      ],
      n: 'Exam tips. Know the three plasma proteins and their roles. Build the blood group table from antigens and antibodies. Write the clotting steps in the right order and mention calcium ions. And keep serum and plasma, and donor and recipient, clearly apart.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Body Fluids and Circulation — Part 2: The heart, cardiac cycle, ECG, double circulation and disorders',
  goals: [
    'Compare open and closed circulation and the hearts of vertebrates',
    'Describe the human heart, its conducting system, the cardiac cycle and the ECG',
    'Explain double circulation and the regulation of cardiac activity',
    'Describe hypertension, coronary artery disease, angina and heart failure',
  ],
  slides: [
    sl('title', 'The circulatory system', {
      b: 'Part 2 — how the heart pumps blood round the body, and what can go wrong.',
      v: flow('LR', [['h', 'Heart pumps'], ['a', 'Arteries'], ['c', 'Capillaries'], ['v', 'Veins'], ['r', 'Back to heart']], [['h', 'a'], ['a', 'c'], ['c', 'v'], ['v', 'r']], 'Flow of blood from the heart through arteries, capillaries and veins back to the heart'),
      n: 'The human circulatory system, also called the blood vascular system, has a muscular chambered heart, a network of closed branching blood vessels, and blood, the fluid that circulates. First we compare circulatory patterns in animals, then look closely at the human heart.',
    }),
    sl('concept', 'Circulatory pathways', {
      b: '**Open** system: blood pumped by the heart passes through large vessels into open spaces called **sinuses** (arthropods, molluscs). **Closed** system: blood always stays inside vessels (annelids, chordates), so flow can be regulated more precisely.',
      v: table(['Vertebrate group', 'Heart chambers', 'Circulation'], [['Fishes', '2 (one atrium, one ventricle)', 'Single: heart pumps deoxygenated blood to the gills'], ['Amphibians and most reptiles', '3 (two atria, one ventricle)', 'Incomplete double: blood mixes in the single ventricle'], ['Crocodiles, birds, mammals', '4 (two atria, two ventricles)', 'Double: two separate pathways']], 'Table of heart chambers and circulation in vertebrate groups'),
      n: 'All vertebrates have a muscular chambered heart. In fishes the heart pumps out deoxygenated blood, which is oxygenated in the gills. In amphibians and most reptiles, oxygenated and deoxygenated blood mix in one ventricle. Crocodiles, birds and mammals keep the two kinds of blood completely apart.',
    }),
    sl('diagram', 'The human heart', {
      b: 'Mesodermal in origin; in the thoracic cavity between the lungs, slightly tilted to the left; about the size of a clenched fist; enclosed in the double-walled **pericardium** with pericardial fluid.',
      v: V.heart,
      n: 'The two upper chambers, the atria, are small; the two lower ventricles are larger and have much thicker walls. A thin interatrial septum and a thick interventricular septum separate the left and right sides. The tricuspid valve guards the right atrioventricular opening, the bicuspid or mitral valve the left, and semilunar valves guard the pulmonary artery and aorta, so blood flows one way only.',
    }),
    sl('concept', 'Nodal tissue: the conducting system', {
      b: `Specialised cardiac musculature, the **nodal tissue**, is **autoexcitable**: it generates action potentials without any external stimulus. The **SAN** produces the most, about **${HEART.sanRate.join('–')} per minute**, so it is the **pacemaker**.`,
      v: flow('LR', [['s', 'Sino-atrial node (upper right corner of right atrium)'], ['a', 'Atrio-ventricular node (lower left corner of right atrium)'], ['b', 'AV bundle, right and left bundles'], ['p', 'Purkinje fibres in ventricle walls']], [['s', 'a'], ['a', 'b'], ['b', 'p']], 'Flow of the cardiac impulse from the SA node through the AV node and bundle of His to the Purkinje fibres'),
      n: 'The atrio ventricular bundle runs from the atrio ventricular node through the septum and divides into right and left bundles, which give rise to minute Purkinje fibres throughout the ventricles. The bundles and Purkinje fibres together are called the bundle of His. Because the heartbeat starts in its own muscle, the heart is called myogenic.',
    }),
    sl('check', 'Quick check: pacemaker', {
      b: 'Which part of the heart sets its pace?',
      n: 'Quick check. Which node generates the most action potentials per minute?',
      chk: 'san-mcq',
    }),
    sl('concept', 'The cardiac cycle', {
      b: 'The sequence of events in the heart that repeats with every beat: **systole** (contraction) and **diastole** (relaxation) of both atria and ventricles.',
      v: table(
        ['Stage', 'What happens'],
        [
          ['Joint diastole', 'All chambers relaxed; tricuspid and bicuspid valves open; semilunar valves closed; blood flows from veins through atria into ventricles'],
          ['Atrial systole', 'SAN fires; both atria contract, adding about 30 percent more blood to the ventricles'],
          ['Ventricular systole', 'Impulse spreads by AVN and bundle of His; ventricles contract, atria relax; AV valves close (lub); semilunar valves open'],
          ['Ventricular diastole', 'Ventricles relax; semilunar valves close (dub); AV valves reopen and the cycle restarts'],
        ],
        'Table of the four stages of the cardiac cycle',
      ),
      n: 'Ventricular contraction raises the pressure, which shuts the tricuspid and bicuspid valves as blood tries to flow back. That closure makes the first sound, lub. When the ventricles relax, the semilunar valves shut to stop backflow, giving the second sound, dub. These sounds are clinically important.',
    }),
    sl('example', 'Worked example 1: cycle length and cardiac output', {
      b: `A healthy adult’s heart beats ${HEART.rate} times a minute and each ventricle pumps about ${HEART.stroke} mL per beat (the stroke volume). How long is one cardiac cycle, and what is the cardiac output?`,
      ul: [
        r`Cycle length: $\dfrac{60}{${HEART.rate}} \approx ${HEART.cycleExact}$ s, usually quoted as about ${HEART.cycle} s.`,
        r`Cardiac output is stroke volume times heart rate: $${HEART.stroke} \times ${HEART.rate} = ${HEART.output}$ mL per minute.`,
        'That is about 5 litres per minute, the textbook average. An athlete’s output can be much higher.',
      ],
      v: table(['Quantity', 'Value'], [['Heart rate', `${HEART.rate} per minute`], ['Cycle length', `about ${HEART.cycle} s`], ['Stroke volume', `${HEART.stroke} mL`], ['Cardiac output', `${HEART.output} mL per minute, about 5 L`]], `Worked table: cycle about ${HEART.cycle} second, cardiac output ${HEART.output} millilitres per minute`),
      n: 'Sixty seconds shared among seventy two beats gives about zero point eight of a second per cycle. Seventy millilitres per beat times seventy two beats gives five thousand and forty millilitres, roughly five litres every minute from each ventricle.',
    }),
    sl('diagram', 'The electrocardiogram (ECG)', {
      b: 'An **ECG** is a graphical record of the electrical activity of the heart during a cardiac cycle. For a standard ECG, leads are attached to each wrist and to the left ankle.',
      v: V.ecg,
      n: 'The P wave shows excitation, or depolarisation, of the atria, which makes them contract. The QRS complex shows depolarisation of the ventricles; their contraction starts shortly after Q. The T wave shows the ventricles returning to the normal state, and its end marks the end of systole. Deviations from the normal shape point to heart disease.',
    }),
    sl('example', 'Worked example 2: heart rate from an ECG', {
      b: 'An ECG strip recorded for 15 seconds shows 18 QRS complexes. What is the heart rate, and how long is each cardiac cycle?',
      ul: [
        r`Rate: $\dfrac{18 \times 60}{15} = 72$ beats per minute.`,
        r`Cycle: $\dfrac{15}{18} \approx 0.83$ s, about ${HEART.cycle} s.`,
        'Each QRS complex marks one ventricular contraction, so counting them gives the heart rate.',
      ],
      v: table(['Reading', 'Value'], [['QRS complexes', '18 in 15 s'], ['Heart rate', '72 per minute'], ['One cycle', 'about 0.8 s']], 'Worked table: 18 QRS complexes in 15 seconds give 72 beats per minute'),
      n: 'Eighteen beats in a quarter of a minute means four times eighteen, seventy two beats a minute. Doctors count QRS complexes over a fixed time in exactly this way.',
    }),
    sl('check', 'Quick check: ECG waves', {
      b: 'What does the P wave of an ECG represent?',
      n: 'Quick check. Which chambers are excited first?',
      chk: 'ecgp-mcq',
    }),
    sl('diagram', 'Double circulation', {
      b: '**Pulmonary circulation:** right ventricle → pulmonary artery → lungs → pulmonary veins → left atrium. **Systemic circulation:** left ventricle → aorta → arteries, arterioles, capillaries → tissues → venules, veins, venae cavae → right atrium.',
      v: V.double,
      n: 'Blood passes through the heart twice in one full circuit, so oxygenated and deoxygenated blood never mix. The systemic circuit supplies tissues with nutrients and oxygen and removes carbon dioxide and other harmful substances. The hepatic portal vein takes blood from the intestine to the liver before it joins the systemic circulation, and a coronary system serves the heart muscle itself.',
    }),
    sl('concept', 'Regulation of cardiac activity', {
      b: 'Normal heart activity is **auto-regulated** by the nodal tissue, so the heart is **myogenic**. A neural centre in the **medulla oblongata** can moderate it through the **autonomic nervous system**.',
      v: table(['Signal', 'Effect'], [['Sympathetic nerves', 'Increase heart rate and the strength of ventricular contraction, so cardiac output rises'], ['Parasympathetic nerves', 'Decrease heart rate and the speed of conduction of action potentials, so cardiac output falls'], ['Adrenal medullary hormones', 'Increase cardiac output']], 'Table of neural and hormonal effects on the heart'),
      n: 'The heart sets its own rhythm, but the brain can turn it up or down. Sympathetic signals speed and strengthen the beat, as when you run or are frightened. Parasympathetic signals slow it during rest. Hormones from the adrenal medulla also raise cardiac output.',
    }),
    sl('check', 'Quick check: myogenic heart', {
      b: 'Judge the assertion and the reason about the heartbeat.',
      n: 'Quick check. Where does each heartbeat begin?',
      chk: 'auto-ar',
    }),
    sl('concept', 'Disorders of the circulatory system', {
      b: 'Normal blood pressure is **120/80 mm Hg** (systolic, or pumping, over diastolic, or resting).',
      v: table(
        ['Disorder', 'What it is'],
        [
          ['Hypertension', 'Blood pressure repeatedly 140/90 mm Hg or higher; leads to heart disease and harms the brain and kidneys'],
          ['Coronary artery disease (atherosclerosis)', 'Deposits of calcium, fat, cholesterol and fibrous tissue narrow the coronary arteries'],
          ['Angina (angina pectoris)', 'Acute chest pain when not enough oxygen reaches the heart muscle; more common in the middle-aged and elderly'],
          ['Heart failure (congestive)', 'Heart not pumping effectively enough for the body’s needs; congestion of the lungs is a main symptom'],
        ],
        'Table of four circulatory disorders',
      ),
      n: 'Heart failure is not the same as cardiac arrest, when the heart stops beating, or a heart attack, when heart muscle is suddenly damaged by an inadequate blood supply.',
    }),
    sl('check', 'Quick check: blood pressure', {
      b: 'Classify the blood pressure readings described.',
      n: 'Quick check. What reading marks the start of hypertension?',
      chk: 'bpread-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Open (arthropods, molluscs) and closed (annelids, chordates) systems; fish 2, amphibians and most reptiles 3, crocodiles, birds and mammals 4 chambers.',
        'Heart: atria, ventricles, septa; tricuspid, bicuspid and semilunar valves; SAN (pacemaker, 70–75 per minute), AVN, bundle of His, Purkinje fibres.',
        `Cardiac cycle about ${HEART.cycle} s at ${HEART.rate} per minute; stroke volume about ${HEART.stroke} mL; cardiac output about 5 L per minute; lub and dub.`,
        'ECG: P (atrial depolarisation), QRS (ventricular depolarisation), T (ventricular repolarisation).',
        'Double circulation; hepatic portal and coronary systems; medulla oblongata and the autonomic nerves regulate.',
        'Hypertension (140/90 or more), coronary artery disease, angina, heart failure.',
      ],
      v: V.double,
      n: 'To recap: the human heart has four chambers and a self exciting conducting system led by the sino atrial node. Each beat is one cardiac cycle, visible on an ECG. Blood flows in two circuits, and the nervous system and hormones fine tune the heart. High blood pressure and narrowed coronary arteries are serious disorders.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Draw and label the **heart section** with valves and the **nodal tissue**.',
        'Learn the **ECG waves** and what each represents.',
        r`Use **cardiac output = stroke volume × heart rate** and show units.`,
        'Distinguish **heart failure**, **cardiac arrest** and **heart attack**.',
      ],
      n: 'Exam tips. Practise a labelled heart with its valves and nodes. Know what the P wave, the QRS complex and the T wave mean. Calculate cardiac output from stroke volume and heart rate, with units. And keep heart failure, cardiac arrest and heart attack apart.',
    }),
  ],
});
