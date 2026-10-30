// ISC 12 Biology ch07 Molecular Basis of Inheritance: DNA and Replication — Part 1 (t01–t03), Part 2 (t04–t05).
import { sl, deck, table, flow, svgV, r } from '../../isc-12-biology-ch01/src/lib.mjs';
import { LADDER, NUCLEOSOME, MESELSON, FORK, GRIFFITH, HERSHEY } from './svgs.mjs';
import { chargaff, lengthM, nucleosomes, meselson, complement } from './calc.mjs';

export const V = {
  ladder: svgV(LADDER, 'An untwisted DNA double helix showing complementary, antiparallel strands'),
  nucleosome: svgV(NUCLEOSOME, 'Nucleosomes: DNA wrapped around histone octamers with H1 on linker DNA'),
  meselson: svgV(MESELSON, 'Meselson–Stahl density bands after 0, 1 and 2 generations in normal nitrogen'),
  fork: svgV(FORK, 'A replication fork with continuous leading strand and Okazaki fragments on the lagging strand'),
  griffith: svgV(GRIFFITH, 'Griffith’s four injections of pneumococci into mice'),
  hershey: svgV(HERSHEY, 'Hershey–Chase experiment with phosphorus-labelled DNA and sulphur-labelled protein'),
};

// ---------------------------------------------------------------- computed numbers
const CH = chargaff('A', 20);
const HUMAN_BP = 6.6e9;
const HUMAN_M = Math.round(lengthM(HUMAN_BP) * 100) / 100;
const NUC = nucleosomes(4000);
const M3 = meselson(3);
const TOP = 'ATGCCGTA';

