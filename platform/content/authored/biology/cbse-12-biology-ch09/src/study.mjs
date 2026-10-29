// ch09 notes and flashcards.
import { T, table, flow, unit, PROV } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Biotechnology: Principles and Processes — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Principles of biotechnology',
      `**Biotechnology** (European Federation of Biotechnology): the integration of natural science and organisms, cells, parts thereof and molecular analogues for products and services. Two core techniques:
- **Genetic engineering:** altering the chemistry of genetic material (DNA/RNA) and introducing it into host organisms to change their phenotype.
- **Bioprocess engineering:** maintaining a sterile (microbial-contamination-free) ambience in chemical engineering processes so that only the desired microbe or eukaryotic cell grows, in large quantities.

Traditional hybridisation may carry undesirable genes along with desired ones; genetic engineering transfers only the desired genes.

**First recombinant DNA (1972):** **Stanley Cohen and Herbert Boyer** linked an antibiotic-resistance gene to a native plasmid of *Salmonella typhimurium* and transferred it into *E. coli*. A piece of DNA can multiply only when linked to an **origin of replication (ori)**.

**Three basic steps:** (1) identify DNA with desirable genes; (2) introduce it into the host; (3) maintain it in the host and transfer it to progeny.`,
      [kt('Genetic engineering', 'Techniques to alter the chemistry of genetic material and introduce it into host organisms.'), kt('Plasmid', 'Small, circular, autonomously replicating DNA outside the chromosome in bacteria.'), kt('Origin of replication', 'DNA sequence where replication begins; it also controls copy number.')],
      flow('LR', [['i', 'Identify desirable gene'], ['t', 'Introduce into host'], ['m', 'Maintain and pass to progeny']], [['i', 't'], ['t', 'm']], 'Flow of the three basic steps of genetic modification'),
      [1],
    ),
    sec(
      '2. Restriction enzymes and gel electrophoresis',
      `In **1963**, two enzymes restricting bacteriophage growth in *E. coli* were isolated: one added methyl groups to DNA, the other cut it (**restriction endonuclease**). The first, **Hind II**, recognised a specific **six-base-pair** sequence (**recognition sequence**). More than **900** restriction enzymes from over **230** bacterial strains are now known.

**Naming (EcoRI):** E — genus *Escherichia*; co — species *coli*; R — strain RY 13; I — order of isolation. Restriction enzymes belong to **nucleases**: **exonucleases** remove nucleotides from the ends; **endonucleases** cut at specific positions within the DNA.

**Palindromic sequences:** each restriction endonuclease recognises a sequence that reads the same 5′→3′ on both strands, e.g. 5′-GAATTC-3′ / 3′-CTTAAG-5′. EcoRI cuts between G and A on each strand, a little away from the centre, leaving single-stranded overhangs (**sticky ends**) that form hydrogen bonds with complementary ends; **DNA ligase** joins them. Cutting the vector and source DNA with the **same enzyme** gives matching sticky ends.

**Agarose gel electrophoresis:** agarose (from seaweed) acts as a sieve; negatively charged DNA moves towards the **anode**; **smaller fragments move farther**; DNA stained with **ethidium bromide** shows orange bands under **UV**; bands are cut out and the DNA extracted (**elution**).`,
      [kt('Restriction endonuclease', 'An enzyme that cuts DNA at a specific recognition sequence.'), kt('Palindrome (DNA)', 'A sequence that reads the same 5′→3′ on both strands.'), kt('Sticky ends', 'Single-stranded overhangs left after a staggered cut, able to pair with complementary ends.'), kt('Elution', 'Extraction of separated DNA from a band cut out of a gel.')],
      V.ecori,
      [1],
      [V.gel],
    ),
    sec(
      '3. Cloning vectors and competent hosts',
      `**Vector features:**
- **Origin of replication (ori):** starts replication; controls the copy number of linked DNA.
- **Selectable marker:** identifies transformants and eliminates non-transformants — genes for resistance to **ampicillin, chloramphenicol, tetracycline or kanamycin**.
- **Cloning sites:** very few, preferably single, recognition sites for commonly used restriction enzymes.
- **Small size.**

**pBR322:** ori, rop, **ampR** and **tetR**; BamHI and SalI sites lie in tetR; PvuI and PstI in ampR. **Insertional inactivation:** an insert in tetR (e.g. at BamHI) makes recombinants **ampicillin-resistant but tetracycline-sensitive**. Alternative: insertion into the **β-galactosidase** gene; with a chromogenic substrate, non-recombinants give **blue** colonies and recombinants **white**.

**Plant and animal vectors:** ***Agrobacterium tumefaciens*** delivers T-DNA into plant cells; its **Ti plasmid** is **disarmed** for use as a vector. **Retroviruses** are disarmed to deliver genes into animal cells.

**Competent hosts:** DNA is hydrophilic and cannot cross membranes. Bacteria are treated with a **divalent cation (calcium)**, incubated on ice with DNA, given a **heat shock (42 °C)** and returned to ice. Other methods: **micro-injection** (into animal cell nucleus), **biolistics / gene gun** (plant cells bombarded with gold or tungsten particles coated with DNA), **disarmed pathogen** vectors.`,
      [kt('Selectable marker', 'A gene, usually for antibiotic resistance, that helps identify transformed cells.'), kt('Insertional inactivation', 'Loss of a marker gene’s function when foreign DNA is inserted into it, used to identify recombinants.'), kt('Biolistics', 'Delivery of DNA into cells by bombarding them with DNA-coated microparticles (gene gun).')],
      V.pbr,
      [1],
    ),
    sec(
      '4. Processes of recombinant DNA technology',
      `1. **Isolation of DNA:** break cells with **lysozyme** (bacteria), **cellulase** (plants) or **chitinase** (fungi); remove RNA with **ribonuclease** and proteins with **protease**; precipitate DNA with **chilled ethanol** (fine threads, spooling).
2. **Cutting:** restriction enzyme; progress checked by agarose gel electrophoresis; vector cut with the same enzyme.
3. **Amplification by PCR:** **denaturation** (high temperature separates strands), **annealing** (two primers bind), **extension** by thermostable **Taq polymerase** from ***Thermus aquaticus***; copies = 2ⁿ after n cycles (about a billion after 30 cycles).
4. **Ligation:** gene joined to vector by **DNA ligase** → recombinant DNA.
5. **Transformation and selection:** recombinant DNA introduced into competent cells; cells grown on antibiotic medium so only transformants survive.
6. **Obtaining the product:** expressed gene gives a **recombinant protein**; large-scale growth in **continuous culture** (cells kept in log phase) in **bioreactors** (100–1000 L) providing optimal temperature, pH, substrate, salts, vitamins and oxygen. **Stirred-tank** bioreactor: curved-base cylinder; stirrer for mixing and oxygen availability; sterile air through a sparger; agitator, oxygen delivery, foam control, temperature and pH control, sampling ports.
7. **Downstream processing:** separation, purification, formulation with preservatives, clinical trials (drugs), strict quality control.`,
      [kt('PCR', 'Polymerase chain reaction: amplification of a DNA segment in vitro by repeated cycles of denaturation, annealing and extension.'), kt('Bioreactor', 'A large vessel in which cells convert raw materials into products under optimal conditions.'), kt('Downstream processing', 'Separation, purification and formulation of a biotechnological product before marketing.')],
      V.pcr,
      [2],
      [V.bioreactor],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Mixing up the parts of the name EcoRI (R is the strain RY 13).
- Saying DNA moves to the cathode, or that larger fragments move farther.
- Saying an insert at BamHI destroys ampicillin resistance (it inactivates tetR).
- Giving the wrong cell-wall enzyme (lysozyme–bacteria, cellulase–plants, chitinase–fungi).
- Forgetting why Taq polymerase is used (it is thermostable).
- Leaving out downstream processing stages.

**How marks are usually awarded**
- 1-mark items: term, enzyme, organism, copy number.
- 2–3-mark answers: tool + function + example; steps in correct order.
- 5-mark answers: full sequence of rDNA technology, or vectors with pBR322 and selection, or PCR with a diagram.
- Case-based items: gel results, PCR numbers or selection plates, with a 2-mark part with an internal choice.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Two core techniques of modern biotechnology?', 'Genetic engineering and bioprocess engineering.', 'concept', 1),
    fc(2, 'Who made the first recombinant DNA, and when?', 'Stanley Cohen and Herbert Boyer, 1972.', 'fact', 1),
    fc(3, 'Why must foreign DNA be linked to an ori?', 'Only DNA linked to an origin of replication can multiply in the host.', 'concept', 1),
    fc(4, 'What does each part of EcoRI mean?', 'E: Escherichia; co: coli; R: strain RY 13; I: first enzyme isolated.', 'fact', 1),
    fc(5, 'Exonuclease vs endonuclease?', 'Removes nucleotides from ends vs cuts within DNA at specific positions.', 'definition', 1),
    fc(6, 'What is a DNA palindrome?', 'A sequence reading the same 5′→3′ on both strands, e.g. GAATTC.', 'definition', 1),
    fc(7, 'What are sticky ends?', 'Single-stranded overhangs from a staggered cut that pair with complementary ends.', 'definition', 1),
    fc(8, 'Why cut vector and gene with the same enzyme?', 'To produce matching sticky ends that can be joined.', 'concept', 1),
    fc(9, 'Enzyme that joins DNA fragments?', 'DNA ligase.', 'fact', 1),
    fc(10, 'Gel electrophoresis: direction and sizes?', 'DNA moves to the anode; smaller fragments move farther.', 'concept', 1),
    fc(11, 'How is DNA seen in a gel?', 'Stained with ethidium bromide; orange bands under UV.', 'fact', 1),
    fc(12, 'What is elution?', 'Extracting DNA from a gel band that has been cut out.', 'definition', 1),
    fc(13, 'Four features of a cloning vector?', 'Ori, selectable marker, single cloning sites, small size.', 'concept', 1),
    fc(14, 'Antibiotic-resistance genes of pBR322?', 'ampR and tetR.', 'fact', 1),
    fc(15, 'Insert at BamHI in pBR322: result?', 'tetR inactivated: ampicillin-resistant, tetracycline-sensitive recombinants.', 'exam-tip', 1),
    fc(16, 'Blue-white selection?', 'Insert inactivates β-galactosidase; recombinants white, non-recombinants blue.', 'concept', 1),
    fc(17, 'Natural genetic engineer of plants?', 'Agrobacterium tumefaciens (Ti plasmid, disarmed as a vector).', 'fact', 1),
    fc(18, 'Making bacteria competent?', 'Calcium treatment, ice, heat shock at 42 °C, ice.', 'concept', 1),
    fc(19, 'Micro-injection and biolistics?', 'DNA injected into an animal cell nucleus; DNA-coated particles shot into plant cells.', 'definition', 1),
    fc(20, 'Enzymes to break cell walls?', 'Lysozyme (bacteria), cellulase (plants), chitinase (fungi).', 'fact', 2),
    fc(21, 'How is DNA precipitated?', 'With chilled ethanol; it appears as fine threads.', 'fact', 2),
    fc(22, 'Three steps of PCR?', 'Denaturation, annealing, extension.', 'concept', 2),
    fc(23, 'Why Taq polymerase?', 'It is thermostable (from Thermus aquaticus).', 'fact', 2),
    fc(24, 'Copies after n PCR cycles?', '2ⁿ (about a billion after 30).', 'formula', 2),
    fc(25, 'Why continuous culture?', 'Keeps cells in the log phase for more biomass and product.', 'concept', 2),
    fc(26, 'Typical bioreactor size?', '100–1000 litres.', 'fact', 2),
    fc(27, 'Role of the stirrer in a bioreactor?', 'Mixing and even oxygen availability.', 'concept', 2),
    fc(28, 'Stages of downstream processing?', 'Separation, purification, formulation, clinical trials, quality control.', 'concept', 2),
    fc(29, 'Order of rDNA steps?', 'Isolate → cut → amplify → ligate → transform → grow → downstream processing.', 'exam-tip', 2),
    fc(30, 'What does selection on antibiotic medium achieve?', 'Only transformed cells survive.', 'concept', 2),
  ],
  status: 'draft',
  provenance: PROV,
};
