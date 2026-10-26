// CBSE 10 English Language and Literature, ch02 Grammar — question bank. Every sentence is original
// (Indian school and home life); no NCERT, workbook or board-paper item is reused.
import { Q, mcq, fb, short, long, tf, ar, match, ord, caseQ, child } from './lib.mjs';

const ERR = 'Identify the error in the sentence and supply the correction.';
const ERR_SCHEME = [
  ['Incorrect word or phrase identified', 0.5],
  ['Correct form supplied', 0.5],
];
const OMIT = 'One word is missing in the sentence. Write the missing word along with the words that come before and after it.';
const OMIT_SCHEME = [
  ['Place of the omission identified (words before and after)', 0.5],
  ['Correct missing word supplied', 0.5],
];
const REP_SCHEME = [
  ['Suitable reporting verb and linking word (that / if / whether / wh-word / to)', 0.5],
  ['Pronoun, tense and time-word changes all correct', 0.5],
];

// ================================================================ t01 Determiners
Q('det_an', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Choose the correct determiner.\n\nOur class monitor is ___ honest boy who never hides a mistake.',
  opts: ['an', 'a', 'some', 'many'],
  sol: '"Honest" begins with a vowel **sound** (the *h* is silent: "on-est"), so it takes **an**. "Some" and "many" need a plural or uncountable noun, not "boy".',
}));
Q('det_alittle', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Choose the correct option.\n\nThere is ___ milk left in the fridge, enough for Dadi\'s evening tea.',
  opts: ['a little', 'a few', 'few', 'many'],
  sol: '"Milk" is **uncountable**, so only *little / a little* can go with it; "a few", "few" and "many" are for countable plurals. "Enough for Dadi\'s tea" gives the positive sense of *a small but sufficient amount*, which is **a little**.',
}));
Q('det_afew', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Choose the correct option.\n\nOnly ___ students turned up for the 6 a.m. practice, so the coach cancelled it.',
  opts: ['a few', 'a little', 'much', 'little'],
  sol: '"Students" is a **countable plural**, which rules out *a little, much* and *little* (all for uncountable nouns). "Only a few" is the natural fixed pairing for a small number.',
}));
Q('det_each', mcq({
  t: 1, d: 2, c: 'analysis',
  stem: 'Which sentence uses the determiner correctly?',
  opts: ['Each student must carry an ID card.', 'Every students must carry an ID card.', 'Much students carry ID cards.', 'Each of student must carry an ID card.'],
  sol: '*Each* and *every* take a **singular** noun ("each student", "every student"). "Much" is for uncountable nouns. "Each of" needs a plural noun with a determiner ("each of the students").',
}));
Q('det_an_the', fb({
  t: 1, d: 2, c: 'understanding', marks: 1,
  stem: 'Fill in the blanks with suitable articles.\n\nMy cousin is studying to become ___ engineer, and she hopes to work for ___ Indian Space Research Organisation one day.',
  acc: [['an'], ['the']],
  sol: '(1) "engineer" begins with a vowel sound → **an**. (2) A particular, unique organisation whose name contains a common noun ("Organisation") takes **the**.',
  scheme: [['Blank 1: an', 0.5], ['Blank 2: the', 0.5]],
}));
Q('det_much', fb({
  t: 1, d: 1, c: 'understanding',
  stem: 'Complete the sentence with the correct word from the brackets.\n\nThere isn\'t ___ (much / many) sugar in the jar, so please buy a kilo.',
  acc: [['much']],
  sol: '"Sugar" is uncountable, and *much* goes with uncountable nouns, especially in negatives. *Many* is for countable plurals (many biscuits). Answer: **much**.',
}));
Q('det_neither', fb({
  t: 1, d: 2, c: 'understanding',
  stem: 'Complete the sentence with the correct word from the brackets.\n\nThe shopkeeper showed me two school bags, but neither ___ (bag / bags) had a bottle pocket.',
  acc: [['bag']],
  sol: '*Neither* (like *either, each, every*) is followed by a **singular** noun: "neither bag". The plural is used only with "neither of the bags". Answer: **bag**.',
}));
Q('det_advice', short({
  t: [1, 6], d: 3, c: 'analysis', marks: 1,
  stem: `${ERR}\n\nBefore the interview, my mentor gave me a useful advice.`,
  model: 'Error: **a useful advice** → Correction: **useful advice** (also accepted: *some useful advice* / *a piece of useful advice*).',
  sol: '"Advice" is an **uncountable** noun, so it cannot take *a/an*. Drop the article, or use a quantity phrase such as *some* or *a piece of*.',
  scheme: ERR_SCHEME,
}));
Q('det_match', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each determiner with the meaning it gives.',
  pairs: [
    ['a few', 'some (countable) — enough to make a difference'],
    ['few', 'hardly any (countable) — fewer than expected'],
    ['a little', 'some (uncountable) — a small but useful amount'],
    ['little', 'hardly any (uncountable) — almost none'],
  ],
  sol: 'With the article (*a few, a little*) the meaning is **positive**; without it (*few, little*) the meaning is **negative**. *Few* forms go with countable nouns, *little* forms with uncountable nouns.',
}));
Q('det_tf_university', tf({
  t: 1, d: 2, c: 'understanding',
  stem: 'True or false: we write "an university" because "university" begins with a vowel letter.',
  ans: false,
  sol: 'The choice depends on the first **sound**, not the letter. "University" begins with a "yoo" (consonant) sound, so it is **a university** — just like *a uniform* and *a European city*.',
}));
Q('det_order', ord({
  t: [1, 4], d: 2, c: 'application', marks: 1,
  stem: 'Arrange the word groups to make a correct sentence.',
  items: ['Each of', 'the players', 'has finished', 'the warm-up drill.'],
  sol: 'The sentence is **"Each of the players has finished the warm-up drill."** *Each of* needs a plural noun phrase after it ("the players"), and the verb agrees with *each*, so it is singular: **has finished**.',
}));
Q('det_short2', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: [20, 40],
  stem: 'Fill in the blanks with suitable determiners and give a reason for each choice.\n\n"I have (a) ___ friends in Chennai, but during exams I hardly get (b) ___ time to call them."',
  model: '(a) **a few / some / many** — "friends" is a countable plural noun. (b) **any / much** — "time" here is uncountable, and "hardly" makes the sentence negative, which suits *any* or *much*.',
  sol: 'Step 1: decide whether each noun is countable (friends) or uncountable (time). Step 2: check the sense — "hardly" is negative, so *any/much* fit (b). *A few, some* or *many* all fit (a).',
  scheme: [['(a) suitable determiner with reason (countable plural)', 1], ['(b) suitable determiner with reason (uncountable, negative sense)', 1]],
}));

