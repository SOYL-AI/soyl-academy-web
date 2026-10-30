// ISC 12 Biology ch04 Reproductive Health — question bank in ISC style. AR keys (ISC options): a d c b.
import { mk, add, r } from '../../isc-12-biology-ch01/src/lib.mjs';
import { doublingSeries, grow, fertileWindow, transferRoute, pillCycle } from './calc.mjs';

const { mcq, ar, fill, num, short, long, part, match } = mk;

// ---------------------------------------------------------------- t01 reproductive health, programmes, population
add('who-mcq', mcq({
  stem: 'According to the World Health Organisation, reproductive health means total well-being in',
  right: 'physical, emotional, behavioural and social aspects of reproduction',
  wrong: ['physical aspects of reproduction only', 'the absence of sexually transmitted diseases only', 'having small families only'],
  sol: 'Reproductive health covers physical, emotional, behavioural and social aspects — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('rch-mcq', mcq({
  stem: 'India’s family planning programme, which was later widened into the Reproductive and Child Health Care (RCH) programmes, was initiated in',
  right: '1951',
  wrong: ['1971', '1991', '2011'],
  sol: 'Family planning began in 1951 — option (@K).',
  d: 2, c: 'recall', t: [1],
}));
add('explosion-mcq', mcq({
  stem: 'Better health care in a country sharply reduces deaths of infants and mothers, while birth rates stay the same. What is the most likely effect on its population?',
  right: 'It grows faster, because fewer people die while births continue.',
  wrong: ['It falls, because fewer children are born.', 'It stays the same, because births and deaths both fall.', 'It falls, because people live longer.'],
  sol: 'A rapid decline in death rate, MMR and IMR with unchanged births causes population explosion — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('marriage-mcq', mcq({
  stem: 'To help check population growth, the legal marriageable age in India has been set at',
  right: '18 years for females and 21 years for males',
  wrong: ['16 years for females and 18 years for males', '21 years for both', '18 years for both'],
  sol: 'The marriageable age is 18 years for females and 21 years for males — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
{
  const d = doublingSeries(100, 2, 105);
  add('doubling-num', num({
    stem: 'A population grows at a steady 2 percent a year. Using doubling time = ln 2 ÷ ln 1.02, how many years (to the nearest whole year) does it take to double?',
    value: d.doubling,
    sol: r`$\dfrac{\ln 2}{\ln 1.02} = \dfrac{0.693}{0.0198} \approx ${d.exact.toFixed(1)} \approx ${d.doubling}$ years.`,
    scheme: [[`${d.doubling}`, 1]],
    d: 3, c: 'application', t: [1],
  }), (q) => q.answer.value === 35 || 'value');
}
{
  const p = Math.round(grow(140, 1, 10));
  add('grow-num', num({
    stem: 'A town of 140 thousand people grows at 1 percent a year. Calculate its population after 10 years, in thousands, to the nearest whole number. (Use $1.01^{10} \\approx 1.105$.)',
    value: p, tol: 1, unit: 'thousand',
    sol: r`$140 \times 1.01^{10} \approx 140 \times 1.105 \approx ${p}$ thousand.`,
    scheme: [[`${p} thousand`, 1]],
    d: 3, c: 'application', t: [1],
  }), (q) => q.answer.value === 155 || 'value');
}
add('stigma-short', short({
  marks: 1,
  stem: 'Give a reason: Sex education is introduced in schools as part of reproductive health programmes.',
  model: 'To give young people **correct information** and discourage **myths and misconceptions** about sex-related aspects.',
  sol: 'Right information.',
  scheme: [['Correct information; dispels myths', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('programme-short', short({
  marks: 2,
  stem: 'State four actions taken in India under reproductive health programmes.',
  model: '1. **Awareness** through audio-visual and print media; 2. **sex education** in schools; 3. medical help for **pregnancy, delivery, contraception, STDs and infertility**; 4. the statutory **ban on amniocentesis for sex determination** (also mass child immunisation).',
  sol: 'Any four actions.',
  scheme: [['Two actions', 1], ['Two more actions', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('population-short', short({
  marks: 3,
  stem: 'What are the causes of population explosion in India? Describe two measures taken by the government to check it.',
  model: '**Causes:** a rapid **decline in the death rate**, the **maternal mortality rate (MMR)** and the **infant mortality rate (IMR)** due to better health care, and an **increase in the number of people of reproducible age**.\n\n**Measures:** motivating couples to have **smaller families** using **contraceptives** (slogan “Hum Do Hamare Do”); raising the **marriageable age** to **18 years for females and 21 for males**; and **incentives** for small families.',
  sol: 'Causes and measures.',
  scheme: [['Causes', 1], ['First measure', 1], ['Second measure', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 contraception
add('copper-mcq', mcq({
  stem: 'How does a copper-releasing IUD such as CuT prevent conception?',
  right: 'Copper ions suppress sperm motility and fertilising capacity.',
  wrong: ['Copper ions stop ovulation by blocking LH.', 'It blocks the vas deferens.', 'It kills the ovum in the ovary.'],
  sol: 'Copper ions released by the IUD suppress sperm motility and fertilising capacity — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('vasectomy-mcq', mcq({
  stem: 'Which structure is cut and tied in vasectomy?',
  right: 'Vas deferens',
  wrong: ['Fallopian tube', 'Urethra', 'Epididymis'],
  sol: 'In vasectomy a small part of the vas deferens is removed or tied — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('lippes-mcq', mcq({
  stem: 'Which of these is a non-medicated IUD?',
  right: 'Lippes loop',
  wrong: ['CuT', 'Multiload 375', 'LNG-20'],
  sol: 'Lippes loop is non-medicated; CuT and Multiload 375 release copper; LNG-20 releases hormone — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('saheli-mcq', mcq({
  stem: 'Saheli, an oral contraceptive developed at CDRI, Lucknow, is',
  right: 'a once-a-week non-steroidal pill',
  wrong: ['a daily steroidal pill', 'a copper-releasing IUD', 'a male contraceptive injection'],
  sol: 'Saheli is a once-a-week, non-steroidal pill for females — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('spacing-mcq', mcq({
  stem: 'A young mother wants to delay her next pregnancy by three years but may want more children later. Which method is most suitable?',
  right: 'An IUD such as CuT',
  wrong: ['Tubectomy', 'Vasectomy of her husband', 'Medical termination of pregnancy'],
  sol: 'IUDs are ideal for delaying pregnancy or spacing children; sterilisation is terminal and MTP is not contraception — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('lam-mcq', mcq({
  stem: 'A mother who is fully breast-feeding her four-month-old baby has not menstruated since delivery. On which natural method of contraception might she be relying, and how long is it effective?',
  right: 'Lactational amenorrhea, effective up to about six months after parturition',
  wrong: ['Periodic abstinence, effective for years', 'Coitus interruptus, effective only after weaning', 'Lactational amenorrhea, effective for two years'],
  sol: 'Ovulation does not occur during intense lactation, but this is effective only up to about six months — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('condom-mcq', mcq({
  stem: 'Which contraceptive method also helps protect against sexually transmitted diseases?',
  right: 'Condoms',
  wrong: ['Oral pills', 'Copper IUDs', 'Tubectomy'],
  sol: 'Condoms act as a barrier to body fluids and protect against STDs and AIDS — option (@K).',
  d: 1, c: 'understanding', t: [2, 5],
}));
add('pill-ar', ar({
  a: 'Oral contraceptive pills are effective in preventing conception.',
  r: 'They inhibit ovulation and implantation and alter cervical mucus so as to retard the entry of sperms.',
  key: 'a',
  sol: 'Both are true, and the actions in R explain the effectiveness of the pills — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('steril-ar', ar({
  a: 'Surgical methods of contraception are easily reversible.',
  r: 'In tubectomy the ovaries are removed.',
  key: 'd',
  sol: 'Sterilisation has very poor reversibility, and tubectomy cuts or ties the fallopian tube, not the ovaries. Both statements are false — option (d).',
  d: 2, c: 'understanding', t: [2],
}));
{
  const f = fertileWindow(32);
  add('fertile-num', num({
    stem: 'A woman has regular 32-day cycles. Ovulation occurs about 14 days before the next period, and the fertile period runs from 4 days before to 3 days after ovulation. On which day of her cycle does the fertile period begin?',
    value: f.from,
    sol: r`Ovulation day $= 32 - 14 = ${f.ovulation}$; the fertile period starts on day $${f.ovulation} - 4 = ${f.from}$.`,
    scheme: [[`Day ${f.from}`, 1]],
    d: 3, c: 'application', t: [2],
  }), (q) => q.answer.value === 14 || 'value');
}
add('emergency-fill', fill({
  stem: 'Emergency contraceptives such as progestogens or IUDs are effective if used within ______ hours of unprotected coitus.',
  acc: [['72', 'seventy-two', 'seventy two']],
  sol: '72.',
  d: 1, c: 'recall', t: [2],
}));
add('iud-match', match({
  stem: 'Match each contraceptive (column I) with its mode of action (column II).',
  pairs: [
    ['Copper-releasing IUD', 'Suppresses sperm motility'],
    ['Hormone-releasing IUD', 'Makes the uterus unsuitable for implantation'],
    ['Oral pill', 'Inhibits ovulation'],
    ['Diaphragm', 'Covers the cervix as a barrier'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Copper IUD — sperm motility; hormonal IUD — implantation; pill — ovulation; diaphragm — barrier.',
  d: 2, c: 'understanding', t: [2],
}));
add('ideal-short', short({
  marks: 1,
  stem: 'Give a reason: Periodic abstinence and withdrawal have high failure rates even though they have no side-effects.',
  model: 'Cycles and **ovulation timing vary**, and withdrawal may fail if some semen is released **before ejaculation is complete**.',
  sol: 'Unpredictable timing; incomplete withdrawal.',
  scheme: [['Unpredictable timing or incomplete withdrawal', 1]],
  d: 3, c: 'application', t: [2],
}));
add('lam-short', short({
  marks: 2,
  stem: 'A mother says she cannot become pregnant while she is breast-feeding, so she needs no contraception for two years. Explain the basis of her belief and its limitation.',
  model: 'During **intense lactation** after parturition, **ovulation and menstruation do not occur** (**lactational amenorrhea**), so conception is unlikely. But it is effective only up to about **six months** after parturition, so she should use another method after that.',
  sol: 'Lactational amenorrhea; six months.',
  scheme: [['No ovulation during intense lactation', 1], ['Effective only up to about six months', 1]],
  d: 3, c: 'application', t: [2],
}));
add('ideal2-short', short({
  marks: 2,
  stem: 'List four features of an ideal contraceptive.',
  model: 'It should be **user-friendly** and **easily available**, **effective** and **reversible**, with **no or least side-effects**, and should **not interfere** with sexual drive, desire or the sexual act.',
  sol: 'Any four features.',
  scheme: [['Two features', 1], ['Two more features', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('iud-short', short({
  marks: 2,
  stem: 'Name the three types of IUD with one example each, and state how hormone-releasing IUDs act.',
  model: '**Non-medicated** (Lippes loop), **copper-releasing** (CuT, Cu7, Multiload 375) and **hormone-releasing** (Progestasert, LNG-20). Hormone-releasing IUDs make the **uterus unsuitable for implantation** and the **cervix hostile to sperms**.',
  sol: 'Types and action.',
  scheme: [['Three types with examples', 1], ['Action of hormonal IUDs', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('choose-short', short({
  marks: 3,
  stem: 'Suggest a suitable contraceptive for each couple and justify it: (i) newly married, want a child after two years; (ii) have two children and want no more; (iii) unprotected coitus last night, pregnancy not wanted.',
  model: '(i) An **IUD** (e.g. CuT) or **oral pills**: they are **effective and reversible**, suitable for **delaying** pregnancy.\n\n(ii) **Sterilisation** — **vasectomy** or **tubectomy**: a **terminal**, highly effective method for couples who want no more children.\n\n(iii) **Emergency contraception** — progestogens, progestogen–estrogen combinations or an IUD **within 72 hours** of coitus.',
  sol: 'Three suitable methods with reasons.',
  scheme: [['(i) Reversible method', 1], ['(ii) Sterilisation', 1], ['(iii) Emergency contraception within 72 hours', 1]],
  d: 3, c: 'application', t: [2],
}));
add('barrier-short', short({
  marks: 3,
  stem: 'Describe the barrier methods of contraception available to males and females, and explain how spermicides increase their effectiveness.',
  model: '**Condoms** made of thin rubber or latex cover the **penis** (male) or line the **vagina and cervix** (female) just before coitus, so ejaculated semen does not enter the female tract; they are disposable and also protect against **STDs**. **Diaphragms, cervical caps and vaults** are rubber barriers inserted into the female tract to **cover the cervix**; they are reusable. **Spermicidal** creams, jellies and foams used with them **kill or inactivate sperms**, increasing contraceptive efficiency.',
  sol: 'Male and female barriers; spermicides.',
  scheme: [['Condoms (male and female)', 1], ['Diaphragms, caps and vaults', 1], ['Spermicides', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('curable-short', short({
  marks: 3,
  stem: 'Three patients are diagnosed with gonorrhoea, genital herpes and hepatitis B respectively. Which of them can expect a complete cure with proper treatment? Explain, and give one piece of advice to all three.',
  model: 'Only the patient with **gonorrhoea** (a **bacterial** infection, caused by Neisseria gonorrhoeae) can expect a **complete cure** if it is detected early and treated properly. **Genital herpes** and **hepatitis B** are **viral** infections that are **not completely curable**, though they can be managed. Advice to all: complete the treatment, avoid **unprotected sex**, use **condoms**, and inform partners so they can be tested.',
  sol: 'Gonorrhoea curable; herpes and hepatitis B not completely.',
  scheme: [['Gonorrhoea curable', 1], ['Herpes and hepatitis B not completely curable', 1], ['Advice', 1]],
  d: 4, c: 'application', t: [5],
}));
add('pillaction-short', short({
  marks: 3,
  stem: `Describe how oral contraceptive pills are taken and how they prevent pregnancy. Name one non-steroidal pill.`,
  model: `Pills contain small doses of **progestogens** or **progestogen–estrogen** combinations. They are taken **daily for ${pillCycle().on} days**, starting within the **first five days** of the cycle; after a gap of **${pillCycle().off} days** (when menstruation occurs) the course is repeated. They **inhibit ovulation and implantation** and alter the quality of **cervical mucus** to prevent or retard the entry of sperms. **Saheli** (CDRI, Lucknow) is a once-a-week **non-steroidal** pill.`,
  sol: 'Schedule, action, Saheli.',
  scheme: [['Composition and schedule', 1], ['Mode of action', 1], ['Saheli', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('contraception-long', long({
  stem: '(a) Distinguish between barrier methods and intrauterine devices, with one example each and their modes of action. [2]\n(b) Explain why the hormone-releasing IUD and the oral pill are both described as acting on the uterus and cervix, and state one way in which the pill also acts on the ovary. [2]\n(c) Why are vasectomy and tubectomy called terminal methods? [1]',
  model: '(a) **Barrier methods**, such as **condoms** or **diaphragms**, physically **prevent the ovum and sperms from meeting**; condoms also protect against STDs. **IUDs**, such as **CuT**, are placed in the uterus; they increase **phagocytosis of sperms**, and copper ions **suppress sperm motility** and fertilising capacity.\n\n(b) Both make the **uterus unsuitable for implantation** and the **cervical mucus hostile to sperms**. The pill also **inhibits ovulation**, so no ovum is released from the ovary.\n\n(c) They **block gamete transport** permanently; their **reversibility is very poor**, so they are used only by those who want no more children.',
  sol: 'Barrier vs IUD; hormonal actions; terminal methods.',
  scheme: [['(a) Barrier with example and action', 1], ['(a) IUD with example and action', 1], ['(b) Uterus and cervix', 1], ['(b) Inhibits ovulation', 1], ['(c) Poor reversibility', 1]],
  wl: [60, 200],
  d: 4, c: 'analysis', t: [2],
}));

// ---------------------------------------------------------------- t03 MTP and amniocentesis
add('implant-mcq', mcq({
  stem: 'A woman wants a long-acting hormonal contraceptive that does not need a daily pill or a device in the uterus. Which method suits her?',
  right: 'A progestogen implant placed under the skin',
  wrong: ['A copper-releasing IUD', 'Periodic abstinence', 'Tubectomy'],
  sol: 'Implants under the skin release progestogens and act like pills but over a much longer period — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('cervical-mcq', mcq({
  stem: 'Sperms reach the cervix of a woman using hormonal pills but fail to enter the uterus. Which effect of the pill explains this?',
  right: 'The pill alters the quality of cervical mucus so that sperm entry is prevented or retarded.',
  wrong: ['The pill blocks the vas deferens.', 'The pill releases copper ions in the vagina.', 'The pill dissolves the acrosome.'],
  sol: 'Besides inhibiting ovulation and implantation, pills make cervical mucus hostile to sperms — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('mtp-mcq', mcq({
  stem: 'Medical termination of pregnancy is considered relatively safe only during',
  right: 'the first trimester',
  wrong: ['the third trimester', 'the ninth month', 'labour'],
  sol: 'MTPs are considered relatively safe during the first trimester — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('amnio-mcq', mcq({
  stem: 'A private clinic advertises that it will tell parents the sex of their unborn child by amniocentesis. Why is this service illegal in India?',
  right: 'Amniocentesis for sex determination is banned because it was misused for female foeticide.',
  wrong: ['Amniocentesis always harms the foetus.', 'Amniocentesis cannot reveal chromosomes.', 'Only government hospitals may test amniotic fluid for any purpose.'],
  sol: 'The ban checks female foeticide; amniocentesis remains a legitimate test for chromosomal disorders — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('down-mcq', mcq({
  stem: 'A doctor suspects that a foetus may have Down’s syndrome. Which test could confirm the chromosomal pattern of the foetus?',
  right: 'Amniocentesis',
  wrong: ['ELISA of the mother’s blood', 'A sperm count of the father', 'IUI'],
  sol: 'Amniocentesis analyses chromosomes of foetal cells in the amniotic fluid — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('mtp-ar', ar({
  a: 'MTP was legalised in India in 1971 with strict conditions.',
  r: 'MTP is a convenient method of contraception for couples.',
  key: 'c',
  sol: 'A is true. R is false: MTP is not a contraceptive method; it is a medical procedure with legal conditions — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
add('quack-short', short({
  marks: 1,
  stem: 'Give a reason: MTP must be performed only by registered medical practitioners.',
  model: 'Abortions by **unqualified quacks** are **unsafe** and can cause serious harm or **death** of the mother.',
  sol: 'Safety.',
  scheme: [['Unqualified procedures unsafe or fatal', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('mtp-short', short({
  marks: 2,
  stem: 'Give two situations in which MTP may be advised, and state one concern about its misuse.',
  model: 'MTP may be advised to end an **unwanted pregnancy** after **contraceptive failure**, unprotected intercourse or rape, or when continuing the pregnancy could be **harmful or fatal** to the **mother or foetus**. **Concern:** misuse for **female foeticide** through sex-selective abortion, and unsafe abortions by unqualified people.',
  sol: 'Two situations; one concern.',
  scheme: [['Two situations', 1], ['One concern', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('amnio-short', short({
  marks: 3,
  stem: 'What is amniocentesis? Explain one beneficial use and one misuse of it, and state the government’s response to the misuse.',
  model: '**Amniocentesis** is a test in which a little **amniotic fluid** containing **foetal cells** is drawn and the cells’ **chromosomes** are analysed. **Beneficial use:** detecting **genetic or chromosomal disorders** such as **Down’s syndrome**. **Misuse:** finding the **sex of the foetus** and aborting normal **female** foetuses (female foeticide). The government has **banned amniocentesis for sex determination**.',
  sol: 'Definition; use; misuse; ban.',
  scheme: [['Definition', 1], ['Use and misuse', 1], ['Ban', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 infertility and ART
add('iut-num', num({
  stem: 'An IVF embryo is transferred into the uterus by IUT. What is the minimum number of blastomeres such an embryo would have, according to the rule separating ZIFT and IUT?',
  value: 9,
  sol: r`ZIFT is for embryos with up to 8 blastomeres, so an IUT embryo has more than 8: at least $8 + 1 = 9$.`,
  scheme: [['9', 1]],
  d: 3, c: 'application', t: [4],
}), (q) => (transferRoute(q.answer.value) === 'IUT' && transferRoute(q.answer.value - 1) === 'ZIFT') || 'value');
add('icsi-mcq', mcq({
  stem: 'In which assisted reproductive technique is a sperm injected directly into an ovum?',
  right: 'ICSI',
  wrong: ['GIFT', 'IUI', 'ZIFT'],
  sol: 'Intra-cytoplasmic sperm injection injects a sperm into the ovum — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('zift-mcq', mcq({
  stem: `An embryo with ${6} blastomeres, formed by IVF, is ready for transfer. Which technique and site are appropriate?`,
  right: `${transferRoute(6)}, into the fallopian tube`,
  wrong: ['IUT, into the uterus', 'GIFT, into the ovary', 'IUI, into the vagina'],
  sol: 'Embryos with up to 8 blastomeres are transferred into the fallopian tube by ZIFT; larger ones into the uterus by IUT — option (@K).',
  d: 2, c: 'application', t: [4],
}), (q) => transferRoute(6) === 'ZIFT' || 'route');
add('gift-mcq', mcq({
  stem: 'A woman cannot produce ova but her oviducts and uterus are normal. Which technique would help her conceive?',
  right: 'GIFT, with an ovum from a donor transferred into her fallopian tube',
  wrong: ['IUI with her husband’s semen', 'ICSI with her own ovum', 'Vasectomy of her husband'],
  sol: 'GIFT transfers a donor ovum into the fallopian tube of a woman who can provide a suitable environment — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('lowcount-mcq', mcq({
  stem: 'A man has a very low sperm count. Which technique introduces his semen directly into his wife’s uterus?',
  right: 'Intra-uterine insemination (IUI)',
  wrong: ['GIFT', 'ZIFT', 'Amniocentesis'],
  sol: 'In AI/IUI semen from the husband or a donor is introduced into the vagina or uterus — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('blame-ar', ar({
  a: 'Infertility in a couple can be due to a problem in the male partner.',
  r: 'IVF involves fertilisation outside the body followed by embryo transfer.',
  key: 'b',
  sol: 'Both statements are true, but the nature of IVF does not explain why infertility can lie with the male — option (b).',
  d: 3, c: 'analysis', t: [4],
}));
add('testtube-fill', fill({
  stem: 'In vitro fertilisation followed by embryo transfer is popularly known as the test-______ baby programme.',
  acc: [['tube']],
  sol: 'Tube.',
  d: 1, c: 'recall', t: [4],
}));
add('art-short', short({
  marks: 2,
  stem: 'Expand ZIFT and IUT and state how they differ.',
  model: '**ZIFT:** zygote intra-fallopian transfer; **IUT:** intra-uterine transfer. In ZIFT a zygote or early embryo with **up to 8 blastomeres** is transferred into the **fallopian tube**; in IUT an embryo with **more than 8 blastomeres** is transferred into the **uterus**.',
  sol: 'Expansions; difference.',
  scheme: [['Both expanded', 1], ['Blastomere number and site', 1]],
  d: 1, c: 'understanding', t: [4],
}));
add('ivf-short', short({
  marks: 3,
  stem: 'A couple has been unable to have a child because the wife’s fallopian tubes are blocked. Explain how IVF and embryo transfer could help them, naming the transfer method for an embryo of 16 cells.',
  model: `Blocked tubes stop **sperm and ovum meeting**, so fertilisation is done **outside the body**: ova from the wife and sperms from the husband are collected and induced to form a **zygote** in the **laboratory** under simulated conditions (**IVF**). The embryo is then transferred into the wife’s body (**embryo transfer**). An embryo of **16 blastomeres** (more than 8) is placed directly into the **uterus** by **${transferRoute(16)}**, bypassing the blocked tubes.`,
  sol: 'IVF and IUT.',
  scheme: [['Problem: gametes cannot meet', 1], ['IVF in laboratory', 1], ['IUT into uterus for a 16-cell embryo', 1]],
  d: 3, c: 'application', t: [4],
}), () => transferRoute(16) === 'IUT' || 'route');

// ---------------------------------------------------------------- t05 STDs
add('rubella-mcq', mcq({
  stem: 'A newborn is found to have hepatitis B although neither parent had any blood transfusion and the baby received no injections. What is the most likely route of infection?',
  right: 'From the infected mother to the foetus or at birth',
  wrong: ['Through the air', 'Through mosquito bites', 'Through contaminated food'],
  sol: 'Hepatitis B and HIV can pass from an infected mother to the foetus — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('syphilis-mcq', mcq({
  stem: 'Syphilis is caused by',
  right: 'Treponema pallidum',
  wrong: ['Neisseria gonorrhoeae', 'Trichomonas vaginalis', 'Human papillomavirus'],
  sol: 'Syphilis is caused by the bacterium Treponema pallidum — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('trich-mcq', mcq({
  stem: 'A laboratory finds a flagellated single-celled organism in a patient’s genital discharge. Which sexually transmitted disease is the most likely diagnosis?',
  right: 'Trichomoniasis',
  wrong: ['Gonorrhoea', 'Genital herpes', 'Chlamydiasis'],
  sol: 'A protozoan pathogen points to trichomoniasis (Trichomonas vaginalis); the others are bacterial or viral — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('incurable-mcq', mcq({
  stem: 'A doctor tells one patient that his infection can be completely cured with treatment, and another that hers can only be managed. Which pair of diagnoses fits?',
  right: 'Syphilis (curable) and genital herpes (not completely curable)',
  wrong: ['Hepatitis B (curable) and gonorrhoea (not completely curable)', 'HIV infection (curable) and chlamydiasis (not completely curable)', 'Trichomoniasis (not completely curable) and genital herpes (curable)'],
  sol: 'Except for hepatitis B, genital herpes and HIV, the STDs are completely curable if detected early — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('needle-mcq', mcq({
  stem: 'A patient has hepatitis B but reports no sexual contact. Which of these routes could also explain the infection?',
  right: 'Sharing injection needles or receiving infected blood',
  wrong: ['Shaking hands with an infected person', 'Drinking water from a public tap', 'Insect bites'],
  sol: 'Hepatitis B and HIV also spread through shared needles, surgical instruments and transfusion of infected blood — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('ectopic-mcq', mcq({
  stem: 'An untreated chlamydial infection damages a woman’s fallopian tubes. Which complication becomes more likely?',
  right: 'Ectopic pregnancy or infertility',
  wrong: ['Faster implantation in the uterus', 'Increased sperm count', 'Earlier menopause only'],
  sol: 'STD complications include PID, ectopic pregnancy and infertility — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('asymptomatic-ar', ar({
  a: 'Sexually transmitted diseases in females often remain undetected for a long time.',
  r: 'Early symptoms are minor, and infected females may often be asymptomatic.',
  key: 'a',
  sol: 'Both are true, and the minor or absent early symptoms explain late detection — option (a).',
  d: 2, c: 'understanding', t: [5],
}));
add('std-short', short({
  marks: 2,
  stem: 'Name the causative organisms of gonorrhoea and genital warts, and state two early symptoms of STDs.',
  model: 'Gonorrhoea is caused by the bacterium **Neisseria gonorrhoeae**, and genital warts by the **human papillomavirus**. Early symptoms are usually minor: **itching**, **fluid discharge**, **slight pain** and **swellings** in the genital region; infected females may show no symptoms at all.',
  sol: 'Two organisms; two symptoms.',
  scheme: [['Two organisms', 1], ['Two symptoms', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('prevent-short', short({
  marks: 3,
  stem: 'A college health club is planning a talk on sexually transmitted diseases. Suggest three key messages on prevention and explain why early consultation is stressed.',
  model: '1. **Avoid sex with unknown or multiple partners.**\n2. **Always use condoms** during coitus.\n3. **Do not share injection needles**; use screened blood (hepatitis B and HIV spread this way too).\n\n**Early consultation** with a qualified doctor matters because early symptoms are **minor** or absent, and most STDs are **curable if detected early**; late treatment risks **PID, infertility, ectopic pregnancy** and even **cancer**.',
  sol: 'Three messages; reason for early consultation.',
  scheme: [['Two prevention messages', 1], ['Third message', 1], ['Early detection and complications', 1]],
  d: 2, c: 'application', t: [5],
}));
add('std-long', long({
  stem: '(a) Name four sexually transmitted diseases with their causative agents. [2]\n(b) Explain why the age group 15–24 years is at greater risk and why social stigma is a problem. [2]\n(c) Name two STDs that can also be passed from an infected mother to her child. [1]',
  model: '(a) **Gonorrhoea** — Neisseria gonorrhoeae; **syphilis** — Treponema pallidum; **trichomoniasis** — Trichomonas vaginalis; **AIDS** — HIV (also chlamydiasis — Chlamydia trachomatis; genital herpes — herpes simplex virus; genital warts — human papillomavirus; hepatitis B — hepatitis B virus).\n\n(b) People aged **15–24** are often sexually active with **less awareness** and may have **unprotected sex** or **multiple partners**, so most reported cases are in this group. The **stigma** attached to STDs **deters people from seeking timely detection and treatment**, so infections progress to complications such as **PID** and **infertility**.\n\n(c) **Hepatitis B** and **HIV** (AIDS).',
  sol: 'Four diseases; risk and stigma; mother to child.',
  scheme: [['(a) Four diseases with agents', 2], ['(b) Risk in 15–24 age group', 1], ['(b) Stigma delays treatment', 1], ['(c) Hepatitis B and HIV', 1]],
  wl: [60, 200],
  d: 3, c: 'understanding', t: [5],
}));
add('infertility-long', long({
  stem: '(a) What is infertility? Give two possible causes. [2]\n(b) Match each problem to an assisted reproductive technique and give a reason: (i) a man with a very low sperm count; (ii) a woman who cannot produce ova; (iii) sperms that cannot penetrate the ovum on their own. [3]',
  model: '(a) **Infertility** is the inability of a couple to produce children in spite of **unprotected sexual cohabitation**. Causes may be **physical, congenital, diseases, drugs, immunological** or **psychological**, and may lie with **either partner**.\n\n(b) (i) **AI / IUI** — semen is placed directly in the **uterus**, increasing the chance of sperms reaching the ovum. (ii) **GIFT** — a **donor ovum** is placed in her fallopian tube, where fertilisation can occur. (iii) **ICSI** — a sperm is **injected directly into the ovum** in the laboratory, bypassing the need to penetrate it.',
  sol: 'Definition and causes; three matches.',
  scheme: [['(a) Definition', 1], ['(a) Two causes', 1], ['(b) Three techniques with reasons', 3]],
  wl: [60, 200],
  d: 3, c: 'application', t: [4],
}));
add('population-long', long({
  stem: '(a) Explain the causes and consequences of population explosion in India. [3]\n(b) State two measures the government has taken to check population growth. [2]',
  model: '(a) **Causes:** a rapid **decline in the death rate**, **maternal mortality rate** and **infant mortality rate** because of better health care, and an increase in the number of people of **reproducible age**. India’s population rose from about **350 million** at independence to about **1.2 billion** in 2011. **Consequences:** scarcity of basic requirements such as **food, shelter and clothing**, and pressure on health, education and resources, despite progress in other areas.\n\n(b) The government motivates couples to have **smaller families** using **contraceptive methods** (“Hum Do Hamare Do”), raised the **marriageable age** to **18 years for females and 21 for males**, and gives **incentives** to couples with small families.',
  sol: 'Causes; consequences; measures.',
  scheme: [['(a) Causes', 1.5], ['(a) Consequences', 1.5], ['(b) Two measures', 2]],
  wl: [60, 200],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- stimulus-based
add('clinic-case', mk.case({
  passage: 'A family-planning clinic recorded the methods chosen by four couples.\n\n| Couple | Situation | Method chosen |\n|---|---|---|\n| P | Married six months; want a child in three years | CuT |\n| Q | Two children; want no more | Vasectomy |\n| R | Mother breast-feeding a two-month-old | Lactational amenorrhea |\n| S | Prefer a weekly pill | Saheli |',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'How does the method chosen by couple P prevent pregnancy?',
      right: 'Copper ions suppress sperm motility and fertilising capacity.',
      wrong: ['It blocks the vas deferens.', 'It stops milk production.', 'It removes the ovaries.'],
      sol: 'CuT is a copper-releasing IUD — option (@K).',
      d: 2, c: 'application', t: [2],
    })),
    part('b', mcq({
      stem: 'Why is the method chosen by couple R not suitable for long?',
      right: 'It is effective only up to about six months after parturition.',
      wrong: ['It causes permanent sterility.', 'It requires surgery.', 'It works only with condoms.'],
      sol: 'Lactational amenorrhea is effective only during intense lactation, up to about six months — option (@K).',
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why couple Q’s method is called a terminal method and how it works.',
      model: 'In **vasectomy** a small part of the **vas deferens** is removed or tied, so **sperms cannot be transported** into the semen. Its **reversibility is very poor**, so it is a **terminal** method, suitable for couples who want no more children.',
      sol: 'Blocks sperm transport; poor reversibility.',
      scheme: [['Vas deferens cut and tied; no sperm transport', 1], ['Poor reversibility: terminal', 1]],
      d: 2, c: 'understanding', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'What is special about the pill chosen by couple S, and where was it developed?',
        model: '**Saheli** is a **once-a-week**, **non-steroidal** oral contraceptive pill for females, developed at the **Central Drug Research Institute (CDRI), Lucknow**. Taking one pill a week is easier to remember than a daily pill, and it has few side-effects.',
        sol: 'Saheli features.',
        scheme: [['Once a week, non-steroidal', 1], ['CDRI, Lucknow', 1]],
        d: 1, c: 'recall', t: [2],
      }),
    ]),
  ],
}));
add('std-case', mk.case({
  passage: 'A health survey of 200 young adults aged 15–24 in a town found that 18 had a sexually transmitted infection. Of these, 10 had no noticeable symptoms. Most had never used condoms.',
  d: 3, c: 'application',
  children: [
    part('a', num({
      stem: 'What percentage of the infected young adults had no noticeable symptoms? (One decimal place.)',
      value: 55.6, tol: 0.05, unit: '%',
      sol: r`$\dfrac{10}{18} \times 100 \approx 55.6$ percent.`,
      scheme: [['55.6%', 1]],
      d: 2, c: 'application', t: [5],
    })),
    part('b', mcq({
      stem: 'What does this high proportion of symptom-free cases suggest?',
      right: 'Many infections go undetected, so screening and early consultation are important.',
      wrong: ['These infections are harmless and need no treatment.', 'The survey must be wrong.', 'Symptom-free people cannot pass on the infection.'],
      sol: 'Infected people, especially females, may be asymptomatic; undetected infections can still cause complications and spread — option (@K).',
      d: 3, c: 'analysis', t: [5],
    })),
    part('c', short({
      marks: 2,
      stem: 'Suggest two measures the town’s health department could take.',
      model: '**Awareness campaigns** on safe sex and **condom use** (avoiding unknown or multiple partners), and **screening clinics** offering confidential **early diagnosis and treatment**, which also reduces stigma.',
      sol: 'Two measures.',
      scheme: [['Awareness and condom use', 1], ['Screening and early treatment', 1]],
      d: 2, c: 'application', t: [5],
    }), [
      short({
        marks: 2,
        stem: 'Name two complications the untreated infections could cause in later life.',
        model: 'Untreated infections can lead to **pelvic inflammatory disease**, **infertility**, **ectopic pregnancy**, **still births** or **abortions**, and even **cancer of the reproductive tract** (any two). This is why early detection and complete treatment matter.',
        sol: 'Any two complications.',
        scheme: [['First complication', 1], ['Second complication', 1]],
        d: 1, c: 'recall', t: [5],
      }),
    ]),
  ],
}), (q) => Math.abs(q.children[0].answer.value - Math.round((10 / 18) * 1000) / 10) < 1e-9 || 'value');
