// ISC 12 Biology ch03 Human Reproduction — three decks: Part 1 (t01–t02), Part 2 (t03–t04), Part 3 (t05–t07).
import { sl, deck, table, flow, svgV, r } from '../../isc-12-biology-ch01/src/lib.mjs';
import { MALE, FEMALE, TUBULE, SPERM, OVARY, CYCLE, JOURNEY, BLASTOCYST } from './svgs.mjs';
import { HUMAN, spermatogenesis, oogenesis, tubuleRange, semen } from './calc.mjs';

export const V = {
  male: svgV(MALE, 'Schematic front view of the male reproductive system with its organs labelled'),
  female: svgV(FEMALE, 'Schematic front view of the female reproductive system with its organs labelled'),
  tubule: svgV(TUBULE, 'Transverse section of a seminiferous tubule showing stages of spermatogenesis, Sertoli cells and Leydig cells'),
  sperm: svgV(SPERM, 'Structure of a human sperm: acrosome, nucleus, neck, middle piece and tail'),
  ovary: svgV(OVARY, 'Section of an ovary with follicles at different stages, ovulation and corpus luteum'),
  cycle: svgV(CYCLE, 'Hormone levels, phases and endometrium across a 28-day menstrual cycle'),
  journey: svgV(JOURNEY, 'From ovulation and fertilisation in the ampulla through cleavage to implantation of the blastocyst'),
  blast: svgV(BLASTOCYST, 'A blastocyst with trophoblast, blastocoel and inner cell mass'),
};

// ---------------------------------------------------------------- computed numbers
const TUB = tubuleRange(250, 2);
const SEM = semen(250, 60, 40);
const SP = spermatogenesis(50);
const OO = oogenesis(50);

