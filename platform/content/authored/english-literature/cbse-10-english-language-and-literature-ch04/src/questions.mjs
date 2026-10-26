// CBSE 10 English Language and Literature, ch04 "A Letter to God" (G. L. Fuentes) — question bank.
// LITERATURE RULE (CONTEXT §8): no sentence, close paraphrase or distinctive phrase of the story appears
// here. Passages are SOYL commentary about an episode (passage_origin: soyl-commentary); stems refer to
// events in SOYL's own words. Students read the story itself in their textbook, First Flight.
import { Q, mcq, fb, short, long, tf, ar, match, ord, source, child } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

const NOTE = '*(This passage is SOYL\'s commentary on the story, not an extract from it. Read the story itself in your textbook, First Flight.)*';
const SRC_STEM = `Read the commentary and answer the questions that follow. ${NOTE}`;
const S3 = (pts) => pts.map(([step, marks]) => [step, marks]);
const SCHEME3 = S3([['Relevant point from the story (event or detail)', 1], ['Explanation or inference linked to the question', 1], ['Expression and accuracy within 40–50 words', 1]]);
const SCHEME2 = [['Correct point from the story', 1], ['Explanation in own words within 30–40 words', 1]];
const LONG_SCHEME = [['Content: relevant points from the story, accurately used', 3], ['Interpretation / extrapolation: a clear view supported by the story', 1], ['Organisation and expression; within 100–120 words', 2]];

