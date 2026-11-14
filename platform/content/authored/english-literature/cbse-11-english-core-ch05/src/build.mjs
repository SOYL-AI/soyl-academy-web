// Build CBSE 11 English Core ch05 "A Photograph" (Shirley Toulson). Run from platform/:
//   npx tsx content/authored/english-literature/cbse-11-english-core-ch05/src/build.mjs
// LITERATURE RULE (D-036): everything here is SOYL's own summary, analysis and commentary; the poem is never
// quoted or closely paraphrased. Students read it in Hornbill.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../../english-language/cbse-11-english-core-ch01/src/lib.mjs';
import { guard } from '../../../english-language/cbse-11-english-core-ch01/src/guard.mjs';

setUnit('cbse-11-english-core-ch05', 'english-literature');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const READ = "**Read the poem itself in your textbook, *Hornbill* (NCERT).** This lesson is SOYL's explanation and analysis; it does not reproduce the text.";

// ---------------------------------------------------------------- visuals
const vBoard = table(
  ['In the school paper', 'Question form', 'Marks'],
  [
    ['Hornbill poetry extract', 'a stanza with short questions on meaning, tone and devices', '3'],
    ['Short answers (Hornbill)', 'answer in a few sentences', '2 and 3'],
    ['Long answer', 'about 100-120 words: theme, message, diary, letter or opinion', '6'],
    ['SOYL chapter tests', 'a 4-mark commentary set; 2- and 3-mark shorts; 5-mark long answers', 'as set'],
  ],
  'Table of how a Hornbill poem is examined: a three-mark poetry extract, short answers of two and three marks, a long answer of about one hundred to one hundred and twenty words, and the SOYL chapter-test pattern.',
  'CBSE Class 11 school annual examination, Section C (literature).',
);
const vText = table(
  ['About the poem', ''],
  [
    ['Poet', 'Shirley Toulson, a British poet'],
    ['Form', 'a short poem in three stanzas'],
    ['Subject', 'a photograph of the poet\'s mother as a girl'],
    ['Speaker', 'the poet, looking back as a daughter'],
    ['Setting of the photograph', 'a seaside holiday with two girl cousins'],
    ['Tone', 'light description at first, quiet grief at the end'],
  ],
  'Table of facts about the poem: poet Shirley Toulson; a short poem in three stanzas; the subject is a photograph of the poet\'s mother as a girl; the poet speaks as a daughter looking back; the photograph shows a seaside holiday with two girl cousins; the tone moves from light description to quiet grief.',
);
const vMoments = flow('LR', ['The mother as a girl, at the sea', 'The mother in later years laughs at the photograph', 'The poet\'s present: mother gone, grief and silence'], 'Flow of the three moments of the poem: the mother as a girl at the sea, the mother in later years looking at the photograph, and the poet\'s present with the mother gone.', 'The poem\'s three moments in time (SOYL summary).');
const vStanza1 = table(
  ['What the first stanza gives us', 'Detail'],
  [
    ['The object', 'a small photograph mounted on card'],
    ['The people', 'three girls on a seaside holiday'],
    ['The mother', 'the eldest, about twelve years old'],
    ['The cousins', 'two girls who hold her hands'],
    ['The photographer', 'the girls\' uncle'],
    ['The tone', 'plain and cheerful'],
  ],
  'Table of what the first stanza gives: a small photograph mounted on card, three girls on a seaside holiday, the mother the eldest at about twelve, two cousins who hold her hands, the uncle as photographer, and a plain, cheerful tone.',
  'The first stanza (SOYL summary).',
);
const vStanza2 = flow('LR', ['The sea stays as it was', 'The people have grown and changed', 'The mother, later, laughs at the picture', 'What lasts is set against what passes'], 'Flow of the second stanza: the sea stays as it was, the people have grown and changed, the mother later laughs at the picture, and what lasts is set against what passes.', 'The second stanza (SOYL summary).');
const vStanza3 = flow('LR', ['The mother has been dead about twelve years', 'The poet has no words for it', 'The photograph now brings her grief', 'The poem ends in silence'], 'Flow of the third stanza: the mother has been dead about twelve years, the poet has no words for it, the photograph now brings her grief, and the poem ends in silence.', 'The third stanza (SOYL summary).');
const vThemes = table(
  ['Theme', 'Where we see it (SOYL summary)'],
  [
    ['Memory and nostalgia', 'a photograph that carries a whole holiday into the present'],
    ['The passage of time', 'three moments: girlhood, later years, the poet\'s present'],
    ['Nature and human change', 'the sea stays as it was while the people change'],
    ['Grief and loss', 'the mother\'s death and the poet\'s silence'],
    ['Two responses to one picture', 'the mother\'s laughter and the daughter\'s sorrow'],
  ],
  'Table of five themes of the poem with where each appears: memory and nostalgia, the passage of time, nature and human change, grief and loss, and two responses to one picture.',
);
const vLasts = table(
  ['', 'What lasts', 'What passes'],
  [
    ['In nature', 'the sea', 'nothing in the sea itself'],
    ['In people', 'the memory of the holiday', 'the girls\' youth; the mother\'s life'],
    ['In objects', 'the photograph', 'the world it records'],
  ],
  'Table of what lasts and what passes in the poem: in nature the sea lasts; among people the memory of the holiday lasts while youth and the mother\'s life pass; among objects the photograph lasts while the world it records passes.',
  'Lasting and passing (SOYL summary).',
);
const vPlanCase = flow('LR', ['Read the commentary first', 'Read each question', 'Find the idea in the commentary', 'Answer in your own words', 'Add the poem where asked'], 'Flow for answering a commentary-passage set: read the commentary, read each question, find the idea, answer in your own words, and add knowledge of the poem where asked.');
const vPlanLong = flow('LR', ['Take a clear stand', 'Point and stanza (own words)', 'Two or three such points', 'Link to a theme', 'One-line conclusion'], 'Flow for planning a long answer: take a stand, give points with the stanza in your own words, link to a theme, and conclude.');
const vThree = table(
  ['Stanza', 'Moment', 'Tone'],
  [
    ['First', 'the mother as a girl at the sea', 'plain and cheerful'],
    ['Second', 'the mother\'s later years; the sea against the people', 'reflective, gently amused'],
    ['Third', 'the poet\'s present: the mother gone', 'quiet grief, then silence'],
  ],
  'Table of the three stanzas, giving for each the moment in time and the tone: first, the mother as a girl, plain and cheerful; second, the mother\'s later years, reflective and gently amused; third, the poet\'s present, quiet grief and silence.',
  'The poem at a glance (SOYL summary).',
);
const vImagery = table(
  ['Image', 'Where', 'What it does'],
  [
    ['Three girls at the water', 'first stanza', 'sets a cheerful, vivid scene'],
    ['The unchanging sea', 'second stanza', 'measures how brief human lives are'],
    ['The photograph as an object', 'throughout', 'fixes one moment so that change shows'],
    ['The closing silence', 'third stanza', 'carries a grief that words cannot hold'],
  ],
  'Table of the imagery of the poem: the three girls at the water in the first stanza set a cheerful scene; the unchanging sea in the second stanza measures human brevity; the photograph fixes one moment; the closing silence carries grief.',
  'Imagery (SOYL summary).',
);
const vContrast = table(
  ['Set against each other', 'What the contrast shows'],
  [
    ['the lasting sea and the changing people', 'how brief human lives are'],
    ['the mother\'s laughter and the poet\'s sorrow', 'how the same picture changes its meaning'],
    ['girlhood and the poet\'s present', 'the distance that time makes'],
    ['the light first stanza and the quiet last', 'the movement of the poem from cheer to grief'],
  ],
  'Table of the contrasts in the poem and what each shows: the lasting sea against changing people, the mother\'s laughter against the poet\'s sorrow, girlhood against the present, and the light first stanza against the quiet last.',
  'Contrast (SOYL summary).',
);
const vIrony = table(
  ['Then', 'Now'],
  [
    ['the mother looks at the photograph and laughs', 'the daughter looks at the same photograph and grieves'],
    ['the picture brings amusement', 'the picture brings loss'],
  ],
  'Two-column table of then and now: the mother looks at the photograph and laughs, while the daughter looks at the same photograph and grieves; the picture once brought amusement and now brings loss.',
);
const vSilence = table(
  ['What the poet does', 'What it suggests'],
  [
    ['admits she has no words', 'the loss is too large to be described'],
    ['ends in silence instead of a lesson', 'the reader must supply the feeling'],
    ['keeps the language plain throughout', 'restraint makes the silence weigh more'],
  ],
  'Table of the poet\'s use of silence: admitting she has no words suggests a loss too large to describe; ending in silence asks the reader to supply the feeling; plain language throughout makes the silence weigh more.',
  'Silence and restraint (SOYL summary).',
);
const vTone = flow('LR', ['Light and plain', 'Reflective and gently amused', 'Quiet grief', 'Silence'], 'Flow of the tone of the poem: light and plain, reflective and gently amused, quiet grief, and silence.', 'How the tone moves (SOYL summary).');
const vStructure = flow('LR', ['Stanza one: girlhood', 'Stanza two: the mother\'s later years', 'Stanza three: the poet\'s present'], 'Flow of the structure of the poem: stanza one is the mother\'s girlhood, stanza two is the mother\'s later years, and stanza three is the poet\'s present.', 'Structure: three moments, one per stanza.');
const vWords = table(
  ['Word', 'Meaning'],
  [
    ['stanza', 'a group of lines forming one section of a poem'],
    ['nostalgia', 'a longing for a happy time in the past'],
    ['transience', 'the quality of lasting only a short time'],
    ['imagery', 'words that create a picture or sensation in the mind'],
    ['paradox', 'a statement or situation that seems to contradict itself yet holds truth'],
    ['tone', 'the attitude or mood of the writing'],
  ],
  'Table of word meanings: stanza, nostalgia, transience, imagery, paradox and tone.',
  'Words and terms useful for this poem.',
);
const vTitlePlan = flow('LR', ['Name what the title points to', 'Say what the object does in the poem', 'Link to a theme', 'Conclude in one line'], 'Flow for planning a short interpretive answer on the title: name what the title points to, say what the object does in the poem, link to a theme, and conclude in one line.');
const vSpeechPlan = flow('LR', ['Greeting and hook', 'Name the poem and the idea', 'Two supporting points', 'A call to the audience', 'Thanks'], 'Flow for planning a speech: greeting and hook, name the poem and the idea, two supporting points, a call to the audience, and thanks.');
const vExtrap = table(
  ['Keep faithful to', 'You may add'],
  [
    ['the facts: three girls, the seaside, the uncle, the mother\'s death', 'your own feelings, in keeping with the poem\'s restraint'],
    ['the order of the three moments', 'small, believable details that do not contradict the poem'],
    ['the quiet tone', 'a clear format: diary, letter or speech'],
  ],
  'Table of what to keep faithful to and what to add in extrapolation tasks: keep the facts, the order of the three moments and the quiet tone; add your own feelings, small believable details and a clear format.',
);
const vCommentaryEx = table(
  ['Step', 'In the example'],
  [
    ['Read the commentary', 'It says a short poem gains force when every detail does a job'],
    ['Read the question', 'What does the commentary suggest about the poem\'s brevity?'],
    ['Find the idea', 'little room for decoration; each detail counts'],
    ['Answer in own words', 'its shortness makes each detail and each silence matter'],
  ],
  'Table of the steps in a worked commentary set: read the commentary, read the question, find the idea that a short poem leaves little room for decoration so each detail counts, and answer in your own words.',
);

