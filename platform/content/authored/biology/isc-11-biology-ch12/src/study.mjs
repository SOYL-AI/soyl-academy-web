// ISC 11 Biology ch12 notes (one section per syllabus topic) and 30 flashcards.
import { T, table, unit, PROV } from '../../isc-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { CYCLE, CYCLE_H, SHARE, MOUSE, MITOSIS as MIT, MEIOSIS, LILY, combos, ROOT, MI, dna } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Cell Cycle and Cell Division — Notes',
  language: 'en',
  sections: [
    sec(
      '1. The cell cycle: G1, S, G2, M and G0; C-value',
      `The **cell cycle** is the sequence of events by which a cell duplicates its contents and divides. It has two parts: **interphase** and the **M phase** (mitosis and cytokinesis). Interphase is the longest part (in the model culture ${CYCLE.G1 + CYCLE.S + CYCLE.G2} of ${CYCLE_H} hours, ${SHARE.G1 + SHARE.S + SHARE.G2} percent) and has three phases:
- **G1 (first gap):** the cell grows and makes RNA, proteins and organelles; it prepares for DNA replication.
- **S (synthesis):** the **DNA is replicated**; every chromosome now has two chromatids. The DNA content doubles (**2C to 4C**) but the **number of chromosomes does not change**. In animal cells the centrioles also duplicate.
- **G2 (second gap):** growth continues; proteins needed for division, such as those of the spindle, are made.

**M phase:** nuclear division (**karyokinesis**) and division of the cytoplasm (**cytokinesis**); it is the shortest phase (about one hour in a human cell with a 24-hour cycle; ${CYCLE.M} hour here).

**G0 (quiescent stage):** cells that do not divide further, or divide only when needed, leave the cycle from G1; they are alive and metabolically active (for example adult heart and nerve cells).

**C-value** is the amount of DNA in the haploid set of chromosomes. A diploid cell in G1 has **2C**, after S phase **4C**, and each daughter after mitosis **2C** again; a gamete has **1C**. In the mouse-like example of ${MOUSE.n2} chromosomes, the DNA in a G1 nucleus is ${dna('G1')} picograms and ${dna('G2')} picograms in G2; the chromosome number is ${MIT.G1.chromosomes} in both, but the chromatids rise from ${MIT.G1.chromatids} to ${MIT.G2.chromatids}.`,
      [kt('Interphase', 'G1, S and G2 together: the period between divisions.'), kt('C-value', 'Amount of DNA in a haploid set; a G1 diploid cell is 2C.'), kt('G0', 'Resting state in which a cell has left the cell cycle.'), kt('Cytokinesis', 'Division of the cytoplasm.')],
      V.cycle,
      [1],
      [V.dnagraph, V.flow],
    ),
    sec(
      '2. Mitosis',
      `**Mitosis** is the **equational division** in which a parent cell gives two daughter cells with the same chromosome number and the same genetic content.

- **Prophase:** chromatin condenses into chromosomes, each of two chromatids joined at the centromere; the centrosomes move to opposite poles and the **spindle** forms; the **nucleolus and nuclear envelope disappear**.
- **Metaphase:** the chromosomes line up on the **equatorial (metaphase) plate**, with spindle fibres attached to the **kinetochores** at the centromeres; the best stage for counting and studying chromosomes.
- **Anaphase:** the **centromeres divide**; each chromatid is now a chromosome and the two sets move to opposite poles (so the whole cell briefly has ${MIT.anaphase.chromosomes} chromosomes in the ${MOUSE.n2}-chromosome example).
- **Telophase:** chromosomes uncoil into chromatin; the **nuclear envelope and nucleolus reappear**, giving two nuclei.
- **Cytokinesis:** in an **animal cell** a **furrow** pinches the cell in two; in a **plant cell** a **cell plate** grows outwards from the centre to the wall.

**Significance:** growth of the body, repair and replacement of cells, constant chromosome number in all body cells, asexual reproduction of unicellular organisms, and the restoration of the nucleo-cytoplasmic ratio.

**Mitotic index** = dividing cells ÷ cells counted × 100. In the onion root-tip squash of ${ROOT.total} cells it is ${MI} percent.`,
      [kt('Mitosis', 'Nuclear division giving two genetically identical nuclei.'), kt('Kinetochore', 'Protein disc on the centromere where spindle fibres attach.'), kt('Cell plate', 'Structure that forms the new wall between daughter plant cells.'), kt('Mitotic index', 'Percentage of cells in a sample that are dividing.')],
      V.mitosis,
      [2],
    ),
    sec(
      '3. Meiosis',
      `**Meiosis** occurs in the gamete mother cells and consists of **two successive divisions** (meiosis I and II) after a single DNA replication, producing **four haploid cells**. **Meiosis I is the reductional division; meiosis II is equational.**

**Prophase I** is long and has five substages:
1. **Leptotene** — chromosomes appear as long, thin threads.
2. **Zygotene** — **synapsis**: homologous chromosomes pair (a synaptonemal complex forms), making **bivalents**.
3. **Pachytene** — chromosomes thicken; **crossing over** exchanges segments between **non-sister chromatids** of homologues at recombination nodules (a tetrad of four chromatids is visible).
4. **Diplotene** — the synaptonemal complex dissolves; homologues begin to separate but remain joined at **chiasmata**, the sites of crossing over.
5. **Diakinesis** — **terminalisation** of chiasmata; chromosomes fully condensed; nucleolus and nuclear envelope disappear; the spindle forms.

**Metaphase I:** bivalents lie on the equator, the kinetochores of the two homologues facing opposite poles. **Anaphase I:** homologous chromosomes separate (centromeres do not divide). **Telophase I:** two cells (a **dyad**), each with half the chromosome number. **Interkinesis** is a short pause with **no DNA replication**. **Meiosis II** (prophase II to telophase II) separates the **sister chromatids**, giving **four haploid cells (a tetrad)**.

**Significance:** keeps the chromosome number constant from generation to generation; produces **variation** through **crossing over**, **independent assortment** (a lily with ${LILY.n2} chromosomes can make ${combos(LILY.n2)} chromosome combinations in gametes, ignoring crossing over) and random fertilisation, which drives evolution. In the ${MOUSE.n2}-chromosome example the DNA falls from ${MEIOSIS[1].dna} picograms (after S) to ${MEIOSIS[2].dna} after meiosis I and ${MEIOSIS[4].dna} in each gamete.`,
      [kt('Synapsis', 'Pairing of homologous chromosomes in zygotene.'), kt('Crossing over', 'Exchange of segments between non-sister chromatids of homologues in pachytene.'), kt('Chiasma', 'X-shaped point where homologues remain joined in diplotene.'), kt('Bivalent', 'Pair of synapsed homologous chromosomes.')],
      V.prophase,
      [3],
      [V.meiosis],
    ),
    sec(
      '4. Differences between mitosis and meiosis',
      `| Feature | Mitosis | Meiosis |
|---|---|---|
| Where | Body cells; cells that divide for growth | Gamete mother cells in the reproductive organs |
| Divisions | One | Two |
| Daughter cells | Two, identical to the parent | Four, genetically different |
| Chromosome number | Same as the parent (2n) | Halved (n) |
| Synapsis and crossing over | Absent | Present (zygotene and pachytene) |
| Prophase | Short, without substages | Long, with five substages |
| Metaphase plate | Individual chromosomes | Bivalents (metaphase I) |
| Anaphase | Chromatids separate | Homologues separate (I), chromatids separate (II) |
| Role | Growth, repair, asexual reproduction | Gamete formation and variation |

**Similarity:** both are preceded by DNA replication in the S phase and both use a spindle to move chromosomes.`,
      [kt('Reductional division', 'Meiosis I, in which the chromosome number is halved.'), kt('Equational division', 'Mitosis and meiosis II, in which the number is unchanged.')],
      table(['Feature', 'Mitosis', 'Meiosis'], [['Divisions', 'One', 'Two'], ['Daughter cells', 'Two, identical', 'Four, different'], ['Chromosome number', '2n', 'n']], 'Table of the main differences between mitosis and meiosis'),
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying that the chromosome number doubles in S phase (the DNA amount and chromatid number double, not the chromosomes).
- Saying that the centromere divides at anaphase I (it divides at anaphase II and at anaphase of mitosis).
- Placing crossing over in zygotene (it is in pachytene; pairing is in zygotene).
- Writing that meiosis II halves the chromosome number (meiosis I does; meiosis II is equational).
- Giving a cell plate for an animal cell (a furrow) or a furrow for a plant cell (a cell plate).
- Writing that interkinesis includes DNA replication (it does not).

**How marks are usually awarded**
- 1-mark subparts: a phase or stage, a term (synapsis, chiasma), a number (chromosomes, chromatids), give-a-reason and analogy.
- 2–3-mark questions: events of a phase; the stages of prophase I; significance of mitosis or meiosis; differences in a table.
- 5-mark questions in parts: labelled diagrams of the stages of mitosis; prophase I with diagrams; mitosis against meiosis.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Parts of the cell cycle?', 'Interphase (G1, S, G2) and M phase.', 'exam-tip', 1),
    fc(2, 'What happens in G1?', 'Growth; RNA, proteins and organelles made.', 'fact', 1),
    fc(3, 'What happens in S phase?', 'DNA is replicated; chromatids form.', 'fact', 1),
    fc(4, 'What happens in G2?', 'Growth; spindle proteins made.', 'fact', 1),
    fc(5, 'What is G0?', 'Resting state; cell has left the cycle.', 'definition', 1),
    fc(6, 'What is the C-value?', 'Amount of DNA in a haploid set.', 'definition', 1),
    fc(7, 'DNA content in G1, after S, after mitosis?', '2C, 4C, 2C.', 'exam-tip', 1),
    fc(8, 'Does S phase change the chromosome number?', 'No; only DNA and chromatids double.', 'concept', 1),
    fc(9, 'Which phase is shortest?', 'M phase.', 'fact', 1),
    fc(10, 'Mitosis: prophase events?', 'Chromosomes condense; spindle forms; nucleolus and envelope vanish.', 'fact', 2),
    fc(11, 'Mitosis: metaphase?', 'Chromosomes on the equatorial plate.', 'fact', 2),
    fc(12, 'Mitosis: anaphase?', 'Centromeres divide; chromatids move to poles.', 'fact', 2),
    fc(13, 'Mitosis: telophase?', 'Nuclei re-form; chromosomes uncoil.', 'fact', 2),
    fc(14, 'Animal and plant cytokinesis?', 'Furrow; cell plate.', 'concept', 2),
    fc(15, 'Best stage for counting chromosomes?', 'Metaphase.', 'fact', 2),
    fc(16, 'Mitotic index?', 'Dividing cells ÷ cells counted × 100.', 'definition', 2),
    fc(17, 'Significance of mitosis?', 'Growth, repair, constant number, asexual reproduction.', 'exam-tip', 2),
    fc(18, 'Five substages of prophase I?', 'Leptotene, zygotene, pachytene, diplotene, diakinesis.', 'exam-tip', 3),
    fc(19, 'What is synapsis?', 'Pairing of homologous chromosomes (zygotene).', 'definition', 3),
    fc(20, 'Where does crossing over occur?', 'Between non-sister chromatids in pachytene.', 'fact', 3),
    fc(21, 'What is a chiasma?', 'Point where homologues stay joined in diplotene.', 'definition', 3),
    fc(22, 'What separates in anaphase I?', 'Homologous chromosomes.', 'exam-tip', 3),
    fc(23, 'What separates in anaphase II?', 'Sister chromatids.', 'exam-tip', 3),
    fc(24, 'Why is meiosis I a reduction division?', 'Chromosome number is halved.', 'concept', 3),
    fc(25, 'What is interkinesis?', 'Pause between the divisions; no DNA replication.', 'definition', 3),
    fc(26, 'Sources of variation in meiosis?', 'Crossing over, independent assortment.', 'concept', 3),
    fc(27, 'Cells formed by mitosis and by meiosis?', 'Two identical; four different.', 'exam-tip', 4),
    fc(28, 'Chromosome number after mitosis and meiosis?', '2n stays 2n; 2n becomes n.', 'exam-tip', 4),
    fc(29, 'Where does meiosis occur?', 'Gamete mother cells.', 'fact', 4),
    fc(30, 'One similarity of the two divisions?', 'Both follow DNA replication in S phase.', 'concept', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
