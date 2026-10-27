// CBSE 10 English Language and Literature, ch06 "Two Stories About Flying" — question bank.
// Part I: His First Flight (Liam O'Flaherty). Part II: The Black Aeroplane (Frederick Forsyth).
// LITERATURE RULE (CONTEXT §8): no sentence, close paraphrase or distinctive phrase of either story appears
// here. Passages are SOYL commentary about an episode (passage_origin: soyl-commentary); stems refer to
// events in SOYL's own words. Students read the stories in their textbook, First Flight.
// Topics: t01 context and summary · t02 themes and message · t03 characters (the seagull's fear vs the
// pilot's situation) · t04 exam practice.
import { Q, mcq, fb, short, long, tf, ar, match, ord, source, child } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

const NOTE = '*(This passage is SOYL\'s commentary on the story, not an extract from it. Read the story itself in your textbook, First Flight.)*';
const SRC_STEM = `Read the commentary and answer the questions that follow. ${NOTE}`;
const SCHEME3 = [['Relevant point from the story (event or detail)', 1], ['Explanation or inference linked to the question', 1], ['Expression and accuracy within 40–50 words', 1]];
const SCHEME2 = [['Correct point from the story', 1], ['Explanation in own words within 30–40 words', 1]];
const LONG_SCHEME = [['Content: relevant points from the story, accurately used', 3], ['Interpretation / extrapolation: a clear view supported by the story', 1], ['Organisation and expression; within 100–120 words', 2]];

