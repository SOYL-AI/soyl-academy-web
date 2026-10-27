// CBSE 10 English Language and Literature, ch20 "Fog" (Carl Sandburg) — question bank.
// LITERATURE RULE (CONTEXT §8): no line or phrase of the poem is reproduced; only the title and single words
// (haunches, harbour, city, silent) appear. The poem is so short that any paraphrase in order would rebuild
// it, so it is described by idea (the fog's arrival, its watching, its resting, its leaving) and the
// extended metaphor is explained, never quoted. Passages are SOYL commentary (passage_origin:
// soyl-commentary). build.mjs runs a short forbidden-phrase guard (ch18's src/guard.mjs).
import { Q, mcq, fb, short, long, tf, ar, match, ord, source, child } from "../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs";

const NOTE = "*(This passage is SOYL's commentary on the poem, not lines from it. Read the poem itself in your textbook, First Flight.)*";
const SRC_STEM = `Read the commentary on Carl Sandburg's *Fog* and answer the questions that follow. ${NOTE}`;
const SCHEME3 = [["Relevant point about the poem", 1], ["Explanation or interpretation linked to the question", 1], ["Expression and accuracy within 40–50 words", 1]];
const SCHEME2 = [["Correct point about the poem", 1], ["Explanation in own words within 30–40 words", 1]];
const LONG_SCHEME = [["Content: accurate points about the poem", 3], ["Interpretation / extrapolation: a clear, supported view", 1], ["Organisation and expression; within 100–120 words", 2]];

