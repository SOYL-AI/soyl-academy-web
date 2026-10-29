// CBSE 12 Political Science, ch06 Environment and Natural Resources — question bank. Every scenario,
// country, document and speaker is imagined and written by SOYL (labelled as such); no NCERT text, box,
// cartoon or exercise and no board/sample-paper item is reused (D-036). Real-world facts are limited to
// stable, verifiable ones: Limits to Growth and the Stockholm conference / UNEP (1972), the Brundtland
// Report (1987), the Rio Earth Summit (1992), the Antarctic Treaty (1959), the Montreal Protocol (1987),
// the UNFCCC (1992), the Kyoto Protocol (1997; India ratified 2002), the Paris Agreement (2015), the UN
// Working Group on Indigenous Populations (1982). Nothing after 2024 is stated.
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
const IMAG = '*(Imagined document written by SOYL for practice; the people and places in it are not real.)*';

// ================================================================ t01 Environmental concerns in global politics
Q('m_why_global', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Why did environmental questions become part of **global** politics from the 1960s onwards rather than staying purely national matters?',
  opts: [
    'Damage such as ozone loss and a warming atmosphere crosses borders, so no single government can deal with it alone',
    'The United Nations took over the forests and rivers of every member state',
    'Environmental problems disappeared inside countries and appeared only between them',
    'Only military alliances were allowed to discuss pollution',
  ],
  sol: 'Problems like ozone depletion, a warming climate and shrinking fish stocks do not stop at borders, so they need cooperation among governments. The UN never took over national resources, problems did not vanish at home, and alliances had no monopoly on the subject.',
}));
Q('m_limits_growth', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The 1972 report that warned of the potentially catastrophic depletion of the earth\'s resources against the background of rapidly growing world population was published by',
  opts: ['the Club of Rome', 'the Brundtland Commission', 'the World Trade Organization', 'the Antarctic Treaty Secretariat'],
  sol: 'The Club of Rome published *Limits to Growth* in 1972. The Brundtland Commission reported in 1987 on sustainable development; the WTO dates from 1995 and deals with trade.',
}));
Q('m_unep', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The United Nations Environment Programme (UNEP) was set up after an international conference on the human environment held in which year?',
  opts: ['1972', '1987', '1992', '1997'],
  sol: 'UNEP was created in 1972 after the UN conference on the human environment at Stockholm. 1987 is the Brundtland Report and the Montreal Protocol, 1992 the Rio Earth Summit, 1997 the Kyoto Protocol.',
}));
Q('m_brundtland', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The Brundtland Report, *Our Common Future* (1987), is best remembered for',
  opts: [
    'popularising the idea of sustainable development: growth that does not damage the prospects of future generations',
    'setting binding emission targets for industrialised countries',
    'declaring Antarctica a zone free of military activity',
    'creating the World Council of Indigenous Peoples',
  ],
  sol: 'The 1987 report argued that development must meet present needs without harming future generations, which is the idea of sustainable development. Binding targets came with Kyoto (1997), the Antarctic rules with the 1959 treaty, and the indigenous council was formed in 1975.',
}));
Q('m_rio_outcome', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Which of the following was **NOT** an outcome of the 1992 Earth Summit at Rio de Janeiro?',
  opts: ['The Kyoto Protocol', 'Agenda 21', 'The Convention on Biological Diversity', 'The UN Framework Convention on Climate Change'],
  sol: 'Rio produced Agenda 21, the climate change framework convention, the biodiversity convention and a set of forest principles. The Kyoto Protocol was agreed five years later, in 1997, under the climate convention.',
}));
Q('m_north_south_rio', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'At an imagined preparatory meeting before an environmental summit, delegates from rich industrialised states speak mainly about ozone loss and global warming, while delegates from poorer states ask how protecting the environment can be linked to their need for growth. This split most closely mirrors',
  opts: [
    'the North–South difference that surfaced at the Rio Earth Summit',
    'the East–West military rivalry of the Cold War',
    'a disagreement between two members of the same military alliance',
    'a dispute about voting rules in the UN Security Council',
  ],
  sol: 'At Rio the developed North stressed ozone depletion and global warming, while the developing South wanted environmental regulation tied to economic development. The other options concern military or institutional disputes, not this environment–development divide.',
}));
Q('m_agenda21', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Critics of Agenda 21 have argued that it',
  opts: [
    'leaned more towards economic growth than towards ecological conservation',
    'banned all economic growth in developing countries',
    'was a military treaty with no link to the environment',
    'applied only to Antarctica and outer space',
  ],
  sol: 'Agenda 21 listed development practices for sustainable development, but critics said its approach favoured growth over ecological conservation. It did not ban growth, was not a military treaty, and was not limited to the global commons.',
}));
Q('m_shrinking_land', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which of the following is a reason commonly given for environmental concern becoming a global issue?',
  opts: [
    'Cultivable land is hardly expanding while much existing farmland is losing fertility',
    'Fish stocks in the oceans have grown much faster than demand',
    'Clean drinking water has become available to everyone in the world',
    'Natural forests are expanding everywhere because of rising population',
  ],
  sol: 'Little new cultivable land is available and much existing farmland is degraded, which threatens food supply. The other options state the reverse of the real concerns: overfishing, lack of safe water for many and loss of forests.',
}));
Q('ar_global_issue', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'Environmental issues have become a part of international politics.',
  r: 'Problems such as ozone depletion and the warming of the atmosphere cannot be solved by any one country acting alone.',
  sol: 'Both are true, and R explains A: because the damage crosses borders, governments have to negotiate and cooperate, which makes the environment a subject of world politics.',
}));
Q('ar_rio_agenda', ar({
  t: 1, d: 3, c: 'analysis', key: 'b',
  a: 'The Rio Earth Summit of 1992 brought environmental issues into the centre of global politics.',
  r: 'The Club of Rome published *Limits to Growth* in 1972.',
  sol: 'Both statements are true, but R does not explain A. Rio\'s importance comes from the many governments that met there and the agreements it produced; the 1972 report is an earlier, separate event.',
}));
Q('tf_unep_1987', tf({
  t: 1, d: 1, c: 'recall', ans: false,
  stem: 'True or false? The United Nations Environment Programme was created in 1987 after the Brundtland Report.',
  sol: 'UNEP was set up in **1972**, after the Stockholm conference. 1987 is the year of the Brundtland Report, which came later.',
}));
Q('fb_agenda21', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The list of development practices adopted at the 1992 Earth Summit to achieve sustainable development is called Agenda ___.',
  acc: [['21', 'twenty-one']],
  sol: 'It is Agenda 21, adopted at the Rio Earth Summit.',
}));
Q('s_why_politics', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two reasons why questions of environment and natural resources became matters of world politics.',
  model: '1. Problems such as **ozone depletion and global warming cross borders**, so states must negotiate together.\n2. Shrinking **cultivable land, fish stocks, fresh water and forests** create competition among states over who uses resources and who bears the cost of protecting them.',
  sol: 'One point on cross-border damage and one on scarcity and competition.',
  scheme: [['Cross-border nature of the damage', 1], ['Scarcity and competition over resources', 1]],
}));
Q('s_rio_divide', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'How did the concerns of the developed North differ from those of the developing South at the Rio Earth Summit?',
  model: 'The **North** was mainly concerned with **ozone depletion and global warming**. The **South** wanted environmental rules to be **linked to economic development**, because it still needed growth to remove poverty and felt the North had caused most of the damage.',
  sol: 'State each side\'s main concern.',
  scheme: [['Concern of the North', 1], ['Concern of the South', 1]],
}));
Q('s3_sustainable', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Explain the idea of sustainable development with the help of an example of an imagined coastal town that wants to build a large new port.',
  model: '**Sustainable development** means meeting today\'s needs **without reducing the ability of future generations** to meet theirs.\n1. The town may build the port for **jobs and trade**, but should protect **mangroves and fishing grounds** that support livelihoods for decades.\n2. It can choose a **smaller site, treat waste water** and limit dredging, so that growth and the environment go together.',
  sol: 'Definition plus an application to the port that balances growth with protection.',
  scheme: [['Meaning of sustainable development', 1], ['Need for growth recognised', 1], ['Measure that protects the environment for the future', 1]],
}));
Q('l_rio', long({
  t: 1, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Why is the Rio Earth Summit of 1992 seen as a turning point for environmental politics? Explain its outcomes and the differences it revealed.',
  model: '1. **Scale:** a very large number of governments met at Rio in June 1992, making the environment a central item of world politics.\n2. **Outcomes:** the **UNFCCC**, the **Convention on Biological Diversity**, forest principles and **Agenda 21**, a list of practices for sustainable development.\n3. **North–South split:** the North focused on **ozone and global warming**; the South wanted environmental rules **tied to development**.\n4. **Agreement:** both sides accepted that growth should be **ecologically responsible**, which is the idea of sustainable development.\n5. **Limits:** critics said Agenda 21 **favoured growth** over conservation, and many promises depended on later negotiations.',
  sol: 'Context, outcomes, the divide, the compromise and a limitation.',
  scheme: [['Why Rio was a landmark', 1], ['Main outcomes', 1], ['North–South difference', 1], ['Common ground: sustainable development', 1], ['A criticism or limitation', 1]],
}));

