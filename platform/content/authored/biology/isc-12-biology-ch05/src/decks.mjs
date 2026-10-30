// ISC 12 Biology ch05 Principles of Inheritance — two decks: Part 1 (t01–t02), Part 2 (t03–t06).
import { sl, deck, table, flow, svgV, r } from '../../isc-12-biology-ch01/src/lib.mjs';
import { MONO, DI, SNAP, LINKAGE, PEDIGREE, PED_AD } from './svgs.mjs';
import { cross, phenoRatio, ratio, abo, expect, recombination, polyClasses, polyExtreme } from './calc.mjs';

export const V = {
  mono: svgV(MONO, 'Punnett square of Tt × Tt giving tall and dwarf in 3 : 1 and genotypes 1 : 2 : 1'),
  di: svgV(DI, 'Punnett square of RrYy × RrYy giving 9 : 3 : 3 : 1'),
  snap: svgV(SNAP, 'Punnett square of snapdragon Rr × Rr giving red, pink and white in 1 : 2 : 1'),
  linkage: svgV(LINKAGE, 'Linked genes on homologous chromosomes and recombinants after crossing over'),
  pedigree: svgV(PEDIGREE, 'Pedigree symbols and an X-linked recessive pedigree'),
  pedAD: svgV(PED_AD, 'A three-generation pedigree in which every affected person has an affected parent'),
};

// ---------------------------------------------------------------- computed numbers
const TEST = ratio(phenoRatio('Tt', 'tt'), ['D', 'r']);
const MONO_R = ratio(phenoRatio('Tt', 'Tt'), ['D', 'r']);
const GENO = ratio(cross('Tt', 'Tt'), ['TT', 'Tt', 'tt']);
const DI_R = ratio(phenoRatio('RrYy', 'RrYy'), ['DD', 'Dr', 'rD', 'rr']);
const N = 1600;
const DI_N = DI_R.map((k) => expect(k / 16, N));
const ABO = abo('AO', 'BO');
const RF = recombination(120, 1000);
const PC = polyClasses(3);
const PX = polyExtreme(3);