// ================================================================ extract-based (SOYL commentary)
Q("src_arrival", source({
  t: [1, 2], d: 2, c: "understanding", origin: "soyl-commentary",
  stem: SRC_STEM,
  passage: "Sandburg's poem is tiny, yet it gives the fog a whole personality. In the opening the fog does not roll in or descend like a curtain. It arrives the way a cat does: softly, on small, padded paws, so quietly that nobody hears it come. The poet never uses the word like. He simply lets the fog behave as a cat behaves, and the reader makes the connection. That is why the image feels so natural. Anyone who has watched a cat cross a room in silence will recognise the fog's arrival.",
  parts: [
    child("a", mcq({ t: 2, d: 1, c: "recall", stem: "In *Fog*, the fog is compared to which animal?", opts: ["a cat", "a dog", "a snake", "a horse"], sol: "The fog behaves like a cat." })),
    child("b", mcq({ t: 1, d: 2, c: "understanding", stem: "How does the fog arrive in Carl Sandburg's *Fog*, according to the commentary?", opts: ["softly and silently", "with a loud roar", "in sudden gusts", "with flashes of light"], sol: "It arrives quietly, like a cat on padded paws." })),
    child("c", fb({ t: 3, d: 2, c: "understanding", stem: "The commentary says the poet of *Fog* never uses the word ___ in the comparison.", acc: [["like"]], sol: "He never says **like**: the comparison is a metaphor, not a simile." })),
    child("d", short({ t: 3, d: 3, c: "analysis", marks: 1, stem: "Why does the image of the fog's arrival in *Fog* feel natural, according to the commentary?", model: "Anyone who has seen a cat move silently will recognise the same quiet arrival in fog.", sol: "Shared everyday experience of cats.", scheme: [["Readers know how quietly cats move", 1]] })),
    child("e", mcq({ t: 2, d: 2, c: "understanding", stem: "According to the commentary, what does Carl Sandburg give the fog in *Fog*?", opts: ["a whole personality", "a human voice", "a bright colour", "a name"], sol: "It is given a cat's personality." })),
  ],
  sol: "Answer from the commentary; parts (a) and (b) also follow from your reading of the poem.",
}));
Q("src_watching", source({
  t: [1, 3], d: 3, c: "analysis", origin: "soyl-commentary",
  stem: SRC_STEM,
  passage: "In the second stanza the fog stops moving. Like a cat that has found a good spot, it settles down and gazes out across the harbour and the city spread below. It rests on its back legs, perfectly still and perfectly quiet. A cat in this pose is calm but alert, watching everything and saying nothing. The fog, too, seems to observe the busy human world without taking part in it. For a while the whole scene belongs to it. Then, as suddenly as a cat that loses interest, it gets up and goes.",
  parts: [
    child("a", mcq({ t: 1, d: 1, c: "recall", stem: "What does the fog in *Fog* look out over?", opts: ["the harbour and the city", "a forest and a river", "a desert and a mountain", "a farm and a village"], sol: "It gazes across the harbour and the city." })),
    child("b", fb({ t: 4, d: 2, c: "understanding", stem: "The back legs and hips on which a sitting animal rests, as the fog does in *Fog*, are called its ___.", acc: [["haunches"]], sol: "They are its **haunches**." })),
    child("c", mcq({ t: 3, d: 2, c: "understanding", stem: "How is a cat in this pose described in the commentary on *Fog*?", opts: ["calm but alert", "angry and hungry", "sleepy and careless", "frightened and tense"], sol: "It is calm but watchful." })),
    child("d", short({ t: 2, d: 4, c: "analysis", marks: 1, stem: "What relationship between the fog and the human world does the commentary suggest in *Fog*?", model: "The fog watches the busy human world from outside, without taking part in it.", sol: "Detached observation.", scheme: [["Observes without taking part", 1]] })),
    child("e", mcq({ t: 1, d: 3, c: "analysis", stem: "How does the fog in Carl Sandburg's poem leave, according to the commentary?", opts: ["suddenly, like a cat that loses interest", "slowly, after a storm", "when the sun is very hot", "only when people ask it to"], sol: "It departs suddenly, as a cat might." })),
  ],
  sol: "Explain each cat-like action and what it suggests about fog.",
}));
Q("src_metaphor", source({
  t: [3, 2], d: 3, c: "analysis", origin: "soyl-commentary",
  stem: SRC_STEM,
  passage: "The whole poem rests on one comparison, carried from the first line to the last. This is called an extended metaphor. The fog is never described in scientific terms such as droplets, temperature or humidity. Instead it is seen entirely through a cat's habits: the silent approach, the still sitting, the steady gaze, the unexplained departure. The comparison works because fog and cats share real qualities. Both are quiet, both seem independent, and both come and go as they please, without asking anyone's permission.",
  parts: [
    child("a", mcq({ t: 3, d: 2, c: "understanding", stem: "A single comparison carried through a whole poem, as in *Fog*, is called…", opts: ["an extended metaphor", "a pun", "an oxymoron", "a refrain"], sol: "One comparison sustained throughout is an extended metaphor." })),
    child("b", mcq({ t: 3, d: 2, c: "understanding", stem: "Which kind of description does *Fog* avoid, according to the commentary?", opts: ["scientific terms", "animal habits", "pictures of a city", "quiet movement"], sol: "There is no talk of droplets or humidity." })),
    child("c", fb({ t: 2, d: 2, c: "understanding", stem: "The commentary says fog and cats both come and go as they ___.", acc: [["please"]], sol: "They come and go as they **please**." })),
    child("d", short({ t: 3, d: 4, c: "analysis", marks: 1, stem: "Why does the comparison in *Fog* work so well, according to the commentary?", model: "Fog and cats really share qualities: both are quiet, independent and unpredictable.", sol: "Shared real qualities.", scheme: [["Real shared qualities: quiet, independent, unpredictable", 1]] })),
    child("e", mcq({ t: 2, d: 3, c: "analysis", stem: "Which pair of qualities do the fog and the cat in *Fog* share, according to the commentary?", opts: ["quietness and independence", "noise and speed", "colour and size", "warmth and loyalty"], sol: "Both are quiet and seem independent." })),
  ],
  sol: "Name the device, then explain the shared qualities that make it work.",
}));
Q("src_form", source({
  t: [3, 4], d: 3, c: "analysis", origin: "soyl-commentary",
  stem: SRC_STEM,
  passage: "The poem is one of the shortest in your textbook: six short lines arranged in two stanzas, the first of two lines and the second of four. It has no rhyme and no regular rhythm. Sandburg wrote much of his poetry in free verse, using the plain words of everyday speech. Like the imagist poets of his time, he aimed to present one clear picture with no wasted words. The brevity suits the subject. Fog arrives and departs quickly, and the poem, too, is over almost before it begins.",
  parts: [
    child("a", fb({ t: 3, d: 1, c: "recall", stem: "Carl Sandburg's *Fog* has no rhyme and no regular rhythm; it is written in ___ verse.", acc: [["free"]], sol: "It is **free** verse." })),
    child("b", mcq({ t: 1, d: 1, c: "recall", stem: "How many stanzas does *Fog* have?", opts: ["two", "one", "three", "four"], sol: "Two stanzas: two lines, then four." })),
    child("c", mcq({ t: 3, d: 2, c: "understanding", stem: "Which aim does the commentary say Sandburg shared with the imagist poets in *Fog*?", opts: ["one clear picture with no wasted words", "long stories in rhyme", "complicated vocabulary", "strict metre"], sol: "Imagism valued a single, precise image." })),
    child("d", short({ t: 3, d: 4, c: "analysis", marks: 1, stem: "How does the brevity of *Fog* suit its subject?", model: "Fog arrives and departs quickly, and the short poem ends just as swiftly.", sol: "Form mirrors content.", scheme: [["Short poem = brief visit of fog", 1]] })),
    child("e", mcq({ t: 3, d: 2, c: "understanding", stem: "What kind of words does Sandburg use in *Fog*, according to the commentary?", opts: ["plain words of everyday speech", "old-fashioned poetic words", "technical scientific words", "words from other languages"], sol: "His language is simple and conversational." })),
  ],
  sol: "For form questions, name the verse form, describe the length and link it to the meaning.",
}));
Q("src_city", source({
  t: [2, 1], d: 3, c: "analysis", origin: "soyl-commentary",
  stem: SRC_STEM,
  passage: "Sandburg is often called a poet of the city, especially of Chicago, a busy industrial city on a great lake. In this poem, though, the city is silent. Ships, factories and crowds are never mentioned; we see only a harbour and a city lying beneath the fog. For a few moments nature takes over the human world. Then it leaves, and life presumably goes on. The poem quietly reminds us that, however large our cities grow, nature still visits them on its own terms, and we cannot control its coming or its going.",
  parts: [
    child("a", mcq({ t: 1, d: 2, c: "understanding", stem: "Carl Sandburg, the poet of *Fog*, is often linked with which city?", opts: ["Chicago", "London", "Dublin", "Sydney"], sol: "He is closely associated with Chicago." })),
    child("b", mcq({ t: 2, d: 3, c: "analysis", stem: "What does the commentary say happens to the human world in *Fog* for a few moments?", opts: ["Nature takes it over.", "It catches fire.", "It is flooded.", "It becomes noisier."], sol: "The fog briefly covers and dominates the city." })),
    child("c", fb({ t: 2, d: 2, c: "understanding", stem: "The commentary says nature visits our cities on its own ___.", acc: [["terms"]], sol: "Nature comes on its own **terms**." })),
    child("d", short({ t: 2, d: 4, c: "evaluation", marks: 1, stem: "What reminder does the commentary find in *Fog*?", model: "However large our cities grow, we cannot control when nature comes or goes.", sol: "Human limits before nature.", scheme: [["Humans cannot control nature", 1]] })),
    child("e", mcq({ t: 1, d: 2, c: "understanding", stem: "Which of these does Sandburg's *Fog* NOT mention, according to the commentary?", opts: ["ships and crowds", "a harbour", "a city", "the fog"], sol: "Ships, factories and crowds are absent." })),
  ],
  sol: "Theme questions: state the idea and support it from the poem in your own words.",
}));
Q("src_mood", source({
  t: [3, 2], d: 3, c: "evaluation", origin: "soyl-commentary",
  stem: SRC_STEM,
  passage: "Fog can be frightening. It hides roads, delays ships and makes familiar streets strange. Sandburg's poem does none of this. Its mood is calm, gentle and slightly mysterious. A cat is not a threatening animal; it is soft, graceful and self-contained. By choosing a cat rather than, say, a wolf or a ghost, the poet makes the fog seem peaceful and even charming. The reader is invited to watch the fog with the same quiet curiosity with which the fog itself watches the city.",
  parts: [
    child("a", mcq({ t: 3, d: 2, c: "understanding", stem: "Which word best describes the mood of *Fog*, according to the commentary?", opts: ["calm", "terrifying", "angry", "comic"], sol: "The mood is calm, gentle and slightly mysterious." })),
    child("b", mcq({ t: 3, d: 3, c: "analysis", stem: "Why does choosing a cat make Sandburg's fog seem peaceful?", opts: ["A cat is soft, graceful and not threatening.", "Cats are rare animals.", "Cats are very loud.", "Cats live only in cities."], sol: "The gentle animal sets a gentle mood." })),
    child("c", fb({ t: 3, d: 2, c: "understanding", stem: "The commentary says the reader watches the fog with quiet ___, just as the fog watches the city.", acc: [["curiosity"]], sol: "We watch with quiet **curiosity**." })),
    child("d", short({ t: 3, d: 4, c: "evaluation", marks: 1, stem: "How would the mood of *Fog* change if the fog were compared to a wolf, according to the commentary's argument?", model: "It would become threatening and frightening instead of calm and charming.", sol: "A predator brings menace.", scheme: [["Mood becomes threatening", 1]] })),
    child("e", mcq({ t: 2, d: 2, c: "understanding", stem: "Which real dangers of fog does the commentary say Sandburg's *Fog* leaves out?", opts: ["hidden roads and delayed ships", "floods and fires", "earthquakes", "heat waves"], sol: "The poem ignores fog's practical dangers." })),
  ],
  sol: "Mood questions: name the mood, then explain how the chosen comparison creates it.",
}));
Q("src_poet", source({
  t: [1, 4], d: 2, c: "understanding", origin: "soyl-commentary",
  stem: SRC_STEM,
  passage: "Carl Sandburg (1878–1967) grew up in Illinois, the son of Swedish immigrants, and worked at many jobs before he became famous as a poet and journalist. He won three Pulitzer Prizes: two for his poetry and one for a long biography of Abraham Lincoln. This poem first appeared in his collection Chicago Poems in 1916. Much of that book is loud and full of the energy of working life, which makes this small, quiet poem stand out. It shows a different side of a poet known for his big voice.",
  parts: [
    child("a", mcq({ t: 1, d: 1, c: "recall", stem: "Carl Sandburg, the poet of *Fog*, won how many Pulitzer Prizes?", opts: ["three", "one", "two", "none"], sol: "He won three: two for poetry, one for his Lincoln biography." })),
    child("b", mcq({ t: 1, d: 2, c: "understanding", stem: "In which collection did *Fog* first appear?", opts: ["*Chicago Poems*", "*New Hampshire*", "*Leaves of Grass*", "*The Waste Land*"], sol: "It appeared in *Chicago Poems* (1916)." })),
    child("c", fb({ t: 1, d: 2, c: "recall", stem: "Besides his poetry, the poet of *Fog* wrote a long biography of Abraham ___.", acc: [["Lincoln"]], sol: "He wrote a biography of Abraham **Lincoln**." })),
    child("d", short({ t: 1, d: 3, c: "analysis", marks: 1, stem: "Why does *Fog* stand out in its collection, according to the commentary?", model: "It is small and quiet, while much of that collection is loud and energetic.", sol: "Contrast with the collection.", scheme: [["Quiet poem in a loud collection", 1]] })),
    child("e", mcq({ t: 1, d: 2, c: "understanding", stem: "Where did Carl Sandburg, the poet of *Fog*, grow up?", opts: ["Illinois", "Ireland", "Wales", "California"], sol: "He grew up in Illinois." })),
  ],
  sol: "Background questions: answer from the commentary.",
}));

