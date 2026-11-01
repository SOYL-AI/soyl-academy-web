// ICSE 10 Biology ch02 Genetics — question bank in ICSE 2027 style. Ratios, expected numbers and probabilities are
// computed by calc.mjs. The genotypic ratio of a dihybrid cross and sex-linked disorders other than haemophilia and
// colour blindness are removed topics and are not asked.
// AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true, R does not explain.
import { mk, add, svgV, r } from '../../icse-10-biology-ch01/src/lib.mjs';
import { MONO_N, DI_N, TEST_N, MONO_SPLIT, DI_SPLIT, TEST_SPLIT, MONO_R, DI_R, HAEMO, CB, split, pctOf } from './calc.mjs';
import { HAEMO_LETTERED, DI } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, match, part } = mk;
const hFig = svgV(HAEMO_LETTERED, 'A cross for an X-linked disorder, lettered A to E');
const diFig = svgV(DI, 'Dihybrid Punnett square for TtVv × TtVv');

// ---------------------------------------------------------------- t01 terms
add('allele-mcq', mcq({
  stem: 'In pea plants, V (violet flowers) and v (white flowers) are two forms of the same gene. Such alternative forms are called',
  right: 'alleles', wrong: ['chromatids', 'homologous chromosomes', 'mutations'],
  sol: 'Alternative forms of a gene at the same position on homologous chromosomes are alleles — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('homo-mcq', mcq({
  stem: 'A pea plant with the genotype vv is described as',
  right: 'homozygous recessive', wrong: ['heterozygous', 'homozygous dominant', 'hybrid'],
  sol: 'Two identical recessive alleles: homozygous recessive — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('pheno-mcq', mcq({
  stem: 'Two pea plants, VV and Vv, both have violet flowers. They have',
  right: 'the same phenotype but different genotypes', wrong: ['the same genotype but different phenotypes', 'the same phenotype and the same genotype', 'different phenotypes and different genotypes'],
  sol: 'Phenotype is the visible character (violet for both); genotype is the allele pair (VV vs Vv) — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('mutation-mcq', mcq({
  stem: 'A sudden, heritable change in a gene that produces a new character is called',
  right: 'a mutation', wrong: ['a recessive allele', 'a phenotype', 'segregation'],
  sol: 'A mutation is a sudden heritable change in the genetic material — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('variation-mcq', mcq({
  stem: 'Children of the same parents differ in eye colour, height and hair. These differences between individuals of the same species are called',
  right: 'variations', wrong: ['mutations only', 'alleles', 'genotypes'],
  sol: 'Differences among members of a species are variations; mutation is only one of their sources — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('hetero-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: an organism with two different alleles of a gene, such as Vv.',
  model: '**Heterozygous** (a hybrid).',
  sol: 'Heterozygous.', scheme: [['Heterozygous', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('genotype-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the genetic make-up of an organism for a character, written with letters such as Tt.',
  model: '**Genotype.**',
  sol: 'Genotype.', scheme: [['Genotype', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('dominant-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the allele that shows its effect even when only one copy is present.',
  model: '**Dominant** allele.',
  sol: 'Dominant.', scheme: [['Dominant', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('odd-terms', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: TT, Tt, tt, Tall.',
  model: '**Tall**; the others are **genotypes** (Tall is a phenotype).',
  sol: 'Tall is a phenotype.', scheme: [['Odd one and category', 1]],
  d: 2, c: 'analysis', t: [1],
}));
add('terms-fill', fill({
  stem: 'The visible expression of a character, such as white flowers, is its ______.',
  acc: [['phenotype']],
  sol: 'Phenotype.',
  d: 1, c: 'recall', t: [1],
}));

// ---------------------------------------------------------------- t02 Mendel and his laws
add('pea-mcq', mcq({
  stem: 'Which feature of the garden pea made it suitable for Mendel’s experiments?',
  right: 'It has many clearly contrasting characters and is normally self-pollinating', wrong: ['It takes several years to flower', 'It has only one pair of chromosomes', 'It cannot be cross-pollinated by hand'],
  sol: 'Pea has sharply contrasting traits, a short life cycle, many seeds and natural self-pollination, yet can be crossed by hand — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('dominance-mcq', mcq({
  stem: 'When Mendel crossed pure violet-flowered plants with pure white-flowered plants, all the F1 plants were violet. This illustrates the law of',
  right: 'dominance', wrong: ['segregation', 'independent assortment', 'mutation'],
  sol: 'Only the dominant character appears in the F1 hybrid — law of dominance, option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('segregation-mcq', mcq({
  stem: 'White flowers, absent in the F1, reappear in the F2. Which law explains this?',
  right: 'Law of segregation: the two alleles separate when gametes form', wrong: ['Law of dominance: the dominant allele always shows', 'Law of independent assortment: two characters are inherited separately', 'Law of mutation: new alleles appear in the F2'],
  sol: 'The recessive allele, hidden in the F1, separates into some gametes and two such gametes give vv in the F2 — option (@K).',
  d: 3, c: 'analysis', t: [2, 3],
}));
add('purity-ar', ar({
  a: 'Gametes are always pure for a character.',
  r: 'Each gamete receives only one allele of each gene.',
  key: 'c',
  sol: 'Both are true, and because each gamete carries just one allele, it is pure for that character (law of segregation) — option (c).',
  d: 2, c: 'analysis', t: [2],
}));
add('assort-ar', ar({
  a: 'In a dihybrid cross, new combinations such as tall white and dwarf violet appear in the F2.',
  r: 'The alleles of height and flower colour are always inherited together.',
  key: 'a',
  sol: 'The assertion is true. The reason is false: the two genes assort independently, which is why new combinations appear — option (a).',
  d: 3, c: 'analysis', t: [2, 4],
}));
add('law-short', short({
  marks: 2,
  stem: 'State Mendel’s law of segregation and give one observation from a violet × white cross that supports it.',
  model: '**Law of segregation:** the two alleles of a gene **separate** during gamete formation, so each gamete gets **only one** allele. **Evidence:** white flowers, **absent in the F1**, **reappear** in a quarter of the F2.',
  sol: 'Statement and evidence.',
  scheme: [['Statement', 1], ['Supporting observation', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('pea-short', short({
  marks: 2,
  stem: 'Give two reasons why Mendel chose the garden pea for his experiments.',
  model: '1. It has many **pairs of clearly contrasting characters** (tall/dwarf, violet/white flowers).\n2. It is **self-pollinating**, so pure lines are easy to keep, yet it can be **cross-pollinated by hand**; it also has a **short life cycle** with many seeds.',
  sol: 'Contrasting traits; self-pollination; short life cycle; many seeds.',
  scheme: [['First reason', 1], ['Second reason', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('laws-odd', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Dominance, Segregation, Independent assortment, Crossing over.',
  model: '**Crossing over**; the others are **Mendel’s laws of inheritance**.',
  sol: 'Crossing over is an event of meiosis.', scheme: [['Odd one and category', 1]],
  d: 2, c: 'analysis', t: [2],
}));

// ---------------------------------------------------------------- t03 monohybrid cross
add('mono-ratio-mcq', mcq({
  stem: 'Two heterozygous violet-flowered plants (Vv) are crossed. The phenotypic ratio of the offspring will be',
  right: `${MONO_R[0]} violet : ${MONO_R[1]} white`, wrong: ['1 violet : 1 white', '1 violet : 2 white', 'all violet'],
  sol: `Vv × Vv gives VV, Vv, Vv, vv: ${MONO_R.join(' : ')} — option (@K).`,
  d: 2, c: 'application', t: [3],
}));
add('mono-geno-mcq', mcq({
  stem: 'What fraction of the F2 plants from a Vv × Vv cross will be pure-breeding violet (VV)?',
  right: 'One quarter', wrong: ['One half', 'Three quarters', 'None'],
  sol: 'VV is 1 of the 4 boxes — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('testcross-mcq', mcq({
  stem: 'A tall pea plant crossed with a dwarf plant gives about equal numbers of tall and dwarf offspring. The genotype of the tall parent is',
  right: 'Tt', wrong: ['TT', 'tt', 'TT or Tt; it cannot be told'],
  sol: 'Only Tt × tt gives tall and dwarf in a 1 : 1 ratio; TT × tt would give all tall — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
{
  const [v, w] = MONO_SPLIT;
  add('mono-num', num({
    stem: `An F1 violet-flowered plant (Vv) is self-pollinated and ${MONO_N} seeds grow into plants. How many are expected to have white flowers?`,
    value: w,
    sol: r`White is $\tfrac{1}{4}$ of the F2: $\tfrac{1}{4} \times ${MONO_N} = ${w}$ (and ${v} violet).`,
    scheme: [[`${w}`, 1]],
    d: 2, c: 'application', t: [3],
  }), (q) => q.answer.value === 205 || 'value');
}
add('mono-tf', tf({
  stem: 'In a monohybrid F2 generation, two out of every three violet-flowered plants are heterozygous.',
  key: 't',
  sol: 'True. Among violet plants (VV, Vv, Vv), two of three are Vv.',
  d: 3, c: 'analysis', t: [3],
}));
add('mono-short3', short({
  marks: 3,
  stem: 'A pure tall pea plant (TT) is crossed with a pure dwarf plant (tt). Using a Punnett square, work out the F1 and F2 generations and state the F2 phenotypic and genotypic ratios.',
  model: '**F1:** TT × tt gives gametes T and t, so all offspring are **Tt (tall)**. **F2:** Tt × Tt gives TT, Tt, Tt, tt. **Phenotypic ratio 3 tall : 1 dwarf**; **genotypic ratio 1 TT : 2 Tt : 1 tt**.',
  sol: 'F1 all Tt tall; F2 3 : 1 and 1 : 2 : 1.',
  scheme: [['F1 all Tt, tall', 1], ['F2 Punnett square', 1], ['Both ratios', 1]],
  d: 2, c: 'application', t: [3],
}));
add('test-short', short({
  marks: 2,
  stem: 'How would you find out whether a violet-flowered pea plant is VV or Vv? Explain the expected results.',
  model: 'Do a **test cross**: cross it with a **white (vv)** plant. If **all** offspring are violet, the plant is **VV**; if about **half are white**, it is **Vv**.',
  sol: 'Test cross with the recessive.',
  scheme: [['Cross with vv (test cross)', 1], ['Both outcomes interpreted', 1]],
  d: 3, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 dihybrid cross (phenotypic ratio only)
add('di-ratio-mcq', mcq({
  stem: 'In the F2 of a dihybrid cross between tall violet (TTVV) and dwarf white (ttvv) pea plants, the phenotypic ratio is',
  right: `${DI_R.join(' : ')}`, wrong: ['3 : 1', '1 : 2 : 1', '1 : 1 : 1 : 1'],
  sol: `Two genes assorting independently give ${DI_R.join(' : ')} — option (@K).`,
  d: 2, c: 'understanding', t: [4],
}));
add('di-new-mcq', mcq({
  stem: 'Which F2 phenotypes of the TTVV × ttvv cross are new combinations not seen in either parent?',
  right: 'Tall white and dwarf violet', wrong: ['Tall violet and dwarf white', 'Only tall violet', 'Only dwarf white'],
  sol: 'The parents were tall violet and dwarf white, so tall white and dwarf violet are recombinations — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('di-fig-mcq', mcq({
  stem: 'In the dihybrid Punnett square shown, how many of the 16 boxes give dwarf plants with violet flowers?',
  right: String(DI_R[2]), wrong: ['1', '9', '4'],
  sol: `Dwarf violet (ttV_) occupies ${DI_R[2]} of the 16 boxes — option (@K).`,
  d: 2, c: 'application', t: [4],
  assets: [diFig],
}));
{
  const [tv, tw, dv, dw] = DI_SPLIT;
  add('di-num', num({
    stem: `A dihybrid F1 plant (TtVv) is selfed and gives ${DI_N} F2 plants. How many are expected to be tall with violet flowers?`,
    value: tv,
    sol: r`Tall violet is $\tfrac{9}{16}$: $\tfrac{9}{16} \times ${DI_N} = ${tv}$ (tall white ${tw}, dwarf violet ${dv}, dwarf white ${dw}).`,
    scheme: [[`${tv}`, 1]],
    d: 2, c: 'application', t: [4],
  }), (q) => q.answer.value === 360 || 'value');
  add('di-short3', short({
    marks: 3,
    stem: `Explain how the F2 of a dihybrid cross (TTVV × ttvv) shows the law of independent assortment. State the phenotypes and the expected numbers among ${DI_N} F2 plants.`,
    model: `The F1 (TtVv) forms **four kinds of gametes** (TV, Tv, tV, tv) in equal numbers because the two genes **assort independently**. The F2 has **four phenotypes**: tall violet **${tv}**, tall white **${tw}**, dwarf violet **${dv}**, dwarf white **${dw}** (${DI_R.join(' : ')}); **two are new combinations**.`,
    sol: 'Four gamete types; 9:3:3:1 numbers; recombinants.',
    scheme: [['Four gamete types / independent assortment', 1], ['Four phenotypes with numbers', 1], ['New combinations noted', 1]],
    d: 3, c: 'analysis', t: [4, 2],
  }));
}
add('di-tf', tf({
  stem: 'In a dihybrid F2, one plant in every sixteen shows both recessive characters.',
  key: 't',
  sol: 'True. The double recessive (ttvv) is 1 of 16.',
  d: 2, c: 'understanding', t: [4],
}));
add('dihybrid-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: a cross in which the inheritance of two pairs of contrasting characters is studied together.',
  model: '**Dihybrid cross.**',
  sol: 'Dihybrid cross.', scheme: [['Dihybrid cross', 1]],
  d: 1, c: 'recall', t: [4],
}));

// ---------------------------------------------------------------- t05 sex determination
add('sex-mcq', mcq({
  stem: 'The sex of a human baby is decided by',
  right: 'whether the sperm that fertilises the egg carries an X or a Y chromosome', wrong: ['whether the egg carries an X or a Y chromosome', 'the mother’s age', 'the number of autosomes in the egg'],
  sol: 'All eggs carry X; sperms carry X or Y, so the father’s gamete decides — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('autosome-mcq', mcq({
  stem: 'A human sperm cell normally contains',
  right: '22 autosomes and one sex chromosome', wrong: ['44 autosomes and two sex chromosomes', '23 autosomes and one sex chromosome', '22 autosomes and two sex chromosomes'],
  sol: 'Gametes are haploid: 22 + X or 22 + Y — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('sex-ar', ar({
  a: 'The mother determines the sex of the child.',
  r: 'All the eggs produced by a woman carry an X chromosome.',
  key: 'b',
  sol: 'The assertion is false: the father’s sperm (X or Y) determines the sex. The reason is true — option (b).',
  d: 2, c: 'analysis', t: [5],
}));
add('sex-num', num({
  stem: 'A couple already has three daughters. What is the probability (as a percentage) that their next child will be a son?',
  value: pctOf(0.5), unit: '%',
  sol: 'Each child is independent: half the sperms carry Y, so the chance is 1/2 = 50 percent.',
  scheme: [['50 percent', 1]],
  d: 3, c: 'application', t: [5],
}), (q) => q.answer.value === 50 || 'value');
add('sex-tf', tf({
  stem: 'A man produces two kinds of sperm, those with an X chromosome and those with a Y chromosome, in equal numbers.',
  key: 't',
  sol: 'True. Being XY, he forms X-bearing and Y-bearing sperms in a 1 : 1 ratio.',
  d: 1, c: 'understanding', t: [5],
}));
add('sex-short', short({
  marks: 2,
  stem: 'Give reason: there is an equal chance of a boy or a girl at every birth.',
  model: 'A father makes **X-bearing and Y-bearing sperms in equal numbers**, and the egg always carries **X**. So fertilisation by either kind is **equally likely**, giving XX (girl) or XY (boy).',
  sol: 'Equal X and Y sperms.',
  scheme: [['Equal X and Y sperms', 1], ['Egg always X; XX vs XY', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('sexchrom-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the 22 pairs of chromosomes in a human body cell that are not concerned with sex.',
  model: '**Autosomes.**',
  sol: 'Autosomes.', scheme: [['Autosomes', 1]],
  d: 1, c: 'recall', t: [5],
}));

// ---------------------------------------------------------------- t06 X-linked inheritance
add('carrier-mcq', mcq({
  stem: 'A woman with normal blood clotting whose father had haemophilia is most likely to be',
  right: 'a carrier, with one normal and one faulty X chromosome', wrong: ['haemophilic herself', 'completely free of the haemophilia allele', 'able to pass haemophilia only to her daughters'],
  sol: 'She received her father’s only X, which carries the haemophilia allele, but her mother’s normal X masks it — option (@K).',
  d: 3, c: 'analysis', t: [6],
}));
add('male-mcq', mcq({
  stem: 'Why is colour blindness more common in men than in women?',
  right: 'Men have only one X chromosome, so a single recessive allele shows its effect', wrong: ['The allele is on the Y chromosome', 'Women cannot inherit the allele', 'The allele is dominant in men and recessive in women'],
  sol: 'In males the X has no partner allele to mask it — option (@K).',
  d: 2, c: 'understanding', t: [6],
}));
add('cb-son-mcq', mcq({
  stem: 'A colour-blind man marries a woman who carries no colour-blindness allele. What can be said of their sons?',
  right: 'All will have normal vision, because sons get their X from the mother', wrong: ['All will be colour blind', 'Half will be colour blind', 'All will be carriers'],
  sol: 'Sons get Y from the father and a normal X from the mother — option (@K).',
  d: 3, c: 'application', t: [6],
}));
add('haemo-ar', ar({
  a: 'Haemophilia is very rare in women.',
  r: 'A woman shows haemophilia only if both her X chromosomes carry the recessive allele.',
  key: 'c',
  sol: 'Both are true, and the need for two faulty X chromosomes explains why affected women are rare — option (c).',
  d: 3, c: 'analysis', t: [6],
}));
add('haemo-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: a person who has a recessive disease-causing allele but does not show the disease.',
  model: '**Carrier.**',
  sol: 'Carrier.', scheme: [['Carrier', 1]],
  d: 1, c: 'recall', t: [6],
}));
add('haemo-reason', short({
  marks: 1, wl: null,
  stem: 'Give reason: haemophilia is called a "bleeder’s disease".',
  model: 'Blood of a haemophilic person **does not clot normally**, so even a small cut may **bleed for a long time**.',
  sol: 'Clotting fails.', scheme: [['Failure of clotting', 1]],
  d: 2, c: 'understanding', t: [6],
}));
add('xlink-odd', short({
  marks: 1, wl: null,
  stem: r`Choose the odd one out and name the category to which the other three belong (H = normal clotting, h = haemophilia): $X^hY$, $X^HX^h$, $X^HY$, $X^HX^H$.`,
  model: r`$X^hY$; the others **clot their blood normally** (they do not suffer from haemophilia).`,
  sol: 'XhY is a haemophilic male.', scheme: [['Odd one and category', 1]],
  d: 3, c: 'analysis', t: [6],
}));
add('xlink-short', short({
  marks: 2,
  stem: 'Explain why a haemophilic father never passes haemophilia to his sons.',
  model: 'A father gives his **Y chromosome** to his sons and his **X** to his daughters. The haemophilia allele is on the **X**, so his sons receive his Y and **cannot** get the allele from him; all his daughters become **carriers**.',
  sol: 'Sons get his Y.',
  scheme: [['Sons receive Y from father', 1], ['Allele on X; daughters carriers', 1]],
  d: 3, c: 'analysis', t: [6],
}));
add('xlink-short3', short({
  marks: 3,
  stem: 'A carrier woman marries a man with normal blood clotting. With a cross, show the possible children and state the chance of a haemophilic son.',
  model: r`Mother $X^HX^h$ × father $X^HY$. Gametes: $X^H$, $X^h$ and $X^H$, $Y$. Children: $X^HX^H$ **normal daughter**, $X^HX^h$ **carrier daughter**, $X^HY$ **normal son**, $X^hY$ **haemophilic son**. Chance of a haemophilic son = **1 in 4** (25 percent) of all children.`,
  sol: `Haemophilic son ${pctOf(HAEMO.affectedSon)} percent of all children.`,
  scheme: [['Parental genotypes and gametes', 1], ['Four children correctly classed', 1], ['Chance 1 in 4', 1]],
  d: 3, c: 'application', t: [6],
}));
add('xlink-fill', fill({
  stem: 'Genes for haemophilia and colour blindness are carried on the ______ chromosome.',
  acc: [['X']],
  sol: 'X.',
  d: 1, c: 'recall', t: [6],
}));

// ---------------------------------------------------------------- 5-mark Question 2 style items
add('genetics-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [recessive, 3 : 1, alleles, dominant, segregation, 9 : 3 : 3 : 1, heterozygous, mutation]\n\nA pea plant with genotype Vv is (a) ______ for flower colour. V and v are (b) ______ of the same gene. Since its flowers are violet, V is (c) ______ over v. When such plants are selfed, the F2 shows a ratio of (d) ______, because the two alleles separate during gamete formation; this is the law of (e) ______.',
  acc: [['heterozygous'], ['alleles'], ['dominant'], ['3 : 1', '3:1', '3 to 1'], ['segregation']],
  sol: '(a) heterozygous; (b) alleles; (c) dominant; (d) 3 : 1; (e) segregation.',
  d: 2, c: 'understanding', t: [1, 2, 3],
}));
add('sexlink-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [X, Y, father, mother, carrier, 22, 23, haemophilia]\n\nA human egg contains (a) ______ autosomes and one (b) ______ chromosome. The sex of the baby is decided by the (c) ______. A woman with one faulty X chromosome for (d) ______ clots her blood normally and is called a (e) ______.',
  acc: [['22'], ['X'], ['father'], ['haemophilia'], ['carrier']],
  sol: '(a) 22; (b) X; (c) father; (d) haemophilia; (e) carrier.',
  d: 2, c: 'understanding', t: [5, 6],
}));
add('xcross-match5', match({
  marks: 5,
  stem: 'Study the cross for an X-linked recessive disorder and match each lettered individual with its description.',
  pairs: [
    ['A', 'Carries the faulty allele on one X but does not show the disorder; passes it on'],
    ['B', 'Gives his X to every daughter and his Y to every son'],
    ['C', 'Received a faulty X from the mother; will be a carrier like her'],
    ['D', 'Shows the disorder because his only X carries the faulty allele'],
    ['E', 'Received a normal X from the mother and is unaffected'],
  ],
  order: [3, 1, 4, 0, 2],
  sol: 'A carrier mother; B normal father; C carrier daughter; D affected son; E normal son.',
  d: 3, c: 'application', t: [6],
  assets: [hFig],
}));

// ---------------------------------------------------------------- case-based (10 marks)
add('mono-case', mk.case({
  passage: `In a school garden, Kavya crossed a pure violet-flowered pea plant with a pure white-flowered one. All the F1 plants had violet flowers. She let the F1 plants self-pollinate and grew ${MONO_N} plants from their seeds.`,
  d: 3, c: 'application',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Which flower colour is dominant? Give the evidence.', model: '**Violet**, because **all F1** plants were violet.', sol: 'Violet.', scheme: [['Violet with evidence', 1]], d: 1, c: 'understanding', t: [2] })),
    part('b', short({ marks: 1, wl: null, stem: 'Write the genotype of the F1 plants, using V and v.', model: '**Vv.**', sol: 'Vv.', scheme: [['Vv', 1]], d: 1, c: 'application', t: [3] })),
    part('c', num({ stem: `How many of the ${MONO_N} F2 plants are expected to have violet flowers?`, value: MONO_SPLIT[0], marks: 2, sol: r`Violet is $\tfrac{3}{4}$: $\tfrac{3}{4} \times ${MONO_N} = ${MONO_SPLIT[0]}$.`, scheme: [['Three quarters used', 1], [`${MONO_SPLIT[0]}`, 1]], d: 2, c: 'application', t: [3] })),
    part('d', short({ marks: 3, stem: 'Draw a Punnett square for the F2 and give the phenotypic and genotypic ratios.', model: 'Gametes **V, v** from each F1 parent. Boxes: **VV, Vv, Vv, vv**. Phenotypic ratio **3 violet : 1 white**; genotypic ratio **1 VV : 2 Vv : 1 vv**. The vv plants are the white ones that reappear.', sol: 'Punnett square with both ratios.', scheme: [['Gametes and boxes', 1], ['Phenotypic ratio', 1], ['Genotypic ratio', 1]], d: 2, c: 'application', t: [3] })),
    part('e', short({ marks: 2, stem: 'Name and state the law illustrated by the reappearance of white flowers in the F2.', model: '**Law of segregation**: the two alleles of a gene **separate** at gamete formation, so each gamete carries **only one** allele; white (v) gametes meet to give vv.', sol: 'Law of segregation.', scheme: [['Law named', 1], ['Correctly stated', 1]], d: 2, c: 'understanding', t: [2] }), [
      short({ marks: 2, stem: 'State two reasons why the pea plant was a good choice for this experiment.', model: '1. It has **clearly contrasting** flower colours.\n2. It **self-pollinates** naturally but can be **crossed by hand**, and gives **many seeds** in a short time.', sol: 'Contrasting traits; self-pollination.', scheme: [['First reason', 1], ['Second reason', 1]], d: 1, c: 'recall', t: [2] }),
    ]),
    part('f', short({ marks: 1, wl: null, stem: 'What fraction of the violet F2 plants are heterozygous?', model: '**Two thirds.**', sol: '2 of 3 violet plants are Vv.', scheme: [['Two thirds', 1]], d: 3, c: 'analysis', t: [3] })),
  ],
}));
add('test-case', mk.case({
  passage: `A seed company sells "pure tall" pea seeds. To check a batch, Mr Iyer crossed one tall plant from it with a dwarf plant. Of the ${TEST_N} offspring, about half were tall and half were dwarf.`,
  d: 4, c: 'analysis',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name this type of cross.', model: '**Test cross.**', sol: 'Test cross.', scheme: [['Test cross', 1]], d: 1, c: 'recall', t: [3] })),
    part('b', short({ marks: 1, wl: null, stem: 'Write the genotype of the dwarf plant used.', model: '**tt.**', sol: 'tt.', scheme: [['tt', 1]], d: 1, c: 'application', t: [3] })),
    part('c', num({ stem: `If the tall plant is Tt, how many of the ${TEST_N} offspring are expected to be dwarf?`, value: TEST_SPLIT[1], sol: `Tt × tt gives 1 tall : 1 dwarf, so dwarf = ${TEST_N} ÷ 2 = ${TEST_SPLIT[1]}.`, scheme: [[`${TEST_SPLIT[1]}`, 1]], d: 2, c: 'application', t: [3] })),
    part('d', short({ marks: 3, stem: 'Was the batch truly pure tall? Explain with crosses for both possible genotypes of the tall plant.', model: '**No.** If the tall plant were **TT**, TT × tt would give **all Tt (tall)**. Getting **half dwarf** means it was **Tt**: Tt × tt gives **Tt and tt** in a **1 : 1** ratio. So the batch contains **hybrid** plants.', sol: 'Not pure: Tt.', scheme: [['TT × tt gives all tall', 1], ['Tt × tt gives 1 : 1', 1], ['Conclusion: batch not pure', 1]], d: 4, c: 'evaluation', t: [3] })),
    part('e', short({ marks: 2, stem: 'Why is a dwarf plant, and not a tall one, used to test the batch?', model: 'A dwarf plant is **homozygous recessive (tt)** and gives only **t** gametes, so the offspring’s phenotypes **directly reveal** which allele the tall parent passed on.', sol: 'Recessive parent reveals genotype.', scheme: [['Homozygous recessive', 1], ['Offspring reveal parent’s gametes', 1]], d: 3, c: 'analysis', t: [3] })),
    part('f', short({ marks: 2, stem: 'Distinguish between genotype and phenotype using Mr Iyer’s tall plant.', model: 'Its **phenotype** is what is seen: **tall**. Its **genotype** is its allele pair: **Tt**, which was revealed only by the cross.', sol: 'Tall vs Tt.', scheme: [['Phenotype tall', 1], ['Genotype Tt', 1]], d: 2, c: 'understanding', t: [1] })),
  ],
}));
add('di-case', mk.case({
  stem: 'Study the Punnett square and answer the questions.',
  passage: `A plant breeder crossed a pure tall, violet-flowered pea plant (TTVV) with a pure dwarf, white-flowered plant (ttvv). The F1 was selfed and ${DI_N} F2 plants were raised. The Punnett square for the F1 × F1 cross is shown.`,
  d: 3, c: 'analysis',
  assets: [diFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Write the genotype and phenotype of the F1 plants.', model: '**TtVv**; **tall with violet flowers**.', sol: 'TtVv, tall violet.', scheme: [['Genotype and phenotype', 1]], d: 1, c: 'application', t: [4] })),
    part('b', short({ marks: 2, stem: 'List the four kinds of gametes formed by the F1 and the law they illustrate.', model: 'The F1 forms **TV, Tv, tV and tv** gametes in **equal numbers**, because the two genes are sorted into gametes separately. They show the **law of independent assortment**.', sol: 'Four gametes; independent assortment.', scheme: [['Four gametes', 1], ['Law named', 1]], d: 2, c: 'understanding', t: [4, 2] })),
    part('c', num({ stem: `How many of the ${DI_N} F2 plants are expected to be dwarf with white flowers?`, value: DI_SPLIT[3], sol: r`Dwarf white is $\tfrac{1}{16}$: $\tfrac{1}{16} \times ${DI_N} = ${DI_SPLIT[3]}$.`, scheme: [[`${DI_SPLIT[3]}`, 1]], d: 2, c: 'application', t: [4] })),
    part('d', short({ marks: 3, stem: 'Give the F2 phenotypes with their ratio, and name the two that are new combinations.', model: `**Tall violet 9, tall white 3, dwarf violet 3, dwarf white 1** (${DI_R.join(' : ')}). **Tall white** and **dwarf violet** are new combinations, not seen in the parents.`, sol: '9:3:3:1; recombinants.', scheme: [['Four phenotypes', 1], ['Ratio', 1], ['Two new combinations', 1]], d: 2, c: 'application', t: [4] })),
    part('e', short({ marks: 2, stem: 'If the two genes were always inherited together, how many kinds of F2 plants would there be? What does the actual result show?', model: 'Only **two kinds** (tall violet and dwarf white, 3 : 1). The appearance of **four kinds** shows the genes are inherited **independently**.', sol: 'Two vs four kinds.', scheme: [['Two kinds', 1], ['Independent inheritance', 1]], d: 4, c: 'analysis', t: [4] })),
    part('f', short({ marks: 1, wl: null, stem: 'What is the phenotypic ratio of tall to dwarf plants alone in this F2?', model: '**3 : 1** (12 tall : 4 dwarf).', sol: '3 : 1.', scheme: [['3 : 1', 1]], d: 3, c: 'analysis', t: [3, 4] })),
  ],
}));
add('sex-case', mk.case({
  passage: 'Mr and Mrs Bhatt have two daughters. An elderly relative blames Mrs Bhatt for not having a son and says the next baby will "surely" be a boy. Their family doctor draws a chart of the chromosomes in eggs and sperms to explain the facts.',
  d: 3, c: 'application',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Write the sex chromosomes present in Mrs Bhatt’s body cells.', model: '**XX.**', sol: 'XX.', scheme: [['XX', 1]], d: 1, c: 'recall', t: [5] })),
    part('b', short({ marks: 1, wl: null, stem: 'How many autosomes are present in each of Mr Bhatt’s sperms?', model: '**22.**', sol: '22.', scheme: [['22', 1]], d: 2, c: 'application', t: [5] })),
    part('c', short({ marks: 3, stem: 'With a labelled chart, explain who decides the sex of the child.', model: 'Mother **44 + XX** gives eggs all **22 + X**. Father **44 + XY** gives sperms **22 + X** or **22 + Y** in equal numbers. **X sperm + egg → 44 + XX, girl**; **Y sperm + egg → 44 + XY, boy**. So the **father’s sperm** decides the sex.', sol: 'Father decides.', scheme: [['Gametes of both parents', 1], ['Both fertilisations shown', 1], ['Conclusion: father', 1]], d: 2, c: 'understanding', t: [5] })),
    part('d', num({ stem: 'What is the chance (as a percentage) that the next baby will be a boy?', value: 50, unit: '%', sol: 'Half the sperms carry Y, so 50 percent.', scheme: [['50 percent', 1]], d: 2, c: 'application', t: [5] })),
    part('e', short({ marks: 2, stem: 'Is the relative right that the next baby will "surely" be a boy? Give a reason.', model: '**No.** Each birth is **independent**: the chance of a boy is **one half every time**, whatever the sex of earlier children.', sol: 'No; independent events.', scheme: [['No', 1], ['Independent 1/2 each time', 1]], d: 3, c: 'evaluation', t: [5] })),
    part('f', short({ marks: 2, stem: 'Distinguish between autosomes and sex chromosomes.', model: '**Autosomes** (22 pairs) carry genes for **body characters** and are alike in both sexes. **Sex chromosomes** (one pair, XX or XY) **determine sex** and differ between males and females.', sol: 'Function and number.', scheme: [['Autosomes', 1], ['Sex chromosomes', 1]], d: 2, c: 'understanding', t: [5] })),
  ],
}));
add('haemo-case', mk.case({
  stem: 'Study the diagram and answer the questions.',
  passage: 'Rohan bleeds for a long time after small cuts and has been diagnosed with haemophilia. Neither of his parents has the disorder. The diagram shows the cross between his parents, with individuals lettered A to E.',
  d: 3, c: 'analysis',
  assets: [hFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Which letter in the diagram represents Rohan?', model: '**D** (the son with only a faulty X).', sol: 'D.', scheme: [['D', 1]], d: 2, c: 'application', t: [6] })),
    part('b', short({ marks: 1, wl: null, stem: 'From which parent did Rohan inherit the haemophilia allele?', model: 'From his **mother (A)**, who is a carrier.', sol: 'Mother.', scheme: [['Mother', 1]], d: 2, c: 'understanding', t: [6] })),
    part('c', num({ stem: 'What percentage of this couple’s children are expected to be haemophilic sons?', value: pctOf(HAEMO.affectedSon), unit: '%', sol: `One of the four boxes: ${pctOf(HAEMO.affectedSon)} percent.`, scheme: [[`${pctOf(HAEMO.affectedSon)} percent`, 1]], d: 2, c: 'application', t: [6] })),
    part('d', short({ marks: 2, stem: 'Rohan’s sister is C. Why does she not suffer from haemophilia, and what risk does she carry?', model: 'Her **normal X** from the father **masks** the recessive allele, so she clots normally. She is a **carrier** and may pass the allele to **half her sons**.', sol: 'Carrier.', scheme: [['Masked by normal X', 1], ['Carrier risk to sons', 1]], d: 3, c: 'analysis', t: [6] })),
    part('e', short({ marks: 3, stem: 'Rohan, when grown up, marries a woman who carries no haemophilia allele. Work out what their sons and daughters will be.', model: r`Rohan $X^hY$ × wife $X^HX^H$. Daughters get $X^h$ from him and $X^H$ from her: **all carriers** ($X^HX^h$), none affected. Sons get **Y** from him and $X^H$ from her: **all normal** ($X^HY$).`, sol: 'Daughters carriers; sons normal.', scheme: [['Genotypes and gametes', 1], ['Daughters all carriers', 1], ['Sons all normal', 1]], d: 3, c: 'application', t: [6] }), [
      short({ marks: 3, stem: 'Explain why X-linked recessive disorders such as haemophilia appear far more often in men than in women.', model: 'A man has **one X**; a single recessive allele on it **shows its effect**, as the Y has **no matching allele**. A woman needs the allele on **both X chromosomes**, which is far **less likely**; with one copy she is only a **carrier**.', sol: 'One X in males.', scheme: [['Men have one X', 1], ['No masking allele on Y', 1], ['Women need two copies', 1]], d: 3, c: 'analysis', t: [6] }),
    ]),
    part('f', short({ marks: 2, stem: 'Name one other X-linked disorder in your syllabus and state its main symptom.', model: '**Colour blindness** (red–green). The affected person **cannot tell red from green** colours, for example in traffic lights or coloured wires, although other vision is normal.', sol: 'Colour blindness.', scheme: [['Name', 1], ['Symptom', 1]], d: 1, c: 'recall', t: [6] })),
  ],
}));
add('cb-case', mk.case({
  passage: 'Mr Sen is red–green colour blind. His wife has normal vision and no colour-blind relatives. Their daughter Riya, who has normal vision, later marries Kunal, who also has normal vision.',
  d: 3, c: 'analysis',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Write Mr Sen’s genotype, using C for normal vision and c for colour blindness.', model: r`$X^cY$.`, sol: 'XcY.', scheme: [['XcY', 1]], d: 2, c: 'application', t: [6] })),
    part('b', num({ stem: 'What percentage of Mr and Mrs Sen’s daughters are expected to be carriers?', value: 100, unit: '%', sol: 'Every daughter receives his only X (with c) and a normal X from her mother: 100 percent carriers.', scheme: [['100 percent', 1]], d: 3, c: 'application', t: [6] })),
    part('c', short({ marks: 2, stem: 'Explain why none of Mr Sen’s sons will be colour blind.', model: 'Sons receive the **Y chromosome** from the father and an **X from the mother**. Mrs Sen’s X chromosomes are **normal**, so the sons have **normal vision**.', sol: 'Y from father.', scheme: [['Y from father', 1], ['Normal X from mother', 1]], d: 2, c: 'understanding', t: [6] })),
    part('d', short({ marks: 3, stem: 'Work out the chance that a son of Riya and Kunal will be colour blind.', model: r`Riya is a carrier $X^CX^c$; Kunal is $X^CY$. Sons get Y from Kunal and $X^C$ or $X^c$ from Riya. So **half of their sons** ($X^cY$) are expected to be **colour blind** (50 percent of sons).`, sol: 'One half of sons.', scheme: [['Riya is a carrier', 1], ['Sons get X from mother', 1], ['Half the sons', 1]], d: 4, c: 'analysis', t: [6] })),
    part('e', short({ marks: 2, stem: 'Give reason: Riya’s vision is normal although she carries the colour-blindness allele.', model: 'The allele is **recessive**; her other X carries the **dominant normal allele (C)**, which **masks** it.', sol: 'Masked by normal allele.', scheme: [['Recessive', 1], ['Masked by normal X', 1]], d: 2, c: 'understanding', t: [6] })),
    part('f', short({ marks: 1, wl: null, stem: 'Name the chromosome on which the colour-blindness gene lies.', model: 'The **X chromosome**.', sol: 'X.', scheme: [['X', 1]], d: 1, c: 'recall', t: [6] })),
  ],
}));

// ---------------------------------------------------------------- further bank items
add('f1-mcq', mcq({
  stem: 'A pure tall pea plant (TT) is crossed with a pure dwarf plant (tt). The F1 plants will be',
  right: 'all tall, with genotype Tt', wrong: ['all dwarf, with genotype tt', 'half tall and half dwarf', 'of medium height, with genotype Tt'],
  sol: 'Every F1 plant gets T from one parent and t from the other: Tt, tall because T is dominant — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('cb-daughter-mcq', mcq({
  stem: 'A colour-blind woman marries a man with normal vision. Which statement about their children is correct?',
  right: 'All sons will be colour blind and all daughters will be carriers', wrong: ['All children will have normal vision', 'Only daughters will be colour blind', 'Half the sons and half the daughters will be colour blind'],
  sol: 'Every son gets one of her faulty X chromosomes; every daughter also gets the father’s normal X, which masks the allele — option (@K).',
  d: 4, c: 'analysis', t: [6],
}));
add('mutation-tf', tf({
  stem: 'A mutation in a body (skin) cell is passed on to the person’s children.',
  key: 'f',
  sol: 'False. Only mutations in the cells that form gametes can be inherited; a skin-cell mutation is not passed on.',
  d: 3, c: 'analysis', t: [1],
}));
add('domrec-short', short({
  marks: 2,
  stem: 'Differentiate between a dominant and a recessive allele, giving one example of each from pea flower colour.',
  model: 'A **dominant** allele shows its effect even when **only one copy** is present, as **V (violet)** in Vv. A **recessive** allele shows its effect only when **both copies** are present, as **v (white)** in vv.',
  sol: 'One copy vs two copies; V and v.',
  scheme: [['Dominant with example', 1], ['Recessive with example', 1]],
  d: 2, c: 'understanding', t: [1],
}));
