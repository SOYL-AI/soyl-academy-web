// CBSE 11 Business Studies, ch08 Small Business and Enterprises: question bank. Every person, enterprise and figure is
// imagined and written by SOYL; no NCERT example, exercise or board/sample-paper item is reused (D-036).
// No rupee limit of any MSME class is stated anywhere: the principle only (composite criteria since 2020).
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child } from '../../cbse-11-business-studies-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
export const fmt = (n) => n.toLocaleString('en-IN');

// Indian-style number words for narration (lakh, crore).
const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const w2 = (n) => (n < 20 ? ONES[n] : TENS[Math.floor(n / 10)] + (n % 10 ? ' ' + ONES[n % 10] : ''));
const w3 = (n) => (n >= 100 ? ONES[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' and ' + w2(n % 100) : '') : w2(n));
export const W = (n) => {
  if (n === 0) return 'zero';
  const parts = [];
  const cr = Math.floor(n / 10000000); n %= 10000000;
  const lk = Math.floor(n / 100000); n %= 100000;
  const th = Math.floor(n / 1000); n %= 1000;
  if (cr) parts.push(w2(cr) + ' crore');
  if (lk) parts.push(w2(lk) + ' lakh');
  if (th) parts.push(w2(th) + ' thousand');
  if (n) parts.push(w3(n));
  return parts.join(' ');
};

// ---- computed figures (all imagined) -------------------------------------------------------------------------
// Savita Pickles: start-up need and the mix of funds (Rs).
export const SAV = { equip: 140000, stock: 90000, label: 30000, wages: 40000, own: 120000, custs: 400, perCust: 200, mfLoan: 100000, mfInst: 10, mfEach: 11000 };
SAV.need = SAV.equip + SAV.stock + SAV.label + SAV.wages; // 300,000
SAV.crowd = SAV.custs * SAV.perCust; // 80,000
SAV.total = SAV.own + SAV.crowd + SAV.mfLoan; // 300,000
SAV.mfPaid = SAV.mfInst * SAV.mfEach; // 110,000
SAV.mfExtra = SAV.mfPaid - SAV.mfLoan; // 10,000
SAV.ownPct = (SAV.own * 100) / SAV.total; // 40
// Sargam Apps: angel investor and a later venture capital round (Rs).
export const SG = { angel: 5000000, angelPct: 20, vc: 30000000, vcPct: 12 };
SG.post = (SG.angel * 100) / SG.angelPct; // 25,000,000
SG.pre = SG.post - SG.angel; // 20,000,000
SG.founders = 100 - SG.angelPct; // 80
SG.vcPost = (SG.vc * 100) / SG.vcPct; // 250,000,000
SG.foundersAfter = (SG.founders * (100 - SG.vcPct)) / 100; // 70.4
SG.angelAfter = (SG.angelPct * (100 - SG.vcPct)) / 100; // 17.6
// Mitti Gram imagined pottery cluster.
export const MG = { units: 40, perUnit: 6, cap: 2000, made: 1200, rejected: 96 };
MG.jobs = MG.units * MG.perUnit; // 240
MG.util = (MG.made * 100) / MG.cap; // 60
MG.unused = MG.cap - MG.made; // 800
MG.rejPct = (MG.rejected * 100) / MG.made; // 8
MG.good = MG.made - MG.rejected; // 1104
// Dhara Spices capacity (kg a month).
export const DH = { cap: 5000, made: 3500 };
DH.util = (DH.made * 100) / DH.cap; // 70
DH.unused = DH.cap - DH.made; // 1500
// Kesar Toys: machine on hire purchase (Rs).
export const HP = { price: 120000, down: 30000, inst: 12, each: 9000 };
HP.paid = HP.down + HP.inst * HP.each; // 138,000
HP.extra = HP.paid - HP.price; // 18,000
// Lohit Tools: supplier to a large firm (Rs).
export const LT = { parts: 2500, rate: 120, faultyPct: 8 };
LT.sales = LT.parts * LT.rate; // 300,000
LT.faulty = (LT.parts * LT.faultyPct) / 100; // 200
if (SAV.need !== 300000 || SAV.crowd !== 80000 || SAV.total !== 300000 || SAV.mfPaid !== 110000 || SAV.mfExtra !== 10000 || SAV.ownPct !== 40 ||
  SG.post !== 25000000 || SG.pre !== 20000000 || SG.founders !== 80 || SG.vcPost !== 250000000 || Math.abs(SG.foundersAfter - 70.4) > 1e-9 || Math.abs(SG.angelAfter - 17.6) > 1e-9 ||
  MG.jobs !== 240 || MG.util !== 60 || MG.unused !== 800 || MG.rejPct !== 8 || MG.good !== 1104 || DH.util !== 70 || DH.unused !== 1500 ||
  HP.paid !== 138000 || HP.extra !== 18000 || LT.sales !== 300000 || LT.faulty !== 200) throw new Error('figure check failed');

