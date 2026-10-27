// CBSE 10 English Language and Literature, ch18 "Amanda!" (Robin Klein) — question bank.
// LITERATURE RULE (CONTEXT §8): the poem is in copyright. No line or phrase of it is reproduced; only the
// title, the girl's name and single words (hunch, languid, slouching, emerald, tranquil, sulking, acne,
// Rapunzel) appear. The adult's commands are named as topics (nail-biting, posture, chores), never written
// out as commands, and Amanda's daydreams are described by idea. Passages are SOYL commentary
// (passage_origin: soyl-commentary). build.mjs runs a short forbidden-phrase guard (src/guard.mjs).
import { Q, mcq, fb, short, long, tf, ar, match, ord, source, child } from "../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs";

const NOTE = "*(This passage is SOYL's commentary on the poem, not lines from it. Read the poem itself in your textbook, First Flight.)*";
const SRC_STEM = `Read the commentary on *Amanda!* and answer the questions that follow. ${NOTE}`;
const SCHEME3 = [["Relevant point about the poem", 1], ["Explanation or interpretation linked to the question", 1], ["Expression and accuracy within 40–50 words", 1]];
const SCHEME2 = [["Correct point about the poem", 1], ["Explanation in own words within 30–40 words", 1]];
const LONG_SCHEME = [["Content: accurate points about the poem", 3], ["Interpretation / extrapolation: a clear, supported view", 1], ["Organisation and expression; within 100–120 words", 2]];

