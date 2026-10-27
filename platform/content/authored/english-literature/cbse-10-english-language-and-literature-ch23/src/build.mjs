// Build CBSE 10 English Language and Literature ch23 "A Triumph of Surgery" (James Herriot). Run from platform/:
//   npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch23/src/build.mjs
// LITERATURE RULE: everything here is SOYL's own summary, analysis and commentary; the story is never
// quoted or closely paraphrased, and its dialogue is only reported. Students read it in Footprints without Feet.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';
import { guard } from './guard.mjs';

setUnit('cbse-10-english-language-and-literature-ch23', 'english-literature');
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
  'Table of how a Footprints without Feet story is examined: three-mark short answers of forty to fifty words, with two of three to be answered, and a six-mark long answer of one hundred to one hundred and twenty words on character, theme, values, or a diary or letter. Extracts are not set from this reader.',
  'CBSE 2026-27, Section C (literature), questions on the supplementary reader.',
);
const vAuthor = table(
  ['About the text', ''],
  [
    ['Author', 'James Herriot, pen name of James Alfred Wight (1916–1995), a British vet and writer'],
    ['Source', 'his humorous memoirs of life as a country vet in Yorkshire, England'],
    ['Genre', 'a light-hearted story told in the first person by the vet himself'],
    ['Setting', 'a country town in Yorkshire: Mrs Pumphrey’s home and the vet’s surgery'],
    ['Main characters', 'Mrs Pumphrey, a wealthy, doting owner; Tricki, her Pekinese; the narrator, a vet'],
  ],
  'Table of facts: the author is James Herriot, pen name of James Alfred Wight, 1916 to 1995, a British vet; the story comes from his humorous memoirs of country practice in Yorkshire; it is told in the first person by the vet; the main characters are Mrs Pumphrey, her Pekinese Tricki and the narrator.',
);
const vStages = flow('LR', ['A shock in the street', 'Advice ignored', 'Tricki falls ill', 'Off to the surgery', 'Recovery among dogs', 'A triumph of surgery?'], 'Flow of the story in six stages: a shock in the street; advice ignored; Tricki falls ill; off to the surgery; recovery among other dogs; and the ironic triumph of surgery.', 'The story in six stages (SOYL summary).');
const vThemes = table(
  ['Theme', 'Where we see it (SOYL summary)'],
  [
    ['Pampering is not real care', 'Sweets and tonics make Tricki ill.'],
    ['Common sense heals', 'Plain food, exercise and company cure him; no medicine is used.'],
    ['Professional responsibility', 'The vet acts firmly for his patient’s good.'],
    ['Tact and kindness', 'He never humiliates the owner.'],
    ['Humour and irony', 'The luggage, the gifts and the title.'],
    ['Wealth without wisdom', 'Money buys luxuries, not health.'],
  ],
  'Table of six themes with where each appears: pampering is not real care, common sense heals, professional responsibility, tact and kindness, humour and irony, and wealth without wisdom.',
);
const vPumphrey = table(
  ['Mrs Pumphrey’s trait', 'Evidence (in SOYL’s words)'],
  [
    ['Loving but indulgent', 'Cannot refuse Tricki’s begging for treats.'],
    ['Ill-informed', 'Thinks an overweight dog is underfed and adds tonics.'],
    ['Emotional', 'Is distraught when Tricki is taken away.'],
    ['Generous', 'Sends eggs and wine to the surgery.'],
    ['Grateful but unaware', 'Thanks the vet warmly for a surgery that never happened.'],
  ],
  'Table of Mrs Pumphrey’s traits with evidence: loving but indulgent, ill-informed, emotional, generous, and grateful but unaware of the real cure.',
);
const vVet = table(
  ['The vet’s trait', 'Evidence (in SOYL’s words)'],
  [
    ['Observant', 'Sees the danger the moment he meets Tricki.'],
    ['Tactful', 'Advises gently; never blames Mrs Pumphrey.'],
    ['Firm', 'Takes the dog away when advice fails.'],
    ['Knowledgeable', 'Cures him with diet, exercise and company.'],
    ['Honest and humorous', 'Owns up to enjoying the gifts.'],
  ],
  'Table of the vet’s traits with evidence: observant, tactful, firm, knowledgeable, and honest and humorous.',
);
const vWords = table(
  ['Word', 'Meaning'],
  [
    ['indulgent', 'giving in to every wish'],
    ['pamper', 'to spoil with too much comfort'],
    ['lethargic', 'sluggish, without energy'],
    ['malnutrition', 'poor health from too little or the wrong food'],
    ['tonic', 'a medicine or drink meant to strengthen'],
    ['convalescence', 'the period of getting well'],
    ['surgery', 'an operation; also a doctor’s or vet’s place of work'],
    ['irony', 'a gap between what seems and what is'],
  ],
  'Table of word meanings: indulgent, pamper, lethargic, malnutrition, tonic, convalescence, surgery with its two meanings, and irony.',
  'Key words for this story with their meanings.',
);
const vLongPlan = flow('LR', ['Take a clear stand', 'Point + evidence (own words)', 'Two or three such points', 'Link to a value or theme', 'One-line conclusion'], 'Flow for planning a six-mark long answer: take a stand, give points with evidence in your own words, link to a value or theme, and conclude.');

