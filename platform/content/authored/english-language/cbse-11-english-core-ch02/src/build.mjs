// Build CBSE 11 English Core ch02 Grammar. Run from platform/:
//   npx tsx content/authored/english-language/cbse-11-english-core-ch02/src/build.mjs
// Every sentence, passage and dialogue in this chapter is SOYL's own writing (passage_origin 'soyl-original').
// Not a literature chapter, so no guard call.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../cbse-11-english-core-ch01/src/lib.mjs';

setUnit('cbse-11-english-core-ch02', 'english-language');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- visuals
const vPattern = table(
  ['Part of the school paper', 'Task', 'Marks'],
  [
    ['Grammar', 'gap filling with tenses and clauses', 'part of 7'],
    ['Grammar', 're-ordering of jumbled words and transformation of sentences', 'part of 7'],
    ['Section B total', 'Grammar and Creative Writing', '23 (grammar 7, writing 16)'],
  ],
  'Table of the grammar part of the Class 11 school paper: gap filling with tenses and clauses, and re-ordering and transformation of sentences, together worth seven marks.',
  'Class 11 has no board exam: this is the school annual examination pattern.',
);
const vTenseGrid = table(
  ['', 'Simple', 'Continuous', 'Perfect', 'Perfect continuous'],
  [
    ['Present', 'she writes', 'she is writing', 'she has written', 'she has been writing'],
    ['Past', 'she wrote', 'she was writing', 'she had written', 'she had been writing'],
    ['Future', 'she will write', 'she will be writing', 'she will have written', 'she will have been writing'],
  ],
  'Table of twelve tense forms of the verb write: simple, continuous, perfect and perfect continuous in the present, past and future.',
);
const vClues = table(
  ['Clue in the sentence', 'Tense it points to'],
  [
    ['every day, usually, always', 'present simple'],
    ['now, at the moment', 'present continuous'],
    ['since, for (up to now), so far, yet', 'present perfect or present perfect continuous'],
    ['yesterday, last week, ago, in 2019', 'simple past'],
    ['by the time, before, after (an earlier past event)', 'past perfect'],
    ['by tomorrow, by next month, by the time (a future point)', 'future perfect'],
  ],
  'Table of time clues and the tense each points to: every day for present simple, now for present continuous, since and for for present perfect, yesterday for simple past, by the time for past perfect and by tomorrow for future perfect.',
);
const vRoutine = flow('LR', ['Read the whole sentence', 'Underline the clue words', 'Name the time and the order of events', 'Choose the form', 'Reread the paragraph'], 'Flow of the gap-filling routine: read the whole sentence, underline the clue words, name the time and the order of events, choose the form, then reread the paragraph.', 'SOYL five-move routine for a gap.');
const vPerfectVsPast = table(
  ['', 'Present perfect', 'Simple past'],
  [
    ['Link to now', 'result or experience still matters', 'finished event, no link stated'],
    ['Time word', 'since, for, so far, just, yet, ever', 'yesterday, last year, ago, in 2020'],
    ['Example', 'The bus has left (it is gone)', 'The bus left at six'],
  ],
  'Table comparing the present perfect and the simple past: the present perfect links to now and uses since, for, just and yet; the simple past is a finished event with words like yesterday and ago.',
);
const vSequence = table(
  ['Situation', 'Pattern', 'Example'],
  [
    ['two past events, one earlier', 'earlier = past perfect; later = simple past', 'The film had begun when we arrived'],
    ['a long action cut short', 'past continuous or past perfect continuous + simple past', 'We were waiting when the bell rang'],
    ['time clause about the future', 'present form in the clause, will in the main clause', 'I will call when I reach home'],
    ['reporting verb in the past', 'backshift the reported verb', 'She said that she was tired'],
  ],
  'Table of tense sequence patterns: two past events use the past perfect for the earlier one, a long action cut short uses the continuous, a future time clause uses a present form, and a past reporting verb backshifts.',
);
const vConditions = table(
  ['Kind of condition', 'If clause', 'Main clause', 'Example'],
  [
    ['likely, now or later', 'present simple', 'will + base verb', 'If it rains, we will stay in'],
    ['unlikely or imagined now', 'simple past', 'would + base verb', 'If I had a bike, I would ride to school'],
    ['impossible, in the past', 'past perfect', 'would have + past participle', 'If I had known, I would have called'],
  ],
  'Table of three kinds of condition: likely uses present simple and will, unlikely uses simple past and would, and impossible past uses past perfect and would have.',
);
const vClauseTypes = table(
  ['Clause', 'Does the work of', 'Usually begins with', 'Example (clause in italics)'],
  [
    ['Noun clause', 'a noun: subject or object', 'that, whether, if, what, why, how', 'We learnt *that the road was closed*'],
    ['Relative (adjective) clause', 'an adjective: describes a noun', 'who, whom, whose, which, that', 'The road *that leads to the dam* was closed'],
    ['Adverb clause', 'an adverb: time, reason, condition, contrast, purpose', 'when, because, if, although, so that', 'We turned back *because the road was closed*'],
  ],
  'Table of three kinds of subordinate clause: noun clause, relative clause and adverb clause, with the work each does, how each begins and an example.',
);
const vRelative = table(
  ['Word', 'Used for', 'Example'],
  [
    ['who', 'people, as subject', 'the nurse who helped us'],
    ['whom', 'people, as object', 'the nurse whom we thanked'],
    ['whose', 'possession, people or things', 'a lake whose water is clear'],
    ['which', 'things and animals', 'a bell which rings at noon'],
    ['that', 'people or things, defining clauses only', 'the book that she lent me'],
  ],
  'Table of relative pronouns: who for people as subject, whom for people as object, whose for possession, which for things and that for defining clauses only.',
);
const vDefining = table(
  ['', 'Defining clause', 'Non-defining clause'],
  [
    ['Job', 'picks out which one', 'adds extra detail about a noun already known'],
    ['Commas', 'none', 'one or two'],
    ['That allowed?', 'yes', 'no (use who or which)'],
    ['Remove it?', 'the meaning breaks', 'the sentence still makes sense'],
  ],
  'Table comparing defining and non-defining relative clauses by job, commas, use of that and effect of removing the clause.',
);
const vAdverb = table(
  ['Idea', 'Connectives', 'Example'],
  [
    ['time', 'when, after, before, as soon as, until', 'We left as soon as the bell rang'],
    ['reason', 'because, since, as', 'She stayed in because it was raining'],
    ['condition', 'if, unless, provided that', 'You will pass if you revise'],
    ['contrast', 'although, though, even though', 'Although it was late, we went on'],
    ['purpose', 'so that, in order that', 'He spoke slowly so that all could follow'],
    ['result', 'so ... that, such ... that', 'It was so cold that the pond froze'],
  ],
  'Table of adverb clauses by idea: time, reason, condition, contrast, purpose and result, with connectives and an example for each.',
);
const vNoun = table(
  ['Joined by', 'Used when', 'Example'],
  [
    ['that', 'the clause is a statement', 'I know that she is right'],
    ['whether / if', 'yes or no, or two choices', 'I wonder whether he has left'],
    ['what, why, how, where, when', 'the clause answers a wh-question', 'Tell me where she lives'],
  ],
  'Table of noun clauses: that for statements, whether or if for yes-no questions or choices, and wh-words when the clause answers a question.',
);
const vPassive = table(
  ['Tense or modal', 'Active', 'Passive'],
  [
    ['present simple', 'The cook makes tea', 'Tea is made by the cook'],
    ['present continuous', 'The cook is making tea', 'Tea is being made'],
    ['present perfect', 'The cook has made tea', 'Tea has been made'],
    ['simple past', 'The cook made tea', 'Tea was made'],
    ['future', 'The cook will make tea', 'Tea will be made'],
    ['modal', 'The cook can make tea', 'Tea can be made'],
    ['modal + perfect', 'The cook must have made tea', 'Tea must have been made'],
  ],
  'Table of active and passive forms across tenses and modals: the passive keeps the tense or modal of the active and adds be in the right form with the past participle.',
);
const vPassiveSteps = flow('LR', ['Find the object', 'Make it the subject', 'Keep the tense; add be + past participle', 'Add by + doer only if needed', 'Check the meaning'], 'Flow of the steps for changing active to passive: find the object, make it the subject, keep the tense and add be with the past participle, add by and the doer only if needed, then check the meaning.', 'Five steps to the passive.');
const vBackshift = table(
  ['Direct speech', 'Reported speech (past reporting verb)'],
  [
    ['present simple: I walk', 'simple past: he walked'],
    ['present continuous: I am walking', 'past continuous: he was walking'],
    ['present perfect: I have walked', 'past perfect: he had walked'],
    ['simple past: I walked', 'past perfect: he had walked'],
    ['will walk', 'would walk'],
    ['can walk', 'could walk'],
  ],
  'Table of tense changes from direct to reported speech after a past reporting verb: present simple to simple past, present continuous to past continuous, present perfect and simple past to past perfect, will to would and can to could.',
);
const vTimeWords = table(
  ['Direct', 'Reported (report made later)'],
  [
    ['now', 'then'],
    ['today', 'that day'],
    ['yesterday', 'the day before / the previous day'],
    ['tomorrow', 'the next day / the following day'],
    ['here, this', 'there, that'],
    ['ago', 'before'],
  ],
  'Table of word changes from direct to reported speech: now becomes then, today becomes that day, yesterday becomes the day before, tomorrow becomes the next day, here becomes there and ago becomes before.',
);
const vSentenceKinds = table(
  ['Direct sentence', 'Reporting pattern', 'Example'],
  [
    ['statement', 'said / told that', 'He said that he was late'],
    ['yes-no question', 'asked if / whether, statement order', 'She asked if I had come'],
    ['wh- question', 'asked + wh-word, statement order', 'She asked where I lived'],
    ['command or request', 'told / asked / ordered + object + (not) to', 'He asked us not to shout'],
  ],
  'Table of reporting patterns: statements use said or told that, yes-no questions use asked if or whether with statement order, wh-questions keep the wh-word with statement order, and commands use a verb plus object plus to.',
);
const vCombine = table(
  ['Two ideas', 'Join with', 'Result'],
  [
    ['extra fact about a noun', 'relative clause', 'The lane, which is narrow, leads to the fort'],
    ['a statement as object', 'noun clause with that', 'She said that the lane was narrow'],
    ['reason / time / contrast', 'adverb clause', 'Because the lane was narrow, we walked'],
  ],
  'Table of ways to combine sentences: a relative clause for an extra fact about a noun, a noun clause with that for a statement as object, and an adverb clause for reason, time or contrast.',
);
const vDegrees = table(
  ['Positive', 'Comparative', 'Superlative'],
  [
    ['No other hill is as high as this one', 'This hill is higher than any other hill', 'This is the highest hill'],
    ['Few poets are as famous as she', 'She is more famous than most poets', 'She is one of the most famous poets'],
  ],
  'Table of three ways to say the same thing in positive, comparative and superlative degrees, for example no other hill is as high as this one, this hill is higher than any other, and this is the highest hill.',
);
const vSentenceTypes = table(
  ['Type', 'Clauses', 'Example'],
  [
    ['Simple', 'one main clause', 'Despite the rain, the match continued'],
    ['Compound', 'two or more main clauses joined by and, but, so, or', 'It rained, but the match continued'],
    ['Complex', 'one main clause + one or more subordinate clauses', 'Although it rained, the match continued'],
  ],
  'Table of three sentence types: simple has one main clause, compound joins main clauses with and, but, so or or, and complex has a main clause with a subordinate clause.',
);
const vReorder = flow('LR', ['Find the main verb group', 'Find its subject', 'Attach clauses next to the noun they describe', 'Place linking words and time phrases', 'Read aloud and check'], 'Flow of re-ordering jumbled word groups: find the main verb group, find its subject, attach clauses next to the noun they describe, place linking words and time phrases, then read aloud and check.', 'SOYL five moves for a jumbled sentence.');
const vInversion = table(
  ['Opener', 'Word order that follows', 'Example'],
  [
    ['Not until ...', 'question order in the main clause', 'Not until dawn did the wind drop'],
    ['Never / Seldom', 'auxiliary before the subject', 'Never had she seen such a crowd'],
    ['Hardly ... when', 'had + subject + past participle', 'Hardly had we sat down when the bell rang'],
    ['Only after ...', 'question order in the main clause', 'Only after the repairs did the road reopen'],
  ],
  'Table of sentence openers that cause inversion: not until, never and seldom, hardly when, and only after, each followed by question order in the main clause.',
);
const vTransformSummary = table(
  ['Change', 'Check these together'],
  [
    ['active to passive', 'object to subject; be in the right tense; past participle; by-phrase only if useful'],
    ['direct to reported', 'tense, pronouns, time and place words, reporting verb, word order of questions'],
    ['combine with clauses', 'right connective or pronoun; commas for non-defining; tenses agree'],
    ['degrees and types', 'meaning unchanged; no other / as ... as; although, not although ... but'],
  ],
  'Table of checklists for each transformation: active to passive, direct to reported speech, combining with clauses, and degrees and sentence types.',
);
const vErrors = table(
  ['Common slip', 'Fix'],
  [
    ['Last Sunday we have gone', 'Last Sunday we went'],
    ['By the time we came, the film started', 'By the time we came, the film had started'],
    ['Although it was late but we left', 'Although it was late, we left'],
    ['He asked where was I going', 'He asked where I was going'],
    ['The students, that were absent, ...', 'The students, who were absent, ...'],
  ],
  'Table of five common grammar slips and their fixes: have gone with last Sunday, wrong sequence with by the time, although with but, question order in reported speech, and that in a non-defining clause.',
);

