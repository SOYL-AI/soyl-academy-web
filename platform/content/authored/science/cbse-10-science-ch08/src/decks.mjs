// ch08 Heredity — two decks: Part 1 (t01–t02) variation and Mendel; Part 2 (t03–t04) how traits are expressed and sex determination.
import { sl, deck, table, flow, svgV, r } from '../../cbse-10-science-ch06/src/lib.mjs';
import { VARIATION, EARLOBES, PAIRS, XY } from './svgs.mjs';

export const V = {
  variation: svgV(VARIATION, 'Family tree over three generations of asexual reproduction in which each offspring keeps its parent’s variations and adds new ones', 'Sexual reproduction mixes the variations of two parents and creates even more diversity.'),
  earlobes: svgV(EARLOBES, 'Side views of a free earlobe hanging below the ear’s attachment and an attached earlobe joining the head directly'),
  pairs: svgV(PAIRS, 'A body cell with two pairs of chromosomes, one of each pair from each parent, and the four kinds of germ cell, each with one chromosome of each pair'),
  xy: svgV(XY, 'Sex chromosomes: two X chromosomes in a female and an X and a smaller Y chromosome in a male'),
};

export const monoPunnett = table(
  ['Gametes', 'T', 't'],
  [['**T**', 'TT (tall)', 'Tt (tall)'], ['**t**', 'Tt (tall)', 'tt (short)']],
  'Punnett square for crossing two Tt plants: TT, Tt, Tt and tt, so three tall to one short',
  'Gametes of one parent across the top, of the other down the side.',
);
export const diPunnett = table(
  ['Gametes', 'TR', 'Tr', 'tR', 'tr'],
  [
    ['**TR**', 'TTRR', 'TTRr', 'TtRR', 'TtRr'],
    ['**Tr**', 'TTRr', 'TTrr', 'TtRr', 'Ttrr'],
    ['**tR**', 'TtRR', 'TtRr', 'ttRR', 'ttRr'],
    ['**tr**', 'TtRr', 'Ttrr', 'ttRr', 'ttrr'],
  ],
  'Sixteen-box Punnett square for crossing two TtRr plants, giving 9 tall round, 3 tall wrinkled, 3 short round and 1 short wrinkled',
  'T = tall, t = short; R = round seed, r = wrinkled seed. Any box with at least one T is tall; any with at least one R has round seeds.',
);
export const sexPunnett = table(
  ['Mother’s egg → / Father’s sperm ↓', 'X', 'X'],
  [['**X**', 'XX (girl)', 'XX (girl)'], ['**Y**', 'XY (boy)', 'XY (boy)']],
  'Punnett square for sex determination: half the combinations are XX (girl) and half XY (boy)',
);

