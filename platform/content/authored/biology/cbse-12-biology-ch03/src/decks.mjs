// ch03 Reproductive Health — three decks: Part 1 (t01), Part 2 (t02), Part 3 (t03).
import { sl, deck, table, flow, svgV, r } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { IUD, STERIL, AMNIO, GROWTH, CALENDAR } from './svgs.mjs';
import { doublingSeries, fertileWindow, transferRoute } from './calc.mjs';

export const V = {
  iud: svgV(IUD, 'Copper intrauterine device in the uterus: T-shaped plastic frame with copper wire, threads passing through the cervix', 'Schematic front view, not to scale.'),
  steril: svgV(STERIL, 'Vasectomy: a piece of the vas deferens removed and the ends tied; tubectomy: a piece of the oviduct removed and the ends tied', 'Schematic, not to scale.'),
  amnio: svgV(AMNIO, 'Amniocentesis: a fine needle draws a sample of amniotic fluid from around the foetus', 'Schematic, not to scale.'),
  growth: svgV(GROWTH, 'Curve of a population growing at 2 percent per year, doubling about every 35 years'),
  calendar: svgV(CALENDAR, 'A 28-day cycle with menstrual days 1 to 5 and the fertile period, days 10 to 17, marked around ovulation on day 14'),
};

// ---------------------------------------------------------------- worked-example numbers (computed)
const IMR = { before: 60, after: 42 };
IMR.fall = IMR.before - IMR.after;
IMR.pct = Math.round((IMR.fall / IMR.before) * 100);
const D2 = doublingSeries(100, 2, 35).doubling;
const D1 = doublingSeries(100, 1, 70).doubling;
const FW = fertileWindow(28);
const ROUTES = [2, 4, 8, 16, 32].map((n) => [n, transferRoute(n)]);

