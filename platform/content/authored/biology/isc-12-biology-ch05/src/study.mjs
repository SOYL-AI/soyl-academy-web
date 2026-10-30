// ISC 12 Biology ch05 notes and flashcards.
import { T, table, unit, PROV } from '../../isc-12-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Principles of Inheritance — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Heredity, variation and the terms of genetics',
      `**Heredity** is the transmission of characters from parents to offspring; **variation** is the degree by which progeny differ from their parents and from each other. **Genetics** deals with both.

- **Gene (Mendel’s factor):** the unit of inheritance controlling a character.
- **Alleles:** alternative forms of a gene (e.g. T for tall and t for dwarf).
- **Homologous chromosomes:** a pair of chromosomes, one from each parent, carrying the same genes at the same positions (loci).
- **Autosomes** are chromosomes not concerned with sex determination; **sex chromosomes** (X and Y in humans) determine sex.
- **Genotype:** genetic constitution (TT, Tt, tt). **Phenotype:** observable expression (tall, dwarf).
- **Homozygous:** two identical alleles (TT or tt); **heterozygous:** two different alleles (Tt).
- **Dominant** allele expresses itself in the heterozygote; **recessive** allele expresses only when homozygous.

**Mendel’s work.** Gregor Mendel conducted hybridisation experiments on garden peas (*Pisum sativum*) for seven years (1856–1863) and proposed the laws of inheritance. He selected **seven pairs of contrasting characters**: stem height (tall/dwarf), flower colour (violet/white), flower position (axial/terminal), pod shape (inflated/constricted), pod colour (green/yellow), seed shape (round/wrinkled) and seed colour (yellow/green).

**Reasons for Mendel’s success:** pea is easy to grow, has a short life cycle, is naturally self-pollinating (giving **true-breeding lines**) and is easy to cross-pollinate artificially; he chose clear contrasting characters; studied **one or two characters at a time**; used **large samples** and applied **statistics**; kept careful records; and the characters he chose happened to assort independently.`,
      [kt('Allele', 'An alternative form of a gene.'), kt('Genotype', 'The genetic constitution of an organism.'), kt('Phenotype', 'The observable expression of a character.'), kt('True-breeding line', 'A line that, on continuous self-pollination, shows stable inheritance of a character for several generations.')],
      table(['Character', 'Dominant', 'Recessive'], [['Stem height', 'Tall', 'Dwarf'], ['Flower colour', 'Violet', 'White'], ['Flower position', 'Axial', 'Terminal'], ['Pod shape', 'Inflated', 'Constricted'], ['Pod colour', 'Green', 'Yellow'], ['Seed shape', 'Round', 'Wrinkled'], ['Seed colour', 'Yellow', 'Green']], 'Table of Mendel’s seven pairs of contrasting characters'),
      [1],
    ),
    sec(
      '2. Monohybrid and dihybrid crosses',
      `**Monohybrid cross.** True-breeding tall (TT) × dwarf (tt) → F1 all tall (Tt). F1 selfed → F2: **3 tall : 1 dwarf** (phenotypic ratio) and **1 TT : 2 Tt : 1 tt** (genotypic ratio). The **Punnett square**, devised by Reginald Punnett, shows all possible gamete combinations.

**Law of dominance:** characters are controlled by discrete units called factors, which occur in pairs; in a dissimilar pair one member (dominant) dominates the other (recessive). It explains the expression of only one parental character in the F1 and both in the F2.

**Law of segregation:** the alleles do not show any blending, and both characters are recovered as such in the F2; the two alleles of a pair **segregate** during gamete formation so that each gamete receives only one (law of purity of gametes).

**Back cross and test cross.** A **back cross** is a cross of the F1 with either parent. A **test cross** is a cross of an organism showing the dominant phenotype with the **recessive parent** to find its genotype: Tt × tt gives **1 dominant : 1 recessive**; TT × tt gives all dominant.

**Dihybrid cross.** Round yellow (RRYY) × wrinkled green (rryy) → F1 all round yellow (RrYy). F1 selfed → F2: **9 round yellow : 3 round green : 3 wrinkled yellow : 1 wrinkled green**. Each gene alone still segregates 3 : 1.

**Law of independent assortment:** when two pairs of traits are combined in a hybrid, segregation of one pair of characters is independent of the other pair. The F1 forms four kinds of gametes (RY, Ry, rY, ry) in equal frequency, so (3 : 1) × (3 : 1) = 9 : 3 : 3 : 1.`,
      [kt('Monohybrid cross', 'A cross involving one pair of contrasting characters.'), kt('Test cross', 'A cross of a dominant-phenotype individual with a homozygous recessive to find its genotype.'), kt('Back cross', 'A cross of the F1 hybrid with either parent.'), kt('Law of independent assortment', 'Alleles of different genes segregate independently during gamete formation.')],
      V.mono,
      [2],
      [V.di],
    ),
    sec(
      '3. Deviations from Mendelism: incomplete dominance, codominance and multiple alleles',
      `**Incomplete dominance.** In **snapdragon** (*Antirrhinum*, dog flower), true-breeding red (RR) × white (rr) gives **pink (Rr)** F1. F2: red : pink : white = **1 : 2 : 1**, the same as the genotypic ratio. The heterozygote is intermediate because neither allele is completely dominant; the alleles do not blend, since red and white reappear.

**Codominance.** Both alleles of a heterozygote are fully expressed. **ABO blood groups** are controlled by gene **I** with three alleles: **Iᴬ, Iᴮ and i**. Iᴬ and Iᴮ produce slightly different forms of a sugar polymer on the surface of red blood cells; i produces none. Iᴬ and Iᴮ are completely dominant over i, but when both are present (IᴬIᴮ) both are expressed: **codominance**, giving group **AB**.

**Multiple alleles.** More than two alleles govern the same character in a population (Iᴬ, Iᴮ, i), though any one person carries only two. ABO has **six genotypes** and **four phenotypes**: IᴬIᴬ and Iᴬi (A), IᴮIᴮ and Iᴮi (B), IᴬIᴮ (AB), ii (O).`,
      [kt('Incomplete dominance', 'The heterozygote shows an intermediate phenotype.'), kt('Codominance', 'Both alleles are fully expressed in the heterozygote.'), kt('Multiple alleles', 'More than two alleles of a gene in a population.')],
      V.snap,
      [3],
      [table(['Genotype', 'Group'], [['IᴬIᴬ, Iᴬi', 'A'], ['IᴮIᴮ, Iᴮi', 'B'], ['IᴬIᴮ', 'AB'], ['ii', 'O']], 'Table of ABO genotypes and blood groups')],
    ),
    sec(
      '4. Polygenic inheritance and pleiotropy',
      `**Polygenic inheritance.** Traits controlled by **three or more genes**, each adding a small effect, show continuous variation, and the phenotype also reflects the environment. **Human skin colour** is controlled by three genes (A, B, C): AABBCC is the darkest, aabbcc the lightest, and AaBbCc an intermediate shade; the number of dominant alleles decides the colour. With k additive genes, the F2 of two heterozygotes shows **2k + 1 classes**; for three genes, 7 classes, with 1/64 as dark as AABBCC.

**Pleiotropy.** A single gene exhibits **multiple phenotypic expressions**, usually because it affects a metabolic pathway that contributes to several phenotypes.
- **Phenylketonuria (PKU)** in humans: a single-gene mutation in the gene coding for **phenylalanine hydroxylase** manifests as mental retardation and reduced hair and skin pigmentation.
- **Starch synthesis in pea:** gene B. **BB** plants produce large starch grains and **round** seeds; **bb** plants have less efficient starch synthesis, small grains and **wrinkled** seeds; **Bb** plants have **round** seeds but **intermediate** grain size. So for seed shape B is dominant, but for grain size it shows incomplete dominance — dominance is not an autonomous feature of a gene but depends on the phenotype considered.`,
      [kt('Polygenic inheritance', 'Inheritance of a character controlled by several genes with additive effects.'), kt('Pleiotropy', 'One gene affecting more than one phenotypic character.'), kt('Phenylketonuria', 'A disorder from a mutation in the phenylalanine hydroxylase gene, with mental retardation and reduced pigmentation.')],
      table(['Feature', 'Polygenic', 'Pleiotropic'], [['Genes', 'Several genes', 'One gene'], ['Characters', 'One character', 'Several characters'], ['Example', 'Skin colour', 'Phenylketonuria']], 'Table comparing polygenic inheritance and pleiotropy'),
      [4],
    ),
    sec(
      '5. Pedigree analysis',
      `Controlled crosses are not possible in humans, so the inheritance of a trait is studied through a family tree, a **pedigree**, over several generations, using standard **symbols**: square (male), circle (female), filled symbol (affected), circle with a dot (carrier female), horizontal line (mating), double line (consanguineous mating), vertical line to offspring, and Roman numerals for generations.

**Clues to the pattern:**
- **Autosomal dominant:** appears in **every generation**; every affected person has at least one **affected parent**; both sexes affected about equally (e.g. myotonic dystrophy).
- **Autosomal recessive:** may **skip generations**; affected children can be born to **two unaffected (carrier) parents**, often in **consanguineous** marriages; both sexes affected (e.g. sickle-cell anaemia, phenylketonuria).
- **X-linked recessive:** mostly **males** affected; passed from **carrier mothers** to sons; an affected father passes the allele to all his daughters (carriers) but to none of his sons (e.g. haemophilia, colour blindness).

Pedigree analysis is the basis of **genetic counselling**, predicting the risk of a disorder in future children.`,
      [kt('Pedigree', 'A family tree showing the inheritance of a trait over generations.'), kt('Carrier', 'A heterozygous individual who carries a recessive allele without showing the trait.'), kt('Consanguineous mating', 'Mating between close relatives, shown by a double line.')],
      V.pedigree,
      [5],
      [V.pedAD],
    ),
    sec(
      '6. Chromosomal theory of inheritance, linkage and crossing over',
      `Mendel’s work was rediscovered in **1900** by de Vries, Correns and von Tschermak. **Walter Sutton and Theodor Boveri** noted that chromosomes behave like Mendel’s factors: they occur in pairs, segregate at meiosis and assort independently. They united chromosome movement with Mendel’s principles as the **chromosomal theory of inheritance**: genes are located on chromosomes.

**Thomas Hunt Morgan** tested it with the fruit fly ***Drosophila melanogaster*** — easy to grow on simple medium, short life cycle (about two weeks), many progeny from one mating, clear distinction of sexes, and many hereditary variations visible under a low-power microscope.

**Linkage.** In dihybrid crosses of genes on the **X chromosome**, Morgan found that the proportion of parental combinations was much higher than non-parental. He attributed this to the **physical association of genes on a chromosome (linkage)**; **recombination** describes the generation of non-parental combinations, which arises by **crossing over** between homologous chromosomes during meiosis. Some genes were **tightly linked** (low recombination, e.g. 1.3 percent) and others **loosely linked** (higher recombination, e.g. 37.2 percent).

**Gene mapping.** **Alfred Sturtevant**, Morgan’s student, used the **frequency of recombination** between gene pairs on the same chromosome as a measure of the **distance** between them and mapped their positions on the chromosome.`,
      [kt('Chromosomal theory of inheritance', 'Genes are located on chromosomes, whose behaviour at meiosis explains Mendel’s laws.'), kt('Linkage', 'The physical association of genes on a chromosome so they tend to be inherited together.'), kt('Crossing over', 'Exchange of segments between homologous chromosomes during meiosis.'), kt('Recombination frequency', 'Percentage of recombinant offspring; a measure of the distance between linked genes.')],
      V.linkage,
      [6],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Giving only the phenotypic ratio for a monohybrid F2 (also give 1 : 2 : 1 genotypes).
- Calling incomplete dominance "blending" (the parental types reappear).
- Writing ABO genotypes as AA or AO without the gene symbol I.
- Confusing polygenic inheritance (many genes, one trait) with pleiotropy (one gene, many traits).
- Identifying a pedigree pattern without stating the clue.
- Saying tightly linked genes have high recombination frequency (it is low).

**How marks are usually awarded**
- 1-mark subparts: a term, a ratio, a law, an example, an expected number.
- 2–3-mark questions: Punnett squares with gametes; test crosses; ABO crosses; pedigree interpretation.
- 5-mark questions in parts: dihybrid cross with independent assortment; deviations from Mendelism; linkage with recombination frequency; pedigree analysis with a Punnett square for probability.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What are alleles?', 'Alternative forms of a gene.', 'definition', 1),
    fc(2, 'Genotype vs phenotype?', 'Genetic constitution vs observable character.', 'concept', 1),
    fc(3, 'How many contrasting pairs did Mendel study?', 'Seven.', 'fact', 1),
    fc(4, 'Two reasons for Mendel’s success?', 'True-breeding pea lines; large samples with statistics (also one trait at a time).', 'concept', 1),
    fc(5, 'Monohybrid F2 ratios?', 'Phenotype 3 : 1; genotype 1 : 2 : 1.', 'formula', 2),
    fc(6, 'Law of segregation?', 'Alleles separate during gamete formation; each gamete gets one.', 'definition', 2),
    fc(7, 'Test cross?', 'Cross with the homozygous recessive to find the genotype.', 'definition', 2),
    fc(8, 'Tt × tt ratio?', '1 dominant : 1 recessive.', 'formula', 2),
    fc(9, 'Back cross?', 'Cross of the F1 with either parent.', 'definition', 2),
    fc(10, 'Dihybrid F2 ratio?', '9 : 3 : 3 : 1.', 'formula', 2),
    fc(11, 'Gametes of RrYy?', 'RY, Ry, rY, ry in equal numbers.', 'fact', 2),
    fc(12, 'Law of independent assortment?', 'Segregation of one pair is independent of the other.', 'definition', 2),
    fc(13, 'Snapdragon F2 ratio?', 'Red 1 : pink 2 : white 1.', 'formula', 3),
    fc(14, 'Why is snapdragon not blending?', 'Red and white reappear in the F2.', 'exam-tip', 3),
    fc(15, 'Alleles of the ABO gene?', 'Iᴬ, Iᴮ and i.', 'fact', 3),
    fc(16, 'Which group shows codominance?', 'AB (IᴬIᴮ).', 'fact', 3),
    fc(17, 'ABO genotypes and phenotypes?', 'Six genotypes, four phenotypes.', 'fact', 3),
    fc(18, 'Example of polygenic inheritance?', 'Human skin colour (also height).', 'fact', 4),
    fc(19, 'Classes with k additive genes?', '2k + 1.', 'formula', 4),
    fc(20, 'Pleiotropy example in humans?', 'Phenylketonuria.', 'fact', 4),
    fc(21, 'Pea starch gene: Bb seeds and grains?', 'Round seeds; intermediate grain size.', 'concept', 4),
    fc(22, 'Autosomal dominant pedigree clue?', 'Every affected person has an affected parent.', 'exam-tip', 5),
    fc(23, 'Autosomal recessive pedigree clue?', 'Affected child of two unaffected (carrier) parents.', 'exam-tip', 5),
    fc(24, 'X-linked recessive clue?', 'Mostly males affected, via carrier mothers.', 'exam-tip', 5),
    fc(25, 'Pedigree symbol for a carrier female?', 'Circle with a central dot.', 'fact', 5),
    fc(26, 'Who proposed the chromosomal theory?', 'Sutton and Boveri.', 'fact', 6),
    fc(27, 'Why Drosophila for genetics?', 'Short life cycle, many progeny, clear sexes, visible variations.', 'concept', 6),
    fc(28, 'What is linkage?', 'Physical association of genes on one chromosome.', 'definition', 6),
    fc(29, 'Tightly vs loosely linked genes?', 'Low vs high recombination frequency.', 'concept', 6),
    fc(30, 'Who made the first gene map?', 'Alfred Sturtevant, using recombination frequency.', 'fact', 6),
  ],
  status: 'draft',
  provenance: PROV,
};
