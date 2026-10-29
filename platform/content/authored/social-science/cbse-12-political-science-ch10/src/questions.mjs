// CBSE 12 Political Science, ch10 Politics of Planned Development — question bank. Every scenario,
// district, document and speaker is imagined and written by SOYL (labelled as such); no NCERT text, box,
// cartoon or exercise and no board/sample-paper item is reused (D-036). Real-world facts are limited to
// stable, verifiable ones: Bombay Plan 1944; Planning Commission set up in March 1950 by a government
// resolution with the Prime Minister as chairperson; First Plan 1951 (agriculture), Second Plan 1956
// (heavy industry, P. C. Mahalanobis); annual plans 1966–69; Operation Flood from 1970 (Verghese Kurien,
// the Anand cooperative pattern); NITI Aayog from 1 January 2015. Nothing after 2024 is stated.
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
const IMAG = '*(Imagined document written by SOYL for practice; the people and places in it are not real.)*';

// ================================================================ t01 Contestation over development; planning models
Q('m_dev_political', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Why is "development" treated as a **political** question in this chapter, and not only as an economic one?',
  opts: [
    'Because choices about what to develop, and who gains or bears the cost, are made by public decisions that affect different groups differently',
    'Because only political parties are allowed to build factories and dams',
    'Because economists have no role in deciding the path of development',
    'Because development happens only during election years',
  ],
  sol: 'Decisions on priorities (industry or farming, dams or forests) create winners and losers, so they are argued over in public life and settled through political processes. The other options are simply false descriptions.',
}));
Q('m_dev_cost', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'An imagined state government plans a large steel plant on forest land in Saranda district (imagined). Forest-dwelling communities oppose it, while job-seekers in nearby towns welcome it. This situation best illustrates',
  opts: [
    'that development decisions involve trade-offs between groups and are therefore contested',
    'that industrial projects never create employment',
    'that forest communities are always against every kind of change',
    'that the Planning Commission decided the location of every factory',
  ],
  sol: 'The plant may bring jobs and output to some while displacing others from land and livelihood: the clash over who gains and who pays is what makes development political. The other options overstate or misstate the case.',
}));
Q('m_two_models', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'At independence, the two broad models of development that Indian leaders could look to were',
  opts: [
    'the liberal-capitalist model of Western Europe and the USA, and the socialist model of the USSR',
    'the feudal model and the colonial model',
    'the Gandhian model and the Japanese imperial model',
    'the free-trade model of Britain and the barter model of villages',
  ],
  sol: 'The choice was usually framed as a contrast between the market-led liberal-capitalist path and the state-led socialist path; India finally chose a mix of the two.',
}));
Q('m_consensus', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Around the time of independence there was broad agreement among leaders of different views on one point. What was it?',
  opts: [
    'Development could not be left to private actors alone; the government had to play a major role through planning',
    'India should copy the Soviet model in every detail',
    'India should not build any heavy industry',
    'Agriculture should be left entirely to the market with no state support',
  ],
  sol: 'Even people who disagreed on many things accepted that the state had to plan and invest to overcome poverty. How far and in which sectors were the points of dispute.',
}));
Q('m_bombay_plan', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'The Bombay Plan of 1944 is remembered because',
  opts: [
    'a group of leading industrialists proposed a planned economy in which the state would invest heavily in industry',
    'it was the first Five Year Plan adopted by Parliament',
    'it was drafted by the Soviet government for India',
    'it called for all industries to remain in British hands',
  ],
  sol: 'In 1944 some of India\'s big industrialists drafted a joint proposal favouring planning and a strong role for the state in industrial investment, which shows that support for planning came even from business circles.',
}));
Q('m_pc_status', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'Which statement about the status of the Planning Commission set up in 1950 is correct?',
  opts: [
    'It was created by a resolution of the Government of India; it was neither mentioned in the Constitution nor created by a separate law',
    'It was created by a special article of the Constitution',
    'It was an elected body chosen by the state legislatures',
    'It was a court that heard disputes about development projects',
  ],
  sol: 'The Commission was an advisory body set up in March 1950 by a simple government resolution, with the Prime Minister as its chairperson. It was not a constitutional or statutory body.',
}));
Q('m_pc_chair', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Who chaired the Planning Commission of India?',
  opts: ['The Prime Minister', 'The President', 'The Chief Justice of India', 'The Speaker of the Lok Sabha'],
  sol: 'From its creation the Prime Minister was the chairperson, which gave planning a central place in government.',
}));
Q('m_first_plan', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'The main emphasis of the First Five Year Plan (from 1951) was on',
  opts: [
    'agriculture, including irrigation and dams, and land reform',
    'heavy and basic industries such as steel and machine tools',
    'the export of software services',
    'defence production only',
  ],
  sol: 'After Partition and food shortages, the First Plan gave priority to farming: irrigation, dams and land reform. Heavy industry was the stress of the Second Plan.',
}));
Q('m_second_plan', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Which planner\'s name is closely linked with the Second Five Year Plan and its stress on heavy industry?',
  opts: ['P. C. Mahalanobis', 'K. N. Raj', 'J. C. Kumarappa', 'Verghese Kurien'],
  sol: 'The statistician P. C. Mahalanobis led the thinking behind the Second Plan (from 1956). K. N. Raj is linked with the First Plan, J. C. Kumarappa with a Gandhian alternative, and Verghese Kurien with the dairy cooperatives.',
}));
Q('m_raj_slow', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'K. N. Raj, a young economist who worked on the First Plan, argued that India',
  opts: [
    'should move cautiously in the first two decades instead of rushing into very rapid growth',
    'should abolish all agriculture and build only factories',
    'should hand planning over to foreign experts',
    'should end planning after the first five years',
  ],
  sol: 'His view, paraphrased, was that a poor new nation should go forward steadily and carefully, building savings and capacity before attempting a big push.',
}));
Q('m_tariffs', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Under the Second Plan the government put high duties on imports of goods that Indian firms could make. A minister of an imagined later government argues this was meant to',
  opts: [
    'protect domestic industries from foreign competition so that they could grow',
    'make imported goods cheaper for consumers',
    'help foreign firms capture the Indian market',
    'reduce the role of the public sector to zero',
  ],
  sol: 'High import duties shielded new Indian industries from imports, which helped both public and private firms expand at home, at the cost of choice and efficiency for consumers.',
}));
Q('m_kumarappa', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'J. C. Kumarappa is remembered in debates on planning for',
  opts: [
    'putting forward a Gandhian economic programme centred on villages, small industry and self-reliance',
    'designing the heavy-industry strategy of the Second Plan',
    'founding the dairy cooperative movement at Anand',
    'chairing NITI Aayog when it was set up',
  ],
  sol: 'He developed Gandhian ideas into an alternative plan that stressed rural industries and simple living, in contrast to the big-industry approach.',
}));
Q('m_charan_singh', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'Chaudhary Charan Singh criticised the planning of the 1950s mainly because, in his view,',
  opts: [
    'it gave too much priority to urban industry and too little to agriculture and villages',
    'it gave too much money to farmers',
    'it did not set up enough heavy industry',
    'it allowed too many private industries to grow',
  ],
  sol: 'A leader rooted in peasant politics, he argued that the industry-first approach neglected the rural majority and that prosperity should be built from agriculture.',
}));
Q('m_mixed', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'In the imagined country Nirmala, steel, railways and power are run by state enterprises, while shops, farms and textile mills remain mostly private. Which model does Nirmala follow?',
  opts: ['A mixed economy', 'A pure capitalist economy', 'A pure socialist economy', 'A feudal economy'],
  sol: 'Public and private sectors working side by side is the mark of a mixed economy, the model India adopted after independence.',
}));
Q('m_public_heights', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Supporters of a strong public sector in the 1950s argued that the state should own industries such as steel and power. Which reason fits their argument best?',
  opts: [
    'These industries needed huge investment and long waiting periods that private firms of the time could not or would not provide',
    'Private firms were banned by the Constitution',
    'Public ownership guaranteed that these industries would make the highest profits',
    'Foreign countries insisted that India own them',
  ],
  sol: 'Basic industries need very large capital and give returns only slowly, so the state was expected to build them; the other options are not historical arguments.',
}));
Q('m_agri_vs_ind', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Which pair correctly matches the two sides of the "agriculture versus industry" debate of the early plans?',
  opts: [
    'One side said the Second Plan neglected farming and rural India; the other said without industry poverty could not be removed',
    'One side wanted no planning at all; the other wanted only planning for exports',
    'Both sides agreed that agriculture should get no public money',
    'One side wanted only dairy farming; the other wanted only steel plants',
  ],
  sol: 'Critics held that an industry-first strategy left villages behind, while defenders replied that rapid industrial growth was essential, and that the plans did fund farming too.',
}));
Q('m_pvt_growth', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'A historian of the imagined Udaypur University argues that India\'s private sector actually grew under the planning era. Which fact supports her?',
  opts: [
    'Protection from imports and the state\'s investment in basic industries created a sheltered home market in which private firms expanded',
    'The government transferred all public enterprises to private owners in the 1950s',
    'Private firms were exempt from every licence',
    'There were no public-sector firms at the time',
  ],
  sol: 'Tariff protection and public investment in steel, power and transport gave private firms both a protected market and the inputs they needed, so they also grew.',
}));
Q('ar_resolution', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'The Planning Commission was an advisory body and not a constitutional one.',
  r: 'It was set up in 1950 by a resolution of the Government of India and not by any article of the Constitution.',
  sol: 'Both are true. The way it was created, by a government resolution and not by the Constitution, is exactly why it was an advisory, non-constitutional body.',
}));
Q('ar_bombay', ar({
  t: 1, d: 3, c: 'analysis', key: 'b',
  a: 'Planning in India had support from sections of big business.',
  r: 'The Second Five Year Plan placed its main emphasis on heavy industry.',
  sol: 'Both are true, but R does not explain A. The support of business is shown by the Bombay Plan of 1944, written by industrialists; the Second Plan\'s focus on heavy industry is a separate fact.',
}));
Q('ar_first_plan', ar({
  t: 1, d: 2, c: 'analysis', key: 'c',
  a: 'The First Five Year Plan gave high priority to agriculture.',
  r: 'The First Five Year Plan was designed mainly to set up steel plants and machine-tool factories.',
  sol: 'A is true: farming, irrigation and land reform came first. R is false: the push for heavy industry belongs to the Second Plan.',
}));
Q('ar_soviet_copy', ar({
  t: 1, d: 3, c: 'analysis', key: 'd',
  a: 'India adopted the Soviet model of development in full, with no private property.',
  r: 'Indian planning was influenced by the experience of Soviet planning.',
  sol: 'A is false: India chose a mixed economy in which private property and a private sector remained. R is true: Soviet planning was one influence on Indian planners.',
}));
Q('tf_pc_statute', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? The Planning Commission was set up by an Act of Parliament.',
  sol: 'It was created by a resolution of the Union government in March 1950, not by an Act of Parliament or an article of the Constitution.',
}));
Q('tf_bombay_business', tf({
  t: 1, d: 2, c: 'recall', ans: true,
  stem: 'True or false? The Bombay Plan of 1944 was drafted by a group of industrialists.',
  sol: 'A group of leading industrialists drew it up, showing that business groups too favoured planning with a large role for the state.',
}));
Q('fb_year_pc', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The Planning Commission of India was set up in March ___.',
  acc: [['1950']],
  sol: 'It was set up in March 1950 by a government resolution.',
}));
Q('fb_mahalanobis', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'The Second Five Year Plan, which stressed heavy industry, was drawn up under the leadership of the statistician ___.',
  acc: [['P. C. Mahalanobis', 'Mahalanobis', 'P C Mahalanobis', 'Prasanta Chandra Mahalanobis']],
  sol: 'P. C. Mahalanobis shaped the Second Plan from 1956.',
}));
Q('mt_people', match({
  t: [1, 2], d: 2, c: 'understanding',
  stem: 'Match each person with the idea or work in Indian planning debates for which they are best remembered.',
  pairs: [
    ['P. C. Mahalanobis', 'Heavy-industry strategy of the Second Plan'],
    ['K. N. Raj', 'Caution about the pace of growth in the First Plan'],
    ['J. C. Kumarappa', 'A Gandhian, village-centred alternative'],
    ['Verghese Kurien', 'Cooperative dairying and Operation Flood'],
  ],
  sol: 'Mahalanobis — Second Plan; Raj — First Plan and a cautious pace; Kumarappa — Gandhian economics; Kurien — the dairy cooperative movement.',
}));
Q('ord_events', ord({
  t: [1, 2], d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these events of India\'s planning story in chronological order.',
  items: [
    'Industrialists publish the Bombay Plan',
    'The Planning Commission is set up by a government resolution',
    'The Second Five Year Plan begins with a stress on heavy industry',
    'NITI Aayog replaces the Planning Commission',
  ],
  sol: 'Bombay Plan (1944), Planning Commission (1950), Second Plan (1956), NITI Aayog (2015).',
}));
Q('s_pol_question', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two reasons why decisions about economic development lead to political contestation.',
  model: '1. Development has **costs and benefits for different groups**: a dam may irrigate one region but **displace** people in another.\n2. Choices of **priority** (industry or agriculture, cities or villages) involve **values and interests**, so parties, movements and citizens argue over them.',
  sol: 'Two separate reasons: unequal costs and benefits, and the clash of priorities and values.',
  scheme: [['Unequal costs and benefits explained', 1], ['Conflict over priorities or values explained', 1]],
}));
Q('s_two_models', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish the liberal-capitalist and socialist models of development as they were seen at India\'s independence.',
  model: '1. **Liberal-capitalist** model: most production by **private firms in a market**, as in Western Europe and the USA; the state plays a limited role.\n2. **Socialist** model: the **state owns and plans** production, as in the USSR, to reduce inequality.',
  sol: 'One clear feature of each model with its example.',
  scheme: [['Liberal-capitalist model', 1], ['Socialist model', 1]],
}));
Q('s_pc_feature', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State any two facts about the setting up of the Planning Commission.',
  model: '1. It was set up in **March 1950** by a **resolution of the Government of India**, so it was an **advisory** body, not constitutional or statutory.\n2. The **Prime Minister** was its **chairperson**, which gave it great weight in government.',
  sol: 'Any two of: year 1950, government resolution, advisory status, Prime Minister as chair.',
  scheme: [['First correct fact', 1], ['Second correct fact', 1]],
}));
Q('s_first_second', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'How did the priorities of the First and Second Five Year Plans differ?',
  model: '1. The **First Plan** (from **1951**) focused on **agriculture**: irrigation, dams and **land reform**.\n2. The **Second Plan** (from **1956**) stressed **heavy industry** such as steel, with tariffs to protect domestic industry, under **P. C. Mahalanobis**.',
  sol: 'One priority of each plan, contrasted.',
  scheme: [['First Plan priority', 1], ['Second Plan priority', 1]],
}));
Q('s3_consensus_disagree', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'There was a consensus on planning at independence, yet there were sharp disagreements. Explain the consensus and two points of disagreement.',
  model: '1. **Consensus:** almost all leaders agreed that **the state must plan and invest** to remove poverty; even industrialists backed planning in the **Bombay Plan of 1944**.\n2. **Disagreement on priorities:** some wanted **heavy industry first**, others wanted **agriculture and villages** first.\n3. **Disagreement on ownership:** how large the **public sector** should be, and how much room the **private sector** should have.',
  sol: 'Consensus plus two distinct areas of dispute.',
  scheme: [['Consensus on state-led planning', 1], ['First disagreement', 1], ['Second disagreement', 1]],
}));
Q('s3_public_private', short({
  t: 1, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Present one argument for and one against a large public sector in the planning era, and give a balanced conclusion.',
  model: '1. **For:** basic industries such as steel and power needed **huge, long-term investment** that private firms could not make, and public enterprises could serve **national goals** like regional balance.\n2. **Against:** many public enterprises became **inefficient** and loss-making, and controls such as licences **slowed** private initiative.\n3. **Conclusion:** the public sector laid foundations for growth, but its efficiency and limits became an issue later, leading to reforms.',
  sol: 'One argument on each side and a reasoned conclusion.',
  scheme: [['Argument for', 1], ['Argument against', 1], ['Balanced conclusion', 1]],
}));
Q('l_models_debate', long({
  t: 1, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Describe the debate over models of development in India after independence. Why did India choose a mixed economy?',
  model: '1. **Two models:** the **liberal-capitalist** path of the West (market and private firms) and the **socialist** path of the USSR (state ownership and central planning).\n2. **Consensus on planning:** leaders across views, and even industrialists in the **Bombay Plan (1944)**, accepted that the **state** must lead investment to fight poverty.\n3. **Disputes:** on **priorities** (industry or agriculture) and on the **size of the public sector**; Gandhian thinkers such as **J. C. Kumarappa** offered a village-centred alternative.\n4. **Mixed economy:** India kept **private property and a private sector** while the **state ran key industries** and planned investment.\n5. **Why:** it fitted a **democracy** that wanted both growth and **social justice**, without giving up individual freedoms.',
  sol: 'Explain both models, the consensus, the disputes, the choice made and the reasons for it.',
  scheme: [['The two models', 1], ['Consensus on planning', 1], ['Points of dispute', 1], ['Features of the mixed economy', 1], ['Reasons for the choice', 1]],
}));
Q('l_agri_industry', long({
  t: 1, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: '"The early plans neglected agriculture for the sake of industry." Examine this claim, giving arguments on both sides.',
  model: '1. **The First Plan** actually made **agriculture**, irrigation and dams its main priority, so the claim does not fit it.\n2. **The Second Plan** shifted to **heavy industry**, and critics such as **Chaudhary Charan Singh** argued that villages and farmers were **neglected**.\n3. **Critics** also said that **land reforms** were weakly carried out, so investment did not reach the small farmer.\n4. **Defenders** replied that **industrial growth** was necessary to make tools, fertiliser and power for farming, and that spending on agriculture continued.\n5. **Assessment:** the claim is **partly true** for the Second Plan\'s emphasis, but agriculture was not ignored; the food shortages of the **1960s** later forced a sharper focus on farming.',
  sol: 'Arguments for and against, with evidence from both plans, and a reasoned judgement.',
  scheme: [['Evidence from the First Plan', 1], ['Critics\' case on the Second Plan', 1], ['Land reform or rural neglect', 1], ['Defenders\' case', 1], ['Balanced conclusion', 1]],
}));

