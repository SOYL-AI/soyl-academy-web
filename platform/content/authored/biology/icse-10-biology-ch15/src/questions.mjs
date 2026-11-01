// ICSE 10 Biology ch15 Human Evolution — question bank in ICSE 2027 style.
// Cranial-capacity ratios, moth percentages and survival figures are computed by calc.mjs.
// AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true, R does not explain.
import { mk, add, svgV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { ANCESTORS, CC, ccRatio, ccRise, SURVEY, RECAP, BEETLE } from './calc.mjs';
import { SKULLS_LETTERED, GIRAFFE, MOTHS, CRANIAL } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, match, part } = mk;
const skullFig = svgV(SKULLS_LETTERED, 'Skulls of an early ancestor and a modern human with features lettered A to E');
const giraffeFig = svgV(GIRAFFE, "Lamarck's and Darwin's explanations of the giraffe's long neck");
const mothFig = svgV(MOTHS, 'Light and dark peppered moths on pale and soot-darkened bark');
const ccFig = svgV(CRANIAL, 'Approximate cranial capacities of human ancestors');

// ---------------------------------------------------------------- t01 human ancestors and their comparison
add('oldest-mcq', mcq({
  stem: 'Which of these comes earliest in the sequence of human ancestors?',
  right: 'Australopithecus', wrong: ['Homo erectus', 'Neanderthal man', 'Cro-Magnon man'],
  sol: 'The sequence is Australopithecus → Homo habilis → Homo erectus → Neanderthal man → Cro-Magnon man → modern man — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('habilis-mcq', mcq({
  stem: 'Why was the name "handy man" given to Homo habilis? Because it',
  right: 'made and used simple stone tools', wrong: ['painted animals on cave walls', 'buried its dead with flowers', 'was the first to grow crops'],
  sol: 'Habilis means handy: it shaped stones into simple tools — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('erectus-mcq', mcq({
  stem: 'The ancestor that walked fully upright and is the first known to have used fire was',
  right: 'Homo erectus', wrong: ['Australopithecus', 'Homo habilis', 'Cro-Magnon man'],
  sol: 'Homo erectus ("upright man") had a fully erect posture and used fire — option (@K).',
  d: 2, c: 'recall', t: [1],
}));
add('neander-mcq', mcq({
  stem: 'Which statement about Neanderthal man is correct?',
  right: 'It buried its dead and had a brain about as large as ours', wrong: ['It had a prominent chin and no brow ridges', 'It was the first ancestor to walk on two legs', 'It had a cranial capacity of about 500 cubic centimetres'],
  sol: `Neanderthals had heavy brow ridges, no chin, a cranial capacity of about ${CC.nea} cubic centimetres, and buried their dead — option (@K).`,
  d: 2, c: 'understanding', t: [1],
}));
add('cromagnon-mcq', mcq({
  stem: `In a cave, archaeologists find paintings of bison and finely carved bone needles beside skulls that have a chin and a braincase of about ${CC.cro} cubic centimetres. The people who left them were most likely`,
  right: 'Cro-Magnon man', wrong: ['Australopithecus', 'Homo habilis', 'Homo erectus'],
  sol: 'Cave art, fine bone tools, a chin and the largest braincase in the human line point to Cro-Magnon man — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('chin-mcq', mcq({
  stem: 'Which feature is present in modern humans but absent in Australopithecus?',
  right: 'A prominent chin', wrong: ['Heavy brow ridges', 'Large canines', 'Thick body hair'],
  sol: 'The chin appears only in Cro-Magnon and modern humans; the other three are features of early ancestors — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('trend-mcq', mcq({
  stem: 'Which trend is seen from Australopithecus to modern humans?',
  right: 'Cranial capacity increases and the brow ridges become smaller', wrong: ['The canines become longer', 'The body becomes more hairy', 'The posture becomes more stooped'],
  sol: 'Brain size rises, brow ridges and canines shrink, body hair decreases and posture becomes fully erect — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('fossil-mcq', mcq({
  stem: 'A fossil skull has a low sloping forehead, heavy brow ridges, no chin and a braincase of about 1000 cubic centimetres. Fossil leg bones found with it show a fully upright stance. It most likely belongs to',
  right: 'Homo erectus', wrong: ['Australopithecus', 'Cro-Magnon man', 'modern Homo sapiens sapiens'],
  sol: `About ${CC.ere} cubic centimetres with brow ridges, no chin and an erect posture fits Homo erectus; Australopithecus had about ${CC.aus}, while Cro-Magnon and modern humans have chins — option (@K).`,
  d: 4, c: 'analysis', t: [1],
}));
add('ratio-num', num({
  stem: `Taking the cranial capacity of Australopithecus as about ${CC.aus} cubic centimetres and that of modern humans as about ${CC.mod}, how many times larger is the modern braincase?`,
  value: ccRatio, tol: 0.05,
  sol: `$${CC.mod} \\div ${CC.aus} = ${ccRatio}$ times.`,
  scheme: [[`${ccRatio} times`, 1]],
  d: 2, c: 'application', t: [1],
  assets: [ccFig],
}), (q) => q.answer.value === 2.8 || 'value');
add('bipedal-ar', ar({
  a: 'Australopithecus walked on two legs.',
  r: `Australopithecus had a cranial capacity of only about ${CC.aus} cubic centimetres.`,
  key: 'd',
  sol: 'Both are true, but a small brain does not explain walking on two legs — option (d).',
  d: 2, c: 'analysis', t: [1],
}));
add('neander-ar', ar({
  a: 'Neanderthal man had a prominent chin.',
  r: 'Neanderthal man had heavy brow ridges.',
  key: 'b',
  sol: 'The assertion is false: Neanderthals had little or no chin. The reason is true — option (b).',
  d: 2, c: 'analysis', t: [1],
}));
add('erectus-tf', tf({
  stem: 'Homo erectus had a larger cranial capacity than Homo habilis.',
  key: 't',
  sol: `True. About ${CC.ere} cubic centimetres against about ${CC.hab}.`,
  d: 1, c: 'understanding', t: [1],
}));
add('habilis-fill', fill({
  stem: 'Homo habilis, the first maker of stone tools, is known as the ______ man.',
  acc: [['handy']],
  sol: 'Handy man.',
  d: 1, c: 'recall', t: [1],
}));
add('cranial-term', short({
  marks: 1, wl: null,
  stem: 'Give the term: the volume of the braincase of a skull, used to compare the brain size of human ancestors.',
  model: '**Cranial capacity.**',
  sol: 'Cranial capacity.', scheme: [['Cranial capacity', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('odd-features', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Prominent chin, Heavy brow ridges, Large canines, Sloping forehead.',
  model: '**Prominent chin**; the others are **features of early human ancestors** that were reduced in modern humans.',
  sol: 'The chin is a modern feature.', scheme: [['Odd one and category', 1]],
  d: 2, c: 'analysis', t: [1],
}));
add('reason-fire', short({
  marks: 1, wl: null,
  stem: 'Give reason: the use of fire was an important step in human evolution.',
  model: 'Fire gave **warmth and protection** from animals, and **cooked food** was easier to chew and digest.',
  sol: 'Warmth, safety, cooked food.', scheme: [['Any valid advantage of fire', 1]],
  d: 3, c: 'understanding', t: [1],
}));
add('sequence-short', short({
  marks: 2,
  stem: 'Arrange these in the order in which they appeared, starting with the earliest: Cro-Magnon man, Homo erectus, Australopithecus, Neanderthal man, Homo habilis. Name the one with the largest cranial capacity.',
  model: `**Australopithecus → Homo habilis → Homo erectus → Neanderthal man → Cro-Magnon man.** The largest cranial capacity, about ${CC.cro} cubic centimetres, belonged to **Cro-Magnon man**.`,
  sol: 'Correct sequence; Cro-Magnon.',
  scheme: [['Correct sequence', 1], ['Cro-Magnon man', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('hab-ere-short', short({
  marks: 2,
  stem: 'Give two differences between Homo habilis and Homo erectus.',
  model: `1. Homo habilis had a smaller brain (about **${CC.hab}** cubic centimetres); Homo erectus a larger one (about **${CC.ere}**).\n2. Homo habilis made **simple stone tools**; Homo erectus walked **fully upright** and used **fire**.`,
  sol: 'Brain size; posture and fire.',
  scheme: [['First difference', 1], ['Second difference', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('compare-short', short({
  marks: 3,
  stem: 'Compare Australopithecus with modern humans in cranial capacity, brow ridges and chin.',
  model: `| Feature | Australopithecus | Modern human |\n|---|---|---|\n| Cranial capacity | About **${CC.aus}** cubic centimetres | About **${CC.mod}** cubic centimetres |\n| Brow ridges | **Heavy, prominent** | **Small** |\n| Chin | **Absent** | **Prominent** |`,
  sol: 'Three features compared.',
  scheme: [['Cranial capacity', 1], ['Brow ridges', 1], ['Chin', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 Lamarck: inheritance of acquired characters
add('lamarck-mcq', mcq({
  stem: "According to Lamarck, the giraffe's long neck developed because",
  right: 'generations of giraffes stretched their necks to reach leaves and passed on the longer necks', wrong: ['giraffes born with longer necks survived droughts and bred more', 'a single sudden change produced a long neck in one generation', 'giraffes ate a special leaf that lengthened the neck'],
  sol: 'Lamarck believed that use lengthened the neck and that this acquired change was inherited — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('vestigial-mcq', mcq({
  stem: 'Which human organ is reduced and has no clear use today, although it was useful to our ancestors?',
  right: 'Vermiform appendix', wrong: ['Heart', 'Liver', 'Kidney'],
  sol: 'The appendix is reduced and has no clear digestive role in humans — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('weismann-mcq', mcq({
  stem: 'Weismann cut off the tails of mice over many generations, yet every new generation was born with normal tails. This shows that',
  right: 'characters acquired during life are not inherited', wrong: ['use and disuse change the body', 'tails are vestigial organs', 'mice can grow back lost tails'],
  sol: 'Cutting the tail changed only the body, not the sex cells, so the change was not passed on — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('disuse-mcq', mcq({
  stem: 'How would a supporter of Lamarck explain the small size of the human vermiform appendix?',
  right: 'It shrank through disuse over many generations, and the shrinking was inherited', wrong: ['Individuals with small appendixes survived better and bred more', 'A sudden mutation removed most of it', 'It is still used to digest cellulose'],
  sol: 'Lamarck held that organs not used become smaller and that this change is inherited — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('acquired-ar', ar({
  a: "A wrestler's children are not born with large muscles.",
  r: 'Characters acquired during a lifetime do not change the genes in the sex cells.',
  key: 'c',
  sol: 'Both are true, and since exercise does not alter the genes passed on in sperm or egg, the muscles are not inherited — option (c).',
  d: 3, c: 'analysis', t: [2],
}));
add('lamarck-tf', tf({
  stem: "Lamarck's theory is also called the theory of inheritance of acquired characters.",
  key: 't',
  sol: 'True. Lamarck proposed that changes acquired by use or disuse are passed on.',
  d: 1, c: 'recall', t: [2],
}));
add('vestigial-fill', fill({
  stem: 'Organs that are reduced and have no clear function, though they were useful in our ancestors, are called ______ organs.',
  acc: [['vestigial']],
  sol: 'Vestigial organs.',
  d: 1, c: 'recall', t: [2],
}));
add('usedisuse-term', short({
  marks: 1, wl: null,
  stem: "Give the term: Lamarck's idea that organs used often grow larger and stronger, while those not used become smaller.",
  model: '**Use and disuse of organs.**',
  sol: 'Use and disuse.', scheme: [['Use and disuse', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('odd-vestigial', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Vermiform appendix, Wisdom teeth, Muscles that move the ear, Thumb.',
  model: '**Thumb**; the others are **vestigial organs** in humans.',
  sol: 'The thumb is fully functional.', scheme: [['Odd one and category', 1]],
  d: 2, c: 'analysis', t: [2],
}));
add('reason-lamarck', short({
  marks: 1, wl: null,
  stem: "Give reason: Lamarck's theory was not accepted.",
  model: 'Experiments such as **Weismann\'s** showed that **acquired characters are not inherited**; only changes in the **genes of the sex cells** are passed on.',
  sol: 'Acquired characters not inherited.', scheme: [['Acquired characters are not inherited', 1]],
  d: 3, c: 'understanding', t: [2],
}));
add('lamarck-points-short', short({
  marks: 2,
  stem: "State the two main ideas of Lamarck's theory.",
  model: '1. **Use and disuse:** organs that are used a lot grow larger and stronger; those not used shrink and may disappear.\n2. **Inheritance of acquired characters:** changes gained in this way during life are **passed on** to the young.',
  sol: 'Use and disuse; inheritance of acquired characters.',
  scheme: [['Use and disuse', 1], ['Inheritance of acquired characters', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('vestigial-short', short({
  marks: 2,
  stem: 'Name two vestigial organs in humans, and state how Lamarck explained such organs.',
  model: 'Examples: the **vermiform appendix** and the **tail bones (coccyx)**; also wisdom teeth and ear muscles. Lamarck said they became small through **disuse**, and the reduced size was **inherited** by later generations.',
  sol: 'Two organs; disuse.',
  scheme: [['Two vestigial organs', 1], ['Disuse and inheritance', 1]],
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 Darwin: natural selection; peppered moth
add('fittest-mcq', mcq({
  stem: '"Survival of the fittest" means that',
  right: 'individuals with variations best suited to their surroundings survive and reproduce more', wrong: ['the strongest animals always win fights', 'all individuals of a species survive equally', 'organisms change their bodies on purpose to suit their needs'],
  sol: 'Fitness means being better suited to the environment, which leads to more surviving offspring — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('overprod-mcq', mcq({
  stem: 'A pair of rabbits could in theory have millions of descendants in a few years, yet the number of rabbits in a meadow stays about the same. Darwin called the first fact',
  right: 'overproduction (geometric increase)', wrong: ['inheritance of acquired characters', 'use and disuse', 'vestigial organs'],
  sol: 'Living things produce far more young than can survive — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('struggle-mcq', mcq({
  stem: 'Two male deer fighting for the same territory is an example of',
  right: 'struggle within a species (intraspecific struggle)', wrong: ['struggle between different species', 'struggle against the environment', 'use and disuse of organs'],
  sol: 'Both deer belong to the same species and compete for the same resource — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('moth-mcq', mcq({
  stem: 'Before industrial pollution in England, the light form of the peppered moth was more common because',
  right: 'it was hidden on pale, lichen-covered tree trunks and escaped birds', wrong: ['dark moths could not fly in clean air', 'light moths laid more eggs in clean air', 'birds preferred to eat light moths'],
  sol: 'Camouflage on pale bark protected the light form from birds — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('revival-mcq', mcq({
  stem: 'After clean-air laws reduced soot, the light form of the peppered moth became common again in industrial areas. This supports',
  right: 'natural selection, because the cleaner bark changed which form was better hidden', wrong: ["Lamarck's theory, because the moths chose to change colour", 'the idea that soot directly bleached the moths', 'the inheritance of characters acquired by use'],
  sol: 'As bark grew paler, birds again picked off the dark moths, so selection favoured the light form — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('darwin-giraffe-mcq', mcq({
  stem: 'According to Darwin, giraffes came to have long necks because',
  right: 'giraffes that happened to be born with longer necks got more food, survived and passed on the trait', wrong: ['each giraffe stretched its neck and passed on the stretch', 'giraffes needed long necks and so grew them', 'the climate directly lengthened their necks'],
  sol: 'Natural variation plus selection by food supply, not use, explains the long neck — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('melanism-ar', ar({
  a: 'The dark form of the peppered moth became common because soot turned light moths black.',
  r: 'Birds ate more of the moths that stood out against the tree bark.',
  key: 'b',
  sol: 'The assertion is false: soot did not change the colour of moths; the dark form was already present and survived better. The reason is true — option (b).',
  d: 3, c: 'analysis', t: [3],
}));
add('beagle-ar', ar({
  a: "Darwin's theory of evolution is called the theory of natural selection.",
  r: 'Darwin collected many of his observations during a long voyage on the ship HMS Beagle.',
  key: 'd',
  sol: 'Both are true, but the voyage does not explain why the theory has that name — option (d).',
  d: 2, c: 'analysis', t: [3],
}));
add('overprod-ar', ar({
  a: 'Overproduction of young leads to a struggle for existence.',
  r: 'Food, space and other resources are limited.',
  key: 'c',
  sol: 'Both are true, and because resources are limited, the many young must compete for them — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
add('variation-tf', tf({
  stem: 'According to Darwin, no two individuals of a species are exactly alike.',
  key: 't',
  sol: 'True. These small differences, or variations, are the raw material for natural selection.',
  d: 1, c: 'understanding', t: [3],
}));
add('fittest-fill', fill({
  stem: 'The idea that only the best-suited individuals survive to reproduce is summed up as "survival of the ______".',
  acc: [['fittest']],
  sol: 'Survival of the fittest.',
  d: 1, c: 'recall', t: [3],
}));
add('melanism-term', short({
  marks: 1, wl: null,
  stem: 'Give the term: the rise in the number of dark-coloured forms of a species in areas darkened by industrial soot.',
  model: '**Industrial melanism.**',
  sol: 'Industrial melanism.', scheme: [['Industrial melanism', 1]],
  d: 2, c: 'recall', t: [3],
}));
add('odd-darwin', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Overproduction, Struggle for existence, Variation, Use and disuse.',
  model: '**Use and disuse**; the others are **points of Darwin\'s theory of natural selection**.',
  sol: 'Use and disuse is Lamarck\'s idea.', scheme: [['Odd one and category', 1]],
  d: 2, c: 'analysis', t: [2, 3],
}));
add('reason-dark', short({
  marks: 1, wl: null,
  stem: 'Give reason: dark peppered moths survived better than light ones in soot-covered woods.',
  model: 'Dark moths were **camouflaged** on the dark bark, so **birds could not easily see** and eat them.',
  sol: 'Camouflage from birds.', scheme: [['Camouflaged from predators', 1]],
  d: 2, c: 'application', t: [3],
}));
add('lam-dar-short', short({
  marks: 2,
  stem: "Distinguish between Lamarck's and Darwin's explanations of the giraffe's long neck.",
  model: "**Lamarck:** giraffes **stretched** their necks to reach leaves, the necks lengthened by use, and this **acquired** length was passed on.\n**Darwin:** giraffes were **born** with necks of different lengths; those with longer necks got more food, **survived** and passed on the trait.",
  sol: 'Use and inheritance vs variation and selection.',
  scheme: [['Lamarck', 1], ['Darwin', 1]],
  d: 3, c: 'analysis', t: [2, 3],
}));
add('darwin-points-short', short({
  marks: 3,
  stem: "Each year far more caterpillars hatch on a farmer's cabbages than ever become butterflies, yet the number of butterflies stays about the same. Using this example, explain in three points how Darwin's natural selection works.",
  model: '1. **Overproduction:** the butterflies lay far more eggs than can ever survive.\n2. **Struggle for existence:** the caterpillars compete for limited cabbage leaves and are eaten by birds, so most die.\n3. **Variation and survival of the fittest:** the caterpillars differ, for example in colour; the best-hidden survive, breed and **pass on** that trait, so it becomes common over generations.',
  sol: 'Overproduction, struggle, variation, survival of the fittest, inheritance.',
  scheme: [['Overproduction', 1], ['Struggle for existence', 1], ['Variation, survival of the fittest and inheritance', 1]],
  d: 3, c: 'application', t: [3],
}));
add('moth-num', num({
  stem: `In a survey in a soot-darkened wood, ${SURVEY.polluted.dark} of the ${SURVEY.polluted.total} peppered moths found were of the dark form. What percentage were dark?`,
  value: SURVEY.polluted.pctDark, unit: '%',
  sol: `$\\dfrac{${SURVEY.polluted.dark}}{${SURVEY.polluted.total}} \\times 100 = ${SURVEY.polluted.pctDark}$ per cent.`,
  scheme: [[`${SURVEY.polluted.pctDark} per cent`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => q.answer.value === 90 || 'value');

// ---------------------------------------------------------------- 5-mark Question 2 style items
add('ancestors-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [Australopithecus, Homo habilis, Homo erectus, Neanderthal, Cro-Magnon, chin, fire, cave paintings]\n\nThe earliest ancestor in the human line was (a) ______, which walked on two legs but had a small brain. (b) ______ was the first to make stone tools. (c) ______ walked fully upright and was the first to use (d) ______. Cro-Magnon man is famous for its (e) ______.',
  acc: [['Australopithecus'], ['Homo habilis'], ['Homo erectus'], ['fire'], ['cave paintings']],
  sol: '(a) Australopithecus; (b) Homo habilis; (c) Homo erectus; (d) fire; (e) cave paintings.',
  d: 2, c: 'understanding', t: [1],
}));
add('darwin-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [overproduction, struggle, variations, natural selection, fittest, acquired, disuse, Lamarck]\n\nLiving things produce more young than can survive; this is called (a) ______. Since food and space are limited, there is a (b) ______ for existence. No two individuals are alike, and useful (c) ______ help some to survive. This survival of the (d) ______ over many generations is called (e) ______.',
  acc: [['overproduction'], ['struggle'], ['variations', 'variation'], ['fittest'], ['natural selection']],
  sol: '(a) overproduction; (b) struggle; (c) variations; (d) fittest; (e) natural selection.',
  d: 2, c: 'understanding', t: [3],
}));
add('skull-match5', match({
  marks: 5,
  stem: 'Study the figure of two skulls and match each lettered feature with the correct description.',
  pairs: [
    ['A', 'Thick bony ridge above the eyes, much reduced in modern humans'],
    ['B', 'Large, high braincase holding a brain of about 1400 cubic centimetres'],
    ['C', 'Bony point of the lower jaw, found only in Cro-Magnon and modern humans'],
    ['D', 'Long, pointed tooth that became smaller during human evolution'],
    ['E', 'Forward-jutting jaws, replaced by a flat face in modern humans'],
  ],
  order: [1, 4, 2, 0, 3],
  sol: 'A brow ridge; B braincase (cranium); C chin; D canine; E projecting jaws.',
  d: 3, c: 'application', t: [1],
  assets: [skullFig],
}));

// ---------------------------------------------------------------- case-based (10 marks, Section B style)
add('moth-case', mk.case({
  stem: 'Study the figure and the data, and answer the questions.',
  passage: `Students studied a model of an experiment on the peppered moth. Equal numbers of light and dark moths (${RECAP.released} of each) were marked and released in a soot-darkened wood. A few days later, ${RECAP.darkBack} dark and ${RECAP.lightBack} light marked moths were caught again; the rest had mostly been eaten by birds. A survey in a clean wood with lichen-covered trees found ${SURVEY.clean.dark} dark and ${SURVEY.clean.light} light moths.`,
  d: 3, c: 'analysis',
  assets: [mothFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Which form survived better in the soot-darkened wood?', model: 'The **dark form.**', sol: 'Dark form.', scheme: [['Dark form', 1]], d: 1, c: 'application', t: [3] })),
    part('b', num({ stem: 'How many times as many dark moths as light moths were caught again?', value: RECAP.times, sol: `${RECAP.darkBack} ÷ ${RECAP.lightBack} = ${RECAP.times} times.`, scheme: [[`${RECAP.times} times`, 1]], d: 2, c: 'application', t: [3] })),
    part('c', num({ marks: 2, stem: 'What percentage of the moths in the clean wood were dark?', value: SURVEY.clean.pctDark, unit: '%', sol: `Total $= ${SURVEY.clean.dark} + ${SURVEY.clean.light} = ${SURVEY.clean.total}$; dark $= \\dfrac{${SURVEY.clean.dark}}{${SURVEY.clean.total}} \\times 100 = ${SURVEY.clean.pctDark}$ per cent.`, scheme: [['Total found', 1], [`${SURVEY.clean.pctDark} per cent`, 1]], d: 2, c: 'application', t: [3] })),
    part('d', short({ marks: 3, stem: 'Using natural selection, explain why the dark form became common in industrial areas of England in the 1800s.', model: 'Soot killed the pale lichens and **blackened the tree bark**. On dark bark, the dark moths were **camouflaged**, while light moths stood out and were **eaten by birds**. More dark moths **survived and bred**, passing on their colour, so over many generations the dark form became **common**.', sol: 'Camouflage, predation, survival, inheritance.', scheme: [['Bark darkened by soot', 1], ['Light moths eaten; dark moths hidden', 1], ['Dark moths bred and passed on the trait', 1]], d: 3, c: 'analysis', t: [3] })),
    part('e', short({ marks: 3, stem: 'After clean-air laws were passed, the light form slowly increased again. Explain why this supports Darwin rather than Lamarck.', model: 'As soot fell, the bark grew **paler** again, so the **light form** was now better hidden and survived more. The change came from **birds selecting** among moths that were **already different** in colour, not from moths changing their colour by effort or use, as Lamarck would suggest. This is **natural selection**.', sol: 'Selection of existing variants.', scheme: [['Bark became pale again', 1], ['Light moths now survive better', 1], ['Selection of existing variation, not acquired change', 1]], d: 4, c: 'analysis', t: [2, 3] }), [
      short({ marks: 3, stem: 'Name the term for this change in the moth population and state three points of Darwin\'s theory that it illustrates.', model: '**Industrial melanism.** It shows (1) **variation**: light and dark forms exist; (2) **struggle for existence**: moths must escape birds; (3) **survival of the fittest**: the better-hidden form survives and breeds, so it becomes common.', sol: 'Industrial melanism; variation, struggle, survival.', scheme: [['Industrial melanism', 1], ['Two points', 1], ['Third point', 1]], d: 3, c: 'application', t: [3] }),
    ]),
  ],
}));
add('giraffe-case', mk.case({
  stem: 'Study the figure and answer the questions.',
  passage: "The figure compares two explanations of how the giraffe came to have a long neck. The top row follows one scientist's idea and the bottom row another's.",
  d: 3, c: 'analysis',
  assets: [giraffeFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Whose theory is shown in the top row?', model: '**Lamarck\'s** theory.', sol: 'Lamarck.', scheme: [['Lamarck', 1]], d: 1, c: 'application', t: [2] })),
    part('b', short({ marks: 2, stem: 'Explain the idea shown in the top row.', model: 'Giraffes **stretched** their necks to reach leaves high up. By this constant **use** their necks grew a little longer, and the **acquired** longer neck was passed on to their young. Over many generations the neck became very long.', sol: 'Use and inheritance of acquired characters.', scheme: [['Use lengthens the neck', 1], ['Acquired change inherited', 1]], d: 2, c: 'understanding', t: [2] })),
    part('c', short({ marks: 2, stem: 'Explain the idea shown in the bottom row.', model: 'Giraffes are **born** with necks of different lengths (**variation**). When food is only high up, those with **longer necks** get more food and **survive**, while short-necked ones starve. The survivors **breed** and pass on long necks, so the trait becomes common.', sol: 'Variation and natural selection.', scheme: [['Variation present at birth', 1], ['Long-necked survive and pass it on', 1]], d: 2, c: 'understanding', t: [3] })),
    part('d', short({ marks: 3, stem: "Describe an experiment that was used to reject the top-row idea, and state its conclusion.", model: '**Weismann** cut off the **tails of mice** and bred them, repeating this for **many generations**. Every new generation was still born with **normal tails**. He concluded that changes made to the body during life (**acquired characters**) are **not inherited**; only what is carried in the sex cells is passed on.', sol: "Weismann's mice.", scheme: [['Tails of mice cut for many generations', 1], ['Young always had normal tails', 1], ['Acquired characters not inherited', 1]], d: 3, c: 'analysis', t: [2] })),
    part('e', short({ marks: 2, stem: 'Name two vestigial organs in humans and state how Darwin would explain their small size.', model: 'The **vermiform appendix** and the **coccyx** (tail bones). Darwin would say that once they were no longer useful, **natural selection** no longer kept them large, so over many generations smaller forms were not at a disadvantage and became common.', sol: 'Two organs; selection, not use.', scheme: [['Two vestigial organs', 1], ['Explanation by selection', 1]], d: 3, c: 'analysis', t: [2, 3] }), [
      short({ marks: 2, stem: "Give two examples from everyday life which show that characters acquired during a person's life are not inherited.", model: "1. The **children of a body-builder** are not born with large muscles.\n2. A person who loses a finger in an accident has **children with normal hands**; likewise, children of parents with pierced ears are born without holes.", sol: 'Two everyday examples.', scheme: [['First example', 1], ['Second example', 1]], d: 2, c: 'application', t: [2] }),
    ]),
  ],
}));
add('skull-case', mk.case({
  stem: 'Study the figure and answer the questions.',
  passage: 'The figure shows side views of the skull of an early human ancestor (left) and of a modern human (right), with five features lettered A to E.',
  d: 3, c: 'application',
  assets: [skullFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Which skull belongs to the more recent species? Give one visible reason.', model: 'The **right-hand** skull: it has a **chin** (or a high, rounded braincase).', sol: 'Right skull.', scheme: [['Right, with a reason', 1]], d: 1, c: 'application', t: [1] })),
    part('b', short({ marks: 2, stem: 'Name the feature A and state how it changed during human evolution.', model: 'A is the **brow ridge**, the bony ridge above the eye sockets. It was **heavy and prominent** in early ancestors and became **much smaller** in modern humans.', sol: 'Brow ridge; became smaller.', scheme: [['Brow ridge', 1], ['Became smaller', 1]], d: 2, c: 'understanding', t: [1] })),
    part('c', short({ marks: 2, stem: 'Name the feature C. In which two forms in the human line is it found?', model: 'C is the **chin**, the forward point of the lower jaw. It is found in **Cro-Magnon man** and in **modern humans**, but not in earlier ancestors such as Neanderthal man.', sol: 'Chin; Cro-Magnon and modern man.', scheme: [['Chin', 1], ['Cro-Magnon and modern man', 1]], d: 2, c: 'recall', t: [1] })),
    part('d', num({ stem: `The braincase B holds about ${CC.mod} cubic centimetres, while that of the early ancestor holds about ${CC.aus}. By how many cubic centimetres is B larger?`, value: ccRise, unit: 'cubic centimetres', sol: `${CC.mod} − ${CC.aus} = ${ccRise} cubic centimetres.`, scheme: [[`${ccRise}`, 1]], d: 1, c: 'application', t: [1] })),
    part('e', short({ marks: 1, wl: null, stem: 'Name the feature D.', model: '**Canine** (a long, pointed tooth).', sol: 'Canine.', scheme: [['Canine', 1]], d: 1, c: 'recall', t: [1] })),
    part('f', short({ marks: 3, stem: 'Apart from the skull, state three other changes seen from Australopithecus to modern humans.', model: '1. Posture became **fully erect**, with efficient walking on two legs.\n2. **Body hair** became much **less**.\n3. **Height** increased, and the hands were used for ever finer **tool-making**.', sol: 'Posture, body hair, height.', scheme: [['First change', 1], ['Second change', 1], ['Third change', 1]], d: 2, c: 'understanding', t: [1] })),
  ],
}));
add('museum-case', mk.case({
  stem: 'Study the bar chart and answer the questions.',
  passage: `A museum gallery shows models of six members of the human line, each with a card giving its approximate cranial capacity in cubic centimetres: ${ANCESTORS.map((a) => `${a.name}, ${a.cc}`).join('; ')}.`,
  d: 3, c: 'analysis',
  assets: [ccFig],
  children: [
    part('a', short({ marks: 2, wl: null, stem: 'Arrange the first five members of the list in the order in which they appeared, from the earliest.', model: '**Australopithecus → Homo habilis → Homo erectus → Neanderthal man → Cro-Magnon man.**', sol: 'Correct order.', scheme: [['First three in order', 1], ['Last two in order', 1]], d: 1, c: 'recall', t: [1] })),
    part('b', short({ marks: 1, wl: null, stem: 'Which member had the largest cranial capacity?', model: '**Cro-Magnon man.**', sol: 'Cro-Magnon man.', scheme: [['Cro-Magnon man', 1]], d: 1, c: 'application', t: [1] })),
    part('c', short({ marks: 2, stem: 'Name the member that first made stone tools and the one that first used fire.', model: 'Stone tools: **Homo habilis**, the "handy man". Fire: **Homo erectus**, the "upright man", who also walked fully erect.', sol: 'Habilis; erectus.', scheme: [['Homo habilis', 1], ['Homo erectus', 1]], d: 2, c: 'recall', t: [1] })),
    part('d', short({ marks: 2, stem: 'Describe the Neanderthal model in two points, other than its brain size.', model: '1. **Heavy brow ridges**, a sloping forehead and **little or no chin**.\n2. A short, **stocky**, strongly built body; they **buried their dead** and lived in caves.', sol: 'Face; body and habits.', scheme: [['Facial features', 1], ['Body or habits', 1]], d: 2, c: 'understanding', t: [1] })),
    part('e', short({ marks: 3, stem: 'A larger brain is linked with an upright posture and free hands. Explain how walking upright could have helped the evolution of a larger brain.', model: 'Walking on two legs **freed the hands** for carrying food and **making tools**. Tool-making and using fire needed **planning and skill**, so individuals with **larger, more capable brains** survived and reproduced better. Over many generations, natural selection **favoured bigger brains**.', sol: 'Free hands, tool use, selection for brains.', scheme: [['Hands freed', 1], ['Tool use needs skill and planning', 1], ['Selection favoured larger brains', 1]], d: 3, c: 'analysis', t: [1, 3] })),
  ],
}));
add('beetle-case', mk.case({
  passage: `On an island, leaf beetles live on green shrubs. Each pair of beetles lays about ${BEETLE.eggsPerPair} eggs in a season, yet the number of beetles stays about the same year after year. The beetles are green or brown. Birds catch the beetles they can see, and after some years almost all the beetles on the green shrubs are green.`,
  d: 3, c: 'application',
  children: [
    part('a', num({ marks: 2, stem: 'If the population stays steady, on average only two young from each pair survive to breed. What percentage of the eggs is this?', value: BEETLE.pctSurvive, unit: '%', sol: `$\\dfrac{${BEETLE.survivorsPerPair}}{${BEETLE.eggsPerPair}} \\times 100 = ${BEETLE.pctSurvive}$ per cent.`, scheme: [['Two out of the eggs laid', 1], [`${BEETLE.pctSurvive} per cent`, 1]], d: 2, c: 'application', t: [3] })),
    part('b', short({ marks: 2, stem: 'Name the two points of Darwin\'s theory shown by the large number of eggs and the steady population.', model: '**Overproduction** (far more eggs than can survive) and the **struggle for existence** (most young die in competition for food and space, from enemies and weather).', sol: 'Overproduction; struggle for existence.', scheme: [['Overproduction', 1], ['Struggle for existence', 1]], d: 2, c: 'understanding', t: [3] })),
    part('c', short({ marks: 3, stem: 'Explain why almost all the beetles on the green shrubs became green.', model: 'There was **variation**: some beetles were green and some brown. On green leaves the **green beetles were camouflaged**, while brown ones were easily seen and **eaten by birds**. The green beetles **survived and bred**, passing on their colour, so their number rose over the years: **natural selection**.', sol: 'Variation, predation, survival, inheritance.', scheme: [['Variation in colour', 1], ['Brown beetles eaten', 1], ['Green beetles bred and passed on colour', 1]], d: 3, c: 'analysis', t: [3] })),
    part('d', short({ marks: 1, wl: null, stem: 'Give the phrase Darwin\'s supporters used for the success of the green beetles.', model: '**Survival of the fittest.**', sol: 'Survival of the fittest.', scheme: [['Survival of the fittest', 1]], d: 1, c: 'recall', t: [3] })),
    part('e', short({ marks: 2, stem: 'Suppose a long drought turned the shrubs brown for many years. Predict what would happen to the beetle population, and why.', model: 'The **brown beetles** would now be **better hidden** and the green ones eaten more. Over several generations the **proportion of brown beetles would rise** by natural selection.', sol: 'Brown would increase.', scheme: [['Brown beetles increase', 1], ['Because they are now camouflaged', 1]], d: 3, c: 'analysis', t: [3] }), [
      short({ marks: 2, stem: 'How would Lamarck have explained the green colour of the beetles? Why is this explanation not accepted?', model: 'Lamarck might say the beetles **became green** by living on green leaves and **passed on** this acquired colour. It is not accepted because **acquired characters are not inherited**; the green colour was already present as a **variation**.', sol: 'Acquired colour; not inherited.', scheme: [["Lamarck's explanation", 1], ['Acquired characters not inherited', 1]], d: 3, c: 'analysis', t: [2] }),
    ]),
  ],
}));
add('weismann-case', mk.case({
  passage: 'In the 1880s, the German biologist August Weismann cut off the tails of mice and bred them, then cut off the tails of their young and bred those too, over many generations. Every generation of baby mice was born with tails of normal length.',
  d: 3, c: 'analysis',
  children: [
    part('a', short({ marks: 1, wl: null, stem: "Whose theory was Weismann testing?", model: "**Lamarck's** theory of inheritance of acquired characters.", sol: 'Lamarck.', scheme: [['Lamarck', 1]], d: 1, c: 'application', t: [2] })),
    part('b', short({ marks: 1, wl: null, stem: 'What did the result show?', model: 'That **acquired characters are not inherited**.', sol: 'Acquired characters not inherited.', scheme: [['Not inherited', 1]], d: 2, c: 'understanding', t: [2] })),
    part('c', short({ marks: 2, stem: 'Why was the loss of the tail not passed on to the young?', model: 'Cutting the tail changed only the **body cells** of the parent. The **sex cells** and the **genes** they carry were unchanged, and only these are passed on to the young.', sol: 'Sex cells unchanged.', scheme: [['Only body changed', 1], ['Genes in sex cells unchanged and inherited', 1]], d: 3, c: 'analysis', t: [2] })),
    part('d', short({ marks: 2, stem: 'State the two main ideas of the theory being tested.', model: '1. **Use and disuse:** organs grow with use and shrink with disuse.\n2. **Inheritance of acquired characters:** such changes are passed on to the next generation.', sol: 'Use and disuse; inheritance.', scheme: [['Use and disuse', 1], ['Inheritance of acquired characters', 1]], d: 1, c: 'recall', t: [2] })),
    part('e', short({ marks: 2, stem: 'A critic says the experiment is not a fair test of the theory. Suggest why, in terms of use and disuse.', model: 'The theory speaks of changes caused by **use or disuse** over a long time, but cutting a tail is an **injury**, not disuse. Even so, no case of an acquired change being **inherited** has been shown.', sol: 'Injury is not disuse.', scheme: [['Cutting is injury, not disuse', 1], ['Still no inherited acquired change', 1]], d: 4, c: 'evaluation', t: [2] })),
    part('f', short({ marks: 2, stem: 'Which theory replaced this one as the accepted explanation of evolution? Name its central idea.', model: "**Darwin's theory**, whose central idea is **natural selection**: individuals with useful variations survive and reproduce more, so the variations spread.", sol: 'Darwin; natural selection.', scheme: [['Darwin', 1], ['Natural selection', 1]], d: 2, c: 'understanding', t: [3] })),
  ],
}));

// ---------------------------------------------------------------- further bank items
add('posture-mcq', mcq({
  stem: `A museum skeleton is upright but slightly stooped, short and stocky, with a skull of about ${CC.nea} cubic centimetres, heavy brow ridges and almost no chin. It is most likely a model of`,
  right: 'Neanderthal man', wrong: ['Australopithecus', 'Homo habilis', 'Cro-Magnon man'],
  sol: 'A large brain with heavy brow ridges, no chin and a stocky build fits Neanderthal man; Cro-Magnon had a chin and was tall — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('canine-tf', tf({
  stem: 'The canine teeth became larger during human evolution.',
  key: 'f',
  sol: 'False. The canines became smaller as the diet and the use of tools changed.',
  d: 1, c: 'understanding', t: [1],
}));
add('appendix-ar', ar({
  a: 'The vermiform appendix is a vestigial organ in humans.',
  r: 'The vermiform appendix helps humans to digest large amounts of cellulose.',
  key: 'a',
  sol: 'The assertion is true. The reason is false: humans cannot digest much cellulose, and the appendix has no clear digestive role — option (a).',
  d: 2, c: 'analysis', t: [2],
}));
add('inter-mcq', mcq({
  stem: 'A leopard chasing a deer for food is an example of',
  right: 'struggle between different species (interspecific struggle)', wrong: ['struggle within a species', 'struggle against the environment', 'inheritance of acquired characters'],
  sol: 'The leopard and the deer belong to different species — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('selection-term', short({
  marks: 1, wl: null,
  stem: 'Give the term: the process by which organisms with useful variations survive and reproduce more than others.',
  model: '**Natural selection.**',
  sol: 'Natural selection.', scheme: [['Natural selection', 1]],
  d: 1, c: 'recall', t: [3],
}));
