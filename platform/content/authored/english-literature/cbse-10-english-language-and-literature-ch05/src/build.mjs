// Build CBSE 10 English Language and Literature ch05 "Nelson Mandela: Long Walk to Freedom". Run from platform/:
//   npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch05/src/build.mjs
// LITERATURE RULE: everything here is SOYL's own summary, analysis and commentary; the extract is never
// quoted or closely paraphrased. Students read the text in First Flight.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

setUnit('cbse-10-english-language-and-literature-ch05', 'english-literature');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const READ = '**Read the chapter itself in your textbook, *First Flight* (NCERT).** This lesson is SOYL\'s explanation and analysis; it does not reproduce the text.';

// ---------------------------------------------------------------- visuals
const vBoard = table(
  ['In the board paper', 'Question form', 'Marks'],
  [
    ['Reference to context', 'an extract with short questions (answer A or B)', '5'],
    ['Short answer (First Flight)', '40–50 words, any 4 of 5', '3 each'],
    ['Long answer', '100–120 words: character, theme, diary, letter or opinion', '6'],
  ],
  'Table of how a First Flight prose lesson is examined: a five-mark reference to context extract, three-mark short answers of forty to fifty words, and a six-mark long answer of one hundred to one hundred and twenty words.',
  'CBSE 2026-27, Section C (literature).',
);
const vAuthor = table(
  ['About the text', ''],
  [
    ['Author', 'Nelson Rolihlahla Mandela (1918–2013), lawyer, leader of the African National Congress, President of South Africa 1994–1999'],
    ['Source', 'his autobiography *Long Walk to Freedom* (1994)'],
    ['Imprisonment', 'about 27 years (1962–1990), most of them on Robben Island'],
    ['Honours', 'Nobel Peace Prize 1993, shared with F. W. de Klerk'],
    ['Genre', 'autobiography: first person, reflective, non-fiction'],
    ['Setting of the extract', 'the inauguration, 10 May 1994, Union Buildings, Pretoria; then Mandela\'s reflections on his life'],
  ],
  'Table of facts: the author is Nelson Mandela, 1918 to 2013, lawyer, ANC leader and President from 1994 to 1999; the extract comes from his 1994 autobiography; he was imprisoned for about 27 years, mostly on Robben Island; he shared the 1993 Nobel Peace Prize with F. W. de Klerk; the extract is set at his inauguration on 10 May 1994 in Pretoria.',
);
const vApartheid = table(
  ['Under apartheid', 'From 10 May 1994'],
  [
    ['Power held by a white minority', 'A government elected by all citizens'],
    ['Racial segregation by law', 'Equal rights regardless of colour'],
    ['South Africa isolated by much of the world', 'Leaders from more than 140 countries attend the inauguration'],
    ['Army and police enforce the system', 'Generals salute a Black President'],
    ['Mandela a prisoner', 'Mandela the President'],
  ],
  'Two-column table contrasting South Africa under apartheid, with white minority rule, segregation, isolation, and Mandela in prison, with South Africa from 10 May 1994, with an elected government, equal rights, world leaders attending, generals saluting a Black President, and Mandela as President.',
  'Background, in SOYL\'s words.',
);
const vStages = flow('LR', ['The inauguration', 'Flypast, salute and anthems', 'History and its heroes', 'Courage and human goodness', 'Two obligations', 'Freedom for all'], 'Flow of the chapter in six parts: the inauguration; the flypast, salute and anthems; history and its heroes; courage and human goodness; two obligations; freedom for all.', 'The chapter in six parts (SOYL summary).');
const vFreedom = flow('LR', ['Boy: free within family and custom', 'Student: freedoms for himself', 'Young man: work, income, family', 'His people\'s freedom', 'Freedom for the oppressor too'], 'Flow of how Mandela\'s idea of freedom grew: as a boy, free within family and custom; as a student, freedoms for himself; as a young man, the right to work, earn and have a family; then his people\'s freedom; finally freedom for the oppressor too.', 'How Mandela\'s idea of freedom grew (SOYL summary).');
const vThemes = table(
  ['Theme', 'Where we see it (SOYL summary)'],
  [
    ['Freedom', 'His idea grows from personal freedom to freedom for every South African.'],
    ['Courage', 'Comrades who felt fear yet kept going.'],
    ['Reconciliation', 'Generals salute him; each community sings the other\'s anthem.'],
    ['Faith in human goodness', 'Hatred is learnt; even some prison guards showed decency.'],
    ['Sacrifice and duty', 'Service to his people cost him his family life.'],
    ['Humility', 'He credits the thousands who suffered, not himself.'],
  ],
  'Table of six themes with where each appears: freedom, courage, reconciliation, faith in human goodness, sacrifice and duty, and humility.',
);
const vMandela = table(
  ['Trait', 'Evidence (in SOYL\'s words)'],
  [
    ['Humble', 'He gives the credit for the day to those who suffered and died.'],
    ['Forgiving', 'He refuses to hate and sees goodness even in some guards.'],
    ['Courageous', 'He accepts prison and danger to serve his people.'],
    ['Self-sacrificing', 'He gives up family life for the struggle.'],
    ['Far-sighted', 'He sees that the oppressor must be freed too.'],
    ['A unifier', 'He welcomes the exchange of anthems and a government for all.'],
  ],
  'Table of Mandela\'s traits with evidence: humble, forgiving, courageous, self-sacrificing, far-sighted, and a unifier.',
);
const vWords = table(
  ['Word', 'Meaning'],
  [
    ['inauguration', 'a formal ceremony to begin a term of office'],
    ['dignitaries', 'people holding high official positions'],
    ['apartheid', 'South Africa\'s system of racial segregation (literally, apartness)'],
    ['oppression', 'cruel and unjust use of power over people'],
    ['emancipation', 'freedom from legal, social or political restriction'],
    ['deprivation', 'lack of the basic things people need'],
    ['obligation', 'a duty one is bound to fulfil'],
    ['reconciliation', 'restoring friendly relations after conflict'],
    ['comrade', 'a companion who shares one\'s struggle'],
  ],
  'Table of word meanings: inauguration, dignitaries, apartheid, oppression, emancipation, deprivation, obligation, reconciliation and comrade.',
  'Key words for this chapter with their meanings.',
);
const vLongPlan = flow('LR', ['Take a clear stand', 'Idea or trait + evidence (own words)', 'Two or three such points', 'Link to a theme', 'One-line conclusion'], 'Flow for planning a six-mark long answer: take a stand, give points with evidence in your own words, link to a theme, and conclude.');