// ================================================================ extract-based (source-based, SOYL commentary)
Q('src_rain', source({
  t: [5, 1], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'Before the storm, Fuentes takes time to build up Lencho\'s hope. Here is a farmer who reads his land and his sky with the eye of long experience, waiting for the single good rain that will secure his harvest. When the rain begins, his delight is so great that he pictures the falling drops as money, a picture that shows how closely a poor farmer\'s income is tied to the weather. The reader shares his excitement, and that is exactly the point: the higher the hope, the harder the fall that follows. The same sky that seemed to bless the family is about to betray it.',
  parts: [
    child('a', mcq({ t: 5, d: 2, c: 'understanding', stem: 'Why does Lencho picture the raindrops as money?', opts: ['A good rain means a good harvest and income for him.', 'He has found coins in his field.', 'He wants to sell rainwater in town.', 'He is dreaming about winning a prize.'], sol: 'For a farmer, rain turns into crops and crops into money; the picture links the weather directly to his earnings.' })),
    child('b', mcq({ t: 4, d: 3, c: 'analysis', stem: 'According to the commentary, why does the writer build up Lencho\'s hope before the storm?', opts: ['to make the coming disaster feel more painful', 'to show that Lencho is lazy', 'to describe the town in detail', 'to introduce the postmaster early'], sol: 'The commentary says the higher the hope, the harder the fall: the build-up sharpens the shock of the hailstorm.' })),
    child('c', fb({ t: 1, d: 1, c: 'recall', stem: 'The weather event that destroys Lencho\'s crop is a ___.', acc: [['hailstorm', 'hail storm', 'hail']], sol: 'Heavy **hail** (a hailstorm) falls for about an hour and ruins the crop.' })),
    child('d', short({ t: 3, d: 2, c: 'understanding', marks: 1, stem: 'What does the phrase *reads his land and his sky with the eye of long experience* tell us about Lencho?', model: 'He is an experienced farmer who understands his fields and the weather well.', sol: 'The phrase points to his practical knowledge of farming and weather.', scheme: [['Experienced farmer who understands land and weather', 1]] })),
    child('e', mcq({ t: 5, d: 2, c: 'understanding', stem: 'Which word in the commentary suggests that the storm felt unfair to the family?', opts: ['betray', 'delight', 'harvest', 'experience'], sol: 'To *betray* is to harm someone who trusted you: the sky that seemed to bless them now harms them.' })),
  ],
  sol: 'Answer from the commentary first, then from your knowledge of the story. Look for the exact word or idea each part asks about.',
}));
Q('src_night', source({
  t: [5, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'The night after the hailstorm is the turning point of the story. The family has lost almost everything it worked for, and fear of hunger hangs over the house. Yet the mood does not end in complete despair. The family members try to console one another, and all of them cling to one remaining hope: that God will not abandon them. This single hope, held on to through the night, prepares us for Lencho\'s unusual decision. What will make the post office staff laugh later is, at this moment, the only light in a ruined household.',
  parts: [
    child('a', mcq({ t: 5, d: 2, c: 'understanding', stem: 'What does the family fear most after the hailstorm?', opts: ['going hungry in the coming year', 'being robbed', 'losing their house in a flood', 'Lencho falling ill'], sol: 'With the crop destroyed, there will be no food or income for the year.' })),
    child('b', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Why does the commentary call this night a turning point?', opts: ['Despair turns into the hope that leads Lencho to write to God.', 'The family decides to leave the valley.', 'The postmaster visits the family.', 'The rain returns and saves the crop.'], sol: 'The family\'s single hope in God leads directly to Lencho\'s letter, which drives the rest of the plot.' })),
    child('c', fb({ t: 5, d: 2, c: 'understanding', stem: 'The family\'s one remaining hope is help from ___.', acc: [['God']], sol: 'They hope **God** will help them.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'What contrast does the commentary draw between how the post office staff will react to Lencho\'s faith and what it means to his family now?', model: 'The staff will find it funny, but for the ruined family it is their only hope.', sol: 'Outsiders later laugh at it; for the family on that night it is the one source of hope.', scheme: [['Amusing to the staff later vs the only hope for the family now', 1]] })),
    child('e', mcq({ t: 3, d: 2, c: 'understanding', stem: 'What do the family members do for one another on this night, according to the commentary?', opts: ['They try to console one another.', 'They blame one another for the loss.', 'They leave for the town.', 'They sell their land.'], sol: 'The commentary says they try to console one another.' })),
  ],
  sol: 'Each part is answered from the commentary; part (b) also needs your knowledge of what Lencho does next.',
}));
Q('src_letter', source({
  t: [5, 3], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'Lencho\'s decision to write to God shows a faith with no room for doubt. He does not pray and wait; he writes, as if God were a reliable person who would read and reply. His request is practical, not greedy: he asks for exactly enough money to replant and to feed his family until the next harvest. Even the way he posts it is businesslike, with a stamp and an address. The humour of an envelope addressed to God should not hide the seriousness of his situation. For Lencho, God is not distant; God is someone you can correspond with.',
  parts: [
    child('a', mcq({ t: 5, d: 1, c: 'recall', stem: 'How much money does Lencho ask for in his first letter?', opts: ['a hundred pesos', 'seventy pesos', 'fifty pesos', 'a thousand pesos'], sol: 'He asks for **a hundred pesos**.' })),
    child('b', mcq({ t: 3, d: 3, c: 'analysis', stem: 'The commentary calls Lencho\'s request *practical, not greedy* because he…', opts: ['asks only for what he needs to replant and survive till the harvest', 'asks for a new house and land', 'refuses to work any more', 'wants money to travel to the city'], sol: 'He asks for just enough to sow again and feed his family until the next crop.' })),
    child('c', fb({ t: 5, d: 2, c: 'understanding', stem: 'Lencho writes the address ___ on the envelope and posts it in town.', acc: [['To God', 'God']], sol: 'The envelope is addressed **To God**.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'What does the commentary mean by *God is someone you can correspond with*?', model: 'Lencho treats God as a real person who will read his letter and reply, like a friend or official.', sol: 'To correspond is to exchange letters; Lencho\'s faith makes God as real as any person.', scheme: [['God seen as a real person who reads and replies', 1]] })),
    child('e', mcq({ t: 4, d: 2, c: 'understanding', stem: 'What does the commentary say should not be hidden by the humour of the envelope?', opts: ['the seriousness of Lencho\'s situation', 'the postmaster\'s greed', 'the beauty of the valley', 'the cost of the stamp'], sol: 'However funny the address looks, the family really faces hunger.' })),
  ],
  sol: 'Separate what the commentary says (parts b, d, e) from facts you know from the story (parts a, c).',
}));
Q('src_postmaster', source({
  t: [5, 3], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'The postmaster\'s first response is laughter, the same as his employee\'s. What makes him memorable is how quickly that laughter turns to respect. He recognises in the letter a faith stronger than his own. Rather than let such faith be crushed by silence, he decides to answer the letter. This takes more than kind feelings: it needs money, and he finds it from his staff, his friends and his own salary. He then signs the reply in a way that leaves himself out of the story completely. His goodness is quiet, practical and unselfish.',
  parts: [
    child('a', mcq({ t: 3, d: 2, c: 'understanding', stem: 'What is the postmaster\'s first reaction to the letter?', opts: ['He laughs.', 'He tears it up.', 'He sends it back to Lencho.', 'He reports it to the police.'], sol: 'Like his employee, he first laughs at the unusual address.' })),
    child('b', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Why does he decide to answer the letter?', opts: ['He does not want Lencho\'s faith in God to be shaken.', 'He wants to be famous.', 'He is ordered to by his seniors.', 'He hopes Lencho will repay him.'], sol: 'He admires the faith and does not want it destroyed by getting no reply.' })),
    child('c', fb({ t: 5, d: 2, c: 'recall', stem: 'The postmaster signs the reply with one word: ___.', acc: [['God']], sol: 'He signs it **God**, keeping himself out of the picture.' })),
    child('d', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'Give one detail from the commentary that shows the postmaster\'s goodness is *practical*.', model: 'He collects money from his staff and friends and gives part of his own salary.', sol: 'Practical goodness acts, not just feels: he raises real money.', scheme: [['Collecting money / giving part of his salary', 1]] })),
    child('e', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Which quality of the postmaster is shown by the way he signs the reply?', opts: ['humility', 'pride', 'greed', 'anger'], sol: 'He seeks no credit, which shows humility (and unselfishness).' })),
  ],
  sol: 'Parts (a), (b) and (e) follow from the commentary; (c) is a fact from the story; (d) asks you to pick evidence.',
}));
Q('src_money', source({
  t: [5, 1, 4], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'When Lencho opens the envelope, he is not surprised to find money in it; he had never doubted that God would answer. Counting it is what changes his mood. He receives just over half of what he asked for, and in his mind there is only one explanation. The shortfall cannot be God\'s doing, so someone must have stolen the rest. The reader, who knows how hard the postmaster worked to collect even this amount, feels the sting of the misunderstanding. Lencho\'s certainty, which was his strength the night after the storm, now blinds him to the kindness right in front of him.',
  parts: [
    child('a', fb({ t: 1, d: 1, c: 'recall', stem: 'Lencho receives ___ pesos instead of the hundred he asked for.', acc: [['seventy', '70']], sol: 'He receives **seventy** (70) pesos, just over half.' })),
    child('b', mcq({ t: 1, d: 2, c: 'understanding', stem: 'Why is Lencho NOT surprised to find money in the envelope?', opts: ['He was certain God would answer.', 'The postman had told him in advance.', 'He had sent money to himself.', 'He expected a loan from the bank.'], sol: 'His faith was so complete that he took the reply for granted.' })),
    child('c', mcq({ t: 4, d: 3, c: 'analysis', stem: 'The reader *feels the sting of the misunderstanding* because the reader knows that…', opts: ['the people Lencho suspects are the ones who helped him', 'God actually sent a hundred pesos', 'Lencho stole the money himself', 'the postmaster kept thirty pesos'], sol: 'This is dramatic irony: the reader knows the truth that Lencho does not.' })),
    child('d', short({ t: 4, d: 3, c: 'analysis', marks: 1, stem: 'How does Lencho\'s certainty change from a strength into a weakness, according to the commentary?', model: 'It gave him hope after the storm, but now it makes him blind to the postmaster\'s kindness.', sol: 'The same unquestioning faith that sustained him now leads him to a false accusation.', scheme: [['Hope earlier vs blindness to kindness now', 1]] })),
    child('e', mcq({ t: 3, d: 2, c: 'understanding', stem: 'What emotion does counting the money produce in Lencho?', opts: ['anger', 'gratitude', 'fear', 'boredom'], sol: 'He becomes angry, convinced that part of the money was stolen.' })),
  ],
  sol: 'Note the difference between Lencho\'s view (God cannot err, so someone stole) and the reader\'s knowledge (the postmaster collected what he could).',
}));
Q('src_irony', source({
  t: [5, 4, 2], d: 4, c: 'evaluation', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'The final twist of the story turns gratitude upside down. Lencho writes again, asking God for the rest of the money and warning God not to use the post, because he believes the post office staff are thieves. The only people in the story who sacrificed anything for him are the very people he accuses. Fuentes does not explain or judge; he simply lets the letter speak. The effect is both comic and sad. We smile at Lencho\'s innocence, but we also wonder how often kindness goes unrecognised, and whether faith in God should make us blind to goodness in people.',
  parts: [
    child('a', mcq({ t: 4, d: 2, c: 'understanding', stem: 'The ending of the story is an example of…', opts: ['situational irony', 'a happy reunion', 'a flashback', 'a dream sequence'], sol: 'The outcome is the opposite of what we would expect: the helpers are accused of theft.' })),
    child('b', mcq({ t: 5, d: 2, c: 'understanding', stem: 'Why does Lencho ask God not to send the money by post?', opts: ['He believes the post office employees stole part of it.', 'The post office is closing down.', 'He wants to collect it from a bank.', 'The postage is too expensive.'], sol: 'He suspects the post office staff of taking the missing money.' })),
    child('c', fb({ t: 4, d: 3, c: 'analysis', stem: 'The commentary says the effect of the ending is both comic and ___.', acc: [['sad']], sol: 'It is comic (we smile at his innocence) and **sad** (kindness goes unrecognised).' })),
    child('d', short({ t: 2, d: 4, c: 'evaluation', marks: 1, stem: 'Why might the writer choose *not to explain or judge* at the end?', model: 'Leaving the letter without comment lets readers see the irony and judge for themselves, which makes the ending stronger.', sol: 'An unexplained ending trusts the reader and deepens the impact of the irony.', scheme: [['Lets readers judge / strengthens the irony', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'evaluation', stem: 'Which question does the commentary say the ending raises?', opts: ['whether faith in God should blind us to goodness in people', 'whether hailstorms can be predicted', 'whether farmers should move to towns', 'whether letters should be written in ink'], sol: 'The commentary ends on exactly this question about faith and recognising human kindness.' })),
  ],
  sol: 'For irony questions, state what was expected, what actually happened, and who knows the truth.',
}));
Q('src_storm', source({
  t: [5, 1, 2], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'Nature plays two roles in this story. At first it is the giver: the family\'s whole year depends on rain, and the first drops feel like a reward. Within moments it becomes the destroyer. Strong wind and hail sweep across the valley for about an hour and leave the crop in ruins, with nothing left to harvest. Fuentes uses this sudden reversal to show how helpless a small farmer is before the weather. There is no insurance and no savings in Lencho\'s world; there is only the next crop. That helplessness explains why his hope turns so completely towards God.',
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'understanding', stem: 'What are the *two roles* nature plays in the story, according to the commentary?', opts: ['giver and destroyer', 'teacher and judge', 'friend and messenger', 'healer and guide'], sol: 'Rain gives hope; hail destroys the crop.' })),
    child('b', fb({ t: 1, d: 1, c: 'recall', stem: 'The hail falls for about an ___.', acc: [['hour']], sol: 'The hailstorm lasts about an **hour**.' })),
    child('c', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Why, according to the commentary, does Lencho turn so completely to God?', opts: ['A small farmer with no savings is helpless before the weather.', 'He has quarrelled with his neighbours.', 'The government has refused to help him.', 'He has always disliked farming.'], sol: 'With no insurance or savings, nothing but God seems able to help.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'What does the commentary mean by *there is only the next crop*?', model: 'The family has no savings or insurance; its survival depends entirely on each harvest.', sol: 'Everything the family has rests on the crop, so losing it means losing everything.', scheme: [['Survival depends entirely on the harvest', 1]] })),
    child('e', mcq({ t: 4, d: 2, c: 'understanding', stem: 'The quick change from rain to hail is described in the commentary as a sudden…', opts: ['reversal', 'celebration', 'journey', 'argument'], sol: 'A *reversal* is a sudden change to the opposite.' })),
  ],
  sol: 'Read for the commentary\'s key ideas (giver/destroyer, helplessness) and connect them to Lencho\'s decision.',
}));

