// ch08 Heredity — question bank. AR keys planned: a a d c b a c d b.
import { mk, add, r } from '../../cbse-10-science-ch06/src/lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const near = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol;
// Independent Punnett engine for re-solve checks: genotype strings like "TtRr".
const gametes = (g) => {
  const pairs = g.match(/../g);
  return pairs.reduce((acc, p) => acc.flatMap((a) => [a + p[0], a + p[1]]), ['']);
};
const cross = (g1, g2) => {
  const out = [];
  for (const a of gametes(g1)) for (const b of gametes(g2)) out.push([...a].map((c, i) => [c, b[i]].sort().join('')).join(''));
  return out; // genotype per box
};
const showsDominant = (geno, i) => /[A-Z]/.test(geno.slice(2 * i, 2 * i + 2));
const frac = (boxes, pred) => boxes.filter(pred).length / boxes.length;

// ---------------------------------------------------------------- t01 variation
add('more-variation-mcq', mcq({
  stem: 'Why does sexual reproduction produce more variation than asexual reproduction?',
  right: 'It combines DNA from two parents in new ways, in addition to small copying changes.',
  wrong: ['DNA is copied more carelessly in sexual reproduction.', 'The environment changes the DNA of sexually produced offspring.', 'Asexual reproduction does not involve copying DNA at all.'],
  sol: 'Both kinds of reproduction involve slightly inaccurate DNA copying, but sexual reproduction also mixes DNA from two parents, giving new combinations — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('banana-mango-mcq', mcq({
  stem: 'A banana plantation was raised from suckers of a single plant, while a mango orchard nearby was raised from seeds collected from many trees. Which shows more variation among its plants, and why?',
  right: 'The mango orchard, because each seed came from sexual reproduction that mixes DNA from two parents',
  wrong: ['The banana plantation, because suckers grow faster', 'The banana plantation, because DNA copying is less accurate in suckers', 'Neither, because all plants of one kind are identical'],
  sol: 'Step 1 — Suckers are vegetative copies of one plant: only tiny copying differences.\n\nStep 2 — Seeds come from sexual reproduction, combining DNA of two parents in new ways, so the orchard varies more — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('pesticide-mcq', mcq({
  stem: 'A farmer sprayed the same pesticide on his cotton crop every season. At first it killed almost all the insect pests; after some years it killed only a few. What is the best explanation?',
  right: 'A few insects already had a variation that helped them survive the pesticide, and their offspring inherited it.',
  wrong: ['The insects learnt to avoid the pesticide and taught their young.', 'The pesticide made every insect develop resistance on purpose.', 'The pesticide slowly lost its strength in the bottle.'],
  sol: 'Step 1 — In a large population, a few insects happened to carry a variation that let them survive.\n\nStep 2 — Each spraying killed the others; the survivors reproduced and passed the variation on, so it became common — option (@K).\n\nStep 3 — Variations are not produced on purpose (@2), and learnt behaviour is not passed on through DNA (@1).',
  d: 4, c: 'analysis', t: [1],
}));
add('variation-ar', ar({
  a: 'Sexual reproduction produces more variation than asexual reproduction.',
  r: 'In sexual reproduction, DNA from two parents is combined in the offspring.',
  key: 'a',
  sol: 'Both are true, and combining DNA from two parents is the reason for the extra variation — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('asexual-tf', tf({
  stem: 'Offspring produced by asexual reproduction show only very small variations.',
  key: 't',
  sol: 'True. Their only differences come from small inaccuracies in DNA copying.',
  d: 1, c: 'recall', t: [1],
}));
add('variation-short', short({
  marks: 2,
  stem: 'How do variations arise in (a) asexual reproduction and (b) sexual reproduction? Which produces more variation?',
  model: '(a) In asexual reproduction, variations arise only from **small inaccuracies in DNA copying**.\n\n(b) In sexual reproduction, besides copying errors, **DNA from two parents is combined** in new ways in each offspring. So **sexual reproduction** produces much more variation.',
  sol: 'Name the source of variation in each, then compare.',
  scheme: [['(a) DNA copying errors', 1], ['(b) Mixing of two parents’ DNA; sexual gives more', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('variation-claim-short', short({
  marks: 3,
  stem: 'A student says, "Variations are always harmful, because they make offspring different from their well-adapted parents." Evaluate this claim, giving an example.',
  model: 'The claim is **not correct**. Many variations are harmless, and a few can be **useful**, depending on the surroundings. For example, if a pond warms up in a heat wave, the few bacteria that happen to tolerate heat survive and multiply, while the rest die. Without such variation the whole population could be wiped out. So variation helps a species **survive changes** in its environment, even though large changes in body design may be harmful.',
  sol: 'Step 1 — State whether the claim holds.\n\nStep 2 — Give an example of a useful variation.\n\nStep 3 — Conclude about survival of the species.',
  scheme: [['Judges the claim as incorrect', 1], ['Suitable example of a useful variation', 1], ['Links variation to survival when conditions change', 1]],
  d: 3, c: 'evaluation', t: [1],
}));
add('heredity-long', long({
  stem: '(a) Why does sexual reproduction create more variation than asexual reproduction?\n\n(b) State the rules Mendel’s work shows about how much genetic material each parent contributes, and how many versions of each gene a child has.\n\n(c) Explain, with an example, why some variations become more common in a population over time.',
  model: '(a) Asexual offspring differ only by small DNA copying errors. In sexual reproduction, DNA from **two parents** is combined in new ways in every offspring, in addition to copying errors, so there is far more variation.\n\n(b) Both parents contribute **equal amounts** of genetic material. So for every trait the child has **two versions** of the gene, one from the father and one from the mother; when they differ, the dominant one is expressed.\n\n(c) Variations differ in how useful they are in a given environment. For example, when a pesticide is used year after year, the few insects that carry a variation allowing them to survive reproduce and pass it on, while the others die. Over generations the variation becomes **common**. The environment does not create the variation; it selects among existing ones.',
  sol: 'Step 1 — Compare the sources of variation.\n\nStep 2 — Equal contribution; two versions per trait.\n\Step 3 — Selection of an existing useful variation, with an example.'.replace('\\Step', 'Step'),
  scheme: [['(a) Mixing of two parents’ DNA', 1.5], ['(b) Equal contribution and two versions per trait', 1.5], ['(c) Selection of a useful variation, with an example', 2]],
  d: 3, c: 'understanding', t: [1, 2],
}));

// ---------------------------------------------------------------- t02 Mendel
add('dominant-mcq', mcq({
  stem: 'When pure-breeding tall and pure-breeding short pea plants are crossed, all the first-generation plants are tall. Tallness is therefore:',
  right: 'dominant',
  wrong: ['recessive', 'a new variation', 'an acquired trait'],
  sol: 'The trait that shows in all first-generation plants, masking the other, is dominant — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('f1-genotype-mcq', mcq({
  stem: 'A pure tall pea plant (TT) is crossed with a pure short plant (tt). What is the genotype of the first-generation plants?',
  right: 'Tt',
  wrong: ['TT', 'tt', 'A mixture of TT and tt'],
  sol: 'Every germ cell of the TT parent carries T and every germ cell of the tt parent carries t, so all offspring are Tt — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('f2-ratio-mcq', mcq({
  stem: 'In the second generation of Mendel’s tall × short cross, what is the ratio of tall plants to short plants?',
  right: '3 : 1',
  wrong: ['1 : 1', '1 : 2 : 1', '9 : 3 : 3 : 1'],
  sol: 'Tt × Tt gives TT, Tt, Tt and tt: three tall to one short — option (@K). 1 : 2 : 1 (@2) is the genotype ratio.',
  d: 1, c: 'recall', t: [2],
}));
add('same-phenotype-mcq', mcq({
  stem: 'Which two genotypes have the same phenotype in pea plants, where T (tall) is dominant over t (short)?',
  right: 'TT and Tt',
  wrong: ['Tt and tt', 'TT and tt', 'All three, TT, Tt and tt'],
  sol: 'TT and Tt both contain at least one T, so both are tall — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('testcross-mcq', mcq({
  stem: 'A tall pea plant is crossed with a short plant (tt). All 60 offspring are tall. What is the most likely genotype of the tall parent?',
  right: 'TT',
  wrong: ['Tt', 'tt', 'It cannot be predicted at all'],
  sol: 'Step 1 — The short parent gives only t.\n\nStep 2 — A Tt parent would give t in half its germ cells, producing about 30 short offspring; none appeared.\n\nStep 3 — So the tall parent gives only T: it is TT — option (@K).',
  d: 4, c: 'analysis', t: [2],
}), (q) => cross('TT', 'tt').every((g) => showsDominant(g, 0)) && frac(cross('Tt', 'tt'), (g) => !showsDominant(g, 0)) === 0.5 || 'testcross');
add('dihybrid-germ-mcq', mcq({
  stem: 'How many different kinds of germ cell can a pea plant with genotype TtRr produce?',
  right: '4',
  wrong: ['2', '8', '16'],
  sol: 'Each germ cell gets one version of each gene: TR, Tr, tR or tr — four kinds — option (@K).',
  d: 3, c: 'application', t: [2],
}), () => new Set(gametes('TtRr')).size === 4 || 'gametes');
add('dihybrid-ratio-mcq', mcq({
  stem: 'In the second generation of a dihybrid cross, the four phenotypes appear in the ratio:',
  right: '9 : 3 : 3 : 1',
  wrong: ['3 : 1', '1 : 2 : 1', '1 : 1 : 1 : 1'],
  sol: 'A TtRr × TtRr cross gives 9 : 3 : 3 : 1 — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('new-combo-mcq', mcq({
  stem: 'Pure tall plants with round seeds are crossed with pure short plants with wrinkled seeds, and the first generation is self-pollinated. Which second-generation plants show new combinations not seen in either original parent?',
  right: 'Tall plants with wrinkled seeds, and short plants with round seeds',
  wrong: ['Tall plants with round seeds only', 'Short plants with wrinkled seeds only', 'Medium-height plants with medium seeds'],
  sol: 'The parents were tall round and short wrinkled. Tall wrinkled and short round are new combinations — option (@K). There are no medium plants (@3).',
  d: 3, c: 'application', t: [2],
}));
add('violet-white-mcq', mcq({
  stem: 'Two violet-flowered pea plants are crossed, and about a quarter of their offspring have white flowers. What can you conclude?',
  right: 'White is recessive, and both parents carry one hidden version for white.',
  wrong: ['White is dominant, and both parents are pure violet.', 'The white flowers are caused by poor soil, not by genes.', 'Only one parent carries the version for white.'],
  sol: 'Step 1 — White appears though neither parent is white, so white was hidden: it is recessive.\n\nStep 2 — A white plant needs two white versions, one from each parent, so both parents are hybrids (Vv); Vv × Vv gives one quarter white — option (@K).',
  d: 3, c: 'analysis', t: [2],
}), () => frac(cross('Vv', 'Vv'), (g) => !showsDominant(g, 0)) === 0.25 || 'white');
add('yellow-green-mcq', mcq({
  stem: 'In peas, yellow seed colour (Y) is dominant over green (y). What offspring are expected when a Yy plant is crossed with a yy plant?',
  right: 'About half yellow and half green',
  wrong: ['All yellow', 'Three yellow to one green', 'All green'],
  sol: 'Yy gives Y and y equally; yy gives only y. Offspring: Yy (yellow) and yy (green) in equal numbers — option (@K).',
  d: 3, c: 'application', t: [2],
}), () => frac(cross('Yy', 'yy'), (g) => showsDominant(g, 0)) === 0.5 || 'half');
add('pure-tall-fraction-mcq', mcq({
  stem: 'Two Tt pea plants are crossed. What fraction of the offspring are expected to be tall plants that will always breed true (give only tall offspring when self-pollinated)?',
  right: '1/4',
  wrong: ['3/4', '1/2', '1/3'],
  sol: 'Only TT plants breed true. TT is one box out of four in the Punnett square — option (@K). 3/4 (@1) counts all tall plants, including Tt.',
  d: 3, c: 'application', t: [2],
}), () => frac(cross('Tt', 'Tt'), (g) => g === 'TT') === 0.25 || 'quarter');
add('one-char-mcq', mcq({
  stem: 'In the second generation of a dihybrid cross (TtRr × TtRr), 800 plants are raised. How many of them are expected to be tall, whatever their seed shape?',
  right: '600',
  wrong: ['450', '400', '200'],
  sol: r`Tall plants are 9/16 (tall round) + 3/16 (tall wrinkled) = 12/16 = 3/4 of the total, so $\dfrac{3}{4} \times 800 = 600$ — option (@K). 450 (@1) counts only tall round.`,
  d: 4, c: 'analysis', t: [2],
}), () => near(frac(cross('TtRr', 'TtRr'), (g) => showsDominant(g, 0)) * 800, 600) || 'tall');
add('dominance-ar', ar({
  a: 'A dominant trait is always more common in a population than the recessive trait.',
  r: 'A dominant trait is expressed even when only one copy of its gene version is present.',
  key: 'd',
  sol: 'A is false: "dominant" describes how a trait is expressed, not how common it is. R is true — option (d).',
  d: 3, c: 'understanding', t: [2],
}));
add('f1-ar', ar({
  a: 'When pure tall and pure short pea plants are crossed, all the first-generation plants are tall.',
  r: 'The first-generation plants have two copies of the version for tallness (TT).',
  key: 'c',
  sol: 'A is true. R is false: the first-generation plants are Tt; one copy of T is enough to make them tall — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('independent-ar', ar({
  a: 'In the second generation of a dihybrid cross, tall plants with wrinkled seeds and short plants with round seeds appear.',
  r: 'The traits for height and seed shape are inherited independently of each other.',
  key: 'a',
  sol: 'Both are true. Because the two traits are inherited independently, they recombine to give the new combinations — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('tt-ar', ar({
  a: 'A pea plant with genotype Tt is tall.',
  r: 'A pea plant with genotype tt produces only germ cells carrying t.',
  key: 'b',
  sol: 'Both are true, but the germ cells of a tt plant say nothing about why a Tt plant is tall; that is because T is dominant — option (b).',
  d: 3, c: 'analysis', t: [2],
}));
add('violet-fill', fill({
  stem: 'A trait that appears in all the first-generation offspring when two pure-breeding plants with contrasting traits are crossed is called a ___ trait.',
  acc: [['dominant']],
  sol: 'It is the **dominant** trait; the hidden one is recessive.',
  d: 2, c: 'understanding', t: [2],
}));
add('phenotype-fill', fill({
  stem: 'The visible trait of an organism, such as tall or short, is its ___, while its gene combination, such as Tt, is its ___.',
  acc: [['phenotype'], ['genotype']],
  sol: '**Phenotype** is what we see; **genotype** is the gene combination.',
  d: 1, c: 'recall', t: [2],
}));
add('f2-tf', tf({
  stem: 'In the second generation of a monohybrid cross, all the tall plants have the same genotype.',
  key: 'f',
  sol: 'False. One third of the tall plants are TT and two thirds are Tt.',
  d: 2, c: 'understanding', t: [2],
}));
add('terms-match', match({
  stem: 'Match each term in Column A with its meaning or example in Column B.',
  pairs: [['Genotype', 'The gene combination, e.g. Tt'], ['Phenotype', 'The visible trait, e.g. tall'], ['Dominant', 'Expressed with only one copy present'], ['Recessive', 'Expressed only when both copies are present']],
  order: [1, 3, 0, 2],
  sol: 'Genotype → gene combination (1 → q); phenotype → visible trait (2 → s); dominant → one copy enough (3 → p); recessive → needs two copies (4 → r).',
  d: 2, c: 'understanding', t: [2],
}));
add('f2-count-num', num({
  stem: 'Two Tt pea plants are crossed and 840 offspring are raised. How many are expected to be short?',
  value: 210, tol: 0, unit: null,
  sol: r`Short plants (tt) are $\dfrac{1}{4}$ of the offspring: $\dfrac{1}{4} \times 840 = 210$.`,
  scheme: [['One quarter of 840 = 210', 1]],
  d: 2, c: 'application', t: [2],
}), (q) => near(frac(cross('Tt', 'Tt'), (g) => !showsDominant(g, 0)) * 840, q.answer.value) || 'short');
add('hetero-num', num({
  stem: 'Two Tt pea plants are crossed and 960 offspring are raised. How many are expected to have the genotype Tt?',
  value: 480, tol: 0, unit: null,
  sol: r`Tt is 2 out of 4 boxes $= \dfrac{1}{2}$, so $\dfrac{1}{2} \times 960 = 480$.`,
  scheme: [['Half of 960 = 480', 1]],
  d: 3, c: 'application', t: [2],
}), (q) => near(frac(cross('Tt', 'Tt'), (g) => g === 'Tt') * 960, q.answer.value) || 'Tt');
add('dihybrid-count-num', num({
  stem: 'Pea plants with genotype YyRr (yellow, round seeds) are self-pollinated and 1120 seeds are obtained. How many seeds are expected to be green and wrinkled (yyrr)?',
  value: 70, tol: 0, unit: null,
  sol: r`Green wrinkled is 1 box out of 16: $\dfrac{1120}{16} = 70$.`,
  scheme: [['One sixteenth of 1120 = 70', 1]],
  d: 3, c: 'application', t: [2],
}), (q) => near(frac(cross('YyRr', 'YyRr'), (g) => g === 'yyrr') * 1120, q.answer.value) || 'yyrr');
add('monohybrid-short', short({
  marks: 2,
  wl: null,
  stem: 'Round seed shape (R) is dominant over wrinkled (r) in peas. A pure round-seeded plant is crossed with a wrinkled-seeded plant, and the first generation is self-pollinated. Show the second generation with a Punnett square and give the phenotype ratio.',
  model: 'Parents RR × rr → first generation **Rr** (all round). Germ cells of each Rr plant: R and r.\n\n| | R | r |\n|---|---|---|\n| **R** | RR | Rr |\n| **r** | Rr | rr |\n\nSecond generation: RR : Rr : rr = 1 : 2 : 1, so **3 round : 1 wrinkled**.',
  sol: 'Set out parents, first generation, germ cells, the Punnett square and the ratio.',
  scheme: [['First generation Rr and its germ cells', 0.5], ['Correct Punnett square', 1], ['Ratio 3 round : 1 wrinkled', 0.5]],
  d: 3, c: 'application', t: [2],
}), () => frac(cross('Rr', 'Rr'), (g) => showsDominant(g, 0)) === 0.75 || 'mono');
add('hidden-short', short({
  marks: 2,
  stem: 'In Mendel’s tall × short cross, no short plants appeared in the first generation, but short plants reappeared in the second generation. Explain why.',
  model: 'The first-generation plants were **Tt**: the version for shortness was present but **hidden**, because T is dominant. When these plants were self-pollinated, each made t germ cells as well as T germ cells, and when two t germ cells combined (**tt**), about one plant in four was short.',
  sol: 'Explain the hidden recessive version in Tt and how tt arises in the next generation.',
  scheme: [['First generation Tt: short version hidden by dominant tall', 1], ['tt combination appears in about a quarter of the second generation', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('dihybrid-short', short({
  marks: 3,
  wl: null,
  stem: 'A pea plant with genotype TtRr (tall, round seeds) is self-pollinated.\n\n(a) List the kinds of germ cell it forms.\n\n(b) Give the four phenotypes expected in the offspring, with their ratio.\n\n(c) What does the appearance of tall wrinkled and short round plants show?',
  model: '(a) **TR, Tr, tR, tr**, in equal numbers.\n\n(b) Tall round : tall wrinkled : short round : short wrinkled = **9 : 3 : 3 : 1**.\n\n(c) Height and seed shape are **inherited independently**, so they can appear in new combinations.',
  sol: 'Step 1 — Combine one version of each gene.\n\nStep 2 — Use the 16-box Punnett square.\n\nStep 3 — New combinations mean independent inheritance.',
  scheme: [['(a) Four germ cells', 1], ['(b) Four phenotypes with 9 : 3 : 3 : 1', 1], ['(c) Independent inheritance', 1]],
  d: 3, c: 'understanding', t: [2],
}), () => {
  const b = cross('TtRr', 'TtRr');
  const n = (h, s) => b.filter((g) => showsDominant(g, 0) === h && showsDominant(g, 1) === s).length;
  return (n(true, true) === 9 && n(true, false) === 3 && n(false, true) === 3 && n(false, false) === 1) || 'ratio';
});
add('unknown-genotype-short', short({
  marks: 3,
  stem: 'A seed company has a tall pea plant and needs to know whether it is TT or Tt before using its seeds. Describe a cross that would tell them, and the results expected in each case.',
  model: 'Cross the tall plant with a **short (tt)** plant, which can only give t germ cells.\n\n- If the tall plant is **TT**, all its germ cells carry T, so **all offspring are tall** (Tt).\n- If it is **Tt**, half its germ cells carry t, so about **half the offspring are tall and half short**.\n\nSo the appearance of any short offspring shows that the plant is Tt.',
  sol: 'Step 1 — Use a short plant, which reveals the tall plant’s germ cells.\n\nStep 2 — Predict the offspring for TT and for Tt.\n\nStep 3 — State how to decide.',
  scheme: [['Cross with a short (tt) plant', 1], ['TT gives all tall', 1], ['Tt gives about half short', 1]],
  d: 4, c: 'analysis', t: [2],
}), () => (cross('TT', 'tt').every((g) => showsDominant(g, 0)) && frac(cross('Tt', 'tt'), (g) => showsDominant(g, 0)) === 0.5) || 'testcross');
add('mono-long', long({
  stem: '(a) Mendel crossed pure tall pea plants with pure short pea plants. Using T and t, show the cross up to the second generation with a Punnett square.\n\n(b) Give the phenotype and genotype ratios of the second generation.\n\n(c) What did this cross tell Mendel about dominant and recessive traits?',
  model: '(a) Parents: TT (tall) × tt (short). Germ cells: T and t. First generation: all **Tt**, tall. First generation self-pollinated: germ cells T and t from each parent.\n\n| | T | t |\n|---|---|---|\n| **T** | TT | Tt |\n| **t** | Tt | tt |\n\n(b) Phenotype: **3 tall : 1 short**. Genotype: **1 TT : 2 Tt : 1 tt**.\n\n(c) A single copy of T is enough to make a plant tall, so tallness is **dominant**; shortness shows only in tt plants, so it is **recessive**. The recessive trait was **hidden**, not lost, in the first generation, and both parents contribute one version of each gene.',
  sol: 'Step 1 — Set out parents, germ cells, first generation and the Punnett square.\n\nStep 2 — Read off both ratios.\n\nStep 3 — State the conclusions about dominance.',
  scheme: [['(a) Parents, germ cells and first generation', 1], ['(a) Correct Punnett square for the second generation', 1.5], ['(b) Both ratios', 1], ['(c) Dominant, recessive and hidden-not-lost', 1.5]],
  d: 3, c: 'understanding', t: [2],
}), () => {
  const b = cross('Tt', 'Tt');
  return (b.filter((g) => g === 'TT').length === 1 && b.filter((g) => g === 'Tt').length === 2 && b.filter((g) => g === 'tt').length === 1) || 'mono ratios';
});
add('di-long', long({
  stem: 'In peas, yellow seed colour (Y) is dominant over green (y), and round seed shape (R) is dominant over wrinkled (r). A pure yellow round plant is crossed with a pure green wrinkled plant.\n\n(a) What are the genotype and phenotype of the first generation?\n\n(b) Draw a Punnett square for the second generation and give the phenotype ratio.\n\n(c) If 640 second-generation seeds are collected, how many of each type are expected?\n\n(d) What does this cross show about the inheritance of two traits?',
  model: '(a) **YyRr**: yellow, round.\n\n(b) Germ cells of each parent: YR, Yr, yR, yr.\n\n| | YR | Yr | yR | yr |\n|---|---|---|---|---|\n| **YR** | YYRR | YYRr | YyRR | YyRr |\n| **Yr** | YYRr | YYrr | YyRr | Yyrr |\n| **yR** | YyRR | YyRr | yyRR | yyRr |\n| **yr** | YyRr | Yyrr | yyRr | yyrr |\n\nYellow round : yellow wrinkled : green round : green wrinkled = **9 : 3 : 3 : 1**.\n\n(c) One sixteenth of 640 is 40: yellow round **360**, yellow wrinkled **120**, green round **120**, green wrinkled **40**.\n\n(d) Seed colour and seed shape are **inherited independently**; new combinations (yellow wrinkled, green round) appear.',
  sol: r`Step 1 — The first generation is YyRr.

Step 2 — Four germ cells each; 16 boxes; count phenotypes.

Step 3 — $\dfrac{640}{16} = 40$; multiply by 9, 3, 3 and 1.

Step 4 — New combinations show independent inheritance.`,
  scheme: [['(a) YyRr, yellow round', 0.5], ['(b) Germ cells and Punnett square', 1.5], ['(b) Ratio 9 : 3 : 3 : 1', 1], ['(c) 360, 120, 120, 40', 1], ['(d) Independent inheritance', 1]],
  d: 5, c: 'application', t: [2],
  wl: null,
}), () => {
  const b = cross('YyRr', 'YyRr');
  const n = (h, s) => (b.filter((g) => showsDominant(g, 0) === h && showsDominant(g, 1) === s).length / 16) * 640;
  return (n(true, true) === 360 && n(true, false) === 120 && n(false, true) === 120 && n(false, false) === 40) || 'counts';
});

// ---------------------------------------------------------------- t03 how traits are expressed
add('gene-mcq', mcq({
  stem: 'A gene is best described as:',
  right: 'a section of DNA that carries the information for making one protein',
  wrong: ['a whole chromosome', 'a protein that controls a trait', 'a cell that carries traits from parents'],
  sol: 'A gene is a section of DNA providing the information for one protein — option (@K). It is part of a chromosome (@1), not a protein (@2) or a cell (@3).',
  d: 1, c: 'recall', t: [3],
}));
add('dwarf-enzyme-mcq', mcq({
  stem: 'A pea plant carries two copies of a gene version that makes a poorly working enzyme for producing a growth hormone. The plant is most likely to be:',
  right: 'short, because it makes too little growth hormone',
  wrong: ['tall, because it has two copies of the gene', 'tall, because enzymes are not needed for growth', 'short, because the gene itself stops the stem from growing'],
  sol: 'Step 1 — Both copies give a poor enzyme, so little growth hormone is made.\n\nStep 2 — Less hormone means less growth: a short plant — option (@K). The gene acts through the enzyme and hormone, not directly (@3).',
  d: 3, c: 'application', t: [3],
}));
add('germ-cell-mcq', mcq({
  stem: 'A body cell of an organism has 8 chromosomes in 4 pairs. What does each of its germ cells receive?',
  right: '4 chromosomes, one from each pair',
  wrong: ['8 chromosomes, both members of every pair', '4 chromosomes, all from the father', '2 complete pairs of chromosomes'],
  sol: 'A germ cell receives one chromosome of each pair, which may have come from either parent: 4 chromosomes — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('spray-mcq', mcq({
  stem: 'A dwarf pea plant (tt) lacks enough of a growth hormone because its enzyme works poorly. When it is sprayed with that hormone, it grows tall. If seeds from this plant are sown (it is self-pollinated), the new plants will be:',
  right: 'short, because spraying did not change the genes passed to the seeds',
  wrong: ['tall, because the parent became tall', 'half tall and half short', 'tall, because the hormone enters the seeds and changes their genes'],
  sol: 'Step 1 — The spray supplied the missing hormone but did not change the plant’s DNA.\n\nStep 2 — The plant still makes only t germ cells, so its offspring are tt: short — option (@K).\n\nStep 3 — Changes in a body that are not in the DNA are not inherited (@1, @3).',
  d: 4, c: 'analysis', t: [3],
}));
add('gene-ar', ar({
  a: 'The height of a pea plant depends on the amount of a particular growth hormone it makes.',
  r: 'Chromosomes are found in the nucleus of a cell.',
  key: 'b',
  sol: 'Both are true, but where chromosomes are found does not explain how height is controlled; that depends on an enzyme that makes the hormone — option (b).',
  d: 2, c: 'understanding', t: [3],
}));
add('pairs-tf', tf({
  stem: 'Each body cell has two copies of every chromosome, one inherited from each parent.',
  key: 't',
  sol: 'True. A germ cell carries one copy; the zygote gets one from each parent.',
  d: 1, c: 'recall', t: [3],
}));
add('gene-fill', fill({
  stem: 'A section of DNA that provides the information for making one protein is called a ___.',
  acc: [['gene']],
  sol: 'It is a **gene**.',
  d: 1, c: 'recall', t: [3],
}));
add('height-short', short({
  marks: 2,
  stem: 'Explain how a gene controls the height of a pea plant.',
  model: 'The gene carries the information for an **enzyme** that helps make a growth **hormone**. If the gene version makes an **efficient** enzyme, plenty of hormone is made and the plant grows **tall**. If the gene is altered so the enzyme is **less efficient**, less hormone is made and the plant stays **short**.',
  sol: 'Give the chain gene → enzyme → hormone → height for both versions.',
  scheme: [['Gene makes an enzyme that makes the growth hormone', 1], ['Efficient vs less efficient enzyme → tall vs short', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('chromosome-short', short({
  marks: 3,
  stem: 'A plant has two pairs of chromosomes. Pair 1 carries the gene for height (T or t) and pair 2 the gene for seed shape (R or r). The plant’s genotype is TtRr.\n\n(a) What kinds of germ cell can it form?\n\n(b) Why can all these combinations form?\n\n(c) How does this explain the new combinations Mendel saw in his dihybrid cross?',
  model: '(a) **TR, Tr, tR and tr**.\n\n(b) Each germ cell takes **one chromosome of each pair**, and which member of pair 1 goes in does not affect which member of pair 2 goes in: the pairs **sort independently**.\n\n(c) Because T can go with R or r, and t with R or r, germ cells carry new mixtures of the parents’ versions, so offspring such as tall wrinkled and short round appear.',
  sol: 'Step 1 — One of each pair, all combinations.\n\nStep 2 — Pairs sort independently.\n\nStep 3 — Independent sorting gives new combinations.',
  scheme: [['(a) Four germ cells', 1], ['(b) One of each pair; pairs sort independently', 1], ['(c) Leads to new combinations in offspring', 1]],
  d: 3, c: 'application', t: [2, 3],
}));
add('traits-long', long({
  stem: '(a) What is a gene?\n\n(b) Explain how genes control the characteristics of an organism, using plant height as an example.\n\n(c) Why does every germ cell carry only one copy of each gene, and how is the full set restored?\n\n(d) Explain why a Tt plant is as tall as a TT plant.',
  model: '(a) A gene is a **section of DNA** that provides the information for making **one protein**.\n\n(b) Genes act through the proteins they make. In peas, a gene carries the information for an **enzyme** that helps produce a growth **hormone**. An efficient version of the enzyme gives plenty of hormone and a tall plant; an altered gene gives a less efficient enzyme, less hormone and a short plant.\n\n(c) Genes are on chromosomes, which come in **pairs** in body cells. When germ cells form, each gets **one chromosome of each pair**, so one copy of each gene. When a male and a female germ cell fuse, the zygote again has **two copies**.\n\n(d) One T copy makes enough efficient enzyme, so enough hormone is produced for the plant to grow tall; T is dominant over t.',
  sol: 'Step 1 — Define a gene.\n\nStep 2 — Gene → enzyme → hormone → height.\n\nStep 3 — One of each pair in germ cells; fusion restores pairs.\n\nStep 4 — One efficient copy is enough.',
  scheme: [['(a) Definition', 1], ['(b) Gene → enzyme → hormone → height', 1.5], ['(c) One of each pair; restored at fertilisation', 1.5], ['(d) One T copy is enough', 1]],
  d: 3, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 sex determination
add('female-xx-mcq', mcq({
  stem: 'The sex chromosomes of a human female are:',
  right: 'XX',
  wrong: ['XY', 'YY', 'XO'],
  sol: 'Women have a matched pair of X chromosomes — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('egg-mcq', mcq({
  stem: 'What does every human egg cell contain?',
  right: '22 autosomes and one X chromosome',
  wrong: ['22 autosomes and one Y chromosome', '22 autosomes and either X or Y', '44 autosomes and two X chromosomes'],
  sol: 'An egg is a germ cell with one chromosome of each pair: 22 autosomes plus the X from the XX pair — option (@K). Only sperms can carry Y (@1, @2).',
  d: 2, c: 'understanding', t: [4],
}));
add('y-sperm-mcq', mcq({
  stem: 'In a fertility clinic, an egg is fertilised by a sperm that carries a Y chromosome. What will the sex chromosomes of the baby be?',
  right: 'XY: a boy',
  wrong: ['XX: a girl', 'YY: a boy', 'Either XX or XY, depending on the mother'],
  sol: 'The egg gives X and the sperm gives Y: XY, a boy — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('turtle-mcq', mcq({
  stem: 'At a turtle hatchery on the Odisha coast, eggs buried in warmer sand gave mostly female hatchlings, while eggs in cooler sand gave mostly males. In these turtles, sex is decided by:',
  right: 'the temperature at which the eggs develop',
  wrong: ['X and Y chromosomes, as in humans', 'the mother turtle’s choice', 'the amount of food in the egg'],
  sol: 'Here the result depends on the incubation temperature, not on sex chromosomes — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('snail-mcq', mcq({
  stem: 'In which of these animals can individuals change their sex?',
  right: 'Snails',
  wrong: ['Humans', 'Dogs', 'Pigeons'],
  sol: 'Some snails can change sex during their lives — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('sperm-num', num({
  stem: 'Human body cells have 23 pairs of chromosomes. How many chromosomes are present in a human sperm?',
  value: 23, tol: 0, unit: null,
  sol: r`A sperm has one chromosome of each pair: $\dfrac{46}{2} = 23$.`,
  scheme: [['23', 1]],
  d: 2, c: 'application', t: [4],
}), (q) => near(46 / 2, q.answer.value) || 'sperm');
add('autosome-num', num({
  stem: 'How many autosomes (chromosomes other than the sex chromosome) are present in a human egg cell?',
  value: 22, tol: 0, unit: null,
  sol: r`An egg has 23 chromosomes: one sex chromosome (X) and $23 - 1 = 22$ autosomes.`,
  scheme: [['22', 1]],
  d: 3, c: 'application', t: [4],
}), (q) => near(23 - 1, q.answer.value) || 'autosomes');
add('xy-fill', fill({
  stem: 'Human males have the sex chromosomes ___, and human females have ___.',
  acc: [['XY'], ['XX']],
  sol: 'Males **XY**; females **XX**.',
  d: 1, c: 'recall', t: [4],
}));
add('mother-tf', tf({
  stem: 'The mother’s egg decides whether a baby will be a boy or a girl.',
  key: 'f',
  sol: 'False. Every egg carries an X; the father’s sperm, carrying X or Y, decides the sex.',
  d: 2, c: 'understanding', t: [4],
}));
add('father-ar', ar({
  a: 'The sex of a human child is decided by the father.',
  r: 'Half the father’s sperms carry an X chromosome and half carry a Y, while every egg carries an X.',
  key: 'a',
  sol: 'Both are true. Since the egg always gives X, the kind of sperm (X or Y) decides the sex, so R explains A — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('reptile-ar', ar({
  a: 'In some reptiles, the temperature at which the eggs develop decides the sex of the young.',
  r: 'In all animals, sex is decided by X and Y chromosomes.',
  key: 'c',
  sol: 'A is true. R is false: some animals use temperature, and some snails can change sex — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('egg46-ar', ar({
  a: 'A human egg contains 46 chromosomes.',
  r: 'A germ cell contains one chromosome from each pair.',
  key: 'd',
  sol: 'A is false: an egg has 23 chromosomes. R is true — option (d).',
  d: 2, c: 'understanding', t: [4],
}));
add('sex-det-short', short({
  marks: 2,
  wl: null,
  stem: 'Show with a cross why the chance of a baby being a boy or a girl is equal.',
  model: 'Mother XX gives only **X** eggs; father XY gives **X** or **Y** sperms in equal numbers.\n\n| | X (egg) | X (egg) |\n|---|---|---|\n| **X (sperm)** | XX girl | XX girl |\n| **Y (sperm)** | XY boy | XY boy |\n\nTwo of four combinations are girls and two are boys, so the chance of each is **one half**.',
  sol: 'Write the germ cells of each parent, combine them and count.',
  scheme: [['Germ cells of mother and father', 1], ['Cross showing 1 : 1, so equal chance', 1]],
  d: 2, c: 'understanding', t: [4],
}), () => {
  const kids = ['X', 'Y'].flatMap((s) => ['X', 'X'].map((e) => [e, s].sort().join('')));
  return kids.filter((k) => k === 'XY').length / kids.length === 0.5 || 'half';
});
add('myth-short', short({
  marks: 2,
  stem: 'Kamala has three daughters. A neighbour says Kamala is "responsible" for not having a son. Use your knowledge of sex chromosomes to evaluate this statement.',
  model: 'The statement is **wrong**. Kamala, like every woman, has XX chromosomes, so all her eggs carry an **X**. The child’s sex depends on whether the sperm that fertilises the egg carries an **X** (girl) or a **Y** (boy), which comes from the **father** and is a matter of chance. So no mother is responsible for the sex of her children.',
  sol: 'Explain what each parent contributes and who decides; conclude.',
  scheme: [['Mother always gives X', 1], ['Father’s X or Y sperm decides, by chance, so the claim is wrong', 1]],
  d: 3, c: 'evaluation', t: [4],
}));
add('strategies-short', short({
  marks: 3,
  stem: 'Describe three different ways in which the sex of a new individual is decided in different animals.',
  model: '(1) In some reptiles, such as many turtles, the **temperature** at which the fertilised eggs develop decides whether the young are male or female.\n\n(2) In some animals, such as **snails**, individuals can **change sex**.\n\n(3) In **humans**, sex is decided **genetically**: an X-carrying sperm gives a girl (XX) and a Y-carrying sperm gives a boy (XY).',
  sol: 'Give one environmental, one sex-change and one genetic example.',
  scheme: [['Temperature in reptiles', 1], ['Sex change in snails', 1], ['Genetic determination in humans', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('sex-long', long({
  stem: '(a) How many chromosomes are there in a human body cell? How are the sex chromosomes different in men and women?\n\n(b) With the help of a labelled cross, explain how the sex of a child is determined.\n\n(c) A couple has two sons. What is the chance that their third child will be a girl? Explain.\n\n(d) Why is it wrong to blame a mother for the birth of daughters?',
  model: '(a) **46** chromosomes in **23 pairs**: 22 pairs of autosomes and one pair of sex chromosomes. Women have **XX**; men have **XY**, with a shorter Y.\n\n(b) Mother XX → all eggs X. Father XY → sperms X or Y, in equal numbers. Egg (X) + sperm (X) → **XX, girl**; egg (X) + sperm (Y) → **XY, boy**. Cross: XX × XY → XX, XX, XY, XY = 1 girl : 1 boy.\n\n(c) **One half** (50%). Each birth is a separate event decided by which sperm fertilises the egg; earlier children do not change the chance.\n\n(d) The mother always gives an X. It is the **father’s sperm** that decides the sex, and that is a matter of chance, so the mother cannot be responsible.',
  sol: 'Step 1 — Numbers and sex chromosomes.\n\nStep 2 — The cross with germ cells.\n\nStep 3 — Independent chance at each birth.\n\nStep 4 — The father’s sperm decides.',
  scheme: [['(a) 23 pairs; XX and XY', 1], ['(b) Labelled cross with germ cells and result', 2], ['(c) One half, with reason', 1], ['(d) Father’s sperm decides', 1]],
  d: 3, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- case-based
add('flower-case', mk.case({
  passage: 'Students at a school in Shillong crossed pure-breeding violet-flowered pea plants with pure-breeding white-flowered plants. All 120 first-generation plants had violet flowers. They then let the first-generation plants self-pollinate and grew the seeds.\n\n| Generation | Violet-flowered plants | White-flowered plants |\n|---|---|---|\n| First | 120 | 0 |\n| Second | 618 | 202 |',
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which flower colour is dominant?',
      right: 'Violet, because all first-generation plants were violet',
      wrong: ['White, because white reappeared in the second generation', 'Neither, because both colours appear', 'White, because there were fewer white plants'],
      sol: 'The colour shown by all first-generation plants is dominant: violet — option (@K).',
      d: 1, c: 'understanding', t: [2],
    })),
    part('b', num({
      stem: 'Calculate the ratio of violet to white plants in the second generation (violet ÷ white), to one decimal place.',
      value: 3.1, tol: 0.05, unit: null,
      sol: r`$\dfrac{618}{202} \approx 3.06$, which is $3.1$ to one decimal place — close to the expected 3 : 1.`,
      scheme: [['About 3.1', 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why about a quarter of the second-generation plants had white flowers, although none of the first-generation plants did.',
      model: 'The first-generation plants were **Vv**: the version for white was present but hidden by dominant violet. Each made V and v germ cells equally. In the second generation, about one in four plants got **v from both parents (vv)**, and these were white (202 of 820, about a quarter).',
      sol: 'Use the hidden recessive version in Vv and the 1 : 2 : 1 combination of germ cells.',
      scheme: [['First generation Vv with white hidden', 1], ['vv in about a quarter of the second generation, with data', 1]],
      d: 3, c: 'analysis', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'Predict the result of crossing a first-generation violet plant with a white-flowered plant, and explain.',
        model: 'About **half violet and half white**. The first-generation plant (Vv) gives V and v germ cells equally; the white plant (vv) gives only v. The offspring are Vv (violet) and vv (white) in equal numbers.',
        sol: 'Write the germ cells of Vv and vv and combine them.',
        scheme: [['Predicts about 1 : 1', 1], ['Explains with germ cells', 1]],
        d: 3, c: 'application', t: [2],
      }),
    ]),
  ],
}), (q) => (near(Math.round((618 / 202) * 10) / 10, q.children[1].answer.value) && frac(cross('Vv', 'vv'), (g) => showsDominant(g, 0)) === 0.5) || 'flower');
add('seed-case', mk.case({
  passage: 'A plant-breeding student crossed pure yellow-round-seeded pea plants with pure green-wrinkled-seeded plants. The first-generation plants all had yellow, round seeds. When they were self-pollinated, she sorted and counted 992 second-generation seeds.\n\n| Seed type | Number |\n|---|---|\n| Yellow, round | 558 |\n| Yellow, wrinkled | 190 |\n| Green, round | 182 |\n| Green, wrinkled | 62 |',
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which seed types are new combinations, not seen in either original parent?',
      right: 'Yellow wrinkled and green round',
      wrong: ['Yellow round and green wrinkled', 'Only yellow round', 'Only green wrinkled'],
      sol: 'The parents were yellow round and green wrinkled; yellow wrinkled and green round are new — option (@K).',
      d: 2, c: 'understanding', t: [2],
    })),
    part('b', num({
      stem: 'According to the 9 : 3 : 3 : 1 ratio, how many of the 992 seeds are expected to be green and wrinkled?',
      value: 62, tol: 0, unit: null,
      sol: r`Green wrinkled is $\dfrac{1}{16}$ of the total: $\dfrac{992}{16} = 62$, exactly the number counted.`,
      scheme: [['62', 1]],
      d: 3, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Use the counts to show that seed colour and seed shape are each inherited in a 3 : 1 ratio, and explain what this tells us.',
      model: 'Colour: yellow 558 + 190 = **748**, green 182 + 62 = **244**; 748 ÷ 244 ≈ 3.1, about **3 : 1**. Shape: round 558 + 182 = **740**, wrinkled 190 + 62 = **252**; 740 ÷ 252 ≈ 2.9, about **3 : 1**. Each trait follows its own 3 : 1 ratio, unaffected by the other, so colour and shape are **inherited independently**.',
      sol: 'Add the counts for each trait separately and compare with 3 : 1.',
      scheme: [['Both totals and ratios calculated', 1], ['Concludes independent inheritance', 1]],
      d: 4, c: 'analysis', t: [2],
      wl: null,
    }), [
      short({
        marks: 2,
        stem: 'Explain, using germ cells, why four types of seed appeared in the second generation.',
        model: 'The first-generation plants were **YyRr**. Each formed four kinds of germ cell — **YR, Yr, yR, yr** — in equal numbers, because colour and shape genes sort independently. Random combination of these germ cells (16 combinations) gives all four phenotypes in the ratio 9 : 3 : 3 : 1.',
        sol: 'Name the four germ cells and link their random combination to the four phenotypes.',
        scheme: [['Four kinds of germ cell from YyRr', 1], ['Random combination gives four types, 9 : 3 : 3 : 1', 1]],
        d: 3, c: 'understanding', t: [2, 3],
      }),
    ]),
  ],
}), (q) => (near(992 / 16, q.children[1].answer.value) && 558 + 190 + 182 + 62 === 992 && near(558 + 190, 748) && near(558 + 182, 740)) || 'seeds');
add('dwarf-case', mk.case({
  passage: 'At an agricultural university, researchers studied a short (dwarf) variety of pea. They found that its gene for an enzyme involved in making a growth hormone differs slightly from the version in tall peas, so the enzyme works poorly and the plant makes very little of the hormone. When young dwarf plants were sprayed with the hormone, they grew almost as tall as normal tall plants. However, seeds collected from the sprayed plants (self-pollinated) all grew into dwarf plants.',
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'What does the gene studied here directly carry information for?',
      right: 'An enzyme that helps make the growth hormone',
      wrong: ['The growth hormone itself as a finished chemical', 'The height of the stem in centimetres', 'The number of leaves on the plant'],
      sol: 'A gene carries the information for a protein — here the enzyme that makes the hormone — option (@K).',
      d: 2, c: 'understanding', t: [3],
    })),
    part('b', short({
      marks: 1,
      stem: 'Why did spraying the hormone make the dwarf plants grow tall?',
      model: 'The spray supplied the **growth hormone** that the plants could not make enough of.',
      sol: 'The missing link in the chain was the hormone.',
      scheme: [['Spray supplied the missing hormone', 1]],
      d: 3, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why the seeds of the sprayed plants still grew into dwarf plants.',
      model: 'Spraying changed the plants’ **growth**, not their **genes**. The sprayed plants still carried two copies of the gene version that makes a poor enzyme, and their germ cells passed this version on. So their offspring again made little hormone and were dwarf.',
      sol: 'Distinguish a change in the body from a change in the DNA passed to germ cells.',
      scheme: [['Spraying did not change the genes', 1], ['Germ cells passed on the dwarf version, so offspring are dwarf', 1]],
      d: 4, c: 'analysis', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'A farmer says, "If I spray my dwarf peas every year, they will slowly turn into a tall variety." Evaluate this claim.',
        model: 'The claim is **wrong**. Spraying gives each year’s plants the hormone they lack, but it does not change their **DNA**. The gene for the poor enzyme is passed on unchanged in the germ cells, so every new generation is dwarf again unless sprayed. Only a cross with a tall variety could bring in the tall gene version.',
        sol: 'Explain that only changes in DNA are inherited.',
        scheme: [['Spraying does not change DNA, so it is not inherited', 1], ['Offspring stay dwarf; a genetic change is needed', 1]],
        d: 4, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}));
add('turtle-case', mk.case({
  passage: 'Forest department staff at an olive ridley turtle hatchery in Odisha buried batches of eggs at different depths so that they developed at different temperatures. They recorded the percentage of hatchlings that were female.\n\n| Average sand temperature (°C) | 27 | 29 | 31 |\n|---|---|---|---|\n| Female hatchlings (%) | 10 | 50 | 90 |\n\nThe staff noted that in these turtles, unlike in humans, there are no X and Y chromosomes that decide sex.',
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'What does the table show?',
      right: 'Warmer sand produces more female hatchlings.',
      wrong: ['Cooler sand produces more female hatchlings.', 'Temperature has no effect on the sex of hatchlings.', 'All eggs at 29 °C hatch as males.'],
      sol: 'Females rise from 10% at 27 °C to 90% at 31 °C — option (@K).',
      d: 2, c: 'application', t: [4],
    })),
    part('b', num({
      stem: 'If 120 eggs develop at 31 °C, how many female hatchlings are expected?',
      value: 108, tol: 0, unit: null,
      sol: r`$\dfrac{90}{100} \times 120 = 108$ females.`,
      scheme: [['108', 1]],
      d: 2, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'Compare how sex is decided in these turtles and in humans.',
      model: 'In these turtles, sex is decided by the **temperature** at which the eggs develop: warmer eggs mostly become females. In **humans**, sex is decided **genetically** at fertilisation: an X-carrying sperm gives a girl (XX) and a Y-carrying sperm gives a boy (XY); temperature has no effect.',
      sol: 'State the deciding factor for each.',
      scheme: [['Turtles: incubation temperature', 1], ['Humans: X or Y sperm at fertilisation', 1]],
      d: 3, c: 'understanding', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'Scientists worry that warmer beaches due to climate change could harm turtle populations. Use the data to evaluate this concern.',
        model: 'The concern is **reasonable**. At 31 °C, 90% of hatchlings are female; if beaches keep warming, almost all hatchlings could become female. With very few males, fewer eggs would be fertilised in future, and the population could decline.',
        sol: 'Extend the trend in the data and link a shortage of males to future breeding.',
        scheme: [['Uses the trend: warmer sand gives mostly females', 1], ['Too few males could reduce future breeding', 1]],
        d: 4, c: 'evaluation', t: [4],
      }),
    ]),
  ],
}), (q) => near(0.9 * 120, q.children[1].answer.value) || 'females');
add('family-case', mk.case({
  passage: 'Lakshmi and Ravi have three daughters. At a family function, an elderly relative said Lakshmi should "pray harder" to have a son, and another said the fourth child "is sure to be a boy now". Their family doctor explained that human body cells have 23 pairs of chromosomes, one pair being the sex chromosomes, and that every egg carries an X chromosome while sperms carry either an X or a Y.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which sex chromosome did each of the three daughters receive from Ravi?',
      right: 'X',
      wrong: ['Y', 'Either X or Y', 'None'],
      sol: 'Daughters are XX; one X comes from the mother and the other must have come from the father — option (@K).',
      d: 2, c: 'application', t: [4],
    })),
    part('b', num({
      stem: 'What is the percentage chance that their fourth child will be a boy?',
      value: 50, tol: 0, unit: '%',
      sol: 'Half the sperms carry Y, so the chance of a boy is one half, or 50%, at every birth.',
      scheme: [['50%', 1]],
      d: 2, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'Using a cross, explain to the family how the sex of a child is determined.',
      model: 'Lakshmi (XX) gives only **X** eggs. Ravi (XY) gives **X** or **Y** sperms in equal numbers. X egg + X sperm → **XX, girl**; X egg + Y sperm → **XY, boy**. So the father’s sperm decides, and each birth has an equal chance of a girl or a boy.',
      sol: 'Show the germ cells of each parent and the two possible results.',
      scheme: [['Germ cells of each parent', 1], ['XX girl / XY boy, father’s sperm decides', 1]],
      d: 3, c: 'understanding', t: [4],
      wl: null,
    }), [
      short({
        marks: 2,
        stem: 'Evaluate the two relatives’ statements using what the doctor said.',
        model: 'Both are **wrong**. Lakshmi only ever gives an X, so prayer or anything she does cannot decide the sex; the sperm (X or Y) decides, by chance. And the chance of a boy is still **one half** for the fourth child; earlier daughters do not make a boy "due", because each fertilisation is a separate event.',
        sol: 'Address each statement: who decides, and whether earlier births change the chance.',
        scheme: [['First statement wrong: the mother always gives X', 1], ['Second statement wrong: chance is still one half', 1]],
        d: 3, c: 'evaluation', t: [4],
      }),
    ]),
  ],
}), (q) => near(50, q.children[1].answer.value) || 'boy');
add('seedco-case', mk.case({
  passage: 'A seed company wants a pure-breeding tall pea variety. It tests three tall plants, A, B and C, by crossing each with a short (tt) plant and growing the seeds.\n\n| Tall plant tested | Tall offspring | Short offspring |\n|---|---|---|\n| A | 48 | 0 |\n| B | 26 | 24 |\n| C | 51 | 0 |',
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which plants are most likely pure-breeding tall (TT)?',
      right: 'A and C',
      wrong: ['B only', 'A, B and C', 'None of them'],
      sol: 'A TT plant crossed with tt gives only tall offspring; A and C gave no short offspring — option (@K).',
      d: 3, c: 'analysis', t: [2],
    })),
    part('b', short({
      marks: 1,
      stem: 'What is the genotype of plant B? Give a reason.',
      model: '**Tt**, because about half its offspring (24 of 50) were short.',
      sol: 'A 1 : 1 ratio with tt shows a Tt parent.',
      scheme: [['Tt with reason', 1]],
      d: 3, c: 'analysis', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why crossing a tall plant with a short plant reveals whether the tall plant is TT or Tt.',
      model: 'The short plant (tt) can only give **t**. So each offspring’s phenotype shows the germ cell it got from the tall plant: T gives a tall offspring and t gives a short one. A **TT** plant gives only T, so all offspring are tall; a **Tt** plant gives T and t equally, so about half are short.',
      sol: 'The tt parent "reveals" the other parent’s germ cells.',
      scheme: [['Short parent gives only t', 1], ['Offspring reveal TT (all tall) or Tt (half short)', 1]],
      d: 3, c: 'understanding', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'A manager worries that plant C might still be Tt, since only 51 offspring were checked. Evaluate this worry.',
        model: 'The worry is **very unlikely** to be correct. If C were Tt, each offspring would have a one-in-two chance of being short, so we would expect about 25 short plants out of 51. Getting **none at all** by chance would be extremely unlikely. So C is almost certainly TT, though testing more offspring would make the company even more confident.',
        sol: 'Compare the expected number of short offspring for Tt with the zero observed.',
        scheme: [['Expected about half short if Tt', 1], ['Zero observed, so almost certainly TT', 1]],
        d: 5, c: 'evaluation', t: [2],
      }),
    ]),
  ],
}), () => (frac(cross('Tt', 'tt'), (g) => !showsDominant(g, 0)) === 0.5 && 0.5 ** 51 < 1e-15) || 'testcross');
