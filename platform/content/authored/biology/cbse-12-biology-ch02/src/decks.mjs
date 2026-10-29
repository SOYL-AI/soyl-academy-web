// ch02 Human Reproduction — three decks: Part 1 (t01), Part 2 (t02–t03), Part 3 (t04–t05).
import { sl, deck, table, flow, svgV, r } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { MALE, FEMALE, TUBULE, SPERM, OVARY, CYCLE, JOURNEY, BLASTOCYST } from './svgs.mjs';
import { HUMAN, spermatogenesis, tubuleRange, semen, allSameSex } from './calc.mjs';

export const V = {
  male: svgV(MALE, 'Labelled male reproductive system: testes in the scrotum, epididymis, vas deferens, seminal vesicles, prostate, bulbourethral glands, urinary bladder, urethra, penis and urethral meatus', 'Schematic front view, not to scale.'),
  female: svgV(FEMALE, 'Labelled female reproductive system: ovaries, oviduct with infundibulum and fimbriae, ampulla and isthmus, uterus with perimetrium, myometrium and endometrium, cervix and vagina', 'Schematic front view, not to scale.'),
  tubule: svgV(TUBULE, 'Section of a seminiferous tubule with spermatogonia at the wall, spermatocytes and spermatids towards the lumen, sperms in the lumen, a Sertoli cell, and interstitial cells outside'),
  sperm: svgV(SPERM, 'Human sperm with head (acrosome and nucleus), neck, middle piece with mitochondria, and tail'),
  ovary: svgV(OVARY, 'Ovary section with primary, secondary, tertiary and Graafian follicles, ovulation of a secondary oocyte, and a corpus luteum', 'Schematic: all stages drawn in one ovary for comparison.'),
  cycle: svgV(CYCLE, 'Qualitative hormone curves over a 28-day menstrual cycle with phases and endometrium thickness'),
  journey: svgV(JOURNEY, 'From ovulation to implantation: fertilisation in the ampulla, cleavage and morula in the oviduct, blastocyst implanting in the endometrium'),
  blastocyst: svgV(BLASTOCYST, 'Blastocyst with trophoblast, blastocoel and inner cell mass'),
};

// ---------------------------------------------------------------- worked-example numbers (computed)
const TUB1 = tubuleRange(250);
const TUB2 = tubuleRange(250, 2);
const SG = spermatogenesis(50);
const SEM = semen(250, 60, 40);
const P2 = allSameSex(2);

