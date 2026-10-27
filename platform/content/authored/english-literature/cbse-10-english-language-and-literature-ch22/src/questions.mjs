// CBSE 10 English Language and Literature, ch22 "For Anne Gregory" (W. B. Yeats) — question bank.
// LITERATURE RULE (CONTEXT §8): no line or phrase of the poem is reproduced; only the title and single words
// (ramparts, despair, yesternight, declare, text, carrot) appear. The three stanzas are described by what each
// speaker argues, never paraphrased line by line; the refrain and the hair metaphor are described, not quoted;
// the poem's words for the admirers and for the hair colour are always replaced ("suitors", "golden hair").
// Passages are SOYL commentary (passage_origin: soyl-commentary). build.mjs runs a short forbidden-phrase guard.
import { Q, mcq, fb, short, long, tf, ar, match, ord, source, child } from "../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs";

const NOTE = "*(This passage is SOYL's commentary on the poem, not lines from it. Read the poem itself in your textbook, First Flight.)*";
const SRC_STEM = `Read the commentary on Yeats's *For Anne Gregory* and answer the questions that follow. ${NOTE}`;
const SCHEME3 = [["Relevant point about the poem", 1], ["Explanation or interpretation linked to the question", 1], ["Expression and accuracy within 40–50 words", 1]];
const SCHEME2 = [["Correct point about the poem", 1], ["Explanation in own words within 30–40 words", 1]];
const LONG_SCHEME = [["Content: accurate points about the poem", 3], ["Interpretation / extrapolation: a clear, supported view", 1], ["Organisation and expression; within 100–120 words", 2]];

