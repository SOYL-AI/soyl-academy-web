// ch09 Biotechnology: Principles and Processes — question bank. AR keys planned: a b a c a.
import { mk, add, r } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { isPalindrome, reverseComplement, digest, expectedSites, pcr, migration } from './calc.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const keyText = (q) => q.options.find((o) => o.id === q.answer.option_ids[0]).text_md;

// ---------------------------------------------------------------- t01 principles and tools
add('ecori-name-mcq', mcq({
  stem: 'In the name EcoRI, what does “R” stand for?',
  right: 'The strain of the bacterium (RY 13)',
  wrong: ['The species of the bacterium', 'Restriction', 'The order in which the enzyme was isolated'],
  sol: 'E = genus Escherichia, co = species coli, R = strain RY 13, I = order of isolation — option (@K).',
  d: 2, c: 'recall', t: [1],
}));
add('sticky-ar', ar({
  a: 'A gene and the vector into which it is to be inserted should be cut with the same restriction enzyme.',
  r: 'The same enzyme produces matching sticky ends that can pair and be joined by DNA ligase.',
  key: 'a',
  sol: 'Both are true; matching sticky ends are the reason for using the same enzyme — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('bamhi-mcq', mcq({
  stem: 'Foreign DNA is inserted at the BamHI site of pBR322 and the plasmid is put into E. coli. How will the recombinant cells behave?',
  right: 'They grow on ampicillin but not on tetracycline.',
  wrong: ['They grow on tetracycline but not on ampicillin.', 'They grow on both antibiotics.', 'They grow on neither antibiotic.'],
  sol: 'The BamHI site lies in the tetracycline-resistance gene, so the insert inactivates it while ampR stays intact — option (@K).',
  d: 3, c: 'application', t: [1],
}));
{
  const opts = ['GGATCC', 'GAATTG', 'GACGTA', 'AATTCG'];
  add('palindrome-mcq', mcq({
    stem: 'Which of these double-stranded sequences (top strand shown 5′→3′) could be the recognition site of a restriction endonuclease?',
    right: opts[0],
    wrong: opts.slice(1),
    sol: `Only GGATCC equals its reverse complement (${reverseComplement('GGATCC')}), so it reads the same 5′→3′ on both strands — option (@K).`,
    d: 2, c: 'application', t: [1],
  }), (q) => isPalindrome(keyText(q)) && opts.slice(1).every((s) => !isPalindrome(s)) || 'palindrome');
}
add('cohen-mcq', mcq({
  stem: 'The first recombinant DNA was made in 1972 by',
  right: 'Stanley Cohen and Herbert Boyer, using a plasmid of Salmonella typhimurium',
  wrong: ['Watson and Crick, using bacteriophage DNA', 'Kary Mullis, using PCR', 'Alexander Fleming, using Penicillium'],
  sol: 'Cohen and Boyer linked an antibiotic-resistance gene to a native plasmid of Salmonella typhimurium and transferred it into E. coli — option (@K).',
  d: 2, c: 'recall', t: [1],
}));
add('exo-mcq', mcq({
  stem: 'How does a restriction endonuclease differ from an exonuclease?',
  right: 'It cuts DNA at specific positions within the molecule, whereas an exonuclease removes nucleotides from the ends.',
  wrong: ['It joins DNA fragments, whereas an exonuclease cuts them.', 'It copies DNA, whereas an exonuclease translates it.', 'It works only on RNA.'],
  sol: 'Endonucleases cut within DNA at recognition sites; exonucleases remove nucleotides from the ends — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
{
  const sizes = [4000, 1500, 300];
  const far = sizes.reduce((a, b) => (migration(a) > migration(b) ? a : b));
  add('gel-mcq', mcq({
    stem: 'A mixture of DNA fragments of 4000 bp, 1500 bp and 300 bp is run on an agarose gel. Which fragment is found farthest from the well?',
    right: '300 bp',
    wrong: ['4000 bp', '1500 bp', 'All travel the same distance'],
    sol: 'The gel acts as a sieve; the smallest fragment moves fastest towards the anode — option (@K).',
    d: 2, c: 'application', t: [1],
  }), () => far === 300 || 'migration');
}
add('ethidium-tf', tf({
  stem: 'DNA bands in an agarose gel can be seen with the naked eye without any staining.',
  key: 'f',
  sol: 'False. DNA is stained with ethidium bromide and seen as bright orange bands under UV light.',
  d: 1, c: 'recall', t: [1],
}));
add('anode-mcq', mcq({
  stem: 'Why does DNA move towards the anode during gel electrophoresis?',
  right: 'DNA is negatively charged because of its phosphate groups.',
  wrong: ['DNA is positively charged because of its bases.', 'Agarose pushes DNA towards the anode.', 'Ethidium bromide carries DNA to the anode.'],
  sol: 'The phosphate backbone gives DNA a negative charge, so it moves towards the positive electrode (anode) — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('elution-fill', fill({
  stem: 'Cutting out a separated DNA band from an agarose gel and extracting the DNA from it is called ______.',
  acc: [['elution']],
  sol: 'Elution.',
  d: 1, c: 'recall', t: [1],
}));
add('ori-mcq', mcq({
  stem: 'A gene is joined to a DNA fragment that lacks an origin of replication and is put into E. coli. What is most likely to happen to the gene as the bacteria multiply?',
  right: 'It is not copied, so it is lost from most of the cells as they divide.',
  wrong: ['It is copied many times, because all DNA in a cell replicates.', 'It makes the bacteria resistant to all antibiotics.', 'It is cut out by DNA ligase.'],
  sol: 'Only DNA linked to an ori is replicated; without one, the gene is diluted out as cells divide — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('marker-mcq', mcq({
  stem: 'After transformation, a scientist spreads E. coli on a medium containing ampicillin. The vector carries an ampicillin-resistance gene. What does this step achieve?',
  right: 'Only cells that have taken up the vector survive and form colonies.',
  wrong: ['All cells become recombinant.', 'The vector is cut open.', 'Non-transformed cells are converted into transformants.'],
  sol: 'The resistance gene is a selectable marker: untransformed cells die on ampicillin, so transformants are selected — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('bluewhite-mcq', mcq({
  stem: 'In blue-white screening, a colony stays white on a medium with a chromogenic substrate. What does this indicate?',
  right: 'The colony is recombinant: the insert has inactivated the β-galactosidase gene.',
  wrong: ['The colony has no plasmid at all.', 'The colony contains a non-recombinant plasmid with an active β-galactosidase gene.', 'The colony is resistant to all antibiotics.'],
  sol: 'An insert inactivates β-galactosidase, so the substrate is not converted into a blue product; the colony stays white — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('agro-mcq', mcq({
  stem: 'Which bacterium is called a natural genetic engineer of plants because it transfers a piece of its DNA into plant cells?',
  right: 'Agrobacterium tumefaciens',
  wrong: ['Escherichia coli', 'Thermus aquaticus', 'Salmonella typhimurium'],
  sol: 'Agrobacterium tumefaciens transfers T-DNA from its Ti plasmid into plant cells — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('calcium-mcq', mcq({
  stem: 'Why are bacterial cells treated with calcium ions and given a heat shock before transformation?',
  right: 'To make them competent, so that hydrophilic DNA can enter through the cell wall and membrane',
  wrong: ['To kill the bacteria before adding DNA', 'To cut the plasmid open', 'To make the bacteria resistant to antibiotics'],
  sol: 'DNA cannot pass through membranes; calcium and heat shock make the cells competent to take it up — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('gun-mcq', mcq({
  stem: 'A scientist wants to introduce a gene into rice cells without using any bacterial or viral vector. Which method is suitable?',
  right: 'Biolistics: bombarding the cells with gold or tungsten particles coated with the DNA',
  wrong: ['Micro-injection into the nucleus of a bacterium', 'Treating the rice cells with ethidium bromide', 'Running the DNA on an agarose gel'],
  sol: 'The gene gun (biolistics) is suitable for plant cells and needs no vector — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('ligase-mcq', mcq({
  stem: 'Fragment X was cut out with EcoRI and fragment Y with BamHI. A plasmid was opened with EcoRI. Which fragment can be inserted into the plasmid by DNA ligase most easily, and why?',
  right: 'X, because its sticky ends match those of the EcoRI-cut plasmid',
  wrong: ['Y, because BamHI sites are palindromes', 'Both equally, because ligase joins any ends', 'Neither, because ligase cuts DNA'],
  sol: 'Only fragments cut with the same enzyme have complementary sticky ends that pair before ligation — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('kana-mcq', mcq({
  stem: 'A vector carries a kanamycin-resistance gene as its selectable marker. On which medium should transformed cells be grown to select transformants?',
  right: 'Medium containing kanamycin',
  wrong: ['Medium without any antibiotic', 'Medium containing ethidium bromide', 'Medium containing lysozyme'],
  sol: 'Only cells carrying the vector survive on kanamycin, so transformants are selected — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('animal-mcq', mcq({
  stem: 'A scientist wants to introduce a gene directly into the nucleus of a fertilised egg of a cow. Which method is most suitable?',
  right: 'Micro-injection',
  wrong: ['Biolistics with gold particles', 'Calcium chloride and heat shock', 'Agrobacterium-mediated transfer'],
  sol: 'Recombinant DNA is injected directly into the nucleus of animal cells by micro-injection — option (@K).',
  d: 2, c: 'application', t: [1],
}));
{
  const cuts = 3;
  add('circle-num', num({
    stem: 'A circular plasmid has three recognition sites for an enzyme and is cut completely. How many DNA fragments are produced?',
    value: cuts,
    sol: r`A circle has no free ends, so each cut adds one fragment only after the first opens it: number of fragments $= 3$, equal to the number of cuts.`,
    scheme: [['3', 1]],
    d: 3, c: 'application', t: [1],
  }), (q) => q.answer.value === 3 || 'value');
}
add('microinj-tf', tf({
  stem: 'In micro-injection, recombinant DNA is injected directly into the nucleus of an animal cell.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [1],
}));
{
  const seq = 'ATGAATTCGGCTAGAATTCTTACGAATTCAG';
  const n = digest(seq, 'GAATTC', 1).length;
  add('fragments-num', num({
    stem: `A linear DNA strand 5′–${seq}–3′ is digested completely with EcoRI (site GAATTC, cut between G and A). How many fragments are produced?`,
    value: n,
    sol: r`GAATTC occurs 3 times, giving 3 cuts; a linear molecule with 3 cuts gives $3 + 1 = ${n}$ fragments.`,
    scheme: [[`${n}`, 1]],
    d: 3, c: 'application', t: [1],
  }), (q) => q.answer.value === 4 || 'value');
}
{
  const e = expectedSites(8192, 4);
  add('sites-num', num({
    stem: 'A restriction enzyme recognises a four-base sequence. In random DNA, about how many recognition sites would you expect in 8192 base pairs?',
    value: e,
    sol: r`A four-base site occurs about once in $4^4 = 256$ bases; $\dfrac{8192}{256} = ${e}$.`,
    scheme: [[`${e}`, 1]],
    d: 3, c: 'application', t: [1],
  }), (q) => q.answer.value === 32 || 'value');
}
add('tools-match', match({
  stem: 'Match each component (column I) with its role (column II).',
  pairs: [
    ['Restriction endonuclease', 'Cuts DNA at a specific sequence'],
    ['DNA ligase', 'Joins DNA fragments'],
    ['Origin of replication', 'Starts replication of the vector'],
    ['Selectable marker', 'Identifies transformed cells'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Restriction endonuclease — cuts; ligase — joins; ori — starts replication; selectable marker — identifies transformants.',
  d: 1, c: 'recall', t: [1],
}));
add('ti-ar', ar({
  a: 'The Ti plasmid of Agrobacterium tumefaciens is used as a cloning vector for plants after it is disarmed.',
  r: 'Agrobacterium tumefaciens causes tumours in many dicot plants.',
  key: 'b',
  sol: 'Both are true, but tumour-forming ability is the reason it must be disarmed, not the reason it is a useful vector; its usefulness lies in delivering DNA into plant cells — option (b).',
  d: 3, c: 'analysis', t: [1],
}));
add('gel-ar', ar({
  a: 'In agarose gel electrophoresis, smaller DNA fragments travel farther than larger ones.',
  r: 'The agarose gel acts as a sieve, slowing down larger fragments more.',
  key: 'a',
  sol: 'Both are true; the sieving effect explains the separation by size — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('biotech-short', short({
  marks: 2,
  stem: 'Define biotechnology and name its two core techniques.',
  model: 'Biotechnology is the **integration of natural science and organisms, cells, parts thereof and molecular analogues for products and services** (European Federation of Biotechnology). Its two core techniques are **genetic engineering** and **bioprocess engineering** (maintaining a sterile ambience to grow the desired cells in large quantities).',
  sol: 'Definition and two techniques.',
  scheme: [['Definition', 1], ['Two core techniques', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('ecori-short', short({
  marks: 2,
  stem: 'Explain how restriction enzymes such as EcoRI are named, using EcoRI as the example.',
  model: 'The first letter is the **genus** and the next two letters the **species** of the bacterium (**E**scherichia **co**li); the next letter is the **strain** (**R**, from RY 13); the Roman numeral is the **order in which the enzyme was isolated** from that strain (**I** = first).',
  sol: 'Genus, species, strain, order.',
  scheme: [['Genus and species letters', 1], ['Strain letter and Roman numeral', 1]],
  d: 2, c: 'recall', t: [1],
}));
{
  const s = 'GGATCC';
  add('palin-short', short({
    marks: 2,
    stem: `The enzyme BamHI recognises the sequence 5′–${s}–3′. Write the complementary strand and show that the site is a palindrome. What kind of ends does BamHI leave if it cuts between the two Gs on each strand?`,
    model: `Complementary strand: **3′–CCTAGG–5′**; read 5′→3′ it is **${reverseComplement(s)}**, the **same** as the top strand, so the site is a **palindrome**. Cutting between G and G on both strands is **staggered**, leaving single-stranded **sticky ends** (GATC overhangs).`,
    sol: 'Reverse complement equals the original; staggered cut gives sticky ends.',
    scheme: [['Complementary strand and palindrome shown', 1], ['Sticky ends', 1]],
    d: 3, c: 'application', t: [1],
  }), () => isPalindrome('GGATCC') || 'palindrome');
}
add('competent-short', short({
  marks: 2,
  stem: 'Why must bacterial cells be made competent before transformation, and how is this done?',
  model: 'DNA is **hydrophilic** and cannot pass through cell membranes, so bacteria do not take it up easily. The cells are treated with a **divalent cation such as calcium**, which increases the efficiency of DNA entry; they are incubated **on ice** with the recombinant DNA, given a brief **heat shock at 42 °C**, and returned to ice.',
  sol: 'Hydrophilic DNA; calcium and heat shock.',
  scheme: [['Reason: DNA cannot cross membranes', 1], ['Calcium treatment and heat shock', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('gel-short', short({
  marks: 3,
  stem: 'Describe agarose gel electrophoresis and how the separated DNA is seen and recovered.',
  model: 'DNA fragments are loaded into wells of an **agarose gel** (agarose comes from seaweed) at the **cathode** end. An electric current is passed; the **negatively charged** DNA moves towards the **anode**. The gel acts as a **sieve**, so **smaller fragments move farther**, separating by size.\n\nThe DNA is stained with **ethidium bromide** and seen as **orange bands under UV light**. A band is cut out and its DNA extracted (**elution**) for use in constructing recombinant DNA.',
  sol: 'Loading, migration by size, staining, elution.',
  scheme: [['Movement of negatively charged DNA to the anode', 1], ['Separation by size (sieving)', 1], ['Staining with ethidium bromide and elution', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('vector-short', short({
  marks: 3,
  stem: 'State three features required in a cloning vector, and explain the role of each.',
  model: '1. **Origin of replication (ori):** where replication starts; it also controls the **copy number** of the linked DNA.\n\n2. **Selectable marker:** a gene, usually for **antibiotic resistance** (ampicillin, tetracycline and so on), that helps **identify transformants** and eliminate non-transformants.\n\n3. **Cloning sites:** very few, preferably **single**, recognition sites for common restriction enzymes, so the vector is cut only once and the gene is inserted neatly. (Small size is also useful.)',
  sol: 'Ori, marker, cloning sites.',
  scheme: [['Ori with role', 1], ['Selectable marker with role', 1], ['Cloning sites with role', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('insertional-short', short({
  marks: 3,
  stem: 'A student inserts a gene at the BamHI site of pBR322 and transforms E. coli. Describe how she can identify the colonies that contain recombinant plasmids.',
  model: 'She first plates the cells on **ampicillin**: only cells with a plasmid (recombinant or not) grow, because **ampR** is intact. She then transfers (replica-plates) the colonies onto **tetracycline**. The BamHI site lies in **tetR**, so an insert there **inactivates** it (**insertional inactivation**). Colonies that grow on ampicillin but **fail to grow on tetracycline** are the **recombinants**.',
  sol: 'Ampicillin then tetracycline; insertional inactivation.',
  scheme: [['Ampicillin selects transformants', 1], ['Insert inactivates tetR', 1], ['Recombinants: amp-resistant, tet-sensitive', 1]],
  d: 3, c: 'application', t: [1],
}));
add('tools-long', long({
  stem: 'Describe the tools of recombinant DNA technology: restriction enzymes, cloning vectors and competent hosts.',
  model: '**Restriction enzymes.** Restriction endonucleases cut DNA at specific recognition sequences, which are palindromes reading the same 5′→3′ on both strands (for example GAATTC for EcoRI). Many cut the two strands a little away from the centre, leaving sticky ends. The vector and source DNA are cut with the same enzyme so that their sticky ends match and can be joined by DNA ligase. More than 900 such enzymes are known; their names, such as EcoRI, give the genus, species, strain and order of isolation.\n\n**Cloning vectors.** Plasmids and bacteriophages are used. A vector needs an origin of replication, which also controls copy number; a selectable marker such as an ampicillin- or tetracycline-resistance gene; few, preferably single, cloning sites; and small size. In pBR322, inserting DNA into tetR causes insertional inactivation, which identifies recombinants; blue-white screening uses the β-galactosidase gene instead. For plants, the disarmed Ti plasmid of Agrobacterium tumefaciens is used; for animals, disarmed retroviruses.\n\n**Competent hosts.** Because DNA is hydrophilic, bacterial cells are made competent by calcium treatment and a heat shock at 42 °C. Other methods are micro-injection into the nucleus of animal cells and biolistics (gene gun) for plant cells.',
  sol: 'Enzymes, vectors, hosts.',
  scheme: [['Restriction enzymes, palindromes, sticky ends', 1.5], ['Vector features', 1.5], ['Selection and plant/animal vectors', 1], ['Competent hosts and methods', 1]],
  wl: [80, 240],
  d: 3, c: 'understanding', t: [1],
}));
add('selection-long', long({
  stem: 'After transformation, a culture contains three kinds of E. coli cells: without any plasmid, with a non-recombinant plasmid, and with a recombinant plasmid. Explain how antibiotic resistance and insertional inactivation can be used to identify each kind, and compare this with blue-white screening.',
  model: '**Antibiotic selection.** The vector pBR322 carries ampicillin- and tetracycline-resistance genes, and the gene was inserted at the BamHI site inside tetR. On ampicillin medium, cells without a plasmid die, while cells with either kind of plasmid grow, because ampR is intact. The colonies are then replica-plated onto tetracycline. Non-recombinant plasmids still have a working tetR, so their cells grow. In recombinants the insert has inactivated tetR (insertional inactivation), so they do not grow. Thus: no plasmid — no growth on either; non-recombinant — grows on both; recombinant — grows on ampicillin only.\n\n**Blue-white screening.** Here the gene is inserted into the coding sequence of β-galactosidase. On a medium with a chromogenic substrate, non-recombinant colonies, with an active enzyme, turn blue; recombinant colonies, whose enzyme gene is inactivated, stay white.\n\n**Comparison.** Antibiotic selection needs two plates and replica plating; blue-white screening identifies recombinants on a single plate by colour, so it is simpler and faster.',
  sol: 'Three cell types on two antibiotics; colour screening; comparison.',
  scheme: [['Ampicillin selects plasmid-containing cells', 1], ['Tetracycline identifies recombinants (insertional inactivation)', 1.5], ['Outcome for each cell type', 1], ['Blue-white screening explained', 1], ['Comparison', 0.5]],
  wl: [80, 240],
  d: 4, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 processes
add('taq-mcq', mcq({
  stem: 'Why is Taq polymerase used in PCR?',
  right: 'It remains active at the high temperatures used to separate DNA strands.',
  wrong: ['It cuts DNA at palindromic sites.', 'It joins sticky ends.', 'It is found in human cells.'],
  sol: 'Taq polymerase, from the hot-spring bacterium Thermus aquaticus, is thermostable, so it survives each denaturation step — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('stirrer-mcq', mcq({
  stem: 'In a stirred-tank bioreactor, what is the main role of the stirrer?',
  right: 'To mix the contents evenly and make oxygen available throughout the culture',
  wrong: ['To cut DNA into fragments', 'To keep the culture at a low temperature', 'To separate the product from the cells'],
  sol: 'The stirrer facilitates even mixing and oxygen availability throughout the bioreactor — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('ethanol-ar', ar({
  a: 'Adding chilled ethanol to a purified cell extract makes DNA come out as fine threads.',
  r: 'Chilled ethanol digests the RNA and proteins in the extract.',
  key: 'c',
  sol: 'A is true: DNA precipitates in chilled ethanol. R is false: RNA and proteins are removed earlier by ribonuclease and protease — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('cellulase-mcq', mcq({
  stem: 'A scientist wants to isolate DNA from spinach leaves. Which enzyme should she use to break the cell walls?',
  right: 'Cellulase',
  wrong: ['Lysozyme', 'Chitinase', 'Ligase'],
  sol: 'Plant cell walls are made of cellulose, broken down by cellulase; lysozyme is for bacteria and chitinase for fungi — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('rnase-mcq', mcq({
  stem: 'A student’s DNA preparation is found to be contaminated with a lot of RNA. Which enzyme should she add to remove it without harming the DNA?',
  right: 'Ribonuclease',
  wrong: ['Protease', 'DNA ligase', 'Restriction endonuclease'],
  sol: 'Ribonuclease degrades RNA only; protease removes proteins; ligase and restriction enzymes act on DNA — option (@K).',
  d: 2, c: 'application', t: [2],
}));
{
  const v = pcr(25, 4);
  add('pcr-num', num({
    stem: 'A PCR reaction starts with 4 copies of a target DNA. Assuming perfect doubling, how many copies are present after 25 cycles?',
    value: v,
    sol: r`Copies $= 4 \times 2^{25} = 4 \times 33\,554\,432 = ${v}$.`,
    scheme: [[`${v}`, 1]],
    d: 3, c: 'application', t: [2],
  }), (q) => q.answer.value === 4 * 2 ** 25 || 'value');
}
{
  let n = 0;
  while (pcr(n) < 1000) n++;
  add('cycles-num', num({
    stem: 'Starting from a single DNA molecule, what is the smallest number of PCR cycles needed to obtain at least 1000 copies?',
    value: n,
    sol: r`$2^9 = 512 < 1000$ and $2^{10} = 1024 \geq 1000$, so the number of cycles needed is $n = ${n}$.`,
    scheme: [[`${n}`, 1]],
    d: 3, c: 'application', t: [2],
  }), (q) => q.answer.value === 10 || 'value');
}
add('chitinase-mcq', mcq({
  stem: 'Which enzyme should be used to break open the cells of a mushroom (a fungus) before isolating its DNA?',
  right: 'Chitinase',
  wrong: ['Lysozyme', 'Cellulase', 'Ribonuclease'],
  sol: 'Fungal cell walls contain chitin, digested by chitinase — option (@K).',
  d: 2, c: 'application', t: [2],
}));
{
  const v = pcr(10, 3);
  add('pcr3-num', num({
    stem: 'A PCR reaction begins with 3 copies of a target sequence. Assuming perfect doubling, how many copies are present after 10 cycles?',
    value: v,
    sol: r`$3 \times 2^{10} = 3 \times 1024 = ${v}$.`,
    scheme: [[`${v}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 3072 || 'value');
}
add('primer-mcq', mcq({
  stem: 'What is the role of the primers in PCR?',
  right: 'They are short oligonucleotides that bind to the ends of the target region and give the polymerase a starting point.',
  wrong: ['They separate the two DNA strands.', 'They cut the DNA into fragments.', 'They join the new strands to the vector.'],
  sol: 'Primers anneal to complementary regions flanking the target, and Taq polymerase extends them — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('denature-mcq', mcq({
  stem: 'What happens in the denaturation step of PCR?',
  right: 'The double-stranded DNA is separated into single strands by high temperature.',
  wrong: ['Primers bind to the template.', 'Taq polymerase adds nucleotides.', 'The DNA is cut by restriction enzymes.'],
  sol: 'Heating separates the two strands, which then act as templates — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('continuous-mcq', mcq({
  stem: 'Why is a continuous culture system used to obtain large amounts of a recombinant protein?',
  right: 'Removing used medium and adding fresh medium keeps the cells in their most active log phase.',
  wrong: ['It keeps the cells in the lag phase, when they divide fastest.', 'It kills the cells so that they release the protein.', 'It stops all metabolism in the cells.'],
  sol: 'Continuous culture maintains cells in the log (exponential) phase, giving more biomass and product — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('formulation-mcq', mcq({
  stem: 'In downstream processing, the step in which a purified product is mixed with suitable preservatives is called',
  right: 'formulation',
  wrong: ['elution', 'transformation', 'annealing'],
  sol: 'After separation and purification, the product is formulated with preservatives — option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('sparger-tf', tf({
  stem: 'In a stirred-tank bioreactor, sterile air is bubbled into the culture through a sparger.',
  key: 't',
  sol: 'True. The sparger delivers sterile air bubbles for oxygen supply.',
  d: 1, c: 'recall', t: [2],
}));
add('order-mcq', mcq({
  stem: 'Which sequence of steps is correct for producing a recombinant protein in bacteria?',
  right: 'Isolate DNA → cut → amplify by PCR → ligate into vector → transform host → grow in bioreactor → downstream processing',
  wrong: ['Transform host → isolate DNA → ligate → cut → downstream processing → PCR', 'Grow in bioreactor → cut → transform → ligate → isolate DNA → PCR', 'Ligate → cut → isolate DNA → PCR → transform → downstream processing'],
  sol: 'The gene must be isolated, cut, amplified and joined to a vector before the host is transformed and grown, and the product purified last — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('spool-fill', fill({
  stem: 'DNA precipitated by chilled ethanol appears as fine threads, which can be removed by winding them on a rod; this is called ______.',
  acc: [['spooling']],
  sol: 'Spooling.',
  d: 1, c: 'recall', t: [2],
}));
add('pcr-ar', ar({
  a: 'Taq polymerase is not destroyed during the repeated heating steps of PCR.',
  r: 'Taq polymerase comes from Thermus aquaticus, a bacterium adapted to very hot conditions.',
  key: 'a',
  sol: 'Both are true; its origin in a heat-loving bacterium explains its thermostability — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('pcr-short', short({
  marks: 3,
  stem: 'Describe the three steps of one PCR cycle and explain why the number of copies rises so rapidly.',
  model: '1. **Denaturation:** the DNA is heated to a high temperature, separating the two strands.\n\n2. **Annealing:** on cooling, two **primers** (small oligonucleotides complementary to the ends of the target region) bind to the single strands.\n\n3. **Extension:** the thermostable **Taq polymerase** extends the primers, copying each strand.\n\nEach cycle **doubles** the number of target copies, so after n cycles there are **2ⁿ** copies — about a billion after 30 cycles.',
  sol: 'Three steps and doubling.',
  scheme: [['Denaturation and annealing', 1], ['Extension by Taq polymerase', 1], ['Doubling: 2ⁿ copies', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('isolation-short', short({
  marks: 3,
  stem: 'Plan how you would isolate pure DNA from a fungal culture, naming the enzyme or chemical used at each step and its purpose.',
  model: '1. **Break the cell walls** with **chitinase** (fungal walls contain chitin), releasing the cell contents.\n\n2. **Remove RNA** with **ribonuclease** and **proteins** (including histones bound to DNA) with **protease**; other substances are removed by appropriate treatments.\n\n3. **Precipitate DNA** by adding **chilled ethanol**; the DNA separates as fine threads, which are collected by **spooling**.',
  sol: 'Chitinase, ribonuclease and protease, chilled ethanol.',
  scheme: [['Chitinase to open cells', 1], ['Ribonuclease and protease', 1], ['Chilled ethanol and spooling', 1]],
  d: 3, c: 'application', t: [2],
}));
add('bioreactor-short', short({
  marks: 3,
  stem: 'What is a bioreactor? Describe three features of a stirred-tank bioreactor.',
  model: 'A **bioreactor** is a large vessel (often **100–1000 litres**) in which raw materials are converted into specific products by microbes or plant, animal or human cells, under **optimal conditions** of temperature, pH, substrate, salts, vitamins and oxygen.\n\nStirred-tank features: (1) a **cylindrical vessel with a curved base** for mixing; (2) a **stirrer/agitator** that mixes the contents and spreads oxygen, with **sterile air bubbled through a sparger**; (3) **foam control, temperature and pH control** and **sampling ports**.',
  sol: 'Definition and three features.',
  scheme: [['Definition with optimal conditions', 1], ['Shape and stirrer/sparger', 1], ['Control systems and sampling ports', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('downstream-short', short({
  marks: 2,
  stem: 'What is downstream processing? List its main stages.',
  model: 'Downstream processing is the set of steps by which the product of a bioreactor is made **ready for marketing**. Stages: **separation** and **purification** of the product, **formulation** with suitable preservatives, and, for drugs, **clinical trials** and strict **quality control**.',
  sol: 'Definition and stages.',
  scheme: [['Definition', 1], ['Stages', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('continuous-short', short({
  marks: 2,
  stem: 'Explain how continuous culture increases the yield of a recombinant protein.',
  model: 'In continuous culture, **used medium is drained** from one side while **fresh medium is added** from the other. This keeps the cells in their **log (exponential) phase** of rapid growth for a long time, producing **more biomass** and therefore **more of the desired protein**.',
  sol: 'Fresh medium keeps cells in log phase.',
  scheme: [['Medium continuously replaced', 1], ['Cells stay in log phase; more product', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('rdna-long', long({
  stem: 'Describe, in order, the processes of recombinant DNA technology, from isolating DNA to obtaining the final product.',
  model: '**Isolation of DNA.** Cells are broken open with lysozyme (bacteria), cellulase (plants) or chitinase (fungi). RNA is removed with ribonuclease and proteins with protease, and the DNA is precipitated with chilled ethanol and spooled.\n\n**Cutting.** The DNA is digested with a restriction enzyme, and the digestion is checked by agarose gel electrophoresis. The vector is cut with the same enzyme.\n\n**Amplification.** The gene of interest is amplified by PCR: repeated cycles of denaturation, annealing of primers and extension by thermostable Taq polymerase give about a billion copies after 30 cycles.\n\n**Ligation.** The gene is joined to the cut vector by DNA ligase, making recombinant DNA.\n\n**Transformation and selection.** The recombinant DNA is introduced into competent host cells, which are grown on a medium containing an antibiotic so that only transformants survive; recombinants are identified by insertional inactivation or blue-white screening.\n\n**Product.** The host expresses the gene, producing a recombinant protein. Cells are grown on a large scale in bioreactors, often by continuous culture.\n\n**Downstream processing.** The product is separated, purified, formulated with preservatives and, if a drug, tested in clinical trials and quality control.',
  sol: 'Seven steps in order with key reagents.',
  scheme: [['Isolation and cutting', 1], ['PCR amplification', 1], ['Ligation, transformation and selection', 1], ['Expression and bioreactors', 1], ['Downstream processing', 1]],
  wl: [80, 240],
  d: 3, c: 'understanding', t: [2],
}));
add('pcr-long', long({
  stem: 'A forensic laboratory has only a few cells from a hair root found at a crime scene. A trainee says the DNA is far too little to analyse. Evaluate this claim, explaining how PCR works and why its properties make the analysis possible, and state one precaution.',
  model: '**PCR.** The polymerase chain reaction copies a chosen region of DNA in a test tube. Each cycle has three steps: denaturation at high temperature separates the strands; annealing lets two primers, short oligonucleotides complementary to the ends of the target, bind; and extension by Taq polymerase copies each strand from the primers.\n\n**Why it works on tiny samples.** Each cycle doubles the number of copies, so after n cycles one molecule becomes 2ⁿ; thirty cycles give about a billion copies, enough for analysis. Taq polymerase, from Thermus aquaticus, is thermostable, so it survives every heating step and the cycles can be run automatically.\n\n**Evaluation.** The trainee is wrong: the amount of starting DNA is not a barrier, because PCR amplifies even a few molecules to large quantities.\n\n**Precaution.** Because PCR amplifies any DNA present, the sample must be protected from contamination (for example, by DNA from the handlers), using clean equipment and controls.',
  sol: 'Steps, doubling, Taq, verdict, contamination.',
  scheme: [['PCR steps with primers', 1.5], ['Doubling: 2ⁿ, about a billion after 30 cycles', 1], ['Role of thermostable Taq', 1], ['Verdict on the claim', 1], ['Precaution against contamination', 0.5]],
  wl: [80, 220],
  d: 4, c: 'evaluation', t: [2],
}));
add('bioprocess-long', long({
  stem: 'Explain how a recombinant protein is produced on a large scale, describing the stirred-tank bioreactor and the stages of downstream processing.',
  model: '**Expression.** When the inserted gene is expressed in host cells, they make a recombinant protein. Small flask cultures give little product, so cells are grown in bioreactors, often by continuous culture, in which used medium is drained out and fresh medium added, keeping cells in their log phase for higher yields.\n\n**Bioreactor.** Bioreactors are large vessels, often 100–1000 litres, that provide optimal temperature, pH, substrate, salts, vitamins and oxygen. The common stirred-tank type is a cylinder with a curved base. A motor-driven stirrer mixes the contents and spreads oxygen; sterile air is bubbled in through a sparger. It has an agitator system, an oxygen-delivery system, foam control, temperature control, pH control and sampling ports for withdrawing small volumes to check the culture.\n\n**Downstream processing.** After biosynthesis, the product is separated from the cells and medium, purified, and formulated with preservatives. Drugs must undergo clinical trials, and all products need strict quality control before marketing.',
  sol: 'Expression and continuous culture; bioreactor features; downstream stages.',
  scheme: [['Recombinant protein and continuous culture', 1], ['Bioreactor purpose and optimal conditions', 1], ['Stirred-tank features', 1.5], ['Downstream processing stages', 1.5]],
  wl: [80, 220],
  d: 3, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- cases
add('gel-case', mk.case({
  passage: 'A student digested samples of the same circular plasmid (about 4.4 kb) and ran them on an agarose gel.\n\n| Lane | Treatment | Bands seen |\n|---|---|---|\n| 1 | Uncut plasmid | One band |\n| 2 | Cut with EcoRI | One band of 4.4 kb |\n| 3 | Cut with EcoRI and BamHI | Two bands: 4.0 kb and 0.4 kb |',
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'How many EcoRI sites does the plasmid have?',
      right: 'One',
      wrong: ['None', 'Two', 'Four'],
      sol: 'Cutting a circle once gives one linear fragment of the full size (4.4 kb), so there is one EcoRI site — option (@K).',
      d: 3, c: 'analysis', t: [1],
    })),
    part('b', num({
      stem: 'What is the total size, in kb, of the two fragments in lane 3?',
      value: 4.4, tol: 0.01, unit: 'kb',
      sol: r`$4.0 + 0.4 = 4.4$ kb, the size of the whole plasmid.`,
      scheme: [['4.4 kb', 1]],
      d: 1, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'In lane 3, which band travelled farther, and why?',
      model: 'The **0.4 kb** band travelled farther. DNA is **negatively charged** and moves towards the **anode**; the agarose gel acts as a **sieve**, so **smaller fragments move faster** and farther than larger ones.',
      sol: 'Smaller fragments move farther.',
      scheme: [['0.4 kb band', 1], ['Reason: sieving; smaller moves faster', 1]],
      d: 2, c: 'understanding', t: [1],
    }), [
      short({
        marks: 2,
        stem: 'How would the student see the bands, and how could she recover the 0.4 kb fragment for cloning?',
        model: 'She would stain the gel with **ethidium bromide** and view it under **UV light**, where the DNA appears as **orange bands**. She would **cut out** the 0.4 kb band and extract its DNA (**elution**).',
        sol: 'Staining and elution.',
        scheme: [['Ethidium bromide and UV', 1], ['Cut out and elute', 1]],
        d: 2, c: 'understanding', t: [1],
      }),
    ]),
  ],
}), (q) => Math.abs(q.children[1].answer.value - 4.4) < 1e-9 || 'value');
{
  const amp = 120, tet = 90, rec = amp - tet;
  const pr = Math.round((rec / amp) * 1000) / 10;
  add('selection-case', mk.case({
    passage: `After inserting a gene at the BamHI site of pBR322 and transforming E. coli, a student spread the cells on an ampicillin plate and got ${amp} colonies. She replica-plated these colonies onto a tetracycline plate, where ${tet} of them grew.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which colonies carry recombinant plasmids?',
        right: 'Those that grew on ampicillin but not on tetracycline',
        wrong: ['Those that grew on both plates', 'Those that grew on neither plate', 'Those that grew only on tetracycline'],
        sol: 'The insert inactivates tetR, so recombinants are ampicillin-resistant but tetracycline-sensitive — option (@K).',
        d: 2, c: 'application', t: [1],
      })),
      part('b', num({
        stem: 'What percentage of the ampicillin-resistant colonies were recombinant?',
        value: pr, unit: '%',
        sol: r`Recombinants $= ${amp} - ${tet} = ${rec}$; $\dfrac{${rec}}{${amp}} \times 100 = ${pr}$ percent.`,
        scheme: [[`${pr}%`, 1]],
        d: 2, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain why the recombinant colonies could not grow on tetracycline.',
        model: 'The BamHI site lies **inside the tetracycline-resistance gene (tetR)**. Inserting foreign DNA there **disrupted the gene**, so it could no longer make a functional product — **insertional inactivation** — and the cells became sensitive to tetracycline.',
        sol: 'Insertional inactivation.',
        scheme: [['BamHI site lies in tetR', 1], ['Insert inactivates the gene', 1]],
        d: 3, c: 'understanding', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'Suggest a simpler method that would identify recombinants on a single plate, and explain how it works.',
          model: '**Blue-white screening**: insert the gene into the **β-galactosidase** gene of a vector and grow the cells on a medium with a **chromogenic substrate**. Non-recombinant colonies (active enzyme) turn **blue**; recombinants (inactivated enzyme) stay **white**.',
          sol: 'Colour-based insertional inactivation.',
          scheme: [['Blue-white screening with β-galactosidase', 1], ['Blue = non-recombinant, white = recombinant', 1]],
          d: 3, c: 'application', t: [1],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 25 || 'value');
}
{
  const m = Math.round((50 * 2 ** 20) / 1e5) / 10;
  add('pcr-case', mk.case({
    passage: 'A laboratory extracted DNA from a tiny blood stain and found about 50 copies of the target region. It ran 20 cycles of PCR.',
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which enzyme copies the DNA in each extension step?',
        right: 'Taq polymerase',
        wrong: ['DNA ligase', 'EcoRI', 'Lysozyme'],
        sol: 'The thermostable Taq polymerase extends the primers — option (@K).',
        d: 1, c: 'recall', t: [2],
      })),
      part('b', num({
        stem: 'Assuming perfect doubling, how many copies are present after 20 cycles?',
        value: 50 * 2 ** 20,
        sol: r`$50 \times 2^{20} = 50 \times 1048576 = 52428800$, about ${m} million.`,
        scheme: [['52 428 800 (about 52.4 million)', 1]],
        d: 3, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain why primers are needed and why the sample must be protected from contamination.',
        model: '**Primers** are short sequences complementary to the ends of the target; they **bind (anneal)** there and give Taq polymerase a **starting point**, so only the target region is copied. Because PCR **amplifies any matching DNA**, even a trace of **contaminating DNA** would be copied and could give a false result.',
        sol: 'Primers define the target; amplification of contaminants.',
        scheme: [['Role of primers', 1], ['Contamination would also be amplified', 1]],
        d: 3, c: 'understanding', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'Why does the reaction mixture need to be heated to a high temperature at the start of every cycle?',
          model: 'Heating **denatures** the DNA, separating the **two strands** so that each can act as a **template** for primer binding and copying in the next steps of the cycle.',
          sol: 'Denaturation provides templates.',
          scheme: [['Separates strands', 1], ['Provides templates for the next cycle', 1]],
          d: 2, c: 'understanding', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 52428800 || 'value');
}
{
  const batch = 2.0, cont = 3.4;
  const rise = Math.round(((cont - batch) / batch) * 1000) / 10;
  add('bioreactor-case', mk.case({
    passage: `A company grew recombinant E. coli making a therapeutic protein in two ways in identical stirred-tank bioreactors. In batch culture (no medium added after the start) it obtained ${batch} kg of protein per run; in continuous culture (used medium drained and fresh medium added) it obtained ${cont} kg over the same period.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Why did continuous culture give more protein?',
        right: 'Cells were kept in their log phase of rapid growth for longer.',
        wrong: ['Cells were killed early, releasing protein.', 'No oxygen was supplied, which increased yield.', 'The plasmid was removed from the cells.'],
        sol: 'Continuous culture maintains cells in the log phase, giving more biomass and product — option (@K).',
        d: 2, c: 'understanding', t: [2],
      })),
      part('b', num({
        stem: 'By what percentage was the yield higher in continuous culture?',
        value: rise, unit: '%',
        sol: r`$\dfrac{${cont} - ${batch}}{${batch}} \times 100 = ${rise}$ percent.`,
        scheme: [[`${rise}%`, 1]],
        d: 2, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'Name two conditions the bioreactor must control to keep the cells productive, and how it controls them.',
        model: '**Oxygen**: sterile air is bubbled in through a **sparger** and spread by the **stirrer**. **Temperature and pH**: a **temperature-control system** and **pH control** keep them at optimum (foam control and sampling ports also help).',
        sol: 'Any two controlled conditions.',
        scheme: [['First condition and control', 1], ['Second condition and control', 1]],
        d: 2, c: 'understanding', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'After harvesting, the protein must reach patients safely. Name the stages it must go through.',
          model: 'It must undergo **downstream processing**: **separation** from the cells and medium, **purification**, **formulation** with preservatives, and, as a drug, **clinical trials** and strict **quality control**.',
          sol: 'Downstream processing stages.',
          scheme: [['Separation and purification', 1], ['Formulation, clinical trials, quality control', 1]],
          d: 2, c: 'recall', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 70 || 'value');
}
