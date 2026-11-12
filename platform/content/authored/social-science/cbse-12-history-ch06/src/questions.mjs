// CBSE 12 History, ch06 Bhakti-Sufi Traditions: Changes in Religious Beliefs and Devotional Texts (c. 8th-18th
// centuries), question bank. Every source passage is an imagined document or a SOYL summary written in SOYL's
// own words and labelled as such. No verse of the Alvars, Nayanars, Basavanna, Kabir, Guru Nanak (or the Guru
// Granth Sahib), Mirabai, Amir Khusrau or any Sufi text is quoted, translated or closely paraphrased; no NCERT
// text, source box, caption, map or exercise and no board or sample-paper item is reused (D-036). Every tradition
// is described respectfully and factually, as historians study it; no faith is ranked or judged; hostility between
// groups is mentioned briefly and without loaded words; debates (Kabir's birth, how far the Tamil saints opposed
// caste, the details of Mirabai's life) are presented as debates. Places are named in words only: no map work (OA-23).
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child } from '../../cbse-12-history-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
const IMAG = '*(Imagined document written by SOYL for practice; the people in it are not real, though the evidence and events in the background are.)*';
const SUM = '*(Summary written by SOYL in its own words for practice; it is not a quotation or translation of any source.)*';

// ================================================================ t01 A mosaic of beliefs; integration of cults
Q('m_jag', mcq({
  t: 1, d: 1, c: 'recall',
  stem: `At Puri in Odisha, the local deity Jagannatha came to be identified with which major deity of the Puranic tradition?`,
  opts: [`Vishnu`, `Shiva`, `Ganesha`, `Surya`],
  sol: `Puri is the standard example of a local deity being brought within a Vaishnava framework. The other deities are linked with different shrines and traditions.`,
}));
Q('m_cult_two_way', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Which statement best describes how historians now view the meeting of Puranic traditions and local cults?`,
  opts: [
    `Both sides changed: Puranic priests and texts absorbed local deities and customs, while local worshippers reshaped what they received`,
    `Only the local cults changed, and the Puranic tradition stayed exactly as it was`,
    `Local cults disappeared wherever Puranic temples were built`,
    `The two traditions developed in complete isolation from each other`,
  ],
  sol: `The picture is one of exchange in both directions. Any option that makes the traffic one-way, or denies contact, leaves out the examples of identification and of local practice entering temple worship.`,
}));
Q('m_goddess_case', mcq({
  t: 1, d: 3, c: 'application',
  stem: `An imagined district has two records of one goddess. A twelfth-century temple register calls her a form of Parvati, consort of Shiva. Songs at her village festival use a local name, praise her as guardian of the grain stores, and are sung by groups who do not enter the main temple. Which conclusion best uses the idea of great and little traditions?`,
  opts: [
    `Her worship shows both at work: a Sanskritic identity as consort of a major deity and a local identity, kept side by side without either erasing the other`,
    `The temple priests must have introduced her to the district from outside, since the register is the older record`,
    `The village songs prove that the register is mistaken about her identity`,
    `The register shows that little traditions are always older than any great tradition in a region`,
  ],
  sol: `Two kinds of evidence describe the same figure in different languages of worship. Neither record alone shows which came first, so claims about priority or error go beyond the evidence.`,
}));
Q('m_cult_weaken', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: `Historians say that integration of cults was a two-way process in which local practice also changed Puranic worship. Which finding about an imagined temple would most weaken this view for that temple?`,
  opts: [
    `Records over three centuries showing that every offering, festival song and calendar date was fixed from Sanskrit texts by priests, with no local practice ever adopted`,
    `A harvest rite of the nearby villages that has been added to the temple's yearly calendar`,
    `A local deity named in a Sanskrit hymn composed by the temple priests`,
    `A festival at which priests and villagers both take part`,
  ],
  sol: `To weaken a claim about exchange, the evidence must show no exchange at all. The other three findings are examples of just the borrowing that the claim describes.`,
}));
Q('m_tantra', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Which evidence would best show that Tantric practice in an imagined region drew followers from outside the privileged groups?`,
  opts: [
    `Records of initiation that list women and people of several castes among the practitioners`,
    `A Sanskrit treatise on Tantric ritual written by a court scholar`,
    `A royal grant to a temple of a major deity`,
    `A list of the region's kings`,
  ],
  sol: `The claim is about who took part, so it needs evidence that names the participants. A learned treatise, a grant or a list of rulers says nothing about who the followers were.`,
}));
Q('fb_redfield', fb({
  t: 1, d: 1, c: 'recall',
  stem: `Historians use the terms great tradition and little traditions, an idea associated with the sociologist Robert ___.`,
  acc: [[`Redfield`]],
  sol: `The sociologist was Robert Redfield.`,
}));
Q('tf_cults', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: `True or false? Historians hold that in the integration of cults, ideas flowed only from Puranic traditions to local ones and never the other way.`,
  sol: `Exchange went in both directions, so a one-way picture is wrong.`,
}));
Q('ar_tantra', ar({
  t: 1, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: `Tantric practices attracted followers who stood outside the privileged groups of their society.`,
  r: `Tantric practices were open to women and men and often ignored caste and class.`,
  sol: `Openness to those left out elsewhere is exactly what makes the pull on such followers understandable.`,
}));
Q('s_cult_explain', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `Explain what historians mean by a great tradition and little traditions, and give one example of the two meeting.`,
  model: `A **great tradition** is the Sanskritic, Puranic worship of the learned and the priests; **little traditions** are the many local cults and customs of communities. They interacted: for example, the local deity of **Puri**, Jagannatha, came to be identified with **Vishnu**.`,
  sol: `The two terms with one example of identification.`,
  scheme: [[`Meaning of great and little traditions`, 1], [`One example of interaction`, 1]],
}));
Q('s3_cult_test', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `A historian suspects that a deity worshipped in an imagined coastal town was originally local and was later identified with a Puranic deity. State three kinds of evidence she should look for, saying what each could show.`,
  model: `(1) **Early inscriptions or shrine remains** that name the deity by a local name before any link to a Puranic deity, which would show an older local identity. (2) **Later Sanskrit texts or temple records** that give the deity a Puranic name or family, which would show when the identification was made. (3) **Local songs and festival customs**, which would show whether older practice carried on beside the temple ritual.`,
  sol: `Three sources that bear on the order of events, each with what it could reveal.`,
  scheme: [[`Early local evidence and what it shows`, 1], [`Later texts or records and what they show`, 1], [`Local customs and what they show`, 1]],
}));
Q('l_cults', long({
  t: 1, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: `Explain how Puranic traditions and local cults interacted between about the eighth and the eighteenth centuries, with examples.`,
  model: `1. **Many beliefs:** the period shows a mosaic of religious ideas and practices, with many deities and cults in different regions.\n2. **Absorption:** Puranic traditions took in local deities; at Puri the local deity Jagannatha came to be identified with Vishnu.\n3. **Goddesses:** local goddesses were linked with the consorts of major deities, for example Parvati or Lakshmi.\n4. **Two-way exchange:** historians following Robert Redfield speak of a great tradition and little traditions that influenced each other.\n5. **Tantric practice:** it was open to women and men and often ignored caste and class; tensions and debates also existed.`,
  sol: `Background, absorption, goddesses, two-way exchange and the Tantric strand with its debates.`,
  scheme: [[`A mosaic of beliefs`, 1], [`Absorption with Jagannatha`, 1], [`Goddesses and consorts`, 1], [`Great and little traditions`, 1], [`Tantric practices and debates`, 1]],
}));
Q('sb_two_names', source({
  t: [1, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the two imagined documents about one hill shrine and answer the questions that follow. ${IMAG}`,
  passage: `**Two imagined documents about one hill shrine**\n\n*Document 1, a summary of a temple register of the twelfth century:* The shrine at the hill crossing is the home of Bhadra Devi, a form of Parvati, wife of Shiva. The register lists the field revenue set aside by a local chieftain for her daily worship and the names of the Brahmana priests who recite Sanskrit hymns before her image.\n\n*Document 2, field notes of a district schoolteacher:* In the month of ploughing, herders and potters climb the hill with clay horses on their shoulders. They call the goddess the Mother of the Pass and sing songs, in their own speech, about her guarding cattle on the roads. The priests do not join the climb, but they open the shrine at dawn and accept the clay horses at the door.`,
  parts: [
    child('a', short({ t: 1, d: 1, c: 'recall', marks: 1, stem: `What term do historians use for the practices of local communities, as distinct from the Sanskritic tradition of the priests?`, model: `**Little traditions**, set against the great tradition.`, sol: `The pair of terms comes from the study of how local and learned worship meet.`, scheme: [[`Little traditions`, 1]] })),
    child('b', short({ t: 1, d: 3, c: 'analysis', marks: 1, stem: `The priests take no part in the climb but accept the clay horses at the door. What does this suggest about how the two groups relate to the festival?`, model: `The festival belongs to the village groups, but the temple has taken their offering into its own ritual, so the two overlap without one replacing the other.`, sol: `Read the priests' action as a sign of overlap, not of ownership.`, scheme: [[`Overlap without replacement`, 1]] })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: `**Either** (i): Suggest two further kinds of evidence a historian would need to decide whether the goddess was first a local deity whom the priests later linked with Parvati.`, model: `(1) **Older inscriptions or remains at the site** that name her by a local name before the register's description. (2) **Older festival songs or customs** that show an identity independent of Parvati.`, sol: `Two kinds of evidence that could show an earlier, separate identity.`, scheme: [[`Earlier written or material evidence`, 1], [`Older oral or festival evidence`, 1]] }),
    [short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: `**Or** (ii): Explain two ways in which both documents could be accurate although they describe the goddess so differently.`, model: `(1) They have **different purposes**: the register records the temple's formal identity and revenue, while the teacher records village practice. (2) A deity can be known **by more than one name** at once, so each group may be describing the same worship in its own terms.`, sol: `Different purposes and different names for one worship.`, scheme: [[`Different purposes of the documents`, 1], [`One deity, two names`, 1]] })]),
  ],
}));

