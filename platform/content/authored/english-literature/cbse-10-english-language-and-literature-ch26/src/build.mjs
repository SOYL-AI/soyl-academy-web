// Build CBSE 10 English Language and Literature ch26 "A Question of Trust" (Victor Canning). Run from platform/:
//   npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch26/src/build.mjs
// LITERATURE RULE: everything here is SOYL's own summary, analysis and commentary; the story is never
// quoted or closely paraphrased, and its dialogue is only reported. Students read it in Footprints without Feet.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';
import { guard } from '../../cbse-10-english-language-and-literature-ch23/src/guard.mjs';

setUnit('cbse-10-english-language-and-literature-ch26', 'english-literature');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const READ = "**Read the story itself in your textbook, *Footprints without Feet* (NCERT supplementary reader).** This lesson is SOYL's explanation and analysis; it does not reproduce the text.";

// ---------------------------------------------------------------- visuals
const vBoard = table(
  ['In the board paper', 'Question form', 'Marks'],
  [
    ['Short answer (Footprints)', '40–50 words; answer two of three', '3 each'],
    ['Long answer (Footprints)', '100–120 words: character, theme, values, diary or letter', '6'],
    ['Extract (reference to context)', 'not set from this reader; SOYL tests use commentary items only as comprehension checks', '—'],
  ],
  'Table of how a Footprints without Feet story is examined: three-mark short answers of forty to fifty words, two of three to be answered, and a six-mark long answer of one hundred to one hundred and twenty words on character, theme, values, or a diary or letter. Extracts are not set from this reader.',
  'CBSE 2026-27, Section C (literature), questions on the supplementary reader.',
);
const vAuthor = table(
  ['About the text', ''],
  [
    ['Author', 'Victor Canning (1911–1986), English writer of thrillers and spy novels'],
    ['Known for', 'suspense fiction with clever plots and twists'],
    ['Genre', 'a short crime story with an ironic twist, told in the third person'],
    ['Setting', 'Shotover Grange, a large English country house'],
    ['Main characters', 'Horace Danby, a respectable locksmith and secret safe-breaker; a young woman who is not what she seems'],
  ],
  'Table of facts: the author is Victor Canning, 1911 to 1986, an English writer of thrillers and spy novels known for clever plots; the story is a short crime story with an ironic twist, told in the third person; it is set at Shotover Grange, an English country house; the main characters are Horace Danby and a young woman who is not what she seems.',
);
const vStages = flow('LR', ['A respectable thief', 'The plan for Shotover Grange', 'Inside the house', 'A lady in the doorway', 'The safe opened', 'Prison and the truth'], 'Flow of the story in six stages: a respectable thief; the plan for Shotover Grange; inside the house; a lady in the doorway; the safe opened; prison and the truth.', 'The story in six stages (SOYL summary).');
const vThemes = table(
  ['Theme', 'Where we see it (SOYL summary)'],
  [
    ['The deceiver deceived', 'A thief who fools the world is fooled by a thief.'],
    ['Misplaced trust', 'Horace believes a stranger because she seems respectable.'],
    ['Appearance versus reality', 'Both thieves hide behind respectable faces.'],
    ['Crime does not pay', 'Horace gains nothing and goes to prison.'],
    ['Pride before a fall', 'Showing off his skill, he leaves fingerprints.'],
    ['Self-deception', 'Horace thinks a polite crime is a harmless one.'],
  ],
  'Table of six themes with where each appears: the deceiver deceived, misplaced trust, appearance versus reality, crime does not pay, pride before a fall, and self-deception.',
);
const vHorace = table(
  ['Horace’s trait', 'Evidence (in SOYL’s words)'],
  [
    ['Outwardly respectable', 'An unmarried locksmith trusted by his neighbours.'],
    ['Cultured', 'Spends his loot on rare, costly books.'],
    ['Methodical', 'Plans one careful robbery a year; studies the house.'],
    ['Non-violent, polite', 'Thinks of himself almost as a gentleman thief.'],
    ['Gullible', 'Believes the woman’s claim to own the house.'],
    ['Vain about his skill', 'Opens the safe without gloves for an admiring audience.'],
  ],
  'Table of Horace Danby’s traits with evidence: outwardly respectable, cultured, methodical, non-violent and polite, gullible, and vain about his skill.',
);
const vLady = table(
  ['The young woman', 'Evidence (in SOYL’s words)'],
  [
    ['Cool and composed', 'Shows no fear on finding a burglar.'],
    ['Cunning', 'Turns his crime into her opportunity.'],
    ['Convincing', 'Acts the lady of the house perfectly.'],
    ['Ruthless', 'Leaves Horace to take the blame.'],
  ],
  'Table of the young woman’s traits with evidence: cool and composed, cunning, convincing and ruthless.',
);
const vWords = table(
  ['Word', 'Meaning'],
  [
    ['respectable', 'regarded as honest and decent'],
    ['locksmith', 'a person who makes and repairs locks'],
    ['gullible', 'easily deceived'],
    ['allergy', 'a bodily reaction to a substance such as pollen'],
    ['combination', 'the sequence of numbers that opens a safe'],
    ['irony', 'an outcome opposite to what is expected'],
    ['impostor', 'a person who pretends to be someone else'],
    ['comeuppance', 'a deserved punishment'],
  ],
  'Table of word meanings: respectable, locksmith, gullible, allergy, combination, irony, impostor and comeuppance.',
  'Key words for this story with their meanings.',
);
const vLongPlan = flow('LR', ['Take a clear stand', 'Point + evidence (own words)', 'Two or three such points', 'Link to a value or theme', 'One-line conclusion'], 'Flow for planning a six-mark long answer: take a stand, give points with evidence in your own words, link to a value or theme, and conclude.');

