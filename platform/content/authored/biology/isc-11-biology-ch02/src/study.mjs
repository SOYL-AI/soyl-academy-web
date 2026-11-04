// ISC 11 Biology ch02 notes (one section per syllabus topic) and 30 flashcards.
import { T, table, unit, PROV } from '../../isc-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { DOM, KING, YEAR, SIZE, GROWTH_ROWS, growth } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Biological Classification: Domains, Kingdoms and Monera — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Three domains and five kingdoms',
      `**Three domains.** In ${YEAR.woese} **Carl Woese** and his colleagues proposed that living organisms be placed in three domains, mainly on the evidence of **ribosomal RNA** sequences. **Archaea** and **Bacteria** are both **prokaryotic** (no nuclear membrane, no membrane-bound organelles), but they differ in cell wall and membrane lipids: bacterial walls contain **peptidoglycan**, archaeal walls do **not** (some have pseudomurein or protein), and archaeal membrane lipids are **ether-linked** and branched. **Eukarya** have a true nucleus and membrane-bound organelles and include the kingdoms Protista, Fungi, Plantae and Animalia. On the ribosomal RNA tree, Archaea share a more recent ancestor with Eukarya than with Bacteria.

**Five kingdoms.** In 1969 **R. H. Whittaker** proposed five kingdoms, using **cell type** (prokaryotic or eukaryotic), **body organisation** (unicellular, multicellular), **mode of nutrition** (autotrophic, absorptive or ingestive) and also reproduction and phylogenetic relationships. Kingdom **Monera** (prokaryotes) is divided between the domains Bacteria and Archaea; the other four kingdoms make up Eukarya.

| Kingdom | Cell type | Body | Cell wall | Nutrition |
|---|---|---|---|---|
${KING.map((x) => `| ${x.k} | ${x.cell} | ${x.body} | ${x.wall} | ${x.food} |`).join('\n')}

Only **Fungi** and **Animalia** are entirely heterotrophic; Monera, Protista and Plantae include autotrophs.`,
      [
        kt('Domain', 'The highest category of classification in Woese’s system: Archaea, Bacteria or Eukarya.'),
        kt('Prokaryote', 'An organism whose cells have no nuclear membrane and no membrane-bound organelles.'),
        kt('Peptidoglycan', 'The rigid polymer of sugars and amino acids in the walls of bacteria, absent from archaea.'),
        kt('Autotroph and heterotroph', 'An organism that makes its own food, and one that depends on ready-made food.'),
      ],
      table(['Domain', 'Cell type', 'Cell wall', 'Membrane lipids'], DOM.map((x) => [x.d, x.cell, x.wall, x.lipid]), 'Table of three domains'),
      [1],
      [V.domains],
    ),
    sec(
      '2. Bacteria: structure, classification and Gram staining',
      `**Structure of a typical bacterial cell.** Size is about 1 to 5 micrometres. From outside inwards: a **capsule** (or slime layer) of polysaccharide; the **cell wall** of **peptidoglycan**; the **plasma membrane**, which may fold inwards as a **mesosome** (many modern workers regard mesosomes as artefacts of preparation); and the **cytoplasm** with **70S ribosomes**, storage granules, a **nucleoid** (a single, circular, naked DNA molecule without a nuclear membrane) and small circular **plasmids** that can carry genes such as antibiotic resistance. **Flagella** give movement and **pili (fimbriae)** help in attachment, with sex pili used in the transfer of DNA.

**Classification by shape:** **coccus** (spherical; diplococcus in pairs, streptococcus in chains, staphylococcus in grape-like clusters), **bacillus** (rod), **vibrio** (comma) and **spirillum** (spiral).

**By nutrition:** **photoautotrophs** (cyanobacteria, purple sulphur bacteria), **chemoautotrophs** (nitrifying and sulphur bacteria) and **heterotrophs** (saprophytes and parasites). **By respiration:** **obligate aerobes** need oxygen; **obligate anaerobes** (Clostridium) are killed by it; **facultative anaerobes** (Escherichia coli) live with or without oxygen.

**Gram staining** (Hans Christian Gram, ${YEAR.gram}): smear stained with **crystal violet**, then **iodine**, then washed with **alcohol**, then counterstained with **safranin**. **Gram-positive** bacteria have a **thick peptidoglycan layer**, keep the crystal violet and appear **purple** (Staphylococcus, Bacillus). **Gram-negative** bacteria have a **thin peptidoglycan layer inside an outer membrane** with lipopolysaccharide, lose the crystal violet and appear **pink** (Escherichia coli, Vibrio cholerae).`,
      [
        kt('Nucleoid', 'The region of a bacterial cell holding its circular DNA, with no nuclear membrane.'),
        kt('Plasmid', 'A small circular DNA molecule outside the nucleoid that can carry genes such as antibiotic resistance.'),
        kt('Gram-positive bacteria', 'Bacteria with a thick peptidoglycan wall that retain the crystal violet stain and look purple.'),
        kt('Gram-negative bacteria', 'Bacteria with a thin peptidoglycan layer and an outer membrane that lose crystal violet and look pink.'),
      ],
      V.bact,
      [2],
      [V.shapes, V.gram, table(['Basis', 'Group', 'Example'], [['Nutrition', 'Photoautotroph', 'Cyanobacteria'], ['Nutrition', 'Chemoautotroph', 'Nitrifying bacteria'], ['Nutrition', 'Heterotroph', 'Saprophytes and parasites'], ['Respiration', 'Obligate aerobe', 'Mycobacterium'], ['Respiration', 'Obligate anaerobe', 'Clostridium'], ['Respiration', 'Facultative anaerobe', 'Escherichia coli']], 'Table of bacteria by nutrition and respiration')],
    ),
    sec(
      '3. Reproduction in bacteria (definitions), archaebacteria and Mycoplasma',
      `**Reproduction and gene transfer** (definitions only):
- **Fission:** a bacterial cell divides into two identical daughter cells, the usual way of increasing in number. A culture of 500 cells with a generation time of 40 minutes reaches ${growth(500, 40, 240)} in four hours (six doublings: ${GROWTH_ROWS.map(([, n]) => n).join(', ')}).
- **Conjugation:** transfer of DNA from one bacterium to another through direct contact.
- **Transduction:** transfer of bacterial DNA from one bacterium to another by a bacteriophage.
- **Transformation:** uptake of naked DNA from the surroundings by a bacterium.

**Archaebacteria** have no peptidoglycan in their walls and live mostly in extreme habitats:
- **Methanogens:** strict anaerobes of marshes, rice-field mud and the gut of ruminants; they produce **methane** (biogas).
- **Halophiles:** live in very salty places such as salt lakes and salt pans.
- **Thermoacidophiles:** live in hot, acidic springs.

**Mycoplasma** (also **PPLO**, pleuropneumonia-like organisms) have **no cell wall**, are the **smallest living cells** (about ${SIZE.mycoplasma} micrometre across) and can **survive without oxygen**; their shape varies and they cause diseases in plants and animals. Because they lack a wall, antibiotics that block wall synthesis, such as penicillin, do not harm them.`,
      [
        kt('Fission', 'Division of a bacterial cell into two identical daughter cells.'),
        kt('Conjugation', 'Transfer of DNA between bacteria through direct contact.'),
        kt('Transduction', 'Transfer of bacterial DNA from one bacterium to another by a bacteriophage.'),
        kt('Transformation', 'Uptake of naked DNA from the surroundings by a bacterium.'),
        kt('PPLO', 'Pleuropneumonia-like organisms, another name for Mycoplasma.'),
      ],
      table(['Group', 'Habitat', 'Feature'], [['Methanogens', 'Marshes, rice-field mud, gut of ruminants', 'Strict anaerobes producing methane'], ['Halophiles', 'Very salty lakes and salt pans', 'Need high salt'], ['Thermoacidophiles', 'Hot acidic springs', 'Tolerate heat and acid']], 'Table of the three groups of archaebacteria'),
      [3],
      [table(['Term', 'Meaning'], [['Fission', 'Cell divides into two identical cells'], ['Conjugation', 'DNA transfer by direct contact'], ['Transduction', 'DNA transfer by a bacteriophage'], ['Transformation', 'Uptake of naked DNA']], 'Table of four terms of bacterial reproduction and gene transfer')],
    ),
    sec(
      '4. Economic importance of bacteria',
      `- **Sewage treatment:** in the secondary stage, **aerobic bacteria** in flocs called **activated sludge** oxidise organic matter and reduce its oxygen demand. The settled sludge is then digested by **anaerobic bacteria**, including **methanogens**, in a digester, releasing biogas.
- **Energy production (biogas):** in a closed digester without oxygen, **methanogens** produce **methane** from cattle dung and other wastes; the gas is used as fuel and the leftover slurry as manure. (The yield of 0.04 cubic metre per kilogram used in the worked example is an illustrative figure.)
- **Antibiotics:** the soil bacterium *Streptomyces* produces **streptomycin** and other antibiotics.
- **Curd:** **Lactobacillus** converts the milk sugar lactose to **lactic acid**, which curdles the milk protein.
- **Cheese:** bacteria such as Lactobacillus and Streptococcus set and ripen cheese; **Propionibacterium shermanii** gives off carbon dioxide that forms the **large holes of Swiss cheese**.`,
      [
        kt('Activated sludge', 'Flocs of aerobic bacteria and other microbes that oxidise organic matter in sewage.'),
        kt('Biogas', 'A fuel gas rich in methane produced by methanogens from dung and other organic wastes.'),
        kt('Antibiotic', 'A chemical made by a microbe that kills or checks other microbes, such as streptomycin from Streptomyces.'),
      ],
      table(['Use', 'Bacterium', 'Role'], [['Sewage treatment', 'Aerobic bacteria; anaerobic digesters', 'Oxidise and digest organic matter'], ['Biogas', 'Methanogens', 'Make methane from dung'], ['Antibiotics', 'Streptomyces', 'Produce streptomycin'], ['Curd', 'Lactobacillus', 'Lactose to lactic acid'], ['Swiss cheese', 'Propionibacterium shermanii', 'Carbon dioxide forms holes']], 'Table of five uses of bacteria'),
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying that archaebacteria have peptidoglycan; they do not.
- Writing that the bacterial nucleoid has a nuclear membrane.
- Mixing up Gram-positive (thick wall, purple) with Gram-negative (thin wall, outer membrane, pink).
- Describing the stages of conjugation, transduction or transformation; only **definitions** are needed.
- Giving only two features of Mycoplasma when three are asked (no wall, smallest cells, survive without oxygen).
- Forgetting the organism: Lactobacillus (curd), Streptomyces (antibiotic), Propionibacterium (cheese holes).

**How marks are usually awarded**
- 1-mark subparts: a scientist, a term, a habitat, an organism, a count or a calculation, a give-a-reason.
- 2–3-mark questions: domains compared; kingdoms tabulated; Gram-positive against Gram-negative; extreme habitats; uses of bacteria.
- 5-mark questions in parts: five kingdoms in a table; a labelled bacterial cell with classification and Gram staining; domains, archaebacteria and Mycoplasma; economic importance.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Who proposed the three-domain system, and when?', `Carl Woese and colleagues, ${YEAR.woese}.`, 'fact', 1),
    fc(2, 'Name the three domains.', 'Archaea, Bacteria, Eukarya.', 'fact', 1),
    fc(3, 'Which domains are prokaryotic?', 'Archaea and Bacteria.', 'fact', 1),
    fc(4, 'Main difference between archaeal and bacterial cell walls?', 'Bacteria have peptidoglycan; archaea do not.', 'concept', 1),
    fc(5, 'Who proposed five kingdoms, and when?', `R. H. Whittaker, ${YEAR.whittaker}.`, 'fact', 1),
    fc(6, 'Name the five kingdoms.', 'Monera, Protista, Fungi, Plantae, Animalia.', 'fact', 1),
    fc(7, 'Criteria used by Whittaker?', 'Cell type, body organisation, mode of nutrition (also reproduction and phylogeny).', 'concept', 1),
    fc(8, 'Wholly heterotrophic kingdoms?', 'Fungi and Animalia.', 'fact', 1),
    fc(9, 'Cell wall of fungi and of plants?', 'Chitin; cellulose.', 'fact', 1),
    fc(10, 'Parts of a bacterial cell from outside in?', 'Capsule, cell wall, plasma membrane, cytoplasm with nucleoid, plasmids, ribosomes.', 'concept', 2),
    fc(11, 'What is the nucleoid?', 'Region with the circular DNA; no nuclear membrane.', 'definition', 2),
    fc(12, 'What is a plasmid?', 'Small circular DNA; may carry antibiotic-resistance genes.', 'definition', 2),
    fc(13, 'Functions of pili and flagella?', 'Pili: attachment; flagella: movement.', 'concept', 2),
    fc(14, 'Four bacterial shapes?', 'Coccus, bacillus, vibrio, spirillum.', 'fact', 2),
    fc(15, 'Cocci in chains, in clusters?', 'Streptococcus; staphylococcus.', 'fact', 2),
    fc(16, 'Photoautotroph and chemoautotroph examples?', 'Cyanobacteria; nitrifying bacteria.', 'fact', 2),
    fc(17, 'Obligate anaerobe example?', 'Clostridium (killed by oxygen).', 'fact', 2),
    fc(18, 'Facultative anaerobe example?', 'Escherichia coli.', 'fact', 2),
    fc(19, 'Order of the Gram staining steps?', 'Crystal violet, iodine, alcohol wash, safranin.', 'formula', 2),
    fc(20, 'Gram-positive wall and colour?', 'Thick peptidoglycan; purple.', 'concept', 2),
    fc(21, 'Gram-negative wall and colour?', 'Thin peptidoglycan with outer membrane; pink.', 'concept', 2),
    fc(22, 'Define fission.', 'A bacterial cell divides into two identical cells.', 'definition', 3),
    fc(23, 'Define conjugation.', 'Transfer of DNA between bacteria through direct contact.', 'definition', 3),
    fc(24, 'Define transduction.', 'DNA transfer between bacteria by a bacteriophage.', 'definition', 3),
    fc(25, 'Define transformation.', 'Uptake of naked DNA from the surroundings.', 'definition', 3),
    fc(26, 'Three groups of archaebacteria and habitats?', 'Methanogens (marsh, gut), halophiles (salty lakes), thermoacidophiles (hot acid springs).', 'fact', 3),
    fc(27, 'Three features of Mycoplasma?', 'No cell wall; smallest living cells; survive without oxygen (PPLO).', 'concept', 3),
    fc(28, 'Bacteria in sewage treatment?', 'Aerobic bacteria in activated sludge; anaerobic digestion with methanogens.', 'concept', 4),
    fc(29, 'Source of biogas and the gas?', 'Methanogens from dung; methane.', 'fact', 4),
    fc(30, 'Bacteria for antibiotic, curd and Swiss cheese holes?', 'Streptomyces; Lactobacillus; Propionibacterium shermanii.', 'fact', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
void SIZE;