export const deck1 = deck({
  part: 1,
  title: 'Human Reproduction — Part 1: The male and female reproductive systems',
  goals: [
    'Draw and label the male reproductive system and the T.S. of a seminiferous tubule',
    'Draw and label the female reproductive system and the T.S. of an ovary',
    'State the functions of each organ and gland',
  ],
  slides: [
    sl('title', 'Human Reproduction', {
      b: 'Part 1 — the organs that make gametes, carry them and support a pregnancy.',
      v: flow('LR', [['g', 'Gametogenesis'], ['i', 'Insemination'], ['f', 'Fertilisation'], ['p', 'Implantation and pregnancy'], ['b', 'Parturition']], [['g', 'i'], ['i', 'f'], ['f', 'p'], ['p', 'b']], 'Flow of the main reproductive events in humans'),
      n: 'Humans reproduce sexually and are viviparous. The main events are gametogenesis, insemination, fertilisation, implantation, development of the embryo and foetus, and parturition. This part looks at the organs in which these events happen.',
    }),
    sl('diagram', 'The male reproductive system', {
      b: 'A pair of **testes** lies in the **scrotum**, outside the abdominal cavity, at a temperature **2–2.5 °C lower** than body temperature, which is needed for spermatogenesis. **Accessory ducts** (rete testis, vasa efferentia, epididymis, vas deferens) and **glands** (seminal vesicles, prostate, bulbourethral glands) complete the system.',
      v: V.male,
      n: 'Sperm production needs a slightly lower temperature than the body, so the testes hang outside in the scrotum. Sperms leave each testis through a series of ducts and are stored and matured in the epididymis before passing along the vas deferens.',
    }),
    sl('concept', 'Ducts and glands of the male system', {
      b: 'Sperms travel: **seminiferous tubules → rete testis → vasa efferentia → epididymis → vas deferens → ejaculatory duct → urethra**.',
      v: table(['Gland', 'Secretion and role'], [['Seminal vesicles (paired)', 'Fluid rich in fructose (energy for sperms), calcium and certain enzymes'], ['Prostate', 'Milky fluid that activates sperms and adds to semen volume'], ['Bulbourethral (Cowper’s) glands', 'Mucus that lubricates the penis'], ['Together', 'Seminal plasma; with sperms it forms semen']], 'Table of male accessory glands and their secretions'),
      n: 'The secretions of the seminal vesicles, the prostate and the bulbourethral glands make up the seminal plasma. It nourishes and activates the sperms and provides a medium in which they can swim.',
    }),
    sl('diagram', 'Microscopic structure of the testis', {
      b: 'Each testis has about **250 lobules**, each with **1–3** highly coiled **seminiferous tubules**. The tubules are lined by **spermatogonia** (male germ cells) and **Sertoli cells** (which nourish the germ cells). Between the tubules, **interstitial (Leydig) cells** secrete **androgens** (testosterone).',
      v: V.tubule,
      n: 'Look at a tubule from the wall inwards: spermatogonia at the edge, then spermatocytes, then spermatids, and sperms in the lumen. The tall Sertoli cells support and feed them. Outside the tubules, Leydig cells produce the male hormones.',
    }),
    sl('example', 'Worked example 1: counting tubules and sperms', {
      b: `Each testis has about 250 lobules with 1–3 seminiferous tubules each. (a) What range of tubules do two testes contain? (b) An ejaculate has ${SEM.total} million sperms; for normal fertility at least 60 percent must be normal in shape and at least 40 percent vigorously motile. Find the minimum numbers.`,
      ul: [
        r`(a) Minimum $= 250 \times 1 \times 2 = ${TUB.min}$; maximum $= 250 \times 3 \times 2 = ${TUB.max}$.`,
        r`(b) Normal shape $\geq ${SEM.total} \times 0.6 = ${SEM.normal}$ million; motile $\geq ${SEM.total} \times 0.4 = ${SEM.motile}$ million.`,
      ],
      v: table(['Quantity', 'Value'], [['Tubules in two testes', `${TUB.min}–${TUB.max}`], ['Normal-shaped sperms (minimum)', `${SEM.normal} million`], ['Vigorously motile (minimum)', `${SEM.motile} million`]], `Worked table: ${TUB.min}–${TUB.max} tubules; ${SEM.normal} and ${SEM.motile} million sperms`),
      n: 'Multiply lobules by tubules per lobule and by two testes: five hundred to fifteen hundred tubules. For the sperm counts, sixty percent of two hundred and fifty million is one hundred and fifty million, and forty percent is one hundred million.',
    }),
    sl('check', 'Quick check: Leydig cells', {
      b: 'Which cells of the testis secrete androgens?',
      n: 'Quick check. They lie between the tubules.',
      chk: 'leydig-mcq',
    }),
    sl('diagram', 'The female reproductive system', {
      b: 'A pair of **ovaries**, a pair of **oviducts (fallopian tubes)**, the **uterus**, **cervix**, **vagina** and external genitalia, with a pair of **mammary glands**. Each oviduct has a funnel-shaped **infundibulum** with **fimbriae**, a wider **ampulla** and a narrow **isthmus**. The uterine wall has **perimetrium**, **myometrium** and **endometrium**.',
      v: V.female,
      n: 'The fimbriae help to collect the ovum released from the ovary. Fertilisation usually takes place in the ampulla. The thick muscular myometrium contracts strongly during delivery, and the glandular endometrium changes during the menstrual cycle.',
    }),
    sl('concept', 'Organs of the female system', {
      b: 'Each organ has a specific role.',
      v: table(['Organ', 'Function'], [['Ovaries (2–4 cm)', 'Produce ova and the hormones estrogen and progesterone'], ['Oviduct', 'Collects the ovum; site of fertilisation (ampulla)'], ['Uterus', 'Implantation and growth of the foetus'], ['Cervix and vagina', 'Birth canal'], ['Mammary glands', 'Milk production after birth; each has 15–20 lobes of alveoli opening into ducts and a lactiferous duct']], 'Table of female organs and their functions'),
      n: 'The ovary is both a gamete-producing and an endocrine organ. The oviduct carries the ovum and is where sperm and ovum meet. The uterus nurtures the developing baby, and the mammary glands nourish it after birth.',
    }),
    sl('diagram', 'Microscopic structure of the ovary', {
      b: 'The ovary is covered by a thin epithelium enclosing the **stroma**: an outer **cortex** and inner **medulla**. The cortex contains **follicles** at different stages — **primary**, **secondary**, **tertiary** (with a fluid-filled **antrum**) and the mature **Graafian follicle** — and, after ovulation, the **corpus luteum**.',
      v: V.ovary,
      n: 'A section through an ovary shows follicles at every stage of development side by side. The Graafian follicle bursts at ovulation and releases a secondary oocyte; what remains of it becomes the corpus luteum, which secretes progesterone.',
    }),
    sl('example', 'Worked example 2: tracing a pathway', {
      b: 'Trace the path of a sperm from where it is formed to where it meets an ovum, naming each structure in order.',
      ul: [
        'Male: seminiferous tubule → rete testis → vasa efferentia → epididymis → vas deferens → ejaculatory duct → urethra.',
        'Female: vagina → cervix → uterus → isthmus → **ampulla** of the oviduct, where fertilisation usually takes place.',
      ],
      v: flow('LR', [['t', 'Seminiferous tubule'], ['e', 'Epididymis'], ['v', 'Vas deferens'], ['u', 'Urethra'], ['c', 'Cervix, uterus'], ['a', 'Ampulla of oviduct']], [['t', 'e'], ['e', 'v'], ['v', 'u'], ['u', 'c'], ['c', 'a']], 'Worked flow of the path of a sperm to the ampulla'),
      n: 'In the male, sperms move through the rete testis and vasa efferentia to the epididymis, then along the vas deferens to the urethra. In the female, they swim through the cervix and uterus into the oviduct, reaching the ampulla, where they may meet the ovum.',
    }),
    sl('check', 'Quick check: fertilisation site', {
      b: 'In which part of the oviduct does fertilisation usually take place?',
      n: 'Quick check. It is the wider part next to the infundibulum.',
      chk: 'ampulla-mcq',
    }),
    sl('check', 'Quick check: testes', {
      b: 'Judge the assertion and the reason about the scrotum.',
      n: 'Quick check. Why are the testes outside the abdomen?',
      chk: 'scrotum-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Testes in scrotum (2–2.5 °C lower); about 250 lobules with 1–3 seminiferous tubules; Sertoli cells nourish; Leydig cells make androgens.',
        'Ducts: rete testis, vasa efferentia, epididymis, vas deferens, ejaculatory duct, urethra; glands: seminal vesicles, prostate, bulbourethral.',
        'Ovaries (cortex with follicles, medulla); oviduct (infundibulum, fimbriae, ampulla, isthmus); uterus (perimetrium, myometrium, endometrium); cervix; vagina; mammary glands.',
      ],
      v: table(['Male', 'Female'], [['Testis', 'Ovary'], ['Seminiferous tubule', 'Follicle'], ['Leydig cells: androgens', 'Follicle and corpus luteum: estrogen, progesterone']], 'Summary table comparing male and female gonads'),
      n: 'To recap: the testes produce sperms in seminiferous tubules and androgens in Leydig cells, and ducts and glands deliver them in semen. The ovaries produce ova in follicles and secrete hormones, and the oviduct, uterus and vagina receive sperms and nurture the embryo.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Draw the **male and female systems** and the **T.S. of a seminiferous tubule** and **ovary**, in pencil.',
        'Name each **accessory gland** with its secretion.',
        'Know the **order of male ducts** and the **parts of the oviduct**.',
      ],
      n: 'Exam tips. Practise the four diagrams. Learn each gland and what it adds to semen. And be able to list the male ducts and the parts of the oviduct in order.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Human Reproduction — Part 2: Gametogenesis and the menstrual cycle',
  goals: [
    'Describe spermatogenesis, spermiogenesis, spermiation and oogenesis',
    'Explain the hormonal control of gametogenesis',
    'Relate ovarian and uterine changes to hormones in the menstrual cycle',
    'Distinguish oestrous and menstrual cycles',
  ],
  slides: [
    sl('title', 'Gametogenesis', {
      b: 'Part 2 — how sperms and ova are made, and how hormones time it.',
      v: flow('LR', [['h', 'Hypothalamus: GnRH'], ['p', 'Pituitary: LH and FSH'], ['g', 'Gonads: gametes and sex hormones']], [['h', 'p'], ['p', 'g']], 'Flow of hormonal control from hypothalamus to gonads'),
      n: 'Gametogenesis is the formation of gametes: spermatogenesis in the testes and oogenesis in the ovaries. Both are controlled by hormones from the hypothalamus and the anterior pituitary gland.',
    }),
    sl('concept', 'Spermatogenesis', {
      b: 'Begins at **puberty**. **Spermatogonia (2n, 46)** multiply by mitosis; some become **primary spermatocytes (2n)**, which complete meiosis I to form **two secondary spermatocytes (n, 23)**; these complete meiosis II to form **four spermatids (n)**.',
      v: flow('LR', [['g', 'Spermatogonium (2n)'], ['p', 'Primary spermatocyte (2n)'], ['s', '2 secondary spermatocytes (n)'], ['t', '4 spermatids (n)'], ['z', '4 sperms (n)']], [['g', 'p', 'growth'], ['p', 's', 'meiosis I'], ['s', 't', 'meiosis II'], ['t', 'z', 'spermiogenesis']], 'Flow of spermatogenesis from spermatogonium to sperms'),
      n: 'One primary spermatocyte gives rise to four sperms. Spermatids are transformed into sperms by spermiogenesis. The sperm heads become embedded in the Sertoli cells, and are finally released from the tubules by a process called spermiation.',
    }),
    sl('diagram', 'The sperm', {
      b: 'A sperm has a **head** with an elongated **haploid nucleus** capped by the **acrosome** (enzymes that help fertilise the ovum), a **neck**, a **middle piece** with numerous **mitochondria** (energy for movement) and a **tail**. A plasma membrane covers the whole body.',
      v: V.sperm,
      n: 'The acrosome carries enzymes that help the sperm penetrate the layers around the ovum. The mitochondria of the middle piece supply energy for the tail, which drives the sperm forward. Human males ejaculate about two hundred to three hundred million sperms at a time.',
    }),
    sl('concept', 'Hormonal control of spermatogenesis', {
      b: 'At puberty, **GnRH** from the hypothalamus increases. It acts on the anterior pituitary to release **LH** and **FSH**.',
      v: table(['Hormone', 'Target', 'Action'], [['GnRH', 'Anterior pituitary', 'Stimulates release of LH and FSH'], ['LH', 'Leydig cells', 'Stimulates synthesis and secretion of androgens, which stimulate spermatogenesis'], ['FSH', 'Sertoli cells', 'Stimulates secretion of factors that help spermiogenesis']], 'Table of hormones controlling spermatogenesis'),
      n: 'LH acts on the Leydig cells to make androgens, and FSH acts on the Sertoli cells. Together they keep spermatogenesis going throughout adult life.',
    }),
    sl('concept', 'Oogenesis', {
      b: 'Begins **before birth**: millions of **oogonia** form in each foetal ovary. They enter meiosis I and are arrested as **primary oocytes**, each in a **primary follicle**. Many follicles degenerate, so only **60,000–80,000** remain at puberty.',
      v: flow('TB', [['o', 'Oogonia (2n), in the foetus'], ['p', 'Primary oocyte (2n), arrested in prophase I'], ['s', 'Secondary oocyte (n) + first polar body; meiosis I completed in the tertiary follicle'], ['g', 'Graafian follicle releases the secondary oocyte at ovulation'], ['v', 'Meiosis II completes only after sperm entry: ovum (n) + second polar body']], [['o', 'p'], ['p', 's'], ['s', 'g'], ['g', 'v']], 'Flow of oogenesis from oogonia to ovum'),
      n: 'The primary oocyte waits in arrested meiosis for many years. In the tertiary follicle it completes the first division unequally, forming a large secondary oocyte and a tiny first polar body. The second division is completed only if a sperm enters, giving one ovum and a second polar body.',
    }),
    sl('example', 'Worked example 1: sperms versus ova', {
      b: `${SP.primary} primary spermatocytes and ${OO.primary} primary oocytes complete meiosis. How many sperms and how many ova form? Give the chromosome number of each gamete.`,
      ul: [
        r`Sperms $= ${SP.primary} \times 4 = ${SP.sperms}$; ova $= ${OO.primary} \times 1 = ${OO.ova}$.`,
        r`Each gamete is haploid: $\dfrac{${HUMAN.diploid}}{2} = ${HUMAN.haploid}$ chromosomes.`,
        'Oogenesis puts almost all the cytoplasm into one cell; the polar bodies degenerate.',
      ],
      v: table(['Process', 'Gametes per meiocyte', 'From 50 cells'], [['Spermatogenesis', '4 sperms', String(SP.sperms)], ['Oogenesis', '1 ovum (+ polar bodies)', String(OO.ova)]], `Worked table: ${SP.sperms} sperms and ${OO.ova} ova`),
      n: 'Each primary spermatocyte gives four sperms, so fifty give two hundred. Each primary oocyte gives only one ovum, so fifty give fifty. Every gamete has twenty-three chromosomes.',
    }),
    sl('check', 'Quick check: spermiation', {
      b: 'What is spermiation?',
      n: 'Quick check. It is the last step, after spermiogenesis.',
      chk: 'spermiation-mcq',
    }),
    sl('diagram', 'The menstrual cycle', {
      b: 'The reproductive cycle of female primates is the **menstrual cycle**, about **28 days**. **Menarche** is the first menstruation at puberty; cycles cease at **menopause**, around **50 years**. Phases: **menstrual** (days 1–5), **follicular (proliferative)**, **ovulation** (about day 14) and **luteal (secretory)**.',
      v: V.cycle,
      n: 'Each phase is driven by hormones. In the follicular phase, follicles grow and secrete estrogen, which rebuilds the endometrium. A sharp surge of luteinising hormone in mid-cycle causes ovulation. The corpus luteum then secretes progesterone, which keeps the endometrium ready for implantation.',
    }),
    sl('concept', 'Hormones and phases', {
      b: 'The ovarian and uterine changes are linked by hormones.',
      v: table(['Phase', 'Ovary', 'Uterus', 'Hormones'], [['Menstrual (1–5)', 'Corpus luteum has degenerated', 'Endometrium breaks down; bleeding', 'Low progesterone'], ['Follicular (5–13)', 'Primary follicles grow into a Graafian follicle', 'Endometrium regenerates', 'FSH and LH rise; estrogen rises'], ['Ovulation (about 14)', 'Graafian follicle ruptures, releasing the secondary oocyte', '—', 'LH surge (with FSH)'], ['Luteal (15–28)', 'Corpus luteum forms', 'Endometrium thick, secretory', 'Progesterone high; falls if no fertilisation']], 'Table of ovarian, uterine and hormonal events in each phase'),
      n: 'Menstruation happens only if the released ovum is not fertilised. If fertilisation occurs, the corpus luteum persists, progesterone stays high, and menstruation stops, so lack of menstruation may indicate pregnancy, though it can have other causes.',
    }),
    sl('example', 'Worked example 2: reading a cycle', {
      b: 'A woman’s cycle is 28 days. (a) On about which day is ovulation expected? (b) Which hormone surge triggers it? (c) Which structure keeps the endometrium thick afterwards, and what happens if no fertilisation occurs?',
      ul: [
        '(a) About **day 14** (mid-cycle).',
        '(b) The **LH surge**, together with a rise in FSH.',
        '(c) The **corpus luteum** secretes **progesterone**; without fertilisation it degenerates, progesterone falls and **menstruation** begins.',
      ],
      v: table(['Question', 'Answer'], [['Ovulation', 'About day 14'], ['Trigger', 'LH surge'], ['Maintains endometrium', 'Corpus luteum (progesterone)'], ['No fertilisation', 'Corpus luteum degenerates; menstruation']], 'Worked table answering three questions on the cycle'),
      n: 'In a twenty-eight-day cycle, ovulation falls near the middle. The surge of luteinising hormone causes the Graafian follicle to burst. The corpus luteum then secretes progesterone, and when it degenerates, the endometrium breaks down.',
    }),
    sl('check', 'Quick check: LH surge', {
      b: 'Which event is directly caused by the mid-cycle LH surge?',
      n: 'Quick check. Think of what happens around day fourteen.',
      chk: 'lhsurge-mcq',
    }),
    sl('concept', 'Oestrous versus menstrual cycle', {
      b: 'Non-primate mammals have an **oestrous cycle**.',
      v: table(['Feature', 'Menstrual cycle', 'Oestrous cycle'], [['Found in', 'Primates (monkeys, apes, humans)', 'Non-primate mammals (cows, sheep, rats, deer, dogs, tigers)'], ['Bleeding', 'Menstrual flow occurs', 'No menstrual bleeding'], ['Sexual receptivity', 'Not restricted to a period', 'Only during oestrus (heat)'], ['Endometrium', 'Shed at the end of the cycle', 'Reabsorbed']], 'Table comparing menstrual and oestrous cycles'),
      n: 'In oestrous animals the endometrium is reabsorbed rather than shed, and the female is receptive only during a short period called oestrus, or heat. Primates show a menstrual cycle with bleeding.',
    }),
    sl('check', 'Quick check: oogenesis', {
      b: 'Judge the assertion and the reason about oogenesis.',
      n: 'Quick check. When is the second meiotic division completed?',
      chk: 'meiosis2-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Spermatogenesis from puberty: spermatogonium → primary → 2 secondary spermatocytes → 4 spermatids → spermiogenesis → sperms; spermiation releases them.',
        'GnRH → LH (Leydig cells: androgens) and FSH (Sertoli cells: spermiogenesis).',
        'Oogenesis from foetal life: primary oocyte arrested in prophase I; secondary oocyte ovulated; meiosis II after sperm entry; 1 ovum + polar bodies.',
        'Menstrual cycle: menstrual, follicular, ovulation (LH surge, day 14), luteal (corpus luteum, progesterone); menarche, menopause.',
        'Oestrous cycle in non-primates: no bleeding, receptive only in oestrus.',
      ],
      v: table(['Feature', 'Sperm', 'Ovum'], [['Begins', 'Puberty', 'Before birth'], ['Gametes per meiocyte', '4', '1'], ['Meiosis completed', 'In the testis', 'After sperm entry']], 'Summary table comparing spermatogenesis and oogenesis'),
      n: 'To recap: spermatogenesis runs continuously from puberty and makes four sperms per meiocyte. Oogenesis starts before birth and makes one ovum per meiocyte. The menstrual cycle links ovarian events to changes in the uterus through hormones.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Draw **flow charts** of spermatogenesis and oogenesis with **ploidy**.',
        'Distinguish **spermiogenesis** from **spermiation**.',
        'Match each **phase** of the cycle to its **hormone** and **uterine change**.',
        'Compare **oestrous** and **menstrual** cycles in a table.',
      ],
      n: 'Exam tips. Practise both gametogenesis flow charts with ploidy. Keep spermiogenesis and spermiation apart. Link each phase to its hormone. And compare the two kinds of cycle.',
    }),
  ],
});

