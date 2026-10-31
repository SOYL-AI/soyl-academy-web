// ISC 12 Biology ch14 notes and flashcards.
import { T, table, unit, PROV } from '../../isc-12-biology-ch01/src/lib.mjs';
import { V, FRAGS, SEQ } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Biotechnology: Principles and Processes — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Principles; isolating DNA; gel electrophoresis',
      `**Biotechnology** deals with techniques of using live organisms or enzymes from organisms to produce products and processes useful to humans. The **European Federation of Biotechnology (EFB)** defines it as “the integration of natural science and organisms, cells, parts thereof, and molecular analogues for products and services”.

**Two core techniques:** (i) **genetic engineering** — altering the chemistry of genetic material (DNA/RNA), introducing it into host organisms and thus changing their phenotype; (ii) **bioprocess engineering** — maintaining **sterile (microbial-contamination-free)** conditions to grow only the desired microbe or eukaryotic cell in large quantities to make antibiotics, vaccines, enzymes and other products.

**Isolation of genomic DNA:** cells are broken open with enzymes — **lysozyme** (bacteria), **cellulase** (plant cells), **chitinase** (fungi). **RNA** is removed with **ribonuclease** and **proteins** (such as histones) with **protease**. Addition of **chilled ethanol** precipitates purified DNA as a collection of **fine threads** in suspension, removed by **spooling**.

**Gel electrophoresis:** DNA fragments are separated in a matrix of **agarose**, a natural polymer extracted from **sea weeds**. DNA is **negatively charged** and moves towards the **anode** under an electric field. The gel acts as a **sieve**, so **smaller fragments move farther**. Separated DNA is stained with **ethidium bromide** and seen as bright **orange bands under UV** light. Bands are cut out and the DNA extracted (**elution**) for use in constructing recombinant DNA.`,
      [kt('Genetic engineering', 'Altering genetic material and introducing it into a host to change its phenotype.'), kt('Bioprocess engineering', 'Growing desired cells in sterile, large-scale culture to make products.'), kt('Spooling', 'Winding precipitated DNA threads onto a rod.'), kt('Elution', 'Extracting DNA from a cut-out gel band.')],
      V.gel,
      [1],
    ),
    sec(
      '2. Restriction enzymes and ligase',
      `In **1963** two enzymes responsible for **restricting the growth of bacteriophage** in ***Escherichia coli*** were isolated: one **added methyl groups** to DNA, the other **cut DNA** (restriction endonuclease). The first restriction endonuclease whose action depended on a **specific DNA sequence**, **Hind II**, was isolated five years later; it always cuts DNA at a particular point by recognising a specific sequence of **six base pairs** (its recognition sequence). More than 900 restriction enzymes are now known from over 230 strains of bacteria.

**Nomenclature:** the first letter comes from the **genus** and the next two from the **species** of the prokaryote; the next letter is the **strain**, and the Roman numeral the **order of isolation**. **EcoRI**: ***E***scherichia ***co***li, strain ***R***Y 13, the first (***I***) enzyme.

**Features:** restriction enzymes belong to the **nucleases**. **Exonucleases** remove nucleotides from the ends of DNA; **endonucleases** cut at specific positions within it. Each restriction endonuclease recognises a specific **palindromic nucleotide sequence** — the sequence reads the **same on the two strands** when the orientation of reading is kept the same (5′→3′). They cut the strands **a little away from the centre** of the palindrome, between the same two bases on both strands, leaving **single-stranded overhangs** — **sticky ends**, which form hydrogen bonds with complementary cut counterparts. **DNA ligase** then joins the fragments. (Example: EcoRI cuts 5′–${SEQ}–3′ into ${FRAGS.length} fragments.)

**Steps of recombinant DNA technology:** isolation of DNA → fragmentation by restriction endonucleases → isolation of the desired DNA fragment → ligation into a vector → transfer of rDNA into a host → culturing host cells in a medium at large scale → extraction of the desired product.`,
      [kt('Restriction endonuclease', 'Enzyme that cuts DNA at a specific recognition sequence.'), kt('Palindrome (DNA)', 'Sequence reading the same 5′→3′ on both strands.'), kt('Sticky ends', 'Single-stranded overhangs left by staggered cuts.'), kt('DNA ligase', 'Enzyme that joins DNA fragments.')],
      V.ecori,
      [2],
    ),
    sec(
      '3. Cloning vectors',
      `**Features required for cloning into a vector:**
- **Origin of replication (ori):** the sequence from where replication starts; any DNA linked to it can replicate in the host. It also controls the **copy number** of the linked DNA.
- **Selectable marker:** helps identify and eliminate **non-transformants** and selectively permit growth of **transformants** — normally genes encoding resistance to antibiotics such as **ampicillin, chloramphenicol, tetracycline or kanamycin**.
- **Cloning sites:** the vector should have **very few, preferably single**, recognition sites for commonly used restriction enzymes.
- **Small size** of the vector.

**pBR322** is an *E. coli* cloning vector with **ori**, **rop** (codes for proteins participating in plasmid replication), **ampᴿ** and **tetᴿ**, and restriction sites for **Hind III, EcoRI, BamHI, SalI, PvuII, PstI, ClaI** and **PvuI**; BamHI and SalI lie within **tetᴿ**, PvuI and PstI within **ampᴿ**.

**Vectors for plants and animals:** ***Agrobacterium tumefaciens***, a pathogen of dicots, delivers a piece of DNA (**T-DNA**) that transforms normal plant cells into a tumour; its **Ti plasmid** has been modified into a **non-pathogenic** cloning vector. **Retroviruses** in animals transform normal cells into cancerous ones; **disarmed retroviruses** are used to deliver desirable genes into animal cells. For very large DNA (genome projects), **BAC (bacterial artificial chromosome)** and **YAC (yeast artificial chromosome)** vectors are used.`,
      [kt('Vector', 'DNA molecule that carries foreign DNA into a host and replicates there.'), kt('Selectable marker', 'Gene, often for antibiotic resistance, used to pick out transformants.'), kt('Copy number', 'Number of copies of a plasmid per cell, controlled by ori.')],
      V.pbr,
      [3],
    ),
    sec(
      '4. Transfer into hosts and selection of recombinants',
      `**Competent host:** DNA is hydrophilic and cannot pass through cell membranes. Bacterial cells are made **competent** by treatment with a specific concentration of a **divalent cation such as calcium**. Recombinant DNA is incubated with the cells **on ice**, given a brief **heat shock at 42 °C**, and put **back on ice**, which enables the bacteria to take up the DNA.

**Other methods:** **microinjection** — recombinant DNA injected directly into the **nucleus of an animal cell**; **biolistics (gene gun)** — plant cells are bombarded with high-velocity micro-particles of **gold or tungsten coated with DNA**; **disarmed pathogen vectors** — Agrobacterium or retroviruses that transfer the recombinant DNA when they infect cells.

**Selection of recombinants:**
- **Antibiotic resistance:** when pBR322 carrying ampᴿ is introduced, only **transformants** grow on **ampicillin** medium.
- **Insertional inactivation of an antibiotic-resistance gene:** foreign DNA ligated at the **BamHI site of tetᴿ** destroys tetracycline resistance. Recombinants grow on **ampicillin** but **not on tetracycline**; non-recombinants grow on both. This needs simultaneous plating on two media.
- **Blue-white selection:** the foreign DNA is inserted within the coding sequence of **β-galactosidase (lacZ)**, inactivating it (**insertional inactivation**). On a medium with a **chromogenic substrate**, colonies **without** an insert make **blue** colonies; **recombinant** colonies remain **white**.`,
      [kt('Competent cell', 'Cell made able to take up DNA, for example by calcium chloride treatment.'), kt('Biolistics', 'Gene gun method using DNA-coated gold or tungsten particles.'), kt('Insertional inactivation', 'Loss of a gene’s function when foreign DNA is inserted into it.')],
      V.bluewhite,
      [4],
    ),
    sec(
      '5. Gene amplification',
      `**Polymerase chain reaction (PCR)** — amplification **in vitro**. Multiple copies of the gene of interest are synthesised using **two sets of primers** (small chemically synthesised oligonucleotides complementary to the ends of the target region) and **DNA polymerase**. Each cycle has three steps:
1. **Denaturation** — high temperature separates the two strands.
2. **Annealing** — primers bind to the complementary regions.
3. **Extension** — the enzyme extends the primers using the nucleotides provided.
The **thermostable DNA polymerase** isolated from the bacterium ***Thermus aquaticus*** (**Taq polymerase**) remains active during the high-temperature denaturation. Repeating the cycle many times (for example 30) amplifies the DNA about a billion times: copies after n cycles = starting copies × 2ⁿ.

**Amplification in vivo:** the recombinant vector is introduced into a host where it **replicates** with the help of the **ori**, and multiplies as the host divides; high-copy-number plasmids give many copies per cell. If the gene is expressed in a suitable host, the **recombinant protein** is produced as well.`,
      [kt('PCR', 'In vitro amplification of DNA by repeated denaturation, annealing and extension.'), kt('Primer', 'Short oligonucleotide that starts DNA synthesis at a target site.'), kt('Taq polymerase', 'Heat-stable DNA polymerase from Thermus aquaticus.')],
      V.pcr,
      [5],
    ),
    sec(
      '6. Bioreactors and downstream processing',
      `To produce large quantities of products, cells are grown in **bioreactors**, where large volumes (**100–1000 litres**) of culture can be processed. A bioreactor provides optimal conditions — **temperature, pH, substrate, salts, vitamins and oxygen**.

**Stirred-tank bioreactors** are usually **cylindrical** or have a **curved base** to help mixing. The **stirrer** facilitates even mixing and **oxygen availability** throughout. **Sparged-tank bioreactors** bubble **sterile air** through the medium, which increases the area for oxygen transfer. A bioreactor has an **agitator system**, an **oxygen-delivery system**, a **foam-control system**, a **temperature-control system**, a **pH-control system** and **sampling ports**.

**Downstream processing:** after the biosynthetic stage, the product undergoes **separation and purification**, then is **formulated** with suitable **preservatives**. Drugs undergo thorough **clinical trials**, and strict **quality-control** testing is required for each product.`,
      [kt('Bioreactor', 'Vessel for large-scale culture under controlled conditions.'), kt('Sparger', 'Device that bubbles sterile air into a bioreactor.'), kt('Downstream processing', 'Separation, purification and formulation of the product.')],
      V.bioreactor,
      [6],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying DNA moves to the cathode (it is negatively charged and moves to the anode).
- Writing that larger fragments travel farther in a gel (smaller ones do).
- Calling any sequence that reads the same forwards a palindrome; for DNA both strands must read the same 5′→3′.
- Saying recombinants grow on tetracycline after insertion at BamHI (they do not; tetᴿ is inactivated).
- Saying blue colonies are recombinant (white ones are).
- Forgetting that Taq polymerase is used because it is heat-stable.

**How marks are usually awarded**
- 1-mark subparts: an enzyme for lysis, the meaning of a letter in EcoRI, a vector feature, a PCR step.
- 2–3-mark questions: sticky ends; features of vectors; competent cells; insertional inactivation; PCR.
- 5-mark questions in parts: steps of recombinant DNA technology; pBR322 with selection of recombinants; PCR with amplification; bioreactors.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Two core techniques of biotechnology?', 'Genetic engineering and bioprocess engineering.', 'concept', 1),
    fc(2, 'Enzymes to lyse bacteria, plants, fungi?', 'Lysozyme, cellulase, chitinase.', 'fact', 1),
    fc(3, 'What precipitates DNA?', 'Chilled ethanol.', 'fact', 1),
    fc(4, 'Gel used for DNA separation?', 'Agarose, from seaweed.', 'fact', 1),
    fc(5, 'Direction of DNA movement in a gel?', 'Towards the anode (+).', 'fact', 1),
    fc(6, 'Stain for DNA bands?', 'Ethidium bromide; orange under UV.', 'fact', 1),
    fc(7, 'First sequence-specific restriction enzyme?', 'Hind II.', 'fact', 2),
    fc(8, 'Meaning of R in EcoRI?', 'Strain RY 13.', 'fact', 2),
    fc(9, 'EcoRI recognition sequence?', 'GAATTC.', 'fact', 2),
    fc(10, 'What are sticky ends?', 'Single-stranded overhangs after a staggered cut.', 'definition', 2),
    fc(11, 'Enzyme that joins DNA fragments?', 'DNA ligase.', 'fact', 2),
    fc(12, 'Exonuclease vs endonuclease?', 'Ends vs specific internal positions.', 'concept', 2),
    fc(13, 'Role of ori?', 'Starts replication; controls copy number.', 'concept', 3),
    fc(14, 'Why single cloning sites?', 'So the vector is cut only once.', 'concept', 3),
    fc(15, 'Resistance genes of pBR322?', 'ampᴿ and tetᴿ.', 'fact', 3),
    fc(16, 'Role of rop in pBR322?', 'Proteins for plasmid replication.', 'fact', 3),
    fc(17, 'Natural genetic engineer of plants?', 'Agrobacterium tumefaciens (Ti plasmid).', 'fact', 3),
    fc(18, 'Vectors for very large DNA?', 'BAC and YAC.', 'fact', 3),
    fc(19, 'How are bacteria made competent?', 'Calcium chloride, ice, heat shock at 42 °C, ice.', 'exam-tip', 4),
    fc(20, 'What is biolistics?', 'Gene gun: DNA-coated gold or tungsten particles.', 'definition', 4),
    fc(21, 'Method for animal cell nuclei?', 'Microinjection.', 'fact', 4),
    fc(22, 'Insertion at BamHI of pBR322 inactivates?', 'Tetracycline resistance.', 'fact', 4),
    fc(23, 'Colour of recombinant colonies?', 'White.', 'exam-tip', 4),
    fc(24, 'Gene inactivated in blue-white selection?', 'lacZ (β-galactosidase).', 'fact', 4),
    fc(25, 'Three steps of PCR?', 'Denaturation, annealing, extension.', 'fact', 5),
    fc(26, 'Source of Taq polymerase?', 'Thermus aquaticus.', 'fact', 5),
    fc(27, 'Copies after n PCR cycles?', 'Starting copies × 2ⁿ.', 'exam-tip', 5),
    fc(28, 'Typical bioreactor volume?', '100–1000 litres.', 'fact', 6),
    fc(29, 'Stirred vs sparged tank?', 'Impeller mixes vs air bubbles mix.', 'concept', 6),
    fc(30, 'Steps of downstream processing?', 'Separation, purification, formulation, testing.', 'fact', 6),
  ],
  status: 'draft',
  provenance: PROV,
};
