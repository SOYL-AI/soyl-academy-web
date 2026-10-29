// ch05 Molecular Basis of Inheritance — three decks: Part 1 (t01–t02), Part 2 (t03–t04), Part 3 (t05–t06).
import { sl, deck, table, flow, svgV, r } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { LADDER, NUCLEOSOME, MESELSON, FORK, TRUNIT, LAC, GEL } from './svgs.mjs';
import { chargaff, lengthM, meselson, transcribe, translate } from './calc.mjs';

export const V = {
  ladder: svgV(LADDER, 'Untwisted double-stranded DNA with antiparallel strands, complementary base pairs and hydrogen bonds'),
  nucleosome: svgV(NUCLEOSOME, 'Nucleosomes: DNA wrapped around histone octamers, with H1 on linker DNA, like beads on a string'),
  meselson: svgV(MESELSON, 'Bands of heavy, hybrid and light DNA after zero, one and two generations in the Meselson–Stahl experiment'),
  fork: svgV(FORK, 'Replication fork with a continuous leading strand and a lagging strand made as Okazaki fragments joined by ligase'),
  trunit: svgV(TRUNIT, 'Transcription unit with promoter, structural gene and terminator, coding and template strands'),
  lac: svgV(LAC, 'The lac operon switched off by the repressor and switched on when the inducer inactivates the repressor'),
  gel: svgV(GEL, 'DNA fingerprint gel comparing a mother, a child and two men'),
};

// ---------------------------------------------------------------- computed numbers
const CH = chargaff('A', 20);
const HB = 4 * 2 + 6 * 3;
const HUMAN_M = Math.round(lengthM(6.6e9) * 10) / 10;
const ECOLI_MM = Math.round(lengthM(4.6e6) * 1e3 * 100) / 100;
const MS = [1, 2, 3, 4].map((n) => [n, meselson(n)]);
const TEMPLATE = 'TACAAACCGTTTATC';
const MRNA = transcribe(TEMPLATE);
const PEP = translate(MRNA);
const CODING = 3164.7e6 * 0.02;
const DIFF = 3164.7e6 * 0.001;