// ================================================================ t02 Major outcomes; NITI Aayog
Q('m_foundations', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which of the following is generally counted as a lasting outcome of the early planning era?',
  opts: [
    'Large dams, steel plants and other basic industries that laid foundations for later growth',
    'The complete removal of poverty by 1970',
    'The end of all regional inequality',
    'The abolition of the public sector',
  ],
  sol: 'Planning built big projects such as dams, steel plants and power stations that later growth relied on; it did not end poverty or regional gaps.',
}));
Q('m_bhilai', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'The Bhilai steel plant is often cited as an example of a basic industry built in the planning era with the help of',
  opts: ['the Soviet Union', 'Japan', 'the European Union', 'the World Trade Organization'],
  sol: 'Bhilai was built in the public sector with Soviet collaboration and began production in 1959, a symbol of the heavy-industry push.',
}));
Q('m_land_reform', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which statement best sums up the outcome of land reforms in the planning era?',
  opts: [
    'Zamindari was largely abolished, but land ceilings and protection of tenants were carried out weakly in most states',
    'All landless labourers received land within ten years',
    'Land reforms were never attempted after independence',
    'Land reforms made every farm the same size',
  ],
  sol: 'The abolition of zamindari succeeded broadly, but ceilings on holdings and tenancy reforms were often evaded because landowners were powerful, so results were mixed.',
}));
Q('m_land_power', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'A researcher studying an imagined district of the 1960s finds that the land-ceiling law existed on paper but very little surplus land was given to the landless. The most likely political explanation is that',
  opts: [
    'landowning groups were influential in local and state politics and blocked or evaded the law',
    'the landless refused to accept land',
    'the Constitution banned land ceilings',
    'the Planning Commission ran every district directly',
  ],
  sol: 'Powerful landowners could use their political influence, benami transfers and delays to avoid ceilings; this is why implementation was weak.',
}));
Q('m_food_crisis', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'What pushed the government in the mid-1960s to adopt a new strategy for agriculture?',
  opts: [
    'Severe food shortages after droughts and dependence on imported grain',
    'A sudden surplus of food grains',
    'A demand from industrialists to stop growing crops',
    'The creation of NITI Aayog',
  ],
  sol: 'The droughts of the mid-1960s and reliance on food imports made raising farm output urgent, which led to the new strategy later called the Green Revolution.',
}));
Q('m_gr_inputs', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The Green Revolution in India was based mainly on',
  opts: [
    'high-yielding seeds together with fertiliser, pesticides and assured irrigation, supported by the government',
    'the use of bullock carts in place of tractors',
    'ending all subsidies to farmers',
    'growing only cash crops for export',
  ],
  sol: 'The new strategy combined high-yielding varieties with fertiliser, pesticides, irrigation and support prices, first in areas with assured water.',
}));
Q('m_gr_regions', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'In its early years the Green Revolution brought the largest gains to',
  opts: [
    'irrigated regions such as Punjab, Haryana and western Uttar Pradesh',
    'dry hill regions with no irrigation',
    'all regions of India equally',
    'only the cities',
  ],
  sol: 'Gains came first where irrigation and resources were already better, which widened differences between regions.',
}));
Q('m_gr_politics', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which political effect is commonly linked to the Green Revolution?',
  opts: [
    'The rise of middle and rich farmers as an organised and influential force in politics',
    'The disappearance of farmers from politics',
    'The end of all rural movements',
    'The merger of all political parties into one',
  ],
  sol: 'Prosperous farmers in the Green Revolution regions became a strong interest group from the 1970s, shaping party politics and farm policy.',
}));
Q('m_gr_inequality', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'In the imagined village of Kesargarh, owners of large irrigated farms bought tractors and new seeds and became prosperous after 1970, while small farmers without wells gained little. This illustrates which outcome of the Green Revolution?',
  opts: [
    'It sharpened inequalities between classes of farmers',
    'It ended rural poverty everywhere',
    'It reduced the use of fertiliser',
    'It made every farmer equally rich',
  ],
  sol: 'The benefits went mostly to those who could afford inputs and had water, widening the gap with poor peasants.',
}));
Q('m_annual_plans', mcq({
  t: 2, d: 3, c: 'recall',
  stem: 'Between 1966 and 1969 India had annual plans instead of a Five Year Plan. This interval is often called',
  opts: ['the plan holiday', 'the licence raj', 'the green period', 'the emergency plan'],
  sol: 'After the Third Plan, droughts, war and economic strain led to three annual plans (1966–69), a gap often called the plan holiday.',
}));
Q('m_op_flood', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Operation Flood, launched in 1970, aimed to',
  opts: [
    'link rural milk producers through cooperatives to consumers in cities',
    'build flood-control dams on major rivers',
    'move farmers from villages to cities',
    'replace milk with imported powder',
  ],
  sol: 'Operation Flood spread the cooperative dairy model nationally so that village producers could sell milk directly in urban markets; it is also called the White Revolution.',
}));
Q('m_anand', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The Anand pattern of dairy development, associated with Verghese Kurien, is an example of',
  opts: [
    'a cooperative model in which producers own and control the enterprise',
    'a state monopoly that banned private milk sale',
    'a foreign company buying milk from farmers',
    'a model in which only large landowners kept cattle',
  ],
  sol: 'In the Anand pattern, village milk producers form cooperatives that collect, process and market milk, so they share the gains; small and landless producers could also take part.',
}));
Q('m_niti_year', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'NITI Aayog replaced the Planning Commission with effect from',
  opts: ['1 January 2015', '15 August 1947', '26 January 1950', '1 April 1991'],
  sol: 'NITI Aayog (National Institution for Transforming India) came into being on 1 January 2015, replacing the Planning Commission.',
}));
Q('m_niti_role', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'How is the main role of NITI Aayog officially described?',
  opts: [
    'As a policy think tank of the government that also promotes cooperative federalism with the states',
    'As a court that settles disputes between states',
    'As a body that collects taxes for the Union',
    'As an elected house of Parliament',
  ],
  sol: 'It is described as a think tank giving policy advice and as a forum that brings the Union and states together; it does not collect taxes or decide disputes.',
}));
Q('m_niti_council', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'At an imagined meeting of NITI Aayog\'s Governing Council, the Prime Minister sits with the chief ministers of the states to discuss national priorities. Which idea does such a meeting reflect?',
  opts: ['Cooperative federalism', 'One-party dominance', 'A plan holiday', 'Judicial review'],
  sol: 'Bringing the Union and the states together to set shared goals is the idea of cooperative federalism that NITI Aayog was meant to promote.',
}));
Q('m_niti_funds', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'Which change is usually pointed out when the Planning Commission is compared with NITI Aayog?',
  opts: [
    'The Planning Commission had a say in allocating plan funds to states, whereas NITI Aayog mainly advises and does not allocate such funds',
    'NITI Aayog draws up compulsory Five Year Plans for every state',
    'The Planning Commission had no chairperson, while NITI Aayog is chaired by the President',
    'NITI Aayog is mentioned in the Constitution, while the Planning Commission was created by an Act',
  ],
  sol: 'A key difference often stressed is that NITI Aayog is an advisory think tank without the power of the old Commission over plan grants; both bodies were created by government resolutions and chaired by the Prime Minister.',
}));
Q('m_displacement', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'A large dam in the imagined valley of Tarani gives irrigation to plains farmers but floods forest villages upstream. A political scientist would most likely say that this shows',
  opts: [
    'development can benefit some groups while imposing heavy costs on others, especially the displaced',
    'dams never bring any benefits',
    'forest villages always gain from dams',
    'irrigation has nothing to do with politics',
  ],
  sol: 'The same project creates gains for some and losses for others; questions of displacement and rehabilitation are therefore central in debates on development.',
}));
Q('ar_gr_regions', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'The Green Revolution increased differences between regions in India.',
  r: 'Its early benefits went mainly to areas that already had assured irrigation and better resources.',
  sol: 'Both are true, and R explains A: because gains came first where water and inputs were available, those regions moved ahead of the rest.',
}));
Q('ar_niti_pc', ar({
  t: 2, d: 3, c: 'analysis', key: 'c',
  a: 'NITI Aayog replaced the Planning Commission in 2015.',
  r: 'NITI Aayog was created by an amendment to the Constitution.',
  sol: 'A is true. R is false: like the Planning Commission, NITI Aayog was set up by a resolution of the Union government, not by a constitutional amendment.',
}));
Q('ar_dairy_small', ar({
  t: 2, d: 3, c: 'analysis', key: 'b',
  a: 'Operation Flood helped many small and landless rural households earn cash income.',
  r: 'Operation Flood was launched in 1970.',
  sol: 'Both statements are true, but the launch year does not explain the benefit; the benefit came from cooperatives that let small producers sell milk in city markets.',
}));
Q('tf_gr_equal', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? The Green Revolution benefited all regions and all classes of farmers equally.',
  sol: 'Its gains were concentrated in irrigated regions and among farmers who could afford the new inputs, so inequalities grew.',
}));
Q('tf_niti_cm', tf({
  t: 2, d: 2, c: 'recall', ans: true,
  stem: 'True or false? The chief ministers of the states are members of the Governing Council of NITI Aayog.',
  sol: 'The Governing Council brings the Prime Minister together with the chief ministers (and the heads of union territories), reflecting cooperative federalism.',
}));
Q('fb_niti_full', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'NITI in NITI Aayog stands for National Institution for ___ India.',
  acc: [['Transforming']],
  sol: 'NITI stands for National Institution for Transforming India.',
}));
Q('mt_outcomes', match({
  t: 2, d: 2, c: 'understanding',
  stem: 'Match each development initiative of the planning period with the result it is best known for.',
  pairs: [
    ['Green Revolution', 'Higher grain output, mainly in irrigated regions'],
    ['Operation Flood', 'Milk cooperatives linking villages to city markets'],
    ['Abolition of zamindari', 'End of intermediaries between the state and cultivators'],
    ['Heavy-industry push', 'Steel plants and machine-building capacity'],
  ],
  sol: 'Green Revolution — grain output in irrigated areas; Operation Flood — dairy cooperatives; zamindari abolition — removal of intermediaries; heavy industry — steel and machinery.',
}));
Q('ord_agri', ord({
  t: 2, d: 3, c: 'application', marks: 1,
  stem: 'Arrange these developments in Indian agriculture and rural policy in the order in which they began.',
  items: [
    'Zamindari abolition laws passed in many states',
    'Food shortages after the droughts of the mid-1960s',
    'High-yielding seeds spread in irrigated regions',
    'Operation Flood launched to build dairy cooperatives nationwide',
  ],
  sol: 'Zamindari abolition (early 1950s), food crisis (mid-1960s), spread of high-yielding seeds (late 1960s), Operation Flood (1970).',
}));
Q('s_gr_political', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Mention two political consequences of the Green Revolution.',
  model: '1. **Rich and middle farmers** in the gaining regions became a strong, **organised political force** that pressed for support prices and subsidies.\n2. Growing **inequality** between regions and between farmers created **tension and unrest** among poorer peasants in some areas.',
  sol: 'One consequence about the rise of farmer interests, one about inequality and conflict.',
  scheme: [['Rise of farmer interest groups', 1], ['Inequality and resulting tension', 1]],
}));
Q('s_niti_vs_pc', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'State two differences that are usually drawn between NITI Aayog and the Planning Commission.',
  model: '1. The **Planning Commission** prepared **Five Year Plans** and influenced the **allocation of plan funds**; **NITI Aayog** works mainly as a **think tank** giving advice.\n2. NITI Aayog gives the **states a formal voice** through its Governing Council of chief ministers, to promote **cooperative federalism**.',
  sol: 'Two differences: planning and funds versus advice, and the stronger formal role of the states.',
  scheme: [['Plans and funds versus advice', 1], ['Role of the states', 1]],
}));
Q('s_kurien', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why is Operation Flood regarded as a success of rural development?',
  model: '1. It built **milk cooperatives** that gave **small and landless producers** a steady **cash income**.\n2. By linking village producers directly to **city markets**, it cut out middlemen and greatly **raised milk production** in the country.',
  sol: 'One gain for producers and one wider gain.',
  scheme: [['Benefit to small producers', 1], ['Wider benefit: markets or output', 1]],
}));
Q('s_land_mixed', short({
  t: 2, d: 3, c: 'evaluation', marks: 2, wl: S2,
  stem: 'Were land reforms after independence a success? Give a brief assessment.',
  model: 'They were a **partial success**. The **abolition of zamindari** removed a powerful class of intermediaries, but **land ceilings and tenancy reforms** were weakly enforced because **landowners were politically influential**, so few landless people gained land.',
  sol: 'A judgement with one achievement and one failure, and the reason.',
  scheme: [['Achievement', 1], ['Limitation with reason', 1]],
}));
Q('s3_outcomes', short({
  t: 2, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Evaluate three outcomes of the planning era for India\'s development.',
  model: '1. **Foundations:** large **dams, steel plants and power** projects were built, on which later growth depended.\n2. **Agriculture:** the **Green Revolution** made India much more self-sufficient in grain, but it **widened regional and class gaps**.\n3. **Limits:** **land reforms** were only partly carried out, and controls and licences made some industries **inefficient**, which later led to reforms.',
  sol: 'Three outcomes with a clear positive or negative judgement in each.',
  scheme: [['First outcome assessed', 1], ['Second outcome assessed', 1], ['Third outcome assessed', 1]],
}));
Q('s3_niti_coop', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain how NITI Aayog is meant to work differently from the Planning Commission, with reference to cooperative federalism.',
  model: '1. NITI Aayog was set up on **1 January 2015** as a **think tank** that offers **policy advice** rather than a body that fixes plan grants.\n2. Its **Governing Council** includes the **Prime Minister and chief ministers**, so states take part in setting national priorities.\n3. This is meant to strengthen **cooperative federalism**, treating states as **partners**; critics and supporters still debate how far this has been achieved.',
  sol: 'Role as a think tank, the states\' place in its structure, and the link to cooperative federalism.',
  scheme: [['Advisory think-tank role', 1], ['Place of the states', 1], ['Cooperative federalism explained', 1]],
}));
Q('s3_dev_costs', short({
  t: 2, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Large development projects have often displaced people. Suggest three ways in which the costs of such projects could be shared more fairly.',
  model: '1. **Consult** affected communities, for example through **gram sabhas**, before projects are approved, and consider alternatives.\n2. Provide **fair compensation, land for land** and **rehabilitation** with jobs and schools for the displaced.\n3. Share **benefits** with local people, such as irrigation, power or a share of income from the project, and protect **forests and rights** of tribal communities.',
  sol: 'Three practical measures: consultation, rehabilitation and benefit-sharing or protection of rights.',
  scheme: [['Consultation', 1], ['Compensation and rehabilitation', 1], ['Benefit-sharing or protection of rights', 1]],
}));
Q('l_gr_outcomes', long({
  t: 2, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain the background, features and political consequences of the Green Revolution in India.',
  model: '1. **Background:** droughts and **food shortages** in the **mid-1960s** made India depend on imported grain, so raising output became urgent.\n2. **Features:** **high-yielding seeds** with **fertiliser, pesticides and irrigation**, supported by subsidies and **support prices**, first in irrigated regions.\n3. **Gains:** grain output rose sharply and India became largely **self-sufficient** in food.\n4. **Inequality:** benefits went mainly to **Punjab, Haryana and western Uttar Pradesh** and to better-off farmers, widening **regional and class gaps**.\n5. **Politics:** **middle and rich farmers** emerged as an **organised political force**, while poorer peasants in some areas turned to protest.',
  sol: 'Background, features, achievement, inequality and political effects.',
  scheme: [['Background', 1], ['Features', 1], ['Achievement', 1], ['Inequality', 1], ['Political consequences', 1]],
}));
Q('l_niti', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Why was the Planning Commission replaced by NITI Aayog? Discuss the arguments made for the change and the concerns raised about it.',
  model: '1. **Change:** NITI Aayog replaced the Planning Commission on **1 January 2015**, set up like it by a **government resolution** with the **Prime Minister** as chairperson.\n2. **Argument for:** after **economic reforms** the economy was more **market-led**, so rigid Five Year Plans were seen as less useful than **flexible policy advice**.\n3. **Argument for:** states wanted a **bigger say**; the **Governing Council** of chief ministers supports **cooperative federalism**.\n4. **Concern:** NITI Aayog does not allocate plan funds, so some feared **less voice for states** over money, which now flows more through the **Finance Ministry**.\n5. **Assessment:** the change reflects new conditions; how far it strengthens states is still **debated**.',
  sol: 'Facts of the change, two arguments for, a concern raised, and a balanced conclusion.',
  scheme: [['Facts of the change', 1], ['First argument for', 1], ['Second argument for', 1], ['Concern raised', 1], ['Balanced conclusion', 1]],
}));
Q('l_dev_politics', long({
  t: [1, 2], d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: '"Development is never only a technical matter; it is a political choice." Discuss with examples from India\'s planning experience.',
  model: '1. **Choice of model:** leaders chose a **mixed economy** after a debate between capitalist and socialist paths, a political judgement about freedom and equality.\n2. **Priorities:** the **Second Plan** chose **heavy industry**, and critics such as **Charan Singh** argued for villages and agriculture.\n3. **Who gains:** the **Green Revolution** raised output but helped **irrigated regions** and richer farmers more, creating new interest groups.\n4. **Who pays:** big **dams and mines** displaced forest and rural communities, leading to **movements** over rehabilitation.\n5. **Conclusion:** because every choice creates **winners and losers**, development is settled through **democratic politics** and not by experts alone.',
  sol: 'Four examples showing choices and their political effects, and a conclusion.',
  scheme: [['Choice of model', 1], ['Choice of priorities', 1], ['Unequal gains', 1], ['Costs and displacement', 1], ['Conclusion', 1]],
}));

