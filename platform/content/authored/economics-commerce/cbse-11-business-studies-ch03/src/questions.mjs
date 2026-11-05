// CBSE 11 Business Studies, ch03 Public, Private and Global Enterprises: question bank. Every enterprise, ministry,
// person and situation is imagined and written by SOYL; no NCERT example, exercise or board/sample-paper item is reused (D-036).
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child } from '../../cbse-11-business-studies-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
export const fmt = (n) => n.toLocaleString('en-IN');

// ---- computed figures used in stems, solutions and slides -------------------------------------------------
// Disinvestment: shares of an imagined government company, in lakh shares.
export const DESH = { total: 1000, sale1: 350, sale2: 520 };
DESH.held1 = DESH.total - DESH.sale1; // 650
DESH.held2 = DESH.total - DESH.sale2; // 480
DESH.pct1 = (100 * DESH.held1) / DESH.total; // 65
DESH.pct2 = (100 * DESH.held2) / DESH.total; // 48
export const GOVT_MIN = 51; // per cent of paid-up capital, as of 2024
// Equity joint venture: capital and profit shared in the ratio of equity.
export const JV = { capital: 50, split: [60, 40], profit: 10 };
JV.parts = JV.split.map((p) => (JV.capital * p) / 100); // 30, 20
JV.profitParts = JV.split.map((p) => (JV.profit * p) / 100); // 6, 4
// Public private partnership toll road, in Rs crore.
export const PPP = { cost: 800, govtPct: 25, years: 25, net: 40 };
PPP.govt = (PPP.cost * PPP.govtPct) / 100; // 200
PPP.private = PPP.cost - PPP.govt; // 600
PPP.total = PPP.net * PPP.years; // 1000
PPP.surplus = PPP.total - PPP.private; // 400
if (DESH.held1 !== 650 || DESH.pct1 !== 65 || DESH.held2 !== 480 || DESH.pct2 !== 48 || JV.parts.join() !== '30,20' || JV.profitParts.join() !== '6,4' || PPP.govt !== 200 || PPP.private !== 600 || PPP.total !== 1000 || PPP.surplus !== 400) throw new Error('figure check failed');

