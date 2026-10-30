// ISC 12 Biology ch08 notes and flashcards.
import { T, table, unit, PROV } from '../../isc-12-biology-ch01/src/lib.mjs';
import { V, TEMPLATE, MRNA_SEQ, PEPTIDE, HGP_BP, CODING_MBP } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Gene Expression, Human Genome Project and DNA Fingerprinting — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Transcription and processing',
      `**Transcription** copies the information in one strand of DNA into RNA. A **transcription unit** has three regions: a **promoter** (upstream; RNA polymerase binds here), the **structural gene**, and a **terminator** (downstream). Of the two DNA strands, the one with polarity **3′→5′** acts as the **template strand**; the other (5′→3′) is the **coding strand**, whose sequence is the same as the RNA except that **thymine is replaced by uracil**. RNA is always made in the **5′→3′** direction. Both strands are not copied because the two RNAs would be complementary, pair up, and prevent translation.

**Stages:** initiation, elongation and termination. In **bacteria** a single DNA-dependent **RNA polymerase** makes all RNAs; the **sigma (σ) factor** helps initiation and the **rho (ρ) factor** helps termination. Transcription and translation can be coupled in the cytoplasm.

In **eukaryotes** there are three RNA polymerases in the nucleus: **RNA polymerase I** (rRNAs: 28S, 18S, 5.8S), **II** (**hnRNA**, the precursor of mRNA) and **III** (tRNA, 5S rRNA, snRNAs).

**Processing of hnRNA** (in the nucleus):
- **Splicing:** introns (non-coding intervening sequences) are removed and exons (coding sequences) are joined.
- **Capping:** methyl guanosine triphosphate is added to the **5′ end**.
- **Tailing:** 200–300 adenylate residues (**poly-A tail**) are added to the **3′ end**.
The fully processed hnRNA, now **mRNA**, is transported to the cytoplasm. Genes with introns are **split genes**.

**Terms:** **exon** — coding sequence present in mature mRNA; **intron** — intervening sequence removed by splicing; **cistron** — segment of DNA coding for one polypeptide; **recon** — smallest unit capable of recombination; **muton** — smallest unit capable of mutation; **monocistronic** — one structural gene in a transcription unit (mostly eukaryotes); **polycistronic** — several structural genes in one unit (mostly bacteria).`,
      [kt('Template strand', 'DNA strand (3′→5′) that is copied to make RNA.'), kt('hnRNA', 'Heterogeneous nuclear RNA: the primary transcript of eukaryotic structural genes before processing.'), kt('Splicing', 'Removal of introns and joining of exons.'), kt('Cistron', 'DNA segment coding for one polypeptide.')],
      V.trunit,
      [1],
      [V.splicing],
    ),
    sec(
      '2. The genetic code',
      `The sequence of bases in mRNA determines the sequence of amino acids in a protein. **George Gamow** argued that with **4 bases** and **20 amino acids**, the code must be a **triplet**: 4³ = **64** combinations (a doublet gives only 4² = 16). **Har Gobind Khorana** developed chemical methods to synthesise RNA with defined base combinations; **Marshall Nirenberg** used a **cell-free system** for protein synthesis to decode codons; **Severo Ochoa**’s enzyme **polynucleotide phosphorylase** made RNA with defined sequences without a template.

**Features:**
1. The codon is a **triplet**; 61 codons code for amino acids and **3 (UAA, UAG, UGA) are stop codons**.
2. One codon codes for only one amino acid: the code is **unambiguous and specific**.
3. Some amino acids have more than one codon: the code is **degenerate**.
4. The code is read in a continuous manner: it is **comma-less**.
5. The code is **nearly universal**: UUU codes for phenylalanine in bacteria and in humans (exceptions in mitochondria and some protozoans).
6. **AUG** has dual functions: it codes for **methionine** and acts as the **initiator codon**.

**Example (computed).** Template 3′–${TEMPLATE}–5′ gives mRNA 5′–${MRNA_SEQ}–3′, which codes for **${PEPTIDE.join('–')}**, then stop.`,
      [kt('Codon', 'Triplet of bases in mRNA coding for one amino acid or stop.'), kt('Degenerate code', 'More than one codon for some amino acids.'), kt('Initiator codon', 'AUG, which also codes for methionine.')],
      table(['Feature', 'Example'], [['Triplet', 'AUG'], ['Degenerate', 'UUU and UUC both code for phenylalanine'], ['Stop codons', 'UAA, UAG, UGA']], 'Table of features of the genetic code with examples'),
      [2],
    ),
    sec(
      '3. Translation',
      `Translation is the polymerisation of amino acids into a polypeptide in the order set by mRNA codons, on **ribosomes** in the cytoplasm.

**tRNA — the adapter molecule.** tRNA has an **anticodon loop** with bases complementary to the codon and an **amino-acid acceptor end** (3′ end) to which the amino acid binds. Its secondary structure is a **clover leaf**; its 3-D structure is an **inverted L**. There are no tRNAs for stop codons.

**Steps:**
1. **Charging (aminoacylation):** each amino acid is activated in the presence of **ATP** and linked to its tRNA.
2. **Initiation:** the **small ribosomal subunit** binds mRNA; the initiator tRNA carrying methionine pairs with the **start codon AUG**; the large subunit joins.
3. **Elongation:** the ribosome has two sites for tRNAs. A charged tRNA whose anticodon matches the codon enters the **A site**; a **peptide bond** forms between the growing chain (on the tRNA in the **P site**) and the new amino acid; the **rRNA** of the large subunit (23S rRNA in bacteria) acts as the enzyme — a **ribozyme**. The ribosome then moves one codon towards the **3′ end** (translocation).
4. **Termination:** when a stop codon reaches the A site, a **release factor** binds and the polypeptide is released; the ribosome dissociates.

mRNA has **untranslated regions (UTRs)** before the start codon (5′ UTR) and after the stop codon (3′ UTR); they are needed for efficient translation.`,
      [kt('Aminoacylation', 'Linking of an amino acid to its tRNA using ATP (charging).'), kt('Anticodon', 'Triplet on tRNA complementary to an mRNA codon.'), kt('Ribozyme', 'RNA that acts as an enzyme, such as the rRNA that forms peptide bonds.'), kt('Release factor', 'Protein that binds a stop codon and frees the polypeptide.')],
      V.translation,
      [3],
    ),
    sec(
      '4. Regulation of gene expression: the lac operon',
      `Gene expression in eukaryotes can be regulated at the levels of (i) transcription, (ii) processing (splicing), (iii) transport of mRNA from nucleus to cytoplasm and (iv) translation. In bacteria, control of **the rate of transcription initiation** is the main level.

An **operon** is a group of genes that are transcribed together and regulated as a unit. **François Jacob and Jacques Monod** first described the **lac operon** of *E. coli*:
- **i** — the **regulatory gene**, makes the **repressor** protein (constitutively; it has its own promoter);
- **p** — promoter; **o** — operator, where the repressor binds;
- **z** — **β-galactosidase**, which hydrolyses lactose into galactose and glucose; **y** — **permease**, which increases the permeability of the cell to lactose; **a** — **transacetylase**.

**No lactose:** the repressor binds the operator and prevents RNA polymerase from transcribing the structural genes.
**Lactose present:** a few lactose molecules enter (low permease level); lactose (strictly **allolactose**) acts as the **inducer**, binds the repressor and **inactivates** it, so it cannot bind the operator; RNA polymerase transcribes z, y and a as one **polycistronic** mRNA. When lactose is used up, the repressor binds again. This is **negative regulation**, since the repressor switches the operon off.`,
      [kt('Operon', 'Group of genes transcribed together and regulated as a unit.'), kt('Inducer', 'Substance (lactose, allolactose) that inactivates the repressor and switches on the lac operon.'), kt('Repressor', 'Protein made by gene i that binds the operator and blocks transcription.')],
      V.lac,
      [4],
    ),
    sec(
      '5. The Human Genome Project',
      `The **Human Genome Project (HGP)**, launched in **1990** and completed in **2003**, was coordinated by the US Department of Energy and the National Institutes of Health, with the UK, Japan, France, Germany, China and others.

**Goals:** identify all the genes (about 20 000–25 000) in human DNA; determine the sequence of the **3 billion** chemical base pairs; store the information in databases; improve tools for data analysis; transfer related technologies to other sectors; and address the **ethical, legal and social issues (ELSI)** that may arise.

**Methodologies:** (i) **Expressed Sequence Tags (ESTs)** — identifying all the genes that are expressed as RNA; (ii) **sequence annotation** — sequencing the whole set of the genome, coding and non-coding, and later assigning functions to different regions. Total DNA was broken into fragments, cloned in hosts using **BAC** (bacterial artificial chromosome) and **YAC** (yeast artificial chromosome) vectors, sequenced with **automated DNA sequencers** (Frederick Sanger’s method) and arranged by specialised computer programs using overlapping regions.

**Salient features:**
- The genome has **${HGP_BP} million** nucleotide bases.
- The total number of genes was estimated at about **30 000** (later estimates nearer 20 000).
- The average gene has **3000 bases**; the largest known gene, **dystrophin**, has **2.4 million** bases.
- Almost **99.9 percent** of bases are the same in all people.
- The functions of over half the discovered genes were unknown.
- **Less than 2 percent** of the genome codes for proteins — at most about **${CODING_MBP} million** bp.
- **Repeated sequences** make up a very large portion of the genome.
- **Chromosome 1** has the most genes (**2968**) and **Y** the fewest (**231**).
- About **1.4 million** locations of single-base DNA differences, **single nucleotide polymorphisms (SNPs)**, were identified.

**Applications:** finding the genes behind disorders, designing new diagnosis and treatment (including gene therapy), understanding human biology and evolution; the sequences of other organisms (bacteria, yeast, *Caenorhabditis elegans*, *Drosophila*, rice, *Arabidopsis*) were also completed.`,
      [kt('EST', 'Expressed sequence tag: a short sequence used to identify a gene expressed as RNA.'), kt('Sequence annotation', 'Sequencing the whole genome and then assigning functions to its regions.'), kt('SNP', 'Single nucleotide polymorphism: a single-base difference between individuals.'), kt('BAC and YAC', 'Bacterial and yeast artificial chromosomes used as cloning vectors.')],
      table(['Feature', 'Value'], [['Bases', `${HGP_BP} million`], ['Coding', 'Less than 2 percent'], ['Most genes', 'Chromosome 1'], ['Fewest genes', 'Chromosome Y']], 'Table of key numbers of the human genome'),
      [5],
    ),
    sec(
      '6. DNA fingerprinting',
      `About 99.9 percent of the human sequence is the same in everyone; DNA fingerprinting compares the differences in **repetitive DNA**. Repetitive DNA separates from the bulk DNA as **satellite DNA** peaks in density-gradient centrifugation. Satellite DNA is classified as **micro-satellites** and **mini-satellites** by length and base composition; it does not code for proteins and shows **high polymorphism**.

**Variable number tandem repeats (VNTRs)** — mini-satellites in which a short sequence is repeated many times — differ in **copy number** from person to person, so the size of the DNA fragment containing them differs. The technique was developed by **Alec Jeffreys**, who used a VNTR as a probe.

**Steps:** (i) **isolation** of DNA; (ii) **digestion** with restriction endonucleases; (iii) separation of fragments by **gel electrophoresis**; (iv) **Southern blotting** — transfer to a nylon or nitrocellulose membrane; (v) **hybridisation** with a labelled **VNTR probe**; (vi) detection by **autoradiography**. The pattern of bands is the **DNA fingerprint**; it is unique to each individual except identical twins. Small samples can be amplified by **PCR** first.

**Applications:** forensic science (identifying suspects from blood, hair, semen or skin), **paternity and maternity** disputes, identification of disaster victims, studies of population and genetic diversity and evolution.

**Ethical issues:** genetic data reveal private information about a person and relatives; samples need **informed consent**; databases need **secure storage and controlled access**; misuse could lead to **discrimination** (for example by employers or insurers); results must be handled carefully in court.`,
      [kt('VNTR', 'Variable number tandem repeat: a mini-satellite whose repeat number varies between individuals.'), kt('Southern blotting', 'Transfer of separated DNA fragments from a gel to a membrane.'), kt('Satellite DNA', 'Repetitive DNA forming a separate peak in density-gradient centrifugation.')],
      V.gel,
      [6],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing T instead of U in mRNA, or forgetting the 5′ and 3′ ends.
- Saying the coding strand is copied (the template strand is copied; the RNA has the coding-strand sequence).
- Calling the code ambiguous because it is degenerate (one codon → one amino acid; one amino acid → several codons).
- Saying lactose binds the operator (it binds the repressor).
- Mixing up ESTs (expressed genes) with sequence annotation (whole genome).
- Leaving out Southern blotting or hybridisation from the fingerprinting steps.

**How marks are usually awarded**
- 1-mark subparts: a term (cistron, muton), a codon, an enzyme of the lac operon, a step of fingerprinting.
- 2–3-mark questions: processing of hnRNA; features of the code; lac operon on and off; ESTs vs annotation; paternity gel.
- 5-mark questions in parts: transcription unit with diagram; translation steps; lac operon with labelled diagram; DNA fingerprinting with uses and ethics.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Three parts of a transcription unit?', 'Promoter, structural gene, terminator.', 'fact', 1),
    fc(2, 'Which DNA strand is copied in transcription?', 'The template strand (3′ → 5′).', 'concept', 1),
    fc(3, 'Bacterial factors for initiation and termination?', 'Sigma (σ) for initiation; rho (ρ) for termination.', 'fact', 1),
    fc(4, 'What does RNA polymerase II make?', 'hnRNA, the precursor of mRNA.', 'fact', 1),
    fc(5, 'Three steps of hnRNA processing?', 'Splicing, capping (5′), tailing (3′ poly-A).', 'concept', 1),
    fc(6, 'Exon vs intron?', 'Exon: coding, kept; intron: non-coding, removed.', 'definition', 1),
    fc(7, 'Define cistron.', 'DNA segment coding for one polypeptide.', 'definition', 1),
    fc(8, 'Recon and muton?', 'Smallest units of recombination and of mutation.', 'definition', 1),
    fc(9, 'Monocistronic vs polycistronic?', 'One gene per unit (eukaryotes); several (bacteria).', 'definition', 1),
    fc(10, 'Who argued the code must be a triplet?', 'George Gamow.', 'fact', 2),
    fc(11, 'Contribution of Khorana?', 'Chemical synthesis of RNA with defined repeats.', 'fact', 2),
    fc(12, 'Contribution of Nirenberg?', 'Cell-free protein synthesis to decode codons.', 'fact', 2),
    fc(13, 'Ochoa’s enzyme?', 'Polynucleotide phosphorylase.', 'fact', 2),
    fc(14, 'How many codons; how many stop?', '64; three stop (UAA, UAG, UGA).', 'fact', 2),
    fc(15, 'What does degenerate mean?', 'Some amino acids have more than one codon.', 'definition', 2),
    fc(16, 'Dual role of AUG?', 'Codes for methionine and starts translation.', 'concept', 2),
    fc(17, 'What is aminoacylation?', 'Charging tRNA with its amino acid using ATP.', 'definition', 3),
    fc(18, 'Shape of tRNA?', 'Clover leaf (2-D); inverted L (3-D).', 'fact', 3),
    fc(19, 'Which site does a new charged tRNA enter?', 'The A site.', 'fact', 3),
    fc(20, 'What forms the peptide bond?', 'rRNA of the large subunit, a ribozyme.', 'concept', 3),
    fc(21, 'What ends translation?', 'A stop codon with a release factor.', 'fact', 3),
    fc(22, 'Genes of the lac operon?', 'i (repressor); p, o; z, y, a.', 'fact', 4),
    fc(23, 'Enzymes coded by z, y, a?', 'β-galactosidase, permease, transacetylase.', 'fact', 4),
    fc(24, 'Inducer of the lac operon?', 'Lactose (allolactose).', 'fact', 4),
    fc(25, 'Why is lac control called negative?', 'The repressor switches the operon off.', 'concept', 4),
    fc(26, 'Two methods of the Human Genome Project?', 'ESTs and sequence annotation.', 'fact', 5),
    fc(27, 'Chromosomes with most and fewest genes?', 'Chromosome 1 (2968); Y (231).', 'fact', 5),
    fc(28, 'What fraction of the genome codes for protein?', 'Less than 2 percent.', 'exam-tip', 5),
    fc(29, 'Who developed DNA fingerprinting?', 'Alec Jeffreys.', 'fact', 6),
    fc(30, 'Steps of DNA fingerprinting?', 'Isolate, digest, electrophoresis, Southern blot, VNTR probe, autoradiography.', 'exam-tip', 6),
  ],
  status: 'draft',
  provenance: PROV,
};