// ================================================================ extract-based (SOYL commentary)
Q("src_nagging", source({
  t: [1, 2], d: 2, c: "understanding", origin: "soyl-commentary",
  stem: SRC_STEM,
  passage: "Robin Klein opens with a burst of instructions from an adult, whom most readers take to be Amanda's mother. In only a few lines the girl is corrected about chewing at her fingertips, about the way she holds her shoulders and about how she sits. Each instruction is followed by her name, called out sharply. None of the complaints is cruel on its own; parents everywhere say such things. What wears Amanda down is the pile-up: one correction after another, with no pause in which she might answer.",
  parts: [
    child("a", mcq({ t: 1, d: 1, c: "recall", stem: "Who is speaking in the opening stanza of *Amanda!*, according to the commentary?", opts: ["an adult, probably Amanda's mother", "Amanda herself", "Amanda's teacher at school", "a friend of Amanda's"], sol: "The opening voice is an adult's, usually read as her mother." })),
    child("b", mcq({ t: 1, d: 2, c: "understanding", stem: "Which of these habits is Amanda corrected for at the start of *Amanda!*?", opts: ["biting her nails", "talking too loudly", "coming home late", "forgetting her lunch"], sol: "Nail-biting is among the first habits the adult criticises." })),
    child("c", fb({ t: 1, d: 2, c: "understanding", stem: "The commentary says that what wears Amanda down is the ___-up of corrections.", acc: [["pile"]], sol: "It is the **pile**-up: one correction after another." })),
    child("d", short({ t: 2, d: 3, c: "analysis", marks: 1, stem: "Why, according to the commentary, is no single complaint in *Amanda!* the real problem?", model: "Each complaint is ordinary; the harm comes from how many there are, with no pause for Amanda to reply.", sol: "Quantity and pace, not any one remark.", scheme: [["The number and pace of the complaints", 1]] })),
    child("e", mcq({ t: 3, d: 2, c: "understanding", stem: "What follows each instruction in the opening of *Amanda!*?", opts: ["the girl's name, called out sharply", "a gentle explanation", "a reward for obeying", "a question about school"], sol: "The name is repeated after each instruction." })),
  ],
  sol: "Answer from the commentary; parts (a) and (b) also follow from your reading of the poem.",
}));
Q("src_mermaid", source({
  t: [1, 3], d: 3, c: "analysis", origin: "soyl-commentary",
  stem: SRC_STEM,
  passage: "Then the voice changes. Inside brackets, Amanda slips away into a world of her own: she pictures herself as a mermaid, floating without effort in a calm, deep-green sea where nobody else lives. The brackets work like a closed door. Outside them the adult goes on talking; inside them there is no one to give orders. The picture is slow and peaceful, the opposite of the hurried commands that came just before. Amanda does not argue back. She simply leaves, in her mind, for a place where she is completely alone.",
  parts: [
    child("a", mcq({ t: 1, d: 1, c: "recall", stem: "In her first daydream in *Amanda!*, Amanda imagines that she is…", opts: ["a mermaid", "a pilot", "a queen", "a bird"], sol: "She pictures herself as a mermaid in the sea." })),
    child("b", mcq({ t: 3, d: 2, c: "understanding", stem: "What does the commentary compare the brackets in *Amanda!* to?", opts: ["a closed door", "a window", "a bridge", "a ladder"], sol: "The brackets shut the adult's voice out, like a closed door." })),
    child("c", fb({ t: 3, d: 2, c: "understanding", stem: "The sea Amanda imagines is calm and deep-___ in colour.", acc: [["green"]], sol: "It is a calm, deep-**green** sea." })),
    child("d", short({ t: 2, d: 4, c: "analysis", marks: 1, stem: "Why is it important that nobody else lives in Amanda's imagined sea?", model: "Being alone means no one can give her orders; solitude is the freedom she wants.", sol: "Solitude = freedom from orders.", scheme: [["Alone, so free from instructions", 1]] })),
    child("e", mcq({ t: 3, d: 3, c: "analysis", stem: "How does the mood of Amanda's mermaid daydream differ from the stanza before it?", opts: ["It is slow and peaceful, not hurried and bossy.", "It is angrier and louder.", "It is funnier and more playful.", "It is more frightening."], sol: "Calm, slow imagery contrasts with rapid commands." })),
  ],
  sol: "Explain how the daydream answers the nagging: by escape, not argument.",
}));
Q("src_orphan", source({
  t: [1, 2], d: 3, c: "analysis", origin: "soyl-commentary",
  stem: SRC_STEM,
  passage: "The second daydream is startling. After another round of reminders about schoolwork, her bedroom and her shoes, Amanda imagines that she is an orphan, wandering barefoot through quiet streets and leaving soft prints in the dust. A real orphan's life would be lonely and hard, but Amanda is not thinking about hardship. To her the word means only one thing: no one to tell her what to do. She prizes the quiet and the liberty of that life. The wish shows how heavily the constant reminders weigh on her.",
  parts: [
    child("a", mcq({ t: 1, d: 1, c: "recall", stem: "In her second daydream in *Amanda!*, Amanda imagines that she is…", opts: ["an orphan", "a famous singer", "a teacher", "a sailor"], sol: "She pictures herself as an orphan wandering the streets." })),
    child("b", mcq({ t: 1, d: 2, c: "understanding", stem: "How does Amanda move through the streets in her daydream, according to the commentary?", opts: ["barefoot, leaving soft prints in the dust", "on a bicycle", "in a crowded bus", "running in new shoes"], sol: "She walks barefoot through the dust." })),
    child("c", fb({ t: 2, d: 2, c: "understanding", stem: "The commentary says that to Amanda, being an orphan means no one to tell her what to ___.", acc: [["do"]], sol: "It means no one to tell her what to **do**." })),
    child("d", short({ t: 2, d: 4, c: "evaluation", marks: 1, stem: "What does Amanda's wish to be an orphan reveal, according to the commentary?", model: "It reveals how heavily the constant reminders weigh on her, so that even loneliness seems better.", sol: "The depth of her frustration.", scheme: [["How much the nagging burdens her", 1]] })),
    child("e", mcq({ t: 2, d: 3, c: "analysis", stem: "Why does the commentary call the orphan daydream startling?", opts: ["A child wishing away her parents is a shocking wish.", "Orphans are rare in stories.", "Amanda has never seen a street.", "The daydream is written in a foreign language."], sol: "The wish to have no parents shows how far she wants to escape." })),
  ],
  sol: "Link the daydream to the reminders that come just before it.",
}));
Q("src_rapunzel", source({
  t: [3, 2], d: 3, c: "analysis", origin: "soyl-commentary",
  stem: SRC_STEM,
  passage: "The third daydream borrows from a fairy tale. In the old story Rapunzel is shut away in a tall tower, and visitors climb up to her by her long hair. Amanda turns the story round. She imagines that life alone in the tower would be calm and precious, and she would never lower her hair for anyone. In the tale the tower is a prison; in Amanda's version it is a refuge. Refusing to let her hair down means refusing to let anyone, including the adult, climb into her private world.",
  parts: [
    child("a", mcq({ t: 3, d: 2, c: "understanding", stem: "The reference to Rapunzel in *Amanda!* is an example of…", opts: ["allusion", "onomatopoeia", "hyperbole", "pun"], sol: "A reference to a well-known story is an allusion." })),
    child("b", mcq({ t: 1, d: 2, c: "understanding", stem: "In Amanda's version of the tale, the tower is…", opts: ["a refuge", "a prison", "a school", "a palace"], sol: "She sees it as a safe, peaceful place." })),
    child("c", fb({ t: 3, d: 2, c: "understanding", stem: "In the old story, visitors climb up to Rapunzel by her long ___.", acc: [["hair"]], sol: "They climb by her long **hair**." })),
    child("d", short({ t: 2, d: 4, c: "analysis", marks: 1, stem: "What does Amanda's refusal to lower her hair suggest in *Amanda!*?", model: "She would not let anyone, the nagging adult included, into her private world.", sol: "Keeping others out of her inner world.", scheme: [["She keeps everyone out of her private world", 1]] })),
    child("e", mcq({ t: 3, d: 3, c: "analysis", stem: "How does Amanda change the meaning of the Rapunzel story?", opts: ["She makes the lonely tower a place she wants to be.", "She makes Rapunzel a villain.", "She sets the story under the sea.", "She gives the story a sad ending."], sol: "A place of captivity becomes a place of peace." })),
  ],
  sol: "Explain the allusion and how Amanda reverses it.",
}));
Q("src_ending", source({
  t: [2, 3], d: 4, c: "evaluation", origin: "soyl-commentary",
  stem: SRC_STEM,
  passage: "In the last stanza there is no bracketed reply. The adult now scolds Amanda for sulking and for being moody, and then adds, as if hurt, that no one should think she is a nagging parent. The irony is sharp: the whole poem has been made of nagging, and this remark is one more piece of it. Amanda's silence is the real answer. Her sulking is not the cause of the problem but its result. A child who is never listened to stops talking and retreats into herself.",
  parts: [
    child("a", mcq({ t: 1, d: 2, c: "understanding", stem: "What is Amanda scolded for in the last stanza of *Amanda!*?", opts: ["sulking and being moody", "tearing her dress", "losing her books", "shouting at her brother"], sol: "The final complaints are about her sulking and moods." })),
    child("b", mcq({ t: 3, d: 3, c: "analysis", stem: "What is ironic about the adult's final remark in *Amanda!*?", opts: ["She denies nagging while she is nagging.", "She praises Amanda for the first time.", "She admits she was wrong.", "She leaves the room."], sol: "The denial is itself another complaint." })),
    child("c", fb({ t: 2, d: 2, c: "understanding", stem: "The commentary says Amanda's ___ is the real answer in the last stanza.", acc: [["silence"]], sol: "Her **silence** answers the adult." })),
    child("d", short({ t: 2, d: 4, c: "evaluation", marks: 1, stem: "According to the commentary, why is Amanda's sulking a result rather than a cause?", model: "She sulks because she is never listened to; the constant correction has made her withdraw.", sol: "Nagging produces the sulking.", scheme: [["Sulking is caused by being nagged and unheard", 1]] })),
    child("e", mcq({ t: 3, d: 3, c: "analysis", stem: "Why does the last stanza of *Amanda!* have no bracketed daydream after it?", opts: ["Amanda's silence now speaks for her.", "The poet ran out of ideas.", "Amanda has fallen asleep.", "The adult has stopped speaking."], sol: "The missing reply is itself meaningful." })),
  ],
  sol: "Explain the irony, then link the sulking to the nagging.",
}));
Q("src_form", source({
  t: [3, 4], d: 3, c: "analysis", origin: "soyl-commentary",
  stem: SRC_STEM,
  passage: "The poem is built from two voices that take turns. The adult's stanzas are full of orders and questions, and each one is stitched together by the girl's name, repeated again and again. Amanda's stanzas sit inside brackets. They are shorter, and each holds a single rhyme sound, which gives them a smooth, dreamy music. So the very shape of the page shows the conflict: noise and pressure outside the brackets, calm and freedom inside them. The last word belongs to the adult, but the brackets have already told us whose side the poem is on.",
  parts: [
    child("a", fb({ t: 3, d: 1, c: "recall", stem: "In *Amanda!*, the girl's daydream stanzas are placed inside ___.", acc: [["brackets", "parentheses"]], sol: "They sit inside **brackets** (parentheses)." })),
    child("b", mcq({ t: 3, d: 2, c: "understanding", stem: "What holds the adult's stanzas of *Amanda!* together, according to the commentary?", opts: ["the repetition of the girl's name", "a strict count of syllables", "the names of places", "a single long simile"], sol: "The name is repeated throughout the adult's stanzas." })),
    child("c", mcq({ t: 3, d: 2, c: "understanding", stem: "What gives Amanda's stanzas a smooth, dreamy music?", opts: ["each keeps a single rhyme sound", "they use many questions", "they have no verbs", "they are written in capital letters"], sol: "One rhyme sound runs through each bracketed stanza." })),
    child("d", short({ t: 3, d: 4, c: "analysis", marks: 1, stem: "How does the shape of *Amanda!* on the page show its conflict?", model: "Pressure and noise fill the adult's stanzas, while calm and freedom fill the bracketed ones.", sol: "Outside vs inside the brackets.", scheme: [["Contrast between the two kinds of stanza", 1]] })),
    child("e", mcq({ t: 4, d: 3, c: "analysis", stem: "Whose side does the commentary suggest *Amanda!* is on?", opts: ["Amanda's", "the adult's", "neither, it is purely comic", "the teacher's"], sol: "The calm bracketed stanzas win the reader's sympathy." })),
  ],
  sol: "For form questions, name the feature and say what it shows about the conflict.",
}));
Q("src_speaker", source({
  t: [2, 4], d: 3, c: "evaluation", origin: "soyl-commentary",
  stem: SRC_STEM,
  passage: "It would be easy to call the adult in the poem a villain, but that misses something. Every instruction she gives comes from ordinary parental worry: about manners, health, tidiness and schoolwork. Her problem is not a lack of care but a lack of listening. She never asks how Amanda feels, and she never waits for a reply. Some readers also notice that Amanda is not wholly innocent; she does drift away and does not answer. The poem invites us to understand both of them, while making it clear that a child needs space to grow.",
  parts: [
    child("a", mcq({ t: 2, d: 2, c: "understanding", stem: "According to the commentary, the adult's instructions in *Amanda!* come from…", opts: ["ordinary parental worry", "a wish to hurt Amanda", "jealousy of Amanda", "a strict school rule"], sol: "She worries about manners, health, tidiness and schoolwork." })),
    child("b", fb({ t: 2, d: 2, c: "understanding", stem: "The commentary says the adult's problem is not a lack of care but a lack of ___.", acc: [["listening"]], sol: "She does not **listen**: a lack of **listening**." })),
    child("c", mcq({ t: 2, d: 3, c: "analysis", stem: "What does the adult in *Amanda!* never do, according to the commentary?", opts: ["ask how Amanda feels", "give an instruction", "mention schoolwork", "use Amanda's name"], sol: "She never asks about Amanda's feelings or waits for a reply." })),
    child("d", short({ t: 2, d: 4, c: "evaluation", marks: 1, stem: "Why does the commentary say calling the adult in *Amanda!* a villain misses something?", model: "Her instructions come from real care and worry; her fault is that she does not listen.", sol: "Care is present; listening is missing.", scheme: [["Care is real; the fault is not listening", 1]] })),
    child("e", mcq({ t: 4, d: 3, c: "evaluation", stem: "What does the commentary say the poem makes clear in the end?", opts: ["A child needs space to grow.", "Children should never be corrected.", "Parents are always right.", "Daydreaming is dangerous."], sol: "Understanding both, the poem still asks for space for the child." })),
  ],
  sol: "Character questions: give a balanced view with evidence in your own words.",
}));

