// ISC 11 Biology ch18 Excretory Products and Their Elimination — two decks: Part 1 (t01–t02), Part 2 (t03–t04).
import { sl, deck, table, flow, svgV, r } from '../../isc-11-biology-ch01/src/lib.mjs';
import { KIDNEY, NEPHRON, COUNTER, DIALYSIS } from './svgs.mjs';
import { NEPH, NEPH_TOTAL, JUXTA, CORTICAL, GFR, FILTRATE, URINE, REABS, REABS_PCT, PCT_SHARE, PCT_LITRES, NFP_IN, NFP, GRAD, FOLD, WATER, HOT, HOT_URINE, URINE_FALL_PCT, DIAL, DIAL_REMOVED, DIAL_WEEK_HOURS, BLOOD_FLOW, BLOOD_SESSION_L, DIAL_HOURS, CLR, CLR_GFR, CLR_PAT, CLR_PAT_GFR } from './calc.mjs';

export const V = {
  kidney: svgV(KIDNEY, 'Labelled longitudinal section of the human kidney'),
  nephron: svgV(NEPHRON, 'Labelled nephron with its blood supply'),
  counter: svgV(COUNTER, 'Counter-current mechanism with the medullary osmolarity gradient'),
  dialysis: svgV(DIALYSIS, 'Haemodialysis unit'),
};