// ================================================================ t02 Tenses
Q('ten_hadmoved', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Choose the correct option.\n\nBy the time the ambulance arrived, the neighbours ___ the injured cyclist into the shade.',
  opts: ['had moved', 'have moved', 'will have moved', 'are moving'],
  sol: 'Two past actions: the neighbours moved the cyclist **before** the ambulance arrived. "By the time + simple past" signals the **past perfect** for the earlier action: *had moved*.',
}));
Q('ten_goingto', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Choose the correct option.\n\nLook at those dark clouds over the hills! It ___ any minute now.',
  opts: ['is going to rain', 'rains', 'rained', 'has rained'],
  sol: 'We predict a future event from **present evidence** (dark clouds) with *be going to*. The simple present, simple past and present perfect do not express this prediction.',
}));
Q('ten_since', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Choose the correct option.\n\nAnanya ___ the violin since she was seven, and she still practises every evening.',
  opts: ['has been learning', 'is learning', 'learnt', 'was learning'],
  sol: '*Since + a point in the past*, with the activity continuing now ("still practises"), needs the **present perfect continuous**: *has been learning*.',
}));
Q('ten_hadeaten', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which sentence shows an action that was completed **before** another past action?',
  opts: ['I had already eaten when Papa came home.', 'I was eating when Papa came home.', 'I eat when Papa comes home.', 'I will eat when Papa comes home.'],
  sol: 'The past perfect *had eaten* marks the earlier of two past actions. "Was eating" shows an action in progress at the same time; the other two are present or future.',
}));
Q('ten_walks', fb({
  t: 2, d: 1, c: 'understanding', marks: 1,
  stem: 'Fill in the blanks with the correct form of the verbs in brackets.\n\nEvery morning my grandfather ___ (walk) to the temple and ___ (feed) the pigeons on the way back.',
  acc: [['walks'], ['feeds']],
  sol: '"Every morning" shows a **habit**, so use the simple present. The subject "my grandfather" is third person singular, so add -s: **walks**, **feeds**.',
  scheme: [['Blank 1: walks', 0.5], ['Blank 2: feeds', 0.5]],
}));
Q('ten_waswatching', fb({
  t: 2, d: 2, c: 'application', marks: 1,
  stem: 'Fill in the blanks with the correct form of the verbs in brackets.\n\nWhile we ___ (watch) the match last night, the power ___ (go) off.',
  acc: [['were watching', 'watched'], ['went']],
  sol: 'A longer action in progress (**past continuous**: *were watching*) is interrupted by a short completed action (**simple past**: *went*). The simple past *watched* is also grammatical, but *were watching* shows the interrupted action best. "Last night" fixes the time in the past.',
  scheme: [['Blank 1: were watching', 0.5], ['Blank 2: went', 0.5]],
}));
Q('ten_notyet', fb({
  t: 2, d: 2, c: 'understanding',
  stem: 'Fill in the blank with the correct form of the verb in brackets.\n\nI ___ (not finish) my science project yet; I will submit it tomorrow.',
  acc: [['have not finished', "haven't finished"]],
  sol: '"Yet" in a negative sentence about an unfinished task that matters now signals the **present perfect**: *have not finished* (or *haven\'t finished*).',
}));
Q('ten_leaves', fb({
  t: 2, d: 3, c: 'application',
  stem: 'Fill in the blank with a correct form of the verb in brackets.\n\nThe Shatabdi ___ (leave) at 6:15 tomorrow morning, so set your alarm for five.',
  acc: [['leaves', 'is leaving', 'will leave']],
  sol: 'A timetabled future event is usually in the **simple present**: *leaves*. *Is leaving* (a fixed arrangement) and *will leave* are also correct. The time clue "tomorrow" rules out past forms.',
}));
Q('ten_ifrains', fb({
  t: 2, d: 2, c: 'understanding',
  stem: 'Fill in the blank with the correct form of the verb in brackets.\n\nIf it ___ (rain) tomorrow, the inter-house match will be postponed.',
  acc: [['rains']],
  sol: 'In an *if*-clause about a real future possibility, English uses the **simple present**, not *will*: "If it **rains** tomorrow, … will be postponed."',
}));
Q('ten_lastsunday', short({
  t: [2, 6], d: 2, c: 'analysis', marks: 1,
  stem: `${ERR}\n\nWe have visited the Science City in Kolkata last Sunday.`,
  model: 'Error: **have visited** → Correction: **visited**.',
  sol: '"Last Sunday" is a finished, definite past time. The present perfect cannot be used with such time expressions, so the simple past *visited* is needed.',
  scheme: ERR_SCHEME,
}));
Q('ten_didwent', short({
  t: [2, 6], d: 1, c: 'understanding', marks: 1,
  stem: `${ERR}\n\nKabir did not went to his coaching class yesterday.`,
  model: 'Error: **went** → Correction: **go**.',
  sol: 'After the auxiliary *did / did not*, the main verb is always in the **base form**: "did not **go**". The past tense is already carried by *did*.',
  scheme: ERR_SCHEME,
}));
Q('ten_ar', ar({
  t: 2, d: 3, c: 'analysis',
  a: 'The sentence "She has gone to Shimla last week" is incorrect.',
  r: 'The present perfect is not used with an expression of definite past time such as "last week".',
  key: 'a',
  sol: 'The sentence is wrong (it should be "She **went** to Shimla last week"), and the reason given is exactly the rule that makes it wrong. Both are true, and R explains A.',
}));
Q('ten_tf_truth', tf({
  t: 2, d: 1, c: 'recall',
  stem: 'True or false: in "The Earth goes round the Sun", the simple present is used because the sentence states a universal truth.',
  ans: true,
  sol: 'Facts that are always true (scientific facts, general truths) are written in the **simple present**.',
}));
Q('ten_short2', short({
  t: [2, 6], d: 3, c: 'analysis', marks: 2,   stem: 'Each sentence has one tense error. Rewrite the sentences correctly.\n\n(a) I am knowing the answer to this riddle.\n(b) When I reached the station, the train already left.',
  model: '(a) I **know** the answer to this riddle.\n\n(b) When I reached the station, the train **had already left**.',
  sol: '(a) *Know* is a **state verb**, which is not normally used in the continuous form, so "am knowing" becomes *know*. (b) The train left **before** I reached, so the earlier past action takes the past perfect: *had already left*.',
  scheme: [['(a) know', 1], ['(b) had already left', 1]],
}));