// ================================================================ short answers, 3 marks (40–50 words)
const SA3 = { marks: 3, wl: [40, 50], scheme: SCHEME3, time: 240 };
Q('sa_why_letter', short({
  ...SA3, t: 1, d: 2, c: 'understanding',
  stem: 'Why did Lencho write a letter to God? Answer in 40–50 words.',
  model: 'A hailstorm destroyed Lencho\'s ripe crop, leaving his family facing hunger for the whole year. With no one else to turn to, and with complete faith that God would help, he wrote asking for a hundred pesos to replant and survive.',
  sol: 'Cause (hail ruined the crop; hunger ahead) + reason for choosing God (complete faith; no other help) + what he asked for.',
}));
Q('sa_coins', short({
  ...SA3, t: [4, 1], d: 3, c: 'analysis',
  stem: 'How does Lencho\'s way of seeing the raindrops reveal his hopes, and how does it prepare the reader for what follows? Answer in 40–50 words.',
  model: 'The comparison shows that Lencho sees rain as money, because a good shower means a good harvest and income. It reveals his optimism and his practical, farmer\'s way of thinking, and it raises our hopes so that the destruction that follows feels even crueller.',
  sol: 'Device (comparison of drops to coins) + what it shows (rain = income; optimism) + its effect in the story (sharpens the reversal).',
}));
Q('sa_postmaster_change', short({
  ...SA3, t: 3, d: 2, c: 'understanding',
  stem: 'How did the postmaster\'s reaction to Lencho\'s letter change? Answer in 40–50 words.',
  model: 'At first the postmaster laughed at a letter addressed to God, just as the postman had. Soon he became serious, struck by a faith stronger than his own. He then decided to answer the letter so that Lencho\'s trust would not be shaken.',
  sol: 'First reaction (laughter) → change (seriousness, admiration) → resulting decision (reply).',
}));
Q('sa_collection', short({
  ...SA3, t: [1, 3], d: 2, c: 'understanding',
  stem: 'How did the postmaster collect money for Lencho, and why could he not send the full amount? Answer in 40–50 words.',
  model: 'He asked his employees for contributions, gave a part of his own salary and asked his friends to chip in for a good cause. Even so, he could not raise a hundred pesos and managed only just over half, which he sent to Lencho.',
  sol: 'Three sources (staff, own salary, friends) + the result (a little over half, seventy pesos).',
}));
Q('sa_no_surprise', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'Lencho stays calm when he opens the envelope. What does this tell us about him, and why does it matter for what follows? Answer in 40–50 words.',
  model: 'Lencho was so sure that God would answer his letter that the money seemed only natural to him. His calm shows how complete and unquestioning his faith was. It also prepares us for his anger, because someone so certain cannot imagine that God sent less.',
  sol: 'Reason (certainty of faith) + what it shows (unquestioning belief) + link to what follows (anger at the shortfall).',
}));
Q('sa_angry', short({
  ...SA3, t: [1, 3], d: 2, c: 'understanding',
  stem: 'Counting the money changed Lencho\'s mood. Explain why, in 40–50 words.',
  model: 'Lencho had asked for a hundred pesos but found only seventy. Sure that God never errs, he decided that the missing thirty pesos had been stolen at the post office. His calm turned to anger at the thought that dishonest people had cheated him of God\'s help.',
  sol: 'Shortfall (70 of 100) + his reasoning (God cannot err) + conclusion (theft by post office staff).',
}));
Q('sa_hail_effect', short({
  ...SA3, t: 1, d: 2, c: 'understanding',
  stem: 'In what way does the hailstorm change the family\'s future and its mood? Answer in 40–50 words.',
  model: 'The hail fell for about an hour and destroyed the ripe corn and the flowering plants, leaving nothing to harvest. The family, which depended entirely on this crop, was filled with sadness and feared it would go hungry for the whole year.',
  sol: 'Damage (crop ruined) + effect on the family (grief, fear of hunger).',
}));
Q('sa_sign_god', short({
  ...SA3, t: [3, 2], d: 3, c: 'analysis',
  stem: 'Why did the postmaster sign his reply as God? Answer in 40–50 words.',
  model: 'The postmaster wanted Lencho to believe that God himself had answered, so that his faith would remain unshaken. Signing as God also kept the helpers hidden. It shows the postmaster\'s humility: he wanted no thanks or credit for his generosity.',
  sol: 'Purpose (keep the faith intact) + effect (helpers hidden) + what it shows (humility).',
}));
Q('sa_irony_crooks', short({
  ...SA3, t: [4, 2], d: 3, c: 'analysis',
  stem: 'Lencho\'s second letter is addressed to God but is really an accusation. Against whom, and why does this make the ending ironic? Answer in 40–50 words.',
  model: 'Lencho blamed the post office employees, believing they had stolen part of God\'s money. This is ironic because these very people, led by the postmaster, had collected the money out of kindness. The helpers are accused of being thieves by the man they helped.',
  sol: 'Who was blamed + what actually happened + why that contrast is irony.',
}));
Q('sa_literate', short({
  ...SA3, t: [3, 4], d: 3, c: 'application',
  stem: 'Lencho is able to write. Why is this skill important to the plot? Answer in 40–50 words.',
  model: 'Because Lencho can write, he is able to send his request to God as a letter. Without this skill there would be no letter, no postmaster\'s reply and no second letter accusing the post office. The detail makes the whole chain of events possible.',
  sol: 'Link the trait (literacy) to the key events it makes possible (both letters, the reply).',
}));
Q('sa_faith_justified', short({
  ...SA3, t: 2, d: 4, c: 'evaluation',
  stem: 'Was Lencho\'s faith in God justified? Give your view with reasons from the story in 40–50 words.',
  model: 'In a sense, yes: help did come, though through people rather than directly from God. However, his faith became blind when it made him accuse the very people who helped him. So his faith brought relief but also made him ungrateful without realising it.',
  sol: 'A clear view + evidence for (help arrived) + evidence against (blind faith, false accusation) + balanced conclusion.',
}));
Q('sa_postman_vs', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'Compare the reactions of the postman and the postmaster to Lencho\'s first letter. Answer in 40–50 words.',
  model: 'The postman found the letter to God amusing and took it to his boss laughing. The postmaster laughed too at first, but he quickly grew serious, admired the writer\'s faith and decided to answer it. The postmaster\'s reaction is deeper and leads to action.',
  sol: 'Postman: amusement only. Postmaster: amusement → respect → action. Conclude with the difference.',
}));

