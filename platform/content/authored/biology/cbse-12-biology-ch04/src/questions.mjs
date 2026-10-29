// ch04 Principles of Inheritance and Variation — question bank. Every numerical key is computed by calc.mjs.
// AR keys planned: a a b a c d.
import { mk, add, r } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { cross, phenoRatio, expect, abo, xlinked, recombination, polyClasses } from './calc.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;

// ---------------------------------------------------------------- t01 Mendelian inheritance
add('f2-geno-mcq', mcq({
  stem: 'What is the genotypic ratio in the F2 generation of a monohybrid cross?',
  right: '1 : 2 : 1',
  wrong: ['3 : 1', '9 : 3 : 3 : 1', '1 : 1'],
  sol: 'TT : Tt : tt = 1 : 2 : 1 — option (@K). 3 : 1 is the phenotypic ratio.',
  d: 1, c: 'recall', t: [1],
}));
add('di-test-mcq', mcq({
  stem: 'What phenotypic ratio results when an F1 dihybrid (RrYy) is crossed with a wrinkled green (rryy) plant?',
  right: '1 : 1 : 1 : 1',
  wrong: ['9 : 3 : 3 : 1', '3 : 1', '1 : 2 : 1'],
  sol: 'The dihybrid makes four gamete types in equal numbers and the recessive parent makes only ry, so the four phenotypes appear equally — option (@K).',
  d: 2, c: 'understanding', t: [1],
}), (q) => [...phenoRatio('RrYy', 'rryy').values()].every((v) => v === 0.25) || 'ratio');
add('segregation-ar', ar({
  a: 'Dwarf plants reappear unchanged in the F2 of a cross between true-breeding tall and dwarf pea plants.',
  r: 'The two alleles of a gene do not blend in the F1; they separate during gamete formation.',
  key: 'a',
  sol: 'Both are true, and segregation of the unblended alleles is exactly why the recessive trait reappears unchanged — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('pea-trait-mcq', mcq({
  stem: 'Which pair of pea traits are both dominant?',
  right: 'Green pod colour and yellow seed colour',
  wrong: ['Yellow pod colour and green seed colour', 'Terminal flowers and wrinkled seeds', 'Constricted pods and white flowers'],
  sol: 'Green pods and yellow seeds are dominant; terminal flowers, wrinkled seeds, constricted pods and white flowers are recessive — option (@K).',
  d: 2, c: 'recall', t: [1],
}));
add('testcross-mcq', mcq({
  stem: 'A tall pea plant is crossed with a dwarf plant. The offspring are 48 tall and 52 dwarf. What is the genotype of the tall parent?',
  right: 'Tt',
  wrong: ['TT', 'tt', 'It cannot be found from this cross'],
  sol: 'This is a test cross. About 1 : 1 tall to dwarf means the tall parent produced T and t gametes equally, so it is heterozygous — option (@K).',
  d: 3, c: 'application', t: [1],
}), (q) => { const p = phenoRatio('Tt', 'tt'); return p.get('D') === 0.5 && p.get('r') === 0.5 || 'ratio'; });
{
  const dwarf = expect(phenoRatio('Tt', 'Tt').get('r'), 1200);
  add('f2-num', num({
    stem: 'Two heterozygous tall pea plants (Tt) are crossed and give 1200 offspring. How many dwarf plants are expected?',
    value: dwarf,
    sol: r`Dwarf plants are tt, one quarter: $\dfrac{1}{4} \times 1200 = ${dwarf}$.`,
    scheme: [[`${dwarf}`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 1200 / 4 || 'value');
}
{
  const wy = expect(phenoRatio('RrYy', 'RrYy').get('rD'), 640);
  add('di-num', num({
    stem: 'A dihybrid round yellow plant (RrYy) is self-pollinated and gives 640 seeds. How many wrinkled yellow seeds are expected?',
    value: wy,
    sol: r`Wrinkled yellow is $\dfrac{3}{16}$ of the F2: $\dfrac{3}{16} \times 640 = ${wy}$.`,
    scheme: [[`${wy}`, 1]],
    d: 3, c: 'application', t: [1],
  }), (q) => q.answer.value === (3 * 640) / 16 || 'value');
}
{
  const p = cross('RrYy', 'RrYy').get('RrYy');
  add('di-frac-num', num({
    stem: 'In the F2 of a dihybrid cross RrYy × RrYy, what fraction of the plants are expected to be heterozygous for both genes (RrYy)? Give your answer as a decimal.',
    value: p,
    sol: r`P(Rr) $= \dfrac{1}{2}$ and P(Yy) $= \dfrac{1}{2}$, independently, so P(RrYy) $= \dfrac{1}{2} \times \dfrac{1}{2} = ${p}$.`,
    scheme: [[`${p}`, 1]],
    d: 4, c: 'application', t: [1],
  }), (q) => q.answer.value === 0.5 * 0.5 || 'value');
}
{
  const p = cross('RrYy', 'Rryy').get('rryy');
  add('rryy-num', num({
    stem: 'A plant RrYy is crossed with a plant Rryy. What is the probability that an offspring is wrinkled green (rryy)? Give your answer as a decimal.',
    value: p,
    sol: r`P(rr) from Rr × Rr $= \dfrac{1}{4}$; P(yy) from Yy × yy $= \dfrac{1}{2}$. Independent genes: $\dfrac{1}{4} \times \dfrac{1}{2} = \dfrac{1}{8} = ${p}$.`,
    scheme: [[`${p}`, 1]],
    d: 4, c: 'application', t: [1],
  }), (q) => q.answer.value === 0.25 * 0.5 || 'value');
}
add('testcross-fill', fill({
  stem: 'A cross between an organism of the dominant phenotype and its homozygous recessive parent, used to find its genotype, is called a ______ cross.',
  acc: [['test']],
  sol: 'Test cross.',
  d: 1, c: 'recall', t: [1],
}));
add('blend-tf', tf({
  stem: 'In Mendel’s cross between true-breeding tall and dwarf pea plants, the F1 plants were of intermediate height.',
  key: 'f',
  sol: 'False. All F1 plants were tall; tallness was dominant and dwarfness reappeared in the F2.',
  d: 1, c: 'recall', t: [1],
}));
add('terms-match', match({
  stem: 'Match each term (column I) with its example (column II) for the pea height gene.',
  pairs: [
    ['Homozygous dominant', 'TT'],
    ['Heterozygous', 'Tt'],
    ['Homozygous recessive', 'tt'],
    ['Phenotype', 'Tall'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Homozygous dominant TT; heterozygous Tt; homozygous recessive tt; phenotype tall (what is observed).',
  d: 1, c: 'recall', t: [1],
}));
add('indep-ar', ar({
  a: 'The F2 of Mendel’s dihybrid cross showed a ratio of 9 : 3 : 3 : 1.',
  r: 'The alleles of the genes for seed shape and seed colour assorted independently during gamete formation.',
  key: 'a',
  sol: 'Both are true. Independent assortment gives four gamete types in equal numbers, and their random fusion gives (3 : 1) × (3 : 1) = 9 : 3 : 3 : 1 — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('mono-short', short({
  marks: 3,
  stem: 'A pea plant homozygous for violet flowers is crossed with a white-flowered plant. Using V and v, show the F1, and the genotypes and phenotypes of the F2 with their ratios.',
  model: 'P: VV (violet) × vv (white); gametes V and v.\n\nF1: all **Vv**, violet.\n\nF1 × F1: Vv × Vv; gametes V, v from each.\n\nF2: **VV : Vv : vv = 1 : 2 : 1**; phenotypes **violet : white = 3 : 1**.',
  sol: 'Write gametes at each step; complete dominance gives 3 : 1.',
  scheme: [['P, gametes and F1', 1], ['F2 genotypes and ratio', 1], ['F2 phenotypes and ratio', 1]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.model_answer_md.includes('1 : 2 : 1') && q.answer.model_answer_md.includes('3 : 1') || 'ratios');
add('testcross-short', short({
  marks: 2,
  stem: 'A farmer has a pea plant with round seeds and wants to know whether it is RR or Rr. Explain how he can find out, giving the expected results.',
  model: 'He should do a **test cross** with a **wrinkled (rr)** plant. If **all** offspring have round seeds, the plant is **RR**. If round and wrinkled appear in about **1 : 1**, the plant is **Rr**.',
  sol: 'Test cross with the homozygous recessive and interpret.',
  scheme: [['Cross with rr (test cross)', 1], ['Both expected outcomes', 1]],
  d: 3, c: 'application', t: [1],
}));
add('laws-short', short({
  marks: 2,
  stem: 'State Mendel’s law of dominance and law of segregation.',
  model: '**Dominance:** characters are controlled by discrete units (factors) that occur in pairs; in a dissimilar pair, one member (dominant) is expressed and the other (recessive) is not. **Segregation:** the alleles of a pair do not blend; they separate during gamete formation, so each gamete receives only one.',
  sol: 'Two laws in brief.',
  scheme: [['Law of dominance', 1], ['Law of segregation', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('mendel-short', short({
  marks: 2,
  stem: 'Give two features of Mendel’s method, other than the choice of plant, that helped him discover the laws of inheritance.',
  model: 'He started with **true-breeding** lines and studied **one or two characters at a time** with clearly contrasting forms. He used **large samples** and analysed the counts **statistically**, which revealed the regular ratios.',
  sol: 'True-breeding lines, few characters, large numbers, statistics.',
  scheme: [['First feature', 1], ['Second feature', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('di-long', long({
  stem: 'Explain Mendel’s dihybrid cross between a pea plant with round yellow seeds (RRYY) and one with wrinkled green seeds (rryy), up to the F2, with a Punnett square. State the law that it illustrates.',
  model: '**P:** RRYY × rryy; gametes RY and ry.\n\n**F1:** all RrYy, round yellow.\n\n**F1 gametes:** RY, Ry, rY, ry, in equal proportions, because the two genes assort independently.\n\n**F2 (Punnett square of 16 boxes):** 9 round yellow (R_Y_), 3 round green (R_yy), 3 wrinkled yellow (rrY_), 1 wrinkled green (rryy).\n\nEach character alone still gives 3 : 1 (12 round : 4 wrinkled; 12 yellow : 4 green), and two new combinations, round green and wrinkled yellow, appear.\n\n**Law of independent assortment:** when two pairs of traits are combined in a hybrid, the segregation of one pair of characters is independent of the other.',
  sol: 'P, gametes, F1, four gamete types, F2 ratio, the law.',
  scheme: [['P, gametes and F1', 1], ['Four F1 gamete types', 1], ['Punnett square and 9 : 3 : 3 : 1', 2], ['Law of independent assortment', 1]],
  wl: [80, 160],
  d: 3, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 deviations
add('abo-count-mcq', mcq({
  stem: 'How many different genotypes are possible for the human ABO blood groups?',
  right: 'Six',
  wrong: ['Four', 'Three', 'Nine'],
  sol: 'Three alleles give IᴬIᴬ, Iᴬi, IᴮIᴮ, Iᴮi, IᴬIᴮ and ii: six genotypes, four phenotypes — option (@K).',
  d: 2, c: 'understanding', t: [2],
}), () => 3 * (3 + 1) / 2 === 6 || 'count');
add('polygenic-mcq', mcq({
  stem: 'Which feature is typical of a polygenic trait such as human height?',
  right: 'A continuous range of phenotypes, influenced also by the environment',
  wrong: ['Exactly two clearly different phenotypes', 'Control by a single gene with two alleles', 'Inheritance only through the mother'],
  sol: 'Several genes with small additive effects, plus the environment, give continuous variation — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('snap-mcq', mcq({
  stem: 'A pink-flowered snapdragon (Rr) is crossed with a white-flowered one (rr). What are the expected offspring?',
  right: '1 pink : 1 white',
  wrong: ['All pink', '3 pink : 1 white', '1 red : 2 pink : 1 white'],
  sol: 'Rr × rr gives Rr and rr equally; with incomplete dominance Rr is pink and rr white — option (@K).',
  d: 3, c: 'application', t: [2],
}), () => { const m = cross('Rr', 'rr'); return m.get('Rr') === 0.5 && m.get('rr') === 0.5 || 'ratio'; });
add('abo-mcq', mcq({
  stem: 'A mother of blood group A and a father of blood group B have a child of blood group O. What are the genotypes of the parents?',
  right: 'Mother Iᴬi, father Iᴮi',
  wrong: ['Mother IᴬIᴬ, father IᴮIᴮ', 'Mother IᴬIᴮ, father ii', 'Mother Iᴬi, father IᴮIᴮ'],
  sol: 'A group O child is ii, so each parent must carry i; hence the A parent is Iᴬi and the B parent is Iᴮi — option (@K).',
  d: 3, c: 'analysis', t: [2],
}), () => abo('AO', 'BO').get('O') === 0.25 && !abo('AA', 'BB').has('O') || 'abo');
{
  const pA = abo('AB', 'OO').get('A');
  add('abo-num', num({
    stem: 'A man of blood group AB (IᴬIᴮ) and a woman of blood group O (ii) have a child. What is the probability that the child has blood group A? Give your answer as a decimal.',
    value: pA,
    sol: r`Father gives Iᴬ or Iᴮ; mother gives i. Children are Iᴬi (A) or Iᴮi (B), each $\dfrac{1}{2} = ${pA}$.`,
    scheme: [[`${pA}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 0.5 || 'value');
}
add('pleio-mcq', mcq({
  stem: 'In pea, BB plants have large starch grains and round seeds, bb plants have small grains and wrinkled seeds, and Bb plants have round seeds with intermediate-sized grains. What does this show?',
  right: 'Whether an allele appears dominant depends on which phenotype is studied.',
  wrong: ['The B allele blends with b in the heterozygote.', 'Seed shape is a polygenic trait.', 'The two alleles are co-dominant for seed shape.'],
  sol: 'For seed shape B is dominant (Bb is round); for starch grain size it is incompletely dominant (Bb is intermediate). One gene affecting two phenotypes is also pleiotropy — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('codom-tf', tf({
  stem: 'In a person of blood group AB, the allele Iᴬ is dominant over Iᴮ.',
  key: 'f',
  sol: 'False. Iᴬ and Iᴮ are co-dominant: both are fully expressed, so the red cells carry both sugars.',
  d: 1, c: 'recall', t: [2],
}));
add('incomplete-ar', ar({
  a: 'In the F2 of snapdragon flower colour, the phenotypic ratio is the same as the genotypic ratio.',
  r: 'Snapdragon flowers are pollinated by insects.',
  key: 'b',
  sol: 'Both statements are true, but the way the flowers are pollinated does not explain the ratio; the ratios match because each of RR, Rr and rr gives a distinct colour (incomplete dominance) — option (b).',
  d: 2, c: 'understanding', t: [2],
}));
add('poly-num', num({
  stem: 'In a model in which a trait is controlled by four genes with equal, additive effects, how many phenotypic classes are possible among the offspring of two parents heterozygous for all four genes?',
  value: polyClasses(4),
  sol: r`Each child can have 0 to 8 contributing alleles, so $2 \times 4 + 1 = ${polyClasses(4)}$ classes.`,
  scheme: [[`${polyClasses(4)}`, 1]],
  d: 3, c: 'application', t: [2],
}), (q) => q.answer.value === 9 || 'value');
add('incomplete-short', short({
  marks: 2,
  stem: 'A student says that pink snapdragons show that the red and white alleles have blended. Use the F2 of a cross between two pink plants to correct her.',
  model: 'Two pink plants (Rr × Rr) give **red, pink and white** offspring in a **1 : 2 : 1** ratio. Red and white reappear **unchanged**, so the alleles did **not blend**; they stayed separate and segregated. Only their combined effect in the heterozygote is intermediate (incomplete dominance).',
  sol: 'Reappearance of parental types disproves blending.',
  scheme: [['F2 1 red : 2 pink : 1 white', 1], ['Parental types reappear, so no blending', 1]],
  d: 3, c: 'analysis', t: [2],
}));
add('abo-short', short({
  marks: 3,
  stem: 'A child has blood group O and the mother has blood group A. Three men with blood groups AB, A and B claim to be the father. Which of them could not be the father? Explain with genotypes.',
  model: 'The child is **ii**, so it received **i** from each parent; the mother must be **Iᴬi**.\n\nThe father must carry **i**. A man of group **AB** is **IᴬIᴮ** and has no i allele, so he **cannot** be the father.\n\nMen of group A (Iᴬi) or B (Iᴮi) **could** be the father, if heterozygous.',
  sol: 'O child needs i from the father; AB has no i.',
  scheme: [['Child ii; i from each parent', 1], ['AB man (IᴬIᴮ) excluded', 1], ['A or B men possible if heterozygous', 1]],
  d: 4, c: 'analysis', t: [2],
}));
add('polygenic-short', short({
  marks: 3,
  stem: 'Explain why human skin colour shows continuous variation rather than a few distinct classes.',
  model: 'Skin colour is **polygenic**: it is controlled by **three or more genes**, each with an allele that adds a small amount of pigment. The **number** of such alleles a person carries (from 0 to 6 in a three-gene model, AABBCC darkest, aabbcc lightest) decides the shade, so there are many classes. The **environment**, such as exposure to sunlight, also changes the shade, which blurs the classes into a **continuous** range.',
  sol: 'Many additive genes plus environment.',
  scheme: [['Polygenic: several genes', 1], ['Additive effect gives many classes', 1], ['Environmental influence makes it continuous', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('dominance-short', short({
  marks: 2,
  stem: 'Using the idea that a gene makes an enzyme, explain why a modified allele that makes a non-functional enzyme usually behaves as recessive.',
  model: 'In the heterozygote, the **unmodified allele** still makes the normal enzyme, and this is usually **enough** to produce the normal phenotype. The modified allele’s non-functional product has **no visible effect**, so the phenotype depends only on the unmodified allele, and the modified allele appears **recessive**.',
  sol: 'One normal allele makes enough product.',
  scheme: [['Unmodified allele makes enough normal enzyme', 1], ['So the modified allele’s effect is hidden', 1]],
  d: 3, c: 'understanding', t: [2],
}));
add('pleio-short', short({
  marks: 2,
  stem: 'What is pleiotropy? Explain it with the example of phenylketonuria.',
  model: '**Pleiotropy** is the effect of a **single gene** on **more than one phenotype**. In **phenylketonuria**, a mutation in the gene for the enzyme **phenylalanine hydroxylase** causes both **mental retardation** and a **reduction in hair and skin pigmentation**.',
  sol: 'One gene, several effects; PKU.',
  scheme: [['Definition', 1], ['PKU with two effects', 1]],
  d: 2, c: 'recall', t: [2],
}));

// ---------------------------------------------------------------- t03 chromosomal theory, linkage
add('linkage-ar', ar({
  a: 'The genes for yellow body and white eye in Drosophila are rarely separated by crossing over.',
  r: 'The two genes lie very close together on the X chromosome.',
  key: 'a',
  sol: 'Both are true; closeness makes a crossover between them rare (about 1.3 percent recombination), so R explains A — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
{
  const rf = recombination(83, 1000);
  add('recomb-num', num({
    stem: 'In a cross involving two linked genes, 917 of 1000 offspring show parental combinations and 83 show new combinations. What is the recombination frequency, in percent?',
    value: rf, tol: 0.05, unit: '%',
    sol: r`Recombination frequency $= \dfrac{83}{1000} \times 100 = ${rf}$ percent.`,
    scheme: [[`${rf}%`, 1]],
    d: 3, c: 'application', t: [3],
  }), (q) => q.answer.value === 8.3 || 'value');
}
add('morgan-mcq', mcq({
  stem: 'Which is NOT a reason why Drosophila melanogaster suits genetic experiments?',
  right: 'It has a life cycle of about one year.',
  wrong: ['It can be grown on a simple synthetic medium.', 'A single mating produces a large number of offspring.', 'Many heritable variations can be seen with low-power microscopes.'],
  sol: 'Drosophila completes its life cycle in about two weeks, not a year — option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('map-mcq', mcq({
  stem: 'Recombination frequencies between three linked genes are: P–Q 5 percent, Q–R 20 percent, P–R 25 percent. What is the order of the genes on the chromosome?',
  right: 'P – Q – R',
  wrong: ['Q – P – R', 'P – R – Q', 'R – P – Q'],
  sol: 'The largest frequency (P–R, 25) is between the outer genes; Q lies between them because 5 + 20 = 25 — option (@K).',
  d: 4, c: 'analysis', t: [3],
}), () => 5 + 20 === 25 || 'additive');
add('theory-mcq', mcq({
  stem: 'Who proposed the chromosomal theory of inheritance, and who verified it experimentally?',
  right: 'Sutton and Boveri proposed it; Morgan verified it.',
  wrong: ['Mendel proposed it; de Vries verified it.', 'Morgan proposed it; Sutton verified it.', 'Henking proposed it; Sturtevant verified it.'],
  sol: 'Sutton and Boveri united chromosome behaviour with Mendel’s factors; Morgan’s Drosophila work provided experimental proof — option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('linkage-short', short({
  marks: 3,
  stem: 'Define linkage and recombination. Why did Morgan’s dihybrid crosses with X-linked genes not give the 9 : 3 : 3 : 1 ratio?',
  model: '**Linkage** is the physical association of genes on the same chromosome, so they tend to be inherited together. **Recombination** is the generation of non-parental gene combinations, through crossing over.\n\nMendel’s 9 : 3 : 3 : 1 assumes **independent assortment**. Morgan’s genes were on the **same (X) chromosome**, so they did not assort independently: parental combinations were much more frequent than recombinants, and the ratio deviated.',
  sol: 'Definitions; linked genes do not assort independently.',
  scheme: [['Linkage defined', 1], ['Recombination defined', 1], ['Linked genes do not assort independently', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('map-short', short({
  marks: 2,
  stem: 'Gene A shows 2 percent recombination with gene B and 30 percent with gene C. Which gene lies closer to A? Explain.',
  model: '**Gene B** lies closer to A. The chance of a crossover between two genes increases with the distance between them, so the **lower** recombination frequency (2 percent) means A and B are **close together** (tightly linked), while 30 percent means C is **far** from A.',
  sol: 'Lower recombination = closer.',
  scheme: [['Gene B', 1], ['Reason: recombination rises with distance', 1]],
  d: 3, c: 'application', t: [3],
}));
add('linkage-long', long({
  stem: 'Describe how Morgan’s work with Drosophila supported the chromosomal theory of inheritance and led to the idea of linkage. How are recombination frequencies used to map genes?',
  model: '**Chromosomal theory.** Sutton and Boveri noted that chromosomes, like Mendel’s factors, occur in pairs, segregate during gamete formation and assort independently, and proposed that genes are carried on chromosomes.\n\n**Morgan’s choice.** He used Drosophila because it grows on a simple medium, has a life cycle of about two weeks, produces many offspring and shows many visible heritable variations.\n\n**Linkage.** He made dihybrid crosses with genes on the X chromosome, for example for body colour and eye colour. The F2 did not show 9 : 3 : 3 : 1: parental combinations were far more frequent than new ones. He concluded that genes on the same chromosome are linked and are inherited together, and that new combinations (recombinants) arise by crossing over.\n\n**Mapping.** Tightly linked genes (yellow and white, 1.3 percent) rarely recombine; loosely linked genes (white and miniature, 37.2 percent) often do. Sturtevant used recombination frequency as a measure of the distance between genes to map their positions on a chromosome.',
  sol: 'Theory, Morgan’s choice, linkage from deviated ratios, mapping by frequency.',
  scheme: [['Chromosomal theory stated', 1], ['Why Drosophila', 1], ['Deviation from 9 : 3 : 3 : 1 and linkage', 1], ['Recombination by crossing over with the two examples', 1], ['Mapping by Sturtevant', 1]],
  wl: [80, 180],
  d: 3, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 sex determination
add('birds-mcq', mcq({
  stem: 'In birds, which parent decides the sex of the offspring, and why?',
  right: 'The female, because she is ZW and makes two kinds of eggs',
  wrong: ['The male, because he is ZW and makes two kinds of sperm', 'The male, because he is XY', 'Neither; the temperature decides'],
  sol: 'Bird females are ZW (heterogametic) and males ZZ, so the egg decides the sex — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('honeybee-mcq', mcq({
  stem: 'A drone (male honey bee) has 16 chromosomes. How many chromosomes does a worker bee have, and how did it develop?',
  right: '32, from a fertilised egg',
  wrong: ['16, from an unfertilised egg', '32, from an unfertilised egg', '48, from a fertilised egg'],
  sol: 'Drones are haploid (16) from unfertilised eggs; workers and queens are diploid females from fertilised eggs: 2 × 16 = 32 — option (@K).',
  d: 2, c: 'application', t: [4],
}), () => 16 * 2 === 32 || 'count');
add('grasshopper-mcq', mcq({
  stem: 'In grasshoppers (XO type), what kinds of sperm does a male produce?',
  right: 'Half with an X chromosome and half without one',
  wrong: ['All with an X chromosome', 'Half with X and half with Y', 'All without an X chromosome'],
  sol: 'The male has a single X (XO), so after meiosis half the sperms carry X and half carry none — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('mother-tf', tf({
  stem: 'In humans, the sex of the child is determined by the mother.',
  key: 'f',
  sol: 'False. All ova carry X; the sperm carries X or Y and so determines the sex.',
  d: 1, c: 'recall', t: [4],
}));
add('drone-short', short({
  marks: 2,
  stem: 'Male honey bees have no father but can have a grandfather. Explain, and state how a drone produces sperms.',
  model: 'A drone develops from an **unfertilised egg** by parthenogenesis, so it has a mother (the queen) but **no father**. The queen herself came from a fertilised egg, so she had a father, who is the drone’s **grandfather**. Being **haploid**, a drone produces sperms by **mitosis**.',
  sol: 'Unfertilised egg; mother’s father; mitosis.',
  scheme: [['No father: unfertilised egg; grandfather via the queen', 1], ['Sperms by mitosis (haploid)', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('sexdet-short', short({
  marks: 3,
  stem: 'Compare sex determination in grasshoppers, humans and birds, naming the heterogametic sex in each.',
  model: '**Grasshopper (XO):** females XX; males have one X (XO); the **male** is heterogametic (sperm with or without X).\n\n**Humans (XY):** females XX; males XY; the **male** is heterogametic (X or Y sperm).\n\n**Birds (ZW):** females ZW; males ZZ; the **female** is heterogametic (Z or W eggs).',
  sol: 'Three systems with chromosomes and heterogametic sex.',
  scheme: [['Grasshopper', 1], ['Humans', 1], ['Birds', 1]],
  d: 3, c: 'analysis', t: [4],
}));

// ---------------------------------------------------------------- t05 sex-linked inheritance, pedigrees
add('haemo-mcq', mcq({
  stem: 'A boy has haemophilia, but both his parents have normal blood clotting. From whom did he inherit the allele?',
  right: 'His mother, who is a carrier',
  wrong: ['His father, who is a carrier', 'Both parents equally', 'Neither; it arose in his own cells'],
  sol: 'A son receives his X chromosome from his mother; a normal mother with an affected son is a carrier — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('colourblind-mcq', mcq({
  stem: 'A colour-blind man marries a woman with normal vision who is not a carrier. What is expected among their children?',
  right: 'All daughters are carriers with normal vision; all sons have normal vision.',
  wrong: ['Half the sons are colour blind.', 'All daughters are colour blind.', 'All children are colour blind.'],
  sol: 'Daughters receive the father’s X (with the allele) and a normal X from the mother: carriers. Sons receive the father’s Y and a normal X: normal — option (@K).',
  d: 3, c: 'application', t: [5],
}), () => { const x = xlinked('XX', 'XhY'); return x.carrierDaughter === 0.5 && x.affectedSon === 0 || 'xlinked'; });
{
  const p = xlinked('XXh', 'XY');
  const pSon = p.affectedSon / (p.normalSon + p.affectedSon);
  add('son-num', num({
    stem: 'A woman who is a carrier of colour blindness marries a man with normal vision. If they have a son, what is the probability that he is colour blind? Give your answer as a decimal.',
    value: pSon,
    sol: r`A son gets the Y from his father and one of his mother’s two X chromosomes; one of these carries the allele, so P $= \dfrac{1}{2} = ${pSon}$.`,
    scheme: [[`${pSon}`, 1]],
    d: 3, c: 'application', t: [5],
  }), (q) => q.answer.value === 0.5 || 'value');
}
add('pedigree-mcq', mcq({
  stem: 'In a family pedigree, a trait appears mostly in males, is passed from affected men to their daughters’ sons through unaffected daughters, and is never passed from father to son. What is the most likely pattern of inheritance?',
  right: 'X-linked recessive',
  wrong: ['Autosomal dominant', 'Autosomal recessive', 'Y-linked'],
  sol: 'Mostly males affected, transmission through carrier daughters, and no father-to-son transmission point to an X-linked recessive allele — option (@K).',
  d: 4, c: 'analysis', t: [5],
}));
add('colour-ar', ar({
  a: 'Colour blindness is much more common in males than in females.',
  r: 'The gene for colour blindness is located on the Y chromosome.',
  key: 'c',
  sol: 'A is true. R is false: the allele is on the X chromosome; males have only one X, so a single recessive allele shows — option (c).',
  d: 2, c: 'understanding', t: [5],
}));
add('haemo-short', short({
  marks: 3,
  stem: 'A haemophilic man marries a woman who is a carrier of haemophilia. Work out the expected genotypes and phenotypes of their sons and daughters.',
  model: 'Father **XʰY**, mother **XXʰ**. Gametes: father Xʰ, Y; mother X, Xʰ.\n\n**Daughters:** XXʰ (carrier, normal) and XʰXʰ (haemophilic), **1 : 1**.\n\n**Sons:** XY (normal) and XʰY (haemophilic), **1 : 1**.\n\nSo half the daughters and half the sons are expected to be haemophilic.',
  sol: 'Cross with sex chromosomes; each sex 1 : 1.',
  scheme: [['Parental genotypes and gametes', 1], ['Daughters 1 carrier : 1 affected', 1], ['Sons 1 normal : 1 affected', 1]],
  d: 4, c: 'application', t: [5],
}), () => { const x = xlinked('XXh', 'XhY'); return x.carrierDaughter === 0.25 && x.affectedDaughter === 0.25 && x.affectedSon === 0.25 || 'xlinked'; });
add('colour-short', short({
  marks: 2,
  stem: 'Why is colour blindness found in about 8 percent of males but only about 0.4 percent of females?',
  model: 'The allele is **X-linked recessive**. A male has **one X**, so one copy of the allele makes him colour blind. A female has **two X chromosomes** and is colour blind only if **both** carry the allele, which is much rarer; with one copy she is a normal-sighted carrier.',
  sol: 'Hemizygous males vs two X chromosomes in females.',
  scheme: [['X-linked recessive; males have one X', 1], ['Females need two copies, which is rare', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('sexlinked-long', long({
  stem: 'Explain the inheritance of haemophilia with the help of two crosses: (a) a carrier woman and a normal man; (b) a haemophilic man and a normal (non-carrier) woman. Why are affected females rare?',
  model: '**Haemophilia** is an X-linked recessive disorder in which a protein of the blood-clotting chain is affected, so a small cut may bleed for a long time.\n\n**(a) XXʰ × XY.** Gametes: X, Xʰ and X, Y. Daughters: XX (normal) and XXʰ (carrier). Sons: XY (normal) and XʰY (haemophilic). So half the sons are affected and half the daughters are carriers.\n\n**(b) XX × XʰY.** Gametes: X and Xʰ, Y. Daughters: all XXʰ, carriers. Sons: all XY, normal. The father passes the allele to all his daughters but to none of his sons.\n\n**Affected females are rare** because a daughter must receive the allele from both parents: her mother must be at least a carrier and her father must be haemophilic. Males need only one copy, since they have a single X.',
  sol: 'Two crosses with sex chromosomes; rarity in females.',
  scheme: [['Nature of haemophilia (X-linked recessive)', 1], ['Cross (a) with results', 1.5], ['Cross (b) with results', 1.5], ['Why affected females are rare', 1]],
  wl: [80, 170],
  d: 3, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- t06 Mendelian and chromosomal disorders
add('turner-ar', ar({
  a: 'A person with Turner’s syndrome has 47 chromosomes.',
  r: 'Turner’s syndrome is caused by the absence of one X chromosome.',
  key: 'd',
  sol: 'A is false: with one X missing, the karyotype is 45, XO, so there are 45 chromosomes. R is true — option (d).',
  d: 2, c: 'understanding', t: [6],
}));
add('sickle-mcq', mcq({
  stem: 'Sickle-cell anaemia is caused by which change in the β-globin chain of haemoglobin?',
  right: 'Glutamic acid replaced by valine at the sixth position',
  wrong: ['Valine replaced by glutamic acid at the sixth position', 'Loss of the whole β-globin chain', 'An extra copy of chromosome 11'],
  sol: 'A single base change (GAG → GUG) replaces glutamic acid with valine at position 6 — option (@K).',
  d: 2, c: 'recall', t: [6],
}));
{
  const p = cross('Ss', 'Ss').get('ss');
  add('sickle-num', num({
    stem: 'Two healthy carriers of the sickle-cell allele have a child. What is the probability that the child has sickle-cell anaemia? Give your answer as a decimal.',
    value: p,
    sol: r`Each parent passes the sickle allele with probability $\dfrac{1}{2}$; the child is affected only with two copies: $\dfrac{1}{2} \times \dfrac{1}{2} = ${p}$.`,
    scheme: [[`${p}`, 1]],
    d: 2, c: 'application', t: [6],
  }), (q) => q.answer.value === 0.25 || 'value');
}
add('down-mcq', mcq({
  stem: 'Down’s syndrome is caused by',
  right: 'an additional copy of chromosome 21',
  wrong: ['the absence of one X chromosome', 'an additional X chromosome in a male', 'a point mutation in the β-globin gene'],
  sol: 'Down’s syndrome is trisomy 21 — option (@K).',
  d: 1, c: 'recall', t: [6],
}));
add('klinefelter-mcq', mcq({
  stem: 'A karyotype shows 47 chromosomes, with sex chromosomes XXY, in a tall sterile male. What is the condition?',
  right: 'Klinefelter’s syndrome',
  wrong: ['Turner’s syndrome', 'Down’s syndrome', 'Haemophilia'],
  sol: 'An extra X in a male (47, XXY) is Klinefelter’s syndrome — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('thal-mcq', mcq({
  stem: 'Which statement correctly distinguishes thalassemia from sickle-cell anaemia?',
  right: 'Thalassemia is a quantitative problem (too little globin is made); sickle-cell anaemia is a qualitative problem (an incorrect globin is made).',
  wrong: ['Thalassemia is X-linked, while sickle-cell anaemia is autosomal.', 'Thalassemia is a chromosomal disorder, while sickle-cell anaemia is Mendelian.', 'Both are caused by an extra chromosome.'],
  sol: 'Both are autosomal recessive Mendelian disorders; thalassemia reduces the amount of globin, while sickle-cell changes its structure — option (@K).',
  d: 3, c: 'analysis', t: [6],
}));
add('pku-fill', fill({
  stem: 'In phenylketonuria, the enzyme that converts the amino acid phenylalanine into ______ is missing.',
  acc: [['tyrosine']],
  sol: 'Tyrosine.',
  d: 1, c: 'recall', t: [6],
}));
add('sickle-short', short({
  marks: 3,
  stem: 'Explain the molecular basis of sickle-cell anaemia and why carriers are usually healthy.',
  model: 'A **single base substitution** in the β-globin gene changes the codon **GAG → GUG**, so **glutamic acid** is replaced by **valine** at the **sixth** position of the β-globin chain. The mutant haemoglobin (HbS) polymerises under **low oxygen tension**, changing red blood cells from biconcave discs to **sickle shapes**.\n\nThe disease appears only in **HbˢHbˢ** individuals. **Carriers (HbᴬHbˢ)** have enough normal haemoglobin from the Hbᴬ allele, so they are usually healthy, though they can pass the allele on.',
  sol: 'Base change, amino acid change, sickling; recessive inheritance.',
  scheme: [['GAG → GUG; Glu → Val at position 6', 1], ['Sickling at low oxygen', 1], ['Carriers healthy: recessive disorder', 1]],
  d: 3, c: 'understanding', t: [6],
}));
add('aneuploidy-short', short({
  marks: 2,
  stem: 'Distinguish between aneuploidy and polyploidy, stating how each arises.',
  model: '**Aneuploidy** is the gain or loss of one or a few chromosomes, caused by the **failure of chromatids (or homologues) to separate** during cell division (non-disjunction), as in Down’s syndrome. **Polyploidy** is an increase in **whole sets** of chromosomes, caused by **failure of cytokinesis** after telophase; it is common in plants.',
  sol: 'Individual chromosomes vs whole sets; non-disjunction vs failed cytokinesis.',
  scheme: [['Aneuploidy with cause', 1], ['Polyploidy with cause', 1]],
  d: 2, c: 'understanding', t: [6],
}));
add('disorders-long', long({
  stem: 'Distinguish between Mendelian and chromosomal disorders. Describe one autosomal Mendelian disorder and two chromosomal disorders, giving their cause and main features.',
  model: '**Difference.** Mendelian disorders are caused by alteration or mutation in a single gene and follow Mendelian patterns that can be traced in pedigrees. Chromosomal disorders are caused by the absence, excess or abnormal arrangement of one or more chromosomes.\n\n**Phenylketonuria (autosomal recessive Mendelian).** The enzyme that converts phenylalanine into tyrosine is missing, so phenylalanine and its derivatives accumulate and damage the brain, causing mental retardation; they are also excreted in the urine.\n\n**Down’s syndrome (chromosomal).** An additional copy of chromosome 21 (trisomy 21). Features include short stature, a small round head, a furrowed tongue, a partly open mouth, a broad palm with a characteristic crease, and delayed physical, psychomotor and mental development.\n\n**Turner’s syndrome (chromosomal).** Absence of one X chromosome (45, XO). Such females are sterile, with rudimentary ovaries and a lack of secondary sexual characters.',
  sol: 'Definition contrast; one Mendelian; two chromosomal.',
  scheme: [['Difference between the two categories', 1], ['One Mendelian disorder with cause and feature', 2], ['Two chromosomal disorders with cause and features', 2]],
  wl: [80, 170],
  d: 3, c: 'understanding', t: [6],
}));
add('counsel-long', long({
  stem: 'A young man and woman, both healthy, learn from blood tests that each is a carrier of β-thalassemia. Evaluate their risk of having an affected child and explain what genetic counselling could tell them, including why the disorder is called a quantitative one.',
  model: '**The disorder.** β-thalassemia is an autosomal recessive blood disorder. It arises from mutation or deletion of the HBB gene on chromosome 11, which reduces the synthesis of β-globin chains. Too little haemoglobin is made, causing anaemia; this is why it is a quantitative problem, unlike sickle-cell anaemia, in which an incorrect globin is made.\n\n**Risk.** Each carrier passes the faulty allele with probability one half. In every pregnancy, there is a one in four chance of an affected child, a one in two chance of a healthy carrier, and a one in four chance of a child with two normal alleles. The chances are the same for each pregnancy.\n\n**Counselling.** A counsellor would explain these chances clearly, point out that carriers are healthy, discuss prenatal testing options and medical care for affected children, and support the couple’s own informed decision without blame.\n\n**Evaluation.** The risk is real but not certain; knowing their carrier status lets them plan with accurate information.',
  sol: 'Nature of the disorder; Mendelian risks; counselling; judgement.',
  scheme: [['Autosomal recessive, β-globin gene on chromosome 11, reduced synthesis', 1], ['Quantitative vs qualitative', 1], ['Risk 1/4 affected, 1/2 carrier, 1/4 normal per pregnancy', 1], ['Role of counselling', 1], ['Balanced judgement', 1]],
  wl: [80, 180],
  d: 5, c: 'evaluation', t: [6],
}), () => cross('Tt', 'Tt').get('tt') === 0.25 || 'risk');

// ---------------------------------------------------------------- cases
{
  const ratioRW = Math.round((315 / 101) * 10) / 10;
  add('pea-case', mk.case({
    passage: 'A student repeated some of Mendel’s crosses using peas with round (R) and wrinkled (r) seeds.\n\n| Cross | Parents | Offspring |\n|---|---|---|\n| 1 | True-breeding round × wrinkled | 160 round |\n| 2 | Plants from cross 1, self-pollinated | 315 round, 101 wrinkled |\n| 3 | Plants from cross 1 × wrinkled | 203 round, 197 wrinkled |',
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'What is the genotype of the plants produced in cross 1?',
        right: 'Rr',
        wrong: ['RR', 'rr', 'RR and rr in equal numbers'],
        sol: 'RR × rr gives only Rr, all round — option (@K).',
        d: 1, c: 'understanding', t: [1],
      })),
      part('b', num({
        stem: 'In cross 2, what is the ratio of round to wrinkled seeds, to one decimal place (round ÷ wrinkled)?',
        value: ratioRW, tol: 0.05,
        sol: r`$\dfrac{315}{101} \approx ${ratioRW}$, close to the expected 3 : 1.`,
        scheme: [[`${ratioRW}`, 1]],
        d: 2, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain the result of cross 3 and name the kind of cross it is.',
        model: 'Cross 3 is a **test cross** (Rr × rr). The Rr parent makes **R and r gametes in equal numbers**, while rr makes only r, so offspring are Rr (round) and rr (wrinkled) in about **1 : 1** — 203 : 197.',
        sol: 'Test cross; equal gametes.',
        scheme: [['Test cross', 1], ['Equal R and r gametes give 1 : 1', 1]],
        d: 3, c: 'application', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'If the plants of cross 2 had produced 400 seeds, how many wrinkled seeds would be expected? Show how the observed numbers support the law of segregation.',
          model: 'Expected wrinkled = **1/4 × 400 = 100**. In cross 2 the observed 315 : 101 is close to **3 : 1**; wrinkled seeds reappear unchanged, showing that the r allele was carried unblended in the F1 and **separated into half of the gametes**, as the law of segregation states.',
          sol: '1/4 × 400; 3 : 1 supports segregation.',
          scheme: [['100 wrinkled', 1], ['3 : 1 and reappearance show segregation', 1]],
          d: 3, c: 'analysis', t: [1],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 3.1 && expect(phenoRatio('Rr', 'Rr').get('r'), 400) === 100 || 'values');
}
{
  const p = xlinked('XXh', 'XY');
  const pSon = p.affectedSon / (p.affectedSon + p.normalSon);
  add('colour-case', mk.case({
    passage: 'Arun is colour blind; his wife Meera has normal vision and no family history of colour blindness. Their daughter Priya has normal vision. Priya marries Kiran, who has normal vision. Their first son, Rohan, is colour blind.',
    d: 3, c: 'analysis',
    children: [
      part('a', mcq({
        stem: 'What is Priya’s genotype for this trait?',
        right: 'A carrier with one normal X and one X carrying the allele',
        wrong: ['Two normal X chromosomes', 'Two X chromosomes carrying the allele', 'One X and one Y chromosome'],
        sol: 'Priya received the allele-carrying X from her colour-blind father and a normal X from her mother, so she is a carrier — confirmed by her colour-blind son — option (@K).',
        d: 2, c: 'analysis', t: [5],
      })),
      part('b', num({
        stem: 'What is the probability that Priya and Kiran’s next son will also be colour blind? Give your answer as a decimal.',
        value: pSon,
        sol: r`Each son gets one of Priya’s two X chromosomes, one of which carries the allele: $\dfrac{1}{2} = ${pSon}$.`,
        scheme: [[`${pSon}`, 1]],
        d: 3, c: 'application', t: [5],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain why the trait “skipped” Priya’s generation but appeared in her son.',
        model: 'Priya is a **heterozygous carrier**: her normal X allele masks the recessive allele, so she has normal vision. Her son received her **X carrying the allele** and a **Y** from Kiran; with no second X to mask it, the recessive allele is expressed.',
        sol: 'Carrier female; hemizygous son.',
        scheme: [['Priya is a carrier; allele masked', 1], ['Son has one X, so the allele is expressed', 1]],
        d: 3, c: 'analysis', t: [5],
      }), [
        short({
          marks: 2,
          stem: 'Can any daughter of Priya and Kiran be colour blind? Explain.',
          model: '**No.** Every daughter receives Kiran’s X, which carries the **normal** allele. So a daughter can at most be a **carrier** (if she also receives Priya’s X with the allele); she cannot be colour blind.',
          sol: 'Father’s normal X protects every daughter.',
          scheme: [['No', 1], ['Daughters get the father’s normal X; at most carriers', 1]],
          d: 3, c: 'analysis', t: [5],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 0.5 || 'value');
}
{
  const rf = recombination(52 + 48, 1000);
  add('linkage-case', mk.case({
    passage: 'A student crossed fruit flies that were heterozygous for two genes on the same chromosome with flies recessive for both, and counted the offspring.\n\n| Offspring type | Number |\n|---|---|\n| Parental type 1 | 452 |\n| Parental type 2 | 448 |\n| Recombinant type 1 | 52 |\n| Recombinant type 2 | 48 |',
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'What do these results show about the two genes?',
        right: 'They are linked, because recombinants are far fewer than parental types.',
        wrong: ['They assort independently, because there are four classes.', 'They are on different chromosomes, because recombinants appear.', 'They are alleles of the same gene.'],
        sol: 'Independent assortment would give four classes in equal numbers; here parental types dominate, so the genes are linked — option (@K).',
        d: 3, c: 'analysis', t: [3],
      })),
      part('b', num({
        stem: 'What is the recombination frequency between the two genes, in percent?',
        value: rf, unit: '%',
        sol: r`Recombinants $= 52 + 48 = 100$ of $1000$, so $\dfrac{100}{1000} \times 100 = ${rf}$ percent.`,
        scheme: [[`${rf}%`, 1]],
        d: 2, c: 'application', t: [3],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain how the recombinant offspring arose.',
        model: 'During meiosis in the heterozygous parent, **crossing over** between the two gene loci exchanged segments of the **homologous chromosomes**, producing gametes with **non-parental** combinations of alleles; these gave the recombinant offspring.',
        sol: 'Crossing over between homologues.',
        scheme: [['Crossing over in meiosis', 1], ['Exchange between homologues gives new combinations', 1]],
        d: 3, c: 'understanding', t: [3],
      }), [
        short({
          marks: 2,
          stem: 'A third gene shows 35 percent recombination with the first gene. Which gene is closer to the first gene, and why?',
          model: 'The **second gene** (10 percent) is closer. The farther apart two genes are, the more often a **crossover** falls between them, so a **lower** recombination frequency means a **shorter** distance.',
          sol: 'Lower frequency = closer.',
          scheme: [['Second gene', 1], ['Recombination increases with distance', 1]],
          d: 3, c: 'application', t: [3],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 10 || 'value');
}
{
  const c = cross('Ss', 'Ss');
  add('sickle-case', mk.case({
    passage: 'A family had their blood tested.\n\n| Person | Haemoglobin genotype | Health |\n|---|---|---|\n| Father | HbᴬHbˢ | Healthy |\n| Mother | HbᴬHbˢ | Healthy |\n| Son | HbˢHbˢ | Frequent anaemia; red cells sickle-shaped at low oxygen |\n| Daughter | HbᴬHbᴬ | Healthy |',
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'What type of disorder does this family show?',
        right: 'Autosomal recessive Mendelian disorder',
        wrong: ['X-linked recessive disorder', 'Chromosomal disorder (aneuploidy)', 'Autosomal dominant disorder'],
        sol: 'Both carrier parents are healthy and only the HbˢHbˢ child is affected; the gene is on an autosome — option (@K).',
        d: 2, c: 'understanding', t: [6],
      })),
      part('b', num({
        stem: 'What is the probability that the couple’s next child will be a carrier (HbᴬHbˢ)? Give your answer as a decimal.',
        value: c.get('Ss'),
        sol: r`Carrier combinations are 2 of 4: $\dfrac{2}{4} = ${c.get('Ss')}$.`,
        scheme: [[`${c.get('Ss')}`, 1]],
        d: 2, c: 'application', t: [6],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain the molecular change that causes the son’s red cells to become sickle-shaped.',
        model: 'A single base change in the β-globin gene (**GAG → GUG**) replaces **glutamic acid with valine** at the **sixth** position of the β-globin chain. The altered haemoglobin **polymerises at low oxygen**, distorting red cells into **sickle shapes**.',
        sol: 'Base and amino acid change; polymerisation.',
        scheme: [['GAG → GUG; Glu → Val at position 6', 1], ['Polymerisation at low oxygen causes sickling', 1]],
        d: 3, c: 'understanding', t: [6],
      }), [
        short({
          marks: 2,
          stem: 'Explain why the parents are healthy although each carries the sickle-cell allele.',
          model: 'The disorder is **recessive**: it appears only when a person has **two** sickle alleles. Each parent has one normal **Hbᴬ** allele, which makes enough **normal haemoglobin**, so they are healthy **carriers**.',
          sol: 'One normal allele suffices.',
          scheme: [['Recessive: needs two copies', 1], ['One normal allele makes enough normal haemoglobin', 1]],
          d: 3, c: 'application', t: [6],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 0.5 || 'value');
}
