// ISC 11 Biology ch12 Cell Cycle and Cell Division. Part 1 (t01-t02: cell cycle and mitosis) and Part 2 (t03-t04: meiosis and the comparison).
import { sl, deck, table, flow, svgV } from '../../isc-11-biology-ch01/src/lib.mjs';
import { CYCLE_SVG, DNAGRAPH, FLOW_SVG, MITOSIS, PROPHASE, MEIOSIS_SVG } from './svgs.mjs';
import { CYCLE, CYCLE_H, SHARE, INTERPHASE_H, FLOW, N_FLOW, hoursFromCount, MOUSE, MITOSIS as MIT, ROOT, DIVIDING, MI, M_MIN, stageMin, MEIOSIS, LILY, combos, bivalents, spermatocytesFor, recombinants, dna } from './calc.mjs';

export const V = {
  cycle: svgV(CYCLE_SVG, 'The cell cycle drawn as a wheel with G1, S, G2 and M phases and the G0 state'),
  dnagraph: svgV(DNAGRAPH, 'DNA per nucleus over two cell cycles'),
  flow: svgV(FLOW_SVG, 'Histogram of the DNA content of cells in a culture'),
  mitosis: svgV(MITOSIS, 'Interphase, prophase, metaphase, anaphase and telophase of mitosis in a cell with six chromosomes'),
  prophase: svgV(PROPHASE, 'The five substages of prophase I of meiosis'),
  meiosis: svgV(MEIOSIS_SVG, 'Meiosis I and II in a cell with four chromosomes'),
};

const g2m = FLOW.g2m;
const stages = ['prophase', 'metaphase', 'anaphase', 'telophase'];

