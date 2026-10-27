// ch15 Evolution — question bank (formative-only chapter: weighted to understanding, activities and data).
// AR keys planned: a d b a c b d.
import { mk, add, r } from '../../cbse-10-science-ch06/src/lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const near = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol;
// Independent helpers for the re-solve checks.
const survivorsShare = (a, b, eatA, eatB) => (b * (1 - eatB)) / (a * (1 - eatA) + b * (1 - eatB));
const halfLives = (fractionLeft) => Math.log2(1 / fractionLeft);
const C14 = 5730;

// ---------------------------------------------------------------- t01 acquired and inherited traits
add('acq-def-mcq', mcq({
  stem: 'Which of these is an acquired trait?',
  right: 'Strong arm muscles that a weightlifter has built by years of training',
  wrong: ['Blood group O', 'Brown eye colour present from birth', 'Naturally curly hair'],
  sol: 'Muscles built by training develop during life and do not change the DNA of germ cells — option (@K). The others come from DNA received from the parents.',
  d: 1, c: 'understanding', t: [1],
}));
add('inherited-mcq', mcq({
  stem: 'For a change in an organism to be passed on to its offspring, the change must be present in:',
  right: 'the DNA of its germ cells',
  wrong: ['its muscles', 'its skin', 'its brain, as a learnt skill'],
  sol: 'Offspring develop from germ cells, so only changes in germ-cell DNA can be inherited — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('why-not-mcq', mcq({
  stem: 'A potter gets a burn scar on her hand. Why will her children not be born with the scar?',
  right: 'The burn changed only her skin, not the DNA in her germ cells.',
  wrong: ['Scars fade away before children are born.', 'Only the father’s traits are passed on to children.', 'The scar is passed on, but it appears only in grandchildren.'],
  sol: 'A scar is an acquired change in body tissue. The DNA in her egg cells is unchanged, so it cannot pass to her children — option (@K). Both parents pass on traits (@2).',
  d: 2, c: 'understanding', t: [1],
}));
add('mice-mcq', mcq({
  stem: 'In a nineteenth-century experiment, the tails of mice were cut off in every generation, yet every new generation was born with normal tails. What does this show?',
  right: 'Changes made to the body during an individual’s life are not passed on to its offspring.',
  wrong: ['Mice can regrow their tails after they are cut.', 'Tail length in mice is not controlled by genes.', 'The experiment needed more generations before short tails appeared.'],
  sol: 'Step 1 — Cutting the tail changed only the body of each mouse.\n\nStep 2 — The DNA in the germ cells was unchanged, so the young developed normal tails. Acquired changes are not inherited — option (@K). Cutting for more generations (@3) would not change germ-cell DNA either.',
  d: 4, c: 'analysis', t: [1],
}));
add('acq-ar', ar({
  a: 'The children of a farmer who has developed strong muscles from years of ploughing will not inherit those muscles.',
  r: 'Changes in body tissues during life do not change the DNA of the germ cells.',
  key: 'a',
  sol: 'Both are true, and R explains A: the strong muscles are an acquired trait that leaves germ-cell DNA unchanged — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('acquired-tf', tf({
  stem: 'A rat that has learnt to find its way through a maze will pass this skill to its pups through its genes.',
  key: 'f',
  sol: 'False. Learning changes the rat’s brain during its life, not the DNA of its germ cells, so the skill is an acquired trait and is not inherited.',
  d: 2, c: 'understanding', t: [1],
}));
add('acquired-fill', fill({
  stem: 'A trait that develops in an individual during its lifetime and is not passed on through its DNA is called an ___ trait.',
  acc: [['acquired']],
  sol: 'It is an **acquired** trait.',
  d: 1, c: 'recall', t: [1],
}));
add('tails-num', num({
  stem: 'A dog breeder trims the tails of all 30 puppies in a litter. When these dogs grow up and have 40 puppies of their own, how many of the new puppies are expected to be born with trimmed (short) tails because of the trimming?',
  value: 0, tol: 0, unit: null,
  sol: 'Trimming is an acquired change to the body; it does not change germ-cell DNA, so 0 puppies are born with short tails because of it.',
  scheme: [['0, with the reason that acquired traits are not inherited', 1]],
  d: 3, c: 'application', t: [1],
}), (q) => near(q.answer.value, 0) || 'acquired');
add('acquired-short', short({
  marks: 2,
  stem: 'Distinguish between acquired and inherited traits, giving one example of each.',
  model: 'An **acquired trait** develops during an individual’s life through use, training, injury or surroundings and is **not** passed on, because it does not change germ-cell DNA; for example, a scar. An **inherited trait** is coded in the **DNA** received from the parents and **can** be passed on; for example, blood group.',
  sol: 'Contrast origin and inheritance, with one example of each.',
  scheme: [['Acquired: develops in life, not inherited, with example', 1], ['Inherited: from DNA, passed on, with example', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('soil-short', short({
  marks: 3,
  stem: 'Two pea plants of the same tall variety are grown, one in poor, dry soil and one in rich soil. The first grows short and the second tall. Seeds from the short plant are sown in rich soil and grow into tall plants.\n\n(a) Is the shortness of the first plant acquired or inherited?\n\n(b) Explain the result with the seeds.\n\n(c) Why would this shortness not contribute to evolution?',
  model: '(a) **Acquired**: it was caused by the poor soil during the plant’s life.\n\n(b) The poor soil changed the plant’s **growth**, not the **DNA** of its germ cells. The seeds carried the genes for tallness, so in rich soil they grew tall.\n\n(c) Evolution works on **inherited** variations. Since the shortness was not passed on through DNA, it cannot be selected and spread through later generations.',
  sol: 'Identify the trait as acquired, link to unchanged germ-cell DNA, and connect evolution to inherited variation.',
  scheme: [['(a) Acquired', 1], ['(b) Germ-cell DNA unchanged, so offspring tall', 1], ['(c) Evolution needs inherited variation', 1]],
  d: 3, c: 'application', t: [1],
}));
add('acquired-long', long({
  stem: '(a) Define acquired and inherited traits, with two examples of each.\n\n(b) Explain why acquired traits are not passed on to the next generation.\n\n(c) Explain why only inherited variations can lead to evolution.',
  model: '(a) **Acquired traits** develop during life through use, training, injury or surroundings: muscles built by exercise, a language learnt. **Inherited traits** are coded in the DNA received from the parents: blood group, natural eye colour.\n\n(b) Offspring develop from **germ cells**. Acquired traits change only **body tissues** such as muscle, skin or brain, and leave germ-cell DNA unchanged, so offspring do not receive them. Mice whose tails were cut for several generations still had young with normal tails.\n\n(c) Evolution is a change in the inherited characteristics of a population. Selection can spread a variation only if survivors **pass it on**, which needs it to be in germ-cell **DNA**. An acquired trait ends with the individual, so it cannot build up over generations.',
  sol: 'Step 1 — Define both with examples.\n\nStep 2 — Germ cells carry DNA; body changes do not reach them.\n\nStep 3 — Selection needs heritable variation.',
  scheme: [['(a) Definitions with two examples each', 2], ['(b) Germ-cell DNA unchanged, with evidence', 1.5], ['(c) Evolution needs heritable variation', 1.5]],
  d: 3, c: 'understanding', t: [1, 2],
}));

// ---------------------------------------------------------------- t02 natural selection, drift and speciation
add('selection-mcq', mcq({
  stem: 'A volcanic eruption covered the pale sand of an island beach with dark ash. Birds hunt the beach snails by sight. Over many generations, dark-shelled snails became more common than pale-shelled ones. Which explanation is correct?',
  right: 'Birds found pale snails more easily on the dark ash, so dark snails survived, bred more and passed on their shell colour.',
  wrong: ['The ash stained the snails’ shells dark, and the stain was passed to their young.', 'The snails darkened their shells on purpose to hide from birds.', 'The eruption created dark-shelled snails from the ash.'],
  sol: 'Step 1 — Shell colour already varied in the population.\n\nStep 2 — On dark ash, pale snails were easier to see, so birds ate more of them; dark snails survived and reproduced more, passing on their colour: natural selection — option (@K). A stain (@1) or a change made on purpose (@2) does not change germ-cell DNA.',
  d: 3, c: 'application', t: [2],
}));
add('need-mcq', mcq({
  stem: 'A student writes: "Giraffes got long necks because their ancestors stretched to reach high leaves and passed the stretched necks to their young." What is the main error?',
  right: 'Stretching is an acquired change; only inherited variations in neck length could be selected and passed on.',
  wrong: ['Giraffes never eat leaves from tall trees.', 'Neck length in giraffes is not affected by any genes.', 'The error is only in the timescale; stretching works over millions of years.'],
  sol: 'Step 1 — Stretching changes the body, not germ-cell DNA, so it cannot be inherited.\n\nStep 2 — The scientific explanation: giraffes varied in inherited neck length; those with longer necks reached more food, survived and bred more, so long necks became common — option (@K).',
  d: 4, c: 'analysis', t: [1, 2],
}));
add('drift-example-mcq', mcq({
  stem: 'A small island had 20 lizards, half striped and half plain. A landslide killed 16 of them at random. By chance, 3 of the 4 survivors were striped, and most of their young were striped. This change is an example of:',
  right: 'genetic drift',
  wrong: ['natural selection favouring stripes', 'inheritance of an acquired trait', 'artificial selection'],
  sol: 'Survival was decided by chance, not by any advantage of stripes, and the population was small: genetic drift — option (@K). Selection (@1) needs a variation that helps survival.',
  d: 3, c: 'application', t: [2],
}), () => near(3 / 4, 0.75) || 'drift');
add('gene-flow-mcq', mcq({
  stem: 'Which event is most likely to stop gene flow between two parts of a population of land snails?',
  right: 'A river changing its course and flowing through the middle of their habitat',
  wrong: ['A rainy season that makes the snails more active', 'A rise in the number of snails in the area', 'A new kind of plant growing all over their habitat'],
  sol: 'Land snails cannot cross a river, so the two parts can no longer meet and interbreed: gene flow stops — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('isolation-mcq', mcq({
  stem: 'Many species found on islands far from the mainland are found nowhere else. The best explanation is that:',
  right: 'island populations are cut off from mainland populations, so they change separately until they become new species',
  wrong: ['islands receive new species carried by wind every year', 'animals on islands choose to become different from mainland animals', 'island soil changes the DNA of the organisms living on it'],
  sol: 'The sea stops gene flow. Drift and selection then change the island population independently, and over time it becomes a separate species — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('repro-mcq', mcq({
  stem: 'Two groups of crickets live in the same field. One group sings and breeds in early spring, the other in late summer, so they never mate. What can you conclude?',
  right: 'They are reproductively isolated, so they behave as separate species even without a physical barrier.',
  wrong: ['They are one species, because they live in the same field.', 'They will soon merge into one group, because they share food.', 'They differ only in acquired traits, so nothing will change.'],
  sol: 'Step 1 — A species is defined by interbreeding.\n\nStep 2 — Different breeding seasons stop all gene flow, which is reproductive isolation; the groups now behave as separate species — option (@K). Living in one place (@1) does not decide it.',
  d: 4, c: 'analysis', t: [2],
}));
add('antibiotic-mcq', mcq({
  stem: 'In a hospital where one antibiotic is used heavily, bacteria that resist it become common within a few years. Why?',
  right: 'A few bacteria already had a variation that let them survive the antibiotic; they multiplied while the others were killed.',
  wrong: ['The antibiotic taught the bacteria how to resist it.', 'Every bacterium changed its DNA on purpose to survive.', 'Antibiotics make bacteria grow faster in hospitals.'],
  sol: 'Natural selection acts on variation that is already present. The antibiotic killed the sensitive bacteria; the resistant few reproduced rapidly, so resistance spread — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('need-ar', ar({
  a: 'Giraffes developed long necks because each generation stretched its neck to reach leaves and passed the stretch on.',
  r: 'Neck length varied among giraffes, and this variation was partly inherited.',
  key: 'd',
  sol: 'A is false: stretching is an acquired change and is not inherited. R is true: inherited variation in neck length is what natural selection acted on — option (d).',
  d: 3, c: 'analysis', t: [1, 2],
}));
add('drift-ar', ar({
  a: 'Genetic drift has a much larger effect in small populations than in large ones.',
  r: 'Natural selection favours variations that help organisms survive and reproduce.',
  key: 'b',
  sol: 'Both are true, but R describes natural selection; it does not explain why chance events change small populations more — option (b).',
  d: 3, c: 'understanding', t: [2],
}));
add('isolation-ar', ar({
  a: 'Geographical isolation can lead to the formation of new species.',
  r: 'Isolated populations cannot exchange genes, so differences build up between them.',
  key: 'a',
  sol: 'Both are true, and R explains A: with no gene flow, drift and selection make the separated populations more and more different — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('species-tf', tf({
  stem: 'Members of two different species can usually interbreed and produce fertile offspring.',
  key: 'f',
  sol: 'False. Being unable to interbreed and produce fertile offspring is what separates two species; horses and donkeys, for example, produce mules that are usually sterile.',
  d: 2, c: 'understanding', t: [2],
}));
add('drift-fill', fill({
  stem: 'Random changes in how common a variation is in a small population, caused by chance events rather than by any advantage, are called genetic ___.',
  acc: [['drift']],
  sol: 'This is genetic **drift**.',
  d: 1, c: 'recall', t: [2],
}));
add('terms-match', match({
  stem: 'Match each term in Column A with its description in Column B.',
  pairs: [['Acquired trait', 'Gained during life; not in germ-cell DNA'], ['Natural selection', 'Better-suited variants survive and reproduce more'], ['Genetic drift', 'Chance change in a variant’s frequency in a small population'], ['Gene flow', 'Mixing of genes between groups by interbreeding']],
  order: [3, 0, 2, 1],
  sol: 'Acquired trait → gained during life (1 → s); natural selection → better-suited variants reproduce more (2 → p); genetic drift → chance change in a small population (3 → r); gene flow → mixing of genes by interbreeding (4 → q).',
  d: 2, c: 'understanding', t: [1, 2],
}));
add('selection-num', num({
  stem: 'A population has 200 green and 200 brown grasshoppers on dry brown grass. In one season, birds eat 60% of the green ones and 20% of the brown ones. What percentage of the survivors are brown? Give your answer to one decimal place.',
  value: 66.7, tol: 0.05, unit: '%',
  sol: r`Green survivors: $200 - 120 = 80$. Brown survivors: $200 - 40 = 160$. Brown share: $\dfrac{160 \times 100}{240} = \dfrac{200}{3} \approx 66.7\%$, up from 50%.`,
  scheme: [['Survivors 80 and 160', 0.5], ['66.7%', 0.5]],
  d: 3, c: 'application', t: [2],
}), (q) => near(Math.round(survivorsShare(200, 200, 0.6, 0.2) * 1000) / 10, q.answer.value) || 'share');
add('factors-short', short({
  marks: 2,
  stem: 'List four factors that can lead to the formation of a new species.',
  model: '(1) **Geographical isolation**, which stops gene flow; (2) **genetic drift** in the separated groups; (3) **natural selection** in their different surroundings; (4) changes in **DNA or chromosomes** (or in mating behaviour) that prevent the groups from interbreeding.',
  sol: 'Name isolation, drift, selection and reproductive isolation.',
  scheme: [['Any two factors', 1], ['Two more factors', 1]],
  d: 1, c: 'recall', t: [2],
  wl: null,
}));
add('drift-selection-short', short({
  marks: 2,
  stem: 'Classify each change as natural selection or genetic drift, giving a reason.\n\n(a) A flash flood drowns most of a small population of beetles at random; the few survivors happen to be mostly red, and so are their young.\n\n(b) In an industrial town, tree trunks became dark with soot; dark moths resting on them were eaten less by birds and became common.',
  model: '(a) **Genetic drift.** Survival was decided by **chance**, not by any advantage of red colour, and the population was **small**.\n\n(b) **Natural selection.** Dark moths were **harder for birds to see** on dark trunks, so they survived and reproduced more; the change gave an **advantage**.',
  sol: 'Ask whether the change gave a survival advantage (selection) or happened by chance (drift).',
  scheme: [['(a) Drift: chance, small population', 1], ['(b) Selection: survival advantage', 1]],
  d: 3, c: 'application', t: [2],
  wl: null,
}));
add('speciation-short', short({
  marks: 3,
  stem: 'Over a very long time, a river cuts a deep gorge through a forest where a single population of squirrels lives. The squirrels cannot cross the gorge. The forest on the north side becomes cooler and wetter than the south side. Predict, step by step, how two species of squirrel could arise, and state what test would show that they are separate species.',
  model: 'The gorge **stops gene flow** between the northern and southern squirrels. On each side, **genetic drift** changes the populations by chance, and **natural selection** favours different variations: for example thicker fur in the cooler north. Over many generations, differences in **DNA** and behaviour build up. **Test:** if squirrels from the two sides are brought together and **cannot interbreed** or produce fertile young, they are separate species.',
  sol: 'Barrier → no gene flow → drift and different selection → reproductive isolation; the interbreeding test.',
  scheme: [['Gorge stops gene flow', 1], ['Drift and different selection on each side', 1], ['Interbreeding test for separate species', 1]],
  d: 3, c: 'application', t: [2],
}));
add('speciation-long', long({
  stem: '(a) What is a species?\n\n(b) Explain how a population can split into two species. Mention gene flow, genetic drift and natural selection.\n\n(c) Why does a small isolated population often change faster than a large one?',
  model: '(a) A **species** is a group of organisms whose members can **interbreed** and produce **fertile offspring**.\n\n(b) Normally, genes **flow** through a population as its members interbreed, keeping it alike. If a barrier such as a river, mountain range or sea splits the population, **gene flow stops**. Each part then changes on its own: **genetic drift** alters it by chance, and **natural selection** favours variations that suit its own surroundings. Over many generations, differences in DNA, chromosomes or mating behaviour build up until members of the two groups can **no longer interbreed**. The two groups have become separate species.\n\n(c) In a small population, chance events such as which few individuals survive a disaster or happen to breed can change how common a variation is very quickly. In a large population, such chance effects average out. So **genetic drift** acts faster in small populations.',
  sol: 'Step 1 — Define a species.\n\nStep 2 — Gene flow, isolation, drift, selection, reproductive isolation.\n\nStep 3 — Chance has more effect in small populations.',
  scheme: [['(a) Definition', 1], ['(b) Isolation stops gene flow', 1], ['(b) Drift and selection, then reproductive isolation', 2], ['(c) Drift faster in small populations', 1]],
  d: 3, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 evolution and classification; fossils
add('homologous-def-mcq', mcq({
  stem: 'Organs that have the same basic structure and origin, but may perform different functions, are called:',
  right: 'homologous organs',
  wrong: ['analogous organs', 'vestigial organs', 'acquired organs'],
  sol: 'Same structure and origin with possibly different jobs defines homologous organs — option (@K). Analogous organs (@1) share function, not origin.',
  d: 1, c: 'recall', t: [3],
}));
add('analogous-mcq', mcq({
  stem: 'Which pair are analogous organs?',
  right: 'The wings of a butterfly and the wings of a sparrow',
  wrong: ['The front leg of a horse and the arm of a monkey', 'The flipper of a seal and the arm of a human', 'The wing of a pigeon and the front leg of a lizard'],
  sol: 'Butterfly and sparrow wings both help in flight but have completely different structures and origins — option (@K). The other pairs are vertebrate forelimbs with the same bones, so they are homologous.',
  d: 2, c: 'application', t: [3],
}));
add('homologous-pick-mcq', mcq({
  stem: 'Which pair of organs is homologous?',
  right: 'The flipper of a whale and the arm of a human',
  wrong: ['The wing of a bird and the wing of an insect', 'The eye of an octopus and the eye of a human', 'A potato (a stem) and a sweet potato (a root)'],
  sol: 'A whale’s flipper and a human arm have the same set of forelimb bones inherited from a common ancestor, though they do different jobs — option (@K). The other pairs do similar jobs with different origins: they are analogous.',
  d: 3, c: 'application', t: [3],
}));
add('fossil-age-mcq', mcq({
  stem: 'In undisturbed layers of sedimentary rock, fossil X is found 5 m below the surface and fossil Y is found 12 m below it. Which statement is correct?',
  right: 'Y is older than X, because deeper layers were laid down earlier.',
  wrong: ['X is older than Y, because it is closer to the surface.', 'X and Y are the same age, because they are in the same rock.', 'Their ages cannot be compared without carbon dating.'],
  sol: 'Layers build up from the bottom, so in undisturbed rock the deeper fossil, Y, is older — option (@K). Depth gives relative age without any dating (@3).',
  d: 2, c: 'application', t: [3],
}), () => 12 > 5 || 'depth');
add('archaeopteryx-mcq', mcq({
  stem: 'Palaeontologists find a fossil animal with feathers on its arms, but also teeth in its jaws, claws on its fingers and a long bony tail. Which conclusion is best supported?',
  right: 'It shows a mix of reptile and bird features, so it helps link reptiles (dinosaurs) with birds, as Archaeopteryx does.',
  wrong: ['It must be a modern bird, because it has feathers.', 'It must be a mammal, because it has teeth.', 'It cannot tell us anything, because it fits no living group.'],
  sol: 'Feathers are bird features; teeth, finger claws and a bony tail are reptile features. An animal with both is an in-between form like Archaeopteryx — option (@K). Feathers alone (@1) do not make a modern bird; in-between forms are useful evidence (@3).',
  d: 3, c: 'application', t: [3],
}));
add('tree-mcq', mcq({
  stem: 'Frogs, lizards and mice all have a backbone and four limbs. In lizards and mice, but not in frogs, the young develop inside a protective membrane, so their eggs or young do not need to be in water. Only mice have hair. Using shared features, which two are most closely related?',
  right: 'The lizard and the mouse',
  wrong: ['The frog and the lizard', 'The frog and the mouse', 'All three are equally related'],
  sol: 'All three share a backbone and four limbs. Only the lizard and the mouse also share the protective membrane around the developing young, which the frog lacks. More shared features mean a more recent common ancestor — option (@K).',
  d: 4, c: 'analysis', t: [3],
}));
add('homolog-ar', ar({
  a: 'The forelimbs of a whale and a bat are homologous organs.',
  r: 'Homologous organs always perform the same function.',
  key: 'c',
  sol: 'A is true: both forelimbs have the same bones from a common ancestor. R is false: homologous organs may do very different jobs, such as swimming and flying — option (c).',
  d: 3, c: 'understanding', t: [3],
}));
add('feathers-ar', ar({
  a: 'Feathers in some dinosaurs probably first helped to keep their bodies warm.',
  r: 'Birds today use feathers for flight.',
  key: 'b',
  sol: 'Both are true, but how birds use feathers today does not explain why feathers first evolved in dinosaurs that could not fly — option (b).',
  d: 3, c: 'analysis', t: [3],
}));
add('fossil-tf', tf({
  stem: 'Radioactive dating of a fossil compares the amounts of different isotopes of an element, such as carbon, present in it.',
  key: 't',
  sol: 'True. Some isotopes decay at a known, steady rate, so the ratio of isotopes tells roughly how long ago the organism died.',
  d: 2, c: 'understanding', t: [3],
}));
add('analogous-fill', fill({
  stem: 'Organs with a different basic structure and origin but a similar function, such as the wings of an insect and a bird, are called ___ organs.',
  acc: [['analogous']],
  sol: 'They are **analogous** organs.',
  d: 1, c: 'recall', t: [3],
}));
add('evidence-match', match({
  stem: 'Match each kind of evidence in Column A with what it shows in Column B.',
  pairs: [['Homologous organs', 'Descent from a common ancestor'], ['Analogous organs', 'Similar solutions evolved separately for similar jobs'], ['Fossils in rock layers', 'Which organisms lived earlier and which later'], ['Comparing DNA', 'How closely two species are related']],
  order: [2, 3, 0, 1],
  sol: 'Homologous organs → common ancestor (1 → r); analogous organs → similar solutions evolved separately (2 → s); fossils in layers → order in time (3 → p); comparing DNA → closeness of relationship (4 → q).',
  d: 2, c: 'understanding', t: [3, 4],
}));
add('dating-num', num({
  stem: 'Half of the carbon-14 in dead material decays in about 5730 years. A bone has one-quarter of the carbon-14 found in living bone. About how old is the bone, in years?',
  value: 11460, tol: 20, unit: 'years',
  sol: r`One-quarter is two halvings: $\dfrac{1}{2} \times \dfrac{1}{2} = \dfrac{1}{4}$. Age $\approx 2 \times 5730 = 11460$ years.`,
  scheme: [['Two half-lives', 0.5], ['About 11460 years', 0.5]],
  d: 3, c: 'application', t: [3],
}), (q) => near(halfLives(1 / 4) * C14, q.answer.value) || 'C14');
add('layers-num', num({
  stem: 'At a lake bed, mud settles at a steady rate of about 2 cm every 100 years, in undisturbed layers. A fish fossil is found 90 cm below the top of the mud. About how many years ago was the fish buried?',
  value: 4500, tol: 0, unit: 'years',
  sol: r`Number of 2 cm layers in 90 cm: $\dfrac{90}{2} = 45$. Time $= 45 \times 100 = 4500$ years.`,
  scheme: [['4500 years', 1]],
  d: 3, c: 'application', t: [3],
}), (q) => near((90 / 2) * 100, q.answer.value) || 'layers');
add('organs-short', short({
  marks: 2,
  stem: 'Classify each pair as homologous or analogous, and state which pair shows common ancestry: (a) the front leg of a horse and the arm of a monkey; (b) the wing of a housefly and the wing of a crow.',
  model: '(a) **Homologous**: both are forelimbs with the same bones, though the horse runs and the monkey grasps.\n\n(b) **Analogous**: both are used for flying, but the housefly’s wing has no bones while the crow’s is feathers on arm bones.\n\nPair **(a)** shows common ancestry.',
  sol: 'Judge each pair by origin and structure, not by function.',
  scheme: [['(a) Homologous and (b) analogous, with reasons', 1], ['Pair (a) shows common ancestry', 1]],
  d: 2, c: 'application', t: [3],
  wl: null,
}));
add('dating-short', short({
  marks: 2,
  stem: 'Describe two ways in which scientists find out how old a fossil is.',
  model: '(1) **By depth:** in undisturbed sedimentary rock, deeper layers were laid down earlier, so fossils found deeper are **older**. This gives relative age.\n\n(2) **Radioactive dating:** scientists compare the amounts of different **isotopes** of an element (such as carbon) in the fossil; since some isotopes decay at a steady rate, this gives the age in **years**.',
  sol: 'Give the relative (depth) method and the isotope method.',
  scheme: [['Depth: deeper is older', 1], ['Radioactive dating using isotope ratios', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('relationship-short', short({
  marks: 3,
  stem: 'A sparrow, a bat and a human are compared.\n\n(a) The sparrow and the bat both fly. Does this make them close relatives? Explain.\n\n(b) The bat and the human both have hair and feed their young with milk. What does this suggest?\n\n(c) State the general rule used to judge how closely organisms are related.',
  model: '(a) **No.** Their wings are **analogous**: a sparrow flies with feathers, a bat with skin on long fingers, so flight evolved **separately**. A shared function alone does not show a close relationship.\n\n(b) The bat and the human are both **mammals**; sharing hair and milk suggests they had a **more recent common ancestor** with each other than either has with the sparrow.\n\n(c) The **more basic characteristics** two organisms share, especially homologous ones, the **more closely** they are related.',
  sol: 'Separate analogous from homologous features, then state the rule.',
  scheme: [['(a) Analogous wings; not close relatives', 1], ['(b) Mammal features show closer relationship', 1], ['(c) More shared characteristics, closer relationship', 1]],
  d: 4, c: 'analysis', t: [3],
}));
add('fossils-long', long({
  stem: '(a) What are fossils? Describe one way in which a fossil can form.\n\n(b) How can the age of a fossil be found? Describe two methods.\n\n(c) Explain how a fossil such as Archaeopteryx helps us understand the evolution of birds.',
  model: '(a) **Fossils** are preserved **remains or traces** of organisms that lived long ago: bones, shells, leaf impressions, footprints. An animal that dies in a lake may be **buried quickly** in mud before it decays; over a very long time the mud becomes rock and **minerals** replace the hard parts.\n\n(b) **Relative dating:** in undisturbed sedimentary rock, deeper layers are older. **Radioactive dating:** the ratio of isotopes of an element such as carbon shows roughly how many years ago the organism died, because some isotopes decay at a steady rate.\n\n(c) Archaeopteryx had **feathers** like a bird but **teeth**, **clawed fingers** and a **long bony tail** like a reptile. Such in-between forms show that birds evolved from **reptiles (dinosaurs)**.',
  sol: 'Step 1 — Define and describe formation.\n\nStep 2 — Depth and isotope dating.\n\nStep 3 — Mixed features link reptiles and birds.',
  scheme: [['(a) Definition and formation', 1.5], ['(b) Two dating methods', 1.5], ['(c) Archaeopteryx features and their meaning', 2]],
  d: 3, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 evolution by stages; human evolution
add('eye-stages-mcq', mcq({
  stem: 'How could a complex organ such as the eye evolve gradually?',
  right: 'Each stage, from a simple light-sensitive patch to a lens eye, was useful to its owner and could be selected.',
  wrong: ['The whole eye appeared at once in a single generation.', 'Animals that needed to see grew eyes by trying hard.', 'Eyes are useless until complete, so they cannot evolve in stages.'],
  sol: 'Even simple eyespots that tell light from dark help survival, so each improvement could be selected — option (@K). An incomplete eye is still useful, so (@3) is wrong.',
  d: 2, c: 'understanding', t: [4],
}));
add('cabbage-mcq', mcq({
  stem: 'Farmers developed several vegetables from wild cabbage by artificial selection. Which vegetable was produced by selecting plants with a swollen stem?',
  right: 'Kohlrabi',
  wrong: ['Kale', 'Broccoli', 'Cauliflower'],
  sol: 'Kohlrabi has a swollen stem — option (@K). Kale was selected for large leaves (@1), broccoli for flower-bud clusters (@2) and cauliflower for a dense head of undeveloped flowers (@3).',
  d: 2, c: 'recall', t: [4],
}));
add('artificial-mcq', mcq({
  stem: 'Cabbage, broccoli and kale look very different, yet all were bred from one wild plant. What does this show?',
  right: 'Selection over many generations can produce large changes within a species.',
  wrong: ['Each vegetable is a separate species that evolved on its own.', 'Farmers created new genes by choosing plants carefully.', 'Wild cabbage changed only because of the soil it grew in.'],
  sol: 'Farmers chose plants with existing variations and bred from them, generation after generation; the vegetables are still one species — option (@K). Selection works on existing variation; it does not create genes (@2).',
  d: 3, c: 'understanding', t: [4],
}));
add('origin-mcq', mcq({
  stem: 'Fossil and DNA evidence shows that modern humans (Homo sapiens) first arose in:',
  right: 'Africa',
  wrong: ['Europe', 'South America', 'Australia'],
  sol: 'Homo sapiens arose in Africa; groups later spread to the other continents — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('one-species-mcq', mcq({
  stem: 'Why are all humans living today considered to belong to a single species?',
  right: 'All humans can interbreed and have fertile children; differences such as skin colour are small variations.',
  wrong: ['All humans have exactly the same DNA.', 'All humans live in similar climates.', 'Humans stopped evolving long ago.'],
  sol: 'The test for a species is interbreeding with fertile offspring, which holds for all humans; visible differences are minor variations — option (@K). Humans do differ in DNA (@1).',
  d: 2, c: 'understanding', t: [4],
}));
add('chimp-ar', ar({
  a: 'Humans evolved from chimpanzees.',
  r: 'Humans and chimpanzees share a common ancestor that lived several million years ago.',
  key: 'd',
  sol: 'A is false: today’s chimpanzees are our cousins, not our ancestors. R is true: both lines evolved from a shared ancestral population — option (d).',
  d: 2, c: 'understanding', t: [4],
}));
add('progress-tf', tf({
  stem: 'Evolution always produces more complex organisms that are "better" than older forms.',
  key: 'f',
  sol: 'False. Evolution produces organisms suited to their surroundings, not a ladder of progress; simple bacteria are as successful today as complex animals.',
  d: 2, c: 'understanding', t: [4],
}));
add('sapiens-fill', fill({
  stem: 'The scientific name of modern humans, a single species found all over the world, is Homo ___.',
  acc: [['sapiens']],
  sol: 'Modern humans are **Homo sapiens**.',
  d: 1, c: 'recall', t: [4],
}));
add('molecular-short', short({
  marks: 2,
  stem: 'A student project compares the same stretch of 100 DNA bases in three bird species, P, Q and R (illustrative data). P and Q differ at 3 places, P and R at 14 places, and Q and R at 13 places. Which two species are most closely related? Explain the idea of molecular phylogeny that you used.',
  model: '**P and Q** are most closely related: their DNA differs at only **3** places. Molecular phylogeny compares **DNA**: changes build up over time after two species separate, so species with a **more recent common ancestor** have **fewer differences**.',
  sol: 'Pick the pair with the fewest differences and link it to a recent common ancestor.',
  scheme: [['P and Q, with the 3 differences', 1], ['Fewer DNA differences mean a more recent common ancestor', 1]],
  d: 3, c: 'application', t: [4],
}), () => {
  const d = { PQ: 3, PR: 14, QR: 13 };
  return Object.entries(d).sort((a, b) => a[1] - b[1])[0][0] === 'PQ' || 'PQ';
});
add('eye-short', short({
  marks: 3,
  stem: 'Some people say the eye is too complex to have evolved, because "half an eye is useless". Evaluate this argument.',
  model: 'The argument is **not correct**. Simple light-sensitive **eyespots**, like those of planaria, already help an animal tell light from dark and avoid danger. A **cup-shaped** eye adds the direction of light, and a **lens** gives a sharp image. **Each stage was useful**, so natural selection could favour each improvement in turn. Eyes have even evolved **separately** in several groups, such as octopuses and vertebrates.',
  sol: 'Show that every intermediate stage is useful, with examples.',
  scheme: [['Judges the argument as incorrect', 1], ['Useful intermediate stages with examples', 1], ['Selection favours each improvement', 1]],
  d: 4, c: 'evaluation', t: [4],
}));
add('cabbage-short', short({
  marks: 3,
  stem: 'Explain how farmers produced cabbage, broccoli, cauliflower, kohlrabi and kale from wild cabbage. Why is this process called artificial selection?',
  model: 'Wild cabbage plants **varied** slightly in their leaves, stems and flowers. Farmers chose plants with a feature they wanted, such as **large leaves** (kale), a **swollen stem** (kohlrabi), **flower-bud clusters** (broccoli), a **dense head of undeveloped flowers** (cauliflower) or a **short stem with packed leaves** (cabbage), and grew seeds only from those. Repeating this for many generations exaggerated each feature. It is called **artificial selection** because **humans**, not nature, chose which plants would reproduce.',
  sol: 'Variation → choice by farmers → repeated over generations; humans as the selecting agent.',
  scheme: [['Existing variation in wild cabbage', 1], ['Repeated choice of different features gives different vegetables', 1], ['Humans do the selecting', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('human-long', long({
  stem: '(a) Explain why the statement "humans evolved from chimpanzees" is wrong.\n\n(b) Where did modern humans arise, and how did they come to live all over the world?\n\n(c) Why are all humans living today one species?\n\n(d) Why is it wrong to think of evolution as progress towards humans?',
  model: '(a) Humans and chimpanzees both evolved from a **common ancestor** that lived several million years ago. Since then, each line has evolved separately. Chimpanzees living today are our **cousins**, not our ancestors.\n\n(b) Modern humans, **Homo sapiens**, arose in **Africa**. Over tens of thousands of years, groups **spread out of Africa** to Asia, Europe, Australia and later the Americas.\n\n(c) All humans can **interbreed** and have fertile children. Differences in skin colour, height or hair are **small variations** that arose as groups lived in different places.\n\n(d) Evolution produces organisms **suited to their surroundings**, not a ladder with humans at the top. Bacteria, insects and plants are as much the result of evolution as we are.',
  sol: 'Step 1 — Common ancestor, cousins.\n\nStep 2 — Africa, then spread.\n\nStep 3 — Interbreeding test.\n\nStep 4 — Diversity, not a ladder.',
  scheme: [['(a) Common ancestor; cousins', 1.5], ['(b) Africa and spread', 1], ['(c) One species: interbreeding', 1.5], ['(d) Not progress', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('evidence-long', long({
  stem: 'Describe three kinds of evidence that living organisms are related through evolution. For each, give an example and explain what it shows.',
  model: '(1) **Homologous organs:** the forelimbs of a human, a cat, a whale and a bird have the same set of bones (one upper arm bone, two forearm bones, wrist bones, finger bones) though they grasp, walk, swim and fly. This shows they inherited the plan from a **common ancestor**.\n\n(2) **Fossils:** in undisturbed rock, deeper fossils are older, and fossils such as **Archaeopteryx**, with feathers as well as teeth and a bony tail, show **in-between forms** linking reptiles and birds.\n\n(3) **DNA comparison (molecular phylogeny):** species with a recent common ancestor have **more similar DNA**; human DNA is closest to chimpanzee DNA, matching the family tree built from body structures.',
  sol: 'Give three lines of evidence, each with an example and its meaning.',
  scheme: [['Homologous organs with example and meaning', 2], ['Fossils with example and meaning', 1.5], ['DNA comparison with example and meaning', 1.5]],
  d: 3, c: 'understanding', t: [3, 4],
}));

// ---------------------------------------------------------------- case-based
add('grasshopper-case', mk.case({
  passage: 'For a school project near Jodhpur, students counted grasshoppers in a patch of grassland every August for four years. During these years, a drought turned most of the grass brown. Birds were often seen catching grasshoppers.\n\n| Year | Green grasshoppers | Brown grasshoppers |\n|---|---|---|\n| 1 | 120 | 80 |\n| 2 | 90 | 110 |\n| 3 | 60 | 130 |\n| 4 | 40 | 160 |',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'What trend does the table show?',
      right: 'Brown grasshoppers became a larger share of the population each year.',
      wrong: ['Green grasshoppers became a larger share of the population each year.', 'The total number of grasshoppers fell every year.', 'The two colours stayed in the same ratio.'],
      sol: 'Brown rose from 80 of 200 (40%) to 160 of 200 (80%), while green fell — option (@K). The total stayed at 200 in years 1, 2 and 4 (@2).',
      d: 2, c: 'application', t: [2],
    })),
    part('b', num({
      stem: 'What percentage of the grasshoppers counted in year 4 were brown?',
      value: 80, tol: 0, unit: '%',
      sol: r`$\dfrac{160}{40 + 160} \times 100 = \dfrac{160}{200} \times 100 = 80\%$.`,
      scheme: [['80%', 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain the change in the population using the idea of natural selection.',
      model: 'The population already contained **green and brown variants**, coloured by their genes. On the dry brown grass, **birds spotted green grasshoppers more easily** and ate more of them. More brown grasshoppers **survived and reproduced**, passing on brown colour, so the brown share rose each year.',
      sol: 'Existing variation, selective predation, survival and inheritance.',
      scheme: [['Existing inherited variation; birds catch green more', 1], ['Brown survive, breed and pass on colour', 1]],
      d: 3, c: 'understanding', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'A student concludes, "The green grasshoppers turned brown so that birds could not see them." Evaluate this conclusion.',
        model: 'The conclusion is **wrong**. Individual grasshoppers did not change colour on purpose; colour is set by their **genes**. The data show that **green ones decreased** while brown ones increased, which fits birds removing more green grasshoppers and **brown ones breeding more**: natural selection of an existing variation.',
        sol: 'Reject purposeful change and reinterpret the data as selection.',
        scheme: [['Rejects purposeful colour change', 1], ['Explains the data as selection of existing variation', 1]],
        d: 4, c: 'evaluation', t: [1, 2],
      }),
    ]),
  ],
}), (q) => near((160 / 200) * 100, q.children[1].answer.value) && [80, 110, 130, 160].every((b, i, a) => i === 0 || b > a[i - 1]) || 'grasshoppers');
add('island-case', mk.case({
  passage: 'Thousands of years ago, rising sea level cut off a small hill from the mainland, making it an island. A small group of about 30 forest rats was trapped on it. Today, island rats are larger, have shorter tails and breed at a different time of year from mainland rats. In a research centre, island and mainland rats kept together did not mate with each other.',
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'What first stopped gene flow between the island and mainland rats?',
      right: 'The sea that separated the island from the mainland',
      wrong: ['The rats’ larger body size', 'Their different breeding season', 'The research centre keeping them together'],
      sol: 'Rising sea level created a barrier the rats could not cross: geographical isolation — option (@K). The other differences came later.',
      d: 2, c: 'understanding', t: [2],
    })),
    part('b', short({
      marks: 1,
      stem: 'Why might genetic drift have been important in the early island population?',
      model: 'The founding group was **small** (about 30 rats), so **chance** events could change how common a variation was very quickly.',
      sol: 'Small population → chance has a large effect.',
      scheme: [['Small population, chance effects', 1]],
      d: 3, c: 'application', t: [2],
      wl: null,
    })),
    part('c', short({
      marks: 2,
      stem: 'Do the island and mainland rats now belong to separate species? Give reasons from the passage.',
      model: '**Yes, they behave as separate species.** They breed at **different times** and did **not mate** even when kept together, so no genes flow between them: they are **reproductively isolated**. Their body differences (size, tail length) show that each group has changed separately since the sea split them.',
      sol: 'Apply the interbreeding test to the evidence in the passage.',
      scheme: [['No mating and different breeding times: reproductive isolation', 1], ['Concludes separate species, supported by divergence', 1]],
      d: 4, c: 'analysis', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'Suggest how natural selection may have produced larger island rats.',
        model: 'Island rats **varied** in size. If, on the island, larger rats **survived better** (for example by storing more fat when food was scarce, or keeping warmer), they would have left **more offspring**. Over many generations, the genes for larger size would have become **common**.',
        sol: 'Variation in size, an advantage on the island, more offspring over generations.',
        scheme: [['Existing variation and a plausible advantage', 1], ['More offspring; larger size spreads over generations', 1]],
        d: 4, c: 'application', t: [2],
      }),
    ]),
  ],
}));
add('limb-case', mk.case({
  passage: 'During a visit to a natural history museum in Kolkata, a class looked at four skeletons: a human, a cat, a dolphin and a bat. Their guide pointed out that the arm of the human, the front leg of the cat, the flipper of the dolphin and the wing of the bat each had one upper bone, two forearm bones, a group of wrist bones and finger bones. Nearby, a case of insects showed butterflies and dragonflies with thin, veined wings that had no bones at all.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The bat’s wing and the dolphin’s flipper are best described as:',
      right: 'homologous organs, because they have the same basic bones',
      wrong: ['analogous organs, because they do the same job', 'analogous organs, because they look different', 'unrelated organs that cannot be compared'],
      sol: 'They share the same plan of bones though one flies and one swims, so they are homologous — option (@K).',
      d: 2, c: 'application', t: [3],
    })),
    part('b', short({
      marks: 1,
      stem: 'Name one pair from the museum visit that shows analogous organs.',
      model: 'The **wing of a bat** and the **wing of a butterfly** (or dragonfly): same job, different structure.',
      sol: 'Pick two wings with different structures.',
      scheme: [['Bat or bird wing with an insect wing', 1]],
      d: 2, c: 'application', t: [3],
      wl: null,
    })),
    part('c', short({
      marks: 2,
      stem: 'What does the shared bone pattern in the four mammal limbs tell us about these animals’ history?',
      model: 'The four animals **inherited** the same limb plan from a **common ancestor**. Over many generations, the limbs became adapted to **different jobs** (grasping, walking, swimming, flying), but the basic bones remained, showing that the animals are **related**.',
      sol: 'Shared plan → common ancestor; different uses → later adaptation.',
      scheme: [['Common ancestor', 1], ['Adapted to different jobs over time', 1]],
      d: 3, c: 'understanding', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'One student says, "Bats are closely related to butterflies because both have wings." Evaluate this statement.',
        model: 'The statement is **wrong**. Bat and butterfly wings are **analogous**: a bat’s wing is skin over finger bones, while a butterfly’s has no bones. A similar job does not show common ancestry. The bat’s **homologous** limb bones show it is more closely related to the human, cat and dolphin.',
        sol: 'Use the analogous/homologous distinction to judge the claim.',
        scheme: [['Wings are analogous, so the claim is wrong', 1], ['Homologous bones show the bat’s real relatives', 1]],
        d: 3, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}));
add('fossil-case', mk.case({
  passage: 'Geology students studying a cliff in Kutch, Gujarat, recorded fossils in four undisturbed layers of sedimentary rock, numbered from the top.\n\n| Layer (from top) | Depth (m) | Fossils found |\n|---|---|---|\n| 1 | 0–3 | Shells of snails like living ones |\n| 2 | 3–8 | Bones of a small mammal |\n| 3 | 8–15 | Shark teeth |\n| 4 | 15–20 | Coiled ammonite shells (now extinct) |\n\nIn a separate test, a piece of charcoal from layer 1 still had one-half of the carbon-14 found in living wood.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which fossils are the oldest?',
      right: 'The ammonite shells in layer 4',
      wrong: ['The snail shells in layer 1', 'The mammal bones in layer 2', 'All are the same age'],
      sol: 'In undisturbed rock, the deepest layer is the oldest: layer 4 — option (@K).',
      d: 1, c: 'application', t: [3],
    })),
    part('b', num({
      stem: 'Carbon-14 halves about every 5730 years. About how old is the charcoal from layer 1, in years?',
      value: 5730, tol: 10, unit: 'years',
      sol: 'One-half of the carbon-14 is left, so one half-life has passed: about 5730 years.',
      scheme: [['About 5730 years', 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Ammonites are found only in the deepest layer and are extinct today, while snails like living ones appear only near the top. What does this suggest about life in the past?',
      model: 'Different kinds of organisms lived at **different times**. Ammonites lived long ago and later became **extinct**, while the snails near the top are **recent** and similar to living species. The fossil record shows that the living world has **changed over time**, which is evidence for evolution.',
      sol: 'Link layer order to time, and change in kinds of organisms to evolution.',
      scheme: [['Organisms lived at different times; some became extinct', 1], ['Life has changed over time: evidence for evolution', 1]],
      d: 3, c: 'analysis', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'Explain why carbon-14 dating could be used for the charcoal in layer 1 but not to date the ammonites in layer 4.',
        model: 'Carbon-14 halves every 5730 years, so after some **tens of thousands of years** almost none is left to measure. The charcoal is only a few thousand years old, but the ammonites are **millions of years** old. Older fossils are dated with **other radioactive isotopes** that decay much more slowly.',
        sol: 'Compare the half-life with the ages involved.',
        scheme: [['Carbon-14 almost gone after tens of thousands of years', 1], ['Ammonites far older; other isotopes used', 1]],
        d: 4, c: 'analysis', t: [3],
      }),
    ]),
  ],
}), (q) => near(halfLives(1 / 2) * C14, q.children[1].answer.value) || 'C14 one half-life');
add('cabbage-case', mk.case({
  passage: 'At a vegetable market in Shimla, a farmer explained to a group of students that cabbage, cauliflower, broccoli, kohlrabi and kale are all varieties of a single species of plant, bred from wild cabbage. "Our ancestors kept seeds only from the plants they liked best," she said. "Some liked big leaves, some liked the flower buds, and some liked the fat stem." The students noticed that the vegetables looked very different from one another.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which vegetable comes from selecting plants for their large leaves?',
      right: 'Kale',
      wrong: ['Kohlrabi', 'Cauliflower', 'Broccoli'],
      sol: 'Kale was selected for large leaves — option (@K). Kohlrabi was selected for a swollen stem.',
      d: 1, c: 'recall', t: [4],
    })),
    part('b', short({
      marks: 1,
      stem: 'Why can all these vegetables still be called one species?',
      model: 'They can still **interbreed** and produce **fertile** offspring.',
      sol: 'Apply the definition of a species.',
      scheme: [['Can interbreed with fertile offspring', 1]],
      d: 2, c: 'understanding', t: [2, 4],
      wl: null,
    })),
    part('c', short({
      marks: 2,
      stem: 'Compare the selection described by the farmer with natural selection.',
      model: 'Both act on **existing variation** and change a population over **many generations** by deciding which individuals reproduce. In **artificial selection**, **humans** choose the plants with the features they want. In **natural selection**, the **environment** (predators, climate, food) decides which individuals survive and reproduce.',
      sol: 'One similarity and the key difference (who selects).',
      scheme: [['Similarity: existing variation, over generations', 1], ['Difference: humans vs environment select', 1]],
      d: 3, c: 'analysis', t: [2, 4],
    }), [
      short({
        marks: 2,
        stem: 'A student says, "If farmers could change wild cabbage this much in a few thousand years, nature could produce new species over millions of years." Evaluate this reasoning.',
        model: 'The reasoning is **sound**. Artificial selection shows that selecting among existing variations, generation after generation, can change a plant **greatly**. Natural selection works the same way but over **far longer** times, and if populations are also **isolated** so that they cannot interbreed, the changes can lead to **new species**.',
        sol: 'Accept the reasoning, adding the need for isolation to form species.',
        scheme: [['Selection can produce large changes', 1], ['Over long times, with isolation, new species can form', 1]],
        d: 4, c: 'evaluation', t: [2, 4],
      }),
    ]),
  ],
}));