export const deck1 = deck({
  part: 1,
  title: 'Reproductive Health — Part 1: Reproductive health and sexually transmitted infections',
  goals: [
    'Explain what reproductive health means and why it matters for a society',
    'Describe the steps India has taken to improve reproductive health',
    'Name common sexually transmitted infections, how they spread and which are curable',
    'Explain how sexually transmitted infections can be prevented',
  ],
  slides: [
    sl('title', 'Reproductive Health', {
      b: 'Part 1 — what it means to be reproductively healthy, how a country works towards it, and how to prevent sexually transmitted infections.',
      v: flow('LR', [['a', 'Awareness and correct information'], ['s', 'Safe practices and services'], ['h', 'Healthy individuals and families'], ['c', 'Reproductively healthy society']], [['a', 's'], ['s', 'h'], ['h', 'c']], 'Flow from awareness to safe practices to healthy families and a reproductively healthy society'),
      n: 'Health is not just the absence of disease, and that is true of reproduction too. In this chapter we look at reproductive health as a public health topic: what it means, how a country improves it, and how each of us can protect ourselves and others with correct, scientific information.',
    }),
    sl('concept', 'What is reproductive health?', {
      b: 'The **World Health Organization** describes reproductive health as **total well-being in all aspects of reproduction**: physical, emotional, behavioural and social. A society with people who have physically and functionally normal reproductive organs and normal emotional and behavioural interactions in all sex-related aspects is called **reproductively healthy**.',
      v: table(['Aspect', 'Example of well-being'], [['Physical', 'Normal, disease-free reproductive organs'], ['Emotional', 'Freedom from fear, guilt and myths about the body'], ['Behavioural', 'Responsible, safe choices'], ['Social', 'Respectful relationships; equal value for girls and boys']], 'Table of four aspects of reproductive health with examples'),
      n: 'Reproductive health has four sides. Physical health means normal organs, free of infection. Emotional health means not being troubled by fear or myths. Behavioural health means making responsible, safe choices. Social health means respectful relationships and treating girls and boys as equally valuable. All four together make a reproductively healthy society.',
    }),
    sl('concept', 'What India has done', {
      b: 'India was among the first countries to start **family planning** at a national level, in **1951**. These programmes now cover wider reproduction-related areas as **Reproductive and Child Health Care (RCH)** programmes.',
      v: table(['Action', 'Purpose'], [['Audio-visual and print media campaigns', 'Spread awareness of reproduction-related issues'], ['Sex education in schools', 'Correct information for young people; dispel myths'], ['Training and counselling', 'Help couples choose family planning methods; care for mothers and babies'], ['Statutory ban on prenatal sex determination', 'Prevent female foeticide'], ['Medical facilities and research', 'Safe delivery, care, contraceptives and treatment']], 'Table of actions taken in India to improve reproductive health and their purposes'),
      n: 'India started a national family planning programme in nineteen fifty-one, one of the first countries to do so. Today the reproductive and child health programmes go much further. They run awareness campaigns, support sex education in schools, train health workers, counsel couples, ban the use of tests to find the sex of an unborn child, and improve hospitals and research.',
    }),
    sl('concept', 'Why correct information matters', {
      b: 'Young people often get information from friends or unreliable sources. **Sex education in schools** gives **scientific** information about reproductive organs, adolescence, safe practices, STIs and AIDS, so that myths and misconceptions lose their hold.',
      v: table(['Common myth', 'Scientific fact'], [['Only adults need to know about the body', 'Correct knowledge at adolescence protects health'], ['STIs show symptoms at once', 'Many STIs have mild or no early symptoms'], ['The mother decides the baby’s sex', 'The father’s sperm decides it'], ['A healthy-looking person cannot carry an infection', 'Infections can be present without visible signs']], 'Table of four myths about reproduction contrasted with scientific facts'),
      n: 'Myths can be harmful. People may delay treatment because an infection does not seem serious, or blame a mother for having daughters. Correct information breaks such myths. It helps young people understand the changes of adolescence, avoid risky behaviour and seek help early from qualified doctors.',
    }),
    sl('example', 'Worked example 1: reading a health indicator', {
      b: `In one district, the infant mortality rate fell from ${IMR.before} to ${IMR.after} deaths per 1000 live births over ten years, after more mothers began delivering in hospitals and getting post-natal care. By what percentage did it fall?`,
      ul: [
        r`Step 1 — Fall $= ${IMR.before} - ${IMR.after} = ${IMR.fall}$ deaths per 1000 live births.`,
        r`Step 2 — Percentage fall $= \dfrac{${IMR.fall}}{${IMR.before}} \times 100 = ${IMR.pct}$ percent.`,
        'Step 3 — Interpret: better medically assisted deliveries and post-natal care are signs of improved reproductive health.',
      ],
      v: table(['Indicator', 'Before', 'After'], [['Infant deaths per 1000 live births', String(IMR.before), String(IMR.after)], ['Fall', '', `${IMR.fall} (${IMR.pct} percent)`]], `Worked table: infant mortality fell from ${IMR.before} to ${IMR.after}, a fall of ${IMR.fall} or ${IMR.pct} percent`),
      n: 'Subtract first: sixty minus forty-two is eighteen fewer deaths for every thousand babies born. Then divide by the starting value and multiply by one hundred: eighteen out of sixty is thirty percent. Falling maternal and infant death rates, more hospital deliveries and better care after birth are all signs that reproductive health is improving.',
    }),
    sl('check', 'Quick check: what counts as reproductive health?', {
      b: 'Which statement best describes reproductive health?',
      n: 'Quick check. Remember the four aspects in the definition.',
      chk: 'rh-def-mcq',
    }),
    sl('concept', 'Sexually transmitted infections', {
      b: 'Infections or diseases transmitted through sexual intercourse are called **sexually transmitted infections (STIs)**, also known as venereal diseases or reproductive tract infections.',
      v: table(['Infection', 'Caused by', 'Completely curable if detected early?'], [['Gonorrhoea', 'Bacterium', 'Yes'], ['Syphilis', 'Bacterium', 'Yes'], ['Chlamydiasis', 'Bacterium', 'Yes'], ['Trichomoniasis', 'Protozoan', 'Yes'], ['Genital warts', 'Virus', 'Yes, treatable'], ['Genital herpes', 'Virus', 'No'], ['Hepatitis-B', 'Virus', 'No'], ['HIV infection (AIDS)', 'Virus', 'No']], 'Table of eight sexually transmitted infections with their cause and whether each is completely curable'),
      n: 'Here are the common sexually transmitted infections. Most of them, such as gonorrhoea, syphilis and chlamydiasis, can be completely cured if they are detected early and treated properly. Three are not completely curable: genital herpes, hepatitis B and HIV infection, which leads to AIDS. That is why prevention matters so much.',
    }),
    sl('concept', 'How STIs spread', {
      b: 'STIs spread mainly through **sexual contact** with an infected person. Some, such as **hepatitis-B** and **HIV**, also spread in other ways. They do **not** spread through casual contact such as shaking hands or sharing food.',
      v: flow('LR', [['i', 'Infected person'], ['s', 'Sexual contact'], ['n', 'Sharing injection needles or surgical instruments'], ['b', 'Transfusion of infected blood'], ['m', 'Infected mother to foetus'], ['o', 'Another person infected']], [['i', 's'], ['i', 'n'], ['i', 'b'], ['i', 'm'], ['s', 'o'], ['n', 'o'], ['b', 'o'], ['m', 'o']], 'Flow showing routes of transmission of STIs: sexual contact, shared needles, infected blood and mother to foetus'),
      n: 'Hepatitis B and HIV can also travel through blood: by sharing injection needles or unsterilised surgical instruments, through transfusion of untested blood, or from an infected mother to her baby. But they do not spread by shaking hands, hugging, sharing meals or using the same classroom. Knowing this protects people and prevents unfair discrimination.',
    }),
    sl('concept', 'Symptoms and complications', {
      b: 'Early symptoms are often **minor** — itching, fluid discharge, slight pain or swelling in the genital region — and some infected people have none. Embarrassment can delay treatment, which leads to complications.',
      v: table(['If untreated, STIs can lead to', 'Why it matters'], [['Pelvic inflammatory disease', 'Long-term pain and damage to reproductive organs'], ['Abortions and stillbirths', 'Loss of pregnancy'], ['Ectopic pregnancy', 'Embryo implants outside the uterus; dangerous'], ['Infertility', 'Inability to have children'], ['Cancer of the reproductive tract', 'Serious illness']], 'Table of complications of untreated STIs and why each matters'),
      n: 'The danger of STIs lies partly in their quiet start. Symptoms may be mild, or absent, especially in women, and people may feel too shy to see a doctor. Left untreated, infections can cause pelvic inflammatory disease, stillbirths, pregnancies outside the uterus, infertility and even cancer. Early testing and treatment prevent most of this. Young people of fifteen to twenty-four are among the most affected.',
    }),
    sl('example', 'Worked example 2: separating fact from fear', {
      b: 'A student lists five situations. Which of them can transmit hepatitis-B or HIV?',
      ul: [
        'P — Sharing an injection needle with an infected person → **can transmit** (blood).',
        'Q — Receiving a transfusion of untested blood → **can transmit** (blood).',
        'R — Shaking hands with or hugging an infected classmate → **cannot** (no blood or sexual contact).',
        'S — From an infected mother to her foetus → **can transmit**.',
        'T — Eating from the same plate → **cannot**.',
      ],
      v: table(['Situation', 'Route', 'Risk?'], [['P: shared needle', 'Blood', 'Yes'], ['Q: untested blood', 'Blood', 'Yes'], ['R: handshake, hug', 'Casual contact', 'No'], ['S: mother to foetus', 'Mother to child', 'Yes'], ['T: shared plate', 'Casual contact', 'No']], 'Worked table classifying five situations by route and whether they carry a risk of hepatitis-B or HIV'),
      n: 'Ask one question for each situation: does it involve sexual contact, blood, or passage from mother to baby? If yes, there is a risk. If it is everyday contact, like a handshake, a hug or sharing a plate, there is no risk. This simple test helps us protect ourselves and also treat infected people with kindness.',
    }),
    sl('concept', 'Prevention', {
      b: 'All persons are vulnerable, but prevention is simple and effective.',
      v: table(['Prevention step', 'How it helps'], [['Avoid sex with unknown partners or multiple partners', 'Reduces the chance of exposure'], ['Always use condoms during intercourse', 'Barrier stops exchange of infected fluids'], ['Use only sterile, unshared needles; transfuse tested blood', 'Blocks blood-borne spread'], ['If in doubt, consult a qualified doctor early and complete treatment', 'Early cure and fewer complications']], 'Table of four prevention steps for STIs and how each helps'),
      n: 'Prevention comes down to a few clear steps: avoid unknown or multiple partners, always use condoms, never share needles, and use only tested blood. If there is any doubt, see a qualified doctor early, get tested, and finish the full course of treatment. Prevention and early detection keep individuals, families and the whole community healthy.',
    }),
    sl('check', 'Quick check: curable or not?', {
      b: 'Which of these STIs is not completely curable?',
      n: 'Quick check. Recall the three infections in the table that were marked as not completely curable.',
      chk: 'not-curable-mcq',
    }),
    sl('check', 'Quick check: which STIs are curable?', {
      b: 'Judge the assertion and the reason about curing STIs.',
      n: 'Quick check. Check each statement against the table of curable and not completely curable infections.',
      chk: 'early-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Reproductive health = total well-being in all aspects of reproduction: physical, emotional, behavioural, social.',
        'India: family planning from 1951; RCH programmes; awareness, sex education, counselling, ban on prenatal sex determination, better medical care.',
        'Signs of improvement: more hospital deliveries, better post-natal care, lower maternal and infant mortality, early detection of STIs.',
        'STIs: gonorrhoea, syphilis, chlamydiasis, trichomoniasis, genital warts, genital herpes, hepatitis-B, HIV; the last three are not completely curable.',
        'Hepatitis-B and HIV also spread via shared needles, infected blood and mother to foetus — not by casual contact.',
        'Prevention: avoid unknown or multiple partners, use condoms, see a qualified doctor early.',
      ],
      v: table(['Remember', 'Detail'], [['Not completely curable', 'Genital herpes, hepatitis-B, HIV'], ['Blood-borne too', 'Hepatitis-B, HIV'], ['Most affected age group', '15–24 years']], 'Summary table of key STI facts'),
      n: 'To recap. Reproductive health covers body, mind, behaviour and society. India has long-running programmes to improve it. Sexually transmitted infections are common, often quiet at first, and mostly curable if caught early, except genital herpes, hepatitis B and HIV. Prevention is simple: safe choices, condoms, sterile needles and early medical help.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Quote the **four aspects** in the definition of reproductive health.',
        'Name **three STIs that are not completely curable**: genital herpes, hepatitis-B, HIV.',
        'List **routes other than sexual contact** for hepatitis-B and HIV.',
        'Give **complications** of untreated STIs (PID, abortions, stillbirths, ectopic pregnancy, infertility, cancer).',
      ],
      n: 'Exam tips. Learn the four aspects of reproductive health. Know which three infections are not completely curable. Be ready to list how hepatitis B and HIV spread besides sexual contact. And remember the complications of untreated infections, because they explain why early detection matters.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Reproductive Health — Part 2: Population and birth control',
  goals: [
    'Explain why India’s population grew rapidly and why stabilisation matters',
    'Describe the properties of an ideal contraceptive',
    'Compare natural, barrier, IUD, oral, injectable, implant and surgical methods',
    'Explain medical termination of pregnancy and its misuse',
  ],
  slides: [
    sl('title', 'Population and birth control', {
      b: 'Part 2 — why the population grew so fast, and the safe methods couples can use to plan their families.',
      v: flow('LR', [['h', 'Better health care'], ['d', 'Lower death rates'], ['g', 'Rapid population growth'], ['c', 'Birth control and awareness'], ['s', 'Population stabilisation']], [['h', 'd'], ['d', 'g'], ['g', 'c', 'response'], ['c', 's']], 'Flow from better health care and lower death rates to rapid growth, and from birth control to stabilisation'),
      n: 'Better health care is a success story: fewer mothers and babies die than before. But when death rates fall and birth rates stay high, the population grows rapidly. In this part we see how fast that growth can be and the range of safe methods that let couples choose when and whether to have children.',
    }),
    sl('concept', 'Why the population grew', {
      b: 'India’s population was about **350 million** at Independence (1947), crossed **one billion** in 2000 and was about **1.2 billion** by the 2011 census.',
      v: table(['Reason', 'Effect'], [['Rapid decline in death rate', 'More people survive to old age'], ['Fall in maternal mortality rate', 'More mothers survive childbirth'], ['Fall in infant mortality rate', 'More babies survive infancy'], ['More people of reproductive age', 'More births each year']], 'Table of reasons for rapid population growth and their effects'),
      n: 'From about three hundred and fifty million at Independence, India passed one billion in two thousand and reached about one point two billion by twenty eleven. The main reasons are good ones: fewer deaths overall, fewer mothers dying in childbirth, fewer infant deaths, and so many more young adults in the reproductive age group.',
    }),
    sl('diagram', 'How fast does a population grow?', {
      b: 'A population growing at a constant rate grows like compound interest: each year’s increase is added to the base for the next year, so the curve **bends upwards** and the population **doubles** again and again.',
      v: V.growth,
      n: 'Look at the curve. Growing at two percent a year does not sound like much, but the increase is added to the base every year. So the population doubles roughly every thirty-five years: one hundred becomes two hundred, then four hundred, then eight hundred. Even a small growth rate creates enormous numbers over a few generations.',
    }),
    sl('example', 'Worked example 1: doubling time', {
      b: 'How long does a population take to double if it grows at a steady 2 percent per year? And at 1 percent?',
      ul: [
        r`Step 1 — After $t$ years the population is multiplied by $(1.02)^t$. Doubling needs $(1.02)^t = 2$.`,
        r`Step 2 — So $t = \dfrac{\ln 2}{\ln 1.02} \approx ${D2}$ years.`,
        r`Step 3 — At 1 percent: $t = \dfrac{\ln 2}{\ln 1.01} \approx ${D1}$ years.`,
        'Conclusion — halving the growth rate roughly doubles the doubling time; that is the aim of stabilisation.',
      ],
      v: table(['Growth rate per year', 'Doubling time (years)'], [['2 percent', String(D2)], ['1 percent', String(D1)]], `Worked table: doubling time about ${D2} years at 2 percent and about ${D1} years at 1 percent`),
      n: 'We need the number of years for which one point zero two multiplied by itself gives two. Using logarithms, that comes to about thirty-five years. At one percent it is about seventy years. A handy shortcut is to divide seventy by the percentage rate. Slowing growth from two percent to one gives the country twice as long to provide schools, jobs and hospitals.',
    }),
    sl('concept', 'Checking growth; the ideal contraceptive', {
      b: 'Steps include motivating **smaller families**, raising awareness, the **legal minimum age of marriage** (18 years for females, 21 for males), incentives for small families and, above all, **contraceptive methods**.',
      v: table(['An ideal contraceptive should be', 'Why'], [['User-friendly and easily available', 'People will actually use it'], ['Effective', 'Prevents unwanted pregnancy'], ['Reversible', 'Couples can have children later if they wish'], ['With no or least side effects', 'Protects health'], ['Not interfering with sexual drive or the sexual act', 'Acceptable to users']], 'Table of the properties of an ideal contraceptive with reasons'),
      n: 'Couples need methods that work, that are easy to obtain and use, that are safe, and that can be stopped when they want a child. No single method has all these qualities for every couple, which is why many types exist. Let us go through them, from natural methods to surgery.',
    }),
    sl('check', 'Quick check: the ideal contraceptive', {
      b: 'Which property is NOT expected of an ideal contraceptive?',
      n: 'Quick check. Go through the list of ideal properties and spot the odd one out.',
      chk: 'ideal-mcq',
    }),
    sl('concept', 'Natural methods', {
      b: '**Natural methods** avoid the meeting of ovum and sperm without any device or medicine. They have no side effects, but their failure rate is high.',
      v: table(['Method', 'How it works', 'Limitation'], [['Periodic abstinence', 'Couples avoid coitus from day 10 to day 17 of the cycle, when ovulation is expected', 'Needs regular cycles; high failure rate'], ['Withdrawal (coitus interruptus)', 'Semen is not released into the vagina', 'High failure rate'], ['Lactational amenorrhea', 'While the mother breastfeeds fully after birth, ovulation and menstruation do not occur', 'Reliable only up to about six months after birth']], 'Table of three natural methods with how they work and their limitations'),
      n: 'Natural methods use knowledge of the body. Periodic abstinence avoids the days when an ovum is likely to be present. Lactational amenorrhea uses the fact that intense, full breastfeeding after childbirth usually stops ovulation, but only for about six months. These methods cost nothing and have no side effects, but they fail often.',
    }),
    sl('diagram', 'The fertile period', {
      b: `In a regular 28-day cycle, ovulation is expected around day ${FW.ovulation}. The **fertile period** is about days **${FW.from} to ${FW.to}**, when fertilisation is most likely. Periodic abstinence avoids these days.`,
      v: V.calendar,
      n: 'This calendar shows one regular cycle. Days one to five are menstrual flow. Ovulation, marked with the bold box, comes around day fourteen. The shaded days from ten to seventeen are the fertile period, because sperms and the ovum can survive for a short time. In irregular cycles this window is hard to predict, which is why the method often fails.',
    }),
    sl('example', 'Worked example 2: dates of the fertile period', {
      b: `A woman has regular 28-day cycles, and her period starts on 1 June. Using the periodic abstinence rule, between which dates is the fertile period, and how many days does it last?`,
      ul: [
        `Step 1 — 1 June is day 1, so day $n$ falls on $n$ June.`,
        `Step 2 — Fertile period = days ${FW.from} to ${FW.to}, so **${FW.from} June to ${FW.to} June**.`,
        r`Step 3 — Length $= ${FW.to} - ${FW.from} + 1 = ${FW.days}$ days.`,
        'Caution — any change in cycle length shifts these dates, so the method is unreliable.',
      ],
      v: table(['Day of cycle', 'Date', 'Status'], [['1–5', '1–5 June', 'Menstrual flow'], [`${FW.from}–${FW.to}`, `${FW.from}–${FW.to} June`, 'Fertile period: avoid'], ['14', '14 June', 'Expected ovulation']], `Worked table: in a cycle starting 1 June, the fertile period runs from ${FW.from} to ${FW.to} June`),
      n: 'Because the cycle starts on the first of June, the day number and the date are the same. The fertile period is therefore from the tenth to the seventeenth of June, eight days in all, counting both ends. But a late or early ovulation would move the window, which is the weakness of this method.',
    }),
    sl('concept', 'Barrier methods', {
      b: '**Barriers** stop the ovum and sperms from meeting.',
      v: table(['Barrier', 'Used by', 'Notes'], [['Condom', 'Male or female', 'Thin rubber or latex sheath; disposable; also protects against STIs and AIDS'], ['Diaphragm, cervical cap, vault', 'Female', 'Rubber devices placed over the cervix; reusable'], ['Spermicidal creams, jellies, foams', 'With barriers', 'Increase effectiveness by killing sperms']], 'Table of barrier methods with who uses them and notes'),
      n: 'Condoms are made of thin rubber or latex and are used once. They are the only common contraceptive that also protects against sexually transmitted infections, including HIV, which is why they are so widely promoted. Diaphragms, cervical caps and vaults cover the cervix and can be reused. Spermicidal creams make barriers more effective.',
    }),
    sl('diagram', 'Intrauterine devices', {
      b: '**Intrauterine devices (IUDs)** are inserted into the uterus through the vagina by **doctors or expert nurses**. They are among the most widely accepted methods in India and suit women who want to **delay** pregnancy or **space** children.',
      v: V.iud,
      n: 'A copper T is a small T-shaped plastic frame with fine copper wire on its stem. A trained doctor or nurse places it in the uterus. Fine threads pass through the cervix so it can be checked and later removed. Fertility returns once it is taken out, so it is useful for spacing children.',
    }),
    sl('concept', 'How IUDs work', {
      b: 'IUDs increase **phagocytosis** of sperms in the uterus.',
      v: table(['Type', 'Examples', 'Extra action'], [['Non-medicated', 'Lippes loop', 'Increases phagocytosis of sperms'], ['Copper-releasing', 'CuT, Cu7, Multiload 375', 'Copper ions suppress sperm motility and fertilising capacity'], ['Hormone-releasing', 'Progestasert, LNG-20', 'Make the uterus unsuitable for implantation and the cervix hostile to sperms']], 'Table of the three types of IUD with examples and actions'),
      n: 'All IUDs make the uterus a place where sperms are engulfed by white blood cells. Copper-releasing ones go further: copper ions slow sperms down and stop them fertilising. Hormone-releasing ones change the lining so that an embryo cannot implant, and thicken the cervical mucus so sperms cannot pass.',
    }),
    sl('check', 'Quick check: copper ions', {
      b: 'How do copper ions released by a copper IUD prevent pregnancy?',
      n: 'Quick check. Think about what copper does to the sperms themselves.',
      chk: 'copper-mcq',
    }),
    sl('concept', 'Pills, injections, implants and emergency methods', {
      b: 'Hormonal methods use **progestogens** alone or **progestogen–estrogen** combinations.',
      v: table(['Method', 'How it is used', 'How it works'], [['Oral pills', 'Daily for 21 days, starting within the first five days of the cycle; then a 7-day gap (menstruation)', 'Inhibit ovulation and implantation; change cervical mucus to block sperms'], ['Saheli', 'Once a week; non-steroidal; developed by CDRI, Lucknow', 'Oral contraceptive for females'], ['Injections, implants under the skin', 'Given by a health worker', 'Same hormonal action; effective for a much longer period'], ['Emergency contraception', 'Hormone pills or an IUD within 72 hours of unprotected intercourse', 'Prevents a possible pregnancy after a lapse, for example after assault']], 'Table of hormonal methods: oral pills, Saheli, injections and implants, and emergency contraception'),
      n: 'Pills are taken every day for twenty-one days, followed by a seven-day gap in which menstruation occurs, and then the cycle repeats. They stop ovulation, prevent implantation and thicken cervical mucus. Saheli, developed at the Central Drug Research Institute in Lucknow, is taken just once a week. Emergency methods work only if used within seventy-two hours.',
    }),
    sl('diagram', 'Surgical methods: sterilisation', {
      b: '**Sterilisation** is a terminal method for those who want no more children. **Vasectomy:** a small part of the vas deferens is removed or tied up through a small incision on the scrotum. **Tubectomy:** a small part of the oviduct is removed or tied up through a small incision in the abdomen or through the vagina. Both block gamete transport; they are highly effective but **reversibility is very poor**.',
      v: V.steril,
      n: 'In vasectomy the sperms can no longer travel from the testes, and in tubectomy the ovum and sperms cannot meet in the oviduct. Hormones and other functions are not affected. Because these operations are very hard to reverse, they are chosen only by people who are sure they do not want more children.',
    }),
    sl('concept', 'Side effects and informed choice', {
      b: 'Contraceptives help couples prevent **unwanted** pregnancies and plan their families, and their wide use helps check population growth. Possible side effects include nausea, abdominal pain, breakthrough bleeding, irregular menstrual bleeding and, rarely, more serious problems such as breast cancer. These are **not very common**, but they should **not be ignored**.',
      v: table(['Couple’s need', 'Suitable methods'], [['Delay the first child', 'Condoms, pills, IUD'], ['Space two children', 'IUD, pills, injections'], ['Also want protection from STIs', 'Condom'], ['No more children', 'Vasectomy or tubectomy']], 'Table matching couples’ needs to suitable contraceptive methods'),
      n: 'There is no single best method. A couple wanting to delay their first child might choose condoms or pills, a couple spacing children might choose an IUD, and a couple who want no more children might choose sterilisation. A doctor’s advice helps match the method to the person, and any side effects should be reported early.',
    }),
    sl('concept', 'Medical termination of pregnancy', {
      b: 'Intentional or voluntary termination of pregnancy before full term is **medical termination of pregnancy (MTP)**. India legalised MTP in **1971** under strict conditions, to reduce **unsafe, illegal abortions** and the deaths and illness they cause.',
      v: table(['Point', 'Detail'], [['Why permitted', 'When continuing the pregnancy could harm the mother or the foetus has serious abnormalities, or a contraceptive has failed; only by registered medical practitioners, within the time limits of the law'], ['When safest', 'During the first trimester (up to 12 weeks); later MTPs are much riskier'], ['Not a contraceptive', 'MTP is not a method of family planning'], ['Misuse', 'Illegal female foeticide after illegal sex determination; unsafe MTPs by unqualified people are dangerous and illegal']], 'Table of key points about medical termination of pregnancy: grounds, timing, not a contraceptive, and misuse'),
      n: 'Medical termination of pregnancy is a legal, regulated medical procedure in India, permitted on specific medical grounds and carried out only by registered doctors. It is safest in the first three months. It must never be used to choose a child’s sex, which is a crime, and it is not a substitute for contraception. Unsafe abortions by unqualified people can be fatal.',
    }),
    sl('check', 'Quick check: MTP', {
      b: 'Judge the assertion and the reason about MTP.',
      n: 'Quick check. Read both statements carefully before choosing.',
      chk: 'mtp-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Rapid growth: falling death rate, MMR and IMR; more people of reproductive age. A steady 2 percent growth doubles a population in about 35 years.',
        'Ideal contraceptive: user-friendly, available, effective, reversible, few side effects, not interfering with sexual drive.',
        'Natural: periodic abstinence (days 10–17), withdrawal, lactational amenorrhea (up to about six months).',
        'Barriers: condoms (also protect against STIs), diaphragms, cervical caps, vaults, spermicides.',
        'IUDs: Lippes loop; CuT, Cu7, Multiload 375; Progestasert, LNG-20. Pills (21 + 7 days), Saheli (weekly), injections, implants; emergency within 72 hours.',
        'Sterilisation: vasectomy, tubectomy (poorly reversible). MTP: legal since 1971 with conditions; safest in the first trimester; never for sex selection.',
      ],
      v: table(['Method', 'Reversible?', 'Protects against STIs?'], [['Condom', 'Yes', 'Yes'], ['IUD', 'Yes', 'No'], ['Pills', 'Yes', 'No'], ['Sterilisation', 'Very poorly', 'No']], 'Summary table of four methods: reversibility and protection against STIs'),
      n: 'To recap: better health care brought rapid population growth, and contraception lets families plan. Natural methods are free but unreliable, barriers also protect against infections, IUDs and pills are effective and reversible, and sterilisation is for those who want no more children. Medical termination of pregnancy is a regulated medical service, not a contraceptive, and never a tool for sex selection.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Give **examples of each IUD type** and how copper and hormones act.',
        'State the **pill schedule** (21 days, 7-day gap) and three actions of pills.',
        'Mention that **condoms** also protect against STIs.',
        'Say that sterilisation is **highly effective but poorly reversible**.',
        'For MTP, state **legalisation (1971)**, **first-trimester safety** and the **ban on misuse**.',
      ],
      n: 'Exam tips. Learn the three IUD types with examples. Know the pill schedule and how pills work. Remember that only condoms protect against infections. Describe sterilisation as effective but hard to reverse. And for medical termination of pregnancy, mention its legal status, first-trimester safety and the ban on misuse.',
    }),
  ],
});

