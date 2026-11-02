// ch10 Cell Cycle and Cell Division — question bank. AR keys: b c a d a d.
import { mk, add, r, svgV } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { N, DNA, HUMAN, YEAST_MIN, PHASES, round, cellsAfter, mitoticIndex, timeFromCount, interphasePct, bivalents, haploidCells, meiocytesFor } from './calc.mjs';
import { MITOSIS_LETTERED, PROPHASE_I_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;

// ---------------------------------------------------------------- t01 the cell cycle
add('interphase-mcq', mcq({
  stem: 'A time-lapse film of cultured cells shows each cell sitting quietly and slowly enlarging for hours, with only a brief burst of visible chromosome movement before it splits in two. What is a cell doing during the long quiet hours?',
  right: 'It is metabolically active: growing and preparing for division, including copying its DNA',
  wrong: ['It is completely inactive and waits for the M phase', 'It is carrying out karyokinesis very slowly', 'It is dividing its cytoplasm gradually'],
  sol: 'The quiet period is interphase (G1, S and G2): the cell grows, replicates its DNA and makes proteins for mitosis, so it is far from resting — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('sphase-mcq', mcq({
  stem: 'A researcher gives a culture a radioactive building block of DNA for ten minutes, then washes it away. Afterwards, the nuclei of only some of the cells are found to be labelled. The labelled cells had been in',
  right: 'S phase, when DNA was being replicated',
  wrong: ['G1 phase, when the cell was growing', 'G2 phase, when proteins for mitosis were made', 'M phase, when the chromosomes were separating'],
  sol: 'Only cells that were copying DNA during the ten minutes could take in the label; DNA replication is the event of S phase — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('g2block-mcq', mcq({
  stem: 'A drug stops cells from making the proteins needed to build the spindle. Treated cells finish DNA replication normally but never begin mitosis. In which phase will they be held?',
  right: 'G2 phase',
  wrong: ['G1 phase', 'G0, the quiescent stage', 'Metaphase of the M phase'],
  sol: 'Proteins for mitosis are made in G2, after S phase and before the M phase; with the S phase complete and mitosis not started, the cells are held in G2 — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('g0-mcq', mcq({
  stem: 'A mature heart muscle cell stays alive and metabolically active for decades without dividing. This state is best described as',
  right: 'a quiescent stage, G0, entered by leaving G1',
  wrong: ['a very long S phase', 'an arrested M phase', 'a permanent G2 phase'],
  sol: 'Cells that do not divide further exit G1 for the quiescent stage G0, in which they remain metabolically active — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('dnag2-mcq', mcq({
  stem: 'A cell has 9.6 pg of DNA in its G1 nucleus and 2n = 16. Which description fits the nucleus of the same cell in G2?',
  right: `${DNA.G2} pg of DNA and 16 chromosomes`,
  wrong: [`${DNA.G2} pg of DNA and 32 chromosomes`, `${DNA.G1} pg of DNA and 32 chromosomes`, `${DNA.G1} pg of DNA and 16 chromosomes`],
  sol: 'S phase doubles the DNA (9.6 to 19.2 pg) by making sister chromatids, but each pair of chromatids stays joined at one centromere, so the chromosome number is still 16 — option (@K).',
  d: 2, c: 'application', t: [1],
}), (q) => DNA.G2 === 19.2 || 'dna');
add('plateau-mcq', mcq({
  stem: `Measurements on a cell line show DNA per nucleus rising from 2C to 4C over ${PHASES[1][1]} hours, staying at 4C for ${PHASES[2][1] + PHASES[3][1]} more hours, then falling to 2C in each daughter cell. The ${PHASES[2][1] + PHASES[3][1]}-hour plateau at 4C is made up of`,
  right: 'G2 phase and the M phase',
  wrong: ['G1 phase and S phase', 'S phase and G2 phase', 'G1 phase and the M phase'],
  sol: 'The rise is S phase. DNA stays at 4C through G2 and through mitosis, and falls only when the cell divides at the end of the M phase — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('centriole-mcq', mcq({
  stem: 'During which part of the cell cycle of an animal cell does the centriole duplicate, and where?',
  right: 'In S phase, in the cytoplasm',
  wrong: ['In G1 phase, inside the nucleus', 'In prophase, inside the nucleus', 'In telophase, in the cytoplasm'],
  sol: 'While DNA replicates in the nucleus during S phase, the centriole duplicates in the cytoplasm — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('chromS-tf', tf({
  stem: 'During S phase the number of chromosomes in a nucleus doubles, from 2n to 4n.',
  key: 'f',
  sol: 'False. DNA content doubles (2C to 4C) but the sister chromatids stay joined at one centromere, so the number of chromosomes stays 2n.',
  d: 2, c: 'understanding', t: [1],
}));
add('g1-fill', fill({
  stem: 'The phase of the cell cycle between the end of mitosis and the start of DNA replication is called the ______ phase.',
  acc: [['G1', 'G 1', 'gap 1', 'first gap', 'G one']],
  sol: 'G1 (gap 1).',
  d: 1, c: 'recall', t: [1],
}));
add('sphase-ar', ar({
  a: 'The chromosome number of a G2 nucleus is the same as that of the G1 nucleus of the same cell.',
  r: 'In most cells the interphase lasts much longer than the M phase.',
  key: 'b',
  sol: 'Both statements are true, but the length of interphase does not explain the chromosome number: it stays 2n because the sister chromatids remain joined at one centromere — option (b).',
  d: 2, c: 'understanding', t: [1],
}));
add('beancells-num', num({
  stem: 'The root-tip cells of a seedling each divide once every 12 hours. Starting from one cell, and assuming every cell keeps dividing, how many cells will there be after 3 days?',
  value: N.bean3d,
  sol: r`3 days $= 72$ hours, so $\dfrac{72}{12} = 6$ cycles, and $2^{6} = ${N.bean3d}$ cells.`,
  scheme: [['6 cycles', 0.5], [`${N.bean3d} cells`, 0.5]],
  d: 2, c: 'application', t: [1],
}), (q) => cellsAfter(72, 12) === 64 || 'value');
add('divisions-num', num({
  stem: 'A fertilised egg divides by mitosis and every cell divides at the same rate. How many rounds of mitosis are needed to make an embryo of 256 cells?',
  value: N.divisions256,
  sol: r`Cells double each round: $2^{n} = 256$, so $n = ${N.divisions256}$ rounds.`,
  scheme: [[`${N.divisions256} rounds`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => 2 ** q.answer.value === 256 || 'value');
add('stime-num', num({
  stem: `A culture whose cells are all at different stages has a cell cycle of 16 hours. In a count of 1200 cells, 450 are found to be in S phase. How many hours does S phase last?`,
  value: N.sTime, unit: 'hours',
  sol: r`The share of cells in a phase equals the share of the cycle spent in it: $\dfrac{450}{1200} \times 16 = ${N.sTime}$ hours.`,
  scheme: [['Share of cells equals share of time', 0.5], [`${N.sTime} hours`, 0.5]],
  d: 3, c: 'application', t: [1],
}), (q) => timeFromCount(450, 1200, 16) === 6 || 'value');
add('interpct-num', num({
  stem: 'A cell line has a cycle of 18 hours, of which the M phase lasts 45 minutes. What percentage of the cycle is interphase? (Answer to one decimal place.)',
  value: N.interph18, tol: 0.1, unit: 'percent',
  sol: r`M phase $= 0.75$ h, so interphase $= 18 - 0.75 = 17.25$ h and $\dfrac{17.25}{18} \times 100 = ${N.interph18}$ percent (to one decimal place).`,
  scheme: [['Interphase time 17.25 h', 0.5], [`About ${N.interph18} percent`, 0.5]],
  d: 2, c: 'application', t: [1],
}), (q) => interphasePct(18, 0.75) === 95.8 || 'value');
add('phases-short', short({
  marks: 2,
  stem: 'Name the three phases of interphase and state one event that takes place in each.',
  model: '**G1:** the cell grows and is metabolically active, but does not replicate its DNA. **S:** DNA is replicated, so its amount doubles (the chromosome number stays the same), and the centriole duplicates in animal cells. **G2:** proteins needed for mitosis are made and growth continues.',
  sol: 'G1, S, G2 with one event each.',
  scheme: [['Three phases named', 1], ['One event for each phase', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('g0-short', short({
  marks: 2,
  stem: 'What is the quiescent stage (G0)? Give two features of cells in it.',
  model: 'G0 is an **inactive stage that cells enter by leaving G1** when they do not divide further. Cells in G0 stay **metabolically active** but **do not proliferate** unless called on to do so by the needs of the organism; some, like heart cells, remain there, while others can re-enter the cycle.',
  sol: 'Definition; active but non-dividing; may re-enter.',
  scheme: [['Exit from G1 into an inactive stage', 1], ['Metabolically active, not dividing, can re-enter', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('dnasphase-short', short({
  marks: 3,
  stem: 'A cell in G2 is described as having 4C DNA but 2n chromosomes. Explain how both statements can be true, and say what happened in S phase to make them so.',
  model: 'In **S phase** every chromosome is **replicated**, so the DNA doubles from 2C to 4C. The two copies stay attached as **sister chromatids**, held together at a single **centromere**. Chromosomes are counted by their centromeres, so the **number remains 2n** although each chromosome now has two chromatids. The chromatids separate only later, at anaphase of mitosis.',
  sol: 'Replication makes sister chromatids at one centromere.',
  scheme: [['S phase replicates DNA: 2C to 4C', 1], ['Chromatids stay joined at one centromere', 1], ['Chromosomes counted by centromeres; 2n unchanged', 1]],
  d: 3, c: 'analysis', t: [1],
}));
add('cycle-long', long({
  stem: 'Describe the cell cycle, giving the phases of interphase with the events of each, the duration of the cycle in human cells, and the quiescent stage.',
  model: 'The **cell cycle** is the sequence of events by which a cell duplicates its genome, synthesises other constituents and divides into two. It has **interphase** and the **M phase**. In human cells in culture a cycle takes about **24 hours**, of which the M phase is only about **1 hour**; interphase is therefore over **95 percent** of the cycle.\n\nInterphase has three phases. In **G1** the cell grows and is metabolically active but does not replicate DNA. In **S phase** DNA replicates, its amount doubling from 2C to 4C while the chromosome number stays 2n; in animal cells the centriole duplicates in the cytoplasm. In **G2** proteins are made for mitosis and growth continues.\n\nCells that do not divide further exit G1 into the **quiescent stage (G0)**: they remain metabolically active but do not proliferate unless called on to do so.',
  sol: 'Phases and events; timing; G0.',
  scheme: [['Definition and two parts of the cycle', 1], ['Timing: 24 h, M about 1 h', 1], ['G1, S and G2 events', 2], ['G0', 1]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 mitosis
add('prophaseend-mcq', mcq({
  stem: 'A student looking at a dividing cell sees condensed chromosomes, each of two chromatids, but no nucleolus, no nuclear envelope and no Golgi complex. Spindle fibres are present but the chromosomes are not yet in a line. Which stage is this?',
  right: 'Late prophase',
  wrong: ['Telophase', 'Metaphase', 'Interphase'],
  sol: 'By the end of prophase the nucleolus, nuclear envelope, Golgi complex and endoplasmic reticulum have disappeared; alignment on the plate marks metaphase, so the cell is in late prophase — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('metaphase-mcq', mcq({
  stem: 'A cytogeneticist wants to count and examine the shape of the chromosomes in a root-tip squash. At which stage of mitosis are they most suitable for this?',
  right: 'Metaphase, when they are fully condensed on the plate',
  wrong: ['Prophase, when they first condense', 'Telophase, when they decondense', 'Interphase, when they replicate'],
  sol: 'At metaphase the chromosomes are fully condensed and aligned at the metaphase plate, which makes this the best stage for studying their number and morphology — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('kineto-mcq', mcq({
  stem: 'During metaphase the spindle fibres are attached to each chromosome at',
  right: 'the kinetochores at the centromere',
  wrong: ['the ends of the chromatid arms', 'the nucleolar organiser', 'the nuclear envelope'],
  sol: 'Spindle fibres attach to the kinetochores, disc-shaped structures at the centromere of each chromosome — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('anaphase-mcq', mcq({
  stem: 'A fruit-fly cell has 2n = 8. Just after the centromeres split at anaphase of mitosis, how many chromosomes does the whole cell hold?',
  right: String(N.fly.anaphase[0]),
  wrong: ['8', '4', '32'],
  sol: `Before the split there were 8 chromosomes of two chromatids each (${N.fly.metaphase[1]} chromatids). Once the centromeres split, each chromatid is a chromosome, so the cell holds ${N.fly.anaphase[0]} — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => N.fly.anaphase[0] === 16 || 'count');
add('chromatids-mcq', mcq({
  stem: 'Garden pea has 2n = 14. How many chromatids are present in a cell at metaphase of mitosis?',
  right: String(N.peaMit.metaphase[1]),
  wrong: ['14', '7', '56'],
  sol: `At metaphase there are 14 chromosomes, each with two chromatids: 14 × 2 = ${N.peaMit.metaphase[1]} — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => N.peaMit.metaphase[1] === 28 || 'count');
add('telophase-mcq', mcq({
  stem: 'Which set of events marks telophase of mitosis?',
  right: 'Chromosomes decondense at the poles, and the nuclear envelope, nucleolus, Golgi complex and ER reform',
  wrong: ['Centromeres split and chromatids move to the poles', 'Chromosomes align on the equator with spindle fibres at their kinetochores', 'Chromosomes condense and the centrosomes move apart'],
  sol: 'Telophase is the reverse of prophase: chromosomes reach the poles and decondense, and the nuclear envelope and the other structures reform — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('cellplate-mcq', mcq({
  stem: 'In a dividing plant cell, the cell plate that grows outwards from the centre eventually becomes',
  right: 'the middle lamella between the two new cells',
  wrong: ['the nuclear envelope of the daughter cells', 'the plasma membrane of the parent cell', 'a ring of microtubules that holds the chromosomes'],
  sol: 'The cell plate represents the middle lamella between the walls of the two daughter cells; wall materials are then laid down on it — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('syncytium-mcq', mcq({
  stem: 'A student examines the liquid endosperm of a tender coconut and finds many nuclei lying in one mass of cytoplasm. This arrangement arises because',
  right: 'karyokinesis was repeatedly not followed by cytokinesis',
  wrong: ['cytokinesis occurred without any karyokinesis', 'the nuclei were produced by meiosis', 'the cell plate formed but failed to meet the cell wall'],
  sol: 'When karyokinesis is not followed by cytokinesis, a multinucleate syncytium results, as in the liquid endosperm of coconut — option (@K).',
  d: 2, c: 'application', t: [2],
}));
{
  const lettered = svgV(MITOSIS_LETTERED, 'Five labelled stages of mitosis and cytokinesis in an animal cell with four chromosomes, in scrambled order');
  add('mitlet-mcq', mcq({
    stem: 'The figure shows five stages of mitosis and cytokinesis in a cell with four chromosomes, drawn in scrambled order. In which cell are the chromosomes lined up on the metaphase plate with spindle fibres at their centromeres?',
    right: 'B',
    wrong: ['A', 'D', 'E'],
    sol: 'Only cell B has its chromosomes in a line at the equator, each attached to spindle fibres from both poles: metaphase. A is telophase, C is cytokinesis, D prophase and E anaphase — option (@K).',
    assets: [lettered], d: 2, c: 'application', t: [2],
  }));
}
add('mitorder-mcq', mcq({
  stem: 'Using the same figure (cells A to E, drawn in scrambled order), which sequence lists the stages in the order in which they occur, earliest first?',
  right: 'D, B, E, A, C',
  wrong: ['B, D, E, A, C', 'A, B, C, D, E', 'D, E, B, A, C'],
  sol: 'D is prophase, B metaphase, E anaphase, A telophase and C cytokinesis, so the order is D, B, E, A, C — option (@K).',
  assets: [svgV(MITOSIS_LETTERED, 'Five labelled stages of mitosis and cytokinesis in an animal cell with four chromosomes, in scrambled order')],
  d: 3, c: 'analysis', t: [2],
}));
add('notmitosis-mcq', mcq({
  stem: 'Which of the following is not a function of mitosis in a flowering plant?',
  right: 'Formation of haploid pollen grains from pollen mother cells',
  wrong: ['Growth in length of a root tip', 'Replacement of damaged cells in a stem', 'Production of new cells by the apical meristem'],
  sol: 'Haploid pollen grains arise by meiosis of pollen mother cells; growth, repair and meristem activity are produced by mitosis — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('nucratio-mcq', mcq({
  stem: 'A single-celled alga grows until its cytoplasm is very large for its one nucleus, and then divides. Which role of mitosis does this illustrate?',
  right: 'Restoring the nucleo-cytoplasmic ratio',
  wrong: ['Repair of a damaged tissue', 'Increase in genetic variability', 'Halving of the chromosome number'],
  sol: 'When a cell outgrows the control of its nucleus, division restores the balance between nucleus and cytoplasm; mitosis neither halves the number nor creates variation — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('spindle-mcq', mcq({
  stem: 'A chemical prevents spindle fibres from forming but does not stop DNA replication or chromosome condensation. After several hours, dividing cells treated with it would pile up with',
  right: 'condensed chromosomes that cannot be pulled to the poles, so the cell cannot complete anaphase',
  wrong: ['uncondensed chromosomes still in interphase', 'two complete nuclei but no cell wall', 'chromosomes that have reached the poles and decondensed'],
  sol: 'Without a spindle the chromosomes still condense but cannot be aligned and pulled apart, so the cell is held before anaphase — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('mitosis-ar', ar({
  a: 'Mitosis gives two daughter nuclei that are genetically identical to the parent nucleus.',
  r: 'Homologous chromosomes pair and exchange segments in prophase of mitosis.',
  key: 'c',
  sol: 'A is true: each chromosome is replicated and its chromatids are shared out equally. R is false: pairing and exchange happen only in prophase I of meiosis — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('plantcyto-ar', ar({
  a: 'A plant cell divides its cytoplasm by forming a cell plate rather than a furrow.',
  r: 'A plant cell is enclosed by a rigid cell wall outside its plasma membrane.',
  key: 'a',
  sol: 'Both statements are true, and the rigid wall prevents the membrane from simply pinching in, so a cell plate grows outwards from the centre instead — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('nucmeta-ar', ar({
  a: 'At metaphase of mitosis the nuclear envelope is still intact around the chromosomes.',
  r: 'Spindle fibres attach to the kinetochores of the chromosomes at metaphase.',
  key: 'd',
  sol: 'A is false: the nuclear envelope has already disappeared by the end of prophase. R is true: spindle fibres attach to the kinetochores at metaphase — option (d).',
  d: 3, c: 'understanding', t: [2],
}));
add('equational-tf', tf({
  stem: 'Mitosis is called an equational division because each daughter cell receives the same chromosome number as the parent cell.',
  key: 't',
  sol: 'True. A diploid parent cell gives two diploid daughter cells, so the chromosome number is the same.',
  d: 1, c: 'recall', t: [2],
}));
add('centromere-fill', fill({
  stem: 'At anaphase of mitosis the ______ of each chromosome splits, and the chromatids move to opposite poles.',
  acc: [['centromere', 'the centromere']],
  sol: 'Centromere.',
  d: 1, c: 'recall', t: [2],
}));
add('mitosis-match', match({
  stem: 'Match each stage of mitosis (column I) with its key event (column II).',
  pairs: [
    ['Prophase', 'Chromosomes condense and the asters move to opposite poles'],
    ['Metaphase', 'Chromosomes lie on the equatorial plane with spindle fibres at their kinetochores'],
    ['Anaphase', 'Centromeres split and chromatids move to opposite poles'],
    ['Telophase', 'Chromosomes decondense and the nuclear envelope reforms at each pole'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Prophase: condensation and aster movement; metaphase: alignment on the plate; anaphase: centromere splitting and movement of chromatids; telophase: decondensation and reformation of the envelope.',
  d: 1, c: 'recall', t: [2],
}));
add('mitoidx-num', num({
  stem: 'In a squash of onion root tip, 350 cells are counted and 28 of them are in some stage of mitosis. What is the mitotic index, in percent?',
  value: N.mi350, unit: 'percent',
  sol: r`Mitotic index $= \dfrac{28}{350} \times 100 = ${N.mi350}$ percent.`,
  scheme: [['Formula', 0.5], [`${N.mi350} percent`, 0.5]],
  d: 1, c: 'application', t: [2],
}), (q) => mitoticIndex(28, 350) === 8 || 'value');
add('maizechromatids-num', num({
  stem: 'Maize has 2n = 20. How many chromatids are present in one cell at the metaphase of mitosis?',
  value: N.maize.prophaseI[1],
  sol: r`There are 20 chromosomes, each of two chromatids: $20 \times 2 = ${N.maize.prophaseI[1]}$.`,
  scheme: [[`${N.maize.prophaseI[1]} chromatids`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 40 || 'value');
add('cytok-short', short({
  marks: 2,
  stem: 'Differentiate between cytokinesis in an animal cell and in a plant cell.',
  model: 'In an **animal cell** a **furrow** appears in the plasma membrane and deepens **from the edge inwards** until the cytoplasm is cut in two. In a **plant cell**, enclosed by a rigid wall, a **cell plate** forms in the **centre** and grows **outwards** to meet the side walls; it becomes the middle lamella between the new cells.',
  sol: 'Furrow versus cell plate.',
  scheme: [['Animal: furrow, edge to centre', 1], ['Plant: cell plate, centre to edge, middle lamella', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('metaanaph-short', short({
  marks: 2,
  stem: 'Why is metaphase the stage chosen to count chromosomes, and what happens at the next stage to the chromosome numbers?',
  model: 'At **metaphase** the chromosomes are **fully condensed** and lie in one plane at the **metaphase plate**, so their number and shape are easiest to see. At **anaphase** the **centromeres split** and the chromatids, now chromosomes, move to opposite poles, so the **number of chromosomes in the cell doubles** temporarily.',
  sol: 'Condensed and aligned; doubling at anaphase.',
  scheme: [['Metaphase: condensed and aligned on the plate', 1], ['Anaphase: centromeres split; number doubles in the cell', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('syncytium-short', short({
  marks: 2,
  stem: 'What is a syncytium? Explain how it forms, with one example.',
  model: 'A **syncytium** is a **multinucleate cell**. It forms when **karyokinesis is not followed by cytokinesis**, so the nuclei produced by repeated nuclear divisions remain in one common cytoplasm. An example is the **liquid endosperm of coconut**.',
  sol: 'Karyokinesis without cytokinesis.',
  scheme: [['Multinucleate; karyokinesis without cytokinesis', 1.5], ['Example: coconut liquid endosperm', 0.5]],
  d: 2, c: 'understanding', t: [2],
}));
add('sigmitosis-short', short({
  marks: 2,
  stem: 'State two ways in which mitosis is important to a multicellular organism, with an example of each.',
  model: 'Mitosis is responsible for **growth**: a zygote becomes a multicellular body by repeated mitosis. It also **replaces and repairs cells**, as in the skin or the lining of the intestine, and in plants **meristems divide** to add new cells throughout life. In each case the daughter cells are **genetically identical** to the parent.',
  sol: 'Two roles with examples.',
  scheme: [['First role with example', 1], ['Second role with example', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('prophasemit-short', short({
  marks: 3,
  stem: 'Describe the events of prophase of mitosis, including what has disappeared from the cell by its end.',
  model: 'Prophase follows S and G2 phases. The chromosomal material **condenses**, so each chromosome shows **two chromatids joined at the centromere**. The **centrosome**, which duplicated in S phase, begins to move to **opposite poles** and radiates **microtubules** (asters); these with the spindle fibres form the mitotic apparatus. By the end of prophase the **Golgi complex, endoplasmic reticulum, nucleolus and nuclear envelope have disappeared**.',
  sol: 'Condensation, centrosomes, disappearance of structures.',
  scheme: [['Condensation; two chromatids at the centromere', 1], ['Centrosomes to the poles, asters and spindle', 1], ['Structures that disappear', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('nucratio-short', short({
  marks: 3,
  stem: 'A growing cell is dividing by mitosis. State what is meant by the nucleo-cytoplasmic ratio, why it matters, and how mitosis keeps it in balance.',
  model: 'The **nucleo-cytoplasmic ratio** is the ratio of the volume of the nucleus to that of the cytoplasm. A nucleus can regulate only a limited volume of cytoplasm, so as a cell **grows** the ratio falls and the cell **loses efficient control**. **Mitosis restores the ratio**: each division gives two cells with their own nucleus and a smaller volume of cytoplasm, so the balance between nucleus and cytoplasm is regained.',
  sol: 'Definition; why; restoration.',
  scheme: [['Definition of the ratio', 1], ['Control limited; ratio falls as cell grows', 1], ['Division restores the ratio', 1]],
  d: 2, c: 'application', t: [2],
}));
add('mitosis-long', long({
  stem: 'Describe the stages of mitosis in an animal cell, with the main events of each stage, and state the significance of mitosis.',
  model: '**Mitosis** is equational division, in which a diploid cell gives two daughter cells with the same chromosome number.\n\n**Prophase:** chromosomes condense, each of two chromatids joined at the centromere; the centrosomes move to the poles and form asters and the spindle; by its end the nucleolus, nuclear envelope, Golgi complex and ER disappear.\n\n**Metaphase:** chromosomes are fully condensed, spindle fibres attach to the kinetochores, and the chromosomes align on the metaphase plate.\n\n**Anaphase:** centromeres split and chromatids move to opposite poles, centromere first.\n\n**Telophase:** chromosomes reach the poles and decondense; the nuclear envelope, nucleolus, Golgi complex and ER reform. Cytokinesis then divides the cytoplasm.\n\n**Significance:** identical daughter cells; growth; restoring the nucleo-cytoplasmic ratio; replacement and repair; meristem activity in plants.',
  sol: 'Four stages and significance.',
  scheme: [['Prophase', 1], ['Metaphase', 1], ['Anaphase', 1], ['Telophase and cytokinesis', 1], ['Significance', 1]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [2],
}));
add('cytok-long', long({
  stem: 'A student says that all cells divide their cytoplasm in the same way. Evaluate this claim by describing cytokinesis in an animal cell and a plant cell, and by explaining what happens when karyokinesis is not followed by cytokinesis.',
  model: '**The claim is wrong.** Cytokinesis differs in the two kinds of cell.\n\nIn an **animal cell** a **furrow** appears in the plasma membrane. It deepens from the edge towards the centre until it meets, cutting the cell into two daughter cells.\n\nA **plant cell** has a **rigid wall** outside the membrane, so it cannot pinch in. Instead a **cell plate** forms in the centre, at the site of the former spindle, and grows **outwards** until it meets the existing side walls. It represents the **middle lamella** between the two new cells, and wall materials are laid down on it.\n\nSometimes **karyokinesis is not followed by cytokinesis**. The nuclei then stay together in one cytoplasm, forming a **multinucleate syncytium**, as in the **liquid endosperm of coconut**.',
  sol: 'Furrow, cell plate, syncytium; claim rejected.',
  scheme: [['Claim judged wrong', 0.5], ['Animal cytokinesis by furrowing', 1.5], ['Plant cytokinesis by cell plate and why', 2], ['Syncytium with example', 1]],
  wl: [80, 240],
  d: 3, c: 'evaluation', t: [2],
}));
{
  const T0 = N.tipB;
  add('rootip-case', mk.case({
    passage: `A student prepares a stained squash of a growing root tip and counts ${T0.total} cells under the microscope.\n\n| Stage | Interphase | Prophase | Metaphase | Anaphase | Telophase |\n|---|---|---|---|---|---|\n| Cells counted | ${T0.interphase} | ${T0.prophase} | ${T0.metaphase} | ${T0.anaphase} | ${T0.telophase} |\n\nThe cells of this root tip complete a cycle in ${T0.cycleH} hours, and the cells are at all stages of the cycle.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which stage of mitosis is shortest, judging by the counts?',
        right: 'Anaphase',
        wrong: ['Prophase', 'Metaphase', 'Telophase'],
        sol: 'In an asynchronous population the fewest cells are found in the shortest stage; anaphase has only 5 cells — option (@K).',
        d: 1, c: 'application', t: [2],
      })),
      part('b', num({
        stem: 'Calculate the mitotic index of this root tip, in percent.',
        value: N.tipBMI, unit: 'percent',
        sol: r`Dividing cells $= ${T0.prophase} + ${T0.metaphase} + ${T0.anaphase} + ${T0.telophase} = ${N.tipBDividing}$; index $= \dfrac{${N.tipBDividing}}{${T0.total}} \times 100 = ${N.tipBMI}$ percent.`,
        scheme: [[`${N.tipBMI} percent`, 1]],
        d: 2, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: `Calculate how long, in minutes, a cell spends in metaphase.`,
        model: `In a population with cells at all stages, the **share of cells in a stage equals the share of the cycle** spent in it. So metaphase lasts the fraction of cells found in it, multiplied by the length of the cycle: $\\dfrac{${T0.metaphase}}{${T0.total}} \\times ${T0.cycleH} = 0.3$ hour. Converting hours to minutes gives **${N.tipBMetaMin} minutes**.`,
        sol: 'Share of cells times the cycle.',
        scheme: [['Share of cells times cycle length', 1], [`${N.tipBMetaMin} minutes`, 1]],
        d: 3, c: 'application', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'Explain why more cells are seen in prophase than in anaphase.',
          model: 'In a population with cells at all stages, the **number of cells in a stage is proportional to the time spent in it**. Prophase lasts **longer** than anaphase, as chromosomes condense and the spindle forms, so more cells are caught in it.',
          sol: 'Counts proportional to duration.',
          scheme: [['Number in a stage proportional to time', 1], ['Prophase longer than anaphase', 1]],
          d: 2, c: 'analysis', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 10 && N.tipBMetaMin === 18 || 'value');
}

// ---------------------------------------------------------------- t03 meiosis
add('synapsis-mcq', mcq({
  stem: 'An electron micrograph of a meiotic cell shows two homologous chromosomes lying side by side, joined along their length by a ladder-like protein structure. Which substage of prophase I is this?',
  right: 'Zygotene',
  wrong: ['Leptotene', 'Pachytene', 'Diplotene'],
  sol: 'Pairing of homologues (synapsis) with the synaptonemal complex between them is the event of zygotene — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('crossover-mcq', mcq({
  stem: 'Under the electron microscope, round recombination nodules are seen along tetrads, each made of four chromatids. The cell is in',
  right: 'pachytene, when crossing over takes place',
  wrong: ['leptotene, when chromosomes first become visible', 'diplotene, when the synaptonemal complex dissolves', 'diakinesis, when the nuclear envelope breaks down'],
  sol: 'Tetrads with recombination nodules mark pachytene, the stage of crossing over catalysed by recombinase — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('chiasma-mcq', mcq({
  stem: 'In diplotene the homologous chromosomes of each bivalent seem to pull apart but stay linked at X-shaped points. These points show',
  right: 'the sites where crossing over has taken place',
  wrong: ['the centromeres, where spindle fibres will attach', 'the places where the synaptonemal complex is just forming', 'the points at which DNA replication began'],
  sol: 'The X-shaped chiasmata mark the sites of crossovers between non-sister chromatids — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('diakinesis-mcq', mcq({
  stem: 'A meiotic cell shows fully condensed chromosomes with chiasmata at the ends of the arms, an assembled spindle, and no nucleolus or nuclear envelope. Which stage is this?',
  right: 'Diakinesis',
  wrong: ['Zygotene', 'Pachytene', 'Metaphase I'],
  sol: 'Terminalised chiasmata, full condensation, an assembled spindle and loss of the nucleolus and envelope mark diakinesis, the end of prophase I; in metaphase I the bivalents would already lie on the equator — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('dyad-mcq', mcq({
  stem: `A garden pea plant has 2n = ${N.pea.prophaseI[0]}. After meiosis I, each of the two cells of the dyad holds`,
  right: `${N.pea.telophaseI[0]} chromosomes, each of two chromatids`,
  wrong: [`${N.pea.prophaseI[0]} chromosomes, each of one chromatid`, `${N.pea.telophaseI[0]} chromosomes, each of one chromatid`, `${N.pea.prophaseI[0]} chromosomes, each of two chromatids`],
  sol: `Homologues separated in anaphase I, so each cell has half the number, ${N.pea.telophaseI[0]}; the sister chromatids are still joined, so there are ${N.pea.telophaseI[1]} chromatids — option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => N.pea.telophaseI[0] === 7 || 'count');
add('metaphase1-mcq', mcq({
  stem: 'How does the arrangement of chromosomes at metaphase I of meiosis differ from that at metaphase of mitosis?',
  right: 'Bivalents lie on the equator, with the kinetochores of the two homologues facing opposite poles',
  wrong: ['Single chromosomes lie on the equator, each with one chromatid', 'Chromosomes lie scattered, as no spindle forms in meiosis', 'Sister chromatids of every chromosome face opposite poles'],
  sol: 'At metaphase I whole bivalents align, and the homologues attach to opposite poles; in mitosis the two chromatids of each chromosome face opposite poles — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('anaphase1count-mcq', mcq({
  stem: 'In a human meiocyte (2n = 46), how many chromosomes go to each pole at anaphase I, and of how many chromatids is each made?',
  right: `${N.humanPole[0]} chromosomes, each of two chromatids`,
  wrong: [`${N.humanPole[1]} chromosomes, each of one chromatid`, `${N.humanPole[0]} chromosomes, each of one chromatid`, `${N.humanPole[1]} chromosomes, each of two chromatids`],
  sol: `Homologous chromosomes separate, so each pole gets one of each pair: ${N.humanPole[0]}. The sister chromatids stay joined, so each has two — option (@K).`,
  d: 3, c: 'application', t: [3],
}), () => N.humanPole[0] === 23 || 'count');
add('interkinesis-mcq', mcq({
  stem: 'Which statement about the stage between meiosis I and meiosis II is correct?',
  right: 'It is generally short and no DNA replication takes place in it',
  wrong: ['The chromosomes are replicated again so that each has four chromatids', 'It is always the longest stage of meiosis', 'The chromosome number is doubled again in this stage'],
  sol: 'Interkinesis is generally short-lived, and DNA is not replicated in it; only one replication precedes meiosis I — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('maizeMeta2-mcq', mcq({
  stem: `Maize has 2n = 20. How many chromosomes are present in each cell of the dyad when it reaches metaphase II?`,
  right: String(N.maize.metaphaseII[0]),
  wrong: ['20', '5', '40'],
  sol: `The cell has half the diploid number, ${N.maize.metaphaseII[0]} chromosomes, each of two chromatids — option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => N.maize.metaphaseII[0] === 10 || 'count');
{
  const lettered = svgV(PROPHASE_I_LETTERED, 'Five labelled substages of prophase I of meiosis for one pair of homologous chromosomes, in scrambled order');
  add('prolet-mcq', mcq({
    stem: 'The figure shows the five substages of prophase I for one pair of homologous chromosomes, in scrambled order. In which cell are the homologues pairing along their length, with no crossing over yet?',
    right: 'E',
    wrong: ['A', 'C', 'D'],
    sol: 'Cell E shows the two homologues zipped together side by side: zygotene. D is pachytene (with crossing over), A diplotene, B leptotene and C diakinesis — option (@K).',
    assets: [lettered], d: 3, c: 'application', t: [3],
  }));
  add('proorder-mcq', mcq({
    stem: 'Using the same figure, which sequence lists the substages in the order in which they occur, earliest first?',
    right: 'B, E, D, A, C',
    wrong: ['B, D, E, A, C', 'A, B, C, D, E', 'B, E, A, D, C'],
    sol: 'B is leptotene, E zygotene, D pachytene, A diplotene and C diakinesis, so the order is B, E, D, A, C — option (@K).',
    assets: [lettered], d: 3, c: 'analysis', t: [3],
  }));
}
add('crossing-ar', ar({
  a: 'Crossing over increases the genetic variability among the gametes formed by meiosis.',
  r: 'Crossing over exchanges segments between non-sister chromatids of homologous chromosomes, producing new combinations of genes.',
  key: 'a',
  sol: 'Both statements are true, and the new gene combinations produced by exchange of segments explain the added variability — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('anaphase1-ar', ar({
  a: 'Sister chromatids separate during anaphase I of meiosis.',
  r: 'Homologous chromosomes separate during anaphase I of meiosis.',
  key: 'd',
  sol: 'A is false: the sister chromatids stay joined at their centromeres in anaphase I and separate only in anaphase II. R is true — option (d).',
  d: 2, c: 'understanding', t: [3],
}));
add('bivalent-tf', tf({
  stem: 'A bivalent seen at pachytene contains four chromatids.',
  key: 't',
  sol: 'True. A bivalent is a pair of homologous chromosomes, each of two sister chromatids, so it appears as a tetrad of four chromatids.',
  d: 1, c: 'recall', t: [3],
}));
add('reduction-fill', fill({
  stem: 'The division of meiosis that reduces the chromosome number to half is meiosis ______.',
  acc: [['I', 'one', '1', 'first', 'meiosis I']],
  sol: 'Meiosis I (the reduction division); meiosis II is equational.',
  d: 1, c: 'recall', t: [3],
}));
add('dyad-fill', fill({
  stem: 'The two cells formed at the end of meiosis I are together called a ______.',
  acc: [['dyad', 'a dyad']],
  sol: 'Dyad. The four cells after meiosis II form a tetrad.',
  d: 1, c: 'recall', t: [3],
}));
add('prophase-match', match({
  stem: 'Match each substage of prophase I (column I) with its event (column II).',
  pairs: [
    ['Leptotene', 'Chromosomes gradually become visible under the light microscope'],
    ['Zygotene', 'Synapsis of homologues with the synaptonemal complex'],
    ['Pachytene', 'Crossing over at recombination nodules'],
    ['Diplotene', 'Chiasmata are seen as the synaptonemal complex dissolves'],
  ],
  order: [1, 2, 0, 3],
  sol: 'Leptotene: chromosomes become visible; zygotene: synapsis; pachytene: crossing over at the nodules; diplotene: chiasmata appear as the complex dissolves.',
  d: 2, c: 'understanding', t: [3],
}));
add('pmc-num', num({
  stem: 'A flower’s anther must release 2000 pollen grains. Each pollen mother cell gives four pollen grains by meiosis. How many pollen mother cells are needed?',
  value: N.pmcFor,
  sol: r`$\dfrac{2000}{4} = ${N.pmcFor}$ pollen mother cells.`,
  scheme: [[`${N.pmcFor} cells`, 1]],
  d: 1, c: 'application', t: [3],
}), (q) => meiocytesFor(2000) === 500 || 'value');
add('sperm-num', num({
  stem: 'A section of a testis holds 120 meiocytes, each of which completes meiosis and produces four haploid cells. How many haploid cells result?',
  value: N.sperm,
  sol: r`$4 \times 120 = ${N.sperm}$ haploid cells.`,
  scheme: [[`${N.sperm} cells`, 1]],
  d: 1, c: 'application', t: [3],
}), (q) => haploidCells(120) === 480 || 'value');
add('bivalent-num', num({
  stem: 'A human meiocyte has 46 chromosomes. How many bivalents are seen at metaphase I?',
  value: bivalents(46),
  sol: r`Homologous chromosomes pair, so $\dfrac{46}{2} = ${bivalents(46)}$ bivalents.`,
  scheme: [[`${bivalents(46)} bivalents`, 1]],
  d: 1, c: 'application', t: [3],
}), (q) => q.answer.value === 23 || 'value');
add('gamdna-num', num({
  stem: `A species has ${N.dnaB.g1} pg of DNA in the G1 nucleus of a diploid cell. How much DNA, in pg, does one of its gametes contain?`,
  value: N.dnaB.gamete, unit: 'pg',
  sol: r`After S phase there is $${N.dnaB.g2}$ pg; meiosis I halves it to $${N.dnaB.dyad}$ pg and meiosis II to $${N.dnaB.gamete}$ pg, half the G1 amount.`,
  scheme: [['Halving at each division', 0.5], [`${N.dnaB.gamete} pg`, 0.5]],
  d: 3, c: 'application', t: [3],
}), (q) => N.dnaB.g1 / 2 === 3.6 || 'value');
add('interkinesis-short', short({
  marks: 2,
  stem: 'What is interkinesis? State two of its features.',
  model: '**Interkinesis** is the stage between meiosis I and meiosis II. It is **generally short-lived**, and **no DNA replication takes place** in it, so the chromosomes are not copied again before the second division.',
  sol: 'Definition and two features.',
  scheme: [['Stage between the two divisions', 1], ['Short; no DNA replication', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('crossing-short', short({
  marks: 2,
  stem: 'What is crossing over? State where and in which stage it occurs.',
  model: '**Crossing over** is the **exchange of segments between non-sister chromatids** of homologous chromosomes. It takes place in **pachytene** of prophase I, at **recombination nodules**, and is catalysed by the enzyme **recombinase**. It leads to **recombination** of genes.',
  sol: 'Exchange between non-sister chromatids in pachytene.',
  scheme: [['Exchange between non-sister chromatids of homologues', 1], ['Pachytene, recombination nodules, recombinase', 1]],
  d: 2, c: 'recall', t: [3],
}));
add('reduct-short', short({
  marks: 2,
  stem: 'Why is meiosis I called the reduction division while meiosis II is called equational?',
  model: 'In **meiosis I** homologous chromosomes separate, so each of the two cells receives **half the chromosome number**: the number is **reduced**. In **meiosis II** the sister chromatids separate, as in mitosis, so each cell keeps the **same chromosome number** it started with: the division is **equational**.',
  sol: 'Homologues versus chromatids.',
  scheme: [['Meiosis I: homologues separate; number halved', 1], ['Meiosis II: chromatids separate; number unchanged', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('prophase1-short', short({
  marks: 3,
  stem: 'Describe what happens to the homologous chromosomes in zygotene, pachytene and diplotene of prophase I.',
  model: 'In **zygotene** homologous chromosomes **pair** (synapsis) along their length, aided by the **synaptonemal complex**, forming bivalents. In **pachytene** each bivalent shows **four chromatids** (a tetrad) and **crossing over** occurs between non-sister chromatids at recombination nodules. In **diplotene** the complex dissolves and the homologues **separate except at the chiasmata**, the X-shaped sites of crossing over.',
  sol: 'Pairing; crossing over; chiasmata.',
  scheme: [['Zygotene: synapsis, synaptonemal complex', 1], ['Pachytene: tetrad and crossing over', 1], ['Diplotene: separation except at chiasmata', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('anaphasecompare-short', short({
  marks: 3,
  stem: 'Compare what separates, and what each pole receives, in anaphase I and anaphase II of meiosis.',
  model: 'In **anaphase I** the **homologous chromosomes** of each bivalent separate, but **sister chromatids stay joined** at the centromeres; each pole receives **half the chromosome number**, each chromosome of two chromatids. In **anaphase II** the **centromeres split** and the **sister chromatids** move to opposite poles, so each pole receives single-chromatid chromosomes, as in mitosis.',
  sol: 'Homologues versus chromatids.',
  scheme: [['Anaphase I: homologues separate; chromatids stay joined', 1.5], ['Anaphase II: centromere splits; chromatids separate', 1.5]],
  d: 3, c: 'analysis', t: [3],
}));
add('sigmeiosis-short', short({
  marks: 3,
  stem: 'Explain two ways in which meiosis is significant for sexually reproducing organisms.',
  model: 'Meiosis **halves the chromosome number** in gametes, so that **fusion of two haploid gametes** restores the diploid number; without it the number would **double every generation**. It also **increases genetic variability**, through **crossing over** and the separation of homologues, giving a population variations that are very important for **evolution**.',
  sol: 'Constant chromosome number; variability.',
  scheme: [['Halving keeps the number constant across generations', 1.5], ['Variability through crossing over; evolution', 1.5]],
  d: 2, c: 'understanding', t: [3],
}));
add('meiosis-long', long({
  stem: 'Describe the stages of meiosis I, including the substages of prophase I, and say what separates at the end of this division.',
  model: '**Meiosis I** follows replication of the chromosomes into sister chromatids in S phase.\n\n**Prophase I** has five substages. **Leptotene:** chromosomes become visible. **Zygotene:** homologues pair (synapsis) with the synaptonemal complex, forming bivalents. **Pachytene:** tetrads of four chromatids; crossing over at recombination nodules. **Diplotene:** the complex dissolves and homologues separate except at chiasmata. **Diakinesis:** chiasmata terminalise, chromosomes fully condensed, spindle assembles, nucleolus and envelope disappear.\n\n**Metaphase I:** bivalents lie on the equator, homologues attached to opposite poles. **Anaphase I:** homologous chromosomes separate; sister chromatids stay joined. **Telophase I:** envelope and nucleolus reappear; cytokinesis gives a dyad of haploid cells.',
  sol: 'Prophase I substages; metaphase I to telophase I.',
  scheme: [['Five substages with events', 2], ['Metaphase I', 1], ['Anaphase I: homologues separate', 1], ['Telophase I and dyad', 1]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [3],
}));
add('compare-long', long({
  stem: 'A student confuses mitosis and meiosis. Write five differences between them in a table, and state one similarity.',
  model: '| Feature | Mitosis | Meiosis |\n|---|---|---|\n| Cells that divide | Somatic cells, meristems | Meiocytes of reproductive organs |\n| Divisions per DNA replication | One | Two |\n| Pairing of homologues; crossing over | Absent | Present in prophase I |\n| Daughter cells | Two, diploid, identical | Four, haploid, genetically different |\n| Role | Growth, repair, replacement | Gamete formation; constant chromosome number; variability |\n\n**Similarity:** both are preceded by one round of DNA replication in S phase and both involve a spindle, with the chromatids separating at anaphase of mitosis and of meiosis II.',
  sol: 'Five differences and one similarity.',
  scheme: [['Five differences, 0.8 each', 4], ['One similarity', 1]],
  wl: [60, 240],
  d: 3, c: 'analysis', t: [2, 3],
}));
add('prophase-long', long({
  stem: 'Prophase I of meiosis is long and complex. Describe its five substages in order, mentioning the key event of each and the term for the structures formed by pairing.',
  model: 'Prophase I is prolonged and has five substages.\n\n**Leptotene:** the chromosomes gradually become visible under the light microscope and compaction continues.\n\n**Zygotene:** homologous chromosomes start pairing and aligning (**synapsis**), aided by the synaptonemal complex; the paired chromosomes are called **bivalents** or tetrads.\n\n**Pachytene:** bivalents clearly appear as tetrads of four chromatids; **crossing over** between non-sister chromatids occurs at recombination nodules, catalysed by recombinase.\n\n**Diplotene:** the synaptonemal complex dissolves and the homologues separate except at the **chiasmata**, the sites of crossing over.\n\n**Diakinesis:** chiasmata terminalise, chromosomes are fully condensed, the spindle assembles, and the nucleolus and nuclear envelope disappear.',
  sol: 'Five substages in order.',
  scheme: [['Leptotene', 1], ['Zygotene with bivalents', 1], ['Pachytene', 1], ['Diplotene with chiasmata', 1], ['Diakinesis', 1]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [3],
}));
{
  const P = N.pea;
  add('pea-case', mk.case({
    passage: `A plant physiologist studies pollen mother cells of a garden pea plant, whose body cells have ${P.prophaseI[0]} chromosomes. She notes that a cell in metaphase I shows pairs of chromosomes lying on the equator, and that a cell in telophase II has its chromosomes enclosed by new nuclear envelopes with a furrow forming through the cytoplasm.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'How many bivalents does the cell in metaphase I show?',
        right: String(bivalents(14)),
        wrong: ['14', '28', '3'],
        sol: `The ${P.prophaseI[0]} chromosomes pair into ${bivalents(14)} bivalents — option (@K).`,
        d: 1, c: 'application', t: [3],
      })),
      part('b', num({
        stem: 'How many chromosomes does each cell hold at the moment in anaphase II when its centromeres have just split?',
        value: P.anaphaseII[0],
        sol: `Each cell of the dyad has ${P.metaphaseII[0]} chromosomes of two chromatids; once centromeres split, each chromatid is a chromosome: ${P.anaphaseII[0]}.`,
        scheme: [[`${P.anaphaseII[0]}`, 1]],
        d: 3, c: 'application', t: [3],
      })),
      part('c', short({
        marks: 2,
        stem: 'State the number of pollen grains formed from one pollen mother cell and the chromosome number in each, with reasons.',
        model: `One pollen mother cell gives **four pollen grains**, since there are **two divisions after one replication**. Each has **${P.telophaseII[0]} chromosomes**, half of ${P.prophaseI[0]}, because homologous chromosomes were separated in meiosis I.`,
        sol: 'Four haploid cells with seven chromosomes each.',
        scheme: [['Four grains from two divisions', 1], [`${P.telophaseII[0]} chromosomes; homologues separated`, 1]],
        d: 2, c: 'application', t: [3],
      }), [
        short({
          marks: 2,
          stem: 'The pollen grain nucleus later fuses with an egg nucleus. State the chromosome number in the zygote and explain how meiosis makes this possible.',
          model: `The zygote has **${P.prophaseI[0]} chromosomes**. Meiosis **halves** the number to ${P.telophaseII[0]} in each gamete, so that **fusion of two haploid gametes restores the diploid number** and the chromosome number stays constant across generations.`,
          sol: 'Diploid number restored.',
          scheme: [[`${P.prophaseI[0]} chromosomes`, 1], ['Halving in meiosis restores the number at fertilisation', 1]],
          d: 2, c: 'understanding', t: [3],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 14 || 'value');
}
{
  const B = N.dnaB;
  add('dna-case', mk.case({
    passage: `A researcher measures the DNA in single nuclei from a plant with ${B.g1} pg of DNA in a G1 nucleus.\n\n| Nucleus | P | Q | R | S |\n|---|---|---|---|---|\n| DNA (pg) | ${B.g1} | ${B.g2} | ${B.gamete} | ${B.dyad} |\n\nNucleus P is from a young leaf cell in G1, Q is from the same cell type after S phase, R is from a mature pollen grain, and S is from a cell that has just completed meiosis I.`,
    d: 4, c: 'analysis',
    children: [
      part('a', mcq({
        stem: 'Which nucleus is haploid with unreplicated chromosomes?',
        right: 'R',
        wrong: ['P', 'Q', 'S'],
        sol: 'Haploid gametes have half the G1 amount of DNA, so R, with 3.6 pg, is haploid with single-chromatid chromosomes — option (@K).',
        d: 2, c: 'application', t: [3],
      })),
      part('b', num({
        stem: 'By how many picograms does the DNA of nucleus Q exceed that of nucleus P?',
        value: B.g2 - B.g1, unit: 'pg', tol: 0.01,
        sol: r`$${B.g2} - ${B.g1} = ${B.g2 - B.g1}$ pg, the amount added by DNA replication in S phase.`,
        scheme: [[`${round(B.g2 - B.g1, 1)} pg`, 1]],
        d: 2, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'Nucleus S has half the chromosomes of nucleus P but the same amount of DNA. Explain.',
        model: 'After **meiosis I** the homologous chromosomes have separated, so S has **half the number** of chromosomes. But **sister chromatids stay joined**, so each chromosome still has **two chromatids** and the DNA per nucleus is the same as in G1.',
        sol: 'Half the chromosomes, each of two chromatids.',
        scheme: [['Homologues separated: half the chromosomes', 1], ['Each still of two chromatids: same DNA', 1]],
        d: 4, c: 'analysis', t: [3],
      }), [
        short({
          marks: 2,
          stem: 'Which stage of meiosis changes the DNA of S to that of R, and what separates in it?',
          model: '**Meiosis II** does this. In it the **centromeres split** and the **sister chromatids separate**, halving the DNA per nucleus to give four **haploid** cells with the DNA of nucleus R.',
          sol: 'Meiosis II; chromatids separate.',
          scheme: [['Meiosis II', 1], ['Sister chromatids separate; DNA halved', 1]],
          d: 3, c: 'application', t: [3],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 7.2 || 'value');
}
{
  const Y = N.yeastTable;
  add('yeast-case', mk.case({
    passage: `A student places one yeast cell in a nutrient medium and counts cells at intervals. Each cell divides by mitosis once every ${YEAST_MIN} minutes, and none die.\n\n| Time (minutes) | ${Y.map((x) => x[0]).join(' | ')} |\n|---|---|---|---|---|---|---|\n| Number of cells | ${Y.map((x) => x[1]).join(' | ')} |`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'What does the pattern of the cell numbers show about the cell cycle?',
        right: 'The number of cells doubles in each cycle of 90 minutes',
        wrong: ['The same number of cells is added in each cycle', 'Cells divide only during the first 90 minutes', 'The number of cells is halved in each cycle'],
        sol: 'The numbers 1, 2, 4, 8, 16, 32 show doubling every 90 minutes, because each cell divides into two — option (@K).',
        d: 1, c: 'application', t: [1],
      })),
      part('b', num({
        stem: 'How many cells would be present after 630 minutes?',
        value: cellsAfter(630, YEAST_MIN),
        sol: r`$\dfrac{630}{90} = 7$ cycles, and $2^{7} = ${cellsAfter(630, YEAST_MIN)}$ cells.`,
        scheme: [['7 cycles', 0.5], [`${cellsAfter(630, YEAST_MIN)} cells`, 0.5]],
        d: 2, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'In human cells in culture a cycle takes about 24 hours. Which phase makes up most of any such cycle, and what is the cell doing in it?',
        model: '**Interphase** makes up most of the cycle, over **95 percent** in human cells, while the M phase takes only about an hour. In interphase the cell is **metabolically active**: it **grows** (G1 and G2), **replicates its DNA** (S phase) and makes the proteins needed for mitosis.',
        sol: 'Interphase and its events.',
        scheme: [['Interphase, more than 95 percent', 1], ['Growth, DNA replication, protein synthesis', 1]],
        d: 2, c: 'understanding', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'Why does the number of yeast cells double in each cycle rather than rise by a fixed amount?',
          model: 'Each cell in the population **replicates its DNA and divides by mitosis into two cells**, so **every cell present** gives two daughters in the next cycle. The increase therefore depends on the number of cells already present, and the number **doubles**.',
          sol: 'Every cell divides into two.',
          scheme: [['Each cell divides into two', 1], ['Increase proportional to numbers present: doubling', 1]],
          d: 3, c: 'analysis', t: [1],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 128 || 'value');
}

add('mi-short', short({
  marks: 3,
  stem: 'In a root-tip squash, 400 cells are counted and 36 of them are dividing. Define the mitotic index, calculate it for this preparation, and say what a much higher index in another tissue would suggest.',
  model: `The **mitotic index** is the percentage of cells in a sample that are in the M phase (dividing). Here it is $\\dfrac{36}{400} \\times 100 = ${N.mi400}$ percent. A **much higher index** would suggest a tissue in which **cells are dividing actively**, such as a growing meristem, since a larger share of its cells is caught in mitosis at any moment.`,
  sol: 'Definition, calculation, interpretation.',
  scheme: [['Definition of mitotic index', 1], [`Calculation: ${N.mi400} percent`, 1], ['High index means actively dividing tissue', 1]],
  d: 2, c: 'application', t: [2],
}), () => mitoticIndex(36, 400) === 9 || 'value');
