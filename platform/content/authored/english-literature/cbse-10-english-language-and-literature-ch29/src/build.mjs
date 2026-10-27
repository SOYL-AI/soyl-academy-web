// Build CBSE 10 English Language and Literature ch29 "The Necklace" (Guy de Maupassant). Run from platform/:
//   npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch29/src/build.mjs
// LITERATURE RULE: everything here is SOYL's own summary, analysis and commentary, written at the level of
// events and ideas; the NCERT version is never quoted or closely paraphrased and speech is reported.
// Students read the chapter in Footprints without Feet (NCERT supplementary reader).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';
import { checkForbidden } from '../../cbse-10-english-language-and-literature-ch27/src/guard.mjs';

setUnit('cbse-10-english-language-and-literature-ch29', 'english-literature');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const READ = "**Read the chapter itself in your supplementary reader, *Footprints without Feet* (NCERT).** This lesson is SOYL's explanation and analysis; it does not reproduce the text.";

// Short distinctive phrases (four words or fewer) that must not appear anywhere in this chapter's files.
const GUARD = ['petty clerk', 'family of clerks', 'shooting larks', 'worth at most', 'returned it sooner', 'Board of Education', 'my poor Matilda', 'rich furs', 'modest wraps'];

// ---------------------------------------------------------------- visuals
const vBoard = table(
  ['In the board paper', 'Question form', 'Marks'],
  [
    ['Short answer (Footprints without Feet)', '40–50 words; answer two of three', '3 each'],
    ['Long answer (Footprints without Feet)', '100–120 words on character, theme or values: sketch, opinion, diary, letter or alternative ending; one of two', '6'],
    ['SOYL chapter tests only', 'commentary passages with short parts on character and theme (extra practice; no extract is set from this book)', '5'],
  ],
  'Table of how a Footprints without Feet chapter is examined: three-mark short answers of forty to fifty words, two of three to be answered, and a six-mark long answer of one hundred to one hundred and twenty words on character, theme or values. SOYL chapter tests also include five-mark commentary passages for extra practice.',
  'CBSE 2026-27, Section C (literature): the supplementary reader is not used for extracts.',
);
const vAuthor = table(
  ['About the text', ''],
  [
    ['Author', 'Guy de Maupassant (1850–1893), French short-story writer'],
    ['Original', 'a French short story (1884); the reader has an English version'],
    ['Genre', 'short story with a twist ending'],
    ['Setting', 'Paris, in the late nineteenth century'],
    ['Main characters', 'Matilda Loisel; her husband, Loisel, a clerk; her wealthy friend, Madame Forestier'],
  ],
  'Table of facts: the author is Guy de Maupassant, 1850 to 1893, a French short-story writer; the original French story appeared in 1884 and the reader has an English version; it is a short story with a twist ending set in late nineteenth-century Paris; the main characters are Matilda Loisel, her husband Loisel and her wealthy friend Madame Forestier.',
);
const vStages = flow('LR', ['A discontented wife', 'The invitation and the dress', 'The borrowed necklace', 'Triumph and loss', 'Ten years of debt', 'The truth'], 'Flow of the story in six stages: a discontented wife; the invitation and the dress; the borrowed necklace; triumph and loss; ten years of debt; the truth.', 'The story in six stages (SOYL summary).');
const vThemes = table(
  ['Theme', 'Where we see it (SOYL summary)'],
  [
    ['Vanity and pride', 'The dress, the jewels, the shame about a plain shawl, the silence.'],
    ['Appearance and reality', 'A charming face, a borrowed show, a fake necklace.'],
    ['Discontent', 'Matilda measures her life against an imagined one.'],
    ['Honesty and its cost', 'They repay in full but hide the loss.'],
    ['Irony of fate', 'Ten years of labour for a necklace worth little.'],
    ['Dignity of labour', 'Hardship reveals Matilda\'s strength.'],
  ],
  'Table of six themes with where each appears: vanity and pride, appearance and reality, discontent, honesty and its cost, irony of fate, and dignity of labour.',
);
const vContrast = table(
  ['', 'Matilda', 'Loisel'],
  [
    ['Attitude to life', 'discontented; longs for luxury', 'content with simple pleasures'],
    ['The invitation', 'weeps: nothing to wear', 'proud; wants to please her'],
    ['Money', 'spends his savings on a dress', 'gives up his gun money'],
    ['After the loss', 'heavy housework for ten years', 'inheritance, loans, extra work'],
    ['What we learn', 'vain at first, later brave', 'selfless and steady throughout'],
  ],
  'Table contrasting Matilda and Loisel: she is discontented and he is content; she weeps over the invitation while he wants to please her; she spends his savings and he gives them up; after the loss she does heavy housework and he uses his inheritance, loans and extra work; she is vain at first and later brave, while he is selfless throughout.',
);
const vOthers = table(
  ['Character', 'What we learn (SOYL summary)'],
  [
    ['Madame Forestier', 'Wealthy school friend; lends freely; cold about the delay; honest at the end'],
    ['The minister and guests', 'The glittering world Matilda longs to join'],
    ['The jeweller', 'Sells a matching diamond necklace at a huge price'],
  ],
  'Table of other characters: Madame Forestier, the wealthy friend who lends freely, is cold about the delay and honest at the end; the minister and guests, the world Matilda longs for; and the jeweller who sells the replacement.',
);
const vWords = table(
  ['Word', 'Meaning'],
  [
    ['vanity', 'too much pride in one\'s looks or status'],
    ['discontented', 'not satisfied'],
    ['imitation', 'a copy made to look real'],
    ['franc', 'the French unit of money of that time'],
    ['attic', 'a small room under the roof'],
    ['irony', 'an outcome opposite to what was expected'],
    ['twist', 'an unexpected turn in a plot'],
  ],
  'Table of word meanings: vanity, discontented, imitation, franc, attic, irony and twist.',
  'Key words for discussing this chapter.',
);
const vLongPlan = flow('LR', ['Take a clear stand', 'Point + evidence (own words)', 'Two or three such points', 'Link to a theme or value', 'One-line conclusion'], 'Flow for planning a six-mark long answer: take a stand, give points with evidence in your own words, link to a theme or value, and conclude.');