// ================================================================ short answers, 3 marks (40–50 words)
const SA3 = { marks: 3, wl: [40, 50], scheme: SCHEME3, time: 240 };
Q("sa_cat", short({
  ...SA3, t: 2, d: 3, c: "analysis",
  stem: "How is the fog compared to a cat in Carl Sandburg's *Fog*? Answer in 40–50 words.",
  model: "The fog behaves exactly like a cat. It arrives silently, as if on soft paws, then settles on its back legs and gazes over the harbour and the city. After a quiet pause it gets up and leaves without warning, just as an independent cat would.",
  sol: "The arrival + the sitting and watching + the departure, each linked to cat behaviour.",
}));
Q("sa_metaphor", short({
  ...SA3, t: 3, d: 3, c: "analysis",
  stem: "Why is the comparison in *Fog* called an extended metaphor and not a simile? Answer in 40–50 words.",
  model: "A simile compares using words such as like or as. Sandburg never does this; he simply lets the fog act as a cat would. Because this single comparison runs through the whole poem, from arrival to departure, it is an extended metaphor rather than a passing simile.",
  sol: "Definition of simile + what Sandburg does instead + why 'extended'.",
}));
Q("sa_arrival", short({
  ...SA3, t: 1, d: 2, c: "understanding",
  stem: "Describe the fog's arrival in the first stanza of *Fog*. What does the comparison suggest? Answer in 40–50 words.",
  model: "The fog creeps in as softly as a cat stepping on padded paws. Nobody hears it coming; it is simply there. The comparison suggests that fog arrives gradually, silently and almost secretly, taking the city by surprise without any noise or warning.",
  sol: "The arrival in own words + what the comparison suggests.",
}));
Q("sa_sitting", short({
  ...SA3, t: [1, 3], d: 3, c: "analysis",
  stem: "What picture of the fog does the second stanza of *Fog* create? Answer in 40–50 words.",
  model: "The fog is pictured resting like a cat on its back legs, silent and still, gazing out across the harbour and the city. It seems calm but watchful, in charge of the scene for a while. Then, without explanation, it rises and drifts away, as a restless cat might.",
  sol: "The pose + the gaze + the mood + the departure.",
}));
Q("sa_qualities", short({
  ...SA3, t: 2, d: 3, c: "analysis",
  stem: "Which qualities do fog and a cat share, according to Carl Sandburg's *Fog*? Answer in 40–50 words.",
  model: "Both move silently, so their arrival goes unnoticed. Both can stay still for long periods, quietly watching. Both are independent and unpredictable, leaving when they choose rather than when anyone expects. These shared qualities make the comparison feel natural and convincing to anyone who has watched a cat.",
  sol: "Silence + stillness + independence and unpredictability + effect.",
}));
Q("sa_free_verse", short({
  ...SA3, t: [3, 4], d: 3, c: "analysis",
  stem: "Comment on the form of *Fog* and explain why it suits the subject. Answer in 40–50 words.",
  model: "The poem has just six short lines in two stanzas, with no rhyme or regular rhythm. Its plain, spare language presents a single clear image. This brevity and quiet suit fog, which drifts in silently, lingers briefly and disappears. The poem itself ends almost as soon as it begins.",
  sol: "Length and verse form + language + how this suits fog.",
}));
Q("sa_nature", short({
  ...SA3, t: 2, d: 4, c: "evaluation",
  stem: "What does *Fog* suggest about nature and the human world? Answer in 40–50 words.",
  model: "The fog covers a harbour and a city, the products of human effort, yet it pays them no attention. It comes and goes entirely on its own schedule. Sandburg suggests that nature is independent of people and cannot be controlled, however large and busy human cities become.",
  sol: "Fog over the city + its indifference + the wider idea.",
}));
Q("sa_title", short({
  ...SA3, t: [2, 3], d: 3, c: "evaluation",
  stem: "Is *Fog* a suitable title for Carl Sandburg's poem? Give reasons in 40–50 words.",
  model: "Yes. The one-word title names the subject plainly, and its shortness matches a poem of only six lines. Because the poem never explains the comparison, the title tells us that the cat-like creature is really fog. Without it, readers might think they were reading about an actual cat.",
  sol: "A clear view + link to brevity + the title's role in decoding the metaphor.",
}));
Q("sa_devices", short({
  ...SA3, t: 3, d: 3, c: "analysis",
  stem: "Name two poetic devices used in *Fog* and explain their effect. Answer in 40–50 words.",
  model: "An extended metaphor presents the fog as a cat throughout, making something shapeless feel alive and familiar. Visual imagery shows the fog resting above a harbour and a city, so readers can picture the scene clearly. Together they turn ordinary weather into a quiet, graceful presence.",
  sol: "Two devices named + where they occur (described) + effect of each.",
}));
Q("sa_apply", short({
  ...SA3, t: 3, d: 3, c: "application",
  stem: "Following the method of *Fog*, describe another weather event as an animal, in 40–50 words of your own. Then name the device you have used.",
  model: "Monsoon rain is an elephant herd: it rumbles in from the hills, stamps across tin roofs, sprays the streets with its trunks and finally lumbers away, leaving muddy footprints everywhere. Device used: an extended metaphor, because the single comparison runs through the whole description, as in Sandburg's poem.",
  sol: "An original weather-animal comparison sustained across the description + the device named.",
}));
Q("sa_tone", short({
  ...SA3, t: 3, d: 3, c: "analysis",
  stem: "Describe the tone and mood of *Fog*. Answer in 40–50 words.",
  model: "The tone is calm, quiet and observant. Sandburg describes the fog gently, without fear or drama, as one might describe a cat seen from a window. The mood is peaceful and slightly mysterious, because the fog arrives and departs silently, for reasons nobody can know.",
  sol: "Tone + how it is created + the resulting mood.",
}));
Q("sa_transience", short({
  ...SA3, t: 2, d: 4, c: "evaluation",
  stem: "How does *Fog* show that some things in nature are temporary? Answer in 40–50 words.",
  model: "The fog arrives quietly, rests for a short while over the harbour and the city, and then leaves. It does not stay or return in the poem. This brief visit suggests that natural moments are passing, and that we should notice them while they last, before they vanish.",
  sol: "The brief visit + its departure + the idea of transience.",
}));