export const deck1 = deck({
  part: 1,
  title: 'Human Reproduction — Part 1: The male and female reproductive systems',
  goals: [
    'Label the male reproductive system and trace the path of sperms',
    'State the roles of the testes, ducts and accessory glands',
    'Label the female reproductive system, including the parts of the oviduct and the uterine wall',
    'Describe the mammary glands',
  ],
  slides: [
    sl('title', 'Human Reproduction', {
      b: 'Part 1 — humans reproduce sexually and are viviparous. We begin with the organs that make gametes and support the young.',
      v: flow('LR', [['g', 'Gametogenesis'], ['i', 'Insemination'], ['f', 'Fertilisation'], ['im', 'Implantation'], ['ge', 'Gestation'], ['p', 'Parturition']], [['g', 'i'], ['i', 'f'], ['f', 'im'], ['im', 'ge'], ['ge', 'p']], 'Flow of the main events of human reproduction from gametogenesis to parturition'),
      n: 'Humans reproduce sexually and give birth to live young, so we are called viviparous. The process has a clear sequence: making gametes, transferring sperms, fertilisation, implantation of the embryo, development in the uterus, and birth. In this part we study the organs involved, using simple labelled diagrams.',
    }),
    sl('concept', 'Events of human reproduction', {
      b: 'Reproductive events begin at **puberty**. There are clear differences between males and females: for example, sperm formation continues into old age, but egg formation in women stops at about 50 years.',
      v: table(['Event', 'What happens'], [['Gametogenesis', 'Formation of sperms in males and ova in females'], ['Insemination', 'Transfer of sperms into the female genital tract'], ['Fertilisation', 'Fusion of a sperm and an ovum, forming a zygote'], ['Implantation', 'The blastocyst attaches to the uterine wall'], ['Gestation', 'Development of the embryo and foetus in the uterus'], ['Parturition', 'Delivery of the baby']], 'Table of the six events of human reproduction with what happens in each'),
      n: 'Here are six words you will meet again and again. Gametogenesis makes the gametes. Insemination transfers sperms into the female tract. Fertilisation fuses sperm and ovum. Implantation attaches the young embryo to the uterus. Gestation is the period of development, and parturition is birth. Keep this list as a map for the whole chapter.',
    }),
    sl('diagram', 'The male reproductive system', {
      b: 'It lies in the pelvis and has a pair of **testes**, **accessory ducts**, **accessory glands** and the **external genitalia**. The testes sit outside the abdominal cavity in a pouch called the **scrotum**.',
      v: V.male,
      n: 'Let us read the diagram from bottom to top. Each testis lies in the scrotum, with a coiled epididymis along its side. A vas deferens runs up from each side, loops over the bladder and, joined by the duct of the seminal vesicle, forms an ejaculatory duct that opens into the urethra. The prostate and bulbourethral glands add their secretions along the way.',
    }),
    sl('concept', 'Inside the testis', {
      b: 'The scrotum keeps the testes about **2–2.5 °C below** body temperature, which sperm formation needs. Each testis has about **250 compartments** called **testicular lobules**, each with **one to three** highly coiled **seminiferous tubules**.',
      v: table(['Cell type', 'Where', 'Role'], [['Spermatogonia (male germ cells)', 'Lining the seminiferous tubules', 'Divide to form sperms'], ['Sertoli cells', 'Inside the tubules', 'Nourish the developing germ cells'], ['Interstitial (Leydig) cells', 'Spaces outside the tubules', 'Make androgens, mainly testosterone'], ['Other interstitial cells', 'Same spaces', 'Immunologically competent cells; blood vessels nearby']], 'Table of cells of the testis: spermatogonia, Sertoli cells and interstitial cells, with where they lie and their roles'),
      n: 'The testis is a factory with two departments. Inside the seminiferous tubules, germ cells are turned into sperms, helped and fed by the Sertoli cells. In the spaces between the tubules, the interstitial or Leydig cells make male hormones called androgens. The scrotum keeps the factory a little cooler than the rest of the body, which sperm production requires.',
    }),
    sl('example', 'Worked example 1: how many seminiferous tubules?', {
      b: 'A testis has about 250 lobules, each with one to three seminiferous tubules. What is the possible range of tubules in one testis, and in both testes together?',
      ul: [
        r`Step 1 — Fewest tubules in one testis: $250 \times 1 = ${TUB1.min}$.`,
        r`Step 2 — Most tubules in one testis: $250 \times 3 = ${TUB1.max}$.`,
        r`Step 3 — Two testes: from $2 \times ${TUB1.min} = ${TUB2.min}$ to $2 \times ${TUB1.max} = ${TUB2.max}$.`,
        'Conclusion — hundreds of tightly coiled tubules give a huge surface for sperm production.',
      ],
      v: table(['', 'Minimum', 'Maximum'], [['One testis', String(TUB1.min), String(TUB1.max)], ['Both testes', String(TUB2.min), String(TUB2.max)]], `Worked table: ${TUB1.min} to ${TUB1.max} tubules in one testis and ${TUB2.min} to ${TUB2.max} in both`),
      n: 'Multiply the number of lobules by the smallest and largest number of tubules in each. One testis has between two hundred and fifty and seven hundred and fifty tubules; two testes have between five hundred and fifteen hundred. All of them are tightly coiled, so a huge length of tubule fits in a small organ.',
    }),
    sl('concept', 'The duct system', {
      b: 'Sperms leave the testis through a chain of ducts and reach the outside through the **urethra**, which opens at the **urethral meatus**.',
      v: flow('LR', [['s', 'Seminiferous tubules'], ['rt', 'Rete testis'], ['ve', 'Vasa efferentia'], ['e', 'Epididymis'], ['vd', 'Vas deferens'], ['ej', 'Ejaculatory duct'], ['u', 'Urethra'], ['m', 'Urethral meatus']], [['s', 'rt'], ['rt', 've'], ['ve', 'e'], ['e', 'vd'], ['vd', 'ej', 'joined by the seminal vesicle duct'], ['ej', 'u'], ['u', 'm']], 'Flow of the male duct system from the seminiferous tubules to the urethral meatus'),
      n: 'Memorise this route as a chain. Seminiferous tubules open into the rete testis, then the vasa efferentia lead into the epididymis on the back of the testis. The vas deferens carries sperms up into the abdomen, joins the duct of the seminal vesicle to form the ejaculatory duct, and this opens into the urethra, which carries sperms to the outside.',
    }),
    sl('check', 'Quick check: the order of the ducts', {
      b: 'Which sequence shows the correct path of sperms?',
      n: 'Quick check. Start inside the testis and move outwards one duct at a time.',
      chk: 'duct-order-mcq',
    }),
    sl('concept', 'Accessory glands and semen', {
      b: 'The secretions of the accessory glands form the **seminal plasma**, which is rich in **fructose, calcium** and certain **enzymes**. Sperms together with seminal plasma make up **semen**.',
      v: table(['Gland', 'Number', 'Contribution'], [['Seminal vesicles', 'A pair', 'Part of seminal plasma (fructose is an energy source for sperms)'], ['Prostate', 'One', 'Part of seminal plasma'], ['Bulbourethral glands', 'A pair', 'Secretion that helps lubricate the penis']], 'Table of the male accessory glands, their number and their contributions'),
      n: 'Sperms cannot travel or survive on their own. The seminal vesicles, the prostate and the bulbourethral glands add fluids that carry them and feed them. Fructose in seminal plasma is the fuel for the sperm’s swimming. The penis is the external organ, with a sensitive tip called the glans penis covered by the foreskin.',
    }),
    sl('diagram', 'The female reproductive system', {
      b: 'It has a pair of **ovaries**, a pair of **oviducts**, the **uterus**, the **cervix**, the **vagina** and the external genitalia, together with a pair of **mammary glands**.',
      v: V.female,
      n: 'Each ovary lies close to the funnel-shaped end of an oviduct. The oviduct leads into the uterus, a hollow muscular organ shaped like an inverted pear. The narrow lower part of the uterus is the cervix, which opens into the vagina. The cervical canal and the vagina together form the birth canal.',
    }),
    sl('concept', 'Ovaries and oviducts', {
      b: 'The **ovaries** are the primary female sex organs; they produce the **ovum** and **ovarian hormones**. Each **oviduct** (fallopian tube) has three parts.',
      v: table(['Structure', 'Key facts'], [['Ovary', 'About 2–4 cm long; connected to the pelvic wall and uterus by ligaments; stroma has an outer cortex and an inner medulla'], ['Infundibulum', 'Funnel-shaped part near the ovary, with finger-like fimbriae that help collect the ovum after ovulation'], ['Ampulla', 'Wider middle part'], ['Isthmus', 'Last, narrow part that joins the uterus'], ['Oviduct length', 'About 10–12 cm']], 'Table of key facts about the ovary and the three parts of the oviduct'),
      n: 'The ovary is small, only two to four centimetres long, but it does two jobs: it releases the ovum and makes hormones. The oviduct starts as the infundibulum, a funnel with finger-like fimbriae that sweep the released ovum inside. Then comes the wider ampulla and finally the narrow isthmus, which joins the uterus.',
    }),
    sl('concept', 'The uterus and its wall', {
      b: 'The **uterus** (womb) is single, shaped like an inverted pear, and held by ligaments to the pelvic wall. Its wall has **three layers**.',
      v: table(['Layer', 'Description', 'Role'], [['Perimetrium', 'Outer thin membrane', 'Covering'], ['Myometrium', 'Thick middle layer of smooth muscle', 'Strong contractions during delivery of the baby'], ['Endometrium', 'Inner glandular layer lining the cavity', 'Changes in every menstrual cycle; receives the embryo']], 'Table of the three layers of the uterine wall with their description and role'),
      n: 'Remember the layers from outside in: perimetrium, myometrium, endometrium. The myometrium is thick smooth muscle, and it produces the powerful contractions of childbirth. The endometrium is the living inner lining. It thickens and breaks down in each menstrual cycle, and it is where the embryo implants if fertilisation happens.',
    }),
    sl('example', 'Worked example 2: where does each event happen?', {
      b: 'Name the part of the female reproductive system where each event takes place.',
      ul: [
        'Release of the secondary oocyte → **ovary** (ovulation).',
        'Collection of the oocyte → **infundibulum**, helped by the fimbriae.',
        'Fertilisation → **ampulla** (the ampullary–isthmic junction).',
        'Implantation of the blastocyst → **endometrium** of the uterus.',
        'Passage of the baby at birth → **cervical canal and vagina** (birth canal).',
      ],
      v: table(['Event', 'Place'], [['Ovulation', 'Ovary'], ['Collection of the oocyte', 'Infundibulum (fimbriae)'], ['Fertilisation', 'Ampulla'], ['Implantation', 'Endometrium'], ['Birth', 'Cervical canal and vagina']], 'Worked table of five events and where each takes place in the female reproductive system'),
      n: 'Location questions are common and easy to lose marks on. Fertilisation happens in the oviduct, in the ampulla region, not in the uterus. The uterus is where the young embryo implants and grows. And the cervical canal together with the vagina forms the birth canal through which the baby passes.',
    }),
    sl('check', 'Quick check: which layer pushes?', {
      b: 'Which layer of the uterine wall produces strong contractions during the delivery of a baby?',
      n: 'Quick check. Think about which layer is made of muscle.',
      chk: 'myometrium-mcq',
    }),
    sl('concept', 'External genitalia and mammary glands', {
      b: 'The female external genitalia include the **mons pubis**, **labia majora**, **labia minora**, **hymen** and **clitoris**. The hymen may be torn by many everyday activities, so its presence or absence is **not** a reliable indicator of anything. The **mammary glands** are paired structures that contain glandular tissue and fat.',
      v: flow('LR', [['a', 'Alveoli (milk secreted)'], ['t', 'Mammary tubules'], ['d', 'Mammary duct'], ['am', 'Mammary ampulla'], ['l', 'Lactiferous duct (milk sucked out)']], [['a', 't'], ['t', 'd'], ['d', 'am'], ['am', 'l']], 'Flow of milk from alveoli through mammary tubules, ducts and ampulla to the lactiferous duct'),
      n: 'Each mammary gland has fifteen to twenty mammary lobes, with clusters of cells called alveoli that secrete milk. Milk is stored in the cavities of the alveoli, then flows through mammary tubules into ducts, which join to form a wider mammary ampulla connected to the lactiferous duct, through which the baby sucks out milk.',
    }),
    sl('check', 'Quick check: where is milk made?', {
      b: 'In the mammary gland, milk is secreted by the cells of the',
      n: 'Quick check. Go back to the start of the milk pathway.',
      chk: 'alveoli-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Testes in the scrotum (2–2.5 °C cooler); about 250 lobules, each with 1–3 seminiferous tubules; spermatogonia and Sertoli cells inside, Leydig cells (androgens) outside.',
        'Ducts: rete testis → vasa efferentia → epididymis → vas deferens → ejaculatory duct → urethra → urethral meatus.',
        'Accessory glands: seminal vesicles, prostate, bulbourethral glands; seminal plasma rich in fructose, calcium and enzymes.',
        'Ovary (2–4 cm); oviduct: infundibulum with fimbriae, ampulla, isthmus; uterus: perimetrium, myometrium, endometrium; cervix + vagina = birth canal.',
        'Mammary gland: alveoli → tubules → duct → ampulla → lactiferous duct.',
      ],
      v: table(['', 'Male', 'Female'], [['Primary sex organ', 'Testis', 'Ovary'], ['Gamete', 'Sperm', 'Ovum'], ['Main hormone-producing cells', 'Leydig cells (androgens)', 'Ovary (estrogen, progesterone)'], ['Duct to the outside', 'Urethra', 'Oviduct, uterus, vagina']], 'Summary table comparing the male and female systems'),
      n: 'Let us recap. In males, testes make sperms and androgens, ducts carry the sperms, and glands add seminal plasma. In females, ovaries release the ovum and make hormones, the oviduct collects it, the uterus houses the embryo, and the mammary glands later feed the baby. Next, we look inside the testis and ovary at how gametes are made.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Draw both systems as **front-view schematics** with neat label lines; examiners want the parts, not artistic detail.',
        'Write the male duct sequence in the **correct order** — a common 2-mark question.',
        'Name all **three parts of the oviduct** and **three layers of the uterus**.',
        'Fertilisation is in the **ampulla**, implantation in the **endometrium**.',
      ],
      n: 'Exam tips. Practise both diagrams until you can label them quickly. Learn the duct sequence as a chain without gaps. Name all three parts of the oviduct and all three layers of the uterine wall, and never write that fertilisation happens in the uterus.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Human Reproduction — Part 2: Gametogenesis and the menstrual cycle',
  goals: [
    'Describe spermatogenesis and its hormonal control, and the structure of a sperm',
    'Describe oogenesis and follicle development',
    'Compare spermatogenesis and oogenesis',
    'Explain the phases and hormonal control of the menstrual cycle',
  ],
  slides: [
    sl('title', 'Gametogenesis and the menstrual cycle', {
      b: 'Part 2 — how the testis makes sperms, how the ovary prepares an ovum, and how the uterus prepares every month for a possible pregnancy.',
      v: flow('LR', [['t', 'Testis: spermatogenesis'], ['o', 'Ovary: oogenesis'], ['h', 'Pituitary and ovarian hormones'], ['m', 'Menstrual cycle']], [['h', 't'], ['h', 'o'], ['o', 'm']], 'Flow showing hormones controlling spermatogenesis, oogenesis and the menstrual cycle'),
      n: 'Gametes are made by gametogenesis: spermatogenesis in the testis and oogenesis in the ovary. Both use meiosis, so the gametes are haploid. Both are controlled by hormones from the pituitary gland and the gonads. In women these hormones also drive a monthly cycle in the ovary and uterus, called the menstrual cycle.',
    }),
    sl('diagram', 'Inside a seminiferous tubule', {
      b: 'Sperm production runs from the **wall** of the tubule towards the **lumen**: spermatogonia at the wall, then spermatocytes and spermatids, and sperms released into the lumen. **Sertoli cells** support them; **Leydig cells** lie outside.',
      v: V.tubule,
      n: 'In this cross-section, the youngest cells, the spermatogonia, sit against the wall. As cells mature, they move inwards. Primary spermatocytes, secondary spermatocytes and spermatids form rings closer to the centre, and finished sperms with tails appear in the lumen. Outside the tubule, Leydig cells make testosterone.',
    }),
    sl('concept', 'Spermatogenesis', {
      b: 'Spermatogenesis begins at **puberty**. Diploid **spermatogonia** multiply by mitosis; some become **primary spermatocytes**, which undergo **meiosis**.',
      v: flow('TB', [['g', 'Spermatogonium (46 chromosomes)'], ['p', 'Primary spermatocyte (46)'], ['s', 'Two secondary spermatocytes (23 each)'], ['t', 'Four spermatids (23 each)'], ['z', 'Four sperms (spermatozoa)']], [['g', 'p', 'growth'], ['p', 's', 'meiosis I'], ['s', 't', 'meiosis II'], ['t', 'z', 'spermiogenesis']], 'Flow of spermatogenesis from spermatogonium through primary and secondary spermatocytes and spermatids to sperms, with chromosome numbers'),
      n: 'Follow the chromosome numbers. A spermatogonium and a primary spermatocyte both have forty-six. The first meiotic division gives two secondary spermatocytes with twenty-three each. The second division gives four spermatids, still with twenty-three. The spermatids are then remodelled into sperms; this is spermiogenesis. Finally, sperms are released into the lumen; this release is spermiation.',
    }),
    sl('concept', 'Hormones that drive spermatogenesis', {
      b: 'At puberty, the **hypothalamus** increases its secretion of **GnRH**, which stimulates the anterior pituitary to release two **gonadotropins**.',
      v: flow('LR', [['h', 'Hypothalamus: GnRH'], ['p', 'Anterior pituitary'], ['l', 'LH → Leydig cells'], ['a', 'Androgens: stimulate spermatogenesis'], ['f', 'FSH → Sertoli cells'], ['s', 'Factors that help spermiogenesis']], [['h', 'p'], ['p', 'l'], ['l', 'a'], ['p', 'f'], ['f', 's']], 'Flow of hormonal control: GnRH acts on the pituitary; LH acts on Leydig cells to release androgens; FSH acts on Sertoli cells'),
      n: 'Two pituitary hormones share the work. Luteinising hormone acts on the Leydig cells, which respond by making androgens, and androgens stimulate sperm production. Follicle stimulating hormone acts on the Sertoli cells and helps them release factors needed for spermiogenesis. Both are switched on by gonadotropin releasing hormone from the hypothalamus at puberty.',
    }),
    sl('diagram', 'Structure of a sperm', {
      b: 'A sperm is a microscopic structure with a **head**, **neck**, **middle piece** and **tail**, covered by a plasma membrane. The head holds the haploid **nucleus** and a cap-like **acrosome** filled with enzymes that help it penetrate the ovum. The middle piece has many **mitochondria**, which supply energy for the tail to move.',
      v: V.sperm,
      n: 'Each part of the sperm has one clear job. The acrosome carries enzymes to get through the layers around the ovum. The nucleus carries the father’s chromosomes. The middle piece is the power station, full of mitochondria. And the tail lashes to move the sperm, which is essential for it to reach the ovum.',
    }),
    sl('example', 'Worked example 1: counting gametes and chromosomes', {
      b: `A sample of testis tissue contains ${SG.primary} primary spermatocytes, all completing meiosis. How many secondary spermatocytes, spermatids and sperms will form, and how many chromosomes does each type of cell carry?`,
      ul: [
        r`Step 1 — Meiosis I: each primary spermatocyte gives 2 secondary spermatocytes: $${SG.primary} \times 2 = ${SG.secondary}$.`,
        r`Step 2 — Meiosis II: each secondary spermatocyte gives 2 spermatids: $${SG.secondary} \times 2 = ${SG.spermatids}$.`,
        `Step 3 — Each spermatid becomes one sperm: **${SG.sperms} sperms**.`,
        `Chromosomes — primary spermatocyte ${HUMAN.diploid}; secondary spermatocyte, spermatid and sperm ${HUMAN.haploid} each.`,
      ],
      v: table(['Cell', 'Number', 'Chromosomes'], [['Primary spermatocytes', String(SG.primary), String(HUMAN.diploid)], ['Secondary spermatocytes', String(SG.secondary), String(HUMAN.haploid)], ['Spermatids', String(SG.spermatids), String(HUMAN.haploid)], ['Sperms', String(SG.sperms), String(HUMAN.haploid)]], `Worked table: ${SG.primary} primary spermatocytes give ${SG.secondary} secondary spermatocytes, ${SG.spermatids} spermatids and ${SG.sperms} sperms`),
      n: 'Each meiotic division doubles the number of cells, so fifty primary spermatocytes give one hundred secondary spermatocytes and then two hundred spermatids, which become two hundred sperms. The chromosome number halves at the first meiotic division, from forty-six to twenty-three, and then stays at twenty-three. Compare this with oogenesis next: fifty primary oocytes give only fifty ova.',
    }),
    sl('check', 'Quick check: the secondary spermatocyte', {
      b: 'How many chromosomes does a human secondary spermatocyte have?',
      n: 'Quick check. Has the first meiotic division happened yet?',
      chk: 'sec-spermatocyte-mcq',
    }),
    sl('concept', 'Oogenesis begins before birth', {
      b: 'Oogenesis starts during **embryonic development**. Millions of **oogonia** form in each foetal ovary; **no more** are added after birth. They start meiosis and stop at prophase of the first division as **primary oocytes**.',
      v: flow('LR', [['g', 'Oogonia (foetal ovary)'], ['p', 'Primary oocytes: meiosis I paused'], ['f', 'Primary follicles (with granulosa cells)'], ['d', 'Many degenerate before puberty'], ['l', 'About 60 000 to 80 000 per ovary at puberty']], [['g', 'p'], ['p', 'f'], ['f', 'd'], ['d', 'l']], 'Flow of early oogenesis from oogonia in the foetal ovary to primary follicles, with many degenerating before puberty'),
      n: 'This is a striking difference from males. A baby girl is born with all the egg-forming cells she will ever have, already started on meiosis and paused. Each primary oocyte gets wrapped in a layer of granulosa cells, forming a primary follicle. Many follicles die away during childhood, leaving roughly sixty to eighty thousand in each ovary at puberty.',
    }),
    sl('diagram', 'Follicles in the ovary', {
      b: 'Primary follicles gain more layers of granulosa cells and a new **theca**, becoming **secondary follicles**. A fluid-filled cavity, the **antrum**, then forms in the **tertiary follicle**, which grows into a mature **Graafian follicle**.',
      v: V.ovary,
      n: 'In this drawing all the stages are shown together so you can compare them. The primary follicle has one layer of cells around the oocyte. The secondary follicle has many layers. The tertiary follicle has a fluid-filled space called the antrum. The mature Graafian follicle bursts at ovulation, and what remains becomes the corpus luteum.',
    }),
    sl('concept', 'Completing meiosis: oocyte and polar bodies', {
      b: 'In the tertiary follicle, the primary oocyte **completes meiosis I** with an **unequal** division: a large haploid **secondary oocyte** and a tiny **first polar body**. The secondary oocyte keeps most of the nutrient-rich cytoplasm and forms a new membrane, the **zona pellucida**. At **ovulation**, the Graafian follicle ruptures and releases the secondary oocyte.',
      v: flow('LR', [['p', 'Primary oocyte (46)'], ['s', 'Secondary oocyte (23) + first polar body'], ['g', 'Graafian follicle'], ['o', 'Ovulation: secondary oocyte released'], ['m', 'Meiosis II completed only after a sperm enters']], [['p', 's', 'meiosis I, unequal'], ['s', 'g'], ['g', 'o'], ['o', 'm']], 'Flow of later oogenesis: unequal meiosis I, Graafian follicle, ovulation, and completion of meiosis II after sperm entry'),
      n: 'Why is the division unequal? The future ovum must carry enough cytoplasm and food for the embryo’s first days, so almost all of it stays in one cell. The small polar body gets just a set of chromosomes. Note that what leaves the ovary at ovulation is a secondary oocyte; its second meiotic division is completed only when a sperm enters it.',
    }),
    sl('concept', 'Spermatogenesis and oogenesis compared', {
      b: 'Both make haploid gametes by meiosis, but the timing and output are very different.',
      v: table(['Feature', 'Spermatogenesis', 'Oogenesis'], [['Starts', 'At puberty', 'Before birth'], ['Continues', 'Throughout life, into old age', 'Until about 50 years (menopause)'], ['Gametes per meiocyte', 'Four sperms', 'One ovum; the rest go into polar bodies'], ['Divisions', 'Equal', 'Unequal cytoplasm'], ['Gamete released', 'Sperm, after spermiogenesis', 'Secondary oocyte, about one per cycle']], 'Table comparing spermatogenesis and oogenesis by start, duration, output, divisions and the gamete released'),
      n: 'Put the two side by side. Sperm production starts at puberty and continues for life, and each primary spermatocyte gives four sperms. Egg production starts before birth, pauses for years, and each primary oocyte yields just one ovum, with the other products being small polar bodies. Usually only one secondary oocyte is released per menstrual cycle.',
    }),
    sl('check', 'Quick check: when does oogenesis begin?', {
      b: 'When are the oogonia of a woman formed?',
      n: 'Quick check. Think about when the ovary first develops.',
      chk: 'oogonia-mcq',
    }),
    sl('concept', 'The menstrual cycle', {
      b: 'The reproductive cycle of female primates is the **menstrual cycle**. The first one, at puberty, is **menarche**. In women it repeats roughly every **28 or 29 days** and stops at about 50 years (**menopause**). One ovum is usually released in the middle of each cycle.',
      v: table(['Phase', 'Days (28-day cycle)', 'Main events'], [['Menstrual', '1 to about 5', 'Endometrium and its blood vessels break down and flow out'], ['Follicular (proliferative)', 'About 5 to 13', 'Follicles grow; endometrium regenerates'], ['Ovulation', 'About 14', 'LH surge; Graafian follicle releases the secondary oocyte'], ['Luteal (secretory)', '15 to 28', 'Corpus luteum secretes progesterone; endometrium maintained']], 'Table of the four phases of a 28-day menstrual cycle with days and main events'),
      n: 'The cycle is counted from the first day of menstrual flow. For about three to five days the endometrium breaks down and flows out. Then follicles grow and the lining rebuilds. Around day fourteen an ovum is released. For the rest of the cycle the corpus luteum keeps the lining ready. If no pregnancy follows, the cycle starts again.',
    }),
    sl('diagram', 'Hormones across the cycle', {
      b: 'Pituitary hormones (**LH, FSH**) and ovarian hormones (**estrogen, progesterone**) rise and fall in a coordinated pattern. The diagram is qualitative.',
      v: V.cycle,
      n: 'Read the diagram from left to right. In the follicular phase, estrogen from the growing follicles rises. Near the middle, LH and FSH reach their peak; the sharp LH surge triggers ovulation. Afterwards, progesterone from the corpus luteum climbs and stays high. At the end, progesterone falls, and the endometrium breaks down again.',
    }),
    sl('concept', 'What controls each phase', {
      b: 'The **corpus luteum** is the key to the second half of the cycle.',
      v: flow('TB', [['g', 'LH and FSH rise: follicles grow, estrogen rises'], ['e', 'Estrogen: endometrium regenerates'], ['s', 'LH surge at mid-cycle: ovulation'], ['c', 'Corpus luteum: progesterone maintains the endometrium'], ['n', 'No fertilisation: corpus luteum degenerates, progesterone falls'], ['m', 'Menstruation: new cycle'], ['f', 'Fertilisation: corpus luteum stays, no menstruation']], [['g', 'e'], ['e', 's'], ['s', 'c'], ['c', 'n'], ['n', 'm'], ['c', 'f']], 'Flow of hormonal control: follicle growth and estrogen, LH surge and ovulation, corpus luteum and progesterone, then menstruation or pregnancy'),
      n: 'Progesterone is the hormone that keeps the endometrium ready for implantation. It comes from the corpus luteum. If no fertilisation happens, the corpus luteum breaks down, progesterone falls and the lining is shed. If fertilisation does happen, the corpus luteum is maintained, so menstruation stops. That is why missed periods can be a sign of pregnancy, though stress and poor health can also cause them.',
    }),
    sl('example', 'Worked example 2: reading a 28-day cycle', {
      b: 'In a regular 28-day cycle, name the phase, a hormone that is high, and the state of the endometrium on days 3, 10, 14 and 22.',
      ul: [
        'Day 3 → **menstrual** phase; progesterone has fallen; the endometrium is breaking down.',
        'Day 10 → **follicular** phase; **estrogen** rising from growing follicles; the endometrium is regenerating.',
        'Day 14 → **ovulation**; **LH** at its peak (with FSH); the endometrium is thick.',
        'Day 22 → **luteal** phase; **progesterone** high from the corpus luteum; the endometrium is maintained and glandular.',
      ],
      v: table(['Day', 'Phase', 'High hormone', 'Endometrium'], [['3', 'Menstrual', 'Low ovarian hormones', 'Breaking down'], ['10', 'Follicular', 'Estrogen', 'Regenerating'], ['14', 'Ovulation', 'LH surge', 'Thick'], ['22', 'Luteal', 'Progesterone', 'Maintained, glandular']], 'Worked table of phase, high hormone and endometrium state on days 3, 10, 14 and 22 of a 28-day cycle'),
      n: 'For each day, first find the phase, then ask which gland is most active. In the follicular phase it is the growing follicles, making estrogen. At mid-cycle, the pituitary releases its LH surge. In the luteal phase it is the corpus luteum, making progesterone. The state of the endometrium follows from these hormones.',
    }),
    sl('check', 'Quick check: the corpus luteum', {
      b: 'Judge the assertion and the reason about the luteal phase.',
      n: 'Quick check. Recall what the corpus luteum makes and what that hormone does.',
      chk: 'luteal-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Spermatogenesis: spermatogonium → primary spermatocyte (46) → two secondary spermatocytes (23) → four spermatids → four sperms (spermiogenesis); release = spermiation.',
        'GnRH → LH (Leydig cells → androgens) and FSH (Sertoli cells → spermiogenesis factors).',
        'Sperm: acrosome + nucleus (head), neck, middle piece (mitochondria), tail.',
        'Oogenesis starts before birth; primary oocytes pause in meiosis I; follicles: primary → secondary → tertiary (antrum) → Graafian; unequal division gives secondary oocyte + polar body; ovulation releases the secondary oocyte.',
        'Menstrual cycle (about 28 days): menstrual, follicular, ovulation (LH surge), luteal (progesterone from the corpus luteum).',
      ],
      v: table(['Hormone', 'Source', 'Main role in the cycle'], [['FSH, LH', 'Anterior pituitary', 'Follicle growth; LH surge causes ovulation'], ['Estrogen', 'Growing follicles', 'Regenerates the endometrium'], ['Progesterone', 'Corpus luteum', 'Maintains the endometrium']], 'Summary table of the hormones of the menstrual cycle with source and role'),
      n: 'To recap: sperms are made continuously from puberty, four from each primary spermatocyte. Ova are prepared from cells formed before birth, one at a time, with polar bodies taking the spare chromosomes. The menstrual cycle links the ovary and uterus through hormones, with the LH surge causing ovulation and progesterone keeping the lining ready.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Draw spermatogenesis and oogenesis as **flow charts with ploidy** (46 or 23) at each stage.',
        'Say that the gamete released at ovulation is a **secondary oocyte**.',
        'Name the **LH surge** as the cause of ovulation and the **corpus luteum** as the source of progesterone.',
        'Do not call the follicular phase "secretory"; it is **proliferative**. The luteal phase is **secretory**.',
      ],
      n: 'Exam tips. Write chromosome numbers on every arrow of your gametogenesis charts. Say secondary oocyte, not mature ovum, for what is released at ovulation. Link the LH surge to ovulation and the corpus luteum to progesterone. And keep the two names straight: follicular is proliferative, luteal is secretory.',
    }),
  ],
});

