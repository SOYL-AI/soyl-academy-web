// CBSE 10 English Language and Literature, ch29 "The Necklace" (Guy de Maupassant, NCERT version) — question bank.
// LITERATURE RULE (CONTEXT §8, D-036): Maupassant's original is in the public domain, but the NCERT English
// version is not. Everything here is written in SOYL's own words at the level of events and ideas; no
// sentence, phrase or line of dialogue of the NCERT text appears, and speech is reported. Passages are SOYL
// commentary (passage_origin: soyl-commentary). Students read the story in Footprints without Feet.
// BOARD PATTERN: the supplementary reader is examined through 3-mark short answers (40–50 words) and a
// 6-mark long answer (100–120 words) on character, theme and values, not through extracts. The bank is
// weighted that way (14 three-mark, 9 long); the 5 commentary passages fill the generic chapter-test
// blueprint's Section A slots.
// Topics: t01 context and summary · t02 themes (vanity and pride, the twist ending) · t03 characters
// (Matilda and Loisel contrasted) · t04 exam practice.
// Facts deliberately left out (cannot be confirmed without the text): the minister's and hosts' names,
// Loisel's exact office, the street or park of the final meeting, the jeweller's shop location, the sum
// Loisel inherited, the rates of his copying work, and the time the couple left the ball.
import { Q, mcq, fb, short, long, tf, ar, match, ord, source, child } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

const NOTE = "*(This passage is SOYL's commentary on the story, not an extract from it. Read the chapter itself in your supplementary reader, Footprints without Feet.)*";
const SRC_STEM = `*The Necklace* (Guy de Maupassant): read the commentary and answer the questions that follow. ${NOTE}`;
const SCHEME3 = [['Relevant point from the story (event or detail)', 1], ['Explanation or inference linked to the question', 1], ['Expression and accuracy within 40–50 words', 1]];
const SCHEME2 = [['Correct point from the story', 1], ['Explanation in own words within 30–40 words', 1]];
const LONG_SCHEME = [['Content: relevant points from the story, accurately used', 3], ['Interpretation / extrapolation: a clear view on character, theme or values, supported by the story', 1], ['Organisation and expression; within 100–120 words', 2]];