export const deck3 = deck({
  part: 3,
  title: 'Reproductive Health — Part 3: Amniocentesis, infertility and assisted reproduction',
  goals: [
    'Describe amniocentesis, its use and why its misuse is banned',
    'List causes of infertility',
    'Explain IVF with embryo transfer (ZIFT, IUT), GIFT, ICSI and artificial insemination',
    'Discuss the limits of assisted reproductive technologies and the option of adoption',
  ],
  slides: [
    sl('title', 'Amniocentesis, infertility and ART', {
      b: 'Part 3 — testing the health of a foetus, and the technologies that help couples who cannot conceive.',
      v: flow('LR', [['a', 'Amniocentesis: check foetal health'], ['i', 'Infertility: causes'], ['t', 'Assisted reproductive technologies'], ['o', 'Options: ART or adoption']], [['i', 't'], ['t', 'o']], 'Flow from amniocentesis to infertility, assisted reproductive technologies and the choice of adoption'),
      n: 'Medical science can now check the health of an unborn baby and help many couples who cannot have children naturally. In this part we look at amniocentesis, at why infertility happens, and at assisted reproductive technologies such as test tube babies.',
    }),
    sl('diagram', 'Amniocentesis', {
      b: '**Amniocentesis** is a foetal test in which a small sample of **amniotic fluid** is taken from around the developing foetus. The fluid contains **cells shed by the foetus**, which are examined for **genetic disorders** and **chromosomal abnormalities**.',
      v: V.amnio,
      n: 'Under careful medical supervision, a fine needle passes through the mother’s abdomen into the amniotic sac and draws out a little fluid. The foetal cells in this fluid are grown and their chromosomes examined. This can show whether the baby has a chromosomal disorder or certain genetic diseases, so doctors and parents can plan care.',
    }),
    sl('concept', 'Use and misuse', {
      b: 'The same test that detects disorders could also reveal the **sex** of the foetus. Its use for **sex determination** has led to **female foeticide**, so there is a **statutory ban** on using amniocentesis or any prenatal test to find the sex of a foetus.',
      v: table(['', 'Detail'], [['Proper use', 'Detect genetic disorders and chromosomal abnormalities such as Down’s syndrome'], ['Misuse', 'Finding the sex of the foetus, followed by female foeticide'], ['Law', 'Statutory ban on prenatal sex determination'], ['Effect of misuse', 'Falling child sex ratio; injustice to girls']], 'Table of proper use and misuse of amniocentesis, the law, and the effect of misuse'),
      n: 'Amniocentesis is a valuable medical test. But some people misused it to learn whether the foetus was a girl, and then ended the pregnancy. This female foeticide is a crime and has lowered the number of girls compared with boys. The law bans using any prenatal test to determine sex, and every girl child has equal value.',
    }),
    sl('check', 'Quick check: purpose of amniocentesis', {
      b: 'What is the proper medical purpose of amniocentesis?',
      n: 'Quick check. Think about what the cells in the amniotic fluid can reveal.',
      chk: 'amnio-mcq',
    }),
    sl('concept', 'Infertility', {
      b: 'Many couples are unable to produce children in spite of unprotected sexual cohabitation: **infertility**. The problem may lie with the **male or the female** partner, and it is wrong to blame the woman by default.',
      v: table(['Possible cause', 'Example'], [['Physical', 'Blocked oviducts; very low sperm count'], ['Congenital', 'Abnormality present from birth'], ['Diseases', 'Untreated STIs causing damage'], ['Drugs', 'Effects of some medicines or substance abuse'], ['Immunological', 'Body reacting against sperms'], ['Psychological', 'Stress']], 'Table of possible causes of infertility with examples'),
      n: 'Infertility has many possible causes: physical problems such as blocked oviducts or low sperm counts, conditions present from birth, damage from untreated infections, effects of drugs, immune reactions, and even stress. Either partner may be the one affected. In India women are often unfairly blamed, so correct information matters here too.',
    }),
    sl('concept', 'Assisted reproductive technologies', {
      b: 'Specialised health care units can diagnose many causes and correct some; others are helped by **assisted reproductive technologies (ART)**.',
      v: flow('TB', [['d', 'Diagnose the cause in a specialised clinic'], ['c', 'Correctable: treat'], ['a', 'Not correctable: choose an ART'], ['i', 'IVF with embryo transfer (ZIFT or IUT)'], ['g', 'GIFT'], ['x', 'ICSI'], ['s', 'Artificial insemination (IUI)']], [['d', 'c'], ['d', 'a'], ['a', 'i'], ['a', 'g'], ['a', 'x'], ['a', 's']], 'Flow from diagnosis to treatment or to a choice of assisted reproductive technology: IVF with embryo transfer, GIFT, ICSI or artificial insemination'),
      n: 'The first step is always diagnosis in a specialised clinic. Some causes can simply be treated. When they cannot, there is a menu of assisted reproductive technologies, each suited to a different problem. Let us go through them one by one.',
    }),
    sl('concept', 'IVF with embryo transfer', {
      b: '**In vitro fertilisation (IVF)** is fertilisation outside the body in conditions similar to those in the body, followed by **embryo transfer (ET)**: the popular "test tube baby" programme. Ova from the wife or a donor and sperms from the husband or a donor are collected and allowed to form a zygote in the laboratory.',
      v: table(['Transfer method', 'What is transferred', 'Where'], [['ZIFT (zygote intra fallopian transfer)', 'Zygote or early embryo with up to 8 blastomeres', 'Fallopian tube'], ['IUT (intra uterine transfer)', 'Embryo with more than 8 blastomeres', 'Uterus']], 'Table of the two embryo transfer methods with what is transferred and where'),
      n: 'In a test tube baby programme, the egg and sperm meet in a laboratory dish rather than in the body. The resulting zygote or young embryo is then placed back into the mother. Very early embryos, with up to eight cells, go into the fallopian tube; this is called ZIFT. Older embryos, with more than eight cells, go into the uterus; this is IUT.',
    }),
    sl('example', 'Worked example 1: ZIFT or IUT?', {
      b: 'Embryos at different stages are ready for transfer. Decide whether each should be transferred by ZIFT or IUT.',
      ul: [
        'Rule — up to 8 blastomeres → **ZIFT** (fallopian tube); more than 8 → **IUT** (uterus).',
        ...ROUTES.map(([n, route]) => `${n} blastomeres → **${route}**`),
      ],
      v: table(['Blastomeres', 'Method', 'Placed in'], ROUTES.map(([n, route]) => [String(n), route, route === 'ZIFT' ? 'Fallopian tube' : 'Uterus']), 'Worked table: embryos with 2, 4 and 8 blastomeres go by ZIFT into the fallopian tube; 16 and 32 blastomeres go by IUT into the uterus'),
      n: 'Apply one rule. Eight blastomeres or fewer means the embryo is still at the stage when it would normally be in the oviduct, so it goes into the fallopian tube by ZIFT. More than eight means it would normally have reached the uterus, so it is placed there by IUT. Notice that an eight-cell embryo still counts as ZIFT.',
    }),
    sl('concept', 'GIFT, ICSI and artificial insemination', {
      b: 'Other techniques suit other problems.',
      v: table(['Technique', 'What is done', 'Helps when'], [['GIFT (gamete intra fallopian transfer)', 'An ovum collected from a donor is transferred into the fallopian tube of a woman', 'She cannot produce ova but can provide a suitable environment for fertilisation and development'], ['ICSI (intra cytoplasmic sperm injection)', 'A sperm is injected directly into the ovum in the laboratory to form an embryo', 'Sperms cannot fertilise the ovum on their own'], ['Artificial insemination (AI); IUI', 'Semen from the husband or a donor is introduced into the vagina or into the uterus (intra-uterine insemination)', 'The male partner cannot inseminate or has a very low sperm count']], 'Table of GIFT, ICSI and artificial insemination with what is done and when each helps'),
      n: 'In GIFT, a donated ovum is placed in the fallopian tube of a woman who cannot produce ova, so fertilisation happens naturally inside her. In ICSI, a single sperm is injected straight into the ovum, useful when sperms cannot enter by themselves. In artificial insemination, semen is placed in the vagina or uterus, helping when sperm counts are very low.',
    }),
    sl('example', 'Worked example 2: matching couples to techniques', {
      b: 'Suggest a suitable technique for each couple.',
      ul: [
        'Couple 1 — The woman’s **oviducts are blocked**; ova and sperms are normal → fertilise outside: **IVF with embryo transfer into the uterus (IUT)**.',
        'Couple 2 — The woman **cannot produce ova**, but her oviducts and uterus are normal → **GIFT** with a donor ovum.',
        'Couple 3 — The man’s **sperm count is very low**, but the sperms are normal → **artificial insemination (IUI)**.',
        'Couple 4 — Sperms are present but **cannot enter the ovum** → **ICSI**.',
      ],
      v: table(['Couple', 'Problem', 'Technique'], [['1', 'Blocked oviducts', 'IVF + IUT'], ['2', 'No ova produced', 'GIFT'], ['3', 'Very low sperm count', 'AI / IUI'], ['4', 'Sperms cannot fertilise', 'ICSI']], 'Worked table matching four couples’ problems to IVF with IUT, GIFT, IUI and ICSI'),
      n: 'Work out where the block is. If the oviducts are blocked, gametes cannot meet in the body, so fertilisation must happen outside and the embryo goes into the uterus, not the blocked tube. If ova are missing, a donor ovum in a healthy tube works. Low sperm counts can be helped by placing semen in the uterus, and sperms that cannot enter the ovum need ICSI.',
    }),
    sl('check', 'Quick check: GIFT', {
      b: 'In GIFT, what is transferred, and where?',
      n: 'Quick check. The name tells you: gamete, intra fallopian, transfer.',
      chk: 'gift-mcq',
    }),
    sl('concept', 'Limits of ART and the option of adoption', {
      b: 'ART needs **specialised professionals** and **expensive** equipment, so it is available only in a few centres and to relatively few people. **Emotional, religious and social** factors also matter. **Legal adoption** of orphaned and destitute children is one of the best options for couples wanting parenthood, and India’s laws permit it.',
      v: table(['Limitation of ART', 'Consequence'], [['High cost', 'Only a few families can afford it'], ['Few specialised centres', 'Hard to reach for many'], ['Emotional, religious and social factors', 'Some couples hesitate'], ['Success is not guaranteed', 'Repeated attempts may be needed']], 'Table of limitations of assisted reproductive technologies and their consequences'),
      n: 'Assisted reproduction is a medical achievement, but it is costly, available in few places, and not always successful. Couples may also face emotional, social and religious questions. Adoption gives a loving home to a child who needs one, and Indian law permits it. It is one of the best options for couples who want to become parents.',
    }),
    sl('check', 'Quick check: ICSI', {
      b: 'Judge the assertion and the reason about ICSI.',
      n: 'Quick check. Decide whether each statement is true and whether the reason explains the assertion.',
      chk: 'icsi-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Amniocentesis: amniotic fluid with foetal cells tested for genetic and chromosomal disorders; banned for sex determination.',
        'Infertility: physical, congenital, disease, drug, immunological or psychological causes; either partner.',
        'IVF–ET: fertilisation in the laboratory; ZIFT (up to 8 blastomeres, fallopian tube) or IUT (more than 8, uterus).',
        'GIFT: donor ovum into the fallopian tube; ICSI: sperm injected into the ovum; AI/IUI: semen into the vagina or uterus.',
        'ART is costly and limited; adoption is a valuable option.',
      ],
      v: table(['Technique', 'Key word'], [['ZIFT', 'Zygote or early embryo into the oviduct'], ['IUT', 'Older embryo into the uterus'], ['GIFT', 'Ovum into the oviduct'], ['ICSI', 'Sperm into the ovum'], ['IUI', 'Semen into the uterus']], 'Summary table of the key word for each assisted reproductive technique'),
      n: 'To recap: amniocentesis tests foetal cells for disorders and must never be used to choose a child’s sex. Infertility can affect either partner and has many causes. Assisted reproductive technologies, such as IVF with ZIFT or IUT, GIFT, ICSI and artificial insemination, help many couples, though they are costly. Adoption remains a valuable path to parenthood.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Write **full forms** of ZIFT, IUT, GIFT, ICSI and IUI.',
        'Use the **8-blastomere rule** to separate ZIFT from IUT.',
        'For amniocentesis, give the **use**, the **misuse** and the **ban**.',
        'Say that infertility may be due to **either partner**.',
      ],
      n: 'Exam tips. Learn the full forms of every technique. Use the eight-blastomere rule to decide between ZIFT and IUT. For amniocentesis, always give the proper use, the misuse and the legal ban. And remember to state that infertility can be due to the male or the female partner.',
    }),
  ],
});
