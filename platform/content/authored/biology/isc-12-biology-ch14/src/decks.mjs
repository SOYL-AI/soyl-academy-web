// ISC 12 Biology ch14 Biotechnology: Principles and Processes — Part 1 (t01–t03), Part 2 (t04–t06).
import { sl, deck, table, flow, svgV, r } from '../../isc-12-biology-ch01/src/lib.mjs';
import { ECORI, GEL, PBR, PCR, BIOREACTOR, BLUEWHITE, WHITE, BLUE } from './svgs.mjs';
import { digest, expectedSites, pcr, isPalindrome, reverseComplement, migration } from './calc.mjs';

export const V = {
  ecori: svgV(ECORI, 'EcoRI cutting a palindromic site to leave sticky ends'),
  gel: svgV(GEL, 'Agarose gel with a ladder and a sample lane; smaller fragments travel farther'),
  pbr: svgV(PBR, 'Map of the plasmid pBR322 with ori, rop, resistance genes and restriction sites'),
  pcr: svgV(PCR, 'Three steps of PCR and the doubling of DNA copies each cycle'),
  bioreactor: svgV(BIOREACTOR, 'Stirred-tank bioreactor with agitator, sparger and control probes'),
  bluewhite: svgV(BLUEWHITE, 'Blue and white colonies on a plate used to pick recombinants'),
};

// ---------------------------------------------------------------- computed numbers
export const SEQ = 'TTGAATTCCAGGCGAATTCTA';
export const FRAGS = digest(SEQ, 'GAATTC', 1);
export const SITES6 = expectedSites(4096 * 3, 6);
export const PCR_START = 4;
export const PCR_N = 20;
export const PCR_COPIES = pcr(PCR_N, PCR_START);
export const REC_PCT = Math.round((WHITE / (WHITE + BLUE)) * 1000) / 10;

