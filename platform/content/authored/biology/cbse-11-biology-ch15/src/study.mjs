// ch15 notes and flashcards.
import { T, table, unit, PROV, r } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { BLOOD, HEART } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = [], formulas = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Body Fluids and Circulation — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Blood, blood groups, coagulation and lymph',
      `Simple organisms such as sponges and coelenterates circulate water from their surroundings through their body cavities. Most higher organisms use special body fluids: **blood** and **lymph**.

**Blood** is a special connective tissue made of a fluid matrix, **plasma**, and **formed elements**.

**Plasma** (about **${BLOOD.plasmaPct} percent** of blood) is a straw-coloured, viscous fluid: **${BLOOD.waterInPlasma.join('–')} percent water** and **${BLOOD.proteinInPlasma.join('–')} percent proteins**. **Fibrinogen** is needed for clotting, **globulins** are mainly involved in defence, and **albumins** help in osmotic balance. Plasma also carries small amounts of minerals (sodium, calcium, magnesium, bicarbonate and chloride ions), glucose, amino acids and lipids in transit, and the **clotting factors** in an inactive form. Plasma without clotting factors is **serum**.

**Formed elements** (about **${BLOOD.formedPct} percent**):
- **Erythrocytes (RBCs)** are the most abundant cells: **${BLOOD.rbcMillion.join('–')} million per cubic millimetre** in a healthy adult man. In adults they are formed in the **red bone marrow**. Most mammalian RBCs have **no nucleus** and are **biconcave**. They contain the iron-containing red pigment **haemoglobin**, **${BLOOD.hb.join('–')} g per 100 mL** of blood, which transports respiratory gases. They live about **${BLOOD.rbcLifeDays} days** and are destroyed in the **spleen** (the graveyard of RBCs).
- **Leucocytes (WBCs)** are colourless (no haemoglobin), nucleated, relatively fewer (**6000–8000 per cubic millimetre**) and generally short-lived. **Granulocytes**: neutrophils (most abundant, **60–65 percent**, phagocytic), eosinophils (**2–3 percent**, resist infections, associated with allergic reactions) and basophils (least, **0.5–1 percent**, secrete histamine, serotonin and heparin; inflammatory reactions). **Agranulocytes**: lymphocytes (**20–25 percent**, B and T forms, immune responses) and monocytes (**6–8 percent**, phagocytic).
- **Platelets (thrombocytes)** are cell fragments produced from **megakaryocytes** in the bone marrow, **1.5–3.5 lakh per cubic millimetre**. They release substances involved in coagulation; a fall in their number can cause clotting disorders and excessive loss of blood.

(Counts are typical textbook values; laboratories quote slightly different normal ranges.)

**ABO grouping** depends on the presence or absence of **antigens A and B** on the RBC surface; plasma contains **natural antibodies** against the antigen that is absent. Group A (antigen A, anti-B) receives from A and O; group B (antigen B, anti-A) from B and O; group AB (both antigens, no antibodies) from all groups — the **universal recipient**; group O (no antigens, both antibodies) only from O but can donate to all — the **universal donor**. Donor blood must be matched before transfusion to avoid clumping (destruction) of RBCs.

**Rh grouping:** the Rh antigen, similar to one in Rhesus monkeys, is present on the RBCs of nearly **${BLOOD.rhPositivePct} percent** of humans (Rh positive). An **Rh-negative** person exposed to Rh-positive blood forms specific antibodies against the Rh antigen. In pregnancy, if the mother is Rh negative and the foetus Rh positive, the placenta keeps the bloods apart in the first pregnancy, but at the first delivery the mother may be exposed to a small amount of foetal blood and begins to make anti-Rh antibodies. In later pregnancies these can leak into the foetal blood and destroy its RBCs, causing severe anaemia and jaundice — **erythroblastosis foetalis**. It is avoided by giving **anti-Rh antibodies** to the mother immediately after the first delivery.

**Coagulation:** a clot (coagulum) is a network of **fibrin** threads trapping dead and damaged formed elements. Fibrin forms from inactive **fibrinogen** by the enzyme **thrombin**; thrombin forms from inactive **prothrombin**, a reaction that needs the enzyme complex **thrombokinase**. Thrombokinase forms by a **cascade** of linked enzymic reactions involving factors present in plasma in an inactive state. An injury stimulates **platelets** to release factors that start the cascade; factors released by damaged **tissues** can also start it. **Calcium ions** play a very important role.

**Lymph:** as blood passes through capillaries, water and small water-soluble substances move into the spaces between cells, leaving larger proteins and most formed elements in the vessels. This **interstitial (tissue) fluid** has the same mineral distribution as plasma; nutrients and gases are exchanged between blood and cells through it. The **lymphatic system** collects it and drains it back into major veins; the fluid inside is **lymph** — colourless, with specialised **lymphocytes** for immune responses. Lymph carries nutrients and hormones, and **fats are absorbed through lymph in the lacteals** of the intestinal villi.`,
      [kt('Serum', 'Plasma without the clotting factors.'), kt('Universal donor', 'Group O: its red cells carry neither antigen A nor B.'), kt('Erythroblastosis foetalis', 'Destruction of foetal red cells by the mother’s anti-Rh antibodies in a later Rh-positive pregnancy.'), kt('Thrombokinase', 'Enzyme complex formed by a cascade of plasma factors; needed to convert prothrombin to thrombin.'), kt('Lymph', 'Colourless tissue fluid in the lymphatic vessels, with lymphocytes; drained back into major veins.')],
      V.wbc,
      [1],
      [V.abo, V.clot],
    ),
    sec(
      '2. Circulatory pathways, the human heart and the cardiac cycle',
      `**Circulatory pathways.** In an **open** system (arthropods, molluscs) blood pumped by the heart passes through large vessels into open spaces or body cavities called **sinuses**. In a **closed** system (annelids, chordates) blood is always pumped through a closed network of vessels, which allows more precise regulation of flow. All vertebrates have a muscular, chambered heart: **fishes 2 chambers** (an atrium and a ventricle), **amphibians and reptiles 3** (two atria, one ventricle; crocodiles are the exception), and **crocodiles, birds and mammals 4**. In fishes the heart pumps out deoxygenated blood, which is oxygenated in the gills and supplied to the body (**single circulation**). In amphibians and reptiles the left atrium receives oxygenated blood (from gills, lungs or skin) and the right atrium deoxygenated blood, and they mix in the single ventricle (**incomplete double circulation**). Birds and mammals have two separate pathways (**double circulation**).

**The human heart** is mesodermal in origin, lies in the thoracic cavity between the two lungs, slightly tilted to the left, and is about the size of a clenched fist. It is protected by a double-walled membranous bag, the **pericardium**, enclosing **pericardial fluid**. It has two small upper **atria** and two larger lower **ventricles**. A thin **interatrial septum** separates the atria and a thick **interventricular septum** the ventricles; a thick fibrous **atrio-ventricular septum** separates the atrium and ventricle of each side, with an opening guarded by the **tricuspid valve** (right) or the **bicuspid (mitral) valve** (left). The openings of the right and left ventricles into the **pulmonary artery** and **aorta** have **semilunar valves**. Valves allow blood to flow in one direction only. The heart is made of cardiac muscle; the ventricle walls are much thicker than those of the atria.

**Nodal tissue** is specialised cardiac musculature. The **sino-atrial node (SAN)** lies in the right upper corner of the right atrium; the **atrio-ventricular node (AVN)** in the lower left corner of the right atrium, close to the atrio-ventricular septum. The **atrio-ventricular bundle** runs from the AVN through the septum to the top of the interventricular septum and divides into right and left bundles, which give rise to minute **Purkinje fibres** throughout the ventricular muscle; the bundles and Purkinje fibres together form the **bundle of His**. Nodal muscle is **autoexcitable**. The SAN generates the most action potentials, **${HEART.sanRate.join('–')} per minute**, so it is the **pacemaker**; the normal heart rate is **${HEART.rate} beats per minute**.

**Cardiac cycle.** In **joint diastole** all four chambers are relaxed; the tricuspid and bicuspid valves are open and the semilunar valves closed, and blood flows from the pulmonary veins and venae cavae through the atria into the ventricles. The SAN fires and both atria contract (**atrial systole**), increasing the flow into the ventricles by about **30 percent**. The impulse passes through the AVN and AV bundle, and the bundle of His spreads it through the ventricles, which contract (**ventricular systole**) while the atria relax. Rising ventricular pressure **closes the tricuspid and bicuspid valves** (attempted backflow) and then **forces open the semilunar valves**, so blood enters the pulmonary artery and aorta. The ventricles then relax (**ventricular diastole**); the **semilunar valves close**, and as the pressure falls further the AV valves are pushed open by blood in the atria. All chambers are again in joint diastole until the SAN fires again.

With **${HEART.rate} beats per minute**, one cardiac cycle lasts about **${HEART.cycle} s**. Each ventricle pumps about **${HEART.stroke} mL** per cycle (**stroke volume**). **Cardiac output = stroke volume × heart rate**, about **5000 mL (5 L) per minute** in a healthy person; an athlete’s cardiac output can be much higher. The first heart sound, **lub**, comes from closure of the tricuspid and bicuspid valves; the second, **dub**, from closure of the semilunar valves.

**Electrocardiogram (ECG):** a graph of the electrical activity of the heart during a cardiac cycle. For a standard ECG, leads are attached to each wrist and to the left ankle. The **P wave** is depolarisation of the atria (leading to their contraction); the **QRS complex** is depolarisation of the ventricles, which starts ventricular contraction shortly after Q and marks the beginning of systole; the **T wave** is the return of the ventricles to the normal state (repolarisation), and its end marks the end of systole. Counting QRS complexes in a given time gives the heart rate; deviations from the normal shape indicate abnormality or disease.`,
      [kt('Pacemaker', 'The sino-atrial node, which generates the most action potentials (70–75 per minute) and sets the heart rate.'), kt('Bundle of His', 'The right and left bundles and the Purkinje fibres that carry the impulse through the ventricles.'), kt('Stroke volume', 'Volume of blood pumped by each ventricle in one cardiac cycle, about 70 mL.'), kt('Cardiac output', 'Volume pumped by each ventricle per minute: stroke volume times heart rate, about 5 L.')],
      V.heart,
      [2],
      [V.ecg],
      [{ label: 'Cardiac output', latex: r`\text{cardiac output} = \text{stroke volume} \times \text{heart rate}` }],
    ),
    sec(
      '3. Double circulation and regulation of cardiac activity',
      `Blood pumped by the **right ventricle** enters the **pulmonary artery** and is carried to the lungs; oxygenated blood returns by the **pulmonary veins** to the **left atrium** — the **pulmonary circulation**. Blood pumped by the **left ventricle** enters the **aorta** and is carried by arteries, arterioles and capillaries to the tissues; deoxygenated blood is collected by venules, veins and the **venae cavae** and emptied into the **right atrium** — the **systemic circulation**. The systemic circulation supplies nutrients, oxygen and other essential substances to the tissues and takes carbon dioxide and other harmful substances away for elimination. This passage of blood twice through the heart in one complete circuit is **double circulation**.

A unique vascular connection, the **hepatic portal system**, links the digestive tract and the liver: the **hepatic portal vein** carries blood from the intestine to the liver before it is delivered to the systemic circulation. A special **coronary system** of blood vessels serves only the circulation of blood to and from the cardiac muscle.

**Regulation.** Normal heart activity is regulated intrinsically, that is auto-regulated by the nodal tissue, so the heart is called **myogenic**. A special neural centre in the **medulla oblongata** can moderate cardiac function through the **autonomic nervous system**. **Sympathetic** nerves increase the rate of the heartbeat and the strength of ventricular contraction, and thereby the cardiac output. **Parasympathetic** signals decrease the heart rate and the speed of conduction of the action potential, and thereby the cardiac output. **Adrenal medullary hormones** can also increase the cardiac output.`,
      [kt('Pulmonary circulation', 'Right ventricle → pulmonary artery → lungs → pulmonary veins → left atrium.'), kt('Systemic circulation', 'Left ventricle → aorta → tissues → venae cavae → right atrium.'), kt('Hepatic portal system', 'Hepatic portal vein carrying blood from the intestine to the liver before it enters the systemic circulation.'), kt('Myogenic heart', 'A heart whose beat starts in its own specialised muscle (nodal tissue).')],
      V.double,
      [3],
    ),
    sec(
      '4. Disorders of the circulatory system',
      `- **High blood pressure (hypertension):** blood pressure higher than normal (**120/80 mm Hg**; 120 is the systolic, or pumping, pressure and 80 the diastolic, or resting, pressure). If repeated checks show **140/90 mm Hg or higher**, it is hypertension. It leads to heart disease and also affects vital organs such as the **brain and kidneys**.
- **Coronary artery disease (CAD)**, often called **atherosclerosis**, affects the vessels supplying blood to the heart muscle. Deposits of **calcium, fat, cholesterol and fibrous tissue** make the lumen of the arteries narrower.
- **Angina (angina pectoris):** a symptom of **acute chest pain** when not enough oxygen reaches the heart muscle. It can occur in men and women of any age but is more common among the middle-aged and elderly, and arises from conditions that affect blood flow.
- **Heart failure:** the heart is not pumping blood effectively enough to meet the needs of the body. It is sometimes called **congestive heart failure** because congestion of the lungs is one of its main symptoms. It is **not the same as cardiac arrest** (the heart stops beating) or a **heart attack** (heart muscle is suddenly damaged by an inadequate blood supply).`,
      [kt('Hypertension', 'Blood pressure of 140/90 mm Hg or higher on repeated checks.'), kt('Atherosclerosis', 'Narrowing of the coronary arteries by deposits of calcium, fat, cholesterol and fibrous tissue.'), kt('Angina pectoris', 'Acute chest pain when the heart muscle gets too little oxygen.'), kt('Heart failure', 'Heart not pumping effectively enough for the body’s needs; lungs congested.')],
      table(['Condition', 'Heart beating?', 'Cause or meaning'], [['Heart failure', 'Yes, but weakly', 'Pumping not enough for the body’s needs'], ['Heart attack', 'Usually yes', 'Heart muscle suddenly damaged by inadequate blood supply'], ['Cardiac arrest', 'No', 'Heart stops beating']], 'Table distinguishing heart failure, heart attack and cardiac arrest'),
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing that group AB is the universal donor (it is the universal recipient; O is the universal donor).
- Saying anti-Rh antibodies are present from birth (they form only after exposure to Rh-positive blood).
- Placing the semilunar valves between the atria and ventricles (they guard the pulmonary artery and aorta).
- Calling the AVN the pacemaker (the SAN is the pacemaker).
- Saying the T wave shows atrial contraction (it is ventricular repolarisation).
- Treating heart failure, heart attack and cardiac arrest as the same.

**How marks are usually awarded**
- 1-mark items: a plasma protein, a WBC type, a valve, an ECG wave, a blood group fact.
- 2–3-mark answers: plasma composition; ABO and Rh; clotting steps; nodal tissue; cardiac cycle; double circulation; regulation; hypertension and CAD.
- 5-mark answers: composition of blood; the heart and the cardiac cycle with ECG; double circulation and regulation; disorders.
- Numericals: cardiac output, cycle length, heart rate from an ECG, shares of blood components — always show the formula and units.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Share of plasma and formed elements in blood?', 'Plasma about 55 percent; formed elements about 45 percent.', 'fact', 1),
    fc(2, 'Three major plasma proteins and roles?', 'Fibrinogen (clotting), globulins (defence), albumins (osmotic balance).', 'concept', 1),
    fc(3, 'What is serum?', 'Plasma without the clotting factors.', 'definition', 1),
    fc(4, 'RBC count of a healthy adult man?', '5 to 5.5 million per cubic millimetre.', 'fact', 1),
    fc(5, 'Where are RBCs formed and destroyed?', 'Formed in red bone marrow; destroyed in the spleen (graveyard of RBCs).', 'fact', 1),
    fc(6, 'Haemoglobin content of blood?', '12 to 16 g per 100 mL.', 'fact', 1),
    fc(7, 'Most and least abundant WBCs?', 'Neutrophils (60–65 percent); basophils (0.5–1 percent).', 'fact', 1),
    fc(8, 'Which WBCs are phagocytic?', 'Neutrophils and monocytes.', 'fact', 1),
    fc(9, 'Role of basophils?', 'Secrete histamine, serotonin and heparin; inflammatory reactions.', 'fact', 1),
    fc(10, 'Platelets come from?', 'Megakaryocytes in the bone marrow; 1.5–3.5 lakh per cubic mm.', 'fact', 1),
    fc(11, 'Universal donor and universal recipient?', 'Donor: group O. Recipient: group AB.', 'concept', 1),
    fc(12, 'Antibodies in the plasma of group B?', 'Anti-A.', 'fact', 1),
    fc(13, 'Share of humans who are Rh positive?', 'Nearly 80 percent.', 'fact', 1),
    fc(14, 'Erythroblastosis foetalis?', 'Mother’s anti-Rh antibodies destroy the red cells of a later Rh-positive foetus.', 'definition', 1),
    fc(15, 'Clotting sequence?', 'Thrombokinase; prothrombin to thrombin; fibrinogen to fibrin; calcium ions needed.', 'concept', 1),
    fc(16, 'What is lymph?', 'Tissue fluid in lymphatic vessels; colourless, with lymphocytes; drains into major veins.', 'definition', 1),
    fc(17, 'Open versus closed circulation?', 'Open: blood enters sinuses (arthropods, molluscs). Closed: blood stays in vessels (annelids, chordates).', 'concept', 2),
    fc(18, 'Heart chambers in fish, frog and bird?', '2, 3 and 4.', 'fact', 2),
    fc(19, 'Valve between left atrium and left ventricle?', 'Bicuspid (mitral) valve.', 'fact', 2),
    fc(20, 'Where is the SAN?', 'Right upper corner of the right atrium.', 'fact', 2),
    fc(21, 'Why is the SAN the pacemaker?', 'It generates the most action potentials, 70–75 per minute.', 'concept', 2),
    fc(22, 'What causes lub and dub?', 'Lub: closure of tricuspid and bicuspid valves. Dub: closure of semilunar valves.', 'concept', 2),
    fc(23, 'Cardiac output formula and value?', 'Stroke volume × heart rate; about 5000 mL per minute.', 'formula', 2),
    fc(24, 'ECG: P, QRS and T?', 'P: atrial depolarisation. QRS: ventricular depolarisation. T: ventricular repolarisation.', 'concept', 2),
    fc(25, 'Pulmonary circulation?', 'Right ventricle → pulmonary artery → lungs → pulmonary veins → left atrium.', 'concept', 3),
    fc(26, 'Hepatic portal vein?', 'Carries blood from the intestine to the liver before the systemic circulation.', 'fact', 3),
    fc(27, 'Neural centre that moderates the heart?', 'Medulla oblongata, through the autonomic nervous system.', 'fact', 3),
    fc(28, 'Sympathetic versus parasympathetic effect on the heart?', 'Sympathetic raises rate, force and output; parasympathetic lowers rate, conduction and output.', 'concept', 3),
    fc(29, 'Hypertension threshold?', 'Repeated readings of 140/90 mm Hg or higher (normal 120/80).', 'fact', 4),
    fc(30, 'Angina pectoris?', 'Acute chest pain when not enough oxygen reaches the heart muscle.', 'definition', 4),
    fc(31, 'Heart failure versus cardiac arrest?', 'Failure: pumping too weak for needs. Arrest: the heart stops beating.', 'concept', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