// ================================================================ t01 Entrepreneurship development and MSMEs
Q('mc_ent_def', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Which statement describes an entrepreneur most accurately?`,
  opts: [
    `A person who sets up a business, bears its risk and brings resources together to pursue an opportunity`,
    `A person who works for a fixed salary in an established firm and bears none of its risk`,
    `A person who only lends money to businesses and takes a fixed rate of interest`,
    `A government officer who inspects firms and issues licences`,
  ],
  sol: `An entrepreneur sets up a venture, takes the risk and organises resources to pursue an opportunity. A salaried employee bears no such risk, a lender earns interest rather than running the venture, and an inspecting officer regulates firms but does not set one up.`,
}));
Q('mc_ent_process', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `In Business Studies, the word entrepreneurship refers to`,
  opts: [
    `the process of setting up a venture, organising resources and bearing its risk`,
    `the person who sets up the venture`,
    `the profit that a venture earns in its first year`,
    `a licence that lets a firm start production`,
  ],
  sol: `Entrepreneurship is the process; the entrepreneur is the person. Profit is a result of the process and a licence is a permission, so neither names the activity itself.`,
}));
Q('mc_char_innov', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Savita, an imagined pickle maker of the imagined town of Amravan, blends roasted jaggery into her lime pickle, a taste that no shop in the district sells. This shows which characteristic of entrepreneurship?`,
  opts: [`Innovation`, `Risk taking`, `Organisation of production`, `Lawful activity`],
  sol: `Offering something new is innovation. The stem says nothing about losing money, about bringing workers and materials together, or about following the law, so the other three do not fit.`,
}));
Q('mc_char_risk', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Savita mortgages her small plot of land to buy pickling equipment, knowing that she may lose the plot if her first season's sales are poor. Which characteristic of entrepreneurship does this show?`,
  opts: [`Risk taking`, `Systematic activity`, `Innovation`, `Purposeful activity`],
  sol: `Putting her own property at stake for an uncertain return is risk taking. Systematic activity is about planning and method, innovation is about something new, and purposeful activity is about having a clear aim.`,
}));
Q('mc_char_sys', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Before starting production, Savita writes a plan, sets a monthly budget, keeps a stock book and records every sale in a register. Which characteristic of entrepreneurship does she show?`,
  opts: [`Systematic activity`, `Risk taking`, `Innovation`, `Organisation of production`],
  sol: `Planning, budgeting and record keeping make the venture a systematic activity. Risk taking means accepting uncertainty, innovation means newness, and organisation of production means bringing together the factors of production.`,
}));
Q('mc_char_lawful', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Mitti Gram, an imagined pottery cluster in the imagined village of Kumharpada, sells only glazed ware that meets safety rules and pays all its dues, with the aim of earning a steady living for its families. This reflects entrepreneurship as a`,
  opts: [`lawful and purposeful activity`, `purely risky and unplanned activity`, `activity with no aim except quick profit`, `government activity run without any risk`],
  sol: `Following the rules while working towards a clear aim makes the venture a lawful and purposeful activity. It is not unplanned, it does have an aim beyond quick profit, and it is run by the families, not by the government.`,
}));
Q('mc_need_emp', mcq({
  t: 1, d: 3, c: 'application',
  stem: `When the pottery cluster of Kumharpada grows, forty families set up units and each hires six villagers who earlier had no work between harvests. Which need for entrepreneurship development does this show?`,
  opts: [`Creating employment`, `Promoting innovation`, `Taxing large firms`, `Reducing exports`],
  sol: `New units that give jobs to villagers meet the need for employment. The stem does not describe a new idea, taxation or a fall in exports.`,
}));
Q('mc_startup', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Startup India was launched in 2016. As of 2026, its aim is to`,
  opts: [`support new enterprises and encourage entrepreneurship`, `fix the price of every product`, `replace all bank lending to small firms`, `stop new firms from entering the market`],
  sol: `The initiative was announced to build an environment that supports start-ups. It does not set prices, replace banks or block new entrants.`,
}));
Q('mc_fund_boot', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Savita starts with Rs ${fmt(SAV.own)} from her own savings and reinvests her first sales to buy more jars, without taking money from any outsider. This way of funding is called`,
  opts: [`bootstrapping`, `crowdfunding`, `venture capital`, `microfinance`],
  sol: `Funding the venture from one's own money and early earnings is bootstrapping. Crowdfunding collects sums from many people, venture capital comes from professional funds, and microfinance means small loans from lenders.`,
}));
Q('mc_fund_crowd', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Savita puts her lime pickle on an online page and ${fmt(SAV.custs)} customers each pay Rs ${fmt(SAV.perCust)} in advance for jars to be delivered later, which gives her Rs ${fmt(SAV.crowd)}. This is an example of`,
  opts: [`crowdfunding`, `bootstrapping`, `angel investment`, `a business incubator`],
  sol: `Collecting small sums from many people, often through an online page, is crowdfunding. Bootstrapping uses the founder's own money, an angel investor is a single wealthy individual, and an incubator gives support rather than money from customers.`,
}));
Q('mc_fund_angel', mcq({
  t: 1, d: 3, c: 'application',
  stem: `A retired executive puts Rs ${fmt(SG.angel)} of her own money into Sargam Apps in return for ${SG.angelPct} per cent of the company and meets the founders every week to guide them. She is`,
  opts: [`an angel investor`, `a venture capital fund`, `a microfinance lender`, `a crowdfunding supporter`],
  sol: `A wealthy individual who invests her own money in an early venture and often mentors it is an angel investor. A venture capital fund is a professional pool of money, a microfinance lender makes small loans, and crowdfunding gathers many small sums.`,
}));
Q('mc_fund_vc', mcq({
  t: 1, d: 4, c: 'application',
  stem: `A professional fund that pools money from institutions offers Rs ${fmt(SG.vc)} to Sargam Apps, which now has many users, in return for ${SG.vcPct} per cent of its shares, hoping to sell them later at a gain. This is`,
  opts: [`venture capital`, `bootstrapping`, `microfinance`, `trade credit`],
  sol: `A professional fund that invests in a fast-growing venture for a share and exits later is venture capital. Bootstrapping uses the founders' own money, microfinance gives small loans to small borrowers, and trade credit is credit from suppliers.`,
}));
Q('mc_fund_inc', mcq({
  t: 1, d: 3, c: 'application',
  stem: `A town in the imagined state of Dakshinpur runs a centre that gives young start-ups a shared workspace, mentors and training for a few months. This centre is a`,
  opts: [`business incubator or accelerator`, `venture capital fund`, `commercial paper issuer`, `retail chain`],
  sol: `Shared space, mentoring and training for young ventures describe an incubator or accelerator. A venture capital fund mainly invests money, and the other two options are unrelated to nurturing start-ups.`,
}));
Q('mc_fund_micro', mcq({
  t: 1, d: 3, c: 'application',
  stem: `A women's self-help group in an imagined village borrows a small sum from a lender that serves low-income borrowers, and one member uses Rs ${fmt(SAV.mfLoan)} to start a tailoring unit. This source is`,
  opts: [`microfinance`, `venture capital`, `an angel investment`, `a depository receipt`],
  sol: `Small loans to low-income borrowers and tiny enterprises are microfinance. Venture capital and angel money go to ventures with high growth prospects, and a depository receipt is an international instrument.`,
}));
Q('mc_msme_basis', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Since 2020, an enterprise is classified as micro, small or medium on the basis of`,
  opts: [
    `composite criteria of investment in plant, machinery or equipment and annual turnover`,
    `the number of workers alone`,
    `the town in which it is located`,
    `the nature of its ownership, such as sole or joint`,
  ],
  sol: `The classification uses two measures together, investment and turnover. It is not decided by head count alone, by location or by the form of ownership.`,
}));
Q('mc_msme_same', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Ira runs an imagined bakery that makes bread, and her brother Rohan runs an imagined repair shop that offers services. How are the two enterprises classified as micro, small or medium?`,
  opts: [
    `By the same composite criteria of investment and turnover, whether goods or services`,
    `Bakeries by turnover and repair shops by head count`,
    `Only the bakery is classified, because services are left out`,
    `By the choice of the owner, who may name the class`,
  ],
  sol: `Since 2020 manufacturing and service enterprises are classified by the same composite criteria. The classification is not split by head count, it covers services, and it is not left to the owner's choice.`,
}));
Q('mc_msme_claim', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: `The owner of Tilak Tools, an imagined firm, says: "My investment in machinery is small, so my firm is certainly micro." Why is her claim incomplete?`,
  opts: [
    `Classification depends on investment and turnover together, and the limits are revised by the government from time to time`,
    `Classification depends only on the age of the firm`,
    `Machinery is never counted in classification`,
    `Small firms are never classified as micro`,
  ],
  sol: `Both investment in plant, machinery or equipment and annual turnover are used together, and the limits are revised from time to time, so one small figure is not enough to say micro. Age is not a criterion, machinery is counted, and micro is one of the classes.`,
}));
Q('mc_role_local', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Mitti Gram's potters dig clay from nearby ponds and burn rice husk from nearby mills as fuel, instead of buying imported materials. Which role of small business does this show?`,
  opts: [`Use of local resources`, `Support to large industries`, `Export contribution`, `Personalised service`],
  sol: `Using materials found near the unit is use of local resources. The stem does not describe supply to a large firm, sales abroad or service tailored to a customer.`,
}));
Q('mc_role_supplier', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Lohit Tools, an imagined small firm of the imagined town of Dhatupur, makes gear covers that a large vehicle maker, Aranya Motors, fits into its cars. Which role of small business is this?`,
  opts: [`Supporting large industries as a supplier`, `Creating balanced regional growth`, `Providing non-farm work in villages`, `Easy entry through a low start-up cost`],
  sol: `Making parts for a large firm supports large industry as a supplier. The stem does not talk about a backward region, about village work or about the cost of starting.`,
}));
Q('mc_rural', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Between harvests, women of an imagined village weave baskets at home and sell them in the weekly market, earning an income that does not come from farming. This shows the role of`,
  opts: [`village and cottage industries in giving non-farm employment`, `large factories in giving urban work`, `banks in giving rural credit`, `exporters in giving foreign exchange`],
  sol: `Home-based crafts that give work outside farming are village and cottage industries. Large factories, banks and exporters are not what the stem describes.`,
}));