// ---------------------------------------------------------------- deck part 1
const part1 = deck({
  part: 1,
  title: 'Tenses and Clauses in Gap Filling — Part 1',
  goals: [
    'Read the clue words in a sentence and choose the right tense form',
    'Keep the tenses of a paragraph in step with one another',
    'Choose between the present perfect and the simple past on meaning',
    'Use relative, noun and adverb clauses correctly in gaps',
    'Fill gaps in a short paragraph with a five-move routine',
  ],
  slides: [
    sl('title', 'Tenses and Clauses in Gap Filling', {
      b: 'CBSE Class 11 English Core, **grammar (7 marks)**. Gap filling with tenses and clauses, and re-ordering and transformation. This part covers the gaps; Part 2 covers re-ordering and transformation.',
      v: vPattern,
      n: 'Welcome to grammar. In the school paper, grammar carries seven marks, split between gap filling with tenses and clauses, and re-ordering and transformation of sentences. This first part is about gap filling. The second part is about re-ordering and transformation. Both are skills you can practise until they become routine.',
    }),
    sl('concept', 'The twelve tense forms', {
      b: 'Every tense is a mix of **time** (present, past, future) and **form** (simple, continuous, perfect, perfect continuous).',
      v: vTenseGrid,
      n: 'English has twelve tense forms. Three times, present, past and future, combine with four forms: simple, continuous, perfect and perfect continuous. The simple form states a fact or a finished event. The continuous form shows an action in progress. The perfect form looks back from a point, and the perfect continuous adds how long.',
    }),
    sl('concept', 'Clue words choose the tense', {
      b: 'The right tense is almost always **signalled** by a word or a second verb in the sentence.',
      v: vClues,
      n: 'Clue words choose the tense. Every day points to the present simple, and now to the present continuous. Since, for and yet point to the present perfect. Yesterday and ago point to the simple past. By the time with an earlier past event points to the past perfect. Underline the clue before you choose.',
    }),
    sl('check', 'Check: the clue since', {
      chk: 'dk_perfect',
      v: vClues,
      n: 'Your turn. A boy has played for the college team since two thousand twenty three, and he still plays now. Which form fits the gap?',
    }),
    sl('example', 'Worked example 1: two events in the past', {
      b: '*By the time the ferry ______ (leave) the jetty, Asha ______ (wait) for forty minutes.*',
      bl: [
        '**Clue:** *by the time* with a past event: a past reference point.',
        '**Gap 1:** the ferry leaving is that point: **left**.',
        '**Gap 2:** the waiting ran up to that point, with a duration: **had been waiting**.',
        '**Check:** *had waited* is also accepted, but *had been waiting* stresses the length.',
      ],
      v: vRoutine,
      n: 'Look at this example. By the time the ferry left the jetty, Asha had been waiting for forty minutes. The words by the time give a past reference point, so the ferry left. The waiting ran up to that point and has a length of forty minutes, so we use the past perfect continuous: had been waiting. Always check the clue first.',
    }),
    sl('two-column', 'Present perfect or simple past?', {
      cols: [
        '**Present perfect**\n\n- the result or experience matters now\n- *since*, *for*, *so far*, *just*, *yet*\n- *The bus has left* (it is not here)',
        '**Simple past**\n\n- a finished event\n- *yesterday*, *ago*, *last year*, *in 2020*\n- *The bus left at six*',
      ],
      v: vPerfectVsPast,
      n: 'Two tenses often confuse students. Use the present perfect when the result or experience still matters now, with words such as since, for, so far, just and yet. Use the simple past for a finished event, especially with a time word like yesterday, ago or last year. A definite past time word rules the present perfect out.',
    }),
    sl('concept', 'Keeping tenses in step', {
      b: 'A paragraph must hold **one time frame** unless the meaning moves. Look at the verbs around the gap, not only the gap.',
      v: vSequence,
      n: 'In a paragraph, tenses must agree. When two past events are linked, the earlier one takes the past perfect and the later one the simple past. A long action cut short takes the continuous. A clause of time about the future uses a present form, and a past reporting verb backshifts the reported verb. Read the whole paragraph before you fill any gap.',
    }),
    sl('concept', 'Conditions: three patterns', {
      b: 'The tense in an *if* clause tells you **how likely** the condition is.',
      v: vConditions,
      n: 'Conditions follow three patterns. A likely condition uses the present simple after if, and will in the main clause. An unlikely or imagined condition uses the simple past after if, and would in the main clause. An impossible condition in the past uses the past perfect after if, and would have with a past participle in the main clause.',
    }),
    sl('concept', 'Three kinds of clause', {
      b: 'A clause has its own **subject and verb**. A subordinate clause cannot stand alone and does the work of a noun, an adjective or an adverb.',
      v: vClauseTypes,
      n: 'There are three kinds of subordinate clause. A noun clause does the work of a noun, as subject or object. A relative clause does the work of an adjective and describes a noun. An adverb clause does the work of an adverb and tells us the time, reason, condition, contrast or purpose. Ask what job the clause is doing.',
    }),
    sl('concept', 'Relative clauses: who, whom, whose, which, that', {
      b: 'Choose the pronoun by **who or what it replaces** and by its job in the clause.',
      v: vRelative,
      n: 'In a relative clause, choose the pronoun by what it replaces. Who is for people as subject, whom for people as object, whose shows possession, which is for things, and that is for defining clauses only. Test by turning the clause into a short sentence and see which word it needs.',
    }),
    sl('example', 'Worked example 2: defining or non-defining?', {
      b: '*My brother has two kites. One kite, ______ (which / that) he made himself, is red.* Which word fits, and why?',
      bl: [
        '**The clause** adds a detail about a kite we are already talking about.',
        '**So it is non-defining:** it takes commas and cannot take *that*.',
        '**Answer:** *which*.',
        '**Test:** removing the clause leaves a complete, sensible sentence.',
      ],
      v: vDefining,
      n: 'Here the clause adds a detail about one kite we already know. That makes it non-defining. A non-defining clause takes commas and cannot use that, so the answer is which. A quick test: remove the clause. If the sentence still makes sense and says the same thing about which kite, the clause was non-defining.',
    }),
    sl('concept', 'Noun clauses', {
      b: 'A noun clause often follows a verb of **thinking, knowing, saying or asking**.',
      v: vNoun,
      n: 'Noun clauses often follow verbs of thinking, knowing, saying or asking. Use that when the clause is a statement. Use whether or if for a yes or no question, or for two choices. Use a wh word, such as where, why or how, when the clause answers a question. In all of them, the clause keeps statement word order.',
    }),
    sl('check', 'Check: which kind of clause?', {
      chk: 'dk_clause',
      v: vClauseTypes,
      n: 'Your turn. Look at the sentence Mira knew that the shop had closed. What kind of clause are the words that the shop had closed? Ask what job the clause is doing.',
    }),
    sl('concept', 'Adverb clauses and their connectives', {
      b: 'Match the **connective to the idea**: a wrong connective changes the meaning.',
      v: vAdverb,
      n: 'Adverb clauses tell us time, reason, condition, contrast, purpose or result. Pick the connective for the idea. When, after and as soon as are for time. Because, since and as give a reason. If and unless give a condition. Although is for contrast. So that is for purpose. And never use although together with but in one sentence.',
    }),
    sl('example', 'Worked example 3: a gap with a clause and a tense', {
      b: '*If the rain ______ (stop) soon, we ______ (play) on the lawn; if it stopped now, we ______ (play) with wet shoes.*',
      bl: [
        '**Gap 1:** a likely condition: present simple, **stops**.',
        '**Gap 2:** main clause for a likely condition: **will play**.',
        '**Gap 3:** unlikely or imagined condition: **would play**.',
        '**Check:** each *if* clause and its main clause belong to the same pattern.',
      ],
      v: vConditions,
      n: 'This example puts two patterns side by side. If the rain stops soon is a likely condition, so we use the present simple, and the main clause takes will. If it stopped now is imagined, so the simple past is used and the main clause takes would. Always match the if clause with its own main clause.',
    }),
    sl('check', 'Check: choose the connective', {
      chk: 'dk_adverb',
      v: vAdverb,
      n: 'Try this one. The lift was out of order, and so we climbed to the sixth floor. Which connective gives the right idea of reason?',
    }),
    sl('summary', 'Summary: tenses and clauses', {
      bl: [
        'Clue words choose the tense; read the whole paragraph first.',
        'Earlier past event: past perfect; later: simple past.',
        'Present perfect links to now; simple past is finished.',
        'Conditions: present + will; past + would; past perfect + would have.',
        'Clauses: noun (that, whether), relative (who, which), adverb (because, although).',
      ],
      v: vRoutine,
      n: 'To sum up. Clue words choose the tense, so read the whole paragraph first. Use the past perfect for the earlier of two past events. The present perfect links to now. Match each if clause with its own main clause. And choose clauses by their job: noun clauses, relative clauses and adverb clauses, each with its own connectives.',
    }),
    sl('exam-tips', 'Exam tips: gap filling', {
      bl: [
        'Read the whole passage before you fill the first gap.',
        'Underline since, for, by the time, yesterday and other clues.',
        'Reread the paragraph with your answers in place.',
        'Check verbs, connectives and pronouns for each gap.',
        'Common slips: a present form with a past clue; although together with but; that in a non-defining clause.',
      ],
      v: vErrors,
      n: 'Exam tips for gap filling. Read the whole passage before filling the first gap. Underline the clue words. After filling, reread the paragraph with your answers in place to catch any slip. Common slips are a present form with a past clue, although used together with but, and that used in a non-defining clause.',
    }),
  ],
});