// ================================================================ t03 Modals
Q('mod_must', mcq({
  t: 3, d: 1, c: 'understanding',
  stem: 'Choose the correct modal.\n\nYou ___ wear a helmet when you ride a scooter; it is the law.',
  opts: ['must', 'might', 'could', 'need not'],
  sol: '"It is the law" shows a **compulsory obligation**, which is expressed by *must*. *Might/could* show possibility; *need not* says it is not necessary.',
}));
Q('mod_may', mcq({
  t: 3, d: 1, c: 'understanding',
  stem: 'Choose the correct modal.\n\n___ I borrow your geometry box for the test, please?',
  opts: ['May', 'Must', 'Should', 'Ought'],
  sol: 'Asking for **permission** politely uses *may* (or *can/could*). *Must* and *should* express obligation and advice, and *ought* needs *to* and is not used to ask permission.',
}));
Q('mod_neednot', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Choose the correct option.\n\nYou ___ come to school tomorrow; it is a holiday for Guru Nanak Jayanti.',
  opts: ['need not', 'must not', 'should', 'must'],
  sol: 'A holiday makes coming **unnecessary**, not forbidden. *Need not* = it is not necessary. *Must not* would mean you are not allowed to come; *should/must* would mean you ought to or have to come.',
}));
Q('mod_polite', mcq({
  t: 3, d: 2, c: 'analysis',
  stem: 'Which sentence makes a **polite request**?',
  opts: ['Could you please lower the volume?', 'You must lower the volume.', 'You might lower the volume.', 'You need not lower the volume.'],
  sol: '*Could you … ?* with *please* is the polite request form. *Must* is an order, *might* suggests a possibility, and *need not* removes the obligation.',
}));
Q('mod_could', fb({
  t: 3, d: 2, c: 'understanding',
  stem: 'Fill in the blank with the correct form of the modal in brackets.\n\nWhen she was only five, my sister ___ (can) name all the state capitals.',
  acc: [['could']],
  sol: 'Ability in the **past** ("when she was only five") uses *could*, the past form of *can*.',
}));
Q('mod_should', fb({
  t: 3, d: 1, c: 'understanding',
  stem: 'Complete the sentence with the correct option from the brackets.\n\nYou look exhausted after the long bus ride. You ___ (should / must not) lie down for a while.',
  acc: [['should']],
  sol: 'The speaker is giving **advice**, which is expressed by *should*. *Must not* is a prohibition and does not fit the caring meaning.',
}));
Q('mod_mustto', short({
  t: [3, 6], d: 1, c: 'understanding', marks: 1,
  stem: `${ERR}\n\nAll applicants must to submit the form before Friday.`,
  model: 'Error: **must to submit** → Correction: **must submit**.',
  sol: 'Modals such as *must, can, should, may* are followed directly by the **base form** of the verb, without *to*. (*Ought to* and *have to* are the exceptions.)',
  scheme: ERR_SCHEME,
}));
Q('mod_match', match({
  t: 3, d: 1, c: 'recall', marks: 2,
  stem: 'Match each modal with the function it usually expresses.',
  pairs: [
    ['can', 'ability'],
    ['must', 'strong obligation'],
    ['should', 'advice'],
    ['might', 'slight possibility'],
  ],
  sol: '*Can* — ability (I can swim); *must* — obligation (You must sign here); *should* — advice (You should rest); *might* — a weak possibility (It might drizzle).',
}));
Q('mod_ar', ar({
  t: 3, d: 2, c: 'understanding',
  a: '"You must not use your phone in the exam hall" expresses a prohibition.',
  r: '"Must not" means that something is not necessary.',
  key: 'c',
  sol: 'A is true: *must not* forbids an action. R is false: "not necessary" is the meaning of *need not* / *don\'t have to*, not *must not*.',
}));
Q('mod_tf', tf({
  t: 3, d: 1, c: 'understanding',
  stem: 'True or false: "You need not bring a lunch box" and "You must not bring a lunch box" mean the same thing.',
  ans: false,
  sol: 'The first says bringing one is **unnecessary** (you may if you like); the second **forbids** it.',
}));
Q('mod_short2', short({
  t: 3, d: 3, c: 'application', marks: 2,   stem: 'Rewrite each sentence using a suitable modal so that it expresses the meaning given in brackets.\n\n(a) It is possible that the results will come out today. (possibility)\n(b) It is not necessary for you to bring a gift to the party. (absence of necessity)',
  model: '(a) The results **may / might** come out today.\n\n(b) You **need not** bring a gift to the party.',
  sol: '(a) Possibility → *may* or *might* + base verb. (b) Absence of necessity → *need not* (or *don\'t have to*) + base verb. *Must not* would change the meaning to a prohibition.',
  scheme: [['(a) may / might + come', 1], ['(b) need not / don\'t have to + bring', 1]],
}));

