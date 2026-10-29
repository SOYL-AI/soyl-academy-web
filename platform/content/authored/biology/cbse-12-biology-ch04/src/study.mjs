// ch04 notes and flashcards.
import { T, table, flow, unit, PROV } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Principles of Inheritance and Variation — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Mendel’s experiments and the monohybrid cross',
      `**Inheritance** is the process by which characters pass from parent to progeny; **variation** is the degree to which progeny differ from their parents. **Gregor Mendel** crossed garden peas for seven years (1856–1863), used **14 true-breeding varieties** (seven pairs of contrasting traits) and applied statistics to large samples.

| Character | Dominant | Recessive |
|---|---|---|
| Stem height | Tall | Dwarf |
| Flower colour | Violet | White |
| Flower position | Axial | Terminal |
| Pod shape | Inflated | Constricted |
| Pod colour | Green | Yellow |
| Seed shape | Round | Wrinkled |
| Seed colour | Yellow | Green |

**Monohybrid cross:** tall (TT) × dwarf (tt) → F1 all tall (Tt) → F1 selfed → F2 **3 tall : 1 dwarf**; genotypes **TT : Tt : tt = 1 : 2 : 1**. A **gene** has alternative forms, **alleles**; homozygous (TT, tt), heterozygous (Tt); genotype vs phenotype. The **Punnett square** (Reginald Punnett) shows all gamete combinations.

**Test cross:** a dominant-phenotype organism × the **homozygous recessive**: all dominant offspring → homozygous; 1 : 1 → heterozygous.

**Law of dominance:** characters are controlled by discrete paired units (factors); in a dissimilar pair one (dominant) is expressed. **Law of segregation:** alleles do not blend; the two members of a pair separate during gamete formation, so each gamete gets only one.`,
      [kt('Allele', 'An alternative form of a gene.'), kt('Test cross', 'Cross of an organism showing the dominant phenotype with a homozygous recessive, to find its genotype.'), kt('Law of segregation', 'The two alleles of a gene separate during gamete formation, so each gamete carries only one.')],
      V.mono,
      [1],
    ),
    sec(
      '2. Dihybrid cross and independent assortment',
      `Round yellow (RRYY) × wrinkled green (rryy) → F1 round yellow (RrYy). F1 gametes: **RY, Ry, rY, ry** in equal numbers. F2: **9 round yellow : 3 round green : 3 wrinkled yellow : 1 wrinkled green**.

**Law of independent assortment:** when two pairs of traits are combined in a hybrid, segregation of one pair is independent of the other. Hence 9 : 3 : 3 : 1 = (3 : 1) × (3 : 1), and probabilities of independent genes **multiply**.

Dihybrid **test cross** (RrYy × rryy) → **1 : 1 : 1 : 1**.

Mendel published in 1865; the work was rediscovered in **1900** by de Vries, Correns and von Tschermak.`,
      [kt('Dihybrid cross', 'A cross following two characters at the same time.'), kt('Law of independent assortment', 'Alleles of different genes segregate independently of each other during gamete formation.')],
      V.di,
      [1],
    ),
    sec(
      '3. Deviations from Mendelian ratios',
      `**Incomplete dominance:** snapdragon (Antirrhinum) red (RR) × white (rr) → pink F1 (Rr); F2 **1 red : 2 pink : 1 white** (phenotypic = genotypic ratio). Alleles still segregate; this is not blending.

**What dominance means:** a gene makes a product (often an enzyme). A modified allele may make a normal, a less efficient or a non-functional enzyme, or none. If the unmodified allele alone gives the full phenotype, the modified allele behaves as **recessive**.

**Co-dominance and multiple alleles:** ABO blood groups — gene **I**, alleles **Iᴬ, Iᴮ, i**; Iᴬ and Iᴮ are co-dominant, both dominant over i.
| Genotypes | Blood group |
|---|---|
| IᴬIᴬ, Iᴬi | A |
| IᴮIᴮ, Iᴮi | B |
| IᴬIᴮ | AB |
| ii | O |
Six genotypes, four phenotypes. Multiple alleles are found only in a population; an individual has two.

**Pleiotropy:** one gene, many effects — phenylketonuria (mental retardation, reduced hair and skin pigmentation); pea starch gene (BB large starch grains and round seeds; bb small grains, wrinkled; Bb round seeds but intermediate grains — dominance depends on the phenotype studied).

**Polygenic inheritance:** traits controlled by three or more genes with additive effects and environmental influence, giving continuous variation — human skin colour (AABBCC darkest, aabbcc lightest, AaBbCc intermediate) and height.`,
      [kt('Incomplete dominance', 'Heterozygote shows a phenotype intermediate between the two homozygotes.'), kt('Co-dominance', 'Both alleles are fully expressed in the heterozygote, as in blood group AB.'), kt('Pleiotropy', 'A single gene affecting more than one phenotype.'), kt('Polygenic trait', 'A trait controlled by several genes, showing continuous variation.')],
      V.snap,
      [2],
    ),
    sec(
      '4. Chromosomal theory, linkage and recombination',
      `**Sutton and Boveri** noted that chromosomes, like Mendel's factors, occur in pairs, segregate at gamete formation and assort independently, and proposed the **chromosomal theory of inheritance**. **T. H. Morgan** proved it with **Drosophila melanogaster** (simple synthetic medium, life cycle of about two weeks, many progeny per mating, clear sex differences, many visible variations).

Morgan's dihybrid crosses with **X-linked genes** gave far more parental than recombinant types. **Linkage:** physical association of genes on a chromosome. **Recombination:** generation of non-parental gene combinations (by crossing over).
- Body colour and eye colour (yellow, white): **1.3 percent** recombination — tightly linked.
- Eye colour and wing size (white, miniature): **37.2 percent** — loosely linked.

Tightly linked genes show low recombination; loosely linked genes show high recombination. **Sturtevant** used recombination frequency as a measure of distance to **map gene positions** on chromosomes.`,
      [kt('Linkage', 'Physical association of two or more genes on a chromosome, so they tend to be inherited together.'), kt('Recombination', 'Generation of non-parental gene combinations, through crossing over.')],
      V.linkage,
      [3],
    ),
    sec(
      '5. Sex determination',
      `**Henking** (1891) named the **X body** in insect sperm (later the X chromosome).
| System | Example | Female | Male |
|---|---|---|---|
| XO | Grasshopper | XX | XO |
| XY | Humans, Drosophila | XX | XY |
| ZW | Birds | ZW | ZZ |

XO and XY: **male heterogamety**; ZW: **female heterogamety**. Humans: 22 pairs of autosomes + XX or XY; ova all carry X; sperms carry X or Y (50 : 50), so the **sperm decides the sex**.

**Honey bee (haplodiploidy):** fertilised eggs (32 chromosomes) → females (queen, workers); unfertilised eggs → males (drones, 16 chromosomes) by **parthenogenesis**. Drones make sperm by **mitosis**, have no father and so no sons, but have a grandfather and can have grandsons.`,
      [kt('Autosomes', 'Chromosomes other than the sex chromosomes.'), kt('Male heterogamety', 'The male produces two kinds of gametes with respect to sex chromosomes.'), kt('Haplodiploidy', 'Sex determination in which males develop from unfertilised (haploid) eggs and females from fertilised (diploid) eggs.')],
      V.sexdet,
      [4],
      [flow('LR', [['f', 'Fertilised egg (32)'], ['u', 'Unfertilised egg (16)'], ['w', 'Female'], ['d', 'Male drone']], [['f', 'w'], ['u', 'd']], 'Flow of honey bee sex determination')],
    ),
    sec(
      '6. Pedigree analysis and sex-linked disorders',
      `A **pedigree** follows a trait over generations of a family; standard symbols: square (male), circle (female), filled (affected), dot in circle (carrier female), horizontal line (mating), double line (consanguineous mating), Roman numerals for generations.

**X-linked recessive disorders** (allele on the X chromosome; males hemizygous):
- **Haemophilia:** a protein in the clotting cascade is affected; a simple cut may bleed non-stop. Transmitted from unaffected carrier females to some sons; affected females are very rare (mother at least a carrier and father haemophilic). Seen in the descendants of Queen Victoria.
- **Colour blindness:** defect in red or green cone cells; about 8 percent of males and 0.4 percent of females; a daughter is colour blind only if her mother is at least a carrier and her father is colour blind.

Carrier mother × normal father → each son 1/2 chance affected; no daughter affected; half of daughters carriers. Affected father × normal mother → all daughters carriers, no son affected.`,
      [kt('Pedigree', 'A chart showing the inheritance of a trait over generations of a family.'), kt('Carrier', 'A heterozygous individual who carries a recessive allele without showing the trait.')],
      V.pedigree,
      [5],
    ),
    sec(
      '7. Mendelian and chromosomal disorders',
      `**Mendelian disorders** (single-gene): haemophilia, cystic fibrosis, sickle-cell anaemia, colour blindness, phenylketonuria, thalassemia.
- **Sickle-cell anaemia** (autosomal recessive): **glutamic acid (Glu) replaced by valine (Val)** at the **sixth** position of the **β-globin** chain, from the single base change **GAG → GUG**. Disease only in **HbˢHbˢ**; **HbᴬHbˢ** are carriers. The changed haemoglobin polymerises at low oxygen, so red cells become sickle-shaped.
- **Phenylketonuria** (autosomal recessive): the enzyme that converts phenylalanine into tyrosine is missing; phenylalanine and its derivatives build up and damage the brain (mental retardation) and are excreted in urine.
- **Thalassemia** (autosomal recessive): reduced synthesis of a globin chain, causing anaemia. **α**: genes **HBA1, HBA2** on **chromosome 16**; **β**: gene **HBB** on **chromosome 11**. Thalassemia is a **quantitative** problem (too little globin); sickle-cell is **qualitative** (wrong globin).

**Chromosomal disorders:** non-disjunction gives **aneuploidy**; failure of cytokinesis gives **polyploidy** (common in plants).
| Syndrome | Karyotype | Features |
|---|---|---|
| Down's | Trisomy 21 | Short stature, small round head, furrowed tongue, partly open mouth, broad palm with a characteristic crease; delayed physical, psychomotor and mental development |
| Klinefelter's | 47, XXY | Overall masculine development with feminine features such as gynaecomastia; sterile |
| Turner's | 45, XO | Sterile female, rudimentary ovaries, lack of secondary sexual characters |`,
      [kt('Aneuploidy', 'Gain or loss of one or more chromosomes, caused by failure of chromatids to separate.'), kt('Trisomy', 'Presence of an extra copy of a chromosome, as chromosome 21 in Down’s syndrome.')],
      table(['Disorder', 'Category'], [['Haemophilia, colour blindness', 'X-linked recessive'], ['Sickle-cell, phenylketonuria, thalassemia', 'Autosomal recessive'], ['Down’s, Klinefelter’s, Turner’s', 'Chromosomal']], 'Table of disorders by category'),
      [6],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Skipping gametes in crosses, or giving only one of the genotypic and phenotypic ratios.
- Writing that the F1 of incomplete dominance shows "blending" (alleles still segregate).
- Confusing pleiotropy with polygenic inheritance.
- Saying ABO has four genotypes (there are six).
- Saying birds have male heterogamety (it is female: ZW).
- Writing sickle-cell as "Val replaced by Glu" (it is Glu → Val, GAG → GUG).
- Mixing up karyotypes: Klinefelter's 47, XXY; Turner's 45, XO.

**How marks are usually awarded**
- 1-mark items: ratio, term, example or karyotype.
- 2–3-mark answers: correct cross with gametes (1–2) + ratio and conclusion (1).
- 5-mark answers: a full cross (P, gametes, F1, F2 with Punnett square) with ratios (3) + the law it illustrates (1) + one more point (1).
- Case-based items: reading a pedigree or a set of offspring counts, with a 2-mark part with an internal choice.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Why did Mendel use the garden pea?', 'True-breeding lines, clear contrasting traits, controllable pollination, many seeds.', 'concept', 1),
    fc(2, 'Pod colour vs seed colour: dominant forms?', 'Pod: green dominant. Seed: yellow dominant.', 'exam-tip', 1),
    fc(3, 'Monohybrid F2 ratios?', 'Phenotypic 3 : 1; genotypic 1 : 2 : 1.', 'fact', 1),
    fc(4, 'What is a test cross?', 'Crossing a dominant-phenotype organism with a homozygous recessive to find its genotype.', 'definition', 1),
    fc(5, 'Law of segregation?', 'Alleles of a pair separate during gamete formation; each gamete gets one.', 'definition', 1),
    fc(6, 'Dihybrid F2 ratio?', '9 : 3 : 3 : 1.', 'fact', 1),
    fc(7, 'Dihybrid test cross ratio?', '1 : 1 : 1 : 1.', 'fact', 1),
    fc(8, 'Law of independent assortment?', 'Segregation of one pair of alleles is independent of another pair.', 'definition', 1),
    fc(9, 'Who rediscovered Mendel’s work in 1900?', 'de Vries, Correns and von Tschermak.', 'fact', 1),
    fc(10, 'Incomplete dominance: example and F2 ratio?', 'Snapdragon flower colour; 1 red : 2 pink : 1 white.', 'example', 2),
    fc(11, 'ABO alleles and which are co-dominant?', 'Iᴬ, Iᴮ, i; Iᴬ and Iᴮ are co-dominant.', 'concept', 2),
    fc(12, 'Number of ABO genotypes and phenotypes?', 'Six genotypes, four phenotypes.', 'fact', 2),
    fc(13, 'Pleiotropy: definition and example?', 'One gene, many effects; phenylketonuria.', 'definition', 2),
    fc(14, 'Polygenic inheritance: example?', 'Human skin colour (also height).', 'example', 2),
    fc(15, 'Why is a recessive allele recessive (enzyme view)?', 'It makes a non-functional enzyme or none, so the unmodified allele decides the phenotype.', 'concept', 2),
    fc(16, 'Who proposed the chromosomal theory?', 'Sutton and Boveri.', 'fact', 3),
    fc(17, 'Why Drosophila for genetics?', 'Simple medium, two-week life cycle, many progeny, clear sexes, visible variations.', 'concept', 3),
    fc(18, 'Define linkage and recombination.', 'Linkage: genes on one chromosome inherited together. Recombination: non-parental combinations formed.', 'definition', 3),
    fc(19, 'Recombination: yellow–white vs white–miniature?', '1.3 percent (tight) vs 37.2 percent (loose).', 'fact', 3),
    fc(20, 'Who made the first gene maps?', 'Alfred Sturtevant, using recombination frequencies.', 'fact', 3),
    fc(21, 'XO, XY and ZW: examples?', 'Grasshopper; humans and Drosophila; birds.', 'example', 4),
    fc(22, 'Which sex is heterogametic in birds?', 'The female (ZW).', 'exam-tip', 4),
    fc(23, 'Honey bee: male and female chromosome numbers?', 'Females 32 (fertilised eggs); drones 16 (unfertilised, parthenogenesis).', 'fact', 4),
    fc(24, 'Who decides the sex of a human baby?', 'The father’s sperm (X or Y).', 'concept', 4),
    fc(25, 'Pedigree: circle with a dot?', 'Carrier female.', 'diagram', 5),
    fc(26, 'Why is haemophilia commoner in males?', 'The allele is X-linked recessive; males have only one X.', 'concept', 5),
    fc(27, 'Carrier mother × normal father: sons?', 'Each son has a 1 in 2 chance of being affected.', 'fact', 5),
    fc(28, 'Sickle-cell anaemia: molecular change?', 'Glu → Val at the 6th position of β-globin; GAG → GUG.', 'fact', 6),
    fc(29, 'Phenylketonuria: missing enzyme action?', 'Conversion of phenylalanine into tyrosine.', 'fact', 6),
    fc(30, 'Thalassemia α and β genes?', 'α: HBA1, HBA2 on chromosome 16; β: HBB on chromosome 11.', 'fact', 6),
    fc(31, 'Sickle-cell vs thalassemia?', 'Qualitative (wrong globin) vs quantitative (too little globin).', 'concept', 6),
    fc(32, 'Down’s, Klinefelter’s, Turner’s karyotypes?', 'Trisomy 21; 47, XXY; 45, XO.', 'fact', 6),
  ],
  status: 'draft',
  provenance: PROV,
};
