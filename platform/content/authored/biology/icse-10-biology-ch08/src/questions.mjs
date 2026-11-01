// ICSE 10 Biology ch08 Circulatory System: Heart, Blood Vessels and Circulation — question bank in ICSE 2027 style.
// Cycle length, cardiac output, pulse rates, pressure difference and blood-sample differences come from calc.mjs.
// Vessel names: only the main vessels of the heart, liver and kidney (removed topic).
// AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true, R does not explain.
import { mk, add, svgV, r } from '../../icse-10-biology-ch01/src/lib.mjs';
import { CYCLE, REST, PULSE, BP, RACE, MEAL, ATHLETE, cycleSec } from './calc.mjs';
import { HEART_LETTERED, CARDIAC } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, match, part } = mk;
const heartFig = svgV(HEART_LETTERED, 'Longitudinal section of the heart with five parts lettered A to E');
const cycleFig = svgV(CARDIAC, 'Timeline of one cardiac cycle with the state of the valves');

// ---------------------------------------------------------------- t01 structure of the heart
add('thick-lv-mcq', mcq({
  stem: 'The wall of the left ventricle is about three times as thick as the wall of the right ventricle because the left ventricle',
  right: 'pumps blood to the whole body, which needs a much higher pressure', wrong: ['receives blood from the whole body', 'pumps blood only to the lungs', 'holds more blood than the right ventricle'],
  sol: 'The left ventricle drives blood round the long systemic circuit; the right ventricle pumps only to the nearby lungs — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('tricuspid-mcq', mcq({
  stem: 'The valve between the right auricle and the right ventricle is the',
  right: 'tricuspid valve', wrong: ['bicuspid valve', 'semilunar valve of the aorta', 'semilunar valve of the pulmonary artery'],
  sol: 'The right auriculo-ventricular valve has three flaps: the tricuspid valve — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('chordae-mcq', mcq({
  stem: 'What is the role of the chordae tendineae in the heart?',
  right: 'They stop the flaps of the tricuspid and bicuspid valves from turning back into the auricles when the ventricles contract', wrong: ['They carry blood to the heart muscle', 'They open the semilunar valves', 'They divide the heart into right and left halves'],
  sol: 'The cords anchor the valve flaps to papillary muscles, so the flaps cannot be pushed up into the auricles — option (@K).',
  d: 3, c: 'understanding', t: [1],
}));
add('pericardium-mcq', mcq({
  stem: 'The heart is enclosed in a double-layered membrane with fluid between the layers. The membrane and the use of its fluid are',
  right: 'the pericardium; the fluid reduces friction as the heart beats and protects it', wrong: ['the septum; the fluid carries oxygen to the heart', 'the diaphragm; the fluid cools the heart', 'the pleura; the fluid stores glucose'],
  sol: 'Pericardial fluid between the two layers of the pericardium lets the heart beat with little friction and cushions it — option (@K).',
  d: 2, c: 'recall', t: [1],
}));
add('pv-mcq', mcq({
  stem: 'During heart surgery, a sample taken from a vessel that opens into the left auricle is bright red and rich in oxygen. The vessel is',
  right: 'a pulmonary vein', wrong: ['the superior vena cava', 'the pulmonary artery', 'the aorta'],
  sol: 'The pulmonary veins return oxygenated blood from the lungs to the left auricle — option (@K).',
  d: 2, c: 'application', t: [1, 3],
}));
add('pa-mcq', mcq({
  stem: 'The pulmonary artery is unusual among arteries because it',
  right: 'carries deoxygenated blood', wrong: ['carries blood towards the heart', 'has valves along its whole length', 'has a wall only one cell thick'],
  sol: 'Like all arteries it carries blood away from the heart, but its blood is deoxygenated, going to the lungs — option (@K).',
  d: 2, c: 'understanding', t: [1, 4],
}));
add('heart-fig-mcq', mcq({
  stem: 'In the figure, which letter marks the structure that stops blood flowing back from the right ventricle into the right auricle?',
  right: 'B', wrong: ['A', 'C', 'E'],
  sol: 'B is the tricuspid valve between the right auricle and right ventricle. A is the left ventricle, C the pulmonary artery, E a semilunar valve — option (@K).',
  d: 2, c: 'application', t: [1],
  assets: [heartFig],
}));
add('septum-mcq', mcq({
  stem: 'A baby is born with a hole in the septum between the two ventricles. The main effect is that',
  right: 'oxygenated and deoxygenated blood mix, so less oxygen reaches the body', wrong: ['the heart stops pumping blood to the lungs', 'blood cannot enter the auricles', 'the valves of the heart cannot close'],
  sol: 'The septum keeps the two kinds of blood apart; through a hole they mix and the body receives less oxygen — option (@K).',
  d: 3, c: 'application', t: [1, 3],
}));
add('lv-ar', ar({
  a: 'The left ventricle has the thickest wall of all four chambers.',
  r: 'It pumps blood into the aorta, which carries blood to all parts of the body.',
  key: 'c',
  sol: 'Both are true, and pumping blood round the whole body needs a strong, thick muscular wall — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('pa-ar', ar({
  a: 'The pulmonary artery carries oxygenated blood.',
  r: 'Arteries carry blood away from the heart.',
  key: 'b',
  sol: 'The assertion is false: the pulmonary artery carries deoxygenated blood to the lungs. The reason is true — option (b).',
  d: 3, c: 'analysis', t: [1, 4],
}));
add('bicuspid-tf', tf({
  stem: 'The bicuspid valve lies between the right auricle and the right ventricle.',
  key: 'f',
  sol: 'False. The bicuspid (mitral) valve is on the left side, between the left auricle and the left ventricle.',
  d: 1, c: 'recall', t: [1],
}));
add('bicuspid-fill', fill({
  stem: 'The valve with two flaps between the left auricle and the left ventricle is the ______ valve.',
  acc: [['bicuspid', 'mitral']],
  sol: 'Bicuspid (mitral).',
  d: 1, c: 'recall', t: [1],
}));
add('pericard-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the double-layered membrane that encloses the heart.',
  model: '**Pericardium.**',
  sol: 'Pericardium.', scheme: [['Pericardium', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('odd-valves', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Tricuspid, Septum, Bicuspid, Semilunar.',
  model: '**Septum**; the others are **valves of the heart**.',
  sol: 'The septum is the wall between the right and left halves.', scheme: [['Odd one and category', 1]],
  d: 2, c: 'analysis', t: [1],
}));
add('odd-oxy', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Aorta, Pulmonary vein, Pulmonary artery, Left ventricle.',
  model: '**Pulmonary artery**; the others **carry or contain oxygenated blood**.',
  sol: 'The pulmonary artery carries deoxygenated blood.', scheme: [['Odd one and category', 1]],
  d: 3, c: 'analysis', t: [1, 3],
}));
add('path-short', short({
  marks: 3,
  stem: 'Trace the path of a red blood cell from the venae cavae to the aorta, naming the chambers and valves it passes through.',
  model: 'Venae cavae → **right auricle** → **tricuspid valve** → **right ventricle** → **semilunar valve** → pulmonary artery → lungs → pulmonary veins → **left auricle** → **bicuspid valve** → **left ventricle** → **semilunar valve** → aorta.',
  sol: 'Right side, lungs, left side.',
  scheme: [['Right auricle, tricuspid, right ventricle', 1], ['Pulmonary artery, lungs, pulmonary veins', 1], ['Left auricle, bicuspid, left ventricle, aorta with semilunar valves', 1]],
  d: 2, c: 'application', t: [1, 2], wl: [25, 70],
}));
add('heart-draw', short({
  marks: 3, wl: null,
  stem: 'Draw a neat, labelled diagram of the longitudinal section of the human heart. Label the four chambers, the tricuspid and bicuspid valves, the aorta and the pulmonary artery.',
  model: 'A heart outline with the **right auricle and ventricle** on the viewer\'s left and the **left auricle and ventricle** on the right; the **left ventricle wall thickest**; the **tricuspid** and **bicuspid** valves with cords between auricles and ventricles; the **pulmonary artery** from the right ventricle and the **aorta** from the left ventricle, each with a semilunar valve; venae cavae and pulmonary veins entering the auricles.',
  sol: 'Labelled L.S. of the heart.',
  scheme: [['Four chambers, left ventricle thickest', 1], ['Valves drawn in place', 1], ['Main vessels and labels', 1]],
  d: 3, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 working of the heart
add('lubb-mcq', mcq({
  stem: 'The first heart sound, "lubb", heard through a stethoscope is caused by',
  right: 'the closing of the tricuspid and bicuspid valves as the ventricles begin to contract', wrong: ['the closing of the semilunar valves as the ventricles relax', 'the opening of the semilunar valves', 'blood striking the wall of the aorta'],
  sol: 'At the start of ventricular systole the auriculo-ventricular valves snap shut: lubb. Dub is the closing of the semilunar valves — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('systole-mcq', mcq({
  stem: 'Which statement describes the valves during ventricular systole?',
  right: 'The tricuspid and bicuspid valves are closed; the semilunar valves are open', wrong: ['All four valves are open', 'The tricuspid and bicuspid valves are open; the semilunar valves are closed', 'All four valves are closed throughout'],
  sol: 'Contracting ventricles push the auricular valves shut and force the semilunar valves open — option (@K).',
  d: 3, c: 'understanding', t: [2],
}));
add('diastole-mcq', mcq({
  stem: 'During joint diastole, when all four chambers are relaxed,',
  right: 'blood flows from the veins into the auricles and on into the ventricles', wrong: ['blood is pumped into the aorta', 'the semilunar valves are open', 'the ventricles push blood back into the auricles'],
  sol: 'With the heart relaxed, the auricular valves are open and the chambers fill from the veins — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('valves-count-mcq', mcq({
  stem: 'A red blood cell enters the right auricle. Counting from there, how many heart valves does it pass through before it reaches the aorta?',
  right: '4', wrong: ['2', '3', '5'],
  sol: 'Tricuspid, semilunar valve of the pulmonary artery, then (after the lungs) bicuspid and semilunar valve of the aorta: four — option (@K).',
  d: 4, c: 'analysis', t: [1, 2, 3],
}));
add('dub-tf', tf({
  stem: 'The second heart sound, "dub", is made when the semilunar valves close.',
  key: 't',
  sol: 'True. As the ventricles relax, blood tries to flow back from the arteries and shuts the semilunar valves.',
  d: 2, c: 'recall', t: [2],
}));
add('cycle-num', num({
  stem: `A person's heart beats ${CYCLE.bpm} times a minute. How long, in seconds, does one cardiac cycle last?`,
  value: cycleSec(CYCLE.bpm), unit: 's',
  sol: r`$\dfrac{60}{${CYCLE.bpm}} = ${cycleSec(CYCLE.bpm)}$ seconds per cycle.`,
  scheme: [[`${cycleSec(CYCLE.bpm)} s`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 0.8 || 'value');
add('output-num', num({
  stem: `At rest, Rekha's heart beats ${REST.bpm} times a minute and pumps ${REST.stroke} mL of blood at each beat from the left ventricle. How many litres of blood does it pump in one minute?`,
  value: REST.output, unit: 'L',
  sol: r`$${REST.bpm} \times ${REST.stroke} = ${REST.bpm * REST.stroke}$ mL $= ${REST.output}$ litres per minute.`,
  scheme: [[`${REST.output} litres per minute`, 1]],
  d: 3, c: 'application', t: [2],
}), (q) => q.answer.value === 5.04 || 'value');
add('systole-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the phase in which a chamber of the heart contracts.',
  model: '**Systole.**',
  sol: 'Systole.', scheme: [['Systole', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('valve-short', short({
  marks: 2,
  stem: 'Relate the opening and closing of the heart valves to ventricular systole and diastole.',
  model: 'In **ventricular systole**, the tricuspid and bicuspid valves **close** and the semilunar valves **open**, so blood enters the arteries. In **diastole**, the semilunar valves **close**, stopping backflow, and the tricuspid and bicuspid **open**, so the ventricles fill.',
  sol: 'Opposite states in systole and diastole.',
  scheme: [['Systole: AV closed, semilunar open', 1], ['Diastole: semilunar closed, AV open', 1]],
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 double circulation
add('double-mcq', mcq({
  stem: 'Double circulation in mammals means that',
  right: 'blood passes through the heart twice in one complete round of the body', wrong: ['the heart has two chambers', 'blood flows in two directions in each vessel', 'each organ receives blood from two hearts'],
  sol: 'Blood goes heart → lungs → heart (pulmonary) and heart → body → heart (systemic) — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('pulm-mcq', mcq({
  stem: 'A harmless dye is injected into the right ventricle of a patient. Which organ will the dye reach first after leaving the heart?',
  right: 'The lungs', wrong: ['The brain', 'The liver', 'The kidneys'],
  sol: 'The right ventricle pumps blood only into the pulmonary artery, which goes to the lungs (pulmonary circuit) — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('advantage-mcq', mcq({
  stem: 'Which is an advantage of double circulation?',
  right: 'Oxygenated and deoxygenated blood do not mix, and blood is sent to the body at high pressure', wrong: ['The heart needs to beat only once a minute', 'Blood never needs to pass through the lungs', 'Veins can carry blood away from the heart'],
  sol: 'Separate circuits keep the two kinds of blood apart, and the left ventricle can pump at high pressure to the body — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('double-short', short({
  marks: 2,
  stem: 'What is double circulation? State one advantage of it to a mammal.',
  model: 'Blood passes through the heart **twice** in one round: **heart → lungs → heart** (pulmonary) and **heart → body → heart** (systemic). **Advantage:** oxygenated and deoxygenated blood are **kept separate**, so tissues get blood rich in oxygen at high pressure.',
  sol: 'Two circuits; no mixing.',
  scheme: [['Meaning', 1], ['Advantage', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 arteries, veins and capillaries
add('artery-wall-mcq', mcq({
  stem: 'Arteries have thick walls with muscle and elastic fibres because they',
  right: 'carry blood under high pressure in surges from the heart', wrong: ['carry blood at low pressure back to the heart', 'exchange materials with the cells', 'store blood between heartbeats'],
  sol: 'Thick, elastic walls withstand and smooth out the high-pressure surges from the ventricles — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('vein-valve-mcq', mcq({
  stem: 'Veins have valves along their length to',
  right: 'prevent the backflow of blood', wrong: ['increase blood pressure', 'let gases pass through the wall', 'pump blood away from the heart'],
  sol: 'The pocket valves close if blood tries to flow backwards, so it moves only towards the heart — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('capillary-mcq', mcq({
  stem: 'Food and oxygen pass from blood to the body cells through the capillaries because capillary walls',
  right: 'are only one cell thick', wrong: ['are made of thick muscle', 'have many valves', 'are lined with cartilage'],
  sol: 'A wall of a single layer of flat cells gives a very short path for diffusion — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('spurt-mcq', mcq({
  stem: 'After a deep cut on his forearm, bright red blood spurts out of Vikram\'s wound in jerks, in time with his heartbeat. The vessel cut is most likely',
  right: 'an artery', wrong: ['a vein', 'a capillary', 'a lymph vessel'],
  sol: 'Bright red, oxygenated blood under high, pulsing pressure comes from an artery — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('varicose-mcq', mcq({
  stem: 'A shopkeeper who stands all day develops swollen, twisted veins in his legs. The most likely cause is that',
  right: 'the valves in his leg veins have weakened, so blood collects in the veins', wrong: ['his arteries carry too little blood to the legs', 'his capillaries have become too thick', 'his heart pumps blood too fast'],
  sol: 'Leg veins lift blood against gravity; when their valves fail, blood pools and stretches them (varicose veins) — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('lumen-mcq', mcq({
  stem: 'Under a microscope, a cut blood vessel shows a thin wall with little muscle, a wide, flattened lumen and a pocket-like flap inside. It is most likely',
  right: 'a vein', wrong: ['an artery', 'a capillary', 'the aorta'],
  sol: 'A thin wall, a wide lumen and a valve are the marks of a vein — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('vein-ar', ar({
  a: 'Veins have thinner walls than arteries.',
  r: 'Veins have valves along their length.',
  key: 'd',
  sol: 'Both are true, but the valves do not explain the thin walls; the walls are thin because blood in veins is at low pressure — option (d).',
  d: 3, c: 'analysis', t: [4],
}));
add('capillary-ar', ar({
  a: 'Exchange of materials between blood and tissues takes place across capillaries.',
  r: 'Capillary walls are made of thick muscle.',
  key: 'a',
  sol: 'The assertion is true. The reason is false: capillary walls are one cell thick, which is what makes exchange possible — option (a).',
  d: 2, c: 'analysis', t: [4],
}));
add('reason-capillary', short({
  marks: 1, wl: null,
  stem: 'Give reason: oxygen and glucose pass easily from the blood to the cells through capillaries.',
  model: 'Capillary walls are **only one cell thick**, so substances **diffuse** across them quickly.',
  sol: 'One cell thick.', scheme: [['Wall one cell thick', 1]],
  d: 1, c: 'understanding', t: [4],
}));
add('reason-legs', short({
  marks: 1, wl: null,
  stem: 'Give reason: the veins of the legs have many valves.',
  model: 'Blood in the leg veins must flow **upwards against gravity** at low pressure; the valves **prevent it flowing back** down.',
  sol: 'Against gravity; no backflow.', scheme: [['Against gravity, valves stop backflow', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('artery-vein-short', short({
  marks: 2,
  stem: 'State two structural differences between an artery and a vein.',
  model: '1. An artery has a **thick, muscular, elastic wall**; a vein has a **thin wall** with little muscle.\n2. An artery has a **narrow lumen** and **no valves** along its length; a vein has a **wide lumen** and **valves**.',
  sol: 'Wall; lumen; valves.',
  scheme: [['First difference', 1], ['Second difference', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('vessel-table-short', short({
  marks: 3,
  stem: 'Tabulate three differences between an artery and a capillary.',
  model: '| Artery | Capillary |\n|---|---|\n| **Thick wall** of three layers with muscle | Wall **one cell thick** (endothelium only) |\n| Carries blood **away from the heart** to organs | **Connects** small arteries to small veins inside tissues |\n| **No exchange** of materials with cells | **Site of exchange** of gases, food and wastes |',
  sol: 'Wall; position; function.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [4], wl: [25, 70],
}));
add('vessel-draw', short({
  marks: 3, wl: null,
  stem: 'Draw neat, labelled diagrams of the transverse sections of an artery and a vein. Label the lumen and the muscle layer in each.',
  model: 'An **artery** as a circle with a **thick muscular and elastic wall** around a **small, round lumen**; a **vein** as a flattened, irregular outline with a **thin wall** and a **large lumen**; the **muscle layer** and **lumen** labelled in both.',
  sol: 'Two T.S. drawn and labelled.',
  scheme: [['Artery: thick wall, narrow lumen', 1], ['Vein: thin wall, wide lumen', 1], ['Labels', 1]],
  d: 3, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- t05 pulse and blood pressure
add('pulse-mcq', mcq({
  stem: 'The pulse felt at the wrist is',
  right: 'the rhythmic expansion of an artery each time the left ventricle pumps', wrong: ['the flow of blood in a vein', 'the sound of the valves closing', 'the contraction of the muscles of the wrist'],
  sol: 'Each beat sends a surge of blood that stretches the elastic artery wall — option (@K).',
  d: 1, c: 'understanding', t: [5],
}));
add('bp-mcq', mcq({
  stem: 'In a blood pressure reading of 120/80 mm Hg, the figure 80 is the',
  right: 'diastolic pressure, when the ventricles relax', wrong: ['systolic pressure, when the ventricles contract', 'pulse rate per minute', 'pressure inside the veins'],
  sol: 'The lower figure is the diastolic pressure in the arteries while the ventricles are relaxed — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('pulsevein-mcq', mcq({
  stem: 'A pulse cannot be felt in a vein because',
  right: 'blood in veins flows smoothly at low pressure, without surges', wrong: ['veins carry no blood between beats', 'veins lie deeper than arteries', 'veins have no walls'],
  sol: 'By the time blood reaches the veins, the surges of each heartbeat have died away — option (@K).',
  d: 3, c: 'understanding', t: [5, 4],
}));
add('pulse-num', num({
  stem: `Nikhil counts ${PULSE.rest} beats of his pulse in ${PULSE.seconds} seconds. What is his pulse rate per minute?`,
  value: PULSE.restRate,
  sol: r`$${PULSE.rest} \times \dfrac{60}{${PULSE.seconds}} = ${PULSE.restRate}$ beats per minute.`,
  scheme: [[`${PULSE.restRate} per minute`, 1]],
  d: 1, c: 'application', t: [5],
}), (q) => q.answer.value === 72 || 'value');
add('bp-ar', ar({
  a: 'Systolic pressure is higher than diastolic pressure.',
  r: 'Systolic pressure is recorded while the ventricles are relaxed.',
  key: 'a',
  sol: 'The assertion is true. The reason is false: systolic pressure is recorded while the ventricles contract; diastolic pressure while they relax — option (a).',
  d: 2, c: 'analysis', t: [5],
}));
add('pulse-tf', tf({
  stem: 'A person\'s pulse rate is normally the same as the heart rate.',
  key: 't',
  sol: 'True. Each contraction of the left ventricle produces one pulse wave.',
  d: 1, c: 'understanding', t: [5],
}));
add('sphyg-fill', fill({
  stem: 'Blood pressure is measured with an instrument called a ______.',
  acc: [['sphygmomanometer']],
  sol: 'Sphygmomanometer.',
  d: 1, c: 'recall', t: [5],
}));
add('bp-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the pressure of blood in the arteries while the ventricles are relaxing.',
  model: '**Diastolic pressure.**',
  sol: 'Diastolic pressure.', scheme: [['Diastolic pressure', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('reason-pulse', short({
  marks: 1, wl: null,
  stem: 'Give reason: counting the pulse at the wrist tells a doctor the heart rate.',
  model: 'Each **contraction of the left ventricle** sends **one pulse wave** along the arteries, so pulse rate **equals** heart rate.',
  sol: 'One wave per beat.', scheme: [['One pulse per heartbeat', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('bp-short', short({
  marks: 2,
  stem: `Nurse Joseph records a blood pressure of ${BP.systolic}/${BP.diastolic} mm Hg. What does each number mean?`,
  model: `**${BP.systolic}** is the **systolic pressure**: the highest pressure in the arteries, when the **ventricles contract**. **${BP.diastolic}** is the **diastolic pressure**: the lowest pressure, when the **ventricles relax**. Both are in millimetres of mercury.`,
  sol: 'Systolic; diastolic.',
  scheme: [['Systolic: ventricles contract', 1], ['Diastolic: ventricles relax', 1]],
  d: 2, c: 'application', t: [5],
}));
add('athlete-num', num({
  stem: `Rekha's heart pumps ${REST.output} litres of blood a minute at ${REST.bpm} beats a minute. A trained athlete's heart pumps the same volume at rest with only ${ATHLETE.bpm} beats a minute. How many millilitres does the athlete's heart pump at each beat?`,
  value: ATHLETE.stroke, unit: 'mL',
  sol: r`$${REST.output}$ litres $= ${Math.round(REST.output * 1000)}$ mL; $\dfrac{${Math.round(REST.output * 1000)}}{${ATHLETE.bpm}} = ${ATHLETE.stroke}$ mL per beat: a stronger heart pumps more at each beat.`,
  scheme: [[`${ATHLETE.stroke} mL per beat`, 1]],
  d: 3, c: 'application', t: [2, 5],
}), (q) => q.answer.value === 90 || 'value');

// ---------------------------------------------------------------- t06 vessels of the liver and kidney
add('hpv-mcq', mcq({
  stem: 'The hepatic portal vein carries blood',
  right: 'from the intestine to the liver', wrong: ['from the liver to the heart', 'from the heart to the liver', 'from the kidney to the liver'],
  sol: 'It collects blood rich in absorbed food from the intestine and takes it to the liver — option (@K).',
  d: 1, c: 'recall', t: [6],
}));
add('portal-mcq', mcq({
  stem: 'A portal vein is one that',
  right: 'begins in the capillaries of one organ and ends in the capillaries of another', wrong: ['carries blood straight from the heart to an organ', 'carries only oxygenated blood', 'has no valves and no wall'],
  sol: 'The hepatic portal vein starts in capillaries of the intestine and breaks up into capillaries in the liver — option (@K).',
  d: 2, c: 'understanding', t: [6],
}));
add('glucose-mcq', mcq({
  stem: 'An hour after a sweet, starchy meal, which blood vessel will carry blood with the most glucose?',
  right: 'Hepatic portal vein', wrong: ['Hepatic vein', 'Renal vein', 'Pulmonary vein'],
  sol: 'Glucose absorbed from the intestine travels in the hepatic portal vein; the liver stores the excess before blood leaves in the hepatic vein — option (@K).',
  d: 3, c: 'application', t: [6],
}));
add('renal-mcq', mcq({
  stem: 'Blood samples are taken from four vessels of a healthy person. Which sample will contain the least urea?',
  right: 'Renal vein', wrong: ['Renal artery', 'Hepatic vein', 'Aorta'],
  sol: 'The kidney removes urea, so blood leaving it in the renal vein has the least; the hepatic vein carries urea newly made by the liver — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('portal-ar', ar({
  a: 'Blood from the intestine passes through the liver before it reaches the heart.',
  r: 'The liver stores excess glucose as glycogen and removes harmful substances from the absorbed food.',
  key: 'c',
  sol: 'Both are true, and the liver\'s work on absorbed food explains why the hepatic portal vein delivers blood there first — option (c).',
  d: 3, c: 'analysis', t: [6],
}));
add('portal-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: an arrangement in which a vein carries blood from the capillaries of one organ to the capillaries of another organ.',
  model: '**Portal system** (for example, the hepatic portal system).',
  sol: 'Portal system.', scheme: [['Portal system', 1]],
  d: 2, c: 'recall', t: [6],
}));
add('odd-liver', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Hepatic artery, Renal artery, Hepatic vein, Hepatic portal vein.',
  model: '**Renal artery**; the others are **blood vessels of the liver**.',
  sol: 'The renal artery supplies the kidney.', scheme: [['Odd one and category', 1]],
  d: 2, c: 'analysis', t: [6],
}));
add('reason-portal', short({
  marks: 1, wl: null,
  stem: 'Give reason: digested food from the intestine is first taken to the liver and not straight to the heart.',
  model: 'The liver **stores excess glucose as glycogen** and **removes toxins** from the absorbed food before the blood reaches the rest of the body.',
  sol: 'Liver processes absorbed food.', scheme: [['Liver stores excess and removes toxins', 1]],
  d: 2, c: 'understanding', t: [6],
}));
add('liver-short', short({
  marks: 2,
  stem: 'Name the two blood vessels that bring blood to the liver and the one that takes blood away from it.',
  model: 'Blood is brought by the **hepatic artery** (oxygenated, from the aorta) and the **hepatic portal vein** (rich in digested food, from the intestine). It is taken away by the **hepatic vein** to the inferior vena cava.',
  sol: 'Hepatic artery, hepatic portal vein; hepatic vein.',
  scheme: [['Hepatic artery and hepatic portal vein', 1], ['Hepatic vein', 1]],
  d: 1, c: 'recall', t: [6],
}));

// ---------------------------------------------------------------- 5-mark Question 2 style items
add('heart-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [pericardium, auricles, ventricles, bicuspid, tricuspid, chordae tendineae, left ventricle, right ventricle]\n\nThe heart lies inside a double-layered membrane, the (a) ______. Its two thin-walled upper chambers, the (b) ______, receive blood from the veins. The valve between the left upper and left lower chambers is the (c) ______ valve, and its flaps are held in place by cords called (d) ______. The chamber with the thickest wall is the (e) ______.',
  acc: [['pericardium'], ['auricles', 'atria'], ['bicuspid', 'mitral'], ['chordae tendineae'], ['left ventricle']],
  sol: '(a) pericardium; (b) auricles; (c) bicuspid; (d) chordae tendineae; (e) left ventricle.',
  d: 2, c: 'understanding', t: [1],
}));
add('vessel-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [capillaries, valves, pulse, sphygmomanometer, stethoscope, hepatic portal vein, hepatic vein, arteries]\n\nVeins contain (a) ______ that prevent the backflow of blood. Food and oxygen leave the blood across the walls of the (b) ______. The throb felt at the wrist with each heartbeat is the (c) ______. Blood pressure is measured with a (d) ______. Blood rich in digested food reaches the liver in the (e) ______.',
  acc: [['valves'], ['capillaries'], ['pulse'], ['sphygmomanometer'], ['hepatic portal vein']],
  sol: '(a) valves; (b) capillaries; (c) pulse; (d) sphygmomanometer; (e) hepatic portal vein.',
  d: 2, c: 'understanding', t: [4, 5, 6],
}));
add('heart-match5', match({
  marks: 5,
  stem: 'Study the diagram of the heart and match each lettered part with its function.',
  pairs: [
    ['A', 'Pumps oxygenated blood into the aorta at high pressure'],
    ['B', 'Stops blood flowing back from the right ventricle into the right auricle'],
    ['C', 'Carries deoxygenated blood to the lungs'],
    ['D', 'Hold the valve flaps so that they cannot turn back into the auricle'],
    ['E', 'Stops blood flowing back from the pulmonary artery into the right ventricle'],
  ],
  order: [4, 2, 0, 3, 1],
  sol: 'A left ventricle; B tricuspid valve; C pulmonary artery; D chordae tendineae; E semilunar valve of the pulmonary artery.',
  d: 2, c: 'application', t: [1],
  assets: [heartFig],
}));

// ---------------------------------------------------------------- case-based (10 marks, Section B style)
add('heart-case', mk.case({
  stem: 'Study the diagram and answer the questions.',
  passage: 'The diagram shows a longitudinal section of the human heart as seen from the front. Five parts are lettered A to E.',
  d: 3, c: 'application',
  assets: [heartFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name the chamber labelled A.', model: '**Left ventricle.**', sol: 'Left ventricle.', scheme: [['Left ventricle', 1]], d: 1, c: 'recall', t: [1] })),
    part('b', short({ marks: 2, stem: 'Name the valve labelled B and state its function.', model: 'B is the **tricuspid valve**. It lets blood pass from the **right auricle into the right ventricle** and **closes** when the ventricle contracts, so blood cannot flow back into the auricle.', sol: 'Tricuspid valve.', scheme: [['Tricuspid', 1], ['Prevents backflow into the right auricle', 1]], d: 2, c: 'understanding', t: [1] })),
    part('c', short({ marks: 2, stem: 'Why is the wall of A much thicker than the wall of the right ventricle?', model: 'A (left ventricle) pumps blood into the **aorta** to **all parts of the body**, which needs a **high pressure**; the right ventricle pumps only to the **nearby lungs** at a lower pressure, so its wall is thinner.', sol: 'Whole body vs lungs.', scheme: [['A pumps to the whole body', 1], ['Needs higher pressure than the lungs', 1]], d: 2, c: 'understanding', t: [1] })),
    part('d', short({ marks: 2, stem: 'Name C and state why it is unusual among arteries.', model: 'C is the **pulmonary artery**. Unlike other arteries, it carries **deoxygenated blood**, from the right ventricle **to the lungs**.', sol: 'Pulmonary artery; deoxygenated.', scheme: [['Pulmonary artery', 1], ['Carries deoxygenated blood', 1]], d: 2, c: 'understanding', t: [1, 4] })),
    part('e', short({ marks: 3, stem: 'Trace the path of blood from the lungs, through the heart, to the body, naming the vessels, chambers and valves.', model: 'Lungs → **pulmonary veins** → **left auricle** → **bicuspid valve** → **left ventricle** (A) → **semilunar valve** → **aorta** → body. The left ventricle contracts, closing the bicuspid valve and opening the semilunar valve.', sol: 'Pulmonary veins to aorta.', scheme: [['Pulmonary veins, left auricle', 1], ['Bicuspid valve, left ventricle', 1], ['Semilunar valve, aorta', 1]], d: 2, c: 'application', t: [1, 3] }), [
      short({ marks: 3, stem: 'Name the structure labelled D and explain what would happen if D were torn.', model: 'D is the **chordae tendineae**, cords joining the valve flaps to papillary muscles. If they tore, the flaps would be **pushed back into the auricle** when the ventricle contracts, so blood would **leak back** into the auricle and the heart would pump less blood forward.', sol: 'Chordae tendineae; valve leaks.', scheme: [['Chordae tendineae', 1], ['Flaps turn back into the auricle', 1], ['Blood leaks back; less pumped forward', 1]], d: 4, c: 'analysis', t: [1, 2] }),
    ]),
  ],
}));
add('cycle-case', mk.case({
  stem: 'Study the diagram and answer the questions.',
  passage: `Dr Fernandes listened to Mira's heart with a stethoscope and heard a steady "lubb-dub" ${CYCLE.bpm} times a minute. The diagram shows what happens in one cardiac cycle at this rate.`,
  d: 4, c: 'analysis',
  assets: [cycleFig],
  children: [
    part('a', num({ stem: 'How long does one cardiac cycle of Mira\'s heart last, in seconds?', value: cycleSec(CYCLE.bpm), unit: 's', sol: r`$\dfrac{60}{${CYCLE.bpm}} = ${cycleSec(CYCLE.bpm)}$ seconds.`, scheme: [[`${cycleSec(CYCLE.bpm)} s`, 1]], d: 2, c: 'application', t: [2] })),
    part('b', short({ marks: 2, stem: 'Which valves close to make the "lubb" and which to make the "dub"?', model: '**Lubb:** the **tricuspid and bicuspid** valves close as the ventricles begin to contract. **Dub:** the **semilunar valves** close as the ventricles relax and blood presses back from the arteries.', sol: 'AV valves; semilunar valves.', scheme: [['Lubb: tricuspid and bicuspid', 1], ['Dub: semilunar', 1]], d: 2, c: 'understanding', t: [2] })),
    part('c', short({ marks: 2, stem: `According to the diagram, for how long are the semilunar valves open in each cycle, and where does blood go during this time?`, model: `For **${CYCLE.ventricular} s**, while the **ventricles contract**. Blood is pumped from the right ventricle into the **pulmonary artery** and from the left ventricle into the **aorta**.`, sol: `${CYCLE.ventricular} s; into the arteries.`, scheme: [[`${CYCLE.ventricular} s, ventricular systole`, 1], ['Into the pulmonary artery and aorta', 1]], d: 3, c: 'application', t: [2] })),
    part('d', short({ marks: 2, stem: 'Why are the chordae tendineae especially important during ventricular systole?', model: 'During ventricular systole the pressure in the ventricles is high. The chordae tendineae **hold the tricuspid and bicuspid flaps** so they are **not pushed back into the auricles**, preventing backflow.', sol: 'Prevent flaps turning back.', scheme: [['High pressure in systole', 1], ['Hold flaps; prevent backflow', 1]], d: 3, c: 'understanding', t: [1, 2] })),
    part('e', short({ marks: 3, stem: 'Some weeks later the doctor hears a soft swishing sound after each "lubb" and suspects that the bicuspid valve is not closing properly. Explain what happens to the blood and how the body is affected.', model: 'When the left ventricle contracts, some blood **leaks back** through the faulty **bicuspid valve** into the **left auricle**; the swishing sound is this backflow. **Less blood** goes into the aorta at each beat, so the heart must **beat faster or harder** to supply the body, and Mira may feel **tired and breathless**.', sol: 'Backflow into the left auricle; less output.', scheme: [['Backflow into the left auricle', 1], ['Less blood into the aorta', 1], ['Heart works harder; tiredness', 1]], d: 4, c: 'analysis', t: [2] })),
  ],
}), (q) => q.children[0].answer.value === 0.8 || 'value');
add('pulse-case', mk.case({
  passage: `Ishaan counted his pulse at the wrist for ${PULSE.seconds} seconds while sitting quietly: ${PULSE.rest} beats. He then skipped for two minutes and counted again at once: ${PULSE.after} beats in ${PULSE.seconds} seconds.`,
  d: 3, c: 'application',
  children: [
    part('a', num({ stem: 'What was Ishaan\'s pulse rate per minute at rest?', value: PULSE.restRate, sol: r`$${PULSE.rest} \times 4 = ${PULSE.restRate}$ beats per minute.`, scheme: [[`${PULSE.restRate}`, 1]], d: 1, c: 'application', t: [5] })),
    part('b', num({ stem: 'What was his pulse rate per minute just after skipping?', value: PULSE.afterRate, sol: r`$${PULSE.after} \times 4 = ${PULSE.afterRate}$ beats per minute.`, scheme: [[`${PULSE.afterRate}`, 1]], d: 1, c: 'application', t: [5] })),
    part('c', short({ marks: 2, stem: 'Explain why his pulse rate rose after skipping.', model: 'His leg and arm muscles were working hard and needed **more oxygen and glucose** and had to get rid of **more carbon dioxide**. The **heart beat faster** to pump more blood to them, and each beat makes one pulse.', sol: 'Muscles need more oxygen.', scheme: [['Muscles need more oxygen and food', 1], ['Heart beats faster, so pulse rises', 1]], d: 2, c: 'application', t: [5, 2] })),
    part('d', short({ marks: 3, stem: 'What is the pulse, and why can it be felt at the wrist but not over a vein?', model: 'The pulse is the **rhythmic stretching** of an **artery wall** as each surge of blood is pumped by the **left ventricle**. At the wrist an artery lies **close to the surface** over a bone. In veins, blood flows **smoothly at low pressure**, so there are **no surges** to feel.', sol: 'Artery expansion; no surges in veins.', scheme: [['Meaning of pulse', 1], ['Artery near the surface at the wrist', 1], ['Veins: smooth, low pressure', 1]], d: 2, c: 'understanding', t: [5, 4] })),
    part('e', short({ marks: 3, stem: `At a check-up, Ishaan's blood pressure is ${BP.systolic}/${BP.diastolic} mm Hg. Name the instrument used and explain what each number means.`, model: `The instrument is a **sphygmomanometer**. **${BP.systolic}** mm Hg is the **systolic** pressure, the highest pressure in the arteries when the **ventricles contract**. **${BP.diastolic}** mm Hg is the **diastolic** pressure, the lowest, when the **ventricles relax**.`, sol: 'Sphygmomanometer; systolic; diastolic.', scheme: [['Sphygmomanometer', 1], ['Systolic explained', 1], ['Diastolic explained', 1]], d: 2, c: 'understanding', t: [5] }), [
      num({ marks: 3, stem: `During a race, a runner's heart beats ${RACE.bpm} times a minute and pumps ${RACE.stroke} mL at each beat. How many litres of blood does it pump in one minute?`, value: RACE.output, unit: 'L', sol: r`Output $= ${RACE.bpm} \times ${RACE.stroke} = ${RACE.bpm * RACE.stroke}$ mL per minute; $\dfrac{${RACE.bpm * RACE.stroke}}{1000} = ${RACE.output}$ litres per minute.`, scheme: [['Heart rate × amount per beat', 1], [`${RACE.bpm * RACE.stroke} mL`, 1], [`${RACE.output} litres per minute`, 1]], d: 3, c: 'application', t: [2] }),
    ]),
  ],
}), (q) => (q.children[0].answer.value === 72 && q.children[1].answer.value === 124) || 'value');
add('hole-case', mk.case({
  passage: 'A few hours after birth, baby Aarav\'s lips and fingertips looked bluish. Tests showed a hole in the septum between his two ventricles. His doctor said the hole could be closed by surgery.',
  d: 3, c: 'analysis',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'What is the septum of the heart?', model: 'The **muscular wall** that separates the **right and left** halves of the heart.', sol: 'Wall between the two halves.', scheme: [['Wall between right and left halves', 1]], d: 1, c: 'recall', t: [1] })),
    part('b', short({ marks: 2, stem: 'Why did Aarav look bluish?', model: '**Oxygenated** blood from the left ventricle and **deoxygenated** blood from the right ventricle **mix** through the hole, so the blood sent to the body carries **less oxygen**, giving a bluish tinge.', sol: 'Mixing of blood.', scheme: [['Two kinds of blood mix', 1], ['Less oxygen to tissues', 1]], d: 3, c: 'analysis', t: [1, 3] })),
    part('c', short({ marks: 3, stem: 'Describe the pulmonary and systemic circuits of a normal heart, naming the vessels involved.', model: '**Pulmonary circuit:** the right ventricle pumps deoxygenated blood through the **pulmonary artery** to the lungs; oxygenated blood returns through the **pulmonary veins** to the left auricle. **Systemic circuit:** the left ventricle pumps oxygenated blood through the **aorta** to the body; deoxygenated blood returns through the **venae cavae** to the right auricle.', sol: 'Two circuits with vessels.', scheme: [['Pulmonary circuit', 1], ['Systemic circuit', 1], ['Vessels named correctly', 1]], d: 2, c: 'understanding', t: [3] })),
    part('d', short({ marks: 2, stem: 'Which side of a normal heart contains deoxygenated blood, and which vessels bring this blood to it?', model: 'The **right side** (right auricle and ventricle). Deoxygenated blood is brought from the body by the **superior and inferior venae cavae**.', sol: 'Right side; venae cavae.', scheme: [['Right side', 1], ['Venae cavae', 1]], d: 1, c: 'recall', t: [1, 3] })),
    part('e', short({ marks: 2, stem: 'Why is it important for mammals to keep oxygenated and deoxygenated blood separate?', model: 'Mammals are **warm-blooded** and very active, so their cells need a **large, steady supply of oxygen** to release energy. Keeping the two kinds of blood apart sends **fully oxygenated blood** to the tissues.', sol: 'High oxygen need.', scheme: [['High energy and oxygen need', 1], ['Only oxygen-rich blood reaches tissues', 1]], d: 3, c: 'analysis', t: [3] })),
  ],
}));
add('varicose-case', mk.case({
  passage: 'Sunil is a traffic policeman who stands for most of his eight-hour shift. Over the years, the veins on the backs of his legs have become swollen and twisted. His doctor explains that the small flaps inside these veins no longer close properly.',
  d: 3, c: 'application',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Which type of blood vessel carries blood from Sunil\'s legs back to the heart?', model: '**Veins.**', sol: 'Veins.', scheme: [['Veins', 1]], d: 1, c: 'recall', t: [4] })),
    part('b', short({ marks: 2, stem: 'What is the normal role of the flaps in these vessels?', model: 'The flaps are **valves**. They open to let blood flow **towards the heart** and **close** if blood starts to flow **backwards**, so blood moves in one direction only.', sol: 'Prevent backflow.', scheme: [['Valves let blood flow to the heart', 1], ['Close to prevent backflow', 1]], d: 1, c: 'understanding', t: [4] })),
    part('c', short({ marks: 2, stem: 'Why is it harder for blood to return to the heart from the legs than from the head?', model: 'Blood from the legs must flow **upwards against gravity**, and pressure in veins is **low**. It depends on **leg muscles squeezing** the veins and on the valves; standing still for long hours gives little muscle action.', sol: 'Against gravity, low pressure.', scheme: [['Against gravity at low pressure', 1], ['Needs muscle squeezing; standing still gives little', 1]], d: 3, c: 'analysis', t: [4] })),
    part('d', short({ marks: 2, stem: 'State two ways in which the wall of an artery in his leg differs from the wall of a vein.', model: '1. The artery wall is **thick** with much **muscle and elastic tissue**; the vein wall is **thin** with little muscle.\n2. The artery has a **narrow lumen** and keeps its round shape; the vein has a **wide lumen** and collapses when empty.', sol: 'Thickness; lumen.', scheme: [['First difference', 1], ['Second difference', 1]], d: 2, c: 'understanding', t: [4] })),
    part('e', short({ marks: 3, wl: null, stem: 'Draw a neat, labelled diagram of a vein cut lengthwise to show how its valves work. Show the direction of blood flow.', model: 'Two parallel lines for the **vein wall** with **pocket-like valves** whose flaps point **towards the heart**; an arrow showing **blood flowing towards the heart** through open flaps; a second, backward arrow showing the flaps **closed**, stopping **backflow**.', sol: 'Vein L.S. with valves.', scheme: [['Vein wall with pocket valves', 1], ['Flow towards the heart shown', 1], ['Labels including closed valve', 1]], d: 3, c: 'application', t: [4] })),
  ],
}));
add('meal-case', mk.case({
  passage: `One hour after a meal of rice and dal, small blood samples were taken (during surgery) from four vessels of a patient.\n\n| Vessel | Glucose (mg per 100 mL) | Urea (mg per 100 mL) |\n|---|---|---|\n| Hepatic portal vein | ${MEAL.hpvGlucose} | — |\n| Hepatic vein | ${MEAL.hvGlucose} | — |\n| Renal artery | — | ${MEAL.raUrea} |\n| Renal vein | — | ${MEAL.rvUrea} |`,
  d: 3, c: 'analysis',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Which vessel in the table brings blood from the intestine to the liver?', model: 'The **hepatic portal vein**.', sol: 'Hepatic portal vein.', scheme: [['Hepatic portal vein', 1]], d: 1, c: 'recall', t: [6] })),
    part('b', num({ stem: 'By how many mg per 100 mL did the glucose level fall as blood passed through the liver?', value: MEAL.glucoseTaken, sol: r`$${MEAL.hpvGlucose} - ${MEAL.hvGlucose} = ${MEAL.glucoseTaken}$ mg per 100 mL.`, scheme: [[`${MEAL.glucoseTaken}`, 1]], d: 1, c: 'application', t: [6] })),
    part('c', short({ marks: 2, stem: 'Explain why the glucose level fell in the liver.', model: 'After the meal, the blood from the intestine has **extra glucose**. The liver **stores the excess as glycogen**, so the blood leaving in the **hepatic vein** has a lower, normal level of glucose.', sol: 'Stored as glycogen.', scheme: [['Excess glucose after the meal', 1], ['Stored as glycogen in the liver', 1]], d: 2, c: 'understanding', t: [6] })),
    part('d', short({ marks: 2, stem: 'Why is there less urea in the renal vein than in the renal artery?', model: 'The **kidney removes urea** from the blood and passes it out in the **urine**, so the blood leaving in the **renal vein** carries less urea than the blood entering in the renal artery.', sol: 'Kidney removes urea.', scheme: [['Kidney removes urea', 1], ['Into urine; less left in renal vein', 1]], d: 2, c: 'analysis', t: [6] })),
    part('e', short({ marks: 2, stem: 'Name the vessel that brings oxygenated blood to the liver and the vessel that carries blood from the liver to the inferior vena cava.', model: 'Oxygenated blood reaches the liver through the **hepatic artery**; blood leaves the liver through the **hepatic vein**, which joins the inferior vena cava.', sol: 'Hepatic artery; hepatic vein.', scheme: [['Hepatic artery', 1], ['Hepatic vein', 1]], d: 1, c: 'recall', t: [6] })),
    part('f', short({ marks: 2, stem: 'State two reasons why it is important that blood from the intestine passes through the liver before reaching the heart.', model: '1. The liver **stores excess glucose** (as glycogen) and other nutrients, keeping the blood level steady.\n2. The liver **removes harmful substances** (toxins, drugs) absorbed with the food before they reach the rest of the body.', sol: 'Storage; detoxification.', scheme: [['First reason', 1], ['Second reason', 1]], d: 3, c: 'analysis', t: [6] })),
  ],
}), (q) => q.children[1].answer.value === 60 || 'value');
