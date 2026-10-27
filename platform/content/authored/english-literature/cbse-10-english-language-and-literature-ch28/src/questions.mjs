// CBSE 10 English Language and Literature, ch28 "The Making of a Scientist" (Robert W. Peterson) — question bank.
// LITERATURE RULE (CONTEXT §8, D-036): the account is in copyright. Everything here is written in SOYL's own
// words at the level of events and ideas; no sentence, phrase or quoted remark of the account appears.
// Passages are SOYL commentary (passage_origin: soyl-commentary). Students read the chapter in Footprints
// without Feet.
// BOARD PATTERN: the supplementary reader is examined through 3-mark short answers (40–50 words) and a
// 6-mark long answer (100–120 words) on character, theme and values, not through extracts. The bank is
// weighted that way (14 three-mark, 9 long); the 5 commentary passages fill the generic chapter-test
// blueprint's Section A slots.
// Topics (this chapter has three in the syllabus): t01 context and summary · t02 themes and message
// (curiosity, a mother's encouragement, persistence; Ebright's character is taught here) · t03 exam practice.
// Facts deliberately left out (cannot be confirmed without the text): Ebright's home town and birth year,
// his ages at each stage, the number of butterfly species he collected, the names of his teacher and
// college roommate, the name of the army laboratory, the journals and the prize places he won.
import { Q, mcq, fb, short, long, tf, ar, match, ord, source, child } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

const NOTE = "*(This passage is SOYL's commentary on the account, not an extract from it. Read the chapter itself in your supplementary reader, Footprints without Feet.)*";
const SRC_STEM = `*The Making of a Scientist* (Robert W. Peterson): read the commentary and answer the questions that follow. ${NOTE}`;
const SCHEME3 = [['Relevant point from the account (event or detail)', 1], ['Explanation or inference linked to the question', 1], ['Expression and accuracy within 40–50 words', 1]];
const SCHEME2 = [['Correct point from the account', 1], ['Explanation in own words within 30–40 words', 1]];
const LONG_SCHEME = [['Content: relevant points from the account, accurately used', 3], ['Interpretation / extrapolation: a clear view on character, theme or values, supported by the account', 1], ['Organisation and expression; within 100–120 words', 2]];

