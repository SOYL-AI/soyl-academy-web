// CBSE 10 English Language and Literature, ch19 "The Trees" (Adrienne Rich) — question bank.
// LITERATURE RULE (CONTEXT §8): the poem is in copyright. No line or phrase of it is reproduced; only the
// title and single words (veranda, disengage, exertion, boughs, lichen, discharged, crown) appear. Each stanza
// is described by what happens and what it means, never paraphrased line by line, and the similes are
// described, not quoted. Passages are SOYL commentary (passage_origin: soyl-commentary). build.mjs runs a
// short forbidden-phrase guard (../../cbse-10-english-language-and-literature-ch18/src/guard.mjs).
import { Q, mcq, fb, short, long, tf, ar, match, ord, source, child } from "../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs";

const NOTE = "*(This passage is SOYL's commentary on the poem, not lines from it. Read the poem itself in your textbook, First Flight.)*";
const SRC_STEM = `Read the commentary on *The Trees* and answer the questions that follow. ${NOTE}`;
const SCHEME3 = [["Relevant point about the poem", 1], ["Explanation or interpretation linked to the question", 1], ["Expression and accuracy within 40–50 words", 1]];
const SCHEME2 = [["Correct point about the poem", 1], ["Explanation in own words within 30–40 words", 1]];
const LONG_SCHEME = [["Content: accurate points about the poem", 3], ["Interpretation / extrapolation: a clear, supported view", 1], ["Organisation and expression; within 100–120 words", 2]];