// ================================================================ t04 Subject–verb concord
Q('con_list', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'Choose the correct option.\n\nThe list of selected candidates ___ been put up on the notice board.',
  opts: ['has', 'have', 'are', 'were'],
  sol: 'The real subject is **"the list"** (singular); "of selected candidates" only describes it. So the verb is singular: *has been put up*.',
}));
Q('con_neithernor', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'Choose the correct option.\n\nNeither the coach nor the players ___ happy with the umpire\'s decision.',
  opts: ['were', 'was', 'is', 'has'],
  sol: 'With *neither … nor*, the verb agrees with the **nearer** subject. "The players" is plural, and the sentence is about a past decision, so *were*.',
}));
Q('con_team', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'Choose the correct option.\n\nThe school cricket team ___ its kit for the tournament in Mysuru.',
  opts: ['has packed', 'have packed', 'were packing', 'pack'],
  sol: 'The pronoun **its** shows the team is being treated as **one unit**, so the verb must be singular: *has packed*. The plural forms clash with "its".',
}));
Q('con_anumber', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Choose the correct option.\n\nA number of students ___ volunteered for the cleanliness drive.',
  opts: ['have', 'has', 'is', 'was'],
  sol: '*A number of* means "many", so it takes a **plural** verb: *have volunteered*. (Compare: *The number of* volunteers **is** rising.)',
}));
Q('con_maths', fb({
  t: 4, d: 2, c: 'application', marks: 1,
  stem: 'Fill in the blanks with the correct option from the brackets.\n\nMathematics ___ (is / are) my favourite subject, but the news about the exam dates ___ (has / have) worried me.',
  acc: [['is'], ['has']],
  sol: '*Mathematics* and *news* end in -s but are **singular** nouns, so they take *is* and *has*.',
  scheme: [['Blank 1: is', 0.5], ['Blank 2: has', 0.5]],
}));
Q('con_eachof', fb({
  t: 4, d: 2, c: 'understanding',
  stem: 'Fill in the blank with the correct option from the brackets.\n\nEach of the girls in the choir ___ (has / have) a solo line in the Independence Day song.',
  acc: [['has']],
  sol: 'The subject is **each** (singular), not "girls". *Each of + plural noun* takes a singular verb: **has**.',
}));
Q('con_alongwith', short({
  t: [4, 6], d: 3, c: 'analysis', marks: 1,
  stem: `${ERR}\n\nThe principal, along with the teachers, are attending the seminar in Bhopal.`,
  model: 'Error: **are** → Correction: **is**.',
  sol: 'Phrases like *along with, as well as, together with* do not add to the subject. The subject is "the principal" (singular), so the verb is **is attending**.',
  scheme: ERR_SCHEME,
}));
Q('con_rupees', short({
  t: [4, 6], d: 3, c: 'analysis', marks: 1,
  stem: `${ERR}\n\nFive hundred rupees are too much to spend on a one-day school trip.`,
  model: 'Error: **are** → Correction: **is**.',
  sol: 'An amount of money, time or distance thought of as **one total** takes a singular verb: "Five hundred rupees **is** too much."',
  scheme: ERR_SCHEME,
}));
Q('con_tf', tf({
  t: 4, d: 3, c: 'understanding',
  stem: 'True or false: in "Idli and sambar is my usual breakfast", the singular verb is correct because the two nouns name one dish.',
  ans: true,
  sol: 'When two nouns joined by *and* name **one thing or one idea** (a single dish here), the verb is singular.',
}));
Q('con_ar', ar({
  t: 4, d: 3, c: 'analysis',
  a: '"Either my parents or my uncle is coming to the parent-teacher meeting" is correct.',
  r: 'With *either … or*, the verb agrees with the subject that is nearer to it.',
  key: 'a',
  sol: 'The nearer subject is "my uncle" (singular), so *is coming* is correct. The rule in R is exactly why A is correct.',
}));
Q('con_short2', short({
  t: [4, 1, 6], d: 3, c: 'analysis', marks: 2,   stem: 'The sentence below has two errors. Rewrite it correctly.\n\n"Each of the boys have brought there own lunch."',
  model: 'Each of the boys **has** brought **their** own lunch.',
  sol: '(1) Concord: the subject is *each* (singular) → **has**. (2) Spelling of the possessive: *there* (a place) → **their** (belonging to them). (*His own lunch* is also accepted for the pronoun.)',
  scheme: [['have → has', 1], ['there → their (or his)', 1]],
}));