// ================================================================ short answers, 2 marks (30–40 words)
const SA2 = { marks: 2, wl: [30, 40], scheme: SCHEME2, time: 150 };
Q('sb_hundred', short({
  ...SA2, t: 1, d: 1, c: 'recall',
  stem: 'What did Lencho need the hundred pesos for? Answer in 30–40 words.',
  model: 'The hail had wiped out his crop, so Lencho needed money to buy seed and replant, and to keep his family fed until the next harvest. Without it, they would have nothing to eat.',
  sol: 'Two uses: replanting + living until the next harvest.',
}));
Q('sb_house', short({
  ...SA2, t: 1, d: 1, c: 'recall',
  stem: 'Describe the setting of Lencho\'s home and explain why it suited a farmer. Answer in 30–40 words.',
  model: 'The family had no neighbours in the valley; their home stood on high ground above the fields. Its position let the family keep watch over their maize, the river and the clouds that would bring rain.',
  sol: 'Setting (isolated, on high ground above the valley) + why it suited a farmer (he could watch his crop and the sky).',
}));
Q('sb_contentment', short({
  ...SA2, t: 3, d: 2, c: 'understanding',
  stem: 'How did the postmaster feel as he watched Lencho receive the envelope, and why? Answer in 30–40 words.',
  model: 'He felt quietly pleased and satisfied. His plan had worked: a poor farmer in real need had been helped, the farmer\'s trust in God was safe, and nobody would know who had really helped.',
  sol: 'Feeling (quiet satisfaction) + reason (the plan worked; the farmer helped; faith preserved).',
}));
Q('sb_not_mail', short({
  ...SA2, t: 1, d: 2, c: 'understanding',
  stem: 'Why did Lencho ask God not to send the rest of the money by mail? Answer in 30–40 words.',
  model: 'Lencho believed that the post office employees had stolen thirty pesos from God\'s money. So he asked God to send the remaining amount some other way, where they could not take it.',
  sol: 'His suspicion of the staff + the request it led to.',
}));
Q('sb_wife', short({
  ...SA2, t: 3, d: 2, c: 'understanding',
  stem: 'How does the family\'s mood change within a single afternoon, and why? Answer in 30–40 words.',
  model: 'The family is joyful when the long-awaited rain begins, because it promises a fine harvest. Within about an hour, hail destroys the crop, and their joy turns into grief and fear of hunger.',
  sol: 'Before (joy at the rain, and the reason) + after (grief and fear, caused by the hail).',
}));
Q('sb_sunday', short({
  ...SA2, t: 1, d: 2, c: 'application',
  stem: 'Lencho goes to town on Sundays to post and collect his letters. What does this routine suggest about his life during the week? Answer in 30–40 words.',
  model: 'It suggests that Lencho works in his fields every other day and can travel to town only on his weekly day off. His time is completely taken up by hard farm work.',
  sol: 'Inference from the routine (Sunday = only free day) + what it shows (a life of constant labour).',
}));

