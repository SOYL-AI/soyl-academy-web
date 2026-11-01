// ICSE 10 Biology ch01 notes and flashcards.
import { T, table, unit, PROV } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Cell Cycle, Cell Division and Structure of Chromosomes — Notes',
  language: 'en',
  sections: [
    sec(
      '1. The cell cycle',
      `**Cell cycle.** The sequence of events by which a cell grows, copies its DNA and divides into two daughter cells. It has two parts:
- **Interphase** — the longest part; the cell is very active (not "resting").
  - **G1 (first gap):** the cell grows, makes proteins and new organelles.
  - **S (synthesis):** the **DNA is replicated**; each chromosome now consists of **two sister chromatids**.
  - **G2 (second gap):** the cell makes proteins for the spindle and prepares to divide.
- **M phase** — **karyokinesis** (division of the nucleus by mitosis) followed by **cytokinesis** (division of the cytoplasm).

**DNA content** (taking a gamete as 1C): G1 2C → after S 4C → each daughter cell 2C.

**Cell division** is needed for growth, repair, replacement of cells and reproduction.`,
      [kt('Cell cycle', 'The sequence of growth, DNA replication and division of a cell.'), kt('Interphase', 'The stage between two divisions, made of G1, S and G2.'), kt('S phase', 'The phase in which DNA is replicated.')],
      V.cycle,
      [1],
    ),
    sec(
      '2. Mitosis and cytokinesis',
      `**Mitosis** is the division of the nucleus that gives **two daughter nuclei identical** to the parent nucleus, with the **same chromosome number**. It occurs in **somatic (body) cells**, especially in meristems (root and shoot tips), skin and bone marrow.

| Stage | Events |
|---|---|
| **Prophase** | Chromatin condenses into chromosomes, each of two chromatids joined at a centromere; nucleolus and nuclear membrane disappear; in animal cells the centrioles move to opposite poles and the spindle forms |
| **Metaphase** | Chromosomes line up on the **equator** (metaphase plate); each centromere is attached to spindle fibres from both poles; chromosomes are most distinct |
| **Anaphase** | Centromeres split; **sister chromatids separate** and are pulled to **opposite poles** (V-shaped, centromere leading) |
| **Telophase** | Chromosomes reach the poles and uncoil; **nuclear membrane and nucleolus re-form**; two nuclei |

**Cytokinesis**
- **Animal cell:** a **furrow** (cleavage) in the cell membrane deepens from **outside inwards** and divides the cell.
- **Plant cell:** vesicles join at the centre to form a **cell plate**, which grows **outwards**; a new cell wall forms. Higher plant cells have **no centrioles**; the spindle forms from the polar cytoplasm.`,
      [kt('Mitosis', 'Nuclear division giving two identical nuclei with the same chromosome number.'), kt('Karyokinesis', 'Division of the nucleus.'), kt('Cytokinesis', 'Division of the cytoplasm.'), kt('Cell plate', 'The partition formed at the centre of a dividing plant cell that becomes the new wall.')],
      V.mitosis,
      [2],
      [V.cytokinesis],
    ),
    sec(
      '3. Meiosis, homologous chromosomes and crossing over',
      `**Meiosis** is the division that forms **gametes** (sperms, eggs, pollen, ova). One **diploid (2n)** cell divides to give **four haploid (n)** cells, so it is called a **reduction division**. (The stages of meiosis are not in the syllabus.)

**Why halve the number?** At fertilisation two gametes fuse. Haploid gametes give a diploid zygote, so the chromosome number stays **constant** from generation to generation (human: 46 → 23 in gametes → 46 in zygote).

**Homologous chromosomes** are a pair of chromosomes alike in size and shape, carrying genes for the same characters at the same positions — **one from the father, one from the mother**.

**Crossing over.** During meiosis homologous chromosomes pair up; **non-sister chromatids** cross at points called **chiasmata** and **exchange segments**. The chromatids then carry **new combinations of genes**. Together with the random sorting of chromosomes into gametes, this produces **variation**.`,
      [kt('Meiosis', 'Reduction division forming four haploid gametes from a diploid cell.'), kt('Homologous chromosomes', 'A matching pair of chromosomes, one from each parent.'), kt('Crossing over', 'Exchange of segments between non-sister chromatids of homologous chromosomes.'), kt('Chiasma', 'The point where chromatids cross over.')],
      V.crossover,
      [3],
    ),
    sec(
      '4. Significance of mitosis and meiosis; differences',
      `**Significance of mitosis:** growth of a multicellular organism from a zygote; repair of wounds and regeneration; replacement of worn-out cells (red blood cells, skin, gut lining); asexual reproduction (amoeba, vegetative propagation); keeps the genetic material **unchanged** in body cells.

**Significance of meiosis:** forms **gametes**; keeps the chromosome number **constant** across generations; produces **variation**, the raw material of evolution.

| Mitosis | Meiosis |
|---|---|
| Somatic cells | Reproductive cells (gamete formation) |
| Two daughter cells | Four daughter cells |
| Chromosome number unchanged (2n → 2n) | Chromosome number halved (2n → n) |
| No crossing over | Crossing over occurs |
| Daughter cells identical | Daughter cells genetically different |`,
      [kt('Diploid (2n)', 'Having two sets of chromosomes, as in body cells.'), kt('Haploid (n)', 'Having one set of chromosomes, as in gametes.')],
      table(['Mitosis', 'Meiosis'], [['Two identical cells', 'Four different cells'], ['2n to 2n', '2n to n']], 'Table: mitosis gives two identical cells and keeps the number; meiosis gives four different cells and halves it'),
      [4],
    ),
    sec(
      '5. Structure of a chromosome',
      `**Chromosomes** are thread-like structures in the nucleus that carry hereditary information. Humans have **46** (23 pairs) in each body cell.

- **Chromatin:** in a non-dividing nucleus the genetic material is a fine network of **DNA wound around proteins**. During division it coils into compact chromosomes.
- **Chromatids:** after the S phase each chromosome has **two identical sister chromatids**.
- **Centromere:** the narrow region that **holds the chromatids together** and to which **spindle fibres attach**.
- **DNA (deoxyribonucleic acid):** a long **double helix** that carries the **coded genetic instructions**.
- **Gene:** a **segment of DNA** at a particular position on a chromosome that controls a particular character; genes are arranged in a **linear** order.

**Relationship:** genes are parts of DNA; DNA with proteins forms chromatin; chromatin coils to form a chromosome.`,
      [kt('Chromatin', 'DNA with proteins as a fine network in a non-dividing nucleus.'), kt('Chromatid', 'One of the two identical copies of a duplicated chromosome.'), kt('Centromere', 'The region joining sister chromatids and attaching to the spindle.'), kt('Gene', 'A segment of DNA controlling a particular character.')],
      V.chromosome,
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Calling interphase a "resting stage".
- Doubling the chromosome number at metaphase: it is the **chromatids** that double (46 chromosomes, 92 chromatids in a human cell).
- Drawing centrioles in plant cells, or a cell plate in animal cells.
- Writing stages of meiosis (not in the syllabus) instead of its purpose.
- Saying meiosis forms two cells, or that its products are identical.

**How marks are usually awarded**
- 1 mark: a term, a stage, an odd one out **with its category**, a chromosome number.
- 2 marks: two reasons or two differences, each matched point for point.
- 3 marks: a neat, labelled diagram (stage of mitosis, chromosome, crossing over) — one mark each for the drawing, its key features and correct labels.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is the cell cycle?', 'Growth, DNA copying and division of a cell, repeated.', 'definition', 1),
    fc(2, 'Three phases of interphase?', 'G1, S, G2.', 'fact', 1),
    fc(3, 'What happens in the S phase?', 'DNA is replicated.', 'fact', 1),
    fc(4, 'Longest part of the cell cycle?', 'Interphase.', 'fact', 1),
    fc(5, 'DNA content G1 → G2?', '2C → 4C.', 'concept', 1),
    fc(6, 'Karyokinesis?', 'Division of the nucleus.', 'definition', 2),
    fc(7, 'Cytokinesis?', 'Division of the cytoplasm.', 'definition', 2),
    fc(8, 'Order of mitosis stages?', 'Prophase, metaphase, anaphase, telophase.', 'exam-tip', 2),
    fc(9, 'Stage where chromosomes line up on the equator?', 'Metaphase.', 'fact', 2),
    fc(10, 'Stage where chromatids separate?', 'Anaphase.', 'fact', 2),
    fc(11, 'Stage where nuclear membrane re-forms?', 'Telophase.', 'fact', 2),
    fc(12, 'Best stage to count chromosomes?', 'Metaphase.', 'exam-tip', 2),
    fc(13, 'Cytokinesis in animal cells?', 'Furrowing from outside inwards.', 'concept', 2),
    fc(14, 'Cytokinesis in plant cells?', 'Cell plate from the centre outwards.', 'concept', 2),
    fc(15, 'Organiser of the spindle in animal cells?', 'Centrioles.', 'fact', 2),
    fc(16, 'Four uses of mitosis?', 'Growth, repair, replacement, asexual reproduction.', 'exam-tip', 4),
    fc(17, 'Why is meiosis a reduction division?', 'It halves the chromosome number (2n → n).', 'concept', 3),
    fc(18, 'Cells formed by one meiosis?', 'Four haploid cells.', 'fact', 3),
    fc(19, 'Where does meiosis occur?', 'In reproductive organs forming gametes.', 'fact', 3),
    fc(20, 'Homologous chromosomes?', 'Matching pair, one from each parent.', 'definition', 3),
    fc(21, 'Crossing over?', 'Exchange of segments between non-sister chromatids.', 'definition', 3),
    fc(22, 'Result of crossing over?', 'New gene combinations: variation.', 'concept', 3),
    fc(23, 'Human sperm chromosome number?', '23.', 'fact', 3),
    fc(24, 'Why must gametes be haploid?', 'To keep the number constant after fertilisation.', 'concept', 4),
    fc(25, 'Mitosis vs meiosis: daughter cells?', 'Two identical vs four different.', 'exam-tip', 4),
    fc(26, 'Centromere?', 'Joins sister chromatids; spindle attaches here.', 'definition', 5),
    fc(27, 'Chromatin?', 'DNA wound on proteins in a non-dividing nucleus.', 'definition', 5),
    fc(28, 'Gene?', 'A segment of DNA controlling a character.', 'definition', 5),
    fc(29, 'Chromatids at metaphase in a human cell?', '92 (46 chromosomes × 2).', 'exam-tip', 5),
    fc(30, 'Relationship DNA–gene–chromosome?', 'Genes are DNA segments; DNA packed as chromosomes.', 'concept', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
