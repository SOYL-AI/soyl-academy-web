// ch09 Biotechnology: Principles and Processes — two decks: Part 1 (t01), Part 2 (t02).
import { sl, deck, table, flow, svgV, r } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { ECORI, GEL, PBR, PCR, BIOREACTOR } from './svgs.mjs';
import { isPalindrome, digest, expectedSites, pcr, reverseComplement } from './calc.mjs';

export const V = {
  ecori: svgV(ECORI, 'EcoRI cutting the palindrome GAATTC to leave AATT sticky ends'),
  gel: svgV(GEL, 'Agarose gel with a ladder lane and a sample lane; smaller fragments move farther towards the anode'),
  pbr: svgV(PBR, 'Map of pBR322 with ori, rop, ampR and tetR and restriction sites'),
  pcr: svgV(PCR, 'PCR cycle of denaturation, annealing and extension, with copies doubling each cycle'),
  bioreactor: svgV(BIOREACTOR, 'Stirred-tank bioreactor with motor, agitator, sparger, temperature jacket, foam breaker, pH probe and sampling port', 'Schematic, not to scale.'),
};

// ---------------------------------------------------------------- computed numbers
const SEQS = ['GAATTC', 'GGATCC', 'GAATTG', 'AAGCTT'].map((s) => [s, reverseComplement(s), isPalindrome(s)]);
const DNA = 'TTACGGAATTCTTAGCGAATTCAAGT';
const PIECES = digest(DNA, 'GAATTC', 1);
const LEN = 4096 * 5;
const SITES = expectedSites(LEN, 6);
const C10 = pcr(10);
const C30 = pcr(30);