// ================================================================ short answers, 2 marks (30–40 words)
const SA2 = { marks: 2, wl: [30, 40], scheme: SCHEME2, time: 150 };
Q("sb_poet", short({
  ...SA2, t: 1, d: 1, c: "recall",
  stem: "Who wrote *Fog*? Mention two facts about the poet in 30–40 words.",
  model: "Carl Sandburg (1878–1967) wrote this poem. He was an American poet and journalist, famous for his poems about Chicago, and his biography of Abraham Lincoln earned one of his three Pulitzer Prizes.",
  sol: "Name + any two facts (American; 1878–1967; poet of Chicago; three Pulitzer Prizes; Lincoln biography).",
}));
Q("sb_haunches", short({
  ...SA2, t: [4, 2], d: 2, c: "understanding",
  stem: "What are *haunches*, and why does the word suit the fog in *Fog*? Answer in 30–40 words.",
  model: "Haunches are the hips and back legs on which an animal sits. The word suits the fog because it settles low and still over the city, just as a cat rests on its back legs.",
  sol: "Meaning + the link to the fog's settling.",
}));
Q("sb_leaves", short({
  ...SA2, t: 1, d: 2, c: "understanding",
  stem: "How does the fog leave at the end of Carl Sandburg's *Fog*, and what does this show? Answer in 30–40 words.",
  model: "After resting quietly, the fog simply gets up and goes, without any warning or reason given. This shows the independence of both fog and cats: they arrive and depart when they choose.",
  sol: "The manner of leaving + what it shows.",
}));
Q("sb_sees", short({
  ...SA2, t: 1, d: 1, c: "recall",
  stem: "What does the fog look out over in *Fog*, and in what position? Answer in 30–40 words.",
  model: "The fog gazes across a harbour and a city. It rests quietly on its back legs, the way a cat does when it settles down to watch the world below.",
  sol: "What it watches + its position.",
}));
Q("sb_short", short({
  ...SA2, t: 3, d: 2, c: "analysis",
  stem: "Why is Carl Sandburg's *Fog* so short? Give one reason in 30–40 words.",
  model: "The poem presents a single, clear image and nothing more, in the manner of imagist poetry. Its brevity also mirrors fog itself, which drifts in, lingers briefly and slips away.",
  sol: "One clear image + brevity mirrors the brief visit.",
}));
Q("sb_message", short({
  ...SA2, t: 2, d: 2, c: "understanding",
  stem: "State the central idea of *Fog* in 30–40 words.",
  model: "Fog arrives silently, watches over the harbour and the city for a while, and leaves, just as a cat does. Nature has its own quiet ways, and humans neither control nor fully understand its comings and goings.",
  sol: "The image + the wider idea about nature.",
}));

