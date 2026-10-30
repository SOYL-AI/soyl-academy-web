// ISC 12 Biology ch06 Sex Determination, Mutation and Genetic Disorders — Part 1 (t01–t02), Part 2 (t03–t05).
import { sl, deck, table, flow, svgV, r } from '../../isc-12-biology-ch01/src/lib.mjs';
import { SEXDET, PEDIGREE, SEXSYS, XCROSS, SICKLE, POINTMUT } from './svgs.mjs';
import { xlinked, cross } from './calc.mjs';

export const V = {
  sexdet: svgV(SEXDET, 'Punnett square of human sex determination: X or Y sperm with an X egg'),
  pedigree: svgV(PEDIGREE, 'Pedigree symbols and an X-linked recessive pedigree passed through a carrier mother'),
  sexsys: svgV(SEXSYS, 'Sex determination in humans, birds, grasshoppers and honey bees'),
  xcross: svgV(XCROSS, 'Carrier mother × normal father for an X-linked recessive trait'),
  sickle: svgV(SICKLE, 'Codon 6 of beta-globin: GAG to GUG, glutamic acid to valine, and a sickle-shaped red cell'),
  point: svgV(POINTMUT, 'Transition, transversion and frameshift mutations on a short DNA strand'),
};

// ---------------------------------------------------------------- computed numbers
const XA = xlinked('XXh', 'XY');
const XB = xlinked('XX', 'XhY');
const SC = cross('Aa', 'Aa');