// ================================================================ extract-based (SOYL commentary)
Q("src_empty_forest", source({
  t: [1, 2], d: 2, c: "understanding", origin: "soyl-commentary",
  stem: SRC_STEM,
  passage: "Adrienne Rich begins with a strange piece of news: the trees that have been kept indoors are leaving for the forest. Then she turns to the forest itself, which has stood bare for days and nights. Without its trees it cannot do what a forest should. Birds have no branch to perch on, insects have nowhere to shelter, and the sun has no shade to rest in. A forest without trees is hardly a forest at all. By dawn, the speaker says, that emptiness will be filled.",
  parts: [
    child("a", mcq({ t: 1, d: 1, c: "recall", stem: "In *The Trees*, where are the indoor trees going?", opts: ["to the forest", "to a city park", "to a nursery", "to another house"], sol: "They are leaving the house for the forest." })),
    child("b", mcq({ t: 1, d: 2, c: "understanding", stem: "According to the commentary, why can't birds use the forest in *The Trees*?", opts: ["There are no branches to perch on.", "The forest is too noisy.", "Hunters have driven them away.", "The forest is flooded."], sol: "With no trees, birds have nowhere to sit." })),
    child("c", fb({ t: 1, d: 2, c: "understanding", stem: "The commentary says the forest's emptiness will be filled by ___.", acc: [["dawn", "morning", "daybreak"]], sol: "By **dawn** the forest will be full." })),
    child("d", short({ t: 2, d: 3, c: "analysis", marks: 1, stem: "What does the empty forest suggest about the trees kept indoors in *The Trees*?", model: "They belong in the forest; keeping them indoors leaves nature incomplete.", sol: "Their true place is the forest.", scheme: [["Trees belong in the forest / nature is incomplete without them", 1]] })),
    child("e", mcq({ t: 1, d: 2, c: "understanding", stem: "Which of these does the commentary say the sun lacks in the empty forest of *The Trees*?", opts: ["shade to rest in", "clouds to hide behind", "water to shine on", "hills to set behind"], sol: "Without trees there is no shade." })),
  ],
  sol: "Answer from the commentary; parts (a) and (b) also follow from your reading of the poem.",
}));
Q("src_struggle", source({
  t: [1, 3], d: 3, c: "analysis", origin: "soyl-commentary",
  stem: SRC_STEM,
  passage: "The second stanza shows the effort of escape. Through the night the roots labour to pull themselves free of cracks in the veranda boards. The leaves press towards the window panes, the small twigs grow rigid with effort, and the big branches, cramped for a long time beneath the roof, drag themselves forward. The poet compares them to patients just released from hospital, still dazed, making their way towards the clinic's exit. Freedom here is not easy or graceful. It is slow, stiff and hard-won.",
  parts: [
    child("a", mcq({ t: 1, d: 1, c: "recall", stem: "In *The Trees*, where are the roots stuck?", opts: ["in cracks in the veranda boards", "in flower pots on the roof", "in the garden wall", "under the kitchen sink"], sol: "They pull free from cracks in the veranda boards." })),
    child("b", mcq({ t: 3, d: 2, c: "understanding", stem: "To whom does the poet of *The Trees* compare the branches?", opts: ["patients just released from hospital", "soldiers marching to war", "children running out of school", "dancers on a stage"], sol: "The simile compares them to dazed patients leaving a clinic." })),
    child("c", fb({ t: 3, d: 2, c: "understanding", stem: "The commentary says the small twigs grow rigid with ___.", acc: [["effort"]], sol: "They are rigid with **effort**." })),
    child("d", short({ t: 3, d: 4, c: "analysis", marks: 1, stem: "What does the hospital comparison in *The Trees* suggest about the branches?", model: "They are weak and unsteady after long confinement, yet moving towards freedom.", sol: "Weakness after confinement + movement to release.", scheme: [["Weak after confinement but heading to freedom", 1]] })),
    child("e", mcq({ t: 2, d: 3, c: "analysis", stem: "What does the commentary say freedom is like in this stanza of *The Trees*?", opts: ["slow, stiff and hard-won", "quick and joyful", "easy and graceful", "violent and cruel"], sol: "The escape takes painful effort." })),
  ],
  sol: "Explain the images of effort and the simile.",
}));
Q("src_speaker", source({
  t: [1, 2], d: 3, c: "analysis", origin: "soyl-commentary",
  stem: SRC_STEM,
  passage: "Meanwhile the speaker sits indoors with the veranda doors open, busy writing letters. In them she barely refers to the most remarkable event of the night: the forest leaving her house. Is she unaware, or does she choose not to speak of it? Many readers sense that she knows exactly what is happening and keeps quiet, perhaps because she too longs to break free. The open doors matter. She is not trying to stop the trees. She lets them go.",
  parts: [
    child("a", mcq({ t: 1, d: 1, c: "recall", stem: "What is the speaker of *The Trees* doing while the trees leave?", opts: ["writing letters", "watering the plants", "sleeping", "cooking dinner"], sol: "She sits inside writing letters." })),
    child("b", mcq({ t: 1, d: 2, c: "understanding", stem: "How much does the speaker of *The Trees* say about the trees' departure in her letters?", opts: ["almost nothing", "everything, in detail", "only that she is angry", "that she will plant more"], sol: "She hardly mentions it." })),
    child("c", fb({ t: 1, d: 2, c: "understanding", stem: "The commentary says the doors to the ___ are open while the speaker writes.", acc: [["veranda", "verandah"]], sol: "The doors to the **veranda** are open." })),
    child("d", short({ t: 2, d: 4, c: "evaluation", marks: 1, stem: "Why might the speaker of *The Trees* stay quiet about the departure, according to many readers?", model: "She may long to break free herself, so she quietly lets the trees go.", sol: "Her own wish for freedom.", scheme: [["She shares the longing for freedom", 1]] })),
    child("e", mcq({ t: 2, d: 3, c: "analysis", stem: "What do the open doors suggest about the speaker of *The Trees*?", opts: ["She does not try to stop the trees.", "She is waiting for a visitor.", "She feels too hot indoors.", "She wants to chase the trees."], sol: "She allows the trees to leave." })),
  ],
  sol: "Speaker questions rely on clues: what she does, what she leaves unsaid, the open doors.",
}));
Q("src_night", source({
  t: [3, 1], d: 3, c: "analysis", origin: "soyl-commentary",
  stem: SRC_STEM,
  passage: "The night around the house is cool and clear, and a full moon glows in a sky that is not yet closed in by branches. The scent of leaves and of the crusty growth on bark drifts indoors, and the poet compares the scent to a voice calling. The speaker's mind is busy with murmurs that, she senses, will fall quiet by the next day. It is a calm, almost magical scene, and yet something enormous is happening at its edges. The stillness makes the coming break-out more dramatic.",
  parts: [
    child("a", mcq({ t: 3, d: 2, c: "understanding", stem: "In *The Trees*, the scent drifting indoors is compared to…", opts: ["a voice", "a song bird", "a cold wind", "a river"], sol: "The scent is likened to a voice calling." })),
    child("b", mcq({ t: 1, d: 1, c: "recall", stem: "What kind of moon glows in *The Trees*?", opts: ["a full moon", "a crescent moon", "no moon at all", "a red moon"], sol: "A full moon lights the night." })),
    child("c", fb({ t: 4, d: 2, c: "understanding", stem: "The crusty growth found on bark and rocks, mentioned in *The Trees*, is called ___.", acc: [["lichen"]], sol: "It is **lichen**." })),
    child("d", short({ t: 3, d: 4, c: "analysis", marks: 1, stem: "How does the stillness of the night affect the drama of *The Trees*?", model: "The calm makes the trees' sudden break-out seem more dramatic by contrast.", sol: "Contrast heightens the drama.", scheme: [["Calm contrasts with and heightens the break-out", 1]] })),
    child("e", mcq({ t: 3, d: 3, c: "analysis", stem: "Which sense does the scent of leaves in *The Trees* appeal to?", opts: ["smell", "taste", "touch", "hearing only"], sol: "It is olfactory imagery, though it is compared to a voice." })),
  ],
  sol: "Imagery questions: name the sense and say what it adds to the mood.",
}));
Q("src_breakout", source({
  t: [1, 3], d: 3, c: "analysis", origin: "soyl-commentary",
  stem: SRC_STEM,
  passage: "The final stanza begins with a command to the reader to listen. Window panes are shattering. The trees lurch out into the darkness, and the winds hurry forward to greet them as if welcoming them home. Then comes the most striking image: the moon itself seems to shatter like a looking-glass, and its fragments glitter in the top of the tallest tree. The breaking of the panes and the shattering of the moon suggest that an old order has been broken for good. The trees are free.",
  parts: [
    child("a", mcq({ t: 1, d: 1, c: "recall", stem: "How does the final stanza of *The Trees* begin?", opts: ["with a command to listen", "with a question", "with the speaker's name", "with a description of dawn"], sol: "It opens by telling the reader to listen." })),
    child("b", mcq({ t: 3, d: 2, c: "understanding", stem: "In *The Trees*, the moon is compared to…", opts: ["a broken looking-glass", "a silver coin", "a lamp", "an eye"], sol: "The moon shatters like a mirror." })),
    child("c", fb({ t: 3, d: 2, c: "understanding", stem: "The commentary says the winds hurry forward to ___ the trees.", acc: [["greet", "welcome"]], sol: "The winds **greet** them, as if welcoming them home." })),
    child("d", short({ t: 2, d: 4, c: "evaluation", marks: 1, stem: "What might the breaking of the panes and the moon symbolise in *The Trees*?", model: "The breaking of an old order or barrier, so that freedom cannot be undone.", sol: "Barriers broken permanently.", scheme: [["An old order / barrier broken", 1]] })),
    child("e", mcq({ t: 3, d: 3, c: "analysis", stem: "What poetic device makes the winds hurry to greet the trees in *The Trees*?", opts: ["personification", "alliteration", "onomatopoeia", "understatement"], sol: "The winds are given human actions." })),
  ],
  sol: "Link the images of breaking to the theme of freedom.",
}));
Q("src_meaning", source({
  t: [2, 4], d: 4, c: "evaluation", origin: "soyl-commentary",
  stem: SRC_STEM,
  passage: "On the surface, the poem is about trees reclaiming the forest. Underneath, many readers find a second meaning. Rich was a feminist poet, and the trees kept indoors, cramped and decorative, can stand for women confined to the home by social expectations. Their slow, painful escape suggests how hard it is for women to break such limits, and the forest stands for the wider world where they can grow. Others read the poem as being about nature: human beings tame and imprison nature for decoration, and nature will one day reclaim its place.",
  parts: [
    child("a", mcq({ t: 2, d: 2, c: "understanding", stem: "In the feminist reading of *The Trees*, the indoor trees stand for…", opts: ["women confined to the home", "children at school", "workers in factories", "soldiers in barracks"], sol: "They represent women limited by social expectations." })),
    child("b", fb({ t: 2, d: 2, c: "understanding", stem: "The commentary says Adrienne Rich was a ___ poet.", acc: [["feminist"]], sol: "She was a **feminist** poet." })),
    child("c", mcq({ t: 2, d: 3, c: "analysis", stem: "What does the forest stand for in the feminist reading of *The Trees*?", opts: ["the wider world where women can grow", "a place of danger", "the past", "a prison"], sol: "The forest is the open world of growth and freedom." })),
    child("d", short({ t: 2, d: 4, c: "evaluation", marks: 1, stem: "What is the nature-based reading of *The Trees*, according to the commentary?", model: "Humans imprison nature for decoration, but nature will one day reclaim its place.", sol: "Nature reclaims what humans confined.", scheme: [["Nature confined by humans reclaims its place", 1]] })),
    child("e", mcq({ t: 4, d: 3, c: "evaluation", stem: "Why can *The Trees* support more than one reading?", opts: ["Its trees work as symbols, not only as plants.", "It has two different endings.", "It is written in two languages.", "Its speaker changes halfway."], sol: "Symbolic images allow several interpretations." })),
  ],
  sol: "Interpretation questions: give the reading and support it with images from the poem in your own words.",
}));
Q("src_form", source({
  t: [3, 4], d: 3, c: "analysis", origin: "soyl-commentary",
  stem: SRC_STEM,
  passage: "The poem has four stanzas of free verse, with no regular rhyme or metre. Its lines often run on without punctuation, so that one image tumbles into the next, much as the trees push forward. Rich builds the poem from sharp images: the struggling roots, the dazed branches, the scent indoors, the shattered moon. Almost everything in it is personified; trees, winds and even the scent act like living people. The calm tone of the middle gives way to urgency at the end, matching the movement from slow effort to sudden escape.",
  parts: [
    child("a", fb({ t: 3, d: 1, c: "recall", stem: "*The Trees* is written in ___ verse, with no regular rhyme or metre.", acc: [["free"]], sol: "It is **free** verse." })),
    child("b", mcq({ t: 1, d: 1, c: "recall", stem: "How many stanzas does *The Trees* have?", opts: ["four", "three", "five", "six"], sol: "The poem has four stanzas." })),
    child("c", mcq({ t: 3, d: 2, c: "understanding", stem: "Lines that run on without a pause, as in *The Trees*, are an example of…", opts: ["enjambment", "a refrain", "a couplet", "hyperbole"], sol: "Running-on lines are enjambment." })),
    child("d", short({ t: 3, d: 4, c: "analysis", marks: 1, stem: "How does the movement of the tone in *The Trees* match its content?", model: "Calm in the middle, urgent at the end, it follows the slow effort turning into a sudden escape.", sol: "Tone mirrors the action.", scheme: [["Calm to urgent = slow effort to escape", 1]] })),
    child("e", mcq({ t: 3, d: 3, c: "analysis", stem: "Which device does the commentary say runs through almost all of *The Trees*?", opts: ["personification", "rhyming couplets", "a refrain", "pun"], sol: "Trees, winds and scent behave like living people." })),
  ],
  sol: "For form questions, name the verse form, describe the lines and link the style to the meaning.",
}));

