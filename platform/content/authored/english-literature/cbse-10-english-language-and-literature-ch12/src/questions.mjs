// CBSE 10 English Language and Literature, ch12 "The Proposal" (Anton Chekhov) — question bank.
// LITERATURE RULE (CONTEXT §8): no line of dialogue, stage direction, sentence or distinctive phrase of the
// play appears here. Extract items are SOYL commentary on a dialogue exchange, with speech reported and
// attributed by name (passage_origin: soyl-commentary). Students read the play itself in First Flight.
// Topics: t01 context and summary · t02 themes and message · t03 characters · t04 narrative techniques
// and language (farce, irony, stage directions) · t05 exam practice.
// Facts deliberately left out (cannot be confirmed without the text): the characters' ages, the prices
// of the dogs, the value put on the meadows, the details of the family insults, and the year of the play.
import { Q, mcq, fb, short, long, tf, ar, match, ord, source, child } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

const NOTE = "*(This passage is SOYL's commentary on a scene from the play, with speech reported in SOYL's words; it is not an extract from the play. Read the play itself in your textbook, First Flight.)*";
const SRC_STEM = `*The Proposal*: read the commentary on this exchange and answer the questions that follow. ${NOTE}`;
const SCHEME3 = [['Relevant point from the play (event, speech or stage direction, in own words)', 1], ['Explanation or inference linked to the question', 1], ['Expression and accuracy within 40–50 words', 1]];
const SCHEME2 = [['Correct point from the play', 1], ['Explanation in own words within 30–40 words', 1]];
const LONG_SCHEME = [['Content: relevant points from the play, accurately used', 3], ['Interpretation / extrapolation: a clear view supported by the play', 1], ['Organisation and expression; within 100–120 words', 2]];

