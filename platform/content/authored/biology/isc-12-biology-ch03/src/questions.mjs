// ISC 12 Biology ch03 Human Reproduction — question bank in ISC style. AR keys (ISC options): a c d b a.
import { mk, add, svgV, r } from '../../isc-12-biology-ch01/src/lib.mjs';
import { HUMAN, spermatogenesis, oogenesis, tubuleRange, semen, allSameSex } from './calc.mjs';
import { SPERM_Q } from './svgs.mjs';

const { mcq, ar, fill, num, short, long, part } = mk;
const spermFig = svgV(SPERM_Q, 'Unlabelled human sperm with parts marked A to D');

// ---------------------------------------------------------------- t01 male system
add('leydig-mcq', mcq({
  stem: 'Which cells of the testis secrete androgens?',
  right: 'Interstitial (Leydig) cells',
  wrong: ['Sertoli cells', 'Spermatogonia', 'Primary spermatocytes'],
  sol: 'Leydig cells in the interstitial spaces secrete androgens — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('sertoli-mcq', mcq({
  stem: 'A section of a seminiferous tubule shows tall cells extending from the wall to the lumen, with developing sperm heads embedded in them. What is their main role?',
  right: 'They nourish the developing germ cells (Sertoli cells).',
  wrong: ['They secrete testosterone (Leydig cells).', 'They form the acrosome.', 'They carry sperms to the epididymis.'],
  sol: 'Sertoli cells provide nutrition to the germ cells — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('fructose-mcq', mcq({
  stem: 'Sperms in a semen sample swim actively for a long time because the seminal plasma supplies a sugar as an energy source. Which gland secretes this sugar?',
  right: 'Seminal vesicle (fructose)',
  wrong: ['Prostate', 'Bulbourethral gland', 'Testis'],
  sol: 'Seminal vesicles secrete a fluid rich in fructose — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('epididymis-mcq', mcq({
  stem: 'Sperms are stored and matured in the',
  right: 'epididymis',
  wrong: ['prostate', 'rete testis', 'urethra'],
  sol: 'The epididymis, on the posterior surface of each testis, stores and matures sperms — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('ducts-mcq', mcq({
  stem: 'Which sequence shows the correct path of sperms in the male?',
  right: 'Seminiferous tubules → rete testis → vasa efferentia → epididymis → vas deferens',
  wrong: ['Rete testis → seminiferous tubules → epididymis → vasa efferentia → vas deferens', 'Seminiferous tubules → epididymis → rete testis → vas deferens → vasa efferentia', 'Vas deferens → epididymis → vasa efferentia → rete testis → urethra'],
  sol: 'Sperms pass from the tubules to the rete testis, vasa efferentia, epididymis and vas deferens — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
{
  const t = tubuleRange(250, 2);
  add('tubules-num', num({
    stem: 'Each human testis has about 250 lobules, each with 1 to 3 seminiferous tubules. What is the maximum number of seminiferous tubules in both testes of a man?',
    value: t.max,
    sol: r`Maximum $= 250 \times 3 \times 2 = ${t.max}$.`,
    scheme: [[`${t.max}`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 1500 || 'value');
}
{
  const s = semen(300, 60, 40);
  add('semen-num', num({
    stem: 'An ejaculate contains 300 million sperms. For normal fertility at least 60 percent must have normal shape and size. What is the minimum number (in millions) of normal-shaped sperms required?',
    value: s.normal, unit: 'million',
    sol: r`$300 \times \dfrac{60}{100} = ${s.normal}$ million.`,
    scheme: [[`${s.normal} million`, 1]],
    d: 2, c: 'application', t: [1, 3],
  }), (q) => q.answer.value === 180 || 'value');
}
add('scrotum-ar', ar({
  a: 'In human males, the testes are situated outside the abdominal cavity in the scrotum.',
  r: 'Spermatogenesis requires a temperature about 2–2.5 °C lower than normal body temperature.',
  key: 'a',
  sol: 'Both are true, and the lower temperature needed for spermatogenesis explains the position of the testes — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('undescended-short', short({
  marks: 1,
  stem: 'Give a reason: A man whose testes remain in the abdominal cavity is usually unable to produce sperms.',
  model: 'Spermatogenesis needs a temperature **2–2.5 °C below** body temperature, which the abdomen cannot provide.',
  sol: 'Temperature too high.',
  scheme: [['Higher abdominal temperature blocks spermatogenesis', 1]],
  d: 3, c: 'application', t: [1],
}));
add('glands-short', short({
  marks: 2,
  stem: 'Name the male accessory glands and state the contribution of any two of them to semen.',
  model: 'Paired **seminal vesicles**, the **prostate** and paired **bulbourethral (Cowper’s) glands**. Seminal vesicles add a fluid rich in **fructose** (energy), calcium and enzymes; the prostate adds a milky fluid that **activates sperms**; bulbourethral glands secrete **mucus** that lubricates the penis.',
  sol: 'Three glands; two contributions.',
  scheme: [['Three glands named', 1], ['Two contributions', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('male-short', short({
  marks: 3,
  stem: 'Draw a labelled diagram of the T.S. of a seminiferous tubule and state the functions of the Sertoli cells and the Leydig cells.',
  model: '**Diagram labels:** **spermatogonia** at the wall, **primary** and **secondary spermatocytes**, **spermatids**, **sperms** in the lumen, **Sertoli cells** stretching from the wall towards the lumen, **interstitial (Leydig) cells** outside the tubule.\n\n**Sertoli cells** nourish the developing germ cells and support spermiogenesis; **Leydig cells** secrete **androgens** (testosterone).',
  sol: 'Diagram and two functions.',
  scheme: [['Diagram with germ-cell stages', 1], ['Sertoli and Leydig cells labelled', 1], ['Their functions', 1]],
  wl: [30, 96],
  d: 2, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 female system
add('ampulla-mcq', mcq({
  stem: 'In which part of the oviduct does fertilisation usually take place?',
  right: 'Ampulla',
  wrong: ['Isthmus', 'Infundibulum', 'Cervix'],
  sol: 'Fertilisation usually occurs in the wider ampulla — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('fimbriae-mcq', mcq({
  stem: 'What is the role of the fimbriae of the oviduct?',
  right: 'They help collect the ovum after ovulation.',
  wrong: ['They secrete progesterone.', 'They produce oocytes.', 'They contract to expel the foetus.'],
  sol: 'The finger-like fimbriae at the edge of the infundibulum help collect the released ovum — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('myometrium-mcq', mcq({
  stem: 'During delivery, which layer of the uterine wall produces the strong contractions that expel the baby?',
  right: 'Myometrium',
  wrong: ['Endometrium', 'Perimetrium', 'Cervical epithelium'],
  sol: 'The thick layer of smooth muscle, the myometrium, contracts strongly at delivery — option (@K).',
  d: 2, c: 'application', t: [2, 7],
}));
add('corpus-mcq', mcq({
  stem: 'A section of an ovary shows a large yellowish body formed from a ruptured follicle. Which hormone does it mainly secrete?',
  right: 'Progesterone',
  wrong: ['Testosterone', 'Oxytocin', 'FSH'],
  sol: 'The corpus luteum secretes large amounts of progesterone — option (@K).',
  d: 2, c: 'application', t: [2, 4],
}));
add('mammary-mcq', mcq({
  stem: 'Which sequence shows the path of milk in a mammary gland?',
  right: 'Alveoli → mammary tubules → mammary duct → mammary ampulla → lactiferous duct',
  wrong: ['Lactiferous duct → alveoli → mammary duct → ampulla', 'Mammary ampulla → alveoli → tubules → lactiferous duct', 'Alveoli → lactiferous duct → mammary tubules → ampulla'],
  sol: 'Milk passes from the alveoli through tubules, the mammary duct and ampulla to the lactiferous duct — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('ovary-short', short({
  marks: 2,
  stem: 'Describe the microscopic structure of the ovary.',
  model: 'The ovary is covered by a thin **epithelium** enclosing the **stroma**, which has an outer **cortex** and an inner **medulla**. The cortex contains **follicles** at different stages — **primary, secondary, tertiary** (with an antrum) and **Graafian** — and, after ovulation, the **corpus luteum**.',
  sol: 'Stroma, cortex with follicles.',
  scheme: [['Epithelium, cortex, medulla', 1], ['Follicle stages and corpus luteum', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('oviduct-short', short({
  marks: 2,
  stem: 'A woman’s oviducts are blocked at the isthmus. Explain why she cannot conceive naturally even though she ovulates normally.',
  model: 'The **ovum** is collected by the **fimbriae** and passes into the **ampulla**, where fertilisation normally occurs. A block at the **isthmus** stops **sperms** from reaching the ampulla (and any embryo from reaching the uterus), so **sperm and ovum cannot meet**.',
  sol: 'Sperms cannot reach the ampulla.',
  scheme: [['Fertilisation occurs in the ampulla', 1], ['Block prevents sperm reaching the ovum', 1]],
  d: 3, c: 'application', t: [2],
}));
add('female-short', short({
  marks: 3,
  stem: 'Draw a labelled diagram of the female reproductive system (front view) and state the function of the oviduct and of the endometrium.',
  model: '**Diagram labels:** **ovary**, **oviduct** with **infundibulum, fimbriae, ampulla, isthmus**, **uterus** with **perimetrium, myometrium, endometrium**, **cervix**, **vagina**.\n\n**Oviduct:** collects the ovum and is the site of **fertilisation** (ampulla). **Endometrium:** the glandular lining that thickens in each cycle and receives the **blastocyst at implantation**.',
  sol: 'Diagram and two functions.',
  scheme: [['Ovary, oviduct parts, uterus layers labelled', 2], ['Functions of oviduct and endometrium', 1]],
  wl: [30, 96],
  d: 2, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 gametogenesis
add('spermiation-mcq', mcq({
  stem: 'Spermiation is the',
  right: 'release of sperms from the seminiferous tubules',
  wrong: ['transformation of spermatids into sperms', 'division of spermatogonia by mitosis', 'storage of sperms in the epididymis'],
  sol: 'Spermiation releases sperms, whose heads were embedded in Sertoli cells; spermiogenesis is the change from spermatid to sperm — option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('acrosome-mcq', mcq({
  stem: 'Sperms with a damaged acrosome swim normally but fail to fertilise ova. What is the most likely reason?',
  right: 'They lack the enzymes needed to penetrate the coverings of the ovum.',
  wrong: ['They have no energy for movement.', 'They lack a haploid nucleus.', 'They cannot undergo spermiation.'],
  sol: 'The acrosome contains enzymes that let the sperm penetrate the corona radiata and zona pellucida — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('fsh-mcq', mcq({
  stem: 'A man’s pituitary secretes normal LH but almost no FSH. Which process is most directly affected?',
  right: 'Sertoli-cell support of spermiogenesis',
  wrong: ['Secretion of androgens by Leydig cells', 'Secretion of fructose by seminal vesicles', 'Formation of the urethra'],
  sol: 'FSH acts on Sertoli cells, which secrete factors that help spermiogenesis; LH acts on Leydig cells — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('lh-mcq', mcq({
  stem: 'In males, LH from the anterior pituitary acts on',
  right: 'Leydig cells, stimulating secretion of androgens',
  wrong: ['Sertoli cells, stimulating spermiogenesis', 'the prostate, stimulating milky secretion', 'the hypothalamus, stimulating GnRH'],
  sol: 'LH stimulates Leydig cells to synthesise and secrete androgens — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('sperm-fig-mcq', mcq({
  stem: 'In the figure of a sperm, parts are marked A to D. Which part supplies the energy for the movement of the sperm?',
  right: 'C, the middle piece with mitochondria',
  wrong: ['A, the acrosome', 'B, the nucleus', 'D, the tail'],
  sol: 'The middle piece (C) contains numerous mitochondria that produce energy for the tail’s movement — option (@K).',
  d: 3, c: 'application', t: [3],
  assets: [spermFig],
}));
add('oogonia-mcq', mcq({
  stem: 'When are oogonia formed in the human female?',
  right: 'During foetal (embryonic) development; no more are formed after birth',
  wrong: ['At puberty', 'In each menstrual cycle', 'After menopause'],
  sol: 'A couple of million oogonia form in each foetal ovary; none are added after birth — option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('released-mcq', mcq({
  stem: 'At ovulation, what is released from the Graafian follicle?',
  right: 'A secondary oocyte',
  wrong: ['A mature ovum that has completed meiosis II', 'A primary oocyte', 'An oogonium'],
  sol: 'The secondary oocyte is released; meiosis II is completed only after sperm entry — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
{
  const s = spermatogenesis(30);
  add('sperms-num', num({
    stem: 'How many sperms are formed from 30 primary spermatocytes?',
    value: s.sperms,
    sol: r`Each primary spermatocyte gives 4 sperms: $30 \times 4 = ${s.sperms}$.`,
    scheme: [[`${s.sperms}`, 1]],
    d: 1, c: 'application', t: [3],
  }), (q) => q.answer.value === 120 || 'value');
}
{
  const o = oogenesis(30);
  add('ova-num', num({
    stem: 'How many ova can be formed from 30 primary oocytes, if each completes oogenesis?',
    value: o.ova,
    sol: r`Each primary oocyte gives one ovum (the other products are polar bodies): $30 \times 1 = ${o.ova}$.`,
    scheme: [[`${o.ova}`, 1]],
    d: 2, c: 'application', t: [3],
  }), (q) => q.answer.value === 30 || 'value');
}
add('secondary-num', num({
  stem: 'How many chromosomes are present in a human secondary spermatocyte?',
  value: HUMAN.haploid,
  sol: r`After meiosis I the number is halved: $\dfrac{${HUMAN.diploid}}{2} = ${HUMAN.haploid}$.`,
  scheme: [[`${HUMAN.haploid}`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => q.answer.value === 23 || 'value');
add('meiosis2-ar', ar({
  a: 'At ovulation the Graafian follicle releases a secondary oocyte.',
  r: 'Meiosis II of the oocyte is completed inside the Graafian follicle before ovulation.',
  key: 'c',
  sol: 'A is true. R is false: meiosis II is completed only after a sperm enters the oocyte — option (c).',
  d: 4, c: 'analysis', t: [3],
}));
add('polar-ar', ar({
  a: 'Each primary oocyte gives rise to four functional ova.',
  r: 'The division of cytoplasm during oogenesis is equal.',
  key: 'd',
  sol: 'Oogenesis gives one ovum and polar bodies because cytoplasm divides unequally. Both statements are false — option (d).',
  d: 2, c: 'understanding', t: [3],
}));
add('spermio-short', short({
  marks: 1,
  stem: 'Complete the analogy: spermatid → sperm : spermiogenesis :: sperm heads released from Sertoli cells : ______.',
  model: '**Spermiation.**',
  sol: 'Spermiation.',
  scheme: [['Spermiation', 1]],
  wl: null,
  d: 2, c: 'application', t: [3],
}));
add('sperm-short', short({
  marks: 2,
  stem: 'Draw a labelled diagram of a human sperm. State the function of the acrosome and of the middle piece.',
  model: '**Diagram labels:** head with **acrosome** and **nucleus**, **neck**, **middle piece** with mitochondria, **tail**.\n\nThe **acrosome** contains **enzymes** that help the sperm penetrate the ovum; the **middle piece** has **mitochondria** that supply **energy** for movement.',
  sol: 'Diagram; two functions.',
  scheme: [['Labelled diagram', 1], ['Acrosome and middle piece functions', 1]],
  wl: [20, 60],
  d: 2, c: 'application', t: [3],
}));
add('compare-short', short({
  marks: 3,
  stem: 'Compare spermatogenesis and oogenesis in respect of (i) when they begin, (ii) the division of cytoplasm, and (iii) the number of gametes formed from one meiocyte.',
  model: '(i) **Spermatogenesis** begins at **puberty**; **oogenesis** begins during **foetal (embryonic) life**.\n\n(ii) In spermatogenesis the cytoplasm divides **equally**; in oogenesis it divides **unequally**, forming **polar bodies**.\n\n(iii) One primary spermatocyte gives **four sperms**; one primary oocyte gives **one ovum** (plus polar bodies).',
  sol: 'Three comparisons.',
  scheme: [['Timing', 1], ['Cytoplasmic division', 1], ['Number of gametes', 1]],
  d: 2, c: 'analysis', t: [3],
}));
add('hormonal-short', short({
  marks: 3,
  stem: 'Explain the hormonal control of spermatogenesis.',
  model: 'At **puberty** the **hypothalamus** increases secretion of **GnRH**, which acts on the **anterior pituitary** to release **LH** and **FSH**. **LH** acts on the **Leydig cells**, stimulating the synthesis and secretion of **androgens**, which in turn **stimulate spermatogenesis**. **FSH** acts on the **Sertoli cells** and stimulates the secretion of factors that help in **spermiogenesis**.',
  sol: 'GnRH, LH, FSH and their targets.',
  scheme: [['GnRH releases LH and FSH', 1], ['LH on Leydig cells: androgens', 1], ['FSH on Sertoli cells: spermiogenesis', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('gameto-long', long({
  stem: '(a) Draw a flow chart of spermatogenesis from a spermatogonium to sperms, showing the ploidy at each stage. [2]\n(b) Describe oogenesis from the oogonium to the ovum, stating where meiosis is arrested. [3]',
  model: '(a) **Spermatogonium (2n)** → growth → **primary spermatocyte (2n)** → meiosis I → **2 secondary spermatocytes (n)** → meiosis II → **4 spermatids (n)** → spermiogenesis → **4 sperms (n)**; sperms are released by spermiation.\n\n(b) During **foetal life**, millions of **oogonia** form in each ovary. They enter **meiosis I** and are **arrested in prophase I** as **primary oocytes**, each in a **primary follicle**; many degenerate, leaving 60,000–80,000 at puberty. Follicles grow into secondary and **tertiary** follicles; in the tertiary follicle the primary oocyte completes meiosis I **unequally**, forming a large **secondary oocyte** and a **first polar body**. The **Graafian follicle** releases the secondary oocyte at **ovulation**; it is **arrested in meiosis II** until a **sperm enters**, when it completes the division to form the **ovum** and a **second polar body**.',
  sol: 'Flow chart; oogenesis with arrests.',
  scheme: [['(a) Stages in order', 1], ['(a) Ploidy shown', 1], ['(b) Oogonia and arrest in prophase I', 1], ['(b) Secondary oocyte and first polar body', 1], ['(b) Meiosis II after sperm entry', 1]],
  wl: [70, 200],
  d: 3, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 menstrual cycle
add('lhsurge-mcq', mcq({
  stem: 'Which event is directly caused by the mid-cycle surge of LH?',
  right: 'Rupture of the Graafian follicle (ovulation)',
  wrong: ['Breakdown of the endometrium', 'Formation of primary follicles', 'Menarche'],
  sol: 'The LH surge induces rupture of the Graafian follicle and release of the ovum — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('menarche-mcq', mcq({
  stem: 'A girl’s very first menstrual period, at the onset of puberty, is known as',
  right: 'menarche',
  wrong: ['menopause', 'ovulation', 'parturition'],
  sol: 'Menarche is the first menstruation — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('progesterone-mcq', mcq({
  stem: 'Near the end of a cycle without fertilisation, which change triggers the breakdown of the endometrium?',
  right: 'A fall in progesterone as the corpus luteum degenerates',
  wrong: ['A rise in LH', 'A rise in FSH', 'A rise in progesterone'],
  sol: 'Without fertilisation the corpus luteum degenerates; falling progesterone causes the endometrium to disintegrate — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('oestrous-mcq', mcq({
  stem: 'A farmer notices that his cow is receptive to the bull only for a short period and shows no menstrual bleeding. Which type of cycle does the cow show?',
  right: 'An oestrous cycle',
  wrong: ['A menstrual cycle', 'No reproductive cycle', 'A lactation cycle'],
  sol: 'Non-primate mammals such as cows have an oestrous cycle without menstrual bleeding — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('missed-mcq', mcq({
  stem: 'If fertilisation and implantation occur, why does menstruation not take place?',
  right: 'The corpus luteum persists and progesterone stays high, maintaining the endometrium.',
  wrong: ['The ovaries stop producing hormones.', 'The endometrium becomes thinner.', 'FSH rises sharply.'],
  sol: 'During pregnancy the corpus luteum and later the placenta keep progesterone high, so the endometrium is maintained — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('cyclebrief-short', short({
  marks: 2,
  stem: 'Name the phases of the menstrual cycle in order and state the event in the ovary during the luteal phase.',
  model: '**Menstrual** (days 1–5), **follicular (proliferative)**, **ovulation** (about day 14) and **luteal (secretory)**. In the **luteal phase**, the remains of the Graafian follicle form the **corpus luteum**, which secretes **progesterone**.',
  sol: 'Four phases; corpus luteum.',
  scheme: [['Four phases in order', 1], ['Corpus luteum secreting progesterone', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('oestrous-short', short({
  marks: 2,
  stem: 'Distinguish between the oestrous cycle and the menstrual cycle, giving one example of an animal with each.',
  model: 'The **menstrual cycle** occurs in **primates** (e.g. **humans**, monkeys); the endometrium is **shed** with bleeding. The **oestrous cycle** occurs in **non-primate mammals** (e.g. **cow**, dog); there is **no bleeding**, the endometrium is **reabsorbed**, and the female is receptive only during **oestrus**.',
  sol: 'Key differences and examples.',
  scheme: [['Menstrual cycle with example', 1], ['Oestrous cycle with example', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('graph-short', short({
  marks: 3,
  stem: 'In a hormone chart of a 28-day cycle, hormone X rises steadily from day 5, peaks just before day 14 and falls; hormone Y peaks sharply at day 14; hormone Z is low until day 14, rises to a peak around day 21 and falls by day 28. Identify X, Y and Z, and give one role of each.',
  model: '**X = estrogen**, secreted by growing follicles; it causes **regeneration (proliferation) of the endometrium**.\n\n**Y = LH** (luteinising hormone); its **surge** causes **ovulation**.\n\n**Z = progesterone**, secreted by the **corpus luteum**; it **maintains the endometrium** for implantation; its fall leads to menstruation.',
  sol: 'Estrogen, LH, progesterone.',
  scheme: [['X estrogen with role', 1], ['Y LH with role', 1], ['Z progesterone with role', 1]],
  d: 4, c: 'analysis', t: [4],
}));
add('cycle-long', long({
  stem: '(a) Describe the changes in the ovary and the uterus during the follicular and luteal phases of the menstrual cycle, naming the hormones involved. [3]\n(b) A woman with a regular 28-day cycle wants to know her most fertile period. On about which day is ovulation expected, and why can lack of menstruation indicate pregnancy? [2]',
  model: '(a) **Follicular phase:** under the influence of rising **FSH** and **LH**, primary follicles grow into a mature **Graafian follicle** and secrete **estrogen**, which causes the **endometrium to regenerate** by proliferation. **Luteal phase:** after ovulation the remains of the Graafian follicle form the **corpus luteum**, which secretes large amounts of **progesterone**, making the endometrium thick and secretory and ready for **implantation**.\n\n(b) Ovulation is expected around **day 14**, triggered by the **LH surge**. If fertilisation and implantation occur, the **corpus luteum persists** and **progesterone stays high**, so the endometrium is **not shed** and there is **no menstruation**; this can indicate pregnancy, though stress or poor health can also stop cycles.',
  sol: 'Phases with hormones; ovulation day and pregnancy.',
  scheme: [['(a) Follicular phase with FSH, LH, estrogen', 1.5], ['(a) Luteal phase with corpus luteum, progesterone', 1.5], ['(b) Day 14, LH surge', 1], ['(b) Persistent corpus luteum, no menstruation', 1]],
  wl: [70, 200],
  d: 3, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- t05 fertilisation, cleavage, implantation
add('polyspermy-mcq', mcq({
  stem: 'How is the entry of more than one sperm into the ovum prevented?',
  right: 'Contact of the first sperm with the zona pellucida induces membrane changes that block other sperms.',
  wrong: ['The acrosome of each sperm destroys the other sperms.', 'Only one sperm is released in an ejaculate.', 'The second polar body traps extra sperms.'],
  sol: 'Changes induced in the zona pellucida and membrane after the first contact block additional sperms — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('capacitation-mcq', mcq({
  stem: 'Sperms taken directly from the epididymis cannot fertilise an ovum, but they can after spending some hours in the female reproductive tract. The change they undergo is called',
  right: 'capacitation',
  wrong: ['spermiation', 'cleavage', 'implantation'],
  sol: 'Capacitation in the female tract makes sperms able to fertilise — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('morula-mcq', mcq({
  stem: 'An embryo with 8 to 16 blastomeres is called a',
  right: 'morula',
  wrong: ['blastocyst', 'gastrula', 'zygote'],
  sol: 'The 8–16-cell stage is the morula — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('icm-mcq', mcq({
  stem: 'Researchers want cells from an early human embryo that can give rise to every tissue of the body. From which part of the blastocyst should such stem cells come?',
  right: 'Inner cell mass',
  wrong: ['Trophoblast', 'Zona pellucida', 'Blastocoel'],
  sol: 'The inner cell mass gives rise to the embryo and contains stem cells that can form all tissues; the trophoblast attaches to the endometrium — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('sex-ar', ar({
  a: 'The sex of a human baby is determined by the father.',
  r: 'The ovum is released from the ovary around day 14 of the menstrual cycle.',
  key: 'b',
  sol: 'Both statements are true, but the timing of ovulation does not explain sex determination, which depends on whether the sperm carries X or Y — option (b).',
  d: 3, c: 'analysis', t: [5],
}));
{
  const p = allSameSex(3);
  add('boys-num', num({
    stem: 'A couple plans three children. What is the probability that all three will be boys? Give your answer as a decimal.',
    value: p, tol: 0.001,
    sol: r`Each birth is independent with probability $\dfrac{1}{2}$ for a boy: $\left(\dfrac{1}{2}\right)^3 = ${p}$.`,
    scheme: [[`${p}`, 1]],
    d: 3, c: 'application', t: [5],
  }), (q) => q.answer.value === 0.125 || 'value');
}
add('implant-short', short({
  marks: 2,
  stem: 'What is implantation? Which layer of the blastocyst is involved, and where does it attach?',
  model: '**Implantation** is the **embedding of the blastocyst** in the uterine wall. The outer layer, the **trophoblast**, attaches to the **endometrium**; the uterine cells divide rapidly and cover the blastocyst, which becomes embedded, leading to pregnancy.',
  sol: 'Definition; trophoblast; endometrium.',
  scheme: [['Definition', 1], ['Trophoblast attaches to endometrium', 1]],
  d: 1, c: 'understanding', t: [5],
}));
add('sexdet-short', short({
  marks: 2,
  stem: 'A family has three daughters and blames the mother for not having a son. Using your knowledge of sex determination, explain why this is incorrect.',
  model: 'Every **ovum** carries an **X** chromosome, while **sperms** carry either **X** or **Y** in equal numbers. The baby is a **son** only if a **Y-bearing sperm** fertilises the ovum, so the sex is decided by the **father’s sperm**, and the chance is about **50 percent** at each birth.',
  sol: 'Sperm determines sex.',
  scheme: [['Ovum X; sperm X or Y', 1], ['Father’s sperm decides; 50 percent each birth', 1]],
  d: 3, c: 'application', t: [5],
}));
add('fert-short', short({
  marks: 3,
  stem: 'Describe the physico-chemical events that occur during fertilisation in humans.',
  model: 'Sperms undergo **capacitation** in the female tract. On reaching the ovum in the **ampulla**, the **acrosomal reaction** releases enzymes that dissolve a path through the **corona radiata** and **zona pellucida**. Contact of a sperm with the zona pellucida induces membrane changes (**cortical reaction**) that **block entry of other sperms**. Sperm entry induces the **secondary oocyte** to complete **meiosis II**, forming the **ovum** and a **second polar body**; the haploid nuclei of sperm and ovum **fuse** to form the **diploid zygote**.',
  sol: 'Events in order.',
  scheme: [['Capacitation and acrosomal reaction', 1], ['Block to polyspermy', 1], ['Meiosis II and fusion of nuclei', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('fert-long', long({
  stem: '(a) Trace the events from ovulation to implantation, naming the site of each event. [3]\n(b) Why is the cleaving embryo able to move to the uterus without growing in size, and what are the two groups of cells of the blastocyst destined to form? [2]',
  model: '(a) The **Graafian follicle** releases the **secondary oocyte** at **ovulation** (ovary); it is collected by the **fimbriae** and moves to the **ampulla**, where **fertilisation** forms the **zygote**. **Cleavage** (mitotic divisions) begins as the zygote moves through the **isthmus**, forming blastomeres and then a **morula** of 8–16 cells. The morula becomes a **blastocyst** as it enters the **uterus**, and its trophoblast attaches to the **endometrium**: **implantation**.\n\n(b) Cleavage divisions are **rapid mitoses without growth**, so the cells become smaller while the overall size stays the same, and the embryo is carried along the oviduct. The **trophoblast** attaches to the uterus and forms part of the **placenta** (chorionic villi); the **inner cell mass** forms the **embryo**.',
  sol: 'Sequence with sites; cleavage and blastocyst fates.',
  scheme: [['(a) Ovulation and fertilisation in ampulla', 1], ['(a) Cleavage and morula in oviduct', 1], ['(a) Blastocyst and implantation in uterus', 1], ['(b) Cleavage without growth', 1], ['(b) Fates of trophoblast and inner cell mass', 1]],
  wl: [70, 200],
  d: 3, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- t06–t07 placenta, development, parturition, lactation
add('trimester-mcq', mcq({
  stem: 'By the end of which period are most of the major organ systems of the human foetus formed?',
  right: 'The first trimester (12 weeks)',
  wrong: ['The first month', 'The second trimester (24 weeks)', 'The ninth month'],
  sol: 'By the end of 12 weeks most major organ systems are formed — option (@K).',
  d: 2, c: 'recall', t: [6],
}));
add('hcg-mcq', mcq({
  stem: 'A home pregnancy test detects a hormone in urine that is produced only during pregnancy by the placenta. Which hormone is it most likely to detect?',
  right: 'Human chorionic gonadotropin (hCG)',
  wrong: ['FSH', 'Oxytocin', 'Testosterone'],
  sol: 'hCG is produced by the placenta only during pregnancy — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('heart-mcq', mcq({
  stem: 'In the human embryo, the heart is formed after about',
  right: 'one month of pregnancy',
  wrong: ['one week of pregnancy', 'five months of pregnancy', 'eight months of pregnancy'],
  sol: 'The heart forms after about one month — option (@K).',
  d: 1, c: 'recall', t: [6],
}));
add('movements-mcq', mcq({
  stem: 'During which month of pregnancy are the first movements of the foetus usually observed?',
  right: 'Fifth month',
  wrong: ['Second month', 'Third month', 'Ninth month'],
  sol: 'First movements and hair on the head appear during the fifth month — option (@K).',
  d: 1, c: 'recall', t: [6],
}));
add('colostrum-mcq', mcq({
  stem: 'Why is a newborn fed colostrum?',
  right: 'It contains IgA antibodies that give the baby passive immunity.',
  wrong: ['It contains more fat than later milk, for faster growth.', 'It triggers the foetal ejection reflex.', 'It contains hCG that keeps the baby warm.'],
  sol: 'Colostrum, the milk of the first few days, contains antibodies (IgA) — option (@K).',
  d: 2, c: 'understanding', t: [7],
}));
add('oxytocin-ar', ar({
  a: 'The release of oxytocin increases as labour progresses.',
  r: 'Stronger uterine contractions stimulate further secretion of oxytocin.',
  key: 'a',
  sol: 'Both are true; the positive feedback between contractions and oxytocin explains the increase — option (a).',
  d: 2, c: 'understanding', t: [7],
}));
add('placenta-fill', fill({
  stem: 'The finger-like projections of the trophoblast that interdigitate with uterine tissue to form the placenta are called chorionic ______.',
  acc: [['villi']],
  sol: 'Villi.',
  d: 1, c: 'recall', t: [6],
}));
add('barrier-short', short({
  marks: 1,
  stem: 'Give a reason: The placenta is called an endocrine tissue.',
  model: 'It **secretes hormones** such as **hCG, hPL, estrogens and progestogens**.',
  sol: 'Secretes hormones.',
  scheme: [['Secretes pregnancy hormones', 1]],
  d: 2, c: 'understanding', t: [6],
}));
add('placenta-short', short({
  marks: 3,
  stem: 'How is the placenta formed? State three of its functions.',
  model: 'After implantation, finger-like **chorionic villi** of the **trophoblast** interdigitate with the **uterine tissue** and maternal blood to form the **placenta**, connected to the embryo by the **umbilical cord**.\n\nFunctions: it supplies **oxygen and nutrients** to the embryo; removes **carbon dioxide and wastes**; acts as an **endocrine tissue**, secreting **hCG, hPL, estrogens and progestogens**.',
  sol: 'Formation; three functions.',
  scheme: [['Formation from chorionic villi and uterine tissue', 1], ['Nutrition and excretion', 1], ['Endocrine role', 1]],
  d: 2, c: 'understanding', t: [6],
}));
add('milestones-short', short({
  marks: 3,
  stem: 'A pregnancy calendar lists six milestones but has lost the dates. Assign the approximate time to each: (i) heart forms; (ii) limbs and digits develop; (iii) most major organ systems formed; (iv) first movements felt; (v) eyelids separate and eyelashes form; (vi) ready for delivery.',
  model: '(i) **After one month**; (ii) **end of the second month**; (iii) **end of 12 weeks** (first trimester); (iv) **fifth month**; (v) **end of 24 weeks** (second trimester); (vi) **end of nine months**.',
  sol: 'Six times.',
  scheme: [['(i) and (ii)', 1], ['(iii) and (iv)', 1], ['(v) and (vi)', 1]],
  wl: [20, 96],
  d: 2, c: 'application', t: [6],
}));
add('parturition-short', short({
  marks: 2,
  stem: 'What is the foetal ejection reflex? How does oxytocin bring about parturition?',
  model: 'Signals from the **fully developed foetus** and the **placenta** induce **mild uterine contractions**: the **foetal ejection reflex**. It triggers release of **oxytocin** from the maternal pituitary; oxytocin causes **stronger contractions**, which stimulate more oxytocin (**positive feedback**) until the baby is expelled.',
  sol: 'Reflex and oxytocin.',
  scheme: [['Foetal ejection reflex defined', 1], ['Oxytocin and positive feedback', 1]],
  d: 2, c: 'understanding', t: [7],
}));
add('birth-long', long({
  stem: '(a) Explain the role of hormones in maintaining pregnancy, naming four hormones produced or increased during pregnancy. [2]\n(b) Explain how parturition is initiated and completed. [2]\n(c) Why do doctors recommend that a mother breast-feed her baby from the first day? [1]',
  model: '(a) The **placenta** acts as an endocrine tissue: **hCG** maintains the corpus luteum early in pregnancy, and **progestogens** and **estrogens** maintain the endometrium and support foetal growth; **hPL** helps prepare for nourishing the foetus; **relaxin** is secreted by the ovary in later pregnancy. Levels of **prolactin**, cortisol and thyroxine also rise.\n\n(b) Signals from the **fully developed foetus** and the **placenta** induce mild uterine contractions, the **foetal ejection reflex**, which triggers **oxytocin** release from the maternal pituitary. Oxytocin causes **stronger contractions** of the myometrium, which stimulate still more oxytocin (**positive feedback**), until the baby is expelled through the birth canal, followed by the placenta.\n\n(c) The milk of the first few days, **colostrum**, contains **antibodies (IgA)** that give the newborn **passive immunity** against infections.',
  sol: 'Hormones of pregnancy; parturition; colostrum.',
  scheme: [['(a) Four hormones with roles', 2], ['(b) Foetal ejection reflex and oxytocin', 1], ['(b) Positive feedback to delivery', 1], ['(c) Colostrum antibodies', 1]],
  wl: [70, 200],
  d: 3, c: 'application', t: [6, 7],
}));

// ---------------------------------------------------------------- stimulus-based
{
  const s = semen(120, 50, 30);
  add('semen-case', mk.case({
    passage: 'A couple consulted a fertility clinic. The man’s semen report read:\n\n| Measure | Result | Normal fertility needs |\n|---|---|---|\n| Total sperms per ejaculate | 120 million | 200–300 million |\n| Normal shape and size | 50 percent | at least 60 percent |\n| Vigorous motility | 30 percent | at least 40 percent |',
    d: 3, c: 'application',
    children: [
      part('a', num({
        stem: 'How many sperms (in millions) in his sample showed vigorous motility?',
        value: s.motile, unit: 'million',
        sol: r`$120 \times \dfrac{30}{100} = ${s.motile}$ million.`,
        scheme: [[`${s.motile} million`, 1]],
        d: 2, c: 'application', t: [3],
      })),
      part('b', mcq({
        stem: 'Which part of the sperm is most likely to be defective if motility is poor?',
        right: 'The middle piece or the tail',
        wrong: ['The acrosome only', 'The nucleus only', 'The zona pellucida'],
        sol: 'Movement depends on the tail, powered by mitochondria of the middle piece — option (@K).',
        d: 2, c: 'application', t: [3],
      })),
      part('c', short({
        marks: 2,
        stem: 'Name the hormone from the anterior pituitary that stimulates the Leydig cells, and explain how a deficiency of it could lower the sperm count.',
        model: '**LH (luteinising hormone).** It stimulates the **Leydig cells** to secrete **androgens**, which **stimulate spermatogenesis**; with too little LH, androgen levels fall and **fewer sperms** are produced.',
        sol: 'LH and androgens.',
        scheme: [['LH', 1], ['Less androgen, less spermatogenesis', 1]],
        d: 3, c: 'application', t: [3],
      }), [
        short({
          marks: 2,
          stem: 'Name the three accessory glands whose secretions form seminal plasma, and state why seminal plasma matters to the sperms.',
          model: '**Seminal vesicles, prostate** and **bulbourethral glands**. Seminal plasma supplies **fructose** for energy, **activates** the sperms and provides a **fluid medium** in which they swim.',
          sol: 'Three glands; role.',
          scheme: [['Three glands', 1], ['Nourishes, activates and carries sperms', 1]],
          d: 2, c: 'understanding', t: [1],
        }),
      ]),
    ],
  }), (q) => q.children[0].answer.value === 36 || 'value');
}
add('cycle-case', mk.case({
  passage: 'A doctor recorded the following for a woman with a regular 28-day cycle.\n\n| Day | Observation |\n|---|---|\n| 1–5 | Bleeding; endometrium breaking down |\n| 6–13 | Endometrium thickening; one follicle enlarging |\n| 14 | Sharp rise in one pituitary hormone; follicle ruptures |\n| 15–26 | Endometrium thick and glandular; a yellow body in the ovary |\n| 27–28 | Yellow body shrinking; endometrium starting to break down |',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which hormone rises sharply on day 14?',
      right: 'LH',
      wrong: ['Progesterone', 'Oxytocin', 'hCG'],
      sol: 'The LH surge causes rupture of the Graafian follicle — option (@K).',
      d: 1, c: 'application', t: [4],
    })),
    part('b', mcq({
      stem: 'The “yellow body” seen on days 15–26 is the',
      right: 'corpus luteum, secreting progesterone',
      wrong: ['Graafian follicle, secreting FSH', 'primary follicle, secreting LH', 'placenta, secreting hCG'],
      sol: 'The corpus luteum forms from the ruptured follicle and secretes progesterone — option (@K).',
      d: 2, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why the endometrium starts to break down on days 27–28.',
      model: 'No fertilisation occurred, so the **corpus luteum degenerates** (the yellow body shrinks). **Progesterone falls**, and without it the **endometrium cannot be maintained**, so it breaks down and menstruation begins.',
      sol: 'Falling progesterone.',
      scheme: [['Corpus luteum degenerates without fertilisation', 1], ['Progesterone falls; endometrium breaks down', 1]],
      d: 2, c: 'analysis', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'If the woman had become pregnant in this cycle, what would have been different on days 27–28, and why?',
        model: 'The **corpus luteum would persist** (supported by **hCG** from the developing placenta), **progesterone would stay high**, and the endometrium would **remain thick**, so **menstruation would not occur**.',
        sol: 'Corpus luteum persists.',
        scheme: [['Corpus luteum persists, progesterone high', 1], ['No breakdown, no menstruation', 1]],
        d: 3, c: 'application', t: [4, 6],
      }),
    ]),
  ],
}));
