// ICSE 10 Biology ch08 Heart, Blood Vessels and Circulation — Part 1 (t01–t03 heart, cardiac cycle, double circulation),
// Part 2 (t04–t06 vessels, pulse and blood pressure, liver and kidney vessels).
import { sl, deck, table, flow, svgV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { HEART, DOUBLE, VESSELS, CARDIAC, PORTAL } from './svgs.mjs';
import { CYCLE, REST, PULSE, BP, MEAL } from './calc.mjs';

export const V = {
  heart: svgV(HEART, 'Longitudinal section of the human heart with chambers, valves and main vessels'),
  double: svgV(DOUBLE, 'Double circulation: the pulmonary and systemic circuits'),
  vessels: svgV(VESSELS, 'Artery, vein and capillary in section, and valves in a vein'),
  cardiac: svgV(CARDIAC, 'One cardiac cycle with the state of the valves'),
  portal: svgV(PORTAL, 'Blood vessels of the liver and kidney'),
};

export const deck1 = deck({
  part: 1,
  title: 'Heart and Circulation — Part 1: The heart and double circulation',
  goals: [
    'Draw and label the internal structure of the heart with its valves and main vessels',
    'Describe the flow of blood through the heart in one cardiac cycle and relate the valves to systole and diastole',
    'Explain double circulation and its advantage in mammals',
  ],
  slides: [
    sl('title', 'Circulatory System: Heart, Blood Vessels and Circulation', {
      b: 'Part 1 — the pump at the centre of the circulatory system.',
      v: flow('LR', [['h', 'Heart: the pump'], ['v', 'Blood vessels: the pipes'], ['b', 'Blood: the transport medium']], [['h', 'v'], ['v', 'b']], 'Flow: the heart pumps blood through the blood vessels'),
      n: 'Your heart is a muscular pump about the size of your fist. It beats around seventy times a minute, every minute of your life. In this part we open it up, follow the blood through its four chambers, and see why mammals have a double circulation.',
    }),
    sl('diagram', 'Inside the heart', {
      b: 'Four chambers: **right and left auricles** above, **right and left ventricles** below, separated by the **septum**.',
      v: V.heart,
      n: 'In diagrams the right side of the heart is drawn on your left. Blue blood from the body enters the right auricle. Red blood from the lungs enters the left auricle. The left ventricle has the thickest wall because it pumps blood to the whole body.',
    }),
    sl('concept', 'Chambers and valves', {
      v: table(['Part', 'Feature or function'], [['Auricles (atria)', 'Thin-walled; receive blood from veins'], ['Ventricles', 'Thick-walled; pump blood into arteries'], ['Tricuspid valve', 'Three flaps; between right auricle and right ventricle'], ['Bicuspid (mitral) valve', 'Two flaps; between left auricle and left ventricle'], ['Semilunar valves', 'At the bases of the pulmonary artery and aorta'], ['Chordae tendineae', 'Cords holding the flaps so they do not turn back'], ['Pericardium', 'Double membrane with fluid; reduces friction']], 'Table of the chambers, valves and coverings of the heart and their features'),
      n: 'The valves make the heart a one-way pump. Tricuspid on the right, bicuspid on the left, and semilunar valves where the two great arteries leave. Cords called chordae tendineae stop the flaps being pushed back into the auricles.',
    }),
    sl('check', 'Quick check: the right-side valve', {
      b: 'Name the valve between the right auricle and the right ventricle.',
      chk: 'tricuspid-mcq',
      n: 'Count its flaps.',
    }),
    sl('concept', 'Main vessels of the heart', {
      v: table(['Vessel', 'From', 'To', 'Blood'], [['Superior and inferior venae cavae', 'Body', 'Right auricle', 'Deoxygenated'], ['Pulmonary artery', 'Right ventricle', 'Lungs', 'Deoxygenated'], ['Pulmonary veins', 'Lungs', 'Left auricle', 'Oxygenated'], ['Aorta', 'Left ventricle', 'Body', 'Oxygenated']], 'Table of the main vessels entering and leaving the heart'),
      n: 'Remember the two exceptions. The pulmonary artery carries deoxygenated blood, and the pulmonary veins carry oxygenated blood. An artery is named for carrying blood away from the heart, not for the oxygen it holds.',
    }),
    sl('example', 'Worked example 1: following a red blood cell', {
      b: 'Trace one red blood cell from the venae cavae to the aorta.',
      ul: ['Step 1: right side: venae cavae → right auricle → tricuspid → right ventricle → semilunar valve → pulmonary artery.', 'Step 2: lungs: the cell picks up oxygen and returns in the pulmonary veins.', 'Step 3: left side: left auricle → bicuspid → left ventricle → semilunar valve → aorta.'],
      v: flow('LR', [['vc', 'Venae cavae'], ['ra', 'Right auricle'], ['rv', 'Right ventricle'], ['l', 'Lungs'], ['la', 'Left auricle'], ['lv', 'Left ventricle'], ['ao', 'Aorta']], [['vc', 'ra'], ['ra', 'rv', 'tricuspid'], ['rv', 'l', 'pulmonary artery'], ['l', 'la', 'pulmonary veins'], ['la', 'lv', 'bicuspid'], ['lv', 'ao', 'semilunar']], 'Worked flow: venae cavae, right auricle, tricuspid valve, right ventricle, pulmonary artery, lungs, pulmonary veins, left auricle, bicuspid valve, left ventricle, aorta'),
      n: 'Follow the blood in order and name each valve as you pass it. A cell entering the right auricle passes four valves before it reaches the aorta: tricuspid, a semilunar valve, bicuspid and another semilunar valve.',
    }),
    sl('diagram', 'The cardiac cycle', {
      b: `At ${CYCLE.bpm} beats a minute one cycle lasts **${CYCLE.total} s**: auricles contract, ventricles contract, then the whole heart relaxes.`,
      v: V.cardiac,
      n: 'Contraction is called systole and relaxation diastole. The auricles contract briefly. Then the ventricles contract, closing the tricuspid and bicuspid valves and opening the semilunar valves. Then the whole heart relaxes and fills again.',
    }),
    sl('concept', 'Valves in systole and diastole', {
      v: table(['Phase', 'Tricuspid and bicuspid', 'Semilunar valves', 'Blood moves'], [['Auricular systole', 'Open', 'Closed', 'Auricles to ventricles'], ['Ventricular systole', 'Closed (lubb)', 'Open', 'Ventricles to arteries'], ['Joint diastole', 'Open', 'Closed (dub)', 'Veins to auricles and ventricles']], 'Table of the state of the valves and the movement of blood in each phase of the cardiac cycle'),
      n: 'Valves open and close because of pressure. When the ventricles squeeze, the pressure shuts the tricuspid and bicuspid valves, making the lubb sound, and pushes the semilunar valves open. When they relax, the semilunar valves snap shut, making the dub.',
    }),
    sl('check', 'Quick check: the second sound', {
      b: 'True or false: the second heart sound, "dub", is made when the semilunar valves close.',
      chk: 'dub-tf',
      n: 'Which valves close as the ventricles relax?',
    }),
    sl('example', 'Worked example 2: timing and output', {
      b: 'Use the heart rate to find the cycle length and the volume pumped.',
      ul: [`Step 1: cycle length = 60 ÷ ${CYCLE.bpm} = **${CYCLE.check} s**.`, `Step 2: at rest, ${REST.bpm} beats × ${REST.stroke} mL per beat = ${REST.bpm * REST.stroke} mL.`, `Step 3: that is about **${REST.output} litres** pumped each minute.`],
      v: table(['Quantity', 'Value'], [['Heart rate', `${CYCLE.bpm} per minute`], ['One cycle', `${CYCLE.check} s`], ['Blood per beat at rest', `${REST.stroke} mL`], ['Blood per minute at rest', `${REST.output} L`]], 'Worked table: seventy-five beats a minute gives a cycle of zero point eight seconds; seventy-two beats of seventy millilitres gives about five litres a minute'),
      n: 'Divide sixty seconds by the heart rate to get the length of one cycle. Multiply the beats per minute by the amount pumped each beat to get the volume per minute. At rest the heart pumps about five litres a minute, roughly all the blood in the body.',
    }),
    sl('diagram', 'Double circulation', {
      b: 'Blood passes through the heart **twice** in one round: the **pulmonary** circuit and the **systemic** circuit.',
      v: V.double,
      n: 'The right ventricle sends blood to the lungs and back to the left auricle. That is the pulmonary circuit. The left ventricle sends blood to the body and back to the right auricle. That is the systemic circuit.',
    }),
    sl('check', 'Quick check: twice through the heart', {
      b: 'What does double circulation mean?',
      chk: 'double-mcq',
      n: 'Count how many times blood enters the heart in one round of the body.',
    }),
    sl('concept', 'Why double circulation helps', {
      v: table(['Feature', 'Advantage'], [['Septum keeps the two sides apart', 'Oxygenated and deoxygenated blood never mix'], ['Separate pump for the body', 'Blood reaches the tissues at high pressure'], ['Lungs supplied at lower pressure', 'Delicate lung capillaries are not damaged']], 'Table of the features and advantages of double circulation'),
      n: 'Mammals and birds are warm blooded and active, so their cells need a lot of oxygen. Double circulation sends fully oxygenated blood to the tissues at high pressure, while the lungs get a gentler flow.',
    }),
    sl('check', 'Quick check: the left-side valve', {
      b: 'Fill in: the valve with two flaps between the left auricle and left ventricle is the ______ valve.',
      chk: 'bicuspid-fill',
      n: 'Bi means two.',
    }),
    sl('summary', 'Summary', {
      ul: ['Four chambers; the left ventricle has the thickest wall.', 'Tricuspid (right), bicuspid (left) and semilunar valves keep blood flowing one way.', 'Cardiac cycle: auricles contract, ventricles contract, whole heart relaxes.', 'Lubb: tricuspid and bicuspid close. Dub: semilunar valves close.', 'Double circulation: pulmonary and systemic circuits.'],
      v: table(['Side', 'Receives from', 'Pumps to'], [['Right', 'Body (venae cavae)', 'Lungs (pulmonary artery)'], ['Left', 'Lungs (pulmonary veins)', 'Body (aorta)']], 'Summary table: the right side receives from the body and pumps to the lungs; the left side receives from the lungs and pumps to the body'),
      n: 'To recap. The right side handles deoxygenated blood and sends it to the lungs. The left side handles oxygenated blood and sends it to the body. Valves keep the flow one way, and blood passes through the heart twice in each round.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['In diagrams, the heart\'s **right** side is on **your left**.', 'Show the **left ventricle wall thickest** in drawings.', 'Pulmonary artery: **deoxygenated**; pulmonary veins: **oxygenated**.', 'Name **every valve** when you trace the path of blood.'],
      n: 'Exam tips. Draw the heart as if facing someone, so its right is on your left. Make the left ventricle wall thickest. Remember the pulmonary exceptions. And when you trace blood, name the valves as well as the chambers.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Heart and Circulation — Part 2: Blood vessels, pulse and blood pressure',
  goals: [
    'Compare arteries, veins and capillaries in wall, lumen, valves and direction of flow',
    'Explain what the pulse is and interpret a blood pressure reading such as 120/80 mm Hg',
    'Name the main vessels of the liver and kidney and explain the hepatic portal system',
  ],
  slides: [
    sl('title', 'Blood Vessels, Pulse and Blood Pressure', {
      b: 'Part 2 — the pipes of the circulatory system and what they tell a doctor.',
      v: flow('LR', [['a', 'Arteries: away from the heart'], ['c', 'Capillaries: exchange'], ['v', 'Veins: back to the heart']], [['a', 'c'], ['c', 'v']], 'Flow: arteries carry blood away from the heart to capillaries, where exchange happens, and veins return it to the heart'),
      n: 'Blood leaves the heart in arteries, does its work in capillaries, and returns in veins. Each kind of vessel is built for its own job. A doctor can learn a lot just by feeling your pulse and measuring your blood pressure.',
    }),
    sl('diagram', 'Artery, vein and capillary', {
      b: 'Arteries: **thick, elastic** walls. Veins: **thin** walls, **valves**. Capillaries: wall **one cell thick**.',
      v: V.vessels,
      n: 'An artery has a thick wall of muscle and elastic fibres to take the surges of pressure. A vein has a thin wall and a wide space inside, with valves to stop backflow. A capillary wall is a single layer of cells.',
    }),
    sl('concept', 'Structure related to function', {
      v: table(['Feature', 'Artery', 'Vein', 'Capillary'], [['Direction', 'Away from heart', 'Towards heart', 'Between artery and vein'], ['Wall', 'Thick, muscular, elastic', 'Thin, less muscle', 'One cell thick'], ['Lumen', 'Narrow', 'Wide', 'Very narrow'], ['Valves', 'None (except at the base)', 'Present', 'None'], ['Pressure', 'High, in surges', 'Low, steady', 'Falling'], ['Blood', 'Oxygenated (except pulmonary artery)', 'Deoxygenated (except pulmonary veins)', 'Mixed']], 'Table comparing arteries, veins and capillaries'),
      n: 'Learn the table column by column. High pressure needs a strong, elastic wall. Low pressure needs valves to stop blood flowing back. And exchange needs the thinnest wall possible.',
    }),
    sl('check', 'Quick check: valves in veins', {
      b: 'Why do veins have valves?',
      chk: 'vein-valve-mcq',
      n: 'What could happen to slow, low-pressure blood going uphill?',
    }),
    sl('concept', 'Capillaries: where the work is done', {
      v: flow('LR', [['b', 'Blood in capillary'], ['o', 'Oxygen and food diffuse out'], ['c', 'Body cells'], ['w', 'Carbon dioxide and wastes diffuse in']], [['b', 'o'], ['o', 'c'], ['c', 'w'], ['w', 'b']], 'Flow: oxygen and food diffuse out of the capillary to the cells, and carbon dioxide and wastes diffuse back in'),
      n: 'Capillaries form a fine network in every tissue. Red cells pass through in single file. Oxygen and food diffuse out to the cells, and carbon dioxide and wastes diffuse in. The capillaries then join to form small veins.',
    }),
    sl('concept', 'The pulse', {
      b: 'The **pulse** is the rhythmic expansion of an artery with each beat of the left ventricle.',
      v: table(['Where to feel it', 'Why there'], [['Wrist, thumb side', 'An artery lies near the skin over a bone'], ['Side of the neck', 'A large artery lies close to the surface'], ['Temple', 'An artery crosses the bone at the side of the head']], 'Table of three places where the pulse can be felt'),
      n: 'Press two fingers lightly on the thumb side of your wrist. Each throb is a surge of blood stretching the artery wall. Pulse rate equals heart rate, about seventy two a minute in a resting adult. Veins have no pulse.',
    }),
    sl('example', 'Worked example 1: counting a pulse', {
      b: `Count for **${PULSE.seconds} seconds** and multiply by **4**.`,
      ul: [`Step 1: at rest, ${PULSE.rest} beats × 4 = **${PULSE.restRate}** per minute.`, `Step 2: after skipping, ${PULSE.after} beats × 4 = **${PULSE.afterRate}** per minute.`, `Step 3: rise = ${PULSE.afterRate} − ${PULSE.restRate} = **${PULSE.rise}** beats per minute.`],
      v: table(['Condition', `Beats in ${PULSE.seconds} s`, 'Per minute'], [['At rest', String(PULSE.rest), String(PULSE.restRate)], ['After skipping', String(PULSE.after), String(PULSE.afterRate)]], 'Worked table: eighteen beats in fifteen seconds gives seventy-two a minute; thirty-one beats gives one hundred and twenty-four a minute'),
      n: 'Fifteen seconds is a quarter of a minute, so multiply by four. Exercise raises the pulse because the muscles need more oxygen and glucose, and the heart beats faster to deliver them.',
    }),
    sl('check', 'Quick check: the pulse', {
      b: 'What is the pulse felt at the wrist?',
      chk: 'pulse-mcq',
      n: 'Is it an artery or a vein that throbs?',
    }),
    sl('concept', 'Blood pressure', {
      b: `A reading of **${BP.systolic}/${BP.diastolic} mm Hg** is normal for a young adult.`,
      v: table(['Part of the reading', 'Name', 'When'], [[String(BP.systolic), 'Systolic pressure', 'Ventricles contract'], [String(BP.diastolic), 'Diastolic pressure', 'Ventricles relax'], [`Difference ${BP.difference}`, 'Pulse pressure', 'Felt as the pulse']], 'Table explaining the systolic and diastolic numbers of a blood pressure reading'),
      n: 'Blood pressure is the push of blood on the artery walls. The higher number is the systolic pressure, while the ventricles contract. The lower is the diastolic pressure, while they relax. It is measured in millimetres of mercury with a sphygmomanometer.',
    }),
    sl('check', 'Quick check: the instrument', {
      b: 'Fill in: blood pressure is measured with a ______.',
      chk: 'sphyg-fill',
      n: 'It is the instrument with an inflatable cuff.',
    }),
    sl('diagram', 'Vessels of the liver and kidney', {
      b: 'Liver: **hepatic artery** and **hepatic portal vein** in, **hepatic vein** out. Kidney: **renal artery** in, **renal vein** out.',
      v: V.portal,
      n: 'The liver gets blood from two sources. The hepatic artery brings oxygen. The hepatic portal vein brings digested food from the intestine. The hepatic vein takes blood away. Each kidney has a renal artery in and a renal vein out.',
    }),
    sl('concept', 'The hepatic portal system', {
      b: 'A **portal vein** begins in capillaries of one organ and ends in capillaries of another.',
      v: flow('LR', [['i', 'Capillaries of the intestine'], ['p', 'Hepatic portal vein'], ['l', 'Capillaries of the liver'], ['h', 'Hepatic vein'], ['c', 'Inferior vena cava and heart']], [['i', 'p'], ['p', 'l'], ['l', 'h'], ['h', 'c']], 'Flow: intestine capillaries, hepatic portal vein, liver capillaries, hepatic vein, inferior vena cava'),
      n: 'Blood from the intestine goes to the liver before it goes to the heart. The liver stores extra glucose as glycogen, keeps other nutrients, and removes harmful substances. Only then does the blood go on to the rest of the body.',
    }),
    sl('example', 'Worked example 2: reading blood samples', {
      b: 'Samples taken an hour after a meal (mg per 100 mL).',
      ul: [`Step 1: glucose falls from ${MEAL.hpvGlucose} to ${MEAL.hvGlucose}: the liver took **${MEAL.glucoseTaken}** and stored it as glycogen.`, `Step 2: urea falls from ${MEAL.raUrea} to ${MEAL.rvUrea}: the kidney removed **${MEAL.ureaRemoved}** into the urine.`, 'Step 3: so the renal vein carries the least urea of any vessel.'],
      v: table(['Vessel', 'Glucose', 'Urea'], [['Hepatic portal vein', String(MEAL.hpvGlucose), '—'], ['Hepatic vein', String(MEAL.hvGlucose), '—'], ['Renal artery', '—', String(MEAL.raUrea)], ['Renal vein', '—', String(MEAL.rvUrea)]], 'Worked table of glucose in the hepatic portal vein and hepatic vein, and urea in the renal artery and renal vein'),
      n: 'Compare the blood going into an organ with the blood coming out. Whatever has changed tells you what the organ did. The liver took up glucose, and the kidney took out urea.',
    }),
    sl('check', 'Quick check: the portal vein', {
      b: 'The hepatic portal vein carries blood…',
      chk: 'hpv-mcq',
      n: 'Where does digested food enter the blood?',
    }),
    sl('summary', 'Summary', {
      ul: ['Arteries: thick elastic walls, high pressure, away from the heart.', 'Veins: thin walls, valves, low pressure, towards the heart.', 'Capillaries: one cell thick; exchange.', `Pulse = heart rate; normal blood pressure about ${BP.systolic}/${BP.diastolic} mm Hg.`, 'Hepatic portal vein takes food-rich blood from the intestine to the liver.'],
      v: table(['Organ', 'In', 'Out'], [['Liver', 'Hepatic artery, hepatic portal vein', 'Hepatic vein'], ['Kidney', 'Renal artery', 'Renal vein']], 'Summary table of the vessels in and out of the liver and kidney'),
      n: 'To recap. Each vessel suits its job: arteries for pressure, veins for low pressure return, capillaries for exchange. The pulse and blood pressure are windows into the heart. And blood from the gut always visits the liver first.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Compare vessels **point against point**: wall, lumen, valves, direction, pressure.', 'Systolic = ventricles **contract**; diastolic = ventricles **relax**.', 'Name only the **main vessels** of the heart, liver and kidney.', 'Hepatic **portal** vein: from the **intestine** to the liver.'],
      n: 'Exam tips. Write differences side by side. Match systolic to contraction and diastolic to relaxation. You only need the main vessels of the heart, liver and kidney. And never mix up the hepatic portal vein with the hepatic vein.',
    }),
  ],
});
