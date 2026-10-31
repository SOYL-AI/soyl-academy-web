// ISC 12 Biology ch14 Biotechnology: Principles and Processes — question bank in ISC style.
// Restriction fragments, palindromes, site frequencies, PCR copies and colony percentages are computed by calc.mjs.
// AR keys (ISC options): a b c d.
import { mk, add, svgV, r } from '../../isc-12-biology-ch01/src/lib.mjs';
import { digest, isPalindrome, reverseComplement, expectedSites, pcr, migration } from './calc.mjs';
import { GEL, PBR } from './svgs.mjs';

const { mcq, ar, fill, num, short, long, part } = mk;
const pbrFig = svgV(PBR, 'Map of the plasmid pBR322 with ori, rop, resistance genes and restriction sites');
const gelFig = svgV(GEL, 'Agarose gel with a ladder and a sample lane');

// ---------------------------------------------------------------- t01 principles, DNA isolation, electrophoresis
add('ethanol-mcq', mcq({
  stem: 'During isolation of DNA, what is added at the end so that purified DNA separates out as fine threads that can be spooled?',
  right: 'Chilled ethanol',
  wrong: ['Ethidium bromide', 'Calcium chloride', 'Agarose'],
  sol: 'Chilled ethanol precipitates DNA — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('lysis-mcq', mcq({
  stem: 'A student wants to isolate DNA from a mould (a fungus). Which enzyme should she use first to break the cell walls?',
  right: 'Chitinase',
  wrong: ['Lysozyme', 'Cellulase', 'Ribonuclease'],
  sol: 'Fungal walls contain chitin; lysozyme is for bacteria and cellulase for plants — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('gel-mcq', mcq({
  stem: 'DNA fragments of 4000, 600 and 150 base pairs are run on the same agarose gel. Which band will be found farthest from the wells?',
  right: 'The 150 bp fragment',
  wrong: ['The 4000 bp fragment', 'The 600 bp fragment', 'All three will move the same distance'],
  sol: 'The gel acts as a sieve: smaller fragments move farther towards the anode — option (@K).',
  d: 2, c: 'application', t: [1],
}), () => migration(150) > migration(600) && migration(600) > migration(4000) || 'order');
add('ebr-mcq', mcq({
  stem: 'A student runs a gel of DNA fragments but forgets to stain it with ethidium bromide. What will she see under UV light?',
  right: 'No bands, because unstained DNA does not glow orange',
  wrong: ['Bright orange bands as usual', 'Blue bands in place of orange ones', 'Bands only for the largest fragments'],
  sol: 'Ethidium bromide makes DNA visible as orange bands under UV — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('elution-mcq', mcq({
  stem: 'After electrophoresis, the band containing the gene of interest is cut out and the DNA is extracted from the gel piece. This step is called',
  right: 'elution',
  wrong: ['spooling', 'annealing', 'transformation'],
  sol: 'Extraction of DNA from the gel is elution — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('agarose-fill', fill({
  stem: 'The gel commonly used to separate DNA fragments is made of ______, a natural polymer extracted from seaweeds.',
  acc: [['agarose']],
  sol: 'Agarose.',
  d: 1, c: 'recall', t: [1],
}));
add('principles-short', short({
  marks: 2,
  stem: 'Name the two core techniques that enabled modern biotechnology and state what each does.',
  model: '**Genetic engineering** — altering the chemistry of genetic material (DNA or RNA) and introducing it into a host organism, so changing its **phenotype**. **Bioprocess engineering** — maintaining **sterile, contamination-free** conditions to grow **only the desired** microbe or cell in large quantities to make products such as **antibiotics, vaccines and enzymes**.',
  sol: 'Two techniques.',
  scheme: [['Genetic engineering', 1], ['Bioprocess engineering', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('isolation-short', short({
  marks: 3,
  stem: 'Outline how a student would isolate DNA from spinach leaves, naming the enzymes or chemicals used at each step.',
  model: 'The leaves are ground and the plant cell walls broken with **cellulase** (cell lysis), releasing DNA along with **RNA, proteins**, lipids and other molecules. **Ribonuclease** is added to remove **RNA**, and **protease** to remove **proteins** such as histones. Finally, **chilled ethanol** is added; the purified DNA **precipitates** as fine white threads, which are removed by **spooling** on a glass rod.',
  sol: 'Lysis, enzymes, ethanol.',
  scheme: [['Cellulase for lysis', 1], ['Ribonuclease and protease', 1], ['Chilled ethanol; spooling', 1]],
  d: 3, c: 'application', t: [1],
}));
add('gel-short', short({
  marks: 3,
  stem: 'Explain the principle of agarose gel electrophoresis and how separated DNA fragments are seen and recovered.',
  model: 'DNA fragments are **negatively charged**, so in an **electric field** they move through the agarose gel towards the **anode**. The gel acts as a **sieve**: **smaller fragments move farther**, so fragments separate by **size**. The gel is stained with **ethidium bromide** and exposed to **UV light**, showing **orange bands**. The required band is **cut out** and the DNA extracted from it (**elution**).',
  sol: 'Charge, sieving, staining, elution.',
  scheme: [['Negative DNA moves to anode', 1], ['Sieving by size', 1], ['Ethidium bromide, UV; elution', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 restriction enzymes and ligase
add('ecori-mcq', mcq({
  stem: 'In the name EcoRI, what does the letter R stand for?',
  right: 'The strain of the bacterium (RY 13)',
  wrong: ['Restriction', 'Recognition sequence', 'Replication'],
  sol: 'E = Escherichia, co = coli, R = strain RY 13, I = first enzyme — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('hind-mcq', mcq({
  stem: 'The first restriction endonuclease found to cut DNA only at a specific six-base-pair recognition sequence was',
  right: 'Hind II',
  wrong: ['EcoRI', 'BamHI', 'Taq polymerase'],
  sol: 'Hind II was isolated five years after the 1963 discovery — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('exo-mcq', mcq({
  stem: 'How do exonucleases differ from endonucleases?',
  right: 'Exonucleases remove nucleotides from the ends of DNA; endonucleases cut at specific positions within it.',
  wrong: ['Exonucleases join DNA; endonucleases copy it.', 'Exonucleases work only on RNA.', 'Endonucleases remove nucleotides only from the 3′ end.'],
  sol: 'The prefixes exo (outside) and endo (inside) describe where they cut — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('sticky-mcq', mcq({
  stem: 'Why are the vector and the source DNA cut with the same restriction enzyme when making recombinant DNA?',
  right: 'So that both have complementary sticky ends that can pair and be joined by ligase',
  wrong: ['So that the vector loses its origin of replication', 'So that the enzyme can join the fragments', 'So that both fragments become blunt and cannot pair'],
  sol: 'The same enzyme leaves matching overhangs on both molecules — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('steps-mcq', mcq({
  stem: 'Which is the correct order of steps in recombinant DNA technology?',
  right: 'Isolate DNA → cut with restriction enzyme → ligate into vector → transfer into host → culture host → extract product',
  wrong: ['Isolate DNA → transfer into host → cut with restriction enzyme → ligate → extract product', 'Cut vector → culture host → isolate DNA → ligate → extract product', 'Ligate DNA → isolate DNA → cut → culture host → transfer into host'],
  sol: 'DNA must be cut and joined into a vector before it enters the host — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('palindrome-ar', ar({
  a: 'The EcoRI recognition sequence GAATTC is palindromic.',
  r: 'GAATTC reads the same 5′→3′ on both strands of the DNA.',
  key: 'a',
  sol: 'Both are true, and reading the same 5′→3′ on both strands is what makes it palindromic — option (a).',
  d: 3, c: 'understanding', t: [2],
}), () => isPalindrome('GAATTC') || 'pal');
add('ligase-fill', fill({
  stem: 'The enzyme that joins DNA fragments with matching sticky ends into recombinant DNA is DNA ______.',
  acc: [['ligase']],
  sol: 'DNA ligase.',
  d: 1, c: 'recall', t: [2],
}));
{
  const seq = 'ACGAATTCTTGAATTCGGAATTCA';
  const n = digest(seq, 'GAATTC', 1).length;
  add('digest-num', num({
    stem: `A linear DNA whose top strand reads 5′–${seq}–3′ is cut completely with EcoRI (site GAATTC). How many fragments are produced?`,
    value: n,
    sol: r`GAATTC occurs 3 times in the linear molecule, so it is cut into $3 + 1 = ${n}$ fragments.`,
    scheme: [[`${n}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 4 || 'value');
}
{
  const n = expectedSites(65536, 8);
  add('sites-num', num({
    stem: 'In a random DNA sequence, a particular 8-base recognition site is expected once every 4⁸ base pairs. How many times would it be expected in a random stretch of 65 536 base pairs?',
    value: n,
    sol: r`$4^{8} = 65536$; expected sites $= \dfrac{65536}{65536} = ${n}$.`,
    scheme: [[`${n}`, 1]],
    d: 3, c: 'application', t: [2],
  }), (q) => q.answer.value === 1 || 'value');
}
{
  const opts = ['GGATCC', 'GGATCG', 'GAATTA', 'CTGCAA'];
  add('palcheck-mcq', mcq({
    stem: 'Which of these double-stranded sequences, written 5′→3′ for the top strand, could be a restriction-enzyme recognition site because it is palindromic?',
    right: opts[0],
    wrong: opts.slice(1),
    sol: `Only ${opts[0]} has a reverse complement (${reverseComplement(opts[0])}) equal to itself; for example, ${opts[1]} gives ${reverseComplement(opts[1])} — option (@K).`,
    d: 4, c: 'analysis', t: [2],
  }), () => (isPalindrome(opts[0]) && !opts.slice(1).some(isPalindrome)) || 'pal');
}
add('nomen-short', short({
  marks: 2,
  stem: 'Explain how restriction enzymes are named, using EcoRI as an example.',
  model: 'The **first letter** is from the **genus** and the next **two** from the **species** of the bacterium; the next letter gives the **strain**, and the **Roman numeral** the **order** in which the enzyme was isolated from that strain. **EcoRI**: ***E***scherichia ***co***li, strain ***R***Y 13, the **first** (I) enzyme isolated.',
  sol: 'Genus, species, strain, order.',
  scheme: [['Rule', 1], ['EcoRI explained', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('restriction-short', short({
  marks: 3,
  stem: 'State three features of restriction endonucleases that make them useful in genetic engineering.',
  model: '(i) Each recognises a **specific palindromic sequence** and cuts **only there**, so cuts are **predictable**. (ii) Many cut the two strands **a little away from the centre**, leaving **sticky ends** that **pair with complementary ends** made by the same enzyme. (iii) Because the **same enzyme** gives matching ends on any DNA, fragments from **different sources** (vector and foreign DNA) can be **joined by ligase**.',
  sol: 'Specificity, sticky ends, compatibility.',
  scheme: [['Specific palindromic site', 1], ['Staggered cut; sticky ends', 1], ['Same ends on any DNA; joined by ligase', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('sticky-short', short({
  marks: 3,
  stem: 'Explain, with the help of a diagram, how EcoRI produces sticky ends and how these are used to make recombinant DNA.',
  model: '**Diagram:** the duplex with **GAATTC** on the top strand and **CTTAAG** below; EcoRI cuts **between G and A** on **both** strands, a little away from the centre, leaving **single-stranded AATT overhangs** — **sticky ends**. They are “sticky” because they form **hydrogen bonds** with complementary overhangs. If the **vector** and the **foreign DNA** are cut with **EcoRI**, their ends pair, and **DNA ligase** seals the backbones, producing **recombinant DNA**.',
  sol: 'Staggered cut; pairing; ligase.',
  scheme: [['Cut between G and A on both strands', 1], ['AATT overhangs pair by hydrogen bonds', 1], ['Vector and insert joined by ligase', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('rdna-long', long({
  stem: '(a) List the steps involved in recombinant DNA technology, in order. [2]\n(b) Why must the restriction enzyme cut the vector at only one site? [1]\n(c) A scientist wants to make human insulin in bacteria. Explain which steps would use restriction endonuclease, ligase and a competent host. [2]',
  model: '(a) **Isolation of DNA** → **fragmentation by restriction endonuclease** → **isolation of the desired fragment** (gel electrophoresis) → **ligation into a vector** → **transfer into a host** → **culture of the host** on a large scale → **extraction of the product**.\n\n(b) Several sites would cut the vector into **pieces**, destroying genes such as **ori** or markers; a **single site** opens it once for the insert.\n\n(c) The **restriction endonuclease** cuts both the **human DNA** (to release the insulin gene) and the **plasmid**; **DNA ligase** joins the gene into the plasmid; the recombinant plasmid is put into **competent *E. coli*** (calcium chloride, heat shock), which are grown to make insulin.',
  sol: 'Steps; single site; insulin example.',
  scheme: [['(a) Steps in order', 2], ['(b) Single site', 1], ['(c) Enzyme roles and host', 2]],
  wl: [60, 200],
  d: 3, c: 'application', t: [2, 4],
}));

// ---------------------------------------------------------------- t03 cloning vectors
add('ori-mcq', mcq({
  stem: 'Which part of a cloning vector starts replication and controls the copy number of the DNA linked to it?',
  right: 'Origin of replication (ori)',
  wrong: ['Selectable marker', 'Cloning site', 'rop gene'],
  sol: 'Ori is where replication starts and it controls copy number — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('marker-mcq', mcq({
  stem: 'E. coli cells treated with pBR322 are spread on a medium containing ampicillin. Why do only some cells form colonies?',
  right: 'Only cells that took up the plasmid carry ampᴿ and survive.',
  wrong: ['Ampicillin makes the plasmid replicate.', 'All cells are resistant, but some die of heat shock.', 'Ampicillin kills only cells with the plasmid.'],
  sol: 'The selectable marker allows only transformants to grow — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('cloningsite-mcq', mcq({
  stem: 'A plasmid has three EcoRI sites, one of them inside its origin of replication. What happens if it is used as a vector with EcoRI?',
  right: 'It is cut into several pieces and loses the ability to replicate.',
  wrong: ['It accepts three inserts and replicates faster.', 'Nothing, because EcoRI does not cut plasmids.', 'Only the ori is copied.'],
  sol: 'A good vector should have a single site for the chosen enzyme — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('bamhi-mcq', mcq({
  stem: 'In pBR322, the BamHI recognition site lies within which gene?',
  right: 'tetᴿ (tetracycline resistance)',
  wrong: ['ampᴿ (ampicillin resistance)', 'rop', 'ori'],
  sol: 'BamHI and SalI sites are in tetᴿ; PstI and PvuI in ampᴿ — option (@K).',
  d: 2, c: 'recall', t: [3],
  assets: [pbrFig],
}));
add('agro-mcq', mcq({
  stem: 'Why is the Ti plasmid of Agrobacterium tumefaciens “disarmed” before it is used as a vector?',
  right: 'Its tumour-causing genes are removed, so it can deliver useful genes without causing disease.',
  wrong: ['So that it can infect animal cells instead of plants.', 'So that it can no longer enter plant cells at all.', 'To remove its origin of replication.'],
  sol: 'The modified Ti plasmid is non-pathogenic but still transfers DNA — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('yac-mcq', mcq({
  stem: 'Researchers need to clone a 500-kilobase fragment of human DNA in a genome project. Which vector is best suited?',
  right: 'A yeast artificial chromosome (YAC)',
  wrong: ['A small plasmid such as pBR322', 'A disarmed retrovirus', 'Ethidium bromide'],
  sol: 'YACs (and BACs) carry very large inserts — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('rop-fill', fill({
  stem: 'In pBR322, the ______ gene codes for proteins taking part in the replication of the plasmid.',
  acc: [['rop']],
  sol: 'rop.',
  d: 2, c: 'recall', t: [3],
}));
add('vector-short', short({
  marks: 2,
  stem: 'State four features that a good cloning vector should have.',
  model: '(i) An **origin of replication (ori)** to replicate and control **copy number**; (ii) a **selectable marker**, such as an **antibiotic-resistance** gene, to pick out transformants; (iii) **single recognition (cloning) sites** for common restriction enzymes; (iv) **small size**.',
  sol: 'Four features.',
  scheme: [['Two features', 1], ['Two more', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('agro-short', short({
  marks: 3,
  stem: 'Agrobacterium tumefaciens is called a natural genetic engineer of plants. Explain why, and describe how it has been made into a useful vector. Name an equivalent vector for animal cells.',
  model: 'Agrobacterium, a pathogen of **dicot** plants, naturally **transfers a piece of DNA (T-DNA)** from its **Ti plasmid** into plant cells, where it becomes part of the plant genome and **transforms** the cells into a **tumour**. Scientists have **removed the tumour-causing genes**, making the Ti plasmid **non-pathogenic** while keeping its ability to **deliver genes** of interest. In animals, **disarmed retroviruses** are used in the same way.',
  sol: 'T-DNA transfer; disarmed; retroviruses.',
  scheme: [['Natural T-DNA transfer causing tumours', 1], ['Disarmed Ti plasmid delivers useful genes', 1], ['Retroviruses for animals', 1]],
  d: 3, c: 'application', t: [3],
}));
add('vector-long', long({
  stem: '(a) Draw a labelled diagram of the plasmid pBR322, showing ori, rop, the two antibiotic-resistance genes and two restriction sites. [2]\n(b) Explain the role of ori and of a selectable marker. [2]\n(c) A researcher inserts DNA at the PstI site. On which antibiotic will the recombinants fail to grow? Explain. [1]',
  model: '(a) **Diagram:** a circular plasmid with **ori**, **rop**, **ampᴿ** (containing **PstI** and **PvuI** sites) and **tetᴿ** (containing **BamHI** and **SalI** sites), with **EcoRI, HindIII, ClaI** and **PvuII** sites also marked.\n\n(b) **Ori** is where **replication starts**; it lets linked DNA replicate and controls the **copy number**. A **selectable marker** (such as ampᴿ or tetᴿ) lets **transformants** grow on the antibiotic while **non-transformants** die.\n\n(c) **Ampicillin**: PstI lies inside **ampᴿ**, so the insert **inactivates ampicillin resistance** (insertional inactivation); the recombinants still grow on **tetracycline**.',
  sol: 'Diagram; roles; PstI insertion.',
  scheme: [['(a) Labelled map', 2], ['(b) Ori', 1], ['(b) Selectable marker', 1], ['(c) Fail on ampicillin, with reason', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [3, 4],
  assets: [pbrFig],
}));

// ---------------------------------------------------------------- t04 transfer and selection
add('calcium-mcq', mcq({
  stem: 'Which treatment is used to make E. coli cells competent to take up plasmid DNA?',
  right: 'Calcium chloride, incubation on ice, a brief heat shock at 42 °C, then ice again',
  wrong: ['Ethidium bromide and UV light', 'Chilled ethanol and spooling', 'Lysozyme and protease'],
  sol: 'Divalent calcium ions and heat shock increase DNA uptake — option (@K).',
  d: 2, c: 'recall', t: [4],
}));
add('genegun-mcq', mcq({
  stem: 'A team wants to introduce a gene into rice cells, which have tough cell walls. Which method is most suitable?',
  right: 'Biolistics: bombarding cells with gold particles coated with DNA',
  wrong: ['Microinjection into the nucleus of each cell', 'Heat shock with calcium chloride', 'Using a disarmed retrovirus'],
  sol: 'The gene gun suits plant cells — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('microinj-mcq', mcq({
  stem: 'Recombinant DNA is to be introduced directly into the nucleus of a fertilised mouse egg. The method used is',
  right: 'microinjection',
  wrong: ['biolistics', 'gel electrophoresis', 'blue-white selection'],
  sol: 'DNA is injected into the nucleus of animal cells — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('insertion-ar', ar({
  a: 'E. coli carrying pBR322 with foreign DNA inserted at the BamHI site cannot grow on a tetracycline medium.',
  r: 'The insertion inactivates the tetᴿ gene, in which the BamHI site lies.',
  key: 'a',
  sol: 'Both are true, and insertional inactivation of tetᴿ explains the failure to grow — option (a).',
  d: 3, c: 'analysis', t: [4],
}));
add('competent-ar', ar({
  a: 'Bacterial cells are given a brief heat shock to help them take up recombinant DNA.',
  r: 'DNA is a hydrophobic molecule that passes freely through cell membranes.',
  key: 'c',
  sol: 'A is true; R is false: DNA is hydrophilic and cannot pass through membranes unaided, which is why cells must be made competent — option (c).',
  d: 3, c: 'analysis', t: [4],
}));
add('bluewhite-mcq', mcq({
  stem: 'In blue-white selection, a colony is blue on a plate with a chromogenic substrate. What does this tell you?',
  right: 'Its vector has an intact lacZ gene, so it carries no insert.',
  wrong: ['It carries the recombinant vector.', 'It has lost the vector completely.', 'It is resistant to all antibiotics.'],
  sol: 'An insert in lacZ prevents β-galactosidase being made, giving white colonies — option (@K).',
  d: 2, c: 'application', t: [4],
}));
{
  const w = 18, total = 120;
  const p = Math.round((w / total) * 1000) / 10;
  add('transform-num', num({
    stem: `In a blue-white screen, ${total} colonies grew, of which ${w} were white. What percentage of colonies were recombinant?`,
    value: p, unit: '%',
    sol: r`White colonies are recombinant: $\dfrac{${w}}{${total}} \times 100 = ${p}$ percent.`,
    scheme: [[`${p}`, 1]],
    d: 2, c: 'application', t: [4],
  }), (q) => q.answer.value === 15 || 'value');
}
add('heatshock-short', short({
  marks: 2,
  stem: 'A plasmid solution is simply mixed with untreated E. coli cells, and almost none of them take up the plasmid. Explain why, and describe how the cells can be made competent.',
  model: 'DNA is **hydrophilic** and cannot pass through **cell membranes**, so cells must be made **competent**. They are treated with a specific concentration of a **divalent cation, calcium**, incubated with the recombinant DNA **on ice**, given a brief **heat shock at 42 °C**, and returned to **ice**.',
  sol: 'Hydrophilic DNA; calcium and heat shock.',
  scheme: [['Reason', 1], ['Calcium, ice, heat shock, ice', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('bluewhite-short', short({
  marks: 2,
  stem: 'Explain the principle of blue-white selection of recombinants.',
  model: 'The vector carries the **lacZ** gene for **β-galactosidase**. Foreign DNA is inserted **within lacZ**, **inactivating** it (**insertional inactivation**). On a medium with a **chromogenic substrate**, colonies with an intact lacZ make **blue** colour, while **recombinant** colonies cannot and stay **white**, so they are picked by colour.',
  sol: 'lacZ inactivation.',
  scheme: [['Insert inactivates lacZ', 1], ['Blue non-recombinant, white recombinant', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('selection-short', short({
  marks: 3,
  stem: 'A student inserts a gene at the BamHI site of pBR322, transforms E. coli and plates the cells on ampicillin, then replica-plates them on tetracycline. Predict which cells grow where, and identify the recombinants.',
  model: '**Non-transformants** (no plasmid) die on **ampicillin**. Cells with the **non-recombinant** plasmid have intact **ampᴿ and tetᴿ**, so they grow on **both** plates. Cells with the **recombinant** plasmid have **tetᴿ inactivated** by the insert at BamHI, so they grow on **ampicillin but not on tetracycline**. Colonies **missing** from the tetracycline replica are the **recombinants**.',
  sol: 'Three kinds of cell.',
  scheme: [['Non-transformants die on ampicillin', 1], ['Non-recombinants grow on both', 1], ['Recombinants: ampicillin only', 1]],
  d: 3, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- t05 gene amplification
add('taq-mcq', mcq({
  stem: 'Why is Taq polymerase used in the polymerase chain reaction?',
  right: 'It remains active at the high temperatures used to separate the DNA strands.',
  wrong: ['It cuts DNA at palindromic sites.', 'It joins sticky ends.', 'It makes primers from RNA.'],
  sol: 'Taq polymerase from Thermus aquaticus is thermostable — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('denat-mcq', mcq({
  stem: 'The first step of each PCR cycle, in which the two DNA strands are separated by high temperature, is called',
  right: 'denaturation',
  wrong: ['annealing', 'extension', 'elution'],
  sol: 'Denaturation separates the strands — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('primer-mcq', mcq({
  stem: 'Two short, chemically synthesised oligonucleotides are added to every PCR tube along with the template. What is their role?',
  right: 'They bind to complementary sites flanking the target region and provide starting points for the polymerase.',
  wrong: ['They separate the two strands.', 'They make the DNA visible under UV.', 'They join fragments into a vector.'],
  sol: 'Primers anneal to the ends of the target, and Taq extends them — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('taq-ar', ar({
  a: 'Two primers are needed in each PCR reaction.',
  r: 'Taq polymerase is obtained from the bacterium Thermus aquaticus.',
  key: 'b',
  sol: 'Both are true, but the source of Taq does not explain why two primers are needed (one for each strand of the target) — option (b).',
  d: 3, c: 'understanding', t: [5],
}));
{
  const c = pcr(10, 5);
  add('pcr-num', num({
    stem: 'A PCR begins with 5 copies of a target DNA. Assuming perfect doubling, how many copies are present after 10 cycles?',
    value: c,
    sol: r`Copies $= 5 \times 2^{10} = ${c}$.`,
    scheme: [[`${c}`, 1]],
    d: 2, c: 'application', t: [5],
  }), (q) => q.answer.value === 5120 || 'value');
}
{
  let n = 0;
  while (pcr(n, 1) < 1000) n += 1;
  add('pcrcycles-num', num({
    stem: 'Only one molecule of a target DNA is recovered from a hair at a crime scene, and the test needs at least 1000 copies. What is the smallest number of PCR cycles required?',
    value: n,
    sol: r`$2^{9} = 512 < 1000$ and $2^{10} = 1024 \ge 1000$, so the smallest number of cycles is $n = ${n}$.`,
    scheme: [[`${n}`, 1]],
    d: 3, c: 'application', t: [5],
  }), (q) => q.answer.value === 10 || 'value');
}
add('invivo-short', short({
  marks: 2,
  stem: 'A gene can be multiplied by PCR or by cloning in a host. Give two differences between these methods of amplification.',
  model: '**PCR** amplifies DNA **in vitro**, in a tube, using **primers and Taq polymerase**, and gives **DNA only**. **Cloning** amplifies it **in vivo**: the vector **replicates inside host cells** using the **ori** and the host’s enzymes, and if the gene is **expressed**, the host also makes the **protein**.',
  sol: 'In vitro vs in vivo.',
  scheme: [['Place and enzymes', 1], ['Product: DNA only vs DNA and protein', 1]],
  d: 2, c: 'application', t: [5],
}));
add('pcr-short', short({
  marks: 3,
  stem: 'Describe the three steps of a PCR cycle and explain why the amount of DNA doubles each cycle.',
  model: '**Denaturation:** high temperature separates the double-stranded DNA into **single strands**. **Annealing:** at a lower temperature, two **primers** bind to complementary sites flanking the target. **Extension:** the **thermostable Taq polymerase** adds nucleotides to the primers, copying each strand. Since **each strand acts as a template**, every DNA molecule gives **two** in each cycle, so copies **double** (2ⁿ after n cycles).',
  sol: 'Three steps; doubling.',
  scheme: [['Denaturation', 1], ['Annealing and extension with Taq', 1], ['Each strand templated: doubling', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('pcr-long', long({
  stem: '(a) Explain the polymerase chain reaction with a labelled diagram of one cycle. [3]\n(b) How many copies would 2 starting molecules give after 15 cycles? [1]\n(c) State one use of PCR. [1]',
  model: `(a) **Diagram:** double-stranded DNA → **denaturation** (high temperature; strands separate) → **annealing** (two **primers** bind to complementary ends of the target) → **extension** (**Taq polymerase**, heat-stable, from *Thermus aquaticus*, adds nucleotides) → **two** double-stranded copies; the cycle is **repeated**.\n\n(b) $2 \\times 2^{15} =$ **${pcr(15, 2)}** copies.\n\n(c) Amplifying a **gene for cloning**, **early diagnosis** of infections (detecting very low numbers of a pathogen), or **DNA fingerprinting** from tiny samples.`,
  sol: 'Cycle; copies; use.',
  scheme: [['(a) Three labelled steps', 2], ['(a) Taq polymerase', 1], [`(b) ${pcr(15, 2)}`, 1], ['(c) One use', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [5],
}), () => pcr(15, 2) === 65536 || 'pcr');

// ---------------------------------------------------------------- t06 bioreactors and downstream processing
add('stirred-mcq', mcq({
  stem: 'Cells in the lower part of a tall stirred-tank bioreactor grow poorly whenever the impeller is switched off. What role does the impeller play?',
  right: 'It mixes the contents evenly and spreads oxygen throughout the culture.',
  wrong: ['It removes the product from the cells.', 'It kills contaminating microbes.', 'It separates DNA fragments by size.'],
  sol: 'The agitator ensures even mixing and oxygen availability — option (@K).',
  d: 2, c: 'understanding', t: [6],
}));
add('sparged-mcq', mcq({
  stem: 'A culture in a bioreactor is short of oxygen, but its cells are damaged by a fast impeller. Which design would help most?',
  right: 'A sparged-tank bioreactor, which bubbles sterile air through the medium',
  wrong: ['A larger stirred tank with a faster impeller', 'An agarose gel tank', 'A plain flask without aeration'],
  sol: 'Sparging increases oxygen transfer without strong mechanical mixing — option (@K).',
  d: 3, c: 'application', t: [6],
}));
add('downstream-mcq', mcq({
  stem: 'Separation and purification of the product after the biosynthetic stage, followed by formulation with preservatives, is called',
  right: 'downstream processing',
  wrong: ['bioprocess engineering', 'transformation', 'gene amplification'],
  sol: 'These steps make up downstream processing — option (@K).',
  d: 1, c: 'recall', t: [6],
}));
add('bioreactor-ar', ar({
  a: 'A sparged-tank bioreactor depends on a motor-driven impeller for all its mixing.',
  r: 'Smaller DNA fragments move more slowly in an agarose gel.',
  key: 'd',
  sol: 'Both are false: a sparged tank mixes with air bubbles, and smaller fragments move faster in a gel — option (d).',
  d: 2, c: 'understanding', t: [6],
}));
add('volume-fill', fill({
  stem: 'Bioreactors are used to process large volumes of culture, typically from 100 to ______ litres.',
  acc: [['1000', '1,000']],
  sol: '1000 litres.',
  d: 1, c: 'recall', t: [6],
}));
add('downstream-short', short({
  marks: 2,
  stem: 'What is downstream processing, and why are clinical trials and quality control part of it for drugs?',
  model: '**Downstream processing** is the **separation and purification** of the product after the biosynthetic stage, followed by **formulation** with suitable **preservatives**. For drugs, **clinical trials** and strict **quality control** ensure the product is **safe and effective** before it is marketed.',
  sol: 'Definition; safety.',
  scheme: [['Separation, purification, formulation', 1], ['Trials and QC for safety', 1]],
  d: 2, c: 'understanding', t: [6],
}));
add('bioreactor-short', short({
  marks: 3,
  stem: 'List the systems that a bioreactor must have and explain why such control is needed for large-scale production.',
  model: 'A bioreactor has an **agitator** system, an **oxygen-delivery** system (sparger), a **foam-control** system, a **temperature-control** system, a **pH-control** system and **sampling ports**. These keep **optimal conditions** — temperature, pH, substrate, salts, vitamins and oxygen — so that the desired cells grow **rapidly and uniformly** in **100–1000 litres** and produce the **maximum product** without contamination.',
  sol: 'Systems; optimal conditions.',
  scheme: [['Agitator and oxygen supply', 1], ['Foam, temperature, pH control, sampling', 1], ['Optimal conditions for growth and yield', 1]],
  d: 2, c: 'understanding', t: [6],
}));
add('bioreactor-long', long({
  stem: '(a) Draw a labelled diagram of a stirred-tank bioreactor. [2]\n(b) How does a sparged-tank bioreactor differ from it? [1]\n(c) Why must the medium and air supplied to a bioreactor be sterile? [1]\n(d) Why is the product passed through downstream processing before sale? [1]',
  model: '(a) **Diagram:** a **cylindrical vessel** with a **curved base**; a **motor-driven impeller (agitator)**; a **sterile-air inlet (sparger)** at the bottom; a **foam breaker** and **exhaust**; a **temperature-control jacket**; **pH probe** and **sampling port**.\n\n(b) In a **sparged tank**, **sterile air bubbles** do the mixing and aeration, increasing oxygen transfer, instead of a strong impeller.\n\n(c) **Contaminating microbes** would compete with the desired cells, spoil the product and could be **harmful**; bioprocess engineering requires **sterile** conditions.\n\n(d) The product must be **separated, purified** and **formulated** (with preservatives), and drugs must pass **clinical trials and quality control**.',
  sol: 'Diagram; sparged; sterility; downstream.',
  scheme: [['(a) Labelled bioreactor', 2], ['(b) Sparged difference', 1], ['(c) Sterility', 1], ['(d) Downstream processing', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [6],
}));

// ---------------------------------------------------------------- stimulus-based
add('selection-case', mk.case({
  passage: 'A gene was ligated into the BamHI site of pBR322 and the mixture was used to transform competent E. coli. Colonies from an ampicillin plate were replica-plated onto a tetracycline plate.\n\n| Colony | Grows on ampicillin | Grows on tetracycline |\n|---|---|---|\n| 1 | Yes | Yes |\n| 2 | Yes | No |\n| 3 | Yes | Yes |\n| 4 | Yes | No |\n| 5 | Yes | Yes |',
  d: 3, c: 'analysis',
  assets: [pbrFig],
  children: [
    part('a', num({
      stem: 'How many of the five colonies carry the recombinant plasmid?',
      value: 2,
      sol: 'Colonies 2 and 4 grow on ampicillin but not tetracycline: 2 recombinants.',
      scheme: [['2', 1]],
      d: 2, c: 'application', t: [4],
    })),
    part('b', mcq({
      stem: 'Why can colonies 1, 3 and 5 grow on tetracycline?',
      right: 'Their plasmids have no insert, so tetᴿ is intact.',
      wrong: ['They carry the insert inside ampᴿ.', 'They have lost the plasmid.', 'Tetracycline does not affect E. coli.'],
      sol: 'Non-recombinant plasmids keep both resistance genes — option (@K).',
      d: 3, c: 'analysis', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'Why did no colonies of untransformed cells appear on the ampicillin plate?',
      model: 'Most cells in the mixture did not take up any plasmid. These untransformed cells **lack the plasmid**, so they have **no ampᴿ gene** to protect them, and **ampicillin kills** them. The ampicillin plate therefore allows only **transformants** — cells carrying pBR322, with or without an insert — to form colonies.',
      sol: 'No ampᴿ.',
      scheme: [['No plasmid, no ampᴿ', 1], ['Killed: only transformants grow', 1]],
      d: 3, c: 'analysis', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'Why is blue-white selection often preferred to this two-plate method?',
        model: 'The two-plate method is **cumbersome**: colonies must be **replica-plated** on two media. In blue-white selection, recombinants are recognised **directly by colour** on a **single plate**.',
        sol: 'One plate, by colour.',
        scheme: [['Two-plate method laborious', 1], ['Blue-white: single plate, colour', 1]],
        d: 2, c: 'understanding', t: [4],
      }),
    ]),
  ],
}), (q) => q.children[0].answer.value === 2 || 'value');
{
  const seq = 'GCGAATTCAAAAAAAAAAAAGAATTCTT';
  const frags = digest(seq, 'GAATTC', 1);
  add('gel-case', mk.case({
    passage: `A linear DNA with the top strand 5′–${seq}–3′ was cut with EcoRI (site GAATTC, cut between G and A) and the fragments were run on an agarose gel beside a ladder of known sizes (see the figure).`,
    d: 3, c: 'analysis',
    assets: [gelFig],
    children: [
      part('a', num({
        stem: 'How many fragments did EcoRI produce?',
        value: frags.length,
        sol: `Two sites in a linear molecule give ${frags.length} fragments: ${frags.join(', ')}.`,
        scheme: [[`${frags.length}`, 1]],
        d: 2, c: 'application', t: [2],
      })),
      part('b', mcq({
        stem: 'Which fragment will move farthest from the wells?',
        right: `The shortest fragment, ${[...frags].sort((x, y) => x.length - y.length)[0]}`,
        wrong: [`The longest fragment, ${[...frags].sort((x, y) => y.length - x.length)[0]}`, 'All fragments move together', 'None, because DNA moves towards the cathode'],
        sol: 'Smaller fragments pass through the agarose sieve faster — option (@K).',
        d: 3, c: 'analysis', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'Why is a ladder of known fragment sizes run on the same gel?',
        model: 'The ladder contains fragments of **known size**, which form reference bands. Because all lanes run under the **same conditions**, the **distance moved** by each unknown band can be compared with the ladder bands, and its **size estimated** by interpolation between them.',
        sol: 'Reference for size.',
        scheme: [['Known sizes as reference', 1], ['Estimate unknown sizes by distance', 1]],
        d: 3, c: 'analysis', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'How would the bands be made visible, and how would the middle fragment be recovered for cloning?',
          model: 'The gel is stained with **ethidium bromide** and viewed under **UV light**, showing **orange bands**. The required band is **cut out** and the DNA **extracted** from the gel piece (**elution**).',
          sol: 'EtBr, UV, elution.',
          scheme: [['Ethidium bromide and UV', 1], ['Cut out and elute', 1]],
          d: 2, c: 'application', t: [1],
        }),
      ]),
    ],
  }), (q) => q.children[0].answer.value === 3 || 'value');
}
