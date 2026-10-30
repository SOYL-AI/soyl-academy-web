// ISC 12 Biology ch07 DNA and Replication — question bank in ISC style. Base pairing, Chargaff ratios, lengths,
// nucleosome counts and Meselson–Stahl fractions are computed by calc.mjs. AR keys (ISC options): a b c d.
import { mk, add, svgV, r } from '../../isc-12-biology-ch01/src/lib.mjs';
import { complement, chargaff, lengthM, nucleosomes, meselson } from './calc.mjs';
import { GRIFFITH } from './svgs.mjs';

const { mcq, ar, fill, num, short, long, part } = mk;
const griffithFig = svgV(GRIFFITH, 'Griffith’s four injections of pneumococci into mice and their outcomes');

// ---------------------------------------------------------------- t01 search for the genetic material
add('sulphur-mcq', mcq({
  stem: 'Why did Hershey and Chase grow one batch of bacteriophages in a medium containing radioactive sulphur?',
  right: 'Sulphur is present in phage protein but not in DNA, so it labels only the protein coat.',
  wrong: ['Sulphur is present in DNA but not in protein.', 'Sulphur kills the bacteria so that phages are released.', 'Sulphur makes the DNA heavy for density-gradient centrifugation.'],
  sol: 'Proteins contain sulphur (in some amino acids) while DNA does not; DNA contains phosphorus — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('sstrain-mcq', mcq({
  stem: 'In Griffith’s experiment, what made the S strain of Streptococcus pneumoniae virulent while the R strain was not?',
  right: 'The S strain has a polysaccharide capsule that the R strain lacks.',
  wrong: ['The S strain contains RNA while the R strain contains DNA.', 'The S strain is a virus and the R strain a bacterium.', 'The R strain was always heat-killed.'],
  sol: 'Smooth colonies come from capsulated, virulent cells; rough colonies from non-capsulated cells — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('griffith-fig-mcq', mcq({
  stem: 'In the figure of Griffith’s injections, which result first showed that something from dead S cells could change R cells?',
  right: 'Heat-killed S + live R killed the mouse, and live S cells were recovered.',
  wrong: ['Live S alone killed the mouse.', 'Live R alone did not kill the mouse.', 'Heat-killed S alone did not kill the mouse.'],
  sol: 'Only the mixture showed that harmless R cells had been transformed into virulent S cells — option (@K).',
  d: 3, c: 'analysis', t: [1],
  assets: [griffithFig],
}));
add('dnase-mcq', mcq({
  stem: 'An extract of heat-killed S cells normally transforms R cells. Treating the extract with which enzyme would stop transformation?',
  right: 'Deoxyribonuclease (DNase)',
  wrong: ['Protease', 'Ribonuclease (RNase)', 'Amylase'],
  sol: 'Avery, MacLeod and McCarty found that only DNase prevented transformation, showing the transforming principle is DNA — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('phosphorus-mcq', mcq({
  stem: 'Bacteria infected with phages carrying ³²P are separated from the phage coats by blending and centrifugation. Where is most of the radioactivity found, and what does it show?',
  right: 'In the bacterial pellet, showing that phage DNA entered the bacteria',
  wrong: ['In the supernatant, showing that protein entered the bacteria', 'Equally in both, showing nothing about the genetic material', 'Nowhere, because ³²P is lost during blending'],
  sol: '³²P labels DNA, which entered the bacteria and ended up in the pellet — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('stable-ar', ar({
  a: 'RNA is thought to have been the first genetic material.',
  r: 'Hershey and Chase used radioactive sulphur to label phage protein.',
  key: 'b',
  sol: 'Both statements are true, but the labelling method of Hershey and Chase does not explain the idea of an RNA world — option (b).',
  d: 3, c: 'analysis', t: [1],
}));
add('rna-world-short', short({
  marks: 1,
  stem: 'Give a reason: DNA is chemically more stable than RNA.',
  model: 'RNA has a reactive **2′-OH** group on each ribose; DNA lacks it (and has thymine instead of uracil).',
  sol: '2′-OH.',
  scheme: [['2′-OH makes RNA reactive', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('properties-short', short({
  marks: 2,
  stem: 'State four properties that a molecule must have to act as genetic material.',
  model: 'It must be able to **generate its own replica** (replicate), be **chemically and structurally stable**, provide scope for **slow changes (mutation)** needed for evolution, and be able to **express itself** in the form of **Mendelian characters**.',
  sol: 'Four properties.',
  scheme: [['Two properties', 1], ['Two more properties', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('griffith-short', short({
  marks: 2,
  stem: 'In Griffith’s experiment, mice injected with heat-killed S bacteria and live R bacteria died. Explain this result and state the term Griffith used.',
  model: 'Some substance from the **heat-killed S** cells entered the **live R** cells and **changed them into virulent S** cells, which multiplied and killed the mouse; live S bacteria were recovered. Griffith called this change **transformation**, caused by a **“transforming principle”**.',
  sol: 'R transformed to S.',
  scheme: [['R cells changed to virulent S by material from dead S', 1], ['Transformation / transforming principle', 1]],
  d: 2, c: 'application', t: [1],
}));
add('avery-short', short({
  marks: 3,
  stem: 'Describe how Avery, MacLeod and McCarty identified the transforming principle.',
  model: 'Working between **1933 and 1944**, they **purified** the main biochemicals — **proteins, DNA and RNA** — from **heat-killed S** cells and tested which could **transform R cells** into S cells. **Only DNA** caused transformation. **Proteases** and **RNases** did **not** affect it, while **DNase inhibited** transformation. They concluded that **DNA is the hereditary material**.',
  sol: 'Purification and enzyme tests.',
  scheme: [['Purified components tested on R cells', 1], ['Only DNA transformed', 1], ['DNase stopped it; protease and RNase did not', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('hershey-short', short({
  marks: 3,
  stem: 'Describe the Hershey–Chase experiment and explain how its result shows that DNA is the genetic material.',
  model: 'Bacteriophages were grown on media with **radioactive phosphorus (³²P)**, labelling their **DNA**, or **radioactive sulphur (³⁵S)**, labelling their **protein**. They were allowed to infect *E. coli*; the phage coats were removed by **blending** and the bacteria separated by **centrifugation**. Bacteria infected with ³²P phages were **radioactive**, while with ³⁵S phages the radioactivity stayed in the **supernatant**. Only DNA entered the bacteria and directed new phages, so **DNA is the genetic material**.',
  sol: 'Labels, procedure, conclusion.',
  scheme: [['³²P and ³⁵S labelling', 1], ['Infection, blending, centrifugation', 1], ['Radioactivity results and conclusion', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('search-long', long({
  stem: '(a) What is meant by transformation? Describe Griffith’s experiment that led to its discovery. [3]\n(b) A student repeats the Avery experiment but treats the S-cell extract with protease before adding it to R cells. Predict the result and explain. [2]',
  model: '(a) **Transformation** is a change in the genetic make-up of a bacterium caused by material taken up from another cell. **Griffith (1928)** injected mice with *Streptococcus pneumoniae*: **live S** (capsulated, virulent) bacteria **killed** mice; **live R** (non-capsulated) did **not**; **heat-killed S** did **not**; but **heat-killed S mixed with live R** **killed** the mice, and **live S** bacteria were recovered from them. A “transforming principle” from the dead S cells had changed R cells into S cells.\n\n(b) **Transformation will still occur.** Protease destroys **proteins**, but the transforming principle is **DNA**, which is not affected by protease; only **DNase** would stop it.',
  sol: 'Definition and experiment; prediction.',
  scheme: [['(a) Definition', 1], ['(a) Four injections and results', 2], ['(b) Transformation still occurs', 1], ['(b) Protease does not destroy DNA', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 structure of DNA and RNA
add('miescher-mcq', mcq({
  stem: 'Friedrich Miescher in 1869 isolated an acidic substance, which he called nuclein, from the nuclei of',
  right: 'pus cells',
  wrong: ['bacteriophages', 'pea root tips', 'E. coli grown in heavy nitrogen'],
  sol: 'Miescher isolated nuclein (DNA) from the nuclei of pus cells — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('franklin-mcq', mcq({
  stem: 'Whose X-ray diffraction data on DNA helped Watson and Crick to propose the double helix model?',
  right: 'Maurice Wilkins and Rosalind Franklin',
  wrong: ['Erwin Chargaff and Friedrich Miescher', 'Hershey and Chase', 'Meselson and Stahl'],
  sol: 'Wilkins and Franklin produced the X-ray diffraction data — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('hbond-mcq', mcq({
  stem: 'Two DNA molecules have the same length, but molecule P has more G–C pairs than molecule Q. Which molecule needs more heat to separate its strands, and why?',
  right: 'P, because each G–C pair has three hydrogen bonds while each A–T pair has two',
  wrong: ['Q, because A–T pairs have three hydrogen bonds', 'Both equally, because length is the same', 'Q, because it has more purines'],
  sol: 'More G–C pairs mean more hydrogen bonds holding the strands together — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('trna-mcq', mcq({
  stem: 'Which RNA acts as an adapter, bringing a specific amino acid and reading the genetic code during protein synthesis?',
  right: 'tRNA',
  wrong: ['mRNA', 'rRNA', 'Viral RNA'],
  sol: 'tRNA carries amino acids and reads codons — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('width-ar', ar({
  a: 'The distance between the two strands of the DNA double helix is nearly the same along its length.',
  r: 'A purine always pairs with a pyrimidine.',
  key: 'a',
  sol: 'Both are true; a purine–pyrimidine pair always spans the same width, which explains the uniform diameter — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
{
  const c = chargaff('G', 35);
  add('chargaff-num', num({
    stem: 'A sample of double-stranded DNA contains 35 percent guanine. What percentage of its bases is adenine?',
    value: c.A, unit: '%',
    sol: r`$C = G = 35$; $A + T = 100 - 70 = 30$; $A = \dfrac{30}{2} = ${c.A}$ percent.`,
    scheme: [[`${c.A}%`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 15 || 'value');
}
{
  const turns = 1500 / 10;
  add('turns-num', num({
    stem: 'A stretch of B-form DNA in a double helix is 1500 base pairs long. How many complete helical turns does it contain, at about 10 base pairs per turn?',
    value: turns,
    sol: r`Turns $= \dfrac{1500}{10} = ${turns}$.`,
    scheme: [[`${turns}`, 1]],
    d: 1, c: 'application', t: [2],
  }), (q) => q.answer.value === 150 || 'value');
}
{
  const seq = 'GCATGC';
  const hb = Array.from(seq).reduce((s, b) => s + (b === 'G' || b === 'C' ? 3 : 2), 0);
  add('hbond-num', num({
    stem: `How many hydrogen bonds hold together the double-stranded DNA segment whose one strand reads 5′–${seq}–3′?`,
    value: hb,
    sol: r`G–C pairs: 4, each with 3 bonds; A–T pairs: 2, each with 2 bonds. Total $= 4 \times 3 + 2 \times 2 = ${hb}$.`,
    scheme: [[`${hb}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 16 || 'value');
}
add('complement-fill', fill({
  stem: `The strand complementary to 5′–ATTGCAC–3′ reads 3′–______–5′.`,
  acc: [[complement('ATTGCAC')]],
  sol: `${complement('ATTGCAC')}.`,
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.blanks[0].accepted[0] === 'TAACGTG' || 'complement');
add('chargaff-short', short({
  marks: 2,
  stem: 'State Chargaff’s rules and use them to find the percentages of all four bases in double-stranded DNA with 22 percent thymine.',
  model: `In double-stranded DNA, **A = T** and **G = C**, so purines equal pyrimidines. With T = 22: **A = ${chargaff('T', 22).A}**, **G = C = (100 − 44) ÷ 2 = ${chargaff('T', 22).G}** percent each.`,
  sol: 'Rules and values.',
  scheme: [['Rules', 1], ['A 22, G 28, C 28', 1]],
  d: 2, c: 'application', t: [2],
}), () => chargaff('T', 22).G === 28 || 'value');
add('rna-short', short({
  marks: 2,
  stem: 'Name the three types of RNA and state the role of each in protein synthesis.',
  model: '**mRNA** provides the **template** (the coded message) for translation; **tRNA** brings **amino acids** and **reads the genetic code** (adapter); **rRNA** plays a **structural and catalytic** role in **ribosomes**.',
  sol: 'Three types and roles.',
  scheme: [['Two types with roles', 1], ['Third type with role', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('helix-short', short({
  marks: 3,
  stem: 'List the salient features of the Watson–Crick double helix model of DNA.',
  model: '1. Two **polynucleotide chains** with a **sugar–phosphate backbone** outside and **bases** projecting inside.\n2. The chains are **antiparallel** (5′→3′ and 3′→5′).\n3. Bases pair by **hydrogen bonds**: **A–T (two)**, **G–C (three)**; a purine always faces a pyrimidine.\n4. The chains coil in a **right-handed** helix with a **pitch of 3.4 nm** and about **10 bp per turn** (**0.34 nm** apart), and the stacked base pairs add stability.',
  sol: 'Key features.',
  scheme: [['Backbone and antiparallel chains', 1], ['Base pairing with hydrogen bonds', 1], ['Right-handed; pitch and spacing', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('dnarna-short', short({
  marks: 3,
  stem: 'A virus genome is found to contain uracil and ribose and to be single-stranded. What is its genetic material? Give three ways in which it differs chemically or structurally from DNA, and explain why such a genome mutates faster.',
  model: 'Its genetic material is **RNA**. Differences: RNA has **ribose** (DNA has deoxyribose); **uracil** instead of thymine; and it is usually **single-stranded** (DNA double). The **2′-OH** of ribose makes RNA **chemically reactive and less stable**, so RNA viruses **mutate and evolve faster**.',
  sol: 'RNA; three differences; stability.',
  scheme: [['RNA identified', 1], ['Three differences', 1], ['Less stable: faster mutation', 1]],
  d: 3, c: 'application', t: [2],
}));
add('helix-long', long({
  stem: '(a) Name the contributions of Miescher, Chargaff, and Wilkins and Franklin to our understanding of DNA. [2]\n(b) Draw a labelled diagram of a short segment of double-stranded DNA showing complementary base pairing, the hydrogen bonds and the 5′ and 3′ ends. [2]\n(c) Why are the two strands of DNA described as antiparallel? [1]',
  model: '(a) **Miescher (1869)** isolated **nuclein** (DNA) from pus cells; **Chargaff** found that **A = T and G = C** in double-stranded DNA; **Wilkins and Franklin** produced **X-ray diffraction** pictures of DNA used to build the double-helix model.\n\n(b) **Diagram:** two strands with **sugar–phosphate backbones**; bases paired **A–T** with **two** hydrogen bonds and **G–C** with **three**; one strand labelled **5′→3′** and the other **3′→5′**.\n\n(c) The two strands run in **opposite directions**: where one has a free **5′** phosphate end, the other has a free **3′**-OH end.',
  sol: 'Contributions; diagram; antiparallel.',
  scheme: [['(a) Three contributions', 2], ['(b) Labelled diagram', 2], ['(c) Opposite polarity', 1]],
  wl: [50, 200],
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 packaging
add('euchromatin-mcq', mcq({
  stem: 'Which kind of chromatin is loosely packed, stains lightly and is transcriptionally active?',
  right: 'Euchromatin',
  wrong: ['Heterochromatin', 'Nucleoid', 'Centromere'],
  sol: 'Euchromatin is loosely packed and active; heterochromatin is dense and inactive — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('histone-mcq', mcq({
  stem: 'Histones can bind DNA tightly because they are',
  right: 'positively charged, being rich in lysine and arginine, while DNA is negatively charged',
  wrong: ['negatively charged, like DNA', 'made of RNA', 'rich in sulphur-containing amino acids only'],
  sol: 'Basic, positively charged histones bind the negatively charged phosphate backbone — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('bacteria-mcq', mcq({
  stem: 'Bacterial DNA is not enclosed in a nuclear membrane. How is it organised inside the cell?',
  right: 'With positively charged proteins in a region called the nucleoid, held in large loops',
  wrong: ['Wrapped around histone octamers into nucleosomes', 'Packed into euchromatin and heterochromatin', 'Dissolved freely in the cytoplasm without any proteins'],
  sol: 'Prokaryotes lack histones; their DNA is held with positively charged proteins in the nucleoid — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
{
  const n = nucleosomes(10000);
  add('nucleosome-num', num({
    stem: 'A stretch of eukaryotic DNA 10 000 base pairs long is packaged into chromatin. About how many nucleosomes would it form, if each holds about 200 bp?',
    value: n,
    sol: r`$\dfrac{10000}{200} = ${n}$ nucleosomes.`,
    scheme: [[`${n}`, 1]],
    d: 1, c: 'application', t: [3],
  }), (q) => q.answer.value === 50 || 'value');
}
{
  const mm = Math.round(lengthM(5e6) * 1e3 * 100) / 100;
  add('length-num', num({
    stem: 'A bacterial chromosome has 5 × 10⁶ base pairs. With 0.34 nm between base pairs, what is its length in millimetres? (Two decimal places.)',
    value: mm, tol: 0.005, unit: 'mm',
    sol: r`$5 \times 10^{6} \times 0.34 \times 10^{-9}\ \text{m} = 1.7 \times 10^{-3}\ \text{m} = ${mm}$ mm.`,
    scheme: [[`${mm} mm`, 1]],
    d: 3, c: 'application', t: [3],
  }), (q) => Math.abs(q.answer.value - 1.7) < 1e-9 || 'value');
}
add('nucleosome-short', short({
  marks: 2,
  stem: 'What is a nucleosome? Why does a typical human cell need such packaging?',
  model: 'A **nucleosome** is a unit of chromatin in which about **200 bp** of negatively charged DNA is wrapped around a positively charged **histone octamer**. Human DNA is about **2.2 m** long in each cell, but the nucleus is only about **10⁻⁶ m** across, so the DNA must be **packed** many thousands of times.',
  sol: 'Definition; length vs nucleus.',
  scheme: [['Nucleosome described', 1], ['2.2 m into a tiny nucleus', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('packaging-short', short({
  marks: 3,
  stem: 'Describe the packaging of DNA in a eukaryotic nucleus, from the histone octamer to the chromosome.',
  model: 'Positively charged **histones**, rich in **lysine and arginine**, form an **octamer**. Negatively charged **DNA** (about **200 bp**) wraps around it to form a **nucleosome**. Repeating nucleosomes form **chromatin**, seen as **beads on a string**. The chromatin fibre is further **coiled and condensed**, with the help of **non-histone chromosomal proteins**, to form **chromosomes** at metaphase. Loosely packed **euchromatin** is active; densely packed **heterochromatin** is inactive.',
  sol: 'Octamer to chromosome.',
  scheme: [['Histone octamer and nucleosome', 1], ['Beads on a string; further coiling with NHC proteins', 1], ['Euchromatin and heterochromatin', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('packaging-long', long({
  stem: '(a) Calculate the length of DNA in a human cell with 6.6 × 10⁹ base pairs, and compare it with the size of the nucleus. [2]\n(b) Explain how this DNA is packaged into chromosomes in eukaryotes, and how bacterial DNA differs. [3]',
  model: `(a) Length $= 6.6 \\times 10^{9} \\times 0.34 \\times 10^{-9}$ m $\\approx$ **${Math.round(lengthM(6.6e9) * 100) / 100} m**, while a nucleus is only about **10⁻⁶ m** across — so the DNA must be packed enormously.\n\n(b) In eukaryotes, positively charged **histones** (rich in lysine and arginine) form an **octamer**; negatively charged DNA (about **200 bp**) wraps around it to form a **nucleosome**. Nucleosomes form chromatin like **beads on a string**, which is coiled further, with **non-histone chromosomal proteins**, into **chromosomes**. In **bacteria** there are **no histones**: the DNA is held with **positively charged proteins** in large loops in the **nucleoid**.`,
  sol: 'Length; packaging; bacteria.',
  scheme: [['(a) About 2.2 m', 1], ['(a) Comparison with nucleus', 1], ['(b) Histone octamer and nucleosome', 1], ['(b) Further coiling with NHC proteins', 1], ['(b) Bacterial nucleoid', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [3],
}), () => Math.round(lengthM(6.6e9) * 100) / 100 === 2.24 || 'length');

// ---------------------------------------------------------------- t04 central dogma
add('rt-mcq', mcq({
  stem: 'HIV makes a DNA copy of its RNA genome inside a human cell. Which enzyme carries out this step?',
  right: 'Reverse transcriptase',
  wrong: ['DNA ligase', 'RNA polymerase', 'DNase'],
  sol: 'Retroviruses use reverse transcriptase to make DNA from RNA — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('retro-mcq', mcq({
  stem: 'Why is reverse transcription regarded as an exception to the central dogma as Crick first stated it?',
  right: 'Information flows from RNA to DNA instead of from DNA to RNA.',
  wrong: ['Proteins are copied into RNA.', 'DNA is copied into DNA.', 'RNA is translated into protein.'],
  sol: 'The central dogma describes DNA → RNA → protein; reverse transcription runs RNA → DNA — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('dogma-short', short({
  marks: 2,
  stem: 'State the central dogma of molecular biology and name the process by which retroviruses reverse part of it.',
  model: 'Proposed by **Crick**, the central dogma states that genetic information flows from **DNA → RNA → protein** (transcription, then translation). **Retroviruses** such as HIV use **reverse transcriptase** to make **DNA from RNA**: **reverse transcription**.',
  sol: 'Dogma; reverse transcription.',
  scheme: [['DNA → RNA → protein', 1], ['Reverse transcription by reverse transcriptase', 1]],
  d: 1, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- t05 replication
add('hybrid-mcq', mcq({
  stem: 'After E. coli grown in ¹⁵N were transferred to ¹⁴N and allowed one round of replication, what did Meselson and Stahl find in the CsCl gradient?',
  right: 'A single band of hybrid (intermediate) density',
  wrong: ['One heavy and one light band', 'A single heavy band', 'A single light band'],
  sol: 'Each daughter molecule had one ¹⁵N and one ¹⁴N strand — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('taylor-mcq', mcq({
  stem: 'Which experiment showed semi-conservative replication of DNA in the chromosomes of a plant?',
  right: 'Taylor’s experiment with radioactive thymidine in Vicia faba root tips',
  wrong: ['Meselson and Stahl’s experiment with E. coli', 'Griffith’s experiment with mice', 'Hershey and Chase’s experiment with phages'],
  sol: 'Taylor used radioactive thymidine and autoradiography on Vicia faba — option (@K).',
  d: 2, c: 'recall', t: [5],
}));
add('okazaki-mcq', mcq({
  stem: 'Short DNA fragments made discontinuously at a replication fork are joined by',
  right: 'DNA ligase',
  wrong: ['DNA polymerase', 'Reverse transcriptase', 'RNase'],
  sol: 'DNA ligase seals the gaps between Okazaki fragments — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('polymerase-mcq', mcq({
  stem: 'A mutant DNA polymerase can add nucleotides only very slowly. Which process in the cell would be most directly slowed?',
  right: 'Synthesis of new DNA strands at the replication fork',
  wrong: ['Joining of Okazaki fragments only', 'Translation of mRNA into protein', 'Packaging of DNA around histones'],
  sol: 'DNA-dependent DNA polymerase polymerises deoxyribonucleotides at the fork — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('lagging-ar', ar({
  a: 'Both new strands are synthesised continuously at a replication fork.',
  r: 'DNA ligase adds nucleotides in the 3′ → 5′ direction.',
  key: 'd',
  sol: 'One strand (lagging) is made discontinuously, and ligase only joins fragments; polymerase works 5′ → 3′. Both statements are false — option (d).',
  d: 3, c: 'analysis', t: [5],
}));
add('meselson-ar', ar({
  a: 'After one generation in ¹⁴N, all the DNA in the Meselson–Stahl experiment had hybrid density.',
  r: 'DNA replication is conservative.',
  key: 'c',
  sol: 'A is true; R is false: a hybrid band after one generation shows replication is semi-conservative — option (c).',
  d: 2, c: 'understanding', t: [5],
}));
{
  const m = meselson(4);
  add('meselson-num', num({
    stem: 'In a Meselson–Stahl type experiment, what fraction of the DNA molecules will be of light density after four generations in ¹⁴N? Give a decimal.',
    value: m.light, tol: 0.0001,
    sol: r`Hybrid $= \dfrac{2}{2^{4}} = ${m.hybrid}$; light $= 1 - ${m.hybrid} = ${m.light}$.`,
    scheme: [[`${m.light}`, 1]],
    d: 3, c: 'application', t: [5],
  }), (q) => q.answer.value === 0.875 || 'value');
}
add('ligase-short', short({
  marks: 2,
  stem: 'Distinguish between the roles of DNA polymerase and DNA ligase in replication.',
  model: '**DNA-dependent DNA polymerase** uses a DNA template to **add deoxyribonucleotides** to a growing strand in the **5′→3′** direction. **DNA ligase** **joins** the short **Okazaki fragments** of the lagging strand into a continuous strand.',
  sol: 'Polymerisation vs joining.',
  scheme: [['Polymerase adds nucleotides 5′→3′', 1], ['Ligase joins Okazaki fragments', 1]],
  d: 1, c: 'understanding', t: [5],
}));
add('meselson-short', short({
  marks: 3,
  stem: 'Describe the Meselson and Stahl experiment and explain how its results support semi-conservative replication.',
  model: '*E. coli* were grown for many generations in **¹⁵NH₄Cl**, making their DNA **heavy**, then transferred to **¹⁴NH₄Cl**. DNA from samples taken each generation was separated by **CsCl density-gradient centrifugation**. After **one generation** (20 min) there was a single **hybrid** band; after **two** (40 min), **equal hybrid and light** bands. This matches **semi-conservative** replication, in which each daughter keeps **one old strand**; conservative replication would have given separate heavy and light bands in the first generation.',
  sol: 'Method, results, reasoning.',
  scheme: [['¹⁵N then ¹⁴N; CsCl gradient', 1], ['Results after one and two generations', 1], ['Interpretation', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('fork-short', short({
  marks: 3,
  stem: 'Explain why one strand at a replication fork is synthesised continuously and the other discontinuously.',
  model: 'The two template strands are **antiparallel**, and **DNA polymerase** can add nucleotides **only in the 5′→3′** direction. On one template the new strand grows **towards the fork** and can be made **continuously** (**leading strand**). On the other it must grow **away from the fork**, so it is made in short pieces, **Okazaki fragments** (**lagging strand**), which are joined by **DNA ligase**.',
  sol: 'Antiparallel; 5′→3′ only.',
  scheme: [['Antiparallel templates', 1], ['Polymerase works 5′→3′ only', 1], ['Leading continuous; lagging Okazaki fragments joined by ligase', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('replication-short', short({
  marks: 3,
  stem: 'A researcher grows bean root tips for one division in a medium with radioactive thymidine, then for one division in ordinary medium, and makes autoradiographs of the chromosomes. Predict what she sees after each division and explain how this supports semi-conservative replication.',
  model: 'After the **first division** in labelled medium, **both chromatids** of each chromosome are **labelled**, because each double helix has one new, labelled strand. After the **second division** in ordinary medium, **only one chromatid** of each chromosome is labelled. Each labelled strand was kept as a **template** and paired with a new unlabelled strand, as expected for **semi-conservative** replication (Taylor’s experiment on *Vicia faba*).',
  sol: 'Taylor’s results.',
  scheme: [['First division: both chromatids labelled', 1], ['Second division: one chromatid labelled', 1], ['Semi-conservative explanation', 1]],
  d: 3, c: 'application', t: [5],
}));
add('replication-long', long({
  stem: '(a) Draw a labelled diagram of a replication fork showing the leading strand, the lagging strand and Okazaki fragments. [2]\n(b) Explain the roles of DNA polymerase and DNA ligase, and state what supplies energy for polymerisation. [2]\n(c) If the E. coli chromosome of 4.6 × 10⁶ bp is replicated in 18 minutes, estimate the rate in base pairs per second. [1]',
  model: `(a) **Diagram:** parental double helix opening at the **fork**; new **leading strand** drawn continuously towards the fork (5′→3′); **lagging strand** drawn as short **Okazaki fragments** pointing away from the fork, joined by **DNA ligase**.\n\n(b) **DNA-dependent DNA polymerase** adds **deoxyribonucleotides** complementary to the template, only in the **5′→3′** direction. **DNA ligase** **joins** the Okazaki fragments. **Deoxyribonucleoside triphosphates** act both as **substrates** and as the **energy source**.\n\n(c) Rate $= \\dfrac{4.6 \\times 10^{6}}{18 \\times 60} \\approx$ **${Math.round(4.6e6 / 1080)} bp per second** (about 2000 per fork, as replication is bidirectional).`,
  sol: 'Fork; enzymes; rate.',
  scheme: [['(a) Labelled fork', 2], ['(b) Polymerase and ligase', 1], ['(b) dNTPs as substrate and energy', 1], ['(c) Rate', 1]],
  wl: [50, 200],
  d: 3, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- stimulus-based
{
  const g1 = meselson(1), g2 = meselson(2), g3 = meselson(3);
  add('density-case', mk.case({
    passage: `A class repeated the Meselson–Stahl experiment on paper. Bacteria with only ¹⁵N DNA were transferred to ¹⁴N medium, and the DNA was examined after each generation.\n\n| Generation in ¹⁴N | Heavy | Hybrid | Light |\n|---|---|---|---|\n| 0 | 1 | 0 | 0 |\n| 1 | ${g1.heavy} | ${g1.hybrid} | ${g1.light} |\n| 2 | ${g2.heavy} | ${g2.hybrid} | ${g2.light} |\n| 3 | ? | ? | ? |`,
    d: 3, c: 'application',
    children: [
      part('a', num({
        stem: 'What fraction of the DNA is hybrid in generation 3? Give a decimal.',
        value: g3.hybrid, tol: 0.001,
        sol: r`$\dfrac{2}{2^{3}} = ${g3.hybrid}$.`,
        scheme: [[`${g3.hybrid}`, 1]],
        d: 2, c: 'application', t: [5],
      })),
      part('b', mcq({
        stem: 'Which model of replication would instead have given equal heavy and light bands in generation 1?',
        right: 'Conservative replication',
        wrong: ['Semi-conservative replication', 'Dispersive replication', 'Reverse transcription'],
        sol: 'In conservative replication the parent stays heavy and the daughter is wholly light — option (@K).',
        d: 3, c: 'analysis', t: [5],
      })),
      part('c', short({
        marks: 2,
        stem: 'Why does the hybrid band never disappear completely, however many generations pass?',
        model: 'The **two original ¹⁵N strands** are never broken down; each stays as a **template**, paired with a new ¹⁴N strand in a **hybrid** molecule. So there are always **two hybrid molecules**, though they become a **smaller fraction** as the total doubles each generation.',
        sol: 'Original strands persist.',
        scheme: [['Original strands persist in hybrids', 1], ['Fraction falls as total doubles', 1]],
        d: 3, c: 'analysis', t: [5],
      }), [
        short({
          marks: 2,
          stem: 'Why was caesium chloride used, and what property of DNA did the method detect?',
          model: 'Centrifugation in a **caesium chloride density gradient** separates molecules by **density**. DNA containing the heavy isotope **¹⁵N** is **denser** than DNA with ¹⁴N, so heavy, hybrid and light DNA form **separate bands**.',
          sol: 'Density gradient.',
          scheme: [['CsCl gradient separates by density', 1], ['¹⁵N DNA denser than ¹⁴N DNA', 1]],
          d: 2, c: 'understanding', t: [5],
        }),
      ]),
    ],
  }), (q) => q.children[0].answer.value === 0.25 || 'value');
}
add('phage-case', mk.case({
  passage: 'Two batches of bacteriophages were prepared: batch X grown with radioactive phosphorus and batch Y with radioactive sulphur. Each batch was allowed to infect E. coli for a few minutes. The cultures were then blended and centrifuged, and radioactivity was measured.\n\n| Batch | Radioactivity in pellet (bacteria) | Radioactivity in supernatant |\n|---|---|---|\n| X | High | Low |\n| Y | Low | High |',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which molecule did batch X label?',
      right: 'DNA',
      wrong: ['Protein', 'Lipid', 'Carbohydrate'],
      sol: 'Phosphorus is in DNA but not in phage protein — option (@K).',
      d: 1, c: 'application', t: [1],
    })),
    part('b', mcq({
      stem: 'What was the purpose of blending the cultures?',
      right: 'To detach the phage coats from the surface of the bacteria',
      wrong: ['To break open the bacteria and release DNA', 'To make the DNA radioactive', 'To kill all phages before infection'],
      sol: 'Blending removed the empty phage coats attached to the bacteria — option (@K).',
      d: 2, c: 'understanding', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'What conclusion can be drawn from both results together?',
      model: 'Radioactive **phosphorus (DNA)** entered the **bacteria**, while radioactive **sulphur (protein)** stayed **outside**. Since the material that enters directs the making of new phages, **DNA is the genetic material**, not protein.',
      sol: 'DNA is the genetic material.',
      scheme: [['DNA entered, protein stayed outside', 1], ['DNA is the genetic material', 1]],
      d: 2, c: 'analysis', t: [1],
    }), [
      short({
        marks: 2,
        stem: 'Why could a little radioactivity from batch Y still be found in the pellet?',
        model: 'Blending is not perfectly efficient: some **phage coats remained attached** to bacteria and were spun down with them, carrying a small amount of **³⁵S** into the pellet, though the protein did **not enter** the cells.',
        sol: 'Incomplete removal.',
        scheme: [['Some coats still attached', 1], ['Protein did not enter', 1]],
        d: 3, c: 'analysis', t: [1],
      }),
    ]),
  ],
}));

// ---------------------------------------------------------------- additional items
add('transcription-mcq', mcq({
  stem: 'A cell keeps making mRNA copies of a gene, but a drug blocks its ribosomes. Which step of the central dogma is still working?',
  right: 'Transcription',
  wrong: ['Translation', 'Reverse transcription', 'Replication of RNA'],
  sol: 'mRNA is still being copied from DNA (transcription); only translation on ribosomes is blocked — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('rt-fill', fill({
  stem: 'Retroviruses such as HIV carry the enzyme ______ to copy their RNA genome into DNA.',
  acc: [['reverse transcriptase', 'RNA-dependent DNA polymerase']],
  sol: 'Reverse transcriptase.',
  d: 1, c: 'recall', t: [4],
}));
add('tmv-ar', ar({
  a: 'In tobacco mosaic virus the genetic material is RNA.',
  r: 'RNA can also act as a catalyst in some reactions.',
  key: 'b',
  sol: 'Both are true, but RNA’s catalytic ability does not explain why TMV uses RNA as its genetic material — option (b).',
  d: 3, c: 'understanding', t: [4],
}));
add('nhc-mcq', mcq({
  stem: 'Packaging of the beads-on-a-string chromatin fibre into a metaphase chromosome needs an additional set of proteins called',
  right: 'non-histone chromosomal (NHC) proteins',
  wrong: ['histone octamers only', 'DNA ligases', 'ribosomal proteins'],
  sol: 'Higher-level coiling of chromatin requires NHC proteins — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('heterochromatin-short', short({
  marks: 2,
  stem: 'Distinguish between euchromatin and heterochromatin with respect to packing, staining and activity.',
  model: '**Euchromatin** is **loosely packed**, **stains lightly** and is **transcriptionally active**. **Heterochromatin** is **densely packed**, **stains darkly** and is **transcriptionally inactive**; it is often found near centromeres and telomeres.',
  sol: 'Three points of contrast.',
  scheme: [['Euchromatin: loose, light, active', 1], ['Heterochromatin: dense, dark, inactive', 1]],
  d: 1, c: 'understanding', t: [3],
}));
add('polarity-mcq', mcq({
  stem: 'A single DNA strand is written 5′–GATTC–3′. At which end of this strand is the free phosphate group found?',
  right: 'At the 5′ end, beside the G',
  wrong: ['At the 3′ end, beside the C', 'At both ends equally', 'At neither end, because phosphates are only inside the chain'],
  sol: 'The 5′ end of a polynucleotide carries the free phosphate; the 3′ end carries a free OH — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('nucleoside-fill', fill({
  stem: 'A nitrogenous base joined to a pentose sugar by an N-glycosidic bond, without any phosphate, is called a ______.',
  acc: [['nucleoside']],
  sol: 'Nucleoside (adding a phosphate gives a nucleotide).',
  d: 1, c: 'recall', t: [2],
}));
{
  const turns = 25, pitch = 3.4, len = Math.round(turns * pitch * 10) / 10;
  add('pitch-num', num({
    stem: 'A DNA segment in B-form makes exactly 25 complete helical turns. Using a pitch of 3.4 nm, how long is the segment in nanometres?',
    value: len, tol: 0.01, unit: 'nm',
    sol: r`Length $= 25 \times 3.4 = ${len}$ nm.`,
    scheme: [[`${len} nm`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 85 || 'value');
}
add('ori-mcq', mcq({
  stem: 'Replication of the E. coli chromosome does not start at random points. It begins at a definite region called the',
  right: 'origin of replication (ori)',
  wrong: ['promoter', 'operator', 'centromere'],
  sol: 'Replication starts at the origin of replication — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('dispersive-mcq', mcq({
  stem: 'Suppose DNA replicated dispersively, each daughter strand being a patchwork of old and new pieces. After two generations in ¹⁴N, what would the Meselson–Stahl gradient have shown?',
  right: 'A single band, lighter than the first-generation hybrid band but heavier than light DNA',
  wrong: ['Equal hybrid and light bands', 'One heavy and one light band', 'A single heavy band'],
  sol: 'Dispersive replication dilutes ¹⁵N evenly into every molecule, giving one band that moves steadily towards light; the observed separate hybrid and light bands ruled this out — option (@K).',
  d: 4, c: 'analysis', t: [5],
}));
