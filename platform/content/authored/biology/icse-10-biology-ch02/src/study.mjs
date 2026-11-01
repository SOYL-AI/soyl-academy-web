// ICSE 10 Biology ch02 notes and flashcards.
import { T, table, unit, PROV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Genetics — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Terms in genetics',
      `**Genetics** is the study of heredity (passing of characters from parents to offspring) and variation.

| Term | Meaning |
|---|---|
| **Gene** | A unit of heredity: a segment of DNA on a chromosome that controls a character |
| **Allele** | One of the alternative forms of a gene at the same position on homologous chromosomes (V and v) |
| **Dominant** | Allele that expresses itself in the presence of another allele (V) |
| **Recessive** | Allele that expresses itself only when both alleles are alike (vv) |
| **Homozygous** | Having two identical alleles (VV or vv); breeds true |
| **Heterozygous** | Having two different alleles (Vv); a hybrid |
| **Genotype** | The genetic make-up for a character (VV, Vv, vv) |
| **Phenotype** | The observable character (violet or white flowers) |
| **Mutation** | A sudden heritable change in a gene or chromosome |
| **Variation** | Differences among individuals of the same species |`,
      [kt('Allele', 'An alternative form of a gene.'), kt('Genotype', 'The genetic make-up for a character.'), kt('Phenotype', 'The observable character.')],
      table(['Genotype', 'Phenotype'], [['VV', 'Violet'], ['Vv', 'Violet'], ['vv', 'White']], 'Table of three genotypes for flower colour and their phenotypes'),
      [1],
    ),
    sec(
      '2. Mendel and his laws',
      `**Gregor Johann Mendel** studied inheritance in the **garden pea** (*Pisum sativum*). He chose it because it has **clearly contrasting characters**, is **self-pollinating** (pure lines) yet can be **cross-pollinated by hand**, and has a **short life cycle** with **many seeds**.

**Law of dominance:** when two contrasting alleles are present, only the **dominant** one is expressed in the hybrid.

**Law of segregation (purity of gametes):** the two alleles of a gene **separate** during gamete formation, so each gamete receives **only one** allele.

**Law of independent assortment:** alleles of **different genes** are distributed to gametes **independently** of one another (seen in a dihybrid cross).`,
      [kt('Law of segregation', 'Alleles separate at gamete formation; each gamete is pure.'), kt('Law of independent assortment', 'Alleles of different genes are distributed independently.')],
      V.mendel,
      [2],
    ),
    sec(
      '3. Monohybrid cross',
      `A cross involving **one pair** of contrasting characters.

**Example:** pure violet (VV) × pure white (vv) → **F1 all Vv, violet**. F1 selfed (Vv × Vv) → gametes V, v from each parent → F2: **VV, Vv, Vv, vv**.
- **Phenotypic ratio 3 violet : 1 white.**
- **Genotypic ratio 1 VV : 2 Vv : 1 vv.**

**Test cross:** crossing an organism of dominant phenotype with the **homozygous recessive** to find its genotype. All dominant offspring → parent homozygous; 1 : 1 → parent heterozygous.`,
      [kt('Monohybrid cross', 'A cross involving one pair of contrasting characters.'), kt('Test cross', 'A cross with the homozygous recessive to reveal a genotype.')],
      V.mono,
      [3],
    ),
    sec(
      '4. Dihybrid cross (phenotypic ratio only)',
      `A cross involving **two pairs** of contrasting characters.

**Example:** tall violet (TTVV) × dwarf white (ttvv) → **F1 TtVv, tall violet**. The F1 forms **four kinds of gametes** (TV, Tv, tV, tv) in equal numbers. F2 (16 boxes):
- **Tall violet 9 : tall white 3 : dwarf violet 3 : dwarf white 1.**
- Tall white and dwarf violet are **new combinations** (recombinants), showing **independent assortment**.

(The genotypic ratio of the dihybrid F2 is not in the syllabus.)`,
      [kt('Dihybrid cross', 'A cross involving two pairs of contrasting characters.'), kt('Recombinant', 'An offspring with a new combination of characters.')],
      V.di,
      [4],
    ),
    sec(
      '5. Sex determination in human beings',
      `Human body cells have **23 pairs** of chromosomes: **22 pairs of autosomes** and **one pair of sex chromosomes**.
- Female: **44 + XX**; all eggs **22 + X** (homogametic).
- Male: **44 + XY**; sperms **22 + X** or **22 + Y** in equal numbers (heterogametic).

X sperm + egg → **44 + XX, girl**; Y sperm + egg → **44 + XY, boy**. So the **father’s gamete** decides the sex, and the chance of a boy or a girl is **one half** at every birth.`,
      [kt('Autosomes', 'Chromosomes other than the sex chromosomes.'), kt('Sex chromosomes', 'The X and Y chromosomes that determine sex.')],
      V.sex,
      [5],
    ),
    sec(
      '6. X-linked inheritance: haemophilia and colour blindness',
      `Genes carried on the **X chromosome** are **X-linked**. The alleles for **haemophilia** (blood fails to clot) and **red–green colour blindness** are **recessive**.
- **Male (XY):** one faulty X → **affected** (no matching allele on Y).
- **Female (XX):** one faulty X → **carrier** (normal); two faulty X → affected (rare).

**Carrier mother × normal father:** daughters half normal, half carriers; **sons half normal, half affected**.
**Affected father × normal mother:** **all daughters carriers**; **all sons normal** (sons get his Y).

So X-linked disorders are **commoner in males** and pass from a **carrier mother to her sons** (criss-cross inheritance).`,
      [kt('Carrier', 'A heterozygous person who carries a recessive allele without showing it.'), kt('Haemophilia', 'An X-linked disorder in which blood does not clot normally.'), kt('Colour blindness', 'An X-linked disorder in which red and green cannot be told apart.')],
      V.haemo,
      [6],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing the genotypic ratio for a dihybrid F2 (not in the syllabus) or giving 3 : 1 for it.
- Using different letters for the alleles of one gene (V and w).
- Saying the mother decides the sex of the child.
- Calling a heterozygous woman "affected" instead of a **carrier**.
- Putting X-linked alleles on the Y chromosome.

**How marks are usually awarded**
- 1 mark: a term, a genotype, a ratio, an odd one out with its category.
- 2 marks: a law stated with evidence, or two reasons.
- 3 marks: a cross — parents and gametes, Punnett square, and correct ratios or conclusions.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Allele?', 'An alternative form of a gene (V or v).', 'definition', 1),
    fc(2, 'Homozygous vs heterozygous?', 'Two identical alleles vs two different alleles.', 'concept', 1),
    fc(3, 'Genotype vs phenotype?', 'Genetic make-up vs visible character.', 'concept', 1),
    fc(4, 'Dominant allele?', 'Shows its effect even in a single copy.', 'definition', 1),
    fc(5, 'Mutation?', 'A sudden heritable change in the genetic material.', 'definition', 1),
    fc(6, 'Why the garden pea?', 'Contrasting traits, self-pollinating, hand-crossable, short life cycle.', 'exam-tip', 2),
    fc(7, 'Law of dominance?', 'Only the dominant allele shows in a hybrid.', 'fact', 2),
    fc(8, 'Law of segregation?', 'Alleles separate at gamete formation; gametes are pure.', 'fact', 2),
    fc(9, 'Law of independent assortment?', 'Different genes are sorted into gametes independently.', 'fact', 2),
    fc(10, 'Monohybrid F2 phenotypic ratio?', '3 : 1.', 'fact', 3),
    fc(11, 'Monohybrid F2 genotypic ratio?', '1 : 2 : 1.', 'fact', 3),
    fc(12, 'F1 of VV × vv?', 'All Vv, violet.', 'fact', 3),
    fc(13, 'Test cross?', 'Cross with the homozygous recessive to find a genotype.', 'definition', 3),
    fc(14, 'Test cross gives 1 : 1. Parent was?', 'Heterozygous.', 'exam-tip', 3),
    fc(15, 'Fraction of violet F2 plants that are Vv?', 'Two thirds.', 'concept', 3),
    fc(16, 'Dihybrid F2 phenotypic ratio?', '9 : 3 : 3 : 1.', 'fact', 4),
    fc(17, 'Gametes of TtVv?', 'TV, Tv, tV, tv.', 'fact', 4),
    fc(18, 'New combinations in TTVV × ttvv F2?', 'Tall white and dwarf violet.', 'concept', 4),
    fc(19, 'Double recessive in dihybrid F2?', '1 in 16.', 'fact', 4),
    fc(20, 'Human chromosome number?', '46: 44 autosomes + 2 sex chromosomes.', 'fact', 5),
    fc(21, 'Chromosomes in a human egg?', '22 + X.', 'fact', 5),
    fc(22, 'Chromosomes in human sperms?', '22 + X or 22 + Y.', 'fact', 5),
    fc(23, 'Who decides the baby’s sex?', 'The father’s sperm (X or Y).', 'exam-tip', 5),
    fc(24, 'Chance of a boy at each birth?', 'One half.', 'concept', 5),
    fc(25, 'Two X-linked disorders in the syllabus?', 'Haemophilia and colour blindness.', 'fact', 6),
    fc(26, 'Why are X-linked disorders commoner in males?', 'One X; no masking allele on Y.', 'concept', 6),
    fc(27, 'Carrier?', 'Has the recessive allele but does not show the disorder.', 'definition', 6),
    fc(28, 'Carrier mother × normal father: sons?', 'Half affected, half normal.', 'exam-tip', 6),
    fc(29, 'Affected father × normal mother: daughters?', 'All carriers.', 'exam-tip', 6),
    fc(30, 'Haemophilia symptom?', 'Blood does not clot normally; prolonged bleeding.', 'fact', 6),
  ],
  status: 'draft',
  provenance: PROV,
};