// ================================================================ long answers, 6 marks (100–120 words)
const LA = { marks: 6, wl: [100, 120], scheme: LONG_SCHEME, time: 720 };
Q("la_extended", long({
  ...LA, t: 3, d: 3, c: "analysis",
  stem: "Explain how Carl Sandburg develops the extended metaphor of the cat in *Fog*. Answer in 100–120 words.",
  model: "Fog is built on a single comparison that lasts from the first line to the last. Sandburg never says that the fog is like a cat; he simply makes it behave like one. In the first stanza it creeps in silently, as if on soft, padded paws. In the second it settles on its back legs, gazes calmly over the harbour and the city, and stays perfectly still. Finally it gets up and leaves without explanation, as an independent cat would. Each stage matches something real about fog: its quiet arrival, its stillness and its sudden disappearance. By sustaining one comparison, the poet turns shapeless weather into a living, graceful presence that readers can picture.",
  sol: "Define the device → stanza 1 → stanza 2 → the departure → how each stage matches real fog → the effect. Do not quote the poem.",
}));
Q("la_cat_diary", long({
  ...LA, t: [4, 2], d: 4, c: "application", bloom: "create",
  stem: "Imagine you are the fog in Carl Sandburg's *Fog*. Write a diary entry about your visit to the city, in 100–120 words.",
  model: "Early morning, by the lake\n\nI slipped in before dawn, so quietly that not even the gulls noticed. I like to arrive the way a cat crosses a room: soft-footed, unseen until I am already there. I found a good place above the harbour and settled down on my back legs to watch. Below me, ships waited and the city yawned awake. People hurried about, switching on lamps and grumbling about me, but I did not mind. I simply sat, still and silent, enjoying the view. Then, as the sun warmed my fur, I lost interest. I stood up, stretched and drifted away over the water. I may come back tomorrow. Nobody can tell me when.",
  sol: "Diary format (time marker, first person). Content fits the poem: silent arrival, sitting and watching the harbour and the city, sudden departure, independence. No lines quoted.",
}));
Q("la_nature_city", long({
  ...LA, t: 2, d: 4, c: "evaluation",
  stem: "Some readers feel *Fog* is about the relationship between nature and the modern city. Do you agree? Give a reasoned answer in 100–120 words.",
  model: "I agree that Fog quietly explores how nature and the modern city meet. Sandburg is known as a poet of Chicago, yet here the city is silent; we see only a harbour and buildings lying beneath the fog. Nature arrives, takes over the scene for a while and then leaves, without asking permission or paying attention to human plans. The fog is not hostile, since it is compared to a gentle cat, but it is independent. However, the poem is also simply a beautiful picture of weather, and readers can enjoy it without any deeper message. In my view, its strength is that it works on both levels, as an image and as a quiet reminder.",
  sol: "A clear view → evidence (silent city, independent fog) → a balancing point (a simple image) → conclusion.",
}));
Q("la_letter", long({
  ...LA, t: [3, 4], d: 3, c: "application", bloom: "create",
  stem: "Write a letter to a younger cousin explaining what an extended metaphor is, using *Fog* as your example, in 100–120 words.",
  model: "Dear Kabir,\n\nYou asked me what an extended metaphor is. Here is the easiest way I know to explain it. A metaphor describes one thing as if it were another, without using like or as. An extended metaphor keeps that comparison going for a long time. In our textbook there is a tiny poem, Fog, by Carl Sandburg. He never says that fog is like a cat. Instead, the fog creeps in silently, sits watching the harbour and the city, and then wanders off, just as a cat would. Because the comparison runs through the whole poem, it is an extended metaphor. Try writing one yourself about rain or wind!\n\nLove,\nTara",
  sol: "Informal letter format; a clear definition; the poem as an example in own words; an encouraging close.",
}));
Q("la_imagery", long({
  ...LA, t: [3, 1], d: 4, c: "analysis",
  stem: "How does Carl Sandburg create a vivid picture in so few words in *Fog*? Answer in 100–120 words.",
  model: "Sandburg uses only six short lines, yet the picture in Fog is vivid because every word does work. He chooses one familiar comparison, a cat, and lets readers supply what they already know about cats: their soft step, their stillness and their independence. He gives a few precise visual details, such as the fog resting on its back legs above a harbour and a city, rather than a long description. He avoids rhyme and decoration, writing in plain free verse, so nothing distracts from the image. Silence runs through the poem, matching the quiet of fog. This economy reflects the imagist ideal of presenting one clear picture, and it trusts readers to imagine the rest.",
  sol: "The single comparison → precise details → plain free verse → silence → imagist economy → conclusion.",
}));
Q("la_compare", long({
  ...LA, t: 2, d: 4, c: "evaluation",
  stem: "Fog is usually seen as a nuisance. How does *Fog* change the way we look at it? Answer in 100–120 words, with your own view.",
  model: "For most people, fog is a nuisance. It delays trains and flights, hides roads and causes accidents, especially in north Indian winters. Sandburg's Fog ignores these dangers entirely. By comparing fog to a cat, he makes it gentle, graceful and almost charming. It arrives softly, sits watching the harbour and the city, and leaves on its own terms. The poem asks us to look at fog with curiosity instead of irritation, as something beautiful in its own way. I think this is valuable, because poetry can help us notice the beauty in ordinary things. Still, we should remember that fog's dangers are real, and admire it from behind a careful steering wheel.",
  sol: "The usual view → how the poem changes it → the effect of the cat comparison → own view with a balancing point.",
}));