// ================================================================ t01 Private and public sector enterprises
Q('mc_sector_identify', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Sarvodaya Seeds Ltd, an imagined enterprise, is wholly owned by the government of an imagined state, while Anand Garments, an imagined firm, is owned by three brothers. Which pair correctly places them?`,
  opts: [
    `Sarvodaya Seeds in the public sector and Anand Garments in the private sector`,
    `Both in the public sector, because both employ workers`,
    `Sarvodaya Seeds in the private sector and Anand Garments in the public sector`,
    `Both in the private sector, because both sell goods`,
  ],
  sol: `The sector depends on ownership. Government ownership makes an enterprise public; ownership by individuals or groups makes it private. Employing workers or selling goods says nothing about the owner.`,
}));
Q('mc_dept_identify', mcq({
  t: 1, d: 2, c: 'application',
  stem: `The Hill Telegraph Service, an imagined undertaking, is a branch of the imagined Ministry of Communications. Its money comes from the treasury, its revenue is paid into the treasury and its staff are government servants. It is a`,
  opts: [`departmental undertaking`, `statutory corporation`, `government company`, `joint venture`],
  sol: `Being a branch of a ministry with treasury finance and government servants is the pattern of a departmental undertaking. A statutory corporation has its own Act and legal identity, a government company is registered under the Companies Act, and a joint venture is a tie-up of firms.`,
}));
Q('mc_dept_audit', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Which controls apply to a departmental undertaking in the same way as to any other department of the government?`,
  opts: [
    `Budget, accounting and audit controls`,
    `The rules of a board of directors elected by shareholders`,
    `Freedom to set its own pay scales and recruitment rules`,
    `The Companies Act provisions on share capital`,
  ],
  sol: `A departmental undertaking is part of a ministry, so the usual government budget, accounting and audit rules apply. Elected boards, own pay rules and share capital belong to corporations and companies.`,
}));
Q('mc_dept_limit', mcq({
  t: 1, d: 3, c: 'application',
  stem: `At the imagined Rampur Ordnance Depot, run as a department of a ministry, an urgent purchase of spare parts waited six weeks for file approvals at three levels. Which limitation of a departmental undertaking does this show?`,
  opts: [`Red tape and lack of flexibility`, `Excessive freedom from audit`, `Dependence on share capital`, `Absence of any accountability`],
  sol: `Layers of approval delaying a routine decision are red tape, a standard limitation of this form. Departments are subject to audit, do not raise share capital, and are accountable to the ministry.`,
}));
Q('mc_stat_identify', mcq({
  t: 1, d: 2, c: 'application',
  stem: `The Jal Nidhi Corporation, an imagined body, was created by an Act of the legislature of an imagined state. It has its own powers and staff rules, and earns money from water charges. It is a`,
  opts: [`statutory corporation`, `departmental undertaking`, `government company`, `private company`],
  sol: `Creation by a special Act with its own powers and its own revenue marks a statutory corporation. A department has no Act of its own, a government company is registered under the Companies Act, and the corporation is owned by the state, not private.`,
}));
Q('mc_stat_staff', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `The employees of a statutory corporation are`,
  opts: [
    `not government servants, and are governed by the corporation's own service rules`,
    `government servants with the same rules as a ministry`,
    `elected by the public at large`,
    `shareholders of the corporation`,
  ],
  sol: `A statutory corporation frames its own staff rules under its Act, so its employees are not government servants. They are neither elected by the public nor shareholders.`,
}));
Q('mc_stat_finance', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Chandan Port Authority, an imagined statutory corporation, meets most of its expenses from port charges and spends them without seeking approval under the budget procedures that govern government departments. Which feature is shown?`,
  opts: [`Financial independence`, `Direct accountability to the treasury`, `Perpetual succession by shareholders`, `Unlimited liability of members`],
  sol: `Using its own earnings with freedom from departmental budget procedures is financial independence. Treasury accountability is a feature of departments, and shareholders and members are not part of a corporation created by an Act.`,
}));
Q('mc_stat_merit', mcq({
  t: 1, d: 3, c: 'application',
  stem: `The imagined Kisan Grain Board, a statutory corporation, bought a lorry load of grain at once when prices dipped, without waiting for any ministry file. This shows which merit of its form?`,
  opts: [`Operational flexibility and autonomy`, `Strict control by the treasury`, `Government servants as staff`, `Dependence on the annual budget`],
  sol: `Acting quickly on its own authority is the autonomy and flexibility that a corporation enjoys. Treasury control, government-servant staff and budget dependence describe departments.`,
}));
Q('mc_stat_legal', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `A statutory corporation comes into existence through`,
  opts: [`a special Act of Parliament or of a state legislature`, `registration with the Registrar of Companies`, `a partnership deed among members`, `a resolution of a ministry's department`],
  sol: `It is created by its own Act. Registration under the Companies Act is the route for a government company; a deed is for partnerships; a mere departmental order creates a department, not a corporation.`,
}));
Q('mc_govco_65', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Desh Steel Ltd, an imagined government company, has ${fmt(DESH.total)} lakh shares, all held by the government. The government sells ${fmt(DESH.sale1)} lakh shares to the public. As of 2024, what is the position?`,
  opts: [
    `The government holds ${DESH.pct1} per cent, so it is still a government company`,
    `The government holds ${DESH.pct1} per cent, so it has become a private company`,
    `The government holds ${DESH.pct1} per cent, so it has become a statutory corporation`,
    `The government holds ${DESH.sale1 / 10} per cent, so it is still a government company`,
  ],
  sol: `Shares held after the sale are ${fmt(DESH.total)} minus ${fmt(DESH.sale1)} = ${fmt(DESH.held1)} lakh, which is ${DESH.pct1} per cent. That is above the ${GOVT_MIN} per cent test as of 2024. A company does not turn into a corporation by selling shares, and the last option states the wrong share held.`,
}));
Q('mc_govco_48', mcq({
  t: 1, d: 4, c: 'application',
  stem: `Pavan Power Ltd, an imagined company, was wholly owned by a state government. After the state sold ${DESH.sale2} lakh of its ${fmt(DESH.total)} lakh shares, it holds ${DESH.held2} lakh. As of 2024, the company`,
  opts: [
    `is no longer a government company, since the holding is below ${GOVT_MIN} per cent`,
    `remains a government company, since the state is still the largest holder`,
    `becomes a departmental undertaking`,
    `must be closed under the Companies Act`,
  ],
  sol: `${DESH.held2} out of ${fmt(DESH.total)} is ${DESH.pct2} per cent, below the ${GOVT_MIN} per cent paid-up capital that the Companies Act requires of a government company as of 2024. The test is the holding, not being the largest holder. Nothing in the change creates a department or forces closure.`,
}));
Q('mc_govco_law', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Which statement about a government company is correct?`,
  opts: [
    `It is registered under the Companies Act and can sue and be sued in its own name`,
    `It is created by a special Act and has no shareholders`,
    `It is a department of a ministry with employees who are government servants`,
    `It must be wholly owned by the government and can never have a private shareholder`,
  ],
  sol: `A government company is an ordinary registered company in which the government holds the required stake, so it can sue and be sued. It need not be wholly owned, so private shareholders are possible; the Act-based and departmental descriptions fit other forms.`,
}));
Q('mc_govco_feature', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: `Which of the following is NOT a feature of a government company?`,
  opts: [
    `It is created by a special law passed for it alone`,
    `Its affairs are managed by a board of directors`,
    `Its employees are governed by the rules of the company`,
    `It may be partly owned by private shareholders`,
  ],
  sol: `Creation by its own special law is the mark of a statutory corporation. A government company is formed by registration, is run by a board, has employees under company rules and may have private shareholders.`,
}));
Q('mc_mixed', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `An economy in which public sector and private sector enterprises exist side by side is called a`,
  opts: [`mixed economy`, `closed economy`, `subsistence economy`, `barter economy`],
  sol: `Coexistence of public and private enterprises is the meaning of a mixed economy. A closed economy has no foreign trade, a subsistence economy produces mostly for the household, and a barter economy trades goods without money.`,
}));
Q('mc_local_body', mcq({
  t: 1, d: 3, c: 'application',
  stem: `The imagined Nagarpur Municipal Bus Service is owned and run by the city's local government. In which sector does it fall?`,
  opts: [`Public sector, because a local body is a level of government`, `Private sector, because it serves only one city`, `Global sector, because it carries many passengers`, `Private sector, because it charges fares`],
  sol: `Public enterprises may be owned by the Union, a state or a local authority. Charging fares or serving one city does not change the owner, and carrying many passengers has nothing to do with operating across countries.`,
}));
Q('mc_disinvest', mcq({
  t: 1, d: 2, c: 'application',
  stem: `The government of an imagined state offers a part of its shareholding in Kaveri Cement Ltd, an imagined government company, to investors. This step is called`,
  opts: [`disinvestment`, `nationalisation`, `incorporation`, `liquidation`],
  sol: `Selling part of the government's shares in an enterprise is disinvestment. Nationalisation means taking a private business into government ownership, incorporation is registration, and liquidation means winding up.`,
}));
Q('mc_mou', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Every year the imagined Ministry of Mines and the managers of Shilpa Ore Ltd, an imagined public enterprise, sign a document fixing targets for output and profit, and the performance is rated against it at the year end. This is the system of`,
  opts: [`memorandum of understanding`, `disinvestment`, `reservation of industries`, `a sick-unit revival package`],
  sol: `An agreed set of performance targets between the government and a public enterprise, with a rating, is the memorandum of understanding system. The other three options are different reform measures with different aims.`,
}));
Q('mc_reserved', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: `After the industrial policy of 1991, the number of industries reserved only for the public sector, as of 2024, is`,
  opts: [`very small, mainly atomic energy and railway operations`, `larger than before`, `unchanged at the level of 1956`, `zero, since all industries were handed to private firms`],
  sol: `The reserved list was cut sharply, leaving a very small number of areas as of 2024. It was not enlarged or left unchanged, and not every area was opened up.`,
}));
Q('mc_sick', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: `The policy for a loss-making public enterprise that is unlikely to recover on its own looks at`,
  opts: [`reviving it with a plan or, where that is not possible, closing it in an orderly way`, `letting it run on indefinitely with no review`, `converting it at once into a sole proprietorship`, `selling it only to its own employees`],
  sol: `The aim is to revive units that can be saved and wind up those that cannot. Running on without review, a sudden change to a sole proprietorship and a single permitted buyer are not part of the policy.`,
}));
Q('mc_sector_forms', mcq({
  t: 1, d: 2, c: 'recall',
  stem: `Which list names the three main forms of public sector enterprises?`,
  opts: [
    `Departmental undertaking, statutory corporation, government company`,
    `Sole proprietorship, partnership, company`,
    `Cooperative society, joint venture, partnership`,
    `Statutory corporation, multinational corporation, joint venture`,
  ],
  sol: `The three forms of public enterprise are the departmental undertaking, the statutory corporation and the government company. The other lists mix private forms or global forms.`,
}));

// ================================================================ t02 Global enterprises, joint ventures, PPP
Q('mc_mnc_identify', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Veltrix Beverages, an imagined enterprise with its head office in the imagined country of Altaria, runs bottling plants and sales offices in fourteen countries under one brand and one central plan. It is a`,
  opts: [`multinational corporation`, `departmental undertaking`, `cooperative society`, `sole proprietorship`],
  sol: `A large firm with operations in many countries and central control is a multinational corporation, also called a global enterprise. The other options are small or domestic forms.`,
}));
Q('mc_mnc_central', mcq({
  t: 2, d: 3, c: 'application',
  stem: `The plants of Norvale Cables, an imagined enterprise, in nine countries follow the same policy on quality, finance and product range, all decided at the head office. Which feature of a global enterprise is this?`,
  opts: [`Centralised control`, `Foreign collaboration`, `Product innovation`, `Expansion of market territory`],
  sol: `Decisions on policy flowing from the head office to all branches show centralised control. Collaboration is a tie-up with other firms, innovation concerns new products, and market expansion means reaching more customers.`,
}));
Q('mc_mnc_tech', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Karelia Motors, an imagined global enterprise, set up a research centre and brought automated assembly lines into its plant in an imagined host country. Which feature does this reflect?`,
  opts: [`Advanced technology`, `Centralised control`, `A single product and a single market`, `Government ownership`],
  sol: `Research centres and automated lines show the use of advanced technology that such enterprises are able to afford. A single product in one market is the opposite of a global approach, and ownership is not the point.`,
}));
Q('mc_mnc_market', mcq({
  t: 2, d: 3, c: 'application',
  stem: `After saturating its home market, Orvane Foods, an imagined enterprise, opened sales in nine new countries to find more customers. This reflects which feature of a global enterprise?`,
  opts: [`Expansion of market territory`, `Huge capital resources`, `Centralised control`, `Foreign collaboration`],
  sol: `Reaching customers in new countries is the expansion of market territory. Huge capital describes the funds it commands, and the other two features concern its structure and its partners.`,
}));
Q('mc_mnc_capital', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `Why can a global enterprise usually set up large plants in several countries at the same time?`,
  opts: [`It commands huge capital resources`, `It is exempt from every law`, `It always receives free land from governments`, `It has only a few employees`],
  sol: `Large global enterprises raise funds from many sources and so have huge capital. The other statements are untrue: they follow the laws of host countries, land is not always free, and they employ many people.`,
}));
Q('mc_jv_identify', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Sundar Castings, an imagined Indian firm, and Nordvik Machines, an imagined firm of an imagined foreign country, agree to run one factory together, share its profit and control it jointly. This arrangement is a`,
  opts: [`joint venture`, `departmental undertaking`, `statutory corporation`, `sole proprietorship`],
  sol: `Two firms joining to carry on one business activity, sharing ownership, control and profit, is a joint venture. The other options are forms of public or one-person organisation.`,
}));
Q('mc_jv_contract', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Two imagined firms agree in writing that one will make auto parts and the other will market them under a shared brand for five years, without forming a new company. This is a`,
  opts: [`contractual joint venture`, `equity-based joint venture`, `government company`, `public private partnership`],
  sol: `They cooperate through an agreement alone, with no new jointly owned entity, which is a contractual joint venture. An equity-based venture needs a jointly owned company, and the others involve government ownership or partnership.`,
}));
Q('mc_jv_equity', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Two imagined firms set up a new company in which they hold shares in the ratio ${JV.split[0]} to ${JV.split[1]}, to run a joint plant. This is an`,
  opts: [`equity-based joint venture`, `contractual joint venture`, `departmental undertaking`, `cooperative society`],
  sol: `A jointly owned company with shares held by the partners is an equity-based joint venture. A contractual venture rests on an agreement alone.`,
}));
Q('mc_jv_benefit', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Mahua Tea Estates, an imagined firm, joins an imagined foreign importer, which already has a chain of stores and a loyal customer base in its country. Which benefit of a joint venture is the biggest for Mahua?`,
  opts: [`Access to new markets and distribution networks`, `Unlimited liability`, `Freedom from all competition`, `Complete control by Mahua alone`],
  sol: `Using the partner's stores and customers gives access to markets and distribution. A joint venture does not give unlimited liability, remove competition, or hand sole control to one firm.`,
}));
Q('mc_jv_cost', mcq({
  t: 2, d: 3, c: 'application',
  stem: `An imagined Indian toy maker joins a foreign firm that already has large, efficient factories and shares them, so each toy costs less to make. Which benefit of a joint venture does this show?`,
  opts: [`Low cost of production`, `Access to technology only`, `An established brand name`, `Product innovation`],
  sol: `Sharing efficient plants and large-scale buying lowers the cost per unit. The question is about cost, not technology, brand or new products, though a venture can bring those as well.`,
}));
Q('mc_ppp_identify', mcq({
  t: 2, d: 2, c: 'application',
  stem: `The imagined state of Madhuvan gives land for a new hospital and its private partner, Arogya Builders, an imagined firm, builds the hospital with its own funds and runs it for twenty years under an agreement. This is a`,
  opts: [`public private partnership`, `departmental undertaking`, `contractual joint venture between two private firms`, `cooperative society`],
  sol: `Government and a private firm cooperating to provide a public service, each with its own role, is a public private partnership. A departmental undertaking is run by a ministry alone, and a joint venture between two private firms has no government partner.`,
}));
Q('mc_ppp_role', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: `In a typical public private partnership for a toll road, the private partner usually`,
  opts: [`brings capital, technology and management skill`, `provides only the land`, `gives the approvals and permits`, `bears no risk at all`],
  sol: `The private partner contributes funds, technology and management. The government usually supplies land, approvals or funding, and risk is shared, so the private partner does bear some.`,
}));
Q('mc_ppp_govt', mcq({
  t: 2, d: 3, c: 'application',
  stem: `For an imagined water-supply scheme in Jalpur, the town authority acquires land, grants permits and gives a part of the funding, while a private firm builds and runs the plant. Which of these is the government's contribution?`,
  opts: [`Land, approvals and a part of the funding`, `Technology and management only`, `All the profit`, `None, since the private firm does everything`],
  sol: `The government side typically offers land, approvals and sometimes funding. Technology and management come from the private partner; profit and risk are shared, not taken entirely by one side.`,
}));
Q('mc_global_vs_domestic', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: `Which feature distinguishes a global enterprise from a large enterprise that sells only inside India?`,
  opts: [
    `It operates in many countries under central control from a head office`,
    `It has a large number of employees`,
    `It earns a profit`,
    `It is registered under the Companies Act`,
  ],
  sol: `Operating across countries under one head office is what makes an enterprise global. A large domestic firm can also have many employees, earn profit and be registered under the Companies Act.`,
}));