// ================================================================ short answers, 3 marks (40–50 words)
const SA3 = { marks: 3, wl: [40, 50], scheme: SCHEME3, time: 240 };
Q("sa_complaints", short({
  ...SA3, t: 1, d: 2, c: "understanding",
  stem: "What kinds of things is Amanda corrected for in *Amanda!*? Answer in 40–50 words.",
  model: "Amanda is corrected for small habits such as nail-biting and poor posture, and reminded about homework, her untidy room and dirty shoes. She is warned off chocolate because of her skin, told to look at the speaker, and finally scolded for sulking and being moody.",
  sol: "Group the complaints: habits, chores, health and manners, moods.",
}));
Q("sa_mermaid", short({
  ...SA3, t: [1, 3], d: 3, c: "analysis",
  stem: "Why does Amanda imagine herself as a mermaid in *Amanda!*? Answer in 40–50 words.",
  model: "As a mermaid, Amanda floats alone in a calm green sea where nobody can reach her. There are no orders, no chores and no criticism. The daydream shows her longing for peace and solitude, a quiet escape from the endless instructions she hears at home.",
  sol: "What she imagines + what it frees her from + what it shows.",
}));
Q("sa_orphan", short({
  ...SA3, t: 2, d: 3, c: "analysis",
  stem: "Amanda wishes she were an orphan. What does this wish tell us about her in *Amanda!*? Answer in 40–50 words.",
  model: "The wish shows how trapped Amanda feels. She does not think about the hardships an orphan faces; she thinks only of having nobody to correct her. Wandering barefoot in quiet streets stands for freedom. Her wish reveals how deeply the constant nagging has hurt her.",
  sol: "Her feeling + what she ignores + what she values + what it reveals.",
}));
Q("sa_rapunzel", short({
  ...SA3, t: 3, d: 3, c: "analysis",
  stem: "Explain the Rapunzel allusion in *Amanda!*. Answer in 40–50 words.",
  model: "In the fairy tale, Rapunzel is locked inside a tower and people climb up by her hair. Amanda imagines enjoying that lonely tower and never lowering her hair. The tower becomes her refuge, and refusing to let her hair down means keeping everyone out of her world.",
  sol: "The original story + Amanda's reversal + what it means.",
}));
Q("sa_brackets", short({
  ...SA3, t: 3, d: 3, c: "analysis",
  stem: "Why are some stanzas of *Amanda!* placed in brackets? Answer in 40–50 words.",
  model: "The bracketed stanzas hold Amanda's private thoughts and daydreams, which the adult never hears. The brackets separate her inner world from the nagging outside. They show that she is not listening to the orders at all; in her mind she has already escaped elsewhere.",
  sol: "What the brackets contain + what they separate + what they show.",
}));
Q("sa_irony", short({
  ...SA3, t: [2, 3], d: 4, c: "evaluation",
  stem: "Comment on the irony at the end of *Amanda!*. Answer in 40–50 words.",
  model: "After a whole poem of nagging, the adult complains that Amanda is sulking and protests that nobody should think she nags. That protest is itself more nagging. The irony shows that the adult cannot see her own behaviour, and that Amanda's sulking is caused by it.",
  sol: "The final remark + why it is ironic + what it reveals.",
}));
Q("sa_amanda", short({
  ...SA3, t: 2, d: 3, c: "analysis",
  stem: "What kind of girl is Amanda, as the speaker of *Amanda!* presents her and as her daydreams reveal her? Answer in 40–50 words.",
  model: "The adult sees Amanda as careless, untidy and moody. Her daydreams show a different girl: imaginative, sensitive and hungry for freedom. She does not argue back but withdraws into fantasy. She seems young, probably near her teens, and tired of being corrected all the time.",
  sol: "The adult's view + the view from her daydreams + her response.",
}));
Q("sa_adult", short({
  ...SA3, t: 2, d: 3, c: "evaluation",
  stem: "Is the adult in *Amanda!* simply unkind? Give your view in 40–50 words.",
  model: "Not simply. Her instructions show genuine concern for Amanda's health, manners and studies. Her mistake lies in the method: she corrects without pause, never asks how the girl feels and never listens. Care expressed only through criticism pushes Amanda away instead of helping her.",
  sol: "A clear view + evidence of care + the real fault.",
}));
Q("sa_title", short({
  ...SA3, t: [2, 3], d: 3, c: "evaluation",
  stem: "Comment on the title *Amanda!*, including its exclamation mark. Answer in 40–50 words.",
  model: "The title is just the girl's name with an exclamation mark, exactly as the adult keeps calling it. It captures the sharp, repeated scolding that fills the poem. It also places Amanda at the centre, reminding us that the poem is really about her feelings.",
  sol: "What the title is + how it echoes the nagging + its focus.",
}));
Q("sa_devices", short({
  ...SA3, t: 3, d: 3, c: "analysis",
  stem: "Name two poetic devices used in *Amanda!* and explain their effect. Answer in 40–50 words.",
  model: "Repetition of the girl's name in the adult's stanzas makes the scolding sound relentless and sharp. Allusion to Rapunzel lets Amanda's dream borrow a familiar tale and turn a tower into a refuge. Together they set the pressure of home against her longing to escape.",
  sol: "Two devices named + where they occur (described) + the effect of each.",
}));
Q("sa_apply", short({
  ...SA3, t: 2, d: 3, c: "application",
  stem: "Describe a situation from school or home today that resembles Amanda's in *Amanda!*. Answer in 40–50 words.",
  model: "A student returns from school and is immediately questioned about marks, screen time, her room and her friends, without being asked how her day went. She answers in single words and puts on headphones. Like Amanda, she escapes inward because nobody stops to listen to her.",
  sol: "A suitable situation + the constant correction + the child's withdrawal.",
}));
Q("sa_tone", short({
  ...SA3, t: 3, d: 3, c: "analysis",
  stem: "How do the two tones of *Amanda!* differ? Answer in 40–50 words.",
  model: "The adult's stanzas are impatient, scolding and sharp, full of orders and complaints. Amanda's bracketed stanzas are calm, dreamy and wistful, full of quiet images of sea, dusty streets and a tower. The clash between these tones expresses the gap between the adult and the child.",
  sol: "The adult's tone + Amanda's tone + what the contrast shows.",
}));

