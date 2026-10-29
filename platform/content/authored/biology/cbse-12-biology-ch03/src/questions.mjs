// ch03 Reproductive Health — question bank. AR keys planned: d a b a c a b.
import { mk, add, r } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { doublingSeries, grow, fertileWindow, transferRoute } from './calc.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;

// ---------------------------------------------------------------- t01 reproductive health, STIs
add('rh-def-mcq', mcq({
  stem: 'Which statement best describes reproductive health?',
  right: 'Total well-being in all aspects of reproduction: physical, emotional, behavioural and social',
  wrong: ['Only the absence of diseases of the reproductive organs', 'Only the ability to produce children', 'Only the use of contraceptives by married couples'],
  sol: 'The WHO describes reproductive health as total well-being in all aspects of reproduction — physical, emotional, behavioural and social — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('not-curable-mcq', mcq({
  stem: 'Which of these sexually transmitted infections is not completely curable?',
  right: 'Genital herpes',
  wrong: ['Gonorrhoea', 'Syphilis', 'Chlamydiasis'],
  sol: 'Except hepatitis-B, genital herpes and HIV, the common STIs are completely curable if detected early and treated properly — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('early-ar', ar({
  a: 'Hepatitis-B, like gonorrhoea, is completely curable if it is detected early.',
  r: 'Gonorrhoea and syphilis are completely curable if they are detected early and treated properly.',
  key: 'd',
  sol: 'A is false: hepatitis-B, genital herpes and HIV are not completely curable. R is true — option (d).',
  d: 2, c: 'understanding', t: [1],
}));
add('transmission-mcq', mcq({
  stem: 'Which of these can transmit HIV from an infected person to another person?',
  right: 'Sharing an injection needle',
  wrong: ['Shaking hands', 'Sharing a classroom', 'Eating from the same plate'],
  sol: 'HIV spreads through sexual contact, infected blood (shared needles, transfusion) and from mother to foetus — option (@K). Casual contact does not spread it.',
  d: 2, c: 'application', t: [1],
}));
add('casual-tf', tf({
  stem: 'HIV can spread by hugging or shaking hands with an infected person.',
  key: 'f',
  sol: 'False. HIV spreads through sexual contact, infected blood or needles, and from an infected mother to the foetus, not through casual contact.',
  d: 1, c: 'recall', t: [1],
}));
{
  const fall = Math.round(((50 - 35) / 50) * 100);
  add('imr-num', num({
    stem: 'After a district started free hospital deliveries and post-natal check-ups, its infant mortality rate fell from 50 to 35 deaths per 1000 live births. By what percentage did it fall?',
    value: fall, unit: '%',
    sol: r`Fall $= 50 - 35 = 15$; percentage $= \dfrac{15}{50} \times 100 = ${fall}$ percent.`,
    scheme: [[`${fall}%`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 30 || 'value');
}
add('symptom-mcq', mcq({
  stem: 'A young man notices slight itching and a discharge in the genital region. He feels embarrassed and decides to wait and see. What is the best advice for him?',
  right: 'Consult a qualified doctor early, get tested and complete the treatment.',
  wrong: ['Wait until the symptoms become severe, as mild symptoms are harmless.', 'Take medicines suggested by a friend without testing.', 'Ignore it, as STIs never cause long-term problems.'],
  sol: 'Early symptoms of STIs are often minor, but untreated infections can cause serious complications. Early diagnosis by a qualified doctor and complete treatment is the right step — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('ectopic-mcq', mcq({
  stem: 'A woman who had a long-untreated sexually transmitted infection has an embryo implanted in her oviduct instead of her uterus. This complication is called',
  right: 'ectopic pregnancy',
  wrong: ['lactational amenorrhea', 'parthenocarpy', 'amniocentesis'],
  sol: 'Implantation outside the uterus is an ectopic pregnancy, one of the complications of untreated STIs — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('rch-match', match({
  stem: 'Match each action of India’s reproductive health programmes (column I) with its main purpose (column II).',
  pairs: [
    ['Sex education in schools', 'Give correct information and dispel myths'],
    ['Ban on prenatal sex determination', 'Prevent female foeticide'],
    ['Medically assisted deliveries', 'Reduce maternal and infant deaths'],
    ['Counselling of couples', 'Help them choose family planning methods'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Sex education → correct information; ban on sex determination → prevent female foeticide; assisted deliveries → fewer maternal and infant deaths; counselling → choice of family planning methods.',
  d: 2, c: 'understanding', t: [1],
}));
add('stigma-ar', ar({
  a: 'Social stigma attached to STIs can increase their harm in a community.',
  r: 'Embarrassment and fear make infected people delay going to a qualified doctor, so infections are treated late and may spread.',
  key: 'a',
  sol: 'Both are true, and the delay caused by embarrassment is exactly why stigma increases harm — option (a).',
  d: 3, c: 'analysis', t: [1],
}));
add('young-fill', fill({
  stem: 'The incidence of sexually transmitted infections is reported to be very high in the age group of ______ years.',
  acc: [['15-24', '15–24', '15 to 24']],
  sol: '15–24 years.',
  d: 1, c: 'recall', t: [1],
}));
add('sexed-short', short({
  marks: 2,
  stem: 'Give two reasons why sex education should be provided in schools.',
  model: 'It gives young people **correct, scientific information** about reproductive organs, adolescence, safe practices and STIs, so they are not misled by **myths** from friends or unreliable sources. It helps them make **responsible choices** and seek medical help early, protecting their reproductive health.',
  sol: 'Correct information vs myths; responsible choices and early help.',
  scheme: [['Correct information replaces myths', 1], ['Responsible, safe choices and early medical help', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('blood-school-short', short({
  marks: 3,
  stem: 'A blood bank tests every unit of donated blood for hepatitis-B and HIV, while a school stops an HIV-positive student from eating in the common canteen. Evaluate each decision using what you know about how these infections spread.',
  model: '**Blood bank: justified.** Hepatitis-B and HIV can spread through transfusion of infected blood, so testing every unit prevents infection of patients.\n\n**School: not justified.** HIV does not spread through casual contact such as sharing a room, a table or food; it spreads through sexual contact, infected blood or needles, and from mother to foetus.\n\nSo the school’s decision is based on a myth; it causes **discrimination** without protecting anyone.',
  sol: 'Judge each decision by the real routes of transmission.',
  scheme: [['Blood testing justified, with the blood route', 1], ['Canteen ban unjustified: no spread by casual contact', 1], ['Conclusion about discrimination based on myths', 1]],
  d: 4, c: 'evaluation', t: [1],
}));
add('prevent-short', short({
  marks: 3,
  stem: 'Suggest three measures a person can take to protect themselves from sexually transmitted infections, and explain how each helps.',
  model: '1. **Avoid sex with unknown partners or multiple partners** — this lowers the chance of contact with an infected person.\n\n2. **Always use condoms** during intercourse — the barrier prevents the exchange of infected fluids.\n\n3. **Consult a qualified doctor early** if in doubt, and complete the treatment — early diagnosis cures most STIs and prevents complications and further spread. (Never sharing needles is another measure.)',
  sol: 'Partners, condoms, early medical help (or sterile needles).',
  scheme: [['First measure with how it helps', 1], ['Second measure with how it helps', 1], ['Third measure with how it helps', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('rh-long', long({
  stem: 'What is meant by a reproductively healthy society? Describe the steps taken in India to achieve reproductive health and state how we can tell that reproductive health is improving.',
  model: '**Meaning.** Reproductive health is total well-being in all aspects of reproduction: physical, emotional, behavioural and social. A reproductively healthy society has people with physically and functionally normal reproductive organs and normal emotional and behavioural interactions in all sex-related aspects.\n\n**Steps in India.** National family planning began in 1951 and now runs as Reproductive and Child Health Care programmes. They create awareness through audio-visual and print media, encourage sex education in schools, train and counsel couples on family planning, care during pregnancy and after birth, ban prenatal sex determination to stop female foeticide, run immunisation, and support research and better medical facilities.\n\n**Signs of improvement.** Better awareness, more medically assisted deliveries and post-natal care, lower maternal and infant mortality rates, more couples with small families, and better detection and cure of STIs.',
  sol: 'Definition, programmes and actions, indicators.',
  scheme: [['Definition with four aspects', 1], ['Family planning since 1951 and RCH programmes', 1], ['At least three actions', 2], ['Indicators of improvement', 1]],
  wl: [80, 160],
  d: 2, c: 'understanding', t: [1],
}));
add('sti-long', long({
  stem: 'Name four sexually transmitted infections and state which of the common STIs are not completely curable. How do hepatitis-B and HIV spread besides sexual contact? Describe the complications of untreated STIs and the ways to prevent them.',
  model: '**Examples.** Gonorrhoea, syphilis, chlamydiasis, trichomoniasis, genital warts, genital herpes, hepatitis-B and HIV infection.\n\n**Not completely curable.** Genital herpes, hepatitis-B and HIV; the others can be completely cured if detected early and treated properly.\n\n**Other routes.** Hepatitis-B and HIV also spread by sharing injection needles or surgical instruments with infected persons, by transfusion of infected blood, and from an infected mother to the foetus.\n\n**Complications.** Early symptoms are mild and often ignored; untreated STIs can cause pelvic inflammatory disease, abortions, stillbirths, ectopic pregnancies, infertility and even cancer of the reproductive tract.\n\n**Prevention.** Avoid sex with unknown or multiple partners, always use condoms, and consult a qualified doctor early for diagnosis and full treatment.',
  sol: 'Four STIs; three not curable; three other routes; complications; prevention.',
  scheme: [['Four STIs named', 1], ['Three not completely curable', 1], ['Other routes of hepatitis-B and HIV', 1], ['Complications', 1], ['Prevention', 1]],
  wl: [80, 160],
  d: 3, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 population, contraception, MTP
add('ideal-mcq', mcq({
  stem: 'Which property is NOT expected of an ideal contraceptive?',
  right: 'It should be irreversible.',
  wrong: ['It should be user-friendly and easily available.', 'It should have no or least side effects.', 'It should not interfere with sexual drive.'],
  sol: 'An ideal contraceptive should be reversible, so that couples can have children later if they wish — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('copper-mcq', mcq({
  stem: 'How do copper ions released by a copper IUD prevent pregnancy?',
  right: 'They suppress the motility and fertilising capacity of sperms.',
  wrong: ['They stop the ovary from making estrogen.', 'They block the vas deferens.', 'They make the ovum divide before fertilisation.'],
  sol: 'Copper ions released by CuT, Cu7 or Multiload 375 suppress sperm motility and fertilising capacity — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('pill-mcq', mcq({
  stem: 'Oral contraceptive pills containing progestogens or progestogen–estrogen combinations prevent pregnancy mainly by',
  right: 'inhibiting ovulation and implantation and altering cervical mucus',
  wrong: ['killing sperms in the vagina', 'blocking the fallopian tubes', 'increasing phagocytosis of sperms in the uterus'],
  sol: 'Pills inhibit ovulation and implantation and change the cervical mucus so that sperms are retarded — option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('saheli-fill', fill({
  stem: 'The once-a-week, non-steroidal oral contraceptive pill developed at the Central Drug Research Institute, Lucknow, is called ______.',
  acc: [['Saheli']],
  sol: 'Saheli.',
  d: 1, c: 'recall', t: [2],
}));
add('emergency-mcq', mcq({
  stem: 'A woman had unprotected intercourse two days ago and wants to prevent a possible pregnancy. Which option is medically appropriate?',
  right: 'An emergency contraceptive (hormone pills or an IUD) taken or inserted within 72 hours',
  wrong: ['Starting periodic abstinence from today', 'Waiting to see whether she misses her period, then using a condom', 'Tubectomy within a week'],
  sol: 'Emergency contraceptives are effective if used within 72 hours of coitus; two days is within that window — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('vasectomy-mcq', mcq({
  stem: 'Some months after a successful vasectomy, which change is expected in the man?',
  right: 'His semen no longer contains sperms, but his testes still make androgens.',
  wrong: ['His testes stop making androgens.', 'He stops producing seminal plasma.', 'His sperms are released directly into the urinary bladder.'],
  sol: 'Vasectomy cuts or ties the vas deferens, so sperms cannot reach the semen; the testes, hormones and accessory glands are not affected — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('lam-mcq', mcq({
  stem: 'A mother who fully breastfeeds her four-month-old baby asks whether she can rely on breastfeeding to avoid pregnancy. What is the most accurate answer?',
  right: 'It is fairly reliable only for up to about six months after birth, and only while breastfeeding is intense and full.',
  wrong: ['It is completely reliable for as long as she breastfeeds.', 'It never has any effect on ovulation.', 'It works only if she also takes oral pills.'],
  sol: 'Lactational amenorrhea relies on the absence of ovulation during intense full breastfeeding; its failure chances are low only up to about six months after parturition — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('condom-mcq', mcq({
  stem: 'A couple wants a reversible method that prevents pregnancy and also reduces the risk of sexually transmitted infections. Which method suits them best?',
  right: 'Condoms',
  wrong: ['Copper IUD', 'Oral pills', 'Vasectomy'],
  sol: 'Condoms are reversible barrier contraceptives that also protect against STIs and AIDS; IUDs and pills do not protect against infections and vasectomy is not reversible — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('lng-mcq', mcq({
  stem: 'Hormone-releasing IUDs such as LNG-20 prevent pregnancy mainly because they',
  right: 'make the uterus unsuitable for implantation and the cervix hostile to sperms',
  wrong: ['release copper ions that kill the ovum', 'remove the ovaries’ ability to make hormones permanently', 'block the vas deferens'],
  sol: 'Hormone-releasing IUDs (Progestasert, LNG-20) make the uterus unsuitable for implantation and the cervix hostile to sperms — option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('mtp-ar', ar({
  a: 'Medical termination of pregnancy should not be used as a method of family planning.',
  r: 'MTP is safest when performed during the first trimester of pregnancy.',
  key: 'b',
  sol: 'Both are true, but R explains when MTP is safest, not why it should not be used for family planning (contraception prevents pregnancy; MTP carries medical risks) — option (b).',
  d: 3, c: 'analysis', t: [2],
}));
add('steril-ar', ar({
  a: 'Sterilisation is advised only for people who are sure they want no more children.',
  r: 'The reversibility of vasectomy and tubectomy is very poor.',
  key: 'a',
  sol: 'Both are true, and the poor reversibility is the reason sterilisation is only for those who want no more children — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('periodic-ar', ar({
  a: 'Periodic abstinence has a high failure rate.',
  r: 'Ovulation always occurs on exactly day 14 of every woman’s cycle.',
  key: 'c',
  sol: 'A is true. R is false: the day of ovulation varies between women and between cycles, which is exactly why the fertile days are hard to predict and the method often fails — option (c).',
  d: 3, c: 'analysis', t: [2],
}));
{
  const D = doublingSeries(100, 3.5, 20).doubling;
  add('doubling-num', num({
    stem: 'A town’s population grows at a steady 3.5 percent per year. Using $t = \\dfrac{\\ln 2}{\\ln(1 + r)}$ with $r = 0.035$, find the doubling time to the nearest whole year.',
    value: D,
    sol: r`$t = \dfrac{\ln 2}{\ln 1.035} = \dfrac{0.6931}{0.0344} \approx 20.1$. To the nearest whole year, $t = ${D}$ years.`,
    scheme: [[`${D} years`, 1]],
    d: 4, c: 'application', t: [2],
  }), (q) => q.answer.value === Math.round(Math.log(2) / Math.log(1.035)) || 'value');
}
{
  const FW = fertileWindow(28);
  add('fertile-num', num({
    stem: 'A woman with regular 28-day cycles starts her period on 5 August (day 1). Under the periodic abstinence method, on which date in August does the fertile period begin? Give the date as a number.',
    value: 5 + FW.from - 1,
    sol: r`The fertile period begins on day ${FW.from}. Day 1 is 5 August, so day ${FW.from} is $5 + (${FW.from} - 1) = ${5 + FW.from - 1}$ August.`,
    scheme: [[`${5 + FW.from - 1} August`, 1]],
    d: 3, c: 'application', t: [2],
  }), (q) => q.answer.value === 14 || 'date');
}
{
  const P = Math.round(grow(1.2, 1.5, 10) * 100) / 100;
  add('population-num', num({
    stem: 'A population of 1.2 billion grows at a steady 1.5 percent per year. What will it be after 10 years, in billions, to two decimal places?',
    value: P, tol: 0.01, unit: 'billion',
    sol: r`$1.2 \times (1.015)^{10} = 1.2 \times 1.1605 \approx ${P}$ billion.`,
    scheme: [[`${P} billion`, 1]],
    d: 4, c: 'application', t: [2],
  }), (q) => Math.abs(q.answer.value - 1.2 * 1.015 ** 10) < 0.01 || 'value');
}
add('method-match', match({
  stem: 'Match each contraceptive (column I) with how it works (column II).',
  pairs: [
    ['Lippes loop', 'Increases phagocytosis of sperms in the uterus'],
    ['CuT', 'Copper ions suppress sperm motility'],
    ['Oral pills', 'Inhibit ovulation and implantation'],
    ['Vasectomy', 'Blocks the transport of sperms'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Lippes loop → phagocytosis; CuT → copper ions; pills → inhibit ovulation and implantation; vasectomy → blocks sperm transport.',
  d: 2, c: 'understanding', t: [2],
}));
add('pill-date-num', num({
  stem: 'A woman starts a new 21-day pack of oral contraceptive pills on 3 March, taking one pill each day. On which date in March does she take the last pill of the pack? Give the date as a number.',
  value: 3 + 21 - 1,
  sol: r`The pack covers 21 days counting the first: last day $= 3 + 21 - 1 = 23$ March. A 7-day gap follows.`,
  scheme: [['23 March', 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 23 || 'date');
add('marriage-tf', tf({
  stem: 'In India, the legal minimum age of marriage is 18 years for both males and females.',
  key: 'f',
  sol: 'False. It is 18 years for females and 21 years for males.',
  d: 1, c: 'recall', t: [2],
}));
add('iud-short', short({
  marks: 2,
  stem: 'A woman wants to space the birth of her second child by about three years and prefers a method she need not remember daily. Suggest a suitable method and explain how it works.',
  model: 'A **copper IUD** such as CuT or Multiload 375, inserted by a doctor or expert nurse. It increases **phagocytosis of sperms** in the uterus, and its **copper ions suppress sperm motility and fertilising capacity**. It is reversible: fertility returns once it is removed, so it suits spacing.',
  sol: 'IUD for spacing; copper action; reversible.',
  scheme: [['Suitable method (IUD) with reason it suits spacing', 1], ['How it works', 1]],
  d: 3, c: 'application', t: [2],
}));
add('pill-short', short({
  marks: 2,
  stem: 'Describe how oral contraceptive pills are taken and give two ways in which they prevent pregnancy.',
  model: 'They are taken **daily for 21 days**, starting preferably within the **first five days** of the cycle, followed by a **gap of 7 days** (during which menstruation occurs), and then repeated. They **inhibit ovulation and implantation** and **alter the quality of cervical mucus** so that sperm entry is retarded.',
  sol: 'Schedule; actions.',
  scheme: [['21 days, start in first 5 days, 7-day gap', 1], ['Two actions', 1]],
  d: 2, c: 'recall', t: [2],
}));
add('population-short', short({
  marks: 2,
  stem: 'Give two reasons for the rapid growth of India’s population after Independence.',
  model: 'A **rapid decline in the death rate**, including the **maternal mortality rate** and the **infant mortality rate**, due to better health care; and an **increase in the number of people in the reproductive age group**, so more births each year.',
  sol: 'Falling death rates; more people of reproductive age.',
  scheme: [['Decline in death rate, MMR or IMR', 1], ['More people of reproductive age', 1]],
  d: 2, c: 'recall', t: [2],
}));
add('natural-short', short({
  marks: 3,
  stem: 'Describe three natural methods of contraception and state one reason why they have a high failure rate.',
  model: '1. **Periodic abstinence:** couples avoid coitus from day 10 to day 17 of the cycle, when ovulation is expected.\n\n2. **Withdrawal (coitus interruptus):** the male withdraws before ejaculation so semen is not released into the vagina.\n\n3. **Lactational amenorrhea:** during intense full breastfeeding after birth, ovulation does not occur; reliable only up to about six months.\n\nThey fail often because ovulation timing can shift and the methods depend on perfect, consistent practice.',
  sol: 'Three methods plus a reason for failure.',
  scheme: [['Periodic abstinence', 1], ['Withdrawal and lactational amenorrhea', 1], ['Reason for high failure rate', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('mtp-short', short({
  marks: 3,
  stem: 'What is medical termination of pregnancy? When was it legalised in India and why? State when it is safest and one way in which it is misused.',
  model: 'MTP is the **intentional or voluntary termination of pregnancy before full term**, done by registered medical practitioners. India **legalised it in 1971** with strict conditions, to reduce **unsafe, illegal abortions** and the deaths and illness of mothers they caused. It is **safest in the first trimester** (up to 12 weeks). It is misused for **female foeticide** after illegal sex determination, which is a crime.',
  sol: 'Definition; 1971 and reason; first trimester; misuse.',
  scheme: [['Definition', 1], ['Legalised in 1971 to check unsafe abortions', 1], ['Safest in the first trimester; misuse for female foeticide', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('counsel-short', short({
  marks: 3,
  stem: 'A counsellor meets three couples: couple A wants to delay their first child by two years; couple B wants to avoid pregnancy and also be protected from STIs; couple C has two children and is sure they want no more. Suggest one suitable method for each, with a reason.',
  model: '**A:** oral pills or an IUD — effective and **reversible**, so they can have a child later.\n\n**B:** **condoms** — a barrier that prevents pregnancy and also reduces the risk of **STIs**.\n\n**C:** **sterilisation**, preferably **vasectomy** (simpler) or tubectomy — highly effective and suited to those who want no more children, since reversibility is very poor.',
  sol: 'Match each need to reversibility, STI protection or permanence.',
  scheme: [['A: reversible method with reason', 1], ['B: condoms with reason', 1], ['C: sterilisation with reason', 1]],
  d: 3, c: 'application', t: [2],
}));
add('contra-long', long({
  stem: 'Classify the methods of contraception, giving one example and the mode of action of each class.',
  model: '**Natural methods** — for example, **periodic abstinence**: coitus is avoided from day 10 to day 17 of the cycle, so the ovum and sperms do not meet; lactational amenorrhea and withdrawal are others.\n\n**Barrier methods** — for example, **condoms**, diaphragms and cervical caps: they physically prevent the ovum and sperms from meeting; condoms also protect against STIs.\n\n**Intrauterine devices** — for example, **CuT**: they increase phagocytosis of sperms; copper ions suppress sperm motility, and hormone-releasing IUDs make the uterus unsuitable for implantation.\n\n**Oral, injectable and implant methods** — for example, **pills**: they inhibit ovulation and implantation and alter cervical mucus.\n\n**Surgical methods** — **vasectomy** or **tubectomy**: a part of the vas deferens or fallopian tube is removed or tied, blocking gamete transport; very poorly reversible.',
  sol: 'Five classes with an example and mode of action each.',
  scheme: [['Natural', 1], ['Barrier', 1], ['IUDs', 1], ['Oral, injectable, implants', 1], ['Surgical', 1]],
  wl: [80, 170],
  d: 3, c: 'understanding', t: [2],
}));
add('steril-long', long({
  stem: 'A village elder says, “Once a family has enough children, the woman should have an operation; that is the only option.” Evaluate this statement using your knowledge of contraceptive methods.',
  model: '**What is right.** Sterilisation is a highly effective terminal method for couples who are sure they want no more children, because its reversibility is very poor.\n\n**What is wrong.** (1) It is not only the woman’s responsibility: **vasectomy**, a small operation on the man in which a part of the vas deferens is removed or tied through a small incision on the scrotum, is simpler than **tubectomy**, which needs an incision in the abdomen or vagina. (2) It is not the only option: couples can use **IUDs**, **pills**, **injections or implants**, or **condoms**, which are effective and reversible; condoms also protect against STIs.\n\n**Judgement.** The statement is only partly correct. The choice should be made by both partners after counselling, considering health, side effects and whether they might want children later.',
  sol: 'Credit for sterilisation’s effectiveness; correct the gender bias and the claim that it is the only option; judgement.',
  scheme: [['Sterilisation is effective and suits those wanting no more children', 1], ['Vasectomy is an option and is simpler', 1], ['Reversible alternatives exist', 1], ['Shared decision after counselling', 1], ['Clear overall judgement', 1]],
  wl: [80, 160],
  d: 4, c: 'evaluation', t: [2],
}));

// ---------------------------------------------------------------- t03 amniocentesis, infertility, ART
add('amnio-mcq', mcq({
  stem: 'What is the proper medical purpose of amniocentesis?',
  right: 'To test foetal cells in the amniotic fluid for genetic and chromosomal disorders',
  wrong: ['To find the sex of the foetus so parents can choose', 'To deliver the baby early', 'To fertilise an ovum outside the body'],
  sol: 'Amniocentesis examines cells in the amniotic fluid for genetic disorders and chromosomal abnormalities; its use for sex determination is banned — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('gift-mcq', mcq({
  stem: 'In GIFT, what is transferred, and where?',
  right: 'An ovum from a donor, into the fallopian tube',
  wrong: ['A zygote, into the uterus', 'A sperm, directly into the ovum', 'Semen, into the uterus'],
  sol: 'Gamete intra fallopian transfer places a donor ovum into the fallopian tube of a woman who cannot produce ova but can provide a suitable environment — option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('icsi-ar', ar({
  a: 'In ICSI, a sperm is injected directly into the ovum.',
  r: 'ICSI helps couples in whom sperms cannot fertilise the ovum on their own.',
  key: 'a',
  sol: 'Both are true. Injecting the sperm directly bypasses the step that the sperms cannot achieve themselves, so R explains why ICSI is done this way — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('zift-mcq', mcq({
  stem: 'An embryo with 6 blastomeres has been formed in the laboratory. How should it be transferred?',
  right: 'By ZIFT, into the fallopian tube',
  wrong: ['By IUT, into the uterus', 'By GIFT, into the fallopian tube', 'By IUI, into the uterus'],
  sol: 'Zygotes or early embryos with up to 8 blastomeres are transferred into the fallopian tube by ZIFT — option (@K).',
  d: 2, c: 'application', t: [3],
}), (q) => transferRoute(6) === 'ZIFT' && q.options.find((o) => o.id === q.answer.option_ids[0]).text_md.startsWith('By ZIFT') || 'route');
add('iui-mcq', mcq({
  stem: 'Tests show that a man produces normal sperms but in very low numbers, while his wife’s reproductive system is normal. Which simple technique is most suitable first?',
  right: 'Intra-uterine insemination with the husband’s semen',
  wrong: ['GIFT with a donor ovum', 'Amniocentesis', 'Tubectomy'],
  sol: 'Artificial insemination (IUI) places the semen directly in the uterus, helping when the sperm count is very low — option (@K). GIFT treats a woman who cannot produce ova.',
  d: 3, c: 'application', t: [3],
}));
add('blocked-tubes-mcq', mcq({
  stem: 'A woman produces healthy ova but both her fallopian tubes are blocked; her husband’s sperms are normal. Which technique is most suitable?',
  right: 'IVF, followed by transfer of the embryo into the uterus (IUT)',
  wrong: ['ZIFT into the fallopian tube', 'GIFT with a donor ovum', 'Intra-uterine insemination'],
  sol: 'With blocked tubes, sperms and ova cannot meet and nothing can be placed in the tubes, so fertilisation must take place in the laboratory and the embryo must go into the uterus — option (@K). ZIFT and GIFT need open tubes; IUI still needs the gametes to meet in the tube.',
  d: 4, c: 'analysis', t: [3],
}));
add('donor-mcq', mcq({
  stem: 'Tests show that a woman’s ovaries do not release any ova, but her fallopian tubes and uterus are healthy. Her husband’s sperms are normal. Which technique lets fertilisation take place inside her own body?',
  right: 'GIFT, with an ovum from a donor',
  wrong: ['ZIFT, with her own zygote', 'Intra-uterine insemination alone', 'ICSI with her own ovum'],
  sol: 'She has no ova of her own, so a donor ovum is needed; in GIFT the ovum is placed in her fallopian tube, where fertilisation and development occur naturally — option (@K). ZIFT, IUI and ICSI with her own ovum all need her ova.',
  d: 3, c: 'application', t: [3],
}));
add('infertility-tf', tf({
  stem: 'Infertility in a couple is always due to a defect in the female partner.',
  key: 'f',
  sol: 'False. Infertility may be due to the male or the female partner, from physical, congenital, disease, drug, immunological or psychological causes.',
  d: 1, c: 'recall', t: [3],
}));
add('amnio-ban-ar', ar({
  a: 'There is a statutory ban on the use of amniocentesis for sex determination.',
  r: 'Amniocentesis can detect chromosomal abnormalities in the foetus.',
  key: 'b',
  sol: 'Both are true, but the ban exists because the test was misused to determine sex and led to female foeticide; detecting chromosomal disorders is its proper use and does not explain the ban — option (b).',
  d: 3, c: 'analysis', t: [3],
}));
add('art-match', match({
  stem: 'Match each technique (column I) with its description (column II).',
  pairs: [
    ['ZIFT', 'Zygote or embryo with up to 8 blastomeres into the fallopian tube'],
    ['IUT', 'Embryo with more than 8 blastomeres into the uterus'],
    ['GIFT', 'Donor ovum into the fallopian tube'],
    ['ICSI', 'Sperm injected directly into the ovum'],
  ],
  order: [3, 1, 0, 2],
  sol: 'ZIFT — early embryo into the tube; IUT — older embryo into the uterus; GIFT — donor ovum into the tube; ICSI — sperm into the ovum.',
  d: 2, c: 'recall', t: [3],
}));
add('iut-num', num({
  stem: 'What is the largest number of blastomeres an embryo can have and still be transferred by ZIFT rather than IUT?',
  value: 8,
  sol: 'ZIFT is used for a zygote or early embryo with up to 8 blastomeres; with more than 8, IUT is used. So the largest is 8.',
  scheme: [['8', 1]],
  d: 2, c: 'understanding', t: [3],
}), (q) => transferRoute(q.answer.value) === 'ZIFT' && transferRoute(q.answer.value + 1) === 'IUT' || 'boundary');
add('iut-fill', fill({
  stem: 'Transfer of an embryo with more than 8 blastomeres into the uterus is called ______.',
  acc: [['IUT', 'intra uterine transfer', 'intra-uterine transfer']],
  sol: 'IUT (intra uterine transfer).',
  d: 1, c: 'recall', t: [3],
}));
add('ivf-short', short({
  marks: 2,
  stem: 'What is meant by IVF with embryo transfer? Why is it popularly called the “test tube baby” programme?',
  model: '**In vitro fertilisation** is fertilisation **outside the body**, in laboratory conditions like those in the body; the zygote or embryo formed is then **transferred** into the fallopian tube or uterus. It is called a test tube baby programme because **fertilisation happens in the laboratory**, not inside the mother.',
  sol: 'Fertilisation outside the body, then transfer; laboratory fertilisation.',
  scheme: [['Fertilisation outside the body, then embryo transfer', 1], ['Reason for the popular name', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('amnio-short', short({
  marks: 3,
  stem: 'What is amniocentesis? Give its proper use and explain why its misuse is harmful to society.',
  model: 'Amniocentesis is a foetal test in which a small sample of **amniotic fluid**, containing cells shed by the foetus, is taken and examined. Its proper use is to detect **genetic disorders and chromosomal abnormalities** in the foetus. Its misuse to determine the **sex** of the foetus has led to **female foeticide**, lowering the child sex ratio and harming girls and society; hence a statutory ban.',
  sol: 'Definition; use; misuse and its effect.',
  scheme: [['Definition', 1], ['Proper use', 1], ['Misuse, female foeticide, effect on society', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('art-short', short({
  marks: 3,
  stem: 'Suggest a suitable assisted reproductive technique for each case, with a reason: (a) a woman who cannot produce ova but has normal fallopian tubes and uterus; (b) sperms that cannot penetrate the ovum on their own; (c) a husband who is unable to inseminate.',
  model: '(a) **GIFT** — a donor ovum is transferred into her fallopian tube, where fertilisation and development can occur naturally.\n\n(b) **ICSI** — a sperm is injected directly into the ovum in the laboratory, bypassing the step the sperms cannot achieve.\n\n(c) **Artificial insemination (IUI)** — his semen is collected and introduced into the vagina or uterus of the wife.',
  sol: 'Locate the problem, then choose the technique that bypasses it.',
  scheme: [['(a) GIFT with reason', 1], ['(b) ICSI with reason', 1], ['(c) AI/IUI with reason', 1]],
  d: 3, c: 'application', t: [3],
}));
add('adoption-short', short({
  marks: 2,
  stem: 'Give two limitations of assisted reproductive technologies, and one reason why legal adoption is a good option for couples wanting parenthood.',
  model: 'ART needs **highly specialised professionals and costly equipment**, so it is available only in a few centres and to relatively few people; **emotional, religious and social factors** also deter some couples. **Adoption** gives a loving home to an orphaned or destitute child and is permitted by Indian law.',
  sol: 'Cost and availability; social factors; adoption.',
  scheme: [['Two limitations', 1], ['Reason for adoption', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('art-long', long({
  stem: 'Describe the assisted reproductive technologies IVF–ET (with ZIFT and IUT), GIFT, ICSI and artificial insemination, stating the problem each one helps with.',
  model: '**IVF–ET.** Ova from the wife or a donor and sperms from the husband or a donor are collected and fertilised in the laboratory in conditions similar to those in the body. The zygote or early embryo with up to 8 blastomeres is transferred into the fallopian tube (ZIFT); an embryo with more than 8 blastomeres is transferred into the uterus (IUT). It helps when the gametes cannot meet in the body, for example with blocked tubes (IUT).\n\n**GIFT.** An ovum collected from a donor is transferred into the fallopian tube of a woman who cannot produce ova but can provide a suitable environment for fertilisation and development.\n\n**ICSI.** A sperm is injected directly into the ovum to form an embryo in the laboratory; it helps when sperms cannot fertilise the ovum on their own.\n\n**Artificial insemination.** Semen from the husband or a donor is introduced into the vagina or into the uterus (IUI); it helps when the male cannot inseminate or has a very low sperm count.',
  sol: 'Four techniques, each with what is done and the problem it solves.',
  scheme: [['IVF in the laboratory', 1], ['ZIFT and IUT with the 8-blastomere rule', 1], ['GIFT', 1], ['ICSI', 1], ['AI / IUI', 1]],
  wl: [80, 170],
  d: 3, c: 'understanding', t: [3],
}));
add('infertility-long', long({
  stem: 'A couple has been unable to have a child for four years, and relatives blame the wife. As a counsellor, explain to the family the possible causes of infertility, how a clinic would proceed, and the options available. Comment on the relatives’ attitude.',
  model: '**Causes.** Infertility can be due to physical, congenital, disease-related, drug-related, immunological or psychological causes, and it can lie with **either partner**; for example, blocked oviducts in the woman or a very low sperm count in the man.\n\n**How a clinic proceeds.** Both partners are examined in a specialised health care unit. Some causes can be treated and corrected.\n\n**Options.** If treatment is not possible, assisted reproductive technologies can help: IVF with embryo transfer (ZIFT or IUT), GIFT, ICSI or artificial insemination, chosen according to the cause. These are costly and available in few centres. **Legal adoption** of an orphaned or destitute child is another excellent path to parenthood.\n\n**Attitude.** Blaming the wife is unscientific and unfair; it causes distress and may delay the couple from getting tested together. The family should support both partners.',
  sol: 'Causes in either partner; clinic steps; ART and adoption; critique of blame.',
  scheme: [['Causes, in either partner', 1], ['Diagnosis and treatment in a clinic', 1], ['ART options matched to causes', 1], ['Adoption as an option', 1], ['Reasoned comment on the relatives’ attitude', 1]],
  wl: [80, 170],
  d: 4, c: 'evaluation', t: [3],
}));

// ---------------------------------------------------------------- cases
add('sti-case', mk.case({
  passage: 'A district hospital reviewed the sexually transmitted infections diagnosed in one year.\n\n| Infection | Cases | Patients who came only after complications began |\n|---|---|---|\n| Gonorrhoea | 90 | 30 |\n| Syphilis | 40 | 14 |\n| Chlamydiasis | 35 | 16 |\n| Genital herpes | 30 | 6 |\n| Hepatitis-B | 25 | 9 |\n| Total | 220 | 75 |\n\nMost patients were between 15 and 24 years old.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which group lists only infections that can be completely cured if detected early?',
      right: 'Gonorrhoea, syphilis and chlamydiasis',
      wrong: ['Genital herpes and hepatitis-B', 'Gonorrhoea, genital herpes and syphilis', 'Hepatitis-B, chlamydiasis and syphilis'],
      sol: 'Genital herpes and hepatitis-B (and HIV) are not completely curable; gonorrhoea, syphilis and chlamydiasis are — option (@K).',
      d: 2, c: 'understanding', t: [1],
    })),
    part('b', num({
      stem: 'What percentage of all the cases were infections that are not completely curable? Give the nearest whole number.',
      value: 25, unit: '%',
      sol: r`Not completely curable: genital herpes + hepatitis-B $= 30 + 25 = 55$. Percentage $= \dfrac{55}{220} \times 100 = 25$ percent.`,
      scheme: [['25%', 1]],
      d: 3, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'About one-third of the patients came only after complications began. Suggest two reasons for this delay and one complication it can cause.',
      model: 'Early symptoms are often **mild or absent**, so they are ignored, and **embarrassment or social stigma** stops people from seeing a doctor. The delay can lead to complications such as **pelvic inflammatory disease, ectopic pregnancy or infertility**.',
      sol: 'Mild symptoms and stigma; a complication.',
      scheme: [['Two reasons for delay', 1], ['One complication', 1]],
      d: 3, c: 'analysis', t: [1],
    }), [
      short({
        marks: 2,
        stem: 'Plan two messages for a campaign aimed at 15–24-year-olds in this district, and explain why each would help.',
        model: '1. **“Use a condom every time; avoid unknown or multiple partners.”** — this reduces exposure to infection.\n\n2. **“Mild itching or discharge? See a qualified doctor early — it is curable and confidential.”** — this tackles embarrassment and leads to early cure before complications.',
        sol: 'Prevention message and early-treatment message with reasons.',
        scheme: [['Prevention message with reason', 1], ['Early-treatment message with reason', 1]],
        d: 3, c: 'application', t: [1],
      }),
    ]),
  ],
}), (q) => q.children[1].answer.value === Math.round(((30 + 25) / 220) * 100) || 'percent');

add('clinic-case', mk.case({
  passage: 'A family planning clinic in Bhopal sees three women on the same morning.\n\n- **Meena** gave birth two months ago and is breastfeeding her baby fully; she has not had a period since.\n- **Ritu** married recently and wants to delay her first child by about two years; she would also like protection from infections.\n- **Sunita** has two children; she and her husband are sure they want no more.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which method suits Sunita’s family if they want a permanent method?',
      right: 'Sterilisation: vasectomy for her husband or tubectomy for her',
      wrong: ['Periodic abstinence', 'Emergency contraceptive pills every month', 'Lactational amenorrhea'],
      sol: 'Sterilisation is a terminal method for couples sure they want no more children; vasectomy is the simpler operation — option (@K).',
      d: 2, c: 'application', t: [2],
    })),
    part('b', short({
      marks: 1,
      stem: 'Name the natural method of contraception that Meena is currently relying on.',
      model: '**Lactational amenorrhea**: no ovulation during intense full breastfeeding.',
      sol: 'Absence of menstruation during full breastfeeding.',
      scheme: [['Lactational amenorrhea', 1]],
      d: 2, c: 'understanding', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Suggest one suitable method for Ritu and explain why it meets both her needs.',
      model: '**Condoms.** They are a reversible barrier method, so she can plan a child after two years, and they also **reduce the risk of STIs**, which other methods such as pills or IUDs do not.',
      sol: 'Condom: reversible plus STI protection.',
      scheme: [['Condoms', 1], ['Reversible and protects against STIs', 1]],
      d: 3, c: 'application', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'Explain why the counsellor advises Meena to start another method within the next few months.',
        model: 'Lactational amenorrhea is reliable only for up to about **six months** after delivery and only while breastfeeding is **intense and full**. As the baby starts other foods, ovulation can resume **before** her first period, so she could become pregnant without warning; she needs another method, such as an IUD or condoms.',
        sol: 'Six-month limit; ovulation may return before menstruation.',
        scheme: [['Reliable only up to about six months with full breastfeeding', 1], ['Ovulation can resume unnoticed; another method needed', 1]],
        d: 3, c: 'analysis', t: [2],
      }),
    ]),
  ],
}));

add('ivf-case', mk.case({
  passage: 'In an IVF laboratory, four embryos from different couples are ready for transfer.\n\n| Embryo | Age (days) | Blastomeres |\n|---|---|---|\n| P | 2 | 4 |\n| Q | 3 | 8 |\n| R | 4 | 16 |\n| S | 5 | about 64 (blastocyst) |',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which embryos can be transferred by ZIFT?',
      right: 'P and Q',
      wrong: ['P only', 'R and S', 'Q, R and S'],
      sol: 'ZIFT is used for embryos with up to 8 blastomeres: P (4) and Q (8) — option (@K).',
      d: 2, c: 'application', t: [3],
    })),
    part('b', num({
      stem: 'How many of the four embryos would be transferred into the uterus by IUT?',
      value: 2,
      sol: 'IUT is used for more than 8 blastomeres: R (16) and S (about 64), so 2 embryos.',
      scheme: [['2', 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why early embryos are placed in the fallopian tube but older embryos are placed in the uterus.',
      model: 'The transfer copies the **natural timetable**: in the body, the zygote divides by cleavage while still in the **fallopian tube**, and only the older morula or blastocyst reaches the **uterus** to implant. Placing each embryo where it would naturally be gives it the most suitable environment.',
      sol: 'Mimic the natural location for each stage.',
      scheme: [['Early cleavage normally happens in the tube', 1], ['Older embryos naturally reach the uterus to implant', 1]],
      d: 3, c: 'analysis', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'How does GIFT differ from ZIFT?',
        model: 'In **GIFT**, an **ovum (a gamete)** from a donor is placed in the fallopian tube, and **fertilisation happens inside** the woman’s body. In **ZIFT**, fertilisation has **already happened in the laboratory**, and a **zygote or early embryo** is placed in the tube.',
        sol: 'Gamete vs zygote; fertilisation inside vs outside.',
        scheme: [['What is transferred differs', 1], ['Where fertilisation happens differs', 1]],
        d: 3, c: 'analysis', t: [3],
      }),
    ]),
  ],
}), (q) => q.children[1].answer.value === [4, 8, 16, 64].filter((n) => transferRoute(n) === 'IUT').length || 'count');