// ================================================================ commentary passages (blueprint Section A slots)
Q('src_childhood', source({
  t: [1, 2, 4], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Richard Ebright's story begins with a boy who could not stop collecting. Coins, fossils, stones and, above all, butterflies filled his days, and he wanted to know everything about each find. He was an only child, and after his father died when Richard was still in primary school, his mother became his closest companion and his most important teacher. She took him on trips, filled the house with instruments for looking closely at the world, and made sure his questions never went unanswered. Peterson's account makes clear that the scientist was not born ready-made. He was shaped, day by day, by an eager mind and a parent who fed it.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'Which collection mattered most to the young Richard Ebright?', opts: ['butterflies', 'stamps', 'toy cars', 'postcards'], sol: 'Butterflies were the centre of his childhood collecting.' })),
    child('b', fb({ t: 1, d: 2, c: 'recall', stem: 'After Richard Ebright’s father died, his ___ became his closest companion and teacher.', acc: [['mother', 'mom', 'mum']], sol: 'His **mother** guided and encouraged him.' })),
    child('c', mcq({ t: 2, d: 2, c: 'understanding', stem: 'How did Ebright’s mother encourage his interests?', opts: ['She took him on trips and bought him instruments for close study.', 'She sent him to a boarding school abroad.', 'She told him to stop collecting and study harder.', 'She hired a famous scientist as his tutor.'], sol: 'She gave him outings and equipment and answered his questions.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'What does the commentary mean when it says the scientist was not born ready-made?', model: 'His success grew over years from his own curiosity and his mother’s steady support; it was not simply a gift at birth.', sol: 'Talent was developed through effort and encouragement.', scheme: [['Success was built through curiosity, effort and support, not inborn alone', 1]] })),
    child('e', mcq({ t: 4, d: 3, c: 'analysis', stem: 'Which quality of the young Ebright does this passage stress most?', opts: ['curiosity', 'shyness', 'carelessness', 'stubborn laziness'], sol: 'He wanted to know everything about each thing he found.' })),
  ],
  sol: 'Parts (a)–(c) recall his childhood; (d) and (e) interpret it.',
}));
Q('src_monarch_book', source({
  t: [1, 2], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "A single book changed the direction of Ebright's hobby. His mother gave him The Travels of Monarch X, which describes how monarch butterflies travel long distances south for the winter. At the end the reader is invited to help real research by tagging monarchs for Dr Frederick Urquhart of the University of Toronto. Richard accepted. He began raising monarchs at home and tagging them, which turned a collector into a contributor to science. In time the tagging became tiresome, but the lesson stayed: careful observation of ordinary creatures could add something new to what scientists know.",
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'recall', stem: 'What is *The Travels of Monarch X*, the book Ebright’s mother gave him, about?', opts: ['the long migration of monarch butterflies', 'a boy who builds a rocket', 'the history of science fairs', 'how to collect coins'], sol: 'It tells how monarchs travel south for the winter.' })),
    child('b', fb({ t: 1, d: 2, c: 'recall', stem: 'Readers of the book were invited to tag monarchs for Dr Frederick ___ of the University of Toronto.', acc: [['Urquhart']], sol: 'The research was led by Dr Frederick **Urquhart**.' })),
    child('c', mcq({ t: 1, d: 2, c: 'understanding', stem: 'Why did Ebright start raising and tagging monarch butterflies?', opts: ['to help real research on their migration', 'to sell them to collectors', 'to win a bet with a friend', 'because his school forced him to'], sol: 'He answered the book’s invitation to help the scientists studying migration.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'How did the book turn Ebright from a collector into a contributor to science?', model: 'It gave his hobby a real purpose: by tagging monarchs he was helping a scientist answer a genuine question.', sol: 'Tagging connected his hobby to real research.', scheme: [['His hobby now served real research', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'evaluation', stem: 'What does the episode of the book suggest about Ebright’s mother?', opts: ['She chose gifts that could stretch his interests.', 'She wanted him to give up butterflies.', 'She cared little about his hobbies.', 'She wanted him to become a writer.'], sol: 'Her well-chosen gift opened the door to real research.' })),
  ],
  sol: 'Link the gift (a) to the change in his hobby (c, d).',
}));
Q('src_fair', source({
  t: [1, 2, 4], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Losing taught Ebright more than winning could have. In seventh grade he entered a county science fair and came away with nothing. Looking at the projects that succeeded, he saw what they had that his lacked: their makers had carried out real experiments instead of simply arranging attractive exhibits. Many children would have given up. Ebright drew a lesson and changed his method. From then on his projects asked a question and tried to answer it by testing, even when the test failed to produce a clear result. Failure, for him, was information.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'What happened when Ebright entered a county science fair in seventh grade?', opts: ['He did not win anything.', 'He won the first prize.', 'He was disqualified for cheating.', 'He was too ill to attend.'], sol: 'He came away without a prize.' })),
    child('b', mcq({ t: 1, d: 2, c: 'understanding', stem: 'What did Ebright notice about the winning projects at that fair?', opts: ['Their makers had done real experiments.', 'They had the most colourful posters.', 'They were made by older students.', 'They were about butterflies.'], sol: 'The winners had experimented, not just displayed.' })),
    child('c', fb({ t: 2, d: 2, c: 'understanding', stem: 'After the fair, Ebright’s projects tried to answer a question by carrying out real ___.', acc: [['experiments', 'tests', 'experimentation']], sol: 'He now built his projects around real **experiments**.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'What does the commentary mean by *failure, for him, was information*?', model: 'Each defeat or failed test told Ebright what to change, so he used it to improve instead of feeling beaten.', sol: 'He learnt from failure rather than giving up.', scheme: [['He treated failure as a lesson to improve', 1]] })),
    child('e', mcq({ t: 4, d: 3, c: 'evaluation', stem: 'Which quality does Ebright show in his response to losing at the fair?', opts: ['persistence and a willingness to learn', 'jealousy of the winners', 'loss of interest in science', 'anger at the judges'], sol: 'He studied why he lost and changed his approach.' })),
  ],
  sol: 'The turning point: from displays to experiments.',
}));
Q('src_gold_spots', source({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Ebright's most famous school project began with something tiny: the small gold spots on the pupa of a monarch butterfly. Most people had never wondered what they were for. Ebright wanted to know. Working with a fellow student, he built equipment and showed that the spots produce a hormone that the butterfly needs to develop fully. The work won him honours at science fairs, including an international one, and the chance to work in a professional research laboratory while still at school. A question no one else had asked led to a real discovery.",
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'recall', stem: 'What did Ebright investigate in his famous high-school project?', opts: ['the gold spots on a monarch pupa', 'the colours of viceroy wings', 'the speed of butterfly flight', 'the food of caterpillars'], sol: 'He studied the purpose of the gold spots on the pupa.' })),
    child('b', fb({ t: 1, d: 2, c: 'understanding', stem: 'Ebright showed that the gold spots produce a ___ the butterfly needs to develop fully.', acc: [['hormone']], sol: 'The spots produce a **hormone** necessary for full development.' })),
    child('c', mcq({ t: 1, d: 2, c: 'understanding', stem: 'What was one reward for Ebright’s gold-spot research?', opts: ['the chance to work in a professional laboratory while at school', 'a job as a teacher', 'a trip to Toronto to meet Dr Urquhart', 'a book contract'], sol: 'His success at the fairs led to laboratory work while still a student.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Why does the commentary say that a question no one else had asked led to a discovery?', model: 'Most people ignored the spots, but Ebright’s curiosity made him ask what they were for, and testing that question revealed the hormone.', sol: 'Curiosity about overlooked details leads to discovery.', scheme: [['His curiosity about an ignored detail led to the finding', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What does the gold-spot project show about how science advances?', opts: ['Careful questions about small details can lead to discoveries.', 'Only expensive equipment produces results.', 'Science fairs are a waste of time.', 'Discoveries happen only by chance.'], sol: 'A small, careful question opened up real knowledge.' })),
  ],
  sol: 'Track question → experiment → discovery → reward.',
}));
Q('src_qualities', source({
  t: [4, 3], d: 3, c: 'evaluation', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Peterson suggests that Ebright's success rested on a combination of qualities. He had a sharp intellect, and he never lost the curiosity of the boy who chased butterflies. Just as important, he competed to learn and to do good work, not merely to collect trophies. He was no narrow specialist, either: he did well at debating and public speaking and enjoyed canoeing and photography. Behind all of this stood a mother who supported him without pushing him. The account invites young readers to see that ability counts for little unless it is joined by curiosity, effort and a healthy reason for working hard.",
  parts: [
    child('a', mcq({ t: 4, d: 2, c: 'understanding', stem: 'According to the commentary, why did Ebright compete in science?', opts: ['to learn and to do good work', 'only to win trophies', 'to please his teachers', 'to become rich quickly'], sol: 'He competed for learning and good work, not just prizes.' })),
    child('b', mcq({ t: 4, d: 2, c: 'recall', stem: 'Which of these interests did Ebright have besides science?', opts: ['debating and photography', 'football and painting', 'cooking and chess', 'singing and cricket'], sol: 'He debated, spoke in public, canoed and took photographs.' })),
    child('c', fb({ t: 4, d: 2, c: 'understanding', stem: 'Ebright kept the ___ of the boy who chased butterflies throughout his career.', acc: [['curiosity', 'inquisitiveness']], sol: 'His **curiosity** never faded.' })),
    child('d', short({ t: 4, d: 4, c: 'evaluation', marks: 1, stem: 'Which of Ebright’s qualities do you think mattered most to his success? Give one reason.', model: 'Curiosity, because it made him ask questions others ignored, such as what the gold spots were for.', sol: 'Any quality, supported: curiosity, intellect, persistence, the right motive, his mother’s support.', scheme: [['A quality with one supporting reason from the account', 1]] })),
    child('e', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Why does the commentary mention Ebright’s debating, canoeing and photography?', opts: ['to show he was a well-rounded person, not a narrow specialist', 'to show that he neglected science', 'to suggest he wanted a career in sport', 'to explain why he lost the fair'], sol: 'His wide interests show an all-round personality.' })),
  ],
  sol: 'Part (d) has no single right answer; reward a supported view.',
}));

// ================================================================ short answers, 3 marks (40–50 words) — the board's Q9 form
const SA3 = { marks: 3, wl: [40, 50], scheme: SCHEME3, time: 240 };
Q('sa_mother', short({
  ...SA3, t: 2, d: 2, c: 'understanding',
  stem: 'What part did Richard Ebright’s mother play in making him a scientist? Answer in 40–50 words.',
  model: 'After his father’s death, his mother became Ebright’s companion and guide. She took him on trips, bought him instruments for studying nature, and found him books, including the one about monarch migration. She encouraged his questions without pressure, so his curiosity could grow into serious research.',
  sol: 'Her role (companion, guide) + two forms of support (trips, equipment, the book) + the effect on him.',
}));
Q('sa_book', short({
  ...SA3, t: 1, d: 2, c: 'understanding',
  stem: 'How did *The Travels of Monarch X* change Richard Ebright’s interest in butterflies? Answer in 40–50 words.',
  model: 'The book described the long migration of monarchs and invited readers to tag them for Dr Urquhart’s research. Ebright took up the invitation, raising and tagging monarchs himself. His collecting hobby now had a scientific purpose, and it led him towards real research questions about butterflies.',
  sol: 'What the book was about + the invitation to tag + how his hobby gained a purpose.',
}));
Q('sa_fair_lesson', short({
  ...SA3, t: [1, 2], d: 3, c: 'analysis',
  stem: 'What lesson did Ebright learn from losing at the county science fair in seventh grade? Answer in 40–50 words.',
  model: 'Ebright saw that the winners had done genuine experiments, while he had only presented a display. He realised that science means asking a question and testing it. Instead of losing heart, he changed his approach, and his later projects were built around real experiments.',
  sol: 'What the winners did differently + the lesson about real science + how he changed.',
}));
Q('sa_curiosity', short({
  ...SA3, t: 4, d: 3, c: 'analysis',
  stem: 'Show how curiosity drives Richard Ebright’s work, from childhood to college. Answer in 40–50 words.',
  model: 'As a boy, Ebright wanted to know about every butterfly, stone and fossil he found. Curiosity led him to tag monarchs, to ask why viceroys resemble them, and to investigate the gold spots on the pupa. At college it led him to questions about how cells use DNA.',
  sol: 'Two or three stages showing curiosity (collecting, tagging, the gold spots, the cell theory).',
}));
Q('sa_gold_spots', short({
  ...SA3, t: 1, d: 3, c: 'analysis',
  stem: 'What did Ebright discover about the gold spots on the monarch pupa, and why was it important? Answer in 40–50 words.',
  model: 'Working with a classmate, Ebright built equipment and showed that the gold spots produce a hormone the butterfly needs for full development. It was important because it was a real discovery that no one had made. It won him honours and laboratory experience while still at school.',
  sol: 'The finding (hormone for full development) + why it mattered (new knowledge, honours, laboratory work).',
}));
Q('sa_viceroy', short({
  ...SA3, t: 1, d: 3, c: 'understanding',
  stem: 'Which theory about viceroy and monarch butterflies did Ebright test, and what does the project show about him? Answer in 40–50 words.',
  model: 'Ebright tested the idea that viceroys gain protection by resembling monarchs, which birds avoid eating because of their taste. Choosing such a question shows that he now thought like a scientist, testing an explanation instead of just displaying specimens he had collected.',
  sol: 'The theory (resemblance protects viceroys because birds avoid monarchs) + what it shows (scientific method).',
}));
Q('sa_all_rounder', short({
  ...SA3, t: 4, d: 3, c: 'analysis',
  stem: 'Richard Ebright was not interested only in science. Do you agree? Answer in 40–50 words.',
  model: 'Yes. Besides his research, Ebright did well in debating and public speaking, and he enjoyed outdoor activities such as canoeing, as well as photography. These varied interests show a balanced, well-rounded person who developed many abilities, not a student who lived only inside a laboratory.',
  sol: 'A stand + two or three non-science interests + what this shows about him.',
}));
Q('sa_failure', short({
  ...SA3, t: 4, d: 3, c: 'analysis',
  stem: 'How did Richard Ebright respond to failure? Give two examples. Answer in 40–50 words.',
  model: 'Ebright treated failure as a lesson. After losing at the county fair, he switched from displays to real experiments. When his project on a disease killing monarch caterpillars produced no clear result, he did not quit but moved on to his next question. Each setback improved him.',
  sol: 'Two examples (the lost fair, the unsuccessful disease project, tedious tagging) + his response.',
}));
Q('sa_motive', short({
  ...SA3, t: 2, d: 4, c: 'evaluation',
  stem: 'Ebright competed to learn, not just to win prizes. Why is this an important value for students? Answer in 40–50 words.',
  model: 'Students who work only for prizes may stop when they lose or choose easy topics. Those who work to learn keep going, as Ebright did after his defeat, and pick hard, real questions. Learning lasts longer than trophies, and it leads to genuine discoveries.',
  sol: 'Contrast prize-seeking with learning + Ebright as evidence + a general value.',
}));
Q('sa_hobby_career', short({
  ...SA3, t: 2, d: 3, c: 'analysis',
  stem: 'How did a childhood hobby grow into Richard Ebright’s scientific career? Answer in 40–50 words.',
  model: 'Collecting butterflies as a child led Ebright to tag monarchs for real research. Science fairs then taught him to experiment, and his gold-spot project produced a genuine discovery. At college he studied the hormone further and developed ideas about how cells use DNA. Each step grew from the last.',
  sol: 'A chain of stages: collecting → tagging → fairs and experiments → gold spots → college research.',
}));
Q('sa_teachers_role', short({
  ...SA3, t: 2, d: 3, c: 'application',
  stem: 'Apart from his mother, which people and opportunities helped Ebright on his way, and how? Answer in 40–50 words.',
  model: 'Dr Urquhart’s tagging programme gave Ebright his first link with real research. A fellow student helped him build equipment for the gold-spot project, and at college his room-mate worked with him on the hormone. Science fairs and a research laboratory also gave him chances to grow.',
  sol: 'Any two or three helpers or opportunities (Urquhart’s programme, the classmate, the room-mate, fairs, the laboratory) with how they helped.',
}));
Q('sa_cell_theory', short({
  ...SA3, t: 1, d: 3, c: 'understanding',
  stem: 'What did Ebright go on to do at college, and how was it linked to his school research? Answer in 40–50 words.',
  model: 'At Harvard, Ebright and his room-mate continued his work on the butterfly hormone and studied its structure. From this they developed a new theory about how cells use the instructions held in their DNA. His school project had led directly to research of much wider importance.',
  sol: 'College work (structure of the hormone, theory about cells and DNA) + the link back to the gold spots.',
}));
Q('sa_mother_today', short({
  ...SA3, t: 2, d: 4, c: 'evaluation',
  stem: 'Should parents today support their children the way Ebright’s mother supported him? Give your view in 40–50 words.',
  model: 'Yes, largely. Ebright’s mother noticed his interest, provided books, trips and equipment, and let him follow his own questions. This kind of support builds confidence and curiosity. However, parents should encourage without pressure, and they need not spend much money; time and attention matter most.',
  sol: 'A stand + what she did + a balanced point (encouragement without pressure; time over money).',
}));
Q('sa_title', short({
  ...SA3, t: [2, 3], d: 3, c: 'evaluation',
  stem: 'Is *The Making of a Scientist* a suitable title for Peterson’s account of Ebright? Give reasons in 40–50 words.',
  model: 'Yes. The title stresses that a scientist is made, not born. The account traces how curiosity, a mother’s support, failures and steady effort gradually turned a boy collecting butterflies into a researcher. The word making suits a process that takes many years and many steps.',
  sol: 'A stand + the idea of a process + examples of the stages + a conclusion.',
}));

// ================================================================ short answers, 2 marks (30–40 words)
const SA2 = { marks: 2, wl: [30, 40], scheme: SCHEME2, time: 150 };
Q('sb_collections', short({
  ...SA2, t: 1, d: 1, c: 'recall',
  stem: 'What did Richard Ebright collect as a child, and what does it show about him? Answer in 30–40 words.',
  model: 'As a child, Ebright collected butterflies above all, along with coins, fossils and stones. His collections show an observant boy with a strong urge to find out about everything in the world around him.',
  sol: 'The collections + the quality they show (curiosity, observation).',
}));
Q('sb_tagging', short({
  ...SA2, t: 1, d: 2, c: 'understanding',
  stem: 'Why did Ebright tag monarch butterflies, and why did he lose interest in it? Answer in 30–40 words.',
  model: 'He tagged monarchs to help Dr Urquhart track their migration, as the book invited readers to do. In time the work became dull and repetitive, so his interest faded towards new questions.',
  sol: 'The purpose (helping migration research) + why it grew tiresome.',
}));
Q('sb_disease', short({
  ...SA2, t: 1, d: 2, c: 'understanding',
  stem: 'What did Ebright try to find out in his project on monarch caterpillars, and what was the result? Answer in 30–40 words.',
  model: 'He tried to find what caused a disease that killed many monarch caterpillars, suspecting that a beetle might spread it. The project gave no clear answer, but he went on to new research.',
  sol: 'The question (cause of the disease; the beetle idea) + the result (no answer) + he carried on.',
}));
Q('sb_lab', short({
  ...SA2, t: 1, d: 2, c: 'recall',
  stem: 'What opportunity did Ebright’s gold-spot research bring him while he was still at school? Answer in 30–40 words.',
  model: 'His success at science fairs, including an international fair, earned him the chance to work in a professional research laboratory while he was still a school student, an unusual honour.',
  sol: 'The honours at fairs + the laboratory opportunity.',
}));
Q('sb_photography', short({
  ...SA2, t: 2, d: 3, c: 'analysis',
  stem: 'How did Ebright’s other interests, such as photography, support his scientific work? Answer in 30–40 words.',
  model: 'Photography sharpened his eye for detail and helped him record what he observed in nature. Debating and public speaking trained him to argue clearly, a skill every scientist needs to present findings.',
  sol: 'One or two interests + how each supports science.',
}));
Q('sb_lesson_readers', short({
  ...SA2, t: 2, d: 3, c: 'application',
  stem: 'What can a Class 10 student learn from Richard Ebright’s life? Answer in 30–40 words.',
  model: 'A student can learn to follow curiosity, to treat defeats as lessons, and to work for understanding rather than marks alone. Steady effort on a real interest can lead to remarkable achievements.',
  sol: 'Two lessons linked to Ebright’s life.',
}));

// ================================================================ long answers, 6 marks (100–120 words) — the board's long-answer form
const LA = { marks: 6, wl: [100, 120], scheme: LONG_SCHEME, time: 720 };
Q('la_ebright_sketch', long({
  ...LA, t: [3, 4], d: 3, c: 'analysis',
  stem: 'Write a character sketch of Richard Ebright as Peterson presents him in *The Making of a Scientist*. Answer in 100–120 words.',
  model: 'Richard Ebright is above all curious. As a boy he collected butterflies, coins and fossils and wanted to know everything about them. He is persistent: losing at a county science fair did not discourage him but taught him to experiment, and a failed project on a caterpillar disease only led him to the next question. He is intelligent and original, discovering that the gold spots on a monarch pupa produce a vital hormone. He competes to learn rather than for trophies. He is also well-rounded, enjoying debating, public speaking, canoeing and photography. Supported by a devoted mother, he grew from a young collector into a serious scientist with ideas about how cells work.',
  sol: 'Traits with evidence: curious, persistent, intelligent and original, motivated by learning, well-rounded. Mention his mother’s support and end with a judgement.',
}));
Q('la_mother_role', long({
  ...LA, t: [3, 2], d: 4, c: 'evaluation',
  stem: 'A child’s talent needs the right encouragement to grow. Discuss with reference to Richard Ebright and his mother. Answer in 100–120 words.',
  model: 'Ebright’s story shows how much encouragement matters. His curiosity was strong, but after his father’s death it was his mother who gave it direction. She took him on trips, bought him equipment for close study and gave him her time and attention. Most importantly, she gave him a book on monarch migration, which linked his hobby to real research. She supported him without pushing, so his interest remained his own. Without her, his collecting might have stayed a pastime. Many gifted children never develop their talent because no one notices or helps. Parents and teachers who offer books, time and freedom to explore can turn an interest into a lifelong achievement.',
  sol: 'A stand + the mother’s specific support + its effect (the book, the tagging, his confidence) + a general point about encouragement.',
}));
Q('la_failure_success', long({
  ...LA, t: [3, 2], d: 4, c: 'evaluation',
  stem: 'Failure is a stepping stone to success. How does Richard Ebright’s life in *The Making of a Scientist* prove this? Answer in 100–120 words.',
  model: 'Ebright’s life shows that setbacks can drive progress. In seventh grade he lost at a county science fair. Instead of quitting, he studied the winning entries, realised they were based on real experiments, and changed his whole approach. His next project, on a disease that killed monarch caterpillars, gave no clear result, yet he moved on to test another theory about viceroys and monarchs. Even tagging butterflies became tedious, but it had already pointed him towards research. Each failure taught him something, and his later gold-spot discovery and college research built on those lessons. The account suggests that what matters is not avoiding failure but learning from it and continuing.',
  sol: 'A stand + two or three setbacks and how he responded + the later successes they led to + a conclusion.',
}));
Q('la_diary_fair', long({
  ...LA, t: [3, 1], d: 4, c: 'application', bloom: 'create',
  stem: 'Imagine you are the young Richard Ebright. Write a diary entry on the evening you lost at the county science fair. Answer in 100–120 words.',
  model: 'Evening\n\nI came home from the county science fair with nothing today, and I felt like hiding my project in the basement for good. But on the way out I made myself look again at the winning tables. Those students had not just laid out pretty specimens as I had. Each had asked a question and run an experiment to answer it. That is what real science is. I think Mother would say a loss is wasted only if you learn nothing from it. Next year I will not just show my butterflies. I will choose a question about them and test it properly. Tonight I am disappointed, but I know what to do.',
  sol: 'Diary format (time, first person, past tense, feelings). Content consistent with the account: the loss, the realisation about experiments, a resolve. A reflective close.',
}));
Q('la_letter_urquhart', long({
  ...LA, t: [3, 1], d: 4, c: 'application', bloom: 'create',
  stem: 'Write a letter from the young Richard Ebright to Dr Frederick Urquhart, describing how he has been helping with the monarch tagging programme. Answer in 100–120 words.',
  model: 'Dear Dr Urquhart,\n\nI read The Travels of Monarch X, which my mother gave me, and I wanted to join your research at once. I have been raising monarchs at home from eggs and caterpillars, and each adult I release carries one of your tags. I record the date and place carefully in a notebook. Some days the work feels slow, but I like knowing that a butterfly from my town may one day be found far to the south and help explain where monarchs go in winter. I would be grateful if you could suggest other questions I might study about monarchs. I hope to become a scientist one day.\n\nYours sincerely,\nRichard Ebright',
  sol: 'Letter format (salutation, body, close). Content consistent with the account: the book, raising and tagging, the purpose of the research, a request for further questions. Polite, eager tone.',
}));
Q('la_qualities', long({
  ...LA, t: [3, 4], d: 4, c: 'analysis',
  stem: 'What qualities, according to *The Making of a Scientist*, does a person need to become a good scientist? Discuss with examples from Ebright’s life. Answer in 100–120 words.',
  model: 'The account suggests that a scientist needs several qualities together. First is a strong mind: Ebright showed real originality when he worked out what the gold spots on a monarch pupa do. Second is curiosity, which made him collect, tag, question and test from childhood onwards. Third is persistence, seen when he learnt from losing at a county fair and from a project that gave no result. Fourth is the right motive: he competed to understand, not just to win prizes. Finally, a wide range of interests, like his debating and photography, made him a balanced thinker. Ebright’s life shows that intelligence alone is not enough; character turns ability into achievement.',
  sol: 'Qualities with examples: intellect, curiosity, persistence, right motive, breadth of interests. Conclude with the overall idea.',
}));
Q('la_speech_fair', long({
  ...LA, t: [3, 2], d: 4, c: 'application', bloom: 'create',
  stem: 'You have been asked to speak at your school’s science fair. Write a short speech on what students can learn from Richard Ebright. Answer in 100–120 words.',
  model: 'Good morning, everyone. Today I want to tell you about Richard Ebright, a boy who collected butterflies and grew up to change how scientists think about cells. Ebright did not win his first science fair. He lost, and then he noticed that the winners had done real experiments. So he changed. He tested ideas, failed sometimes, and kept asking new questions until he discovered what the gold spots on a monarch pupa are for. His mother supported him, but the effort was his own. Friends, your project today does not have to win. Ask a real question, test it honestly, and learn from the result. That is how scientists are made. Thank you.',
  sol: 'Speech format (greeting, body, closing thanks). Content: Ebright’s loss, his change to experiments, his discovery, his mother’s support, lessons for students. Engaging tone.',
}));
Q('la_curiosity_today', long({
  ...LA, t: [3, 2], d: 4, c: 'evaluation',
  stem: 'Do schools today give students enough chances to be curious like Richard Ebright? Give your view with reference to the account, in 100–120 words.',
  model: 'In my view, schools often reward correct answers more than good questions, which is the opposite of what shaped Ebright. His growth came from following his own curiosity: collecting butterflies, tagging monarchs, asking what the gold spots were for and testing ideas at science fairs. Many students today have little time for such projects because syllabuses are full and exams focus on memory. Still, things are improving: science fairs, laboratories and project work give some students the chances Ebright had. Schools could do more by letting students choose real questions and by treating failed experiments as learning. Ebright’s life shows that curiosity, given room and support, can produce real discoveries.',
  sol: 'A clear stand + evidence from Ebright’s life + an assessment of schools today + a suggestion + conclusion. A reasoned opposite view can also earn full marks.',
}));
Q('la_title_long', long({
  ...LA, t: [3, 2], d: 3, c: 'evaluation',
  stem: 'Would *A Boy and His Butterflies* be a better title for *The Making of a Scientist*? Give your view in 100–120 words.',
  model: 'I think the original title is better. A Boy and His Butterflies would capture the charm of Ebright’s childhood collecting, tagging monarchs and studying the gold spots, and butterflies do run through the whole account. However, it would suggest a gentle nature story rather than a record of growth. The account is really about how a scientist is formed: curiosity, his mother’s support, a lost science fair, failed projects, real experiments and finally research into how cells work. The word making captures that slow, step-by-step process, and it reminds readers that they too can be shaped by effort. So the present title expresses the central idea more fully.',
  sol: 'A clear stand + what the alternative captures and misses + why making fits the central idea + conclusion. A reasoned case for the alternative can also earn full marks.',
}));

// ================================================================ objective items
Q('mc_author', mcq({ t: 1, d: 1, c: 'recall', stem: '*The Making of a Scientist* was written by…', opts: ['Robert W. Peterson', 'H. G. Wells', 'Guy de Maupassant', 'K. A. Abbas'], sol: 'The account is by Robert W. Peterson.' }));
Q('mc_genre', mcq({ t: 1, d: 2, c: 'understanding', stem: 'What kind of writing is *The Making of a Scientist*?', opts: ['a biographical account of a real scientist', 'a science-fiction story', 'a one-act play', 'a poem about butterflies'], sol: 'It is non-fiction about the life of Richard Ebright.' }));
Q('mc_book', mcq({ t: 1, d: 1, c: 'recall', stem: 'Which book did Ebright’s mother give him that changed his hobby?', opts: ['*The Travels of Monarch X*', '*The Invisible Man*', '*The Butterfly Atlas*', '*A Brief History of Time*'], sol: 'She gave him *The Travels of Monarch X*.' }));
Q('mc_fair_lost', mcq({ t: 1, d: 2, c: 'understanding', stem: 'Why did Ebright lose at the county science fair in seventh grade, according to his own later realisation?', opts: ['He had made a display instead of doing a real experiment.', 'He arrived late for the judging.', 'His project was about the wrong subject.', 'The judges were unfair to younger students.'], sol: 'The winners had experimented; he had only displayed.' }));
Q('mc_hormone', mcq({ t: 1, d: 2, c: 'recall', stem: 'What did Ebright show the gold spots on a monarch pupa produce?', opts: ['a hormone needed for full development', 'a poison that keeps birds away', 'a colour that attracts mates', 'a scent that guides migration'], sol: 'They produce a hormone the butterfly needs to develop fully.' }));
Q('mc_viceroy', mcq({ t: 1, d: 3, c: 'understanding', stem: 'According to the theory Ebright tested, why might viceroy butterflies benefit from looking like monarchs?', opts: ['Birds avoid monarchs, so they may avoid viceroys too.', 'Monarchs share their food with viceroys.', 'Looking alike helps them migrate together.', 'Monarchs protect viceroys from insects.'], sol: 'Birds dislike the taste of monarchs; resemblance protects viceroys.' }));
Q('mc_motive', mcq({ t: 4, d: 3, c: 'analysis', stem: 'What drove Ebright to keep entering science fairs after his first defeat?', opts: ['a wish to learn and do real science', 'a need for prize money', 'his teacher’s threats', 'jealousy of his classmates'], sol: 'He competed for learning and good work.' }));
Q('mc_message', mcq({ t: 2, d: 3, c: 'evaluation', stem: 'Which message does *The Making of a Scientist* most strongly convey?', opts: ['Curiosity, support and persistence together build achievement.', 'Scientists are born, not made.', 'Hobbies distract children from real study.', 'Winning prizes is the main aim of science.'], sol: 'Ebright’s success grew from curiosity, his mother’s support and steady effort.' }));
Q('mc_apply', mcq({ t: [2, 3], d: 3, c: 'application', stem: 'A student’s first robotics entry loses at a school fair. Which response follows Ebright’s example?', opts: ['studying what the winners did and building a real test into next year’s project', 'never entering a fair again', 'complaining that the judges were biased', 'copying a winning project exactly'], sol: 'Ebright learnt from the winners and changed his method.' }));
Q('mc_mother_trait', mcq({ t: 2, d: 2, c: 'understanding', fixed: true, key: 'c', stem: 'Which word best describes Ebright’s mother in the account?', opts: ['strict', 'indifferent', 'encouraging', 'anxious'], sol: 'She supported his interests with books, trips and equipment.' }));
Q('mc_college', mcq({ t: 1, d: 3, c: 'recall', fixed: true, key: 'b', stem: 'What did Ebright’s college research lead to?', opts: ['a cure for a butterfly disease', 'a new theory about how cells use the instructions in their DNA', 'a map of monarch migration routes', 'a new kind of camera'], sol: 'He and his room-mate proposed a theory about how cells use the instructions in DNA.' }));
Q('mc_structure', mcq({ t: 1, d: 3, c: 'analysis', fixed: true, key: 'd', stem: 'How is *The Making of a Scientist* mainly organised?', opts: ['as a series of letters', 'as a dialogue between Ebright and his mother', 'as a diary kept by Ebright', 'as a chronological account from childhood to college'], sol: 'Peterson follows Ebright’s life in time order, stage by stage.' }));

Q('fb_urquhart', fb({ t: 1, d: 2, c: 'recall', stem: 'Ebright tagged monarch butterflies for the research of Dr Frederick ___.', acc: [['Urquhart']], sol: 'He tagged them for Dr Frederick **Urquhart**.' }));
Q('fb_monarch', fb({ t: 1, d: 1, c: 'recall', stem: 'The butterflies at the heart of Ebright’s early research were ___ butterflies.', acc: [['monarch']], sol: 'Most of his work was on **monarch** butterflies.' }));
Q('fb_pupa', fb({ t: 1, d: 2, c: 'recall', marks: 1, stem: 'Ebright studied the gold ___ on the monarch ___.', acc: [['spots'], ['pupa', 'chrysalis']], sol: 'He studied the gold **spots** on the monarch **pupa**.', scheme: [['spots', 0.5], ['pupa', 0.5]] }));
Q('fb_college', fb({ t: 1, d: 2, c: 'recall', stem: 'Ebright later studied at ___ University, where he continued his research.', acc: [['Harvard']], sol: 'He went to **Harvard**.' }));

Q('ar_mother', ar({ t: 2, d: 3, c: 'analysis', a: 'Ebright’s mother played a major part in his development as a scientist.', r: 'She encouraged his interests with trips, equipment and the book on monarch migration.', key: 'a', sol: 'Both are true, and R explains A.' }));
Q('ar_fair', ar({ t: [1, 2], d: 3, c: 'analysis', a: 'Ebright lost at the county science fair in seventh grade.', r: 'Ebright’s project at that fair was a careful experiment on the gold spots.', key: 'c', sol: 'A is true. R is false: the gold-spot work came later; at that fair he had only a display.' }));
Q('ar_tagging', ar({ t: 1, d: 3, c: 'analysis', a: 'Ebright began tagging monarch butterflies.', r: 'Ebright enjoyed debating and public speaking.', key: 'b', sol: 'Both are true, but his debating does not explain the tagging, which answered the book’s invitation.' }));
Q('ar_gave_up', ar({ t: 2, d: 3, c: 'understanding', a: 'Ebright gave up science after his project on the caterpillar disease failed.', r: 'Ebright’s project on the disease killing monarch caterpillars did not give a clear result.', key: 'd', sol: 'A is false: he moved on to new projects. R is true.' }));

Q('tf_father', tf({ t: 1, d: 1, c: 'recall', stem: 'True or false: Richard Ebright’s father guided his science projects throughout high school.', ans: false, sol: 'His father died when he was young; his mother guided him.' }));
Q('tf_tagging_dull', tf({ t: 1, d: 2, c: 'understanding', stem: 'True or false: Ebright eventually found tagging monarch butterflies tedious.', ans: true, sol: 'The repetitive work grew dull, and he turned to new questions.' }));
Q('tf_prizes_only', tf({ t: 4, d: 2, c: 'understanding', stem: 'True or false: according to Peterson, Ebright competed in science fairs only to win prizes.', ans: false, sol: 'He competed to learn and to do good work.' }));
Q('tf_lab', tf({ t: 1, d: 2, c: 'recall', stem: 'True or false: Ebright’s gold-spot research earned him the chance to work in a research laboratory while still at school.', ans: true, sol: 'His success led to laboratory work as a student.' }));

Q('ord_life', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange these stages of Richard Ebright’s life in the order in which they happen.',
  items: ['Ebright collects butterflies as a young child.', 'His mother gives him *The Travels of Monarch X*.', 'He loses at a county science fair in seventh grade.', 'He discovers what the gold spots on the pupa produce.', 'At college he develops a theory about how cells use DNA.'],
  sol: 'Collecting → the book → the lost fair → the gold spots → college research.',
}));
Q('ord_projects', ord({
  t: [1, 2], d: 3, c: 'analysis', marks: 2,
  stem: 'Arrange Ebright’s butterfly projects in *The Making of a Scientist* in order.',
  items: ['Tagging monarchs for Dr Urquhart', 'A display that loses at the county fair', 'Seeking the cause of a disease killing caterpillars', 'Testing why viceroys resemble monarchs', 'Discovering the role of the gold spots'],
  sol: 'Tagging → the losing display → the disease project → the viceroy test → the gold spots.',
}));

