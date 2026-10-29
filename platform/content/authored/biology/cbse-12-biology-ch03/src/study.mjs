// ch03 notes and flashcards.
import { T, table, flow, unit, PROV } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Reproductive Health — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Reproductive health and the programmes for it',
      `**Reproductive health** (WHO): total well-being in all aspects of reproduction — **physical, emotional, behavioural and social**. A reproductively healthy society has people with physically and functionally normal reproductive organs and normal emotional and behavioural interactions in all sex-related aspects.

**India:** among the first countries to start national **family planning** (1951); now **Reproductive and Child Health Care (RCH)** programmes. Actions:
- awareness through audio-visual and print media; **sex education in schools** to give correct information and dispel myths;
- training and counselling on family planning, care of pregnant mothers, post-natal care, breastfeeding, equal opportunities for boys and girls;
- a **statutory ban on amniocentesis for sex determination**, to prevent female foeticide; mass child immunisation;
- research on new, safer contraceptives and better medical facilities.

**Signs of improvement:** better awareness, more medically assisted deliveries and better post-natal care (so lower **maternal** and **infant mortality rates**), more couples with small families, and better detection and cure of STIs.`,
      [kt('Reproductive health', 'Total well-being in all aspects of reproduction: physical, emotional, behavioural and social.'), kt('RCH programmes', 'Reproductive and Child Health Care programmes of India covering wide reproduction-related areas.')],
      table(['Indicator', 'Improves when'], [['Maternal mortality rate', 'Deliveries are medically assisted'], ['Infant mortality rate', 'Post-natal care and immunisation improve'], ['STI burden', 'Infections are detected and cured early']], 'Table of reproductive health indicators and what improves them'),
      [1],
    ),
    sec(
      '2. Sexually transmitted infections',
      `**STIs** (venereal diseases, reproductive tract infections): gonorrhoea, syphilis, genital herpes, chlamydiasis, genital warts, trichomoniasis, hepatitis-B and HIV infection (leading to AIDS).

- **Hepatitis-B and HIV** also spread by sharing injection needles or surgical instruments with infected persons, by transfusion of infected blood, and from an infected mother to the foetus. They do not spread by casual contact.
- **Curability:** except **hepatitis-B, genital herpes and HIV**, the others are completely curable if detected early and treated properly.
- **Early symptoms** are minor (itching, fluid discharge, slight pain, swellings in the genital region) and may be absent, especially in women; social stigma delays treatment.
- **Complications** of untreated STIs: pelvic inflammatory disease, abortions, stillbirths, ectopic pregnancies, infertility, cancer of the reproductive tract.
- Incidence is high in the **15–24** age group.

**Prevention:** avoid sex with unknown partners or multiple partners; always use **condoms** during intercourse; in case of doubt, consult a **qualified doctor** early for diagnosis and complete treatment.`,
      [kt('STI', 'Infection transmitted through sexual intercourse.'), kt('Pelvic inflammatory disease', 'Inflammation of the female reproductive organs, a complication of untreated STIs.')],
      flow('LR', [['i', 'Infected person'], ['s', 'Sexual contact'], ['b', 'Shared needles, infected blood'], ['m', 'Mother to foetus'], ['o', 'New infection']], [['i', 's'], ['i', 'b'], ['i', 'm'], ['s', 'o'], ['b', 'o'], ['m', 'o']], 'Flow of STI transmission routes'),
      [1],
    ),
    sec(
      '3. Population growth and natural and barrier methods',
      `India's population: about **350 million** (1947), **1 billion** (2000), about **1.2 billion** (2011 census). Causes: rapid decline in **death rate, maternal mortality rate (MMR) and infant mortality rate (IMR)**, and more people of reproductive age. At a steady 2 percent a year a population doubles in about 35 years.

**Measures:** motivate smaller families; legal minimum marriageable age of **18 years for females and 21 for males**; incentives for small families; contraceptives.

**Ideal contraceptive:** user-friendly, easily available, effective, reversible, with no or least side effects, not interfering with sexual drive or the sexual act.

**Natural methods:**
- **Periodic abstinence:** avoid coitus from **day 10 to day 17** of the cycle, when ovulation is expected.
- **Withdrawal (coitus interruptus).**
- **Lactational amenorrhea:** no ovulation or menstruation during intense full breastfeeding; effective only up to about **six months** after parturition.

**Barrier methods:** **condoms** (male and female; latex; disposable; also protect against STIs and AIDS), **diaphragms, cervical caps and vaults** (rubber, over the cervix, reusable), with **spermicidal** creams, jellies and foams.`,
      [kt('Periodic abstinence', 'Avoiding coitus from day 10 to day 17 of the menstrual cycle, when ovulation is expected.'), kt('Lactational amenorrhea', 'Absence of menstruation during intense breastfeeding after delivery; a natural method for up to about six months.')],
      V.calendar,
      [2],
      [V.growth],
    ),
    sec(
      '4. IUDs, hormonal and surgical methods',
      `**Intrauterine devices (IUDs),** inserted by doctors or expert nurses through the vagina into the uterus:
| Type | Examples | Action |
|---|---|---|
| Non-medicated | Lippes loop | Increase phagocytosis of sperms in the uterus |
| Copper-releasing | CuT, Cu7, Multiload 375 | Copper ions suppress sperm motility and fertilising capacity |
| Hormone-releasing | Progestasert, LNG-20 | Make the uterus unsuitable for implantation and the cervix hostile to sperms |

IUDs suit females who want to **delay** pregnancy or **space** children; they are among the most widely accepted methods in India.

**Oral pills:** progestogens or progestogen–estrogen combinations; daily for **21 days**, starting preferably within the first five days of the cycle, then a **7-day gap**; they **inhibit ovulation and implantation** and change the quality of cervical mucus to retard sperms. **Saheli:** once a week, non-steroidal, developed at CDRI, Lucknow.

**Injections or implants** under the skin: same hormones; effective for much longer. **Emergency contraceptives:** progestogens or progestogen–estrogen combinations, or IUDs, within **72 hours** of coitus (useful after assault or a casual unprotected act).

**Sterilisation (terminal method):** **vasectomy** (a small part of the vas deferens removed or tied through a small incision on the scrotum); **tubectomy** (a small part of the fallopian tube removed or tied through a small incision in the abdomen or through the vagina). Highly effective, but **reversibility is very poor**.

**Side effects** (nausea, abdominal pain, breakthrough bleeding, irregular bleeding, rarely breast cancer) are not very common but should not be ignored.`,
      [kt('IUD', 'Intrauterine device placed in the uterus to prevent pregnancy.'), kt('Vasectomy', 'Sterilisation in males by removing or tying a part of the vas deferens.'), kt('Tubectomy', 'Sterilisation in females by removing or tying a part of the fallopian tube.')],
      V.iud,
      [2],
      [V.steril],
    ),
    sec(
      '5. Medical termination of pregnancy (MTP)',
      `**MTP** is intentional or voluntary termination of pregnancy before full term. India **legalised MTP in 1971** with strict conditions, to check unsafe, illegal abortions and the resulting deaths and illness of mothers.

- Permitted on specific grounds (for example, risk to the mother's life or health, serious foetal abnormality, or contraceptive failure), only by **registered medical practitioners** and within the time limits set by law.
- **Safest during the first trimester** (up to 12 weeks); second-trimester terminations are much riskier.
- MTP is **not** a contraceptive method.
- **Misuse:** illegal female foeticide after illegal sex determination; unsafe MTPs by unqualified quacks can be fatal. Both are illegal.`,
      [kt('MTP', 'Intentional or voluntary termination of pregnancy before full term, carried out legally by registered medical practitioners.')],
      table(['Point', 'Detail'], [['Legalised in India', '1971, with strict conditions'], ['Safest period', 'First trimester (up to 12 weeks)'], ['Never for', 'Sex selection; it is not a contraceptive']], 'Table of key points about MTP'),
      [2],
    ),
    sec(
      '6. Amniocentesis, infertility and assisted reproductive technologies',
      `**Amniocentesis:** a sample of **amniotic fluid** (with foetal cells) is taken to test for **genetic disorders** and **chromosomal abnormalities**. Its misuse to determine the sex of the foetus led to female foeticide, so there is a **statutory ban** on prenatal sex determination.

**Infertility:** inability to produce children despite unprotected sexual cohabitation; causes may be **physical, congenital, diseases, drugs, immunological or psychological**, in **either partner**.

**Assisted reproductive technologies (ART):**
| Technique | What is done |
|---|---|
| IVF–ET ("test tube baby") | Ova and sperms (from the couple or donors) fuse in the laboratory; the zygote or embryo is transferred |
| ZIFT | Zygote or early embryo with **up to 8 blastomeres** into the **fallopian tube** |
| IUT | Embryo with **more than 8 blastomeres** into the **uterus** |
| GIFT | **Ovum from a donor** into the fallopian tube of a woman who cannot produce ova but can provide a suitable environment |
| ICSI | A **sperm injected directly into the ovum** in the laboratory |
| AI / IUI | Semen from the husband or a donor introduced into the vagina or the **uterus**; for inability to inseminate or very low sperm count |

Embryos formed by fertilisation inside the female can also be transferred to assist women who cannot conceive. ART needs specialised professionals and costly equipment and is available in few centres; emotional, religious and social factors also play a part. **Legal adoption** of orphaned and destitute children is one of the best options for couples wanting parenthood.`,
      [kt('Amniocentesis', 'Test of amniotic fluid for genetic and chromosomal disorders of the foetus.'), kt('ZIFT', 'Zygote intra fallopian transfer: zygote or embryo with up to 8 blastomeres placed in the fallopian tube.'), kt('GIFT', 'Gamete intra fallopian transfer: a donor ovum placed in the fallopian tube of a woman who cannot produce ova.'), kt('ICSI', 'Intra cytoplasmic sperm injection: a sperm injected directly into the ovum.')],
      V.amnio,
      [3],
      [flow('LR', [['e', 'Embryo ready for transfer'], ['z', 'Up to 8 blastomeres: ZIFT, fallopian tube'], ['u', 'More than 8 blastomeres: IUT, uterus']], [['e', 'z'], ['e', 'u']], 'Flow showing the 8-blastomere rule for choosing ZIFT or IUT')],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Calling MTP a contraceptive method, or omitting the ban on sex determination.
- Listing hepatitis-B or HIV as completely curable.
- Saying copper IUDs act by releasing hormones (copper ions suppress sperm motility).
- Writing that sterilisation is easily reversible.
- Swapping ZIFT and IUT (the 8-blastomere rule) or GIFT and ICSI.
- Blaming only the woman for infertility.

**How marks are usually awarded**
- 1-mark items: correct option, term, example or full form.
- 2–3-mark answers: method or term (1) + how it works (1) + example, advantage or limitation (1).
- 5-mark answers: classification of contraceptives with examples and actions, or ART techniques with conditions for use, plus one evaluative point.
- Case-based items: two 1-mark parts from the passage and a 2-mark part with an internal choice, often a counselling or data-reading situation.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Define reproductive health (WHO).', 'Total well-being in all aspects of reproduction: physical, emotional, behavioural and social.', 'definition', 1),
    fc(2, 'When did India start national family planning?', '1951; now part of the RCH programmes.', 'fact', 1),
    fc(3, 'Two signs of improved reproductive health?', 'More medically assisted deliveries and lower maternal and infant mortality (also early detection and cure of STIs).', 'concept', 1),
    fc(4, 'Which STIs are not completely curable?', 'Genital herpes, hepatitis-B and HIV.', 'fact', 1),
    fc(5, 'How else do hepatitis-B and HIV spread?', 'Shared needles or surgical instruments, infected blood transfusion, infected mother to foetus.', 'fact', 1),
    fc(6, 'Complications of untreated STIs?', 'PID, abortions, stillbirths, ectopic pregnancy, infertility, reproductive tract cancer.', 'concept', 1),
    fc(7, 'Three ways to prevent STIs?', 'Avoid unknown or multiple partners; always use condoms; consult a qualified doctor early.', 'concept', 1),
    fc(8, 'Age group with high STI incidence?', '15–24 years.', 'fact', 1),
    fc(9, 'Reasons for India’s rapid population growth?', 'Fall in death rate, MMR and IMR; more people of reproductive age.', 'concept', 2),
    fc(10, 'Legal minimum marriageable age in India?', '18 years for females, 21 for males.', 'fact', 2),
    fc(11, 'Properties of an ideal contraceptive?', 'User-friendly, available, effective, reversible, few side effects, not interfering with sexual drive.', 'concept', 2),
    fc(12, 'Periodic abstinence: which days?', 'Days 10–17 of the cycle.', 'fact', 2),
    fc(13, 'Lactational amenorrhea is reliable for how long?', 'Up to about six months after parturition, with intense full breastfeeding.', 'fact', 2),
    fc(14, 'Which contraceptive also protects against STIs?', 'The condom.', 'exam-tip', 2),
    fc(15, 'Female barrier methods?', 'Diaphragms, cervical caps and vaults (reusable).', 'example', 2),
    fc(16, 'Three types of IUD with examples?', 'Non-medicated (Lippes loop); copper (CuT, Cu7, Multiload 375); hormone (Progestasert, LNG-20).', 'example', 2),
    fc(17, 'How do copper IUDs work?', 'Copper ions suppress sperm motility and fertilising capacity.', 'concept', 2),
    fc(18, 'Oral pill schedule?', '21 days of pills, starting within the first 5 days of the cycle, then a 7-day gap.', 'fact', 2),
    fc(19, 'What is Saheli?', 'A once-a-week, non-steroidal oral contraceptive pill developed at CDRI, Lucknow.', 'fact', 2),
    fc(20, 'Emergency contraception must be used within…?', '72 hours of coitus.', 'fact', 2),
    fc(21, 'Vasectomy vs tubectomy?', 'Part of the vas deferens vs part of the fallopian tube removed or tied.', 'definition', 2),
    fc(22, 'Main drawback of sterilisation?', 'Reversibility is very poor.', 'concept', 2),
    fc(23, 'When was MTP legalised in India?', '1971, with strict conditions.', 'fact', 2),
    fc(24, 'When is MTP safest?', 'In the first trimester (up to 12 weeks).', 'fact', 2),
    fc(25, 'What is amniocentesis used for?', 'Testing foetal cells in amniotic fluid for genetic and chromosomal disorders.', 'definition', 3),
    fc(26, 'Why is amniocentesis for sex determination banned?', 'Its misuse led to female foeticide.', 'concept', 3),
    fc(27, 'Possible causes of infertility?', 'Physical, congenital, diseases, drugs, immunological or psychological; either partner.', 'concept', 3),
    fc(28, 'ZIFT vs IUT?', 'ZIFT: up to 8 blastomeres into the fallopian tube. IUT: more than 8 into the uterus.', 'exam-tip', 3),
    fc(29, 'What is GIFT?', 'Transfer of a donor ovum into the fallopian tube of a woman who cannot produce ova.', 'definition', 3),
    fc(30, 'What is ICSI?', 'Injection of a sperm directly into the ovum to form an embryo in the laboratory.', 'definition', 3),
    fc(31, 'When is artificial insemination (IUI) used?', 'When the male cannot inseminate or has a very low sperm count.', 'concept', 3),
    fc(32, 'Why is ART not widely available?', 'Needs specialised professionals and costly equipment; few centres.', 'concept', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
