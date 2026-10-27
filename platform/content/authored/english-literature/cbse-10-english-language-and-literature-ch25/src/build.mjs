// Build CBSE 10 English Language and Literature ch25 "The Midnight Visitor" (Robert Arthur). Run from platform/:
//   npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch25/src/build.mjs
// LITERATURE RULE: everything here is SOYL's own summary, analysis and commentary; the story is never
// quoted or closely paraphrased, and its dialogue is only reported. Students read it in Footprints without Feet.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';
import { guard } from '../../cbse-10-english-language-and-literature-ch23/src/guard.mjs';

setUnit('cbse-10-english-language-and-literature-ch25', 'english-literature');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const READ = "**Read the story itself in your textbook, *Footprints without Feet* (NCERT supplementary reader).** This lesson is SOYL's explanation and analysis; it does not reproduce the text.";

// ---------------------------------------------------------------- visuals
const vBoard = table(
  ['In the board paper', 'Question form', 'Marks'],
  [
    ['Short answer (Footprints)', '40–50 words; answer two of three', '3 each'],
    ['Long answer (Footprints)', '100–120 words: character, theme, values, diary, report or letter', '6'],
    ['Extract (reference to context)', 'not set from this reader; SOYL tests use commentary items only as comprehension checks', '—'],
  ],
  'Table of how a Footprints without Feet story is examined: three-mark short answers of forty to fifty words, two of three to be answered, and a six-mark long answer of one hundred to one hundred and twenty words on character, theme, values, or a diary, report or letter. Extracts are not set from this reader.',
  'CBSE 2026-27, Section C (literature), questions on the supplementary reader.',
);
const vAuthor = table(
  ['About the text', ''],
  [
    ['Author', 'Robert Arthur (1909–1969), American writer of mystery and suspense stories'],
    ['Known for', 'radio mysteries and the *Three Investigators* series for young readers'],
    ['Genre', 'a short spy story with a twist ending, told in the third person'],
    ['Setting', 'a hotel room, late at night'],
    ['Main characters', 'Ausable, a secret agent; Fowler, a young writer; Max, an armed rival agent; Henry, a waiter'],
  ],
  'Table of facts: the author is Robert Arthur, 1909 to 1969, an American writer of mystery and suspense, known for radio mysteries and the Three Investigators series; the story is a short spy story with a twist ending told in the third person; it is set in a hotel room late at night; the characters are Ausable, Fowler, Max and Henry.',
);
const vStages = flow('LR', ['A disappointing spy', 'A gun in the room', 'The balcony story', 'A knock at the door', 'A scream below', 'Only the waiter'], 'Flow of the story in six stages: a disappointing spy; a gun in the room; the balcony story; a knock at the door; a scream below; and only the waiter.', 'The story in six stages (SOYL summary).');
const vThemes = table(
  ['Theme', 'Where we see it (SOYL summary)'],
  [
    ['Appearance versus reality', 'A dull-looking man is a brilliant agent; the balcony is not there.'],
    ['Presence of mind', 'Ausable thinks clearly with a gun pointed at him.'],
    ['Brains over force', 'An unarmed man defeats an armed one.'],
    ['Romance versus reality of spying', 'Fowler’s fantasy against Ausable’s plain routine.'],
    ['Overconfidence', 'Max underestimates his opponent.'],
    ['Suspense and surprise', 'The knock, the scream, the waiter.'],
  ],
  'Table of six themes with where each appears: appearance versus reality, presence of mind, brains over force, romance versus reality of spying, overconfidence, and suspense and surprise.',
);
const vAusable = table(
  ['How Ausable looks', 'What Ausable is'],
  [
    ['Fat and untidy', 'Calm and steady under a gun'],
    ['Lives in an ordinary hotel room', 'A quick inventor of convincing stories'],
    ['Describes his work as dull', 'A careful planner who uses an expected knock'],
    ['Nothing like a film hero', 'Wins without a weapon'],
  ],
  'Table contrasting how Ausable looks, fat, untidy, ordinary and unheroic, with what he is: calm, inventive, a careful planner who wins without a weapon.',
);
const vOthers = table(
  ['Character', 'What we learn (SOYL summary)'],
  [
    ['Fowler', 'A young writer with romantic ideas of spying; the observer whose reactions mirror ours'],
    ['Max', 'Armed and confident, but gullible and quick to panic'],
    ['Henry', 'The waiter whose ordinary knock becomes part of the trap'],
  ],
  'Table of the other characters: Fowler, a young writer and observer; Max, armed and confident but gullible and panicky; Henry, the waiter whose knock becomes part of the trap.',
);
const vWords = table(
  ['Word', 'Meaning'],
  [
    ['intruder', 'a person who enters without permission'],
    ['gullible', 'easily tricked'],
    ['composure', 'calmness under pressure'],
    ['deceptive', 'giving a false impression'],
    ['presence of mind', 'the ability to think and act quickly in a crisis'],
    ['suspense', 'anxious uncertainty about what will happen'],
    ['twist', 'an unexpected turn in a story'],
    ['espionage', 'the work of spies'],
  ],
  'Table of word meanings: intruder, gullible, composure, deceptive, presence of mind, suspense, twist and espionage.',
  'Key words for this story with their meanings.',
);
const vLongPlan = flow('LR', ['Take a clear stand', 'Point + evidence (own words)', 'Two or three such points', 'Link to a value or theme', 'One-line conclusion'], 'Flow for planning a six-mark long answer: take a stand, give points with evidence in your own words, link to a value or theme, and conclude.');

