// ICSE 9 Biology ch01 notes and flashcards.
import { T, table, unit, PROV } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'The Cell: A Unit of Life — Notes',
  language: 'en',
  sections: [
    sec(
      '1. The cell as the unit of life; cell theory; protoplasm and cytoplasm',
      `A **cell** is the smallest unit of structure and function of a living organism. Organisms may be **unicellular** (Amoeba, bacteria) or **multicellular** (a banyan tree, a human). In a multicellular body cells form tissues, tissues form organs, and organs form organ systems.

**Cell theory** (Schleiden and Schwann, extended by Virchow):
1. All living organisms are made of one or more cells.
2. The cell is the basic **unit of structure and function**.
3. New cells arise only from **pre-existing cells** by division.

**Protoplasm** is the entire living content of a cell: the **cytoplasm** and the **nucleus** (nucleoplasm) together. The **cytoplasm** is the jelly-like part between the cell membrane and the nucleus; it holds the organelles. (Some books use "protoplasm" and "cytoplasm" loosely; here the ICSE distinction is used.)`,
      [kt('Cell', 'The smallest unit of structure and function of a living organism.'), kt('Protoplasm', 'All the living matter of a cell: cytoplasm and nucleus.'), kt('Cytoplasm', 'The protoplasm outside the nucleus, inside the cell membrane.')],
      table(['Term', 'Meaning'], [['Protoplasm', 'Cytoplasm + nucleus'], ['Cytoplasm', 'Between membrane and nucleus']], 'Table of protoplasm and cytoplasm'),
      [1],
    ),
    sec(
      '2. Cell boundaries: cell wall and cell membrane',
      `| Point | Cell wall | Cell membrane |
|---|---|---|
| Present in | Plant cells (also fungi, bacteria; composition differs) | All cells |
| Composition | **Cellulose** in plants | **Lipids and proteins** |
| Nature | **Non-living**, rigid | **Living**, flexible |
| Permeability | **Freely permeable** | **Selectively (semi-) permeable** |
| Function | Gives shape, support and protection | Controls what enters and leaves the cell; gives shape to animal cells |

The cell wall lies **outside** the cell membrane. Animal cells have only the membrane.`,
      [kt('Cell wall', 'Non-living, freely permeable outer layer of plant cells, made of cellulose.'), kt('Cell membrane', 'Living, selectively permeable boundary of every cell, made of lipids and proteins.')],
      V.plant,
      [2],
    ),
    sec(
      '3. Nucleus, nucleolus, mitochondria, endoplasmic reticulum, ribosomes and Golgi bodies',
      `- **Nucleus:** usually one, bounded by a **double nuclear membrane with pores**; contains **nucleoplasm**, **chromatin** (DNA with proteins, which forms chromosomes) and the **nucleolus**. It **controls** all cell activities and carries **heredity**.
- **Nucleolus:** dense, round body in the nucleus; makes **ribosomes** (and stores RNA).
- **Mitochondria:** rod- or oval-shaped, with an **outer membrane** and an **inner membrane folded into cristae**. They carry out **aerobic respiration** and release energy as ATP, so they are called the **powerhouses** of the cell.
- **Endoplasmic reticulum (ER):** a network of membrane-bound channels. **Rough ER** carries ribosomes and helps make and transport **proteins**; **smooth ER** has none and helps make **lipids** and detoxify. It gives mechanical support and joins the nuclear envelope to the cell surface.
- **Ribosomes:** tiny granules without a membrane, free in the cytoplasm or on rough ER; the site of **protein synthesis**.
- **Golgi bodies:** stacks of flat, curved sacs with vesicles; they **modify, pack and secrete** substances and help form lysosomes.`,
      [kt('Nucleolus', 'Dense body in the nucleus that makes ribosomes.'), kt('Mitochondrion', 'Organelle with folded inner membrane that releases energy in respiration.'), kt('Ribosome', 'Granule that is the site of protein synthesis.'), kt('Golgi body', 'Stack of sacs that packs and secretes substances.')],
      V.organelles,
      [3],
    ),
    sec(
      '4. Plastids, lysosomes, centrosome and vacuoles',
      `**Plastids** occur in plant cells (and some protists):
- **Chloroplasts:** green, contain **chlorophyll** in stacks called grana; carry out **photosynthesis**.
- **Chromoplasts:** contain **red, orange or yellow pigments**; colour flowers and fruits.
- **Leucoplasts:** **colourless**; **store** starch (amyloplasts), oils or proteins.

**Lysosomes:** small single-membrane bags of **digestive enzymes**; digest worn-out organelles and foreign matter; called **suicide bags**.
**Centrosome:** near the nucleus in **animal cells**, with two **centrioles**; helps form the **spindle** in cell division. Absent in higher plants.
**Vacuoles:** sacs of **cell sap** bounded by a membrane (tonoplast in plants). Plants have one **large central vacuole** that stores water, salts and food and keeps the cell **turgid**; animal cells have **small, temporary** vacuoles.`,
      [kt('Chloroplast', 'Green plastid where photosynthesis occurs.'), kt('Chromoplast', 'Coloured plastid giving colour to flowers and fruits.'), kt('Leucoplast', 'Colourless plastid that stores food.'), kt('Lysosome', 'Bag of digestive enzymes; suicide bag.'), kt('Vacuole', 'Sac of cell sap.')],
      V.plastids,
      [4],
    ),
    sec(
      '5. Prokaryotic and eukaryotic cells',
      `| Point | Prokaryotic cell | Eukaryotic cell |
|---|---|---|
| Nucleus | **No true nucleus**; DNA lies free as a **nucleoid** (no nuclear membrane) | **True nucleus** with nuclear membrane |
| Organelles | **No membrane-bound organelles** | Mitochondria, ER, Golgi, etc. |
| Ribosomes | Present (smaller) | Present (larger) |
| Size | Usually small (about 1 to 10 micrometres) | Usually larger (10 to 100 micrometres) |
| Examples | Bacteria, blue-green algae (cyanobacteria) | Amoeba, yeast and other fungi, plants, animals |

Sizes are approximate and differ between books.`,
      [kt('Prokaryotic cell', 'Cell without a true nucleus or membrane-bound organelles.'), kt('Eukaryotic cell', 'Cell with a true nucleus and membrane-bound organelles.'), kt('Nucleoid', 'The region of a prokaryotic cell holding its DNA.')],
      V.bacterium,
      [5],
    ),
    sec(
      '6. Plant cell versus animal cell',
      `| Point | Plant cell | Animal cell |
|---|---|---|
| Cell wall | Present (cellulose) | Absent |
| Shape | Usually fixed, regular | Usually irregular |
| Plastids | Present | Absent |
| Vacuoles | One large central vacuole | Small and few |
| Centrosome | Absent in higher plants | Present |
| Nucleus | Often at the side | Usually central |

**Drawing:** draw a generalised cell in outline, then label with ruled lines that touch the part: plant cell (cell wall, membrane, cytoplasm, nucleus with nucleolus, large vacuole, chloroplast, mitochondrion) and animal cell (membrane, cytoplasm, nucleus with nucleolus, centrosome, Golgi body, mitochondrion, lysosome).`,
      [kt('Turgid', 'Firm because the vacuole is full of water.')],
      V.animal,
      [6],
      [V.plant],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Calling the cell wall **living** or **selectively permeable**.
- Saying protoplasm and cytoplasm are the same thing without the nucleus distinction.
- Drawing a nuclear membrane in a bacterium, or a cell wall in an animal cell.
- Giving "makes energy" for mitochondria: they **release** energy from food (respiration).
- Writing only "powerhouse" without the reason.

**How marks are usually awarded**
- 1 mark: a term, an odd one out **with its category**, a function in one line.
- 2 marks: two differences, each matched point for point; two functions.
- 3 marks: a neat, labelled diagram (one mark for the outline, one for key features, one for correct labels).
- 10-mark structured question: a short situation or diagram with parts of 3, 3 and 4 marks; one part is usually a labelled diagram.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Main points of the cell theory?', 'All organisms are made of cells; the cell is the unit of structure and function; cells come from cells.', 'definition', 1),
    fc(2, 'Protoplasm?', 'All the living matter of a cell: cytoplasm and nucleus.', 'definition', 1),
    fc(3, 'Cytoplasm?', 'Protoplasm outside the nucleus, inside the membrane.', 'definition', 1),
    fc(4, 'A unicellular organism?', 'Amoeba or a bacterium (any one).', 'fact', 1),
    fc(5, 'Cell wall is made of?', 'Cellulose (in plants).', 'fact', 2),
    fc(6, 'Is the cell wall living?', 'No, it is non-living and freely permeable.', 'exam-tip', 2),
    fc(7, 'Cell membrane is made of?', 'Lipids and proteins.', 'fact', 2),
    fc(8, 'Why is the cell membrane called selectively permeable?', 'It lets some substances pass and stops others.', 'concept', 2),
    fc(9, 'Function of the nucleus?', 'Controls the cell and carries heredity.', 'fact', 3),
    fc(10, 'Function of the nucleolus?', 'Makes ribosomes.', 'fact', 3),
    fc(11, 'Why are mitochondria called powerhouses?', 'They release energy from food in respiration.', 'concept', 3),
    fc(12, 'Folds of the inner mitochondrial membrane?', 'Cristae.', 'fact', 3),
    fc(13, 'Rough ER is rough because of?', 'Ribosomes on its surface.', 'fact', 3),
    fc(14, 'Smooth ER helps in?', 'Making lipids and detoxifying.', 'fact', 3),
    fc(15, 'Site of protein synthesis?', 'Ribosomes.', 'fact', 3),
    fc(16, 'Function of the Golgi body?', 'Modifies, packs and secretes substances.', 'fact', 3),
    fc(17, 'Green plastid?', 'Chloroplast: photosynthesis.', 'fact', 4),
    fc(18, 'Plastid that colours flowers and fruits?', 'Chromoplast.', 'fact', 4),
    fc(19, 'Colourless plastid and its job?', 'Leucoplast: stores starch, oils or proteins.', 'fact', 4),
    fc(20, 'Suicide bag?', 'Lysosome: digestive enzymes can digest its own cell.', 'definition', 4),
    fc(21, 'Centrosome is found in?', 'Animal cells; two centrioles help form the spindle.', 'fact', 4),
    fc(22, 'Vacuole contains?', 'Cell sap.', 'fact', 4),
    fc(23, 'Why is a plant cell with a full vacuole firm?', 'Water in the large vacuole makes it turgid.', 'concept', 4),
    fc(24, 'Prokaryotic cell: nucleus?', 'No true nucleus; DNA lies as a nucleoid.', 'fact', 5),
    fc(25, 'Two examples of prokaryotes?', 'Bacteria and blue-green algae.', 'fact', 5),
    fc(26, 'Two examples of eukaryotes?', 'Amoeba and yeast (or plants, animals).', 'fact', 5),
    fc(27, 'Organelles in prokaryotes?', 'No membrane-bound organelles.', 'fact', 5),
    fc(28, 'Three features of plant cells absent in animal cells?', 'Cell wall, plastids, large central vacuole.', 'exam-tip', 6),
    fc(29, 'Organelle in animal cells but not in higher plant cells?', 'Centrosome.', 'exam-tip', 6),
    fc(30, 'Magnification?', 'Size of drawing divided by real size.', 'concept', 6),
  ],
  status: 'draft',
  provenance: PROV,
};