export const deck1 = deck({
  part: 1,
  title: 'Molecular Basis of Inheritance — Part 1: DNA, the genetic material',
  goals: [
    'Describe the structure of a polynucleotide and of the DNA double helix',
    'Explain how DNA is packaged in prokaryotes and eukaryotes',
    'Explain the experiments of Griffith, Avery and colleagues, and Hershey and Chase',
    'Compare DNA and RNA as genetic material',
  ],
  slides: [
    sl('title', 'Molecular Basis of Inheritance', {
      b: 'Part 1 — what Mendel’s “factors” are made of: the structure of DNA, how it is packed, and how scientists proved it is the genetic material.',
      v: flow('LR', [['g', 'Gene'], ['d', 'DNA sequence'], ['r', 'RNA copy'], ['p', 'Protein'], ['t', 'Trait']], [['g', 'd'], ['d', 'r'], ['r', 'p'], ['p', 't']], 'Flow from gene to DNA sequence, RNA, protein and trait'),
      n: 'In the last chapter we treated genes as abstract factors. Now we look at what they are made of. Genes are stretches of DNA, a long molecule that stores information in its sequence of bases. We will see its structure, how metres of it fit into a tiny nucleus, and the clever experiments that proved DNA is the genetic material.',
    }),
    sl('concept', 'DNA sizes', {
      b: 'DNA is a long polymer of **deoxyribonucleotides**. Its length is usually given as the number of nucleotides, or **base pairs (bp)** for double-stranded DNA.',
      v: table(['Organism', 'Genome size'], [['Bacteriophage φX174', '5386 nucleotides'], ['Bacteriophage lambda', '48 502 bp'], ['Escherichia coli', '4.6 × 10⁶ bp'], ['Human (haploid)', '3.3 × 10⁹ bp']], 'Table of genome sizes of two bacteriophages, E. coli and humans'),
      n: 'Genomes vary enormously in size. A small virus has a few thousand nucleotides, the bacterium E. coli has about four point six million base pairs, and a human haploid set has about three point three billion. Every one of these is copied and read by the same basic chemistry.',
    }),
    sl('concept', 'Building a polynucleotide', {
      b: 'A **nucleotide** = nitrogenous base + pentose sugar + phosphate. Base + sugar (joined by an **N-glycosidic** linkage) = **nucleoside**. A phosphate on the 5′ carbon makes a nucleotide. Nucleotides join by **3′–5′ phosphodiester** linkages, giving a strand with a free **5′ phosphate** end and a free **3′ OH** end.',
      v: table(['Component', 'In DNA', 'In RNA'], [['Sugar', 'Deoxyribose', 'Ribose (extra 2′ OH)'], ['Purines', 'Adenine, guanine', 'Adenine, guanine'], ['Pyrimidines', 'Cytosine, thymine', 'Cytosine, uracil'], ['Thymine', '5-methyl uracil', 'Absent']], 'Table comparing the sugars and bases of DNA and RNA'),
      n: 'Think of a necklace. Each bead is a nucleotide: a sugar with a base attached on one side and a phosphate on the other. The phosphate of one nucleotide links to the sugar of the next, forming a sugar-phosphate backbone, with the bases sticking out. One end of the chain is called five prime, the other three prime.',
    }),
    sl('diagram', 'The double helix', {
      b: 'Two polynucleotide chains run **antiparallel**. Bases pair inside: **A with T** (two hydrogen bonds) and **G with C** (three). A purine always faces a pyrimidine, so the distance between the strands stays constant.',
      v: V.ladder,
      n: 'Here the helix is drawn untwisted, like a ladder. The rails are the sugar-phosphate backbones; the rungs are base pairs. Notice that one strand runs five prime to three prime from left to right, and the other the opposite way. Given one strand, you can always write the other, because pairing is complementary.',
    }),
    sl('concept', 'Watson and Crick’s model', {
      b: 'In **1953** Watson and Crick proposed the double helix, using **X-ray diffraction** data from **Maurice Wilkins** and **Rosalind Franklin**, and **Chargaff’s rule** that in double-stranded DNA A = T and G = C.',
      v: table(['Feature', 'Value'], [['Turn of the helix', 'Right-handed'], ['Pitch', '3.4 nm'], ['Base pairs per turn', 'About 10'], ['Distance between base pairs', '0.34 nm'], ['Pairing', 'A=T (2 H-bonds), G≡C (3 H-bonds)']], 'Table of the dimensions and features of the Watson–Crick double helix'),
      n: 'The model fitted all the evidence. Franklin’s X-ray photographs showed a helix with regular repeats. Chargaff had found that adenine always equals thymine and guanine equals cytosine. Watson and Crick realised that complementary base pairing explains both, and also suggests how DNA could be copied.',
    }),
    sl('example', 'Worked example 1: Chargaff’s rule', {
      b: 'A double-stranded DNA sample has 20 percent adenine. Find the percentages of the other bases. How many hydrogen bonds hold together a 10 bp stretch with 4 A–T and 6 G–C pairs?',
      ul: [
        `Step 1 — A = T, so T = ${CH.T} percent; A + T = ${CH.A + CH.T} percent.`,
        `Step 2 — G + C = 100 − ${CH.A + CH.T} = ${CH.G + CH.C} percent, and G = C, so each is ${CH.G} percent.`,
        r`Step 3 — Hydrogen bonds $= 4 \times 2 + 6 \times 3 = ${HB}$.`,
      ],
      v: table(['Base', 'Percentage'], Object.entries(CH).map(([b, p]) => [b, String(p)]), `Worked table: A ${CH.A}, T ${CH.T}, G ${CH.G}, C ${CH.C} percent`),
      n: 'Use the pairing rule twice. Adenine equals thymine, so both are twenty percent, making forty together. The remaining sixty percent is shared equally by guanine and cytosine, thirty each. For hydrogen bonds, count two for each A–T pair and three for each G–C pair: eight plus eighteen is twenty-six.',
    }),
    sl('check', 'Quick check: Chargaff', {
      b: 'In a double-stranded DNA, cytosine is 18 percent. What is the percentage of adenine?',
      n: 'Quick check. Pair the bases first, then share out what is left.',
      chk: 'chargaff-mcq',
    }),
    sl('example', 'Worked example 2: how long is the DNA?', {
      b: 'The distance between adjacent base pairs is 0.34 nm. Find the length of the DNA in a human diploid cell (6.6 × 10⁹ bp) and in E. coli (4.6 × 10⁶ bp).',
      ul: [
        r`Step 1 — Human: $6.6 \times 10^{9} \times 0.34 \times 10^{-9}\ \text{m} \approx ${HUMAN_M}\ \text{m}$.`,
        r`Step 2 — E. coli: $4.6 \times 10^{6} \times 0.34 \times 10^{-9}\ \text{m} \approx ${ECOLI_MM}\ \text{mm}$.`,
        'Conclusion — about two metres of DNA must fit into a nucleus a few micrometres across; it must be packed very tightly.',
      ],
      v: table(['DNA', 'Base pairs', 'Length'], [['Human diploid cell', '6.6 × 10⁹', `about ${HUMAN_M} m`], ['E. coli', '4.6 × 10⁶', `about ${ECOLI_MM} mm`]], `Worked table: human DNA about ${HUMAN_M} metres, E. coli DNA about ${ECOLI_MM} millimetres`),
      n: 'Multiply the number of base pairs by the length of one, zero point three four nanometres. For a human diploid cell this gives about two point two metres of DNA, in a nucleus only a few micrometres wide. For E. coli it is about one point five six millimetres. Packing is clearly essential.',
    }),
    sl('concept', 'Packaging DNA', {
      b: 'In **prokaryotes**, negatively charged DNA is held in large loops by positively charged proteins in a region called the **nucleoid**. In **eukaryotes**, DNA wraps around **histones**, proteins rich in the basic amino acids **lysine and arginine**, which carry positive charges.',
      v: table(['', 'Prokaryotes', 'Eukaryotes'], [['Where', 'Nucleoid (no nuclear membrane)', 'Nucleus'], ['Proteins', 'Positively charged proteins', 'Histones (lysine, arginine) and non-histone chromosomal proteins'], ['Unit', 'Loops', 'Nucleosome']], 'Table comparing DNA packaging in prokaryotes and eukaryotes'),
      n: 'DNA is negatively charged because of its phosphate groups. Positively charged proteins attract it and help fold it. In eukaryotes, eight histone molecules form a core called the histone octamer, and the DNA winds around it. This makes a structure called a nucleosome.',
    }),
    sl('diagram', 'Nucleosomes', {
      b: 'A **nucleosome** has about **200 bp** of DNA wrapped around a **histone octamer**. Repeating nucleosomes form a **"beads-on-string"** chromatin fibre, which coils further and condenses into **chromosomes** at metaphase.',
      v: V.nucleosome,
      n: 'Under an electron microscope, chromatin looks like beads on a string. Each bead is a nucleosome, and the string is linker DNA. The fibre then coils and loops into higher-order structures with the help of non-histone proteins, condensing most at metaphase, when chromosomes are easiest to see.',
    }),
    sl('concept', 'Euchromatin and heterochromatin', {
      b: 'Chromatin is not packed uniformly in the nucleus.',
      v: table(['', 'Euchromatin', 'Heterochromatin'], [['Packing', 'Loose', 'Dense'], ['Staining', 'Light', 'Dark'], ['Activity', 'Transcriptionally active', 'Inactive']], 'Table comparing euchromatin and heterochromatin'),
      n: 'Some regions are loosely packed and stain lightly; these are euchromatin, where genes are being read. Other regions are densely packed and stain darkly; this is heterochromatin, which is largely inactive. Packing therefore also helps control which genes are used.',
    }),
    sl('check', 'Quick check: active chromatin', {
      b: 'Which kind of chromatin is loosely packed and transcriptionally active?',
      n: 'Quick check. Remember: loose packing makes genes easier to read.',
      chk: 'euchromatin-mcq',
    }),
    sl('concept', 'Griffith’s transforming principle (1928)', {
      b: '**Frederick Griffith** worked with *Streptococcus pneumoniae*: the **S strain** (smooth, with a capsule) kills mice; the **R strain** (rough, no capsule) does not.',
      v: table(['Injected into mice', 'Result'], [['Live S strain', 'Mice die'], ['Live R strain', 'Mice live'], ['Heat-killed S strain', 'Mice live'], ['Heat-killed S + live R', 'Mice die; live S bacteria recovered']], 'Table of Griffith’s four injections and their results'),
      n: 'The last result was the surprise. Neither heat-killed S bacteria nor live R bacteria could kill mice on their own, but together they did, and living S bacteria appeared in the dead mice. Something from the dead S cells had transformed the harmless R cells. Griffith called it the transforming principle, but he did not know what it was.',
    }),
    sl('concept', 'Avery, MacLeod and McCarty; Hershey and Chase', {
      b: '**Avery, MacLeod and McCarty** purified the components of heat-killed S cells: only **DNA** transformed R cells; proteases and RNase did not stop transformation, but **DNase** did. **Hershey and Chase (1952)** grew bacteriophages with radioactive **³²P** (labels DNA) or **³⁵S** (labels protein): only ³²P entered the bacteria.',
      v: flow('TB', [['p', 'Phage labelled with ³²P (DNA)'], ['s', 'Phage labelled with ³⁵S (protein)'], ['i', 'Infect bacteria; blend; centrifuge'], ['b1', 'Bacteria radioactive: DNA entered'], ['b2', 'Bacteria not radioactive: protein stayed outside'], ['c', 'DNA is the genetic material']], [['p', 'i'], ['s', 'i'], ['i', 'b1', '³²P'], ['i', 'b2', '³⁵S'], ['b1', 'c'], ['b2', 'c']], 'Flow of the Hershey–Chase experiment showing that radioactive phosphorus, not sulphur, entered bacteria'),
      n: 'Avery’s group showed that destroying DNA, but not protein or RNA, stopped transformation. Hershey and Chase used a neat trick: DNA contains phosphorus but no sulphur, and protein coats contain sulphur but no phosphorus. After infection, the bacteria carried radioactive phosphorus, not sulphur. So only the DNA had entered and directed new viruses.',
    }),
    sl('concept', 'Properties of genetic material; DNA versus RNA', {
      b: 'Genetic material must **replicate**, be **chemically and structurally stable**, allow **slow changes (mutation)** for evolution, and **express** itself as characters. Both nucleic acids can direct their duplication, but DNA is better for storage.',
      v: table(['Property', 'DNA', 'RNA'], [['Stability', 'More stable: no reactive 2′ OH; thymine instead of uracil', 'Less stable; 2′ OH makes it reactive and easily degraded'], ['Mutation', 'Slow', 'Fast (RNA viruses mutate and evolve quickly)'], ['Expression', 'Needs RNA to make proteins', 'Can directly code for proteins; some RNAs are catalysts'], ['Role today', 'Genetic material of most organisms', 'Genetic material of some viruses (for example TMV, QB bacteriophage)']], 'Table comparing DNA and RNA as genetic material'),
      n: 'RNA was probably the first genetic material, because it can both store information and act as a catalyst. But its extra hydroxyl group makes it reactive and less stable. DNA, with its double strands and thymine, is more stable and mutates more slowly, so it took over as the main store of genetic information, while RNA became the messenger.',
    }),
    sl('check', 'Quick check: Hershey and Chase', {
      b: 'Judge the assertion and the reason about the Hershey–Chase experiment.',
      n: 'Quick check. Which element is found in DNA but not in protein?',
      chk: 'hershey-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Nucleotide = base + sugar + phosphate; phosphodiester linkages; 5′ and 3′ ends; purines A, G; pyrimidines C, T (DNA), U (RNA).',
        'Double helix (Watson and Crick, 1953): antiparallel strands; A=T, G≡C; pitch 3.4 nm; about 10 bp per turn; 0.34 nm per bp.',
        'Packaging: nucleoid in prokaryotes; nucleosomes (about 200 bp around a histone octamer) in eukaryotes; euchromatin active, heterochromatin inactive.',
        'Griffith: transformation; Avery, MacLeod, McCarty: DNA transforms; Hershey–Chase: ³²P (DNA) enters bacteria.',
        'DNA is more stable than RNA; RNA was probably the first genetic material.',
      ],
      v: table(['Experiment', 'Conclusion'], [['Griffith (1928)', 'A transforming principle exists'], ['Avery, MacLeod, McCarty', 'The transforming principle is DNA'], ['Hershey and Chase (1952)', 'DNA, not protein, enters and directs the cell']], 'Summary table of three experiments and their conclusions'),
      n: 'To recap: DNA is a double helix of antiparallel strands held by complementary base pairs. Metres of it are packed into nucleosomes and chromatin. A chain of experiments, from Griffith to Hershey and Chase, proved that DNA is the genetic material, and its stability makes it better suited than RNA for storing information.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Use Chargaff: **A = T, G = C** only for **double-stranded** DNA.',
        'Give the **double-helix numbers** exactly: 3.4 nm, 10 bp, 0.34 nm.',
        'For Hershey–Chase, explain **why** ³²P and ³⁵S label DNA and protein.',
        'Write **euchromatin = active**, **heterochromatin = inactive**.',
      ],
      n: 'Exam tips. Apply Chargaff’s rule only to double-stranded DNA. Learn the helix dimensions. In the Hershey and Chase experiment, explain why phosphorus labels DNA and sulphur labels protein. And remember which chromatin is active.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Molecular Basis of Inheritance — Part 2: Replication, transcription and translation',
  goals: [
    'Explain semi-conservative replication and the Meselson–Stahl experiment',
    'Describe the replication fork, leading and lagging strands',
    'Describe transcription in bacteria and eukaryotes, including RNA processing',
    'State the features of the genetic code and explain translation',
  ],
  slides: [
    sl('title', 'From DNA to protein', {
      b: 'Part 2 — how DNA is copied, how its message is transcribed into RNA, and how RNA is translated into protein.',
      v: flow('LR', [['d', 'DNA'], ['d2', 'DNA (replication)'], ['r', 'RNA (transcription)'], ['p', 'Protein (translation)']], [['d', 'd2'], ['d', 'r'], ['r', 'p']], 'Flow of the central dogma: DNA replicates, is transcribed into RNA and translated into protein'),
      n: 'The central dogma, proposed by Francis Crick, says that genetic information flows from DNA to RNA to protein. DNA copies itself in replication, its message is copied into RNA in transcription, and the RNA message is decoded into protein in translation. In some viruses, information flows from RNA back to DNA, called reverse transcription.',
    }),
    sl('concept', 'Semi-conservative replication', {
      b: 'Watson and Crick proposed that the two strands **separate** and each acts as a **template** for a new complementary strand. Each daughter molecule then has **one parental and one new strand**: **semi-conservative** replication.',
      v: flow('LR', [['p', 'Parent double helix'], ['s', 'Strands separate'], ['t', 'Each strand is a template'], ['d', 'Two daughter molecules: one old + one new strand each']], [['p', 's'], ['s', 't'], ['t', 'd']], 'Flow of semi-conservative replication from parent helix to two daughters each with one old and one new strand'),
      n: 'Complementary pairing suggests a simple copying method. Unzip the two strands, and use each as a guide to build a new partner. The two daughter molecules are identical to the parent, and each keeps one of the original strands. That is what semi-conservative means: half conserved, half new.',
    }),
    sl('diagram', 'The Meselson–Stahl experiment (1958)', {
      b: 'E. coli was grown for many generations in **¹⁵NH₄Cl** (heavy nitrogen), then transferred to normal **¹⁴N** medium. DNA was separated by density in a **caesium chloride (CsCl) gradient**.',
      v: V.meselson,
      n: 'Heavy and light DNA settle at different levels in a caesium chloride gradient. After one generation in light medium, all the DNA was of intermediate, hybrid density. After two generations there were equal amounts of hybrid and light DNA. Exactly as semi-conservative replication predicts.',
    }),
    sl('example', 'Worked example 1: predicting the bands', {
      b: 'Using semi-conservative replication, predict the fractions of hybrid and light DNA after 1, 2, 3 and 4 generations in ¹⁴N medium.',
      ul: [
        r`Rule — the two original heavy strands always end up in exactly 2 molecules; after $n$ generations there are $2^n$ molecules.`,
        r`So hybrid fraction $= \dfrac{2}{2^n}$, and light fraction $= 1 - \dfrac{2}{2^n}$.`,
        ...MS.map(([n, f]) => `Generation ${n}: hybrid ${f.hybrid * 100} percent, light ${f.light * 100} percent.`),
      ],
      v: table(['Generation', 'Hybrid', 'Light'], MS.map(([n, f]) => [String(n), `${f.hybrid * 100}%`, `${f.light * 100}%`]), 'Worked table of hybrid and light DNA percentages after one to four generations'),
      n: 'The two heavy strands from the start are never destroyed; each sits in a separate molecule paired with a light strand. After n generations there are two to the power n molecules, but still only two hybrids. So after three generations a quarter is hybrid, and after four, one eighth.',
    }),
    sl('check', 'Quick check: two generations', {
      b: 'After two generations in ¹⁴N medium, what does semi-conservative replication predict?',
      n: 'Quick check. Use the rule: two hybrids among all the molecules.',
      chk: 'ms-mcq',
    }),
    sl('diagram', 'The replication fork', {
      b: 'DNA polymerase can add nucleotides only in the **5′ → 3′** direction. At a **replication fork**, one strand (**leading**) is made **continuously**; the other (**lagging**) is made **discontinuously** as **Okazaki fragments**, later joined by **DNA ligase**.',
      v: V.fork,
      n: 'Because the polymerase builds only in one direction, the two new strands are made differently. The leading strand grows smoothly towards the fork. The lagging strand is made in short pieces, called Okazaki fragments, each starting near the fork and growing away from it. DNA ligase seals the pieces into one strand.',
    }),
    sl('concept', 'The replication machinery', {
      b: 'Replication needs a set of enzymes and energy, and starts at definite points.',
      v: table(['Requirement', 'Role'], [['DNA-dependent DNA polymerase', 'Main enzyme; very fast and accurate (E. coli copies 4.6 × 10⁶ bp in about 18 minutes, roughly 2000 bp per second)'], ['Deoxyribonucleoside triphosphates', 'Act as substrates and provide energy for polymerisation'], ['Origin of replication', 'Definite region where replication starts; a plasmid or vector needs one to be copied'], ['DNA ligase', 'Joins Okazaki fragments'], ['Timing', 'In eukaryotes, during the S phase of the cell cycle']], 'Table of requirements for DNA replication and their roles'),
      n: 'DNA polymerase works astonishingly fast and makes very few mistakes. The building blocks, deoxyribonucleoside triphosphates, do double duty: they are both the raw material and the energy source. Replication starts at specific origins, which is why any DNA we want a cell to copy must carry one.',
    }),
    sl('diagram', 'Transcription', {
      b: 'A **transcription unit** has a **promoter**, a **structural gene** and a **terminator**. Only **one strand**, the **template strand** (3′ → 5′), is copied; the other, the **coding strand** (5′ → 3′), has the same sequence as the RNA except **T in place of U**.',
      v: V.trunit,
      n: 'If both strands were transcribed, the two RNAs would be complementary and would stick together, and one gene would code for two different proteins. So only one strand is read. The promoter, upstream, is where RNA polymerase binds; the terminator, downstream, is where transcription stops. By convention, sequences are written using the coding strand.',
    }),
    sl('concept', 'Transcription in bacteria and in eukaryotes', {
      b: 'Bacteria have **one RNA polymerase**; eukaryotes have **three** in the nucleus, and their primary transcripts are processed.',
      v: table(['', 'Bacteria', 'Eukaryotes'], [['RNA polymerases', 'One; σ factor for initiation, ρ factor for termination', 'I: rRNAs (28S, 18S, 5.8S); II: hnRNA, the precursor of mRNA; III: tRNA, 5S rRNA, snRNAs'], ['Processing', 'None needed; translation can begin before transcription ends', 'Splicing removes introns and joins exons; capping adds methyl guanosine triphosphate at 5′; tailing adds 200–300 adenylates at 3′'], ['Gene structure', 'Continuous', 'Split genes: exons and introns']], 'Table comparing transcription in bacteria and eukaryotes'),
      n: 'Eukaryotic genes are split: coding exons are interrupted by non-coding introns. The first transcript, heterogeneous nuclear RNA, contains both. Splicing cuts out the introns and joins the exons. A cap is added at the five prime end and a poly-A tail at the three prime end. Only then is the mature messenger RNA sent out to the cytoplasm.',
    }),
    sl('check', 'Quick check: RNA polymerase II', {
      b: 'In eukaryotes, which RNA polymerase transcribes the precursor of mRNA?',
      n: 'Quick check. Recall the job of each of the three polymerases.',
      chk: 'pol2-mcq',
    }),
    sl('concept', 'The genetic code', {
      b: 'George Gamow argued that with 4 bases and 20 amino acids, the code should be a **triplet** (4³ = 64 combinations). Har Gobind **Khorana** made RNAs of known sequence, and Marshall **Nirenberg** used a cell-free system to decode them.',
      v: table(['Feature', 'Meaning'], [['Triplet', '64 codons: 61 code for amino acids, 3 are stop codons (UAA, UAG, UGA)'], ['Unambiguous and specific', 'One codon codes for only one amino acid'], ['Degenerate', 'Some amino acids have more than one codon'], ['Read contiguously', 'No punctuation between codons'], ['Nearly universal', 'Same from bacteria to humans, with a few exceptions'], ['AUG has two roles', 'Codes for methionine and acts as the start codon']], 'Table of features of the genetic code'),
      n: 'A doublet code would give only sixteen words, too few for twenty amino acids, so the code must use triplets, giving sixty-four. Sixty-one codons specify amino acids and three mean stop. The code is read without commas, each codon means only one amino acid, many amino acids have several codons, and the same code is used almost everywhere in life.',
    }),
    sl('example', 'Worked example 2: from template to protein', {
      b: `A template strand reads 3′–${TEMPLATE}–5′. Write the mRNA and the amino acid sequence it codes for.`,
      ul: [
        `Step 1 — mRNA is complementary to the template, with U for T: 5′–${MRNA}–3′.`,
        `Step 2 — Read codons from AUG: ${MRNA.match(/.{3}/g).join(' ')}.`,
        `Step 3 — Translate: ${PEP.join('–')}, then the stop codon ends the chain.`,
      ],
      v: table(['Codon', ...MRNA.match(/.{3}/g)], [['Amino acid', ...PEP, 'Stop']], `Worked table: codons ${MRNA.match(/.{3}/g).join(', ')} give ${PEP.join(', ')} and stop`),
      n: 'First write the messenger RNA, pairing each template base with its partner and using U instead of T. Then split the message into triplets, starting at the start codon, and look up each codon. The final triplet is a stop codon, so translation ends there. The result is a short chain of four amino acids beginning with methionine.',
    }),
    sl('concept', 'Mutations and the reading frame', {
      b: 'Because codons are read contiguously, the effect of a mutation depends on how many bases change.',
      v: table(['Change', 'Effect on the reading frame'], [['Substitution of one base (point mutation)', 'Changes one codon; may change one amino acid (sickle-cell: GAG → GUG, Glu → Val)'], ['Insertion or deletion of one or two bases', 'Frameshift: every codon after the change is misread'], ['Insertion or deletion of three bases', 'One amino acid added or removed; the frame after it is restored']], 'Table of the effects of substitution, frameshift and three-base mutations'),
      n: 'Think of a sentence made of three-letter words. Change one letter, and one word changes. Add or remove one letter, and every word after it becomes nonsense; that is a frameshift. Add or remove three letters, and you gain or lose one word, but the rest still reads correctly. Experiments like this confirmed that the code is a triplet read without gaps.',
    }),
    sl('concept', 'tRNA, the adapter', {
      b: '**tRNA** links codons to amino acids. It has an **anticodon** loop that pairs with a codon and an **amino acid acceptor end**. Its secondary structure looks like a **clover leaf**; in three dimensions, an **inverted L**.',
      v: table(['Feature', 'Detail'], [['Specificity', 'A specific tRNA for each amino acid'], ['Initiator tRNA', 'A special tRNA carries methionine to start translation'], ['Stop codons', 'No tRNA exists for them'], ['Charging', 'Amino acids are activated with ATP and linked to their tRNA (aminoacylation)']], 'Table of features of tRNA'),
      n: 'An amino acid cannot recognise a codon by itself, so tRNA acts as an adapter. One end carries a specific amino acid; the other end has an anticodon that pairs with the matching codon on the messenger RNA. There is no tRNA for the stop codons, which is why they end translation.',
    }),
    sl('concept', 'Translation', {
      b: 'Translation is the polymerisation of amino acids into a polypeptide, in the order set by the mRNA codons, on **ribosomes**.',
      v: flow('TB', [['c', 'Charging: amino acid + tRNA (ATP)'], ['i', 'Initiation: small ribosome subunit meets mRNA; start codon AUG; large subunit joins'], ['e', 'Elongation: charged tRNAs bind codon by codon; peptide bonds form'], ['t', 'Termination: a release factor binds the stop codon; polypeptide released']], [['c', 'i'], ['i', 'e'], ['e', 't']], 'Flow of translation: charging, initiation at AUG, elongation and termination at a stop codon'),
      n: 'The ribosome has two subunits that come together on the messenger RNA at the start codon. Charged tRNAs arrive one by one, pairing with each codon, and the ribosome links their amino acids with peptide bonds. In bacteria, a ribosomal RNA, the twenty-three S rRNA, catalyses this bond, so it is a ribozyme. At a stop codon, a release factor frees the finished chain. Untranslated regions at each end help translation work efficiently.',
    }),
    sl('check', 'Quick check: a ribozyme', {
      b: 'Judge the assertion and the reason about the ribosome.',
      n: 'Quick check. Which molecule in the ribosome forms peptide bonds in bacteria?',
      chk: 'ribozyme-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Replication is semi-conservative (Meselson and Stahl, ¹⁵N/¹⁴N, CsCl gradient); DNA polymerase works 5′ → 3′; leading strand continuous, lagging strand as Okazaki fragments joined by ligase.',
        'Transcription unit: promoter, structural gene, terminator; template 3′ → 5′; RNA made 5′ → 3′.',
        'Bacteria: one RNA polymerase (σ, ρ). Eukaryotes: pol I (rRNAs), II (hnRNA), III (tRNA, 5S rRNA, snRNA); splicing, capping, tailing.',
        'Code: triplet, 61 sense + 3 stop codons, unambiguous, degenerate, contiguous, nearly universal; AUG = Met and start.',
        'Translation: charging, initiation, elongation (23S rRNA is a ribozyme in bacteria), termination by a release factor.',
      ],
      v: table(['Process', 'Template', 'Product'], [['Replication', 'Both DNA strands', 'Two DNA molecules'], ['Transcription', 'Template strand of a gene', 'RNA'], ['Translation', 'mRNA', 'Polypeptide']], 'Summary table of replication, transcription and translation'),
      n: 'To recap: DNA copies itself semi-conservatively, with leading and lagging strands. Genes are transcribed from one strand into RNA, which in eukaryotes is spliced, capped and tailed. The triplet code is read by tRNAs on ribosomes to build proteins, from a start codon to a stop codon.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'When writing mRNA from DNA, check **which strand** you are given; mRNA matches the **coding** strand (U for T).',
        'Explain **why** the lagging strand is discontinuous: polymerase works only **5′ → 3′**.',
        'List the **three eukaryotic RNA polymerases** with products.',
        'Give **features of the code** with examples (UAA, UAG, UGA; AUG).',
      ],
      n: 'Exam tips. Always check whether a question gives the template or the coding strand. Explain the lagging strand using the five prime to three prime rule. Learn the three RNA polymerases. And quote the stop codons and the start codon when describing the genetic code.',
    }),
  ],
});

