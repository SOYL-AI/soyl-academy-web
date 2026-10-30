// ISC 12 Biology ch04 Reproductive Health — two decks: Part 1 (t01–t02), Part 2 (t03–t05).
import { sl, deck, table, flow, svgV, r } from '../../isc-12-biology-ch01/src/lib.mjs';
import { IUD, STERIL, AMNIO, GROWTH, CALENDAR } from './svgs.mjs';
import { doublingSeries, grow, fertileWindow, transferRoute, pillCycle } from './calc.mjs';

export const V = {
  iud: svgV(IUD, 'A copper-releasing T-shaped IUD placed in the uterus with threads through the cervix'),
  steril: svgV(STERIL, 'Vasectomy and tubectomy: a small part of the vas deferens or oviduct is cut and tied'),
  amnio: svgV(AMNIO, 'Amniocentesis: a fine needle draws amniotic fluid containing foetal cells'),
  growth: svgV(GROWTH, 'Population growing at a constant rate doubles about every 35 years'),
  calendar: svgV(CALENDAR, 'A 28-day calendar with the fertile period from day 10 to day 17 and ovulation on day 14'),
};

// ---------------------------------------------------------------- computed numbers
const DS = doublingSeries(100, 2, 105);
const FW = fertileWindow(30);
const PILL = pillCycle();
const P2 = Math.round(grow(140, 1, 10));

