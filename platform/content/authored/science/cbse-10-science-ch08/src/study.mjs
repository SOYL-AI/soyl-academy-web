// ch08 notes and flashcards.
import { T, table, flow, unit, PROV } from '../../cbse-10-science-ch06/src/lib.mjs';
import { V, monoPunnett, diPunnett, sexPunnett } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Heredity — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Accumulation of variation',
      `Each generation inherits the basic body design of the previous one, together with **small changes** arising from DNA copying. These variations are passed on and **accumulate**, so a population becomes more diverse over generations.

- **Asexual reproduction:** offspring differ only by the small changes from DNA copying, so variation is **minimal**.
- **Sexual reproduction:** DNA from **two parents** is combined in new ways in every offspring, so it produces **much greater diversity**.

Not all variations are equally useful. Depending on the environment, some variations help individuals survive and reproduce better (for example, heat-tolerant bacteria in water that warms up). The environment **selects** among variations that already exist.`,
      [kt('Heredity', 'The passing of traits from parents to offspring.'), kt('Variation', 'Differences between individuals of the same species.')],
      V.variation,
      [1],
    ),
    sec(
      '2. Inherited traits and the rules of inheritance',
      `Offspring share the basic features of their parents but differ in details. Earlobes, for example, may be **free** or **attached**; both forms are found in human populations.

Rules of inheritance:
- **Both parents contribute equal amounts** of genetic material to the child.
- So for each trait, a child has **two versions** of the gene: one from the father and one from the mother.
- When the two versions differ, the one that shows is **dominant**; the one that is hidden is **recessive**.

The **genotype** is the combination of gene versions (TT, Tt or tt); the **phenotype** is the trait seen (tall or short).`,
      [kt('Dominant trait', 'A trait that is expressed when only one copy of its gene version is present.'), kt('Recessive trait', 'A trait expressed only when both copies are of that version.'), kt('Genotype', 'The gene combination of an organism, e.g. Tt.'), kt('Phenotype', 'The observable trait, e.g. tall.')],
      V.earlobes,
      [2],
    ),
    sec(
      '3. Mendel’s monohybrid cross',
      `Gregor Mendel worked with garden peas, which show clear **contrasting characters** (tall/short plants, round/wrinkled seeds, yellow/green seeds, violet/white flowers and others).

**Cross:** pure tall (TT) × pure short (tt) → $F_1$: all **tall** (Tt), no medium plants.
**$F_1$ self-pollinated:** germ cells T and t in equal numbers → $F_2$: TT : Tt : tt = **1 : 2 : 1** (genotype), **3 tall : 1 short** (phenotype).

Conclusions: a single copy of T is enough to make a plant tall (T is dominant); the short trait was hidden in $F_1$, not lost, and reappeared in $F_2$.`,
      [kt('Monohybrid cross', 'A cross that follows one pair of contrasting characters.'), kt('Punnett square', 'A grid used to combine the germ cells of two parents and predict offspring.')],
      monoPunnett,
      [2],
    ),
    sec(
      '4. Mendel’s dihybrid cross',
      `**Cross:** tall plants with round seeds (TTRR) × short plants with wrinkled seeds (ttrr) → $F_1$: all **tall, round** (TtRr).

$F_1$ plants form four kinds of germ cell — **TR, Tr, tR, tr** — in equal numbers. In $F_2$: **9 tall round : 3 tall wrinkled : 3 short round : 1 short wrinkled**.

Two **new combinations** (tall wrinkled, short round) appear, so the traits for height and seed shape are **inherited independently**. Looking at one character alone still gives 3 : 1 (for example 12 tall : 4 short).`,
      [kt('Dihybrid cross', 'A cross that follows two pairs of contrasting characters at once.'), kt('Independent inheritance', 'Different traits are passed on separately, so they can appear in new combinations.')],
      diPunnett,
      [2],
    ),
    sec(
      '5. How traits are expressed',
      `Cellular **DNA** is the information source for making **proteins**. A section of DNA that provides the information for one protein is a **gene**.

**Plant height:** height depends on the amount of a particular plant **hormone**. The amount of hormone depends on how **efficient** the **enzyme** that makes it is. An efficient enzyme (from gene version T) makes plenty of hormone → **tall** plant. If the gene is altered so that the enzyme is less efficient (version t), less hormone is made → **short** plant. One efficient copy (Tt) is enough for a tall plant, which is why tall is dominant.

So **genes control traits** through the proteins they make.`,
      [kt('Gene', 'A section of DNA that carries the information for making one protein.'), kt('Enzyme', 'A protein that speeds up a particular chemical reaction in the cell.')],
      flow('LR', [['g', 'Gene'], ['e', 'Enzyme'], ['h', 'Hormone'], ['t', 'Height']], [['g', 'e', 'information for'], ['e', 'h', 'makes'], ['h', 't', 'controls']], 'Flow from gene to enzyme to hormone to plant height'),
      [3],
    ),
    sec(
      '6. Chromosomes and germ cells',
      `Genes are carried on **chromosomes**, which are separate, independent pieces of DNA. Each body cell has **two copies of each chromosome**, one from each parent. When germ cells are made, each receives **one chromosome from each pair**, which may be the one from the father or the one from the mother. When two germ cells fuse, the zygote again has two copies of each chromosome.

This explains Mendel’s rules: each parent passes on one version of each gene, and chromosome pairs sort independently, so traits on different chromosomes are inherited independently.`,
      [kt('Chromosome', 'A thread-like structure in the nucleus made of DNA, carrying many genes.')],
      V.pairs,
      [3],
    ),
    sec(
      '7. Sex determination',
      `Different species use different strategies. In some animals, such as many **reptiles**, the **temperature** at which fertilised eggs develop decides whether the young are male or female. In some animals, such as **snails**, individuals can **change sex**. In **humans**, sex is determined **genetically**.

Human body cells have **23 pairs** of chromosomes: **22 pairs of autosomes** (alike in both sexes) and **one pair of sex chromosomes** — **XX** in women and **XY** in men (Y is shorter). Every egg carries an X. Half the sperms carry X and half carry Y. Egg + X sperm → **XX, girl**; egg + Y sperm → **XY, boy**. So the **father’s sperm decides** the sex, and the chance of a boy or a girl is **one half** at each birth.`,
      [kt('Autosomes', 'The 22 pairs of chromosomes that are alike in males and females.'), kt('Sex chromosomes', 'The pair that decides sex: XX in females, XY in males.')],
      V.xy,
      [4],
      [sexPunnett],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing $F_1$ tall plants as TT (they are Tt).
- Calling 3 : 1 the genotype ratio (it is the phenotype ratio; genotypes are 1 : 2 : 1).
- Thinking "dominant" means "more common".
- Leaving out the enzyme and hormone when explaining how a gene controls height.
- Saying the mother decides the sex of the child, or that a boy is "due" after several girls.
- Forgetting that germ cells carry one chromosome of each pair (23 in humans).

**How marks are usually awarded**
- 1-mark items: correct option, term, ratio or number.
- 2–3-mark answers: cross set out with genotypes (1) + Punnett square or germ cells (1) + ratio or conclusion (1).
- 5-mark answers: full cross through $F_2$ with Punnett square (2–3) + ratios (1) + conclusion such as dominance or independent inheritance (1).
- Case-based items: two 1-mark parts from data and a 2-mark explanation or evaluation with an internal choice.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Define heredity.', 'The passing of traits from parents to offspring.', 'definition', 1),
    fc(2, 'Why does sexual reproduction give more variation?', 'It combines DNA from two parents in new ways, besides the small copying changes.', 'concept', 1),
    fc(3, 'Does the environment create variations?', 'No. Variations already exist; the environment decides which ones help survival.', 'concept', 1),
    fc(4, 'How much genetic material does each parent give?', 'Equal amounts: half from the father, half from the mother.', 'fact', 2),
    fc(5, 'Dominant trait?', 'A trait that shows even when only one copy of its gene version is present.', 'definition', 2),
    fc(6, 'Recessive trait?', 'A trait that shows only when both copies are of that version.', 'definition', 2),
    fc(7, 'Genotype vs phenotype?', 'Genotype: the gene combination (TT, Tt, tt). Phenotype: the visible trait (tall, short).', 'definition', 2),
    fc(8, 'Pure tall × pure short: F₁?', 'All tall (Tt).', 'fact', 2),
    fc(9, 'F₂ ratios of a monohybrid cross?', 'Phenotype 3 : 1; genotype 1 : 2 : 1.', 'formula', 2),
    fc(10, 'Germ cells of a Tt plant?', 'T and t, in equal numbers.', 'concept', 2),
    fc(11, 'F₂ ratio of a dihybrid cross?', '9 : 3 : 3 : 1.', 'formula', 2),
    fc(12, 'Germ cells of a TtRr plant?', 'TR, Tr, tR, tr in equal numbers.', 'concept', 2),
    fc(13, 'What do new combinations in a dihybrid F₂ show?', 'Different traits are inherited independently.', 'concept', 2),
    fc(14, 'Tall plant × short plant gives about half short offspring. Genotype of the tall plant?', 'Tt.', 'example', 2),
    fc(15, 'Two contrasting characters Mendel used?', 'Any two: tall/short plant, round/wrinkled seed, yellow/green seed, violet/white flower.', 'example', 2),
    fc(16, 'What is a gene?', 'A section of DNA that carries the information for one protein.', 'definition', 3),
    fc(17, 'How does a gene control plant height?', 'Gene → efficient enzyme → more growth hormone → tall plant (altered gene → less efficient enzyme → short).', 'concept', 3),
    fc(18, 'Why is Tt as tall as TT?', 'One T copy makes enough efficient enzyme to produce plenty of hormone.', 'concept', 3),
    fc(19, 'How many copies of each chromosome in a body cell?', 'Two: one from each parent.', 'fact', 3),
    fc(20, 'What does a germ cell receive?', 'One chromosome of each pair.', 'fact', 3),
    fc(21, 'Number of chromosomes in human body cells and germ cells?', '46 (23 pairs) in body cells; 23 in germ cells.', 'fact', 4),
    fc(22, 'Sex chromosomes of women and men?', 'Women XX; men XY.', 'fact', 4),
    fc(23, 'Who decides the sex of a human child?', 'The father: his sperm carries either X (girl) or Y (boy).', 'concept', 4),
    fc(24, 'Chance of a boy at each birth?', 'One half.', 'fact', 4),
    fc(25, 'How is sex decided in some reptiles?', 'By the temperature at which the fertilised eggs develop.', 'example', 4),
    fc(26, 'Which animals can change sex?', 'Some snails.', 'example', 4),
    fc(27, 'What are autosomes?', 'The 22 pairs of chromosomes that are alike in males and females.', 'definition', 4),
    fc(28, 'Sex chromosomes in an egg and in sperms?', 'Every egg: X. Sperms: half X, half Y.', 'fact', 4),
    fc(29, 'Exam tip: setting out a cross?', 'Parents’ genotypes → germ cells → Punnett square → ratio, stating phenotype or genotype.', 'exam-tip', 2),
    fc(30, 'Exam tip: height and genes?', 'Always write the chain gene → enzyme → hormone → height.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