// ---------------------------------------------------------------- deck
const D = deck({
  title: 'The Midnight Visitor',
  goals: [
    'Retell the story, from Fowler’s disappointment to the twist, in your own words',
    'Explain how Ausable outwits Max with presence of mind',
    'Contrast Ausable’s appearance with his intelligence, with evidence',
    'Explain how suspense and the twist ending work',
    'Write 3-mark and 6-mark answers within the word limits',
  ],
  slides: [
    sl('title', 'The Midnight Visitor — Robert Arthur', {
      b: `*Footprints without Feet* (supplementary reader) · Class 10 CBSE English.\n\n${READ}`,
      v: vBoard,
      n: 'Welcome. Today we study The Midnight Visitor by Robert Arthur, a short spy story in which an unarmed man defeats an armed one. Please read the story in your textbook, Footprints without Feet, before you go on. This lesson does not repeat the text. The board tests this reader through short and long answers, so that is our focus.',
    }),
    sl('concept', 'How to use this lesson', {
      bl: [
        'Read the story once in *Footprints without Feet*.',
        'Use these slides for the sequence of events, the themes and the characters.',
        'The board asks 3-mark and 6-mark questions on this reader, not extracts: practise those most.',
        'Explain events **in your own words**; do not memorise lines.',
      ],
      n: 'Here is how to use this lesson. Read the story first. Then use these slides for the order of events, the themes and the four characters. The board does not print extracts from this reader; it asks short and long answers. So practise explaining, in your own words, how Ausable sets his trap and why it works.',
    }),
    sl('concept', 'The author and the text', {
      v: vAuthor,
      n: 'Robert Arthur, who lived from nineteen hundred and nine to nineteen sixty-nine, was an American writer of mystery and suspense. He wrote radio mysteries and created the Three Investigators books for young readers. This is a short spy story with a twist ending. It is told in the third person, mostly following Fowler, a young writer who watches everything happen.',
    }),
    sl('diagram', 'The story in six stages', {
      b: 'From disappointment to astonishment in one evening. (A SOYL summary, not the text.)',
      v: vStages,
      n: 'The story moves through six stages. Fowler is disappointed by an ordinary-looking spy. They find a man with a gun in the room. Ausable tells a story about a balcony. There is a knock at the door. A scream rises from below. And the visitor turns out to be only the waiter. Keep this map in mind as we go.',
    }),
    sl('concept', 'Summary 1: a disappointing spy', {
      b: 'Fowler, a young writer, hopes to see the thrilling world of a secret agent. Instead he follows Ausable, a fat, untidy man, to an ordinary hotel room. Ausable even suggests that the work is mostly dull. Fowler is disappointed.',
      n: 'Fowler is a young writer who has dreamed of meeting a real secret agent. He expects glamour and excitement. Instead he follows Ausable, a fat, untidy man, up to an ordinary hotel room, and Ausable even suggests that his work is mostly dull. Fowler is disappointed, and so, at first, is the reader. That is exactly what the writer intends.',
    }),
    sl('concept', 'Summary 2: a gun in the room', {
      b: 'When the light goes on, a man named Max is waiting with a pistol. He is a rival agent and wants a report about new missiles that Ausable expects that night. Fowler is thrilled and frightened; Ausable stays calm, almost irritated.',
      n: 'When the light goes on, everything changes. A man called Max is waiting in the room, holding a pistol. He is a rival agent, and he wants a report about new missiles that Ausable is expecting that night. Fowler is thrilled and frightened at the same time. Ausable, however, stays calm, as if Max were only a nuisance.',
    }),
    sl('check', 'Check: the order of events', {
      chk: 'ord_events',
      n: 'Your turn. Six events from the story are shuffled. Put them in order, from Fowler’s disappointment to the arrival of the waiter.',
    }),
    sl('concept', 'Summary 3: the balcony story', {
      b: 'Ausable grumbles that intruders keep getting into his room by a balcony outside his window, and says he has complained to the hotel. Max believes him. There is no balcony; Ausable has invented it.',
      n: 'Now Ausable begins his trap. He grumbles, almost to himself, that intruders keep getting into his room by a balcony outside his window, and that he has already complained to the hotel. Max believes every word. But there is no balcony at all. Ausable has made it up on the spot, mentioning it so casually that it sounds like a dull, everyday fact.',
    }),
    sl('concept', 'Summary 4: the knock and the scream', {
      b: 'A knock comes at the door. Ausable says it must be the police, whom he had asked to check on him. Frightened, Max decides to hide on the balcony and climbs over the sill. A scream rises from the street below.',
      n: 'Then there is a knock at the door. Ausable says it must be the police, whom he had asked to check on him because of the report. Max cannot risk meeting the police, so he decides to hide on the balcony until they leave. He climbs over the window sill, and a moment later a scream rises from the street far below.',
    }),
    sl('concept', 'Summary 5: only the waiter', {
      b: 'The door opens. It is Henry, a waiter, bringing the drinks Ausable had ordered. Ausable had known who would knock and used it in his trap. Fowler is astonished.',
      n: 'Finally the door opens, and it is not the police at all. It is Henry, a waiter, bringing the drinks that Ausable had ordered. Now we understand: Ausable knew all along who would knock, and he used that ordinary visit to frighten Max. Fowler is astonished. The dull-looking man has won a deadly contest without lifting a finger.',
    }),
    sl('two-column', 'Theme 1: appearance versus reality', {
      b: 'Nothing in the room is quite what it seems.',
      cols: [
        '**What seems true**\n\n- Ausable is a dull, ordinary man\n- Max, with a gun, is in control\n- there is a balcony\n- the police are at the door',
        '**What is true**\n\n- Ausable is a brilliant agent\n- Ausable is in control\n- there is no balcony\n- it is only the waiter',
      ],
      n: 'The central theme is appearance versus reality. Ausable seems dull, but he is brilliant. Max, with his gun, seems in control, but Ausable is. There seems to be a balcony, but there is none. And the knock seems to be the police, but it is the waiter. In answers, show how each false appearance leads to the surprise.',
    }),
    sl('concept', 'A web of themes', {
      v: vThemes,
      n: 'Around that theme sit others. Presence of mind, as Ausable thinks clearly at gunpoint. Brains over force, since the unarmed man wins. The romance of spying against its reality. Max’s overconfidence, which makes him underestimate his opponent. And the craft of suspense and surprise, built through the knock, the scream and the waiter’s arrival.',
    }),
    sl('check', 'Check: the quiet winner', {
      chk: 'mc_apply_quiz',
      n: 'Check yourself. In a quiz final, a quiet student who looks nervous beats the confident favourite by staying calm. Which character in the story does the quiet student resemble?',
    }),
    sl('concept', 'Character: Ausable, looks and mind', {
      b: 'Your syllabus asks you to contrast his appearance with his intelligence.',
      v: vAusable,
      n: 'Ausable looks fat, untidy and ordinary, and he lives in a plain hotel room. Nothing about him suggests a hero. But his mind is calm, inventive and careful. He keeps steady under a gun, makes up a convincing story, and uses an expected knock as part of his plan. He wins without a weapon. That contrast is the heart of the story.',
    }),
    sl('concept', 'Fowler, Max and Henry', {
      v: vOthers,
      n: 'Fowler is a young writer with romantic ideas of spying. He is the observer, and his disappointment and astonishment mirror ours. Max is armed and confident, but gullible and quick to panic, which proves fatal. Henry, the waiter, does almost nothing, yet his ordinary knock becomes the key to Ausable’s trap.',
    }),
    sl('two-column', 'Why the unarmed man wins', {
      cols: [
        '**Max’s mistakes**\n\n- trusts his gun, not his judgement\n- underestimates a plain-looking man\n- believes a casual remark\n- panics at the word police',
        '**Ausable’s strengths**\n\n- stays calm\n- invents a believable detail\n- plans around an expected knock\n- lets his enemy defeat himself',
      ],
      n: 'Why does the unarmed man win? Max trusts his gun instead of his judgement, underestimates a plain-looking man, believes a casual remark and panics at the word police. Ausable stays calm, invents a believable detail, plans around a knock he expects, and lets his enemy defeat himself. Use these contrasts in long answers.',
    }),
    sl('check', 'Check: why Max fell', {
      chk: 'ar_balcony',
      n: 'Try this assertion and reason item. Decide whether each statement is true, and then whether the reason really explains the assertion.',
    }),
    sl('concept', 'Suspense and the twist', {
      bl: [
        '**Anticlimax first:** a dull opening lowers our expectations.',
        '**Sudden danger:** a gun in a small room.',
        '**Mystery:** why is Ausable talking about a balcony?',
        '**Pressure:** the knock forces a quick decision.',
        '**Twist:** the feared police are only a waiter, and everything makes sense.',
      ],
      n: 'How does Arthur build suspense? He begins with an anticlimax, so we expect nothing. Then comes sudden danger: a gun in a small room. Ausable’s talk of a balcony adds mystery. The knock adds pressure. And the twist, when the waiter walks in, makes us look back and see how every detail fitted the plan.',
    }),
    sl('example', 'Appearance and reality: SOYL’s own examples', {
      b: 'Practise spotting how a story can use a false appearance. These sentences are SOYL’s own, not from the story:',
      bl: [
        '*The new boy in the torn sweater quietly solved the puzzle that had beaten the whole class.* — a plain appearance hiding ability',
        '*The guard dog that frightened every visitor turned out to be scared of the cat.* — a fierce appearance hiding weakness',
        '*The locked box the thieves fought over held only old school reports.* — a prize that is not what it seems',
      ],
      n: 'Here are three sentences of our own. A boy in a torn sweater solves the puzzle: a plain appearance hiding ability. A fierce guard dog fears the cat: a fierce appearance hiding weakness. A box of old reports: a prize that is not what it seems. Now find how Arthur uses appearance and reality in your textbook.',
    }),
    sl('concept', 'Word meanings', {
      v: vWords,
      n: 'These words will help you write about the story. An intruder enters without permission. Gullible means easily tricked. Composure is calmness under pressure. Deceptive means giving a false impression. Presence of mind is the ability to think and act quickly in a crisis. Suspense is anxious uncertainty, a twist is an unexpected turn, and espionage is the work of spies.',
    }),
    sl('example', 'Worked example: planning a 6-mark answer', {
      b: '*Question:* *Appearances can be deceptive.* Discuss with reference to the story.',
      v: vLongPlan,
      bl: [
        '**Stand:** agree; nothing in the story is what it seems.',
        '**Points + evidence:** Fowler misjudges Ausable; Max underestimates him; the balcony and the police are inventions.',
        '**Turn:** the waiter’s arrival reveals the truth.',
        '**Value + conclusion:** judge people by their qualities, not their looks.',
      ],
      n: 'Here is how to plan a six mark answer. Take a stand: agree. Give points with evidence: Fowler misjudges Ausable, Max underestimates him, and the balcony and the police are both inventions. Then show the turn, when the waiter’s arrival reveals the truth. Finish with a value: judge people by their qualities, not their looks.',
    }),
    sl('summary', 'Summary', {
      bl: [
        'Fowler expects a glamorous spy and is disappointed by fat, untidy Ausable.',
        'Max waits in the room with a pistol, after a report on new missiles.',
        'Ausable invents a balcony and says the knock is the police.',
        'Max climbs out to hide and falls; the visitor is Henry, the waiter.',
        'Read the story in *Footprints without Feet*; write about it in your own words.',
      ],
      v: vStages,
      n: 'Let us sum up. Fowler expects a glamorous spy and meets fat, untidy Ausable. Max is waiting with a pistol for a report on new missiles. Ausable invents a balcony and says the knock is the police. Max climbs out to hide and falls, and the visitor is only the waiter. Read the story in your textbook and write in your own words.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        '3-mark answers (40–50 words): point + evidence + explanation.',
        '6-mark answers (100–120 words): stand → 3 points with evidence → value or theme → conclusion.',
        'Facts often confused: the balcony never existed; the knock was the waiter, not the police; Ausable used no weapon.',
        'For character questions, contrast Ausable’s looks with his actions.',
        'Value questions: presence of mind, calm under pressure, not judging by appearances.',
      ],
      n: 'Exam tips. In three mark answers, give a point, evidence and a short explanation. In six mark answers, take a stand, give three supported points, and link to a value. Get the facts right: the balcony never existed, the knock was the waiter, and Ausable used no weapon. And in character answers, contrast his looks with his actions.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'The Midnight Visitor — study notes',
  sections: [
    {
      h: '1. About the text and the author',
      t: 1,
      b: `${READ}\n\n**Robert Arthur** (1909–1969) was an American writer of mystery and suspense, known for radio mysteries and the *Three Investigators* series. This is a short spy story with a twist ending, told in the third person and mostly seen through the eyes of Fowler, a young writer.`,
      v: vAuthor,
      terms: [['Twist ending', 'An unexpected ending that changes how we understand what came before.']],
    },
    {
      h: '2. Summary (in SOYL’s words)',
      t: 1,
      b: '**The disappointment.** Fowler, a young writer, hopes to see the thrilling life of a secret agent, but Ausable is fat and untidy, his hotel room is ordinary, and he calls the work dull.\n\n**The intruder.** In the room, Max, a rival agent, waits with a pistol for a report about new missiles that Ausable expects that night. Ausable stays calm.\n\n**The trap.** Ausable grumbles about a balcony outside his window that lets intruders in. Max believes him; there is no balcony.\n\n**The knock.** Ausable says the knock must be the police. Max decides to hide on the balcony, climbs over the sill, and a scream is heard from below.\n\n**The twist.** The visitor is Henry, a waiter, with drinks Ausable had ordered. Fowler is astonished.',
      v: vStages,
    },
    {
      h: '3. Themes and message',
      t: 2,
      b: '- **Appearance versus reality:** Ausable, the balcony and the knock are all different from how they seem.\n- **Presence of mind:** clear thinking at gunpoint.\n- **Brains over force:** the unarmed man wins.\n- **Romance versus reality of spying:** Fowler’s fantasy against Ausable’s routine.\n- **Overconfidence:** Max underestimates his opponent.\n- **Suspense and surprise:** the knock, the scream, the waiter.\n\n**Message:** intelligence and calm matter more than looks or weapons; never judge by appearances.',
      v: vThemes,
      terms: [['Presence of mind', 'The ability to think clearly and act wisely in a sudden crisis.']],
    },
    {
      h: '4. Ausable: appearance against intelligence',
      t: 3,
      b: '**Looks:** fat, untidy, ordinary room, calls his work dull, nothing like a film hero.\n\n**Mind:** calm under a gun; invents a believable balcony; plans around the expected knock; wins without a weapon.\n\nIn answers, set one column against the other and give evidence for each.',
      v: vAusable,
    },
    {
      h: '5. Fowler, Max and Henry',
      t: 3,
      b: '**Fowler** is a young writer with romantic ideas of spying; as the observer, his disappointment and astonishment mirror the reader’s. **Max** is armed and confident but gullible and quick to panic. **Henry** is the waiter whose ordinary knock becomes the key to the trap.',
      v: vOthers,
    },
    {
      h: '6. Suspense and the twist',
      t: 2,
      b: '- **Anticlimax:** a dull opening.\n- **Sudden danger:** a gun in a small room.\n- **Mystery:** the talk of a balcony.\n- **Pressure:** the knock.\n- **Twist:** the waiter, which makes every detail fall into place.\n\nSOYL practice sentence (not from the story): *The guard dog that frightened every visitor turned out to be scared of the cat* (a fierce appearance hiding weakness).',
      terms: [['Suspense', 'Anxious uncertainty about what will happen next.']],
    },
    {
      h: '7. Word meanings',
      t: 1,
      b: 'Key words for discussing the story: intruder, gullible, composure, deceptive, presence of mind, suspense, twist, espionage. Use them in your own sentences, for example: *Ausable’s composure made Max gullible.*',
      v: vWords,
    },
    {
      h: '8. Answering exam questions',
      t: 4,
      b: '**How this reader is examined:** the board sets 3-mark short answers (40–50 words; two of three) and a 6-mark long answer (100–120 words) on *Footprints without Feet*. It does not print extracts from this reader; SOYL’s commentary items are comprehension practice only.\n\n**Short answers (3 marks):** point + evidence + explanation.\n\n**Long answers (6 marks):** a clear stand; three points with evidence in your own words; a link to a value or theme; a one-line conclusion. Extrapolation tasks (Fowler’s diary, Ausable’s report to his chief) must stay consistent with the story.\n\nRe-read the story in *Footprints without Feet* before a test.',
      v: vLongPlan,
    },
  ],
  tips: '**Board weight:** Footprints short answers (3 marks, 40–50 words, two of three) and one long answer (6 marks, 100–120 words) (CBSE 2026-27, Section C). No extracts from this reader.\n\n**How marks are awarded:** content (relevant events, accurately used), interpretation (a clear, supported view or value), and expression within the word limit.\n\n**Common mistakes**\n1. Saying there was a balcony: Ausable invented it.\n2. Saying the police arrived: it was Henry, the waiter.\n3. Saying Ausable fought or shot Max: he used no weapon.\n4. Treating Fowler as the hero: he is the observer.\n5. Quoting lines from memory instead of explaining in your own words.\n\n**Remember:** read the story in your textbook, *Footprints without Feet*.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Who wrote *The Midnight Visitor*?', 'Robert Arthur (1909–1969), American mystery writer.', 'fact', 1],
  ['Who is Ausable?', 'A fat, untidy secret agent with a brilliant mind.', 'fact', 3],
  ['Who is Fowler?', 'A young writer who hopes to see a spy’s thrilling life.', 'fact', 3],
  ['Who is Max?', 'A rival agent waiting in the room with a pistol.', 'fact', 3],
  ['Who is Henry?', 'The waiter who knocks with Ausable’s drinks.', 'fact', 1],
  ['Why was Fowler disappointed?', 'Ausable looked ordinary and his work seemed dull.', 'fact', 1],
  ['What did Max want?', 'A report about new missiles.', 'fact', 1],
  ['How did Ausable react to the pistol?', 'Calmly, almost with irritation.', 'fact', 3],
  ['What did Ausable invent?', 'A balcony outside his window.', 'fact', 2],
  ['Who did Ausable say was knocking?', 'The police.', 'fact', 1],
  ['What did Max decide to do?', 'Hide on the balcony until the visitors left.', 'fact', 1],
  ['What happened to Max?', 'He climbed out and fell; a scream was heard.', 'fact', 1],
  ['Who was really at the door?', 'Henry, the waiter, with drinks.', 'fact', 1],
  ['Why did the trick work?', 'Ausable mentioned the balcony casually and used an expected knock.', 'concept', 2],
  ['Central theme', 'Appearances can be deceptive.', 'concept', 2],
  ['Ausable’s key quality', 'Presence of mind.', 'concept', 3],
  ['Max’s weaknesses', 'Overconfidence, gullibility, panic.', 'concept', 3],
  ['Fowler’s role', 'The observer whose reactions mirror the reader’s.', 'concept', 3],
  ['Brains over force', 'An unarmed man defeats an armed one by thinking.', 'concept', 2],
  ['What kind of ending?', 'A twist ending.', 'concept', 2],
  ['How suspense builds', 'Dull start → a gun → the balcony → the knock → the scream → the twist.', 'concept', 2],
  ['Irony of the knock', 'The feared police are only a waiter.', 'concept', 2],
  ['Tone of the story', 'Tense, then surprising, with dry humour.', 'concept', 2],
  ['*gullible*', 'easily tricked', 'definition', 1],
  ['*composure*', 'calmness under pressure', 'definition', 1],
  ['*espionage*', 'the work of spies', 'definition', 1],
  ['How this reader is examined', '3-mark short answers (40–50 words) and a 6-mark long answer; no extracts.', 'exam-tip', 4],
  ['Plan for a 6-mark answer', 'Stand → three points with evidence → value or theme → conclusion (100–120 words).', 'exam-tip', 4],
  ['Most common factual slip', 'Saying there was a balcony, or that the police came.', 'exam-tip', 4],
  ['Value for life', 'Stay calm and think in a crisis; don’t judge by looks.', 'concept', 2],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-short',
  title: 'Chapter test (short) — The Midnight Visitor',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Commentary-based (5 marks)', instr: 'Read the commentary and answer all parts. (The passage is SOYL commentary used as a comprehension check; the board sets no extracts from Footprints without Feet.)', items: ['src_fowler'] },
    { id: 'B', title: 'Section B — Short answers (3 marks each)', instr: 'Answer any three of four in 40–50 words.', items: [{ attempt: 3, keys: ['sa_max_purpose', 'sa_balcony_trick', 'sa_appearance', 'sa_henry'] }] },
    { id: 'C', title: 'Section C — Long answer (6 marks)', instr: 'Answer any one in 100–120 words.', items: [{ attempt: 1, keys: ['la_ausable_sketch', 'la_appearance_theme'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-long',
  title: 'Chapter test (long) — The Midnight Visitor',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Commentary-based (2 × 5 marks)', instr: 'In each pair, answer one passage. (Passages are SOYL commentary used as comprehension checks.)', items: [{ attempt: 1, keys: ['src_max', 'src_balcony'] }, { attempt: 1, keys: ['src_knock', 'src_henry'] }] },
    { id: 'B', title: 'Section B — Short answers (2 marks each)', instr: 'Answer any three of four in 30–40 words.', items: [{ attempt: 3, keys: ['sb_who', 'sb_report', 'sb_police', 'sb_fowler_end'] }] },
    { id: 'C', title: 'Section C — Short answers (3 marks each)', instr: 'Answer any four of five in 40–50 words.', items: [{ attempt: 4, keys: ['sa_fowler_expect', 'sa_knock', 'sa_presence', 'sa_max_trait', 'sa_suspense'] }] },
    { id: 'D', title: 'Section D — Long answers (6 marks each)', instr: 'Answer one question from each pair in 100–120 words.', items: [{ attempt: 1, keys: ['la_max_mistakes', 'la_twist'] }, { attempt: 1, keys: ['la_fowler_diary', 'la_report_police'] }] },
  ],
});

build({
  dir: DIR,
  decks: [D],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 only; no removed topics for 2026-27',
    pattern: 'Footprints without Feet is examined by 3-mark short answers (Q9) and a 6-mark long answer, not extracts; the bank is weighted to those (14 three-mark, 9 long); the 5 commentary items fill the chapter-test blueprints’ extract slots as comprehension checks',
    literature_rule: 'no sentence, close paraphrase or distinctive phrase of the text; dialogue reported, never quoted; summaries in SOYL words; commentary items use passage_origin soyl-commentary; single words only for word meanings; textbook pointer on the title slide, notes and every passage stem',
    originality: 'questions written for SOYL; NCERT exercise questions not reused (stems reframed where a classic question exists)',
    re_solve: 'author verifier pass: every item re-answered from its stem and checked against the story',
    gate: 'npm test -w @soyl/content-templates and content lint (lintExemplar) run clean on this chapter',
  },
});

// D-036 reproduction guard: short distinctive phrases (at most 4 words) that must never appear.
guard(DIR, [
  'mysterious woman', 'mysterious women', 'dark-eyed beauties', 'romantic figure', 'thick accent', 'small automatic',
  'extending under', 'under my window', 'beneath my window', 'complain to the management', 'second time this month',
  'pass key', 'passkey', 'wheezing', 'a nice tidy', 'shot in the dark',
]);
