// CBSE 12 History, ch11 Mahatma Gandhi and the Nationalist Movement: Civil Disobedience and Beyond, question bank.
// Every source passage is an imagined document (a district officer's letter, a police officer's fortnightly report, a
// newspaper report, a volunteer's letter) or a SOYL summary of what a kind of source contains, written in SOYL's own words
// and labelled as such. Nothing from any speech, letter, article or autobiography of Gandhi or of any other leader, and
// nothing from any police report, newspaper or official record, is quoted, translated or closely paraphrased; no NCERT
// text, source box, table, caption, map or exercise and no board or sample-paper item is reused (D-036). All numbers in
// data items are imagined. Gandhi, Nehru, Ambedkar, Jinnah, the Muslim League, the Congress and the British government
// are presented factually, with each side's argument stated as that side's argument; the communal violence of 1946-47 is
// described briefly and without detail, and no community is blamed. Places are named in words only: no map work (OA-23).
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child } from '../../cbse-12-history-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
const IMAG = '*(Imagined document written by SOYL for practice; the people in it are not real, though the evidence and events in the background are.)*';
const SUM = '*(Summary written by SOYL in its own words for practice; it is not a quotation or translation of any source.)*';

// ================================================================ t01 Gandhi's emergence
Q('m_return', mcq({
  t: 1, d: 1, c: 'recall',
  stem: `In which year did Gandhi return to India after his long stay in South Africa?`,
  opts: [`1915`, `1905`, `1919`, `1922`],
  sol: `He came back in January 1915. The other years belong to later or earlier events.`,
}));
Q('m_champaran', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `What did the indigo peasants of Champaran obtain through the campaign of 1917?`,
  opts: [
    `Security of tenure and the freedom to cultivate crops of their own choice`,
    `A remission of revenue after the failure of their crops`,
    `A rise in the wages paid to mill workers`,
    `The withdrawal of a law allowing detention without trial`,
  ],
  sol: `The peasants gained security on their holdings and a say in what to grow. Remission of revenue was the issue at Kheda, and wages the issue at Ahmedabad.`,
}));
Q('m_three_diff', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Which pairing of place and group is correct for the local campaigns in which Gandhi took part in 1917 and 1918?`,
  opts: [
    `Kheda: cultivators who asked that revenue be remitted after crop failure; Ahmedabad: textile mill workers`,
    `Champaran: textile mill workers; Ahmedabad: cultivators of cotton`,
    `Kheda: indigo peasants; Champaran: cultivators who asked for remission of revenue`,
    `Ahmedabad: indigo peasants; Kheda: textile mill workers`,
  ],
  sol: `Each pairing in the other options swaps a group between two disputes.`,
}));
Q('m_champ_weaken', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: `Historians say that the campaign at Champaran in 1917 helped to make Gandhi known beyond his own region. Which finding about an imagined set of newspapers of 1917 would most weaken this claim?`,
  opts: [
    `Papers outside Bihar carried no report of the campaign, and almost everyone who had heard of it lived in Bihar`,
    `Papers in several provinces reported the official inquiry into the peasants' complaints`,
    `A Bihar paper praised the campaign more warmly than another paper did`,
    `Papers differed on how many peasants had given statements`,
  ],
  sol: `The claim is about how far his name travelled. Only the first finding shows his name staying inside one province; the others leave the claim standing.`,
}));
Q('m_date_early', mcq({
  t: 1, d: 2, c: 'application',
  stem: `An imagined, undated letter from a friend says that Gandhi has settled at an ashram in Gujarat after his years abroad, that he is travelling by railway in the cheapest class to see the country as an older leader advised, and that he has not yet taken up any dispute of peasants or workers. Which dating is soundest?`,
  opts: [
    `After January 1915 and before the Champaran campaign of 1917, probably within his first year at home`,
    `After the Rowlatt Act of 1919, since he has settled at an ashram`,
    `Before 1915, since he is described as travelling`,
    `After 1922, since he is described as a settled leader`,
  ],
  sol: `His return from abroad sets the earliest date, and the absence of any local dispute sets the latest. The later options ignore one of these clues.`,
}));
Q('tf_sa', tf({
  t: 1, d: 1, c: 'recall', ans: false,
  stem: `True or false? Gandhi first used the method of satyagraha at Champaran, after his return to India.`,
  sol: `He had first used satyagraha in South Africa, where he had spent about two decades before returning.`,
}));
Q('s_early_diff', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: `Two imagined records of 1917 disagree. A planter's agent writes that the tenants of an indigo district are content. A lawyer's note lists several hundred written statements of grievance taken from the same district. Give two ways in which a historian could test which record is nearer the truth.`,
  model: `(1) She could read the **statements themselves**, noting who gave them, how they were taken and whether tenants of different villages repeat the same complaints. (2) She could compare both records with **independent evidence**, such as land and rent registers, since each writer has a stake in the matter.`,
  sol: `Two tests: examine the statements, and set both records against evidence neither writer controlled.`,
  scheme: [[`Examining the statements and how they were taken`, 1], [`Checking both against independent evidence`, 1]],
}));
Q('l_emerge', long({
  t: 1, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `Assess how far the campaigns of Champaran, Kheda and Ahmedabad in 1917 and 1918 made Gandhi a national leader.`,
  model: `1. **Background:** he returned in 1915 after about twenty years in South Africa and spent a year travelling.\n2. **What the campaigns gave him:** a hearing among peasants and workers, and proof that satyagraha could work in India.\n3. **Limits:** each dispute was local, in a different region, about particular grievances, and none raised the question of self-rule.\n4. **What came later:** the countrywide hartal against the Rowlatt Act in 1919 and Non-Cooperation gave him the national stage.\n5. **Judgement:** the campaigns made him known and trusted in several regions, but national leadership came only with the later movements.`,
  sol: `What the campaigns gave, what they could not give, and a verdict.`,
  scheme: [[`Background to 1917`, 1], [`What the campaigns gave him`, 1], [`Limits of local campaigns`, 1], [`The later movements as the national stage`, 1], [`A reasoned judgement`, 1]],
}));
Q('sb_champaran', source({
  t: [1, 5], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the source, an imagined officer's letter, and answer the questions that follow. ${IMAG}`,
  passage: `**A sub-divisional officer's letter to his superior (imagined)**\n\nA visitor from western India has spent some weeks in my sub-division, listening to tenants who grow indigo for the planters. Several hundred tenants have come forward to give their statements, though many were afraid of the planters' agents when he arrived. Each statement is written down and the tenant is asked to sign or put a mark to it. Lawyers from the provincial capital are helping him. The planters' agents call him an agitator and want him sent away. I think that expelling him would only draw more attention to the complaints, and an official inquiry may serve better. I have not yet looked into the planters' own account of their dealings.`,
  parts: [
    child('a', short({ t: [1, 5], d: 1, c: 'recall', marks: 1, stem: `Name the visitor, who had come back to India from South Africa only two years earlier.`, model: `**Gandhi.**`, sol: `He returned in 1915 and was at Champaran in 1917.`, scheme: [[`Gandhi`, 1]] })),
    child('b', short({ t: [1, 5], d: 3, c: 'analysis', marks: 1, stem: `The officer says that many tenants were afraid at first but that hundreds have now come forward. What does this suggest about how the tenants saw the visitor?`, model: `They came to **trust him** and believed that he would take their complaints seriously.`, sol: `Read the change from fear to statements as a sign of trust.`, scheme: [[`The tenants trusted him enough to speak`, 1]] })),
    child('c', short({ t: [1, 5], d: 3, c: 'application', marks: 2, stem: `**Either** (i): If the government held an inquiry, name two kinds of evidence it would need besides the tenants' statements, and say what each would test.`, model: `(1) **The planters' own records and agreements**, to test what the tenants say they were made to do. (2) **Land and rent registers** of the villages, to check the tenants' holdings and what they paid.`, sol: `Two independent records that can confirm or correct the statements.`, scheme: [[`Planters' records and what they test`, 1], [`Land and rent registers and what they test`, 1]] }),
    [short({ t: [1, 5], d: 3, c: 'application', marks: 2, stem: `**Or** (ii): Explain why a historian should not treat this letter alone as a full account of the dispute, and name one other record she should read with it.`, model: `The officer reports **what he saw and was told**, from the government's side, and he admits he has not yet seen the planters' account. A historian should read it with the **planters' own papers** or with the tenants' signed statements.`, sol: `The writer's position and a missing side, with a record that supplies it.`, scheme: [[`The letter gives one official's partial view`, 1], [`A named record to set beside it`, 1]] })]),
  ],
}));