// ================================================================ extract-based (source-based, SOYL commentary)
// ---- Part I: His First Flight
Q('src_alone', source({
  t: [1, 3], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: `*His First Flight* (Liam O\'Flaherty). ${SRC_STEM}`,
  passage: 'The story opens with a young seagull in an uncomfortable position: alone. His two brothers and his sister managed their first flights the day before, even though his sister\'s wings were shorter than his. He too had run to the edge, but one look at the sea so far below convinced him that his wings would fail, and he retreated. His parents scolded him and even threatened to leave him to starve. O\'Flaherty does not mock the bird. He lets us see the fear from inside, so that the gap between what the young gull can do and what he believes he can do becomes the real subject of the story.',
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'Who had already flown before the story begins?', opts: ['his two brothers and his sister', 'only his elder brother', 'his parents\' other chicks from last year', 'none of the young gulls'], sol: 'His two brothers and his sister had flown the day before.' })),
    child('b', fb({ t: 1, d: 2, c: 'recall', stem: 'The young seagull\'s sister had wings that were ___ than his own.', acc: [['shorter', 'smaller']], sol: 'Her wings were **shorter** than his, yet she flew.' })),
    child('c', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Why did the young seagull turn back from the edge?', opts: ['He believed his wings would not hold him up.', 'He was injured.', 'His parents told him to wait.', 'The weather was stormy.'], sol: 'The height of the drop made him certain his wings would fail.' })),
    child('d', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'What does the commentary mean by the gap between what the gull *can do* and what he *believes he can do*?', model: 'He is physically able to fly, as his longer wings show, but fear makes him believe he cannot.', sol: 'His problem is lack of self-belief, not lack of ability.', scheme: [['Able to fly but held back by self-doubt / fear', 1]] })),
    child('e', mcq({ t: 3, d: 2, c: 'understanding', stem: 'How did his parents first respond to his refusal to fly?', opts: ['They scolded him and threatened to let him starve.', 'They carried him off the ledge.', 'They brought him food every hour.', 'They ignored his brothers and stayed with him.'], sol: 'They scolded him and warned that he would starve on the ledge unless he flew.' })),
  ],
  sol: 'Separate facts from the story (a, b, c, e) from the commentary\'s interpretation (d).',
}));
Q('src_watching', source({
  t: [1, 3], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: `*His First Flight* (Liam O\'Flaherty). ${SRC_STEM}`,
  passage: 'For a whole day nobody comes near the young gull. From his ledge he watches his family across the way: his parents coaching his brothers and sister over the water, showing them how to fly low and catch fish, and his elder brother eating his first herring. Instead of comforting him, the family jeers at his timidity. It sounds harsh, yet the parents seem to understand that sympathy would only keep him on the ledge. Meanwhile hunger grows. He has eaten nothing since the previous evening, and watching his mother tear at a piece of fish becomes almost unbearable.',
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'What did the young seagull\'s elder brother catch and eat?', opts: ['his first herring', 'a crab from the rocks', 'a piece of bread', 'a small bird'], sol: 'He watched his elder brother catch and eat his first herring.' })),
    child('b', fb({ t: 1, d: 2, c: 'recall', stem: 'The young seagull had eaten nothing since the previous ___.', acc: [['evening', 'nightfall', 'night', 'day']], sol: 'He had not eaten since the previous **evening** (nightfall).' })),
    child('c', mcq({ t: 3, d: 3, c: 'analysis', stem: 'According to the commentary, why might the parents refuse to comfort him?', opts: ['Sympathy would only keep him on the ledge.', 'They had forgotten him.', 'They did not have enough food.', 'They wanted him to stay at home.'], sol: 'Comfort would remove the pressure to fly; harshness pushes him towards it.' })),
    child('d', short({ t: 3, d: 4, c: 'evaluation', marks: 1, stem: 'Is the family\'s treatment of the young gull cruel or wise? Give your view in one sentence.', model: 'It looks cruel, but it is wise, because it forces him to face his fear instead of hiding from it.', sol: 'Either view is acceptable if reasoned; the stronger answer sees the purpose behind the harshness.', scheme: [['A clear view with a reason', 1]] })),
    child('e', mcq({ t: 1, d: 2, c: 'understanding', stem: 'What makes the young gull\'s hunger almost unbearable?', opts: ['watching his mother tear at a piece of fish', 'the smell of the sea', 'the sound of the waves', 'the heat of the night'], sol: 'Seeing food so close but out of reach sharpens his hunger.' })),
  ],
  sol: 'Read the commentary for the parents\' purpose (c, d) and the facts it mentions (a, b, e).',
}));
Q('src_trick', source({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: `*His First Flight* (Liam O\'Flaherty). ${SRC_STEM}`,
  passage: 'The turning point is a simple act by his mother. Hearing his hungry cries, she picks up a piece of fish and flies across to him, but she stops in mid-air just beyond his reach. The young gull, too hungry to think, lunges at the food and finds himself falling off the ledge. For a moment he is terrified; then his wings open, the air holds him, and he is flying. Whether or not the mother planned it, the effect is clear: hunger achieved in a second what a whole day of scolding could not.',
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'understanding', stem: 'What did the mother do with the piece of fish?', opts: ['She flew towards him but stopped just out of his reach.', 'She dropped it on his ledge.', 'She gave it to his brother.', 'She ate it in front of him.'], sol: 'She held the fish in mid-air just beyond his reach.' })),
    child('b', mcq({ t: 2, d: 2, c: 'understanding', stem: 'What made the young gull leap off the ledge?', opts: ['his hunger', 'a push from his father', 'a strong gust of wind', 'a wish to show off'], sol: 'Hunger made him lunge at the fish without thinking.' })),
    child('c', fb({ t: 1, d: 2, c: 'understanding', stem: 'As he fell, the young gull\'s first feeling was ___.', acc: [['terror', 'fear', 'fright']], sol: 'He felt **terror** for a moment before his wings opened.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Explain: *hunger achieved in a second what a whole day of scolding could not*.', model: 'A day of scolding did not make him fly, but one moment of hunger made him leap and discover he could.', sol: 'Need overcame fear where words had failed.', scheme: [['Need (hunger) succeeded where scolding failed', 1]] })),
    child('e', mcq({ t: 1, d: 2, c: 'recall', stem: 'What happened just after his moment of terror?', opts: ['His wings spread out and he began to fly.', 'He landed on the plateau.', 'His father caught him.', 'He fell into the sea and sank.'], sol: 'His wings opened, the air held him, and he flew.' })),
  ],
  sol: 'The key idea: hunger, not encouragement or scolding, finally overcomes fear.',
}));
Q('src_sea', source({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: `*His First Flight* (Liam O\'Flaherty). ${SRC_STEM}`,
  passage: 'Flight quickly feels natural to the young gull, as if it had always been so. He swoops and climbs, calling out with the rest of his family. Then comes a final, gentle comedy. Seeing his family settled on the green water, he lowers his legs as if to stand on solid ground, and panics when they sink. Exhausted and still unfed, he cannot rise again, but the water holds him up and he floats. His family gathers round, praising him and offering him food. The story ends not with a grand speech but with a hungry youngster discovering that the sea, too, is his home.',
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'understanding', stem: 'Why did the young gull lower his legs over the sea?', opts: ['He thought he could stand on it as on solid ground.', 'He wanted to catch a fish with his feet.', 'He was trying to wash his feathers.', 'His mother had told him to land.'], sol: 'Never having met water before, he treated the green sea as a surface to stand on.' })),
    child('b', fb({ t: 1, d: 1, c: 'recall', stem: 'At the end, the young gull does not sink but ___ on the water.', acc: [['floats', 'floated', 'floating']], sol: 'He **floats** on the sea.' })),
    child('c', mcq({ t: 1, d: 2, c: 'understanding', stem: 'How does his family react at the end?', opts: ['They praise him and offer him food.', 'They scold him for being slow.', 'They fly away and leave him.', 'They push him back to the ledge.'], sol: 'They gather round, praising him and feeding him.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Why does the commentary call the landing a *gentle comedy*?', model: 'His mistake of trying to stand on water is funny, but nothing bad happens; he floats safely and is welcomed.', sol: 'It is amusing but harmless, and it ends happily.', scheme: [['A funny mistake with a safe, happy result', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What does the commentary suggest by *the sea, too, is his home*?', opts: ['He has gained a new world through his new skill.', 'He will never fly again.', 'Seagulls live only in the water.', 'He wants to leave his family.'], sol: 'Overcoming his fear opens up both the air and the sea to him.' })),
  ],
  sol: 'Parts (a)–(c) are facts from the ending; (d) and (e) interpret it.',
}));
// ---- Part II: The Black Aeroplane
Q('src_risk', source({
  t: [1, 3], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: `*The Black Aeroplane* (Frederick Forsyth). ${SRC_STEM}`,
  passage: 'The pilot\'s trouble begins with a choice. Flying his old Dakota from France towards England at night, he is in high spirits, thinking about his holiday, his family and breakfast at home. Then he sees enormous storm clouds ahead. With too little fuel for a long detour and no way above the clouds, the safe choice is to turn back to Paris. He considers it, and decides instead to take the risk and fly straight into the storm. The decision is very human: the closer we feel to home, the more tempted we are to ignore danger.',
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'What kind of aeroplane was the narrator flying?', opts: ['an old Dakota', 'a new passenger jet', 'a military helicopter', 'a small glider'], sol: 'He was flying an old Dakota.' })),
    child('b', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Why did the pilot fly into the storm instead of turning back?', opts: ['He wanted to get home to his family and his breakfast.', 'Paris Control ordered him to.', 'He wanted to test his aeroplane.', 'He did not see the clouds in time.'], sol: 'His eagerness to reach home made him take the risk.' })),
    child('c', fb({ t: 1, d: 1, c: 'recall', stem: 'The safe choice was to fly back to ___.', acc: [['Paris']], sol: 'Turning back to **Paris** was the safe option.' })),
    child('d', short({ t: 3, d: 4, c: 'evaluation', marks: 1, stem: 'Was the pilot\'s decision wise? Give your view in one sentence.', model: 'No; with little fuel and a huge storm ahead, risking his life for an earlier breakfast was reckless.', sol: 'A reasoned view; most readers judge it reckless, though understandable.', scheme: [['A clear view with a reason from the story', 1]] })),
    child('e', mcq({ t: 1, d: 2, c: 'understanding', stem: 'What was the pilot looking forward to before he saw the storm?', opts: ['his holiday and breakfast with his family', 'a new job in Paris', 'a flying competition', 'meeting the other pilot'], sol: 'He was thinking of his holiday, his family and breakfast in England.' })),
  ],
  sol: 'The key idea: a human wish (to get home) overrides good judgement.',
}));
Q('src_storm', source({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: `*The Black Aeroplane* (Frederick Forsyth). ${SRC_STEM}`,
  passage: 'Inside the storm, the pilot loses every tool a pilot depends on. Everything outside turns black. His compass becomes useless, his other instruments stop working, and his radio no longer reaches Paris Control. He is lost, and his fuel is running low. Forsyth tells this part in short, plain statements, and the plainness adds to the fear: there is no room for description when survival is at stake. The reader shares the pilot\'s isolation. A man who began the night in charge of his journey is now completely helpless.',
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'recall', stem: 'What happened to the pilot\'s compass in the storm?', opts: ['It stopped working.', 'It pointed the way home.', 'It fell out of the cockpit.', 'It was repaired by the other pilot.'], sol: 'The compass went dead, along with his other instruments.' })),
    child('b', fb({ t: 1, d: 1, c: 'recall', stem: 'In the storm, the radio could no longer reach Paris ___.', acc: [['Control']], sol: 'He could not contact Paris **Control**.' })),
    child('c', mcq({ t: 1, d: 3, c: 'analysis', stem: 'According to the commentary, why does the plain style add to the fear?', opts: ['There is no room for description when survival is at stake.', 'It makes the story funnier.', 'It shows the pilot is bored.', 'It slows the story down.'], sol: 'Short, bare statements match the urgency of the danger.' })),
    child('d', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'What contrast does the commentary draw between the pilot at the start of the night and inside the storm?', model: 'At first he was confident and in control of his journey; in the storm he is lost and helpless.', sol: 'Control and high spirits give way to helplessness.', scheme: [['In control / confident → lost / helpless', 1]] })),
    child('e', mcq({ t: 1, d: 2, c: 'understanding', stem: 'Besides his instruments, what else was running out?', opts: ['his fuel', 'his oxygen', 'his food', 'his time off work'], sol: 'His fuel was low, which made the danger worse.' })),
  ],
  sol: 'Separate the facts (a, b, e) from the commentary\'s analysis of style and character (c, d).',
}));
Q('src_guide', source({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: `*The Black Aeroplane* (Frederick Forsyth). ${SRC_STEM}`,
  passage: 'Just when hope is gone, the pilot sees another aeroplane flying beside him in the clouds. It is black, and it shows no lights on its wings. Its pilot signals to him to follow, and he obeys gratefully, with no idea who the stranger is. Following blindly is itself an act of trust: he has no instruments to tell him where he is being taken. The black aeroplane leads him down through the cloud until two lines of runway lights appear ahead. When he looks round for his guide, the sky is empty.',
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'What was unusual about the black aeroplane?', opts: ['It had no lights on its wings.', 'It was much larger than a Dakota.', 'It was flying upside down.', 'It had no pilot.'], sol: 'It flew without lights, which made it strange in a dark storm.' })),
    child('b', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Why does the commentary call following the black aeroplane *an act of trust*?', opts: ['He had no instruments to check where he was being led.', 'He knew the other pilot well.', 'Paris Control told him to trust it.', 'The other aeroplane belonged to his company.'], sol: 'Without a compass or radio, he had to rely completely on a stranger.' })),
    child('c', fb({ t: 1, d: 2, c: 'understanding', stem: 'When the pilot looked round for his guide, the black aeroplane had ___.', acc: [['disappeared', 'vanished', 'gone']], sol: 'The sky was empty: the aeroplane had **disappeared**.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'How does the sudden disappearance of the guide affect the reader?', model: 'It creates mystery and makes the reader wonder whether the black aeroplane was real at all.', sol: 'The vanishing turns relief into suspense and doubt.', scheme: [['Creates mystery / doubt about whether it was real', 1]] })),
    child('e', mcq({ t: 1, d: 2, c: 'understanding', stem: 'What told the pilot that he had reached safety?', opts: ['two lines of runway lights ahead of him', 'the voice of Paris Control', 'the sight of the English coast at dawn', 'a message from the other pilot'], sol: 'The runway lights of an airport appeared below the cloud.' })),
  ],
  sol: 'Parts (a), (c) and (e) are facts; (b) and (d) interpret them.',
}));
Q('src_mystery', source({
  t: [2, 4], d: 4, c: 'evaluation', origin: 'soyl-commentary',
  stem: `*The Black Aeroplane* (Frederick Forsyth). ${SRC_STEM}`,
  passage: 'The last scene turns relief into mystery. After landing safely, the pilot asks a woman in the control centre about the other aircraft. She tells him that no other aeroplane was flying that night; only his showed on the radar. Forsyth offers no explanation. Was it a ghost, a guardian angel, a vision produced by fear and exhaustion, or simple luck? Leaving the question open is the point. Each reader must decide, and the uncertainty stays with us long after the story ends.',
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'Whom does the pilot ask about the black aeroplane after landing?', opts: ['a woman in the control centre', 'the other pilot', 'Paris Control by radio', 'his family'], sol: 'He asks a woman working in the control centre.' })),
    child('b', mcq({ t: 1, d: 2, c: 'understanding', stem: 'What did the radar show that night, according to her?', opts: ['only the narrator\'s aeroplane', 'two aeroplanes flying together', 'no aeroplanes at all', 'a storm with no aircraft'], sol: 'Only his aeroplane was on the radar; no other was flying.' })),
    child('c', fb({ t: 2, d: 2, c: 'understanding', stem: 'Because Forsyth gives no explanation, the story has an ___ ending.', acc: [['open', 'unresolved', 'open-ended']], sol: 'It has an **open** ending: the reader decides.' })),
    child('d', short({ t: [2, 4], d: 4, c: 'evaluation', marks: 1, stem: 'Which explanation of the black aeroplane do you find most convincing? Give one reason.', model: 'A guardian angel, because the stranger appeared at the moment of greatest need and vanished as soon as the pilot was safe.', sol: 'Any explanation listed (or another) is acceptable with a reason drawn from the story.', scheme: [['An explanation with a reason from the story', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Why, according to the commentary, does Forsyth leave the question unanswered?', opts: ['so that each reader must decide, and the mystery lingers', 'because he forgot to finish the story', 'because the pilot was lying', 'because the woman was mistaken'], sol: 'An open ending keeps the reader thinking long after the story ends.' })),
  ],
  sol: 'For open endings, any reasoned interpretation is acceptable; the facts (a, b) are fixed.',
}));

// ================================================================ short answers, 3 marks (40–50 words)
const SA3 = { marks: 3, wl: [40, 50], scheme: SCHEME3, time: 240 };
Q('sa_why_afraid', short({
  ...SA3, t: 3, d: 2, c: 'understanding',
  stem: '*His First Flight*: Why did the young seagull fail to fly with his brothers and sister? Answer in 40–50 words.',
  model: 'Whenever the young seagull ran to the edge of his ledge, the sea far below looked frightening. He felt sure his wings would not support him, so he ran back to safety. His fear came from lack of confidence, not lack of ability.',
  sol: 'What happened at the edge + the belief that his wings would fail + the conclusion (fear, not inability).',
}));
Q('sa_parents', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: '*His First Flight*: How did the young gull\'s parents try to make him fly, and what finally worked? Answer in 40–50 words.',
  model: 'At first his parents scolded him and threatened to let him starve, and the family mocked his cowardice. None of this worked. What succeeded was hunger: his mother brought fish close but held it just out of reach, and he leapt for it.',
  sol: 'Methods that failed (scolding, threats, mockery) + what worked (hunger and the mother\'s trick).',
}));
Q('sa_hunger', short({
  ...SA3, t: 2, d: 3, c: 'analysis',
  stem: '*His First Flight*: What part does hunger play in the young seagull\'s first flight? Answer in 40–50 words.',
  model: 'Hunger is the force that overcomes his fear. After a day without food, the sight of fish becomes too much for him. When his mother hovers with a piece just beyond his reach, hunger makes him dive without thinking, and he discovers he can fly.',
  sol: 'His hunger (no food since the previous evening) + how it leads to the leap + what it shows (need overcomes fear).',
}));
Q('sa_fall', short({
  ...SA3, t: 1, d: 2, c: 'understanding',
  stem: '*His First Flight*: Describe the young gull\'s feelings from the moment he fell off the ledge until he was flying. Answer in 40–50 words.',
  model: 'As he fell, he was overcome by terror for a moment. Then his wings opened and the air supported him. His fear disappeared, leaving only slight dizziness, and soon he was soaring and calling out joyfully alongside his parents, brothers and sister.',
  sol: 'Terror → wings open → fear gone, slight dizziness → joy and confidence.',
}));
Q('sa_title_hff', short({
  ...SA3, t: [2, 4], d: 4, c: 'evaluation',
  stem: '*His First Flight*: Is the title of the story suitable? Give your view in 40–50 words.',
  model: 'Yes. The whole story builds towards one event: the young gull\'s first flight. His fear, his family\'s pressure and his hunger all lead to that moment. The title also suggests every first attempt we fear, so it fits both the bird and the reader.',
  sol: 'A stand + how the story centres on the first flight + a wider meaning of "first flight".',
}));
Q('sa_lesson_hff', short({
  ...SA3, t: 2, d: 3, c: 'application',
  stem: '*His First Flight*: What lesson can a student facing a new challenge learn from the young seagull? Answer in 40–50 words.',
  model: 'The young gull could always fly; only fear stopped him. A student afraid of a debate, a swimming class or a board exam may also be more capable than she believes. Once she takes the first step, the fear fades and confidence grows quickly.',
  sol: 'The lesson (fear, not ability, holds us back) + an application to a student\'s situation + the outcome.',
}));
Q('sa_take_risk', short({
  ...SA3, t: 3, d: 4, c: 'evaluation',
  stem: '*The Black Aeroplane*: The pilot chose to fly into the storm. Was he brave or foolish? Answer in 40–50 words.',
  model: 'I think he was foolish. He knew the safe choice was to return to Paris, yet he risked his life because he wanted to reach home for breakfast. Bravery means facing danger for a good reason; he faced it out of impatience.',
  sol: 'A stand + the facts (safe option known; reason for the risk) + the distinction between bravery and recklessness. A reasoned "brave" answer can also earn full marks.',
}));
Q('sa_helpless', short({
  ...SA3, t: 1, d: 2, c: 'understanding',
  stem: '*The Black Aeroplane*: Why did the pilot feel helpless inside the storm? Answer in 40–50 words.',
  model: 'Inside the storm everything was black, so he could see nothing. His compass and other instruments stopped working, and the radio could not reach Paris Control. With no idea where he was and very little fuel left, he had no way to save himself.',
  sol: 'No visibility + dead instruments and radio + low fuel → helplessness.',
}));
Q('sa_follow', short({
  ...SA3, t: 2, d: 3, c: 'analysis',
  stem: '*The Black Aeroplane*: Why did the pilot follow the black aeroplane, and what does this tell us about him at that moment? Answer in 40–50 words.',
  model: 'The pilot was lost, his instruments were dead and his fuel was nearly gone, so the stranger\'s signal was his only hope. Following without question shows that he was desperate but also grateful and trusting. He had learnt that he could not save himself alone.',
  sol: 'His situation (lost, no instruments, low fuel) + why he followed + what it shows (desperation, trust, humility).',
}));
Q('sa_radar', short({
  ...SA3, t: 1, d: 2, c: 'understanding',
  stem: '*The Black Aeroplane*: What did the pilot learn in the control centre, and why did it surprise him? Answer in 40–50 words.',
  model: 'A woman in the control centre told him that no other aeroplane had been flying that night; only his own had shown on the radar. This amazed him, because a black aeroplane had just guided him through the storm to the airport.',
  sol: 'What he was told (no other aeroplane; only his on radar) + why it was startling (he had been guided).',
}));
Q('sa_compare_fear', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'Compare the young seagull\'s fear with the pilot\'s situation in the storm. Answer in 40–50 words.',
  model: 'The seagull\'s fear was inside him: he could fly but did not believe it. The pilot\'s danger was outside him: he was a skilled flier, but the storm destroyed his instruments. The seagull needed courage; the pilot needed rescue after taking a foolish risk.',
  sol: 'Seagull: inner fear, ability doubted. Pilot: outer danger, skill made useless. Conclude with the difference in what each needed.',
}));
Q('sa_help', short({
  ...SA3, t: 2, d: 3, c: 'analysis',
  stem: 'In both stories about flying, help comes from someone else. Compare the help each flier receives. Answer in 40–50 words.',
  model: 'The young seagull is helped by his mother, who tempts him with fish until hunger makes him leap. The pilot is helped by a mysterious black aeroplane that guides him to a runway. The mother\'s help is known and natural; the pilot\'s helper remains unexplained.',
  sol: 'The helper in each story + how they help + the contrast (known and natural vs mysterious).',
}));