// ================================================================ extract-based (source-based, SOYL commentary on dialogue)
Q('src_arrival', source({
  t: [1, 3], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "The play opens with Lomov arriving at Chubukov's house in formal clothes. Chubukov greets him with a flood of affectionate words, yet in a remark meant only for the audience he guesses that his neighbour has come to borrow money and resolves not to lend any. When Lomov, stammering and nervous, finally explains that he has come to ask for Natalya's hand, Chubukov's manner changes at once. He embraces the young man, declares that he has long hoped for exactly this, and hurries off to fetch his daughter. In a few lines Chekhov has shown us a father whose warmth depends entirely on what he expects to gain.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'Why has Lomov come to Chubukov’s house?', opts: ['to propose marriage to Natalya', 'to borrow money from Chubukov', 'to buy the Oxen Meadows', 'to sell his dog'], sol: 'Lomov has come to ask for Natalya’s hand in marriage.' })),
    child('b', mcq({ t: 3, d: 2, c: 'understanding', stem: 'What does Chubukov privately suspect when Lomov arrives?', opts: ['that Lomov wants to borrow money', 'that Lomov is ill', 'that Lomov has come to quarrel', 'that Lomov wants to sell his land'], sol: 'In a remark to the audience he guesses that Lomov has come for a loan.' })),
    child('c', fb({ t: 4, d: 2, c: 'understanding', stem: 'A remark spoken to the audience that other characters on stage are not meant to hear is called an ___.', acc: [['aside']], sol: 'Such a remark is an **aside**.' })),
    child('d', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'What does the change in Chubukov’s manner reveal about him?', model: 'He is a hypocrite whose friendliness depends on self-interest: suspicious of a borrower, delighted by a suitor.', sol: 'His warmth is calculated; it follows his own advantage.', scheme: [['Hypocritical / self-interested', 1]] })),
    child('e', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Why is Chubukov so delighted by the proposal?', opts: ['He is eager to see his daughter married to a suitable neighbour.', 'He has always admired Lomov’s honesty.', 'He wants Lomov to pay his debts.', 'He hopes to move into Lomov’s house.'], sol: 'He has long wanted Natalya settled, and Lomov is a convenient match.' })),
  ],
  sol: 'Parts (a) and (b) are facts; (c) tests a dramatic term; (d) and (e) interpret Chubukov.',
}));
Q('src_lomov_alone', source({
  t: [3, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Left alone while Chubukov fetches Natalya, Lomov talks himself through his decision, and the speech is revealing for what it leaves out. He explains that he has reached an age at which a man ought to marry, that he wants a calm and orderly life, and that Natalya would make a capable mistress of a household. Love is never mentioned. At the same time he keeps returning to his own health: sleeplessness, twitches and a pounding heart. The audience laughs at the hypochondriac, but Chekhov is also making a serious point about marriages arranged for comfort and convenience rather than for affection.",
  parts: [
    child('a', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Which of these is NOT one of Lomov’s reasons for wanting to marry?', opts: ['He is deeply in love with Natalya.', 'He feels he has reached the age to marry.', 'He wants a calm, orderly life.', 'He thinks Natalya would run a household well.'], sol: 'Love is the one thing his reasoning leaves out.' })),
    child('b', fb({ t: 3, d: 2, c: 'understanding', stem: 'Someone who constantly worries about imagined or minor illnesses is called a ___.', acc: [['hypochondriac']], sol: 'Lomov is a **hypochondriac**.' })),
    child('c', mcq({ t: 1, d: 2, c: 'recall', stem: 'Which complaint does Lomov repeatedly make about his health?', opts: ['palpitations of the heart', 'a broken arm', 'poor eyesight', 'a toothache'], sol: 'He keeps complaining of palpitations and nervous symptoms.' })),
    child('d', short({ t: 2, d: 4, c: 'evaluation', marks: 1, stem: 'What serious point does the commentary say Chekhov makes through Lomov’s speech?', model: 'He criticises marriages arranged for convenience and comfort instead of love.', sol: 'The play satirises marriage as a practical arrangement.', scheme: [['Satire of marriage for convenience, not love', 1]] })),
    child('e', mcq({ t: 4, d: 3, c: 'analysis', stem: 'What makes the speech comic as well as revealing?', opts: ['Lomov’s anxious list of symptoms in the middle of a romantic decision', 'Lomov singing a love song', 'Chubukov interrupting with jokes', 'Natalya hiding behind the door'], sol: 'The mismatch between a proposal and a catalogue of ailments is funny.' })),
  ],
  sol: 'Note what is absent (love) and what is present (practical reasons, symptoms).',
}));
Q('src_meadows', source({
  t: [1, 3], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "When Natalya enters, Lomov sets out to propose by the longest possible route. He recalls how long their families have been neighbours and friends, and then, meaning only to describe his property, refers to the Oxen Meadows as his. Natalya stops him at once: the Meadows, she says, belong to her family. Lomov produces his family's version of their history, involving a grant of free use made long ago, and Natalya dismisses it. Within minutes the polite visitor and the welcoming hostess are contradicting each other with rising anger. The proposal itself is completely forgotten, and Natalya still has no idea why Lomov came.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'What do Lomov and Natalya first quarrel about?', opts: ['the ownership of the Oxen Meadows', 'the price of their dogs', 'the date of their wedding', 'a debt Chubukov owes Lomov'], sol: 'Their first quarrel is over who owns the Oxen Meadows.' })),
    child('b', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Why does the quarrel begin at all?', opts: ['Lomov takes a long way round to his proposal and mentions the Meadows as his.', 'Natalya insults Lomov’s dog.', 'Chubukov tells Natalya that Lomov wants the land.', 'Lomov arrives with a lawyer.'], sol: 'His roundabout preamble leads him to claim the Meadows, and Natalya objects.' })),
    child('c', fb({ t: 4, d: 2, c: 'understanding', stem: 'The audience knows Lomov has come to propose while Natalya does not; this gap in knowledge is called ___ irony.', acc: [['dramatic']], sol: 'It is **dramatic** irony.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Why does the commentary say that *the proposal itself is completely forgotten*?', model: 'Pride in property matters more to both of them than the marriage, so a trivial claim swallows the purpose of the visit.', sol: 'Petty possessiveness drives out the real business of the visit.', scheme: [['Their pride in property overrides the proposal', 1]] })),
    child('e', mcq({ t: 4, d: 3, c: 'analysis', stem: 'What makes this scene ironic?', opts: ['A man who came to propose ends up quarrelling with the woman he meant to marry.', 'Natalya agrees to marry Lomov at once.', 'Chubukov gives the Meadows to Lomov.', 'Lomov wins the argument easily.'], sol: 'The outcome is the opposite of what the visit was meant to achieve.' })),
  ],
  sol: 'Parts (a) and (b) recall the scene; (c) and (e) name and explain the irony.',
}));
Q('src_chubukov_joins', source({
  t: [3, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Chubukov returns to find the pair shouting and, far from calming them, takes his daughter's side immediately. The man who only minutes earlier showered Lomov with affection now treats him as an enemy. Each side threatens the other: Lomov speaks of taking the matter to court, and Chubukov of sending his men to mow the Meadows. The argument then slides from land to family honour, and each man begins insulting the other's relatives. Chekhov lets the quarrel grow absurdly larger than its cause, until Lomov, clutching his chest and complaining of his heart and of numbness, staggers out of the house.",
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'recall', stem: 'Whose side does Chubukov take in the quarrel?', opts: ['Natalya’s', 'Lomov’s', 'neither; he stays silent', 'the court’s'], sol: 'He backs his daughter at once.' })),
    child('b', mcq({ t: 1, d: 2, c: 'understanding', stem: 'What does Lomov threaten to do?', opts: ['take the matter to court', 'set fire to the Meadows', 'leave the country', 'shoot Chubukov’s dog'], sol: 'He threatens legal action over the Meadows.' })),
    child('c', fb({ t: 1, d: 2, c: 'understanding', stem: 'Chubukov threatens to send his men to ___ the Meadows.', acc: [['mow', 'cut', 'reap']], sol: 'He threatens to have the Meadows **mowed**.' })),
    child('d', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'What does Chubukov’s sudden change towards Lomov show about him?', model: 'His friendliness was shallow; once his property is at stake he turns on Lomov just as quickly.', sol: 'Shallow, self-interested affection that collapses under a property dispute.', scheme: [['Shallow affection; self-interest rules him', 1]] })),
    child('e', mcq({ t: 4, d: 3, c: 'analysis', stem: 'Which feature of farce does the escalating quarrel best show?', opts: ['exaggeration: a small dispute grows absurdly large', 'a tragic hero’s downfall', 'a mystery solved by a detective', 'a realistic, calm discussion'], sol: 'Farce exaggerates; here a trivial dispute balloons into family insults.' })),
  ],
  sol: 'Notice how the quarrel moves from land to family honour.',
}));
Q('src_hysterics', source({
  t: [1, 3], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "With Lomov gone, Chubukov is still fuming, and he lets slip that the impudent fellow had come to propose. The effect on Natalya is immediate. The woman who has just defended her family's land with such fury bursts into tears and demands that her father bring Lomov back at once. Chubukov, grumbling, rushes out to fetch him. The swing from rage to despair is played for laughs, but it also tells us something: Natalya wants to be married, and the Meadows suddenly seem much less important than a suitor.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'How does Natalya learn why Lomov came?', opts: ['Chubukov tells her after Lomov leaves.', 'Lomov writes her a letter.', 'A servant tells her.', 'She guesses it from his clothes.'], sol: 'Her father reveals it after Lomov has stormed out.' })),
    child('b', mcq({ t: 3, d: 2, c: 'understanding', stem: 'How does Natalya react to the news?', opts: ['She becomes hysterical and demands that Lomov be brought back.', 'She laughs and says she is relieved.', 'She refuses ever to see him again.', 'She goes to court over the Meadows.'], sol: 'She weeps and insists her father fetch Lomov at once.' })),
    child('c', fb({ t: 3, d: 2, c: 'understanding', stem: 'Natalya’s reaction shows that she is eager to be ___.', acc: [['married']], sol: 'She is eager to be **married**.' })),
    child('d', short({ t: 2, d: 4, c: 'evaluation', marks: 1, stem: 'What does Natalya’s sudden change suggest about her priorities?', model: 'Marriage matters more to her than the land she was fighting for, so her pride gives way at once.', sol: 'Her wish to marry outweighs her quarrel over property.', scheme: [['Marriage outweighs the land for her', 1]] })),
    child('e', mcq({ t: 4, d: 3, c: 'analysis', stem: 'Why is the swing from rage to despair comic?', opts: ['It is sudden and extreme, the opposite of her mood seconds earlier.', 'It is described calmly and realistically.', 'It happens off stage.', 'It ends the play.'], sol: 'Farce depends on rapid, exaggerated reversals like this.' })),
  ],
  sol: 'Link Natalya’s reversal to the play’s view of marriage.',
}));
Q('src_dogs', source({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "When Lomov returns, Natalya is all sweetness and concedes that the Meadows are his. For a moment the proposal seems possible. Then the talk turns to shooting, and Lomov mentions his dog, Guess. Natalya cannot resist claiming that her family's dog, Squeezer, is the better animal. Lomov points to a fault in Squeezer's jaw; Natalya dismisses Guess as past his best. The pattern of the first quarrel repeats almost exactly, only this time the subject is even more trivial. Chekhov's point could hardly be clearer: these people will fight over anything they own, and a marriage built on such pride will be a noisy one.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'What is the name of Lomov’s dog?', opts: ['Guess', 'Squeezer', 'Hunter', 'Rover'], sol: 'Lomov’s dog is Guess; Squeezer belongs to Natalya’s family.' })),
    child('b', mcq({ t: 1, d: 2, c: 'recall', stem: 'What does Natalya concede when Lomov returns?', opts: ['that the Oxen Meadows are his', 'that Guess is the better dog', 'that she does not wish to marry', 'that her father was rude'], sol: 'She gives way on the Meadows before the dog quarrel starts.' })),
    child('c', fb({ t: 1, d: 2, c: 'recall', stem: 'Natalya’s family’s dog, whom she praises over Guess, is called ___.', acc: [['Squeezer']], sol: 'Their dog is **Squeezer**.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Why does the commentary say the second quarrel is *even more trivial* than the first?', model: 'The first was at least about land, which has some value; the second is about which hunting dog is better.', sol: 'A quarrel about dogs has even less substance than one about land.', scheme: [['Dogs matter even less than land', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What does the repetition of the quarrel suggest about the couple’s future?', opts: ['Their marriage is likely to be full of quarrels.', 'They will never argue again.', 'They will sell both dogs.', 'Lomov will give up hunting.'], sol: 'People who fight over anything they own are set for a quarrelsome marriage.' })),
  ],
  sol: 'Compare the structure of the two quarrels.',
}));
Q('src_ending', source({
  t: [1, 4], d: 4, c: 'evaluation', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "The dog quarrel pushes Lomov past his limit, and he collapses into an armchair. Chubukov and Natalya are convinced he is dead and panic, until he stirs and slowly comes round. Seizing the moment, Chubukov practically pushes the two together, announces that they are to marry, and tells them to kiss. Natalya agrees on the spot. Yet within seconds the engaged couple are back to arguing about which dog is better, and Chubukov calls loudly for champagne to drown the noise. The curtain falls on a celebration of a marriage that has begun exactly as it will probably continue.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'What happens to Lomov at the height of the dog quarrel?', opts: ['He collapses and is thought to be dead.', 'He storms out and never returns.', 'He challenges Chubukov to a duel.', 'He apologises and leaves quietly.'], sol: 'He collapses into an armchair, and the others think he has died.' })),
    child('b', mcq({ t: 1, d: 2, c: 'understanding', stem: 'What does Chubukov do once Lomov revives?', opts: ['He hurries the couple into an engagement.', 'He sends Lomov home to rest.', 'He calls a doctor and a lawyer.', 'He cancels the proposal.'], sol: 'He rushes them into agreeing to marry.' })),
    child('c', fb({ t: 1, d: 2, c: 'recall', stem: 'At the end of the play Chubukov calls for ___ to celebrate.', acc: [['champagne']], sol: 'He calls for **champagne**.' })),
    child('d', short({ t: 2, d: 4, c: 'evaluation', marks: 1, stem: 'Why does the commentary say the marriage has begun exactly as it will probably continue?', model: 'Even at the moment of engagement they are quarrelling, which suggests a married life of constant disputes.', sol: 'The engagement is drowned out by a quarrel, a sign of things to come.', scheme: [['Quarrelling at the engagement predicts a quarrelsome marriage', 1]] })),
    child('e', mcq({ t: 4, d: 3, c: 'analysis', stem: 'Which kind of irony is strongest in the ending?', opts: ['situational irony: a joyful engagement is celebrated in the middle of a quarrel', 'dramatic irony: the audience knows Lomov is dead', 'verbal irony: Lomov praises Squeezer', 'no irony: the ending is purely happy'], sol: 'The situation contradicts itself: a celebration of harmony amid discord.' })),
  ],
  sol: 'The ending is a farce: collapse, panic, hurried engagement and renewed quarrel.',
}));

// ================================================================ short answers, 3 marks (40–50 words)
const SA3 = { marks: 3, wl: [40, 50], scheme: SCHEME3, time: 240 };
Q('sa_chubukov_suspects', short({
  ...SA3, t: [3, 4], d: 3, c: 'analysis',
  stem: 'How does Chubukov’s attitude to Lomov change between his arrival and the proposal? What does this show? Answer in 40–50 words.',
  model: 'Chubukov welcomes Lomov with lavish affection while privately suspecting he wants a loan, which he resolves to refuse. When Lomov asks for Natalya’s hand, Chubukov embraces him with real delight. The shift shows his hypocrisy: his warmth depends on whether the visitor brings gain or cost.',
  sol: 'His suspicion (via an aside) + his delight at the proposal + what it shows (hypocrisy, self-interest).',
}));
Q('sa_lomov_reasons', short({
  ...SA3, t: [2, 3], d: 3, c: 'analysis',
  stem: 'Why does Lomov want to marry Natalya? What do his reasons reveal about the play’s view of marriage? Answer in 40–50 words.',
  model: 'Lomov feels he is at an age to marry, wants a calm, orderly life for his nerves, and thinks Natalya would manage a household well. He never mentions love. Through him, Chekhov mocks marriages made for practical convenience rather than for affection or companionship.',
  sol: 'His practical reasons + the absence of love + the satire on marriage of convenience.',
}));
Q('sa_meadows_cause', short({
  ...SA3, t: 1, d: 2, c: 'understanding',
  stem: 'How does the quarrel over the Oxen Meadows begin, and how does it develop? Answer in 40–50 words.',
  model: 'Trying to lead up to his proposal, Lomov recalls the families’ friendship and calls the Oxen Meadows his. Natalya insists they belong to her family. Neither will yield, and when Chubukov joins in, the dispute grows into threats of court action and insults about each other’s relatives.',
  sol: 'The trigger (Lomov’s roundabout preamble) + the claim and counter-claim + the escalation with Chubukov.',
}));
Q('sa_natalya_reacts', short({
  ...SA3, t: [1, 3], d: 2, c: 'understanding',
  stem: 'How does Natalya react when she learns that Lomov had come to propose, and why? Answer in 40–50 words.',
  model: 'When her father reveals the purpose of Lomov’s visit, Natalya becomes hysterical and begs him to bring Lomov back. Her fury over the Meadows vanishes instantly. She is eager to marry, and a suitor matters far more to her than the land she had been defending.',
  sol: 'Her reaction (hysterics, demand to fetch him) + the reason (eagerness to marry outweighs the land).',
}));
Q('sa_dogs_quarrel', short({
  ...SA3, t: [1, 2], d: 3, c: 'analysis',
  stem: 'What is the second quarrel about, and why does Chekhov repeat the pattern of the first? Answer in 40–50 words.',
  model: 'The second quarrel is over whether Lomov’s dog Guess or the family’s dog Squeezer is better. By repeating the first quarrel’s pattern with an even sillier subject, Chekhov shows that these characters will fight over anything they own and that their pride is incurable.',
  sol: 'The subject (Guess versus Squeezer) + the purpose of repetition (pettiness, pride, comic effect).',
}));
Q('sa_hypochondriac', short({
  ...SA3, t: [3, 4], d: 3, c: 'analysis',
  stem: 'Lomov is described as a hypochondriac. How does this trait add to the comedy of the play? Answer in 40–50 words.',
  model: 'Lomov constantly complains about his health, from sleepless nights to a pounding heart, even while proposing. In every quarrel his symptoms grow louder, and at the climax he collapses as if dead. His exaggerated anxiety turns tense moments into physical comedy and makes him absurdly unfit for fiery arguments.',
  sol: 'Examples of his complaints + how they grow during quarrels + the collapse as a comic climax.',
}));
Q('sa_stage_directions', short({
  ...SA3, t: 4, d: 3, c: 'analysis',
  stem: 'What is the role of stage directions in *The Proposal*? Answer in 40–50 words with examples described in your own words.',
  model: 'Stage directions tell actors how to speak and move, so they reveal emotions the dialogue only hints at. They show Lomov’s nervousness and his collapse, Natalya’s sudden tears, and Chubukov’s private remarks to the audience. Without them, much of the play’s physical comedy would be lost.',
  sol: 'Their function (guide performance, reveal feeling) + two or three examples in own words + their effect on comedy.',
}));
Q('sa_irony_proposal', short({
  ...SA3, t: [4, 2], d: 4, c: 'analysis',
  stem: 'Point out two examples of irony in *The Proposal*. Answer in 40–50 words.',
  model: 'First, Lomov comes to propose but ends up fighting the woman he wishes to marry, while Natalya does not even know his purpose. Second, the engagement is celebrated with champagne while the couple are still arguing. Both moments show the opposite of what we would expect.',
  sol: 'Two examples (the proposal turned quarrel; dramatic irony of Natalya’s ignorance; the champagne amid quarrel) + why each is ironic.',
}));
Q('sa_farce', short({
  ...SA3, t: 4, d: 3, c: 'understanding',
  stem: 'Why is *The Proposal* called a farce? Answer in 40–50 words.',
  model: 'A farce is a comedy built on exaggeration, absurd situations and physical humour. In this play, a proposal collapses into quarrels about worthless land and dogs, characters swing wildly between moods, and Lomov faints as if dead. The improbable chaos exists to make the audience laugh.',
  sol: 'Definition of farce + two or three features from the play (exaggeration, absurd quarrels, physical comedy).',
}));
Q('sa_chubukov_char', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'Describe Chubukov’s character with evidence from the play. Answer in 40–50 words.',
  model: 'Chubukov is a hypocrite, flattering Lomov while privately suspecting him of wanting a loan. He is short-tempered and quick to trade insults over land. He is also anxious to see his daughter married, so he rushes the couple into an engagement the moment Lomov revives.',
  sol: 'Two or three traits (hypocritical, hot-tempered, eager to marry off his daughter, materialistic) with evidence.',
}));
Q('sa_natalya_char', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'What kind of person is Natalya? Support your answer with evidence. Answer in 40–50 words.',
  model: 'Natalya is proud and sharp-tongued, defending her family’s claim to the Meadows fiercely. She is possessive, insisting that Squeezer beats Guess. Yet she is also practical and eager to marry: the moment she learns of the proposal, she weeps and demands Lomov’s return.',
  sol: 'Two or three traits (proud, quarrelsome, possessive, eager to marry, changeable) with evidence.',
}));
Q('sa_happy_marriage', short({
  ...SA3, t: [2, 5], d: 4, c: 'evaluation',
  stem: 'Do you think Lomov and Natalya will have a happy marriage? Give your view in 40–50 words.',
  model: 'I doubt it. Even during their engagement they are quarrelling about dogs, just as they fought about land before. Neither will give way, and both are proud and possessive. Their marriage is likely to be noisy, though perhaps they enjoy arguing too much to separate.',
  sol: 'A stand + evidence (quarrelling at the engagement; two disputes; pride) + a conclusion. A reasoned optimistic view can also earn full marks.',
}));