// ================================================================ t02 Alvars, Nayanars and Virashaivas
Q('mt_tamil', match({
  t: 2, d: 1, c: 'recall',
  stem: `Match each southern name with the correct description.`,
  pairs: [
    [`Alvars`, `Devotees of Vishnu whose hymns were compiled in the Nalayira Divyaprabandham`],
    [`Nayanars`, `Devotees of Shiva whose hymns were compiled in the Tevaram`],
    [`Basavanna`, `Minister at a Kalachuri court and a leader of the Virashaivas`],
    [`Karaikkal Ammaiyar`, `A woman devotee of Shiva among the Tamil saints`],
  ],
  sol: `Each description is the one by which the name is usually introduced in the study of south Indian bhakti.`,
}));
Q('fb_tamil', fb({
  t: 2, d: 1, c: 'recall',
  stem: `The hymns of the Alvars were compiled in the ___, often called the Tamil Veda, and those of the Nayanars in the ___.`,
  acc: [[`Nalayira Divyaprabandham`, `Divyaprabandham`, `Divya Prabandham`], [`Tevaram`]],
  sol: `The Alvar collection is the Nalayira Divyaprabandham and the Nayanar collection is the Tevaram.`,
}));
Q('tf_travel', tf({
  t: 2, d: 1, c: 'understanding', ans: false,
  stem: `True or false? The Alvars and Nayanars stayed within a single temple and did not travel.`,
  sol: `They went from shrine to shrine, composing hymns as they went.`,
}));
Q('m_women_saints', mcq({
  t: 2, d: 1, c: 'recall',
  stem: `Andal is remembered as a woman devotee among which group of Tamil saints?`,
  opts: [`The Alvars`, `The Nayanars`, `The Virashaivas`, `The Chishtis`],
  sol: `Andal was an Alvar. Karaikkal Ammaiyar is the woman among the Nayanars, and the Chishtis were a Sufi order.`,
}));
Q('m_chola_land', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: `A Chola land grant to a temple and a Nayanar hymn both survive from the same town. Which question can the grant answer that the hymn cannot?`,
  opts: [
    `Which ruler gave how much land, and for what upkeep of the temple`,
    `How a saint expressed his devotion to Shiva`,
    `What the saint thought about caste`,
    `To which tune the hymn was sung`,
  ],
  sol: `Match each source to what it was made to record. A grant records gift, donor and purpose; a hymn records a devotee's words and music, so the other three questions belong to the hymn.`,
}));
Q('m_hostile', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `Some Tamil devotional compositions express hostility towards Buddhists and Jainas. What is the best-supported way for a historian to read this?`,
  opts: [
    `As a sign of rivalry, including competition for the support of rulers, which shows the saints' attitudes but not all relations between communities`,
    `As proof that Buddhists and Jainas were persecuted everywhere in the Tamil region at all times`,
    `As proof that the saints took no interest in kings or patronage`,
    `As evidence that Buddhism and Jainism had no followers there`,
  ],
  sol: `A hostile composition records one side's view of a rivalry. It cannot be stretched into a claim about every community or every period.`,
}));
Q('m_bronze_fit', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: `A historian has a Chola-period bronze image of Shiva, a collection of Nayanar hymns and a temple land-grant inscription. For which question is the bronze image the most useful evidence?`,
  opts: [
    `How artisans of the period imagined and gave metal form to the deity for worship`,
    `How much land supported the daily worship of a particular temple`,
    `Which hymns were sung by the saints as they travelled`,
    `Which ruler made a gift to a particular shrine`,
  ],
  sol: `An image speaks best about how a deity was visualised and crafted. Land, hymns and donors are better answered by the inscription and the hymn collection.`,
}));
Q('m_caste_limit', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: `Which new finding would most support the view that the Tamil saints' opposition to caste did not greatly change social practice?`,
  opts: [
    `Temple records showing that saints from artisan and cultivator families were honoured in festivals, while entry to the inner shrine and temple office still depended on birth`,
    `Further hymns of the same saints that criticise distinctions of birth`,
    `Evidence that one of the saints came from a cultivator family`,
    `A copy of a hymn collection in a newer script`,
  ],
  sol: `The claim concerns practice, so it needs evidence on who held rights and offices. More hymns, the saints' origins or a new script say nothing about what temples actually allowed.`,
}));
Q('m_vira_basavanna', mcq({
  t: 2, d: 1, c: 'recall',
  stem: `Basavanna, associated with the rise of the Virashaivas in the twelfth century, served as a minister at the court of a`,
  opts: [`Kalachuri king`, `Chola king`, `Pallava king`, `Sultan of Delhi`],
  sol: `He held office under a Kalachuri ruler in Karnataka. The Chola and Pallava dynasties ruled mainly in the Tamil region.`,
}));
Q('m_vira_criteria', mcq({
  t: 2, d: 3, c: 'application',
  stem: `A historian describes four imagined communities. Which one fits the Virashaiva tradition of twelfth-century Karnataka best?`,
  opts: [
    `Worship Shiva as a linga often worn on the body, have wandering teachers, question caste and pollution, allow widow remarriage, bury their dead and compose in Kannada`,
    `Worship Vishnu in image form, travel from shrine to shrine, compose hymns in Tamil and question caste`,
    `Worship Shiva as a linga but cremate their dead, uphold rules of caste purity and compose only in Sanskrit`,
    `Pray to a formless Absolute, reject all images, compose hymns in Punjabi and sing them in ragas`,
  ],
  sol: `Check the features one by one: only one community matches the deity, the emblem, the burial, the challenge to caste and the regional language together. Each of the others matches only some.`,
}));
Q('ar_caste_caution', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: `Tamil devotional compositions alone cannot show how far caste distinctions actually weakened in daily life.`,
  r: `Some of the Alvars and Nayanars came from cultivator and artisan castes, and some from groups regarded as untouchable.`,
  sol: `Both statements are true. The caution rests on what kind of source a hymn is and on the debate over its effects, not on the origins of the saints, so R does not account for A.`,
}));
Q('s_tamil_apply', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: `An imagined note describes a singer who travels from shrine to shrine, composes hymns in a regional language in praise of one deity, and comes from a cultivator family. The note does not name the region or the century. Does the singer fit the pattern of the Alvars and Nayanars? Give two criteria and one limit.`,
  model: `**Fits in features:** wandering from shrine to shrine, composing devotional hymns and a non-elite origin match what is known of the Tamil saints. **Limit:** without the region, language and period the note cannot show that the singer was an Alvar or Nayanar, since other devotional singers resembled them.`,
  sol: `Two matching criteria and the missing details that prevent a firm identification.`,
  scheme: [[`Two matching features`, 1], [`A limit stated`, 1]],
}));
Q('s_vira', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `Name two ways in which the Virashaivas challenged the social practices of their time.`,
  model: `(1) They **questioned caste and the idea of pollution**, as well as belief in rebirth. (2) They supported **marriage after puberty and the remarriage of widows**, and they buried their dead instead of cremating them.`,
  sol: `Two challenges to social practice, each stated clearly.`,
  scheme: [[`Challenge to caste, pollution or rebirth`, 1], [`Marriage practice or burial`, 1]],
}));
Q('s_bronze_apply', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: `An imagined museum label says that a bronze image of Shiva was cast in a Chola-ruled town, was carried round the town in festivals and was paid for by a gift from a queen. State one conclusion about patronage and one thing the label cannot show.`,
  model: `**Conclusion:** members of the ruling family supported temple worship and the craft of making bronzes, which agrees with Chola patronage. **Limit:** one label cannot show how ordinary worshippers felt, or how typical such a gift was among all donors.`,
  sol: `A conclusion about royal support and a limit set by a single object.`,
  scheme: [[`Conclusion on patronage`, 1], [`One limit`, 1]],
}));
Q('s3_chola', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: `A historian finds that most surviving Chola-period bronze images of Shiva come from temples that received royal land grants. Suggest three possible explanations for this pattern.`,
  model: `(1) **Royal grants paid for the casting of the images** and for the festivals in which they were carried, so such temples had more bronzes. (2) **Well-endowed temples could keep and protect** their images better, so more of them survive. (3) **Royal temples are better recorded and studied**, so their images are better known; images of smaller shrines may have been lost, melted down or never recorded.`,
  sol: `Patronage, survival and record-keeping each offer a separate route to the same pattern.`,
  scheme: [[`Grants paid for images and festivals`, 1], [`Better survival in endowed temples`, 1], [`Better recording of royal temples`, 1]],
}));
Q('l_tamil_assess', long({
  t: 2, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `Assess how far the Alvars and Nayanars challenged the caste order of their time, using what is known about who they were, what they composed and how they related to rulers.`,
  model: `1. **Who they were:** some came from cultivator, artisan and so-called untouchable castes, so the tradition was not confined to the learned.\n2. **Compositions:** several hymns opposed caste distinctions, and the saints sang in Tamil, which gave their devotion a wide audience.\n3. **Limits:** historians debate how far this changed practice, because hymns record ideals and were compiled later.\n4. **Patronage:** the Cholas gave land and built temples, so the tradition also rested on royal and Brahmanical support.\n5. **Judgement:** the saints widened who could belong to devotion, but the evidence for a lasting change in caste practice is uncertain.`,
  sol: `Origins, compositions, the limits of the evidence, patronage and a weighed conclusion.`,
  scheme: [[`Origins of the saints`, 1], [`What the compositions did`, 1], [`Limits of the evidence`, 1], [`Role of patronage`, 1], [`Reasoned judgement`, 1]],
}));
Q('sb_vachana', source({
  t: [2, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, a summary of what a kind of text contains, and answer the questions that follow. ${SUM}`,
  passage: `**What a collection of vachanas contains (summary)**\n\nA vachana collection of the kind used by historians of the Virashaiva tradition gathers short sayings in the language of the people of Karnataka, made by many composers from different walks of life, among them craftworkers and women. The sayings were arranged by theme and by composer, and short accounts of the composers' lives were added, by followers who lived some generations later. Many sayings criticise rituals performed for show, and some question whether birth decides a person's worth, while they praise devotion to Shiva.`,
  parts: [
    child('a', short({ t: 2, d: 1, c: 'recall', marks: 1, stem: `Name the leader of the Virashaivas who served as a minister at the court of a Kalachuri king.`, model: `**Basavanna.**`, sol: `He is the figure most closely associated with the rise of the tradition in the twelfth century.`, scheme: [[`Basavanna`, 1]] })),
    child('b', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: `The accounts of the composers' lives were added by followers of later generations. What does this suggest about how far those accounts can be trusted as evidence of the composers' own times?`, model: `They reflect how **later followers remembered and admired** the composers, so they may contain legend and need checking against other evidence.`, sol: `Link the distance in time and the followers' devotion to the reliability of the life stories.`, scheme: [[`Later memory and admiration limit reliability`, 1]] })),
    child('c', short({ t: 2, d: 3, c: 'application', marks: 2, stem: `**Either** (i): Two collections place the same saying under different composers' names. Give two steps a historian could take before deciding who composed it.`, model: `(1) **Compare the manuscripts**, noting which is earlier and how each was compiled. (2) **Look at the language and ideas** of the saying beside those of the two composers' other compositions, and treat the attribution as uncertain if nothing settles it.`, sol: `Two checks on attribution that go beyond the label in either collection.`, scheme: [[`Compare the manuscripts`, 1], [`Compare language and ideas`, 1]] }),
    [short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: `**Or** (ii): Give two reasons why a collection arranged by later followers is still valuable to a historian of the Virashaiva tradition.`, model: `(1) It preserves the **ideas that followers associated with the tradition**, such as the criticism of show in ritual and of birth as a measure of worth. (2) It shows **who the tradition counted among its composers**, including craftworkers and women, and how later generations remembered them.`, sol: `Two kinds of value that survive despite later arrangement.`, scheme: [[`Ideas associated with the tradition`, 1], [`Composers and later memory`, 1]] })]),
  ],
}));

