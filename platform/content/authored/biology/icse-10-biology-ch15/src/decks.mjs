// ICSE 10 Biology ch15 Human Evolution — Part 1 (t01), Part 2 (t02–t03).
import { sl, deck, table, flow, svgV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { SKULLS, CRANIAL, GIRAFFE, MOTHS } from './svgs.mjs';
import { CC, ccRatio, ccRise, SURVEY, RECAP } from './calc.mjs';

export const V = {
  skulls: svgV(SKULLS, 'Skulls of an early ancestor and a modern human compared'),
  cranial: svgV(CRANIAL, 'Approximate cranial capacities of six members of the human line'),
  giraffe: svgV(GIRAFFE, "Lamarck's and Darwin's explanations of the giraffe's long neck"),
  moths: svgV(MOTHS, 'Light and dark peppered moths on pale and soot-darkened bark'),
  sequence: flow('LR', [['a', 'Australopithecus'], ['h', 'Homo habilis'], ['e', 'Homo erectus'], ['n', 'Neanderthal man'], ['c', 'Cro-Magnon man'], ['m', 'Modern man']], [['a', 'h'], ['h', 'e'], ['e', 'n'], ['n', 'c'], ['c', 'm']], 'Flow of the human line: Australopithecus, Homo habilis, Homo erectus, Neanderthal man, Cro-Magnon man, modern man'),
  darwin: flow('TB', [['o', 'Overproduction'], ['s', 'Struggle for existence'], ['v', 'Variation'], ['f', 'Survival of the fittest'], ['i', 'Useful variations inherited'], ['n', 'New species over many generations']], [['o', 's'], ['s', 'f'], ['v', 'f'], ['f', 'i'], ['i', 'n']], "Flow of Darwin's theory: overproduction leads to a struggle for existence; together with variation this leads to survival of the fittest; useful variations are inherited and new species arise over many generations"),
};

export const deck1 = deck({
  part: 1,
  title: 'Human Evolution — Part 1: Our ancestors',
  goals: [
    'Arrange the human ancestors from Australopithecus to modern man in sequence',
    'Compare them in posture, cranial capacity, canines, brow ridges, chin, body hair and height',
    'Identify a human ancestor from a description of its features',
  ],
  slides: [
    sl('title', 'Human Evolution', {
      b: 'Part 1 — the members of the human line and how their bodies changed.',
      v: V.sequence,
      n: 'Fossils of skulls, teeth and bones tell the story of our family tree. In this part we meet six members of the human line, from small brained Australopithecus to modern humans, and trace how the body and brain changed along the way.',
    }),
    sl('concept', 'The members of the human line', {
      v: table(['Member', 'Known for'], [['Australopithecus', 'Walked on two legs; small brain'], ['Homo habilis', '"Handy man": first stone tools'], ['Homo erectus', '"Upright man": fully erect; used fire'], ['Neanderthal man', 'Large brain; heavy brow ridges; buried the dead'], ['Cro-Magnon man', 'Tall; chin; cave paintings; fine tools'], ['Modern man (Homo sapiens sapiens)', 'Language, farming, cities']], 'Table of six members of the human line and what each is known for'),
      n: 'Learn each member by one key idea. Australopithecus walked upright. Homo habilis made the first tools. Homo erectus used fire. Neanderthals buried their dead. Cro Magnon people painted caves. And modern humans built farms and cities.',
    }),
    sl('diagram', 'Skulls compared', {
      b: 'Early skulls: **low braincase**, **sloping forehead**, **heavy brow ridges**, **projecting jaws**, **large canines**, **no chin**. Modern skull: **high, rounded braincase**, **steep forehead**, **small brow ridges**, **flat face**, **chin**.',
      v: V.skulls,
      n: 'Put the two skulls side by side. The early skull has a low braincase, a heavy ridge over the eyes and jaws that jut forward with no chin. The modern skull is tall and rounded, with a flat face and a clear chin.',
    }),
    sl('check', 'Quick check: a modern feature', {
      b: 'Which feature is present in modern humans but absent in Australopithecus?',
      chk: 'chin-mcq',
      n: 'Look at the front of the lower jaw.',
    }),
    sl('diagram', 'Bigger brains', {
      b: `Approximate cranial capacity rose from about **${CC.aus}** cubic centimetres in Australopithecus to about **${CC.cro}** in Cro-Magnon man; modern humans average about **${CC.mod}**.`,
      v: V.cranial,
      n: 'Cranial capacity is the volume of the braincase. It almost trebled along the human line. Notice that Neanderthal and Cro Magnon brains were as large as ours or larger, so brain size alone does not explain everything about modern humans.',
    }),
    sl('concept', 'Comparing the ancestors', {
      v: table(['Feature', 'Early ancestors', 'Modern humans'], [['Posture and walking', 'Partly stooped; walked on two legs', 'Fully erect'], ['Cranial capacity', `About ${CC.aus}–${CC.ere} cubic centimetres`, `About ${CC.mod} cubic centimetres`], ['Canines', 'Large', 'Small'], ['Brow ridges', 'Heavy', 'Small'], ['Chin', 'Absent', 'Prominent'], ['Body hair', 'Thick', 'Sparse'], ['Height', 'Short (about a metre and a half or less)', 'Taller']], 'Table comparing early ancestors and modern humans in seven features'),
      n: 'Seven features change in a clear direction. Posture becomes fully upright. The brain grows. Canines, brow ridges and body hair shrink. A chin appears. And height increases.',
    }),
    sl('example', 'Worked example 1: name the fossil', {
      b: 'A skull has no chin, heavy brow ridges and a braincase of about 1000 cubic centimetres; the leg bones show a fully upright stance.',
      ul: ['Step 1: **no chin** rules out Cro-Magnon and modern man.', `Step 2: about **1000** is larger than Australopithecus (${CC.aus}) and Homo habilis (${CC.hab}) but smaller than Neanderthal man (${CC.nea}).`, 'Step 3: fully upright: **Homo erectus**.'],
      v: table(['Clue', 'Rules out'], [['No chin', 'Cro-Magnon man, modern man'], ['About 1000 cubic centimetres', 'Australopithecus, Homo habilis, Neanderthal man'], ['Fully upright', 'Australopithecus (partly stooped)']], 'Worked table: each clue and the ancestors it rules out, leaving Homo erectus'),
      n: 'Use the clues to cross names off the list. No chin removes the two most recent forms. A braincase of about a thousand cubic centimetres removes the smallest and the largest. What is left is Homo erectus.',
    }),
    sl('check', 'Quick check: the handy man', {
      b: 'Fill in: Homo habilis is known as the ______ man.',
      chk: 'habilis-fill',
      n: 'It made the first stone tools.',
    }),
    sl('example', 'Worked example 2: how much bigger?', {
      b: 'Compare the braincase of Australopithecus with ours.',
      ul: [`Step 1: difference = ${CC.mod} − ${CC.aus} = **${ccRise}** cubic centimetres.`, `Step 2: ratio = ${CC.mod} ÷ ${CC.aus} = **${ccRatio}** times.`, 'Step 3: state the trend: cranial capacity **increased** along the human line.'],
      v: table(['Measure', 'Value'], [['Australopithecus', String(CC.aus)], ['Modern human', String(CC.mod)], ['Difference', String(ccRise)], ['Times larger', String(ccRatio)]], `Worked table: ${CC.aus} and ${CC.mod} cubic centimetres, a difference of ${ccRise}, about ${ccRatio} times larger`),
      n: `Subtract to find how much more, and divide to find how many times more. Our braincase holds about ${ccRise} cubic centimetres more, nearly three times as much as that of Australopithecus.`,
    }),
    sl('check', 'Quick check: brain size', {
      b: 'True or false: Homo erectus had a larger cranial capacity than Homo habilis.',
      chk: 'erectus-tf',
      n: 'Check the bar chart.',
    }),
    sl('concept', 'Why walking upright mattered', {
      v: flow('LR', [['u', 'Upright walking'], ['h', 'Hands freed'], ['t', 'Tools and fire'], ['b', 'Larger brain favoured']], [['u', 'h'], ['h', 't'], ['t', 'b']], 'Flow: upright walking freed the hands for tools and fire, which favoured a larger brain'),
      n: 'Walking on two legs freed the hands. Free hands could carry food, make tools and tend a fire. These skills needed planning, so individuals with larger, more capable brains did better and left more children.',
    }),
    sl('summary', 'Summary', {
      ul: ['Sequence: Australopithecus → Homo habilis → Homo erectus → Neanderthal man → Cro-Magnon man → modern man.', 'Habilis: tools. Erectus: fully erect, fire. Neanderthal: buried the dead. Cro-Magnon: cave art, chin.', 'Trends: larger brain, smaller canines and brow ridges, chin appears, less body hair, taller, fully erect.'],
      v: table(['Trend', 'Direction'], [['Cranial capacity', 'Increases'], ['Brow ridges, canines, body hair', 'Decrease'], ['Chin', 'Appears']], 'Summary table of the main trends in human evolution'),
      n: 'To recap. Six members, one long story. The brain grew, the face flattened, a chin appeared, and our ancestors stood fully upright, used their hands for tools and fire, and spread across the world.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Learn the **sequence** and one **key fact** for each member.', 'In comparisons, use **matching points**: posture, cranial capacity, canines, brow ridges, chin, body hair, height.', 'Cranial capacities are **approximate**; write "about".', 'Do not say humans evolved **from modern apes**: both share common ancestors.'],
      n: 'Exam tips. Know the order and one fact for each. Compare point against point. Write about before every cranial capacity. And remember, humans and apes share ancestors; we did not evolve from the apes alive today.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Human Evolution — Part 2: Lamarck and Darwin',
  goals: [
    "Explain Lamarck's theory using the giraffe's neck and human vestigial organs, and state one criticism",
    "Explain the main points of Darwin's theory of natural selection",
    'Explain the change in peppered moth populations during industrialisation',
  ],
  slides: [
    sl('title', 'How Does Evolution Happen?', {
      b: 'Part 2 — two famous explanations, and the moth that showed natural selection at work.',
      v: flow('LR', [['l', 'Lamarck (1809): acquired characters inherited'], ['d', 'Darwin (1859): natural selection'], ['m', 'Peppered moth: selection observed']], [['l', 'd', 'replaced by'], ['d', 'm', 'supported by']], "Flow: Lamarck's idea of inheritance of acquired characters was replaced by Darwin's natural selection, which was supported by the peppered moth"),
      n: 'Living things change over generations. But how? Lamarck gave the first full answer. Darwin gave a better one, and the story of a small moth in industrial England showed his idea working before people’s eyes.',
    }),
    sl('concept', "Lamarck's theory", {
      v: table(['Idea', 'Meaning'], [['Use and disuse', 'Organs used often grow larger; organs not used shrink'], ['Inheritance of acquired characters', 'Changes gained during life are passed to the young']], "Table of Lamarck's two main ideas"),
      n: 'Lamarck believed that an animal changes its body by using it, and passes the change to its young. A blacksmith’s strong arms, in his view, would give his children strong arms too.',
    }),
    sl('diagram', "The giraffe's neck: two explanations", {
      b: '**Lamarck:** stretching lengthened the neck, and the longer neck was inherited. **Darwin:** necks varied; long-necked giraffes got more food, survived and bred.',
      v: V.giraffe,
      n: 'Top row, Lamarck. A giraffe stretches for leaves, its neck grows, and its young are born with longer necks. Bottom row, Darwin. Giraffes are born with different necks. When food is high up, the short necked ones starve, and long necks spread.',
    }),
    sl('concept', 'Vestigial organs in humans', {
      b: '**Vestigial organs** are reduced organs with no clear use, though they were useful in our ancestors.',
      v: table(['Vestigial organ', 'Useful in ancestors for'], [['Vermiform appendix', 'Digesting plant material'], ['Coccyx (tail bones)', 'Supporting a tail'], ['Ear muscles', 'Moving the ears'], ['Nictitating membrane (eye fold)', 'Cleaning the eye'], ['Wisdom teeth', 'Chewing coarse food']], 'Table of five human vestigial organs and their use in ancestors'),
      n: 'Lamarck said these organs shrank because they were not used, and the shrinking was inherited. Today we explain them by natural selection, but they still show that we come from ancestors who used them.',
    }),
    sl('check', 'Quick check: a reduced organ', {
      b: 'Which of these is a vestigial organ in humans?',
      chk: 'vestigial-mcq',
      n: 'Which one has no clear job?',
    }),
    sl('concept', 'Why Lamarck was rejected', {
      v: table(['Evidence', 'What it showed'], [["Weismann cut the tails of mice for many generations", 'Young were always born with normal tails'], ["A wrestler's or body-builder's children", 'Not born with large muscles'], ['Pierced ears for generations', 'Babies are born without holes']], "Table of evidence against Lamarck's theory"),
      n: 'Weismann cut the tails off mice, generation after generation, yet every baby had a normal tail. Changes to the body during life do not reach the sex cells, so they are not inherited. Lamarck’s second idea failed the test.',
    }),
    sl('diagram', "Darwin's theory of natural selection", {
      b: '**Overproduction → struggle for existence → variation → survival of the fittest → inheritance of useful variations → new species.**',
      v: V.darwin,
      n: 'Darwin noticed that living things produce far more young than can survive. They struggle for food and space. No two are alike. Those with useful differences survive and pass them on. Over many generations this natural selection can produce new species.',
    }),
    sl('example', "Worked example 1: Darwin's giraffe, step by step", {
      b: "Apply Darwin's points one by one.",
      ul: ['Step 1, **overproduction:** many young giraffes are born.', 'Step 2, **variation:** their necks differ in length.', 'Step 3, **struggle and survival:** when low leaves run out, the longest necks reach food; short-necked young starve.', 'Step 4, **inheritance:** survivors pass on long necks; the average neck lengthens over generations.'],
      v: table(['Darwin point', 'Giraffe'], [['Overproduction', 'Many young'], ['Variation', 'Necks of different lengths'], ['Survival of the fittest', 'Long necks reach food'], ['Inheritance', 'Long necks passed on']], "Worked table matching Darwin's points to the giraffe"),
      n: 'For any example, march through Darwin’s points in order. Too many young, differences among them, a struggle in which some differences help, and inheritance of the helpful ones. That is natural selection.',
    }),
    sl('check', 'Quick check: the phrase', {
      b: 'Fill in: survival of the ______.',
      chk: 'fittest-fill',
      n: 'Best suited, not strongest.',
    }),
    sl('diagram', 'The peppered moth', {
      b: 'Before industry, **light** moths were hidden on pale, lichen-covered bark. When soot blackened the trees, **dark** moths were hidden and light ones were eaten by birds, so the **dark form** became common: **industrial melanism**.',
      v: V.moths,
      n: 'Peppered moths rest on tree trunks by day. In clean woods the light form matches the pale bark and birds pick off the dark ones. In sooty woods the opposite happens. As industry spread, the dark form became common, and as the air was cleaned, the light form returned.',
    }),
    sl('example', 'Worked example 2: moth data', {
      b: `Equal numbers (**${RECAP.released}** of each) of marked light and dark moths were released in a sooty wood; **${RECAP.darkBack}** dark and **${RECAP.lightBack}** light were caught again.`,
      ul: [`Step 1: dark recaptured = ${RECAP.darkBack} of ${RECAP.released} = **${RECAP.pctDark} per cent**; light = **${RECAP.pctLight} per cent**.`, `Step 2: dark survived **${RECAP.times} times** as well as light.`, `Step 3: link to selection: birds found the light moths more easily. A survey there found **${SURVEY.polluted.pctDark} per cent** dark moths.`],
      v: table(['Form', 'Released', 'Recaptured', 'Per cent recaptured'], [['Dark', String(RECAP.released), String(RECAP.darkBack), String(RECAP.pctDark)], ['Light', String(RECAP.released), String(RECAP.lightBack), String(RECAP.pctLight)]], `Worked table: of ${RECAP.released} moths of each form, ${RECAP.darkBack} dark and ${RECAP.lightBack} light were recaptured`),
      n: `Turn the counts into percentages so they can be compared. Forty in a hundred dark moths came back, but only ten in a hundred light ones. Dark moths survived ${RECAP.times} times as well, because birds could not see them on the sooty bark.`,
    }),
    sl('check', 'Quick check: competition', {
      b: 'A leopard chasing a deer for food is an example of…',
      chk: 'inter-mcq',
      n: 'Same species or different species?',
    }),
    sl('concept', 'Lamarck and Darwin compared', {
      v: table(['Point', 'Lamarck', 'Darwin'], [['Cause of change', 'Use and disuse during life', 'Natural selection of existing variations'], ['What is inherited', 'Acquired characters', 'Inborn variations'], ['Giraffe neck', 'Stretching lengthened it', 'Long-necked giraffes survived'], ['Accepted today?', 'No', 'Yes, with the help of genetics']], 'Table comparing Lamarck and Darwin'),
      n: 'Lamarck said bodies change by use and pass the change on. Darwin said bodies already differ at birth, and nature selects the useful differences. Darwin’s idea, supported by genetics, is the one accepted today.',
    }),
    sl('summary', 'Summary', {
      ul: ['Lamarck: use and disuse; inheritance of acquired characters (giraffe, vestigial organs).', "Weismann's mice showed acquired characters are not inherited.", 'Darwin: overproduction, struggle, variation, survival of the fittest, inheritance.', 'Peppered moth: industrial melanism shows natural selection.'],
      v: table(['Theory', 'Key phrase'], [['Lamarck', 'Inheritance of acquired characters'], ['Darwin', 'Natural selection']], 'Summary table of the key phrase for each theory'),
      n: 'To recap. Lamarck thought use changes the body and the change is inherited, but experiments proved him wrong. Darwin showed that nature selects among inborn differences, and the peppered moth let us watch it happen.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Write **acquired** characters for Lamarck and **inborn variations** for Darwin.', 'For the moth, mention **soot**, **lichens**, **camouflage**, **birds** and **inheritance**.', '"Fittest" means **best suited**, not strongest.', 'Give **Weismann** as the criticism of Lamarck.'],
      n: 'Exam tips. Lamarck means acquired, Darwin means inborn variations. In the moth answer, mention soot, lichens, camouflage, birds and inheritance. Fittest means best suited. And name Weismann when you criticise Lamarck.',
    }),
  ],
});
