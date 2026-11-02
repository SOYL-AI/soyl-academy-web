// ch16 Excretory Products and their Elimination — question bank. AR keys: a b a c d b.
import { mk, add, r } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { KIDNEY, N, filtrateL, reabsorbedPct, round } from './calc.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;

// ---------------------------------------------------------------- t01 modes of excretion, excretory organs, kidney, nephron
add('toxic-mcq', mcq({
  stem: 'Which nitrogenous waste is the least toxic and can be removed with the minimum loss of water?',
  right: 'Uric acid',
  wrong: ['Ammonia', 'Urea', 'Ammonium ions'],
  sol: 'Uric acid is the least toxic and is excreted as a pellet or paste with minimum water loss; ammonia is the most toxic — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('bonyfish-mcq', mcq({
  stem: 'A freshwater bony fish produces ammonia as its main nitrogenous waste. How is most of this ammonia removed from its body?',
  right: 'It diffuses out across the gill surfaces as ammonium ions.',
  wrong: ['It is converted to uric acid and passed as a paste.', 'It is stored in the liver for the life of the fish.', 'It is changed into urea in the gills.'],
  sol: 'Ammonia is readily soluble and is generally excreted by diffusion across body surfaces or through the gills as ammonium ions; the kidneys play no significant role — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('lizard-mcq', mcq({
  stem: 'A field biologist finds that the droppings of a desert lizard contain a whitish paste and almost no water. Which mode of excretion does this show, and what is its advantage?',
  right: 'Uricotelism, which removes nitrogen with minimum loss of water',
  wrong: ['Ammonotelism, which removes the most toxic waste quickly', 'Ureotelism, which uses the liver to make uric acid', 'Ammonotelism, which needs very little water'],
  sol: 'Reptiles excrete uric acid as a pellet or paste with minimum water loss, which suits a desert animal — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('organs-mcq', mcq({
  stem: 'Which pair of animal and excretory structure is correctly matched?',
  right: 'Prawn — antennal (green) glands',
  wrong: ['Earthworm — Malpighian tubules', 'Cockroach — flame cells', 'Planaria — nephridia'],
  sol: 'Prawns have antennal glands; earthworms nephridia; cockroaches Malpighian tubules; Planaria flame cells (protonephridia) — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('bertini-mcq', mcq({
  stem: 'In a section of a kidney, strips of cortex are seen reaching inwards between the conical masses of the medulla. These strips are called',
  right: 'columns of Bertini',
  wrong: ['medullary pyramids', 'calyces', 'renal pelvis'],
  sol: 'The cortex extends between the medullary pyramids as renal columns called the columns of Bertini — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('hilum-mcq', mcq({
  stem: 'The ureter, blood vessels and nerves enter or leave the kidney through a notch on its inner concave surface called the',
  right: 'hilum',
  wrong: ['calyx', 'cortex', 'capsule'],
  sol: 'The hilum is the notch on the inner concave surface; inner to it lies the renal pelvis with calyces — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('ureo-mcq', mcq({
  stem: 'A frog tadpole living in a pond excretes mainly ammonia, but the adult frog on land excretes mainly urea. In which organ of the adult is ammonia converted to urea?',
  right: 'Liver',
  wrong: ['Kidney', 'Skin', 'Urinary bladder'],
  sol: 'In ureotelic animals, ammonia produced by metabolism is converted into urea in the liver and then filtered out by the kidneys — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('juxta-mcq', mcq({
  stem: 'How does a juxtamedullary nephron differ from a cortical nephron?',
  right: 'Its Henle’s loop is very long and runs deep into the medulla, beside a well-developed vasa recta.',
  wrong: ['It has no Bowman’s capsule, so its glomerulus lies free in the medulla.', 'Its Henle’s loop is short and stays almost entirely in the cortex.', 'It lacks a collecting duct and opens straight into the ureter.'],
  sol: 'Juxtamedullary nephrons have very long loops deep in the medulla; in cortical nephrons the loop is short and the vasa recta absent or highly reduced — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('corpuscle-mcq', mcq({
  stem: 'Which two structures together make up the Malpighian body (renal corpuscle)?',
  right: 'Glomerulus and Bowman’s capsule',
  wrong: ['PCT and DCT', 'Henle’s loop and vasa recta', 'Collecting duct and renal pelvis'],
  sol: 'Bowman’s capsule encloses the glomerulus; together they form the Malpighian body — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('efferent-mcq', mcq({
  stem: 'A dye injected into the efferent arteriole of a nephron would next appear in',
  right: 'the peritubular capillaries and vasa recta around the tubule',
  wrong: ['the glomerular capillaries of the same nephron', 'the cavity of Bowman’s capsule with the filtrate', 'the renal artery on its way into the kidney'],
  sol: 'The efferent arteriole leaves the glomerulus and forms the peritubular capillary network, of which the vasa recta is a part — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('ammonia-ar', ar({
  a: 'Most ammonotelic animals live in water.',
  r: 'Ammonia is highly toxic and needs a large amount of water for its elimination.',
  key: 'a',
  sol: 'Both are true, and the need for much water to flush away toxic ammonia explains why ammonotelic animals are aquatic — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('vasarecta-ar', ar({
  a: 'The vasa recta is absent or highly reduced in cortical nephrons.',
  r: 'The glomerulus is a tuft of capillaries formed by the afferent arteriole.',
  key: 'b',
  sol: 'Both statements are true, but the origin of the glomerulus does not explain the state of the vasa recta — option (b).',
  d: 2, c: 'understanding', t: [1],
}));
add('nephrons-tf', tf({
  stem: 'Each human kidney contains nearly one million nephrons.',
  key: 't',
  sol: 'True. Each kidney has nearly one million nephrons, its functional units.',
  d: 1, c: 'recall', t: [1],
}));
add('malpighian-tf', tf({
  stem: 'Malpighian tubules are the excretory structures of earthworms.',
  key: 'f',
  sol: 'False. Earthworms excrete through nephridia; Malpighian tubules are found in most insects, such as cockroaches.',
  d: 1, c: 'understanding', t: [1],
}));
add('pelvis-fill', fill({
  stem: 'Inner to the hilum of the kidney is a broad, funnel-shaped space with projections called calyces. This space is the renal ______.',
  acc: [['pelvis']],
  sol: 'Renal pelvis.',
  d: 1, c: 'recall', t: [1],
}));
add('organs-match', match({
  stem: 'Match each animal (column I) with its excretory structure (column II).',
  pairs: [
    ['Planaria', 'Protonephridia (flame cells)'],
    ['Earthworm', 'Nephridia'],
    ['Cockroach', 'Malpighian tubules'],
    ['Prawn', 'Antennal glands'],
  ],
  order: [3, 1, 0, 2],
  sol: 'Planaria: flame cells; earthworm: nephridia; cockroach: Malpighian tubules; prawn: antennal (green) glands.',
  d: 1, c: 'recall', t: [1],
}));
add('habitat-short', short({
  marks: 2,
  stem: 'Pigeons and garden lizards excrete uric acid, whereas rohu fish excrete ammonia. Explain how the habitat of each accounts for the difference.',
  model: 'Ammonia is **highly toxic** and needs **a lot of water** to remove; a **rohu** in water can let it diffuse out across the **gills**. Pigeons and lizards live on land and must **conserve water**, so they excrete **uric acid**, the least toxic waste, as a **paste or pellet** with minimum water loss.',
  sol: 'Water availability decides the waste.',
  scheme: [['Fish: ammonia needs much water, removed via gills', 1], ['Birds and reptiles: uric acid saves water', 1]],
  d: 2, c: 'application', t: [1],
}));
add('kidneyls-short', short({
  marks: 2,
  stem: 'Describe what is seen in a longitudinal section of a human kidney.',
  model: 'Under a tough **capsule** lie an outer **cortex** and an inner **medulla**. The medulla forms conical **medullary pyramids** that project into **calyces**, and the cortex extends between them as **columns of Bertini**. The calyces open into the funnel-shaped **renal pelvis** at the **hilum**, where the ureter leaves.',
  sol: 'Capsule, cortex, medulla, pyramids, columns, calyces, pelvis.',
  scheme: [['Capsule, cortex and medulla with pyramids', 1], ['Columns of Bertini, calyces, pelvis, hilum', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('modes-short', short({
  marks: 3,
  stem: 'Compare ammonotelism, ureotelism and uricotelism, giving the waste, its toxicity and two animal examples of each.',
  model: '**Ammonotelism:** waste **ammonia**, the **most toxic**, needing much water; many **bony fishes** and **aquatic amphibians** (also aquatic insects).\n\n**Ureotelism:** waste **urea**, less toxic, made from ammonia in the **liver**; **mammals** and many **terrestrial amphibians** (also marine fishes).\n\n**Uricotelism:** waste **uric acid**, the **least toxic**, removed as a pellet or paste with **minimum water loss**; **reptiles** and **birds** (also land snails and insects).',
  sol: 'Three modes with wastes and examples.',
  scheme: [['Ammonotelism with examples', 1], ['Ureotelism with examples', 1], ['Uricotelism with examples', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('nephron-short', short({
  marks: 3,
  stem: 'Name the parts of a nephron in the order in which the filtrate passes through them, and state which parts lie in the cortex and which dip into the medulla.',
  model: 'Filtrate forms in **Bowman’s capsule** around the **glomerulus** (together the Malpighian body), then flows through the **proximal convoluted tubule**, the **descending and ascending limbs of Henle’s loop**, the **distal convoluted tubule** and into a **collecting duct**. The Malpighian body, PCT and DCT lie in the **cortex**; **Henle’s loop** dips into the **medulla**, and the collecting duct runs through it to the pelvis.',
  sol: 'Order of parts; cortex and medulla.',
  scheme: [['Parts in order', 2], ['Cortical and medullary positions', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('system-long', long({
  stem: 'Describe the human excretory system. Give the position, size and internal structure of a kidney, and describe the structure of a nephron with its blood supply.',
  model: `**System.** A pair of kidneys, one pair of ureters, a urinary bladder and a urethra.\n\n**Kidney.** The reddish brown, bean-shaped kidneys lie between the levels of the last thoracic and third lumbar vertebra, close to the dorsal inner wall of the abdominal cavity. Each is about ${KIDNEY.length.join('–')} cm long, ${KIDNEY.width.join('–')} cm wide and ${KIDNEY.thick.join('–')} cm thick and weighs ${KIDNEY.mass.join('–')} g. A notch, the hilum, on the inner concave surface admits the ureter, vessels and nerves; inner to it is the renal pelvis with calyces. Under a tough capsule are the outer cortex and inner medulla; the medulla forms medullary pyramids projecting into the calyces, and the cortex extends between them as columns of Bertini.\n\n**Nephron.** Each kidney has nearly one million nephrons. The afferent arteriole, a branch of the renal artery, forms the glomerulus, enclosed by the double-walled Bowman’s capsule; together they are the Malpighian body. The tubule continues as the coiled PCT, the hairpin Henle’s loop with descending and ascending limbs, and the coiled DCT, which opens into a collecting duct leading to the pelvis. The efferent arteriole leaves the glomerulus and forms peritubular capillaries; a minute vessel running parallel to Henle’s loop forms the U-shaped vasa recta. Most nephrons are cortical, with short loops and little or no vasa recta; juxtamedullary nephrons have long loops deep in the medulla.`,
  sol: 'System, kidney, nephron with blood supply.',
  scheme: [['Organs of the system', 0.5], ['Kidney position and size', 1], ['Internal structure of kidney', 1.5], ['Nephron and blood supply', 2]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [1],
}));
add('modes-long', long({
  stem: 'A museum display asks: “Why do a goldfish, a cat and a sparrow get rid of nitrogen in different chemical forms?” Write the explanation for the display, and add the excretory structures used by invertebrates such as flatworms, earthworms, insects and prawns.',
  model: '**The problem.** Breaking down proteins and nucleic acids produces ammonia, which must be removed. The form an animal excretes depends mainly on how much water it can spare.\n\n**Goldfish: ammonia.** Ammonia is the most toxic waste and needs a large amount of water. A fish lives in water, so the readily soluble ammonia simply diffuses out across the body surface and gills as ammonium ions. This is ammonotelism, also seen in aquatic amphibians and aquatic insects.\n\n**Cat: urea.** A land mammal cannot spend so much water. Its liver converts ammonia into less toxic urea, which is released into the blood and removed by the kidneys. This is ureotelism, shared by many terrestrial amphibians and marine fishes.\n\n**Sparrow: uric acid.** Birds, like reptiles, land snails and insects, must save as much water as possible. They excrete uric acid, the least toxic form, as a pellet or paste with minimum loss of water: uricotelism.\n\n**Invertebrates.** Flatworms such as Planaria use protonephridia or flame cells, mainly for osmoregulation; earthworms use nephridia; insects such as cockroaches use Malpighian tubules; and crustaceans such as prawns use antennal or green glands.',
  sol: 'Three modes linked to water; invertebrate structures.',
  scheme: [['Link between waste and water availability', 1], ['Ammonotelism explained', 1], ['Ureotelism explained', 1], ['Uricotelism explained', 1], ['Four invertebrate structures', 1]],
  wl: [80, 240],
  d: 3, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 urine formation and regulation
add('gfr-mcq', mcq({
  stem: 'The glomerular filtration rate of a healthy adult is approximately',
  right: `${KIDNEY.gfr} mL per minute`,
  wrong: ['12.5 mL per minute', '1250 mL per minute', '180 mL per minute'],
  sol: `GFR is about ${KIDNEY.gfr} mL per minute, which is ${KIDNEY.filtrate} litres a day — option (@K).`,
  d: 1, c: 'recall', t: [2],
}));
add('ultra-mcq', mcq({
  stem: 'A sample of fluid is drawn from the Bowman’s capsule of a healthy nephron. Which constituent of plasma would be almost completely missing from it?',
  right: 'Plasma proteins',
  wrong: ['Glucose', 'Urea', 'Sodium ions'],
  sol: 'Ultrafiltration lets almost all plasma constituents through except the proteins — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('glucose-mcq', mcq({
  stem: 'Glucose is present in the glomerular filtrate of a healthy person but not in the urine. What happens to it?',
  right: 'It is actively reabsorbed, mainly in the proximal convoluted tubule.',
  wrong: ['It is passively secreted into the collecting duct.', 'It is broken down by the podocytes.', 'It is reabsorbed only in the ascending limb of Henle’s loop.'],
  sol: 'Glucose, amino acids and sodium ions are reabsorbed actively; nearly all essential nutrients are reabsorbed in the PCT — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('descending-mcq', mcq({
  stem: 'The descending limb of Henle’s loop is',
  right: 'permeable to water but almost impermeable to electrolytes',
  wrong: ['impermeable to water but permeable to electrolytes', 'impermeable to both water and electrolytes', 'the main site of glucose reabsorption'],
  sol: 'The descending limb lets water out, so the filtrate becomes concentrated as it moves down; the ascending limb is the reverse — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('ascending-mcq', mcq({
  stem: 'Filtrate leaving the top of the ascending limb of Henle’s loop is more dilute than when it entered the bottom of that limb. Why?',
  right: 'Electrolytes are transported out of the limb, but water cannot follow because the limb is impermeable to it.',
  wrong: ['Water enters the limb from the salty medulla and mixes with the filtrate.', 'Large amounts of urea are secreted into the limb from the vasa recta.', 'Glucose is added to the filtrate in this limb, raising its volume.'],
  sol: 'The ascending limb is impermeable to water but allows transport of electrolytes, so the filtrate is diluted as it rises — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('adh-mcq', mcq({
  stem: 'After a long walk in summer without drinking water, a hiker loses much body fluid. What is the expected response of his body?',
  right: 'More ADH is released, more water is reabsorbed, and a small volume of concentrated urine is formed.',
  wrong: ['ADH release stops, so a large volume of dilute urine is formed.', 'ANF is released from the atria, and the kidneys excrete more water.', 'Renin release stops, and the GFR and urine volume rise sharply.'],
  sol: 'Fluid loss activates osmoreceptors; the hypothalamus releases ADH from the neurohypophysis, which increases water reabsorption and prevents diuresis — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('renin-mcq', mcq({
  stem: 'A fall in glomerular blood pressure activates the juxtaglomerular cells to release',
  right: 'renin',
  wrong: ['ADH', 'ANF', 'aldosterone'],
  sol: 'A fall in glomerular blood flow, pressure or GFR makes the JG cells release renin — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('anf-mcq', mcq({
  stem: 'A patient receives a large volume of fluid through a drip and blood flow into the atria of his heart rises. Which response follows?',
  right: 'The heart releases ANF, which dilates blood vessels and lowers blood pressure.',
  wrong: ['The heart releases renin, which raises blood pressure.', 'The adrenal cortex releases more aldosterone.', 'The neurohypophysis releases more ADH.'],
  sol: 'Increased blood flow to the atria causes release of atrial natriuretic factor, which causes vasodilation and lowers blood pressure, checking the renin–angiotensin mechanism — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('aldosterone-mcq', mcq({
  stem: 'Angiotensin II stimulates the adrenal cortex to release aldosterone. What does aldosterone do?',
  right: 'Increases reabsorption of sodium ions and water from the distal parts of the tubule',
  wrong: ['Increases the secretion of glucose into the urine', 'Dilates the afferent arteriole and lowers blood pressure', 'Stops filtration in the glomerulus'],
  sol: 'Aldosterone causes reabsorption of sodium ions and water from the distal parts of the tubule, raising blood pressure and GFR — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('desert-mcq', mcq({
  stem: 'Kidneys of a desert rodent that never drinks water have a high proportion of nephrons with very long loops of Henle reaching deep into the medulla. What is the best explanation?',
  right: 'Long loops build a steeper medullary osmolarity gradient, so more water is reabsorbed and very concentrated urine is formed.',
  wrong: ['Long loops filter more blood, so a larger volume of dilute urine is formed.', 'Long loops secrete uric acid in place of urea, so no water is needed at all.', 'Long loops let glucose leave in the urine, so the rodent saves energy on reabsorption.'],
  sol: 'Henle’s loop and the vasa recta maintain the medullary gradient that draws water out of the collecting duct; longer loops in juxtamedullary nephrons allow more concentrated urine — option (@K).',
  d: 3, c: 'analysis', t: [1, 2],
}));
add('counter-ar', ar({
  a: 'The osmolarity of the medullary interstitial fluid increases from about 300 mOsmol per L in the cortex to about 1200 mOsmol per L in the inner medulla.',
  r: 'This gradient is mainly caused by NaCl and urea kept in the medulla by the counter-current arrangement of Henle’s loop and the vasa recta.',
  key: 'a',
  sol: 'Both are true, and the accumulation of NaCl and urea through the counter-current mechanism explains the gradient — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('anf-ar', ar({
  a: 'ANF acts as a check on the renin–angiotensin mechanism.',
  r: 'ANF constricts blood vessels and raises blood pressure.',
  key: 'c',
  sol: 'A is true; R is false, because ANF causes vasodilation and lowers blood pressure, opposing angiotensin II — option (c).',
  d: 3, c: 'understanding', t: [2],
}));
add('descend-ar', ar({
  a: 'The filtrate becomes more dilute as it flows down the descending limb of Henle’s loop.',
  r: 'The descending limb is permeable to water but almost impermeable to electrolytes.',
  key: 'd',
  sol: 'A is false: water leaves the descending limb, so the filtrate becomes more concentrated as it moves down. R is true — option (d).',
  d: 3, c: 'application', t: [2],
}));
add('ultra-tf', tf({
  stem: 'During glomerular filtration, plasma proteins pass freely into Bowman’s capsule along with water and glucose.',
  key: 'f',
  sol: 'False. Ultrafiltration lets almost all plasma constituents through except the proteins.',
  d: 1, c: 'understanding', t: [2],
}));
add('renin-fill', fill({
  stem: 'Juxtaglomerular cells respond to a fall in GFR by releasing the enzyme ______, which converts angiotensinogen to angiotensin I.',
  acc: [['renin']],
  sol: 'Renin.',
  d: 1, c: 'recall', t: [2],
}));
add('filt100-num', num({
  stem: 'Because of a kidney disease, a patient’s GFR falls to 100 mL per minute. How many litres of filtrate will her kidneys now form in a day?',
  value: N.filt100, unit: 'L',
  sol: r`$100 \times 1440 = 144000$ mL per day, so the filtrate is $\dfrac{144000}{1000} = ${N.filt100}$ L.`,
  scheme: [[`${N.filt100} L`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === filtrateL(100) || 'value');
add('reab-num', num({
  stem: `On a day when a student forms ${KIDNEY.filtrate} L of glomerular filtrate and passes only 1 L of urine, what percentage of the filtrate is reabsorbed? (Two decimal places.)`,
  value: N.reab1, tol: 0.01, unit: '%',
  sol: r`$\dfrac{${KIDNEY.filtrate} - 1}{${KIDNEY.filtrate}} \times 100 = \dfrac{179}{180} \times 100 \approx ${N.reab1}$ percent.`,
  scheme: [[`${N.reab1}%`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === reabsorbedPct(180, 1) || 'value');
add('pct-num', num({
  stem: `If the proximal convoluted tubules reabsorb 70 percent of a daily filtrate of ${KIDNEY.filtrate} L, how many litres do they take back?`,
  value: N.pctLow, unit: 'L',
  sol: r`$${KIDNEY.filtrate} \times \dfrac{70}{100} = ${N.pctLow}$ L.`,
  scheme: [[`${N.pctLow} L`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => q.answer.value === 126 || 'value');
add('conc-num', num({
  stem: `The glomerular filtrate has an osmolarity of about ${KIDNEY.osm.cortex} mOsmol per L, and the most concentrated urine a person can make matches the inner medulla, about ${KIDNEY.osm.inner} mOsmol per L. How many times more concentrated than the filtrate is this urine?`,
  value: N.concFactor,
  sol: r`$\dfrac{${KIDNEY.osm.inner}}{${KIDNEY.osm.cortex}} = ${N.concFactor}$ times, the “nearly four times” of the textbook.`,
  scheme: [[`${N.concFactor}`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 4 || 'value');
add('share-num', num({
  stem: `About ${KIDNEY.bloodFlow[0]} mL of blood flows through the kidneys every minute, while each ventricle pumps 5000 mL per minute. What percentage of the cardiac output goes to the kidneys?`,
  value: N.renalShare, unit: '%',
  sol: r`$\dfrac{${KIDNEY.bloodFlow[0]}}{5000} \times 100 = ${N.renalShare}$ percent, roughly one-fifth.`,
  scheme: [[`${N.renalShare}%`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => q.answer.value === 22 || 'value');
add('filtration-short', short({
  marks: 2,
  stem: 'Explain what makes glomerular filtration an ultrafiltration, naming the layers through which blood is filtered.',
  model: 'Glomerular **blood pressure** forces fluid through three layers: the **endothelium** of the glomerular capillaries, a **basement membrane**, and the **epithelium of Bowman’s capsule**, whose **podocytes** leave **filtration slits**. The filter is so fine that almost everything in plasma passes **except the proteins**: hence ultrafiltration.',
  sol: 'Three layers; proteins held back.',
  scheme: [['Blood pressure and the three layers', 1], ['All but proteins pass: ultrafiltration', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('jga-short', short({
  marks: 2,
  stem: 'What is the juxtaglomerular apparatus, and how does it help when the GFR falls?',
  model: 'The **JGA** is a sensitive region formed by **cellular modifications in the DCT and the afferent arteriole** where they touch. When GFR falls, its **JG cells release renin**, which starts the renin–angiotensin mechanism, raising glomerular blood flow and pressure and bringing the **GFR back to normal**.',
  sol: 'Structure and renin.',
  scheme: [['DCT and afferent arteriole at contact', 1], ['Renin release restores GFR', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('raas-short', short({
  marks: 2,
  stem: 'A person loses a lot of blood in an accident and his glomerular blood pressure falls. Outline the renin–angiotensin response that helps restore his GFR.',
  model: 'JG cells release **renin**, which converts **angiotensinogen** to **angiotensin I** and then **angiotensin II**. Angiotensin II, a powerful **vasoconstrictor**, raises **glomerular blood pressure** and GFR, and makes the adrenal cortex release **aldosterone**, which increases **sodium and water reabsorption**.',
  sol: 'Renin → angiotensin II → vasoconstriction, aldosterone.',
  scheme: [['Renin to angiotensin II', 1], ['Vasoconstriction and aldosterone effects', 1]],
  d: 2, c: 'application', t: [2],
}));
add('tubules-short', short({
  marks: 3,
  stem: 'State the main functions of the PCT, Henle’s loop and the DCT in urine formation.',
  model: '**PCT:** its brush border reabsorbs nearly all essential nutrients and **70–80 percent of electrolytes and water**; it secretes hydrogen ions, ammonia and potassium ions and absorbs bicarbonate.\n\n**Henle’s loop:** maintains the **high osmolarity of the medulla**; the descending limb lets **water** out, the ascending limb lets **electrolytes** out.\n\n**DCT:** **conditional reabsorption** of sodium ions and water; absorbs bicarbonate and secretes hydrogen and potassium ions and ammonia to keep **pH and sodium–potassium balance**.',
  sol: 'Roles of three segments.',
  scheme: [['PCT', 1], ['Henle’s loop', 1], ['DCT', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('counter-short', short({
  marks: 3,
  stem: 'How do Henle’s loop and the vasa recta together allow the kidney to produce concentrated urine?',
  model: 'Filtrate flows in **opposite directions** in the two limbs of Henle’s loop, and blood in the two limbs of the **vasa recta**: **counter-currents**. NaCl leaving the ascending limb passes into the descending vasa recta and is returned to the interstitium by its ascending limb; **urea** cycles between the collecting duct and the ascending limb. This keeps a **gradient of about 300 to 1200 mOsmol per L**, so **water leaves the collecting duct**, concentrating the urine.',
  sol: 'Counter-currents, NaCl and urea, gradient, water from collecting duct.',
  scheme: [['Opposite flows in loop and vasa recta', 1], ['NaCl and urea exchange builds 300–1200 gradient', 1], ['Water drawn from collecting duct', 1]],
  d: 3, c: 'analysis', t: [2],
}));
add('adh-short', short({
  marks: 3,
  stem: 'On a cool day a girl drinks two litres of water within an hour; on a hot day she sweats heavily and drinks little. Using the ADH feedback mechanism, explain how her urine differs on the two days.',
  model: 'On the **hot day**, fluid loss activates **osmoreceptors**, and the **hypothalamus** releases **ADH** from the **neurohypophysis**. ADH increases **water reabsorption** from the later parts of the tubule, preventing diuresis, so she passes **little, concentrated urine**. On the **cool day**, the extra body fluid **switches off the osmoreceptors** and **ADH release is suppressed**, so less water is reabsorbed and she passes **much dilute urine**.',
  sol: 'ADH high when dehydrated; low after drinking.',
  scheme: [['Osmoreceptors, hypothalamus, ADH from neurohypophysis', 1], ['Hot day: more water reabsorbed, little concentrated urine', 1], ['Cool day: ADH suppressed, much dilute urine', 1]],
  d: 2, c: 'application', t: [2],
}));
add('urine-long', long({
  stem: 'Describe the formation of urine in a human nephron, explaining glomerular filtration, reabsorption and tubular secretion and the part played by each segment of the tubule.',
  model: `**Filtration.** About ${KIDNEY.bloodFlow.join('–')} mL of blood reaches the kidneys each minute. Glomerular blood pressure forces fluid through the capillary endothelium, the basement membrane and the epithelium of Bowman’s capsule, whose podocytes leave filtration slits. Everything in plasma except proteins passes: ultrafiltration. The GFR is about ${KIDNEY.gfr} mL per minute, ${KIDNEY.filtrate} litres a day.\n\n**Reabsorption.** Nearly ${KIDNEY.reabsorbedPct} percent of the filtrate is taken back. Glucose, amino acids and sodium ions are reabsorbed actively; nitrogenous wastes and, in the early segments, water passively.\n\n**Secretion.** Tubular cells add hydrogen ions, potassium ions and ammonia to the filtrate, keeping ionic and acid–base balance.\n\n**Segments.** The PCT, with a brush border, reabsorbs nearly all nutrients and 70–80 percent of electrolytes and water, and secretes hydrogen ions, ammonia and potassium ions. In Henle’s loop the descending limb is permeable to water, concentrating the filtrate, and the ascending limb transports electrolytes out but not water, diluting it; the loop keeps the medulla highly concentrated. The DCT carries out conditional reabsorption of sodium ions and water and adjusts pH and potassium. The collecting duct reabsorbs large amounts of water to concentrate the urine, passes some urea into the medulla, and secretes hydrogen and potassium ions.`,
  sol: 'Three processes and segment roles.',
  scheme: [['Filtration with layers and GFR', 1.5], ['Reabsorption, active and passive', 1], ['Secretion', 0.5], ['Roles of PCT, loop, DCT, collecting duct', 2]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [2],
}));
add('counter-long', long({
  stem: 'Explain the counter-current mechanism of the mammalian kidney. Why would a person whose Henle’s loops could not transport NaCl out of the ascending limb pass large volumes of dilute urine?',
  model: `**Arrangement.** Henle’s loop dips into the medulla beside the vasa recta. Filtrate flows down the descending limb and up the ascending limb, in opposite directions, forming a counter-current; blood flows the same way in the two limbs of the vasa recta.\n\n**Building the gradient.** The descending limb is permeable to water but almost impermeable to electrolytes, while the ascending limb is impermeable to water but transports NaCl out into the interstitium. This NaCl is taken up by the descending limb of the vasa recta and returned to the interstitium by its ascending limb, so it is not washed away. Small amounts of urea leave the collecting duct, enter the thin ascending limb and are returned to the interstitium by the collecting tubule. Together these keep the medullary osmolarity rising from about ${KIDNEY.osm.cortex} mOsmol per L in the cortex to about ${KIDNEY.osm.inner} in the inner medulla.\n\n**Concentrating urine.** As the collecting duct passes through this increasingly concentrated medulla, water moves out of it, so urine up to nearly four times as concentrated as the filtrate can be formed.\n\n**The patient.** If NaCl could not leave the ascending limb, the medullary gradient would not build up. Without a concentrated interstitium, little water would be drawn out of the collecting duct even when ADH is present, so large volumes of dilute urine would be passed.`,
  sol: 'Counter-current mechanism; prediction.',
  scheme: [['Counter-current arrangement', 1], ['Permeabilities and NaCl recycling via vasa recta', 1.5], ['Urea and the 300–1200 gradient', 1], ['Water leaves collecting duct', 0.5], ['Prediction for the patient', 1]],
  wl: [80, 240],
  d: 3, c: 'application', t: [2],
}));
add('regulation-long', long({
  stem: 'Compare how ADH, the renin–angiotensin–aldosterone mechanism and ANF act on the kidney and on blood pressure. Predict which of them would be most active (i) after heavy sweating on a hot day and (ii) after a large volume of fluid is given rapidly through a drip, giving reasons.',
  model: '**ADH.** Excessive loss of fluid stimulates osmoreceptors and the hypothalamus, which releases antidiuretic hormone from the neurohypophysis. ADH increases water reabsorption from the later parts of the tubule, preventing diuresis; it also constricts blood vessels, raising blood pressure and GFR. A rise in body fluid volume switches it off.\n\n**Renin–angiotensin–aldosterone.** A fall in glomerular blood flow, pressure or GFR makes the JG cells release renin, which converts angiotensinogen to angiotensin I and then angiotensin II. Angiotensin II is a powerful vasoconstrictor that raises glomerular pressure and GFR, and it stimulates the adrenal cortex to release aldosterone, which increases reabsorption of sodium ions and water from the distal tubule, raising blood pressure.\n\n**ANF.** Increased blood flow to the atria makes the heart release atrial natriuretic factor, which causes vasodilation and lowers blood pressure, acting as a check on the renin–angiotensin mechanism.\n\n**(i) Heavy sweating.** Body fluid and blood volume fall, so ADH release rises and the renin–angiotensin–aldosterone mechanism is activated, conserving water and salt; ANF stays low.\n\n**(ii) Rapid drip.** Blood volume and atrial filling rise, so ANF is released, while ADH and renin are suppressed; more water is lost in urine and blood pressure is brought down.',
  sol: 'Three regulators compared; two predictions.',
  scheme: [['ADH action', 1], ['Renin–angiotensin–aldosterone action', 1.5], ['ANF action', 0.5], ['Prediction (i) with reason', 1], ['Prediction (ii) with reason', 1]],
  wl: [80, 240],
  d: 4, c: 'analysis', t: [2],
}));

// ---------------------------------------------------------------- t03 micturition, other organs, disorders
add('micturition-mcq', mcq({
  stem: 'During micturition, the motor messages sent by the CNS cause',
  right: 'contraction of the smooth muscles of the bladder and relaxation of the urethral sphincter',
  wrong: ['relaxation of the bladder muscles and contraction of the urethral sphincter', 'contraction of the ureters only', 'closure of the urethral sphincter and filling of the bladder'],
  sol: 'Stretch receptors signal the CNS, which makes the bladder smooth muscles contract and the urethral sphincter relax, releasing urine — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('glycosuria-mcq', mcq({
  stem: 'A routine urine test of a 45-year-old woman shows glucose and ketone bodies. Which condition do these findings suggest?',
  right: 'Diabetes mellitus',
  wrong: ['Renal calculi', 'Glomerulonephritis', 'A normal healthy state'],
  sol: 'Glucose (glycosuria) and ketone bodies (ketonuria) in urine are indicative of diabetes mellitus — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('liver-mcq', mcq({
  stem: 'Which organ secretes bilirubin, biliverdin, cholesterol, degraded steroid hormones and some drugs, most of which leave the body with the digestive wastes?',
  right: 'Liver',
  wrong: ['Lungs', 'Sweat glands', 'Sebaceous glands'],
  sol: 'The liver secretes these substances in bile; most pass out with the faeces — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('lungs-mcq', mcq({
  stem: 'Apart from the kidneys, which organ removes the largest volume of a metabolic waste every minute, and what is the waste?',
  right: `The lungs, about ${KIDNEY.lungsCO2} mL of carbon dioxide per minute`,
  wrong: ['The skin, about 200 mL of urea per minute', 'The liver, about 200 mL of uric acid per minute', 'The salivary glands, about 200 mL of ammonia per minute'],
  sol: `The lungs remove large amounts of carbon dioxide, about ${KIDNEY.lungsCO2} mL per minute, and water; saliva removes only small amounts of nitrogenous wastes — option (@K).`,
  d: 2, c: 'understanding', t: [3],
}));
add('dialysis-mcq', mcq({
  stem: 'In a haemodialysis unit, the dialysing fluid around the cellophane tube has the same composition as plasma except that it lacks nitrogenous wastes. Why does urea move out of the blood?',
  right: 'Urea diffuses down its concentration gradient into the dialysing fluid through the porous membrane.',
  wrong: ['The cellophane membrane actively pumps urea out of the blood.', 'Heparin in the blood converts the urea into a harmless gas.', 'Urea is attracted by the salts of the dialysing fluid and binds to them.'],
  sol: 'The porous membrane lets molecules pass according to their concentration gradient; with no nitrogenous wastes in the fluid, they move out of the blood — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('heparin-mcq', mcq({
  stem: 'Why is heparin added to blood before it enters a dialysing unit, and anti-heparin added before the blood is returned to the patient?',
  right: 'Heparin stops the blood clotting in the unit; anti-heparin restores normal clotting in the body.',
  wrong: ['Heparin removes urea from the blood; anti-heparin removes the uric acid.', 'Heparin raises blood pressure in the unit; anti-heparin lowers it again.', 'Heparin kills microbes in the tubing; anti-heparin feeds the red cells.'],
  sol: 'Heparin is an anticoagulant used while blood is outside the body; anti-heparin is added so the returned blood can clot normally — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('transplant-mcq', mcq({
  stem: 'A patient with acute renal failure is to receive a kidney transplant. Why do doctors prefer a close relative as the donor?',
  right: 'To minimise the chance of the new kidney being rejected by the patient’s immune system',
  wrong: ['Because only close relatives have exactly the same blood pressure as the patient', 'Because a relative’s kidney is always larger and filters more blood', 'Because a relative’s kidney can work without being joined to blood vessels'],
  sol: 'A kidney from a close relative minimises the chance of rejection by the immune system of the host — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('stones-mcq', mcq({
  stem: 'An X-ray shows small hard masses of crystallised oxalate salts inside a patient’s kidney. The condition is',
  right: 'renal calculi',
  wrong: ['glomerulonephritis', 'uraemia', 'glycosuria'],
  sol: 'Renal calculi are stones or insoluble masses of crystallised salts (oxalates and others) formed in the kidney; glomerulonephritis is inflammation of the glomeruli — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('skin-ar', ar({
  a: 'Sweat produced by the sweat glands helps in the removal of some wastes such as urea and lactic acid.',
  r: 'The primary function of sweat is to produce a cooling effect on the body surface.',
  key: 'b',
  sol: 'Both are true, but cooling, the primary function, does not explain the removal of wastes — option (b).',
  d: 2, c: 'understanding', t: [3],
}));
add('saliva-tf', tf({
  stem: 'Saliva can eliminate small amounts of nitrogenous wastes.',
  key: 't',
  sol: 'True. Saliva removes small amounts of nitrogenous wastes.',
  d: 1, c: 'recall', t: [3],
}));
add('uremia-fill', fill({
  stem: 'Accumulation of urea in the blood because of malfunctioning kidneys is called ______.',
  acc: [['uraemia', 'uremia']],
  sol: 'Uraemia (uremia).',
  d: 1, c: 'recall', t: [3],
}));
add('urea-num', num({
  stem: 'A man passes 1.4 L of urine in a day containing 28 g of urea. What is the average urea concentration of his urine in g per L?',
  value: N.ureaPerL, unit: 'g per L',
  sol: r`$\dfrac{28}{1.4} = ${N.ureaPerL}$ g per L.`,
  scheme: [[`${N.ureaPerL} g per L`, 1]],
  d: 1, c: 'application', t: [3],
}), (q) => q.answer.value === 20 || 'value');
add('co2-num', num({
  stem: `If the lungs remove carbon dioxide at about ${KIDNEY.lungsCO2} mL per minute, how many litres do they remove in one hour?`,
  value: N.co2Hour, unit: 'L',
  sol: r`$${KIDNEY.lungsCO2} \times 60 = 12000$ mL, that is $\dfrac{12000}{1000} = ${N.co2Hour}$ L.`,
  scheme: [[`${N.co2Hour} L`, 1]],
  d: 1, c: 'application', t: [3],
}), (q) => q.answer.value === 12 || 'value');
add('micturition-short', short({
  marks: 2,
  stem: 'A toddler cannot yet control when he urinates, but an adult can wait until a toilet is available. Using the micturition reflex, explain how urine is released.',
  model: 'As the **bladder fills and stretches**, **stretch receptors** in its wall send signals to the **CNS**. When the CNS gives the **voluntary signal**, motor messages make the **bladder’s smooth muscles contract** and the **urethral sphincter relax**, so urine is released. Adults have learned to control this signal.',
  sol: 'Stretch receptors, CNS, contraction and relaxation.',
  scheme: [['Stretch receptors signal CNS', 1], ['Bladder contracts, sphincter relaxes', 1]],
  d: 2, c: 'application', t: [3],
}));
add('organs-short', short({
  marks: 3,
  stem: 'Besides the kidneys, explain how the lungs, the liver and the skin help in excretion.',
  model: '**Lungs:** remove large amounts of **carbon dioxide** (about 200 mL per minute) and significant quantities of **water** every day.\n\n**Liver:** secretes **bile** containing **bilirubin, biliverdin, cholesterol, degraded steroid hormones, vitamins and drugs**, which mostly leave with digestive wastes.\n\n**Skin:** **sweat** carries NaCl, small amounts of **urea** and lactic acid; **sebum** from sebaceous glands removes **sterols, hydrocarbons and waxes**.',
  sol: 'Three organs and their wastes.',
  scheme: [['Lungs', 1], ['Liver', 1], ['Skin: sweat and sebum', 1]],
  d: 1, c: 'understanding', t: [3],
}));
add('dialysis-short', short({
  marks: 3,
  stem: 'A patient with uraemia is put on haemodialysis. Describe what is done to his blood before, during and after it passes through the dialysing unit, and why the urea leaves it.',
  model: '**Before:** blood is drained from a convenient **artery** and an anticoagulant, **heparin**, is added.\n\n**During:** it flows through a coiled **cellophane tube** surrounded by **dialysing fluid** with the same composition as plasma but **no nitrogenous wastes**. Urea and other wastes **diffuse out** through the porous membrane **down their concentration gradient**.\n\n**After:** **anti-heparin** is added and the cleared blood is returned through a **vein**.',
  sol: 'Steps and principle.',
  scheme: [['Artery and heparin', 1], ['Cellophane, dialysing fluid, diffusion down gradient', 1], ['Anti-heparin, return through vein', 1]],
  d: 2, c: 'application', t: [3],
}));
add('disorders-long', long({
  stem: 'A 60-year-old man’s blood urea level keeps rising and his doctors say his kidneys are failing. Explain the danger of this condition and describe the two main treatments open to him. Name and define two other disorders of the kidney.',
  model: '**Danger.** When kidneys malfunction, urea accumulates in the blood, a condition called uraemia. It is highly harmful and may lead to kidney failure, in which the body can no longer remove its nitrogenous wastes.\n\n**Haemodialysis.** Blood is drained from a convenient artery and an anticoagulant such as heparin is added. It is pumped into a dialysing unit containing a coiled cellophane tube surrounded by dialysing fluid that has the same composition as plasma except for nitrogenous wastes. The porous membrane allows molecules to pass along their concentration gradient, so urea and other nitrogenous wastes move out of the blood into the fluid. Anti-heparin is added to the cleared blood, which is returned to the body through a vein. Dialysis must be repeated regularly.\n\n**Kidney transplantation.** This is the ultimate method of correcting acute renal failure. A functioning kidney is taken from a donor, preferably a close relative, to minimise the chance of rejection by the patient’s immune system; modern clinical procedures have increased the success rate.\n\n**Other disorders.** Renal calculi are stones or insoluble masses of crystallised salts, such as oxalates, formed within the kidney. Glomerulonephritis is inflammation of the glomeruli of the kidney.',
  sol: 'Uraemia; dialysis; transplant; two disorders.',
  scheme: [['Uraemia and kidney failure', 1], ['Haemodialysis steps and principle', 2], ['Transplantation and close relative', 1], ['Renal calculi and glomerulonephritis', 1]],
  wl: [80, 240],
  d: 3, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- cases
add('excretion-case', mk.case({
  passage: 'A biology club compares three animals kept at a nature centre.\n\n| Animal | Habitat | Main nitrogenous waste |\n|---|---|---|\n| Frog tadpole | Pond water | Ammonia |\n| Adult frog | Damp land near the pond | Urea |\n| Pigeon | Land and air | Uric acid (white paste) |',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which mode of excretion does the tadpole show?',
      right: 'Ammonotelism',
      wrong: ['Ureotelism', 'Uricotelism', 'Osmoregulation only'],
      sol: 'Excreting mainly ammonia is ammonotelism, typical of aquatic amphibians — option (@K).',
      d: 1, c: 'recall', t: [1],
    })),
    part('b', mcq({
      stem: 'As the tadpole becomes an adult frog, which organ takes over converting its ammonia to urea?',
      right: 'Liver',
      wrong: ['Gills', 'Urinary bladder', 'Skin'],
      sol: 'In ureotelic animals ammonia is converted into urea in the liver — option (@K).',
      d: 2, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why the switch from ammonia to urea suits the frog’s change of habitat.',
      model: 'In the pond the tadpole has **plenty of water**, so highly toxic, very soluble **ammonia** can simply **diffuse out** across its body surface and gills. On land the adult must **save water**, so it converts ammonia into **less toxic urea**, which needs **less water** to excrete.',
      sol: 'Water availability.',
      scheme: [['Ammonia needs much water, available in pond', 1], ['Urea less toxic, saves water on land', 1]],
      d: 2, c: 'application', t: [1],
    }), [
      short({
        marks: 2,
        stem: 'Why is the pigeon’s waste a white paste rather than a watery liquid?',
        model: 'The pigeon is **uricotelic**: it excretes nitrogen as **uric acid**, the **least toxic** form, which can be removed as a **pellet or paste**. This allows **minimum loss of water**, important for a bird living on land and flying.',
        sol: 'Uric acid saves water.',
        scheme: [['Uric acid, least toxic', 1], ['Paste with minimum water loss', 1]],
        d: 2, c: 'understanding', t: [1],
      }),
    ]),
  ],
}));
{
  const g = 90, f = N.filt90;
  add('gfr-case', mk.case({
    passage: `A kidney clinic measures the glomerular filtration rate of two patients. A healthy volunteer has a GFR of ${KIDNEY.gfr} mL per minute. Patient X, who has glomerulonephritis, has a GFR of only ${g} mL per minute. The doctor notes that the juxtaglomerular apparatus of Patient X is likely to be active.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Glomerulonephritis is',
        right: 'inflammation of the glomeruli of the kidney',
        wrong: ['a stone of crystallised salts in the kidney', 'accumulation of urea in the blood', 'inflammation of the urinary bladder'],
        sol: 'Glomerulonephritis is inflammation of the glomeruli — option (@K).',
        d: 1, c: 'recall', t: [3],
      })),
      part('b', num({
        stem: 'How many litres of filtrate will Patient X form in a day? (One decimal place.)',
        value: f, tol: 0.1, unit: 'L',
        sol: r`$${g} \times 1440 = 129600$ mL, so the filtrate is $\dfrac{129600}{1000} = ${f}$ L per day, against ${KIDNEY.filtrate} L in a healthy person.`,
        scheme: [[`${f} L`, 1]],
        d: 2, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'Why would the juxtaglomerular apparatus of Patient X be active, and what would it do?',
        model: 'The JGA senses the **fall in GFR**. Its **JG cells release renin**, which leads to **angiotensin II**; this **constricts blood vessels**, raising **glomerular blood pressure** and GFR, and triggers **aldosterone**, increasing sodium and water reabsorption.',
        sol: 'Low GFR → renin → angiotensin II.',
        scheme: [['Low GFR sensed; renin released', 1], ['Angiotensin II raises glomerular pressure and GFR', 1]],
        d: 2, c: 'application', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'The healthy volunteer’s filtrate contains glucose but no plasma proteins. Explain both observations.',
          model: 'Glomerular filtration is **ultrafiltration**: blood is filtered so finely through the endothelium, basement membrane and **podocyte filtration slits** that almost all plasma constituents, **including glucose**, pass, but the **proteins** are held back in the blood.',
          sol: 'Ultrafiltration holds back proteins.',
          scheme: [['Small solutes such as glucose pass', 1], ['Proteins held back by the fine filter', 1]],
          d: 2, c: 'understanding', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === filtrateL(90) || 'value');
}
{
  const u = 0.6, p = N.reab06;
  add('thirst-case', mk.case({
    passage: `A long-distance runner trains for four hours on a hot afternoon and drinks very little. By evening he has passed only ${u} L of dark yellow urine in the day, although his kidneys formed about ${KIDNEY.filtrate} L of filtrate.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which hormone is mainly responsible for the small volume of his urine, and from where is it released?',
        right: 'ADH, from the neurohypophysis',
        wrong: ['ANF, from the atria of the heart', 'Renin, from the adrenal cortex', 'Insulin, from the pancreas'],
        sol: 'Fluid loss stimulates the hypothalamus to release ADH (vasopressin) from the neurohypophysis, increasing water reabsorption — option (@K).',
        d: 1, c: 'understanding', t: [2],
      })),
      part('b', num({
        stem: 'What percentage of his filtrate was reabsorbed? (Two decimal places.)',
        value: p, tol: 0.01, unit: '%',
        sol: r`$\dfrac{${KIDNEY.filtrate} - ${u}}{${KIDNEY.filtrate}} \times 100 = \dfrac{179.4}{180} \times 100 \approx ${p}$ percent.`,
        scheme: [[`${p}%`, 1]],
        d: 2, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'How does the medullary osmolarity gradient allow his collecting ducts to reabsorb so much water?',
        model: 'The counter-current mechanism keeps the medullary interstitium **increasingly concentrated**, from about **300 to 1200 mOsmol per L**. As filtrate flows down the **collecting duct** through this salty medulla, **water moves out by osmosis**, and ADH makes the duct walls allow this, so **concentrated urine** forms.',
        sol: 'Gradient draws water out of the collecting duct.',
        scheme: [['300 to 1200 gradient in the medulla', 1], ['Water leaves the collecting duct; concentrated urine', 1]],
        d: 3, c: 'application', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'His sweating also lowered his blood volume. How does aldosterone help to restore it?',
          model: 'Low blood volume lowers glomerular blood flow, so **JG cells release renin**, giving **angiotensin II**, which makes the **adrenal cortex** release **aldosterone**. Aldosterone increases **reabsorption of sodium ions and water** from the **distal parts of the tubule**, restoring blood volume and pressure.',
          sol: 'Renin–angiotensin–aldosterone.',
          scheme: [['Renin, angiotensin II, aldosterone from adrenal cortex', 1], ['Sodium and water reabsorbed in distal tubule', 1]],
          d: 3, c: 'application', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === reabsorbedPct(180, 0.6) || 'value');
}
{
  const p = N.ureaDrop;
  add('dialysis-case', mk.case({
    passage: 'A patient with chronic kidney failure attends a hospital dialysis unit three times a week. Before one session his blood urea is 150 mg per 100 mL; after four hours of haemodialysis it is 50 mg per 100 mL. His family is also being tested to find a suitable kidney donor.',
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'What is the condition of high urea in his blood called?',
        right: 'Uraemia',
        wrong: ['Glycosuria', 'Ketonuria', 'Renal calculi'],
        sol: 'Accumulation of urea in the blood is uraemia — option (@K).',
        d: 1, c: 'recall', t: [3],
      })),
      part('b', num({
        stem: 'What percentage of his blood urea was removed in the session? (One decimal place.)',
        value: p, tol: 0.1, unit: '%',
        sol: r`$\dfrac{150 - 50}{150} \times 100 = \dfrac{100}{150} \times 100 \approx ${p}$ percent.`,
        scheme: [[`${p}%`, 1]],
        d: 2, c: 'application', t: [3],
      })),
      part('c', short({
        marks: 2,
        stem: 'Why must the dialysing fluid contain the same salts as plasma but no urea?',
        model: 'With **no urea** in the fluid, urea **diffuses out of the blood** down its concentration gradient through the cellophane. With the **same salts as plasma**, there is **no gradient for useful salts**, so they are **not lost** from the blood.',
        sol: 'Gradients decide what moves.',
        scheme: [['No urea: urea diffuses out', 1], ['Same salts: salts not lost', 1]],
        d: 3, c: 'application', t: [3],
      }), [
        short({
          marks: 2,
          stem: 'Why is the family being tested, and why is a transplant better than lifelong dialysis?',
          model: 'A kidney from a **close relative** minimises the chance of **rejection** by his **immune system**. A successful **transplant** is the **ultimate correction** of renal failure: a working kidney removes wastes **continuously**, so he would no longer need repeated dialysis sessions.',
          sol: 'Rejection; ultimate method.',
          scheme: [['Close relative reduces rejection', 1], ['Transplant is ultimate, continuous correction', 1]],
          d: 2, c: 'understanding', t: [3],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === round((100 / 150) * 100, 1) || 'value');
}