export const deck3 = deck({
  part: 3,
  title: 'Human Reproduction — Part 3: Fertilisation to birth',
  goals: [
    'Describe fertilisation and how the sex of the baby is decided',
    'Trace cleavage, blastocyst formation and implantation',
    'Explain the structure and functions of the placenta, and the stages of foetal development',
    'Explain parturition and lactation',
  ],
  slides: [
    sl('title', 'Fertilisation to birth', {
      b: 'Part 3 — from the meeting of sperm and ovum to the birth of a baby and breastfeeding.',
      v: flow('LR', [['f', 'Fertilisation in the ampulla'], ['c', 'Cleavage and blastocyst'], ['i', 'Implantation'], ['p', 'Placenta and pregnancy'], ['b', 'Parturition'], ['l', 'Lactation']], [['f', 'c'], ['c', 'i'], ['i', 'p'], ['p', 'b'], ['b', 'l']], 'Flow from fertilisation to cleavage, implantation, placenta and pregnancy, parturition and lactation'),
      n: 'In this part we follow a single cell, the zygote, as it divides, travels down the oviduct, settles into the uterus and grows into a baby over about nine months. We will also see how the mother’s body prepares for birth and for feeding the newborn.',
    }),
    sl('concept', 'Fertilisation', {
      b: 'During **insemination**, sperms are released into the vagina. Motile sperms swim through the cervix and uterus into the oviduct. The ovum released from the ovary is also carried into the oviduct. **Fertilisation** can happen only if the ovum and sperms reach the **ampullary region** together.',
      v: flow('LR', [['s', 'Sperm contacts the zona pellucida'], ['b', 'Changes in the membrane block other sperms'], ['a', 'Acrosome enzymes help the sperm enter'], ['m', 'Secondary oocyte completes meiosis II: ovum + second polar body'], ['z', 'Haploid nuclei fuse: diploid zygote']], [['s', 'b'], ['b', 'a'], ['a', 'm'], ['m', 'z']], 'Flow of fertilisation: sperm contact, block to other sperms, entry, completion of meiosis II and fusion to form the zygote'),
      n: 'Only a few sperms reach the ampulla, and timing matters: this is why not every insemination leads to fertilisation. When a sperm contacts the zona pellucida, the membrane changes so that no other sperm can enter. The acrosome’s enzymes help the sperm in. Its entry triggers the oocyte to finish meiosis, and then the two haploid nuclei fuse into a diploid zygote.',
    }),
    sl('concept', 'Who decides the sex of the baby?', {
      b: 'Women have **XX** sex chromosomes and men **XY**. Every ovum carries an **X**. Half the sperms carry an **X** and half carry a **Y**. The sex of the baby is therefore decided by the **sperm**, that is, by the father.',
      v: table(['Sperm carries', 'Ovum carries', 'Zygote', 'Baby'], [['X', 'X', 'XX', 'Female'], ['Y', 'X', 'XY', 'Male']], 'Table showing that an X-bearing sperm gives a female zygote and a Y-bearing sperm gives a male zygote'),
      n: 'All eggs carry an X chromosome, so the mother always passes on an X. The father’s sperm may carry an X or a Y. If an X-bearing sperm fertilises the ovum, the baby is a girl; if a Y-bearing sperm does, the baby is a boy. So it is scientifically wrong, and unjust, to blame a mother for the sex of her child.',
    }),
    sl('example', 'Worked example 1: chance of a girl or a boy', {
      b: 'In each pregnancy, X-bearing and Y-bearing sperms are equally likely to fertilise the ovum. What is the probability that (a) the next baby is a girl, and (b) both of a couple’s two children are girls?',
      ul: [
        r`Step 1 — Half the sperms carry X, so P(girl) $= \dfrac{1}{2}$ in every pregnancy, whatever happened before.`,
        r`Step 2 — Two independent pregnancies: P(both girls) $= \dfrac{1}{2} \times \dfrac{1}{2} = ${P2}$.`,
        'Conclusion — earlier births do not change the chance for the next one.',
      ],
      v: table(['Children', 'Girl–girl', 'Girl–boy', 'Boy–girl', 'Boy–boy'], [['Probability', '1/4', '1/4', '1/4', '1/4']], 'Worked table: each of the four orders of two children has probability one quarter'),
      n: 'Each pregnancy is like a fresh coin toss decided by the sperm. The chance of a girl is one half every time, even if a family already has several girls. For two children, there are four equally likely orders, so the chance that both are girls is one quarter, the same as the chance that both are boys.',
    }),
    sl('check', 'Quick check: sex chromosomes', {
      b: 'A zygote formed by an ovum and a Y-bearing sperm will develop into a',
      n: 'Quick check. Combine the chromosome from the ovum with the one from the sperm.',
      chk: 'xy-mcq',
    }),
    sl('diagram', 'From the oviduct to the uterus', {
      b: 'As the zygote moves through the **isthmus** towards the uterus, it divides by mitosis (**cleavage**) into 2, 4, 8 and 16 daughter cells called **blastomeres**. The embryo with 8 to 16 blastomeres is a **morula**.',
      v: V.journey,
      n: 'Cleavage divisions are fast and the embryo does not grow in size; it simply splits into smaller and smaller cells. By the time it reaches the uterus, it has become a solid ball called a morula. The morula keeps dividing and turns into a hollow ball, the blastocyst, which is the stage that implants.',
    }),
    sl('diagram', 'The blastocyst and implantation', {
      b: 'In the **blastocyst**, the outer layer of cells is the **trophoblast** and the cells attached to it inside form the **inner cell mass**. The trophoblast attaches to the **endometrium**; the uterine cells divide rapidly and cover the blastocyst, which becomes embedded: **implantation**. The inner cell mass becomes the **embryo**.',
      v: V.blastocyst,
      n: 'Think of the blastocyst as having two teams. The trophoblast is the outer team that anchors the embryo to the uterus and helps form the placenta. The inner cell mass is the team that becomes the baby. After the trophoblast attaches, the endometrium grows over the blastocyst and it is fully embedded. Pregnancy has now begun.',
    }),
    sl('check', 'Quick check: which part becomes the baby?', {
      b: 'Which part of the blastocyst develops into the embryo?',
      n: 'Quick check. One part attaches to the uterus; the other forms the body.',
      chk: 'icm-mcq',
    }),
    sl('concept', 'The placenta', {
      b: 'After implantation, finger-like **chorionic villi** grow from the trophoblast and interlock with uterine tissue, forming the **placenta**, a structural and functional unit between embryo and mother. It is joined to the embryo by the **umbilical cord**, which carries substances to and from the embryo.',
      v: table(['Function', 'How'], [['Supply', 'Oxygen and nutrients pass from the mother’s blood to the embryo'], ['Removal', 'Carbon dioxide and excretory wastes pass from the embryo to the mother'], ['Hormones', 'Makes human chorionic gonadotropin, human placental lactogen, estrogens and progestogens']], 'Table of the functions of the placenta: supply, removal and hormone production'),
      n: 'The placenta is a remarkable shared organ. The mother’s blood and the baby’s blood come very close in the villi, close enough for oxygen and food to cross one way and carbon dioxide and wastes the other way. The umbilical cord is the cable connecting the placenta to the baby. The placenta also works as a hormone gland.',
    }),
    sl('concept', 'Hormones of pregnancy', {
      b: 'During pregnancy, several hormone levels rise in the mother’s blood. They support the growth of the foetus, changes in the mother’s metabolism, and the maintenance of pregnancy.',
      v: table(['Hormone', 'Source', 'Note'], [['hCG, hPL', 'Placenta', 'Made only during pregnancy'], ['Estrogens, progestogens', 'Placenta (and ovary)', 'Maintain the endometrium and pregnancy'], ['Relaxin', 'Ovary, in later pregnancy', 'Helps prepare for birth'], ['Cortisol, prolactin, thyroxine', 'Other glands', 'Levels also rise in the mother’s blood']], 'Table of pregnancy hormones with their sources'),
      n: 'Two hormones, human chorionic gonadotropin and human placental lactogen, are made only during pregnancy, by the placenta. Their presence is the basis of pregnancy tests. Estrogens and progestogens keep the pregnancy going. Relaxin, from the ovary late in pregnancy, helps prepare for birth, and several other maternal hormones also rise.',
    }),
    sl('concept', 'Germ layers and stem cells', {
      b: 'Soon after implantation, the inner cell mass differentiates into three **germ layers**: an outer **ectoderm**, a middle **mesoderm** and an inner **endoderm**. All tissues and organs of adults arise from these. Cells of the inner cell mass are **stem cells**, with the potential to give rise to all tissues and organs.',
      v: flow('LR', [['i', 'Inner cell mass (stem cells)'], ['e', 'Ectoderm'], ['m', 'Mesoderm'], ['n', 'Endoderm'], ['t', 'All tissues and organs']], [['i', 'e'], ['i', 'm'], ['i', 'n'], ['e', 't'], ['m', 't'], ['n', 't']], 'Flow from the inner cell mass to three germ layers, which form all tissues and organs'),
      n: 'Every tissue in your body, from skin to bone to the lining of the gut, can be traced back to one of three germ layers formed in the first weeks. The inner cell mass cells that produce them are stem cells, able to become any tissue. That is why stem cells are so important in medical research.',
    }),
    sl('concept', 'Growth of the foetus', {
      b: 'Human pregnancy lasts about **9 months**. Milestones are usually counted from the start of pregnancy.',
      v: table(['Time', 'Milestone'], [['End of 1st month', 'Heart has formed; its sound can be heard with a stethoscope'], ['End of 2nd month', 'Limbs and digits develop'], ['End of 12 weeks (1st trimester)', 'Most major organ systems formed; limbs and external genital organs well developed'], ['5th month', 'First movements felt; hair appears on the head'], ['End of 24 weeks (2nd trimester)', 'Body covered with fine hair; eyelids separate; eyelashes formed'], ['End of 9 months', 'Foetus fully developed and ready for delivery']], 'Table of milestones of foetal development from the first to the ninth month'),
      n: 'Here is the timeline. By the end of the first month the heart has formed. By the end of the second month the limbs and fingers are developing. By twelve weeks most organ systems are in place. Movements are usually felt in the fifth month. By twenty-four weeks the eyelids have separated. At about nine months the baby is ready to be born.',
    }),
    sl('example', 'Worked example 2: is the sample fertile?', {
      b: `For normal fertility, a semen sample should have at least 60 percent sperms of normal shape and size, and at least 40 percent with vigorous motility. A sample has ${SEM.total} million sperms. How many must be normal in shape, and how many must swim vigorously, at the minimum?`,
      ul: [
        r`Step 1 — Normal shape: $${SEM.total} \times \dfrac{60}{100} = ${SEM.normal}$ million.`,
        r`Step 2 — Vigorous motility: $${SEM.total} \times \dfrac{40}{100} = ${SEM.motile}$ million.`,
        'Step 3 — Why so many? Only a tiny fraction of sperms ever reach the ampulla, and only one fertilises the oocyte.',
      ],
      v: table(['Requirement', 'Percentage', `Out of ${SEM.total} million`], [['Normal shape and size', 'At least 60', `${SEM.normal} million`], ['Vigorous motility', 'At least 40', `${SEM.motile} million`]], `Worked table: of ${SEM.total} million sperms, at least ${SEM.normal} million normal and ${SEM.motile} million vigorously motile`),
      n: 'A typical ejaculate releases two hundred to three hundred million sperms. Take two hundred and fifty million. Sixty percent of that is one hundred and fifty million sperms of normal shape, and forty percent is one hundred million vigorous swimmers. Such large numbers are needed because most sperms never reach the oviduct.',
    }),
    sl('concept', 'Parturition: birth', {
      b: '**Parturition** is induced by a complex **neuroendocrine** mechanism. Signals from the fully developed foetus and the placenta set off mild uterine contractions: the **foetal ejection reflex**.',
      v: flow('LR', [['s', 'Signals from foetus and placenta'], ['c', 'Mild uterine contractions'], ['o', 'Oxytocin released by the mother’s pituitary'], ['x', 'Stronger contractions'], ['b', 'Baby expelled through the birth canal'], ['p', 'Placenta expelled']], [['s', 'c'], ['c', 'o'], ['o', 'x'], ['x', 'o', 'more oxytocin'], ['x', 'b'], ['b', 'p']], 'Flow of parturition: foetal ejection reflex, oxytocin, stronger contractions in a loop, then delivery of the baby and placenta'),
      n: 'Birth is controlled by a loop. The mature foetus and the placenta send signals that cause mild contractions. These trigger the release of oxytocin from the mother’s pituitary. Oxytocin makes the uterine muscle contract harder, which releases still more oxytocin. The loop continues until the baby is pushed out, followed by the placenta.',
    }),
    sl('concept', 'Lactation', {
      b: 'The **mammary glands** change during pregnancy and start producing milk towards the end of pregnancy: **lactation**. The milk produced in the first few days is **colostrum**.',
      v: table(['Milk', 'Feature', 'Benefit'], [['Colostrum (first few days)', 'Contains several antibodies, such as IgA', 'Gives the newborn ready-made protection against infection'], ['Later breast milk', 'Balanced nutrients', 'Supports healthy growth; doctors recommend breastfeeding in the first months']], 'Table of colostrum and later breast milk with features and benefits'),
      n: 'The very first milk, colostrum, looks thick and yellowish and is especially valuable. It carries antibodies that protect the newborn, whose own immune system is not yet ready. This is why doctors strongly encourage breastfeeding from the first day, and through the early months, for a healthy baby.',
    }),
    sl('check', 'Quick check: the birth loop', {
      b: 'Judge the assertion and the reason about oxytocin.',
      n: 'Quick check. Is the assertion true? Is the reason true? Does the reason explain it?',
      chk: 'oxytocin-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Fertilisation in the ampulla; zona pellucida blocks other sperms; meiosis II completes; diploid zygote.',
        'Sex decided by the sperm: X-sperm → girl (XX), Y-sperm → boy (XY); each pregnancy 1/2.',
        'Cleavage → blastomeres → morula (8–16 cells) → blastocyst (trophoblast + inner cell mass) → implantation in the endometrium.',
        'Placenta: chorionic villi + uterine tissue; exchange of gases, food, wastes; hCG, hPL, estrogens, progestogens.',
        'Germ layers from the inner cell mass; about 9 months of gestation.',
        'Parturition: foetal ejection reflex → oxytocin → stronger contractions (positive feedback). Lactation: colostrum with antibodies.',
      ],
      v: table(['Stage', 'Where'], [['Fertilisation', 'Ampulla of the oviduct'], ['Cleavage, morula', 'Isthmus, on the way to the uterus'], ['Implantation', 'Endometrium'], ['Gestation', 'Uterus']], 'Summary table of where each stage of development takes place'),
      n: 'To recap: fertilisation in the ampulla gives a zygote whose sex is decided by the sperm. Cleavage produces a morula and a blastocyst, which implants in the endometrium. The placenta links mother and baby and makes hormones. After about nine months, a positive feedback loop of oxytocin drives birth, and colostrum gives the newborn its first protection.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'State that the **father’s sperm** determines the sex of the baby; explain with XX and XY.',
        'Name **trophoblast** and **inner cell mass** and their fates.',
        'List placental hormones correctly: **hCG, hPL, estrogens, progestogens**; relaxin comes from the **ovary**.',
        'Describe the **foetal ejection reflex** and call the oxytocin loop **positive feedback**.',
        'Name **colostrum** and give its benefit (antibodies such as IgA).',
      ],
      n: 'Final tips. In sex determination answers, show the X and Y sperms clearly. Give the fate of both parts of the blastocyst. Do not list relaxin as a placental hormone in this syllabus; it comes from the ovary. And describe birth as a positive feedback loop driven by oxytocin.',
    }),
  ],
});
