// ICSE 10 Biology ch12 Endocrine System — notes and flashcards.
import { T, table, unit, PROV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { NORMAL } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Endocrine System — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Endocrine and exocrine glands; where the glands are',
      `**Hormones** are chemical messengers secreted by **endocrine glands** directly into the **blood**, which carries them to **target organs**. They act slowly compared with nerves, but their effects last longer.

| Endocrine (ductless) glands | Exocrine glands |
|---|---|
| No ducts | Have ducts |
| Secrete hormones into the blood | Secrete enzymes, sweat, tears, saliva onto a surface or into a cavity |
| Thyroid, pituitary, adrenal | Salivary, sweat, lacrimal glands |

The **pancreas** is a **heterocrine (mixed)** gland: its acini are exocrine (pancreatic juice through a duct) and its **islets of Langerhans** are endocrine.

**Location and shape**
- **Pituitary:** pea-sized, at the **base of the brain**, attached to the hypothalamus; anterior and posterior lobes.
- **Thyroid:** two lobes joined by an isthmus (butterfly or H-shaped), in the **neck** on either side of the windpipe below the larynx.
- **Pancreas:** long, leaf-like, lying **behind the stomach** with its head in the loop of the duodenum.
- **Adrenal:** a cap (roughly triangular) on **top of each kidney**; outer cortex, inner medulla.`,
      [kt('Hormone', 'A chemical messenger secreted by a ductless gland and carried by blood to a target organ.'), kt('Endocrine gland', 'A ductless gland that releases hormones into the blood.'), kt('Heterocrine gland', 'A gland with both exocrine and endocrine parts, such as the pancreas.')],
      V.glands,
      [1],
      [V.pancreas],
    ),
    sec(
      '2. Pancreas (insulin, glucagon) and thyroid (thyroxine)',
      `**Islets of Langerhans:** **beta cells** secrete **insulin**; **alpha cells** secrete **glucagon**.
- **Insulin lowers blood sugar:** cells take up glucose; the liver and muscles store extra glucose as **glycogen**.
- **Glucagon raises blood sugar:** liver glycogen is changed into **glucose**.
- Together they keep blood sugar near **${NORMAL.low}–${NORMAL.high} mg per 100 mL** of blood.

| Insulin | Effect |
|---|---|
| Hyposecretion | **Diabetes mellitus:** high blood sugar, glucose in urine (glycosuria), frequent urination, thirst, tiredness, weight loss |
| Hypersecretion (or overdose) | **Hypoglycaemia:** low blood sugar, shaking, sweating, fainting (insulin shock) |

**Thyroxine** (contains **iodine**) controls the **basal metabolic rate** and is needed for normal **physical and mental development**.

| Thyroxine | Effect |
|---|---|
| Too little in childhood | **Cretinism:** stunted, disproportionate growth, delayed mental development, puffy face |
| Too little in adults | **Myxoedema:** low metabolic rate, puffy skin, sluggishness, weight gain |
| Lack of iodine | **Simple goitre:** enlarged thyroid |
| Too much | **Exophthalmic goitre:** protruding eyes, high metabolic rate, fast heartbeat, weight loss, nervousness |`,
      [kt('Insulin', 'Hormone of the beta cells that lowers blood sugar.'), kt('Glucagon', 'Hormone of the alpha cells that raises blood sugar.'), kt('Diabetes mellitus', 'Disorder due to too little insulin, with high blood sugar and sugar in urine.'), kt('Thyroxine', 'Iodine-containing thyroid hormone that controls metabolic rate.')],
      V.sugar,
      [2],
      [V.glucose],
    ),
    sec(
      '3. Adrenal gland: cortical hormones and adrenaline',
      `**Adrenal cortex (outer):** secretes **cortical hormones (corticoids)**: they regulate **salt and water balance** (for example aldosterone), help in **carbohydrate metabolism** (for example cortisol), and include some sex hormones. They are needed for life.

**Adrenal medulla (inner):** secretes **adrenaline**, the **emergency** or "fight or flight" hormone. In danger or anger it:
- increases the **heartbeat** and **blood pressure**;
- increases the **breathing rate**;
- raises **blood sugar** (liver glycogen → glucose);
- **dilates the pupils**; makes the hair stand on end;
- sends more blood to the **skeletal muscles** and less to the gut and skin.`,
      [kt('Adrenaline', 'Hormone of the adrenal medulla that prepares the body for an emergency.'), kt('Cortical hormones', 'Hormones of the adrenal cortex that regulate salts, water and carbohydrate metabolism.')],
      table(['Region', 'Hormone', 'Role'], [['Cortex', 'Cortical hormones', 'Salt, water and sugar balance'], ['Medulla', 'Adrenaline', 'Emergency response']], 'Table of the adrenal cortex and medulla, their hormones and roles'),
      [3],
    ),
    sec(
      '4. Pituitary gland: the master gland',
      `The pituitary is called the **master gland** because its **tropic hormones** control other endocrine glands.

| Lobe | Hormone | Action |
|---|---|---|
| Anterior | **Growth hormone (GH)** | Growth of bones and muscles |
| Anterior | **TSH** | Stimulates the thyroid to release thyroxine |
| Anterior | **ACTH** | Stimulates the adrenal cortex |
| Anterior | **FSH, LH** | Act on the gonads (testes, ovaries) |
| Posterior | **ADH (vasopressin)** | Increases reabsorption of water in the kidney tubules |
| Posterior | **Oxytocin** | Contracts the uterus at childbirth; milk release |

**Growth hormone:** too little in childhood → **dwarfism** (short but proportionate body, normal intelligence); too much in childhood → **gigantism**; too much in adults → **acromegaly** (enlarged jaw, hands and feet).

**ADH:** too little → **diabetes insipidus** (large volumes of dilute urine, thirst, no sugar in urine); too much → little, concentrated urine and water retention.`,
      [kt('Tropic hormone', 'A hormone that stimulates another endocrine gland.'), kt('ADH', 'Antidiuretic hormone; increases water reabsorption in the kidneys.'), kt('Acromegaly', 'Enlarged jaw, hands and feet due to excess growth hormone in adults.')],
      table(['Hormone', 'Too little', 'Too much'], [['Growth hormone', 'Dwarfism', 'Gigantism; acromegaly'], ['ADH', 'Diabetes insipidus', 'Concentrated urine']], 'Table of disorders of growth hormone and ADH'),
      [4],
    ),
    sec(
      '5. Feedback: TSH and thyroxine',
      `The secretion of thyroxine is controlled by **negative feedback**:
- **Low thyroxine** in the blood → anterior pituitary releases **more TSH** → thyroid releases more thyroxine.
- **High thyroxine** → pituitary releases **less TSH** → thyroid releases less thyroxine.

So the level of the hormone itself controls the signal that releases it, keeping it **steady**.

**Simple goitre and feedback:** without iodine, thyroxine stays low, TSH stays high, and the overstimulated thyroid **enlarges**.`,
      [kt('Negative feedback', 'Control in which a rise in a hormone reduces the signal that causes its release.'), kt('TSH', 'Thyroid-stimulating hormone of the anterior pituitary.')],
      V.feedback,
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Swapping alpha and beta cells (beta → insulin, alpha → glucagon).
- Confusing diabetes **mellitus** (insulin, sugar in urine) with diabetes **insipidus** (ADH, no sugar).
- Calling the thyroid the master gland, or placing the adrenal glands below the kidneys.
- Saying a pituitary dwarf is mentally slow (that is a cretin).
- Describing feedback in one direction only.

**How marks are usually awarded**
- 1 mark: a term, a gland, a hormone, an odd one out **with its category**.
- 2 marks: two differences point for point, or a hormone and its effect.
- 3 marks: a labelled diagram (gland positions, feedback loop) or a three-step explanation.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is a hormone?', 'A chemical messenger from a ductless gland, carried by blood.', 'definition', 1),
    fc(2, 'Endocrine vs exocrine gland?', 'No duct, into blood vs duct onto a surface.', 'concept', 1),
    fc(3, 'Why is the pancreas heterocrine?', 'Exocrine acini plus endocrine islets.', 'concept', 1),
    fc(4, 'Where is the pituitary?', 'At the base of the brain; pea-sized.', 'fact', 1),
    fc(5, 'Where is the thyroid?', 'In the neck, two lobes around the windpipe.', 'fact', 1),
    fc(6, 'Where are the adrenals?', 'A cap on top of each kidney.', 'fact', 1),
    fc(7, 'Which cells make insulin?', 'Beta cells of the islets of Langerhans.', 'fact', 2),
    fc(8, 'Which cells make glucagon?', 'Alpha cells of the islets.', 'fact', 2),
    fc(9, 'Action of insulin?', 'Lowers blood sugar: glucose taken up and stored as glycogen.', 'concept', 2),
    fc(10, 'Action of glucagon?', 'Raises blood sugar: glycogen changed to glucose.', 'concept', 2),
    fc(11, 'Too little insulin?', 'Diabetes mellitus.', 'fact', 2),
    fc(12, 'Glycosuria?', 'Glucose in urine.', 'definition', 2),
    fc(13, 'Element in thyroxine?', 'Iodine.', 'fact', 2),
    fc(14, 'Too little thyroxine in a child?', 'Cretinism.', 'fact', 2),
    fc(15, 'Too little thyroxine in an adult?', 'Myxoedema.', 'fact', 2),
    fc(16, 'Too much thyroxine?', 'Exophthalmic goitre: bulging eyes, high metabolic rate.', 'fact', 2),
    fc(17, 'Two regions of the adrenal?', 'Outer cortex, inner medulla.', 'fact', 3),
    fc(18, 'Emergency hormone?', 'Adrenaline, from the adrenal medulla.', 'fact', 3),
    fc(19, 'Three effects of adrenaline?', 'Faster heartbeat, faster breathing, higher blood sugar.', 'exam-tip', 3),
    fc(20, 'Role of cortical hormones?', 'Salt, water and carbohydrate balance.', 'concept', 3),
    fc(21, 'Why is the pituitary the master gland?', 'Its tropic hormones control other glands.', 'concept', 4),
    fc(22, 'Target of TSH?', 'Thyroid.', 'fact', 4),
    fc(23, 'Target of ACTH?', 'Adrenal cortex.', 'fact', 4),
    fc(24, 'Action of ADH?', 'More water reabsorbed in kidney tubules.', 'concept', 4),
    fc(25, 'Action of oxytocin?', 'Contracts the uterus at birth; milk release.', 'concept', 4),
    fc(26, 'Too little growth hormone in a child?', 'Dwarfism (normal intelligence).', 'fact', 4),
    fc(27, 'Too much growth hormone: child vs adult?', 'Gigantism vs acromegaly.', 'exam-tip', 4),
    fc(28, 'Too little ADH?', 'Diabetes insipidus: much dilute urine.', 'fact', 4),
    fc(29, 'Low thyroxine leads to?', 'More TSH from the pituitary.', 'concept', 5),
    fc(30, 'Why does iodine lack cause goitre?', 'Low thyroxine, high TSH, thyroid overstimulated.', 'exam-tip', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