// ================================================================ t02 Global commons; CBDR
Q('m_commons_def', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'In world politics, "global commons" refers to',
  opts: [
    'areas or regions that lie outside the sovereign jurisdiction of any one state and need common governance',
    'land owned jointly by villagers in a panchayat',
    'resources owned by the largest economy in each region',
    'parks and gardens in the capital cities of UN members',
  ],
  sol: 'Global commons are areas such as the earth\'s atmosphere, Antarctica, the ocean floor and outer space, which no single state owns. Village commons are a local version of the idea, not the global one.',
}));
Q('m_commons_example', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Which one of the following is **NOT** an example of the global commons?',
  opts: ['A national park inside India', 'Antarctica', 'Outer space', 'The deep ocean floor beyond national waters'],
  sol: 'A national park lies within one state\'s territory and is governed by its laws. Antarctica, outer space and the deep ocean floor lie beyond any single state\'s jurisdiction.',
}));
Q('m_antarctic', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'The Antarctic Treaty, which reserves the continent for peaceful purposes such as scientific research, was signed in',
  opts: ['1959', '1972', '1987', '1997'],
  sol: 'The Antarctic Treaty dates from 1959; a further environmental protocol followed in 1991. 1987 is the Montreal Protocol and 1997 the Kyoto Protocol.',
}));
Q('m_montreal', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The Montreal Protocol of 1987 is an agreement to',
  opts: [
    'protect the ozone layer by phasing out ozone-depleting substances',
    'set binding targets for cutting greenhouse gases in industrialised countries',
    'divide the deep sea bed among coastal states',
    'ban mining on all indigenous lands',
  ],
  sol: 'The Montreal Protocol deals with substances that damage the ozone layer. Greenhouse-gas targets came with Kyoto; the other two options describe no such treaty.',
}));
Q('m_commons_hard', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Two imagined states, one rich with a large space programme and one poor with none, disagree over rules for satellites and space debris. This illustrates which difficulty in managing the global commons?',
  opts: [
    'Unequal technology means the benefits of using the commons go mainly to the advanced states',
    'The commons are owned by the poorer state, so it alone sets the rules',
    'Outer space has no connection with the environment',
    'All states already agree completely on how to use outer space',
  ],
  sol: 'Using outer space or the ocean floor needs advanced technology, so rich states gain most while all share the risks; this unequal access makes agreement hard. No single state owns the commons, and states clearly disagree.',
}));
Q('m_cbdr_meaning', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The principle of "common but differentiated responsibilities" means that',
  opts: [
    'all states share the duty to protect the environment, but developed states should carry a larger share because they did more damage and have more resources',
    'every state must cut its emissions by exactly the same percentage',
    'only developing states are responsible for protecting the environment',
    'responsibility for the environment belongs to private companies, not states',
  ],
  sol: 'The duty is **common** to all, but **differentiated** by past contribution to the damage and by capacity. Equal cuts for all, or a burden only on poorer states, contradict the principle.',
}));
Q('m_kyoto', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'The Kyoto Protocol, agreed in 1997, set binding targets to reduce greenhouse gas emissions for',
  opts: ['industrialised (developed) countries', 'all countries equally', 'only countries in Asia', 'only countries without nuclear weapons'],
  sol: 'Kyoto bound industrialised countries to emission cuts; developing countries such as India and China were not given binding targets, in line with common but differentiated responsibilities.',
}));
Q('m_paris', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'How did the Paris Agreement of 2015 differ broadly from the Kyoto Protocol?',
  opts: [
    'All parties, developed and developing, put forward their own national climate pledges',
    'It abolished the idea of climate change negotiations',
    'It placed binding targets only on developing countries',
    'It was signed only by members of the European Union',
  ],
  sol: 'Under Paris every party, rich or poor, sets its own nationally determined contribution, while Kyoto placed binding targets mainly on industrialised countries. The other options are false.',
}));
Q('ar_cbdr', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'Developing countries argue that developed countries should take the lead in cutting greenhouse gas emissions.',
  r: 'Most of the historical and current emissions of greenhouse gases have come from the developed, industrialised countries.',
  sol: 'Both are true and R explains A: because industrialised countries caused most of the accumulated emissions, developing countries argue that they should bear a greater responsibility, which is the basis of common but differentiated responsibilities.',
}));
Q('ar_ozone_hole', ar({
  t: 2, d: 3, c: 'analysis', key: 'c',
  a: 'The discovery of the ozone hole over Antarctica in the mid-1980s showed how the global commons can be harmed by human activity.',
  r: 'The ozone hole was caused entirely by volcanic eruptions in Antarctica.',
  sol: 'A is true: the ozone hole was a striking example of damage to a global common. R is false: the main cause was human-made substances such as CFCs, which is why the Montreal Protocol targeted them.',
}));
Q('tf_kyoto_india', tf({
  t: 2, d: 2, c: 'application', ans: false,
  stem: 'True or false? Under the Kyoto Protocol, India and China had to make the same binding emission cuts as the industrialised countries.',
  sol: 'Developing countries, including India and China, were **exempt** from Kyoto\'s binding targets, reflecting common but differentiated responsibilities.',
}));
Q('fb_commons', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Areas such as the earth\'s atmosphere, Antarctica, the ocean floor and outer space, which lie outside the jurisdiction of any one state, are called the global ___.',
  acc: [['commons']],
  sol: 'They are the global commons.',
}));
Q('mt_agreements', match({
  t: 2, d: 2, c: 'recall',
  stem: 'Match each environmental agreement or report with the year in which it was signed or published.',
  pairs: [
    ['Antarctic Treaty', '1959'],
    ['Montreal Protocol', '1987'],
    ['UN Framework Convention on Climate Change', '1992'],
    ['Kyoto Protocol', '1997'],
  ],
  sol: 'Antarctic Treaty 1959; Montreal Protocol 1987; the climate change framework convention at Rio 1992; Kyoto Protocol 1997.',
}));
Q('ord_milestones', ord({
  t: [1, 2], d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these milestones of environmental politics in chronological order.',
  items: [
    'The Antarctic Treaty is signed',
    'The Club of Rome publishes Limits to Growth',
    'The Brundtland Report, Our Common Future, appears',
    'The Earth Summit is held at Rio de Janeiro',
    'The Kyoto Protocol is agreed',
  ],
  sol: '1959 Antarctic Treaty, 1972 Limits to Growth, 1987 Brundtland Report, 1992 Rio Earth Summit, 1997 Kyoto Protocol.',
}));
Q('s_commons_two', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What are global commons? Why is cooperation over them difficult? Give one reason.',
  model: '**Global commons** are areas outside the **sovereign jurisdiction of any state**, such as the atmosphere, Antarctica, the ocean floor and outer space.\nCooperation is hard because of **scientific uncertainty and unequal technology**: rich states gain most from using them while costs are shared.',
  sol: 'Meaning with examples, then one reason.',
  scheme: [['Meaning with examples', 1], ['One reason cooperation is difficult', 1]],
}));
Q('s_cbdr', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain the principle of "common but differentiated responsibilities" in your own words.',
  model: 'Protecting the planet is a duty **shared by all states** (common). But the burden should **differ**: developed countries, which caused **most past emissions** and have **more money and technology**, should do more and help developing countries.',
  sol: 'Explain both halves: common and differentiated.',
  scheme: [['Common: shared duty of all states', 1], ['Differentiated: greater burden on developed states, with reason', 1]],
}));
Q('s3_kyoto_paris', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Compare the Kyoto Protocol and the Paris Agreement on three points.',
  model: '1. **Year:** Kyoto was agreed in **1997**; Paris in **2015**.\n2. **Who commits:** Kyoto placed **binding cuts on industrialised countries** only; under Paris **every party** makes its own pledge.\n3. **How targets are set:** Kyoto\'s targets were **negotiated and fixed**; Paris relies on **nationally determined contributions** reviewed over time.',
  sol: 'Three clear points of comparison.',
  scheme: [['First point of comparison', 1], ['Second point of comparison', 1], ['Third point of comparison', 1]],
}));
Q('s3_ozone_commons', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Using the ozone layer as an example, show why the protection of the global commons needs international agreements.',
  model: '1. The ozone layer belongs to **no single state**, yet all depend on it for protection from harmful radiation.\n2. Substances released in **one country** thin the layer **for everyone**, so no state can protect it alone.\n3. The **Montreal Protocol (1987)** got states to phase out ozone-depleting substances together, showing that **joint rules** work where single states cannot.',
  sol: 'Shared resource, cross-border damage, an agreement as the answer.',
  scheme: [['Ozone layer as a global common', 1], ['Damage crosses borders', 1], ['Montreal Protocol as joint action', 1]],
}));
Q('l_commons', long({
  t: 2, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'What are the global commons? Explain with examples why managing them has proved difficult, and mention any two agreements that have tried to protect them.',
  model: '1. **Meaning:** areas outside the **sovereign jurisdiction** of any state, which need common governance.\n2. **Examples:** the **atmosphere**, **Antarctica**, the **ocean floor** and **outer space**.\n3. **Difficulty one:** **scientific uncertainty** about the scale and causes of damage makes states slow to agree.\n4. **Difficulty two:** **unequal technology**: rich states can exploit space or the deep sea while poorer states cannot, so the gains and costs are shared unequally.\n5. **Agreements:** the **Antarctic Treaty (1959)** and the **Montreal Protocol (1987)** on the ozone layer show that cooperation is possible.',
  sol: 'Meaning, examples, two difficulties, two agreements.',
  scheme: [['Meaning', 1], ['Examples', 1], ['First difficulty', 1], ['Second difficulty', 1], ['Two agreements', 1]],
}));
Q('l_cbdr_debate', long({
  t: [2, 3], d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Developed and developing countries have different views on who should bear the cost of protecting the climate. Present both views and evaluate the principle of common but differentiated responsibilities.',
  model: '1. **Developed view (broadly):** climate change is everyone\'s problem, so **all major emitters**, including large developing economies, should accept commitments.\n2. **Developing view:** the North caused **most historical emissions** and is richer, so it should **cut first** and help others with **finance and technology**; developing states need room to **remove poverty**.\n3. **CBDR:** combines both: a **common** duty for all, with **differentiated** burdens according to past emissions and capacity.\n4. **Strength:** it is **fair** and helped bring developing countries into agreements such as the climate convention and Kyoto.\n5. **Limit:** as some developing economies\' emissions grow, the line between groups is debated; Paris (2015) answered with **pledges by every party**.',
  sol: 'Both views, the principle, a strength and a limitation.',
  scheme: [['View of developed countries', 1], ['View of developing countries', 1], ['CBDR explained', 1], ['Strength of the principle', 1], ['Limitation or later change', 1]],
}));

