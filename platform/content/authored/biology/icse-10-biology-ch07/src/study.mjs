// ICSE 10 Biology ch07 notes and flashcards.
import { T, table, unit, PROV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { GROUPS, antibodies, canGive } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });
const ag = { A: 'A', B: 'B', AB: 'A and B', O: 'none' };

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Circulatory System: Blood and Lymph — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Composition of blood',
      `**Blood** is a fluid connective tissue: an adult has about 5–6 litres.

**Plasma** (about 55%) is a pale yellow liquid: about 90% water, with **plasma proteins** (albumin, globulins including antibodies, **fibrinogen** and **prothrombin** for clotting), digested food (glucose, amino acids), salts, **urea**, hormones and dissolved carbon dioxide. It **transports** these substances and distributes heat.

**Formed elements** (about 45%):

| | Red blood cells (erythrocytes) | White blood cells (leucocytes) | Platelets (thrombocytes) |
|---|---|---|---|
| Shape | Biconcave disc | Irregular, amoeboid | Small fragments |
| Nucleus | **Absent** in mammals | **Present** | Absent |
| Number per cubic mm | About 5 million | 5000–10 000 | 2.5–4 lakh |
| Formed in | Red bone marrow | Bone marrow; lymph nodes | Bone marrow |
| Life | About 120 days | A few days | About a week |
| Function | Carry **oxygen** (as oxyhaemoglobin) and some CO₂ | **Defence** | Start **clotting** |

**Kinds of white cells**
- **Granulocytes** (lobed nucleus, granular cytoplasm): **neutrophils** (3–5 lobes; most numerous; engulf bacteria by **phagocytosis**), **eosinophils** (2 lobes; rise in allergies and worm infections), **basophils** (S-shaped nucleus; release histamine and heparin).
- **Agranulocytes**: **lymphocytes** (large round nucleus; make **antibodies**) and **monocytes** (largest; kidney-shaped nucleus; become scavenger cells).
- White cells squeeze through capillary walls by **diapedesis** to reach infected tissue.`,
      [kt('Plasma', 'The liquid part of blood, about 55% of its volume.'), kt('Phagocytosis', 'Engulfing and digesting of germs by white cells.'), kt('Diapedesis', 'Squeezing of white cells through capillary walls.'), kt('Antibodies', 'Proteins made by lymphocytes that destroy germs or their toxins.')],
      V.cells,
      [1],
    ),
    sec(
      '2. Why mammalian red blood cells are efficient',
      `| Feature | Advantage |
|---|---|
| **No nucleus** | More space for **haemoglobin**, so more oxygen per cell |
| **No mitochondria** | Respires anaerobically, so it **does not use up** the oxygen it carries |
| **Biconcave disc** | **Large surface area** for gas exchange; thin centre gives a short diffusion distance |
| **Small and flexible** | Squeezes through narrow **capillaries** |

Because they have no nucleus, red cells cannot divide or repair themselves; they live about **120 days** and are broken down in the **spleen** and liver. More red cells are made when the body needs more oxygen, for example at high altitude.`,
      [kt('Haemoglobin', 'Iron-containing red pigment that combines with oxygen.'), kt('Oxyhaemoglobin', 'Haemoglobin combined with oxygen.')],
      V.rbc,
      [2],
    ),
    sec(
      '3. Blood coagulation',
      `When a vessel is cut, blood **clots** and seals the wound.
1. Damaged tissue and **platelets** release **thromboplastin** (thrombokinase).
2. Thromboplastin, with **calcium ions**, converts **prothrombin** into **thrombin**.
3. Thrombin converts soluble **fibrinogen** into insoluble **fibrin** threads.
4. The fibrin mesh **traps blood cells**, forming a **clot**. As the clot shrinks, **serum** (plasma without fibrinogen) oozes out.

- **Vitamin K** is needed by the liver to make prothrombin.
- Blood does not clot inside healthy vessels: the smooth lining does not release thromboplastin, and **heparin** prevents clotting.
- Blood banks add **sodium citrate**, which removes calcium ions, to stop stored blood clotting.`,
      [kt('Thromboplastin', 'Substance from platelets and damaged tissue that starts clotting.'), kt('Fibrin', 'Insoluble protein threads that form the clot.'), kt('Serum', 'Plasma without fibrinogen and other clotting factors.'), kt('Heparin', 'A natural substance that prevents clotting inside vessels.')],
      V.clot,
      [3],
    ),
    sec(
      '4. Tissue fluid, lymph, spleen and tonsils',
      `**Tissue fluid.** At the arterial end of a capillary, pressure forces plasma (without red cells and most proteins) out into the spaces between cells. This **tissue fluid** supplies food and oxygen and collects wastes. Most of it re-enters the capillary at the venous end.

**Lymph.** The extra tissue fluid drains into **lymph capillaries** (closed at one end) and is now called **lymph**: colourless, with few proteins, many **lymphocytes** and no red cells.

**Lymphatic system:** lymph capillaries → **lymph vessels** (with **valves**, so flow is one way, towards the heart) → **lymph nodes** → main lymph ducts (the thoracic duct) → large veins near the heart.

**Functions:** returns tissue fluid to the blood (blockage causes swelling); **lacteals** absorb digested fats; lymph nodes **filter germs** and make lymphocytes.

- **Spleen** — the largest lymphoid organ: destroys worn-out red cells (the graveyard of red cells), makes lymphocytes, filters blood and **stores blood**.
- **Tonsils** — lymphoid tissue at the back of the throat: trap and destroy germs entering through the mouth and nose.`,
      [kt('Tissue fluid', 'Fluid filtered from plasma that bathes the body cells.'), kt('Lymph', 'Tissue fluid that has entered lymph vessels.'), kt('Lymph node', 'Swelling on a lymph vessel that filters germs and makes lymphocytes.'), kt('Lacteal', 'Lymph vessel in a villus that absorbs fats.')],
      V.lymph,
      [4],
    ),
    sec(
      '5. ABO blood groups and the Rh factor',
      `Red cells may carry **antigens** A and B; plasma carries **antibodies** against the antigens a person lacks (discovered by Karl Landsteiner).

${'| Group | Antigen on red cells | Antibodies in plasma | Can receive from |\n|---|---|---|---|\n' + GROUPS.map((g) => `| ${g} | ${ag[g]} | ${antibodies(g).length ? antibodies(g).join(' and ') : 'none'} | ${GROUPS.filter((d) => canGive(d, g)).join(', ')} |`).join('\n')}

- **Agglutination** (clumping) happens when donor antigens meet the matching antibody in the recipient's plasma.
- **O** is the **universal donor** (no antigens); **AB** is the **universal recipient** (no antibodies).

**Rh factor.** Another antigen on red cells: **Rh-positive** (most people) or **Rh-negative**. An Rh-negative person forms anti-Rh antibodies after receiving Rh-positive blood.

**Rh incompatibility in pregnancy.** An **Rh-negative mother** carrying an **Rh-positive baby** may form anti-Rh antibodies when the baby's blood mixes with hers at birth. In a **later** Rh-positive pregnancy these antibodies cross the placenta and destroy the baby's red cells (anaemia, jaundice, possible death). An **anti-Rh injection** given to the mother soon after the first delivery prevents this.`,
      [kt('Antigen', 'A substance on red cells that can trigger antibody formation.'), kt('Agglutination', 'Clumping of red cells by matching antibodies.'), kt('Universal donor', 'Group O: red cells with no A or B antigen.'), kt('Rh factor', 'An antigen on the red cells of Rh-positive people.')],
      V.typing,
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying white cells have no nucleus: it is mature **red** cells that lack one.
- Writing the clotting steps out of order, or forgetting **calcium** and **vitamin K**.
- Putting antibodies on the red cells: **antigens** are on the cells, **antibodies** in the plasma.
- Calling AB the universal donor: **O** is the donor, **AB** the recipient.
- Saying the **first** Rh-positive baby is at risk: it is usually a **later** one.

**How marks are usually awarded**
- 1 mark: a term (agglutination, diapedesis, serum), an odd one out **with its category**, a blood group.
- 2 marks: a feature with its advantage, two differences, a transfusion decision with a reason.
- 3 marks: the steps of clotting, the Rh problem and its prevention, or a labelled drawing of blood cells.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Share of plasma in blood?', 'About 55%.', 'fact', 1),
    fc(2, 'Two clotting proteins in plasma?', 'Fibrinogen and prothrombin.', 'fact', 1),
    fc(3, 'Where are red cells made in adults?', 'Red bone marrow.', 'fact', 1),
    fc(4, 'Life of a red cell?', 'About 120 days.', 'fact', 1),
    fc(5, 'Most numerous white cell?', 'Neutrophil (3–5 lobed nucleus).', 'fact', 1),
    fc(6, 'Antibody-making white cell?', 'Lymphocyte.', 'fact', 1),
    fc(7, 'Largest white cell?', 'Monocyte (kidney-shaped nucleus).', 'fact', 1),
    fc(8, 'White cells that rise in allergies?', 'Eosinophils.', 'fact', 1),
    fc(9, 'Diapedesis?', 'White cells squeezing through capillary walls.', 'definition', 1),
    fc(10, 'Phagocytosis?', 'Engulfing and digesting germs.', 'definition', 1),
    fc(11, 'Why no nucleus in red cells?', 'More room for haemoglobin.', 'concept', 2),
    fc(12, 'Why no mitochondria in red cells?', 'They do not use the oxygen they carry.', 'concept', 2),
    fc(13, 'Advantage of the biconcave shape?', 'Large surface area; thin centre for diffusion.', 'concept', 2),
    fc(14, 'Why can red cells not divide?', 'They have no nucleus.', 'concept', 2),
    fc(15, 'Substance that starts clotting?', 'Thromboplastin.', 'fact', 3),
    fc(16, 'Clotting chain?', 'Thromboplastin → thrombin (with calcium) → fibrin mesh.', 'exam-tip', 3),
    fc(17, 'Vitamin needed for clotting?', 'Vitamin K (for prothrombin).', 'fact', 3),
    fc(18, 'Serum?', 'Plasma without fibrinogen.', 'definition', 3),
    fc(19, 'Natural anticoagulant?', 'Heparin.', 'fact', 3),
    fc(20, 'How does tissue fluid form?', 'Plasma filters out of capillaries at the arterial end.', 'concept', 4),
    fc(21, 'Lymph?', 'Tissue fluid that has entered lymph vessels.', 'definition', 4),
    fc(22, 'Why valves in lymph vessels?', 'Prevent backflow; one-way flow to the heart.', 'concept', 4),
    fc(23, 'Two jobs of lymph nodes?', 'Filter germs; make lymphocytes.', 'fact', 4),
    fc(24, 'Graveyard of red cells?', 'Spleen.', 'fact', 4),
    fc(25, 'Tonsils?', 'Lymphoid tissue in the throat that traps germs.', 'definition', 4),
    fc(26, 'Universal donor?', 'Group O (no antigens).', 'exam-tip', 5),
    fc(27, 'Universal recipient?', 'Group AB (no antibodies).', 'exam-tip', 5),
    fc(28, 'Antibodies in group A plasma?', 'Anti-B.', 'fact', 5),
    fc(29, 'Agglutination?', 'Clumping of red cells by matching antibodies.', 'definition', 5),
    fc(30, 'When is Rh incompatibility a risk?', 'Rh-negative mother, Rh-positive baby, later pregnancy.', 'concept', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
