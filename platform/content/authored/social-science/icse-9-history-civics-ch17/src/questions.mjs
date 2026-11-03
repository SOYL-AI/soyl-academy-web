// ICSE 9 History & Civics, ch17 The Modern Age in Europe: Industrial Revolution, Capitalism and Socialism: question bank.
// Every mill, town, club, letter, ledger and person below is imagined by SOYL and labelled as imagined; no textbook text, box or
// exercise and no specimen or board-paper item is reused (D-036). No work of Smith, Marx, Engels or anyone else is quoted: only the
// titles are named and the ideas are paraphrased. Dates are the commonly taught approximate ones. Capitalism and socialism are
// presented neutrally as economic systems with features, merits and criticisms; neither is ranked; no present-day party or country
// is used as an example, apart from the single line that India follows a mixed economy.
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child } from '../../icse-9-history-civics-ch01/src/lib.mjs';

const S2 = [25, 45];
const S3 = [40, 70];
const L10 = [120, 220];
const IMAG = '*(Imagined document written by SOYL for practice; the people and places in it are not real.)*';

// ================================================================ t01 Meaning and causes of the Industrial Revolution
Q('m_define_ir', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'A poster outside the imagined Marlbeck Museum announces an exhibition called From Workshop to Factory. Which statement best defines the Industrial Revolution that the exhibition describes?',
  opts: [
    'The change from hand production in homes and workshops to machine production in factories, using power such as water and then steam',
    'The spread of printing presses across the towns of Europe in the fifteenth century',
    'A short political uprising by workers in one English city',
    'The discovery of new sea routes between Europe and Asia',
  ],
  sol: 'The Industrial Revolution was the change from hand production to machine production in factories using water and then steam power. The other options describe printing, a political event and voyages of discovery, which are different developments.',
}));
Q('m_when', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'At the imagined Dunmere Debating Club, a speaker says that the Industrial Revolution began in England in a particular period and carried on to about the 1830s and 1840s before spreading to other countries. According to the usual account, when did it begin?',
  opts: [
    'From about the 1750s or 1760s',
    'From about the 1450s',
    'From about the 1850s',
    'From about the 1900s',
  ],
  sol: 'The usual account places the beginning in England from about the 1750s or 1760s. The 1450s are too early, and the 1850s and 1900s are after the first phase had already ended.',
}));
Q('m_enclosure', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'In the imagined village of Ashgrove, the open fields where families once grazed their animals are fenced into a few large private farms. Many labourers lose their access to the land and walk to the town of Marlbeck to look for factory work. Which development, and which cause of the Industrial Revolution, does this describe?',
  opts: [
    'The enclosure movement, which supplied cheap labour to the towns',
    'The Bank of England, which supplied capital to merchants',
    'The flying shuttle, which speeded up weaving',
    'The Factory Act, which limited child labour',
  ],
  sol: 'Fencing common land into private farms was the enclosure movement, and it pushed many rural people into towns, giving factories cheap labour. The Bank of England, the flying shuttle and the Factory Act do not describe the loss of access to land.',
}));
Q('m_coal_iron', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Surveyors in the imagined Greywater valley of northern England report that seams of coal and beds of iron ore lie only a few miles apart, so furnaces and engines can be supplied cheaply. Which cause of England\'s early industrialisation does their report show?',
  opts: [
    'Coal and iron deposits found close together',
    'Colonies that supplied raw cotton',
    'A large navy and merchant shipping',
    'The Bank of England of 1694',
  ],
  sol: 'Coal and iron lying close together is a cause on its own. Colonies, shipping and banking are other causes, but the surveyors\' report is about minerals found near each other.',
}));
Q('m_bank', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'A banker in the imagined port of Tanwick tells a visitor that merchants and manufacturers can borrow money more easily because England has a central bank founded in 1694. Which institution does he mean?',
  opts: [
    'The Bank of England',
    'The East India Company',
    'The Royal Navy',
    'A county court of the shire',
  ],
  sol: 'The Bank of England was founded in 1694 and was part of the banking system that helped industry. The East India Company was a trading company, the Royal Navy was the fleet, and a county court was a court of law.',
}));
Q('m_colonies', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A cloth maker in the imagined port of Tanwick buys raw cotton shipped from overseas colonies and sells her finished cloth to buyers in those same colonies. Which two advantages of colonies does her trade show?',
  opts: [
    'Colonies supplied raw materials and also served as markets',
    'Colonies supplied coal and iron ore and also trained English engineers',
    'Colonies supplied capital through the Bank of England and also built canals',
    'Colonies kept England politically stable and also fed its growing population',
  ],
  sol: 'Raw cotton coming in and finished cloth going out show colonies as a source of raw materials and as markets. The other pairs mention advantages that the cloth maker\'s trade does not show.',
}));
Q('m_kay', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'A museum label in the imagined Marlbeck Hall reads: This device of 1733 let a weaver send the shuttle across the loom far more quickly than by hand. Which inventor and machine does the label describe?',
  opts: [
    'John Kay and the flying shuttle',
    'James Hargreaves and the spinning jenny',
    'Richard Arkwright and the water frame',
    'Edmund Cartwright and the power loom',
  ],
  sol: 'The flying shuttle was invented by John Kay in 1733. The spinning jenny (about 1764), the water frame (1769) and the power loom (1785) came later and belong to other inventors.',
}));
Q('m_hargreaves', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A spinner in the imagined Marlbeck workshop can spin only one thread at a time on her hand wheel. A new machine of about 1764 lets one worker spin several threads at once. Which machine is this?',
  opts: [
    'The spinning jenny of James Hargreaves',
    'The steam engine of James Watt',
    'The power loom of Edmund Cartwright',
    'The Rocket of George Stephenson',
  ],
  sol: 'Spinning several threads at once is the spinning jenny of Hargreaves, about 1764. Watt\'s engine gave power, the power loom wove cloth, and the Rocket was a locomotive.',
}));
Q('m_arkwright', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'A timeline card in the imagined Dunmere museum reads: 1769, a spinning machine driven by water power, patented by Richard Arkwright. What was it called, and why did it suit a factory rather than a cottage?',
  opts: [
    'The water frame; it was driven by water power, so it was set up in a mill beside a river rather than in a cottage',
    'The spinning mule; it was driven by hand, so it was set up in a cottage',
    'The power loom; it wove cloth by steam power, so it needed a mill',
    'The flying shuttle; it was worked by hand, so it was kept at home',
  ],
  sol: 'The water frame of 1769 needed a source of water power and was therefore placed in mills. The mule dates from 1779 and was not the 1769 machine, the power loom is from 1785, and the flying shuttle is from 1733.',
}));
Q('m_watt', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The owner of an imagined coal pit at Greywater wants an engine that can pump water out of flooded tunnels and later turn the machinery of a mill without depending on a river. Whose improved engine, patented in 1769, served such purposes?',
  opts: [
    'The steam engine of James Watt',
    'The locomotive of George Stephenson',
    'The coke furnace of Abraham Darby',
    'The mule of Samuel Crompton',
  ],
  sol: 'James Watt\'s improved steam engine (patent 1769) supplied power that did not depend on rivers. Stephenson built a locomotive, Darby smelted iron with coke, and Crompton\'s mule spun thread.',
}));
Q('m_rocket', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'A poster in the imagined Dunmere railway hall shows a locomotive of 1829 and the opening in 1830 of a railway line between two English cities, Liverpool and Manchester. Who built the locomotive, and which kind of line opened?',
  opts: [
    'George Stephenson; a railway between Liverpool and Manchester',
    'James Watt; a railway between Liverpool and Manchester',
    'George Stephenson; a canal between Liverpool and Manchester',
    'Abraham Darby; a railway between Liverpool and Manchester',
  ],
  sol: 'George Stephenson\'s Rocket (1829) was associated with the Liverpool and Manchester railway of 1830. Watt improved the steam engine, Darby smelted iron with coke, and the line in question was a railway, not a canal.',
}));
Q('m_domestic', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'In the imagined village of Ashgrove around 1740, Anna spins thread on a hand wheel in her cottage, her husband weaves it on a loom in the next room, and a merchant collects the cloth every month. How should this way of working be classified?',
  opts: [
    'Hand production at home, which factory production later replaced',
    'Factory production driven by steam power',
    'A joint-stock company raising capital from shareholders',
    'A trade union bargaining for wages',
  ],
  sol: 'Spinning and weaving by hand at home is the older system that factories replaced. There are no machines driven by steam, no shares and no union in the scene.',
}));
Q('m_not_cause', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'A pupil at the imagined Dunmere school lists causes of the Industrial Revolution in England and, by mistake, includes one item that was a consequence of it rather than a cause. Which item is it?',
  opts: [
    'The growth of crowded factory towns with slums',
    'Coal and iron deposits found close together',
    'Capital from trade and colonies',
    'The enclosure movement that sent people to the towns',
  ],
  sol: 'Crowded factory towns grew up because factories needed workers, so they were a result. Coal and iron, capital and enclosure all came before or helped to begin industrialisation.',
}));