// ================================================================ t02 Non-Cooperation, Civil Disobedience and the dialogues
Q('m_rowlatt', mcq({
  t: 2, d: 1, c: 'recall',
  stem: `What did the Rowlatt Act of 1919 allow the government to do?`,
  opts: [`Detain people without trial`, `Raise the tax on salt`, `Ban the import of foreign cloth`, `Dismiss the ministers of the provinces`],
  sol: `The Act allowed detention without trial. Gandhi called a countrywide hartal against it.`,
}));
Q('m_jallian_toll', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: `Estimates of the number killed at Jallianwala Bagh on 13 April 1919 differ. Imagine that an official inquiry and an inquiry by a non-official committee each gave a different figure. Which question would best help a historian decide which figure is more reliable?`,
  opts: [
    `How did each body collect its figures: from hospital, cremation and family records, or only from the accounts of those who were present?`,
    `Which body's report was printed first?`,
    `Which body had the more senior members?`,
    `Which figure is easier to remember?`,
  ],
  sol: `Reliability depends on method and records. Priority of printing, rank of members and ease of memory say nothing about how a number was reached.`,
}));
Q('m_khilafat_weaken', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: `Historians say that joining the Khilafat cause to the Non-Cooperation Movement drew Hindus and Muslims into joint action. Which finding about imagined towns would most weaken this claim?`,
  opts: [
    `Records showing that in most towns the Khilafat committee and the Congress committee held separate meetings and never acted together`,
    `Records showing that Khilafat meetings in many towns were addressed by speakers of the Congress`,
    `Records showing that Muslim volunteers joined the picketing of cloth shops in towns with a Khilafat committee`,
    `Records showing that the Khilafat cause was explained in Hindi and Urdu newspapers`,
  ],
  sol: `The claim concerns joint action. Only separate meetings with no joint action cut against it; the other findings show or allow cooperation.`,
}));
Q('m_ncm_notpart', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `Which of these was NOT part of the programme of the Non-Cooperation Movement of 1920–22?`,
  opts: [
    `Boycott of a commission with no Indian member`,
    `Boycott of foreign cloth`,
    `Surrender of titles given by the government`,
    `Boycott of law courts, schools and colleges run by the government`,
  ],
  sol: `The boycott of an all-British commission belongs to 1928, not to 1920–22. The other three were forms of non-cooperation.`,
}));
Q('m_ncm_own_ways', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: `Historians say that peasants, workers and tribal groups understood swaraj in their own ways during the Non-Cooperation Movement, rather than simply following the Congress's programme. Which finding about an imagined hill district would most strengthen this claim?`,
  opts: [
    `Records showing that villagers defied forest rules and refused grazing fees, saying that swaraj meant freedom from such rules, though no Congress committee had asked them to`,
    `Records showing that a Congress committee asked villagers to boycott foreign cloth and that they did so`,
    `Records showing that lawyers of the district gave up their practice`,
    `Records showing that the collector banned a public meeting`,
  ],
  sol: `The claim is that local groups gave the movement their own meaning. Action they took without being asked, justified in their own terms, shows that; the other findings show the programme being followed or the state responding.`,
}));
Q('m_gorakhpur_src', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `A historian wants to study how rumours about Gandhi's miraculous powers spread among villagers of one district in 1921–22. Which source would be most useful?`,
  opts: [
    `Reports of officials about what villagers were saying, read together with recollections gathered later from villagers`,
    `Gandhi's own account of his early life`,
    `A speech of the Viceroy to the legislature`,
    `A table of the revenue collected in the district`,
  ],
  sol: `Rumours are about what ordinary people believed and passed on. Officials noted what they heard, and villagers' memories add the other side; the other sources do not touch popular belief.`,
}));
Q('m_chauri', mcq({
  t: 2, d: 1, c: 'recall',
  stem: `What happened at Chauri Chaura in February 1922?`,
  opts: [
    `A crowd set fire to a police station and policemen were killed`,
    `Troops fired on an unarmed gathering`,
    `Gandhi began a march to the sea`,
    `Mill workers went on strike`,
  ],
  sol: `This violence led Gandhi to call off the Non-Cooperation Movement. The firing on a gathering was at Jallianwala Bagh in 1919.`,
}));
Q('m_boycott_clue', mcq({
  t: 2, d: 2, c: 'application',
  stem: `An imagined, undated handbill urges townspeople to turn out with black flags against a visiting commission that has no Indian member. It adds that the Congress will meet at Lahore the next year and decide its goal. Which dating is soundest?`,
  opts: [`In 1928`, `In 1929, after the Lahore session`, `In 1930, during the salt campaign`, `In 1920, at the start of Non-Cooperation`],
  sol: `The commission with no Indian member is the one boycotted in 1928, and the Lahore session was held in December 1929, which was still the next year.`,
}));
Q('m_salt_law', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: `Which law did Gandhi choose to break at the end of the march of 1930?`,
  opts: [
    `The law giving the state a monopoly on making and selling salt`,
    `A ban on spinning cotton at home`,
    `A rule that forest produce be sold only to the government`,
    `A rule that peasants must grow indigo for planters`,
  ],
  sol: `He made salt on the coast, in defiance of the state's monopoly. The other rules belong to other grievances.`,
}));
Q('m_dandi_date', mcq({
  t: 2, d: 2, c: 'application',
  stem: `An imagined letter from a volunteer says: we left the ashram some days ago; each evening villagers feed us and the crowds grow; the sea is still some days away; the letter to the Viceroy was sent before we set out. Which dating is soundest?`,
  opts: [
    `Between 12 March and 6 April 1930`,
    `After 6 April 1930, once salt had been made`,
    `In 1931, after the pact with the Viceroy`,
    `In January 1930, before the march was announced`,
  ],
  sol: `The march began on 12 March and ended at the sea on 6 April. A letter written on the road, with the sea still ahead, falls between the two dates.`,
}));
Q('m_arrest_table', mcq({
  t: 2, d: 4, c: 'application',
  stem: `An imagined police table for one coastal district in 1930 gives, for four successive fortnights, the number of salt-making incidents and of arrests: 12 incidents and 30 arrests; 40 and 95; 25 and 120; 10 and 140. Which reading is best supported?`,
  opts: [
    `Arrests per incident rose from 2.5 to 14, so either more people were arrested for each act or arrests were made for other acts; the table cannot tell which`,
    `Incidents and arrests rose together at the same rate in every fortnight`,
    `The campaign was dying out, since incidents fell to 10`,
    `The police made fewer arrests as the campaign went on`,
  ],
  sol: `Thirty arrests over 12 incidents is 2.5 each; 140 over 10 is 14. A fall in incidents does not show a campaign dying, because the arrests themselves may have discouraged action; and the table does not say what the arrests were for.`,
}));
Q('m_pact_date', mcq({
  t: 2, d: 3, c: 'application',
  stem: `An imagined, undated letter says that prisoners are being released, that people on the coast may again make salt, that civil disobedience has been stopped, and that the writer's friend is getting ready for a voyage to London. Which dating is soundest?`,
  opts: [
    `After March 1931 and before the Second Round Table Conference of late 1931`,
    `Before the First Round Table Conference of November 1930`,
    `After the Poona Pact of September 1932`,
    `In 1942, during the Quit India movement`,
  ],
  sol: `Prisoners freed and civil disobedience stopped belong to the agreement of March 1931, and the journey to London points to the conference that followed it.`,
}));
Q('m_srtc_weaken', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: `Historians say that the Second Round Table Conference of 1931 failed mainly because of disputes over who represented whom. Which finding about an imagined record of the conference would most weaken this?`,
  opts: [
    `Records showing that the delegates had settled the question of representation within the first days, and that talks broke down over some other matter`,
    `Records showing that the League, the princes and Ambedkar each disputed the Congress's claim to speak for all`,
    `Records showing that Gandhi attended as the Congress's only representative`,
    `Records showing that the conference met in London in the autumn`,
  ],
  sol: `The explanation puts representation first. Finding that it was settled and that something else ended the talks removes its force; the other findings are facts that fit it.`,
}));
Q('m_poona_partly', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `A student writes: In 1932 the Poona Pact accepted Ambedkar's demand for separate electorates for the depressed classes and ended Gandhi's fast. Which comment finds the flaw?`,
  opts: [
    `The Pact gave reserved seats within the general electorates in place of separate electorates, so the original demand was modified, not accepted as it stood`,
    `The fast was undertaken by Ambedkar, not by Gandhi`,
    `The Pact was signed in 1930, not in 1932`,
    `The statement is correct as it stands`,
  ],
  sol: `The statement is right that the Pact ended the fast but wrong about what it gave. Reserved seats in the general electorates were the compromise.`,
}));
Q('ar_calloff_arrest', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: `Gandhi was arrested in March 1922 and sentenced to six years for sedition.`,
  r: `Gandhi had called off the Non-Cooperation Movement after the violence at Chauri Chaura.`,
  sol: `Both are accurate, but the second does not explain the first: the sentence was a decision of the government, taken on a charge of sedition, whereas the second states a decision of Gandhi's own.`,
}));
Q('ar_srtc', ar({
  t: 2, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: `At the Second Round Table Conference Gandhi's claim to speak for all Indians was challenged.`,
  r: `The Muslim League, the princes and Ambedkar each claimed to speak for their own groups.`,
  sol: `Each of these claims set a limit on what the Congress could say it represented, which is how the challenge arose.`,
}));
Q('ar_ncm_false', ar({
  t: 2, d: 2, c: 'understanding', verdict: 'A-false-R-true',
  a: `The Non-Cooperation Movement was called off after the firing at Jallianwala Bagh.`,
  r: `Gandhi was arrested in March 1922 and sentenced to six years.`,
  sol: `The firing of 1919 came before the movement began; it was called off in 1922 after Chauri Chaura. The statement about the sentence is accurate.`,
}));
Q('ar_poona', ar({
  t: 2, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: `The Poona Pact of 1932 gave the depressed classes reserved seats in the general electorates.`,
  r: `Gandhi's fast against separate electorates led to talks in which Ambedkar took part.`,
  sol: `The talks that followed the fast produced the pact, so the second statement accounts for how the first came about.`,
}));
Q('tf_1937', tf({
  t: 2, d: 1, c: 'understanding', ans: false,
  stem: `True or false? In the elections of 1937 the Congress won in all the provinces of British India and formed ministries in every one.`,
  sol: `It won in eight of the eleven provinces and formed ministries there.`,
}));
Q('fb_lahore', fb({
  t: 2, d: 1, c: 'recall',
  stem: `The Lahore session of the Congress in December ___ declared purna swaraj as its goal; its president was ___.`,
  acc: [[`1929`], [`Jawaharlal Nehru`, `Nehru`, `Pandit Nehru`, `Jawahar Lal Nehru`]],
  sol: `The session was held in 1929 under Jawaharlal Nehru, and 26 January 1930 was then celebrated as Independence Day.`,
}));
Q('mt_people', match({
  t: 2, d: 1, c: 'recall',
  stem: `Match each name with the correct description.`,
  pairs: [
    [`Jawaharlal Nehru`, `President of the Congress session at Lahore in 1929`],
    [`General Dyer`, `Officer whose troops fired on the crowd at Jallianwala Bagh`],
    [`Lord Irwin`, `Viceroy to whom Gandhi wrote before the march of 1930`],
    [`B. R. Ambedkar`, `Leader who argued for separate electorates for the depressed classes`],
  ],
  sol: `Each name is linked with one episode of the years 1919 to 1932.`,
}));
Q('mt_events', match({
  t: 2, d: 2, c: 'understanding',
  stem: `Match each measure with what it provided.`,
  pairs: [
    [`Rowlatt Act`, `Allowed detention without trial`],
    [`Communal Award`, `Announced separate electorates for the depressed classes`],
    [`Poona Pact`, `Gave reserved seats in the general electorates`],
    [`Gandhi–Irwin Pact`, `Called off civil disobedience and released prisoners`],
  ],
  sol: `Each measure belongs to a different stage of the years 1919 to 1932.`,
}));
Q('ord_cd', ord({
  t: 2, d: 2, c: 'understanding', marks: 1,
  stem: `Arrange these events of the years 1929 to 1937 in chronological order, earliest first.`,
  items: [`The Congress at Lahore declares purna swaraj`, `Gandhi reaches Dandi and makes salt`, `The Gandhi–Irwin Pact`, `The Poona Pact`, `The Congress wins eight of eleven provinces`],
  sol: `They fall in December 1929, April 1930, March 1931, September 1932 and 1937.`,
}));
Q('s_dyer', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `Describe in two points what happened at Jallianwala Bagh on 13 April 1919.`,
  model: `A crowd had gathered at Jallianwala Bagh in Amritsar. **Troops under General Dyer fired on the unarmed crowd** and killed hundreds. Estimates of the number killed **vary** between sources. It happened while the country was protesting against the Rowlatt Act.`,
  sol: `The firing and its setting, with the uncertainty of the figures.`,
  scheme: [[`Firing by troops under Dyer on an unarmed crowd`, 1], [`Hundreds killed, with estimates varying`, 1]],
}));
Q('s_ncm_forms', short({
  t: 2, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: `State two forms taken by the Non-Cooperation Movement.`,
  model: `People were asked to **boycott** government schools, colleges, law courts and jobs, and to boycott **foreign cloth**, taking up khadi and the charkha instead. They were also asked to **surrender the titles** the government had given them.`,
  sol: `Two of the forms of withdrawal from government institutions and goods.`,
  scheme: [[`A form of boycott`, 1], [`A second form`, 1]],
}));
Q('s_chauri', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `Why did Gandhi call off the Non-Cooperation Movement in 1922, and what happened to him soon afterwards?`,
  model: `At Chauri Chaura a crowd set fire to a police station and policemen were killed. The movement was meant to be non-violent, so Gandhi **called it off**. He was **arrested in March 1922** and sentenced to six years for sedition, and was released in 1924 because of ill health.`,
  sol: `The violence, his decision and its sequel.`,
  scheme: [[`The violence at Chauri Chaura as the reason`, 1], [`Arrest and sentence`, 1]],
}));
Q('s_salt_choice', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `Give two reasons why a march to make salt could draw support from people of many different groups.`,
  model: `Salt was used in **every household**, so the state's monopoly on making and selling it touched rich and poor alike. Making salt at the coast was also a **simple, open and non-violent act** that anyone could understand and copy.`,
  sol: `The reach of the grievance and the simplicity of the act.`,
  scheme: [[`Salt used by all households`, 1], [`A simple, open, non-violent act`, 1]],
}));
Q('s_sep_elect', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `State the main argument made by each side in the dispute of 1932 over separate electorates for the depressed classes.`,
  model: `**Ambedkar** argued that separate electorates would give the depressed classes their own representatives, chosen by their own voters. **Gandhi** opposed them, fearing a lasting division of Hindu society, and fasted. The **Poona Pact** settled the matter with reserved seats in the general electorates.`,
  sol: `Each side's argument in its own terms, then the compromise.`,
  scheme: [[`Ambedkar's argument`, 1], [`Gandhi's argument`, 1]],
}));
Q('s_conflict_src', short({
  t: [2, 4], d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: `An imagined fortnightly police report says that the Dandi March passed with little public interest, while a newspaper of the same days describes large crowds at every halt. Give two ways of reconciling the accounts without calling either writer a liar.`,
  model: `(1) The officer may have relied on **informers who saw little**, or on an official's wish to see weak support, while the paper wrote for sympathetic readers. (2) The two may describe **different places or days**, so each is true of what its writer saw.`,
  sol: `Two ways in which honest accounts can differ: vantage and purpose, or place and time.`,
  scheme: [[`A difference of vantage or purpose`, 1], [`A difference of place or day`, 1]],
}));
Q('s_new_evidence', short({
  t: [2, 5], d: 3, c: 'application', marks: 2, wl: S2,
  stem: `A historian finds a village register of an imagined district, dated 1930, that lists sixty names under the heading volunteers for the salt campaign. State one thing she can conclude from it and one thing she cannot.`,
  model: `She can conclude that the campaign had **organised volunteers** in that village, who enrolled by name. She cannot conclude **how many actually took part** or why each joined, since enrolling is not the same as acting and the register records no motives.`,
  sol: `What a list of names shows and what it leaves open.`,
  scheme: [[`A sound conclusion from the register`, 1], [`A limit on what it shows`, 1]],
}));
Q('s3_ncm_features', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `An imagined district reports pupils in government schools as 500 in 1920, 320 in 1921 and 410 in 1922, and shops stocking foreign cloth as 80, 45 and 70. Work out the percentage fall in each series from 1920 to 1921, and explain the partial recovery in 1922 using what you know of how the movement ended.`,
  model: `Pupils fell by 180 of 500, **36 per cent**; shops by 35 of 80, about **44 per cent**. The recovery in 1922 fits the movement being **called off after Chauri Chaura in February 1922**, which ended the call to boycott. The figures alone cannot prove this, since other causes may also have been at work.`,
  sol: `Two percentages, a link to the end of the movement and a caution about what figures can prove.`,
  scheme: [[`Both falls computed correctly`, 1], [`Recovery linked to the calling off of the movement`, 1], [`Caution that the figures alone do not prove the cause`, 1]],
}));
Q('s3_cd_spread', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: `Describe three ways in which civil disobedience spread across the country after the march to Dandi.`,
  model: `(1) People in many places **made salt** or broke other laws in the same open way. (2) **Forest laws were defied** and **taxes were withheld** in some areas. (3) **Foreign cloth was boycotted**, and **women took part** widely. Arrests followed, among them Gandhi's own in May 1930.`,
  sol: `Salt-making elsewhere, defiance of forest laws and taxes, and the boycott with women's participation.`,
  scheme: [[`Salt-making and other breaches`, 1], [`Forest laws and taxes`, 1], [`Boycott and women's participation`, 1]],
}));
Q('s3_rtc', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain three reasons why the Second Round Table Conference of 1931 failed to produce an agreement.`,
  model: `Gandhi attended as the **sole representative of the Congress** and spoke for all Indians. This was challenged by the **Muslim League**, which spoke for Muslims, by the **princes**, and by **B. R. Ambedkar**, who spoke for the depressed classes. The disputes over representation were not settled, so the conference ended without agreement.`,
  sol: `The Congress claim and the three challenges to it.`,
  scheme: [[`Gandhi as sole Congress representative`, 1], [`Challenges from the League, the princes and Ambedkar`, 1], [`No settlement of the disputes`, 1]],
}));
Q('s3_poona_fair', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain how the Poona Pact of 1932 came about and what it provided.`,
  model: `In 1932 the British announced **separate electorates** for the depressed classes, which Ambedkar had argued for so that they would have their own representatives. Gandhi opposed them and **fasted**. After talks with Ambedkar, the **Poona Pact** of September 1932 gave the depressed classes **reserved seats** within the general electorates instead.`,
  sol: `The award, the fast and the compromise.`,
  scheme: [[`The announcement of separate electorates`, 1], [`The fast and the talks`, 1], [`Reserved seats in general electorates`, 1]],
}));
Q('s3_src_plan', short({
  t: [2, 4], d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: `A historian wants to find out how ordinary people along the coast responded to the march of 1930. Name three kinds of source she could use and state one limit of each.`,
  model: `(1) **Fortnightly police reports**, which record meetings and arrests but reflect the officials' fears. (2) **Newspapers in Indian languages**, which report local events but reflect their politics and their readers. (3) **Letters or diaries of volunteers**, which give a view from inside but are few and may be written for a purpose.`,
  sol: `Three kinds of source, each paired with the limit that comes from who made it.`,
  scheme: [[`Police reports with a limit`, 1], [`Newspapers with a limit`, 1], [`Letters or diaries with a limit`, 1]],
}));
Q('s3_cloth_table', short({
  t: [2, 5], d: 3, c: 'application', marks: 3, wl: S3,
  stem: `An imagined fortnightly report from a town says that cloth shops were picketed as follows: 12 in the first fortnight, 30 in the second and 20 in the third. Of these, 3, 12 and 10 shops agreed to stop selling foreign cloth. Work out the share that agreed in each fortnight, state one inference and state one limit of the report.`,
  model: `The shares were **25, 40 and 50 per cent**. The share of picketed shops that agreed rose, so picketing may have grown more effective, or shopkeepers felt more public pressure. But this is an official's tally and does not show **why** shops agreed or whether they went back to foreign cloth later.`,
  sol: `Three divisions, a reading of the trend and a limit.`,
  scheme: [[`All three shares correct`, 1], [`A reasonable inference`, 1], [`A limit of the report`, 1]],
}));
Q('l_ncm_describe', long({
  t: 2, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: `Describe the Non-Cooperation Movement of 1920–22: its background, its forms, the groups that joined it and how it ended.`,
  model: `1. **Background:** the Rowlatt Act of 1919 and the firing at Jallianwala Bagh angered many Indians; the Khilafat cause was joined to the movement to bring Hindus and Muslims together.\n2. **Forms:** boycott of schools, colleges, courts, government jobs and foreign cloth, and surrender of titles; khadi and the charkha were promoted.\n3. **Groups:** peasants, workers and tribal people took part, each understanding swaraj in their own way.\n4. **End:** after the violence at Chauri Chaura in February 1922, Gandhi called it off.\n5. **Sequel:** he was arrested in March 1922 and sentenced to six years.`,
  sol: `Causes, forms, participants and the end of the movement.`,
  scheme: [[`Background`, 1], [`Forms`, 1], [`Groups`, 1], [`Ending after Chauri Chaura`, 1], [`Arrest and sentence`, 1]],
}));
Q('l_cd_assess', long({
  t: 2, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `Assess how far the Gandhi–Irwin Pact and the Round Table Conferences achieved the aims with which the Congress had begun civil disobedience.`,
  model: `1. **Aims:** the Congress declared purna swaraj at Lahore in 1929, and the salt march of 1930 began civil disobedience.\n2. **Gains of the Pact (1931):** civil disobedience was called off, prisoners were released and salt-making along the coast was allowed.\n3. **The conferences:** the Second Round Table Conference of 1931 ended without agreement, as the League, the princes and Ambedkar challenged the Congress's claim to speak for all.\n4. **After:** civil disobedience resumed and then wound down; the Act of 1935 promised representative government, and the Congress won eight of eleven provinces in 1937.\n5. **Judgement:** complete independence was not reached, but the Congress gained a hearing and a place in government.`,
  sol: `The aims, the gains, the failure of the conference and a measured verdict.`,
  scheme: [[`The aims of the movement`, 1], [`Gains of the Pact`, 1], [`The failure of the conference`, 1], [`What followed`, 1], [`A reasoned judgement`, 1]],
}));
Q('l_calloff', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: `Gandhi called off the Non-Cooperation Movement after Chauri Chaura. Weigh the arguments for and against that decision and give a judgement.`,
  model: `1. **The event:** a crowd burnt a police station and policemen were killed in February 1922.\n2. **For the decision:** the movement was to be non-violent, and violence might bring harsher repression and lose the movement's moral ground.\n3. **Against it:** many leaders and followers were disappointed, the movement was widespread at the time, and Gandhi was arrested soon afterwards.\n4. **Caution:** these judgements are made with hindsight; the participants had less information than we do.\n5. **Judgement:** the decision followed from a principle; its cost was a loss of momentum, so neither wholly right nor wholly wrong.`,
  sol: `The event, a case on each side, a caution about hindsight and a judgement.`,
  scheme: [[`The event`, 1], [`The case for the decision`, 1], [`The case against it`, 1], [`Caution about hindsight`, 1], [`A reasoned judgement`, 1]],
}));
Q('sb_police', source({
  t: [2, 5], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the source, an imagined police officer's fortnightly report, and answer the questions that follow. ${IMAG}`,
  passage: `**From a district police officer's fortnightly report, second half of April 1930 (imagined)**\n\nThe volunteers' march to the coast is reported to have ended and salt was made there. The movement shows little sign of taking root in this district. Meetings were held at nine places, with crowds of between two and three hundred at each, mostly idlers and children. At two coastal villages a few men boiled sea water and sold the salt; twenty-one persons were arrested and the salt was seized. Informers say that the shopkeepers favour the Congress but fear a loss of trade. I cannot say whether the volunteers will find supporters in the interior.`,
  parts: [
    child('a', short({ t: [2, 5], d: 1, c: 'recall', marks: 1, stem: `Name the Viceroy to whom Gandhi wrote before beginning the march to the coast.`, model: `**Lord Irwin.**`, sol: `He wrote to the Viceroy in advance of the march.`, scheme: [[`Lord Irwin`, 1]] })),
    child('b', short({ t: [2, 5], d: 3, c: 'analysis', marks: 1, stem: `The officer says that the movement shows little sign of taking root, yet he records meetings at nine places and twenty-one arrests. What does this suggest about his judgement?`, model: `His summary **understates** what his own details show: he may be reassuring his superiors, or he cannot see the movement as more than idle crowds.`, sol: `Set the opening verdict against the facts he reports.`, scheme: [[`His verdict is weaker than the facts he lists`, 1]] })),
    child('c', short({ t: [2, 5], d: 3, c: 'application', marks: 2, stem: `**Either** (i): Using the officer's own figures, work out the smallest and the largest total attendance at the nine meetings, and say why the result sits uneasily with his verdict.`, model: `At between 200 and 300 at each of nine meetings, the total lies between **1,800 and 2,700**. Even the lower figure is a considerable gathering for one fortnight in one district, which does not fit little interest, though the officer's own numbers are rough.`, sol: `Two products and a reading of them against his verdict.`, scheme: [[`The range 1,800 to 2,700`, 1], [`A reading against his verdict, with a caution`, 1]] }),
    [short({ t: [2, 5], d: 3, c: 'application', marks: 2, stem: `**Or** (ii): The officer calls the crowds idlers and children. Give two reasons why a historian should check this description before using it.`, model: `(1) The officer writes from the **government's side** and was anxious about the movement, so he may have wished to belittle the crowds. (2) He gives no way of knowing who was counted; **other sources**, such as newspapers or volunteers' accounts, may describe the same crowds differently.`, sol: `The writer's position and the need for other sources.`, scheme: [[`The officer's position and anxiety`, 1], [`Need to check against other sources`, 1]] })]),
  ],
}));
Q('sb_news', source({
  t: [2, 5], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the source, an imagined newspaper report, and answer the questions that follow. ${IMAG}`,
  passage: `**A nationalist daily's report from Poona, September 1932 (imagined)**\n\nCrowds waited all day outside the jail where the Mahatma, weak after several days without food, lay on his cot. Inside the city, leaders of the caste Hindus and leaders of the depressed classes sat in long talks. The depressed classes' leaders argued that their people needed seats chosen by their own voters, since the experience of centuries had taught them not to trust others to speak for them. The Mahatma's friends replied that the nation must stay one. After days of anxiety an agreement was announced and the crowds cheered. Our paper hopes that this day will be remembered as the beginning of a new fellowship among all our people.`,
  parts: [
    child('a', short({ t: [2, 5], d: 1, c: 'recall', marks: 1, stem: `Name the leader of the depressed classes who took part in these talks.`, model: `**B. R. Ambedkar.**`, sol: `He negotiated the agreement that came to be called the Poona Pact.`, scheme: [[`B. R. Ambedkar`, 1]] })),
    child('b', short({ t: [2, 5], d: 3, c: 'analysis', marks: 1, stem: `The paper hopes that the day will be remembered as the beginning of a new fellowship. What does this suggest about the paper's own position?`, model: `The paper is **sympathetic to the nationalist leaders**, and it reads the agreement as a success for national unity.`, sol: `Read the closing hope as a sign of the paper's sympathies.`, scheme: [[`A nationalist, sympathetic stance`, 1]] })),
    child('c', short({ t: [2, 5], d: 3, c: 'application', marks: 2, stem: `**Either** (i): Name two things that a newspaper written for the depressed classes might have stressed in reporting the same days, and say why.`, model: `(1) **The argument for their own representatives**, since the paper would care most for that demand. (2) **What the agreement gave and did not give**, since its readers would judge it by what it meant for their own representation.`, sol: `Two emphases that follow from a different readership.`, scheme: [[`Stress on their demand for own representatives`, 1], [`Stress on what the agreement gave or withheld`, 1]] }),
    [short({ t: [2, 5], d: 3, c: 'application', marks: 2, stem: `**Or** (ii): Name two other kinds of source a historian could use to learn why Ambedkar held his view, and say what each would give.`, model: `(1) **His own speeches and writings** of the time, which would give his reasons in his own words. (2) **Records of the talks** kept by others present, which would show how each side argued and what was conceded.`, sol: `Two sources that reach the reasons behind a view.`, scheme: [[`His own speeches or writings`, 1], [`Records of the talks`, 1]] })]),
  ],
}));

