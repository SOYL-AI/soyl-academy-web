// ICSE 10 Biology ch01 Cell Cycle, Cell Division and Structure of Chromosomes — question bank in ICSE 2027 style.
// Chromosome numbers, cell counts and percentages are computed by calc.mjs. Stages of meiosis are not asked (removed).
// AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true, R does not explain.
import { mk, add, svgV, r } from './lib.mjs';
import { cellsAfter, afterMeiosis, afterMitosis, chromatidsAtMetaphase, ROOT, pct } from './calc.mjs';
import { CHROMOSOME_LETTERED, MITOSIS } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, match, part } = mk;
const chromFig = svgV(CHROMOSOME_LETTERED, 'A chromosome with parts lettered A to E');
const mitFig = svgV(MITOSIS, 'Four stages of mitosis in an animal cell');

// ---------------------------------------------------------------- t01 the cell cycle
add('s-phase-mcq', mcq({
  stem: 'In which phase of the cell cycle is the DNA of a cell copied?',
  right: 'S phase', wrong: ['G1 phase', 'G2 phase', 'M phase'],
  sol: 'DNA replication (synthesis) takes place in the S phase of interphase — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('g1-mcq', mcq({
  stem: 'A freshly formed daughter cell in a growing root tip increases in size and makes new proteins and organelles. It is in',
  right: 'G1 phase', wrong: ['S phase', 'anaphase', 'telophase'],
  sol: 'Growth and protein synthesis right after division happen in G1 — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('longest-mcq', mcq({
  stem: 'If you look at hundreds of cells in a squash of a growing root tip, most of them will be in',
  right: 'interphase, because it is the longest part of the cell cycle', wrong: ['metaphase, because chromosomes are clearest then', 'anaphase, because it lasts longest', 'telophase, because cells spend most time re-forming nuclei'],
  sol: 'Interphase takes up most of the cycle, so most cells in any sample are in interphase — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('g2-mcq', mcq({
  stem: 'Which statement about the G2 phase is correct?',
  right: 'The cell already has double the DNA and prepares the proteins needed for division', wrong: ['The DNA is copied during this phase', 'The chromosomes line up on the equator', 'The cytoplasm divides into two'],
  sol: 'G2 follows S, so DNA is already doubled; the cell makes proteins for the spindle and prepares to divide — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('cycle-ar', ar({
  a: 'A cell in G2 phase has twice as much DNA as a cell in G1 phase.',
  r: 'The DNA of the cell is copied in the S phase, which lies between G1 and G2.',
  key: 'c',
  sol: 'Both are true, and copying of DNA in the S phase is exactly why G2 has double the DNA of G1 — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('interphase-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the stage of the cell cycle between two divisions, made of G1, S and G2.',
  model: '**Interphase.**',
  sol: 'Interphase.', scheme: [['Interphase', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('odd-cycle', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Prophase, Metaphase, Interphase, Telophase.',
  model: '**Interphase**; the others are **stages of mitosis**.',
  sol: 'Interphase is not a stage of mitosis.', scheme: [['Odd one and category', 1]],
  d: 2, c: 'analysis', t: [1, 2],
}));
{
  const n = 3;
  add('cells-num', num({
    stem: 'A single cell in a plant shoot tip divides by mitosis, and every new cell divides again, three times in all. How many cells are formed?',
    value: cellsAfter(n),
    sol: r`Each division doubles the number: $2 \times 2 \times 2 = ${cellsAfter(n)}$ cells.`,
    scheme: [[`${cellsAfter(n)} cells`, 1]],
    d: 2, c: 'application', t: [1, 2],
  }), (q) => q.answer.value === 8 || 'value');
}

// ---------------------------------------------------------------- t02 mitosis and cytokinesis
add('metaphase-mcq', mcq({
  stem: 'Chromosomes are best counted and studied in which stage of mitosis?',
  right: 'Metaphase', wrong: ['Prophase', 'Telophase', 'Interphase'],
  sol: 'At metaphase the chromosomes are most condensed and lie in one plane on the equator — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('anaphase-mcq', mcq({
  stem: 'A student sees a cell in which two groups of V-shaped chromosomes are moving towards opposite ends of the spindle. The cell is in',
  right: 'anaphase', wrong: ['prophase', 'metaphase', 'telophase'],
  sol: 'Separation of sister chromatids and their movement to opposite poles is anaphase — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('prophase-mcq', mcq({
  stem: 'Which event marks prophase of mitosis in an animal cell?',
  right: 'Chromatin condenses into visible chromosomes and the nuclear membrane begins to disappear', wrong: ['Sister chromatids move to opposite poles', 'A cell plate forms at the centre of the cell', 'Two new nuclei form'],
  sol: 'Condensing chromosomes, a fading nuclear membrane and centrioles moving apart mark prophase — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('telophase-mcq', mcq({
  stem: 'In which stage of mitosis do the nuclear membrane and nucleolus reappear around each group of chromosomes?',
  right: 'Telophase', wrong: ['Prophase', 'Metaphase', 'Anaphase'],
  sol: 'Telophase reverses prophase: chromosomes uncoil and two nuclei re-form — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('cellplate-mcq', mcq({
  stem: 'Why does a dividing onion root cell form a cell plate instead of a furrow?',
  right: 'Its rigid cell wall cannot be pinched inwards', wrong: ['It has no cell membrane', 'It has no spindle fibres', 'Its chromosomes do not separate'],
  sol: 'A plant cell has a rigid cell wall, so the cytoplasm is divided by a cell plate growing from the centre outwards — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('furrow-mcq', mcq({
  stem: 'Cytokinesis in a human skin cell takes place by',
  right: 'a furrow in the cell membrane that deepens from outside inwards', wrong: ['a cell plate that grows from the centre outwards', 'the formation of a new cell wall', 'the breakdown of the centromere'],
  sol: 'Animal cells divide their cytoplasm by furrowing (cleavage) — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('stage-fig-mcq', mcq({
  stem: 'The figure shows four stages of mitosis. In which stage do the chromosomes lie in a single row, each attached to fibres from both poles?',
  right: 'The second (metaphase)', wrong: ['The first (prophase)', 'The third (anaphase)', 'The fourth (telophase)'],
  sol: 'Chromosomes lined up on the equator and attached to spindle fibres from both poles is metaphase — option (@K).',
  d: 2, c: 'application', t: [2],
  assets: [mitFig],
}));
add('spindle-mcq', mcq({
  stem: 'In a dividing animal cell, the spindle fibres are organised by the',
  right: 'centrioles', wrong: ['nucleolus', 'cell plate', 'chloroplasts'],
  sol: 'In animal cells the centrioles move to opposite poles and organise the spindle — option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('metaphase-tf', tf({
  stem: 'During anaphase of mitosis, each chromosome splits at its centromere and its two chromatids move to opposite poles.',
  key: 't',
  sol: 'True. The centromere divides and the sister chromatids, now daughter chromosomes, move apart.',
  d: 1, c: 'understanding', t: [2],
}));
add('mitosis-ar', ar({
  a: 'The two daughter cells formed by mitosis have the same number of chromosomes as the parent cell.',
  r: 'In anaphase of mitosis, one chromatid of every chromosome goes to each pole.',
  key: 'c',
  sol: 'Both are true, and the equal sharing of chromatids at anaphase explains why both daughter cells keep the parent number — option (c).',
  d: 3, c: 'analysis', t: [2],
}));
add('cytokinesis-ar', ar({
  a: 'Plant cells divide their cytoplasm by forming a furrow from the outside.',
  r: 'Plant cells are surrounded by a rigid cell wall.',
  key: 'b',
  sol: 'The assertion is false: plant cells form a cell plate, not a furrow. The reason is true and is why a furrow cannot form — option (b).',
  d: 3, c: 'analysis', t: [2],
}));
add('cytokinesis-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the division of the cytoplasm after the nucleus has divided.',
  model: '**Cytokinesis.**',
  sol: 'Cytokinesis.', scheme: [['Cytokinesis', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('karyokinesis-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the division of the nucleus during cell division.',
  model: '**Karyokinesis.**',
  sol: 'Karyokinesis.', scheme: [['Karyokinesis', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('odd-mitosis', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Root tip, Shoot tip, Anther, Cambium.',
  model: '**Anther**; the others are **regions where cells divide by mitosis** (meristems) for growth.',
  sol: 'Meiosis occurs in the anther to form pollen.', scheme: [['Odd one and category', 1]],
  d: 3, c: 'analysis', t: [2, 3],
}));
add('reason-centrioles', short({
  marks: 1, wl: null,
  stem: 'Give reason: the spindle in a dividing onion root cell forms without centrioles.',
  model: 'Higher plant cells **lack centrioles**; their spindle is organised from the **polar regions of the cytoplasm**.',
  sol: 'No centrioles in higher plants.', scheme: [['Lack centrioles; spindle forms from polar cytoplasm', 1]],
  d: 3, c: 'understanding', t: [2],
}));
add('order-short', short({
  marks: 2,
  stem: 'Arrange these events of mitosis in the correct order and name the stage of the second event: chromatids move to opposite poles; nuclear membrane disappears; chromosomes line up on the equator; nuclear membrane re-forms.',
  model: 'Order: **nuclear membrane disappears → chromosomes line up on the equator → chromatids move to opposite poles → nuclear membrane re-forms**. The second event (lining up on the equator) is **metaphase**.',
  sol: 'Prophase, metaphase, anaphase, telophase.',
  scheme: [['Correct order', 1], ['Metaphase named', 1]],
  d: 2, c: 'application', t: [2],
}));
add('cyto-short', short({
  marks: 2,
  stem: 'State two differences between cytokinesis in a plant cell and in an animal cell.',
  model: '1. Plant cell: a **cell plate** forms at the centre and grows **outwards**; animal cell: a **furrow** deepens from the outside **inwards**.\n2. Plant cell: a **new cell wall** forms between the daughter cells; animal cell: **no wall**, the cell membrane simply pinches in.',
  sol: 'Cell plate vs furrow; direction; new wall.',
  scheme: [['First difference', 1], ['Second difference', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('metaphase-draw', short({
  marks: 3, wl: null,
  stem: 'Draw a neat, labelled diagram of an animal cell with four chromosomes at metaphase of mitosis. Label the centriole, spindle fibre, centromere and chromatid.',
  model: 'A round cell with a **centriole** at each pole; **spindle fibres** run from both poles to the equator; **four chromosomes** lie in one row on the equator, each shown as **two chromatids** joined at a **centromere** attached to fibres from both poles. No nuclear membrane is drawn.',
  sol: 'Diagram with chromosomes on the equator and the four labels.',
  scheme: [['Four chromosomes on the equator, each with two chromatids', 1], ['Spindle and centrioles at the poles', 1], ['Four correct labels', 1]],
  d: 3, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 meiosis, homologous chromosomes, crossing over
add('meiosis-where-mcq', mcq({
  stem: 'In a human male, meiosis takes place in the',
  right: 'testes, to form sperms', wrong: ['skin, to heal wounds', 'bone marrow, to form blood cells', 'liver, to replace old cells'],
  sol: 'Meiosis occurs only in the reproductive organs while gametes are formed — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('homologous-mcq', mcq({
  stem: 'Homologous chromosomes are a pair of chromosomes that',
  right: 'are alike in size and shape and carry genes for the same characters, one from each parent', wrong: ['are the two chromatids of one duplicated chromosome', 'are found only in gametes', 'carry exactly the same alleles in every case'],
  sol: 'One homologue comes from the father and one from the mother; they carry the same genes, possibly as different alleles — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('crossing-mcq', mcq({
  stem: 'Crossing over during meiosis results in',
  right: 'new combinations of genes on the chromatids', wrong: ['a doubling of the chromosome number', 'identical gametes', 'the formation of the cell plate'],
  sol: 'Exchange of segments between homologous chromatids creates new gene combinations, a source of variation — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('dog-mcq', mcq({
  stem: `The body cells of a dog have 78 chromosomes. How many chromosomes will a dog's sperm cell have?`,
  right: String(afterMeiosis(78)), wrong: ['78', '156', '26'],
  sol: `Meiosis halves the number: 78 ÷ 2 = ${afterMeiosis(78)} — option (@K).`,
  d: 2, c: 'application', t: [3],
}));
add('reduction-ar', ar({
  a: 'Meiosis is called a reduction division.',
  r: 'Meiosis produces two daughter cells, each identical to the parent cell.',
  key: 'a',
  sol: 'The assertion is true: meiosis halves the chromosome number. The reason is false: meiosis produces four cells that are not identical to the parent — option (a).',
  d: 2, c: 'analysis', t: [3],
}));
add('gamete-fill', fill({
  stem: 'Meiosis reduces the chromosome number from diploid (2n) to ______ (n) in the gametes.',
  acc: [['haploid', 'half', 'n']],
  sol: 'Haploid.',
  d: 1, c: 'recall', t: [3],
}));
add('meiosis-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the exchange of segments between chromatids of a homologous pair of chromosomes during meiosis.',
  model: '**Crossing over.**',
  sol: 'Crossing over.', scheme: [['Crossing over', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('odd-meiosis', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Sperm, Ovum, Pollen grain, Skin cell.',
  model: '**Skin cell**; the others are **haploid cells formed through meiosis**.',
  sol: 'A skin cell is diploid and formed by mitosis.', scheme: [['Odd one and category', 1]],
  d: 2, c: 'analysis', t: [3],
}));
add('variation-short', short({
  marks: 2,
  stem: 'Two sisters have the same parents but look quite different. Give two reasons, linked to meiosis, for this variation.',
  model: '1. **Crossing over** between homologous chromosomes forms **new combinations** of genes in each egg and sperm.\n2. Homologous chromosomes are **shared out at random** into the gametes, so each sister received a **different mix** of chromosomes.',
  sol: 'Crossing over; random assortment of homologues.',
  scheme: [['Crossing over', 1], ['Random sorting of homologous chromosomes', 1]],
  d: 3, c: 'application', t: [3],
}));
add('halve-short', short({
  marks: 2,
  stem: 'Explain why gametes must have only half the number of chromosomes of body cells.',
  model: 'At **fertilisation** a sperm and an egg **fuse**. If each carried the full (diploid) number, the zygote would have **double** the normal number, and it would double every generation. Halving keeps the number **constant** from one generation to the next.',
  sol: 'Fertilisation restores the diploid number.',
  scheme: [['Fusion at fertilisation', 1], ['Number stays constant across generations', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('crossover-draw', short({
  marks: 3, wl: null,
  stem: 'With the help of a labelled diagram, show how crossing over occurs between a pair of homologous chromosomes.',
  model: 'Draw a **homologous pair**, one chromosome from each parent, each with **two chromatids** joined at a **centromere**. Show two **non-sister chromatids** crossing at a **chiasma** and exchanging segments. Show the result: two chromatids with **mixed segments** (new gene combinations).',
  sol: 'Pair, chiasma, exchanged segments.',
  scheme: [['Homologous pair with chromatids drawn', 1], ['Chiasma and exchange shown', 1], ['Labels: chromatid, centromere, chiasma', 1]],
  d: 3, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 significance and differences
add('repair-mcq', mcq({
  stem: 'A lizard grows back its lost tail. The cell division mainly responsible is',
  right: 'mitosis, which produces many identical cells', wrong: ['meiosis, which halves the chromosome number', 'crossing over, which mixes genes', 'fertilisation, which joins gametes'],
  sol: 'Regeneration and repair depend on mitosis — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('asexual-mcq', mcq({
  stem: 'A potato farmer plants pieces of tuber and gets plants exactly like the parent. These new plants are alike because',
  right: 'the new plants grow by mitosis, which keeps the genetic material unchanged', wrong: ['the pieces undergo meiosis', 'crossing over is complete in every cell', 'the new plants grow from seeds'],
  sol: 'Vegetative propagation uses mitosis only, so the offspring are genetically identical to the parent — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('diff-mcq', mcq({
  stem: 'Which statement correctly distinguishes meiosis from mitosis?',
  right: 'Meiosis produces four cells with half the chromosome number; mitosis produces two cells with the same number', wrong: ['Meiosis produces two identical cells; mitosis produces four', 'Meiosis occurs in all body cells; mitosis only in gonads', 'Meiosis keeps the chromosome number; mitosis halves it'],
  sol: 'Four haploid cells versus two diploid identical cells — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('cancer-tf', tf({
  stem: 'Uncontrolled, repeated mitosis of cells can lead to a tumour.',
  key: 't',
  sol: 'True. When the controls on the cell cycle fail, cells keep dividing and form a mass called a tumour.',
  d: 2, c: 'understanding', t: [4],
}));
add('meiosis-tf', tf({
  stem: 'Meiosis takes place in the root tip of a plant to help it grow.',
  key: 'f',
  sol: 'False. Growth at the root tip is by mitosis; meiosis takes place in the anther and ovule to form gametes.',
  d: 1, c: 'understanding', t: [4],
}));
add('significance-ar', ar({
  a: 'Mitosis helps a multicellular organism grow from a single-celled zygote.',
  r: 'Mitosis introduces variation in every new body cell.',
  key: 'a',
  sol: 'The assertion is true. The reason is false: mitosis forms genetically identical cells; variation comes from meiosis — option (a).',
  d: 2, c: 'analysis', t: [4],
}));
add('signif-short', short({
  marks: 2,
  stem: 'State two ways in which meiosis is significant for a sexually reproducing organism.',
  model: '1. It **halves** the chromosome number in gametes, so the number stays **constant** after fertilisation.\n2. **Crossing over** and random sorting of chromosomes produce **variation**, which helps evolution.',
  sol: 'Constant chromosome number; variation.',
  scheme: [['First point', 1], ['Second point', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('mitosis-signif-short', short({
  marks: 2,
  stem: 'A child grows taller every year and a cut on her knee heals in a week. Name the cell division involved and give two of its uses shown here.',
  model: '**Mitosis.** It brings about **growth** (more cells, so the child grows taller) and **repair** (new cells replace damaged ones, so the cut heals).',
  sol: 'Mitosis: growth and repair.',
  scheme: [['Mitosis', 1], ['Growth and repair', 1]],
  d: 2, c: 'application', t: [4],
}));
add('table-short', short({
  marks: 3,
  stem: 'Tabulate three differences between mitosis and meiosis.',
  model: '| Mitosis | Meiosis |\n|---|---|\n| Occurs in **body (somatic) cells** | Occurs in **reproductive cells** forming gametes |\n| **Two** daughter cells | **Four** daughter cells |\n| Chromosome number **unchanged** (2n → 2n) | Chromosome number **halved** (2n → n) |\n| **No crossing over**; cells identical | **Crossing over**; cells differ |',
  sol: 'Any three: where, number of cells, chromosome number, crossing over/variation, purpose.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- t05 structure of a chromosome
add('centromere-mcq', mcq({
  stem: 'The part of a chromosome that holds the two sister chromatids together and attaches to the spindle is the',
  right: 'centromere', wrong: ['gene', 'nucleolus', 'cell plate'],
  sol: 'The centromere joins sister chromatids and is the point of attachment of spindle fibres — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('gene-mcq', mcq({
  stem: 'Which description of a gene, as seen on a chromosome, is correct?',
  right: 'a segment of DNA on a chromosome that controls a particular character', wrong: ['a whole chromosome', 'one of the two chromatids', 'the protein around which DNA is wound'],
  sol: 'Genes are units of heredity, each a particular stretch of DNA on a chromosome — option (@K).',
  d: 1, c: 'understanding', t: [5],
}));
add('chromatin-mcq', mcq({
  stem: 'In a nucleus that is not dividing, the genetic material appears as a fine network of threads called',
  right: 'chromatin', wrong: ['chromatids', 'spindle fibres', 'centrioles'],
  sol: 'Uncondensed DNA with its proteins forms chromatin; it condenses into chromosomes at division — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('figD-mcq', mcq({
  stem: 'In the figure, which letter marks the structure that is a long, twisted double strand carrying the genetic code?',
  right: 'D', wrong: ['A', 'B', 'E'],
  sol: 'D is the DNA double helix. A is a chromatid, B the centromere, C a gene and E chromatin — option (@K).',
  d: 2, c: 'application', t: [5],
  assets: [chromFig],
}));
add('chromatid-num-mcq', mcq({
  stem: `A human body cell has 46 chromosomes. How many chromatids can be counted at metaphase of mitosis?`,
  right: String(chromatidsAtMetaphase(46)), wrong: ['46', '23', '184'],
  sol: `Each of the 46 chromosomes has two chromatids at metaphase: 46 × 2 = ${chromatidsAtMetaphase(46)} — option (@K).`,
  d: 3, c: 'application', t: [5, 2],
}));
add('dna-ar', ar({
  a: 'Chromosomes become clearly visible under a light microscope only during cell division.',
  r: 'During division the chromatin coils and condenses into short, thick chromosomes.',
  key: 'c',
  sol: 'Both are true, and condensation of chromatin during division is why chromosomes become visible then — option (c).',
  d: 2, c: 'analysis', t: [5],
}));
add('chromatid-fill', fill({
  stem: 'After the S phase, each chromosome consists of two identical ______ joined at the centromere.',
  acc: [['chromatids', 'sister chromatids', 'chromatid']],
  sol: 'Chromatids (sister chromatids).',
  d: 1, c: 'recall', t: [5],
}));
add('locus-fill', fill({
  stem: 'Genes are arranged in a ______ order along a chromosome, each at its own position.',
  acc: [['linear', 'line', 'single line']],
  sol: 'Linear.',
  d: 2, c: 'recall', t: [5],
}));
add('gene-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: a segment of DNA that determines a particular character.',
  model: '**Gene.**',
  sol: 'Gene.', scheme: [['Gene', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('odd-chromosome', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Centromere, Chromatid, Cell plate, Gene.',
  model: '**Cell plate**; the others are **parts of a chromosome**.',
  sol: 'A cell plate forms during plant cytokinesis.', scheme: [['Odd one and category', 1]],
  d: 2, c: 'analysis', t: [5],
}));
add('relation-short', short({
  marks: 2,
  stem: 'Explain the relationship between DNA, genes and chromosomes.',
  model: 'A chromosome is made of one long **DNA** molecule coiled around proteins. Particular **segments** of this DNA are **genes**, each controlling a character. So genes lie on DNA, and DNA is packed into **chromosomes**.',
  sol: 'DNA → genes (segments) → chromosome (packed DNA).',
  scheme: [['DNA forms the chromosome', 1], ['Genes are segments of that DNA', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('chrom-draw', short({
  marks: 3, wl: null,
  stem: 'Draw a neat, labelled diagram of a chromosome as seen at metaphase. Label the chromatids, centromere and a gene.',
  model: 'An X- or V-shaped body made of **two parallel chromatids** joined at a narrow **centromere**; a band on one chromatid labelled **gene**.',
  sol: 'Two chromatids, centromere, gene labelled.',
  scheme: [['Two chromatids joined at a constriction', 1], ['Centromere labelled', 1], ['Chromatid and gene labelled', 1]],
  d: 2, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- 5-mark Question 2 style items
add('passage-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [meiosis, metaphase, cytokinesis, interphase, S, telophase, anaphase, mitosis]\n\nA cell spends most of its life in (a) ______, during which its DNA is copied in the (b) ______ phase. When it divides by (c) ______, its chromosomes first line up on the equator in (d) ______. Finally, the cytoplasm divides by (e) ______, giving two identical cells.',
  acc: [['interphase'], ['S', 'synthesis'], ['mitosis'], ['metaphase'], ['cytokinesis']],
  sol: '(a) interphase; (b) S; (c) mitosis; (d) metaphase; (e) cytokinesis.',
  d: 2, c: 'understanding', t: [1, 2],
}));
add('passage2-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [haploid, four, two, crossing over, homologous, diploid, testes, centromere]\n\nGametes are formed by meiosis in organs such as the (a) ______ . One cell gives (b) ______ daughter cells, each (c) ______. Before the cells separate, (d) ______ chromosomes pair up and exchange segments by (e) ______, which produces variation.',
  acc: [['testes', 'testis'], ['four', '4'], ['haploid'], ['homologous'], ['crossing over']],
  sol: '(a) testes; (b) four; (c) haploid; (d) homologous; (e) crossing over.',
  d: 2, c: 'understanding', t: [3],
}));
add('chrom-match5', match({
  marks: 5,
  stem: 'Study the diagram of a chromosome and match each lettered structure with its function.',
  pairs: [
    ['A', 'One of two identical copies that go to separate daughter cells'],
    ['B', 'Holds the copies together and attaches to spindle fibres'],
    ['C', 'Controls one particular character'],
    ['D', 'Carries the coded genetic instructions'],
    ['E', 'Form in which the genetic material lies in a non-dividing nucleus'],
  ],
  order: [2, 0, 4, 1, 3],
  sol: 'A chromatid; B centromere; C gene; D DNA double helix; E chromatin.',
  d: 2, c: 'application', t: [5],
  assets: [chromFig],
}));

// ---------------------------------------------------------------- case-based (10 marks, Section B style)
add('roottip-case', mk.case({
  passage: `Ritu crushed and stained an onion root tip and examined it under a microscope. She counted the cells in each stage:\n\n| Stage | Cells |\n|---|---|\n| Interphase | ${ROOT.interphase} |\n| Prophase | ${ROOT.prophase} |\n| Metaphase | ${ROOT.metaphase} |\n| Anaphase | ${ROOT.anaphase} |\n| Telophase | ${ROOT.telophase} |`,
  d: 3, c: 'analysis',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Why did Ritu use the root tip and not an older part of the root?', model: 'The root tip has **meristematic cells** that divide actively by mitosis.', sol: 'Actively dividing cells.', scheme: [['Meristem / actively dividing', 1]], d: 2, c: 'understanding', t: [2] })),
    part('b', short({ marks: 1, wl: null, stem: 'Which stage had the most cells? What does this tell you about its duration?', model: '**Interphase**; it is the **longest** stage of the cell cycle.', sol: 'Interphase is longest.', scheme: [['Interphase, longest', 1]], d: 2, c: 'analysis', t: [1] })),
    part('c', num({ stem: 'What percentage of the counted cells were dividing (in prophase to telophase)?', value: ROOT.pctDividing, unit: '%', sol: r`Dividing cells $= ${ROOT.prophase} + ${ROOT.metaphase} + ${ROOT.anaphase} + ${ROOT.telophase} = ${ROOT.dividing}$; $\dfrac{${ROOT.dividing}}{${ROOT.total}} \times 100 = ${ROOT.pctDividing}$ percent.`, scheme: [['Dividing cells added', 1], [`${ROOT.pctDividing} percent`, 1]], marks: 2, d: 3, c: 'application', t: [1, 2] })),
    part('d', short({ marks: 3, stem: 'Describe what happens to the chromosomes in the stage that had the fewest cells, and name that stage.', model: '**Telophase** (only 4 cells). The two groups of daughter chromosomes reach the opposite **poles** and begin to **uncoil**, becoming thin and less distinct. A **nuclear membrane** and a **nucleolus** re-form around each group, so the cell now has **two nuclei**, and the spindle breaks down.', sol: 'Telophase: chromosomes uncoil, nuclei re-form.', scheme: [['Telophase named', 1], ['Chromosomes at poles uncoil', 1], ['Nuclear membrane and nucleolus re-form', 1]], d: 3, c: 'analysis', t: [2] }), [
      short({ marks: 3, stem: 'Describe what happens in anaphase and explain why it is important that it happens correctly.', model: 'Each centromere **splits** and the sister chromatids are pulled to **opposite poles** by the spindle fibres. This ensures that **each daughter nucleus** gets **one copy of every chromosome**, so both cells have the **same chromosome number** as the parent.', sol: 'Chromatids separate; equal distribution.', scheme: [['Centromere splits, chromatids separate', 1], ['Move to opposite poles', 1], ['Ensures equal sets', 1]], d: 3, c: 'analysis', t: [2] }),
    ]),
    part('e', short({ marks: 3, wl: null, stem: 'Draw a neat, labelled diagram of a cell from Ritu\'s slide at anaphase (take 2n = 4). Label the spindle fibre, pole and daughter chromosome.', model: 'A rectangular plant cell with a **spindle**; **four V-shaped daughter chromosomes** moving towards each **pole**, centromeres leading; spindle fibres attached to them. No centrioles (plant cell).', sol: 'Anaphase diagram with labels.', scheme: [['Two groups of four chromosomes moving apart', 1], ['Spindle fibres to poles', 1], ['Three labels', 1]], d: 3, c: 'application', t: [2] })),
  ],
}));
add('wound-case', mk.case({
  passage: 'Arjun scraped his elbow while playing football. Within a week, new skin had covered the wound. His teacher said that the new cells formed by a type of division that copies the cell exactly, after the DNA has been copied in an earlier phase of the cell cycle.',
  d: 3, c: 'application',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name the type of cell division that healed the wound.', model: '**Mitosis.**', sol: 'Mitosis.', scheme: [['Mitosis', 1]], d: 1, c: 'recall', t: [2] })),
    part('b', short({ marks: 1, wl: null, stem: 'Name the phase of the cell cycle in which the DNA was copied.', model: '**S phase** (synthesis phase) of interphase.', sol: 'S phase.', scheme: [['S phase', 1]], d: 1, c: 'recall', t: [1] })),
    part('c', short({ marks: 2, stem: 'Why are the new skin cells identical to the old ones?', model: 'In mitosis each chromosome is **copied** and the two copies (chromatids) **separate equally**, so each daughter cell gets the **same set of chromosomes** and genes as the parent cell.', sol: 'Exact copying and equal sharing.', scheme: [['DNA copied', 1], ['Equal sharing of chromatids', 1]], d: 2, c: 'understanding', t: [2, 4] })),
    part('d', short({ marks: 2, stem: 'State two other uses of this type of division in the human body.', model: '1. **Growth** of the body from a zygote.\n2. **Replacement** of worn-out cells such as red blood cells and the lining of the gut.', sol: 'Growth; replacement.', scheme: [['First use', 1], ['Second use', 1]], d: 2, c: 'understanding', t: [4] })),
    part('e', short({ marks: 3, stem: 'How would cytokinesis in Arjun\'s skin cells differ from that in the cells of a growing mango shoot? Give three points.', model: '1. Skin cell: a **furrow** forms in the membrane; mango cell: a **cell plate** forms.\n2. The furrow deepens from **outside inwards**; the cell plate grows from the **centre outwards**.\n3. The mango cell lays down a **new cell wall**; the skin cell forms **no wall**.', sol: 'Furrow vs plate; direction; wall.', scheme: [['First point', 1], ['Second point', 1], ['Third point', 1]], d: 3, c: 'analysis', t: [2] })),
    part('f', short({ marks: 1, wl: null, stem: 'Name the structure that organises the spindle in Arjun\'s skin cells.', model: '**Centrioles** (centrosome).', sol: 'Centrioles.', scheme: [['Centrioles', 1]], d: 2, c: 'recall', t: [2] })),
  ],
}));
add('siblings-case', mk.case({
  passage: 'Meera and her brother Kabir have the same parents, yet Meera has curly hair and dark eyes while Kabir has straight hair and lighter eyes. Their biology teacher explains that each of them developed from a different egg and sperm, and that no two sperms (or eggs) from the same parent are exactly alike.',
  d: 3, c: 'analysis',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name the type of cell division that forms eggs and sperms.', model: '**Meiosis.**', sol: 'Meiosis.', scheme: [['Meiosis', 1]], d: 1, c: 'recall', t: [3] })),
    part('b', num({ stem: 'Human body cells have 46 chromosomes. How many chromosomes does each of Kabir\'s sperm cells carry?', value: afterMeiosis(46), sol: `46 ÷ 2 = ${afterMeiosis(46)}.`, scheme: [[`${afterMeiosis(46)}`, 1]], d: 1, c: 'application', t: [3] }), [
      num({ stem: 'How many chromosomes did the zygote from which Meera developed contain?', value: 46, sol: '23 from the egg + 23 from the sperm = 46.', scheme: [['46', 1]], d: 1, c: 'application', t: [3] }),
    ]),
    part('c', short({ marks: 3, stem: 'Explain how crossing over makes each sperm different.', model: 'During meiosis, **homologous chromosomes** (one from each parent) **pair up**. Their **non-sister chromatids** cross at points called **chiasmata** and **exchange segments**. The chromatids now carry **new combinations of genes**, so the sperms that receive them differ from one another.', sol: 'Pairing, exchange, new combinations.', scheme: [['Homologous chromosomes pair', 1], ['Segments exchanged between chromatids', 1], ['New gene combinations in gametes', 1]], d: 3, c: 'analysis', t: [3] })),
    part('d', short({ marks: 2, stem: 'Why must the chromosome number be halved when eggs and sperms are formed?', model: 'So that after **fertilisation** the zygote has the normal **46**, not 92; otherwise the number would **double every generation**.', sol: 'Constant number after fertilisation.', scheme: [['Fertilisation restores 46', 1], ['Prevents doubling', 1]], d: 2, c: 'understanding', t: [3, 4] })),
    part('e', short({ marks: 3, stem: 'Tabulate three differences between the division that formed Kabir\'s sperms and the division by which he grew from a zygote.', model: '| Meiosis (sperms) | Mitosis (growth) |\n|---|---|\n| In **testes** only | In **body cells** |\n| **Four** cells formed | **Two** cells formed |\n| Chromosome number **halved** | Number **unchanged** |', sol: 'Any three valid differences.', scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]], d: 2, c: 'understanding', t: [4] })),
  ],
}));
add('chromfig-case', mk.case({
  stem: 'Study the diagram and answer the questions.',
  passage: 'The diagram shows a chromosome taken from a dividing human cell, with a magnified box showing its fine structure. Parts are lettered A to E.',
  d: 3, c: 'application',
  assets: [chromFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name the part labelled B.', model: '**Centromere.**', sol: 'Centromere.', scheme: [['Centromere', 1]], d: 1, c: 'recall', t: [5] })),
    part('b', short({ marks: 2, stem: 'Name the part labelled D and state how C is related to it.', model: 'D is **DNA** (the double helix). C is a **gene**, which is a particular **segment of this DNA** that controls one character.', sol: 'DNA; gene is a segment of DNA.', scheme: [['DNA', 1], ['Gene is a segment of DNA', 1]], d: 2, c: 'understanding', t: [5] })),
    part('c', short({ marks: 1, wl: null, stem: 'In which phase of the cell cycle did the chromosome come to have two parts like A?', model: 'In the **S phase**, when DNA is copied, giving **two sister chromatids**.', sol: 'S phase.', scheme: [['S phase', 1]], d: 2, c: 'application', t: [1, 5] })),
    part('d', short({ marks: 2, stem: 'Why is the genetic material seen as E in a cell that is not dividing, but as a compact chromosome during division?', model: 'In a non-dividing cell the DNA stays **uncoiled as chromatin** so that genes can be **read** to make proteins. During division it **coils tightly** into compact chromosomes that can be **moved** to the daughter cells without tangling.', sol: 'Chromatin for working; condensed for moving.', scheme: [['Chromatin uncoiled for use', 1], ['Condensed for separation', 1]], d: 3, c: 'analysis', t: [5] })),
    part('e', short({ marks: 3, wl: null, stem: 'Draw a neat, labelled diagram of a chromosome showing the chromatids, centromere and a gene.', model: 'Two parallel **chromatids** joined at a constriction, the **centromere**; a band on one chromatid labelled **gene**.', sol: 'Labelled chromosome.', scheme: [['Two chromatids joined', 1], ['Centromere', 1], ['Gene band', 1]], d: 2, c: 'application', t: [5] })),
    part('f', short({ marks: 1, wl: null, stem: 'How many chromosomes like this are present in a normal human body cell?', model: '**46** (23 pairs).', sol: '46.', scheme: [['46', 1]], d: 1, c: 'recall', t: [5] })),
  ],
}));
add('colchicine-case', mk.case({
  passage: 'A plant breeder treated growing shoot tips of a crop plant with colchicine, a chemical that stops spindle fibres from forming. The cells copied their chromosomes, but the chromatids did not separate to opposite poles, and the cells did not divide.',
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({ stem: 'Which stage of mitosis cannot be completed without spindle fibres?', right: 'Anaphase', wrong: ['Interphase', 'S phase', 'G1 phase'], sol: 'Chromatids are pulled apart by spindle fibres in anaphase — option (@K).', d: 2, c: 'application', t: [2] })),
    part('b', short({ marks: 2, stem: 'If a treated cell had 20 chromosomes before treatment, how many will it have afterwards? Explain.', model: '**40.** The DNA and chromosomes were **copied**, but the chromatids did not **separate** into two cells, so all the copies stay in **one nucleus**: 20 × 2 = 40.', sol: 'Doubled to 40.', scheme: [['40', 1], ['Copied but not separated', 1]], d: 4, c: 'analysis', t: [2] })),
    part('c', short({ marks: 2, stem: 'State two roles of spindle fibres in normal mitosis.', model: '1. They **attach to centromeres** and line the chromosomes up on the **equator**.\n2. They **pull sister chromatids** to **opposite poles** in anaphase.', sol: 'Alignment; separation.', scheme: [['Alignment', 1], ['Separation', 1]], d: 2, c: 'understanding', t: [2] })),
    part('d', short({ marks: 2, stem: 'Arrange the stages of mitosis in order and name the stage in which the chromosomes are first seen as distinct threads.', model: 'The order is prophase → metaphase → anaphase → telophase. Chromosomes are first seen as distinct, thread-like structures in **prophase**, when the chromatin condenses.', sol: 'P-M-A-T; prophase.', scheme: [['Correct order', 1], ['Prophase', 1]], d: 2, c: 'understanding', t: [2] })),
    part('e', short({ marks: 3, stem: 'Give three differences between prophase and telophase.', model: '1. In prophase the chromosomes **condense** and become thick; in telophase they **uncoil** and become thin again.\n2. In prophase the nuclear membrane and nucleolus **disappear**; in telophase they **re-form** around each group.\n3. In prophase the **spindle starts to form**; in telophase the spindle **breaks down**.', sol: 'Opposite events.', scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]], d: 3, c: 'analysis', t: [2] })),
  ],
}));
add('lily-case', mk.case({
  passage: 'The body cells of a lily plant have 24 chromosomes. In its anthers, pollen mother cells divide to form pollen grains; in its shoot tips, cells divide to make the stem longer.',
  d: 3, c: 'application',
  children: [
    part('a', num({ stem: 'How many chromosomes are present in each pollen grain?', value: afterMeiosis(24), sol: `Meiosis halves the number: 24 ÷ 2 = ${afterMeiosis(24)}.`, scheme: [[`${afterMeiosis(24)}`, 1]], d: 2, c: 'application', t: [3] })),
    part('b', num({ stem: 'How many cells are formed when one pollen mother cell completes meiosis?', value: 4, sol: 'One pollen mother cell gives 4 cells by meiosis.', scheme: [['4', 1]], d: 1, c: 'recall', t: [3] })),
    part('c', num({ stem: 'How many chromosomes does each daughter cell in the shoot tip have?', value: afterMitosis(24), sol: 'Mitosis keeps the number: 24.', scheme: [['24', 1]], d: 1, c: 'application', t: [2] })),
    part('d', short({ marks: 2, stem: 'Give reason: meiosis is called a reduction division.', model: 'Because it **reduces** the chromosome number to **half** — from **24 (diploid)** in the mother cell to **12 (haploid)** in each pollen grain.', sol: 'Halves the number.', scheme: [['Halves chromosome number', 1], ['Linked to the lily numbers', 1]], d: 2, c: 'understanding', t: [3] })),
    part('e', short({ marks: 2, stem: 'Why would pollen grains formed by mitosis be useless for sexual reproduction?', model: 'They would carry **24** chromosomes; after fertilisation the offspring would have **48**, double the normal number, which would upset development.', sol: 'Number would double.', scheme: [['Diploid gametes', 1], ['Offspring number doubles', 1]], d: 3, c: 'analysis', t: [3, 4] })),
    part('f', short({ marks: 3, stem: 'State three ways in which the two divisions in this lily plant differ.', model: '1. Anther: **meiosis**; shoot tip: **mitosis**.\n2. Meiosis gives **four** cells, mitosis **two**.\n3. Meiosis cells have **12** chromosomes and **differ** from each other; mitosis cells have **24** and are **identical**.', sol: 'Type, number of cells, chromosome number/variation.', scheme: [['First', 1], ['Second', 1], ['Third', 1]], d: 2, c: 'understanding', t: [4] })),
  ],
}));

// ---------------------------------------------------------------- extra bank items
add('meristem-mcq', mcq({
  stem: 'In which part of a plant would you expect to find the largest number of cells dividing by mitosis?',
  right: 'The tip of a growing root', wrong: ['A mature leaf', 'The pith of an old stem', 'A ripe fruit'],
  sol: 'Root and shoot tips (apical meristems) divide actively — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('daughter-mcq', mcq({
  stem: 'A cell with 8 chromosomes divides by mitosis. The two daughter cells will have',
  right: '8 chromosomes each', wrong: ['4 chromosomes each', '16 chromosomes each', '8 and 4 chromosomes'],
  sol: 'Mitosis keeps the number unchanged — option (@K).',
  d: 1, c: 'application', t: [2],
}));
add('variation-tf', tf({
  stem: 'The four cells produced by meiosis are genetically identical to one another.',
  key: 'f',
  sol: 'False. Crossing over and random sorting of chromosomes make them differ.',
  d: 2, c: 'understanding', t: [3],
}));