// ================================================================ extract-based (SOYL commentary)
Q("src_warning", source({
  t: [1, 2], d: 2, c: "understanding", origin: "soyl-commentary",
  stem: SRC_STEM,
  passage: "The poem opens with an older speaker addressing a young woman, Anne Gregory. He tells her, half teasing and half serious, that the suitors who fall hopelessly for her will never love her purely for herself. What draws them is her beautiful golden hair, which he pictures as honey-toned walls of a fortress around her ears. The image is affectionate but also a warning. Her beauty is so striking that it stands in front of her, like a defence, and admirers may never get past it to the person inside.",
  parts: [
    child("a", mcq({ t: 1, d: 1, c: "recall", stem: "Whom does the speaker address in Yeats's *For Anne Gregory*?", opts: ["a young woman, Anne Gregory", "his own son", "a group of soldiers", "an elderly churchman"], sol: "He speaks to Anne Gregory." })),
    child("b", mcq({ t: 1, d: 2, c: "understanding", stem: "According to the speaker of *For Anne Gregory*, what draws suitors to Anne?", opts: ["her beautiful golden hair", "her wealth", "her singing", "her family name"], sol: "Her hair attracts them." })),
    child("c", fb({ t: 3, d: 2, c: "understanding", stem: "The commentary says the speaker pictures Anne's hair as the walls of a ___ around her ears.", acc: [["fortress", "castle"]], sol: "Her hair is like the walls of a **fortress**." })),
    child("d", short({ t: 3, d: 3, c: "analysis", marks: 1, stem: "Why is the fortress image in *For Anne Gregory* also a warning, according to the commentary?", model: "Her beauty stands in front of her like a defence, so admirers may never reach the person inside.", sol: "Beauty blocks the view of the real self.", scheme: [["Beauty hides the real person", 1]] })),
    child("e", mcq({ t: 3, d: 2, c: "understanding", stem: "How does the commentary describe the older speaker's tone at the start of *For Anne Gregory*?", opts: ["half teasing and half serious", "angry and bitter", "frightened", "completely solemn"], sol: "He is both playful and earnest." })),
  ],
  sol: "Answer from the commentary; parts (a) and (b) also follow from your reading of the poem.",
}));
Q("src_reply", source({
  t: [1, 2], d: 3, c: "analysis", origin: "soyl-commentary",
  stem: SRC_STEM,
  passage: "Anne answers with youthful confidence. If her hair is the problem, she says, she can simply dye it another shade, perhaps brown, black or a bright orange-red, so that the suitors who fall for her will have to value her for who she is. Her reply is practical and a little playful. It shows that she believes outward beauty can be removed like a coat, leaving the true self behind. She has not yet considered that people may then be attracted by some other surface quality instead of her character.",
  parts: [
    child("a", mcq({ t: 1, d: 1, c: "recall", stem: "In *For Anne Gregory*, what does Anne say she can do to her hair?", opts: ["dye it another colour", "cut it all off", "hide it under a hat", "let it grow longer"], sol: "She can change its colour with dye." })),
    child("b", mcq({ t: 2, d: 2, c: "understanding", stem: "Which word best describes Anne's reply in Yeats's poem, according to the commentary?", opts: ["practical", "tearful", "furious", "fearful"], sol: "Her solution is practical and a little playful." })),
    child("c", fb({ t: 4, d: 2, c: "understanding", stem: "Anne mentions a bright orange-red shade, named after a vegetable: ___.", acc: [["carrot"]], sol: "She mentions **carrot**." })),
    child("d", short({ t: 2, d: 4, c: "evaluation", marks: 1, stem: "What has Anne not yet considered, according to the commentary on *For Anne Gregory*?", model: "That suitors may then be drawn by some other surface quality rather than her character.", sol: "Another surface quality could take the hair's place.", scheme: [["Another outward feature may attract instead", 1]] })),
    child("e", mcq({ t: 2, d: 3, c: "analysis", stem: "What does Anne believe about outward beauty in *For Anne Gregory*, according to the commentary?", opts: ["It can be removed, leaving the true self.", "It is the most important thing.", "It never fades.", "It is a gift from God."], sol: "She treats beauty as something removable, like a coat." })),
  ],
  sol: "Explain Anne's solution and its limits.",
}));
Q("src_god", source({
  t: [1, 2], d: 4, c: "evaluation", origin: "soyl-commentary",
  stem: SRC_STEM,
  passage: "The older speaker has the last word. He tells Anne that just the night before he heard an elderly, devout man announce that he had found a passage of scripture proving something important: that God alone could love a person purely for herself, and not for her golden hair. The final stanza lifts the conversation from vanity to philosophy. Human love, the speaker suggests, is always partly drawn by appearance. Only divine love is completely unconditional, seeing the soul and ignoring the surface.",
  parts: [
    child("a", mcq({ t: 1, d: 2, c: "understanding", stem: "In the last stanza of *For Anne Gregory*, whom has the speaker heard the night before?", opts: ["an elderly, devout man", "a famous poet", "Anne's mother", "a young suitor"], sol: "He heard an elderly, devout man speak." })),
    child("b", mcq({ t: 2, d: 3, c: "analysis", stem: "According to the commentary, who alone can love a person for herself in Yeats's poem?", opts: ["God", "a parent", "a close friend", "a poet"], sol: "Only divine love is unconditional." })),
    child("c", fb({ t: 4, d: 2, c: "understanding", stem: "The devout man claims to have found a passage of ___ that proves his point.", acc: [["scripture"]], sol: "He found a passage of **scripture** (a text)." })),
    child("d", short({ t: 2, d: 4, c: "evaluation", marks: 1, stem: "What does the final stanza of *For Anne Gregory* suggest about human love, according to the commentary?", model: "Human love is always partly drawn by appearance; only divine love sees the soul alone.", sol: "Human love is partly physical.", scheme: [["Human love always involves appearance", 1]] })),
    child("e", mcq({ t: 3, d: 3, c: "analysis", stem: "How does the final stanza of *For Anne Gregory* change the conversation?", opts: ["It lifts it from vanity to philosophy.", "It turns it into an argument.", "It makes it a joke.", "It ends it without an answer."], sol: "The talk rises to a spiritual level." })),
  ],
  sol: "Explain the final argument and what it implies about love.",
}));
Q("src_dialogue", source({
  t: [3, 4], d: 3, c: "analysis", origin: "soyl-commentary",
  stem: SRC_STEM,
  passage: "The poem is a short conversation in three stanzas of six lines each. The older speaker talks in the first and third stanzas; Anne answers in the second. Each stanza ends with almost the same idea, repeated with small changes: being loved for one's true self rather than for one's hair. This near-repetition works like a refrain, drawing the reader back to the central question every time. The rhyme falls on the second, fourth and sixth lines, which gives the dialogue a gentle, song-like music.",
  parts: [
    child("a", fb({ t: 3, d: 1, c: "recall", stem: "*For Anne Gregory* has three stanzas of ___ lines each.", acc: [["six", "6"]], sol: "Each stanza has **six** lines." })),
    child("b", mcq({ t: 1, d: 1, c: "recall", stem: "Who speaks the second stanza of *For Anne Gregory*?", opts: ["Anne", "the older speaker", "the devout man", "God"], sol: "Anne replies in the middle stanza." })),
    child("c", mcq({ t: 3, d: 2, c: "understanding", stem: "An idea or line repeated at the end of each stanza, as in Yeats's poem, is called a…", opts: ["refrain", "simile", "pun", "prologue"], sol: "A repeated ending is a refrain." })),
    child("d", short({ t: 3, d: 4, c: "analysis", marks: 1, stem: "What is the effect of the near-repetition at the end of each stanza of *For Anne Gregory*?", model: "It keeps bringing the reader back to the central question of true-self love versus outward beauty.", sol: "Focus on the central idea.", scheme: [["Returns to the central question", 1]] })),
    child("e", mcq({ t: 3, d: 2, c: "understanding", stem: "Which lines of each stanza of *For Anne Gregory* rhyme, according to the commentary?", opts: ["the second, fourth and sixth", "the first and second only", "all six", "none"], sol: "Lines 2, 4 and 6 rhyme." })),
  ],
  sol: "For form questions, name the form, describe the pattern and link it to the meaning.",
}));
Q("src_metaphor", source({
  t: [3, 2], d: 3, c: "analysis", origin: "soyl-commentary",
  stem: SRC_STEM,
  passage: "The most striking image in the poem is the speaker's description of Anne's hair as the walls of a fortress, coloured like honey. It is a metaphor, since he does not say that the hair is like walls; he simply calls it walls. The honey colour suggests sweetness and richness, while the fortress suggests protection and a barrier. Together they hint at the poem's whole argument. Her beauty is lovely to look at, but it also stands guard around her, so that suitors see the defences rather than the person they protect.",
  parts: [
    child("a", mcq({ t: 3, d: 2, c: "understanding", stem: "Calling Anne's hair the walls of a fortress in *For Anne Gregory* is an example of…", opts: ["metaphor", "simile", "onomatopoeia", "alliteration"], sol: "It is a direct comparison without like: a metaphor." })),
    child("b", mcq({ t: 3, d: 2, c: "understanding", stem: "What does the honey colour of Anne's hair suggest in Yeats's poem?", opts: ["sweetness and richness", "danger and fear", "age and decay", "anger"], sol: "Honey suggests sweetness and richness." })),
    child("c", fb({ t: 4, d: 2, c: "understanding", stem: "Protective walls built around a fort or castle are called ___.", acc: [["ramparts"]], sol: "They are **ramparts**." })),
    child("d", short({ t: 3, d: 4, c: "analysis", marks: 1, stem: "How does the hair metaphor in *For Anne Gregory* hint at the poem's argument?", model: "Beauty is lovely but also a barrier, so suitors see the defences, not the person.", sol: "Beauty as barrier.", scheme: [["Beauty acts as a barrier to the real self", 1]] })),
    child("e", mcq({ t: 3, d: 3, c: "analysis", stem: "What does the fortress in the metaphor suggest about Anne's beauty in *For Anne Gregory*?", opts: ["It guards her and stands between her and suitors.", "It makes her weak.", "It will soon fall.", "It is invisible."], sol: "It protects her and also blocks the view." })),
  ],
  sol: "Name the device, explain both parts of the image and link it to the theme.",
}));
Q("src_ages", source({
  t: [2, 3], d: 3, c: "evaluation", origin: "soyl-commentary",
  stem: SRC_STEM,
  passage: "Behind the conversation lies a meeting of two generations. Yeats was in his sixties when he wrote the poem; Anne Gregory, the granddaughter of his close friend Lady Gregory, was a young woman. The older speaker has seen how the world works and speaks with gentle irony; the young woman is hopeful and believes problems have simple solutions. Neither is unkind. The poem lets us hear both views and smile at both, though it gives the wiser, sadder truth to age: perfect, unconditional love is not something human beings can easily give.",
  parts: [
    child("a", mcq({ t: 1, d: 2, c: "understanding", stem: "According to the commentary, how was Anne Gregory related to Yeats's friend Lady Gregory?", opts: ["She was her granddaughter.", "She was her sister.", "She was her mother.", "She was her teacher."], sol: "Anne was Lady Gregory's granddaughter." })),
    child("b", mcq({ t: 2, d: 3, c: "analysis", stem: "How does the commentary describe the young woman's outlook in *For Anne Gregory*?", opts: ["hopeful, believing problems have simple solutions", "bitter and tired", "fearful of the future", "uninterested in love"], sol: "She is hopeful and practical." })),
    child("c", fb({ t: 3, d: 2, c: "understanding", stem: "The commentary says the older speaker in Yeats's poem speaks with gentle ___.", acc: [["irony"]], sol: "He speaks with gentle **irony**." })),
    child("d", short({ t: 2, d: 4, c: "evaluation", marks: 1, stem: "Which view does *For Anne Gregory* finally support, according to the commentary?", model: "Age's view: perfect, unconditional love is hard for human beings to give.", sol: "The older speaker's sadder wisdom.", scheme: [["Age's view: unconditional love is beyond most humans", 1]] })),
    child("e", mcq({ t: 1, d: 2, c: "understanding", stem: "How old was Yeats when he wrote *For Anne Gregory*, according to the commentary?", opts: ["in his sixties", "in his teens", "in his twenties", "in his forties"], sol: "He was in his sixties." })),
  ],
  sol: "Compare the two speakers and say which view the poem supports.",
}));
Q("src_poet", source({
  t: [1, 4], d: 2, c: "understanding", origin: "soyl-commentary",
  stem: SRC_STEM,
  passage: "William Butler Yeats (1865–1939) was an Irish poet and dramatist, one of the leading figures of the Irish literary revival. In 1923 he became the first Irish writer to receive the Nobel Prize in Literature. He was a close friend of Lady Augusta Gregory, a playwright with whom he helped found Dublin's Abbey Theatre. This short poem, addressed to her granddaughter, shows a side of Yeats that is playful and tender, yet it still carries his lifelong interest in beauty, time and the soul.",
  parts: [
    child("a", mcq({ t: 1, d: 1, c: "recall", stem: "W. B. Yeats, the poet of *For Anne Gregory*, was from…", opts: ["Ireland", "England", "the United States", "Australia"], sol: "Yeats was Irish." })),
    child("b", mcq({ t: 1, d: 2, c: "understanding", stem: "Which prize did the poet of *For Anne Gregory* receive in 1923?", opts: ["the Nobel Prize in Literature", "the Pulitzer Prize", "the Booker Prize", "the National Book Award"], sol: "He won the Nobel Prize in Literature." })),
    child("c", fb({ t: 1, d: 2, c: "recall", stem: "Yeats helped found Dublin's ___ Theatre with Lady Gregory.", acc: [["Abbey"]], sol: "The **Abbey** Theatre." })),
    child("d", short({ t: 2, d: 3, c: "analysis", marks: 1, stem: "Which lifelong interests of Yeats does *For Anne Gregory* still show, according to the commentary?", model: "His interest in beauty, time and the soul.", sol: "Beauty, time, the soul.", scheme: [["Beauty, time and the soul", 1]] })),
    child("e", mcq({ t: 1, d: 2, c: "understanding", stem: "Which side of Yeats does *For Anne Gregory* show, according to the commentary?", opts: ["playful and tender", "angry and political", "gloomy and despairing", "boastful"], sol: "The poem is playful and tender." })),
  ],
  sol: "Background questions: answer from the commentary.",
}));

