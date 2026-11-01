// ICSE 10 Biology ch13 Reproductive System — Part 1 (t01–t02), Part 2 (t03–t06).
import { sl, deck, table, flow, svgV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { MALE, FEMALE, GAMETES, FOETUS, CYCLE_STRIP, TWINS_FIG } from './svgs.mjs';
import { GAMETE, BODY, zygote, ovulationDay, CYCLE, GESTATION } from './calc.mjs';

export const V = {
  male: svgV(MALE, 'Front view of the human male reproductive system'),
  female: svgV(FEMALE, 'Front view of the human female reproductive system'),
  gametes: svgV(GAMETES, 'A human sperm and a human egg, not to scale'),
  foetus: svgV(FOETUS, 'A foetus in the uterus with the placenta, umbilical cord, amnion and amniotic fluid'),
  cycle: svgV(CYCLE_STRIP, 'Outline of a 28-day menstrual cycle'),
  twins: svgV(TWINS_FIG, 'How identical and fraternal twins are formed'),
};

export const deck1 = deck({
  part: 1,
  title: 'Reproductive System — Part 1: Organs and gametes',
  goals: [
    'Label the male and female reproductive systems and state the function of each part',
    'List the secondary sexual characters of males and females',
    'Draw a human sperm and relate its parts, and those of the egg, to their functions',
  ],
  slides: [
    sl('title', 'The Human Reproductive System', {
      b: 'Part 1 — the organs that make gametes, and the gametes themselves.',
      v: flow('LR', [['t', 'Testes make sperms'], ['o', 'Ovaries make eggs'], ['f', 'Fertilisation'], ['z', 'Zygote']], [['t', 'f'], ['o', 'f'], ['f', 'z']], 'Flow: sperms from the testes and eggs from the ovaries meet at fertilisation to form a zygote'),
      n: 'Every one of us began as a single cell formed when a sperm from the father joined an egg from the mother. In this part we look at the organs that make these cells, the tubes and glands that help them, and the cells themselves.',
    }),
    sl('diagram', 'The male reproductive system', {
      b: 'A pair of **testes** in the **scrotum**, ducts (**epididymis, vas deferens, urethra**) and **accessory glands** (seminal vesicles, prostate, Cowper\'s glands).',
      v: V.male,
      n: 'The two testes hang in the scrotum, where it is slightly cooler than inside the body. Sperms pass into the coiled epididymis, then up the vas deferens and into the urethra. On the way, three kinds of glands add fluid to them.',
    }),
    sl('concept', 'Male organs and their work', {
      v: table(['Part', 'Function'], [['Testis', 'Makes sperms; secretes testosterone'], ['Scrotum', 'Keeps the testes about two to three degrees cooler than the body'], ['Epididymis', 'Stores sperms while they mature'], ['Vas deferens', 'Carries sperms towards the urethra'], ['Seminal vesicles, prostate, Cowper\'s glands', 'Secrete fluids that nourish sperms and help them swim'], ['Urethra', 'Common passage for urine and semen']], 'Table of the parts of the male reproductive system and their functions'),
      n: 'Learn each part with its job. The testes make sperms and the male hormone. The epididymis stores them. The vas deferens carries them. The accessory glands add a nourishing fluid, and together they make semen.',
    }),
    sl('check', 'Quick check: accessory glands', {
      b: 'Which group consists only of male accessory glands?',
      chk: 'accessory-mcq',
      n: 'Leave out the organs that make sperms and the tubes that carry them.',
    }),
    sl('example', 'Worked example 1: the path of a sperm', {
      b: 'Trace a sperm from where it is made to where it leaves the body.',
      ul: ['Step 1: made in the **testis** (seminiferous tubules).', 'Step 2: stored and matured in the **epididymis**.', 'Step 3: carried by the **vas deferens**; fluids added by the **seminal vesicles and prostate**.', 'Step 4: leaves through the **urethra**.'],
      v: flow('LR', [['t', 'Testis'], ['e', 'Epididymis'], ['v', 'Vas deferens'], ['u', 'Urethra']], [['t', 'e'], ['e', 'v'], ['v', 'u', 'gland fluids added']], 'Flow: testis to epididymis to vas deferens to urethra, with gland fluids added before the urethra'),
      n: 'A path question is easiest as a chain. Testis, then epididymis, then vas deferens, then urethra. Remember where the glands join in, and that the urethra is shared with the urinary system.',
    }),
    sl('diagram', 'The female reproductive system', {
      b: 'A pair of **ovaries**, two **oviducts** (fallopian tubes), the **uterus**, the **cervix** and the **vagina**.',
      v: V.female,
      n: 'The two ovaries lie in the lower abdomen. Beside each, the fringed funnel of an oviduct waits to catch the egg. The oviducts lead into the hollow, muscular uterus, which narrows at the cervix and opens into the vagina.',
    }),
    sl('concept', 'Female organs and their work', {
      v: table(['Part', 'Function'], [['Ovary', 'Produces eggs; secretes oestrogen and progesterone'], ['Oviduct (fallopian tube)', 'Carries the egg; fertilisation takes place here'], ['Uterus', 'The embryo implants and develops here'], ['Cervix', 'Narrow neck of the uterus'], ['Vagina', 'Passage to the outside; the birth canal']], 'Table of the parts of the female reproductive system and their functions'),
      n: 'The ovary makes eggs and female hormones. The oviduct is where a sperm meets the egg. The uterus is the home of the growing baby. The cervix and vagina form the passage through which the baby is born.',
    }),
    sl('check', 'Quick check: where the embryo grows', {
      b: 'Which lettered organ receives the embryo?',
      chk: 'fig-uterus-mcq',
      n: 'Find the pear shaped organ in the middle.',
    }),
    sl('concept', 'Secondary sexual characters', {
      b: 'At **puberty**, **testosterone** and **oestrogen** bring about features that distinguish the sexes but do not make gametes.',
      v: table(['Boys (testosterone)', 'Girls (oestrogen)'], [['Deeper voice', 'Development of breasts'], ['Hair on the face and body', 'Broader hips'], ['Broader shoulders, more muscle', 'Start of menstruation']], 'Table of secondary sexual characters in boys and in girls'),
      n: 'Around the early teens, the testes and ovaries begin to release their hormones. Boys develop deeper voices and facial hair. Girls develop breasts and broader hips, and menstruation begins. These are secondary sexual characters.',
    }),
    sl('diagram', 'Sperm and egg', {
      b: 'The **sperm** is tiny and swims: **acrosome**, **nucleus**, **middle piece** with mitochondria, **tail**. The **egg** is large and still: **nucleus**, **cytoplasm**, **zona pellucida**, **follicle cells**.',
      v: V.gametes,
      n: 'The sperm is built for travel. Its acrosome carries enzymes to break into the egg, its middle piece is packed with mitochondria for energy, and its tail drives it forward. The egg is built to supply. It is far larger, with plenty of cytoplasm for the first days of life.',
    }),
    sl('example', 'Worked example 2: counting chromosomes', {
      b: 'Body cells have 46 chromosomes. How many are in a sperm, an egg and the zygote?',
      ul: [`Step 1: gametes are **haploid**: 46 ÷ 2 = **${GAMETE}**.`, `Step 2: sperm ${GAMETE}, egg ${GAMETE}.`, `Step 3: zygote = ${GAMETE} + ${GAMETE} = **${zygote(GAMETE, GAMETE)}**, the same as a body cell.`],
      v: table(['Cell', 'Chromosomes'], [['Body cell', String(BODY)], ['Sperm', String(GAMETE)], ['Egg', String(GAMETE)], ['Zygote', String(zygote(GAMETE, GAMETE))]], `Worked table: body cell ${BODY}, sperm ${GAMETE}, egg ${GAMETE}, zygote ${zygote(GAMETE, GAMETE)}`),
      n: 'The gametes are made by meiosis, so each carries half the body number. When the sperm and egg join, the two halves add up, and the zygote is back to the full number of forty six.',
    }),
    sl('check', 'Quick check: the sperm cap', {
      b: 'Fill in: the cap-like structure at the tip of the sperm head is the ______.',
      chk: 'acrosome-fill',
      n: 'It carries enzymes.',
    }),
    sl('summary', 'Summary', {
      ul: ['Male: testes in the scrotum, epididymis, vas deferens, urethra; seminal vesicles, prostate and Cowper\'s glands.', 'Female: ovaries, oviducts, uterus, cervix, vagina.', 'Secondary sexual characters appear at puberty under testosterone and oestrogen.', 'Sperm: acrosome, nucleus, middle piece, tail. Egg: large, with cytoplasm and coverings.'],
      v: table(['Male', 'Female'], [['Testis', 'Ovary'], ['Sperm', 'Egg'], ['Testosterone', 'Oestrogen, progesterone']], 'Summary table pairing male and female organs, gametes and hormones'),
      n: 'To recap. The testes and ovaries make gametes and sex hormones. Tubes carry the gametes and glands support the sperms. And the small swimming sperm and the large food rich egg are each suited to their part in fertilisation.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Write **vas deferens** (not "sperm duct" alone) and **oviduct (fallopian tube)**.', 'The **male urethra** carries urine and semen; the **female urethra** carries only urine.', 'In diagrams, draw the **epididymis** on the testis and the **vas deferens** looping over the bladder.', 'Link each sperm part to its **function**.'],
      n: 'Exam tips. Use the correct names for each tube. Remember that only the male urethra is shared. Draw diagrams neatly with ruled label lines, and whenever you name a part of the sperm, give its job too.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Reproductive System — Part 2: From fertilisation to birth',
  goals: [
    'Define fertilisation, implantation, gestation and parturition and put them in order',
    'Explain the functions of the placenta, the amnion and the amniotic fluid',
    'Outline the menstrual cycle and the roles of the sex hormones, and distinguish identical from fraternal twins',
  ],
  slides: [
    sl('title', 'From Fertilisation to Birth', {
      b: 'Part 2 — how a new life begins, grows and is born, the monthly cycle, and twins.',
      v: flow('LR', [['o', 'Ovulation'], ['f', 'Fertilisation'], ['i', 'Implantation'], ['g', 'Gestation'], ['p', 'Parturition']], [['o', 'f'], ['f', 'i'], ['i', 'g'], ['g', 'p']], 'Flow: ovulation, fertilisation, implantation, gestation, parturition'),
      n: 'An egg is released, meets a sperm, settles in the uterus, grows for about nine months, and is born. In this part we follow that journey, see how the mother supports the baby, and learn the monthly cycle that prepares the uterus.',
    }),
    sl('concept', 'Fertilisation and implantation', {
      v: table(['Event', 'What happens', 'Where'], [['Fertilisation', 'Nuclei of a sperm and an egg fuse to form a diploid zygote', 'Oviduct'], ['Cleavage', 'The zygote divides repeatedly as it moves down', 'Oviduct'], ['Implantation', 'The young embryo sinks into the thick uterine lining, about a week after fertilisation', 'Uterus'], ['Gestation', 'The embryo, later called a foetus, develops', 'Uterus'], ['Parturition', 'Uterine contractions push the baby out', 'Uterus, cervix, vagina']], 'Table of events from fertilisation to birth, what happens and where'),
      n: 'Fertilisation happens in the oviduct, not the uterus. The zygote divides as it travels down. About a week later the tiny embryo sinks into the soft lining of the uterus. That is implantation, and pregnancy has begun.',
    }),
    sl('check', 'Quick check: where fertilisation happens', {
      b: 'Fertilisation normally takes place in the…',
      chk: 'oviduct-mcq',
      n: 'Think of the tube between the ovary and the uterus.',
    }),
    sl('diagram', 'The foetus, placenta and amnion', {
      b: 'The **placenta** joins the foetus to the uterine wall through the **umbilical cord**. The foetus floats in **amniotic fluid** inside the **amnion**.',
      v: V.foetus,
      n: 'Here the foetus floats in fluid inside a thin bag, the amnion. A cord runs from its belly to the placenta, a disc of tissue fixed to the wall of the uterus. The placenta is where mother and baby exchange materials.',
    }),
    sl('concept', 'What the placenta does', {
      v: table(['Function', 'What passes or is made'], [['Nutrition', 'Glucose, amino acids, vitamins and minerals pass to the foetus'], ['Respiration', 'Oxygen to the foetus; carbon dioxide back to the mother'], ['Excretion', 'Urea and other wastes pass to the mother'], ['Endocrine', 'Secretes hormones such as progesterone'], ['Protection', 'Some antibodies pass to the foetus']], 'Table of the functions of the placenta'),
      n: 'The bloods of mother and baby never mix. They flow very close together in the placenta, and materials diffuse across. So the placenta acts as the gut, the lungs and the kidneys of the foetus, and also makes hormones that keep the pregnancy going.',
    }),
    sl('concept', 'Foetal membranes and amniotic fluid', {
      v: table(['Role of the amniotic fluid', 'Why it matters'], [['Shock absorber', 'Protects the foetus from jerks and bumps'], ['Keeps the foetus moist', 'Prevents drying and sticking to the amnion'], ['Even temperature', 'Shields the foetus from sudden changes'], ['Room to move', 'Allows free movement and growth']], 'Table of four roles of the amniotic fluid'),
      n: 'The amnion is the innermost membrane around the foetus. The fluid it holds is a natural cushion. It absorbs shocks, keeps the foetus moist and warm, and gives it room to stretch and move.',
    }),
    sl('check', 'Quick check: the fluid sac', {
      b: 'Fill in: the foetus floats in a sac formed by the ______.',
      chk: 'amnion-fill',
      n: 'It is the innermost membrane.',
    }),
    sl('example', 'Worked example 1: how long is gestation?', {
      b: `Gestation is about **${GESTATION.days} days** counted from the first day of the last menstruation.`,
      ul: [`Step 1: weeks = ${GESTATION.days} ÷ 7 = **${GESTATION.weeks}**.`, 'Step 2: months: about **nine**.', 'Step 3: birth is called **parturition**; oxytocin causes the uterine contractions.'],
      v: table(['Measure', 'Value'], [['Days', String(GESTATION.days)], ['Weeks', String(GESTATION.weeks)], ['Months (about)', '9']], `Worked table: gestation is about ${GESTATION.days} days, ${GESTATION.weeks} weeks or nine months`),
      n: 'Doctors count pregnancy from the first day of the last period, giving about forty weeks, or roughly nine months. At the end, oxytocin from the pituitary makes the uterus contract and the baby is born.',
    }),
    sl('diagram', 'The menstrual cycle', {
      b: 'In a typical **28-day** cycle: menstruation (days 1–5), repair under **oestrogen**, **ovulation** about day 14, and a thick lining kept by **progesterone** until the cycle ends.',
      v: V.cycle,
      n: 'Each month the uterus gets ready for a possible pregnancy. Its lining is shed at menstruation, then rebuilt under oestrogen. Around the middle of the cycle an egg is released. Progesterone keeps the lining thick. If no egg is fertilised, progesterone falls and the lining is shed again.',
    }),
    sl('concept', 'The sex hormones', {
      v: table(['Hormone', 'Made by', 'Role'], [['Testosterone', 'Testes (interstitial cells)', 'Male secondary sexual characters; sperm formation'], ['Oestrogen', 'Ovary (growing follicle)', 'Female secondary sexual characters; repair of the uterine lining'], ['Progesterone', 'Corpus luteum; later the placenta', 'Keeps the lining thick; maintains pregnancy']], 'Table of three sex hormones, where they are made and their roles'),
      n: 'Three hormones to know. Testosterone from the testes makes the male features. Oestrogen from the growing follicle makes the female features and rebuilds the lining. Progesterone keeps the lining ready, and during pregnancy it keeps it in place.',
    }),
    sl('example', 'Worked example 2: when is ovulation?', {
      b: 'Ovulation is about **14 days before** the next menstruation begins.',
      ul: ['Step 1: take the cycle length.', 'Step 2: subtract 14.', 'Step 3: the answer is the expected day of ovulation.'],
      v: table(['Cycle length (days)', 'Expected ovulation day'], [[String(CYCLE.length), String(ovulationDay(CYCLE.length))], ['30', String(ovulationDay(30))], ['32', String(ovulationDay(32))]], `Worked table: ovulation on day ${ovulationDay(28)} in a 28-day cycle, day ${ovulationDay(30)} in a 30-day cycle and day ${ovulationDay(32)} in a 32-day cycle`),
      n: 'The phase after ovulation lasts about two weeks in most people, so count back fourteen days from the end of the cycle. A cycle of thirty days gives ovulation around day sixteen.',
    }),
    sl('check', 'Quick check: mid-cycle', {
      b: 'In a regular 28-day cycle, ovulation is around…',
      chk: 'ovulation-day-mcq',
      n: 'Count back fourteen days.',
    }),
    sl('diagram', 'Identical and fraternal twins', {
      b: '**Identical** twins: one egg, one sperm, one zygote that splits. **Fraternal** twins: two eggs, two sperms, two zygotes.',
      v: V.twins,
      n: 'Sometimes a single zygote splits into two, and the twins share every gene. They are always the same sex. At other times two eggs are released and fertilised by two sperms. These twins are no more alike than any brother and sister.',
    }),
    sl('check', 'Quick check: same sex?', {
      b: 'Assertion and reason about identical twins.',
      chk: 'twins-ar',
      n: 'Is the reason really the cause?',
    }),
    sl('summary', 'Summary', {
      ul: ['Fertilisation in the oviduct; implantation in the uterus; gestation about forty weeks; parturition by uterine contractions.', 'Placenta: nutrition, respiration, excretion, hormones. Amniotic fluid: a cushion.', 'Cycle: menstruation, repair (oestrogen), ovulation, thick lining (progesterone).', 'Identical twins: one zygote. Fraternal twins: two zygotes.'],
      v: table(['Term', 'Meaning'], [['Implantation', 'Embryo sinks into the uterine lining'], ['Parturition', 'Birth'], ['Ovulation', 'Release of an egg']], 'Summary table of three key terms'),
      n: 'To recap. A new life begins in the oviduct, settles in the uterus and is supported by the placenta for about forty weeks. Each month the uterus prepares for this. And twins may come from one zygote or from two.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['**Fertilisation** is in the **oviduct**, not the uterus.', 'The bloods of mother and foetus **do not mix** in the placenta.', 'In the cycle, name the **hormone** and its **source** for each phase.', 'A boy and girl pair of twins must be **fraternal**.'],
      n: 'Exam tips. Fertilisation happens in the oviduct. The bloods never mix in the placenta. Give both the hormone and where it comes from. And remember, twins of different sexes must be fraternal.',
    }),
  ],
});