// ================================================================ t02 Problems of small business and government assistance
Q('mc_prob_fin', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Dhara Spices, an imagined small spice grinder of the imagined town of Masalpur, wants a loan for a new grinder, but the bank asks for security that the owner does not have, and informal lenders charge a very high rate. Which problem of small business is this?`,
  opts: [`Finance`, `Marketing`, `Managerial skills`, `Global competition`],
  sol: `Difficulty in getting funds at a fair cost is the problem of finance. The stem does not describe a selling difficulty, a lack of management skill or a foreign rival.`,
}));
Q('mc_prob_raw', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Kesar Toys, an imagined small toy maker, finds that good seasoned wood arrives late and at a changing price, so its output often stops for a few days. Which problem of small business is this?`,
  opts: [`Raw materials`, `Technology`, `Sickness`, `Capacity utilisation`],
  sol: `Irregular supply and unstable price of inputs is the problem of raw materials. Technology concerns old methods and machines, sickness concerns lasting losses, and capacity utilisation concerns idle capacity, although a stoppage can cause it.`,
}));
Q('mc_prob_mktg', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Anand Bamboo, an imagined craft unit, makes fine lamp stands, but the owner has no brand, no shop in the city and depends on traders who keep most of the price. Which problem does the unit face?`,
  opts: [`Marketing`, `Finance`, `Raw materials`, `Quality`],
  sol: `Weak access to buyers and dependence on middlemen is the marketing problem. The stem calls the stands fine, so quality is not the issue, and it does not mention loans or supply of bamboo.`,
}));
Q('mc_prob_cap', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Each unit of the Mitti Gram cluster can make ${fmt(MG.cap)} pots a month but makes only ${fmt(MG.made)}, because orders are few. Which problem of small business does this show?`,
  opts: [`Under-use of capacity`, `Shortage of raw materials`, `Lack of finance`, `Global competition`],
  sol: `Making ${fmt(MG.made)} against a capacity of ${fmt(MG.cap)} is under-use of capacity, a utilisation of ${MG.util} per cent. The stem names no input shortage, funds problem or foreign rival.`,
}));
Q('mc_prob_tech', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Lohit Tools still uses hand-fed machines that waste metal and make slow, uneven cuts, while rivals use modern machines. Which problem of small business is this?`,
  opts: [`Technology`, `Finance`, `Marketing`, `Sickness`],
  sol: `Old methods and machines are a technology problem. Finance, marketing and sickness are separate problems, even if they may follow from old technology.`,
}));
Q('mc_prob_sick', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Neel Jute, an imagined small unit, has made losses for several years and can no longer pay its suppliers or its lender, and its owner thinks of closing it. This condition is called`,
  opts: [`sickness of the unit`, `capacity utilisation`, `bootstrapping`, `personalised service`],
  sol: `A unit that keeps making losses and cannot meet its dues is sick. Capacity utilisation measures use of capacity, bootstrapping is a way of funding, and personalised service is an advantage of small business.`,
}));
Q('mc_prob_global', mcq({
  t: 2, d: 3, c: 'application',
  stem: `After imports of cheap plastic toys increase, Kesar Toys cannot match the price and loses its shop orders. Which problem of small business does this show?`,
  opts: [`Global competition`, `Managerial skills`, `Raw materials`, `Under-use of capacity only`],
  sol: `Rivals from other countries selling at lower prices is global competition. The stem does not point to weak management or input supply, and the idle capacity is a result, not the cause.`,
}));
Q('mc_nsic', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Kesar Toys is helped to find buyers for its products and to obtain a machine on hire purchase by a national body set up in 1955 for small industry. Which body is this?`,
  opts: [`National Small Industries Corporation`, `Small Industries Development Bank of India`, `National Bank for Agriculture and Rural Development`, `District Industries Centre`],
  sol: `The National Small Industries Corporation, set up in 1955, gives marketing support, helps with raw materials and supplies machinery on hire purchase. The Small Industries Development Bank is a finance body of 1990, the rural bank is for agriculture and rural credit, and a District Industries Centre works at district level.`,
}));
Q('mc_dic', mcq({
  t: 2, d: 3, c: 'application',
  stem: `A first-time entrepreneur in the imagined district of Ganganagar wants help with a site, a loan application and a training course, and is told to go to a single office in the district. This office is a`,
  opts: [`District Industries Centre`, `National Small Industries Corporation`, `Small Industries Development Bank of India`, `commercial paper market`],
  sol: `District Industries Centres, begun in 1978, are meant to be a single point of support for small units at district level. The national corporation works nationally for marketing and inputs, the development bank gives finance, and a paper market is unrelated.`,
}));
Q('mc_sidbi', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Zenith Cutlery, an imagined small unit, needs a long-term loan to modernise its plant, and its banker refers it to the national institution set up in 1990 to finance small industry. It is the`,
  opts: [`Small Industries Development Bank of India`, `National Small Industries Corporation`, `District Industries Centre`, `World Trade Organization`],
  sol: `The Small Industries Development Bank of India was set up in 1990 to give finance to small industry. The national corporation helps with marketing and inputs, a District Industries Centre is a local office, and the trade organisation deals with international trade rules.`,
}));
Q('mc_nabard', mcq({
  t: 2, d: 3, c: 'application',
  stem: `A cooperative society in an imagined farming village, Haripur, wants credit for a village workshop and rural development works, and is directed to the national bank set up in 1982 for rural credit. This is`,
  opts: [`National Bank for Agriculture and Rural Development`, `Small Industries Development Bank of India`, `National Small Industries Corporation`, `a venture capital fund`],
  sol: `The National Bank for Agriculture and Rural Development, set up in 1982, supports rural credit and development. The Small Industries Development Bank is for small industry in general, the national corporation gives marketing help and inputs, and a venture capital fund invests for gain.`,
}));
Q('mc_hp', mcq({
  t: 2, d: 4, c: 'application',
  stem: `Kesar Toys gets a moulding machine with a cash price of Rs ${fmt(HP.price)} on hire purchase, paying Rs ${fmt(HP.down)} at once and ${HP.inst} monthly instalments of Rs ${fmt(HP.each)}. How much does the firm pay in all?`,
  opts: [`Rs ${fmt(HP.paid)}`, `Rs ${fmt(HP.price)}`, `Rs ${fmt(HP.inst * HP.each)}`, `Rs ${fmt(HP.extra)}`],
  sol: `The firm pays Rs ${fmt(HP.down)} plus ${HP.inst} times Rs ${fmt(HP.each)}, which is Rs ${fmt(HP.paid)}. The second figure is the cash price, the third leaves out the first payment, and the fourth is only the extra paid over the price.`,
}));
Q('mc_inst_year', mcq({
  t: 2, d: 2, c: 'recall',
  stem: `Which of these institutions was set up in 1990 to give finance to small industry?`,
  opts: [`Small Industries Development Bank of India`, `National Small Industries Corporation`, `District Industries Centres`, `National Bank for Agriculture and Rural Development`],
  sol: `The Small Industries Development Bank of India dates from 1990. The National Small Industries Corporation is of 1955, District Industries Centres are of 1978, and the rural bank is of 1982.`,
}));

