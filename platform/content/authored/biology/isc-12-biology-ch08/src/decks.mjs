// ISC 12 Biology ch08 Gene Expression, Human Genome Project and DNA Fingerprinting — Part 1 (t01–t03), Part 2 (t04–t06).
import { sl, deck, table, flow, svgV, r } from '../../isc-12-biology-ch01/src/lib.mjs';
import { TRUNIT, SPLICING, TRANSLATION, LAC, GEL, LANES, MRNA, anticodon } from './svgs.mjs';
import { transcribe, translate, codon, codonCount } from './calc.mjs';

export const V = {
  trunit: svgV(TRUNIT, 'A transcription unit with promoter, structural gene and terminator, and the coding and template strands'),
  splicing: svgV(SPLICING, 'Processing of hnRNA by splicing, capping and tailing into mature mRNA'),
  translation: svgV(TRANSLATION, 'Translation on a ribosome with tRNAs in the P and A sites'),
  lac: svgV(LAC, 'The lac operon switched off without lactose and switched on with lactose'),
  gel: svgV(GEL, 'DNA fingerprint gel with lanes for a mother, a child and two men'),
};

// ---------------------------------------------------------------- computed numbers
export const TEMPLATE = 'TACAAGCCTACCATT'; // written 3′→5′
export const MRNA_SEQ = transcribe(TEMPLATE);
export const PEPTIDE = translate(MRNA_SEQ);
const C3 = codonCount(3), C2 = codonCount(2);
const EX2 = ['UUU', 'UUC', 'GCA'];
export const HGP_BP = 3164.7; // million bp
export const CODING_MBP = Math.round(HGP_BP * 0.02 * 10) / 10;
const childFromP = LANES.CHILD.filter((b) => LANES.FATHER.includes(b)).length;
const childFromQ = LANES.CHILD.filter((b) => LANES.OTHER.includes(b)).length;
const childFromM = LANES.CHILD.filter((b) => LANES.MOTHER.includes(b)).length;
export const GEL_COUNTS = { childFromP, childFromQ, childFromM };

