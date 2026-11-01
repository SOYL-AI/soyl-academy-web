// ICSE 10 Biology ch09 Excretory System — Part 1 (t01–t03 excretion, urinary system, kidney), Part 2 (t04–t05 nephron, urine formation).
import { sl, deck, table, flow, svgV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { URINARY, KIDNEY, NEPHRON, MALPIGHIAN } from './svgs.mjs';
import { KID, COMP, WATER } from './calc.mjs';

export const V = {
  urinary: svgV(URINARY, 'The human urinary system with the renal artery and renal vein'),
  kidney: svgV(KIDNEY, 'Longitudinal section of the kidney: cortex, medulla, pyramids and pelvis'),
  nephron: svgV(NEPHRON, 'A nephron with its blood supply'),
  malpighian: svgV(MALPIGHIAN, 'The Malpighian capsule and ultrafiltration'),
};
const yn = (x) => (x > 0 ? 'Present' : 'Absent');

export const deck1 = deck({
  part: 1,
  title: 'Excretory System — Part 1: Excretion, the urinary system and the kidney',
  goals: [
    'Name the excretory organs and the waste each removes',
    'Draw and label the urinary system and state the function of each part',
    'Draw and label a longitudinal section of the kidney',
  ],
  slides: [
    sl('title', 'Excretory System', {
      b: 'Part 1 — getting rid of the wastes that our own cells make.',
      v: flow('LR', [['c', 'Body cells: chemical activities'], ['w', 'Wastes: urea, carbon dioxide, salts'], ['o', 'Excretory organs remove them']], [['c', 'w'], ['w', 'o']], 'Flow: the chemical activities of body cells produce wastes such as urea, carbon dioxide and salts, which excretory organs remove'),
      n: 'Every living cell makes waste as it works. If these wastes built up, they would poison us. Excretion is the removal of these wastes. In this part we meet the excretory organs, and look closely at the kidneys and the urinary system.',
    }),
    sl('concept', 'Excretory organs', {
      b: '**Excretion** is the removal of **metabolic wastes** made by body cells. Passing out undigested food is **egestion**, not excretion.',
      v: table(['Organ', 'Wastes removed'], [['Kidneys', 'Urea, excess water and salts (in urine)'], ['Lungs', 'Carbon dioxide and water vapour'], ['Skin', 'Water, salts and a little urea (in sweat)'], ['Liver', 'Bile pigments from old red cells (in bile); makes urea']], 'Table of four excretory organs and the wastes each removes'),
      n: 'The kidneys are the main excretory organs. The lungs breathe out carbon dioxide. The skin loses water, salts and a little urea in sweat. The liver makes urea from extra amino acids and gets rid of bile pigments.',
    }),
    sl('check', 'Quick check: the lungs', {
      b: 'The lungs act as excretory organs because they remove…',
      chk: 'lungs-mcq',
      n: 'Which waste of respiration do we breathe out?',
    }),
    sl('example', 'Worked example 1: where does the water go?', {
      b: 'Arjun\'s water loss on a hot day at a cricket camp.',
      ul: [`Step 1: add the routes: ${WATER.urine} + ${WATER.sweat} + ${WATER.breath} + ${WATER.faeces} = **${WATER.total} mL**.`, `Step 2: share in urine: ${WATER.urine} ÷ ${WATER.total} × 100 ≈ **${WATER.pctUrine}%**.`, 'Step 3: the kidneys remove the most water, but sweat and breath matter too.'],
      v: table(['Route', 'Water lost (mL)', 'Organ'], [['Urine', String(WATER.urine), 'Kidneys'], ['Sweat', String(WATER.sweat), 'Skin'], ['Breath', String(WATER.breath), 'Lungs'], ['Faeces', String(WATER.faeces), 'Not excretion (egestion)']], 'Worked table: urine fifteen hundred, sweat four hundred and fifty, breath three hundred and fifty, faeces one hundred and fifty millilitres'),
      n: 'Add up the routes, then find the share passed as urine. Here about three fifths of the water left in urine. Notice that water in faeces is not excretion, because faeces are mostly undigested food.',
    }),
    sl('diagram', 'The urinary system', {
      b: 'Two **kidneys**, two **ureters**, the **urinary bladder** and the **urethra**, with the **renal arteries** and **renal veins**.',
      v: V.urinary,
      n: 'The kidneys lie against the back wall of the abdomen, one on each side of the backbone. Each gets blood through a renal artery and returns it through a renal vein. A ureter from each kidney leads to the bladder, which empties through the urethra.',
    }),
    sl('concept', 'Parts of the urinary system', {
      v: table(['Part', 'Function'], [['Kidneys', 'Filter the blood and form urine'], ['Renal artery', 'Brings blood with urea to the kidney'], ['Renal vein', 'Carries cleaned blood away'], ['Ureters', 'Carry urine to the bladder'], ['Urinary bladder', 'Stores urine; a ring of muscle controls its release'], ['Urethra', 'Carries urine out of the body']], 'Table of the parts of the urinary system and their functions'),
      n: 'Think of the system as a factory and its drains. The kidneys make urine from blood. The ureters drain it to the bladder, a stretchy store. When the bladder is full, its ring of muscle relaxes and urine leaves through the urethra.',
    }),
    sl('check', 'Quick check: ureter or urethra?', {
      b: 'True or false: the urethra carries urine from the kidneys to the urinary bladder.',
      chk: 'urethra-tf',
      n: 'Which tube leaves the bladder?',
    }),
    sl('diagram', 'Inside the kidney', {
      b: 'A longitudinal section shows the outer **cortex**, the inner **medulla** of **renal pyramids**, and the **pelvis** leading to the **ureter**.',
      v: V.kidney,
      n: 'Cut a kidney lengthwise. The outer cortex looks dotted. The inner medulla is made of striped cones called pyramids. Their tips open into the pelvis, a funnel that leads into the ureter at the notch called the hilum.',
    }),
    sl('concept', 'Cortex, medulla and pelvis', {
      v: table(['Region', 'Appearance', 'Contains'], [['Cortex (outer)', 'Dark, dotted', 'Malpighian capsules and convoluted tubules'], ['Medulla (inner)', 'Striped pyramids', 'Loops of Henle and collecting ducts'], ['Pelvis', 'Funnel-shaped cavity', 'Urine from the pyramids, on its way to the ureter']], 'Table of the cortex, medulla and pelvis with their appearance and contents'),
      n: 'The dotted look of the cortex comes from the tiny capsules and coiled tubes. The stripes of the medulla come from straight tubes running towards the pelvis. Each kidney holds about a million of these tubes, called nephrons.',
    }),
    sl('check', 'Quick check: the inner region', {
      b: 'The inner region of the kidney is made of cone-shaped…',
      chk: 'pyramid-mcq',
      n: 'They point towards the pelvis.',
    }),
    sl('example', 'Worked example 2: a drop of urine on its way out', {
      b: 'Trace a drop of urine from where it is made to the outside.',
      ul: ['Step 1: it forms in a **nephron** in the cortex and medulla.', 'Step 2: it drains through a **collecting duct** into the **pelvis**.', 'Step 3: it flows down the **ureter**, waits in the **bladder** and leaves by the **urethra**.'],
      v: flow('LR', [['n', 'Nephron'], ['c', 'Collecting duct'], ['p', 'Pelvis'], ['u', 'Ureter'], ['b', 'Bladder'], ['o', 'Urethra']], [['n', 'c'], ['c', 'p'], ['p', 'u'], ['u', 'b'], ['b', 'o']], 'Worked flow: nephron, collecting duct, pelvis, ureter, bladder, urethra'),
      n: 'Follow the drop in order and you will never confuse the ureter with the urethra. Ureter comes first and carries urine to the bladder. Urethra comes last and carries it out.',
    }),
    sl('check', 'Quick check: the path of urine', {
      b: 'Which order shows the path of urine after it leaves a kidney?',
      chk: 'path-urine-mcq',
      n: 'Where is urine stored?',
    }),
    sl('summary', 'Summary', {
      ul: ['Excretion removes metabolic wastes; egestion removes undigested food.', 'Kidneys, lungs, skin and liver are excretory organs.', 'Kidney → ureter → bladder → urethra.', 'Kidney: cortex (capsules), medulla (pyramids), pelvis (leads to the ureter).'],
      v: table(['Tube', 'From', 'To'], [['Ureter', 'Kidney', 'Bladder'], ['Urethra', 'Bladder', 'Outside']], 'Summary table: the ureter runs from kidney to bladder, the urethra from bladder to outside'),
      n: 'To recap. Wastes made by cells are removed by the kidneys, lungs, skin and liver. Urine flows from kidney to ureter to bladder to urethra. And inside the kidney, the dotted cortex surrounds the striped medulla and the pelvis.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Do not call removal of faeces **excretion**: it is **egestion**.', 'Urea is **made in the liver**, removed by the kidneys.', 'Ureter: kidney to bladder. Urethra: bladder to outside.', 'In kidney diagrams, label **cortex, medulla, pyramid, pelvis, ureter**.'],
      n: 'Exam tips. Keep excretion and egestion apart. Remember the liver makes urea. Learn ureter and urethra by their order. And in a kidney section, label the cortex, medulla, a pyramid, the pelvis and the ureter.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Excretory System — Part 2: The nephron and urine formation',
  goals: [
    'Draw and label a nephron with its blood supply and the Malpighian capsule',
    'Describe the three stages of urine formation and where each occurs',
    'Compare the composition of blood plasma, glomerular filtrate and urine',
  ],
  slides: [
    sl('title', 'The Nephron and Urine Formation', {
      b: 'Part 2 — how a million tiny tubes turn blood into urine.',
      v: flow('LR', [['f', 'Ultrafiltration'], ['r', 'Selective reabsorption'], ['s', 'Tubular secretion'], ['u', 'Urine']], [['f', 'r'], ['r', 's'], ['s', 'u']], 'Flow: ultrafiltration, then selective reabsorption, then tubular secretion, giving urine'),
      n: 'Each kidney holds about a million nephrons. Every nephron filters some blood, takes back what the body needs, and adds a few extra wastes. What is left is urine. Let us look at the structure first and then the three stages.',
    }),
    sl('diagram', 'A nephron and its blood supply', {
      b: 'Bowman\'s capsule with the glomerulus, then the **proximal tubule**, **loop of Henle**, **distal tubule** and **collecting duct**.',
      v: V.nephron,
      n: 'Blood arrives in a wide afferent arteriole and enters the glomerulus, a knot of capillaries in Bowman\'s capsule. It leaves by a narrower efferent arteriole, which wraps round the tubule as a second set of capillaries before draining towards the renal vein.',
    }),
    sl('concept', 'Parts of a nephron', {
      v: table(['Part', 'Where', 'Job'], [['Glomerulus', 'Cortex', 'Knot of capillaries; blood filtered here'], ["Bowman's capsule", 'Cortex', 'Double-walled cup that receives the filtrate'], ['Proximal convoluted tubule', 'Cortex', 'Takes back most useful substances'], ['Loop of Henle', 'Medulla', 'Helps take back water'], ['Distal convoluted tubule', 'Cortex', 'Tubular secretion; more reabsorption'], ['Collecting duct', 'Cortex to medulla', 'Carries urine to the pelvis']], 'Table of the parts of a nephron, where each lies and its job'),
      n: 'The glomerulus and Bowman\'s capsule together make the Malpighian capsule. The coiled tubules lie in the cortex, and the loop of Henle dips into the medulla. Many nephrons empty into one collecting duct.',
    }),
    sl('check', 'Quick check: the Malpighian capsule', {
      b: 'A Malpighian capsule is made up of…',
      chk: 'malpighian-mcq',
      n: 'Name the cup and what sits inside it.',
    }),
    sl('diagram', 'Ultrafiltration in the Malpighian capsule', {
      b: 'A **wide afferent** and a **narrow efferent** arteriole keep the glomerulus at **high pressure**.',
      v: V.malpighian,
      n: 'Because more blood flows in than can easily flow out, the pressure in the glomerulus is high. Water and small molecules are squeezed out into the capsule. Blood cells and proteins are too big to pass and stay in the blood.',
    }),
    sl('check', 'Quick check: the cup', {
      b: 'Fill in: the double-walled, cup-shaped structure at the start of a nephron is ______ capsule.',
      chk: 'bowman-fill',
      n: 'It is named after a scientist.',
    }),
    sl('concept', 'Three stages of urine formation', {
      v: table(['Stage', 'Where', 'What happens'], [['Ultrafiltration', 'Malpighian capsule', 'Water, glucose, amino acids, salts and urea filtered out of the blood'], ['Selective reabsorption', 'Mainly proximal tubule (also loop and distal tubule)', 'All glucose and amino acids, most water and salts return to the blood'], ['Tubular secretion', 'Distal tubule', 'Extra potassium and hydrogen ions, some drugs added to the filtrate']], 'Table of the three stages of urine formation, where each happens and what happens'),
      n: 'First the blood is filtered without choice: good and bad together. Then the tubule picks out what the body needs and returns it. Finally a few extra wastes are pushed in from the blood. The remaining liquid is urine.',
    }),
    sl('example', 'Worked example 1: plasma, filtrate and urine', {
      b: 'Compare the three liquids (g per 100 mL).',
      ul: ['Step 1: proteins: in plasma, but **not** filtered.', 'Step 2: glucose: filtered, but **all** reabsorbed, so none in urine.', `Step 3: urea: ${COMP.urea[2]} ÷ ${COMP.urea[0]} ≈ **${COMP.ureaFactor}** times more concentrated in urine.`],
      v: table(['Substance', 'Plasma', 'Filtrate', 'Urine'], [['Proteins', String(COMP.protein[0]), String(COMP.protein[1]), String(COMP.protein[2])], ['Glucose', String(COMP.glucose[0]), String(COMP.glucose[1]), String(COMP.glucose[2])], ['Urea', String(COMP.urea[0]), String(COMP.urea[1]), String(COMP.urea[2])], ['Salts', String(COMP.salts[0]), String(COMP.salts[1]), String(COMP.salts[2])]], 'Worked table of proteins, glucose, urea and salts in plasma, filtrate and urine'),
      n: 'Read the table column by column. Proteins stay in the blood. Glucose gets into the filtrate but is all taken back. Urea is not taken back while most of the water is, so it becomes about sixty seven times more concentrated.',
    }),
    sl('check', 'Quick check: what stays behind?', {
      b: 'Which substance in plasma is normally absent from the glomerular filtrate?',
      chk: 'filtrate-mcq',
      n: 'Think about the size of the molecules.',
    }),
    sl('example', 'Worked example 2: how much is taken back?', {
      b: `Both kidneys filter about **${KID.gfr} mL** a minute; daily urine is about **${KID.urine} litres**.`,
      ul: [`Step 1: filtrate a day = ${KID.gfr} × 60 × 24 mL = **${KID.filtrate} litres**.`, `Step 2: reabsorbed = ${KID.filtrate} − ${KID.urine} = **${KID.reabsorbed} litres**.`, `Step 3: share reabsorbed = ${KID.reabsorbed} ÷ ${KID.filtrate} × 100 ≈ **${KID.pctReabsorbed}%**.`],
      v: table(['Quantity', 'Litres per day'], [['Glomerular filtrate', String(KID.filtrate)], ['Reabsorbed', String(KID.reabsorbed)], ['Urine', String(KID.urine)]], 'Worked table: one hundred and eighty litres filtered, one hundred and seventy eight and a half reabsorbed, one and a half passed as urine'),
      n: 'The kidneys filter about one hundred and eighty litres a day, many times the volume of all your blood. Yet only about one and a half litres leave as urine. More than ninety nine out of every hundred parts are taken back.',
    }),
    sl('concept', 'Secretion and the concentration of urine', {
      v: table(['Situation', 'Water reabsorbed', 'Urine'], [['Hot day, much sweating', 'More', 'Less, darker, concentrated'], ['Cold day, much drinking', 'Less', 'More, pale, dilute'], ['High blood glucose (diabetes)', 'Not all glucose reabsorbed', 'Contains glucose']], 'Table of how the urine changes in three situations'),
      n: 'The kidneys keep the body\'s water and salts steady by changing how much they take back. On a hot day they save water and the urine is dark. When you drink a lot, they let more go. Glucose in urine is a warning sign.',
    }),
    sl('check', 'Quick check: adding wastes', {
      b: 'Fill in: the active addition of extra potassium ions and some drugs into the distal tubule is called tubular ______.',
      chk: 'secretion-fill',
      n: 'It is the opposite direction to reabsorption.',
    }),
    sl('summary', 'Summary', {
      ul: ['Nephron: Bowman\'s capsule with glomerulus, proximal tubule, loop of Henle, distal tubule, collecting duct.', 'Wide afferent, narrow efferent arteriole: high pressure for ultrafiltration.', 'Selective reabsorption, mainly in the proximal tubule; secretion in the distal tubule.', `About ${KID.filtrate} litres filtered a day, about ${KID.urine} litres of urine.`],
      v: table(['Substance', 'Filtrate', 'Urine'], [['Proteins', yn(COMP.protein[1]), yn(COMP.protein[2])], ['Glucose', yn(COMP.glucose[1]), yn(COMP.glucose[2])], ['Urea', yn(COMP.urea[1]), yn(COMP.urea[2])]], 'Summary table: proteins absent from filtrate and urine; glucose present in filtrate but absent from urine; urea present in both'),
      n: 'To recap. The Malpighian capsule filters the blood under pressure. The tubule takes back what is useful and adds a few extra wastes. The result is a small volume of urine rich in urea and free of glucose and protein.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Name each stage **with its site** in the nephron.', 'Explain high glomerular pressure by the **arteriole widths**.', 'Glucose: **filtered** but **fully reabsorbed**. Proteins: **never filtered**.', 'In nephron diagrams, show the **efferent narrower** than the afferent.'],
      n: 'Exam tips. Always give the place as well as the process. Explain the high pressure using the two arterioles. Keep glucose and protein straight. And draw the efferent arteriole narrower than the afferent.',
    }),
  ],
});
