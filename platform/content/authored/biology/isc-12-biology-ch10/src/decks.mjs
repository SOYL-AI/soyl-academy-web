// ISC 12 Biology ch10 Mechanism of Evolution and Human Evolution — Part 1 (t01–t03), Part 2 (t04–t05).
import { sl, deck, table, flow, svgV, r } from '../../isc-12-biology-ch01/src/lib.mjs';
import { SELECTION, HWSQ, REPLICA, BOTTLENECK, HOMININ, BEFORE, SURVIVORS, AFTER, RESISTANT, HOMININS } from './svgs.mjs';
import { hwFromRecessive, alleleFreq, pct } from './calc.mjs';

export const V = {
  selection: svgV(SELECTION, 'Stabilising, directional and disruptive selection shown as frequency curves'),
  hw: svgV(HWSQ, 'Hardy–Weinberg square with p equal to 0.7 and q equal to 0.3'),
  replica: svgV(REPLICA, 'Lederberg’s replica plating with a master plate and plates without and with penicillin'),
  bottleneck: svgV(BOTTLENECK, 'Bottleneck effect changing allele frequencies by chance'),
  hominin: svgV(HOMININ, 'Bar chart of approximate brain capacity of six hominids'),
};

// ---------------------------------------------------------------- computed numbers
export const MOTH = { y1850: { dark: 10, n: 500 }, y1920: { dark: 450, n: 500 } };
export const M1 = pct(MOTH.y1850.dark, MOTH.y1850.n), M2 = pct(MOTH.y1920.dark, MOTH.y1920.n);
export const HW1 = hwFromRecessive(0.36);
export const COUNTS = { AA: 360, Aa: 480, aa: 160 };
export const P2 = alleleFreq(COUNTS.AA, COUNTS.Aa, COUNTS.aa);
const N2 = COUNTS.AA + COUNTS.Aa + COUNTS.aa;
const nS = SURVIVORS.A + SURVIVORS.a;