// ================================================================ commentary passages (blueprint Section A slots)
Q('src_discontent', source({
  t: [1, 3], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Matilda Loisel's trouble begins long before the necklace. She is pretty and charming, but she comes from a modest family and is married to a minor government clerk, and she cannot accept the life this gives her. Her plain little flat, its worn furniture and the simple meals her husband enjoys all feel like insults. She daydreams of grand rooms, fine dinners and admiring guests, and the dreams make reality harder to bear. Maupassant shows us a woman whose unhappiness comes less from poverty itself than from comparing her life, every hour, with an imagined life she believes she deserves.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'Whom had Matilda married?', opts: ['a minor government clerk', 'a rich banker', 'a famous painter', 'an army officer'], sol: 'Her husband, Loisel, was a clerk in a government office.' })),
    child('b', mcq({ t: 3, d: 2, c: 'understanding', stem: 'How did Matilda feel about her home?', opts: ['ashamed and dissatisfied', 'proud and content', 'indifferent', 'grateful for its comfort'], sol: 'Its plainness made her miserable.' })),
    child('c', fb({ t: 3, d: 2, c: 'understanding', stem: 'Matilda spent her days ___ about wealth and luxury she did not have.', acc: [['daydreaming', 'dreaming', 'fantasising', 'fantasizing']], sol: 'She was always **daydreaming** of a grander life.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'According to the commentary, what really causes Matilda’s unhappiness?', model: 'She keeps measuring her real life against an imagined life of luxury, so ordinary comfort always feels like failure.', sol: 'Constant comparison with an imagined luxury, not poverty itself.', scheme: [['Comparison with an imagined life she feels she deserves', 1]] })),
    child('e', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Which flaw in Matilda does this passage reveal?', opts: ['discontent born of vanity', 'cruelty to her husband', 'laziness at work', 'dishonesty with friends'], sol: 'Her vanity makes her discontented with what she has.' })),
  ],
  sol: 'Parts (a)–(c) recall her situation; (d) and (e) interpret her character.',
}));
Q('src_invitation', source({
  t: [1, 3], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Loisel comes home proud of a prize he has worked hard to win: an invitation to an evening party given by a government minister. He expects his wife to be delighted. Instead she bursts into tears, because she has nothing fit to wear. Loisel asks how much a suitable dress would cost, and she names a sum that happens to be the 400 francs he has been saving for a gun of his own. He gives it to her without complaint. When she is upset again because she owns no jewels, he suggests she borrow some from her wealthy friend, Madame Forestier. The scene shows two people with very different ideas of happiness, and one of them giving way to the other.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'Why did Matilda cry when Loisel showed her the invitation?', opts: ['She had no suitable dress to wear.', 'She was afraid of the minister.', 'She did not want to leave the house.', 'She had not been invited herself.'], sol: 'She wept because she had nothing fit to wear.' })),
    child('b', fb({ t: 1, d: 2, c: 'recall', stem: 'Loisel gave Matilda the 400 francs he had been saving to buy a ___.', acc: [['gun']], sol: 'The money had been meant for a **gun**.' })),
    child('c', mcq({ t: 1, d: 2, c: 'understanding', stem: 'Whose idea was it to borrow jewels from Madame Forestier?', opts: ['Loisel’s', 'Madame Forestier’s', 'the minister’s', 'a servant’s'], sol: 'Loisel suggested she borrow from her wealthy friend.' })),
    child('d', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'What does Loisel’s handing over his savings show about him?', model: 'He is generous and loving; he gives up his own small pleasure so that his wife can be happy.', sol: 'Self-sacrifice and love for his wife.', scheme: [['Generous / self-sacrificing / loving', 1]] })),
    child('e', mcq({ t: 3, d: 3, c: 'analysis', stem: 'How do Matilda and Loisel differ in this scene?', opts: ['He is content with simple things; she longs for display.', 'He is greedy; she is generous.', 'He is vain; she is modest.', 'Both are equally ambitious.'], sol: 'Loisel is easily pleased; Matilda wants to shine.' })),
  ],
  sol: 'The scene contrasts the two characters; link (d) and (e).',
}));
Q('src_ball', source({
  t: [1, 2], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "At the party Matilda finally lives her dream. In her new dress and the borrowed diamond necklace, she is the most admired woman in the room; the most important guests seek her out as a partner for the dances, and she forgets everything except her own success. Her happiness is real, but it rests on things that are not hers. When the couple leave in the early hours, Loisel tries to wrap her in a plain everyday shawl. Ashamed to be seen in it beside women wearing costly coats, she hurries away into the night. Within the hour, the borrowed necklace will be gone.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'What did Matilda borrow from Madame Forestier for the party?', opts: ['a diamond necklace', 'a silk dress', 'a fur coat', 'a pearl bracelet'], sol: 'She chose a diamond necklace from her friend’s jewels.' })),
    child('b', mcq({ t: 1, d: 2, c: 'understanding', stem: 'How was Matilda received at the party?', opts: ['She was the most admired woman there.', 'Nobody noticed her.', 'She was asked to leave early.', 'She quarrelled with the hostess.'], sol: 'She was the centre of attention.' })),
    child('c', fb({ t: 1, d: 2, c: 'understanding', stem: 'Matilda hurried away from the party because she was ashamed of her plain ___.', acc: [['shawl', 'wrap', 'cloak', 'coat']], sol: 'She was embarrassed by her simple **shawl**.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Why does the commentary say her happiness rests on things that are not hers?', model: 'Her success depends on a borrowed necklace and an expensive dress, a show of wealth rather than her real life.', sol: 'Her triumph depends on borrowed finery.', scheme: [['Her success depends on borrowed or bought show', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'How does Matilda’s hurry to leave the party lead to disaster?', opts: ['In her haste and shame she loses the necklace.', 'She forgets her husband at the party.', 'She catches a cold in the rain.', 'She leaves the dress behind.'], sol: 'Her vanity-driven rush is when the necklace is lost.' })),
  ],
  sol: 'Notice the irony: her moment of triumph leads straight to loss.',
}));
Q('src_sacrifice', source({
  t: [1, 3], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Once the necklace is gone, the Loisels choose honesty of a costly kind. Loisel searches everywhere, reports the loss and advertises a reward, while Matilda, on his advice, writes to her friend that the clasp is being repaired, to gain time. When nothing turns up, they buy a matching diamond necklace for 36,000 francs, using his inheritance and borrowing the rest at ruinous terms. Then the real story begins. They dismiss their servant and move to an attic; Matilda does the heaviest housework herself, and Loisel takes extra work in the evenings. It takes them ten years to repay everything.",
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'recall', stem: 'What did Matilda write to Madame Forestier after the loss?', opts: ['that the clasp was being repaired', 'that the necklace had been stolen', 'that she wanted to keep it longer', 'that she had sold it'], sol: 'To gain time, she said the clasp was being mended.' })),
    child('b', fb({ t: 1, d: 2, c: 'recall', stem: 'The Loisels took ___ years to pay off the debt for the replacement necklace.', acc: [['ten', '10']], sol: 'It took **ten** years.' })),
    child('c', mcq({ t: 1, d: 2, c: 'understanding', stem: 'How did the Loisels pay for the replacement necklace?', opts: ['with Loisel’s inheritance and heavy borrowing', 'by selling Matilda’s dress', 'with a gift from the minister', 'with a reward from the police'], sol: 'They used his inheritance and borrowed the rest.' })),
    child('d', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'What does the commentary mean by *honesty of a costly kind*?', model: 'Instead of confessing or running away, they replaced the necklace in full, and paying for it cost them ten years of hardship.', sol: 'They chose to make good the loss, at great personal cost.', scheme: [['Replacing it honestly cost them years of hardship', 1]] })),
    child('e', mcq({ t: 3, d: 3, c: 'evaluation', stem: 'Which quality does Matilda show during the ten years of hardship?', opts: ['courage and endurance', 'jealousy', 'idleness', 'deceit towards her husband'], sol: 'She faced heavy work bravely.' })),
  ],
  sol: 'Trace the chain: loss → search → replacement → ten years of labour.',
}));
Q('src_twist', source({
  t: [2, 4], d: 3, c: 'evaluation', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "The final scene turns everything upside down. One Sunday, after the debt has finally been paid, Matilda, worn and aged by her labour, meets Madame Forestier, who still looks young and elegant and hardly recognises her. Feeling she has nothing left to hide, Matilda tells the whole story. Her friend is deeply moved and reveals that the necklace she lent was not made of real diamonds: it was an imitation worth only a few hundred francs. The reader is left with the cruelty of the twist. Ten years were spent paying for a piece of glass, and all because of one evening of display and one moment of pride.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'Whom did Matilda meet one Sunday after the debt was paid?', opts: ['Madame Forestier', 'the minister’s wife', 'the jeweller', 'her old servant'], sol: 'She met her friend, Madame Forestier.' })),
    child('b', mcq({ t: 1, d: 2, c: 'recall', stem: 'What did Madame Forestier reveal about the lost necklace?', opts: ['It was an imitation worth very little.', 'It had been found years ago.', 'It had belonged to a queen.', 'It was worth twice what they paid.'], sol: 'The necklace was paste, worth only a few hundred francs.' })),
    child('c', fb({ t: 1, d: 2, c: 'understanding', stem: 'The original necklace was not real diamonds but an ___.', acc: [['imitation', 'imitation necklace', 'fake']], sol: 'It was an **imitation**.' })),
    child('d', short({ t: 2, d: 4, c: 'evaluation', marks: 1, stem: 'Could the whole tragedy have been avoided? Give one reason.', model: 'Yes; if Matilda had told her friend the truth at once, she would have learnt it was fake and lost almost nothing.', sol: 'Reward a supported view: honesty at the start, or not borrowing at all, would have avoided it.', scheme: [['A view with one reason from the story', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What kind of ending does *The Necklace* have?', opts: ['a twist ending full of irony', 'a happy ending with a reward', 'an open ending with no resolution', 'a moral spoken by the narrator'], sol: 'The surprise reveal makes the ten years painfully ironic.' })),
  ],
  sol: 'Part (d) has no single right answer; reward a supported view.',
}));

// ================================================================ short answers, 3 marks (40–50 words) — the board's Q9 form
const SA3 = { marks: 3, wl: [40, 50], scheme: SCHEME3, time: 240 };
Q('sa_unhappy', short({
  ...SA3, t: [1, 3], d: 2, c: 'understanding',
  stem: 'Why was Matilda Loisel unhappy at the beginning of *The Necklace*? Answer in 40–50 words.',
  model: 'Matilda was pretty and charming but came from a modest family and had married a minor clerk. She felt she deserved luxury, so her plain flat and simple life seemed shameful. She spent her days dreaming of wealth, and these dreams made her even more discontented.',
  sol: 'Her background and marriage + her sense that she deserved luxury + daydreams that deepened her discontent.',
}));
Q('sa_invitation_reaction', short({
  ...SA3, t: [1, 3], d: 2, c: 'understanding',
  stem: 'How did Matilda react to the invitation to the minister’s party, and how did Loisel respond? Answer in 40–50 words.',
  model: 'Instead of being pleased, Matilda burst into tears because she had no suitable dress. Loisel, hurt but loving, asked what a dress would cost and gave her the 400 francs he had saved for a gun. When she then wanted jewels, he suggested borrowing from Madame Forestier.',
  sol: 'Her tears (no dress) + his sacrifice of the gun money + his suggestion about the jewels.',
}));
Q('sa_loisel', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'Describe Loisel’s character, with two examples from *The Necklace*. Answer in 40–50 words.',
  model: 'Loisel is content, loving and self-sacrificing. He is happy with simple things, yet gives up his savings for a gun so that Matilda can have a dress. After the loss he searches tirelessly, spends his inheritance, borrows heavily and works extra hours for ten years without blaming her.',
  sol: 'Two or three traits (content, generous, self-sacrificing, responsible) with episodes.',
}));
Q('sa_contrast', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'Contrast Matilda and Loisel as we see them before the party. Answer in 40–50 words.',
  model: 'Loisel is easily satisfied: he enjoys a simple meal and is proud of the invitation. Matilda is never satisfied, dreaming of luxury and weeping because she lacks a dress and jewels. He thinks of her happiness; she thinks mainly of how she will appear to others.',
  sol: 'Content versus discontented + his selflessness versus her concern with appearance, with examples.',
}));
Q('sa_lost', short({
  ...SA3, t: 1, d: 2, c: 'understanding',
  stem: 'What did the Loisels do when they discovered the necklace was missing? Answer in 40–50 words.',
  model: 'Loisel retraced their route on foot, advertised a reward in the newspapers, and made enquiries with the cab companies and the police. On his advice Matilda wrote to Madame Forestier saying the clasp was being repaired, to gain time. After a week without success, they decided to replace it.',
  sol: 'The search (route, newspapers, cabs, police) + the letter to gain time + the decision to replace it.',
}));
Q('sa_replace', short({
  ...SA3, t: 1, d: 2, c: 'understanding',
  stem: 'How did the Loisels manage to replace the lost necklace? Answer in 40–50 words.',
  model: 'They found a matching diamond necklace at a jeweller’s, priced at 36,000 francs after bargaining. Loisel used the money his father had left him and borrowed the rest from many lenders, at high interest and on harsh terms. He risked his whole future to pay for it.',
  sol: 'The matching necklace and price + the inheritance + heavy borrowing on harsh terms.',
}));
Q('sa_hardship', short({
  ...SA3, t: [1, 3], d: 3, c: 'analysis',
  stem: 'How did the Loisels’ lives change during the ten years of repaying the debt? Answer in 40–50 words.',
  model: 'They dismissed their servant and moved to a cramped attic. Matilda did all the heavy housework, washing and shopping herself, bargaining over every coin. Loisel worked extra hours in the evenings. By the end Matilda looked old and rough, her beauty worn away by labour.',
  sol: 'The changes in home and work for both + the effect on Matilda’s appearance.',
}));
Q('sa_forestier', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'What kind of person is Madame Forestier? Give evidence from *The Necklace*. Answer in 40–50 words.',
  model: 'Madame Forestier is wealthy and generous enough to lend her jewels freely. When the replacement comes back she is cold about the delay, but she does not open the case. At the end she is moved by Matilda’s story and honestly reveals the necklace was fake.',
  sol: 'Generous (lends freely) + cool on return + honest and moved at the end, with evidence.',
}));
Q('sa_irony', short({
  ...SA3, t: [2, 4], d: 3, c: 'analysis',
  stem: 'Explain the irony of the ending of *The Necklace*. Answer in 40–50 words.',
  model: 'The Loisels sacrificed ten years and their youth to pay for real diamonds, but the necklace they lost was an imitation worth only a few hundred francs. The very honesty and effort that seem noble turn out to have been unnecessary, making their suffering bitterly ironic.',
  sol: 'The contrast between the real cost paid and the fake necklace + why that is ironic.',
}));
Q('sa_vanity', short({
  ...SA3, t: 2, d: 3, c: 'analysis',
  stem: 'How does vanity lead to Matilda’s downfall? Answer in 40–50 words.',
  model: 'Matilda’s wish to appear rich makes her refuse to go plainly dressed, so she buys a costly dress and borrows a diamond necklace. Ashamed of her shawl, she rushes from the party and loses it. Her pride, and her silence afterwards, cost her ten years.',
  sol: 'Vanity at each stage: the dress and necklace, the hurried exit, the decision to hide the loss.',
}));
Q('sa_honesty', short({
  ...SA3, t: 2, d: 4, c: 'evaluation',
  stem: 'Should Matilda have told Madame Forestier the truth at once? Give your view in 40–50 words.',
  model: 'Yes. Telling the truth would have revealed that the necklace was fake, saving ten years of hardship. Even if it had been real, an honest friend might have agreed to a fair arrangement. Hiding the loss out of shame and pride made a misfortune into a tragedy.',
  sol: 'A stand + the consequence of the truth (learning it was fake) + a comment on pride and honesty. A reasoned opposite view is acceptable.',
}));
Q('sa_matilda_change', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'How does Matilda change in the course of *The Necklace*? Answer in 40–50 words.',
  model: 'At first Matilda is vain, dreamy and dissatisfied, wanting luxury without effort. After the loss she becomes brave and hard-working, doing heavy chores and bargaining for every coin. She loses her beauty but gains strength and dignity, facing hardship that she once would have thought unbearable.',
  sol: 'Before (vain, discontented) + after (hard-working, resilient) + what she loses and gains.',
}));
Q('sa_fate', short({
  ...SA3, t: 2, d: 4, c: 'evaluation',
  stem: 'Is Matilda a victim of fate, or of her own choices? Answer in 40–50 words.',
  model: 'Mostly her own choices. Fate played a part in the moment she lost the necklace. But she chose to borrow jewels to impress others, to rush away in shame, and to hide the loss instead of confessing. Each choice came from pride, turning one accident into ten lost years.',
  sol: 'A stand + the role of chance + her choices (borrowing, rushing, hiding the loss).',
}));
Q('sa_title', short({
  ...SA3, t: [2, 4], d: 3, c: 'evaluation',
  stem: 'Is *The Necklace* a suitable title for Maupassant’s story? Give reasons in 40–50 words.',
  model: 'Yes. The necklace drives every turn of the plot: the borrowing, the triumph at the party, the loss, the replacement and the final revelation. It is also a symbol of false appearances, since it looks valuable but is fake, just like the glittering life Matilda longs for.',
  sol: 'A stand + the necklace as the centre of the plot + its symbolic meaning.',
}));

