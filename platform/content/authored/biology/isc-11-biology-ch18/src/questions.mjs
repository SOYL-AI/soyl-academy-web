// ISC 11 Biology ch18 Excretory Products and Their Elimination — question bank in ISC school-examination style.
// Every number is computed in calc.mjs. AR keys (ISC options): a c d.
import { mk, add, svgV, r } from '../../isc-11-biology-ch01/src/lib.mjs';
import { KIDNEY_Q, NEPHRON_Q } from './svgs.mjs';
import {
  NEPH2, NEPH2_JUXTA, filtrateLitres, GFR80, REAB2, FIL2, REAB2_L, REAB2_PCT, NFP2_IN, NFP2, NFP_IN, NFP_AFTER, NFP_FALL, OSM2, OSM2_FOLD, DIAL2, DIAL2_PCT, COLD, COLD_URINE, WATER, UREA2, UREA2_CONC,
  LOOP, LOOP_IN, FLUIDS, REAB2_EXACT, CLR_B, CLR_B_GFR, CLR_A, CLR_A_GFR, CLR_FALL_PCT, GRAD, DIAL, DIAL_REMOVED, clearance,
} from './calc.mjs';

const { mcq, ar, fill, num, short, long, tf, match, part } = mk;
const kidneyFig = svgV(KIDNEY_Q, 'Longitudinal section of a kidney with parts marked A to E');
const nephronFig = svgV(NEPHRON_Q, 'Nephron with parts marked A to E');