// ================================================================ long answers, 6 marks (100–120 words)
const LA = { marks: 6, wl: [100, 120], scheme: LONG_SCHEME, time: 720 };
Q('la_lencho', long({
  ...LA, t: 3, d: 3, c: 'analysis',
  stem: 'Write a character sketch of Lencho, supporting each trait with an incident from the story. Answer in 100–120 words.',
  model: 'Lencho is a hard-working farmer who understands his land and watches the sky closely, knowing that one good rain will secure his harvest. He is optimistic, seeing the first raindrops as money falling for his family. His greatest quality is his simple, total faith in God: after the hailstorm he writes to God for a hundred pesos and takes the arrival of money calmly. He is also literate and practical, asking only for what he needs to replant and survive. However, his faith makes him naive and suspicious of people. Without realising it, he becomes ungrateful, accusing the post office staff who helped him of stealing. He is innocent rather than wicked.',
  sol: 'Four or five traits, each tied to an incident in your own words: hard-working/experienced; optimistic (raindrops as money); faithful (letter, no surprise); practical (the exact request); naive and suspicious (second letter). End with an overall judgement.',
}));
Q('la_hero', long({
  ...LA, t: [3, 2], d: 4, c: 'evaluation',
  stem: 'The postmaster is the real hero of *A Letter to God*. Do you agree? Give reasons in 100–120 words.',
  model: 'I agree that the postmaster is the real hero. Although he first laughs at the letter, he quickly recognises the depth of Lencho\'s faith and decides that it must not be crushed. He turns this feeling into action, collecting money from his staff and friends and giving part of his own salary. He then signs the reply as God, seeking no credit, and is quietly pleased when his plan works. Lencho is the central character, but he only receives; the postmaster gives without being asked. The irony that he is finally called a thief makes his goodness stand out even more. His humility and generosity make him the story\'s true hero.',
  sol: 'Take a clear stand; support it with three or four actions of the postmaster (respect for faith, collection, own salary, signing as God); contrast him with Lencho; use the irony of the ending to strengthen the conclusion. A reasoned "disagree" (Lencho\'s faith drives the story) can also earn full marks.',
}));
Q('la_irony', long({
  ...LA, t: [4, 2], d: 4, c: 'analysis',
  stem: 'Explain the irony in *A Letter to God* and how it shapes the story\'s message. Answer in 100–120 words.',
  model: 'The story ends in situational irony. Lencho asks God for money, and the postmaster, moved by his faith, collects seventy pesos from his staff, his friends and his own salary. Instead of being grateful, Lencho is angry that thirty pesos are missing and warns God not to use the post because the employees are thieves. The only people who helped him are accused of stealing from him. There is also dramatic irony, since the reader knows the truth while Lencho does not. This irony carries the message: blind faith can make us overlook the goodness of ordinary people, and kindness often goes unrecognised. The ending is both funny and sad.',
  sol: 'Define the irony (expected vs actual), trace it through the events, name the dramatic irony (reader vs Lencho), and connect it to the theme of faith and unrecognised kindness.',
}));
Q('la_diary', long({
  ...LA, t: [5, 3], d: 4, c: 'application', bloom: 'create',
  stem: 'Imagine you are the postmaster. Write a diary entry on the evening you read Lencho\'s second letter, in 100–120 words.',
  model: 'Sunday, 9 p.m.\n\nToday I learnt how strange kindness can be. The farmer who wrote to God came again and wrote a second letter at our counter. I opened it as soon as he left, expecting thanks. Instead, he complained that thirty pesos were missing and asked God to send the rest, but not by post, because, he says, my staff are thieves! I laughed at first, and then felt a little hurt. My colleagues gave from their small salaries, and so did I. Still, his faith is untouched, and that was what we wanted to protect. Perhaps goodness should not need thanks. Tomorrow I must decide whether to tell the others.',
  sol: 'Diary format (date/time, first person, past events of the day, feelings, reflection). Content must fit the story: second letter, seventy pesos, the accusation, the staff\'s contributions, his reaction. Extrapolation (hurt, humour, reflection) must be consistent with his character.',
}));
Q('la_apology', long({
  ...LA, t: [5, 2], d: 4, c: 'application', bloom: 'create',
  stem: 'Suppose Lencho later discovers that the money came from the postmaster and his staff. Write the letter he might send to the postmaster, in 100–120 words.',
  model: 'Respected Sir,\n\nI am the farmer from the valley who wrote to God after the hail ruined my corn. I have just learnt that the seventy pesos I received came from you, your staff and your friends, not from heaven directly. I am deeply ashamed of my second letter. In my anger I called your employees thieves, when in truth they had given me their own money. Please forgive me and tell them that I am sorry. I now understand that God answered my prayer through your kind hearts. When my new crop is harvested, I will repay every peso and bring you the first of my corn.\n\nYours gratefully,\nLencho',
  sol: 'Letter format (salutation, body, close). Content: recognition of the truth, apology for the accusation, thanks, a changed understanding of how help came, a promise. The tone must suit a humble, honest farmer.',
}));
Q('la_faith', long({
  ...LA, t: 2, d: 4, c: 'evaluation',
  stem: 'Faith can give strength, but blind faith can make us unfair to others. Discuss with reference to *A Letter to God*, in 100–120 words.',
  model: 'Lencho\'s faith gives him strength at his lowest point. When the hail destroys his crop and his family fears hunger, it is faith that stops him from giving up and leads him to ask God for help. That same faith moves the postmaster, who wishes he believed as strongly. Yet Lencho\'s faith is blind as well as strong. Because he cannot imagine God sending less than he asked for, he concludes that people stole from him, and he insults the very men who helped him. The story suggests that faith in God and trust in people should go together. Faith that sees no goodness in humans can turn hope into injustice.',
  sol: 'Two-sided discussion: faith as strength (hope after the storm; inspiring the postmaster) and as blindness (false accusation). Conclude with a balanced message, using events in your own words.',
}));
Q('la_nature', long({
  ...LA, t: [2, 1], d: 3, c: 'analysis',
  stem: 'How does *A Letter to God* show a farmer\'s complete dependence on nature? Answer in 100–120 words.',
  model: 'The story shows that a small farmer\'s whole life depends on the weather. Lencho\'s family has worked all year, and only one good rain is needed for a rich harvest. When rain comes, Lencho is overjoyed and sees each drop as money. But nature changes in a moment: a storm of hail falls for about an hour and ruins the entire crop. With no savings or other income, the family now fears hunger for a whole year. Their only hope is God. Through this sudden reversal, Fuentes shows how fragile the farmer\'s existence is, and why his faith matters so much to him.',
  sol: 'Trace the dependence: the year\'s work → the need for rain → joy at rain → destruction by hail → fear of hunger → turning to God. Conclude on fragility and faith.',
}));

