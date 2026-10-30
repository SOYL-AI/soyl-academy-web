// ISC 12 Biology ch06 Sex Determination, Mutation and Genetic Disorders — question bank in ISC style.
// X-linked and autosomal probabilities are computed by calc.mjs. AR keys (ISC options): d a c b.
import { mk, add, r } from '../../isc-12-biology-ch01/src/lib.mjs';
import { xlinked, cross } from './calc.mjs';

const { mcq, ar, fill, num, short, long, part, match } = mk;

// ---------------------------------------------------------------- t01 sex determination
add('birds-mcq', mcq({
  stem: 'In domestic fowl, a hen produces two kinds of eggs with respect to the sex chromosomes while a cock produces only one kind of sperm. Which sex is heterogametic in birds?',
  right: 'The female (ZW)',
  wrong: ['The male (ZW)', 'The male (XY)', 'Neither; birds have XO males'],
  sol: 'Birds show female heterogamety: females ZW, males ZZ — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('grasshopper-mcq', mcq({
  stem: 'A cell from the testis of a grasshopper shows one chromosome fewer than a cell from the ovary of the same species. What explains this?',
  right: 'Males have a single X chromosome and no Y (XX–XO type).',
  wrong: ['Males lose an autosome during development.', 'Females have an extra Y chromosome.', 'Males are haploid, like drone bees.'],
  sol: 'In the XO type, females are XX and males have only one X — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('drone-mcq', mcq({
  stem: 'Why does a male honey bee (drone) have a grandfather but no father?',
  right: 'He develops from an unfertilised egg of the queen, whose own father was a drone.',
  wrong: ['He develops from a fertilised egg, but his father dies.', 'He is produced by budding from a worker.', 'Workers lay all male eggs after mating.'],
  sol: 'Drones arise by parthenogenesis from unfertilised eggs, so they have a mother and a maternal grandfather but no father — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('wife-mcq', mcq({
  stem: 'A couple has three daughters, and relatives blame the wife for not having a son. Which statement is scientifically correct?',
  right: 'The sex of each child was decided by whether an X- or a Y-bearing sperm fertilised the egg.',
  wrong: ['The wife’s eggs must carry only X chromosomes because she is weak.', 'The wife produces Y-bearing eggs that failed.', 'Daughters are born when the mother is older.'],
  sol: 'All eggs carry X; the father’s sperm carries X or Y, so the sperm decides the sex — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('henking-fill', fill({
  stem: 'In 1891, ______ traced a nuclear structure through spermatogenesis in insects and named it the X body.',
  acc: [['Henking']],
  sol: 'Henking.',
  d: 1, c: 'recall', t: [1],
}));
{
  const queen = 32;
  add('drone-num', num({
    stem: 'The body cells of a honey-bee queen have 32 chromosomes. How many chromosomes are present in the body cells of a drone of the same species?',
    value: queen / 2,
    sol: r`A drone develops from an unfertilised (haploid) egg: $\dfrac{32}{2} = ${queen / 2}$.`,
    scheme: [[`${queen / 2}`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 16 || 'value');
}
{
  const pr = (1 / 2) ** 4;
  add('girls-num', num({
    stem: 'A couple plans four children. What is the probability that all four will be girls? Give your answer as a decimal.',
    value: pr, tol: 0.0001,
    sol: r`Each child is a girl with probability $\dfrac{1}{2}$, independently: $\left(\dfrac{1}{2}\right)^4 = ${pr}$.`,
    scheme: [[`${pr}`, 1]],
    d: 3, c: 'application', t: [1],
  }), (q) => q.answer.value === 0.0625 || 'value');
}
add('birds-ar', ar({
  a: 'In birds, the male parent decides the sex of the chick.',
  r: 'Male birds are heterogametic, with ZW sex chromosomes.',
  key: 'd',
  sol: 'In birds the female is ZW (heterogametic) and decides the sex; males are ZZ. Both statements are false — option (d).',
  d: 2, c: 'understanding', t: [1],
}));
add('mitosis-short', short({
  marks: 1,
  stem: 'Give a reason: Drone honey bees produce their sperms by mitosis, not meiosis.',
  model: 'Drones are **haploid**, so their cells cannot undergo a reduction division; mitosis gives **haploid sperms** directly.',
  sol: 'Haploid drones.',
  scheme: [['Drone is haploid; mitosis keeps n', 1]],
  d: 3, c: 'application', t: [1],
}));
add('human-short', short({
  marks: 2,
  stem: 'Using the chromosome formulae 44 + XX and 44 + XY, show why the chance of a human baby being a boy is the same as that of being a girl.',
  model: 'The mother (44 + XX) forms eggs that all carry **22 + X**. The father (44 + XY) forms **two kinds of sperms in equal numbers**: **22 + X** and **22 + Y**. An X sperm with an egg gives **44 + XX (girl)**; a Y sperm gives **44 + XY (boy)**, so each is equally likely (**1 : 1**).',
  sol: 'Gametes and 1 : 1.',
  scheme: [['Eggs all X; sperms X or Y equally', 1], ['XX girl and XY boy in 1 : 1', 1]],
  d: 2, c: 'application', t: [1],
}));
add('birdegg-short', short({
  marks: 2,
  stem: 'A poultry farmer wants more hens. Explain why choosing a particular cock will not change the proportion of hens hatched, and which parent actually determines the sex of the chicks.',
  model: 'In birds the **male is ZZ**, so every sperm carries **Z**; the cock cannot influence the sex. The **hen is ZW** and lays **Z eggs and W eggs** in equal numbers; a Z egg gives a **ZZ male** and a W egg a **ZW female**. So the **hen (egg)** decides the sex.',
  sol: 'Female heterogamety.',
  scheme: [['Cock ZZ: all sperms Z', 1], ['Hen ZW: egg decides sex', 1]],
  d: 3, c: 'application', t: [1],
}));
add('sexsys-short', short({
  marks: 3,
  stem: 'Describe the mechanism of sex determination in (i) grasshopper, (ii) birds and (iii) honey bees.',
  model: '(i) **Grasshopper (XX–XO):** females have **two X** chromosomes; males have **one X** and no Y, so males have one chromosome fewer; **male heterogamety**.\n\n(ii) **Birds (ZW–ZZ):** females are **ZW** and produce two kinds of eggs; males are **ZZ**; **female heterogamety**.\n\n(iii) **Honey bees (haplodiploidy):** a **fertilised** egg develops into a **female** (diploid); an **unfertilised** egg develops into a **male** (drone, haploid) by parthenogenesis.',
  sol: 'Three mechanisms.',
  scheme: [['Grasshopper XO', 1], ['Birds ZW', 1], ['Honey bee haplodiploidy', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('sexdet-long', long({
  stem: '(a) Distinguish between male heterogamety and female heterogamety, with one example of each. [2]\n(b) Explain sex determination in honey bees, and state the chromosome number of a drone if the queen has 32. [2]\n(c) Why is it wrong to blame a mother for giving birth only to daughters? [1]',
  model: '(a) In **male heterogamety** the male produces **two kinds of sperms** with respect to sex chromosomes, e.g. **humans (XX–XY)** or grasshopper (XX–XO). In **female heterogamety** the female produces **two kinds of eggs**, e.g. **birds (ZW female, ZZ male)**.\n\n(b) Honey bees show **haplodiploidy**: **fertilised eggs** develop into **diploid females** (queen and workers) and **unfertilised eggs** develop into **haploid males** (drones) by parthenogenesis. A drone has **16** chromosomes.\n\n(c) All of a mother’s eggs carry **X**; the child’s sex depends on whether an **X- or Y-bearing sperm** from the father fertilises the egg, so the **father’s sperm** decides the sex.',
  sol: 'Heterogamety; haplodiploidy; sperm decides.',
  scheme: [['(a) Male heterogamety with example', 1], ['(a) Female heterogamety with example', 1], ['(b) Haplodiploidy', 1], ['(b) Drone 16', 1], ['(c) Sperm decides', 1]],
  wl: [60, 200],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 sex-linked inheritance
add('fatherson-mcq', mcq({
  stem: 'A colour-blind man marries a woman who is neither colour blind nor a carrier. What is the chance that their son will be colour blind?',
  right: 'Zero, because the father passes his Y, not his X, to his sons',
  wrong: ['One-half, because the father is colour blind', 'One-quarter, as in a monohybrid cross', 'All sons, because the gene is dominant in males'],
  sol: 'Sons receive their X from the mother, who is not a carrier — option (@K).',
  d: 2, c: 'application', t: [2],
}), () => xlinked('XX', 'XhY').affectedSon === 0 || 'value');
add('drosophila-mcq', mcq({
  stem: 'A white-eyed female Drosophila is crossed with a red-eyed male (white eye is X-linked recessive). What will the F1 be?',
  right: 'All females red-eyed and all males white-eyed',
  wrong: ['All flies red-eyed', 'All flies white-eyed', 'Half of each sex red-eyed'],
  sol: 'Daughters get the father’s dominant X (red); sons get the mother’s recessive X (white): criss-cross inheritance — option (@K).',
  d: 3, c: 'application', t: [2],
}), () => { const x = xlinked('XhXh', 'XY'); return (x.affectedSon === 0.5 && x.carrierDaughter === 0.5) || 'cross'; });
add('criss-mcq', mcq({
  stem: 'In criss-cross inheritance, an X-linked recessive trait passes from',
  right: 'an affected mother to her sons, and from a father through his daughters to his grandsons',
  wrong: ['a father directly to his sons', 'mothers only to their daughters', 'parents to all children equally'],
  sol: 'Sons get their X from the mother; a father’s X reaches grandsons through his carrier daughters — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('clot-mcq', mcq({
  stem: 'A boy bleeds for a very long time after a small cut, and tests show that one protein of the blood-clotting cascade is defective. The disorder is most likely',
  right: 'haemophilia, an X-linked recessive disorder',
  wrong: ['sickle-cell anaemia, an autosomal recessive disorder', 'Down’s syndrome, a trisomy', 'thalassaemia, an X-linked disorder'],
  sol: 'Haemophilia affects a clotting protein and is X-linked recessive — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('cbrate-mcq', mcq({
  stem: 'Red–green colour blindness affects about 8 percent of males but only about 0.4 percent of females. Why the difference?',
  right: 'Males need only one recessive X-linked allele to be affected; females need two.',
  wrong: ['The gene is on the Y chromosome.', 'Females have no cones for red and green.', 'The allele is dominant in males and recessive in females.'],
  sol: 'Males are hemizygous for X-linked genes, so one recessive allele shows; females must be homozygous — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
{
  const x = xlinked('XXh', 'XY');
  const frac = x.affectedSon / (x.affectedSon + x.normalSon);
  add('haemo-num', num({
    stem: 'A woman who is a carrier of haemophilia marries a normal man. What fraction of their sons is expected to be haemophilic? Give a decimal.',
    value: frac, tol: 0.001,
    sol: r`Sons get X or Xʰ from the mother equally: affected sons $= \dfrac{${x.affectedSon}}{${x.affectedSon} + ${x.normalSon}} = ${frac}$.`,
    scheme: [[`${frac}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 0.5 || 'value');
}
{
  const x = xlinked('XXh', 'XhY');
  const frac = x.affectedDaughter / (x.affectedDaughter + x.carrierDaughter + x.normalDaughter);
  add('cb-num', num({
    stem: 'A woman who carries the colour-blindness allele marries a colour-blind man. What fraction of their daughters is expected to be colour blind? Give a decimal.',
    value: frac, tol: 0.001,
    sol: r`Daughters get Xᶜ from the father and X or Xᶜ from the mother: colour-blind daughters $= \dfrac{${x.affectedDaughter}}{${x.affectedDaughter + x.carrierDaughter + x.normalDaughter}} = ${frac}$.`,
    scheme: [[`${frac}`, 1]],
    d: 3, c: 'application', t: [2],
  }), (q) => q.answer.value === 0.5 || 'value');
}
add('hemizygous-fill', fill({
  stem: 'Because a human male has only one X chromosome, he is said to be ______ for genes carried on the X chromosome.',
  acc: [['hemizygous']],
  sol: 'Hemizygous.',
  d: 2, c: 'recall', t: [2],
}));
add('yellow-mcq', mcq({
  stem: 'Besides white eye, which other trait studied in Drosophila is inherited as an X-linked recessive character?',
  right: 'Yellow body colour',
  wrong: ['Vestigial wings', 'Ebony body colour', 'Curled wings'],
  sol: 'Yellow body, like white eye, is an X-linked recessive trait in Drosophila — option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('haemo-ar', ar({
  a: 'Haemophilia is much commoner in men than in women.',
  r: 'Men have only one X chromosome, so a single recessive X-linked allele is expressed.',
  key: 'a',
  sol: 'Both are true, and the single X of males explains the difference — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('rare-short', short({
  marks: 1,
  stem: 'Give a reason: A haemophilic daughter can be born only if her father is haemophilic.',
  model: 'She needs **two** recessive alleles, and one **X must come from her father**, so he must carry Xʰ, i.e. be haemophilic.',
  sol: 'Father’s X.',
  scheme: [['Needs Xʰ from father as well as mother', 1]],
  d: 3, c: 'analysis', t: [2],
}));
add('carrier-short', short({
  marks: 2,
  stem: 'A normal-visioned woman whose father was colour blind marries a normal-visioned man. What are the chances that their son and their daughter will be colour blind? Explain.',
  model: 'She received **Xᶜ** from her father, so she is a **carrier (X Xᶜ)**. Each **son** gets X or Xᶜ from her and Y from his father, so **half the sons** are expected to be colour blind. Each **daughter** gets a normal X from the father, so **no daughter** is colour blind, though half are carriers.',
  sol: 'Carrier mother; half the sons.',
  scheme: [['Mother is a carrier', 1], ['Half of sons; no daughters affected', 1]],
  d: 3, c: 'application', t: [2],
}), () => (xlinked('XXh', 'XY').affectedDaughter === 0 && xlinked('XXh', 'XY').affectedSon === 0.25) || 'cross');
add('cbfather-short', short({
  marks: 2,
  stem: 'A colour-blind man marries a woman who is homozygous for normal vision. Write the genotypes of their children and state which of them could have colour-blind children of their own.',
  model: 'Sons: **X Y**, normal — they got their X from the mother. Daughters: **X Xᶜ**, normal vision but **carriers**, because each received Xᶜ from the father. Only the **daughters** can have colour-blind children (half of their sons).',
  sol: 'Sons normal; daughters carriers.',
  scheme: [['Sons X Y, daughters X Xᶜ', 1], ['Daughters can have affected sons', 1]],
  d: 2, c: 'application', t: [2],
}), () => xlinked('XX', 'XhY').carrierDaughter === 0.5 || 'cross');
add('drosophila-short', short({
  marks: 3,
  stem: 'Morgan crossed a red-eyed female Drosophila with a white-eyed male. Show the F1 and F2, and explain how the results show that the eye-colour gene is X-linked.',
  model: '**P:** X X (red female) × Xʷ Y (white male). **F1:** **X Xʷ** females and **X Y** males — **all red-eyed**. **F2** (X Xʷ × X Y): females X X and X Xʷ — **all red**; males **X Y (red)** and **Xʷ Y (white)** in **1 : 1**. White eye appears **only in males** of the F2, and the reciprocal cross gives different results, so the gene is on the **X chromosome**.',
  sol: 'Cross and reasoning.',
  scheme: [['F1 all red with genotypes', 1], ['F2: females red, half males white', 1], ['White only in males: X-linked', 1]],
  d: 3, c: 'application', t: [2],
}), () => { const f2 = xlinked('XXh', 'XY'); return (f2.affectedDaughter === 0 && f2.affectedSon === f2.normalSon) || 'f2'; });
add('cb-short', short({
  marks: 3,
  stem: 'A colour-blind girl has a mother with normal vision. Work out the genotypes of the girl, her mother and her father, and the chance that her brother is colour blind.',
  model: 'A colour-blind girl is **Xᶜ Xᶜ**, receiving one Xᶜ from **each parent**. Her **father** gave an Xᶜ, so he is **Xᶜ Y** (colour blind). Her **mother** has normal vision but gave an Xᶜ, so she is a **carrier, X Xᶜ**. A brother gets his X from the mother: **X or Xᶜ**, so the chance he is colour blind is **one-half**.',
  sol: 'Genotypes and probability.',
  scheme: [['Girl Xᶜ Xᶜ', 1], ['Father Xᶜ Y; mother X Xᶜ', 1], ['Brother 1/2', 1]],
  d: 4, c: 'analysis', t: [2],
}), () => xlinked('XXh', 'XhY').affectedSon === 0.25 || 'cross');
add('xlinked-long', long({
  stem: '(a) What is meant by sex-linked inheritance? Why are X-linked recessive traits seen more often in males? [2]\n(b) A man with haemophilia marries a woman who is a carrier. Work out the genotypes and phenotypes of their children, by sex, with a Punnett square. [3]',
  model: `(a) **Sex-linked inheritance** is the inheritance of genes carried on the **sex chromosomes**, usually the X. Males have **one X** (they are hemizygous), so a single recessive X-linked allele is **expressed**; females need **two** copies, so they are usually **carriers**.\n\n(b) Xʰ Y × X Xʰ. Gametes: Xʰ, Y and X, Xʰ. Daughters: **X Xʰ (carrier)** and **Xʰ Xʰ (haemophilic)** — **half each**. Sons: **X Y (normal)** and **Xʰ Y (haemophilic)** — **half each**. Overall: normal daughter ${xlinked('XXh', 'XhY').normalDaughter}, carrier daughter ${xlinked('XXh', 'XhY').carrierDaughter}, affected daughter ${xlinked('XXh', 'XhY').affectedDaughter}, normal son ${xlinked('XXh', 'XhY').normalSon}, affected son ${xlinked('XXh', 'XhY').affectedSon} of all children.`,
  sol: 'Definition; cross by sex.',
  scheme: [['(a) Definition', 1], ['(a) Males hemizygous', 1], ['(b) Gametes and square', 1], ['(b) Daughters half carrier, half affected', 1], ['(b) Sons half normal, half affected', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [2],
}), () => { const x = xlinked('XXh', 'XhY'); return (x.affectedDaughter === 0.25 && x.carrierDaughter === 0.25 && x.affectedSon === 0.25) || 'cross'; });

// ---------------------------------------------------------------- t03 mutation
add('transversion-mcq', mcq({
  stem: 'Which of these base changes in a DNA strand is a transversion?',
  right: 'G is replaced by T',
  wrong: ['A is replaced by G', 'C is replaced by T', 'T is replaced by C'],
  sol: 'G (purine) to T (pyrimidine) changes the class of base: a transversion; the others are transitions — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('induced-mcq', mcq({
  stem: 'Skin cells of farm workers exposed to strong sunlight for years show more DNA changes than cells of indoor workers. The changes are best described as',
  right: 'induced mutations caused by a physical mutagen (UV radiation)',
  wrong: ['spontaneous mutations unrelated to sunlight', 'chromosomal disorders inherited from parents', 'frameshifts caused by chemical fertilisers only'],
  sol: 'UV radiation is a physical mutagen that induces mutations — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('frameshift-mcq', mcq({
  stem: 'One extra base is inserted near the start of the coding sequence of a gene. What is the most likely effect on the protein?',
  right: 'Every codon after the insertion is read wrongly, so the protein is usually non-functional.',
  wrong: ['Only one amino acid changes.', 'The protein is unchanged because one base cannot matter.', 'An extra amino acid is added and the rest is normal.'],
  sol: 'Inserting one base shifts the reading frame from that point on — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('inframe-mcq', mcq({
  stem: 'Three adjacent bases forming one codon are deleted from a gene. What happens to the reading frame?',
  right: 'It is unaltered; the protein loses one amino acid.',
  wrong: ['It shifts by three places, changing every later amino acid.', 'It shifts by one place.', 'The gene can no longer be transcribed.'],
  sol: 'Deleting a whole codon removes one amino acid without shifting the frame — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('xray-mcq', mcq({
  stem: 'Which of these is a physical mutagen capable of inducing mutations in DNA?',
  right: 'X-rays',
  wrong: ['Sucrose', 'Visible green light', 'Distilled water'],
  sol: 'Ionising radiation such as X-rays, and UV radiation, are physical mutagens — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('transition-fill', fill({
  stem: 'A point mutation in which a purine is replaced by another purine, or a pyrimidine by another pyrimidine, is called a ______.',
  acc: [['transition']],
  sol: 'Transition.',
  d: 1, c: 'recall', t: [3],
}));
add('sickle-ar', ar({
  a: 'In sickle-cell anaemia the sixth amino acid of the β-globin chain is changed from glutamic acid to valine.',
  r: 'The mutation is a frameshift caused by the insertion of a base.',
  key: 'c',
  sol: 'A is true. R is false: the change is a single base substitution (GAG → GUG), not a frameshift — option (c).',
  d: 3, c: 'analysis', t: [3, 4],
}));
add('mutate-short', short({
  marks: 2,
  stem: 'Distinguish between spontaneous and induced mutations, naming two mutagens.',
  model: '**Spontaneous** mutations occur **naturally**, for example through **errors in DNA replication**, at a low rate. **Induced** mutations are caused by **mutagens**: physical agents such as **UV radiation** and **X-rays**, and certain **chemicals**.',
  sol: 'Two kinds; two mutagens.',
  scheme: [['Spontaneous vs induced', 1], ['Two mutagens', 1]],
  d: 1, c: 'understanding', t: [3],
}));
add('point-short', short({
  marks: 3,
  stem: 'Describe the three kinds of gene (point) mutation — transition, transversion and frameshift — giving an example base change for each.',
  model: '**Transition:** a **purine replaced by a purine** or a **pyrimidine by a pyrimidine**, e.g. **A → G** or C → T.\n\n**Transversion:** a **purine replaced by a pyrimidine** or vice versa, e.g. **A → T** or G → C.\n\n**Frameshift:** **insertion or deletion** of one or two bases, e.g. an extra A inserted, which **shifts the reading frame** so that every following codon is changed.',
  sol: 'Three kinds with examples.',
  scheme: [['Transition', 1], ['Transversion', 1], ['Frameshift', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 Mendelian disorders
add('codon6-mcq', mcq({
  stem: 'In sickle-cell anaemia, which change occurs in the mRNA codon for the sixth amino acid of β-globin?',
  right: 'GAG becomes GUG',
  wrong: ['GUG becomes GAG', 'AUG becomes UAG', 'GAG becomes GAA'],
  sol: 'A single base substitution changes GAG (glutamic acid) to GUG (valine) — option (@K).',
  d: 2, c: 'recall', t: [4],
}));
add('hbs-mcq', mcq({
  stem: 'A person with sickle-cell anaemia feels breathless at high altitude, and blood smears show many sickled cells. Why do the cells sickle there?',
  right: 'Mutant haemoglobin HbS polymerises under low oxygen tension, distorting the red cells.',
  wrong: ['High altitude causes new mutations in red cells.', 'Cold air shrinks normal red cells.', 'HbS gains extra oxygen and swells.'],
  sol: 'HbS polymerises when oxygen tension is low, changing biconcave discs to sickle shapes — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('pku-mcq', mcq({
  stem: 'A newborn’s urine and blood show high levels of phenylalanine and phenylpyruvic acid. Which enzyme is the baby most likely to lack?',
  right: 'The enzyme that converts phenylalanine into tyrosine',
  wrong: ['The enzyme that clots blood', 'The enzyme that converts glucose to glycogen', 'β-globin'],
  sol: 'Phenylketonuria results from lack of phenylalanine hydroxylase — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('thal-mcq', mcq({
  stem: 'β-thalassaemia is controlled by a single gene HBB. On which chromosome is it located?',
  right: 'Chromosome 11',
  wrong: ['Chromosome 16', 'Chromosome 21', 'The X chromosome'],
  sol: 'HBB lies on chromosome 11; α-globin genes HBA1 and HBA2 lie on chromosome 16 — option (@K).',
  d: 2, c: 'recall', t: [4],
}));
add('quant-mcq', mcq({
  stem: 'Two patients are anaemic. In one, the globin chains are normal but made in too small an amount; in the other, a normal amount of an abnormal chain is made. Which pair of diagnoses fits?',
  right: 'Thalassaemia (quantitative) and sickle-cell anaemia (qualitative)',
  wrong: ['Sickle-cell anaemia (quantitative) and thalassaemia (qualitative)', 'Haemophilia and colour blindness', 'Turner’s syndrome and Down’s syndrome'],
  sol: 'Thalassaemia reduces synthesis of a globin chain; sickle-cell anaemia makes an incorrectly functioning globin — option (@K).',
  d: 4, c: 'analysis', t: [4],
}));
{
  const aff = cross('Aa', 'Aa').get('aa');
  add('carrier-num', num({
    stem: 'Both parents are carriers of sickle-cell anaemia (HbAHbS). What is the probability that their child will have the disease? Give a decimal.',
    value: aff, tol: 0.001,
    sol: r`HbAHbS $\times$ HbAHbS: probability HbSHbS $= \dfrac{1}{2} \times \dfrac{1}{2} = ${aff}$.`,
    scheme: [[`${aff}`, 1]],
    d: 2, c: 'application', t: [4],
  }), (q) => q.answer.value === 0.25 || 'value');
}
add('disorder-match', match({
  stem: 'Match each disorder (column I) with its pattern of inheritance or cause (column II).',
  pairs: [
    ['Phenylketonuria', 'Autosomal recessive enzyme deficiency'],
    ['Haemophilia', 'X-linked recessive'],
    ['Klinefelter’s syndrome', 'Extra X chromosome in a male'],
    ['Down’s syndrome', 'Trisomy of chromosome 21'],
  ],
  order: [3, 1, 0, 2],
  sol: 'Phenylketonuria — autosomal recessive; haemophilia — X-linked recessive; Klinefelter’s — XXY; Down’s — trisomy 21.',
  d: 2, c: 'understanding', t: [4, 5],
}));
add('pku-short', short({
  marks: 2,
  stem: 'Explain the cause of phenylketonuria and why the affected child shows mental retardation.',
  model: 'Phenylketonuria is an **autosomal recessive** disorder in which the child **lacks the enzyme** that converts **phenylalanine into tyrosine**. Phenylalanine accumulates and is converted to **phenylpyruvic acid** and other derivatives, which **accumulate in the brain**, causing mental retardation; they are also **excreted in urine**.',
  sol: 'Enzyme lack; brain accumulation.',
  scheme: [['Lacks enzyme converting phenylalanine to tyrosine', 1], ['Derivatives accumulate in the brain', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('thal-short', short({
  marks: 3,
  stem: 'Describe the cause of α- and β-thalassaemia, naming the genes and chromosomes involved, and state how thalassaemia differs from sickle-cell anaemia.',
  model: 'Thalassaemia is an **autosomal recessive** disease caused by mutation or deletion that **reduces the rate of synthesis** of one of the **globin chains**, giving abnormal haemoglobin and **anaemia**. **α-thalassaemia** affects α-globin, controlled by **HBA1 and HBA2** on **chromosome 16**; **β-thalassaemia** affects β-globin, controlled by **HBB** on **chromosome 11**. Thalassaemia is a **quantitative** problem (too few globin molecules), while sickle-cell anaemia is **qualitative** (an incorrectly functioning globin).',
  sol: 'Cause, genes, comparison.',
  scheme: [['Reduced globin synthesis, autosomal recessive', 1], ['α: HBA1, HBA2 on 16; β: HBB on 11', 1], ['Quantitative vs qualitative', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('sickle-short', short({
  marks: 3,
  stem: 'A man and a woman are both healthy carriers of the sickle-cell allele. Using a Punnett square, find the probabilities of each genotype in their children, and explain why carriers are usually healthy.',
  model: `HbAHbS × HbAHbS: gametes HbA, HbS from each. Children: **HbAHbA (normal) ${cross('Aa', 'Aa').get('AA')}**, **HbAHbS (carrier) ${cross('Aa', 'Aa').get('Aa')}**, **HbSHbS (affected) ${cross('Aa', 'Aa').get('aa')}**. Carriers are usually healthy because the **normal allele** makes enough **normal haemoglobin**; the disease is **recessive** and appears only in **HbSHbS** individuals.`,
  sol: 'Square with probabilities; recessive.',
  scheme: [['Gametes and square', 1], ['Three probabilities', 1], ['Carriers healthy: recessive', 1]],
  d: 2, c: 'application', t: [4],
}));
add('sickle-long', long({
  stem: '(a) Describe the molecular basis of sickle-cell anaemia, naming the codon and amino-acid change and the type of mutation. [3]\n(b) Why do red blood cells of affected persons become sickle-shaped, and why is this harmful? [2]',
  model: '(a) Sickle-cell anaemia is an **autosomal recessive** disorder caused by a **single base substitution** (a **point mutation**) at the **sixth codon** of the **β-globin** gene. The mRNA codon **GAG** becomes **GUG**, so **glutamic acid** is replaced by **valine** at the sixth position of the β-globin chain, forming the mutant haemoglobin **HbS**.\n\n(b) Under **low oxygen tension**, HbS molecules **polymerise**, changing the red cells from **biconcave discs** to elongated **sickle-like** shapes. Sickled cells are rigid and pass poorly through **narrow capillaries**, blocking blood flow and causing tissue damage, and they are destroyed quickly, causing **anaemia**.',
  sol: 'Molecular change; sickling and harm.',
  scheme: [['(a) Point mutation at codon 6 of β-globin', 1], ['(a) GAG → GUG', 1], ['(a) Glu → Val, HbS', 1], ['(b) Polymerisation at low oxygen', 1], ['(b) Blocked capillaries and anaemia', 1]],
  wl: [60, 200],
  d: 3, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- t05 chromosomal disorders
add('turner-mcq', mcq({
  stem: 'A girl’s karyotype shows 45 chromosomes with a single X and no Y. She has rudimentary ovaries. Which syndrome is this?',
  right: 'Turner’s syndrome',
  wrong: ['Klinefelter’s syndrome', 'Down’s syndrome', 'Haemophilia'],
  sol: 'Turner’s syndrome is 45, X0, with sterile females and rudimentary ovaries — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('down-mcq', mcq({
  stem: 'A child with a small round head, furrowed tongue, partially open mouth and a characteristic crease across the broad palm has 47 chromosomes. Which chromosome is most likely present in three copies?',
  right: 'Chromosome 21',
  wrong: ['Chromosome 11', 'The Y chromosome', 'Chromosome 16'],
  sol: 'These features fit Down’s syndrome, trisomy of chromosome 21 — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('kline-mcq', mcq({
  stem: 'A tall, sterile man shows some development of breast tissue (gynaecomastia). His karyotype is most likely',
  right: '47, XXY',
  wrong: ['45, X0', '47, trisomy 21', '46, XY with a point mutation in β-globin'],
  sol: 'Klinefelter’s syndrome (47, XXY) gives masculine development with some feminine features and sterility — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('aneu-mcq', mcq({
  stem: 'During egg formation, the two chromatids of chromosome 21 fail to separate. What kind of change can this cause in the embryo?',
  right: 'Aneuploidy, such as trisomy 21',
  wrong: ['Polyploidy of all chromosomes', 'A transition in the β-globin gene', 'Haplodiploidy'],
  sol: 'Failure of segregation gives gain or loss of a chromosome (aneuploidy) — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('down-ar', ar({
  a: 'Down’s syndrome results from an extra copy of chromosome 21.',
  r: 'The genes for α-thalassaemia lie on chromosome 16.',
  key: 'b',
  sol: 'Both statements are true, but the location of thalassaemia genes has nothing to do with Down’s syndrome — option (b).',
  d: 2, c: 'analysis', t: [4, 5],
}));
add('langdon-fill', fill({
  stem: 'Trisomy 21 is named after the physician Langdon ______, who first described it in 1866.',
  acc: [['Down']],
  sol: 'Down.',
  d: 1, c: 'recall', t: [5],
}));
add('poly-fill', fill({
  stem: 'An increase in a whole set of chromosomes resulting from failure of cytokinesis after telophase is called ______, and it is often seen in plants.',
  acc: [['polyploidy']],
  sol: 'Polyploidy.',
  d: 1, c: 'recall', t: [5],
}));
add('syndrome-short', short({
  marks: 2,
  stem: 'Compare Klinefelter’s and Turner’s syndromes in respect of karyotype, sex and fertility.',
  model: '**Klinefelter’s:** **47, XXY**; a **male** with overall masculine development and some feminine features (gynaecomastia); **sterile**. **Turner’s:** **45, X0**; a **female** with **rudimentary ovaries** and lack of secondary sexual characters; **sterile**.',
  sol: 'Two syndromes compared.',
  scheme: [['Klinefelter’s', 1], ['Turner’s', 1]],
  d: 2, c: 'analysis', t: [5],
}));
add('chrom-short', short({
  marks: 3,
  stem: 'Describe the features of Down’s syndrome and explain how its chromosomal cause arises.',
  model: 'Down’s syndrome (first described by **Langdon Down, 1866**) is caused by an **extra copy of chromosome 21** (**trisomy 21**, 47 chromosomes). Affected people are **short** with a **small round head**, **furrowed tongue**, **partially open mouth** and a **broad palm with a characteristic crease**; **physical, psychomotor and mental development is retarded**. The extra chromosome arises when chromatids **fail to segregate** (non-disjunction) during gamete formation.',
  sol: 'Cause, features, origin.',
  scheme: [['Trisomy 21', 1], ['Three features', 1], ['Failure of segregation', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('aneu-short', short({
  marks: 3,
  stem: 'Distinguish between aneuploidy and polyploidy, explaining how each arises and giving one example of an aneuploid condition in humans.',
  model: '**Aneuploidy** is the **gain or loss of one or a few chromosomes**; it arises when **chromatids or homologues fail to segregate** during cell division, e.g. **Down’s syndrome (trisomy 21)**, Turner’s (45, X0) or Klinefelter’s (47, XXY). **Polyploidy** is an **increase in whole sets of chromosomes**; it arises from **failure of cytokinesis after telophase**, and is common in **plants**.',
  sol: 'Two terms; origins; example.',
  scheme: [['Aneuploidy and its origin', 1], ['Polyploidy and its origin', 1], ['Human example', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('chrom-long', long({
  stem: '(a) How do chromosomal disorders differ from Mendelian disorders? [1]\n(b) Tabulate the karyotype and two features each of Down’s, Klinefelter’s and Turner’s syndromes. [3]\n(c) Why are chromosomal disorders not traced in pedigrees in the way Mendelian disorders are? [1]',
  model: '(a) **Chromosomal disorders** are caused by **absence, excess or abnormal arrangement of whole chromosomes**; **Mendelian disorders** by mutation of a **single gene**.\n\n(b) **Down’s:** trisomy **21** (47); short stature, small round head, furrowed tongue, palm crease, retarded development. **Klinefelter’s:** **47, XXY**; masculine with gynaecomastia; sterile. **Turner’s:** **45, X0**; sterile female with rudimentary ovaries; lacks secondary sexual characters.\n\n(c) They usually arise **anew** from **failure of chromosome segregation** during gamete formation and affected persons are often **sterile**, so they do not follow a regular pattern through families as single-gene traits do.',
  sol: 'Difference; table; pedigrees.',
  scheme: [['(a) Whole chromosomes vs single gene', 1], ['(b) Down’s', 1], ['(b) Klinefelter’s', 1], ['(b) Turner’s', 1], ['(c) Arise anew; often sterile', 1]],
  wl: [60, 200],
  d: 3, c: 'analysis', t: [5],
}));

// ---------------------------------------------------------------- stimulus-based
add('royal-case', mk.case({
  passage: 'In a family history: a woman (P) with normal blood clotting had a haemophilic father. She married a man (Q) with normal clotting. They had four children: two daughters with normal clotting and two sons, one of whom (R) was haemophilic.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'What is the genotype of P?',
      right: 'X Xʰ (carrier)',
      wrong: ['X X (normal)', 'Xʰ Xʰ (haemophilic)', 'X Y'],
      sol: 'She received Xʰ from her haemophilic father but clots normally, so she is a carrier — option (@K).',
      d: 2, c: 'application', t: [2],
    })),
    part('b', num({
      stem: 'What is the probability that a given daughter of P and Q is a carrier? Give a decimal.',
      value: xlinked('XXh', 'XY').carrierDaughter * 2, tol: 0.001,
      sol: r`Daughters get X from Q and X or Xʰ from P: carriers $= \dfrac{1}{2} = ${xlinked('XXh', 'XY').carrierDaughter * 2}$.`,
      scheme: [['0.5', 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'From which parent did son R receive the haemophilia allele, and why could he not have received it from the other parent?',
      model: 'From his **mother P**: a son receives his **only X** from his mother. From his father Q he received the **Y chromosome**, and Q’s X carries a **normal** allele in any case.',
      sol: 'Mother; father gives Y.',
      scheme: [['From the mother P', 1], ['Father gives Y to sons', 1]],
      d: 2, c: 'analysis', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'If R marries a woman who is not a carrier, what will be true of his sons and daughters?',
        model: 'All his **sons** will be **normal** (they get his Y and their mother’s normal X); all his **daughters** will be **carriers** (they get his Xʰ and their mother’s X).',
        sol: 'Sons normal; daughters carriers.',
        scheme: [['Sons normal', 1], ['Daughters carriers', 1]],
        d: 2, c: 'application', t: [2],
      }),
    ]),
  ],
}), (q) => q.children[1].answer.value === 0.5 || 'value');
add('karyo-case', mk.case({
  passage: 'A genetics clinic examined the karyotypes of three patients.\n\n| Patient | Chromosome count | Sex chromosomes | Note |\n|---|---|---|---|\n| X | 47 | XY | Three copies of chromosome 21 |\n| Y | 47 | XXY | Tall male, sterile |\n| Z | 45 | X | Female, rudimentary ovaries |',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Patient Y has which syndrome?',
      right: 'Klinefelter’s syndrome',
      wrong: ['Turner’s syndrome', 'Down’s syndrome', 'Phenylketonuria'],
      sol: '47, XXY is Klinefelter’s syndrome — option (@K).',
      d: 1, c: 'application', t: [5],
    })),
    part('b', mcq({
      stem: 'Which patients show aneuploidy?',
      right: 'All three',
      wrong: ['X only', 'Y and Z only', 'None; they are polyploid'],
      sol: 'Each has a chromosome gained or lost, not a whole extra set — option (@K).',
      d: 3, c: 'analysis', t: [5],
    })),
    part('c', short({
      marks: 2,
      stem: 'State two features you would expect in patient X.',
      model: 'Patient X has **Down’s syndrome**: **short stature** with a **small round head**, **furrowed tongue** and partially open mouth, a **broad palm with a characteristic crease**, and **retarded** physical, psychomotor and mental development (any two).',
      sol: 'Any two Down’s features.',
      scheme: [['First feature', 1], ['Second feature', 1]],
      d: 2, c: 'understanding', t: [5],
    }), [
      short({
        marks: 2,
        stem: 'Explain how a gamete with an extra chromosome, like the one that produced patient X, can arise.',
        model: 'During **meiosis**, the two chromatids (or homologues) of **chromosome 21 fail to separate** (non-disjunction), so one gamete receives **two copies**; fertilisation by a normal gamete then gives **three copies** (trisomy).',
        sol: 'Non-disjunction.',
        scheme: [['Failure of segregation in meiosis', 1], ['Gamete with two copies gives trisomy', 1]],
        d: 2, c: 'understanding', t: [5],
      }),
    ]),
  ],
}));