// ================================================================ short answers, 2 marks (30–40 words)
const SA2 = { marks: 2, wl: [30, 40], scheme: SCHEME2, time: 150 };
Q('sb_flowers', short({
  ...SA2, t: [1, 3], d: 2, c: 'understanding',
  stem: 'Why did Matilda refuse Loisel’s suggestion to wear fresh flowers to the party? Answer in 30–40 words.',
  model: 'Matilda felt that fresh flowers would look cheap beside the jewels of rich women. She could not bear to appear poor in such company, which shows how much she cared about outward show.',
  sol: 'Her fear of looking poor + what it shows (vanity).',
}));
Q('sb_choose', short({
  ...SA2, t: 1, d: 1, c: 'recall',
  stem: 'Which jewel did Matilda choose from Madame Forestier’s collection, and how did she feel? Answer in 30–40 words.',
  model: 'Matilda chose a diamond necklace from among her friend’s jewels. She was overjoyed and felt a thrill of delight on seeing herself in it, hardly able to believe it was hers for the evening.',
  sol: 'The diamond necklace + her delight.',
}));
Q('sb_letter', short({
  ...SA2, t: 1, d: 2, c: 'understanding',
  stem: 'Why did Matilda write to Madame Forestier that the clasp of the necklace was broken? Answer in 30–40 words.',
  model: 'On Loisel’s advice she said the clasp was being repaired so that they would have time to search for the lost necklace, or to replace it, before having to return it.',
  sol: 'The excuse + its purpose (gaining time).',
}));
Q('sb_return', short({
  ...SA2, t: [1, 3], d: 2, c: 'understanding',
  stem: 'How did Madame Forestier receive the replacement necklace? Answer in 30–40 words.',
  model: 'She took it back rather coldly, grumbling that Matilda had kept it far too long. Because she never opened the case, she did not notice that a different necklace had been returned.',
  sol: 'Her cold complaint about the delay + she did not open the case.',
}));
Q('sb_aged', short({
  ...SA2, t: [1, 3], d: 2, c: 'recall',
  stem: 'Why did Madame Forestier hardly recognise Matilda at their final meeting? Answer in 30–40 words.',
  model: 'Ten years of heavy work and poverty had changed Matilda completely. She looked old, tired and roughly dressed, with work-worn hands, nothing like the charming young woman her friend remembered.',
  sol: 'Ten years of labour + the change in her appearance.',
}));
Q('sb_lesson', short({
  ...SA2, t: 2, d: 3, c: 'application',
  stem: 'What lesson can a student learn from *The Necklace*? Answer in 30–40 words.',
  model: 'We should be content with what we have and not live for appearances. When something goes wrong, telling the truth early is wiser than hiding a mistake out of pride.',
  sol: 'One or two lessons (contentment, honesty) linked to the story.',
}));