// ================================================================ short answers, 3 marks (40–50 words)
const SA3 = { marks: 3, wl: [40, 50], scheme: SCHEME3, time: 240 };
Q("sa_empty", short({
  ...SA3, t: 1, d: 2, c: "understanding",
  stem: "Why is the forest in *The Trees* described as empty, and what is missing there? Answer in 40–50 words.",
  model: "The forest is empty because its trees have been taken away and kept inside a house. Without them, birds cannot perch, insects cannot shelter and the sun cannot cast any shade. The forest has lost its life and purpose until the trees come back.",
  sol: "Why it is empty + what is missing + the result.",
}));
Q("sa_effort", short({
  ...SA3, t: [1, 3], d: 3, c: "analysis",
  stem: "How does *The Trees* show the effort the trees make to escape? Answer in 40–50 words.",
  model: "Through the night the roots strain to pull free of the cracked veranda boards. Leaves press towards the windows, twigs stiffen with strain, and the cramped branches drag themselves forward. The poet presents escape as slow, painful labour, not a sudden, easy flight to freedom.",
  sol: "Roots + leaves and twigs + branches + what this shows.",
}));
Q("sa_patients", short({
  ...SA3, t: 3, d: 3, c: "analysis",
  stem: "Explain the comparison between the branches and hospital patients in *The Trees*. Answer in 40–50 words.",
  model: "The cramped branches are likened to patients just released from hospital, still dazed and unsteady as they head for the clinic's exit. The simile suggests weakness after long confinement, but also recovery and hope, because they are leaving for a healthier life outside.",
  sol: "The comparison + weakness after confinement + hope of recovery.",
}));
Q("sa_speaker", short({
  ...SA3, t: [1, 2], d: 3, c: "analysis",
  stem: "Describe the speaker of *The Trees* and her response to the trees' departure. Answer in 40–50 words.",
  model: "The speaker sits indoors with the veranda doors open, writing letters. She barely mentions the extraordinary departure in them. Her silence, together with the open doors, suggests that she does not want to stop the trees and may secretly share their longing to escape.",
  sol: "What she does + what she leaves unsaid + what it suggests.",
}));
Q("sa_moon", short({
  ...SA3, t: 3, d: 4, c: "analysis",
  stem: "What is the significance of the moon image at the end of *The Trees*? Answer in 40–50 words.",
  model: "The moon appears to shatter like a mirror, and its pieces glitter in the top of the tallest tree. The image shows that the old order, seen from inside the house, is broken for ever. The trees now hold the light; nature has taken back its place.",
  sol: "The image + what is broken + what the trees gain.",
}));
Q("sa_feminist", short({
  ...SA3, t: 2, d: 4, c: "evaluation",
  stem: "How can *The Trees* be read as a poem about women? Answer in 40–50 words.",
  model: "The trees kept indoors, cramped and decorative, can stand for women confined to the home by social customs. Their slow, painful escape reflects the struggle for freedom, and the forest is the wider world. The speaker's quiet acceptance may show her own wish to break free.",
  sol: "The symbol + the struggle + the forest + the speaker.",
}));
Q("sa_nature", short({
  ...SA3, t: 2, d: 3, c: "evaluation",
  stem: "What does *The Trees* suggest about the relationship between human beings and nature? Answer in 40–50 words.",
  model: "Humans take trees out of the forest to decorate their homes, confining them in pots and verandas. The poem suggests that this is unnatural: the forest is left lifeless, and the trees struggle to return. Nature cannot be owned for long; it will reclaim its place.",
  sol: "What humans do + why it is wrong + nature's response.",
}));
Q("sa_title", short({
  ...SA3, t: [2, 3], d: 3, c: "evaluation",
  stem: "Is *The Trees* a suitable title for the poem? Give reasons in 40–50 words.",
  model: "Yes. The trees are the poem's main characters: they struggle, move and finally break free. The plain title also hides a deeper meaning, since the trees can stand for women or for confined nature. A simple name opens onto a powerful symbol, much like the poem itself.",
  sol: "A clear view + the trees as characters + their symbolic meaning.",
}));
Q("sa_devices", short({
  ...SA3, t: 3, d: 3, c: "analysis",
  stem: "Name two poetic devices used in *The Trees* and explain their effect. Answer in 40–50 words.",
  model: "Personification gives the trees human effort: roots labour and branches shuffle forward, making their escape feel like a human struggle. A simile compares the branches to dazed patients leaving hospital, showing weakness after confinement. Together they make readers sympathise with the trees' longing for freedom.",
  sol: "Two devices named + where they occur (described) + the effect of each.",
}));
Q("sa_apply", short({
  ...SA3, t: 2, d: 3, c: "application",
  stem: "Give an example from today's world of someone who, like the trees in *The Trees*, breaks free of limits set by others. Answer in 40–50 words.",
  model: "A girl in a small town is expected to stop studying after school, but she persuades her family, studies engineering and works on rural solar projects. Like the trees, her journey is slow and difficult, yet she leaves a confined space and grows in the wider world.",
  sol: "A suitable example + the limits + the slow escape + growth.",
}));
Q("sa_tone", short({
  ...SA3, t: 3, d: 3, c: "analysis",
  stem: "Describe the mood of *The Trees* and how it changes. Answer in 40–50 words.",
  model: "The opening has a calm, mysterious mood, as the news of the departure is stated simply. In the middle stanzas the night grows still and almost magical. The ending becomes urgent and dramatic, with panes shattering and trees lurching into the darkness. The mood moves from mystery to liberation.",
  sol: "The opening mood + the middle + the ending + the overall movement.",
}));
Q("sa_symbols", short({
  ...SA3, t: 3, d: 3, c: "analysis",
  stem: "What do the house and the forest symbolise in *The Trees*? Answer in 40–50 words.",
  model: "The house symbolises confinement: a man-made space where living things are kept for decoration and cannot grow freely. The forest symbolises freedom and natural belonging, the open world where trees give shelter and life. The poem moves the trees from one symbol to the other.",
  sol: "The house + the forest + the movement between them.",
}));