// ================================================================ t03 India's stand
Q('m_india_kyoto', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'India signed and ratified the Kyoto Protocol in',
  opts: ['2002', '1992', '1997', '2015'],
  sol: 'India signed and ratified the Kyoto Protocol in August 2002. 1992 is the Rio summit, 1997 the year the protocol was agreed, 2015 the Paris Agreement.',
}));
Q('m_india_percapita', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'One argument India has made in climate negotiations is that',
  opts: [
    'its per capita emissions are much lower than those of the developed countries',
    'climate change has no effect on developing countries',
    'developing countries should accept larger cuts than developed countries',
    'emissions should be counted only for the period after 2015',
  ],
  sol: 'India points out that emissions per person in India are a small fraction of those in developed countries, so it should not bear the same burden. The other options contradict India\'s stated position.',
}));
Q('m_india_kyoto_exempt', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'An imagined student says: "India ratified Kyoto, so it must have accepted binding emission cuts." What is wrong with this claim?',
  opts: [
    'Kyoto placed binding cuts on industrialised countries; India, as a developing country, was exempt from such targets',
    'India never ratified the Kyoto Protocol',
    'Kyoto had no connection with greenhouse gases',
    'Ratifying a treaty never creates any obligation',
  ],
  sol: 'India did ratify Kyoto (2002), but as a developing country it had no binding reduction target. Kyoto was about greenhouse gases, and ratification does create obligations for those bound by targets.',
}));
Q('m_india_steps', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Which of the following is an example of the kind of domestic step India has taken on climate and energy?',
  opts: [
    'A law to promote energy conservation and laws and missions encouraging renewable energy',
    'Withdrawing from every international environmental agreement',
    'Banning all use of electricity in villages',
    'Refusing to discuss climate change at the United Nations',
  ],
  sol: 'India has passed an Energy Conservation Act (2001), encouraged renewable energy and adopted a national action plan on climate change. It has stayed in international agreements and continues to negotiate at the UN.',
}));
Q('m_india_review', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Which statement best sums up India\'s broad position on climate change?',
  opts: [
    'Act on climate change, but on the basis of equity and historical responsibility, without compromising the right to development',
    'Leave climate change entirely to the developed countries and take no action at home',
    'Accept the same targets as every developed country immediately',
    'Treat climate change as purely a scientific matter with no political side',
  ],
  sol: 'India supports collective action but stresses equity, common but differentiated responsibilities and the need for development to remove poverty, while also acting at home. The other options misstate this balance.',
}));
Q('ar_india_dev', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'India has argued that developing countries need space for economic growth while tackling climate change.',
  r: 'A large part of India\'s population still needs better access to energy, jobs and basic services.',
  sol: 'Both are true and R explains A: because development needs remain large, India argues that climate commitments must not block growth that removes poverty.',
}));
Q('tf_india_nopolicy', tf({
  t: 3, d: 2, c: 'application', ans: false,
  stem: 'True or false? Because it was exempt from Kyoto\'s binding cuts, India took no climate or energy measures of its own.',
  sol: 'India adopted measures such as an energy conservation law, cleaner fuel policies, support for renewable energy and a national action plan on climate change, even without a binding Kyoto target.',
}));
Q('s_india_stand', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State any two arguments India has put forward in international climate negotiations.',
  model: '1. India\'s **per capita emissions** are far **lower** than those of developed countries.\n2. The developed countries caused **most historical emissions**, so under **common but differentiated responsibilities** they should cut first and provide finance and technology.',
  sol: 'Any two of: low per capita emissions, historical responsibility, right to development, need for finance and technology.',
  scheme: [['First argument', 1], ['Second argument', 1]],
}));
Q('s_india_home', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Mention two steps India has taken at home that show its concern for the environment and climate.',
  model: '1. Laws and policies to **save energy**, such as the **Energy Conservation Act (2001)**, and **cleaner fuels** for vehicles.\n2. A **national action plan on climate change** and active promotion of **renewable energy** such as solar power.',
  sol: 'Any two genuine domestic measures.',
  scheme: [['First step', 1], ['Second step', 1]],
}));
Q('s3_india_eval', short({
  t: 3, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Is India\'s demand that developed countries should do more to fight climate change justified? Give three reasons for your view.',
  model: 'Largely **justified**:\n1. Developed countries produced **most of the greenhouse gases** already in the atmosphere.\n2. India\'s **emissions per person are low** and many citizens still lack **basic energy and services**.\n3. Richer states have the **money and technology** to cut faster and help others.\nA balanced answer may add that India\'s **total emissions are rising**, so it also shares responsibility, as it accepts.',
  sol: 'A clear view with three reasons; a balancing point earns credit.',
  scheme: [['First reason', 1], ['Second reason', 1], ['Third reason or balancing point', 1]],
}));
Q('l_india_stand', long({
  t: 3, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Describe India\'s stand on environmental issues, especially climate change, in international forums and at home.',
  model: '1. **Kyoto:** India **signed and ratified** the protocol in **2002**; as a developing country it had **no binding cut**.\n2. **Equity:** India stresses **historical responsibility** of developed countries and its **low per capita emissions**.\n3. **CBDR:** it supports **common but differentiated responsibilities** and asks for **finance and technology transfer**.\n4. **Development:** climate action must not deny the **right to development** and poverty removal.\n5. **At home:** energy conservation law, cleaner fuels, a **national action plan on climate change** and support for **renewable energy**.',
  sol: 'International position in four points, domestic action in one.',
  scheme: [['Kyoto and its status for India', 1], ['Equity and per capita argument', 1], ['CBDR, finance and technology', 1], ['Right to development', 1], ['Domestic measures', 1]],
}));