export const deck1 = deck({
  part: 1,
  title: 'Biotechnology: Principles and Processes — Part 1: Principles and tools',
  goals: [
    'Define biotechnology and state its two core techniques',
    'Explain how restriction enzymes are named and how they cut DNA',
    'Describe gel electrophoresis and the features of a cloning vector',
    'Explain how host cells are made competent to take up DNA',
  ],
  slides: [
    sl('title', 'Biotechnology: Principles and Processes', {
      b: 'Part 1 — the principles of biotechnology and the molecular tools used to cut, join and move genes.',
      v: flow('LR', [['g', 'Genetic engineering: change the genetic material'], ['b', 'Bioprocess engineering: grow cells in sterile conditions'], ['p', 'Useful products: medicines, vaccines, enzymes']], [['g', 'p'], ['b', 'p']], 'Flow showing genetic engineering and bioprocess engineering leading to useful products'),
      n: 'Biotechnology uses living organisms, or parts of them, to make products useful to people. The European Federation of Biotechnology describes it as the integration of natural science and organisms, cells, their parts and molecular analogues for products and services. Two techniques make modern biotechnology possible: genetic engineering and bioprocess engineering.',
    }),
    sl('concept', 'The two core techniques', {
      b: '**Genetic engineering** alters the chemistry of genetic material (DNA and RNA) and introduces it into host organisms, changing their phenotype. **Bioprocess engineering** maintains a **sterile (microbial-contamination-free)** ambience to grow only the desired microbe or cell in large quantities.',
      v: table(['Technique', 'Purpose'], [['Genetic engineering', 'Create recombinant DNA and introduce it into a host'], ['Bioprocess engineering', 'Grow the host in large numbers in sterile conditions to make a product']], 'Table of the two core techniques of modern biotechnology'),
      n: 'Traditional breeding mixes thousands of genes at once and can carry unwanted ones along. Genetic engineering lets scientists isolate just the gene they want and put it into another organism. Bioprocess engineering then grows that organism on a large scale, free of contamination, to collect the product.',
    }),
    sl('concept', 'The first recombinant DNA', {
      b: 'In **1972**, **Stanley Cohen and Herbert Boyer** made the first recombinant DNA: they cut out an **antibiotic-resistance gene** and linked it to a **native plasmid** of *Salmonella typhimurium*, then transferred it into ***Escherichia coli***. The DNA could multiply because it was linked to an **origin of replication (ori)**.',
      v: flow('LR', [['i', 'Identify DNA with desirable genes'], ['t', 'Introduce it into a host'], ['m', 'Maintain it in the host and pass it to progeny']], [['i', 't'], ['t', 'm']], 'Flow of the three basic steps in genetically modifying an organism'),
      n: 'A piece of foreign DNA cannot multiply on its own inside a cell. It must be joined to a DNA molecule that has an origin of replication, such as a plasmid. A plasmid is a small circle of DNA found in bacteria, separate from the main chromosome, that copies itself. Joined to it, the foreign gene is copied too.',
    }),
    sl('concept', 'Restriction enzymes: molecular scissors', {
      b: 'In **1963**, two enzymes responsible for restricting the growth of bacteriophage in *E. coli* were isolated: one added methyl groups to DNA, the other **cut DNA** — a **restriction endonuclease**. The first, **Hind II**, always cut DNA at a particular point by recognising a specific sequence of **six base pairs**: its **recognition sequence**. Today more than **900** restriction enzymes from over **230** strains of bacteria are known.',
      v: table(['Part of the name EcoRI', 'Meaning'], [['E', 'Genus Escherichia'], ['co', 'Species coli'], ['R', 'Strain RY 13'], ['I', 'First enzyme isolated from this strain (order of isolation)']], 'Table explaining the parts of the name EcoRI'),
      n: 'Restriction enzymes belong to a larger group called nucleases. Exonucleases remove nucleotides from the ends of DNA; endonucleases cut at specific positions inside it. Each restriction endonuclease recognises its own short sequence. Their names follow a simple code, as shown for EcoRI.',
    }),
    sl('diagram', 'Palindromes and sticky ends', {
      b: 'Each restriction endonuclease recognises a **palindromic** sequence — one that reads the **same 5′ → 3′ on both strands**. Many cut the two strands a little away from the centre, between the same two bases, leaving **single-stranded overhangs** called **sticky ends**.',
      v: V.ecori,
      n: 'Read the top strand of the EcoRI site from five prime to three prime: G A A T T C. Now read the bottom strand, also five prime to three prime: G A A T T C again. That is a DNA palindrome. EcoRI cuts both strands between G and A, so each fragment is left with a short single-stranded tail, a sticky end, that can pair with a matching tail.',
    }),
    sl('example', 'Worked example 1: palindrome or not?', {
      b: 'Which of these could be recognition sites (palindromes)? A sequence is palindromic if it equals its reverse complement.',
      ul: SEQS.map(([s, rc, p]) => `${s} → reverse complement ${rc} → **${p ? 'palindrome' : 'not a palindrome'}**`),
      v: table(['Sequence (5′→3′)', 'Other strand read 5′→3′', 'Palindrome?'], SEQS.map(([s, rc, p]) => [s, rc, p ? 'Yes' : 'No']), 'Worked table testing four sequences for palindromes'),
      n: 'To test a sequence, write its complement, then read it backwards so that it also runs five prime to three prime. If you get the original sequence back, it is a palindrome. G A A T T C, G G A T C C and A A G C T T pass this test; G A A T T G does not.',
    }),
    sl('concept', 'Why sticky ends matter', {
      b: 'When the vector and the source DNA are cut with the **same restriction enzyme**, the fragments have **matching sticky ends**. These pair by hydrogen bonds and are sealed by **DNA ligase**, forming **recombinant DNA**.',
      v: flow('LR', [['c', 'Cut source DNA and vector with the same enzyme'], ['s', 'Matching sticky ends'], ['p', 'Ends pair by hydrogen bonds'], ['l', 'DNA ligase seals the backbone'], ['r', 'Recombinant DNA']], [['c', 's'], ['s', 'p'], ['p', 'l'], ['l', 'r']], 'Flow of making recombinant DNA using one restriction enzyme and DNA ligase'),
      n: 'This is the key trick of genetic engineering. Using the same enzyme on both pieces of DNA guarantees that their sticky ends match. They stick together, and DNA ligase joins their sugar-phosphate backbones permanently, making a single recombinant molecule.',
    }),
    sl('check', 'Quick check: naming EcoRI', {
      b: 'In the name EcoRI, what does “R” stand for?',
      n: 'Quick check. Recall the meaning of each part of the name.',
      chk: 'ecori-name-mcq',
    }),
    sl('diagram', 'Separating DNA fragments: gel electrophoresis', {
      b: 'DNA fragments are separated in **agarose gel** (agarose is extracted from seaweed). DNA is **negatively charged**, so in an electric field it moves towards the **anode**. The gel acts as a sieve: **smaller fragments move farther**.',
      v: V.gel,
      n: 'DNA samples are loaded into wells at the negative end. When current flows, the fragments move towards the positive end, the small ones slipping through the gel faster. The DNA is stained with ethidium bromide and seen as bright orange bands under ultraviolet light. A band can then be cut out and its DNA extracted, which is called elution.',
    }),
    sl('example', 'Worked example 2: how many fragments?', {
      b: `(a) The DNA strand 5′–${DNA}–3′ is cut with EcoRI (GAATTC, cut between G and A). How many fragments form? (b) In random DNA, a six-base site occurs about once in 4⁶ bases. About how many EcoRI sites are expected in ${LEN} bp?`,
      ul: [
        `(a) The site occurs ${PIECES.length - 1} times, so the strand is cut into **${PIECES.length} fragments**: ${PIECES.join(' | ')}.`,
        r`(b) $4^6 = 4096$; expected sites $= \dfrac{${LEN}}{4096} = ${SITES}$.`,
        'So a gel of the digest would show bands at the expected fragment sizes.',
      ],
      v: table(['Quantity', 'Value'], [['EcoRI sites in the strand', String(PIECES.length - 1)], ['Fragments', String(PIECES.length)], [`Expected sites in ${LEN} bp`, String(SITES)]], `Worked table: ${PIECES.length} fragments; about ${SITES} sites expected`),
      n: 'Each occurrence of the site is one cut, and every cut adds one fragment, so two sites give three fragments. For the second part, there are four bases, so a particular six-base sequence turns up on average once every four to the power six, four thousand and ninety-six, bases. Twenty thousand four hundred and eighty bases would hold about five sites.',
    }),
    sl('diagram', 'Cloning vectors: pBR322', {
      b: 'A **cloning vector** carries the foreign DNA into the host and lets it be copied. **pBR322** is a widely used *E. coli* plasmid vector.',
      v: V.pbr,
      n: 'This map shows pBR322. It has an origin of replication, two antibiotic-resistance genes for ampicillin and tetracycline, a rop gene that helps control copy number, and recognition sites for several restriction enzymes. Some of these sites lie inside the resistance genes, which is very useful, as we will see.',
    }),
    sl('concept', 'Features a cloning vector needs', {
      b: 'A good vector has four features.',
      v: table(['Feature', 'Why it is needed'], [['Origin of replication (ori)', 'Starts replication; controls copy number of linked DNA'], ['Selectable marker', 'Identifies transformants; usually antibiotic resistance (ampicillin, chloramphenicol, tetracycline, kanamycin)'], ['Cloning sites', 'Very few, preferably single, recognition sites for common enzymes, so the vector is cut only once'], ['Small size', 'Easier to handle and to take up']], 'Table of the features of a cloning vector and why each is needed'),
      n: 'The origin lets the vector, and anything joined to it, be copied many times. A selectable marker, usually an antibiotic-resistance gene, lets us pick out cells that took up the vector. A single cloning site for an enzyme means the vector is cut in one place only, so the foreign DNA goes in neatly.',
    }),
    sl('concept', 'Insertional inactivation: finding recombinants', {
      b: 'Inserting foreign DNA **into a marker gene** inactivates it: **insertional inactivation**. If DNA is inserted at the **BamHI** site in the **tetracycline-resistance** gene of pBR322, recombinants **lose tetracycline resistance** but keep ampicillin resistance.',
      v: table(['Cells', 'Grow on ampicillin?', 'Grow on tetracycline?'], [['No plasmid', 'No', 'No'], ['Non-recombinant pBR322', 'Yes', 'Yes'], ['Recombinant (insert in tetR)', 'Yes', 'No']], 'Table of growth of untransformed, non-recombinant and recombinant cells on ampicillin and tetracycline'),
      n: 'Plate the cells on ampicillin first: only those with a plasmid grow. Then copy the colonies onto tetracycline. Those that fail to grow on tetracycline must carry an insert in the tetracycline gene, so they are recombinants. A simpler alternative uses the gene for beta-galactosidase: with a coloured substrate, non-recombinant colonies turn blue, while recombinants with an inactivated gene stay white.',
    }),
    sl('concept', 'Vectors for plants and animals; competent hosts', {
      b: '***Agrobacterium tumefaciens*** naturally delivers a piece of DNA (T-DNA) into plant cells; its **Ti plasmid** is modified into a **disarmed** cloning vector. **Retroviruses** are disarmed to carry genes into animal cells. DNA is **hydrophilic** and cannot pass through cell membranes, so host cells are made **competent**.',
      v: table(['Method', 'How DNA enters'], [['Divalent cations (calcium) + heat shock', 'Bacterial cells treated with calcium, incubated on ice with DNA, heated briefly to 42 °C, then put back on ice'], ['Micro-injection', 'DNA injected directly into the nucleus of an animal cell'], ['Biolistics (gene gun)', 'Plant cells bombarded with high-velocity gold or tungsten microparticles coated with DNA'], ['Disarmed pathogen vectors', 'Infect the cell and transfer the recombinant DNA']], 'Table of methods for introducing DNA into host cells'),
      n: 'Bacteria do not normally take up DNA, so they are made competent. Calcium increases the efficiency with which DNA enters through pores in the cell wall, and a brief heat shock helps. Animal cells can have DNA injected straight into the nucleus. Plant cells can be shot with tiny DNA-coated metal particles from a gene gun.',
    }),
    sl('check', 'Quick check: sticky ends', {
      b: 'Judge the assertion and the reason about joining DNA fragments.',
      n: 'Quick check. Why must the same enzyme be used on both pieces?',
      chk: 'sticky-ar',
    }),
    sl('check', 'Quick check: insertional inactivation', {
      b: 'Foreign DNA is inserted at the BamHI site of pBR322. How will recombinant cells behave?',
      n: 'Quick check. Which resistance gene contains the BamHI site?',
      chk: 'bamhi-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Biotechnology: genetic engineering + bioprocess engineering (sterile ambience). First recombinant DNA: Cohen and Boyer (1972).',
        'Restriction endonucleases recognise palindromic sequences; EcoRI = Escherichia coli, strain RY 13, first enzyme; sticky ends; DNA ligase joins.',
        'Gel electrophoresis: agarose; DNA moves to the anode; smaller fragments farther; ethidium bromide and UV; elution.',
        'Vectors: ori, selectable marker, single cloning sites, small size; pBR322 (ampR, tetR); insertional inactivation; blue-white selection.',
        'Plant and animal vectors: disarmed Ti plasmid, retroviruses. Competence: calcium and heat shock; micro-injection; biolistics.',
      ],
      v: table(['Tool', 'Role'], [['Restriction enzyme', 'Cuts DNA at a palindrome'], ['DNA ligase', 'Joins DNA'], ['Vector', 'Carries and copies DNA'], ['Competent host', 'Takes up the DNA']], 'Summary table of the tools of recombinant DNA technology'),
      n: 'To recap: restriction enzymes cut DNA at palindromic sites, leaving sticky ends that ligase can join. Gel electrophoresis separates fragments by size. Vectors such as pBR322 carry the gene into a host and let us select recombinants, and hosts are made competent to take up the DNA.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Explain each letter of **EcoRI**.',
        'Show a **palindrome** by writing both strands 5′→3′.',
        'State why DNA moves to the **anode** and why **small fragments travel farther**.',
        'Explain **insertional inactivation** with the antibiotic results.',
      ],
      n: 'Exam tips. Be able to decode EcoRI. Show a palindrome by reading both strands five prime to three prime. Explain the movement of DNA in a gel. And explain insertional inactivation using which antibiotics recombinants can and cannot grow on.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Biotechnology: Principles and Processes — Part 2: Processes of recombinant DNA technology',
  goals: [
    'List the steps of recombinant DNA technology in order',
    'Explain DNA isolation, cutting, PCR amplification and ligation',
    'Describe transformation, selection and growth in bioreactors',
    'Explain downstream processing',
  ],
  slides: [
    sl('title', 'Processes of recombinant DNA technology', {
      b: 'Part 2 — the steps from extracting DNA to making a finished product.',
      v: flow('LR', [['i', 'Isolate DNA'], ['c', 'Cut with restriction enzymes'], ['a', 'Amplify gene by PCR'], ['l', 'Ligate into a vector'], ['t', 'Transform host'], ['p', 'Grow and obtain product'], ['d', 'Downstream processing']], [['i', 'c'], ['c', 'a'], ['a', 'l'], ['l', 't'], ['t', 'p'], ['p', 'd']], 'Flow of the steps of recombinant DNA technology'),
      n: 'Recombinant DNA technology follows a sequence of steps: isolate the DNA, cut it, amplify the gene of interest, join it into a vector, put it into a host, grow the host, and finally purify the product. Let us go through each step.',
    }),
    sl('concept', 'Step 1: isolating DNA', {
      b: 'DNA is enclosed in membranes, so the cell must be broken open. Then other macromolecules are removed, and DNA is precipitated.',
      v: table(['Problem', 'Treatment'], [['Bacterial cell wall', 'Lysozyme'], ['Plant cell wall', 'Cellulase'], ['Fungal cell wall', 'Chitinase'], ['RNA', 'Ribonuclease'], ['Proteins (histones)', 'Protease'], ['Getting DNA out of solution', 'Add chilled ethanol: DNA precipitates as fine threads (spooling)']], 'Table of treatments used to isolate pure DNA'),
      n: 'Different cells need different enzymes to open them: lysozyme for bacteria, cellulase for plants, and chitinase for fungi. The released mixture contains RNA, proteins and fats, so ribonuclease and protease remove RNA and proteins. Finally, chilled ethanol makes the purified DNA come out of solution as fine white threads, which can be spooled onto a rod.',
    }),
    sl('concept', 'Step 2: cutting DNA', {
      b: 'Purified DNA is incubated with a **restriction enzyme** under optimal conditions. **Agarose gel electrophoresis** checks the progress of digestion. The **vector** is cut with the **same enzyme**, and the gene of interest is joined to it.',
      v: flow('LR', [['d', 'Source DNA + restriction enzyme'], ['g', 'Check digestion on agarose gel'], ['v', 'Cut vector with the same enzyme'], ['j', 'Mix and join with ligase']], [['d', 'g'], ['g', 'v'], ['v', 'j']], 'Flow of cutting source DNA and vector with the same enzyme and joining them'),
      n: 'Cutting is checked on a gel: uncut DNA stays as one large band, while digested DNA gives smaller fragments. The vector is opened with the same enzyme, so its sticky ends match those of the gene, and the two can be joined.',
    }),
    sl('diagram', 'Step 3: amplifying the gene by PCR', {
      b: '**PCR (polymerase chain reaction)** makes many copies of a gene in a test tube. It uses **two primers** (small chemically synthesised oligonucleotides complementary to the ends of the target region) and a **thermostable DNA polymerase** from the bacterium ***Thermus aquaticus*** (**Taq** polymerase).',
      v: V.pcr,
      n: 'In each cycle, heat separates the two DNA strands, the mixture cools so that primers bind to the ends of the target, and Taq polymerase builds new strands from the primers. Taq polymerase survives the high temperature of the denaturing step because it comes from a bacterium that lives in hot springs. Every cycle doubles the copies.',
    }),
    sl('example', 'Worked example 1: how many copies?', {
      b: 'Starting from one DNA molecule, how many copies of the target are there after 10 cycles and after 30 cycles of PCR, assuming perfect doubling?',
      ul: [
        r`Rule — copies after $n$ cycles $= 2^n$.`,
        r`After 10 cycles: $2^{10} = ${C10}$.`,
        r`After 30 cycles: $2^{30} = ${C30} \approx 1.07 \times 10^{9}$ — about a billion copies.`,
      ],
      v: table(['Cycles', 'Copies'], [['1', '2'], ['5', String(pcr(5))], ['10', String(C10)], ['20', String(pcr(20))], ['30', String(C30)]], `Worked table: copies after 1, 5, 10, 20 and 30 cycles, reaching ${C30}`),
      n: 'Doubling is powerful. Ten cycles turn one molecule into one thousand and twenty-four. Thirty cycles give more than a billion copies, enough to study a gene from a tiny sample. That is why PCR is used in research, in diagnosing infections and in forensic science.',
    }),
    sl('check', 'Quick check: Taq polymerase', {
      b: 'Why is Taq polymerase used in PCR?',
      n: 'Quick check. Think about the temperature of the denaturation step.',
      chk: 'taq-mcq',
    }),
    sl('concept', 'Step 4: ligation and step 5: transformation', {
      b: 'The gene is joined to the cut vector by **DNA ligase**, making a **recombinant DNA** molecule. This is introduced into competent host cells (**transformation**). Host cells are then grown on a medium containing the antibiotic for which the vector carries resistance, so that **only transformants survive**.',
      v: table(['Step', 'What happens', 'Result'], [['Ligation', 'Gene inserted into vector; ligase seals joints', 'Recombinant DNA'], ['Transformation', 'Recombinant DNA enters competent host cells', 'Some cells transformed'], ['Selection', 'Cells plated on antibiotic medium', 'Only transformants grow']], 'Table of ligation, transformation and selection'),
      n: 'Not every cell takes up the plasmid, so selection is essential. If the vector carries a gene for ampicillin resistance, only cells that took up the vector can grow on an ampicillin plate. Insertional inactivation or blue-white screening then tells recombinants from non-recombinants.',
    }),
    sl('concept', 'Step 6: obtaining the foreign gene product', {
      b: 'When the inserted gene is expressed in the host, the host makes a **recombinant protein**. To get large amounts, cells are grown in **continuous culture**: used medium is drained from one side while fresh medium is added from the other, keeping cells in their most active **log (exponential) phase**.',
      v: flow('LR', [['h', 'Recombinant host cells'], ['c', 'Continuous culture'], ['l', 'Cells kept in log phase'], ['p', 'Large yield of recombinant protein']], [['h', 'c'], ['c', 'l'], ['l', 'p']], 'Flow from recombinant cells through continuous culture to a large yield of protein'),
      n: 'A small flask gives only a small amount of product. Continuous culture keeps the cells growing at their fastest rate for a long time, which gives more biomass and more of the desired protein. For industrial scale, large vessels called bioreactors are used.',
    }),
    sl('diagram', 'Bioreactors', {
      b: '**Bioreactors** are large vessels (often **100–1000 litres**) in which raw materials are converted by microbes, plant, animal or human cells into specific products. They provide **optimal conditions**: temperature, pH, substrate, salts, vitamins and oxygen. The **stirred-tank** type is the most common.',
      v: V.bioreactor,
      n: 'A stirred-tank bioreactor is usually a cylinder with a curved base for good mixing. A motor-driven stirrer keeps the contents mixed and spreads oxygen evenly; sterile air is bubbled in through a sparger. It also has an agitator system, an oxygen-delivery system, foam control, temperature and pH control, and sampling ports to check the culture.',
    }),
    sl('check', 'Quick check: bioreactor', {
      b: 'In a stirred-tank bioreactor, what is the main role of the stirrer?',
      n: 'Quick check. Think about mixing and oxygen.',
      chk: 'stirrer-mcq',
    }),
    sl('concept', 'Step 7: downstream processing', {
      b: 'After biosynthesis, the product must be made ready for sale: **downstream processing**.',
      v: table(['Stage', 'Purpose'], [['Separation', 'Separate the product from cells and medium'], ['Purification', 'Remove impurities'], ['Formulation', 'Add suitable preservatives'], ['Clinical trials (for drugs)', 'Test safety and effectiveness'], ['Quality control', 'Strict testing of every batch']], 'Table of the stages of downstream processing'),
      n: 'The broth from a bioreactor contains cells, leftover nutrients and many other molecules. The product has to be separated and purified, then formulated with preservatives. Medicines must also pass clinical trials and strict quality control. These steps differ from product to product.',
    }),
    sl('example', 'Worked example 2: planning a project', {
      b: 'A company wants bacteria to make a human protein. Put these steps in order and name the key tool or reagent for each: transform E. coli; amplify the human gene; purify the protein; cut gene and plasmid; grow cells in a bioreactor; join gene to plasmid; select transformants.',
      ul: [
        '1. **Amplify** the gene — PCR with primers and Taq polymerase.',
        '2. **Cut** gene and plasmid — the same restriction enzyme.',
        '3. **Join** — DNA ligase.',
        '4. **Transform** E. coli — calcium treatment and heat shock.',
        '5. **Select** transformants — antibiotic medium (and blue-white screening).',
        '6–7. **Grow** in a stirred-tank bioreactor, then **purify** by downstream processing.',
      ],
      v: table(['Order', 'Step', 'Tool'], [['1', 'Amplify', 'PCR, Taq'], ['2', 'Cut', 'Restriction enzyme'], ['3', 'Join', 'DNA ligase'], ['4', 'Transform', 'Ca²⁺ and heat shock'], ['5', 'Select', 'Antibiotic medium'], ['6', 'Grow', 'Bioreactor'], ['7', 'Purify', 'Downstream processing']], 'Worked table ordering seven steps with their tools'),
      n: 'Work forwards from the gene to the product. First make plenty of the gene, then cut it and the plasmid with the same enzyme and join them. Next, get the plasmid into bacteria and keep only those that took it up. Finally grow them on a large scale and purify the protein.',
    }),
    sl('check', 'Quick check: isolating DNA', {
      b: 'Judge the assertion and the reason about precipitating DNA.',
      n: 'Quick check. What is added at the end of DNA isolation?',
      chk: 'ethanol-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Isolation: lysozyme, cellulase or chitinase; ribonuclease, protease; chilled ethanol precipitates DNA.',
        'Cutting checked by agarose gel; vector cut with the same enzyme.',
        'PCR: denaturation, annealing of primers, extension by Taq polymerase; 2ⁿ copies after n cycles (about a billion after 30).',
        'Ligation by DNA ligase; transformation of competent cells; selection on antibiotic medium.',
        'Product: recombinant protein; continuous culture in log phase; stirred-tank bioreactors (100–1000 L).',
        'Downstream processing: separation, purification, formulation, clinical trials, quality control.',
      ],
      v: table(['Step', 'Key reagent or device'], [['Isolate', 'Lysozyme, chilled ethanol'], ['Amplify', 'Primers, Taq polymerase'], ['Join', 'DNA ligase'], ['Grow', 'Bioreactor']], 'Summary table of steps and key reagents'),
      n: 'To recap: DNA is isolated and cut, the gene is amplified by PCR, joined into a vector and put into a host. Selected hosts are grown in bioreactors to make the recombinant protein, which is then purified and tested in downstream processing.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Match each **cell-wall enzyme** to its organism.',
        'Name the three **PCR steps** and the role of **Taq**.',
        'Use **2ⁿ** for PCR copy numbers.',
        'List the **stages of downstream processing**.',
      ],
      n: 'Exam tips. Match lysozyme, cellulase and chitinase to bacteria, plants and fungi. Name the three steps of PCR and explain why Taq polymerase is used. Use two to the power n for copy numbers. And remember the stages of downstream processing.',
    }),
  ],
});