// ================================================================ t05 Reported speech
Q('rep_tired', mcq({
  t: 5, d: 1, c: 'understanding',
  stem: 'Choose the correct reported form.\n\nRohan said, "I am tired after the drill."',
  opts: ['Rohan said that he was tired after the drill.', 'Rohan said that I was tired after the drill.', 'Rohan told that he was tired after the drill.', 'Rohan said that he has been tired after the drill.'],
  sol: 'Change **I → he** (Rohan is speaking about himself) and backshift **am → was** after the past reporting verb *said*. *Told* needs an object (told **me / us**), so "told that" is wrong.',
}));
Q('rep_notrun', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'Choose the correct reported form.\n\nThe teacher said to us, "Do not run in the corridor."',
  opts: ['The teacher told us not to run in the corridor.', 'The teacher told us that do not run in the corridor.', 'The teacher said us not to run in the corridor.', 'The teacher told us don\'t run in the corridor.'],
  sol: 'A negative **command** becomes *told / ordered / warned* + object + **not to** + base verb. "Said us" is ungrammatical (*said to us*), and a command is not reported with *that*.',
}));
Q('rep_where', mcq({
  t: 5, d: 2, c: 'analysis',
  stem: 'Choose the correct reported form.\n\nMeena asked me, "Where do you live?"',
  opts: ['Meena asked me where I lived.', 'Meena asked me where did I live.', 'Meena asked me where do I live.', 'Meena asked me that where I lived.'],
  sol: 'A *wh*-question keeps the *wh*-word as the link, changes to **statement order** (subject before verb: *I lived*), drops *do/did*, and loses the question mark. *That* is never added before the *wh*-word.',
}));
Q('rep_fed', short({
  t: 5, d: 2, c: 'application', marks: 1,
  stem: 'Report the following question.\n\nPapa said to me, "Have you fed the dog?"',
  model: 'Papa asked me **if / whether I had fed** the dog.',
  sol: 'A yes/no question is reported with **asked + if/whether**. *You → I*, present perfect *have fed* → past perfect **had fed**, statement order, no question mark.',
  scheme: REP_SCHEME,
}));
Q('rep_conductor', short({
  t: 5, d: 2, c: 'application', marks: 1,
  stem: 'Report the following request.\n\nThe conductor said to the passengers, "Please move to the back of the bus."',
  model: 'The conductor **requested / asked** the passengers **to move** to the back of the bus.',
  sol: 'A request uses *requested / asked* + object + **to-infinitive**. *Please* is dropped because the reporting verb *requested* already carries the politeness.',
  scheme: [['Reporting verb requested / asked with the object', 0.5], ['to move … (to-infinitive, rest of sentence correct)', 0.5]],
}));
Q('rep_tomorrow', short({
  t: 5, d: 3, c: 'application', marks: 1,
  stem: 'Report the following statement.\n\nPriya said to me, "I will call you tomorrow."',
  model: 'Priya **told me that she would call me the next day** (or *the following day*).',
  sol: '*Said to me* → **told me**; *I → she*, *you → me*; *will → would*; *tomorrow* → **the next day / the following day** (the time reference shifts because the report is made later).',
  scheme: REP_SCHEME,
}));
Q('rep_kurta', fb({
  t: 5, d: 3, c: 'application', marks: 1,
  stem: 'Complete the reported version.\n\nAsha said to her friend, "I bought this kurta yesterday."\n\nAsha told her friend that she ___ that kurta ___.',
  acc: [['had bought'], ['the previous day', 'the day before']],
  sol: 'Simple past *bought* → past perfect **had bought**; *this → that*; *yesterday* → **the previous day** (or *the day before*).',
  scheme: [['Blank 1: had bought', 0.5], ['Blank 2: the previous day / the day before', 0.5]],
}));
Q('rep_order', ord({
  t: 5, d: 2, c: 'application', marks: 1,
  stem: 'Arrange the word groups to make the correct reported question.',
  items: ['The librarian', 'asked me', 'whether', 'I had returned', 'the encyclopaedia.'],
  sol: 'The reported question is **"The librarian asked me whether I had returned the encyclopaedia."** Reporting verb + object, then *whether*, then **statement order** (*I had returned*).',
}));
Q('rep_match', match({
  t: 5, d: 2, c: 'recall', marks: 2,
  stem: 'Match each word in direct speech with its usual change in reported speech (when the report is made later, somewhere else).',
  pairs: [
    ['now', 'then'],
    ['yesterday', 'the previous day'],
    ['tomorrow', 'the next day'],
    ['here', 'there'],
  ],
  sol: 'Time and place words shift because the report is made at a different time and place: *now → then, yesterday → the previous day, tomorrow → the next day, here → there*.',
}));
Q('rep_ar', ar({
  t: 5, d: 3, c: 'analysis',
  a: '"Our physics teacher said that water boils at 100 °C at sea level" correctly reports a universal fact.',
  r: 'The reporting verb "said" is in the past tense.',
  key: 'b',
  sol: 'A is true: a universal truth keeps the present tense even after a past reporting verb. R is also true, but it does not explain A — normally a past reporting verb causes a backshift, so R is not the reason the present tense is kept.',
}));
Q('rep_tf', tf({
  t: 5, d: 1, c: 'recall',
  stem: 'True or false: commands are usually reported with a *to*-infinitive after verbs such as *ordered*, *told* or *advised*.',
  ans: true,
  sol: 'E.g. "Sit down," the umpire said to him → The umpire **told him to sit** down.',
}));
Q('rep_coach', short({
  t: 5, d: 3, c: 'application', marks: 2, wl: [20, 40],
  stem: 'Report the dialogue.\n\nCoach: "Why are you late again?"\n\nArjun: "My bus broke down near the flyover."',
  model: 'The coach asked Arjun **why he was late again**. Arjun replied that **his bus had broken down** near the flyover.',
  sol: 'Line 1 is a *wh*-question: *asked* + *why* + statement order, *you → he*, *are → was*. Line 2 is a statement: *replied that*, *my → his*, *broke down → had broken down* (backshift of the simple past).',
  scheme: [['Question reported correctly (asked + why + he was, statement order)', 1], ['Reply reported correctly (replied that + his bus had broken down)', 1]],
}));
Q('rep_dadi', short({
  t: 5, d: 3, c: 'application', marks: 2, wl: [20, 40],
  stem: 'Report the dialogue.\n\nGrandmother: "Switch off the fan before you leave the room."\n\nVivek: "I always do that, Dadi."',
  model: 'Vivek\'s grandmother **told / reminded him to switch off** the fan before he left the room. Vivek **respectfully replied that he always did that**.',
  sol: 'Line 1 is a command: *told/reminded* + object + **to-infinitive**, *you leave → he left*. Line 2 is a statement: *replied that*, *I → he*, *do → did*. The form of address *Dadi* is dropped and its respect is shown by *respectfully*.',
  scheme: [['Command reported (told/reminded him to switch off; he left)', 1], ['Statement reported (replied that he always did that)', 1]],
}));
Q('rep_long', long({
  t: 5, d: 4, c: 'application', marks: 5, wl: [60, 90],
  stem: 'Read the conversation at a stationery shop and report it in a paragraph.\n\nNidhi: "Do you have the new graph notebooks?"\n\nShopkeeper: "They will arrive on Monday."\n\nNidhi: "Can you keep two for me?"\n\nShopkeeper: "Of course. Please pay an advance of fifty rupees."\n\nNidhi: "Thank you. I will come back on Monday."',
  model: 'Nidhi asked the shopkeeper **whether he had** the new graph notebooks. The shopkeeper replied that **they would arrive** on Monday. Nidhi then asked him **if he could keep** two for her. The shopkeeper readily agreed and **requested her to pay** an advance of fifty rupees. Nidhi thanked him and said that **she would come back** on Monday.',
  sol: 'Report each line by its type: yes/no question → *asked whether/if*; statement → *replied that* with *will → would*; question with *can* → *asked if he could*; "Of course" → *readily agreed*; request → *requested her to pay*; "Thank you" → *thanked him*; final statement → *said that she would*. "On Monday" may stay because the day is named, not relative.',
  scheme: [['Line 1: yes/no question (whether he had)', 1], ['Line 2: statement (they would arrive)', 1], ['Line 3: question with can (if he could keep)', 1], ['Line 4: agreement + request (requested her to pay)', 1], ['Line 5: thanks + statement (she would come back); paragraph reads smoothly', 1]],
}));