// ================================================================ t02 Capitalism
Q('m_cap_define', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'A visiting lecturer at the imagined Dunmere Debating Club describes an economic system in which land, factories and machines are privately owned and run for profit, with prices set by demand and supply and workers paid wages. What is this system called?',
  opts: [
    'Capitalism',
    'Socialism',
    'The domestic system',
    'The guild system',
  ],
  sol: 'Private ownership of the means of production, the profit motive, market prices and wages describe capitalism. Socialism puts ownership with society or the state; the domestic system and the guild system were older ways of organising work.',
}));
Q('m_joint_stock', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'To build a large mill and buy steam engines, the imagined Tanwick Cotton Company sells shares to many investors, each of whom risks only the money paid for the shares. Which feature of the growth of capitalism does this show?',
  opts: [
    'A joint-stock company raising large capital from many investors',
    'The enclosure of common land',
    'A trade union bargaining for wages',
    'A Factory Act limiting working hours',
  ],
  sol: 'Selling shares to many investors to raise large sums is a joint-stock company, one of the ways capital was gathered. Enclosure, unions and Factory Acts are about land, workers and law.',
}));
Q('m_laissez', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'At an imagined trade meeting in Marlbeck, a speaker argues that government should interfere as little as possible in trade and business and leave the market to itself. What is this idea called?',
  opts: [
    'Laissez-faire',
    'State planning',
    'Guild control of wages',
    'Enclosure',
  ],
  sol: 'The idea of limited state interference in business is laissez-faire. State planning is the opposite approach, guild control belonged to an older system, and enclosure concerns land.',
}));
Q('m_cap_cause', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Tobias Garn, an imagined mill owner of Marlbeck, does not spend all his profits on himself but invests them in two more mills and new machines. Which cause of the rise of capitalism does his choice show?',
  opts: [
    'Merchants and entrepreneurs invested their profits',
    'The state decided what each mill should produce',
    'Workers formed a trade union',
    'A Factory Act reduced hours of work',
  ],
  sol: 'Putting profits back into mills and machines is investment by an entrepreneur, a cause of the rise of capitalism. State decisions, unions and Factory Acts are not shown in the scene.',
}));
Q('m_market_price', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'At the imagined Tanwick cloth market, a fall in the supply of wool pushes up the price of woollen cloth, and several weavers decide to make more. Which feature of capitalism does this illustrate?',
  opts: [
    'Prices set by demand and supply in the market, which guide production',
    'Prices fixed by a planning committee, which orders production',
    'Production ordered by the state for the needs of all',
    'Ownership of the mills by the whole community',
  ],
  sol: 'Prices moving with demand and supply and guiding what producers make is a feature of capitalism. The other options describe planning or collective ownership, which are features of socialism.',
}));