// ================================================================ short answers, 2 marks (30–40 words)
const SA2 = { marks: 2, wl: [30, 40], scheme: SCHEME2, time: 150 };
Q("sb_poet", short({
  ...SA2, t: 1, d: 1, c: "recall",
  stem: "Who wrote *The Trees*? Mention two facts about the poet in 30–40 words.",
  model: "The poem was written by Adrienne Rich (1929–2012), an American poet and essayist. She was a leading feminist voice, and her collection Diving into the Wreck won the National Book Award in 1974.",
  sol: "Name + any two facts (American; 1929–2012; feminist poet and essayist; Diving into the Wreck, National Book Award 1974).",
}));
Q("sb_forest_empty", short({
  ...SA2, t: 1, d: 2, c: "understanding",
  stem: "What can't the birds, insects and sun do in the empty forest of *The Trees*? Answer in 30–40 words.",
  model: "With no trees in the forest, birds have no branches on which to perch, insects have no hiding place, and the sun has no shade to settle into. The forest has lost its purpose.",
  sol: "Birds + insects + sun + the result.",
}));
Q("sb_letters", short({
  ...SA2, t: 1, d: 2, c: "understanding",
  stem: "What is the speaker of *The Trees* doing while the trees leave, and what does she leave out? Answer in 30–40 words.",
  model: "She is sitting indoors, writing letters, with the veranda doors left wide open to the night. In those letters she hardly refers to the trees' departure, the most remarkable event happening around her.",
  sol: "Her activity + what she barely mentions.",
}));
Q("sb_winds", short({
  ...SA2, t: 3, d: 2, c: "understanding",
  stem: "How do the winds respond to the trees at the end of *The Trees*, and what does this suggest? Answer in 30–40 words.",
  model: "The winds hurry forward to greet the trees as they lurch into the darkness. This personification suggests that nature welcomes the trees home, as if it has been waiting for their return.",
  sol: "The winds' action + what it suggests.",
}));
Q("sb_exertion", short({
  ...SA2, t: [4, 1], d: 2, c: "understanding",
  stem: "What does *exertion* mean, and how does the word suit the twigs in *The Trees*? Answer in 30–40 words.",
  model: "Exertion means great physical effort. It suits the twigs because they have grown stiff from straining to move, showing how hard the trees must work to free themselves and leave the house.",
  sol: "Meaning + why it fits the twigs.",
}));
Q("sb_message", short({
  ...SA2, t: 2, d: 2, c: "understanding",
  stem: "State the central message of *The Trees* in 30–40 words.",
  model: "Every living thing longs to be free and to grow in its natural place. Confinement, whether of nature or of women, is unnatural, and those confined will eventually break free, however hard the struggle.",
  sol: "The main idea + who is confined + the outcome.",
}));