// ================================================================ t03 Islamic traditions and Sufism
Q('m_pillars', mcq({
  t: 3, d: 1, c: 'recall',
  stem: `Which of the following is one of the five pillars of Islam as commonly taught?`,
  opts: [`Zakat, the giving of a share of one's wealth to charity`, `Ziyarat, the visit to a saint's tomb`, `Zikr, the remembrance of God in a gathering`, `Sama', a musical gathering`],
  sol: `Zakat is a pillar. Ziyarat, zikr and sama' are practices of the Sufi tradition and not among the five pillars.`,
}));
Q('m_khojah', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: `The Khojahs (Ismailis) of western India used ginan. What were ginan?`,
  opts: [`Devotional songs in local languages`, `Legal rulings issued in Arabic`, `Royal grants of land`, `Inscriptions on tombs`],
  sol: `Ginan show a community expressing its faith in regional languages. They were songs, not orders or inscriptions.`,
}));
Q('m_mosque_apply', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: `An imagined report describes two mosques of one century. Mosque X, in a region of heavy rain, has a steeply sloping tiled roof. Mosque Y, in a river delta where stone is scarce, is built of baked brick. Both have a niche in the wall facing Mecca (the mihrab) and a raised pulpit (the minbar). Which statement is best?`,
  opts: [
    `The niche and the pulpit are features shared by mosques generally, while the roof form and the building material reflect local climate and resources`,
    `All four features are regional and have nothing to do with the faith`,
    `All four features are universal, so the mosques cannot differ from each other`,
    `The roof and the brick show that the buildings were not used for worship`,
  ],
  sol: `Sort the features by whether they serve worship everywhere or depend on place. Orientation and the pulpit belong to the first group; roof and material to the second.`,
}));
Q('m_label_infer', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: `An imagined thirteenth-century record in Sanskrit calls a trader a Tajika. What should a historian most carefully conclude?`,
  opts: [
    `The word most likely points to his place of origin or language community, and should not be read as the modern category Muslim without further evidence`,
    `The record proves that he was born in a particular named city`,
    `The word means a follower of a particular religion in exactly the modern sense`,
    `The record is worthless because it is written in Sanskrit`,
  ],
  sol: `People of the period were usually named by place of origin or language, so a label of this kind is a clue to origin first. It does not carry the meaning that the later words Hindu and Muslim came to have.`,
}));
Q('m_silsila_inf', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: `A historian studies a silsila chart of the Chishti order that lists shaikhs from Ajmer to Delhi, then to Ajodhan and then to Ghiyaspur. What can she most reasonably infer from the chart alone?`,
  opts: [
    `That authority to teach was traced through a line of teacher and disciple across several places, which helps her follow the spread of the order, though not the number of followers`,
    `The number of followers each shaikh had in his town`,
    `That a ruler appointed each shaikh in turn`,
    `That every shaikh on the chart lived in the same year`,
  ],
  sol: `A chain of names and places shows connection and movement. It does not record numbers, royal appointment or dates, so inferences about those would go beyond the chart.`,
}));
Q('m_urs_date', mcq({
  t: 3, d: 2, c: 'application',
  stem: `An imagined, undated pilgrim's note describes crowds gathering at the tomb of the Chishti saint of Ajmer on the anniversary of his death. The saint died in 1235. Which judgement about the note is soundest?`,
  opts: [
    `It was written after 1235, since an anniversary of death and a tomb shrine cannot exist earlier, but the note alone does not show how long after`,
    `It was written exactly in 1235, the year of the saint's death`,
    `It was written before 1235, because an urs marks a birth`,
    `It cannot be dated at all, since the note names no year`,
  ],
  sol: `The content sets a lower limit even when no year is given. Nothing in it sets an upper limit, so only an earliest date can be claimed.`,
}));
Q('m_futuh_infer', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: `An imagined khanqah ledger records daily gifts of grain and cash from merchants and from a sultan's officer, all spent on the kitchen the same day. It shows no gift of village land. Which inference does the ledger best support?`,
  opts: [
    `The kitchen ran on gifts that were not asked for, but the ledger cannot show how the shaikh viewed the sultan`,
    `The shaikh refused every gift from every ruler`,
    `The khanqah was supported by a fixed grant of villages from the state`,
    `The shaikh opposed the sultan, since an officer gave gifts only in secret`,
  ],
  sol: `The ledger supports a claim about how the kitchen was financed. Attitudes and motives need other sources, and the last option invents a secret that the ledger never mentions.`,
}));
Q('ar_mosque', ar({
  t: 3, d: 2, c: 'understanding', verdict: 'both-true-not-explains',
  a: `Mosques in Kerala and in Bengal differ from each other in roof form and building material.`,
  r: `Mosques everywhere are oriented towards Mecca and have a mihrab and a minbar.`,
  sol: `Both are true, but R accounts for what mosques share, not for how they differ. The differences come from local climate, materials and building traditions.`,
}));
Q('ar_sufi_false', ar({
  t: 3, d: 2, c: 'understanding', verdict: 'A-true-R-false',
  a: `Chishti khanqahs kept an open kitchen (langar) for visitors.`,
  r: `The Chishti shaikhs accepted no gifts from anyone and had no contact at all with rulers.`,
  sol: `The kitchen is recorded. The second claim is false: the shaikhs accepted some donations and grants, though they kept a distance from power, and rulers sought their blessings.`,
}));
Q('tf_ajmer', tf({
  t: 3, d: 1, c: 'recall', ans: true,
  stem: `True or false? Sultan Muhammad bin Tughlaq is the first sultan recorded as having visited the dargah of Khwaja Muinuddin Chishti at Ajmer.`,
  sol: `He is the first sultan recorded as visiting it; later rulers, among them Akbar, visited many times.`,
}));
Q('ord_silsila', ord({
  t: 3, d: 2, c: 'recall', marks: 1,
  stem: `Arrange these Chishti shaikhs in the order of their silsila, from the earliest teacher to the latest disciple.`,
  items: [`Khwaja Muinuddin Chishti`, `Shaikh Qutbuddin Bakhtiyar Kaki`, `Shaikh Fariduddin Ganj-i Shakar`, `Shaikh Nizamuddin Auliya`],
  sol: `Each shaikh was the disciple of the one named before him.`,
}));
Q('ord_chrono', ord({
  t: [3, 4], d: 2, c: 'understanding', marks: 1,
  stem: `Arrange these events from the history of Islam and devotion in the subcontinent in chronological order, earliest first.`,
  items: [`Arab forces conquer Sind`, `The Delhi Sultanate is set up`, `Baba Guru Nanak is born`, `Guru Arjan compiles the Adi Granth`],
  sol: `They fall in 711, in the thirteenth century, in 1469 and in 1604.`,
}));
Q('s_khanqah_check', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: `An imagined account says that the kitchen of a khanqah fed visitors without asking about their background and that disciples sang in the local language. State one conclusion about the khanqah's place in local society and one limit of such an account.`,
  model: `**Conclusion:** the khanqah drew people of varied backgrounds and spoke to them in a language they used, so it was open to wide groups in the town. **Limit:** a single account cannot show how many came, how regular the feeding was, or how the visitors themselves judged the khanqah.`,
  sol: `A conclusion about openness and a limit set by one description.`,
  scheme: [[`Conclusion on the khanqah's place`, 1], [`A limit of one account`, 1]],
}));
Q('s_dargah', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `What is a dargah, and why is the urs important there?`,
  model: `A **dargah** is the tomb of a Sufi master, which became a place of pilgrimage, called **ziyarat**. The **urs** is the anniversary of the master's death, which devotees regard as his union with God, so it draws large gatherings at the dargah.`,
  sol: `The tomb as a pilgrimage centre and the meaning of the urs.`,
  scheme: [[`Dargah and ziyarat`, 1], [`Urs as death anniversary and union with God`, 1]],
}));
Q('s3_sufi_state', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: `An imagined chronicle says that a sultan sent a grant of villages to a Chishti khanqah and that the shaikh returned it. State two things a historian could infer about Chishti relations with the state, and one reason to check the story.`,
  model: `(1) **Rulers sought the support and blessing** of Chishti shaikhs. (2) The shaikh wished to **keep his distance from power** and to live on unasked gifts. (3) **Check the story:** chronicles and hagiographies may shape such tales to praise a ruler or a saint, so other sources, such as malfuzat and records of grants, are needed.`,
  sol: `Two inferences about the relationship and a reason to test the account.`,
  scheme: [[`Rulers sought blessing`, 1], [`Shaikh kept distance`, 1], [`Reason to check the story`, 1]],
}));
Q('l_sufi_khanqah', long({
  t: 3, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: `Describe the growth of Sufism and the life of a Chishti khanqah in India.`,
  model: `1. **Origins:** Sufism arose in the early centuries of Islam among those who turned to asceticism and mysticism in protest against the growing materialism of the Caliphate.\n2. **Emphasis:** Sufis stressed love and devotion to God and a personal reading of the Quran.\n3. **Organisation:** by the eleventh century khanqahs, headed by a shaikh with his murids, linked disciples through a silsila.\n4. **Chishti life:** Nizamuddin's khanqah at Ghiyaspur had an open kitchen run on unasked gifts, and gatherings for sama' and zikr that used Hindavi.\n5. **Dargahs:** the tomb of a master became a place of ziyarat, especially at the urs.`,
  sol: `Origins, emphasis, organisation, daily life in a Chishti khanqah and the dargah.`,
  scheme: [[`Origins of Sufism`, 1], [`Emphasis on love and experience`, 1], [`Khanqah, shaikh, murids and silsila`, 1], [`Chishti khanqah life`, 1], [`Dargah and urs`, 1]],
}));
Q('l_chishti_state', long({
  t: 3, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: `To what extent did the Chishti Sufis keep apart from the state? Use evidence from both sides.`,
  model: `1. **Distance:** the Chishtis kept apart from power, and Nizamuddin's khanqah ran on unasked gifts from visitors of many backgrounds.\n2. **Contact:** they accepted some donations and grants, so they were not wholly independent.\n3. **Rulers' interest:** Muhammad bin Tughlaq was the first sultan recorded at Ajmer, and Akbar visited it many times, seeking blessings and legitimacy.\n4. **Tension:** disputes over precedence show that the relationship was not simple.\n5. **Judgement:** the Chishtis kept a real distance in their style of life, but they were not cut off from the state, which needed them as much as they needed its gifts.`,
  sol: `Evidence of distance, evidence of contact, the rulers' interest, tension and a weighed conclusion.`,
  scheme: [[`Evidence of distance`, 1], [`Evidence of contact`, 1], [`Rulers seeking blessings`, 1], [`Tension`, 1], [`Reasoned judgement`, 1]],
}));
Q('sb_dargah', source({
  t: [3, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, an imagined diary, and answer the questions that follow. ${IMAG}`,
  passage: `**A pilgrim's diary at a dargah (imagined)**\n\nThird day of the fair. I walked since dawn with a group from my town and reached the tomb at midday, where a keeper tied a thread on my wrist. At dusk the singers began; many in the crowd wept, and nobody left before the lamps were lit. A rich trader had paid for the great cooking vats, and the keeper said that they would be empty by midnight. I saw people from many communities beside me in the courtyard. I too tied a thread to the lattice and made a wish for my son's health.`,
  parts: [
    child('a', short({ t: 3, d: 1, c: 'recall', marks: 1, stem: `What name is given to the anniversary of the death of a Sufi master, celebrated at his dargah?`, model: `The **urs**.`, sol: `Devotees regard the anniversary as the master's union with God.`, scheme: [[`Urs`, 1]] })),
    child('b', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: `From the account of the cooking vats, what does the diary suggest about how the free meal on this occasion was paid for?`, model: `By **gifts from devotees or patrons**, such as the trader, and not necessarily by a fixed grant.`, sol: `Look at who is said to have paid and what is not mentioned.`, scheme: [[`Gifts from patrons`, 1]] })),
    child('c', short({ t: 3, d: 3, c: 'application', marks: 2, stem: `**Either** (i): Give two questions a historian should ask about the diarist before using the diary as evidence of who attended dargah fairs.`, model: `(1) **Who was she and for whom did she write**, since her own community and purpose may shape what she noticed. (2) **How many fairs and which parts of them did she see**, since one visit may not be typical.`, sol: `Two questions on the writer's position and the sample she saw.`, scheme: [[`Question on the writer and her purpose`, 1], [`Question on how much she saw`, 1]] }),
    [short({ t: 3, d: 3, c: 'application', marks: 2, stem: `**Or** (ii): Suggest two other kinds of evidence, not written by the diarist, that could check this picture of the fair.`, model: `(1) **Records of the dargah or its donors**, which would show gifts and expenses. (2) **Chronicles, malfuzat or the accounts of other visitors**, which would show whether others describe similar gatherings.`, sol: `Two kinds of evidence from outside the diary.`, scheme: [[`Dargah or donor records`, 1], [`Other written accounts`, 1]] })]),
  ],
}));
Q('sb_malfuz', source({
  t: [3, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, an imagined teacher's notes, and answer the questions that follow. ${IMAG}`,
  passage: `**A teacher's notes on malfuzat (imagined)**\n\nMy students often ask what a malfuzat collection is. I tell them to picture a disciple who sits with his shaikh through many evenings and writes down what was said: advice on prayer, replies to visitors, stories of earlier saints and remarks on the court. The collection is arranged by day, and it was finished years after the sittings began. I remind them that the compiler loved his teacher and wished others to learn from him. Yet nothing else tells us so plainly what the circle of a shaikh talked about on an ordinary evening.`,
  parts: [
    child('a', short({ t: 3, d: 1, c: 'recall', marks: 1, stem: `Who compiled, in the fourteenth century, a collection of the conversations of Shaikh Nizamuddin Auliya?`, model: `**Amir Hasan Sijzi.**`, sol: `He was a disciple of the shaikh and the compiler of the best-known collection of his conversations.`, scheme: [[`Amir Hasan Sijzi`, 1]] })),
    child('b', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: `The collection was finished years after the sittings began. What does this suggest about the exactness of the words it records?`, model: `The words may rest on **memory or later notes**, so the wording may not be exact.`, sol: `Link the delay in compiling to the exactness of the record.`, scheme: [[`Memory or later notes, so not exact`, 1]] })),
    child('c', short({ t: 3, d: 3, c: 'application', marks: 2, stem: `**Either** (i): A historian wants to study how Chishti shaikhs spoke about rulers. Explain why a malfuzat is useful for this, and name one other kind of source she should use to check it.`, model: `It is useful because it records **what the shaikh and his visitors said informally about the court** in an ordinary sitting. She should check it against **chronicles or letters (maktubat)** to see whether others report the same relations.`, sol: `The strength of the source for this question and one source to test it.`, scheme: [[`Why a malfuzat is useful`, 1], [`One source to check it`, 1]] }),
    [short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: `**Or** (ii): Give two ways in which the compiler's affection for his teacher could have shaped the collection.`, model: `(1) He may have **chosen flattering or edifying sayings** and left out others. (2) He may have **shaped the way stories were told** so that they showed the shaikh in the best light.`, sol: `Two effects of the compiler's devotion on selection and on telling.`, scheme: [[`Selection of sayings`, 1], [`Shaping of stories`, 1]] })]),
  ],
}));