export const deck1 = deck({
  part: 1,
  title: 'Cell Cycle and Cell Division — Part 1: The cell cycle and mitosis',
  goals: [
    'Describe the events of G1, S, G2 and M phases and the G0 stage; track the C-value and chromosome number through the cycle',
    'Draw and label the stages of mitosis and state its significance in growth and repair',
    'Work out phase durations, chromosome and chromatid counts, and a mitotic index from data',
  ],
  slides: [
    sl('title', 'The cell cycle and mitosis', {
      b: 'Part 1: how a cell prepares to divide, and how mitosis shares the copied chromosomes equally.',
      v: flow('LR', [['i', 'Interphase'], ['m', 'Mitosis'], ['c', 'Cytokinesis'], ['d', 'Two daughter cells']], [['i', 'm'], ['m', 'c'], ['c', 'd']], 'Path from interphase through mitosis and cytokinesis to two daughter cells'),
      n: 'A cell does not simply split. It first grows and copies its chromosomes in interphase, then divides its nucleus by mitosis and its cytoplasm by cytokinesis, producing two daughter cells.',
    }),
    sl('diagram', 'Phases of the cell cycle', {
      b: 'The cycle has **interphase** (**G1, S, G2**) and the **M phase**. Cells that stop dividing leave G1 for **G0**.',
      v: V.cycle,
      n: `In this culture the whole cycle takes twenty hours. Interphase is nearly all of it: nine hours in the first gap, seven hours for DNA synthesis, three and a half hours in the second gap. Mitosis takes only half an hour. Cells that stop dividing enter the resting state called G zero.`,
    }),
    sl('concept', 'Events of each phase', {
      b: 'Each phase has its own job.',
      v: table(['Phase', 'Main events'], [['G1', 'Cell grows and makes RNA, proteins and organelles; prepares for DNA replication'], ['S', 'DNA is replicated; each chromosome gets two chromatids; DNA amount doubles; chromosome number does not change; centrioles duplicate in animal cells'], ['G2', 'Growth continues; proteins for division, such as spindle proteins, are made; the copy is checked'], ['M', 'Mitosis divides the nucleus; cytokinesis divides the cytoplasm'], ['G0', 'Quiescent: cells are alive and active but are not preparing to divide']], 'Table of the events of the phases of the cell cycle'),
      n: 'In the first gap the cell grows and builds what it needs. In S phase the DNA is copied. In the second gap the cell makes the proteins needed for division. Then mitosis and cytokinesis follow. Cells in the resting stage are active but not dividing.',
    }),
    sl('diagram', 'C-value and chromosome number through the cycle', {
      b: 'The **C-value** is the amount of DNA in a haploid set. A cell in G1 has **2C**; after S phase it has **4C**; after division each daughter has **2C** again.',
      v: V.dnagraph,
      n: 'The DNA content stays at two C in the first gap, doubles to four C during S phase, stays there through the second gap and mitosis, and falls back to two C when the cell divides. The number of chromosomes does not change during S phase.',
    }),
    sl('example', 'Worked example 1: phase times from a histogram', {
      b: `A culture has a cycle of ${CYCLE_H} hours. A flow-cytometry count of ${N_FLOW} cells found ${FLOW.g1} cells with 2C of DNA, ${FLOW.s} cells between 2C and 4C, and ${g2m} cells with 4C. Find the time spent in each part of the cycle.`,
      ul: [
        `Time in a phase = (cells in that phase ÷ ${N_FLOW}) × ${CYCLE_H} hours.`,
        `G1: ${FLOW.g1} ÷ ${N_FLOW} × ${CYCLE_H} = ${hoursFromCount(FLOW.g1)} hours. S: ${FLOW.s} ÷ ${N_FLOW} × ${CYCLE_H} = ${hoursFromCount(FLOW.s)} hours.`,
        `Cells with 4C are in G2 or in mitosis: ${g2m} ÷ ${N_FLOW} × ${CYCLE_H} = ${hoursFromCount(g2m)} hours for G2 and M together.`,
      ],
      v: V.flow,
      n: 'Cells with the starting amount of DNA are in the first gap. Cells with between one and two times that amount are copying their DNA. Cells with double the amount are in the second gap or in mitosis. The share of cells in each group gives the share of time.',
    }),
    sl('check', 'Quick check: S phase', {
      b: 'What happens to the DNA content and to the chromosome number in S phase?',
      n: 'Quick check. What changes in S phase, and what does not?',
      chk: 'chk-s',
    }),
    sl('diagram', 'Stages of mitosis', {
      b: '**Karyokinesis** (division of the nucleus) has four stages: **prophase, metaphase, anaphase and telophase**; **cytokinesis** divides the cytoplasm.',
      v: V.mitosis,
      n: 'In prophase the chromosomes condense and the nuclear envelope breaks. In metaphase they line up on the equator. In anaphase the chromatids separate and move to opposite poles. In telophase two new nuclei form, and the cell then divides.',
    }),
    sl('concept', 'Events of mitosis', {
      b: 'Each stage has features that you should be able to draw.',
      v: table(['Stage', 'Events'], [['Prophase', 'Chromatin condenses into chromosomes of two chromatids; centrosomes move apart and the spindle forms; nucleolus and nuclear envelope disappear'], ['Metaphase', 'Chromosomes line up on the equatorial plate; spindle fibres attach to the kinetochores; best stage to count chromosomes'], ['Anaphase', 'Centromeres divide; chromatids separate and move to opposite poles'], ['Telophase', 'Chromosomes uncoil; nuclear envelope and nucleolus reappear'], ['Cytokinesis', 'Animal cell: a furrow pinches the cell; plant cell: a cell plate grows from the centre']], 'Table of the events of mitosis and cytokinesis'),
      n: 'Prophase builds the chromosomes and spindle. Metaphase lines them up, and anaphase pulls the chromatids apart. Telophase reverses prophase by rebuilding the nuclei. An animal cell is then pinched by a furrow, while a plant cell builds a cell plate.',
    }),
    sl('example', 'Worked example 2: counting chromosomes and chromatids', {
      b: `A mouse-like cell has ${MOUSE.n2} chromosomes and ${dna('G1')} picograms of DNA in its G1 nucleus. Find the chromosomes, chromatids and DNA in the cell at G2, metaphase, anaphase and in each daughter nucleus.`,
      ul: [
        `After S phase: ${MIT.G2.chromosomes} chromosomes, each of two chromatids, so ${MIT.G2.chromatids} chromatids; DNA = 2 × ${dna('G1')} = ${dna('G2')} picograms. The same holds at metaphase.`,
        `At anaphase the centromeres divide: each chromatid becomes a chromosome, so the whole cell has ${MIT.anaphase.chromosomes} chromosomes; DNA is still ${dna('anaphase')}.`,
        `Each daughter nucleus gets ${MIT.telophase.chromosomes} chromosomes (${MIT.telophase.chromatids} chromatids) and ${dna('telophase')} picograms.`,
      ],
      v: table(['Stage', 'Chromosomes', 'Chromatids', 'DNA (pg)'], [['G1', String(MIT.G1.chromosomes), String(MIT.G1.chromatids), String(dna('G1'))], ['G2 or metaphase', String(MIT.metaphase.chromosomes), String(MIT.metaphase.chromatids), String(dna('metaphase'))], ['Anaphase (whole cell)', String(MIT.anaphase.chromosomes), String(MIT.anaphase.chromatids), String(dna('anaphase'))], ['Each daughter', String(MIT.telophase.chromosomes), String(MIT.telophase.chromatids), String(dna('telophase'))]], 'Worked table: chromosomes, chromatids and DNA through mitosis'),
      n: 'S phase doubles the DNA and gives every chromosome two chromatids, but the number of chromosomes stays the same. At anaphase each chromatid counts as a chromosome, so the number doubles briefly. Each daughter cell receives the original number.',
    }),
    sl('check', 'Quick check: metaphase', {
      b: 'In which stage of mitosis are the chromosomes arranged on the equatorial plate?',
      n: 'Quick check. In which stage are the chromosomes lined up on the equator?',
      chk: 'chk-meta',
    }),
    sl('concept', 'Significance of mitosis', {
      b: 'Mitosis gives two daughter cells **genetically identical** to the parent cell.',
      v: table(['Role', 'Example'], [['Growth', 'A zygote becomes a many-celled body; roots and shoots lengthen'], ['Repair and replacement', 'Healing of a wound; replacement of skin and gut lining'], ['Constant chromosome number', 'Every body cell receives the full set of chromosomes'], ['Asexual reproduction', 'Unicellular organisms divide to form new individuals'], ['Balanced cell size', 'Division restores the ratio of nucleus to cytoplasm']], 'Table of the significance of mitosis'),
      n: 'Mitosis lets a body grow and repair itself. Because each daughter receives an exact copy of every chromosome, all the cells of the body have the same genetic information. It is also how single-celled organisms reproduce.',
    }),
    sl('example', 'Worked example 3: the mitotic index', {
      b: `In an onion root-tip squash, ${ROOT.total} cells were counted: ${ROOT.interphase} in interphase, ${ROOT.prophase} in prophase, ${ROOT.metaphase} in metaphase, ${ROOT.anaphase} in anaphase and ${ROOT.telophase} in telophase. The cell cycle takes ${ROOT.cycleH} hours. Find the mitotic index and the time spent in prophase.`,
      ul: [
        `Dividing cells = ${ROOT.prophase} + ${ROOT.metaphase} + ${ROOT.anaphase} + ${ROOT.telophase} = ${DIVIDING}. Mitotic index = ${DIVIDING} ÷ ${ROOT.total} × 100 = ${MI} percent.`,
        `Time in mitosis = ${MI} percent of ${ROOT.cycleH} hours = ${M_MIN} minutes.`,
        `Prophase: ${ROOT.prophase} ÷ ${DIVIDING} × ${M_MIN} = ${stageMin('prophase')} minutes, the longest stage because most dividing cells were in it.`,
      ],
      v: table(['Stage', 'Cells', 'Minutes'], stages.map((k) => [k[0].toUpperCase() + k.slice(1), String(ROOT[k]), String(stageMin(k))]), `Worked table: mitotic index ${MI} percent, prophase ${stageMin('prophase')} minutes`),
      n: 'The share of dividing cells is the mitotic index. The share of dividing cells found in a stage tells us the share of the time that the stage takes. Here prophase is the longest stage and anaphase the shortest.',
    }),
    sl('check', 'Quick check: mitotic index', {
      b: 'What does a high mitotic index in a tissue show?',
      n: 'Quick check. What does a high mitotic index tell us?',
      chk: 'chk-mi',
    }),
    sl('summary', 'Summary', {
      ul: [
        `Cell cycle: G1, S, G2 (interphase) and M; G0 is the resting state.`,
        'C-value: 2C in G1, 4C after S, 2C in each daughter; chromosome number unchanged in S phase.',
        'Mitosis: prophase, metaphase, anaphase, telophase, then cytokinesis; daughters are identical to the parent.',
        'Significance: growth, repair, constant chromosome number, asexual reproduction.',
      ],
      v: table(['Idea', 'Key point'], [['S phase', 'DNA doubles'], ['Metaphase', 'Chromosomes on the equator'], ['Anaphase', 'Chromatids move apart']], 'Summary table of key points'),
      n: 'To recap: interphase prepares the cell, S phase copies the DNA, mitosis shares it equally and cytokinesis divides the cytoplasm. The daughter cells are identical to the parent.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Draw **metaphase** and **anaphase** with spindle fibres and labelled chromosomes.',
        'Track **C-value, chromosomes and chromatids** at each stage.',
        'Say that **S phase doubles DNA but not the chromosome number**.',
        'Give **growth and repair** as the significance of mitosis.',
      ],
      n: 'Exam tips. Draw metaphase and anaphase with labels. Track the DNA amount, chromosomes and chromatids stage by stage. Remember that S phase doubles the DNA but not the chromosome number. And give growth and repair as the importance of mitosis.',
    }),
  ],
});