// ================================================================ objective items
Q("mc_poet", mcq({ t: 1, d: 1, c: "recall", stem: "Who wrote the poem *Fog* in *First Flight*?", opts: ["Carl Sandburg", "Adrienne Rich", "Robert Frost", "Ogden Nash"], sol: "Carl Sandburg, the American poet. The others wrote other poems in the Class 10 textbook." }));
Q("mc_nationality", mcq({ t: 1, d: 1, c: "recall", stem: "Carl Sandburg, the poet of *Fog*, was…", opts: ["American", "English", "Irish", "Australian"], sol: "Sandburg was American." }));
Q("mc_animal", mcq({ t: 2, d: 1, c: "recall", stem: "In Carl Sandburg's *Fog*, the fog behaves like…", opts: ["a cat", "a lion", "an eagle", "a fish"], sol: "Its actions are those of a cat." }));
Q("mc_device", mcq({ t: 3, d: 2, c: "understanding", stem: "The main device in *Fog*, a comparison carried through the whole poem, is…", opts: ["an extended metaphor", "alliteration", "a refrain", "a rhetorical question"], sol: "The fog-as-cat comparison is sustained throughout." }));
Q("mc_sound", mcq({ t: 1, d: 2, c: "understanding", stem: "How does the fog arrive in *Fog*?", opts: ["silently", "with thunder", "with a whistling wind", "with heavy rain"], sol: "It comes as quietly as a cat." }));
Q("mc_view", mcq({ t: 1, d: 2, c: "understanding", stem: "What does the fog watch in Carl Sandburg's poem?", opts: ["a harbour and a city", "a field of wheat", "a mountain lake", "a school playground"], sol: "It looks over the harbour and the city." }));
Q("mc_form", mcq({ t: 3, d: 2, c: "recall", stem: "Which statement about the form of *Fog* is correct?", opts: ["It is free verse in two short stanzas.", "It is a sonnet of fourteen lines.", "It is a ballad in rhyming quatrains.", "It is written in rhyming couplets."], sol: "Six short lines, two stanzas, no rhyme." }));
Q("mc_mood", mcq({ t: 3, d: 3, c: "analysis", stem: "Why does comparing fog to a cat in *Fog* create a peaceful mood?", opts: ["A cat is soft, graceful and quiet.", "A cat is dangerous at night.", "A cat is loud when hungry.", "A cat is a symbol of bad luck."], sol: "The gentle animal makes the fog seem gentle." }));
Q("mc_theme", mcq({ t: 2, d: 2, c: "understanding", stem: "Which is the central idea of *Fog*?", opts: ["Fog arrives and departs quietly, like an independent cat.", "Fog causes many accidents.", "Cats are afraid of fog.", "Cities should be built away from harbours."], sol: "The poem is a single image of fog as a cat." }));
Q("mc_apply", mcq({ t: 3, d: 3, c: "application", stem: "Which SOYL-written sentence uses the same technique as *Fog*?", opts: ["The wind is a wolf: it howls at the door, prowls the lanes and slinks off at dawn.", "The wind was very strong today.", "The wind blew like a fan.", "Wind is moving air caused by differences in pressure."], sol: "A single comparison sustained across actions is an extended metaphor." }));
Q("mc_departure", mcq({ t: 2, d: 3, c: "analysis", stem: "What does the fog's sudden departure in *Fog* suggest?", opts: ["Nature is independent and cannot be controlled.", "The fog is afraid of the city.", "Someone has chased the fog away.", "The fog has finished a job."], sol: "Like a cat, it leaves when it chooses." }));
Q("mc_collection", mcq({ t: 1, d: 2, c: "understanding", stem: "*Fog* first appeared in which collection by Carl Sandburg?", opts: ["*Chicago Poems*", "*The Waste Land*", "*Leaves of Grass*", "*Songs of Innocence*"], sol: "It appeared in *Chicago Poems* (1916)." }));
Q("mc_imagism", mcq({ t: 3, d: 3, c: "analysis", stem: "Why can *Fog* be compared to imagist poetry?", opts: ["It presents one clear picture in plain, few words.", "It tells a long story in rhyme.", "It uses a regular metre.", "It uses many abstract ideas."], sol: "Imagism valued precise, economical images." }));
Q("mc_title", mcq({ t: 2, d: 3, c: "analysis", stem: "Why is the title essential to understanding Carl Sandburg's *Fog*?", fixed: true, key: "c", opts: ["It names the city where the poem is set.", "It tells us the poem's rhyme scheme.", "It reveals that the cat-like creature is fog.", "It gives the name of the cat."], sol: "Without the title, readers might think the poem was about a real cat." }));