// ================================================================ short answers, 2 marks (30–40 words)
const SA2 = { marks: 2, wl: [30, 40], scheme: SCHEME2, time: 150 };
Q('sb_pretend', short({
  ...SA2, t: 1, d: 2, c: 'understanding',
  stem: '*His First Flight*: What did the young gull do on the ledge to get his family\'s attention, and did it work? Answer in 30–40 words.',
  model: 'He pretended to doze off on his ledge, hoping his family would notice him and bring food. It did not work: they took no notice, and only his mother kept watching him.',
  sol: 'The pretence + its failure (no notice taken, except by his mother).',
}));
Q('sb_plateau', short({
  ...SA2, t: 1, d: 1, c: 'recall',
  stem: '*His First Flight*: What was the rest of the family doing while the young gull waited on his ledge? Answer in 30–40 words.',
  model: 'The day before, his parents had been teaching his brothers and sister to fly well and to catch fish. All morning the whole family walked about on a plateau across the way, mocking his fear.',
  sol: 'Teaching the others to fly and fish + mocking him from the plateau.',
}));
Q('sb_landing', short({
  ...SA2, t: 1, d: 2, c: 'understanding',
  stem: '*His First Flight*: Why was the young gull frightened when he came down on the sea? Answer in 30–40 words.',
  model: 'He tried to stand on the green water as if it were solid ground, and his legs sank. Tired and unfed, he could not rise again, but he soon found that he could float.',
  sol: 'The mistake (trying to stand) + the fright (legs sank) + the outcome (he floats).',
}));
Q('sb_journey', short({
  ...SA2, t: 1, d: 1, c: 'recall',
  stem: '*The Black Aeroplane*: Where was the narrator flying from and to, and why was he happy at the start? Answer in 30–40 words.',
  model: 'He was flying his old Dakota from France back to England at night. He was happy because he was going home on holiday and looked forward to breakfast with his family.',
  sol: 'Route (France to England) + reason for happiness (holiday, family, breakfast).',
}));
Q('sb_no_return', short({
  ...SA2, t: 3, d: 2, c: 'understanding',
  stem: '*The Black Aeroplane*: Why did the pilot not turn back to Paris when he saw the storm clouds? Answer in 30–40 words.',
  model: 'Although returning to Paris was the safe choice, he wanted badly to get home to England and his family. So he decided to take the risk and fly straight into the storm.',
  sol: 'The safe option he rejected + his reason (eagerness to get home).',
}));
Q('sb_runway', short({
  ...SA2, t: 1, d: 2, c: 'understanding',
  stem: '*The Black Aeroplane*: How did the pilot reach safety after following the black aeroplane? Answer in 30–40 words.',
  model: 'The black aeroplane led him down out of the cloud until he saw the two lines of lights of a runway. He landed safely, though his guide had already disappeared.',
  sol: 'The guide leads him down + the runway lights + a safe landing (guide gone).',
}));