// ================================================================ short answers, 3 marks (40–50 words)
const SA3 = { marks: 3, wl: [40, 50], scheme: SCHEME3, time: 240 };
Q("sa_speaker_says", short({
  ...SA3, t: 1, d: 2, c: "understanding",
  stem: "What does the older speaker tell Anne in the first stanza of *For Anne Gregory*? Answer in 40–50 words.",
  model: "He tells Anne that the suitors who fall hopelessly for her will never love her purely for herself. They are captivated by her beautiful golden hair, which he pictures as honey-toned fortress walls around her ears. Her beauty, he suggests, will always come between her and true love.",
  sol: "His claim + the reason (the hair) + the image + the implication.",
}));
Q("sa_anne_reply", short({
  ...SA3, t: 1, d: 2, c: "understanding",
  stem: "How does Anne respond to the speaker in *For Anne Gregory*? Answer in 40–50 words.",
  model: "Anne replies confidently that she can easily dye her hair another colour, such as brown, black or orange-red. Then, she argues, suitors would have to love her for her true self. Her answer is practical and playful, showing a young person's belief that problems have simple solutions.",
  sol: "Her solution + her reasoning + what it shows about her.",
}));
Q("sa_god", short({
  ...SA3, t: 2, d: 4, c: "evaluation",
  stem: "Explain the significance of the last stanza of *For Anne Gregory*. Answer in 40–50 words.",
  model: "The speaker reports that an elderly, devout man claimed to have found scripture proving that God alone can love a person purely for herself. This lifts the debate to a spiritual level: human love always notices appearance, and only divine love is completely unconditional. Anne's practical solution cannot change this.",
  sol: "What is reported + the spiritual meaning + why Anne's answer falls short.",
}));
Q("sa_ramparts", short({
  ...SA3, t: 3, d: 3, c: "analysis",
  stem: "Explain the metaphor used for Anne's hair in *For Anne Gregory*. Answer in 40–50 words.",
  model: "The speaker describes Anne's hair as the honey-coloured walls of a fortress around her ears. Honey suggests sweetness and rich colour; fortress walls suggest protection and a barrier. The metaphor implies that her beauty guards her, standing between suitors and the real person behind it.",
  sol: "The image + what each part suggests + what it implies.",
}));
Q("sa_theme", short({
  ...SA3, t: 2, d: 3, c: "analysis",
  stem: "What does *For Anne Gregory* say about outer beauty and inner worth? Answer in 40–50 words.",
  model: "The poem suggests that people are usually attracted by outer beauty, such as Anne's lovely hair, rather than by inner worth. Even if she changed her appearance, some other surface quality would attract them. Being valued purely for one's soul is rare; the poem says God alone loves that way.",
  sol: "Human attraction + the limit of Anne's plan + the conclusion.",
}));
Q("sa_dialogue", short({
  ...SA3, t: [3, 4], d: 3, c: "analysis",
  stem: "Why is *For Anne Gregory* written as a dialogue? Answer in 40–50 words.",
  model: "The dialogue lets two generations speak: an experienced older man and a hopeful young woman. Each stanza presents a view and an answer, so the debate unfolds naturally. It keeps the poem light and personal while allowing the older speaker to have the final, wiser word.",
  sol: "Who speaks + how the debate unfolds + the effect.",
}));
Q("sa_refrain", short({
  ...SA3, t: 3, d: 3, c: "analysis",
  stem: "Comment on the near-repetition at the end of each stanza of *For Anne Gregory*. Answer in 40–50 words.",
  model: "Each stanza closes with almost the same idea, being loved for one's true self and not one's hair, with small changes of speaker and pronoun. This works like a refrain. It keeps the central question in focus and gives the conversation a musical, song-like quality.",
  sol: "What is repeated + how it changes + the effect.",
}));
Q("sa_anne", short({
  ...SA3, t: 2, d: 3, c: "analysis",
  stem: "What kind of person does Anne seem to be in *For Anne Gregory*? Answer in 40–50 words.",
  model: "Anne seems young, confident and spirited. She does not accept the older speaker's warning meekly; she answers back with a quick, practical plan to change her hair colour. She clearly wants to be valued for her character, though her solution shows youthful innocence about human nature.",
  sol: "Two or three qualities with evidence in own words.",
}));
Q("sa_title", short({
  ...SA3, t: [2, 3], d: 3, c: "evaluation",
  stem: "Is *For Anne Gregory* a suitable title for the poem? Give reasons in 40–50 words.",
  model: "Yes. The title shows that the poem is addressed to a real young woman, almost like a gift or a letter of advice. It makes the conversation personal and affectionate. Yet the lesson, about beauty and true love, reaches beyond Anne to every reader.",
  sol: "A clear view + the personal address + the universal lesson.",
}));
Q("sa_devices", short({
  ...SA3, t: 3, d: 3, c: "analysis",
  stem: "Name two poetic devices used in *For Anne Gregory* and explain their effect. Answer in 40–50 words.",
  model: "A metaphor presents Anne's hair as honey-coloured fortress walls, suggesting that her beauty both attracts and blocks suitors. A refrain-like repetition closes each stanza with the idea of being loved for oneself, not one's hair. Together they keep the poem's question vivid and memorable.",
  sol: "Two devices named + where they occur (described) + the effect of each.",
}));
Q("sa_apply", short({
  ...SA3, t: 2, d: 3, c: "application",
  stem: "Give an example from today's world that reflects the idea of *For Anne Gregory*. Answer in 40–50 words.",
  model: "A singer with a polished image gains millions of followers online. When she posts without filters or make-up to talk about her struggles, many unfollow her. Like Anne, she discovers that much of the admiration was for her appearance rather than for the person she really is.",
  sol: "A suitable example + appearance-based admiration + the link to the poem.",
}));
Q("sa_tone", short({
  ...SA3, t: 3, d: 3, c: "analysis",
  stem: "Describe the tone of *For Anne Gregory*. Answer in 40–50 words.",
  model: "The tone is gentle, affectionate and lightly teasing, as an older friend gives advice to a young woman. Anne's reply adds a confident, playful note. In the final stanza the tone becomes reflective and philosophical, turning a light conversation about hair into a serious thought about love.",
  sol: "The speaker's tone + Anne's tone + how it deepens.",
}));