export const deck1 = deck({
  part: 1,
  title: 'Heredity — Part 1: Variation and Mendel’s rules of inheritance',
  goals: [
    'Explain why sexual reproduction produces more variation than asexual reproduction',
    'Distinguish dominant and recessive traits, and genotype and phenotype',
    'Use a Punnett square to predict the results of monohybrid crosses',
    'Use a Punnett square to predict the 9 : 3 : 3 : 1 ratio of a dihybrid cross',
  ],
  slides: [
    sl('title', 'Heredity', {
      b: 'Part 1 — how variations build up from generation to generation, and the simple rules Mendel discovered with pea plants.',
      v: flow('LR', [['p', 'Parents'], ['g', 'Germ cells carry traits'], ['o', 'Offspring'], ['v', 'Similar, yet different']], [['p', 'g'], ['g', 'o'], ['o', 'v']], 'Flow from parents through germ cells to offspring that are similar but different'),
      n: 'Namaste! Why do you have your mother’s eyes or your grandfather’s smile, yet look different from your brother or sister? The passing of traits from parents to children is called heredity. More than a hundred and fifty years ago, a monk named Gregor Mendel, working with garden peas, worked out the basic rules. Let us discover them.',
    }),
    sl('concept', 'Variation builds up over generations', {
      b: 'Every generation adds a few **new variations** from DNA copying. In **asexual** reproduction the offspring differ only by these small copying changes. **Sexual** reproduction also **mixes** DNA from two parents, so it produces **far more variation**.',
      v: table(['', 'Asexual reproduction', 'Sexual reproduction'], [['Source of variation', 'Small DNA copying errors only', 'Copying errors plus mixing of two parents’ DNA'], ['Amount of variation', 'Very little', 'Much more'], ['Example', 'Bacteria dividing', 'Humans, pea plants']], 'Table comparing the sources and amount of variation in asexual and sexual reproduction'),
      n: 'Remember the photocopier from the last chapter. Each copy carries small slips, and those slips are passed on, so over many generations differences build up. Sexual reproduction goes further. It shuffles DNA from a mother and a father into new combinations every time. That is why children of the same parents can look so different, and why sexually reproducing species are so varied.',
    }),
    sl('diagram', 'How variations accumulate', {
      b: 'Each offspring inherits its parent’s variations and adds new ones of its own, so the **diversity** of a population grows with every generation.',
      v: V.variation,
      n: 'Follow the coloured dots down the tree. The first individual has none. Its two offspring each pick up one small new variation, shown as a blue or a green dot. In the next generation, the dots are kept and new ones appear. After just three generations, four individuals are all slightly different. Over thousands of generations, this adds up to enormous diversity.',
    }),
    sl('concept', 'Not every variation has the same chance', {
      b: 'Variations differ in how useful they are. Depending on the surroundings, some variations help an individual **survive and reproduce** more than others. Such variations become more common in the population.',
      v: table(['Variation in bacteria', 'In normal water', 'In heated water'], [['Can tolerate heat', 'Survives', 'Survives and multiplies'], ['Cannot tolerate heat', 'Survives', 'Dies']], 'Table showing that a heat-tolerant variation makes no difference in normal water but decides survival in heated water'),
      n: 'A variation can be useful, useless or harmful, and it depends on where you live. Heat tolerance does not matter to bacteria in cool water. But in a heat wave, it decides who lives. The survivors pass the useful variation to their offspring, so over time it becomes common. The environment does not create the variation; it only selects among the variations already present.',
    }),
    sl('check', 'Quick check: where is more variation?', {
      b: 'Why does sexual reproduction produce more variation than asexual reproduction?',
      n: 'Quick check. Think about how many parents contribute DNA in each kind of reproduction.',
      chk: 'more-variation-mcq',
    }),
    sl('diagram', 'Inherited traits: a closer look', {
      b: 'Children share the basic design of their parents, but details vary. Earlobes, for example, may be **free** or **attached**; both kinds are found in a population. Such features passed from parents to offspring are **inherited traits**.',
      v: V.earlobes,
      n: 'Touch the bottom of your ear. Does the lobe hang free, or is it joined to the side of your head? Check with your classmates and your family. You will find both kinds, sometimes in the same family. Features like this are inherited, passed on through DNA. But the rules for how they pass on are not obvious. Mendel found those rules by studying simpler traits in peas.',
    }),
    sl('concept', 'Rules of inheritance: both parents count equally', {
      b: 'Both the **father** and the **mother** contribute **equal amounts** of genetic material. So for every trait, a child has **two versions** of the instruction (gene): one from each parent.',
      v: flow('LR', [['f', 'Father: one version of each gene'], ['m', 'Mother: one version of each gene'], ['c', 'Child: two versions of each gene'], ['t', 'Trait shown depends on both']], [['f', 'c'], ['m', 'c'], ['c', 't']], 'Flow: father and mother each give one version of every gene, so the child has two versions, which together decide the trait'),
      n: 'Here is the first big rule. A child gets exactly half of its genetic material from the father and half from the mother. That means for every trait, such as earlobe shape or blood group, the child carries two versions of the instruction, one from each parent. The question Mendel answered was: when the two versions differ, which one shows?',
    }),
    sl('concept', 'Mendel’s pea plants', {
      b: 'Mendel crossed garden pea plants that differed in clear, **contrasting** characters, one character at a time, and **counted** the offspring.',
      v: table(['Character', 'Contrasting forms'], [['Height of plant', 'Tall / short'], ['Seed shape', 'Round / wrinkled'], ['Seed colour', 'Yellow / green'], ['Flower colour', 'Violet / white'], ['Pod shape', 'Inflated / constricted'], ['Pod colour', 'Green / yellow'], ['Flower position', 'Axial / terminal']], 'Table of seven pea characters, each with two contrasting forms'),
      n: 'Why peas? A pea plant has many characters that come in two clear forms, such as tall or short, and violet or white flowers. Peas grow quickly, produce many seeds, and can be cross-pollinated by hand. Mendel’s great idea was to count carefully, generation after generation. Counting turned guesswork into rules.',
    }),
    sl('concept', 'A monohybrid cross: tall × short', {
      b: r`Mendel crossed **pure tall** plants with **pure short** plants. Every plant of the first generation ($F_1$) was **tall**: no medium-height plants. When $F_1$ plants were self-pollinated, the second generation ($F_2$) had about **three tall plants for every one short**.`,
      v: flow('LR', [['p', 'Parents: pure tall × pure short'], ['f1', 'F1: all tall'], ['s', 'F1 self-pollinated'], ['f2', 'F2: about 3 tall : 1 short']], [['p', 'f1'], ['f1', 's'], ['s', 'f2']], 'Flow of a monohybrid cross: pure tall crossed with pure short gives all tall in the first generation, and three tall to one short in the second'),
      n: 'Here is the puzzle Mendel faced. The short trait vanished completely in the first generation. Every plant was tall. Yet when those tall plants were self-pollinated, short plants reappeared, about one in every four. So the instruction for shortness had not been lost. It had been hidden. Something about tallness masked it.',
    }),
    sl('diagram', 'Explaining the 3 : 1 ratio with a Punnett square', {
      b: r`Let **T** be the gene version for tall and **t** for short. Pure tall is **TT**, pure short is **tt**, and every $F_1$ plant is **Tt**. Each $F_1$ parent gives **T** or **t** to a germ cell, equally often. Combining them gives **TT : Tt : tt = 1 : 2 : 1**, so **3 tall : 1 short**.`,
      v: monoPunnett,
      n: 'A Punnett square is a simple grid for combining germ cells. Write one parent’s germ cells across the top and the other’s down the side, then fill each box. Three boxes contain at least one capital T, so those plants are tall. Only one box has two small t’s, and that plant is short. One copy of the tall version is enough to make a plant tall.',
    }),
    sl('concept', 'Dominant, recessive, genotype and phenotype', {
      b: 'A trait that shows even when only **one copy** is present is **dominant** (tall, T). A trait that shows only when **both copies** are of that kind is **recessive** (short, t). The **genotype** is the gene combination (TT, Tt, tt); the **phenotype** is the trait we see (tall or short).',
      v: table(['Genotype', 'Phenotype', 'Description'], [['TT', 'Tall', 'Two dominant copies (pure tall)'], ['Tt', 'Tall', 'One of each; tall masks short'], ['tt', 'Short', 'Two recessive copies (pure short)']], 'Table of the three genotypes TT, Tt and tt with their phenotypes'),
      n: 'Two words to master: genotype and phenotype. The genotype is the pair of instructions written inside the cells. The phenotype is what you can actually see. Notice that two different genotypes, double capital T and capital T small t, give the same phenotype: tall. That is why you cannot always tell a plant’s genotype just by looking at it.',
    }),
    sl('example', 'Worked example 1: predicting numbers', {
      b: r`Two $F_1$ tall pea plants (Tt) are crossed, and **1240** $F_2$ plants grow. How many are expected to be tall and how many short? How many tall plants are expected to be pure (TT)?`,
      ul: [
        r`Step 1 — From the Punnett square, tall $= \dfrac{3}{4}$ and short $= \dfrac{1}{4}$.`,
        r`Step 2 — Tall $= \dfrac{3}{4} \times 1240 = 930$; short $= \dfrac{1}{4} \times 1240 = 310$.`,
        r`Step 3 — Pure tall (TT) $= \dfrac{1}{4} \times 1240 = 310$, so $930 - 310 = 620$ tall plants are Tt.`,
        r`Check — $930 + 310 = 1240$, and TT : Tt : tt $= 310 : 620 : 310 = 1 : 2 : 1$.`,
      ],
      v: table(['Genotype', 'Fraction', 'Expected plants', 'Phenotype'], [['TT', '1/4', '310', 'Tall'], ['Tt', '2/4', '620', 'Tall'], ['tt', '1/4', '310', 'Short']], 'Worked table: of 1240 plants, 310 TT, 620 Tt and 310 tt, giving 930 tall and 310 short'),
      n: 'Turn the Punnett square into fractions, then multiply by the total. Three quarters of twelve hundred and forty is nine hundred and thirty tall plants, and one quarter is three hundred and ten short ones. Only a third of the tall plants are pure. Real counts will be close to these numbers, not exact, because which germ cells meet is a matter of chance.',
    }),
    sl('check', 'Quick check: the first generation', {
      b: 'A pure-breeding violet-flowered pea is crossed with a white-flowered pea. All the first-generation plants have violet flowers. Complete the statement.',
      n: 'Your turn. If only one flower colour appears in the first generation, what does that tell you about that colour?',
      chk: 'violet-fill',
    }),
    sl('concept', 'A dihybrid cross: two characters at once', {
      b: r`Mendel then followed **two** characters together. He crossed **tall plants with round seeds** (TTRR) with **short plants with wrinkled seeds** (ttrr). All $F_1$ plants were **tall with round seeds** (TtRr): tall and round are dominant.`,
      v: flow('LR', [['p1', 'Tall, round seeds (TTRR)'], ['p2', 'Short, wrinkled seeds (ttrr)'], ['f1', 'F1: all tall, round (TtRr)'], ['g', 'Germ cells: TR, Tr, tR, tr in equal numbers']], [['p1', 'f1'], ['p2', 'f1'], ['f1', 'g', 'when F1 forms germ cells']], 'Flow of a dihybrid cross: tall round crossed with short wrinkled gives all tall round, whose germ cells are of four kinds'),
      n: 'Next, Mendel asked a bolder question. If a plant differs in two characters, do they travel together, or separately? He crossed tall plants with round seeds and short plants with wrinkled seeds. The first generation was all tall with round seeds, as expected. The surprise came in the second generation.',
    }),
    sl('diagram', 'The 9 : 3 : 3 : 1 ratio', {
      b: r`Each $F_1$ plant forms four kinds of germ cell — **TR, Tr, tR, tr** — in equal numbers. The 16-box Punnett square gives **9 tall round : 3 tall wrinkled : 3 short round : 1 short wrinkled**. Two of these are **new combinations** not seen in either parent.`,
      v: diPunnett,
      n: 'This grid looks big, but filling it is just careful bookkeeping. Count the boxes with at least one capital T and at least one capital R: there are nine, all tall with round seeds. Three are tall with wrinkled seeds, three are short with round seeds, and one is short with wrinkled seeds. Tall wrinkled and short round are brand-new combinations.',
    }),
    sl('example', 'Worked example 2: dihybrid numbers', {
      b: r`In a dihybrid cross like the one above, **1600** $F_2$ plants are raised. Find the expected number of each type.`,
      ul: [
        r`Step 1 — Fractions: $\dfrac{9}{16}$, $\dfrac{3}{16}$, $\dfrac{3}{16}$, $\dfrac{1}{16}$.`,
        r`Step 2 — One sixteenth of 1600 is $\dfrac{1600}{16} = 100$.`,
        r`Step 3 — Tall round $= 9 \times 100 = 900$; tall wrinkled $= 300$; short round $= 300$; short wrinkled $= 100$.`,
        r`Check — $900 + 300 + 300 + 100 = 1600$. Tall : short $= 1200 : 400 = 3 : 1$, as in a monohybrid cross.`,
      ],
      v: table(['Phenotype', 'Fraction', 'Expected plants'], [['Tall, round', '9/16', '900'], ['Tall, wrinkled', '3/16', '300'], ['Short, round', '3/16', '300'], ['Short, wrinkled', '1/16', '100']], 'Worked table: 1600 plants split 900, 300, 300 and 100 in the ratio 9 to 3 to 3 to 1'),
      n: 'Find one sixteenth of the total first; here it is one hundred. Then multiply by nine, three, three and one. Notice the neat check at the end: if you look at height alone, you still get three tall to one short. Each character behaves exactly as if the other were not there. That is the key idea of the next slide.',
    }),
    sl('concept', 'Traits are inherited independently', {
      b: 'In the dihybrid cross, **height** and **seed shape** separated and recombined freely, producing **new combinations**. So different traits are **inherited independently** of each other.',
      v: table(['Combination', 'Seen in the parents?', 'Seen in F2?'], [['Tall, round', 'Yes', 'Yes'], ['Short, wrinkled', 'Yes', 'Yes'], ['Tall, wrinkled', 'No', 'Yes (new)'], ['Short, round', 'No', 'Yes (new)']], 'Table showing that two new combinations, tall wrinkled and short round, appear in the second generation'),
      n: 'If tallness and round seeds were tied together, they would always travel as a pair, and we would see only the two parent types. Instead, tall wrinkled and short round plants appeared. So the gene for height and the gene for seed shape are handed on separately. Shuffling traits like this is one more way sexual reproduction creates variation.',
    }),
    sl('example', 'Worked example 3: finding an unknown genotype', {
      b: 'A tall pea plant of unknown genotype is crossed with a short plant (tt). Of 100 offspring, 52 are tall and 48 are short. What is the tall plant’s genotype?',
      ul: [
        'Step 1 — The short parent (tt) can only give **t**.',
        'Step 2 — If the tall plant were **TT**, every offspring would be Tt: all tall.',
        'Step 3 — If it were **Tt**, it would give T and t equally: half Tt (tall), half tt (short).',
        'Conclusion — 52 : 48 is close to 1 : 1, so the tall plant is **Tt**.',
      ],
      v: table(['If the tall parent is…', 'Expected offspring', 'Matches 52 tall : 48 short?'], [['TT', 'All tall', 'No'], ['Tt', 'Half tall, half short', 'Yes']], 'Worked table comparing expected offspring for TT and Tt parents with the observed 52 tall and 48 short'),
      n: 'This is how geneticists detect a hidden recessive gene. Cross the plant with a pure short plant, which can only contribute the short version. If any short offspring appear, the tall parent must have been carrying a hidden short version. Here almost half are short, so the tall plant is capital T small t. Always compare each possibility with the data.',
    }),
    sl('check', 'Quick check: new combinations', {
      b: 'Judge the assertion and the reason about the dihybrid cross.',
      n: 'Quick check. Do new combinations really appear? And does the reason explain why?',
      chk: 'independent-ar',
    }),
    sl('summary', 'Summary: variation and Mendel’s rules', {
      ul: [
        'Variation builds up over generations; sexual reproduction creates much more of it.',
        'Each parent gives one version of every gene; a child has two versions.',
        'Dominant traits show with one copy; recessive traits need two copies.',
        r`Monohybrid: $F_1$ all dominant; $F_2$ 3 : 1 (genotypes 1 : 2 : 1).`,
        r`Dihybrid: $F_2$ 9 : 3 : 3 : 1, with new combinations.`,
        'Different traits are inherited independently.',
      ],
      v: table(['Cross', 'F1', 'F2 phenotype ratio'], [['Tall × short', 'All tall', '3 tall : 1 short'], ['Tall round × short wrinkled', 'All tall round', '9 : 3 : 3 : 1']], 'Summary table of monohybrid and dihybrid crosses with their first and second generation results'),
      n: 'Let us recap. Variation accumulates, and sexual reproduction mixes it in new ways. Each of us carries two versions of every gene, one from each parent. One dominant copy is enough to show a trait; recessive traits need two copies. Crosses give three to one for one character and nine to three to three to one for two, because traits are inherited independently.',
    }),
    sl('exam-tips', 'Exam tips: Mendel and Punnett squares', {
      ul: [
        'Always write the **parents’ genotypes**, the **germ cells** and the **Punnett square**, then the ratio.',
        'Give **both** ratios when asked: phenotype 3 : 1 and genotype 1 : 2 : 1.',
        'Use a capital letter for the dominant version and the same small letter for the recessive one (T, t).',
        'A recessive trait reappearing in a later generation shows it was **hidden**, not lost.',
        'Expected numbers are approximate: real counts come close to the ratio, not exactly.',
        'Typical 3-mark split: cross set up (1) + Punnett square (1) + ratio with conclusion (1).',
      ],
      v: table(['Common mistake', 'Correct idea'], [['F1 tall plants are TT', 'F1 tall plants are Tt'], ['3 : 1 is the genotype ratio', '3 : 1 is the phenotype ratio; genotypes are 1 : 2 : 1'], ['Dominant means more common', 'Dominant means it shows with one copy'], ['Traits always travel together', 'Different traits are inherited independently']], 'Table of common mistakes about Mendelian crosses with the correct ideas'),
      n: 'Here is how to collect full marks. Set out a cross in clear steps: parents, germ cells, Punnett square, ratio. Say which ratio you are giving, phenotype or genotype. Do not confuse dominant with common; a dominant trait can be rare. And when a recessive trait comes back, explain that it was hidden in carriers all along.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Heredity — Part 2: How traits are expressed, and sex determination',
  goals: [
    'Explain how genes control traits through proteins, using plant height as an example',
    'Explain why each germ cell carries one chromosome of each pair',
    'Explain sex determination in humans using X and Y chromosomes',
    'Describe other ways in which sex is determined in some animals',
  ],
  slides: [
    sl('title', 'How traits are expressed, and boy or girl?', {
      b: 'Part 2 — how a gene actually makes a plant tall, why chromosomes come in pairs, and what decides whether a baby is a boy or a girl.',
      v: flow('LR', [['g', 'Gene (part of DNA)'], ['p', 'Protein, often an enzyme'], ['c', 'Chemical change in the cell'], ['t', 'Trait we can see']], [['g', 'p'], ['p', 'c'], ['c', 't']], 'Flow from gene to protein to a chemical change to a visible trait'),
      n: 'In Part 1 we used letters like capital T and small t without asking what they really are. Now we open the box. How can a stretch of DNA make a pea plant tall? And why are boys and girls born in roughly equal numbers? The answers come from genes, proteins and chromosomes.',
    }),
    sl('concept', 'Genes make proteins', {
      b: 'Cellular **DNA** carries the information for making **proteins**. A section of DNA that provides the information for **one protein** is a **gene**. Many proteins are **enzymes**, which control the chemical reactions that build the body and its features.',
      v: table(['Term', 'Meaning'], [['DNA', 'The information store in the nucleus'], ['Gene', 'A section of DNA with the information for one protein'], ['Protein', 'Made using a gene’s information; does a job in the cell'], ['Enzyme', 'A protein that speeds up a particular chemical reaction']], 'Table of DNA, gene, protein and enzyme with their meanings'),
      n: 'If DNA is a recipe book, a gene is one recipe in it, the recipe for one protein. Proteins are the workers of the cell. Many of them are enzymes, which make chemical reactions happen quickly. Change a recipe even slightly, and the protein it produces may work less well. That small change can show up as a different trait.',
    }),
    sl('diagram', 'From gene to plant height', {
      b: 'Plant height depends on the amount of a growth **hormone**. The hormone is made with the help of an **enzyme**. If the gene for this enzyme makes an **efficient** enzyme, plenty of hormone is made and the plant grows **tall**. If the gene is altered so the enzyme is **less efficient**, less hormone is made and the plant stays **short**.',
      v: flow('TB', [['g1', 'Gene version T'], ['e1', 'Efficient enzyme'], ['h1', 'Plenty of growth hormone'], ['t1', 'Tall plant'], ['g2', 'Gene version t (altered)'], ['e2', 'Less efficient enzyme'], ['h2', 'Less growth hormone'], ['t2', 'Short plant']], [['g1', 'e1'], ['e1', 'h1'], ['h1', 't1'], ['g2', 'e2'], ['e2', 'h2'], ['h2', 't2']], 'Two chains: gene T makes an efficient enzyme, plenty of hormone and a tall plant; altered gene t makes a less efficient enzyme, less hormone and a short plant'),
      n: 'Here is the chain for pea height. A gene carries the recipe for an enzyme. The enzyme helps the plant make a growth hormone. A good enzyme means lots of hormone and a tall plant. If the gene has a small change that makes the enzyme work poorly, less hormone is made, and the plant stays short. So a gene controls a trait through the protein it makes.',
    }),
    sl('example', 'Worked example 1: why is Tt tall?', {
      b: 'Use the gene → enzyme → hormone idea to explain why a Tt pea plant is just as tall as a TT plant, while a tt plant is short.',
      ul: [
        'Step 1 — Version T makes an efficient enzyme; version t makes a less efficient one.',
        'Step 2 — A **TT** plant makes efficient enzyme from both copies: plenty of hormone, tall.',
        'Step 3 — A **Tt** plant still makes efficient enzyme from its one T copy, enough for plenty of hormone: tall.',
        'Step 4 — A **tt** plant has no efficient enzyme: little hormone, short. So T is dominant over t.',
      ],
      v: table(['Genotype', 'Efficient enzyme made?', 'Growth hormone', 'Height'], [['TT', 'Yes (two copies)', 'Plenty', 'Tall'], ['Tt', 'Yes (one copy)', 'Enough', 'Tall'], ['tt', 'No', 'Little', 'Short']], 'Worked table relating genotypes TT, Tt and tt to enzyme, hormone and height'),
      n: 'This links Part 1 to Part 2 beautifully. Dominance is not magic. One working copy of the gene makes enough of the efficient enzyme to produce the hormone the plant needs, so it grows tall. Only when both copies are the altered version does the plant run short of hormone. In exam answers, connect gene, enzyme, hormone and trait in that order.',
    }),
    sl('diagram', 'Genes come in pairs on chromosomes', {
      b: 'Genes are carried on **chromosomes**, which are separate, independent pieces of DNA. Each body cell has **two copies of every chromosome**: one from the father and one from the mother. A germ cell gets **one chromosome from each pair**, in any combination.',
      v: V.pairs,
      n: 'Our genes are not one long string. They are packed into separate pieces called chromosomes, and body cells have each chromosome in a pair. When germ cells are made, each takes just one member of every pair. Which member goes into which germ cell is a matter of chance, so from only two pairs, four different kinds of germ cell can be formed.',
    }),
    sl('check', 'Quick check: what goes into a germ cell?', {
      b: 'A body cell has 8 chromosomes in 4 pairs. What does each of its germ cells receive?',
      n: 'Quick check. Remember that a germ cell gets one member of every pair, not a whole pair and not a random handful.',
      chk: 'germ-cell-mcq',
    }),
    sl('concept', 'Chromosomes explain Mendel’s results', {
      b: 'Because each germ cell gets **one** version of each gene, $F_1$ Tt plants make **T** and **t** germ cells equally, giving 3 : 1. Because genes for different characters can lie on **different chromosomes** that sort **independently**, two characters recombine freely, giving 9 : 3 : 3 : 1.',
      v: table(['Mendel’s observation', 'Chromosome explanation'], [['Each parent passes on one version of each gene', 'A germ cell gets one chromosome of each pair'], ['Recessive trait hidden, then reappears', 'The t version is carried on a chromosome even when not shown'], ['New combinations in a dihybrid cross', 'Different chromosome pairs sort into germ cells independently']], 'Table linking three of Mendel’s observations to their explanation in terms of chromosomes'),
      n: 'Mendel never saw a chromosome. Yet his rules match exactly what chromosomes do. One member of each pair in every germ cell explains why each parent passes on just one version of a gene. Pairs sorting independently explains why height and seed shape mix freely. Science is wonderful when a pattern seen in numbers turns out to have a physical cause.',
    }),
    sl('concept', 'How is sex decided? Different strategies', {
      b: 'Different species decide the sex of their young in different ways. In some animals, the **temperature** at which fertilised eggs are kept decides whether they develop into males or females. In others, such as **snails**, individuals can **change sex**. In **humans**, sex is decided **genetically**.',
      v: table(['Organism', 'How sex is decided'], [['Some reptiles, such as many turtles', 'Temperature at which the eggs develop'], ['Snails', 'Individuals can change sex'], ['Humans', 'Genetically, by the sex chromosomes']], 'Table of three ways sex is decided: egg temperature in some reptiles, sex change in snails, and genes in humans'),
      n: 'Nature has more than one way to decide boy or girl. On the beaches of Odisha, where olive ridley turtles nest, the warmth of the sand helps decide whether hatchlings are male or female. Some snails can even change sex during their lives. In humans, though, the answer lies in our chromosomes, decided at the very moment of fertilisation.',
    }),
    sl('diagram', 'Human sex chromosomes', {
      b: 'Human body cells have **23 pairs** of chromosomes. **22 pairs** (autosomes) are alike in men and women. The **sex chromosomes** differ: women have a perfect pair, **XX**; men have a mismatched pair, **XY**, with a shorter **Y**.',
      v: V.xy,
      n: 'Look at the sex chromosomes. A woman’s pair matches: two X chromosomes. A man’s pair does not: one X and one smaller Y. The other twenty-two pairs are alike in everyone. Because a woman has only X chromosomes, every egg carries an X. A man’s sperms are of two kinds: half carry an X and half carry a Y.',
    }),
    sl('diagram', 'Who decides: boy or girl?', {
      b: 'Every **egg** carries an **X**. If the egg is fertilised by a sperm carrying **X**, the child is **XX: a girl**. If the sperm carries **Y**, the child is **XY: a boy**. So the sex of the child depends on the **father’s** sperm, and the chance is **half and half**.',
      v: sexPunnett,
      n: 'Fill in this small Punnett square and the answer jumps out. The mother can only give an X. The father gives either an X or a Y, by chance. An X from the father makes a girl; a Y makes a boy. Two of the four boxes are girls and two are boys, so each birth has an equal chance of being a boy or a girl.',
    }),
    sl('example', 'Worked example 2: chance and families', {
      b: 'The Sharma family has three daughters. A relative says the fourth child is "sure to be a boy" this time. Is this correct? What is the chance that the fourth child is a boy?',
      ul: [
        'Step 1 — Each child’s sex is decided separately, by whether the sperm that fertilises the egg carries X or Y.',
        r`Step 2 — Half the sperms carry X and half carry Y, so the chance of a boy is $\dfrac{1}{2}$ for **every** birth.`,
        'Step 3 — Earlier births do not change this chance; sperms have no memory of previous children.',
        'Conclusion — the relative is wrong: the chance of a boy is still one in two, exactly as for the first child.',
      ],
      v: table(['Birth', 'Chance of a boy', 'Chance of a girl'], [['First', '1/2', '1/2'], ['Second', '1/2', '1/2'], ['Third', '1/2', '1/2'], ['Fourth', '1/2', '1/2']], 'Worked table showing the chance of a boy or a girl is one half at every birth'),
      n: 'Many people believe that after several girls a boy is due, like waiting for your turn in a queue. Biology does not work that way. Each birth is a fresh event, like a fresh toss of a coin. The chance is one in two every time. Understanding this also clears up an unfair myth: the mother cannot be blamed for the sex of a child.',
    }),
    sl('check', 'Quick check: whose chromosome?', {
      b: 'Judge the assertion and the reason about who determines the sex of a child.',
      n: 'Quick check. Think about which parent can give two different kinds of sex chromosome.',
      chk: 'father-ar',
    }),
    sl('concept', 'Myths and facts', {
      b: 'Understanding sex determination clears up harmful myths.',
      v: table(['Myth', 'Fact'], [['A mother is responsible for having daughters', 'The father’s sperm (X or Y) decides the sex'], ['After several girls, a boy is due', 'The chance is one half at every birth'], ['Boys inherit everything from the father', 'Every child gets half its chromosomes from each parent'], ['Sex can be chosen by diet or rituals', 'It is decided by chance at fertilisation']], 'Table of four myths about inheritance and the scientific facts that correct them'),
      n: 'Science can make families kinder. In some homes, mothers are blamed for giving birth to daughters. Now you know that the mother always contributes an X. It is the sperm, carrying either an X or a Y, that decides, and nobody chooses which sperm reaches the egg. Every child, girl or boy, inherits half of its chromosomes from each parent.',
    }),
    sl('check', 'Quick check: how many chromosomes in a sperm?', {
      b: 'How many chromosomes are present in a human sperm?',
      n: 'Your turn. A body cell has twenty-three pairs. How many chromosomes does a germ cell carry?',
      chk: 'sperm-num',
    }),
    sl('summary', 'Summary: genes, chromosomes and sex', {
      ul: [
        'A gene is a section of DNA that carries the information for one protein.',
        'Genes control traits through proteins: an efficient enzyme → more growth hormone → tall plant.',
        'Body cells have chromosomes in pairs; germ cells get one of each pair.',
        'Independent sorting of chromosome pairs explains new combinations.',
        'Humans: 22 pairs of autosomes + sex chromosomes; women XX, men XY.',
        'The father’s sperm (X or Y) decides the sex; the chance of a boy or a girl is one half.',
      ],
      v: table(['Idea', 'Key fact'], [['Gene', 'Information for one protein'], ['Chromosome pairs', 'One from each parent'], ['Germ cell', 'One chromosome of each pair'], ['Sex chromosomes', 'XX female, XY male'], ['Sex of a child', 'Decided by the sperm: X or Y']], 'Summary table of five key ideas: gene, chromosome pairs, germ cell, sex chromosomes and the sex of a child'),
      n: 'Let us recap. Genes are recipes for proteins, and proteins such as enzymes produce the traits we see, like a pea plant’s height. Chromosomes come in pairs, and germ cells get one of each, which explains Mendel’s ratios. In humans, an X or a Y from the father’s sperm decides whether a baby is a girl or a boy, with equal chances.',
    }),
    sl('exam-tips', 'Exam tips: traits and sex determination', {
      ul: [
        'Plant height answers need the full chain: **gene → enzyme → hormone → height**.',
        'Say clearly that germ cells get **one chromosome of each pair**.',
        'Sex determination: draw the X/Y cross and state that the **father** decides.',
        'Mention at least one non-genetic example: **temperature** in some reptiles, sex change in **snails**.',
        'Human chromosome numbers: 46 in body cells (23 pairs); 23 in germ cells (22 + X or 22 + Y).',
        'Typical 3-mark split: chromosomes of each parent (1) + cross or diagram (1) + conclusion with probability (1).',
      ],
      v: table(['Common mistake', 'Correct idea'], [['The mother decides the sex of the child', 'The father’s sperm decides'], ['Germ cells have 46 chromosomes', 'Germ cells have 23'], ['Genes directly make a plant tall', 'Genes make enzymes that control hormone levels'], ['Sex is decided genetically in all animals', 'In some reptiles temperature decides']], 'Table of common mistakes about gene expression and sex determination with the correct ideas'),
      n: 'Here is how to finish strongly. In plant height questions, examiners look for the enzyme and the hormone, so never skip them. Draw the X and Y cross neatly and conclude that the chance is one half. Remember the numbers: forty-six in body cells, twenty-three in germ cells. And show breadth by mentioning turtles and snails.',
    }),
  ],
});