// ---- assertion-reason
Q('ar_risk', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: `Risk taking is a characteristic of entrepreneurship.`,
  r: `The return from a new venture is uncertain, and the entrepreneur may lose the money put into it.`,
  sol: `Both are true. Because returns are uncertain and money can be lost, bearing risk is part of entrepreneurship, so R explains A.`,
}));
Q('ar_crowd', ar({
  t: 1, d: 4, c: 'analysis', verdict: 'both-true-explains',
  a: `A start-up can raise money through crowdfunding without depending on one large investor.`,
  r: `Crowdfunding collects small sums from a large number of people, often through an online platform.`,
  sol: `Both are true. Spreading the need over many small contributors is what removes the dependence on one large investor, so R explains A.`,
}));
Q('ar_msme', ar({
  t: 1, d: 4, c: 'analysis', verdict: 'both-true-not-explains',
  a: `Enterprises are classified as micro, small or medium by investment and turnover taken together.`,
  r: `The government revises the limits of the classes from time to time.`,
  sol: `Both are true, but revision of limits does not explain why two measures are used together, so R does not explain A.`,
}));
Q('ar_sick', ar({
  t: 2, d: 3, c: 'understanding', verdict: 'A-true-R-false',
  a: `A small unit that makes continuing losses and cannot meet its dues may be called sick.`,
  r: `Sickness affects only large firms and never small ones.`,
  sol: `A is true, because lasting losses with unpaid dues describe sickness. R is false, because sickness is one of the problems that small units face.`,
}));
Q('ar_nabard', ar({
  t: 2, d: 3, c: 'understanding', verdict: 'A-false-R-true',
  a: `The National Bank for Agriculture and Rural Development was set up to finance only large urban industries.`,
  r: `It works for rural credit and development.`,
  sol: `A is false, because the bank is not meant for large urban industry. R is true, because rural credit and development is its field.`,
}));