// ================================================================ short answers, 2 marks (30–40 words)
const SA2 = { marks: 2, wl: [30, 40], scheme: SCHEME2, time: 150 };
Q("sb_poet", short({
  ...SA2, t: 1, d: 1, c: "recall",
  stem: "Who wrote *Amanda!*? Mention two facts about the poet in 30–40 words.",
  model: "The poem was written by Robin Klein, an Australian writer born in 1936. She is known mainly for books for children and young people, and her best-known novel is Hating Alison Ashley.",
  sol: "Name + any two facts (Australian; born 1936; children's and young-adult writer; Hating Alison Ashley).",
}));
Q("sb_acne", short({
  ...SA2, t: [4, 1], d: 2, c: "understanding",
  stem: "Why is Amanda told to avoid chocolate in *Amanda!*, and what does this suggest about her age? Answer in 30–40 words.",
  model: "She is warned off chocolate because of her acne, the pimples common at puberty. This suggests that Amanda is around eleven to thirteen, just entering her teens, an age when children badly want independence.",
  sol: "The reason (her skin) + what it suggests about her age.",
}));
Q("sb_sulking", short({
  ...SA2, t: [4, 2], d: 2, c: "understanding",
  stem: "What does the word *sulking* mean, and why is Amanda sulking in *Amanda!*? Answer in 30–40 words.",
  model: "Sulking means staying silent and bad-tempered to show displeasure. Amanda sulks because she has been criticised constantly and never listened to, so withdrawing into silence is her only form of protest.",
  sol: "Meaning + the cause in the poem.",
}));
Q("sb_orphan_why", short({
  ...SA2, t: 1, d: 2, c: "understanding",
  stem: "In *Amanda!*, what appeals to Amanda about life as an orphan? Answer in 30–40 words.",
  model: "She imagines walking barefoot through quiet, dusty streets with nobody to give her orders. What appeals to her is the quiet and the liberty, not the hardship a real orphan would face.",
  sol: "The picture + the appeal (quiet, liberty).",
}));
Q("sb_rapunzel_who", short({
  ...SA2, t: 3, d: 2, c: "understanding",
  stem: "Who was Rapunzel, and why does Amanda think of her in *Amanda!*? Answer in 30–40 words.",
  model: "Rapunzel is a fairy-tale girl kept in a high tower, reached only by climbing her long hair. Amanda thinks of her because a tower nobody can enter would give her the peace she longs for.",
  sol: "Who Rapunzel is + why the tower appeals to Amanda.",
}));
Q("sb_message", short({
  ...SA2, t: 2, d: 2, c: "understanding",
  stem: "State the central message of *Amanda!* in 30–40 words.",
  model: "Children need freedom, space and understanding. Constant nagging, however well meant, does not improve a child; it makes her withdraw into silence and fantasy. Adults should listen as well as instruct.",
  sol: "The main idea + the effect of nagging + what adults should do.",
}));

