// ch10 Cell Cycle and Cell Division — two decks: Part 1 (t01 cell cycle, t02 mitosis), Part 2 (t03 meiosis).
import { sl, deck, table, flow, svgV, r } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { CYCLE, DNA_CONTENT, MITOSIS, CYTOKINESIS, PROPHASE_I, MEIOSIS } from './svgs.mjs';
import { HUMAN, YEAST_MIN, N, DNA } from './calc.mjs';

export const V = {
  cycle: svgV(CYCLE, 'The cell cycle drawn as a ring with G1, S, G2 and M phases, interphase marked, and the quiescent stage G0 shown as a side exit'),
  dna: svgV(DNA_CONTENT, 'Graph of DNA content per nucleus through one cell cycle: 2C in G1, rising to 4C in S phase, steady through G2 and mitosis, then halved when the cell divides'),
  mitosis: svgV(MITOSIS, 'Labelled drawings of prophase, metaphase, anaphase, telophase and cytokinesis in an animal cell with four chromosomes'),
  cyto: svgV(CYTOKINESIS, 'Cytokinesis in an animal cell by furrowing and in a plant cell by a growing cell plate'),
  prophase1: svgV(PROPHASE_I, 'Five substages of prophase I of meiosis for one pair of homologous chromosomes: leptotene, zygotene, pachytene, diplotene and diakinesis'),
  meiosis: svgV(MEIOSIS, 'Metaphase I, anaphase I and telophase I, then metaphase II, anaphase II and telophase II, ending in four haploid cells'),
  chromTable: table(
    ['Stage', 'Chromosomes in the cell', 'Chromatids in the cell'],
    [
      ['Prophase I', String(N.pea.prophaseI[0]), String(N.pea.prophaseI[1])],
      ['Metaphase I', `${N.pea.metaphaseI[0]} (as ${N.pea.metaphaseI[0] / 2} bivalents)`, String(N.pea.metaphaseI[1])],
      ['Anaphase I', `${N.pea.anaphaseI[0]} (${N.pea.poleAnaphaseI[0]} going to each pole)`, String(N.pea.anaphaseI[1])],
      ['Telophase I (each cell)', String(N.pea.telophaseI[0]), String(N.pea.telophaseI[1])],
      ['Anaphase II (each cell)', String(N.pea.anaphaseII[0]), String(N.pea.anaphaseII[1])],
      ['Telophase II (each cell)', String(N.pea.telophaseII[0]), String(N.pea.telophaseII[1])],
    ],
    'Table of chromosome and chromatid numbers through meiosis in a pea cell with fourteen chromosomes',
  ),
};