// ================================================================ t03 Socialism and the comparison
Q('m_soc_define', mcq({
  t: 3, d: 1, c: 'understanding',
  stem: 'A speaker at the imagined Dunmere Debating Club describes an economic idea under which the means of production are owned or controlled by society or the state, with the aim of reducing inequality and sharing wealth more fairly. What is it called?',
  opts: [
    'Socialism',
    'Capitalism',
    'Laissez-faire',
    'The enclosure movement',
  ],
  sol: 'Ownership or control of the means of production by society or the state, with the aim of sharing wealth more fairly, is socialism. Capitalism and laissez-faire stress private ownership and limited state interference, and enclosure concerns land.',
}));
Q('m_long_hours', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Edith Pell, an imagined mill worker of Marlbeck, writes home that she leaves before dawn and returns after dark, works about fourteen hours a day for low pay, and has no rest except on Sunday. Which condition of industrial workers does her account show?',
  opts: [
    'Very long working hours and low wages',
    'Protection under a Factory Act',
    'Job security under a written contract',
    'A share in the profits of the mill',
  ],
  sol: 'Fourteen hours a day for low pay shows long hours and low wages. Nothing in her account mentions legal protection, job security or a share of profits.',
}));
Q('m_owen', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'A reporter writes about the imagined Orrin Falls mill, whose owner, like Robert Owen at New Lanark, provides houses and a school for workers\' children and keeps hours shorter than elsewhere. Under which heading are such early thinkers usually placed?',
  opts: [
    'Early or utopian socialists',
    'Laissez-faire economists',
    'Joint-stock investors',
    'Enclosure landlords',
  ],
  sol: 'Robert Owen, Saint-Simon and Fourier are usually called early or utopian socialists. A mill owner who improves workers\' lives is not a laissez-faire economist, a shareholder or an enclosing landlord.',
}));
Q('m_fourier', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'A card in the imagined Dunmere library describes two French thinkers: one proposed small cooperative communities, and the other wanted industry to be organised for the good of society as a whole. Who are they?',
  opts: [
    'Fourier and Saint-Simon',
    'Marx and Engels',
    'Arkwright and Crompton',
    'Watt and Stephenson',
  ],
  sol: 'Fourier proposed small cooperative communities and Saint-Simon wanted industry organised for society, and both are counted among the early socialists. Marx and Engels wrote later, and the other pairs were inventors.',
}));
Q('m_marx_works', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'A bookseller\'s imagined list in Dunmere shows two titles: one published in 1848 by Karl Marx and Friedrich Engels, and the first volume of another, by Marx, published in 1867. Which pair of titles is it?',
  opts: [
    'The Communist Manifesto and Das Kapital',
    'The Wealth of Nations and Das Kapital',
    'The Communist Manifesto and The Wealth of Nations',
    'The Praise of Folly and The Wealth of Nations',
  ],
  sol: 'The Communist Manifesto (1848) and the first volume of Das Kapital (1867) are the works named. The Wealth of Nations was published in 1776, and The Praise of Folly is a book of about 1511.',
}));
Q('m_factory_act', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'An imagined newspaper of 1833 from Marlbeck reports that a new law limits the employment of children in textile factories and provides for inspectors to visit the mills. Which law is this?',
  opts: [
    'The Factory Act of 1833',
    'The Act of Supremacy of 1534',
    'The Peace of Augsburg of 1555',
    'The charter of the Bank of England of 1694',
  ],
  sol: 'A law of 1833 limiting child labour in textile factories is the Factory Act. The other options belong to other subjects and dates.',
}));
Q('m_union', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Dock workers of the imagined port of Tanwick form an association so that they can bargain together for better wages and shorter hours. What is such an association called?',
  opts: [
    'A trade union',
    'A joint-stock company',
    'A guild of merchants',
    'A colonial council',
  ],
  sol: 'An association of workers that bargains for wages and hours is a trade union. A joint-stock company is owned by shareholders, a merchants\' guild represents traders, and a colonial council governs a colony.',
}));
Q('m_compare', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'In an imagined class exercise at Dunmere school, one pupil writes: Means of production are privately owned, profit is the main motive and the market sets prices. Another writes: Means of production are owned by society or the state, welfare is the main aim and planning guides production. Which labels fit the two notes?',
  opts: [
    'The first describes capitalism and the second describes socialism',
    'The first describes socialism and the second describes capitalism',
    'Both describe capitalism',
    'Both describe socialism',
  ],
  sol: 'Private ownership, profit and market prices are features of capitalism; ownership by society or the state, welfare and planning are features of socialism.',
}));
Q('m_mixed', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'A quiz card at the imagined Dunmere Debating Club asks: India follows which kind of economy, one that combines features of both capitalism and socialism?',
  opts: [
    'A mixed economy',
    'A purely market economy with no role for the state',
    'A purely planned economy with no private business',
    'A domestic system of hand production',
  ],
  sol: 'India follows a mixed economy, with both private enterprise and a role for the state. The other descriptions are extremes or an older system.',
}));
Q('m_neutral', mcq({
  t: 3, d: 4, c: 'evaluation',
  stem: 'A pupil\'s imagined answer on capitalism and socialism ends with a closing sentence. Which closing sentence is acceptable for a history answer?',
  opts: [
    'Each system has features, supporters who point to its merits and critics who point to its limits, so a historian describes them side by side',
    'One of the two systems is clearly better, and the other has failed',
    'The other system is unfair and nobody should defend it',
    'Only one of the two systems has any merit at all',
  ],
  sol: 'A history answer describes both systems with their features, merits and criticisms and does not rank them. The other sentences declare a winner or dismiss one side.',
}));

// ================================================================ assertion-reason
Q('ar_colonies', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'Colonies helped England\'s industries to grow in the eighteenth century.',
  r: 'Colonies supplied England with coal and iron ore for its furnaces.',
  sol: 'A is true: colonies supplied raw materials such as cotton and also served as markets. R is false: the coal and iron were found in England itself, close together.',
}));
Q('ar_cheap_labour', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The enclosure movement helped to supply workers for early factories.',
  r: 'Many farm workers who lost access to common land moved to the towns to look for work.',
  sol: 'Both are true. The movement of people from the land to the towns is the way enclosure supplied labour, so R explains A.',
}));
Q('ar_cap_owner', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'In capitalism, the means of production are mainly owned by the state.',
  r: 'In capitalism, land, factories and machines are mainly privately owned and run for profit.',
  sol: 'A is false: ownership is mainly private. R states the meaning of capitalism correctly.',
}));
Q('ar_factory_act', ar({
  t: 3, d: 4, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'The Factory Act of 1833 limited child labour in textile factories.',
  r: 'Trade unions of workers grew in number during the nineteenth century.',
  sol: 'Both are true, but the growth of unions does not by itself explain why the Act of 1833 limited child labour, so R is not the explanation of A.',
}));
Q('ar_marx', ar({
  t: 3, d: 4, c: 'analysis', verdict: 'A-false-R-true',
  a: 'Marx published the first volume of Das Kapital before The Communist Manifesto appeared.',
  r: 'The Communist Manifesto appeared in 1848, and the first volume of Das Kapital in 1867.',
  sol: 'A is false: the Manifesto (1848) came first and Das Kapital (1867) later. R gives the dates correctly.',
}));