Q("fb_free", fb({ t: 3, d: 1, c: "recall", marks: 1, stem: "Sandburg's *Fog* is written in ___ verse and has ___ stanzas.", acc: [["free"], ["two", "2"]], sol: "**Free** verse in **two** stanzas.", scheme: [["free", 0.5], ["two", 0.5]] }));
Q("fb_metaphor", fb({ t: 3, d: 2, c: "understanding", stem: "A comparison without *like* or *as* that is sustained through a whole poem, as in *Fog*, is an extended ___.", acc: [["metaphor"]], sol: "It is an extended **metaphor**." }));
Q("fb_poet", fb({ t: 1, d: 1, c: "recall", stem: "*Fog* was written by the American poet Carl ___.", acc: [["Sandburg"]], sol: "The poet is Carl **Sandburg**." }));
Q("fb_haunches", fb({ t: 4, d: 2, c: "understanding", stem: "In *Fog*, the fog rests on its ___, the hips and back legs of a sitting animal.", acc: [["haunches"]], sol: "It rests on its **haunches**." }));

Q("ar_metaphor", ar({ t: 3, d: 3, c: "analysis", a: "The comparison in *Fog* is a metaphor, not a simile.", r: "Carl Sandburg does not use *like* or *as* to compare the fog to a cat.", key: "a", sol: "Both are true, and R explains A: a comparison without like or as is a metaphor." }));
Q("ar_rhyme", ar({ t: 3, d: 2, c: "understanding", a: "*Fog* has a regular rhyme scheme.", r: "*Fog* is a very short poem.", key: "d", sol: "A is false: the poem does not rhyme. R is true." }));
Q("ar_city", ar({ t: 2, d: 3, c: "analysis", a: "In *Fog*, the fog gazes over a harbour and a city.", r: "Carl Sandburg wrote a biography of Abraham Lincoln.", key: "b", sol: "Both are true, but R has nothing to do with A." }));
Q("ar_noise", ar({ t: 1, d: 2, c: "understanding", a: "The fog in *Fog* arrives silently.", r: "In *Fog*, the fog is compared to a barking dog.", key: "c", sol: "A is true. R is false: the fog is compared to a cat." }));

