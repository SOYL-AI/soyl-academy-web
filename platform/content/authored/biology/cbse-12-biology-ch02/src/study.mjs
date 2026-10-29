// ch02 notes and flashcards.
import { T, table, flow, unit, PROV } from '../../cbse-12-biology-ch01/src/lib.mjs';
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
      '1. Overview and the male reproductive system',
      `Humans reproduce sexually and are **viviparous**. Events: **gametogenesis → insemination → fertilisation → implantation → gestation → parturition**. Reproductive events begin at puberty; sperm formation continues into old age, while ovum formation stops at about 50 years.

**Testes:** a pair, in the **scrotum**, which keeps them about **2–2.5 °C below** body temperature, as needed for spermatogenesis. Each testis has about **250 testicular lobules**, each with **1–3 seminiferous tubules** lined by **spermatogonia** (male germ cells) and **Sertoli cells** (nourish germ cells). **Interstitial (Leydig) cells** outside the tubules secrete **androgens**; immunologically competent cells are also present there.

**Ducts:** seminiferous tubules → **rete testis** → **vasa efferentia** → **epididymis** → **vas deferens** → (joined by the duct of the seminal vesicle) **ejaculatory duct** → **urethra** → **urethral meatus**.

**Accessory glands:** paired **seminal vesicles**, a **prostate** and paired **bulbourethral glands**. Their secretions form **seminal plasma**, rich in **fructose, calcium and enzymes**; bulbourethral secretions also help lubricate the penis. **Semen** = sperms + seminal plasma.

**External genitalia:** the **penis**, with an enlarged tip, the glans penis, covered by the foreskin.`,
      [kt('Seminiferous tubule', 'Coiled tubule of the testis in which sperms are formed.'), kt('Leydig cells', 'Interstitial cells of the testis that secrete androgens.'), kt('Seminal plasma', 'Fluid from the accessory glands, rich in fructose, calcium and enzymes.')],
      V.male,
      [1],
    ),
    sec(
      '2. The female reproductive system and mammary glands',
      `**Ovaries:** primary female sex organs (about 2–4 cm long), producing the **ovum** and **ovarian hormones**; each is covered by a thin epithelium enclosing the **ovarian stroma**, with an outer **cortex** and inner **medulla**.

**Oviduct (fallopian tube),** about 10–12 cm: **infundibulum** (funnel near the ovary, with finger-like **fimbriae** that collect the ovum after ovulation) → **ampulla** (wider) → **isthmus** (narrow, joins the uterus).

**Uterus (womb):** single, inverted-pear shape, held by ligaments. Wall: **perimetrium** (outer membrane), **myometrium** (thick smooth muscle; strong contractions at delivery), **endometrium** (inner glandular layer; cyclical changes). The **cervix** opens into the **vagina**; the cervical canal and vagina form the **birth canal**.

**External genitalia:** mons pubis, labia majora, labia minora, hymen and clitoris. The hymen can be torn by many everyday activities, so its presence or absence is **not** a reliable indicator of anything.

**Mammary glands:** paired; glandular tissue and fat. Each has **15–20 mammary lobes** with clusters of **alveoli** that secrete milk. Milk path: alveoli → **mammary tubules** → **mammary duct** → **mammary ampulla** → **lactiferous duct**.`,
      [kt('Fimbriae', 'Finger-like projections of the infundibulum that help collect the ovum after ovulation.'), kt('Myometrium', 'Thick middle smooth-muscle layer of the uterus that contracts strongly during delivery.'), kt('Endometrium', 'Inner glandular lining of the uterus that changes in each menstrual cycle.')],
      V.female,
      [1],
    ),
    sec(
      '3. Spermatogenesis and the sperm',
      `Spermatogenesis begins at **puberty**. **Spermatogonia** (2n = 46) multiply by mitosis; some become **primary spermatocytes** (46), which complete **meiosis I** to form two **secondary spermatocytes** (23 each). **Meiosis II** gives four haploid **spermatids**, which are transformed into **spermatozoa** (**spermiogenesis**). Sperm heads stay embedded in Sertoli cells until they are released from the tubules (**spermiation**).

**Hormonal control:** at puberty the hypothalamus increases **GnRH** → anterior pituitary releases **LH** and **FSH**. **LH → Leydig cells** → androgens, which stimulate spermatogenesis. **FSH → Sertoli cells** → factors that help spermiogenesis.

**Sperm:** head (haploid **nucleus** and cap-like **acrosome** with enzymes for fertilisation), **neck**, **middle piece** (many **mitochondria** for energy) and **tail** (motility); covered by a plasma membrane. A human male ejaculates about **200–300 million** sperms; for normal fertility at least **60 percent** should have normal shape and size and at least **40 percent** vigorous motility.`,
      [kt('Spermiogenesis', 'Transformation of spermatids into sperms.'), kt('Spermiation', 'Release of sperms from the seminiferous tubules.'), kt('Acrosome', 'Cap on the sperm head filled with enzymes that help in fertilisation.')],
      V.tubule,
      [2],
      [V.sperm],
    ),
    sec(
      '4. Oogenesis and follicles',
      `Oogenesis starts during **embryonic development**: millions of **oogonia** form in each foetal ovary, and **none are added after birth**. They begin meiosis and stop at prophase I as **primary oocytes**, each surrounded by granulosa cells as a **primary follicle**. Many follicles degenerate from birth to puberty; about **60,000–80,000** remain in each ovary at puberty.

Primary follicle → **secondary follicle** (more granulosa layers + a new theca) → **tertiary follicle** (fluid-filled **antrum**; theca differentiates into theca interna and theca externa). In the tertiary follicle the primary oocyte completes meiosis I by an **unequal** division: a large haploid **secondary oocyte** and a tiny **first polar body**. The tertiary follicle matures into a **Graafian follicle**; the secondary oocyte forms a new membrane, the **zona pellucida**. The Graafian follicle ruptures to release the secondary oocyte (**ovulation**). Meiosis II is completed only after a sperm enters, giving the ovum and a second polar body.

| Feature | Spermatogenesis | Oogenesis |
|---|---|---|
| Starts | Puberty | Before birth |
| Output per meiocyte | 4 sperms | 1 ovum + polar bodies |
| Cytoplasm division | Equal | Unequal |
| Continues | Into old age | Until menopause (about 50 years) |`,
      [kt('Graafian follicle', 'Mature follicle that ruptures to release the secondary oocyte.'), kt('Polar body', 'Tiny cell formed by the unequal division of the oocyte; it degenerates.'), kt('Zona pellucida', 'Membrane around the secondary oocyte.')],
      V.ovary,
      [2],
    ),
    sec(
      '5. The menstrual cycle',
      `The reproductive cycle of female primates (monkeys, apes, humans) is the **menstrual cycle**. The first menstruation at puberty is **menarche**; cycles repeat about every **28/29 days** and cease at about 50 years (**menopause**). Usually one ovum is released in the middle of each cycle.

| Phase | Days (28-day) | Events | Hormones |
|---|---|---|---|
| Menstrual | 3–5 days | Endometrium and blood vessels break down and flow out | Progesterone has fallen |
| Follicular (proliferative) | to about day 13 | Primary follicles grow into a Graafian follicle; endometrium regenerates | LH, FSH rise; estrogen from follicles |
| Ovulation | about day 14 | Graafian follicle ruptures | **LH surge** (peak of LH and FSH) |
| Luteal (secretory) | 15–28 | Ruptured follicle → **corpus luteum**; endometrium maintained | **Progesterone** high |

If there is **no fertilisation**, the corpus luteum degenerates, progesterone falls and menstruation follows. If **fertilisation** occurs, the corpus luteum is maintained and menstruation does not occur. Lack of menstruation may indicate pregnancy, but it can also be caused by stress or poor health. Menstrual hygiene matters: use clean sanitary products, change them regularly and dispose of them properly.`,
      [kt('Menarche', 'The first menstruation, at puberty.'), kt('Menopause', 'The end of menstrual cycles, at about 50 years.'), kt('Corpus luteum', 'Structure formed from the ruptured Graafian follicle; secretes progesterone.')],
      V.cycle,
      [3],
    ),
    sec(
      '6. Fertilisation, cleavage and implantation',
      `During insemination, sperms are released into the vagina; motile sperms pass through the cervix and uterus to the oviduct. **Fertilisation** occurs in the **ampullary region** of the oviduct, only if the ovum and sperms reach it together. A sperm's contact with the **zona pellucida** changes the membrane and **blocks other sperms**. Sperm entry makes the secondary oocyte complete **meiosis II** (ovum + second polar body); the haploid nuclei fuse to form a diploid **zygote**.

**Sex determination:** woman XX, man XY; all ova carry X; half the sperms carry X and half Y. X-sperm → **female (XX)**; Y-sperm → **male (XY)**. The sex of the baby is decided by the **father's sperm**.

**Cleavage:** mitotic divisions as the zygote moves through the isthmus → 2, 4, 8, 16 **blastomeres**; 8–16 blastomeres = **morula** → **blastocyst** (outer **trophoblast**, inner cell mass). The trophoblast attaches to the **endometrium**; uterine cells cover the blastocyst: **implantation**. The **inner cell mass** forms the **embryo**.`,
      [kt('Morula', 'Embryo with 8 to 16 blastomeres.'), kt('Trophoblast', 'Outer layer of the blastocyst that attaches to the endometrium.'), kt('Implantation', 'Embedding of the blastocyst in the endometrium.')],
      V.journey,
      [4],
      [V.blastocyst],
    ),
    sec(
      '7. Pregnancy, placenta, parturition and lactation',
      `**Placenta:** chorionic villi from the trophoblast interdigitate with uterine tissue. It supplies **oxygen and nutrients**, removes **carbon dioxide and wastes**, and is connected to the embryo by the **umbilical cord**. It is also an endocrine tissue making **hCG, hPL, estrogens and progestogens**. Late in pregnancy the **ovary** secretes **relaxin**. Estrogens, progestogens, cortisol, prolactin and thyroxine rise in the mother's blood.

**Germ layers:** the inner cell mass forms **ectoderm, mesoderm and endoderm**, which give rise to all adult tissues and organs. Inner cell mass cells are **stem cells**.

**Development (about 9 months):** heart by the end of month 1; limbs and digits by the end of month 2; most major organ systems by 12 weeks; first movements and head hair in month 5; fine body hair, separated eyelids and eyelashes by 24 weeks; fully developed by 9 months.

**Parturition:** signals from the fully developed foetus and placenta → mild uterine contractions (**foetal ejection reflex**) → **oxytocin** from the maternal pituitary → stronger contractions → more oxytocin (**positive feedback**) → baby, then placenta, expelled.

**Lactation:** mammary glands produce milk towards the end of pregnancy. **Colostrum**, the milk of the first few days, contains antibodies such as **IgA**, which protect the newborn; breastfeeding is recommended for healthy growth.`,
      [kt('Placenta', 'Structural and functional link between embryo and mother formed by chorionic villi and uterine tissue.'), kt('Foetal ejection reflex', 'Mild uterine contractions triggered by signals from the mature foetus and placenta that start parturition.'), kt('Colostrum', 'First milk after birth, rich in antibodies.')],
      table(['Placental hormone', 'Made only in pregnancy?'], [['hCG', 'Yes'], ['hPL', 'Yes'], ['Estrogens', 'No (also ovary)'], ['Progestogens', 'No (also ovary)']], 'Table of placental hormones and whether each is made only during pregnancy'),
      [5],
      [flow('LR', [['s', 'Signals from foetus and placenta'], ['c', 'Uterine contractions'], ['o', 'Oxytocin']], [['s', 'c'], ['c', 'o'], ['o', 'c', 'stronger']], 'Positive feedback loop between uterine contractions and oxytocin')],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing that fertilisation occurs in the uterus (it occurs in the ampulla of the oviduct).
- Saying the mature ovum is released at ovulation (it is the **secondary oocyte**).
- Giving 46 chromosomes for a secondary spermatocyte (it has 23).
- Saying oogenesis begins at puberty (it begins before birth).
- Listing relaxin as a placental hormone (here it is secreted by the ovary in late pregnancy).
- Saying the mother determines the sex of the child.

**How marks are usually awarded**
- 1-mark items: term, location, chromosome number or hormone.
- 2–3-mark answers: correct sequence or structure (1) + function or reason (1) + example, number or labelled sketch (1).
- 5-mark answers: labelled diagram (male or female system, seminiferous tubule, sperm, ovary, blastocyst) (2) + process in order (2) + one significance point (1).
- Case-based items: two 1-mark parts and a 2-mark part with an internal choice, often reading a cycle chart or a set of numbers.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Why are the testes in the scrotum?', 'Spermatogenesis needs a temperature about 2–2.5 °C below body temperature.', 'concept', 1),
    fc(2, 'Lobules and tubules in a testis?', 'About 250 lobules, each with 1–3 seminiferous tubules.', 'fact', 1),
    fc(3, 'Role of Leydig cells?', 'Secrete androgens (mainly testosterone).', 'fact', 1),
    fc(4, 'Male duct sequence?', 'Rete testis → vasa efferentia → epididymis → vas deferens → ejaculatory duct → urethra → urethral meatus.', 'diagram', 1),
    fc(5, 'Male accessory glands?', 'Paired seminal vesicles, prostate, paired bulbourethral glands.', 'fact', 1),
    fc(6, 'Seminal plasma is rich in…?', 'Fructose, calcium and certain enzymes.', 'fact', 1),
    fc(7, 'Three parts of the oviduct?', 'Infundibulum (with fimbriae), ampulla, isthmus.', 'diagram', 1),
    fc(8, 'Three layers of the uterine wall?', 'Perimetrium, myometrium, endometrium.', 'diagram', 1),
    fc(9, 'What is the birth canal?', 'The cervical canal together with the vagina.', 'definition', 1),
    fc(10, 'Path of milk in the mammary gland?', 'Alveoli → mammary tubules → mammary duct → mammary ampulla → lactiferous duct.', 'diagram', 1),
    fc(11, 'Chromosomes: primary vs secondary spermatocyte?', '46 and 23.', 'fact', 2),
    fc(12, 'Spermiogenesis vs spermiation?', 'Spermatids → sperms; release of sperms from the tubules.', 'definition', 2),
    fc(13, 'LH and FSH in males?', 'LH → Leydig cells (androgens); FSH → Sertoli cells (spermiogenesis factors).', 'concept', 2),
    fc(14, 'Parts of a sperm?', 'Head (nucleus, acrosome), neck, middle piece (mitochondria), tail.', 'diagram', 2),
    fc(15, 'Normal fertility criteria for semen?', 'At least 60% normal shape and size; at least 40% vigorous motility.', 'fact', 2),
    fc(16, 'When does oogenesis begin?', 'During embryonic (foetal) development; no oogonia are added after birth.', 'fact', 2),
    fc(17, 'Primary follicles per ovary at puberty?', 'About 60,000–80,000.', 'fact', 2),
    fc(18, 'What is released at ovulation?', 'The secondary oocyte (from the Graafian follicle).', 'exam-tip', 2),
    fc(19, 'Why is the meiotic division of the oocyte unequal?', 'The oocyte keeps most of the nutrient-rich cytoplasm; the polar body gets little.', 'concept', 2),
    fc(20, 'Menarche and menopause?', 'First menstruation at puberty; end of cycles at about 50 years.', 'definition', 3),
    fc(21, 'What causes ovulation?', 'The mid-cycle LH surge.', 'concept', 3),
    fc(22, 'Source and role of progesterone in the cycle?', 'Corpus luteum; maintains the endometrium for implantation.', 'concept', 3),
    fc(23, 'Why does menstruation stop in pregnancy?', 'The corpus luteum is maintained, so progesterone stays high.', 'concept', 3),
    fc(24, 'Where does fertilisation occur?', 'Ampullary region of the oviduct.', 'fact', 4),
    fc(25, 'Who decides the sex of the baby?', 'The father: an X-sperm gives a girl (XX), a Y-sperm a boy (XY).', 'concept', 4),
    fc(26, 'What is a morula?', 'Embryo with 8–16 blastomeres.', 'definition', 4),
    fc(27, 'Fate of trophoblast and inner cell mass?', 'Trophoblast attaches to the uterus (and forms villi); inner cell mass forms the embryo.', 'concept', 4),
    fc(28, 'Hormones made by the placenta?', 'hCG, hPL, estrogens, progestogens.', 'fact', 5),
    fc(29, 'Three germ layers?', 'Ectoderm, mesoderm, endoderm.', 'fact', 5),
    fc(30, 'Foetal development by 12 weeks?', 'Most major organ systems formed; limbs and external genital organs well developed.', 'fact', 5),
    fc(31, 'What is the foetal ejection reflex?', 'Mild uterine contractions triggered by the mature foetus and placenta, leading to oxytocin release.', 'definition', 5),
    fc(32, 'Why is colostrum important?', 'It contains antibodies (such as IgA) that protect the newborn.', 'concept', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
