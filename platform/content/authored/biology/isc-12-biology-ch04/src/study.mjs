// ISC 12 Biology ch04 notes and flashcards.
import { T, table, unit, PROV } from '../../isc-12-biology-ch01/src/lib.mjs';
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
      '1. Reproductive health, programmes and population',
      `**Reproductive health** (WHO): a total well-being in all aspects of reproduction — **physical, emotional, behavioural and social**. A reproductively healthy society has people with physically and functionally normal reproductive organs and normal emotional and behavioural interactions in all sex-related aspects.

**Programmes.** India initiated **family planning** in **1951**; improved programmes now cover wider areas under **Reproductive and Child Health Care (RCH)**. Actions include: creating awareness through audio-visual and print media; **sex education** in schools to provide right information and discourage myths and misconceptions; educating people about birth control, care of pregnant mothers, post-natal care, breast-feeding, equal opportunities for male and female children; medical facilities for pregnancy, delivery, STDs, abortions, contraception, menstrual problems and infertility; the statutory **ban on amniocentesis for sex determination** to check female foeticide; and **mass child immunisation**. Better care has reduced **maternal and infant mortality** and increased medically assisted deliveries.

**Population explosion.** India’s population was about **350 million** at independence, close to **1 billion** in 2000 and about **1.2 billion** in 2011. Causes: rapid decline in the **death rate**, **maternal mortality rate (MMR)** and **infant mortality rate (IMR)**, and an increase in the number of people in the reproducible age. The growth rate in 2011 was below 2 percent (about 20 per 1000 per year), which still increases the population quickly. Consequences: scarcity of basic requirements such as food, shelter and clothing.

**Government measures:** motivating smaller families through contraception (slogan **“Hum Do Hamare Do”**; many couples adopt a one-child norm); raising the **marriageable age** to **18 years for females** and **21 years for males**; **incentives** to couples with small families.`,
      [kt('Reproductive health', 'Total well-being in physical, emotional, behavioural and social aspects of reproduction.'), kt('RCH', 'Reproductive and Child Health Care programmes.'), kt('MMR and IMR', 'Maternal and infant mortality rates.')],
      V.growth,
      [1],
    ),
    sec(
      '2. Methods of contraception',
      `An **ideal contraceptive** is user-friendly, easily available, effective and reversible, with no or least side-effects, and does not interfere with sexual drive, desire or the sexual act.

**Natural methods** (avoid chances of ovum and sperm meeting):
- **Periodic abstinence:** avoid coitus from **day 10 to 17** of the menstrual cycle, when ovulation is expected.
- **Withdrawal (coitus interruptus):** the male withdraws before ejaculation, avoiding insemination.
- **Lactational amenorrhea:** absence of menstruation and ovulation during intense lactation after parturition; effective only up to about **six months**.
These have no side-effects but high failure rates.

**Barrier methods** (prevent ovum and sperm from meeting): **condoms** (male and female; disposable; also protect against **STDs and AIDS**); **diaphragms, cervical caps and vaults** (rubber barriers inserted to cover the cervix; reusable). **Spermicidal** creams, jellies and foams are used with them to increase efficiency.

**Intrauterine devices (IUDs)**, inserted by doctors or trained nurses into the uterus through the vagina:
- **Non-medicated:** Lippes loop.
- **Copper-releasing:** CuT, Cu7, Multiload 375 — **copper ions** suppress **sperm motility** and fertilising capacity.
- **Hormone-releasing:** Progestasert, LNG-20 — make the uterus **unsuitable for implantation** and the cervix **hostile to sperms**.
IUDs increase **phagocytosis** of sperms within the uterus. They are ideal for females who want to **delay pregnancy** or **space children**; one of the most widely accepted methods in India.

**Hormonal methods** (pills, injections, implants of **progestogens** or **progestogen–estrogen** combinations): pills are taken daily for **21 days** starting within the first five days of the cycle, then after a gap of **7 days** repeated. They **inhibit ovulation and implantation** and alter the quality of **cervical mucus** to prevent or retard entry of sperms. **Saheli**, a new oral contraceptive for females, is a once-a-week, **non-steroidal** pill developed at the **Central Drug Research Institute (CDRI), Lucknow**. Injections and implants under the skin act in the same way but over a much longer period. Progestogens, combinations or IUDs used **within 72 hours** of coitus are effective as **emergency contraceptives**.

**Surgical methods (sterilisation)** — terminal methods that block gamete transport: **vasectomy** (a small part of the **vas deferens** removed or tied through a small incision on the scrotum) and **tubectomy** (a small part of the **fallopian tube** removed or tied through a small incision in the abdomen or through the vagina). Highly effective, but reversibility is very poor.

Possible side-effects of improper use include nausea, abdominal pain, breakthrough bleeding, irregular menstrual bleeding and even breast cancer, though these are not very significant.`,
      [kt('IUD', 'Intrauterine device placed in the uterus to prevent conception.'), kt('Lactational amenorrhea', 'Absence of menstruation and ovulation during intense breast-feeding after birth.'), kt('Saheli', 'A once-a-week non-steroidal oral contraceptive pill developed by CDRI, Lucknow.'), kt('Vasectomy', 'Sterilisation of the male by cutting and tying the vas deferens.'), kt('Tubectomy', 'Sterilisation of the female by cutting and tying the fallopian tube.')],
      V.iud,
      [2],
      [V.calendar, V.steril],
    ),
    sec(
      '3. MTP and amniocentesis',
      `**Medical termination of pregnancy (MTP)** is the intentional or voluntary termination of pregnancy before full term (induced abortion). Nearly 45 to 50 million MTPs are performed in a year all over the world. The Government of India legalised MTP in **1971**, with strict conditions to avoid its misuse, such as indiscriminate and illegal **female foeticide**, which is reported to be high in India.
- **Reasons:** to get rid of unwanted pregnancies due to casual unprotected intercourse or failure of contraception during coitus or rapes; and in cases where continuing the pregnancy could be **harmful or even fatal** to the mother or the foetus.
- MTPs are considered relatively **safe during the first trimester**. They must be performed by **registered medical practitioners** within the **time limits and conditions** laid down by law; MTP by unqualified quacks is unsafe and can be fatal. MTP is not a contraceptive.

**Amniocentesis** is a foetal sex-determination test based on the chromosomal pattern in the **amniotic fluid** surrounding the developing embryo. It can detect **genetic and chromosomal disorders** (for example Down’s syndrome) in the foetus, but its misuse to find the sex of the foetus led to female foeticide; its use for **sex determination is banned** by law in India.`,
      [kt('MTP', 'Medical termination of pregnancy: intentional termination of pregnancy before full term.'), kt('Amniocentesis', 'A test of foetal cells in amniotic fluid for chromosomal disorders.'), kt('Female foeticide', 'Abortion of a female foetus because of its sex; illegal in India.')],
      V.amnio,
      [3],
    ),
    sec(
      '4. Infertility and assisted reproductive technologies',
      `A large number of couples all over the world, including India, are **infertile**: unable to produce children in spite of unprotected sexual cohabitation. The reasons could be physical, congenital, diseases, drugs, immunological or even psychological. In India the female is often blamed, but the problem is quite often in the **male partner**. Specialised health-care units (**infertility clinics**) help in diagnosis and corrective treatment, and where correction is not possible, **assisted reproductive technologies (ART)** help.

- **In vitro fertilisation (IVF)** — fertilisation outside the body in almost similar conditions as in the body, followed by **embryo transfer (ET)**: popularly the **test-tube baby** programme. Ova from the wife or a donor and sperms from the husband or a donor are collected and induced to form a zygote under simulated conditions in the laboratory.
- **ZIFT (zygote intra-fallopian transfer):** the zygote or early embryo (**up to 8 blastomeres**) is transferred into the **fallopian tube**.
- **IUT (intra-uterine transfer):** an embryo with **more than 8 blastomeres** is transferred into the **uterus**.
- **GIFT (gamete intra-fallopian transfer):** transfer of an **ovum from a donor** into the fallopian tube of another female who cannot produce ova but can provide a suitable environment for fertilisation and development.
- **ICSI (intra-cytoplasmic sperm injection):** a sperm is directly injected into the ovum to form an embryo in the laboratory.
- **AI (artificial insemination) / IUI (intra-uterine insemination):** semen from the husband or a healthy donor is introduced into the vagina or into the uterus — useful when the male cannot inseminate or has a **very low sperm count**.
Embryos formed by in vivo fertilisation (in the female) can also be transferred for further development.

ART needs high precision, specialised professionals and expensive instruments, so it is available only in a few centres; emotional, religious and social factors are also deterrents. **Legal adoption** is one of the best methods for couples looking for parenthood.`,
      [kt('IVF', 'In vitro fertilisation followed by embryo transfer (test-tube baby).'), kt('ZIFT', 'Transfer of a zygote or early embryo (up to 8 blastomeres) into the fallopian tube.'), kt('IUT', 'Transfer of an embryo with more than 8 blastomeres into the uterus.'), kt('GIFT', 'Transfer of a donor ovum into the fallopian tube.'), kt('ICSI', 'Injection of a sperm directly into an ovum.'), kt('IUI', 'Intra-uterine insemination of semen from the husband or a donor.')],
      table(['Technique', 'Key feature'], [['IVF', 'Fertilisation in the laboratory'], ['ZIFT', 'Embryo up to 8 cells into fallopian tube'], ['IUT', 'Embryo over 8 cells into uterus'], ['GIFT', 'Donor ovum into fallopian tube'], ['ICSI', 'Sperm injected into ovum'], ['AI / IUI', 'Semen into vagina or uterus']], 'Table of assisted reproductive technologies'),
      [4],
    ),
    sec(
      '5. Sexually transmitted diseases',
      `Diseases or infections transmitted through **sexual intercourse** are **sexually transmitted diseases (STDs)**, also called venereal diseases (VD) or reproductive tract infections (RTI).

| Disease | Causative agent |
|---|---|
| Gonorrhoea | *Neisseria gonorrhoeae* (bacterium) |
| Syphilis | *Treponema pallidum* (bacterium) |
| Chlamydiasis | *Chlamydia trachomatis* (bacterium) |
| Trichomoniasis | *Trichomonas vaginalis* (protozoan) |
| Genital herpes | Herpes simplex virus |
| Genital warts | Human papillomavirus |
| Hepatitis B | Hepatitis B virus |
| AIDS | Human immunodeficiency virus (HIV) |

**Transmission:** mainly sexual; **hepatitis B and HIV** also by sharing injection needles and surgical instruments, transfusion of infected blood, or from an infected mother to the foetus.

**Curability:** except for **hepatitis B, genital herpes and HIV** infections, the others are completely curable if detected early and treated properly.

**Symptoms:** early symptoms are minor — **itching, fluid discharge, slight pain, swellings** in the genital region. Infected females may often be **asymptomatic**, so they may remain undetected for long; the social stigma attached also deters people from timely detection and treatment.

**Complications:** pelvic inflammatory diseases (**PID**), abortions, still births, **ectopic pregnancies**, **infertility** or even **cancer of the reproductive tract**. People in the **15–24 years** age group are most at risk.

**Prevention:** avoid sex with unknown partners or multiple partners; always try to use **condoms** during coitus; in case of doubt, go to a **qualified doctor** for early detection and complete treatment.`,
      [kt('STD', 'A disease transmitted through sexual intercourse; also VD or RTI.'), kt('PID', 'Pelvic inflammatory disease, a complication of untreated STDs.'), kt('Ectopic pregnancy', 'Implantation of the embryo outside the uterus, such as in the fallopian tube.')],
      table(['Not completely curable', 'Curable if treated early'], [['Hepatitis B, genital herpes, HIV', 'Gonorrhoea, syphilis, chlamydiasis, trichomoniasis, genital warts']], 'Table grouping STDs by curability'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Calling MTP a method of contraception.
- Mixing ZIFT (up to 8 blastomeres, fallopian tube) and IUT (more than 8, uterus).
- Writing GIFT as transfer of an embryo (it is transfer of a donor ovum).
- Saying copper IUDs act by inhibiting ovulation (they suppress sperm motility; pills inhibit ovulation).
- Listing syphilis as incurable (hepatitis B, genital herpes and HIV are not completely curable).
- Blaming only the female partner for infertility.

**How marks are usually awarded**
- 1-mark subparts: expansions (MTP, ZIFT, GIFT, IUT, ICSI, IUI), pathogens, examples of IUDs, a reason.
- 2–3-mark questions: modes of action of contraceptives; ART matching; STD symptoms and prevention; MTP conditions.
- 5-mark questions in parts: contraception methods; population and government measures; infertility and ART; STDs.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'WHO definition of reproductive health?', 'Total well-being in physical, emotional, behavioural and social aspects of reproduction.', 'definition', 1),
    fc(2, 'When did India start family planning?', '1951.', 'fact', 1),
    fc(3, 'What does RCH stand for?', 'Reproductive and Child Health Care.', 'fact', 1),
    fc(4, 'India’s population in 2011?', 'About 1.2 billion.', 'fact', 1),
    fc(5, 'Two causes of population explosion?', 'Decline in death rate, MMR and IMR; more people of reproducible age.', 'concept', 1),
    fc(6, 'Legal marriageable ages in India?', '18 for females, 21 for males.', 'fact', 1),
    fc(7, 'Fertile period in a 28-day cycle?', 'Days 10–17.', 'fact', 2),
    fc(8, 'Lactational amenorrhea is effective for how long?', 'Up to about six months after parturition.', 'fact', 2),
    fc(9, 'Which barrier also protects against STDs?', 'Condoms.', 'concept', 2),
    fc(10, 'Copper-releasing IUDs?', 'CuT, Cu7, Multiload 375.', 'fact', 2),
    fc(11, 'Hormone-releasing IUDs?', 'Progestasert, LNG-20.', 'fact', 2),
    fc(12, 'Non-medicated IUD?', 'Lippes loop.', 'fact', 2),
    fc(13, 'How do copper IUDs work?', 'Copper ions suppress sperm motility and fertilising capacity.', 'concept', 2),
    fc(14, 'How do oral pills work?', 'Inhibit ovulation and implantation; alter cervical mucus.', 'concept', 2),
    fc(15, 'What is Saheli?', 'Once-a-week non-steroidal pill from CDRI, Lucknow.', 'fact', 2),
    fc(16, 'Emergency contraception time limit?', 'Within 72 hours of coitus.', 'fact', 2),
    fc(17, 'Vasectomy vs tubectomy?', 'Vas deferens cut and tied vs fallopian tube cut and tied.', 'concept', 2),
    fc(18, 'When was MTP legalised in India?', '1971.', 'fact', 3),
    fc(19, 'When is MTP relatively safe?', 'During the first trimester.', 'fact', 3),
    fc(20, 'Why is amniocentesis for sex determination banned?', 'It was misused for female foeticide.', 'concept', 3),
    fc(21, 'What does amniocentesis analyse?', 'Chromosomes of foetal cells in amniotic fluid.', 'concept', 3),
    fc(22, 'Can infertility lie with the male?', 'Yes, quite often.', 'exam-tip', 4),
    fc(23, 'ZIFT vs IUT?', 'Up to 8 blastomeres into fallopian tube vs more than 8 into uterus.', 'exam-tip', 4),
    fc(24, 'What is GIFT?', 'Donor ovum transferred into the fallopian tube.', 'definition', 4),
    fc(25, 'What is ICSI?', 'Sperm injected directly into the ovum.', 'definition', 4),
    fc(26, 'When is AI/IUI used?', 'When the male cannot inseminate or has a very low sperm count.', 'concept', 4),
    fc(27, 'Cause of syphilis?', 'Treponema pallidum.', 'fact', 5),
    fc(28, 'Cause of gonorrhoea?', 'Neisseria gonorrhoeae.', 'fact', 5),
    fc(29, 'Cause of trichomoniasis?', 'Trichomonas vaginalis (protozoan).', 'fact', 5),
    fc(30, 'STDs not completely curable?', 'Hepatitis B, genital herpes, HIV.', 'exam-tip', 5),
    fc(31, 'Complications of untreated STDs?', 'PID, abortions, still births, ectopic pregnancy, infertility, cancer.', 'concept', 5),
    fc(32, 'Most at-risk age group?', '15–24 years.', 'fact', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