// ---------------------------------------------------------------- deck
const D = deck({
  title: 'A Triumph of Surgery',
  goals: [
    'Retell the story of Tricki’s illness and cure in your own words',
    'Explain how pampering harms Tricki and how the vet cures him',
    'Compare Mrs Pumphrey and the narrator with evidence',
    'Explain the irony of the title',
    'Write 3-mark and 6-mark answers on character, theme and values within the word limits',
  ],
  slides: [
    sl('title', 'A Triumph of Surgery — James Herriot', {
      b: `*Footprints without Feet* (supplementary reader) · Class 10 CBSE English.\n\n${READ}`,
      v: vBoard,
      n: 'Welcome. Today we study A Triumph of Surgery, a humorous story by the vet and writer James Herriot about a pampered little dog. Please read the story in your textbook, Footprints without Feet, before you go on. This lesson does not repeat the text. In the board exam, this reader is tested through short answers and long answers, so that is where we will focus.',
    }),
    sl('concept', 'How to use this lesson', {
      bl: [
        'Read the story once in *Footprints without Feet*.',
        'Use these slides for the sequence of events, the themes and the characters.',
        'The board asks 3-mark and 6-mark questions on this reader, not extracts: practise those most.',
        'Explain events **in your own words**; do not memorise lines.',
      ],
      n: 'Here is how to use this lesson. Read the story first in your textbook. Then use these slides for the order of events, the themes and the characters. Remember that the board does not print extracts from this reader. It asks three mark and six mark questions on character, theme and values, so practise writing those answers in your own words.',
    }),
    sl('concept', 'The author and the text', {
      v: vAuthor,
      n: 'James Herriot was the pen name of James Alfred Wight, a British vet who lived from nineteen sixteen to nineteen ninety-five. He wrote warm, funny memoirs about life as a country vet in Yorkshire. This story is told in the first person by the vet himself, so we see Mrs Pumphrey and her dog through the eyes of a sensible, amused professional.',
    }),
    sl('diagram', 'The story in six stages', {
      b: 'From a shocking sight in the street to an ironic thank-you. (A SOYL summary, not the text.)',
      v: vStages,
      n: 'The story moves through six stages. The vet is shocked by Tricki in the street. His advice is ignored. Tricki falls seriously ill. The vet takes him to the surgery. There, Tricki recovers among other dogs. And finally his owner thanks the vet for what she calls a triumph of surgery. Keep this map in mind as we go through each stage.',
    }),
    sl('concept', 'Summary 1: a shock in the street', {
      b: 'The vet meets Mrs Pumphrey walking her Pekinese, Tricki, and is alarmed: the dog is badly overweight, sluggish and clearly unwell. Mrs Pumphrey thinks he is merely tired and underfed, so she has been giving him malt, cod-liver oil and Horlicks on top of cakes and sweets. The vet advises less food and more exercise.',
      n: 'The story opens in the street. The vet meets Mrs Pumphrey and her Pekinese, Tricki, and is alarmed to see how fat and unwell the dog has become. Mrs Pumphrey believes he is underfed, so she has been adding tonics such as malt and cod-liver oil to a diet full of sweets. The vet gently advises less food and more exercise.',
    }),
    sl('concept', 'Summary 2: advice ignored, Tricki falls ill', {
      b: 'Mrs Pumphrey cannot keep to the plan. Whenever Tricki seems unhappy or begs, she gives in. His condition worsens until he becomes seriously ill and the vet is called to the house.',
      n: 'The advice fails. Mrs Pumphrey loves Tricki too much to refuse him, so whenever he begs or looks sad, the treats return. His health goes from bad to worse, and at last he becomes seriously ill. Notice the cause and effect here. The owner’s indulgence, not any disease, is what has brought the dog to this state.',
    }),
    sl('check', 'Check: the order of events', {
      chk: 'ord_tricki',
      n: 'Your turn. Six events from the story are shuffled. Put them in order, from the meeting in the street to the moment Mrs Pumphrey collects her dog.',
    }),
    sl('concept', 'Summary 3: off to the surgery', {
      b: 'The vet decides that Tricki must stay at his surgery, where his diet and exercise can be controlled. Mrs Pumphrey is heartbroken, but she sends the dog off with his bed, his toys and his coats.',
      n: 'The vet now takes a firm decision. Tricki must leave home and stay at the surgery, where the vet can control what he eats and how much he moves. Mrs Pumphrey is heartbroken. Even so, she cannot let her darling go without his comforts, and the vet drives away with the dog, his bed, his toys and his coats.',
    }),
    sl('concept', 'Summary 4: recovery and the gifts', {
      b: 'At the surgery Tricki gets only water at first. Slowly he becomes interested in the other dogs, then runs and plays with them and eats eagerly at mealtimes. Meanwhile Mrs Pumphrey phones often and sends eggs and wine to strengthen him, which the vet and his colleagues enjoy themselves.',
      n: 'At the surgery, Tricki is given only water at first. Gradually his interest returns. He follows the other dogs, then runs and plays with them, and soon he is eating eagerly at mealtimes. Meanwhile Mrs Pumphrey phones often and sends eggs and wine to help him. The vet admits, with a smile, that he and his colleagues enjoyed those gifts themselves.',
    }),
    sl('concept', 'Summary 5: a triumph of surgery?', {
      b: 'When Tricki is fit again, Mrs Pumphrey comes to collect him. The slim, lively dog dashes to her, and she, overcome with joy, praises the vet and calls the cure a triumph of surgery. There was no operation at all.',
      n: 'Finally, Tricki is fit again, and Mrs Pumphrey comes to fetch him. The slim, lively dog rushes to her joyfully. Overcome with gratitude, she praises the vet and calls the recovery a triumph of surgery. But there was no operation. Plain food, exercise and company did the job. That gap between her belief and the truth is the irony of the title.',
    }),
    sl('two-column', 'Theme 1: pampering versus real care', {
      b: 'Both characters love Tricki; only one helps him.',
      cols: [
        '**Mrs Pumphrey’s care**\n\n- sweets, cakes and tonics\n- comfort and no exercise\n- gives in to every plea\n- result: a sick, sluggish dog',
        '**The vet’s care**\n\n- water, then plain food\n- exercise and play\n- company of other dogs\n- result: a fit, lively dog',
      ],
      n: 'The central theme is the difference between pampering and real care. Mrs Pumphrey gives sweets, tonics and comfort, and gives in to every plea, and the result is a sick dog. The vet gives plain food, exercise and the company of other dogs, and the result is a healthy one. In answers, show this contrast clearly with evidence from both sides.',
    }),
    sl('concept', 'A web of themes', {
      v: vThemes,
      n: 'Around that central contrast sit other themes. Common sense heals, since no medicine is used. The vet shows professional responsibility and tact, acting firmly without humiliating the owner. Humour and irony run through the luggage, the gifts and the title. And the story quietly suggests that wealth can buy luxuries, but not good health or good judgement.',
    }),
    sl('check', 'Check: the same mistake today', {
      chk: 'mc_apply_child',
      n: 'Check yourself. A grandmother gives her grandson sweets every time he cries, and he is often unwell. Whose approach from the story is she following?',
    }),
    sl('concept', 'Character: Mrs Pumphrey', {
      b: 'Every trait in an answer needs evidence, described in your own words.',
      v: vPumphrey,
      n: 'Let us sketch Mrs Pumphrey. She is loving but indulgent, unable to refuse her pet anything. She is ill-informed, believing an overweight dog is underfed. She is emotional and generous, grieving when he leaves and sending gifts. And at the end she is grateful, but still unaware of what really cured him. She is foolish, but never cruel.',
    }),
    sl('concept', 'Character: the vet', {
      v: vVet,
      n: 'The vet is observant, spotting the danger at once. He is tactful, advising gently rather than blaming. He is firm when advice fails, taking the dog away. He is knowledgeable, curing Tricki without medicine. And he is honest and humorous, admitting that he enjoyed the gifts meant for his patient. These qualities make him a likeable and trustworthy narrator.',
    }),
    sl('two-column', 'Comparing Mrs Pumphrey and the narrator', {
      cols: [
        '**Mrs Pumphrey**\n\n- love led by feeling\n- indulgence and luxury\n- misreads the cure',
        '**The narrator**\n\n- love led by knowledge\n- discipline and routine\n- understands the cure, and smiles',
      ],
      n: 'Your syllabus asks you to compare these two characters. Mrs Pumphrey’s love is led by feeling; the vet’s is led by knowledge. She offers luxury; he offers routine and discipline. She misreads the cure as surgery; he knows the truth and quietly smiles. A strong answer gives evidence for each side and ends with a judgement about whose love is wiser.',
    }),
    sl('check', 'Check: why the advice failed', {
      chk: 'ar_advice',
      n: 'Try this assertion and reason item. Decide whether each statement is true, and then whether the reason really explains the assertion.',
    }),
    sl('concept', 'Humour and irony', {
      bl: [
        '**Comic exaggeration:** a small dog leaves home with a bed, toys and coats.',
        '**Gentle self-mockery:** the vets enjoy the gifts meant for the patient.',
        '**Irony of the title:** a surgery that never happened.',
        '**First-person narration:** a sensible observer we trust and enjoy.',
        '**Light tone, serious point:** indulgence harms; common sense heals.',
      ],
      n: 'How does Herriot write? He uses comic exaggeration, such as Tricki’s luggage. He uses gentle self-mockery when the vets enjoy the gifts. The title carries irony, because the triumph of surgery involved no surgery. The first-person narrator is sensible and amusing. Behind the light tone lies a serious point about the harm that indulgence can do.',
    }),
    sl('example', 'Irony and humour: SOYL’s own examples', {
      b: 'Practise spotting these techniques. These sentences are SOYL’s own, not from the story:',
      bl: [
        '*The tortoise won the race, and the hare thanked his fast legs for teaching him patience.* — irony of outcome',
        '*Grandma packed three sweaters, two blankets and a hot-water bottle for my one-night school trip in May.* — comic exaggeration of care',
        '*The fitness coach praised the new protein shake, though the player had simply started sleeping eight hours.* — praise given to the wrong cause',
      ],
      n: 'Here are three sentences of our own. A hare thanks his fast legs after losing: irony of outcome. A grandmother packs blankets for a summer trip of one night: comic exaggeration of care. A coach praises a shake when sleep did the work: praise given to the wrong cause, just like Mrs Pumphrey. Now find Herriot’s own moments of irony in your textbook.',
    }),
    sl('concept', 'Word meanings', {
      v: vWords,
      n: 'These words will help you write about the story. Indulgent means giving in to every wish, and to pamper is to spoil with comfort. Lethargic means sluggish. Malnutrition is poor health from bad or too little food. A tonic is meant to strengthen. Convalescence is the time of getting well. A surgery is an operation, and also a vet’s place of work.',
    }),
    sl('example', 'Worked example: planning a 6-mark answer', {
      b: '*Question:* *Too much love can harm.* Discuss with reference to Tricki.',
      v: vLongPlan,
      bl: [
        '**Stand:** agree; love without wisdom harmed Tricki.',
        '**Points + evidence:** sweets and tonics; no exercise; advice ignored because she could not refuse him.',
        '**Turn:** the cure came from separation, routine and company.',
        '**Value + conclusion:** real love sets limits, for pets and for children alike.',
      ],
      n: 'Here is how to plan a six mark answer. Take a stand: agree. Give points with evidence: the sweets and tonics, the lack of exercise, and the ignored advice. Then show the turn, when routine and company cured him. Finish by linking to a value, that real love sets limits, and apply it beyond the story, perhaps to children. Stay within the word limit.',
    }),
    sl('summary', 'Summary', {
      bl: [
        'Mrs Pumphrey overfed her Pekinese, Tricki, believing he was underfed.',
        'The vet’s advice failed; Tricki fell ill and was taken to the surgery.',
        'Water, plain food, exercise and other dogs cured him; the vets enjoyed her gifts.',
        'She called the cure a triumph of surgery: the title is ironic.',
        'Read the story in *Footprints without Feet*; write about it in your own words.',
      ],
      v: vStages,
      n: 'Let us sum up. Mrs Pumphrey overfed Tricki, thinking he was underfed. The vet’s advice failed, Tricki fell ill, and he was taken to the surgery. There, a plain routine and the company of other dogs cured him, while the vets enjoyed her gifts. She praised a triumph of surgery that never happened. Read the story in your textbook and write in your own words.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        '3-mark answers (40–50 words): point + evidence + explanation.',
        '6-mark answers (100–120 words): stand → 3 points with evidence → value or theme → conclusion.',
        'Facts often confused: Tricki had no operation; the tonics were Mrs Pumphrey’s idea, not the vet’s.',
        'For comparison questions, give evidence for both Mrs Pumphrey and the vet.',
        'Value questions: link the story to responsible care of pets or children.',
      ],
      n: 'Exam tips. In three mark answers, give a point, evidence and a short explanation. In six mark answers, take a stand and support it with three points, then link to a value. Get the facts right: Tricki had no operation, and the tonics were Mrs Pumphrey’s own idea. In comparisons, cover both characters. And in value questions, connect the story to real life.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'A Triumph of Surgery — study notes',
  sections: [
    {
      h: '1. About the text and the author',
      t: 1,
      b: `${READ}\n\n**James Herriot** was the pen name of James Alfred Wight (1916–1995), a British vet who wrote humorous memoirs about his life as a country vet in Yorkshire. This story is told in the first person by the vet, with gentle humour and affection for both animals and their owners.`,
      v: vAuthor,
      terms: [['Memoir', 'A true account of events from the writer’s own life.']],
    },
    {
      h: '2. Summary (in SOYL’s words)',
      t: 1,
      b: '**The shock.** The vet meets Mrs Pumphrey and her Pekinese, Tricki, in the street and is alarmed at how fat and unwell the dog looks. Believing he is underfed, she has been adding malt, cod-liver oil and Horlicks to a diet of cakes and sweets. He advises less food and more exercise.\n\n**Advice ignored.** She cannot refuse Tricki anything, so the treats continue, and he falls seriously ill.\n\n**The surgery.** The vet takes Tricki to his surgery to control his diet and exercise. A distressed Mrs Pumphrey sends his bed, toys and coats with him.\n\n**Recovery.** Tricki gets only water at first; then he grows interested in the other dogs, plays with them and eats eagerly. Mrs Pumphrey phones often and sends eggs and wine, which the vets enjoy.\n\n**The ending.** Fit again, Tricki dashes to his owner when she comes to collect him. She calls the cure a triumph of surgery, though no operation took place.',
      v: vStages,
    },
    {
      h: '3. Themes and message',
      t: 2,
      b: '- **Pampering is not real care:** indulgence makes Tricki ill.\n- **Common sense heals:** plain food, exercise and company cure him without medicine.\n- **Professional responsibility:** the vet acts firmly for his patient.\n- **Tact and kindness:** he never humiliates the owner.\n- **Humour and irony:** the luggage, the gifts and the title.\n- **Wealth without wisdom:** money buys luxury, not health.\n\n**Message:** real love for a pet (or a child) means meeting its true needs and setting limits, not giving in to every wish.',
      v: vThemes,
      terms: [['Indulgence', 'Allowing someone everything they want, even when it is bad for them.']],
    },
    {
      h: '4. Mrs Pumphrey',
      t: 3,
      b: '**Loving but indulgent** (cannot refuse Tricki). **Ill-informed** (thinks an overweight dog is underfed). **Emotional** (distraught when he leaves). **Generous** (eggs and wine). **Grateful but unaware** (praises a surgery that never happened). She is foolish, never cruel.',
      v: vPumphrey,
    },
    {
      h: '5. The vet (narrator) and the comparison',
      t: 3,
      b: '**The vet** is observant, tactful, firm, knowledgeable, honest and humorous.\n\n**Comparison:** Mrs Pumphrey’s love is led by feeling and shows itself as luxury; the vet’s love is led by knowledge and shows itself as discipline. Her care harms; his heals. She misreads the cure; he understands it and quietly smiles.',
      v: vVet,
    },
    {
      h: '6. Humour, irony and narration',
      t: 2,
      b: '- **Comic exaggeration:** the dog’s luggage.\n- **Self-mockery:** the vets enjoy the gifts.\n- **Irony:** the title, and Mrs Pumphrey’s praise for a surgery that never took place.\n- **First-person narrator:** sensible, amused and honest.\n\nSOYL practice sentence (not from the story): *The coach praised the new protein shake, though the player had simply started sleeping eight hours* (praise given to the wrong cause).',
      terms: [['Irony', 'A gap between what appears to be true, or what a character believes, and what is really true.']],
    },
    {
      h: '7. Word meanings',
      t: 1,
      b: 'Key words for discussing the story: indulgent, pamper, lethargic, malnutrition, tonic, convalescence, surgery, irony. Use them in your own sentences, for example: *Tricki’s convalescence at the surgery depended on exercise, not medicine.*',
      v: vWords,
    },
    {
      h: '8. Answering exam questions',
      t: 4,
      b: '**How this reader is examined:** the board sets 3-mark short answers (40–50 words; two of three) and a 6-mark long answer (100–120 words) on *Footprints without Feet*. It does not print extracts from this reader; SOYL’s commentary items are comprehension practice only.\n\n**Short answers (3 marks):** point + evidence + explanation.\n\n**Long answers (6 marks):** a clear stand; three points with evidence in your own words; a link to a value or theme; a one-line conclusion. Extrapolation tasks (Mrs Pumphrey’s diary, the vet’s letter, Tricki’s own account) must stay consistent with the story.\n\nRe-read the story in *Footprints without Feet* before a test.',
      v: vLongPlan,
    },
  ],
  tips: '**Board weight:** Footprints short answers (3 marks, 40–50 words, two of three) and one long answer (6 marks, 100–120 words) (CBSE 2026-27, Section C). No extracts from this reader.\n\n**How marks are awarded:** content (relevant events, accurately used), interpretation (a clear, supported view or value), and expression within the word limit.\n\n**Common mistakes**\n1. Saying the vet operated on Tricki: there was no operation.\n2. Saying the vet prescribed the tonics: they were Mrs Pumphrey’s idea.\n3. Calling Mrs Pumphrey cruel: she is loving but foolish.\n4. Forgetting the role of the other dogs in Tricki’s recovery.\n5. Quoting lines from memory instead of explaining in your own words.\n\n**Remember:** read the story in your textbook, *Footprints without Feet*.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Who wrote *A Triumph of Surgery*?', 'James Herriot (James Alfred Wight, 1916–1995), a British vet.', 'fact', 1],
  ['Who narrates the story?', 'The vet himself, in the first person.', 'fact', 1],
  ['Who is Tricki?', 'Mrs Pumphrey’s pet Pekinese.', 'fact', 1],
  ['Who is Mrs Pumphrey?', 'Tricki’s wealthy, doting owner.', 'fact', 3],
  ['What alarmed the vet in the street?', 'Tricki was badly overweight, sluggish and unwell.', 'fact', 1],
  ['What did Mrs Pumphrey wrongly believe?', 'That Tricki was underfed (suffering from malnutrition).', 'fact', 1],
  ['Name her three tonics', 'Malt, cod-liver oil and Horlicks.', 'fact', 1],
  ['The vet’s first advice', 'Less food and more exercise.', 'fact', 1],
  ['Why did the advice fail?', 'Mrs Pumphrey could not refuse Tricki’s begging.', 'concept', 3],
  ['What did the vet decide when Tricki fell ill?', 'To take him to the surgery for treatment.', 'fact', 1],
  ['What went with Tricki to the surgery?', 'His bed, toys and coats.', 'fact', 1],
  ['Tricki’s first days at the surgery', 'Only water; he lay quietly.', 'fact', 1],
  ['What cured Tricki?', 'Plain food, exercise and the company of other dogs.', 'concept', 2],
  ['What did Mrs Pumphrey send to the surgery?', 'Eggs and wine, to strengthen Tricki.', 'fact', 1],
  ['Who enjoyed the gifts?', 'The vet and his colleagues.', 'fact', 3],
  ['How did Tricki greet his owner at the end?', 'He dashed to her joyfully.', 'fact', 1],
  ['Why is the title ironic?', 'No surgery was performed; a simple routine cured Tricki.', 'concept', 2],
  ['Central theme', 'Pampering is not real care; sensible care heals.', 'concept', 2],
  ['Three traits of Mrs Pumphrey', 'Indulgent, emotional, generous (and ill-informed).', 'concept', 3],
  ['Three traits of the vet', 'Observant, tactful, firm (and honest, humorous).', 'concept', 3],
  ['Mrs Pumphrey vs the vet', 'Love led by feeling vs love led by knowledge.', 'concept', 3],
  ['Tone of the story', 'Light-hearted and gently ironic.', 'concept', 2],
  ['Value for pet owners', 'Meet the animal’s real needs: diet, exercise, company.', 'concept', 2],
  ['*indulgent*', 'giving in to every wish', 'definition', 1],
  ['*lethargic*', 'sluggish, without energy', 'definition', 1],
  ['*convalescence*', 'the period of getting well', 'definition', 1],
  ['Two meanings of *surgery*', 'An operation; a doctor’s or vet’s place of work.', 'definition', 1],
  ['How this reader is examined', '3-mark short answers (40–50 words) and a 6-mark long answer; no extracts.', 'exam-tip', 4],
  ['Plan for a 6-mark answer', 'Stand → three points with evidence → value or theme → conclusion (100–120 words).', 'exam-tip', 4],
  ['Most common factual slip', 'Saying Tricki had an operation, or that the vet prescribed the tonics.', 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests
// Supplementary-reader blueprints (catalog chapter override, 2026-10-27): no extract section; the board sets
// Footprints without Feet only as 3-mark short answers (two of three) and a 6-mark long answer.
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-short-supplementary',
  title: 'Chapter test (short) — A Triumph of Surgery',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Short answers (3 marks each)', instr: 'Two sets of three questions; in each set answer any two in 40–50 words.', items: [{ attempt: 2, keys: ['sa_diet', 'sa_hospital', 'sa_advice_fail'] }, { attempt: 2, keys: ['sa_pumphrey', 'sa_title', 'sa_belongings'] }] },
    { id: 'B', title: 'Section B — Long answer (6 marks)', instr: 'Answer any one of two questions in 100–120 words.', items: [{ attempt: 1, keys: ['la_compare', 'la_pampering'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-long-supplementary',
  title: 'Chapter test (long) — A Triumph of Surgery',
  duration: 80,
  sections: [
    { id: 'A', title: 'Section A — Short answers (2 marks each)', instr: 'Answer any three of four in 30–40 words.', items: [{ attempt: 3, keys: ['sb_who', 'sb_extras', 'sb_water', 'sb_reunion'] }] },
    { id: 'B', title: 'Section B — Short answers (3 marks each)', instr: 'Two sets of three questions; in each set answer any two in 40–50 words.', items: [{ attempt: 2, keys: ['sa_shock', 'sa_recovery', 'sa_gifts'] }, { attempt: 2, keys: ['sa_vet', 'sa_humour', 'sa_owners'] }] },
    { id: 'C', title: 'Section C — Long answers (6 marks each)', instr: 'Answer one question from each of the three pairs in 100–120 words.', items: [{ attempt: 1, keys: ['la_vet_sketch', 'la_title_long'] }, { attempt: 1, keys: ['la_diary_pumphrey', 'la_letter_vet'] }, { attempt: 1, keys: ['la_humour_irony', 'la_values'] }] },
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
    pattern: 'Footprints without Feet is examined by 3-mark short answers (Q9) and a 6-mark long answer (Q11), not extracts; the bank is weighted to those (14 three-mark, 9 long); the 5 commentary items fill the chapter-test blueprints’ extract slots as comprehension checks',
    literature_rule: 'no sentence, close paraphrase or distinctive phrase of the text; dialogue reported, never quoted; summaries in SOYL words; commentary items use passage_origin soyl-commentary; single words only for word meanings; textbook pointer on the title slide, notes and every passage stem',
    originality: 'questions written for SOYL; NCERT exercise questions not reused (stems reframed where a classic question exists)',
    re_solve: 'author verifier pass: every item re-answered from its stem and checked against the story',
    gate: 'npm test -w @soyl/content-templates and content lint (lintExemplar) run clean on this chapter',
  },
});

// D-036 reproduction guard: short distinctive phrases (at most 4 words) that must never appear.
guard(DIR, [
  'bloated sausage', 'hugely fat', 'rheumy', 'tongue lolled', 'harden your heart', "calf's foot jelly",
  'ring-throwing', 'almost swooned', 'pine and die', 'under observation', 'no food but plenty', 'headlong rush',
  'high-speed eating', 'scrimmages', 'shaggy crew', 'member of the gang', 'latest bulletins', 'convalescing rapidly',
  'two dozen', 'build up his strength', 'permanent guest', 'the real stuff', 'tremendous leap', 'sailed into',
  'hard-muscled', 'despairing cry', 'wrung her hands', 'uninteresting object', 'a kick in', 'loose box',
]);