// ================================================================ objective items
Q('mc_author', mcq({ t: 1, d: 1, c: 'recall', stem: 'Who wrote *A Letter to God*?', opts: ['G. L. Fuentes', 'Robert Frost', 'Anton Chekhov', 'Gavin Maxwell'], sol: 'The story is by the Mexican writer G. L. (Gregorio López y) Fuentes. Frost, Chekhov and Maxwell wrote other texts in the Class 10 books.' }));
Q('mc_currency', mcq({ t: 1, d: 1, c: 'recall', stem: 'In which currency does Lencho ask for money?', opts: ['pesos', 'rupees', 'dollars', 'pounds'], sol: 'He asks for pesos, the currency of Mexico.' }));
Q('mc_crop', mcq({ t: 1, d: 1, c: 'recall', stem: 'Which crop of Lencho\'s is ruined by the hail?', opts: ['corn', 'rice', 'wheat', 'cotton'], sol: 'His field of ripe corn (maize) is destroyed.' }));
Q('mc_who_handed', mcq({ t: 1, d: 2, c: 'recall', stem: 'Who hands the envelope with the money to Lencho?', opts: ['the postman', 'the postmaster', 'Lencho\'s wife', 'a priest'], sol: 'The postman hands it over while the postmaster watches from his office.' }));
Q('mc_irony_type', mcq({ t: 4, d: 2, c: 'application', stem: 'The ending, in which Lencho accuses his helpers of theft, is an example of…', opts: ['irony', 'alliteration', 'onomatopoeia', 'rhyme'], sol: 'An outcome opposite to what is expected is irony.' }));
Q('mc_faith_theme', mcq({ t: 2, d: 2, c: 'understanding', stem: 'Which is the central theme of the story?', opts: ['faith', 'revenge', 'adventure', 'friendship between animals'], sol: 'Lencho\'s unquestioning faith in God drives every major event.' }));
Q('mc_postmaster_trait', mcq({ t: 3, d: 2, c: 'analysis', stem: 'Which quality of the postmaster is shown when he gives part of his own salary?', opts: ['generosity', 'greed', 'laziness', 'jealousy'], sol: 'Giving his own money for a stranger is generous.' }));
Q('mc_lencho_flaw', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Which of these is the best description of Lencho\'s behaviour in his second letter?', opts: ['unknowingly ungrateful', 'deliberately cruel', 'humble and thankful', 'indifferent to the money'], sol: 'He does not know who helped him, so his ingratitude is unknowing, not deliberate; he certainly is not thankful or indifferent.' }));
Q('mc_dramatic', mcq({ t: 4, d: 3, c: 'analysis', stem: 'The reader knows where the money came from, but Lencho does not. This is called…', opts: ['dramatic irony', 'a simile', 'a flashback', 'foreshadowing'], sol: 'When the audience knows something a character does not, it is dramatic irony.' }));
Q('mc_narrator', mcq({ t: 4, d: 2, c: 'understanding', stem: 'From which point of view is the story told?', opts: ['a third-person narrator', 'Lencho, in the first person', 'the postmaster, in the first person', 'a series of letters only'], sol: 'An outside narrator tells the story, describing Lencho, his family and the post office.' }));
Q('mc_amiable', mcq({ t: 4, d: 2, c: 'understanding', stem: 'The postmaster is described as *amiable*. This means he is…', opts: ['friendly and pleasant', 'strict and harsh', 'rich and proud', 'old and weak'], sol: '*Amiable* = good-natured, friendly.' }));
Q('mc_why_reply', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Why does the postmaster decide to reply to Lencho\'s letter?', opts: ['so that Lencho\'s faith in God is not shaken', 'to return the stamp money', 'because the law requires it', 'to make fun of Lencho'], sol: 'He admires the faith and wants to protect it.' }));
Q('mc_message', mcq({ t: 2, d: 3, c: 'evaluation', stem: 'Which message does the story most strongly suggest?', opts: ['Kindness often goes unrecognised, even by those it helps.', 'Farmers should never trust the weather.', 'Letters should always be sent by registered post.', 'Money solves every problem.'], sol: 'The ending shows the helpers being accused instead of thanked: kindness unrecognised.' }));
Q('mc_simile_own', mcq({ t: 4, d: 3, c: 'application', stem: 'Lencho\'s view of raindrops as coins is a comparison. Which of these SOYL-written sentences uses the same kind of device?', opts: ['The fireflies were tiny lanterns floating over the paddy.', 'The bus left at seven.', 'Ravi shouted loudly at the umpire.', 'We ate rice and dal for lunch.'], sol: 'Only the first sentence compares one thing to another (fireflies → lanterns), as Lencho compares raindrops to coins; the others are literal statements.' }));