// ================================================================ t06 Editing and omission
Q('edi_were', short({
  t: [6, 4], d: 1, c: 'understanding', marks: 1,
  stem: `${ERR}\n\nThe students was asked to assemble in the playground after lunch.`,
  model: 'Error: **was** → Correction: **were**.',
  sol: 'The subject "the students" is plural, so the passive auxiliary must be plural: *were asked*.',
  scheme: ERR_SCHEME,
}));
Q('edi_fondof', short({
  t: 6, d: 2, c: 'analysis', marks: 1,
  stem: `${OMIT}\n\nMy younger brother is very fond playing chess with our grandfather.`,
  model: 'fond **of** playing',
  sol: 'The adjective *fond* is always followed by the preposition **of**: "fond of playing". Write the words on both sides so the examiner sees the exact place.',
  scheme: OMIT_SCHEME,
}));
Q('edi_thebest', short({
  t: [6, 1], d: 2, c: 'analysis', marks: 1,
  stem: `${OMIT}\n\nShreya is best singer in our school choir.`,
  model: 'is **the** best',
  sol: 'A **superlative** adjective (*best, tallest, most useful*) needs *the* before it: "is the best singer".',
  scheme: OMIT_SCHEME,
}));
Q('edi_discussed', short({
  t: 6, d: 2, c: 'analysis', marks: 1,
  stem: `${ERR}\n\nWe discussed about the new timetable in the class meeting.`,
  model: 'Error: **discussed about** → Correction: **discussed** (no preposition).',
  sol: '*Discuss* is a transitive verb: it takes a direct object without *about* ("discussed the timetable"). (*A discussion about* is fine, because *discussion* is a noun.)',
  scheme: ERR_SCHEME,
}));
Q('edi_principal', short({
  t: 6, d: 1, c: 'understanding', marks: 1,
  stem: `${ERR}\n\nThe principle announced the board results in the morning assembly.`,
  model: 'Error: **principle** → Correction: **principal**.',
  sol: '*Principal* = the head of a school; *principle* = a rule or belief. The person who announced the results is the **principal**.',
  scheme: ERR_SCHEME,
}));
Q('edi_neitherof', mcq({
  t: [6, 4], d: 2, c: 'analysis',
  stem: 'Choose the option that corrects the error in the sentence.\n\n"Neither of the answers are correct."',
  opts: ['Neither of the answers is correct.', 'Neither of the answer are correct.', 'Neither of the answers were correct.', 'Neither of answers are correct.'],
  sol: '*Neither of + plural noun* takes a **singular** verb in formal English (the subject is *neither* = not one). The noun after *of the* stays plural.',
}));
Q('edi_since', fb({
  t: [6, 2], d: 1, c: 'understanding',
  stem: 'Fill in the blank with a suitable preposition.\n\nMy classmate Farhan has been absent ___ Monday because of viral fever.',
  acc: [['since']],
  sol: 'With the present perfect continuous, a **point** in time (Monday) takes *since*; a **period** (three days) takes *for*. Answer: **since**.',
}));
Q('edi_ar', ar({
  t: 6, d: 2, c: 'understanding',
  a: 'An omission task tests only spelling.',
  r: 'An omission task asks you to find the place where a word has been left out and to supply that word.',
  key: 'd',
  sol: 'A is false: the missing word may be an article, preposition, auxiliary, pronoun or conjunction — it tests grammar, not spelling. R correctly describes the task.',
}));
Q('edi_short2', short({
  t: [6, 1], d: 2, c: 'analysis', marks: 2,   stem: 'The notice below has two errors. Rewrite the notice sentence correctly.\n\n"All the student of Class X are informed that a extra class will be held on Saturday."',
  model: 'All the **students** of Class X are informed that **an** extra class will be held on Saturday.',
  sol: '(1) *All the* + plural noun, and the plural verb *are* → **students**. (2) *Extra* begins with a vowel sound → **an** extra class.',
  scheme: [['student → students', 1], ['a → an', 1]],
}));
Q('edi_long', long({
  t: [6, 2, 4], d: 4, c: 'analysis', marks: 5,   stem: 'Each sentence of the paragraph below has one error. Rewrite the paragraph correctly and underline the corrected words.\n\n"Last month our school organise a book fair. More than forty publishers sets up stalls in the hall. Every visitors received a free bookmark. I buyed two novels and an atlas. My friends and I has decided to start a reading club."',
  model: 'Last month our school **organised** a book fair. More than forty publishers **set** up stalls in the hall. Every **visitor** received a free bookmark. I **bought** two novels and an atlas. My friends and I **have** decided to start a reading club.',
  sol: '1. "Last month" → simple past *organised*. 2. Plural subject "publishers" and past time → *set* (past of *set* is *set*). 3. *Every* + singular noun → *visitor*. 4. The past of *buy* is irregular → *bought*. 5. The compound subject "My friends and I" is plural → *have decided*.',
  scheme: [['organise → organised', 1], ['sets → set', 1], ['visitors → visitor', 1], ['buyed → bought', 1], ['has → have', 1]],
}));