// ================================================================ true-false, fill-blank, match, ordering
Q('tf_only_england', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? A pupil at the imagined Dunmere school says that the Industrial Revolution began in England and stayed there, never spreading to other countries.',
  sol: 'It began in England from about the 1750s or 1760s and, from about the 1830s and 1840s, spread to other countries.',
}));
Q('tf_laissez', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? A speaker at an imagined Marlbeck meeting says that laissez-faire means the state should decide the price and output of every mill.',
  sol: 'Laissez-faire means limited state interference in trade and business, so the speaker has it reversed.',
}));
Q('tf_owen', tf({
  t: 3, d: 2, c: 'recall', ans: true,
  stem: 'True or false? An imagined museum guide says that Robert Owen\'s mill community at New Lanark is cited as an example of an owner trying to improve the conditions of workers.',
  sol: 'Robert Owen\'s New Lanark is the standard example of an early socialist thinker who tried to improve workers\' lives with better housing, a school and shorter hours.',
}));
Q('fb_watt', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'James Watt\'s improved steam engine was patented in ___.',
  acc: [['1769']],
  sol: 'Watt\'s improved steam engine was patented in 1769.',
}));
Q('fb_smith', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'Adam Smith\'s book ___ was published in ___ and is linked with the idea of free trade and limited state interference.',
  acc: [['The Wealth of Nations', 'Wealth of Nations', 'the wealth of nations', 'wealth of nations'], ['1776']],
  sol: 'The Wealth of Nations was published in 1776. Only its title is to be remembered.',
}));
Q('fb_manifesto', fb({
  t: 3, d: 2, c: 'recall',
  stem: 'Karl Marx and Friedrich Engels published The Communist Manifesto in ___.',
  acc: [['1848']],
  sol: 'The Communist Manifesto appeared in 1848.',
}));
Q('mt_inventions', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'A display in the imagined Marlbeck Museum shows four textile machines. Match each machine with its inventor.',
  pairs: [
    ['Flying shuttle (1733)', 'John Kay'],
    ['Spinning jenny (about 1764)', 'James Hargreaves'],
    ['Water frame (1769)', 'Richard Arkwright'],
    ['Power loom (1785)', 'Edmund Cartwright'],
  ],
  sol: 'John Kay invented the flying shuttle, James Hargreaves the spinning jenny, Richard Arkwright the water frame and Edmund Cartwright the power loom.',
}));
Q('mt_thinkers', match({
  t: 3, d: 3, c: 'understanding', marks: 2,
  stem: 'A pupil at the imagined Dunmere school prepares four cards on socialist thinkers. Match each name with the right description.',
  pairs: [
    ['Robert Owen', 'Ran a mill community at New Lanark with houses and a school'],
    ['Fourier', 'Proposed small cooperative communities'],
    ['Saint-Simon', 'Wanted industry organised for the benefit of society as a whole'],
    ['Karl Marx and Friedrich Engels', 'Published The Communist Manifesto in 1848'],
  ],
  sol: 'Owen is linked with New Lanark, Fourier with cooperative communities, Saint-Simon with industry organised for society, and Marx and Engels with the Manifesto of 1848.',
}));
Q('mt_features', match({
  t: [2, 3], d: 3, c: 'application', marks: 2,
  stem: 'Each imagined scene below shows one feature of an economic system. Match each scene with the feature it illustrates.',
  pairs: [
    ['Two rival bakers in Tanwick lower their prices to win customers', 'Competition, a feature of capitalism'],
    ['Tobias Garn expects each new machine to bring him a return', 'Profit motive, a feature of capitalism'],
    ['A committee of the imagined Harrow Collective decides how many ploughs to make this year', 'Planning, a feature of socialism'],
    ['The mine at Greywater is run by its society for the benefit of all its members', 'Ownership by society, a feature of socialism'],
  ],
  sol: 'Rival bakers show competition and Garn\'s expectation shows the profit motive, both features of capitalism; the planning committee and the society-run mine show planning and collective ownership, features of socialism.',
}));
Q('ord_inventions', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Four cards are pinned on the imagined timeline wall of the Marlbeck Museum. Arrange them in the order in which the inventions appeared.',
  items: [
    'Darby smelts iron with coke (about 1709)',
    'Kay\'s flying shuttle (1733)',
    'Arkwright\'s water frame (1769)',
    'Cartwright\'s power loom (1785)',
  ],
  sol: 'Darby\'s coke smelting (about 1709) came first, then the flying shuttle (1733), the water frame (1769) and the power loom (1785).',
}));
Q('ord_later', ord({
  t: [1, 3], d: 3, c: 'understanding', marks: 2,
  stem: 'A pupil at the imagined Dunmere school arranges four events in time order on a long strip of paper. Arrange them.',
  items: [
    'The Rocket and the Liverpool to Manchester railway (1829 and 1830)',
    'The Factory Act limiting child labour (1833)',
    'The Communist Manifesto (1848)',
    'The first volume of Das Kapital (1867)',
  ],
  sol: 'The Rocket and the railway (1829 and 1830) came first, then the Factory Act of 1833, the Manifesto of 1848 and Das Kapital of 1867.',
}));