// ================================================================ short answers, 2 marks (30–40 words)
const SA2 = { marks: 2, wl: [30, 40], scheme: SCHEME2, time: 150 };
Q('sb_characters', short({
  ...SA2, t: 1, d: 1, c: 'recall',
  stem: 'Who are the three characters in *The Proposal*, and how are they related? Answer in 30–40 words.',
  model: 'The play has three characters: Chubukov, a landowner; Natalya, his daughter; and Lomov, their neighbour and a landowner too. Lomov comes to ask for Natalya’s hand in marriage at Chubukov’s house.',
  sol: 'The three names + their relationships (father, daughter, neighbour).',
}));
Q('sb_formal', short({
  ...SA2, t: [1, 3], d: 2, c: 'understanding',
  stem: 'Why is Lomov dressed so formally when he arrives? What does this show? Answer in 30–40 words.',
  model: 'He has come to make a formal proposal of marriage and wants to look respectable for the occasion. It also shows how nervous and serious he feels about the visit, at least at first.',
  sol: 'Reason (the proposal) + what it shows (nervousness, seriousness).',
}));
Q('sb_meadows_claim', short({
  ...SA2, t: 1, d: 2, c: 'understanding',
  stem: 'On what grounds does Lomov claim the Oxen Meadows? Answer in 30–40 words.',
  model: 'Lomov relies on family history. He says his ancestors once allowed the other family’s peasants free use of the Meadows for a time, so the land was only lent and still belongs to him.',
  sol: 'His argument (a past grant of free use, not of ownership) + his conclusion (the land is his).',
}));
Q('sb_collapse', short({
  ...SA2, t: 1, d: 2, c: 'understanding',
  stem: 'What happens when Lomov collapses during the dog quarrel? Answer in 30–40 words.',
  model: 'Lomov sinks into an armchair and seems lifeless. Chubukov and Natalya panic, believing he has died. When he slowly recovers, Chubukov seizes the chance and hurries the two of them into an engagement.',
  sol: 'The collapse + the others’ panic + Chubukov’s hurried engagement.',
}));
Q('sb_champagne', short({
  ...SA2, t: [4, 2], d: 3, c: 'analysis',
  stem: 'Why does Chubukov call for champagne at the end of the play? Answer in 30–40 words.',
  model: 'He wants to celebrate the engagement and, just as much, to drown out the couple’s fresh quarrel about the dogs. The celebration amid shouting is ironic and hints at their future married life.',
  sol: 'Two purposes (celebrate; drown the quarrel) + the irony.',
}));
Q('sb_trivial', short({
  ...SA2, t: 2, d: 3, c: 'application',
  stem: 'The quarrels in the play are about trivial things. Give one example from everyday life of people quarrelling over something trivial. Answer in 30–40 words.',
  model: 'Two neighbours may stop speaking for months over a few centimetres of parking space, just as Lomov and Natalya fight over a meadow and dogs. Pride, not the object, keeps the quarrel alive.',
  sol: 'A real-life example + a link to the play (pride over trivial possessions).',
}));

