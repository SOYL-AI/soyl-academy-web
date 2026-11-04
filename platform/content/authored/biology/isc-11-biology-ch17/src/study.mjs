// ISC 11 Biology ch17 notes and flashcards.
import { T, table, unit, PROV } from '../../isc-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { BAG, BAG_SPLIT, CO1, co, PHASES, cycleSec } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Body Fluids and Circulation — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Blood: plasma, plasma proteins, blood corpuscles and coagulation',
      `**Blood** is a fluid connective tissue made of **plasma** (about 55 percent) and **formed elements** (about 45 percent). **Plasma** is a straw-coloured fluid with **90 to 92 percent water** and **6 to 8 percent proteins**, and small amounts of salts, glucose, amino acids, lipids, hormones and wastes. A bag of ${BAG} mL of blood therefore holds about ${BAG_SPLIT.plasma} mL of plasma and ${BAG_SPLIT.cells} mL of cells.

**Plasma proteins:** **albumin** (maintains the osmotic balance between blood and tissues), **globulins** (defence; they include the antibodies) and **fibrinogen** (blood clotting); **prothrombin** and other clotting factors are also present. **Serum** is plasma from which the clotting factors (fibrinogen) have been removed.

**Blood corpuscles.**
- **Erythrocytes (RBC):** 5 to 5.5 million per mm³; biconcave, **no nucleus** in mammals, contain the red pigment **haemoglobin**; formed in the red bone marrow, life span about 120 days, destroyed in the spleen. **Function:** transport of oxygen (and some carbon dioxide).
- **Leucocytes (WBC):** 6000 to 8000 per mm³; nucleated and colourless. **Granulocytes:** **neutrophils** (60 to 65 percent; most abundant; phagocytic), **eosinophils** (2 to 3 percent; allergy and parasites), **basophils** (0.5 to 1 percent; release histamine, heparin and serotonin). **Agranulocytes:** **lymphocytes** (20 to 25 percent; B cells make antibodies, T cells give cell-mediated immunity) and **monocytes** (6 to 8 percent; become macrophages).
- **Platelets (thrombocytes):** 1.5 to 3.5 lakh per mm³; cell fragments of **megakaryocytes**; they help in **clotting**.

**Coagulation (brief).** At an injury, platelets and damaged tissue release **thromboplastin** (clotting factors). With **calcium ions**, thromboplastin converts the inactive **prothrombin** of plasma into the enzyme **thrombin**. Thrombin converts soluble **fibrinogen** into insoluble **fibrin** threads. The fibrin meshwork traps red cells, platelets and white cells to form a **clot** (the cascade). Anticoagulants such as **heparin** prevent clotting inside vessels; **citrate** binds calcium in stored blood. Vitamin K is needed by the liver to make prothrombin.`,
      [kt('Plasma', 'The straw-coloured liquid part of blood, about 55 percent of it.'), kt('Serum', 'Plasma without fibrinogen and the other clotting factors.'), kt('Thrombin', 'The enzyme that converts fibrinogen into fibrin.'), kt('Fibrin', 'Insoluble protein threads that form the framework of a clot.')],
      table(['Corpuscle', 'Number per mm³', 'Function'], [['RBC', '5 to 5.5 million', 'Carry oxygen'], ['WBC', '6000 to 8000', 'Defence'], ['Platelets', '1.5 to 3.5 lakh', 'Clotting']], 'Table of blood corpuscles'),
      [1],
    ),
    sec(
      '2. ABO blood groups and the Rh factor',
      `**ABO groups (Landsteiner, 1900).** The ABO group depends on the presence of the **antigens A and B** on the surface of the red cells; the plasma contains **antibodies** against the antigens that are absent. **Group A:** antigen A, antibody anti-B. **Group B:** antigen B, antibody anti-A. **Group AB:** both antigens, no antibodies (**universal recipient**). **Group O:** no antigen, both anti-A and anti-B (**universal donor**). The group is inherited through three alleles Iᴬ, Iᴮ and i. If blood of an unsuitable group is given, the antibodies of the recipient make the donor's red cells **agglutinate** (clump).

**Rh factor.** Another antigen, the **Rh antigen** (first seen in the **rhesus monkey**, by Landsteiner and Wiener), is present on the red cells of about **80 to 85 percent** of people (**Rh positive**); those who lack it are **Rh negative**. An Rh-negative person who receives Rh-positive blood makes anti-Rh antibodies, so Rh-negative patients must be given Rh-negative blood.

**Erythroblastosis foetalis.** If an **Rh-negative mother** carries an **Rh-positive foetus**, a little foetal blood can enter her blood at **delivery**. She makes **anti-Rh antibodies**. The **first baby** is usually safe, but in a **later pregnancy** with an Rh-positive foetus the antibodies cross the **placenta** and **destroy the red cells** of the foetus, causing anaemia, jaundice and sometimes death. The mother is given **anti-Rh antibodies** soon after the first delivery to prevent this.

**Compatibility.** Red cells can be given when the donor has no antigen (A, B or Rh) that the recipient lacks. Of the eight ABO-Rh types, O negative can donate to all eight and AB positive can receive from all eight.`,
      [kt('Antigen', 'A substance, here on the red cell surface, that can trigger the formation of antibodies.'), kt('Agglutination', 'The clumping of red cells when antibodies meet the matching antigen.'), kt('Universal donor', 'Group O (O negative for both systems): its red cells carry no A, B or Rh antigen.'), kt('Erythroblastosis foetalis', 'Destruction of the red cells of an Rh-positive foetus by anti-Rh antibodies of an Rh-negative mother.')],
      table(['Group', 'Antigen', 'Antibody', 'Can receive from'], [['A', 'A', 'anti-B', 'A, O'], ['B', 'B', 'anti-A', 'B, O'], ['AB', 'A and B', 'None', 'A, B, AB, O'], ['O', 'None', 'anti-A, anti-B', 'O']], 'Table of ABO groups'),
      [2],
    ),
    sec(
      '3. Lymph, the lymphatic system and types of circulation',
      `**Tissue fluid** leaks from the blood capillaries and bathes the cells. Most of it returns to the capillaries; the rest is collected by blind-ended **lymph capillaries** and flows as **lymph** through **lymph vessels** (with valves, so flow is one way) and **lymph nodes** into large veins near the heart. **Lymph** is a colourless fluid; compared with blood it has **no red cells**, **fewer proteins** and nutrients, and its white cells are mainly **lymphocytes**.

**Functions of lymph:** return of tissue fluid and proteins to the blood; absorption of digested **fats** through the **lacteals** of the villi; defence. **Lymph nodes** **filter** the lymph, trap and destroy germs with **phagocytes** and produce and store **lymphocytes**, which make antibodies.

**Open and closed circulation.** In an **open circulatory system** (arthropods such as cockroach, and most molluscs) the heart pumps blood into **open spaces (sinuses or haemocoel)** that bathe the tissues; pressure and speed are low. In a **closed circulatory system** (annelids such as the earthworm, and chordates) blood stays inside **vessels**, giving faster flow and better control.`,
      [kt('Lymph', 'A colourless fluid formed from tissue fluid; it flows in lymph vessels to the veins.'), kt('Lymph node', 'A small organ on lymph vessels that filters lymph and houses lymphocytes and phagocytes.'), kt('Open circulation', 'Blood is pumped into open spaces that bathe the tissues.'), kt('Closed circulation', 'Blood flows only inside vessels.')],
      table(['Feature', 'Blood', 'Lymph'], [['Red cells', 'Present', 'Absent'], ['Proteins', 'More', 'Less'], ['White cells', 'Present', 'Lymphocytes']], 'Table comparing blood and lymph'),
      [3],
    ),
    sec(
      '4. The human heart, cardiac cycle, stroke volume and cardiac output',
      `**External features.** The heart is a muscular organ of about the size of a closed fist, lying between the lungs, slightly tilted to the left, inside the **pericardium** (a double-layered membrane with fluid). **Internal structure.** It has four chambers: two thin-walled upper **auricles (atria)** and two thick-walled lower **ventricles**, separated by the **interatrial** and **interventricular septa**; the **left ventricle has the thickest wall**. The right auricle receives deoxygenated blood from the **superior and inferior vena cavae** and passes it through the **tricuspid valve** to the right ventricle, which pumps it through a **semilunar valve** into the **pulmonary artery**. The left auricle receives oxygenated blood from the **pulmonary veins** and passes it through the **bicuspid (mitral) valve** to the left ventricle, which pumps it through a semilunar valve into the **aorta**. The valves allow blood to flow in one direction only; **chordae tendineae** attached to papillary muscles prevent the flaps from turning inside out. (The valves' closing produces the two heart sounds, lub and dub.)

**Cardiac cycle.** The sequence of events in one heartbeat. At about 75 beats a minute a cycle lasts about ${cycleSec(75)} second: **atrial (auricular) systole** (${PHASES[0][1]} s) pushes the last of the blood into the ventricles through open valves; **ventricular systole** (${PHASES[1][1]} s) closes the valves between auricle and ventricle, opens the semilunar valves and sends blood into the aorta and the pulmonary artery; **joint diastole** (${PHASES[2][1]} s) is the relaxation of all four chambers, during which the semilunar valves close and blood flows from the veins into the auricles and on to the ventricles.

**Stroke volume** is the volume of blood pumped by each ventricle in one beat (about 70 mL). **Cardiac output = stroke volume × heart rate**; in a healthy resting adult it is about 5 litres a minute. For a stroke volume of ${CO1.sv} mL and a rate of ${CO1.hr} a minute it is ${co(CO1.hr, CO1.sv)} mL a minute. A trained athlete has a larger stroke volume and a slower resting rate.`,
      [kt('Systole', 'Contraction of a chamber of the heart.'), kt('Diastole', 'Relaxation of a chamber of the heart.'), kt('Joint diastole', 'The phase in which all four chambers are relaxed.'), kt('Stroke volume', 'The blood pumped by a ventricle in one beat.'), kt('Cardiac output', 'Stroke volume × heart rate: the blood pumped by each ventricle in a minute.')],
      V.heart,
      [4],
      [V.cycle],
    ),
    sec(
      '5. Regulation of the heartbeat, ECG, blood pressure, double circulation and blood vessels',
      `**Regulation.** Human heart is **myogenic**: the beat arises in the heart muscle itself, in the **sino-atrial (SA) node** in the wall of the right auricle, the **pacemaker**. The impulse spreads over both auricles and reaches the **atrio-ventricular (AV) node**; it passes down the **atrio-ventricular bundle (bundle of His)**, its two branches and the **Purkinje fibres** into the ventricular walls. The **autonomic nervous system** can modify it through a **cardiac centre in the medulla**: **sympathetic** nerves increase the rate and the force of the beat, **parasympathetic** (vagus) nerves decrease them; the hormone **adrenaline** from the adrenal medulla increases the cardiac output.

**ECG.** An **electrocardiogram** is a record of the electrical activity of the heart. The **P wave** represents the electrical excitation (**depolarisation**) of the auricles, which leads to atrial contraction; the **QRS complex** represents depolarisation of the ventricles, which starts ventricular contraction; the **T wave** represents the return of the ventricles from the excited to the normal state (repolarisation). The distance between two R peaks gives one cycle, so the **heart rate** can be read from an ECG strip (for example, an R–R distance of 20 mm on paper at 25 mm per second is 0.8 second, or 75 beats a minute).

**Blood pressure.** Measured with a **sphygmomanometer**. **Systolic** pressure is recorded when the ventricles contract, **diastolic** pressure when they relax; the normal is about **120/80 mm Hg**, and repeated readings of **140/90 mm Hg or above** indicate **hypertension**.

**Double circulation.** Blood passes through the heart twice in each complete circuit: in the **pulmonary circulation** the right ventricle sends deoxygenated blood to the lungs and oxygenated blood returns to the left auricle; in the **systemic circulation** the left ventricle sends oxygenated blood to the body and deoxygenated blood returns by the vena cavae to the right auricle. The two kinds of blood are kept apart.

**Blood vessels.** **Arteries** carry blood away from the heart; the wall has three coats (tunica externa, tunica media of smooth muscle and elastic fibres, tunica intima of endothelium) and is thick, with a narrow lumen and no valves. **Veins** carry blood to the heart; the wall is thinner, the lumen wide and **valves** prevent backflow. **Capillaries** have a wall of a **single layer of endothelial cells**, allowing exchange of materials.`,
      [kt('Pacemaker', 'The SA node, which starts each heartbeat.'), kt('ECG', 'A record of the electrical changes of the heart: P wave, QRS complex and T wave.'), kt('Systolic pressure', 'The pressure in the arteries during ventricular contraction.'), kt('Double circulation', 'A pattern in which blood passes twice through the heart in a complete circuit.')],
      V.ecg,
      [5],
      [V.vessels],
    ),
    sec(
      '6. Disorders of circulation',
      `- **Hypertension (high blood pressure):** blood pressure of **140/90 mm Hg or above** on repeated readings. It makes the heart work harder and damages the heart, the brain and the kidneys.
- **Coronary artery disease (CAD):** also called atherosclerosis; **deposits of calcium, fat, cholesterol and fibrous tissue** make the lumen of the arteries that supply the heart muscle narrow, so less blood and oxygen reach it.
- **Angina pectoris:** **acute chest pain** that appears when **not enough oxygen** reaches the heart muscle, often on effort; the pain can also be felt in the left arm. It can be a sign of coronary artery disease.
- **Heart failure:** the state when the heart is **not pumping blood effectively enough** to meet the needs of the body; it is sometimes called **congestive heart failure** because the **lungs** can get congested. It is **not** the same as cardiac arrest (the heart stops beating) or a heart attack (sudden damage to heart muscle).

Books use somewhat different wording, and the syllabus asks for the cause and effect of each disorder.`,
      [kt('Hypertension', 'Blood pressure persistently at 140/90 mm Hg or above.'), kt('Atherosclerosis', 'Narrowing of arteries by deposits of calcium, fat and cholesterol; the basis of coronary artery disease.'), kt('Angina pectoris', 'Chest pain when the heart muscle gets too little oxygen.'), kt('Heart failure', 'Inability of the heart to pump enough blood for the body’s needs.')],
      table(['Disorder', 'Cause', 'Effect'], [['Hypertension', 'High arterial pressure', 'Damage to heart, brain and kidneys'], ['Coronary artery disease', 'Deposits in coronary arteries', 'Less oxygen to heart muscle'], ['Angina pectoris', 'Too little oxygen to heart muscle', 'Chest pain'], ['Heart failure', 'Weak pumping', 'Lung congestion']], 'Table of disorders of circulation'),
      [6],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying that group O has no antibodies (it has both anti-A and anti-B), or that group AB has antibodies (it has none).
- Forgetting that the first Rh-positive baby is usually safe and that the risk is to the second.
- Writing the clotting steps out of order or leaving out calcium ions.
- Placing the bicuspid valve on the right side of the heart.
- Saying that the P wave shows ventricular contraction.
- Giving cardiac output without units, or confusing stroke volume with cardiac output.
- Using "heart failure", "heart attack" and "cardiac arrest" as if they meant the same.

**How marks are usually awarded**
- 1-mark subparts: a term, a location, a count, a give-a-reason, a donor or recipient group.
- 2–3-mark questions: plasma proteins, clotting steps, donors and recipients, erythroblastosis foetalis, lymph against blood, the phases of the cardiac cycle, artery against vein, an ECG wave, a disorder.
- 5-mark questions in parts: a labelled diagram of the human heart with the flow of blood; the cardiac cycle with cardiac output; the ABO and Rh systems; regulation of the heartbeat and the ECG; disorders of circulation.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Share of plasma in blood?', 'About 55 percent (formed elements about 45).', 'fact', 1),
    fc(2, 'Three plasma proteins and their jobs?', 'Albumin: osmotic balance; globulins: defence; fibrinogen: clotting.', 'concept', 1),
    fc(3, 'What is serum?', 'Plasma without fibrinogen and the other clotting factors.', 'definition', 1),
    fc(4, 'Why do mammalian RBCs lack a nucleus?', 'More room for haemoglobin.', 'concept', 1),
    fc(5, 'Which WBC is the most abundant?', 'Neutrophil (60 to 65 percent).', 'fact', 1),
    fc(6, 'What do platelets do?', 'They help blood to clot.', 'fact', 1),
    fc(7, 'What converts fibrinogen to fibrin?', 'Thrombin.', 'fact', 1),
    fc(8, 'Which ion is needed to make thrombin?', 'Calcium ions.', 'fact', 1),
    fc(9, 'Who discovered the ABO groups?', 'Karl Landsteiner (1900).', 'fact', 2),
    fc(10, 'Antigens and antibodies of group A?', 'Antigen A; anti-B antibody.', 'fact', 2),
    fc(11, 'Antibodies of group O?', 'Both anti-A and anti-B.', 'fact', 2),
    fc(12, 'Universal donor and recipient?', 'Group O donor; group AB recipient.', 'fact', 2),
    fc(13, 'What is the Rh factor?', 'An antigen on red cells, first found in the rhesus monkey.', 'definition', 2),
    fc(14, 'Erythroblastosis foetalis?', 'Destruction of an Rh-positive foetus’s red cells by anti-Rh antibodies of an Rh-negative mother.', 'definition', 2),
    fc(15, 'How is the risk to a second baby prevented?', 'Anti-Rh antibodies are given to the mother soon after the first delivery.', 'concept', 2),
    fc(16, 'Lymph compared with blood?', 'No red cells, fewer proteins, mainly lymphocytes.', 'concept', 3),
    fc(17, 'Two functions of lymph nodes?', 'Filter lymph and trap germs; produce lymphocytes.', 'fact', 3),
    fc(18, 'Open circulation: example and feature?', 'Cockroach; blood flows in open sinuses.', 'fact', 3),
    fc(19, 'Closed circulation: example?', 'Earthworm and vertebrates.', 'fact', 3),
    fc(20, 'Which valve is between the left auricle and ventricle?', 'The bicuspid (mitral) valve.', 'fact', 4),
    fc(21, 'Which ventricle has the thickest wall?', 'The left ventricle.', 'fact', 4),
    fc(22, 'Phases of the cardiac cycle?', 'Atrial systole, ventricular systole, joint diastole.', 'fact', 4),
    fc(23, 'Length of a cardiac cycle at 75 beats a minute?', '0.8 second.', 'formula', 4),
    fc(24, 'Cardiac output formula?', 'Stroke volume × heart rate.', 'formula', 4),
    fc(25, 'Where does the heartbeat start?', 'In the SA node (pacemaker).', 'fact', 5),
    fc(26, 'What does the P wave show?', 'Excitation (depolarisation) of the auricles.', 'fact', 5),
    fc(27, 'What does the QRS complex show?', 'Excitation of the ventricles.', 'fact', 5),
    fc(28, 'Normal and high blood pressure?', 'About 120/80; 140/90 or above is hypertension.', 'fact', 5),
    fc(29, 'Cause of coronary artery disease?', 'Deposits of calcium, fat and cholesterol narrow the coronary arteries.', 'concept', 6),
    fc(30, 'What is angina pectoris?', 'Chest pain when the heart muscle gets too little oxygen.', 'definition', 6),
  ],
  status: 'draft',
  provenance: PROV,
};
