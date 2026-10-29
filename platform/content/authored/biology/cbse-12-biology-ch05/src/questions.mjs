// ch05 Molecular Basis of Inheritance — question bank. AR keys planned: a a a b a c a.
import { mk, add, r } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { complement, transcribe, codingToMrna, translate, codon, chargaff, lengthM, nucleosomes, meselson, codonCount } from './calc.mjs';
import { LANES } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const keyText = (q) => q.options.find((o) => o.id === q.answer.option_ids[0]).text_md;

// ---------------------------------------------------------------- t01 genetic material
add('dnase-mcq', mcq({
  stem: 'An extract of heat-killed S-strain pneumococci is treated with DNase and then mixed with live R-strain bacteria before injection into mice. What is the most likely result?',
  right: 'The mice survive, because the DNA that transforms R cells has been destroyed.',
  wrong: ['The mice die, because the S-strain proteins are still present.', 'The mice die, because DNase converts R cells into S cells.', 'The mice survive, because DNase kills the live R bacteria.'],
  sol: 'Avery, MacLeod and McCarty found that only DNase stopped transformation: without intact DNA, R cells are not transformed, so the mice survive — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('griffith-tf', tf({
  stem: 'Griffith identified DNA as the transforming principle in his experiments with pneumococci.',
  key: 'f',
  sol: 'False. Griffith showed that a transforming principle existed; Avery, MacLeod and McCarty later identified it as DNA.',
  d: 1, c: 'recall', t: [1],
}));
add('hershey-ar', ar({
  a: 'In the Hershey–Chase experiment, bacteria infected with phages grown in radioactive phosphorus became radioactive.',
  r: 'Phosphorus is present in DNA but not in protein, and only the phage DNA entered the bacteria.',
  key: 'a',
  sol: 'Both are true, and R explains A: ³²P labels DNA, which is the part that enters the bacterium — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('hershey-mcq', mcq({
  stem: 'In the Hershey–Chase experiment, phages labelled with ³⁵S infected bacteria; the culture was then blended and centrifuged. Where was most of the radioactivity found, and why?',
  right: 'In the supernatant, because the labelled protein coats stayed outside the bacteria',
  wrong: ['In the bacterial pellet, because protein entered the bacteria', 'In the bacterial pellet, because sulphur is part of DNA', 'Nowhere, because ³⁵S is lost during blending'],
  sol: 'Sulphur labels protein. The protein coats were removed by blending and stayed in the lighter supernatant, while the bacteria (pellet) were not radioactive — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('criteria-short', short({
  marks: 2,
  stem: 'Give two reasons why DNA is a better genetic material than RNA for most organisms.',
  model: 'DNA is **chemically more stable**: RNA has a reactive **2′-OH** group on every nucleotide, which makes it easily degraded, and DNA uses **thymine** instead of uracil. RNA also **mutates faster**, while genetic material should change only slowly; the double-stranded DNA helix with complementary strands is better at storing information.',
  sol: 'Stability (2′-OH, thymine) and slower mutation.',
  scheme: [['Stability reason', 1], ['Mutation rate or double-stranded reason', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('griffith-short', short({
  marks: 3,
  stem: 'Describe Griffith’s experiment with pneumococci and state what it showed.',
  model: 'Griffith used **S-strain** (smooth, capsulated, virulent) and **R-strain** (rough, non-virulent) *Streptococcus pneumoniae*. Live S killed mice; live R did not; **heat-killed S** did not. But **heat-killed S mixed with live R killed the mice**, and **live S bacteria** were recovered from them. He concluded that some **transforming principle** from the dead S cells had changed R cells into S cells; its chemical nature was not known.',
  sol: 'Four injections; transformation.',
  scheme: [['S and R strains with their effects', 1], ['Heat-killed S + live R killed mice; live S recovered', 1], ['Conclusion: transforming principle', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('genetic-long', long({
  stem: 'Describe the experiments of Avery, MacLeod and McCarty and of Hershey and Chase, and explain how together they established that DNA is the genetic material.',
  model: '**Background.** Griffith had shown that heat-killed S-strain pneumococci could transform live R-strain bacteria into virulent S bacteria, through an unknown transforming principle.\n\n**Avery, MacLeod and McCarty.** They purified DNA, RNA and proteins from heat-killed S cells and tested each for its ability to transform R cells. Only DNA transformed them. Protease and RNase did not prevent transformation, but DNase did. So the transforming principle was DNA.\n\n**Hershey and Chase.** They grew bacteriophages in medium with radioactive phosphorus (which labels DNA) or radioactive sulphur (which labels protein). The labelled phages infected bacteria, which were then blended to remove the viral coats and centrifuged. Bacteria infected with ³²P phages were radioactive; those infected with ³⁵S phages were not. So only DNA entered the bacteria and directed the making of new viruses.\n\n**Conclusion.** One experiment identified DNA chemically as the transforming agent; the other showed that DNA, not protein, is the material passed into cells to direct heredity.',
  sol: 'Avery (enzymes); Hershey–Chase (isotopes); combined conclusion.',
  scheme: [['Avery’s purification and transformation by DNA only', 1], ['Effect of protease, RNase, DNase', 1], ['Hershey–Chase labelling with ³²P and ³⁵S', 1], ['Results after blending and centrifugation', 1], ['Combined conclusion', 1]],
  wl: [80, 180],
  d: 3, c: 'understanding', t: [1],
}));
add('rna-ar', ar({
  a: 'RNA viruses mutate and evolve faster than DNA-based organisms.',
  r: 'Some RNA molecules can act as biological catalysts.',
  key: 'b',
  sol: 'Both are true, but RNA’s catalytic ability does not explain fast mutation; that is due to RNA’s instability and reactivity — option (b).',
  d: 3, c: 'analysis', t: [1],
}));

// ---------------------------------------------------------------- t02 structure and packaging
{
  const c = chargaff('C', 18);
  add('chargaff-mcq', mcq({
    stem: 'In a double-stranded DNA, cytosine makes up 18 percent of the bases. What percentage is adenine?',
    right: `${c.A} percent`,
    wrong: ['18 percent', '64 percent', '36 percent'],
    sol: `C = G = 18 percent, so G + C = 36 percent; A + T = 64 percent, and A = T = ${c.A} percent — option (@K).`,
    d: 2, c: 'application', t: [2],
  }), (q) => keyText(q) === `${chargaff('C', 18).A} percent` || 'key');
}
{
  const c = chargaff('G', 35);
  add('chargaff-num', num({
    stem: 'A double-stranded DNA sample contains 35 percent guanine. What percentage of its bases is adenine?',
    value: c.A, unit: '%',
    sol: r`G = C = 35, so G + C = 70; A + T $= 100 - 70 = 30$; A $= 30 \div 2 = ${c.A}$ percent.`,
    scheme: [[`${c.A}%`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === (100 - 70) / 2 || 'value');
}
add('hbond-num', num({
  stem: 'A 12 bp stretch of DNA has 5 A–T pairs and 7 G–C pairs. How many hydrogen bonds hold its two strands together?',
  value: 5 * 2 + 7 * 3,
  sol: r`A–T has 2 and G–C has 3 hydrogen bonds: $5 \times 2 + 7 \times 3 = 10 + 21 = 31$.`,
  scheme: [['31', 1]],
  d: 3, c: 'application', t: [2],
}), (q) => q.answer.value === 31 || 'value');
{
  const um = Math.round(lengthM(2e4) * 1e6 * 10) / 10;
  add('length-num', num({
    stem: 'A plasmid has 20 000 base pairs. Taking 0.34 nm between adjacent base pairs, what is its length in micrometres?',
    value: um, tol: 0.05, unit: 'µm',
    sol: r`$20\,000 \times 0.34\ \text{nm} = 6800\ \text{nm} = ${um}\ \mu\text{m}$.`,
    scheme: [[`${um} µm`, 1]],
    d: 3, c: 'application', t: [2],
  }), (q) => Math.abs(q.answer.value - 6.8) < 1e-9 || 'value');
}
{
  const n = nucleosomes(6.6e9) / 1e6;
  add('nucleosome-num', num({
    stem: 'A human diploid cell has about 6.6 × 10⁹ bp of DNA. If each nucleosome holds about 200 bp, about how many nucleosomes are there? Give your answer in millions.',
    value: n, tol: 0.5, unit: 'million',
    sol: r`$\dfrac{6.6 \times 10^{9}}{200} = 3.3 \times 10^{7}$, and $3.3 \times 10^{7} \div 10^{6} = ${n}$, so about ${n} million.`,
    scheme: [[`${n} million`, 1]],
    d: 3, c: 'application', t: [2],
  }), (q) => q.answer.value === 33 || 'value');
}
add('euchromatin-mcq', mcq({
  stem: 'Which kind of chromatin is loosely packed and transcriptionally active?',
  right: 'Euchromatin',
  wrong: ['Heterochromatin', 'Satellite DNA', 'The histone octamer'],
  sol: 'Euchromatin is loosely packed, stains lightly and is transcriptionally active — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('histone-mcq', mcq({
  stem: 'Histones carry a positive charge because they are rich in',
  right: 'the basic amino acids lysine and arginine',
  wrong: ['the acidic amino acids aspartate and glutamate', 'phosphate groups', 'thymine and uracil'],
  sol: 'Lysine and arginine have positively charged side chains, which attract the negatively charged DNA — option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('antiparallel-fill', fill({
  stem: 'In the DNA double helix, one strand runs 5′ → 3′ and the other 3′ → 5′; the strands are therefore said to be ______.',
  acc: [['antiparallel', 'anti-parallel']],
  sol: 'Antiparallel.',
  d: 1, c: 'recall', t: [2],
}));
add('bonds-match', match({
  stem: 'Match each structure (column I) with its role (column II).',
  pairs: [
    ['Phosphodiester linkage', 'Joins nucleotides along a strand'],
    ['N-glycosidic linkage', 'Joins a base to its sugar'],
    ['Hydrogen bonds', 'Hold complementary bases together'],
    ['Histone octamer', 'Core around which DNA wraps in a nucleosome'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Phosphodiester → backbone links; N-glycosidic → base–sugar; hydrogen bonds → base pairs; histone octamer → nucleosome core.',
  d: 2, c: 'understanding', t: [2],
}));
add('purine-ar', ar({
  a: 'The distance between the two sugar-phosphate backbones of DNA is the same all along the helix.',
  r: 'A purine always pairs with a pyrimidine.',
  key: 'a',
  sol: 'Both are true; a two-ring purine always faces a one-ring pyrimidine, so every base pair has the same width — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('helix-short', short({
  marks: 3,
  stem: 'List the main features of the Watson–Crick double-helix model of DNA.',
  model: '1. Two **polynucleotide chains** run **antiparallel**, with the sugar-phosphate backbone outside and bases inside.\n\n2. Bases pair **complementarily**: **A with T** by two hydrogen bonds and **G with C** by three; a purine always faces a pyrimidine.\n\n3. The chains coil as a **right-handed helix** with a **pitch of 3.4 nm**, about **10 bp per turn**, **0.34 nm** between base pairs; base pairs stack on one another, adding stability.',
  sol: 'Antiparallel chains; complementary pairing; helix dimensions.',
  scheme: [['Antiparallel strands, backbone outside', 1], ['Complementary pairing with H-bond numbers', 1], ['Right-handed helix and dimensions', 1]],
  d: 2, c: 'recall', t: [2],
}));
add('packaging-short', short({
  marks: 2,
  stem: 'A human diploid cell contains about 2.2 m of DNA in a nucleus a few micrometres across. Explain how eukaryotic cells package this DNA.',
  model: 'The negatively charged DNA wraps around a positively charged **histone octamer** (histones are rich in lysine and arginine), forming **nucleosomes** of about 200 bp. Nucleosomes form a **beads-on-string** chromatin fibre, which is coiled and looped further with **non-histone proteins**, condensing most into **chromosomes** at metaphase.',
  sol: 'Histone octamer → nucleosome → fibre → higher coils.',
  scheme: [['Histone octamer and nucleosome', 1], ['Further coiling to chromatin fibres and chromosomes', 1]],
  d: 3, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 replication
add('ms-mcq', mcq({
  stem: 'After two generations in ¹⁴N medium, what does semi-conservative replication predict for E. coli DNA that started fully heavy?',
  right: 'Half hybrid and half light DNA',
  wrong: ['All hybrid DNA', 'Half heavy and half light DNA', 'All light DNA'],
  sol: 'Hybrid fraction after n generations = 2/2ⁿ; for n = 2 this is 1/2, and the rest is light — option (@K).',
  d: 2, c: 'application', t: [3],
}), () => meselson(2).hybrid === 0.5 && meselson(2).light === 0.5 || 'ms');
{
  const f = meselson(3);
  add('ms-num', num({
    stem: 'E. coli with fully heavy (¹⁵N) DNA is grown for three generations in ¹⁴N medium. What percentage of the DNA molecules will be light (¹⁴N/¹⁴N)?',
    value: f.light * 100, unit: '%',
    sol: r`After 3 generations there are $2^3 = 8$ molecules, of which 2 are hybrid. Light $= \dfrac{6}{8} \times 100 = ${f.light * 100}$ percent.`,
    scheme: [[`${f.light * 100}%`, 1]],
    d: 3, c: 'application', t: [3],
  }), (q) => q.answer.value === 75 || 'value');
}
add('conservative-mcq', mcq({
  stem: 'Suppose DNA replication were conservative (the parent double helix stays intact and a wholly new helix is made). What would Meselson and Stahl have seen after one generation in ¹⁴N medium?',
  right: 'A heavy band and a light band, and no hybrid band',
  wrong: ['A single hybrid band', 'A single heavy band', 'A hybrid band and a light band'],
  sol: 'Conservative replication keeps one fully heavy molecule and makes one fully light molecule, so two bands and no hybrid. The observed single hybrid band ruled it out — option (@K).',
  d: 4, c: 'analysis', t: [3],
}));
add('lagging-mcq', mcq({
  stem: 'Why is one new strand made discontinuously at a replication fork?',
  right: 'DNA polymerase can add nucleotides only in the 5′ → 3′ direction.',
  wrong: ['DNA ligase can join nucleotides only in the 3′ → 5′ direction.', 'The template strands are parallel.', 'Okazaki fragments are made by RNA polymerase.'],
  sol: 'On the strand whose template runs the other way, synthesis must restart repeatedly, in short 5′ → 3′ pieces (Okazaki fragments) — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('ligase-tf', tf({
  stem: 'DNA ligase joins the Okazaki fragments of the lagging strand.',
  key: 't',
  sol: 'True. Okazaki fragments are later joined by DNA ligase.',
  d: 1, c: 'recall', t: [3],
}));
add('fork-short', short({
  marks: 3,
  stem: 'At a replication fork, template strand X runs 3′ → 5′ in the direction in which the fork moves, and template strand Y runs 5′ → 3′ in that direction. Predict on which template the new strand is made continuously, explain why, and name the enzymes involved.',
  model: 'On **template X**. **DNA-dependent DNA polymerase** adds nucleotides only **5′ → 3′**, so each new strand is antiparallel to its template. On X the new strand grows 5′ → 3′ **towards the fork, continuously**: the **leading strand**. On Y the new strand must grow away from the fork, so it is made **discontinuously** as **Okazaki fragments**: the **lagging strand**. **DNA ligase** joins the fragments.',
  sol: 'Apply the 5′ → 3′ rule to each template.',
  scheme: [['Template X gives the continuous (leading) strand', 1], ['Reason: polymerase works 5′ → 3′; lagging strand as Okazaki fragments on Y', 1], ['DNA polymerase and DNA ligase named', 1]],
  d: 3, c: 'application', t: [3],
}));
add('original-num', num({
  stem: 'A double-stranded DNA molecule replicates semi-conservatively three times in a row. Of all the DNA molecules formed, how many still contain a strand of the original molecule?',
  value: 2,
  sol: r`The two original strands are never broken up; each stays in one molecule. Of the $2^3 = 8$ molecules, the hybrid fraction is $\dfrac{2}{8}$, so $8 \times \dfrac{2}{8} = 2$ molecules contain an original strand.`,
  scheme: [['2', 1]],
  d: 3, c: 'application', t: [3],
}), (q) => q.answer.value === meselson(3).hybrid * 2 ** 3 || 'value');
add('ms-long', long({
  stem: 'Describe the experiment of Meselson and Stahl. What results did they obtain after one and two generations, and how did these prove that DNA replicates semi-conservatively?',
  model: '**Set-up.** E. coli was grown for many generations in a medium containing ¹⁵NH₄Cl as the only nitrogen source, so all its DNA became heavy. The cells were then transferred to a medium with normal ¹⁴NH₄Cl, and samples were taken after each generation (about 20 minutes).\n\n**Separation.** DNA from each sample was centrifuged in a caesium chloride density gradient, where heavy, hybrid and light DNA settle at different levels.\n\n**Results.** Before transfer there was one heavy band. After one generation there was a single band of intermediate (hybrid) density. After two generations there were two bands of equal size, hybrid and light.\n\n**Interpretation.** If replication is semi-conservative, each daughter molecule keeps one old (¹⁵N) strand and gains one new (¹⁴N) strand, so all first-generation DNA is hybrid. In the second generation, the two old strands remain in two hybrid molecules while the new templates give light molecules, giving equal hybrid and light. Conservative replication would have given heavy and light bands after one generation. So DNA replicates semi-conservatively.',
  sol: 'Set-up; CsCl; results; interpretation vs conservative model.',
  scheme: [['Growth in ¹⁵N then transfer to ¹⁴N', 1], ['CsCl density gradient centrifugation', 1], ['Results after one and two generations', 1.5], ['Interpretation as semi-conservative', 1.5]],
  wl: [80, 190],
  d: 3, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 transcription, code, translation
add('pol2-mcq', mcq({
  stem: 'In eukaryotes, which RNA polymerase transcribes the precursor of mRNA (hnRNA)?',
  right: 'RNA polymerase II',
  wrong: ['RNA polymerase I', 'RNA polymerase III', 'DNA polymerase'],
  sol: 'Pol I makes rRNAs (28S, 18S, 5.8S); pol II makes hnRNA; pol III makes tRNA, 5S rRNA and snRNAs — option (@K).',
  d: 2, c: 'recall', t: [4],
}));
add('ribozyme-ar', ar({
  a: 'In bacteria, the 23S rRNA of the ribosome acts as a ribozyme.',
  r: 'It catalyses the formation of peptide bonds during translation.',
  key: 'a',
  sol: 'Both are true; the 23S rRNA is called a ribozyme because it catalyses peptide-bond formation — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
{
  const m = codingToMrna('ATGCCAGTA');
  add('mrna-mcq', mcq({
    stem: 'The coding strand of a gene reads 5′–ATGCCAGTA–3′. What is the sequence of the mRNA transcribed from it?',
    right: `5′–${m}–3′`,
    wrong: ['5′–UACGGUCAU–3′', '3′–ATGCCAGTA–5′', '5′–TACGGTCAT–3′'],
    sol: `mRNA has the same sequence as the coding strand, with U in place of T: 5′–${m}–3′ — option (@K). (@1) is complementary to the coding strand.`,
    d: 2, c: 'application', t: [4],
  }), (q) => keyText(q) === `5′–${codingToMrna('ATGCCAGTA')}–3′` || 'key');
}
{
  const p = translate('AUGUUUGGCUAA');
  add('translate-mcq', mcq({
    stem: 'Which polypeptide is coded by the mRNA 5′–AUG UUU GGC UAA–3′? (AUG = Met, UUU = Phe, GGC = Gly, UAA = stop)',
    right: p.join('–'),
    wrong: ['Met–Phe–Gly–Stop–Met', 'Phe–Gly', 'Met–Gly–Phe'],
    sol: `Reading from AUG: ${p.join(', ')}; UAA is a stop codon, so no amino acid is added for it — option (@K).`,
    d: 3, c: 'application', t: [4],
  }), (q) => keyText(q) === translate('AUGUUUGGCUAA').join('–') || 'key');
}
add('stop-mcq', mcq({
  stem: 'Which of the following is NOT a stop codon?',
  right: 'UGG',
  wrong: ['UAA', 'UAG', 'UGA'],
  sol: `UGG codes for ${codon('UGG')} (tryptophan); UAA, UAG and UGA are the three stop codons — option (@K).`,
  d: 2, c: 'recall', t: [4],
}), () => codon('UGG') === 'Trp' && ['UAA', 'UAG', 'UGA'].every((c) => codon(c) === 'Stop') || 'code');
add('frameshift-mcq', mcq({
  stem: 'A single base is deleted near the start of the coding region of a gene. What is the most likely effect on the protein?',
  right: 'Every codon after the deletion is misread, so most amino acids after that point change.',
  wrong: ['Only one amino acid changes, and the rest of the protein is normal.', 'The protein is unchanged, because the code is degenerate.', 'One amino acid is removed, and the rest of the protein is normal.'],
  sol: 'The code is read contiguously in triplets; deleting one base shifts the reading frame, so all downstream codons change (frameshift) — option (@K). Deleting three bases would remove one amino acid.',
  d: 3, c: 'analysis', t: [4],
}));
add('doublet-num', num({
  stem: 'If the genetic code used two bases per codon (a doublet code), how many different codons would be possible with four kinds of bases?',
  value: codonCount(2),
  sol: r`$4^2 = ${codonCount(2)}$ codons — too few for 20 amino acids, which is why the code is a triplet ($4^3 = 64$).`,
  scheme: [['16', 1]],
  d: 2, c: 'application', t: [4],
}), (q) => q.answer.value === 16 || 'value');
add('anticodon-mcq', mcq({
  stem: 'A tRNA has the anticodon 3′–UAC–5′. Which mRNA codon does it pair with, and which amino acid does it carry?',
  right: '5′–AUG–3′; methionine',
  wrong: ['5′–UAC–3′; tyrosine', '5′–CAU–3′; histidine', '5′–AUG–3′; tyrosine'],
  sol: 'The anticodon pairs antiparallel and complementary: 3′–UAC–5′ pairs with 5′–AUG–3′, which codes for methionine — option (@K).',
  d: 3, c: 'application', t: [4],
}), () => codon('AUG') === 'Met' && complement('TAC') === 'ATG' || 'code');
{
  const aa = 75 / 3 - 1;
  add('length-aa-num', num({
    stem: 'An mRNA has 75 nucleotides from the first base of its start codon to the last base of its stop codon. How many amino acids will the polypeptide contain?',
    value: aa,
    sol: r`$75 \div 3 = 25$ codons; the last is a stop codon with no amino acid, so $25 - 1 = ${aa}$.`,
    scheme: [[`${aa}`, 1]],
    d: 3, c: 'application', t: [4],
  }), (q) => q.answer.value === 24 || 'value');
}
add('degenerate-fill', fill({
  stem: 'Because some amino acids are coded by more than one codon, the genetic code is said to be ______.',
  acc: [['degenerate']],
  sol: 'Degenerate.',
  d: 1, c: 'recall', t: [4],
}));
add('reverse-tf', tf({
  stem: 'In some viruses, genetic information flows from RNA to DNA; this is called reverse transcription.',
  key: 't',
  sol: 'True. Retroviruses copy their RNA into DNA by reverse transcription.',
  d: 1, c: 'recall', t: [4],
}));
{
  const tpl = 'TACGGATTC';
  const coding = complement(tpl);
  const mrna = transcribe(tpl);
  add('template-short', short({
    marks: 2,
    stem: `The template strand of a stretch of DNA reads 3′–${tpl}–5′. Write the coding strand and the mRNA, with their 5′ and 3′ ends.`,
    model: `Coding strand: **5′–${coding}–3′** (complementary to the template).\n\nmRNA: **5′–${mrna}–3′** (same as the coding strand, with U for T).`,
    sol: 'Complement the template; replace T with U for the mRNA.',
    scheme: [['Coding strand with ends', 1], ['mRNA with ends', 1]],
    wl: [5, 40],
    d: 3, c: 'application', t: [4],
  }), (q) => q.answer.model_answer_md.includes(complement('TACGGATTC')) && q.answer.model_answer_md.includes(transcribe('TACGGATTC')) || 'seq');
}
add('processing-short', short({
  marks: 3,
  stem: 'Describe the three steps by which the primary transcript (hnRNA) of a eukaryotic gene is processed into mature mRNA.',
  model: '1. **Splicing:** the **introns** (non-coding intervening sequences) are removed and the **exons** are joined in order.\n\n2. **Capping:** an unusual nucleotide, **methyl guanosine triphosphate**, is added to the **5′ end**.\n\n3. **Tailing:** **adenylate residues (200–300)** are added to the **3′ end** in a template-independent way (poly-A tail).\n\nThe processed mRNA is then transported out of the nucleus for translation.',
  sol: 'Splicing, capping, tailing.',
  scheme: [['Splicing', 1], ['Capping', 1], ['Tailing', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('code-short', short({
  marks: 3,
  stem: 'State and explain any three features of the genetic code.',
  model: '1. **Triplet:** each codon has three bases; 64 codons, of which 61 code for amino acids and 3 (UAA, UAG, UGA) are stop codons.\n\n2. **Degenerate:** some amino acids are coded by more than one codon.\n\n3. **Unambiguous and nearly universal:** each codon codes for only one amino acid, and the same code is used from bacteria to humans, with a few exceptions. (Also: read contiguously without punctuation; AUG codes for methionine and acts as the start codon.)',
  sol: 'Any three features with explanation.',
  scheme: [['First feature', 1], ['Second feature', 1], ['Third feature', 1]],
  d: 2, c: 'recall', t: [4],
}));
add('trna-short', short({
  marks: 2,
  stem: 'Why is tRNA called an adapter molecule? Name the two key regions that make this possible.',
  model: 'tRNA links the **language of nucleic acids** (codons) with the **language of proteins** (amino acids). Its **anticodon loop** pairs with a codon on the mRNA, and its **amino acid acceptor end** carries the matching amino acid.',
  sol: 'Anticodon and acceptor end connect codon to amino acid.',
  scheme: [['Links codons to amino acids', 1], ['Anticodon loop and amino acid acceptor end', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('transcription-long', long({
  stem: 'Draw and label a transcription unit. Describe transcription in bacteria, and explain how the process and its products differ in eukaryotes.',
  model: '**Transcription unit (diagram).** Promoter (upstream, where RNA polymerase binds), structural gene, terminator (downstream); the template strand runs 3′ → 5′ and the coding strand 5′ → 3′.\n\n**In bacteria.** A single DNA-dependent RNA polymerase transcribes all RNAs. It binds the promoter with the help of the initiation factor σ, opens the DNA, and polymerises ribonucleotides 5′ → 3′ using one strand as template. At the terminator, the termination factor ρ helps release the RNA. Because there is no nuclear membrane and no processing, translation can begin while transcription is still going on.\n\n**In eukaryotes.** Three RNA polymerases work in the nucleus: pol I makes rRNAs (28S, 18S, 5.8S), pol II makes hnRNA, the precursor of mRNA, and pol III makes tRNA, 5S rRNA and snRNAs. Genes are split into exons and introns. The hnRNA is processed: introns are removed by splicing, a methyl guanosine triphosphate cap is added at the 5′ end and a poly-A tail at the 3′ end. Only the mature mRNA leaves the nucleus for translation.',
  sol: 'Labelled unit; bacterial process with σ and ρ; three polymerases; processing.',
  scheme: [['Labelled transcription unit', 1], ['Bacterial transcription with σ and ρ', 1.5], ['Three eukaryotic RNA polymerases with products', 1], ['Split genes and processing', 1.5]],
  wl: [80, 200],
  d: 3, c: 'understanding', t: [4],
}));
add('translation-long', long({
  stem: 'Describe the process of translation in bacteria, including the role of tRNA and of the ribosome.',
  model: '**Charging.** Each amino acid is activated in the presence of ATP and linked to its specific tRNA (aminoacylation of tRNA).\n\n**tRNA as adapter.** The tRNA’s anticodon pairs with a codon on the mRNA, and its acceptor end carries the amino acid; a special initiator tRNA carries methionine, and there is no tRNA for the stop codons.\n\n**Initiation.** The small ribosomal subunit binds the mRNA and finds the start codon AUG; the initiator tRNA pairs with it, and the large subunit joins.\n\n**Elongation.** Charged tRNAs enter one by one according to the codons. The ribosome joins each new amino acid to the growing chain with a peptide bond; in bacteria the 23S rRNA catalyses this step, acting as a ribozyme. The ribosome moves along the mRNA codon by codon.\n\n**Termination.** When a stop codon (UAA, UAG or UGA) is reached, a release factor binds, and the polypeptide is released from the ribosome. Untranslated regions at both ends of the mRNA help translation to proceed efficiently.',
  sol: 'Charging; adapter; initiation at AUG; elongation with ribozyme; termination.',
  scheme: [['Charging of tRNA', 1], ['tRNA as adapter with anticodon', 1], ['Initiation at AUG with ribosomal subunits', 1], ['Elongation, peptide bonds, 23S rRNA ribozyme', 1], ['Termination by a release factor at a stop codon', 1]],
  wl: [80, 190],
  d: 3, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- t05 lac operon
add('inducer-mcq', mcq({
  stem: 'What switches on the lac operon in E. coli?',
  right: 'Lactose, which inactivates the repressor',
  wrong: ['Glucose, which binds the operator', 'The repressor, which binds RNA polymerase', 'β-galactosidase, which binds the promoter'],
  sol: 'Lactose acts as the inducer: it binds the repressor, which can then no longer bind the operator — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('repressor-mcq', mcq({
  stem: 'A mutant E. coli has a defective i gene and makes no functional repressor. How will its lac operon behave?',
  right: 'The structural genes are transcribed all the time, with or without lactose.',
  wrong: ['The structural genes are never transcribed.', 'The operon is switched on only when lactose is present.', 'Only the i gene is transcribed.'],
  sol: 'Without a functional repressor nothing blocks the operator, so RNA polymerase transcribes z, y and a continuously — option (@K).',
  d: 3, c: 'analysis', t: [5],
}));
add('operator-mcq', mcq({
  stem: 'In the absence of lactose, what is bound to the operator of the lac operon?',
  right: 'The repressor protein',
  wrong: ['RNA polymerase', 'Lactose', 'β-galactosidase'],
  sol: 'The repressor made by the i gene binds the operator and prevents transcription — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('lac-ar', ar({
  a: 'The lac operon is an example of negative regulation.',
  r: 'The repressor protein of the lac operon is coded by the z gene.',
  key: 'c',
  sol: 'A is true: the repressor switches the operon off. R is false: the repressor is coded by the regulatory i gene; z codes for β-galactosidase — option (c).',
  d: 2, c: 'understanding', t: [5],
}));
add('lac-short', short({
  marks: 3,
  stem: 'E. coli growing in a medium without lactose is transferred to a medium containing only lactose as its sugar. Explain the changes in its lac operon.',
  model: 'Before transfer, the **repressor** (from the i gene) is bound to the **operator**, so RNA polymerase cannot transcribe the operon; very little enzyme is made. After transfer, a few **permease** molecules let **lactose** in. Lactose acts as the **inducer**: it binds and **inactivates the repressor**, which leaves the operator. RNA polymerase now transcribes **z, y and a**, so **β-galactosidase** breaks lactose into glucose and galactose and **permease** brings in more lactose. When lactose runs out, the repressor binds again.',
  sol: 'Off → inducer inactivates repressor → on → off again.',
  scheme: [['Repressor on operator before transfer', 1], ['Lactose inactivates repressor; transcription of z, y, a', 1], ['Roles of the enzymes and switching off later', 1]],
  d: 3, c: 'application', t: [5],
}));
add('lac-long', long({
  stem: 'With a labelled diagram, explain the structure and working of the lac operon. Why is it called negative regulation?',
  model: '**Structure (diagram).** The lac operon of E. coli, described by Jacob and Monod, has a regulatory gene i, a promoter p, an operator o and three structural genes: z (β-galactosidase, which hydrolyses lactose into glucose and galactose), y (permease, which increases the cell’s permeability to lactose) and a (transacetylase).\n\n**In the absence of lactose.** The i gene is transcribed and translated to make the repressor. The repressor binds the operator, so RNA polymerase cannot transcribe the structural genes; the operon is off.\n\n**In the presence of lactose.** Lactose, the inducer, enters through permease and binds the repressor, changing its shape so that it cannot bind the operator. RNA polymerase then binds the promoter and transcribes z, y and a as one mRNA, and the three enzymes are made.\n\n**Negative regulation.** The operon is controlled by a repressor that switches transcription off; the inducer works only by removing this block. When lactose is used up, the repressor binds the operator again.',
  sol: 'Parts and products; off without lactose; on with inducer; why negative.',
  scheme: [['Labelled diagram with i, p, o, z, y, a', 1], ['Products of z, y, a', 1], ['Off: repressor bound to operator', 1], ['On: lactose inactivates repressor; transcription', 1], ['Why negative regulation', 1]],
  wl: [80, 180],
  d: 3, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- t06 HGP and DNA fingerprinting
add('hgp-mcq', mcq({
  stem: 'According to the Human Genome Project, which human chromosome carries the most genes?',
  right: 'Chromosome 1',
  wrong: ['Chromosome Y', 'Chromosome 21', 'Chromosome X'],
  sol: 'Chromosome 1 has the most genes (2968) and the Y chromosome the fewest (231) — option (@K).',
  d: 2, c: 'recall', t: [6],
}));
add('vector-mcq', mcq({
  stem: 'Which vectors were used to clone DNA fragments for sequencing in the Human Genome Project?',
  right: 'BAC (bacterial artificial chromosomes) and YAC (yeast artificial chromosomes)',
  wrong: ['Only plasmids of E. coli', 'Retroviruses', 'Mitochondria'],
  sol: 'The fragments were cloned in hosts using BAC and YAC vectors, then sequenced by automated sequencers — option (@K).',
  d: 2, c: 'recall', t: [6],
}));
add('vntr-mcq', mcq({
  stem: 'Why are VNTRs used as probes in DNA fingerprinting?',
  right: 'The number of repeats varies from person to person, so the fragment pattern differs between individuals.',
  wrong: ['They code for proteins that differ between people.', 'They are identical in all humans.', 'They are found only in the Y chromosome.'],
  sol: 'VNTRs are non-coding satellite repeats whose copy number is highly polymorphic, giving each person a distinct pattern of fragment sizes — option (@K).',
  d: 3, c: 'understanding', t: [6],
}));
{
  const upper = Math.round(3164.7 * 0.02 * 10) / 10;
  add('coding-num', num({
    stem: 'The human genome has 3164.7 million bases, and less than 2 percent of it codes for proteins. What is the upper limit, in millions of bases, of the protein-coding DNA? Give one decimal place.',
    value: upper, tol: 0.05, unit: 'million',
    sol: r`$3164.7 \times 0.02 = ${upper}$ million bases (the coding DNA is less than this).`,
    scheme: [[`${upper} million`, 1]],
    d: 3, c: 'application', t: [6],
  }), (q) => Math.abs(q.answer.value - 63.3) < 0.05 || 'value');
}
{
  const d = Math.round(3164.7 * 0.001 * 100) / 100;
  add('diff-num', num({
    stem: 'Any two people share about 99.9 percent of the 3164.7 million bases of the human genome. At about how many million positions do they differ? Give two decimal places.',
    value: d, tol: 0.01, unit: 'million',
    sol: r`They differ at 0.1 percent of positions: $3164.7 \times 0.001 \approx ${d}$ million.`,
    scheme: [[`${d} million`, 1]],
    d: 3, c: 'application', t: [6],
  }), (q) => Math.abs(q.answer.value - 3.16) < 0.011 || 'value');
}
add('ss-mcq', mcq({
  stem: 'A nucleic acid sample from a virus contains 30 percent A, 20 percent T, 25 percent G and 25 percent C. What can you conclude?',
  right: 'It is single-stranded DNA, because it contains T but A is not equal to T.',
  wrong: ['It is double-stranded DNA, because G equals C.', 'It is RNA, because it contains four bases.', 'It is double-stranded RNA, because A is more than T.'],
  sol: 'Thymine shows it is DNA; in double-stranded DNA A must equal T, but here A (30) is not equal to T (20), so it is single-stranded — option (@K).',
  d: 4, c: 'analysis', t: [2],
}));
add('paternity-ar', ar({
  a: 'Every band in a child’s DNA fingerprint matches a band of one of the biological parents.',
  r: 'A child inherits half its chromosomes from each parent.',
  key: 'a',
  sol: 'Both are true; because each VNTR allele comes from the mother or the father, every band in the child must be present in one of them — option (a).',
  d: 2, c: 'understanding', t: [6],
}));
add('twins-tf', tf({
  stem: 'Identical twins have identical DNA fingerprints.',
  key: 't',
  sol: 'True. Identical twins come from one zygote and have the same DNA, so their VNTR patterns are the same.',
  d: 2, c: 'understanding', t: [6],
}));
add('hgp-short', short({
  marks: 2,
  stem: 'State any four goals of the Human Genome Project.',
  model: '(1) Identify all the approximately **20,000–25,000 genes** in human DNA; (2) determine the **sequences of the 3 billion base pairs**; (3) **store** this information in databases; (4) **improve tools** for data analysis. (Also: transfer related technologies to other sectors; address the ethical, legal and social issues.)',
  sol: 'Any four goals.',
  scheme: [['Two goals', 1], ['Two more goals', 1]],
  d: 1, c: 'recall', t: [6],
}));
add('vntr-short', short({
  marks: 2,
  stem: 'What is meant by polymorphism in DNA, and why is it the basis of DNA fingerprinting?',
  model: '**Polymorphism** is the occurrence of **variations in a DNA sequence** (such as different numbers of tandem repeats) between individuals of a population; it arises by mutation and is inherited. Since the pattern of such variable regions, like **VNTRs**, differs between people (except identical twins), comparing them can **identify individuals**.',
  sol: 'Inherited sequence variation; unique patterns.',
  scheme: [['Definition of polymorphism', 1], ['Unique VNTR patterns identify individuals', 1]],
  d: 2, c: 'understanding', t: [6],
}));
add('steps-short', short({
  marks: 3,
  stem: 'List, in order, the steps of DNA fingerprinting using VNTR probes.',
  model: '1. **Isolation** of DNA from the sample.\n\n2. **Digestion** of the DNA by restriction endonucleases.\n\n3. **Separation** of the fragments by gel electrophoresis.\n\n4. **Transfer (blotting)** of the separated fragments to a nylon or nitrocellulose membrane.\n\n5. **Hybridisation** with a labelled VNTR probe.\n\n6. **Detection** of the hybridised fragments by autoradiography, giving a pattern of bands.',
  sol: 'Six steps in order.',
  scheme: [['Isolation and digestion', 1], ['Electrophoresis and blotting', 1], ['Hybridisation and autoradiography', 1]],
  wl: [30, 80],
  d: 2, c: 'recall', t: [6],
}));
add('fingerprint-long', long({
  stem: 'A court is asked to accept a DNA fingerprint match between a crime-scene sample and a suspect as evidence. Explain the principle and steps of DNA fingerprinting, and evaluate how much weight such evidence should carry.',
  model: '**Principle.** A large part of human DNA consists of repeated sequences. Some, the VNTRs, vary in the number of repeats between individuals (polymorphism). Because each person inherits a particular combination from the parents, the sizes of these fragments form a pattern that is practically unique to each person, except identical twins.\n\n**Steps.** DNA is isolated from the sample (blood, hair root, skin cells), cut with restriction endonucleases, the fragments are separated by gel electrophoresis, blotted onto a membrane, hybridised with a labelled VNTR probe and detected by autoradiography as a pattern of bands, which is compared between samples.\n\n**Evaluation.** A full match at many VNTR loci makes it extremely unlikely that the sample came from someone else, so it is strong evidence that the suspect’s DNA was present at the scene. But it does not by itself prove guilt: DNA may have been left innocently, samples can be contaminated or mixed up, and identical twins share patterns. The evidence should be weighed with the other facts of the case and the care taken in collecting and testing samples.',
  sol: 'Principle; steps; balanced evaluation.',
  scheme: [['Principle: VNTR polymorphism', 1], ['Steps in order', 1.5], ['Strength of a match', 1], ['Limitations', 1], ['Balanced conclusion', 0.5]],
  wl: [80, 200],
  d: 5, c: 'evaluation', t: [6],
}));

// ---------------------------------------------------------------- cases
add('griffith-case', mk.case({
  passage: 'A class repeated, on paper, a set of classic experiments with pneumococci and mice.\n\n| Group | Injected into mice | Result |\n|---|---|---|\n| 1 | Live S strain | Mice died |\n| 2 | Live R strain | Mice lived |\n| 3 | Heat-killed S strain | Mice lived |\n| 4 | Heat-killed S + live R | Mice died |\n| 5 | Heat-killed S treated with protease + live R | Mice died |\n| 6 | Heat-killed S treated with DNase + live R | Mice lived |',
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which group first shows that R cells can be transformed?',
      right: 'Group 4',
      wrong: ['Group 1', 'Group 2', 'Group 3'],
      sol: 'Neither heat-killed S nor live R alone kills mice; together they do, so something from dead S cells transformed R cells — option (@K).',
      d: 2, c: 'analysis', t: [1],
    })),
    part('b', num({
      stem: 'In how many of the six groups did the mice die?',
      value: 3,
      sol: 'The mice died in groups 1, 4 and 5, so the answer is 3.',
      scheme: [['3', 1]],
      d: 1, c: 'understanding', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Compare groups 5 and 6 and state what they show about the transforming principle.',
      model: 'In group 5 the **proteins** of the dead S cells were destroyed, yet the R cells were still transformed and the mice died. In group 6 the **DNA** was destroyed and transformation **stopped**. So the transforming principle is **DNA**, not protein.',
      sol: 'Protease no effect; DNase blocks.',
      scheme: [['Protease did not, DNase did prevent transformation', 1], ['Transforming principle is DNA', 1]],
      d: 3, c: 'analysis', t: [1],
    }), [
      short({
        marks: 2,
        stem: 'Predict the result if heat-killed S cells were treated with RNase before mixing with live R cells, and explain.',
        model: 'The mice would **die**. RNase destroys RNA but not DNA, and Avery’s group found that RNase **does not prevent transformation**; the intact **DNA** still transforms R cells into virulent S cells.',
        sol: 'RNase leaves DNA intact.',
        scheme: [['Mice die', 1], ['RNase leaves DNA, the transforming agent, intact', 1]],
        d: 3, c: 'application', t: [1],
      }),
    ]),
  ],
}), (q) => q.children[1].answer.value === 3 || 'value');
{
  const coding = 'ATGAAATTTGGCTGA';
  const mrna = codingToMrna(coding);
  const pep = translate(mrna);
  const mutMrna = codingToMrna('ATGTAATTTGGCTGA');
  const mutPep = translate(mutMrna);
  add('seq-case', mk.case({
    passage: `A short bacterial gene has the coding strand 5′–${coding}–3′. Part of the codon table: AUG Met, AAA Lys, UUU Phe, GGC Gly, UAA stop, UGA stop.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'What is the mRNA sequence transcribed from this gene?',
        right: `5′–${mrna}–3′`,
        wrong: [`5′–${complement(coding).replace(/T/g, 'U')}–3′`, `5′–${coding}–3′`, `3′–${mrna}–5′`],
        sol: `mRNA = coding strand with U for T: 5′–${mrna}–3′ — option (@K).`,
        d: 2, c: 'application', t: [4],
      })),
      part('b', num({
        stem: 'How many amino acids will the polypeptide contain?',
        value: pep.length,
        sol: `Codons ${mrna.match(/.{3}/g).join(' ')}: ${pep.join(', ')}, then UGA stop — ${pep.length} amino acids.`,
        scheme: [[`${pep.length}`, 1]],
        d: 2, c: 'application', t: [4],
      })),
      part('c', short({
        marks: 2,
        stem: 'A mutation changes the fourth base of the coding strand from A to T (AAA → TAA in the second codon). Predict the effect on the polypeptide.',
        model: `The second codon of the mRNA becomes **UAA**, a **stop codon**. Translation stops after **${mutPep.join('–')}**, so the chain holds only **${mutPep.length}** amino acid instead of ${pep.length}: the protein is cut short and cannot work.`,
        sol: 'Point mutation creating a stop codon.',
        scheme: [['Codon becomes a stop codon (UAA)', 1], ['Chain stops after methionine; protein cut short', 1]],
        d: 4, c: 'analysis', t: [4],
      }), [
        short({
          marks: 2,
          stem: 'If instead the fourth base (the first A of AAA) were deleted, how would this affect translation? Explain.',
          model: 'Deleting one base causes a **frameshift**: every codon after the deletion is read in a new frame (AUG AAU UUG GCU GA…), so the amino acids after methionine are **changed**, and the original stop codon is no longer read in frame.',
          sol: 'Frameshift alters downstream codons.',
          scheme: [['Frameshift', 1], ['All downstream codons and amino acids altered', 1]],
          d: 4, c: 'analysis', t: [4],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 4 && translate(codingToMrna('ATGTAATTTGGCTGA')).length === 1 || 'seq');
}
add('lac-case', mk.case({
  passage: 'A student measured β-galactosidase activity (arbitrary units) in three E. coli strains grown with and without lactose.\n\n| Strain | Without lactose | With lactose |\n|---|---|---|\n| Normal | 1 | 100 |\n| Mutant M1 | 100 | 100 |\n| Mutant M2 | 1 | 1 |',
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which defect best explains mutant M1?',
      right: 'A repressor that cannot bind the operator (or an operator the repressor cannot bind)',
      wrong: ['A defective z gene', 'A defective permease (y) gene only', 'A repressor that binds the operator even when lactose is present'],
      sol: 'M1 makes the enzyme even without lactose, so nothing is blocking the operator — option (@K).',
      d: 3, c: 'analysis', t: [5],
    })),
    part('b', short({
      marks: 1,
      stem: 'Name the molecule that acts as the inducer in the normal strain.',
      model: '**Lactose** (the inducer).',
      sol: 'Lactose.',
      scheme: [['Lactose', 1]],
      wl: [1, 30],
      d: 1, c: 'recall', t: [5],
    })),
    part('c', short({
      marks: 2,
      stem: 'Suggest two different defects that could explain mutant M2, and justify each.',
      model: 'A **defective z gene**: the operon may be switched on, but no active **β-galactosidase** can be made. Or a **repressor that lactose cannot inactivate**: it stays bound to the **operator** even with lactose, so the genes are **never transcribed**.',
      sol: 'Broken z or non-inducible repressor.',
      scheme: [['Defective z gene with reason', 1], ['Non-inducible repressor with reason', 1]],
      d: 4, c: 'analysis', t: [5],
    }), [
      short({
        marks: 2,
        stem: 'Explain why the normal strain makes very little β-galactosidase without lactose but a lot with it.',
        model: 'Without lactose the **repressor** binds the **operator** and blocks RNA polymerase, so the operon is off. **Lactose (inducer)** binds the repressor and **inactivates** it; the operator is freed, the structural genes are transcribed and β-galactosidase is made.',
        sol: 'Repressor off; inducer on.',
        scheme: [['Repressor blocks transcription without lactose', 1], ['Lactose inactivates repressor; transcription', 1]],
        d: 3, c: 'understanding', t: [5],
      }),
    ]),
  ],
}));
{
  const { MOTHER, FATHER, OTHER, CHILD } = LANES;
  const fromMother = CHILD.filter((b) => MOTHER.includes(b));
  const nonMaternal = CHILD.filter((b) => !MOTHER.includes(b));
  const sharedP = nonMaternal.filter((b) => FATHER.includes(b)).length;
  add('fingerprint-case', mk.case({
    passage: 'In a paternity dispute, a laboratory prepared DNA fingerprints of a mother, her child and two men, P and Q, using the same VNTR probe. The child has four bands; two of them match bands of the mother.',
    assets: [],
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'The two non-maternal bands of the child are both present in man P’s lane but in neither of man Q’s. What can be concluded?',
        right: 'Man P is very likely the biological father; man Q is excluded.',
        wrong: ['Man Q is the biological father.', 'Both men could equally be the father.', 'Nothing, because bands are not inherited.'],
        sol: 'Each band in the child comes from the mother or the father; the non-maternal bands must come from the father, and only P has them — option (@K).',
        d: 2, c: 'application', t: [6],
      })),
      part('b', num({
        stem: 'How many of the child’s bands must have come from the biological father?',
        value: nonMaternal.length,
        sol: `The child has ${CHILD.length} bands, of which ${fromMother.length} match the mother, so ${nonMaternal.length} come from the father.`,
        scheme: [[`${nonMaternal.length}`, 1]],
        d: 2, c: 'application', t: [6],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain why the child’s fingerprint is a mixture of bands from both parents.',
        model: 'VNTR alleles are on chromosomes, and a child inherits **one set of chromosomes from each parent**. So, at each VNTR locus, one allele (band) comes from the **mother** and one from the **father**, and the child’s pattern is a combination of both.',
        sol: 'Half the chromosomes from each parent.',
        scheme: [['Half the chromosomes from each parent', 1], ['So each band matches one parent', 1]],
        d: 2, c: 'understanding', t: [6],
      }), [
        short({
          marks: 2,
          stem: 'Name the enzyme used to cut the DNA and the technique used to transfer the separated fragments to a membrane before probing.',
          model: 'The DNA is cut into fragments by **restriction endonucleases**. After the fragments are separated by gel electrophoresis, they are transferred by **Southern blotting** onto a **nylon or nitrocellulose** membrane, where the probe can bind them.',
          sol: 'Restriction enzymes; Southern blotting.',
          scheme: [['Restriction endonuclease', 1], ['Southern blotting to nylon or nitrocellulose', 1]],
          d: 2, c: 'recall', t: [6],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 2 && sharedP === 2 && !nonMaternal.some((b) => OTHER.includes(b)) || 'bands');
}