// ================================================================ long answers, 6 marks (100–120 words)
const LA = { marks: 6, wl: [100, 120], scheme: LONG_SCHEME, time: 720 };
Q("la_freedom", long({
  ...LA, t: 2, d: 3, c: "analysis",
  stem: "How does *The Trees* present the struggle for freedom? Answer in 100–120 words.",
  model: "The Trees shows freedom as something won through slow, painful effort. Trees that have been kept indoors decide to return to the forest, which has stood lifeless without them. Through the night their roots strain to pull out of the cracked veranda boards, their twigs stiffen and their cramped branches drag forward like dazed patients leaving hospital. Meanwhile the speaker writes letters and barely mentions what is happening, leaving the doors open. At last window panes shatter, the trees lurch into the darkness, the winds hurry to greet them and the moon seems to break apart. Freedom arrives suddenly after a long struggle, and nothing can return to how it was before.",
  sol: "The decision → the effort (roots, twigs, branches, simile) → the speaker → the break-out → the conclusion. Do not quote the poem.",
}));
Q("la_tree_diary", long({
  ...LA, t: [4, 1], d: 4, c: "application", bloom: "create",
  stem: "Imagine you are one of the trees in *The Trees*. Write a diary entry about the night you left the house, in 100–120 words.",
  model: "Night of the full moon\n\nFor years I stood in a pot on the veranda, admired by visitors, unable to stretch. Tonight I decided I would go. My roots ached as I worked them out of the cracks, one by one. My branches had forgotten how to move; I swayed like someone just out of hospital. Inside, the woman kept writing at her desk. She never looked up, but she had left the doors open, and I think she understood. When the panes gave way I stumbled out, and the wind came running to meet me. Now I stand among my kind. Birds are already settling on me. I am home.",
  sol: "Diary format (first person, time marker). Content fits the poem: confinement, the struggling roots and branches, the quiet speaker, the break-out, the welcoming wind, the forest filled. No lines quoted.",
}));
Q("la_speaker_view", long({
  ...LA, t: 2, d: 4, c: "evaluation",
  stem: "Why do you think the speaker of *The Trees* barely mentions the trees' departure in her letters? Give a reasoned answer in 100–120 words.",
  model: "The speaker's silence is one of the most puzzling parts of The Trees. One possibility is that she is simply absorbed in her own life, so the departure seems unimportant to her. But the details suggest otherwise. She leaves the veranda doors open, she notices the cool night, the moon and the scent drifting in, and her mind is full of murmurs. She seems fully aware of what is happening. I think she stays quiet because she understands and quietly supports it. If the trees stand for confined women, she may share their wish to escape and be unable to say so openly. Her silence becomes a form of consent.",
  sol: "The puzzle → a first possibility → evidence against it → a reasoned view → link to the symbolic reading → conclusion.",
}));
Q("la_letter", long({
  ...LA, t: [2, 4], d: 3, c: "application", bloom: "create",
  stem: "Using ideas from *The Trees*, write a letter to the editor of a newspaper about cutting down forests for decorative landscaping, in 100–120 words.",
  model: "The Editor\nThe City Times\n\nSubject: Forests are not decorations\n\nSir,\nI am writing to express concern about the uprooting of mature trees from nearby forests for decorative landscaping in new housing projects. In Adrienne Rich's poem The Trees, trees kept indoors struggle to return to a forest that has become lifeless without them. Our forests are suffering the same emptiness: fewer nesting birds, less shade, drier soil. Trees in pots and lobbies may look attractive, but they cannot support the life a forest does. I urge the authorities to ban such uprooting and to encourage native saplings instead. Let trees grow where they belong.\n\nYours faithfully,\nAnanya Rao",
  sol: "Formal letter format (editor, subject, salutation, close); the poem's idea in own words; the problem and its effects; a clear suggestion.",
}));
Q("la_symbolism", long({
  ...LA, t: 3, d: 4, c: "analysis",
  stem: "Discuss the use of symbolism and imagery in *The Trees*. Answer in 100–120 words.",
  model: "Adrienne Rich packs The Trees with symbols and sharp images. The house stands for confinement and the forest for freedom and natural belonging. The trees themselves can represent women limited to the home, or nature imprisoned for human decoration. Imagery makes their escape vivid: roots straining in cracked boards, stiff twigs, branches shuffling like dazed patients. The quiet middle is full of sense impressions, a cool night, moonlight and the scent of leaves compared to a voice. The ending brings images of breaking: shattering panes and a moon that seems to shatter like a mirror, its pieces caught in the tallest tree. Together, symbols and images turn a strange event into a powerful statement about liberation.",
  sol: "Main symbols (house, forest, trees) → images of struggle → images of the night → images of breaking → conclusion.",
}));
Q("la_relevance", long({
  ...LA, t: 2, d: 4, c: "evaluation",
  stem: "Is the message of *The Trees* relevant to India today? Answer in 100–120 words, with reference to the poem.",
  model: "The message of The Trees remains relevant in India today in two ways. First, the poem shows trees confined indoors while the forest stands empty. Our cities increasingly prize decorative greenery, while real forests are cleared for roads and buildings, leaving birds and insects without homes. The poem reminds us that nature needs space, not pots. Second, if the trees stand for women, their struggle mirrors that of many Indian women who still face limits on education, work and movement. Many are breaking free, slowly and with effort, much like the roots in the poem. Their journey, like the trees', may be hard, but it enriches everyone. The poem therefore speaks clearly to our times.",
  sol: "A clear view → the environmental reading applied → the feminist reading applied → conclusion.",
}));