// ================================================================ long answers, 6 marks (100–120 words)
const LA = { marks: 6, wl: [100, 120], scheme: LONG_SCHEME, time: 720 };
Q('la_satire', long({
  ...LA, t: [5, 2], d: 4, c: 'analysis',
  stem: '*The Proposal* is a satire on marriages of convenience and on quarrelsome human nature. Discuss, in 100–120 words.',
  model: 'Chekhov shows marriage treated as a practical bargain. Lomov wants a wife because he thinks he has reached the right age and needs a calm, orderly life; love is never mentioned. Chubukov is eager to settle his daughter with a neighbour of property, and Natalya, though she quarrels fiercely, is desperate not to lose a suitor. At the same time, all three are absurdly quarrelsome. A proposal dissolves into fights about a meadow and then about two dogs, with insults about relatives thrown in. Even the engagement is drowned in argument. By exaggerating these traits, Chekhov makes us laugh at greed, pride and pettiness, and at marriages built on convenience rather than affection.',
  sol: 'Marriage of convenience (Lomov’s reasons; Chubukov’s eagerness; Natalya’s desperation) + quarrelsomeness (Meadows, dogs, insults, the ending) + how exaggeration creates satire. Conclude.',
}));
Q('la_lomov_sketch', long({
  ...LA, t: [5, 3], d: 3, c: 'analysis',
  stem: 'Write a character sketch of Lomov, supporting each trait with evidence from the play. Answer in 100–120 words.',
  model: 'Lomov is a nervous, anxious man. He arrives in formal dress and stammers before he can explain his purpose. He is a hypochondriac, forever worrying about his heart and his sleep, and he finally collapses as if dead. His reasons for marrying are practical, not romantic: he feels the time has come and wants an orderly life. Despite his nerves, he is stubborn and quarrelsome, refusing to yield over the Oxen Meadows and insisting that Guess is better than Squeezer. He is also easily provoked, threatening to go to court. Lomov is a comic figure whose pride and anxiety keep defeating his own purpose, so that even his proposal is almost lost in quarrels.',
  sol: 'Four or five traits with evidence: nervous, hypochondriac, practical about marriage, stubborn/quarrelsome, easily provoked. End with an overall judgement.',
}));
Q('la_farce_elements', long({
  ...LA, t: [5, 4], d: 4, c: 'analysis',
  stem: 'How does Chekhov use the elements of farce to create humour in *The Proposal*? Answer in 100–120 words.',
  model: 'Chekhov builds the play on exaggeration. A simple proposal becomes a battle, first over a meadow of little value and then over which dog is better. The characters swing between extremes: Chubukov from affection to insults, Natalya from fury to tears and back again. Physical comedy adds to the fun. Lomov clutches his heart, complains of numbness and finally collapses, and the others panic over his apparent death. Irony runs throughout, since the audience knows of the proposal while Natalya does not, and the engagement is celebrated amid shouting. Rapid exchanges and repeated quarrels keep the pace frantic. Every element pushes ordinary behaviour to absurd lengths, which is the essence of farce.',
  sol: 'Features of farce with examples: exaggeration (trivial disputes), extreme mood swings, physical comedy (Lomov’s collapse), irony, pace and repetition. Conclude with the overall effect.',
}));
Q('la_diary_natalya', long({
  ...LA, t: [5, 1], d: 4, c: 'application', bloom: 'create',
  stem: 'Imagine you are Natalya. Write a diary entry on the night of your engagement, in 100–120 words.',
  model: 'Tonight\n\nWhat a day! Ivan Vassilevitch arrived in his best clothes, and I had no idea why. He began talking about our families and then claimed the Oxen Meadows as his. I could not let that pass! We argued, Papa joined in, and Ivan stormed out clutching his heart. Only then did Papa tell me he had come to propose. I nearly fainted. Papa fetched him back, and I gave way about the Meadows, but then he insulted our dear Squeezer. He collapsed, we thought he was dead, and suddenly we were engaged. I am happy, truly. But I still say Squeezer is the better dog, and I shall tell him so tomorrow.',
  sol: 'Diary format (date/time, first person, feelings). Content consistent with the play: the formal visit, the Meadows quarrel, the revelation, her hysterics, the dog quarrel, the collapse, the engagement. Her character (proud, eager to marry) should show.',
}));
Q('la_stage_irony', long({
  ...LA, t: [5, 4], d: 4, c: 'analysis',
  stem: 'Discuss the use of irony in *The Proposal*, with examples. Answer in 100–120 words.',
  model: 'Irony is at the heart of the play’s humour. The central situation is ironic: Lomov comes to propose to Natalya, yet spends most of his visit fighting with her. Dramatic irony adds to this, because the audience knows his purpose while Natalya does not, so we watch her ruin her own chances without realising it. Chubukov’s warm welcome hides his private suspicion that Lomov wants a loan, an irony revealed through his aside. The ending is the sharpest irony of all. A couple who have just agreed to marry are already arguing about dogs, while Chubukov calls for champagne to celebrate the match. Through irony, Chekhov exposes the gap between appearance and reality.',
  sol: 'Types of irony with examples: situational (proposal becomes quarrel; celebration amid argument), dramatic (Natalya’s ignorance), the aside revealing hypocrisy. Conclude on what irony exposes.',
}));
Q('la_property_love', long({
  ...LA, t: [5, 2], d: 4, c: 'evaluation',
  stem: 'In *The Proposal*, property seems to matter more than love. Do you agree? Give your view in 100–120 words.',
  model: 'I largely agree. Lomov’s reasons for marrying are practical and never include love, and he is ready to abandon the proposal rather than give up his claim to the Oxen Meadows. Natalya fights just as fiercely for the land, and later for the honour of her family’s dog. Chubukov welcomes Lomov partly because he is a neighbour of property, and he turns on him the moment that property is disputed. Yet the play is not entirely loveless. Natalya’s despair when she learns of the proposal shows a real wish to marry. Still, even after the engagement they argue about dogs. In Chekhov’s comic world, possessions and pride usually win over affection.',
  sol: 'A clear stand + evidence (Lomov’s reasons; the Meadows; the dogs; Chubukov’s motives) + a counterpoint (Natalya’s hysterics) + a conclusion.',
}));
Q('la_scene_modern', long({
  ...LA, t: [5, 2], d: 4, c: 'application',
  stem: 'Are the follies Chekhov mocks in *The Proposal* still found today? Answer in 100–120 words, with reference to the play.',
  model: 'Many of the follies Chekhov mocks are still with us. Marriages are sometimes arranged mainly around property, income or social status, much as Lomov’s choice rests on practical convenience and Chubukov’s on a suitable neighbour. People still quarrel bitterly over small things. Neighbours fight over boundary walls, relatives over inherited land, and friends over which team or brand is better, just as Lomov and Natalya fight over a meadow and two dogs. Pride makes such disputes hard to end. Social media can even magnify them. The play remains funny because we recognise ourselves in it. Its lesson is timeless: pride and possessiveness can spoil even the happiest occasions.',
  sol: 'A stand + modern parallels for marriage of convenience and petty quarrels + links to specific moments in the play + a conclusion.',
}));