// ---------------------------------------------------------------- deck
const D = deck({
  title: 'Nelson Mandela: Long Walk to Freedom',
  goals: [
    'Retell the events of the inauguration day and the reflections that follow, in your own words',
    'Explain the significance of the inauguration and the end of apartheid',
    'Explain Mandela\'s ideas of freedom, courage and the two obligations of a person',
    'Describe Mandela\'s character with evidence from the chapter',
    'Answer extract-based, short and long questions within the word limits',
  ],
  slides: [
    sl('title', 'Nelson Mandela: Long Walk to Freedom', {
      b: `*First Flight*, prose · autobiography (extract) · Class 10 CBSE English.\n\n${READ}`,
      v: vBoard,
      n: 'Welcome. Today we study an extract from the autobiography of Nelson Mandela, the first Black President of South Africa. Before anything else, please read the chapter itself in your textbook, First Flight. This lesson does not repeat the text. Instead we will understand it: the events of a historic day, the ideas behind them, Mandela as a person, and how to answer board questions.',
    }),
    sl('concept', 'How to use this lesson', {
      bl: [
        'Read the chapter once in *First Flight*, straight through.',
        'Then use these slides for the events, ideas, themes and Mandela\'s character.',
        'In answers, explain events and ideas **in your own words**; do not memorise lines.',
        'Practise the extract questions, which use SOYL commentary on the chapter.',
      ],
      n: 'Here is how to study this chapter. First read it in your textbook, once, straight through. Then use these slides to understand its structure and its big ideas. In your answers, explain events and ideas in your own words, because examiners reward understanding, not memorised lines. Finally, practise with our extract questions and short answers.',
    }),
    sl('concept', 'The author and the text', {
      v: vAuthor,
      n: 'Nelson Mandela lived from nineteen eighteen to twenty thirteen. He was a lawyer and a leader of the African National Congress, and he spent about twenty-seven years in prison for fighting apartheid. He shared the Nobel Peace Prize in nineteen ninety-three and became President the next year. Our chapter comes from his autobiography, Long Walk to Freedom, so it is told in the first person.',
    }),
    sl('concept', 'Background: what apartheid was', {
      b: 'Apartheid was South Africa\'s system of racial segregation and white minority rule. It became official policy in 1948, but racial domination by law was older, going back to the early twentieth century. The first election open to all races was held in April 1994.',
      v: vApartheid,
      n: 'To understand the chapter, you need the background. Apartheid means apartness. It was a system that separated people by race and kept power with a white minority. It became official in nineteen forty-eight, though racial domination by law was older. In April nineteen ninety-four, all South Africans voted for the first time. A few weeks later came the day our chapter describes.',
    }),
    sl('diagram', 'The chapter in six parts', {
      b: 'The first half describes a day; the second half reflects on a life. (A SOYL summary, not the text.)',
      v: vStages,
      n: 'The chapter has two halves. The first half describes one day: the inauguration, the flypast, the salute and the anthems. The second half reflects on a whole life: the history of injustice and its heroes, courage and human goodness, the two obligations every person has, and how Mandela\'s idea of freedom grew. Keep these six parts in mind as a map.',
    }),
    sl('concept', 'Summary 1: the inauguration', {
      b: 'On 10 May 1994, leaders and dignitaries from more than 140 countries gather at the Union Buildings in Pretoria. Mr de Klerk is sworn in as second deputy president, then Thabo Mbeki as first deputy president, and then Mandela as President. In his address, Mandela describes the end of apartheid as a victory shared by everyone and promises a nation of justice and dignity for all.',
      n: 'The chapter opens on the tenth of May, nineteen ninety-four. Guests from more than a hundred and forty countries gather in Pretoria. First Mr de Klerk takes the oath as second deputy president, then Thabo Mbeki as first deputy president, and then Mandela as President. In his speech, Mandela calls the end of apartheid a shared victory and promises justice and dignity for every citizen.',
    }),
    sl('concept', 'Summary 2: the flypast, the salute and the anthems', {
      b: 'Military aircraft, including jets, helicopters and troop carriers, fly over the Union Buildings: a sign that the armed forces accept the new democratic government. The heads of the defence force and police salute Mandela, though a few years earlier they would have arrested him. Two anthems are sung: white South Africans sing *Nkosi Sikelel\' iAfrika* and black South Africans sing *Die Stem*.',
      n: 'Next come two powerful symbols. Military aircraft fly overhead, showing that the armed forces now serve a government chosen by everyone. The top generals salute Mandela, though not long ago they would have arrested him. Then two anthems are sung, and each community sings the anthem that used to belong to the other. These moments show reconciliation better than any speech.',
    }),
    sl('concept', 'Summary 3: looking back at history and its heroes', {
      b: 'Mandela recalls that racial domination was built early in the twentieth century, after the Anglo-Boer War, and lasted for most of it. The day was paid for by thousands who suffered and died, and he grieves that they are absent. Apartheid did lasting harm, but it also produced people of rare courage, such as Oliver Tambo, Walter Sisulu, Chief Luthuli, Yusuf Dadoo, Bram Fischer and Robert Sobukwe.',
      n: 'Mandela then looks back. Racial domination began early in the twentieth century, after the Anglo-Boer War, and lasted for most of that century. He insists the victory belongs to the thousands who suffered and died, and he grieves that they cannot share it. Apartheid hurt the nation deeply, yet it also produced remarkable people, like Oliver Tambo and Walter Sisulu, from whom he learnt about courage.',
    }),
    sl('check', 'Check: the order of the ceremony', {
      chk: 'ord_ceremony',
      n: 'Your turn. Five events from the inauguration day are shuffled. Put them in the order in which the chapter presents them. Think carefully about who took the oath first.',
    }),
    sl('concept', 'Summary 4: courage, goodness and two obligations', {
      b: 'From his comrades Mandela learnt that brave people still feel fear; what matters is overcoming it. He believes hatred is learnt, so love can be taught, and even in prison some guards showed him decency. Every person, he says, owes a duty to family and a duty to people and nation. Under apartheid, serving his people cut him off from his family.',
      n: 'The reflections continue. Courage, Mandela learnt, does not mean feeling no fear; it means overcoming it. Hatred is learnt, so love can be taught, and he saw small kindnesses even from prison guards. Then he explains that every person has two duties, to family and to the nation. Apartheid made it impossible to do both, so serving his people cost him his family life.',
    }),
    sl('diagram', 'Summary 5: how his idea of freedom grew', {
      b: 'Mandela\'s idea of freedom widened at every stage of his life, until it included even those who had oppressed him.',
      v: vFreedom,
      n: 'Finally, Mandela traces his idea of freedom. As a boy he felt free, as long as he respected his father and his community. As a student he wanted freedoms for himself. As a young man he wanted to work, earn and raise a family. Then he saw that his people were not free, and that became his cause. At the end, he sees that the oppressor must be freed too.',
    }),
    sl('two-column', 'Theme 1: what freedom means', {
      b: 'Freedom in this chapter is not one thing; it grows.',
      cols: [
        '**Freedom for oneself**\n\n- a boy\'s carefree life\n- a student\'s personal choices\n- an adult\'s right to work and raise a family',
        '**Freedom for all**\n\n- his people\'s freedom becomes his cause\n- he joins the African National Congress\n- even the oppressor must be freed from hatred',
      ],
      n: 'The central theme is freedom, and it grows. At first, freedom is personal: a boy\'s carefree life, a student\'s choices, an adult\'s right to a career and family. Then it becomes shared: the freedom of his whole people, which leads him to join the African National Congress. Finally, it includes even the oppressor. In answers, show this growth, not just one stage.',
    }),
    sl('concept', 'A web of themes', {
      v: vThemes,
      n: 'Around freedom sit other themes. Courage, in comrades who were afraid yet kept going. Reconciliation, in the salute and the exchange of anthems. Faith in human goodness, because hatred is learnt. Sacrifice and duty, because his service cost him his family life. And humility, because he credits others for the victory. In long answers, connect two or three themes to show depth.',
    }),
    sl('check', 'Check: courage in everyday life', {
      chk: 'mc_apply_courage',
      n: 'Check yourself. Four students are described. Which one shows courage in exactly Mandela\'s sense? Remember what he learnt from his comrades.',
    }),
    sl('two-column', 'Theme 2: courage', {
      b: 'Mandela\'s idea of courage makes bravery possible for ordinary people.',
      cols: [
        '**Not courage**\n\n- never feeling afraid\n- ignoring danger without thinking\n- avoiding fear by avoiding the task',
        '**Courage**\n\n- feeling afraid and acting rightly anyway\n- choosing duty over comfort\n- holding on to hope in hard times',
      ],
      n: 'Mandela\'s idea of courage is worth understanding clearly. Many people think a brave person feels no fear, or rushes into danger without thinking. Mandela disagrees. His comrades were often afraid, yet they kept doing what was right. So bravery lies in what you do while you are afraid. That makes courage a choice open to everyone, including students facing exams or standing up to bullies.',
    }),
    sl('concept', 'Mandela the man', {
      b: 'Every trait in an answer needs evidence, described in your own words.',
      v: vMandela,
      n: 'Let us sketch Mandela as he appears here. He is humble, giving credit to those who suffered. He is forgiving, refusing to hate and seeing goodness even in some guards. He is courageous and self-sacrificing, giving up family life for the struggle. He is far-sighted, seeing that the oppressor must be freed too. And he is a unifier. Back every trait with evidence.',
    }),
    sl('two-column', 'Family or nation?', {
      cols: [
        '**He was right to choose his people**\n\n- apartheid gave him no fair choice\n- millions, his own children among them, were unfree\n- his sacrifice won freedom for all',
        '**The cost was real**\n\n- his parents, wife and children lost him for decades\n- he could not fulfil his duty as a son, husband and father\n- the fault lies with the system, not with him',
      ],
      n: 'A common exam question asks whether Mandela was right to put his people before his family. One side says yes, because apartheid gave him no fair choice, and his struggle freed millions, including his own children. The other side points to the real cost: his family lost him for decades. The best answers take a clear stand and still acknowledge the other side.',
    }),
    sl('check', 'Check: freedom as a boy', {
      chk: 'ar_free_boy',
      n: 'Try this assertion and reason item. Read both statements carefully. Decide whether each is true, and then whether the reason really explains the assertion.',
    }),
    sl('concept', 'Style and language', {
      bl: [
        '**Autobiography:** first person, so we see events and ideas through Mandela\'s eyes.',
        '**Reflective tone:** dignified and thoughtful, never bitter or revengeful.',
        '**Contrast:** past and present (prisoner and President; generals who would have arrested him now saluting).',
        '**Metaphor:** freedom described as a long journey, and as something that can be held captive.',
        '**Balanced, speech-like sentences** suited to a statesman.',
      ],
      n: 'How does Mandela write? It is an autobiography, so it is in the first person. The tone is reflective and dignified, never bitter. He uses contrast between past and present, such as prisoner and President. He uses metaphors, for example freedom as a long journey, which also gives the book its title. And his balanced sentences sound like a speech, which suits a statesman.',
    }),
    sl('example', 'Spotting contrast and metaphor: SOYL\'s own examples', {
      b: 'A **contrast** sets opposites side by side; a **metaphor** says one thing *is* another. These sentences are SOYL\'s own, to practise the devices:',
      bl: [
        '*Yesterday the gate kept us out; today it opens to welcome us.* — contrast',
        '*Her patience was a bridge between the two angry families.* — metaphor',
        '*The boy who once swept the hall now stood on its stage.* — contrast',
      ],
      n: 'Here are three sentences of our own to practise. Yesterday the gate kept us out; today it opens to welcome us. That is a contrast between past and present. Her patience was a bridge between two angry families. That is a metaphor. The boy who once swept the hall now stood on its stage. Another contrast. Now find Mandela\'s own contrasts in your textbook.',
    }),
    sl('concept', 'Word meanings', {
      v: vWords,
      n: 'These words matter for this chapter. An inauguration is a ceremony that begins a term of office. Dignitaries are people of high rank. Apartheid literally means apartness. Oppression is the cruel use of power. Emancipation means being set free. Deprivation is the lack of basic needs. An obligation is a duty. Reconciliation means making peace after conflict. And a comrade shares your struggle.',
    }),
    sl('example', 'Worked example: planning a 6-mark answer', {
      b: '*Question:* *Mandela was a humble and forgiving leader.* Do you agree?',
      v: vLongPlan,
      bl: [
        '**Stand:** agree.',
        '**Points + evidence:** credits those who suffered, not himself; refuses to hate and sees goodness in some guards; wants the oppressor freed too.',
        '**Link:** his humility and forgiveness made reconciliation possible.',
        '**Conclusion:** his greatness lay in generosity, not power.',
      ],
      n: 'Here is how to plan a six mark answer. Take a clear stand: agree. Give three points with evidence in your own words: he credits those who suffered, he refuses to hate, and he wants the oppressor freed too. Link this to the theme of reconciliation. End with a one-line conclusion. That plan becomes an answer of about one hundred and ten words.',
    }),
    sl('summary', 'Summary', {
      bl: [
        '10 May 1994: oaths (de Klerk, Mbeki, Mandela), guests from 140+ countries, flypast, salute, exchanged anthems.',
        'History: racial domination from the early 1900s; victory paid for by thousands; apartheid also produced heroes.',
        'Ideas: courage is overcoming fear; hatred is learnt; two obligations; freedom grows until it includes the oppressor.',
        'Mandela: humble, forgiving, courageous, self-sacrificing, far-sighted, a unifier.',
        'Read the chapter in *First Flight*; write about it in your own words.',
      ],
      v: vStages,
      n: 'Let us sum up. On the tenth of May, nineteen ninety-four, Mandela became President before guests from over a hundred and forty countries, with a flypast, a salute and exchanged anthems. He then reflects on history, courage, human goodness, two obligations and the growth of freedom. He emerges as humble and forgiving. Remember: read the chapter in your textbook, and write in your own words.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Extract questions: answer from the passage first; quote at most a word or two.',
        '3-mark answers (40–50 words): point + evidence + explanation.',
        '6-mark answers (100–120 words): stand → 3 points with evidence → link to theme → conclusion.',
        'Facts often confused: de Klerk second deputy, Mbeki first deputy; whites sang *Nkosi Sikelel\' iAfrika*, blacks sang *Die Stem*.',
        'Explain ideas (courage, obligations, freedom) in your own words; do not reproduce the text.',
      ],
      n: 'Exam tips. In extract questions, answer from the passage first. In three mark answers, give a point, evidence and a short explanation. In six mark answers, take a stand and support it with three points. Get the facts right: de Klerk was second deputy and Mbeki first deputy, and each community sang the other\'s anthem. And always explain the ideas in your own words.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Nelson Mandela: Long Walk to Freedom — study notes',
  sections: [
    {
      h: '1. About the text and the author',
      t: 1,
      b: `${READ}\n\nThe chapter is an extract from **Nelson Mandela\'s** autobiography *Long Walk to Freedom* (1994). Mandela (1918–2013) was a lawyer and a leader of the African National Congress (ANC). He was imprisoned for about 27 years (1962–1990), most of them on Robben Island, shared the 1993 Nobel Peace Prize with F. W. de Klerk, and served as President of South Africa from 1994 to 1999. Because it is an autobiography, the chapter is written in the first person.`,
      v: vAuthor,
      terms: [['Autobiography', 'The story of a person\'s life written by that person.']],
    },
    {
      h: '2. Background: apartheid',
      t: 1,
      b: '**Apartheid** (literally *apartness*) was South Africa\'s system of racial segregation and white minority rule. It became official policy in 1948, but racial domination by law went back to the early twentieth century. Non-white South Africans were denied equal rights, and the country was isolated by much of the world. The first election open to all races was held in April 1994; the inauguration described in the chapter followed on 10 May 1994.',
      v: vApartheid,
      terms: [['Apartheid', 'South Africa\'s system of racial segregation and discrimination (official from 1948 until the early 1990s).']],
    },
    {
      h: '3. Summary (in SOYL\'s words)',
      t: 1,
      b: '**The inauguration.** On 10 May 1994, leaders from more than 140 countries gather at the Union Buildings in Pretoria. Mr de Klerk is sworn in as second deputy president, Thabo Mbeki as first deputy president, and then Mandela as President. Mandela calls the end of apartheid a victory shared by everyone and promises justice and dignity for all.\n\n**Symbols of change.** Military aircraft fly overhead; the heads of the defence force and police salute Mandela, though they once would have arrested him. White South Africans sing *Nkosi Sikelel\' iAfrika* and black South Africans sing *Die Stem*.\n\n**History and heroes.** Racial domination began early in the twentieth century, after the Anglo-Boer War. The victory was paid for by thousands who suffered and died. Apartheid caused lasting harm but also produced people of rare courage (Tambo, Sisulu, Luthuli, Dadoo, Fischer, Sobukwe).\n\n**Reflections.** Courage means overcoming fear. Hatred is learnt, so love can be taught; even some prison guards showed decency. Every person has a duty to family and a duty to nation; apartheid made it impossible to fulfil both. Mandela\'s idea of freedom grew from personal freedom to freedom for his people, and finally to freedom for the oppressor as well.',
      v: vStages,
    },
    {
      h: '4. Themes and message',
      t: 2,
      b: '- **Freedom:** grows from a personal wish to a shared cause; true freedom includes the oppressor.\n- **Courage:** overcoming fear, not lacking it; learnt from comrades.\n- **Reconciliation:** the salute of the generals and the exchange of anthems.\n- **Faith in human goodness:** hatred is learnt; love comes more easily to people.\n- **Sacrifice and duty:** the two obligations; service to the nation cost Mandela his family life.\n- **Humility:** the victory belongs to those who suffered.\n\n**Message:** freedom is complete only when it is shared by all, and it is won by courage, sacrifice and the refusal to hate.',
      v: vThemes,
      terms: [
        ['Reconciliation', 'Restoring friendly relations between groups after conflict.'],
        ['Two obligations', 'Mandela\'s idea that every person owes a duty to family and a duty to people and nation.'],
      ],
    },
    {
      h: '5. Mandela as he appears in the chapter',
      t: 2,
      b: '**Humble:** credits the thousands who sacrificed. **Forgiving:** refuses to hate; sees decency in some guards. **Courageous:** accepts prison and danger for his people. **Self-sacrificing:** gives up family life. **Far-sighted:** sees that the oppressor must be freed too. **A unifier:** welcomes a government and anthems shared by all.\n\nIn answers, give each trait with evidence in your own words.',
      v: vMandela,
    },
    {
      h: '6. Style, language and word meanings',
      t: 1,
      b: '- **First-person autobiography:** events and ideas through Mandela\'s eyes.\n- **Reflective, dignified tone:** never bitter or revengeful.\n- **Contrast** between past and present (prisoner and President).\n- **Metaphor:** freedom as a long journey (the title).\n- **Balanced, speech-like sentences.**\n\nSOYL practice sentences (not from the chapter): *Yesterday the gate kept us out; today it opens to welcome us* (contrast); *Her patience was a bridge between the two angry families* (metaphor).',
      v: vWords,
      terms: [
        ['Contrast', 'Placing opposite ideas or situations side by side for effect.'],
        ['Metaphor', 'A comparison that says one thing is another.'],
      ],
    },
    {
      h: '7. Answering exam questions',
      t: 3,
      b: '**Extract-based (5 marks):** the board prints a passage from the chapter; SOYL practice uses commentary passages instead. Answer from the passage, then from your knowledge of the chapter.\n\n**Short answers (3 marks, 40–50 words):** point + evidence + explanation.\n\n**Long answers (6 marks, 100–120 words):** a clear stand; three points with evidence in your own words; a link to a theme; a one-line conclusion. Extrapolation tasks (a diary entry by someone at the inauguration, a letter about Mandela\'s ideas) must stay consistent with the chapter.\n\nPractise with the real textbook passages from *First Flight*.',
      v: vLongPlan,
    },
  ],
  tips: '**Board weight:** reference-to-context extract (5), short answers (3 marks, 40–50 words) and long answers (6 marks, 100–120 words) from *First Flight* (CBSE 2026-27, Section C).\n\n**How marks are awarded:** content (relevant events and ideas, accurately used), interpretation (a clear, supported view), and expression within the word limit.\n\n**Common mistakes**\n1. Mixing up the deputies: de Klerk was *second* deputy president, Mbeki *first*.\n2. Mixing up the anthems: whites sang *Nkosi Sikelel\' iAfrika*; blacks sang *Die Stem*.\n3. Saying Mandela took the oath first: the deputies were sworn in before him.\n4. Describing courage as never feeling fear.\n5. Quoting long lines from memory instead of explaining in your own words.\n\n**Remember:** read the chapter in your textbook, *First Flight*.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['From which book is this chapter taken?', 'Nelson Mandela\'s autobiography *Long Walk to Freedom* (1994).', 'fact', 1],
  ['When and where was Mandela sworn in as President?', '10 May 1994, at the Union Buildings in Pretoria.', 'fact', 1],
  ['Who was sworn in as second deputy president?', 'Mr F. W. de Klerk.', 'fact', 1],
  ['Who was sworn in as first deputy president?', 'Thabo Mbeki.', 'fact', 1],
  ['In what order were the oaths taken?', 'De Klerk, then Mbeki, then Mandela.', 'fact', 1],
  ['Guests from how many countries attended?', 'More than 140.', 'fact', 1],
  ['What did the flypast of military aircraft show?', 'The armed forces\' loyalty to the new democratic government.', 'concept', 2],
  ['Why is the generals\' salute significant?', 'A few years earlier the same officers would have arrested Mandela.', 'concept', 2],
  ['Which anthem did white South Africans sing?', '*Nkosi Sikelel\' iAfrika*.', 'fact', 1],
  ['Which anthem did black South Africans sing?', '*Die Stem*, the old anthem of the Republic.', 'fact', 1],
  ['What did the exchange of anthems symbolise?', 'Respect and reconciliation between communities.', 'concept', 2],
  ['When was racial domination first built in South Africa?', 'Early in the twentieth century, after the Anglo-Boer War.', 'fact', 1],
  ['What is apartheid?', 'South Africa\'s system of racial segregation and white minority rule (official from 1948).', 'definition', 1],
  ['Name three heroes Mandela mentions', 'Any three: Oliver Tambo, Walter Sisulu, Chief Luthuli, Yusuf Dadoo, Bram Fischer, Robert Sobukwe.', 'fact', 2],
  ['What is courage, for Mandela?', 'Overcoming fear, not never feeling it.', 'concept', 2],
  ['Why does Mandela believe love can be taught?', 'Because hatred is learnt, and love comes more naturally to people.', 'concept', 2],
  ['Where did Mandela see goodness in his opponents?', 'In small acts of decency by some prison guards.', 'fact', 2],
  ['What are the two obligations?', 'A duty to family and a duty to people and nation.', 'concept', 2],
  ['Why could Mandela not fulfil both obligations?', 'Under apartheid, serving his people meant punishment and separation from his family.', 'concept', 2],
  ['Stages of Mandela\'s idea of freedom', 'Boy → student → young man → his people → freedom for the oppressor too.', 'concept', 2],
  ['Which organisation did Mandela join?', 'The African National Congress (ANC).', 'fact', 1],
  ['Why must the oppressor be freed too?', 'Hatred and prejudice keep him from being fully free and human.', 'concept', 2],
  ['What saddens Mandela on his day of triumph?', 'Those who sacrificed most are not alive to share it.', 'concept', 1],
  ['Five traits of Mandela', 'Humble, forgiving, courageous, self-sacrificing, far-sighted.', 'concept', 2],
  ['Tone of the chapter', 'Reflective and dignified; never bitter.', 'concept', 1],
  ['*inauguration*', 'a formal ceremony to begin a term of office', 'definition', 1],
  ['*emancipation*', 'freedom from legal, social or political restriction', 'definition', 1],
  ['*obligation*', 'a duty one is bound to fulfil', 'definition', 1],
  ['Plan for a 6-mark answer', 'Stand → three points with evidence → link to theme → conclusion (100–120 words).', 'exam-tip', 3],
  ['Most common factual slip', 'Swapping the deputies (de Klerk second, Mbeki first) or the anthems.', 'exam-tip', 3],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-short',
  title: 'Chapter test (short) — Nelson Mandela: Long Walk to Freedom',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Extract-based (5 marks)', instr: 'Read the commentary and answer all parts. (The passage is SOYL commentary; read the chapter in First Flight.)', items: ['src_ceremony'] },
    { id: 'B', title: 'Section B — Short answers (3 marks each)', instr: 'Answer any three of four in 40–50 words.', items: [{ attempt: 3, keys: ['sa_anthems', 'sa_courage', 'sa_duties', 'sa_grief'] }] },
    { id: 'C', title: 'Section C — Long answer (6 marks)', instr: 'Answer any one in 100–120 words.', items: [{ attempt: 1, keys: ['la_character', 'la_inauguration'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-long',
  title: 'Chapter test (long) — Nelson Mandela: Long Walk to Freedom',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Extract-based (2 × 5 marks)', instr: 'In each pair, answer one passage. (Passages are SOYL commentary.)', items: [{ attempt: 1, keys: ['src_display', 'src_history'] }, { attempt: 1, keys: ['src_love', 'src_freedom'] }] },
    { id: 'B', title: 'Section B — Short answers (2 marks each)', instr: 'Answer any three of four in 30–40 words.', items: [{ attempt: 3, keys: ['sb_when_where', 'sb_deputies', 'sb_apartheid', 'sb_guards'] }] },
    { id: 'C', title: 'Section C — Short answers (3 marks each)', instr: 'Answer any four of five in 40–50 words.', items: [{ attempt: 4, keys: ['sa_generals', 'sa_guests', 'sa_lasting_harm', 'sa_join_struggle', 'sa_oppressor'] }] },
    { id: 'D', title: 'Section D — Long answers (6 marks each)', instr: 'Answer one question from each pair in 100–120 words.', items: [{ attempt: 1, keys: ['la_freedom', 'la_duties'] }, { attempt: 1, keys: ['la_diary', 'la_courage'] }] },
  ],
});

build({
  dir: DIR,
  decks: [D],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 only; no removed topics for 2026-27',
    literature_rule: 'no sentence, close paraphrase or distinctive phrase of the extract; summaries in SOYL words; extract items use SOYL commentary passages (passage_origin soyl-commentary); single words only for word meanings; textbook pointer on the title slide, notes and every passage stem',
    originality: 'questions written for SOYL; NCERT exercise questions not reused (stems reframed where a classic question exists)',
    re_solve: 'author verifier pass: every item re-answered from its stem and checked against the chapter and the historical record',
    gate: 'npm test -w @soyl/content-templates and content lint (lintExemplar) run clean on this chapter',
  },
});