export const deck3 = deck({
  part: 3,
  title: 'Human Reproduction — Part 3: Fertilisation to lactation',
  goals: [
    'Describe the physico-chemical events of fertilisation',
    'Describe cleavage, blastocyst formation and implantation',
    'State milestones of embryonic development and functions of the placenta',
    'Explain the hormonal control of parturition and lactation',
  ],
  slides: [
    sl('title', 'Fertilisation and development', {
      b: 'Part 3 — from the meeting of gametes to the birth and feeding of the baby.',
      v: V.journey,
      n: 'During coitus, semen is released into the vagina. The sperms swim through the cervix and uterus to the ampulla of the oviduct, where the ovum released at ovulation may be waiting. Fertilisation can happen only if both reach the ampulla at the same time.',
    }),
    sl('concept', 'Physico-chemical events of fertilisation', {
      b: 'Fertilisation is the fusion of a sperm with the ovum.',
      v: flow('TB', [['c', 'Capacitation: sperms become able to fertilise in the female tract'], ['a', 'Acrosomal reaction: acrosome enzymes (sperm lysins) dissolve a path through the corona radiata and zona pellucida'], ['z', 'Sperm contacts the zona pellucida; changes in the membrane (cortical reaction) block entry of more sperms'], ['m', 'Secondary oocyte completes meiosis II: ovum + second polar body'], ['f', 'Haploid nuclei of sperm and ovum fuse: diploid zygote']], [['c', 'a'], ['a', 'z'], ['z', 'm'], ['m', 'f']], 'Flow of the physico-chemical events of fertilisation'),
      n: 'Only one sperm fertilises the ovum. As soon as a sperm contacts the zona pellucida, changes in the membrane block the entry of other sperms, preventing polyspermy. The entry of the sperm triggers the completion of the second meiotic division of the oocyte.',
    }),
    sl('concept', 'Sex of the baby', {
      b: 'The ovum always carries an **X** chromosome. A sperm carries either **X** or **Y** (about half each). An X sperm gives a **female (XX)** zygote; a Y sperm gives a **male (XY)** zygote. So the **father’s sperm** decides the sex of the baby.',
      v: table(['Sperm', 'Ovum', 'Zygote'], [['X', 'X', 'XX: female'], ['Y', 'X', 'XY: male']], 'Table showing how the sperm determines the sex of the zygote'),
      n: 'Every egg carries the same kind of sex chromosome, while sperms come in two kinds. The chance of a boy or a girl is therefore about fifty percent for each birth, and it is wrong to blame a mother for the sex of her child.',
    }),
    sl('check', 'Quick check: polyspermy', {
      b: 'How is the entry of more than one sperm into the ovum prevented?',
      n: 'Quick check. What happens to the zona pellucida after the first sperm?',
      chk: 'polyspermy-mcq',
    }),
    sl('diagram', 'Cleavage, blastocyst and implantation', {
      b: 'The zygote divides by mitosis (**cleavage**) as it moves towards the uterus, forming **blastomeres**; an embryo with **8–16** blastomeres is a **morula**. The morula becomes a **blastocyst**: an outer **trophoblast** and an **inner cell mass** around a cavity. The trophoblast attaches to the **endometrium** and the blastocyst becomes embedded in it: **implantation**.',
      v: V.blast,
      n: 'Cleavage divides the zygote into smaller and smaller cells without growth. The trophoblast layer attaches the blastocyst to the uterine wall and later forms part of the placenta. The inner cell mass becomes the embryo; its cells are stem cells able to form all tissues.',
    }),
    sl('example', 'Worked example 1: dating the early embryo', {
      b: 'Put these events in order and state where each happens: implantation, cleavage, fertilisation, morula, blastocyst, ovulation.',
      ul: [
        '1 **Ovulation** (ovary) → 2 **fertilisation** (ampulla of oviduct) → 3 **cleavage** (oviduct).',
        '4 **morula** of 8–16 cells (oviduct) → 5 **blastocyst** (uterus) → 6 **implantation** in the endometrium (uterus).',
      ],
      v: table(['Order', 'Event', 'Place'], [['1', 'Ovulation', 'Ovary'], ['2', 'Fertilisation', 'Ampulla'], ['3', 'Cleavage', 'Oviduct'], ['4', 'Morula', 'Oviduct'], ['5', 'Blastocyst', 'Uterus'], ['6', 'Implantation', 'Endometrium']], 'Worked table ordering six early events with their locations'),
      n: 'The ovum is released from the ovary and fertilised in the ampulla. The zygote divides as it travels down the oviduct, becoming a morula. It reaches the uterus as a blastocyst, which then embeds itself in the endometrium.',
    }),
    sl('concept', 'The placenta', {
      b: 'After implantation, finger-like **chorionic villi** from the trophoblast interdigitate with the uterine tissue to form the **placenta**, connected to the embryo by the **umbilical cord**.',
      v: table(['Function', 'Detail'], [['Nutrition', 'Supplies oxygen and nutrients to the embryo'], ['Excretion and respiration', 'Removes carbon dioxide and wastes'], ['Endocrine', 'Secretes hCG, hPL, estrogens and progestogens; relaxin in later pregnancy (also from the ovary)'], ['Barrier', 'Mother’s and foetus’s blood do not mix directly']], 'Table of functions of the placenta'),
      n: 'The placenta is a structural and functional link between mother and foetus. It also acts as an endocrine gland: human chorionic gonadotropin, human placental lactogen, estrogens and progestogens maintain the pregnancy. These hormones are produced only during pregnancy.',
    }),
    sl('concept', 'Milestones of development', {
      b: 'The **inner cell mass** forms **ectoderm, mesoderm and endoderm**, which give rise to all tissues and organs.',
      v: table(['Time', 'Milestone'], [['After 1 month', 'Heart forms; first heart sound can be heard'], ['End of 2nd month', 'Limbs and digits develop'], ['End of 12 weeks (first trimester)', 'Most major organ systems formed; limbs and external genital organs well developed'], ['5th month', 'First movements of the foetus; hair on the head'], ['End of 24 weeks (second trimester)', 'Body covered with fine hair; eyelids separate; eyelashes form'], ['End of 9 months', 'Foetus fully developed, ready for delivery']], 'Table of milestones of human embryonic development'),
      n: 'Human pregnancy lasts about nine months. The heart is the first organ to form, and by the end of the first trimester most organ systems are in place. The mother usually feels the first movements in the fifth month.',
    }),
    sl('check', 'Quick check: milestones', {
      b: 'By the end of which period are most major organ systems formed?',
      n: 'Quick check. Think of the first trimester.',
      chk: 'trimester-mcq',
    }),
    sl('concept', 'Parturition and lactation', {
      b: '**Parturition** (birth) is induced by a complex **neuroendocrine** mechanism.',
      v: flow('TB', [['s', 'Signals from the fully developed foetus and placenta'], ['c', 'Mild uterine contractions: foetal ejection reflex'], ['o', 'Release of oxytocin from the maternal pituitary'], ['x', 'Stronger contractions, which cause more oxytocin release (positive feedback)'], ['b', 'Expulsion of the baby, then the placenta']], [['s', 'c'], ['c', 'o'], ['o', 'x'], ['x', 'b']], 'Flow of the foetal ejection reflex and oxytocin in parturition'),
      n: 'Oxytocin makes the uterine muscle contract more strongly, and stronger contractions cause more oxytocin to be released. This positive feedback continues until the baby is delivered. After birth, the mammary glands produce milk, a process called lactation.',
    }),
    sl('example', 'Worked example 2: why colostrum matters', {
      b: 'A doctor advises a new mother to feed her baby the first, yellowish milk. Explain the advice.',
      ul: [
        'The milk produced during the **first few days** of lactation is **colostrum**.',
        'It contains **antibodies (IgA)**, which give the newborn **passive immunity** against infections.',
        'So breast-feeding from birth helps a healthy baby; colostrum should not be discarded.',
      ],
      v: table(['Feature', 'Colostrum'], [['When', 'First few days after birth'], ['Key content', 'Antibodies (IgA)'], ['Benefit', 'Passive immunity for the newborn']], 'Worked table of features of colostrum'),
      n: 'The first milk, colostrum, is rich in antibodies that the baby’s own immune system cannot yet make. Feeding it protects the newborn from infection, which is why breast-feeding during the initial period is recommended for a healthy baby.',
    }),
    sl('check', 'Quick check: parturition', {
      b: 'Judge the assertion and the reason about oxytocin.',
      n: 'Quick check. Is this positive or negative feedback?',
      chk: 'oxytocin-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Fertilisation in the ampulla: capacitation, acrosomal reaction, block to polyspermy, completion of meiosis II, fusion of nuclei; father’s sperm decides sex.',
        'Cleavage → morula (8–16 cells) → blastocyst (trophoblast, inner cell mass) → implantation.',
        'Placenta: chorionic villi; nutrition, respiration, excretion, barrier; hCG, hPL, estrogens, progestogens, relaxin.',
        'Milestones: heart (1 month), limbs and digits (2 months), organ systems (12 weeks), movements (5 months), eyelids separate (24 weeks).',
        'Parturition: foetal ejection reflex, oxytocin (positive feedback); lactation; colostrum with IgA.',
      ],
      v: table(['Event', 'Key hormone'], [['Maintenance of pregnancy', 'hCG, progesterone'], ['Parturition', 'Oxytocin'], ['Lactation', 'Milk let-down and production after birth']], 'Summary table of events and hormones'),
      n: 'To recap: fertilisation in the ampulla forms a zygote, which cleaves and implants as a blastocyst. The placenta nourishes the foetus and secretes hormones. Birth is triggered by the foetal ejection reflex and oxytocin, and colostrum gives the newborn its first protection.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Write the **events of fertilisation in order**, including the **block to polyspermy**.',
        'Learn the **milestones** with their times.',
        'List the **placental hormones**.',
        'Explain the **foetal ejection reflex** and the importance of **colostrum**.',
      ],
      n: 'Exam tips. List the events of fertilisation in order. Learn the milestones and their times. Name the placental hormones. And explain the foetal ejection reflex and colostrum.',
    }),
  ],
});