Q('fb_amounts', fb({ t: 1, d: 1, c: 'recall', marks: 1, stem: 'Lencho asked God for ___ pesos but received only ___ pesos.', acc: [['a hundred', 'one hundred', '100', 'hundred'], ['seventy', '70']], sol: 'He asked for **a hundred** (100) and received **seventy** (70).', scheme: [['100', 0.5], ['70', 0.5]] }));
Q('fb_day', fb({ t: 1, d: 2, c: 'recall', stem: 'Lencho wrote his first letter and later collected the reply on a ___.', acc: [['Sunday']], sol: 'Both happen on a **Sunday**, his day off from the fields.' }));
Q('fb_signed', fb({ t: 1, d: 1, c: 'recall', stem: 'The reply that reached Lencho was signed with a single word: ___.', acc: [['God']], sol: 'It was signed **God**.' }));
Q('fb_device', fb({ t: 4, d: 3, c: 'understanding', stem: 'When the result of an action is the opposite of what we expect, as at the end of this story, the device is called situational ___.', acc: [['irony']], sol: 'Situational **irony**: Lencho\'s helpers are accused of theft.' }));

Q('ar_faith', ar({ t: [2, 3], d: 3, c: 'analysis', a: 'Lencho is not surprised when he finds money in the envelope.', r: 'He has complete faith that God will answer his letter.', key: 'a', sol: 'Both are true, and his certain faith is exactly why he shows no surprise.' }));
Q('ar_postmaster', ar({ t: 3, d: 3, c: 'analysis', a: 'The postmaster signs the reply as God.', r: 'The postmaster laughs when he first sees the letter.', key: 'b', sol: 'Both statements are true, but his first laughter does not explain the signature; he signs as God to keep Lencho\'s faith intact.' }));
Q('ar_full', ar({ t: 1, d: 2, c: 'understanding', a: 'The postmaster sends Lencho the full hundred pesos.', r: 'The postmaster collects money from his employees, his friends and his own salary.', key: 'd', sol: 'A is false: he could collect only just over half (seventy pesos). R is true.' }));
Q('ar_thieves', ar({ t: [4, 1], d: 3, c: 'analysis', a: 'Lencho believes the post office employees took part of the money.', r: 'The post office employees are shown to be dishonest in the story.', key: 'c', sol: 'A is true. R is false: the employees contributed their own money; they are generous, not dishonest. That gap is the irony.' }));