// ================================================================ short answers (2 marks)
Q('s_define_ir', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'A visitor to the imagined Marlbeck Museum asks what the Industrial Revolution was and where and when it began. Answer in two points.',
  model: 'The **Industrial Revolution** was the **change from hand production in homes and workshops to machine production in factories**, using water and then steam power. It began in **England** from about the **1750s or 1760s**.',
  sol: 'Hand to machine production; began in England from about the 1750s or 1760s.',
  scheme: [['Change from hand production to machine production in factories using power', 1], ['Began in England from about the 1750s or 1760s', 1]],
}));
Q('s_enclosure', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'In the imagined village of Ashgrove the common land is fenced into large farms, and many families move to Marlbeck. Explain how this helped the Industrial Revolution.',
  model: 'This was the **enclosure movement**. Many small farmers and labourers **lost access to the land** and moved to the towns, where they became **cheap labour** for the new factories.',
  sol: 'Enclosure sent people to towns as cheap labour.',
  scheme: [['Enclosure movement: people lost access to land and moved to the towns', 1], ['They supplied cheap labour for factories', 1]],
}));
Q('s_coal_iron', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'The imagined engineer Josiah Brandt chooses a site at Greywater for new ironworks. Explain why a site with coal and iron ore close together was an advantage, and name one other natural or material advantage England had.',
  model: 'Iron ore and coal were both needed for **furnaces and engines**, and having them **close together** made supplies cheap and quick. Another advantage was **colonies supplying raw materials such as cotton**.',
  sol: 'Cheap nearby supplies; raw materials from colonies.',
  scheme: [['Coal and iron close together made supplies for furnaces and engines cheap', 1], ['A second advantage such as colonies supplying raw materials', 1]],
}));
Q('s_cap_define', short({
  t: 2, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'In an imagined lecture at Dunmere, the speaker asks: What is capitalism? Answer with its meaning and one feature.',
  model: '**Capitalism** is an economic system in which the **means of production** (land, factories and machines) are **privately owned and run for profit**. One feature is that **prices are set by demand and supply**, with competition and workers paid wages.',
  sol: 'Private ownership for profit; market prices.',
  scheme: [['Means of production privately owned and run for profit', 1], ['One feature such as market prices, competition or wages', 1]],
}));
Q('s_joint_stock', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'The imagined Tanwick Cotton Company wishes to build a large mill. Explain what a joint-stock company is and why it helped to raise large capital.',
  model: 'A **joint-stock company** raises money by **selling shares to many investors**, each risking only what he or she pays. This allowed **large capital** to be gathered for factories and machines that one owner could not afford.',
  sol: 'Shares sold to many investors; large capital.',
  scheme: [['A company that sells shares to many investors', 1], ['Raised large capital for factories and machines', 1]],
}));
Q('s_laissez', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'A speaker at the imagined Marlbeck trade meeting praises laissez-faire and names a book of 1776. What is laissez-faire, and which book is meant?',
  model: '**Laissez-faire** is the idea of **limited state interference** in trade and business, leaving it to the market. The book is Adam Smith\'s **The Wealth of Nations** (1776); only its title needs to be remembered.',
  sol: 'Limited state interference; The Wealth of Nations.',
  scheme: [['Laissez-faire: limited state interference in trade and business', 1], ['Adam Smith, The Wealth of Nations (1776)', 1]],
}));
Q('s_soc_define', short({
  t: 3, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'A pupil at the imagined Dunmere school is asked what socialism means and what it aims at. Write her answer.',
  model: '**Socialism** is an economic system or idea in which the **means of production** are **owned or controlled by society or the state**. It aims to **reduce inequality** and share wealth more fairly, often with planning and welfare.',
  sol: 'Ownership or control by society or the state; aim of reducing inequality.',
  scheme: [['Means of production owned or controlled by society or the state', 1], ['Aim of reducing inequality and sharing wealth more fairly', 1]],
}));
Q('s_unions', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'The dock workers of the imagined port of Tanwick form a union. What is a trade union, and how did unions try to improve workers\' lives?',
  model: 'A **trade union** is an **association of workers**. By acting together, workers bargained with employers for **better wages and shorter hours** and for safer conditions.',
  sol: 'Association of workers; bargained for wages, hours and conditions.',
  scheme: [['An association of workers', 1], ['Bargained for better wages, shorter hours or safer conditions', 1]],
}));
Q('s_owen', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Who was Robert Owen, and what did he do at New Lanark?',
  model: '**Robert Owen** was an owner of a mill at **New Lanark** and is counted among the **early socialists**. He provided **better housing and a school** and kept hours shorter than was usual for his workers.',
  sol: 'Mill owner and early socialist; housing, school, shorter hours.',
  scheme: [['Mill owner at New Lanark counted among early socialist thinkers', 1], ['Better housing, a school or shorter hours for workers', 1]],
}));
Q('s_compare_motive', short({
  t: 3, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'A pupil of the imagined Dunmere school compares the two systems. State the main motive of production under each, and how each decides what to produce.',
  model: 'In **capitalism**, the main motive is **profit**, and the **market** (demand and supply) guides production. In **socialism**, the main aim is **social welfare**, and **planning** by society or the state guides production.',
  sol: 'Capitalism: profit and the market; socialism: welfare and planning.',
  scheme: [['Capitalism: profit motive, market decides', 1], ['Socialism: social welfare aim, planning decides', 1]],
}));

// ================================================================ short answers (3 marks)
Q('s3_inventions', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'The imagined Marlbeck Museum is making labels for its textile gallery. Write the inventor and the year for any three machines of the textile industry.',
  model: '1. The **flying shuttle** of **John Kay**, **1733**.\n2. The **spinning jenny** of **James Hargreaves**, about **1764**.\n3. The **water frame** of **Richard Arkwright** (**1769**); or the mule of **Samuel Crompton** (**1779**); or the power loom of **Edmund Cartwright** (**1785**).',
  sol: 'Any three machines with inventor and year.',
  scheme: [['First machine with inventor and year', 1], ['Second machine with inventor and year', 1], ['Third machine with inventor and year', 1]],
}));
Q('s3_steam_rail', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'An imagined lecturer at Dunmere asks how coal, iron and steam changed transport and industry. Name the contribution of James Watt, of Abraham Darby and of George Stephenson.',
  model: '1. **James Watt** improved the **steam engine** (patent **1769**), giving power for mills and mines.\n2. **Abraham Darby** smelted iron using **coke** (about **1709**), making iron cheaper.\n3. **George Stephenson** built the locomotive **Rocket** (**1829**) and the **Liverpool and Manchester railway** opened in **1830**.',
  sol: 'Watt: steam engine; Darby: coke smelting; Stephenson: Rocket and railway.',
  scheme: [['Watt: improved steam engine, 1769', 1], ['Darby: smelting iron with coke, about 1709', 1], ['Stephenson: Rocket 1829 and the 1830 railway', 1]],
}));
Q('s3_cap_causes', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'A teacher at the imagined Marlbeck school asks why capitalism grew after the Industrial Revolution. State any three causes.',
  model: '1. **Factories and machines needed large capital**.\n2. **Merchants and entrepreneurs invested profits**, and **banks and joint-stock companies** grew.\n3. **Trade and colonies expanded**, the **middle class grew**, and ideas of **free trade and laissez-faire** (Adam Smith\'s The Wealth of Nations, 1776) spread.',
  sol: 'Any three causes.',
  scheme: [['First cause with a clear statement', 1], ['Second cause with a clear statement', 1], ['Third cause with a clear statement', 1]],
}));
Q('s3_conditions', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'The imagined letters of mill workers in Marlbeck describe hard conditions. State any three conditions of industrial workers in the early factory towns.',
  model: '1. **Long hours**, often 12 to 16 hours a day, and **low wages**.\n2. **Child and women\'s labour** in factories and mines, and **unsafe machines**.\n3. **Crowded slums, disease** and **no job security**, with a widening gap between owners and workers.',
  sol: 'Any three conditions.',
  scheme: [['First condition', 1], ['Second condition', 1], ['Third condition', 1]],
}));
Q('s3_utopian', short({
  t: 3, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'The imagined Dunmere library is arranging a shelf on the early socialist thinkers, often called utopian socialists. Write one line each on Robert Owen, Saint-Simon and Fourier.',
  model: '1. **Robert Owen** ran a mill community at **New Lanark** with better housing, a school and shorter hours.\n2. **Saint-Simon** wanted industry **organised for the benefit of society as a whole**.\n3. **Fourier** proposed small **cooperative communities**.',
  sol: 'Owen: New Lanark; Saint-Simon: industry for society; Fourier: cooperative communities.',
  scheme: [['Owen and New Lanark', 1], ['Saint-Simon: industry organised for society', 1], ['Fourier: cooperative communities', 1]],
}));
Q('s3_marx', short({
  t: 3, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'A student of the imagined Dunmere club prepares a note on Karl Marx and Friedrich Engels. Name their two works with dates, and state in a sentence the idea of class struggle.',
  model: '1. **The Communist Manifesto** (**1848**), by Marx and Engels.\n2. **Das Kapital**, first volume **1867**, by Marx.\n3. They argued that society was divided into **classes with opposed interests**, owners and workers, and that **struggle between classes** shaped history.',
  sol: 'Manifesto 1848; Das Kapital 1867; class struggle.',
  scheme: [['The Communist Manifesto, 1848', 1], ['Das Kapital, first volume 1867', 1], ['Class struggle stated neutrally as their argument', 1]],
}));
Q('s3_compare_state', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'A pupil of the imagined Dunmere school is asked to compare capitalism and socialism on the role of the state, on competition, and on distribution of income. Write her answer.',
  model: '1. **State:** limited role in capitalism (laissez-faire idea); a large role in socialism, with planning and welfare.\n2. **Competition:** a central feature of capitalism; less emphasised in socialism, which stresses cooperation.\n3. **Income:** depends on market returns in capitalism; socialism aims to share it more evenly.',
  sol: 'State, competition, income compared.',
  scheme: [['Role of the state compared', 1], ['Competition compared', 1], ['Distribution of income compared', 1]],
}));