// ================================================================ long answers, 6 marks (100–120 words) — the board's long-answer form
const LA = { marks: 6, wl: [100, 120], scheme: LONG_SCHEME, time: 720 };
Q('la_matilda_sketch', long({
  ...LA, t: [4, 3], d: 3, c: 'analysis',
  stem: 'Write a character sketch of Matilda Loisel in *The Necklace*. Answer in 100–120 words.',
  model: 'Matilda is a pretty and charming woman, but she is deeply discontented. Born into a modest family and married to a minor clerk, she believes she was meant for luxury and despises her simple home. She is vain, weeping over a dress and refusing to wear flowers instead of jewels. At the party her vanity is rewarded for one night, but her shame about her shawl makes her rush away and lose the necklace. Pride also stops her from confessing. Yet the loss reveals another side of her: she becomes brave and hard-working, enduring ten years of heavy labour without collapse. Matilda is a tragic figure whose real strength appears only after vanity has ruined her.',
  sol: 'Traits with evidence: charming, discontented, vain, proud; then courageous and hard-working. Note the change and end with a judgement.',
}));
Q('la_loisel_sketch', long({
  ...LA, t: [4, 3], d: 3, c: 'analysis',
  stem: 'Loisel is the true hero of *The Necklace*. Do you agree? Answer in 100–120 words.',
  model: 'I agree that Loisel is the quiet hero of the story. Unlike his wife, he is content with a simple life, yet he wants her to be happy. He brings home the invitation to please her and gives up the money he had saved for a gun so that she can have a dress. When the necklace is lost, he walks the streets for hours and makes every enquiry he can. Then he spends his inheritance, borrows heavily and works extra hours for ten years. He never blames Matilda. His love, patience and sense of responsibility hold the family together. While Matilda’s vanity causes the disaster, Loisel’s selflessness carries them through it.',
  sol: 'A clear stand + his contentment, generosity, sacrifice, effort after the loss, and loyalty + a contrast with Matilda + conclusion.',
}));
Q('la_vanity_theme', long({
  ...LA, t: [4, 2], d: 4, c: 'evaluation',
  stem: 'Pride goes before a fall. Discuss with reference to *The Necklace*. Answer in 100–120 words.',
  model: 'Matilda’s story shows how pride leads to ruin. She is too proud to accept her modest life, so she spends her husband’s savings on a dress and borrows a diamond necklace to shine at the party. Her pride is satisfied for one evening, but it also makes her hurry away, ashamed of her plain shawl, and the necklace is lost. Pride then stops her from telling her friend the truth; she writes an excuse and the couple secretly buy a replacement. Ten years of poverty and labour follow, and only then does she learn the necklace was fake. Had she been content or honest at any stage, the fall could have been avoided.',
  sol: 'A stand + pride at each stage (dress, necklace, flight, silence) + the fall (ten years) + the twist + conclusion.',
}));
Q('la_honesty_debate', long({
  ...LA, t: [4, 2], d: 4, c: 'evaluation',
  stem: 'The Loisels were honest in replacing the necklace but dishonest in hiding its loss. Discuss this mixed picture in *The Necklace*, in 100–120 words.',
  model: 'The Loisels’ conduct is honest in one way and dishonest in another. They never thought of cheating Madame Forestier. Instead, they paid for a real diamond necklace, using Loisel’s inheritance and heavy loans, and repaid every franc through ten years of hardship. That shows real integrity. Yet they also hid the truth. Matilda wrote that the clasp was being repaired, and they returned a substitute without a word. Their silence came from shame and fear rather than malice, but it cost them dearly: a frank confession would have revealed at once that the original was fake. The story suggests that honesty about our mistakes matters as much as making good the loss.',
  sol: 'Their honesty (full replacement, repayment) + their concealment (the excuse, the silent substitution) + the cost of the concealment + a judgement.',
}));
Q('la_diary_matilda', long({
  ...LA, t: [4, 1], d: 4, c: 'application', bloom: 'create',
  stem: 'Imagine you are Matilda. Write a diary entry on the evening after you learnt the truth about the necklace from Madame Forestier. Answer in 100–120 words.',
  model: 'Sunday night\n\nI cannot stop shaking. Today I met my old friend, still lovely and young, while I stood before her grey and worn. I told her everything at last: the loss, the replacement, the ten years. And she told me that the necklace I lost was false, worth only a few hundred francs. Ten years of scrubbing floors, haggling at the market and watching my husband toil at night, all for a piece of glass! If I had only told her the truth that first morning. Yet I am strangely calm too. We paid our debt honestly, and I have learnt what I am capable of. I wanted to dazzle others; now I want only peace.',
  sol: 'Diary format (day, first person, feelings). Content consistent with the story: the meeting, the confession, the revelation, regret, reflection on honesty and pride.',
}));
Q('la_loisel_letter', long({
  ...LA, t: [4, 1], d: 4, c: 'application', bloom: 'create',
  stem: 'Imagine you are Loisel. Write a letter to an old friend describing your life during the years of repaying the debt for the necklace. Answer in 100–120 words.',
  model: 'Dear Paul,\n\nForgive my long silence; these years have been the hardest of my life. You may have heard that Matilda lost a borrowed necklace after a party. We replaced it with a diamond necklace that cost far more than we had. I used my father’s legacy and borrowed the rest from anyone who would lend. Since then we have lived in a tiny attic. Matilda, who once dreamt of palaces, now does all the washing and bargains in the market. I work at my office by day and copy documents at night. We are tired, but we will pay every franc. Strangely, I have never admired my wife more.\n\nYour friend,\nLoisel',
  sol: 'Informal letter format. Content consistent with the story: the loss, the replacement and borrowing, the attic, Matilda’s labour, his extra work. A personal, loyal tone.',
}));
Q('la_appearance_reality', long({
  ...LA, t: [4, 2], d: 4, c: 'analysis',
  stem: 'How does *The Necklace* explore the gap between appearance and reality? Answer in 100–120 words.',
  model: 'The story is built on the gap between how things look and what they are. Matilda’s outward charm hides a discontented heart. At the party she appears to be a rich and elegant lady, but her dress was bought with her husband’s savings and her diamonds were borrowed. The necklace itself looks priceless but is an imitation. Madame Forestier’s wealth seems to make jewels a serious matter, yet she lent a fake without comment. Even the Loisels’ final honesty rests on a false belief about what they lost. Maupassant suggests that a life spent chasing appearances is a life spent paying for illusions, sometimes at the cost of youth and happiness.',
  sol: 'Examples of appearance versus reality: Matilda’s charm and discontent, her borrowed show at the party, the fake necklace, the belief they acted on. Conclude with the theme.',
}));
Q('la_ending_alt', long({
  ...LA, t: [4, 2], d: 4, c: 'application', bloom: 'create',
  stem: 'Suppose Matilda had told Madame Forestier the truth the morning after the party. Describe what might have happened, and how it would change the meaning of *The Necklace*. Answer in 100–120 words.',
  model: 'If Matilda had confessed at once, Madame Forestier would probably have told her that the necklace was only an imitation. Matilda would have felt embarrassed, perhaps offered to pay a small sum, and returned home relieved. The Loisels would have kept their flat, their servant and Loisel’s inheritance, and Matilda would have kept her youth. However, the story would lose its force. There would be no ten years of labour, no change in Matilda’s character and no bitter twist. Maupassant’s lesson about pride and the cost of hiding mistakes would disappear. The real ending is painful precisely because one honest sentence could have prevented a decade of suffering.',
  sol: 'A plausible alternative (the truth revealed, little lost) + what the characters would keep + how the meaning and irony would change + conclusion.',
}));
Q('la_title_long', long({
  ...LA, t: [4, 2], d: 3, c: 'evaluation',
  stem: 'Would *Ten Lost Years* be a better title for *The Necklace*? Give your view in 100–120 words.',
  model: 'In my view, the original title works better. Ten Lost Years would capture the heavy price the Loisels paid, and it would stress the suffering that fills the second half of the story. However, it would give away part of the plot and weaken the final surprise. The Necklace keeps the reader’s attention on the object that drives every event: the borrowing, the triumph, the loss, the replacement and the revelation. It is also a symbol. The necklace looks precious but is false, just like the life of show that Matilda longed for. A simple title that hides a cruel twist suits Maupassant’s ironic style perfectly.',
  sol: 'A clear stand + what the alternative gains and loses + the necklace as plot centre and symbol + conclusion. A reasoned case for the alternative can also earn full marks.',
}));