// ================================================================ short answers, 2 marks (30–40 words)
const SA2 = { marks: 2, wl: [30, 40], scheme: SCHEME2, time: 150 };
Q("sb_poet", short({
  ...SA2, t: 1, d: 1, c: "recall",
  stem: "Who wrote *For Anne Gregory*? Mention two facts about the poet in 30–40 words.",
  model: "W. B. Yeats (1865–1939), the Irish poet and dramatist, wrote it. He received the Nobel Prize in Literature in 1923, and he helped Lady Gregory found the Abbey Theatre in Dublin.",
  sol: "Name + any two facts (Irish; 1865–1939; Nobel Prize 1923; Abbey Theatre; Irish literary revival).",
}));
Q("sb_who_anne", short({
  ...SA2, t: 1, d: 2, c: "understanding",
  stem: "Who was Anne Gregory, and why might Yeats address a poem to her? Answer in 30–40 words.",
  model: "Anne Gregory was the young granddaughter of Lady Gregory, Yeats's close friend and fellow playwright. Knowing the family well, the ageing poet could speak to Anne with affection and teasing wisdom.",
  sol: "Who she was + the reason for the affectionate address.",
}));
Q("sb_dye", short({
  ...SA2, t: 1, d: 2, c: "understanding",
  stem: "Why does Anne in *For Anne Gregory* want to dye her hair? Answer in 30–40 words.",
  model: "She wants suitors to love her for her character, not for her golden hair. By changing its colour to brown, black or orange-red, she hopes to remove the attraction that hides her true self.",
  sol: "Her aim + how dyeing would achieve it.",
}));
Q("sb_why_fails", short({
  ...SA2, t: 2, d: 3, c: "analysis",
  stem: "Why would dyeing her hair not solve Anne's problem, according to *For Anne Gregory*? Answer in 30–40 words.",
  model: "The final stanza suggests that human love is always partly drawn by appearance. A new colour would simply become a new attraction; God alone, the poem says, loves a person purely for herself.",
  sol: "The nature of human love + why a change would not help.",
}));
Q("sb_ramparts", short({
  ...SA2, t: [4, 3], d: 2, c: "understanding",
  stem: "What are *ramparts*, and why is the word used for Anne's hair in Yeats's poem? Answer in 30–40 words.",
  model: "Ramparts are the defensive walls of a fort. The word suggests that Anne's thick, beautiful hair stands around her like a barrier, attracting suitors but keeping them from seeing her true self.",
  sol: "Meaning + why it suits the hair.",
}));
Q("sb_message", short({
  ...SA2, t: 2, d: 2, c: "understanding",
  stem: "State the central message of *For Anne Gregory* in 30–40 words.",
  model: "People are usually drawn by outward beauty rather than inner worth. Being loved purely for one's true self is rare among humans; the poem suggests that God's love alone is entirely unconditional.",
  sol: "The main idea + the role of divine love.",
}));