// ---- assertion-reason
Q('ar_stat_indep', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: `A statutory corporation can take decisions on its day-to-day working without waiting for approval from a ministry.`,
  r: `A statutory corporation is a separate legal entity with its own Act, powers and financial independence.`,
  sol: `Both are true. Because the corporation has its own legal identity, powers and finances, it can act on its own, so R explains A.`,
}));
Q('ar_dept_servants', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: `The employees of a departmental undertaking are government servants.`,
  r: `A departmental undertaking is a part of a ministry of the government.`,
  sol: `Both are true. Since the undertaking is a part of the ministry, its staff are government servants, so R explains A.`,
}));
Q('ar_disinvest', ar({
  t: 1, d: 4, c: 'analysis', verdict: 'both-true-not-explains',
  a: `Disinvestment is one of the measures in the changed role of the public sector after 1991.`,
  r: `A statutory corporation is created by a special Act.`,
  sol: `Both are true, but the way a statutory corporation is created has no bearing on disinvestment, so R does not explain A.`,
}));
Q('ar_mnc_central', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'both-true-explains',
  a: `A global enterprise can follow one policy in all its branches in different countries.`,
  r: `A global enterprise has centralised control exercised from its head office.`,
  sol: `Both are true. Control from one head office is what makes a single policy possible across countries, so R explains A.`,
}));
Q('ar_ppp_risk', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'A-true-R-false',
  a: `In a public private partnership, risk and reward are shared between the government and the private partner.`,
  r: `In such a partnership, the private partner alone bears every risk, and the government bears none.`,
  sol: `A is true. R is false, because risk is divided by agreement and the government has its own role and exposure.`,
}));
Q('ar_jv_equity', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'A-false-R-true',
  a: `A contractual joint venture always creates a new company owned by the partners.`,
  r: `An equity-based joint venture is formed by setting up a jointly owned entity in which the partners hold shares.`,
  sol: `A is false: a contractual venture rests on an agreement alone and need not create a company. R is true and describes the equity-based type.`,
}));