export const deck1 = deck({
  part: 1,
  title: 'Excretory Products and Their Elimination — Part 1: waste, kidney and urine formation',
  goals: [
    'Relate the nitrogenous waste of an animal to its habitat',
    'Draw and label the L.S. of a kidney and a nephron',
    'Explain ultrafiltration, selective reabsorption, tubular secretion, GFR and the counter-current mechanism',
  ],
  slides: [
    sl('title', 'Excretory Products and Their Elimination', {
      b: 'Part 1: nitrogenous wastes, the kidney and the formation of urine.',
      v: flow('LR', [['w', 'Ammonia, urea or uric acid'], ['k', 'Kidneys: filtration, reabsorption, secretion'], ['u', 'Urine to the bladder and out']], [['w', 'k'], ['k', 'u']], 'Flow from nitrogenous waste to urine'),
      n: 'Cells break down proteins and nucleic acids, and the nitrogen in them has to leave the body. Animals do this in different ways, and in humans the kidneys do the main work. This part covers the kinds of waste, the structure of the kidney and nephron, and the way urine is made.',
    }),
    sl('concept', 'Ammonotelism, ureotelism and uricotelism', {
      b: 'Most animals excrete nitrogen as **ammonia, urea or uric acid**, depending on how much water they can spare.',
      v: table(['Mode', 'Waste', 'Toxicity and water needed', 'Animals'], [['Ammonotelism', 'Ammonia', 'Most toxic; a lot of water', 'Bony fishes, aquatic amphibians, aquatic insects'], ['Ureotelism', 'Urea (made in the liver)', 'Less toxic; moderate water', 'Mammals, many terrestrial amphibians, marine fishes'], ['Uricotelism', 'Uric acid (a paste)', 'Least toxic; very little water', 'Reptiles, birds, land snails, insects']], 'Table of the three modes of excretion with waste, toxicity and examples'),
      n: 'Ammonia is very toxic and needs a great deal of water to flush it out, so it suits animals that live in water. Urea is less toxic and is made in the liver. Uric acid is almost insoluble, and animals that must save water, such as birds and reptiles, pass it out as a paste.',
    }),
    sl('check', 'Quick check: waste and habitat', {
      b: 'Relate the nitrogenous waste to the way an animal develops.',
      n: 'Quick check. Think of an embryo sealed inside a shell.',
      chk: 'uric-mcq',
    }),
    sl('concept', 'Excretory structures in animals', {
      b: 'Different animals use different structures to collect and remove wastes.',
      v: table(['Animals', 'Excretory structure'], [['Flatworms (planaria), rotifers, Amphioxus', 'Protonephridia (flame cells)'], ['Earthworm and other annelids', 'Nephridia'], ['Cockroach and other insects', 'Malpighian tubules'], ['Prawn', 'Antennal or green glands'], ['Vertebrates', 'Kidneys']], 'Table of excretory structures in animals'),
      n: 'Flame cells of flatworms, nephridia of earthworms, Malpighian tubules of insects, green glands of prawns and kidneys of vertebrates all collect wastes and regulate water, but they differ in structure. In humans the kidneys are the main excretory organs.',
    }),
    sl('diagram', 'The human kidney in longitudinal section', {
      b: 'The **kidneys** are a pair of reddish-brown, bean-shaped organs between the last thoracic and the third lumbar vertebra. The **L.S.** shows an outer **cortex** (which dips in as **renal columns**), an inner **medulla** of **renal pyramids**, **calyces**, the **renal pelvis** and the **hilum**.',
      v: V.kidney,
      n: 'The kidney has a tough capsule. Beneath it is the cortex, which also extends between the cone-shaped pyramids of the medulla as renal columns. The pyramids open into cup-like calyces that join the renal pelvis, which leads to the ureter. The hilum is the notch where vessels and the ureter enter or leave.',
    }),
    sl('concept', 'The excretory system and the kidney in numbers', {
      b: 'The system has **two kidneys, two ureters, one urinary bladder and one urethra**. Urine passes from the pelvis by the ureter to the bladder and to the outside by the urethra.',
      v: table(['Feature', 'Value or fact'], [['Size of a kidney', 'About 10 to 12 cm long, 5 to 7 cm wide, 2 to 3 cm thick'], ['Mass of a kidney', 'About 120 to 170 g'], ['Nephrons in a kidney', 'Nearly one million'], ['Blood supply', 'Renal artery in; renal vein out'], ['Urine route', 'Pelvis, ureter, urinary bladder, urethra']], 'Table of facts about the kidney'),
      n: 'Each kidney holds about a million nephrons, which are its structural and functional units. Blood enters by the renal artery and leaves by the renal vein. Urine collects in the pelvis, passes down the ureter to the bladder, and is released through the urethra.',
    }),
    sl('diagram', 'The nephron and its blood supply', {
      b: 'A nephron has a **Malpighian body** (**glomerulus** + **Bowman’s capsule**) and a **tubule**: **PCT**, **loop of Henle** (descending and ascending limbs), **DCT**, ending in the **collecting duct**. The **afferent arteriole** is wider than the **efferent arteriole**, which gives the **peritubular capillaries** and **vasa recta**.',
      v: V.nephron,
      n: 'Blood enters the glomerulus by the wide afferent arteriole and leaves by the narrower efferent arteriole, which builds up pressure. The filtrate passes through the proximal tubule, the loop of Henle, the distal tubule and the collecting duct. Blood from the efferent arteriole supplies the capillaries around the tubules.',
    }),
    sl('example', 'Worked example 1: counting nephrons', {
      b: `Each kidney has about **${NEPH.perKidney.toLocaleString('en-US')} nephrons**, and about **${NEPH.juxtaPct} percent** are **juxtamedullary** (long loops of Henle with vasa recta); the rest are **cortical**. Find the numbers in both kidneys.`,
      ul: [
        r`Total $= 2 \times ${NEPH.perKidney} = ${NEPH_TOTAL}$.`,
        r`Juxtamedullary $= ${NEPH.juxtaPct}/100 \times ${NEPH_TOTAL} = ${JUXTA}$.`,
        r`Cortical $= ${NEPH_TOTAL} - ${JUXTA} = ${CORTICAL}$.`,
      ],
      v: table(['Type', 'Number in both kidneys'], [['All nephrons', NEPH_TOTAL.toLocaleString('en-US')], ['Juxtamedullary', JUXTA.toLocaleString('en-US')], ['Cortical', CORTICAL.toLocaleString('en-US')]], 'Worked table of the numbers of nephrons'),
      n: 'Two kidneys with a million nephrons each give two million in all. Fifteen percent of these are juxtamedullary, which is three hundred thousand. The remaining one million seven hundred thousand are cortical nephrons with short loops of Henle.',
    }),
    sl('concept', 'Urine formation: three processes', {
      b: 'Urine is formed by **glomerular filtration (ultrafiltration)**, **selective reabsorption** and **tubular secretion**.',
      v: table(['Process', 'Where', 'What happens'], [['Ultrafiltration', 'Glomerulus and Bowman’s capsule', 'Blood pressure forces water and small solutes (not proteins) through a three-layered membrane'], ['Selective reabsorption', 'Mainly PCT; also loop, DCT, collecting duct', 'Glucose, amino acids, salts and water return to the blood'], ['Tubular secretion', 'PCT and DCT', 'H⁺, K⁺ and ammonia pass from blood into the filtrate']], 'Table of the three processes of urine formation'),
      n: 'Filtration forces fluid out of the glomerulus, and only the proteins and blood cells stay behind. The tubules then take back what the body needs, such as glucose and most of the water. Finally the tubule cells add substances like hydrogen ions and potassium to the filtrate.',
    }),
    sl('example', 'Worked example 2: how much filtrate is made', {
      b: `The **glomerular filtration rate (GFR)** of a healthy adult is about **${GFR} mL per minute** (textbooks give about 125). The daily urine is about **${URINE} L**. How much filtrate is made in a day, and what share is reabsorbed?`,
      ul: [
        r`Filtrate $= ${GFR} \times 1440 / 1000 = ${FILTRATE}$ L a day.`,
        r`Reabsorbed $= ${FILTRATE} - ${URINE} = ${REABS}$ L.`,
        r`Share reabsorbed $= ${REABS}/${FILTRATE} \times 100 \approx ${REABS_PCT}$ percent.`,
        r`The PCT alone takes back about ${PCT_SHARE} percent: $${PCT_SHARE}/100 \times ${FILTRATE} = ${PCT_LITRES}$ L.`,
      ],
      v: table(['Quantity', 'Per day'], [['Filtrate formed', `${FILTRATE} L`], ['Urine passed', `${URINE} L`], ['Reabsorbed', `${REABS} L (${REABS_PCT} percent)`], ['Reabsorbed in the PCT', `${PCT_LITRES} L`]], 'Worked table of the daily volumes of filtrate and urine'),
      n: 'Multiply the rate by the minutes in a day to find the filtrate. Subtracting the urine gives the volume that returns to the blood, which is more than ninety nine percent. The proximal tubule alone reabsorbs about seventy percent, which shows how large a share of the work it does.',
    }),
    sl('check', 'Quick check: the filtration rate', {
      b: 'Work out the daily filtrate from a lower filtration rate.',
      n: 'Quick check. Multiply the rate by the number of minutes in a day.',
      chk: 'gfr-num',
    }),
    sl('example', 'Worked example 3: why filtration needs pressure', {
      b: `Net filtration pressure = glomerular blood pressure − (capsule pressure + blood osmotic pressure). In a healthy kidney they are **${NFP_IN.glomerular}**, **${NFP_IN.capsule}** and **${NFP_IN.osmotic} mm Hg**.`,
      ul: [
        r`$${NFP_IN.capsule} + ${NFP_IN.osmotic} = ${NFP_IN.capsule + NFP_IN.osmotic}$ mm Hg oppose filtration.`,
        r`Net pressure $= ${NFP_IN.glomerular} - ${NFP_IN.capsule + NFP_IN.osmotic} = ${NFP}$ mm Hg (positive: filtration occurs).`,
        'The efferent arteriole is **narrower** than the afferent, which keeps the glomerular pressure high.',
      ],
      v: table(['Pressure', 'mm Hg'], [['Glomerular blood pressure', String(NFP_IN.glomerular)], ['Capsule pressure', String(NFP_IN.capsule)], ['Blood osmotic pressure', String(NFP_IN.osmotic)], ['Net filtration pressure', String(NFP)]], 'Worked table of the net filtration pressure'),
      n: 'Blood pressure in the glomerulus pushes fluid out, while the pressure in the capsule and the osmotic pull of the plasma proteins push the other way. The balance is a small positive pressure, which is enough for filtration. If the blood pressure falls too far, filtration stops.',
    }),
    sl('check', 'Quick check: a fall of pressure', {
      b: 'Predict what happens to filtration when the glomerular pressure falls.',
      n: 'Quick check. Compare the pressure that pushes with the pressures that oppose.',
      chk: 'nfp-mcq',
    }),
    sl('concept', 'The tubule segments and what they do', {
      b: 'Each segment of the tubule has a different permeability and job.',
      v: table(['Segment', 'Main events'], [['PCT', 'Reabsorbs nearly all glucose and amino acids, and 70 to 80 percent of electrolytes and water; secretion of H⁺, K⁺, ammonia'], ['Descending limb', 'Permeable to water, almost impermeable to electrolytes: filtrate becomes concentrated'], ['Ascending limb', 'Impermeable to water; salts leave: filtrate becomes dilute'], ['DCT', 'Conditional reabsorption of Na⁺ and water; secretion of H⁺, K⁺'], ['Collecting duct', 'Reabsorbs large amounts of water: concentrated urine; lets some urea pass into the medulla']], 'Table of the segments of the tubule and their functions'),
      n: 'The proximal tubule does most of the reabsorption. In the loop of Henle the descending limb lets water out, and the ascending limb lets salts out but not water. The distal tubule and collecting duct adjust the water and salt according to what the body needs.',
    }),
    sl('diagram', 'The counter-current mechanism', {
      b: 'Filtrate in the two limbs of the loop of Henle flows in **opposite directions** (counter-current); so does blood in the **vasa recta**. They keep a gradient in the medulla from **300 to 1200 mOsmol per L**, which lets the collecting duct make urine up to **4 times** as concentrated as the filtrate.',
      v: V.counter,
      n: 'The two limbs of the loop run side by side with the flow in opposite directions. Salt moves out of the ascending limb, and water leaves the descending limb. The vasa recta also flow in opposite directions and remove the extra water without washing away the salt. The result is a steep gradient of concentration down the medulla.',
    }),
    sl('check', 'Quick check: concentration at the loop', {
      b: 'Read a value from the gradient.',
      n: 'Quick check. Where is the filtrate most concentrated?',
      chk: 'tip-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Ammonotelism, ureotelism and uricotelism relate to the habitat and water available.',
        'Kidney L.S.: cortex, renal columns, medulla (pyramids), calyces, pelvis; nephron: Malpighian body, PCT, loop of Henle, DCT, collecting duct.',
        'Urine formation: ultrafiltration, selective reabsorption, tubular secretion; GFR about 125 mL a minute (about 180 L a day).',
        'Counter-current mechanism: gradient 300 to 1200 mOsmol per L; urine up to four times as concentrated as the filtrate.',
      ],
      v: table(['Process', 'Main site'], [['Ultrafiltration', 'Glomerulus'], ['Reabsorption', 'PCT (most)'], ['Secretion', 'PCT and DCT'], ['Concentration of urine', 'Loop of Henle and collecting duct']], 'Summary table of the processes of urine formation and their sites'),
      n: 'To recap: the form of nitrogenous waste suits the habitat. Each nephron filters blood, reabsorbs what is needed and secretes some extra waste. The loop of Henle and the vasa recta work as a counter-current system that lets the kidney produce urine that is much more concentrated than blood.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Name the **waste, its toxicity and the water needed** for each mode of excretion.',
        'In a nephron drawing, show the **afferent arteriole wider** than the efferent arteriole.',
        'State the **site and the event** for each of the three processes.',
        'In the counter-current answer, give **both limbs, the vasa recta and the gradient**.',
      ],
      v: table(['Mistake', 'Correction'], [['Filtrate contains proteins', 'Proteins and blood cells stay in the blood'], ['Water leaves the ascending limb', 'The ascending limb is impermeable to water'], ['Efferent arteriole is wider', 'The afferent arteriole is wider']], 'Table of common mistakes and corrections'),
      n: 'Exam tips. For each kind of excretion give the waste, how toxic it is and the water it needs. Draw the afferent arteriole wider than the efferent. Name the site and event of each process of urine formation. And describe both limbs, the vasa recta and the gradient in the counter-current answer.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Excretory Products and Their Elimination — Part 2: regulation, other organs and disorders',
  goals: [
    'Describe how ADH and the renin-angiotensin-aldosterone system regulate water and salt balance, and the roles of ANF and erythropoietin',
    'Describe micturition and the role of the skin, liver and lungs in excretion',
    'State the cause of each excretory disorder and explain the principle of haemodialysis',
  ],
  slides: [
    sl('title', 'Regulation, other organs and disorders', {
      b: 'Part 2: hormones that control the kidney, excretion by other organs, and kidney failure.',
      v: flow('LR', [['h', 'Hormones: ADH, renin, aldosterone, ANF, erythropoietin'], ['m', 'Micturition'], ['o', 'Skin, liver and lungs'], ['d', 'Disorders, dialysis and transplant']], [['h', 'm'], ['m', 'o'], ['o', 'd']], 'Flow of the topics of part two'),
      n: 'The kidney does not work alone. Hormones adjust how much water and salt it keeps, and the brain controls the passing of urine. Other organs also remove wastes. This part ends with what goes wrong when the kidneys fail and how dialysis and transplants help.',
    }),
    sl('concept', 'Regulation by ADH', {
      b: 'When the **osmolarity of body fluids rises** or the volume falls, **osmoreceptors** in the **hypothalamus** make the **neurohypophysis** release **ADH (antidiuretic hormone)**. ADH makes the **distal parts of the tubule** more permeable to water, so **more water is reabsorbed** and less, more concentrated, urine is formed.',
      v: flow('LR', [['o', 'Osmolarity rises or volume falls'], ['h', 'Hypothalamic osmoreceptors'], ['a', 'ADH released by the neurohypophysis'], ['k', 'DCT and collecting duct reabsorb more water'], ['u', 'Less, more concentrated urine']], [['o', 'h'], ['h', 'a'], ['a', 'k'], ['k', 'u']], 'Flow of the regulation of water balance by ADH'),
      n: 'When the body fluid becomes too concentrated, receptors in the hypothalamus signal the release of antidiuretic hormone. The hormone makes the last parts of the tubule take back more water, and the urine is small in volume and concentrated. When enough water has been regained, the release stops.',
    }),
    sl('concept', 'The renin-angiotensin-aldosterone system', {
      b: 'A fall in **GFR, blood pressure or blood flow** activates the **juxtaglomerular (JG) cells** to release **renin**. Renin converts **angiotensinogen** to **angiotensin I** and then **angiotensin II**, a **vasoconstrictor** that raises the glomerular pressure and the GFR. Angiotensin II also stimulates the **adrenal cortex** to release **aldosterone**, which makes the **DCT** reabsorb **Na⁺ and water**.',
      v: flow('LR', [['f', 'Fall in GFR or blood pressure'], ['j', 'JG cells release renin'], ['a', 'Angiotensinogen to angiotensin I to angiotensin II'], ['d', 'Vasoconstriction and aldosterone'], ['r', 'Na⁺ and water retained: pressure and GFR rise']], [['f', 'j'], ['j', 'a'], ['a', 'd'], ['d', 'r']], 'Flow of the renin-angiotensin-aldosterone system'),
      n: 'If the blood flow or pressure to the kidney falls, juxtaglomerular cells release renin. Renin starts a chain that forms angiotensin two. This narrows blood vessels and also makes the adrenal cortex release aldosterone, so that the kidney keeps more sodium and water and the pressure goes back up.',
    }),
    sl('check', 'Quick check: blocking the system', {
      b: 'Predict the effect of a drug that blocks one step.',
      n: 'Quick check. What does angiotensin two normally do to the blood vessels?',
      chk: 'raas-mcq',
    }),
    sl('concept', 'ANF and erythropoietin', {
      b: 'Several hormones act on or arise from the kidney.',
      v: table(['Hormone', 'Source', 'Trigger', 'Action'], [['ADH', 'Neurohypophysis (made in hypothalamus)', 'High osmolarity, low volume', 'More water reabsorbed; may constrict vessels'], ['Aldosterone', 'Adrenal cortex', 'Angiotensin II', 'Na⁺ and water reabsorbed in DCT'], ['ANF (atrial natriuretic factor)', 'Atrial wall of the heart', 'Raised blood volume and pressure', 'Dilates vessels, lowers pressure; a check on the renin system'], ['Erythropoietin', 'Kidney (juxtaglomerular cells)', 'Low oxygen (hypoxia)', 'More red blood cells made in the bone marrow']], 'Table of hormones that regulate the kidney or arise from it'),
      n: 'The atrial natriuretic factor from the heart does the opposite of the renin system: it widens blood vessels and lowers pressure. The kidney itself releases erythropoietin when the oxygen supply is low, which stimulates the bone marrow to make more red blood cells.',
    }),
    sl('example', 'Worked example 1: water balance on a hot day', {
      b: `On a normal day a person takes in **${WATER.intake} mL** of water and loses **${WATER.urine}** by urine, **${WATER.skin}** by skin, **${WATER.lungs}** by lungs and **${WATER.faeces}** by faeces. On a hot day sweating raises the skin loss to **${HOT.skin} mL**. If the intake is the same, how much urine must be formed to keep the balance?`,
      ul: [
        r`Normal day: $${WATER.urine} + ${WATER.skin} + ${WATER.lungs} + ${WATER.faeces} = ${WATER.urine + WATER.skin + WATER.lungs + WATER.faeces}$ mL, equal to the intake.`,
        r`Hot day: urine $= ${WATER.intake} - (${HOT.skin} + ${WATER.lungs} + ${WATER.faeces}) = ${HOT_URINE}$ mL.`,
        r`Fall in urine $= (${WATER.urine} - ${HOT_URINE})/${WATER.urine} \times 100 = ${URINE_FALL_PCT}$ percent; ADH makes this small volume concentrated.`,
      ],
      v: table(['Route', 'Normal day (mL)', 'Hot day (mL)'], [['Urine', String(WATER.urine), String(HOT_URINE)], ['Skin', String(WATER.skin), String(HOT.skin)], ['Lungs', String(WATER.lungs), String(WATER.lungs)], ['Faeces', String(WATER.faeces), String(WATER.faeces)], ['Total', String(WATER.intake), String(WATER.intake)]], 'Worked table of water balance on a normal and a hot day'),
      n: 'Output must equal intake. On a hot day the skin loses much more water, so the kidney has to form much less urine. More antidiuretic hormone is released, the tubules take back more water, and the small volume of urine is dark and concentrated.',
    }),
    sl('check', 'Quick check: a lack of ADH', {
      b: 'Explain a symptom caused by a missing hormone.',
      n: 'Quick check. What does the distal tubule do without the hormone?',
      chk: 'adh-mcq',
    }),
    sl('concept', 'Micturition and urine', {
      b: 'Urine is stored in the **urinary bladder**. When it fills, **stretch receptors** send signals to the **CNS**, which sends back **motor messages**: the **bladder muscle contracts** and the **urethral sphincter relaxes**, so **urine is passed**. An adult can control the sphincter voluntarily.',
      v: flow('LR', [['b', 'Bladder fills and stretches'], ['s', 'Stretch receptors signal the CNS'], ['m', 'Motor messages: bladder contracts, sphincter relaxes'], ['u', 'Urine is voided']], [['b', 's'], ['s', 'm'], ['m', 'u']], 'Flow of the micturition reflex'),
      n: 'The bladder wall has stretch receptors. When it is full, they send signals to the spinal cord and brain. The reply makes the bladder muscle contract and the sphincter relax, and urine leaves through the urethra. A healthy adult passes one to one and a half litres a day, mostly water with urea and salts.',
    }),
    sl('concept', 'Skin, liver and lungs in excretion', {
      b: 'Besides the kidneys, other organs remove wastes.',
      v: table(['Organ', 'What it removes'], [['Lungs', 'Large amounts of CO₂ (about 200 mL a minute) and some water vapour'], ['Liver', 'Bile pigments (bilirubin, biliverdin), cholesterol, degraded steroid hormones, vitamins and drugs, passed out with the digestive wastes'], ['Skin: sweat glands', 'Sweat with NaCl, small amounts of urea and lactic acid; cools the body'], ['Skin: sebaceous glands', 'Sebum with sterols, hydrocarbons and waxes; protects and lubricates the skin']], 'Table of the role of the lungs, liver and skin in excretion'),
      n: 'The lungs get rid of carbon dioxide and water vapour. The liver sends bile pigments and many other substances into the bile, and they leave with the faeces. The skin removes salts, a little urea and lactic acid in sweat, and the sebaceous glands release oily sebum.',
    }),
    sl('diagram', 'Haemodialysis', {
      b: 'In **renal failure** wastes build up in the blood (**uraemia**). In **haemodialysis** blood from an artery is pumped through a **cellophane tube** in a bath of **dialysing fluid** (like plasma but with **no nitrogenous wastes**). **Heparin** is added before the unit to stop clotting, and **anti-heparin** before the blood returns to a vein.',
      v: V.dialysis,
      n: 'The cellophane tube lets small wastes pass but not blood cells or proteins. Urea leaves the blood by diffusion into the dialysing fluid, because there is none in it. The cleaned blood is returned to the patient through a vein after the heparin has been neutralised.',
    }),
    sl('example', 'Worked example 2: how much does a session clean the blood?', {
      b: `Before a session a patient’s blood urea is **${DIAL.before} mg per 100 mL**; after it, **${DIAL.after}**. The blood flows through the unit at **${BLOOD_FLOW} mL per minute** for **${DIAL_HOURS} hours**, three times a week.`,
      ul: [
        r`Urea removed $= (${DIAL.before} - ${DIAL.after})/${DIAL.before} \times 100 \approx ${DIAL_REMOVED}$ percent.`,
        r`Blood passed through the unit $= ${BLOOD_FLOW} \times ${DIAL_HOURS} \times 60 / 1000 = ${BLOOD_SESSION_L}$ L in one session.`,
        r`Time on dialysis in a week $= 3 \times ${DIAL_HOURS} = ${DIAL_WEEK_HOURS}$ hours.`,
      ],
      v: table(['Quantity', 'Value'], [['Urea before', `${DIAL.before} mg per 100 mL`], ['Urea after', `${DIAL.after} mg per 100 mL`], ['Removed', `${DIAL_REMOVED} percent`], ['Blood cleaned per session', `${BLOOD_SESSION_L} L`], ['Hours a week', String(DIAL_WEEK_HOURS)]], 'Worked table of a dialysis session'),
      n: 'Two thirds of the urea is removed in one session, and the level returns towards the upper limit of normal. During the session many times the whole blood volume passes through the unit. Because wastes build up again, the patient needs treatment about three times every week.',
    }),
    sl('check', 'Quick check: what stays in the blood', {
      b: 'Explain why useful substances are not lost during dialysis.',
      n: 'Quick check. Compare the glucose in the blood and in the dialysing fluid.',
      chk: 'dialysis-mcq',
    }),
    sl('concept', 'Disorders of the excretory system', {
      b: 'Several conditions affect the kidney and urinary tract.',
      v: table(['Disorder', 'Cause', 'Effect'], [['Uraemia', 'Kidney malfunction lets urea accumulate in the blood', 'Poisoning of the body; leads to renal failure'], ['Renal failure', 'Failure of the kidneys to filter blood', 'Wastes and fluid build up; needs dialysis or a transplant'], ['Renal calculi', 'Insoluble masses of crystallised salts, such as oxalates, form in the kidney', 'Pain and blockage of the urine flow'], ['Glomerulonephritis', 'Inflammation of the glomeruli of the kidney', 'Protein and blood in the urine; reduced filtration']], 'Table of disorders of the excretory system'),
      n: 'When the kidneys stop working properly, urea builds up in the blood, which is called uraemia. Complete failure is dangerous. Stones can form from crystallised salts, and inflammation of the glomeruli, called glomerulonephritis, makes the filter leak and reduces its work.',
    }),
    sl('concept', 'Dialysis and kidney transplant', {
      b: 'Both treat kidney failure, but in different ways.',
      v: table(['Feature', 'Haemodialysis', 'Kidney transplant'], [['What it does', 'Cleans the blood outside the body', 'A healthy kidney does all the work'], ['How often', 'About three times a week, for hours each time', 'Once; then life-long medicines'], ['Main problem', 'Tiring, expensive and a continuing need', 'Rejection by the immune system'], ['Best donor', 'Not applicable', 'A close relative (a tissue match)']], 'Table comparing haemodialysis with kidney transplant'),
      n: 'Dialysis replaces only the filtering and has to be repeated. A transplant is the best treatment for permanent failure, because the new kidney does everything. The patient’s immune system may reject it, so doctors prefer a donor with a close tissue match, usually a relative, and give drugs to suppress rejection.',
    }),
    sl('example', 'Worked example 3: judging kidney function from clearance', {
      b: `The GFR can be estimated from **creatinine**, which is filtered but not reabsorbed: **GFR = U × V / P**, where U is its concentration in urine, V the urine flow (mL per minute) and P its concentration in plasma. (This formula is physiology, not syllabus content.) A healthy man: U = ${CLR.u} mg per mL, V = ${CLR.v} mL per minute, P = ${CLR.p} mg per mL.`,
      ul: [
        r`$\text{GFR} = ${CLR.u} \times ${CLR.v} / ${CLR.p} = ${CLR_GFR}$ mL per minute.`,
        r`A patient: U = ${CLR_PAT.u}, V = ${CLR_PAT.v}, P = ${CLR_PAT.p}: $\text{GFR} = ${CLR_PAT.u} \times ${CLR_PAT.v} / ${CLR_PAT.p} = ${CLR_PAT_GFR}$ mL per minute, well below normal.`,
      ],
      v: table(['Person', 'GFR (mL per minute)'], [['Healthy man', String(CLR_GFR)], ['Patient', String(CLR_PAT_GFR)]], 'Worked table of two filtration rates estimated from creatinine'),
      n: 'A substance that is filtered but neither reabsorbed nor secreted can be used to measure the filtration rate. The healthy man filters about one hundred and twenty millilitres a minute, but the patient only fifty, which means that his kidneys are working at a fraction of their capacity.',
    }),
    sl('check', 'Quick check: transplants', {
      b: 'Explain why a kidney transplant may fail.',
      n: 'Quick check. What does the immune system do with a graft from an unrelated donor?',
      chk: 'transplant-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'ADH: more water reabsorbed; renin, angiotensin II and aldosterone: raise pressure and keep Na⁺; ANF lowers pressure; erythropoietin: more red cells.',
        'Micturition: stretch receptors, CNS, bladder contracts, sphincter relaxes.',
        'Lungs (CO₂), liver (bile pigments), skin (sweat and sebum) also excrete.',
        'Uraemia, renal failure, renal calculi, glomerulonephritis; haemodialysis (cellophane, heparin) and kidney transplant.',
      ],
      v: table(['Hormone', 'Effect'], [['ADH', 'Water reabsorption increases'], ['Aldosterone', 'Na⁺ and water reabsorbed'], ['ANF', 'Pressure falls'], ['Erythropoietin', 'More RBC']], 'Summary table of hormones'),
      n: 'To recap: antidiuretic hormone and aldosterone make the kidney keep water and salt, while the atrial natriuretic factor does the opposite. The brain controls the release of urine. The skin, liver and lungs also excrete. If the kidneys fail, dialysis or a transplant is needed.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Give the **source, trigger and action** for each hormone.',
        'In the renin sequence, write the steps in order and name the **adrenal cortex**.',
        'Explain dialysis by **diffusion down a gradient** and name **heparin**.',
        'Do not confuse **uraemia** (urea in blood) with **glomerulonephritis** (inflammation).',
      ],
      v: table(['Mistake', 'Correction'], [['ADH is made by the adrenal gland', 'Neurohypophysis releases ADH; aldosterone is from the adrenal cortex'], ['Dialysing fluid is rich in urea', 'It has no nitrogenous wastes'], ['ANF raises blood pressure', 'ANF lowers it']], 'Table of common mistakes and corrections'),
      n: 'Exam tips. For each hormone give its source, trigger and action. Write the renin sequence in order. Explain dialysis as diffusion down a gradient and name heparin. And keep uraemia, the build up of urea, apart from the inflammation called glomerulonephritis.',
    }),
  ],
});