// ================================================================ t04 Kabir, Baba Guru Nanak and Mirabai
Q('m_kabir_birth', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: `Hagiographies disagree about Kabir's birth and religious background. Which new find would help a historian most in deciding the question?`,
  opts: [
    `A record from Kabir's own lifetime, written by someone outside his circle, that names his family and town`,
    `A new hagiography, written two centuries later, that repeats one of the existing accounts`,
    `A copy of the Bijak made in a newer period`,
    `A collection in which his poems are arranged by theme`,
  ],
  sol: `Evidence close in time and outside the circle of followers carries the most weight on a question of origins. Later retellings and rearranged collections only add to the disagreement.`,
}));
Q('m_nirguna_class', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: `A historian groups three imagined song summaries. Song P addresses the divine as a formless Absolute with many names and rejects the worship of images. Song Q addresses the divine as a beloved with a form and longs to be near him. Song R rejects ritual baths and sacrifices and speaks of a divine reality without gender. Which grouping is best?`,
  opts: [
    `P and R both belong to the nirguna kind of devotion, while Q belongs to the saguna kind`,
    `P and Q are nirguna, and R is saguna`,
    `Q and R are nirguna, and P is saguna`,
    `All three are saguna because each praises the divine`,
  ],
  sol: `Check each song for the criterion of a formless divine reality. P and R meet it; Q gives the divine a form and a relation of love.`,
}));
Q('m_nanak_features', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: `Which statement best summarises the teaching of Baba Guru Nanak?`,
  opts: [
    `A formless Absolute without gender, to be remembered through the divine name, with sacrifices, ritual baths, image worship and austerities set aside`,
    `Devotion to a form of Krishna, regarded as a lover, together with defiance of family rules`,
    `Worship of Shiva as a linga worn by followers, with wandering monks as teachers`,
    `Obedience to a silsila of teachers going back to the Prophet`,
  ],
  sol: `Guru Nanak taught nirguna bhakti. The other options describe Mirabai, the Virashaivas and the Sufi orders.`,
}));
Q('m_nanak_weaken', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: `Historians note that Guru Nanak did not set out to found a new religion. Which new find would most weaken this view?`,
  opts: [
    `A text from his own lifetime, in his own hand, laying down a separate code of rites and a name for a distinct new community`,
    `A hymn of his composed in Punjabi and sung in ragas`,
    `Evidence that he travelled widely and settled at Kartarpur`,
    `A record of his companion Mardana playing the rabab`,
  ],
  sol: `The view concerns intention. Only evidence of a deliberate plan for a separate community would count against it; his hymns, travels and music do not.`,
}));
Q('m_mira_collections', mcq({
  t: 4, d: 4, c: 'analysis',
  stem: `Two collections of songs attributed to Mirabai are compared. One was written down in the seventeenth century in Rajasthan; the other was recorded in the twentieth century from groups of singers. They share some songs and differ in others. Which conclusion is soundest?`,
  opts: [
    `Shared songs hint at an older core, but they cannot prove authorship, and the differences show that songs changed in transmission`,
    `Shared songs prove that Mirabai composed them, and the differences show that some are forgeries`,
    `The differences prove that none of the songs can be old`,
    `Only the written collection has any value, and the recorded one can be ignored`,
  ],
  sol: `Agreement between independent traditions is suggestive but not proof, and change in oral transmission is expected. Neither collection can be dismissed, since each shows a stage in the life of the songs.`,
}));
Q('fb_adigranth', fb({
  t: 4, d: 1, c: 'recall',
  stem: `Guru Arjan compiled the Adi Granth in ___, and Guru Gobind Singh later added compositions of Guru Tegh Bahadur.`,
  acc: [[`1604`]],
  sol: `The Adi Granth was compiled in 1604.`,
}));
Q('mt_north', match({
  t: 4, d: 2, c: 'recall',
  stem: `Match each northern name with the correct description.`,
  pairs: [
    [`Kabir`, `Poet whose compositions survive in the Bijak and the Kabir Granthavali`],
    [`Baba Guru Nanak`, `Established a centre at Kartarpur on the Ravi`],
    [`Mirabai`, `Rajput princess from Merta devoted to Krishna`],
    [`Mardana`, `Companion who played the rabab as Guru Nanak sang`],
  ],
  sol: `Each description is the usual way of identifying the person in the study of northern bhakti.`,
}));
Q('tf_attrib_theme', tf({
  t: 4, d: 2, c: 'understanding', ans: false,
  stem: `True or false? An imagined undated poem that praises a formless divine reality by many names, among them Rama and Allah, and rejects the worship of images can safely be attributed to Kabir on those themes alone.`,
  sol: `Such themes are shared by other nirguna poets, and many compositions were attributed to famous names, so a theme alone cannot fix the author.`,
}));
Q('ar_nanak', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: `Historians say that Baba Guru Nanak did not set out to found a new religion.`,
  r: `After his death his followers consolidated their own practices.`,
  sol: `Both are true, but R describes what happened later and is not a reason for his intention. A in this case concerns what he aimed at during his life.`,
}));
Q('ar_kabir', ar({
  t: 4, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: `Compositions attributed to Kabir survive in more than one collection, and the collections do not agree in every detail.`,
  r: `The compositions were transmitted orally and written down later.`,
  sol: `Oral transmission followed by later writing is the ordinary route to variant versions.`,
}));
Q('s_nanak', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `Describe the teaching of Baba Guru Nanak on the nature of the divine and on ritual.`,
  model: `He taught **nirguna bhakti**: a formless Absolute, without gender, to be remembered through the divine name. He **rejected sacrifices, ritual baths, image worship and austerities**, and did not accept the authority of the scriptures of the learned traditions around him.`,
  sol: `The formless Absolute and the rejection of ritual forms.`,
  scheme: [[`Formless Absolute and the divine name`, 1], [`Rejection of ritual practices`, 1]],
}));
Q('s_nirguna_apply', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `An imagined song summary describes a devotee who regards the divine as a beloved, waiting at the door and defying the objections of her husband's family. Is it nirguna or saguna? Give two reasons, and one thing the summary cannot tell a historian.`,
  model: `It is **saguna**: the divine is given a personal form and addressed as a beloved, which fits the devotion associated with Mirabai. The **defiance of family** is a second sign. The summary cannot show **who composed it**, since many songs were attributed to famous names.`,
  sol: `Classify by the criterion of form, give a second sign and name the limit.`,
  scheme: [[`Saguna, with a reason`, 1], [`Second sign or a limit stated`, 1]],
}));
Q('s_mira_unc', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `Why must historians treat the details of Mirabai's life with caution?`,
  model: `Her songs were **transmitted orally** and sung by many groups, and the details of her life come largely from **later traditions** rather than records of her time. So her marriage, her defiance of the family and her guru, said to be Ravidas, are uncertain.`,
  sol: `Oral transmission and the later date of most stories.`,
  scheme: [[`Oral transmission of the songs`, 1], [`Life details from later traditions`, 1]],
}));
Q('s3_kabir_nanak', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: `Compositions attributed to Kabir are preserved in the Guru Granth Sahib. What can a historian infer from this, and what can she not infer? Give three points.`,
  model: `(1) **Guru Arjan and the compilers valued Kabir's nirguna ideas**, which were close to Guru Nanak's. (2) **Kabir's compositions circulated widely in Punjab** by the early seventeenth century. (3) It **cannot show that Kabir and Guru Nanak met**, or that the two traditions became one; the compositions included also reflect the compilers' selection.`,
  sol: `Two inferences from inclusion and one limit on what inclusion proves.`,
  scheme: [[`Compilers valued his ideas`, 1], [`Wide circulation`, 1], [`A limit on the inference`, 1]],
}));
Q('s3_mira_caution', short({
  t: 4, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: `A student plans an essay on Mirabai. Give three cautions she should state about her sources, and say what kind of evidence about her devotion is nevertheless available.`,
  model: `(1) The songs were **transmitted orally** and may have changed. (2) Many songs are **attributed** to her, so authorship cannot always be shown. (3) Details of her life come largely from **later traditions**. Even so, the **songs sung by many groups** show how her devotion to Krishna was remembered and valued.`,
  sol: `Three cautions about the evidence and the value that remains.`,
  scheme: [[`Oral transmission`, 1], [`Uncertain attribution`, 1], [`Later traditions, and what remains valuable`, 1]],
}));
Q('l_north', long({
  t: 4, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Compare the teachings of Kabir, Baba Guru Nanak and Mirabai.`,
  model: `1. **Kabir:** described the ultimate reality by many names and as formless, and used paradoxical sayings; his poems survive in the Bijak, the Kabir Granthavali and the Guru Granth Sahib.\n2. **Guru Nanak:** taught a formless Absolute and rejected sacrifices, ritual baths, image worship and austerities; he composed hymns in Punjabi and set up a centre at Kartarpur.\n3. **Mirabai:** devoted herself to Krishna as a lover, defied her husband's family and, by tradition, had Ravidas as her guru.\n4. **Similarity:** Kabir and Guru Nanak shared nirguna devotion, while Mirabai's was saguna.\n5. **Sources:** the compositions of each were passed on orally and compiled later.`,
  sol: `Each figure's teaching, the contrast between nirguna and saguna and a note on sources.`,
  scheme: [[`Kabir`, 1], [`Guru Nanak`, 1], [`Mirabai`, 1], [`Nirguna and saguna contrast`, 1], [`Sources compiled later`, 1]],
}));
Q('sb_kabir', source({
  t: [4, 5], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, a SOYL summary of what accounts of one poet say, and answer the questions that follow. ${SUM}`,
  passage: `**What accounts of Kabir's birth say (summary)**\n\nAccounts of Kabir written after his death do not agree about his birth and his background. One says that he was born in a family of Muslim weavers. Another presents him as a disciple of the Hindu teacher Ramananda. A third gives him a miraculous birth. All were compiled long after he died, by writers of different communities.`,
  parts: [
    child('a', short({ t: 4, d: 1, c: 'recall', marks: 1, stem: `Name any one collection in which compositions attributed to Kabir survive.`, model: `The **Bijak**, the **Kabir Granthavali** or the **Guru Granth Sahib**.`, sol: `Any one of the three collections is accepted.`, scheme: [[`One collection named`, 1]] })),
    child('b', short({ t: 4, d: 3, c: 'analysis', marks: 1, stem: `The accounts were compiled by writers of different communities. Why might this explain the disagreement about his background?`, model: `Each community may have **wished to claim him** and shaped his story to suit its own beliefs.`, sol: `Link the writers' communities to the version of the story each tells.`, scheme: [[`Each community may claim him`, 1]] })),
    child('c', short({ t: 4, d: 4, c: 'analysis', marks: 2, stem: `**Either** (i): A document from Kabir's own lifetime, written by someone outside his circle, mentions a poet of that name as a weaver. State what it would and would not settle.`, model: `**Would help:** it would support his occupation and show that he was known in his time. **Would not settle:** whether he was born into a Muslim family, whether Ramananda was his guru, or which compositions are truly his.`, sol: `The limits of one early record on a question of origins and authorship.`, scheme: [[`What it would settle`, 1], [`What it would not settle`, 1]] }),
    [short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: `**Or** (ii): For a study of Kabir's teachings, which is likely to be better evidence, the accounts of his birth or the compositions attributed to him? Give two reasons.`, model: `The **compositions**. (1) They express the ideas themselves, while the accounts concern his origins. (2) They are also compiled late and attributed with uncertainty, so each must still be checked, but the accounts of his birth add little about teaching.`, sol: `The compositions are closer to the teachings, with a caution.`, scheme: [[`Compositions named with a reason`, 1], [`Second reason or caution`, 1]] })]),
  ],
}));