// ---- true-false, fill in the blanks, match, ordering
Q('tf_stat_budget', tf({
  t: 1, d: 3, c: 'understanding', ans: false,
  stem: `A statutory corporation is subject to the same budget, accounting and audit procedures as a government department.`,
  sol: `A statutory corporation is not subject to those departmental procedures; it is financially independent and has its own arrangements.`,
}));
Q('tf_mixed', tf({
  t: 1, d: 1, c: 'recall', ans: true,
  stem: `India has a mixed economy in which public sector and private sector enterprises work together.`,
  sol: `Both kinds of enterprise coexist in India, which is what is meant by a mixed economy.`,
}));
Q('tf_jv_profit', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: `In a joint venture the partners share ownership, control and profits as agreed.`,
  sol: `Sharing of ownership, control and profits is the essence of a joint venture.`,
}));
Q('fb_govco_share', fb({
  t: 1, d: 2, c: 'recall',
  stem: `A government company is one in which the government holds at least ___ per cent of the paid-up share capital, as of 2024, and it is registered under the ___ Act.`,
  acc: [['51', 'fifty one', 'fifty-one'], ['Companies', 'Companies Act', 'company']],
  sol: `At least 51 per cent, as of 2024, and it is registered under the Companies Act.`,
}));
Q('fb_jv_types', fb({
  t: 2, d: 2, c: 'recall',
  stem: `The two types of joint venture are the ___ joint venture and the ___ joint venture.`,
  acc: [['contractual'], ['equity-based', 'equity based', 'equity']],
  sol: `The contractual joint venture rests on an agreement; the equity-based venture creates a jointly owned entity.`,
}));
Q('fb_mou', fb({
  t: 1, d: 2, c: 'recall',
  stem: `The system in which the government and a public enterprise agree on performance targets for the year is called the ___ of understanding.`,
  acc: [['memorandum']],
  sol: `It is the memorandum of understanding system, abbreviated MoU.`,
}));
Q('mt_forms', match({
  t: 1, d: 3, c: 'application',
  stem: `Match each imagined enterprise with the form of public enterprise it represents.`,
  pairs: [
    [`The Directorate of Canal Maintenance, a branch of an imagined state ministry funded through the budget`, `Departmental undertaking`],
    [`The Textile Development Authority, created by a separate Act of an imagined state legislature`, `Statutory corporation`],
    [`Sunrise Fertilisers Ltd, registered under the Companies Act, with the government holding sixty per cent`, `Government company`],
    [`Hamara Foods Ltd, registered under the Companies Act and owned entirely by three private investors`, `Private sector company`],
  ],
  sol: `Branch of a ministry on budget money means a department; a separate Act means a statutory corporation; registered company with the required government stake means a government company; wholly private ownership is the private sector.`,
}));
Q('mt_global', match({
  t: 2, d: 3, c: 'application',
  stem: `Match each imagined situation with the feature of a global enterprise it shows.`,
  pairs: [
    [`A firm has plants in ten countries and a very large pool of funds`, `Huge capital resources`],
    [`The head office decides pricing for all its branches`, `Centralised control`],
    [`A firm brings out a new model every year to attract new buyers`, `Product innovation`],
    [`A firm opens outlets in countries where it was absent`, `Expansion of market territory`],
  ],
  sol: `Funds, head-office decision making, new models and entry to new countries correspond to capital, central control, innovation and market expansion.`,
}));
Q('od_ppp_steps', ord({
  t: 2, d: 3, c: 'understanding',
  stem: `Arrange these steps of an imagined public private partnership for a toll road in a sensible order.`,
  items: [`The government identifies the need and offers the project`, `A private partner is chosen and signs an agreement`, `The partner builds the road`, `The partner runs the road and collects tolls for the agreed period`],
  sol: `The need and offer come first, then the choice of partner and agreement, then building, then operation for the agreed period.`,
}));
Q('od_disinvest', ord({
  t: 1, d: 3, c: 'understanding',
  stem: `Arrange these events in an imagined disinvestment of a government company in a sensible order.`,
  items: [`The government holds all the shares`, `The government decides to sell a part of its shares`, `Shares are offered to investors and sold`, `The government's holding is checked against the stake required by law`],
  sol: `Full ownership comes first, then the decision, the sale, and finally the check of the remaining stake.`,
}));