// ================================================================ long answers, 6 marks (100–120 words)
const LA = { marks: 6, wl: [100, 120], scheme: LONG_SCHEME, time: 720 };
Q("la_freedom", long({
  ...LA, t: 2, d: 3, c: "analysis",
  stem: "How does *Amanda!* show a child's longing for freedom? Answer in 100–120 words.",
  model: "Amanda! sets a stream of adult instructions against a child's private dreams. The adult corrects Amanda about her habits, her chores, her diet and her moods, and never waits for an answer. Amanda escapes in her mind. She becomes a mermaid alone in a calm green sea, an orphan wandering barefoot with nobody to command her, and a girl alone at the top of a tower who would never let anyone climb up. Each daydream is about being alone and unordered. The brackets around them show that this world is hers alone. Even her silence at the end is a form of freedom. The poem suggests that a child who is never given space will create it in her imagination.",
  sol: "The nagging → each daydream and what it gives her → the brackets → the silence → the conclusion. Do not quote the poem.",
}));
Q("la_diary", long({
  ...LA, t: [4, 2], d: 4, c: "application", bloom: "create",
  stem: "Imagine you are Amanda in *Amanda!*. Write a diary entry about a day when you were corrected again and again, in 100–120 words.",
  model: "Tuesday, 9 p.m.\n\nToday I counted: twenty-three corrections before dinner. My fingers, my back, my room, my shoes, my homework, my face. Every sentence ended with my name, as if it were an alarm bell. I tried to listen, I really did, but after a while I just floated away. In my head I was swimming far out in a green sea where nobody could follow. Later I was walking alone down a dusty lane, then sitting at the top of a tower with the door locked. When Mum said I was sulking, I said nothing. What could I say? Nobody ever asks what I think. I wish someone would.",
  sol: "Diary format (first person, date or time). Content fits the poem: repeated corrections, the three daydreams in own words, the sulking, the wish to be heard. No lines quoted.",
}));
Q("la_adult_view", long({
  ...LA, t: 2, d: 4, c: "evaluation",
  stem: "Do you sympathise more with Amanda or with the adult in *Amanda!*? Give a reasoned answer in 100–120 words.",
  model: "I sympathise more with Amanda, though the adult deserves some understanding. Her instructions are not cruel; she wants Amanda to be healthy, tidy, polite and hard-working, as most parents do. Yet she never pauses, never asks a question that expects a real answer, and never notices the girl's feelings. To Amanda, this feels like a wall of criticism, so she retreats into dreams of being a mermaid, an orphan and a girl alone at the top of a tower. When the adult finally complains about sulking and denies nagging, she shows how little she understands. Amanda's faults are small; the adult's failure to listen is larger. Both need patience, but the adult must change first.",
  sol: "A clear view → fair credit to the adult → the failure to listen → Amanda's response → a balanced conclusion.",
}));
Q("la_letter", long({
  ...LA, t: [2, 4], d: 3, c: "application", bloom: "create",
  stem: "Using ideas from *Amanda!*, write a letter to a friend whose younger sister has become silent and moody, suggesting how the family might help her, in 100–120 words.",
  model: "Dear Ishita,\n\nYou said your sister Riya hardly speaks at home now and spends hours in her room. It reminded me of a poem we read, Amanda!, about a girl who is corrected so often that she escapes into daydreams and finally stops answering at all. Perhaps Riya feels the same. Could your parents try listening before advising? Ask about her day and wait for the answer. Choose one or two important rules and let the small things go. Give her some time of her own, too. Silence is often a sign that a child feels unheard, not that she does not care.\n\nTell me how things go.\n\nLove,\nMeher",
  sol: "Informal letter format; the poem's idea in own words; practical advice (listen, fewer rules, private time); a warm close.",
}));
Q("la_two_worlds", long({
  ...LA, t: 3, d: 4, c: "analysis",
  stem: "*Amanda!* moves between two worlds. Discuss how the poet contrasts them through structure, imagery and tone, in 100–120 words.",
  model: "Robin Klein builds Amanda! from two alternating worlds. The real world belongs to the adult: her stanzas are full of commands and questions about habits, chores and moods, held together by the girl's name repeated like a bell. The tone is impatient and sharp. The imagined world belongs to Amanda and sits inside brackets. Its images are slow and spacious: a calm green sea, dusty lanes walked barefoot, a quiet tower. Each bracketed stanza keeps one rhyme sound, giving it a gentle music. The contrast in structure, imagery and tone shows the gap between them. At the end only the adult speaks, but Amanda's silence suggests that her inner world has won.",
  sol: "Structure (alternating stanzas, brackets) → the adult's world → Amanda's world (imagery, rhyme) → tone → the ending.",
}));
Q("la_relevance", long({
  ...LA, t: 2, d: 4, c: "evaluation",
  stem: "Many teenagers today say adults lecture them too much. In the light of *Amanda!*, how should parents guide children? Answer in 100–120 words.",
  model: "Amanda! shows what happens when guidance turns into a stream of criticism. The adult's worries about health, tidiness and studies are reasonable, but she never listens, so the girl withdraws into fantasy and sulky silence. Teenagers today face similar pressure about marks, screens and friends. Parents still need to guide, because children do need boundaries. The difference lies in how. Choosing a few important rules, explaining the reasons, asking for the child's view and praising effort all build trust. A teenager who feels heard is more likely to accept advice. The poem reminds parents that the aim is to raise a confident person, not merely an obedient one.",
  sol: "The poem's lesson → today's version → why guidance is still needed → how to guide well → conclusion.",
}));

