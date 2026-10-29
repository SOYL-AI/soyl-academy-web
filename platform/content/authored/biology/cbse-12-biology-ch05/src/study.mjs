// ch05 notes and flashcards.
import { T, table, flow, unit, PROV } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Molecular Basis of Inheritance — Notes',
  language: 'en',
  sections: [
    sec(
      '1. The search for the genetic material',
      `**Griffith (1928),** *Streptococcus pneumoniae*: S strain (capsule, virulent) and R strain (no capsule). Live S → mice die; live R → live; heat-killed S → live; heat-killed S + live R → mice die and live S recovered. Some "transforming principle" from dead S cells **transformed** R cells.

**Avery, MacLeod and McCarty (1933–44):** purified DNA, RNA and proteins from heat-killed S cells; only **DNA** transformed R cells. Proteases and RNase did not stop transformation; **DNase** did.

**Hershey and Chase (1952):** bacteriophages grown with radioactive **³²P** (DNA contains P, protein does not) or **³⁵S** (protein contains S, DNA does not). After infection, blending and centrifugation, bacteria infected with ³²P phages were radioactive, those with ³⁵S phages were not: **DNA enters the bacterium and is the genetic material**.

**Criteria for genetic material:** replicates; chemically and structurally stable; allows slow changes (mutation) for evolution; expresses itself as Mendelian characters. **DNA vs RNA:** RNA's 2′-OH makes it reactive and less stable, and it mutates faster; uracil in RNA is replaced by the more stable thymine in DNA. RNA was probably the first genetic material ("RNA world"); some viruses (TMV, QB bacteriophage) still use RNA.`,
      [kt('Transformation', 'Change in the genetic make-up of a bacterium caused by DNA taken up from another strain.'), kt('Bacteriophage', 'A virus that infects bacteria.')],
      flow('LR', [['g', 'Griffith: transforming principle'], ['a', 'Avery et al.: it is DNA'], ['h', 'Hershey–Chase: DNA enters'], ['c', 'DNA is genetic material']], [['g', 'a'], ['a', 'h'], ['h', 'c']], 'Flow of experiments proving DNA is the genetic material'),
      [1],
    ),
    sec(
      '2. Structure of DNA and RNA; packaging',
      `**Polynucleotide:** nitrogenous base + pentose (deoxyribose in DNA, ribose in RNA) + phosphate. Base + sugar (N-glycosidic linkage) = nucleoside; + phosphate (phosphoester at 5′-OH) = nucleotide; nucleotides joined by **3′–5′ phosphodiester** linkages. Purines: adenine, guanine; pyrimidines: cytosine, thymine (DNA), uracil (RNA). DNA was first identified by Friedrich Miescher (1869) as "nuclein".

**Double helix (Watson and Crick, 1953;** X-ray data of Wilkins and Franklin; **Chargaff**: A = T, G = C in double-stranded DNA):
- two **antiparallel** polynucleotide chains, sugar-phosphate backbone outside, bases inside;
- **A=T (two H-bonds)**, **G≡C (three H-bonds)**; a purine always faces a pyrimidine (uniform width);
- right-handed; pitch **3.4 nm**; about **10 bp per turn**; **0.34 nm** between base pairs.
Length = number of bp × 0.34 nm: human diploid DNA (6.6 × 10⁹ bp) ≈ 2.2 m; E. coli (4.6 × 10⁶ bp) ≈ 1.56 mm.

**Packaging:** prokaryotes — DNA in large loops held by positively charged proteins in the **nucleoid**. Eukaryotes — **histones** (rich in lysine and arginine; positive) form an **octamer**; DNA wraps around it as a **nucleosome** (about 200 bp); nucleosomes form the "beads-on-string" chromatin fibre, which coils further; **non-histone chromosomal (NHC) proteins** help higher packing. **Euchromatin:** loosely packed, light-staining, transcriptionally active. **Heterochromatin:** densely packed, dark-staining, inactive.`,
      [kt('Nucleosome', 'Unit of chromatin: about 200 bp of DNA wrapped around a histone octamer.'), kt('Antiparallel', 'Running in opposite directions: one strand 5′→3′, the other 3′→5′.'), kt('Euchromatin', 'Loosely packed, transcriptionally active chromatin.')],
      V.ladder,
      [2],
      [V.nucleosome],
    ),
    sec(
      '3. DNA replication',
      `**Semi-conservative** (Watson and Crick): strands separate and each templates a new strand, so each daughter has one old and one new strand.

**Meselson and Stahl (1958):** E. coli grown in **¹⁵NH₄Cl**, then in ¹⁴N; DNA separated in a **CsCl density gradient**. Generation 1: all hybrid (¹⁵N/¹⁴N); generation 2: hybrid and light in equal amounts. After *n* generations, hybrid fraction = 2/2ⁿ. (Taylor and colleagues showed the same in *Vicia faba* chromosomes using radioactive thymidine.)

**Machinery:** DNA-dependent **DNA polymerase** (polymerises only **5′ → 3′**; E. coli copies 4.6 × 10⁶ bp in about 18 minutes, roughly 2000 bp/s); deoxyribonucleoside triphosphates are substrates and energy source; replication starts at an **origin of replication**; at the **replication fork** the **leading strand** is continuous and the **lagging strand** is made as **Okazaki fragments** joined by **DNA ligase**. In eukaryotes replication occurs in the **S phase**.`,
      [kt('Semi-conservative replication', 'Each new DNA molecule has one parental and one newly made strand.'), kt('Okazaki fragments', 'Short DNA pieces made on the lagging strand, later joined by ligase.')],
      V.meselson,
      [3],
      [V.fork],
    ),
    sec(
      '4. Transcription and the genetic code',
      `**Central dogma** (Crick): DNA → RNA → protein; **reverse transcription** (RNA → DNA) in some viruses (retroviruses).

**Transcription unit:** **promoter** (upstream, binding site of RNA polymerase), **structural gene**, **terminator**. Template strand 3′→5′; coding strand 5′→3′ has the RNA sequence (T for U). Structural genes may be monocistronic (mostly eukaryotes) or polycistronic (mostly bacteria).
- **Bacteria:** one DNA-dependent RNA polymerase; **σ** (initiation) and **ρ** (termination) factors; transcription and translation can be coupled.
- **Eukaryotes:** **RNA pol I** (rRNAs 28S, 18S, 5.8S), **pol II** (hnRNA → mRNA), **pol III** (tRNA, 5S rRNA, snRNAs). **Split genes**: exons (coding) and introns. Processing: **splicing** (remove introns, join exons), **capping** (methyl guanosine triphosphate at the 5′ end), **tailing** (200–300 adenylates at the 3′ end).

**Genetic code:** proposed as a triplet by Gamow (4³ = 64); RNAs of defined sequence made by **Khorana**; cell-free decoding by **Nirenberg**. Features: triplet; 61 sense codons, 3 stop (UAA, UAG, UGA); unambiguous and specific; degenerate; read contiguously (no punctuation); nearly universal; **AUG** codes for methionine and is the start codon. **Mutations:** a point mutation changes one codon (sickle-cell GAG → GUG); insertion or deletion of 1–2 bases causes a **frameshift**; of 3 bases adds or removes one amino acid.`,
      [kt('Promoter', 'DNA sequence upstream of a gene where RNA polymerase binds to start transcription.'), kt('Exon / intron', 'Coding sequences retained in mature mRNA / intervening sequences removed by splicing.'), kt('Degeneracy', 'Some amino acids are coded by more than one codon.')],
      V.trunit,
      [4],
    ),
    sec(
      '5. tRNA and translation',
      `**tRNA (adapter):** clover-leaf secondary structure, inverted-L 3D shape; **anticodon loop** pairs with the codon; **amino acid acceptor end** carries the amino acid; a specific tRNA for each amino acid; an **initiator tRNA** for methionine; **no tRNA for stop codons**.

**Translation:**
1. **Charging (aminoacylation):** amino acids activated with ATP and linked to their tRNA.
2. **Initiation:** the small ribosomal subunit meets the mRNA at the start codon **AUG**; the large subunit joins.
3. **Elongation:** charged tRNAs enter codon by codon; peptide bonds form. In bacteria the **23S rRNA** catalyses peptide-bond formation, acting as a **ribozyme**.
4. **Termination:** a **release factor** binds the stop codon; the polypeptide is released.

**UTRs** (untranslated regions) at the 5′ and 3′ ends of mRNA help efficient translation.`,
      [kt('Anticodon', 'Three bases of tRNA that pair with a codon on mRNA.'), kt('Ribozyme', 'An RNA that acts as an enzyme, such as 23S rRNA in bacterial ribosomes.')],
      flow('LR', [['c', 'Charging'], ['i', 'Initiation (AUG)'], ['e', 'Elongation'], ['t', 'Termination (release factor)']], [['c', 'i'], ['i', 'e'], ['e', 't']], 'Flow of the four steps of translation'),
      [4],
    ),
    sec(
      '6. Regulation of gene expression: the lac operon',
      `Regulation can occur at transcription, processing, transport of mRNA or translation; in prokaryotes it is mainly at the **initiation of transcription**. An **operon** is a set of genes controlled together.

**lac operon (Jacob and Monod):** regulatory gene **i** (makes the **repressor**), **promoter**, **operator**, structural genes **z** (β-galactosidase: lactose → galactose + glucose), **y** (permease: lets lactose in), **a** (transacetylase).
- **No lactose:** the repressor binds the **operator** and prevents RNA polymerase from transcribing the operon.
- **Lactose present (inducer):** lactose binds the repressor, inactivating it; RNA polymerase transcribes z, y and a.
- When lactose is used up, the repressor binds again. This is **negative regulation**.`,
      [kt('Operon', 'A group of genes with related functions controlled together by one promoter and operator.'), kt('Inducer', 'A substance (lactose for the lac operon) that inactivates the repressor and switches the operon on.')],
      V.lac,
      [5],
    ),
    sec(
      '7. Human Genome Project and DNA fingerprinting',
      `**HGP (1990–2003).** Goals: identify all the approximately 20,000–25,000 human genes; determine the sequence of about 3 billion base pairs; store the information in databases; improve analysis tools; transfer technologies; address ethical, legal and social issues. Methods: **Expressed Sequence Tags (ESTs)** and **sequence annotation**; DNA fragments cloned in **BAC** and **YAC** vectors; **automated sequencers** based on **Sanger's** method; computer alignment of overlaps.

**Salient observations:** 3164.7 million bases; average gene about 3000 bases (largest, dystrophin, 2.4 million); about 30,000 genes; 99.9 % of bases identical in all people; functions of over half the genes unknown; **less than 2 %** of the genome codes for proteins; repeated sequences make up a large part; chromosome 1 has most genes (2968), Y fewest (231); about 1.4 million single-base differences (**SNPs**).

**DNA fingerprinting (Alec Jeffreys):** compares **repetitive DNA**; **satellite DNA** forms minor peaks in density gradients; **VNTRs** (variable number tandem repeats, about 0.1–20 kb) vary between individuals (**polymorphism**) and are inherited, half from each parent. Steps: isolate DNA → digest with **restriction endonucleases** → separate by **gel electrophoresis** → **Southern blot** onto nylon or nitrocellulose → **hybridise** with a labelled VNTR probe → detect by **autoradiography**. Uses: forensic identification, paternity testing, population and genetic diversity studies.`,
      [kt('VNTR', 'Variable number tandem repeat: a short sequence repeated a variable number of times, used as a probe in DNA fingerprinting.'), kt('SNP', 'Single nucleotide polymorphism: a single-base difference between individuals.')],
      V.gel,
      [6],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Applying A = T, G = C to single-stranded nucleic acids.
- Writing mRNA complementary to the coding strand (it matches the coding strand, with U for T).
- Saying DNA polymerase works 3′ → 5′, or that both new strands are continuous.
- Mixing up RNA polymerases I, II and III.
- Calling the lac operon positive regulation, or naming glucose as the inducer.
- Listing DNA fingerprinting steps out of order.

**How marks are usually awarded**
- 1-mark items: base percentages, codon or amino acid, term, enzyme, number.
- 2–3-mark answers: experiment and conclusion; strand and direction; two or three features with explanation.
- 5-mark answers: a labelled diagram (fork, transcription unit, lac operon) with the process, or an experiment with set-up, results and conclusion.
- Case-based items: reading band patterns, a DNA or mRNA sequence, or an operon mutant.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What did Griffith show?', 'Heat-killed S bacteria transformed live R bacteria into virulent S: a transforming principle.', 'concept', 1),
    fc(2, 'Which enzyme stopped transformation in Avery’s work?', 'DNase (not protease or RNase).', 'fact', 1),
    fc(3, 'Hershey–Chase labels?', '³²P labels DNA; ³⁵S labels protein; only ³²P entered bacteria.', 'fact', 1),
    fc(4, 'Four properties of genetic material?', 'Replication, stability, slow mutation, expression as characters.', 'concept', 1),
    fc(5, 'Why is DNA more stable than RNA?', 'No reactive 2′-OH; thymine instead of uracil; double-stranded.', 'concept', 1),
    fc(6, 'Nucleoside vs nucleotide?', 'Base + sugar; base + sugar + phosphate.', 'definition', 2),
    fc(7, 'Chargaff’s rule?', 'In double-stranded DNA, A = T and G = C.', 'fact', 2),
    fc(8, 'Hydrogen bonds in A=T and G≡C?', 'Two and three.', 'fact', 2),
    fc(9, 'Helix dimensions?', 'Pitch 3.4 nm; about 10 bp per turn; 0.34 nm per bp.', 'fact', 2),
    fc(10, 'What is a nucleosome?', 'About 200 bp of DNA wrapped around a histone octamer.', 'definition', 2),
    fc(11, 'Why are histones positively charged?', 'They are rich in lysine and arginine.', 'fact', 2),
    fc(12, 'Euchromatin vs heterochromatin?', 'Loose, light, active vs dense, dark, inactive.', 'concept', 2),
    fc(13, 'Meselson–Stahl: generation 2 bands?', 'Equal hybrid and light DNA.', 'fact', 3),
    fc(14, 'Direction of DNA polymerase?', '5′ → 3′ only.', 'exam-tip', 3),
    fc(15, 'Leading vs lagging strand?', 'Continuous vs discontinuous (Okazaki fragments, joined by ligase).', 'concept', 3),
    fc(16, 'Substrate and energy source in replication?', 'Deoxyribonucleoside triphosphates.', 'fact', 3),
    fc(17, 'Parts of a transcription unit?', 'Promoter, structural gene, terminator.', 'diagram', 4),
    fc(18, 'Which strand does mRNA match?', 'The coding strand (with U for T).', 'exam-tip', 4),
    fc(19, 'σ and ρ factors?', 'Initiation and termination factors of bacterial RNA polymerase.', 'fact', 4),
    fc(20, 'Products of RNA pol I, II, III?', 'I: rRNAs (28S, 18S, 5.8S); II: hnRNA; III: tRNA, 5S rRNA, snRNAs.', 'fact', 4),
    fc(21, 'Three steps of mRNA processing?', 'Splicing, capping (5′ methyl guanosine triphosphate), tailing (3′ poly-A).', 'concept', 4),
    fc(22, 'Stop codons?', 'UAA, UAG, UGA.', 'fact', 4),
    fc(23, 'Two roles of AUG?', 'Codes for methionine; start codon.', 'fact', 4),
    fc(24, 'What is a frameshift mutation?', 'Insertion or deletion of 1–2 bases shifting the reading frame.', 'definition', 4),
    fc(25, 'Which RNA is a ribozyme in bacterial ribosomes?', '23S rRNA (forms peptide bonds).', 'fact', 4),
    fc(26, 'lac operon structural genes and products?', 'z: β-galactosidase; y: permease; a: transacetylase.', 'fact', 5),
    fc(27, 'Inducer of the lac operon?', 'Lactose.', 'fact', 5),
    fc(28, 'Why is lac control negative regulation?', 'A repressor switches the operon off.', 'concept', 5),
    fc(29, 'HGP: start and finish?', '1990 to 2003.', 'fact', 6),
    fc(30, 'Share of genome coding for proteins?', 'Less than 2 percent.', 'fact', 6),
    fc(31, 'What is a VNTR?', 'Variable number tandem repeat; a repetitive sequence whose copy number varies between people.', 'definition', 6),
    fc(32, 'Steps of DNA fingerprinting?', 'Isolate → digest → electrophoresis → Southern blot → hybridise with VNTR probe → autoradiography.', 'concept', 6),
  ],
  status: 'draft',
  provenance: PROV,
};