export const deck1 = deck({
  part: 1,
  title: 'Principles of Inheritance — Part 1: Mendel’s laws',
  goals: [
    'Use the terms of genetics correctly',
    'State Mendel’s principles and the reasons for his success',
    'Work out monohybrid and dihybrid crosses, back crosses and test crosses with Punnett squares',
  ],
  slides: [
    sl('title', 'Principles of Inheritance', {
      b: 'Part 1 — how characters pass from parents to offspring, as Mendel first worked out.',
      v: flow('LR', [['h', 'Heredity: transmission of characters'], ['v', 'Variation: differences among offspring'], ['g', 'Genetics: the study of both']], [['h', 'g'], ['v', 'g']], 'Flow showing heredity and variation as the subject of genetics'),
      n: 'Children resemble their parents, yet no two siblings are exactly alike. Heredity is the transmission of characters from parents to offspring, and variation is the degree to which offspring differ. Genetics studies both. Gregor Mendel, working with garden peas from 1856 to 1863, discovered the basic rules.',
    }),
    sl('concept', 'Terms of genetics', {
      b: 'A clear vocabulary makes crosses easy to describe.',
      v: table(['Term', 'Meaning'], [['Gene (factor)', 'Unit of inheritance that controls a character'], ['Alleles', 'Alternative forms of a gene, e.g. T (tall) and t (dwarf)'], ['Homologous chromosomes', 'A pair of chromosomes with the same genes in the same positions'], ['Autosomes and sex chromosomes', 'Chromosomes not involved in sex determination, and those that are (X, Y)'], ['Genotype', 'Genetic make-up, e.g. TT, Tt, tt'], ['Phenotype', 'Observable character, e.g. tall'], ['Homozygous / heterozygous', 'Two identical alleles (TT, tt) / two different alleles (Tt)']], 'Table of genetic terms and their meanings'),
      n: 'Each character is controlled by a gene that comes in alternative forms called alleles. An organism carries two alleles for each gene, one on each of a pair of homologous chromosomes. Its genotype is the pair of alleles; its phenotype is what we see.',
    }),
    sl('concept', 'Why Mendel succeeded', {
      b: 'Mendel chose the **garden pea** and worked carefully.',
      v: table(['Reason', 'Why it mattered'], [['Pea plants', 'Easy to grow, short life cycle, naturally self-pollinating with true-breeding lines, and easy to cross artificially'], ['Seven pairs of contrasting characters', 'Clear either/or traits such as tall/dwarf, round/wrinkled seeds'], ['One or two characters at a time', 'Kept results simple to interpret'], ['Large samples and statistics', 'Ratios became reliable; records kept carefully'], ['Luck', 'The characters he chose were on different chromosomes or far apart, so they assorted independently']], 'Table of reasons for Mendel’s success'),
      n: 'Mendel used true-breeding lines, counted thousands of plants and applied mathematics to biology for the first time. He also studied traits one or two at a time, which revealed simple ratios that earlier workers had missed.',
    }),
    sl('diagram', 'Monohybrid cross', {
      b: `Crossing true-breeding tall (TT) with dwarf (tt) gives an all-tall **F1 (Tt)**. Selfing the F1 gives an **F2** in which tall : dwarf = **${MONO_R.join(' : ')}**, and genotypes TT : Tt : tt = **${GENO.join(' : ')}**.`,
      v: V.mono,
      n: 'The dwarf character disappears in the first generation and reappears in a quarter of the second. Mendel concluded that factors come in pairs, that one can be dominant over the other, and that the pair separates when gametes form.',
    }),
    sl('concept', 'Mendel’s first two laws', {
      b: 'From monohybrid crosses Mendel proposed:',
      v: table(['Law', 'Statement'], [['Law of dominance', 'Characters are controlled by discrete factors that occur in pairs; in a dissimilar pair one (dominant) expresses itself over the other (recessive)'], ['Law of segregation', 'The two alleles of a pair do not blend; they separate during gamete formation, so each gamete receives only one allele']], 'Table of the laws of dominance and segregation'),
      n: 'The law of dominance explains why the first hybrid generation shows only one parental form and why the second generation shows a three-to-one ratio. The law of segregation, sometimes called the law of purity of gametes, explains why the recessive form reappears unchanged.',
    }),
    sl('example', 'Worked example 1: the test cross', {
      b: 'A tall pea plant may be TT or Tt. How can its genotype be found? Predict the ratios.',
      ul: [
        'Cross it with a **homozygous recessive** dwarf (tt): a **test cross**.',
        'If it is TT, all offspring are tall (Tt).',
        r`If it is Tt, tall : dwarf $= ${TEST.join(' : ')}$ (computed from Tt $\times$ tt).`,
        'A cross of the F1 with either parent is a **back cross**; the test cross is the back cross with the recessive parent.',
      ],
      v: table(['Unknown parent', 'Offspring of × tt', 'Conclusion'], [['TT', 'All tall', 'Homozygous'], ['Tt', `Tall : dwarf = ${TEST.join(' : ')}`, 'Heterozygous']], `Worked table: test-cross ratios all tall or ${TEST.join(' : ')}`),
      n: 'A recessive parent contributes only recessive alleles, so the offspring reveal exactly what the unknown parent passed on. If any dwarf offspring appear, the tall parent must have carried a hidden dwarf allele.',
    }),
    sl('check', 'Quick check: test cross', {
      b: 'What ratio is expected when a heterozygous tall plant is test-crossed?',
      n: 'Quick check. Half the gametes carry the recessive allele.',
      chk: 'testcross-mcq',
    }),
    sl('diagram', 'Dihybrid cross', {
      b: `Crossing round yellow (RRYY) with wrinkled green (rryy) gives an all round-yellow F1 (RrYy). Selfing the F1 gives four phenotypes in the ratio **${DI_R.join(' : ')}** — two parental and two new combinations.`,
      v: V.di,
      n: 'Sixteen combinations of gametes give four kinds of seed. Round yellow and wrinkled green are the parental types; round green and wrinkled yellow are new combinations, which could appear only if the two genes are inherited independently.',
    }),
    sl('concept', 'Law of independent assortment', {
      b: 'When two pairs of traits are combined in a hybrid, the segregation of one pair of characters is **independent** of the other pair. Each F1 forms **four kinds of gametes** (RY, Ry, rY, ry) in equal proportions.',
      v: table(['Gene', 'F2 ratio alone'], [['Seed shape (R, r)', '3 round : 1 wrinkled'], ['Seed colour (Y, y)', '3 yellow : 1 green'], ['Together', '(3 : 1) × (3 : 1) = 9 : 3 : 3 : 1']], 'Table showing the dihybrid ratio as a product of two monohybrid ratios'),
      n: 'Each gene on its own still gives three to one, so the dihybrid ratio is simply the product of two monohybrid ratios. This works only because the genes are on different chromosomes, or far apart on the same one.',
    }),
    sl('example', 'Worked example 2: predicting numbers', {
      b: `An F2 from RrYy × RrYy has ${N} seeds. How many of each phenotype are expected?`,
      ul: [
        r`Round yellow $= \dfrac{9}{16} \times ${N} = ${DI_N[0]}$; round green $= \dfrac{3}{16} \times ${N} = ${DI_N[1]}$.`,
        r`Wrinkled yellow $= \dfrac{3}{16} \times ${N} = ${DI_N[2]}$; wrinkled green $= \dfrac{1}{16} \times ${N} = ${DI_N[3]}$.`,
      ],
      v: table(['Phenotype', 'Fraction', 'Expected'], [['Round yellow', '9/16', String(DI_N[0])], ['Round green', '3/16', String(DI_N[1])], ['Wrinkled yellow', '3/16', String(DI_N[2])], ['Wrinkled green', '1/16', String(DI_N[3])]], `Worked table: ${DI_N.join(', ')} seeds`),
      n: 'Multiply each fraction by the total. Nine sixteenths of sixteen hundred is nine hundred; three sixteenths is three hundred; one sixteenth is one hundred. Real counts will be close to these but rarely exact.',
    }),
    sl('check', 'Quick check: dihybrid', {
      b: 'How many kinds of gametes does an RrYy plant form?',
      n: 'Quick check. Combine one allele of each gene.',
      chk: 'gametes-num',
    }),
    sl('check', 'Quick check: segregation', {
      b: 'Judge the assertion and the reason about Mendel’s results.',
      n: 'Quick check. Why does the recessive form reappear in the second generation?',
      chk: 'segregation-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Terms: gene, allele, homologous chromosomes, autosomes, sex chromosomes, genotype, phenotype, homozygous, heterozygous.',
        'Mendel’s success: pea, true-breeding lines, seven contrasting pairs, one or two traits at a time, large samples, statistics.',
        `Monohybrid F2: ${MONO_R.join(' : ')} phenotypes, ${GENO.join(' : ')} genotypes; laws of dominance and segregation.`,
        `Test cross with recessive parent: all dominant (homozygous) or ${TEST.join(' : ')} (heterozygous); back cross with either parent.`,
        `Dihybrid F2: ${DI_R.join(' : ')}; law of independent assortment.`,
      ],
      v: table(['Cross', 'Ratio'], [['Monohybrid F2', MONO_R.join(' : ')], ['Test cross (Tt × tt)', TEST.join(' : ')], ['Dihybrid F2', DI_R.join(' : ')]], 'Summary table of three key ratios'),
      n: 'To recap: Mendel’s careful experiments with peas revealed that factors come in pairs, separate into gametes and, for different characters, assort independently. The three-to-one, one-to-one and nine-three-three-one ratios follow from these rules.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Always write **gametes** before the Punnett square.',
        'Give **both** phenotypic and genotypic ratios for monohybrid crosses.',
        'Distinguish **test cross** from **back cross**.',
        'State each law in Mendel’s own sense, not just its name.',
      ],
      n: 'Exam tips. Show the gametes before drawing the square. Give both kinds of ratio. Keep test cross and back cross apart. And state each law fully.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Principles of Inheritance — Part 2: Beyond Mendel, pedigrees and linkage',
  goals: [
    'Explain incomplete dominance, codominance and multiple alleles',
    'Explain polygenic inheritance and pleiotropy with examples',
    'Analyse pedigrees',
    'Explain the chromosomal theory of inheritance, linkage and crossing over',
  ],
  slides: [
    sl('title', 'Deviations from Mendelism', {
      b: 'Part 2 — cases that Mendel’s simple rules do not fully describe.',
      v: flow('LR', [['i', 'Incomplete dominance'], ['c', 'Codominance'], ['m', 'Multiple alleles'], ['p', 'Polygenic inheritance'], ['l', 'Pleiotropy']], [['i', 'c'], ['c', 'm'], ['m', 'p'], ['p', 'l']], 'Flow of five deviations from simple Mendelian inheritance'),
      n: 'Mendel’s laws still hold: alleles segregate and assort. But dominance is not always complete, a gene may have more than two alleles, a character may depend on many genes, and one gene may affect many characters.',
    }),
    sl('diagram', 'Incomplete dominance: snapdragon', {
      b: 'In the snapdragon (dog flower), a cross between true-breeding **red (RR)** and **white (rr)** gives **pink (Rr)** F1 plants. The F2 shows red : pink : white = **1 : 2 : 1**, so the **phenotypic ratio equals the genotypic ratio**.',
      v: V.snap,
      n: 'Neither allele is fully dominant, so the heterozygote has an intermediate colour. The alleles have not blended, though: red and white reappear unchanged in the next generation.',
    }),
    sl('concept', 'Codominance and multiple alleles: ABO blood groups', {
      b: 'The ABO blood group is controlled by gene **I** with three alleles, **Iᴬ, Iᴮ and i**. Iᴬ and Iᴮ produce slightly different sugars on red cells; i produces none. Iᴬ and Iᴮ are **codominant** (both expressed in Iᴬ Iᴮ), and both are dominant over i. A person carries only two of the three alleles.',
      v: table(['Genotype', 'Blood group'], [['IᴬIᴬ, Iᴬi', 'A'], ['IᴮIᴮ, Iᴮi', 'B'], ['IᴬIᴮ', 'AB (codominance)'], ['ii', 'O']], 'Table of ABO genotypes and blood groups'),
      n: 'Three alleles give six genotypes but only four blood groups. Group AB shows codominance: both sugars appear. Because there are more than two alleles in the population, ABO is also an example of multiple alleles.',
    }),
    sl('example', 'Worked example 1: blood groups of children', {
      b: 'A mother of group A (Iᴬi) and a father of group B (Iᴮi) have children. Which blood groups are possible, and in what proportion?',
      ul: [
        'Gametes: mother Iᴬ or i; father Iᴮ or i.',
        r`Children: Iᴬ Iᴮ (AB), Iᴬi (A), Iᴮi (B), ii (O), each with probability $\dfrac{1}{4}$.`,
        'So all **four** groups are possible, in the ratio **1 : 1 : 1 : 1**.',
      ],
      v: table(['Child group', 'Probability'], [['A', String(ABO.get('A'))], ['B', String(ABO.get('B'))], ['AB', String(ABO.get('AB'))], ['O', String(ABO.get('O'))]], 'Worked table: each blood group with probability one quarter'),
      n: 'Two heterozygous parents of groups A and B can have a child of any of the four groups. This is why blood groups alone can only exclude, never prove, parentage.',
    }),
    sl('check', 'Quick check: blood groups', {
      b: 'Which genotype gives blood group O?',
      n: 'Quick check. It has no Iᴬ or Iᴮ allele.',
      chk: 'groupO-mcq',
    }),
    sl('concept', 'Polygenic inheritance and pleiotropy', {
      b: '**Polygenic inheritance:** a character controlled by **several genes** with additive effects, giving continuous variation, e.g. **human skin colour** (three genes A, B, C) and height. **Pleiotropy:** **one gene** with **multiple phenotypic effects**.',
      v: table(['Pleiotropy example', 'Effects'], [['Phenylketonuria (human)', 'A mutation in the gene for phenylalanine hydroxylase causes mental retardation and reduced hair and skin pigmentation'], ['Starch synthesis in pea', 'Gene B: BB makes much starch (large grains, round seeds); bb little (small grains, wrinkled seeds); Bb round seeds but intermediate grain size — so dominance depends on the phenotype considered']], 'Table of two examples of pleiotropy'),
      n: 'Skin colour shows many shades because each dominant allele adds a little pigment. Pleiotropy is the opposite situation: one gene, many effects. In peas the same starch gene controls both seed shape and starch grain size, and the heterozygote is dominant for one but intermediate for the other.',
    }),
    sl('example', 'Worked example 2: polygenic classes', {
      b: 'Skin colour is controlled by three additive genes. A man and a woman are both AaBbCc. How many phenotype classes can their children show, and what fraction is expected to be as dark as AABBCC?',
      ul: [
        r`Number of dominant alleles can be 0 to 6, so classes $= 2k + 1 = 2 \times 3 + 1 = ${PC}$.`,
        r`Darkest (AABBCC) $= \left(\dfrac{1}{4}\right)^3 = \dfrac{1}{64} \approx ${PX.toFixed(4)}$.`,
      ],
      v: table(['Quantity', 'Value'], [['Genes (k)', '3'], ['Phenotype classes', String(PC)], ['Fraction AABBCC', '1/64']], `Worked table: ${PC} classes, 1/64 darkest`),
      n: 'Each child can carry anywhere from zero to six dominant alleles, giving seven shades. The chance of getting the dominant allele for all three genes from both parents is one quarter cubed, one in sixty-four.',
    }),
    sl('diagram', 'Pedigree analysis', {
      b: 'In humans, controlled crosses are not possible, so the inheritance of a trait is studied in a family tree, a **pedigree**, using standard symbols.',
      v: V.pedigree,
      n: 'Squares are males and circles females; filled symbols show affected people. A horizontal line joins parents and a vertical line leads to their children. Pedigrees help genetic counsellors to predict the risk of a disorder in future children.',
    }),
    sl('diagram', 'Reading a pedigree', {
      b: 'Clues: an **autosomal dominant** trait appears in **every generation**, and **every affected person has an affected parent**. An **autosomal recessive** trait can appear in children of **unaffected parents** (both carriers), often after consanguineous marriage. If **both sexes** are affected about equally, the gene is probably **autosomal**.',
      v: V.pedAD,
      n: 'In this family, every affected person has an affected parent, and both men and women are affected. That pattern fits an autosomal dominant trait. If affected children had appeared from two unaffected parents, the trait would have to be recessive.',
    }),
    sl('check', 'Quick check: pedigree', {
      b: 'Two unaffected parents have an affected daughter. What does this suggest about the trait?',
      n: 'Quick check. Where did her two alleles come from?',
      chk: 'recessive-mcq',
    }),
    sl('diagram', 'Chromosomal theory, linkage and crossing over', {
      b: '**Sutton and Boveri** noted that chromosomes, like Mendel’s factors, occur in pairs and segregate at meiosis: genes are on chromosomes (**chromosomal theory of inheritance**). **Morgan**, working with **Drosophila**, found that genes on the same chromosome tend to be inherited together (**linkage**), but are sometimes separated by **crossing over**, giving **recombinants**.',
      v: V.linkage,
      n: 'Tightly linked genes lie close together and rarely recombine. Loosely linked genes lie far apart and recombine often. Morgan’s student Sturtevant used recombination frequencies to map the positions of genes on chromosomes.',
    }),
    sl('example', 'Worked example 3: recombination frequency', {
      b: 'In a test cross of a dihybrid fruit fly, 1000 offspring include 880 parental types and 120 recombinants. Find the recombination frequency and comment on the linkage.',
      ul: [
        r`Recombination frequency $= \dfrac{120}{1000} \times 100 = ${RF}$ percent.`,
        'This is far below the 50 percent expected for unlinked genes, so the genes are **linked**, fairly close together on one chromosome.',
      ],
      v: table(['Offspring', 'Number'], [['Parental types', '880'], ['Recombinants', '120'], ['Recombination frequency', `${RF} percent`]], `Worked table: recombination frequency ${RF} percent`),
      n: 'Unlinked genes would give equal parental and recombinant types, fifty percent each. Only twelve percent recombinants means the genes usually travel together, so they are linked; the low value shows they lie quite close.',
    }),
    sl('check', 'Quick check: linkage', {
      b: 'Judge the assertion and the reason about linked genes.',
      n: 'Quick check. How does distance affect crossing over?',
      chk: 'linkage-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Incomplete dominance: snapdragon, F2 1 : 2 : 1 (phenotype = genotype).',
        'Codominance and multiple alleles: ABO (Iᴬ, Iᴮ, i); AB codominant; six genotypes, four groups.',
        'Polygenic: skin colour (2k + 1 classes); pleiotropy: phenylketonuria, starch synthesis in pea.',
        'Pedigrees: symbols; dominant traits appear in every generation; recessive traits from carrier parents.',
        'Chromosomal theory (Sutton and Boveri); linkage and crossing over (Morgan, Drosophila); recombination frequency maps genes.',
      ],
      v: table(['Pattern', 'Example'], [['Incomplete dominance', 'Snapdragon'], ['Codominance', 'Blood group AB'], ['Polygenic', 'Skin colour'], ['Pleiotropy', 'Phenylketonuria']], 'Summary table of patterns with examples'),
      n: 'To recap: dominance can be incomplete or shared, genes can have many alleles, many genes can affect one trait and one gene many traits. Pedigrees reveal patterns in human families, and linkage shows that genes on the same chromosome travel together unless crossing over separates them.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'In incomplete dominance, say the alleles **do not blend** — parental types reappear.',
        'Write ABO genotypes with **Iᴬ, Iᴮ, i**.',
        'Give a **reason** when identifying a pedigree pattern.',
        'Use **recombination frequency** to judge distance between genes.',
      ],
      n: 'Exam tips. Make clear that alleles do not blend. Write blood-group genotypes properly. Always give a reason when you identify a pattern in a pedigree. And relate recombination frequency to distance.',
    }),
  ],
});
