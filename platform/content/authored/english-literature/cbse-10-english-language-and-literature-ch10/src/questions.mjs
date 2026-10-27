// CBSE 10 English Language and Literature, ch10 "Madam Rides the Bus" (Vallikkannan) — question bank.
// LITERATURE RULE (CONTEXT §8): no sentence, close paraphrase or distinctive phrase of the story appears
// here. Passages are SOYL commentary about an episode (passage_origin: soyl-commentary); stems refer to
// events in SOYL's own words; dialogue is reported, never quoted. Students read the story in First Flight.
// Topics: t01 context and summary · t02 themes and message · t03 character (Valli) · t04 exam practice.
// Facts deliberately left out (cannot be confirmed without the text): the fare, the distance to the town,
// the length of the ride, the clock times of the trip, and the exact words of the closing conversation.
import { Q, mcq, fb, short, long, tf, ar, match, ord, source, child } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

const NOTE = "*(This passage is SOYL's commentary on the story, not an extract from it. Read the story itself in your textbook, First Flight.)*";
const SRC_STEM = `*Madam Rides the Bus*: read the commentary and answer the questions that follow. ${NOTE}`;
const SCHEME3 = [['Relevant point from the story (event or detail)', 1], ['Explanation or inference linked to the question', 1], ['Expression and accuracy within 40–50 words', 1]];
const SCHEME2 = [['Correct point from the story', 1], ['Explanation in own words within 30–40 words', 1]];
const LONG_SCHEME = [['Content: relevant points from the story, accurately used', 3], ['Interpretation / extrapolation: a clear view supported by the story', 1], ['Organisation and expression; within 100–120 words', 2]];