// ---------------------------------------------------------------- deck part 2
const part2 = deck({
  part: 2,
  title: 'Re-ordering and Transformation of Sentences — Part 2',
  goals: [
    'Change active sentences to passive, keeping tense and modals',
    'Change direct speech to reported speech and back, shifting everything that must shift',
    'Combine sentences with relative, noun and adverb clauses',
    'Move between degrees and between simple, compound and complex sentences',
    'Re-order jumbled word groups into one correct sentence',
  ],
  slides: [
    sl('title', 'Re-ordering and Transformation', {
      b: 'In a transformation, the **meaning stays** and the **form changes**. This part teaches you which changes must be made together.',
      v: vTransformSummary,
      n: 'Welcome to part two. In a transformation task, the meaning of the sentence stays the same and only its form changes. The skill is knowing which changes must be made together. Each task type has its own checklist, and this part gives you those checklists, one after another.',
    }),
    sl('concept', 'Active to passive', {
      b: 'The passive **keeps the tense or modal** of the active and adds *be* in the matching form plus a past participle.',
      v: vPassive,
      n: 'In the passive, the object of the active sentence becomes the subject. The tense or modal stays the same, and you add the right form of be, followed by the past participle. The present continuous becomes is being made. The present perfect becomes has been made. A modal plus perfect becomes must have been made.',
    }),
    sl('diagram', 'Five steps to the passive', {
      b: 'Add the **doer** with *by* only when it adds information.',
      v: vPassiveSteps,
      n: 'Here are five steps. Find the object. Make it the subject. Keep the tense and add be with the past participle. Add by and the doer only if the doer is needed, and leave it out when it is unknown or obvious. Finally check that the meaning is the same as in the active sentence.',
    }),
    sl('check', 'Check: passive of a continuous tense', {
      chk: 'dk_passive',
      v: vPassive,
      n: 'Your turn. The cook is preparing the meal. Which sentence is the passive form? Remember that the tense must stay the present continuous.',
    }),
    sl('example', 'Worked example 1: a modal passive', {
      b: '*The club can book the auditorium for the debate.* Change into the passive.',
      bl: [
        '**Object:** *the auditorium*, which becomes the subject.',
        '**Modal:** *can* stays; add *be* plus the past participle.',
        '**Result:** *The auditorium can be booked by the club for the debate.*',
        '**Check:** the modal and the meaning are unchanged.',
      ],
      v: vPassiveSteps,
      n: 'Here is a modal passive. The club can book the auditorium. The object, the auditorium, becomes the subject. The modal can stays, and we add be and the past participle: can be booked. So the passive is: The auditorium can be booked by the club for the debate. The modal and the meaning are both unchanged.',
    }),
    sl('concept', 'Reported speech: tense backshift', {
      b: 'After a **past reporting verb**, the reported verb steps one tense back.',
      v: vBackshift,
      n: 'When the reporting verb is in the past, the reported verb steps one tense back. Present simple becomes simple past. Present continuous becomes past continuous. Present perfect and simple past both become past perfect. Will becomes would, and can becomes could. Universal truths and facts that are still true need not backshift.',
    }),
    sl('concept', 'Reported speech: pronouns, time and place', {
      b: 'Pronouns follow the **speaker and the listener**. Time and place words move away from the moment of speaking.',
      v: vTimeWords,
      n: 'Pronouns change to fit the speaker and the listener. Time and place words move away from the moment of speaking: now becomes then, yesterday becomes the day before, tomorrow becomes the next day, here becomes there. If the report is made on the same day, some time words can stay. Always ask when the report is made.',
    }),
    sl('check', 'Check: report a statement', {
      chk: 'dk_reported',
      v: vBackshift,
      n: 'Try one. Sheela said I am busy. Report the sentence later, using the past tense for the reporting verb. Remember to change both the tense and the pronoun.',
    }),
    sl('concept', 'Questions, commands and requests', {
      b: 'Reported questions use **statement word order** and no question mark.',
      v: vSentenceKinds,
      n: 'Each kind of sentence has its own reporting pattern. A statement uses said that or told that. A yes or no question uses asked if or whether, with statement word order. A wh question keeps its wh word, also with statement order. A command or request uses a verb like ordered or asked, with the object and to.',
    }),
    sl('example', 'Worked example 2: report a short dialogue', {
      b: '*Teacher: "Will you carry the charts, Imran?" Imran: "Yes, I will carry them after lunch."*',
      bl: [
        '**Line 1:** a yes-no question: *The teacher asked Imran whether he would carry the charts.*',
        '**Line 2:** a statement: *Imran replied that he would carry them after lunch.*',
        '**Shifts:** *will* to *would*, *you* to *he*, *I* to *he*.',
        '**Reporting verbs** are chosen to suit the line: *asked*, *replied*.',
      ],
      v: vSentenceKinds,
      n: 'Look at this short dialogue. The teacher asks Imran whether he will carry the charts. That is a yes or no question, so we use asked whether, statement order, and will becomes would. Imran replies that he would carry them after lunch. Choose reporting verbs to suit each line, such as asked and replied.',
    }),
    sl('concept', 'Combining sentences with clauses', {
      b: 'Decide first **how the two ideas are related**, then choose the clause.',
      v: vCombine,
      n: 'To combine sentences, first decide how the two ideas are related. An extra fact about a noun gives a relative clause. A statement that is the object of a verb gives a noun clause with that. A reason, a time or a contrast gives an adverb clause. Then choose the right connective and keep the tenses in step.',
    }),
    sl('check', 'Check: combine with who', {
      chk: 'dk_combine',
      v: vCombine,
      n: 'Your turn. The tailor is a person, and he is the subject of had stitched. Which sentence joins the two sentences correctly? Choose the relative pronoun by what it replaces.',
    }),
    sl('concept', 'Degrees of comparison', {
      b: 'You can say the same thing in **three degrees**; the meaning must not change.',
      v: vDegrees,
      n: 'The same idea can be said in three degrees. The superlative says this is the highest hill. The comparative says this hill is higher than any other hill. The positive says no other hill is as high as this one. When you change degree, make sure the meaning does not change, and use than any other for the comparative.',
    }),
    sl('concept', 'Simple, compound and complex', {
      b: 'Count the **clauses and how they are joined**.',
      v: vSentenceTypes,
      n: 'A simple sentence has one main clause. A compound sentence joins two or more main clauses with and, but, so or or. A complex sentence has a main clause with at least one subordinate clause. Changing between them means changing a phrase into a clause, or a clause into a coordinated main clause, without changing the meaning.',
    }),
    sl('example', 'Worked example 3: re-order jumbled word groups', {
      b: '*were thanked / The night watchmen / who had guarded the school / by the staff*',
      bl: [
        '**Verb group:** *were thanked*; **subject:** *The night watchmen*.',
        '**Relative clause:** straight after the noun it describes.',
        '**Agent:** *by the staff* closes the passive.',
        '**Result:** *The night watchmen who had guarded the school were thanked by the staff.*',
      ],
      v: vReorder,
      n: 'Here is a jumbled sentence. Start with the verb group, were thanked, and its subject, the night watchmen. The relative clause, who had guarded the school, must come straight after the noun it describes. The agent, by the staff, closes the passive. Read it aloud to check that it sounds right.',
    }),
    sl('concept', 'Word order traps', {
      b: 'Some openers force **question order** in the main clause. Learn the few that matter.',
      v: vInversion,
      n: 'Some sentence openers force question order in the main clause. Not until, never, seldom, hardly, and only after are the common ones. After them the helping verb comes before the subject. Spot the opener first, then place the remaining groups. These traps appear often in re-ordering tasks, so learn the list.',
    }),
    sl('summary', 'Summary: transformation and re-ordering', {
      bl: [
        'Passive: object to subject; keep tense or modal; be + past participle.',
        'Reported speech: backshift, pronouns, time words, reporting verb, question order.',
        'Combine: relative, noun or adverb clause by the relation of ideas.',
        'Degrees and types: meaning unchanged.',
        'Jumbled words: verb group, subject, clauses beside their nouns, openers.',
      ],
      v: vTransformSummary,
      n: 'To sum up. In the passive, keep the tense and add be with the past participle. In reported speech, change tense, pronouns, time words and the reporting verb together. Combine sentences by the relation between ideas. Change degrees and sentence types without changing meaning. For jumbled words, find the verb group and the subject, and keep clauses beside their nouns.',
    }),
    sl('exam-tips', 'Exam tips: transformation', {
      bl: [
        'Make all the changes a task needs; one missed shift loses the mark.',
        'Keep the meaning: do not add or drop information.',
        'Check commas and question marks after each change.',
        'Read your jumbled sentence aloud before you write it.',
        'Common slips: backshift forgotten; question order kept in a reported question; although together with but.',
      ],
      v: vErrors,
      n: 'Exam tips for transformation. Make every change that a task needs, because one missed shift can lose the mark. Keep the meaning the same. Check commas and question marks after each change. Read a re-ordered sentence aloud. Common slips are forgetting the backshift, keeping question order in a reported question, and using although together with but.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Grammar — Class 11 notes',
  sections: [
    {
      h: '1. The grammar section at a glance',
      t: [1, 2],
      b: 'Class 11 has no board exam: the school annual examination carries **7 marks** for grammar. Tasks are **gap filling with tenses and clauses** and **re-ordering and transformation** of sentences.\n\nSOYL chapter tests use the class-default pattern: objective questions on forms, 2- and 3-mark transformations, 5-mark paragraph tasks and 4-mark gap or error passages.',
      v: vPattern,
      terms: [
        ['Gap filling', 'Choosing or writing the right word or form for a blank in a sentence or paragraph.'],
        ['Transformation', 'Changing the form of a sentence without changing its meaning.'],
      ],
    },
    {
      h: '2. Tenses and time clues',
      t: 1,
      b: 'Every tense is a time (present, past, future) plus a form (simple, continuous, perfect, perfect continuous).\n\n**Clues:** *every day* → present simple; *now* → present continuous; *since, for, so far, yet* → present perfect (continuous); *yesterday, ago, last year* → simple past; *by the time* with an earlier past event → past perfect; *by tomorrow* → future perfect.\n\nUse the **present perfect** when the result or experience matters now and the **simple past** for a finished event.',
      v: vTenseGrid,
      vs: [vClues, vPerfectVsPast],
      terms: [
        ['Perfect', 'A form that looks back from a point in time: has/had/will have + past participle.'],
        ['Continuous', 'A form that shows an action in progress: be + -ing.'],
      ],
    },
    {
      h: '3. Tense sequence, conditions and consistency',
      t: 1,
      b: 'Two past events: the earlier takes the past perfect, the later the simple past. A time clause about the future takes a present form (*when I reach home*).\n\n**Conditions:** likely = *if* + present, *will*; unlikely = *if* + past, *would*; impossible past = *if* + past perfect, *would have* + past participle. A *wish* about the past takes the past perfect.\n\nTense is not the same as time: a timetable may use the present simple for the future. Read the whole sentence for clues.',
      v: vSequence,
      vs: [vConditions],
      terms: [
        ['Tense sequence', 'The way tenses of the verbs in one passage fit one another.'],
        ['Backshift', 'Moving a verb one tense back in reported speech.'],
      ],
    },
    {
      h: '4. Clauses: noun, relative and adverb',
      t: 1,
      b: 'A **noun clause** does the work of a noun (*that, whether, if, what, why, how*). A **relative clause** describes a noun (*who* for people as subject, *whom* as object, *whose* for possession, *which* for things, *that* in defining clauses only). A **non-defining** clause adds extra detail and takes commas; a **defining** clause picks out which one and takes none.\n\nAn **adverb clause** gives time (*when, after*), reason (*because, since*), condition (*if, unless*), contrast (*although*), purpose (*so that*) or result (*so ... that*). Do not use *although* and *but* together.',
      v: vClauseTypes,
      vs: [vRelative, vDefining, vNoun, vAdverb],
      terms: [
        ['Subordinate clause', 'A clause with its own subject and verb that cannot stand alone.'],
        ['Non-defining clause', 'A relative clause that adds extra information and is set off by commas.'],
      ],
    },
    {
      h: '5. Active and passive',
      t: 2,
      b: 'In the passive, the object of the active sentence becomes the subject, the tense or modal is kept, and **be** in the right form plus the **past participle** is added: *is made, is being made, has been made, was made, will be made, can be made, must have been made*.\n\nUse *by* and the doer only when it adds information. The passive is chosen when the doer is unknown or unimportant.\n\nWith verbs of saying, two passives are possible: *It is said that ...* and *The subject is said to ...*.',
      v: vPassive,
      vs: [vPassiveSteps],
      terms: [
        ['Passive voice', 'A form in which the subject receives the action.'],
        ['Agent', 'The doer of the action, introduced by by in a passive sentence.'],
      ],
    },
    {
      h: '6. Reported speech',
      t: 2,
      b: 'After a past reporting verb the reported verb backshifts: present simple → simple past, present continuous → past continuous, present perfect and simple past → past perfect, *will* → *would*, *can* → *could*.\n\nPronouns follow the speaker and listener. Time and place words move away: *now* → *then*, *yesterday* → *the day before*, *tomorrow* → *the next day*, *here* → *there*, *ago* → *before*. On the same day some can stay. Facts still true need no backshift.\n\nQuestions are reported with *if/whether* or the *wh-word* in statement order; commands and requests with a verb plus object plus *(not) to*.',
      v: vBackshift,
      vs: [vTimeWords, vSentenceKinds],
      terms: [
        ['Reporting verb', 'The verb that introduces reported speech, such as said, asked or ordered.'],
        ['Direct speech', 'The speaker\'s exact words in quotation marks.'],
      ],
    },
    {
      h: '7. Combining, degrees, sentence types and re-ordering',
      t: 2,
      b: '**Combining:** relate the ideas, then choose a relative clause (extra fact about a noun), a noun clause with *that* (a statement as object) or an adverb clause (reason, time, contrast).\n\n**Degrees:** *the highest hill* = *higher than any other hill* = *no other hill is as high as this one*. **Types:** simple (one main clause), compound (main clauses joined by *and, but, so, or*), complex (main clause plus subordinate clause).\n\n**Re-ordering:** find the verb group and its subject; keep a clause beside the noun it describes; place openers such as *not until* with question order; read aloud.',
      v: vCombine,
      vs: [vDegrees, vSentenceTypes, vReorder, vInversion],
      terms: [
        ['Complex sentence', 'A sentence with a main clause and at least one subordinate clause.'],
        ['Inversion', 'Putting the helping verb before the subject, as after not until.'],
      ],
    },
  ],
  tips: '**Marks (school paper):** grammar 7 = gap filling with tenses and clauses; re-ordering and transformation. SOYL chapter tests use objective questions, 2- and 3-mark transformations, 5-mark paragraph tasks and 4-mark gap or error passages.\n\n**How marks are awarded**\n- Objective and gap items: the one correct form; every correct alternative is accepted.\n- Transformation: one mark for each change that the task needs (for example tense, pronoun, time word) with the meaning kept.\n- Paragraph tasks: one mark for each error corrected or each pair joined; consistent tenses and clear punctuation.\n\n**Common mistakes**\n1. A present form with a past clue; the present perfect with *yesterday* or *last week*.\n2. Missing the earlier event: the past perfect forgotten.\n3. *Although* together with *but*; *that* in a non-defining clause.\n4. Question order kept in a reported question.\n5. A time word or pronoun left unchanged in reported speech made later.\n6. A modal or *been* dropped in the passive.\n7. A jumbled sentence not read aloud.\n\n**Time:** read the whole paragraph or sentence before you fill the first gap or make the first change.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Grammar marks in the Class 11 school paper', 'Grammar = 7: gap filling with tenses and clauses; re-ordering and transformation.', 'fact', 1],
  ['The twelve tense forms', 'Present, past, future, each in simple, continuous, perfect and perfect continuous.', 'concept', 1],
  ['Clue: since or for (up to now)', 'Present perfect or present perfect continuous.', 'concept', 1],
  ['Clue: yesterday, ago, last year', 'Simple past.', 'concept', 1],
  ['Two past events, one earlier', 'Earlier: past perfect. Later: simple past.', 'concept', 1],
  ['Clue: by next month', 'Future perfect: will have + past participle.', 'concept', 1],
  ['Present perfect or simple past?', 'Present perfect: result or experience matters now. Simple past: finished event.', 'concept', 1],
  ['Tense after when for a future event', 'A present form: I will call when I reach home.', 'exam-tip', 1],
  ['Likely condition', 'If + present simple, will + base verb.', 'concept', 1],
  ['Unlikely or imagined condition', 'If + simple past, would + base verb.', 'concept', 1],
  ['Impossible past condition', 'If + past perfect, would have + past participle.', 'concept', 1],
  ['A wish about the past', 'Past perfect: I wish I had known.', 'concept', 1],
  ['Noun clause', 'A clause that does the work of a noun: that, whether, if, what, why, how.', 'definition', 1],
  ['Relative clause', 'A clause that describes a noun: who, whom, whose, which, that.', 'definition', 1],
  ['Who, whom, whose', 'Who: person as subject. Whom: person as object. Whose: possession.', 'concept', 1],
  ['Defining or non-defining?', 'Defining picks out which one, no commas, that allowed. Non-defining adds extra detail, commas, no that.', 'concept', 1],
  ['Adverb clause ideas', 'Time, reason, condition, contrast, purpose, result.', 'concept', 1],
  ['Although and but', 'Never together: although already shows the contrast.', 'exam-tip', 1],
  ['Gap-filling routine', 'Read all, underline clues, name time and order, choose the form, reread.', 'exam-tip', 1],
  ['How to form the passive', 'Object to subject; keep tense or modal; be + past participle.', 'concept', 2],
  ['Passive of is making', 'Is being made.', 'example', 2],
  ['Passive of must have made', 'Must have been made.', 'example', 2],
  ['Backshift', 'Present simple to simple past; present perfect and simple past to past perfect; will to would.', 'concept', 2],
  ['Reported time words', 'now to then; yesterday to the day before; tomorrow to the next day; here to there.', 'concept', 2],
  ['When no backshift is needed', 'The reporting verb is present, or the fact is still true, or the report is made at once.', 'exam-tip', 2],
  ['Reporting a yes-no question', 'Asked if or whether, statement word order, no question mark.', 'concept', 2],
  ['Reporting a command', 'Ordered / told / asked + object + (not) to + base verb.', 'concept', 2],
  ['Positive, comparative, superlative', 'No other hill is as high; higher than any other hill; the highest hill.', 'concept', 2],
  ['Simple, compound, complex', 'One main clause; main clauses joined; main clause + subordinate clause.', 'definition', 2],
  ['Inversion after not until', 'Question order in the main clause: Not until dawn did the wind drop.', 'exam-tip', 2],
  ['Re-ordering jumbled groups', 'Find the verb group and subject; clause beside its noun; read aloud.', 'exam-tip', 2],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  title: 'Chapter test (short) — Grammar',
  duration: 40,
  blueprint: 'cbse-11-default-chapter-test-short',
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Multiple-choice and assertion-reason questions.', items: ['m_whose', 'm_cond_knew', 'm_rep_statement', 'ar_whose'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'About 30 to 50 words for 2-mark and 50 to 80 words for 3-mark answers.', items: ['s2_passive_modal', 's2_report_future', 's3_report_exchange'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any one of the two questions (80 to 120 words).', items: [{ attempt: 1, keys: ['l_tense_para', 'l_report_talk'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the passage and answer all parts.', items: ['cs_library'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  title: 'Chapter test (long) — Grammar',
  duration: 90,
  blueprint: 'cbse-11-default-chapter-test-long',
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Multiple-choice and assertion-reason questions.', items: ['m_ppc', 'm_whether', 'm_nondef', 'm_has_gone', 'm_wish_past', 'm_passive_perfmodal', 'm_rep_question', 'm_ambiguity', 'ar_passive_b', 'ar_backshift_true'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Internal choice in one 2-mark and one 3-mark question.', items: ['s2_has_lost', 's2_direct', { attempt: 1, keys: ['s2_comma_meaning', 's2_adverb_complete'] }, 's3_tense_para', { attempt: 1, keys: ['s3_combine_four', 's3_if_error'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer the first question and any one of the next two.', items: ['l_notice_passive', { attempt: 1, keys: ['l_join_clauses', 'l_edit_mixed'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage and answer all parts.', items: ['cs_edit_ride', 'cs_dialogue'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 (tenses and clauses in gap filling) and t02 (re-ordering and transformation of sentences) only; no removed topics for 2026-27',
    originality: 'every sentence, passage and dialogue written for this chapter (passage_origin soyl-original); no textbook, grammar-book, sample-paper or past-paper sentence used or adapted',
    pattern: 'school paper: grammar 7 = gap filling with tenses and clauses; re-ordering and transformation; chapter tests follow cbse-11-default-chapter-test-short and -long item for item',
    re_solve: 'author verifier pass: every objective item and passage part re-answered from its stem; every accepted alternative checked; every model answer checked against its word limit',
  },
});