// ================================================================ objective items
Q("mc_poet", mcq({ t: 1, d: 1, c: "recall", stem: "Who wrote the poem *Amanda!*?", opts: ["Robin Klein", "John Berryman", "Carolyn Wells", "Robert Frost"], sol: "Robin Klein, an Australian writer. The others wrote other poems in the Class 10 textbook." }));
Q("mc_nationality", mcq({ t: 1, d: 1, c: "recall", stem: "Robin Klein, the poet of *Amanda!*, is from…", opts: ["Australia", "the United States", "Ireland", "Wales"], sol: "Robin Klein is Australian." }));
Q("mc_speaker", mcq({ t: 1, d: 2, c: "understanding", stem: "In *Amanda!*, the stanzas outside the brackets are spoken by…", opts: ["an adult, probably Amanda's mother", "Amanda", "Rapunzel", "a mermaid"], sol: "The commands come from an adult, usually taken to be her mother." }));
Q("mc_brackets", mcq({ t: 3, d: 2, c: "understanding", stem: "What do the bracketed stanzas of *Amanda!* contain?", opts: ["Amanda's daydreams", "the adult's commands", "the poet's notes", "a song Amanda sings aloud"], sol: "They hold Amanda's private, imagined escapes." }));
Q("mc_order", mcq({ t: 1, d: 2, c: "understanding", stem: "In what order do Amanda's daydreams appear in *Amanda!*?", opts: ["mermaid, orphan, Rapunzel", "orphan, mermaid, Rapunzel", "Rapunzel, orphan, mermaid", "mermaid, Rapunzel, orphan"], sol: "Sea first, then the streets, then the tower." }));
Q("mc_orphan", mcq({ t: 2, d: 3, c: "analysis", stem: "Why does Amanda in *Amanda!* imagine being an orphan?", opts: ["An orphan would have no one to order her about.", "She wants to live in a big city.", "She dislikes wearing shoes.", "She has read about orphans at school."], sol: "To her, being an orphan means freedom from instructions." }));
Q("mc_rapunzel", mcq({ t: 3, d: 2, c: "understanding", stem: "Rapunzel, mentioned in *Amanda!*, is a character from…", opts: ["a fairy tale", "a history book", "a newspaper", "a Shakespeare play"], sol: "Rapunzel is a fairy-tale girl kept inside a tower." }));
Q("mc_irony", mcq({ t: 3, d: 3, c: "analysis", stem: "Which best describes the ending of *Amanda!*?", opts: ["ironic, because the adult denies nagging while nagging", "joyful, because Amanda is set free", "tragic, because Amanda runs away", "neutral, because nothing changes in tone"], sol: "The final denial is itself more nagging." }));
Q("mc_theme", mcq({ t: 2, d: 2, c: "understanding", stem: "Which is the central theme of *Amanda!*?", opts: ["a child's need for freedom and understanding", "the beauty of the sea", "the dangers of chocolate", "the history of fairy tales"], sol: "Constant correction drives a child to long for freedom." }));
Q("mc_apply", mcq({ t: 2, d: 3, c: "application", stem: "Which SOYL-written situation is closest to Amanda's in *Amanda!*?", opts: ["Kabir is told off about his hair, his marks and his phone before he can say hello, and he stares out of the window.", "Kabir's coach explains a new tactic and asks for his ideas.", "Kabir's mother asks him what he would like for dinner.", "Kabir wins a painting competition at school."], sol: "Non-stop correction and a silent, distant child mirror the poem." }));
Q("mc_name", mcq({ t: 3, d: 3, c: "analysis", stem: "What is the effect of repeating the girl's name in *Amanda!*?", opts: ["It makes the scolding sound relentless.", "It shows the adult has forgotten the name.", "It makes the poem rhyme throughout.", "It shows that Amanda is very popular."], sol: "The repeated name sounds like a constant call to order." }));
Q("mc_tone_dream", mcq({ t: 3, d: 2, c: "understanding", stem: "What is the tone of Amanda's bracketed stanzas in *Amanda!*?", opts: ["dreamy and calm", "angry and harsh", "comic and silly", "fearful and tense"], sol: "Her imagined worlds are peaceful and wistful." }));
Q("mc_mermaid_alone", mcq({ t: 2, d: 3, c: "analysis", stem: "What do all three of Amanda's daydreams in *Amanda!* have in common?", opts: ["In each she is alone and free of orders.", "In each she is rich and famous.", "In each she is with her friends.", "In each she is frightened."], sol: "Solitude and freedom link the mermaid, the orphan and the tower." }));
Q("mc_withdraw", mcq({ t: 2, d: 3, c: "analysis", stem: "How does Amanda in *Amanda!* respond to the nagging?", fixed: true, key: "c", opts: ["She argues loudly.", "She obeys every instruction at once.", "She withdraws into daydreams and silence.", "She runs away from home."], sol: "She escapes inwardly and finally falls silent." }));