// ================================================================ source-based
Q('sb_district_meeting', source({
  t: 1, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source from the imagined minutes of a district planning meeting in Rampur Khas (1955) and answer the questions that follow. ${IMAG}`,
  passage: '**Minutes of a district development meeting, Rampur Khas (imagined), 1955**\n\nThe collector reported that the new canal from the first plan will reach forty villages next year. A member of the district board asked why the next plan was said to give so much money to steel works far away, when farmers here still wait for wells and seed stores. A visiting engineer replied that without steel there would be no pumps, rails or canal gates, and that the country cannot import everything for ever. A woman teacher asked that some funds be kept for schools and health, saying a canal alone does not make a village prosperous.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which line shows the priority of the First Five Year Plan?', model: 'The **new canal** that will reach forty villages: the First Plan stressed **agriculture and irrigation**.', sol: 'Irrigation works point to the First Plan\'s farm focus.', scheme: [['Correct line with reason', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which plan is the member probably referring to when he speaks of money for steel works?', model: 'The **Second Five Year Plan**, which stressed **heavy industry**.', sol: 'Steel and heavy industry mark the Second Plan.', scheme: [['Second Plan named', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Which two sides of the "agriculture versus industry" debate appear in the source? Explain each.', model: 'The **board member** speaks for **agriculture**: farmers still lack wells and seed stores while money goes to steel. The **engineer** speaks for **industry**: steel is needed for pumps, rails and canal gates, and India cannot import everything.', sol: 'Identify both speakers and their arguments.', scheme: [['Agriculture side', 1], ['Industry side', 1]] }), [
      short({ t: 1, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): What is the teacher\'s point, and why is it relevant to debates on development?', model: 'She argues that **development is more than economic growth**: **schools and health** matter too. This is relevant because planning must weigh **social welfare** against investment in production.', sol: 'State her point and link it to the wider meaning of development.', scheme: [['Her point', 1], ['Relevance explained', 1]] }),
    ]),
  ],
}));
Q('sb_farmer_letter', source({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, an imagined letter from a farmer in the village of Dhanaula Kalan (1973), and answer the questions that follow. ${IMAG}`,
  passage: '**Letter from a farmer to his brother in the army (imagined), 1973**\n\nThe new wheat has doubled what we get from the twelve acres by the tubewell. We bought a tractor on a bank loan and the support price lets us plan ahead. But Mohinder, who has two acres and no well, still works on others\' fields and borrows from the moneylender. Last month farmers from many villages met in the town and decided to form an association to ask the government for cheaper diesel and better prices. People say that whoever stands for elections now must listen to us.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Identify two inputs of the Green Revolution mentioned in the letter.', model: '**New high-yielding wheat** and **assured irrigation from a tubewell** (also a tractor bought on credit, and support prices).', sol: 'Any two of the inputs named.', scheme: [['Two correct inputs', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'How does Mohinder\'s case show a limitation of the Green Revolution?', model: 'As a **small farmer without a well**, he could not use the new methods, so he **gained little**: benefits went mainly to those with land and water.', sol: 'Link his small holding and lack of irrigation to unequal gains.', scheme: [['Limitation explained', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): What political change is described in the last two sentences? Explain.', model: 'Prosperous farmers are **organising** into an **association** to press for diesel and price demands, and candidates now need their votes: the **rise of farmers as an organised political force**.', sol: 'Name the change and connect it to the source.', scheme: [['Change identified', 1], ['Explained with the source', 1]] }), [
      short({ t: 2, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Suggest two measures that could have helped farmers like Mohinder share the gains.', model: '(1) **Public irrigation** such as canals or community tubewells for small plots. (2) **Cheap institutional credit** and cooperatives so that small farmers can buy seeds and inputs without moneylenders.', sol: 'Two practical measures tied to water and credit or similar.', scheme: [['First measure', 1], ['Second measure', 1]] }),
    ]),
  ],
}));
Q('sb_dam_report', source({
  t: [1, 2], d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: `Read the source, an imagined newspaper report from the Tarani valley (1985), and answer the questions that follow. ${IMAG}`,
  passage: '**Report in an imagined regional newspaper, 1985**\n\nThe proposed Tarani dam will irrigate a large area of the dry plains and produce electricity for two towns, officials said yesterday. But about thirty forest villages upstream will be submerged. At a meeting in Bhimgarh, villagers said they had not been told where they would be resettled, and that cash compensation would not replace the forest that gives them food and fuel. An engineer said the project would be studied again to reduce the area flooded. Leaders of the plains farmers have demanded that work start at once.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'understanding', marks: 1, stem: 'Name the groups who expect to gain and to lose from the dam.', model: '**Gain:** plains farmers and the towns (irrigation and power). **Lose:** the **forest villages** that will be submerged.', sol: 'One gaining and one losing group.', scheme: [['Both groups named', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Why do the villagers say cash compensation is not enough?', model: 'Because the **forest gives them food and fuel**: their **livelihood** depends on it and money cannot replace that way of life.', sol: 'Link compensation to livelihood loss.', scheme: [['Reason from the source', 1]] })),
    child('c', short({ t: [1, 2], d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): How does this report show that development is a political question?', model: 'The dam creates **winners and losers**: plains farmers press for quick work while villagers demand **resettlement** and their rights. The outcome depends on **public debate, pressure and government choices**, not on engineering alone.', sol: 'Contending groups and the need for a political decision.', scheme: [['Contending interests', 1], ['Decision through political processes', 1]] }), [
      short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Suggest two steps the government could take to make the project fairer.', model: '(1) **Consult** the villagers before final approval and redesign to **reduce the flooded area**. (2) Provide **land-for-land resettlement**, jobs and a **share of the benefits** such as power or irrigation to the displaced.', sol: 'Two practical, fair steps.', scheme: [['First step', 1], ['Second step', 1]] }),
    ]),
  ],
}));
Q('sb_dairy_diary', source({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, an imagined diary of the secretary of the Navli milk cooperative (1978), and answer the questions that follow. ${IMAG}`,
  passage: '**Diary of the secretary of a village milk society, Navli (imagined), 1978**\n\nThis morning a hundred and forty members poured milk at the collection centre; most own just one or two buffaloes. Each member\'s milk is tested for fat and paid for by its quality, morning and evening. Our society sends the milk to the district union\'s plant, and the plant sends it by rail tanker to the big city. Since the national programme began, two more villages have formed societies. Women members asked today for a vet to visit every week.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which national programme is the secretary most likely referring to?', model: '**Operation Flood**, launched in **1970** to spread dairy cooperatives.', sol: 'Village societies linked to city markets point to Operation Flood.', scheme: [['Operation Flood', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'understanding', marks: 1, stem: 'Which line shows that small producers benefit from the cooperative?', model: '"Most own just **one or two buffaloes**", yet they are **paid regularly by quality**.', sol: 'Small owners with fair, regular payment.', scheme: [['Correct evidence', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain how the three-level structure described in the diary works.', model: 'Members sell milk to the **village society**, which sends it to the **district union\'s plant** for processing, and the milk then reaches **city markets**. Producers own each level, so **gains return to them** rather than to middlemen.', sol: 'Village society → district union → market, with producer ownership.', scheme: [['The levels described', 1], ['Benefit of producer ownership', 1]] }), [
      short({ t: 2, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Why is this model often described as a successful alternative path of rural development?', model: 'It raised incomes of **small and landless households**, including **women**, without needing large landholdings, and built a **democratic, member-owned** institution that links villages to markets.', sol: 'Two reasons: inclusive income gains and democratic cooperative ownership.', scheme: [['Inclusive gains', 1], ['Cooperative and democratic character', 1]] }),
    ]),
  ],
}));
Q('sb_council_note', source({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, an imagined note by a state official after a NITI Aayog Governing Council meeting, and answer the questions that follow. ${IMAG}`,
  passage: '**Note by an officer of an imagined state government**\n\nOur chief minister attended the Governing Council with the Prime Minister and chief ministers of other states. Unlike the old practice of plan talks, there was no discussion of the size of our plan grant, which now comes through other channels. Instead, papers were circulated on water, schools and digital services, with rankings comparing states. Our chief minister welcomed the chance to share ideas, but asked that states be given more time to comment on proposals before they are finalised.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'understanding', marks: 1, stem: 'Who are members of the Governing Council according to the note?', model: 'The **Prime Minister** and the **chief ministers** of the states.', sol: 'Both named in the first line.', scheme: [['Members named', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Which line shows a difference from the Planning Commission\'s way of working?', model: '"There was **no discussion of the size of our plan grant**": NITI Aayog does not allocate plan funds as the old Commission did.', sol: 'The missing grant talks mark the change.', scheme: [['Correct line with reason', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): How does the meeting reflect the idea of cooperative federalism?', model: 'The Union and the states **sit together** to discuss common issues and **share ideas**, and rankings encourage states to learn from one another, treating states as **partners** in national goals.', sol: 'Joint forum and partnership.', scheme: [['Joint forum', 1], ['States as partners', 1]] }), [
      short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): What concern does the chief minister raise, and why might states care about it?', model: 'He wants **more time to comment** before proposals are final. States want a real **voice in shaping** policies they must carry out; otherwise cooperation may be seen as **only advisory**.', sol: 'State the concern and the reason it matters.', scheme: [['Concern stated', 1], ['Reason explained', 1]] }),
    ]),
  ],
}));