// ---------------------------------------------------------------- deck
const D = deck({
  title: 'A Question of Trust',
  goals: [
    'Retell the story of the robbery at Shotover Grange in your own words',
    'Explain the irony of a thief being tricked by another thief',
    'Describe Horace Danby’s character with evidence',
    'Discuss trust, appearance and honesty as values',
    'Write 3-mark and 6-mark answers within the word limits',
  ],
  slides: [
    sl('title', 'A Question of Trust — Victor Canning', {
      b: `*Footprints without Feet* (supplementary reader) · Class 10 CBSE English.\n\n${READ}`,
      v: vBoard,
      n: 'Welcome. Today we study A Question of Trust by Victor Canning, the story of a careful, respectable thief who is outwitted by someone just like himself. Please read the story in your textbook, Footprints without Feet, before you go on. This lesson does not repeat the text. The board tests this reader through short and long answers, so that is our focus.',
    }),
    sl('concept', 'How to use this lesson', {
      bl: [
        'Read the story once in *Footprints without Feet*.',
        'Use these slides for the sequence of events, the themes and Horace’s character.',
        'The board asks 3-mark and 6-mark questions on this reader, not extracts: practise those most.',
        'Explain events **in your own words**; do not memorise lines.',
      ],
      n: 'Here is how to use this lesson. Read the story first. Then use these slides for the order of events, the themes, and the character of Horace Danby. The board does not print extracts from this reader; it asks short and long answers. So practise explaining, in your own words, how Horace is tricked and why the ending is ironic.',
    }),
    sl('concept', 'The author and the text', {
      v: vAuthor,
      n: 'Victor Canning, who lived from nineteen eleven to nineteen eighty-six, was an English writer of thrillers and spy novels, famous for clever plots. This short crime story is told in the third person. It is set in an English country house called Shotover Grange, and it ends with a twist that turns the whole story into an ironic lesson.',
    }),
    sl('diagram', 'The story in six stages', {
      b: 'A careful thief, a careless moment. (A SOYL summary, not the text.)',
      v: vStages,
      n: 'The story moves through six stages. We meet a respectable thief. He plans to rob Shotover Grange. He gets inside the house. A young lady appears in the doorway. He opens the safe for her. And finally, in prison, he learns the truth. Keep this map in mind as we go through each stage.',
    }),
    sl('concept', 'Summary 1: a respectable thief', {
      b: 'Horace Danby is a middle-aged, unmarried locksmith whom everyone thinks respectable. He loves rare, expensive books, and to pay for them he carries out one carefully planned robbery each year, without violence.',
      n: 'Horace Danby seems the most respectable of men. He is a middle-aged, unmarried locksmith, polite and tidy. But he has a secret. He loves rare and expensive books, and to afford them he carries out one carefully planned robbery each year. He never uses violence, and he thinks of himself almost as a gentleman. That self-image is about to be tested.',
    }),
    sl('concept', 'Summary 2: the plan for Shotover Grange', {
      b: 'This year’s target is Shotover Grange, a country house with a safe full of jewels. Horace knows the family is away in London and the servants are out. His only weakness is hay fever, and the house is full of flowers.',
      n: 'This year Horace has chosen Shotover Grange, a large country house with a safe full of valuable jewels. He has studied it carefully. The owners are away in London and the servants are out, so the house should be empty. There is one weakness he cannot plan away: he suffers from hay fever, and the rooms are full of flowers.',
    }),
    sl('check', 'Check: the order of events', {
      chk: 'ord_events',
      n: 'Your turn. Six events from the story are shuffled. Put them in order, from Horace choosing his target to his arrest.',
    }),
    sl('concept', 'Summary 3: a lady in the doorway', {
      b: 'As Horace starts work, a young woman appears, calm and amused, and lets him believe she owns the house. She says she has forgotten the safe’s combination: if he opens it for her, she will not call the police. Horace agrees.',
      n: 'Just as Horace begins, a young woman appears in the doorway. She is calm, even amused, and she lets him believe she is the lady of the house. She makes an offer. She says she has forgotten the combination of the safe; if he opens it for her, she will not call the police. Relieved and embarrassed, Horace agrees.',
    }),
    sl('concept', 'Summary 4: the safe opened', {
      b: 'Eager to show his skill, Horace opens the safe without his gloves and hands over the jewels. He leaves, relieved, believing he has escaped trouble.',
      n: 'Now Horace has an audience, and he cannot resist showing his skill. He works on the safe without his gloves, opens it and hands over the jewels. Then he leaves, relieved to have escaped so lightly. But the careful planner has just made the one mistake a careful thief must never make: he has left his fingerprints behind.',
    }),
    sl('concept', 'Summary 5: prison and the truth', {
      b: 'The jewels vanish. The police find Horace’s fingerprints and arrest him. The young woman was never the lady of the house; she was a thief. Horace ends up in prison, bitter that he was so easily used.',
      n: 'Soon the jewels are missing and the police find Horace’s fingerprints on the safe. He is arrested and sent to prison. Only then does he understand that the young woman was never the lady of the house. She was a thief, and she let him do the difficult work. In prison, Horace finds it hard to accept how easily he was used.',
    }),
    sl('two-column', 'Theme 1: the deceiver deceived', {
      b: 'Horace is tricked in exactly the way he tricks others.',
      cols: [
        '**How Horace deceives**\n\n- a respectable face\n- polite manners\n- a trusted trade\n- the world believes him',
        '**How Horace is deceived**\n\n- her respectable face\n- her polite manners\n- her air of owning the house\n- he believes her',
      ],
      n: 'The central theme is the deceiver deceived. Horace fools the world with a respectable face, polite manners and a trusted trade. The young woman fools him in exactly the same way, with a respectable face, polite manners and an air of owning the house. In answers, set these side by side to show the irony clearly.',
    }),
    sl('concept', 'A web of themes', {
      v: vThemes,
      n: 'Around that centre sit other themes. Misplaced trust, since Horace believes a stranger. Appearance against reality, as both thieves hide behind respectable faces. Crime does not pay, because he gains nothing and goes to prison. Pride before a fall, when he works without gloves. And self-deception, as Horace tells himself that a polite crime is a harmless one.',
    }),
    sl('check', 'Check: the same trap today', {
      chk: 'mc_apply_online',
      n: 'Check yourself. A man who often cheats others online trusts a polite stranger with his password and loses his savings. Whose fate in the story does this resemble?',
    }),
    sl('concept', 'Character: Horace Danby', {
      b: 'Your syllabus asks you to describe Horace’s character with evidence.',
      v: vHorace,
      n: 'Let us sketch Horace Danby. Outwardly he is respectable. He is cultured, with a love of rare books, and methodical, planning one robbery a year. He is polite and non-violent. But he is also gullible, believing the woman at once, and vain about his skill, which is why he opens the safe without gloves. His strengths and weaknesses together explain his fall.',
    }),
    sl('concept', 'The young woman', {
      v: vLady,
      n: 'The young woman is Horace’s mirror. She is cool and composed, showing no fear when she finds a burglar. She is cunning, turning his crime into her chance. She is convincing, acting the lady of the house perfectly. And she is ruthless, leaving him to take the blame. She is everything Horace thought he was, only cleverer.',
    }),
    sl('two-column', 'Was Horace’s crime harmless?', {
      cols: [
        '**What Horace believed**\n\n- he used no violence\n- he robbed only once a year\n- he was polite and careful',
        '**What the story shows**\n\n- theft is theft, however polite\n- he betrayed his neighbours’ trust\n- a polite thief ruins him in turn',
      ],
      n: 'A common long question asks whether Horace’s crimes were harmless. He believed so: no violence, only one robbery a year, perfect manners. But the story shows otherwise. Theft is theft, however politely done, and he betrayed the trust of everyone who thought him honest. Then a polite thief ruins him. Take a clear stand, with evidence.',
    }),
    sl('check', 'Check: why Horace robbed', {
      chk: 'ar_books',
      n: 'Try this assertion and reason item. Decide whether each statement is true, and then whether the reason really explains the assertion.',
    }),
    sl('concept', 'Irony and the twist', {
      bl: [
        '**Situational irony:** the trickster is tricked.',
        '**Dramatic irony on re-reading:** the clues to the woman were there all along.',
        '**A fitting twist:** the ending surprises, yet feels just.',
        '**Irony of the title:** trust is the question, and the answer ruins Horace.',
        '**Light, wry tone:** humour without a lecture.',
      ],
      n: 'How does Canning tell the story? Through irony. The trickster is tricked. On a second reading we notice the clues to the woman. The twist surprises us, yet feels just, because Horace is paid back in his own coin. The title itself is ironic: trust is the question, and his answer ruins him. And the tone stays light and wry.',
    }),
    sl('example', 'Irony: SOYL’s own examples', {
      b: 'Practise spotting situational irony. These sentences are SOYL’s own, not from the story:',
      bl: [
        '*The pickpocket reached home to find that his own wallet had been stolen on the bus.* — the cheat is cheated',
        '*The fire station burned down during the fire-safety week.* — the protector fails',
        '*The spelling champion misspelt her own name on the certificate.* — the expert slips',
      ],
      n: 'Here are three sentences of our own. A pickpocket’s own wallet is stolen: the cheat is cheated, just like Horace. A fire station burns during fire-safety week: the protector fails. A spelling champion misspells her name: the expert slips. In each, the outcome is the opposite of what we expect. Now find Canning’s irony in your textbook.',
    }),
    sl('concept', 'Word meanings', {
      v: vWords,
      n: 'These words will help you write about the story. Respectable means regarded as honest. A locksmith makes and repairs locks. Gullible means easily deceived. An allergy is a reaction to something like pollen. A combination is the sequence that opens a safe. Irony is an opposite outcome. An impostor pretends to be someone else, and a comeuppance is a deserved punishment.',
    }),
    sl('example', 'Worked example: planning a 6-mark answer', {
      b: '*Question:* *A thief cheated by another thief.* Discuss the irony.',
      v: vLongPlan,
      bl: [
        '**Stand:** the story is built on this irony.',
        '**Points + evidence:** Horace’s respectable mask; the woman’s identical mask; his trust; the fingerprints.',
        '**Turn:** prison for jewels he never kept.',
        '**Value + conclusion:** those who exploit trust may find their own trust exploited.',
      ],
      n: 'Here is how to plan a six mark answer. Take a stand: the whole story is built on this irony. Give points with evidence: Horace’s respectable mask, the woman’s matching one, his trust in her, and the fingerprints. Then show the turn: prison for jewels he never kept. Finish with a value: those who exploit trust may find their own trust exploited.',
    }),
    sl('summary', 'Summary', {
      bl: [
        'Horace Danby, a respectable locksmith, robs a single safe each year to buy rare books.',
        'At Shotover Grange a young woman, posing as the owner, asks him to open the safe.',
        'He opens it without gloves and hands over the jewels.',
        'His fingerprints send him to prison; she was a thief.',
        'Read the story in *Footprints without Feet*; write about it in your own words.',
      ],
      v: vStages,
      n: 'Let us sum up. Horace Danby, a respectable locksmith, robs a single safe each year to buy rare books. At Shotover Grange a young woman, posing as the owner, asks him to open the safe. He does so without gloves and hands over the jewels. His fingerprints send him to prison, and she turns out to be a thief. Read the story in your textbook.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        '3-mark answers (40–50 words): point + evidence + explanation.',
        '6-mark answers (100–120 words): stand → 3 points with evidence → value or theme → conclusion.',
        'Facts often confused: the woman was not the owner; Horace kept none of the jewels; fingerprints, not a witness, convicted him.',
        'For character questions, balance Horace’s strengths with the weaknesses that ruined him.',
        'Value questions: honesty, trust, appearances, pride.',
      ],
      n: 'Exam tips. In three mark answers, give a point, evidence and a short explanation. In six mark answers, take a stand, give three supported points, and link to a value. Get the facts right: the woman was not the owner, Horace kept none of the jewels, and his fingerprints convicted him. In character answers, balance his strengths and weaknesses.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'A Question of Trust — study notes',
  sections: [
    {
      h: '1. About the text and the author',
      t: 1,
      b: `${READ}\n\n**Victor Canning** (1911–1986) was an English writer of thrillers and spy novels, known for clever plots and twists. This short crime story is told in the third person and set at Shotover Grange, an English country house.`,
      v: vAuthor,
      terms: [['Twist', 'An unexpected turn in a story, often at the end.']],
    },
    {
      h: '2. Summary (in SOYL’s words)',
      t: 1,
      b: '**The thief.** Horace Danby, a middle-aged, unmarried locksmith, seems respectable to all. To buy rare, costly books he commits one carefully planned, non-violent robbery a year.\n\n**The plan.** His target is Shotover Grange, which has a safe full of jewels. The owners are in London and the servants are out. His one weakness is hay fever, and the house is full of flowers.\n\n**The woman.** A young woman appears, calm and amused, and lets him think she owns the house. She says she has forgotten the combination and will not call the police if he opens the safe.\n\n**The safe.** Horace opens it without his gloves and hands over the jewels.\n\n**The truth.** The police find his fingerprints and arrest him. The woman was a thief. Horace, in prison, finds it hard to accept how he was used.',
      v: vStages,
    },
    {
      h: '3. Themes and message',
      t: 2,
      b: '- **The deceiver deceived:** Horace is tricked as he tricks others.\n- **Misplaced trust:** he believes a stranger who seems respectable.\n- **Appearance versus reality:** both thieves wear respectable faces.\n- **Crime does not pay:** he gains nothing and goes to prison.\n- **Pride before a fall:** working without gloves.\n- **Self-deception:** he thinks a polite crime is harmless.\n\n**Message:** dishonesty catches up with us, and those who exploit trust may find their own trust exploited.',
      v: vThemes,
      terms: [['Situational irony', 'When what happens is the opposite of what we expect.']],
    },
    {
      h: '4. Horace Danby',
      t: 3,
      b: '**Outwardly respectable** (a trusted locksmith). **Cultured** (rare books). **Methodical** (one planned robbery a year). **Polite and non-violent**. **Gullible** (believes the woman). **Vain about his skill** (opens the safe without gloves). His strengths made him successful for years; his weaknesses ruined him in one evening.',
      v: vHorace,
    },
    {
      h: '5. The young woman',
      t: 3,
      b: '**Cool and composed** (no fear of a burglar). **Cunning** (turns his crime to her profit). **Convincing** (plays the lady of the house). **Ruthless** (leaves him to take the blame). She mirrors Horace, only more skilfully.',
      v: vLady,
    },
    {
      h: '6. Irony, twist and tone',
      t: 2,
      b: '- **Situational irony:** the trickster is tricked.\n- **Clues on re-reading:** her calm, her bargain.\n- **A fitting twist:** surprising yet just.\n- **Ironic title:** trust is the question; his answer ruins him.\n- **Tone:** light and wry.\n\nSOYL practice sentence (not from the story): *The pickpocket reached home to find that his own wallet had been stolen on the bus* (the cheat is cheated).',
      terms: [['Poetic justice', 'An outcome in which wrongdoing is fittingly punished.']],
    },
    {
      h: '7. Word meanings',
      t: 1,
      b: 'Key words for discussing the story: respectable, locksmith, gullible, allergy, combination, irony, impostor, comeuppance. Use them in your own sentences, for example: *Horace, a gullible locksmith, met an impostor more skilful than himself.*',
      v: vWords,
    },
    {
      h: '8. Answering exam questions',
      t: 4,
      b: '**How this reader is examined:** the board sets 3-mark short answers (40–50 words; two of three) and a 6-mark long answer (100–120 words) on *Footprints without Feet*. It does not print extracts from this reader; SOYL’s commentary items are comprehension practice only.\n\n**Short answers (3 marks):** point + evidence + explanation.\n\n**Long answers (6 marks):** a clear stand; three points with evidence in your own words; a link to a value or theme; a one-line conclusion. Extrapolation tasks (Horace’s prison diary, the woman’s letter) must stay consistent with the story.\n\nRe-read the story in *Footprints without Feet* before a test.',
      v: vLongPlan,
    },
  ],
  tips: '**Board weight:** Footprints short answers (3 marks, 40–50 words, two of three) and one long answer (6 marks, 100–120 words) (CBSE 2026-27, Section C). No extracts from this reader.\n\n**How marks are awarded:** content (relevant events, accurately used), interpretation (a clear, supported view or value), and expression within the word limit.\n\n**Common mistakes**\n1. Saying the woman owned the house: she was a thief posing as the owner.\n2. Saying Horace kept the jewels: he handed them over.\n3. Forgetting the gloves: his fingerprints convicted him.\n4. Calling Horace violent: he prided himself on avoiding violence.\n5. Quoting lines from memory instead of explaining in your own words.\n\n**Remember:** read the story in your textbook, *Footprints without Feet*.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Who wrote *A Question of Trust*?', 'Victor Canning (1911–1986), English thriller writer.', 'fact', 1],
  ['Who is Horace Danby?', 'A respectable, unmarried locksmith who secretly robs safes.', 'fact', 3],
  ['Horace’s passion', 'Rare, expensive books.', 'fact', 3],
  ['How often did Horace rob?', 'Once a year, to pay for his books.', 'fact', 1],
  ['His target this year', 'Shotover Grange, a country house with a safe of jewels.', 'fact', 1],
  ['Where were the owners?', 'Away in London.', 'fact', 1],
  ['Horace’s physical weakness', 'Hay fever, so the flowers made him sneeze.', 'fact', 1],
  ['Who surprised Horace?', 'A young woman who posed as the lady of the house.', 'fact', 1],
  ['What did she claim?', 'That she had forgotten the safe’s combination.', 'fact', 1],
  ['Her offer', 'No police if he opened the safe for her.', 'fact', 1],
  ['Horace’s fatal mistake', 'Opening the safe without gloves.', 'fact', 1],
  ['How was he caught?', 'His fingerprints were on the safe.', 'fact', 1],
  ['Who was the woman really?', 'A thief.', 'fact', 1],
  ['Where does Horace end up?', 'In prison.', 'fact', 1],
  ['Central irony', 'A deceiver is deceived; a thief is tricked by a thief.', 'concept', 2],
  ['Why did Horace trust her?', 'Her calm, elegant manner and air of owning the house.', 'concept', 3],
  ['Four traits of Horace', 'Respectable, cultured, methodical, gullible (and vain).', 'concept', 3],
  ['Traits of the young woman', 'Cool, cunning, convincing, ruthless.', 'concept', 3],
  ['Meaning of the title', 'Trust is the question; misplaced trust ruins Horace.', 'concept', 2],
  ['Was his crime harmless?', 'No: theft is theft, and he betrayed his neighbours’ trust.', 'concept', 2],
  ['Tone of the story', 'Light, wry and ironic.', 'concept', 2],
  ['Value for life', 'Honesty matters; don’t judge or trust by appearances.', 'concept', 2],
  ['*gullible*', 'easily deceived', 'definition', 1],
  ['*impostor*', 'a person who pretends to be someone else', 'definition', 1],
  ['*comeuppance*', 'a deserved punishment', 'definition', 1],
  ['*combination* (of a safe)', 'the sequence of numbers that opens it', 'definition', 1],
  ['How this reader is examined', '3-mark short answers (40–50 words) and a 6-mark long answer; no extracts.', 'exam-tip', 4],
  ['Plan for a 6-mark answer', 'Stand → three points with evidence → value or theme → conclusion (100–120 words).', 'exam-tip', 4],
  ['Most common factual slip', 'Saying the woman owned the house, or that Horace kept the jewels.', 'exam-tip', 4],
  ['Poetic justice', 'Horace, who fooled others, is fooled and punished.', 'concept', 2],
]);

// ---------------------------------------------------------------- tests
// Supplementary-reader blueprints (catalog chapter override, 2026-10-27): no extract section; the board sets
// Footprints without Feet only as 3-mark short answers (two of three) and a 6-mark long answer.
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-short-supplementary',
  title: 'Chapter test (short) — A Question of Trust',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Short answers (3 marks each)', instr: 'Two sets of three questions; in each set answer any two in 40–50 words.', items: [{ attempt: 2, keys: ['sa_plan', 'sa_lady_trick', 'sa_why_steal'] }, { attempt: 2, keys: ['sa_caught', 'sa_irony', 'sa_title'] }] },
    { id: 'B', title: 'Section B — Long answer (6 marks)', instr: 'Answer any one of two questions in 100–120 words.', items: [{ attempt: 1, keys: ['la_horace_sketch', 'la_irony_theme'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-long-supplementary',
  title: 'Chapter test (long) — A Question of Trust',
  duration: 80,
  sections: [
    { id: 'A', title: 'Section A — Short answers (2 marks each)', instr: 'Answer any three of four in 30–40 words.', items: [{ attempt: 3, keys: ['sb_who', 'sb_target', 'sb_offer', 'sb_gloves'] }] },
    { id: 'B', title: 'Section B — Short answers (3 marks each)', instr: 'Two sets of three questions; in each set answer any two in 40–50 words.', items: [{ attempt: 2, keys: ['sa_horace_life', 'sa_hayfever', 'sa_prison'] }, { attempt: 2, keys: ['sa_why_trust', 'sa_horace_traits', 'sa_crime_pays'] }] },
    { id: 'C', title: 'Section C — Long answers (6 marks each)', instr: 'Answer one question from each of the three pairs in 100–120 words.', items: [{ attempt: 1, keys: ['la_trust', 'la_ending'] }, { attempt: 1, keys: ['la_horace_diary', 'la_lady_letter'] }, { attempt: 1, keys: ['la_crime_debate', 'la_values'] }] },
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
  'not completely honest', 'good and respectable', 'a year in comfort', 'fifteen thousand pounds', 'honour among thieves',
  'assistant librarian', 'dressed in red', 'red dress', 'lady in red', 'charming young lady', 'old enemies',
  'nasty shock', 'gone to the cinema', 'one safe a year',
]);
