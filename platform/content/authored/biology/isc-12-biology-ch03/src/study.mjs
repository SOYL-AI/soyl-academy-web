// ISC 12 Biology ch03 notes and flashcards.
import { T, table, unit, PROV } from '../../isc-12-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Human Reproduction — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Male reproductive system',
      `Humans reproduce sexually and are **viviparous**. Reproductive events: gametogenesis, insemination, fertilisation, implantation, gestation and parturition.

**Testes.** A pair of oval testes lies in the **scrotum**, outside the abdominal cavity, which keeps them **2–2.5 °C below** body temperature, as needed for spermatogenesis. Each testis (about 4–5 cm long and 2–3 cm wide) has about **250 testicular lobules**, each with **1–3** highly coiled **seminiferous tubules**.
- The tubules are lined by **spermatogonia** (male germ cells), which form sperms, and **Sertoli cells**, which provide nutrition to the germ cells.
- Outside the tubules, in the interstitial spaces, are blood vessels, immunologically competent cells and **interstitial (Leydig) cells**, which secrete **androgens** (testosterone).

**Accessory ducts:** seminiferous tubules → **rete testis** → **vasa efferentia** → **epididymis** (on the posterior surface of each testis; stores and matures sperms) → **vas deferens** → joined by the duct of the seminal vesicle → **ejaculatory duct** → **urethra** → urethral meatus. The urethra carries both urine and semen.

**Accessory glands:** paired **seminal vesicles** (fluid rich in **fructose**, calcium and certain enzymes), the **prostate** (milky fluid that activates sperms), and paired **bulbourethral (Cowper’s) glands** (mucus that lubricates the penis). Their secretions form **seminal plasma**; with sperms, **semen**.

**External genitalia:** the **penis**, made of special tissue that helps erection, with an enlarged tip, the glans penis, covered by the foreskin.`,
      [kt('Seminiferous tubule', 'A coiled tubule of the testis in which sperms are produced.'), kt('Sertoli cells', 'Cells lining the seminiferous tubules that nourish developing sperms.'), kt('Leydig cells', 'Interstitial cells of the testis that secrete androgens.'), kt('Seminal plasma', 'Secretions of the seminal vesicles, prostate and bulbourethral glands.')],
      V.male,
      [1],
      [V.tubule],
    ),
    sec(
      '2. Female reproductive system',
      `**Ovaries** (2–4 cm long), the primary female sex organs, produce the **ovum** and the ovarian hormones (estrogen and progesterone). Each is covered by a thin epithelium enclosing the **ovarian stroma**: a peripheral **cortex** and an inner **medulla**. The cortex contains **follicles** at different stages and, after ovulation, the **corpus luteum**.

**Oviducts (fallopian tubes),** about 10–12 cm long: the funnel-shaped **infundibulum** near the ovary with finger-like **fimbriae** (which help collect the ovum after ovulation), the wider **ampulla** (usual site of fertilisation) and the narrow **isthmus**, which joins the uterus.

**Uterus** (womb), an inverted pear-shaped organ supported by ligaments, opens into the vagina through the narrow **cervix**; the cervical canal and vagina form the **birth canal**. Its wall has three layers: outer thin **perimetrium**, middle thick muscular **myometrium** (strong contractions at delivery) and inner glandular **endometrium**, which undergoes cyclical changes during the menstrual cycle.

**External genitalia:** mons pubis, labia majora, labia minora, hymen and clitoris. (The presence or absence of a hymen is not a reliable indicator of virginity or sexual experience.)

**Mammary glands:** each has **15–20 mammary lobes** containing clusters of cells called **alveoli**, which secrete milk; milk passes through **mammary tubules** → **mammary duct** → **mammary ampulla** → **lactiferous duct** opening at the nipple.`,
      [kt('Infundibulum', 'Funnel-shaped part of the oviduct near the ovary, edged with fimbriae.'), kt('Ampulla', 'Wider part of the oviduct where fertilisation usually occurs.'), kt('Endometrium', 'Inner glandular lining of the uterus that changes during the menstrual cycle.'), kt('Corpus luteum', 'Structure formed from the ruptured Graafian follicle; secretes progesterone.')],
      V.female,
      [2],
      [V.ovary],
    ),
    sec(
      '3. Gametogenesis and its hormonal control',
      `**Spermatogenesis** begins at **puberty** in the seminiferous tubules.
- **Spermatogonia (2n = 46)** divide by mitosis and increase in number. Some become **primary spermatocytes (2n)**.
- A primary spermatocyte completes **meiosis I** to form **two secondary spermatocytes (n = 23)**, which complete **meiosis II** to form **four haploid spermatids**.
- **Spermiogenesis:** spermatids are transformed into **spermatozoa (sperms)**.
- **Spermiation:** sperm heads, embedded in the Sertoli cells, are finally **released** from the seminiferous tubules.

**Hormonal control.** At puberty the hypothalamus increases secretion of **GnRH**, which acts on the anterior pituitary to secrete **LH** and **FSH**. **LH** acts on the **Leydig cells**, stimulating synthesis and secretion of **androgens**, which in turn stimulate spermatogenesis. **FSH** acts on the **Sertoli cells** and stimulates secretion of factors that help **spermiogenesis**.

**Sperm structure.** A plasma membrane covers a **head** (elongated haploid **nucleus** covered anteriorly by the cap-like **acrosome**, filled with enzymes that help fertilisation), a **neck**, a **middle piece** with numerous **mitochondria** (energy for motility) and a **tail**. A human male ejaculates about **200–300 million** sperms; for normal fertility at least **60 percent** must have normal shape and size and at least **40 percent** vigorous motility.

**Oogenesis** begins during **embryonic development**: a couple of million **oogonia** form in each foetal ovary; no more are formed after birth. They start meiosis I and are temporarily **arrested** as **primary oocytes**, each surrounded by granulosa cells: a **primary follicle**. Many follicles degenerate from birth to puberty, leaving **60,000–80,000** in each ovary at puberty. Primary follicles → **secondary follicles** (more granulosa layers and a theca) → **tertiary follicles** (fluid-filled **antrum**). The primary oocyte in the tertiary follicle completes meiosis I, an **unequal** division giving a large haploid **secondary oocyte** and a tiny **first polar body**. The tertiary follicle becomes the mature **Graafian follicle**, in which the secondary oocyte forms a new membrane, the **zona pellucida**. At **ovulation** the Graafian follicle ruptures and releases the **secondary oocyte**. Meiosis II is completed only after a sperm enters, forming the **ovum** and a **second polar body**.`,
      [kt('Spermiogenesis', 'Transformation of spermatids into sperms.'), kt('Spermiation', 'Release of sperms from the seminiferous tubules.'), kt('Polar body', 'Small cell formed by unequal division in oogenesis; it degenerates.'), kt('Graafian follicle', 'Mature ovarian follicle that releases the secondary oocyte at ovulation.'), kt('Zona pellucida', 'Membrane around the secondary oocyte.')],
      V.sperm,
      [3],
      [table(['Feature', 'Spermatogenesis', 'Oogenesis'], [['Begins', 'Puberty', 'Embryonic life'], ['Continuity', 'Continuous', 'Arrested stages; cyclic after puberty'], ['Division of cytoplasm', 'Equal', 'Unequal (polar bodies)'], ['Products per meiocyte', '4 sperms', '1 ovum'], ['Completion', 'In the testis', 'Meiosis II after sperm entry']], 'Table comparing spermatogenesis and oogenesis')],
    ),
    sec(
      '4. Menstrual cycle',
      `The reproductive cycle of female primates is the **menstrual cycle**, repeated at an average interval of about **28/29 days**. The first menstruation at puberty is **menarche**; cycles cease around **50 years** of age (**menopause**). Cycles are interrupted during pregnancy and may also stop owing to stress or poor health.

- **Menstrual phase (days 1–5):** the endometrial lining and its blood vessels break down, forming a liquid that is discharged through the vagina. Menstruation occurs only if the released ovum is not fertilised.
- **Follicular (proliferative) phase:** primary follicles grow into a fully mature Graafian follicle; the endometrium **regenerates** by proliferation. Pituitary **LH and FSH** rise gradually and stimulate follicular development and secretion of **estrogens** by the growing follicles.
- **Ovulation (about day 14):** LH and FSH reach a peak in the middle of the cycle; the rapid secretion of LH (**LH surge**) induces rupture of the Graafian follicle and release of the ovum.
- **Luteal (secretory) phase:** the remaining parts of the Graafian follicle become the **corpus luteum**, which secretes large amounts of **progesterone**, essential for maintaining the endometrium for **implantation** and other events of pregnancy. Without fertilisation the corpus luteum degenerates, progesterone falls, the endometrium disintegrates and a new cycle begins. During pregnancy all events of the cycle stop and there is no menstruation.

**Oestrous versus menstrual cycle.** Non-primate mammals (cows, sheep, rats, deer, dogs, tigers) have an **oestrous cycle**: no menstrual bleeding, the endometrium is reabsorbed, and the female is sexually receptive only during **oestrus** (heat). Primates (monkeys, apes, humans) have a menstrual cycle.`,
      [kt('Menarche', 'The first menstruation, at puberty.'), kt('Menopause', 'Cessation of menstrual cycles, around 50 years.'), kt('LH surge', 'Mid-cycle peak of LH that induces ovulation.'), kt('Oestrous cycle', 'Reproductive cycle of non-primate mammals, without menstrual bleeding.')],
      V.cycle,
      [4],
    ),
    sec(
      '5. Fertilisation, cleavage and implantation',
      `During coitus, semen is released into the vagina (**insemination**). Motile sperms swim through the cervix and uterus and reach the **ampulla**, where the ovum released by the ovary is also transported. Fertilisation can occur only if ovum and sperms reach the ampulla **simultaneously**.

**Physico-chemical events:**
1. **Capacitation** — sperms acquire the ability to fertilise in the female tract.
2. **Acrosomal reaction** — enzymes (sperm lysins) released from the acrosome dissolve a path through the corona radiata and zona pellucida.
3. Contact of a sperm with the **zona pellucida** induces changes in the membrane (**cortical reaction**) that **block the entry of additional sperms**, ensuring that only one sperm fertilises the ovum (no polyspermy).
4. Entry of the sperm induces completion of **meiosis II** of the secondary oocyte: a haploid **ovum** and a **second polar body**.
5. The haploid nuclei of sperm and ovum fuse to form a **diploid zygote**.

**Sex determination.** The ovum always carries X; sperms carry X or Y (50 percent each). X sperm → XX (female); Y sperm → XY (male). The sex of the baby is determined by the **father**.

**Cleavage and implantation.** Mitotic divisions (**cleavage**) begin as the zygote moves through the isthmus towards the uterus, forming 2, 4, 8, 16 daughter cells called **blastomeres**. The embryo with **8–16 blastomeres** is a **morula**, which continues to divide and becomes a **blastocyst** as it moves into the uterus. The blastomeres are arranged into an outer **trophoblast** and an **inner cell mass** attached to it. The trophoblast attaches to the **endometrium**; the uterine cells divide rapidly and cover the blastocyst, which becomes embedded: **implantation**, leading to pregnancy.`,
      [kt('Capacitation', 'Changes in the female tract that make sperms able to fertilise.'), kt('Acrosomal reaction', 'Release of acrosomal enzymes that let the sperm penetrate the ovum’s coverings.'), kt('Morula', 'Embryo with 8–16 blastomeres.'), kt('Blastocyst', 'Embryo with an outer trophoblast, a cavity and an inner cell mass.'), kt('Implantation', 'Embedding of the blastocyst in the endometrium.')],
      V.journey,
      [5],
      [V.blast],
    ),
    sec(
      '6. Placenta, embryonic development, parturition and lactation',
      `**Placenta.** After implantation, finger-like projections of the trophoblast, the **chorionic villi**, appear, surrounded by uterine tissue and maternal blood. The chorionic villi and uterine tissue become interdigitated to form the **placenta**, a structural and functional unit between the developing embryo (foetus) and the mother, connected to the embryo by the **umbilical cord**.
- **Functions:** supplies **oxygen and nutrients**; removes **carbon dioxide and excretory wastes**; acts as an **endocrine** tissue producing **human chorionic gonadotropin (hCG)**, **human placental lactogen (hPL)**, **estrogens** and **progestogens**; in later pregnancy **relaxin** is secreted by the ovary. hCG, hPL and relaxin are produced only during pregnancy; levels of estrogens, progestogens, prolactin, cortisol and thyroxine also rise.

**Development.** Immediately after implantation, the **inner cell mass** differentiates into **ectoderm, mesoderm and endoderm**, which give rise to all tissues and organs. The inner cell mass contains **stem cells** that can give rise to all tissues. Human pregnancy lasts about **9 months**.
- After **one month**: the **heart** forms (first heartbeat can be heard with a stethoscope).
- End of the **second month**: **limbs and digits** develop.
- End of **12 weeks** (first trimester): most **major organ systems** are formed; limbs and external genital organs are well developed.
- **Fifth month**: **first movements** of the foetus and appearance of hair on the head.
- End of **24 weeks** (second trimester): body covered with fine hair, **eyelids separate**, eyelashes form.
- End of **9 months**: the foetus is fully developed and ready for delivery.

**Parturition** (delivery) is induced by a complex **neuroendocrine** mechanism. Signals from the fully developed foetus and the placenta induce mild uterine contractions, the **foetal ejection reflex**, which triggers release of **oxytocin** from the maternal pituitary. Oxytocin causes stronger uterine contractions, which stimulate further oxytocin secretion (**positive feedback**); this continues until the baby is expelled through the birth canal, followed soon by the placenta.

**Lactation.** The mammary glands differentiate during pregnancy and start producing milk towards the end of pregnancy. The milk produced during the first few days of lactation is **colostrum**, which contains several **antibodies (IgA)** essential for developing **resistance** in the newborn. Breast-feeding during the initial period of infant growth is recommended by doctors for bringing up a healthy baby.`,
      [kt('Chorionic villi', 'Finger-like trophoblast projections that form the placenta with uterine tissue.'), kt('hCG', 'Human chorionic gonadotropin, a placental hormone of pregnancy.'), kt('Foetal ejection reflex', 'Mild uterine contractions triggered by signals from the foetus and placenta that start parturition.'), kt('Colostrum', 'First milk, rich in IgA antibodies.')],
      table(['Time', 'Milestone'], [['1 month', 'Heart forms'], ['2 months', 'Limbs and digits'], ['12 weeks', 'Major organ systems'], ['5 months', 'First movements; hair on head'], ['24 weeks', 'Eyelids separate; eyelashes'], ['9 months', 'Ready for delivery']], 'Table of developmental milestones'),
      [6, 7],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying the testes are in the abdomen (they are in the scrotum, 2–2.5 °C cooler).
- Confusing spermiogenesis (spermatids → sperms) with spermiation (release of sperms).
- Saying a mature ovum is released at ovulation (a secondary oocyte is released; meiosis II is completed after sperm entry).
- Saying FSH causes ovulation (the LH surge does).
- Saying the mother determines the sex of the child (the sperm does).
- Saying oxytocin acts by negative feedback in parturition (it is positive feedback).

**How marks are usually awarded**
- 1-mark subparts: a hormone, a cell, a site, a time, a reason in one sentence.
- 2–3-mark questions: labelled diagrams; flow charts of gametogenesis; phases of the cycle; placental functions.
- 5-mark questions in parts: male or female system with diagram; spermatogenesis vs oogenesis; menstrual cycle with hormones; fertilisation to implantation; parturition and lactation.
- Diagrams: neat pencil schematics with horizontal label lines.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Why are the testes in the scrotum?', 'To keep them 2–2.5 °C below body temperature for spermatogenesis.', 'concept', 1),
    fc(2, 'Lobules and tubules per testis?', 'About 250 lobules, each with 1–3 seminiferous tubules.', 'fact', 1),
    fc(3, 'Function of Sertoli cells?', 'Nourish the developing germ cells.', 'concept', 1),
    fc(4, 'What do Leydig cells secrete?', 'Androgens (testosterone).', 'fact', 1),
    fc(5, 'Order of male ducts?', 'Rete testis, vasa efferentia, epididymis, vas deferens, ejaculatory duct, urethra.', 'concept', 1),
    fc(6, 'Seminal vesicle secretion?', 'Fluid rich in fructose, calcium and enzymes.', 'fact', 1),
    fc(7, 'Parts of the oviduct?', 'Infundibulum with fimbriae, ampulla, isthmus.', 'fact', 2),
    fc(8, 'Layers of the uterine wall?', 'Perimetrium, myometrium, endometrium.', 'fact', 2),
    fc(9, 'Where does fertilisation usually occur?', 'In the ampulla of the oviduct.', 'fact', 2),
    fc(10, 'Milk path in the mammary gland?', 'Alveoli → mammary tubules → duct → ampulla → lactiferous duct.', 'concept', 2),
    fc(11, 'Spermatogenesis: products of one primary spermatocyte?', 'Two secondary spermatocytes, four spermatids, four sperms.', 'concept', 3),
    fc(12, 'Spermiogenesis vs spermiation?', 'Spermatids → sperms vs release of sperms from tubules.', 'exam-tip', 3),
    fc(13, 'Role of LH in males?', 'Stimulates Leydig cells to secrete androgens.', 'concept', 3),
    fc(14, 'Role of FSH in males?', 'Acts on Sertoli cells, aiding spermiogenesis.', 'concept', 3),
    fc(15, 'Function of the acrosome?', 'Contains enzymes that help the sperm penetrate the ovum.', 'concept', 3),
    fc(16, 'Normal fertility semen criteria?', 'At least 60% normal shape, 40% vigorous motility.', 'fact', 3),
    fc(17, 'When does oogenesis begin?', 'During embryonic (foetal) development.', 'fact', 3),
    fc(18, 'Follicles left at puberty?', '60,000–80,000 in each ovary.', 'fact', 3),
    fc(19, 'What is released at ovulation?', 'A secondary oocyte.', 'exam-tip', 3),
    fc(20, 'When is meiosis II completed in the oocyte?', 'After a sperm enters.', 'concept', 3),
    fc(21, 'Menarche and menopause?', 'First menstruation; cessation of cycles near 50 years.', 'definition', 4),
    fc(22, 'What causes ovulation?', 'The mid-cycle LH surge.', 'concept', 4),
    fc(23, 'Hormone of the corpus luteum?', 'Progesterone.', 'fact', 4),
    fc(24, 'Oestrous cycle animals?', 'Non-primates: cows, sheep, rats, deer, dogs, tigers.', 'fact', 4),
    fc(25, 'Events of fertilisation in order?', 'Capacitation, acrosomal reaction, block to polyspermy, meiosis II, fusion of nuclei.', 'concept', 5),
    fc(26, 'Who decides the sex of the baby?', 'The father: X or Y sperm.', 'concept', 5),
    fc(27, 'What is a morula?', 'Embryo of 8–16 blastomeres.', 'definition', 5),
    fc(28, 'Parts of a blastocyst?', 'Trophoblast, blastocoel, inner cell mass.', 'fact', 5),
    fc(29, 'Placental hormones?', 'hCG, hPL, estrogens, progestogens (relaxin from ovary later).', 'fact', 6),
    fc(30, 'When does the heart form?', 'After about one month.', 'fact', 6),
    fc(31, 'When are first foetal movements felt?', 'During the fifth month.', 'fact', 6),
    fc(32, 'Foetal ejection reflex?', 'Mild contractions that trigger oxytocin release from the mother’s pituitary.', 'concept', 7),
    fc(33, 'Why is colostrum important?', 'Its IgA antibodies give the newborn passive immunity.', 'concept', 7),
  ],
  status: 'draft',
  provenance: PROV,
};