// ================================================================ long answers, 6 marks (100–120 words)
const LA = { marks: 6, wl: [100, 120], scheme: LONG_SCHEME, time: 720 };
Q("la_beauty", long({
  ...LA, t: 2, d: 3, c: "analysis",
  stem: "How does *For Anne Gregory* explore the contrast between outer beauty and inner worth? Answer in 100–120 words.",
  model: "For Anne Gregory is built around one question: can a beautiful person be loved for herself? The older speaker begins by warning Anne that suitors who fall for her will be captivated by her golden hair, which he calls the honey-coloured walls of a fortress. Her beauty both attracts and blocks them. Anne answers that she can dye her hair, so that admirers would have to value her character. The speaker then reports a devout man's claim that God alone can love a person purely for herself. The poem suggests that outer beauty always shapes human love, while pure appreciation of inner worth belongs to the divine. Anne's hope is admirable, but the poem quietly doubts it.",
  sol: "The question → the warning and metaphor → Anne's reply → the final stanza → the conclusion. Do not quote the poem.",
}));
Q("la_anne_diary", long({
  ...LA, t: [4, 2], d: 4, c: "application", bloom: "create",
  stem: "Imagine you are Anne in *For Anne Gregory*. Write a diary entry after your conversation with the old poet, in 100–120 words.",
  model: "Coole, evening\n\nMr Yeats was in one of his teasing moods today. He told me, quite seriously, that no admirer would ever value me for myself, because they would all be dazzled by my hair. He even called it the walls of a fortress! I laughed and said I would simply dye it dark brown, jet black or even carrot-orange, and then we would see. He smiled and said an old churchman had found proof that God alone could love someone purely for herself. I pretended to be cross, but I keep thinking about it. Do people really see me, or only my hair? I hope that one day someone will prove him wrong.",
  sol: "Diary format (place or time, first person). Content fits the poem: the warning about her hair, the fortress image, her plan to dye it, the final claim about God, her reflection. No lines quoted.",
}));
Q("la_agree", long({
  ...LA, t: 2, d: 4, c: "evaluation",
  stem: "Do you agree with the older speaker of *For Anne Gregory* that God alone can love a person purely for herself? Give a reasoned answer in 100–120 words.",
  model: "I partly agree with the older speaker. In For Anne Gregory, he argues that human love is always drawn by appearance, and much experience supports him. First impressions depend on looks, and admirers often fade when beauty does. However, I think he is too pessimistic. Many people come to love others deeply for their kindness, humour and loyalty, long after appearance stops mattering. Parents love children whatever they look like, and lifelong friends see beyond the surface. Perhaps the poem's real point is that perfectly unconditional love, which never notices appearance at all, is beyond human beings. In that sense the speaker is right. But human love can grow towards it, even if it starts with a face.",
  sol: "A clear view → support for the speaker → counter-evidence → a refined position → conclusion.",
}));
Q("la_letter", long({
  ...LA, t: [2, 4], d: 3, c: "application", bloom: "create",
  stem: "Using ideas from *For Anne Gregory*, write a letter to a friend who is upset that people only notice her looks, in 100–120 words.",
  model: "Dear Naina,\n\nYou wrote that people at your new school only talk about your looks, and that nobody seems interested in what you think. That reminded me of a poem we studied, For Anne Gregory by Yeats. An old poet tells a young woman that admirers will love her beautiful hair, not her. She says she will simply dye it! He replies that God alone loves anyone purely for themselves. I think the poem is partly right, but you can still help people see the real you. Join the debate club, share your writing, be your funny self. The friends who stay for those things are the ones worth keeping.\n\nWith love,\nAditi",
  sol: "Informal letter format; sympathy; the poem's idea in own words; practical advice; a warm close.",
}));
Q("la_devices", long({
  ...LA, t: 3, d: 4, c: "analysis",
  stem: "Discuss how form and poetic devices help Yeats convey his ideas in *For Anne Gregory*. Answer in 100–120 words.",
  model: "Yeats shapes For Anne Gregory as a dialogue in three six-line stanzas. The older speaker talks in the first and third, Anne in the second, so a debate between age and youth unfolds naturally, with the older voice having the final word. The central metaphor turns Anne's hair into honey-coloured fortress walls, showing that her beauty both attracts suitors and blocks them from her true self. Each stanza ends with nearly the same idea, being loved for oneself rather than one's hair, so the refrain keeps the central question in view. Rhymes on alternate lines give a gentle, song-like music. Together, form and devices turn a light conversation into a memorable reflection on love.",
  sol: "Dialogue form → the metaphor → the refrain → rhyme → conclusion.",
}));
Q("la_relevance", long({
  ...LA, t: 2, d: 4, c: "evaluation",
  stem: "In an age of filters and social media, is the message of *For Anne Gregory* more relevant than ever? Answer in 100–120 words.",
  model: "The message of For Anne Gregory seems even more relevant today. The older speaker warns Anne that admirers will be captivated by her beautiful hair rather than by her character. On social media, appearance is everything: filters smooth faces, and likes reward looks far more than ideas or kindness. Many young people, like Anne, feel that they must change their appearance to be valued, yet each change only creates a new surface to be judged. The poem's final stanza reminds us that being loved purely for oneself is rare. Still, we can choose whom we admire and how we judge others. If we value character first, we make Anne's hope a little more possible.",
  sol: "A clear view → the poem's warning → today's social media → the limits of changing appearance → what we can do → conclusion.",
}));

