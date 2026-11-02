// ch10 notes and flashcards.
import { T, table, unit, PROV, r } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { HUMAN, YEAST_MIN, N, DNA } from './calc.mjs';

const MITOSIS_TABLE = table(['Feature', 'Animal cell', 'Plant cell'], [['Cytokinesis begins', 'At the edge, as a furrow in the plasma membrane', 'In the centre, as a cell plate'], ['Direction', 'Inwards', 'Outwards, to meet the side walls'], ['Result', 'Two cells', 'Two cells separated by a new wall on the middle lamella']], 'Table comparing cytokinesis in animal and plant cells');
const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = [], formulas = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Cell Cycle and Cell Division — Notes',
  language: 'en',
  sections: [
    sec(
      '1. The cell cycle',
      `All cells reproduce by dividing: a cell grows, duplicates its genome, synthesises other constituents and divides into two daughter cells. This sequence of events is the **cell cycle**. The duration varies with the organism and cell type: **human cells in culture take about ${HUMAN.cycleH} hours**, of which the **M phase lasts only about ${HUMAN.mH} hour**, whereas **yeast** completes a cycle in about **${YEAST_MIN} minutes**.

The cycle has two parts. **M phase (mitosis phase)** is the actual division; **interphase** lies between two successive M phases and, in human cells, is more than **95 percent** of the cycle (${N.interphaseShare} percent for the textbook figures). Interphase is a period of preparation, not a resting phase:
- **G1 phase (gap 1):** between the end of mitosis and the start of DNA replication; the cell is metabolically active and grows but does **not replicate its DNA**.
- **S phase (synthesis):** DNA **replicates**; the amount per cell **doubles** (from 2C to 4C) but the **chromosome number remains the same** (2n). In animal cells the **centriole duplicates in the cytoplasm** during S phase.
- **G2 phase (gap 2):** proteins are synthesised in preparation for mitosis, and cell growth continues.

Some cells do not divide further: they exit G1 and enter an inactive **quiescent stage (G0)**. Cells in G0 remain metabolically active but do not proliferate unless called on to do so by the needs of the organism; many cells of the adult body, such as heart cells, stay in this stage, while others re-enter the cycle.

(The textbook figures of 24 hours and 90 minutes are typical values for cells in culture; real cycle times vary widely, and the phase lengths drawn in the diagrams are illustrative.)`,
      [kt('Cell cycle', 'The sequence of events by which a cell duplicates its genome, synthesises other constituents and divides into two cells.'), kt('Interphase', 'The period between two M phases: G1, S and G2.'), kt('S phase', 'The phase of DNA replication; DNA content doubles but chromosome number does not.'), kt('G0 (quiescent stage)', 'A metabolically active but non-dividing stage entered from G1.')],
      V.cycle,
      [1],
      [V.dna],
      [{ label: 'Interphase share of the cycle', latex: r`\text{interphase share} = \dfrac{\text{cycle time} - \text{M phase time}}{\text{cycle time}} \times 100` }],
    ),
    sec(
      '2. Mitosis',
      `**Mitosis** is the division in which a **diploid parent cell gives two daughter cells with the same chromosome number**, so it is called **equational division**. It is a continuous process, divided into **karyokinesis** (division of the nucleus) and **cytokinesis** (division of the cytoplasm), and karyokinesis is described in four stages.

- **Prophase** follows the S and G2 phases. Chromosomal material, which was a tangle of thin threads in interphase, **condenses**; each chromosome has two **chromatids** joined at the **centromere**. The **centrosome**, duplicated in S phase, begins to move to opposite poles and radiates **microtubules**, the **asters**; the two asters with the spindle fibres form the **mitotic apparatus**. By the **end of prophase**, the **Golgi complex, endoplasmic reticulum, nucleolus and nuclear envelope disappear**.
- **Metaphase:** the chromosomes are fully condensed and **spindle fibres attach to the kinetochores** (disc-shaped structures at the centromere). The chromosomes **align at the equator, the metaphase plate**; one chromatid of each chromosome is connected to a pole by spindle fibres, the other to the opposite pole. Metaphase is the **best stage to count and study chromosome morphology**.
- **Anaphase:** the **centromeres split** and the chromatids **separate**; each, now a chromosome, **moves to the opposite pole**, **centromere first**.
- **Telophase:** the chromosomes **reach the poles** and **decondense**; the **nuclear envelope reforms** around each group, and the **nucleolus, Golgi complex and ER reform**.

**Cytokinesis** follows. In an **animal cell** a **furrow** appears in the plasma membrane and deepens until the cell is divided. In a **plant cell**, which has a rigid wall, a **cell plate** forms in the centre and grows outwards to meet the side walls; it represents the **middle lamella** between the new cells, and the cell wall materials are then laid down on it. Sometimes karyokinesis is **not followed by cytokinesis**, giving **multinucleate** cells (**syncytium**), as in the **liquid endosperm of coconut**.

**Significance:** daughter cells are genetically identical to the parent, so mitosis maintains the genetic make-up. It is responsible for **growth** (the zygote becomes a multicellular body), it **restores the nucleo-cytoplasmic ratio** when a growing cell becomes too large for its nucleus, it **replaces and repairs** cells (skin, intestinal lining) and, in plants, it enables the **meristems** to add new cells throughout life.

**Counting:** a diploid cell with 2n = 8 has 8 chromosomes (16 chromatids) at metaphase; at anaphase, once the centromeres split, the whole cell holds 16 chromosomes, and each daughter nucleus ends up with 8. The **mitotic index** is the percentage of cells in division in a sample, and in a population with cells at all stages the share of cells in a stage is proportional to the time spent in it.`,
      [kt('Equational division', 'Mitosis: the daughter cells have the same chromosome number as the parent.'), kt('Kinetochore', 'Disc-shaped protein structure at the centromere to which spindle fibres attach.'), kt('Metaphase plate', 'The equatorial plane on which chromosomes align at metaphase.'), kt('Cell plate', 'Structure that forms in the centre of a dividing plant cell and grows outwards, becoming the middle lamella.'), kt('Syncytium', 'A multinucleate cell formed when karyokinesis is not followed by cytokinesis.')],
      V.mitosis,
      [2],
      [V.cyto, MITOSIS_TABLE],
      [{ label: 'Mitotic index', latex: r`\text{mitotic index} = \dfrac{\text{cells in M phase}}{\text{total cells counted}} \times 100` }],
    ),
    sec(
      '3. Meiosis',
      `**Meiosis** is the specialised division that produces **haploid gametes** from **diploid meiocytes** (gamete mother cells) so that the chromosome number stays constant across generations. It involves **two sequential cycles of nuclear and cell division, meiosis I and meiosis II, but only a single cycle of DNA replication**. Meiosis I is initiated after the parental chromosomes have replicated to produce identical sister chromatids at the S phase. Meiosis I is the **reduction division**; meiosis II is **equational**. Four haploid cells result.

**Meiosis I — prophase I** is prolonged and has five substages.
- **Leptotene:** chromosomes gradually become visible under the light microscope; compaction continues.
- **Zygotene:** homologous chromosomes start pairing and aligning (**synapsis**), aided by the **synaptonemal complex**. The paired chromosomes are called **bivalents** or **tetrads**.
- **Pachytene:** the bivalents clearly appear as tetrads of four chromatids. **Crossing over**, the exchange of segments between **non-sister chromatids** of homologous chromosomes, occurs at **recombination nodules**, and is catalysed by the enzyme **recombinase**.
- **Diplotene:** dissolution of the synaptonemal complex; the recombined homologous chromosomes separate except at the sites of crossovers, the **X-shaped chiasmata**. In oocytes of some vertebrates diplotene can last for months or years.
- **Diakinesis:** **terminalisation of chiasmata**; chromosomes are fully condensed and the **meiotic spindle is assembled**; the **nucleolus disappears and the nuclear envelope breaks down**, marking the end of prophase I.

**Metaphase I:** the bivalents **align on the equatorial plate**; microtubules from opposite poles attach to the **kinetochores of the homologous chromosomes**. **Anaphase I:** the **homologous chromosomes separate**, while **sister chromatids remain associated at their centromeres**. **Telophase I:** the nuclear membrane and nucleolus reappear; **cytokinesis** follows and the product is a **dyad** of cells. The stage between the two meiotic divisions is **interkinesis**; it is generally short-lived and **no DNA replication occurs**.

**Meiosis II — prophase II:** the nuclear membrane disappears and the chromosomes become compact again. **Metaphase II:** the chromosomes align at the equator, and the kinetochores of sister chromatids attach to spindle fibres from opposite poles. **Anaphase II:** the **centromere splits** and the **chromatids move to opposite poles**. **Telophase II:** two groups of chromosomes are enclosed by nuclear envelopes; **cytokinesis** gives a **tetrad** of four **haploid** cells.

**Counting.** For 2n = ${N.pea.prophaseI[0]}: there are ${N.pea.metaphaseI[0] / 2} bivalents; a cell of the dyad has ${N.pea.telophaseI[0]} chromosomes of two chromatids each; at anaphase II each cell momentarily has ${N.pea.anaphaseII[0]} chromosomes; each final cell has ${N.pea.telophaseII[0]}. If the G1 nucleus has ${DNA.G1} pg of DNA, it has ${DNA.G2} pg after S, ${N.dnaDyad} pg per cell after meiosis I (half the chromosomes, still two chromatids each) and ${N.dnaSperm} pg after meiosis II.

**Significance:** meiosis **conserves the chromosome number** from generation to generation in sexually reproducing organisms (fusion of two haploid gametes restores the diploid number), and it **increases genetic variability** through crossing over and the separation of homologues; variations are very important for evolution.`,
      [kt('Meiocyte', 'A diploid cell of the reproductive organ that undergoes meiosis.'), kt('Synapsis', 'Pairing of homologous chromosomes in zygotene.'), kt('Crossing over', 'Exchange of segments between non-sister chromatids of homologous chromosomes in pachytene.'), kt('Chiasma', 'X-shaped point where homologues remain joined in diplotene, marking a crossover.'), kt('Dyad and tetrad', 'The two cells formed after meiosis I, and the four haploid cells formed after meiosis II.'), kt('Interkinesis', 'Short stage between meiosis I and meiosis II with no DNA replication.')],
      V.prophase1,
      [3],
      [V.meiosis],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing that chromosome number doubles in S phase (the DNA content doubles; the number of chromosomes stays 2n).
- Calling anaphase the stage when chromosomes align (that is metaphase), or placing the nuclear envelope's disappearance in telophase.
- Saying a plant cell divides by a furrow, or an animal cell by a cell plate.
- Mixing the order of the prophase I substages, or placing crossing over in zygotene (it is in pachytene).
- Saying sister chromatids separate in anaphase I (homologous chromosomes separate; chromatids separate in anaphase II).
- Claiming DNA is replicated in interkinesis, or that cells after meiosis I have C amount of DNA (it is still 2C).

**How marks are usually awarded**
- 1-mark items: a phase or substage name, a chromosome count, a term such as chiasma, dyad or kinetochore, an assertion-reason on S phase or anaphase I.
- 2–3-mark answers: events of G1, S and G2; differences between animal and plant cytokinesis; significance of mitosis or meiosis; events of anaphase I and II; the five substages of prophase I.
- 5-mark answers: stages of mitosis; stages of meiosis I with a labelled diagram; mitosis versus meiosis.
- Numericals: mitotic index, time in a phase from cell counts, cell numbers after n cycles, chromosomes and chromatids at a stage, DNA at a stage — always show the working.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is the cell cycle?', 'The sequence of events by which a cell duplicates its genome, makes other constituents and divides into two cells.', 'definition', 1),
    fc(2, 'The two parts of the cell cycle?', 'Interphase (G1, S, G2) and M phase (mitosis).', 'concept', 1),
    fc(3, 'Typical cycle times of human cells in culture and of yeast?', 'About 24 hours (M phase about 1 hour); yeast about 90 minutes.', 'fact', 1),
    fc(4, 'What happens in G1?', 'Cell grows and is metabolically active; no DNA replication.', 'concept', 1),
    fc(5, 'What happens in S phase?', 'DNA replicates (2C to 4C); chromosome number stays 2n; centriole duplicates in animal cells.', 'concept', 1),
    fc(6, 'What happens in G2?', 'Proteins for mitosis are made; growth continues.', 'concept', 1),
    fc(7, 'What is G0?', 'The quiescent stage: cells are metabolically active but do not divide unless called on.', 'definition', 1),
    fc(8, 'Share of the cycle taken by interphase in human cells?', 'More than 95 percent.', 'fact', 1),
    fc(9, 'DNA content and chromosome number from G1 to G2?', 'DNA doubles (2C to 4C); chromosome number unchanged (2n).', 'concept', 1),
    fc(10, 'Mitotic index formula?', 'Cells in M phase divided by total cells counted, times 100.', 'formula', 1),
    fc(11, 'Why is mitosis called equational division?', 'Daughter cells have the same chromosome number as the parent.', 'concept', 2),
    fc(12, 'Karyokinesis versus cytokinesis?', 'Karyokinesis is division of the nucleus; cytokinesis is division of the cytoplasm.', 'definition', 2),
    fc(13, 'What happens in prophase of mitosis?', 'Chromosomes condense; centrosomes move to poles; at the end the nuclear envelope, nucleolus, Golgi and ER disappear.', 'concept', 2),
    fc(14, 'Best stage to count chromosomes?', 'Metaphase.', 'fact', 2),
    fc(15, 'What is the metaphase plate?', 'The equatorial plane on which the chromosomes align.', 'definition', 2),
    fc(16, 'What attaches spindle fibres to a chromosome?', 'The kinetochore at the centromere.', 'fact', 2),
    fc(17, 'What happens in anaphase?', 'Centromeres split; chromatids move to opposite poles, centromere first.', 'concept', 2),
    fc(18, 'What happens in telophase?', 'Chromosomes decondense at the poles; nuclear envelope, nucleolus, Golgi and ER reform.', 'concept', 2),
    fc(19, 'Animal versus plant cytokinesis?', 'Animal: furrow from the edge inwards. Plant: cell plate from the centre outwards.', 'concept', 2),
    fc(20, 'Cell plate represents?', 'The middle lamella between the two new plant cells.', 'fact', 2),
    fc(21, 'When does a syncytium form?', 'When karyokinesis is not followed by cytokinesis, as in coconut liquid endosperm.', 'concept', 2),
    fc(22, 'Significance of mitosis?', 'Growth, nucleo-cytoplasmic ratio, repair and replacement, meristem activity.', 'concept', 2),
    fc(23, 'How many DNA replications and divisions in meiosis?', 'One replication, two divisions; four haploid cells.', 'concept', 3),
    fc(24, 'The five substages of prophase I in order?', 'Leptotene, zygotene, pachytene, diplotene, diakinesis.', 'fact', 3),
    fc(25, 'What is synapsis, and when does it happen?', 'Pairing of homologous chromosomes, in zygotene, with the synaptonemal complex.', 'definition', 3),
    fc(26, 'Where and how does crossing over occur?', 'Pachytene; between non-sister chromatids, at recombination nodules, with recombinase.', 'concept', 3),
    fc(27, 'What are chiasmata?', 'X-shaped sites of crossing over where homologues remain joined in diplotene.', 'definition', 3),
    fc(28, 'What separates in anaphase I and in anaphase II?', 'Anaphase I: homologous chromosomes. Anaphase II: sister chromatids.', 'concept', 3),
    fc(29, 'What is interkinesis?', 'The short stage between meiosis I and II; no DNA replication.', 'definition', 3),
    fc(30, 'Significance of meiosis?', 'Keeps chromosome number constant across generations; increases genetic variability.', 'concept', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