const mei = MEIOSIS;
export const deck2 = deck({
  part: 2,
  title: 'Cell Cycle and Cell Division — Part 2: Meiosis and its comparison with mitosis',
  goals: [
    'Describe the stages of meiosis, including the five substages of prophase I, synapsis and crossing over',
    'Explain how meiosis produces genetic variation',
    'Tabulate the differences between mitosis and meiosis',
  ],
  slides: [
    sl('title', 'Meiosis: halving the chromosome number', {
      b: 'Part 2: the special division that makes gametes, and how it differs from mitosis.',
      v: flow('LR', [['p', 'Parent cell, two n'], ['a', 'Meiosis one'], ['b', 'Meiosis two'], ['g', 'Four cells, n']], [['p', 'a'], ['a', 'b'], ['b', 'g']], 'Path from a diploid parent cell through meiosis I and II to four haploid cells'),
      n: 'Sexual reproduction needs cells with half the usual number of chromosomes. Meiosis achieves this with two divisions after a single copying of the DNA, so one parent cell gives four cells with half the number.',
    }),
    sl('diagram', 'Overview of meiosis', {
      b: '**Meiosis I** separates **homologous chromosomes** (reduction); **meiosis II** separates **sister chromatids** (like mitosis).',
      v: V.meiosis,
      n: 'After DNA replication, the cell divides twice. In the first division, the paired homologous chromosomes are pulled apart. In the second, the chromatids separate. Four cells result, each with half the chromosome number.',
    }),
    sl('diagram', 'Prophase I: five substages', {
      b: 'Prophase I is long and has five substages: **leptotene, zygotene, pachytene, diplotene** and **diakinesis**.',
      v: V.prophase,
      n: 'In leptotene the chromosomes appear as thin threads. In zygotene the homologous chromosomes pair, which is called synapsis. In pachytene crossing over takes place. In diplotene the homologues start to separate but stay joined at chiasmata. In diakinesis the chromosomes are most condensed.',
    }),
    sl('concept', 'Events of the substages', {
      b: 'Synapsis and crossing over are the key events of prophase I.',
      v: table(['Substage', 'Events'], [['Leptotene', 'Chromosomes become visible as long, thin threads'], ['Zygotene', '**Synapsis**: homologous chromosomes pair, forming **bivalents** with a synaptonemal complex'], ['Pachytene', 'Chromosomes thicken; **crossing over** exchanges segments between non-sister chromatids at recombination nodules'], ['Diplotene', 'Synaptonemal complex dissolves; homologues separate but stay joined at **chiasmata**'], ['Diakinesis', 'Chiasmata move to the ends (terminalisation); chromosomes fully condensed; nucleolus and nuclear envelope disappear']], 'Table of the five substages of prophase I'),
      n: 'Pairing in zygotene makes bivalents. Crossing over in pachytene swaps segments of non-sister chromatids. The crossing points show as chiasmata in diplotene, and in diakinesis the chromosomes are fully condensed and ready for the spindle.',
    }),
    sl('check', 'Quick check: synapsis', {
      b: 'In which substage of prophase I does synapsis take place?',
      n: 'Quick check. In which substage do homologous chromosomes pair?',
      chk: 'chk-zygo',
    }),
    sl('concept', 'The rest of meiosis', {
      b: 'After prophase I the stages resemble those of mitosis, but with important differences.',
      v: table(['Stage', 'Events'], [['Metaphase I', 'Bivalents line up on the equator; the kinetochores of homologues face opposite poles'], ['Anaphase I', 'Homologous chromosomes separate and move to the poles; centromeres do not divide'], ['Telophase I and cytokinesis', 'Two cells (a dyad), each with half the chromosome number'], ['Interkinesis', 'Short pause; no DNA replication'], ['Meiosis II', 'Prophase II, metaphase II, anaphase II (centromeres divide; chromatids separate) and telophase II give four haploid cells (a tetrad)']], 'Table of metaphase I to the end of meiosis II'),
      n: 'In anaphase one, whole chromosomes move apart, so each daughter cell gets one member of each pair. There is no DNA copying between the divisions. In the second division the chromatids separate, as in mitosis, giving four cells.',
    }),
    sl('example', 'Worked example 1: DNA and chromosomes through meiosis', {
      b: `A mouse-like cell has ${MOUSE.n2} chromosomes and ${MOUSE.c} picograms of DNA in G1. Track chromosomes, chromatids and DNA in the cell through meiosis.`,
      ul: [
        `After S phase: ${mei[1].chromosomes} chromosomes, ${mei[1].chromatids} chromatids and ${mei[1].dna} picograms. This holds through prophase I and metaphase I.`,
        `Meiosis I halves the chromosome number: each of the two cells has ${mei[2].chromosomes} chromosomes of two chromatids, with ${mei[2].dna} picograms.`,
        `Meiosis II separates the chromatids: each of the four cells has ${mei[4].chromosomes} chromosomes of one chromatid, with ${mei[4].dna} picograms, half the amount in G1.`,
      ],
      v: table(['Stage', 'Chromosomes', 'Chromatids', 'DNA (pg)', 'Cells'], mei.map((m) => [m.stage, String(m.chromosomes), String(m.chromatids), String(m.dna), String(m.cells)]), 'Worked table: chromosomes, chromatids and DNA through meiosis'),
      n: 'The number of chromosomes halves at the end of the first division, but each chromosome still has two chromatids. The DNA amount per cell falls to the G one value then. It halves again after the second division, so a gamete has half the DNA of a G one cell.',
    }),
    sl('concept', 'Significance of meiosis: variation', {
      b: 'Meiosis keeps the chromosome number constant from generation to generation and creates **genetic variation**.',
      v: table(['Source of variation', 'How it works'], [['Crossing over', 'Exchange of segments between non-sister chromatids gives new combinations of genes on a chromosome'], ['Independent assortment', 'Each bivalent lines up at random at metaphase I, so maternal and paternal chromosomes are shuffled'], ['Fertilisation', 'Random fusion of two different gametes'], ['Constant number', 'Halving at meiosis balances the doubling at fertilisation']], 'Table of the sources of variation in meiosis'),
      n: 'Crossing over mixes genes within a chromosome. The random lining up of the pairs mixes whole chromosomes. Random fertilisation adds further variety. Meiosis also stops the chromosome number from doubling every generation.',
    }),
    sl('example', 'Worked example 2: how many kinds of gamete?', {
      b: `A lily has ${LILY.n2} chromosomes in its body cells. Ignoring crossing over, how many different chromosome combinations can its gametes have, and how many for the zygotes from two such parents?`,
      ul: [
        `Bivalents = ${LILY.n2} ÷ 2 = ${bivalents(LILY.n2)}. Each bivalent can face either pole at anaphase I.`,
        `Gamete types = 2 multiplied by itself ${bivalents(LILY.n2)} times = ${combos(LILY.n2)}.`,
        `Zygote combinations = ${combos(LILY.n2)} × ${combos(LILY.n2)} = ${combos(LILY.n2) ** 2}. Crossing over increases the variety still further.`,
      ],
      v: table(['Quantity', 'Value'], [['Bivalents', String(bivalents(LILY.n2))], ['Gamete types', String(combos(LILY.n2))], ['Zygote combinations', String(combos(LILY.n2) ** 2)]], `Worked table: ${combos(LILY.n2)} gamete types`),
      n: 'Each pair of chromosomes can line up in either direction, so with twelve pairs there are two to the power twelve possible gametes. The combinations in the zygote are the square of that number. Crossing over adds even more variety.',
    }),
    sl('check', 'Quick check: anaphase I', {
      b: 'What separates at anaphase I of meiosis?',
      n: 'Quick check. What moves to the poles in anaphase one?',
      chk: 'chk-ana1',
    }),
    sl('concept', 'Mitosis and meiosis compared', {
      b: 'The two divisions differ in where, how often and how they divide.',
      v: table(['Feature', 'Mitosis', 'Meiosis'], [['Occurs in', 'Body cells and cells that divide to grow', 'Gamete mother cells in the reproductive organs'], ['Divisions', 'One', 'Two'], ['Daughter cells', 'Two, identical to the parent', 'Four, different from each other and the parent'], ['Chromosome number', 'Same as the parent (2n)', 'Halved (n)'], ['Pairing and crossing over', 'No synapsis, no crossing over', 'Synapsis in zygotene; crossing over in pachytene'], ['Prophase', 'Short; one kind', 'Long; five substages'], ['Role', 'Growth, repair, asexual reproduction', 'Gamete formation, variation']], 'Table of the differences between mitosis and meiosis'),
      n: 'Mitosis is a single division that copies a cell exactly. Meiosis is two divisions that halve the number and shuffle the genes. Only meiosis involves pairing of homologues and crossing over, and only meiosis makes cells that differ from each other.',
    }),
    sl('example', 'Worked example 3: counting sperm and recombinants', {
      b: `A male needs to make 600 sperm. (a) How many primary spermatocytes must divide, and how many secondary spermatocytes form? (b) In 500 gametes from meioses in which 40 percent had one crossover between two genes, how many gametes are recombinant?`,
      ul: [
        `(a) One primary spermatocyte gives four sperm: ${600} ÷ 4 = ${spermatocytesFor(600)} primary spermatocytes; each makes two secondary spermatocytes: ${spermatocytesFor(600) * 2}.`,
        `(b) A meiosis with one crossover gives two parental and two recombinant gametes, so half of its gametes are recombinant: 0.4 × ½ × 500 = ${recombinants(0.4, 500)}.`,
      ],
      v: table(['Question', 'Answer'], [['Primary spermatocytes', String(spermatocytesFor(600))], ['Secondary spermatocytes', String(spermatocytesFor(600) * 2)], ['Recombinant gametes', String(recombinants(0.4, 500))]], 'Worked table: spermatocyte and recombinant counts'),
      n: 'Each primary cell gives four sperm, so divide the number of sperm by four. For recombinants, a crossover makes half of the gametes of that meiosis recombinant, so multiply the share of meioses with a crossover by one half.',
    }),
    sl('check', 'Quick check: comparison', {
      b: 'How many daughter cells does one meiotic division sequence produce, and with what chromosome number?',
      n: 'Quick check. How many cells does meiosis produce, and how do they compare with the parent?',
      chk: 'chk-diff',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Meiosis: two divisions after one S phase; meiosis I separates homologues, meiosis II separates chromatids; four haploid cells.',
        'Prophase I: leptotene, zygotene (synapsis), pachytene (crossing over), diplotene (chiasmata), diakinesis.',
        'Variation: crossing over, independent assortment and fertilisation.',
        'Mitosis: one division, two identical cells, same number; meiosis: two divisions, four different cells, half the number.',
      ],
      v: table(['Idea', 'Key point'], [['Synapsis', 'Pairing of homologues in zygotene'], ['Crossing over', 'Exchange in pachytene'], ['Meiosis I', 'Reduction division']], 'Summary table of key points'),
      n: 'To recap: meiosis halves the chromosome number in its first division and separates chromatids in its second. Prophase one has five substages with synapsis and crossing over, and the result is variation.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Name the **five substages** of prophase I in order, with the key event of each.',
        'State that **synapsis** is pairing and **crossing over** is exchange between non-sister chromatids.',
        'Explain **how meiosis produces variation**.',
        'Tabulate **mitosis against meiosis** with at least five points.',
      ],
      n: 'Exam tips. Name the five substages of prophase one in order. Define synapsis and crossing over. Explain how meiosis gives variation. And compare mitosis with meiosis in a table of at least five points.',
    }),
  ],
});
void SHARE;
void INTERPHASE_H;
void CYCLE;