// ================================================================ t04 Movements, resource geopolitics, indigenous peoples
Q('m_chipko', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'The Chipko movement of the 1970s, in which villagers protected trees from felling, began in the hills of present-day',
  opts: ['Uttarakhand', 'Kerala', 'Gujarat', 'Assam'],
  sol: 'Chipko began in the Himalayan hills of what is now Uttarakhand. It is a well-known example of a forest movement led by local villagers, many of them women.',
}));
Q('m_nba', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'The Narmada Bachao Andolan is best described as',
  opts: [
    'a movement that questioned large dams on the Narmada, especially over displacement and environmental costs',
    'a government programme to build more dams on the Narmada',
    'a movement against the mining of oil in the Arabian Sea',
    'an international treaty on sharing the Narmada with a neighbouring country',
  ],
  sol: 'The movement raised questions about the Sardar Sarovar and other large dams on the Narmada: the displacement of people and the loss of land and forests. It was not a government programme, a mining protest or a treaty.',
}));
Q('m_movement_type', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'Villagers in an imagined hill district of Odisha hold sit-ins against a plan to dig an open-cast mine on a hill they hold sacred and which feeds their streams. Their protest is closest to which category of environmental movement?',
  opts: ['A movement against mining', 'An anti-dam movement', 'A movement to protect the ozone layer', 'A movement for space research'],
  sol: 'The protest targets a mine and its effects on land, water and sacred sites, so it belongs with movements against mining. No dam, ozone issue or space research is involved.',
}));
Q('m_geopolitics', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: '"Resource geopolitics" refers to',
  opts: [
    'competition and conflict among states over who gets which natural resources, when and how',
    'the study of rocks and minerals by geologists',
    'the internal administration of mines in one district',
    'the rules for naming new countries',
  ],
  sol: 'Resource geopolitics is about the struggle among states for access to resources such as oil, minerals and water, and its effect on power and conflict. The other options are not about relations among states.',
}));
Q('m_oil', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'Why has oil been at the centre of resource geopolitics for much of the twentieth century?',
  opts: [
    'It is vital to modern economies and armed forces, and large reserves are concentrated in a few regions such as West Asia',
    'Oil is found equally in every country, so no state needs to import it',
    'Oil has no use in transport or industry',
    'International law forbids any trade in oil',
  ],
  sol: 'Industrial economies and militaries depend on oil, and large reserves lie in a few regions, especially the Gulf, so control of supply carries great political weight. The other options are false.',
}));
Q('m_water', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'Two imagined countries share a river: the upstream one plans a big dam, and the downstream one fears less water for its farms. This is an example of',
  opts: [
    'a possible conflict over a shared freshwater resource',
    'a dispute over the global commons of outer space',
    'a disagreement about the ozone layer',
    'an issue that cannot arise between states',
  ],
  sol: 'Shared rivers can cause tension between upstream and downstream states, a classic water issue in resource geopolitics. It has nothing to do with outer space or the ozone layer.',
}));
Q('m_indigenous_def', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'In broad UN usage, indigenous peoples are',
  opts: [
    'descendants of the people who lived in a land before others arrived, who keep their own traditions and ways of life',
    'all citizens who were born in a particular country',
    'people who have recently migrated to a city',
    'members of the armed forces of a country',
  ],
  sol: 'The UN describes indigenous peoples broadly as descendants of the original inhabitants of a territory who keep their own social, economic and cultural traditions. Birthplace alone, recent migration or military service do not define them.',
}));
Q('m_indigenous_issue', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'Which issue lies at the heart of the struggles of indigenous peoples in many countries, including India?',
  opts: [
    'Rights over land and forests, and displacement caused by development projects',
    'The right to launch satellites into outer space',
    'Control over the deep ocean floor',
    'Membership of the UN Security Council',
  ],
  sol: 'Indigenous communities depend on land and forests; mines, dams and other projects have often displaced them, so land rights and displacement are central. The other options are unrelated.',
}));
Q('ar_movements', ar({
  t: 4, d: 3, c: 'analysis', key: 'b',
  a: 'Many environmental movements in the developing world are led by local communities rather than by large organisations.',
  r: 'The ozone layer was protected by the Montreal Protocol of 1987.',
  sol: 'Both statements are true, but R does not explain A. Local leadership of movements comes from people defending their own forests, rivers and land; the Montreal Protocol is an inter-state agreement on a different issue.',
}));
Q('ar_indigenous_voice', ar({
  t: 4, d: 3, c: 'analysis', key: 'd',
  a: 'The concerns of indigenous peoples were never raised at any international forum.',
  r: 'The UN set up a Working Group on Indigenous Populations in 1982.',
  sol: 'A is false: indigenous peoples\' concerns have been raised internationally, for example through the UN Working Group created in 1982 and a world council formed in 1975. R is true.',
}));
Q('tf_dams_movements', tf({
  t: 4, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Movements against large dams have arisen in several countries, not only in India.',
  sol: 'Anti-dam campaigns have taken place in many parts of the world, for example a well-known campaign to save a wild river in Australia in the early 1980s, as well as the Narmada movement in India.',
}));
Q('fb_working_group', fb({
  t: 4, d: 2, c: 'recall',
  stem: 'The United Nations set up a Working Group on Indigenous Populations in the year ___.',
  acc: [['1982']],
  sol: 'It was set up in 1982.',
}));
Q('mt_movements', match({
  t: 4, d: 2, c: 'application',
  stem: 'Match each imagined protest or issue in the left column with the area of environmental politics it belongs to.',
  pairs: [
    ['Villagers hug trees to stop a timber contractor', 'Forest movement'],
    ['Farmers resist a reservoir that will flood their valley', 'Anti-dam movement'],
    ['An upstream and a downstream state argue over river water', 'Resource geopolitics'],
    ['Forest dwellers demand that their customary land be recognised', 'Rights of indigenous peoples'],
  ],
  sol: 'Tree-hugging to stop felling is a forest movement; resisting a reservoir is an anti-dam movement; an upstream–downstream quarrel is resource geopolitics; customary land claims are about indigenous peoples\' rights.',
}));
Q('ord_indigenous', ord({
  t: 4, d: 3, c: 'understanding', marks: 1,
  stem: 'Arrange these international steps on indigenous peoples\' rights in chronological order.',
  items: [
    'A World Council of Indigenous Peoples is formed',
    'The UN sets up a Working Group on Indigenous Populations',
    'The UN General Assembly adopts a Declaration on the Rights of Indigenous Peoples',
  ],
  sol: 'World Council 1975, UN Working Group 1982, UN Declaration 2007.',
}));
Q('s_movements_two', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Name two kinds of environmental movements and give one Indian example of either kind.',
  model: '1. **Forest movements**, which resist the felling of forests; example: the **Chipko** movement in the Himalayan hills.\n2. **Anti-dam movements**, which question large dams; example: the **Narmada Bachao Andolan**. (Movements against **mining** are a third kind.)',
  sol: 'Two kinds with at least one Indian example.',
  scheme: [['Two kinds named', 1], ['A correct Indian example', 1]],
}));
Q('s_geopolitics_water', short({
  t: 4, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Why can shared freshwater resources lead to tension between states?',
  model: 'Fresh water is **scarce** and many rivers **cross borders**. When an **upstream** state builds dams or diverts water, the **downstream** state may get less for farms and cities, so disputes over **sharing and quality** can arise.',
  sol: 'Scarcity plus the upstream–downstream relationship.',
  scheme: [['Scarcity and shared rivers', 1], ['Upstream action affects downstream state', 1]],
}));
Q('s3_indigenous', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Explain three concerns of indigenous peoples that have entered global environmental politics.',
  model: '1. **Land and forest rights:** their ways of life depend on land and forests they have used for generations.\n2. **Displacement:** dams, mines and other projects have pushed many communities off their land without adequate rehabilitation.\n3. **Identity and voice:** they seek **recognition** of their culture and a say in decisions, raised through bodies such as the **UN Working Group (1982)**.',
  sol: 'Three distinct concerns, each explained.',
  scheme: [['First concern', 1], ['Second concern', 1], ['Third concern', 1]],
}));
Q('s3_oil_geo', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain, with reference to oil, how natural resources shape relations among states.',
  model: '1. Oil is **essential** for industry, transport and armed forces, so states seek **secure supplies**.\n2. Large reserves are **concentrated** in a few regions such as **West Asia**, which gives those regions great strategic importance.\n3. Major powers have therefore used **diplomacy, alliances and sometimes force** to protect access, so oil has often been linked to **rivalry and conflict**.',
  sol: 'Importance, concentration of supply, and its effect on rivalry.',
  scheme: [['Why oil is vital', 1], ['Concentration of reserves', 1], ['Effect on rivalry or conflict', 1]],
}));
Q('l_movements', long({
  t: 4, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Environmental movements are among the most vibrant responses to environmental challenges. Explain their main types with examples and assess their impact.',
  model: '1. **Nature:** mostly **local, people-led** groups, often of farmers, forest dwellers and women, alongside some larger networks.\n2. **Forest movements:** resist commercial felling; example: **Chipko** (1970s, Uttarakhand hills).\n3. **Anti-dam movements:** question displacement and ecological costs of big dams; example: **Narmada Bachao Andolan**; similar campaigns elsewhere, such as in Australia.\n4. **Movements against mining:** defend land, water and sacred sites from mining damage.\n5. **Impact:** they made **displacement and rehabilitation** public issues and pushed governments towards **environmental review**, though large projects often went ahead; their value lies in giving **affected people a voice**.',
  sol: 'Nature, three types with examples, and a balanced assessment.',
  scheme: [['Nature of the movements', 1], ['Forest movements with example', 1], ['Anti-dam movements with example', 1], ['Movements against mining', 1], ['Assessment of impact', 1]],
}));
Q('l_indigenous_geo', long({
  t: 4, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: '"Conflicts over natural resources are as much about people as about states." Evaluate this statement with reference to resource geopolitics and the rights of indigenous peoples.',
  model: '1. **Between states:** competition over **oil** and **shared rivers** shows resources shaping rivalry and alliances among governments.\n2. **Within states:** dams, mines and plantations often fall on lands of **indigenous peoples**, whose livelihoods depend on them.\n3. **Displacement:** these communities have frequently lost land with **little say** in the decision, so the conflict is between people and projects backed by states or companies.\n4. **Voice:** international steps such as the **UN Working Group (1982)** and the **2007 UN Declaration** show people\'s claims entering world politics.\n5. **Judgement:** the statement is **largely valid**: resource politics has both an **inter-state** and a **human** side, and lasting solutions need to respect both.',
  sol: 'State-level side, people-level side, displacement, international voice, conclusion.',
  scheme: [['Inter-state competition', 1], ['Indigenous peoples and resources', 1], ['Displacement and lack of voice', 1], ['International recognition', 1], ['Reasoned conclusion', 1]],
}));

