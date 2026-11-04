// ISC 11 Biology ch18 notes and flashcards.
import { T, table, unit, PROV } from '../../isc-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { FILTRATE, GFR, URINE, FOLD, GRAD, NEPH_TOTAL, WATER } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Excretory Products and Their Elimination — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Modes of excretion, the human excretory system, the kidney and the nephron',
      `**Nitrogenous wastes.** The breakdown of proteins and nucleic acids releases nitrogen, which is excreted as **ammonia, urea or uric acid**. **Ammonotelism:** ammonia is the most toxic and needs a great deal of water to remove it, so it is the waste of aquatic animals (bony fishes, aquatic amphibians, aquatic insects); it diffuses across body surfaces or gills, and the kidney has little role. **Ureotelism:** urea, less toxic, is made in the **liver** from ammonia and carried in the blood to the kidneys (mammals, many terrestrial amphibians, marine fishes). **Uricotelism:** uric acid, nearly insoluble and least toxic, is passed as a paste with little loss of water (reptiles, birds, land snails, insects). The habitat decides the mode: the more water an animal can spare, the more toxic a waste it can excrete. (Some animals switch with habitat, for example a lungfish in a dry mud burrow makes urea instead of ammonia.)

**Excretory structures.** **Protonephridia (flame cells)** in flatworms, rotifers and Amphioxus; **nephridia** in earthworms; **Malpighian tubules** in insects; **green (antennal) glands** in prawns; **kidneys** in vertebrates.

**The human excretory system** consists of a pair of **kidneys**, a pair of **ureters**, a **urinary bladder** and a **urethra**. Each kidney is a reddish-brown, bean-shaped organ, about 10 to 12 cm long, 5 to 7 cm wide and 2 to 3 cm thick, between the last thoracic and the third lumbar vertebra. The notch on the inner concave side is the **hilum**, through which the **ureter, blood vessels and nerves** pass. The **L.S.** shows a tough **capsule**, an outer **cortex** and an inner **medulla**. The medulla forms cone-shaped **renal pyramids**, between which the cortex extends as **renal columns**; the pyramids open into **calyces**, which join the funnel-shaped **renal pelvis**.

**The nephron** (the structural and functional unit; nearly one million in each kidney) has the **Malpighian body (renal corpuscle)**, made of the **glomerulus**, a tuft of capillaries fed by the **afferent arteriole** and drained by the narrower **efferent arteriole**, enclosed in the double-walled **Bowman's capsule**; and the **renal tubule**: **proximal convoluted tubule (PCT)** with a brush-border epithelium, the **loop of Henle** (a descending and an ascending limb), the **distal convoluted tubule (DCT)**, which opens into the **collecting duct**. The efferent arteriole forms the **peritubular capillaries** and, in juxtamedullary nephrons, the **vasa recta**. About **85 percent** are **cortical nephrons** (short loops, little or no vasa recta) and about **15 percent** are **juxtamedullary** (long loops reaching deep into the medulla, with vasa recta). So the two kidneys have about ${NEPH_TOTAL.toLocaleString('en-US')} nephrons.`,
      [kt('Ammonotelism', 'Excretion of nitrogen mainly as ammonia (aquatic animals).'), kt('Ureotelism', 'Excretion of nitrogen mainly as urea (mammals).'), kt('Uricotelism', 'Excretion of nitrogen mainly as uric acid (birds, reptiles, insects).'), kt('Nephron', 'The structural and functional unit of the kidney.'), kt('Malpighian body', 'The glomerulus together with the Bowman’s capsule.')],
      V.kidney,
      [1],
      [V.nephron],
    ),
    sec(
      '2. Urine formation and the counter-current mechanism',
      `Urine is formed in three steps.

**Ultrafiltration (glomerular filtration).** The blood pressure in the glomerulus, kept high because the efferent arteriole is narrower than the afferent, forces water and small solutes through a **three-layered filtration membrane** (the endothelium of the glomerular capillaries, the epithelium of the Bowman's capsule with its podocytes, and the basement membrane between them). Almost everything except **proteins and blood cells** passes, which is why it is called **ultrafiltration**. About **1100 to 1200 mL of blood** flows through the kidneys each minute, about one fifth of the cardiac output. The **glomerular filtration rate (GFR)** is about **125 mL per minute**, or about **180 L a day** (this chapter uses ${GFR} mL per minute, or ${FILTRATE} L a day, in its sums). The GFR is regulated by the juxtaglomerular apparatus; a person passes only about ${URINE} L of urine a day, so more than 99 percent of the filtrate is reabsorbed.

**Selective reabsorption.** The **PCT** (simple cuboidal epithelium with a brush border) reabsorbs nearly all the **glucose and amino acids** and about 70 to 80 percent of the **electrolytes and water**, by **active** transport (glucose, amino acids, Na⁺) and **passive** transport (nitrogenous wastes). The **DCT** reabsorbs Na⁺ and water conditionally, and the **collecting duct** reabsorbs large amounts of water.

**Tubular secretion.** The tubule cells add **H⁺, K⁺ and ammonia** to the filtrate (in the PCT and DCT), which helps to maintain the **pH and the ionic balance** of the blood.

**Concentration of urine (counter-current mechanism).** The two limbs of the loop of Henle, and the two limbs of the vasa recta, carry fluid in **opposite directions** (counter-current) and lie close together. The **descending limb** is **permeable to water but almost impermeable to electrolytes**, so water leaves and the filtrate becomes **more concentrated** as it goes down. The **ascending limb** is **impermeable to water** but lets electrolytes out, so the filtrate becomes **dilute** as it goes up. The NaCl leaving the ascending limb is picked up by the descending vasa recta and returned by the ascending vasa recta; urea moves similarly. These exchanges maintain a **gradient in the osmolarity of the medullary tissue fluid from about ${GRAD[0][1]} mOsmol per L in the cortex to about ${GRAD[3][1]} mOsmol per L in the inner medulla**. The collecting duct passes through this gradient and loses water, so a human can produce urine up to about **${FOLD} times as concentrated** as the initial filtrate. The abbreviations to learn are GFR, ADH and ANF.`,
      [kt('Ultrafiltration', 'Filtration of blood under pressure through the three-layered filtration membrane, in which proteins stay behind.'), kt('GFR', 'Glomerular filtration rate: the volume of filtrate formed by the kidneys each minute (about 125 mL).'), kt('Tubular secretion', 'Addition of substances such as H⁺, K⁺ and ammonia from the blood to the filtrate.'), kt('Counter-current mechanism', 'The opposite flows in the loop of Henle and vasa recta that maintain a concentration gradient in the medulla.')],
      V.counter,
      [2],
      [table(['Segment', 'Water', 'Electrolytes'], [['Descending limb', 'Permeable', 'Almost impermeable'], ['Ascending limb', 'Impermeable', 'Transported out']], 'Table of permeability of the two limbs of the loop of Henle')],
    ),
    sec(
      '3. Regulation of kidney function, erythropoietin, micturition and homeostasis',
      `**ADH.** Osmoreceptors in the **hypothalamus** respond to a rise in the osmolarity of body fluids (or fall in volume) and make the **neurohypophysis** release **ADH (antidiuretic hormone)**. ADH facilitates **water reabsorption from the latter parts of the tubule**, preventing **diuresis**; it can also constrict blood vessels and raise the pressure. When the fluid volume rises, the osmoreceptors are switched off and the release stops (a feedback).

**Renin-angiotensin-aldosterone system (RAAS).** The **juxtaglomerular apparatus (JGA)** is made of the **JG cells** (modified cells of the afferent arteriole) and the **macula densa** (cells of the DCT). A fall in the glomerular blood pressure, blood flow or GFR activates the JG cells to release **renin**, which converts **angiotensinogen** in the blood to **angiotensin I** and then to **angiotensin II**. Angiotensin II is a powerful **vasoconstrictor**, which increases the glomerular blood pressure and the GFR; it also activates the **adrenal cortex** to release **aldosterone**, which causes reabsorption of **Na⁺ and water** from the DCT, raising the blood pressure and the GFR.

**ANF (atrial natriuretic factor).** The atrial walls of the heart release ANF when the blood volume and pressure rise; it causes **vasodilation** and a fall in the blood pressure, and so acts as a **check on the renin-angiotensin mechanism**.

**Erythropoietin.** The kidney (the juxtaglomerular cells) secretes the hormone **erythropoietin** when oxygen is short; it stimulates the **bone marrow to make more red blood cells**. (Books differ on the exact cells; the syllabus asks only for the hormone, its source and its action.)

**Micturition.** Urine is stored in the **urinary bladder** and its release is the **micturition reflex**. When the bladder fills, **stretch receptors** in its wall send signals to the **CNS**, which sends motor messages that make the **bladder muscle contract** and the **urethral sphincter relax**, and urine is voided. The sphincter is under voluntary control in adults. A healthy adult forms about 1 to 1.5 L of urine a day (pH about 6.0) with about 25 to 30 g of urea.

**Homeostasis.** The kidneys regulate the **volume and osmolarity** of body fluids, the **ionic composition**, the **pH** and the **blood pressure**, and they help to control the number of red cells. For example, on a day when the skin loses ${WATER.skin} mL of water and urine ${WATER.urine} mL, a rise of the skin loss to 1500 mL has to be matched by a fall of urine volume, which ADH brings about.`,
      [kt('ADH', 'Antidiuretic hormone from the neurohypophysis that increases water reabsorption in the distal tubule and collecting duct.'), kt('Renin', 'An enzyme released by the JG cells when the GFR or blood pressure falls; it starts the formation of angiotensin II.'), kt('Aldosterone', 'A hormone of the adrenal cortex that makes the DCT reabsorb Na⁺ and water.'), kt('ANF', 'Atrial natriuretic factor, released by the heart atria; it dilates blood vessels and lowers pressure.'), kt('Micturition', 'The release of urine from the bladder by a reflex.')],
      table(['Hormone', 'Source', 'Action'], [['ADH', 'Neurohypophysis', 'Water reabsorption'], ['Aldosterone', 'Adrenal cortex', 'Na⁺ and water reabsorption'], ['ANF', 'Atrial wall', 'Vasodilation'], ['Erythropoietin', 'Kidney', 'More red cells']], 'Table of hormones that regulate kidney function'),
      [3],
    ),
    sec(
      '4. Other excretory organs, disorders, haemodialysis and kidney transplant',
      `**Other excretory organs.** The **lungs** remove about 200 mL of **CO₂** a minute and also water vapour. The **liver** secretes **bilirubin and biliverdin**, **cholesterol**, **degraded steroid hormones**, vitamins and drugs into the bile, and they leave with the digestive wastes. The **skin**: **sweat glands** produce **sweat** (water, NaCl, small amounts of urea and lactic acid), mainly for cooling; **sebaceous glands** secrete **sebum** (sterols, hydrocarbons and waxes) that protects and lubricates the skin.

**Disorders.**
- **Uraemia:** accumulation of **urea in the blood** because of kidney malfunction; it may lead to **renal failure**, in which the kidneys cannot filter the blood.
- **Renal calculi:** stones or **insoluble masses of crystallised salts (such as oxalates)** formed within the kidney.
- **Glomerulonephritis (nephritis):** **inflammation of the glomeruli** of the kidney.

**Haemodialysis.** Blood from a convenient artery (usually of the arm) is pumped into a **dialysing unit (artificial kidney)** after adding **heparin** (an anticoagulant). The unit has a coiled **cellophane tube** (a semipermeable membrane) surrounded by **dialysing fluid** with the same composition as plasma except that it has **no nitrogenous wastes**. Urea and other small molecules **diffuse out** of the blood into the fluid, down their concentration gradient, while blood cells and proteins stay in the tube. The cleaned blood is returned to a vein after **anti-heparin** is added. The dialysis has to be repeated, usually about three times a week.

**Kidney transplant.** The **ultimate method** in the correction of acute renal failure: a healthy kidney from a donor (preferably a close relative, to reduce the chance of **rejection** by the immune system) is placed in the patient, who takes drugs that suppress rejection. Books differ in detail on the numbers; the principle is what is asked.`,
      [kt('Uraemia', 'Accumulation of urea in the blood owing to kidney malfunction.'), kt('Renal calculi', 'Stones of crystallised salts such as oxalates formed in the kidney.'), kt('Glomerulonephritis', 'Inflammation of the glomeruli.'), kt('Haemodialysis', 'Cleaning of the blood of a kidney patient by diffusion of wastes through a cellophane tube into a dialysing fluid.')],
      V.dialysis,
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Giving the nitrogenous waste of an animal without relating it to the water available.
- Drawing the efferent arteriole wider than the afferent arteriole.
- Saying that proteins pass into the filtrate, or that the ascending limb is permeable to water.
- Mixing up the sources of the hormones (ADH from the neurohypophysis, aldosterone from the adrenal cortex, ANF from the heart, renin from the JG cells).
- Writing the renin-angiotensin steps out of order.
- Describing dialysis without the cellophane tube, the dialysing fluid with no nitrogenous wastes, or heparin.
- Confusing uraemia with glomerulonephritis.

**How marks are usually awarded**
- 1-mark subparts: a term, a location, a give-a-reason, a waste and its animal, a hormone and its source.
- 2–3-mark questions: modes of excretion, the three processes of urine formation, the counter-current mechanism, GFR calculations, ADH, the role of the skin, liver and lungs, dialysis.
- 5-mark questions in parts: labelled diagrams of a kidney L.S. or a nephron; urine formation with GFR; the counter-current mechanism with a diagram; regulation by ADH, RAAS and ANF; dialysis and transplant.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Define ammonotelism.', 'Excretion of nitrogen mainly as ammonia; aquatic animals.', 'definition', 1),
    fc(2, 'Which waste needs the least water to remove?', 'Uric acid (uricotelism).', 'fact', 1),
    fc(3, 'Where is urea made?', 'In the liver.', 'fact', 1),
    fc(4, 'Excretory organ of the earthworm?', 'Nephridia.', 'fact', 1),
    fc(5, 'Excretory organ of the cockroach?', 'Malpighian tubules.', 'fact', 1),
    fc(6, 'Excretory structure of planaria?', 'Protonephridia (flame cells).', 'fact', 1),
    fc(7, 'What passes through the hilum?', 'Ureter, blood vessels and nerves.', 'fact', 1),
    fc(8, 'Parts of a Malpighian body?', 'Glomerulus and Bowman’s capsule.', 'fact', 1),
    fc(9, 'Which arteriole is wider?', 'The afferent arteriole.', 'concept', 1),
    fc(10, 'Number of nephrons in each kidney?', 'About one million.', 'fact', 1),
    fc(11, 'What is ultrafiltration?', 'Filtration of blood under pressure; only proteins and cells stay behind.', 'definition', 2),
    fc(12, 'Normal GFR?', 'About 125 mL a minute (about 180 L a day).', 'fact', 2),
    fc(13, 'Which part reabsorbs most of the filtrate?', 'The PCT.', 'fact', 2),
    fc(14, 'Substances secreted into the filtrate?', 'H⁺, K⁺ and ammonia.', 'fact', 2),
    fc(15, 'Descending limb of Henle’s loop?', 'Permeable to water, not to electrolytes; filtrate becomes concentrated.', 'concept', 2),
    fc(16, 'Ascending limb of Henle’s loop?', 'Impermeable to water; salts leave; filtrate becomes dilute.', 'concept', 2),
    fc(17, 'What is counter-current flow?', 'Fluid in two nearby tubes flowing in opposite directions.', 'definition', 2),
    fc(18, 'Medullary osmolarity gradient?', 'About 300 mOsmol per L (cortex) to 1200 (inner medulla).', 'fact', 2),
    fc(19, 'How concentrated can urine become?', 'Up to about four times the filtrate.', 'fact', 2),
    fc(20, 'What does ADH do?', 'Increases water reabsorption in the distal tubule and collecting duct.', 'fact', 3),
    fc(21, 'What does the JGA release when the GFR falls?', 'Renin.', 'fact', 3),
    fc(22, 'Order of the RAAS steps?', 'Renin; angiotensinogen to angiotensin I to II; aldosterone from the adrenal cortex.', 'concept', 3),
    fc(23, 'What does aldosterone do?', 'Makes the DCT reabsorb Na⁺ and water.', 'fact', 3),
    fc(24, 'What does ANF do?', 'Dilates blood vessels and lowers pressure; a check on the RAAS.', 'fact', 3),
    fc(25, 'Which hormone does the kidney secrete for red cells?', 'Erythropoietin.', 'fact', 3),
    fc(26, 'Describe the micturition reflex.', 'Stretch receptors signal the CNS; bladder contracts and sphincter relaxes.', 'concept', 3),
    fc(27, 'What do the lungs, liver and skin excrete?', 'CO₂ and water; bile pigments and cholesterol; sweat and sebum.', 'fact', 4),
    fc(28, 'What is uraemia?', 'Urea accumulating in the blood.', 'definition', 4),
    fc(29, 'Why is heparin added in haemodialysis?', 'To stop the blood from clotting in the unit.', 'concept', 4),
    fc(30, 'What are renal calculi?', 'Stones of crystallised salts, such as oxalates, in the kidney.', 'definition', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
