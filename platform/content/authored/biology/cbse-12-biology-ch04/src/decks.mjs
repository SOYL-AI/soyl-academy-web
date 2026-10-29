// ch04 Principles of Inheritance and Variation — three decks: Part 1 (t01), Part 2 (t02–t03), Part 3 (t04–t06).
// Every ratio and count shown is computed by calc.mjs.
import { sl, deck, table, flow, svgV, r } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { MONO, DI, SNAP, SEXDET, LINKAGE, PEDIGREE } from './svgs.mjs';
import { cross, phenoRatio, ratio, expect, abo, xlinked, polyClasses, polyExtreme } from './calc.mjs';

export const V = {
  mono: svgV(MONO, 'Punnett square of a monohybrid cross between two heterozygous tall pea plants'),
  di: svgV(DI, 'Punnett square of sixteen boxes for a dihybrid cross between two plants heterozygous for seed shape and seed colour'),
  snap: svgV(SNAP, 'Punnett square for snapdragon flower colour showing red, pink and white offspring'),
  sexdet: svgV(SEXDET, 'Sex determination in humans: X or Y sperm with an X egg gives a girl or a boy in equal proportions'),
  linkage: svgV(LINKAGE, 'Homologous chromosomes with genes A, B and C; a crossover between B and C produces recombinant chromosomes'),
  pedigree: svgV(PEDIGREE, 'Pedigree symbols and a three-generation pedigree of an X-linked recessive trait'),
};

// ---------------------------------------------------------------- computed numbers
const N1 = 840;
const mono = phenoRatio('Tt', 'Tt');
const monoGt = cross('Tt', 'Tt');
const E1 = { tall: expect(mono.get('D'), N1), dwarf: expect(mono.get('r'), N1), TT: expect(monoGt.get('TT'), N1), Tt: expect(monoGt.get('Tt'), N1) };
const N2 = 1600;
const di = phenoRatio('RrYy', 'RrYy');
const diGt = cross('RrYy', 'RrYy');
const E2 = { ry: expect(di.get('DD'), N2), rg: expect(di.get('Dr'), N2), wy: expect(di.get('rD'), N2), wg: expect(di.get('rr'), N2), pure: expect(diGt.get('RRYY'), N2) };
const diR = ratio(di, ['DD', 'Dr', 'rD', 'rr']);
const testDi = ratio(phenoRatio('RrYy', 'rryy'), ['DD', 'Dr', 'rD', 'rr']);
const AB = abo('AO', 'BO');
const K = 3;
const PC = polyClasses(K);
const PX = polyExtreme(K);
const XL = xlinked('XXh', 'XY');
const SC = cross('Ss', 'Ss');