// ---------------------------------------------------------------- deck 1
const D1 = deck({
  part: 1,
  title: 'A Photograph, Part 1: context, summary and themes (Shirley Toulson)',
  goals: [
    'Place the poem: poet, form, speaker and tone',
    'Explain the central idea of each stanza in your own words',
    'Explain memory, loss and the passage of time',
    'Explain how the mother and the poet respond differently to the same photograph',
    'Answer a commentary-passage set and plan a long answer',
  ],
  slides: [
    sl('title', 'A Photograph: Shirley Toulson', {
      b: `*Hornbill*, poem · Class 11 CBSE English Core.\n\n${READ}`,
      v: vBoard,
      n: 'Welcome. In this lesson we study A Photograph by Shirley Toulson, a short poem about a picture of the poet\'s mother. Please read the poem itself in your textbook, Hornbill. This lesson does not repeat the text. Instead we will understand it: what each stanza does, what it means, and how to answer exam questions on it.',
    }),
    sl('concept', 'How to use this lesson', {
      bl: [
        'Read the poem once in *Hornbill*, aloud if you can.',
        'Use these slides for what each stanza does and what the poem means.',
        'Describe the poem **in your own words**; never memorise lines.',
        'Practise the commentary sets, which are SOYL commentary, not extracts.',
      ],
      n: 'Here is the best way to study a poem. First read it in your textbook, once, aloud if you can. Then come back to these slides to understand what each stanza does and what the poem means. When you write answers, use your own words, because examiners reward understanding, not memory. Finally, practise with our commentary sets.',
    }),
    sl('concept', 'The poet and the poem', {
      v: vText,
      n: 'Shirley Toulson is a British poet. This is a short poem in three stanzas. Its subject is a photograph of the poet\'s mother as a girl, taken on a seaside holiday with two girl cousins. The speaker is the poet, looking back as a daughter. The tone begins light and plain and ends in quiet grief.',
    }),
    sl('diagram', 'Three moments in time', {
      b: 'Each stanza belongs to a different moment. (A SOYL summary, not the text.)',
      v: vMoments,
      n: 'The poem is built on three moments in time. First, the mother as a girl at the sea. Second, her later years, when she looks at the photograph and laughs. Third, the poet\'s own present, when the mother is gone and the poet looks at the same picture with grief. Keep these three moments as your map.',
    }),
    sl('concept', 'Stanza 1: the photograph', {
      b: 'The first stanza describes the picture itself. It is a small photograph mounted on card. Three girls are on a seaside holiday; the future mother, about twelve, is the eldest, and her two cousins hold her hands. Their uncle took the picture. The tone is plain and cheerful.',
      v: vStanza1,
      n: 'In your own words, stanza one describes the picture. It is a small photograph mounted on card, showing three girls on a seaside holiday. The future mother is the eldest, about twelve, and her two cousins hold her hands. Their uncle took the picture. The tone is plain and cheerful, with no hint yet of sadness.',
    }),
    sl('concept', 'Stanza 2: the sea and the passing years', {
      b: 'The second stanza steps out of the picture and into time. The sea is still as it was, while the people in the photograph have grown up and changed. The poet imagines her mother, years later, looking at the picture and laughing at how they looked and at the holiday.',
      v: vStanza2,
      n: 'Stanza two moves from the picture to time. The sea is still as it was, but the people in the photograph have grown up and changed. The poet imagines her mother, years later, looking at the picture and laughing at how they looked and at the holiday itself. What lasts is set against what passes.',
    }),
    sl('concept', 'Stanza 3: the poet\'s present', {
      b: 'The third stanza reaches the poet\'s own time. Her mother has been dead for about twelve years. The poet says she has no words for this loss. The photograph now brings her grief, where it once brought her mother laughter. The poem closes in silence.',
      v: vStanza3,
      n: 'Stanza three brings us to the poet\'s own time. Her mother has been dead for about twelve years, and the poet says she has no words for this loss. The photograph now brings her grief, where once it brought her mother laughter. The poem closes in silence, and the reader is left to feel the rest.',
    }),
    sl('check', 'Check: put the moments in order', {
      chk: 'ord_time',
      n: 'Your turn. Four moments from the poem are shuffled. Put them in the order in which they happen in time, not in the order of the stanzas.',
    }),
    sl('concept', 'Themes of the poem', {
      b: 'Memory, time, nature against human change, and loss all meet in one picture.',
      v: vThemes,
      n: 'The poem has several themes. Memory and nostalgia, because a photograph carries a holiday into the present. The passage of time, shown in the three moments. Nature against human change, with the sea and the people. Grief and loss, in the mother\'s death. And two responses to one picture, laughter and sorrow.',
    }),
    sl('two-column', 'Two responses to one photograph', {
      b: 'The same picture brings amusement to one woman and sorrow to another.',
      cols: [
        '**The mother, in later years**\n\n- has lived through the years\n- looks back with amusement\n- laughs at how they looked and at the holiday',
        '**The poet, in the present**\n\n- has lost her mother\n- finds no words for it\n- meets the picture with sorrow',
      ],
      v: vIrony,
      n: 'Here is the poem\'s central idea. One photograph, two responses. The mother, who has lived through the years, looks back with amusement and laughs. The poet, who has lost her mother, meets the same picture with sorrow and finds no words. The picture has not changed, but its meaning has.',
    }),
    sl('check', 'Check: match each part of the poem', {
      chk: 'match_stanzas',
      n: 'Now match each part of the poem with what it does. Think about the moment in time that each stanza belongs to.',
    }),
    sl('concept', 'What lasts and what passes', {
      b: 'The poem keeps setting a lasting thing against a passing one.',
      v: vLasts,
      n: 'Notice how the poem keeps setting something lasting against something passing. In nature, the sea lasts. Among people, the memory of the holiday lasts, while youth and a life pass. Among objects, the photograph lasts, though the world it records is gone. This idea of transience is the heart of the second stanza.',
    }),
    sl('check', 'Check: who holds her hands', {
      chk: 'm_hands',
      n: 'A quick factual check about the first stanza. Think about who stands beside the mother in the picture.',
    }),
    sl('example', 'Worked example 1: a commentary set', {
      b: '*Commentary:* The poem gains its force from its plainness. A reader who expects loud grief finds almost none, and that restraint is what makes the sorrow felt.\n\n*Question:* What does the commentary say gives the poem its force?',
      v: vPlanCase,
      bl: [
        '**Find the idea:** its plainness and restraint.',
        '**Why:** a reader expects loud grief and finds almost none.',
        '**Answer:** the poem\'s plain, restrained language makes the sorrow felt.',
      ],
      n: 'Here is how to answer a commentary set. Read the passage and the question. Find the idea in the passage: the poem gains force from its plainness and restraint. Then answer in your own words: the plain, restrained language makes the sorrow felt. Always check which part asks for the commentary and which asks for the poem.',
    }),
    sl('example', 'Worked example 2: planning a 5-mark answer', {
      b: '*Question:* How does the poem treat the passing of time? Answer in 100-120 words.',
      v: vPlanLong,
      bl: [
        '**Stand:** time is shown through three moments and a lasting sea.',
        '**Points + stanza:** girlhood, later years, the poet\'s present.',
        '**Link:** the theme of the passage of time.',
        '**Conclusion:** time changes people but not the sea or the picture.',
      ],
      n: 'Plan a five mark answer like this. Take a stand: time is shown through three moments and a lasting sea. Give points with the stanza in your own words: girlhood, later years, the poet\'s present. Link to the theme of the passage of time. End with one line: time changes people, but not the sea or the picture.',
    }),
    sl('summary', 'Summary', {
      bl: [
        'Three stanzas, three moments: girlhood, later years, the poet\'s present.',
        'The first stanza describes the picture; the second sets the sea against the people; the third reaches grief.',
        'One photograph brings laughter to the mother and sorrow to her daughter.',
        'Themes: memory, time, nature and human change, loss.',
        'Read the poem in *Hornbill*; write about it in your own words.',
      ],
      v: vThree,
      n: 'Let us sum up. Three stanzas, three moments: girlhood, later years and the poet\'s present. The first stanza describes the picture, the second sets the sea against the people, and the third reaches grief. One photograph brings laughter to the mother and sorrow to her daughter. And remember: read the poem in your textbook and write about it in your own words.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Commentary sets: answer from the commentary first, then from the poem.',
        'Describe each stanza in your own words; do not copy lines.',
        'Name the stanza when you refer to a detail.',
        'Facts often confused: the mother is about twelve in the picture; she has been dead about twelve years; the uncle took the photograph.',
        'Do not say the poem is sad throughout: the first stanza is cheerful.',
      ],
      n: 'Exam tips. In commentary sets, answer from the commentary first. Describe each stanza in your own words and name the stanza you mean. Get the facts right: the mother is about twelve in the picture, she has been dead about twelve years, and the uncle took the photograph. And never say the poem is sad throughout. The first stanza is cheerful.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const D2 = deck({
  part: 2,
  title: 'A Photograph, Part 2: devices, tone and exam practice (Shirley Toulson)',
  goals: [
    'Identify imagery, contrast, paradox and silence, and say what each does',
    'Explain how the tone moves and how the three stanzas are structured',
    'Write a short interpretive answer, a commentary-set answer and a speech',
    'Handle statements and scenarios that need your own interpretation',
  ],
  slides: [
    sl('title', 'Devices, tone and exam practice', {
      b: `*A Photograph*, Part 2.\n\n${READ}`,
      v: vBoard,
      n: 'Welcome to part two. Here we look at the devices of the poem, its imagery, contrast, paradox and silence, then at tone and structure. We finish with exam practice: a short interpretive answer, a commentary set and a speech plan. Remember to read the poem in your textbook, Hornbill, and to write in your own words.',
    }),
    sl('concept', 'Imagery in the poem', {
      b: 'To name imagery, say where it is and what it does. Do not quote.',
      v: vImagery,
      n: 'Imagery means words that make a picture in the mind. Here are four images. The three girls at the water in the first stanza set a cheerful scene. The unchanging sea in the second stanza measures how brief human lives are. The photograph itself fixes one moment so that change shows. And the closing silence carries a grief that words cannot hold.',
    }),
    sl('concept', 'Contrast', {
      b: 'Contrast sets two things side by side so that each makes the other clearer.',
      v: vContrast,
      n: 'Contrast sets two things side by side. In this poem there are four. The lasting sea against the changing people shows how brief human lives are. The mother\'s laughter against the poet\'s sorrow shows how a picture changes its meaning. Girlhood against the present shows the distance of time. And the light first stanza against the quiet last shows the poem\'s movement.',
    }),
    sl('two-column', 'Irony and paradox: laughter and loss', {
      b: 'The same picture carries amusement and loss; the loss is partly made of the earlier laughter.',
      cols: [
        '**Then**\n\n- the mother laughs at the picture\n- the past is a source of amusement',
        '**Now**\n\n- the poet grieves over the same picture\n- the past is a source of loss',
      ],
      v: vIrony,
      n: 'Here is the paradox. The same picture carries amusement and loss. The mother laughed at it, and the poet grieves over it. The loss is partly made of that earlier laughter, because the person who could laugh is gone. The poem never explains this. It places the two reactions side by side and trusts the reader to feel the gap.',
    }),
    sl('check', 'Check: name the device', {
      chk: 'm_contrast',
      n: 'Check yourself. The poet sets the lasting sea beside the changing people. Choose the device that this is.',
    }),
    sl('concept', 'Silence and restraint', {
      b: 'The poet says she has no words, and the poem ends in silence. This is a choice, not a gap.',
      v: vSilence,
      n: 'Look at how the poem uses silence. The poet admits she has no words, which suggests the loss is too large to describe. The poem ends in silence instead of a lesson, so the reader must supply the feeling. And the language stays plain throughout, so the silence weighs more. Silence here is a choice, not a gap.',
    }),
    sl('concept', 'How the tone moves', {
      b: 'The tone changes without any announcement.',
      v: vTone,
      n: 'The tone moves in four steps. The first stanza is light and plain. The second is reflective and gently amused, looking across the years. The third is quiet grief. And the poem ends in silence. There is no moment where the poet says now I am sad. The change comes through the movement of the three stanzas.',
    }),
    sl('diagram', 'Structure: three moments, one per stanza', {
      b: 'The structure itself carries the theme of passing time.',
      v: vStructure,
      n: 'The structure is simple and clear. Stanza one is the mother\'s girlhood. Stanza two is her later years. Stanza three is the poet\'s present. Each moment is further from the beach than the one before, so the poem travels forward in time while it holds a single picture still. The structure carries the theme of passing time.',
    }),
    sl('check', 'Check: a plain cheerful opening', {
      chk: 'ar_first',
      n: 'Check yourself with an assertion and a reason about the first stanza. Read both statements, then choose the correct option.',
    }),
    sl('concept', 'Words and terms', {
      v: vWords,
      n: 'These words often appear in answers. A stanza is a group of lines forming one section of a poem. Nostalgia is a longing for a happy time in the past. Transience is the quality of lasting only a short time. Imagery is words that create a picture in the mind. A paradox seems to contradict itself yet holds truth. And tone is the attitude or mood of the writing.',
    }),
    sl('example', 'Worked example 1: a short interpretive answer', {
      b: '*Question:* Why is the poem called *A Photograph* and not the name of a person? Answer in 40-50 words.',
      v: vTitlePlan,
      bl: [
        '**Name the title\'s focus:** an object, not a person.',
        '**What the object does:** it links the three moments.',
        '**Link:** memory and the passage of time.',
        '**Conclude:** the poem is about how time works on a picture and on those who look at it.',
      ],
      n: 'Here is a short interpretive answer. The title points to an object, not a person. The object links the three moments of the poem, the girl on the beach, the mother laughing, and the poet grieving. That makes the poem about memory and the passage of time. So the title tells us that the poem is about how time works on a picture and on those who look at it.',
    }),
    sl('example', 'Worked example 2: answering a commentary set', {
      b: '*Commentary:* A short poem leaves little room for decoration, so each detail has to count.\n\n*Question:* What does the commentary suggest about the poem\'s brevity?',
      v: vCommentaryEx,
      bl: [
        '**Find the idea:** little room for decoration; each detail counts.',
        '**Answer:** the shortness of the poem makes every detail and every silence matter.',
      ],
      n: 'Here is another commentary set. Read the commentary and the question. The idea in the commentary is that a short poem leaves little room for decoration, so each detail counts. Your answer, in your own words: the shortness of the poem makes every detail, and every silence, matter. Notice that the answer comes from the commentary first.',
    }),
    sl('example', 'Worked example 3: planning a speech', {
      b: '*Task:* Write a short speech for your class on why old photographs matter.',
      v: vSpeechPlan,
      bl: [
        '**Greeting and hook:** a question about an old photograph.',
        '**Name the poem and idea:** one photograph, two responses.',
        '**Two points:** a picture keeps a moment; it changes meaning over time.',
        '**Call to the audience:** look after the pictures you have.',
      ],
      n: 'Plan a speech like this. Begin with a greeting and a hook, such as a question about an old photograph. Name the poem and its idea: one photograph, two responses. Give two points: a picture keeps a moment, and it changes meaning over time. End with a call to the audience, to look after the pictures they have, and say thank you.',
    }),
    sl('check', 'Check: true or false', {
      chk: 'tf_laugh',
      n: 'True or false. The poet imagines her mother laughing at the photograph in later years. Decide, and think about which stanza says this.',
    }),
    sl('check', 'Check: fill in the blank', {
      chk: 'fb_sea',
      n: 'Fill in the blank. The poem contrasts the lasting what with the passing lives of the people? Type your answer.',
    }),
    sl('concept', 'Extrapolation tasks: what to do', {
      bl: [
        'Stay faithful to the facts and the order of the three moments.',
        'Extend only in ways that suit the poem\'s quiet, restrained tone.',
        'Use the right format: diary, letter or speech.',
        'Do not add events that the poem does not suggest.',
      ],
      v: vExtrap,
      n: 'Extrapolation tasks ask you to go beyond the poem. Stay faithful to the facts and to the order of the three moments. Extend only in ways that suit the poem\'s quiet, restrained tone. Use the right format, whether a diary, a letter or a speech. And do not add events that the poem does not suggest.',
    }),
    sl('summary', 'Summary', {
      bl: [
        'Imagery: the girls at the water, the sea, the photograph, the silence.',
        'Contrast: lasting sea against changing people; laughter against sorrow.',
        'Paradox: one picture carries amusement and loss.',
        'Tone: light, reflective, quiet grief, silence; structure: three moments.',
        'Name a device by where it is and what it does; never quote.',
      ],
      v: vContrast,
      n: 'Let us sum up. Imagery: the girls at the water, the sea, the photograph and the silence. Contrast: the lasting sea against changing people, and laughter against sorrow. Paradox: one picture carries amusement and loss. The tone moves from light to quiet grief, and the structure has three moments. Name a device by where it is and what it does, and never quote.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Devices: say where it is, what it is, what it does.',
        'Short interpretive answers: point, stanza, explanation, within the limit.',
        'Diary, letter, speech: right format, first person, restrained feeling.',
        'Stay within the word limit; plan in one minute.',
        'Never copy lines from the poem.',
      ],
      n: 'Exam tips. For devices, say where it is, what it is and what it does. For short interpretive answers, give a point, the stanza and an explanation, within the limit. In a diary, letter or speech, use the right format and the first person, and keep the feeling restrained. Plan for one minute, and never copy lines from the poem.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'A Photograph: study notes',
  sections: [
    {
      h: '1. About the poem and the poet',
      t: 1,
      b: `${READ}\n\n*A Photograph* is a poem in *Hornbill* by **Shirley Toulson**, a British poet. It is a short poem in three stanzas. The speaker is the poet, looking back as a daughter at a photograph of her mother as a girl. The tone is light and plain at first and becomes quiet grief at the end.`,
      v: vText,
      terms: [['Stanza', 'A group of lines forming one section of a poem.'], ['Speaker', 'The voice that talks in a poem; here, the poet as a daughter.']],
    },
    {
      h: '2. Summary in SOYL\'s words, stanza by stanza',
      t: 1,
      b: '**Stanza 1.** The poem describes a small photograph mounted on card. It shows three girls on a seaside holiday. The future mother, about twelve, is the eldest, and her two cousins hold her hands. Their uncle took the picture.\n\n**Stanza 2.** The poem moves to time. The sea is as it was, while the people have grown up and changed. The poet imagines her mother, years later, looking at the photograph and laughing at how they looked and at the holiday.\n\n**Stanza 3.** The poet\'s present: her mother has been dead for about twelve years. The poet says she has no words for it. The photograph now brings her grief, and the poem closes in silence.',
      v: vThree,
      terms: [['Summary', 'A short account of the main points in your own words.'], ['Photograph', 'A picture that fixes a single moment.']],
    },
    {
      h: '3. The three moments in time',
      t: 1,
      b: 'The poem moves through three moments: the mother\'s **girlhood** on the beach; the mother\'s **later years**, when she looks at the photograph and laughs; and the **poet\'s present**, with the mother gone. Each stanza belongs to one moment.',
      v: vMoments,
      terms: [['Moment', 'A particular point in time that a stanza belongs to.'], ['Present', 'The time at which the poet speaks, when the mother is gone.']],
    },
    {
      h: '4. Themes and message',
      t: 2,
      b: '- **Memory and nostalgia:** a photograph carries a holiday into the present.\n- **The passage of time:** three moments, from girlhood to the poet\'s present.\n- **Nature and human change:** the sea stays as it was while the people change.\n- **Grief and loss:** the mother\'s death and the poet\'s silence.\n\n**Message:** time changes people and takes them from us, while some things go on unchanged; a picture can bring joy to one person and sorrow to another.',
      v: vThemes,
      terms: [['Nostalgia', 'A longing for a happy time in the past.'], ['Transience', 'The quality of lasting only a short time.']],
    },
    {
      h: '5. Two responses to one photograph',
      t: 2,
      b: 'The **mother**, in her later years, looks at the photograph and laughs at how they looked and at the holiday. The **poet**, after her mother\'s death, looks at the same photograph and meets it with sorrow. The picture is the same; the viewer and the time are different.',
      v: vIrony,
      terms: [['Response', 'How a person reacts to something.'], ['Paradox', 'A situation or statement that seems to contradict itself yet holds truth.']],
    },
    {
      h: '6. Imagery and contrast',
      t: 3,
      b: '**Imagery** is the picture the words create: here, three girls at the water, the unchanging sea, the photograph as a fixed object, and the closing silence.\n\n**Contrast** sets two things side by side: the lasting sea and the changing people; the mother\'s laughter and the poet\'s sorrow; girlhood and the present; the light first stanza and the quiet last.',
      vs: [vImagery, vContrast],
      terms: [['Imagery', 'Words that create a picture or sensation in the mind.'], ['Contrast', 'Placing two things side by side to show how they differ.']],
    },
    {
      h: '7. Tone, irony, silence and structure',
      t: 3,
      b: '**Tone** moves from light and plain, through reflective and gently amused, to quiet grief and silence. **Irony and paradox:** the same picture carries amusement and loss. **Silence:** the poet admits she has no words and the poem ends without a lesson. **Structure:** three stanzas follow three moments in time, so the form carries the theme of passing time.',
      vs: [vTone, vSilence],
      terms: [['Tone', 'The attitude or mood of the writing.'], ['Restraint', 'Holding back, so that feeling is shown rather than stated.']],
    },
    {
      h: '8. Answering exam questions',
      t: 4,
      b: '**Commentary sets (4 marks):** read the commentary, then each question; answer from the commentary first and from your knowledge of the poem where asked.\n\n**Short interpretive answers (2 and 3 marks; 40-50 words in school papers):** point, stanza, explanation, within the limit.\n\n**Long answers (about 100-120 words in school papers; SOYL 5-mark practice is 80-120):** a stand, two or three points tied to the stanzas in your own words, a link to a theme, and a conclusion. Diary entries, letters and speeches need the right format and a restrained tone.',
      v: vPlanLong,
      terms: [['Extrapolation', 'Going beyond the text in a way that fits its facts and tone.'], ['Commentary set', 'Questions on a short passage written about a text, not taken from it.']],
    },
  ],
  tips: '**Board weight:** Hornbill poetry extract (3 marks), short answers (2 and 3 marks) and long answers (6 marks) in Section C of the school annual paper (CBSE Class 11 English Core, 2026-27).\n\n**How marks are awarded:** content (relevant stanzas and details, accurately used), interpretation (a clear, supported view) and expression within the limit; for diaries, letters and speeches, format counts too.\n\n**Common mistakes:** quoting lines instead of explaining them; saying the poem is sad throughout (the first stanza is cheerful); mixing up the two twelves (the mother is about twelve in the picture, and has been dead about twelve years); naming a device without saying what it does; turning the closing silence into a long description of grief.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Who wrote *A Photograph*?', 'Shirley Toulson, a British poet.', 'fact', 1],
  ['What kind of text is *A Photograph*?', 'A short poem in three stanzas.', 'fact', 1],
  ['Who is the speaker?', 'The poet, looking back as a daughter.', 'fact', 1],
  ['Whose photograph is described?', 'The poet\'s mother as a girl.', 'fact', 1],
  ['Where was the photograph taken?', 'On a seaside holiday.', 'fact', 1],
  ['About how old is the mother in the picture?', 'About twelve.', 'fact', 1],
  ['Who is with the mother in the picture?', 'Her two girl cousins.', 'fact', 1],
  ['What do the cousins do?', 'They hold her hands.', 'fact', 1],
  ['Who took the photograph?', 'Their uncle.', 'fact', 1],
  ['What is the tone of the first stanza?', 'Plain and cheerful.', 'concept', 1],
  ['What does the second stanza set against each other?', 'The lasting sea and the changing people.', 'concept', 2],
  ['How does the poet imagine her mother reacting to the photograph in later years?', 'She laughs at how they looked and at the holiday.', 'fact', 2],
  ['How long has the mother been dead in the third stanza?', 'About twelve years.', 'fact', 3],
  ['What does the poet say about words in the last stanza?', 'She has none for her loss.', 'fact', 3],
  ['How does the poem end?', 'In silence.', 'fact', 3],
  ['What are the three moments of the poem?', 'The mother\'s girlhood, her later years, and the poet\'s present.', 'concept', 1],
  ['How do the stanzas match the three moments?', 'One moment for each stanza, in time order.', 'concept', 3],
  ['How does the tone move across the poem?', 'From light description, through reflection, to quiet grief and silence.', 'concept', 3],
  ['What is the central idea in one phrase?', 'One photograph, two responses.', 'concept', 2],
  ['How does the mother respond to the photograph?', 'With laughter, looking back on a past she has lived.', 'concept', 2],
  ['How does the poet respond to it?', 'With sorrow, because her mother has died.', 'concept', 2],
  ['Name two themes of the poem.', 'Memory and nostalgia; the passage of time (also nature against human change; grief and loss).', 'concept', 2],
  ['What does the sea stand for in the second stanza?', 'What lasts, against which human lives look brief.', 'concept', 3],
  ['What device sets the sea beside the people?', 'Contrast.', 'concept', 3],
  ['What is the paradox of laughter and loss?', 'The same picture holds amusement for one woman and sorrow for another.', 'concept', 3],
  ['What does the closing silence suggest?', 'A loss too large for words; the reader supplies the feeling.', 'concept', 3],
  ['*transience*', 'the quality of lasting only a short time', 'definition', 2],
  ['*nostalgia*', 'a longing for a happy time in the past', 'definition', 2],
  ['*imagery*', 'words that create a picture or sensation in the mind', 'definition', 3],
  ['How do you name a device in an answer?', 'Say where it is, what it is and what it does; do not quote.', 'exam-tip', 4],
  ['Plan for a long answer', 'Stand, points tied to stanzas in own words, link to theme, conclusion.', 'exam-tip', 4],
  ['Most common slip on the facts', 'Mixing up the two twelves: she is about twelve in the picture and has been dead about twelve years.', 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short): A Photograph',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Multiple-choice and assertion-reason questions.', items: ['m_death', 'm_flaw_laugh', 'm_cf_wept', 'ar_two'] },
    { id: 'B', title: 'Section B: Short answers (2 and 3 marks)', instr: 'About 30-50 words for 2-mark and 50-80 words for 3-mark answers.', items: ['s2_time', 's2_nodetail', 's3_silence'] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer any one of the two questions (80-120 words).', items: [{ attempt: 1, keys: ['l_diary', 'l_felt'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks)', instr: 'Read the commentary and answer all parts; one sub-part has an internal choice. (The passage is SOYL commentary; read the poem in Hornbill.)', items: ['c_three'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long): A Photograph',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Multiple-choice and assertion-reason questions.', items: ['m_subject', 'm_sea', 'm_silence', 'm_cf_remove2', 'm_remove_detail', 'm_compare_resp', 'm_cf_reverse', 'm_judge', 'ar_silence', 'ar_contrast'] },
    { id: 'B', title: 'Section B: Short answers (2 and 3 marks)', instr: 'Internal choice in one 2-mark and one 3-mark question.', items: ['s2_first', 's2_tone', { attempt: 1, keys: ['s2_laughfirst', 's2_escape'] }, 's3_second', { attempt: 1, keys: ['s3_responses', 's3_father'] }] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer the first question and any one of the next two.', items: ['l_letter', { attempt: 1, keys: ['l_agree', 'l_compare'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks each)', instr: 'Read each commentary and answer all parts. (Passages are SOYL commentary; read the poem in Hornbill.)', items: ['c_one', 'c_laugh'] },
  ],
});

build({
  dir: DIR,
  decks: [D1, D2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01-t04 only; no removed topics for 2026-27',
    literature_rule: 'no line, close paraphrase or distinctive phrase of the poem; summaries in SOYL words by stanza; passage items are SOYL commentary (passage_origin soyl-commentary); single words only for word meanings; textbook pointer on title slides, notes and every passage stem',
    originality: 'questions written for SOYL; NCERT exercise questions not reused',
    re_solve: 'writer pass: every item re-answered from its stem and checked against the poem facts',
    gate: 'content lint (lintExemplar) runs inside the build',
  },
});

// Reproduction guard (D-036): short distinctive phrases of the poem that must never appear in the chapter's files.
guard(DIR, [
  'cardboard shows',
  'cardboard shore',
  'terribly transient',
  'transient feet',
  'laugh at the snapshot',
  'the snapshot',
  'nothing to say',
  'of this circumstance',
  'silence silences',
  'the big girl',
  'laboured ease',
  'mine is her laughter',
  'Betty and Dolly',
  'uncle with the camera',
  'smile through their hair',
  'changed less',
]);