Q("fb_brackets", fb({ t: 3, d: 1, c: "recall", marks: 1, stem: "In *Amanda!*, the girl's ___ appear inside ___.", acc: [["daydreams", "dreams", "thoughts"], ["brackets", "parentheses"]], sol: "Her **daydreams** appear inside **brackets** (parentheses).", scheme: [["daydreams", 0.5], ["brackets", 0.5]] }));
Q("fb_allusion", fb({ t: 3, d: 2, c: "understanding", stem: "A reference to a well-known story, such as Amanda's mention of Rapunzel in *Amanda!*, is called an ___.", acc: [["allusion"]], sol: "It is an **allusion**." }));
Q("fb_poet", fb({ t: 1, d: 1, c: "recall", stem: "*Amanda!* was written by the Australian writer Robin ___.", acc: [["Klein"]], sol: "The poet is Robin **Klein**." }));
Q("fb_sulk", fb({ t: 4, d: 2, c: "understanding", stem: "Staying silent and bad-tempered to show displeasure, as Amanda does in *Amanda!*, is called ___.", acc: [["sulking"]], sol: "That is **sulking**." }));

Q("ar_daydream", ar({ t: [1, 2], d: 3, c: "analysis", a: "Amanda in *Amanda!* imagines herself as a mermaid alone in the sea.", r: "Amanda longs for a place where no one can give her orders.", key: "a", sol: "Both are true, and R explains A: the lonely sea is attractive because it is free of orders." }));
Q("ar_adult", ar({ t: 2, d: 3, c: "analysis", a: "The adult in *Amanda!* corrects Amanda many times.", r: "The adult in *Amanda!* never waits for Amanda to reply.", key: "b", sol: "Both are true, but R does not explain why she corrects so often; it describes how she speaks." }));
Q("ar_ending", ar({ t: 3, d: 2, c: "understanding", a: "The last stanza of *Amanda!* is followed by a bracketed daydream.", r: "In the last stanza of *Amanda!*, Amanda is scolded for sulking.", key: "d", sol: "A is false: no bracketed stanza follows the last one. R is true." }));
Q("ar_orphan", ar({ t: 2, d: 3, c: "analysis", a: "Amanda's wish to be an orphan in *Amanda!* shows how trapped she feels.", r: "Amanda in *Amanda!* wants to experience hardship and hunger.", key: "c", sol: "A is true. R is false: she thinks only of freedom, not hardship." }));