// ================================================================ long answers, 6 marks (100–120 words)
const LA = { marks: 6, wl: [100, 120], scheme: LONG_SCHEME, time: 720 };
Q('la_seagull', long({
  ...LA, t: [3, 4], d: 3, c: 'analysis',
  stem: '*His First Flight*: Trace how the young seagull changes from a frightened fledgling into a confident flier. Answer in 100–120 words.',
  model: 'At the start, the young seagull is alone on his ledge, because fear stopped him from flying with his brothers and sister. He is sure his wings will fail him, even though they are longer than his sister\'s. His family scolds and mocks him, but he stays where he is. Gradually hunger takes over. After a day without food, he begs his mother for fish. When she hovers just out of reach, he lunges and falls. Terror lasts only a moment; his wings open and he flies. Soon he is diving and calling with his family, and he even floats on the sea. His story shows that confidence follows action, not the other way round.',
  sol: 'Trace the stages: fear and isolation → failed pressure → hunger → the leap → terror → flight → joy and the sea. Conclude with what the change shows.',
}));
Q('la_mother', long({
  ...LA, t: [3, 2], d: 4, c: 'evaluation',
  stem: '*His First Flight*: The young seagull\'s mother is harsh but wise. Do you agree? Give reasons in 100–120 words.',
  model: 'I agree that the mother is harsh but wise. Along with the father, she scolds the young gull, threatens to let him starve and joins the family in mocking his fear. She also gives him no food for a whole day. This seems cruel, but she understands her son. Sympathy would have kept him safe but grounded, and a gull that never flies will not live long. Her final act is the wisest: she brings fish close but stops just beyond his reach, so that hunger overcomes fear. The moment he flies, she is beside him, calling to him and later feeding him on the sea. Her harshness is a form of love that prepares him for life.',
  sol: 'A stand + evidence of harshness (scolding, threats, no food, mockery) + evidence of wisdom (the fish trick; her support once he flies) + a conclusion. A reasoned disagreement can also earn full marks.',
}));
Q('la_seagull_diary', long({
  ...LA, t: [4, 3], d: 4, c: 'application', bloom: 'create',
  stem: '*His First Flight*: Imagine you are the young seagull. Write a diary entry on the night after your first flight, in 100–120 words.',
  model: 'Night, on the sea\n\nWhat a day! This morning I was alone on my ledge, hungry and ashamed. Yesterday my brothers and my little sister flew, and I could not. Everyone laughed at me. Today Mother flew towards me with a piece of fish and stopped just short. I was so hungry that I jumped for it, and suddenly I was falling. I have never been so frightened. Then my wings opened and the wind held me up. I was flying! Later I tried to stand on the sea and nearly panicked, but it held me too. Mother and Father praised me and fed me. I wasted a whole day being afraid of something I could already do.',
  sol: 'Diary format (time, first person, feelings). Content consistent with the story: alone, siblings flew the day before, hunger, the mother\'s fish, the fall and flight, the sea, praise and food. Reflection in character.',
}));
Q('la_reckless', long({
  ...LA, t: [2, 3], d: 4, c: 'evaluation',
  stem: '*The Black Aeroplane*: The pilot\'s narrow escape was the result of his own reckless decision. Discuss in 100–120 words.',
  model: 'The pilot\'s danger was largely of his own making. Flying his old Dakota home, he saw huge storm clouds ahead. He knew he could not go above them and lacked the fuel to fly round them, so the sensible choice was to return to Paris. Instead, eager for his holiday and breakfast with his family, he flew straight into the storm. The result was nearly fatal: his compass, instruments and radio failed, and his fuel ran low. Only the mysterious black aeroplane saved him. His escape was therefore luck, not skill. The story warns that impatience can make even an experienced person ignore danger, and that safety must come before personal wishes.',
  sol: 'The decision and the alternative he rejected + why he chose it + its consequences + the role of luck or mystery in his escape + the lesson.',
}));
Q('la_mystery', long({
  ...LA, t: [2, 4], d: 4, c: 'evaluation',
  stem: '*The Black Aeroplane*: Who, in your view, was the pilot of the black aeroplane? Support your answer with details from the story in 100–120 words.',
  model: 'The story never says who the pilot of the black aeroplane was, so the reader must decide. I believe it was a guardian angel, or some protecting force. The aeroplane appeared exactly when the narrator was lost, with dead instruments and almost no fuel. It flew without lights in a storm, which no real pilot would risk, and it vanished as soon as the runway lights appeared. Most tellingly, the woman in the control centre said only one aeroplane had been on the radar. A real aircraft would have shown up. Some readers think it was a dream caused by fear, but the safe landing was real. Forsyth leaves the mystery open deliberately.',
  sol: 'A clear view (ghost, angel, imagination, luck, or another) + supporting details (timing, no lights, disappearance, the radar) + acknowledgement of other views + a note on the open ending.',
}));
Q('la_pilot_letter', long({
  ...LA, t: [4, 2], d: 4, c: 'application', bloom: 'create',
  stem: '*The Black Aeroplane*: As the pilot, write a letter to a close friend describing that night and what it taught you, in 100–120 words.',
  model: 'Dear Tom,\n\nI must tell you about the strangest night of my life. I was flying the old Dakota home from France, dreaming of breakfast with the family. Then I saw a wall of storm clouds. I should have turned back to Paris, but I wanted to get home, so I flew straight in. Within minutes my compass and radio were dead, and my fuel was low. Then another aeroplane, black and without lights, appeared and signalled me to follow. It led me to a runway and vanished. The control centre says no other aeroplane was flying. I still cannot explain it. I have learnt never to gamble with safety again.\n\nYours,\nDavid',
  sol: 'Informal letter format. Content consistent with the story (route, the decision, the failures, the black aeroplane, the runway, the radar) + a lesson learnt. The narrator is unnamed in the story; any name is the student\'s choice.',
}));
Q('la_compare', long({
  ...LA, t: [3, 2], d: 4, c: 'analysis',
  stem: 'Both stories in this chapter are about flying, fear and help. Compare them in 100–120 words.',
  model: 'Both stories show a flier in danger who is saved with help. The young seagull is afraid of his very first flight. His fear is inside him, because his wings are strong enough. His family\'s scolding fails, but his mother uses his hunger to make him leap, and he discovers he can fly. The pilot, by contrast, is experienced and confident. His danger comes from outside, from a storm he chose to enter. When his instruments fail, a mysterious black aeroplane guides him to safety. The seagull must find courage; the pilot must learn humility. In both, a moment of terror leads to safety, but only the seagull\'s helper is ever explained.',
  sol: 'Similarities (danger, fear, help, safe ending) + differences (inner fear vs outer danger; beginner vs expert; known helper vs mystery; courage vs humility). Conclude with the key contrast.',
}));