export const deck1 = deck({
  part: 1,
  title: 'Gene Expression — Part 1: Transcription, the genetic code and translation',
  goals: [
    'Describe transcription and the processing of hnRNA into mRNA',
    'Define intron, exon, cistron, recon, muton, and monocistronic and polycistronic units',
    'State the discovery and features of the genetic code',
    'Explain initiation, elongation and termination of translation',
  ],
  slides: [
    sl('title', 'Gene expression', {
      b: 'Part 1 — how a gene’s message is copied into RNA, decoded and turned into protein.',
      v: flow('LR', [['g', 'Gene (DNA)'], ['h', 'hnRNA'], ['m', 'Mature mRNA'], ['p', 'Polypeptide']], [['g', 'h', 'transcription'], ['h', 'm', 'processing'], ['m', 'p', 'translation']], 'Flow from gene to hnRNA to mature mRNA to polypeptide'),
      n: 'A gene is expressed in two main steps. First its message is copied into RNA, which in eukaryotes must be processed before use. Then the RNA message is decoded on ribosomes to make a chain of amino acids.',
    }),
    sl('diagram', 'The transcription unit', {
      b: 'A **transcription unit** has a **promoter** (where RNA polymerase binds), the **structural gene** and a **terminator**. Only the **template strand** (3′→5′) is copied; RNA is made **5′→3′** and matches the **coding strand**, with **U in place of T**.',
      v: V.trunit,
      n: 'Only one strand of the gene is copied. If both were copied, two different RNAs would be made, and they would pair with each other and block translation. The other strand, called the coding strand, has the same sequence as the RNA, except that uracil replaces thymine.',
    }),
    sl('concept', 'Transcription in prokaryotes and eukaryotes', {
      b: 'Transcription runs in three stages: **initiation, elongation and termination**.',
      v: table(['Feature', 'Bacteria', 'Eukaryotes'], [['RNA polymerase', 'One enzyme makes all RNAs', 'Three: I (rRNAs), II (hnRNA, precursor of mRNA), III (tRNA, 5S rRNA, snRNAs)'], ['Initiation', 'Sigma factor helps the enzyme bind the promoter', 'Polymerase with other factors binds the promoter'], ['Termination', 'Rho factor', 'Terminator and other factors'], ['Where', 'Cytoplasm; translation can start at once', 'Nucleus; RNA processed first']], 'Table comparing transcription in bacteria and eukaryotes'),
      n: 'In bacteria a single RNA polymerase, guided by the sigma factor at initiation and the rho factor at termination, makes every kind of RNA. Eukaryotes use three polymerases, and their RNA is made in the nucleus and processed before it reaches the ribosomes.',
    }),
    sl('diagram', 'Processing of hnRNA', {
      b: 'In eukaryotes the primary transcript, **hnRNA**, contains **exons** (coding) and **introns** (non-coding). **Splicing** removes introns and joins exons; **capping** adds **methyl guanosine triphosphate** at the 5′ end; **tailing** adds **200–300 adenylate residues** at the 3′ end.',
      v: V.splicing,
      n: 'Only after splicing, capping and tailing does the mature messenger RNA leave the nucleus. The cap and tail protect the message and help the ribosome find it. Genes made of exons and introns are called split genes.',
    }),
    sl('concept', 'Terms for parts of a gene', {
      b: 'ISC asks for brief definitions of these terms.',
      v: table(['Term', 'Meaning'], [['Exon', 'Coding sequence that appears in mature mRNA'], ['Intron', 'Intervening non-coding sequence removed by splicing'], ['Cistron', 'Segment of DNA coding for one polypeptide'], ['Recon', 'Smallest unit that can recombine'], ['Muton', 'Smallest unit that can mutate (a single nucleotide)'], ['Monocistronic', 'One structural gene per transcription unit (mostly eukaryotes)'], ['Polycistronic', 'Several structural genes in one unit (mostly bacteria, such as the lac operon)']], 'Table of gene terms with meanings'),
      n: 'A cistron is a stretch of DNA coding for one polypeptide. The smallest part that can recombine is the recon, and the smallest part that can mutate is the muton. Eukaryotic units usually carry one gene, while bacterial units often carry several.',
    }),
    sl('check', 'Quick check: processing', {
      b: 'Which sequences are removed from hnRNA during splicing?',
      n: 'Quick check. Are the coding or the non-coding parts removed?',
      chk: 'intron-mcq',
    }),
    sl('example', 'Worked example 1: from template to protein', {
      b: `The template strand of a short gene reads 3′–${TEMPLATE}–5′. Write the mRNA and the peptide it codes for.`,
      ul: [
        `Pair each template base with its RNA partner (A with U, T with A, G with C, C with G): mRNA 5′–**${MRNA_SEQ}**–3′.`,
        `Read in triplets from AUG: ${MRNA_SEQ.match(/.{3}/g).join(' · ')}.`,
        `Peptide: **${PEPTIDE.join('–')}**, then stop at ${MRNA_SEQ.slice(-3)}.`,
      ],
      v: table(['Codon', 'Amino acid'], MRNA_SEQ.match(/.{3}/g).map((c) => [c, codon(c)]), `Worked table: codons and amino acids ${PEPTIDE.join(', ')}, stop`),
      n: 'Write the partner of each template base, using uracil instead of thymine, and remember the new strand runs five prime to three prime. Then split the message into triplets from the start codon and look up each one until you reach a stop codon.',
    }),
    sl('concept', 'Cracking the genetic code', {
      b: `With four bases, a **doublet** code gives only ${C2} words, too few for 20 amino acids; a **triplet** code gives **${C3}**.`,
      v: table(['Scientist', 'Contribution'], [['George Gamow', 'Argued that the code must be a triplet'], ['Har Gobind Khorana', 'Chemical synthesis of RNA with defined repeats'], ['Marshall Nirenberg', 'Cell-free system for protein synthesis to decode codons'], ['Severo Ochoa', 'Polynucleotide phosphorylase to make RNA without a template']], 'Table of scientists who cracked the genetic code'),
      n: 'Gamow reasoned that a code of single bases or pairs of bases could not name twenty amino acids, so each word must have three letters. Khorana’s synthetic messages, Nirenberg’s cell-free system and Ochoa’s enzyme then let the whole code be worked out.',
    }),
    sl('concept', 'Features of the genetic code', {
      b: `Of the ${C3} codons, **61 code for amino acids** and **3 are stop codons**.`,
      v: table(['Feature', 'Meaning'], [['Triplet', 'Three bases form one codon'], ['Unambiguous and specific', 'One codon codes for only one amino acid'], ['Degenerate', 'Some amino acids have more than one codon'], ['Comma-less', 'Read continuously, without gaps'], ['Nearly universal', 'Same codons in bacteria and humans, with rare exceptions'], ['Start and stop', 'AUG codes for methionine and starts; UAA, UAG and UGA stop']], 'Table of the features of the genetic code'),
      n: 'Because the code is nearly universal, a human gene placed in a bacterium can still be read correctly. Degeneracy means a change in the third base of a codon often leaves the amino acid unchanged.',
    }),
    sl('diagram', 'Translation on the ribosome', {
      b: 'Each **tRNA** is first **charged** with its amino acid (aminoacylation, using ATP). At **initiation**, the small subunit binds mRNA at **AUG** with the initiator tRNA. In **elongation**, a tRNA whose **anticodon** pairs with the codon enters the **A site**, a **peptide bond** forms, and the ribosome moves on one codon. At a **stop codon** a **release factor** ends the process.',
      v: V.translation,
      n: `Look at the ribosome in the diagram. The transfer RNA in the P site holds the growing chain, and a new one carrying ${codon(MRNA[2]).toLowerCase() === 'gly' ? 'glycine' : 'the next amino acid'} enters the A site. The ribosomal RNA in the large subunit acts as the enzyme, a ribozyme, that forms the peptide bond.`,
    }),
    sl('example', 'Worked example 2: anticodons and a silent change', {
      b: 'An mRNA contains the codons UUU, UUC and GCA. Write the anticodon (3′→5′) of each matching tRNA and the amino acid it carries. What happens to the protein if UUU mutates to UUC?',
      ul: [
        'Pair each base: A with U, G with C.',
        ...EX2.map((c) => `${c} → anticodon 3′–${anticodon(c)}–5′ → **${codon(c)}**`),
        `UUU and UUC both code for **${codon('UUU')}**, so the protein is unchanged: the code is **degenerate**.`,
      ],
      v: table(['Codon', 'Anticodon (3′→5′)', 'Amino acid'], EX2.map((c) => [c, anticodon(c), codon(c)]), `Worked table: anticodons ${EX2.map(anticodon).join(', ')}`),
      n: 'Each anticodon is simply the complement of the codon, written in the opposite direction. Two different codons, U U U and U U C, are read by different transfer RNAs yet bring the same amino acid, phenylalanine. That is degeneracy, and it is why some base changes are silent.',
    }),
    sl('check', 'Quick check: degeneracy', {
      b: 'Judge the assertion and the reason about the genetic code.',
      n: 'Quick check. Can one amino acid have more than one codon?',
      chk: 'degenerate-ar',
    }),
    sl('check', 'Quick check: charging tRNA', {
      b: 'What is aminoacylation of tRNA?',
      n: 'Quick check. What does the transfer RNA pick up, and what supplies the energy?',
      chk: 'aminoacyl-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Transcription unit: promoter, structural gene, terminator; template strand 3′→5′; RNA made 5′→3′.',
        'Bacteria: one RNA polymerase (sigma, rho). Eukaryotes: polymerase I, II, III; hnRNA spliced, capped, tailed.',
        'Exon, intron, cistron, recon, muton; monocistronic (eukaryotes) and polycistronic (bacteria).',
        `Triplet code (${C3} codons; 61 sense, 3 stop): unambiguous, degenerate, comma-less, nearly universal; AUG starts.`,
        'Translation: charging, initiation at AUG, elongation (A and P sites, peptide bond by ribozyme), termination by release factor.',
      ],
      v: table(['Step', 'Where'], [['Transcription', 'Nucleus (eukaryotes)'], ['Processing', 'Nucleus'], ['Translation', 'Ribosomes in the cytoplasm']], 'Summary table of where each step happens'),
      n: 'To recap: a gene is transcribed from its template strand, the transcript is processed in eukaryotes, and the triplet code is read on ribosomes by transfer RNAs that bring the right amino acids until a stop codon is reached.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Write strands with **5′ and 3′ ends**, and use **U, not T**, in RNA.',
        'Define **intron, exon, cistron, recon and muton** in one line each.',
        'Explain **degenerate** and **unambiguous** with an example.',
        'Name the **A and P sites** and the role of the **release factor**.',
      ],
      n: 'Exam tips. Always label the ends of strands and use uracil in RNA. Keep definitions of the gene terms short. Explain each feature of the code with an example. And describe translation in its three stages, naming the sites on the ribosome.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Gene Expression — Part 2: Regulation, the Human Genome Project and DNA fingerprinting',
  goals: [
    'Explain how lactose switches on the lac operon',
    'State the goals, methods, salient features and applications of the Human Genome Project',
    'Outline DNA fingerprinting and its applications and ethical issues',
  ],
  slides: [
    sl('title', 'Regulation, genomes and fingerprints', {
      b: 'Part 2 — how genes are switched on and off, how the human genome was read, and how DNA identifies people.',
      v: flow('LR', [['r', 'Gene regulation (lac operon)'], ['h', 'Reading the genome (Human Genome Project)'], ['f', 'Using variation (DNA fingerprinting)']], [['r', 'h'], ['h', 'f']], 'Flow from gene regulation to the Human Genome Project to DNA fingerprinting'),
      n: 'Cells do not express every gene all the time. We start with how bacteria switch genes on when needed, then see how the complete human sequence was read, and finally how differences in that sequence can identify a person.',
    }),
    sl('concept', 'Levels of gene regulation', {
      b: 'In eukaryotes expression can be regulated at several levels; in bacteria, control of **transcription initiation** is the main one.',
      v: table(['Level', 'Example'], [['Transcription', 'Formation of the primary transcript'], ['Processing', 'Splicing of hnRNA'], ['Transport', 'mRNA moving from nucleus to cytoplasm'], ['Translation', 'Rate of protein synthesis']], 'Table of levels of regulation of gene expression'),
      n: 'A bacterium growing on glucose does not need the enzymes that break down lactose. Switching their genes on only when lactose is present saves energy. Such switches act mainly on the start of transcription.',
    }),
    sl('diagram', 'The lac operon', {
      b: 'Proposed by **Jacob and Monod**, the **lac operon** has a regulatory gene **i** (makes the **repressor**), the promoter **p**, the operator **o**, and structural genes **z** (β-galactosidase), **y** (permease) and **a** (transacetylase). **Lactose (allolactose)** is the **inducer**.',
      v: V.lac,
      n: 'Without lactose the repressor sits on the operator and blocks RNA polymerase. When lactose enters, it binds the repressor and changes its shape, so it falls off the operator. The three structural genes are then transcribed together as one polycistronic message. This is negative regulation.',
    }),
    sl('example', 'Worked example 1: predicting the lac operon', {
      b: 'Predict whether the structural genes are transcribed in each case.',
      v: table(['Situation', 'Repressor on operator?', 'z, y, a transcribed?'], [['Lactose absent', 'Yes', 'No'], ['Lactose present', 'No (inducer bound)', 'Yes'], ['Mutant i gene, no repressor made; no lactose', 'No', 'Yes, all the time'], ['Mutant operator that cannot bind repressor', 'No', 'Yes, all the time']], 'Worked table predicting lac operon activity'),
      ul: ['Ask one question each time: **is the repressor bound to the operator?** If yes, no transcription; if no, transcription.'],
      n: 'Every case comes down to one question: is the repressor sitting on the operator? If a mutation stops the repressor being made, or stops the operator holding it, the genes are always on, even without lactose.',
    }),
    sl('check', 'Quick check: inducer', {
      b: 'What acts as the inducer of the lac operon?',
      n: 'Quick check. Which sugar switches the operon on?',
      chk: 'lactose-mcq',
    }),
    sl('concept', 'Human Genome Project: goals and methods', {
      b: 'Launched in **1990** and completed in **2003**, the Human Genome Project aimed to identify all genes, determine the sequence of the **3 billion base pairs**, store the data, and address **ethical, legal and social issues (ELSI)**.',
      v: table(['Method', 'What it does'], [['Expressed sequence tags (ESTs)', 'Identify all genes that are expressed as RNA'], ['Sequence annotation', 'Sequence the whole genome, coding and non-coding, then assign functions'], ['Cloning in BAC and YAC vectors', 'Amplify DNA fragments for sequencing'], ['Automated sequencers (Sanger method)', 'Read the fragments'], ['Computer programs', 'Align overlapping fragments into the full sequence']], 'Table of the methods of the Human Genome Project'),
      n: 'Two approaches were used. One identified the genes that are expressed as RNA, using expressed sequence tags. The other, sequence annotation, read the whole genome and then worked out what each part does. Fragments cloned in bacteria and yeast were read by machines and joined by computers.',
    }),
    sl('concept', 'Salient features of the human genome', {
      b: `The human genome has about **${HGP_BP} million** nucleotide bases.`,
      v: table(['Feature', 'Finding'], [['Genes', 'About 30 000 (later estimates about 20 000)'], ['Average gene', 'About 3000 bases; largest, dystrophin, about 2.4 million'], ['Coding DNA', 'Less than 2 percent of the genome'], ['Repeated sequences', 'Make up a large part; no direct coding role'], ['Most and fewest genes', 'Chromosome 1 (2968); Y (231)'], ['Single nucleotide polymorphisms (SNPs)', 'About 1.4 million locations identified']], 'Table of salient features of the human genome'),
      n: 'Almost ninety nine percent of nucleotide bases are exactly the same in all people. Most of the genome does not code for proteins, and a large share consists of repeated sequences. The function of over half the discovered genes was not known when the project ended.',
    }),
    sl('example', 'Worked example 2: how much of the genome codes for protein?', {
      b: `If less than 2 percent of the ${HGP_BP} million base pairs code for proteins, at most how many million base pairs are coding?`,
      ul: [
        r`Coding $\le 0.02 \times ${HGP_BP} = ${CODING_MBP}$ million base pairs.`,
        `The remaining **more than 98 percent** includes introns, regulatory regions and repeats.`,
      ],
      v: table(['Part', 'Million bp'], [['Whole genome', String(HGP_BP)], ['Coding (at most)', String(CODING_MBP)]], `Worked table: at most ${CODING_MBP} million coding base pairs`),
      n: 'Two hundredths of about three thousand one hundred sixty five million is roughly sixty three million. So only a small fraction of our DNA directly codes for proteins; the rest has regulatory, structural or unknown roles.',
    }),
    sl('check', 'Quick check: ESTs', {
      b: 'What do expressed sequence tags identify?',
      n: 'Quick check. Expressed sequence tags find which genes?',
      chk: 'est-mcq',
    }),
    sl('concept', 'Applications of the Human Genome Project', {
      b: 'Knowing the sequence helps medicine and biology in many ways.',
      v: table(['Area', 'Use'], [['Diagnosis', 'Locating genes for disorders such as cystic fibrosis'], ['Treatment', 'Gene therapy and drugs designed for particular genes'], ['Evolution', 'Comparing human and other genomes'], ['Other genomes', 'Sequencing of bacteria, yeast, nematodes, fruit flies, rice and mouse followed']], 'Table of applications of the Human Genome Project'),
      n: 'The human sequence, together with those of model organisms, helps doctors find the genes behind disorders, guides new treatments, and lets biologists trace how genomes have changed over evolution.',
    }),
    sl('concept', 'DNA fingerprinting: the technique', {
      b: 'Developed by **Alec Jeffreys**, DNA fingerprinting compares **repetitive DNA**, especially **variable number tandem repeats (VNTRs)**, which differ in number between individuals. Repetitive DNA separates as **satellite DNA** in density-gradient centrifugation.',
      v: flow('LR', [['i', 'Isolate DNA'], ['d', 'Cut with restriction enzymes'], ['e', 'Gel electrophoresis'], ['b', 'Southern blotting to a membrane'], ['h', 'Hybridise with labelled VNTR probe'], ['a', 'Autoradiography: band pattern']], [['i', 'd'], ['d', 'e'], ['e', 'b'], ['b', 'h'], ['h', 'a']], 'Flow of the steps of DNA fingerprinting'),
      n: 'Because the number of repeats varies, the fragments cut out by restriction enzymes differ in size from person to person. After separation on a gel and transfer to a membrane, a labelled probe lights up the repeat-containing fragments as a pattern of bands unique to each individual, except identical twins.',
    }),
    sl('diagram', 'Reading a paternity gel', {
      b: `In this gel, the child has ${childFromM} bands matching the mother and ${childFromP} matching man P; man Q matches **${childFromQ}** of the child’s bands. Every band of a child must come from one parent or the other.`,
      v: V.gel,
      n: 'Cross off the bands the child shares with the mother. The remaining bands must have come from the biological father. Man P has all of them, while man Q has none, so man P is the father.',
    }),
    sl('concept', 'Applications and ethical issues', {
      b: 'DNA fingerprinting is powerful, so its use needs safeguards.',
      v: table(['Applications', 'Ethical issues'], [['Forensic identification of criminals from blood, hair or semen', 'Privacy of genetic data'], ['Paternity and maternity disputes', 'Consent before samples are taken'], ['Identifying disaster victims', 'Possible misuse or discrimination by employers or insurers'], ['Studying population diversity and evolution', 'Secure storage and controlled access to databases']], 'Table of applications and ethical issues of DNA fingerprinting'),
      n: 'The same technique that frees an innocent suspect could reveal private family or health information. Laws on consent, privacy and secure storage of genetic data are needed so that people are protected from misuse and discrimination.',
    }),
    sl('check', 'Quick check: VNTRs', {
      b: 'Judge the assertion and the reason about DNA fingerprints.',
      n: 'Quick check. What differs between people in a tandem repeat?',
      chk: 'vntr-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'lac operon (Jacob and Monod): i, p, o, z, y, a; repressor blocks operator; lactose (inducer) inactivates repressor; negative regulation.',
        'Human Genome Project (1990–2003): ESTs and sequence annotation; BAC/YAC cloning; automated sequencing.',
        `Features: ${HGP_BP} million bp; about 30 000 genes; under 2 percent coding; chromosome 1 most genes, Y fewest; 1.4 million SNPs.`,
        'DNA fingerprinting (Jeffreys): VNTRs; restriction digestion, electrophoresis, Southern blotting, probe, autoradiography.',
        'Uses: forensics, paternity, identification; ethical issues: privacy, consent, misuse.',
      ],
      v: table(['Topic', 'Key word'], [['lac operon', 'Inducer'], ['Human Genome Project', 'Sequence annotation'], ['DNA fingerprinting', 'VNTR']], 'Summary table of key words'),
      n: 'To recap: the lac operon shows how an inducer switches genes on. The Human Genome Project read our whole sequence and found that little of it codes for protein. DNA fingerprinting uses repeat differences to identify people, and must be used ethically.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Draw the **lac operon** both **off and on**, labelling i, p, o, z, y, a.',
        'Distinguish **ESTs** from **sequence annotation**.',
        'List the fingerprinting steps **in order**.',
        'In gel questions, **remove maternal bands first**, then match the rest.',
      ],
      n: 'Exam tips. Draw the operon in both states and label every part. Learn the two methods of the genome project. Put the fingerprinting steps in order. And in a gel problem, cross off the mother’s bands before looking for the father.',
    }),
  ],
});
