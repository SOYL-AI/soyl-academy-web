// ICSE 10 Biology ch13 Reproductive System — question bank in ICSE 2027 style (age-appropriate, factual).
// Chromosome numbers, ovulation days and gestation weeks are computed by calc.mjs.
// AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true, R does not explain.
import { mk, add, svgV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { GAMETE, BODY, zygote, ovulationDay, CYCLE, GESTATION, TWINS } from './calc.mjs';
import { FEMALE_LETTERED, MALE_LETTERED, CYCLE_STRIP } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, match, part } = mk;
const femFig = svgV(FEMALE_LETTERED, 'Front view of the human female reproductive system with five parts lettered A to E');
const maleFig = svgV(MALE_LETTERED, 'Front view of the human male reproductive system with five parts lettered A to E');
const cycleFig = svgV(CYCLE_STRIP, 'Outline of a 28-day menstrual cycle with the thickness of the uterine lining');

// ---------------------------------------------------------------- t01 reproductive organs, accessory glands, secondary sexual characters
add('scrotum-mcq', mcq({
  stem: 'The testes lie in the scrotum, outside the abdominal cavity, because',
  right: 'sperms develop properly only at a temperature about 2–3 °C below body temperature', wrong: ['there is no space for them inside the abdomen', 'testosterone can act only outside the abdomen', 'sperms need light to develop'],
  sol: 'The scrotum keeps the testes slightly cooler than the body, which sperm formation needs — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('epididymis-mcq', mcq({
  stem: 'Sperms made in the testis are stored for some time and become mature in the',
  right: 'epididymis', wrong: ['seminal vesicle', 'prostate gland', 'urethra'],
  sol: 'The coiled epididymis on each testis stores sperms while they mature — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('vas-mcq', mcq({
  stem: 'The tube that carries sperms from the epididymis up towards the urethra is the',
  right: 'vas deferens', wrong: ['oviduct', 'ureter', 'seminiferous tubule'],
  sol: 'Each vas deferens runs from the epididymis over the bladder to join the urethra — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('accessory-mcq', mcq({
  stem: 'Which group consists only of male accessory glands?',
  right: "Seminal vesicles, prostate gland, Cowper's glands", wrong: ['Testes, epididymis, prostate gland', "Seminal vesicles, ovaries, Cowper's glands", 'Prostate gland, urethra, vas deferens'],
  sol: 'The accessory glands add fluid to the sperms; the testes are the primary organs and the tubes are ducts — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('urethra-mcq', mcq({
  stem: 'Which statement about the urethra of a human male is correct?',
  right: 'It carries both urine and semen, but not at the same time', wrong: ['It carries only urine', 'It carries sperms from the testis to the epididymis', 'It opens into the urinary bladder at both ends'],
  sol: 'The male urethra is a common passage for urine and semen — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('fig-uterus-mcq', mcq({
  stem: 'In the figure, which letter marks the organ in which the embryo implants and grows?',
  right: 'C', wrong: ['A', 'B', 'D'],
  sol: 'C is the uterus. A is an ovary, B an oviduct, D the cervix and E the vagina — option (@K).',
  d: 2, c: 'application', t: [1],
  assets: [femFig],
}));
add('secondary-mcq', mcq({
  stem: 'Which of these is a secondary sexual character of human males?',
  right: 'Growth of hair on the face and a deeper voice', wrong: ['Production of sperms in the testes', 'Presence of a prostate gland', 'Formation of a zygote'],
  sol: 'Secondary sexual characters appear at puberty but are not directly involved in forming gametes — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('scrotum-ar', ar({
  a: 'Sperms are not formed properly if the testes remain inside the abdomen.',
  r: 'Sperm formation needs a temperature slightly lower than normal body temperature.',
  key: 'c',
  sol: 'Both are true, and the need for a lower temperature explains why testes kept in the warmer abdomen form few sperms — option (c).',
  d: 3, c: 'analysis', t: [1],
}));
add('urethra-ar', ar({
  a: 'In human females the urethra carries both urine and eggs.',
  r: 'In human females the urethra opens to the outside separately from the vagina.',
  key: 'b',
  sol: 'The assertion is false: the female urethra carries only urine. The reason is true — option (b).',
  d: 3, c: 'analysis', t: [1],
}));
add('semen-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the milky fluid made of sperms and the secretions of the male accessory glands.',
  model: '**Semen.**',
  sol: 'Semen.', scheme: [['Semen', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('odd-male', short({
  marks: 1, wl: null,
  stem: "Choose the odd one out and name the category to which the other three belong: Seminal vesicle, Prostate gland, Cowper's gland, Oviduct.",
  model: '**Oviduct**; the others are **male accessory glands**.',
  sol: 'The oviduct is a female organ.', scheme: [['Odd one and category', 1]],
  d: 2, c: 'analysis', t: [1],
}));
add('reason-scrotum', short({
  marks: 1, wl: null,
  stem: 'Give reason: the testes of a man hang in a sac outside the abdomen.',
  model: 'The scrotum keeps the testes about **2–3 °C cooler** than the body, the temperature needed for **sperm formation**.',
  sol: 'Lower temperature for sperm formation.', scheme: [['Lower temperature needed for sperms', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('parts-fn-short', short({
  marks: 2,
  stem: 'State the function of (a) the epididymis and (b) the seminal vesicles.',
  model: '(a) The **epididymis** stores the sperms for some time, during which they **mature** and become able to swim.\n(b) The **seminal vesicles** secrete a fluid, rich in sugar, that **nourishes the sperms** and forms part of the semen.',
  sol: 'Storage and maturation; nourishing fluid.',
  scheme: [['Epididymis', 1], ['Seminal vesicles', 1]],
  d: 2, c: 'recall', t: [1],
}));
add('female-draw', short({
  marks: 3, wl: null,
  stem: 'Draw a neat, labelled diagram of the human female reproductive system (front view). Label the ovary, oviduct, uterus and cervix.',
  model: 'A pear-shaped **uterus** in the middle with a thick wall; an **oviduct** from each upper corner curving out to a fringed funnel beside an oval **ovary**; the narrow **cervix** at the lower end of the uterus opening into the vagina.',
  sol: 'Labelled front view.',
  scheme: [['Uterus with oviducts and ovaries in position', 1], ['Cervix and vagina shown', 1], ['Four correct labels', 1]],
  d: 2, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 sperm and egg
add('acrosome-mcq', mcq({
  stem: 'The acrosome at the tip of the sperm head contains',
  right: 'enzymes that help the sperm to pass through the coverings of the egg', wrong: ['mitochondria that supply energy for swimming', 'stored food for the zygote', 'the tail fibres'],
  sol: 'The acrosome releases enzymes that dissolve a path through the egg membranes — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('middle-mcq', mcq({
  stem: 'The middle piece of a sperm is packed with mitochondria because',
  right: 'they release the energy needed for the lashing of the tail', wrong: ['they carry the genes to the egg', 'they digest the egg membranes', 'they store food for the embryo'],
  sol: 'Mitochondria are the sites of respiration; they power the tail — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('egg-size-mcq', mcq({
  stem: 'A human egg is much larger than a sperm mainly because it',
  right: 'contains a large amount of cytoplasm for the early growth of the zygote', wrong: ['has to swim a long distance', 'carries twice as many chromosomes', 'has a long tail'],
  sol: 'The egg provides the cytoplasm and stored material for the first divisions of the zygote — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('sperm-chrom-mcq', mcq({
  stem: 'A human body cell has 46 chromosomes. How many chromosomes does a human sperm carry?',
  right: String(GAMETE), wrong: ['46', '22', '92'],
  sol: `A sperm is haploid: 46 ÷ 2 = ${GAMETE} — option (@K).`,
  d: 2, c: 'application', t: [2],
}));
add('egg-tf', tf({
  stem: 'A human egg moves along the oviduct by lashing its own tail.',
  key: 'f',
  sol: 'False. The egg has no tail; it is moved along by the beating of cilia and the muscular contractions of the oviduct.',
  d: 2, c: 'understanding', t: [2, 3],
}));
add('acrosome-fill', fill({
  stem: 'The cap-like structure at the tip of the sperm head is the ______.',
  acc: [['acrosome']],
  sol: 'Acrosome.',
  d: 1, c: 'recall', t: [2],
}));
add('odd-sperm', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Acrosome, Middle piece, Tail, Zona pellucida.',
  model: '**Zona pellucida**; the others are **parts of a sperm**.',
  sol: 'The zona pellucida surrounds the egg.', scheme: [['Odd one and category', 1]],
  d: 2, c: 'analysis', t: [2],
}));
add('reason-tail', short({
  marks: 1, wl: null,
  stem: 'Give reason: a sperm has a long tail, but an egg has none.',
  model: 'The sperm must **swim** to reach the egg in the oviduct, while the egg is **carried** along the oviduct and does not need to move by itself.',
  sol: 'Sperm swims; egg is carried.', scheme: [['Sperm must swim; egg is carried', 1]],
  d: 3, c: 'analysis', t: [2],
}));
add('sperm-egg-short', short({
  marks: 2,
  stem: 'Give two differences between a human sperm and a human egg.',
  model: '1. A sperm is **tiny and motile** with a tail; an egg is **large, round and non-motile**.\n2. A sperm has **very little cytoplasm**; an egg has a **large amount of cytoplasm** surrounded by protective coverings.',
  sol: 'Size and movement; cytoplasm.',
  scheme: [['First difference', 1], ['Second difference', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('sperm-draw', short({
  marks: 3, wl: null,
  stem: 'Draw a neat, labelled diagram of a human sperm. Label the acrosome, nucleus, middle piece and tail.',
  model: 'An oval **head** with a cap-like **acrosome** at the tip and a large **nucleus** filling it; a short **middle piece** behind the head containing spirally arranged mitochondria; a long, thin **tail**.',
  sol: 'Labelled sperm.',
  scheme: [['Head, middle piece and tail drawn in proportion', 1], ['Acrosome and nucleus shown', 1], ['Four correct labels', 1]],
  d: 2, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 fertilisation, implantation, gestation, parturition
add('oviduct-mcq', mcq({
  stem: 'In humans, fertilisation normally takes place in the',
  right: 'oviduct (fallopian tube)', wrong: ['uterus', 'ovary', 'vagina'],
  sol: 'The sperm meets the egg in the upper part of the oviduct — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('implant-mcq', mcq({
  stem: 'Implantation is the',
  right: 'sinking of the young embryo into the thick lining of the uterus', wrong: ['fusion of the nuclei of a sperm and an egg', 'release of an egg from the ovary', 'birth of the baby'],
  sol: 'About a week after fertilisation the embryo becomes embedded in the uterine wall — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('sequence-mcq', mcq({
  stem: 'Which sequence of events is correct?',
  right: 'Ovulation → fertilisation → implantation → gestation → parturition', wrong: ['Fertilisation → ovulation → implantation → parturition → gestation', 'Ovulation → implantation → fertilisation → gestation → parturition', 'Implantation → ovulation → fertilisation → parturition → gestation'],
  sol: 'An egg is released, fertilised, implants, develops during gestation and is born at parturition — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('gestation-mcq', mcq({
  stem: 'The gestation period of humans, counted from the first day of the last menstruation, is about',
  right: `${GESTATION.days} days (${GESTATION.weeks} weeks)`, wrong: ['28 days (4 weeks)', '120 days (about 17 weeks)', '365 days (52 weeks)'],
  sol: `Human gestation lasts about ${GESTATION.days} days, which is ${GESTATION.weeks} weeks or about nine months — option (@K).`,
  d: 1, c: 'recall', t: [3],
}));
add('zygote-ar', ar({
  a: 'The zygote has the same number of chromosomes as a body cell of either parent.',
  r: 'The zygote is formed by the fusion of two haploid gametes.',
  key: 'c',
  sol: `Both are true: ${GAMETE} + ${GAMETE} = ${zygote(GAMETE, GAMETE)}, the body-cell number, because two haploid sets combine — option (c).`,
  d: 2, c: 'understanding', t: [3, 2],
}));
add('parturition-ar', ar({
  a: 'Parturition is the release of a mature egg from the ovary.',
  r: 'Parturition is brought about by strong contractions of the muscles of the uterus.',
  key: 'b',
  sol: 'The assertion is false: parturition is childbirth; release of an egg is ovulation. The reason is true — option (b).',
  d: 2, c: 'analysis', t: [3],
}));
add('zygote-fill', fill({
  stem: 'The fusion of the nuclei of a sperm and an egg forms a diploid cell called the ______.',
  acc: [['zygote']],
  sol: 'Zygote.',
  d: 1, c: 'recall', t: [3],
}));
add('parturition-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the process of giving birth to the baby at the end of pregnancy.',
  model: '**Parturition.**',
  sol: 'Parturition.', scheme: [['Parturition', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('odd-events', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Fertilisation, Implantation, Parturition, Menstruation.',
  model: '**Menstruation**; the others are **events of pregnancy**, from conception to birth.',
  sol: 'Menstruation occurs when there is no pregnancy.', scheme: [['Odd one and category', 1]],
  d: 3, c: 'analysis', t: [3, 5],
}));
add('fert-implant-short', short({
  marks: 2,
  stem: 'Distinguish between fertilisation and implantation, giving two points.',
  model: '1. **Fertilisation** is the fusion of a sperm and an egg to form a zygote; **implantation** is the sinking of the embryo into the uterine wall.\n2. Fertilisation takes place in the **oviduct**; implantation takes place in the **uterus**, about a week later.',
  sol: 'Meaning; place and time.',
  scheme: [['Meaning of each', 1], ['Place of each', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('weeks-num', num({
  stem: `Human gestation lasts about ${GESTATION.days} days. How many weeks is this?`,
  value: GESTATION.weeks, unit: 'weeks',
  sol: `$${GESTATION.days} \\div 7 = ${GESTATION.weeks}$ weeks.`,
  scheme: [[`${GESTATION.weeks} weeks`, 1]],
  d: 1, c: 'application', t: [3],
}), (q) => q.answer.value === 40 || 'value');

// ---------------------------------------------------------------- t04 placenta, foetal membranes, amniotic fluid
add('placenta-mcq', mcq({
  stem: 'Which of these is NOT a function of the placenta?',
  right: 'Pumping blood round the body of the foetus', wrong: ['Passing digested food from the mother to the foetus', 'Removing urea and carbon dioxide from the foetus', 'Secreting hormones such as progesterone'],
  sol: "The foetus's own heart pumps its blood; the placenta exchanges materials and secretes hormones — option (@K).",
  d: 2, c: 'understanding', t: [4],
}));
add('amnion-mcq', mcq({
  stem: 'A scan shows that the amount of amniotic fluid around a foetus is much less than normal. Which risk to the foetus is most directly increased?',
  right: 'It is less cushioned against jerks and pressure', wrong: ['It will receive less oxygen through the placenta', 'Its blood will mix with the mother\'s blood', 'It will be unable to remove urea'],
  sol: 'Amniotic fluid acts as a shock absorber; oxygen supply and excretion depend on the placenta, not the fluid — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('diffusion-mcq', mcq({
  stem: "Oxygen passes from the mother's blood into the blood of the foetus by",
  right: 'diffusion across the thin walls that separate the two bloods in the placenta', wrong: ['direct mixing of the two bloods', 'the foetus breathing in amniotic fluid', 'the umbilical cord opening into the uterus'],
  sol: 'The two bloods stay separate; materials diffuse across the thin placental barrier — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('placenta-ar', ar({
  a: 'The placenta works as an endocrine gland.',
  r: 'The placenta passes oxygen from the mother to the foetus.',
  key: 'd',
  sol: 'Both are true, but passing oxygen is a respiratory role; the placenta is endocrine because it secretes hormones such as progesterone — option (d).',
  d: 3, c: 'analysis', t: [4],
}));
add('amnion-fill', fill({
  stem: 'The foetus floats in a fluid-filled sac formed by a membrane called the ______.',
  acc: [['amnion']],
  sol: 'Amnion.',
  d: 1, c: 'recall', t: [4],
}));
add('reason-amniotic', short({
  marks: 1, wl: null,
  stem: 'Give reason: the foetus is not hurt when a pregnant woman bumps lightly against a table.',
  model: 'The foetus floats in **amniotic fluid**, which acts as a **shock absorber** and spreads the jolt.',
  sol: 'Amniotic fluid cushions.', scheme: [['Amniotic fluid as shock absorber', 1]],
  d: 2, c: 'application', t: [4],
}));
add('placenta-fn-short', short({
  marks: 2,
  stem: 'After a birth, the doctor noticed that the placenta was much smaller than usual. Suggest two ways in which this could have affected the baby before birth.',
  model: '1. Less **digested food** could pass to the baby, so it may have grown slowly and had a **low birth weight**.\n2. Less **oxygen** could reach the baby, and wastes such as **carbon dioxide and urea** would be removed more slowly.',
  sol: 'Less food; less oxygen and waste removal.',
  scheme: [['Less food, slower growth', 1], ['Less oxygen or slower waste removal', 1]],
  d: 3, c: 'application', t: [4],
}));
add('organs-short', short({
  marks: 3,
  stem: 'The placenta is said to act as the lungs, the gut and the kidneys of the foetus. Explain each comparison.',
  model: '**Lungs:** **oxygen** diffuses from the mother\'s blood to the foetus and **carbon dioxide** passes back. **Gut:** digested food such as **glucose and amino acids** passes to the foetus. **Kidneys:** wastes such as **urea** pass from the foetus into the mother\'s blood, to be removed by her kidneys.',
  sol: 'Respiration, nutrition, excretion.',
  scheme: [['Lungs: oxygen in, carbon dioxide out', 1], ['Gut: digested food in', 1], ['Kidneys: urea out', 1]],
  d: 3, c: 'analysis', t: [4],
}));

// ---------------------------------------------------------------- t05 menstrual cycle; sex hormones
add('ovulation-day-mcq', mcq({
  stem: `In a regular cycle of ${CYCLE.length} days, ovulation usually takes place around`,
  right: `day ${CYCLE.ovulation}`, wrong: ['day 1', 'day 5', 'day 28'],
  sol: `Ovulation is about 14 days before the next menstruation: ${CYCLE.length} − 14 = ${CYCLE.ovulation} — option (@K).`,
  d: 1, c: 'recall', t: [5],
}));
add('progesterone-mcq', mcq({
  stem: 'If the corpus luteum stopped working a few days after ovulation, which change would follow first?',
  right: 'Progesterone would fall and the uterine lining would start to break down', wrong: ['Oestrogen would rise and a second egg would be released at once', 'The lining would become thicker than usual', 'Testosterone would be secreted in place of progesterone'],
  sol: 'The corpus luteum is the source of progesterone after ovulation; without it the lining cannot be maintained — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('menses-mcq', mcq({
  stem: 'The thick lining of the uterus breaks down and menstruation begins when',
  right: 'the egg is not fertilised and the level of progesterone falls', wrong: ['the egg is fertilised and implants', 'the level of oestrogen suddenly rises', 'the embryo starts to secrete hormones'],
  sol: 'Without fertilisation the corpus luteum breaks down, progesterone falls and the lining is shed — option (@K).',
  d: 3, c: 'analysis', t: [5],
}));
add('testosterone-mcq', mcq({
  stem: "An adult's seminiferous tubules are damaged by an infection, but the interstitial cells of his testes are healthy. Which statement is most likely to be true?",
  right: 'He still makes testosterone but forms few or no sperms', wrong: ['He forms sperms normally but makes no testosterone', 'He makes neither sperms nor testosterone', 'His seminal vesicles start to make sperms instead'],
  sol: 'Sperms form in the seminiferous tubules; testosterone comes from the interstitial cells between them — option (@K).',
  d: 3, c: 'analysis', t: [5, 1],
}));
add('oestrogen-ar', ar({
  a: 'Oestrogen helps to rebuild the lining of the uterus after menstruation.',
  r: 'Oestrogen is secreted by the anterior pituitary.',
  key: 'a',
  sol: 'The assertion is true. The reason is false: oestrogen is secreted by the ovary (the growing follicle); the anterior pituitary secretes FSH and LH — option (a).',
  d: 2, c: 'analysis', t: [5],
}));
add('corpus-tf', tf({
  stem: 'If the egg is not fertilised, the corpus luteum breaks down.',
  key: 't',
  sol: 'True. Its breakdown lowers progesterone, and the lining of the uterus is shed.',
  d: 2, c: 'understanding', t: [5],
}));
add('ovulation-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the release of a mature egg from the ovary.',
  model: '**Ovulation.**',
  sol: 'Ovulation.', scheme: [['Ovulation', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('odd-hormone', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Testosterone, Oestrogen, Progesterone, Thyroxine.',
  model: '**Thyroxine**; the others are **sex hormones**.',
  sol: 'Thyroxine is a thyroid hormone.', scheme: [['Odd one and category', 1]],
  d: 2, c: 'analysis', t: [5],
}));
add('hormone-role-short', short({
  marks: 2,
  stem: 'State one role each of testosterone and progesterone.',
  model: '**Testosterone** brings about the **male secondary sexual characters** and is needed for sperm formation. **Progesterone** keeps the **lining of the uterus** thick and supports **pregnancy**.',
  sol: 'One role each.',
  scheme: [['Testosterone', 1], ['Progesterone', 1]],
  d: 2, c: 'recall', t: [5],
}));
add('cycle-phases-short', short({
  marks: 3,
  stem: `Outline the main events of a ${CYCLE.length}-day menstrual cycle.`,
  model: `Days ${CYCLE.mensFrom}–${CYCLE.mensTo}: **menstruation**, the old uterine lining is shed with some blood. Days ${CYCLE.repairFrom}–${CYCLE.repairTo}: a follicle grows in the ovary and its **oestrogen** rebuilds the lining. About day ${CYCLE.ovulation}: **ovulation**. Days ${CYCLE.secretoryFrom}–${CYCLE.secretoryTo}: the **corpus luteum** secretes **progesterone**, keeping the lining thick; without fertilisation it breaks down and the cycle restarts.`,
  sol: 'Menstruation, repair, ovulation, secretory phase.',
  scheme: [['Menstruation and repair with oestrogen', 1], ['Ovulation about mid-cycle', 1], ['Progesterone phase and breakdown', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('ovulation-num', num({
  stem: 'Ovulation takes place about 14 days before the next menstruation begins. In a regular cycle of 32 days, on which day is ovulation expected?',
  value: ovulationDay(32),
  sol: `Day $32 - 14 = ${ovulationDay(32)}$.`,
  scheme: [[`Day ${ovulationDay(32)}`, 1]],
  d: 3, c: 'application', t: [5],
}), (q) => q.answer.value === 18 || 'value');

// ---------------------------------------------------------------- t06 identical and fraternal twins
add('identical-mcq', mcq({
  stem: 'Identical twins develop from',
  right: 'one zygote that splits into two embryos', wrong: ['two eggs fertilised by two sperms', 'one egg fertilised by two sperms', 'two zygotes that fuse together'],
  sol: 'A single zygote divides into two separate embryos with the same genes — option (@K).',
  d: 1, c: 'recall', t: [6],
}));
add('twins-sex-mcq', mcq({
  stem: 'Twins Ishaan and Ira are a boy and a girl. They must be',
  right: 'fraternal twins, formed from two separately fertilised eggs', wrong: ['identical twins, formed from one zygote', 'identical twins, formed from one egg and two sperms', 'fraternal twins, formed from one zygote that split'],
  sol: 'Identical twins share all their genes and so are always of the same sex; a boy–girl pair must be fraternal — option (@K).',
  d: 3, c: 'application', t: [6],
}));
add('twins-ar', ar({
  a: 'Identical twins are always of the same sex.',
  r: 'Identical twins develop from a single zygote and so carry the same genes.',
  key: 'c',
  sol: 'Both are true, and having the same genes from one zygote is why they are always of the same sex — option (c).',
  d: 2, c: 'understanding', t: [6],
}));
add('twins-short', short({
  marks: 2,
  stem: 'Give two differences between identical and fraternal twins.',
  model: '1. Identical twins develop from **one egg and one sperm** (one zygote that splits); fraternal twins from **two eggs and two sperms**.\n2. Identical twins have the **same genes** and are always of the **same sex**; fraternal twins **differ** and may be of different sexes.',
  sol: 'Origin; genes and sex.',
  scheme: [['Origin', 1], ['Genes and sex', 1]],
  d: 2, c: 'understanding', t: [6],
}));
add('reason-look', short({
  marks: 1, wl: null,
  stem: 'Give reason: identical twins look almost exactly alike, but fraternal twins need not.',
  model: 'Identical twins come from **one zygote** and share **the same genes**; fraternal twins come from **two zygotes** with **different gene combinations**.',
  sol: 'Same genes vs different genes.', scheme: [['One zygote, same genes', 1]],
  d: 3, c: 'understanding', t: [6],
}));

// ---------------------------------------------------------------- 5-mark Question 2 style items
add('journey-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [oviduct, zygote, uterus, implantation, placenta, ovary, cervix, parturition]\n\nAn egg released from the (a) ______ is drawn into the (b) ______, where it may be fertilised to form a (c) ______. The young embryo then moves down to the (d) ______ and sinks into its thick lining; this is called (e) ______.',
  acc: [['ovary'], ['oviduct', 'fallopian tube'], ['zygote'], ['uterus'], ['implantation']],
  sol: '(a) ovary; (b) oviduct; (c) zygote; (d) uterus; (e) implantation.',
  d: 2, c: 'understanding', t: [1, 3],
}));
add('male-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [testes, epididymis, vas deferens, urethra, prostate, testosterone, scrotum, oviduct]\n\nSperms are made in the (a) ______, which hang in a sac called the (b) ______. The sperms are stored in the coiled (c) ______ and carried by the (d) ______ towards the urethra. The testes also secrete (e) ______, which brings about the male secondary sexual characters.',
  acc: [['testes', 'testis'], ['scrotum'], ['epididymis'], ['vas deferens'], ['testosterone']],
  sol: '(a) testes; (b) scrotum; (c) epididymis; (d) vas deferens; (e) testosterone.',
  d: 2, c: 'understanding', t: [1, 5],
}));
add('female-match5', match({
  marks: 5,
  stem: 'Study the figure of the human female reproductive system and match each lettered part with its function.',
  pairs: [
    ['A', 'Produces eggs and secretes oestrogen and progesterone'],
    ['B', 'Carries the egg towards the uterus; site of fertilisation'],
    ['C', 'Receives the embryo, which implants and develops here'],
    ['D', 'Narrow neck that closes the lower end of the uterus'],
    ['E', 'Muscular passage that serves as the birth canal'],
  ],
  order: [1, 3, 0, 4, 2],
  sol: 'A ovary; B oviduct (fallopian tube); C uterus; D cervix; E vagina.',
  d: 2, c: 'application', t: [1],
  assets: [femFig],
}));

// ---------------------------------------------------------------- case-based (10 marks, Section B style)
add('cycle-case', mk.case({
  stem: 'Study the chart and answer the questions.',
  passage: `A biology class studied a chart of a regular ${CYCLE.length}-day menstrual cycle, which shows how the thickness of the lining of the uterus changes. Their teacher added that cycles of 26 to 32 days are also normal, and that ovulation takes place about 14 days before the next menstruation begins.`,
  d: 4, c: 'analysis',
  assets: [cycleFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: `Name the phase of days ${CYCLE.mensFrom} to ${CYCLE.mensTo}.`, model: '**Menstruation** (menstrual phase).', sol: 'Menstruation.', scheme: [['Menstruation', 1]], d: 1, c: 'recall', t: [5] })),
    part('b', num({ marks: 2, stem: 'On which day would ovulation be expected in a regular 30-day cycle?', value: ovulationDay(30), sol: `Ovulation is about 14 days before the next menstruation: day $30 - 14 = ${ovulationDay(30)}$.`, scheme: [['Counts 14 days back from the end of the cycle', 1], [`Day ${ovulationDay(30)}`, 1]], d: 3, c: 'application', t: [5] })),
    part('c', short({ marks: 2, stem: 'Name the hormone that rebuilds the lining after menstruation and state where it is made.', model: '**Oestrogen**. It is secreted by the **growing follicle** in the **ovary**, which develops during the days after menstruation.', sol: 'Oestrogen from the follicle.', scheme: [['Oestrogen', 1], ['Ovary (follicle)', 1]], d: 2, c: 'recall', t: [5] })),
    part('d', short({ marks: 3, stem: 'Explain why the lining stays thick after ovulation and why it breaks down at the end of the cycle.', model: 'After ovulation the empty follicle becomes the **corpus luteum**, which secretes **progesterone** and keeps the lining **thick** for implantation. If the egg is **not fertilised**, the corpus luteum **breaks down**, progesterone **falls**, and the lining is **shed** as menstruation.', sol: 'Progesterone keeps the lining; its fall causes shedding.', scheme: [['Corpus luteum secretes progesterone', 1], ['Lining kept thick for implantation', 1], ['No fertilisation: progesterone falls, lining shed', 1]], d: 4, c: 'analysis', t: [5] }), [
      short({ marks: 3, stem: 'If the egg released in this cycle is fertilised, what happens to the lining of the uterus and to menstruation? Explain.', model: 'The embryo **implants** in the thick lining. The **corpus luteum** stays active and later the **placenta** secretes **progesterone**, so the lining is **kept in place**. Menstruation therefore **stops** for the whole of the pregnancy.', sol: 'Lining kept by progesterone; no menstruation.', scheme: [['Embryo implants in the lining', 1], ['Progesterone kept up by corpus luteum, then placenta', 1], ['No menstruation during pregnancy', 1]], d: 4, c: 'analysis', t: [5, 3] }),
    ]),
    part('e', short({ marks: 2, stem: 'Why is the lining of the uterus made thick and rich in blood vessels each month?', model: 'So that, if an egg is fertilised, the **embryo can implant** in it and receive **food and oxygen** from the mother\'s blood until the **placenta** forms.', sol: 'Ready for implantation and nourishment.', scheme: [['Ready for implantation', 1], ['Supplies the embryo', 1]], d: 2, c: 'understanding', t: [5, 3] })),
  ],
}));
add('scan-case', mk.case({
  passage: "Priya's aunt is expecting a baby. At a routine scan, the doctor pointed out the baby floating in a sac of fluid, a disc-shaped organ attached to the wall of the uterus, and a cord linking the baby to it. The doctor also advised her aunt not to smoke and not to take any medicine without advice.",
  d: 3, c: 'application',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name the membrane that forms the sac of fluid around the baby.', model: '**Amnion.**', sol: 'Amnion.', scheme: [['Amnion', 1]], d: 1, c: 'recall', t: [4] })),
    part('b', short({ marks: 2, stem: 'State two ways in which the fluid in the sac protects the baby.', model: '1. It acts as a **shock absorber**, protecting the baby from jerks and bumps.\n2. It keeps the baby **moist** and at an even **temperature**, and lets it **move** freely.', sol: 'Shock absorber; moist and warm.', scheme: [['First way', 1], ['Second way', 1]], d: 2, c: 'understanding', t: [4] })),
    part('c', short({ marks: 3, stem: 'Explain how the disc-shaped organ supplies the baby with food and oxygen and removes its wastes.', model: 'This is the **placenta**. In it the baby\'s blood vessels lie very close to the mother\'s blood, without mixing. **Oxygen and digested food** diffuse into the baby\'s blood, while **carbon dioxide and urea** diffuse from the baby\'s blood into the mother\'s blood to be removed.', sol: 'Diffusion across the placenta both ways.', scheme: [['Placenta named; bloods close but separate', 1], ['Oxygen and food into the baby', 1], ['Carbon dioxide and urea out', 1]], d: 3, c: 'understanding', t: [4] })),
    part('d', short({ marks: 2, stem: 'Why did the doctor advise against smoking and unprescribed medicines?', model: 'Harmful substances such as **nicotine** and some **drugs** can **pass across the placenta** into the baby\'s blood and **harm its development**, for example causing low birth weight.', sol: 'Harmful substances cross the placenta.', scheme: [['Substances cross the placenta', 1], ['Harm to the developing baby', 1]], d: 3, c: 'application', t: [4] })),
    part('e', short({ marks: 2, stem: 'Name a hormone secreted by this organ and state its role during pregnancy.', model: '**Progesterone.** It keeps the **lining of the uterus** in place and stops further ovulation and menstruation, so that the **pregnancy continues**.', sol: 'Progesterone maintains pregnancy.', scheme: [['Progesterone', 1], ['Maintains the uterine lining and pregnancy', 1]], d: 2, c: 'understanding', t: [4, 5] }), [
      short({ marks: 2, stem: 'Name the structure that links the baby to the disc-shaped organ and state what it contains.', model: 'The **umbilical cord**. It contains **blood vessels** that carry the baby\'s blood to the placenta and bring it back with food and oxygen.', sol: 'Umbilical cord with blood vessels.', scheme: [['Umbilical cord', 1], ['Contains blood vessels', 1]], d: 2, c: 'recall', t: [4] }),
    ]),
  ],
}));
add('twins-case', mk.case({
  passage: 'Riya and Tia are twin sisters who look so alike that their teachers often mix them up. Their cousins, Aman and Neha, are also twins, a brother and a sister born on the same day.',
  d: 3, c: 'analysis',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Which pair of twins is likely to be identical?', model: '**Riya and Tia.**', sol: 'Riya and Tia.', scheme: [['Riya and Tia', 1]], d: 1, c: 'application', t: [6] })),
    part('b', short({ marks: 2, stem: 'Explain how identical twins are formed.', model: '**One egg** is fertilised by **one sperm** to form a single **zygote**. Early in its development this zygote **splits into two** separate groups of cells, each of which grows into a baby.', sol: 'One zygote splits.', scheme: [['One egg and one sperm form one zygote', 1], ['Zygote splits into two embryos', 1]], d: 2, c: 'understanding', t: [6] })),
    part('c', short({ marks: 2, stem: 'Explain how Aman and Neha were formed.', model: 'They are **fraternal twins**. **Two eggs** were released and each was fertilised by a **different sperm**, giving **two zygotes** that developed side by side in the uterus.', sol: 'Two eggs, two sperms.', scheme: [['Two eggs fertilised by two sperms', 1], ['Two zygotes develop together', 1]], d: 2, c: 'application', t: [6] })),
    part('d', num({ stem: 'How many eggs were released to form Aman and Neha?', value: TWINS.fraternal.eggs, sol: `Fraternal twins need ${TWINS.fraternal.eggs} eggs, one for each zygote.`, scheme: [[`${TWINS.fraternal.eggs}`, 1]], d: 2, c: 'application', t: [6] })),
    part('e', short({ marks: 2, stem: 'Why are identical twins always of the same sex, while fraternal twins may not be?', model: 'Identical twins come from **one zygote** and so carry **exactly the same genes**, including those that decide sex. Fraternal twins come from **two zygotes**, each formed by a different sperm, so their genes **differ**.', sol: 'Same genes vs different genes.', scheme: [['One zygote, same genes', 1], ['Two zygotes, different genes', 1]], d: 3, c: 'analysis', t: [6] })),
    part('f', short({ marks: 2, stem: 'Can Riya and Tia have different blood groups? Explain.', model: '**No.** Blood group is decided by **genes**, and identical twins have the **same genes** because they came from a **single zygote**.', sol: 'No, same genes.', scheme: [['No', 1], ['Same genes from one zygote', 1]], d: 3, c: 'analysis', t: [6] }), [
      short({ marks: 2, stem: 'Can Aman and Neha have different blood groups? Explain.', model: '**Yes, they can.** They came from **two different zygotes**, so they may have inherited **different genes** for blood group, just like any brother and sister.', sol: 'Yes, different genes.', scheme: [['Yes', 1], ['Different zygotes, different genes', 1]], d: 3, c: 'analysis', t: [6] }),
    ]),
  ],
}));
add('malefig-case', mk.case({
  stem: 'Study the figure and answer the questions.',
  passage: 'The figure shows a simplified front view of the human male reproductive system with five parts lettered A to E.',
  d: 3, c: 'application',
  assets: [maleFig],
  children: [
    part('a', short({ marks: 2, stem: 'Name the part labelled A and the two things it produces.', model: 'A is the **testis**. It produces **sperms** (in its seminiferous tubules) and the hormone **testosterone** (from its interstitial cells).', sol: 'Testis: sperms and testosterone.', scheme: [['Testis', 1], ['Sperms and testosterone', 1]], d: 2, c: 'recall', t: [1, 5] })),
    part('b', short({ marks: 1, wl: null, stem: 'Name the part labelled B and state its function.', model: '**Epididymis**; it **stores sperms** while they mature.', sol: 'Epididymis.', scheme: [['Epididymis and function', 1]], d: 2, c: 'recall', t: [1] })),
    part('c', short({ marks: 2, stem: 'What would happen if the tube C were blocked on both sides?', model: 'C is the **vas deferens**. If blocked, sperms **could not reach the urethra**, so the semen would contain **no sperms** and the man **could not father a child**; testosterone would still be made.', sol: 'No sperms in semen.', scheme: [['Sperms cannot reach the urethra', 1], ['Cannot father a child; hormones unaffected', 1]], d: 3, c: 'analysis', t: [1] })),
    part('d', short({ marks: 2, stem: 'Name D and E, and state the role of their secretions.', model: 'D is a **seminal vesicle** and E the **prostate gland**. Their fluids form most of the **semen**; they **nourish the sperms** and help them to **swim**.', sol: 'Seminal vesicle and prostate.', scheme: [['D and E named', 1], ['Role of secretions', 1]], d: 2, c: 'understanding', t: [1] })),
    part('e', short({ marks: 3, stem: 'State three ways in which the sperm made in A is suited to its function.', model: '1. Its **acrosome** carries **enzymes** that help it enter the egg.\n2. Its **middle piece** has many **mitochondria** that release energy for swimming.\n3. Its long **tail** lets it **swim** to the egg, and its **haploid nucleus** carries the father\'s genes.', sol: 'Acrosome, mitochondria, tail.', scheme: [['Acrosome', 1], ['Middle piece', 1], ['Tail or haploid nucleus', 1]], d: 3, c: 'application', t: [2] }), [
      short({ marks: 3, wl: null, stem: 'Draw a neat, labelled diagram of the sperm made in A. Label the acrosome, nucleus and tail.', model: 'An oval **head** with a cap-like **acrosome** at the tip and a large **nucleus**; a short middle piece; a long, thin **tail**.', sol: 'Labelled sperm.', scheme: [['Head, middle piece and tail', 1], ['Acrosome and nucleus', 1], ['Three labels', 1]], d: 2, c: 'application', t: [2] }),
    ]),
  ],
}));
add('journey-case', mk.case({
  passage: 'A science exhibition model traces the journey of a human egg: its release from the ovary, its meeting with a sperm in the oviduct, the move of the young embryo to the uterus, nine months of growth, and finally the birth of the baby.',
  d: 3, c: 'application',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name the release of the egg from the ovary.', model: '**Ovulation.**', sol: 'Ovulation.', scheme: [['Ovulation', 1]], d: 1, c: 'recall', t: [5] })),
    part('b', num({ stem: 'How many chromosomes does the zygote formed in the oviduct contain?', value: zygote(GAMETE, GAMETE), sol: `Sperm ${GAMETE} + egg ${GAMETE} = ${zygote(GAMETE, GAMETE)} chromosomes.`, scheme: [[`${BODY}`, 1]], d: 2, c: 'application', t: [3] })),
    part('c', short({ marks: 2, stem: 'Define implantation and state where it takes place.', model: '**Implantation** is the **sinking** of the young embryo into the thick, spongy **lining of the uterus**, where it becomes attached and begins to receive nourishment from the mother.', sol: 'Embryo embeds in the uterine lining.', scheme: [['Definition', 1], ['Uterine wall', 1]], d: 2, c: 'understanding', t: [3] })),
    part('d', short({ marks: 2, stem: `The model says the baby was born about ${GESTATION.days} days after the first day of the mother's last menstruation. Express this in weeks and name the period.`, model: `${GESTATION.days} days ÷ 7 = **${GESTATION.weeks} weeks**. This period of development in the uterus is called **gestation**.`, sol: `${GESTATION.weeks} weeks; gestation.`, scheme: [[`${GESTATION.weeks} weeks`, 1], ['Gestation', 1]], d: 2, c: 'application', t: [3] })),
    part('e', short({ marks: 3, stem: 'Describe parturition and name the hormone that brings it about.', model: 'At the end of gestation the **muscles of the uterus** begin strong, rhythmic **contractions**. The **cervix widens** and the baby is pushed out head first through the vagina (the birth canal); the placenta follows. The contractions are brought about by **oxytocin** from the pituitary.', sol: 'Uterine contractions, oxytocin.', scheme: [['Uterine contractions', 1], ['Cervix widens; baby pushed out', 1], ['Oxytocin', 1]], d: 2, c: 'understanding', t: [3] })),
    part('f', short({ marks: 1, wl: null, stem: 'Name the organ that will supply the embryo with oxygen once it has implanted.', model: '**Placenta.**', sol: 'Placenta.', scheme: [['Placenta', 1]], d: 1, c: 'recall', t: [4] })),
  ],
}));
add('puberty-case', mk.case({
  passage: "At thirteen, Kabir noticed that his voice was cracking and becoming deeper and that hair was growing on his upper lip. His classmate Sana had grown taller over the year, and her hips had become broader. Their teacher explained that hormones from the testes and the ovaries had begun to work.",
  d: 2, c: 'understanding',
  children: [
    part('a', short({ marks: 2, stem: "Name the hormone responsible for the changes in Kabir and in Sana, and the gland that secretes each.", model: "Kabir's changes are caused by **testosterone**, secreted by the interstitial cells of his **testes**. Sana's changes are caused by **oestrogen**, secreted by her **ovaries**.", sol: 'Testosterone; oestrogen.', scheme: [['Testosterone from the testes', 1], ['Oestrogen from the ovaries', 1]], d: 2, c: 'recall', t: [5, 1] })),
    part('b', short({ marks: 2, stem: 'State two other secondary sexual characters that develop in boys.', model: '1. **Broader shoulders** and a more **muscular** body.\n2. Growth of hair in the **armpits** and on the **chest** and other parts of the body.', sol: 'Any two.', scheme: [['First character', 1], ['Second character', 1]], d: 1, c: 'recall', t: [1] })),
    part('c', short({ marks: 2, stem: 'State two other secondary sexual characters that develop in girls.', model: '1. Development of the **breasts**.\n2. The **start of menstruation**, and growth of hair in the armpits.', sol: 'Any two.', scheme: [['First character', 1], ['Second character', 1]], d: 1, c: 'recall', t: [1] })),
    part('d', short({ marks: 2, stem: 'Why are these called secondary sexual characters?', model: 'They **distinguish** a man from a woman but are **not directly involved** in making gametes or in reproduction; the **primary** sex organs are the testes and ovaries.', sol: 'Not directly involved in reproduction.', scheme: [['Distinguish the sexes', 1], ['Not directly involved in reproduction', 1]], d: 2, c: 'understanding', t: [1] })),
    part('e', short({ marks: 2, stem: 'Name the two pituitary hormones that stimulate the testes and ovaries to work at puberty.', model: '**FSH** (follicle-stimulating hormone) and **LH** (luteinising hormone), both from the **anterior pituitary**, stimulate the testes and ovaries.', sol: 'FSH and LH.', scheme: [['FSH', 1], ['LH', 1]], d: 3, c: 'application', t: [5] }), [
      short({ marks: 2, stem: 'Why do these changes not appear in early childhood?', model: 'In childhood the testes and ovaries make **very little** sex hormone. Only at **puberty**, when the pituitary begins to stimulate them, do the **sex hormones rise** and bring about the changes.', sol: 'Hormones rise only at puberty.', scheme: [['Little sex hormone before puberty', 1], ['Rise at puberty causes changes', 1]], d: 3, c: 'analysis', t: [5, 1] }),
    ]),
  ],
}));