// ================================================================ objective items
Q('mc_author_hff', mcq({ t: 1, d: 1, c: 'recall', stem: 'Who wrote *His First Flight*?', opts: ['Liam O\'Flaherty', 'Frederick Forsyth', 'Robert Frost', 'Gavin Maxwell'], sol: '*His First Flight* is by the Irish writer Liam O\'Flaherty; *The Black Aeroplane* is by Frederick Forsyth.' }));
Q('mc_author_ba', mcq({ t: 1, d: 1, c: 'recall', stem: 'Who wrote *The Black Aeroplane*?', opts: ['Frederick Forsyth', 'Liam O\'Flaherty', 'Anne Frank', 'G. L. Fuentes'], sol: 'Frederick Forsyth, the English thriller writer.' }));
Q('mc_siblings', mcq({ t: 1, d: 2, c: 'recall', stem: 'How many brothers and sisters did the young seagull have?', opts: ['two brothers and one sister', 'one brother and two sisters', 'three brothers', 'no brothers or sisters'], sol: 'Two brothers and a sister, all of whom flew before him.' }));
Q('mc_hunger', mcq({ t: 2, d: 2, c: 'understanding', stem: 'What finally made the young seagull fly?', opts: ['hunger, when his mother held fish just out of reach', 'a push from his elder brother', 'a strong wind that blew him off the ledge', 'his father\'s praise'], sol: 'Hunger drove him to dive at the fish, and he found himself flying.' }));
Q('mc_mother_role', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Which word best describes the mother\'s act of stopping just short of the ledge with the fish?', opts: ['clever', 'careless', 'cruel for its own sake', 'forgetful'], sol: 'Holding the fish out of reach cleverly uses his hunger to overcome his fear.' }));
Q('mc_sea_mistake', mcq({ t: 1, d: 2, c: 'understanding', stem: 'Why did the young seagull scream when he landed on the sea?', opts: ['His legs sank because he expected solid ground.', 'A fish bit his foot.', 'He saw a ship coming.', 'His family flew away.'], sol: 'He tried to stand on the water, and his legs sank.' }));
Q('mc_hff_theme', mcq({ t: 2, d: 2, c: 'understanding', stem: 'Which is the main theme of *His First Flight*?', opts: ['overcoming fear and building self-confidence', 'the cruelty of nature', 'friendship between birds and humans', 'the danger of greed'], sol: 'The story is about a young bird overcoming fear and discovering what he can do.' }));
Q('mc_dakota', mcq({ t: 1, d: 1, c: 'recall', stem: 'Where was the narrator of *The Black Aeroplane* trying to reach?', opts: ['England', 'Paris', 'Germany', 'Spain'], sol: 'He was flying from France back home to England.' }));
Q('mc_why_risk', mcq({ t: 3, d: 3, c: 'analysis', stem: 'What does the pilot\'s decision to enter the storm show about him at that moment?', opts: ['He let his eagerness to get home override caution.', 'He was following orders from Paris Control.', 'He wanted to rescue the black aeroplane.', 'He did not know a storm was ahead.'], sol: 'He knew the safe choice but chose risk because he wanted to get home.' }));
Q('mc_radar', mcq({ t: 1, d: 2, c: 'recall', stem: 'What did the woman in the control centre tell the pilot?', opts: ['No other aeroplane had been flying; only his was on the radar.', 'The black aeroplane had landed just before him.', 'Paris Control had sent the black aeroplane.', 'His radio had been working all along.'], sol: 'She said only his aeroplane had appeared on the radar.' }));
Q('mc_open_ending', mcq({ t: [2, 4], d: 3, c: 'analysis', stem: 'The ending of *The Black Aeroplane* is best described as…', opts: ['an open ending that leaves a mystery', 'a happy reunion with the other pilot', 'a flashback to the pilot\'s childhood', 'a moral stated directly by the author'], sol: 'The story ends with an unanswered question about the black aeroplane.' }));
Q('mc_narrator_ba', mcq({ t: 1, d: 2, c: 'understanding', stem: 'From whose point of view is *The Black Aeroplane* told?', opts: ['the pilot\'s, in the first person', 'the woman in the control centre\'s', 'a third-person narrator who knows everything', 'the pilot of the black aeroplane\'s'], sol: 'The pilot tells his own story in the first person, so we share his confusion.' }));
Q('mc_compare', mcq({ t: 3, d: 3, c: 'analysis', stem: 'How is the seagull\'s problem different from the pilot\'s?', opts: ['The seagull fears what he can already do; the pilot faces a real danger he chose.', 'The seagull is in a storm; the pilot is on a ledge.', 'Both are beginners who have never flown.', 'The seagull is helped by a stranger; the pilot by his mother.'], sol: 'The seagull\'s problem is inner fear; the pilot\'s is an outer danger caused by his own risk.' }));
Q('mc_apply_hff', mcq({ t: [2, 4], d: 3, c: 'application', stem: 'Which situation is most like the young seagull\'s?', opts: ['Tanvi can swim well in practice but is too scared to jump into the deep end.', 'Arjun has never learnt to swim and has no lessons.', 'Mira wins a race she trained hard for.', 'Kabir loses his way in a new city.'], sol: 'Like the gull, Tanvi has the ability but is held back by fear.' }));
Q('mc_suspense', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Which detail does most to build suspense in *The Black Aeroplane*?', opts: ['the failure of the compass, radio and other instruments', 'the pilot\'s thoughts about breakfast', 'the name of his aeroplane', 'his conversation with Paris Control before the storm'], sol: 'With every instrument dead and fuel low, the reader fears for his life.' }));