// ================================================================ t05 Sources: devotional literature
Q('m_malfuzat', mcq({
  t: 5, d: 1, c: 'recall',
  stem: `What are malfuzat?`,
  opts: [`Collections of the conversations of Sufi saints`, `Letters written by Sufi saints`, `Biographies of saints written to praise them`, `Songs sung by Sufis in a gathering`],
  sol: `Malfuzat record conversations. Letters are maktubat, biographies are tazkiras and the songs belong to the sama' gathering.`,
}));
Q('m_hagio_use', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: `A historian reads a tazkira in which a saint is said to have crossed a river without a boat and to have been bowed to by a sultan. How should she use it?`,
  opts: [
    `As evidence of what the followers believed about the saint and how they pictured his standing with rulers, not as proof that the events took place`,
    `As a day-by-day record of what happened, since tazkiras were written by eyewitnesses`,
    `As worthless, because it contains accounts of miracles`,
    `As proof that the sultan accepted the saint's authority`,
  ],
  sol: `A work written to honour a saint tells most about the beliefs of its authors and readers. Its events must be tested against other records, and it should not be thrown out on account of its purpose either.`,
}));
Q('m_attrib', mcq({
  t: 5, d: 4, c: 'analysis',
  stem: `The same poem appears in a collection kept by the followers of Kabir under his name, and in a Rajasthani collection under another poet's name. What is the best response?`,
  opts: [
    `Treat the attribution as uncertain, compare the manuscripts and the language of the poem with the poets' other work, and avoid deciding from one collection alone`,
    `Accept the first collection, since followers know their poet best`,
    `Accept the second collection, since it is from a different region and so unbiased`,
    `Conclude that both poets composed it together`,
  ],
  sol: `Each collection has its own interest in the poem. Only comparison of manuscripts and style can tip the balance, and even then the result may be uncertain.`,
}));
Q('m_independent', mcq({
  t: 5, d: 4, c: 'analysis',
  stem: `Two tazkiras describe the same miracle of one saint in almost the same words. A historian finds that the second author was a disciple of the first and copied many passages. How should she treat the two accounts?`,
  opts: [
    `As one account in effect, since the second depends on the first and does not confirm it independently`,
    `As two independent confirmations of the miracle`,
    `As proof that the miracle was widely witnessed`,
    `As proof that both authors invented the miracle`,
  ],
  sol: `Agreement confirms only when the sources do not depend on each other. Copying removes that independence without showing the story to be false.`,
}));
Q('m_maktubat_fit', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: `A historian holds a collection of letters (maktubat) written by a Sufi shaikh to his disciples. For which question is the collection the most useful evidence?`,
  opts: [
    `What advice did the shaikh give his disciples on practice and belief, in his own words`,
    `How many disciples attended the khanqah on a given day`,
    `Which sultan reigned in the year of the shaikh's death`,
    `How the shaikh's tomb was later decorated`,
  ],
  sol: `Letters speak directly of the writer's advice and concerns. Attendance, reigns and decoration lie outside what he wrote to his disciples.`,
}));
Q('s_attrib', short({
  t: 5, d: 2, c: 'application', marks: 2, wl: S2,
  stem: `A poem is attributed to a famous saint in only one collection, compiled two centuries after his death. Give two checks a historian should make before using it as evidence of his teaching.`,
  model: `(1) **Compare the date and the manuscript tradition** of the collection with earlier collections, to see whether the poem appears earlier elsewhere. (2) **Compare the language and ideas** of the poem with compositions securely linked to the saint, since many poems were attributed to famous names.`,
  sol: `Two checks on date and on style.`,
  scheme: [[`Check of date and manuscripts`, 1], [`Check of language and ideas`, 1]],
}));
Q('s3_sources_new', short({
  t: 5, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `An imagined hagiography says that a saint walked through fire unhurt and that sultans bowed to him. State three ways in which a historian can still use it as evidence.`,
  model: `(1) It shows **what the saint's followers believed** and wished others to believe about him. (2) It suggests **how followers saw the relation of saints to rulers**, which can be checked against chronicles. (3) Its **date and community of origin** show when and for whom the saint's memory was shaped, though the miracles cannot be taken as events.`,
  sol: `Beliefs of followers, ideas about rulers and the context of the text.`,
  scheme: [[`What followers believed`, 1], [`Ideas about rulers, to be checked`, 1], [`Date and community of origin`, 1]],
}));
Q('l_hagio', long({
  t: 5, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: `How far can hagiographies and collections of devotional compositions be trusted as sources for the history of the bhakti and Sufi traditions? Support your answer with examples.`,
  model: `1. **Value:** they preserve the beliefs, ideas and memories of devotees, for example the tazkiras and the malfuzat of Nizamuddin Auliya compiled by Amir Hasan Sijzi in the fourteenth century.\n2. **Compilation:** most were gathered after the lives of the saints, so words and stories may have changed, as with the vachanas and the poems of Kabir.\n3. **Purpose:** they were written to honour and teach, so they may stress miracles and leave out criticism.\n4. **Attribution:** many compositions were attributed to famous names, so authorship is often uncertain.\n5. **Judgement:** they are essential but must be cross-checked with chronicles, inscriptions and letters before a conclusion is drawn.`,
  sol: `Value, later compilation, purpose, attribution and a reasoned judgement.`,
  scheme: [[`Value with an example`, 1], [`Later compilation`, 1], [`Purpose of the writers`, 1], [`Uncertain attribution`, 1], [`Reasoned judgement`, 1]],
}));
Q('ar_hagio', ar({
  t: 5, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: `A tazkira that describes miracles can still be useful to a historian of Sufi traditions.`,
  r: `Such a work shows what the followers of a saint believed about him and what they valued in him.`,
  sol: `The use lies in the beliefs and values it reveals, not in the miracles as events, so R supplies the ground for A.`,
}));