// ================================================================ t01 modes of excretion, system, kidney, nephron
add('uric-mcq', mcq({
  stem: 'The embryo of a bird develops inside a hard shell, which is closed to the outside until it hatches. Which nitrogenous waste does it produce, and why is that suitable?',
  right: 'Uric acid, because it is almost insoluble and can be stored in the egg without poisoning the embryo',
  wrong: ['Ammonia, because it is harmless and dissolves easily in the egg fluid', 'Urea, because it can be passed out through the shell as the egg warms', 'Ammonia, because the egg fluid can be changed every day'],
  sol: 'Uric acid is the least toxic waste and needs almost no water, so it can be stored as crystals in the sealed egg — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('lungfish-mcq', mcq({
  stem: 'A lungfish excretes mostly ammonia while it lives in a river, but when the river dries up and it lies in a mud burrow it excretes mostly urea. What is the advantage of this change?',
  right: 'Urea is less toxic than ammonia and needs much less water, so it can be kept in the body until the rain returns',
  wrong: ['Urea is more toxic than ammonia, so it can be stored without being absorbed', 'Urea is made from carbon dioxide and so gives the fish energy', 'Urea needs more water than ammonia and so keeps the burrow moist'],
  sol: 'In a dry burrow there is no water to flush out toxic ammonia, so it is converted to the less toxic urea — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('cockroach-mcq', mcq({
  stem: 'Which of the following animals excretes its nitrogenous waste mainly as uric acid?',
  right: 'Cockroach',
  wrong: ['Goldfish', 'Rabbit', 'Tadpole of a frog'],
  sol: 'Insects, birds and reptiles are uricotelic; the fish and the tadpole excrete ammonia and the rabbit urea — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('kid2-mcq', mcq({
  stem: 'The figure shows a longitudinal section of a kidney with parts marked A to E. Which letter marks the funnel-shaped cavity into which the cups around the tips of the pyramids open?',
  right: 'A',
  wrong: ['B', 'D', 'E'],
  sol: 'The calyces open into the renal pelvis, which is marked A — option (@K).',
  d: 2, c: 'application', t: [1],
  assets: [kidneyFig],
}));
add('kid1-mcq', mcq({
  stem: 'In the same figure, which letter marks the region that contains the Malpighian bodies and the convoluted tubules of the nephrons?',
  right: 'B',
  wrong: ['A', 'D', 'E'],
  sol: 'The Malpighian bodies and convoluted tubules lie in the cortex, marked B — option (@K).',
  d: 2, c: 'application', t: [1],
  assets: [kidneyFig],
}));
add('kid3-mcq', mcq({
  stem: 'In the same figure, which letter marks the tube that carries urine from the kidney to the urinary bladder?',
  right: 'C',
  wrong: ['A', 'D', 'E'],
  sol: 'The ureter leaves the kidney at the hilum and runs to the bladder; it is marked C — option (@K).',
  d: 1, c: 'application', t: [1],
  assets: [kidneyFig],
}));
add('neph1-mcq', mcq({
  stem: 'The figure shows a nephron with parts marked A to E. Which letter marks the coiled tubule that begins at the Bowman’s capsule and lies in the cortex?',
  right: 'C',
  wrong: ['A', 'B', 'D'],
  sol: 'The coiled tubule that leaves the capsule is the proximal convoluted tubule, marked C — option (@K).',
  d: 2, c: 'application', t: [1],
  assets: [nephronFig],
}));
add('neph2-mcq', mcq({
  stem: 'In the same figure, which letter marks the straight limb of the loop of Henle that goes down into the medulla from the proximal tubule?',
  right: 'B',
  wrong: ['A', 'C', 'D'],
  sol: 'The descending limb passes from the proximal tubule into the medulla; it is marked B — option (@K).',
  d: 2, c: 'application', t: [1],
  assets: [nephronFig],
}));
add('neph3-mcq', mcq({
  stem: 'In the same figure, which letter marks the long straight duct that receives the contents of the distal tubule and carries them towards the renal pelvis?',
  right: 'D',
  wrong: ['A', 'B', 'E'],
  sol: 'The collecting duct receives the fluid of the distal convoluted tubules and runs to the pelvis; it is marked D — option (@K).',
  d: 2, c: 'application', t: [1],
  assets: [nephronFig],
}));
add('protoneph-tf', tf({
  stem: 'Flame cells (protonephridia) are the excretory structures of flatworms such as planaria.',
  key: 't',
  sol: 'True. Flame cells collect and remove waste and regulate water in flatworms.',
  d: 1, c: 'recall', t: [1],
}));
add('nephridia-fill', fill({
  stem: 'The excretory organs of the earthworm are the ______.',
  acc: [['nephridia', 'nephridium']],
  sol: 'Nephridia.',
  d: 1, c: 'recall', t: [1],
}));
add('juxta-num', num({
  stem: `One kidney has ${NEPH2.perKidney.toLocaleString('en-US')} nephrons, of which ${NEPH2.juxtaPct} percent are juxtamedullary nephrons with long loops of Henle. How many juxtamedullary nephrons does that kidney have?`,
  value: NEPH2_JUXTA, unit: 'nephrons',
  sol: r`$${NEPH2.juxtaPct}/100 \times ${NEPH2.perKidney} = ${NEPH2_JUXTA}$.`,
  scheme: [[`${NEPH2_JUXTA}`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === 165000 || 'value');
add('bird-reason', short({
  marks: 1,
  stem: 'Give a reason: Birds can conserve water by excreting uric acid.',
  model: 'Uric acid is **almost insoluble and non-toxic**, so it is passed out as a **paste with very little water**.',
  sol: 'Insoluble, little water.',
  scheme: [['Insoluble, non-toxic paste needs very little water', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('modes-short2', short({
  marks: 2,
  stem: 'Distinguish between ammonotelism and uricotelism with reference to the waste, the water needed and one animal of each kind.',
  model: 'In **ammonotelism** the waste is **ammonia**, which is very toxic and needs **a large amount of water** to remove it, as in **bony fishes**. In **uricotelism** the waste is **uric acid**, which is almost insoluble and needs **very little water**, as in **birds or reptiles**.',
  sol: 'Waste, water and example for each.',
  scheme: [['Ammonotelism: ammonia, much water, example', 1], ['Uricotelism: uric acid, little water, example', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('kidney-short2', short({
  marks: 2,
  stem: 'State one structural difference between the cortex and the medulla of the kidney, and name the extensions of the cortex between the pyramids.',
  model: 'The **cortex** is the outer region that contains the **Malpighian bodies and convoluted tubules**, while the **medulla** is the inner region made of cone-shaped **renal pyramids** with the loops of Henle and collecting ducts. The extensions of the cortex between the pyramids are the **renal columns**.',
  sol: 'Cortex against medulla; renal columns.',
  scheme: [['Difference between cortex and medulla', 1], ['Renal columns', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('habitat-short3', short({
  marks: 3,
  stem: 'Arrange ammonia, urea and uric acid in order of increasing toxicity, and relate each to the habitat of an animal that excretes it.',
  model: 'The order of increasing toxicity is **uric acid, then urea, then ammonia**. **Ammonia**, the most toxic, needs plenty of water to flush it out, so it is excreted by **aquatic animals such as bony fishes**. **Urea**, moderately toxic, is excreted by **mammals and land amphibians**, which can spare some water. **Uric acid** needs almost no water and is excreted by animals that must save it, such as **birds and desert reptiles**.',
  sol: 'Order of toxicity; each waste with its habitat.',
  scheme: [['Correct order of toxicity', 1], ['Ammonia with aquatic animals', 1], ['Urea and uric acid with their habitats', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('bloodpath-short3', short({
  marks: 3,
  stem: 'Trace the path of blood through the kidney from the afferent arteriole to the renal vein, naming the capillaries that it passes, and state why the efferent arteriole is narrower than the afferent arteriole.',
  model: 'Blood enters the **glomerulus** through the **afferent arteriole**, leaves it by the **efferent arteriole**, then flows through the **peritubular capillaries** around the tubule (and the **vasa recta** in juxtamedullary nephrons) and is collected into veins and the **renal vein**. The efferent arteriole is **narrower** so that the **blood pressure in the glomerulus stays high**, which drives ultrafiltration.',
  sol: 'Path of blood; narrow efferent arteriole.',
  scheme: [['Afferent arteriole, glomerulus and efferent arteriole', 1], ['Peritubular capillaries or vasa recta and the renal vein', 1], ['Narrow efferent arteriole keeps the pressure high', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('nephron-long', long({
  stem: '(a) Draw a neat labelled diagram of a nephron with its blood supply, showing the glomerulus, Bowman’s capsule, PCT, loop of Henle, DCT and collecting duct. [3]\n(b) Describe the structure of a Malpighian body. [2]',
  model: '(a) The diagram shows the **Bowman’s capsule** around the **glomerulus** with the wide **afferent arteriole** and narrow **efferent arteriole**; the coiled **PCT**; the **loop of Henle** with a **descending** and an **ascending limb** dipping into the medulla; the coiled **DCT**; the **collecting duct**; and the **peritubular capillaries** and **vasa recta**. The cortex and medulla are marked.\n\n(b) The **Malpighian body (renal corpuscle)** consists of the **glomerulus**, a tuft of capillaries formed by the afferent arteriole, and the **Bowman’s capsule**, a double-walled cup of epithelial cells that surrounds it. The efferent arteriole carries blood away.',
  sol: 'Labelled nephron; Malpighian body.',
  scheme: [['(a) Capsule, glomerulus and arterioles correct', 1], ['(a) Tubule segments in the right order and regions', 1], ['(a) Blood vessels and neat labels', 1], ['(b) Glomerulus as a tuft of capillaries', 1], ['(b) Double-walled Bowman’s capsule', 1]],
  wl: [60, 200],
  d: 2, c: 'understanding', t: [1],
  assets: [nephronFig],
}));
add('kidney-long', long({
  stem: '(a) Draw a labelled diagram of the longitudinal section of a human kidney. [3]\n(b) Name, in order, the structures through which urine passes from a renal pyramid to the outside of the body. [2]',
  model: '(a) The diagram shows the **renal capsule**, the **cortex** with the **renal columns**, the **medulla** with the **renal pyramids**, the **calyces**, the **renal pelvis**, the **hilum** with the **renal artery, renal vein and ureter**.\n\n(b) Urine passes from the **pyramid** into a **calyx**, then the **renal pelvis**, the **ureter**, the **urinary bladder** and the **urethra**.',
  sol: 'Kidney L.S.; path of urine.',
  scheme: [['(a) Cortex, columns, medulla and pyramids', 1], ['(a) Calyces, pelvis and hilum', 1], ['(a) Vessels, ureter and neat labels', 1], ['(b) Calyx, pelvis, ureter', 1], ['(b) Bladder and urethra', 1]],
  wl: [50, 200],
  d: 2, c: 'understanding', t: [1],
  assets: [kidneyFig],
}));

// ================================================================ t02 urine formation and the counter-current mechanism
add('tip-mcq', mcq({
  stem: `A thin sample of fluid is taken from the hairpin bend at the bottom of a long loop of Henle in the inner medulla. The osmolarity of the tissue fluid there is about ${GRAD[3][1]} mOsmol per L. The filtrate in the loop at that point has an osmolarity closest to`,
  right: `${GRAD[3][1]} mOsmol per L`,
  wrong: [`${GRAD[0][1]} mOsmol per L`, `${GRAD[1][1]} mOsmol per L`, '100 mOsmol per L'],
  sol: `Water leaves the descending limb until the filtrate matches the surrounding fluid, so it is most concentrated at the bend: ${GRAD[3][1]} — option (@K).`,
  d: 3, c: 'application', t: [2],
}));
add('nfp-mcq', mcq({
  stem: `The glomerular blood pressure of a patient in shock falls to ${NFP_FALL.glomerular} mm Hg. The pressure in the capsule is ${NFP_IN.capsule} mm Hg and the osmotic pressure of the blood is ${NFP_IN.osmotic} mm Hg. What happens to filtration?`,
  right: `Filtration stops, because the opposing pressures (${NFP_IN.capsule + NFP_IN.osmotic} mm Hg) exceed the glomerular pressure`,
  wrong: ['Filtration increases, because the capsule pressure is low', 'Filtration continues unchanged, because the osmotic pressure is high', 'Filtration continues at half its rate, because the pressure is divided between the capsule and the blood'],
  sol: r`Net pressure $= ${NFP_FALL.glomerular} - (${NFP_IN.capsule} + ${NFP_IN.osmotic}) = ${NFP_AFTER}$ mm Hg, which is negative, so no filtration occurs — option (@K).`,
  d: 3, c: 'application', t: [2],
}), () => NFP_AFTER < 0 || 'pressure');
add('proteinuria-mcq', mcq({
  stem: 'A routine urine test of a boy shows plasma proteins in his urine, although he has no other symptoms. Which structure is most likely to be damaged?',
  right: 'The filtration membrane between the glomerular capillaries and the Bowman’s capsule',
  wrong: ['The loop of Henle', 'The urethra', 'The ureter'],
  sol: 'Proteins are too large to pass through the healthy filtration membrane; if they appear in the urine, the membrane must be damaged — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('secretion-mcq', mcq({
  stem: 'After a long period without food, a person’s urine is found to be more acidic than usual. Which process of urine formation has increased?',
  right: 'Tubular secretion of hydrogen ions into the filtrate',
  wrong: ['Ultrafiltration of plasma proteins', 'Reabsorption of glucose in the PCT', 'Reabsorption of water in the descending limb'],
  sol: 'Tubule cells secrete H⁺ into the filtrate, which helps to maintain the pH of the blood and makes urine acid — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('counter-mcq', mcq({
  stem: 'The flow of filtrate in the two limbs of the loop of Henle is called counter-current flow because',
  right: 'the filtrate moves in opposite directions in the two limbs, which lie close together',
  wrong: ['the filtrate moves against the flow of blood in the renal vein', 'the flow stops and starts at regular intervals', 'both limbs carry the filtrate in the same direction at different speeds'],
  sol: 'Counter-current means flow in opposite directions in adjacent tubes — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('vasa-mcq', mcq({
  stem: 'In a juxtamedullary nephron, the hairpin-shaped blood vessels that run alongside the loop of Henle also carry their blood in opposite directions. What is their main function in the concentration of urine?',
  right: 'They remove the extra water from the medulla without washing away the salt that maintains the gradient',
  wrong: ['They filter the plasma proteins out of the blood', 'They secrete renin into the medulla', 'They store urine until it can be passed'],
  sol: 'The vasa recta remove water but return the NaCl, so the medullary gradient is kept — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('table-mcq', mcq({
  stem: `A student measures three fluids from a healthy person and records their contents in g per 100 mL.

| Fluid | Protein | Glucose | Urea |
|---|---|---|---|
| X | ${FLUIDS.plasma.protein} | ${FLUIDS.plasma.glucose} | ${FLUIDS.plasma.urea} |
| Y | ${FLUIDS.filtrate.protein} | ${FLUIDS.filtrate.glucose} | ${FLUIDS.filtrate.urea} |
| Z | ${FLUIDS.urine.protein} | ${FLUIDS.urine.glucose} | ${FLUIDS.urine.urea} |

Which row correctly identifies the three fluids?`,
  right: 'X is plasma, Y is glomerular filtrate and Z is urine',
  wrong: ['X is urine, Y is plasma and Z is glomerular filtrate', 'X is glomerular filtrate, Y is urine and Z is plasma', 'X is plasma, Y is urine and Z is glomerular filtrate'],
  sol: 'Only plasma has proteins; the filtrate is like plasma without proteins; urine has no glucose (reabsorbed) and a high urea concentration (water reabsorbed) — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('drug-mcq', mcq({
  stem: 'A drug stops the transport of salts out of the ascending limb of the loop of Henle. What is the likely effect on the urine?',
  right: 'The medullary gradient falls, so the urine becomes more dilute and larger in volume',
  wrong: ['The medullary gradient rises, so the urine becomes more concentrated', 'The GFR rises to twice its value', 'The urine contains more protein'],
  sol: 'Without salt leaving the ascending limb, the osmolarity gradient of the medulla cannot be kept, so less water can be reabsorbed from the collecting duct — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('loopflow-num', num({
  stem: `The GFR of a person is ${LOOP.gfr} mL per minute, and the PCT reabsorbs ${LOOP.pctShare} percent of the filtrate. How many mL of filtrate pass into the loop of Henle each minute?`,
  value: LOOP_IN, tol: 0.05, unit: 'mL per minute',
  sol: r`Reabsorbed in the PCT $= ${LOOP.pctShare}/100 \times ${LOOP.gfr} = ${(LOOP.gfr * LOOP.pctShare) / 100}$ mL; left $= ${LOOP.gfr} - ${(LOOP.gfr * LOOP.pctShare) / 100} = ${LOOP_IN}$ mL per minute.`,
  scheme: [[`${LOOP_IN} mL per minute`, 1]],
  d: 3, c: 'application', t: [2],
}), (q) => Math.abs(q.answer.value - 37.5) < 0.06 || 'value');
add('brush-ar', ar({
  a: 'The cells of the proximal convoluted tubule have a brush border of microvilli.',
  r: 'The brush border increases the surface area for reabsorption.',
  key: 'a',
  sol: 'Both are true, and the larger surface explains the large amount of reabsorption in the PCT — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('loop-tf', tf({
  stem: 'The ascending limb of the loop of Henle is permeable to water.',
  key: 'f',
  sol: 'False. The ascending limb is impermeable to water, although it lets electrolytes out, so the filtrate becomes dilute.',
  d: 2, c: 'understanding', t: [2],
}));
add('ultra-fill', fill({
  stem: 'Almost every constituent of plasma passes into the Bowman’s capsule except blood cells and ______.',
  acc: [['proteins', 'plasma proteins', 'protein']],
  sol: 'Plasma proteins.',
  d: 1, c: 'recall', t: [2],
}));
add('gfr-num', num({
  stem: `A kidney disease reduces a patient’s glomerular filtration rate to ${GFR80} mL per minute. How many litres of filtrate do her kidneys form in a day? Give one decimal place.`,
  value: filtrateLitres(GFR80), tol: 0.05, unit: 'L',
  sol: r`$${GFR80} \times 1440 / 1000 = ${filtrateLitres(GFR80)}$ L a day.`,
  scheme: [[`${filtrateLitres(GFR80)} L`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => Math.abs(q.answer.value - 115.2) < 0.06 || 'value');
add('reab-num', num({
  stem: `A man’s glomerular filtration rate is ${REAB2.gfr} mL per minute and he passes ${REAB2.urine} L of urine in a day. What percentage of the filtrate is reabsorbed? Give one decimal place.`,
  value: REAB2_PCT, tol: 0.05, unit: '%',
  sol: r`Filtrate $= ${REAB2.gfr} \times 1440/1000 = ${FIL2}$ L; reabsorbed $= ${FIL2} - ${REAB2.urine} = ${REAB2_L}$ L; $${REAB2_L}/${FIL2} \times 100 = ${REAB2_EXACT}$, or ${REAB2_PCT} percent to one decimal place.`,
  scheme: [[`${REAB2_PCT} percent`, 1]],
  d: 3, c: 'application', t: [2],
}), (q) => Math.abs(q.answer.value - 98.9) < 0.06 || 'value');
add('nfp-num', num({
  stem: `In an athlete the glomerular blood pressure is ${NFP2_IN.glomerular} mm Hg, the pressure in the capsule is ${NFP2_IN.capsule} mm Hg and the osmotic pressure of the blood is ${NFP2_IN.osmotic} mm Hg. Calculate the net filtration pressure in mm Hg.`,
  value: NFP2, unit: 'mm Hg',
  sol: r`$${NFP2_IN.glomerular} - (${NFP2_IN.capsule} + ${NFP2_IN.osmotic}) = ${NFP2}$ mm Hg.`,
  scheme: [[`${NFP2} mm Hg`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 23 || 'value');
add('osm-num', num({
  stem: `The osmolarity of the glomerular filtrate is ${OSM2.filtrate} mOsmol per L. A man who has not drunk for a while forms urine with an osmolarity of ${OSM2.urine} mOsmol per L. How many times more concentrated than the filtrate is his urine? Give one decimal place.`,
  value: OSM2_FOLD, tol: 0.05,
  sol: r`$${OSM2.urine}/${OSM2.filtrate} = ${OSM2_FOLD}$ times.`,
  scheme: [[`${OSM2_FOLD}`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => Math.abs(q.answer.value - 2.8) < 0.06 || 'value');
add('three-short2', short({
  marks: 2,
  stem: 'Name the three processes of urine formation in the order in which they occur, and name the site of the first.',
  model: 'The processes are **glomerular filtration (ultrafiltration)**, **selective reabsorption** and **tubular secretion**. Ultrafiltration takes place at the **glomerulus and Bowman’s capsule**.',
  sol: 'Three processes; site of the first.',
  scheme: [['Three processes in order', 1], ['Glomerulus and Bowman’s capsule', 1]],
  wl: [12, 50],
  d: 1, c: 'recall', t: [2],
}));
add('counter-short2', short({
  marks: 2,
  stem: 'What is meant by counter-current flow? Name the two structures of a juxtamedullary nephron in which it occurs.',
  model: '**Counter-current flow** is the flow of fluid in **opposite directions** in two tubes lying close together. It occurs in the **two limbs of the loop of Henle** (the filtrate) and in the **two limbs of the vasa recta** (the blood).',
  sol: 'Opposite flow; loop of Henle and vasa recta.',
  scheme: [['Flow in opposite directions in neighbouring tubes', 1], ['Loop of Henle and vasa recta', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('loop-reason', short({
  marks: 1,
  stem: 'Give a reason: The filtrate becomes more concentrated as it flows down the descending limb of the loop of Henle.',
  model: 'The descending limb is **permeable to water**, which **leaves the filtrate** into the more concentrated tissue fluid, while electrolytes cannot easily enter or leave.',
  sol: 'Water leaves.',
  scheme: [['Water leaves because the limb is permeable to it', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('gfr-short3', short({
  marks: 3,
  stem: `Define glomerular filtration rate (GFR). A person has a GFR of ${REAB2.gfr} mL per minute and passes ${REAB2.urine} L of urine in a day. Calculate the filtrate formed in a day and explain why the volume of urine is so much smaller.`,
  model: `The **GFR** is the **volume of filtrate formed by the kidneys each minute**. The filtrate formed in a day is $${REAB2.gfr} \\times 1440/1000 = ${FIL2}$ L. Only ${REAB2.urine} L is passed because the remaining $${REAB2_L}$ L (about ${REAB2_PCT} percent) is **reabsorbed into the blood** by the tubules, mostly in the **PCT**, which takes back useful substances and most of the water.`,
  sol: 'Definition; daily filtrate; reabsorption.',
  scheme: [['Definition of GFR', 1], ['Filtrate per day calculated', 1], ['Most is reabsorbed by the tubules', 1]],
  wl: [30, 96],
  d: 3, c: 'application', t: [2],
}), () => FIL2 === 158.4 || 'filtrate');
add('counter-short3', short({
  marks: 3,
  stem: 'Follow a drop of filtrate down the descending limb, up the ascending limb of the loop of Henle and through the collecting duct. State what happens to its concentration at each stage.',
  model: 'In the **descending limb**, which is **permeable to water**, water leaves, so the filtrate becomes **more concentrated**. In the **ascending limb**, which is **impermeable to water**, electrolytes are transported out, so the filtrate becomes **dilute**. In the **collecting duct**, which passes through the concentrated medulla, **water is reabsorbed** and the filtrate becomes **concentrated urine**.',
  sol: 'Concentrated; dilute; concentrated again.',
  scheme: [['Descending limb: water leaves, concentrated', 1], ['Ascending limb: salts leave, dilute', 1], ['Collecting duct: water reabsorbed, concentrated urine', 1]],
  d: 3, c: 'analysis', t: [2],
}));
add('secretion-short3', short({
  marks: 3,
  stem: 'What is tubular secretion? Name three substances that are secreted and state two ways in which it helps the body.',
  model: '**Tubular secretion** is the **passage of substances from the blood into the filtrate** through the cells of the tubule, mainly in the **PCT and DCT**. The substances are **hydrogen ions, potassium ions and ammonia**. It helps to maintain the **pH** and the **ionic balance** of the blood, and removes extra waste.',
  sol: 'Definition; three substances; two benefits.',
  scheme: [['Definition and sites', 1], ['H⁺, K⁺ and ammonia', 1], ['pH and ionic balance', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('urine-long', long({
  stem: `(a) Describe the three processes by which urine is formed, naming where each takes place. [3]\n(b) A person’s GFR is ${REAB2.gfr} mL per minute. What is the volume of filtrate formed in a day, and why is only about ${REAB2.urine} L passed as urine? [2]`,
  model: `(a) **Ultrafiltration** takes place at the **glomerulus and Bowman’s capsule**, where blood pressure forces water and small solutes, but not proteins and cells, through the filtration membrane. **Selective reabsorption** takes place mostly in the **PCT**, which returns glucose, amino acids, salts and water to the blood; the loop, DCT and collecting duct reabsorb more water. **Tubular secretion** in the **PCT and DCT** adds H⁺, K⁺ and ammonia to the filtrate.\n\n(b) Filtrate $= ${REAB2.gfr} \\times 1440/1000 = ${FIL2}$ L a day. About ${REAB2_PCT} percent is **reabsorbed into the blood**, leaving only a small volume as urine.`,
  sol: 'Three processes with sites; daily filtrate.',
  scheme: [['(a) Ultrafiltration with site', 1], ['(a) Selective reabsorption with site', 1], ['(a) Tubular secretion with site', 1], ['(b) Filtrate 158.4 L', 1], ['(b) Most of it is reabsorbed', 1]],
  wl: [50, 200],
  d: 3, c: 'application', t: [2],
}));
add('counter-long', long({
  stem: '(a) Draw a labelled diagram of the loop of Henle and the vasa recta, showing the direction of flow and the gradient of osmolarity of the medulla. [2]\n(b) Explain how the counter-current mechanism enables the kidney to produce urine more concentrated than the filtrate. [3]',
  model: `(a) The diagram shows the **descending and ascending limbs** with arrows in **opposite directions**, the **vasa recta** alongside in opposite directions, the **collecting duct**, and the osmolarity rising from **${GRAD[0][1]} mOsmol per L in the cortex to ${GRAD[3][1]} in the inner medulla**.\n\n(b) The **ascending limb** passes out NaCl, and the **descending limb** loses water; the **vasa recta** take away the extra water but pick up and return the NaCl and urea. These exchanges keep a **steep gradient of osmolarity** in the medulla. The **collecting duct** passes through this gradient and **loses water**, so urine becomes up to **four times as concentrated** as the filtrate.`,
  sol: 'Diagram; explanation.',
  scheme: [['(a) Limbs and vasa recta with directions', 1], ['(a) Gradient from 300 to 1200', 1], ['(b) Ascending limb salts and descending limb water', 1], ['(b) Vasa recta maintain the gradient', 1], ['(b) Collecting duct loses water: concentrated urine', 1]],
  wl: [50, 200],
  d: 3, c: 'understanding', t: [2],
}));
add('gfr-case', mk.case({
  passage: `A clinic estimated the glomerular filtration rate of a man from his creatinine clearance, GFR $=$ U × V / P, where U is the creatinine concentration in the urine, V the urine flow and P the concentration in the plasma. Creatinine is filtered but not reabsorbed.\n\n| | Before the illness | After the illness |\n|---|---|---|\n| Urine creatinine, U (mg per mL) | ${CLR_B.u} | ${CLR_A.u} |\n| Urine flow, V (mL per minute) | ${CLR_B.v} | ${CLR_A.v} |\n| Plasma creatinine, P (mg per mL) | ${CLR_B.p} | ${CLR_A.p} |`,
  d: 4, c: 'analysis',
  children: [
    part('a', num({
      stem: 'Calculate the man’s GFR before the illness, in mL per minute.',
      value: CLR_B_GFR, unit: 'mL per minute',
      sol: r`$${CLR_B.u} \times ${CLR_B.v} / ${CLR_B.p} = ${CLR_B_GFR}$ mL per minute.`,
      scheme: [[`${CLR_B_GFR} mL per minute`, 1]],
      d: 3, c: 'application', t: [2],
    })),
    part('b', mcq({
      stem: `After the illness the plasma creatinine rises to ${CLR_A.p} mg per mL while the urine values are unchanged. What does this show?`,
      right: `The GFR has fallen to ${CLR_A_GFR} mL per minute, so the kidneys are filtering less blood`,
      wrong: ['The GFR has risen, so the kidneys are filtering more blood', 'The tubules are reabsorbing more creatinine', 'The GFR is unchanged, because the urine flow is unchanged'],
      sol: r`GFR $= ${CLR_A.u} \times ${CLR_A.v} / ${CLR_A.p} = ${CLR_A_GFR}$ mL per minute, lower than before: wastes accumulate in the plasma — option (@K).`,
      d: 3, c: 'analysis', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: `By what percentage has the GFR fallen, and which substance, besides creatinine, is likely to accumulate in his blood?`,
      model: `The fall is $(${CLR_B_GFR} - ${CLR_A_GFR})/${CLR_B_GFR} \\times 100 = ${CLR_FALL_PCT}$ percent. **Urea** is likely to accumulate in the blood, a condition called **uraemia**.`,
      sol: '60 percent; urea.',
      scheme: [['Percentage fall 60', 1], ['Urea accumulation (uraemia)', 1]],
      wl: [8, 60],
      d: 3, c: 'application', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'Why must a patient with a much-reduced GFR be treated by haemodialysis or a transplant if the kidney does not recover?',
        model: 'With a very low GFR the kidneys cannot remove **urea and other wastes**, which build up and poison the body. **Haemodialysis** removes them from the blood artificially, and a **transplant** provides a kidney that filters normally.',
        sol: 'Wastes build up; dialysis or a transplant.',
        scheme: [['Wastes accumulate when the GFR is low', 1], ['Dialysis or transplant replaces kidney function', 1]],
        d: 3, c: 'application', t: [4],
      }),
    ]),
  ],
}), (q) => q.children[0].answer.value === 75 || 'GFR');

// ================================================================ t03 regulation of kidney function
add('adh-mcq', mcq({
  stem: 'A patient with damage to the pituitary gland passes about 12 litres of very dilute urine a day and is always thirsty. Which explanation is most likely?',
  right: 'Without ADH, the distal tubule and collecting duct do not reabsorb enough water',
  wrong: ['Without ADH, the glomerular filtration rate falls to zero', 'Too much aldosterone is making the PCT reabsorb all the water', 'The loop of Henle has become permeable to proteins'],
  sol: 'ADH makes the last parts of the tubule permeable to water; without it water stays in the urine — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('raas-mcq', mcq({
  stem: 'A drug blocks the enzyme that converts angiotensin I into angiotensin II in a patient with high blood pressure. What is the expected effect?',
  right: 'The blood pressure falls, because there is less vasoconstriction and less aldosterone',
  wrong: ['The blood pressure rises, because more renin is released', 'There is no effect, because angiotensin I has the same action', 'The filtration rate rises, because the afferent arteriole narrows'],
  sol: 'Angiotensin II constricts vessels and stimulates aldosterone, so blocking its formation lowers the pressure — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('epo-mcq', mcq({
  stem: 'A cricketer trains for a month in a mountain village at a high altitude, and his red blood cell count rises. Which hormone released by the kidney was responsible?',
  right: 'Erythropoietin',
  wrong: ['Aldosterone', 'Atrial natriuretic factor', 'Antidiuretic hormone'],
  sol: 'The kidney releases erythropoietin when oxygen is short, and it stimulates the bone marrow to make red cells — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('micturition-mcq', mcq({
  stem: 'A healthy adult can delay passing urine for a time after the bladder is full, but a young baby cannot. What is the main reason?',
  right: 'The adult can voluntarily control the urethral sphincter through the nervous system',
  wrong: ['The adult’s kidneys stop forming urine until a toilet is found', 'The adult’s bladder does not have stretch receptors', 'The adult’s ureters can hold urine for hours'],
  sol: 'The micturition reflex involves stretch receptors and the CNS, and in adults the sphincter can be controlled voluntarily — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('homeo-mcq', mcq({
  stem: 'Which of the following is NOT a homeostatic function of the kidneys?',
  right: 'Digestion of fats in the small intestine',
  wrong: ['Regulating the osmolarity of body fluids', 'Helping to maintain the pH of the blood', 'Helping to regulate the blood pressure'],
  sol: 'The kidneys regulate fluid volume, ions, pH and blood pressure, but fat digestion is done by bile and lipases — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('jg-mcq', mcq({
  stem: 'The juxtaglomerular (JG) cells that release renin are modified cells of the',
  right: 'afferent arteriole',
  wrong: ['proximal convoluted tubule', 'loop of Henle', 'collecting duct'],
  sol: 'JG cells are modified cells of the afferent arteriole, next to the macula densa of the DCT — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('aldo-ar', ar({
  a: 'Aldosterone helps to raise the blood pressure.',
  r: 'Aldosterone is secreted by the adrenal medulla.',
  key: 'c',
  sol: 'A is true: aldosterone makes the DCT reabsorb Na⁺ and water. R is false: it is secreted by the adrenal cortex — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
add('adh-tf', tf({
  stem: 'ADH is released by the neurohypophysis when the osmolarity of the body fluids falls.',
  key: 'f',
  sol: 'False. ADH is released when the osmolarity rises (or the volume falls) and increases water reabsorption.',
  d: 2, c: 'understanding', t: [3],
}));
add('anf-fill', fill({
  stem: 'ANF stands for atrial ______ factor, a hormone from the heart that lowers blood pressure.',
  acc: [['natriuretic', 'Natriuretic']],
  sol: 'Natriuretic.',
  d: 1, c: 'recall', t: [3],
}));
add('water-num', num({
  stem: `On a cold day a person takes in ${WATER.intake} mL of water and loses ${COLD.skin} mL through the skin, ${WATER.lungs} mL through the lungs and ${WATER.faeces} mL with the faeces. How many mL of urine must she form to keep her water balance?`,
  value: COLD_URINE, unit: 'mL',
  sol: r`$${WATER.intake} - (${COLD.skin} + ${WATER.lungs} + ${WATER.faeces}) = ${COLD_URINE}$ mL.`,
  scheme: [[`${COLD_URINE} mL`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => q.answer.value === 1800 || 'value');
add('hotskin-mcq', mcq({
  stem: 'A traveller walks through a desert for several hours and sweats heavily. What happens to the volume and concentration of her urine, and why?',
  right: 'Less urine, more concentrated, because ADH makes the tubule reabsorb more water',
  wrong: ['More urine, more dilute, because ADH is released when water is lost', 'The same volume and concentration, because sweat is made from urine', 'No urine at all, because the glomerular filtration stops'],
  sol: 'Water loss raises the osmolarity of the blood, ADH is released, and the kidney conserves water — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('salt-short2', short({
  marks: 2,
  stem: 'A boy eats a very salty meal. Explain how his body responds so that the osmolarity of his body fluids is brought back to normal.',
  model: 'The salt raises the **osmolarity of the blood**. **Osmoreceptors in the hypothalamus** detect it, and the **neurohypophysis releases ADH**, so the **DCT and collecting duct reabsorb more water** and he passes less, more concentrated urine; he also feels thirsty and drinks.',
  sol: 'Osmoreceptors; ADH; more water reabsorbed.',
  scheme: [['Rise in osmolarity detected; ADH released', 1], ['More water reabsorbed and a concentrated urine', 1]],
  d: 2, c: 'application', t: [3],
}));
add('renin-reason', short({
  marks: 1,
  stem: 'Give a reason: A person who has lost a lot of blood secretes more aldosterone.',
  model: 'The fall in blood pressure and GFR makes the **JG cells release renin**, which leads to **angiotensin II**, and this stimulates the **adrenal cortex** to release aldosterone.',
  sol: 'Renin system activated.',
  scheme: [['Fall in pressure activates renin and angiotensin II, which stimulates aldosterone', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('adh-short2', short({
  marks: 2,
  stem: 'Name the part of the brain that detects a rise in the osmolarity of the blood and the gland that releases ADH. State the effect of ADH on the tubule.',
  model: '**Osmoreceptors in the hypothalamus** detect the rise, and the **neurohypophysis** releases **ADH**. ADH makes the **distal parts of the tubule more permeable to water**, so more water is reabsorbed.',
  sol: 'Hypothalamus; neurohypophysis; more water reabsorbed.',
  scheme: [['Hypothalamus osmoreceptors and the neurohypophysis', 1], ['More water reabsorbed in the distal tubule', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('epo-short2', short({
  marks: 2,
  stem: 'Name the hormone secreted by the kidney that controls the formation of red blood cells, and state the condition that stimulates its release.',
  model: 'The hormone is **erythropoietin**. Its release is stimulated by **low oxygen (hypoxia) in the blood reaching the kidney**, and it acts on the **bone marrow** to make **more red blood cells**.',
  sol: 'Erythropoietin; hypoxia.',
  scheme: [['Erythropoietin', 1], ['Stimulus: low oxygen; action on the bone marrow', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('micturition-short2', short({
  marks: 2,
  stem: 'Micturition is a reflex but an adult can control it. Describe the reflex in two steps and say what makes the voluntary control possible.',
  model: 'When the bladder fills, **stretch receptors** in its wall send signals to the **CNS**, which sends **motor messages** that make the **bladder muscle contract and the sphincter relax**, so urine is passed. The **urethral sphincter is under voluntary control**, so an adult can delay it.',
  sol: 'Receptors; CNS; muscle and sphincter; voluntary sphincter.',
  scheme: [['Stretch receptors signal the CNS; motor messages cause the bladder to contract and the sphincter to relax', 1], ['Sphincter under voluntary control', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('anf-short3', short({
  marks: 3,
  stem: 'State the source of ANF, the condition that causes its release and its effects, and explain why it is called a check on the renin-angiotensin mechanism.',
  model: '**ANF** (atrial natriuretic factor) is released by the **atrial walls of the heart** when the **blood volume and pressure rise**. It causes **vasodilation** and a fall in blood pressure. This is the **opposite** of angiotensin II, which constricts the vessels and raises the pressure, so ANF acts as a **check on the renin-angiotensin mechanism**.',
  sol: 'Source and stimulus; effect; opposes the RAAS.',
  scheme: [['Source and stimulus', 1], ['Vasodilation and fall of pressure', 1], ['Opposes angiotensin II', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('regul-long', long({
  stem: '(a) Explain how ADH regulates the water balance of the body, naming the sensors and the gland concerned. [2]\n(b) Describe the sequence of events of the renin-angiotensin-aldosterone mechanism when the glomerular blood pressure falls. [3]',
  model: '(a) **Osmoreceptors in the hypothalamus** detect a rise in the osmolarity of the body fluids and the **neurohypophysis** releases **ADH**. It makes the **DCT and collecting duct reabsorb more water**, so less, more concentrated urine is formed; when the volume has risen, the release stops.\n\n(b) The fall activates the **JG cells** to release **renin**, which converts **angiotensinogen** to **angiotensin I** and then to **angiotensin II**. Angiotensin II is a **vasoconstrictor**, which raises the glomerular pressure and the GFR, and it stimulates the **adrenal cortex** to release **aldosterone**, which makes the **DCT reabsorb Na⁺ and water**, raising the blood pressure.',
  sol: 'ADH regulation; RAAS sequence.',
  scheme: [['(a) Osmoreceptors and neurohypophysis', 1], ['(a) More water reabsorbed; feedback', 1], ['(b) JG cells release renin; angiotensin I to II', 1], ['(b) Vasoconstriction raises pressure and GFR', 1], ['(b) Aldosterone: Na⁺ and water reabsorbed', 1]],
  wl: [60, 200],
  d: 3, c: 'understanding', t: [3],
}));

// ================================================================ t04 other organs, disorders, haemodialysis and transplant
add('dialysis-mcq', mcq({
  stem: 'During haemodialysis the glucose of a patient’s blood is not lost into the dialysing fluid. This is because the dialysing fluid',
  right: 'has the same concentration of glucose as the plasma, so there is no gradient for it',
  wrong: ['contains no water, so glucose cannot dissolve in it', 'is separated from the blood by a membrane that lets only urea through', 'is warmer than the blood and so stops diffusion'],
  sol: 'The fluid has the composition of plasma except for the nitrogenous wastes, so only the wastes move down a gradient — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('transplant-mcq', mcq({
  stem: 'A kidney transplanted from an unrelated donor works well for a few days and then fails. The most likely reason is that the',
  right: 'immune system of the patient recognised the new kidney as foreign and attacked it',
  wrong: ['new kidney was too large for the abdomen', 'patient’s blood group changed after the operation', 'new kidney could not be supplied with oxygen by the renal artery'],
  sol: 'Rejection by the recipient’s immune system is the main problem of a transplant — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('sebum-mcq', mcq({
  stem: 'Which glands of the skin release sterols, hydrocarbons and waxes that protect and lubricate the skin?',
  right: 'Sebaceous glands',
  wrong: ['Sweat glands', 'Salivary glands', 'Adrenal glands'],
  sol: 'Sebaceous glands secrete sebum, which has sterols, hydrocarbons and waxes — option (@K).',
  d: 2, c: 'recall', t: [4],
}));
add('uraemia-mcq', mcq({
  stem: 'A man’s blood test shows a very high level of urea, and he feels sick and drowsy. Which condition does this describe?',
  right: 'Uraemia',
  wrong: ['Renal calculi', 'Glomerulonephritis', 'Diabetes'],
  sol: 'The accumulation of urea in the blood caused by kidney malfunction is uraemia — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('glom-mcq', mcq({
  stem: 'Two weeks after a throat infection a girl has puffy eyelids and passes urine containing blood. The doctor suspects inflammation of the filtering units of the kidney. This condition is',
  right: 'glomerulonephritis',
  wrong: ['uraemia', 'renal calculi', 'cystitis of the ureter'],
  sol: 'Inflammation of the glomeruli is glomerulonephritis — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('sweat-ar', ar({
  a: 'Sweat is formed by the filtration of blood in the glomeruli.',
  r: 'Sweat glands are a part of each nephron.',
  key: 'd',
  sol: 'Both are false: sweat is formed by the sweat glands of the skin from the tissue fluid, which are not part of the nephron — option (d).',
  d: 2, c: 'understanding', t: [4],
}));
add('sweat-tf', tf({
  stem: 'Sweat contains only water and no other substance.',
  key: 'f',
  sol: 'False. Sweat also contains NaCl, small amounts of urea and lactic acid.',
  d: 1, c: 'recall', t: [4],
}));
add('bilirubin-fill', fill({
  stem: 'The liver excretes the pigment ______, formed from the breakdown of haemoglobin, into the bile.',
  acc: [['bilirubin', 'Bilirubin']],
  sol: 'Bilirubin.',
  d: 1, c: 'recall', t: [4],
}));
add('organs-match', match({
  stem: 'Match each organ in column I with what it removes in column II.',
  pairs: [
    ['Lungs', 'Carbon dioxide and water vapour'],
    ['Liver', 'Bile pigments and cholesterol'],
    ['Sweat glands', 'NaCl, a little urea and lactic acid'],
    ['Sebaceous glands', 'Sterols, hydrocarbons and waxes'],
  ],
  order: [3, 1, 0, 2],
  marks: 2,
  sol: 'The lungs remove CO₂ and water vapour, the liver bile pigments and cholesterol, sweat glands salts and a little urea, and sebaceous glands sebum.',
  d: 1, c: 'recall', t: [4],
}));
add('dial-num', num({
  stem: `Before a haemodialysis session the blood urea of a patient is ${DIAL2.before} mg per 100 mL; after it, ${DIAL2.after} mg per 100 mL. What percentage of the urea was removed? Give one decimal place.`,
  value: DIAL2_PCT, tol: 0.05, unit: '%',
  sol: r`$(${DIAL2.before} - ${DIAL2.after})/${DIAL2.before} \times 100 = ${DIAL2_PCT}$ percent.`,
  scheme: [[`${DIAL2_PCT} percent`, 1]],
  d: 2, c: 'application', t: [4],
}), (q) => Math.abs(q.answer.value - 62.5) < 0.06 || 'value');
add('urea-num', num({
  stem: `A woman passes ${UREA2.litres} L of urine in a day, containing ${UREA2.g} g of urea. What is the average concentration of urea in her urine, in g per litre?`,
  value: UREA2_CONC, unit: 'g per L',
  sol: r`$${UREA2.g}/${UREA2.litres} = ${UREA2_CONC}$ g per litre.`,
  scheme: [[`${UREA2_CONC} g per L`, 1]],
  d: 1, c: 'application', t: [4],
}), (q) => q.answer.value === 25 || 'value');
add('cellophane-reason', short({
  marks: 1,
  stem: 'Give a reason: A cellophane tube is used in the dialysing unit.',
  model: 'Cellophane is **semipermeable**: it lets **urea and other small wastes diffuse out** but keeps the **blood cells and proteins** in the blood.',
  sol: 'Semipermeable.',
  scheme: [['Semipermeable: wastes pass, cells and proteins stay', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('skin-short2', short({
  marks: 2,
  stem: 'Name the two kinds of gland in the skin that help in excretion and state what each secretes.',
  model: 'The **sweat glands** secrete **sweat**, containing water, **NaCl, a small amount of urea and lactic acid**. The **sebaceous glands** secrete **sebum**, containing **sterols, hydrocarbons and waxes**.',
  sol: 'Sweat glands and sebaceous glands with secretions.',
  scheme: [['Sweat glands and sweat contents', 1], ['Sebaceous glands and sebum contents', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('calculi-short2', short({
  marks: 2,
  stem: 'What are renal calculi, and what effect do they have on the urinary system?',
  model: '**Renal calculi** are **stones or insoluble masses of crystallised salts**, such as **oxalates**, that form in the kidney. They can cause **severe pain** and may **block the flow of urine** through the ureter.',
  sol: 'Crystallised salts; pain and blockage.',
  scheme: [['Stones of crystallised salts, for example oxalates', 1], ['Pain and blocked urine flow', 1]],
  d: 1, c: 'understanding', t: [4],
}));
add('dialvstrans-short3', short({
  marks: 3,
  stem: 'Give three points of comparison between haemodialysis and a kidney transplant as treatments of renal failure.',
  model: '**Haemodialysis** cleans the blood **outside the body** and has to be **repeated about three times a week**, while a **transplant** gives a kidney that does all the work, usually **once**. Dialysis replaces only the **filtering**, but a transplant also restores the **hormonal functions**. The main risk of a transplant is **rejection** by the immune system, so a **close relative** is preferred as the donor and drugs are given.',
  sol: 'Three comparison points.',
  scheme: [['Repeated against one-time treatment', 1], ['Replaces filtering only against whole kidney', 1], ['Rejection and the choice of a donor', 1]],
  d: 2, c: 'analysis', t: [4],
}));
add('disorders-short3', short({
  marks: 3,
  stem: 'Distinguish between uraemia, renal calculi and glomerulonephritis by stating the cause of each.',
  model: '**Uraemia** is caused by **kidney malfunction**, which lets **urea accumulate in the blood**. **Renal calculi** are caused by the **crystallisation of salts such as oxalates** into stones in the kidney. **Glomerulonephritis** is caused by **inflammation of the glomeruli**, which makes the filtering units work poorly.',
  sol: 'Cause of each disorder.',
  scheme: [['Uraemia: urea accumulates in the blood', 1], ['Renal calculi: crystallised salts', 1], ['Glomerulonephritis: inflammation of the glomeruli', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('dialysis-long', long({
  stem: '(a) Draw a labelled diagram of a haemodialysis unit. [3]\n(b) Why is heparin added to the blood before it enters the unit? [1]\n(c) State one advantage of a kidney transplant over haemodialysis. [1]',
  model: '(a) The diagram shows **blood from an artery** pumped into the unit, where it flows through a coiled **cellophane tube** surrounded by **dialysing fluid** (like plasma but without nitrogenous wastes); **urea and other wastes diffuse out** of the blood into the fluid; **heparin** is added before and **anti-heparin** after, and the **cleaned blood returns to a vein**.\n\n(b) **Heparin** is an anticoagulant: it **prevents the blood from clotting** in the unit.\n\n(c) A transplanted kidney does **all the work of a kidney** and does not need to be repeated every few days.',
  sol: 'Diagram; heparin; advantage of a transplant.',
  scheme: [['(a) Artery, pump and cellophane tube', 1], ['(a) Dialysing fluid and diffusion of wastes', 1], ['(a) Heparin, anti-heparin, return to a vein, neat labels', 1], ['(b) Heparin stops clotting', 1], ['(c) A transplant does all kidney work without repeated sessions', 1]],
  wl: [60, 200],
  d: 2, c: 'understanding', t: [4],
}));

// quiet the linter about helpers kept for readability
void [DIAL, DIAL_REMOVED, clearance];
