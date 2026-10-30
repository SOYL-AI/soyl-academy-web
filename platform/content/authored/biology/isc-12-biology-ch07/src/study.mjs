// ISC 12 Biology ch07 notes and flashcards.
import { T, table, flow, unit, PROV } from '../../isc-12-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Molecular Basis of Inheritance: DNA and Replication — Notes',
  language: 'en',
  sections: [
    sec(
      '1. The search for the genetic material',
      `**Properties of a genetic material:** it should (i) be able to generate its own replica; (ii) be stable chemically and structurally; (iii) provide scope for slow changes (mutation) required for evolution; (iv) be able to express itself as Mendelian characters. DNA meets these better than RNA: the **2′-OH** of ribose makes RNA reactive and easily degraded, and **thymine** (instead of uracil) gives DNA extra stability. RNA can act as a catalyst and is thought to be the first genetic material (**RNA world**); DNA evolved from it.

**Griffith (1928) — transformation.** *Streptococcus pneumoniae*: **S strain** (smooth, with a polysaccharide capsule, virulent) and **R strain** (rough, no capsule, non-virulent). Live S → mouse dies; live R → lives; heat-killed S → lives; **heat-killed S + live R → mouse dies**, and live S bacteria are recovered. Some “transforming principle” from dead S cells had transformed R cells.

**Avery, MacLeod and McCarty (1933–44)** purified proteins, DNA and RNA from heat-killed S cells. **DNA alone** transformed R cells; **proteases** and **RNases** did not affect transformation, but **DNase** inhibited it. Conclusion: **DNA is the hereditary material**.

**Hershey and Chase (1952)** grew bacteriophages on media with radioactive **phosphorus (³²P)**, which is in DNA but not protein, or radioactive **sulphur (³⁵S)**, which is in protein but not DNA. Phages infected *E. coli*; blending removed the phage coats and centrifugation separated bacteria (pellet) from phage coats (supernatant). Bacteria infected with ³²P phages were **radioactive**; with ³⁵S phages the radioactivity stayed in the **supernatant**. So **DNA, not protein, enters the bacteria**: DNA is the genetic material.`,
      [kt('Transformation', 'Change in the genetic make-up of bacteria by uptake of DNA from other cells.'), kt('Transforming principle', 'Griffith’s name for the substance from dead S cells that transformed R cells; later shown to be DNA.'), kt('Bacteriophage', 'A virus that infects bacteria.')],
      V.griffith,
      [1],
      [V.hershey],
    ),
    sec(
      '2. Structure of DNA and RNA',
      `**Contributions:** **Friedrich Miescher (1869)** isolated an acidic substance from the nuclei of pus cells, which he called **nuclein** (DNA). **Erwin Chargaff**: in double-stranded DNA the amount of **adenine equals thymine** and **guanine equals cytosine** (A = T, G = C; A + G = T + C); the ratio (A + T)/(G + C) varies between species. **Maurice Wilkins and Rosalind Franklin** produced **X-ray diffraction** data. **James Watson and Francis Crick (1953)** proposed the **double helix** model.

**Polynucleotide chain.** A nucleotide has a nitrogenous base, a pentose sugar and a phosphate. A nitrogenous base joined to the 1′ carbon of the sugar by an **N-glycosidic linkage** forms a nucleoside; a phosphate joined to the 5′-OH by a **phosphoester linkage** forms a nucleotide; nucleotides are joined by **3′–5′ phosphodiester linkages**. Purines: **adenine, guanine**; pyrimidines: **cytosine, thymine** (DNA) and **uracil** (RNA).

**Double helix:** two polynucleotide chains with a **sugar–phosphate backbone** outside and bases inside; the chains are **antiparallel** (one 5′→3′, the other 3′→5′); **A pairs with T by two hydrogen bonds**, **G with C by three**; a purine always faces a pyrimidine, giving a uniform distance between the strands; the chains are coiled in a **right-handed** fashion; **pitch 3.4 nm**, about **10 bp per turn**, **0.34 nm** between base pairs; base pairs are stacked over one another, adding stability.

**DNA vs RNA:** DNA has deoxyribose, thymine and is usually double-stranded; RNA has ribose, uracil and is usually single-stranded.

**Types of RNA:** **mRNA** (provides the template for translation), **tRNA** (brings amino acids and reads the genetic code; adapter molecule) and **rRNA** (structural and catalytic role in ribosomes).`,
      [kt('Chargaff’s rules', 'In double-stranded DNA, A = T and G = C.'), kt('Antiparallel', 'The two strands of DNA run in opposite 5′→3′ directions.'), kt('Phosphodiester bond', 'The 3′–5′ link between nucleotides in a polynucleotide.'), kt('tRNA', 'Adapter RNA that carries an amino acid and reads a codon.')],
      V.ladder,
      [2],
      [table(['Feature', 'DNA', 'RNA'], [['Sugar', 'Deoxyribose', 'Ribose'], ['Pyrimidines', 'C, T', 'C, U'], ['Strands', 'Double', 'Single'], ['Stability', 'More stable', 'More reactive (2′-OH)']], 'Table comparing DNA and RNA')],
    ),
    sec(
      '3. Packaging of DNA in eukaryotes',
      `The distance between two consecutive base pairs is 0.34 nm, so the DNA of a typical mammalian cell (6.6 × 10⁹ bp) is about **2.2 m** long — far longer than the nucleus (about 10⁻⁶ m). It must be packaged.
- **Prokaryotes** (e.g. *E. coli*) have no defined nucleus; their negatively charged DNA is held with some **positively charged proteins** in a region called the **nucleoid**, organised in large loops.
- **Eukaryotes** have a set of positively charged basic proteins, **histones**, rich in the basic amino acids **lysine and arginine**. Eight histone molecules form a **histone octamer**. Negatively charged DNA wraps around it to form a **nucleosome**, containing about **200 bp** of DNA. Repeating nucleosomes form **chromatin**, which looks like **beads on a string** under the electron microscope; the chromatin fibre is coiled and condensed at metaphase to form **chromosomes**. Higher-level packaging requires additional proteins, the **non-histone chromosomal (NHC) proteins**.
- **Euchromatin**: loosely packed, stains light, **transcriptionally active**. **Heterochromatin**: densely packed, stains dark, **inactive**.`,
      [kt('Histone', 'A positively charged basic protein around which DNA is wound.'), kt('Nucleosome', 'A unit of chromatin: about 200 bp of DNA wrapped around a histone octamer.'), kt('Euchromatin', 'Loosely packed, lightly stained, transcriptionally active chromatin.'), kt('Heterochromatin', 'Densely packed, darkly stained, inactive chromatin.')],
      V.nucleosome,
      [3],
    ),
    sec(
      '4. Central dogma and reverse transcription',
      `**Francis Crick** proposed the **central dogma** of molecular biology: genetic information flows from **DNA → RNA → protein**. DNA is **replicated**; its information is **transcribed** into RNA and **translated** into protein.

In some viruses the flow of information is in the **reverse direction**, from **RNA to DNA**. **Retroviruses** (such as **HIV**) carry the enzyme **reverse transcriptase**, which makes DNA from their RNA genome; the DNA can integrate into the host genome. This **reverse transcription** is an exception to the central dogma as first stated.`,
      [kt('Central dogma', 'The flow of genetic information from DNA to RNA to protein.'), kt('Reverse transcriptase', 'An enzyme of retroviruses that makes DNA from an RNA template.')],
      flow('LR', [['d', 'DNA'], ['r', 'RNA'], ['p', 'Protein'], ['v', 'Viral RNA (retrovirus)'], ['c', 'DNA copy']], [['d', 'r', 'transcription'], ['r', 'p', 'translation'], ['v', 'c', 'reverse transcription']], 'Flow of the central dogma with reverse transcription'),
      [4],
    ),
    sec(
      '5. Semi-conservative DNA replication',
      `**Watson and Crick** proposed that the two strands separate and each acts as a **template** for a new complementary strand, so each daughter molecule has **one parental (old) and one new strand**: **semi-conservative replication**.

**Meselson and Stahl (1958)**: *E. coli* grown for many generations in **¹⁵NH₄Cl** (¹⁵N, the heavy isotope, as the only nitrogen source) were transferred to **¹⁴NH₄Cl**. Samples taken at intervals were analysed by **caesium chloride (CsCl) density-gradient centrifugation**. After **one generation (about 20 min)** the DNA had a **hybrid** (intermediate) density; after **two generations (40 min)** there were **equal amounts of hybrid and light** DNA — as predicted by semi-conservative replication.

**Taylor (1958)**: using **radioactive thymidine** with root tips of ***Vicia faba*** (broad bean) and **autoradiography**, Taylor showed that DNA in **chromosomes** also replicates semi-conservatively.

**Machinery.** Replication begins at an **origin of replication**. The two strands unwind at the **replication fork**. The main enzyme is **DNA-dependent DNA polymerase**, which uses a DNA template to polymerise **deoxyribonucleotides**; deoxyribonucleoside triphosphates serve as both **substrates** and **energy source**. It polymerises only in the **5′→3′** direction, so on one template the new strand is made **continuously** (**leading strand**) and on the other **discontinuously** in short pieces (**Okazaki fragments**, **lagging strand**), which are joined by **DNA ligase**. *E. coli*, with 4.6 × 10⁶ bp, completes replication in about **18 minutes**: an average rate of about **2000 bp per second**, with high accuracy. In eukaryotes, replication takes place in the **S phase** of the cell cycle.`,
      [kt('Semi-conservative replication', 'Replication in which each daughter DNA has one parental and one new strand.'), kt('Okazaki fragments', 'Short DNA pieces made discontinuously on the lagging strand.'), kt('DNA ligase', 'Enzyme that joins Okazaki fragments.'), kt('Replication fork', 'Y-shaped region where the parental strands separate and copying occurs.')],
      V.fork,
      [5],
      [V.meselson],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying Griffith proved DNA is the genetic material (he showed transformation; Avery and colleagues identified DNA).
- Mixing up the labels in Hershey–Chase (³²P labels DNA; ³⁵S labels protein).
- Writing that A and T are joined by three hydrogen bonds (two; G–C has three).
- Writing that both strands are copied continuously (only the leading strand is).
- Saying DNA ligase makes new DNA (it joins fragments; DNA polymerase makes DNA).
- Giving the first-generation Meselson–Stahl result as two bands (it is one hybrid band).

**How marks are usually awarded**
- 1-mark subparts: a scientist, a label, a bond, a dimension, an enzyme.
- 2–3-mark questions: one experiment with conclusion; Chargaff calculations; nucleosome; central dogma and reverse transcription.
- 5-mark questions in parts: the search for the genetic material; double helix with a labelled diagram; replication with Meselson–Stahl results and the fork.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Four properties of a genetic material?', 'Replicates, stable, mutates slowly, expressed as characters.', 'concept', 1),
    fc(2, 'Why is DNA more stable than RNA?', 'No reactive 2′-OH; thymine instead of uracil.', 'concept', 1),
    fc(3, 'Griffith’s organism and year?', 'Streptococcus pneumoniae, 1928.', 'fact', 1),
    fc(4, 'S vs R strain?', 'S: capsule, virulent; R: no capsule, non-virulent.', 'fact', 1),
    fc(5, 'Which enzyme stopped transformation for Avery and colleagues?', 'DNase.', 'fact', 1),
    fc(6, 'Hershey–Chase labels?', '³²P for DNA; ³⁵S for protein.', 'fact', 1),
    fc(7, 'Where was ³²P found after infection?', 'Inside the bacteria (pellet).', 'fact', 1),
    fc(8, 'What did Miescher isolate?', 'Nuclein (DNA) from pus cells, 1869.', 'fact', 2),
    fc(9, 'Chargaff’s rules?', 'A = T and G = C in double-stranded DNA.', 'definition', 2),
    fc(10, 'Who provided X-ray data on DNA?', 'Wilkins and Franklin.', 'fact', 2),
    fc(11, 'Hydrogen bonds in A–T and G–C?', 'Two and three.', 'fact', 2),
    fc(12, 'DNA helix pitch and bp per turn?', '3.4 nm; about 10 bp.', 'fact', 2),
    fc(13, 'Why is the helix width uniform?', 'A purine always pairs with a pyrimidine.', 'concept', 2),
    fc(14, 'Three types of RNA and roles?', 'mRNA template; tRNA adapter; rRNA structural and catalytic.', 'concept', 2),
    fc(15, 'Histones are rich in?', 'Lysine and arginine.', 'fact', 3),
    fc(16, 'DNA per nucleosome?', 'About 200 bp.', 'fact', 3),
    fc(17, 'Length of DNA in a human cell?', 'About 2.2 m.', 'fact', 3),
    fc(18, 'Euchromatin vs heterochromatin?', 'Loose, active vs dense, inactive.', 'concept', 3),
    fc(19, 'Bacterial DNA region?', 'Nucleoid.', 'fact', 3),
    fc(20, 'Central dogma?', 'DNA → RNA → protein (Crick).', 'definition', 4),
    fc(21, 'Enzyme of reverse transcription?', 'Reverse transcriptase.', 'fact', 4),
    fc(22, 'What is semi-conservative replication?', 'Each daughter DNA keeps one old strand.', 'definition', 5),
    fc(23, 'Meselson–Stahl isotopes and method?', '¹⁵N then ¹⁴N; CsCl density gradient.', 'fact', 5),
    fc(24, 'Bands after one and two generations?', 'One hybrid; then hybrid and light equally.', 'exam-tip', 5),
    fc(25, 'Taylor’s material and label?', 'Vicia faba root tips; radioactive thymidine.', 'fact', 5),
    fc(26, 'Direction of DNA polymerase?', '5′ → 3′ only.', 'fact', 5),
    fc(27, 'What are Okazaki fragments?', 'Short pieces made on the lagging strand.', 'definition', 5),
    fc(28, 'Enzyme joining Okazaki fragments?', 'DNA ligase.', 'fact', 5),
    fc(29, 'Substrate and energy source for replication?', 'Deoxyribonucleoside triphosphates.', 'concept', 5),
    fc(30, 'E. coli replication time and rate?', 'About 18 minutes; about 2000 bp per second.', 'fact', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
