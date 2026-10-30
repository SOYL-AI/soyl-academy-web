// ISC 12 Biology ch08 Gene Expression, Human Genome Project and DNA Fingerprinting — question bank in ISC style.
// mRNA sequences, peptides, codon counts and gel band matches are computed by calc.mjs / svgs.mjs. AR keys (ISC options): a b c d.
import { mk, add, svgV, r } from '../../isc-12-biology-ch01/src/lib.mjs';
import { transcribe, translate, codon, codonCount, complement, codingToMrna } from './calc.mjs';
import { GEL, LANES, LAC, anticodon } from './svgs.mjs';
import { TEMPLATE, MRNA_SEQ, PEPTIDE, HGP_BP } from './decks.mjs';

const { mcq, ar, fill, num, short, long, part } = mk;
const gelFig = svgV(GEL, 'DNA fingerprint gel with lanes for a mother, a child, man P and man Q');
const lacFig = svgV(LAC, 'The lac operon switched off without lactose and switched on with lactose');

// ---------------------------------------------------------------- t01 transcription and processing
add('template-mcq', mcq({
  stem: 'The coding strand of a gene segment reads 5′–ATGGCT–3′. What is the sequence of the mRNA transcribed from this segment?',
  right: `5′–${codingToMrna('ATGGCT')}–3′`,
  wrong: ['5′–UACCGA–3′', '5′–TACCGA–3′', '5′–AUGGCT–3′'],
  sol: 'mRNA has the coding-strand sequence with U in place of T — option (@K).',
  d: 2, c: 'application', t: [1],
}), () => codingToMrna('ATGGCT') === 'AUGGCU' || 'mrna');
add('pol3-mcq', mcq({
  stem: 'In the nucleus of a eukaryotic cell, which RNA polymerase transcribes the genes for tRNA and 5S rRNA?',
  right: 'RNA polymerase III',
  wrong: ['RNA polymerase I', 'RNA polymerase II', 'Reverse transcriptase'],
  sol: 'Polymerase I makes the large rRNAs, II makes hnRNA and III makes tRNA, 5S rRNA and snRNAs — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('rho-mcq', mcq({
  stem: 'A strain of E. coli has a defective rho factor. Which stage of transcription in this strain is most likely to fail?',
  right: 'Termination',
  wrong: ['Initiation', 'Elongation', 'Capping'],
  sol: 'In bacteria the rho factor helps RNA polymerase stop at the terminator; sigma helps initiation — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('intron-mcq', mcq({
  stem: 'During processing of hnRNA in the nucleus, which sequences are cut out by splicing?',
  right: 'Introns',
  wrong: ['Exons', 'The 5′ cap', 'The poly-A tail'],
  sol: 'Introns are the non-coding intervening sequences; exons are joined together — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('cap-mcq', mcq({
  stem: 'Capping of hnRNA adds which group to its 5′ end?',
  right: 'Methyl guanosine triphosphate',
  wrong: ['200–300 adenylate residues', 'A sigma factor', 'An amino acid'],
  sol: 'Capping adds methyl guanosine triphosphate at the 5′ end; tailing adds adenylates at the 3′ end — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('onestrand-ar', ar({
  a: 'Both strands of a structural gene are not transcribed into RNA at the same time.',
  r: 'The two RNAs would be complementary to each other and would pair up, preventing translation.',
  key: 'a',
  sol: 'Both are true, and the pairing of complementary RNAs is the reason only one strand is copied — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('muton-fill', fill({
  stem: 'The smallest segment of DNA that can undergo mutation, as small as a single nucleotide, is called a ______.',
  acc: [['muton']],
  sol: 'Muton.',
  d: 1, c: 'recall', t: [1],
}));
add('split-short', short({
  marks: 1,
  stem: 'Give a reason: eukaryotic structural genes are called split genes.',
  model: 'Their **coding sequences (exons)** are **interrupted by non-coding introns**.',
  sol: 'Exons interrupted by introns.',
  scheme: [['Exons interrupted by introns', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('polycistron-short', short({
  marks: 2,
  stem: 'The lac operon gives one mRNA that codes for three enzymes, whereas a human β-globin gene gives an mRNA for one polypeptide. Name each type of transcription unit and state where each type is mostly found.',
  model: 'The lac operon is a **polycistronic** unit — several structural genes in one transcription unit, found mostly in **bacteria (prokaryotes)**. The β-globin gene is a **monocistronic** unit — one structural gene, found mostly in **eukaryotes**.',
  sol: 'Polycistronic vs monocistronic.',
  scheme: [['Polycistronic; bacteria', 1], ['Monocistronic; eukaryotes', 1]],
  d: 2, c: 'application', t: [1],
}));
{
  const coding = 'ATGCCGTTA';
  const tmpl = complement(coding);
  add('strands-short', short({
    marks: 2,
    stem: `The coding strand of a gene segment reads 5′–${coding}–3′. Write the template strand and the mRNA, and state the role of each DNA strand.`,
    model: `Template strand: **3′–${tmpl}–5′**; mRNA: **5′–${codingToMrna(coding)}–3′**. The **template strand** is the one actually **copied** by RNA polymerase; the **coding strand** is **not copied**, but its sequence is the same as the mRNA (with T in place of U), so it is used to write the code.`,
    sol: 'Strands and roles.',
    scheme: [['Template and mRNA sequences', 1], ['Roles of the two strands', 1]],
    d: 2, c: 'application', t: [1],
  }), () => (tmpl === 'TACGGCAAT' && codingToMrna(coding) === 'AUGCCGUUA') || 'strands');
}
add('processing-short', short({
  marks: 3,
  stem: 'A researcher compares the hnRNA and the mature mRNA of the same human gene. The mRNA is shorter in the middle, but has an extra group at one end and a long run of adenine nucleotides at the other. Explain these three differences.',
  model: '**Splicing** removed the **introns** from the middle of the hnRNA and joined the **exons**, so the mRNA is shorter. **Capping** added **methyl guanosine triphosphate** to the **5′ end**. **Tailing** added a **poly-A tail** of **200–300 adenylate** residues to the **3′ end**. All three steps take place in the **nucleus** before the mRNA moves to the cytoplasm.',
  sol: 'Splicing, capping, tailing.',
  scheme: [['Splicing removes introns, joins exons', 1], ['Capping at 5′ end', 1], ['Poly-A tailing at 3′ end', 1]],
  d: 3, c: 'application', t: [1],
}));
add('transcription-bact-short', short({
  marks: 3,
  stem: 'Describe the three stages of transcription in bacteria, stating the roles of the sigma and rho factors.',
  model: '**Initiation:** RNA polymerase, helped by the **sigma (σ) factor**, binds the **promoter** and starts copying the template strand. **Elongation:** the polymerase moves along the template, adding **ribonucleoside triphosphates** complementary to it and making RNA **5′→3′**; the enzyme also unwinds the helix ahead. **Termination:** at the **terminator**, the **rho (ρ) factor** helps the polymerase stop and release the RNA. A single RNA polymerase makes **all types of RNA** in bacteria.',
  sol: 'Three stages.',
  scheme: [['Initiation with sigma at promoter', 1], ['Elongation 5′→3′', 1], ['Termination with rho at terminator', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('polymerases-short', short({
  marks: 3,
  stem: 'A toxin from a mushroom blocks RNA polymerase II in human liver cells. Which kinds of RNA will still be made, which will not, and why will the cell soon stop making new proteins coded by nuclear genes?',
  model: '**RNA polymerase I** (large rRNAs) and **III** (tRNA, 5S rRNA, snRNAs) still work, so these RNAs are **still made**. **RNA polymerase II** makes **hnRNA**, the precursor of **mRNA**, so **no new mRNA** is made. Without new mRNA, ribosomes have **no fresh message** to translate, so new proteins stop appearing once old mRNA is used up.',
  sol: 'Polymerase II makes hnRNA.',
  scheme: [['Polymerase I and III products still made', 1], ['Polymerase II makes hnRNA/mRNA', 1], ['No mRNA, so no new protein', 1]],
  d: 3, c: 'application', t: [1],
}));
{
  const introns = [450, 600, 350];
  const left = 3200 - introns.reduce((a, b) => a + b, 0);
  add('exon-num', num({
    stem: 'An hnRNA of 3200 nucleotides contains three introns of 450, 600 and 350 nucleotides. Ignoring the cap and tail, how many nucleotides remain in the spliced mRNA?',
    value: left,
    sol: r`Exons $= 3200 - (450 + 600 + 350) = ${left}$ nucleotides.`,
    scheme: [[`${left}`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 1800 || 'value');
}
{
  const tmpl = 'TACGGATTC';
  const m = transcribe(tmpl);
  add('trunit-long', long({
    stem: `(a) Draw a labelled diagram of a transcription unit showing the promoter, structural gene, terminator, and the template and coding strands with their polarity. [2]\n(b) Why is only one strand of DNA transcribed? [1]\n(c) A template strand reads 3′–${tmpl}–5′. Write the mRNA, and state the changes it would undergo in a eukaryotic nucleus before translation. [2]`,
    model: `(a) **Diagram:** a DNA double helix with the **promoter** upstream, the **structural gene** in the middle and the **terminator** downstream; the **template strand** marked **3′→5′** and the **coding strand** 5′→3′; RNA shown being made **5′→3′**.\n\n(b) If both strands were copied, the two RNAs would be **complementary**, would **pair** to form double-stranded RNA and would **not be translated**.\n\n(c) mRNA: **5′–${m}–3′**. In the nucleus the transcript (hnRNA) would undergo **splicing** (introns removed), **capping** (methyl guanosine triphosphate at the 5′ end) and **tailing** (poly-A at the 3′ end).`,
    sol: 'Diagram; reason; mRNA and processing.',
    scheme: [['(a) Labelled diagram with polarity', 2], ['(b) Complementary RNAs would pair', 1], ['(c) mRNA', 1], ['(c) Splicing, capping, tailing', 1]],
    wl: [50, 200],
    d: 3, c: 'application', t: [1],
  }), () => m === 'AUGCCUAAG' || 'mrna');
}

// ---------------------------------------------------------------- t02 genetic code
add('degenerate-ar', ar({
  a: 'The genetic code is degenerate.',
  r: 'One codon codes for more than one amino acid.',
  key: 'c',
  sol: 'A is true: some amino acids have several codons. R is false: each codon codes for only one amino acid (the code is unambiguous) — option (c).',
  d: 3, c: 'understanding', t: [2],
}));
add('universal-mcq', mcq({
  stem: 'A human gene for a hormone is placed in E. coli, and the bacterium makes the correct human polypeptide. Which feature of the genetic code makes this possible?',
  right: 'It is nearly universal.',
  wrong: ['It is degenerate.', 'It has three stop codons.', 'It has untranslated regions.'],
  sol: 'The same codons code for the same amino acids in bacteria and humans — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('gamow-mcq', mcq({
  stem: 'Gamow argued that a code of two bases per codon could not specify all the amino acids in proteins. Why?',
  right: `It would give only ${codonCount(2)} codons for 20 amino acids.`,
  wrong: ['It would give 64 codons, too many for 20 amino acids.', 'Two bases cannot pair with each other.', 'RNA has only two kinds of bases.'],
  sol: r`With 4 bases, a doublet gives $4^{2} = ${codonCount(2)}$ words, fewer than 20; a triplet gives $4^{3} = ${codonCount(3)}$ — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => codonCount(2) === 16 || 'count');
add('ochoa-mcq', mcq({
  stem: 'Which enzyme, studied by Severo Ochoa, was used to make RNA molecules of defined sequence without a template?',
  right: 'Polynucleotide phosphorylase',
  wrong: ['Reverse transcriptase', 'RNA polymerase III', 'Peptidyl transferase'],
  sol: 'Ochoa’s polynucleotide phosphorylase polymerised RNA in a template-independent manner — option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('commaless-mcq', mcq({
  stem: 'One extra base is inserted just after the start codon of a gene, and every amino acid after that point changes. Which feature of the genetic code explains this?',
  right: 'It is comma-less, read continuously in triplets from a fixed start.',
  wrong: ['It is degenerate.', 'It is nearly universal.', 'It has a dual-function start codon.'],
  sol: 'With no gaps between codons, an insertion shifts the reading frame of every later triplet — option (@K).',
  d: 3, c: 'application', t: [2],
}));
{
  const n = codonCount(4);
  add('codon-count-num', num({
    stem: 'Imagine an organism whose genetic code used codons of four bases each, still with four kinds of base. How many different codons could it have?',
    value: n,
    sol: r`Codons $= 4^{4} = ${n}$.`,
    scheme: [[`${n}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 256 || 'value');
}
add('stop-fill', fill({
  stem: 'The three stop codons of the genetic code are UAA, UAG and ______.',
  acc: [['UGA']],
  sol: 'UGA.',
  d: 1, c: 'recall', t: [2],
}), () => codon('UGA') === 'Stop' || 'stop');
{
  const m = 'AUGGCUUCAGGAUAGCC';
  const pep = translate(m);
  add('peptide-num', num({
    stem: `How many amino acids are in the peptide coded by the mRNA 5′–${m}–3′, reading from the first AUG?`,
    value: pep.length,
    sol: r`Codons AUG GCU UCA GGA then UAG (stop): ${pep.join(', ')}; number $= ${pep.length}$.`,
    scheme: [[`${pep.length}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 4 || 'value');
}
add('features-short', short({
  marks: 2,
  stem: 'State four salient features of the genetic code.',
  model: 'The code is **triplet** (three bases per codon); **unambiguous and specific** (one codon, one amino acid); **degenerate** (some amino acids have more than one codon); **comma-less**; **nearly universal**; and **AUG** both codes for methionine and **starts** translation, while **UAA, UAG, UGA** stop it.',
  sol: 'Four features.',
  scheme: [['Two features', 1], ['Two more features', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('aug-short', short({
  marks: 2,
  stem: 'An mRNA has one AUG codon near its 5′ end and another in the middle of its coding region. Explain why the first acts as a start codon while the second simply codes for methionine within the chain.',
  model: 'AUG has a **dual function**. The **first AUG** after the 5′ untranslated region is where the **small ribosomal subunit** and the **initiator tRNA** assemble, so it **sets the reading frame** and starts translation. Later AUGs are read **in frame** during elongation and simply add **methionine** to the chain.',
  sol: 'Dual function of AUG.',
  scheme: [['First AUG: initiation and reading frame', 1], ['Internal AUG: methionine during elongation', 1]],
  d: 3, c: 'application', t: [2],
}));
add('code-discovery-short', short({
  marks: 3,
  stem: 'Explain the contributions of George Gamow, Har Gobind Khorana and Marshall Nirenberg to deciphering the genetic code.',
  model: '**Gamow** argued that with **four bases** coding for **20 amino acids**, a codon must have **three bases** (4³ = 64 combinations; a doublet gives only 16). **Khorana** developed **chemical methods** to synthesise RNA molecules with **defined combinations of bases** (repeats), whose products revealed codons. **Nirenberg** used a **cell-free system** for protein synthesis to find which amino acid each codon specified, which finally helped decode the code.',
  sol: 'Three contributions.',
  scheme: [['Gamow: triplet argument', 1], ['Khorana: synthetic RNA', 1], ['Nirenberg: cell-free system', 1]],
  d: 2, c: 'understanding', t: [2],
}));
{
  const [a, b, c] = [codon('UUU'), codon('UUC'), codon('UAU')];
  add('mutation-code-short', short({
    marks: 3,
    stem: 'The codon UUU in a gene changes to UUC in one person and to UAU in another. Using the genetic code, predict the effect of each change on the protein and name the feature of the code shown by the first change.',
    model: `UUU codes for **${a}**. **UUC** also codes for **${b}**, so the protein is **unchanged** (a silent change) — this shows the code is **degenerate**. **UAU** codes for **${c}**, so one amino acid is **replaced** by another, which may change the protein’s shape and function.`,
    sol: 'Silent vs substitution.',
    scheme: [[`UUC also ${b}: no change`, 1], ['Degeneracy named', 1], [`UAU gives ${c}: amino acid replaced`, 1]],
    d: 3, c: 'application', t: [2],
  }), () => (a === 'Phe' && b === 'Phe' && c === 'Tyr') || 'codons');
}

// ---------------------------------------------------------------- t03 translation
add('aminoacyl-mcq', mcq({
  stem: 'What happens during aminoacylation of tRNA?',
  right: 'Each tRNA is linked to its specific amino acid, using energy from ATP.',
  wrong: ['The tRNA anticodon pairs with the mRNA codon.', 'Two amino acids are joined by a peptide bond.', 'Introns are removed from the tRNA precursor.'],
  sol: 'Aminoacylation, or charging, activates amino acids and attaches them to their tRNAs — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('asite-mcq', mcq({
  stem: 'During elongation, a newly arriving charged tRNA carrying the next amino acid first binds the ribosome at the',
  right: 'A site',
  wrong: ['P site', 'promoter', 'poly-A tail'],
  sol: 'The incoming aminoacyl-tRNA enters the A site; the growing chain is held in the P site — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('ribozyme-mcq', mcq({
  stem: 'In bacterial ribosomes, which molecule catalyses the formation of peptide bonds?',
  right: '23S rRNA, acting as a ribozyme',
  wrong: ['tRNA, acting as an adapter', 'mRNA, acting as a template', 'The sigma factor'],
  sol: 'The 23S rRNA of the large subunit is the catalyst — option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('release-mcq', mcq({
  stem: 'A ribosome translating an mRNA reaches the codon UAG in its A site. What happens next?',
  right: 'A release factor binds, and the polypeptide is released from the ribosome.',
  wrong: ['A tRNA carrying tyrosine binds the codon.', 'The ribosome moves back to the start codon.', 'Splicing begins on the mRNA.'],
  sol: 'UAG is a stop codon; no tRNA reads it, so a release factor ends translation — option (@K).',
  d: 2, c: 'application', t: [3],
}), () => codon('UAG') === 'Stop' || 'stop');
add('anticodon-mcq', mcq({
  stem: 'A codon on an mRNA reads 5′–GCA–3′. Which anticodon, written 3′→5′, does the matching tRNA carry?',
  right: `3′–${anticodon('GCA')}–5′`,
  wrong: ['3′–GCA–5′', '3′–CGT–5′', '3′–ACG–5′'],
  sol: 'The anticodon pairs base by base: G–C, C–G, A–U, giving CGU — option (@K).',
  d: 2, c: 'application', t: [3],
}), () => anticodon('GCA') === 'CGU' || 'anticodon');
add('utr-ar', ar({
  a: 'An mRNA has untranslated regions before the start codon and after the stop codon.',
  r: 'There is no tRNA that reads a stop codon.',
  key: 'b',
  sol: 'Both are true, but the absence of tRNAs for stop codons does not explain why mRNAs have untranslated regions, which are needed for efficient translation — option (b).',
  d: 3, c: 'understanding', t: [3],
}));
add('clover-fill', fill({
  stem: 'The secondary structure of tRNA is drawn as a ______ leaf, while its three-dimensional shape is an inverted L.',
  acc: [['clover']],
  sol: 'Clover (clover-leaf structure).',
  d: 1, c: 'recall', t: [3],
}));
{
  const ac = '3′–UAC–5′';
  add('trna-short', short({
    marks: 2,
    stem: `A tRNA molecule has the anticodon ${ac}. Which mRNA codon does it read, and which amino acid does it carry? Why is tRNA called an adapter molecule?`,
    model: `It reads the codon **5′–${anticodon('UAC')}–3′**, which codes for **${codon(anticodon('UAC'))}** (methionine; it is the start codon). tRNA is an **adapter** because it **reads the codon** with its anticodon and also **carries the matching amino acid**, linking the language of bases to that of amino acids.`,
    sol: 'AUG, methionine; adapter.',
    scheme: [['Codon AUG and methionine', 1], ['Adapter explained', 1]],
    d: 2, c: 'application', t: [3],
  }), () => (anticodon('UAC') === 'AUG' && codon('AUG') === 'Met') || 'trna');
}
add('translation-short', short({
  marks: 3,
  stem: 'Describe the initiation, elongation and termination stages of translation in bacteria.',
  model: '**Initiation:** the **small ribosomal subunit** binds the mRNA; the **initiator tRNA** carrying **methionine** pairs with the **start codon AUG**, and the large subunit joins. **Elongation:** a charged tRNA whose anticodon matches the next codon enters the **A site**; a **peptide bond** forms with the chain held in the **P site**, catalysed by **rRNA (ribozyme)**; the ribosome then **moves one codon** towards the 3′ end. **Termination:** at a **stop codon** a **release factor** binds, the polypeptide is released and the ribosome separates.',
  sol: 'Three stages.',
  scheme: [['Initiation at AUG', 1], ['Elongation: A and P sites, peptide bond, translocation', 1], ['Termination with release factor', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('translation-long', long({
  stem: `(a) The template strand of a short gene reads 3′–${TEMPLATE}–5′. Write the mRNA and the sequence of amino acids it codes for. [2]\n(b) Explain the roles of the A site and the P site of the ribosome, and name the molecule that forms peptide bonds. [2]\n(c) Why is there no tRNA for the last codon of this mRNA? [1]`,
  model: `(a) mRNA **5′–${MRNA_SEQ}–3′**; codons ${MRNA_SEQ.match(/.{3}/g).join(' ')}; peptide **${PEPTIDE.join('–')}**, then **stop**.\n\n(b) The **A site** receives each new **charged tRNA** whose anticodon matches the codon; the **P site** holds the tRNA carrying the **growing chain**. The chain is transferred to the new amino acid by a **peptide bond**, formed by the **rRNA of the large subunit** acting as a **ribozyme**; the ribosome then moves one codon on.\n\n(c) The last codon, **${MRNA_SEQ.slice(-3)}**, is a **stop codon**; it codes for no amino acid, so it is recognised by a **release factor**, not a tRNA.`,
  sol: 'mRNA and peptide; ribosome sites; stop codon.',
  scheme: [['(a) mRNA', 1], ['(a) Peptide', 1], ['(b) A and P sites', 1], ['(b) rRNA ribozyme', 1], ['(c) Stop codon read by release factor', 1]],
  wl: [50, 200],
  d: 3, c: 'application', t: [3],
}), () => (MRNA_SEQ === 'AUGUUCGGAUGGUAA' && PEPTIDE.join('-') === 'Met-Phe-Gly-Trp') || 'peptide');

// ---------------------------------------------------------------- t04 lac operon
add('lactose-mcq', mcq({
  stem: 'Which substance acts as the inducer of the lac operon in E. coli?',
  right: 'Lactose (strictly, allolactose)',
  wrong: ['Glucose', 'The repressor protein', 'β-galactosidase'],
  sol: 'Lactose (allolactose) binds and inactivates the repressor — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('permease-mcq', mcq({
  stem: 'Which product of the lac operon increases the permeability of E. coli to lactose?',
  right: 'Permease, coded by gene y',
  wrong: ['β-galactosidase, coded by gene z', 'Transacetylase, coded by gene a', 'The repressor, coded by gene i'],
  sol: 'Gene y codes for permease — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('imutant-mcq', mcq({
  stem: 'A mutant E. coli cannot make any functional repressor. When it grows in a medium with no lactose, its lac structural genes are',
  right: 'transcribed all the time',
  wrong: ['never transcribed', 'transcribed only when glucose is added', 'transcribed only every other generation'],
  sol: 'With no repressor to bind the operator, RNA polymerase always transcribes z, y and a — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('zgene-mcq', mcq({
  stem: 'β-galactosidase, coded by gene z of the lac operon, hydrolyses lactose into',
  right: 'galactose and glucose',
  wrong: ['two glucose molecules', 'fructose and glucose', 'galactose and fructose'],
  sol: 'Lactose is a disaccharide of galactose and glucose — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('negative-ar', ar({
  a: 'Regulation of the lac operon by its repressor is described as negative regulation.',
  r: 'The repressor protein is coded by the regulatory gene i.',
  key: 'b',
  sol: 'Both are true, but the source of the repressor does not explain why the control is negative; it is negative because the repressor switches the operon off — option (b).',
  d: 3, c: 'understanding', t: [4],
}));
add('operator-ar', ar({
  a: 'In the absence of lactose, RNA polymerase cannot transcribe the lac structural genes.',
  r: 'Lactose binds directly to the operator and blocks RNA polymerase.',
  key: 'c',
  sol: 'A is true. R is false: the repressor binds the operator; lactose binds the repressor and removes it — option (c).',
  d: 3, c: 'understanding', t: [4],
}));
add('operon-def-short', short({
  marks: 2,
  stem: 'What is an operon? Name the three structural genes of the lac operon and the enzyme coded by each.',
  model: 'An **operon** is a group of genes **transcribed together** and **regulated as a unit**. Lac structural genes: **z** — **β-galactosidase**; **y** — **permease**; **a** — **transacetylase**.',
  sol: 'Definition and three genes.',
  scheme: [['Operon defined', 1], ['z, y, a with enzymes', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('lacon-short', short({
  marks: 3,
  stem: 'Lactose is added to a culture of E. coli that had been growing without it, and some hours later all the lactose has been used up. Explain the changes in the lac operon during this time.',
  model: 'Before lactose, the **repressor** (from gene **i**) is bound to the **operator**, so the operon is **off**. When lactose enters, a few molecules taken up by a low level of permease act as the **inducer** (allolactose): it **binds the repressor**, which changes shape and **leaves the operator**. RNA polymerase now transcribes **z, y and a**, and the enzymes break down lactose. When **lactose is used up**, the free repressor **binds the operator again** and the operon is **switched off**.',
  sol: 'Off, on, off.',
  scheme: [['Repressor on operator: off', 1], ['Inducer inactivates repressor: genes transcribed', 1], ['Lactose used up: repressor rebinds', 1]],
  d: 3, c: 'application', t: [4],
}));
add('lac-long', long({
  stem: '(a) Draw a labelled diagram of the lac operon in the absence of lactose. [2]\n(b) Explain how the operon is switched on when lactose is present. [2]\n(c) Predict what would happen in a mutant whose operator cannot bind the repressor. [1]',
  model: '(a) **Diagram:** gene **i** making the **repressor**; **promoter (p)**, **operator (o)** with the repressor **bound**; structural genes **z, y, a**; RNA polymerase **blocked**; no mRNA.\n\n(b) **Lactose (allolactose)** enters and acts as the **inducer**: it **binds the repressor** and **inactivates** it, so the repressor **cannot bind the operator**. **RNA polymerase** binds the promoter and transcribes **z, y and a** as one **polycistronic mRNA**, giving β-galactosidase, permease and transacetylase.\n\n(c) The repressor could never block transcription, so the structural genes would be **transcribed all the time**, even **without lactose**.',
  sol: 'Diagram; switching on; operator mutant.',
  scheme: [['(a) Labelled operon with bound repressor', 2], ['(b) Inducer inactivates repressor', 1], ['(b) z, y, a transcribed', 1], ['(c) Always on', 1]],
  wl: [50, 200],
  d: 3, c: 'application', t: [4],
}));
add('lac-case', mk.case({
  passage: 'Four strains of E. coli were grown with and without lactose, and β-galactosidase activity was measured.\n\n| Strain | Change | No lactose | Lactose present |\n|---|---|---|---|\n| W | None (wild type) | Absent | High |\n| X | Gene i cannot make repressor | High | High |\n| Y | Operator cannot bind repressor | High | High |\n| Z | Gene z mutated | Absent | Absent |',
  d: 3, c: 'analysis',
  assets: [lacFig],
  children: [
    part('a', mcq({
      stem: 'Why does strain W show no β-galactosidase activity without lactose?',
      right: 'The repressor is bound to the operator.',
      wrong: ['Gene z is missing.', 'RNA polymerase is absent from the cell.', 'Lactose binds the promoter.'],
      sol: 'In the wild type, the free repressor blocks transcription — option (@K).',
      d: 2, c: 'understanding', t: [4],
    })),
    part('b', mcq({
      stem: 'Strains X and Y behave alike. Which statement explains both?',
      right: 'In both, the repressor never stays on the operator, so transcription is always on.',
      wrong: ['In both, lactose cannot enter the cell.', 'In both, gene z has been lost.', 'In both, the repressor binds the operator more tightly.'],
      sol: 'No repressor (X) or an operator that cannot hold it (Y) both leave the operon permanently on — option (@K).',
      d: 3, c: 'analysis', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'Strain Z still makes the repressor normally and is switched on by lactose. Explain why it shows no β-galactosidase activity even with lactose.',
      model: 'The operon **is transcribed** when lactose inactivates the repressor, but gene **z** is **mutated**, so the mRNA codes for a **non-functional** (or no) **β-galactosidase**. Regulation is normal; the **structural gene product** is faulty.',
      sol: 'Faulty structural gene.',
      scheme: [['Operon switched on normally', 1], ['Mutated z gives no working enzyme', 1]],
      d: 3, c: 'analysis', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'Why is it an advantage to strain W, but not to strains X and Y, to have the operon under control?',
        model: 'Strain W makes the lactose enzymes **only when lactose is present**, so it **saves energy and materials**. Strains X and Y make the enzymes **all the time**, **wasting resources** when there is no lactose to use.',
        sol: 'Saving energy.',
        scheme: [['W makes enzymes only when needed', 1], ['X and Y waste resources', 1]],
        d: 3, c: 'analysis', t: [4],
      }),
    ]),
  ],
}));

// ---------------------------------------------------------------- t05 Human Genome Project
add('est-mcq', mcq({
  stem: 'In the Human Genome Project, expressed sequence tags (ESTs) were used to',
  right: 'identify all the genes that are expressed as RNA',
  wrong: ['sequence every base of the genome, coding and non-coding', 'cut DNA at specific palindromic sites', 'join DNA fragments into a vector'],
  sol: 'ESTs focus on expressed genes; sequence annotation covers the whole genome — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('chromosome-mcq', mcq({
  stem: 'According to the Human Genome Project, which human chromosome carries the fewest genes?',
  right: 'Chromosome Y, with 231 genes',
  wrong: ['Chromosome 1, with 2968 genes', 'Chromosome X, with 231 genes', 'Chromosome 21, with 2968 genes'],
  sol: 'Chromosome 1 has the most genes (2968) and Y the fewest (231) — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('bac-mcq', mcq({
  stem: 'A 150 kb fragment of human DNA had to be cloned for sequencing in the Human Genome Project. Which kind of vector was suited to such a large insert?',
  right: 'A bacterial or yeast artificial chromosome (BAC or YAC)',
  wrong: ['A short synthetic primer', 'An expressed sequence tag', 'A restriction endonuclease'],
  sol: 'BAC and YAC vectors carry large inserts that were then amplified and sequenced — option (@K).',
  d: 3, c: 'application', t: [5],
}));
{
  const coding = Math.round(HGP_BP * 0.015 * 10) / 10;
  add('coding-num', num({
    stem: `Taking the human genome as ${HGP_BP} million base pairs and assuming that exactly 1.5 percent of it codes for proteins, how many million base pairs are coding? (One decimal place.)`,
    value: coding, tol: 0.05, unit: 'million bp',
    sol: r`Coding $= 0.015 \times ${HGP_BP} = ${coding}$ million base pairs.`,
    scheme: [[`${coding}`, 1]],
    d: 2, c: 'application', t: [5],
  }), (q) => q.answer.value === 47.5 || 'value');
}
add('snp-short', short({
  marks: 2,
  stem: 'Two people differ by a single base at the same position in a gene. What is such a difference called, how many such locations did the Human Genome Project identify, and how might they help medicine?',
  model: 'It is a **single nucleotide polymorphism (SNP)**. About **1.4 million** SNP locations were identified. SNPs help in **finding chromosomal locations of disease-associated sequences** and **tracing human history**, and can help predict a person’s **response to drugs**.',
  sol: 'SNP; 1.4 million; uses.',
  scheme: [['SNP and 1.4 million', 1], ['One medical use', 1]],
  d: 2, c: 'application', t: [5],
}));
add('hgp-goals-short', short({
  marks: 2,
  stem: 'State four goals of the Human Genome Project.',
  model: 'To **identify all the genes** in human DNA; to **determine the sequence** of the **3 billion** base pairs; to **store the information** in databases; to **improve tools for data analysis**; to **transfer technologies** to other sectors; and to address the **ethical, legal and social issues (ELSI)**.',
  sol: 'Four goals.',
  scheme: [['Two goals', 1], ['Two more goals', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('hgp-methods-short', short({
  marks: 3,
  stem: 'Distinguish between the two approaches used in the Human Genome Project, and outline how DNA fragments were sequenced and assembled.',
  model: '**Expressed Sequence Tags (ESTs)** identify **all the genes expressed as RNA**. **Sequence annotation** sequences the **whole genome**, coding and non-coding, and later **assigns functions** to regions. For sequencing, total DNA was **broken into fragments**, **cloned** in **BAC and YAC** vectors, read by **automated sequencers** (Sanger’s method), and arranged into the full sequence by **computer programs** using **overlapping regions**.',
  sol: 'ESTs vs annotation; method.',
  scheme: [['ESTs', 1], ['Sequence annotation', 1], ['Fragment, clone, sequence, align', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('hgp-features-short', short({
  marks: 3,
  stem: 'State six salient features of the human genome revealed by the Human Genome Project.',
  model: `It has **${HGP_BP} million** bases; about **30 000 genes** were estimated; the **average gene** has **3000 bases** and the largest, **dystrophin**, **2.4 million**; **99.9 percent** of bases are the same in all people; **less than 2 percent** codes for proteins; **repeated sequences** form a large part; **chromosome 1** has the most genes (2968) and **Y** the fewest (231); about **1.4 million SNPs** were found.`,
  sol: 'Six features.',
  scheme: [['Two features', 1], ['Two more', 1], ['Two more', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('hgp-long', long({
  stem: '(a) State the goals of the Human Genome Project. [2]\n(b) Describe its two methodologies. [2]\n(c) A family has a history of a single-gene disorder whose gene has been located by genome studies. Suggest one way this knowledge could help the family. [1]',
  model: '(a) **Identify all genes**; **sequence the 3 billion base pairs**; **store data** in databases; **improve analysis tools**; **transfer technology**; address **ethical, legal and social issues**.\n\n(b) **Expressed sequence tags** identify all genes expressed as RNA. **Sequence annotation** sequences the whole genome, coding and non-coding, and then assigns functions; DNA fragments were cloned in **BAC/YAC** vectors, sequenced automatically and assembled by computer from overlapping sequences.\n\n(c) **Genetic testing** could tell family members whether they **carry the allele**, guide **genetic counselling** before having children, and point to **early diagnosis** or targeted treatment such as **gene therapy**.',
  sol: 'Goals; methods; application.',
  scheme: [['(a) Goals', 2], ['(b) ESTs', 1], ['(b) Sequence annotation and method', 1], ['(c) One application', 1]],
  wl: [50, 200],
  d: 2, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- t06 DNA fingerprinting
add('vntr-ar', ar({
  a: 'The DNA fingerprints of two unrelated people differ.',
  r: 'The number of repeats in variable number tandem repeats differs between individuals.',
  key: 'a',
  sol: 'Both are true, and differing repeat numbers give fragments of different sizes, which explains the different patterns — option (a).',
  d: 2, c: 'understanding', t: [6],
}));
add('southern-mcq', mcq({
  stem: 'In DNA fingerprinting, the transfer of separated DNA fragments from the gel to a nitrocellulose or nylon membrane is called',
  right: 'Southern blotting',
  wrong: ['autoradiography', 'hybridisation', 'electrophoresis'],
  sol: 'Southern blotting transfers DNA fragments to a membrane before the probe is added — option (@K).',
  d: 1, c: 'recall', t: [6],
}));
add('twins-mcq', mcq({
  stem: 'Which two people would be expected to give identical DNA fingerprints?',
  right: 'Identical (monozygotic) twins',
  wrong: ['A mother and her daughter', 'Non-identical (dizygotic) twins', 'A brother and a sister'],
  sol: 'Identical twins arise from one zygote and have the same DNA — option (@K).',
  d: 2, c: 'understanding', t: [6],
}));
add('pcr-mcq', mcq({
  stem: 'Only a single hair root is recovered from a crime scene. Which step allows enough DNA to be obtained for fingerprinting?',
  right: 'Amplification of the DNA by the polymerase chain reaction (PCR)',
  wrong: ['Southern blotting of the hair', 'Staining the hair with a dye', 'Autoradiography of the hair'],
  sol: 'PCR makes many copies from a tiny sample — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('jeffreys-mcq', mcq({
  stem: 'The technique of DNA fingerprinting, using a VNTR as a probe, was developed by',
  right: 'Alec Jeffreys',
  wrong: ['Har Gobind Khorana', 'Jacob and Monod', 'Severo Ochoa'],
  sol: 'Alec Jeffreys developed DNA fingerprinting — option (@K).',
  d: 1, c: 'recall', t: [6],
}));
add('twinfather-mcq', mcq({
  stem: 'In a paternity case, the two men who might be the father are identical twins. What will DNA fingerprinting with VNTR probes show?',
  right: 'The child’s non-maternal bands match both men equally, so the test cannot decide between them.',
  wrong: ['Only the true father matches the child’s non-maternal bands.', 'Neither man matches, because twins have no VNTRs.', 'The child matches the older twin more closely.'],
  sol: 'Identical twins have the same DNA, so their band patterns are identical; the test cannot separate them — option (@K).',
  d: 4, c: 'analysis', t: [6],
}));
add('ethics-short', short({
  marks: 2,
  stem: 'A city plans to keep the DNA fingerprints of everyone who is arrested, even if they are not charged. State two ethical issues this raises and a safeguard for each.',
  model: '**Privacy:** genetic data reveal information about a person and their **relatives**; safeguard — **secure storage** with **controlled access**. **Consent and misuse:** people not charged have not agreed, and data could be used for **discrimination**; safeguard — **informed consent** or **deletion** of records when no charge is made, backed by **law**.',
  sol: 'Two issues and safeguards.',
  scheme: [['Issue with safeguard', 1], ['Second issue with safeguard', 1]],
  d: 3, c: 'application', t: [6],
}));
add('fingerprint-steps-short', short({
  marks: 3,
  stem: 'List, in order, the steps of DNA fingerprinting, and state the purpose of the labelled probe.',
  model: '(i) **Isolation** of DNA; (ii) **digestion** with **restriction endonucleases**; (iii) separation of fragments by **gel electrophoresis**; (iv) **Southern blotting** onto a nylon or nitrocellulose membrane; (v) **hybridisation** with a **labelled VNTR probe**; (vi) **autoradiography** to see the bands. The **probe** binds only to fragments carrying the **complementary repeat**, so only those fragments show up as bands.',
  sol: 'Six steps; probe.',
  scheme: [['First three steps', 1], ['Last three steps', 1], ['Purpose of probe', 1]],
  d: 2, c: 'recall', t: [6],
}));
add('fingerprint-long', long({
  stem: '(a) What are variable number tandem repeats (VNTRs), and why are they useful in identifying people? [2]\n(b) Describe the steps used to obtain a DNA fingerprint. [2]\n(c) A blood stain is found at a crime scene and three suspects are held. Explain how the fingerprints would be used. [1]',
  model: '(a) **VNTRs** are **mini-satellites** in which a short DNA sequence is **repeated in tandem**; the **number of repeats** varies between individuals, so the **fragments** containing them differ in **size**, giving a pattern **unique** to each person (except identical twins).\n\n(b) DNA is **isolated**, cut with **restriction enzymes**, separated by **gel electrophoresis**, transferred by **Southern blotting**, **hybridised** with a **labelled VNTR probe** and detected by **autoradiography**.\n\n(c) The fingerprint from the **stain** is compared with those of the **three suspects**; a suspect whose **band pattern matches exactly** is linked to the scene, while non-matching suspects are **excluded**.',
  sol: 'VNTRs; steps; forensic comparison.',
  scheme: [['(a) VNTR defined', 1], ['(a) Variable number gives unique pattern', 1], ['(b) Steps in order', 2], ['(c) Compare patterns', 1]],
  wl: [50, 200],
  d: 2, c: 'application', t: [6],
}));
{
  const fromM = LANES.CHILD.filter((b) => LANES.MOTHER.includes(b)).length;
  const fromP = LANES.CHILD.filter((b) => LANES.FATHER.includes(b)).length;
  const fromQ = LANES.CHILD.filter((b) => LANES.OTHER.includes(b)).length;
  add('gel-case', mk.case({
    passage: 'In a paternity dispute, DNA fingerprints were prepared from a mother, her child and two men, P and Q, using the same VNTR probe. The gel is shown in the figure.',
    d: 3, c: 'analysis',
    assets: [gelFig],
    children: [
      part('a', num({
        stem: 'How many of the child’s bands match bands of the mother?',
        value: fromM,
        sol: r`Bands shared with the mother $= ${fromM}$.`,
        scheme: [[`${fromM}`, 1]],
        d: 2, c: 'application', t: [6],
      })),
      part('b', mcq({
        stem: 'Which man is the biological father?',
        right: 'Man P',
        wrong: ['Man Q', 'Both men equally', 'Neither man'],
        sol: `All ${LANES.CHILD.length - fromM} non-maternal bands of the child are in man P, and ${fromQ} are in man Q — option (@K).`,
        d: 3, c: 'analysis', t: [6],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain why the mother’s bands are identified first when reading such a gel.',
        model: 'A child inherits **half** of its VNTR alleles from **each parent**. Removing the bands it shares with the **mother** leaves the **paternal** bands, which **must all** be present in the **biological father**.',
        sol: 'Half from each parent.',
        scheme: [['Half from each parent', 1], ['Remaining bands must match father', 1]],
        d: 3, c: 'analysis', t: [6],
      }), [
        short({
          marks: 2,
          stem: 'Why is a single matching band not enough to prove that a man is the father?',
          model: 'Unrelated people can **share some bands** by chance, because many people carry the same repeat number at a locus. Paternity needs **all** the non-maternal bands to match, usually across **several probes**.',
          sol: 'Chance sharing.',
          scheme: [['Bands can be shared by chance', 1], ['All non-maternal bands must match', 1]],
          d: 3, c: 'analysis', t: [6],
        }),
      ]),
    ],
  }), (q) => (q.children[0].answer.value === 2 && fromP === 2 && fromQ === 0) || 'gel');
}