// ================================================================ long answers (10 marks, 3 + 3 + 4)
Q('l_causes_why', long({
  t: [1], d: 2, c: 'understanding', marks: 10, wl: L10,
  stem: 'In the imagined town of Marlbeck, a lecture is advertised under the title Why England First?\n\n(i) Define the Industrial Revolution and state when it began in England. **[3]**\n(ii) Explain how capital, colonies, and coal and iron helped it to begin. **[3]**\n(iii) Explain how labour, farming, banking, shipping and political stability helped. **[4]**',
  model: '(i) The **Industrial Revolution** was the **change from hand production in homes and workshops to machine production in factories**, using water and then steam power. It began in England from about the **1750s or 1760s**.\n\n(ii) **Capital** from trade and colonies could be invested in factories. **Colonies** supplied raw materials such as cotton and also served as markets. **Coal and iron** lay close together, so furnaces and engines were supplied cheaply.\n\n(iii) The **enclosure movement** and farming changes pushed many rural people to towns as **cheap labour**, and an **agricultural revolution** fed a growing population. The **Bank of England (1694)** supported lending, a large **navy and merchant shipping** protected and carried trade, and **political stability** encouraged investment.',
  sol: 'Meaning and date; capital, colonies, coal and iron; labour, farming, banking, shipping and stability.',
  scheme: [['(i) Meaning of the Industrial Revolution', 2], ['(i) Began from about the 1750s or 1760s in England', 1], ['(ii) Capital, colonies, coal and iron (one mark each)', 3], ['(iii) Labour from enclosure and agricultural revolution', 1.5], ['(iii) Banking system and navy', 1.5], ['(iii) Political stability', 1]],
}));
Q('l_causes_eval', long({
  t: [1], d: 4, c: 'evaluation', marks: 10, wl: L10,
  stem: 'The imagined debating club of Dunmere records three speakers on why industry grew first in England. Maud says that coal and iron explain everything. Peter says that colonies were the key. Ruth says that the new machines alone were enough.\n\n(i) Name the cause that each speaker stresses. **[3]**\n(ii) Explain how the enclosure movement and the agricultural revolution contributed. **[3]**\n(iii) Evaluate the claim that a single cause explains the Industrial Revolution. **[4]**',
  model: '(i) **Maud** stresses **coal and iron deposits found close together**. **Peter** stresses **colonies**, which supplied raw materials and markets. **Ruth** stresses **inventions**, the new machines.\n\n(ii) The **enclosure movement** pushed many rural people into towns, where they became **cheap labour** for factories. The **agricultural revolution** raised food output, so a **growing population** could be fed and fewer people were needed on farms.\n\n(iii) The claim is **only partly true**. Each cause mattered, but coal and iron needed **capital** and **banks**, machines needed **labour** and **markets**, and colonies needed **shipping**. Many causes worked together, so **no single cause** explains it.',
  sol: 'Causes matched; enclosure and farming; evaluation of a single-cause claim.',
  scheme: [['(i) Maud: coal and iron', 1], ['(i) Peter: colonies', 1], ['(i) Ruth: inventions', 1], ['(ii) Enclosure and cheap labour', 1.5], ['(ii) Agricultural revolution and food', 1.5], ['(iii) Partly true, with a reason', 2], ['(iii) Other causes working together', 2]],
}));
Q('l_inventions', long({
  t: [1], d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'A pupil of the imagined Marlbeck school prepares a talk called Machines That Changed the Mill.\n\n(i) Name three textile inventions with the inventor of each. **[3]**\n(ii) Explain the importance of James Watt\'s improved steam engine and of Abraham Darby\'s use of coke. **[3]**\n(iii) Describe the Rocket and the railway of 1830, and say how canals and roads also helped transport. **[4]**',
  model: '(i) The **flying shuttle** (John Kay, 1733), the **spinning jenny** (James Hargreaves, about 1764) and the **water frame** (Richard Arkwright, 1769); the mule (Crompton, 1779) and the power loom (Cartwright, 1785) are also correct.\n\n(ii) **James Watt\'s** improved **steam engine** (patent 1769) gave power that did not depend on rivers, so mills could be built in towns. **Abraham Darby** smelted iron using **coke** (about 1709), making iron cheaper and plentiful for machines.\n\n(iii) **George Stephenson\'s Rocket** (1829) was a locomotive, and the **Liverpool and Manchester railway** (1830) carried passengers and goods quickly. **Canals and roads** had already helped move coal, cotton and finished goods between mines, mills and ports.',
  sol: 'Three textile inventions; Watt and Darby; the Rocket and other transport.',
  scheme: [['(i) Three inventions with inventors', 3], ['(ii) Watt and steam power', 1.5], ['(ii) Darby and coke iron', 1.5], ['(iii) Rocket, 1829, and the 1830 railway', 2], ['(iii) Canals and roads', 2]],
}));
Q('l_capitalism', long({
  t: [2], d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'A history club at the imagined Tanwick school prepares a poster titled Capitalism: What and Why.\n\n(i) What is meant by capitalism? **[3]**\n(ii) State three features of capitalism. **[3]**\n(iii) Explain four causes of the rise of capitalism after the Industrial Revolution. **[4]**',
  model: '(i) **Capitalism** is an economic system in which the **means of production** (land, factories and machines) are **privately owned and run for profit**, with prices set by demand and supply, competition, and workers paid wages.\n\n(ii) Features: **private ownership** of the means of production, the **profit motive**, and **prices set by the market** through demand and supply. Competition and wages are further features.\n\n(iii) **Factories and machines needed large capital.** **Merchants and entrepreneurs invested profits**, and **banks and joint-stock companies** grew. **Trade and colonies expanded**, the **middle class** grew, and ideas of **free trade and laissez-faire**, linked with Adam Smith\'s The Wealth of Nations (1776), spread.',
  sol: 'Meaning; three features; four causes.',
  scheme: [['(i) Private ownership of the means of production', 1], ['(i) Run for profit', 1], ['(i) Market prices, competition or wages', 1], ['(ii) Three features', 3], ['(iii) Four causes (one mark each)', 4]],
}));
Q('l_conditions', long({
  t: [3], d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'The imagined Marlbeck Museum displays the letters of mill workers under the title Voices from the Mill.\n\n(i) State three conditions of workers in the early factories. **[3]**\n(ii) Describe child and women\'s labour and the condition of workers\' housing. **[3]**\n(iii) Explain how these conditions led to ideas of socialism and to other responses. **[4]**',
  model: '(i) Workers faced **long hours**, often 12 to 16 hours a day, **low wages** and **unsafe machines**. Many also had **no job security**.\n\n(ii) **Children and women** worked in factories and mines for low pay. Workers lived in **crowded slums**, where **disease** spread easily.\n\n(iii) The **gap between owners and workers widened**, and some thinkers asked for a fairer sharing of wealth, so **early socialists** such as Owen, Saint-Simon and Fourier, and later **Marx and Engels**, put forward ideas of socialism. Workers also formed **trade unions**, and laws such as Britain\'s **Factory Act of 1833** limited child labour.',
  sol: 'Conditions; child and women\'s labour and slums; socialist ideas and other responses.',
  scheme: [['(i) Three conditions', 3], ['(ii) Child and women\'s labour', 1.5], ['(ii) Slums and disease', 1.5], ['(iii) Widening gap leading to socialist ideas', 2], ['(iii) Trade unions and Factory Act as responses', 2]],
}));
Q('l_socialism', long({
  t: [3], d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'A teacher at the imagined Dunmere school asks the class to prepare notes on socialism.\n\n(i) What is meant by socialism, and what does it aim at? **[3]**\n(ii) Write about Robert Owen, Saint-Simon and Fourier. **[3]**\n(iii) Name the works of Marx and Engels, explain the idea of class struggle neutrally, and mention one response of governments to workers\' conditions. **[4]**',
  model: '(i) **Socialism** is an economic system or idea in which the **means of production** are **owned or controlled by society or the state**. It aims to **reduce inequality** and share wealth more fairly, often with planning and welfare.\n\n(ii) **Robert Owen** ran the mill community at **New Lanark**. **Saint-Simon** wanted industry organised for society, and **Fourier** proposed small cooperative communities. They are called early or utopian socialists.\n\n(iii) **Marx and Engels** wrote **The Communist Manifesto** (1848), and Marx wrote **Das Kapital** (first volume 1867). They argued that society was divided into **classes with opposed interests** and that **struggle between classes** shaped history. Britain\'s **Factory Act of 1833** limited child labour.',
  sol: 'Meaning and aim; the early thinkers; Marx and Engels and a government response.',
  scheme: [['(i) Meaning: owned or controlled by society or the state', 2], ['(i) Aim: reduce inequality', 1], ['(ii) Owen, Saint-Simon and Fourier (one mark each)', 3], ['(iii) The two works with dates', 2], ['(iii) Class struggle stated neutrally', 1], ['(iii) Factory Act of 1833', 1]],
}));
Q('l_compare', long({
  t: [3], d: 4, c: 'analysis', marks: 10, wl: L10,
  stem: 'Two groups at the imagined Dunmere school prepare to compare capitalism and socialism as economic systems, each with its features, merits and criticisms.\n\n(i) Compare the two systems on ownership and motive. **[3]**\n(ii) Compare them on how prices and production are decided and on the distribution of income. **[3]**\n(iii) Compare the role of the state and competition, and state one merit and one criticism claimed for each system. **[4]**',
  model: '(i) In **capitalism** the means of production are mainly **privately owned** and the motive is **profit**. In **socialism** they are **owned or controlled by society or the state**, and the aim is **social welfare**.\n\n(ii) In capitalism **prices and production** are decided by the **market**, and income depends on market returns. In socialism they are guided by **planning**, and the aim is to **share income more evenly**.\n\n(iii) The state has a **limited role** and competition is central in capitalism; the state has a **larger role** with planning and welfare in socialism. Supporters of capitalism point to **incentives and choice**, critics to **inequality**. Supporters of socialism point to **security and fairness**, critics to **less incentive and heavy planning**.',
  sol: 'Ownership and motive; prices, production and income; state, competition, merits and criticisms.',
  scheme: [['(i) Ownership compared', 1.5], ['(i) Motive compared', 1.5], ['(ii) Prices and production compared', 1.5], ['(ii) Distribution of income compared', 1.5], ['(iii) State and competition compared', 2], ['(iii) A merit and a criticism for each, balanced', 2]],
}));