// ================================================================ objective items
Q("mc_poet", mcq({ t: 1, d: 1, c: "recall", stem: "Who wrote the poem *For Anne Gregory*?", opts: ["W. B. Yeats", "Ogden Nash", "Robin Klein", "Adrienne Rich"], sol: "W. B. Yeats, the Irish poet. The others wrote other poems in the Class 10 textbook." }));
Q("mc_nobel", mcq({ t: 1, d: 1, c: "recall", stem: "In which year did W. B. Yeats, the poet of *For Anne Gregory*, receive the Nobel Prize in Literature?", opts: ["1923", "1913", "1939", "1948"], sol: "Yeats received it in 1923." }));
Q("mc_attraction", mcq({ t: 1, d: 2, c: "understanding", stem: "What does the older speaker of *For Anne Gregory* say attracts suitors to Anne?", opts: ["her golden hair", "her intelligence", "her wealth", "her kindness"], sol: "Her beautiful hair captivates them." }));
Q("mc_solution", mcq({ t: 1, d: 2, c: "understanding", stem: "What is Anne's solution in Yeats's poem?", opts: ["to dye her hair a different colour", "to stop meeting people", "to wear a hat", "to move to another town"], sol: "She proposes changing her hair colour." }));
Q("mc_god", mcq({ t: 2, d: 3, c: "analysis", stem: "According to the last stanza of *For Anne Gregory*, who can love a person purely for herself?", opts: ["God alone", "parents alone", "poets alone", "true friends alone"], sol: "Only divine love is unconditional." }));
Q("mc_form", mcq({ t: 3, d: 2, c: "recall", stem: "*For Anne Gregory* is written as…", opts: ["a dialogue in three six-line stanzas", "a sonnet", "a single long stanza of free verse", "a ballad in many quatrains"], sol: "Three sestets in conversation." }));
Q("mc_metaphor", mcq({ t: 3, d: 2, c: "understanding", stem: "Anne's hair described as the walls of a fortress in *For Anne Gregory* is an example of…", opts: ["metaphor", "personification", "onomatopoeia", "hyperbole"], sol: "A direct comparison without like." }));
Q("mc_theme", mcq({ t: 2, d: 2, c: "understanding", stem: "Which is the central theme of *For Anne Gregory*?", opts: ["outer beauty versus inner worth", "the history of Ireland", "the joy of travel", "the beauty of nature"], sol: "The poem asks whether one can be loved for oneself, not one's looks." }));
Q("mc_apply", mcq({ t: 2, d: 3, c: "application", stem: "Which SOYL-written situation best reflects the idea of *For Anne Gregory*?", opts: ["Zoya's classmates crowd round her when she wears designer clothes, but drift away when she dresses simply.", "Zoya studies hard for her exams.", "Zoya plants a garden at school.", "Zoya learns to swim."], sol: "Attention based on appearance mirrors the poem." }));
Q("mc_tone_end", mcq({ t: 3, d: 3, c: "analysis", stem: "How does the tone of *For Anne Gregory* change in the last stanza?", opts: ["It becomes reflective and philosophical.", "It becomes angry.", "It becomes comic and silly.", "It becomes frightened."], sol: "The conversation turns spiritual and serious." }));
Q("mc_speakers", mcq({ t: 1, d: 2, c: "understanding", stem: "How are the stanzas of *For Anne Gregory* divided between the speakers?", opts: ["older speaker, Anne, older speaker", "Anne, Anne, older speaker", "older speaker throughout", "Anne, older speaker, Anne"], sol: "The older speaker opens and closes; Anne speaks in the middle." }));
Q("mc_irony", mcq({ t: 2, d: 3, c: "analysis", stem: "Why is Anne's solution in *For Anne Gregory* unlikely to work?", opts: ["Admirers would simply be drawn by some other aspect of her looks.", "Dyes were not sold then.", "Her family would forbid it.", "Brown hair is less beautiful."], sol: "Human attraction would find a new surface." }));
Q("mc_honey", mcq({ t: 3, d: 3, c: "analysis", stem: "What does the honey colour in the hair image of *For Anne Gregory* suggest?", opts: ["sweetness and rich golden beauty", "stickiness and mess", "danger", "old age"], sol: "Honey suggests a sweet, rich golden colour." }));
Q("mc_relation", mcq({ t: 1, d: 2, c: "understanding", stem: "Anne Gregory, to whom Yeats addressed the poem, was the granddaughter of…", fixed: true, key: "c", opts: ["Queen Victoria", "Maud Gonne", "Lady Augusta Gregory", "Rabindranath Tagore"], sol: "She was Lady Gregory's granddaughter." }));