Q('fb_herring', fb({ t: 1, d: 1, c: 'recall', stem: 'The young seagull watched his elder brother catch his first ___.', acc: [['herring']], sol: 'His elder brother caught a **herring**.' }));
Q('fb_ledge', fb({ t: 1, d: 1, c: 'recall', stem: 'At the start of the story, the young seagull is alone on his ___.', acc: [['ledge']], sol: 'He is alone on his **ledge**.' }));
Q('fb_dakota', fb({ t: 1, d: 1, c: 'recall', stem: 'The narrator of *The Black Aeroplane* was flying an old ___.', acc: [['Dakota']], sol: 'An old **Dakota**.' }));
Q('fb_lights', fb({ t: 1, d: 2, c: 'recall', stem: 'The black aeroplane had no ___ on its wings.', acc: [['lights']], sol: 'It flew without **lights**.' }));
Q('fb_both', fb({ t: [2, 3], d: 2, c: 'analysis', marks: 1, stem: 'The seagull is saved by his ___, who tempts him with fish; the pilot is saved by a mysterious black ___.', acc: [['mother'], ['aeroplane', 'airplane', 'plane']], sol: 'The **mother** helps the seagull; a black **aeroplane** helps the pilot.', scheme: [['mother', 0.5], ['aeroplane', 0.5]] }));