// ================================================================ objective items
Q('mc_author_proposal', mcq({ t: 1, d: 1, c: 'recall', stem: 'Who wrote the play *The Proposal*?', opts: ['Anton Chekhov', 'Vallikkannan', 'Gavin Maxwell', 'Betty Renshaw'], sol: 'Anton Chekhov, the Russian dramatist and story writer, wrote it.' }));
Q('mc_country', mcq({ t: 1, d: 1, c: 'recall', stem: 'In which country is *The Proposal* set?', opts: ['Russia', 'England', 'France', 'India'], sol: 'It is set on country estates in Russia.' }));
Q('mc_form', mcq({ t: 4, d: 2, c: 'understanding', stem: 'What type of play is *The Proposal*?', opts: ['a one-act farce', 'a five-act tragedy', 'a historical drama', 'a musical'], sol: 'It is a short, one-act comic play: a farce.' }));
Q('mc_lomov_role', mcq({ t: 1, d: 1, c: 'recall', stem: 'Who is Lomov in relation to Chubukov?', opts: ['his neighbour', 'his son', 'his servant', 'his lawyer'], sol: 'Lomov is a neighbouring landowner.' }));
Q('mc_aside_effect', mcq({ t: 4, d: 3, c: 'analysis', stem: 'Chubukov privately suspects Lomov wants a loan while welcoming him warmly. What is the effect of revealing this through an aside?', opts: ['The audience sees his hypocrisy while Lomov does not.', 'Lomov hears it and leaves.', 'It makes Chubukov seem honest.', 'It ends the first quarrel.'], sol: 'The aside lets the audience in on the gap between his words and thoughts.' }));
Q('mc_lomov_motive', mcq({ t: 2, d: 2, c: 'understanding', stem: 'Lomov wants to marry Natalya mainly because…', opts: ['he wants a settled, orderly life and feels it is time', 'he has loved her since childhood', 'she is the richest woman in Russia', 'his father ordered him to'], sol: 'His reasons are practical; love is never mentioned.' }));
Q('mc_meadows_value', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What does the quarrel over the Oxen Meadows mainly reveal about the characters?', opts: ['their pride and possessiveness', 'their skill at farming', 'their deep love for each other', 'their respect for the law'], sol: 'They fight not because the land matters much but because their pride will not let them yield.' }));
Q('mc_natalya_change', mcq({ t: 3, d: 2, c: 'understanding', stem: 'What does Natalya do when Lomov comes back after the first quarrel?', opts: ['She gives way about the Meadows.', 'She orders him out of the house.', 'She refuses to speak to him.', 'She takes him to court.'], sol: 'Eager now to marry, she concedes the Meadows.' }));
Q('mc_overshot', mcq({ t: 1, d: 3, c: 'understanding', stem: 'In the dog quarrel, what fault does Lomov find with Squeezer?', opts: ['a defect in the shape of his jaw', 'that he is blind in one eye', 'that he is afraid of guns', 'that he cannot run'], sol: 'Lomov claims Squeezer is overshot, a fault in how the jaws meet.' }));
Q('mc_collapse_type', mcq({ t: 4, d: 3, c: 'analysis', stem: 'Lomov’s collapse and the others’ panic are an example of…', opts: ['physical comedy typical of farce', 'a tragic climax', 'a flashback', 'a soliloquy about death'], sol: 'Exaggerated physical action like this is a hallmark of farce.' }));
Q('mc_theme_proposal', mcq({ t: 2, d: 3, c: 'evaluation', stem: 'Which message does *The Proposal* most strongly convey?', opts: ['Pride and greed can make people quarrel over trifles, even in matters of love.', 'Love always triumphs over every obstacle.', 'Land is the most valuable thing in life.', 'Dogs are better companions than people.'], sol: 'The play satirises how pride and possessiveness spoil even a marriage proposal.' }));
Q('mc_apply_proposal', mcq({ t: [2, 5], d: 3, c: 'application', stem: 'Two cousins planning a joint birthday party fall out over whose cake design is better and cancel the party. Which aspect of *The Proposal* does this most resemble?', opts: ['a happy occasion spoilt by a quarrel over something trivial', 'a proposal made for the sake of property', 'a father hiding his real thoughts in an aside', 'a hypochondriac complaining of palpitations'], sol: 'Like Lomov and Natalya, the cousins let a trivial dispute wreck a happy plan.' }));
Q('mc_title_irony', mcq({ t: 4, d: 3, c: 'analysis', stem: 'Why is the title *The Proposal* ironic?', opts: ['The proposal is hardly made because the visit is taken over by quarrels.', 'Nobody in the play wishes to marry.', 'The play is about a business proposal.', 'Natalya proposes to Lomov.'], sol: 'The event named in the title keeps being drowned out by disputes.' }));
Q('mc_dramatist', mcq({ t: 1, d: 2, c: 'recall', fixed: true, key: 'c', stem: 'Apart from writing plays, Anton Chekhov is also famous as a writer of…', opts: ['epic poems', 'scientific textbooks', 'short stories', 'travel guides'], sol: 'Chekhov is one of the great masters of the short story, as well as a dramatist.' }));

Q('fb_meadows', fb({ t: 1, d: 1, c: 'recall', stem: 'The land Lomov and Natalya first quarrel over is called the ___ Meadows.', acc: [['Oxen']], sol: 'It is the **Oxen** Meadows.' }));
Q('fb_guess', fb({ t: 1, d: 1, c: 'recall', marks: 1, stem: 'Lomov’s dog is called ___, and Natalya’s family’s dog is called ___.', acc: [['Guess'], ['Squeezer']], sol: 'Lomov owns **Guess**; the Chubukovs own **Squeezer**.', scheme: [['Guess', 0.5], ['Squeezer', 0.5]] }));
Q('fb_palpitations', fb({ t: 3, d: 2, c: 'understanding', stem: 'Lomov repeatedly complains of ___, a fast or irregular beating of the heart.', acc: [['palpitations', 'palpitation']], sol: 'He keeps mentioning his **palpitations**.' }));
Q('fb_farce', fb({ t: 4, d: 2, c: 'understanding', stem: 'A comedy based on exaggeration, absurd situations and physical humour is called a ___.', acc: [['farce']], sol: 'Such a play is a **farce**.' }));

Q('ar_quarrel', ar({ t: [1, 3], d: 3, c: 'analysis', a: 'Natalya quarrels with Lomov over the Oxen Meadows.', r: 'Lomov arrives at Chubukov’s house in formal clothes.', key: 'b', sol: 'Both are true, but Lomov’s clothes do not explain the quarrel; Natalya fights because she believes the Meadows are her family’s.' }));
Q('ar_hysterics', ar({ t: 3, d: 3, c: 'analysis', a: 'Natalya becomes hysterical after Lomov storms out.', r: 'She has just learnt that he had come to propose to her.', key: 'a', sol: 'Both are true, and R explains A: learning of the lost proposal throws her into despair.' }));
Q('ar_chubukov_loan', ar({ t: [3, 4], d: 3, c: 'analysis', a: 'Chubukov greets Lomov warmly when he arrives.', r: 'Chubukov has already agreed to lend Lomov money.', key: 'c', sol: 'A is true. R is false: Chubukov privately resolves not to lend Lomov anything.' }));
Q('ar_meadows_given', ar({ t: [1, 2], d: 3, c: 'understanding', a: 'Natalya never gives way about the Oxen Meadows.', r: 'The quarrel over the dogs begins after Lomov returns.', key: 'd', sol: 'A is false: she concedes the Meadows when Lomov returns. R is true.' }));

Q('tf_love', tf({ t: 2, d: 2, c: 'understanding', stem: 'True or false: Lomov’s main reason for marrying Natalya is that he loves her passionately.', ans: false, sol: 'His reasons are practical; love is never mentioned.' }));
Q('tf_knows', tf({ t: 1, d: 2, c: 'recall', stem: 'True or false: during the Meadows quarrel, Natalya knows that Lomov has come to propose.', ans: false, sol: 'She learns the purpose of his visit only after he storms out.' }));
Q('tf_engaged', tf({ t: 1, d: 1, c: 'recall', stem: 'True or false: by the end of the play, Lomov and Natalya are engaged to be married.', ans: true, sol: 'Chubukov hurries them into an engagement after Lomov revives.' }));
Q('tf_peace', tf({ t: [1, 2], d: 2, c: 'understanding', stem: 'True or false: once engaged, Lomov and Natalya stop quarrelling entirely.', ans: false, sol: 'They resume arguing about the dogs almost at once.' }));

Q('ord_proposal', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange these events of *The Proposal* in the order in which they happen.',
  items: ['Lomov arrives in formal dress and tells Chubukov why he has come.', 'Lomov and Natalya quarrel over the Oxen Meadows.', 'Lomov leaves, and Chubukov reveals the purpose of his visit.', 'Natalya demands that Lomov be brought back.', 'Lomov and Natalya quarrel over Guess and Squeezer.', 'Lomov collapses, revives and is engaged to Natalya.'],
  sol: 'Arrival → the Meadows → the revelation → Natalya’s demand → the dogs → the collapse and engagement.',
}));
Q('ord_chubukov', ord({
  t: [3, 1], d: 3, c: 'analysis', marks: 2,
  stem: 'Arrange Chubukov’s changing attitudes towards Lomov in the order they appear.',
  items: ['outward warmth, with a private suspicion about money', 'delight at the proposal', 'hostility during the Meadows quarrel', 'anxiety to get him back for Natalya’s sake', 'eagerness to settle the engagement after the collapse'],
  sol: 'Suspicious warmth → delight → hostility → anxiety → eager matchmaking.',
}));

