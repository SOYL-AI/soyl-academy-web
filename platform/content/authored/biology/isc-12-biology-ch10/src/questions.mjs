// ISC 12 Biology ch10 Mechanism of Evolution and Human Evolution — question bank in ISC style.
// Hardy–Weinberg frequencies, percentages and drift frequencies are computed by calc.mjs. AR keys (ISC options): a b c d.
import { mk, add, svgV, r } from '../../isc-12-biology-ch01/src/lib.mjs';
import { hwFromRecessive, hwFromP, alleleFreq, pct } from './calc.mjs';
import { HOMININ, REPLICA } from './svgs.mjs';

const { mcq, ar, fill, num, short, long, part } = mk;
const brainFig = svgV(HOMININ, 'Bar chart of approximate brain capacity of six hominids');
const replicaFig = svgV(REPLICA, 'Lederberg’s replica plating with master plate and plates without and with penicillin');

// ---------------------------------------------------------------- t01 Darwinism and natural selection
add('replica-mcq', mcq({
  stem: 'In Lederberg’s replica plating, colonies that grew on the penicillin plate matched the positions of colonies on the master plate, which had never met penicillin. What does this show?',
  right: 'Penicillin-resistant mutants were present before exposure; penicillin only selected them.',
  wrong: ['Penicillin caused the bacteria to become resistant.', 'The velvet made the bacteria resistant.', 'All bacteria on the master plate were resistant.'],
  sol: 'Resistance arose by chance mutation before exposure (pre-adaptation) — option (@K).',
  d: 2, c: 'understanding', t: [1],
  assets: [replicaFig],
}));
add('malthus-mcq', mcq({
  stem: 'Which idea of Thomas Malthus influenced Darwin’s concept of the struggle for existence?',
  right: 'Populations tend to grow geometrically while food supply grows only arithmetically.',
  wrong: ['Acquired characters are inherited.', 'New species arise by sudden large mutations.', 'Allele frequencies stay constant in large populations.'],
  sol: 'Malthus’s essay on population — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('melanism-mcq', mcq({
  stem: 'In an unpolluted wood where tree trunks are covered with pale lichens, which form of the peppered moth would you expect to be commoner, and why?',
  right: 'The light form, because it is camouflaged and less often eaten by birds',
  wrong: ['The dark form, because soot protects it', 'The dark form, because it absorbs more heat', 'Both equally, because birds do not eat moths'],
  sol: 'On pale bark the dark form stands out and is selected against — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('lamarck-mcq', mcq({
  stem: 'Which explanation of the long neck of the giraffe is Darwinian rather than Lamarckian?',
  right: 'Giraffes that happened to have longer necks reached more leaves, survived and left more offspring.',
  wrong: ['Giraffes stretched their necks to reach leaves and passed the longer necks on.', 'Long necks appeared because giraffes needed them.', 'Neck length is not inherited at all.'],
  sol: 'Darwin: selection of existing heritable variation; Lamarck: inheritance of acquired characters — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('ddt-mcq', mcq({
  stem: 'After several years of DDT spraying in a village, most mosquitoes are resistant to DDT. Which is the best explanation?',
  right: 'A few mosquitoes already carried resistance alleles; they survived spraying and their offspring increased.',
  wrong: ['DDT caused every mosquito to become resistant.', 'Mosquitoes learned to avoid DDT and taught their young.', 'Resistant mosquitoes migrated in because they needed DDT.'],
  sol: 'Spraying selected pre-existing resistant variants — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('fitness-ar', ar({
  a: 'In Darwinian terms, the fittest individual is the one that leaves the most surviving, fertile offspring.',
  r: 'Darwinian fitness is measured by physical strength and size.',
  key: 'c',
  sol: 'A is true; R is false: fitness means reproductive success, not strength — option (c).',
  d: 3, c: 'analysis', t: [1],
}));
add('spencer-fill', fill({
  stem: 'The phrase “survival of the fittest” was coined by ______.',
  acc: [['Herbert Spencer', 'Spencer']],
  sol: 'Herbert Spencer.',
  d: 1, c: 'recall', t: [1],
}));
add('lamarck-short', short({
  marks: 1,
  stem: 'Give a reason: Lamarck’s explanation of the giraffe’s long neck is not accepted today.',
  model: 'Characters **acquired during life**, such as a stretched neck, are **not inherited**, because they do **not change the genes** in gametes.',
  sol: 'Acquired characters not inherited.',
  scheme: [['Acquired characters not inherited', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('antibiotic-short', short({
  marks: 1,
  stem: 'Give a reason: a patient should complete the full course of an antibiotic even after feeling better.',
  model: 'Stopping early leaves the **least sensitive bacteria** alive; they **multiply**, so the infection returns with **more resistant** bacteria — selection for resistance.',
  sol: 'Survivors selected for resistance.',
  scheme: [['Survivors selected and multiply', 1]],
  d: 3, c: 'application', t: [1],
}));
add('postulates-short', short({
  marks: 2,
  stem: 'State four postulates of Darwin’s theory of natural selection.',
  model: '(i) **Overproduction**: organisms produce more offspring than can survive. (ii) **Struggle for existence** for limited resources. (iii) **Variation**: individuals differ, and many differences are inherited. (iv) **Natural selection**: those with favourable variations **survive and reproduce more**, so over generations **new species** arise.',
  sol: 'Four postulates.',
  scheme: [['Two postulates', 1], ['Two more', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('criticism-short', short({
  marks: 2,
  stem: 'Give two criticisms of Darwinism and state how the modern synthetic theory answers each.',
  model: '(i) Darwin could not explain the **origin of variations** — the modern theory gives **mutation** and **recombination**. (ii) He did not distinguish **heritable** from **non-heritable** variations or explain their **inheritance** — **genetics** shows that only **changes in genes** are passed on.',
  sol: 'Two criticisms with answers.',
  scheme: [['Origin of variation: mutation, recombination', 1], ['Inheritance: genetics', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('replica-short', short({
  marks: 3,
  stem: 'Describe Lederberg’s replica plating experiment and explain how it shows that variation arises before selection.',
  model: 'Bacteria were grown on a **master plate without penicillin**. A pad of sterile **velvet** was pressed on it and then onto a plate **without** and a plate **with penicillin**, keeping colony **positions**. Only a few colonies grew on the penicillin plate, at the **same positions** as colonies on the master plate. These cells had **never met penicillin**, so their **resistance mutations already existed**; penicillin merely **selected** them (**pre-adaptation**).',
  sol: 'Method; result; conclusion.',
  scheme: [['Master plate, velvet, two plates', 1], ['Resistant colonies at same positions', 1], ['Mutations before exposure; selection', 1]],
  d: 3, c: 'application', t: [1],
}));
add('melanism-short', short({
  marks: 3,
  stem: 'Explain industrial melanism in the peppered moth as natural selection, and predict what happens to the dark form after clean-air laws remove soot from the trees.',
  model: 'Before industrialisation, **light moths** were **camouflaged** on pale, lichen-covered bark, and dark moths were rare. **Soot** killed the lichens and **darkened the trunks**, so **birds ate more light moths** and the **dark form**, already present, **increased** — **directional selection**. After **clean-air laws**, bark becomes **pale** again; dark moths are now conspicuous, so their **frequency falls** and light moths increase.',
  sol: 'Selection by birds; reversal.',
  scheme: [['Camouflage and predation explained', 1], ['Dark form increased in soot', 1], ['Prediction: dark form declines', 1]],
  d: 3, c: 'application', t: [1],
}));
add('darwin-long', long({
  stem: '(a) State the main postulates of Darwinism and explain how Malthus influenced Darwin. [2]\n(b) Explain the rise of antibiotic-resistant bacteria in a hospital using natural selection. [2]\n(c) Why are muscles built up by exercise not passed on to children? [1]',
  model: '(a) **Overproduction**, **struggle for existence**, **heritable variation**, **natural selection (survival of the fittest)** and **origin of species** by accumulation of favourable variations. **Malthus** argued that populations grow **geometrically** and food **arithmetically**, which suggested to Darwin a **struggle** in which only some survive.\n\n(b) Among millions of bacteria, a few carry **resistance mutations** by chance. Antibiotics **kill sensitive** bacteria; the **resistant** ones **survive and multiply**, so with repeated use the population becomes mostly resistant — **directional selection**.\n\n(c) They are **acquired, non-heritable** changes in **body cells**; they do **not alter the genes** in **gametes**.',
  sol: 'Postulates; resistance; acquired characters.',
  scheme: [['(a) Postulates', 1], ['(a) Malthus', 1], ['(b) Pre-existing resistant mutants selected', 2], ['(c) Not in genes of gametes', 1]],
  wl: [50, 200],
  d: 3, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 mutation theory, synthesis, drift
add('oenothera-mcq', mcq({
  stem: 'Hugo de Vries based his mutation theory on observations of which plant?',
  right: 'Evening primrose (Oenothera lamarckiana)',
  wrong: ['Garden pea (Pisum sativum)', 'Broad bean (Vicia faba)', 'Snapdragon (Antirrhinum majus)'],
  sol: 'De Vries studied Oenothera lamarckiana — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('saltation-mcq', mcq({
  stem: 'According to de Vries, how do new species arise?',
  right: 'By saltation — single large, sudden mutations',
  wrong: ['By slow accumulation of small continuous variations', 'By use and disuse of organs', 'By inheritance of acquired characters'],
  sol: 'De Vries: large mutations produce new species in single steps — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('founder-mcq', mcq({
  stem: 'A few families settled on a remote island centuries ago. Today a rare inherited disorder is far commoner there than on the mainland, though it gives no advantage. Which is the best explanation?',
  right: 'Founder effect — one of the few founders carried the allele by chance',
  wrong: ['Directional selection favouring the disorder', 'Gene flow from the mainland', 'Stabilising selection removing the allele'],
  sol: 'A small founding group carried an unusual allele frequency, a form of drift — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('seal-mcq', mcq({
  stem: 'Hunting reduced northern elephant seals to a few dozen animals. Their numbers have since recovered to many thousands, but they show very little genetic variation. This is an example of',
  right: 'the bottleneck effect',
  wrong: ['the founder effect', 'disruptive selection', 'gene flow'],
  sol: 'A drastic reduction in size left the survivors’ small sample of alleles — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('synthesis-mcq', mcq({
  stem: 'According to the modern synthetic theory, evolution is best described as',
  right: 'a change in allele frequencies in a population over generations',
  wrong: ['a change in the body of an individual during its life', 'the appearance of new species in a single step', 'the inheritance of characters acquired by use'],
  sol: 'Populations, not individuals, evolve — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('isolation-mcq', mcq({
  stem: 'Two populations of a frog diverge after a river changes course. Which factor finally prevents them from interbreeding and completes speciation?',
  right: 'Reproductive isolation',
  wrong: ['Gene flow', 'Genetic recombination', 'Hardy–Weinberg equilibrium'],
  sol: 'Reproductive isolation keeps the gene pools separate — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('drift-ar', ar({
  a: 'Genetic drift has a much greater effect in small populations than in large ones.',
  r: 'In a small population, chance events can change allele frequencies a lot in a single generation.',
  key: 'a',
  sol: 'Both are true, and the large effect of chance on a small sample explains the assertion — option (a).',
  d: 3, c: 'understanding', t: [2],
}));
add('geneflow-fill', fill({
  stem: 'Movement of alleles from one population into another through migration is called ______.',
  acc: [['gene flow', 'gene migration']],
  sol: 'Gene flow (gene migration).',
  d: 1, c: 'recall', t: [2],
}));
{
  const f = 2 / 8;
  add('bottleneck-num', num({
    stem: 'A beetle population has 40 copies of a gene, 24 of them allele B. A fire leaves survivors carrying 8 copies, of which 2 are B. What is the frequency of B among the survivors? Give a decimal.',
    value: f, tol: 0.001,
    sol: r`Frequency of B $= \dfrac{2}{8} = ${f}$ (it was $\dfrac{24}{40} = 0.6$ before the fire).`,
    scheme: [[`${f}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 0.25 || 'value');
}
add('devries-short', short({
  marks: 2,
  stem: 'Compare Darwin’s variations with de Vries’ mutations with respect to their size and their direction.',
  model: '**Size:** Darwin’s variations are **small and continuous**, accumulating gradually; de Vries’ mutations are **large and sudden** (discontinuous). **Direction:** Darwin’s variations are given direction by **natural selection** over many generations; de Vries’ mutations are **random and directionless**, and may produce a species in **one step (saltation)**.',
  sol: 'Size and direction.',
  scheme: [['Size compared', 1], ['Direction compared', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('foundbottle-short', short({
  marks: 2,
  stem: 'Distinguish between the founder effect and the bottleneck effect, giving one example of each.',
  model: '**Founder effect:** a **few individuals** leave and start a **new population**, which carries their chance allele frequencies — for example, a rare disorder common in a **small isolated community**. **Bottleneck effect:** a **disaster** sharply **reduces** an existing population, and the survivors’ frequencies are passed on — for example, **northern elephant seals**.',
  sol: 'Founders leave vs population shrinks.',
  scheme: [['Founder effect with example', 1], ['Bottleneck effect with example', 1]],
  d: 2, c: 'application', t: [2],
}));
add('synthesis-short', short({
  marks: 3,
  stem: 'Explain how mutation, genetic recombination and gene flow each contribute to evolution according to the modern synthetic theory.',
  model: '**Mutation** creates **new alleles** and new chromosome arrangements — the ultimate source of variation. **Genetic recombination** — crossing over, independent assortment and random fertilisation — **reshuffles** existing alleles into **new combinations** every generation. **Gene flow** moves alleles **between populations** by migration, adding new alleles or changing frequencies. Natural selection then acts on this variation, changing **allele frequencies**.',
  sol: 'Three factors.',
  scheme: [['Mutation: new alleles', 1], ['Recombination: new combinations', 1], ['Gene flow: alleles between populations', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('darwinvs-short', short({
  marks: 3,
  stem: 'Compare Darwinism with the modern synthetic theory under three headings: the source of variation, the unit that evolves, and the factors that change a population.',
  model: '**Source of variation:** Darwin could not explain it; the modern theory gives **mutation and recombination**. **Unit:** Darwin focused on **individuals** surviving; the modern theory treats the **population** and its **gene pool** as the unit, with evolution as a change in **allele frequencies**. **Factors:** Darwin stressed **natural selection** alone; the modern theory adds **gene flow, genetic drift and reproductive isolation**.',
  sol: 'Three headings.',
  scheme: [['Source of variation', 1], ['Unit of evolution', 1], ['Factors', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('synthesis-long', long({
  stem: '(a) Name four factors that bring about evolution according to the modern synthetic theory and state the role of each. [3]\n(b) A small population of lizards is carried to an island on floating logs. Explain two ways in which its allele frequencies may come to differ from those of the mainland population. [2]',
  model: '(a) **Mutation** — new alleles; **recombination** — new combinations in meiosis and fertilisation; **gene flow** — alleles moved between populations; **genetic drift** — random changes in small populations; **natural selection** — favours alleles that raise reproductive success; **reproductive isolation** — keeps diverging populations apart.\n\n(b) **Founder effect:** the few colonists carry only a **chance sample** of mainland alleles, so frequencies differ from the start. **Natural selection:** the island’s **different conditions** (food, predators) favour different alleles, and with **no gene flow** from the mainland, the differences **grow** over generations.',
  sol: 'Factors; founder effect and selection.',
  scheme: [['(a) Four factors with roles', 3], ['(b) Founder effect', 1], ['(b) Different selection, no gene flow', 1]],
  wl: [50, 200],
  d: 3, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 variation and types of selection
add('stabilising-mcq', mcq({
  stem: 'Human babies of medium birth weight survive best, while very light and very heavy babies have lower survival. This is an example of',
  right: 'stabilising selection',
  wrong: ['directional selection', 'disruptive selection', 'genetic drift'],
  sol: 'The average is favoured and both extremes removed — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('disruptive-mcq', mcq({
  stem: 'On an island, only very small and very large seeds are available. Over many generations, finches with medium-sized beaks become rare. This is',
  right: 'disruptive selection',
  wrong: ['stabilising selection', 'directional selection', 'the founder effect'],
  sol: 'Both extremes are favoured over the average — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('directional-mcq', mcq({
  stem: 'A bacterial culture is exposed to gradually rising doses of an antibiotic, and the whole population shifts towards higher resistance. This is',
  right: 'directional selection',
  wrong: ['stabilising selection', 'disruptive selection', 'gene flow'],
  sol: 'One extreme (high resistance) is favoured — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('variation-mcq', mcq({
  stem: 'A farmer’s cows give more milk after he improves their feed, and a calf born to one of them has a rare coat colour caused by a new allele. Which of these can be passed on to the next generation?',
  right: 'Only the coat colour, because it is due to a change in a gene',
  wrong: ['Only the higher milk yield', 'Both, because both appear in the cows', 'Neither, because variation is never inherited'],
  sol: 'Environmental changes are not inherited; genetic ones are — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('curve-ar', ar({
  a: 'Stabilising selection makes the frequency curve of a trait narrower.',
  r: 'Human birth weight is a continuously varying trait.',
  key: 'b',
  sol: 'Both are true, but the narrowing is explained by removal of both extremes, not by birth weight being continuous — option (b).',
  d: 3, c: 'analysis', t: [3],
}));
add('meiosis-fill', fill({
  stem: 'Crossing over and independent assortment of chromosomes during ______ are major sources of heritable variation.',
  acc: [['meiosis']],
  sol: 'Meiosis.',
  d: 1, c: 'recall', t: [3],
}));
add('variation-short', short({
  marks: 2,
  stem: 'Distinguish heritable from non-heritable variation, and give two sources of heritable variation.',
  model: '**Heritable** variations are due to differences in **genes** and are passed to offspring; **non-heritable** variations are produced by the **environment** in body cells (such as exercise or diet) and are **not inherited**. Sources of heritable variation: **mutation** and **recombination** during meiosis (also random fertilisation, gene flow).',
  sol: 'Distinction; two sources.',
  scheme: [['Distinction', 1], ['Two sources', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('selection-short', short({
  marks: 3,
  stem: 'Describe the three types of natural selection, giving an example of each and stating how the frequency curve of the trait changes.',
  model: '**Stabilising** selection favours the **average** and removes extremes; the curve becomes **narrower and taller** — human **birth weight**. **Directional** selection favours **one extreme**; the curve **shifts** that way — **dark peppered moths** or **antibiotic resistance**. **Disruptive** selection favours **both extremes**; the curve develops **two peaks** — finches with small and large beaks where only small and large seeds occur.',
  sol: 'Three types.',
  scheme: [['Stabilising with example and curve', 1], ['Directional with example and curve', 1], ['Disruptive with example and curve', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('selection-long', long({
  stem: '(a) Sketch frequency curves, before and after selection, for stabilising, directional and disruptive selection. [2]\n(b) Classify each case: (i) dark moths in sooty woods; (ii) medium-sized eggs hatching best in a bird; (iii) snails with very dark or very pale shells surviving best on a mixed background. [2]\n(c) Which type of selection can split one population into two species? [1]',
  model: '(a) **Sketches:** stabilising — curve becomes **narrower** around the same mean; directional — whole curve **shifts** to one side; disruptive — middle falls and **two peaks** form at the extremes; each labelled **before** (dashed) and **after**.\n\n(b) (i) **Directional**; (ii) **stabilising**; (iii) **disruptive**.\n\n(c) **Disruptive** selection, since it favours two extreme forms that may become **reproductively isolated**.',
  sol: 'Curves; classification; speciation.',
  scheme: [['(a) Three labelled sketches', 2], ['(b) Three classifications', 2], ['(c) Disruptive', 1]],
  wl: [40, 200],
  d: 3, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 Hardy–Weinberg
{
  const h = hwFromP(0.8);
  add('hw-mcq', mcq({
    stem: 'In a population in Hardy–Weinberg equilibrium, the frequency of the recessive allele q is 0.2. What is the frequency of heterozygotes?',
    right: String(h.Aa),
    wrong: ['0.04', '0.64', '0.16'],
    sol: r`$p = 0.8$; $2pq = 2 \times 0.8 \times 0.2 = ${h.Aa}$ — option (@K).`,
    d: 2, c: 'application', t: [4],
  }), () => h.Aa === 0.32 || 'value');
}
add('hwcond-mcq', mcq({
  stem: 'Which of these would disturb Hardy–Weinberg equilibrium in a large, randomly mating population?',
  right: 'Steady arrival of migrants from a population with different allele frequencies',
  wrong: ['Random mating among all individuals', 'A very large population size', 'Absence of natural selection'],
  sol: 'Gene flow changes allele frequencies; the others are conditions of equilibrium — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('flow-ar', ar({
  a: 'Gene flow can disturb Hardy–Weinberg equilibrium.',
  r: 'Migrants may add alleles to, or remove alleles from, the gene pool of a population.',
  key: 'a',
  sol: 'Both are true, and adding or removing alleles changes frequencies, which is why equilibrium is disturbed — option (a).',
  d: 3, c: 'understanding', t: [4],
}));
add('hwfalse-ar', ar({
  a: 'In the Hardy–Weinberg equation, p² gives the frequency of heterozygotes.',
  r: 'For a gene with two alleles, p + q is always greater than 1.',
  key: 'd',
  sol: 'Both are false: p² is the frequency of AA (2pq is heterozygotes), and p + q = 1 — option (d).',
  d: 2, c: 'understanding', t: [4],
}));
{
  const h = hwFromRecessive(0.0016);
  add('carrier-num', num({
    stem: 'In a large population in equilibrium, 1 person in 625 has an autosomal recessive condition. What is the frequency of carriers (heterozygotes)? Give a decimal.',
    value: h.Aa, tol: 0.0005,
    sol: r`$q^{2} = \dfrac{1}{625} = 0.0016$, $q = 0.04$, $p = 0.96$; $2pq = 2 \times 0.96 \times 0.04 = ${h.Aa}$.`,
    scheme: [[`${h.Aa}`, 1]],
    d: 2, c: 'application', t: [4],
  }), (q) => q.answer.value === 0.0768 || 'value');
}
{
  const p = alleleFreq(640, 320, 40);
  add('count-num', num({
    stem: 'A sample of 1000 plants contains 640 AA, 320 Aa and 40 aa. What is the frequency of allele A? Give a decimal.',
    value: p, tol: 0.001,
    sol: r`$p = \dfrac{2 \times 640 + 320}{2 \times 1000} = \dfrac{1600}{2000} = ${p}$.`,
    scheme: [[`${p}`, 1]],
    d: 3, c: 'application', t: [4],
  }), (q) => q.answer.value === 0.8 || 'value');
}
{
  const h = hwFromP(0.7);
  const n = Math.round(h.Aa * 3000);
  add('hetero-num', num({
    stem: 'In a population of 3000 in Hardy–Weinberg equilibrium, the frequency of allele A is 0.7. How many individuals are expected to be heterozygous?',
    value: n,
    sol: r`$2pq = 2 \times 0.7 \times 0.3 = ${h.Aa}$; number $= ${h.Aa} \times 3000 = ${n}$.`,
    scheme: [[`${n}`, 1]],
    d: 3, c: 'application', t: [4],
  }), (q) => q.answer.value === 1260 || 'value');
}
add('qsq-fill', fill({
  stem: 'In the equation p² + 2pq + q² = 1, the term ______ gives the frequency of homozygous recessive individuals.',
  acc: [['q²', 'q^2', 'q squared']],
  sol: 'q².',
  d: 1, c: 'recall', t: [4],
}));
add('hw-short', short({
  marks: 2,
  stem: 'State the Hardy–Weinberg principle and write its two equations, saying what each term means.',
  model: 'In a **large, randomly mating** population with **no mutation, migration, drift or selection**, **allele and genotype frequencies stay constant**. **p + q = 1** (p, q = frequencies of A and a); **p² + 2pq + q² = 1**, where p² = AA, 2pq = Aa and q² = aa.',
  sol: 'Principle and equations.',
  scheme: [['Principle with conditions', 1], ['Equations with terms', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('hwfactors-short', short({
  marks: 3,
  stem: 'Explain how mutation, genetic drift and natural selection each disturb Hardy–Weinberg equilibrium.',
  model: '**Mutation** changes one allele into another or creates **new alleles**, so allele frequencies shift. **Genetic drift** causes **random** changes in frequencies, especially in **small** populations (founder and bottleneck effects). **Natural selection** lets some genotypes **survive and reproduce more**, so their alleles become **commoner** in the next generation. In each case frequencies change, so the population is **evolving**.',
  sol: 'Three factors.',
  scheme: [['Mutation', 1], ['Drift', 1], ['Selection', 1]],
  d: 2, c: 'understanding', t: [4],
}));
{
  const N = 1000, obs = { AA: 300, Aa: 400, aa: 300 };
  const p = alleleFreq(obs.AA, obs.Aa, obs.aa);
  const exp = hwFromP(p);
  add('hwtest-short', short({
    marks: 3,
    stem: `A sample of ${N} snails contains ${obs.AA} AA, ${obs.Aa} Aa and ${obs.aa} aa. Calculate the allele frequencies, compare observed and expected genotype numbers, and suggest one reason for any difference.`,
    model: `p = (2 × ${obs.AA} + ${obs.Aa}) ÷ ${2 * N} = **${p}**, q = **${Math.round((1 - p) * 1000) / 1000}**. Expected: AA **${Math.round(exp.AA * N)}**, Aa **${Math.round(exp.Aa * N)}**, aa **${Math.round(exp.aa * N)}**. There are **too few heterozygotes** (${obs.Aa} instead of ${Math.round(exp.Aa * N)}), so the population is **not in equilibrium**. A likely reason is **non-random mating** such as **inbreeding**, or **selection against heterozygotes**.`,
    sol: 'p, expected numbers, cause.',
    scheme: [['Allele frequencies', 1], ['Expected numbers and comparison', 1], ['Reason: non-random mating or selection', 1]],
    d: 4, c: 'analysis', t: [4],
  }), () => (p === 0.5 && Math.round(exp.Aa * N) === 500) || 'hwtest');
}
{
  const h = hwFromRecessive(0.01);
  add('hw-long', long({
    stem: '(a) State the Hardy–Weinberg principle. [1]\n(b) In a population in equilibrium, 1 percent of individuals show a recessive phenotype. Calculate p, q and the frequencies of the three genotypes. [3]\n(c) Name one factor that would change these frequencies and explain how. [1]',
    model: `(a) In a **large, randomly mating** population with **no mutation, migration, drift or selection**, **allele and genotype frequencies remain constant** over generations.\n\n(b) $q^{2} = 0.01$, so **q = ${h.q}**; **p = 1 − ${h.q} = ${h.p}**. AA = p² = **${h.AA}**; Aa = 2pq = **${h.Aa}**; aa = q² = **${h.aa}** (total = 1).\n\n(c) **Natural selection** against aa would lower q in each generation (or **gene flow**, **mutation** or **drift** could change frequencies).`,
    sol: 'Principle; frequencies; factor.',
    scheme: [['(a) Principle', 1], ['(b) q and p', 1], ['(b) Three genotype frequencies', 2], ['(c) Factor explained', 1]],
    wl: [40, 200],
    d: 3, c: 'application', t: [4],
  }), () => (h.q === 0.1 && h.AA === 0.81 && h.Aa === 0.18) || 'hw');
}

// ---------------------------------------------------------------- t05 human evolution
add('erectus-mcq', mcq({
  stem: 'Which human ancestor, living about 1.5 million years ago with a brain of about 900 cc, is believed to have first used fire?',
  right: 'Homo erectus',
  wrong: ['Homo habilis', 'Australopithecus', 'Ramapithecus'],
  sol: 'Homo erectus ate meat and used fire — option (@K).',
  d: 2, c: 'recall', t: [5],
}));
add('ramapithecus-mcq', mcq({
  stem: 'Which early hominoid, known from fossils in the Shivalik hills, had small canines and thick tooth enamel like humans?',
  right: 'Ramapithecus',
  wrong: ['Dryopithecus', 'Neanderthal man', 'Cro-Magnon man'],
  sol: 'Ramapithecus was more man-like in its teeth — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('habilis-mcq', mcq({
  stem: 'Homo habilis is called the “handy man” because it',
  right: 'was the first to make stone tools',
  wrong: ['was the first to use fire', 'buried its dead', 'made cave paintings'],
  sol: 'Habilis means handy; it made the earliest stone tools — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('neanderthal-mcq', mcq({
  stem: 'Which human ancestor of east and central Asia had a brain of about 1400 cc, used hides to protect its body and buried its dead?',
  right: 'Neanderthal man',
  wrong: ['Homo erectus', 'Homo habilis', 'Australopithecus'],
  sol: 'Neanderthals lived about 100 000–40 000 years ago and buried their dead — option (@K).',
  d: 2, c: 'recall', t: [5],
}));
add('brain-mcq', mcq({
  stem: 'According to the bar chart of brain capacity, which hominid had the largest average brain?',
  right: 'Cro-Magnon man',
  wrong: ['Modern man', 'Neanderthal man', 'Homo erectus'],
  sol: 'Cro-Magnon about 1650 cc, above modern man’s 1350–1450 cc — option (@K).',
  d: 2, c: 'application', t: [5],
  assets: [brainFig],
}));
add('sequence-mcq', mcq({
  stem: 'Which sequence shows human ancestors from the oldest to the most recent?',
  right: 'Dryopithecus → Ramapithecus → Australopithecus → Homo habilis → Homo erectus',
  wrong: ['Ramapithecus → Dryopithecus → Homo habilis → Australopithecus → Homo erectus', 'Australopithecus → Dryopithecus → Ramapithecus → Homo erectus → Homo habilis', 'Homo habilis → Homo erectus → Australopithecus → Ramapithecus → Dryopithecus'],
  sol: 'Miocene apes first, then Australopithecus, then the genus Homo — option (@K).',
  d: 3, c: 'understanding', t: [5],
}));
add('australo-ar', ar({
  a: 'Australopithecus walked upright on two legs.',
  r: 'Australopithecus had a brain capacity of about 1400 cc.',
  key: 'c',
  sol: 'A is true; R is false: its brain was only about 450–600 cc (1400 cc is Neanderthal) — option (c).',
  d: 3, c: 'understanding', t: [5],
}));
{
  const ratio = Math.round((1650 / 500) * 10) / 10;
  add('brain-num', num({
    stem: 'Taking the average brain capacity of Australopithecus as 500 cc and of Cro-Magnon man as 1650 cc, by what factor did brain capacity increase? (One decimal place.)',
    value: ratio, tol: 0.05,
    sol: r`Factor $= \dfrac{1650}{500} = ${ratio}$.`,
    scheme: [[`${ratio}`, 1]],
    d: 2, c: 'application', t: [5],
  }), (q) => q.answer.value === 3.3 || 'value');
}
add('ancestors-short', short({
  marks: 2,
  stem: 'Give two distinguishing features each of Homo habilis and Homo erectus.',
  model: '**Homo habilis** (about 2 million years ago): brain **650–800 cc**; made the **first stone tools** (“handy man”); probably **did not eat meat**. **Homo erectus** (about 1.5 million years ago): brain about **900 cc**; **ate meat** and **used fire**; includes **Java and Peking man**.',
  sol: 'Two features each.',
  scheme: [['Homo habilis', 1], ['Homo erectus', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('sapiens-short', short({
  marks: 2,
  stem: 'Where did modern Homo sapiens arise, during which period did it spread widely, and when did agriculture and settlements begin?',
  model: 'Modern **Homo sapiens** arose in **Africa** and spread across the continents, especially during the **ice age between about 75 000 and 10 000 years ago**. **Agriculture** and **human settlements** began about **10 000 years ago**; pre-historic **cave art** dates from about 18 000 years ago.',
  sol: 'Africa; ice age; 10 000 years.',
  scheme: [['Africa and spread in ice age', 1], ['Agriculture about 10 000 years ago', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('human-short', short({
  marks: 3,
  stem: 'Arrange Neanderthal man, Australopithecus and Cro-Magnon man in order of appearance, and give one feature of brain size and one of behaviour for each.',
  model: '**Australopithecus** (about 2 million years ago): brain **450–600 cc**; walked **upright** and hunted with **stone weapons**. **Neanderthal man** (100 000–40 000 years ago): brain about **1400 cc**; used **hides** and **buried the dead**. **Cro-Magnon man** (about 30 000 years ago): brain about **1650 cc**; made **cave paintings** and fine tools.',
  sol: 'Order with features.',
  scheme: [['Australopithecus', 1], ['Neanderthal man', 1], ['Cro-Magnon man', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('human-long', long({
  stem: '(a) Arrange in sequence: Homo erectus, Dryopithecus, Cro-Magnon man, Australopithecus, Homo habilis, Ramapithecus, Neanderthal man, Homo sapiens. [2]\n(b) Give three features each of Australopithecus and Neanderthal man. [2]\n(c) A fossil skull of about 900 cc is found with charcoal from hearths. To which ancestor does it most likely belong? Give a reason. [1]',
  model: '(a) **Dryopithecus → Ramapithecus → Australopithecus → Homo habilis → Homo erectus → Neanderthal man → Cro-Magnon man → Homo sapiens**.\n\n(b) **Australopithecus:** lived about **2 million years ago** in **East African grasslands**; walked **upright**; brain **450–600 cc**. **Neanderthal man:** **100 000–40 000 years ago** in **east and central Asia**; brain about **1400 cc**; used **hides** and **buried the dead**.\n\n(c) **Homo erectus**: its brain was about **900 cc** and it is thought to have been the first to **use fire**.',
  sol: 'Sequence; features; identification.',
  scheme: [['(a) Correct sequence', 2], ['(b) Australopithecus', 1], ['(b) Neanderthal man', 1], ['(c) Homo erectus with reason', 1]],
  wl: [50, 200],
  d: 3, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- stimulus-based
{
  const D = { polluted: { dark: 368, n: 400 }, clean: { dark: 24, n: 400 } };
  const pp = pct(D.polluted.dark, D.polluted.n), pc = pct(D.clean.dark, D.clean.n);
  add('moth-case', mk.case({
    passage: `Students released marked peppered moths of both forms in two woods and recaptured them a week later.\n\n| Wood | Bark | Dark moths among recaptures | Total recaptured |\n|---|---|---|---|\n| P (near a factory) | Blackened by soot | ${D.polluted.dark} | ${D.polluted.n} |\n| Q (rural) | Pale, with lichens | ${D.clean.dark} | ${D.clean.n} |`,
    d: 3, c: 'analysis',
    children: [
      part('a', num({
        stem: 'What percentage of the moths recaptured in wood P were dark?',
        value: pp, unit: '%',
        sol: r`$\dfrac{${D.polluted.dark}}{${D.polluted.n}} \times 100 = ${pp}$ percent.`,
        scheme: [[`${pp}`, 1]],
        d: 2, c: 'application', t: [1],
      })),
      part('b', mcq({
        stem: `Only ${pc} percent of the recaptures in wood Q were dark. Which agent of selection best explains the difference between the woods?`,
        right: 'Birds eating the moths that are more visible against the bark',
        wrong: ['Soot changing the colour of the moths', 'Moths choosing to become dark in polluted air', 'Mutation occurring only in wood P'],
        sol: 'Predators remove conspicuous moths: directional selection in each wood — option (@K).',
        d: 3, c: 'analysis', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'Name the type of natural selection shown in wood P and explain why the light form has not disappeared completely.',
        model: '**Directional selection** in favour of the dark form. The light allele survives because some light moths **escape predators** by chance, and **heterozygotes** may carry it hidden; **migrants** from cleaner areas also bring it back (gene flow).',
        sol: 'Directional; survival of light allele.',
        scheme: [['Directional selection', 1], ['Reason light form persists', 1]],
        d: 3, c: 'analysis', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'Why did the students mark the moths and release equal numbers of both forms?',
          model: 'So that recaptures could be **compared fairly**: with **equal numbers released**, any difference in recapture shows **different survival** of the two forms in each wood, not different starting numbers.',
          sol: 'Fair comparison of survival.',
          scheme: [['Equal starting numbers', 1], ['Difference shows survival', 1]],
          d: 3, c: 'analysis', t: [1],
        }),
      ]),
    ],
  }), (q) => q.children[0].answer.value === 92 || 'value');
}
{
  const obs = { MM: 320, MN: 480, NN: 200 };
  const N = obs.MM + obs.MN + obs.NN;
  const p = alleleFreq(obs.MM, obs.MN, obs.NN);
  const expMN = Math.round(2 * p * (1 - p) * N);
  add('mn-case', mk.case({
    passage: `The MN blood groups are controlled by two codominant alleles, M and N, so every genotype can be recognised. A survey of ${N} people in a town gave:\n\n| Blood group (genotype) | MM | MN | NN |\n|---|---|---|---|\n| Number of people | ${obs.MM} | ${obs.MN} | ${obs.NN} |`,
    d: 3, c: 'analysis',
    children: [
      part('a', num({
        stem: 'Calculate the frequency of allele M. Give a decimal.',
        value: p, tol: 0.001,
        sol: r`$p = \dfrac{2 \times ${obs.MM} + ${obs.MN}}{2 \times ${N}} = ${p}$.`,
        scheme: [[`${p}`, 1]],
        d: 2, c: 'application', t: [4],
      })),
      part('b', mcq({
        stem: `The expected number of MN people in equilibrium is about ${expMN}. What do you conclude?`,
        right: 'Observed and expected numbers are close, so the population is approximately in equilibrium.',
        wrong: ['The population is evolving rapidly because the numbers are not identical.', 'Allele N must be lethal.', 'Hardy–Weinberg cannot be applied to blood groups.'],
        sol: `${obs.MN} observed vs about ${expMN} expected: a small difference, consistent with equilibrium — option (@K).`,
        d: 3, c: 'analysis', t: [4],
      })),
      part('c', short({
        marks: 2,
        stem: 'Why is a codominant trait such as the MN blood group especially convenient for testing Hardy–Weinberg equilibrium?',
        model: 'With **codominance**, **heterozygotes** have a **distinct phenotype**, so **all three genotypes can be counted directly**. Allele frequencies can be found **from counts** without assuming equilibrium, and then tested against it.',
        sol: 'All genotypes visible.',
        scheme: [['Heterozygotes recognisable', 1], ['Frequencies from counts, then test', 1]],
        d: 3, c: 'analysis', t: [4],
      }), [
        short({
          marks: 2,
          stem: 'If many people with blood group NN moved into the town, how would the frequency of allele M change, and what is this factor called?',
          model: 'The frequency of **M** would **fall** (and N rise), because migrants **add N alleles** to the gene pool. This factor is **gene flow** (gene migration), which disturbs equilibrium.',
          sol: 'M falls; gene flow.',
          scheme: [['M decreases', 1], ['Gene flow', 1]],
          d: 2, c: 'application', t: [4],
        }),
      ]),
    ],
  }), (q) => q.children[0].answer.value === 0.56 || 'value');
}