// ---- true-false, fill in the blanks, match, ordering
Q('tf_msme', tf({
  t: 1, d: 3, c: 'understanding', ans: false,
  stem: `Since 2020, a service enterprise is classified as micro, small or medium by a different set of criteria from a manufacturing enterprise.`,
  sol: `The same composite criteria of investment and turnover are used for both manufacturing and service enterprises.`,
}));
Q('tf_boot', tf({
  t: 1, d: 3, c: 'understanding', ans: false,
  stem: `Bootstrapping means raising funds by selling a share of the start-up to a venture capital fund.`,
  sol: `Bootstrapping means funding the venture from the founder's own money and early earnings. Selling a share to a venture capital fund is a different source.`,
}));
Q('tf_cottage', tf({
  t: 1, d: 2, c: 'recall', ans: true,
  stem: `Village and cottage industries give non-farm employment in rural areas.`,
  sol: `That is one of their roles: they give people in villages work outside farming.`,
}));
Q('fb_ent', fb({
  t: 1, d: 2, c: 'recall',
  stem: `An entrepreneur sets up a business, bears ___ and brings resources together to pursue an ___.`,
  acc: [['risk'], ['opportunity']],
  sol: `An entrepreneur bears risk and pursues an opportunity.`,
}));
Q('fb_msme', fb({
  t: 1, d: 2, c: 'recall',
  stem: `Since 2020, enterprises are classified by composite criteria of ___ in plant, machinery or equipment and annual ___.`,
  acc: [['investment'], ['turnover']],
  sol: `The two measures are investment and turnover.`,
}));
Q('fb_dic', fb({
  t: 2, d: 2, c: 'recall',
  stem: `District Industries Centres aim to be a single point of ___ for small units at the ___ level.`,
  acc: [['support', 'assistance', 'help'], ['district']],
  sol: `They give single-point support at district level.`,
}));
Q('mt_fund', match({
  t: 1, d: 3, c: 'application',
  stem: `Match each imagined situation with the way of funding it shows.`,
  pairs: [
    [`Pooja runs a bakery from her own savings and the early sales of cakes`, `Bootstrapping`],
    [`Wasim collects small contributions from hundreds of supporters on an online page for his film studio`, `Crowdfunding`],
    [`A retired manager invests her own money in a toy start-up and advises its founders`, `Angel investor`],
    [`A lender gives a small loan to a woman who starts a vegetable stall`, `Microfinance`],
  ],
  sol: `Own savings and early sales are bootstrapping, many small contributions are crowdfunding, an individual who invests her own money and advises is an angel investor, and a small loan to a tiny enterprise is microfinance.`,
}));
Q('mt_support', match({
  t: 2, d: 3, c: 'recall',
  stem: `Match each institution with what it is known for.`,
  pairs: [
    [`National Small Industries Corporation`, `Marketing support, raw materials and machinery on hire purchase`],
    [`District Industries Centre`, `A single point of support for small units at district level`],
    [`Small Industries Development Bank of India`, `Finance for small industry`],
    [`National Bank for Agriculture and Rural Development`, `Rural credit and development`],
  ],
  sol: `Each institution is matched with its main work: the corporation with marketing, inputs and hire purchase, the centre with district-level support, the development bank with finance for small industry, and the rural bank with rural credit.`,
}));
Q('od_inst', ord({
  t: 2, d: 3, c: 'recall',
  stem: `Arrange these institutions in the order in which they were set up, earliest first.`,
  items: [`National Small Industries Corporation`, `District Industries Centres`, `National Bank for Agriculture and Rural Development`, `Small Industries Development Bank of India`],
  sol: `The corporation dates from 1955, the District Industries Centres from 1978, the rural bank from 1982, and the Small Industries Development Bank from 1990.`,
}));
Q('od_steps', ord({
  t: 1, d: 3, c: 'understanding',
  stem: `Arrange these steps of Savita setting up her pickle business in a sensible order.`,
  items: [`Savita notices that town shops lack home-style pickles`, `She plans the product, the cost and the sources of funds`, `She gathers jars, spices and helpers and starts production`, `She sells, earns or loses, and bears the risk of the venture`],
  sol: `An opportunity is noticed first, then the plan and funds are arranged, then production is organised, and finally the venture is run and its risk borne.`,
}));

// ================================================================ short answers
Q('s2_ent_def', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: `Define an entrepreneur and distinguish the term from entrepreneurship.`,
  model: `An entrepreneur is the person who starts a venture, accepts the risk of loss and gathers the needed resources to take up an opportunity. Entrepreneurship is the activity or process itself, covering the starting and running of such a venture.`,
  sol: `Entrepreneur as a person and entrepreneurship as the process.`,
  scheme: [[`Entrepreneur defined`, 1], [`Entrepreneurship as the process`, 1]],
}));
Q('s2_innov', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: `Sargam Apps, an imagined start-up, launches a feature that lets a child learn a raga by singing into the phone, which no rival offers. Name the characteristic of entrepreneurship shown and justify it.`,
  model: `The characteristic is innovation. The feature is a new idea that no rival offers, so the start-up is bringing something new to its users and not merely repeating what exists.`,
  sol: `Characteristic named and justified from the case.`,
  scheme: [[`Innovation named`, 1], [`Justified: a new feature no rival offers`, 1]],
}));
Q('s2_need', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `Explain any two reasons why a country needs entrepreneurship development.`,
  model: `First, new ventures create employment and so reduce unemployment. Second, entrepreneurs bring new products and methods, which is innovation, and this raises choice and quality for consumers.`,
  sol: `Any two of employment, innovation and balanced growth.`,
  scheme: [[`First reason explained`, 1], [`Second reason explained`, 1]],
}));
Q('s2_fund', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: `Distinguish bootstrapping from funding by an angel investor.`,
  model: `In bootstrapping the founder uses her own savings and early earnings and takes no outsider's money. An angel investor is a wealthy individual who puts her own money into an early venture, usually for a share, and often advises the founders.`,
  sol: `Each described with its difference.`,
  scheme: [[`Bootstrapping explained`, 1], [`Angel investor explained`, 1]],
}));
Q('s2_msme', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: `State the principle on which enterprises are classified as micro, small or medium, and say why a rupee limit read in an old book may mislead.`,
  model: `Since 2020 enterprises are classified by composite criteria of investment in plant, machinery or equipment and annual turnover, alike for manufacturing and services. The limits are revised by the government from time to time, so an old figure may no longer apply.`,
  sol: `Principle and the reason limits must be checked.`,
  scheme: [[`Composite criteria of investment and turnover`, 1], [`Limits revised from time to time`, 1]],
}));
Q('s2_rural', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: `How do village and cottage industries help people in rural areas?`,
  model: `They provide non-farm employment, so that villagers can earn a living outside farming, especially between harvests. They also use local skills and materials, which keeps income and work within the village.`,
  sol: `Non-farm employment and local use.`,
  scheme: [[`Non-farm employment`, 1], [`Use of local skills or materials`, 1]],
}));
Q('s2_cap', short({
  t: 2, d: 4, c: 'application', marks: 2, wl: S2,
  stem: `A unit of the Mitti Gram cluster has a capacity of ${fmt(MG.cap)} pots a month and makes ${fmt(MG.made)}. Find the capacity utilisation and name the problem that it shows.`,
  model: `Capacity utilisation is ${fmt(MG.made)} divided by ${fmt(MG.cap)}, which is ${MG.util} per cent, and ${fmt(MG.unused)} pots of capacity lie unused. The problem is under-use of capacity, a common difficulty of small business.`,
  sol: `Percentage computed and problem named.`,
  scheme: [[`Utilisation ${MG.util} per cent`, 1], [`Problem named: under-use of capacity`, 1]],
}));
Q('s2_nsic', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: `State any two kinds of help that the National Small Industries Corporation gives to small units.`,
  model: `The corporation, set up in 1955, helps small units to market their products and to get raw materials. It also supplies machinery on hire purchase, so that a small unit need not pay the full price at once.`,
  sol: `Any two kinds of help.`,
  scheme: [[`First kind of help`, 1], [`Second kind of help`, 1]],
}));
Q('s2_dic', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: `What are District Industries Centres and why are they useful to a new entrepreneur?`,
  model: `District Industries Centres, begun in 1978, are offices that give small units a single point of support at district level. A new entrepreneur can go to one place for guidance and help, instead of going to many offices.`,
  sol: `Meaning and usefulness.`,
  scheme: [[`Single point of support at district level`, 1], [`Why it helps a new entrepreneur`, 1]],
}));
Q('s2_nabard', short({
  t: 2, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: `Name the institution set up in 1982 for rural credit and state its main work.`,
  model: `It is the National Bank for Agriculture and Rural Development. Its main work is to support rural credit and rural development, which includes help to village and cottage industries.`,
  sol: `Name and work.`,
  scheme: [[`Institution named`, 1], [`Main work stated`, 1]],
}));