// ================================================================ objective items
Q("mc_poet", mcq({ t: 1, d: 1, c: "recall", stem: "Who wrote the poem *The Trees*?", opts: ["Adrienne Rich", "Robin Klein", "Leslie Norris", "Carl Sandburg"], sol: "Adrienne Rich, the American poet. The others wrote other poems in the Class 10 textbook." }));
Q("mc_nationality", mcq({ t: 1, d: 1, c: "recall", stem: "Adrienne Rich, the poet of *The Trees*, was…", opts: ["American", "Irish", "Australian", "Welsh"], sol: "Rich was an American poet." }));
Q("mc_where_from", mcq({ t: 1, d: 1, c: "recall", stem: "In *The Trees*, where have the trees been kept?", opts: ["inside a house", "in a city park", "in a greenhouse farm", "on a ship"], sol: "They have been kept indoors." }));
Q("mc_when", mcq({ t: 1, d: 2, c: "understanding", stem: "When do the trees in *The Trees* make their escape?", opts: ["at night", "at noon", "at dawn on a holiday", "in the afternoon"], sol: "The struggle and escape happen during the night." }));
Q("mc_simile", mcq({ t: 3, d: 2, c: "understanding", stem: "Which of these is a simile from *The Trees* (described)?", opts: ["branches compared to patients released from hospital", "trees called soldiers", "the forest called a desert", "the speaker called a bird"], sol: "The branches are likened to dazed patients." }));
Q("mc_personification", mcq({ t: 3, d: 2, c: "understanding", stem: "The roots in *The Trees* labour to pull themselves free. This is an example of…", opts: ["personification", "alliteration", "onomatopoeia", "a rhetorical question"], sol: "The roots are given human effort." }));
Q("mc_speaker", mcq({ t: 2, d: 3, c: "analysis", stem: "What do the open doors suggest about the speaker of *The Trees*?", opts: ["She lets the trees go.", "She wants fresh air for her letters.", "She is afraid of the trees.", "She has forgotten to close them."], sol: "She does not try to stop the departure." }));
Q("mc_symbol", mcq({ t: 3, d: 2, c: "understanding", stem: "In *The Trees*, the forest mainly symbolises…", opts: ["freedom and natural belonging", "danger and darkness", "wealth and power", "old age"], sol: "The forest is the open world where the trees belong." }));
Q("mc_feminist", mcq({ t: 2, d: 3, c: "analysis", stem: "In a feminist reading of *The Trees*, the house represents…", opts: ["the domestic limits placed on women", "a happy family home", "a place of learning", "a hospital"], sol: "The house stands for confinement within the home." }));
Q("mc_theme", mcq({ t: 2, d: 2, c: "understanding", stem: "Which is the central theme of *The Trees*?", opts: ["the longing for freedom from confinement", "the beauty of indoor gardening", "the danger of storms", "the joy of letter-writing"], sol: "Confined beings struggle to return to freedom." }));
Q("mc_apply", mcq({ t: 2, d: 3, c: "application", stem: "Which SOYL-written situation best matches the idea of *The Trees*?", opts: ["A caged parrot is released and slowly learns to fly back into the forest.", "A boy buys a new plant for his desk.", "A gardener trims a hedge into a neat shape.", "A family paints its veranda green."], sol: "A confined creature returning to its natural place mirrors the poem." }));
Q("mc_moon", mcq({ t: 3, d: 3, c: "analysis", stem: "What does the shattering moon at the end of *The Trees* most likely suggest?", opts: ["An old order has been broken for ever.", "A storm is about to begin.", "The night is ending.", "The speaker has broken a mirror."], sol: "The breaking image marks a permanent change." }));
Q("mc_mood_end", mcq({ t: 3, d: 3, c: "analysis", stem: "Which word best describes the mood of the last stanza of *The Trees*?", opts: ["urgent", "sleepy", "comic", "bored"], sol: "Shattering panes and rushing winds create urgency." }));
Q("mc_form", mcq({ t: 3, d: 2, c: "recall", stem: "*The Trees* is written in…", fixed: true, key: "c", opts: ["rhyming couplets", "a sonnet form", "free verse", "ballad quatrains"], sol: "It has no regular rhyme scheme or metre." }));