// ================================================================ short answers
Q('s2_stat_features', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `State two features of a statutory corporation.`,
  model: `A statutory corporation is created by a special Act of Parliament or a state legislature, which gives it its own powers. It is a separate legal entity with financial independence, and its employees are not government servants.`,
  sol: `Any two features.`,
  scheme: [[`First feature`, 1], [`Second feature`, 1]],
}));
Q('s2_mnc_def', short({
  t: 2, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: `What is a global enterprise? Give one feature.`,
  model: `A global enterprise, or multinational corporation, is a large business with operations in many countries, usually controlled from a head office in one country. One feature is huge capital resources, which let it set up plants across the world.`,
  sol: `Definition and one feature.`,
  scheme: [[`Large business operating in many countries`, 1], [`One feature`, 1]],
}));
Q('s2_disinvest', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `Define disinvestment and say how it changes the position of a government company.`,
  model: `Disinvestment is the sale of part of the government's shares in a public enterprise. The enterprise gains private shareholders, and if the holding falls below 51 per cent, as of 2024, it stops being a government company.`,
  sol: `Meaning and effect.`,
  scheme: [[`Sale of part of the government's shares`, 1], [`Effect on the stake and status`, 1]],
}));
Q('s2_mou', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: `What is the memorandum of understanding system for public enterprises? State one purpose.`,
  model: `Under this system a public enterprise and the government agree each year on targets for its performance, such as output and profit. Its purpose is to give managers more freedom while holding them accountable for results.`,
  sol: `Agreed targets and a purpose.`,
  scheme: [[`Agreed performance targets`, 1], [`Purpose: autonomy with accountability`, 1]],
}));
Q('s2_jv_def', short({
  t: 2, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: `Define a joint venture and name its two types.`,
  model: `A joint venture is an arrangement in which two or more firms join to carry on a business activity and share its ownership, control and profits. Its two types are the contractual joint venture and the equity-based joint venture.`,
  sol: `Definition and two types.`,
  scheme: [[`Definition`, 1], [`Two types named`, 1]],
}));
Q('s2_ppp_def', short({
  t: 2, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: `What is a public private partnership? Give one example of a use.`,
  model: `A public private partnership is an arrangement between the government and a private enterprise to build and run public infrastructure or services, sharing risk and reward. For example, a private firm may build and operate a toll road on land given by the government.`,
  sol: `Meaning and an example.`,
  scheme: [[`Government and private enterprise sharing a public project`, 1], [`One example`, 1]],
}));
Q('s2_dept_def', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: `What is a departmental undertaking? Name one feature.`,
  model: `A departmental undertaking is a public enterprise run as a department of a ministry of the government. One feature is that its funds come from the treasury and its revenues are paid back into the treasury.`,
  sol: `Meaning and one feature.`,
  scheme: [[`Run as a department of a ministry`, 1], [`One feature`, 1]],
}));
Q('s2_dept_limit', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: `In the imagined Bhimpur Survey Office, a department of a ministry, a new machine could not be bought for a year because of approvals. Name the limitation and explain it.`,
  model: `This is red tape, a limitation of a departmental undertaking. Because it is part of a ministry and bound by budget and approval rules, decisions pass through many levels, so it lacks the flexibility to act quickly on needs like a new machine.`,
  sol: `Red tape with explanation.`,
  scheme: [[`Red tape or lack of flexibility named`, 1], [`Explained with the case`, 1]],
}));
Q('s2_reserved', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: `As of 2024, how did the position of industries reserved for the public sector change after the industrial policy of 1991?`,
  model: `After 1991, the list of industries reserved for the public sector was cut sharply. As of 2024, a very small number remain reserved, mainly atomic energy and railway operations, and the rest are open to private firms.`,
  sol: `Reduction, with the remaining areas.`,
  scheme: [[`List sharply reduced`, 1], [`Few remain, as of 2024`, 1]],
}));
Q('s2_sick', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: `State, in general terms, what the policy for loss-making public enterprises aims to do.`,
  model: `The policy aims to review each loss-making enterprise. A unit that can be made viable is revived with a plan for finance and management, while one that cannot recover is closed in an orderly way, protecting the interest of workers and creditors.`,
  sol: `Revive or close.`,
  scheme: [[`Revival of viable units`, 1], [`Orderly closure of the rest`, 1]],
}));