Q('s3_char', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain any three characteristics of entrepreneurship.`,
  model: `1. Systematic activity: the venture is planned and run by method.\n2. Innovation: the entrepreneur brings something new, such as a product or a method.\n3. Risk taking: returns are uncertain, so the entrepreneur may lose the money put in.\nOther characteristics are lawful and purposeful activity, and organisation of production.`,
  sol: `Any three characteristics explained.`,
  scheme: [[`First characteristic`, 1], [`Second characteristic`, 1], [`Third characteristic`, 1]],
}));
Q('s3_need', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain three needs for entrepreneurship development in a country.`,
  model: `1. Employment: new ventures give jobs to many people.\n2. Innovation: entrepreneurs bring new products, services and methods, which raise choice and quality.\n3. Balanced growth: ventures set up in backward areas spread income and growth more evenly across regions.`,
  sol: `Employment, innovation and balanced growth.`,
  scheme: [[`Employment`, 1], [`Innovation`, 1], [`Balanced growth`, 1]],
}));
Q('s3_role', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain any three roles of small business in the economy.`,
  model: `1. Employment generation: small units need little capital for each job they create.\n2. Use of local resources: they use materials and skills found nearby.\n3. Supplying large industries: they make parts and goods that large firms need.\nOthers are balanced regional development, exports, variety of products and personalised service.`,
  sol: `Any three roles explained.`,
  scheme: [[`First role`, 1], [`Second role`, 1], [`Third role`, 1]],
}));
Q('s3_fund', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `Savita needs money to expand her pickle unit but has used up her savings. Suggest three ways of funding that she could consider, with one line on each.`,
  model: `1. Crowdfunding: she may collect advance payments from many customers through an online page.\n2. Microfinance: she may take a small loan, repaid in instalments, from a lender that serves small enterprises.\n3. Angel investor: a wealthy individual may invest in return for a share and may also guide her.`,
  sol: `Any three ways, each applied to the case.`,
  scheme: [[`First way applied`, 1], [`Second way applied`, 1], [`Third way applied`, 1]],
}));
Q('s3_prob', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `Dhara Spices buys whole spices in a season when prices are high, uses old grinders, and does not know how to find buyers in other towns. Name the three problems and explain each in one line.`,
  model: `1. Raw materials: spices are bought at high and unstable prices.\n2. Technology: old grinders waste material and limit output and quality.\n3. Marketing: the unit has no way of reaching buyers in other towns, so its sales stay small.`,
  sol: `Three problems identified from the case.`,
  scheme: [[`Raw materials`, 1], [`Technology`, 1], [`Marketing`, 1]],
}));
Q('s3_inst', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: `Name three institutions that help small business and state what each does.`,
  model: `1. National Small Industries Corporation, set up in 1955: it helps small units to sell, to obtain raw materials and to buy machines on hire purchase.\n2. District Industries Centres, begun in 1978: one office in the district to approach for help.\n3. Small Industries Development Bank of India, set up in 1990: it provides loans and finance to small industry.`,
  sol: `Three institutions with their work.`,
  scheme: [[`First institution and work`, 1], [`Second institution and work`, 1], [`Third institution and work`, 1]],
}));
Q('s3_msme', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain in three points how micro, small and medium enterprises are classified at present.`,
  model: `1. Since 2020 the classification uses composite criteria: investment in plant, machinery or equipment and annual turnover together.\n2. The same criteria apply to manufacturing and service enterprises.\n3. The limits are revised by the government from time to time, so they must be checked.`,
  sol: `Composite criteria, same for goods and services, limits revised.`,
  scheme: [[`Composite criteria`, 1], [`Same for manufacturing and services`, 1], [`Limits revised from time to time`, 1]],
}));

// ================================================================ long answers
Q('l_char', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Explain the characteristics of entrepreneurship with the help of an imagined example of a pickle maker.`,
  model: `1. Systematic activity: Savita plans the product, cost and sales by method.\n2. Lawful and purposeful activity: she follows food rules and works for a clear aim.\n3. Innovation: her jaggery lime pickle is new to the district.\n4. Organisation of production: she brings together jars, spices, helpers and a place.\n5. Risk taking: she may lose the money she puts in, since returns are uncertain.`,
  sol: `Five characteristics, each with a point from the example.`,
  scheme: [[`Systematic activity`, 1], [`Lawful and purposeful activity`, 1], [`Innovation`, 1], [`Organisation of production`, 1], [`Risk taking`, 1]],
}));
Q('l_role', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Explain any five roles of small business in India.`,
  model: `1. Employment: small units create many jobs, because each job needs little capital, and so they help to reduce unemployment.\n2. Local resources: they use materials and skills found nearby, which keeps income in the area.\n3. Balanced regional development: they can be set up in small towns and backward areas.\n4. Exports: they can earn foreign exchange by selling crafts and goods abroad.\n5. Variety and personalised service: they offer many products and close attention to customers.`,
  sol: `Any five roles explained.`,
  scheme: [[`First role`, 1], [`Second role`, 1], [`Third role`, 1], [`Fourth role`, 1], [`Fifth role`, 1]],
}));
Q('l_fund', long({
  t: 1, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: `Sargam Apps, an imagined start-up with a working app but no income yet, needs money to grow. Explain any three ways of funding start-ups and say which you would advise first, with a reason.`,
  model: `1. Bootstrapping: use the founders' savings, keeping full ownership but limited funds.\n2. Angel investor: a wealthy individual gives money for a share and guides the founders.\n3. Venture capital: a professional fund invests a larger sum for a share, usually once the venture is growing.\nI would advise bootstrapping and then an angel investor first, because the app has no income and a venture capital fund expects growth.`,
  sol: `Three ways explained and a reasoned choice.`,
  scheme: [[`First way explained`, 1], [`Second way explained`, 1], [`Third way explained`, 1], [`A choice stated`, 1], [`A reason tied to the case`, 1]],
}));
Q('l_prob', long({
  t: 2, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `Explain any five problems of small business and suggest a way of easing each.`,
  model: `1. Finance: a unit has little security to offer a bank and funds cost much; credit guarantees can ease this.\n2. Raw materials: supply is irregular and prices change; help with inputs from a national corporation can ease this.\n3. Marketing: a small unit has weak access to buyers; marketing support can ease this.\n4. Technology: old machines raise cost and spoil quality; hire purchase of better machines can ease this.\n5. Managerial skills: planning and costing are weak; training can ease this.`,
  sol: `Five problems with a remedy for each.`,
  scheme: [[`Finance with remedy`, 1], [`Raw materials with remedy`, 1], [`Marketing with remedy`, 1], [`Technology with remedy`, 1], [`Managerial skills with remedy`, 1]],
}));
Q('l_inst', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Describe the work of the National Small Industries Corporation, District Industries Centres, the Small Industries Development Bank of India and the National Bank for Agriculture and Rural Development in helping small business.`,
  model: `1. National Small Industries Corporation, set up in 1955, helps with marketing and raw materials and supplies machinery on hire purchase.\n2. District Industries Centres, begun in 1978, give small units one office to approach in the district.\n3. Small Industries Development Bank of India, set up in 1990, lends to small industry.\n4. National Bank for Agriculture and Rural Development, set up in 1982, supports rural credit and development.\n5. Other support includes credit guarantees, procurement preference and training.`,
  sol: `Four institutions and other support.`,
  scheme: [[`National Small Industries Corporation`, 1], [`District Industries Centres`, 1], [`Small Industries Development Bank of India`, 1], [`National Bank for Agriculture and Rural Development`, 1], [`Other support`, 1]],
}));
Q('l_need', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Explain why entrepreneurship development is needed and describe, in general terms, how Startup India relates to it.`,
  model: `1. Employment: new ventures give jobs to many people, which reduces unemployment.\n2. Innovation: entrepreneurs bring new products and methods, which raises choice and quality.\n3. Balanced growth: ventures in backward areas spread growth across regions.\n4. Startup India, launched in 2016, is an initiative to support new enterprises and encourage entrepreneurship.\n5. As of 2026 its form may change from time to time, so its present features should be checked.`,
  sol: `Three needs and the general role of Startup India with a dated note.`,
  scheme: [[`Employment`, 1], [`Innovation`, 1], [`Balanced growth`, 1], [`Startup India named with year 2016`, 1], [`Dated note on present features`, 1]],
}));