export const deck1 = deck({
  part: 1,
  title: 'Cell Cycle and Cell Division — Part 1: The cell cycle and mitosis',
  goals: [
    'Describe the phases of the cell cycle and the events of G1, S, G2 and M',
    'Describe the stages of mitosis and cytokinesis in animal and plant cells',
    'Explain the significance of mitosis',
  ],
  slides: [
    sl('title', 'Cell Cycle and Cell Division', {
      b: 'Part 1 — how a cell prepares for division and how mitosis shares out its chromosomes.',
      v: flow('LR', [['c', 'Cell grows and copies its DNA'], ['m', 'Mitosis shares the chromosomes'], ['k', 'Cytokinesis splits the cytoplasm'], ['d', 'Two daughter cells']], [['c', 'm'], ['m', 'k'], ['k', 'd']], 'Flow from a growing cell through mitosis and cytokinesis to two daughter cells'),
      n: 'Every cell comes from a pre-existing cell. A cell grows, copies its genetic material, and then divides into two. In this part we follow one turn of the cell cycle, and then watch in detail how the chromosomes are shared out during mitosis.',
    }),
    sl('concept', 'The cell cycle', {
      b: 'The **cell cycle** is the sequence of events by which a cell duplicates its genome, synthesises other constituents and divides into two daughter cells. It has two parts: **interphase** and the **M phase** (mitosis).',
      v: V.cycle,
      n: 'Human cells in culture take about twenty four hours for one cycle, while yeast needs only about ninety minutes. The actual division, the M phase, is the shortest part. The long interphase, which lies between two M phases, is when the cell prepares: it is anything but a resting phase.',
    }),
    sl('concept', 'Interphase: G one, S and G two', {
      b: '**Interphase** is the time between two M phases. Cell growth and DNA replication happen in an orderly sequence.',
      v: table(
        ['Phase', 'What happens', 'DNA and chromosomes'],
        [
          ['G1 (gap 1)', 'Cell is metabolically active and grows; no DNA replication', '2C DNA; 2n chromosomes'],
          ['S (synthesis)', 'DNA replicates; in animal cells the centriole duplicates in the cytoplasm', 'DNA rises from 2C to 4C; chromosome number stays 2n'],
          ['G2 (gap 2)', 'Proteins for mitosis are made; growth continues', '4C DNA; 2n chromosomes'],
        ],
        'Table of the events of G1, S and G2 with DNA content and chromosome number',
      ),
      n: 'In the first gap phase the cell grows and is metabolically active, but does not copy its DNA. In S phase the DNA is replicated, so the amount doubles, although the number of chromosomes does not change. In animal cells the centriole also duplicates in the cytoplasm. In the second gap phase proteins for mitosis are made and growth goes on.',
    }),
    sl('example', 'Worked example 1: the arithmetic of the cycle', {
      b: `Human cells in culture take about ${HUMAN.cycleH} hours per cycle, with the M phase lasting about ${HUMAN.mH} hour. Yeast divides about once in ${YEAST_MIN} minutes. (a) What share of the human cycle is interphase? (b) How many yeast cells arise from one cell in 9 hours?`,
      ul: [
        r`Interphase lasts $${HUMAN.cycleH} - ${HUMAN.mH} = ${HUMAN.cycleH - HUMAN.mH}$ hours, so its share is $\dfrac{${HUMAN.cycleH - HUMAN.mH}}{${HUMAN.cycleH}} \times 100 \approx ${N.interphaseShare}$ percent.`,
        r`In 9 hours, which is $540$ minutes, there are $\dfrac{540}{${YEAST_MIN}} = ${N.yeast9hGen}$ cycles.`,
        r`Each cycle doubles the number: $2^{${N.yeast9hGen}} = ${N.yeast9h}$ cells.`,
      ],
      v: table(['Quantity', 'Value'], [['Interphase share of human cycle', `about ${N.interphaseShare} percent`], ['Yeast cycles in 9 hours', String(N.yeast9hGen)], ['Yeast cells after 9 hours', String(N.yeast9h)]], `Worked table: interphase about ${N.interphaseShare} percent; ${N.yeast9h} yeast cells after nine hours`),
      n: 'Twenty three of the twenty four hours are interphase, so it makes up nearly ninety six percent of the cycle. Nine hours is five hundred and forty minutes, which is six ninety minute cycles. Each cycle doubles the number of cells, so one yeast cell becomes sixty four.',
    }),
    sl('check', 'Quick check: what is interphase?', {
      b: 'Interpret the observations from a time-lapse film.',
      n: 'Quick check. What is the cell doing during the long gaps between visible chromosome movements?',
      chk: 'interphase-mcq',
    }),
    sl('diagram', 'DNA content through the cycle', {
      b: 'DNA content per nucleus **doubles in S phase** and is **halved at division**. The chromosome number is unchanged by replication.',
      v: V.dna,
      n: 'In first gap phase the nucleus has the basic amount of DNA, called two C. During S phase it rises steadily to four C and stays there through the second gap phase and mitosis. When the cell divides, each daughter nucleus gets two C again. Replication adds chromatids, not new chromosomes.',
    }),
    sl('concept', 'G zero: the quiescent stage', {
      b: 'Some cells leave G1 and enter **G0**, the **quiescent stage**: the cell is **metabolically active but no longer proliferates** unless called on to do so. Many cells of the adult body, such as heart cells, stay in G0; others re-enter the cycle when needed.',
      v: table(['Cell type', 'Behaviour in the adult body'], [['Heart cells', 'Remain in G0 and do not divide'], ['Cells of the intestinal lining', 'Divide repeatedly through life, so they cycle continuously'], ['Cells of a wound edge', 'Leave G0 and divide when repair is needed']], 'Table of cell types showing G0, continuous cycling and re-entry into the cycle'),
      n: 'A cell that stops dividing leaves the cycle at first gap phase and enters the quiescent stage. It stays alive and active. Heart cells are an example. Some quiescent cells can be called back into the cycle, for instance when a wound needs repair.',
    }),
    sl('diagram', 'Mitosis: the stages', {
      b: '**Mitosis** is an **equational division**: the daughter cells receive the same chromosome number as the parent. It has two parts: **karyokinesis** (division of the nucleus) and **cytokinesis** (division of the cytoplasm).',
      v: V.mitosis,
      n: 'Prophase begins with the condensation of chromosomes, each already made of two chromatids joined at the centromere. The centrosomes move to opposite poles. Late in prophase the nuclear envelope, nucleolus, Golgi complex and endoplasmic reticulum disappear. Mitosis is a continuous process, and we divide it into stages only for convenience.',
    }),
    sl('concept', 'Metaphase and anaphase', {
      b: 'In **metaphase** the chromosomes are fully condensed and **spindle fibres attach to the kinetochores** of each chromosome. They lie on the **metaphase plate**. In **anaphase** the **centromeres split** and the chromatids move **centromere first** to opposite poles.',
      v: table(
        ['Stage', 'Key events', 'Why it matters'],
        [
          ['Metaphase', 'Chromosomes aligned at the equator; one chromatid of each chromosome attached to each pole', 'Best stage to count chromosomes and study their shape'],
          ['Anaphase', 'Centromeres split; chromatids, now chromosomes, move to opposite poles', 'Each pole receives a complete set of chromosomes'],
        ],
        'Table comparing metaphase and anaphase of mitosis',
      ),
      n: 'At metaphase the chromosomes are at their most condensed, which makes this the best stage for counting them and studying their shape. Spindle fibres from opposite poles hold the two chromatids of each chromosome. At anaphase the centromeres split, and each chromatid, now a chromosome, is pulled to a pole, centromere leading.',
    }),
    sl('check', 'Quick check: anaphase', {
      b: 'Work out a chromosome count at anaphase.',
      n: 'Quick check. How many chromosomes does a cell hold just after its centromeres split?',
      chk: 'anaphase-mcq',
    }),
    sl('diagram', 'Telophase and cytokinesis', {
      b: 'In **telophase** chromosomes reach the poles and decondense, and the nuclear envelope, nucleolus, Golgi complex and endoplasmic reticulum reform. In **cytokinesis** an animal cell forms a **furrow**; a plant cell forms a **cell plate**.',
      v: V.cyto,
      n: 'The animal cell membrane pinches in from the edge, forming a furrow that deepens until the cell is cut in two. A plant cell has a rigid wall, so a cell plate starts in the centre and grows outwards until it joins the side walls. Sometimes karyokinesis is not followed by cytokinesis, giving a multinucleate cell, as in the liquid endosperm of coconut.',
    }),
    sl('check', 'Quick check: cytokinesis', {
      b: 'Judge the assertion and the reason about plant cell division.',
      n: 'Quick check. Why can a plant cell not divide by furrowing?',
      chk: 'plantcyto-ar',
    }),
    sl('example', 'Worked example 2: reading a mitotic index', {
      b: `A student counts ${N.rootSample.total} cells in a stained root-tip squash: ${N.rootSample.interphase} in interphase, ${N.rootSample.prophase} in prophase, ${N.rootSample.metaphase} in metaphase, ${N.rootSample.anaphase} in anaphase and ${N.rootSample.telophase} in telophase. The cell cycle of these cells lasts ${N.rootCycle} hours. Find the mitotic index and the time spent in metaphase.`,
      ul: [
        r`Dividing cells: $${N.rootSample.prophase} + ${N.rootSample.metaphase} + ${N.rootSample.anaphase} + ${N.rootSample.telophase} = ${N.rootDividing}$.`,
        r`Mitotic index: $\dfrac{${N.rootDividing}}{${N.rootSample.total}} \times 100 = ${N.rootMI}$ percent.`,
        r`Metaphase time: $\dfrac{${N.rootSample.metaphase}}{${N.rootSample.total}} \times ${N.rootCycle} = ${N.rootMetaH}$ hour, which is $${N.rootMetaMin}$ minutes.`,
      ],
      v: table(['Stage', 'Cells counted', 'Time in the cycle (hours)'], [['Interphase', String(N.rootSample.interphase), String(N.rootInterH)], ['Prophase', String(N.rootSample.prophase), String(N.rootProH)], ['Metaphase', String(N.rootSample.metaphase), String(N.rootMetaH)], ['All of M phase', String(N.rootDividing), String(N.rootMH)]], `Worked table: mitotic index ${N.rootMI} percent; metaphase lasts ${N.rootMetaMin} minutes`),
      n: 'Forty eight of four hundred cells are dividing, a mitotic index of twelve percent. In a population where cells are at all stages, the share of cells in a phase matches the share of time the phase lasts. Eight out of four hundred is two percent of twenty hours, which is twenty four minutes of metaphase.',
    }),
    sl('concept', 'Significance of mitosis', {
      b: 'Mitosis produces **genetically identical** daughter cells with the **same chromosome number**.',
      v: table(
        ['Role', 'Example'],
        [
          ['Growth', 'A zygote becomes a multicellular body; cell number rises'],
          ['Restoring the nucleo-cytoplasmic ratio', 'A growing cell divides when its cytoplasm outgrows the control of its nucleus'],
          ['Replacing and repairing cells', 'Cells of the skin and the lining of the intestine; wound healing'],
          ['Continued growth in plants', 'Meristematic tissues divide throughout life, forming new cells at root and shoot tips'],
        ],
        'Table of the roles of mitosis with examples',
      ),
      n: 'Because each daughter cell receives an exact copy of the parental chromosomes, mitosis keeps the genetic make up constant. It is the basis of growth. It restores the balance between the nucleus and the cytoplasm of a growing cell, replaces worn out cells, and in plants keeps the meristems producing new cells all through life.',
    }),
    sl('summary', 'Summary', {
      ul: [
        'The cell cycle has a long interphase (G1, S, G2) and a short M phase.',
        'DNA replicates in S phase: 2C becomes 4C, chromosomes stay 2n.',
        'G0 is the quiescent stage; cells may re-enter the cycle.',
        'Mitosis stages: prophase, metaphase, anaphase, telophase; then cytokinesis.',
        'Animal cells divide by a furrow; plant cells by a cell plate.',
        'Mitosis gives identical cells: growth, repair and replacement.',
      ],
      v: V.cycle,
      n: 'To recap: a cell grows, copies its DNA in S phase and prepares in the second gap phase. Mitosis shares the chromosomes equally, and cytokinesis divides the cytoplasm. The daughter cells are identical to the parent, which is why mitosis serves growth and repair.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        '**S phase doubles the DNA, not the chromosome number**: always write 2C to 4C with 2n unchanged.',
        'Name the **events of each stage** of mitosis in order; draw the cell with chromosomes **labelled**.',
        'Compare **animal and plant cytokinesis** in a table (furrow versus cell plate).',
        'In counting problems, count **centromeres** for chromosomes and **chromatids** separately.',
      ],
      n: 'Exam tips. Remember that S phase doubles the DNA but not the number of chromosomes. Write the stages of mitosis in order with their events. Compare animal and plant cytokinesis. And when counting, count centromeres for chromosomes and chromatids separately.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Cell Cycle and Cell Division — Part 2: Meiosis',
  goals: [
    'Describe the substages of prophase I and the other stages of meiosis I and II',
    'Count chromosomes, chromatids and DNA through meiosis',
    'Compare mitosis and meiosis and explain the significance of meiosis',
  ],
  slides: [
    sl('title', 'Meiosis', {
      b: 'Part 2 — the reduction division that makes gametes and keeps the chromosome number constant.',
      v: flow('LR', [['m', 'Meiocyte (2n)'], ['a', 'Meiosis I: homologues separate'], ['b', 'Meiosis II: chromatids separate'], ['g', 'Four haploid cells (n)']], [['m', 'a'], ['a', 'b'], ['b', 'g']], 'Flow from a diploid meiocyte through meiosis I and II to four haploid cells'),
      n: 'Sexual reproduction joins two gametes. If gametes were diploid, the chromosome number would double in every generation. Meiosis prevents this by halving the number. It takes place in specialised diploid cells, called meiocytes, to form gametes or spores.',
    }),
    sl('concept', 'What happens in meiosis', {
      b: '**Meiosis** involves **two sequential cycles of nuclear and cell division**, meiosis I and meiosis II, but only a **single cycle of DNA replication**. It produces **four haploid cells**.',
      v: table(
        ['Feature', 'Meiosis'],
        [
          ['Starts from', 'A diploid meiocyte after S phase'],
          ['DNA replication', 'Once, before meiosis I'],
          ['Divisions', 'Two: meiosis I (reduction) and meiosis II (equational)'],
          ['Ends with', 'Four haploid cells, a tetrad'],
        ],
        'Table of the main features of meiosis',
      ),
      n: 'The DNA is copied only once, but the nucleus divides twice. In meiosis I the homologous chromosomes are separated, which halves the chromosome number. Meiosis II then separates the sister chromatids, much like mitosis. The result is four haploid cells.',
    }),
    sl('diagram', 'Prophase I: five substages', {
      b: 'Prophase I is **much longer and more complex** than mitotic prophase. It is divided into **leptotene, zygotene, pachytene, diplotene and diakinesis**.',
      v: V.prophase1,
      n: 'In leptotene the chromosomes begin to condense and become visible. In zygotene homologous chromosomes pair up, which is called synapsis. In pachytene the pairs are seen as tetrads of four chromatids, and crossing over takes place. In diplotene the homologues start to separate but stay joined at chiasmata. In diakinesis the chiasmata move to the ends, and the envelope breaks down.',
    }),
    sl('concept', 'Prophase I in more detail', {
      b: 'Learn each substage by its **signature event**.',
      v: table(
        ['Substage', 'Signature event'],
        [
          ['Leptotene', 'Chromosomes become gradually visible under the light microscope; compaction continues'],
          ['Zygotene', 'Homologues pair (**synapsis**); the paired chromosomes are **bivalents**, held by the **synaptonemal complex**'],
          ['Pachytene', 'Bivalent shows four chromatids, a **tetrad**; **crossing over** at recombination nodules, catalysed by the enzyme recombinase'],
          ['Diplotene', 'Synaptonemal complex dissolves; homologues separate but remain held at **chiasmata**, the sites of crossing over'],
          ['Diakinesis', 'Chiasmata **terminalise**; chromosomes fully condensed; meiotic spindle assembles; nucleolus and nuclear envelope disappear'],
        ],
        'Table of the five substages of prophase I with their signature events',
      ),
      n: 'Crossing over is the exchange of genetic material between non-sister chromatids of homologous chromosomes. It happens in pachytene and gives recombination. The X shaped chiasmata are visible in diplotene. By the end of diakinesis the cell is ready for the first division, with the spindle assembled and the nuclear envelope gone.',
    }),
    sl('check', 'Quick check: synapsis', {
      b: 'Match an event with its substage.',
      n: 'Quick check. In which substage do homologous chromosomes pair up?',
      chk: 'synapsis-mcq',
    }),
    sl('diagram', 'Meiosis I and meiosis II', {
      b: 'After prophase I: **metaphase I**, **anaphase I** and **telophase I** make meiosis I; then **prophase II, metaphase II, anaphase II and telophase II** make meiosis II.',
      v: V.meiosis,
      n: 'In the picture, the top row is meiosis I and the bottom row meiosis II. Tips of swapped colour show where crossing over happened. Notice that meiosis I separates whole chromosomes of a pair, while meiosis II separates chromatids. After telophase two, four haploid cells are present.',
    }),
    sl('concept', 'Meiosis I: metaphase to telophase', {
      b: 'In **metaphase I** the **bivalents** align on the equatorial plate, with the kinetochores of each homologue attached to one pole. In **anaphase I** the **homologous chromosomes separate**, but the **sister chromatids stay together** at the centromeres.',
      v: table(
        ['Stage', 'Key events'],
        [
          ['Metaphase I', 'Bivalent chromosomes align on the equatorial plate; microtubules from opposite poles attach to the kinetochores of homologous chromosomes'],
          ['Anaphase I', 'Homologous chromosomes separate; chromatids remain associated at their centromeres'],
          ['Telophase I', 'Nuclear membrane and nucleolus reappear; cytokinesis gives a **dyad** of cells'],
          ['Interkinesis', 'Short stage between the two divisions; **no DNA replication**'],
        ],
        'Table of metaphase I, anaphase I, telophase I and interkinesis',
      ),
      n: 'In anaphase one whole homologous chromosomes move apart, so each pole receives half the chromosome number, though each chromosome still has two chromatids. Cytokinesis gives a dyad of two cells. A short stage, interkinesis, follows. There is no DNA replication in it, and the chromosomes are not copied again.',
    }),
    sl('check', 'Quick check: anaphase I', {
      b: 'Judge the assertion and the reason about the first meiotic division.',
      n: 'Quick check. What separates in anaphase one, and what stays joined?',
      chk: 'anaphase1-ar',
    }),
    sl('concept', 'Meiosis II', {
      b: 'Meiosis II resembles a mitotic division in each of the two cells of the dyad, but the cells are **haploid**.',
      v: table(
        ['Stage', 'Key events'],
        [
          ['Prophase II', 'Nuclear membrane disappears; chromosomes become compact again'],
          ['Metaphase II', 'Chromosomes align at the equator; kinetochores of sister chromatids attach to spindle fibres from opposite poles'],
          ['Anaphase II', 'Centromere splits; chromatids move to opposite poles'],
          ['Telophase II', 'Two groups of chromosomes enclosed by nuclear envelopes; cytokinesis gives a **tetrad** of four haploid cells'],
        ],
        'Table of the four stages of meiosis II',
      ),
      n: 'The second division goes on in both cells of the dyad at once. Chromosomes line up, the centromeres split, and the sister chromatids separate. Nuclear envelopes form around each group, and cytokinesis completes a tetrad of four haploid cells.',
    }),
    sl('example', 'Worked example 1: counting through meiosis', {
      b: 'A pea plant has 2n = 14 chromosomes. Count the chromosomes and chromatids at each stage of meiosis in one meiocyte, and the number of bivalents.',
      ul: [
        r`Bivalents: $\dfrac{14}{2} = ${N.pea.metaphaseI[0] / 2}$. At prophase I there are $${N.pea.prophaseI[0]}$ chromosomes with $2 \times ${N.pea.prophaseI[0]} = ${N.pea.prophaseI[1]}$ chromatids.`,
        r`Anaphase I: $${N.pea.poleAnaphaseI[0]}$ chromosomes ($${N.pea.poleAnaphaseI[1]}$ chromatids) go to each pole, so each cell of the dyad has $${N.pea.telophaseI[0]}$ chromosomes.`,
        r`Anaphase II: the centromeres split, so each cell momentarily has $${N.pea.anaphaseII[0]}$ chromosomes; each final cell has $${N.pea.telophaseII[0]}$.`,
      ],
      v: V.chromTable,
      n: 'Fourteen chromosomes make seven bivalents. At prophase one there are fourteen chromosomes, each of two chromatids, so twenty eight chromatids. Anaphase one sends seven chromosomes to each pole. In anaphase two the centromeres split, and each cell briefly has fourteen chromosomes; each final cell has seven.',
    }),
    sl('check', 'Quick check: the dyad', {
      b: 'Work out what a cell of the dyad contains.',
      n: 'Quick check. How many chromosomes, and how many chromatids, does each cell of the dyad hold?',
      chk: 'dyad-mcq',
    }),
    sl('example', 'Worked example 2: DNA and gametes', {
      b: `The nucleus of a certain plant holds ${DNA.G1} pg of DNA in G1. Find the DNA per nucleus after S phase, after meiosis I and after meiosis II. How many pollen grains come from ${N.pmcs} pollen mother cells?`,
      ul: [
        r`After S phase the DNA doubles: $2 \times ${DNA.G1} = ${DNA.G2}$ pg.`,
        r`Meiosis I halves it: $\dfrac{${DNA.G2}}{2} = ${N.dnaDyad}$ pg per cell, with half the chromosomes, each of two chromatids.`,
        r`Meiosis II halves it again: $\dfrac{${N.dnaDyad}}{2} = ${N.dnaSperm}$ pg per cell. Each pollen mother cell gives 4 pollen grains, so $4 \times ${N.pmcs} = ${N.pollen}$.`,
      ],
      v: table(['Stage', 'DNA per nucleus (pg)'], [['G1', String(DNA.G1)], ['After S phase', String(DNA.G2)], ['After meiosis I (each cell)', String(N.dnaDyad)], ['After meiosis II (each cell)', String(N.dnaSperm)]], `Worked table: DNA ${DNA.G1}, ${DNA.G2}, ${N.dnaDyad} and ${N.dnaSperm} picograms; ${N.pollen} pollen grains from ${N.pmcs} meiocytes`),
      n: 'DNA doubles in S phase, is halved at the first division, and halved again at the second, so each gamete has half the DNA of a first gap phase nucleus. One meiocyte gives four haploid cells, so two hundred and fifty pollen mother cells give one thousand pollen grains.',
    }),
    sl('concept', 'Mitosis and meiosis compared', {
      b: 'Know the **differences** clearly: they are a favourite long-answer topic.',
      v: table(
        ['Feature', 'Mitosis', 'Meiosis'],
        [
          ['Cells that divide', 'Somatic cells (and meristems)', 'Meiocytes of the reproductive organs'],
          ['Divisions per DNA replication', 'One', 'Two'],
          ['Pairing of homologues; crossing over', 'No', 'Yes, in prophase I'],
          ['Daughter cells', 'Two, diploid, identical to the parent', 'Four, haploid, genetically different'],
          ['Role', 'Growth, repair, replacement', 'Gamete formation; constant chromosome number'],
        ],
        'Table comparing mitosis and meiosis',
      ),
      n: 'Mitosis makes two identical diploid cells for growth and repair. Meiosis makes four haploid cells that differ from one another and from the parent. Only in meiosis do homologous chromosomes pair and exchange segments, and only in meiosis is there one replication for two divisions.',
    }),
    sl('concept', 'Significance of meiosis', {
      b: 'Meiosis **conserves the chromosome number** from one generation to the next in sexually reproducing organisms, and **increases genetic variability**, which is vital for evolution.',
      v: table(
        ['Process', 'What it achieves'],
        [['Halving the chromosome number', 'Fusion of two haploid gametes restores the diploid number'], ['Crossing over in pachytene', 'New combinations of genes on a chromosome (recombination)'], ['Separation of homologues in anaphase I', 'Different mixes of maternal and paternal chromosomes in the gametes']],
        'Table of how meiosis maintains chromosome number and creates variation',
      ),
      n: 'Without meiosis the chromosome number would double each generation. Meiosis halves it so that fertilisation restores it. Crossing over and the separation of homologues give gametes with new combinations of genes. This variation in a population is important for the process of evolution.',
    }),
    sl('check', 'Quick check: chiasmata', {
      b: 'Identify the structure and its meaning.',
      n: 'Quick check. What do the X shaped chiasmata show?',
      chk: 'chiasma-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Meiosis: one DNA replication, two divisions, four haploid cells.',
        'Prophase I: leptotene, zygotene (synapsis), pachytene (crossing over), diplotene (chiasmata), diakinesis (terminalisation).',
        'Anaphase I separates homologues; anaphase II separates chromatids.',
        'Interkinesis has no DNA replication.',
        'Meiosis keeps the chromosome number constant and creates variation.',
      ],
      v: V.meiosis,
      n: 'To recap: meiosis halves the chromosome number in two divisions after one round of DNA replication. Prophase one has five substages, with pairing and crossing over. Meiosis one separates homologues, meiosis two separates chromatids, and four haploid cells result.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Write the **five substages** of prophase I in order with one event each.',
        'Meiosis I is the **reduction** division; meiosis II is **equational**.',
        'After meiosis I a cell has **n chromosomes, each of two chromatids**; DNA is 2C, not C.',
        'In comparisons, use a table with the same feature in each row.',
      ],
      n: 'Exam tips. Learn the five substages of prophase one with a key event for each. Meiosis one reduces the number, and meiosis two is equational. After the first division a cell has half the chromosomes, each still of two chromatids. And present comparisons as a table.',
    }),
  ],
});
