// ICSE 10 Biology ch13 Reproductive System — notes and flashcards.
import { T, table, unit, PROV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { GAMETE, BODY, CYCLE, GESTATION } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Reproductive System — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Male and female reproductive organs; secondary sexual characters',
      `**Male reproductive system**
- **Testes** (primary organs): make **sperms** in the seminiferous tubules and secrete **testosterone** from the interstitial cells. They lie in the **scrotum**, outside the abdomen, where the temperature is about **2–3 °C lower**, as sperm formation needs.
- **Epididymis:** coiled tube on each testis; stores sperms while they mature.
- **Vas deferens:** carries sperms from the epididymis over the urinary bladder to the urethra.
- **Urethra:** common passage for **urine and semen**; runs through the **penis**.
- **Accessory glands:** **seminal vesicles**, **prostate gland** and **Cowper's glands**; their secretions nourish and activate the sperms and, with the sperms, form **semen**.

**Female reproductive system**
- **Ovaries:** produce **eggs (ova)** and secrete **oestrogen** and **progesterone**.
- **Oviducts (fallopian tubes):** each has a fringed funnel (**fimbriae**) near the ovary; carry the egg; **fertilisation** takes place here.
- **Uterus:** hollow, pear-shaped, muscular organ where the embryo **implants** and develops.
- **Cervix:** the narrow neck of the uterus. **Vagina:** the passage to the outside; the **birth canal**.

**Secondary sexual characters** appear at **puberty**; they distinguish the sexes but do not make gametes.
- Boys (testosterone): deeper voice, facial and body hair, broader shoulders, more muscular body.
- Girls (oestrogen): development of breasts, broader hips, start of menstruation.`,
      [kt('Scrotum', 'Sac outside the abdomen that holds the testes at a lower temperature.'), kt('Semen', 'Sperms together with the secretions of the accessory glands.'), kt('Oviduct', 'Tube that carries the egg from the ovary to the uterus; site of fertilisation.'), kt('Secondary sexual characters', 'Features that distinguish the sexes at puberty but are not directly involved in reproduction.')],
      V.male,
      [1],
      [V.female],
    ),
    sec(
      '2. Structure and functions of the sperm and the egg',
      `**Sperm** (tiny, motile):
- **Head:** **acrosome** at the tip (enzymes to pass through the egg coverings) and a **haploid nucleus** (${GAMETE} chromosomes in humans).
- **Middle piece:** spirally arranged **mitochondria** release energy for swimming.
- **Tail:** lashes to drive the sperm forward.

**Egg (ovum)** (large, round, non-motile):
- **Haploid nucleus** (${GAMETE} chromosomes) and a large amount of **cytoplasm** for the early development of the zygote.
- Surrounded by a clear **zona pellucida** and a layer of **follicle cells**.
- Moved along the oviduct by **cilia** and muscle contractions.`,
      [kt('Acrosome', 'Cap on the sperm head containing enzymes that help it enter the egg.'), kt('Middle piece', 'Part of the sperm packed with mitochondria that supply energy.')],
      V.gametes,
      [2],
    ),
    sec(
      '3. Fertilisation, implantation, gestation and parturition',
      `- **Ovulation:** release of a mature egg from the ovary (about mid-cycle).
- **Fertilisation:** fusion of the nuclei of a sperm and an egg in the **oviduct**, forming a **diploid zygote** (${GAMETE} + ${GAMETE} = ${BODY} chromosomes).
- **Implantation:** the young embryo, formed by repeated divisions of the zygote, sinks into the thick lining of the **uterus** about a week after fertilisation.
- **Gestation:** the period of development in the uterus; about **${GESTATION.days} days (${GESTATION.weeks} weeks)** counted from the first day of the last menstruation. The embryo is called a **foetus** once its organs have formed.
- **Parturition:** childbirth. **Oxytocin** causes strong contractions of the uterus, the cervix widens and the baby is pushed out through the vagina; the placenta follows.`,
      [kt('Fertilisation', 'Fusion of a sperm and an egg to form a zygote.'), kt('Implantation', 'Embedding of the embryo in the uterine lining.'), kt('Gestation', 'Period of development of the baby in the uterus.'), kt('Parturition', 'Childbirth.')],
      table(['Event', 'Where'], [['Fertilisation', 'Oviduct'], ['Implantation', 'Uterus'], ['Parturition', 'Uterus, cervix, vagina']], 'Table: fertilisation in the oviduct, implantation in the uterus, parturition through the cervix and vagina'),
      [3],
    ),
    sec(
      '4. Placenta, foetal membranes and amniotic fluid',
      `The **placenta** is a disc-shaped organ formed partly from the embryo and partly from the uterine wall. It is joined to the foetus by the **umbilical cord**. The bloods of mother and foetus **do not mix**; materials **diffuse** across a thin barrier.

| Function | What happens |
|---|---|
| Nutrition | Glucose, amino acids, vitamins and minerals pass to the foetus |
| Respiration | Oxygen to the foetus; carbon dioxide to the mother |
| Excretion | Urea and other wastes pass to the mother |
| Endocrine | Secretes hormones such as progesterone (and oestrogen) |

Harmful substances (nicotine, alcohol, some drugs and germs) can also cross the placenta.

**Foetal membranes:** the **amnion** (innermost) encloses the **amniotic fluid**; the chorion lies outside it and helps form the placenta.
**Amniotic fluid:** a **shock absorber**; keeps the foetus moist and at an even temperature; allows free movement.`,
      [kt('Placenta', 'Organ through which the foetus exchanges materials with the mother and which secretes hormones.'), kt('Umbilical cord', 'Cord of blood vessels joining the foetus to the placenta.'), kt('Amnion', 'Innermost foetal membrane enclosing the amniotic fluid.')],
      V.foetus,
      [4],
    ),
    sec(
      '5. The menstrual cycle; testosterone, oestrogen and progesterone',
      `The **menstrual cycle** lasts about **${CYCLE.length} days** (cycles of about 26–32 days are normal).
- **Days ${CYCLE.mensFrom}–${CYCLE.mensTo}, menstruation:** the thick uterine lining breaks down and is shed with some blood.
- **Days ${CYCLE.repairFrom}–${CYCLE.repairTo}, repair:** a follicle grows in the ovary and secretes **oestrogen**, which rebuilds the lining.
- **About day ${CYCLE.ovulation}, ovulation:** the follicle releases the egg (about 14 days before the next menstruation).
- **Days ${CYCLE.secretoryFrom}–${CYCLE.secretoryTo}:** the empty follicle becomes the **corpus luteum**, which secretes **progesterone**; the lining stays thick and ready for implantation. If the egg is not fertilised, the corpus luteum breaks down, progesterone falls and menstruation follows. If it is fertilised, the lining is kept and menstruation stops during pregnancy.

| Hormone | Source | Role |
|---|---|---|
| Testosterone | Testes | Male secondary sexual characters; sperm formation |
| Oestrogen | Ovary (follicle) | Female secondary sexual characters; repair of uterine lining |
| Progesterone | Corpus luteum; placenta | Keeps the uterine lining thick; maintains pregnancy |`,
      [kt('Ovulation', 'Release of an egg from the ovary.'), kt('Corpus luteum', 'Yellow body formed from the empty follicle; secretes progesterone.'), kt('Menstruation', 'Shedding of the uterine lining when there is no pregnancy.')],
      V.cycle,
      [5],
    ),
    sec(
      '6. Identical and fraternal twins',
      `| Identical (monozygotic) twins | Fraternal (dizygotic) twins |
|---|---|
| One egg fertilised by one sperm | Two eggs fertilised by two sperms |
| One zygote that splits into two embryos | Two separate zygotes |
| Same genes | Genes differ, like ordinary siblings |
| Always the same sex | Same or different sex |`,
      [kt('Identical twins', 'Twins from one zygote that split; same genes and sex.'), kt('Fraternal twins', 'Twins from two eggs fertilised by two sperms.')],
      V.twins,
      [6],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying fertilisation takes place in the uterus (it is in the oviduct).
- Saying the bloods of the mother and foetus mix in the placenta.
- Confusing ovulation (release of an egg) with parturition (birth).
- Calling the testes accessory glands, or forgetting that only the male urethra carries semen.
- Calling a boy and girl pair identical twins.

**How marks are usually awarded**
- 1 mark: a term, a part, an odd one out **with its category**.
- 2 marks: two functions or differences, point for point.
- 3 marks: a labelled diagram (female system, sperm) or an explanation in three steps (placenta, menstrual cycle).`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Why are the testes in the scrotum?', 'Sperms need a temperature 2–3 °C below body temperature.', 'concept', 1),
    fc(2, 'Function of the epididymis?', 'Stores sperms while they mature.', 'fact', 1),
    fc(3, 'Function of the vas deferens?', 'Carries sperms to the urethra.', 'fact', 1),
    fc(4, 'Three male accessory glands?', "Seminal vesicles, prostate, Cowper's glands.", 'fact', 1),
    fc(5, 'What is semen?', 'Sperms plus fluids of the accessory glands.', 'definition', 1),
    fc(6, 'Two products of the ovary?', 'Eggs; oestrogen and progesterone.', 'fact', 1),
    fc(7, 'Where does fertilisation occur?', 'In the oviduct (fallopian tube).', 'exam-tip', 3),
    fc(8, 'Function of the uterus?', 'Implantation and development of the embryo.', 'fact', 1),
    fc(9, 'Two secondary sexual characters of boys?', 'Deeper voice; facial hair.', 'fact', 1),
    fc(10, 'Two secondary sexual characters of girls?', 'Breasts develop; hips broaden.', 'fact', 1),
    fc(11, 'Role of the acrosome?', 'Enzymes to pass through the egg coverings.', 'concept', 2),
    fc(12, 'Why does the middle piece have mitochondria?', 'Energy for the tail.', 'concept', 2),
    fc(13, 'Chromosomes in a human sperm?', `${GAMETE}.`, 'fact', 2),
    fc(14, 'Why is the egg large?', 'Cytoplasm for early growth of the zygote.', 'concept', 2),
    fc(15, 'Coverings of the egg?', 'Zona pellucida and follicle cells.', 'fact', 2),
    fc(16, 'Implantation?', 'Embryo sinks into the uterine lining.', 'definition', 3),
    fc(17, 'Human gestation?', `About ${GESTATION.days} days (${GESTATION.weeks} weeks).`, 'fact', 3),
    fc(18, 'Parturition?', 'Childbirth.', 'definition', 3),
    fc(19, 'Hormone for uterine contractions at birth?', 'Oxytocin.', 'fact', 3),
    fc(20, 'Four functions of the placenta?', 'Nutrition, respiration, excretion, hormones.', 'exam-tip', 4),
    fc(21, 'Do the two bloods mix in the placenta?', 'No; materials diffuse across.', 'exam-tip', 4),
    fc(22, 'What joins the foetus to the placenta?', 'Umbilical cord.', 'fact', 4),
    fc(23, 'Role of amniotic fluid?', 'Shock absorber; keeps the foetus moist.', 'concept', 4),
    fc(24, 'Length of the menstrual cycle?', `About ${CYCLE.length} days.`, 'fact', 5),
    fc(25, 'Ovulation day in a 28-day cycle?', `About day ${CYCLE.ovulation}.`, 'fact', 5),
    fc(26, 'Hormone that rebuilds the lining?', 'Oestrogen.', 'fact', 5),
    fc(27, 'Source of progesterone after ovulation?', 'Corpus luteum.', 'fact', 5),
    fc(28, 'Why does menstruation begin?', 'No fertilisation; progesterone falls.', 'concept', 5),
    fc(29, 'Identical twins form from?', 'One zygote that splits.', 'fact', 6),
    fc(30, 'Fraternal twins form from?', 'Two eggs and two sperms.', 'fact', 6),
  ],
  status: 'draft',
  provenance: PROV,
};
