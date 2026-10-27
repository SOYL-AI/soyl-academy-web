// CBSE 10 English Language and Literature, ch23 "A Triumph of Surgery" (James Herriot) — question bank.
// Footprints without Feet (supplementary reader). LITERATURE RULE (CONTEXT §8): no sentence, close
// paraphrase or distinctive phrase of the story appears here; speech is reported, never quoted. Passages
// are SOYL commentary (passage_origin: soyl-commentary). Students read the story in their textbook.
// PATTERN: the board examines Footprints through 3-mark short answers (Q9, 40–50 words) and a 6-mark long
// answer (Q11, 100–120 words) on character, theme and values; it prints no Footprints extract. The bank is
// weighted that way: 14 three-mark and 9 long answers, and only the 5 commentary items the chapter-test
// blueprints' extract slots need.
// Topics: t01 context and summary · t02 themes (pampering harms Tricki; how the vet cures him) · t03
// characters (Mrs Pumphrey and the narrator) · t04 exam practice.
// Left out (cannot be confirmed without the text): how long Tricki stayed at the surgery, how many eggs
// or bottles were sent, names of the narrator's colleagues and of Mrs Pumphrey's staff, and clock times.
import { Q, mcq, fb, short, long, tf, ar, match, ord, source, child } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

const NOTE = "*(This passage is SOYL's commentary on James Herriot's story, not an extract from it. Read the story itself in your textbook, Footprints without Feet. The board paper does not print extracts from this reader; use this item as a comprehension check.)*";
const SRC_STEM = `*A Triumph of Surgery*: read the commentary and answer the questions that follow. ${NOTE}`;
const SCHEME3 = [['Relevant point from the story (event or detail)', 1], ['Explanation or inference linked to the question', 1], ['Expression and accuracy within 40–50 words', 1]];
const SCHEME2 = [['Correct point from the story', 1], ['Explanation in own words within 30–40 words', 1]];
const LONG_SCHEME = [['Content: relevant points from the story, accurately used', 3], ['Interpretation / extrapolation: a clear view or value supported by the story', 1], ['Organisation and expression; within 100–120 words', 2]];