export const deck1 = deck({
  part: 1,
  title: 'Principles of Inheritance and Variation — Part 1: Mendel’s laws',
  goals: [
    'Explain why Mendel chose the garden pea and how he designed his crosses',
    'Work out monohybrid and dihybrid crosses with Punnett squares',
    'Use a test cross to find an unknown genotype',
    'State the laws of dominance, segregation and independent assortment',
  ],
  slides: [
    sl('title', 'Principles of Inheritance and Variation', {
      b: 'Part 1 — how Gregor Mendel discovered the rules by which characters pass from parents to offspring.',
      v: flow('LR', [['p', 'True-breeding parents'], ['c', 'Controlled crosses'], ['f', 'Counting offspring in F1 and F2'], ['l', 'Laws of inheritance']], [['p', 'c'], ['c', 'f'], ['f', 'l']], 'Flow of Mendel’s method: true-breeding parents, controlled crosses, counting offspring, laws of inheritance'),
      n: 'Why do children resemble their parents, yet differ from them and from each other? Inheritance is the passing of characters from parents to offspring, and variation is the difference among individuals. The first person to find clear rules for inheritance was Gregor Mendel, who crossed pea plants and, crucially, counted the results.',
    }),
    sl('concept', 'Why the garden pea?', {
      b: 'Mendel crossed garden pea plants for **seven years (1856–1863)** and published his results in 1865. He worked with **14 true-breeding varieties**, forming **seven pairs** of contrasting traits, and analysed large samples statistically.',
      v: table(['Feature of the pea', 'Why it helped'], [['True-breeding lines available', 'Parents give the same trait generation after generation'], ['Clear contrasting traits', 'Easy to score, for example tall or dwarf'], ['Self-pollinates naturally but can be crossed by hand', 'Crosses are controlled'], ['Many seeds per generation', 'Large samples for counting']], 'Table of features of the garden pea and why each helped Mendel'),
      n: 'Mendel chose his plant well. Peas come in true-breeding varieties that keep showing the same trait after several generations of self-pollination. Each trait comes in two clearly different forms. Pea flowers normally pollinate themselves, but Mendel could remove anthers and pollinate them by hand. And each plant gives many seeds, so he could count large numbers.',
    }),
    sl('concept', 'The seven pairs of contrasting traits', {
      b: 'In each pair, one form appeared in all the F1 plants: the **dominant** trait.',
      v: table(['Character', 'Dominant', 'Recessive'], [['Stem height', 'Tall', 'Dwarf'], ['Flower colour', 'Violet', 'White'], ['Flower position', 'Axial', 'Terminal'], ['Pod shape', 'Inflated', 'Constricted'], ['Pod colour', 'Green', 'Yellow'], ['Seed shape', 'Round', 'Wrinkled'], ['Seed colour', 'Yellow', 'Green']], 'Table of the seven pea characters with their dominant and recessive forms'),
      n: 'Here are the seven characters. Notice something tricky: for pod colour, green is dominant, but for seed colour, yellow is dominant. Learn each pair separately, because examiners like to test exactly this kind of detail.',
    }),
    sl('concept', 'A monohybrid cross', {
      b: 'Mendel crossed true-breeding **tall** and **dwarf** plants (parental, **P**, generation). All the **F1** plants were tall. When F1 plants self-pollinated, the **F2** had tall and dwarf plants in the ratio **3 : 1**; the dwarf trait had not been lost.',
      v: flow('TB', [['p', 'P: tall (TT) × dwarf (tt)'], ['g', 'Gametes: T and t'], ['f1', 'F1: all tall (Tt)'], ['s', 'F1 self-pollinated'], ['f2', 'F2: 3 tall : 1 dwarf']], [['p', 'g'], ['g', 'f1'], ['f1', 's'], ['s', 'f2']], 'Flow of a monohybrid cross from tall and dwarf parents to an all-tall F1 and an F2 of three tall to one dwarf'),
      n: 'This was Mendel’s key observation. The dwarf trait disappeared in the first generation but came back, unchanged, in a quarter of the second generation. So something controlling dwarfness must have been passed on, hidden, through the tall first-generation plants. Mendel called these units factors; today we call them genes.',
    }),
    sl('diagram', 'The Punnett square', {
      b: 'A **Punnett square** shows all the ways gametes can combine. Each F1 plant (Tt) makes **two kinds of gametes, T and t, in equal numbers**. Random fusion gives **TT : Tt : tt = 1 : 2 : 1** (genotypes) and **3 tall : 1 dwarf** (phenotypes).',
      v: V.mono,
      n: 'Write the gametes of one parent along the top and of the other down the side, then fill each box with the combination. Three boxes contain at least one tall allele, so three quarters of the plants are tall. One box has only dwarf alleles. The square was devised by the geneticist Reginald Punnett.',
    }),
    sl('concept', 'The language of genetics', {
      b: 'Each character is controlled by a **gene**; its alternative forms are **alleles**. A diploid plant carries **two alleles** for each gene.',
      v: table(['Term', 'Meaning', 'Example'], [['Homozygous', 'Two identical alleles', 'TT or tt'], ['Heterozygous', 'Two different alleles', 'Tt'], ['Dominant', 'Allele expressed in the heterozygote', 'T'], ['Recessive', 'Allele hidden in the heterozygote', 't'], ['Genotype', 'Genetic make-up', 'Tt'], ['Phenotype', 'Observable character', 'Tall']], 'Table of genetic terms with meanings and examples'),
      n: 'A gene is the unit of inheritance, and alleles are its different forms. If both alleles are the same, the plant is homozygous; if different, heterozygous. The genotype is what the plant carries; the phenotype is what you see. Two plants can share a phenotype, tall, while having different genotypes.',
    }),
    sl('example', 'Worked example 1: predicting an F2', {
      b: `An F1 tall pea plant (Tt) is self-pollinated and produces ${N1} plants. How many are expected to be tall and dwarf? How many of the tall plants are expected to be homozygous?`,
      ul: [
        r`Step 1 — Phenotypes: tall $= \dfrac{3}{4} \times ${N1} = ${E1.tall}$; dwarf $= \dfrac{1}{4} \times ${N1} = ${E1.dwarf}$.`,
        r`Step 2 — Genotypes: TT $= \dfrac{1}{4} \times ${N1} = ${E1.TT}$; Tt $= \dfrac{2}{4} \times ${N1} = ${E1.Tt}$.`,
        r`Step 3 — Of the ${E1.tall} tall plants, ${E1.TT} are homozygous, that is $\dfrac{1}{3}$ of them.`,
      ],
      v: table(['Class', 'Fraction', `Expected out of ${N1}`], [['Tall', '3/4', String(E1.tall)], ['Dwarf', '1/4', String(E1.dwarf)], ['TT', '1/4', String(E1.TT)], ['Tt', '2/4', String(E1.Tt)]], `Worked table: ${E1.tall} tall and ${E1.dwarf} dwarf; ${E1.TT} homozygous tall and ${E1.Tt} heterozygous tall`),
      n: 'Multiply each fraction by the total. Three quarters of eight hundred and forty is six hundred and thirty tall plants; one quarter is two hundred and ten dwarf. Among the tall plants, only one in three is homozygous, two hundred and ten, while four hundred and twenty are heterozygous. Real counts will be close to these, not exact.',
    }),
    sl('check', 'Quick check: F2 genotypes', {
      b: 'What is the genotypic ratio in the F2 of a monohybrid cross?',
      n: 'Quick check. Count the boxes in the Punnett square by genotype, not by appearance.',
      chk: 'f2-geno-mcq',
    }),
    sl('concept', 'The test cross', {
      b: 'A tall plant may be TT or Tt. To find out, cross it with a **homozygous recessive** (dwarf, tt) plant: a **test cross**.',
      v: table(['Unknown tall plant', 'Gametes', 'Offspring of × tt', 'Conclusion'], [['TT', 'All T', 'All tall', 'Homozygous'], ['Tt', 'T and t (1 : 1)', '1 tall : 1 dwarf', 'Heterozygous']], 'Table of test cross outcomes: all tall means homozygous, one tall to one dwarf means heterozygous'),
      n: 'The recessive parent contributes only recessive alleles, so it cannot hide anything. Whatever the offspring look like reveals the gametes of the unknown parent. All tall offspring means the plant made only tall gametes; half dwarf offspring means it was heterozygous.',
    }),
    sl('concept', 'Laws of dominance and segregation', {
      b: 'From his monohybrid crosses, Mendel proposed two principles.',
      v: table(['Law', 'Statement in brief'], [['Law of dominance', 'Characters are controlled by discrete units (factors) that occur in pairs; in a dissimilar pair, one member (dominant) is expressed and the other (recessive) is not'], ['Law of segregation', 'The two alleles of a pair do not blend; they separate during gamete formation, so each gamete receives only one of the two']], 'Table of the law of dominance and the law of segregation in brief'),
      n: 'The law of dominance explains why the first generation looks like only one parent, and why the three to one ratio appears. The law of segregation explains why the hidden allele comes back unchanged: the two alleles never mix; they separate into different gametes. That is why gametes are said to be pure for a character.',
    }),
    sl('concept', 'A dihybrid cross', {
      b: 'Mendel then followed **two characters together**: seed shape (round R, wrinkled r) and seed colour (yellow Y, green y). True-breeding round yellow (RRYY) × wrinkled green (rryy) gave an F1 of round yellow (RrYy).',
      v: flow('TB', [['p', 'P: round yellow (RRYY) × wrinkled green (rryy)'], ['f1', 'F1: all round yellow (RrYy)'], ['g', 'F1 gametes: RY, Ry, rY, ry in equal numbers'], ['f2', `F2: ${diR.join(' : ')}`]], [['p', 'f1'], ['f1', 'g', 'self-pollination'], ['g', 'f2']], 'Flow of a dihybrid cross from round yellow and wrinkled green parents to an F2 ratio of nine to three to three to one'),
      n: 'The first generation showed both dominant traits. When these plants self-pollinated, Mendel found four kinds of seeds: round yellow, round green, wrinkled yellow and wrinkled green. Two of these combinations were new, not seen in either original parent. The key is that each plant made four kinds of gametes in equal numbers.',
    }),
    sl('diagram', 'The dihybrid Punnett square', {
      b: `Sixteen equally likely combinations give **round yellow : round green : wrinkled yellow : wrinkled green = ${diR.join(' : ')}**.`,
      v: V.di,
      n: 'Each parent makes four kinds of gametes, so the square has sixteen boxes. Colour each box by the seed it gives. Nine boxes have at least one round and one yellow allele. Three are round green, three wrinkled yellow, and just one box is wrinkled green. Notice that each character alone still follows three to one.',
    }),
    sl('example', 'Worked example 2: counting a dihybrid F2', {
      b: `An F1 dihybrid (RrYy) is self-pollinated and gives ${N2} seeds. How many seeds of each phenotype are expected, and how many are expected to be pure-breeding round yellow (RRYY)?`,
      ul: [
        r`Step 1 — Round yellow $= \dfrac{9}{16} \times ${N2} = ${E2.ry}$; round green $= \dfrac{3}{16} \times ${N2} = ${E2.rg}$.`,
        r`Step 2 — Wrinkled yellow $= \dfrac{3}{16} \times ${N2} = ${E2.wy}$; wrinkled green $= \dfrac{1}{16} \times ${N2} = ${E2.wg}$.`,
        r`Step 3 — RRYY is one box in sixteen: $\dfrac{1}{16} \times ${N2} = ${E2.pure}$.`,
      ],
      v: table(['Phenotype', 'Fraction', `Expected out of ${N2}`], [['Round yellow', '9/16', String(E2.ry)], ['Round green', '3/16', String(E2.rg)], ['Wrinkled yellow', '3/16', String(E2.wy)], ['Wrinkled green', '1/16', String(E2.wg)], ['Of which RRYY', '1/16', String(E2.pure)]], `Worked table: ${E2.ry}, ${E2.rg}, ${E2.wy} and ${E2.wg} seeds, with ${E2.pure} pure-breeding round yellow`),
      n: 'One sixteenth of sixteen hundred is one hundred, which makes the arithmetic easy. Round yellow is nine sixteenths, nine hundred; each one-recessive class is three sixteenths, three hundred; wrinkled green is one hundred. Of the nine hundred round yellow seeds, only one hundred will breed true for both characters.',
    }),
    sl('concept', 'Law of independent assortment', {
      b: '**When two pairs of traits are combined in a hybrid, the segregation of one pair is independent of the other.** The dihybrid ratio is the product of two monohybrid ratios: (3 : 1) × (3 : 1) = 9 : 3 : 3 : 1.',
      v: table(['Seed shape', 'Seed colour', 'Combined fraction'], [['Round 3/4', 'Yellow 3/4', '9/16'], ['Round 3/4', 'Green 1/4', '3/16'], ['Wrinkled 1/4', 'Yellow 3/4', '3/16'], ['Wrinkled 1/4', 'Green 1/4', '1/16']], 'Table showing the dihybrid fractions as products of the monohybrid fractions'),
      n: 'Independent assortment means the gene for seed shape does not care which seed colour allele it travels with. So you can multiply probabilities: three quarters round times three quarters yellow gives nine sixteenths. This multiplication trick is the fastest way to solve dihybrid problems without drawing all sixteen boxes.',
    }),
    sl('check', 'Quick check: a dihybrid test cross', {
      b: 'What phenotypic ratio results when an F1 dihybrid (RrYy) is crossed with a wrinkled green (rryy) plant?',
      n: 'Quick check. The recessive parent hides nothing; how many kinds of gametes does the dihybrid make, and in what proportions?',
      chk: 'di-test-mcq',
    }),
    sl('check', 'Quick check: segregation', {
      b: 'Judge the assertion and the reason about the reappearance of dwarf plants.',
      n: 'Quick check. Which of Mendel’s laws explains why the recessive trait returns unchanged?',
      chk: 'segregation-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Mendel (1856–1863): garden pea, 14 true-breeding varieties, 7 pairs of contrasting traits, large samples and statistics.',
        'Monohybrid F2: phenotypes 3 : 1, genotypes 1 : 2 : 1 (TT : Tt : tt).',
        'Test cross with the homozygous recessive: all dominant → homozygous; 1 : 1 → heterozygous.',
        `Dihybrid F2: ${diR.join(' : ')}; dihybrid test cross: ${testDi.join(' : ')}.`,
        'Laws: dominance; segregation (alleles separate into gametes); independent assortment (pairs segregate independently).',
      ],
      v: table(['Cross', 'Phenotypic ratio'], [['Monohybrid F2', '3 : 1'], ['Monohybrid test cross (heterozygote)', '1 : 1'], ['Dihybrid F2', diR.join(' : ')], ['Dihybrid test cross', testDi.join(' : ')]], 'Summary table of the four key Mendelian ratios'),
      n: 'To recap: Mendel’s careful counting revealed that characters are carried by paired factors that separate into gametes and combine at random. Learn the four key ratios: three to one, one to one, nine to three to three to one, and one to one to one to one. In Part 2 we will see when these ratios change, and why.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Always show **gametes** before the Punnett square, and write both **genotypic and phenotypic** ratios.',
        'Use **standard symbols**: capital letter for dominant, same small letter for recessive.',
        'In probability questions, **multiply** independent fractions (3/4 × 1/4 = 3/16).',
        'Remember: pod colour **green** is dominant; seed colour **yellow** is dominant.',
      ],
      n: 'Exam tips. Show the gametes every time; most lost marks come from skipping them. Give both ratios. Use the same letter for both alleles of a gene. Multiply fractions for independent genes. And watch the pea colour trap: green pods, but yellow seeds, are dominant.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Principles of Inheritance and Variation — Part 2: Beyond Mendel; chromosomes and linkage',
  goals: [
    'Explain incomplete dominance, co-dominance and multiple alleles with examples',
    'Explain pleiotropy and polygenic inheritance',
    'State the chromosomal theory of inheritance',
    'Explain linkage and recombination from Morgan’s experiments',
  ],
  slides: [
    sl('title', 'Beyond Mendel', {
      b: 'Part 2 — patterns that do not follow the simple 3 : 1, and how genes on chromosomes explain them.',
      v: flow('LR', [['i', 'Incomplete dominance'], ['c', 'Co-dominance and multiple alleles'], ['p', 'Pleiotropy and polygenic traits'], ['t', 'Genes on chromosomes'], ['l', 'Linkage and recombination']], [['i', 'c'], ['c', 'p'], ['p', 't'], ['t', 'l']], 'Flow of topics in Part 2 from incomplete dominance to linkage'),
      n: 'Mendel’s rules are the foundation, but nature has many variations on them. In this part we meet traits where neither allele dominates, genes with more than two alleles, one gene affecting many traits, and many genes affecting one trait. Then we see how genes sit on chromosomes, which explains why some genes travel together.',
    }),
    sl('concept', 'Incomplete dominance', {
      b: 'In the snapdragon (Antirrhinum), true-breeding **red** (RR) × **white** (rr) gives a **pink** F1 (Rr): neither allele is completely dominant, so the heterozygote is **intermediate**.',
      v: flow('TB', [['p', 'P: red (RR) × white (rr)'], ['f1', 'F1: all pink (Rr)'], ['f2', 'F2: 1 red : 2 pink : 1 white']], [['p', 'f1'], ['f1', 'f2', 'self-pollination']], 'Flow of incomplete dominance in snapdragon from red and white parents to pink F1 and an F2 of one red to two pink to one white'),
      n: 'Pink snapdragons might look like blending, but they are not. When the pink plants are crossed, red and white flowers reappear unchanged in the next generation. The alleles stayed separate; only their effect in the heterozygote was intermediate. Mendel’s law of segregation still holds.',
    }),
    sl('diagram', 'Snapdragon F2', {
      b: 'With incomplete dominance the **phenotypic ratio equals the genotypic ratio: 1 : 2 : 1**, because each genotype has its own phenotype.',
      v: V.snap,
      n: 'In this square, each genotype produces a different colour: two red alleles give red, one of each gives pink, and two white alleles give white. So the phenotype ratio is the same as the genotype ratio, one to two to one, instead of three to one.',
    }),
    sl('concept', 'What dominance really means', {
      b: 'A gene carries information to make a product, often an **enzyme**. A changed allele may make a **normal**, a **less efficient** or a **non-functional** enzyme, or **none**.',
      v: table(['Modified allele makes', 'Phenotype of the heterozygote', 'Allele behaves as'], [['A normal or equally effective enzyme', 'Same as the unmodified type', 'Equivalent'], ['A non-functional enzyme or none', 'Decided by the unmodified allele', 'Recessive'], ['A product with an intermediate effect', 'Intermediate', 'Incompletely dominant']], 'Table showing how the product of a modified allele decides whether it behaves as equivalent, recessive or incompletely dominant'),
      n: 'Dominance is not a fight between alleles. Think of an enzyme. If one normal allele makes enough enzyme for the full effect, a broken allele beside it goes unnoticed, so it behaves as recessive. If one normal allele makes only half the product and half is not enough, the heterozygote looks intermediate.',
    }),
    sl('concept', 'Co-dominance and multiple alleles: ABO blood groups', {
      b: 'The **ABO** blood groups are controlled by gene **I** with three alleles: **Iᴬ**, **Iᴮ** and **i**. Iᴬ and Iᴮ make different sugars on red blood cells; i makes none. Iᴬ and Iᴮ are **co-dominant**; both are dominant over i. Three alleles give **six genotypes** and **four** blood groups.',
      v: table(['Genotype', 'Blood group'], [['IᴬIᴬ, Iᴬi', 'A'], ['IᴮIᴮ, Iᴮi', 'B'], ['IᴬIᴮ', 'AB'], ['ii', 'O']], 'Table of six ABO genotypes and the four blood groups they give'),
      n: 'Blood group AB shows co-dominance: both alleles are fully expressed and the cells carry both kinds of sugar. The gene also shows multiple alleles, three in the population, although each person carries only two. That is why there are six possible genotypes but only four blood groups.',
    }),
    sl('example', 'Worked example 1: blood groups of the children', {
      b: 'A father of blood group A (Iᴬi) and a mother of blood group B (Iᴮi) have children. Which blood groups are possible, and with what probability each?',
      ul: [
        'Step 1 — Gametes: father Iᴬ or i; mother Iᴮ or i, each half.',
        'Step 2 — Combinations: IᴬIᴮ (AB), Iᴬi (A), Iᴮi (B), ii (O).',
        `Step 3 — Each is 1/4: A ${AB.get('A')}, B ${AB.get('B')}, AB ${AB.get('AB')}, O ${AB.get('O')}.`,
        'Conclusion — all four blood groups are possible in one family.',
      ],
      v: table(['', 'Iᴮ (mother)', 'i (mother)'], [['Iᴬ (father)', 'IᴬIᴮ — AB', 'Iᴬi — A'], ['i (father)', 'Iᴮi — B', 'ii — O']], 'Worked Punnett table: children can be AB, A, B or O, each with probability one quarter'),
      n: 'Because both parents are heterozygous, each can pass on the hidden allele for group O. The four combinations are equally likely, so a child has a one in four chance of each blood group: A, B, AB or O. This surprises many families, but it is exactly what the alleles predict.',
    }),
    sl('check', 'Quick check: ABO genotypes', {
      b: 'How many different genotypes are possible for the human ABO blood groups?',
      n: 'Quick check. Three alleles, two at a time, including identical pairs.',
      chk: 'abo-count-mcq',
    }),
    sl('concept', 'Pleiotropy', {
      b: 'A single gene can affect **more than one** phenotype: **pleiotropy**. The underlying cause is usually the gene’s effect on a metabolic pathway.',
      v: table(['Example', 'One gene affects'], [['Phenylketonuria (human)', 'A mutation in the gene for the enzyme phenylalanine hydroxylase causes mental retardation and reduced hair and skin pigmentation'], ['Starch synthesis in pea seeds', 'BB: large starch grains, round seeds; bb: small grains, wrinkled seeds; Bb: round seeds but intermediate grain size']], 'Table of two examples of pleiotropy'),
      n: 'Pea seed shape is a lovely example. One gene controls starch synthesis. For seed shape, the round allele is dominant. But if you look at starch grain size, the heterozygote is intermediate. So dominance is not a property of the gene itself; it depends on which phenotype you look at.',
    }),
    sl('concept', 'Polygenic inheritance', {
      b: 'Traits such as **human skin colour** and height are controlled by **three or more genes**, each adding a small effect, and are influenced by the **environment**. They show a **continuous** range rather than distinct classes.',
      v: table(['Genotype (three genes, model)', 'Number of dark-pigment alleles', 'Skin colour'], [['AABBCC', '6', 'Darkest'], ['AaBbCc', '3', 'Intermediate'], ['aabbcc', '0', 'Lightest']], 'Table of a three-gene model of skin colour: six, three or zero pigment alleles give darkest, intermediate or lightest'),
      n: 'In a simple model of skin colour, three genes each have an allele that adds pigment. A person with six such alleles has the darkest skin, with none the lightest, and with three an intermediate shade. Because many combinations give each total, and because sunlight and nutrition also matter, we see a smooth range of skin colours.',
    }),
    sl('example', 'Worked example 2: how many classes?', {
      b: `Using the three-gene model, two parents are both heterozygous for all three genes (AaBbCc). How many skin-colour classes are possible among their children, and what fraction will have the darkest skin?`,
      ul: [
        r`Step 1 — Each child can carry 0 to 6 pigment alleles: $2 \times ${K} + 1 = ${PC}$ classes.`,
        r`Step 2 — Darkest needs AA, BB and CC; each has probability $\dfrac{1}{4}$.`,
        r`Step 3 — Independent genes: $\left(\dfrac{1}{4}\right)^3 = \dfrac{1}{64} \approx ${PX.toFixed(4)}$.`,
      ],
      v: table(['Pigment alleles', '0', '1', '2', '3', '4', '5', '6'], [['Class', 'Lightest', '', '', 'Middle', '', '', 'Darkest']], `Worked table: ${PC} classes from zero to six pigment alleles; the darkest class is one sixty-fourth`),
      n: 'Count the possible totals of pigment alleles, from zero to six. That is seven classes. To be in the darkest class, a child must get the pigment allele from both parents for all three genes. Each gene gives a one in four chance, and multiplying three of them gives one in sixty-four. The middle classes are the most common.',
    }),
    sl('check', 'Quick check: polygenic traits', {
      b: 'Which feature is typical of a polygenic trait?',
      n: 'Quick check. Think about how human height varies across a class.',
      chk: 'polygenic-mcq',
    }),
    sl('concept', 'The chromosomal theory of inheritance', {
      b: 'Mendel’s work was **rediscovered in 1900** by de Vries, Correns and von Tschermak. **Sutton and Boveri** noticed that chromosomes behave like Mendel’s factors and proposed the **chromosomal theory of inheritance**: genes are located on chromosomes.',
      v: table(['Mendel’s factors (genes)', 'Chromosomes'], [['Occur in pairs', 'Occur in pairs (homologous)'], ['Segregate at gamete formation; one of each pair per gamete', 'Homologues separate during meiosis'], ['Independent pairs assort independently', 'One pair separates independently of another']], 'Table of the parallel behaviour of genes and chromosomes'),
      n: 'When microscopes improved, biologists could watch chromosomes during meiosis. Sutton and Boveri saw that chromosomes come in pairs, separate into gametes and sort independently, just like Mendel’s factors. They concluded that genes must be carried on chromosomes. This united genetics with the study of cells.',
    }),
    sl('concept', 'Morgan and the fruit fly', {
      b: '**Thomas Hunt Morgan** gave experimental proof using the fruit fly **Drosophila melanogaster**.',
      v: table(['Why Drosophila', 'Advantage'], [['Grows on a simple synthetic medium', 'Easy and cheap to rear'], ['Life cycle of about two weeks', 'Many generations quickly'], ['One mating gives many offspring', 'Large samples'], ['Clear differences between male and female', 'Easy to sort'], ['Many heritable variations visible under low magnification', 'Easy to score']], 'Table of reasons why Drosophila is suitable for genetic experiments'),
      n: 'Morgan needed an organism that bred fast and showed many visible variations. The fruit fly was perfect: cheap to raise on simple food, a new generation every two weeks or so, hundreds of offspring from one mating, and easily seen differences in eye colour, body colour and wing size.',
    }),
    sl('diagram', 'Linkage and recombination', {
      b: 'Morgan found that some genes on the **same chromosome** (here, X-linked genes) did not assort independently: parental combinations were far more common than new ones. **Linkage** is the physical association of genes on a chromosome; **recombination** is the generation of non-parental combinations.',
      v: V.linkage,
      n: 'Genes on the same chromosome tend to be inherited together because they travel as one piece. But during meiosis, homologous chromosomes can swap segments by crossing over. Genes close together are rarely separated by a crossover; genes far apart are separated often. So the amount of recombination tells us how far apart genes are.',
    }),
    sl('concept', 'Measuring linkage', {
      b: 'Morgan crossed flies differing in linked genes and counted the recombinants.',
      v: table(['Gene pair (X chromosome)', 'Recombination', 'Interpretation'], [['Body colour and eye colour (yellow and white)', '1.3 percent', 'Tightly linked: very close together'], ['Eye colour and wing size (white and miniature)', '37.2 percent', 'Loosely linked: far apart']], 'Table of two gene pairs in Drosophila with their recombination frequencies and interpretation'),
      n: 'For two genes affecting body colour and eye colour, only about one percent of offspring were recombinants, so these genes are very close together. For eye colour and wing size, more than a third were recombinants, so they are far apart. Morgan’s student Alfred Sturtevant used such frequencies to draw the first maps of gene positions on a chromosome.',
    }),
    sl('check', 'Quick check: linkage', {
      b: 'Judge the assertion and the reason about two genes with 1.3 percent recombination.',
      n: 'Quick check. Low recombination tells you what about the distance between genes?',
      chk: 'linkage-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Incomplete dominance: snapdragon red × white → pink; F2 1 : 2 : 1 (phenotype = genotype).',
        'Co-dominance + multiple alleles: ABO (Iᴬ, Iᴮ, i): six genotypes, four blood groups.',
        'Pleiotropy: one gene, many effects (phenylketonuria; pea starch gene). Polygenic: many genes, one trait, continuous variation (skin colour).',
        'Chromosomal theory (Sutton and Boveri): genes on chromosomes; proof by Morgan with Drosophila.',
        'Linkage: genes on one chromosome travel together; recombination frequency reflects distance (yellow–white 1.3%, white–miniature 37.2%); gene maps by Sturtevant.',
      ],
      v: table(['Pattern', 'F2 or key result'], [['Complete dominance', '3 : 1'], ['Incomplete dominance', '1 : 2 : 1'], ['Co-dominance', 'Both alleles expressed (AB)'], ['Polygenic, 3 genes', `${PC} classes`]], 'Summary table of inheritance patterns and their key results'),
      n: 'To recap: dominance can be complete, incomplete or shared. One gene can have many alleles, or many effects. Many genes can shape one trait. And genes sit on chromosomes, so linked genes tend to stay together, with crossing over occasionally separating them in proportion to their distance apart.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'For incomplete dominance, say **why** it is not blending: parental types reappear in F2.',
        'Write ABO genotypes with **Iᴬ, Iᴮ, i** and state **six genotypes, four phenotypes**.',
        'Distinguish **pleiotropy** (one gene, many traits) from **polygenic** (many genes, one trait).',
        'Low recombination = **tight linkage** = genes **close together**.',
      ],
      n: 'Exam tips. Explain that incomplete dominance is not blending. Use the correct allele symbols for blood groups. Never confuse pleiotropy with polygenic inheritance; the words are opposites. And link low recombination with genes that are close together on a chromosome.',
    }),
  ],
});

