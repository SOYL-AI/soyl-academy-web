// ISC 12 Biology ch06 notes and flashcards.
import { T, table, unit, PROV } from '../../isc-12-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Sex Determination, Mutation and Genetic Disorders — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Sex determination',
      `In **1891** Henking traced a specific nuclear structure through spermatogenesis in some insects; half the sperms received it and half did not. He called it the **X body**; it was later identified as the **X chromosome**. Chromosomes involved in determining sex are **sex chromosomes**; the rest are **autosomes**.

- **Male heterogamety, XX–XY:** females XX, males XY (humans, *Drosophila*). Human females are **44 + XX** and males **44 + XY**. All eggs carry X; sperms carry X or Y in equal numbers, so the **sperm decides the sex** and each child has a 50 percent chance of either sex.
- **Male heterogamety, XX–XO:** in many insects such as the **grasshopper**, females have two X chromosomes and males **one X** and no Y, so males have one chromosome fewer.
- **Female heterogamety, ZW–ZZ:** in **birds**, females are **ZW** (two kinds of eggs) and males **ZZ**, so the **egg decides** the sex.
- **Haplodiploidy:** in **honey bees**, a fertilised egg develops into a **female** (queen or worker, diploid, 32 chromosomes) and an **unfertilised egg** develops into a **male** (drone, haploid, 16 chromosomes) by **parthenogenesis**. Males produce sperms by **mitosis**; they have no father and cannot have sons, but have a grandfather and can have grandsons.`,
      [kt('Sex chromosomes', 'Chromosomes that determine sex, such as X and Y or Z and W.'), kt('Heterogametic sex', 'The sex that produces two kinds of gametes with respect to sex chromosomes.'), kt('Haplodiploidy', 'Sex determination in which females are diploid and males haploid, as in honey bees.')],
      V.sexsys,
      [1],
      [V.sexdet],
    ),
    sec(
      '2. Sex-linked inheritance',
      `Genes on the **X chromosome** (with no counterpart on Y) are **X-linked**; males, with one X, express any X-linked allele they carry (they are **hemizygous**).

**Drosophila.** Morgan found the **white-eye** allele to be X-linked recessive: red-eyed female × white-eyed male gives all red-eyed F1, and an F2 in which all females are red-eyed but half the males are white-eyed. In the reciprocal cross (white-eyed female × red-eyed male), F1 females are red-eyed and males white-eyed — **criss-cross inheritance** from mother to son. **Yellow body** is another X-linked recessive trait.

**Haemophilia** — X-linked recessive. A single protein involved in the cascade of proteins for **blood clotting** is affected, so a simple cut may result in **non-stop bleeding**. Heterozygous females (**carriers**) may transmit it to sons. Affected females are very rare: the mother must be at least a carrier and the father haemophilic. The family of **Queen Victoria**, a carrier, shows many haemophilic descendants.

**Colour blindness** — X-linked recessive mutation in genes for the **red or green cones**, so the person fails to discriminate red and green. It occurs in about **8 percent of males** and only about **0.4 percent of females**. A son of a carrier woman has a 50 percent chance of being colour blind; a daughter is colour blind only if her mother is at least a carrier and her father colour blind.

**Key rules:** a father passes his X to **all daughters** and his Y to **all sons**, so fathers never pass X-linked traits to sons; sons get their X from the **mother**.`,
      [kt('X-linked gene', 'A gene carried on the X chromosome.'), kt('Carrier', 'A heterozygous female with one recessive X-linked allele who does not show the trait.'), kt('Criss-cross inheritance', 'Passage of an X-linked trait from mother to son and through daughters to grandsons.')],
      V.xcross,
      [2],
      [V.pedigree],
    ),
    sec(
      '3. Mutation',
      `**Mutation** is a phenomenon that results in alteration of **DNA sequences** and consequently in changes in the genotype and phenotype. Besides recombination, mutation is a source of **variation**.
- **Spontaneous** mutations occur naturally, for example through errors in DNA replication.
- **Induced** mutations are caused by **mutagens**: physical (**UV radiation**, X-rays and other ionising radiation) and chemical agents.
- Changes in **chromosomes** (loss, gain or rearrangement of segments or whole chromosomes) cause chromosomal aberrations, commonly seen in cancer cells.

**Gene (point) mutations** — change of a single base pair:
- **Substitution:** a **transition** replaces a purine by another purine (A ↔ G) or a pyrimidine by another pyrimidine (C ↔ T); a **transversion** replaces a purine by a pyrimidine or the reverse.
- **Insertion or deletion** of one or two bases changes the **reading frame** from that point onward: **frameshift mutation**. Insertion or deletion of three bases (one codon) adds or removes one amino acid, leaving the reading frame unaltered.
- **Sickle-cell anaemia** is the classical example of a point mutation: a single base substitution at the **sixth codon** of the **β-globin** gene, **GAG → GUG**, replaces **glutamic acid by valine**.`,
      [kt('Mutation', 'A sudden heritable change in the DNA sequence.'), kt('Mutagen', 'A physical or chemical agent that induces mutations.'), kt('Transition', 'Substitution of a purine for a purine or a pyrimidine for a pyrimidine.'), kt('Transversion', 'Substitution of a purine for a pyrimidine or vice versa.'), kt('Frameshift mutation', 'Insertion or deletion of bases that shifts the reading frame.')],
      V.point,
      [3],
    ),
    sec(
      '4. Mendelian disorders',
      `Disorders determined by alteration or mutation in a **single gene**; their pattern of inheritance can be traced in a pedigree.

- **Sickle-cell anaemia** — **autosomal recessive**. Caused by substitution of **glutamic acid (Glu)** by **valine (Val)** at the **sixth position** of the **β-globin** chain (codon **GAG → GUG**). The mutant haemoglobin (**HbS**) polymerises under **low oxygen tension**, changing red cells from biconcave discs to elongated **sickle** shapes. Only **HbSHbS** individuals show the disease; **HbAHbS** individuals are apparently unaffected **carriers**, with a 50 percent chance of passing on the allele.
- **Phenylketonuria** — **autosomal recessive** inborn error of metabolism. The affected person **lacks the enzyme** that converts the amino acid **phenylalanine into tyrosine**; phenylalanine accumulates and is converted into **phenylpyruvic acid** and other derivatives, which accumulate in the **brain** (mental retardation) and are **excreted in urine** because of poor absorption by the kidney.
- **Thalassaemia** — **autosomal recessive** blood disease caused by mutation or deletion that results in **reduced rate of synthesis** of one of the globin chains of haemoglobin, causing abnormal haemoglobin and **anaemia**. **α-thalassaemia**: production of α-globin affected; controlled by two closely linked genes **HBA1 and HBA2** on **chromosome 16**. **β-thalassaemia**: production of β-globin affected; controlled by a single gene **HBB** on **chromosome 11**. Thalassaemia is a **quantitative** problem (too few globin molecules), while sickle-cell anaemia is a **qualitative** problem (an incorrectly functioning globin).
- **Colour blindness** and **haemophilia** — **X-linked recessive** (section 2).`,
      [kt('Mendelian disorder', 'A disorder caused by mutation of a single gene.'), kt('HbS', 'The mutant haemoglobin of sickle-cell anaemia.'), kt('Phenylketonuria', 'Autosomal recessive lack of the enzyme converting phenylalanine to tyrosine.'), kt('Thalassaemia', 'Autosomal recessive reduced synthesis of a globin chain.')],
      V.sickle,
      [4],
      [table(['Disorder', 'Inheritance', 'Defect'], [['Sickle-cell anaemia', 'Autosomal recessive', 'Glu → Val in β-globin'], ['Phenylketonuria', 'Autosomal recessive', 'No phenylalanine hydroxylase'], ['Thalassaemia', 'Autosomal recessive', 'Reduced globin synthesis'], ['Colour blindness', 'X-linked recessive', 'Red or green cone defect'], ['Haemophilia', 'X-linked recessive', 'Clotting protein defect']], 'Table of Mendelian disorders')],
    ),
    sec(
      '5. Chromosomal disorders',
      `Caused by **absence, excess or abnormal arrangement** of one or more chromosomes. **Failure of segregation of chromatids** during cell division results in gain or loss of a chromosome(s): **aneuploidy**. Failure of cytokinesis after telophase results in an increase in a whole set of chromosomes: **polyploidy**, often seen in plants. Trisomy is the presence of an additional copy of a chromosome; monosomy, the lack of one chromosome of a pair.

- **Down’s syndrome** — **trisomy of chromosome 21** (47 chromosomes), first described by **Langdon Down (1866)**. Short statured with a small round head, furrowed tongue and partially open mouth; broad palm with a characteristic palm crease; physical, psychomotor and mental development retarded.
- **Klinefelter’s syndrome** — an **additional X chromosome** in a male: **47, XXY**. Overall masculine development, but feminine development (development of breasts, **gynaecomastia**) is also expressed; **sterile**.
- **Turner’s syndrome** — **absence of one X** chromosome: **45, X0**. Females are **sterile**, as the ovaries are rudimentary; lack of other secondary sexual characters.`,
      [kt('Aneuploidy', 'Gain or loss of one or more chromosomes due to failure of segregation.'), kt('Polyploidy', 'An increase in whole sets of chromosomes, due to failure of cytokinesis.'), kt('Trisomy', 'Presence of an extra copy of one chromosome.')],
      table(['Syndrome', 'Karyotype', 'Key feature'], [['Down’s', '47, trisomy 21', 'Retarded development; palm crease'], ['Klinefelter’s', '47, XXY', 'Sterile male; gynaecomastia'], ['Turner’s', '45, X0', 'Sterile female; rudimentary ovaries']], 'Table of three chromosomal disorders'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying the mother decides the sex of a child (the father’s sperm does).
- Calling birds male-heterogametic (females are ZW).
- Writing that a father can pass haemophilia to his son.
- Mixing up transition (same class of base) and transversion (different class).
- Giving the amino-acid change in sickle-cell anaemia the wrong way round (glutamic acid is replaced by valine).
- Calling thalassaemia X-linked (it is autosomal recessive).
- Writing Klinefelter’s as XO or Turner’s as XXY.

**How marks are usually awarded**
- 1-mark subparts: karyotypes, codons, the heterogametic sex, a reason in one sentence.
- 2–3-mark questions: X-linked crosses with results by sex; point-mutation types; one disorder with cause and symptoms.
- 5-mark questions in parts: sex determination in four organisms; haemophilia or colour blindness with a cross; sickle-cell anaemia with the codon change and a carrier cross; chromosomal disorders compared.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Who first observed the X body, and when?', 'Henking, 1891.', 'fact', 1),
    fc(2, 'Human chromosome formulae?', 'Female 44 + XX; male 44 + XY.', 'fact', 1),
    fc(3, 'Who decides the sex of a human child?', 'The father’s sperm (X or Y).', 'concept', 1),
    fc(4, 'Sex determination in grasshopper?', 'XX female, XO male.', 'fact', 1),
    fc(5, 'Which sex is heterogametic in birds?', 'Female (ZW).', 'fact', 1),
    fc(6, 'How is a drone honey bee formed?', 'From an unfertilised egg; haploid.', 'concept', 1),
    fc(7, 'How do drones make sperms?', 'By mitosis.', 'fact', 1),
    fc(8, 'X-linked trait in Drosophila eyes?', 'White eye (recessive).', 'fact', 2),
    fc(9, 'What is criss-cross inheritance?', 'X-linked trait passing from mother to son.', 'definition', 2),
    fc(10, 'What goes wrong in haemophilia?', 'A clotting protein is defective; bleeding does not stop.', 'concept', 2),
    fc(11, 'Why are haemophilic females rare?', 'They need a carrier mother and a haemophilic father.', 'exam-tip', 2),
    fc(12, 'Famous carrier of haemophilia?', 'Queen Victoria.', 'fact', 2),
    fc(13, 'Colour blindness frequency?', 'About 8% of males, 0.4% of females.', 'fact', 2),
    fc(14, 'Can a father pass an X-linked trait to his son?', 'No: he gives his son a Y.', 'exam-tip', 2),
    fc(15, 'What is a mutation?', 'Alteration of the DNA sequence.', 'definition', 3),
    fc(16, 'Two physical mutagens?', 'UV radiation and X-rays.', 'fact', 3),
    fc(17, 'Transition vs transversion?', 'Same class of base swapped vs purine ↔ pyrimidine.', 'concept', 3),
    fc(18, 'What causes a frameshift?', 'Insertion or deletion of one or two bases.', 'concept', 3),
    fc(19, 'Sickle-cell codon change?', 'GAG → GUG at codon 6 of β-globin.', 'fact', 4),
    fc(20, 'Sickle-cell amino-acid change?', 'Glutamic acid replaced by valine.', 'fact', 4),
    fc(21, 'When do HbS red cells sickle?', 'Under low oxygen tension.', 'concept', 4),
    fc(22, 'Enzyme missing in phenylketonuria?', 'Phenylalanine hydroxylase (phenylalanine → tyrosine).', 'fact', 4),
    fc(23, 'Genes of α-thalassaemia?', 'HBA1 and HBA2 on chromosome 16.', 'fact', 4),
    fc(24, 'Gene of β-thalassaemia?', 'HBB on chromosome 11.', 'fact', 4),
    fc(25, 'Thalassaemia vs sickle-cell: kind of defect?', 'Quantitative vs qualitative.', 'exam-tip', 4),
    fc(26, 'What is aneuploidy?', 'Gain or loss of chromosomes from failed segregation.', 'definition', 5),
    fc(27, 'Down’s syndrome karyotype?', 'Trisomy 21 (47 chromosomes).', 'fact', 5),
    fc(28, 'Klinefelter’s syndrome karyotype?', '47, XXY.', 'fact', 5),
    fc(29, 'Turner’s syndrome karyotype?', '45, X0.', 'fact', 5),
    fc(30, 'What is polyploidy?', 'Increase in whole chromosome sets after failed cytokinesis.', 'definition', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