// ================================================================ case-based
Q('cb_savita', caseQ({
  t: [1], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined pickle maker.)*`,
  passage: `**Savita Pickles (imagined), a small pickle maker in the imagined town of Amravan**\n\nSavita left a salaried job to make lime and mango pickles. She wrote a plan with a monthly budget, and she has blended roasted jaggery into her lime pickle, a taste that no shop in the town sells. She needs Rs ${fmt(SAV.need)} in all. She puts in Rs ${fmt(SAV.own)} of her own savings, takes Rs ${fmt(SAV.crowd)} as advance payments from ${fmt(SAV.custs)} customers who each pay Rs ${fmt(SAV.perCust)} for jars to be delivered later, and borrows Rs ${fmt(SAV.mfLoan)} from a lender that serves small enterprises, to be repaid in ${SAV.mfInst} monthly instalments of Rs ${fmt(SAV.mfEach)}.`,
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'application', stem: `Savita's use of her own savings for the venture is an example of`, opts: [`bootstrapping`, `venture capital`, `crowdfunding`, `an angel investment`], sol: `Funding from the founder's own money is bootstrapping. Venture capital comes from a professional fund, crowdfunding from many contributors, and an angel investment from a wealthy individual.` })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: `Quote the line that shows innovation.`, model: `"**she has blended roasted jaggery into her lime pickle, a taste that no shop in the town sells**": a new product is innovation.`, sol: `The line on the new jaggery lime pickle.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 1, d: 4, c: 'application', marks: 2, stem: `**Either** (i): Show that her three sources add up to the amount needed, and find how much more than the loan she repays in all.`, model: `Rs ${fmt(SAV.own)} plus Rs ${fmt(SAV.crowd)} plus Rs ${fmt(SAV.mfLoan)} is Rs ${fmt(SAV.total)}, the amount needed. She repays ${SAV.mfInst} times Rs ${fmt(SAV.mfEach)}, which is Rs ${fmt(SAV.mfPaid)}, so she pays Rs ${fmt(SAV.mfExtra)} more than she borrowed.`, sol: `Sum of the sources and the extra paid.`, scheme: [[`Total Rs ${fmt(SAV.total)}`, 1], [`Repays Rs ${fmt(SAV.mfPaid)}, extra Rs ${fmt(SAV.mfExtra)}`, 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: `**Or** (ii): Name the way of funding behind the Rs ${fmt(SAV.crowd)} and behind the Rs ${fmt(SAV.mfLoan)}.`, model: `The Rs ${fmt(SAV.crowd)} from many customers who pay in advance is crowdfunding. The Rs ${fmt(SAV.mfLoan)} loan from a lender that serves small enterprises, repaid in instalments, is microfinance.`, sol: `Each sum matched with its way of funding.`, scheme: [[`Crowdfunding`, 1], [`Microfinance`, 1]] }),
    ]),
  ],
}));
Q('cb_sargam', caseQ({
  t: [1], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined app start-up.)*`,
  passage: `**Sargam Apps (imagined), an app start-up in the imagined city of Nadapur**\n\nTwo founders built an app that teaches music to children and ran it on their own savings for the first year. A retired executive then put Rs ${fmt(SG.angel)} of her own money into the company for ${SG.angelPct} per cent of its shares and meets the founders every week to guide them. The app now has many users, and a professional fund is ready to invest Rs ${fmt(SG.vc)} for ${SG.vcPct} per cent of the enlarged company, hoping to sell its shares later at a gain.`,
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'application', stem: `The retired executive in the passage is`, opts: [`an angel investor`, `a venture capital fund`, `a crowdfunding supporter`, `a microfinance lender`], sol: `A wealthy individual who invests her own money in an early venture and guides it is an angel investor. The fund is a different investor, and the other two options involve many small sums or small loans.` })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: `Quote the line that shows support beyond money.`, model: `"**meets the founders every week to guide them**": an angel investor often mentors the venture.`, sol: `The line on the weekly guidance.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 1, d: 4, c: 'application', marks: 2, stem: `**Either** (i): Find the value of the company implied by the angel investment, and the share that the founders keep.`, model: `Rs ${fmt(SG.angel)} for ${SG.angelPct} per cent implies a value of Rs ${fmt(SG.post)}. The founders keep ${SG.founders} per cent of the shares.`, sol: `Implied value and the founders' share.`, scheme: [[`Value Rs ${fmt(SG.post)}`, 1], [`Founders keep ${SG.founders} per cent`, 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: `**Or** (ii): If the fund takes ${SG.vcPct} per cent of the enlarged company, find the founders' share afterwards and say what happens to their share.`, model: `The existing holders share the remaining ${100 - SG.vcPct} per cent, so the founders hold ${SG.founders} per cent of ${100 - SG.vcPct}, which is ${SG.foundersAfter} per cent. Their share falls, which shows dilution.`, sol: `Share computed and the effect named.`, scheme: [[`${SG.foundersAfter} per cent`, 1], [`Share falls, dilution`, 1]] }),
    ]),
  ],
}));
Q('cb_lohit', caseQ({
  t: [1, 2], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined small firm.)*`,
  passage: `**Lohit Tools (imagined), a small tool maker in the imagined town of Dhatupur**\n\nLohit Tools makes ${fmt(LT.parts)} gear covers a month at Rs ${LT.rate} each for Aranya Motors, an imagined large vehicle maker. The owner would like a bank loan to buy a modern machine, but he has no security to offer. His old machines spoil ${LT.faultyPct} per cent of the covers, and an importer now sells similar covers at a lower price. A banker tells him that a district office and a national corporation for small industry can help him.`,
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'application', stem: `By making covers for Aranya Motors, Lohit Tools plays the role of`, opts: [`a supplier that supports a large industry`, `a retailer that sells to final users`, `a village industry giving non-farm work`, `a bank that lends to large firms`], sol: `Making parts for a large firm is the role of a supplier to large industry. Lohit Tools does not sell to final users, is not a village industry in the passage, and is not a bank.` })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: `Quote the line that shows the problem of finance.`, model: `"**he has no security to offer**": the unit cannot get a loan, which is the problem of finance.`, sol: `The line on lack of security.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 2, d: 4, c: 'application', marks: 2, stem: `**Either** (i): Find the monthly sales of Lohit Tools and the number of covers that are spoilt each month.`, model: `Monthly sales are ${fmt(LT.parts)} times Rs ${LT.rate}, which is Rs ${fmt(LT.sales)}. Covers spoilt each month are ${LT.faultyPct} per cent of ${fmt(LT.parts)}, which is ${LT.faulty}.`, sol: `Sales and spoilt covers.`, scheme: [[`Sales Rs ${fmt(LT.sales)}`, 1], [`${LT.faulty} covers spoilt`, 1]] }), [
      short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: `**Or** (ii): Name the two other problems of small business that the passage shows, other than finance.`, model: `The spoilt covers from old machines show the problem of technology and quality. The importer's lower price shows global competition.`, sol: `Two problems named.`, scheme: [[`Technology or quality`, 1], [`Global competition`, 1]] }),
    ]),
  ],
}));
Q('cb_mitti', caseQ({
  t: [1, 2], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined village cluster.)*`,
  passage: `**Mitti Gram (imagined), a pottery cluster in the imagined village of Kumharpada**\n\nIn Mitti Gram, ${MG.units} families run small pottery units and each employs ${MG.perUnit} villagers who farm only part of the year. The potters dig clay from nearby ponds. Each unit can make ${fmt(MG.cap)} pots a month but makes only ${fmt(MG.made)}, because traders buy few pots. Of the pots made, ${MG.rejected} are rejected for cracks.`,
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'application', stem: `Mitti Gram is best described as a`, opts: [`village industry giving non-farm employment`, `large factory giving urban jobs`, `cooperative bank`, `venture capital fund`], sol: `A pottery cluster of village families that gives work outside farming is a village industry. It is not a large factory, a bank or an investment fund.` })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: `Quote the line that shows use of local resources.`, model: `"**The potters dig clay from nearby ponds**": local clay is a local resource.`, sol: `The line on clay from nearby ponds.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 2, d: 4, c: 'application', marks: 2, stem: `**Either** (i): Find the number of villagers employed in the cluster and the capacity utilisation of one unit.`, model: `The cluster employs ${MG.units} times ${MG.perUnit}, which is ${MG.jobs} villagers. A unit makes ${fmt(MG.made)} of ${fmt(MG.cap)} pots, a capacity utilisation of ${MG.util} per cent.`, sol: `Jobs and utilisation.`, scheme: [[`${MG.jobs} villagers`, 1], [`${MG.util} per cent utilisation`, 1]] }), [
      short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: `**Or** (ii): Find the percentage of pots rejected and name the problem it shows.`, model: `Rejected pots are ${MG.rejected} of ${fmt(MG.made)}, which is ${MG.rejPct} per cent. This shows the problem of quality.`, sol: `Percentage and problem.`, scheme: [[`${MG.rejPct} per cent`, 1], [`Quality named`, 1]] }),
    ]),
  ],
}));
Q('cb_dhara', caseQ({
  t: [2], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined spice unit.)*`,
  passage: `**Dhara Spices (imagined), a small spice grinder in the imagined town of Masalpur**\n\nDhara Spices can grind ${fmt(DH.cap)} kg of spices a month but grinds ${fmt(DH.made)} kg, because it cannot find enough buyers outside the town. It must also buy whole spices at high prices in the season. The owner wants a long-term loan to modernise the plant, and she wants help to find buyers and to buy raw materials at fair terms.`,
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', stem: `Grinding ${fmt(DH.made)} kg against a capacity of ${fmt(DH.cap)} kg shows the problem of`, opts: [`under-use of capacity`, `global competition`, `sickness`, `lack of finance`], sol: `Making less than the capacity allows is under-use of capacity. The passage does not describe foreign rivals, lasting losses or a lack of funds in this line.` })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: `Quote the line that shows the problem of raw materials.`, model: `"**It must also buy whole spices at high prices in the season**": costly inputs are the problem of raw materials.`, sol: `The line on high prices.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 2, d: 4, c: 'application', marks: 2, stem: `**Either** (i): Find the capacity utilisation and the unused capacity.`, model: `Capacity utilisation is ${fmt(DH.made)} divided by ${fmt(DH.cap)}, which is ${DH.util} per cent. The unused capacity is ${fmt(DH.unused)} kg a month.`, sol: `Utilisation and unused capacity.`, scheme: [[`${DH.util} per cent`, 1], [`${fmt(DH.unused)} kg unused`, 1]] }), [
      short({ t: 2, d: 4, c: 'application', marks: 2, stem: `**Or** (ii): Name the institution that could give her finance and the one that could help with marketing and raw materials.`, model: `The Small Industries Development Bank of India gives finance for small industry. The National Small Industries Corporation helps small units with marketing and raw materials.`, sol: `Two institutions matched with their work.`, scheme: [[`Small Industries Development Bank of India for finance`, 1], [`National Small Industries Corporation for marketing and raw materials`, 1]] }),
    ]),
  ],
}));