export const deck1 = deck({
  part: 1,
  title: 'Reproductive Health — Part 1: Programmes, population and contraception',
  goals: [
    'Define reproductive health and describe India’s programmes',
    'Explain population explosion and the government’s role',
    'Describe natural, barrier, IUD, hormonal and surgical methods of contraception and their modes of action',
  ],
  slides: [
    sl('title', 'Reproductive Health', {
      b: 'Part 1 — a healthy society needs people who are healthy in every aspect of reproduction.',
      v: flow('LR', [['p', 'Physical'], ['e', 'Emotional'], ['b', 'Behavioural'], ['s', 'Social'], ['h', 'Reproductive health']], [['p', 'h'], ['e', 'h'], ['b', 'h'], ['s', 'h']], 'Flow showing four aspects that make up reproductive health'),
      n: 'According to the World Health Organisation, reproductive health means total well-being in all aspects of reproduction: physical, emotional, behavioural and social. A society with people who have physically and functionally normal reproductive organs and normal interactions is reproductively healthy.',
    }),
    sl('concept', 'Programmes in India', {
      b: 'India was among the first countries to start national programmes for reproductive health.',
      v: table(['Programme or action', 'Detail'], [['Family planning', 'Initiated in 1951 and periodically assessed'], ['Reproductive and Child Health Care (RCH)', 'Wider reproduction-related areas'], ['Awareness', 'Audio-visual and print media; sex education in schools to give correct information and discourage myths'], ['Services', 'Medical help for problems such as pregnancy, delivery, STDs, abortions, contraception, menstrual problems and infertility'], ['Statutory steps', 'Ban on amniocentesis for sex determination to check female foeticide; mass immunisation']], 'Table of reproductive health programmes and actions in India'),
      n: 'These programmes aim to create awareness, provide medical help and build a reproductively healthy society. Research and better health care have led to lower maternal and infant mortality, more medically assisted deliveries and better post-natal care.',
    }),
    sl('diagram', 'Population explosion', {
      b: 'India’s population was about **350 million** at independence, reached **1 billion** by 2000 and **1.2 billion** in 2011. Rapid decline in death rate, maternal mortality rate (MMR) and infant mortality rate (IMR), and an increase in people of reproducible age, caused this rise.',
      v: V.growth,
      n: 'A population that grows at a steady rate keeps doubling in fixed periods of time. At about two percent a year, numbers double roughly every thirty-five years. Such growth strains food, housing, water and other basic needs.',
    }),
    sl('example', 'Worked example 1: doubling time', {
      b: 'A population of 100 grows at 2 percent a year. In about how many years will it double, and what will it be after 105 years?',
      ul: [
        r`Doubling time $= \dfrac{\ln 2}{\ln 1.02} \approx ${DS.exact.toFixed(1)}$, about **${DS.doubling} years**.`,
        r`105 years is about three doublings: $100 \times 2^3 = 800$ (exactly $100 \times 1.02^{105} \approx ${Math.round(grow(100, 2, 105))}$).`,
      ],
      v: table(['Years', 'Population'], [['0', '100'], [String(DS.doubling), 'about 200'], [String(2 * DS.doubling), 'about 400'], [String(3 * DS.doubling), 'about 800']], `Worked table: doubling about every ${DS.doubling} years`),
      n: 'At two percent a year, the population doubles about every thirty-five years. In one hundred and five years it doubles three times, so one hundred becomes about eight hundred. Small yearly rates make very large numbers over a lifetime.',
    }),
    sl('concept', 'The government’s role', {
      b: 'The government encourages smaller families through motivation and law.',
      v: table(['Measure', 'Detail'], [['Contraception', 'Motivating smaller families by using contraceptive methods'], ['Slogan', '“Hum Do Hamare Do” (we two, our two); many young couples now adopt a one-child norm'], ['Legal marriageable age', 'Raised to 18 years for females and 21 years for males'], ['Incentives', 'Given to couples with small families']], 'Table of government measures against population explosion'),
      n: 'Raising the legal marriageable age delays the start of families, and incentives reward couples who keep their families small. The most important tool, however, is contraception.',
    }),
    sl('concept', 'Natural and barrier methods', {
      b: 'An ideal contraceptive is user-friendly, easily available, effective, reversible, with no or least side-effects, and does not interfere with sexual drive or the sexual act.',
      v: table(['Method', 'Mode of action'], [['Periodic abstinence', 'Avoiding coitus from day 10 to 17 of the cycle, when ovulation is expected'], ['Withdrawal (coitus interruptus)', 'Male withdraws before ejaculation, avoiding insemination'], ['Lactational amenorrhea', 'No ovulation while the mother breast-feeds fully, up to about six months after parturition'], ['Condoms (male and female)', 'Barrier: prevent sperms from meeting the ovum; also protect against STDs'], ['Diaphragms, cervical caps, vaults', 'Rubber barriers that cover the cervix; reusable; spermicidal creams and jellies increase effectiveness']], 'Table of natural and barrier methods with modes of action'),
      n: 'Natural methods avoid meeting of the ovum and sperm and have no side-effects, but their failure rate is high. Condoms are popular because they also protect the user from sexually transmitted diseases.',
    }),
    sl('diagram', 'The fertile period', {
      b: 'In a 28-day cycle, ovulation is expected around **day 14**. The chances of fertilisation are high from **day 10 to day 17**, so couples avoiding conception abstain during this period.',
      v: V.calendar,
      n: 'Periodic abstinence depends on knowing when ovulation is likely. Because cycles vary, the method is not very reliable, but it costs nothing and has no side-effects.',
    }),
    sl('example', 'Worked example 2: a longer cycle', {
      b: `A woman’s cycles are regularly ${FW.ovulation + 14} days long. Ovulation occurs about 14 days before the next period. Which days form her fertile period, using the same rule as days 10–17 of a 28-day cycle?`,
      ul: [
        r`Ovulation $= ${FW.ovulation + 14} - 14 = $ day ${FW.ovulation}.`,
        r`Fertile period: day ${FW.ovulation} $- 4 =$ **day ${FW.from}** to day ${FW.ovulation} $+ 3 =$ **day ${FW.to}**.`,
      ],
      v: table(['Cycle length', 'Ovulation', 'Fertile period'], [['28 days', 'Day 14', 'Days 10–17'], [`${FW.ovulation + 14} days`, `Day ${FW.ovulation}`, `Days ${FW.from}–${FW.to}`]], `Worked table: fertile period days ${FW.from}–${FW.to}`),
      n: 'The time after ovulation is fairly constant at about fourteen days, so in a thirty-day cycle ovulation is near day sixteen. Counting four days before and three after gives days twelve to nineteen.',
    }),
    sl('diagram', 'Intrauterine devices', {
      b: '**IUDs** are inserted by doctors or trained nurses into the uterus through the vagina. Types: **non-medicated** (Lippes loop), **copper-releasing** (CuT, Cu7, Multiload 375) and **hormone-releasing** (Progestasert, LNG-20).',
      v: V.iud,
      n: 'IUDs increase phagocytosis of sperms within the uterus. Copper ions released suppress sperm motility and fertilising capacity. Hormone-releasing IUDs make the uterus unsuitable for implantation and the cervix hostile to sperms. They are ideal for women who want to delay pregnancy or space children.',
    }),
    sl('concept', 'Hormonal methods', {
      b: 'Small doses of **progestogens** or **progestogen–estrogen** combinations are used by females as **pills**, **injections** or **implants** under the skin.',
      v: table(['Method', 'Detail and action'], [['Oral pills', `Taken daily for ${PILL.on} days, starting within the first five days of the cycle; after a gap of ${PILL.off} days, repeated. They inhibit ovulation and implantation and alter cervical mucus to retard sperms`], ['Saheli', 'A once-a-week, non-steroidal pill developed by CDRI, Lucknow'], ['Injections and implants', 'Same mode of action; effective for much longer'], ['Emergency contraception', 'Progestogens, combinations or an IUD within 72 hours of unprotected coitus']], 'Table of hormonal methods with their action'),
      n: 'Hormonal pills are very effective with fewer side-effects. They work by stopping ovulation and implantation and by making cervical mucus hostile to sperms. Emergency methods within seventy-two hours can be used after rape or unprotected intercourse.',
    }),
    sl('diagram', 'Surgical methods', {
      b: '**Sterilisation** is a terminal method for those who want no more children. **Vasectomy**: a small part of the **vas deferens** is removed or tied up through a small incision on the scrotum. **Tubectomy**: a small part of the **fallopian tube** is removed or tied up through a small incision in the abdomen or through the vagina.',
      v: V.steril,
      n: 'Surgical methods block the transport of gametes, preventing conception. They are highly effective, but their reversibility is very poor.',
    }),
    sl('check', 'Quick check: copper IUD', {
      b: 'How does a copper-releasing IUD prevent conception?',
      n: 'Quick check. What do copper ions do to sperms?',
      chk: 'copper-mcq',
    }),
    sl('check', 'Quick check: pills', {
      b: 'Judge the assertion and the reason about oral contraceptive pills.',
      n: 'Quick check. Think about ovulation and cervical mucus.',
      chk: 'pill-ar',
    }),
    sl('check', 'Quick check: sterilisation', {
      b: 'Which structure is cut and tied in vasectomy?',
      n: 'Quick check. It carries sperms from the epididymis.',
      chk: 'vasectomy-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Reproductive health: total well-being in physical, emotional, behavioural and social aspects of reproduction (WHO).',
        'Family planning (1951), RCH; awareness, services, ban on sex-determination amniocentesis.',
        'Population explosion: 350 million (1947) to 1.2 billion (2011); falling death rate, MMR and IMR.',
        'Government: contraception, small-family norm, marriageable age 18 (F) and 21 (M), incentives.',
        'Contraception: natural, barrier, IUDs, pills (Saheli), injections and implants, emergency methods, sterilisation.',
      ],
      v: table(['Method', 'Main action'], [['Barrier', 'Stops sperm meeting ovum'], ['Copper IUD', 'Suppresses sperm motility'], ['Pill', 'Inhibits ovulation and implantation'], ['Sterilisation', 'Blocks gamete transport']], 'Summary table of contraceptive actions'),
      n: 'To recap: reproductive health covers every aspect of reproduction, and India has long-standing programmes for it. Population growth is checked through contraception, from natural methods to IUDs, pills and surgery, each acting in a different way.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Give the **WHO definition** of reproductive health.',
        'For each contraceptive, state the **mode of action**, not just the name.',
        'Name **IUD types** with examples and **Saheli**.',
        'Explain why surgical methods are **terminal**.',
      ],
      n: 'Exam tips. Learn the definition of reproductive health. State how each contraceptive works. Name the types of IUD and the Saheli pill. And explain why sterilisation is a terminal method.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Reproductive Health — Part 2: MTP, amniocentesis, infertility and STDs',
  goals: [
    'State the reasons for and conditions of medical termination of pregnancy',
    'Explain amniocentesis and why its misuse is banned',
    'Name assisted reproductive technologies and their applications',
    'Describe the causes, symptoms and prevention of sexually transmitted diseases',
  ],
  slides: [
    sl('title', 'MTP, infertility and STDs', {
      b: 'Part 2 — safe practices and medical help in reproduction.',
      v: flow('LR', [['m', 'Medical termination of pregnancy'], ['a', 'Amniocentesis'], ['i', 'Infertility and ART'], ['s', 'STDs and their prevention']], [['m', 'a'], ['a', 'i'], ['i', 's']], 'Flow of the four topics of this part'),
      n: 'This part looks at four areas of reproductive health care: terminating unwanted pregnancies safely, detecting genetic disorders before birth, helping couples who cannot conceive, and preventing infections passed on through sexual contact.',
    }),
    sl('concept', 'Medical termination of pregnancy', {
      b: 'Intentional or voluntary termination of pregnancy before full term is **MTP** (induced abortion). India legalised MTP in **1971**, with strict conditions to prevent misuse such as **female foeticide**.',
      v: table(['Aspect', 'Detail'], [['Purpose', 'Getting rid of unwanted pregnancies due to casual unprotected intercourse or contraceptive failure; or when continuing the pregnancy could harm the mother or the foetus'], ['Safety', 'Considered relatively safe during the first trimester'], ['Conditions', 'Performed by registered medical practitioners within the time limits and conditions of the law'], ['Concern', 'Misuse for sex-selective abortion of normal female foetuses, and unsafe procedures by unqualified people']], 'Table of the purposes, safety, conditions and concerns of MTP'),
      n: 'MTP plays a role in reducing unwanted pregnancies, but it is not a method of contraception. It must be done by qualified doctors within the law. Illegal abortions by unqualified people are unsafe and can be fatal.',
    }),
    sl('diagram', 'Amniocentesis', {
      b: '**Amniocentesis** is a foetal sex-determination and disorder test based on the chromosomal pattern in the **amniotic fluid** surrounding the developing embryo. Foetal cells in the fluid are cultured and their chromosomes analysed.',
      v: V.amnio,
      n: 'Amniocentesis can detect chromosomal disorders such as Down’s syndrome. Because it can also reveal the sex of the foetus, it was misused for female foeticide, and the government has banned its use for sex determination.',
    }),
    sl('check', 'Quick check: amniocentesis', {
      b: 'Why has amniocentesis for sex determination been banned in India?',
      n: 'Quick check. Think of how the test was misused.',
      chk: 'amnio-mcq',
    }),
    sl('concept', 'Infertility', {
      b: 'A large number of couples are **infertile**: they cannot produce children despite unprotected sexual cohabitation. The reasons may be physical, congenital, diseases, drugs, immunological or even psychological, and the problem may lie in **either partner**.',
      v: table(['Point', 'Detail'], [['Who', 'Male or female partner; in India the woman is often wrongly blamed'], ['Help', 'Specialised health-care units (infertility clinics) diagnose and treat many disorders'], ['When treatment fails', 'Assisted reproductive technologies (ART) can help couples have children']], 'Table of key points about infertility'),
      n: 'Infertility is not always the woman’s fault; it can just as often lie with the man. Many cases can be diagnosed and treated, and where they cannot, assisted reproductive technologies offer another way to have children.',
    }),
    sl('concept', 'Assisted reproductive technologies', {
      b: 'ART are special techniques that help infertile couples. (The ISC syllabus needs their definitions and applications.)',
      v: table(['Technique', 'What it is'], [['IVF (test tube baby)', 'Fertilisation outside the body in almost similar conditions, followed by embryo transfer'], ['ZIFT', 'Zygote or early embryo (up to 8 blastomeres) transferred into the fallopian tube'], ['IUT', 'Embryo with more than 8 blastomeres transferred into the uterus'], ['GIFT', 'Ovum from a donor transferred into the fallopian tube of a female who cannot produce ova but can provide a suitable environment'], ['ICSI', 'Sperm directly injected into the ovum in the laboratory'], ['AI / IUI', 'Semen from the husband or a donor introduced into the vagina or uterus when the male cannot inseminate or has a low sperm count']], 'Table of assisted reproductive technologies'),
      n: 'Each technique bypasses a particular problem. If the oviducts are blocked, fertilisation can happen in the laboratory. If sperms are few, they can be injected directly into the ovum. Adoption is another option for childless couples.',
    }),
    sl('example', 'Worked example 1: matching the technique', {
      b: 'Suggest a suitable technique for each case.',
      ul: [
        `An embryo of 6 blastomeres is ready for transfer → **${transferRoute(6)}** (into the fallopian tube).`,
        `An embryo of 16 blastomeres is ready for transfer → **${transferRoute(16)}** (into the uterus).`,
        'A woman cannot produce ova but can sustain a pregnancy → **GIFT** with a donor ovum.',
        'A man has a very low sperm count → **IUI** (artificial insemination) or **ICSI**.',
      ],
      v: table(['Case', 'Technique'], [['Embryo of 6 cells', transferRoute(6)], ['Embryo of 16 cells', transferRoute(16)], ['No ova produced', 'GIFT'], ['Low sperm count', 'IUI or ICSI']], 'Worked table matching four cases to techniques'),
      n: 'Match the technique to the problem. Early embryos of up to eight cells go into the fallopian tube, by ZIFT, while larger embryos go into the uterus, by IUT. A woman without ova can receive a donor ovum by GIFT, and a low sperm count can be overcome by IUI or ICSI.',
    }),
    sl('check', 'Quick check: ART', {
      b: 'In which technique is a sperm injected directly into an ovum?',
      n: 'Quick check. Think of the word injection in the name.',
      chk: 'icsi-mcq',
    }),
    sl('concept', 'Sexually transmitted diseases', {
      b: 'Diseases or infections transmitted through **sexual intercourse** are STDs (also called venereal diseases or reproductive tract infections).',
      v: table(['Disease', 'Cause'], [['Gonorrhoea', 'Neisseria gonorrhoeae (bacterium)'], ['Syphilis', 'Treponema pallidum (bacterium)'], ['Chlamydiasis', 'Chlamydia trachomatis (bacterium)'], ['Trichomoniasis', 'Trichomonas vaginalis (protozoan)'], ['Genital herpes', 'Herpes simplex virus'], ['Genital warts', 'Human papillomavirus'], ['Hepatitis B', 'Hepatitis B virus'], ['AIDS', 'Human immunodeficiency virus (HIV)']], 'Table of eight STDs and their causes'),
      n: 'Some of these infections, such as hepatitis B and HIV, also spread by sharing injection needles and surgical instruments with infected persons, by transfusion of infected blood, or from an infected mother to her foetus. Except for hepatitis B, genital herpes and HIV infections, the others are completely curable if detected early and treated properly.',
    }),
    sl('concept', 'Symptoms, complications and prevention', {
      b: 'Early symptoms are often **minor**: itching, fluid discharge, slight pain and swellings in the genital region. Infected females may often be **asymptomatic**, so the infection may go undetected.',
      v: table(['Aspect', 'Detail'], [['Complications if untreated', 'Pelvic inflammatory disease (PID), abortions, still births, ectopic pregnancies, infertility, even cancer of the reproductive tract'], ['High-risk group', 'Persons in the age group 15–24 years'], ['Prevention', 'Avoid sex with unknown partners or multiple partners; always use condoms during coitus; consult a qualified doctor early in case of doubt']], 'Table of complications and prevention of STDs'),
      n: 'Because early symptoms are mild and the social stigma attached to these diseases deters people from seeking help, many cases are diagnosed late. Simple precautions and early treatment prevent serious complications.',
    }),
    sl('example', 'Worked example 2: spread and prevention', {
      b: 'A clinic sees three patients. Name the likely infection or risk and the key advice.',
      ul: [
        'A patient with hepatitis B who never had sexual contact but shared injection needles → infection by **sharing needles**; advise using **sterile, disposable needles**.',
        'A pregnant woman with HIV → risk of **transmission to the foetus**; she needs medical care during pregnancy and delivery.',
        'A young person with genital discharge and itching → possible **gonorrhoea, chlamydiasis or trichomoniasis**; advise **early consultation** and **condom use**.',
      ],
      v: table(['Patient', 'Route or risk', 'Advice'], [['Hepatitis B', 'Shared needles', 'Sterile needles'], ['Pregnant with HIV', 'Mother to foetus', 'Medical care in pregnancy'], ['Discharge and itching', 'Sexual contact', 'Early treatment, condoms']], 'Worked table of three patients with routes and advice'),
      n: 'Not every sexually transmitted infection spreads only through sex. Hepatitis B and HIV can also spread by needles, transfusion or from mother to foetus. In every case, early diagnosis and simple precautions make a big difference.',
    }),
    sl('check', 'Quick check: STDs', {
      b: 'Judge the assertion and the reason about STDs in females.',
      n: 'Quick check. Are early symptoms always noticeable?',
      chk: 'asymptomatic-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'MTP legal since 1971 under strict conditions; relatively safe in the first trimester; misuse for female foeticide is illegal.',
        'Amniocentesis detects chromosomal disorders; its use for sex determination is banned.',
        'Infertility can lie with either partner; ART: IVF, ZIFT (up to 8 blastomeres), IUT (more than 8), GIFT, ICSI, AI/IUI.',
        'STDs: gonorrhoea, syphilis, chlamydiasis, trichomoniasis, genital herpes, genital warts, hepatitis B, AIDS; hepatitis B, herpes and HIV not completely curable.',
        'Complications: PID, abortions, still births, ectopic pregnancy, infertility, cancer; prevention by safe practices and early consultation.',
      ],
      v: table(['Technique', 'Site of transfer'], [['ZIFT', 'Fallopian tube'], ['IUT', 'Uterus'], ['GIFT', 'Fallopian tube (ovum)']], 'Summary table of transfer sites in ART'),
      n: 'To recap: MTP and amniocentesis are legal medical tools with strict limits. Infertility can affect either partner and can often be helped by assisted reproductive technologies. And sexually transmitted diseases are preventable by safe practices and early treatment.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Expand **MTP, ZIFT, GIFT, IUT, ICSI, IUI** correctly.',
        'Give the **causative organism** of each STD.',
        'Name STDs that are **not completely curable**.',
        'State why amniocentesis for sex determination is **banned**.',
      ],
      n: 'Exam tips. Expand every abbreviation correctly. Learn the pathogen of each disease. Name the infections that are not completely curable. And explain the ban on sex determination by amniocentesis.',
    }),
  ],
});

export { P2 };