// ================================================================ source-based (4 marks each)
Q('sb_summit_diary', source({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source from a delegate's diary at an imagined world environment summit and answer the questions that follow. ${IMAG}`,
  passage: '**Diary of a delegate from the imagined Republic of Sundarvan, at a world environment summit**\n\nDay 2. The delegates from the rich industrial nations spoke all morning about the thinning ozone layer and the warming air. Our group of poorer nations asked a simple question: how can we protect forests and rivers when half our people still lack electricity? By evening a draft emerged. Every country would protect the environment, but the countries that had polluted most, and had the most money, would do more and help the rest with technology. Some of us felt the draft still put growth ahead of nature.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which real-world divide among states does the morning\'s debate resemble?', model: 'The **North–South divide**: developed countries stressing **ozone and global warming**, developing countries stressing **development needs**.', sol: 'Rich industrial versus poorer nations = North and South.', scheme: [['North–South divide', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Name the principle reflected in the evening draft.', model: '**Common but differentiated responsibilities**: all protect the environment, but those who polluted most and are richer do more.', sol: 'Shared duty with a bigger burden for the polluters = CBDR.', scheme: [['CBDR named', 1]] })),
    child('c', short({ t: [1, 2], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Why did "some of us" feel that the draft still put growth ahead of nature? Explain with reference to a real criticism of the 1992 Earth Summit outcomes.', model: 'Critics of **Agenda 21**, adopted at **Rio in 1992**, said its approach to sustainable development **leaned towards economic growth** rather than **ecological conservation**; the delegates fear the draft repeats this by leaving room for growth before protection.', sol: 'Link the worry to the criticism of Agenda 21.', scheme: [['Agenda 21 / Rio named', 1], ['Criticism explained: growth over conservation', 1]] }), [
      short({ t: 2, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Is it fair that countries "that had polluted most" should do more? Give two reasons.', model: 'Yes. (1) They caused **most of the past damage**, so responsibility should match contribution. (2) They have **more money and technology**, so they can act faster and help poorer countries without stopping their development.', sol: 'Two reasons: historical responsibility and capacity.', scheme: [['First reason', 1], ['Second reason', 1]] }),
    ]),
  ],
}));
Q('sb_ice_station', source({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source from the logbook of an imagined research station on the southern ice continent and answer the questions that follow. ${IMAG}`,
  passage: '**Logbook, an imagined international research station on the southern ice continent**\n\nScientists from eleven countries now share this station. None of our flags gives us ownership of the ice; the continent is set aside for peaceful work and science. This season our instruments again recorded very low ozone in early spring. A visiting official from a fishing nation asked whether the rules on krill catch in the surrounding seas could be relaxed. Our station chief replied that nothing here belongs to one state, so any change must be agreed by all the parties.',
  parts: [
    child('a', short({ t: 2, d: 1, c: 'recall', marks: 1, stem: 'Name the treaty, signed in 1959, that sets the continent aside for peaceful purposes.', model: 'The **Antarctic Treaty** (1959).', sol: 'The southern ice continent is Antarctica.', scheme: [['Antarctic Treaty', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which line shows that the continent is part of the global commons?', model: '"**None of our flags gives us ownership** of the ice" (or "nothing here belongs to one state").', sol: 'No sovereign ownership = global commons.', scheme: [['Correct line quoted', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Why is the low ozone reading important for world politics, and which agreement responded to this kind of problem?', model: 'Thinning ozone over the region shows damage to a **shared global common** caused by substances released worldwide; it led states to the **Montreal Protocol (1987)**, which phases out ozone-depleting substances.', sol: 'Shared damage plus the Montreal Protocol.', scheme: [['Why the reading matters', 1], ['Montreal Protocol', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Using the krill question, explain one difficulty in managing the global commons.', model: 'One state\'s **fishing interest** clashes with the **common interest** in conserving the seas; since no state owns the area, rules need the **agreement of all parties**, which is slow and hard to reach.', sol: 'National interest versus collective rules.', scheme: [['National interest versus common good', 1], ['Need for agreement by all', 1]] }),
    ]),
  ],
}));
Q('sb_ministry_note', source({
  t: [3, 2], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source from an imagined briefing note prepared for India's negotiators and answer the questions that follow. ${IMAG}`,
  passage: '**Briefing note for a climate negotiation (imagined, written by SOYL)**\n\n1. Remind partners that an average person in our country emits only a small fraction of what a person in the richest countries emits.\n2. Recall that the gases already in the air were released mostly by early industrial nations over two centuries.\n3. Support collective action, but ask that richer partners provide finance and clean technology.\n4. Present our own record: laws to save energy, cleaner fuels in cities, and a national plan for the climate with missions on solar power and efficiency.',
  parts: [
    child('a', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Which point of the note uses the per capita argument?', model: 'Point **1**: an average person emits only a **small fraction** of what a person in the richest countries emits.', sol: 'Emissions per person = per capita.', scheme: [['Point 1 identified', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Which point reflects historical responsibility?', model: 'Point **2**: the gases already in the air came mostly from **early industrial nations** over two centuries.', sol: 'Past emissions by industrial nations = historical responsibility.', scheme: [['Point 2 identified', 1]] })),
    child('c', short({ t: [3, 2], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): How do points 3 and 4 together show a balanced position?', model: 'Point 3 shows India **supporting collective action** while asking for **finance and technology** under common but differentiated responsibilities; point 4 shows it is **acting at home**, so it is not only making demands of others.', sol: 'Support plus conditions, and own action.', scheme: [['Point 3 explained', 1], ['Point 4 explained', 1]] }), [
      short({ t: 3, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Suggest two further arguments a negotiator from a developing country could add to this note.', model: '(1) The **right to development**: millions still need energy, jobs and services. (2) Developing countries are often **most vulnerable** to floods, droughts and heat, so they need **support to adapt**.', sol: 'Any two relevant, distinct arguments.', scheme: [['First argument', 1], ['Second argument', 1]] }),
    ]),
  ],
}));
Q('sb_valley_report', source({
  t: 4, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, an imagined newspaper report from the valley of Kesharghati, and answer the questions that follow. ${IMAG}`,
  passage: '**Imagined newspaper report: "Valley villages meet as reservoir plan advances"**\n\nAbout forty villages in the imagined valley of Kesharghati, most of them home to forest-dwelling communities, will be submerged if the proposed reservoir is built. At a meeting on Sunday, elders said their families have farmed and gathered forest produce here for generations and have no papers for the land. Officials say the dam will bring water to drought-hit plains downstream and power to two cities. Villagers asked where they would go and whether they would get land of the same quality. A neighbouring state has also asked to be consulted, since the river flows on into its territory.',
  parts: [
    child('a', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'What kind of environmental movement is likely to grow from this meeting?', model: 'An **anti-dam movement**, raising the questions of **displacement** and loss of land and forests.', sol: 'Resistance to a reservoir = anti-dam.', scheme: [['Anti-dam movement', 1]] })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Which line shows a concern typical of indigenous peoples?', model: '"Families have **farmed and gathered forest produce here for generations** and have **no papers** for the land."', sol: 'Customary land use without legal titles.', scheme: [['Correct line quoted', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Show how the last sentence connects this local issue to resource geopolitics.', model: 'The river **crosses into another state**, so damming it affects that state\'s **share of water**; a local project thus becomes a question of **how a shared resource is divided**, which is resource geopolitics.', sol: 'Shared river = inter-state resource question.', scheme: [['Shared river noted', 1], ['Link to resource geopolitics explained', 1]] }), [
      short({ t: 4, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Officials and villagers both have a case. Suggest two steps that could make the decision fairer.', model: '(1) A full **public hearing and environmental review**, with the villagers\' consent sought before work begins. (2) **Rehabilitation** with land of similar quality and recognition of their **customary rights**, decided before displacement.', sol: 'Two steps that give the affected people voice and protection.', scheme: [['First fair step', 1], ['Second fair step', 1]] }),
    ]),
  ],
}));
Q('sb_school_assembly', source({
  t: [1, 4], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, a talk given at an imagined school assembly in Dehradun, and answer the questions that follow. ${IMAG}`,
  passage: '**Talk by a Class 12 student at a school assembly (imagined)**\n\nFifty years ago, women in villages not far from here wrapped their arms around trees to stop them being cut. Today our hills face new pressures: landslides near new roads, streams drying in summer, and tourists who leave plastic behind. Some say we must choose between jobs and forests. I think that is a false choice. A road can be built with care, a hotel can treat its waste, and a village can earn from the forest without destroying it.',
  parts: [
    child('a', short({ t: 4, d: 1, c: 'recall', marks: 1, stem: 'Which movement is the student referring to in the first sentence?', model: 'The **Chipko** movement of the 1970s.', sol: 'Hugging trees to stop felling in the Himalayan hills = Chipko.', scheme: [['Chipko', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which idea does the student support in the last three sentences?', model: '**Sustainable development**: growth and jobs that **do not destroy** the environment for the future.', sol: 'Rejecting the jobs-versus-forests choice = sustainable development.', scheme: [['Sustainable development', 1]] })),
    child('c', short({ t: [1, 4], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify two environmental problems mentioned in the talk and say how each affects local people.', model: '(1) **Landslides** near new roads endanger homes, lives and travel. (2) **Drying streams** reduce water for drinking and farming. (Plastic waste also harms land and water.)', sol: 'Two problems, each with an effect.', scheme: [['First problem with effect', 1], ['Second problem with effect', 1]] }), [
      short({ t: 4, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Do you agree that the choice between jobs and forests is "a false choice"? Give two reasons.', model: 'Largely yes. (1) **Careful planning**, such as roads built with slope protection and hotels that treat waste, lets growth continue with less damage. (2) Forests themselves provide **lasting livelihoods** through produce and tourism, which disappear if they are destroyed.', sol: 'A view with two reasons; a qualified view is acceptable.', scheme: [['First reason', 1], ['Second reason', 1]] }),
    ]),
  ],
}));