// ================================================================ extract-based (source-based, SOYL commentary)
Q('src_doorway', source({
  t: [1, 3], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Valli's world at the start of the story is the view from her front door. With nobody her age nearby to play with, the life of the street is her chief entertainment, and the most exciting thing in it is the bus that runs between her village and the nearest town. Each time it passes, full of travellers going somewhere she has never been, her longing grows. What makes Valli remarkable is that she does not stop at longing. Wishing is what most children do; Valli, at eight, turns her wish into a project with a budget and a timetable.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'What was Valli’s favourite way of passing time?', opts: ['watching the street from her front doorway', 'playing games with the children next door', 'reading books in her room', 'helping her mother in the kitchen'], sol: 'Standing at the front door and watching the street was her chief pastime.' })),
    child('b', fb({ t: 1, d: 1, c: 'recall', stem: 'The bus ran between Valli’s village and the nearest ___.', acc: [['town']], sol: 'It linked the village with the nearest **town**.' })),
    child('c', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Why did watching the bus make Valli’s longing grow?', opts: ['It carried people to places she had never seen.', 'Her father drove the bus.', 'The bus was painted in bright colours.', 'She had been promised a ride for her birthday.'], sol: 'Each passing bus reminded her of a world beyond her street that she had not seen.' })),
    child('d', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'What does the commentary mean when it says Valli turns her wish into *a project with a budget and a timetable*?', model: 'She does not just dream; she works out the cost and the timing of the trip and plans it carefully.', sol: 'She treats the dream practically: money and timing are planned in advance.', scheme: [['She plans the cost and timing instead of only wishing', 1]] })),
    child('e', mcq({ t: 3, d: 3, c: 'analysis', stem: 'What contrast does the commentary draw between Valli and most children?', opts: ['Most children only wish; Valli acts on her wish.', 'Most children are curious; Valli is not.', 'Most children travel alone; Valli does not.', 'Most children save money; Valli wastes it.'], sol: 'Her difference lies in turning desire into action.' })),
  ],
  sol: 'Parts (a)–(c) are facts from the story; (d) and (e) interpret Valli’s character.',
}));
Q('src_planning', source({
  t: [1, 3], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Valli's preparations would do credit to an adult. She listens closely whenever neighbours and regular passengers talk about the bus, and quietly asks a question here and there, until she knows how far the town is, how long the ride takes and what a ticket costs each way. Then she saves. Every coin that comes her way goes into her savings, even when the village fair tempts her with sweets, toys and rides. Finally she chooses her moment: the early afternoon, when her mother takes her regular nap and the house is quiet. None of this is told to anyone. The secret is part of the adventure.",
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'recall', stem: 'How did Valli find out the details of the bus journey?', opts: ['by listening to people who used the bus and asking careful questions', 'by reading a timetable at the bus stop', 'by asking her mother directly', 'by travelling on the bus once with her father'], sol: 'She gathered the facts by listening to neighbours and regular passengers and asking a few questions.' })),
    child('b', mcq({ t: 3, d: 2, c: 'understanding', stem: 'What did Valli do when the village fair tempted her to spend money?', opts: ['She resisted and kept saving for the bus ride.', 'She spent half and saved half.', 'She borrowed money from a friend.', 'She gave up the idea of the ride.'], sol: 'She held on to her savings in spite of the attractions of the fair.' })),
    child('c', fb({ t: 1, d: 2, c: 'understanding', stem: 'Valli chose to slip out in the early afternoon, when her mother took her usual ___.', acc: [['nap', 'afternoon nap', 'sleep', 'rest']], sol: 'Her mother’s afternoon **nap** gave Valli her chance.' })),
    child('d', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'Which quality of Valli’s does her refusal to spend money at the fair show most clearly?', model: 'Self-control: she gives up small pleasures now for the bigger goal she has set herself.', sol: 'Self-discipline in pursuit of a goal (determination is also acceptable).', scheme: [['Self-control / determination, explained', 1]] })),
    child('e', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Why does the commentary say Valli’s preparations would do credit to an adult?', opts: ['She researches, budgets and times her trip like a careful grown-up.', 'She asks adults to plan the trip for her.', 'She pretends to be an adult on the bus.', 'She uses an adult’s money for the trip.'], sol: 'Research, saving and timing are the steps a sensible adult would take.' })),
  ],
  sol: 'Separate what Valli does (a–c) from what it reveals about her (d, e).',
}));
Q('src_boarding', source({
  t: [1, 3], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "The scene at the bus stop is full of gentle comedy. A small girl, travelling alone, behaves with all the seriousness of an important passenger. When the conductor offers to help her up the step, she refuses: she can manage on her own. Amused by her dignity, he starts to address her with mock respect as madam, and the name gives the story its title. Valli does not laugh at the joke. She pays for her ticket, takes her seat and makes it clear that she expects to be treated like any other traveller. The adults find her charming; she simply finds them a little silly.",
  parts: [
    child('a', mcq({ t: 3, d: 1, c: 'recall', stem: 'How did Valli respond when the conductor offered to help her into the bus?', opts: ['She refused and climbed in by herself.', 'She asked him to lift her in.', 'She started to cry.', 'She went back home.'], sol: 'She declined his help and got in on her own.' })),
    child('b', fb({ t: 1, d: 1, c: 'recall', stem: 'The conductor jokingly called Valli ___, a word that gives the story its title.', acc: [['madam', 'Madam']], sol: 'He addressed her as **madam**, with mock respect.' })),
    child('c', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Why did the conductor call Valli by that name?', opts: ['He was amused by her grown-up, dignified manner.', 'He knew she came from a rich family.', 'He wanted to make her angry.', 'It was her real name.'], sol: 'Her serious, self-important manner amused him, so he teased her with mock respect.' })),
    child('d', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'Why does Valli not laugh at the conductor’s joke?', model: 'She takes her journey very seriously and wants to be treated as a proper passenger, not as a child to be teased.', sol: 'Her self-respect: she wants equal treatment, not amusement at her expense.', scheme: [['She wants to be taken seriously as a passenger', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What makes the scene at the bus stop comic, according to the commentary?', opts: ['the contrast between a small girl and her grown-up seriousness', 'the conductor falling off the bus', 'Valli forgetting her money', 'the bus leaving without her'], sol: 'Humour arises from a child behaving like an important adult passenger.' })),
  ],
  sol: 'Note the gentle irony: the adults are amused; Valli is entirely serious.',
}));
Q('src_journey', source({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Once the bus is moving, Valli forgets about the adults and gives herself up to the view. Palm trees, distant hills and a stretch of water slide past the window, and every new sight seems more wonderful than the last. Then comes the moment she enjoys most. A young cow is trapped on the road ahead of the bus, and the horn, meant to clear it away, simply frightens it into running harder. Valli is helpless with laughter. The episode seems no more than a funny incident on a happy day. Only later does the reader realise that the writer has placed it there for a reason.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'Which animal ran along the road ahead of the bus?', opts: ['a young cow', 'a stray dog', 'a goat', 'a buffalo calf'], sol: 'A young cow ran ahead of the bus.' })),
    child('b', mcq({ t: 1, d: 2, c: 'understanding', stem: 'Why did the cow keep running instead of moving aside?', opts: ['The horn frightened it and it could not find a way out of the road.', 'It was racing the bus for fun.', 'Valli was calling it.', 'The driver wanted it to lead the way.'], sol: 'Frightened by the horn and trapped on the road, it ran faster.' })),
    child('c', fb({ t: 1, d: 2, c: 'recall', stem: 'The frightened young cow kept running along the ___ instead of moving aside.', acc: [['road', 'roadway', 'highway']], sol: 'It stayed on the **road** ahead of the bus.' })),
    child('d', short({ t: 2, d: 4, c: 'evaluation', marks: 1, stem: 'Why does the commentary say the writer has placed the cow episode *for a reason*?', model: 'The same cow is found dead on the return journey, so the funny scene prepares for Valli’s first meeting with death.', sol: 'It sets up the contrast with the dead cow seen later.', scheme: [['It prepares for the dead cow on the way back', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What is Valli’s main feeling on the outward journey?', opts: ['delight and wonder', 'fear and anxiety', 'boredom', 'guilt'], sol: 'Everything she sees fills her with joy and wonder.' })),
  ],
  sol: 'The outward journey is all joy; part (d) looks ahead to the return.',
}));
Q('src_town', source({
  t: [1, 3], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "When the bus reaches the town, Valli does something that surprises the conductor: she does not get off. She has planned only a ride, not a visit, and she intends to return on the same bus, so she buys a second ticket and stays in her seat, watching the busy town through the window. The conductor, by now fond of his small passenger, offers to buy her a drink. She politely refuses. It is a small moment, but it shows a girl who will not accept favours she has not earned, and who keeps to her plan even when the plan could be relaxed.",
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'recall', stem: 'What did Valli do when the bus reached the town?', opts: ['She stayed on the bus to return on it.', 'She got off and went shopping.', 'She visited a relative in the town.', 'She went to see a film.'], sol: 'She stayed in her seat and returned on the same bus.' })),
    child('b', mcq({ t: 1, d: 2, c: 'understanding', stem: 'Why did Valli not get off in the town?', opts: ['Her plan was only to ride the bus there and back.', 'The conductor would not let her get off.', 'She was afraid of the crowds.', 'She had lost her way.'], sol: 'She had planned a ride, not a visit, and had to be home before her mother woke.' })),
    child('c', fb({ t: 3, d: 2, c: 'understanding', stem: 'When the conductor offered to buy her a drink, Valli politely ___ it.', acc: [['refused', 'declined']], sol: 'She **refused** the treat.' })),
    child('d', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'What does Valli’s refusal of the drink reveal about her?', model: 'She has self-respect and does not want to accept favours or be treated as a little child.', sol: 'Self-respect and independence (pride is also acceptable).', scheme: [['Self-respect / independence', 1]] })),
    child('e', mcq({ t: 3, d: 3, c: 'analysis', stem: 'How has the conductor’s attitude to Valli changed by this point?', opts: ['He has grown fond of her.', 'He has become annoyed with her.', 'He has stopped noticing her.', 'He has decided to report her to her mother.'], sol: 'His teasing has turned into affection, shown by the offer of a drink.' })),
  ],
  sol: 'Link the refusal of the drink to Valli’s wish to be treated as an equal.',
}));
Q('src_return', source({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "The return journey begins like the first, but it ends very differently. By the side of the road Valli sees the young cow that made her laugh only a short while ago. A passing vehicle has killed it, and its body lies beside the road. The sight changes everything. Valli turns away from the window for the rest of the ride, and the joy of the outing drains away. Without any lecture from an adult, Valli has learnt that life can end suddenly and that the happiest moment can sit right beside the saddest. This is the turning point of the story: the bus ride becomes a first lesson about life and death.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'What did Valli see by the roadside on her way back?', opts: ['the young cow, lying dead', 'her mother looking for her', 'a broken-down bus', 'a fair being set up'], sol: 'She saw the same young cow, killed by a passing vehicle.' })),
    child('b', mcq({ t: 2, d: 2, c: 'understanding', stem: 'How did the sight affect Valli?', opts: ['Her joy vanished and she lost interest in the view.', 'She laughed even harder.', 'She asked the driver to stop.', 'She did not notice it.'], sol: 'Saddened, she stopped looking out of the window.' })),
    child('c', fb({ t: 2, d: 2, c: 'understanding', stem: 'On the return journey Valli had her first real encounter with ___.', acc: [['death']], sol: 'The dead cow was her first real meeting with **death**.' })),
    child('d', short({ t: 2, d: 4, c: 'evaluation', marks: 1, stem: 'Why does the commentary call this moment the turning point of the story?', model: 'The happy adventure turns into a lesson about death, and Valli moves from pure joy to a more grown-up awareness.', sol: 'The mood and meaning of the story shift from joy to an understanding of death.', scheme: [['Shift from joy to awareness of death / growing up', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What does the commentary suggest Valli learns without any lecture from an adult?', opts: ['Life can end suddenly, and joy and sorrow can sit side by side.', 'Buses are dangerous for children.', 'She should never leave home again.', 'Cows should be kept off the roads.'], sol: 'She learns about the fragility of life through what she sees for herself.' })),
  ],
  sol: 'The return journey mirrors the outward one, but joy gives way to sorrow.',
}));
Q('src_secret', source({
  t: [2, 3], d: 3, c: 'evaluation', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Valli gets home safely and her mother never learns that she went anywhere. In one sense the plan has worked perfectly: she has seen the town, kept to her budget and been back in time. In another sense she returns as a slightly different person. She now carries two secrets, one happy and one sad, and both are hers alone. Nobody at home suspects what she has seen, and she has no wish to tell them. Readers are left to judge whether the adventure was brave, risky or both.",
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'recall', stem: 'Did Valli’s mother find out about the trip?', opts: ['No, the trip remained Valli’s secret.', 'Yes, the conductor told her.', 'Yes, Valli confessed at once.', 'Yes, a neighbour saw Valli on the bus.'], sol: 'Valli came home without her mother learning about the journey.' })),
    child('b', mcq({ t: 2, d: 2, c: 'understanding', stem: 'What are the *two secrets* the commentary mentions?', opts: ['the joy of the trip and the sorrow of the dead cow', 'the money she saved and the money she spent', 'the conductor’s name and the driver’s name', 'her mother’s nap and her aunt’s visit'], sol: 'She keeps both the happy experience and the sad discovery to herself.' })),
    child('c', fb({ t: 3, d: 2, c: 'understanding', stem: 'The commentary says Valli returns home as a slightly ___ person.', acc: [['different', 'changed', 'wiser', 'older']], sol: 'The experience leaves her slightly **different**, wiser than before.' })),
    child('d', short({ t: 2, d: 4, c: 'evaluation', marks: 1, stem: 'Was Valli’s adventure brave, risky or both? Give a one-sentence view.', model: 'Both: planning it alone showed courage and maturity, but an eight-year-old travelling secretly was taking a real risk.', sol: 'Any supported view is acceptable; the best answers weigh courage against risk.', scheme: [['A view supported by a reason from the story', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Why might Valli prefer to keep her adventure to herself even after returning safely?', opts: ['Telling would reveal that she had gone out without permission.', 'She has forgotten most of the trip.', 'The conductor made her promise to stay silent.', 'Her mother had already guessed everything.'], sol: 'Her trip was secret from the start; revealing it would expose the risk she took.' })),
  ],
  sol: 'Part (d) has no single right answer; reward a supported view.',
}));

// ================================================================ short answers, 3 marks (40–50 words)
const SA3 = { marks: 3, wl: [40, 50], scheme: SCHEME3, time: 240 };
Q('sa_plan', short({
  ...SA3, t: [1, 3], d: 2, c: 'understanding',
  stem: 'Describe the steps Valli took to prepare for her bus ride. Answer in 40–50 words.',
  model: 'Valli listened carefully to neighbours and passengers talking about the bus and asked a few questions, learning the distance, travel time and fare. She saved every coin, ignoring the treats at the village fair. Then she picked the hour of her mother’s afternoon nap to slip away.',
  sol: 'Gathering information + saving money (resisting temptation) + choosing the right time.',
}));
Q('sa_madam', short({
  ...SA3, t: [1, 3], d: 3, c: 'analysis',
  stem: 'Why did the conductor call Valli madam, and how did she react to being teased? Answer in 40–50 words.',
  model: 'The conductor was amused that such a small girl behaved like a serious, independent passenger, refusing help to climb in. So he teased her with mock respect. Valli did not enjoy the joke; she wanted to be treated as an ordinary traveller and answered him firmly and with dignity.',
  sol: 'The reason (her grown-up manner amused him) + her reaction (dignified, wanted equal treatment).',
}));
Q('sa_old_woman', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'How did Valli respond to the elderly woman passenger who fussed over her, and why? Answer in 40–50 words.',
  model: 'When an elderly woman passenger fussed over her as a little girl travelling without an adult, Valli found her irritating and kept her answers short. She resented being treated as a helpless child. Having paid for her own ticket, she felt fully entitled to travel like any adult.',
  sol: 'Her response (short, cool replies) + the reason (resented being treated as a child; she had paid her fare).',
}));
Q('sa_sights', short({
  ...SA3, t: 1, d: 2, c: 'understanding',
  stem: 'What did Valli enjoy on her way to the town? Answer in 40–50 words.',
  model: 'Valli was thrilled by everything she saw: palm trees, hills in the distance and water beside the road. Most of all she enjoyed a young cow trapped on the road ahead of the bus, running harder whenever the horn sounded. It made her laugh helplessly.',
  sol: 'The scenery + the young cow ahead of the bus + her delight.',
}));
Q('sa_town_stay', short({
  ...SA3, t: [1, 3], d: 3, c: 'analysis',
  stem: 'Why did Valli refuse to get off the bus in the town and refuse the drink the conductor offered? Answer in 40–50 words.',
  model: 'Valli had planned only a ride to the town and back, and she had to be home before her mother woke, so she stayed in her seat. She refused the drink because she did not want favours or to be treated as a child. Both choices show self-control.',
  sol: 'The reason for staying (plan, time) + the reason for refusing the drink (self-respect) + what both show.',
}));
Q('sa_dead_cow', short({
  ...SA3, t: 2, d: 3, c: 'analysis',
  stem: 'How did the sight of the dead cow change Valli’s mood? What did she learn from it? Answer in 40–50 words.',
  model: 'Valli had laughed at the young cow on the outward ride. Seeing it lying dead on the way back shocked and saddened her, and the passing scenery lost all its charm for her. She learnt that death can come suddenly and that joy and sorrow often sit together.',
  sol: 'Contrast (laughter before, shock now) + change of mood + the lesson about death.',
}));
Q('sa_independence', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'Valli is an independent girl. Give three examples from the story that show her independence. Answer in 40–50 words.',
  model: 'First, she plans and pays for the whole trip herself, without asking any adult. Second, she refuses the conductor’s help in climbing into the bus. Third, she turns down his offer of a drink and rejects the elderly woman’s fussing. She wants to manage everything on her own.',
  sol: 'Any three: planning and paying alone; refusing help to climb in; refusing the drink; rejecting the fussing; staying on the bus by her own plan.',
}));
Q('sa_conductor', short({
  ...SA3, t: 3, d: 2, c: 'understanding',
  stem: 'What kind of person is the bus conductor? Support your answer with evidence. Answer in 40–50 words.',
  model: 'The conductor is friendly and good-humoured. He jokes with Valli, calling her madam with mock respect. He is also kind: he offers to help her up the step, keeps an eye on her during the ride and even offers to buy her a drink in the town.',
  sol: 'Two qualities (good-humoured, kind) with evidence (the nickname, the offers of help and a drink).',
}));
Q('sa_risk', short({
  ...SA3, t: [2, 3], d: 4, c: 'evaluation',
  stem: 'Was Valli right to go on the bus ride without telling her mother? Give your view in 40–50 words.',
  model: 'I admire her planning, but I think she was wrong to keep it secret. An eight-year-old travelling alone could have got lost or hurt, and her mother would have been frantic. Her courage was real, but sharing the plan with an adult would have been wiser.',
  sol: 'A stand + reasons from the story (planning, risk, secrecy) + a conclusion. A reasoned defence of her independence can also earn full marks.',
}));
Q('sa_title', short({
  ...SA3, t: [2, 4], d: 4, c: 'evaluation',
  stem: 'Is *Madam Rides the Bus* a suitable title for the story? Give your view in 40–50 words.',
  model: 'Yes. The title echoes the conductor’s playful name for Valli, which captures her grown-up dignity and self-confidence. It also names the story’s main event, the bus ride. Yet it hints at irony too, since the little madam returns having learnt a serious lesson about death.',
  sol: 'A stand + the source of madam + the main event + the irony or deeper meaning.',
}));
Q('sa_mirror', short({
  ...SA3, t: [2, 4], d: 4, c: 'analysis',
  stem: 'How does the return journey mirror the outward journey, and what is the effect? Answer in 40–50 words.',
  model: 'Both journeys pass the same road and scenery, but the mood is reversed. Going out, the young cow made Valli laugh; coming back, she finds it dead. The joyful view no longer interests her. This contrast shows how quickly life can change and marks Valli’s step towards maturity.',
  sol: 'Same route, opposite mood + the cow in both journeys + the effect (contrast, growing up).',
}));
Q('sa_curiosity', short({
  ...SA3, t: 2, d: 3, c: 'application',
  stem: 'Valli’s curiosity leads her to a new experience. How can curiosity help young people today? Answer in 40–50 words, linking to the story.',
  model: 'Valli’s curiosity made her research, plan and save, and it opened a world beyond her street. Today, curiosity can push students to ask questions in class, explore new subjects or learn skills online. Like Valli, though, they should pair curiosity with planning and good sense about safety.',
  sol: 'What curiosity did for Valli + two present-day applications + a balancing point (planning, safety).',
}));

// ================================================================ short answers, 2 marks (30–40 words)
const SA2 = { marks: 2, wl: [30, 40], scheme: SCHEME2, time: 150 };
Q('sb_who', short({
  ...SA2, t: 1, d: 1, c: 'recall',
  stem: 'Who is Valli, and what was her great desire? Answer in 30–40 words.',
  model: 'Valli is an eight-year-old village girl who loved watching the street from her doorway. Her great desire was to ride the bus that passed her house and travel to the nearest town on it.',
  sol: 'Who she is (a young village girl) + her desire (to ride the bus to the town).',
}));
Q('sb_fair', short({
  ...SA2, t: 3, d: 2, c: 'understanding',
  stem: 'What temptations did Valli resist while saving for the trip? Answer in 30–40 words.',
  model: 'At the village fair Valli was tempted by sweets, toys and rides, the things children usually love. She resisted them all and kept every coin for her bus fare, showing great self-control for her age.',
  sol: 'The temptations (fair treats and rides) + what her resistance shows.',
}));
Q('sb_when', short({
  ...SA2, t: 1, d: 2, c: 'understanding',
  stem: 'When did Valli slip away for her ride, and why did she choose that time? Answer in 30–40 words.',
  model: 'She slipped away in the early afternoon, during her mother’s usual nap. The house was quiet then and nobody would miss her, so she could go to the town and return without being discovered.',
  sol: 'The time (her mother’s afternoon nap) + the reason (no one would notice).',
}));
Q('sb_tears', short({
  ...SA2, t: 1, d: 2, c: 'understanding',
  stem: 'What made Valli laugh so much on the way to the town? Answer in 30–40 words.',
  model: 'A young cow was running along the road in front of the bus. The horn only frightened it into running harder instead of stepping aside, and Valli found the sight of the panicking animal extremely funny.',
  sol: 'The cow ahead of the bus + why it was funny to her.',
}));
Q('sb_window', short({
  ...SA2, t: 2, d: 3, c: 'analysis',
  stem: 'Why did Valli stop enjoying the view on the way home? Answer in 30–40 words.',
  model: 'She had seen the young cow lying dead by the road, killed by a vehicle. The shock took away her delight in the view, and she feared seeing something equally upsetting again.',
  sol: 'The dead cow + its effect on her mood (joy replaced by sadness).',
}));
Q('sb_mature', short({
  ...SA2, t: 3, d: 3, c: 'application',
  stem: 'Valli is only a child, yet she behaves maturely. Give two examples of her maturity. Answer in 30–40 words.',
  model: 'She plans the trip carefully, finding out every detail and saving her money. She also stays calm and dignified with strangers on the bus, and she sticks to her plan instead of wandering about the town.',
  sol: 'Two examples (careful planning and saving; dignified behaviour; keeping to her plan).',
}));

// ================================================================ long answers, 6 marks (100–120 words)
const LA = { marks: 6, wl: [100, 120], scheme: LONG_SCHEME, time: 720 };
Q('la_valli_sketch', long({
  ...LA, t: [4, 3], d: 3, c: 'analysis',
  stem: 'Write a character sketch of Valli, supporting each quality with evidence from the story. Answer in 100–120 words.',
  model: 'Valli is a curious girl whose window on the world is her front doorway, and the bus that passes it awakens her longing to travel. She is a careful planner, gathering facts about the journey from neighbours and passengers. She is determined and self-controlled, saving every coin and resisting the treats at the fair. Independent and proud, she refuses the conductor’s help and his offer of a drink, and she dislikes being fussed over. She is observant and full of wonder, delighting in every sight on the way. Finally, she is sensitive: the dead cow on the return trip saddens her deeply. Valli is a child with a remarkably mature mind.',
  sol: 'Four or five qualities with evidence: curious, a planner, determined/self-controlled, independent/proud, observant, sensitive. End with an overall judgement.',
}));
Q('la_life_death', long({
  ...LA, t: [4, 2], d: 4, c: 'analysis',
  stem: 'How does Valli’s bus ride become her first lesson about life and death? Answer in 100–120 words.',
  model: 'Valli sets out only to see the world beyond her street, and the outward journey is pure joy. She marvels at the trees, the water and the hills, and a young cow racing ahead of the bus makes her laugh helplessly. On the way back, she sees the same cow lying dead beside the road, struck by a vehicle. The shock is immediate. Her pleasure in the view disappears and she sits quietly, turned away from the window. No adult explains anything, yet Valli understands that life can end suddenly and that joy and sorrow lie close together. A simple outing becomes a step out of innocent childhood towards a more thoughtful maturity.',
  sol: 'The joy of the outward journey + the cow alive and then dead + Valli’s change of mood + the lesson about the fragility of life + growing up. Conclude with the effect on Valli.',
}));
Q('la_diary_valli', long({
  ...LA, t: [4, 1], d: 4, c: 'application', bloom: 'create',
  stem: 'Imagine you are Valli. Write a diary entry on the night of your bus ride, describing your feelings, in 100–120 words.',
  model: 'Tonight\n\nI did it! While Amma napped, I slipped out with the coins I had saved for so long and climbed into the bus all by myself. The conductor called me madam and laughed, but I paid my fare like everyone else. The ride was more wonderful than I had dreamed: trees, water and blue hills far away. A young cow ran ahead of the bus and I laughed so much my stomach hurt. But on the way back I saw that same cow lying dead by the road. After that I did not care about the view. I am glad I went, but tonight I feel older. Nobody knows, and I will keep it that way.',
  sol: 'Diary format (date/time, first person, past tense, feelings). Content consistent with the story: the secret plan, the conductor, the sights, the cow alive and dead, the return unnoticed. Mixed feelings at the end.',
}));
Q('la_conductor_account', long({
  ...LA, t: [4, 3], d: 4, c: 'application', bloom: 'create',
  stem: 'Imagine you are the bus conductor. Describe your small passenger to a friend that evening, in 100–120 words.',
  model: 'You will not believe the passenger I had today. She was a tiny girl, no older than eight, travelling all by herself. When I offered to help her up the step, she refused and climbed in on her own, as proud as a queen. I could not resist calling her madam. She paid her fare, sat up straight and stared at the view as if she owned the road. When the bus reached the town, she would not get off; she simply bought another ticket for the return ride. I offered her a cold drink, but she turned it down politely. On the way back she went very quiet. I hope she reached home safely.',
  sol: 'Conversational account in the first person. Content consistent with the story: her age and independence, refusal of help, the nickname, staying on the bus, refusal of the drink, her silence on the way back. Tone warm and amused.',
}));
Q('la_independence_safety', long({
  ...LA, t: [4, 2], d: 4, c: 'evaluation',
  stem: 'Valli travelled alone and in secret. Should children be encouraged to be as independent as Valli? Give your view in 100–120 words.',
  model: 'Independence is valuable, and Valli shows its best side. She researched her trip, saved her money, resisted temptation and behaved with dignity among strangers. These are habits every child should build. However, her secrecy was risky. An eight-year-old travelling alone could have been lost, hurt or misled, and her mother would not even have known where to look. True independence includes good judgement about safety. In my view, children should be encouraged to plan, take decisions and try new experiences, but with a trusted adult informed. Valli’s story celebrates a brave, capable child, but it also quietly reminds us that the world beyond the doorway contains real dangers.',
  sol: 'A clear stand + what Valli’s independence shows (planning, saving, dignity) + the risks of secrecy + a balanced conclusion. A reasoned stronger view either way can also earn full marks.',
}));
Q('la_valli_adults', long({
  ...LA, t: [4, 3], d: 4, c: 'analysis',
  stem: 'Valli refuses to be treated as a child by the adults she meets. Discuss how she deals with each of them, in 100–120 words.',
  model: 'Valli insists on being treated as an equal throughout her journey. With the conductor, she refuses help to climb in and does not laugh at his teasing nickname, though by the end she has won his affection. With the elderly woman passenger, who fusses over a girl travelling alone, she keeps her replies short and cool, resenting the suggestion that she cannot look after herself. In the town she turns down the conductor’s offer of a drink, unwilling to accept favours. Even with her own mother she keeps her plan secret, sure she can manage alone. Her firmness is sometimes funny, but it shows real self-respect and a strong wish to grow up.',
  sol: 'Valli’s dealings with the conductor (help, nickname, drink), the elderly woman (fussing) and her mother (secret) + what they reveal (self-respect, desire to grow up).',
}));
Q('la_symbol_cow', long({
  ...LA, t: [4, 2], d: 4, c: 'evaluation',
  stem: 'What is the importance of the young cow in *Madam Rides the Bus*? Answer in 100–120 words.',
  model: 'The young cow appears only twice, yet it carries the story’s deepest meaning. On the outward journey it races ahead of the bus, and Valli laughs at it helplessly. It stands for the playful, carefree spirit of the day and of Valli herself. On the return journey the same animal lies dead by the roadside. The contrast is sudden and painful, and Valli’s delight in the view disappears. Through the cow, the writer shows that life is fragile and that joy and sorrow can follow each other within hours. Without the cow, the story would be a pleasant outing; with it, the ride becomes Valli’s first step towards understanding life.',
  sol: 'The cow in both journeys + what it represents (joy, life) + the contrast and its effect on Valli + its role in the story’s meaning.',
}));

// ================================================================ objective items
Q('mc_author_bus', mcq({ t: 1, d: 1, c: 'recall', stem: 'Who wrote *Madam Rides the Bus*?', opts: ['Vallikkannan', 'Gavin Maxwell', 'Betty Renshaw', 'Anton Chekhov'], sol: 'Vallikkannan, a Tamil writer, wrote the story.' }));
Q('mc_language_bus', mcq({ t: 1, d: 2, c: 'recall', stem: 'In which language was *Madam Rides the Bus* first written?', opts: ['Tamil', 'Hindi', 'Malayalam', 'Bengali'], sol: 'It was written in Tamil and translated into English.' }));
Q('mc_valli_age', mcq({ t: 1, d: 2, c: 'recall', stem: 'How old was Valli when she took her bus ride?', opts: ['eight', 'twelve', 'five', 'fifteen'], sol: 'Valli was an eight-year-old girl.' }));
Q('mc_pastime', mcq({ t: 1, d: 1, c: 'recall', stem: 'What was Valli’s chief entertainment before her bus ride?', opts: ['watching the street from her front door', 'playing with dolls', 'swimming in the canal', 'going to the cinema'], sol: 'She loved standing at her front door watching the street, especially the bus.' }));
Q('mc_info', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Valli collected information about the bus by listening to others and asking a few questions. This shows that she was…', opts: ['resourceful and careful', 'lazy and careless', 'shy and nervous', 'rude and boastful'], sol: 'Gathering facts quietly and cleverly shows a resourceful, careful planner.' }));
Q('mc_madam_tone', mcq({ t: 3, d: 2, c: 'understanding', stem: 'In what spirit did the conductor call Valli madam?', opts: ['playful mock respect', 'deep anger', 'real fear', 'cold indifference'], sol: 'He was teasing her kindly, amused by her grown-up manner.' }));
Q('mc_woman_reaction', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Why did Valli dislike the elderly woman who spoke to her on the bus?', opts: ['The woman treated her like a helpless little child.', 'The woman took Valli’s seat.', 'The woman refused to pay her fare.', 'The woman told the driver to stop.'], sol: 'Valli resented being fussed over as though she could not manage alone.' }));
Q('mc_cow_role', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What is the main purpose of the young cow in Valli’s story?', opts: ['to show, through its life and death, how joy can turn to sorrow', 'to show that cows are dangerous on roads', 'to delay the bus so Valli is late', 'to show the driver’s skill'], sol: 'The cow, alive and then dead, carries the story’s lesson about life and death.' }));
Q('mc_stay', mcq({ t: 1, d: 2, c: 'understanding', stem: 'Valli did not get off the bus in the town because…', opts: ['she had planned only a ride there and back', 'she had no money for food', 'the conductor locked the door', 'she was feeling unwell'], sol: 'Her plan was a ride, not a visit, and she had to be home before her mother woke.' }));
Q('mc_change', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Which change takes place in Valli during the return journey?', opts: ['from carefree delight to a sad, thoughtful awareness', 'from fear to confidence', 'from boredom to excitement', 'from anger to forgiveness'], sol: 'Seeing the dead cow, she moves from joy to a sober understanding of death.' }));
Q('mc_message_bus', mcq({ t: 2, d: 3, c: 'evaluation', stem: 'Which message does Valli’s story most strongly suggest?', opts: ['Growing up means discovering both the wonders and the sorrows of the world.', 'Children should never leave their homes.', 'Money is more important than experience.', 'Adults always understand children well.'], sol: 'Valli’s ride brings her both delight and her first encounter with death.' }));
Q('mc_apply_valli', mcq({ t: [2, 3], d: 3, c: 'application', stem: 'Which present-day student shows the same quality Valli shows while preparing for her ride?', opts: ['Arjun saves his pocket money for months, skipping snacks, to buy a telescope he has researched.', 'Simran borrows money from friends to buy a phone at once.', 'Kabir waits for his parents to plan his holiday.', 'Tara spends all her savings at the first shop she sees.'], sol: 'Like Valli, Arjun researches his goal and gives up small pleasures to save for it.' }));
Q('mc_narration_bus', mcq({ t: 2, d: 2, c: 'understanding', stem: 'How is *Madam Rides the Bus* narrated?', opts: ['in the third person, closely following Valli', 'in the first person by Valli', 'in the first person by the conductor', 'as a series of letters'], sol: 'A third-person narrator tells the story, mostly through Valli’s eyes and feelings.' }));
Q('mc_tone_bus', mcq({ t: 2, d: 3, c: 'analysis', fixed: true, key: 'c', stem: 'Which phrase best describes the tone of Valli’s story as a whole?', opts: ['bitter and angry throughout', 'frightening and full of suspense', 'light and humorous at first, then quietly serious', 'formal and scientific'], sol: 'Gentle humour on the outward ride gives way to a serious mood after the dead cow.' }));

Q('fb_name_valli', fb({ t: 1, d: 1, c: 'recall', stem: 'Valli is the short form of the girl’s full name, ___.', acc: [['Valliammai']], sol: 'Her full name is **Valliammai**.' }));
Q('fb_saved', fb({ t: 3, d: 1, c: 'recall', stem: 'To pay for the ride, Valli saved every ___ she got.', acc: [['coin', 'paisa', 'penny']], sol: 'She saved every **coin** that came her way.' }));
Q('fb_tickets', fb({ t: 1, d: 2, c: 'understanding', marks: 1, stem: 'Valli bought one ticket to the ___ and a second one for the ___ journey.', acc: [['town'], ['return', 'homeward', 'way back']], sol: 'A ticket to the **town** and another for the **return** ride.', scheme: [['town', 0.5], ['return', 0.5]] }));
Q('fb_vehicle', fb({ t: 2, d: 2, c: 'understanding', stem: 'The young cow had been killed by a passing ___.', acc: [['vehicle', 'lorry', 'truck', 'car']], sol: 'It had been struck by a passing **vehicle**.' }));

Q('ar_doorway', ar({ t: [1, 3], d: 3, c: 'analysis', a: 'Valli spent much of her time watching the street from her front doorway.', r: 'Valli had nobody of her age nearby to play with.', key: 'a', sol: 'Both are true, and R explains A: with no one to play with, the street became her entertainment.' }));
Q('ar_refuse_help', ar({ t: 3, d: 3, c: 'analysis', a: 'Valli refused the conductor’s help in climbing into the bus.', r: 'Valli had travelled on the bus many times before.', key: 'c', sol: 'A is true. R is false: this was her very first ride; she refused help out of independence.' }));
Q('ar_laugh', ar({ t: [1, 2], d: 3, c: 'analysis', a: 'Valli laughed heartily on the outward journey.', r: 'Valli had chosen the time of her mother’s afternoon nap for her trip.', key: 'b', sol: 'Both are true, but the timing of the trip does not explain her laughter; the running cow did.' }));
Q('ar_drink', ar({ t: 3, d: 3, c: 'understanding', a: 'Valli gladly accepted a drink from the conductor in the town.', r: 'The conductor had grown fond of his small passenger.', key: 'd', sol: 'A is false: she politely refused the drink. R is true.' }));

Q('tf_got_off', tf({ t: 1, d: 1, c: 'recall', stem: 'True or false: Valli got off the bus and spent an hour exploring the town.', ans: false, sol: 'She stayed on the bus and returned on it.' }));
Q('tf_mother_knew', tf({ t: 1, d: 2, c: 'recall', stem: 'True or false: Valli’s mother helped her plan the bus ride.', ans: false, sol: 'Valli planned it alone and kept it secret from her mother.' }));
Q('tf_first_ride', tf({ t: 1, d: 2, c: 'understanding', stem: 'True or false: Valli’s trip was her first ride on the village bus.', ans: true, sol: 'She had only watched the bus until this day.' }));
Q('tf_window', tf({ t: 2, d: 2, c: 'understanding', stem: 'True or false: on the way home Valli lost interest in the view from the bus window.', ans: true, sol: 'After seeing the dead cow, the view gave her no more pleasure.' }));

Q('ord_valli', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange these events from Valli’s adventure in the order in which they happen.',
  items: ['Valli watches the bus pass her house and longs to ride it.', 'She gathers details about the trip and saves her coins.', 'She slips out while her mother naps and boards the bus.', 'She laughs at the young cow running ahead of the bus.', 'She stays on the bus in the town and buys a return ticket.', 'She sees the cow lying dead by the road on the way back.'],
  sol: 'Longing → planning and saving → boarding → the running cow → the town → the dead cow.',
}));
Q('ord_mood', ord({
  t: [2, 3], d: 3, c: 'analysis', marks: 2,
  stem: 'Arrange the changes in Valli’s feelings across the story.',
  items: ['longing, as she watches the bus from her doorway', 'determination, as she plans and saves', 'excitement and pride, as she boards alone', 'pure delight, as she watches the view and the cow', 'shock and sadness, as she sees the dead cow', 'quiet, thoughtful silence on reaching home'],
  sol: 'Longing → determination → excitement → delight → sadness → thoughtful silence.',
}));

Q('mt_people_bus', match({
  t: 3, d: 2, c: 'recall', marks: 2,
  stem: 'Match each character in *Madam Rides the Bus* with what they do in the story.',
  pairs: [['Valli', 'plans and takes a secret bus ride'], ['The conductor', 'teases her as madam and offers a drink'], ['The elderly woman', 'fusses over a child travelling alone'], ['Valli’s mother', 'naps, unaware of the journey']],
  sol: 'The roles of the characters in the story.',
}));
Q('mt_words', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match these words useful for writing about Valli’s bus ride with their meanings.',
  pairs: [['fare', 'the money paid for a journey'], ['pastime', 'an activity done for enjoyment'], ['temptation', 'a strong wish to do something one should not'], ['mature', 'grown-up in thinking and behaviour']],
  sol: 'Key words for discussing this story.',
}));
Q('mt_valli_traits', match({
  t: 3, d: 3, c: 'analysis', marks: 2,
  stem: 'Match each of Valli’s actions with the quality it shows.',
  pairs: [['Saving every coin and skipping the fair', 'self-control'], ['Refusing help to climb into the bus', 'independence'], ['Learning the details of the trip from others', 'resourcefulness'], ['Turning away from the view after seeing the dead cow', 'sensitivity']],
  sol: 'Each action and the side of Valli’s character it reveals.',
}));