Q('tf_rain', tf({ t: 1, d: 1, c: 'recall', stem: 'True or false: the rain at the beginning of the story makes Lencho happy.', ans: true, sol: 'He is overjoyed, because a good rain means a good harvest.' }));
Q('tf_postman', tf({ t: 3, d: 2, c: 'recall', stem: 'True or false: the postman refuses to show the letter to his boss.', ans: false, sol: 'The postman takes the letter to the postmaster, laughing.' }));
Q('tf_ink', tf({ t: 1, d: 2, c: 'recall', stem: 'True or false: Lencho writes his second letter at the post office.', ans: true, sol: 'He asks for paper and ink at the counter and writes it there before posting it.' }));
Q('tf_charity', tf({ t: 3, d: 2, c: 'analysis', stem: 'True or false: the postmaster collects the money mainly to become famous in the town.', ans: false, sol: 'He hides his part completely by signing as God; his motive is to protect Lencho\'s faith.' }));

Q('ord_events', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange the events of the story in the correct order.',
  items: ['A long-awaited rain begins to fall on Lencho\'s field.', 'Hail destroys the ripe crop.', 'Lencho writes to God asking for a hundred pesos.', 'The postmaster collects money from his staff, friends and salary.', 'Lencho receives seventy pesos and becomes angry.', 'Lencho writes again, accusing the post office staff.'],
  sol: 'Rain → hail → first letter → collection → seventy pesos and anger → second letter.',
}));
Q('ord_postmaster', ord({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange the postmaster\'s actions in the order in which they happen.',
  items: ['He laughs at the letter addressed to God.', 'He grows serious and admires the writer\'s faith.', 'He decides to answer the letter.', 'He collects money for the reply.', 'He signs the reply as God.', 'He watches with satisfaction as Lencho receives it.'],
  sol: 'Laughter → respect → decision → collection → signature → satisfaction.',
}));

Q('mt_words', match({
  t: 4, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each word used in the story with its meaning.',
  pairs: [['downpour', 'heavy rain'], ['locusts', 'insects that destroy crops in swarms'], ['conscience', 'inner sense of right and wrong'], ['crooks', 'dishonest people; cheats']],
  sol: 'These are glossary words from the story; learn them with their meanings, not the sentences around them.',
}));
Q('mt_characters', match({
  t: 3, d: 2, c: 'recall', marks: 2,
  stem: 'Match each character with an action in the story.',
  pairs: [['Lencho', 'writes two letters to God'], ['The postman', 'shows the unusual letter to his boss'], ['The postmaster', 'collects money and signs the reply'], ['Lencho\'s family', 'fears a year of hunger after the storm']],
  sol: 'Each character\'s main action, in SOYL\'s words.',
}));
Q('mt_devices', match({
  t: [4, 2], d: 3, c: 'analysis', marks: 2,
  stem: 'Match each feature of the story with the literary term that describes it.',
  pairs: [['Raindrops imagined as coins', 'comparison (metaphor)'], ['Helpers accused of theft', 'situational irony'], ['Reader knows the truth, Lencho does not', 'dramatic irony'], ['Joy at the rain, then ruin by hail', 'contrast / reversal']],
  sol: 'Name the device by what it does: a comparison, an opposite outcome, a gap in knowledge, a sudden change.',
}));
