// ch02 Human Reproduction — question bank. AR keys planned: d a a c a.
import { mk, add, r } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { HUMAN, spermatogenesis, oogenesis, tubuleRange, semen, allSameSex } from './calc.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;

// ---------------------------------------------------------------- t01 reproductive systems
add('duct-order-mcq', mcq({
  stem: 'Which sequence shows the correct path of sperms from the testis to the outside?',
  right: 'Rete testis → vasa efferentia → epididymis → vas deferens → ejaculatory duct → urethra',
  wrong: ['Vasa efferentia → rete testis → epididymis → vas deferens → urethra → ejaculatory duct', 'Rete testis → epididymis → vasa efferentia → ejaculatory duct → vas deferens → urethra', 'Epididymis → rete testis → vas deferens → vasa efferentia → urethra → ejaculatory duct'],
  sol: 'From the seminiferous tubules, sperms pass through the rete testis, vasa efferentia, epididymis and vas deferens, then the ejaculatory duct into the urethra — option (@K).',
  d: 2, c: 'recall', t: [1],
}));
add('myometrium-mcq', mcq({
  stem: 'Which layer of the uterine wall produces strong contractions during the delivery of a baby?',
  right: 'Myometrium',
  wrong: ['Endometrium', 'Perimetrium', 'Zona pellucida'],
  sol: 'The myometrium is the thick middle layer of smooth muscle that contracts strongly during delivery — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('alveoli-mcq', mcq({
  stem: 'In the mammary gland, milk is secreted by the cells of the',
  right: 'alveoli',
  wrong: ['lactiferous duct', 'mammary ampulla', 'mammary tubules'],
  sol: 'Clusters of cells called alveoli secrete milk, which then flows through tubules, ducts and the ampulla to the lactiferous duct — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('scrotum-mcq', mcq({
  stem: 'In a boy, one testis fails to descend into the scrotum and remains inside the abdomen. If this is not corrected, what is most likely to happen to that testis after puberty?',
  right: 'It will produce few or no sperms, because the abdomen is warmer than the scrotum.',
  wrong: ['It will produce more sperms, because it is better protected.', 'It will stop making androgens but produce normal sperms.', 'It will produce ova instead of sperms.'],
  sol: 'Spermatogenesis needs a temperature about 2–2.5 °C below body temperature, which the scrotum provides. Inside the abdomen the testis is too warm, so sperm production fails — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('blocked-vas-mcq', mcq({
  stem: 'If both vasa deferentia of a man are blocked, which of these would his semen most likely contain?',
  right: 'Seminal plasma but no sperms',
  wrong: ['Sperms but no seminal plasma', 'Neither sperms nor seminal plasma', 'Sperms and seminal plasma, as before'],
  sol: 'Sperms reach the ejaculatory duct only through the vas deferens, but the seminal vesicles, prostate and bulbourethral glands open beyond the block. So the fluid part is still released without sperms — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('fructose-mcq', mcq({
  stem: 'A semen sample has normal numbers of sperms, but they soon stop moving, and the seminal plasma is found to lack fructose. A problem in which glands is most likely?',
  right: 'Seminal vesicles',
  wrong: ['Bulbourethral glands', 'Leydig cells of the testes', 'Mammary glands'],
  sol: 'Fructose in seminal plasma comes mainly from the seminal vesicles and is the energy source for sperm movement — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('leydig-ar', ar({
  a: 'Leydig cells are found inside the seminiferous tubules, between the spermatogonia.',
  r: 'Leydig cells secrete androgens.',
  key: 'd',
  sol: 'A is false: Leydig (interstitial) cells lie in the spaces outside the seminiferous tubules; Sertoli cells are the ones inside. R is true — option (d).',
  d: 2, c: 'understanding', t: [1],
}));
add('oviduct-match', match({
  stem: 'Match each part of the oviduct (column I) with its description (column II).',
  pairs: [
    ['Infundibulum', 'Funnel-shaped part closest to the ovary'],
    ['Fimbriae', 'Finger-like projections that help collect the ovum'],
    ['Ampulla', 'Wider part where fertilisation usually occurs'],
    ['Isthmus', 'Narrow part that joins the uterus'],
  ],
  order: [3, 0, 2, 1],
  sol: 'Infundibulum = funnel near the ovary; fimbriae = finger-like edges that collect the ovum; ampulla = wider part (site of fertilisation); isthmus = narrow part joining the uterus.',
  d: 2, c: 'recall', t: [1],
}));
add('fert-site-tf', tf({
  stem: 'In humans, fertilisation normally takes place in the uterus.',
  key: 'f',
  sol: 'False. Fertilisation normally takes place in the ampullary region of the oviduct; the embryo implants in the uterus later.',
  d: 1, c: 'recall', t: [1],
}));
{
  const R = tubuleRange(250, 2);
  add('tubules-num', num({
    stem: 'Each human testis has about 250 lobules, each with one to three seminiferous tubules. What is the greatest number of seminiferous tubules that the two testes of a man could contain?',
    value: R.max,
    sol: r`Most per testis $= 250 \times 3 = 750$; two testes $= 2 \times 750 = ${R.max}$.`,
    scheme: [[`${R.max}`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 250 * 3 * 2 || 'value');
}
add('birthcanal-fill', fill({
  stem: 'The cervical canal together with the vagina forms the ______.',
  acc: [['birth canal']],
  sol: 'Birth canal.',
  d: 1, c: 'recall', t: [1],
}));
add('sertoli-leydig-short', short({
  marks: 2,
  stem: 'Distinguish between Sertoli cells and Leydig cells on the basis of their location and function.',
  model: '**Sertoli cells** lie **inside** the seminiferous tubules, among the germ cells; they **nourish** the developing germ cells. **Leydig (interstitial) cells** lie **outside** the tubules, in the interstitial spaces; they **secrete androgens** such as testosterone.',
  sol: 'Compare location (inside vs outside the tubules) and function (nourishment vs androgen secretion).',
  scheme: [['Locations correct for both', 1], ['Functions correct for both', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('scrotum-short', short({
  marks: 2,
  stem: 'Hospitals advise surgery for a baby boy whose testes have not descended into the scrotum. Explain the biological reason for this advice.',
  model: 'Sperm formation needs a temperature about **2–2.5 °C lower** than normal body temperature. The scrotum keeps the testes outside the abdomen at this lower temperature. Testes left in the warmer abdomen cannot carry out normal **spermatogenesis**, so the man could later be infertile.',
  sol: 'Link the scrotal temperature to spermatogenesis.',
  scheme: [['Spermatogenesis needs a lower temperature, given by the scrotum', 1], ['Undescended testes are too warm, so sperm formation fails', 1]],
  d: 3, c: 'application', t: [1],
}));
add('mammary-short', short({
  marks: 2,
  stem: 'Trace the path of milk from where it is made in the mammary gland to where the baby sucks it out.',
  model: 'Milk is secreted by the cells of the **alveoli** in the mammary lobes and stored in their cavities. It flows through **mammary tubules** into a **mammary duct**; several ducts join to form a wider **mammary ampulla**, which is connected to the **lactiferous duct** through which the baby sucks milk.',
  sol: 'Alveoli → tubules → duct → ampulla → lactiferous duct.',
  scheme: [['Alveoli secrete milk', 1], ['Tubules → duct → ampulla → lactiferous duct, in order', 1]],
  d: 2, c: 'recall', t: [1],
}));
add('uterus-short', short({
  marks: 3,
  stem: 'Name the three layers of the uterine wall from outside to inside and give one role of each.',
  model: '1. **Perimetrium:** the thin outer membrane that covers the uterus.\n\n2. **Myometrium:** the thick middle layer of smooth muscle, which contracts strongly to push the baby out during delivery.\n\n3. **Endometrium:** the inner glandular lining, which thickens and breaks down in each menstrual cycle and in which the embryo implants.',
  sol: 'Perimetrium (covering), myometrium (contractions), endometrium (cyclical lining, implantation).',
  scheme: [['Perimetrium with role', 1], ['Myometrium with role', 1], ['Endometrium with role', 1]],
  d: 2, c: 'recall', t: [1],
}));
add('male-system-long', long({
  stem: 'Draw a labelled diagram of the human male reproductive system (front view). Describe the roles of the testes and of the three kinds of accessory glands.',
  model: '**Diagram labels:** testis, scrotum, epididymis, vas deferens, seminal vesicle, ejaculatory duct, prostate, bulbourethral gland, urinary bladder, urethra, penis, urethral meatus.\n\n**Testes.** They lie in the scrotum, which keeps them about 2–2.5 °C below body temperature. Their seminiferous tubules produce sperms, with Sertoli cells nourishing the germ cells; the Leydig cells between the tubules secrete androgens.\n\n**Seminal vesicles (a pair)** and the **prostate** add most of the seminal plasma, which is rich in fructose, calcium and enzymes; fructose provides energy for sperm movement.\n\n**Bulbourethral glands (a pair)** add a secretion that helps lubricate the penis.\n\nSperms together with seminal plasma form semen, which leaves through the urethra.',
  sol: 'Labelled diagram, then testes (sperms and androgens) and the three glands (seminal plasma, lubrication).',
  scheme: [['Labelled diagram with at least eight correct labels', 2], ['Role of testes: sperms (Sertoli) and androgens (Leydig)', 1], ['Seminal vesicles and prostate: seminal plasma with fructose, calcium, enzymes', 1], ['Bulbourethral glands: lubrication', 1]],
  wl: [80, 140],
  d: 3, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 gametogenesis
add('sec-spermatocyte-mcq', mcq({
  stem: 'How many chromosomes does a human secondary spermatocyte have?',
  right: '23',
  wrong: ['46', '92', '69'],
  sol: 'The secondary spermatocyte forms after meiosis I, which halves the number from 46 to 23 — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('oogonia-mcq', mcq({
  stem: 'When are the oogonia of a woman formed?',
  right: 'During her own embryonic (foetal) development',
  wrong: ['At puberty', 'Once in every menstrual cycle', 'Throughout adult life, until menopause'],
  sol: 'Millions of oogonia form in each foetal ovary, and no more are formed after birth — option (@K).',
  d: 2, c: 'recall', t: [2],
}));
{
  const S = spermatogenesis(120);
  add('sperms-num', num({
    stem: 'If 120 primary spermatocytes in a testis complete spermatogenesis, how many sperms will be formed?',
    value: S.sperms,
    sol: r`Each primary spermatocyte gives 4 spermatids, each becoming one sperm: $120 \times 4 = ${S.sperms}$.`,
    scheme: [[`${S.sperms}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 120 * 4 || 'value');
}
{
  const S = spermatogenesis(30);
  const O = oogenesis(30);
  add('gamete-diff-num', num({
    stem: 'Thirty primary spermatocytes and thirty primary oocytes complete gametogenesis (the oocytes after sperm entry). How many more functional gametes are formed from the spermatocytes than from the oocytes?',
    value: S.sperms - O.ova,
    sol: r`Sperms $= 30 \times 4 = ${S.sperms}$; ova $= 30 \times 1 = ${O.ova}$ (the other products are polar bodies). Difference $= ${S.sperms} - ${O.ova} = ${S.sperms - O.ova}$.`,
    scheme: [[`${S.sperms - O.ova}`, 1]],
    d: 3, c: 'application', t: [2],
  }), (q) => q.answer.value === 30 * 4 - 30 || 'value');
}
add('ovulation-mcq', mcq({
  stem: 'Which cell is released from the Graafian follicle at ovulation in humans?',
  right: 'Secondary oocyte',
  wrong: ['Primary oocyte', 'Mature ovum after meiosis II', 'Oogonium'],
  sol: 'The primary oocyte completes meiosis I inside the tertiary follicle; the Graafian follicle then releases the secondary oocyte, which completes meiosis II only after a sperm enters — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('lh-fsh-mcq', mcq({
  stem: 'A drug blocks the receptors for LH on the Leydig cells of an adult male. Which change is expected first?',
  right: 'Androgen secretion falls, so spermatogenesis is reduced.',
  wrong: ['FSH stops acting on Sertoli cells, so spermiation increases.', 'The seminiferous tubules start producing ova.', 'Androgen secretion rises, so more sperms are made.'],
  sol: 'LH acts on Leydig cells to make them secrete androgens, which stimulate spermatogenesis. Blocking LH action lowers androgens and therefore sperm production — option (@K).',
  d: 4, c: 'application', t: [2],
}));
add('acrosome-mcq', mcq({
  stem: 'A man’s sperms swim normally but lack acrosomes. Why are they unlikely to fertilise an ovum?',
  right: 'They lack the enzymes needed to get through the layers around the oocyte.',
  wrong: ['They lack mitochondria, so they cannot move.', 'They lack a nucleus, so they carry no chromosomes.', 'They are diploid instead of haploid.'],
  sol: 'The acrosome is a cap of enzymes that helps the sperm penetrate the oocyte’s coverings. Without it, entry fails even if the sperm reaches the oocyte — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('midpiece-mcq', mcq({
  stem: 'A semen analysis shows sperms of normal shape that hardly move. A defect in which part of the sperm is the most likely cause?',
  right: 'Mitochondria of the middle piece',
  wrong: ['Acrosome of the head', 'Nucleus of the head', 'Plasma membrane of the head only'],
  sol: 'The middle piece holds many mitochondria, which supply energy for the tail to move — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('polar-ar', ar({
  a: 'In oogenesis, a primary oocyte gives rise to only one functional ovum.',
  r: 'The meiotic divisions of the oocyte are unequal, and the polar bodies receive very little cytoplasm.',
  key: 'a',
  sol: 'Both are true. Because the divisions are unequal, almost all the cytoplasm stays in one cell, which becomes the ovum, while the tiny polar bodies degenerate. R explains A — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('spermio-tf', tf({
  stem: 'Spermiogenesis is the release of sperms from the seminiferous tubules.',
  key: 'f',
  sol: 'False. Spermiogenesis is the transformation of spermatids into sperms; their release from the tubules is spermiation.',
  d: 2, c: 'recall', t: [2],
}));
add('follicle-order-mcq', mcq({
  stem: 'Which is the correct order of follicle development in the human ovary?',
  right: 'Primary → secondary → tertiary → Graafian',
  wrong: ['Graafian → tertiary → secondary → primary', 'Primary → tertiary → secondary → Graafian', 'Secondary → primary → Graafian → tertiary'],
  sol: 'A primary follicle gains layers (secondary), forms an antrum (tertiary) and matures into a Graafian follicle — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('spermatid-fill', fill({
  stem: 'The number of chromosomes in a human spermatid is ______.',
  acc: [['23', 'twenty-three']],
  sol: '23: spermatids are formed by meiosis II from haploid secondary spermatocytes.',
  d: 1, c: 'recall', t: [2],
}));
add('compare-gameto-short', short({
  marks: 3,
  stem: 'Give three differences between spermatogenesis and oogenesis in humans.',
  model: '1. **Start:** spermatogenesis begins at puberty; oogenesis begins during the embryonic development of the girl.\n\n2. **Output:** each primary spermatocyte gives four sperms; each primary oocyte gives only one ovum, the rest of the chromosomes going into polar bodies.\n\n3. **Division of cytoplasm:** the divisions in spermatogenesis are equal; in oogenesis they are unequal, so the oocyte keeps most of the cytoplasm.',
  sol: 'Compare timing, number of gametes and equality of division (also continuity into old age vs menopause).',
  scheme: [['Difference in timing', 1], ['Difference in number of gametes', 1], ['Difference in division of cytoplasm (or duration)', 1]],
  d: 3, c: 'analysis', t: [2],
}));
add('sperm-short', short({
  marks: 2,
  stem: 'Give the function of the acrosome and of the middle piece of a human sperm.',
  model: 'The **acrosome** is a cap on the head filled with **enzymes** that help the sperm penetrate the ovum during fertilisation. The **middle piece** contains numerous **mitochondria**, which produce the energy for the movement of the tail.',
  sol: 'Acrosome: enzymes for entry; middle piece: mitochondria for energy.',
  scheme: [['Acrosome: enzymes for fertilisation', 1], ['Middle piece: mitochondria supply energy for movement', 1]],
  d: 2, c: 'recall', t: [2],
}));
add('follicle-loss-short', short({
  marks: 2,
  stem: 'Millions of oogonia form in the ovaries of a female foetus, yet a woman releases only a few hundred secondary oocytes in her life. Explain.',
  model: 'No new oogonia form after birth, and a large number of follicles **degenerate** between birth and puberty, leaving only about 60,000–80,000 in each ovary. After puberty, usually **only one** secondary oocyte is released in each menstrual cycle until menopause, so only a few hundred are ever released.',
  sol: 'Degeneration before puberty plus one ovulation per cycle.',
  scheme: [['Many follicles degenerate before puberty; none are added', 1], ['Usually one oocyte per cycle until menopause', 1]],
  d: 3, c: 'analysis', t: [2],
}));
add('spermatogenesis-long', long({
  stem: 'Describe spermatogenesis in humans with a flow chart showing the chromosome number at each stage. How is the process controlled by hormones?',
  model: '**Flow chart:** spermatogonium (46) → primary spermatocyte (46) → meiosis I → two secondary spermatocytes (23 each) → meiosis II → four spermatids (23 each) → spermiogenesis → four sperms (23 each).\n\n**Process.** Spermatogenesis begins at puberty in the seminiferous tubules. Spermatogonia on the inner wall multiply by mitosis, and some enlarge into primary spermatocytes. Each completes the first meiotic division to form two haploid secondary spermatocytes, which complete the second division to form four spermatids. The spermatids are transformed into sperms (spermiogenesis), and the sperms are finally released from the tubules (spermiation).\n\n**Hormonal control.** At puberty, the hypothalamus increases GnRH, which makes the anterior pituitary release LH and FSH. LH acts on the Leydig cells, which secrete androgens that stimulate spermatogenesis. FSH acts on the Sertoli cells and stimulates factors that help spermiogenesis.',
  sol: 'Flow chart with 46 → 23, spermiogenesis and spermiation, then GnRH → LH (Leydig) and FSH (Sertoli).',
  scheme: [['Flow chart with correct chromosome numbers', 2], ['Spermiogenesis and spermiation explained', 1], ['GnRH, LH acting on Leydig cells (androgens)', 1], ['FSH acting on Sertoli cells', 1]],
  wl: [80, 160],
  d: 3, c: 'understanding', t: [2],
}));
add('oogenesis-long', long({
  stem: 'Describe oogenesis in humans, including the stages of follicle development, up to ovulation and fertilisation. Show the main steps in a flow chart.',
  model: '**Flow chart:** oogonium (46) → primary oocyte (46, arrested in prophase I) → [in tertiary follicle] meiosis I → secondary oocyte (23) + first polar body → ovulation → [after sperm entry] meiosis II → ovum (23) + second polar body.\n\n**Before birth.** Millions of oogonia form in each foetal ovary; none are added later. They enter meiosis I and stop at prophase as primary oocytes, each surrounded by granulosa cells in a primary follicle. Many degenerate before puberty.\n\n**After puberty.** Primary follicles gain layers of granulosa cells and a theca (secondary follicles), then a fluid-filled antrum (tertiary follicles). In the tertiary follicle, the primary oocyte completes meiosis I unequally, forming a large secondary oocyte and a tiny polar body. The follicle matures into a Graafian follicle; the oocyte forms the zona pellucida. The Graafian follicle ruptures to release the secondary oocyte (ovulation), which completes meiosis II only when a sperm enters.',
  sol: 'Before birth (oogonia, primary oocytes, primary follicles), after puberty (follicle stages, unequal meiosis I, Graafian follicle, ovulation), meiosis II at fertilisation.',
  scheme: [['Flow chart with polar bodies and chromosome numbers', 2], ['Events before birth', 1], ['Follicle stages and unequal meiosis I', 1], ['Ovulation of the secondary oocyte; meiosis II after sperm entry', 1]],
  wl: [80, 170],
  d: 3, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 menstrual cycle
add('luteal-ar', ar({
  a: 'During the luteal phase of the menstrual cycle, the endometrium is maintained.',
  r: 'The corpus luteum secretes large amounts of progesterone, which is essential for maintaining the endometrium.',
  key: 'a',
  sol: 'Both are true, and the progesterone from the corpus luteum is the reason the endometrium is maintained — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('lh-surge-mcq', mcq({
  stem: 'Ovulation in the middle of the menstrual cycle is brought about mainly by',
  right: 'a rapid surge of LH',
  wrong: ['a fall in estrogen', 'a rise in progesterone from the corpus luteum', 'oxytocin from the pituitary'],
  sol: 'LH and FSH peak in mid-cycle, and the LH surge induces rupture of the Graafian follicle — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('day-mcq', mcq({
  stem: 'On day 21 of a regular 28-day menstrual cycle with no pregnancy, which structure in the ovary is most active, and which hormone does it secrete?',
  right: 'Corpus luteum; progesterone',
  wrong: ['Graafian follicle; LH', 'Primary follicle; progesterone', 'Corpus luteum; FSH'],
  sol: 'Day 21 is in the luteal phase. The corpus luteum formed from the ruptured follicle secretes progesterone — option (@K). LH and FSH come from the pituitary, not the ovary.',
  d: 3, c: 'application', t: [3],
}));
add('day8-mcq', mcq({
  stem: 'On day 8 of a regular 28-day cycle, the endometrium of a woman is thickening again. Which hormone is mainly responsible, and where does it come from?',
  right: 'Estrogen, from the growing ovarian follicles',
  wrong: ['Progesterone, from the corpus luteum', 'LH, from the Graafian follicle', 'Oxytocin, from the pituitary'],
  sol: 'Day 8 is in the follicular (proliferative) phase; estrogen secreted by the growing follicles causes the endometrium to regenerate — option (@K). The corpus luteum forms only after ovulation.',
  d: 3, c: 'application', t: [3],
}));
add('ovaries-removed-mcq', mcq({
  stem: 'A woman has both ovaries removed in an operation, but her uterus is left intact. Which change is expected?',
  right: 'Ovulation and menstrual cycles stop, because the ovarian hormones that drive the endometrial changes are no longer made.',
  wrong: ['Menstrual cycles continue normally, because the uterus is intact.', 'Ovulation continues from the oviducts.', 'The pituitary stops making LH and FSH, so the uterus starts making estrogen.'],
  sol: 'The ovaries release oocytes and secrete estrogen and progesterone, which build and maintain the endometrium. Without them there is no ovulation and the cyclical changes of the endometrium stop — option (@K).',
  d: 4, c: 'analysis', t: [3],
}));
add('no-menses-mcq', mcq({
  stem: 'A woman’s pregnancy test is positive two weeks after her expected period. Why has she not menstruated?',
  right: 'The corpus luteum is maintained, so progesterone stays high and the endometrium is kept.',
  wrong: ['The ovaries stop making all hormones.', 'The uterus loses its endometrium permanently.', 'LH rises sharply every week.'],
  sol: 'Menstruation follows the fall of progesterone when the corpus luteum degenerates. In pregnancy the corpus luteum is maintained, so the endometrium is not shed — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('cycle-match', match({
  stem: 'Match each phase of the menstrual cycle (column I) with its main event (column II).',
  pairs: [
    ['Menstrual phase', 'Breakdown of the endometrium and its blood vessels'],
    ['Follicular phase', 'Growth of follicles and regeneration of the endometrium'],
    ['Ovulation', 'Rupture of the Graafian follicle'],
    ['Luteal phase', 'Progesterone from the corpus luteum maintains the endometrium'],
  ],
  order: [2, 3, 0, 1],
  sol: 'Menstrual — breakdown; follicular — follicle growth and regeneration; ovulation — rupture of the Graafian follicle; luteal — corpus luteum and progesterone.',
  d: 2, c: 'understanding', t: [3],
}));
{
  const day1 = 3;
  const ov = day1 + 14 - 1;
  add('ovulation-date-num', num({
    stem: 'A woman has regular 28-day cycles, and her latest menstrual flow began on 3 March. Counting that day as day 1, on which date in March is ovulation most likely? Give the date as a number.',
    value: ov,
    sol: r`Ovulation is around day 14. Day 1 is 3 March, so day 14 is $3 + (14 - 1) = ${ov}$ March.`,
    scheme: [[`${ov} March`, 1]],
    d: 3, c: 'application', t: [3],
  }), (q) => q.answer.value === 16 || 'date');
}
add('menarche-fill', fill({
  stem: 'The first menstruation, which begins at puberty, is called ______.',
  acc: [['menarche']],
  sol: 'Menarche.',
  d: 1, c: 'recall', t: [3],
}));
add('menses-short', short({
  marks: 2,
  stem: 'A young woman with regular cycles misses her period. Give two possible reasons, one related to reproduction and one not.',
  model: 'She may be **pregnant**: the corpus luteum is maintained, progesterone stays high and the endometrium is not shed. Menstruation can also be missed because of **stress, poor health or other factors**, so a missed period does not by itself prove pregnancy.',
  sol: 'Pregnancy, or stress or poor health.',
  scheme: [['Pregnancy, with the reason', 1], ['A non-pregnancy cause such as stress or poor health', 1]],
  d: 2, c: 'application', t: [3],
}));
add('hormones-short', short({
  marks: 3,
  stem: 'State the role of each of the following in the menstrual cycle: (a) estrogen, (b) LH, (c) progesterone.',
  model: '(a) **Estrogen**, secreted by the growing follicles in the follicular phase, makes the endometrium **regenerate** (proliferate).\n\n(b) **LH** from the anterior pituitary reaches a peak at mid-cycle; this **LH surge** causes **ovulation**, the rupture of the Graafian follicle, and the formation of the corpus luteum.\n\n(c) **Progesterone**, secreted by the corpus luteum in the luteal phase, **maintains the endometrium** for implantation.',
  sol: 'Estrogen regenerates, LH surge causes ovulation, progesterone maintains.',
  scheme: [['Estrogen: endometrium regeneration', 1], ['LH: surge causes ovulation', 1], ['Progesterone: maintains the endometrium', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('cycle-long', long({
  stem: 'Describe the events of the ovary and the uterus in the four phases of a 28-day menstrual cycle, naming the hormones that control them. What happens if the ovum is fertilised?',
  model: '**Menstrual phase (about days 1–5).** The endometrium and its blood vessels break down and flow out as menstrual flow, because progesterone has fallen after the corpus luteum degenerated.\n\n**Follicular (proliferative) phase.** Pituitary LH and FSH rise gradually; primary follicles grow into a mature Graafian follicle. Estrogen from the growing follicles makes the endometrium regenerate.\n\n**Ovulation (about day 14).** LH and FSH reach a peak; the LH surge ruptures the Graafian follicle, which releases the secondary oocyte.\n\n**Luteal (secretory) phase.** The ruptured follicle becomes the corpus luteum, which secretes large amounts of progesterone that maintain the endometrium for implantation. Without fertilisation, the corpus luteum degenerates, progesterone falls and a new menstrual phase starts.\n\n**If fertilised,** the corpus luteum is maintained, the endometrium is kept for the embryo and menstruation stops during pregnancy.',
  sol: 'Four phases with ovarian and uterine events and LH, FSH, estrogen and progesterone; pregnancy keeps the corpus luteum.',
  scheme: [['Menstrual phase with cause', 1], ['Follicular phase: follicle growth, estrogen, endometrium regeneration', 1], ['Ovulation: LH surge', 1], ['Luteal phase: corpus luteum, progesterone', 1], ['If fertilised: corpus luteum maintained, no menstruation', 1]],
  wl: [80, 170],
  d: 3, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 fertilisation, implantation
add('xy-mcq', mcq({
  stem: 'A zygote formed by the fusion of an ovum with a Y-bearing sperm will develop into a',
  right: 'boy (XY)',
  wrong: ['girl (XX)', 'girl (XY)', 'boy (YY)'],
  sol: 'Every ovum carries X; with a Y-bearing sperm the zygote is XY, which develops into a male — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('icm-mcq', mcq({
  stem: 'Which part of the blastocyst develops into the embryo?',
  right: 'Inner cell mass',
  wrong: ['Trophoblast', 'Blastocoel', 'Zona pellucida'],
  sol: 'The inner cell mass gives rise to the embryo; the trophoblast attaches to the endometrium — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('zona-mcq', mcq({
  stem: 'Suppose the zona pellucida of an oocyte failed to change after the first sperm made contact with it. What would most likely happen?',
  right: 'More than one sperm could enter, giving an abnormal zygote with extra chromosomes.',
  wrong: ['No sperm at all could enter the oocyte.', 'The oocyte would release a second oocyte.', 'The oocyte would complete meiosis II before ovulation.'],
  sol: 'Normally, contact by the first sperm changes the membrane so that other sperms are blocked. Without this block, several sperms could enter, and the extra sets of chromosomes would make the zygote abnormal — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('meiosis2-mcq', mcq({
  stem: 'A secondary oocyte is released at ovulation, but no sperm reaches it. Which statement about this oocyte is correct?',
  right: 'It never completes its second meiotic division.',
  wrong: ['It completes meiosis II in the ampulla and becomes a zygote.', 'It returns to the ovary as a primary oocyte.', 'It implants in the endometrium as a blastocyst.'],
  sol: 'Meiosis II of the secondary oocyte is completed only when a sperm enters it. Without a sperm, it does not complete the division and simply degenerates — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('polar-body-num', num({
  stem: 'A human primary oocyte completes its first meiotic division. How many chromosomes does the first polar body contain?',
  value: HUMAN.haploid,
  sol: r`Meiosis I separates the homologous chromosomes: $46 \div 2 = 23$ go into the secondary oocyte and 23 into the first polar body, which receives very little cytoplasm.`,
  scheme: [['23', 1]],
  d: 3, c: 'application', t: [2],
}), (q) => q.answer.value === 46 / 2 || 'value');
add('blastomere-num', num({
  stem: 'A human zygote undergoes four successive rounds of cleavage, with every cell dividing each time. How many blastomeres will the embryo have?',
  value: 16,
  sol: r`Each round doubles the cells: $1 \to 2 \to 4 \to 8 \to 16$, that is, $2^4 = 16$ blastomeres (a morula).`,
  scheme: [['16', 1]],
  d: 2, c: 'application', t: [4],
}), (q) => q.answer.value === 2 ** 4 || 'value');
{
  const S = semen(280, 65, 45);
  add('normal-sperm-num', num({
    stem: 'A semen sample contains 280 million sperms, of which 65% have normal shape and size. How many million sperms are of normal shape and size?',
    value: S.normal,
    sol: r`$280 \times \dfrac{65}{100} = ${S.normal}$ million.`,
    scheme: [[`${S.normal} million`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === (280 * 65) / 100 || 'value');
}
add('sex-ar', ar({
  a: 'The sex of a human baby is determined by the father.',
  r: 'Human ova carry either an X or a Y chromosome.',
  key: 'c',
  sol: 'A is true: sperms carry X or Y, and that decides the sex. R is false: every ovum carries an X chromosome — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('morula-tf', tf({
  stem: 'A morula is a hollow ball of cells with an inner cell mass and an outer trophoblast.',
  key: 'f',
  sol: 'False. The morula is a solid embryo of 8–16 blastomeres; the hollow stage with trophoblast and inner cell mass is the blastocyst.',
  d: 2, c: 'understanding', t: [4],
}));
add('three-boys-num', num({
  stem: 'Assuming each pregnancy is independent and a boy or a girl is equally likely, what is the probability that all three children of a couple are boys? Give your answer as a decimal.',
  value: allSameSex(3),
  sol: r`P(boy) $= \dfrac{1}{2}$ each time, so P(three boys) $= \left(\dfrac{1}{2}\right)^3 = \dfrac{1}{8} = 0.125$.`,
  scheme: [['0.125', 1]],
  d: 3, c: 'application', t: [4],
}), (q) => q.answer.value === 0.5 * 0.5 * 0.5 || 'value');
add('implantation-short', short({
  marks: 2,
  stem: 'What is implantation? Which part of the blastocyst attaches to the uterus, and which part forms the embryo?',
  model: '**Implantation** is the embedding of the blastocyst in the **endometrium** of the uterus. The outer layer, the **trophoblast**, attaches to the endometrium, after which the uterine cells cover the blastocyst; the **inner cell mass** develops into the embryo.',
  sol: 'Definition; trophoblast attaches; inner cell mass forms the embryo.',
  scheme: [['Definition of implantation', 1], ['Trophoblast attaches; inner cell mass forms the embryo', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('blocked-oviduct-short', short({
  marks: 3,
  stem: 'A woman’s ovaries and uterus are normal, but both her oviducts are completely blocked at the isthmus. Explain (a) why she cannot become pregnant naturally, (b) where fertilisation would normally have occurred, and (c) whether her menstrual cycles will continue.',
  model: '(a) Sperms swimming up from the uterus cannot pass the block to reach the oocyte, and the oocyte cannot reach the uterus, so **fertilisation and implantation cannot occur**.\n\n(b) Fertilisation normally occurs in the **ampullary region** of the oviduct, beyond the isthmus.\n\n(c) **Yes.** The ovaries and pituitary still work, so follicles grow, ovulation occurs and, without pregnancy, the corpus luteum degenerates and menstruation follows each cycle.',
  sol: 'Block stops the gametes meeting; site is the ampulla; the cycle depends on hormones, not on the oviduct.',
  scheme: [['(a) Gametes cannot meet', 1], ['(b) Ampulla', 1], ['(c) Cycles continue, with reason', 1]],
  d: 3, c: 'application', t: [3, 4],
}));
add('sex-short', short({
  marks: 3,
  stem: 'Using a simple chart of sex chromosomes, explain why it is the father and not the mother who determines whether a baby is a boy or a girl.',
  model: 'Mother **XX** → all ova carry **X**. Father **XY** → half the sperms carry **X** and half carry **Y**.\n\n- Ovum (X) + X-sperm → **XX** → girl.\n- Ovum (X) + Y-sperm → **XY** → boy.\n\nSince the mother always contributes an X, the sex depends on **which kind of sperm** fertilises the ovum, so it is decided by the father; each pregnancy has an equal chance of a boy or a girl.',
  sol: 'Chart of XX and XY gametes and the two fertilisations.',
  scheme: [['Gametes: ova all X; sperms X or Y', 1], ['Correct combinations XX girl, XY boy', 1], ['Conclusion: the sperm decides; equal chance', 1]],
  d: 3, c: 'application', t: [4],
}));
add('fert-long', long({
  stem: 'Describe the events from insemination to the implantation of the embryo in humans.',
  model: '**Insemination and transport.** Sperms released into the vagina swim through the cervix and uterus to the oviduct. The secondary oocyte released at ovulation is collected by the fimbriae and moves into the oviduct.\n\n**Fertilisation.** It occurs only if the oocyte and sperms reach the ampullary region together. When a sperm contacts the zona pellucida, changes in the membrane block other sperms. The sperm’s entry makes the secondary oocyte complete meiosis II, forming the ovum and a second polar body; the haploid nuclei fuse to form a diploid zygote.\n\n**Cleavage.** As the zygote moves through the isthmus towards the uterus, it divides by mitosis into 2, 4, 8 and 16 blastomeres; with 8–16 blastomeres it is a morula, which develops into a blastocyst.\n\n**Implantation.** The blastocyst’s outer trophoblast attaches to the endometrium; the uterine cells cover it and it becomes embedded. The inner cell mass develops into the embryo.',
  sol: 'Transport → fertilisation in the ampulla (block to other sperms, meiosis II) → cleavage, morula, blastocyst → implantation.',
  scheme: [['Transport of sperms and oocyte', 1], ['Fertilisation in the ampulla with the block to other sperms', 1], ['Completion of meiosis II and zygote formation', 1], ['Cleavage, morula, blastocyst', 1], ['Implantation: trophoblast attaches, inner cell mass forms the embryo', 1]],
  wl: [80, 170],
  d: 3, c: 'understanding', t: [4],
}));
add('blame-long', long({
  stem: 'In a village, a woman who has given birth to three daughters is blamed by her relatives for “not giving them a son”. Evaluate this belief using your knowledge of sex determination, and suggest how a health worker could respond.',
  model: '**The science.** The mother is XX, so every ovum she produces carries an X chromosome. The father is XY, so half his sperms carry X and half carry Y. A girl results when an X-bearing sperm fertilises the ovum, and a boy when a Y-bearing sperm does. The sex of the baby is therefore decided by the father’s sperm, by chance, and not by the mother.\n\n**Chance.** In every pregnancy the chance of a girl is about one half. Three girls in a row has a probability of one eighth, so it happens in many families and does not indicate any fault in either parent.\n\n**Evaluation.** The belief is scientifically wrong and unfair; it harms the mother’s health and dignity and can lead to pressure for sex selection, which is illegal in India.\n\n**Response.** The health worker could explain the X and Y sperm chart simply, stress that daughters and sons are equally valuable, and support the mother’s health.',
  sol: 'XX and XY gametes; sperm decides; probability 1/8; belief is wrong and harmful; respectful explanation.',
  scheme: [['Gametes of mother and father correctly stated', 1], ['Sex decided by the sperm', 1], ['Probability reasoning (one half each time; one eighth for three)', 1], ['Judgement that the belief is wrong and harmful', 1], ['Sensible response by the health worker', 1]],
  wl: [80, 170],
  d: 5, c: 'evaluation', t: [4],
}));

// ---------------------------------------------------------------- t05 pregnancy, placenta, parturition, lactation
add('oxytocin-ar', ar({
  a: 'During labour, the release of oxytocin keeps increasing until the baby is delivered.',
  r: 'Stronger uterine contractions stimulate the further release of oxytocin from the mother’s pituitary.',
  key: 'a',
  sol: 'Both are true, and the positive feedback described in R is why oxytocin keeps rising — option (a).',
  d: 3, c: 'understanding', t: [5],
}));
add('relaxin-mcq', mcq({
  stem: 'Which of the following is NOT secreted by the human placenta?',
  right: 'Relaxin',
  wrong: ['Human chorionic gonadotropin (hCG)', 'Human placental lactogen (hPL)', 'Progestogens'],
  sol: 'The placenta secretes hCG, hPL, estrogens and progestogens. Relaxin is secreted by the ovary in the later phase of pregnancy — option (@K).',
  d: 3, c: 'understanding', t: [5],
}));
add('colostrum-mcq', mcq({
  stem: 'Doctors encourage mothers to feed colostrum to a newborn mainly because it',
  right: 'contains antibodies, such as IgA, that protect the baby against infections',
  wrong: ['contains no water, so the baby does not need to digest it', 'is the only milk that contains fat', 'contains hormones that decide the baby’s sex'],
  sol: 'Colostrum, the milk of the first few days, contains several antibodies that give the newborn resistance — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('hcg-mcq', mcq({
  stem: 'A home pregnancy-test kit detects a hormone in the urine. Which hormone is it most likely to detect, and why is this hormone a good marker?',
  right: 'hCG, because it is made by the placenta only during pregnancy',
  wrong: ['Progesterone, because it is made only during pregnancy', 'Oxytocin, because it rises throughout pregnancy', 'FSH, because it is made only by the placenta'],
  sol: 'hCG (and hPL) are produced only in pregnancy, by the placenta, so their presence signals pregnancy. Progesterone is also made in every normal cycle — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('trimester-mcq', mcq({
  stem: 'An ultrasound report says that a foetus has a body covered with fine hair, its eyelids have separated and eyelashes have formed, but it is not yet fully developed. About how far has the pregnancy progressed?',
  right: 'About 24 weeks (end of the second trimester)',
  wrong: ['About 4 weeks (end of the first month)', 'About 8 weeks (end of the second month)', 'About 38 weeks (ready for delivery)'],
  sol: 'Fine body hair, separated eyelids and eyelashes are the milestones of the end of 24 weeks; at one month only the heart has formed, at two months limbs and digits, and at about nine months the foetus is fully developed — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('germ-fill', fill({
  stem: 'Soon after implantation, the inner cell mass differentiates into ectoderm, mesoderm and ______.',
  acc: [['endoderm']],
  sol: 'Endoderm.',
  d: 1, c: 'recall', t: [5],
}));
add('placenta-short', short({
  marks: 3,
  stem: 'In some pregnancies the placenta develops poorly. Explain how the placenta is normally formed, and predict two problems a foetus would face if its placenta worked poorly.',
  model: 'After implantation, finger-like **chorionic villi** grow from the trophoblast and interlock with the **uterine tissue**; together they form the placenta, joined to the embryo by the **umbilical cord**.\n\nProblems if it works poorly: (1) the foetus would receive too little **oxygen and nutrients** and could not remove **carbon dioxide and wastes** well, so its growth would slow; (2) the placenta’s **hormones** (hCG, hPL, estrogens, progestogens) that maintain the pregnancy might fall short, putting the pregnancy at risk.',
  sol: 'Villi + uterine tissue; link each placental function to a problem when it fails.',
  scheme: [['Formation from chorionic villi and uterine tissue', 1], ['Poor exchange of gases, nutrients and wastes; slow growth', 1], ['Too little pregnancy-maintaining hormone', 1]],
  d: 3, c: 'application', t: [5],
}));
add('parturition-short', short({
  marks: 2,
  stem: 'When a woman’s labour slows down, doctors sometimes give her a medicine that acts like oxytocin. Explain the biological basis of this treatment.',
  model: 'Normally, signals from the mature foetus and placenta cause mild contractions (the **foetal ejection reflex**), which make the pituitary release **oxytocin**. Oxytocin makes the uterine muscle contract more strongly, and stronger contractions release more oxytocin (**positive feedback**). The medicine supplies the missing oxytocin action, so contractions strengthen and delivery can proceed.',
  sol: 'Oxytocin drives uterine contractions in a positive feedback loop; the medicine restarts the loop.',
  scheme: [['Oxytocin causes strong uterine contractions (foetal ejection reflex)', 1], ['Positive feedback; medicine boosts contractions', 1]],
  d: 3, c: 'application', t: [5],
}));
add('pregnancy-long', long({
  stem: 'Trace the development of the human foetus from implantation to birth: name the germ layers, give three milestones of growth with their times, and explain how birth is brought about.',
  model: '**Germ layers.** Soon after implantation, the inner cell mass differentiates into ectoderm, mesoderm and endoderm, from which all tissues and organs develop; these cells are stem cells.\n\n**Milestones.** The heart forms by the end of the first month; limbs and digits develop by the end of the second month; by the end of 12 weeks most major organ systems are formed; the first movements and head hair appear in the fifth month; by 24 weeks the body is covered with fine hair, the eyelids separate and eyelashes form; at about nine months the foetus is fully developed.\n\n**Birth.** Signals from the fully developed foetus and the placenta cause mild uterine contractions, the foetal ejection reflex. These trigger oxytocin release from the mother’s pituitary; oxytocin makes the uterine muscle contract more strongly, which releases still more oxytocin. The baby is expelled through the birth canal, followed by the placenta.',
  sol: 'Germ layers; at least three milestones with times; foetal ejection reflex and oxytocin feedback.',
  scheme: [['Three germ layers from the inner cell mass', 1], ['Three correct milestones with times', 2], ['Foetal ejection reflex', 1], ['Oxytocin positive feedback and delivery', 1]],
  wl: [80, 160],
  d: 3, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- cases
add('cycle-case', mk.case({
  passage: 'A doctor measured four hormones in the blood of a healthy woman on five days of one 28-day menstrual cycle. The values are relative (1 = lowest, 10 = highest seen).\n\n| Day | LH | FSH | Estrogen | Progesterone |\n|---|---|---|---|---|\n| 2 | 2 | 3 | 2 | 1 |\n| 9 | 2 | 3 | 6 | 1 |\n| 14 | 10 | 7 | 7 | 2 |\n| 21 | 2 | 2 | 5 | 9 |\n| 27 | 2 | 3 | 2 | 2 |',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'On which day did ovulation most likely occur?',
      right: 'Day 14',
      wrong: ['Day 2', 'Day 9', 'Day 21'],
      sol: 'LH is at its peak (10) on day 14; the LH surge causes ovulation — option (@K).',
      d: 2, c: 'application', t: [3],
    })),
    part('b', short({
      marks: 1,
      stem: 'Name the structure in the ovary that produced the high hormone value seen on day 21.',
      model: 'The **corpus luteum** (secreting progesterone).',
      sol: 'Progesterone in the luteal phase comes from the corpus luteum.',
      scheme: [['Corpus luteum', 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why progesterone has fallen by day 27, and what will happen to the endometrium next.',
      model: 'No fertilisation occurred, so the **corpus luteum degenerated** and stopped secreting progesterone. Without progesterone the endometrium cannot be maintained, so it **breaks down** and menstruation starts a new cycle.',
      sol: 'Corpus luteum degenerates → progesterone falls → menstruation.',
      scheme: [['Corpus luteum degenerates without fertilisation', 1], ['Endometrium breaks down: menstruation', 1]],
      d: 3, c: 'analysis', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'If the ovum released in this cycle had been fertilised and implanted, how would the progesterone value on day 27 differ, and why?',
        model: 'Progesterone would stay **high** instead of falling, because in pregnancy the **corpus luteum is maintained** (and the placenta later adds progestogens). The endometrium would be kept for the embryo, so no menstruation would occur.',
        sol: 'Maintained corpus luteum keeps progesterone high.',
        scheme: [['Progesterone stays high', 1], ['Because the corpus luteum is maintained; no menstruation', 1]],
        d: 3, c: 'analysis', t: [3],
      }),
    ]),
  ],
}));
{
  const B = semen(220, 45, 50);
  add('semen-case', mk.case({
    passage: 'A fertility clinic analysed three semen samples. For normal fertility, at least 60% of sperms should have normal shape and size and at least 40% should show vigorous motility.\n\n| Sample | Sperms (millions) | Normal shape and size | Vigorous motility |\n|---|---|---|---|\n| A | 240 | 65% | 48% |\n| B | 220 | 45% | 50% |\n| C | 260 | 70% | 25% |',
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which sample meets both criteria for normal fertility?',
        right: 'Sample A only',
        wrong: ['Sample B only', 'Samples A and C', 'All three samples'],
        sol: 'A has 65% normal and 48% motile, meeting both; B fails on shape (45%) and C fails on motility (25%) — option (@K).',
        d: 2, c: 'application', t: [2],
      })),
      part('b', num({
        stem: 'How many million sperms in sample B have normal shape and size?',
        value: B.normal,
        sol: r`$220 \times \dfrac{45}{100} = ${B.normal}$ million.`,
        scheme: [[`${B.normal} million`, 1]],
        d: 2, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'Sample C has many normally shaped sperms but few that swim vigorously. Which part of the sperm is most likely defective, and why does poor motility reduce fertility?',
        model: 'The **middle piece**, whose mitochondria supply energy for the tail, (or the tail itself) is likely defective. Sperms must **swim** from the vagina through the cervix and uterus to the **ampulla** of the oviduct to meet the oocyte, so weak swimmers rarely reach it.',
        sol: 'Middle piece/tail; long journey to the ampulla.',
        scheme: [['Middle piece (mitochondria) or tail', 1], ['Sperms must swim to the ampulla to fertilise', 1]],
        d: 3, c: 'analysis', t: [2, 4],
      }), [
        short({
          marks: 2,
          stem: 'Only one sperm fertilises an ovum. Explain why a man still needs to release so many sperms for normal fertility.',
          model: 'Most sperms **never reach the ampulla**: many are lost in the female tract or fail to swim the long distance, and fertilisation is possible only if sperms and the oocyte reach the ampulla **at the same time**. A large number of healthy, motile sperms increases the chance that some arrive and one enters the oocyte.',
          sol: 'Losses on the way; timing; chance.',
          scheme: [['Most sperms are lost before the ampulla', 1], ['Large numbers raise the chance of fertilisation', 1]],
          d: 3, c: 'evaluation', t: [4],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === (220 * 45) / 100 || 'value');
}
add('embryo-case', mk.case({
  passage: 'Researchers describe the usual timetable of a human embryo in its first week.\n\n| Days after fertilisation | Where | What is seen |\n|---|---|---|\n| 1 | Ampulla of the oviduct | Zygote, then 2 cells |\n| 3 | Isthmus | A solid ball of about 12 cells |\n| 5 | Uterine cavity | A hollow ball with a cluster of cells at one side |\n| 7 | Uterine wall | The structure is embedded in the endometrium |',
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'What is the stage seen on day 3 called?',
      right: 'Morula',
      wrong: ['Blastocyst', 'Gastrula', 'Foetus'],
      sol: 'A solid embryo of 8–16 blastomeres is a morula — option (@K).',
      d: 2, c: 'understanding', t: [4],
    })),
    part('b', short({
      marks: 1,
      stem: 'Which part of the day-5 structure makes contact with the endometrium during implantation?',
      model: 'The **trophoblast** (outer layer of the blastocyst).',
      sol: 'Trophoblast.',
      scheme: [['Trophoblast', 1]],
      d: 2, c: 'understanding', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'If the day-5 structure failed to implant, what would happen to the corpus luteum and the endometrium? Give reasons.',
      model: 'Without implantation there is **no pregnancy**, so the **corpus luteum degenerates** and progesterone falls. The endometrium can no longer be maintained, so it **breaks down** and is shed as menstrual flow, starting a new cycle.',
      sol: 'No pregnancy → corpus luteum degenerates → menstruation.',
      scheme: [['Corpus luteum degenerates; progesterone falls', 1], ['Endometrium shed: menstruation', 1]],
      d: 3, c: 'analysis', t: [3, 4],
    }), [
      short({
        marks: 2,
        stem: 'Explain why the embryo hardly grows in size between day 1 and day 3, and state the fate of the cluster of cells seen on day 5.',
        model: 'During **cleavage**, the zygote divides rapidly by mitosis, but the cells do not grow between divisions, so the embryo is split into smaller and smaller **blastomeres** without increasing in size. The cluster on day 5 is the **inner cell mass**, which develops into the **embryo**.',
        sol: 'Cleavage divides without growth; inner cell mass becomes the embryo.',
        scheme: [['Cleavage: division without growth', 1], ['Inner cell mass forms the embryo', 1]],
        d: 3, c: 'analysis', t: [4],
      }),
    ]),
  ],
}));