Q("fb_free", fb({ t: 3, d: 1, c: "recall", marks: 1, stem: "*The Trees* has four stanzas of ___ verse, with no regular ___ scheme.", acc: [["free"], ["rhyme"]], sol: "Four stanzas of **free** verse, with no regular **rhyme** scheme.", scheme: [["free", 0.5], ["rhyme", 0.5]] }));
Q("fb_personify", fb({ t: 3, d: 2, c: "understanding", stem: "Giving human actions to non-human things, as with the roots, branches and winds in *The Trees*, is called ___.", acc: [["personification"]], sol: "It is **personification**." }));
Q("fb_poet", fb({ t: 1, d: 1, c: "recall", stem: "*The Trees* was written by the American poet Adrienne ___.", acc: [["Rich"]], sol: "The poet is Adrienne **Rich**." }));
Q("fb_veranda", fb({ t: 4, d: 2, c: "understanding", stem: "In *The Trees*, the roots are caught in cracks in the floor of the ___, a roofed platform along the outside of a house.", acc: [["veranda", "verandah"]], sol: "It is the **veranda**." }));

Q("ar_forest", ar({ t: 1, d: 2, c: "understanding", a: "The forest in *The Trees* has been standing empty.", r: "The speaker of *The Trees* writes letters indoors.", key: "b", sol: "Both are true, but R does not explain A: the forest is empty because its trees are indoors, not because of her letters." }));
Q("ar_speaker", ar({ t: 2, d: 3, c: "analysis", a: "The speaker of *The Trees* tries hard to stop the trees from leaving.", r: "The speaker of *The Trees* writes letters while the trees leave.", key: "d", sol: "A is false: she leaves the doors open and lets them go. R is true." }));
Q("ar_patients", ar({ t: 3, d: 3, c: "analysis", a: "The branches in *The Trees* are compared to patients leaving hospital.", r: "The branches in *The Trees* are weak and dazed after long confinement.", key: "a", sol: "Both are true, and R explains why the simile fits." }));
Q("ar_rhyme", ar({ t: 3, d: 2, c: "understanding", a: "*The Trees* is written in free verse.", r: "*The Trees* has a regular abab rhyme scheme.", key: "c", sol: "A is true. R is false: there is no regular rhyme scheme." }));

