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
    child('b', mcq({ t: 4, d: 3, c: 'understanding', stem: 'According to the commentary, why does the writer build up Lencho\'s hope before the storm?', opts: ['to make the coming disaster feel more painful', 'to show that Lencho is lazy', 'to describe the town in detail', 'to introduce the postmaster early'], sol: 'The commentary says the higher the hope, the harder the fall: the build-up sharpens the shock of the hailstorm.' })),
    child('c', fb({ t: 1, d: 1, c: 'recall', stem: 'The weather event that destroys Lencho\'s crop is a ___.', acc: [['hailstorm', 'hail storm', 'hail']], sol: 'Heavy **hail** (a hailstorm) falls for about an hour and ruins the crop.' })),
    child('d', short({ t: 3, d: 2, c: 'understanding', marks: 1, stem: 'What does the phrase *reads his land and his sky with the eye of long experience* tell us about Lencho?', model: 'He is an experienced farmer who understands his fields and the weather well.', sol: 'The phrase points to his practical knowledge of farming and weather.', scheme: [['Experienced farmer who understands land and weather', 1]] })),
    child('e', mcq({ t: 5, d: 2, c: 'understanding', stem: 'Which word in the commentary suggests that the storm felt unfair to the family?', opts: ['betray', 'delight', 'harvest', 'experience'], sol: 'To *betray* is to harm someone who trusted you: the sky that seemed to bless them now harms them.' })),
  ],
  sol: 'Answer from the commentary first, then from your knowledge of the story. Look for the exact word or idea each part asks about.',
}));
Q('src_night', source({
  t: [5, 2], d: 3, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'The night after the hailstorm is the turning point of the story. The family has lost almost everything it worked for, and fear of hunger hangs over the house. Yet the mood does not end in complete despair. The family members try to console one another, and all of them cling to one remaining hope: that God will not abandon them. This single hope, held on to through the night, prepares us for Lencho\'s unusual decision. What will make the post office staff laugh later is, at this moment, the only light in a ruined household.',
  parts: [
    child('a', mcq({ t: 5, d: 2, c: 'understanding', stem: 'What does the family fear most after the hailstorm?', opts: ['going hungry in the coming year', 'being robbed', 'losing their house in a flood', 'Lencho falling ill'], sol: 'With the crop destroyed, there will be no food or income for the year.' })),
    child('b', mcq({ t: 2, d: 3, c: 'understanding', stem: 'Why does the commentary call this night a turning point?', opts: ['Despair turns into the hope that leads Lencho to write to God.', 'The family decides to leave the valley.', 'The postmaster visits the family.', 'The rain returns and saves the crop.'], sol: 'The family\'s single hope in God leads directly to Lencho\'s letter, which drives the rest of the plot.' })),
    child('c', fb({ t: 5, d: 2, c: 'understanding', stem: 'The family\'s one remaining hope is help from ___.', acc: [['God']], sol: 'They hope **God** will help them.' })),
    child('d', short({ t: 2, d: 3, c: 'understanding', marks: 1, stem: 'What contrast does the commentary draw between how the post office staff will react to Lencho\'s faith and what it means to his family now?', model: 'The staff will find it funny, but for the ruined family it is their only hope.', sol: 'Outsiders later laugh at it; for the family on that night it is the one source of hope.', scheme: [['Amusing to the staff later vs the only hope for the family now', 1]] })),
    child('e', mcq({ t: 3, d: 3, c: 'understanding', stem: 'The commentary says the family holds on to a single hope through the night. Which inference about their situation fits this best?', opts: ['They see no practical help left on earth, so God seems the only source of help.', 'They are sure the crop will recover by morning.', 'They have already decided to leave the valley.', 'They are angry with God for the storm.'], sol: 'A family with no crop, no savings and a single hope has run out of other options, so they turn to God as the only source of help. Nothing in the commentary suggests they expect the crop to recover, plan to leave or blame God.' })),
  ],
  sol: 'Each part is answered from the commentary; part (b) also needs your knowledge of what Lencho does next.',
}));
Q('src_letter', source({
  t: [5, 3], d: 3, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'Lencho\'s decision to write to God shows a faith with no room for doubt. He does not pray and wait; he writes, as if God were a reliable person who would read and reply. His request is practical, not greedy: he asks for exactly enough money to replant and to feed his family until the next harvest. Even the way he posts it is businesslike, with a stamp and an address. The humour of an envelope addressed to God should not hide the seriousness of his situation. For Lencho, God is not distant; God is someone you can correspond with.',
  parts: [
    child('a', mcq({ t: 5, d: 1, c: 'recall', stem: 'How much money does Lencho ask for in his first letter?', opts: ['a hundred pesos', 'seventy pesos', 'fifty pesos', 'a thousand pesos'], sol: 'He asks for **a hundred pesos**.' })),
    child('b', mcq({ t: 3, d: 3, c: 'understanding', stem: 'The commentary calls Lencho\'s request *practical, not greedy* because he…', opts: ['asks only for what he needs to replant and survive till the harvest', 'asks for a new house and land', 'refuses to work any more', 'wants money to travel to the city'], sol: 'He asks for just enough to sow again and feed his family until the next crop.' })),
    child('c', fb({ t: 5, d: 2, c: 'understanding', stem: 'Lencho writes the address ___ on the envelope and posts it in town.', acc: [['To God', 'God']], sol: 'The envelope is addressed **To God**.' })),
    child('d', short({ t: 2, d: 3, c: 'understanding', marks: 1, stem: 'What does the commentary mean by *God is someone you can correspond with*?', model: 'Lencho treats God as a real person who will read his letter and reply, like a friend or official.', sol: 'To correspond is to exchange letters; Lencho\'s faith makes God as real as any person.', scheme: [['God seen as a real person who reads and replies', 1]] })),
    child('e', mcq({ t: 4, d: 3, c: 'application', stem: 'Using the commentary\'s reasoning for calling Lencho\'s request *practical, not greedy*, which of these requests would NOT be called practical?', opts: ['asking God for money for a new house and extra land', 'asking for money to buy seed for replanting', 'asking for money to feed the family until the next harvest', 'asking for just the sum needed for seed and food'], sol: 'The commentary calls the request practical because it covers only replanting and survival until the harvest. A new house and extra land go beyond need, so that request would look greedy.' })),
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
    child('d', short({ t: 3, d: 3, c: 'understanding', marks: 1, stem: 'Give one detail from the commentary that shows the postmaster\'s goodness is *practical*.', model: 'He collects money from his staff and friends and gives part of his own salary.', sol: 'Practical goodness acts, not just feels: he raises real money.', scheme: [['Collecting money / giving part of his salary', 1]] })),
    child('e', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Which quality of the postmaster is shown by the way he signs the reply?', opts: ['humility', 'pride', 'greed', 'anger'], sol: 'He seeks no credit, which shows humility (and unselfishness).' })),
  ],
  sol: 'Parts (a), (b) and (e) follow from the commentary; (c) is a fact from the story; (d) asks you to pick evidence.',
}));
Q('src_money', source({
  t: [5, 1, 4], d: 3, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'When Lencho opens the envelope, he is not surprised to find money in it; he had never doubted that God would answer. Counting it is what changes his mood. He receives just over half of what he asked for, and in his mind there is only one explanation. The shortfall cannot be God\'s doing, so someone must have stolen the rest. The reader, who knows how hard the postmaster worked to collect even this amount, feels the sting of the misunderstanding. Lencho\'s certainty, which was his strength the night after the storm, now blinds him to the kindness right in front of him.',
  parts: [
    child('a', fb({ t: 1, d: 1, c: 'recall', stem: 'Lencho receives ___ pesos instead of the hundred he asked for.', acc: [['seventy', '70']], sol: 'He receives **seventy** (70) pesos, just over half.' })),
    child('b', mcq({ t: 1, d: 2, c: 'understanding', stem: 'Why is Lencho NOT surprised to find money in the envelope?', opts: ['He was certain God would answer.', 'The postman had told him in advance.', 'He had sent money to himself.', 'He expected a loan from the bank.'], sol: 'His faith was so complete that he took the reply for granted.' })),
    child('c', mcq({ t: 4, d: 3, c: 'understanding', stem: 'The reader *feels the sting of the misunderstanding* because the reader knows that…', opts: ['the people Lencho suspects are the ones who helped him', 'God actually sent a hundred pesos', 'Lencho stole the money himself', 'the postmaster kept thirty pesos'], sol: 'This is dramatic irony: the reader knows the truth that Lencho does not.' })),
    child('d', short({ t: 4, d: 3, c: 'understanding', marks: 1, stem: 'How does Lencho\'s certainty change from a strength into a weakness, according to the commentary?', model: 'It gave him hope after the storm, but now it makes him blind to the postmaster\'s kindness.', sol: 'The same unquestioning faith that sustained him now leads him to a false accusation.', scheme: [['Hope earlier vs blindness to kindness now', 1]] })),
    child('e', mcq({ t: 3, d: 3, c: 'understanding', stem: 'Which reading of Lencho\'s anger after counting the money does the commentary support?', opts: ['It comes from his certainty: God cannot err, so someone else must be to blame.', 'It comes from greed: he wants more than he asked for.', 'It comes from doubt: he has begun to distrust God.', 'It comes from jealousy of the postman.'], sol: 'The commentary traces his anger to certainty: because God cannot be at fault, the shortfall must be human theft. He is not greedy, doubtful about God or jealous.' })),
  ],
  sol: 'Note the difference between Lencho\'s view (God cannot err, so someone stole) and the reader\'s knowledge (the postmaster collected what he could).',
}));
Q('src_irony', source({
  t: [5, 4, 2], d: 4, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'The final twist of the story turns gratitude upside down. Lencho writes again, asking God for the rest of the money and warning God not to use the post, because he believes the post office staff are thieves. The only people in the story who sacrificed anything for him are the very people he accuses. Fuentes does not explain or judge; he simply lets the letter speak. The effect is both comic and sad. We smile at Lencho\'s innocence, but we also wonder how often kindness goes unrecognised, and whether faith in God should make us blind to goodness in people.',
  parts: [
    child('a', mcq({ t: 4, d: 2, c: 'understanding', stem: 'The ending of the story is an example of…', opts: ['situational irony', 'a happy reunion', 'a flashback', 'a dream sequence'], sol: 'The outcome is the opposite of what we would expect: the helpers are accused of theft.' })),
    child('b', mcq({ t: 5, d: 2, c: 'understanding', stem: 'Why does Lencho ask God not to send the money by post?', opts: ['He believes the post office employees stole part of it.', 'The post office is closing down.', 'He wants to collect it from a bank.', 'The postage is too expensive.'], sol: 'He suspects the post office staff of taking the missing money.' })),
    child('c', fb({ t: 4, d: 3, c: 'recall', stem: 'The commentary says the effect of the ending is both comic and ___.', acc: [['sad']], sol: 'It is comic (we smile at his innocence) and **sad** (kindness goes unrecognised).' })),
    child('d', short({ t: 2, d: 4, c: 'evaluation', marks: 1, stem: 'Why might the writer choose *not to explain or judge* at the end?', model: 'Leaving the letter without comment lets readers see the irony and judge for themselves, which makes the ending stronger.', sol: 'An unexplained ending trusts the reader and deepens the impact of the irony.', scheme: [['Lets readers judge / strengthens the irony', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'understanding', stem: 'Which question does the commentary say the ending raises?', opts: ['whether faith in God should blind us to goodness in people', 'whether hailstorms can be predicted', 'whether farmers should move to towns', 'whether letters should be written in ink'], sol: 'The commentary ends on exactly this question about faith and recognising human kindness.' })),
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
    child('c', mcq({ t: 2, d: 3, c: 'understanding', stem: 'Why, according to the commentary, does Lencho turn so completely to God?', opts: ['A small farmer with no savings is helpless before the weather.', 'He has quarrelled with his neighbours.', 'The government has refused to help him.', 'He has always disliked farming.'], sol: 'With no insurance or savings, nothing but God seems able to help.' })),
    child('d', short({ t: 2, d: 3, c: 'understanding', marks: 1, stem: 'What does the commentary mean by *there is only the next crop*?', model: 'The family has no savings or insurance; its survival depends entirely on each harvest.', sol: 'Everything the family has rests on the crop, so losing it means losing everything.', scheme: [['Survival depends entirely on the harvest', 1]] })),
    child('e', mcq({ t: 4, d: 2, c: 'understanding', stem: 'The quick change from rain to hail is described in the commentary as a sudden…', opts: ['reversal', 'celebration', 'journey', 'argument'], sol: 'A *reversal* is a sudden change to the opposite.' })),
  ],
  sol: 'Read for the commentary\'s key ideas (giver/destroyer, helplessness) and connect them to Lencho\'s decision.',
}));

// ================================================================ short answers, 3 marks (40–50 words)
const SA3 = { marks: 3, wl: [40, 50], scheme: SCHEME3, time: 240 };
Q('sa_why_letter', short({
  ...SA3, t: 1, d: 3, c: 'analysis',
  stem: 'Lencho had no neighbours nearby and no savings. Explain what these facts, together with his beliefs, tell us about why he chose to write to God rather than seek help from people. Answer in 40–50 words.',
  model: 'With no neighbours close by and no savings after the hail, Lencho had no human source of help he could think of. His faith filled that gap: he saw God as a dependable helper who would answer a plain request, so writing was the natural choice.',
  sol: 'Circumstances (isolated home, no savings after the hail) + inference (no human help in sight) + role of faith (God seen as a dependable helper) + conclusion (writing was natural).',
}));
Q('sa_coins', short({
  ...SA3, t: [4, 1], d: 3, c: 'analysis',
  stem: 'How does Lencho\'s way of seeing the raindrops reveal his hopes, and how does it prepare the reader for what follows? Answer in 40–50 words.',
  model: 'The comparison shows that Lencho sees rain as money, because a good shower means a good harvest and income. It reveals his optimism and his practical, farmer\'s way of thinking, and it raises our hopes so that the destruction that follows feels even crueller.',
  sol: 'Device (comparison of drops to coins) + what it shows (rain = income; optimism) + its effect in the story (sharpens the reversal).',
}));
Q('sa_postmaster_change', short({
  ...SA3, t: 3, d: 3, c: 'evaluation',
  stem: 'A classmate argues that the postmaster is no different from the postman, since both simply laugh at Lencho. Is this claim supported by the story? Give evidence in 40–50 words.',
  model: 'The claim is only partly supported. Both men laughed at first, but the postmaster\'s amusement soon gave way to respect for Lencho\'s faith. Unlike the postman, he acted: he raised money, gave part of his own pay and replied in God\'s name. So the claim ignores his later conduct.',
  sol: 'Verdict (partly supported) + what is true (both laugh first) + decisive evidence against (respect, collection, own pay, reply) + conclusion.',
}));
Q('sa_collection', short({
  ...SA3, t: [1, 3], d: 3, c: 'analysis',
  stem: 'Lencho expects God to send help directly; the postmaster supplies it through human effort. Compare how each understands the way help reaches a person in need, using one action of each. Answer in 40–50 words.',
  model: 'Lencho expects God to answer directly, so he simply writes and waits. The postmaster, admiring that faith, believes help needs human effort, so he collects money from staff, friends and his own salary. Lencho\'s faith waits for help; the postmaster\'s faith works to supply it.',
  sol: 'Lencho: faith as waiting (writes, expects a direct reply). Postmaster: faith as action (collects money, gives part of his salary). Close with the contrast.',
}));
Q('sa_no_surprise', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'Lencho stays calm when he opens the envelope. What does this tell us about him, and why does it matter for what follows? Answer in 40–50 words.',
  model: 'Lencho was so sure that God would answer his letter that the money seemed only natural to him. His calm shows how complete and unquestioning his faith was. It also prepares us for his anger, because someone so certain cannot imagine that God sent less.',
  sol: 'Reason (certainty of faith) + what it shows (unquestioning belief) + link to what follows (anger at the shortfall).',
}));
Q('sa_angry', short({
  ...SA3, t: [1, 3], d: 3, c: 'analysis',
  stem: 'Lencho\'s anger after counting the money rests on an unspoken assumption about God. State the assumption and explain how it leads him to blame the post office staff. Answer in 40–50 words.',
  model: 'Lencho assumes that God cannot make a mistake or give less than was asked. Since only seventy pesos arrived, he reasons that the shortfall must be human wrongdoing, and the post office staff are the only people he can imagine touching it. He therefore blames them.',
  sol: 'Assumption (God cannot err or give less) + chain of reasoning (shortfall, so human fault, so the people who handled the letter) + conclusion (blames the post office staff).',
}));
Q('sa_hail_effect', short({
  ...SA3, t: 1, d: 3, c: 'analysis',
  stem: 'The hail destroys the crop within about an hour. Explain why this one event is far more serious for Lencho\'s family than a spoilt harvest would be for a family with savings, and what it pushes the family to do. Answer in 40–50 words.',
  model: 'A family with savings can buy food and survive until the next harvest, but Lencho\'s family has only its crop. When hail ruins it, nothing is left to eat or to sow again. This helplessness pushes the family to place its last hope in God.',
  sol: 'Contrast (savings vs only the crop) + consequence (nothing to eat or sow) + what it leads to (turning to God).',
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
  ...SA2, t: 3, d: 3, c: 'analysis',
  stem: 'The postmaster watches from his office while the postman hands over the envelope. What does this suggest about his motive, and which other action supports your inference? Answer in 30–40 words.',
  model: 'It suggests he wants no credit; he is content to watch quietly from a distance. His signing the reply as God supports this, since both actions keep him out of sight and protect Lencho\'s faith.',
  sol: 'Inference (no wish for credit) + supporting evidence from another action (signs as God) + link (stays hidden, faith protected).',
}));
Q('sb_not_mail', short({
  ...SA2, t: 1, d: 3, c: 'application',
  stem: 'Suppose Lencho learnt who had really sent the money. What would he conclude about his own request that God not use the mail, and why? Answer in 30–40 words.',
  model: 'He would see that the request was unfair, because the post office staff he distrusted were the very people who had helped him. His warning against the mail would seem foolish and ungrateful, and he would feel ashamed.',
  sol: 'Apply the story\'s irony to the new situation: the people he accused were his helpers, so the request and the accusation were mistaken and ungrateful.',
}));
Q('sb_wife', short({
  ...SA2, t: 3, d: 3, c: 'analysis',
  stem: 'The family is joyful just before the hail falls. Explain why this joy makes the loss harder to bear, and what it shows about the writer\'s method. Answer in 30–40 words.',
  model: 'The family had expected a rich harvest, so the destruction felt especially cruel after their hope had risen. Fuentes builds up their joy first so that the sudden loss strikes harder and the reader feels it too.',
  sol: 'Why joy deepens the loss (raised expectations) + the writer\'s method (build-up before reversal, so the reader shares the shock).',
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
Q('mc_postmaster_trait', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Which quality of the postmaster is shown when he gives part of his own salary?', opts: ['generosity', 'greed', 'laziness', 'jealousy'], sol: 'Giving his own money for a stranger is generous.' }));
Q('mc_lencho_flaw', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Which of these is the best description of Lencho\'s behaviour in his second letter?', opts: ['unknowingly ungrateful', 'deliberately cruel', 'humble and thankful', 'indifferent to the money'], sol: 'He does not know who helped him, so his ingratitude is unknowing, not deliberate; he certainly is not thankful or indifferent.' }));
Q('mc_dramatic', mcq({ t: 4, d: 3, c: 'understanding', stem: 'The reader knows where the money came from, but Lencho does not. This is called…', opts: ['dramatic irony', 'a simile', 'a flashback', 'foreshadowing'], sol: 'When the audience knows something a character does not, it is dramatic irony.' }));
Q('mc_narrator', mcq({ t: 4, d: 3, c: 'analysis', stem: 'The outside narrator knows both what Lencho believes and how the postmaster raised the money. What does this choice of narration allow the story to do?', opts: ['let the reader see the irony in Lencho\'s accusation', 'keep the postmaster\'s part secret from the reader until the end', 'show the world only as Lencho himself sees it', 'prove that God really sent the money'], sol: 'Because the narrator reveals both sides, the reader knows the truth that Lencho does not, and so sees the irony of his accusation. A narrator limited to Lencho would hide the postmaster\'s effort; the story does not hide it, and it does not claim God sent the money.' }));
Q('mc_amiable', mcq({ t: 4, d: 2, c: 'understanding', stem: 'The postmaster is described as *amiable*. This means he is…', opts: ['friendly and pleasant', 'strict and harsh', 'rich and proud', 'old and weak'], sol: '*Amiable* = good-natured, friendly.' }));
Q('mc_why_reply', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Which detail from the story best supports the inference that the postmaster answered Lencho to protect his faith, not to win thanks?', opts: ['He signs the reply as God and keeps his own name out of it.', 'He laughs when he first reads the address.', 'He asks his employees for contributions.', 'He is described as an amiable man.'], sol: 'Only the anonymous signature shows that he wanted no credit, so his aim was to protect the faith. Laughing and amiability say nothing about motive; collecting money shows effort but not that he sought no thanks.' }));
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
Q('tf_charity', tf({ t: 3, d: 2, c: 'recall', stem: 'True or false: the postmaster collects the money mainly to become famous in the town.', ans: false, sol: 'He hides his part completely by signing as God; his motive is to protect Lencho\'s faith.' }));

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
  t: [4, 2], d: 3, c: 'understanding', marks: 2,
  stem: 'Match each feature of the story with the literary term that describes it.',
  pairs: [['Raindrops imagined as coins', 'comparison (metaphor)'], ['Helpers accused of theft', 'situational irony'], ['Reader knows the truth, Lencho does not', 'dramatic irony'], ['Joy at the rain, then ruin by hail', 'contrast / reversal']],
  sol: 'Name the device by what it does: a comparison, an opposite outcome, a gap in knowledge, a sudden change.',
}));
