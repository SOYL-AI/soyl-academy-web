// Build CBSE 10 English Language and Literature ch02 Grammar. Run from platform/:
//   npx tsx content/authored/english-language/cbse-10-english-language-and-literature-ch02/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from './lib.mjs';

setUnit('cbse-10-english-language-and-literature-ch02', 'english-language');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- visuals
const vTasks = table(
  ['Task type', 'What you do', 'Grammar it tests'],
  [
    ['Gap filling', 'Write or choose the missing word', 'determiners, tenses, modals, concord'],
    ['Editing / omission', 'Find the wrong or missing word and correct it', 'concord, tense, articles, prepositions'],
    ['Transformation', 'Rewrite a sentence in another form', 'reported speech'],
  ],
  'Table of the three kinds of board grammar tasks: gap filling tests determiners, tenses, modals and concord; editing and omission test concord, tense, articles and prepositions; transformation tests reported speech.',
  'Board pattern: 12 one-mark tasks, attempt any 10 (CBSE 2026-27, Section B).',
);
const vRoutine = flow('LR', ['Read the whole sentence', 'Find the clue: subject, time word, meaning, next noun', 'Choose and write the answer', 'Re-read the sentence in your head'], 'Flow of four steps: read the whole sentence, find the clue, choose and write the answer, then re-read the sentence.', 'Use this routine on every item.');
const vDet = table(
  ['Kind', 'Examples', 'In a sentence'],
  [
    ['Articles', 'a, an, the', '*The* bus to Andheri is late again.'],
    ['Demonstratives', 'this, that, these, those', '*These* mangoes are from Ratnagiri.'],
    ['Possessives', 'my, your, his, her, its, our, their', '*Our* section won the quiz.'],
    ['Quantifiers', 'some, any, much, many, few, little, each, every, enough', '*Every* seat in the hall was taken.'],
    ['Numbers', 'one, two, first, second', 'She came *first* in the relay.'],
  ],
  'Table of five kinds of determiners with examples: articles, demonstratives, possessives, quantifiers and numbers, each used in an example sentence.',
);
const vQuant = table(
  ['Countable nouns (books, friends)', 'Uncountable nouns (water, time, advice)', 'Both'],
  [
    ['many', 'much', 'some, any'],
    ['a few (some) / few (hardly any)', 'a little (some) / little (hardly any)', 'enough, a lot of'],
    ['a number of', 'an amount of', 'no, most'],
    ['each, every + singular noun', '—', '—'],
  ],
  'Table of quantifiers: many, a few, few, a number of, each and every go with countable nouns; much, a little, little and an amount of go with uncountable nouns; some, any, enough, a lot of, no and most go with both.',
  'A few / a little = positive; few / little = negative.',
);
const vTenseGrid = table(
  ['Time', 'Simple', 'Continuous', 'Perfect', 'Perfect continuous'],
  [
    ['Present', 'she plays', 'she is playing', 'she has played', 'she has been playing'],
    ['Past', 'she played', 'she was playing', 'she had played', 'she had been playing'],
    ['Future', 'she will play', 'she will be playing', 'she will have played', 'she will have been playing'],
  ],
  'Grid of the twelve tense forms of the verb play: present, past and future across simple, continuous, perfect and perfect continuous.',
  'Every tense = a time + an aspect.',
);
const vClues = table(
  ['Clue in the sentence', 'Usual tense', 'Example'],
  [
    ['every day, usually, always', 'simple present', 'He *takes* the 8:10 local every day.'],
    ['now, at the moment, Look!', 'present continuous', 'Look! The peacock *is dancing*.'],
    ['already, just, yet, ever; since / for up to now', 'present perfect (continuous)', 'I *have just finished* my homework.'],
    ['yesterday, last week, ago, in 2019', 'simple past', 'We *moved* to Pune two years ago.'],
    ['by the time / before + another past action', 'past perfect', 'The show *had started* by the time we arrived.'],
    ['tomorrow, next week', 'will / be going to / simple present for timetables', 'The exam *begins* on Monday.'],
  ],
  'Table linking time clues to tenses: habits take the simple present, now takes the present continuous, already and since take the present perfect, yesterday and ago take the simple past, by the time takes the past perfect, and tomorrow takes future forms.',
);
const vModals = table(
  ['Meaning', 'Modal', 'Example'],
  [
    ['Ability', 'can, could (past), be able to', 'Meera *can* speak three languages.'],
    ['Permission', 'may, can, could', '*May* I leave early today?'],
    ['Obligation', 'must, have to', 'You *must* carry your admit card.'],
    ['No obligation', 'need not, don\'t have to', 'You *need not* print the form.'],
    ['Prohibition', 'must not, cannot', 'You *must not* use a calculator.'],
    ['Advice', 'should, ought to', 'You *should* revise a little daily.'],
    ['Possibility', 'may, might, could', 'It *might* rain during the match.'],
  ],
  'Table of modal meanings: ability, permission, obligation, no obligation, prohibition, advice and possibility, with the modals and an example for each.',
);
const vSummary1 = table(
  ['If you notice…', 'Choose…'],
  [
    ['a vowel sound next (hour, MLA)', 'an'],
    ['an uncountable noun (milk, advice)', 'much / a little / some'],
    ['since or for, continuing till now', 'has / have (been) + verb'],
    ['the earlier of two past actions', 'had + past participle'],
    ['a rule or law', 'must'],
    ['something unnecessary', 'need not'],
  ],
  'Summary table: a vowel sound leads to an; an uncountable noun to much or a little; since or for to the present perfect; the earlier of two past actions to the past perfect; a rule to must; something unnecessary to need not.',
);
const vConcord = table(
  ['Subject', 'Verb', 'Example'],
  [
    ['A and B', 'plural', 'Rina and her brother *are* in Class X.'],
    ['two nouns naming one thing', 'singular', 'Bread and butter *is* enough for me.'],
    ['each, every, either, neither, everyone', 'singular', 'Everyone *has* a locker.'],
    ['A as well as / along with / with B', 'agrees with A', 'The captain, with his players, *is* here.'],
    ['either A or B; neither A nor B', 'agrees with B (nearer)', 'Neither Ravi nor his friends *were* invited.'],
    ['collective noun as one unit', 'singular', 'The jury *has* given its verdict.'],
    ['a number of / the number of', 'plural / singular', 'A number of buses *are* late; the number of buses *is* small.'],
    ['a sum of money, time or distance', 'singular', 'Ten kilometres *is* a long walk.'],
    ['-s nouns with a singular meaning', 'singular', 'Physics *is* tough; the news *is* good.'],
  ],
  'Table of nine concord rules with examples, covering and, each and every, as well as, either or, collective nouns, a number of, amounts, and nouns like physics and news.',
);
const vBackshift = table(
  ['Direct speech', 'Reported speech (after said / told)'],
  [
    ['am / is / are', 'was / were'],
    ['do / does (simple present)', 'did (simple past)'],
    ['is doing', 'was doing'],
    ['did / has done', 'had done'],
    ['will / can / may', 'would / could / might'],
    ['must', 'must / had to'],
  ],
  'Table of tense backshift in reported speech: am, is, are become was or were; do becomes did; is doing becomes was doing; did and has done become had done; will, can, may become would, could, might; must stays or becomes had to.',
  'No backshift if the reporting verb is present (says) or the statement is a universal truth.',
);
const vTimeWords = table(
  ['Direct', 'Reported'],
  [
    ['now', 'then'],
    ['today / tonight', 'that day / that night'],
    ['yesterday', 'the previous day / the day before'],
    ['tomorrow', 'the next day / the following day'],
    ['ago', 'before'],
    ['last week', 'the previous week'],
    ['this / these', 'that / those'],
    ['here', 'there'],
  ],
  'Table of time and place word changes: now to then, today to that day, yesterday to the previous day, tomorrow to the next day, ago to before, last week to the previous week, this to that, here to there.',
);
const vTypes = table(
  ['Sentence type', 'Reporting verb', 'Link', 'Example'],
  [
    ['Statement', 'said / told + person', 'that', 'She said that she was ready.'],
    ['Yes/no question', 'asked / enquired', 'if / whether', 'He asked if I was ready.'],
    ['Wh-question', 'asked / enquired', 'the wh-word', 'He asked where I lived.'],
    ['Command / request', 'told, ordered, advised / requested', 'to + verb (not to + verb)', 'She requested me to wait.'],
  ],
  'Table of four sentence types in reported speech: statements use said or told with that; yes or no questions use asked with if or whether; wh-questions use asked with the wh-word; commands and requests use told or requested with a to-infinitive.',
);
const vEditFamilies = table(
  ['Error family', 'Wrong', 'Right'],
  [
    ['Tense', 'He has came late.', 'has come'],
    ['Concord', 'The news are shocking.', 'is'],
    ['Article', 'She is a honest girl.', 'an'],
    ['Preposition', 'We reached to the venue.', 'reached the venue'],
    ['Pronoun / possessive', 'The dog wagged it\'s tail.', 'its'],
    ['Word form / spelling', 'He spoke confident. I will recieve it.', 'confidently; receive'],
  ],
  'Table of six error families in editing tasks with a wrong and a corrected example: tense, concord, article, preposition, pronoun, and word form or spelling.',
);
const vOmitFlow = flow('LR', ['Read the line in pairs of words', 'Find where it jolts', 'Ask: article? preposition? helper verb? pronoun?', 'Write word before + missing word + word after'], 'Flow of four steps for omission: read in pairs of words, find where it jolts, ask which kind of word is missing, write the words before and after with the missing word.');
const vWE7 = table(
  ['Line', 'Error', 'Correction', 'Why'],
  [
    ['1', 'have', 'has', 'singular subject *my grandmother*'],
    ['2', 'grow', 'grows', 'habit, third person singular'],
    ['3', 'mornings', 'morning', '*every* + singular noun'],
    ['4', 'give', 'gave', '*last week* = finished past'],
  ],
  'Table of answers to the editing example: have to has, grow to grows, mornings to morning, give to gave, with the reason for each.',
);
const vWE8 = table(
  ['Line', 'Before', 'Missing', 'After'],
  [
    ['1', 'is', 'a', 'festival'],
    ['2', 'house', 'a', 'week'],
    ['3', 'rangoli', 'at', 'the'],
  ],
  'Table of answers to the omission example: is a festival, house a week, rangoli at the entrance.',
);
const vSummary2 = flow('TB', ['Find the real subject → make the verb agree', 'Identify the sentence type → pick verb and link', 'Change pronouns, tenses, time words', 'Edit: test the six error families line by line'], 'Flow summarising Part 2: find the real subject for concord, identify the sentence type in reported speech, change pronouns, tenses and time words, and test six error families when editing.');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Grammar for the Board — Part 1: Determiners, Tenses and Modals',
  goals: [
    'Choose articles, demonstratives and quantifiers correctly in context',
    'Use time clues to select the right tense in gap-filling and editing tasks',
    'Pick the modal that matches the meaning: ability, permission, obligation, advice or possibility',
    'Apply a four-step routine to any one-mark grammar item',
  ],
  slides: [
    sl('title', 'Grammar for the Board — Part 1: Determiners, Tenses and Modals', {
      b: 'CBSE Class 10 English, **Section B**. In the board paper the grammar question has **12 short tasks; you answer any 10** (1 mark each). This part covers determiners, tenses and modals. Part 2 covers concord, reported speech, editing and omission.',
      v: vTasks,
      n: 'Welcome! Grammar is the most dependable ten marks in your English paper. In the board exam, one question gives you twelve short tasks and you choose any ten, one mark each. The tasks are gap filling, editing and transformation. In this first part we master three tools: determiners, tenses and modals. Each one is about reading clues in the sentence, not memorising rules in isolation.',
    }),
    sl('concept', 'A four-move routine for every grammar item', {
      b: 'Most mistakes come from looking only at the blank. The answer is hidden in the words **around** it.',
      v: vRoutine,
      n: 'Here is a routine you can use for every item. First, read the whole sentence, not just the blank. Second, hunt for the clue: who is the subject, what is the time word, what does the speaker mean, and which noun comes next. Third, choose and write your answer neatly. Fourth, read the sentence again in your head. If it sounds odd, go back to the clue.',
    }),
    sl('concept', 'Determiners: small words that point to a noun', {
      b: 'A determiner comes **before** a noun (and before any adjective) and tells us *which one*, *whose*, or *how much / how many*: *these ripe mangoes*, never *ripe these mangoes*.',
      v: vDet,
      n: 'A determiner is a small word that stands before a noun and tells us which one, whose, or how much. Articles, demonstratives like this and those, possessives like my and their, quantifiers like some and every, and numbers are all determiners. Notice that the determiner also comes before any adjective. We say these ripe mangoes, never ripe these mangoes.',
    }),
    sl('two-column', 'A, an or the?', {
      cols: [
        '**a / an — any one, or first mention.** Choose by the first **sound**, not the letter:\n\n- *an* hour, *an* honest man, *an* MLA\n- *a* uniform, *a* one-rupee coin, *a* European city',
        '**the — a particular one the listener knows:**\n\n- already mentioned: *I bought a pen. The pen leaks.*\n- only one exists: *the* Sun, *the* Internet\n- superlatives: *the* tallest girl in class\n- rivers, seas, mountain ranges: *the* Ganga, *the* Himalayas',
      ],
      n: 'Use a or an when you mean any one thing, or mention it for the first time. The choice depends on the sound, not the spelling. An hour, because the h is silent. A uniform, because it starts with a you sound. Use the when the listener knows exactly which one: something already mentioned, something unique like the Sun, a superlative like the tallest, or the names of rivers and mountain ranges.',
    }),
    sl('concept', 'Quantifiers: can you count the noun?', {
      b: '*A few / a little* = some (positive). *Few / little* = hardly any (negative). Uncountable nouns never take *a / an*: say *some advice*, not *an advice*.',
      v: vQuant,
      n: 'Before choosing a quantifier, ask one question: can I count this noun? Friends and books can be counted, so we say many and a few. Water, time and advice cannot, so we say much and a little. Some, any and enough work with both. And remember how one tiny article changes the meaning: a few friends is good news, but few friends is sad news.',
    }),
    sl('example', 'Worked example 1: determiners in a notice', {
      b: 'Fill the blanks: *(1) ___ students of Class X must bring (2) ___ umbrella to the excursion. There is (3) ___ shade at the dam site, so (4) ___ water bottle is also required.*',
      bl: [
        '(1) **All** — the notice addresses every student and *students* is plural (*each* would need a singular noun).',
        '(2) **an** — *umbrella* begins with a vowel sound.',
        '(3) **little** — the meaning is *hardly any*, and *shade* is uncountable.',
        '(4) **a** — one bottle; *water* here describes the bottle, which begins with a consonant sound.',
      ],
      n: 'Let us solve a notice together. Blank one comes before students, a plural noun, and the notice speaks to everyone, so all fits, while each would need a singular noun. Blank two comes before umbrella, which starts with a vowel sound, so an. Blank three: the meaning is that there is hardly any shade, and shade cannot be counted, so little without a. Blank four: one bottle, so a.',
    }),
    sl('check', 'Check: choose the quantifier', {
      chk: 'det_alittle',
      n: 'Your turn. Look at the noun after the blank. Can it be counted? Then read the end of the sentence. Does it suggest a small but sufficient amount, or almost nothing? Pick your answer, then read the explanation.',
    }),
    sl('concept', 'Tenses are a grid: time plus aspect', {
      b: 'Every tense = a **time** (present, past, future) + an **aspect** (simple, continuous, perfect, perfect continuous). Learn one row and the others follow.',
      v: vTenseGrid,
      n: 'English tenses look like twelve separate rules, but they are really a grid. Across the top is the aspect: simple, continuous, perfect and perfect continuous. Down the side is the time: present, past and future. Once you know the pattern for one row, the others follow. For example, has played, had played and will have played are all perfect forms, only at different times.',
    }),
    sl('concept', 'Time clues tell you the tense', {
      b: 'The board almost always plants a clue word. Underline it before you choose.',
      v: vClues,
      n: 'Look for the clue word. Every day signals a habit, so the simple present. Now, or look, signals the present continuous. Already, just, yet, since and for signal the present perfect. Yesterday, ago and last week signal the simple past, and they never go with has or have. By the time, together with another past action, signals the past perfect.',
    }),
    sl('two-column', 'Two tense pairs that cost marks', {
      cols: [
        '**Present perfect vs simple past**\n\n- *I have lost my ID card.* (still lost now)\n- *I lost my ID card yesterday.* (finished time named)\n- Wrong: *I have lost it yesterday.*',
        '**Past perfect vs simple past**\n\n- *When we reached the stadium, the match had begun.* (it began first)\n- *When we reached the stadium, the match began.* (it began as we arrived)',
      ],
      n: 'Two pairs confuse students most. First, present perfect versus simple past. Use has or have when the result matters now and no finished time is given. The moment you name a finished time, like yesterday, switch to the simple past. Second, past perfect versus simple past. If one past action happened before another, the earlier one takes had. Changing the tense actually changes the story.',
    }),
    sl('example', 'Worked example 2: tenses in a diary entry', {
      b: 'Fill the blanks: *I (1) ___ (wait) at the bus stop for forty minutes when it finally came. By then it (2) ___ (start) to drizzle. Since that evening I (3) ___ (carry) an umbrella every day.*',
      bl: [
        '(1) **had been waiting** — an action lasting up to a past moment (*when it finally came*)',
        '(2) **had started** — finished before the bus came (*By then*)',
        '(3) **have been carrying** (also *have carried*) — *since* + continuing till today',
      ],
      n: 'Here the clues do all the work. For forty minutes, up to a moment in the past when the bus came, gives had been waiting. By then tells us the drizzle began before that moment, so had started. Since that evening, continuing until today, gives have been carrying, or have carried. Each answer comes straight from a clue word, not from guesswork.',
    }),
    sl('check', 'Check: which action came first?', {
      chk: 'ten_hadmoved',
      n: 'Try this one. There are two past actions in the sentence. Ask yourself which happened first, and which tense marks the earlier of two past actions.',
    }),
    sl('concept', 'Modals: the meaning decides', {
      b: 'A modal is followed by the **base verb** with no *to*: *must go*, not *must to go*. (Only *ought to* and *have to* take *to*.)',
      v: vModals,
      n: 'Modals are helping verbs that add a meaning: ability, permission, obligation, advice or possibility. In gap filling, the meaning of the whole sentence tells you which modal fits. A law or rule means must. A suggestion means should. Something unnecessary means need not, and something forbidden means must not. And never put to after a modal. We say must go, not must to go.',
    }),
    sl('example', 'Worked example 3: choose the modal by meaning', {
      b: 'Ask: *rule, advice, permission, ability, guess or request?* Then pick the modal.',
      bl: [
        '*You ___ wear goggles in the chemistry lab; it is a safety rule.* → **must** (rule)',
        '*You ___ bring chart paper; the school will provide it.* → **need not** (unnecessary)',
        '*Ravi ___ be in the canteen; his bag is still here.* → **might / may / could** (a guess)',
        '*___ you help me carry these registers, please?* → **Could / Can / Would** (polite request)',
      ],
      n: 'Watch how one question settles each blank: what is the speaker doing? In the first sentence a safety rule is stated, so must. In the second the school will provide the paper, so bringing it is not necessary: need not. In the third we are only guessing, so might, may or could. In the last, someone politely asks for help, so could you, or would you.',
    }),
    sl('check', 'Check: not necessary or not allowed?', {
      chk: 'mod_neednot',
      n: 'Check yourself. A holiday means you do not have to come. Is that a prohibition, or simply no need? Choose carefully, because the two options look alike.',
    }),
    sl('check', 'Check: spot the polite request', {
      chk: 'mod_polite',
      n: 'One more. Four sentences use four different modals. Only one of them is a polite request. Which one would you say to a neighbour whose music is too loud?',
    }),
    sl('summary', 'Summary: Part 1', {
      bl: [
        'Read the whole sentence; the clue is **around** the blank.',
        'Determiners: *a / an* by sound; *the* for a particular one; countable or uncountable decides the quantifier.',
        'Tenses = time + aspect; *yesterday, ago, last week* never go with *has / have*.',
        'Past perfect marks the **earlier** of two past actions.',
        'Modals follow meaning; base verb after a modal; *need not* is not *must not*.',
      ],
      v: vSummary1,
      n: 'Let us sum up Part One. Always read the whole sentence. For determiners, listen to the first sound and ask whether the noun can be counted. For tenses, find the time clue, and remember that finished times never take has or have. For modals, decide what the speaker is doing, and keep the verb after the modal in its base form.',
    }),
    sl('exam-tips', 'Exam tips: how grammar marks are won and lost', {
      bl: [
        'Write the **item number and only the answer**, clearly: *(iv) had moved*. Do not copy the whole passage.',
        'In editing, show the **incorrect word and its correction** side by side, exactly as the question asks.',
        'Spelling counts: *received, necessary, occurred*. A misspelt answer can lose the mark.',
        'Do the ten items you are surest of first, and follow the instruction on how many to attempt.',
        'Classic traps: *has gone … yesterday*, *did not went*, *must to go*, *an university*, *few* for *a few*.',
      ],
      n: 'Exam tips. Write the item number and only the answer, clearly. In editing, show both the wrong word and its correction. Spell carefully, because a misspelt answer can lose the mark. Do the ten items you are surest of first, and follow the instruction on how many to attempt. Watch for five classic traps: has with yesterday, did with went, must with to, an before university, and few in place of a few.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Grammar for the Board — Part 2: Concord, Reported Speech, Editing and Omission',
  goals: [
    'Make verbs agree with singular, plural, collective and compound subjects',
    'Convert statements, questions, commands and requests into reported speech',
    'Change pronouns, tenses and time words correctly when reporting',
    'Detect and correct errors and omissions in a short passage',
  ],
  slides: [
    sl('title', 'Grammar for the Board — Part 2: Concord, Reported Speech, Editing and Omission', {
      b: 'Part 2 of the Class 10 grammar lesson. **Editing** tasks test concord and tense in disguise, and **transformation** tasks are usually reported speech. Master these three skills and most of Section B grammar is covered.',
      v: vTasks,
      n: 'Welcome to Part Two. Here we cover three skills that the board loves to test. Subject verb concord, which hides inside most editing errors. Reported speech, which is the usual transformation task. And editing and omission, where you hunt for one wrong or missing word in each line. By the end you will have a method for each.',
    }),
    sl('concept', 'Concord: find the real subject first', {
      b: 'The verb agrees with its **subject**, not with the noun nearest to it. Cover up the *of*-phrase and see what is left.',
      bl: [
        '*The box of sweets **is** on the table.* (subject: box)',
        '*One of my cousins **lives** in Dubai.* (subject: one)',
        '*The quality of the roads **has** improved.* (subject: quality)',
      ],
      n: 'Concord means the verb agrees with its subject. The trap is that the noun nearest to the verb is often not the subject. In the box of sweets is on the table, the subject is box, not sweets. A quick trick: cover the phrase beginning with of, and see what is left. One of my cousins lives in Dubai. Cover of my cousins, and you get one lives.',
    }),
    sl('concept', 'Nine concord rules in one table', {
      b: 'Most editing errors in board papers come from these rules.',
      v: vConcord,
      n: 'Here are the rules that cover almost every exam sentence. Two subjects joined by and are plural, unless they name one thing, like bread and butter. Each, every, either and neither are singular. With as well as or along with, look only at the first subject. With either or and neither nor, the nearer subject wins. Amounts, and nouns like physics and news, are singular.',
    }),
    sl('example', 'Worked example 4: correcting concord errors', {
      b: 'Each sentence has one concord error. Find the subject, then fix the verb.',
      bl: [
        '*The quality of the mangoes are excellent.* → subject *quality* → **is**',
        '*Neither the principal nor the teachers was informed.* → nearer subject *teachers* → **were**',
        '*Every boy and girl were given a sapling.* → *every* makes it singular → **was**',
        '*The committee have announced its decision.* → one unit (*its*) → **has**',
      ],
      n: 'Let us correct four sentences. In the first, cover of the mangoes, and the subject is quality, so is. In the second, neither nor, so the nearer subject, teachers, decides: were. In the third, every in front of boy and girl makes the whole subject singular: was. In the fourth, the word its shows the committee acting as one unit, so has.',
    }),
    sl('check', 'Check: neither … nor', {
      chk: 'con_neithernor',
      n: 'Your turn. With neither and nor, which subject does the verb agree with? Find it, decide if it is singular or plural, and check the time of the sentence.',
    }),
    sl('concept', 'Reported speech: the tense steps back', {
      b: 'After a **past** reporting verb (*said, told, asked*), each tense moves one step into the past. Pronouns change to fit who is speaking to whom.',
      v: vBackshift,
      n: 'When we report what someone said, using a past reporting verb like said or asked, the tense usually steps one place back into the past. Is becomes was, do becomes did, has done becomes had done, and will becomes would. There are two exceptions. If the reporting verb is in the present, like says, nothing changes. And universal truths stay in the present.',
    }),
    sl('concept', 'Time and place words shift too', {
      b: 'The report is made at another time and place, so *here* and *now* move with it.',
      v: vTimeWords,
      n: 'Time and place words also shift, because the report is made later and somewhere else. Now becomes then. Today becomes that day. Yesterday becomes the previous day, and tomorrow becomes the next day or the following day. This becomes that, and here becomes there. Learn this table as pairs, and practise saying them aloud.',
    }),
    sl('concept', 'Four sentence types, four patterns', {
      b: 'Decide the **type** first; the type gives you the reporting verb and the linking word.',
      v: vTypes,
      n: 'Every line of a dialogue is one of four types. A statement is reported with said or told, and that. A yes or no question uses asked, and if or whether. A wh question keeps its wh word, like where or why. A command or request uses told, ordered or requested, followed by to and the verb, or not to for a negative.',
    }),
    sl('example', 'Worked example 5: reporting a dialogue, step by step', {
      b: 'Doctor: *"Have you been sleeping well?"* Rhea: *"No, I wake up at night because of my cough."*',
      bl: [
        'Step 1, type: line 1 is a yes/no question; line 2 is a statement.',
        'Step 2, verb and link: *asked … if*; *replied that*.',
        'Step 3, pronouns: *you → she*; *I → she*, *my → her*.',
        'Step 4, tenses: *have been sleeping → had been sleeping*; *wake → woke*.',
        'Result: *The doctor asked Rhea if she had been sleeping well. Rhea replied that she had not, as she woke up at night because of her cough.*',
      ],
      n: 'Follow four steps. First, the type: the doctor asks a yes or no question, and Rhea makes a statement. Second, the reporting verb and link: asked if, and replied that. Third, the pronouns: you becomes she, and I and my become she and her. Fourth, the tenses step back: have been sleeping becomes had been sleeping, and wake becomes woke. Her no becomes she had not.',
    }),
    sl('example', 'Worked example 6: the question-order trap', {
      b: 'The guard said to me, *"Where are you going with this parcel?"*',
      bl: [
        'Wrong: *The guard asked me where was I going with that parcel.*',
        'Right: *The guard asked me where **I was going** with that parcel.*',
        'After the wh-word use **statement order** (subject + verb), drop the question mark, and change *this → that*.',
      ],
      n: 'This is the most common error in reported questions. In a direct question the verb comes before the subject: where are you going. In reported speech, the question has become part of a statement, so the order returns to normal: where I was going. Drop the question mark too, and remember that this parcel becomes that parcel.',
    }),
    sl('check', 'Check: report the wh-question', {
      chk: 'rep_where',
      n: 'Check yourself. Which option keeps the wh word, uses statement order, and steps the tense back? Watch out for options that still sound like questions.',
    }),
    sl('concept', 'Editing: the six usual suspects', {
      b: 'Editing errors are planted in a few families. Test each line against them in this order.',
      v: vEditFamilies,
      n: 'Editing errors are not random. Examiners plant them in six families: tense, concord, articles, prepositions, pronouns, and word forms or spellings. Read each line and test it against these families one by one. Is the tense right for the time clue? Does the verb agree with the subject? Is an article missing or wrong? Is there an extra preposition, as in reached to?',
    }),
    sl('concept', 'Omission: hearing the missing word', {
      b: 'The missing word is usually small: an **article**, a **preposition**, a **helping verb**, a **pronoun** or a **conjunction**. Write the word before, the missing word, and the word after.',
      v: vOmitFlow,
      n: 'In an omission task, one small word has been removed from a line. It is usually an article, a preposition, a helping verb, a pronoun or a conjunction. Read the line slowly in pairs of words and notice where it jolts. Then write three words: the word before the gap, the missing word, and the word after. That shows the examiner exactly where it goes.',
    }),
    sl('example', 'Worked example 7: an editing passage', {
      b: '*Each line has one error.* (1) My grandmother have a small kitchen garden. (2) She grow tomatoes, chillies and curry leaves. (3) Every mornings she waters the plants. (4) Last week she give a basket of tomatoes to our neighbours.',
      v: vWE7,
      n: 'Let us edit line by line. Line one: the subject is my grandmother, singular, so have becomes has. Line two: a habit, with she, so grow becomes grows. Line three: every needs a singular noun, so mornings becomes morning. Line four: last week is a finished time, so give becomes gave. Notice that three of the four errors are concord or tense.',
    }),
    sl('example', 'Worked example 8: an omission passage', {
      b: '*One word is missing in each line.* (1) Diwali is festival of lights. (2) We clean our house week before. (3) My mother draws rangoli the entrance.',
      v: vWE8,
      n: 'Now omissions. In line one, festival is a singular countable noun with no determiner, so is a festival. In line two, a week before, again an article. In line three, rangoli the entrance jolts, because a preposition of place is missing: rangoli at the entrance. Write each answer as before word, missing word, after word.',
    }),
    sl('check', 'Check: correct the sentence', {
      chk: 'edi_neitherof',
      n: 'Try this editing item. The subject begins with neither of. Is neither singular or plural? Then choose the option that fixes only what is wrong.',
    }),
    sl('check', 'Check: complete the reported statement', {
      chk: 'rep_kurta',
      n: 'Last check. Two changes are needed in the reported statement: the tense of the verb, and the time word. Fill both blanks, then compare with the answer.',
    }),
    sl('summary', 'Summary: Part 2', {
      bl: [
        'Concord: cover the *of*-phrase to find the real subject; *each / every / neither* are singular; with *either … or*, the nearer subject wins.',
        'Reported speech: type → reporting verb and link → pronouns → tense backshift → time and place words.',
        'Questions become statements: *asked where I was going*, never *where was I going*.',
        'Editing: test tense, concord, article, preposition, pronoun, word form.',
        'Omission: write the word before + missing word + word after.',
      ],
      v: vSummary2,
      n: 'To sum up Part Two. For concord, find the real subject before you touch the verb. For reported speech, work in order: type, reporting verb and link, pronouns, tense, and time words, and turn questions into statements. For editing, test each line against the six error families. For omissions, write the word before, the missing word, and the word after.',
    }),
    sl('exam-tips', 'Exam tips: editing and transformation', {
      bl: [
        'Use the format asked: *incorrect word → correction*, or *word before + missing word + word after*.',
        'One error per line: do not "correct" a line that is already right in other places.',
        'In reported speech, the tense, pronoun **and** time word must all be right for the mark.',
        'Never put a question mark or *that* before a wh-word in a reported question.',
        'Keep the meaning: *must not* is not *need not*; *requested* for *please*, *ordered* for commands.',
      ],
      n: 'Exam tips. Use exactly the format the question asks for. There is only one error in each line, so do not rewrite parts that are already correct. In reported speech, the mark usually needs the tense, the pronoun and the time word all to be right. Never add a question mark, or the word that, before a wh word. And keep the meaning: requested for please, and ordered for a command.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Grammar — Class 10 board notes',
  sections: [
    {
      h: '1. How the grammar question works',
      t: [1, 2, 3, 4, 5, 6],
      b: 'Section B of the CBSE Class 10 English paper has a grammar question of **12 one-mark tasks, of which you attempt any 10**. The tasks are **gap filling** (determiners, tenses, modals, concord), **editing** (spot the error, write the correction) and **transformation** (usually reported speech). Some items give options, others ask you to write the word.\n\n**Routine for every item:** read the whole sentence → find the clue (subject, time word, meaning, the noun after the blank) → write the answer → re-read the sentence.',
      v: vTasks,
      terms: [['Clue word', 'A word near the blank that decides the answer: a time expression (*since, yesterday*), the subject (*each of*), or the noun that follows (*advice, students*).']],
    },
    {
      h: '2. Determiners',
      t: 1,
      b: 'A determiner comes before a noun and any adjective, and fixes *which one* or *how much / how many*.\n\n- **a / an** by the first **sound**: *an hour, an MLA, a uniform, a one-way street*.\n- **the** for a particular or unique thing, superlatives, rivers, seas and mountain ranges: *the Sun, the best answer, the Narmada*.\n- No article before most proper names of people and cities, or before uncountable nouns used in general: *Advice is free.*\n- **Countable vs uncountable:** *many / a few / few* + countable plural; *much / a little / little* + uncountable; *some / any / enough* + both.\n- **Positive vs negative:** *a few, a little* = some; *few, little* = hardly any.\n- **each / every / either / neither** + singular noun; **each of / neither of** + *the* + plural noun.',
      v: vQuant,
      terms: [
        ['Uncountable noun', 'A noun with no plural, used with *much / a little*: advice, information, luggage, furniture, milk, homework.'],
        ['Quantifier', 'A determiner of amount or number: some, any, many, much, few, little, each, every, enough.'],
      ],
    },
    {
      h: '3. Tenses',
      t: 2,
      b: 'Every tense = **time** (present, past, future) + **aspect** (simple, continuous, perfect, perfect continuous). Choose by the clue word.\n\n- **Simple present:** habits, facts, timetables — *The canteen opens at 8.*\n- **Present continuous:** now, temporary — *She is staying with her aunt this month.*\n- **Present perfect:** past action, present result, no finished time — *I have misplaced my calculator.*\n- **Present perfect continuous:** *since / for* up to now — *We have been waiting since noon.*\n- **Simple past:** finished time — *He topped the test last week.*\n- **Past continuous:** in progress at a past moment — *I was revising when the lights went out.*\n- **Past perfect:** the earlier of two past actions — *The bell had rung before I reached.*\n- **Future:** *will* (decision, prediction), *be going to* (plan, evidence), simple present (timetable), and simple present after *if / when* — *If it rains, we will stay in.*\n\n**State verbs** (know, like, own, believe, understand) are not normally used in continuous forms: *I know*, not *I am knowing*.',
      v: vClues,
      terms: [
        ['Backshift', 'Moving a tense one step into the past, as in reported speech: is → was, has done → had done.'],
        ['State verb', 'A verb describing a state, not an action (know, belong, prefer); rarely used in the -ing form.'],
      ],
    },
    {
      h: '4. Modals',
      t: 3,
      b: 'Modals add meaning to a main verb and are followed by the **base form without *to***: *can swim, must leave, should rest* (exceptions: *ought to, have to*).\n\n- **can / could:** ability (*could* = past ability), informal permission, polite requests (*Could you…?*).\n- **may / might:** formal permission (*May I…?*), possibility (*might* = less sure).\n- **must / have to:** obligation; **must not:** prohibition.\n- **need not / don\'t have to:** no obligation.\n- **should / ought to:** advice, duty.\n- **would:** polite requests (*Would you…?*), and the past of *will* in reported speech.',
      v: vModals,
      terms: [['Must not vs need not', '*Must not* = it is forbidden. *Need not* = it is not necessary (but allowed).']],
    },
    {
      h: '5. Subject–verb concord',
      t: 4,
      b: 'The verb agrees with the **real subject**. Cover the *of*-phrase or the *along with*-phrase and look at what is left.\n\nKey rules: *A and B* → plural (unless one idea: *rice and dal is*); *each, every, either, neither, everyone, nobody* → singular; *as well as / along with / with* → agree with the first subject; *either … or / neither … nor* → agree with the nearer subject; collective nouns acting as one unit → singular (*the team has*); *a number of* → plural, *the number of* → singular; amounts → singular (*Fifty rupees is enough*); *news, mathematics, physics* → singular.',
      v: vConcord,
      terms: [['Collective noun', 'A noun for a group treated as one unit: team, jury, committee, family, class. Usually singular in Indian and British exam English when the group acts together.']],
    },
    {
      h: '6. Reported speech',
      t: 5,
      b: '**Order of work:** sentence type → reporting verb and link → pronouns → tense backshift → time and place words → punctuation.\n\n- **Statement:** *said / told + person + that* — *She said, "I am ready." → She said that she was ready.*\n- **Yes/no question:** *asked + if / whether*, statement order — *"Is the shop open?" → He asked if the shop was open.*\n- **Wh-question:** *asked + wh-word*, statement order — *"Why are you late?" → She asked why I was late.*\n- **Command / request:** *told / ordered / advised / requested + person + (not) to + verb* — *"Please wait." → She requested me to wait.*\n\n**No backshift** when the reporting verb is present (*says*) or for universal truths (*The teacher said that light travels faster than sound*).',
      vs: [vBackshift, vTimeWords, vTypes],
      terms: [['Reporting verb', 'The verb that introduces the report: said, told, asked, replied, requested, ordered, advised, enquired.']],
    },
    {
      h: '7. Editing and omission',
      t: 6,
      b: '**Editing:** each line or sentence has one error. Test it against the six families — tense, concord, article, preposition, pronoun, word form / spelling — and write the incorrect word with its correction.\n\n**Omission:** one word is missing. It is usually an article, preposition, helping verb, pronoun or conjunction. Read in pairs of words, find the jolt, and write *word before + missing word + word after*.\n\n**Frequent errors:** *discuss about, reached to, return back* (extra preposition); *a advice, an university* (articles); *did not went, has came* (verb forms); *principle / principal, their / there, its / it\'s* (look-alike words).',
      vs: [vEditFamilies, vOmitFlow],
      terms: [['Omission', 'A word left out of a sentence; the task is to find where and supply it.']],
    },
  ],
  tips: '**Marks:** 10 marks — 12 one-mark tasks, attempt any 10 (Section B, CBSE 2026-27). Some items have options; others ask you to write the word or sentence.\n\n**How marks are awarded:** one mark for a fully correct answer. In editing, the incorrect word and the correction must both be right; in reported speech, the reporting verb, pronoun, tense and time-word changes must all be right. A misspelt answer can lose the mark.\n\n**Common mistakes**\n1. *has / have* with *yesterday, ago, last week*.\n2. *did not went* — after *did*, use the base verb.\n3. *must to go* — no *to* after a modal.\n4. *an university, a hour* — choose by sound.\n5. Concord with the nearest noun instead of the real subject (*The list of names are…*).\n6. Question order in reported questions (*asked where was I going*).\n7. Forgetting time words: *tomorrow → the next day*.\n\n**Presentation:** write the item number and the answer only; in editing and omission, use the exact format the question gives.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['When do we use *an*?', 'Before a word that begins with a **vowel sound**: *an hour, an MLA, an honest reply* — but *a uniform, a one-day trip*.', 'concept', 1],
  ['*A few* vs *few*', '*A few* = some (positive): *I have a few friends here.* *Few* = hardly any (negative): *Few people came.* Both go with countable nouns.', 'concept', 1],
  ['*A little* vs *little*', '*A little* = some (positive); *little* = hardly any (negative). Both go with uncountable nouns: *a little time, little hope*.', 'concept', 1],
  ['Name five uncountable nouns that never take *a / an*.', 'advice, information, luggage, furniture, homework (also milk, news, equipment).', 'fact', 1],
  ['*Each / every* take…', 'a **singular** noun and a singular verb: *Every student has a locker.* *Each of* + *the* + plural noun: *each of the students*.', 'concept', 1],
  ['When is *the* used with a superlative?', 'Always: *the best answer, the tallest tower, the most useful app*.', 'fact', 1],
  ['Tense formula', 'Tense = **time** (present / past / future) + **aspect** (simple / continuous / perfect / perfect continuous).', 'concept', 2],
  ['Which tense goes with *since* / *for* up to now?', 'Present perfect (continuous): *She has been practising since 6 a.m.*', 'concept', 2],
  ['Can *yesterday* go with *has / have*?', 'No. A finished time takes the **simple past**: *I lost it yesterday*, not *I have lost it yesterday*.', 'exam-tip', 2],
  ['When do we use the past perfect?', 'For the **earlier** of two past actions: *The film had started when we arrived.*', 'concept', 2],
  ['Tense in an *if*-clause about the future', 'Simple present: *If it rains tomorrow, the match will be postponed.*', 'concept', 2],
  ['After *did / did not*, the verb is…', 'the base form: *did not go*, never *did not went*.', 'exam-tip', 2],
  ['What follows a modal?', 'The base verb **without *to***: *must go, can swim*. Exceptions: *ought to, have to*.', 'concept', 3],
  ['*Must not* vs *need not*', '*Must not* = forbidden. *Need not* = not necessary.', 'concept', 3],
  ['Modal for past ability', '*Could*: *At five, she could read Hindi and English.*', 'fact', 3],
  ['Modals for a polite request', '*Could you…? Would you…? May I…?* (+ *please*)', 'example', 3],
  ['Concord: how to find the real subject', 'Cover the *of*-phrase (or *along with*-phrase): *The box (of sweets) is…*', 'exam-tip', 4],
  ['*Either … or / neither … nor*: which subject decides the verb?', 'The **nearer** subject: *Neither Ravi nor his friends were invited.*', 'concept', 4],
  ['*A number of* vs *the number of*', '*A number of* students **are**… (plural). *The number of* students **is**… (singular).', 'concept', 4],
  ['Is *news* singular or plural?', 'Singular: *The news is good.* Also *mathematics, physics, economics*.', 'fact', 4],
  ['*The principal, along with the teachers, ___ attending.*', '**is** — *along with* does not add to the subject.', 'example', 4],
  ['Reported speech: order of work', 'Type → reporting verb + link → pronouns → tense backshift → time/place words → punctuation.', 'concept', 5],
  ['Backshift of *will, can, may*', '*would, could, might*.', 'fact', 5],
  ['*Tomorrow* in reported speech becomes…', '*the next day* / *the following day*.', 'fact', 5],
  ['Linking word for a yes/no question', '*if* or *whether*: *He asked if I was ready.*', 'concept', 5],
  ['How is a command reported?', '*told / ordered / advised* + person + *(not) to* + verb: *She told us not to run.*', 'concept', 5],
  ['When does the tense NOT change in reported speech?', 'When the reporting verb is present (*says*), or for a universal truth.', 'exam-tip', 5],
  ['Word order in a reported wh-question', 'Statement order: *She asked where I lived* (not *where did I live*).', 'exam-tip', 5],
  ['Six families of editing errors', 'Tense, concord, article, preposition, pronoun, word form / spelling.', 'concept', 6],
  ['How to write an omission answer', 'Word before + **missing word** + word after: *fond **of** playing*.', 'exam-tip', 6],
  ['Extra-preposition errors to watch', '*discuss about, reached to, return back, enter into the room* (→ *discuss, reached, return, enter*).', 'example', 6],
  ['*Principal* or *principle*?', '*Principal* = head of a school (or main); *principle* = a rule or belief.', 'fact', 6],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  title: 'Chapter test (short) — Grammar',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Grammar tasks (1 mark each)', instr: 'Attempt any 10 of the 12 tasks.', items: [{ attempt: 10, keys: ['det_much', 'det_neither', 'ten_notyet', 'ten_ifrains', 'mod_could', 'con_eachof', 'det_advice', 'ten_lastsunday', 'mod_mustto', 'con_alongwith', 'rep_fed', 'edi_fondof'] }] },
    { id: 'B', title: 'Section B — Editing passage (5 marks)', instr: 'Each numbered line has one error. Write the incorrect word and the correction.', items: ['case_edit'] },
    { id: 'C', title: 'Section C — Objective questions (1 mark each)', instr: 'Answer all questions.', items: ['det_an', 'ten_goingto', 'mod_must', 'con_list', 'rep_notrun'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  title: 'Chapter test (long) — Grammar',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Grammar tasks (1 mark each)', instr: 'Attempt any 10 of the 12 tasks.', items: [{ attempt: 10, keys: ['det_afew', 'ten_since', 'ten_hadeaten', 'mod_may', 'con_team', 'rep_tired', 'ten_leaves', 'con_maths', 'edi_since', 'mod_should', 'ten_didwent', 'edi_thebest'] }] },
    { id: 'B', title: 'Section B — Passages (5 marks each)', instr: 'Answer both passages.', items: ['case_gap', 'case_report'] },
    { id: 'C', title: 'Section C — Transformation and editing (2 marks each)', instr: 'Attempt any 5 of the 6 questions.', items: [{ attempt: 5, keys: ['det_short2', 'ten_short2', 'mod_short2', 'con_short2', 'rep_coach', 'edi_short2'] }] },
    { id: 'D', title: 'Section D — Long answer (5 marks)', instr: 'Attempt any one.', items: [{ attempt: 1, keys: ['rep_long', 'edi_long'] }] },
    { id: 'E', title: 'Section E — Assertion and reason (1 mark each)', instr: 'Answer all questions.', items: ['ten_ar', 'con_ar', 'rep_ar', 'edi_ar', 'mod_ar'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t06 only (determiners, tenses, modals, concord, reported speech, editing/omission); the chapter has no removed topics for 2026-27',
    originality: 'every example sentence, passage and item written for this chapter (Indian school and home contexts); no NCERT, Words and Expressions or board-paper item reused',
    re_solve: 'author verifier pass: every item re-answered from its stem; keys unambiguous; valid alternatives listed in fill-blank accepted answers and model answers',
    gate: 'npm test -w @soyl/content-templates and content lint (lintExemplar) run clean on this chapter',
  },
});