Q('mt_people', match({
  t: [1, 2], d: 2, c: 'recall', marks: 2,
  stem: 'Match each person or source in *The Making of a Scientist* with their part in Ebright’s story.',
  pairs: [['his mother', 'gave him books, trips and equipment'], ['Dr Frederick Urquhart', 'led the monarch tagging research'], ['*The Travels of Monarch X*', 'described the migration of monarchs'], ['a fellow student', 'helped build equipment for the gold-spot work']],
  sol: 'Each person or source and how it shaped Ebright.',
}));
Q('mt_words', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match these words used when studying *The Making of a Scientist* with their meanings.',
  pairs: [['pupa', 'the stage between caterpillar and adult butterfly'], ['migration', 'seasonal movement from one region to another'], ['hormone', 'a chemical messenger in a living body'], ['mimicry', 'one species closely resembling another']],
  sol: 'Key words for discussing this chapter.',
}));
Q('mt_traits', match({
  t: 4, d: 3, c: 'analysis', marks: 2,
  stem: 'Match each episode in Ebright’s life with the quality it shows.',
  pairs: [['Collecting everything he found as a child', 'curiosity'], ['Changing his approach after losing a fair', 'persistence'], ['Asking what the gold spots were for', 'original thinking'], ['Debating, canoeing and photography', 'all-round interests']],
  sol: 'Each episode and the quality it reveals.',
}));