Q('mt_characters_proposal', match({
  t: 3, d: 2, c: 'recall', marks: 2,
  stem: 'Match each character or animal in *The Proposal* with the correct description.',
  pairs: [['Chubukov', 'a landowner and Natalya’s father'], ['Lomov', 'a nervous neighbour who comes to propose'], ['Guess', 'Lomov’s hunting dog'], ['Squeezer', 'the Chubukovs’ hunting dog']],
  sol: 'The people and dogs of the play.',
}));
Q('mt_words', match({
  t: 4, d: 2, c: 'understanding', marks: 2,
  stem: 'Match these terms used in studying *The Proposal* with their meanings.',
  pairs: [['aside', 'a remark to the audience that other characters do not hear'], ['stage direction', 'an instruction in a play about action or manner of speaking'], ['hypochondriac', 'a person always anxious about imagined illness'], ['satire', 'humour used to mock human folly']],
  sol: 'Key dramatic and descriptive terms for this play.',
}));
Q('mt_devices_proposal', match({
  t: 4, d: 3, c: 'analysis', marks: 2,
  stem: 'Match each moment in *The Proposal* with the technique it best shows.',
  pairs: [['Champagne called for amid a quarrel', 'situational irony'], ['Natalya unaware of the proposal during the first quarrel', 'dramatic irony'], ['Lomov collapsing and being thought dead', 'physical comedy'], ['A dispute about dogs repeating the dispute about land', 'repetition for comic effect']],
  sol: 'Each moment and the comic or dramatic technique it illustrates.',
}));