Q('ar_wings', ar({ t: 3, d: 3, c: 'analysis', a: 'The young seagull was physically able to fly.', r: 'His wings were longer than his sister\'s, and she had flown.', key: 'a', sol: 'Both are true, and R explains A: if his shorter-winged sister could fly, so could he.' }));
Q('ar_ignore', ar({ t: 1, d: 3, c: 'analysis', a: 'The family took no notice when the young gull pretended to fall asleep.', r: 'His elder brother had caught his first herring.', key: 'b', sol: 'Both are true, but the brother\'s catch does not explain why they ignored him; they wanted to force him to fly.' }));
Q('ar_paris', ar({ t: 3, d: 3, c: 'analysis', a: 'Paris Control ordered the pilot to fly into the storm.', r: 'The pilot wanted to reach England in time for breakfast.', key: 'd', sol: 'A is false: the decision was his own. R is true, and it explains his real reason.' }));
Q('ar_radar', ar({ t: 2, d: 3, c: 'analysis', a: 'The pilot landed safely after following the black aeroplane.', r: 'The woman in the control centre saw the black aeroplane on the radar.', key: 'c', sol: 'A is true. R is false: she saw only his aeroplane on the radar, which is what makes the ending mysterious.' }));

Q('tf_starve', tf({ t: 1, d: 1, c: 'recall', stem: 'True or false: the young gull\'s parents threatened to let him starve on his ledge unless he flew.', ans: true, sol: 'They warned him he would starve there unless he flew.' }));
Q('tf_father_fish', tf({ t: 1, d: 2, c: 'recall', stem: 'True or false: it was his father who flew towards the young gull with the piece of fish.', ans: false, sol: 'It was his mother.' }));
Q('tf_storm_over', tf({ t: 1, d: 2, c: 'recall', stem: 'True or false: the pilot flew above the storm clouds to avoid them.', ans: false, sol: 'He could not go above them; he flew straight into the storm.' }));
Q('tf_vanish', tf({ t: 1, d: 1, c: 'recall', stem: 'True or false: when the pilot looked for the black aeroplane after seeing the runway, it had disappeared.', ans: true, sol: 'The sky was empty; his guide was gone.' }));