Q("fb_form", fb({ t: 3, d: 1, c: "recall", marks: 1, stem: "*For Anne Gregory* is a ___ between an older speaker and Anne, in three stanzas of ___ lines.", acc: [["dialogue", "conversation"], ["six", "6"]], sol: "A **dialogue** in three stanzas of **six** lines.", scheme: [["dialogue", 0.5], ["six", 0.5]] }));
Q("fb_refrain", fb({ t: 3, d: 2, c: "understanding", stem: "An idea repeated at the end of each stanza, as in *For Anne Gregory*, is called a ___.", acc: [["refrain"]], sol: "It is a **refrain**." }));
Q("fb_poet", fb({ t: 1, d: 1, c: "recall", stem: "*For Anne Gregory* was written by the Irish poet William Butler ___.", acc: [["Yeats"]], sol: "The poet is W. B. **Yeats**." }));
Q("fb_yesternight", fb({ t: 4, d: 2, c: "understanding", stem: "The old-fashioned word *yesternight*, used near the end of *For Anne Gregory*, means last ___.", acc: [["night"]], sol: "It means last **night**." }));

Q("ar_form", ar({ t: 3, d: 2, c: "understanding", a: "*For Anne Gregory* has three stanzas.", r: "*For Anne Gregory* is written in unrhymed free verse.", key: "c", sol: "A is true. R is false: alternate lines rhyme." }));
Q("ar_hair", ar({ t: 2, d: 3, c: "analysis", a: "The older speaker of *For Anne Gregory* believes Anne's suitors will not love her for herself.", r: "He thinks they are captivated by her beautiful hair.", key: "a", sol: "Both are true, and R explains A." }));
Q("ar_dye", ar({ t: 1, d: 2, c: "understanding", a: "In *For Anne Gregory*, Anne says she will cut off all her hair.", r: "Anne wants to be loved for her true self.", key: "d", sol: "A is false: she proposes dyeing it. R is true." }));
Q("ar_nobel", ar({ t: 1, d: 2, c: "understanding", a: "*For Anne Gregory* is written as a dialogue.", r: "W. B. Yeats received the Nobel Prize in Literature in 1923.", key: "b", sol: "Both are true, but R does not explain A." }));