// ---------------------------------------------------------------- deck
const D = deck({
  title: 'The Necklace',
  goals: [
    'Retell the story of the borrowed necklace and its consequences, in your own words',
    'Explain how vanity and pride lead to Matilda\'s years of hardship and the twist ending',
    'Contrast Matilda and Loisel with evidence',
    'Discuss the values the story raises: contentment, honesty and courage',
    'Answer 3-mark short and 6-mark long questions within the word limits',
  ],
  slides: [
    sl('title', 'The Necklace — Guy de Maupassant', {
      b: `*Footprints without Feet*, supplementary reader · short story · Class 10 CBSE English.\n\n${READ}`,
      v: vBoard,
      n: 'Welcome. Today we study The Necklace by the French writer Guy de Maupassant, a story famous for its twist ending. Please read the chapter in your supplementary reader first; this lesson does not repeat it. The board tests this book through three mark short answers and a six mark long answer on character, theme and values, so we will practise those most.',
    }),
    sl('concept', 'How to use this lesson', {
      bl: [
        'Read the chapter once in *Footprints without Feet*, straight through.',
        'Use these slides for the order of events, the themes and the contrast between Matilda and Loisel.',
        'Explain events **in your own words**; do not memorise lines.',
        'Practise the 3-mark and 6-mark questions most: that is how the board tests this book.',
      ],
      n: 'Here is how to use this lesson. Read the story first. Then use these slides for the order of events, the themes, and the contrast between Matilda and her husband. Explain events in your own words in every answer. And spend most of your practice on short and long answers, because the board does not set extracts from this book.',
    }),
    sl('concept', 'The author and the text', {
      v: vAuthor,
      n: 'Guy de Maupassant was a French writer who lived from eighteen fifty to eighteen ninety-three, and he is one of the great masters of the short story. The Necklace first appeared in French in eighteen eighty-four; your reader has an English version. It is set in Paris, and its three main characters are Matilda Loisel, her husband, and her wealthy friend, Madame Forestier.',
    }),
    sl('diagram', 'The story in six stages', {
      b: 'One evening of glory, ten years of debt, one sentence of truth. (A SOYL summary, not the text.)',
      v: vStages,
      n: 'The story moves through six stages. We meet a discontented wife. An invitation arrives, and she needs a dress. She borrows a necklace. The party is a triumph, but the necklace is lost. Ten years of debt follow. And at the end, one conversation reveals the truth. Keep this map in mind, because the ending only works if you remember every stage.',
    }),
    sl('concept', 'Summary 1: a discontented wife', {
      b: 'Matilda is pretty and charming, but she comes from a modest family and is married to a minor government clerk. She is ashamed of her plain flat and simple life, and spends her days dreaming of luxury, fine dinners and admiring company. The dreams only make her more unhappy.',
      n: 'Matilda Loisel is pretty and charming, but her family was modest, and she has married a minor clerk in a government office. She feels she was meant for luxury. Her plain little flat and simple life seem like an insult, and she spends her days dreaming of wealth and admiration. Those dreams only make her real life harder to bear.',
    }),
    sl('concept', 'Summary 2: the invitation, the dress and the necklace', {
      b: 'Loisel proudly brings home an invitation to a party given by a government minister. Matilda weeps: she has nothing to wear. He gives her the 400 francs he had saved for a gun, and she buys a dress. Then she grieves for jewels; refusing his idea of fresh flowers, she takes his other suggestion and borrows a diamond necklace from her wealthy friend, Madame Forestier.',
      n: 'One evening Loisel proudly brings home an invitation to a minister\'s party. Instead of being pleased, Matilda cries, because she has nothing to wear. Loisel gives her the four hundred francs he had saved for a gun. Then she is upset about jewels. She refuses fresh flowers, so Loisel suggests borrowing from her wealthy friend, Madame Forestier. She chooses a diamond necklace.',
    }),
    sl('check', 'Check: the order of events', {
      chk: 'ord_events',
      n: 'Your turn. Six events from the story are shuffled. Put them in order, from the invitation to the final revelation.',
    }),
    sl('concept', 'Summary 3: triumph and loss', {
      b: 'At the party Matilda is the most admired woman present and is happier than ever before. Leaving in the early hours, she is ashamed of her plain shawl and hurries away. At home she finds the necklace gone. Loisel searches their route, advertises a reward and makes every enquiry, while Matilda, on his advice, writes that the clasp is being mended to gain time.',
      n: 'At the party Matilda is a great success, the most admired woman in the room. But as they leave, she is ashamed of her plain shawl and rushes away. At home, the necklace is gone. Loisel searches their route, advertises a reward and makes every enquiry he can. Meanwhile Matilda writes to her friend that the clasp is being mended, to buy time.',
    }),
    sl('concept', 'Summary 4: ten years of debt and the truth', {
      b: 'They buy a matching diamond necklace for 36,000 francs, using Loisel\'s inheritance and heavy loans, and return it; Madame Forestier does not open the case. For ten years they live in an attic, Matilda doing heavy housework and Loisel extra work. When the debt is paid, Matilda meets Madame Forestier, tells her everything, and learns that the original necklace was an imitation worth only about 500 francs.',
      n: 'With no necklace found, they buy a matching one for thirty-six thousand francs, using Loisel\'s inheritance and heavy loans. For ten years they live in an attic, working without rest, and Matilda grows old. When the debt is finally paid, she meets Madame Forestier and tells her everything. Her friend reveals the truth: the necklace was an imitation, worth only about five hundred francs.',
    }),
    sl('two-column', 'Theme 1: vanity, pride and their price', {
      b: 'Every turn of the plot grows from one flaw.',
      cols: [
        '**What vanity and pride lead Matilda to do**\n\n- weep over a dress and refuse flowers\n- borrow diamonds to be admired\n- rush away, ashamed of a plain shawl\n- hide the loss instead of confessing',
        '**What it costs**\n\n- Loisel\'s savings and inheritance\n- ten years of debt and labour\n- Matilda\'s youth and beauty\n- all for a necklace worth little',
      ],
      n: 'The central theme is vanity and pride, and their price. Pride makes Matilda weep over a dress, borrow diamonds, rush away in shame, and hide the loss. The cost is enormous: Loisel\'s savings and inheritance, ten years of labour, and Matilda\'s youth, all for a necklace that was nearly worthless. In answers, link each stage of the plot to this flaw.',
    }),
    sl('concept', 'A web of themes', {
      v: vThemes,
      n: 'Around vanity sit other themes. Appearance and reality, since much that glitters here is false. Discontent, as Matilda compares her life with an imagined one. Honesty and its cost, because the Loisels repay in full but hide the loss. The irony of fate, in the twist. And the dignity of labour, because hardship reveals a strength in Matilda we never expected.',
    }),
    sl('check', 'Check: Matilda\'s mistake today', {
      chk: 'mc_apply',
      n: 'Check yourself. A student borrows a friend\'s expensive phone and breaks it. Which choice would avoid the mistake Matilda made?',
    }),
    sl('concept', 'Matilda and Loisel: a contrast', {
      b: 'The syllabus asks you to contrast them: use evidence for both.',
      v: vContrast,
      n: 'The syllabus asks you to contrast Matilda and Loisel. She is discontented; he is content with simple things. She weeps over the invitation; he only wants to please her. She spends his savings; he gives them up gladly. After the loss, both work for ten years. She is vain at first but becomes brave, while he is selfless and steady from start to finish.',
    }),
    sl('concept', 'The other characters', {
      v: vOthers,
      n: 'Madame Forestier is Matilda\'s wealthy school friend. She lends her jewels freely, is cold about the delay when the necklace comes back, and is honest at the end. The minister and his guests stand for the glittering world Matilda longs to join. And the jeweller supplies the expensive replacement that ruins the Loisels for ten years.',
    }),
    sl('two-column', 'Fate or choice?', {
      cols: [
        '**Bad luck**\n\n- a necklace can slip off unnoticed\n- the search turns up nothing\n- no one tells them it was fake',
        '**Matilda\'s own choices**\n\n- borrowing diamonds to impress\n- rushing away in shame\n- hiding the loss instead of confessing',
      ],
      n: 'A common long question asks whether Matilda is a victim of fate or of her own choices. Chance plays a part: the necklace slips away, and the search fails. But her choices matter more. She borrows diamonds to impress, rushes away in shame and hides the loss. Take a clear stand, and show you have considered both sides.',
    }),
    sl('check', 'Check: Matilda\'s tears', {
      chk: 'ar_tears',
      n: 'Try this assertion and reason item. Decide whether each statement is true, and then whether the reason really explains the assertion.',
    }),
    sl('concept', 'Style and narrative technique', {
      bl: [
        '**Third-person narrator** who lets us into Matilda\'s feelings.',
        '**Tight plot:** every event follows from the one before.',
        '**Twist ending:** the key fact is held back until the last moment.',
        '**Situational irony:** sacrifice made for something nearly worthless.',
        '**Symbol:** the necklace stands for false appearances.',
      ],
      n: 'How does Maupassant tell the story? A third-person narrator lets us into Matilda\'s feelings. The plot is tight, with each event following from the one before. The key fact is held back until the very end, creating a twist. The irony is situational, since a huge sacrifice is made for something almost worthless. And the necklace itself is a symbol of false appearances.',
    }),
    sl('example', 'Irony and twists: SOYL\'s own examples', {
      b: 'Practise spotting irony and twist endings. These sentences are SOYL\'s own, not from the chapter:',
      bl: [
        '*He saved for a year to buy the latest phone, and the next week it was given away free with every newspaper.* — situational irony',
        '*She hid her report card for a month, only to learn the school had already posted it home.* — a twist that makes the hiding pointless',
        '*The cake he guarded all evening turned out to be made of cardboard for the shop window.* — appearance and reality',
      ],
      n: 'Here are three examples of our own. A boy saves for a year for a phone, and next week it is given away free: situational irony. A girl hides her report card, but the school has already posted it home: a twist that makes the hiding pointless. A cake turns out to be cardboard: appearance and reality. Now find the same pattern in Maupassant\'s ending.',
    }),
    sl('concept', 'Word meanings', {
      v: vWords,
      n: 'These words will help you write about the story. Vanity is too much pride in looks or status. Discontented means not satisfied. An imitation is a copy made to look real. The franc was the French unit of money. An attic is a room under the roof. Irony is an outcome opposite to what was expected, and a twist is an unexpected turn in a plot.',
    }),
    sl('example', 'Worked example: planning a 6-mark answer', {
      b: '*Question:* *Matilda deserved her ten years of hardship.* Do you agree?',
      v: vLongPlan,
      bl: [
        '**Stand:** partly disagree: she was responsible, but the punishment was out of proportion.',
        '**Her faults:** vanity over the dress and jewels; hiding the loss.',
        '**Against:** an accident, honest repayment, Loisel\'s suffering, a fake necklace.',
        '**Link + conclusion:** pride has a price, but fate made it a cruel one.',
      ],
      n: 'Here is how to plan a six mark answer. Take a stand: partly disagree. Admit her faults: vanity over the dress and jewels, and hiding the loss. Then argue against: the loss was an accident, they repaid honestly, Loisel suffered too, and the necklace was fake. Conclude that pride has a price, but fate made this one cruel.',
    }),
    sl('summary', 'Summary', {
      bl: [
        'Matilda, married to a minor clerk, longs for luxury and despises her simple life.',
        'For a minister\'s party, Loisel gives up his gun money for her dress; she borrows a diamond necklace.',
        'She triumphs at the party, rushes away ashamed of her shawl, and loses the necklace.',
        'They replace it for 36,000 francs and spend ten years repaying; the original was an imitation.',
        'Read the chapter in *Footprints without Feet*; write about it in your own words.',
      ],
      v: vStages,
      n: 'Let us sum up. Matilda longs for luxury. For one party, Loisel gives up his savings and she borrows a diamond necklace. She triumphs, rushes away and loses it. They replace it and spend ten years repaying the debt, only to learn that the original was an imitation. Read the chapter in your reader, and write in your own words.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'The board sets no extracts from this book: practise 3-mark answers (40–50 words) and the 6-mark long answer (100–120 words).',
        '3-mark answers: point + evidence + explanation.',
        '6-mark answers: stand → 3 points with evidence → link to a theme or value → conclusion.',
        'Facts often confused: Loisel, not Matilda, suggested borrowing; the replacement cost 36,000 francs; the original was worth about 500.',
        'For value questions, link the story to contentment, honesty and pride today.',
      ],
      n: 'Exam tips. This book is tested through short and long answers, not extracts. In three mark answers, give a point, evidence and an explanation. In six mark answers, take a stand and support it with three points. Get the facts right, especially who suggested borrowing and the money involved. And for value questions, link the story to contentment and honesty today.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'The Necklace — study notes',
  sections: [
    {
      h: '1. About the text and the author',
      t: 1,
      b: `${READ}\n\n**Guy de Maupassant** (1850–1893) was a French writer and a master of the short story. *The Necklace* first appeared in French in 1884; the reader has an English version. Set in Paris, it is famous for its twist ending.`,
      v: vAuthor,
      terms: [['Twist ending', 'A surprising final turn that changes how the reader sees the whole story.']],
    },
    {
      h: '2. Summary (in SOYL\'s words)',
      t: 1,
      b: '**Discontent.** Matilda, pretty but from a modest family and married to a minor clerk, despises her plain life and dreams of luxury.\n\n**The invitation.** Loisel brings home an invitation to a minister\'s party. She weeps for want of a dress; he gives her the 400 francs saved for a gun.\n\n**The necklace.** Wanting jewels and refusing fresh flowers, she borrows a diamond necklace from Madame Forestier on Loisel\'s suggestion.\n\n**Triumph and loss.** She is the most admired woman at the party. Ashamed of her plain shawl, she rushes away, and at home finds the necklace gone. Loisel searches and advertises; she writes that the clasp is being repaired.\n\n**The debt.** They buy a matching necklace for 36,000 francs with his inheritance and heavy loans. For ten years they live in an attic and work without rest; Matilda ages.\n\n**The truth.** Meeting Madame Forestier after the debt is paid, Matilda tells all, and learns that the original was an imitation worth about 500 francs.',
      v: vStages,
    },
    {
      h: '3. Themes and message',
      t: 2,
      b: '- **Vanity and pride:** the root of every disaster.\n- **Appearance and reality:** borrowed show; a fake necklace.\n- **Discontent:** an imagined life spoils a real one.\n- **Honesty and its cost:** full repayment, but a hidden loss.\n- **Irony of fate:** ten years of labour for a near-worthless necklace.\n- **Dignity of labour:** hardship reveals strength.\n\n**Message:** vanity and the fear of admitting a mistake can cost far more than they seem to; contentment and honesty are worth more than show.',
      v: vThemes,
      terms: [['Situational irony', 'When what happens is the opposite of what was expected or intended.']],
    },
    {
      h: '4. Matilda and Loisel contrasted',
      t: 3,
      b: '**Matilda:** charming, discontented, vain and proud at first; later courageous and hard-working through ten years of labour.\n\n**Loisel:** content, loving, generous and self-sacrificing; he gives up his savings, uses his inheritance, borrows and works extra hours, and never blames her.\n\nIn answers, pair each trait with a specific episode, and show how Matilda changes while Loisel stays steady.',
      v: vContrast,
    },
    {
      h: '5. The other characters',
      t: 3,
      b: '**Madame Forestier** is Matilda\'s wealthy school friend. She lends freely, is cold about the delay when the replacement is returned (without opening the case), and is moved and honest at the end. **The minister and guests** represent the world Matilda longs for. **The jeweller** sells the costly replacement.',
      v: vOthers,
    },
    {
      h: '6. Style and narrative technique',
      t: 2,
      b: '- **Third-person narrator** with access to Matilda\'s feelings.\n- **Tight plot:** cause leads to effect.\n- **Twist ending:** the key fact comes last.\n- **Situational irony.**\n- **Symbol:** the necklace as false appearance.\n\nSOYL practice sentence (not from the chapter): *He saved for a year to buy the latest phone, and the next week it was given away free with every newspaper* (situational irony).',
      terms: [['Symbol', 'An object that stands for an idea larger than itself.']],
    },
    {
      h: '7. Word meanings',
      t: 1,
      b: 'Key words for discussing the chapter: vanity, discontented, imitation, franc, attic, irony, twist. Use them in your own sentences, for example: *Matilda\'s vanity turned one evening of glory into ten years of debt.*',
      v: vWords,
    },
    {
      h: '8. Answering exam questions',
      t: 4,
      b: '**How this book is examined:** the board sets 3-mark short answers (40–50 words; two of three) and a 6-mark long answer (100–120 words) from *Footprints without Feet*, on character, theme and values. It does not set extracts from this book. SOYL chapter tests add commentary passages only as extra practice.\n\n**Short answers (3 marks):** point + evidence + explanation.\n\n**Long answers (6 marks):** a clear stand; three points with evidence in your own words; a link to a theme or value; a one-line conclusion. Extrapolation tasks (Matilda\'s diary, Loisel\'s letter, an alternative ending) must stay consistent with the story.',
      v: vLongPlan,
    },
  ],
  tips: '**Board weight:** *Footprints without Feet* is tested through 3-mark short answers (40–50 words) and a 6-mark long answer (100–120 words) on character, theme and values (CBSE 2026-27, Section C). No extracts are set from this book.\n\n**How marks are awarded:** content (relevant events, accurately used), interpretation (a clear, supported view on character, theme or value), and expression within the word limit.\n\n**Common mistakes**\n1. Saying Matilda thought of borrowing the jewels: Loisel suggested it.\n2. Saying Madame Forestier knew of the loss before the end: they replaced the necklace secretly.\n3. Mixing up the sums: 400 francs for the dress, 36,000 for the replacement, about 500 for the original.\n4. Calling Loisel weak: he is selfless and responsible.\n5. Quoting lines from memory instead of explaining in your own words.\n\n**Remember:** read the chapter in your supplementary reader, *Footprints without Feet*.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Who wrote *The Necklace*?', 'Guy de Maupassant (1850–1893), French.', 'fact', 1],
  ['Genre of the story', 'A short story with a twist ending.', 'concept', 2],
  ['Setting', 'Paris, late nineteenth century.', 'fact', 1],
  ['Whom did Matilda marry?', 'Loisel, a minor government clerk.', 'fact', 1],
  ['Why was Matilda unhappy?', 'She longed for luxury and despised her simple life.', 'concept', 3],
  ['What did Loisel bring home?', 'An invitation to a minister\'s party.', 'fact', 1],
  ['Why did Matilda cry over the invitation?', 'She had no suitable dress.', 'fact', 1],
  ['What did Loisel give up for the dress?', 'The 400 francs he had saved for a gun.', 'fact', 1],
  ['What did Matilda refuse to wear instead of jewels?', 'Fresh flowers.', 'fact', 1],
  ['Who suggested borrowing jewels?', 'Loisel.', 'fact', 1],
  ['What did Matilda borrow, and from whom?', 'A diamond necklace from Madame Forestier.', 'fact', 1],
  ['How was Matilda received at the party?', 'She was the most admired woman there.', 'fact', 1],
  ['Why did she hurry away?', 'She was ashamed of her plain shawl.', 'fact', 3],
  ['What excuse did Matilda write to her friend?', 'That the clasp was being repaired.', 'fact', 1],
  ['Price of the replacement', '36,000 francs.', 'fact', 1],
  ['How was the replacement paid for?', 'Loisel\'s inheritance and heavy loans.', 'fact', 1],
  ['How long did repayment take?', 'Ten years.', 'fact', 1],
  ['How did their life change?', 'Servant dismissed, attic home, heavy housework, extra work for Loisel.', 'fact', 1],
  ['What was the truth about the original necklace?', 'It was an imitation worth about 500 francs.', 'fact', 1],
  ['Central theme', 'Vanity and pride, and their heavy price.', 'concept', 2],
  ['Matilda\'s traits', 'Discontented and vain at first; later brave and hard-working.', 'concept', 3],
  ['Loisel\'s traits', 'Content, loving, generous, self-sacrificing.', 'concept', 3],
  ['Madame Forestier at the end', 'Moved by Matilda\'s story; honestly reveals the necklace was fake.', 'concept', 3],
  ['Main irony', 'Ten years of labour to replace a near-worthless necklace.', 'concept', 2],
  ['What does the necklace symbolise?', 'False appearances: it looks precious but is fake.', 'concept', 2],
  ['*vanity*', 'too much pride in one\'s looks or status', 'definition', 1],
  ['*imitation*', 'a copy made to look real', 'definition', 1],
  ['Plan for a 6-mark answer', 'Stand → three points with evidence → link to a theme or value → conclusion (100–120 words).', 'exam-tip', 4],
  ['How the board tests this book', '3-mark short answers and a 6-mark long answer; no extracts.', 'exam-tip', 4],
  ['Most common factual slip', 'Saying Matilda thought of borrowing, or that the friend knew of the loss.', 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests
// Supplementary-reader blueprints (catalog chapter override, 2026-10-27): no extract section; the board sets
// Footprints without Feet only as 3-mark short answers (two of three) and a 6-mark long answer.
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-short-supplementary',
  title: 'Chapter test (short) — The Necklace',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Short answers (3 marks each)', instr: 'Two sets of three questions; in each set answer any two in 40–50 words.', items: [{ attempt: 2, keys: ['sa_unhappy', 'sa_loisel', 'sa_invitation_reaction'] }, { attempt: 2, keys: ['sa_irony', 'sa_honesty', 'sa_forestier'] }] },
    { id: 'B', title: 'Section B — Long answer (6 marks)', instr: 'Answer any one of two questions in 100–120 words.', items: [{ attempt: 1, keys: ['la_matilda_sketch', 'la_vanity_theme'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-long-supplementary',
  title: 'Chapter test (long) — The Necklace',
  duration: 80,
  sections: [
    { id: 'A', title: 'Section A — Short answers (2 marks each)', instr: 'Answer any three of four in 30–40 words.', items: [{ attempt: 3, keys: ['sb_flowers', 'sb_letter', 'sb_return', 'sb_aged'] }] },
    { id: 'B', title: 'Section B — Short answers (3 marks each)', instr: 'Two sets of three questions; in each set answer any two in 40–50 words.', items: [{ attempt: 2, keys: ['sa_lost', 'sa_hardship', 'sa_replace'] }, { attempt: 2, keys: ['sa_contrast', 'sa_vanity', 'sa_fate'] }] },
    { id: 'C', title: 'Section C — Long answers (6 marks each)', instr: 'Answer one question from each of the three pairs in 100–120 words.', items: [{ attempt: 1, keys: ['la_loisel_sketch', 'la_honesty_debate'] }, { attempt: 1, keys: ['la_diary_matilda', 'la_loisel_letter'] }, { attempt: 1, keys: ['la_appearance_reality', 'la_ending_alt'] }] },
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
    board_pattern: 'supplementary reader: board sets 3-mark short answers and a 6-mark long answer (no extracts); bank weighted to 14 three-mark and 9 long items; 5 commentary passages fill the generic chapter-test blueprint Section A slots',
    literature_rule: 'written in SOYL words at the level of events and ideas; no sentence, phrase or dialogue of the NCERT version; speech reported; commentary passages (passage_origin soyl-commentary); single words only for word meanings; textbook pointer on the title slide, notes and every passage stem; guard list of short distinctive phrases (ch27 src/guard.mjs)',
    originality: 'questions written for SOYL; NCERT exercise questions not reused (stems reframed where a classic question exists)',
    re_solve: 'author verifier pass: every item re-answered from its stem and checked against the chapter',
    gate: 'npm test -w @soyl/content-templates and content lint (lintExemplar) run clean on this chapter',
  },
});
checkForbidden(DIR, GUARD);