export const deck1 = deck({
  part: 1,
  title: 'Mechanism of Evolution — Part 1: Darwinism, modern synthetic theory and natural selection',
  goals: [
    'State the postulates of Darwinism and Malthus’s influence',
    'Explain examples of natural selection, including industrial melanism and replica plating',
    'Compare Darwinism with de Vries’ mutation theory and the modern synthetic theory',
    'Distinguish founder and bottleneck effects, and the three types of natural selection',
  ],
  slides: [
    sl('title', 'How does evolution happen?', {
      b: 'Part 1 — Darwin’s natural selection, its critics, and the modern synthesis that added genetics.',
      v: flow('LR', [['v', 'Heritable variation'], ['s', 'Struggle for existence'], ['n', 'Natural selection'], ['e', 'Change in populations']], [['v', 's'], ['s', 'n'], ['n', 'e']], 'Flow from variation through struggle and selection to evolutionary change'),
      n: 'Darwin explained evolution by natural selection acting on variation. Genetics later showed where that variation comes from. Together these ideas form the modern explanation of how populations change over generations.',
    }),
    sl('concept', 'Darwinism', {
      b: '**Charles Darwin** (with **Alfred Russel Wallace**) proposed **natural selection** in *On the Origin of Species* (1859). **Thomas Malthus** had argued that populations grow **geometrically** while food grows only **arithmetically**, which led Darwin to the idea of a **struggle for existence**.',
      v: table(['Postulate', 'Meaning'], [['Overproduction', 'Organisms produce far more offspring than can survive'], ['Struggle for existence', 'Competition for limited food, space and mates (within and between species, and with the environment)'], ['Variation', 'No two individuals are alike; many variations are inherited'], ['Natural selection', 'Individuals with useful variations survive and reproduce more (survival of the fittest)'], ['Origin of species', 'Useful variations accumulate over generations, giving new species']], 'Table of the postulates of Darwinism'),
      n: 'Fitness, in Darwin’s sense, means reproductive success: leaving more offspring that survive. Over many generations, the traits of the fitter individuals become more common, and a population slowly changes.',
    }),
    sl('concept', 'Natural selection in action', {
      b: 'Selection can be seen in nature and in human-made environments.',
      v: table(['Example', 'What happened'], [['Industrial melanism (peppered moth, Biston betularia)', 'In industrial England, soot darkened tree trunks; light moths were eaten by birds and dark moths increased'], ['Giraffe’s long neck', 'Darwin: giraffes with longer necks reached more leaves and left more young (not, as Lamarck said, by stretching)'], ['DDT-resistant mosquitoes', 'Spraying killed sensitive insects; rare resistant ones survived and multiplied'], ['Antibiotic-resistant bacteria', 'Antibiotics killed sensitive cells; resistant mutants spread']], 'Table of examples of natural selection'),
      n: 'In each case the environment changed, and individuals that happened to carry a useful variation survived and reproduced. The variation did not appear because it was needed; it was already present and was selected.',
    }),
    sl('example', 'Worked example 1: peppered moths', {
      b: `In a wood near an industrial town, ${MOTH.y1850.dark} of ${MOTH.y1850.n} moths caught in 1850 were dark; in 1920, ${MOTH.y1920.dark} of ${MOTH.y1920.n} were dark. Find each percentage and explain the change.`,
      ul: [
        r`1850: $\dfrac{${MOTH.y1850.dark}}{${MOTH.y1850.n}} \times 100 = ${M1}$ percent dark.`,
        r`1920: $\dfrac{${MOTH.y1920.dark}}{${MOTH.y1920.n}} \times 100 = ${M2}$ percent dark.`,
        'Soot darkened the bark, so **dark moths were camouflaged** and escaped birds: **directional selection**.',
      ],
      v: table(['Year', 'Dark moths', 'Percent'], [['1850', `${MOTH.y1850.dark} of ${MOTH.y1850.n}`, String(M1)], ['1920', `${MOTH.y1920.dark} of ${MOTH.y1920.n}`, String(M2)]], `Worked table: dark moths rose from ${M1} to ${M2} percent`),
      n: 'Dark moths went from a tiny minority to almost all the population in about seventy years. No moth changed its colour; birds simply ate more of the moths that stood out, so the dark form left more offspring.',
    }),
    sl('diagram', 'Lederberg’s replica plating', {
      b: `In **1952**, **Joshua and Esther Lederberg** pressed a master plate of bacteria onto sterile **velvet** and printed the colonies onto plates **without** and **with penicillin**. Only ${RESISTANT} colonies grew on penicillin — at the **same positions** as colonies already on the master plate.`,
      v: V.replica,
      n: 'The resistant bacteria were on the master plate before they had ever met penicillin. So penicillin did not cause the resistance; the mutations arose by chance, and the antibiotic only selected them. This supports Darwin’s idea that variation comes first and selection follows.',
    }),
    sl('concept', 'Criticisms of Darwinism', {
      b: 'Darwin’s theory explained much, but it had gaps that genetics later filled.',
      v: table(['Criticism', 'Later answer'], [['Could not explain the origin of variations', 'Mutation and recombination (genetics)'], ['Did not separate heritable from non-heritable variations', 'Only genetic variations are inherited'], ['Explained survival of the fittest, not arrival of the fittest', 'New alleles arise by mutation'], ['Could not explain vestigial organs and over-specialised organs well', 'Drift and history of selection']], 'Table of criticisms of Darwinism and later answers'),
      n: 'Darwin did not know about genes. He could not say how new variations arise or how they are passed on. Mendel’s work, rediscovered in nineteen hundred, and later the study of mutation, supplied the missing pieces.',
    }),
    sl('check', 'Quick check: replica plating', {
      b: 'What did Lederberg’s replica plating show about penicillin resistance?',
      n: 'Quick check. Were the resistant colonies there before or after penicillin?',
      chk: 'replica-mcq',
    }),
    sl('concept', 'De Vries and the mutation theory', {
      b: '**Hugo de Vries**, working on the **evening primrose** (*Oenothera lamarckiana*), found **sudden, large, heritable changes**, which he called **mutations**. He proposed that new species arise in **single large steps** (**saltation**), not by slow accumulation of small variations.',
      v: table(['Feature', 'Darwin', 'De Vries'], [['Variations', 'Small and continuous', 'Large and sudden (mutations)'], ['Direction', 'Selection gives direction', 'Random, directionless'], ['Speed of speciation', 'Gradual', 'In single steps (saltation)']], 'Table comparing Darwin’s and de Vries’ views'),
      n: 'De Vries was right that mutations are a source of new variation, but most mutations are small, and new species usually form gradually. Modern biology combines both ideas.',
    }),
    sl('concept', 'The modern synthetic theory', {
      b: 'The **modern synthetic theory** (neo-Darwinism) of **Dobzhansky, Fisher, Huxley, Mayr and Stebbins** combines natural selection with genetics. Evolution is a change in **allele frequencies** of a **population**.',
      v: table(['Factor', 'Effect on variation or frequencies'], [['Gene and chromosomal mutation', 'Creates new alleles and gene arrangements'], ['Genetic recombination', 'Crossing over and independent assortment make new combinations'], ['Gene flow (migration)', 'Moves alleles between populations'], ['Genetic drift', 'Random change in allele frequencies, strongest in small populations'], ['Natural selection', 'Favours alleles that raise reproductive success'], ['Reproductive isolation', 'Keeps diverging populations apart as new species']], 'Table of factors in the modern synthetic theory'),
      n: 'Mutation and recombination supply variation, gene flow and drift move allele frequencies around, and natural selection pushes them in useful directions. Isolation then lets populations become separate species.',
    }),
    sl('diagram', 'Genetic drift: the bottleneck effect', {
      b: `**Genetic drift** is a **random** change in allele frequencies, important in **small** populations. In a **bottleneck**, a disaster leaves a few survivors by chance: here ${nS} survivors carry allele A at ${pct(SURVIVORS.A, nS)} percent instead of ${pct(BEFORE.A, 20)} percent.`,
      v: V.bottleneck,
      n: 'The survivors were not fitter; they were simply lucky. The population that grows back from them carries their unusual allele frequencies. The northern elephant seal, once hunted down to a few dozen animals, has very little genetic variation today for this reason.',
    }),
    sl('concept', 'Founder effect and bottleneck effect', {
      b: 'Both are forms of genetic drift, but they begin differently.',
      v: table(['Feature', 'Founder effect', 'Bottleneck effect'], [['Cause', 'A few individuals colonise a new area', 'A disaster sharply reduces a population'], ['Original population', 'Continues elsewhere', 'Itself shrinks'], ['Result', 'New population with frequencies of the founders', 'Recovered population with frequencies of the survivors'], ['Example', 'High frequency of some genetic disorders in small isolated communities', 'Northern elephant seals, cheetahs']], 'Table distinguishing the founder effect from the bottleneck effect'),
      n: 'In the founder effect a small group leaves and starts a new population; in a bottleneck the original population itself is cut down. Either way, chance rather than selection decides which alleles are passed on.',
    }),
    sl('example', 'Worked example 2: frequencies after a bottleneck', {
      b: `A population of 20 alleles has ${BEFORE.A} A and ${BEFORE.a} a. A flood leaves ${nS} alleles: ${SURVIVORS.A} A and ${SURVIVORS.a} a. If the population regrows to 20 alleles with the survivors’ frequencies, how many A alleles are there?`,
      ul: [
        r`Before: $p(A) = \dfrac{${BEFORE.A}}{20} = ${BEFORE.A / 20}$.`,
        r`Survivors: $p(A) = \dfrac{${SURVIVORS.A}}{${nS}} = ${SURVIVORS.A / nS}$.`,
        r`After regrowth: $${SURVIVORS.A / nS} \times 20 = ${AFTER.A}$ A alleles.`,
      ],
      v: table(['Stage', 'A', 'a', 'Frequency of A'], [['Before', String(BEFORE.A), String(BEFORE.a), String(BEFORE.A / 20)], ['Survivors', String(SURVIVORS.A), String(SURVIVORS.a), String(SURVIVORS.A / nS)], ['After regrowth', String(AFTER.A), String(AFTER.a), String(AFTER.A / 20)]], `Worked table: frequency of A falls from ${BEFORE.A / 20} to ${SURVIVORS.A / nS}`),
      n: 'Allele A was the commoner allele before the flood but became rare afterwards, purely by chance. That is why drift can change a small population quickly, even against the direction selection would favour.',
    }),
    sl('concept', 'Variation and its causes', {
      b: 'Natural selection needs **heritable variation**.',
      v: table(['Source', 'Heritable?', 'How it arises'], [['Mutation', 'Yes', 'Changes in genes or chromosomes'], ['Recombination', 'Yes', 'Crossing over and independent assortment in meiosis'], ['Random fertilisation', 'Yes', 'Any sperm may fuse with any egg'], ['Gene flow', 'Yes', 'Migrants bring new alleles'], ['Environment', 'No', 'Effects of food, climate or exercise on the body']], 'Table of sources of variation'),
      n: 'Only variations in the genes are passed on. A body-builder’s muscles are not inherited, but a new allele from a mutation, or a new combination from meiosis, can be.',
    }),
    sl('diagram', 'Three types of natural selection', {
      b: '**Stabilising** selection favours the **average** (human birth weight). **Directional** selection favours **one extreme** (dark peppered moths; antibiotic resistance). **Disruptive** selection favours **both extremes** over the average (birds with small and large beaks where only small and large seeds occur) and can lead to new species.',
      v: V.selection,
      n: 'Look at how the curve changes. In stabilising selection it narrows around the middle. In directional selection it shifts to one side. In disruptive selection the middle falls and two peaks appear.',
    }),
    sl('check', 'Quick check: types of selection', {
      b: 'Human babies of medium birth weight survive best. Which type of selection is this?',
      n: 'Quick check. Is the middle favoured, or one extreme?',
      chk: 'stabilising-mcq',
    }),
    sl('check', 'Quick check: drift', {
      b: 'Judge the assertion and the reason about genetic drift.',
      n: 'Quick check. In which populations is chance most powerful?',
      chk: 'drift-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Darwinism: overproduction, struggle (Malthus), variation, natural selection (survival of the fittest), origin of species.',
        'Examples: industrial melanism, giraffe, DDT and antibiotic resistance; Lederberg’s replica plating shows variation precedes selection.',
        'Criticism: origin and inheritance of variations unexplained. De Vries: mutations, saltation (Oenothera).',
        'Modern synthesis: mutation, recombination, gene flow, genetic drift (founder, bottleneck), natural selection, isolation.',
        'Selection: stabilising (average), directional (one extreme), disruptive (both extremes).',
      ],
      v: table(['Theory', 'Key idea'], [['Darwinism', 'Natural selection of small variations'], ['Mutation theory', 'Large sudden changes'], ['Modern synthesis', 'Change in allele frequencies']], 'Summary table of theories of evolution'),
      n: 'To recap: Darwin explained evolution by natural selection, de Vries emphasised mutation, and the modern synthesis combined selection with genetics. Variation, drift and three types of selection all change allele frequencies.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Explain examples with **variation first, then selection** — never “organisms changed because they needed to”.',
        'Describe **replica plating** with its conclusion.',
        'Distinguish **founder** from **bottleneck** effect with an example each.',
        'Sketch and label the **three selection curves**.',
      ],
      n: 'Exam tips. Always say that variation existed before selection acted. Learn replica plating and what it proved. Keep the founder and bottleneck effects apart. And practise sketching the three selection curves.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Mechanism of Evolution — Part 2: Hardy–Weinberg principle and human evolution',
  goals: [
    'State the Hardy–Weinberg principle and calculate allele and genotype frequencies',
    'List the factors that disturb Hardy–Weinberg equilibrium',
    'Give the features of human ancestors in sequence',
  ],
  slides: [
    sl('title', 'Measuring evolution and tracing our own', {
      b: 'Part 2 — how to tell whether a population is evolving, and the story of human evolution.',
      v: flow('LR', [['h', 'Hardy–Weinberg equilibrium'], ['d', 'Disturbing factors'], ['e', 'Evolution'], ['m', 'Human lineage']], [['h', 'd'], ['d', 'e'], ['e', 'm']], 'Flow from Hardy–Weinberg equilibrium to disturbing factors to evolution to the human lineage'),
      n: 'A population that is not evolving keeps the same allele frequencies generation after generation. Measuring departures from that steady state tells us evolution is happening. We then follow the long line of human ancestors.',
    }),
    sl('concept', 'The Hardy–Weinberg principle', {
      b: 'In a large, randomly mating population with **no mutation, migration, drift or selection**, **allele and genotype frequencies stay constant** from generation to generation. For two alleles with frequencies **p** and **q**: **p + q = 1** and **p² + 2pq + q² = 1**.',
      v: table(['Term', 'Meaning'], [['p', 'Frequency of allele A'], ['q', 'Frequency of allele a'], ['p²', 'Frequency of AA'], ['2pq', 'Frequency of Aa'], ['q²', 'Frequency of aa']], 'Table of Hardy–Weinberg terms'),
      n: 'Godfrey Hardy and Wilhelm Weinberg showed in nineteen hundred and eight that sexual reproduction alone does not change allele frequencies. The sum of all allele frequencies is one, and so is the sum of all genotype frequencies.',
    }),
    sl('diagram', 'The Hardy–Weinberg square', {
      b: 'Random union of gametes is like a Punnett square of the **gene pool**: the areas give the genotype frequencies.',
      v: V.hw,
      n: 'If seven tenths of the gametes carry allele A and three tenths carry a, random fertilisation gives forty nine hundredths A A, forty two hundredths A a and nine hundredths a a. These add up to one.',
    }),
    sl('example', 'Worked example 1: from the recessive phenotype', {
      b: 'In a population of flowers in equilibrium, 36 percent have white petals, a recessive trait. Find the allele frequencies and the frequency of carriers.',
      ul: [
        r`$q^{2} = 0.36$, so $q = \sqrt{0.36} = ${HW1.q}$.`,
        r`$p = 1 - ${HW1.q} = ${HW1.p}$.`,
        r`Carriers $2pq = 2 \times ${HW1.p} \times ${HW1.q} = ${HW1.Aa}$; homozygous dominant $p^{2} = ${HW1.AA}$.`,
      ],
      v: table(['Quantity', 'Value'], [['q', String(HW1.q)], ['p', String(HW1.p)], ['AA (p²)', String(HW1.AA)], ['Aa (2pq)', String(HW1.Aa)], ['aa (q²)', String(HW1.aa)]], `Worked table: carriers ${HW1.Aa}`),
      n: 'Always start from the recessive phenotype, because only the a a plants can be recognised. Its square root gives q, and the rest follows. Here almost half the plants carry the hidden allele.',
    }),
    sl('example', 'Worked example 2: from genotype counts', {
      b: `A sample of ${N2} people has ${COUNTS.AA} AA, ${COUNTS.Aa} Aa and ${COUNTS.aa} aa. Find p, and test whether the population is in equilibrium.`,
      ul: [
        r`$p = \dfrac{2 \times ${COUNTS.AA} + ${COUNTS.Aa}}{2 \times ${N2}} = ${P2}$; $q = ${Math.round((1 - P2) * 10000) / 10000}$.`,
        r`Expected AA $= p^{2} \times ${N2} = ${Math.round(P2 * P2 * N2)}$; observed ${COUNTS.AA}.`,
        'Observed and expected numbers agree, so the population is **in equilibrium**.',
      ],
      v: table(['Genotype', 'Observed', 'Expected'], [['AA', String(COUNTS.AA), String(Math.round(P2 * P2 * N2))], ['Aa', String(COUNTS.Aa), String(Math.round(2 * P2 * (1 - P2) * N2))], ['aa', String(COUNTS.aa), String(Math.round((1 - P2) ** 2 * N2))]], `Worked table: p = ${P2}; observed equals expected`),
      n: 'Count alleles, not people: each homozygous dominant person carries two A alleles and each heterozygote one. Then compare the observed genotype numbers with those the formula predicts.',
    }),
    sl('concept', 'Factors that disturb equilibrium', {
      b: 'Any change in allele frequencies means the population is **evolving**.',
      v: table(['Factor', 'How it disturbs equilibrium'], [['Gene migration (gene flow)', 'Alleles enter or leave with migrants'], ['Genetic drift', 'Chance changes, especially in small populations'], ['Mutation', 'New alleles appear'], ['Genetic recombination', 'New combinations during gamete formation'], ['Natural selection', 'Some genotypes leave more offspring']], 'Table of factors disturbing Hardy–Weinberg equilibrium'),
      n: 'Five factors disturb the equilibrium: gene flow, drift, mutation, recombination and natural selection. Real populations are rarely in perfect equilibrium, which is exactly why they evolve.',
    }),
    sl('check', 'Quick check: Hardy–Weinberg', {
      b: 'If q is 0.2, what is the frequency of heterozygotes?',
      n: 'Quick check. Work out p first, then two times p times q.',
      chk: 'hw-mcq',
    }),
    sl('concept', 'Early human ancestors', {
      b: 'Human evolution began with ape-like forms in the **Miocene**.',
      v: table(['Ancestor', 'When and where', 'Features'], [['Dryopithecus', 'About 15 million years ago; Africa and Europe', 'Ape-like, hairy, walked like gorillas; ate soft fruits and leaves'], ['Ramapithecus', 'About 14 million years ago; India (Shivalik hills) and Africa', 'More man-like; small canines and thick enamel on teeth'], ['Australopithecus', 'About 2 million years ago; East African grasslands', 'Walked upright; brain 450–600 cc; used stones to hunt; ate fruit']], 'Table of early human ancestors and their features'),
      n: 'Dryopithecus was ape-like, while Ramapithecus had teeth more like ours. Australopithecus, the southern ape of the African grasslands, walked upright on two legs but still had a small brain.',
    }),
    sl('concept', 'The genus Homo', {
      b: 'Brain size, tools and culture increased through the genus **Homo**.',
      v: table(['Species', 'Time', 'Brain (cc)', 'Features'], [['Homo habilis', 'About 2 million years ago', '650–800', 'Handy man; first stone tools; probably did not eat meat'], ['Homo erectus', 'About 1.5 million years ago', 'About 900', 'Ate meat; used fire; Java and Peking man'], ['Neanderthal man', '100 000–40 000 years ago', 'About 1400', 'East and central Asia; used hides; buried their dead'], ['Cro-Magnon man', 'About 30 000 years ago', 'About 1650', 'Fully upright; cave paintings'], ['Homo sapiens (modern man)', 'Arose in Africa; spread 75 000–10 000 years ago', '1350–1450', 'Agriculture about 10 000 years ago; settlements and culture']], 'Table of species of Homo with time, brain size and features'),
      n: 'Homo habilis made the first stone tools. Homo erectus used fire and ate meat. Neanderthals buried their dead, and Cro-Magnon people painted caves. Modern humans arose in Africa, spread across the world during the last ice age, and began farming about ten thousand years ago.',
    }),
    sl('diagram', 'Brain size through human evolution', {
      b: 'Brain capacity rose from about **450–600 cc** in Australopithecus to about **1350–1450 cc** in modern humans (values approximate).',
      v: V.hominin,
      n: 'Brain size roughly tripled from the southern apes to modern humans. Cro-Magnon people actually had slightly larger brains than ours on average, so behaviour and culture depend on more than size alone.',
    }),
    sl('check', 'Quick check: human ancestors', {
      b: 'Which human ancestor first used fire?',
      n: 'Quick check. It lived about one and a half million years ago.',
      chk: 'erectus-mcq',
    }),
    sl('check', 'Quick check: disturbing factors', {
      b: 'Judge the assertion and the reason about Hardy–Weinberg equilibrium.',
      n: 'Quick check. Does gene flow add or remove alleles?',
      chk: 'flow-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Hardy–Weinberg: p + q = 1; p² + 2pq + q² = 1; frequencies constant without disturbing factors.',
        'Start problems from q² (recessive phenotype) or from allele counts.',
        'Disturbing factors: gene flow, drift, mutation, recombination, natural selection.',
        'Dryopithecus → Ramapithecus → Australopithecus → Homo habilis → Homo erectus → Neanderthal → Cro-Magnon → Homo sapiens.',
        'Brain capacity rose from about 450–600 cc to about 1350–1450 cc.',
      ],
      v: table(['Ancestor', 'Key feature'], HOMININS.map(([n, lo, hi]) => [n, lo === hi ? `About ${hi} cc` : `${lo}–${hi} cc`]), 'Summary table of hominid brain capacities'),
      n: 'To recap: the Hardy–Weinberg principle describes a population that is not evolving, and five factors disturb it. Human evolution shows a steady rise in brain size, upright posture, tool use and culture.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Write **p + q = 1** and **p² + 2pq + q² = 1** before calculating.',
        'In counts, remember each **heterozygote** has one of each allele.',
        'Give **three features** (time, brain, posture or culture) for each ancestor, **in sequence**.',
        'List the **five factors** that disturb equilibrium.',
      ],
      n: 'Exam tips. Write both equations before you begin. Count alleles carefully. Learn the human ancestors in order, each with three features. And list all five factors that disturb the equilibrium.',
    }),
  ],
});
