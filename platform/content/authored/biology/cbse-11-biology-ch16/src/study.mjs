// ch16 notes and flashcards.
import { T, table, unit, PROV, r } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { KIDNEY } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = [], formulas = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Excretory Products and their Elimination — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Modes of excretion and the human excretory system',
      `Animals accumulate ammonia, urea, uric acid, carbon dioxide, water and ions such as sodium, potassium, chloride, phosphate and sulphate, through metabolism or excess ingestion; these must be removed totally or partially. **Ammonia, urea and uric acid** are the major forms of nitrogenous wastes.

- **Ammonotelism** (excreting ammonia): ammonia is the **most toxic** and needs a **large amount of water** for elimination. Many **bony fishes, aquatic amphibians and aquatic insects** are ammonotelic. Being readily soluble, ammonia is generally excreted by **diffusion across body surfaces or through the gill surfaces** (in fish) as ammonium ions; the kidneys play no significant role.
- **Ureotelism** (excreting urea): **mammals, many terrestrial amphibians and marine fishes**. Ammonia produced by metabolism is converted into **urea in the liver**, released into the blood, filtered and excreted by the kidneys. Some urea may be retained in the kidney matrix of some animals to maintain a desired osmolarity.
- **Uricotelism** (excreting uric acid): **reptiles, birds, land snails and insects** excrete nitrogenous wastes as **uric acid** in the form of a **pellet or paste**, with a **minimum loss of water**. Uric acid is the least toxic.

**Excretory structures.** Most invertebrates have simple tubular forms; vertebrates have complex tubular organs, the kidneys.
- **Protonephridia or flame cells:** Platyhelminthes (flatworms such as *Planaria*), rotifers, some annelids and the cephalochordate *Amphioxus*; mainly **osmoregulation** (ionic and fluid volume regulation).
- **Nephridia:** earthworms and other annelids; remove nitrogenous wastes and maintain fluid and ionic balance.
- **Malpighian tubules:** most insects, including cockroaches; remove nitrogenous wastes and help osmoregulation.
- **Antennal glands or green glands:** crustaceans such as prawns.

**Human excretory system:** a pair of **kidneys**, one pair of **ureters**, a **urinary bladder** and a **urethra**. The kidneys are reddish brown, bean-shaped and lie between the levels of the **last thoracic and third lumbar vertebra**, close to the dorsal inner wall of the abdominal cavity. Each adult kidney is **${KIDNEY.length.join('–')} cm long, ${KIDNEY.width.join('–')} cm wide and ${KIDNEY.thick.join('–')} cm thick**, weighing **${KIDNEY.mass.join('–')} g** on average (sizes vary between people). Towards the centre of the inner concave surface is a notch, the **hilum**, through which the ureter, blood vessels and nerves enter. Inner to the hilum is the broad funnel-shaped **renal pelvis** with projections called **calyces**. The outer layer is a tough **capsule**. Inside are an outer **cortex** and an inner **medulla**; the medulla is divided into a few conical **medullary pyramids** projecting into the calyces, and the cortex extends between them as renal columns, the **columns of Bertini**.

**Nephron.** Each kidney has nearly **one million** nephrons, the functional units. Each has a **glomerulus** and a **renal tubule**. The glomerulus is a tuft of capillaries formed by the **afferent arteriole**, a fine branch of the renal artery; blood leaves by the **efferent arteriole**. The tubule begins as a double-walled cup, **Bowman’s capsule**, which encloses the glomerulus; together they form the **Malpighian body (renal corpuscle)**. Next come the highly coiled **proximal convoluted tubule (PCT)**, the hairpin-shaped **Henle’s loop** (descending and ascending limbs) and the coiled **distal convoluted tubule (DCT)**. The DCTs of many nephrons open into a straight **collecting duct**; collecting ducts converge and open into the renal pelvis through the medullary pyramids in the calyces. The Malpighian corpuscle, PCT and DCT lie in the **cortex**; the loop of Henle dips into the **medulla**. In most nephrons the loop is short and extends very little into the medulla (**cortical nephrons**); in some it is very long and runs deep into the medulla (**juxtamedullary nephrons**). The efferent arteriole forms **peritubular capillaries** around the tubule; a minute vessel of this network runs parallel to Henle’s loop as the U-shaped **vasa recta**, which is absent or highly reduced in cortical nephrons.`,
      [kt('Ammonotelism', 'Excretion of nitrogenous waste mainly as ammonia, as in bony fishes and aquatic amphibians.'), kt('Uricotelism', 'Excretion mainly as uric acid, with minimum water loss, as in reptiles, birds, land snails and insects.'), kt('Hilum', 'Notch on the inner concave surface of the kidney where the ureter, vessels and nerves enter.'), kt('Columns of Bertini', 'Extensions of the cortex between the medullary pyramids.'), kt('Malpighian body', 'Glomerulus with Bowman’s capsule (renal corpuscle).'), kt('Vasa recta', 'U-shaped vessel running parallel to Henle’s loop; reduced or absent in cortical nephrons.')],
      V.modes,
      [1],
      [V.urinary, V.kidneyls, V.nephron],
    ),
    sec(
      '2. Urine formation and regulation of kidney function',
      `Urine formation involves **glomerular filtration, reabsorption and secretion**, in different parts of the nephron.

**Glomerular filtration.** On average **${KIDNEY.bloodFlow.join('–')} mL of blood** are filtered by the kidneys per minute, roughly one-fifth of the blood pumped by each ventricle in a minute. Glomerular capillary blood pressure filters blood through three layers: the **endothelium** of the glomerular vessels, the **epithelium of Bowman’s capsule** and a **basement membrane** between them. The epithelial cells of Bowman’s capsule, **podocytes**, leave minute spaces called **filtration slits or slit pores**. Almost all plasma constituents **except proteins** pass into Bowman’s capsule: **ultrafiltration**. The **glomerular filtration rate (GFR)** of a healthy person is about **${KIDNEY.gfr} mL per minute**, that is **${KIDNEY.filtrate} litres per day**.

The **juxtaglomerular apparatus (JGA)** is a sensitive region formed by cellular modifications in the DCT and the afferent arteriole where they touch. A fall in GFR activates the **JG cells** to release **renin**, which can bring glomerular blood flow, and so the GFR, back to normal.

**Reabsorption.** Nearly **${KIDNEY.reabsorbedPct} percent** of the filtrate is reabsorbed by the tubules, by active or passive mechanisms: glucose, amino acids and sodium ions **actively**; nitrogenous wastes **passively**; water passively in the initial segments.

**Secretion.** Tubular cells secrete **hydrogen ions, potassium ions and ammonia** into the filtrate, helping to maintain the **ionic and acid–base balance** of body fluids.

**Roles of the segments.**
- **PCT:** simple cuboidal **brush border** epithelium increases the surface for reabsorption; nearly all essential nutrients and **70–80 percent of electrolytes and water** are reabsorbed here. It keeps pH and ionic balance by selectively secreting hydrogen ions, ammonia and potassium ions and absorbing bicarbonate.
- **Henle’s loop:** reabsorption is minimal in the ascending limb; the loop maintains the **high osmolarity of the medullary interstitial fluid**. The **descending limb** is permeable to water but almost impermeable to electrolytes, so the filtrate becomes **concentrated** as it moves down. The **ascending limb** is impermeable to water but transports electrolytes actively or passively, so the filtrate becomes **dilute** as it moves up.
- **DCT:** conditional reabsorption of sodium ions and water; reabsorbs bicarbonate and selectively secretes hydrogen and potassium ions and ammonia, keeping pH and sodium–potassium balance.
- **Collecting duct:** runs from the cortex to the inner medulla; large amounts of water can be reabsorbed here to make **concentrated urine**; lets small amounts of **urea** into the medullary interstitium to keep up its osmolarity; secretes hydrogen and potassium ions.

**Counter-current mechanism.** Mammals can produce concentrated urine; Henle’s loop and the vasa recta are essential. Filtrate flows in **opposite directions** in the two limbs of Henle’s loop, a **counter-current**, and blood flows in a counter-current in the two limbs of the vasa recta. Their closeness and the counter-currents maintain an **osmolarity that increases towards the inner medulla, from ${KIDNEY.osm.cortex} mOsmol per L in the cortex to about ${KIDNEY.osm.inner} mOsmol per L in the inner medulla**. The gradient is mainly caused by **NaCl and urea**. NaCl transported by the ascending limb of Henle’s loop is exchanged with the descending limb of the vasa recta and returned to the interstitium by its ascending portion. Small amounts of urea enter the thin segment of the ascending limb and are transported back to the interstitium by the collecting tubule. The gradient allows easy passage of **water from the collecting tubule**, concentrating the filtrate; human kidneys can produce urine **nearly four times** as concentrated as the initial filtrate.

**Regulation** involves hormonal feedback through the **hypothalamus, the JGA and, to some extent, the heart**.
- **ADH:** osmoreceptors respond to changes in blood volume, body fluid volume and ionic concentration. An excessive loss of fluid stimulates the hypothalamus to release **antidiuretic hormone (vasopressin)** from the **neurohypophysis**; ADH increases water reabsorption from the later parts of the tubule, **preventing diuresis**. A rise in body fluid volume switches the receptors off and suppresses ADH release. ADH also constricts blood vessels, raising blood pressure and so glomerular blood flow and GFR.
- **Renin–angiotensin mechanism:** a fall in glomerular blood flow, glomerular blood pressure or GFR activates the JG cells to release **renin**, which converts **angiotensinogen** to **angiotensin I** and further to **angiotensin II**. Angiotensin II, a powerful **vasoconstrictor**, raises glomerular blood pressure and GFR; it also makes the **adrenal cortex** release **aldosterone**, which increases reabsorption of **sodium ions and water** from the distal parts of the tubule, raising blood pressure and GFR.
- **ANF:** increased blood flow to the atria of the heart causes release of **atrial natriuretic factor**, which causes **vasodilation** and lowers blood pressure; it acts as a **check on the renin–angiotensin mechanism**.`,
      [kt('Ultrafiltration', 'Fine filtration of blood in the glomerulus that lets through almost all plasma constituents except proteins.'), kt('GFR', 'Glomerular filtration rate: about 125 mL of filtrate per minute, 180 L per day.'), kt('Counter-current mechanism', 'Exchange between the opposite flows in Henle’s loop and the vasa recta that keeps a medullary gradient of about 300 to 1200 mOsmol per L.'), kt('ADH', 'Antidiuretic hormone (vasopressin) from the neurohypophysis; increases water reabsorption and prevents diuresis.'), kt('Renin', 'Enzyme released by JG cells when GFR falls; starts the renin–angiotensin mechanism.'), kt('ANF', 'Atrial natriuretic factor: causes vasodilation and lowers blood pressure; checks the renin–angiotensin mechanism.')],
      V.tubules,
      [2],
      [V.counter],
      [{ label: 'Filtrate per day from the GFR', latex: r`\text{filtrate per day} = \text{GFR} \times 1440\ \text{minutes}` }],
    ),
    sec(
      '3. Micturition, role of other organs and disorders',
      `**Micturition.** Urine formed by the nephrons is carried to the **urinary bladder** and stored until a voluntary signal comes from the **CNS**. As the bladder fills and stretches, **stretch receptors** in its wall send signals to the CNS; the CNS sends motor messages that make the **smooth muscles of the bladder contract** and the **urethral sphincter relax**, releasing urine. The process is **micturition**, and the neural mechanism causing it is the **micturition reflex**.

**Urine.** An adult excretes on average **${KIDNEY.urinePerDay.join(' to ')} litres** of urine per day: a light yellow, watery, slightly acidic fluid (**pH about ${KIDNEY.urinePH.toFixed(1)}**) with a characteristic odour. On average **${KIDNEY.ureaPerDay.join('–')} g of urea** is excreted per day. Urine analysis helps diagnose many metabolic disorders and kidney malfunctions; for example, **glucose (glycosuria)** and **ketone bodies (ketonuria)** in urine indicate **diabetes mellitus**. (Daily volumes depend on water intake and climate.)

**Other organs.**
- **Lungs** remove large amounts of carbon dioxide (about **${KIDNEY.lungsCO2} mL per minute**) and significant quantities of water every day.
- **Liver**, the largest gland, secretes **bile** containing bilirubin, biliverdin, cholesterol, degraded steroid hormones, vitamins and drugs; most of these pass out with the digestive wastes.
- **Skin:** **sweat glands** produce sweat, a watery fluid with NaCl, small amounts of urea, lactic acid and so on; its main role is to cool the body surface, but it also removes some wastes. **Sebaceous glands** eliminate sterols, hydrocarbons and waxes through **sebum**, which gives a protective oily covering to the skin.
- **Saliva** can eliminate small amounts of nitrogenous wastes.

**Disorders.**
- Malfunctioning kidneys lead to accumulation of urea in the blood, **uraemia**, which is highly harmful and may lead to **kidney failure**.
- **Haemodialysis:** blood drained from a convenient artery is pumped into a dialysing unit after adding an **anticoagulant such as heparin**. The unit has a coiled **cellophane tube** surrounded by **dialysing fluid** with the same composition as plasma **except the nitrogenous wastes**. The porous membrane lets molecules pass along their concentration gradient, so the wastes move out of the blood. The cleared blood is pumped back through a vein after adding **anti-heparin**. Thousands of uraemic patients have been helped by this method.
- **Kidney transplantation** is the ultimate method of correcting acute renal failure. A functioning kidney from a donor, preferably a **close relative**, is used to minimise the chance of **rejection by the immune system** of the host. Modern clinical procedures have increased the success rate.
- **Renal calculi:** stones or insoluble masses of crystallised salts (oxalates and others) formed within the kidney.
- **Glomerulonephritis:** inflammation of the glomeruli of the kidney.`,
      [kt('Micturition reflex', 'Neural mechanism by which a stretched bladder triggers contraction of its muscles and relaxation of the urethral sphincter.'), kt('Uraemia', 'Accumulation of urea in the blood due to malfunctioning kidneys.'), kt('Haemodialysis', 'Removal of nitrogenous wastes from blood through a cellophane membrane into a dialysing fluid that lacks them.'), kt('Renal calculi', 'Kidney stones of crystallised salts such as oxalates.'), kt('Glomerulonephritis', 'Inflammation of the glomeruli.')],
      table(['Organ', 'Excretory role'], [['Lungs', 'Carbon dioxide and water'], ['Liver', 'Bile pigments, cholesterol, steroid breakdown products, vitamins, drugs'], ['Skin', 'Sweat (NaCl, some urea, lactic acid); sebum (sterols, hydrocarbons, waxes)'], ['Salivary glands', 'Small amounts of nitrogenous wastes']], 'Table of the excretory roles of organs other than the kidneys'),
      [3],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying ammonia is least toxic (it is the most toxic; uric acid is the least).
- Calling Malpighian tubules the excretory organs of earthworms (earthworms have nephridia; insects have Malpighian tubules).
- Writing that plasma proteins enter the filtrate (ultrafiltration holds back proteins).
- Swapping the permeability of the two limbs of Henle’s loop.
- Writing that ADH comes from the adrenal gland (it is released from the neurohypophysis on a signal from the hypothalamus).
- Saying ANF raises blood pressure (it causes vasodilation and lowers it).

**How marks are usually awarded**
- 1-mark items: a mode of excretion with an example, a kidney part, a tubule segment, a hormone and its source, a disorder.
- 2–3-mark answers: modes of excretion; kidney section; nephron; filtration and the JGA; roles of tubule segments; ADH and renin–angiotensin; micturition; other organs; dialysis.
- 5-mark answers: the human excretory system with the nephron; urine formation; the counter-current mechanism and regulation; disorders and their treatment.
- Numericals: GFR to litres per day, percentage reabsorbed, concentration factor — show the working.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Most and least toxic nitrogenous waste?', 'Ammonia is most toxic; uric acid is least toxic.', 'fact', 1),
    fc(2, 'Examples of ammonotelic animals?', 'Many bony fishes, aquatic amphibians, aquatic insects.', 'fact', 1),
    fc(3, 'Where is ammonia converted to urea?', 'In the liver.', 'fact', 1),
    fc(4, 'Examples of uricotelic animals?', 'Reptiles, birds, land snails, insects.', 'fact', 1),
    fc(5, 'Excretory structures of Planaria?', 'Protonephridia (flame cells), mainly for osmoregulation.', 'fact', 1),
    fc(6, 'Excretory structures of cockroach and prawn?', 'Malpighian tubules; antennal (green) glands.', 'fact', 1),
    fc(7, 'Position of human kidneys?', 'Between the last thoracic and third lumbar vertebra, near the dorsal wall of the abdomen.', 'fact', 1),
    fc(8, 'Size and mass of an adult kidney?', '10–12 cm by 5–7 cm by 2–3 cm; 120–170 g.', 'fact', 1),
    fc(9, 'What is the hilum?', 'Notch on the inner concave surface where ureter, vessels and nerves enter.', 'definition', 1),
    fc(10, 'Columns of Bertini?', 'Cortex extending between the medullary pyramids.', 'definition', 1),
    fc(11, 'Malpighian body?', 'Glomerulus plus Bowman’s capsule.', 'definition', 1),
    fc(12, 'Juxtamedullary nephron?', 'Nephron with a very long Henle’s loop running deep into the medulla.', 'definition', 1),
    fc(13, 'Three processes of urine formation?', 'Glomerular filtration, reabsorption, secretion.', 'concept', 2),
    fc(14, 'Three layers of the glomerular filter?', 'Glomerular endothelium, basement membrane, Bowman’s capsule epithelium (podocytes).', 'concept', 2),
    fc(15, 'GFR of a healthy person?', 'About 125 mL per minute, 180 L per day.', 'fact', 2),
    fc(16, 'Share of filtrate reabsorbed?', 'Nearly 99 percent.', 'fact', 2),
    fc(17, 'What does the PCT reabsorb?', 'Nearly all nutrients and 70–80 percent of electrolytes and water.', 'fact', 2),
    fc(18, 'Permeability of the descending limb?', 'Permeable to water, almost impermeable to electrolytes.', 'concept', 2),
    fc(19, 'Permeability of the ascending limb?', 'Impermeable to water; transports electrolytes out.', 'concept', 2),
    fc(20, 'Medullary osmolarity gradient?', 'About 300 mOsmol per L in the cortex to 1200 in the inner medulla.', 'fact', 2),
    fc(21, 'Main solutes of the gradient?', 'NaCl and urea.', 'fact', 2),
    fc(22, 'Role of ADH?', 'Increases water reabsorption from the later tubule; prevents diuresis.', 'concept', 2),
    fc(23, 'What does renin start?', 'Angiotensinogen → angiotensin I → angiotensin II; aldosterone release.', 'concept', 2),
    fc(24, 'Effect of ANF?', 'Vasodilation, lower blood pressure; checks the renin–angiotensin mechanism.', 'concept', 2),
    fc(25, 'Micturition reflex?', 'Stretch receptors → CNS → bladder muscle contracts, urethral sphincter relaxes.', 'concept', 3),
    fc(26, 'Daily urine and urea?', '1–1.5 L urine; 25–30 g urea.', 'fact', 3),
    fc(27, 'Glucose and ketone bodies in urine indicate?', 'Diabetes mellitus.', 'fact', 3),
    fc(28, 'Excretory role of the liver?', 'Bile with bilirubin, biliverdin, cholesterol, steroid breakdown products, vitamins, drugs.', 'fact', 3),
    fc(29, 'What is uraemia?', 'Accumulation of urea in the blood.', 'definition', 3),
    fc(30, 'Key steps of haemodialysis?', 'Heparin added; cellophane tube in dialysing fluid without nitrogenous wastes; anti-heparin before return.', 'concept', 3),
    fc(31, 'Renal calculi and glomerulonephritis?', 'Kidney stones of crystallised salts; inflammation of glomeruli.', 'definition', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
