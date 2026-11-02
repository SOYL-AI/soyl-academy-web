// ch16 Excretory Products and their Elimination — two decks: Part 1 (t01 modes, excretory organs, kidney and nephron; filtration from t02), Part 2 (t02 reabsorption, counter-current, regulation; t03 micturition, other organs, disorders).
import { sl, deck, table, flow, svgV, r } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { URINARY, KIDNEYLS, NEPHRON, COUNTER } from './svgs.mjs';
import { KIDNEY, N, MIN_PER_DAY } from './calc.mjs';

export const V = {
  urinary: svgV(URINARY, 'Front view of the human excretory system: kidneys with renal arteries and veins, aorta, inferior vena cava, ureters, urinary bladder and urethra'),
  kidneyls: svgV(KIDNEYLS, 'Longitudinal section of a kidney showing capsule, cortex, medullary pyramids, columns of Bertini, calyces, renal pelvis, hilum, ureter and renal vessels'),
  nephron: svgV(NEPHRON, 'Nephron with afferent and efferent arterioles, glomerulus, Bowman’s capsule, PCT, Henle’s loop, DCT, collecting duct, peritubular capillaries and vasa recta, across the cortex and medulla'),
  counter: svgV(COUNTER, `Counter-current mechanism: Henle’s loop, vasa recta and collecting duct in a medulla whose osmolarity rises from ${KIDNEY.osm.cortex} to ${KIDNEY.osm.inner} milliosmoles per litre, with water, NaCl and urea movements`),
  modes: table(
    ['Waste', 'Toxicity and water needed', 'Mode', 'Examples'],
    [
      ['Ammonia', 'Most toxic; needs a large amount of water', 'Ammonotelism', 'Many bony fishes, aquatic amphibians, aquatic insects'],
      ['Urea', 'Less toxic; made from ammonia in the liver', 'Ureotelism', 'Mammals, many terrestrial amphibians, marine fishes'],
      ['Uric acid', 'Least toxic; removed as pellet or paste with minimum loss of water', 'Uricotelism', 'Reptiles, birds, land snails, insects'],
    ],
    'Table comparing ammonia, urea and uric acid excretion with examples',
  ),
  tubules: table(
    ['Segment', 'Main work'],
    [
      ['PCT', 'Brush border epithelium; reabsorbs nearly all nutrients and 70–80 percent of electrolytes and water; secretes hydrogen ions, ammonia and potassium ions; absorbs bicarbonate'],
      ['Henle’s loop, descending limb', 'Permeable to water, almost impermeable to electrolytes: filtrate becomes concentrated'],
      ['Henle’s loop, ascending limb', 'Impermeable to water, transports electrolytes out: filtrate becomes dilute'],
      ['DCT', 'Conditional reabsorption of sodium ions and water; reabsorbs bicarbonate; secretes hydrogen and potassium ions and ammonia'],
      ['Collecting duct', 'Large amounts of water reabsorbed for concentrated urine; lets some urea into the medulla; secretes hydrogen and potassium ions'],
    ],
    'Table of the roles of the segments of the renal tubule',
  ),
};