// ================================================================ case-based (passages written by SOYL)
Q('case_edit', caseQ({
  t: [6, 2, 4], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'The passage below has **one error in each numbered line**. For each line, identify the incorrect word and supply the correction.',
  passage: '(1) Every year the residents of our building celebrates Pongal together in the courtyard.\n\n(2) This year the children decorated the entrance with a kolam that took them three hour to finish.\n\n(3) The elders cooked sweet pongal in a large brass pot while we sings folk songs.\n\n(4) When the milk boiled over, everyone shout "Pongalo Pongal!" in joy.\n\n(5) The festival reminds us that sharing food make neighbours feel like one family.',
  parts: [
    child('a', fb({ t: [6, 4], d: 2, c: 'analysis', marks: 1, stem: 'Line (1): incorrect word ___ ; correction ___', acc: [['celebrates'], ['celebrate']], sol: 'The real subject is "the residents" (plural); "of our building" only describes them. So **celebrate** replaces *celebrates*.', scheme: [['celebrates', 0.5], ['celebrate', 0.5]] })),
    child('b', fb({ t: [6, 1], d: 2, c: 'analysis', marks: 1, stem: 'Line (2): incorrect word ___ ; correction ___', acc: [['hour'], ['hours']], sol: '*Three* needs a plural noun: **hours** replaces *hour*.', scheme: [['hour', 0.5], ['hours', 0.5]] })),
    child('c', fb({ t: [6, 2], d: 2, c: 'analysis', marks: 1, stem: 'Line (3): incorrect word ___ ; correction ___', acc: [['sings'], ['sang', 'were singing']], sol: 'The passage is in the past ("cooked") and "we" is plural → **sang** (or *were singing*) replaces *sings*.', scheme: [['sings', 0.5], ['sang / were singing', 0.5]] })),
    child('d', fb({ t: [6, 2], d: 2, c: 'analysis', marks: 1, stem: 'Line (4): incorrect word ___ ; correction ___', acc: [['shout'], ['shouted']], sol: 'A completed past action triggered by "boiled over" → **shouted** replaces *shout*.', scheme: [['shout', 0.5], ['shouted', 0.5]] })),
    child('e', fb({ t: [6, 4], d: 3, c: 'analysis', marks: 1, stem: 'Line (5): incorrect word ___ ; correction ___', acc: [['make'], ['makes']], sol: 'The subject of the *that*-clause is "sharing food" (a gerund phrase, singular) → **makes** replaces *make*.', scheme: [['make', 0.5], ['makes', 0.5]] })),
  ],
  sol: 'Read each line on its own. Find the subject and the time frame first; most errors are concord (lines 1, 5), tense (lines 3, 4) or a noun after a number (line 2).',
}));
Q('case_gap', caseQ({
  t: [1, 2, 3], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the message a student wrote on her class WhatsApp group and choose the correct option for each numbered blank.',
  passage: 'Hi everyone! Tomorrow (a) ___ last day to submit the photographs for the Earth Day exhibition. Ma\'am says each of us (b) ___ bring at least two prints. I (c) ___ already printed mine at the shop near the bus stop, so I can share tips today. The owner gave me (d) ___ discount because we bought in bulk. If anyone (e) ___ help with editing, message me tonight.',
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'application', stem: 'Blank (a)', opts: ['is the', 'is a', 'are the', 'is an'], sol: 'A unique, specific day → *the last day*; the subject "tomorrow" is singular → *is*.' })),
    child('b', mcq({ t: 3, d: 2, c: 'application', stem: 'Blank (b)', opts: ['must', 'might', 'need not', 'could'], sol: 'The teacher\'s instruction is an **obligation** → *must*.' })),
    child('c', mcq({ t: 2, d: 2, c: 'application', stem: 'Blank (c)', opts: ['have', 'had', 'has', 'am'], sol: '*Already* + a past action with a present result → present perfect with *I*: *have printed*.' })),
    child('d', mcq({ t: 1, d: 2, c: 'application', stem: 'Blank (d)', opts: ['a', 'an', 'much', 'few'], sol: '"Discount" is a countable noun here beginning with a consonant sound → *a discount*.' })),
    child('e', mcq({ t: 3, d: 3, c: 'application', stem: 'Blank (e)', opts: ['needs', 'need', 'needing', 'are needing'], sol: '*Anyone* is singular, and an *if*-clause about the future uses the simple present → *needs*.' })),
  ],
  sol: 'For each blank look at the words around it: the subject (concord), the time clue (tense), the meaning (modal) and the next noun (determiner).',
}));
Q('case_omit', caseQ({
  t: [6, 1, 2], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'In each numbered line of the passage, **one word has been omitted**. Supply the missing word.',
  passage: '(1) Last Saturday our NCC unit went on trek to a fort near Lonavala.\n\n(2) We started at dawn because the climb takes about three hours in monsoon.\n\n(3) Halfway up, one the cadets slipped and hurt her ankle.\n\n(4) Our officer, who is trained in first aid, bandaged quickly.\n\n(5) We reached top just as the clouds opened up below us.',
  parts: [
    child('a', fb({ t: [6, 1], d: 2, c: 'analysis', stem: 'Line (1): went on ___ trek', acc: [['a']], sol: '"Trek" is a singular countable noun → *on **a** trek*.' })),
    child('b', fb({ t: [6, 1], d: 3, c: 'analysis', stem: 'Line (2): about three hours in ___ monsoon', acc: [['the']], sol: 'We say *in **the** monsoon* (the season).' })),
    child('c', fb({ t: 6, d: 2, c: 'analysis', stem: 'Line (3): one ___ the cadets', acc: [['of']], sol: 'One member of a group is *one **of** the cadets*; the preposition *of* links *one* to the group.' })),
    child('d', fb({ t: 6, d: 3, c: 'analysis', stem: 'Line (4): bandaged ___ quickly', acc: [['it']], sol: '*Bandage* is transitive and needs an object; the ankle is referred to by the pronoun **it**: *bandaged **it** quickly*.' })),
    child('e', fb({ t: [6, 1], d: 2, c: 'analysis', stem: 'Line (5): We reached ___ top', acc: [['the']], sol: 'A specific top (of that fort) → *reached **the** top*.' })),
  ],
  sol: 'Read each line in pairs of words and listen for the gap: articles before singular countable nouns, auxiliaries before past participles, prepositions after verbs.',
}));
Q('case_report', caseQ({
  t: [5], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the conversation between a student and the school librarian, then complete the reported version.',
  passage: 'Kavya: "Can I borrow two books this week?"\n\nLibrarian: "You may take two, but return them by Friday."\n\nKavya: "Is the new atlas available?"\n\nLibrarian: "Someone borrowed it yesterday."\n\nKavya: "Please keep it for me when it comes back."',
  parts: [
    child('a', fb({ t: 5, d: 2, c: 'application', stem: 'Kavya asked the librarian ___ she could borrow two books that week.', acc: [['if', 'whether']], sol: 'A yes/no question is reported with **if** or **whether**.' })),
    child('b', fb({ t: 5, d: 3, c: 'application', stem: 'The librarian replied that she ___ take two, but told her ___ them by Friday.', acc: [['might', 'could'], ['to return']], marks: 1, sol: '*May* (permission) backshifts to **might** (or *could*); the command "return them" becomes **to return**.', scheme: [['might / could', 0.5], ['to return', 0.5]] })),
    child('c', fb({ t: 5, d: 2, c: 'application', stem: 'Kavya then asked whether the new atlas ___ available.', acc: [['was']], sol: 'Backshift of *is* → **was**, in statement order after *whether*.' })),
    child('d', fb({ t: 5, d: 3, c: 'application', stem: 'The librarian said that someone ___ it the previous day.', acc: [['had borrowed']], sol: 'Simple past *borrowed* → past perfect **had borrowed**; *yesterday → the previous day*.' })),
    child('e', fb({ t: 5, d: 3, c: 'application', stem: 'Kavya ___ the librarian to keep it for her when it came back.', acc: [['requested', 'asked']], sol: 'A request with *please* is reported with **requested** (or *asked*) + object + *to*-infinitive.' })),
  ],
  sol: 'Identify the sentence type first (yes/no question, statement, command, request), then choose the reporting verb and link word, then make the pronoun, tense and time changes.',
}));
