// ISC 11 Biology ch12 Cell Cycle and Cell Division — question bank in the ISC school-examination style. Numbers come from calc.mjs.
// AR keys (ISC options): c a b d. Deck 'check' items: chk-s, chk-meta, chk-mi, chk-zygo, chk-ana1, chk-diff (not used in tests).
import { mk, add, svgV, r } from '../../isc-11-biology-ch01/src/lib.mjs';
import { FLOW_L, MITOSIS_L, PROPHASE_L } from './svgs.mjs';
import { MOUSE, MITOSIS as MIT, MEIOSIS, LILY, combos, bivalents, spermatocytesFor, hoursFromCount, cellsAfter, DOUBLING_H, dna, pct, GARLIC, G_DIV, G_MI, G_M_MIN, gStage, FLOW, recombinants } from './calc.mjs';

const { mcq, ar, fill, num, short, long, part } = mk;
const flowFig = svgV(FLOW_L, 'Histogram of DNA content with regions A, B and C marked');
const mitFig = svgV(MITOSIS_L, 'Five cells with six chromosomes marked A to E');
const proFig = svgV(PROPHASE_L, 'Five stages of prophase I marked A to E');

// ---------------------------------------------------------------- deck check items
add('chk-s', mcq({
  stem: 'What happens to the DNA content and to the chromosome number of a cell during S phase?',
  right: 'The DNA content doubles but the chromosome number stays the same',
  wrong: ['Both the DNA content and the chromosome number double', 'The DNA content stays the same and the chromosome number doubles', 'The DNA content halves and the chromosome number halves'],
  sol: 'Replication doubles the DNA and gives each chromosome two chromatids; the chromosomes are not increased in number — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('chk-meta', mcq({
  stem: 'In which stage of mitosis are the chromosomes arranged on the equatorial plate?',
  right: 'Metaphase',
  wrong: ['Prophase', 'Anaphase', 'Telophase'],
  sol: 'Chromosomes line up on the equator at metaphase — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('chk-mi', mcq({
  stem: 'What does a high mitotic index in a tissue show?',
  right: 'A large share of its cells is dividing',
  wrong: ['Its cells are all in G0', 'Its cells have more chromosomes than normal', 'Its cells are not dividing'],
  sol: 'The mitotic index is the percentage of dividing cells — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('chk-zygo', mcq({
  stem: 'In which substage of prophase I does synapsis take place?',
  right: 'Zygotene',
  wrong: ['Leptotene', 'Pachytene', 'Diplotene'],
  sol: 'Homologous chromosomes pair in zygotene — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('chk-ana1', mcq({
  stem: 'What separates and moves to the poles at anaphase I of meiosis?',
  right: 'Homologous chromosomes',
  wrong: ['Sister chromatids', 'Nucleoli', 'Centrioles'],
  sol: 'Meiosis I separates homologues; chromatids stay together until meiosis II — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('chk-diff', mcq({
  stem: 'How many cells does one complete meiosis produce from one parent cell, and how does their chromosome number compare with the parent’s?',
  right: 'Four cells, each with half the number',
  wrong: ['Two cells, each with the same number', 'Four cells, each with the same number', 'Two cells, each with half the number'],
  sol: 'Two divisions give four haploid cells — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- t01 cell cycle
add('flow-s-mcq', mcq({
  stem: 'In the histogram, which letter marks the cells that are in S phase?',
  right: 'B',
  wrong: ['A', 'C', 'None of them'],
  sol: 'Cells between 2C and 4C are copying their DNA — option (@K).',
  d: 2, c: 'understanding', t: [1], assets: [flowFig],
}));
add('flow-c-mcq', mcq({
  stem: 'In the same histogram, the cells under peak C could be in',
  right: 'G2 or in mitosis',
  wrong: ['G1 only', 'S phase only', 'G0 only'],
  sol: 'Cells with double the G1 amount of DNA are in G2 or M — option (@K).',
  d: 2, c: 'application', t: [1], assets: [flowFig],
}));
add('cval-mcq', mcq({
  stem: `A nucleus of a mouse-like cell with ${MOUSE.n2} chromosomes contains ${dna('G2')} picograms of DNA, whereas its G1 nucleus has ${dna('G1')} picograms. The nucleus is most probably in`,
  right: 'G2 or metaphase of mitosis',
  wrong: ['G1', 'a gamete', 'G0'],
  sol: `${dna('G2')} is twice the G1 value, so the DNA has been replicated and not yet shared — option (@K).`,
  d: 2, c: 'application', t: [1],
}));
add('g0-mcq', mcq({
  stem: 'A mature lymphocyte stays alive and active for months without dividing, but divides rapidly when it meets its antigen. Before contact it is best described as being in',
  right: 'G0, having left the cell cycle',
  wrong: ['S phase', 'G2', 'metaphase'],
  sol: 'A cell that is not dividing but can re-enter the cycle is in G0 — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('block-mcq', mcq({
  stem: 'A drug prevents cells from starting DNA replication. After a day in the drug, most cells of a culture would be found in',
  right: 'G1',
  wrong: ['S phase', 'G2', 'anaphase'],
  sol: 'Cells cannot enter S phase and so accumulate in G1 — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('s-ar', ar({
  a: 'The DNA content of a nucleus doubles during S phase.',
  r: 'The number of chromosomes in the nucleus doubles during S phase.',
  key: 'c',
  sol: 'The assertion is true, but the reason is false: the chromosome number is unchanged because each chromosome only gains a second chromatid — option (c).',
  d: 3, c: 'analysis', t: [1],
}));
add('cval-fill', fill({
  stem: 'The amount of DNA in a haploid set of chromosomes is called its ______-value.',
  acc: [['C', 'c']],
  sol: 'C.',
  d: 1, c: 'recall', t: [1],
}));
add('g2-reason', short({
  marks: 1,
  stem: 'Give a reason: A G2 cell has the same number of chromosomes as a G1 cell but twice the DNA.',
  model: 'In S phase each chromosome is **replicated into two chromatids** that stay joined at the centromere, so the DNA doubles but the chromosomes are not separated or increased.',
  sol: 'Chromatids joined.',
  scheme: [['Replicated chromatids still joined, one chromosome', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('g1-analogy', short({
  marks: 1,
  stem: 'Complete the analogy: G1 : cell growth :: S : ______',
  model: '**DNA replication**.',
  sol: 'DNA replication.',
  scheme: [['DNA replication', 1]],
  wl: [1, 10],
  d: 1, c: 'recall', t: [1],
}));
add('hours-num', num({
  stem: 'In a culture with a 24-hour cycle, a flow-cytometry count of 2000 cells found 500 of them between 2C and 4C. For how many hours does a cell spend in S phase?',
  value: hoursFromCount(500, 2000, 24), tol: 0.1, unit: 'hours',
  sol: r`$\dfrac{500}{2000} \times 24 = ${hoursFromCount(500, 2000, 24)}$ hours.`,
  scheme: [[`${hoursFromCount(500, 2000, 24)}`, 1]],
  d: 3, c: 'application', t: [1],
}), (q) => q.answer.value === 6 || 'value');
add('cells-num', num({
  stem: `Five cells are placed in a nutrient medium. Each cell divides by mitosis once every ${DOUBLING_H} hours and none dies. How many cells are there after 24 hours?`,
  value: cellsAfter(24, 5), tol: 0, unit: null,
  sol: r`$24 \div ${DOUBLING_H} = 6$ divisions; $5 \times 2^6 = ${cellsAfter(24, 5)}$ cells.`,
  scheme: [[`${cellsAfter(24, 5)}`, 1]],
  d: 3, c: 'application', t: [1],
}), (q) => q.answer.value === 320 || 'value');
add('phases-short2', short({
  marks: 2,
  stem: 'Name the three phases of interphase and state one main event in each.',
  model: '**G1**: the cell grows and makes proteins and organelles. **S**: the **DNA is replicated**, so every chromosome has two chromatids. **G2**: growth continues and proteins needed for division, such as those of the spindle, are made.',
  sol: 'G1, S, G2 with events.',
  scheme: [['G1 and S with events', 1], ['G2 with event', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('cvalue-short2', short({
  marks: 2,
  stem: 'A diploid cell has 2C of DNA in G1. State its C-value after S phase and in each daughter cell after mitosis, and say what happens to the chromosome number in S phase.',
  model: 'After S phase the cell has **4C**; each daughter cell after mitosis has **2C** again. In S phase the **chromosome number does not change**, because the DNA is copied into chromatids that remain attached.',
  sol: '4C; 2C; unchanged.',
  scheme: [['4C and 2C', 1], ['Chromosome number unchanged in S', 1]],
  d: 2, c: 'application', t: [1],
}));
add('g0-short2', short({
  marks: 2,
  stem: 'What is the G0 stage? State two features of a cell in it.',
  model: 'G0 is the **quiescent stage**, in which a cell has **left the cell cycle** after G1. The cell is **alive and metabolically active** but **does not divide** (it may re-enter the cycle when stimulated).',
  sol: 'Definition; two features.',
  scheme: [['Definition', 1], ['Two features', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('s-short3', short({
  marks: 3,
  stem: 'A student says that “everything doubles in S phase”. State what does double, what does not, and why the cell still has the same number of chromosomes.',
  model: 'In S phase the **DNA content doubles** (2C to 4C) and the **number of chromatids doubles**, because each chromosome is replicated. The **number of chromosomes does not double**, since the two identical chromatids of each chromosome remain joined at the **centromere** and are counted as one chromosome. So the student’s statement is wrong for the chromosome number.',
  sol: 'DNA and chromatids double; chromosomes do not.',
  scheme: [['DNA and chromatids double', 1], ['Chromosome number unchanged', 1], ['Joined at the centromere', 1]],
  d: 3, c: 'application', t: [1],
}));
add('cycle-long', mk.long({
  stem: '(a) Name the phases of the cell cycle and state one event of each phase of interphase. [2]\n(b) Describe how the DNA content (C-value) of a diploid cell changes through one cycle, from G1 to the two daughter cells. [2]\n(c) What is meant by G0? [1]',
  model: '(a) The cycle has **G1, S, G2** (interphase) and **M** (mitosis and cytokinesis). **G1**: growth and synthesis of proteins; **S**: DNA replication; **G2**: preparation for division.\n\n(b) A G1 cell has **2C**; the DNA is replicated in S phase so it rises to **4C**, which stays through G2 and mitosis until the cell divides; each daughter cell then has **2C** again. The chromosome number does not change in S phase.\n\n(c) **G0** is the **resting stage** into which a cell may leave the cell cycle from G1; the cell is alive but not dividing.',
  sol: 'Phases; C-value; G0.',
  scheme: [['(a) Phases and events', 2], ['(b) 2C, 4C, 2C', 2], ['(c) G0', 1]],
  wl: [60, 200],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 mitosis
add('mit-ana-mcq', mcq({
  stem: 'In the figure, which letter shows a cell in anaphase?',
  right: 'A',
  wrong: ['B', 'C', 'D'],
  sol: 'A shows chromatids moving to opposite poles — option (@K).',
  d: 1, c: 'recall', t: [2], assets: [mitFig],
}));
add('mit-nuc-mcq', mcq({
  stem: 'In the same figure, in which cell is the nuclear envelope re-forming around two groups of chromosomes?',
  right: 'C',
  wrong: ['A', 'D', 'E'],
  sol: 'C is in telophase — option (@K).',
  d: 2, c: 'understanding', t: [2], assets: [mitFig],
}));
add('mit-chromatids-mcq', mcq({
  stem: 'In the same figure, how many chromatids are present in cell D, which has six chromosomes lined up on the equator?',
  right: '12',
  wrong: ['6', '3', '24'],
  sol: 'Each of the six chromosomes has two chromatids at metaphase — option (@K).',
  d: 2, c: 'application', t: [2], assets: [mitFig],
}));
add('mit-e-mcq', mcq({
  stem: 'In the same figure, cell E has condensed double chromosomes scattered in the cytoplasm. Which statement about E is correct?',
  right: 'It is in prophase: the nucleolus and nuclear envelope have disappeared.',
  wrong: ['It is in G1: the DNA has not been replicated.', 'It is in anaphase: the chromatids have separated.', 'It is in telophase: the envelope has re-formed.'],
  sol: 'Condensed double chromosomes with no envelope mean prophase (late) — option (@K).',
  d: 3, c: 'analysis', t: [2], assets: [mitFig],
}));
add('kineto-mcq', mcq({
  stem: 'Spindle fibres pull the chromosomes apart at anaphase. They are attached to each chromosome at',
  right: 'the kinetochores on the centromere',
  wrong: ['the ends of the chromatids', 'the nucleolus', 'the nuclear pores'],
  sol: 'Fibres attach to the kinetochores — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('plantcyto-mcq', mcq({
  stem: 'A student watching a dividing onion root-tip cell sees a plate growing outwards from the middle of the cell. This shows that',
  right: 'cytokinesis is under way in a plant cell',
  wrong: ['an animal cell is dividing by a furrow', 'the cell is in metaphase', 'the DNA is being replicated'],
  sol: 'A cell plate forms the new wall between daughter plant cells — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('meta-count-mcq', mcq({
  stem: `A lily cell has ${LILY.n2} chromosomes. At metaphase of mitosis how many chromatids does it contain?`,
  right: String(LILY.n2 * 2),
  wrong: [String(LILY.n2), String(LILY.n2 / 2), String(LILY.n2 * 4)],
  sol: `Each of the ${LILY.n2} chromosomes has two chromatids: ${LILY.n2 * 2} — option (@K).`,
  d: 2, c: 'application', t: [2],
}));
add('telo-mcq', mcq({
  stem: 'Which event takes place in telophase of mitosis?',
  right: 'The chromosomes uncoil and the nuclear envelope and nucleolus reappear',
  wrong: ['The chromosomes condense and the nucleolus disappears', 'The centromeres divide', 'The chromosomes line up on the equator'],
  sol: 'Telophase reverses the changes of prophase — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('onion-mcq', mcq({
  stem: 'An onion root-tip cell has 16 chromosomes. How many chromosomes does each daughter nucleus receive after mitosis?',
  right: '16',
  wrong: ['8', '32', '4'],
  sol: 'Mitosis gives each daughter nucleus the full set — option (@K).',
  d: 1, c: 'application', t: [2],
}));
add('mit-ar', ar({
  a: 'The two daughter cells formed by mitosis are genetically identical to the parent cell.',
  r: 'The chromatids that separate at anaphase are exact copies made in the S phase.',
  key: 'a',
  sol: 'Both are true, and the identical chromatids explain the identical daughters — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('meta-reason', short({
  marks: 1,
  stem: 'Give a reason: Metaphase is the best stage for counting the chromosomes of a cell.',
  model: 'The chromosomes are **fully condensed** and lie **in one plane on the equator**, so they are easy to see and count.',
  sol: 'Condensed and in one plane.',
  scheme: [['Condensed and on the equator', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('cytok-analogy', short({
  marks: 1,
  stem: 'Complete the analogy: Animal cell : furrow :: Plant cell : ______',
  model: '**Cell plate**.',
  sol: 'Cell plate.',
  scheme: [['Cell plate', 1]],
  wl: [1, 10],
  d: 1, c: 'recall', t: [2],
}));
add('anaphase-num', num({
  stem: `A mouse-like cell has ${MOUSE.n2} chromosomes. How many chromosomes does the whole cell contain at anaphase of mitosis, counting each separated chromatid as a chromosome?`,
  value: MIT.anaphase.chromosomes, tol: 0, unit: null,
  sol: r`${MOUSE.n2} chromosomes of two chromatids give $2 \times ${MOUSE.n2} = ${MIT.anaphase.chromosomes}$ separated chromatids, each a chromosome.`,
  scheme: [[`${MIT.anaphase.chromosomes}`, 1]],
  d: 3, c: 'application', t: [2],
}), (q) => q.answer.value === 80 || 'value');
add('mi-num', num({
  stem: 'In a squash of 250 root-tip cells, 40 are found in some stage of mitosis. Calculate the mitotic index as a percentage.',
  value: pct(40, 250, 0), tol: 0.5, unit: '%',
  sol: r`$\dfrac{40}{250} \times 100 = ${pct(40, 250, 0)}$ percent.`,
  scheme: [[`${pct(40, 250, 0)}`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 16 || 'value');
add('signif-short2', short({
  marks: 2,
  stem: 'State two ways in which mitosis is important to a plant and one way in which it is important to a unicellular organism.',
  model: 'In a plant mitosis allows **growth** (for example lengthening of roots and shoots) and **repair or replacement** of damaged cells, and it keeps the **chromosome number** the same in all cells. In a unicellular organism mitosis is the means of **asexual reproduction**.',
  sol: 'Two plant roles; one unicellular role.',
  scheme: [['Two roles in plants', 1], ['Role in a unicellular organism', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('meta-ana-short3', short({
  marks: 3,
  stem: 'Describe what happens to the chromosomes and to the spindle fibres at metaphase and at anaphase of mitosis.',
  model: 'At **metaphase** the chromosomes line up on the **equatorial plate**, each attached by its **kinetochores** to spindle fibres from **opposite poles**. At **anaphase** the **centromeres divide**, so the two chromatids of each chromosome separate, and the fibres **shorten** and pull the chromatids, now chromosomes, to **opposite poles**.',
  sol: 'Alignment; centromere division; movement.',
  scheme: [['Chromosomes on the equator, fibres attached', 1], ['Centromeres divide', 1], ['Chromatids pulled to poles', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('signif-short3', short({
  marks: 3,
  stem: 'A burn on the skin heals within a few weeks. Explain which kind of cell division is responsible, why the new cells are suitable replacements, and what makes the daughter cells identical.',
  model: '**Mitosis** of the cells at the edge of the wound makes new cells. They are suitable replacements because each daughter cell receives the **same number of chromosomes and the same genes** as the parent. This is because the DNA is **replicated in S phase** and the **chromatids separate equally at anaphase**.',
  sol: 'Mitosis; identical; replication and separation.',
  scheme: [['Mitosis', 1], ['Same chromosomes and genes', 1], ['Replication then equal separation', 1]],
  d: 2, c: 'application', t: [2],
}));
add('chrcount-short3', short({
  marks: 3,
  stem: `A lily cell has ${LILY.n2} chromosomes. Give the number of chromosomes and of chromatids in the cell at G1, at metaphase and in each daughter nucleus after mitosis.`,
  model: `At **G1** the cell has **${LILY.n2} chromosomes** and **${LILY.n2} chromatids** (one each). At **metaphase** it has **${LILY.n2} chromosomes** and **${LILY.n2 * 2} chromatids**. Each **daughter nucleus** has **${LILY.n2} chromosomes** and **${LILY.n2} chromatids**.`,
  sol: '24 and 24; 24 and 48; 24 and 24.',
  scheme: [['G1', 1], ['Metaphase', 1], ['Daughter nucleus', 1]],
  wl: [30, 80],
  d: 2, c: 'application', t: [2],
}), () => LILY.n2 * 2 === 48 || 'count');
add('mitosis-long', mk.long({
  stem: '(a) Draw labelled diagrams of metaphase and anaphase in an animal cell with four chromosomes. [2]\n(b) State what happens to the centromeres and chromatids at anaphase. [1]\n(c) State two ways in which mitosis is significant to a many-celled organism. [2]',
  model: '(a) **Metaphase diagram:** four chromosomes, each of two chromatids, on the **equatorial plate**, with **spindle fibres** from the two **centrosomes** attached to the **kinetochores**. **Anaphase diagram:** two groups of four chromatids (now chromosomes), V-shaped with the **centromeres leading**, moving towards opposite **poles**.\n\n(b) The **centromeres divide**, the **sister chromatids separate**, and each moves to an opposite pole.\n\n(c) Mitosis allows **growth** of the body and **repair or replacement** of cells; it also keeps the **chromosome number constant** in every body cell.',
  sol: 'Diagrams; centromere division; significance.',
  scheme: [['(a) Metaphase and anaphase with labels', 2], ['(b) Centromeres divide, chromatids separate', 1], ['(c) Two roles', 2]],
  wl: [60, 200],
  d: 2, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 meiosis
add('pro-a-mcq', mcq({
  stem: 'In the figure of prophase I, which letter shows the substage in which crossing over takes place?',
  right: 'A',
  wrong: ['B', 'C', 'D'],
  sol: 'A shows four thick paired chromatids with a recombination nodule: pachytene — option (@K).',
  d: 2, c: 'understanding', t: [3], assets: [proFig],
}));
add('pro-d-mcq', mcq({
  stem: 'In the same figure, in which letter is synapsis in progress?',
  right: 'D',
  wrong: ['B', 'C', 'E'],
  sol: 'D shows two homologues paired along part of their length: zygotene — option (@K).',
  d: 2, c: 'understanding', t: [3], assets: [proFig],
}));
add('pro-order-mcq', mcq({
  stem: 'In the same figure, which sequence of letters lists the substages in the order in which they occur, earliest first?',
  right: 'B, D, A, E, C',
  wrong: ['B, A, D, E, C', 'D, B, A, C, E', 'B, D, E, A, C'],
  sol: 'Leptotene (B), zygotene (D), pachytene (A), diplotene (E), diakinesis (C) — option (@K).',
  d: 4, c: 'analysis', t: [3], assets: [proFig],
}));
add('pro-c-mcq', mcq({
  stem: 'In the same figure, the bivalent in C is compact and its chiasmata have moved to the ends. This movement is called',
  right: 'terminalisation',
  wrong: ['synapsis', 'interkinesis', 'recombination'],
  sol: 'Terminalisation of chiasmata marks diakinesis — option (@K).',
  d: 2, c: 'understanding', t: [3], assets: [proFig],
}));
add('chiasma-mcq', mcq({
  stem: 'In diplotene the homologous chromosomes begin to move apart but remain attached at X-shaped points. These points mark',
  right: 'the places where crossing over took place',
  wrong: ['the centromeres', 'the nucleolar organisers', 'the spindle poles'],
  sol: 'Chiasmata mark the sites of crossing over — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('crossover-mcq', mcq({
  stem: 'One chromosome of a pair carries genes A and B and its homologue carries a and b. After a single crossover between the genes, the four chromatids carry',
  right: 'AB, Ab, aB and ab',
  wrong: ['AB, AB, ab and ab', 'AB, AB, aB and aB', 'Ab, Ab, ab and ab'],
  sol: 'Two chromatids are unchanged (AB and ab) and two are recombinant (Ab and aB) — option (@K).',
  d: 3, c: 'application', t: [3],
}), () => recombinants(1, 400) === 200 || 'count');
add('var-mcq', mcq({
  stem: `A lily has ${LILY.n2} chromosomes in its body cells. Ignoring crossing over, the number of different chromosome combinations its gametes can have is`,
  right: String(combos(LILY.n2)),
  wrong: [String(LILY.n2 * 2), String(bivalents(LILY.n2) ** 2), String(LILY.n2 ** 2)],
  sol: `${bivalents(LILY.n2)} bivalents each face either pole: 2^${bivalents(LILY.n2)} = ${combos(LILY.n2)} — option (@K).`,
  d: 3, c: 'application', t: [3],
}), () => combos(LILY.n2) === 4096 || 'combos');
add('gam-mcq', mcq({
  stem: `A lily cell has ${LILY.n2} chromosomes. How many chromosomes does each gamete formed by meiosis contain?`,
  right: String(LILY.n2 / 2),
  wrong: [String(LILY.n2), String(LILY.n2 * 2), String(LILY.n2 / 4)],
  sol: `Meiosis halves the number: ${LILY.n2 / 2} — option (@K).`,
  d: 1, c: 'application', t: [3],
}));
add('anaI-mcq', mcq({
  stem: `In a mouse-like cell with ${MOUSE.n2} chromosomes, how many chromosomes does each cell contain at the end of meiosis I?`,
  right: String(MEIOSIS[2].chromosomes),
  wrong: [String(MOUSE.n2), String(MOUSE.n2 * 2), String(MEIOSIS[2].chromosomes / 2)],
  sol: `Homologues separate, so each cell has ${MEIOSIS[2].chromosomes}, each of two chromatids — option (@K).`,
  d: 2, c: 'application', t: [3],
}));
add('cross-ar', ar({
  a: 'Meiosis I is called the reductional division.',
  r: 'Homologous chromosomes pair during zygotene.',
  key: 'b',
  sol: 'Both are true, but pairing is not the reason: meiosis I is reductional because the homologues separate and the number is halved — option (b).',
  d: 3, c: 'analysis', t: [3],
}));
add('mei1-ar', ar({
  a: 'The centromeres divide at anaphase I of meiosis.',
  r: 'A full S phase takes place during interkinesis.',
  key: 'd',
  sol: 'Both are false: the centromeres divide at anaphase II, and there is no DNA replication in interkinesis — option (d).',
  d: 3, c: 'analysis', t: [3],
}));
add('mei2-reason', short({
  marks: 1,
  stem: 'Give a reason: Meiosis II is called an equational division.',
  model: 'In meiosis II the **sister chromatids separate**, as in mitosis, so the **chromosome number does not change** from the cells that enter it.',
  sol: 'Chromatids separate; number unchanged.',
  scheme: [['Chromatids separate, number unchanged', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('pachy-analogy', short({
  marks: 1,
  stem: 'Complete the analogy: Zygotene : synapsis :: Pachytene : ______',
  model: '**Crossing over**.',
  sol: 'Crossing over.',
  scheme: [['Crossing over', 1]],
  wl: [1, 10],
  d: 1, c: 'recall', t: [3],
}));
add('gam-num', num({
  stem: 'A lily has 24 chromosomes in its body cells. Ignoring crossing over, how many kinds of gametes can one plant produce?',
  value: combos(LILY.n2), tol: 0, unit: null,
  sol: r`$24 \div 2 = ${bivalents(LILY.n2)}$ bivalents; $2^{${bivalents(LILY.n2)}} = ${combos(LILY.n2)}$.`,
  scheme: [[`${combos(LILY.n2)}`, 1]],
  d: 3, c: 'application', t: [3],
}), (q) => q.answer.value === 4096 || 'value');
add('sperm-num', num({
  stem: 'A male needs to produce 800 sperm. How many primary spermatocytes must complete meiosis?',
  value: spermatocytesFor(800), tol: 0, unit: null,
  sol: r`Each primary spermatocyte gives four sperm: $800 \div 4 = ${spermatocytesFor(800)}$.`,
  scheme: [[`${spermatocytesFor(800)}`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => q.answer.value === 200 || 'value');
add('synapsis-short2', short({
  marks: 2,
  stem: 'Define synapsis and name the substage of prophase I in which it occurs.',
  model: '**Synapsis** is the **pairing of homologous chromosomes** along their length to form **bivalents**, held by a synaptonemal complex. It occurs in the **zygotene** substage of prophase I.',
  sol: 'Pairing of homologues; zygotene.',
  scheme: [['Definition', 1], ['Zygotene', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('crossing-short2', short({
  marks: 2,
  stem: 'What is crossing over? Name the chromatids involved and the substage in which it takes place.',
  model: '**Crossing over** is the **exchange of segments** between **non-sister chromatids** of homologous chromosomes. It takes place in the **pachytene** substage of prophase I and produces new combinations of genes.',
  sol: 'Exchange; non-sister chromatids; pachytene.',
  scheme: [['Exchange between non-sister chromatids', 1], ['Pachytene', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('mei2-short2', short({
  marks: 2,
  stem: 'State two ways in which meiosis II resembles mitosis, and name the cells it produces.',
  model: 'In meiosis II, as in mitosis, the **centromeres divide** and **sister chromatids separate**, and the **chromosome number does not change**. It produces **four haploid cells**, called a **tetrad**, from the two cells of the dyad.',
  sol: 'Two likenesses; four haploid cells.',
  scheme: [['Two resemblances', 1], ['Four haploid cells', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('inter-short2', short({
  marks: 2,
  stem: 'What is interkinesis? State two features of it.',
  model: '**Interkinesis** is the **short pause between meiosis I and meiosis II**. It has **no DNA replication**, and the chromosomes may uncoil slightly while the two cells of the dyad prepare for the second division.',
  sol: 'Pause; no DNA replication.',
  scheme: [['Definition', 1], ['Two features', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('substage-short3', short({
  marks: 3,
  stem: 'Describe what happens to the chromosomes in leptotene, zygotene and pachytene of prophase I.',
  model: 'In **leptotene** the chromosomes appear as long, **thin threads**. In **zygotene** the homologous chromosomes **pair (synapsis)** to form bivalents. In **pachytene** the chromosomes become **thick**, each bivalent shows four chromatids, and **crossing over** takes place between non-sister chromatids at recombination nodules. These three substages come before diplotene and diakinesis, when the chromosomes separate and condense fully.',
  sol: 'Three substages.',
  scheme: [['Leptotene', 1], ['Zygotene', 1], ['Pachytene', 1]],
  d: 2, c: 'recall', t: [3],
}));
add('diplo-short3', short({
  marks: 3,
  stem: 'Describe diplotene and diakinesis, and name the structure that shows where crossing over took place.',
  model: 'In **diplotene** the synaptonemal complex dissolves and the homologues begin to **separate**, but they stay joined at **chiasmata**, which show where crossing over took place. In **diakinesis** the chiasmata move to the ends (**terminalisation**), the chromosomes are **fully condensed**, and the **nucleolus and nuclear envelope disappear**.',
  sol: 'Diplotene, chiasmata; diakinesis.',
  scheme: [['Diplotene events', 1], ['Chiasmata', 1], ['Diakinesis events', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('variation-short3', short({
  marks: 3,
  stem: 'Explain two ways in which meiosis produces genetic variation among gametes, and say what fertilisation adds.',
  model: '**Crossing over** in pachytene exchanges segments between non-sister chromatids, giving **new combinations of genes**. **Independent assortment** at metaphase I lets each bivalent line up at random, so the **maternal and paternal chromosomes are shuffled** into the gametes. **Fertilisation** adds more variety because any male gamete may fuse with any female gamete.',
  sol: 'Crossing over; assortment; fertilisation.',
  scheme: [['Crossing over', 1], ['Independent assortment', 1], ['Random fertilisation', 1]],
  d: 2, c: 'application', t: [3],
}));
add('fert-short3', short({
  marks: 3,
  stem: 'Explain, using chromosome numbers, why the chromosome number of a species stays constant from generation to generation although two gametes fuse at fertilisation.',
  model: 'Each gamete is **haploid (n)** because meiosis **halves** the chromosome number of the gamete mother cell. At fertilisation, two haploid gametes fuse to form a **diploid zygote (2n)**. If gametes were formed by mitosis they would be 2n and the number would **double in every generation**, but meiosis **restores balance**.',
  sol: 'Halving at meiosis balances doubling at fertilisation.',
  scheme: [['Gametes haploid by meiosis', 1], ['Zygote diploid', 1], ['Otherwise doubling each generation', 1]],
  d: 3, c: 'application', t: [3],
}));
add('spermato-short3', short({
  marks: 3,
  stem: `A primary spermatocyte of a mouse-like species has ${MOUSE.n2} chromosomes. State the number of cells and of chromosomes in each cell at the end of meiosis I and at the end of meiosis II.`,
  model: `At the end of **meiosis I** there are **two** cells (secondary spermatocytes), each with **${MEIOSIS[2].chromosomes} chromosomes**, each of two chromatids. At the end of **meiosis II** there are **four** cells (spermatids), each with **${MEIOSIS[4].chromosomes} chromosomes**, each of a single chromatid.`,
  sol: 'Two cells with 20; four cells with 20.',
  scheme: [['Two cells at the end of meiosis I', 1], ['20 chromosomes of two chromatids', 1], ['Four cells with 20 single chromatids', 1]],
  d: 3, c: 'application', t: [3],
}), () => MEIOSIS[2].chromosomes === 20 || 'count');
add('prophase-long', mk.long({
  stem: '(a) Name, in order, the five substages of prophase I of meiosis. [1]\n(b) Describe the events of pachytene and diplotene. [2]\n(c) Draw a labelled diagram of a bivalent showing two chiasmata. [2]',
  model: '(a) **Leptotene, zygotene, pachytene, diplotene and diakinesis.**\n\n(b) In **pachytene** the paired chromosomes are thick, four chromatids are visible and **crossing over** exchanges segments between non-sister chromatids at recombination nodules. In **diplotene** the synaptonemal complex dissolves and the homologues begin to separate but remain joined at **chiasmata**.\n\n(c) **Diagram:** two homologous chromosomes, each of **two chromatids**, separating but held together at **two X-shaped chiasmata**, with the **centromeres** labelled.',
  sol: 'Order; two substages; diagram.',
  scheme: [['(a) Five names in order', 1], ['(b) Pachytene and diplotene', 2], ['(c) Labelled bivalent with chiasmata', 2]],
  wl: [50, 200],
  d: 3, c: 'application', t: [3],
}));
add('meiosis-long', mk.long({
  stem: '(a) State what separates at anaphase I and at anaphase II of meiosis. [1]\n(b) Explain how the chromosome number is halved, using a cell with six chromosomes. [2]\n(c) Explain how meiosis produces genetic variation. [2]',
  model: '(a) At **anaphase I** the **homologous chromosomes** separate; at **anaphase II** the **sister chromatids** separate.\n\n(b) A cell with **six chromosomes** replicates its DNA once, then divides **twice**. In **meiosis I** one member of each homologous pair goes to each pole, so each cell receives **three chromosomes** (each of two chromatids); **meiosis II** separates the chromatids, so the four cells each have **three chromosomes**.\n\n(c) **Crossing over** gives new gene combinations on chromosomes, and **independent assortment** of the bivalents at metaphase I shuffles maternal and paternal chromosomes; random fertilisation adds more.',
  sol: 'Separation; halving; variation.',
  scheme: [['(a) Homologues; chromatids', 1], ['(b) One of each pair, two divisions', 2], ['(c) Crossing over and assortment', 2]],
  wl: [60, 200],
  d: 3, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 mitosis versus meiosis
add('diff-mcq', mcq({
  stem: 'A cell with 12 chromosomes divides and gives four cells, each with 6 chromosomes, and no two of the cells are genetically alike. The division is',
  right: 'meiosis',
  wrong: ['mitosis', 'binary fission of a bacterium', 'cytokinesis alone'],
  sol: 'Four unlike cells with half the number come from meiosis — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('diff-where-mcq', mcq({
  stem: 'A student examines a root tip and an anther of the same plant for dividing cells. Which statement is correct?',
  right: 'Mitosis is seen in the root tip and meiosis in the pollen mother cells of the anther.',
  wrong: ['Meiosis is seen in the root tip and mitosis in the anther.', 'Only mitosis is seen in both.', 'Only meiosis is seen in both.'],
  sol: 'Root-tip cells divide for growth by mitosis; pollen mother cells make gametes by meiosis — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('diff-short2', short({
  marks: 2,
  stem: 'Give two differences in the prophase and in the daughter cells between mitosis and meiosis.',
  model: 'The **prophase** of mitosis is **short** and has no substages, while the prophase of meiosis I is **long** with five substages including synapsis and crossing over. Mitosis gives **two** daughter cells that are **identical** to the parent, whereas meiosis gives **four** cells that are **haploid and different**.',
  sol: 'Prophase; daughter cells.',
  scheme: [['Prophase difference', 1], ['Daughter cells difference', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('diff-short3', short({
  marks: 3,
  stem: 'A cell biologist has slides of a root tip and of an anther. Tabulate three differences between the divisions seen in them.',
  model: 'The **root tip** shows **mitosis** and the **anther** shows **meiosis**.\n\n| Feature | Mitosis | Meiosis |\n|---|---|---|\n| Divisions | One | Two |\n| Chromosome number of daughters | Same (2n) | Half (n) |\n| Pairing and crossing over | Absent | Present |',
  sol: 'Table of three differences.',
  scheme: [['Types named', 1], ['Any two differences', 2]],
  d: 2, c: 'application', t: [4],
}));
add('diff-long', mk.long({
  stem: '(a) A cell has 2n = 8. State the number of cells formed, and their chromosome number, after one mitosis and after one complete meiosis. [2]\n(b) Tabulate three further differences between mitosis and meiosis. [2]\n(c) State one similarity. [1]',
  model: '(a) **Mitosis:** **two** cells, each with **8 chromosomes** (2n). **Meiosis:** **four** cells, each with **4 chromosomes** (n).\n\n(b) | Feature | Mitosis | Meiosis |\n|---|---|---|\n| Occurs in | Body cells | Gamete mother cells |\n| Synapsis and crossing over | Absent | Present |\n| Variation | Daughters identical | Daughters different |\n\n(c) Both are **preceded by DNA replication in S phase** and both use a **spindle**.',
  sol: 'Numbers; three differences; similarity.',
  scheme: [['(a) Cells and numbers for both', 2], ['(b) Three differences', 2], ['(c) One similarity', 1]],
  wl: [50, 200],
  d: 2, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- stimulus cases
{
  const rows = ['prophase', 'metaphase', 'anaphase', 'telophase'].map((k) => `| ${k[0].toUpperCase() + k.slice(1)} | ${GARLIC[k]} |`).join('\n');
  add('garlic-case', mk.case({
    passage: `A squash of a garlic root tip was stained and 500 cells were counted: ${GARLIC.interphase} were in interphase and the others in the stages below. The cell cycle of this tissue is ${GARLIC.cycleH} hours long.\n\n| Stage | Cells |\n|---|---|\n${rows}`,
    d: 3, c: 'analysis',
    children: [
      part('a', num({
        stem: 'Calculate the mitotic index as a percentage.',
        value: G_MI, tol: 0.1, unit: '%',
        sol: r`Dividing cells $= ${G_DIV}$; $\dfrac{${G_DIV}}{${GARLIC.total}} \times 100 = ${G_MI}$ percent.`,
        scheme: [[`${G_MI}`, 1]],
        d: 2, c: 'application', t: [2],
      })),
      part('b', mcq({
        stem: 'Which stage of mitosis is the longest in this tissue, and why?',
        right: 'Prophase, because the largest share of the dividing cells is in it.',
        wrong: ['Anaphase, because it has the fewest cells.', 'Metaphase, because the chromosomes are most visible.', 'Telophase, because new walls form.'],
        sol: `Prophase has ${GARLIC.prophase} of the ${G_DIV} dividing cells — option (@K).`,
        d: 3, c: 'analysis', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'Calculate how many minutes a cell spends in mitosis in this tissue.',
        model: `Mitosis takes ${G_MI} percent of the ${GARLIC.cycleH}-hour cycle: 0.14 × ${GARLIC.cycleH} × 60 = **${G_M_MIN} minutes**.`,
        sol: '134.4 minutes.',
        scheme: [['Use of the mitotic index', 1], ['134.4 minutes', 1]],
        wl: [8, 50],
        d: 3, c: 'application', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'Calculate how many minutes a cell spends in prophase in this tissue.',
          model: `Prophase has ${GARLIC.prophase} of ${G_DIV} dividing cells, so it takes ${GARLIC.prophase} ÷ ${G_DIV} × ${G_M_MIN} = **${gStage('prophase')} minutes**.`,
          sol: '76.8 minutes.',
          scheme: [['Share of dividing cells in prophase', 1], ['76.8 minutes', 1]],
          wl: [8, 50],
          d: 3, c: 'application', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[0].answer.value === 14 || 'value');
}
{
  add('sperm-case', mk.case({
    passage: `In a mouse-like species with ${MOUSE.n2} chromosomes, the DNA per nucleus was measured (picograms) at four stages of sperm formation: a spermatogonium in G1, ${dna('G1')}; a primary spermatocyte after S phase, ${dna('G2')}; a secondary spermatocyte, ${MEIOSIS[2].dna}; a spermatid, ${MEIOSIS[4].dna}.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which statement explains the fall in DNA from the primary to the secondary spermatocyte?',
        right: 'Homologous chromosomes separated at meiosis I, so each cell has half the DNA.',
        wrong: ['The DNA was destroyed during interkinesis.', 'Sister chromatids separated at meiosis I.', 'The chromosomes were replicated again.'],
        sol: 'Anaphase I separates homologues, halving the DNA per cell — option (@K).',
        d: 3, c: 'application', t: [3],
      })),
      part('b', num({
        stem: 'How many chromosomes does a secondary spermatocyte contain?',
        value: MEIOSIS[2].chromosomes, tol: 0, unit: null,
        sol: r`Meiosis I halves ${MOUSE.n2} to $${MEIOSIS[2].chromosomes}$ chromosomes.`,
        scheme: [[`${MEIOSIS[2].chromosomes}`, 1]],
        d: 2, c: 'application', t: [3],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain why the spermatid has half the DNA of the spermatogonium in G1.',
        model: 'The spermatid is **haploid**: the DNA was replicated once but the cell divided **twice**, and meiosis II **separated the sister chromatids**, so each cell received **one chromatid** of each chromosome.',
        sol: 'One replication, two divisions.',
        scheme: [['One replication but two divisions', 1], ['Chromatids separated in meiosis II', 1]],
        wl: [8, 50],
        d: 3, c: 'analysis', t: [3],
      }), [
        short({
          marks: 2,
          stem: 'The spermatid is later changed into a sperm. State the DNA in a sperm and in the zygote formed with an egg of the same species.',
          model: `The sperm has **${MEIOSIS[4].dna} picograms** (haploid). The zygote receives the same amount from the egg, so it has **${MEIOSIS[4].dna * 2} picograms**, the diploid G1 amount of ${dna('G1')}.`,
          sol: '3.2; 6.4.',
          scheme: [['Sperm 3.2', 1], ['Zygote 6.4', 1]],
          wl: [8, 50],
          d: 3, c: 'application', t: [3],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 20 || 'value');
}
void FLOW;
