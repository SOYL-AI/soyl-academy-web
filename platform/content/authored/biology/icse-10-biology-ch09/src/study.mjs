// ICSE 10 Biology ch09 notes and flashcards.
import { T, table, unit, PROV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { KID, COMP } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Excretory System — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Excretion and excretory organs',
      `**Excretion** is the removal of harmful **metabolic wastes** formed by the chemical activities of body cells. Removing undigested food (faeces) is **egestion**, not excretion.

| Organ | Wastes removed |
|---|---|
| **Kidneys** | Urea, excess water and salts (urine) |
| **Lungs** | Carbon dioxide, water vapour |
| **Skin** | Water, salts, a little urea (sweat) |
| **Liver** | Bile pigments from broken-down haemoglobin (in bile); also **makes urea** |

**Urea** is formed in the **liver** by **deamination**: the nitrogen-containing part of excess amino acids is removed and converted into urea, which the blood carries to the kidneys.`,
      [kt('Excretion', 'Removal of metabolic wastes formed in body cells.'), kt('Egestion', 'Removal of undigested food as faeces.'), kt('Deamination', 'Removal of the nitrogen part of excess amino acids in the liver, forming urea.')],
      table(['Organ', 'Main waste'], [['Kidneys', 'Urea'], ['Lungs', 'Carbon dioxide'], ['Skin', 'Sweat'], ['Liver', 'Bile pigments']], 'Table of four excretory organs and their main waste'),
      [1],
    ),
    sec(
      '2. The urinary system',
      `- **Kidneys** (a pair): bean-shaped, against the back wall of the abdomen on either side of the backbone; they filter blood and form urine.
- **Renal artery**: a branch of the aorta that brings blood (with urea) to each kidney. **Renal vein**: takes cleaned blood to the inferior vena cava.
- **Ureters**: a muscular tube from each kidney to the bladder.
- **Urinary bladder**: a muscular, stretchable bag that **stores urine**; a ring of muscle (sphincter) at its neck controls release.
- **Urethra**: carries urine from the bladder to the outside.`,
      [kt('Ureter', 'Tube carrying urine from a kidney to the bladder.'), kt('Urethra', 'Tube carrying urine from the bladder to the outside.'), kt('Urinary bladder', 'Muscular bag that stores urine.')],
      V.urinary,
      [2],
    ),
    sec(
      '3. External and internal structure of the kidney',
      `**External:** bean-shaped, dark red, about 10 cm long; outer side convex, inner side concave with a notch, the **hilum**, where the renal artery enters and the renal vein and ureter leave; covered by a thin, tough **capsule**.

**Longitudinal section:**
- **Cortex** — outer, dark, dotted; contains the **Malpighian capsules** and **convoluted tubules**.
- **Medulla** — inner, made of striped, cone-shaped **renal pyramids** containing the **loops of Henle** and **collecting ducts**.
- **Pelvis** — funnel-shaped cavity into which the pyramids open; it leads into the **ureter**.`,
      [kt('Cortex', 'Outer region of the kidney with the Malpighian capsules.'), kt('Medulla', 'Inner region made of renal pyramids.'), kt('Renal pelvis', 'Funnel-shaped cavity that collects urine and leads to the ureter.'), kt('Hilum', 'Notch where the renal vessels and ureter join the kidney.')],
      V.kidney,
      [3],
    ),
    sec(
      '4. The nephron and the Malpighian capsule',
      `The **nephron** (kidney tubule) is the **structural and functional unit** of the kidney; each kidney has about **one million**.

- **Malpighian capsule** (renal corpuscle) = **Bowman's capsule** (a double-walled cup) + **glomerulus** (a knot of capillaries inside it).
- The **afferent arteriole** (wider) brings blood into the glomerulus; the **efferent arteriole** (narrower) carries it away, so the **pressure in the glomerulus is high**.
- The efferent arteriole forms a **network of capillaries round the tubule**, which drains into a branch of the renal vein.
- **Tubule:** **proximal convoluted tubule** (cortex) → **loop of Henle** (dips into the medulla) → **distal convoluted tubule** (cortex) → **collecting duct** → pelvis.`,
      [kt('Nephron', 'Structural and functional unit of the kidney.'), kt('Glomerulus', 'Knot of capillaries inside Bowman\'s capsule.'), kt("Bowman's capsule", 'Double-walled cup that receives the filtrate.'), kt('Afferent arteriole', 'The wider vessel bringing blood into the glomerulus.')],
      V.nephron,
      [4],
      [V.malpighian],
    ),
    sec(
      '5. Formation of urine',
      `1. **Ultrafiltration** (in the Malpighian capsule): high pressure forces water, glucose, amino acids, salts and urea out of the glomerulus into Bowman's capsule. Blood cells and plasma proteins are too large and stay in the blood. About **${KID.filtrate} litres** of filtrate form each day.
2. **Selective reabsorption** (mainly the **proximal tubule**; also the loop of Henle and distal tubule): **all** glucose and amino acids and **most** water and salts return to the blood in the capillaries round the tubule. Over **${Math.floor(KID.pctReabsorbed)}%** of the filtrate is reabsorbed.
3. **Tubular secretion** (in the **distal tubule**): extra potassium and hydrogen ions, some drugs and other wastes pass from the blood into the tubule.

About **${KID.urine} litres** of urine are passed a day.

| Substance | Plasma | Filtrate | Urine |
|---|---|---|---|
| Proteins | Present | Absent | Absent |
| Glucose | Present | Present | Absent |
| Urea | Low | Low | About ${COMP.ureaFactor} times higher |

Glucose in urine suggests very high blood glucose (diabetes); protein or blood cells in urine suggest damage to the glomerular filter.`,
      [kt('Ultrafiltration', 'Filtration of blood under pressure in the Malpighian capsule.'), kt('Selective reabsorption', 'Return of useful substances from the tubule to the blood.'), kt('Tubular secretion', 'Active addition of extra substances from the blood into the tubule.'), kt('Glomerular filtrate', 'Fluid in Bowman\'s capsule: plasma without proteins.')],
      table(['Stage', 'Site'], [['Ultrafiltration', 'Malpighian capsule'], ['Selective reabsorption', 'Proximal tubule (mainly)'], ['Tubular secretion', 'Distal tubule']], 'Table of the three stages of urine formation and their sites'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Calling the removal of faeces excretion (it is **egestion**).
- Saying urea is made in the kidneys (it is made in the **liver**).
- Swapping the **ureter** (kidney → bladder) and the **urethra** (bladder → outside).
- Drawing the efferent arteriole wider than the afferent.
- Saying glucose is not filtered: it **is** filtered, then **fully reabsorbed**.

**How marks are usually awarded**
- 1 mark: a term (ultrafiltration, deamination, nephron), an odd one out **with its category**, a part named.
- 2 marks: two differences (cortex and medulla, filtrate and urine), a feature with its reason.
- 3 marks: the three stages with their sites; a labelled urinary system, kidney section or nephron.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Excretion?', 'Removal of metabolic wastes made by body cells.', 'definition', 1),
    fc(2, 'Excretion or egestion: passing faeces?', 'Egestion.', 'exam-tip', 1),
    fc(3, 'Where is urea made?', 'In the liver (deamination).', 'fact', 1),
    fc(4, 'Wastes in sweat?', 'Water, salts, a little urea.', 'fact', 1),
    fc(5, 'Waste removed by the lungs?', 'Carbon dioxide (and water vapour).', 'fact', 1),
    fc(6, 'Waste excreted by the liver in bile?', 'Bile pigments.', 'fact', 1),
    fc(7, 'Ureter?', 'Tube from kidney to bladder.', 'definition', 2),
    fc(8, 'Urethra?', 'Tube from bladder to outside.', 'definition', 2),
    fc(9, 'Stores urine?', 'Urinary bladder.', 'fact', 2),
    fc(10, 'Vessel bringing blood to the kidney?', 'Renal artery.', 'fact', 2),
    fc(11, 'Vessel with least urea?', 'Renal vein.', 'fact', 2),
    fc(12, 'Notch on the kidney?', 'Hilum.', 'fact', 3),
    fc(13, 'Outer region of the kidney?', 'Cortex (dotted; Malpighian capsules).', 'fact', 3),
    fc(14, 'Inner region of the kidney?', 'Medulla (renal pyramids).', 'fact', 3),
    fc(15, 'Funnel leading to the ureter?', 'Renal pelvis.', 'fact', 3),
    fc(16, 'Unit of the kidney?', 'Nephron.', 'definition', 4),
    fc(17, 'Nephrons per kidney?', 'About a million.', 'fact', 4),
    fc(18, 'Malpighian capsule?', "Bowman's capsule + glomerulus.", 'definition', 4),
    fc(19, 'Wider arteriole?', 'Afferent (into the glomerulus).', 'exam-tip', 4),
    fc(20, 'Why is glomerular pressure high?', 'Afferent wider than efferent.', 'concept', 4),
    fc(21, 'Part of the nephron in the medulla?', 'Loop of Henle.', 'fact', 4),
    fc(22, 'Three stages of urine formation?', 'Ultrafiltration, selective reabsorption, tubular secretion.', 'exam-tip', 5),
    fc(23, 'Site of ultrafiltration?', 'Malpighian capsule.', 'fact', 5),
    fc(24, 'Main site of reabsorption?', 'Proximal convoluted tubule.', 'fact', 5),
    fc(25, 'Site of tubular secretion?', 'Distal convoluted tubule.', 'fact', 5),
    fc(26, 'Not filtered from blood?', 'Blood cells and plasma proteins.', 'concept', 5),
    fc(27, 'Filtered but fully reabsorbed?', 'Glucose (and amino acids).', 'concept', 5),
    fc(28, 'Filtrate per day?', `About ${KID.filtrate} litres.`, 'fact', 5),
    fc(29, 'Urine per day?', `About ${KID.urine} litres.`, 'fact', 5),
    fc(30, 'Glucose in urine suggests?', 'Very high blood glucose (diabetes).', 'concept', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