Q("tf_moon", tf({ t: 1, d: 1, c: "recall", stem: "True or false: *The Trees* is set on a moonlit night.", ans: true, sol: "A full moon glows over the scene." }));
Q("tf_letters", tf({ t: 1, d: 2, c: "understanding", stem: "True or false: the speaker of *The Trees* describes the trees' departure in detail in her letters.", ans: false, sol: "She hardly mentions it." }));
Q("tf_easy", tf({ t: 1, d: 2, c: "understanding", stem: "True or false: in *The Trees*, the trees leave the house quickly and without effort.", ans: false, sol: "Their escape is slow and painful." }));
Q("tf_winds", tf({ t: 3, d: 2, c: "understanding", stem: "True or false: in *The Trees*, the winds hurry to meet the trees.", ans: true, sol: "The winds hurry forward as if to welcome them." }));

Q("ord_events", ord({
  t: [1, 3], d: 2, c: "understanding", marks: 2,
  stem: "Arrange these stages of *The Trees* in order (SOYL summary).",
  items: ["The indoor trees set off for the empty forest.", "Roots strain to free themselves from the veranda boards.", "Branches drag forward like dazed patients.", "The speaker writes letters, barely mentioning the departure.", "Window panes shatter and the trees lurch into the darkness.", "The moon seems to shatter in the top of the tallest tree."],
  sol: "Decision → struggle → simile → the quiet speaker → break-out → the shattered moon.",
}));
Q("ord_answer", ord({
  t: 4, d: 2, c: "application", marks: 2,
  stem: "Arrange the steps for answering a 40–50 word question on a symbol in *The Trees*.",
  items: ["Identify the symbol the question names.", "State what it stands for in one sentence.", "Describe the image in your own words.", "Link it to the poem's theme of freedom.", "Check the word count and remove any copied phrases."],
  sol: "Identify → meaning → image → theme → check.",
}));

Q("mt_words", match({
  t: 4, d: 2, c: "understanding", marks: 2,
  stem: "Match each word from *The Trees* with its meaning.",
  pairs: [["disengage", "free oneself; detach"], ["boughs", "large branches of a tree"], ["lichen", "crusty growth on bark and rocks"], ["exertion", "great physical effort"]],
  sol: "Single words from the poem with their meanings.",
}));
Q("mt_symbols", match({
  t: 3, d: 3, c: "analysis", marks: 2,
  stem: "Match each element of *The Trees* with what it suggests.",
  pairs: [["the house", "confinement"], ["the forest", "freedom and belonging"], ["the shattered panes", "barriers broken"], ["the speaker's silence", "quiet support"]],
  sol: "Each element carries part of the poem's meaning.",
}));
Q("mt_devices", match({
  t: 3, d: 3, c: "analysis", marks: 2,
  stem: "Match each feature of *The Trees* with the correct term.",
  pairs: [["roots labouring to pull free", "personification"], ["branches likened to dazed patients", "simile"], ["lines running on without a pause", "enjambment"], ["the scent of leaves drifting indoors", "olfactory imagery"]],
  sol: "Name the device by what it does in the poem.",
}));
