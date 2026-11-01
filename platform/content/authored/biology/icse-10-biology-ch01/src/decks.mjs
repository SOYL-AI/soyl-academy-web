// ICSE 10 Biology ch01 Cell Cycle, Cell Division and Structure of Chromosomes — Part 1 (t01–t02), Part 2 (t03–t05).
import { sl, deck, table, flow, svgV } from './lib.mjs';
import { CYCLE, MITOSIS, CHROMOSOME, CYTOKINESIS, CROSSOVER } from './svgs.mjs';
import { DNA, ROOT, afterMeiosis, chromatidsAtMetaphase, cellsAfter } from './calc.mjs';

export const V = {
  cycle: svgV(CYCLE, 'The cell cycle: G1, S, G2 and M phases'),
  mitosis: svgV(MITOSIS, 'Prophase, metaphase, anaphase and telophase in an animal cell'),
  chromosome: svgV(CHROMOSOME, 'Structure of a chromosome with chromatin and DNA'),
  cytokinesis: svgV(CYTOKINESIS, 'Furrowing in an animal cell and a cell plate in a plant cell'),
  crossover: svgV(CROSSOVER, 'Crossing over between homologous chromosomes'),
};

export const deck1 = deck({
  part: 1,
  title: 'Cell Cycle and Cell Division — Part 1: The cell cycle and mitosis',
  goals: [
    'Describe the events of the G1, S and G2 phases and draw the cell cycle',
    'Identify the stages of mitosis from a diagram or slide and describe what happens to the chromosomes',
    'Distinguish cytokinesis in plant cells (cell plate) from animal cells (furrowing)',
  ],
  slides: [
    sl('title', 'Cell Cycle, Cell Division and Chromosomes', {
      b: 'Part 1 — how a cell grows, copies its DNA and divides into two identical cells.',
      v: flow('LR', [['i', 'Interphase: grow and copy DNA'], ['k', 'Karyokinesis: nucleus divides'], ['c', 'Cytokinesis: cytoplasm divides']], [['i', 'k'], ['k', 'c'], ['c', 'i', 'next cycle']], 'Flow of the cell cycle: interphase, then karyokinesis, then cytokinesis, and back to interphase'),
      n: 'You began life as a single cell. Today your body has trillions. Every one of those cells came from an earlier cell by division. In this part we follow one cell through its life: growing, copying its genetic material, and splitting into two.',
    }),
    sl('diagram', 'The cell cycle', {
      b: 'The **cell cycle** is the sequence of events from the formation of a cell to its own division. It has **interphase** (G1, S, G2) and the **M phase** (mitosis and cytokinesis).',
      v: V.cycle,
      n: 'Think of the cycle as a clock. Most of the time the cell is in interphase, which has three parts. Only a short part of the cycle is spent actually dividing. When the division ends, each new cell starts the cycle again.',
    }),
    sl('concept', 'What happens in interphase', {
      v: table(['Phase', 'Main events'], [['G1 (first gap)', 'Cell grows; makes proteins and new organelles'], ['S (synthesis)', 'DNA is copied; each chromosome now has two chromatids'], ['G2 (second gap)', 'Cell makes proteins for the spindle and gets ready to divide']], 'Table of the three phases of interphase and their main events'),
      n: 'Interphase is not a resting stage. In the first gap the cell grows. In the synthesis phase it makes an exact copy of all its DNA. In the second gap it builds the materials it will need for division.',
    }),
    sl('check', 'Quick check: copying DNA', {
      b: 'In which phase is the DNA copied?',
      chk: 's-phase-mcq',
      n: 'Remember what the letter S stands for.',
    }),
    sl('example', 'Worked example 1: DNA through the cycle', {
      b: 'Take the DNA in a gamete as 1 unit (C).',
      ul: ['Step 1: a body cell in G1 has **2C**.', 'Step 2: after the S phase it has **4C**.', 'Step 3: each daughter cell after mitosis has **2C** again.'],
      v: table(['Stage', 'DNA content'], [['G1', `${DNA.G1}C`], ['End of S and G2', `${DNA.S_end}C`], ['Each daughter cell', `${DNA.daughter}C`], ['Gamete (after meiosis)', `${DNA.gamete}C`]], 'Table of DNA content: two units in G1, four after the S phase and in G2, two in each daughter cell, one in a gamete'),
      n: 'The amount of DNA doubles in the synthesis phase and is then shared equally between the two daughter cells. So each new cell has exactly as much DNA as its parent had before copying.',
    }),
    sl('diagram', 'Stages of mitosis', {
      b: '**Mitosis** divides the nucleus into two identical nuclei in four stages: **prophase, metaphase, anaphase, telophase**.',
      v: V.mitosis,
      n: 'Here is an animal cell with four chromosomes. In prophase they thicken and the nuclear membrane fades. In metaphase they line up across the middle. In anaphase their halves are pulled apart. In telophase two new nuclei form.',
    }),
    sl('concept', 'What happens in each stage', {
      v: table(['Stage', 'What you see'], [['Prophase', 'Chromatin condenses into chromosomes of two chromatids; nucleolus and nuclear membrane disappear; centrioles move to the poles and the spindle forms'], ['Metaphase', 'Chromosomes line up on the equator; each centromere is attached to spindle fibres from both poles'], ['Anaphase', 'Centromeres split; sister chromatids move to opposite poles'], ['Telophase', 'Chromosomes reach the poles and uncoil; nuclear membranes and nucleoli re-form']], 'Table of the four stages of mitosis and what is seen in each'),
      n: 'Learn each stage by what the chromosomes are doing. Thickening, lining up, separating, and arriving. Telophase is almost prophase played backwards.',
    }),
    sl('example', 'Worked example 2: naming the stage', {
      b: 'An onion root-tip slide shows these cells. Name the stage.',
      ul: ['Step 1: look for the **nuclear membrane**: present or absent?', 'Step 2: look at the **chromosomes**: threads, a single row, or two moving groups?', 'Step 3: name the stage.'],
      v: table(['What the cell shows', 'Stage'], [['Thick threads; nuclear membrane fading', 'Prophase'], ['Chromosomes in one row across the middle', 'Metaphase'], ['Two groups of V-shaped chromosomes moving apart', 'Anaphase'], ['Two groups at the ends; new membranes forming', 'Telophase']], 'Worked table matching four slide descriptions to the stages prophase, metaphase, anaphase and telophase'),
      n: 'When you see a slide, ask two questions. Is there a nuclear membrane? And what are the chromosomes doing? A single row means metaphase. Two groups moving apart means anaphase.',
    }),
    sl('check', 'Quick check: separating chromatids', {
      b: 'True or false: in anaphase each chromosome splits at its centromere.',
      chk: 'metaphase-tf',
      n: 'What holds the two chromatids together, and when does it split?',
    }),
    sl('diagram', 'Cytokinesis: furrow or cell plate', {
      b: '**Cytokinesis** divides the cytoplasm. Animal cells form a **furrow**; plant cells form a **cell plate**.',
      v: V.cytokinesis,
      n: 'After the nucleus divides, the cytoplasm must be shared. An animal cell pinches in from the outside, like a balloon squeezed in the middle. A plant cell cannot do this because of its wall, so it builds a new wall from the centre outwards.',
    }),
    sl('check', 'Quick check: the cell plate', {
      b: 'Why does a plant cell form a cell plate?',
      chk: 'cellplate-mcq',
      n: 'Think about what surrounds a plant cell.',
    }),
    sl('concept', 'Where mitosis happens', {
      v: table(['Use of mitosis', 'Example'], [['Growth', 'A seedling grows taller; a baby grows into an adult'], ['Repair', 'A cut in the skin heals'], ['Replacement', 'Old red blood cells and gut lining cells are replaced'], ['Asexual reproduction', 'Amoeba splits; potato tubers give new plants']], 'Table of four uses of mitosis with examples'),
      n: 'Mitosis happens wherever new, identical cells are needed: in growing root and shoot tips, in healing skin, in bone marrow and in many single-celled organisms that reproduce by splitting.',
    }),
    sl('summary', 'Summary', {
      ul: ['Cell cycle: interphase (G1, S, G2) plus M phase.', 'DNA is copied in the S phase.', 'Mitosis: prophase, metaphase, anaphase, telophase.', 'Cytokinesis: furrow in animal cells, cell plate in plant cells.', 'Mitosis gives two identical cells for growth, repair and asexual reproduction.'],
      v: table(['Stage', 'Key word'], [['Prophase', 'Condense'], ['Metaphase', 'Line up'], ['Anaphase', 'Separate'], ['Telophase', 'Re-form']], 'Summary table of one key word for each stage of mitosis'),
      n: 'To recap. A cell spends most of its life in interphase, copying its DNA in the synthesis phase. Mitosis then shares the copies equally in four stages, and cytokinesis divides the cytoplasm.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Do not call interphase a **resting** stage: the cell is very active.', 'For diagrams, show **chromatids** joined at a **centromere** in prophase and metaphase.', 'Plant cells: **cell plate**, **no centrioles**. Animal cells: **furrow**, **centrioles**.', 'Give the stage **and** the evidence when identifying from a slide.'],
      n: 'Exam tips. Interphase is busy, not resting. Draw chromatids and centromeres neatly. Remember the plant and animal differences. And when you name a stage, say what you saw that told you.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Cell Cycle and Cell Division — Part 2: Meiosis and the chromosome',
  goals: [
    'Explain why meiosis halves the chromosome number and how crossing over produces variation',
    'Tabulate the differences between mitosis and meiosis and state the significance of each',
    'Draw and label a chromosome and relate DNA, genes, chromatin and chromosomes',
  ],
  slides: [
    sl('title', 'Meiosis and the Chromosome', {
      b: 'Part 2 — the division that makes gametes, and what a chromosome is made of.',
      v: flow('LR', [['p', 'Parent cells: diploid'], ['m', 'Meiosis'], ['g', 'Gametes: haploid'], ['f', 'Fertilisation'], ['z', 'Zygote: diploid']], [['p', 'm'], ['m', 'g'], ['g', 'f'], ['f', 'z']], 'Flow: diploid parent cells undergo meiosis to form haploid gametes, which fuse at fertilisation to form a diploid zygote'),
      n: 'Mitosis keeps the chromosome number the same. But eggs and sperms must carry only half. Meiosis is the special division that makes this possible, and it also mixes genes so that every child is unique.',
    }),
    sl('concept', 'Why meiosis halves the number', {
      b: '**Meiosis** is a **reduction division**: one diploid (2n) cell gives **four haploid (n)** cells.',
      v: table(['Cell', 'Human chromosome number'], [['Body cell (diploid)', '46'], ['Sperm or egg (haploid)', String(afterMeiosis(46))], ['Zygote after fertilisation', '46']], 'Table of human chromosome numbers: body cell forty-six, sperm or egg twenty-three, zygote forty-six'),
      n: 'If gametes carried the full number, every new generation would have double the chromosomes of the last. Meiosis halves the number in the gametes, and fertilisation restores it. So the number stays the same from parents to children.',
    }),
    sl('diagram', 'Homologous chromosomes and crossing over', {
      b: '**Homologous chromosomes** are a matching pair, one from each parent. In meiosis they pair up and exchange segments: **crossing over**.',
      v: V.crossover,
      n: 'Each pair has one chromosome from the father and one from the mother. During meiosis the pair lies side by side. Two chromatids cross at a point called a chiasma and swap pieces. The chromatids now carry new mixtures of genes.',
    }),
    sl('check', 'Quick check: crossing over', {
      b: 'Crossing over results in…',
      chk: 'crossing-mcq',
      n: 'What is new after the segments are swapped?',
    }),
    sl('example', 'Worked example 1: counting chromosomes', {
      b: 'Apply the rule: mitosis keeps the number; meiosis halves it.',
      ul: ['Step 1: note the **diploid** number.', 'Step 2: mitosis gives the **same** number; meiosis gives **half**.', 'Step 3: fertilisation adds two haploid sets.'],
      v: table(['Organism', 'Body cell', 'After mitosis', 'Gamete (after meiosis)'], [['Human', '46', '46', String(afterMeiosis(46))], ['Dog', '78', '78', String(afterMeiosis(78))], ['Lily', '24', '24', String(afterMeiosis(24))]], 'Worked table: human forty-six, forty-six, twenty-three; dog seventy-eight, seventy-eight, thirty-nine; lily twenty-four, twenty-four, twelve'),
      n: 'Whatever the organism, mitosis leaves the number unchanged and meiosis halves it. A dog with seventy eight chromosomes makes sperms with thirty nine. A lily with twenty four makes pollen with twelve.',
    }),
    sl('check', 'Quick check: the gamete number', {
      b: 'Fill in: meiosis reduces the chromosome number to ______ in the gametes.',
      chk: 'gamete-fill',
      n: 'One word for half a set.',
    }),
    sl('concept', 'Mitosis and meiosis compared', {
      v: table(['Point', 'Mitosis', 'Meiosis'], [['Where', 'Body cells', 'Reproductive organs (gamete formation)'], ['Daughter cells', 'Two', 'Four'], ['Chromosome number', 'Unchanged (2n to 2n)', 'Halved (2n to n)'], ['Crossing over', 'No', 'Yes'], ['Daughter cells are', 'Identical to the parent', 'Different from the parent and each other'], ['Purpose', 'Growth, repair, asexual reproduction', 'Gamete formation, variation']], 'Table comparing mitosis and meiosis on where, daughter cells, chromosome number, crossing over, likeness and purpose'),
      n: 'Compare the two divisions point by point. Mitosis makes two identical body cells. Meiosis makes four different gametes with half the chromosomes. That difference is why we grow by mitosis but reproduce sexually through meiosis.',
    }),
    sl('concept', 'Significance of each division', {
      v: table(['Mitosis', 'Meiosis'], [['Growth of the body', 'Keeps the chromosome number constant over generations'], ['Repair and replacement of cells', 'Produces variation through crossing over and random sorting'], ['Asexual reproduction', 'Variation is the raw material of evolution']], 'Table of the significance of mitosis and of meiosis'),
      n: 'Mitosis keeps an organism growing and repaired. Meiosis keeps a species stable in chromosome number while making each offspring a little different. That variation helps a species survive when the environment changes.',
    }),
    sl('diagram', 'Structure of a chromosome', {
      b: 'A chromosome at metaphase has **two sister chromatids** joined at the **centromere**. It is made of **DNA** coiled with proteins (**chromatin**); **genes** are segments of the DNA.',
      v: V.chromosome,
      n: 'Look closely at one chromosome. Its two arms are identical copies called chromatids, held at the centromere. Zoom in and you find chromatin, DNA wound on protein beads. Zoom in further and you see the double helix. A gene is just one stretch of that DNA.',
    }),
    sl('concept', 'From DNA to chromosome', {
      v: flow('LR', [['d', 'DNA double helix'], ['g', 'Genes: segments of DNA'], ['c', 'Chromatin: DNA on proteins'], ['h', 'Chromosome: coiled chromatin']], [['d', 'g'], ['g', 'c'], ['c', 'h']], 'Flow: the DNA double helix carries genes; DNA wound on proteins forms chromatin; chromatin coils into a chromosome'),
      n: 'In a non dividing cell the DNA stays loose as chromatin so that genes can be used. When the cell divides, the chromatin coils tightly into chromosomes so that it can be moved safely into the daughter cells.',
    }),
    sl('example', 'Worked example 2: chromosomes or chromatids?', {
      b: 'Count carefully at each stage in a human cell.',
      ul: ['Step 1: before the S phase, each chromosome is a **single** thread.', 'Step 2: after the S phase, each has **two chromatids**.', 'Step 3: in anaphase the chromatids separate and each is counted as a **chromosome**.'],
      v: table(['Stage', 'Chromosomes', 'Chromatids'], [['G1', '46', '46 (single threads)'], ['Metaphase', '46', String(chromatidsAtMetaphase(46))], ['Each daughter cell', '46', '46']], 'Worked table: in G1 forty-six chromosomes; at metaphase forty-six chromosomes and ninety-two chromatids; each daughter cell forty-six'),
      n: 'A common trap is to double the chromosome number at metaphase. The number of chromosomes stays forty six; it is the chromatids that double to ninety two. Count centromeres to count chromosomes.',
    }),
    sl('check', 'Quick check: the centromere', {
      b: 'Which part holds the sister chromatids together?',
      chk: 'centromere-mcq',
      n: 'It is also where the spindle fibres attach.',
    }),
    sl('summary', 'Summary', {
      ul: ['Meiosis halves the chromosome number: four haploid gametes from one diploid cell.', 'Crossing over between homologous chromosomes produces variation.', 'Mitosis: growth and repair. Meiosis: constant number and variation.', 'Chromosome: two chromatids, centromere; DNA with genes, packed as chromatin.'],
      v: table(['Term', 'Meaning'], [['Homologous pair', 'Matching chromosomes, one from each parent'], ['Chromatid', 'One of two copies of a chromosome'], ['Gene', 'Segment of DNA for a character']], 'Summary table of three key terms'),
      n: 'To recap. Meiosis makes gametes with half the chromosomes and mixes genes by crossing over. Mitosis grows and repairs the body. And every chromosome is DNA, carrying genes, packed into two chromatids at division.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Stages of meiosis are **not** in your syllabus: learn its **purpose**, **reduction** and **crossing over**.', 'In difference tables, write **matching points** side by side.', 'Count **centromeres** to count chromosomes.', 'Label diagrams with **ruled lines** and neat print.'],
      n: 'Exam tips. You do not need the stages of meiosis, but you must explain why it halves the number and how crossing over causes variation. Write differences point against point, count chromosomes by their centromeres, and label diagrams neatly.',
    }),
  ],
});