export const deck1 = deck({
  part: 1,
  title: 'DNA and Replication — Part 1: The genetic material and its structure',
  goals: [
    'State the properties of a genetic material',
    'Describe the experiments of Griffith, Avery–MacLeod–McCarty and Hershey–Chase',
    'Describe the double helix and the contributions of Miescher, Chargaff, Wilkins, Franklin, Watson and Crick',
    'Compare DNA and RNA, name the types of RNA, and describe DNA packaging',
  ],
  slides: [
    sl('title', 'Molecular Basis of Inheritance', {
      b: 'Part 1 — what the genetic material is, how it was found, and how it is built and packed.',
      v: flow('LR', [['f', 'Factors (Mendel)'], ['c', 'Chromosomes (Sutton, Boveri)'], ['d', 'DNA as the molecule']], [['f', 'c'], ['c', 'd']], 'Flow from Mendel’s factors to chromosomes to DNA'),
      n: 'Mendel’s factors were placed on chromosomes, but which molecule in chromosomes carries inheritance? Chromosomes contain both protein and nucleic acid. A series of elegant experiments showed that the genetic material is deoxyribonucleic acid, DNA, and in some viruses ribonucleic acid, RNA.',
    }),
    sl('concept', 'What makes a good genetic material?', {
      b: 'A molecule that acts as genetic material must meet four criteria.',
      v: table(['Criterion', 'How DNA meets it'], [['Generate its own replica', 'Complementary base pairing allows exact copying'], ['Be chemically and structurally stable', 'DNA lacks the reactive 2′-OH of RNA and has thymine, so it is more stable'], ['Allow slow changes (mutation) for evolution', 'Base changes are rare but possible'], ['Express itself as Mendelian characters', 'Through RNA and proteins']], 'Table of the four criteria of a genetic material'),
      n: 'Both DNA and RNA can replicate and mutate, but RNA is more reactive and less stable. That is why DNA is the predominant genetic material, while RNA, which can also act as a catalyst, is thought to have been the first genetic material.',
    }),
    sl('diagram', 'Griffith: transformation', {
      b: 'In **1928**, **Frederick Griffith** worked with ***Streptococcus pneumoniae***. **S (smooth)** strains have a capsule and are virulent; **R (rough)** strains lack it. Heat-killed S mixed with live R killed mice, and live S bacteria were recovered: R cells had been **transformed**.',
      v: V.griffith,
      n: 'Something from the dead smooth bacteria changed the harmless rough bacteria into the deadly form. Griffith called it the transforming principle, but he could not say what it was. That question was answered by later biochemical work.',
    }),
    sl('concept', 'Avery, MacLeod and McCarty', {
      b: 'Working between **1933 and 1944**, **Oswald Avery, Colin MacLeod and Maclyn McCarty** purified biochemicals (proteins, DNA, RNA) from heat-killed S cells to find which one transformed R cells.',
      v: table(['Treatment of S-cell extract', 'Transformation?'], [['Protease (digests protein)', 'Still occurs'], ['RNase (digests RNA)', 'Still occurs'], ['DNase (digests DNA)', 'Stopped']], 'Table of enzyme treatments and transformation results'),
      n: 'Only purified DNA caused transformation, and only the DNA-digesting enzyme stopped it. They concluded that DNA is the hereditary material, though not all biologists were convinced until the phage experiments that followed.',
    }),
    sl('diagram', 'Hershey and Chase', {
      b: 'In **1952**, **Alfred Hershey and Martha Chase** grew bacteriophages with radioactive **phosphorus (³²P)**, which labels DNA, or radioactive **sulphur (³⁵S)**, which labels protein. After infection, blending and centrifugation, **³²P** was found **inside the bacteria** and **³⁵S** outside.',
      v: V.hershey,
      n: 'Only the material that entered the bacteria could direct the making of new viruses. Since the phosphorus label, and so the DNA, entered while the sulphur-labelled protein coats stayed outside, DNA is the genetic material passed from virus to bacteria.',
    }),
    sl('check', 'Quick check: Hershey and Chase', {
      b: 'Why did Hershey and Chase use radioactive sulphur to label protein?',
      n: 'Quick check. Which element is in protein but not in DNA?',
      chk: 'sulphur-mcq',
    }),
    sl('concept', 'Discovering the double helix', {
      b: 'Several scientists contributed to the model.',
      v: table(['Scientist', 'Contribution'], [['Friedrich Miescher (1869)', 'Isolated an acidic substance, “nuclein”, from the nuclei of pus cells'], ['Erwin Chargaff', 'In double-stranded DNA, A = T and G = C, so purines = pyrimidines'], ['Maurice Wilkins and Rosalind Franklin', 'X-ray diffraction data on DNA structure'], ['James Watson and Francis Crick (1953)', 'Double helix model with complementary base pairing']], 'Table of scientists and their contributions to DNA structure'),
      n: 'Miescher first isolated DNA in 1869, but its structure took almost a century to solve. Chargaff’s base ratios and Franklin and Wilkins’s X-ray images were the clues Watson and Crick used to build their model in 1953.',
    }),
    sl('diagram', 'The double helix', {
      b: 'Two **polynucleotide chains** form a **right-handed** helix with a **sugar–phosphate backbone** outside and **bases** inside. The chains are **antiparallel** (5′→3′ and 3′→5′). **A pairs with T** (two hydrogen bonds) and **G with C** (three). The pitch is **3.4 nm**, with about **10 base pairs per turn**, so bases are **0.34 nm** apart.',
      v: V.ladder,
      n: 'Because a purine always pairs with a pyrimidine, the distance between the two strands stays the same along the helix. The sequence of one strand automatically fixes the sequence of the other, which is the key to copying.',
    }),
    sl('example', 'Worked example 1: Chargaff’s rules', {
      b: `A double-stranded DNA sample has ${CH.A} percent adenine. Find the percentages of the other bases. Write the complementary strand of 5′–${TOP}–3′.`,
      ul: [
        r`$T = A = ${CH.A}$ percent.`,
        r`$G + C = 100 - (${CH.A} + ${CH.T}) = ${CH.G + CH.C}$, so $G = C = \dfrac{${CH.G + CH.C}}{2} = ${CH.G}$ percent.`,
        `Complementary strand (3′→5′): **${complement(TOP)}**.`,
      ],
      v: table(['Base', 'Percent'], [['A', String(CH.A)], ['T', String(CH.T)], ['G', String(CH.G)], ['C', String(CH.C)]], `Worked table: A and T ${CH.A}, G and C ${CH.G} percent`),
      n: 'Adenine equals thymine, so both are twenty percent. That leaves sixty percent for guanine and cytosine together, thirty each. To write the partner strand, pair each base with its complement and remember the partner runs in the opposite direction.',
    }),
    sl('concept', 'DNA, RNA and the three kinds of RNA', {
      b: 'DNA and RNA are both polynucleotides but differ in sugar, bases and form.',
      v: table(['Feature', 'DNA', 'RNA'], [['Sugar', 'Deoxyribose', 'Ribose (2′-OH, more reactive)'], ['Bases', 'A, T, G, C', 'A, U, G, C'], ['Strands', 'Usually double', 'Usually single'], ['Types', '—', 'mRNA (template), tRNA (adapter carrying amino acids), rRNA (structural and catalytic in ribosomes)']], 'Table comparing DNA and RNA and listing types of RNA'),
      n: 'Messenger RNA carries the code from DNA to the ribosome. Transfer RNA reads the code and brings the right amino acid. Ribosomal RNA forms part of the ribosome and catalyses the joining of amino acids.',
    }),
    sl('diagram', 'Packaging DNA: nucleosomes', {
      b: 'In eukaryotes, positively charged basic proteins, **histones** (rich in lysine and arginine), form an **octamer**. Negatively charged DNA wraps around it to form a **nucleosome** of about **200 bp**. Nucleosomes appear as **beads on a string**; the chromatin fibre is coiled further into chromosomes, helped by **non-histone chromosomal proteins**.',
      v: V.nucleosome,
      n: 'Stained chromatin shows two regions. Loosely packed euchromatin stains lightly and is transcriptionally active. Densely packed heterochromatin stains darkly and is inactive. Bacteria have no histones; their DNA is held with positively charged proteins in a region called the nucleoid.',
    }),
    sl('example', 'Worked example 2: how long is our DNA?', {
      b: `A human diploid cell has about ${HUMAN_BP.toExponential(1).replace('e+9', ' × 10⁹')} base pairs. With 0.34 nm per base pair, what is the total length of its DNA? How many nucleosomes would a 4000 bp stretch form?`,
      ul: [
        r`Length $= 6.6 \times 10^{9} \times 0.34 \times 10^{-9}\ \text{m} \approx ${HUMAN_M}$ m.`,
        r`Nucleosomes $= \dfrac{4000}{200} = ${NUC}$.`,
      ],
      v: table(['Quantity', 'Value'], [['Base pairs', '6.6 × 10⁹'], ['Length', `about ${HUMAN_M} m`], ['Nucleosomes in 4000 bp', String(NUC)]], `Worked table: about ${HUMAN_M} metres; ${NUC} nucleosomes`),
      n: 'Multiplying the number of base pairs by the spacing gives more than two metres of DNA in each cell, packed into a nucleus a few micrometres across. That is only possible because the DNA is wound around histones and coiled again and again.',
    }),
    sl('check', 'Quick check: base pairing', {
      b: 'Judge the assertion and the reason about the width of the double helix.',
      n: 'Quick check. Does a purine pair with a purine?',
      chk: 'width-ar',
    }),
    sl('check', 'Quick check: chromatin', {
      b: 'Which kind of chromatin is transcriptionally active?',
      n: 'Quick check. Is it the loosely or the densely packed form?',
      chk: 'euchromatin-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Genetic material: replicates, stable, mutates slowly, expressed as characters; DNA more stable than RNA.',
        'Griffith (1928) transformation; Avery–MacLeod–McCarty (DNA transforms; DNase stops it); Hershey–Chase (1952, ³²P enters).',
        'Miescher (nuclein), Chargaff (A = T, G = C), Wilkins and Franklin (X-ray), Watson and Crick (1953 double helix).',
        'Double helix: antiparallel, right-handed, 3.4 nm pitch, 10 bp per turn, 0.34 nm per bp.',
        'mRNA, tRNA, rRNA; histone octamer, nucleosome of about 200 bp; euchromatin and heterochromatin.',
      ],
      v: table(['Experiment', 'Conclusion'], [['Griffith', 'A transforming principle exists'], ['Avery et al.', 'It is DNA'], ['Hershey–Chase', 'DNA enters and directs phage production']], 'Summary table of three experiments'),
      n: 'To recap: three classic experiments showed that DNA is the genetic material. Its double helix, with complementary bases, explains copying, and histones pack the long molecule into nucleosomes and chromosomes.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Describe each experiment with **organism, method and conclusion**.',
        'Learn the **dimensions** of the helix and the **hydrogen bonds** of each pair.',
        'Use **Chargaff’s rules** in calculations and write strands with **5′ and 3′** ends.',
        'Distinguish **euchromatin** and **heterochromatin**.',
      ],
      n: 'Exam tips. For each experiment, give the organism, method and conclusion. Learn the dimensions of the double helix. Use Chargaff’s rules carefully and label the ends of strands. And keep the two kinds of chromatin apart.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'DNA and Replication — Part 2: Central dogma and replication',
  goals: [
    'State the central dogma and explain reverse transcription',
    'Explain semi-conservative replication and the roles of DNA polymerase and ligase',
    'Describe the experiments of Meselson and Stahl and of Taylor',
  ],
  slides: [
    sl('title', 'Central dogma and replication', {
      b: 'Part 2 — how genetic information flows and how DNA copies itself.',
      v: flow('LR', [['c', 'DNA copies (replication)'], ['d', 'DNA'], ['r', 'RNA'], ['p', 'Protein']], [['d', 'c', 'replication'], ['d', 'r', 'transcription'], ['r', 'p', 'translation']], 'Flow of the central dogma: DNA replicates and is transcribed to RNA, which is translated to protein'),
      n: 'Francis Crick proposed the central dogma: genetic information flows from DNA to RNA to protein. DNA copies itself by replication, its information is transcribed into RNA, and RNA is translated into protein.',
    }),
    sl('concept', 'Reverse transcription', {
      b: 'In some viruses, such as **retroviruses** (for example **HIV**), information flows **from RNA to DNA**. The enzyme **reverse transcriptase** makes DNA from the viral RNA, an exception to the original direction of the central dogma.',
      v: flow('LR', [['v', 'Viral RNA'], ['d', 'DNA copy (by reverse transcriptase)'], ['h', 'Integrated into host DNA'], ['n', 'New viral RNA and proteins']], [['v', 'd'], ['d', 'h'], ['h', 'n']], 'Flow of reverse transcription in a retrovirus'),
      n: 'Reverse transcription lets a retrovirus insert its genes into the host’s chromosomes, where they are copied with the host’s own DNA. The discovery showed that information can sometimes flow backwards from RNA to DNA.',
    }),
    sl('check', 'Quick check: reverse transcription', {
      b: 'Which enzyme copies RNA into DNA?',
      n: 'Quick check. Its name says that it reverses transcription.',
      chk: 'rt-mcq',
    }),
    sl('concept', 'Semi-conservative replication', {
      b: 'Watson and Crick proposed that the two strands **separate** and each acts as a **template** for a new complementary strand. Each daughter molecule has **one parental and one new strand**: **semi-conservative replication**.',
      v: table(['Model', 'Daughter molecules'], [['Semi-conservative (correct)', 'Each has one old and one new strand'], ['Conservative', 'One wholly old, one wholly new'], ['Dispersive', 'Old and new pieces mixed in each strand']], 'Table of three models of DNA replication'),
      n: 'Only the semi-conservative model fits the experiments. Because each strand serves as a template, the two daughter molecules are identical to each other and to the parent.',
    }),
    sl('diagram', 'Meselson and Stahl (1958)', {
      b: '**E. coli** were grown for many generations in **¹⁵NH₄Cl**, so their DNA became **heavy**, then transferred to **¹⁴NH₄Cl**. DNA was separated by **caesium chloride density-gradient centrifugation**. After one generation (about 20 minutes) all DNA was **hybrid**; after two generations (40 minutes) **half hybrid and half light**.',
      v: V.meselson,
      n: 'If replication were conservative, the first generation would have shown separate heavy and light bands, not one hybrid band. The results match exactly what semi-conservative replication predicts.',
    }),
    sl('example', 'Worked example 1: the third generation', {
      b: 'Following Meselson and Stahl, what fractions of the DNA will be heavy, hybrid and light after three generations in ¹⁴N?',
      ul: [
        r`After $n$ generations, only the 2 original strands remain, in 2 hybrid molecules out of $2^{n}$.`,
        r`Hybrid $= \dfrac{2}{2^{3}} = ${M3.hybrid}$; light $= 1 - ${M3.hybrid} = ${M3.light}$; heavy $= ${M3.heavy}$.`,
      ],
      v: table(['Generation', 'Heavy', 'Hybrid', 'Light'], [['1', '0', String(meselson(1).hybrid), String(meselson(1).light)], ['2', '0', String(meselson(2).hybrid), String(meselson(2).light)], ['3', '0', String(M3.hybrid), String(M3.light)]], `Worked table: generation 3 hybrid ${M3.hybrid}, light ${M3.light}`),
      n: 'The two original heavy strands are never lost, but each ends up in a hybrid molecule. With eight molecules after three generations, two are hybrid, a quarter, and six are light, three-quarters.',
    }),
    sl('concept', 'Taylor’s experiment', {
      b: 'In **1958**, **J. H. Taylor** grew root tips of **Vicia faba** (broad bean) in medium with **radioactive thymidine** for one generation, then in non-radioactive medium, and located the label by **autoradiography**.',
      v: table(['Stage', 'Observation'], [['After one division in labelled medium', 'Both chromatids of each chromosome labelled'], ['After a further division in unlabelled medium', 'Only one chromatid of each chromosome labelled']], 'Table of Taylor’s observations with labelled thymidine'),
      n: 'Taylor showed that chromosomes of a plant, not only bacterial DNA, replicate semi-conservatively. Each chromatid keeps one old strand and makes one new strand, so the label is shared out exactly as the model predicts.',
    }),
    sl('diagram', 'The machinery of replication', {
      b: 'Replication starts at an **origin of replication**. At the **replication fork**, the strands unwind. **DNA-dependent DNA polymerase** adds nucleotides only in the **5′→3′** direction, so the **leading strand** is made **continuously** and the **lagging strand** **discontinuously** as **Okazaki fragments**, joined by **DNA ligase**.',
      v: V.fork,
      n: 'Deoxyribonucleoside triphosphates act both as building blocks and as the source of energy. DNA polymerase works fast and accurately; in E. coli it copies about four point six million base pairs in roughly eighteen minutes, about two thousand base pairs every second.',
    }),
    sl('check', 'Quick check: ligase', {
      b: 'Judge the assertion and the reason about the lagging strand.',
      n: 'Quick check. In which direction can DNA polymerase work?',
      chk: 'lagging-ar',
    }),
    sl('example', 'Worked example 2: replication speed', {
      b: 'The E. coli chromosome has 4.6 million base pairs and is copied in about 18 minutes. Estimate the rate of polymerisation in base pairs per second.',
      ul: [
        r`Time $= 18 \times 60 = 1080$ s.`,
        r`Rate $= \dfrac{4.6 \times 10^{6}}{1080} \approx ${Math.round(4.6e6 / 1080)}$ bp per second, close to the quoted average of 2000.`,
      ],
      v: table(['Quantity', 'Value'], [['Base pairs', '4.6 × 10⁶'], ['Time', '1080 s'], ['Rate', `about ${Math.round(4.6e6 / 1080)} bp per second`]], `Worked table: about ${Math.round(4.6e6 / 1080)} base pairs per second`),
      n: 'Dividing four point six million base pairs by about a thousand seconds gives roughly four thousand base pairs per second. Because copying actually runs in two directions from one origin, each fork moves at about half that, near the textbook average of two thousand.',
    }),
    sl('check', 'Quick check: semi-conservative', {
      b: 'After one generation in ¹⁴N, what did Meselson and Stahl observe?',
      n: 'Quick check. One band or two?',
      chk: 'hybrid-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Central dogma (Crick): DNA → RNA → protein; reverse transcription (RNA → DNA) in retroviruses by reverse transcriptase.',
        'Semi-conservative replication: each daughter has one old and one new strand.',
        'Meselson and Stahl (1958): ¹⁵N then ¹⁴N, CsCl gradient; one hybrid band, then hybrid and light equally.',
        'Taylor (1958): Vicia faba root tips, radioactive thymidine, autoradiography.',
        'Origin, fork, DNA polymerase (5′→3′), leading strand continuous, lagging strand Okazaki fragments joined by DNA ligase.',
      ],
      v: table(['Enzyme', 'Role'], [['DNA polymerase', 'Adds nucleotides 5′→3′'], ['DNA ligase', 'Joins Okazaki fragments'], ['Reverse transcriptase', 'Makes DNA from RNA']], 'Summary table of enzymes and their roles'),
      n: 'To recap: information normally flows from DNA to RNA to protein, with reverse transcription as an exception. DNA replicates semi-conservatively, as Meselson and Stahl and Taylor showed, using DNA polymerase and DNA ligase.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Draw the **Meselson–Stahl bands** for generations 0, 1 and 2.',
        'Explain **why** the lagging strand is discontinuous (5′→3′ only).',
        'State the **roles** of DNA polymerase and DNA ligase precisely.',
        'Give **organism, label and result** for Taylor’s experiment.',
      ],
      n: 'Exam tips. Draw the density bands for each generation. Explain why the lagging strand is made in pieces. State what DNA polymerase and ligase each do. And give the organism, label and result for Taylor’s experiment.',
    }),
  ],
});