export const deck1 = deck({
  part: 1,
  title: 'Biotechnology: Principles and Processes — Part 1: Tools of recombinant DNA technology',
  goals: [
    'Define biotechnology and state its two core principles',
    'Describe isolation of genomic DNA by cell lysis and separation of fragments by gel electrophoresis',
    'Explain the discovery, naming and action of restriction enzymes and the role of ligase',
    'State the features of a good cloning vector and describe pBR322, Ti plasmid, retroviruses, BAC and YAC',
  ],
  slides: [
    sl('title', 'Biotechnology', {
      b: 'Part 1 — the tools used to cut, separate, join and carry genes.',
      v: flow('LR', [['i', 'Isolate DNA'], ['c', 'Cut with restriction enzyme'], ['s', 'Separate fragments on a gel'], ['j', 'Join into a vector with ligase']], [['i', 'c'], ['c', 's'], ['s', 'j']], 'Flow from isolating DNA to cutting, separating and joining it into a vector'),
      n: 'Biotechnology uses living organisms, cells or enzymes to make products and processes useful to humans. Its modern form depends on tools that let us take a gene out of one organism and put it into another.',
    }),
    sl('concept', 'Definition and principles', {
      b: 'The **European Federation of Biotechnology** defines biotechnology as the integration of natural science and organisms, cells, parts thereof and molecular analogues for products and services. Modern biotechnology rests on **two core techniques**.',
      v: table(['Principle', 'What it does'], [['Genetic engineering', 'Alters the chemistry of DNA or RNA and introduces it into a host organism, changing its phenotype'], ['Bioprocess engineering', 'Keeps sterile, contamination-free conditions so that only the desired microbe or cell grows in large quantities to make products such as antibiotics, vaccines and enzymes']], 'Table of the two core principles of biotechnology'),
      n: 'Genetic engineering creates the organism with the gene we want. Bioprocess engineering then grows it in huge, sterile vessels so that the product can be made on an industrial scale.',
    }),
    sl('concept', 'Isolating genomic DNA', {
      b: 'DNA lies inside membranes along with proteins, RNA and other molecules. It must be released and purified.',
      v: table(['Step', 'Done by'], [['Break the cell (lysis)', 'Lysozyme for bacteria, cellulase for plant cells, chitinase for fungi'], ['Remove RNA', 'Ribonuclease'], ['Remove proteins (histones)', 'Protease'], ['Precipitate DNA', 'Chilled ethanol: DNA appears as fine threads, removed by spooling']], 'Table of the steps of isolating genomic DNA'),
      n: 'Each kind of cell wall needs its own enzyme. After lysis, enzymes digest the RNA and proteins, and cold ethanol makes the long DNA molecules come out of solution as fine white threads that can be wound onto a glass rod.',
    }),
    sl('diagram', 'Gel electrophoresis', {
      b: 'DNA fragments are separated in **agarose gel** (a polysaccharide from seaweed). DNA is **negatively charged**, so in an electric field it moves towards the **anode (+)**. The gel acts as a **sieve**: **smaller fragments move farther**. Bands are stained with **ethidium bromide** and seen as **orange bands under UV light**, then cut out and **eluted**.',
      v: V.gel,
      n: 'Fragments of known size, the ladder, are run beside the sample, so the size of each unknown band can be estimated by comparing positions. The band carrying the gene of interest is cut out and the DNA extracted for cloning.',
    }),
    sl('example', 'Worked example 1: sizing fragments on a gel', {
      b: 'A ladder of 5000, 2000, 1000, 500, 200 and 100 bp is run beside a sample. The sample bands lie (i) between the 5000 and 2000 bands, (ii) between 1000 and 500, and (iii) between 200 and 100. Estimate each size range and say which moved farthest.',
      ul: [
        'Compare each band with its neighbours in the ladder: (i) **2000–5000 bp**, (ii) **500–1000 bp**, (iii) **100–200 bp**.',
        `Distances moved follow size: ${[4000, 600, 150].map((bp) => `${bp} bp → ${migration(bp)} units`).join('; ')}.`,
        'Band (iii), the **smallest**, moved **farthest** towards the anode.',
      ],
      v: table(['Band', 'Lies between (bp)', 'Estimated size'], [['(i)', '5000 and 2000', 'about 4000 bp'], ['(ii)', '1000 and 500', 'about 600 bp'], ['(iii)', '200 and 100', 'about 150 bp']], 'Worked table: sample bands of about 4000, 600 and 150 base pairs'),
      n: 'Read each sample band against the ladder beside it. A band between the one thousand and five hundred markers must be between those sizes. The smallest fragment always travels farthest, because it slips most easily through the gel.',
    }),
    sl('concept', 'Restriction enzymes: discovery and naming', {
      b: 'In **1963**, two enzymes were found in **E. coli** that **restrict the growth of bacteriophages**: one adds **methyl groups** to DNA, the other **cuts** DNA — a **restriction endonuclease**. The first whose action depended on a **specific sequence**, **Hind II**, was isolated five years later; it cuts at a particular six-base-pair sequence.',
      v: table(['Letter in EcoRI', 'Meaning'], [['E', 'Genus: Escherichia'], ['co', 'Species: coli'], ['R', 'Strain: RY 13'], ['I', 'First enzyme isolated from this strain']], 'Table explaining the name EcoRI'),
      n: 'Restriction enzymes are molecular scissors. Exonucleases remove nucleotides from the ends of DNA, while endonucleases cut at specific positions within it. Their names record the bacterium they came from.',
    }),
    sl('diagram', 'How EcoRI cuts DNA', {
      b: 'Each restriction endonuclease recognises a specific **palindromic** sequence — one that reads the **same 5′→3′ on both strands**. EcoRI cuts **GAATTC** between **G and A** on both strands, a little away from the centre, leaving single-stranded overhangs called **sticky ends**.',
      v: V.ecori,
      n: 'Sticky ends form hydrogen bonds with complementary sticky ends. If a vector and a foreign DNA are cut with the same enzyme, their sticky ends match, and the enzyme DNA ligase seals them together.',
    }),
    sl('example', 'Worked example 2: cutting a sequence', {
      b: `A top strand reads 5′–${SEQ}–3′. EcoRI cuts between G and A of each GAATTC. How many fragments are formed, and what are their top-strand sequences? Is GAATTC a palindrome?`,
      ul: [
        `GAATTC occurs **${FRAGS.length - 1}** times, so there are **${FRAGS.length}** fragments.`,
        `Fragments: **${FRAGS.join(' | ')}**.`,
        `Reverse complement of GAATTC = ${reverseComplement('GAATTC')}, so it is **${isPalindrome('GAATTC') ? 'palindromic' : 'not palindromic'}**.`,
      ],
      v: table(['Fragment', 'Top strand'], FRAGS.map((f, i) => [String(i + 1), f]), `Worked table: ${FRAGS.length} fragments`),
      n: 'Find each recognition site, then cut after the G. Two sites in a linear molecule give three pieces. The same site read on the other strand, from five prime to three prime, is identical, which is what palindromic means for DNA.',
    }),
    sl('concept', 'Joining DNA and the steps of recombinant DNA technology', {
      b: '**DNA ligase** joins the sugar–phosphate backbones of fragments with matching sticky ends, producing **recombinant DNA**.',
      v: flow('TB', [['a', 'Isolate DNA'], ['b', 'Cut with restriction endonuclease'], ['c', 'Isolate desired fragment'], ['d', 'Ligate into vector'], ['e', 'Transfer into host'], ['f', 'Culture host on a large scale'], ['g', 'Extract the product']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e'], ['e', 'f'], ['f', 'g']], 'Flow of the steps of recombinant DNA technology'),
      n: 'The process runs from isolating DNA, through cutting and joining, to putting the recombinant DNA into a host and growing that host to make the desired product.',
    }),
    sl('check', 'Quick check: isolating DNA', {
      b: 'What is added to make purified DNA come out of solution as fine threads?',
      n: 'Quick check. It is an alcohol, used very cold.',
      chk: 'ethanol-mcq',
    }),
    sl('concept', 'Features of a good cloning vector', {
      b: 'A **vector** carries foreign DNA into a host and multiplies there.',
      v: table(['Feature', 'Why it is needed'], [['Origin of replication (ori)', 'Starts replication and controls the copy number of linked DNA'], ['Selectable marker', 'Lets transformants be picked out, for example genes for resistance to ampicillin or tetracycline'], ['Cloning sites', 'Single recognition sites for commonly used restriction enzymes, so the vector is cut only once'], ['Small size', 'Easier to handle and to take up']], 'Table of features of a good cloning vector'),
      n: 'If a vector had several sites for one enzyme, cutting would break it into pieces. A single site, ideally inside a marker gene, makes the vector easy to open, join and select.',
    }),
    sl('diagram', 'The plasmid pBR322', {
      b: '**pBR322** is an **E. coli** plasmid vector with **ori**, the **rop** gene (for proteins involved in replication), and two antibiotic-resistance genes, **ampᴿ** and **tetᴿ**, carrying recognition sites such as **BamHI** (in tetᴿ), **PstI** and **PvuI** (in ampᴿ), and **EcoRI, HindIII, ClaI, SalI, PvuII**.',
      v: V.pbr,
      n: 'Because some restriction sites lie inside the resistance genes, inserting foreign DNA there switches off that resistance. This loss of resistance is used to tell recombinant plasmids from those without an insert.',
    }),
    sl('concept', 'Other vectors', {
      b: 'Natural genetic engineers have been turned into vectors.',
      v: table(['Vector', 'Feature', 'Used for'], [['Ti plasmid of Agrobacterium tumefaciens', 'Delivers DNA that transforms plant cells; disarmed so it no longer causes tumours', 'Plants'], ['Retroviruses (disarmed)', 'Insert their DNA into host chromosomes', 'Animal cells'], ['BAC (bacterial artificial chromosome)', 'Carries large inserts in bacteria', 'Genome projects'], ['YAC (yeast artificial chromosome)', 'Carries very large inserts in yeast', 'Genome projects']], 'Table of other cloning vectors'),
      n: 'Agrobacterium naturally moves a piece of its plasmid into plant cells and causes tumours. With the tumour genes removed, the plasmid can deliver useful genes instead. Retroviruses are disarmed in the same way for animal cells.',
    }),
    sl('check', 'Quick check: palindromes', {
      b: 'Judge the assertion and the reason about restriction sites.',
      n: 'Quick check. Does a palindromic site read the same on both strands?',
      chk: 'palindrome-ar',
    }),
    sl('check', 'Quick check: ori', {
      b: 'Which part of a vector controls the copy number of linked DNA?',
      n: 'Quick check. It is where replication starts.',
      chk: 'ori-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Biotechnology rests on genetic engineering and bioprocess engineering.',
        'DNA isolation: lysozyme, cellulase or chitinase; ribonuclease; protease; chilled ethanol; spooling.',
        'Gel electrophoresis: agarose; DNA moves to the anode; smaller fragments farther; ethidium bromide and UV; elution.',
        'Restriction endonucleases (Hind II first; EcoRI named after E. coli RY 13) cut palindromes, leaving sticky ends; ligase joins.',
        'Vector features: ori, selectable marker, single cloning sites; pBR322, Ti plasmid, retroviruses, BAC, YAC.',
      ],
      v: table(['Enzyme', 'Role'], [['Restriction endonuclease', 'Cuts DNA at a specific site'], ['DNA ligase', 'Joins DNA fragments'], ['Lysozyme', 'Breaks bacterial cell walls']], 'Summary table of enzymes and roles'),
      n: 'To recap: DNA is isolated, cut by restriction enzymes at palindromic sites, separated on a gel, and joined into a vector by ligase. Good vectors have an origin of replication, a selectable marker and single cloning sites.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Explain each letter of **EcoRI**.',
        'Draw **sticky ends** after an EcoRI cut.',
        'Name the **enzyme for each cell wall** in DNA isolation.',
        'Give the **role of ori, markers and cloning sites** with pBR322 examples.',
      ],
      n: 'Exam tips. Be ready to expand the name EcoRI letter by letter. Practise drawing sticky ends. Match each cell wall with the enzyme that breaks it. And explain each feature of a vector using pBR322.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Biotechnology: Principles and Processes — Part 2: Getting genes into hosts and making products',
  goals: [
    'Describe how recombinant DNA is transferred into competent hosts',
    'Explain selection of recombinants by antibiotic resistance, insertional inactivation and blue-white screening',
    'Describe gene amplification by PCR and in vivo, and the use of bioreactors and downstream processing',
  ],
  slides: [
    sl('title', 'From recombinant DNA to product', {
      b: 'Part 2 — putting recombinant DNA into cells, finding the right cells, copying genes and scaling up production.',
      v: flow('LR', [['t', 'Transfer into host'], ['s', 'Select recombinants'], ['a', 'Amplify'], ['p', 'Produce in bioreactor and purify']], [['t', 's'], ['s', 'a'], ['a', 'p']], 'Flow from transfer into host to selection, amplification and production'),
      n: 'Once a gene is joined into a vector, it must enter a host, the host cells carrying it must be identified, the gene must be copied, and the product must be made on a large scale and purified.',
    }),
    sl('concept', 'Making host cells competent', {
      b: 'DNA is **hydrophilic** and cannot pass easily through cell membranes. Bacteria are made **competent** by treating them with a **divalent cation such as calcium**.',
      v: table(['Step', 'Purpose'], [['Treat cells with calcium chloride', 'Increases the efficiency with which DNA enters'], ['Incubate cells with recombinant DNA on ice', 'DNA binds the cells'], ['Heat shock at 42 °C briefly', 'DNA is taken up'], ['Return to ice', 'Cells recover']], 'Table of the steps of making bacteria competent'),
      n: 'Calcium ions and a brief rise in temperature make the bacterial membrane let DNA in. Only a small fraction of cells take up the plasmid, so these must then be picked out.',
    }),
    sl('concept', 'Other methods of gene transfer', {
      b: 'Different hosts need different methods.',
      v: table(['Method', 'How', 'Hosts'], [['Microinjection', 'DNA injected directly into the nucleus with a fine needle', 'Animal cells'], ['Biolistics (gene gun)', 'Gold or tungsten particles coated with DNA are fired at high velocity', 'Plant cells'], ['Disarmed pathogen vectors', 'Agrobacterium or retroviruses deliver the gene', 'Plants and animals']], 'Table of methods of gene transfer'),
      n: 'Plant cells have tough walls, so DNA-coated metal particles are shot into them with a gene gun. Animal cells can be injected directly. Disarmed Agrobacterium and retroviruses use their natural ability to deliver genes.',
    }),
    sl('concept', 'Selecting recombinants', {
      b: 'After transfer, only some cells are **transformants**, and only some of those carry **recombinant** DNA.',
      v: table(['Method', 'How it works'], [['Antibiotic resistance', 'On an ampicillin plate only cells with the plasmid (ampᴿ) grow'], ['Insertional inactivation of tetᴿ', 'Foreign DNA inserted at the BamHI site inside tetᴿ destroys tetracycline resistance; recombinants grow on ampicillin but not on tetracycline'], ['Blue-white selection', 'Insert placed inside lacZ; recombinant colonies cannot make β-galactosidase and stay white']], 'Table of methods of selecting recombinants'),
      n: 'Selection with two antibiotics is laborious, because cells must be plated on two kinds of medium. Insertional inactivation of a colour-producing gene lets recombinants be seen at a glance.',
    }),
    sl('diagram', 'Blue-white selection', {
      b: 'The vector carries **lacZ**, coding for **β-galactosidase**. Colonies grown with a **chromogenic substrate** turn **blue** if the enzyme is made. Foreign DNA inserted **inside lacZ** inactivates it (**insertional inactivation**), so **recombinant colonies are white**.',
      v: V.bluewhite,
      n: 'Blue colonies carry the vector without an insert. White colonies carry a gene interrupted by foreign DNA. Researchers simply pick the white colonies for further study.',
    }),
    sl('example', 'Worked example 1: counting recombinants', {
      b: `On the plate, ${BLUE} colonies are blue and ${WHITE} are white. Which are recombinant, and what percentage of the colonies is that?`,
      ul: [
        '**White** colonies are recombinant (lacZ inactivated by the insert).',
        r`Recombinant $= \dfrac{${WHITE}}{${WHITE} + ${BLUE}} \times 100 = ${REC_PCT}$ percent.`,
      ],
      v: table(['Colour', 'Number', 'Meaning'], [['Blue', String(BLUE), 'Vector without insert'], ['White', String(WHITE), 'Recombinant']], `Worked table: ${REC_PCT} percent recombinant`),
      n: 'Only about a quarter of the colonies carry the insert, which is typical: many vectors close up again without taking in foreign DNA. Colour screening saves the effort of testing every colony.',
    }),
    sl('check', 'Quick check: competence', {
      b: 'Which treatment makes bacterial cells competent to take up DNA?',
      n: 'Quick check. Think of a divalent cation followed by a brief rise in temperature.',
      chk: 'calcium-mcq',
    }),
    sl('diagram', 'Gene amplification by PCR', {
      b: 'The **polymerase chain reaction (PCR)** amplifies a gene **in vitro**. Each cycle: **denaturation** (high temperature separates strands), **annealing** (two **primers** bind), and **extension** by a **thermostable DNA polymerase** isolated from **Thermus aquaticus** (**Taq polymerase**). Copies **double** every cycle.',
      v: V.pcr,
      n: 'Because Taq polymerase survives the high temperature of denaturation, the three steps can be repeated again and again in one tube. After about thirty cycles, a single DNA molecule can be amplified about a billion times.',
    }),
    sl('example', 'Worked example 2: how many copies?', {
      b: `A PCR starts with ${PCR_START} copies of a target sequence. How many copies are there after ${PCR_N} cycles, assuming perfect doubling?`,
      ul: [
        r`Copies $= ${PCR_START} \times 2^{${PCR_N}} = ${PCR_COPIES}$.`,
        'That is about four million copies — enough to see on a gel or to clone.',
      ],
      v: table(['Cycles', 'Copies'], [0, 5, 10, PCR_N].map((n) => [String(n), String(pcr(n, PCR_START))]), `Worked table: ${PCR_COPIES} copies after ${PCR_N} cycles`),
      n: 'Each cycle doubles the number, so twenty cycles multiply it by about a million. That is why PCR can work with the tiny amounts of DNA in a drop of blood or a single hair.',
    }),
    sl('concept', 'Amplification in vivo', {
      b: 'A gene can also be multiplied **in vivo** by **cloning**: the recombinant vector replicates inside the host, and the host multiplies.',
      v: table(['Feature', 'PCR (in vitro)', 'Cloning (in vivo)'], [['Where', 'Test tube', 'Living host cells'], ['Enzyme', 'Taq polymerase', 'Host’s own DNA polymerase'], ['Copy number', 'Set by cycles', 'Set by ori of the vector'], ['Product', 'DNA only', 'DNA and, if expressed, protein']], 'Table comparing PCR and in vivo amplification'),
      n: 'In a living host, each cell can carry many copies of a high-copy plasmid, and the cells themselves divide. If the gene is expressed, the host also makes the protein, which is what industry usually wants.',
    }),
    sl('diagram', 'Bioreactors', {
      b: 'Large volumes (**100–1000 litres**) of culture are grown in **bioreactors**, which give optimum **temperature, pH, substrate, salts, vitamins and oxygen**. The **stirred-tank** type is commonest.',
      v: V.bioreactor,
      n: 'A bioreactor has an agitator to mix the contents, a way of supplying sterile air, a foam-control system, a temperature-control jacket, pH control, and sampling ports so that the culture can be checked as it grows.',
    }),
    sl('concept', 'Stirred-tank and sparged-tank bioreactors', {
      b: 'Two common designs differ in how they mix and aerate the culture.',
      v: table(['Feature', 'Stirred-tank', 'Sparged-tank'], [['Shape', 'Usually cylindrical with a curved base', 'Tall vessel'], ['Mixing', 'Motor-driven agitator (impeller) mixes contents and oxygen', 'Mixing by air bubbles'], ['Aeration', 'Air through a sparger, spread by the stirrer', 'Sterile air bubbled through the medium'], ['Advantage', 'Even mixing and oxygen supply', 'Larger surface area for oxygen transfer; no moving parts in the medium']], 'Table comparing stirred-tank and sparged-tank bioreactors'),
      n: 'Both designs aim to give every cell enough oxygen and nutrients. In a sparged tank, rising bubbles do the mixing; in a stirred tank, an impeller does.',
    }),
    sl('concept', 'Downstream processing', {
      b: 'After the biosynthetic stage, the product must be made ready for market: **downstream processing**.',
      v: flow('LR', [['s', 'Separation'], ['p', 'Purification'], ['f', 'Formulation with preservatives'], ['c', 'Clinical trials and quality control']], [['s', 'p'], ['p', 'f'], ['f', 'c']], 'Flow of downstream processing from separation to quality control'),
      n: 'The product is separated from the culture and purified, then formulated with suitable preservatives. Drugs must also pass clinical trials and strict quality control before they reach patients.',
    }),
    sl('check', 'Quick check: PCR enzyme', {
      b: 'Why is Taq polymerase used in PCR?',
      n: 'Quick check. What happens to most enzymes at very high temperatures?',
      chk: 'taq-mcq',
    }),
    sl('check', 'Quick check: insertional inactivation', {
      b: 'Judge the assertion and the reason about selection on tetracycline.',
      n: 'Quick check. Where is the BamHI site in pBR322?',
      chk: 'insertion-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Competent bacteria: calcium chloride, ice, heat shock at 42 °C, ice.',
        'Microinjection (animal cells), biolistics or gene gun (plant cells), disarmed vectors.',
        'Selection: antibiotic resistance; insertional inactivation (tetᴿ at BamHI); blue-white with lacZ.',
        'PCR: denaturation, annealing, extension by Taq polymerase; copies double each cycle. In vivo amplification by cloning.',
        'Bioreactors (stirred-tank, sparged-tank) and downstream processing (separation, purification, formulation, trials).',
      ],
      v: table(['Term', 'Meaning'], [['Competent cell', 'Able to take up DNA'], ['Insertional inactivation', 'Insert switches off a marker gene'], ['Taq polymerase', 'Heat-stable DNA polymerase'], ['Downstream processing', 'Separation and purification of product']], 'Summary table of key terms'),
      n: 'To recap: recombinant DNA is put into competent or otherwise treated hosts, recombinants are picked by antibiotic or colour selection, genes are amplified by PCR or cloning, and products are made in bioreactors and purified.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'List the **steps of heat shock** in order.',
        'Explain why recombinants are **white** and why they **fail on tetracycline**.',
        'Name the **three PCR steps** with the role of Taq polymerase; use **2ⁿ** for copies.',
        'Distinguish **stirred-tank** and **sparged-tank** bioreactors.',
      ],
      n: 'Exam tips. Give the heat-shock steps in order. Explain both kinds of insertional inactivation. Name the three steps of PCR and use powers of two for copy numbers. And compare the two kinds of bioreactor.',
    }),
  ],
});
