// ch01 Cell: notes and flashcards.
import { T, table, flow, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Cell: Notes',
  language: 'en',
  sections: [
    sec(
      '1. Discovery of the cell and the cell theory',
      r`Cells were seen only after microscopes were made. **Robert Hooke** (1665) looked at thin cork and named the box-like compartments *cells*. **Antonie van Leeuwenhoek** (1670s) saw living single cells in pond water. **Schleiden** (1838, plants) and **Schwann** (1839, animals) said that organisms are made of cells, and **Virchow** (1855) said that new cells come only from existing cells.

The **cell theory**: (1) all organisms are made of one or more cells; (2) the cell is the basic unit of structure and function; (3) all cells arise from pre-existing cells.

Cells are measured in micrometres: $1\ \text{mm} = 1000\ \mu\text{m}$. **Magnification** $= \dfrac{\text{size of drawing}}{\text{actual size}}$.`,
      [kt('Cell', 'The basic structural and functional unit of life.'), kt('Cell theory', 'All organisms are made of cells, the cell is the unit of structure and function, and cells come from cells.'), kt('Magnification', 'How many times larger the image is than the real object.')],
      [fm(r`\text{actual size} = \dfrac{\text{size of drawing}}{\text{magnification}}`, 'Actual size from a drawing')],
      V.timeline,
      [1],
    ),
    sec(
      '2. Plant cells and animal cells',
      r`Both kinds have a **cell membrane**, **cytoplasm**, a **nucleus**, mitochondria, ER and Golgi apparatus. A plant cell also has a cellulose **cell wall**, a large central **vacuole** and **plastids**. An animal cell has none of these three, and its vacuoles are small.

Plants store food as starch and animals as glycogen. The cell wall gives the plant cell a fixed shape and lets it become firm (turgid) when it takes in water.`,
      [kt('Cell wall', 'A rigid outer layer of cellulose around plant cells, outside the cell membrane.'), kt('Vacuole', 'A fluid-filled sac that stores water, food or wastes.'), kt('Cytoplasm', 'The jelly-like fluid between the nucleus and the cell membrane that holds the organelles.')],
      [],
      V.plantAnimal,
      [1],
      [V.plant, V.animal],
    ),
    sec(
      '3. Prokaryotic and eukaryotic cells',
      r`In a **prokaryotic cell** the DNA lies in the **nucleoid**, not enclosed by a nuclear membrane, and there are no membrane-bound organelles. Bacteria and cyanobacteria are prokaryotes. They are usually about 1 to 5 micrometres long.

A **eukaryotic cell** has a true nucleus with a nuclear membrane and organelles with membranes. *Amoeba*, yeast, plants, animals and fungi are eukaryotes, and their cells are usually 10 to 100 micrometres across.`,
      [kt('Prokaryote', 'An organism whose cells have no true nucleus and no membrane-bound organelles.'), kt('Eukaryote', 'An organism whose cells have a true nucleus and membrane-bound organelles.'), kt('Nucleoid', 'The region of a prokaryotic cell where the DNA lies.')],
      [],
      V.proEukTable,
      [2],
      [V.proEuk],
    ),
    sec(
      '4. Cell organelles and their functions',
      r`- **Nucleus:** double membrane with pores; holds DNA in chromosomes; controls the cell; has a nucleolus.
- **Mitochondria:** double membrane, inner folds; release energy from food in respiration (powerhouses).
- **Endoplasmic reticulum:** network of membranes. *Rough* ER has ribosomes and makes proteins; *smooth* ER makes lipids and helps remove harmful substances.
- **Golgi apparatus:** stacked sacs that modify, pack and dispatch products in vesicles.
- **Lysosomes:** sacs of digestive enzymes; break down worn-out parts and germs.
- **Vacuoles:** store water, food and wastes; the large plant vacuole keeps the cell firm.
- **Plastids:** chloroplasts (green, photosynthesis), chromoplasts (colours), leucoplasts (store starch, oil, protein).
- **Cell wall:** cellulose, in plants; shape and protection, fully permeable.`,
      [kt('Nucleus', 'The organelle that holds the DNA and controls the activities of the cell.'), kt('Mitochondrion', 'The organelle that releases energy from food during respiration.'), kt('Lysosome', 'A small sac of digestive enzymes.'), kt('Chloroplast', 'A green plastid containing chlorophyll, where photosynthesis takes place.')],
      [],
      table(['Organelle', 'Job'], [['Nucleus', 'Controls the cell'], ['Mitochondrion', 'Releases energy'], ['Rough ER', 'Makes proteins'], ['Smooth ER', 'Makes lipids; removes harmful substances'], ['Golgi apparatus', 'Modifies and packs products'], ['Lysosome', 'Digests waste and germs'], ['Chloroplast', 'Photosynthesis']], 'Table of seven organelles and their jobs'),
      [3],
    ),
    sec(
      '5. Permeability, diffusion and osmosis',
      r`The plasma membrane is **selectively permeable**. **Diffusion** is the net movement of particles from higher to lower concentration. **Osmosis** is the net movement of water through a selectively permeable membrane towards the region of more dissolved substance.

Activities: a shell-less egg swells in pure water and shrinks in strong sugar solution; dry raisins swell in water; in a potato osmometer the level rises as water enters the sugar solution in the cavity.

In a **hypotonic** solution a cell gains water (**endosmosis**) and a plant cell becomes turgid. In a **hypertonic** solution it loses water (**exosmosis**), and a plant cell shows **plasmolysis**. In an **isotonic** solution there is no net movement.`,
      [kt('Selectively permeable', 'Allowing some substances to pass and not others.'), kt('Diffusion', 'Net movement of particles from higher to lower concentration.'), kt('Osmosis', 'Net movement of water through a selectively permeable membrane towards the stronger solution.'), kt('Plasmolysis', 'Shrinking of the protoplast of a plant cell away from the cell wall in a hypertonic solution.')],
      [fm(r`\text{percentage change} = \dfrac{\text{final} - \text{initial}}{\text{initial}} \times 100`, 'Change in mass of a potato strip')],
      V.osmosis,
      [4],
      [V.plasmolysis],
    ),
    sec(
      '6. Cell division and recent advances',
      r`**Mitosis** gives two identical cells with the same chromosome number: growth, repair and replacement. Stages: prophase, metaphase, anaphase, telophase, then the cytoplasm divides. **Meiosis** happens in reproductive organs: two divisions give four **gametes** with half the chromosome number; fertilisation restores it. A cell with $2n$ chromosomes gives gametes with $n = 2n \div 2$.

Recent advances (textbook level): **stem cells** can divide and become specialised cells, and bone marrow transplants are an established use, while many other uses are still being researched. **Fluorescence microscopes** light up chosen parts of a cell with dyes. **Electron microscopes** show structures too small for light microscopes. **Cell culture** grows cells in a dish for testing medicines.`,
      [kt('Mitosis', 'Division that gives two identical cells with the same chromosome number.'), kt('Meiosis', 'Division in reproductive organs that gives four cells with half the chromosome number.'), kt('Gamete', 'A sex cell, such as a sperm or an egg, with half the chromosome number.'), kt('Stem cell', 'An unspecialised cell that can divide and become specialised.')],
      [fm(r`n = \dfrac{2n}{2}`, 'Chromosomes in a gamete'), fm(r`\text{cells after } k \text{ mitoses} = 2^{k}`, 'Cells after k rounds of mitosis')],
      table(['Feature', 'Mitosis', 'Meiosis'], [['Divisions', 'One', 'Two'], ['Cells formed', 'Two', 'Four'], ['Chromosomes', 'Same as parent', 'Half of parent'], ['Purpose', 'Growth, repair', 'Gametes']], 'Table comparing mitosis and meiosis'),
      [5],
      [V.mitMei],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing that bacteria have "no nucleus" instead of "no true nucleus; DNA lies in the nucleoid".
- Saying that solute moves in osmosis; it is water that moves.
- Mixing endosmosis (water enters) with exosmosis (water leaves).
- Forgetting that meiosis gives four cells and halves the chromosome number.
- Labels in diagrams that do not touch the part they name.

**How marks are usually awarded**
- 1-mark items: a definition, a name or one function.
- 2-mark items: two differences or two reasons, one mark each.
- 3-mark items: a short description with an example.
- 5-mark items: a labelled diagram (about 2 marks) and a clear explanation.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Who first saw and named cells, and in which material?', 'Robert Hooke, in 1665, in thin slices of cork.', 'fact', 1),
    fc(2, 'What did Leeuwenhoek see that Hooke could not?', 'Living single cells, such as bacteria and pond organisms.', 'fact', 1),
    fc(3, 'State the three ideas of the cell theory.', 'All organisms are made of cells; the cell is the unit of structure and function; all cells come from pre-existing cells.', 'definition', 1),
    fc(4, 'Who added that new cells arise from existing cells?', 'Rudolf Virchow, in 1855.', 'fact', 1),
    fc(5, 'How many micrometres in one millimetre?', '1000.', 'fact', 1),
    fc(6, 'Formula to find actual size from a drawing?', r`$\text{actual size} = \text{size of drawing} \div \text{magnification}$`, 'formula', 1),
    fc(7, 'Three features found in plant cells but not in animal cells?', 'Cell wall, large central vacuole and plastids (chloroplasts).', 'concept', 1),
    fc(8, 'What is the plant cell wall made of?', 'Cellulose.', 'fact', 1),
    fc(9, 'How is food stored in plant cells and in animal cells?', 'Starch in plant cells; glycogen in animal cells.', 'fact', 1),
    fc(10, 'What is a prokaryotic cell?', 'A cell with no true nucleus and no membrane-bound organelles; its DNA lies in the nucleoid.', 'definition', 2),
    fc(11, 'Give two examples each of prokaryotes and eukaryotes.', 'Prokaryotes: bacteria, cyanobacteria. Eukaryotes: Amoeba, yeast, plants, animals.', 'example', 2),
    fc(12, 'Usual size of a bacterium compared with an animal cell?', 'Bacterium about 1 to 5 micrometres; animal cell about 10 to 100.', 'fact', 2),
    fc(13, 'What does the nucleus do?', 'Holds the DNA and controls the activities of the cell.', 'concept', 3),
    fc(14, 'Why are mitochondria called powerhouses of the cell?', 'They release energy from food during respiration.', 'concept', 3),
    fc(15, 'Rough ER versus smooth ER?', 'Rough ER has ribosomes and makes proteins; smooth ER makes lipids and helps remove harmful substances.', 'concept', 3),
    fc(16, 'What does the Golgi apparatus do?', 'Modifies, packs and dispatches products in vesicles.', 'concept', 3),
    fc(17, 'What is held inside a lysosome?', 'Digestive enzymes, which break down worn-out parts and germs.', 'concept', 3),
    fc(18, 'Why does a plant cell have a large vacuole?', 'It stores water and cell sap and keeps the cell firm.', 'concept', 3),
    fc(19, 'Name the three kinds of plastid and their jobs.', 'Chloroplast (photosynthesis), chromoplast (colour), leucoplast (stores starch, oil or protein).', 'concept', 3),
    fc(20, 'What does selectively permeable mean?', 'It lets some substances pass and not others.', 'definition', 4),
    fc(21, 'Define diffusion.', 'Net movement of particles from a region of higher concentration to lower concentration.', 'definition', 4),
    fc(22, 'Define osmosis.', 'Net movement of water through a selectively permeable membrane towards the stronger solution.', 'definition', 4),
    fc(23, 'What happens to a shell-less egg in pure water, and why?', 'It swells, because water enters by osmosis.', 'example', 4),
    fc(24, 'Endosmosis versus exosmosis?', 'Endosmosis: water enters the cell. Exosmosis: water leaves the cell.', 'concept', 4),
    fc(25, 'What is plasmolysis?', 'Shrinking of the protoplast away from the cell wall when a plant cell loses water in a hypertonic solution.', 'definition', 4),
    fc(26, 'Which solution makes a plant cell turgid?', 'A hypotonic (weaker) solution.', 'concept', 4),
    fc(27, 'What does mitosis produce, and what is it for?', 'Two identical cells; growth, repair and replacement.', 'concept', 5),
    fc(28, 'What does meiosis produce, and what is it for?', 'Four cells with half the chromosomes; gametes.', 'concept', 5),
    fc(29, 'An organism has 24 chromosomes in a body cell. How many in a gamete?', '12 (halved by meiosis).', 'example', 5),
    fc(30, 'Name two recent advances in cell biology.', 'Stem cell research and electron or fluorescence microscopy.', 'fact', 5),
    fc(31, 'Exam tip: what do you write for osmosis?', 'Water moves through a selectively permeable membrane towards the stronger solution.', 'exam-tip', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