// ================================================================ commentary items (source-based)
Q('src_street', source({
  t: [1, 2], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Herriot's story opens with a chance meeting. The vet sees Mrs Pumphrey out walking her Pekinese, Tricki, and is alarmed by what he sees: the dog has grown enormously fat, moves with effort and looks thoroughly unwell. Mrs Pumphrey has noticed only that her pet seems tired. Believing he is underfed, she has been adding malt, cod-liver oil and Horlicks to a diet already crowded with cakes and chocolates. The vet gently suggests less food and more exercise. She agrees in principle, yet the reader senses at once that a lady who cannot refuse her dog anything will not keep to such a plan for long.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'What kind of dog is Tricki in *A Triumph of Surgery*?', opts: ['a Pekinese', 'a Labrador', 'a terrier', 'a spaniel'], sol: 'Tricki is Mrs Pumphrey’s pet Pekinese.' })),
    child('b', fb({ t: 1, d: 1, c: 'recall', stem: 'Mrs Pumphrey believed Tricki was suffering from ___, so she gave him extra tonics.', acc: [['malnutrition', 'undernourishment', 'under-nourishment']], sol: 'She mistook his weakness for **malnutrition**.' })),
    child('c', mcq({ t: 2, d: 2, c: 'understanding', stem: 'What did the vet advise Mrs Pumphrey at this first meeting?', opts: ['to cut down Tricki’s food and give him more exercise', 'to buy Tricki a larger basket', 'to send Tricki to a dog show', 'to give Tricki more tonics'], sol: 'A lighter diet and more exercise were his advice.' })),
    child('d', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'Why does the commentary doubt that Mrs Pumphrey will follow the vet’s plan?', model: 'She loves Tricki too indulgently to say no to him, so a strict diet will soon break down.', sol: 'Her indulgence makes a firm diet unlikely.', scheme: [['She cannot refuse the dog anything', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What does the commentary suggest is the real cause of Tricki’s poor health?', opts: ['too much rich food and too little exercise', 'an infection caught from other dogs', 'old age', 'cold weather'], sol: 'Overfeeding and inactivity, not illness or age, are the cause.' })),
  ],
  sol: 'Parts (a)–(c) recall the opening; (d) and (e) interpret it.',
}));
Q('src_illness', source({
  t: [1, 3], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Advice alone does not work, and Tricki's condition grows worse until he becomes seriously ill. When the vet is called, he makes a firm decision: the dog must leave home and stay at the surgery, where his treatment can be controlled. To Mrs Pumphrey this sounds like a tragedy, and she is deeply distressed. Yet she cannot let her darling go without his comforts, and the vet drives away with the Pekinese along with his bed, his toys and his coats. The comedy of the moment hides a serious point: the person who loves Tricki most is the one who cannot be trusted to cure him.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'Where did the vet decide Tricki should stay for his treatment?', opts: ['at the vet’s surgery', 'at a dog hotel', 'at Mrs Pumphrey’s country house', 'at a friend’s farm'], sol: 'He took Tricki to his own surgery.' })),
    child('b', mcq({ t: 3, d: 2, c: 'understanding', stem: 'How did Mrs Pumphrey react to the vet’s decision about Tricki?', opts: ['She was deeply upset.', 'She was relieved and cheerful.', 'She refused and called another vet.', 'She showed no interest.'], sol: 'Parting from Tricki distressed her greatly.' })),
    child('c', fb({ t: 1, d: 2, c: 'recall', stem: 'Tricki was sent away with his bed, his toys and his ___.', acc: [['coats', 'coat']], sol: 'His **coats** went with him too.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Why does the commentary say the person who loves Tricki most cannot be trusted to cure him?', model: 'Mrs Pumphrey’s love shows itself as overfeeding, which is exactly what is harming the dog.', sol: 'Her indulgent love is the cause of the illness.', scheme: [['Her love takes the form of overfeeding, the cause of the illness', 1]] })),
    child('e', mcq({ t: 3, d: 3, c: 'analysis', stem: 'What does the vet’s decision show about him?', opts: ['He is firm and puts the dog’s health first.', 'He wants to punish Mrs Pumphrey.', 'He is keen to sell expensive medicines.', 'He dislikes Pekinese dogs.'], sol: 'He takes a hard step because it is in the patient’s interest.' })),
  ],
  sol: 'Notice the shift from advice to firm action.',
}));
Q('src_surgery', source({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "At the surgery Tricki is treated like any other dog. His silk-and-cushion life is over; at first he gets no food at all, only water, and he lies quietly where he is put. Slowly his interest returns. He begins to move about, then to follow the other dogs, and before long he is racing with them in the yard and pushing in eagerly at mealtimes. No medicine is involved. Simple food, fresh air, exercise and the company of his own kind do what pampering never could, and the sluggish pet becomes a lively, healthy animal once more.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'What was Tricki given in his first days at the surgery?', opts: ['only water', 'his usual cakes', 'malt and cod-liver oil', 'a special tonic'], sol: 'At first he was given no food, only water.' })),
    child('b', fb({ t: 2, d: 2, c: 'understanding', stem: 'Tricki recovered through diet, exercise and the ___ of the other dogs.', acc: [['company', 'companionship']], sol: 'Living with other dogs (their **company**) helped him recover.' })),
    child('c', mcq({ t: 1, d: 2, c: 'understanding', stem: 'How did Tricki behave once his interest returned?', opts: ['He ran and played with the other dogs and ate eagerly at mealtimes.', 'He refused to leave his bed.', 'He fought with every dog in the yard.', 'He tried to run home to Mrs Pumphrey.'], sol: 'He joined in the play and the rush for food.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Why does the commentary point out that no medicine was involved in Tricki’s cure?', model: 'It shows that a normal, active dog’s life, not drugs, was all Tricki needed.', sol: 'The cure was a healthy routine, which sets up the irony of the title.', scheme: [['The cure was a normal routine, not medicine (irony of the title)', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Which theme of *A Triumph of Surgery* does this stage of the story bring out most clearly?', opts: ['Animals thrive on a natural, active life, not on luxury.', 'Pets should never meet other animals.', 'Wealth always brings good health.', 'Vets should keep animals hungry.'], sol: 'Tricki flourishes once he lives like an ordinary dog.' })),
  ],
  sol: 'Track the change from a sluggish pet to a lively dog, and what caused it.',
}));
Q('src_gifts', source({
  t: [3, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "While Tricki is away, Mrs Pumphrey cannot rest. She telephones often for news and sends a stream of presents to help her pet regain his strength: fresh eggs and bottles of wine among them. Tricki, of course, sees none of these. The vet and his colleagues enjoy the eggs at breakfast and the wine with their meals, and Herriot owns up to this with cheerful frankness. The episode is gently comic, but it also lets us see the vet as a human being rather than a model professional, and it reminds us how blind Mrs Pumphrey's generosity can be.",
  parts: [
    child('a', mcq({ t: 3, d: 1, c: 'recall', stem: 'How did Mrs Pumphrey keep in touch while Tricki was at the surgery?', opts: ['She telephoned often for news.', 'She visited him every hour.', 'She wrote him long letters.', 'She sent her driver to watch him.'], sol: 'She phoned frequently to ask about him.' })),
    child('b', fb({ t: 1, d: 2, c: 'recall', stem: 'Among Mrs Pumphrey’s presents for Tricki were fresh ___ and bottles of wine.', acc: [['eggs']], sol: 'She sent **eggs** and wine.' })),
    child('c', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Who actually enjoyed the presents Mrs Pumphrey sent for Tricki?', opts: ['the vet and his colleagues', 'Tricki himself', 'the other dogs', 'Mrs Pumphrey’s servants'], sol: 'The vets enjoyed the eggs and wine; Tricki did not.' })),
    child('d', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'What does the narrator’s frankness about the presents tell us about him?', model: 'He is honest and has a sense of humour about his own small weaknesses.', sol: 'Honesty and self-mocking humour.', scheme: [['Honest / able to laugh at himself', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What is the main effect of the episode of the presents in *A Triumph of Surgery*?', opts: ['It adds gentle comedy and makes the narrator more human.', 'It shows the vet is a dishonest man.', 'It proves that Tricki needed the eggs to recover.', 'It turns the story into a tragedy.'], sol: 'The gifts episode is comic and shows the vet’s human side.' })),
  ],
  sol: 'Separate what happened (a–c) from what it reveals (d, e).',
}));
Q('src_reunion', source({
  t: [1, 2], d: 3, c: 'evaluation', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "When Tricki is fit again, the vet sends for his owner. Mrs Pumphrey arrives by car, and the Pekinese, now slim and full of energy, dashes to her in delight. Overcome with joy and gratitude, she praises the vet's skill and hails the cure as a great triumph of surgery. The reader knows better. There was no operation at all, only an ordinary dog's routine. That gap between what Mrs Pumphrey believes and what really happened gives the title its irony, and it leaves us wondering whether she has learnt anything, or whether the cakes will soon return.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'How did Tricki greet Mrs Pumphrey when she came to collect him?', opts: ['He dashed to her joyfully.', 'He hid under the table.', 'He ignored her completely.', 'He growled at her.'], sol: 'He ran to her in delight.' })),
    child('b', mcq({ t: 2, d: 2, c: 'understanding', stem: 'Why is the title *A Triumph of Surgery* ironic?', opts: ['Tricki had no operation; diet and exercise cured him.', 'The operation on Tricki failed.', 'The vet was not trained in surgery.', 'Mrs Pumphrey herself had an operation.'], sol: 'No surgery took place; the cure was a healthy routine.' })),
    child('c', fb({ t: 2, d: 2, c: 'understanding', stem: 'A gap between what a character believes and what really happened is called ___.', acc: [['irony', 'dramatic irony', 'situational irony']], sol: 'This gap is **irony**.' })),
    child('d', short({ t: 2, d: 4, c: 'evaluation', marks: 1, stem: 'Do you think Mrs Pumphrey has learnt her lesson? Give one reason.', model: 'Probably not; she credits a surgery that never happened, so she has not understood that her overfeeding caused the problem.', sol: 'Either view, if supported by the ending (her misreading of the cure, or her joy at his health).', scheme: [['A view supported by one reason from the ending', 1]] })),
    child('e', mcq({ t: 3, d: 3, c: 'analysis', stem: 'What does Mrs Pumphrey’s praise of the vet reveal about her?', opts: ['She is grateful but has not understood the real cause of the cure.', 'She is suspicious of the vet.', 'She is a trained nurse.', 'She is angry about the bill.'], sol: 'Her gratitude is genuine, but she misreads what cured Tricki.' })),
  ],
  sol: 'Link the ending to the title: part (d) has no single right answer.',
}));

// ================================================================ short answers, 3 marks (40–50 words): board Q9 pattern
const SA3 = { marks: 3, wl: [40, 50], scheme: SCHEME3, time: 240 };
Q('sa_shock', short({
  ...SA3, t: 1, d: 2, c: 'understanding',
  stem: 'Why was the vet alarmed when he met Mrs Pumphrey and Tricki in the street? Answer in 40–50 words.',
  model: 'Tricki had become badly overweight and looked ill. He could barely walk, seemed exhausted and was clearly in poor health. The vet saw at once that the Pekinese was being overfed and under-exercised, and that his life could be in danger if nothing changed.',
  sol: 'Tricki’s condition (fat, exhausted, unwell) + the cause the vet sees (overfeeding, no exercise).',
}));
Q('sa_diet', short({
  ...SA3, t: [1, 3], d: 2, c: 'understanding',
  stem: 'What extras did Mrs Pumphrey add to Tricki’s diet, and why? What does this show about her? Answer in 40–50 words.',
  model: 'Thinking Tricki was underfed, Mrs Pumphrey gave him malt, cod-liver oil and Horlicks on top of cakes and sweets. In truth he was overfed. This shows that she loved him dearly but understood nothing about a dog’s real needs, and acted without proper advice.',
  sol: 'The extras + her mistaken reason + the inference about her (loving but ignorant).',
}));
Q('sa_advice_fail', short({
  ...SA3, t: [2, 3], d: 3, c: 'analysis',
  stem: 'Why did the vet’s first advice to Mrs Pumphrey fail to help Tricki? Answer in 40–50 words.',
  model: 'The vet told her to reduce Tricki’s food and give him more exercise, but she could not be firm. Whenever Tricki seemed unhappy or begged, she gave in and fed him treats again. Her soft-hearted indulgence undid the advice, so his condition only grew worse.',
  sol: 'The advice + why it was not followed (she could not refuse him) + the result.',
}));
Q('sa_hospital', short({
  ...SA3, t: [2, 3], d: 3, c: 'analysis',
  stem: 'Why did the vet decide to take Tricki to his surgery instead of treating him at home? Answer in 40–50 words.',
  model: 'Advice had failed because Mrs Pumphrey could not stop pampering Tricki. At the surgery the vet could control what the dog ate and make sure he exercised. Removing him from his indulgent home was the only way to break the habits that had made him ill.',
  sol: 'Failure of advice + control of diet and exercise + removal from the cause of the illness.',
}));
Q('sa_belongings', short({
  ...SA3, t: [3, 2], d: 2, c: 'understanding',
  stem: 'What did Mrs Pumphrey send with Tricki to the surgery, and what does it reveal about her? Answer in 40–50 words.',
  model: 'She sent Tricki off with his bed, toys and coats, as if he were a child leaving home. This reveals how she treated her dog as a pampered baby. It also shows how anxious she was, and why the vet believed Tricki needed a simpler life.',
  sol: 'The items + what they reveal (treats the dog like a spoilt child; anxious) + link to the cure.',
}));
Q('sa_recovery', short({
  ...SA3, t: [1, 2], d: 2, c: 'understanding',
  stem: 'How did Tricki recover at the surgery? Answer in 40–50 words.',
  model: 'At first Tricki was given only water, and he lay still. Gradually he grew livelier, began exploring and joined the other dogs in their games. Soon he was eating eagerly with them. A simple diet, plenty of exercise and canine company restored him without any medicine.',
  sol: 'Stages: water only → returning interest → play with other dogs → eager eating; the cause (diet, exercise, company).',
}));
Q('sa_gifts', short({
  ...SA3, t: [3, 2], d: 3, c: 'analysis',
  stem: 'What happened to the eggs and wine Mrs Pumphrey sent for Tricki? What does this add to the story? Answer in 40–50 words.',
  model: 'The vet and his colleagues enjoyed the eggs at breakfast and the wine with their meals, while Tricki got none. This adds gentle humour to the story. The narrator’s honest admission also makes him likeable and shows how misplaced Mrs Pumphrey’s generosity was.',
  sol: 'Who used the gifts + humour + what it shows about the narrator and Mrs Pumphrey.',
}));
Q('sa_title', short({
  ...SA3, t: 2, d: 3, c: 'analysis',
  stem: 'Mrs Pumphrey calls Tricki’s cure *a triumph of surgery*. Why is this ironic? Answer in 40–50 words.',
  model: 'No operation was ever performed on Tricki. He was cured simply by a controlled diet, exercise and living with other dogs. Mrs Pumphrey’s grand phrase shows she has misunderstood the cure completely, and the reader, who knows the truth, enjoys the gap between her belief and reality.',
  sol: 'No surgery + the real cure + her misunderstanding (the reader knows better).',
}));
Q('sa_pumphrey', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'Describe Mrs Pumphrey’s character with two traits and evidence from *A Triumph of Surgery*. Answer in 40–50 words.',
  model: 'Mrs Pumphrey is loving but foolishly indulgent: she stuffs Tricki with sweets and tonics and cannot refuse him. She is also emotional and generous, grieving when he leaves and sending eggs and wine for him. Her intentions are kind, but her judgement is poor.',
  sol: 'Two traits (indulgent, emotional, generous, wealthy, grateful) each with evidence.',
}));
Q('sa_vet', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'What kind of person is the vet who narrates *A Triumph of Surgery*? Answer in 40–50 words.',
  model: 'The vet is sensible and firm: he sees the real problem at once and removes Tricki from his pampered home. He is tactful, never insulting Mrs Pumphrey. He is also humorous and honest, admitting that he and his colleagues enjoyed the gifts meant for the dog.',
  sol: 'Two or three traits with evidence: sensible, firm, tactful, humorous, honest, caring.',
}));
Q('sa_tact', short({
  ...SA3, t: [3, 2], d: 4, c: 'evaluation',
  stem: 'The vet never tells Mrs Pumphrey bluntly that she is ruining Tricki. Was this the right approach? Answer in 40–50 words.',
  model: 'Yes. Mrs Pumphrey was emotional and devoted, so blunt criticism might have hurt her or made her refuse help. By acting tactfully and taking Tricki for treatment, the vet saved the dog’s health and kept her trust. Kind handling achieved far more than an argument would have.',
  sol: 'A stand + reason linked to her nature + the result of tact. A reasoned opposite view (she needed plain truth to change) also earns credit.',
}));
Q('sa_humour', short({
  ...SA3, t: 2, d: 3, c: 'analysis',
  stem: 'Give two examples of humour in *A Triumph of Surgery* and explain how each creates it. Answer in 40–50 words.',
  model: 'One example is Tricki leaving home with his bed, toys and coats, like a spoilt child, which is comic exaggeration. Another is the vets enjoying the eggs and wine sent for the dog. The ending is funny too, since Mrs Pumphrey praises a surgery that never happened.',
  sol: 'Two examples (luggage, gifts, the ending) + how each is funny (exaggeration, irony).',
}));
Q('sa_owners', short({
  ...SA3, t: 2, d: 4, c: 'application',
  stem: 'What lesson can pet owners today learn from Tricki’s story? Answer in 40–50 words.',
  model: 'Pet owners should learn that love means meeting an animal’s real needs, not indulging it. A balanced diet, daily exercise and contact with other animals keep a pet healthy. Owners should follow a vet’s advice firmly, even when their pet begs for treats, as Mrs Pumphrey could not.',
  sol: 'The lesson (care, not indulgence) + practical points (diet, exercise, company, following advice) + a link to the story.',
}));
Q('sa_compare', short({
  ...SA3, t: 3, d: 4, c: 'evaluation',
  stem: 'Compare how Mrs Pumphrey and the vet each show their care for Tricki. Answer in 40–50 words.',
  model: 'Mrs Pumphrey shows care through indulgence: rich food, tonics and luxuries, which make Tricki ill. The vet shows care through discipline: a strict diet, exercise and company, which cure him. Both care deeply, but only the vet’s care is wise, because it puts the dog’s real health first.',
  sol: 'Her way (indulgence → illness) vs his way (discipline → cure) + a judgement.',
}));

// ================================================================ short answers, 2 marks (30–40 words)
const SA2 = { marks: 2, wl: [30, 40], scheme: SCHEME2, time: 150 };
Q('sb_who', short({
  ...SA2, t: 1, d: 1, c: 'recall',
  stem: 'Who is Tricki in *A Triumph of Surgery*, and who looks after his health? Answer in 30–40 words.',
  model: 'Tricki is a Pekinese dog owned by Mrs Pumphrey, a wealthy and devoted lady. His health is looked after by the narrator, a country vet, who notices that the dog has become dangerously fat and unwell.',
  sol: 'Tricki (a Pekinese, Mrs Pumphrey’s pet) + the vet who narrates.',
}));
Q('sb_extras', short({
  ...SA2, t: 1, d: 2, c: 'recall',
  stem: 'Name the extra tonics Mrs Pumphrey gave Tricki and explain why she gave them. Answer in 30–40 words.',
  model: 'Mrs Pumphrey gave Tricki malt, cod-liver oil and Horlicks. She wrongly believed that his tiredness came from being underfed, so she tried to strengthen him with more nourishment, which only made things worse.',
  sol: 'The three extras + her mistaken belief about underfeeding.',
}));
Q('sb_water', short({
  ...SA2, t: [1, 2], d: 2, c: 'understanding',
  stem: 'Why was Tricki given only water at first when he reached the vet’s surgery? Answer in 30–40 words.',
  model: 'Tricki’s body was overloaded with rich food, so a period without meals let his system recover. Hunger also made him take an interest in plain dog food again, which began his return to a healthy routine.',
  sol: 'Rest for an overfed body + renewed appetite for plain food.',
}));
Q('sb_phone', short({
  ...SA2, t: 3, d: 2, c: 'understanding',
  stem: 'How did Mrs Pumphrey behave while Tricki was away at the surgery? Answer in 30–40 words.',
  model: 'Mrs Pumphrey worried constantly. She telephoned the vet often for news of Tricki’s progress and sent presents such as eggs and wine to strengthen him, showing her anxious, generous and over-protective love.',
  sol: 'Her actions (calls, gifts) + what they show (anxious, generous love).',
}));
Q('sb_reunion', short({
  ...SA2, t: 1, d: 2, c: 'recall',
  stem: 'Describe the reunion between Tricki and Mrs Pumphrey at the end of the story. Answer in 30–40 words.',
  model: 'When Mrs Pumphrey came by car to collect him, a slim and lively Tricki dashed to her in delight. She was overjoyed and tearful, and she thanked the vet warmly for what she called a surgical triumph.',
  sol: 'Tricki’s joyful rush + her tears and gratitude + her misreading of the cure.',
}));
Q('sb_herriot', short({
  ...SA2, t: 1, d: 3, c: 'application',
  stem: 'How does the fact that James Herriot was a working vet make *A Triumph of Surgery* more convincing? Answer in 30–40 words.',
  model: 'Herriot knew animals and their owners from daily practice. His medical judgement, the surgery routine and Mrs Pumphrey’s behaviour all feel true to life, so readers trust the account and enjoy its humour.',
  sol: 'His real experience + its effect (authentic detail, trust, humour).',
}));

// ================================================================ long answers, 6 marks (100–120 words): board Q11 pattern
const LA = { marks: 6, wl: [100, 120], scheme: LONG_SCHEME, time: 720 };
Q('la_compare', long({
  ...LA, t: [4, 3], d: 4, c: 'evaluation',
  stem: 'Compare Mrs Pumphrey and the vet in *A Triumph of Surgery*. Whose love for Tricki is wiser? Answer in 100–120 words.',
  model: 'Mrs Pumphrey and the vet both care about Tricki, but in very different ways. Mrs Pumphrey is wealthy, emotional and indulgent. She overfeeds her Pekinese with sweets and tonics, cannot refuse his begging, and sends him off with his bed, toys and coats. Her love makes him ill. The vet is practical, firm and tactful. He spots the problem at once, takes Tricki away from his pampered life, and cures him with plain food, exercise and the company of other dogs. He is also honest and humorous about enjoying her gifts. The vet’s love is wiser, because it is guided by knowledge and serves the dog’s real good, not the owner’s feelings.',
  sol: 'Traits of each with evidence + contrast of methods and results + a clear judgement.',
}));
Q('la_pampering', long({
  ...LA, t: [4, 2], d: 4, c: 'evaluation',
  stem: 'Too much love can be as harmful as too little. Discuss this idea with reference to Tricki in *A Triumph of Surgery*. Answer in 100–120 words.',
  model: 'Tricki’s story shows that love without wisdom can do real harm. Mrs Pumphrey adores her Pekinese, yet her devotion takes the form of endless sweets, tonics and comforts. She cannot bear to see him unhappy, so she ignores the vet’s advice. As a result, Tricki becomes grossly overweight, sluggish and finally seriously ill. His cure comes only when he is separated from her care and treated like an ordinary dog. The same truth applies to children: spoiling them with every wish can damage their health, discipline and independence. Real love sets limits and thinks about long-term well-being. Neglect harms, but so does indulgence; caring wisely means giving what is needed, not everything that is wanted.',
  sol: 'A stand + evidence from Tricki’s case + a wider application (children, pets) + a conclusion.',
}));
Q('la_vet_sketch', long({
  ...LA, t: [4, 3], d: 3, c: 'analysis',
  stem: 'Write a character sketch of the vet who narrates *A Triumph of Surgery*. Answer in 100–120 words.',
  model: 'The narrator is a skilled and sensible country vet. The moment he sees Tricki in the street, he recognises that the dog is dangerously overfed. He is tactful with Mrs Pumphrey, advising her gently instead of blaming her. When advice fails, he becomes firm, taking the dog to his surgery to control his diet and exercise. His treatment shows real understanding of animals: water first, then plain food, play and company. He is also honest and full of humour, cheerfully admitting that he and his colleagues enjoyed the eggs and wine meant for Tricki. Above all, he cares about his patient. He is a professional who combines knowledge, kindness and a sense of fun.',
  sol: 'Four or five traits with evidence (observant, tactful, firm, knowledgeable, honest, humorous, caring) + an overall judgement.',
}));
Q('la_diary_pumphrey', long({
  ...LA, t: [4, 3], d: 4, c: 'application', bloom: 'create',
  stem: 'Imagine you are Mrs Pumphrey. Write a diary entry on the evening the vet took Tricki away to his surgery. Answer in 100–120 words.',
  model: 'Tonight\n\nThe house feels so empty without my darling Tricki. This afternoon the vet decided that my poor boy must stay at his surgery for treatment. I could hardly bear it! I made sure his bed, his favourite toys and his warm coats went with him, but I know he will be lonely and frightened among strange dogs. The vet says Tricki is overweight, though I only ever gave him what he loved and a few tonics to keep him strong. Tomorrow I shall telephone early and send some fresh eggs to make him strong. Perhaps the vet knows best. I simply pray my little one comes home to me healthy and happy.',
  sol: 'Diary format (time, first person, feelings). Content consistent with the story: the decision, the belongings, her worry, her plans to call and send gifts, her partial doubt. Her voice: emotional and doting.',
}));
Q('la_letter_vet', long({
  ...LA, t: [4, 2], d: 4, c: 'application', bloom: 'create',
  stem: 'Write a letter from the vet in *A Triumph of Surgery* to Mrs Pumphrey, tactfully advising her how to keep Tricki healthy after his return. Answer in 100–120 words.',
  model: 'Dear Mrs Pumphrey,\n\nI am delighted that Tricki is home and in such good health. May I offer a few suggestions to keep him that way? Please give him plain dog food at fixed times, and avoid cakes, chocolates and extra tonics, however much he begs. He needs a brisk walk every day, and he clearly enjoys the company of other dogs, so let him play with them whenever possible. A little firmness now is the kindest gift you can give him. I know how dearly you love him, and with these habits he will stay lively for years. Do call me if you have any worries.\n\nYours sincerely,\nThe Vet',
  sol: 'Letter format (salutation, body, close). Tactful tone; practical advice drawn from the cure (plain food, exercise, company, no treats); reassurance.',
}));
Q('la_title_long', long({
  ...LA, t: [4, 2], d: 3, c: 'evaluation',
  stem: 'Discuss the suitability of the title *A Triumph of Surgery* for Herriot’s story. Answer in 100–120 words.',
  model: 'The title is highly suitable because it is ironic. It is Mrs Pumphrey’s own description of Tricki’s recovery, and it reveals her complete misunderstanding. No surgery was performed at all. Tricki was cured by a simple routine: water at first, then plain food, regular exercise and the company of other dogs. The title therefore points to the story’s central idea, that common sense rather than medical drama restored his health. It also captures the humour of the ending, where a grateful owner praises an operation that never happened. A plain title such as “Tricki Gets Well” would lose this irony. The chosen title makes readers smile and think about the true cause of the cure.',
  sol: 'A stand + the irony explained (no operation; the real cure) + link to theme and humour + conclusion.',
}));
Q('la_tricki_diary', long({
  ...LA, t: [4, 1], d: 4, c: 'application', bloom: 'create',
  stem: 'Imagine you are Tricki. Describe your stay at the vet’s surgery, from your arrival to your return home, in 100–120 words.',
  model: 'When the vet carried me away from home, I felt too heavy and tired to protest. At his surgery there were no cakes, no chocolates, not even a biscuit, only a bowl of water. For a day or two I simply lay there, sulking. Then I began to notice the other dogs racing around the yard. Curiosity got the better of me, and soon I was running with them, chasing and tumbling. When the food bowls came out, I pushed in with the rest. My legs grew stronger and my breathing easier. By the time my mistress arrived, I felt young again. I ran to her joyfully, though I secretly hope she remembers the lesson.',
  sol: 'First person as Tricki; events in order (arrival, water only, interest, play, eating with others, reunion); consistent with the story; a touch of humour.',
}));
Q('la_humour_irony', long({
  ...LA, t: [4, 2], d: 4, c: 'analysis',
  stem: 'How does Herriot use humour and irony in *A Triumph of Surgery* to make a serious point? Answer in 100–120 words.',
  model: 'Herriot tells a serious story about the harm of overindulgence, but he tells it with warm humour. Tricki’s departure, with his bed, toys and coats, is comic exaggeration that exposes how absurdly he is pampered. The gifts of eggs and wine, enjoyed by the vets instead of the patient, add light comedy and make the narrator human. The ending is the sharpest irony: Mrs Pumphrey praises a triumph of surgery when no operation took place. Behind the laughter lies the message that a simple, active life heals better than luxury, and that loving owners must listen to sense. Because readers are amused rather than lectured, they accept the lesson more easily.',
  sol: 'Examples of humour (luggage, gifts) and irony (the ending, the title) + the serious message + the effect on readers.',
}));
Q('la_values', long({
  ...LA, t: [4, 2], d: 3, c: 'evaluation',
  stem: 'What values does *A Triumph of Surgery* teach about responsibility towards animals in our care? Answer in 100–120 words.',
  model: 'The story teaches that responsibility towards animals means caring for their real needs. First, owners must give a balanced diet: Tricki’s sweets and tonics turned love into harm. Second, animals need exercise and the company of their own kind; Tricki recovered only when he ran and played with other dogs. Third, owners should respect expert advice, as Mrs Pumphrey failed to do until her pet became ill. The vet also shows the value of professional honesty and firmness, putting the patient’s welfare above an owner’s feelings. Finally, the story suggests that affection must be guided by knowledge. A responsible owner loves wisely, setting limits for the animal’s sake, not for personal satisfaction.',
  sol: 'Three or four values (balanced diet, exercise, company, expert advice, firmness, honesty) each linked to the story + conclusion.',
}));

// ================================================================ objective items
Q('mc_author', mcq({ t: 1, d: 1, c: 'recall', stem: '*A Triumph of Surgery* in *Footprints without Feet* was written by…', opts: ['James Herriot', 'Ruskin Bond', 'Victor Canning', 'Robert Arthur'], sol: 'James Herriot, a vet and writer, is the author.' }));
Q('mc_herriot_job', mcq({ t: 1, d: 1, c: 'recall', stem: 'What was James Herriot’s profession, which gives *A Triumph of Surgery* its setting?', opts: ['a veterinary surgeon', 'a newspaper editor', 'a police inspector', 'a schoolteacher'], sol: 'He was a working vet in Yorkshire.' }));
Q('mc_tonics', mcq({ t: 1, d: 2, c: 'recall', stem: 'Which of these did Mrs Pumphrey add to Tricki’s diet as a tonic?', opts: ['cod-liver oil', 'fresh vegetables', 'raw meat', 'rice water'], sol: 'Malt, cod-liver oil and Horlicks were her extras.' }));
Q('mc_why_tonics', mcq({ t: 1, d: 2, c: 'understanding', stem: 'Why did Mrs Pumphrey give Tricki extra tonics?', opts: ['She thought he was underfed and weak.', 'The vet had prescribed them.', 'Tricki had won a prize.', 'She wanted him to grow bigger for a show.'], sol: 'She mistook his sluggishness for malnutrition.' }));
Q('mc_cause', mcq({ t: 2, d: 2, c: 'understanding', stem: 'What was the real cause of Tricki’s illness?', opts: ['overfeeding and lack of exercise', 'a rare infection', 'an injury from a fall', 'poisoned food'], sol: 'Rich food and inactivity made him ill.' }));
Q('mc_decision', mcq({ t: 2, d: 2, c: 'understanding', stem: 'What step did the vet take when his advice to Mrs Pumphrey failed?', opts: ['He took Tricki to his surgery to treat him there.', 'He operated on Tricki at once.', 'He reported Mrs Pumphrey to the police.', 'He gave up the case.'], sol: 'He moved Tricki to the surgery to control his diet and exercise.' }));
Q('mc_first_days', mcq({ t: 1, d: 2, c: 'recall', stem: 'How did Tricki spend his first days at the vet’s surgery?', opts: ['lying quietly, with only water to drink', 'playing in Mrs Pumphrey’s garden', 'eating sweets in the kitchen', 'sleeping in the vet’s car'], sol: 'He was given only water and lay still at first.' }));
Q('mc_cure', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Which statement best explains how Tricki was cured?', opts: ['Plain food, exercise and the company of other dogs restored him.', 'A difficult operation removed the problem.', 'Expensive medicines worked quickly.', 'A long rest in a soft bed healed him.'], sol: 'An ordinary dog’s routine cured him, not surgery or medicine.' }));
Q('mc_gifts', mcq({ t: 3, d: 2, c: 'understanding', stem: 'What did the narrator and his colleagues do with Mrs Pumphrey’s gifts for Tricki?', opts: ['They enjoyed the eggs and wine themselves.', 'They sent them back to her.', 'They fed them all to Tricki.', 'They gave them to a charity.'], sol: 'The vets enjoyed the gifts; the narrator admits it with humour.' }));
Q('mc_pumphrey_trait', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Which pair of words best describes Mrs Pumphrey in *A Triumph of Surgery*?', opts: ['loving and indulgent', 'cruel and careless', 'strict and sensible', 'poor and anxious'], sol: 'She loves Tricki but spoils him.' }));
Q('mc_tone', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What is the overall tone of *A Triumph of Surgery*?', opts: ['light-hearted and gently ironic', 'tragic and gloomy', 'angry and bitter', 'formal and scientific'], sol: 'Herriot tells the story with warm humour and irony.' }));
Q('mc_message', mcq({ t: 2, d: 3, c: 'evaluation', stem: 'Which message does Tricki’s story most strongly convey?', opts: ['Real care meets an animal’s needs instead of spoiling it.', 'Rich food is the secret of good health.', 'Pets should never leave their owners.', 'Surgery is the answer to most illnesses.'], sol: 'Indulgence harmed Tricki; sensible care cured him.' }));
Q('mc_apply_child', mcq({ t: [2, 4], d: 3, c: 'application', stem: 'A grandmother gives her grandson sweets whenever he cries, and he is often unwell. Whose approach in *A Triumph of Surgery* does she follow?', opts: ['Mrs Pumphrey’s', 'the vet’s', 'the narrator’s colleagues’', 'none of the characters’'], sol: 'Like Mrs Pumphrey, she indulges instead of setting healthy limits.' }));
Q('mc_narrator', mcq({ t: 1, d: 2, c: 'understanding', fixed: true, key: 'c', stem: 'From whose point of view is *A Triumph of Surgery* told?', opts: ['Mrs Pumphrey’s', 'Tricki’s', 'the vet’s, in the first person', 'an unnamed villager’s'], sol: 'The vet narrates the events himself.' }));

Q('fb_breed', fb({ t: 1, d: 1, c: 'recall', stem: 'In *A Triumph of Surgery*, Mrs Pumphrey’s pet Tricki is a ___ dog.', acc: [['Pekinese', 'Pekingese', 'Peke']], sol: 'Tricki is a **Pekinese**.' }));
Q('fb_owner', fb({ t: 1, d: 1, c: 'recall', stem: 'Tricki’s wealthy owner is Mrs ___.', acc: [['Pumphrey']], sol: 'His owner is Mrs **Pumphrey**.' }));
Q('fb_routine', fb({ t: 2, d: 2, c: 'understanding', marks: 2, stem: 'At the surgery Tricki recovered through plain food, ___ and the ___ of other dogs.', acc: [['exercise', 'play', 'running'], ['company', 'companionship']], sol: 'His cure: plain food, **exercise** and the **company** of other dogs.', scheme: [['exercise', 1], ['company', 1]] }));
Q('fb_irony', fb({ t: 2, d: 2, c: 'understanding', stem: 'The title of Herriot’s story about Tricki is ___ because no operation was performed.', acc: [['ironic', 'ironical']], sol: 'The title is **ironic**.' }));

Q('ar_tonics', ar({ t: [1, 3], d: 3, c: 'analysis', a: 'Mrs Pumphrey gave Tricki malt and cod-liver oil.', r: 'The vet had prescribed these tonics to strengthen Tricki.', key: 'c', sol: 'A is true. R is false: the tonics were Mrs Pumphrey’s own idea, because she thought he was underfed.' }));
Q('ar_surgery', ar({ t: [1, 2], d: 3, c: 'analysis', a: 'Tricki’s cure in Herriot’s story was a triumph of surgery.', r: 'Tricki recovered through diet, exercise and the company of other dogs.', key: 'd', sol: 'A is false: there was no operation. R is true.' }));
Q('ar_gifts', ar({ t: 3, d: 3, c: 'analysis', a: 'The vet in *A Triumph of Surgery* enjoyed the eggs Mrs Pumphrey sent.', r: 'Mrs Pumphrey sent Tricki to the surgery with his bed and toys.', key: 'b', sol: 'Both are true, but sending his bed and toys does not explain why the vets enjoyed the eggs.' }));
Q('ar_advice', ar({ t: [2, 3], d: 3, c: 'understanding', a: 'The vet’s first advice to Mrs Pumphrey did not improve Tricki’s health.', r: 'Mrs Pumphrey could not refuse Tricki’s pleading for treats.', key: 'a', sol: 'Both are true, and R explains A: her indulgence undid the advice.' }));

Q('tf_operation', tf({ t: 2, d: 1, c: 'recall', stem: 'True or false: the vet in *A Triumph of Surgery* performed an operation on Tricki.', ans: false, sol: 'No operation was performed; diet and exercise cured him.' }));
Q('tf_alone', tf({ t: 1, d: 2, c: 'recall', stem: 'True or false: at the surgery Tricki was kept apart from all other dogs.', ans: false, sol: 'He lived and played with the other dogs, which helped him recover.' }));
Q('tf_calls', tf({ t: 3, d: 2, c: 'understanding', stem: 'True or false: Mrs Pumphrey often telephoned the surgery for news of Tricki.', ans: true, sol: 'She called frequently, anxious about her pet.' }));
Q('tf_slim', tf({ t: 1, d: 2, c: 'understanding', stem: 'True or false: Tricki returned to Mrs Pumphrey slimmer and livelier than before.', ans: true, sol: 'He came home fit and full of energy.' }));

Q('ord_tricki', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange these events of *A Triumph of Surgery* in the order in which they happen.',
  items: ['The vet meets Mrs Pumphrey and an overweight Tricki in the street.', 'The vet advises less food and more exercise.', 'Tricki becomes seriously ill.', 'The vet takes Tricki to his surgery.', 'Tricki starts playing with the other dogs.', 'Mrs Pumphrey collects a healthy Tricki.'],
  sol: 'Street meeting → advice → illness → the surgery → recovery with other dogs → reunion.',
}));
Q('ord_recovery', ord({
  t: [1, 2], d: 3, c: 'analysis', marks: 2,
  stem: 'Arrange the stages of Tricki’s recovery at the vet’s surgery.',
  items: ['Tricki lies still, with only water to drink.', 'Tricki begins to take an interest in his surroundings.', 'Tricki follows the other dogs about.', 'Tricki races and plays with the other dogs.', 'Tricki eats eagerly with the others at mealtimes.'],
  sol: 'Stillness → interest → following → play → eager eating.',
}));

Q('mt_people', match({
  t: 3, d: 2, c: 'recall', marks: 2,
  stem: 'Match each character or animal in *A Triumph of Surgery* with their role.',
  pairs: [['Mrs Pumphrey', 'the doting, wealthy owner'], ['Tricki', 'the overfed Pekinese'], ['the narrator', 'the vet who cures the dog'], ['the narrator’s colleagues', 'share the eggs and wine']],
  sol: 'The people and the dog at the centre of the story.',
}));
Q('mt_words', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match these words useful for discussing *A Triumph of Surgery* with their meanings.',
  pairs: [['indulgent', 'giving in to every wish'], ['lethargic', 'sluggish and without energy'], ['convalescence', 'the period of getting well'], ['irony', 'a gap between appearance and reality']],
  sol: 'Key words for writing about this story.',
}));
Q('mt_actions', match({
  t: 3, d: 3, c: 'analysis', marks: 2,
  stem: 'Match each action in Herriot’s story about Tricki with the trait it reveals.',
  pairs: [['Mrs Pumphrey sends coats and toys with Tricki', 'over-protectiveness'], ['The vet removes Tricki from his home', 'firmness'], ['The narrator admits enjoying the gifts', 'honesty and humour'], ['Mrs Pumphrey praises a surgery that never happened', 'lack of understanding']],
  sol: 'Each action and what it shows about the character.',
}));