Q('ord_hff', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: '*His First Flight*: Arrange the events in the order in which they happen.',
  items: ['His brothers and sister fly for the first time while he stays behind.', 'He watches his family from the ledge, hungry and mocked.', 'He begs his mother for food.', 'She hovers with a piece of fish just out of his reach.', 'He dives at the fish, falls, and then flies.', 'He comes down on the sea and floats.'],
  sol: 'Siblings fly → he watches, hungry → he begs → the fish held out of reach → the dive and flight → floating on the sea.',
}));
Q('ord_ba', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: '*The Black Aeroplane*: Arrange the events in the order in which they happen.',
  items: ['The pilot flies home happily, thinking of breakfast.', 'He sees huge storm clouds ahead.', 'He decides to fly into the storm.', 'His compass, instruments and radio fail.', 'A black aeroplane appears and signals him to follow.', 'He lands and learns that no other aeroplane was on the radar.'],
  sol: 'Happy flight → storm sighted → the risky decision → instruments fail → the black aeroplane → landing and the radar mystery.',
}));

Q('mt_stories', match({
  t: 1, d: 2, c: 'recall', marks: 2,
  stem: 'Match each item with the correct story or detail.',
  pairs: [['Liam O\'Flaherty', 'author of *His First Flight*'], ['Frederick Forsyth', 'author of *The Black Aeroplane*'], ['A plateau on the opposite cliff', 'where the seagull\'s family rested'], ['Paris Control', 'the radio contact the pilot lost']],
  sol: 'Authors and settings of the two stories.',
}));
Q('mt_words', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each word from the two flying stories with its meaning.',
  pairs: [['ledge', 'a narrow shelf on the face of a cliff'], ['plateau', 'an area of flat, high ground'], ['preening', 'cleaning and arranging feathers with the beak'], ['radar', 'a system that detects aircraft by radio waves']],
  sol: 'Words from the two stories with their meanings.',
}));
Q('mt_features', match({
  t: [2, 3], d: 3, c: 'analysis', marks: 2,
  stem: 'Match each feature with the story or character it describes best.',
  pairs: [['Fear of what he can already do', 'the young seagull'], ['A risk taken out of impatience', 'the pilot'], ['Help through hunger', 'the seagull\'s mother'], ['Help that is never explained', 'the black aeroplane']],
  sol: 'Inner fear, a reckless choice, a natural helper and a mysterious one.',
}));