export const deck3 = deck({
  part: 3,
  title: 'Molecular Basis of Inheritance — Part 3: Gene regulation, the Human Genome Project and DNA fingerprinting',
  goals: [
    'Explain how the lac operon is switched off and on',
    'State the goals, methods and main findings of the Human Genome Project',
    'Explain the principle, steps and uses of DNA fingerprinting',
  ],
  slides: [
    sl('title', 'Regulation, genomes and fingerprints', {
      b: 'Part 3 — how cells switch genes on and off, what we learned by reading the whole human genome, and how DNA can identify a person.',
      v: flow('LR', [['r', 'Gene regulation (lac operon)'], ['h', 'Human Genome Project'], ['f', 'DNA fingerprinting']], [['r', 'h'], ['h', 'f']], 'Flow of topics in Part 3'),
      n: 'Every cell carries the full set of genes, yet a cell does not use them all at once. In this part we see how a bacterium switches a set of genes on only when it needs them. Then we look at the huge project that read the human genome, and at DNA fingerprinting, which uses differences in our DNA to identify individuals.',
    }),
    sl('concept', 'Levels of gene regulation', {
      b: 'Gene expression can be regulated at several levels in eukaryotes; in **prokaryotes**, control is mainly at the **initiation of transcription**.',
      v: table(['Level', 'Example of control'], [['Transcription', 'Whether the primary transcript is made'], ['Processing', 'Splicing of the transcript'], ['Transport', 'Movement of mRNA from nucleus to cytoplasm'], ['Translation', 'Whether and how fast the mRNA is translated']], 'Table of four levels of regulation of gene expression'),
      n: 'A cell can control a gene at many points: making the RNA, processing it, moving it out of the nucleus, or translating it. Bacteria mostly decide at the very first step: whether RNA polymerase is allowed to start transcribing. The best-known example is the lac operon of E. coli, which handles the sugar lactose.',
    }),
    sl('diagram', 'The lac operon', {
      b: 'An **operon** is a set of genes controlled together. The **lac operon** (Jacob and Monod) has a regulatory gene **i**, a **promoter**, an **operator** and three structural genes: **z** (β-galactosidase), **y** (permease) and **a** (transacetylase).',
      v: V.lac,
      n: 'The regulatory gene i makes a repressor protein all the time. With no lactose, the repressor sits on the operator and blocks RNA polymerase, so the structural genes stay silent. When lactose is present, it acts as the inducer: it binds the repressor and changes its shape so it falls off the operator, and transcription begins.',
    }),
    sl('concept', 'How the switch works', {
      b: 'The lac operon is under **negative regulation**: the repressor switches it **off**; the **inducer** (lactose) switches it **on** by inactivating the repressor.',
      v: flow('TB', [['n', 'No lactose: repressor binds operator'], ['x', 'RNA polymerase blocked: no enzymes made'], ['l', 'Lactose enters (permease)'], ['b', 'Inducer binds repressor; repressor leaves operator'], ['t', 'z, y, a transcribed: enzymes break down lactose'], ['e', 'Lactose used up: repressor binds again']], [['n', 'x'], ['l', 'b'], ['b', 't'], ['t', 'e'], ['e', 'n']], 'Flow of lac operon regulation from off to on and back to off'),
      n: 'This is an elegant economy. The cell makes the lactose-digesting enzymes only when lactose is present. A small amount of permease lets some lactose in, which switches the operon on. When all the lactose has been broken down, the repressor is free again, binds the operator and switches the genes off.',
    }),
    sl('check', 'Quick check: the inducer', {
      b: 'What switches on the lac operon?',
      n: 'Quick check. Which molecule removes the repressor from the operator?',
      chk: 'inducer-mcq',
    }),
    sl('example', 'Worked example 1: predicting mutants', {
      b: 'Predict whether β-galactosidase is made, with and without lactose, in three mutant bacteria.',
      ul: [
        'Mutant 1 — the **i gene** makes a non-functional repressor: nothing blocks the operator, so enzymes are made **all the time** (with or without lactose).',
        'Mutant 2 — the **operator** is changed so the repressor cannot bind: again **always on**.',
        'Mutant 3 — the **z gene** is non-functional: the operon can be switched on, but **no active β-galactosidase** is ever made.',
      ],
      v: table(['Bacterium', 'No lactose', 'Lactose present'], [['Normal', 'Off', 'On'], ['i gene broken', 'On', 'On'], ['Operator changed', 'On', 'On'], ['z gene broken', 'No β-galactosidase', 'No β-galactosidase']], 'Worked table of β-galactosidase production in normal and three mutant bacteria with and without lactose'),
      n: 'Trace what each part does. Without a working repressor, or without an operator it can bind to, nothing can switch the operon off, so the enzymes are made constantly. If the structural gene for beta-galactosidase is broken, switching the operon on does not help, because the enzyme itself cannot be made correctly.',
    }),
    sl('concept', 'The Human Genome Project', {
      b: 'The **Human Genome Project (HGP)** was launched in **1990** and completed in **2003**, a huge project in which many countries took part.',
      v: table(['Goal', 'Detail'], [['Identify all the genes', 'About 20 000 to 25 000 genes in human DNA'], ['Sequence the genome', 'About 3 billion chemical base pairs'], ['Store the information', 'In databases'], ['Improve tools', 'For data analysis'], ['Transfer technologies', 'To other sectors, such as industry'], ['Address ethical, legal and social issues', 'Arising from the project']], 'Table of the goals of the Human Genome Project'),
      n: 'The project aimed to read every base of human DNA and find every gene. That needed new machines, new computer methods and huge databases. Its organisers also set aside effort to study the ethical, legal and social questions, because genetic information is personal and powerful.',
    }),
    sl('concept', 'How the genome was read', {
      b: 'Two approaches were used: identifying all genes expressed as RNA (**Expressed Sequence Tags, ESTs**) and **sequence annotation** (sequencing everything, then assigning functions).',
      v: flow('LR', [['d', 'Total DNA from cells'], ['f', 'Broken into small fragments'], ['c', 'Cloned in hosts using BAC and YAC vectors'], ['s', 'Sequenced by automated sequencers (Sanger’s method)'], ['a', 'Overlaps aligned by computer']], [['d', 'f'], ['f', 'c'], ['c', 's'], ['s', 'a']], 'Flow of genome sequencing: fragmenting DNA, cloning in BAC and YAC vectors, automated sequencing and computer alignment'),
      n: 'The genome is far too long to sequence in one piece. It was broken into small fragments, which were copied in bacteria or yeast using special vectors called bacterial and yeast artificial chromosomes. Each piece was sequenced with automated machines based on Frederick Sanger’s method, and computers found the overlaps to assemble the whole sequence.',
    }),
    sl('concept', 'What the genome showed', {
      b: 'Some salient observations of the HGP:',
      v: table(['Finding', 'Value'], [['Total bases', '3164.7 million'], ['Average gene size', 'About 3000 bases; the largest, dystrophin, 2.4 million bases'], ['Estimated number of genes', 'About 30 000 (lower than earlier guesses)'], ['Identical between people', '99.9 percent of bases'], ['Coding for proteins', 'Less than 2 percent of the genome'], ['Most and fewest genes', 'Chromosome 1 (2968); chromosome Y (231)'], ['Single-base differences (SNPs)', 'About 1.4 million locations identified']], 'Table of salient findings of the Human Genome Project'),
      n: 'Some findings were surprising. Less than two percent of our DNA codes for proteins; much of the rest is made of repeated sequences. Any two people share about ninety-nine point nine percent of their DNA bases. The functions of over half the discovered genes were still unknown when the project ended.',
    }),
    sl('example', 'Worked example 2: putting the numbers to work', {
      b: 'The human genome has 3164.7 million bases. About how many bases code for proteins if the coding share is 2 percent? If two people differ at 0.1 percent of bases, at about how many positions do they differ?',
      ul: [
        r`Step 1 — Coding bases $\approx 3164.7 \times 10^{6} \times 0.02 \approx ${(CODING / 1e6).toFixed(1)}$ million (an upper estimate, since less than 2 percent codes).`,
        r`Step 2 — Differences $\approx 3164.7 \times 10^{6} \times 0.001 \approx ${(DIFF / 1e6).toFixed(2)}$ million positions.`,
        'Conclusion — even 0.1 percent means millions of differences, which is what makes every person’s DNA unique.',
      ],
      v: table(['Quantity', 'Approximate value'], [['Coding bases (2 percent)', `${(CODING / 1e6).toFixed(1)} million`], ['Differences between two people (0.1 percent)', `${(DIFF / 1e6).toFixed(2)} million`]], 'Worked table of coding bases and differences between two people'),
      n: 'Multiply the total by each fraction. Two percent of about three thousand one hundred and sixty-five million is about sixty-three million bases, at most. And one tenth of one percent is about three point two million positions. So even though we are almost identical, there are millions of differences between any two people, the basis of DNA fingerprinting.',
    }),
    sl('check', 'Quick check: genome facts', {
      b: 'Which chromosome was found to carry the most genes?',
      n: 'Quick check. Recall the chromosomes with the most and the fewest genes.',
      chk: 'hgp-mcq',
    }),
    sl('concept', 'The basis of DNA fingerprinting', {
      b: 'DNA fingerprinting compares **repetitive DNA**, short sequences repeated many times. In density-gradient centrifugation these form small peaks of **satellite DNA**. Some of them, **VNTRs** (variable number tandem repeats), differ in repeat number between people: **polymorphism**.',
      v: table(['Term', 'Meaning'], [['Repetitive DNA', 'Small stretches of DNA repeated many times'], ['Satellite DNA', 'Repetitive DNA forming minor peaks in a density gradient; does not code for proteins'], ['VNTR', 'A satellite sequence whose copy number varies between individuals; fragment sizes from about 0.1 to 20 kb'], ['Polymorphism', 'Variation at a DNA sequence between individuals, inherited from parents']], 'Table of terms used in DNA fingerprinting'),
      n: 'Our DNA contains many short sequences repeated over and over. The number of repeats at certain places, called variable number tandem repeats, differs from person to person. So the sizes of these pieces form a pattern unique to each individual, except identical twins. Half of each person’s pattern comes from each parent.',
    }),
    sl('concept', 'Steps of DNA fingerprinting', {
      b: 'The technique was developed by **Alec Jeffreys**, using a VNTR as a probe.',
      v: flow('TB', [['i', 'Isolate DNA'], ['d', 'Digest with restriction endonucleases'], ['e', 'Separate fragments by gel electrophoresis'], ['b', 'Transfer to a nylon or nitrocellulose membrane (Southern blotting)'], ['h', 'Hybridise with a labelled VNTR probe'], ['a', 'Detect by autoradiography: pattern of bands']], [['i', 'd'], ['d', 'e'], ['e', 'b'], ['b', 'h'], ['h', 'a']], 'Flow of the steps of DNA fingerprinting'),
      n: 'First the DNA is extracted and cut with restriction enzymes. The fragments are separated by size in a gel, then blotted onto a membrane. A labelled VNTR probe sticks only to matching fragments, and an X-ray film reveals them as a pattern of bands. Tiny samples, such as a drop of blood or a hair root, can be used.',
    }),
    sl('diagram', 'Reading a fingerprint', {
      b: 'A child’s bands must each match a band of the **mother** or of the **biological father**. Uses: **forensic** identification, **paternity** disputes, and studies of **population and genetic diversity**.',
      v: V.gel,
      n: 'Look at the child’s lane. Two of its bands match the mother. The other two must come from the father. They match man P, but not man Q. So man P is the biological father. The same logic identifies suspects from samples left at a crime scene.',
    }),
    sl('check', 'Quick check: paternity', {
      b: 'Judge the assertion and the reason about DNA fingerprints in families.',
      n: 'Quick check. Where does each half of a child’s DNA come from?',
      chk: 'paternity-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Prokaryotic regulation mainly at initiation of transcription; lac operon: i (repressor), p, o, z (β-galactosidase), y (permease), a (transacetylase); lactose is the inducer; negative regulation.',
        'HGP (1990–2003): goals, ESTs and sequence annotation, BAC and YAC vectors, automated Sanger sequencing.',
        'Findings: 3164.7 million bases; about 30 000 genes; 99.9 percent identical; under 2 percent coding; chromosome 1 most genes, Y fewest; 1.4 million SNPs.',
        'DNA fingerprinting (Jeffreys): VNTRs, polymorphism; isolate → digest → electrophoresis → blot → hybridise → autoradiograph; forensic and paternity uses.',
      ],
      v: table(['Topic', 'Key word'], [['lac operon', 'Inducer inactivates repressor'], ['HGP', '3164.7 million bases'], ['Fingerprinting', 'VNTR probe']], 'Summary table of key words for the three topics'),
      n: 'To recap: the lac operon is switched on only when lactose inactivates the repressor. The Human Genome Project read over three billion bases and found that very little of our DNA codes for proteins. And DNA fingerprinting uses variable repeats to give each person a unique pattern of bands, half from each parent.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Name all parts of the lac operon with the **product of each structural gene**.',
        'Call lac operon control **negative regulation** and name **lactose as the inducer**.',
        'List the **steps of DNA fingerprinting in order** — a favourite 3- or 5-mark question.',
        'Quote HGP numbers carefully: **3164.7 million bases**, **under 2 percent coding**.',
      ],
      n: 'Exam tips. Learn the parts of the lac operon and what each structural gene makes. Describe the control as negative regulation with lactose as the inducer. Practise the steps of DNA fingerprinting in the right order. And quote the genome project numbers precisely.',
    }),
  ],
});