Q('s3_stat_merits', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain any three merits of a statutory corporation.`,
  model: `1. Operational flexibility: it takes routine decisions on its own, without waiting for a ministry.\n2. Financial independence: it uses its own income, so it is free of departmental budget procedures.\n3. Professional management: it can frame its own service rules and appoint skilled managers. Being a separate legal entity is another merit.`,
  sol: `Any three merits.`,
  scheme: [[`First merit`, 1], [`Second merit`, 1], [`Third merit`, 1]],
}));
Q('s3_govco', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain any three features of a government company, as of 2024.`,
  model: `1. Registered under the Companies Act, it can sue and be sued in its own name.\n2. At least 51 per cent of its paid-up share capital is held by the Union and the state governments, as of 2024, so it may be wholly or partly government-owned.\n3. It is managed by a board of directors, and its employees follow the company's rules.`,
  sol: `Any three features.`,
  scheme: [[`First feature`, 1], [`Second feature`, 1], [`Third feature`, 1]],
}));
Q('s3_dept_limits', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: `The imagined Pahar Printing Press is a departmental undertaking. Explain three limitations of this form that it may face.`,
  model: `1. Lack of flexibility: every decision needs the ministry's approval.\n2. Red tape: files pass through many levels, delaying purchases and orders.\n3. Low incentive: staff are government servants with fixed rules, so there is little reward for initiative or cost saving. Political interference can also arise.`,
  sol: `Three limitations applied to the press.`,
  scheme: [[`Lack of flexibility`, 1], [`Red tape`, 1], [`Low incentive or interference`, 1]],
}));
Q('s3_mnc_features', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain any three features of a global enterprise.`,
  model: `1. Huge capital resources: it raises funds from many countries.\n2. Advanced technology: it can afford research and modern production methods.\n3. Centralised control: the head office controls the branches and subsidiaries abroad. It also expands market territory and uses strong marketing strategies.`,
  sol: `Any three features.`,
  scheme: [[`First feature`, 1], [`Second feature`, 1], [`Third feature`, 1]],
}));
Q('s3_jv_benefits', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `Nordvik Machines, an imagined foreign firm, forms a joint venture with an imagined Indian partner. State three benefits that the venture can bring to the two firms.`,
  model: `1. More resources and capacity, since the firms pool funds and skills.\n2. Access to new markets and distribution networks, as each uses the other's reach.\n3. Access to technology and innovation, so the venture can make better products at a lower cost. An established brand name may also help.`,
  sol: `Any three benefits tied to the case.`,
  scheme: [[`More resources`, 1], [`Markets and distribution`, 1], [`Technology or low cost`, 1]],
}));
Q('s3_ppp_features', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain any three features of a public private partnership.`,
  model: `1. Sharing of risk and reward between the government and the private partner.\n2. Government support: the government may provide land, approvals or funding.\n3. Private contribution: the private partner brings capital, technology and management skill. The partnership is also usually for a long, fixed period under an agreement.`,
  sol: `Any three features.`,
  scheme: [[`Sharing of risk and reward`, 1], [`Government support`, 1], [`Private contribution`, 1]],
}));
Q('s3_stat_limits', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: `Explain three limitations of a statutory corporation.`,
  model: `1. Government control: in practice, ministries still guide its policy and major decisions, so autonomy is limited.\n2. Bureaucratic working: its procedures can be rigid and slow, like those of a department.\n3. Accountability to the legislature through questions and reports can cause caution. Creation by a special Act also makes changes slow.`,
  sol: `Any three limitations.`,
  scheme: [[`Government control`, 1], [`Rigid procedures`, 1], [`Third limitation`, 1]],
}));

// ================================================================ long answers
Q('l_dept', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Explain the features of a departmental undertaking and state one merit and one limitation.`,
  model: `1. Part of a ministry: it is set up as a department and is under the direct control of the ministry.\n2. Finance: its funds come from the treasury, and its revenues are paid into the treasury.\n3. Controls: it is subject to the budget, accounting and audit rules of the government.\n4. Staff and accountability: its employees are government servants, and the undertaking is accountable to the ministry.\n5. Merit and limitation: it gives effective government control, but red tape and lack of flexibility delay decisions.`,
  sol: `Features, one merit and one limitation.`,
  scheme: [[`Part of a ministry`, 1], [`Treasury finance`, 1], [`Budget and audit controls`, 1], [`Staff and accountability`, 1], [`One merit and one limitation`, 1]],
}));
Q('l_stat', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Explain the features of a statutory corporation.`,
  model: `1. Creation: it is set up by a special Act of Parliament or a state legislature.\n2. Powers: the Act lays down its objects, powers and rules, so it has its own powers.\n3. Legal entity: it is a separate body that can sue and be sued in its own name.\n4. Financial independence: it meets its expenses from its own income and may get capital from the government.\n5. Staff and controls: its employees are not government servants, and departmental budget, accounting and audit procedures do not apply to it.`,
  sol: `Five features.`,
  scheme: [[`Created by a special Act`, 1], [`Own powers`, 1], [`Separate legal entity`, 1], [`Financial independence`, 1], [`Staff and controls`, 1]],
}));
Q('l_reforms', long({
  t: 1, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `Explain the changed role of the public sector after the industrial policy of 1991 in any four points. Give a dated note on reserved industries.`,
  model: `1. Fewer reserved industries: the list was cut sharply; as of 2024 a very small number, mainly atomic energy and railway operations, remain reserved.\n2. Disinvestment: the government sells a part of its shares in public enterprises.\n3. Memorandum of understanding: agreed performance targets give managers autonomy with accountability.\n4. Policy for sick units: viable enterprises are revived and others are closed in an orderly way.`,
  sol: `Four reform points with the dated note.`,
  scheme: [[`Fewer reserved industries`, 1], [`Dated note as of 2024`, 1], [`Disinvestment`, 1], [`Memorandum of understanding`, 1], [`Policy for sick units`, 1]],
}));
Q('l_mnc', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Explain any five features of a global enterprise.`,
  model: `1. Huge capital resources: it raises funds from many countries and markets.\n2. Foreign collaboration: it forms tie-ups with local firms, so it can use their skills and knowledge.\n3. Advanced technology: it can afford research and modern methods.\n4. Product innovation and marketing strategies: it invests in new products and strong promotion.\n5. Centralised control: the head office controls branches and subsidiaries in other countries, and the enterprise keeps expanding its market territory.`,
  sol: `Any five features.`,
  scheme: [[`Huge capital`, 1], [`Foreign collaboration`, 1], [`Advanced technology`, 1], [`Innovation and marketing`, 1], [`Centralised control`, 1]],
}));
Q('l_jv', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Explain the meaning, the two types and three benefits of a joint venture.`,
  model: `Meaning: a joint venture is an arrangement in which two or more firms join to carry on a business activity and share its ownership, control and profit.\nTypes: a contractual joint venture rests on an agreement alone, while an equity-based joint venture creates a jointly owned entity in which the partners hold shares.\nBenefits: 1. more resources and capacity; 2. access to new markets and distribution networks; 3. access to technology and a lower cost of production.`,
  sol: `Meaning, two types and three benefits.`,
  scheme: [[`Meaning`, 1], [`Contractual type`, 1], [`Equity-based type`, 1], [`Two benefits`, 1], [`Third benefit`, 1]],
}));
Q('l_ppp', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: `Explain public private partnership and evaluate its usefulness for building public infrastructure.`,
  model: `In a public private partnership, the government and a private enterprise cooperate to build and run public infrastructure or services, such as roads or hospitals.\n1. Features: risk and reward are shared; the government gives land, approvals or funds; the private partner brings capital, technology and management.\n2. Usefulness: the government does not need all the money at once, and projects are finished and run efficiently.\n3. Caution: the agreement must be clear, so that the public interest, such as fair charges, is protected.`,
  sol: `Meaning, features, usefulness and a caution.`,
  scheme: [[`Meaning`, 1], [`Sharing of risk and reward`, 1], [`Roles of the two partners`, 1], [`Usefulness`, 1], [`A caution or condition`, 1]],
}));

// ================================================================ case-based
Q('cb_hillroads', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined undertaking.)*`,
  passage: `**Hill Roads Directorate (imagined), a state of imagined Parvatpur**\n\nThe Hill Roads Directorate is a branch of the state's Ministry of Public Works. It builds and repairs mountain roads with money from the state's yearly budget, and the toll it collects goes into the treasury. Its engineers and clerks are government servants. Any purchase above a small amount needs the ministry's approval, which last winter held up the buying of snow-clearing machines for three weeks. The Directorate's accounts are checked by the government's auditors.`,
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'application', stem: `Which form of public enterprise is the Hill Roads Directorate?`, opts: [`Departmental undertaking`, `Statutory corporation`, `Government company`, `Joint venture`], sol: `A branch of a ministry funded by the budget with government servants as staff is a departmental undertaking.` })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: `Quote the line that shows treasury finance.`, model: `"**the toll it collects goes into the treasury**": revenue is paid into the treasury, as in a department.`, sol: `The line about the treasury.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: `**Either** (i): Identify two limitations of this form shown in the passage.`, model: `1. Red tape: purchases above a small amount need approval from the ministry.\n2. Lack of flexibility: the machines were delayed three weeks, harming the work in winter.`, sol: `Two limitations with evidence.`, scheme: [[`Red tape with evidence`, 1], [`Lack of flexibility with evidence`, 1]] }), [
      short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: `**Or** (ii): The government considers giving the Directorate more freedom of action. Suggest a form of public enterprise and give one reason.`, model: `It could be turned into a statutory corporation created by an Act. It would then have its own powers and finances, so it could buy machines quickly without approval from the ministry.`, sol: `A statutory corporation with a reason.`, scheme: [[`Suitable form named`, 1], [`Reason linked to the passage`, 1]] }),
    ]),
  ],
}));
Q('cb_jalnidhi', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined corporation.)*`,
  passage: `**Jal Nidhi Corporation (imagined), a state of imagined Sagarpur**\n\nThe legislature of Sagarpur passed an Act that created the Jal Nidhi Corporation to supply drinking water. The Act states its objects and powers, and the Corporation can sue and be sued in its own name. It earns most of its money from water charges and spends it without the budget procedures that apply to government departments. Its staff are not government servants and follow service rules framed by the Corporation. Even so, the state government appoints its chairperson and expects it to follow the state's water policy.`,
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'application', stem: `The Jal Nidhi Corporation is a`, opts: [`statutory corporation`, `departmental undertaking`, `government company`, `private company`], sol: `Creation by a special Act with its own powers and finances is the mark of a statutory corporation.` })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: `Quote the line that shows financial independence.`, model: `"**It earns most of its money from water charges and spends it without the budget procedures**": it funds itself and is free of departmental procedures.`, sol: `The line on charges and budget procedures.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: `**Either** (i): State two features of a statutory corporation shown in the passage.`, model: `1. Created by a special Act, which states its objects and powers.\n2. Staff are not government servants, and follow service rules framed by the Corporation.`, sol: `Two features with evidence.`, scheme: [[`Creation by an Act`, 1], [`Own staff rules`, 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: `**Or** (ii): Which line suggests that the autonomy of the Corporation is limited in practice, and why is this a limitation?`, model: `The line about the state government appointing the chairperson and expecting it to follow state policy suggests limited autonomy. Government influence can slow decisions and reduce the freedom that the form is meant to give.`, sol: `The line and the reason.`, scheme: [[`Correct line identified`, 1], [`Reason: influence limits autonomy`, 1]] }),
    ]),
  ],
}));
Q('cb_deshsteel', caseQ({
  t: 1, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined government company.)*`,
  passage: `**Desh Steel Ltd (imagined), registered in imagined Ispatpur**\n\nDesh Steel Ltd was registered under the Companies Act, and the government held all of its ${fmt(DESH.total)} lakh shares. A board of directors manages the company, and its employees follow the company's service rules. To raise money and bring in new investors, the government decided to sell ${fmt(DESH.sale1)} lakh shares in the first round. A later proposal suggested selling ${fmt(DESH.sale2)} lakh shares in all.`,
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'application', stem: `Desh Steel Ltd is, at the start of the case, a`, opts: [`government company`, `statutory corporation`, `departmental undertaking`, `joint venture`], sol: `A company registered under the Companies Act and wholly held by the government is a government company.` })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: `Quote the line that shows disinvestment.`, model: `"**the government decided to sell ${fmt(DESH.sale1)} lakh shares in the first round**": the sale of part of the shares is disinvestment.`, sol: `The line about the sale of shares.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 1, d: 4, c: 'application', marks: 2, stem: `**Either** (i): After the first round, what share does the government hold and is Desh Steel Ltd still a government company, as of 2024?`, model: `The government holds ${fmt(DESH.held1)} lakh of ${fmt(DESH.total)} lakh shares, which is ${DESH.pct1} per cent. This is above ${GOVT_MIN} per cent, so it is still a government company.`, sol: `Compute the holding and apply the test.`, scheme: [[`Holding ${DESH.pct1} per cent`, 1], [`Above 51 per cent, so still a government company`, 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: `**Or** (ii): If the later proposal is carried out in full, what share will remain with the government, and what will be the effect on its status, as of 2024?`, model: `The government will hold ${fmt(DESH.held2)} lakh shares, which is ${DESH.pct2} per cent. This is below ${GOVT_MIN} per cent, so as of 2024 the company will no longer be a government company.`, sol: `Compute the holding and apply the test.`, scheme: [[`Holding ${DESH.pct2} per cent`, 1], [`Below 51 per cent, so not a government company`, 1]] }),
    ]),
  ],
}));
Q('cb_jv', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined Indo-foreign joint venture.)*`,
  passage: `**Sundar Nordvik Components Pvt Ltd (imagined)**\n\nSundar Castings, an imagined Indian firm, and Nordvik Machines, an imagined firm of the imagined country of Altaria, formed a new company to make precision parts. They put in a capital of Rs ${JV.capital} crore in the ratio ${JV.split[0]} to ${JV.split[1]}, and decisions are taken jointly. Nordvik brought modern machines and its network of buyers abroad, while Sundar brought a skilled workforce and a well-known local brand. In the first year the company made a profit of Rs ${JV.profit} crore, shared in the ratio of capital.`,
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', stem: `Which type of joint venture is Sundar Nordvik Components?`, opts: [`Equity-based joint venture`, `Contractual joint venture`, `Public private partnership`, `Statutory corporation`], sol: `A new jointly owned company with shares held by the partners is an equity-based joint venture.` })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: `Quote the line that shows access to technology.`, model: `"**Nordvik brought modern machines**": the partner supplies technology.`, sol: `The line about modern machines.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 2, d: 4, c: 'application', marks: 2, stem: `**Either** (i): Find the capital put in and the first-year profit received by each firm.`, model: `Sundar put in Rs ${JV.parts[0]} crore and Nordvik Rs ${JV.parts[1]} crore. Of the Rs ${JV.profit} crore profit, Sundar receives Rs ${JV.profitParts[0]} crore and Nordvik Rs ${JV.profitParts[1]} crore.`, sol: `Apply the ratio to capital and profit.`, scheme: [[`Capital Rs ${JV.parts[0]} crore and Rs ${JV.parts[1]} crore`, 1], [`Profit Rs ${JV.profitParts[0]} crore and Rs ${JV.profitParts[1]} crore`, 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: `**Or** (ii): State two benefits of the joint venture that are visible in the passage.`, model: `1. Access to technology: Nordvik brought modern machines.\n2. Access to markets and an established brand: Nordvik's network of buyers abroad and Sundar's well-known local brand.`, sol: `Two benefits with evidence.`, scheme: [[`First benefit with evidence`, 1], [`Second benefit with evidence`, 1]] }),
    ]),
  ],
}));
Q('cb_toll', caseQ({
  t: 2, d: 4, c: 'application', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined partnership and road.)*`,
  passage: `**Ghat Expressway (imagined), state of imagined Madhuvan**\n\nThe state of Madhuvan wished to build a toll road across a hill range with a cost of Rs ${fmt(PPP.cost)} crore. It gave the land and the permits and paid ${PPP.govtPct} per cent of the cost, and Ghat Roadways, an imagined private firm, put in the rest, built the road and manages it. Under the agreement, Ghat Roadways collects the toll for ${PPP.years} years and then hands the road back to the state. The toll is fixed by the agreement, so that travellers are not overcharged. Expected net toll collection is Rs ${PPP.net} crore a year.`,
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', stem: `The arrangement between the state and Ghat Roadways is a`, opts: [`public private partnership`, `departmental undertaking`, `equity-based joint venture of two firms`, `cooperative society`], sol: `The government and a private firm cooperate to provide a public road, each with its own role: a public private partnership.` })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: `Quote the line that shows the government's contribution.`, model: `"**It gave the land and the permits and paid ${PPP.govtPct} per cent of the cost**": land, approvals and part of the funding come from the government.`, sol: `The line about land, permits and funding.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 2, d: 4, c: 'application', marks: 2, stem: `**Either** (i): How much does each partner put in, and what is the expected net toll collection over the whole agreement, before interest and tax?`, model: `The state puts in Rs ${PPP.govt} crore and Ghat Roadways Rs ${PPP.private} crore. Over ${PPP.years} years the net toll is Rs ${PPP.net} crore times ${PPP.years}, or Rs ${fmt(PPP.total)} crore.`, sol: `Compute the shares and the total toll.`, scheme: [[`Rs ${PPP.govt} crore and Rs ${PPP.private} crore`, 1], [`Total Rs ${fmt(PPP.total)} crore`, 1]] }), [
      short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: `**Or** (ii): Which two features of a public private partnership are visible in the passage?`, model: `1. Government support: the state gave land, permits and a part of the money.\n2. Private contribution and shared reward: the private firm brought capital and management and collects the toll for ${PPP.years} years before handing the road back.`, sol: `Two features with evidence.`, scheme: [[`Government support`, 1], [`Private contribution and sharing`, 1]] }),
    ]),
  ],
}));