// ================================================================ t03 Quit India and the last days
Q('m_qi_date', mcq({
  t: 3, d: 3, c: 'application',
  stem: `An imagined, undated letter says that the movement of two years ago is now being put down for good, that its main leader has lately been released on grounds of health and has begun talks with Jinnah, and that the war has not yet ended. Which dating is soundest?`,
  opts: [
    `In 1944, after his release and before the end of the war`,
    `In 1942, just after the resolution of August`,
    `In 1946, during the Cabinet Mission`,
    `In 1948, after his death`,
  ],
  sol: `The movement began in August 1942; his release and the talks with Jinnah came in 1944, while the war was still on.`,
}));
Q('m_league1940', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: `What did the Muslim League demand in its resolution at Lahore in 1940?`,
  opts: [
    `Independent states for the areas where Muslims were in a majority`,
    `Separate electorates for the depressed classes`,
    `The immediate departure of the British from India`,
    `A rule that the Congress ministries resign`,
  ],
  sol: `The resolution asked for independent states in the Muslim-majority areas. The other options describe other demands or events.`,
}));
Q('m_two_sides', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: `A student writes: In the mid-1940s the Congress and the League disagreed only because each party wanted to hold office. Which comment finds the main flaw?`,
  opts: [
    `It leaves out the arguments each side gave: the Congress said that it spoke for Indians of every community, while the League said that it represented Muslims and that they needed their own states`,
    `It wrongly says that the Congress took part in the talks`,
    `It wrongly says that the League existed in the 1940s`,
    `It is correct, since all parties seek office`,
  ],
  sol: `A fair account sets out each side's argument. Reducing a political dispute to a wish for office leaves out what each party said it stood for.`,
}));
Q('m_noakhali_role', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: `A student writes: Gandhi was in Calcutta on 15 August 1947 and not at the celebrations in Delhi, so he must have opposed independence. Which comment finds the flaw?`,
  opts: [
    `It infers his view from where he was, although he was working in Calcutta for communal harmony; his view of independence must be judged from what he said and did, which this fact does not show`,
    `It is correct, since a leader who stays away from a celebration opposes its purpose`,
    `It wrongly places him in Calcutta, since he was in Delhi that day`,
    `It wrongly gives 15 August 1947 as the date of the transfer of power`,
  ],
  sol: `Absence from an event is weak evidence of opposition to it. A historian needs his own statements and actions, and here the record shows him engaged in work for peace elsewhere.`,
}));
Q('m_assassin', mcq({
  t: 3, d: 1, c: 'recall',
  stem: `When and where was Gandhi assassinated?`,
  opts: [`30 January 1948, in Delhi`, `15 August 1947, in Calcutta`, `26 January 1950, in Delhi`, `2 October 1948, in Ahmedabad`],
  sol: `He was shot on 30 January 1948 at Delhi. His death was widely mourned.`,
}));
Q('m_calcutta_weaken', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: `Some historians say that Gandhi's presence in Calcutta in August 1947 helped to keep the city calm in those weeks. Which finding about an imagined set of records would most weaken that claim?`,
  opts: [
    `Records showing that the city was already calm before he arrived, and that districts he never visited were as calm as the city`,
    `Records showing that large crowds of Hindus and Muslims attended his prayer meetings`,
    `Records showing that local peace committees credited his presence`,
    `Records showing that police reports noted fewer incidents in the city during his stay`,
  ],
  sol: `To weaken a claim of influence, look for the same outcome without the supposed cause. Calm that came earlier and elsewhere without him makes his presence less likely to be the reason.`,
}));
Q('m_qi_local_weaken', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: `Historians say that Quit India grew into a widespread movement chiefly through the actions of local activists after the main leaders were in jail. Which finding about an imagined district would most weaken this claim for that district?`,
  opts: [
    `Records showing that strikes and sabotage began there only after a written plan from the jailed leaders was circulated by their agents, and that no local group acted before it`,
    `Records showing that a student group called the first strike`,
    `Records showing that local men set up a parallel government`,
    `Records showing that the police arrested local organisers within days`,
  ],
  sol: `The claim gives the initiative to local people. Action that waited for a plan from the leaders removes that, while the other findings show local initiative or the state's response.`,
}));
Q('ar_1939', ar({
  t: 3, d: 2, c: 'understanding', verdict: 'both-true-not-explains',
  a: `The Congress ministries resigned in October and November 1939.`,
  r: `In the elections of 1937 the Congress had won in eight of the eleven provinces.`,
  sol: `Both are accurate, but the second explains why the Congress held ministries, not why they resigned. The resignations followed the declaration of war on India's behalf without consulting Indians.`,
}));
Q('ar_cabinet', ar({
  t: 3, d: 4, c: 'analysis', verdict: 'both-true-not-explains',
  a: `The Cabinet Mission's proposal of 1946 for a loose federation broke down.`,
  r: `Direct Action Day on 16 August 1946 was followed by violence in Calcutta and elsewhere.`,
  sol: `Both are accurate, but the second does not account for the first. The proposal had already failed to hold when Direct Action Day was called, so the violence followed the breakdown rather than causing it.`,
}));
Q('ar_qi_central', ar({
  t: 3, d: 2, c: 'understanding', verdict: 'A-true-R-false',
  a: `The Quit India movement spread widely in 1942 even though the main leaders of the Congress were in jail from the first days.`,
  r: `The movement was directed throughout by detailed daily instructions from those leaders.`,
  sol: `The movement did spread, but with the leaders arrested at once it could not have been directed by them day by day; local activists organised much of it.`,
}));
Q('tf_1947', tf({
  t: 3, d: 1, c: 'understanding', ans: false,
  stem: `True or false? On 15 August 1947 Gandhi took part in the celebrations at Delhi.`,
  sol: `He was in Calcutta, working for harmony between communities.`,
}));
Q('ord_qi', ord({
  t: 3, d: 2, c: 'understanding', marks: 1,
  stem: `Arrange these events of the years 1939 to 1946 in chronological order, earliest first.`,
  items: [`The Congress ministries resign`, `The League's resolution at Lahore`, `The Quit India resolution`, `The Cabinet Mission`, `Gandhi's work for peace in Noakhali`],
  sol: `They fall in October and November 1939, 1940, August 1942, the spring of 1946 and the winter of 1946.`,
}));
Q('s_date_diary', short({
  t: [3, 5], d: 3, c: 'application', marks: 2, wl: S2,
  stem: `An imagined diary entry says: the leaders of the Congress were taken away this morning; the Viceroy's talks with the visiting mission failed earlier this year; the city is on strike. In which month and year was it most probably written, and which two clues support this?`,
  model: `Probably **August 1942**. The arrest of the Congress leaders points to the start of the Quit India movement, and the failed talks with the visiting mission point to the Cripps Mission of earlier that year.`,
  sol: `A date reasoned from two clues.`,
  scheme: [[`August 1942`, 1], [`Two clues linked to events`, 1]],
}));
Q('s_qi_leaders', short({
  t: 3, d: 4, c: 'analysis', marks: 2, wl: S2,
  stem: `In many districts strikes and sabotage began within days of August 1942, although the main leaders of the Congress were arrested at once. Suggest two explanations that do not depend on messages from the leaders in jail.`,
  model: `(1) **Young activists and local committees** acted on their own, so the movement did not need orders from jail. (2) The **arrests themselves may have angered people**, and the failed talks of that spring may have left them ready to act, so the arrests worked as a spark.`,
  sol: `Local initiative and the arrests as a trigger.`,
  scheme: [[`Local activists acted on their own`, 1], [`The arrests or earlier anger as a trigger`, 1]],
}));
Q('l_qi_assess', long({
  t: 3, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: `Assess how far the course of the Quit India movement of 1942 depended on the main leaders and how far on local activists.`,
  model: `1. **The start:** the resolution of 8 August 1942 began the movement, and Gandhi and other leaders were arrested at once.
2. **The leaders:** their call and their arrest gave the movement its occasion, and the arrests may themselves have angered people.
3. **Local activists:** young activists organised strikes and sabotage, and parallel governments appeared in places such as Satara and Medinipur, without orders from jail.
4. **The end:** the government suppressed the movement by 1943–44.
5. **Judgement:** the leaders supplied the call, but most of the course of the movement was shaped locally, so it depended chiefly on local activists.`,
  sol: `The part of the leaders, the part of local activists and a measured verdict.`,
  scheme: [[`The start of the movement`, 1], [`The part of the leaders`, 1], [`The part of local activists`, 1], [`Suppression`, 1], [`A reasoned judgement`, 1]],
}));
Q('sb_qi', source({
  t: [3, 5], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the source, an imagined letter between two volunteers, and answer the questions that follow. ${IMAG}`,
  passage: `**A letter from one student to another (imagined)**\n\nDear Kamla, we were stunned when the leaders were taken away at dawn on the day after the great meeting. Nobody in our college knew what to do, so a few of us met that night and decided to call a strike at the mills and to cut the telegraph wire on the road outside town. Some elders say that we are rash. But with nobody left to give orders, we must decide for ourselves. I hear that in a district not far from here the people have set up their own council to settle disputes and collect dues, and that the police dare not enter some villages. I will write again when I can. Keep this letter safe.`,
  parts: [
    child('a', short({ t: [3, 5], d: 1, c: 'recall', marks: 1, stem: `Name one place where a parallel government was set up during the Quit India movement.`, model: `**Satara** in Maharashtra, or **Medinipur** in Bengal.`, sol: `Both are named among the places of parallel governments.`, scheme: [[`Satara or Medinipur`, 1]] })),
    child('b', short({ t: [3, 5], d: 3, c: 'analysis', marks: 1, stem: `The writer says that with nobody left to give orders they must decide for themselves. What does this suggest about how the movement ran in its first days?`, model: `It ran by **local initiative**, without direction from a central leadership.`, sol: `Link the arrest of the leaders to decisions made on the spot.`, scheme: [[`Local initiative without central direction`, 1]] })),
    child('c', short({ t: [3, 5], d: 3, c: 'application', marks: 2, stem: `**Either** (i): Give the most probable month and year of the letter, with two clues from the passage.`, model: `**August 1942.** The leaders were taken away the day after a great meeting, which fits the arrests that followed the resolution, and the strikes, sabotage and local councils are features of that movement.`, sol: `A date reasoned from two clues.`, scheme: [[`August 1942`, 1], [`Two clues linked to the movement`, 1]] }),
    [short({ t: [3, 5], d: 4, c: 'analysis', marks: 2, stem: `**Or** (ii): A student says that this letter proves Quit India was a violent movement. Give two reasons why that conclusion is unsafe.`, model: `(1) It is **one writer in one town**, so it cannot show what happened across the country. (2) It mentions **strikes and a council** as well as one act of sabotage, so it shows a mixed picture; a historian needs **other records**, from police files and newspapers, to judge the movement as a whole.`, sol: `The narrowness of a single letter and the mixed picture inside it.`, scheme: [[`One writer, one place`, 1], [`Mixed contents and the need for other records`, 1]] })]),
  ],
}));

// ================================================================ t04 Knowing Gandhi: sources
Q('m_autobio_use', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: `A historian reading Gandhi's autobiography finds an account of a meeting but no date for it, and she needs the date. Which step is soundest?`,
  opts: [
    `Look for a newspaper or police report of the meeting made at the time, and use the autobiography for how he understood the event`,
    `Accept the date implied by the order of chapters, since he was present at the meeting`,
    `Leave the meeting out, since an autobiography cannot be used as evidence at all`,
    `Ask a later biographer to supply a date and treat it as certain`,
  ],
  sol: `A book written years afterwards by someone choosing episodes is weak on dates but valuable for his own understanding. A record made at the time supplies the date; the other steps either trust the book on dates or discard it altogether.`,
}));
Q('m_police_weaken', mcq({
  t: 4, d: 2, c: 'application',
  stem: `A police report of 1930 says that the march passed with little public interest. Which finding about its author would most weaken the report's reliability on this point?`,
  opts: [
    `He wrote from headquarters, relying on one informer who had not been to any meeting`,
    `He was a senior officer with many years of service`,
    `He wrote his report in English`,
    `He handed it in on the due date`,
  ],
  sol: `Reliability on an event depends on how the writer knew of it. Writing from headquarters on the word of an absent informer leaves the claim without a witness.`,
}));
Q('m_dep_indep', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: `Four imagined records report one speech of 1930: Newspaper X and Newspaper Y, which both printed the text of one news agency; a note by a police officer who was in the audience; and a diary written by a volunteer the same evening. Which pair is NOT independent evidence of what was said?`,
  opts: [
    `Newspaper X and Newspaper Y`,
    `The police officer's note and the volunteer's diary`,
    `Newspaper X and the police officer's note`,
    `Newspaper Y and the volunteer's diary`,
  ],
  sol: `Two papers that printed one agency's text come from a single source, so they count as one witness. Every other pair rests on separate observers.`,
}));
Q('m_letter_pub_weaken', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: `A historian says that a letter from an imagined leader to a colleague shows his unguarded private feelings. Which finding would most weaken this claim?`,
  opts: [
    `The letter was marked for publication and was printed in a journal within a week`,
    `The letter was written in the leader's own hand`,
    `The letter was kept in the colleague's papers for many years`,
    `The letter was long`,
  ],
  sol: `A letter written for printing was meant for the public and so was shaped for readers. The other findings say nothing about the writer's intended audience.`,
}));
Q('m_speech_vs_journal', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: `A historian wants to know how a leader explained non-violence to a village crowd in simple terms. Which source would be most useful?`,
  opts: [
    `A report, in the language of the audience, of what he said at a village meeting`,
    `An article he wrote for a journal read across the country`,
    `A formal letter he sent to the Viceroy`,
    `A table of arrests in the district`,
  ],
  sol: `The question concerns how he spoke to villagers. A report of a village meeting reaches that; the article and the letter were written for other readers, and a table of arrests is silent on words.`,
}));
Q('tf_police', tf({
  t: 4, d: 1, c: 'understanding', ans: false,
  stem: `True or false? Because police reports were written by officials, they give a neutral picture of events and can be used without any checking.`,
  sol: `They reflect the officials' fears and anxieties and sometimes misread events, so historians check them against other sources.`,
}));
Q('fb_autob', fb({
  t: 4, d: 1, c: 'recall',
  stem: `Gandhi's autobiography, The Story of My Experiments with Truth, was written in ___ in the 1920s.`,
  acc: [[`Gujarati`]],
  sol: `He wrote the book in Gujarati.`,
}));
Q('l_sources_eval', long({
  t: [4, 5], d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: `A historian wishes to find out how widely and how warmly the march of 1930 was received along its route. Evaluate (a) a fortnightly police report, (b) a nationalist newspaper and (c) an autobiography of a volunteer written years afterwards, and say what she should rely on.`,
  model: `1. **Police report:** it records meetings and arrests, but it reflects the officials' fears and may play down support.\n2. **Nationalist newspaper:** it gives detail and local colour, but it was written for sympathetic readers and may stress enthusiasm.\n3. **Autobiography:** it gives an inside view, but memory and purpose shape what is told years later.\n4. **Comparison:** each errs in a different direction, so none is a neutral witness.\n5. **Judgement:** she should use them together, weigh each against the others, and look for a source with no stake in the matter, such as a report in a foreign paper.`,
  sol: `Each source weighed on who made it and why, then a combined strategy.`,
  scheme: [[`The police report weighed`, 1], [`The newspaper weighed`, 1], [`The autobiography weighed`, 1], [`The sources compared`, 1], [`A reasoned strategy`, 1]],
}));
Q('sb_autob', source({
  t: [4, 5], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the source, a SOYL summary of what the autobiography of a political leader of the 1920s contains, and answer the questions that follow. ${SUM}`,
  passage: `**What such an autobiography contains (summary)**\n\nThe book tells the story of the author's life as he looks back on it. It is written in the first person and is arranged by episodes and the lessons drawn from them rather than by year. The author chooses which episodes to tell, explains each as a lesson in his own principles, and often gives dates loosely or not at all. Many of the public campaigns of the author's later years are not described in it.`,
  parts: [
    child('a', short({ t: [4, 5], d: 1, c: 'recall', marks: 1, stem: `Name the language in which Gandhi first wrote his autobiography.`, model: `**Gujarati.**`, sol: `It was written in Gujarati in the 1920s.`, scheme: [[`Gujarati`, 1]] })),
    child('b', short({ t: [4, 5], d: 3, c: 'analysis', marks: 1, stem: `The book is arranged by lessons rather than by year. What does this suggest about using it to fix the date of an event?`, model: `It is **not a safe guide to exact dates**; a historian should check dates against other records made at the time.`, sol: `Link the arrangement to the need for dated evidence from elsewhere.`, scheme: [[`Dates need checking against other records`, 1]] })),
    child('c', short({ t: [4, 5], d: 3, c: 'application', marks: 2, stem: `**Either** (i): Name two other kinds of source that could check the details of an episode told in such a book, and say what each would check.`, model: `(1) **Letters written at the time**, which would check what he thought and did then. (2) **Newspaper or police reports of the event**, which would check the date, the place and the numbers present.`, sol: `Two contemporary kinds of record, each tied to a detail.`, scheme: [[`Letters and what they check`, 1], [`Reports and what they check`, 1]] }),
    [short({ t: [4, 5], d: 3, c: 'application', marks: 2, stem: `**Or** (ii): Suppose the book and a letter written in the same week give different reasons for one decision. Say which a historian should treat with more caution, and give one reason.`, model: `She should treat the **book** with more caution as evidence of his thinking at the time. It was written **years later**, so memory and the author's purpose may have reshaped his reasons, while the letter was written close to the decision.`, sol: `Closeness in time against retrospect.`, scheme: [[`The book treated with more caution`, 1], [`The reason from time and purpose`, 1]] })]),
  ],
}));