export const deck3 = deck({
  part: 3,
  title: 'Principles of Inheritance and Variation — Part 3: Sex determination and genetic disorders',
  goals: [
    'Compare sex determination in humans, birds, grasshoppers and honey bees',
    'Use pedigree charts to follow a trait through a family',
    'Explain the inheritance of haemophilia and colour blindness',
    'Describe sickle-cell anaemia, phenylketonuria, thalassemia and the chromosomal disorders Down’s, Klinefelter’s and Turner’s syndromes',
  ],
  slides: [
    sl('title', 'Sex determination and genetic disorders', {
      b: 'Part 3 — how chromosomes decide sex, and how changes in genes and chromosomes cause disorders.',
      v: flow('LR', [['s', 'Sex chromosomes'], ['d', 'Sex determination'], ['l', 'Sex-linked traits'], ['p', 'Pedigree analysis'], ['g', 'Mendelian and chromosomal disorders']], [['s', 'd'], ['s', 'l'], ['l', 'p'], ['p', 'g']], 'Flow from sex chromosomes to sex determination, sex-linked traits, pedigrees and disorders'),
      n: 'In this part we look at a special pair of chromosomes, the sex chromosomes. They decide whether an individual is male or female, and genes on them show unusual patterns of inheritance. We will also learn how to read family trees and meet some important genetic disorders.',
    }),
    sl('concept', 'Mechanisms of sex determination', {
      b: '**Henking** (1891) traced a nuclear structure in insect sperm, the **X body**; it was later named the X chromosome. Sex chromosomes differ from **autosomes**.',
      v: table(['System', 'Example', 'Female', 'Male', 'Heterogametic sex'], [['XO', 'Grasshopper', 'XX', 'XO (one X)', 'Male'], ['XY', 'Humans, Drosophila', 'XX', 'XY', 'Male'], ['ZW', 'Birds', 'ZW', 'ZZ', 'Female']], 'Table of XO, XY and ZW sex-determination systems with examples and the heterogametic sex'),
      n: 'In grasshoppers, males have just one X chromosome, so half their sperm carry an X and half carry none. In humans and fruit flies, males have one X and one Y chromosome. In both cases the male is heterogametic, making two kinds of gametes. Birds are the opposite: the female makes two kinds of eggs, so the female decides the sex of the chick.',
    }),
    sl('diagram', 'Sex determination in humans', {
      b: 'Humans have **22 pairs of autosomes** and **one pair of sex chromosomes**. Every ovum carries **X**; sperms carry **X or Y** in equal numbers. So **the sperm decides the sex**, and every pregnancy has an even chance of a girl or a boy.',
      v: V.sexdet,
      n: 'This square should end a common myth. The mother contributes an X chromosome every time. The father’s sperm carries either an X or a Y. If an X-carrying sperm fertilises the egg, the child is a girl; if a Y-carrying sperm does, a boy. It is a matter of chance, decided by the sperm.',
    }),
    sl('concept', 'Honey bees: haplodiploidy', {
      b: 'In honey bees, sex depends on the **number of chromosome sets**. Fertilised eggs (32 chromosomes) become **females** — the queen or workers. **Unfertilised** eggs develop by **parthenogenesis** into **males (drones)** with 16 chromosomes.',
      v: flow('LR', [['q', 'Queen lays eggs'], ['f', 'Fertilised egg: 32 chromosomes'], ['u', 'Unfertilised egg: 16 chromosomes'], ['w', 'Female: queen or worker'], ['d', 'Male drone (parthenogenesis)'], ['s', 'Drone makes sperm by mitosis']], [['q', 'f'], ['q', 'u'], ['f', 'w'], ['u', 'd'], ['d', 's']], 'Flow of haplodiploid sex determination in honey bees'),
      n: 'Honey bees break the X and Y pattern completely. A drone develops from an unfertilised egg, so it has only one set of chromosomes and no father, though it can have a grandfather. Since a drone is already haploid, it makes sperm by mitosis, not meiosis. This system is called haplodiploid.',
    }),
    sl('check', 'Quick check: birds', {
      b: 'In birds, which parent decides the sex of the offspring, and why?',
      n: 'Quick check. Which sex makes two kinds of gametes in birds?',
      chk: 'birds-mcq',
    }),
    sl('diagram', 'Pedigree analysis', {
      b: 'Controlled crosses are impossible in humans, so geneticists study the inheritance of a trait over several generations of a family using a **pedigree chart**. Standard symbols make pedigrees readable.',
      v: V.pedigree,
      n: 'In a pedigree, squares are males and circles are females. A filled shape means the person shows the trait; a circle with a dot is a carrier female. A horizontal line joins parents, and a vertical line drops down to their children, with generations numbered in Roman numerals. The example follows a recessive trait carried on the X chromosome.',
    }),
    sl('concept', 'Sex-linked inheritance: haemophilia and colour blindness', {
      b: 'Both are caused by **recessive alleles on the X chromosome**. A male has only one X, so a single recessive allele shows; a female needs two. So these disorders are **much commoner in males**, and the allele passes from a **carrier mother to her sons**.',
      v: table(['Disorder', 'Defect', 'Note'], [['Haemophilia', 'A protein in the blood-clotting chain is affected; a small cut may bleed for a long time', 'Affected females are very rare (mother at least a carrier and father affected); seen in the family of Queen Victoria'], ['Colour blindness', 'Defect in red or green cone cells of the eye; cannot tell red from green', 'About 8 percent of males and 0.4 percent of females']], 'Table of haemophilia and colour blindness with the defect and notes'),
      n: 'Why do these disorders mostly affect boys? A boy gets his only X chromosome from his mother. If that X carries the faulty allele, he has no second X to cover it. A girl must inherit faulty alleles from both parents to be affected, which is much rarer. Carrier women are usually healthy but can pass the allele on.',
    }),
    sl('example', 'Worked example 1: a carrier mother', {
      b: 'A woman who is a carrier of haemophilia marries a man with normal blood clotting. What are the chances for their children?',
      ul: [
        'Step 1 — Mother: one normal X and one X carrying the allele; father: normal X and Y.',
        `Step 2 — Daughters (get father’s normal X): normal ${XL.normalDaughter * 4}/4 of all children, carrier ${XL.carrierDaughter * 4}/4, affected ${XL.affectedDaughter}.`,
        `Step 3 — Sons (get father’s Y): normal ${XL.normalSon * 4}/4, affected ${XL.affectedSon * 4}/4 of all children.`,
        'Conclusion — each son has a 1 in 2 chance of haemophilia; no daughter is affected, but half the daughters are carriers.',
      ],
      v: table(['Child', 'Probability among all children'], [['Normal daughter', String(XL.normalDaughter)], ['Carrier daughter', String(XL.carrierDaughter)], ['Affected daughter', String(XL.affectedDaughter)], ['Normal son', String(XL.normalSon)], ['Affected son', String(XL.affectedSon)]], 'Worked table: carrier mother and normal father give normal and carrier daughters and normal and affected sons, each one quarter; no affected daughters'),
      n: 'All daughters receive the father’s normal X, so none can be affected, but half receive the mother’s faulty X and become carriers. All sons receive the father’s Y and one of the mother’s two X chromosomes, so half the sons are affected. Among all the children, each of these four outcomes has a one in four chance.',
    }),
    sl('check', 'Quick check: from whom?', {
      b: 'A boy has haemophilia, but both his parents have normal blood clotting. From whom did he inherit the allele?',
      n: 'Quick check. Which parent gave the boy his X chromosome?',
      chk: 'haemo-mcq',
    }),
    sl('concept', 'Autosomal Mendelian disorders', {
      b: 'Mendelian disorders are caused by alteration or mutation in a **single gene**; they may be dominant or recessive, autosomal or sex-linked.',
      v: table(['Disorder', 'Type', 'Cause and effect'], [['Sickle-cell anaemia', 'Autosomal recessive', 'Glutamic acid replaced by valine at the sixth position of the β-globin chain (codon GAG → GUG); red cells become sickle-shaped at low oxygen'], ['Phenylketonuria', 'Autosomal recessive', 'Lack of the enzyme converting phenylalanine to tyrosine; phenylalanine builds up and damages the brain'], ['Thalassemia', 'Autosomal recessive', 'Too little globin made (α: genes HBA1, HBA2 on chromosome 16; β: gene HBB on chromosome 11); anaemia']], 'Table of three autosomal recessive disorders with cause and effect'),
      n: 'Sickle-cell anaemia comes from a single change of one base in the gene for beta globin, which swaps one amino acid. The changed haemoglobin makes red cells bend into sickle shapes when oxygen is low. Thalassemia differs: the globin itself is normal but too little is made. So sickle-cell is a problem of quality, and thalassemia a problem of quantity.',
    }),
    sl('example', 'Worked example 2: two carriers of sickle-cell trait', {
      b: 'Both parents are healthy carriers of the sickle-cell allele (HbᴬHbˢ). What are the chances that a child is affected, a carrier, or unaffected?',
      ul: [
        'Step 1 — Each parent gives Hbᴬ or Hbˢ with probability 1/2.',
        `Step 2 — HbᴬHbᴬ (unaffected) ${SC.get('SS')}; HbᴬHbˢ (carrier) ${SC.get('Ss')}; HbˢHbˢ (affected) ${SC.get('ss')}.`,
        'Conclusion — 1 in 4 affected, 1 in 2 carriers, 1 in 4 unaffected, in every pregnancy.',
      ],
      v: table(['', 'Hbᴬ (father)', 'Hbˢ (father)'], [['Hbᴬ (mother)', 'HbᴬHbᴬ — unaffected', 'HbᴬHbˢ — carrier'], ['Hbˢ (mother)', 'HbᴬHbˢ — carrier', 'HbˢHbˢ — affected']], 'Worked Punnett table: one quarter unaffected, one half carriers, one quarter affected'),
      n: 'This is a monohybrid cross with a recessive disorder. Each parent passes on either the normal or the sickle allele, equally likely. One quarter of children inherit two sickle alleles and have the disease; half are healthy carriers like their parents; one quarter inherit two normal alleles. Genetic counselling helps families understand these chances.',
    }),
    sl('concept', 'Chromosomal disorders', {
      b: 'Caused by **absence, excess or abnormal arrangement** of chromosomes. Failure of chromatids to separate in cell division (non-disjunction) causes **aneuploidy** (gain or loss of a chromosome); failure of cytokinesis after telophase gives **polyploidy**, often seen in plants.',
      v: table(['Syndrome', 'Karyotype', 'Main features'], [['Down’s syndrome', 'Trisomy 21 (47 chromosomes)', 'Short stature, small round head, furrowed tongue, partly open mouth, broad palm with a characteristic crease; delayed physical, psychomotor and mental development'], ['Klinefelter’s syndrome', '47, XXY', 'Male development with some feminine features (gynaecomastia); sterile'], ['Turner’s syndrome', '45, XO', 'Female; sterile, ovaries rudimentary; lack of secondary sexual characters']], 'Table of Down’s, Klinefelter’s and Turner’s syndromes with karyotype and main features'),
      n: 'An extra copy of chromosome twenty-one causes Down’s syndrome, first described by Langdon Down in eighteen sixty-six. An extra X in a male causes Klinefelter’s syndrome, and a missing X in a female causes Turner’s syndrome. People with these conditions deserve care and respect; early support helps them live fuller lives.',
    }),
    sl('check', 'Quick check: chromosome numbers', {
      b: 'Judge the assertion and the reason about Turner’s syndrome.',
      n: 'Quick check. Count the chromosomes in each condition carefully.',
      chk: 'turner-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'XO (grasshopper) and XY (humans, Drosophila): male heterogametic; ZW (birds): female heterogametic; honey bee: fertilised eggs → females (32), unfertilised → drones (16).',
        'Human sex is decided by the sperm; each pregnancy 1 : 1.',
        'Pedigree symbols: square male, circle female, filled affected, dot carrier.',
        'X-linked recessive: haemophilia, colour blindness; commoner in males; carrier mother → half her sons affected.',
        'Autosomal recessive: sickle-cell anaemia (Glu → Val, GAG → GUG), phenylketonuria, thalassemia (α on 16, β on 11).',
        'Chromosomal: Down’s (trisomy 21), Klinefelter’s (47, XXY), Turner’s (45, XO).',
      ],
      v: table(['Disorder', 'Category'], [['Haemophilia, colour blindness', 'Mendelian, X-linked recessive'], ['Sickle-cell anaemia, phenylketonuria, thalassemia', 'Mendelian, autosomal recessive'], ['Down’s, Klinefelter’s, Turner’s', 'Chromosomal']], 'Summary table of disorders by category'),
      n: 'To recap: sex is decided by different systems in different animals, and in humans by the father’s sperm. Pedigrees let us follow traits through families. X-linked recessive disorders mostly affect males. Sickle-cell anaemia, phenylketonuria and thalassemia are autosomal recessive. And extra or missing chromosomes cause Down’s, Klinefelter’s and Turner’s syndromes.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'In pedigree questions, first ask: **are mostly males affected?** If yes, suspect X-linked recessive.',
        'For sickle-cell anaemia, give the **amino acid change** and the **codon change**.',
        'Write karyotypes exactly: **47, XXY** and **45, XO**; Down’s is **trisomy 21**.',
        'Contrast **sickle-cell** (wrong globin) with **thalassemia** (too little globin).',
      ],
      n: 'Exam tips. When reading a pedigree, check who is affected: mostly males suggests an X-linked recessive trait. For sickle-cell anaemia, give both the amino acid change and the codon change. Write chromosome numbers exactly for the syndromes. And contrast sickle-cell anaemia with thalassemia: quality versus quantity.',
    }),
  ],
});
