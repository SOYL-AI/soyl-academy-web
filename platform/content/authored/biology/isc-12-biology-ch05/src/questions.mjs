// ISC 12 Biology ch05 Principles of Inheritance — question bank in ISC style. Every ratio, count and probability is
// computed by the Punnett engine in calc.mjs. AR keys (ISC options): a b c d.
import { mk, add, svgV, r } from '../../isc-12-biology-ch01/src/lib.mjs';
import { gametes, cross, phenoRatio, ratio, abo, expect, recombination, polyClasses, polyExtreme } from './calc.mjs';
import { PED_AD, PED_AR } from './svgs.mjs';

const { mcq, ar, fill, num, short, long, part } = mk;
const adFig = svgV(PED_AD, 'Three-generation pedigree with individuals numbered by generation');
const arFig = svgV(PED_AR, 'Two-generation pedigree with related parents and two affected children');
const p = (map, k) => map.get(k) ?? 0;

// ---------------------------------------------------------------- t01 terms and Mendel
add('homologous-mcq', mcq({
  stem: 'Homologous chromosomes are best described as',
  right: 'a pair of chromosomes, one from each parent, carrying the same genes at the same loci',
  wrong: ['two identical copies of a chromosome joined at the centromere', 'any two chromosomes of the same size', 'chromosomes that determine sex only'],
  sol: 'Homologues are inherited one from each parent and carry the same genes in the same positions — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('traits-mcq', mcq({
  stem: 'Which of these was NOT one of the seven pairs of contrasting characters studied by Mendel in pea?',
  right: 'Leaf shape (broad or narrow)',
  wrong: ['Flower position (axial or terminal)', 'Pod shape (inflated or constricted)', 'Seed colour (yellow or green)'],
  sol: 'Mendel’s seven pairs were stem height, flower colour, flower position, pod shape, pod colour, seed shape and seed colour — option (@K).',
  d: 2, c: 'recall', t: [1],
}));
add('trueline-mcq', mcq({
  stem: 'A gardener self-pollinates a pea plant for several generations, and every generation shows only white flowers. The plant belongs to a',
  right: 'true-breeding line, homozygous for the flower-colour gene',
  wrong: ['heterozygous line that will soon produce violet flowers', 'line showing incomplete dominance', 'polygenic line'],
  sol: 'Stable inheritance over many generations of selfing shows a true-breeding (homozygous) line — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('pea-short', short({
  marks: 1,
  stem: 'Give a reason: Pea plants are easy to use for producing true-breeding lines.',
  model: 'Pea flowers are naturally **self-pollinating**, so continued selfing gives **homozygous, true-breeding** lines.',
  sol: 'Self-pollination.',
  scheme: [['Natural self-pollination gives pure lines', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('genotype-short', short({
  marks: 2,
  stem: 'Distinguish between (i) genotype and phenotype, and (ii) homozygous and heterozygous, using the pea height gene as the example.',
  model: '(i) **Genotype** is the genetic make-up, e.g. **TT, Tt, tt**; **phenotype** is the observable character, e.g. **tall** or **dwarf**. (ii) A **homozygous** plant has **identical alleles** (TT or tt); a **heterozygous** plant has **different alleles** (Tt) and is tall because T is dominant.',
  sol: 'Two distinctions with examples.',
  scheme: [['Genotype vs phenotype', 1], ['Homozygous vs heterozygous', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('mendel-short', short({
  marks: 3,
  stem: 'Give three reasons why Mendel succeeded where earlier workers on heredity had failed.',
  model: '1. He chose the **garden pea**: easy to grow, short life cycle, naturally **self-pollinating** with **true-breeding lines**, and easy to cross artificially.\n2. He studied **one or two clear contrasting characters** at a time.\n3. He used **large samples**, kept careful records and applied **statistics** to his counts. (Also, his characters happened to assort independently.)',
  sol: 'Three reasons.',
  scheme: [['Choice of pea', 1], ['One or two characters at a time', 1], ['Large samples and statistics', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 monohybrid, dihybrid, test cross
{
  const t = ratio(phenoRatio('Tt', 'tt'), ['D', 'r']);
  add('testcross-mcq', mcq({
    stem: 'What phenotypic ratio is expected when a heterozygous tall pea plant (Tt) is test-crossed?',
    right: `${t.join(' tall : ')} dwarf`,
    wrong: ['3 tall : 1 dwarf', 'All tall', '1 tall : 2 medium : 1 dwarf'],
    sol: 'Tt × tt gives Tt and tt in equal numbers — option (@K).',
    d: 2, c: 'application', t: [2],
  }), (q) => (t[0] === 1 && t[1] === 1) || 'ratio');
}
add('dominance-mcq', mcq({
  stem: 'In a cross between true-breeding tall and dwarf pea plants, all F1 plants are tall. Which principle explains this?',
  right: 'Law of dominance',
  wrong: ['Law of independent assortment', 'Incomplete dominance', 'Linkage'],
  sol: 'Only the dominant allele is expressed in the heterozygous F1 — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('f1-mcq', mcq({
  stem: 'A true-breeding violet-flowered pea (VV) is crossed with a white-flowered pea (vv). What is the genotype of every F1 plant?',
  right: 'Vv',
  wrong: ['VV', 'vv', 'VV and vv in equal numbers'],
  sol: 'Each F1 receives V from one parent and v from the other — option (@K).',
  d: 1, c: 'application', t: [2],
}), (q) => cross('VV', 'vv').get('Vv') === 1 || 'genotype');
add('backcross-mcq', mcq({
  stem: 'A cross between an F1 hybrid and one of its parents is called a',
  right: 'back cross',
  wrong: ['dihybrid cross', 'reciprocal cross', 'monohybrid F2'],
  sol: 'A cross of the F1 with either parent is a back cross; with the recessive parent it is also a test cross — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
{
  const f = p(phenoRatio('RrYy', 'RrYy'), 'rr');
  add('dihybrid-mcq', mcq({
    stem: 'In the F2 of a dihybrid cross RrYy × RrYy, what fraction of plants have wrinkled green seeds (rryy)?',
    right: '1/16',
    wrong: ['3/16', '9/16', '1/4'],
    sol: 'Only the ry gamete from each parent gives rryy: 1/4 × 1/4 = 1/16 — option (@K).',
    d: 2, c: 'application', t: [2],
  }), () => Math.abs(f - 1 / 16) < 1e-12 || 'fraction');
}
add('newcomb-mcq', mcq({
  stem: 'In the F2 of a cross between round yellow (RRYY) and wrinkled green (rryy) peas, which phenotypes are new combinations not seen in either parent?',
  right: 'Round green and wrinkled yellow',
  wrong: ['Round yellow and wrinkled green', 'Round yellow only', 'Wrinkled green only'],
  sol: 'Round green and wrinkled yellow appear because the two genes assort independently — option (@K).',
  d: 2, c: 'application', t: [2],
}));
{
  const n = gametes('RrYy').length;
  add('gametes-num', num({
    stem: 'How many genetically different kinds of gametes does a pea plant of genotype RrYy produce?',
    value: n,
    sol: r`Each gene contributes 2 alleles: $2 \times 2 = ${n}$ kinds (RY, Ry, rY, ry).`,
    scheme: [[`${n}`, 1]],
    d: 1, c: 'application', t: [2],
  }), (q) => q.answer.value === 4 || 'value');
}
{
  const n = gametes('AaBbCc').length;
  add('gametes3-num', num({
    stem: 'How many kinds of gametes can a plant heterozygous for three unlinked genes (AaBbCc) produce?',
    value: n,
    sol: r`$2^3 = ${n}$ kinds of gametes.`,
    scheme: [[`${n}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 8 || 'value');
}
{
  const dw = expect(p(phenoRatio('Tt', 'Tt'), 'r'), 800);
  add('mono-num', num({
    stem: 'An F2 from a cross of tall (Tt) × tall (Tt) pea plants contains 800 plants. How many are expected to be dwarf?',
    value: dw,
    sol: r`Dwarf (tt) $= \dfrac{1}{4} \times 800 = ${dw}$.`,
    scheme: [[`${dw}`, 1]],
    d: 1, c: 'application', t: [2],
  }), (q) => q.answer.value === 200 || 'value');
}
{
  const rg = expect(p(phenoRatio('RrYy', 'RrYy'), 'Dr'), 1600);
  add('di-num', num({
    stem: 'A dihybrid F2 (RrYy × RrYy) contains 1600 seeds. How many round green seeds are expected?',
    value: rg,
    sol: r`Round green $= \dfrac{3}{16} \times 1600 = ${rg}$.`,
    scheme: [[`${rg}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 300 || 'value');
}
{
  const het = p(cross('Tt', 'Tt'), 'Tt') / (1 - p(cross('Tt', 'Tt'), 'tt'));
  add('tallhet-num', num({
    stem: 'Among the tall plants of a monohybrid F2 (Tt × Tt), what fraction is heterozygous? Give your answer to two decimal places.',
    value: Math.round(het * 100) / 100, tol: 0.005,
    sol: r`Tall plants are TT (1) and Tt (2) out of 3: $\dfrac{2}{3} \approx ${(Math.round(het * 100) / 100).toFixed(2)}$.`,
    scheme: [['0.67 (two-thirds)', 1]],
    d: 4, c: 'analysis', t: [2],
  }), (q) => Math.abs(q.answer.value - 0.67) < 1e-9 || 'value');
}
add('segregation-ar', ar({
  a: 'When violet-flowered (VV) and white-flowered (vv) pea plants are crossed and the violet F1 is selfed, about one-quarter of the F2 plants bear white flowers.',
  r: 'Each Vv plant forms gametes carrying either V or v in equal numbers, because the two alleles separate during gamete formation without blending.',
  key: 'a',
  sol: 'Both are true; equal V and v gametes from each F1 parent give vv in one-quarter of the F2, so segregation explains the white flowers — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('testcross-short', short({
  marks: 2,
  stem: 'A violet-flowered pea plant may be VV or Vv. Describe how a test cross can reveal its genotype, giving the expected results.',
  model: `Cross it with a **white-flowered (vv)** plant. If **all offspring are violet**, the plant is **VV**; if violet and white appear in a **${ratio(phenoRatio('Vv', 'vv'), ['D', 'r']).join(' : ')}** ratio, it is **Vv**, because it passed on v to half its gametes.`,
  sol: 'Cross with recessive; two outcomes.',
  scheme: [['Cross with homozygous recessive', 1], ['Both possible results with conclusions', 1]],
  d: 2, c: 'application', t: [2],
}));
add('law-short', short({
  marks: 2,
  stem: 'State the law of independent assortment and explain how a dihybrid F1 obeys it.',
  model: 'When two pairs of traits are combined in a hybrid, the **segregation of one pair is independent of the other**. An RrYy F1 therefore forms **four kinds of gametes** — **RY, Ry, rY, ry** — in **equal** proportions, giving the **9 : 3 : 3 : 1** F2 ratio.',
  sol: 'Statement; four gametes.',
  scheme: [['Statement of the law', 1], ['Four equal gametes of RrYy', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('mono-short', short({
  marks: 3,
  stem: 'Using a Punnett square, work out the F2 phenotypic and genotypic ratios of a cross between true-breeding tall (TT) and dwarf (tt) pea plants.',
  model: `**P:** TT × tt → gametes **T** and **t** → **F1 Tt** (all tall).\n\n**F1 × F1:** Tt × Tt; gametes **T, t** from each.\n\n**Punnett square:** TT, Tt, Tt, tt.\n\nPhenotypes: **tall : dwarf = ${ratio(phenoRatio('Tt', 'Tt'), ['D', 'r']).join(' : ')}**; genotypes: **TT : Tt : tt = ${ratio(cross('Tt', 'Tt'), ['TT', 'Tt', 'tt']).join(' : ')}**.`,
  sol: 'F1 then F2 with both ratios.',
  scheme: [['F1 genotype with gametes', 1], ['Punnett square', 1], ['Both ratios', 1]],
  wl: [30, 96],
  d: 2, c: 'application', t: [2],
}));
add('di-short', short({
  marks: 3,
  stem: 'Explain why the dihybrid F2 ratio 9 : 3 : 3 : 1 can be obtained by multiplying two monohybrid ratios. What does this show about the two genes?',
  model: 'Considered separately, seed shape gives **3 round : 1 wrinkled** and seed colour **3 yellow : 1 green** in the F2. If the genes are inherited **independently**, the probability of each combination is the **product** of the separate probabilities: (3 : 1) × (3 : 1) = **9 : 3 : 3 : 1**. This shows that the two genes **assort independently**, as they lie on **different chromosomes** (or far apart).',
  sol: 'Product rule; independent assortment.',
  scheme: [['Separate 3 : 1 ratios', 1], ['Product gives 9 : 3 : 3 : 1', 1], ['Genes assort independently', 1]],
  d: 3, c: 'analysis', t: [2],
}));
add('di-long', long({
  stem: '(a) Pure-breeding pea plants with round yellow seeds (RRYY) are crossed with plants with wrinkled green seeds (rryy). Show the F1 and the gametes it forms. [2]\n(b) Work out the F2 phenotypic ratio and state the law it illustrates. [2]\n(c) How would you confirm that an F2 round yellow plant is RrYy? [1]',
  model: `(a) P: RRYY × rryy; gametes **RY** and **ry**; **F1 RrYy**, all round yellow. The F1 forms **four** kinds of gametes in equal numbers: **RY, Ry, rY, ry**.\n\n(b) A 4 × 4 Punnett square of these gametes gives **${ratio(phenoRatio('RrYy', 'RrYy'), ['DD', 'Dr', 'rD', 'rr']).join(' : ')}** — round yellow : round green : wrinkled yellow : wrinkled green. It illustrates the **law of independent assortment**.\n\n(c) **Test-cross** it with **rryy**: an RrYy plant gives round yellow, round green, wrinkled yellow and wrinkled green in **${ratio(phenoRatio('RrYy', 'rryy'), ['DD', 'Dr', 'rD', 'rr']).join(' : ')}**.`,
  sol: 'F1 and gametes; F2 ratio and law; test cross.',
  scheme: [['(a) F1 genotype', 1], ['(a) Four gametes', 1], ['(b) 9 : 3 : 3 : 1', 1], ['(b) Independent assortment', 1], ['(c) Test cross giving 1 : 1 : 1 : 1', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [2],
}), () => ratio(phenoRatio('RrYy', 'rryy'), ['DD', 'Dr', 'rD', 'rr']).join(':') === '1:1:1:1' || 'ratio');

// ---------------------------------------------------------------- t03 incomplete dominance, codominance, multiple alleles
add('snap-mcq', mcq({
  stem: 'In snapdragon, a cross between true-breeding red-flowered and white-flowered plants gives pink-flowered F1 plants. This is an example of',
  right: 'incomplete dominance',
  wrong: ['codominance', 'pleiotropy', 'polygenic inheritance'],
  sol: 'The heterozygote is intermediate because neither allele is completely dominant — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('groupO-mcq', mcq({
  stem: 'Which genotype gives blood group O?',
  right: 'ii',
  wrong: ['IᴬIᴮ', 'Iᴬi', 'IᴮIᴮ'],
  sol: 'Group O has neither Iᴬ nor Iᴮ: genotype ii — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
{
  const m = abo('AB', 'OO');
  add('abo-mcq', mcq({
    stem: 'A man of blood group AB marries a woman of blood group O. Which blood groups can their children have?',
    right: 'A or B only',
    wrong: ['AB or O only', 'A, B, AB or O', 'O only'],
    sol: 'Gametes Iᴬ or Iᴮ from the father and i from the mother give Iᴬi (A) or Iᴮi (B) — option (@K).',
    d: 2, c: 'application', t: [3],
  }), () => (p(m, 'A') === 0.5 && p(m, 'B') === 0.5) || 'groups');
}
add('codom-mcq', mcq({
  stem: 'Why is blood group AB an example of codominance?',
  right: 'Both Iᴬ and Iᴮ are fully expressed in the same person.',
  wrong: ['Iᴬ is dominant over Iᴮ.', 'The person shows an intermediate sugar between A and B.', 'Allele i is expressed.'],
  sol: 'In IᴬIᴮ both alleles produce their sugars: codominance — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('multi-mcq', mcq({
  stem: 'How many different genotypes are possible for the ABO blood group gene in a population?',
  right: 'Six',
  wrong: ['Three', 'Four', 'Nine'],
  sol: 'Three alleles give IᴬIᴬ, Iᴬi, IᴮIᴮ, Iᴮi, IᴬIᴮ and ii — six genotypes — option (@K).',
  d: 2, c: 'application', t: [3],
}));
{
  const pink = expect(p(phenoRatio('Rr', 'Rr', [0]), 'Aa'), 400);
  add('snap-num', num({
    stem: 'A snapdragon F2 from pink × pink (Rr × Rr) has 400 plants. How many are expected to be pink?',
    value: pink,
    sol: r`Pink (Rr) $= \dfrac{2}{4} \times 400 = ${pink}$.`,
    scheme: [[`${pink}`, 1]],
    d: 2, c: 'application', t: [3],
  }), (q) => q.answer.value === 200 || 'value');
}
{
  const o = p(abo('AO', 'BO'), 'O');
  add('abo-num', num({
    stem: 'Parents of genotypes Iᴬi and Iᴮi have a child. What is the probability that the child has blood group O? Give a decimal.',
    value: o, tol: 0.001,
    sol: r`Child must receive i from both: $\dfrac{1}{2} \times \dfrac{1}{2} = ${o}$.`,
    scheme: [[`${o}`, 1]],
    d: 2, c: 'application', t: [3],
  }), (q) => q.answer.value === 0.25 || 'value');
}
add('snap-ar', ar({
  a: 'In snapdragon, the phenotypic ratio of the F2 is the same as its genotypic ratio.',
  r: 'Snapdragon is commonly called the dog flower.',
  key: 'b',
  sol: 'Both statements are true, but the common name does not explain the ratio, which follows from incomplete dominance — option (b).',
  d: 3, c: 'analysis', t: [3],
}));
add('abo-ar', ar({
  a: 'Blood group AB is an example of codominance.',
  r: 'Alleles Iᴬ and Iᴮ are both recessive to allele i.',
  key: 'c',
  sol: 'A is true. R is false: Iᴬ and Iᴮ are dominant over i — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
add('blend-short', short({
  marks: 1,
  stem: 'Give a reason: The pink F1 of snapdragon does not prove that the parental alleles have blended.',
  model: 'Red and white flowers **reappear unchanged** in the F2, so the alleles stayed separate.',
  sol: 'Parental types reappear.',
  scheme: [['Red and white reappear in F2', 1]],
  d: 3, c: 'analysis', t: [3],
}));
add('abo-short', short({
  marks: 2,
  stem: 'A child of blood group O is born to a mother of group A. Could a man of group AB be the father? Explain.',
  model: '**No.** A group O child is **ii** and must receive **i from each parent**. A man of group **AB (IᴬIᴮ)** has **no i allele**, so he can pass on only Iᴬ or Iᴮ and cannot be the father.',
  sol: 'AB father cannot give i.',
  scheme: [['Child ii needs i from each parent', 1], ['AB has no i: excluded', 1]],
  d: 3, c: 'application', t: [3],
}));
add('incomplete-short', short({
  marks: 3,
  stem: 'Using a Punnett square, explain the F2 of a cross between true-breeding red (RR) and white (rr) snapdragons. How does it differ from Mendel’s monohybrid result?',
  model: `P: RR × rr → F1 **Rr (pink)**. F1 × F1: Rr × Rr; gametes R, r from each. F2: **RR (red) : Rr (pink) : rr (white) = ${ratio(phenoRatio('Rr', 'Rr', [0]), ['AA', 'Aa', 'aa']).join(' : ')}**.\n\nIn Mendel’s tall × dwarf cross the F2 phenotypic ratio was **3 : 1**, because T is completely dominant. Here the heterozygote is **intermediate**, so the **phenotypic ratio equals the genotypic ratio 1 : 2 : 1**.`,
  sol: 'Cross; comparison.',
  scheme: [['F1 pink Rr', 1], ['F2 1 : 2 : 1 with phenotypes', 1], ['Comparison with 3 : 1', 1]],
  wl: [30, 96],
  d: 2, c: 'application', t: [3],
}));
add('deviation-long', long({
  stem: '(a) Distinguish between incomplete dominance and codominance, with one example of each. [2]\n(b) A woman of blood group A whose father was group O marries a man of group B whose mother was group O. Work out the possible blood groups of their children and their probabilities. [3]',
  model: `(a) In **incomplete dominance** the heterozygote shows an **intermediate** phenotype, e.g. **pink** snapdragon (Rr) from red and white. In **codominance** **both alleles are fully expressed** in the heterozygote, e.g. blood group **AB** (IᴬIᴮ).\n\n(b) The woman received i from her group O father, so she is **Iᴬi**; the man received i from his group O mother, so he is **Iᴮi**. Gametes: Iᴬ, i and Iᴮ, i. Children: **IᴬIᴮ (AB), Iᴬi (A), Iᴮi (B), ii (O)**, each with probability **${p(abo('AO', 'BO'), 'A')}** (1 : 1 : 1 : 1).`,
  sol: 'Distinction; cross with probabilities.',
  scheme: [['(a) Incomplete dominance with example', 1], ['(a) Codominance with example', 1], ['(b) Parents Iᴬi and Iᴮi', 1], ['(b) Four groups', 1], ['(b) Each 1/4', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [3],
}), () => ['A', 'B', 'AB', 'O'].every((k) => p(abo('AO', 'BO'), k) === 0.25) || 'probabilities');

// ---------------------------------------------------------------- t04 polygenic inheritance and pleiotropy
add('poly-mcq', mcq({
  stem: 'Human skin colour shows a continuous range of shades. This is because it is',
  right: 'controlled by several genes with additive effects (polygenic)',
  wrong: ['controlled by one gene with two codominant alleles', 'a pleiotropic effect of one gene', 'determined only by the environment'],
  sol: 'Skin colour is polygenic: each dominant allele adds a small amount of pigment — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('pleio-mcq', mcq({
  stem: 'A single mutation in the gene for phenylalanine hydroxylase causes both mental retardation and reduced pigmentation of hair and skin. This illustrates',
  right: 'pleiotropy',
  wrong: ['polygenic inheritance', 'codominance', 'linkage'],
  sol: 'One gene with several phenotypic effects is pleiotropic — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('starch-mcq', mcq({
  stem: 'In pea, BB plants have round seeds with large starch grains, bb plants wrinkled seeds with small grains, and Bb plants round seeds with intermediate grains. What does this show?',
  right: 'Whether an allele seems dominant depends on which phenotype is considered.',
  wrong: ['B is always completely dominant.', 'Seed shape is polygenic.', 'Starch grain size is controlled by the environment only.'],
  sol: 'For seed shape B is dominant, but for grain size Bb is intermediate — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
{
  const k = 2, c = polyClasses(k);
  add('polyclass-num', num({
    stem: 'A character is controlled by two additive genes. How many phenotypic classes are expected in the F2 of AaBb × AaBb?',
    value: c,
    sol: r`Number of dominant alleles 0 to 4: $2k + 1 = 2 \times 2 + 1 = ${c}$ classes.`,
    scheme: [[`${c}`, 1]],
    d: 3, c: 'application', t: [4],
  }), (q) => q.answer.value === 5 || 'value');
}
{
  const f = polyExtreme(2);
  add('polyextreme-num', num({
    stem: 'For a character controlled by two additive genes, what fraction of the F2 of AaBb × AaBb is expected to be AABB? Give a decimal.',
    value: f, tol: 0.0001,
    sol: r`$\left(\dfrac{1}{4}\right)^2 = ${f}$.`,
    scheme: [[`${f}`, 1]],
    d: 3, c: 'application', t: [4],
  }), (q) => q.answer.value === 0.0625 || 'value');
}
add('poly-short', short({
  marks: 2,
  stem: 'Distinguish between polygenic inheritance and pleiotropy, with one human example of each.',
  model: 'In **polygenic inheritance**, **several genes** with additive effects control **one character**, giving continuous variation, e.g. **skin colour**. In **pleiotropy**, **one gene** affects **several characters**, e.g. the phenylalanine hydroxylase gene in **phenylketonuria**.',
  sol: 'Many genes one trait vs one gene many traits.',
  scheme: [['Polygenic with example', 1], ['Pleiotropy with example', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('pleio-short', short({
  marks: 3,
  stem: 'Explain how the starch-synthesis gene of pea shows both pleiotropy and the dependence of dominance on the phenotype considered.',
  model: 'Gene **B** controls starch synthesis and affects **two characters**: **starch grain size** and **seed shape** (pleiotropy). **BB** makes starch efficiently: **large grains, round seeds**; **bb** makes less: **small grains, wrinkled seeds**. **Bb** has **round seeds** but **intermediate grains**. So for **seed shape B is dominant**, but for **grain size** the alleles show **incomplete dominance**: dominance depends on the phenotype considered.',
  sol: 'Two effects; dominance differs.',
  scheme: [['Two characters affected: pleiotropy', 1], ['BB and bb phenotypes', 1], ['Bb: dominant for shape, intermediate for grains', 1]],
  d: 3, c: 'analysis', t: [4],
}));

// ---------------------------------------------------------------- t05 pedigree analysis
add('recessive-mcq', mcq({
  stem: 'Two unaffected parents have an affected daughter. What does this suggest about the trait?',
  right: 'It is recessive, and both parents are carriers.',
  wrong: ['It is dominant, carried by the mother.', 'It is Y-linked.', 'It is caused only by the environment.'],
  sol: 'An affected child of unaffected parents shows a recessive trait with both parents heterozygous — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('ad-fig-mcq', mcq({
  stem: 'Study the three-generation pedigree. Every affected person has an affected parent, and both sexes are affected. The trait is most likely',
  right: 'autosomal dominant',
  wrong: ['autosomal recessive', 'X-linked recessive', 'Y-linked'],
  sol: 'Appearance in every generation through affected parents, in both sexes, fits autosomal dominant inheritance — option (@K).',
  d: 3, c: 'application', t: [5],
  assets: [adFig],
}));
add('ad-fig2-mcq', mcq({
  stem: 'In the same pedigree (autosomal dominant, allele A), what is the genotype of the unaffected woman I-2?',
  right: 'aa',
  wrong: ['AA', 'Aa', 'It cannot be predicted at all'],
  sol: 'With a dominant trait, an unaffected person must be homozygous recessive — option (@K).',
  d: 3, c: 'analysis', t: [5],
  assets: [adFig],
}));
{
  const aff = p(cross('Aa', 'Aa'), 'aa');
  add('ar-fig-num', num({
    stem: 'In the two-generation pedigree, unaffected related parents (I-1 and I-2) have two affected children. If the trait is autosomal recessive, what is the probability that their next child will be affected? Give a decimal.',
    value: aff, tol: 0.001,
    sol: r`Both parents are carriers (Aa × Aa): probability aa $= \dfrac{1}{4} = ${aff}$.`,
    scheme: [[`${aff}`, 1]],
    d: 3, c: 'application', t: [5],
    assets: [arFig],
  }), (q) => q.answer.value === 0.25 || 'value');
}
add('symbols-short', short({
  marks: 2,
  stem: 'Draw or describe the pedigree symbols for (i) an unaffected male, (ii) an affected female, (iii) a carrier female and (iv) consanguineous mating.',
  model: '(i) An **open square**; (ii) a **filled circle**; (iii) a **circle with a central dot**; (iv) a **double horizontal line** joining the two parents.',
  sol: 'Four symbols.',
  scheme: [['Two symbols', 1], ['Two more symbols', 1]],
  wl: [12, 50],
  d: 1, c: 'recall', t: [5],
}));
add('pedigree-short', short({
  marks: 3,
  stem: 'Give three features of a pedigree that would lead you to conclude that a trait is autosomal recessive.',
  model: '1. **Affected children** are born to **unaffected parents**, who must both be **carriers** (heterozygous) of the recessive allele.\n2. The trait may **skip one or more generations**, reappearing when two carriers have children.\n3. **Both sexes** are affected about **equally**, showing that the gene is on an **autosome**, and the trait appears more often among children of **consanguineous** (related) parents, who are more likely to carry the same rare allele.',
  sol: 'Three features.',
  scheme: [['Unaffected parents of affected child', 1], ['Skips generations', 1], ['Both sexes; consanguinity', 1]],
  d: 3, c: 'analysis', t: [5],
}));
add('pedigree-long', long({
  stem: 'Study the three-generation pedigree, in which individuals are numbered within each generation.\n(a) Is the trait dominant or recessive? Give two reasons from the pedigree. [2]\n(b) Write the genotypes of I-1 and II-2, using A and a. [1]\n(c) II-4 (affected) and her unaffected husband II-5 plan another child. Use a Punnett square to find the probability that the child will be unaffected. [2]',
  model: `(a) **Dominant.** Every affected person (II-1, II-4, III-1) has an **affected parent**, and the trait appears in **every generation**; it affects **both sexes**, so it is **autosomal dominant**.\n\n(b) **I-1: Aa** (affected, but has an unaffected child II-2, so he must carry a); **II-2: aa** (unaffected).\n\n(c) II-4 is **Aa** (her father is affected, her mother aa); II-5 is **aa**. Aa × aa gives Aa and aa in equal numbers, so the probability of an **unaffected** child is **${p(cross('Aa', 'aa'), 'aa')}**.`,
  sol: 'Pattern; genotypes; probability.',
  scheme: [['(a) Dominant with two reasons', 2], ['(b) Two genotypes', 1], ['(c) Punnett square Aa × aa', 1], ['(c) Probability 1/2', 1]],
  wl: [60, 200],
  d: 4, c: 'analysis', t: [5],
  assets: [adFig],
}), () => p(cross('Aa', 'aa'), 'aa') === 0.5 || 'probability');

// ---------------------------------------------------------------- t06 chromosomal theory, linkage, crossing over
add('sutton-mcq', mcq({
  stem: 'Who united the behaviour of chromosomes at meiosis with Mendel’s principles as the chromosomal theory of inheritance?',
  right: 'Walter Sutton and Theodor Boveri',
  wrong: ['Thomas Hunt Morgan and Alfred Sturtevant', 'Hugo de Vries and Carl Correns', 'Watson and Crick'],
  sol: 'Sutton and Boveri proposed the chromosomal theory of inheritance — option (@K).',
  d: 1, c: 'recall', t: [6],
}));
add('morgan-mcq', mcq({
  stem: 'Why was Drosophila melanogaster an excellent organism for Morgan’s genetic studies?',
  right: 'It has a short life cycle, many progeny per mating, clear differences between sexes and many visible variations.',
  wrong: ['It reproduces only asexually.', 'It has a single chromosome.', 'Its genes never show linkage.'],
  sol: 'These features made Drosophila ideal for breeding experiments — option (@K).',
  d: 2, c: 'understanding', t: [6],
}));
add('tight-mcq', mcq({
  stem: 'Gene pair P–Q shows 1.3 percent recombination and gene pair P–R shows 37.2 percent. What can be concluded?',
  right: 'P and Q are closer together (more tightly linked) than P and R.',
  wrong: ['P and R are closer together than P and Q.', 'Q and R must be on different chromosomes.', 'All three genes are unlinked.'],
  sol: 'Lower recombination frequency means a shorter distance between genes — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('map-mcq', mcq({
  stem: 'Three linked genes show these recombination frequencies: A–B 5 percent, B–C 12 percent, A–C 17 percent. What is their order on the chromosome?',
  right: 'A – B – C',
  wrong: ['B – A – C', 'A – C – B', 'C – A – B'],
  sol: 'A–C (17) = A–B (5) + B–C (12), so B lies between A and C — option (@K).',
  d: 3, c: 'application', t: [6],
}), () => 5 + 12 === 17 || 'order');
{
  const rf = recombination(170, 1000);
  add('rf-num', num({
    stem: 'A test cross gives 830 parental-type and 170 recombinant offspring. What is the recombination frequency (percent)?',
    value: rf, tol: 0.05, unit: '%',
    sol: r`$\dfrac{170}{830 + 170} \times 100 = ${rf}$ percent.`,
    scheme: [[`${rf}%`, 1]],
    d: 2, c: 'application', t: [6],
  }), (q) => q.answer.value === 17 || 'value');
}
add('linkage-ar', ar({
  a: 'Linked genes always give 50 percent recombinant offspring in a test cross.',
  r: 'Linked genes lie on different chromosomes.',
  key: 'd',
  sol: 'Linked genes lie on the same chromosome and give fewer than 50 percent recombinants. Both statements are false — option (d).',
  d: 2, c: 'understanding', t: [6],
}));
add('linkage-fill', fill({
  stem: 'Morgan’s student ______ used recombination frequencies to map the positions of genes on a chromosome.',
  acc: [['Sturtevant', 'Alfred Sturtevant']],
  sol: 'Sturtevant.',
  d: 1, c: 'recall', t: [6],
}));
add('drosophila-short', short({
  marks: 2,
  stem: 'State the chromosomal theory of inheritance and name the scientists who proposed it.',
  model: '**Genes are located on chromosomes**; since chromosomes occur in **pairs**, **segregate** at meiosis and **assort independently**, their behaviour explains Mendel’s laws. It was proposed by **Walter Sutton and Theodor Boveri**.',
  sol: 'Theory; Sutton and Boveri.',
  scheme: [['Statement of the theory', 1], ['Sutton and Boveri', 1]],
  d: 1, c: 'recall', t: [6],
}));
add('linkage-short', short({
  marks: 3,
  stem: 'What are linkage and recombination? Explain why linked genes sometimes separate, and how the frequency of their separation relates to distance.',
  model: '**Linkage** is the **physical association of genes on the same chromosome**, so they tend to be inherited together. **Recombination** is the generation of **non-parental combinations**. Linked genes separate when **crossing over** exchanges segments between **homologous chromosomes** during meiosis. The **farther apart** two genes are, the more often a crossover falls between them, so **recombination frequency increases with distance** (tightly linked genes show low frequency).',
  sol: 'Definitions; crossing over; distance.',
  scheme: [['Linkage and recombination defined', 1], ['Crossing over separates linked genes', 1], ['Frequency increases with distance', 1]],
  d: 2, c: 'understanding', t: [6],
}));
add('map-short', short({
  marks: 3,
  stem: 'Recombination frequencies between four linked genes are: K–L 8 percent, L–M 3 percent, K–M 11 percent, M–N 6 percent, L–N 9 percent. Work out the order of the genes and explain your reasoning.',
  model: 'Since **K–M (11) = K–L (8) + L–M (3)**, **L lies between K and M**: K – L – M. Since **L–N (9) = L–M (3) + M–N (6)**, **M lies between L and N**: L – M – N. The order is therefore **K – L – M – N**, with recombination frequency used as a measure of **distance**, as in Sturtevant’s mapping.',
  sol: 'Additive distances give K L M N.',
  scheme: [['K–L–M from additivity', 1], ['L–M–N from additivity', 1], ['Order K L M N with reasoning', 1]],
  d: 4, c: 'analysis', t: [6],
}), () => (8 + 3 === 11 && 3 + 6 === 9) || 'additive');
add('linkage-long', long({
  stem: '(a) Explain how Morgan’s dihybrid crosses in Drosophila showed that some genes do not assort independently. [2]\n(b) In a test cross of a fly heterozygous for two linked genes, 1000 offspring include 880 of the two parental types and 120 recombinants. Calculate the recombination frequency and state what it indicates. [2]\n(c) Who first used such values to map genes? [1]',
  model: `(a) Morgan crossed flies differing in two genes on the **X chromosome**. The **parental combinations** appeared **far more often** than the **non-parental (recombinant)** ones, instead of in the equal proportions expected under independent assortment. He concluded that the genes are **physically linked** on the same chromosome and that recombinants arise by **crossing over**.\n\n(b) Recombination frequency $= \\dfrac{120}{1000} \\times 100 = ${recombination(120, 1000)}$ percent. It is well below 50 percent, so the genes are **linked**, fairly **close together**.\n\n(c) **Alfred Sturtevant**, Morgan’s student.`,
  sol: 'Morgan’s finding; frequency; Sturtevant.',
  scheme: [['(a) Excess of parental types', 1], ['(a) Linkage and crossing over', 1], ['(b) 12 percent', 1], ['(b) Linked and close', 1], ['(c) Sturtevant', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [6],
}), () => recombination(120, 1000) === 12 || 'value');

// ---------------------------------------------------------------- stimulus-based
{
  const counts = [315, 108, 101, 32];
  const total = counts.reduce((a, b) => a + b, 0);
  const exp = ratio(phenoRatio('RrYy', 'RrYy'), ['DD', 'Dr', 'rD', 'rr']).map((k) => Math.round((k / 16) * total * 10) / 10);
  add('pea-case', mk.case({
    passage: `A student repeated a classic pea experiment. She crossed pure round yellow plants with pure wrinkled green plants, selfed the F1 and counted the F2 seeds.\n\n| F2 phenotype | Count |\n|---|---|\n| Round yellow | ${counts[0]} |\n| Round green | ${counts[1]} |\n| Wrinkled yellow | ${counts[2]} |\n| Wrinkled green | ${counts[3]} |`,
    d: 3, c: 'application',
    children: [
      part('a', num({
        stem: 'How many round yellow seeds would be expected in this F2 if the ratio were exactly 9 : 3 : 3 : 1? (One decimal place.)',
        value: exp[0], tol: 0.05,
        sol: r`Total $= ${total}$; $\dfrac{9}{16} \times ${total} = ${exp[0]}$.`,
        scheme: [[`${exp[0]}`, 1]],
        d: 3, c: 'application', t: [2],
      })),
      part('b', mcq({
        stem: 'Taking seed shape alone, about what ratio of round to wrinkled seeds did she obtain?',
        right: '3 : 1',
        wrong: ['1 : 1', '9 : 7', '1 : 2 : 1'],
        sol: `Round $= ${counts[0]} + ${counts[1]} = ${counts[0] + counts[1]}$; wrinkled $= ${counts[2]} + ${counts[3]} = ${counts[2] + counts[3]}$; about 3 : 1 — option (@K).`,
        d: 2, c: 'analysis', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'What do her results show about the inheritance of seed shape and seed colour?',
        model: 'The counts are close to **9 : 3 : 3 : 1**, and each character alone gives about **3 : 1**. So the two genes **segregate** normally and **assort independently**, as stated in Mendel’s **law of independent assortment**.',
        sol: 'Independent assortment.',
        scheme: [['Close to 9 : 3 : 3 : 1, each 3 : 1', 1], ['Independent assortment', 1]],
        d: 2, c: 'analysis', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'Which F2 phenotypes are recombinant (new) types, and why do they appear?',
          model: '**Round green** and **wrinkled yellow** are new combinations. They appear because the genes for shape and colour **assort independently** during gamete formation, so the F1 forms Ry and rY gametes as well as the parental RY and ry.',
          sol: 'New combinations from independent assortment.',
          scheme: [['Round green and wrinkled yellow', 1], ['Independent assortment forms Ry and rY gametes', 1]],
          d: 2, c: 'understanding', t: [2],
        }),
      ]),
    ],
  }), (q) => Math.abs(q.children[0].answer.value - 312.75) < 0.1 || 'expected');
}
add('blood-case', mk.case({
  passage: 'A hospital recorded the blood groups in one family.\n\n| Person | Blood group |\n|---|---|\n| Grandfather (mother’s father) | O |\n| Mother | A |\n| Father | B |\n| First child | O |\n| Second child | AB |',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'What is the mother’s genotype?',
      right: 'Iᴬi',
      wrong: ['IᴬIᴬ', 'IᴬIᴮ', 'ii'],
      sol: 'She is group A and received i from her group O father — option (@K).',
      d: 2, c: 'application', t: [3],
    })),
    part('b', mcq({
      stem: 'The first child is group O. What must the father’s genotype be?',
      right: 'Iᴮi',
      wrong: ['IᴮIᴮ', 'IᴬIᴮ', 'ii'],
      sol: 'A group O child (ii) needs i from the father, who is group B — option (@K).',
      d: 3, c: 'analysis', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain how the second child can be group AB although neither parent is.',
      model: 'The mother can pass on **Iᴬ** and the father **Iᴮ**. The child is **IᴬIᴮ**, and since Iᴬ and Iᴮ are **codominant**, both are expressed, giving group **AB**.',
      sol: 'Iᴬ from mother, Iᴮ from father; codominance.',
      scheme: [['Iᴬ from mother, Iᴮ from father', 1], ['Codominance gives AB', 1]],
      d: 2, c: 'understanding', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'What is the probability that their next child will be group A? Explain.',
        model: `Iᴬi × Iᴮi gives IᴬIᴮ, Iᴬi, Iᴮi and ii equally; only **Iᴬi** is group A, so the probability is **${p(abo('AO', 'BO'), 'A')}** (one in four), whatever the earlier children were.`,
        sol: 'One quarter.',
        scheme: [['Cross Iᴬi × Iᴮi', 1], ['Probability 1/4', 1]],
        d: 2, c: 'application', t: [3],
      }),
    ]),
  ],
}));