// ================================================================ source-based items (imagined documents)
Q('sb_notes', source({
  t: [1], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the imagined notes of a debating club and answer the questions that follow. ${IMAG}`,
  passage: '**Notes of the imagined Dunmere Debating Club, meeting on the motion: Why did factories first rise in England?**\n\nSpeaker 1 (Maud): The merchants of Tanwick have made large profits from trade overseas, and they now lend and invest. Banks make loans easy.\n\nSpeaker 2 (Peter): Ships bring raw cotton from the colonies, and they carry our cloth back to buyers there.\n\nSpeaker 3 (Ruth): The farms of Ashgrove have been fenced, so many families have come to Marlbeck seeking work. The harvests are larger, and the growing town is fed.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which cause of the Industrial Revolution does Speaker 2 describe?', model: '**Colonies** as a source of raw materials and as markets.', sol: 'Colonies: raw materials and markets.', scheme: [['Colonies supplying raw materials and markets', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Name the movement that explains why families came to Marlbeck seeking work.', model: 'The **enclosure movement**.', sol: 'Enclosure movement.', scheme: [['Enclosure movement', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain how Speaker 1\'s remarks show capital and a banking system helping industry.', model: 'Profits from **trade** gave merchants **capital** to invest in factories. **Banks** made loans easy, as the Bank of England (1694) did, so entrepreneurs could borrow to build mills.', sol: 'Capital from trade; banks lending.', scheme: [['Profits from trade gave capital to invest', 1], ['Banks lent money so industry could grow', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Name two causes of the Industrial Revolution that none of the three speakers mentions.', model: '**Coal and iron deposits found close together** and **political stability** are not mentioned. A large navy, canals and roads, or a spirit of invention would also be correct.', sol: 'Any two causes not mentioned.', scheme: [['First cause not mentioned', 1], ['Second cause not mentioned', 1]] }),
    ]),
  ],
}));
Q('sb_prospectus', source({
  t: [2], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the imagined notice of a company and answer the questions that follow. ${IMAG}`,
  passage: '**From an imagined notice issued by the Tanwick Cotton Company in the late 1700s**\n\nThe company will raise money by selling shares in the new mill at Tanwick. Any person may buy shares, and no shareholder can lose more than he or she has paid for them. The money will buy steam engines and spinning machines. The cloth will be sold at home and in the colonies, and the profits will be divided among the shareholders according to the shares they hold. The company expects the price of its cloth to be set by the market.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'What kind of company is described in the notice?', model: 'A **joint-stock company**.', sol: 'Joint-stock company.', scheme: [['Joint-stock company', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which feature of capitalism is shown by the sentence about the profits?', model: 'The **profit motive**: production is run for profit.', sol: 'Profit motive.', scheme: [['Profit motive', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain how selling shares helped industry to raise the large capital it needed.', model: 'Many people each paid a **small sum** for shares, so a **very large total** could be gathered for engines and machines that a single owner could not afford. This is how **joint-stock companies** helped the growth of capitalism.', sol: 'Many small sums made a large total.', scheme: [['Many investors paid for shares', 1], ['Large capital gathered for machines and engines', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Which two features of capitalism, other than profit, can be seen in the notice?', model: '**Private ownership** by shareholders, and **prices set by the market**. Selling to buyers at home and in the colonies also shows expanding trade.', sol: 'Private ownership; market prices.', scheme: [['Private ownership by shareholders', 1], ['Prices set by the market', 1]] }),
    ]),
  ],
}));
Q('sb_letter', source({
  t: [3], d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: `Read the imagined letter and answer the questions that follow. ${IMAG}`,
  passage: '**From an imagined letter of Edith Pell, a mill worker of Marlbeck, to her sister in the countryside, in the 1830s**\n\nI work at the loom from before sunrise until after dark, nearly fourteen hours a day, and the pay is barely enough for bread. My youngest cousin, who is only nine, works beside me, and the machines have no guards. We sleep five to a room in a lane where the water is foul and fever is common. If I fall ill, there is no pay and no promise that my place will be kept. Our men have begun to meet in a union, and a new law has been spoken of, which may limit the work of children.',
  parts: [
    child('a', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'State one condition in the letter that shows the lack of safety at work.', model: 'The machines have **no guards**, so they were **unsafe**.', sol: 'Unguarded machines.', scheme: [['Unsafe machines without guards', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Name the kind of law that the letter says has been spoken of.', model: 'A **Factory Act** limiting child labour (such as that of 1833).', sol: 'A Factory Act.', scheme: [['Factory Act limiting child labour', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'evaluation', marks: 2, stem: '**Either** (i): Explain how the conditions described in this letter could lead people to ask for a fairer sharing of wealth.', model: 'Long hours, low pay, **child labour**, foul housing and **no job security** contrasted with the **wealth of owners**. This **widening gap** led some thinkers to ask for a fairer sharing, giving rise to **socialist** ideas.', sol: 'Hard conditions and a widening gap led to socialist ideas.', scheme: [['Hard conditions in the letter listed or linked', 1], ['Widening gap and demand for fairer sharing, socialist ideas', 1]] }), [
      short({ t: 3, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Name two responses to the workers\' conditions that the letter mentions or hints at, and name one early socialist thinker.', model: 'The letter mentions a **trade union** and a **law limiting child labour**. An early socialist thinker is **Robert Owen** (New Lanark), or Saint-Simon, or Fourier.', sol: 'Union and Factory Act; Owen.', scheme: [['Trade union and law limiting child labour', 1], ['An early socialist thinker named', 1]] }),
    ]),
  ],
}));

// ================================================================ extra t02 items (capitalism)
Q('m_wage_feature', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'At the imagined Orrin Falls mill, the owner owns every loom and keeps the profit from the cloth, while the weavers receive a fixed payment each week for their labour. Which feature of capitalism does the weekly payment show?',
  opts: [
    'Workers are paid wages',
    'Prices are fixed by a planning committee',
    'The mill is owned by the whole community',
    'The state decides how much cloth is to be woven',
  ],
  sol: 'A fixed payment for labour is a wage, one of the features of capitalism. Planning committees, community ownership and state decisions on output belong to socialism, not to this mill.',
}));
Q('m_free_trade', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A merchant of the imagined port of Tanwick complains that heavy duties and rules on his cargoes slow his business, and says he would prefer trade with few controls. Which idea that spread with the rise of capitalism is he supporting?',
  opts: [
    'Free trade',
    'The domestic system',
    'State planning of output',
    'The enclosure of common land',
  ],
  sol: 'Preferring trade with few controls and duties is the idea of free trade, which spread along with laissez-faire. The domestic system, state planning and enclosure are different matters.',
}));
Q('m_cap_merits', mcq({
  t: 2, d: 4, c: 'evaluation',
  stem: 'Two pupils of the imagined Dunmere school prepare notes on capitalism for a class display. Pupil 1 lists incentives, wide choice and growth of output as points that its supporters make, and inequality of income as a point that critics make. Pupil 2 writes that capitalism has no merits at all. Which judgement is sound for a history answer?',
  opts: [
    'Pupil 1 is sound, because a history answer sets out the merits claimed by supporters and the criticisms made by critics',
    'Pupil 2 is sound, because a system that has critics can have no merits',
    'Both are sound, because any list of points is acceptable in history',
    'Neither is sound, because history does not discuss economic systems',
  ],
  sol: 'A balanced answer reports what supporters and critics say. Pupil 2 dismisses the whole system, and the other options are wrong in claiming that criticism cancels every merit or that history ignores economic systems.',
}));
Q('tf_wealth_nations', tf({
  t: 2, d: 2, c: 'recall', ans: true,
  stem: 'True or false? A librarian at the imagined Dunmere library says that The Wealth of Nations, linked with the ideas of free trade and limited state interference, was published in 1776.',
  sol: 'Adam Smith\'s The Wealth of Nations was published in 1776, and it is linked with those ideas. Only the title and date are needed.',
}));
Q('ar_cap_capital', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Joint-stock companies helped capitalism to grow after the Industrial Revolution.',
  r: 'Factories and machines needed far larger sums than a single owner could usually provide, and shares allowed many investors to contribute.',
  sol: 'Both are true. The need for large capital, met by selling shares to many investors, is exactly why joint-stock companies helped capitalism to grow, so R explains A.',
}));
Q('s_cap_features', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'In the imagined town of Orrin Falls, three rival cloth sellers cut their prices to win buyers, and each hopes to make a profit. Name two features of capitalism that this scene shows.',
  model: 'The scene shows **competition** between rival sellers and the **profit motive**. The falling prices also show that **prices respond to the market**, a further feature.',
  sol: 'Competition and profit motive.',
  scheme: [['Competition between rival sellers', 1], ['Profit motive or market prices', 1]],
}));