export const deck1 = deck({
  part: 1,
  title: 'Sex Determination and Sex-linked Inheritance',
  goals: [
    'Explain sex determination in humans, birds, honey bees and grasshoppers',
    'Explain sex-linked inheritance of eye and body colour in Drosophila',
    'Work out the inheritance of haemophilia and colour blindness',
  ],
  slides: [
    sl('title', 'Sex Determination, Mutation and Genetic Disorders', {
      b: 'Part 1 — how sex is decided, and how genes on the sex chromosomes are inherited.',
      v: flow('LR', [['c', 'Sex chromosomes'], ['d', 'Sex determination'], ['l', 'Sex-linked genes'], ['p', 'Patterns in families']], [['c', 'd'], ['c', 'l'], ['l', 'p']], 'Flow from sex chromosomes to sex determination and sex-linked inheritance'),
      n: 'In 1891, Henking noticed a nuclear structure in insects that he called the X body. It was later found to be a chromosome, the X chromosome. Chromosomes involved in deciding sex are sex chromosomes; the rest are autosomes. Genes carried on sex chromosomes show special patterns of inheritance.',
    }),
    sl('diagram', 'Four systems of sex determination', {
      b: 'In some organisms the **male** makes two kinds of gametes (**male heterogamety**: XX–XY, XX–XO); in others the **female** does (**female heterogamety**: ZW–ZZ). Honey bees use **haplodiploidy**.',
      v: V.sexsys,
      n: 'In humans and fruit flies, males have one X and one Y chromosome. In grasshoppers, males simply have one X and no partner, so they have one chromosome fewer than females. In birds, it is the female that has two different sex chromosomes, Z and W. Honey bee males come from unfertilised eggs.',
    }),
    sl('diagram', 'Sex determination in humans', {
      b: 'Human females are **44 + XX** and males **44 + XY**. All eggs carry X; half the sperms carry X and half Y. So each child has an **equal chance** of being a girl or a boy, and the **sperm** decides the sex.',
      v: V.sexdet,
      n: 'Because every egg carries an X chromosome, the sex of the baby depends only on whether the fertilising sperm carries X or Y. Blaming a mother for the sex of her children is therefore scientifically wrong.',
    }),
    sl('concept', 'Honey bees: haplodiploidy', {
      b: 'In honey bees, sex is decided by the **number of chromosome sets** an individual receives.',
      v: table(['Individual', 'Origin', 'Chromosomes'], [['Queen and workers (female)', 'Fertilised egg', 'Diploid, 32'], ['Drone (male)', 'Unfertilised egg (parthenogenesis)', 'Haploid, 16'], ['Sperm of drone', 'Made by mitosis', 'Haploid']], 'Table of sex determination in honey bees'),
      n: 'A drone has no father and cannot have sons, but he has a grandfather and can have grandsons. Because the male is haploid, he produces sperms by mitosis, not meiosis.',
    }),
    sl('check', 'Quick check: birds', {
      b: 'In birds, which sex is heterogametic?',
      n: 'Quick check. Think of the Z and W chromosomes.',
      chk: 'birds-mcq',
    }),
    sl('concept', 'Sex-linked inheritance in Drosophila', {
      b: 'Genes on the X chromosome are **X-linked**. Morgan found that **white eye** in Drosophila is an X-linked **recessive** trait; **yellow body** is another.',
      v: table(['Cross', 'F1', 'F2'], [['Red-eyed female × white-eyed male', 'All red-eyed', 'All females red; males half red, half white'], ['White-eyed female × red-eyed male', 'Females red; males white (criss-cross)', 'Half red, half white in both sexes']], 'Table of Morgan’s reciprocal crosses for eye colour in Drosophila'),
      n: 'The two reciprocal crosses give different results, a sign that the gene is on a sex chromosome. A son receives his only X chromosome from his mother, so a white-eyed mother has white-eyed sons: the trait passes criss-cross from mother to son.',
    }),
    sl('diagram', 'Haemophilia: an X-linked recessive disorder', {
      b: 'In **haemophilia**, a single protein in the cascade of proteins needed for **blood clotting** is affected, so a simple cut may cause **non-stop bleeding**. The gene is on the **X chromosome**. A heterozygous female (**carrier**) may pass it to her sons.',
      v: V.xcross,
      n: 'Haemophilia is far more common in males, who have only one X. A female is affected only if her mother is a carrier and her father is haemophilic, which is very rare. The family pedigree of Queen Victoria shows many haemophilic descendants, because she was a carrier.',
    }),
    sl('example', 'Worked example 1: a carrier mother', {
      b: 'A carrier woman (X Xʰ) marries a normal man (X Y). What proportion of their sons and of their daughters will be affected or carriers?',
      ul: [
        'Gametes: mother X or Xʰ; father X or Y.',
        r`Sons: X Y (normal) or Xʰ Y (affected), so affected sons $= \dfrac{${XA.affectedSon}}{${XA.affectedSon + XA.normalSon}} = ${XA.affectedSon / (XA.affectedSon + XA.normalSon)}$ of sons.`,
        r`Daughters: X X (normal) or X Xʰ (carrier), so carrier daughters $= ${XA.carrierDaughter / (XA.carrierDaughter + XA.normalDaughter)}$ of daughters; none is affected.`,
      ],
      v: table(['Child', 'Probability among all children'], [['Normal daughter', String(XA.normalDaughter)], ['Carrier daughter', String(XA.carrierDaughter)], ['Normal son', String(XA.normalSon)], ['Affected son', String(XA.affectedSon)]], 'Worked table of the four kinds of children of a carrier mother and a normal father'),
      n: 'Half the sons inherit the mother’s affected X and are haemophilic; half the daughters inherit it and are carriers like her. No daughter is affected, because each gets a normal X from her father.',
    }),
    sl('concept', 'Colour blindness', {
      b: '**Red–green colour blindness** is due to a mutation in genes on the **X chromosome**, causing a defect in the **red or green cone** of the eye, so the person cannot tell red from green. It occurs in about **8 percent of males** but only about **0.4 percent of females**.',
      v: table(['Mother', 'Father', 'Sons', 'Daughters'], [['Normal (X X)', 'Colour blind (Xᶜ Y)', 'All normal', 'All carriers'], ['Carrier (X Xᶜ)', 'Normal (X Y)', 'Half colour blind', 'Half carriers'], ['Carrier (X Xᶜ)', 'Colour blind (Xᶜ Y)', 'Half colour blind', 'Half colour blind, half carriers']], 'Table of colour-blindness outcomes for three kinds of parents'),
      n: 'A son of a carrier mother has a fifty percent chance of being colour blind. A daughter is colour blind only if her mother is at least a carrier and her father is colour blind. That is why the condition is so much commoner in men.',
    }),
    sl('example', 'Worked example 2: a colour-blind father', {
      b: 'A colour-blind man (Xᶜ Y) marries a woman with normal vision who is not a carrier (X X). Predict their children.',
      ul: [
        'Every daughter receives Xᶜ from the father and X from the mother: **X Xᶜ, carrier**, normal vision.',
        'Every son receives Y from the father and X from the mother: **X Y, normal**.',
        r`So the probability of a colour-blind child is ${XB.affectedSon + XB.affectedDaughter}; all daughters (probability ${XB.carrierDaughter} of all children) are carriers.`,
      ],
      v: table(['Child', 'Genotype', 'Vision'], [['Daughter', 'X Xᶜ', 'Normal (carrier)'], ['Son', 'X Y', 'Normal']], 'Worked table of children of a colour-blind father and a non-carrier mother'),
      n: 'A father passes his X chromosome only to his daughters and his Y only to his sons. So none of his sons can inherit his colour blindness, but all his daughters carry it and may pass it to their own sons.',
    }),
    sl('check', 'Quick check: X-linked inheritance', {
      b: 'Judge the assertion and the reason about haemophilia.',
      n: 'Quick check. How many X chromosomes does a male have?',
      chk: 'haemo-ar',
    }),
    sl('check', 'Quick check: colour blindness', {
      b: 'Can a colour-blind father pass the condition to his son?',
      n: 'Quick check. Which sex chromosome does a father give a son?',
      chk: 'fatherson-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Male heterogamety: XX–XY (humans, Drosophila), XX–XO (grasshopper); female heterogamety: ZW–ZZ (birds); haplodiploidy (honey bee).',
        'Humans: all eggs X; sperms X or Y in equal numbers; the father’s sperm decides sex.',
        'X-linked recessive: Drosophila white eye and yellow body; criss-cross inheritance.',
        'Haemophilia and colour blindness: X-linked recessive; carrier mothers pass them to half their sons.',
      ],
      v: table(['System', 'Heterogametic sex'], [['XX–XY', 'Male'], ['XX–XO', 'Male'], ['ZW–ZZ', 'Female'], ['Haplodiploid', 'Male haploid']], 'Summary table of sex-determination systems'),
      n: 'To recap: sex is decided in different ways in different animals. In humans the father decides it. Genes on the X chromosome give characteristic patterns: carrier mothers, affected sons and criss-cross inheritance.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Write **chromosome formulae** (44 + XX, 44 + XY) and label **heterogametic** sex.',
        'Use **X Xʰ** style notation in crosses and give results **by sex**.',
        'State why haemophilia is **rare in females**.',
        'Mention **criss-cross inheritance** for X-linked traits.',
      ],
      n: 'Exam tips. Write chromosome formulae and name the heterogametic sex. Use clear notation for X-linked crosses and give results separately for sons and daughters. Explain why affected females are rare. And mention criss-cross inheritance.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Mutation and Genetic Disorders',
  goals: [
    'Distinguish spontaneous and induced mutations and kinds of point mutation',
    'Describe the Mendelian disorders phenylketonuria, thalassaemia, colour blindness and sickle-cell anaemia',
    'Describe Down’s, Klinefelter’s and Turner’s syndromes',
  ],
  slides: [
    sl('title', 'Mutation and genetic disorders', {
      b: 'Part 2 — changes in DNA and chromosomes, and the disorders they cause.',
      v: flow('LR', [['m', 'Mutation'], ['g', 'Gene (point) mutation'], ['c', 'Chromosomal change'], ['d', 'Mendelian and chromosomal disorders']], [['m', 'g'], ['m', 'c'], ['g', 'd'], ['c', 'd']], 'Flow from mutation to gene and chromosomal changes and disorders'),
      n: 'A mutation is a sudden, heritable change in the DNA sequence. It may affect a single gene or the structure or number of whole chromosomes. Mutations, together with recombination, are a source of variation, but many cause disorders.',
    }),
    sl('concept', 'Spontaneous and induced mutations', {
      b: 'Mutations arise **spontaneously** (from errors in DNA replication or natural causes) or are **induced** by **mutagens**.',
      v: table(['Type', 'Cause', 'Example'], [['Spontaneous', 'Natural errors in replication or repair', 'Occur at a low natural rate'], ['Induced', 'Physical mutagens', 'UV radiation, X-rays and other ionising radiation'], ['Induced', 'Chemical mutagens', 'Certain chemicals that alter bases']], 'Table of spontaneous and induced mutations'),
      n: 'Ultraviolet light, X-rays and some chemicals increase the rate of mutation. Mutations in body cells affect only the individual, while mutations in germ cells can be passed on to offspring.',
    }),
    sl('diagram', 'Gene (point) mutations', {
      b: 'A **point mutation** changes a **single base pair**. In a **substitution**, one base replaces another: a **transition** swaps a purine for a purine or a pyrimidine for a pyrimidine; a **transversion** swaps a purine for a pyrimidine or the reverse. **Insertion or deletion** of bases causes a **frameshift**.',
      v: V.point,
      n: 'A substitution changes at most one codon. But an insertion or deletion of one or two bases shifts the reading frame, so every codon after it is read wrongly, which usually ruins the protein. Inserting or deleting three bases removes or adds one amino acid without shifting the frame.',
    }),
    sl('example', 'Worked example 1: naming mutations', {
      b: 'Classify each change in a DNA strand.',
      ul: [
        'C → T at one position → **substitution, transition** (pyrimidine to pyrimidine).',
        'G → C at one position → **substitution, transversion** (purine to pyrimidine).',
        'One extra A inserted → **frameshift** (insertion).',
        'Three bases deleted together → one amino acid lost; **no frameshift**.',
      ],
      v: table(['Change', 'Type'], [['C → T', 'Transition'], ['G → C', 'Transversion'], ['+ A', 'Frameshift (insertion)'], ['− 3 bases', 'In-frame deletion']], 'Worked table classifying four DNA changes'),
      n: 'Ask whether a base was replaced, added or removed. For replacements, check whether the new base is of the same chemical class. For additions or deletions, check whether the number is a multiple of three.',
    }),
    sl('check', 'Quick check: point mutations', {
      b: 'Which change is a transversion?',
      n: 'Quick check. A transversion changes the class of the base.',
      chk: 'transversion-mcq',
    }),
    sl('diagram', 'Sickle-cell anaemia', {
      b: 'An **autosomal recessive** disorder. A **single base substitution** at the **sixth codon** of the **β-globin** gene changes **GAG** to **GUG**, so **glutamic acid** is replaced by **valine**. The mutant haemoglobin **HbS** polymerises under low oxygen and red cells become **sickle-shaped**. Only **HbSHbS** individuals show the disease; **HbAHbS** are carriers.',
      v: V.sickle,
      n: 'A change in a single base alters a single amino acid, yet it changes the shape of the red blood cells. Sickled cells pass poorly through narrow capillaries. Heterozygous carriers are usually healthy but can pass the allele on.',
    }),
    sl('concept', 'Other Mendelian disorders', {
      b: 'Disorders caused by mutation of a **single gene**, following Mendel’s patterns.',
      v: table(['Disorder', 'Inheritance', 'Cause and effect'], [['Phenylketonuria', 'Autosomal recessive', 'Lacks the enzyme that converts phenylalanine to tyrosine; phenylalanine and its derivatives accumulate in the brain (mental retardation) and are excreted in urine'], ['Thalassaemia', 'Autosomal recessive', 'Reduced synthesis of a globin chain (α-thalassaemia: genes HBA1 and HBA2 on chromosome 16; β-thalassaemia: gene HBB on chromosome 11), causing anaemia'], ['Colour blindness', 'X-linked recessive', 'Defect in red or green cones'], ['Haemophilia', 'X-linked recessive', 'Defective clotting protein']], 'Table of Mendelian disorders with inheritance and effects'),
      n: 'Thalassaemia and sickle-cell anaemia both affect haemoglobin, but differently. Thalassaemia is a quantitative problem, too little of a normal globin chain. Sickle-cell anaemia is a qualitative problem, an abnormal chain.',
    }),
    sl('example', 'Worked example 2: two carrier parents', {
      b: 'Both parents are carriers of sickle-cell anaemia (HbAHbS). What are the chances that a child is (a) affected, (b) a carrier, (c) normal?',
      ul: [
        r`(a) Affected (HbSHbS) $= ${SC.get('aa')}$.`,
        r`(b) Carrier (HbAHbS) $= ${SC.get('Aa')}$.`,
        r`(c) Normal (HbAHbA) $= ${SC.get('AA')}$.`,
      ],
      v: table(['Child', 'Probability'], [['Affected', String(SC.get('aa'))], ['Carrier', String(SC.get('Aa'))], ['Normal', String(SC.get('AA'))]], 'Worked table of probabilities for children of two carriers'),
      n: 'Each parent passes on the normal or the sickle allele with equal chance. One child in four is expected to be affected, two in four carriers and one in four normal. These odds apply afresh to each pregnancy.',
    }),
    sl('check', 'Quick check: sickle cell', {
      b: 'Judge the assertion and the reason about sickle-cell anaemia.',
      n: 'Quick check. Which amino acid replaces which?',
      chk: 'sickle-ar',
    }),
    sl('concept', 'Chromosomal disorders', {
      b: 'Caused by **absence, excess or abnormal arrangement** of chromosomes, often from **failure of chromatids to segregate** (non-disjunction) during cell division. Gain or loss of a chromosome is **aneuploidy**; failure of cytokinesis after telophase gives **polyploidy**, common in plants.',
      v: table(['Syndrome', 'Karyotype', 'Features'], [['Down’s', 'Trisomy of chromosome 21 (47)', 'Short stature, small round head, furrowed tongue, partially open mouth, broad palm with a characteristic crease, retarded physical, psychomotor and mental development'], ['Klinefelter’s', '47, XXY', 'Overall masculine development with some feminine features such as gynaecomastia; sterile'], ['Turner’s', '45, XO', 'Sterile females with rudimentary ovaries and lack of other secondary sexual characters']], 'Table of three chromosomal disorders'),
      n: 'Down’s syndrome was first described by Langdon Down in 1866. Klinefelter’s syndrome arises from an extra X in a male, and Turner’s syndrome from the absence of one X in a female. These conditions affect whole chromosomes, not single genes.',
    }),
    sl('check', 'Quick check: chromosomal disorders', {
      b: 'A person has 45 chromosomes with a single X and no Y. Which syndrome is this?',
      n: 'Quick check. Count the sex chromosomes.',
      chk: 'turner-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Mutation: spontaneous or induced (UV, X-rays, chemicals).',
        'Point mutations: transition, transversion; insertion or deletion causes frameshift.',
        'Sickle-cell anaemia: GAG → GUG at codon 6 of β-globin, glutamic acid → valine; autosomal recessive.',
        'Phenylketonuria and thalassaemia: autosomal recessive; colour blindness and haemophilia: X-linked recessive.',
        'Chromosomal: Down’s (trisomy 21), Klinefelter’s (XXY), Turner’s (XO); non-disjunction, aneuploidy, polyploidy.',
      ],
      v: table(['Disorder', 'Type'], [['Sickle-cell anaemia', 'Point mutation'], ['Down’s syndrome', 'Trisomy 21'], ['Turner’s syndrome', 'Monosomy (XO)']], 'Summary table of three disorders and their types'),
      n: 'To recap: mutations range from a single base to whole chromosomes. Single-gene disorders follow Mendelian patterns, while chromosomal disorders come from too many or too few chromosomes, usually after non-disjunction.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'For sickle-cell anaemia, give the **codon change** and the **amino-acid change**.',
        'Give the **karyotype** for each chromosomal syndrome.',
        'Classify each disorder as **autosomal or X-linked**, dominant or recessive.',
        'Distinguish **transition** from **transversion**.',
      ],
      n: 'Exam tips. State the codon and amino-acid change for sickle-cell anaemia. Give the karyotype of each syndrome. Classify each disorder by its pattern of inheritance. And keep transition and transversion apart.',
    }),
  ],
});