Q("tf_silent", tf({ t: 1, d: 1, c: "recall", stem: "True or false: in *Fog*, the fog arrives with a loud noise.", ans: false, sol: "It arrives silently, like a cat." }));
Q("tf_stays", tf({ t: 1, d: 2, c: "understanding", stem: "True or false: at the end of *Fog*, the fog stays over the city for ever.", ans: false, sol: "It leaves after a while." }));
Q("tf_like", tf({ t: 3, d: 2, c: "understanding", stem: "True or false: Carl Sandburg's *Fog* uses no rhyme.", ans: true, sol: "It is free verse without rhyme." }));
Q("tf_still", tf({ t: 1, d: 1, c: "recall", stem: "True or false: in *Fog*, the fog sits still while it watches.", ans: true, sol: "It rests quietly on its back legs, watching." }));

Q("ord_actions", ord({
  t: [1, 2], d: 2, c: "understanding", marks: 2,
  stem: "Arrange the fog's actions in Carl Sandburg's *Fog* in order (SOYL summary).",
  items: ["It arrives silently, as if on soft paws.", "It settles on its back legs.", "It gazes over the harbour and the city.", "It gets up and leaves."],
  sol: "Arrival → settling → watching → departure.",
}));
Q("ord_answer", ord({
  t: 4, d: 2, c: "application", marks: 2,
  stem: "Arrange the steps for answering a 40–50 word question on the comparison in *Fog*.",
  items: ["Name the device: an extended metaphor.", "Say what the fog is compared to.", "Give each cat-like action in your own words.", "Explain what the comparison shows about fog.", "Check the word count and remove any copied phrases."],
  sol: "Device → comparison → actions → meaning → check.",
}));

Q("mt_cat_fog", match({
  t: 2, d: 2, c: "analysis", marks: 2,
  stem: "Match each cat-like action in *Fog* with the quality of fog it suggests.",
  pairs: [["arriving on soft paws", "fog arrives silently"], ["sitting very still", "fog lingers without moving"], ["gazing over the scene", "fog covers and overlooks the city"], ["leaving without warning", "fog lifts unpredictably"]],
  sol: "Each cat action matches something real about fog.",
}));
Q("mt_terms", match({
  t: 3, d: 3, c: "analysis", marks: 2,
  stem: "Match each feature of Carl Sandburg's *Fog* with the correct term.",
  pairs: [["the fog behaving as a cat throughout", "extended metaphor"], ["no rhyme or regular rhythm", "free verse"], ["one clear picture in few, plain words", "imagism"], ["the fog seen over a harbour and a city", "visual imagery"]],
  sol: "Name each feature by its term.",
}));
Q("mt_words", match({
  t: 4, d: 2, c: "understanding", marks: 2,
  stem: "Match each word used in discussing *Fog* with its meaning.",
  pairs: [["haunches", "the hips and back legs of a sitting animal"], ["harbour", "a sheltered stretch of water for ships"], ["transience", "the quality of lasting only a short time"], ["imagism", "a style that presents one precise image"]],
  sol: "Words from and about the poem.",
}));