export const deck1 = deck({
  part: 1,
  title: 'Excretory Products and their Elimination — Part 1: Modes of excretion, the kidney and filtration',
  goals: [
    'Compare ammonotelism, ureotelism and uricotelism with examples',
    'Name the excretory structures of different animals',
    'Describe the human excretory system, the kidney and the nephron',
    'Explain glomerular filtration and the glomerular filtration rate',
  ],
  slides: [
    sl('title', 'Excretory Products and their Elimination', {
      b: 'Part 1 — why animals must remove nitrogenous wastes, and the structures that do it.',
      v: flow('LR', [['p', 'Protein and nucleic acid breakdown'], ['a', 'Ammonia'], ['u', 'Urea'], ['x', 'Uric acid']], [['p', 'a'], ['a', 'u', 'liver'], ['a', 'x']], 'Flow from the breakdown of proteins to ammonia, urea and uric acid'),
      n: 'Animals accumulate ammonia, urea, uric acid, carbon dioxide, water and ions such as sodium, potassium and chloride through metabolism or excess intake. These must be removed totally or partially. Ammonia, urea and uric acid are the major forms of nitrogenous wastes.',
    }),
    sl('concept', 'Three ways to get rid of nitrogen', {
      b: 'The choice of nitrogenous waste depends largely on how much **water** the animal can spare.',
      v: V.modes,
      n: 'Ammonia is the most toxic and needs plenty of water, so ammonotelic animals live in water; ammonia, being very soluble, diffuses out across the body surface or the gills as ammonium ions. Land animals make less toxic urea in the liver. Reptiles, birds, land snails and insects save the most water by excreting uric acid as a pellet or paste.',
    }),
    sl('check', 'Quick check: least toxic waste', {
      b: 'Which waste can be removed with the least loss of water?',
      n: 'Quick check. Think of the pellet or paste of birds and lizards.',
      chk: 'toxic-mcq',
    }),
    sl('concept', 'Excretory structures in animals', {
      b: 'Most invertebrates have simple tubular excretory structures; vertebrates have complex tubular organs called **kidneys**.',
      v: table(['Structure', 'Animals', 'Main role'], [['Protonephridia (flame cells)', 'Flatworms such as Planaria, rotifers, some annelids, Amphioxus', 'Mainly osmoregulation'], ['Nephridia', 'Earthworms and other annelids', 'Remove nitrogenous wastes; fluid and ionic balance'], ['Malpighian tubules', 'Most insects, including cockroaches', 'Remove nitrogenous wastes; osmoregulation'], ['Antennal (green) glands', 'Crustaceans such as prawns', 'Excretion']], 'Table of excretory structures in animals'),
      n: 'Flame cells of flatworms mainly control ionic and fluid volume. Earthworm nephridia remove wastes and keep fluid and ionic balance. Insects use Malpighian tubules, and prawns use antennal glands, also called green glands.',
    }),
    sl('diagram', 'The human excretory system', {
      b: 'A pair of **kidneys**, one pair of **ureters**, a **urinary bladder** and a **urethra**.',
      v: V.urinary,
      n: 'The kidneys are reddish brown, bean shaped organs between the levels of the last thoracic and the third lumbar vertebra, close to the dorsal inner wall of the abdominal cavity. Each receives a renal artery and drains into a renal vein. Urine flows down the ureters to the bladder and leaves through the urethra.',
    }),
    sl('concept', 'The kidney in numbers', {
      b: 'Each adult kidney is roughly the size of a fist-sized bar of soap.',
      v: table(['Feature', 'Typical value'], [['Length', `${KIDNEY.length.join('–')} cm`], ['Width', `${KIDNEY.width.join('–')} cm`], ['Thickness', `${KIDNEY.thick.join('–')} cm`], ['Mass', `${KIDNEY.mass.join('–')} g`], ['Nephrons', 'nearly one million in each kidney']], 'Table of the size, mass and nephron number of a human kidney'),
      n: 'A kidney is ten to twelve centimetres long, five to seven wide and two to three thick, and weighs about one hundred and twenty to one hundred and seventy grams. Each contains nearly a million nephrons, its functional units.',
    }),
    sl('diagram', 'Inside the kidney', {
      b: 'A notch on the inner concave surface, the **hilum**, lets in the ureter, blood vessels and nerves. Inner to it lies the funnel-shaped **renal pelvis** with projections called **calyces**.',
      v: V.kidneyls,
      n: 'Under a tough outer capsule, the kidney has an outer cortex and an inner medulla. The medulla is divided into a few conical medullary pyramids that project into the calyces. The cortex dips between the pyramids as renal columns, the columns of Bertini.',
    }),
    sl('check', 'Quick check: kidney regions', {
      b: 'Name the part of the kidney described.',
      n: 'Quick check. Which tissue reaches in between the pyramids?',
      chk: 'bertini-mcq',
    }),
    sl('diagram', 'The nephron', {
      b: 'Each nephron has a **glomerulus** and a **renal tubule**. The glomerulus and **Bowman’s capsule** together form the **Malpighian body** (renal corpuscle).',
      v: V.nephron,
      n: 'The afferent arteriole, a fine branch of the renal artery, forms the glomerulus, and the efferent arteriole carries blood away. The tubule runs from Bowman’s capsule as the coiled proximal convoluted tubule, the hairpin Henle’s loop, and the distal convoluted tubule, which opens into a collecting duct. The efferent arteriole forms peritubular capillaries, and a U shaped vessel beside the loop, the vasa recta.',
    }),
    sl('concept', 'Cortical and juxtamedullary nephrons', {
      b: 'The Malpighian body, PCT and DCT lie in the **cortex**; Henle’s loop dips into the **medulla**.',
      v: table(['Feature', 'Cortical nephrons', 'Juxtamedullary nephrons'], [['Number', 'Majority', 'Some'], ['Henle’s loop', 'Too short; extends very little into the medulla', 'Very long; runs deep into the medulla'], ['Vasa recta', 'Absent or highly reduced', 'Present']], 'Table comparing cortical and juxtamedullary nephrons'),
      n: 'Most nephrons are cortical, with short loops. A few, the juxtamedullary nephrons, have very long loops that run deep into the medulla alongside the vasa recta. These long loops matter for making concentrated urine.',
    }),
    sl('example', 'Worked example 1: which waste suits which animal?', {
      b: 'Predict the main nitrogenous waste of each animal and give the reason.',
      ul: [
        'A rohu fish in a river → **ammonia**: plenty of water to carry it away across the gills.',
        'A camel in a desert → **urea**: a mammal, so ureotelic; urea is less toxic than ammonia.',
        'A garden lizard → **uric acid**: excreted as a paste with minimum loss of water.',
        'A cockroach → **uric acid**, removed by its **Malpighian tubules**.',
      ],
      v: table(['Animal', 'Main waste', 'Mode'], [['Rohu fish', 'Ammonia', 'Ammonotelic'], ['Camel', 'Urea', 'Ureotelic'], ['Garden lizard', 'Uric acid', 'Uricotelic'], ['Cockroach', 'Uric acid', 'Uricotelic']], 'Worked table matching four animals with their nitrogenous wastes'),
      n: 'Ask how much water the animal can afford to lose. Fish can flush toxic ammonia away. Mammals convert it to urea. Reptiles and insects, which must save water, excrete almost dry uric acid.',
    }),
    sl('concept', 'Step 1 of urine formation: glomerular filtration', {
      b: `Glomerular capillary **blood pressure** forces fluid through three layers: the **endothelium** of the glomerular vessels, the **epithelium of Bowman’s capsule** (podocytes with **filtration slits**) and a **basement membrane** between them. Almost all plasma constituents **except proteins** pass: this is **ultrafiltration**.`,
      v: flow('LR', [['b', 'Blood in glomerulus'], ['l', 'Endothelium, basement membrane, podocytes with slit pores'], ['f', 'Filtrate in Bowman’s capsule (no proteins)']], [['b', 'l', 'blood pressure'], ['l', 'f']], 'Flow of glomerular filtration through three layers into Bowman’s capsule'),
      n: `About eleven to twelve hundred millilitres of blood pass through the kidneys every minute, roughly one fifth of what each ventricle pumps. The amount of filtrate formed per minute is the glomerular filtration rate, about one hundred and twenty five millilitres a minute in a healthy person.`,
    }),
    sl('example', 'Worked example 2: from GFR to litres per day', {
      b: `The GFR of a healthy adult is about ${KIDNEY.gfr} mL per minute. How much filtrate is formed in a day? About what share of a cardiac output of 5000 mL per minute is the renal blood flow of ${KIDNEY.bloodFlow[0]} mL per minute?`,
      ul: [
        r`Minutes in a day: $24 \times 60 = ${MIN_PER_DAY}$.`,
        r`Filtrate: $${KIDNEY.gfr} \times ${MIN_PER_DAY} = ${KIDNEY.gfr * MIN_PER_DAY}$ mL, that is ${KIDNEY.filtrate} litres a day.`,
        r`Renal share: $\dfrac{${KIDNEY.bloodFlow[0]}}{5000} \times 100 = ${N.renalShare}$ percent, roughly one fifth.`,
      ],
      v: table(['Quantity', 'Value'], [['GFR', `${KIDNEY.gfr} mL per minute`], ['Filtrate per day', `${KIDNEY.filtrate} L`], ['Renal blood flow', `${N.renalShare} percent of cardiac output`]], `Worked table: ${KIDNEY.filtrate} litres of filtrate a day; renal blood flow about ${N.renalShare} percent of cardiac output`),
      n: 'One hundred and twenty five millilitres every minute, over fourteen hundred and forty minutes, makes one hundred and eighty thousand millilitres, or one hundred and eighty litres of filtrate each day. Yet we pass only a litre or so of urine, so almost all of it must be reabsorbed.',
    }),
    sl('check', 'Quick check: GFR', {
      b: 'What is the glomerular filtration rate of a healthy adult?',
      n: 'Quick check. Recall the volume filtered each minute.',
      chk: 'gfr-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Ammonia (ammonotelic, aquatic), urea (ureotelic, made in the liver), uric acid (uricotelic, saves water).',
        'Protonephridia (Planaria), nephridia (earthworm), Malpighian tubules (insects), antennal glands (prawn).',
        `Kidneys ${KIDNEY.length.join('–')} cm long, ${KIDNEY.mass.join('–')} g; capsule, cortex, medullary pyramids, columns of Bertini, calyces, pelvis, hilum.`,
        'Nephron: glomerulus, Bowman’s capsule, PCT, Henle’s loop, DCT, collecting duct; peritubular capillaries and vasa recta.',
        `Ultrafiltration through three layers; GFR about ${KIDNEY.gfr} mL per minute, ${KIDNEY.filtrate} L per day.`,
      ],
      v: V.nephron,
      n: 'To recap: aquatic animals excrete ammonia, mammals urea, and water saving animals uric acid. Our kidneys each hold about a million nephrons, which begin urine formation by filtering one hundred and eighty litres of fluid from the blood every day.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Give **two examples** for each mode of excretion.',
        'Label the **kidney section** and the **nephron** neatly, with the cortex and medulla marked.',
        'Name the **three layers** of the filtration membrane and say that **proteins** are not filtered.',
        'Convert **GFR** to litres per day and show the working.',
      ],
      n: 'Exam tips. Learn examples for each mode of excretion. Practise labelled drawings of the kidney section and the nephron. Know the three layers of the filter. And be ready to turn a filtration rate into litres per day.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Excretory Products and their Elimination — Part 2: Reabsorption, concentration, regulation and disorders',
  goals: [
    'Explain reabsorption and secretion and the roles of each segment of the tubule',
    'Explain the counter-current mechanism that concentrates urine',
    'Describe regulation by ADH, the renin–angiotensin mechanism and ANF',
    'Describe micturition, the role of other organs, and kidney disorders with their treatment',
  ],
  slides: [
    sl('title', 'Making urine', {
      b: 'Part 2 — how the filtrate is turned into urine, how the body controls it, and what happens when kidneys fail.',
      v: flow('LR', [['f', 'Glomerular filtration'], ['r', 'Reabsorption (nearly 99 percent)'], ['s', 'Tubular secretion'], ['u', 'Urine']], [['f', 'r'], ['r', 's'], ['s', 'u']], 'Flow of the three processes of urine formation'),
      n: 'Urine formation involves three processes: glomerular filtration, reabsorption and secretion. Filtration gives a large volume of filtrate. The tubules then take back almost all of it and add a few substances, leaving a small volume of urine.',
    }),
    sl('concept', 'Reabsorption and secretion', {
      b: `Nearly **${KIDNEY.reabsorbedPct} percent** of the filtrate is reabsorbed by the tubules, by **active** or **passive** mechanisms.`,
      v: table(['Process', 'Examples'], [['Active reabsorption', 'Glucose, amino acids, sodium ions'], ['Passive reabsorption', 'Nitrogenous wastes; water in the initial segments'], ['Tubular secretion', 'Hydrogen ions, potassium ions and ammonia added to the filtrate; keeps ionic and acid–base balance']], 'Table of active and passive reabsorption and tubular secretion'),
      n: 'The tubular cells pump back valuable substances such as glucose, amino acids and sodium. Water and some wastes follow passively. At the same time the cells secrete hydrogen ions, potassium ions and ammonia into the filtrate, which keeps the ionic and acid base balance of the body fluids.',
    }),
    sl('concept', 'What each segment does', {
      b: 'Different parts of the tubule have different jobs.',
      v: V.tubules,
      n: 'The proximal tubule does most of the reabsorbing. The two limbs of Henle’s loop behave oppositely: the descending limb lets water out, the ascending limb lets salts out. The distal tubule fine tunes sodium, water and acid base balance, and the collecting duct can reabsorb large amounts of water to make concentrated urine.',
    }),
    sl('example', 'Worked example 1: how much is reabsorbed?', {
      b: `A person forms ${KIDNEY.filtrate} L of filtrate and passes ${N.urine} L of urine in a day. How much filtrate is reabsorbed, and what percentage is that? How much of it is taken back in the PCT if that segment handles 70–80 percent?`,
      ul: [
        r`Reabsorbed: $${KIDNEY.filtrate} - ${N.urine} = ${N.reabL}$ L.`,
        r`Percentage: $\dfrac{${N.reabL}}{${KIDNEY.filtrate}} \times 100 \approx ${N.reabPct}$ percent, nearly 99 percent.`,
        r`PCT: $${KIDNEY.filtrate} \times \dfrac{70}{100} = ${N.pctLow}$ L to $${KIDNEY.filtrate} \times \dfrac{80}{100} = ${N.pctHigh}$ L.`,
      ],
      v: table(['Quantity', 'Litres per day'], [['Filtrate', String(KIDNEY.filtrate)], ['Urine', String(N.urine)], ['Reabsorbed', `${N.reabL} (about ${N.reabPct} percent)`], ['In the PCT', `${N.pctLow}–${N.pctHigh}`]], `Worked table: ${N.reabL} litres, about ${N.reabPct} percent, reabsorbed`),
      n: 'Take the urine away from the filtrate to get one hundred and seventy eight point five litres reabsorbed, a little over ninety nine percent. Seventy to eighty percent of the filtrate, one hundred and twenty six to one hundred and forty four litres, is taken back in the proximal tubule alone.',
    }),
    sl('check', 'Quick check: Henle’s loop', {
      b: 'Which property belongs to the descending limb of Henle’s loop?',
      n: 'Quick check. Does the descending limb let water or salts pass?',
      chk: 'descending-mcq',
    }),
    sl('diagram', 'Concentrating urine: the counter-current mechanism', {
      b: `Filtrate flows in **opposite directions** in the two limbs of Henle’s loop, and blood does the same in the two limbs of the **vasa recta**: two **counter-currents**. They keep the osmolarity of the medullary interstitium rising from about **${KIDNEY.osm.cortex}** in the cortex to about **${KIDNEY.osm.inner} mOsmol per L** in the inner medulla.`,
      v: V.counter,
      n: 'The gradient is mainly due to sodium chloride and urea. Sodium chloride leaves the ascending limb, is picked up by the descending vasa recta and returned to the interstitium by the ascending vasa recta. Small amounts of urea leave the collecting duct, enter the thin ascending limb and are carried back. This counter current mechanism maintains the gradient.',
    }),
    sl('example', 'Worked example 2: how concentrated can urine be?', {
      b: `The filtrate entering the tubule has about the osmolarity of plasma, ${KIDNEY.osm.cortex} mOsmol per L. The inner medulla reaches about ${KIDNEY.osm.inner}. How many times more concentrated than the filtrate can the urine become, and why?`,
      ul: [
        r`Factor: $\dfrac{${KIDNEY.osm.inner}}{${KIDNEY.osm.cortex}} = ${N.concFactor}$.`,
        'As the collecting duct passes through ever saltier medulla, **water leaves it** into the interstitium.',
        'Human kidneys can make urine **nearly four times** as concentrated as the initial filtrate.',
      ],
      v: table(['Place', 'Osmolarity (mOsmol per L)'], N.osmLevels.map((v, i) => [['Cortex', 'Outer medulla', 'Middle medulla', 'Inner medulla'][i], String(v)]), `Worked table: osmolarity rising ${N.osmLevels.join(', ')}`),
      n: 'Twelve hundred divided by three hundred is four. Water can leave the collecting duct only while the fluid outside is more concentrated, so the deepest medulla sets the limit: urine nearly four times as concentrated as the filtrate.',
    }),
    sl('check', 'Quick check: the gradient', {
      b: 'Judge the assertion and the reason about the medullary gradient.',
      n: 'Quick check. Which two substances build the gradient?',
      chk: 'counter-ar',
    }),
    sl('concept', 'Regulation by ADH', {
      b: 'Kidney function is monitored and regulated by **hormonal feedback** involving the **hypothalamus**, the **JGA** and, to some extent, the **heart**.',
      v: flow('LR', [['l', 'Excess loss of body fluid'], ['o', 'Osmoreceptors stimulate the hypothalamus'], ['a', 'ADH (vasopressin) released from the neurohypophysis'], ['w', 'More water reabsorbed from the later parts of the tubule'], ['d', 'Diuresis prevented']], [['l', 'o'], ['o', 'a'], ['a', 'w'], ['w', 'd']], 'Flow of the ADH feedback that conserves water'),
      n: 'Osmoreceptors respond to changes in blood volume, body fluid volume and ionic concentration. When the body loses too much fluid, the hypothalamus releases antidiuretic hormone from the neurohypophysis, and more water is reabsorbed. When fluid volume rises, the receptors switch off and less hormone is released. The hormone also constricts blood vessels, raising blood pressure and the filtration rate.',
    }),
    sl('concept', 'The renin–angiotensin mechanism and ANF', {
      b: 'A fall in glomerular blood flow, pressure or GFR activates the **JG cells** to release **renin**.',
      v: flow('LR', [['r', 'Renin'], ['a1', 'Angiotensinogen → angiotensin I → angiotensin II'], ['v', 'Vasoconstriction: glomerular pressure and GFR rise'], ['al', 'Aldosterone from adrenal cortex: sodium ions and water reabsorbed']], [['r', 'a1'], ['a1', 'v'], ['a1', 'al']], 'Flow of the renin–angiotensin–aldosterone mechanism'),
      n: 'Angiotensin two is a powerful vasoconstrictor, so it raises glomerular blood pressure and the filtration rate. It also makes the adrenal cortex release aldosterone, which increases reabsorption of sodium and water from the distal parts of the tubule. When more blood flows into the atria, the heart releases atrial natriuretic factor, which dilates vessels and lowers blood pressure, acting as a check on this mechanism.',
    }),
    sl('check', 'Quick check: ADH', {
      b: 'Predict the hormone response described.',
      n: 'Quick check. Does losing water raise or lower the release of antidiuretic hormone?',
      chk: 'adh-mcq',
    }),
    sl('concept', 'Micturition', {
      b: 'Urine is stored in the **urinary bladder** until the **CNS** gives a voluntary signal.',
      v: flow('LR', [['s', 'Bladder fills and stretches'], ['r', 'Stretch receptors signal the CNS'], ['m', 'Motor messages: bladder smooth muscle contracts, urethral sphincter relaxes'], ['u', 'Urine released']], [['s', 'r'], ['r', 'm'], ['m', 'u']], 'Flow of the micturition reflex'),
      n: 'Releasing urine is called micturition, and the neural mechanism behind it is the micturition reflex. An adult passes on average one to one and a half litres of urine a day, a light yellow, slightly acidic fluid with about twenty five to thirty grams of urea.',
    }),
    sl('concept', 'Other organs that help in excretion', {
      b: 'The **lungs, liver and skin** also remove wastes.',
      v: table(['Organ', 'What it removes'], [['Lungs', `Large amounts of carbon dioxide (about ${KIDNEY.lungsCO2} mL per minute) and water`], ['Liver', 'Bile with bilirubin, biliverdin, cholesterol, degraded steroid hormones, vitamins and drugs'], ['Skin: sweat glands', 'Sweat with NaCl, small amounts of urea and lactic acid'], ['Skin: sebaceous glands', 'Sterols, hydrocarbons and waxes in sebum'], ['Salivary glands', 'Small amounts of nitrogenous wastes']], 'Table of the excretory roles of the lungs, liver, skin and saliva'),
      n: 'Most of what the liver puts into bile leaves with the digestive wastes. Sweat mainly cools the body surface, but it also removes some wastes. Sebum forms a protective oily covering for the skin. Urine tests help doctors: glucose and ketone bodies in urine point to diabetes mellitus.',
    }),
    sl('concept', 'Disorders of the excretory system', {
      b: 'Malfunctioning kidneys let **urea accumulate in the blood** (**uraemia**), which can lead to **kidney failure**.',
      v: table(['Disorder or treatment', 'What it is'], [['Haemodialysis', 'Blood with heparin is passed through a cellophane tube in dialysing fluid that lacks nitrogenous wastes; wastes diffuse out; anti-heparin added before return'], ['Kidney transplantation', 'Ultimate correction of acute renal failure; donor preferably a close relative to reduce rejection'], ['Renal calculi', 'Stones of crystallised salts, such as oxalates, formed in the kidney'], ['Glomerulonephritis', 'Inflammation of the glomeruli of the kidney']], 'Table of kidney disorders and treatments'),
      n: 'In haemodialysis, blood from an artery is mixed with an anticoagulant such as heparin and pumped through a coiled cellophane tube bathed in fluid like plasma but without nitrogenous wastes. The wastes move out down their concentration gradient, and the cleared blood returns through a vein after anti heparin is added.',
    }),
    sl('check', 'Quick check: dialysis', {
      b: 'Why does urea leave the blood in a dialysing unit?',
      n: 'Quick check. Which side of the membrane has no nitrogenous wastes?',
      chk: 'dialysis-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        `Filtration, reabsorption (nearly ${KIDNEY.reabsorbedPct} percent; PCT 70–80 percent) and secretion (hydrogen ions, potassium ions, ammonia).`,
        'Descending limb: water out; ascending limb: salts out; collecting duct: water out for concentrated urine.',
        `Counter-current in Henle’s loop and vasa recta keeps a gradient from ${KIDNEY.osm.cortex} to ${KIDNEY.osm.inner} mOsmol per L (NaCl and urea).`,
        'ADH conserves water; renin–angiotensin–aldosterone raises GFR and sodium reabsorption; ANF checks it.',
        'Micturition reflex; 1–1.5 L urine a day, 25–30 g urea; lungs, liver, skin, saliva help.',
        'Uraemia, kidney failure, haemodialysis, transplantation, renal calculi, glomerulonephritis.',
      ],
      v: V.counter,
      n: 'To recap: the tubules reclaim nearly all the filtrate, and the counter current system lets us make concentrated urine. Hormones from the hypothalamus, the kidney and the heart adjust the process. When kidneys fail, dialysis or a transplant can take over.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'State what the **two limbs of Henle’s loop** are permeable to; examiners test this often.',
        'Explain the **counter-current mechanism** with the **300 to 1200** gradient, NaCl and urea.',
        'Write the **renin–angiotensin–aldosterone** steps in order and say how **ANF** opposes them.',
        'Describe **haemodialysis** step by step: heparin, cellophane tube, dialysing fluid, anti-heparin.',
      ],
      n: 'Exam tips. Know what each limb of Henle’s loop lets through. Explain the counter current mechanism with the gradient and the two substances that build it. Write the renin angiotensin steps in order. And describe dialysis step by step.',
    }),
  ],
});