Q("tf_mother", tf({ t: 1, d: 1, c: "recall", stem: "True or false: in *Amanda!*, Amanda answers back loudly to every command.", ans: false, sol: "She never answers aloud; she escapes into daydreams and silence." }));
Q("tf_brackets", tf({ t: 3, d: 1, c: "recall", stem: "True or false: in *Amanda!*, Amanda's daydreams appear in brackets.", ans: true, sol: "The bracketed stanzas hold her imagined worlds." }));
Q("tf_rapunzel", tf({ t: 3, d: 2, c: "understanding", stem: "True or false: in *Amanda!*, Amanda sees Rapunzel's tower as a prison she wants to escape.", ans: false, sol: "She sees it as a peaceful refuge." }));
Q("tf_irony", tf({ t: 2, d: 3, c: "analysis", stem: "True or false: the adult's last remark in *Amanda!* shows that she understands her own behaviour.", ans: false, sol: "Denying that she nags shows she does not see what she is doing." }));

Q("ord_stanzas", ord({
  t: [1, 3], d: 2, c: "understanding", marks: 2,
  stem: "Arrange these stages of *Amanda!* in order (SOYL summary).",
  items: ["Corrections about nail-biting and posture.", "Amanda pictures herself as a mermaid.", "Reminders about homework, her room and her shoes.", "Amanda pictures herself as an orphan.", "Warnings about chocolate and her skin.", "Amanda pictures herself in Rapunzel's tower.", "Complaints about sulking, and a denial of nagging."],
  sol: "Nagging and daydreams alternate, and the nagging has the last word.",
}));
Q("ord_answer", ord({
  t: 4, d: 2, c: "application", marks: 2,
  stem: "Arrange the steps for answering a 40–50 word question on Amanda's daydreams in *Amanda!*.",
  items: ["Underline what the question asks about the daydreams.", "Name the daydream in a short opening sentence.", "Describe it in your own words.", "Link it to the nagging that comes before it.", "Count the words and remove anything copied from the poem."],
  sol: "Question → point → description → link → check.",
}));

Q("mt_words", match({
  t: 4, d: 2, c: "understanding", marks: 2,
  stem: "Match each word from *Amanda!* with its meaning.",
  pairs: [["hunch", "bend the shoulders forward"], ["languid", "slow and relaxed"], ["tranquil", "calm and peaceful"], ["sulking", "silently showing displeasure"]],
  sol: "Single words from the poem with their meanings.",
}));
Q("mt_dreams", match({
  t: 3, d: 3, c: "analysis", marks: 2,
  stem: "Match each daydream in *Amanda!* with the freedom it gives her.",
  pairs: [["the mermaid", "solitude in a calm sea"], ["the orphan", "no one to give orders"], ["Rapunzel's tower", "a private world no one can enter"], ["her final silence", "a refusal to take part"]],
  sol: "Each escape answers the pressure in its own way.",
}));
Q("mt_devices", match({
  t: 3, d: 3, c: "analysis", marks: 2,
  stem: "Match each feature of *Amanda!* with the correct term.",
  pairs: [["the girl's name repeated again and again", "repetition"], ["the mention of Rapunzel", "allusion"], ["the adult denying that she nags", "irony"], ["the sea, the dusty streets and the tower", "imagery"]],
  sol: "Name each device by what it does in the poem.",
}));