// ================================================================ objective items
Q('mc_author', mcq({ t: 1, d: 1, c: 'recall', stem: '*The Necklace* was written by…', opts: ['Guy de Maupassant', 'H. G. Wells', 'Anton Chekhov', 'O. Henry'], sol: 'It is a story by the French writer Guy de Maupassant.' }));
Q('mc_nationality', mcq({ t: 1, d: 2, c: 'recall', stem: 'Guy de Maupassant, the author of *The Necklace*, was a writer from…', opts: ['France', 'Russia', 'England', 'Germany'], sol: 'Maupassant (1850–1893) was a French master of the short story.' }));
Q('mc_gun', mcq({ t: 1, d: 2, c: 'recall', stem: 'What had Loisel been saving his 400 francs for?', opts: ['a gun', 'a new suit', 'a holiday', 'a gift for his mother'], sol: 'He gave up the money he had saved for a gun.' }));
Q('mc_matilda_trait', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Which word best describes Matilda at the start of *The Necklace*?', opts: ['discontented', 'contented', 'generous', 'humble'], sol: 'She is unhappy with her modest life.' }));
Q('mc_loisel_trait', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Which quality does Loisel show most clearly in *The Necklace*?', opts: ['self-sacrifice', 'greed', 'jealousy', 'cowardice'], sol: 'He gives up his savings and years of comfort for his wife.' }));
Q('mc_why_hide', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Why did the Loisels most likely not tell Madame Forestier about the loss?', opts: ['They were ashamed and feared being thought dishonest.', 'They planned to keep the necklace.', 'They had forgotten whose it was.', 'Madame Forestier had left Paris.'], sol: 'Shame and pride kept them silent.' }));
Q('mc_cost', mcq({ t: 1, d: 2, c: 'recall', stem: 'How much did the Loisels pay for the replacement necklace?', opts: ['36,000 francs', '400 francs', '500 francs', '4,000 francs'], sol: 'After bargaining, the replacement cost 36,000 francs.' }));
Q('mc_irony', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What is the main irony in *The Necklace*?', opts: ['The Loisels ruin ten years paying for real diamonds to replace a fake necklace.', 'Matilda is invited to the party by mistake.', 'Loisel hates parties but enjoys this one.', 'The jeweller cheats the Loisels.'], sol: 'Their sacrifice was for a necklace worth very little.' }));
Q('mc_message', mcq({ t: 2, d: 3, c: 'evaluation', stem: 'Which message does *The Necklace* most strongly convey?', opts: ['Vanity and pride can cost far more than they seem to.', 'Borrowing is always wrong.', 'Rich people cannot be trusted.', 'Parties bring good luck.'], sol: 'Matilda’s vanity and pride cost her ten years.' }));
Q('mc_apply', mcq({ t: [2, 3], d: 3, c: 'application', fixed: true, key: 'd', stem: 'A student borrows a friend’s expensive phone for a function and breaks it. Which choice avoids Matilda’s mistake?', opts: ['secretly buying the most expensive replacement on a loan', 'saying the phone was stolen', 'avoiding the friend for months', 'telling the friend at once and discussing what to do'], sol: 'Honest disclosure first is what Matilda failed to do.' }));
Q('mc_forestier_end', mcq({ t: 3, d: 2, c: 'understanding', fixed: true, key: 'b', stem: 'How did Madame Forestier react to Matilda’s confession at the end?', opts: ['She laughed at Matilda.', 'She was deeply moved.', 'She demanded more money.', 'She called the police.'], sol: 'She was touched by what Matilda had suffered.' }));
Q('mc_structure', mcq({ t: 2, d: 3, c: 'analysis', fixed: true, key: 'c', stem: 'Where does Maupassant place the most important revelation in *The Necklace*?', opts: ['in the first paragraph', 'in the middle, at the party', 'in the very last moments of the story', 'in a letter before the party'], sol: 'The twist comes at the very end, which gives it its force.' }));

Q('fb_friend', fb({ t: 1, d: 1, c: 'recall', stem: 'Matilda borrowed the necklace from her wealthy friend Madame ___.', acc: [['Forestier']], sol: 'Her friend was Madame **Forestier**.' }));
Q('fb_years', fb({ t: 1, d: 1, c: 'recall', stem: 'It took the Loisels ___ years to repay the debt.', acc: [['ten', '10']], sol: 'They laboured for **ten** years.' }));
Q('fb_home', fb({ t: 1, d: 2, c: 'recall', marks: 1, stem: 'To save money, the Loisels dismissed their ___ and moved into an ___.', acc: [['servant', 'maid'], ['attic', 'garret']], sol: 'They let the **servant** go and moved to an **attic**.', scheme: [['servant', 0.5], ['attic', 0.5]] }));
Q('fb_fake', fb({ t: 1, d: 2, c: 'understanding', stem: 'Madame Forestier’s original necklace was worth only about ___ francs.', acc: [['500', 'five hundred']], sol: 'It was worth only about **500** francs.' }));

Q('ar_tears', ar({ t: [1, 3], d: 3, c: 'analysis', a: 'Matilda wept when Loisel showed her the invitation.', r: 'She had no dress fit for such a grand party.', key: 'a', sol: 'Both are true, and R explains A.' }));
Q('ar_replace', ar({ t: 1, d: 3, c: 'analysis', a: 'The Loisels bought a replacement necklace.', r: 'Madame Forestier demanded that they pay her 36,000 francs.', key: 'c', sol: 'A is true. R is false: she never knew of the loss; they replaced it secretly.' }));
Q('ar_aged', ar({ t: [1, 3], d: 3, c: 'analysis', a: 'Matilda looked old at her final meeting with Madame Forestier.', r: 'Loisel had brought home an invitation to the minister’s party.', key: 'b', sol: 'Both are true, but the invitation does not explain her ageing, which came from ten years of labour.' }));
Q('ar_loisel_blame', ar({ t: 3, d: 3, c: 'understanding', a: 'Loisel blamed Matilda bitterly for losing the necklace.', r: 'Loisel worked extra hours for years to repay the debt.', key: 'd', sol: 'A is false: he never blamed her. R is true.' }));

Q('tf_happy', tf({ t: 1, d: 1, c: 'recall', stem: 'True or false: at the start of *The Necklace*, Matilda is content with her simple home.', ans: false, sol: 'She is deeply dissatisfied with it.' }));
Q('tf_success', tf({ t: 1, d: 2, c: 'recall', stem: 'True or false: Matilda was a great success at the minister’s party.', ans: true, sol: 'She was the most admired woman there.' }));
Q('tf_opened', tf({ t: 1, d: 2, c: 'understanding', stem: 'True or false: Madame Forestier opened the case and noticed that the necklace had been replaced.', ans: false, sol: 'She did not open the case.' }));
Q('tf_inherit', tf({ t: 1, d: 2, c: 'recall', stem: 'True or false: Loisel used money left to him by his father to help pay for the replacement.', ans: true, sol: 'He used his inheritance and borrowed the rest.' }));

Q('ord_events', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange these events from *The Necklace* in the order in which they happen.',
  items: ['Loisel brings home an invitation to a minister’s party.', 'Matilda borrows a diamond necklace from Madame Forestier.', 'Matilda shines at the party.', 'The Loisels discover the necklace is missing.', 'They buy a replacement with borrowed money.', 'Madame Forestier reveals the original was fake.'],
  sol: 'Invitation → borrowing → the party → the loss → the replacement → the revelation.',
}));
Q('ord_after', ord({
  t: [1, 3], d: 3, c: 'analysis', marks: 2,
  stem: 'Arrange the events after the party in *The Necklace* in order.',
  items: ['Matilda hurries out, ashamed of her plain shawl.', 'At home she finds the necklace gone.', 'Loisel searches and reports the loss.', 'Matilda writes that the clasp is being repaired.', 'The couple move to an attic and begin years of hard work.'],
  sol: 'The hurried exit → the discovery → the search → the excuse → the years of labour.',
}));

Q('mt_people', match({
  t: [1, 3], d: 2, c: 'recall', marks: 2,
  stem: 'Match each character in *The Necklace* with their part in the story.',
  pairs: [['Matilda', 'borrows the necklace and loses it'], ['Loisel', 'gives up his savings and works extra hours'], ['Madame Forestier', 'lends the necklace and reveals the truth'], ['the minister', 'hosts the party']],
  sol: 'Each character’s role.',
}));
Q('mt_words', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match these words used when studying *The Necklace* with their meanings.',
  pairs: [['vanity', 'too much pride in one’s looks or status'], ['imitation', 'a copy made to look like the real thing'], ['attic', 'a small room just under the roof'], ['irony', 'an outcome opposite to what was expected']],
  sol: 'Key words for discussing this chapter.',
}));
Q('mt_traits', match({
  t: 3, d: 3, c: 'analysis', marks: 2,
  stem: 'Match each action in *The Necklace* with the trait it reveals.',
  pairs: [['Matilda refuses to wear fresh flowers', 'vanity'], ['Loisel gives up his savings for her dress', 'generosity'], ['Matilda does heavy housework for years', 'endurance'], ['Madame Forestier tells the truth at the end', 'honesty']],
  sol: 'Each action and the trait it shows.',
}));
