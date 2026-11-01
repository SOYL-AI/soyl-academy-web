// ICSE 10 Biology ch02 Genetics — Part 1 (t01–t03), Part 2 (t04–t06).
import { sl, deck, table, flow, svgV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { MONO, DI, SEX, HAEMO_SVG, MENDEL } from './svgs.mjs';
import { MONO_N, MONO_SPLIT, DI_N, DI_SPLIT, DI_R, MONO_R } from './calc.mjs';

export const V = {
  mono: svgV(MONO, 'Punnett square for Vv × Vv'),
  di: svgV(DI, 'Punnett square for TtVv × TtVv'),
  sex: svgV(SEX, 'Sex determination in humans'),
  haemo: svgV(HAEMO_SVG, 'Haemophilia: carrier mother × normal father'),
  mendel: svgV(MENDEL, 'Monohybrid cross from parents to F2'),
};

export const deck1 = deck({
  part: 1,
  title: 'Genetics — Part 1: Terms, Mendel and the monohybrid cross',
  goals: [
    'Define the terms gene, allele, dominant, recessive, homozygous, heterozygous, phenotype, genotype, mutation and variation',
    'State Mendel’s three laws and explain why he chose the garden pea',
    'Work out a monohybrid cross to the F2 and derive the 3 : 1 and 1 : 2 : 1 ratios',
  ],
  slides: [
    sl('title', 'Genetics', {
      b: 'Part 1 — the language of genetics, Mendel’s experiments and the monohybrid cross.',
      v: flow('LR', [['g', 'Genes on chromosomes'], ['a', 'Alleles: forms of a gene'], ['c', 'Crosses and ratios'], ['l', 'Laws of inheritance']], [['g', 'a'], ['a', 'c'], ['c', 'l']], 'Flow from genes on chromosomes to alleles, to crosses and ratios, to the laws of inheritance'),
      n: 'Why do children resemble their parents, yet differ from them and from one another? Genetics is the study of heredity and variation. We start with a few key words, then follow a monk’s experiments on garden peas.',
    }),
    sl('concept', 'Key terms', {
      v: table(['Term', 'Meaning', 'Pea example'], [['Gene', 'Unit of heredity on a chromosome', 'Gene for flower colour'], ['Allele', 'One of the alternative forms of a gene', 'V (violet) and v (white)'], ['Dominant', 'Shows its effect even in a single copy', 'V'], ['Recessive', 'Shows only when two copies are present', 'v'], ['Homozygous', 'Two identical alleles', 'VV or vv'], ['Heterozygous', 'Two different alleles', 'Vv'], ['Genotype', 'Genetic make-up', 'Vv'], ['Phenotype', 'Visible character', 'Violet flowers']], 'Table of eight genetic terms with meanings and pea examples'),
      n: 'A gene for flower colour can exist in two forms, called alleles. The violet allele is dominant and the white one recessive. A plant with two identical alleles is homozygous; one with two different alleles is heterozygous. Genotype is the allele pair; phenotype is what you see.',
    }),
    sl('concept', 'Mutation and variation', {
      v: table(['Term', 'Meaning'], [['Variation', 'Differences among individuals of the same species'], ['Mutation', 'A sudden heritable change in a gene or chromosome; a source of new variation']], 'Table defining variation and mutation'),
      n: 'No two people, apart from identical twins, are genetically alike. Such differences are variations. Some arise from new mixtures of genes; others from mutations, sudden changes in the genetic material that can be passed on.',
    }),
    sl('check', 'Quick check: two recessive alleles', {
      b: 'A pea plant with genotype vv is…',
      chk: 'homo-mcq',
      n: 'Are the two alleles alike or different, and which kind are they?',
    }),
    sl('concept', 'Why Mendel chose the garden pea', {
      v: table(['Feature', 'Why it helped'], [['Clearly contrasting characters', 'Tall or dwarf, violet or white: easy to score'], ['Self-pollinating', 'Pure lines are kept easily'], ['Can be crossed by hand', 'Chosen parents can be mated'], ['Short life cycle, many seeds', 'Large numbers in a short time']], 'Table of features of the garden pea and why each helped Mendel'),
      n: 'Gregor Mendel chose an ideal plant. Its characters come in clear pairs. It normally fertilises itself, so pure lines stay pure, yet he could cross plants by hand. And it grows quickly with many seeds, so he could count large numbers.',
    }),
    sl('diagram', 'A monohybrid cross', {
      b: 'A **monohybrid cross** follows one pair of contrasting characters.',
      v: V.mendel,
      n: 'Cross pure violet with pure white. Every first generation plant is violet: white has vanished. Let these plants pollinate themselves, and white reappears in about a quarter of the second generation. Mendel explained this with factors, which we now call genes.',
    }),
    sl('diagram', 'The Punnett square', {
      b: `Vv × Vv gives VV, Vv, Vv, vv: **${MONO_R.join(' violet : ')} white** and **1 VV : 2 Vv : 1 vv**.`,
      v: V.mono,
      n: 'Write the gametes of one parent down the side and the other along the top. Fill each box by combining them. Three boxes have at least one violet allele, so three quarters are violet. One box has two white alleles.',
    }),
    sl('example', 'Worked example 1: expected numbers', {
      b: `${MONO_N} F2 plants from a Vv × Vv cross.`,
      ul: ['Step 1: find the fractions: violet three quarters, white one quarter.', `Step 2: multiply by ${MONO_N}.`, 'Step 3: check that the numbers add up.'],
      v: table(['Phenotype', 'Fraction', 'Expected number'], [['Violet', 'Three quarters', String(MONO_SPLIT[0])], ['White', 'One quarter', String(MONO_SPLIT[1])]], `Worked table: of eight hundred and twenty plants, six hundred and fifteen violet and two hundred and five white`),
      n: 'Ratios become numbers by simple multiplication. Three quarters of eight hundred and twenty is six hundred and fifteen violet plants, and one quarter is two hundred and five white. Real counts come close to these, not exactly equal.',
    }),
    sl('concept', 'Mendel’s laws', {
      v: table(['Law', 'Statement'], [['Dominance', 'In a hybrid, only the dominant character shows'], ['Segregation (purity of gametes)', 'The two alleles separate at gamete formation; each gamete gets one'], ['Independent assortment', 'Alleles of different genes are distributed to gametes independently']], 'Table of Mendel’s three laws with statements'),
      n: 'Three laws came from these crosses. Dominance: the hybrid shows only one character. Segregation: alleles separate into gametes, so gametes are pure. Independent assortment, which we meet in Part two: different genes are sorted into gametes independently.',
    }),
    sl('check', 'Quick check: violet F2 plants', {
      b: 'True or false: two of every three violet F2 plants are heterozygous.',
      chk: 'mono-tf',
      n: 'Count the violet boxes and see how many are Vv.',
    }),
    sl('example', 'Worked example 2: the test cross', {
      b: 'Is a violet plant VV or Vv? Cross it with white (vv).',
      ul: ['Step 1: VV × vv gives all Vv: **all violet**.', 'Step 2: Vv × vv gives Vv and vv: **half white**.', 'Step 3: read the parent’s genotype from the offspring.'],
      v: table(['If the violet parent is', 'Offspring'], [['VV', 'All violet'], ['Vv', 'Half violet, half white']], 'Worked table: a VV parent gives all violet offspring; a Vv parent gives half violet and half white'),
      n: 'Because the white parent can give only white alleles, each offspring shows exactly which allele the violet parent passed on. Any white offspring prove the parent was heterozygous.',
    }),
    sl('check', 'Quick check: the visible character', {
      b: 'Fill in: the visible expression of a character is its ______.',
      chk: 'terms-fill',
      n: 'Genotype is the letters; this is what you see.',
    }),
    sl('summary', 'Summary', {
      ul: ['Alleles are forms of a gene; dominant shows in one copy, recessive needs two.', 'Genotype is the allele pair; phenotype is the visible character.', 'Monohybrid F2: 3 : 1 phenotypes, 1 : 2 : 1 genotypes.', 'Laws: dominance, segregation, independent assortment.'],
      v: table(['Cross', 'Result'], [['VV × vv', 'All Vv, violet'], ['Vv × Vv', '3 violet : 1 white'], ['Vv × vv', '1 violet : 1 white']], 'Summary table of three crosses and their results'),
      n: 'To recap. Genes come in alleles. In a monohybrid cross the hybrid shows the dominant character, and the recessive one returns in a quarter of the second generation. A test cross with the recessive parent reveals a hidden genotype.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Always write the **gametes** before the Punnett square.', 'Use a **capital** for the dominant allele and the **same letter, small,** for the recessive.', 'Give **both** ratios for a monohybrid F2.', 'State laws in full sentences.'],
      n: 'Exam tips. Show the gametes, then the square. Use one letter in capital and small form for each gene. For a monohybrid cross, give both the phenotypic and genotypic ratios, and state each law as a full sentence.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Genetics — Part 2: Dihybrid cross, sex determination and X-linked inheritance',
  goals: [
    'Work out the F2 phenotypes of a dihybrid cross and obtain the 9 : 3 : 3 : 1 ratio',
    'Explain with a cross why the father’s gamete determines the sex of the child',
    'Work out crosses for haemophilia and colour blindness and explain why they are commoner in males',
  ],
  slides: [
    sl('title', 'Two Characters, Sex and X-linked Traits', {
      b: 'Part 2 — the dihybrid cross, how sex is decided, and disorders carried on the X chromosome.',
      v: flow('LR', [['d', 'Dihybrid cross'], ['s', 'Sex determination'], ['x', 'X-linked inheritance']], [['d', 's'], ['s', 'x']], 'Flow: dihybrid cross, then sex determination, then X-linked inheritance'),
      n: 'Mendel next followed two characters at once. Then we turn to people: how the sex of a baby is decided, and why some disorders such as haemophilia appear mostly in boys.',
    }),
    sl('diagram', 'The dihybrid cross', {
      b: `TTVV (tall violet) × ttvv (dwarf white) gives TtVv in F1. The F2 has **four phenotypes in the ratio ${DI_R.join(' : ')}**.`,
      v: V.di,
      n: 'The first generation plants are all tall and violet. Each forms four kinds of gametes. Combining them gives sixteen boxes: nine tall violet, three tall white, three dwarf violet and one dwarf white. Two of these are new combinations.',
    }),
    sl('concept', 'Independent assortment', {
      v: flow('LR', [['f', 'F1: TtVv'], ['g', 'Gametes: TV, Tv, tV, tv (equal)'], ['p', 'F2: 9 : 3 : 3 : 1'], ['n', 'New combinations appear']], [['f', 'g'], ['g', 'p'], ['p', 'n']], 'Flow: F1 TtVv forms four kinds of gametes in equal numbers, giving a nine three three one F2 with new combinations'),
      n: 'Height and flower colour do not travel together. Each gene is sorted into gametes on its own, so all four combinations of alleles are equally likely. That is Mendel’s law of independent assortment.',
    }),
    sl('example', 'Worked example 1: dihybrid numbers', {
      b: `${DI_N} F2 plants from TtVv × TtVv.`,
      ul: ['Step 1: fractions are nine, three, three and one sixteenths.', `Step 2: multiply each by ${DI_N}.`, 'Step 3: check the total.'],
      v: table(['Phenotype', 'Fraction', 'Expected'], [['Tall violet', '9 of 16', String(DI_SPLIT[0])], ['Tall white', '3 of 16', String(DI_SPLIT[1])], ['Dwarf violet', '3 of 16', String(DI_SPLIT[2])], ['Dwarf white', '1 of 16', String(DI_SPLIT[3])]], 'Worked table: of six hundred and forty plants, three hundred and sixty tall violet, one hundred and twenty tall white, one hundred and twenty dwarf violet, forty dwarf white'),
      n: 'One sixteenth of six hundred and forty is forty. Multiply forty by nine, three, three and one to get three hundred and sixty, one hundred and twenty, one hundred and twenty and forty. They add back to six hundred and forty.',
    }),
    sl('check', 'Quick check: the double recessive', {
      b: 'True or false: one plant in sixteen shows both recessive characters.',
      chk: 'di-tf',
      n: 'Which box in the square has no capital letters?',
    }),
    sl('diagram', 'Sex determination in humans', {
      b: 'Body cells: **44 + XX** (female), **44 + XY** (male). Eggs: all **22 + X**. Sperms: **22 + X** or **22 + Y**.',
      v: V.sex,
      n: 'A mother can give only an X chromosome. A father gives either an X or a Y, in equal numbers. If an X sperm fertilises the egg, the baby is a girl; a Y sperm gives a boy. So the father’s sperm decides the sex.',
    }),
    sl('example', 'Worked example 2: boy or girl?', {
      b: 'A couple has two sons. What is the chance that the third child is a girl?',
      ul: ['Step 1: each sperm is X or Y with equal chance.', 'Step 2: earlier births do not affect the next one.', 'Step 3: the chance is **one half**.'],
      v: table(['Sperm', 'Egg', 'Child', 'Chance'], [['22 + X', '22 + X', 'Girl (44 + XX)', 'One half'], ['22 + Y', '22 + X', 'Boy (44 + XY)', 'One half']], 'Worked table: an X sperm gives a girl and a Y sperm gives a boy, each with a chance of one half'),
      n: 'Chance has no memory. Whatever the sexes of earlier children, every new pregnancy has an equal chance of a boy or a girl. Blaming the mother has no scientific basis.',
    }),
    sl('check', 'Quick check: two kinds of sperm', {
      b: 'True or false: a man produces X-bearing and Y-bearing sperms in equal numbers.',
      chk: 'sex-tf',
      n: 'Think of how his pair of sex chromosomes separates at meiosis.',
    }),
    sl('diagram', 'X-linked inheritance: haemophilia', {
      b: 'Genes for **haemophilia** and **colour blindness** lie on the **X chromosome**; the faulty alleles are **recessive**.',
      v: V.haemo,
      n: 'A carrier mother has one normal and one faulty X. Her daughters receive a normal X from the father, so none is affected, though half are carriers. Her sons have only her X, so half of them have haemophilia.',
    }),
    sl('concept', 'Why males are affected more often', {
      v: table(['', 'Males (XY)', 'Females (XX)'], [['Copies of X', 'One', 'Two'], ['One faulty allele gives', 'The disorder', 'A carrier only'], ['Affected when', 'Their single X is faulty', 'Both X are faulty (rare)']], 'Table comparing males and females for an X-linked recessive allele'),
      n: 'A boy has only one X. If it carries the faulty allele, nothing on the Y can mask it, so he is affected. A girl must inherit faulty alleles on both X chromosomes, which is rare, so most girls are only carriers.',
    }),
    sl('concept', 'Colour blindness', {
      v: table(['Parents', 'Daughters', 'Sons'], [['Colour-blind father × normal mother', 'All carriers', 'All normal'], ['Normal father × carrier mother', 'Half carriers, half normal', 'Half colour blind, half normal']], 'Table of two colour-blindness crosses and their daughters and sons'),
      n: 'Colour blindness is inherited in the same way. A colour blind father passes his X to every daughter, making them carriers, but never to his sons. A carrier mother passes the faulty X to half her sons, who are then colour blind.',
    }),
    sl('check', 'Quick check: where the genes lie', {
      b: 'Fill in: genes for haemophilia and colour blindness lie on the ______ chromosome.',
      chk: 'xlink-fill',
      n: 'Which sex chromosome do both men and women have?',
    }),
    sl('summary', 'Summary', {
      ul: [`Dihybrid F2: ${DI_R.join(' : ')}; two new combinations; independent assortment.`, 'Females 44 + XX, males 44 + XY; the father’s sperm decides sex.', 'Haemophilia and colour blindness are X-linked recessive; males are affected more often.', 'Carrier mothers pass the allele to half their sons.'],
      v: table(['Idea', 'Key point'], [['Dihybrid', '9 : 3 : 3 : 1'], ['Sex', 'X or Y sperm'], ['X-linked', 'Commoner in males']], 'Summary table of the dihybrid ratio, sex determination and X-linked inheritance'),
      n: 'To recap. Two genes assort independently, giving nine to three to three to one. A baby’s sex depends on the sperm. And recessive alleles on the X show up mainly in males, passed on through carrier mothers.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['For a dihybrid cross give the **phenotypic ratio only**: the genotypic ratio is not in your syllabus.', 'In X-linked crosses, write alleles as **superscripts on X**; the Y carries none.', 'Answer "who decides sex?" with the **gametes of both parents**.', 'Say **carrier**, not "affected", for a heterozygous woman.'],
      n: 'Exam tips. Give only the phenotypic ratio for a dihybrid cross. In sex linked crosses, write alleles on the X only. Show both parents’ gametes when explaining sex determination, and call a heterozygous woman a carrier.',
    }),
  ],
});