Q("tf_anne_speaks", tf({ t: 1, d: 1, c: "recall", stem: "True or false: Anne speaks the middle stanza of *For Anne Gregory*.", ans: true, sol: "She replies in stanza 2." }));
Q("tf_agree", tf({ t: 2, d: 2, c: "understanding", stem: "True or false: the older speaker of *For Anne Gregory* has the final word.", ans: true, sol: "He speaks the last stanza." }));
Q("tf_free", tf({ t: 3, d: 2, c: "understanding", stem: "True or false: *For Anne Gregory* has no rhyme.", ans: false, sol: "Lines 2, 4 and 6 of each stanza rhyme." }));
Q("tf_dye_works", tf({ t: 2, d: 3, c: "analysis", stem: "True or false: *For Anne Gregory* suggests that dyeing her hair will certainly solve Anne's problem.", ans: false, sol: "The final stanza implies God alone loves unconditionally." }));

Q("ord_dialogue", ord({
  t: [1, 3], d: 2, c: "understanding", marks: 2,
  stem: "Arrange the stages of the conversation in *For Anne Gregory* in order (SOYL summary).",
  items: ["The older speaker says suitors will be captivated by Anne's hair.", "He pictures her hair as honey-coloured fortress walls.", "Anne replies that she could dye her hair.", "She hopes suitors would then value her true self.", "The speaker reports a devout man's claim about scripture.", "He concludes that God alone loves a person for herself."],
  sol: "Warning → metaphor → Anne's plan → her aim → the report → the conclusion.",
}));
Q("ord_answer", ord({
  t: 4, d: 2, c: "application", marks: 2,
  stem: "Arrange the steps for answering a 40–50 word question on the theme of *For Anne Gregory*.",
  items: ["Underline the key word of the question.", "State the theme in one sentence.", "Support it with what each speaker says, in your own words.", "Explain the final stanza's point about love.", "Check the word count and remove any copied phrases."],
  sol: "Key word → theme → support → final point → check.",
}));

Q("mt_words", match({
  t: 4, d: 2, c: "understanding", marks: 2,
  stem: "Match each word from *For Anne Gregory* with its meaning.",
  pairs: [["ramparts", "defensive walls of a fort"], ["despair", "complete loss of hope"], ["yesternight", "last night"], ["declare", "announce firmly"]],
  sol: "Single words from the poem with their meanings.",
}));
Q("mt_speakers", match({
  t: 2, d: 3, c: "analysis", marks: 2,
  stem: "Match each part of *For Anne Gregory* with the view it expresses.",
  pairs: [["stanza 1 (older speaker)", "beauty will hide Anne's true self"], ["stanza 2 (Anne)", "changing her hair will solve it"], ["stanza 3 (older speaker)", "God alone loves unconditionally"], ["the repeated ending", "the central question of true love"]],
  sol: "Each stanza carries one step of the debate.",
}));
Q("mt_devices", match({
  t: 3, d: 3, c: "analysis", marks: 2,
  stem: "Match each feature of *For Anne Gregory* with the correct term.",
  pairs: [["hair described as fortress walls", "metaphor"], ["nearly the same idea ending each stanza", "refrain"], ["two speakers taking turns", "dialogue"], ["the honey colour of the hair", "visual imagery"]],
  sol: "Name each device by what it does in the poem.",
}));
