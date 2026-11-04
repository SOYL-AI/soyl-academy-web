// CBSE 11 Business Studies, ch02 Forms of Business Organisation: question bank. Every firm, person and
// situation is imagined and written by SOYL; no NCERT example, exercise or board/sample-paper item is reused (D-036).
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child } from '../../cbse-11-business-studies-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
export const fmt = (n) => n.toLocaleString('en-IN');

// ---- computed figures used in stems, solutions and slides -------------------------------------------------
// Sole proprietor: debts against assets.
export const BAKER = { owed: 240000, assets: 150000 };
BAKER.gap = BAKER.owed - BAKER.assets; // 90,000
// Partnership profit shared in a ratio.
export const PROFIT = { total: 480000, ratio: [3, 2, 1] };
PROFIT.sum = PROFIT.ratio.reduce((a, b) => a + b, 0);
PROFIT.parts = PROFIT.ratio.map((r) => (PROFIT.total * r) / PROFIT.sum); // 240000, 160000, 80000
// Partnership debts: joint and several liability.
export const FIRM = { owed: 600000, assets: 380000 };
FIRM.gap = FIRM.owed - FIRM.assets; // 220,000
// Company shares: limited liability.
export const SHARE = { n: 500, face: 10, paid: 6 };
SHARE.unpaid = SHARE.n * (SHARE.face - SHARE.paid); // 2,000
if (BAKER.gap !== 90000 || PROFIT.parts.join() !== '240000,160000,80000' || FIRM.gap !== 220000 || SHARE.unpaid !== 2000) throw new Error('figure check failed');

// ================================================================ t01 Sole proprietorship and Joint Hindu Family business
Q('mc_sole_liability', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Chandrika Naik runs Naik Bakes, an imagined bakery in the imagined town of Chandpur, entirely on her own. Her creditors are owed Rs ${fmt(BAKER.owed)}, but the shop's assets can raise only Rs ${fmt(BAKER.assets)}. The unpaid Rs ${fmt(BAKER.gap)} can be recovered from`,
  opts: [
    `Chandrika's personal property, because a sole proprietor has unlimited liability`,
    `only the bakery's assets, because her liability is limited to the business`,
    `her customers, who must share the loss`,
    `nobody, because a sole proprietorship is a separate legal entity`,
  ],
  sol: `The owner and the business are one in law, so there is no ring-fence around personal assets. Limited liability belongs to companies and cooperatives; customers never share a trader's loss; and a sole proprietorship has no separate legal existence.`,
}));
Q('mc_sole_odd', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Which of the following does NOT describe a sole proprietorship?`,
  opts: [
    `The owner's liability for business debts is limited to the capital put in`,
    `One person bears all the risk and keeps all the profit`,
    `It can be started and wound up with few legal formalities`,
    `The business has no separate legal identity from its owner`,
  ],
  sol: `Liability of a sole proprietor is unlimited, so the first statement is the one that does not fit. The other three are standard features: single risk bearer, simple formation and closure, and no separate legal entity.`,
}));
Q('mc_sole_merit', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Gopal Rane, an imagined tailor in an imagined suburb, decides on a new blouse design on Monday and starts stitching it on Tuesday, since he does not have to consult anyone. Which merit of a sole proprietorship does this show?`,
  opts: [`Quick decision making`, `Large capital resources`, `Perpetual succession`, `Limited liability`],
  sol: `One person decides, so there is no delay in consultation. Large capital, perpetual succession and limited liability are not merits of this form; its resources are small, its life is tied to the owner and its liability is unlimited.`,
}));
Q('mc_sole_limit', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Aarav Tiwari, who owns an imagined cycle-repair workshop in an imagined town, cannot buy a second compressor because his own savings and one small loan are all he can raise. This points to which limitation of a sole proprietorship?`,
  opts: [`Limited resources`, `Lack of any control over the business`, `Perpetual succession`, `Heavy legal formalities for closing the business`],
  sol: `A sole proprietor depends on personal savings and borrowing, so growth is held back by limited resources. He has full control, the form ends with the owner rather than lasting forever, and closing it is easy.`,
}));
Q('mc_jhf_birth', mcq({
  t: 1, d: 1, c: 'recall',
  stem: `A person becomes a member (coparcener) of a Joint Hindu Family business`,
  opts: [`by birth in the Hindu Undivided Family`, `by signing an agreement with the Karta`, `by paying a share of the capital`, `by registering with the Registrar of Companies`],
  sol: `Membership of this form arises by birth in the family, not by contract, purchase of shares or registration, which is why the form is governed by Hindu law rather than by an agreement.`,
}));
Q('mc_karta_liability', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `In Bhatia and Sons, an imagined Joint Hindu Family business of Indore, Karta Mohan runs the shop while his brothers and nephews are coparceners. Which statement about liability is correct?`,
  opts: [
    `Mohan's liability is unlimited, while each coparcener is liable only up to his or her share in the business`,
    `Every member has unlimited liability`,
    `Mohan's liability is limited, while the coparceners have unlimited liability`,
    `Every member's liability is limited to the salary drawn`,
  ],
  sol: `The Karta, who manages and takes decisions, bears unlimited liability; the other members are liable only to the extent of their share. The other options reverse or flatten this arrangement.`,
}));
Q('mc_jhf_system', mcq({
  t: 1, d: 2, c: 'recall',
  stem: `As commonly taught, the Dayabhaga system of Hindu law, under which a Joint Hindu Family business may be governed, is followed mainly in`,
  opts: [`West Bengal`, `Maharashtra`, `Tamil Nadu`, `Punjab`],
  sol: `Dayabhaga is the system associated with West Bengal; the rest of India follows the Mitakshara system.`,
}));
Q('mc_jhf_continue', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Karta Raghunath of Raghunath Brothers Oils, an imagined family firm of Rajkot, passed away. Which outcome fits the Joint Hindu Family form?`,
  opts: [
    `The business carries on, and the next senior member takes charge as Karta`,
    `The business ends automatically on his death`,
    `The business becomes a company with immediate effect`,
    `Creditors may force closure within a month`,
  ],
  sol: `Because the form rests on the family and not on one person, the death of the Karta does not end the business; the eldest remaining member steps up. Automatic dissolution would apply to forms whose life depends on one person.`,
}));
Q('mc_daughters', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `As of 2024, after the Hindu Succession (Amendment) Act 2005, a daughter in a Hindu Undivided Family`,
  opts: [`becomes a coparcener by birth, like a son`, `can never be a coparcener`, `becomes a coparcener only on marriage`, `becomes the Karta automatically`],
  sol: `The 2005 amendment gave daughters the same right as sons to be coparceners by birth. It did not require marriage or an automatic appointment as Karta.`,
}));

// ================================================================ t02 Partnership and cooperative societies
Q('mc_secret_partner', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Hari Bhat put Rs 4,00,000 into Lakshmi Sweets, an imagined partnership firm, and joins in its decisions, but the firm's customers and suppliers do not know he is a partner. Hari is a`,
  opts: [`secret partner`, `sleeping partner`, `nominal partner`, `partner by estoppel`],
  sol: `A secret partner shares in management and profit while his link with the firm stays hidden from the public. A sleeping partner is known but inactive; a nominal partner only lends a name; a partner by estoppel is bound by his own misleading conduct.`,
}));
Q('mc_estoppel', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Pradeep is not a partner in Gill and Rao Traders, an imagined firm. At a bank meeting he spoke and acted as if he were one, and the officer lent money to the firm on that belief. Pradeep can be held liable as a`,
  opts: [`partner by estoppel`, `sleeping partner`, `active partner`, `minor partner`],
  sol: `He is bound by his own conduct, which led the lender to believe he was a partner. He did not invest or work in the firm, so he is neither sleeping nor active, and nothing suggests he is a minor.`,
}));
Q('mc_unregistered', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Sana and Ritu run an unregistered partnership firm in imagined Nashik. A customer refuses to pay for goods supplied. As of 2024, what is the legal position?`,
  opts: [
    `The firm cannot sue the customer to enforce the contract, because it is not registered`,
    `The firm can sue freely, since registration matters only for companies`,
    `The firm is illegal and must be closed at once`,
    `The customer is released from the debt`,
  ],
  sol: `Registration of a partnership is optional, but an unregistered firm loses the right to file such a suit against third parties. It is not illegal, and the debt is not wiped out.`,
}));
Q('mc_partners_limit', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Sixty traders of an imagined market town want to run one grain business as a single partnership firm. As of 2024, why can they not do so?`,
  opts: [
    `The maximum number of partners prescribed under company law rules is 50`,
    `A partnership needs at least 100 members`,
    `Partnership is not allowed for trading activities`,
    `Only a company may have more than two members`,
  ],
  sol: `Under the rules made under the Companies Act 2013, an ordinary partnership may have at most 50 partners as of 2024. The minimum is two, trading is allowed, and a company is not the only form with many members.`,
}));
Q('mc_sleeping', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Dr Isha Menon invests in an imagined clinic-supplies partnership and shares its profit, but never takes part in running it, and everyone knows she is a partner. She is a`,
  opts: [`sleeping partner`, `secret partner`, `active partner`, `nominal partner`],
  sol: `Investing and sharing profit without working in the firm, openly, is the mark of a sleeping (dormant) partner. A secret partner is unknown to the public, an active partner works, and a nominal partner contributes nothing but a name.`,
}));
Q('mc_at_will', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Nisha and Tarun start an imagined catering firm with no fixed period and no single venture in view, and either may end it by giving notice. Their firm is a`,
  opts: [`partnership at will`, `partnership for a particular venture`, `limited liability partnership`, `cooperative society`],
  sol: `With no fixed period or venture and a right to leave on notice, it is a partnership at will. A venture partnership ends when its single task ends; the other two forms are governed by different laws.`,
}));
Q('mc_deed_content', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `Which item would NOT normally be written in a partnership deed?`,
  opts: [
    `A prospectus inviting the public to invest in the firm`,
    `The ratio in which profits and losses are shared`,
    `Interest on capital and salaries of working partners`,
    `Rules for admitting and retiring partners`,
  ],
  sol: `A firm cannot invite the public to invest, so a prospectus has no place in the deed. The profit-sharing ratio, interest and salaries, and rules on admission and retirement are all standard clauses.`,
}));
Q('mc_llp', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: `Which statement about a limited liability partnership formed under the LLP Act 2008 is correct?`,
  opts: [
    `It is a separate legal entity, and its partners are not personally liable for its debts beyond their agreed contribution`,
    `It has no legal identity apart from its partners`,
    `All its partners always have unlimited liability`,
    `It may invite the public to buy its shares`,
  ],
  sol: `The LLP blends the flexibility of a partnership with limited liability and a separate identity. It is not an unlimited-liability firm and, being a partnership, does not raise money by issuing shares to the public.`,
}));
Q('mc_coop_marketing', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Fifty orange growers of imagined Sundarpur pool their harvest and sell it together through one society to bargain for a better price with city buyers. This is a`,
  opts: [`marketing cooperative`, `consumer's cooperative`, `cooperative housing society`, `credit cooperative`],
  sol: `Joint selling to get a better price is the job of a marketing cooperative. A consumer's cooperative buys for its members, a housing society builds homes, and a credit cooperative lends money.`,
}));
Q('mc_coop_vote', mcq({
  t: 2, d: 2, c: 'application',
  stem: `At the general meeting of an imagined weavers' society, a member holding many shares and a member holding one share each cast a single vote. Which feature of a cooperative is shown?`,
  opts: [`Democratic control`, `Service motive`, `Limited liability`, `Legal status`],
  sol: `One member, one vote, whatever the shareholding, is democratic control. Service motive concerns the aim, limited liability concerns debts, and legal status concerns registration.`,
}));

// ================================================================ t03 Company: private and public
Q('mc_company_entity', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Orchid Packaging Limited, an imagined company, signed a supply contract in its own name and later sued a buyer who failed to pay. Its largest shareholder, Mr Das, was not a party to the suit. This is possible because a company`,
  opts: [
    `is a separate legal entity that can sue and be sued in its own name`,
    `is the same person as its largest shareholder`,
    `can act only through a partnership deed`,
    `has unlimited liability, so its owners may sue`,
  ],
  sol: `Incorporation creates a legal person distinct from its members, so the company itself sues. It is not identical to its shareholder, no partnership deed is involved, and its liability is limited, not unlimited.`,
}));
Q('mc_private_min', mcq({
  t: 3, d: 2, c: 'recall',
  stem: `Which set of figures gives the minimum number of members and directors of a private company, as of 2024?`,
  opts: [`2 members and 2 directors`, `7 members and 3 directors`, `2 members and 3 directors`, `7 members and 2 directors`],
  sol: `A private company needs at least 2 members and 2 directors; the 7 and 3 are the minimums for a public company.`,
}));
Q('mc_capital_stage', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Kesari Hospitality Private Limited, an imagined company, was incorporated last month and will never ask the public to buy its shares. Which stage of formation does it leave out?`,
  opts: [`Capital subscription`, `Promotion`, `Incorporation`, `Commencement of business`],
  sol: `Capital subscription is the stage in which a public company invites the public to apply for shares. A private company may not do this, so it skips that stage but still goes through promotion, incorporation and the commencement step.`,
}));
Q('mc_seal', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: `As of 2024, how does company law treat the common seal?`,
  opts: [`It is optional, since an amendment of 2015`, `It is compulsory for every company`, `It is allowed only for public companies`, `It is prohibited for all companies`],
  sol: `The 2015 amendment made the common seal optional for companies, so it is neither compulsory nor banned, and it is not limited to public companies.`,
}));
Q('mc_opc', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: `A One Person Company, a form introduced by the Companies Act 2013, has`,
  opts: [`a single member and a separate legal entity`, `no members at all`, `unlimited liability for its member`, `at least seven members`],
  sol: `The form lets one individual run a company with limited liability and a legal identity of its own. It must have one member, so zero members or seven members are wrong, and liability is limited.`,
}));
Q('mc_promotion', mcq({
  t: 3, d: 2, c: 'application',
  stem: `Before registering Tamarind Foods Limited, an imagined company, its founders judged whether demand would justify a plant, chose a name and hired professionals to prepare the documents. This is the stage of`,
  opts: [`promotion`, `incorporation`, `capital subscription`, `commencement of business`],
  sol: `Conceiving the idea, studying its feasibility, selecting a name and preparing documents are the work of promotion. Incorporation is registration itself, and the other two stages come later.`,
}));

// ================================================================ t04 Choice of form of business organisation
Q('mc_choice_factory', mcq({
  t: 4, d: 3, c: 'application',
  stem: `Vindhya Steel Works, an imagined firm, plans a plant needing several hundred crore rupees of capital, and its promoters want it to last beyond their own lives and to draw in many investors. The most suitable form is`,
  opts: [`a public company`, `a sole proprietorship`, `a partnership firm`, `a Joint Hindu Family business`],
  sol: `Large capital, continuity and a wide base of investors point to a public company. The other forms are limited in capital, in continuity or in the number of people who can contribute.`,
}));
Q('mc_choice_dairy', mcq({
  t: 4, d: 3, c: 'application',
  stem: `Forty dairy farmers of imagined Gokulpur, each with a few cows, want to sell milk jointly, share a chilling plant and keep middlemen out, with an equal say regardless of herd size. The most suitable form is`,
  opts: [`a cooperative society`, `a sole proprietorship`, `a One Person Company`, `a public company that issues a prospectus`],
  sol: `Joint effort, mutual welfare and equal voting match a cooperative society. A sole proprietorship or a One Person Company has just one owner, and a public company would give votes by shareholding and impose heavy formalities.`,
}));

// ---- assertion-reason
Q('ar_sole', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: `A sole proprietor's personal property can be used to pay the debts of the business.`,
  r: `A sole proprietorship has no separate legal existence apart from its owner.`,
  sol: `Both are true. Since the law treats owner and business as one, creditors can reach the owner's own property, so R explains A.`,
}));
Q('ar_company', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: `A company can hold property in its own name.`,
  r: `A shareholder's liability is limited to the unpaid amount on the shares held.`,
  sol: `Both are true. Holding property follows from separate legal existence, whereas limited liability concerns what a member must pay for company debts; the second statement does not explain the first.`,
}));
Q('ar_agency', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'both-true-explains',
  a: `An act of one partner within the scope of the firm's business can bind all the other partners.`,
  r: `Every partner is both an agent and a principal in relation to the firm.`,
  sol: `Both are true. Because each partner acts as agent for the others and is also their principal, one partner's authorised act binds the rest; R is the reason (mutual agency).`,
}));
Q('ar_coop_service', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: `A cooperative society works mainly for the welfare of its members.`,
  r: `Members of a cooperative society always share its entire surplus equally, whatever their contribution.`,
  sol: `A is true: service to members is the aim. R is false: surplus is shared on rules such as business done with the society, and part is kept in reserves, so it is not always divided equally.`,
}));
Q('ar_private_transfer', ar({
  t: 3, d: 4, c: 'analysis', verdict: 'A-true-R-false',
  a: `The shares of a public company are freely transferable.`,
  r: `A public company cannot have more than 200 members.`,
  sol: `A is true. R is false: the cap of 200 (as of 2024) applies to a private company; a public company has no maximum number of members.`,
}));
Q('ar_jhf', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: `Every member of a Joint Hindu Family business has unlimited liability.`,
  r: `The liability of the coparceners is limited to their share in the business.`,
  sol: `A is false, because only the Karta has unlimited liability. R is true, as coparceners answer only to the extent of their share.`,
}));

// ---- true-false, fill in the blanks, match, ordering
Q('tf_jhf_death', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: `A Joint Hindu Family business carries on even after the death of its Karta.`,
  sol: `The business rests on the family, not on one person, so the next senior member takes charge.`,
}));
Q('tf_registration', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: `As of 2024, the law says an imagined partnership firm in Surat must be registered before it may begin business.`,
  sol: `Registration of a partnership is optional; it only affects the firm's ability to sue, and the firm may legally begin work without it.`,
}));
Q('tf_coop_votes', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: `In a cooperative society, a member who buys more shares gets more votes at the general meeting.`,
  sol: `Every member has one vote irrespective of shareholding; this is democratic control.`,
}));
Q('tf_private_invite', tf({
  t: 3, d: 1, c: 'recall', ans: true,
  stem: `A private company is not allowed to invite the public to subscribe to its shares.`,
  sol: `Only a public company may approach the public for capital; this is one of the restrictions on a private company.`,
}));
Q('fb_partnership_members', fb({
  t: 2, d: 2, c: 'recall',
  stem: `A partnership needs a minimum of ___ persons, and as of 2024 the maximum number of partners is ___.`,
  acc: [['2', 'two'], ['50', 'fifty']],
  sol: `The minimum is 2 persons and the maximum is 50 partners as of 2024.`,
}));
Q('fb_private_name', fb({
  t: 3, d: 2, c: 'recall',
  stem: `The name of a private company ends with the words ___, whereas the name of a public company ends with the word ___.`,
  acc: [['Private Limited'], ['Limited']],
  sol: `Private Limited for a private company, and Limited for a public company.`,
}));
Q('fb_karta', fb({
  t: 1, d: 1, c: 'recall',
  stem: `In a Joint Hindu Family business the ___ manages the business, and the other members are called ___.`,
  acc: [['Karta'], ['coparceners', 'coparcener']],
  sol: `The Karta manages; the others are coparceners.`,
}));
Q('mt_partners', match({
  t: 2, d: 2, c: 'understanding',
  stem: `Match each description of a partner in an imagined firm with the type of partner.`,
  pairs: [
    [`Works in the firm and takes part in its day-to-day running`, `Active partner`],
    [`Puts in capital and shares profit but does not manage`, `Sleeping partner`],
    [`Lends only his name to the firm, with no capital or work`, `Nominal partner`],
    [`Becomes liable because his own conduct misled others`, `Partner by estoppel`],
  ],
  sol: `Each type is defined by role in management and by what the outside world knows or is led to believe.`,
}));
Q('mt_coop', match({
  t: 2, d: 3, c: 'application',
  stem: `Match each imagined group with the type of cooperative it forms.`,
  pairs: [
    [`Families of an apartment block pool money to buy land and build flats`, `Cooperative housing society`],
    [`Students of an imagined college jointly run a shop selling stationery at fair prices`, `Consumer's cooperative`],
    [`Small potters pool the cost of clay and kilns for their own production`, `Producer's cooperative`],
    [`Villagers lend each other small sums out of their joint savings`, `Credit cooperative`],
  ],
  sol: `Housing for members, buying for members, helping small producers produce, and lending to members are the four different purposes.`,
}));
Q('mt_forms', match({
  t: 4, d: 3, c: 'analysis',
  stem: `Match each feature with the form of business organisation it best describes.`,
  pairs: [
    [`Manager holds authority and members answer only up to their share`, `Joint Hindu Family business`],
    [`Owners act as agents of one another`, `Partnership`],
    [`May invite the public and has no maximum number of members`, `Public company`],
    [`One member, one vote`, `Cooperative society`],
  ],
  sol: `The Karta structure, mutual agency, the public invitation without a cap on members, and equal voting each identify one form.`,
}));
Q('od_formation', ord({
  t: 3, d: 2, c: 'recall',
  stem: `Arrange the stages in forming a public company in the order they happen.`,
  items: [`Promotion`, `Incorporation`, `Capital subscription`, `Commencement of business`],
  sol: `Ideas and documents come first, registration next, then raising capital from the public, and finally the declaration that allows business to start.`,
}));
Q('od_promotion', ord({
  t: 3, d: 3, c: 'understanding',
  stem: `Arrange these promotion activities of an imagined company in a sensible order.`,
  items: [`Spot a business opportunity`, `Study its feasibility`, `Choose and get approval for a name`, `Prepare the documents for registration`],
  sol: `A promoter first finds an idea, tests it, then secures a name and finally prepares the paperwork.`,
}));

// ================================================================ short answers
Q('s2_jhf_karta', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `Who is the Karta of a Joint Hindu Family business, and what is his liability?`,
  model: `The Karta is the eldest member of the family, who manages the business and takes decisions on behalf of the family. His liability is unlimited, whereas the other members, the coparceners, are liable only up to their share in the business.`,
  sol: `One mark for the role of the Karta and one for the liability contrast.`,
  scheme: [[`Karta is the eldest member who manages`, 1], [`Karta unlimited; coparceners limited to share`, 1]],
}));
Q('s2_coop_def', short({
  t: 2, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: `Define a cooperative society and name the law under which it is registered.`,
  model: `A cooperative society is a voluntary association of persons who join together for the welfare of its members rather than for profit as such. It is registered under the Cooperative Societies Act 1912 or the cooperative law of a state, as of 2024.`,
  sol: `Definition with welfare motive, and the registering law.`,
  scheme: [[`Voluntary association with welfare motive`, 1], [`Registered under the 1912 Act or state law`, 1]],
}));
Q('s2_sole_merits', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: `Neha Pillai, an imagined former clerk, starts a home-baking business alone. State two merits of this form that she will enjoy.`,
  model: `First, she can take quick decisions without consulting anyone, so she can change a recipe or price at once. Second, she keeps all the profit, which gives her a direct incentive to work hard, and she can start or close the venture with very few formalities.`,
  sol: `Any two merits, each linked to Neha.`,
  scheme: [[`First merit applied to Neha`, 1], [`Second merit applied to Neha`, 1]],
}));
Q('s2_private_restrict', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `State two restrictions that apply to a private company but not to a public company.`,
  model: `A private company must restrict the right to transfer its shares, and it cannot invite the public to subscribe to its shares. It is also limited to a maximum of 200 members, excluding employees, as of 2024, while a public company has no such limit.`,
  sol: `Any two of the three restrictions.`,
  scheme: [[`First restriction`, 1], [`Second restriction`, 1]],
}));
Q('s2_partner_types', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: `Distinguish between a sleeping partner and a nominal partner.`,
  model: `A sleeping partner invests capital and shares in the profit but takes no active part in management. A nominal partner contributes no capital and gets no share of profit; he only allows the firm to use his name, though he remains liable to outsiders.`,
  sol: `Contrast the two on capital, profit and management.`,
  scheme: [[`Sleeping partner described with capital and profit`, 1], [`Nominal partner described as lending only a name`, 1]],
}));
Q('s2_seal', short({
  t: 3, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: `As of 2024, is a common seal compulsory for a company? State the position and the year of the change.`,
  model: `No. A common seal is optional for a company, a change made by an amendment to the Companies Act in 2015. A company may still have one, but documents can also be authenticated by authorised signatories.`,
  sol: `Optional, since 2015.`,
  scheme: [[`Not compulsory; optional`, 1], [`Change made in 2015`, 1]],
}));
Q('s2_llp', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: `Why might three consultants, who want to start an imagined advisory firm, prefer a limited liability partnership to an ordinary partnership? Give two reasons.`,
  model: `In a limited liability partnership under the LLP Act 2008, the partners are not personally liable for the firm's debts beyond their agreed contribution, so their homes are safer. The firm is also a separate legal entity with continuity, unlike an ordinary partnership.`,
  sol: `Limited liability and separate legal entity or continuity.`,
  scheme: [[`Limited personal liability`, 1], [`Separate entity or continuity`, 1]],
}));
Q('s2_oc_features', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `What is a One Person Company, and which Act introduced it?`,
  model: `A One Person Company is a company with a single member, so one individual can run a business with limited liability and a legal existence separate from his own. It was introduced by the Companies Act 2013.`,
  sol: `Single member with limited liability; Companies Act 2013.`,
  scheme: [[`Company with one member, limited liability`, 1], [`Companies Act 2013`, 1]],
}));
Q('s2_mutual_agency', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: `Explain mutual agency with an example from an imagined firm, Rao and Bose Timber, run by two partners.`,
  model: `Each partner is an agent of the others as well as a principal. So if Rao buys timber for the firm within the scope of its business, Bose is bound by that purchase as if he had made it himself, and the firm's assets and both partners answer for it.`,
  sol: `Agent and principal, with the example.`,
  scheme: [[`Each partner is both agent and principal`, 1], [`Suitable example showing binding effect`, 1]],
}));
Q('s2_sole_continuity', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: `A sole proprietor's business is said to lack continuity. Explain this in two points with an imagined example, a stationery shop in Lucknow.`,
  model: `The shop and the owner are one in law, so if the owner falls seriously ill, becomes bankrupt or dies, the business may stop. Continuing it after her needs a fresh start by a successor, who must restart with new licences and customers.`,
  sol: `Business ends or is disrupted with the owner's illness or death.`,
  scheme: [[`Business and owner not separate, so life depends on owner`, 1], [`Example of disruption or closure`, 1]],
}));
Q('s2_commencement', short({
  t: 3, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: `As of 2024, what must a company that has share capital do before it starts business, and since when?`,
  model: `As of 2024, it files a declaration with the Registrar confirming that the subscribers have paid for the shares they agreed to take. This requirement was introduced in 2019; older books speak of a certificate of commencement.`,
  sol: `Declaration before commencing; introduced 2019.`,
  scheme: [[`Files a declaration with the Registrar`, 1], [`Introduced in 2019; replaces the older certificate`, 1]],
}));

Q('s3_deed', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `Gita, Imran and Sumeet, three friends, are about to open an imagined tuition firm. List three items they should put into their partnership deed, with one line on each.`,
  model: `First, the profit-sharing ratio, so that nobody disputes who gets what. Second, the capital each will bring and the interest on it, which fixes their stakes. Third, rules for admitting a new partner and for retirement, which lets the firm carry on when someone leaves; salaries or the firm's name could also be written in.`,
  sol: `Any three standard clauses with a purpose each.`,
  scheme: [[`First clause with purpose`, 1], [`Second clause with purpose`, 1], [`Third clause with purpose`, 1]],
}));
Q('s3_company_features', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain any three features of a company.`,
  model: `1. Separate legal entity: it owns property and can sue in its own name.\n2. Perpetual succession: it continues despite the death or exit of members.\n3. Limited liability: a shareholder answers only up to the unpaid amount on his shares.\nOther features include control by a board of directors and formation by registration.`,
  sol: `Any three features, each with a line.`,
  scheme: [[`First feature`, 1], [`Second feature`, 1], [`Third feature`, 1]],
}));
Q('s3_coop_merits', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain any three merits of a cooperative society.`,
  model: `1. Equal voting rights: each member has one vote, so control is democratic.\n2. Limited liability: members risk only their contribution.\n3. Stable existence: registration gives it a separate legal identity, so it is not affected by changes in membership. State support and easy formation are additional merits.`,
  sol: `Any three merits with a line each.`,
  scheme: [[`First merit`, 1], [`Second merit`, 1], [`Third merit`, 1]],
}));
Q('s3_jhf_limits', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: `State any three limitations of a Joint Hindu Family business.`,
  model: `1. Limited capital: the family's own funds restrict growth.\n2. Unlimited liability of the Karta, who may lose personal property if the business fails.\n3. Dominance of the Karta: he controls decisions, and his mistakes or conflict with other members may harm the business. Managerial ability may also be limited to the family.`,
  sol: `Any three limitations.`,
  scheme: [[`First limitation`, 1], [`Second limitation`, 1], [`Third limitation`, 1]],
}));
Q('s3_sole_limits', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `Anjum Siddiqui runs an imagined one-woman event-decoration business in Bhopal. Explain three limitations of this form that she may face.`,
  model: `1. Limited resources: she cannot buy costly equipment from her own savings and loans.\n2. Unlimited liability: if a big event leads to losses, her house and savings can be used to pay creditors.\n3. Limited managerial ability: one person must handle design, purchases, accounts and sales, and may lack skill in some areas. The business is also limited in life.`,
  sol: `Three limitations applied to Anjum's business.`,
  scheme: [[`Limited resources applied`, 1], [`Unlimited liability applied`, 1], [`Limited managerial ability applied`, 1]],
}));
Q('s3_unregistered', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: `Registration of a partnership firm is optional. As of 2024, state three consequences of not registering.`,
  model: `As of 2024, an unregistered firm cannot file a suit against a third party to enforce a right arising from a contract. A partner cannot sue the firm or other partners to enforce a right under the deed. Also, the firm cannot claim a set-off above a certain value, and it loses some credibility with banks.`,
  sol: `Any three consequences; the credibility point is practical rather than legal.`,
  scheme: [[`Firm cannot sue third parties`, 1], [`Partners cannot sue firm or one another`, 1], [`Third consequence`, 1]],
}));
Q('s3_choice_capital', short({
  t: 4, d: 4, c: 'application', marks: 3, wl: S3,
  stem: `Explain how capital needs and liability influence the choice of a form of organisation for an imagined firm, Deccan Robotics, which expects to need heavy investment.`,
  model: `Capital: heavy investment cannot come from one person or a few partners, so a company that can raise funds from many shareholders suits it. Liability: the founders would not wish to risk their homes, so limited liability is attractive. Hence a company, rather than a sole proprietorship or partnership, is the better choice.`,
  sol: `Capital, liability and a conclusion.`,
  scheme: [[`Capital need and form that suits it`, 1], [`Liability consideration`, 1], [`Conclusion naming the form`, 1]],
}));

// ================================================================ long answers
Q('l_partner_types', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Explain five types of partners.`,
  model: `1. Active partner: invests capital, shares profit and takes part in running the firm.\n2. Sleeping partner: invests and shares profit but does not take part in management.\n3. Secret partner: shares in management and profit, but his connection with the firm is not known to the public.\n4. Nominal partner: lends his name only, with no capital or share in profit, though he is liable to outsiders.\n5. Partner by estoppel: not a real partner, but liable because his conduct led others to believe he was one.`,
  sol: `Five types, each described in a line.`,
  scheme: [[`Active partner`, 1], [`Sleeping partner`, 1], [`Secret partner`, 1], [`Nominal partner`, 1], [`Partner by estoppel`, 1]],
}));
Q('l_company_stages', long({
  t: 3, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Describe the stages in forming a public company, including the dated note on commencing business.`,
  model: `1. Promotion: promoters find a business idea, study its feasibility, choose a name and arrange professionals and documents.\n2. Incorporation: the memorandum, articles and other papers are filed with the Registrar, who issues a certificate of incorporation, and the company comes into being.\n3. Capital subscription: a public company issues a prospectus and the public applies for shares.\n4. Commencement of business: as of 2024 a company with share capital files a declaration, introduced in 2019; older books speak of a certificate of commencement.`,
  sol: `Four stages with the dated note.`,
  scheme: [[`Promotion explained`, 1], [`Incorporation with certificate`, 1], [`Capital subscription and prospectus`, 1], [`Commencement declaration`, 1], [`Correct order and dated note`, 1]],
}));
Q('l_coop', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Explain any five features of a cooperative society.`,
  model: `1. Voluntary membership: anyone with a common interest may join or leave freely.\n2. Legal status: registration makes it a separate legal entity with perpetual succession.\n3. Limited liability: members are liable only up to their capital contribution.\n4. Democratic control: every member has one vote, whatever his shareholding.\n5. Service motive: the main aim is the welfare of members, so surplus is shared on fair rules, not merely taken as profit.`,
  sol: `Any five features.`,
  scheme: [[`Voluntary membership`, 1], [`Legal status`, 1], [`Limited liability`, 1], [`Democratic control`, 1], [`Service motive`, 1]],
}));
Q('l_jhf', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Explain the features of a Joint Hindu Family business, in any five points.`,
  model: `1. Formation: it arises from the Hindu Undivided Family under Hindu law, without a separate agreement.\n2. Membership: members become coparceners by birth; as of 2024, daughters are coparceners too.\n3. Management: the eldest member, the Karta, controls the business.\n4. Liability: the Karta's is unlimited; the coparceners' is limited to their share.\n5. Continuity: the death of the Karta does not end it; the next senior member steps up.`,
  sol: `Any five features.`,
  scheme: [[`Formation under Hindu law`, 1], [`Membership by birth`, 1], [`Karta controls`, 1], [`Liability contrast`, 1], [`Continuity`, 1]],
}));
Q('l_choice_factors', long({
  t: 4, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: `Explain five factors that should be weighed when choosing a form of business organisation, with a short imagined example for each.`,
  model: `1. Cost and ease of setting up: a roadside tea stall needs only a sole proprietorship.\n2. Liability: two surgeons wanting to protect their homes may prefer a limited liability form.\n3. Continuity: a family wishing the business to outlive its founder may choose a company.\n4. Capital: a factory needing large funds suits a public company.\n5. Control: a baker who wants to decide everything alone chooses a sole proprietorship.\nNature of the business can also matter.`,
  sol: `Five factors, each with an example.`,
  scheme: [[`Cost and ease with example`, 1], [`Liability with example`, 1], [`Continuity with example`, 1], [`Capital with example`, 1], [`Control with example`, 1]],
}));
Q('l_private_public', long({
  t: 3, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: `Distinguish between a private company and a public company on any five points.`,
  model: `1. Members: private, minimum 2 and maximum 200 as of 2024; public, minimum 7 and no maximum.\n2. Directors: private, minimum 2; public, minimum 3.\n3. Transfer of shares: restricted in a private company; free in a public company.\n4. Public subscription: a private company cannot invite the public; a public company can.\n5. Name: ends with Private Limited for the first, and Limited for the second.`,
  sol: `Five points of difference.`,
  scheme: [[`Members`, 1], [`Directors`, 1], [`Transfer of shares`, 1], [`Public subscription`, 1], [`Name`, 1]],
}));
Q('l_sole_merits', long({
  t: 1, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: `Explain any five merits of a sole proprietorship.`,
  model: `1. Quick decisions: one person decides, so there is no delay in consulting others.\n2. Confidentiality: business secrets, such as recipes or prices, stay with the owner.\n3. Direct incentive: all profit belongs to the owner, which motivates hard work.\n4. Sense of accomplishment: success is the owner's own, giving personal satisfaction and pride.\n5. Ease of formation and closure: few legal formalities, so the business can be started or wound up quickly at low cost.`,
  sol: `Any five merits.`,
  scheme: [[`Quick decisions`, 1], [`Confidentiality`, 1], [`Direct incentive`, 1], [`Sense of accomplishment`, 1], [`Ease of formation and closure`, 1]],
}));

// ================================================================ case-based
Q('cb_bakery', caseQ({
  t: [1, 4], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined firm and person.)*`,
  passage: `**Naik Bakes (imagined), Chandpur**\n\nChandrika Naik started Naik Bakes with her own savings and decides the menu, prices and opening hours without asking anyone. All the profit is hers. When she wanted a second oven, she found that her savings and a small bank loan were not enough. A month-long illness last year forced her to close the shop completely. The bank manager reminded her that if the business ever failed, her own house could be sold to repay what the bakery owed.`,
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'application', stem: `Which form of business organisation does Naik Bakes follow?`, opts: [`Sole proprietorship`, `Partnership`, `Cooperative society`, `Private company`], sol: `One person owns, manages and controls the business, which is the sole proprietorship.` })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: `Quote the line that shows unlimited liability.`, model: `"**her own house could be sold to repay what the bakery owed**": personal property is exposed to business debts.`, sol: `The line about the house.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: `**Either** (i): Identify two limitations of this form of organisation that the passage shows.`, model: `1. Limited resources: her savings and a small loan could not finance a second oven.\n2. Lack of continuity: the shop had to close for a month during her illness.`, sol: `Two limitations tied to lines.`, scheme: [[`Limited resources with evidence`, 1], [`Lack of continuity with evidence`, 1]] }), [
      short({ t: 4, d: 4, c: 'evaluation', marks: 2, stem: `**Or** (ii): Chandrika wants to raise more money and share the work. Suggest a suitable form and give one reason.`, model: `She could form a partnership with one or two trusted people, which brings in more capital and shared management. Alternatively a private company would raise capital with limited liability; the reason is that her house would be safe from debts.`, sol: `A form with a reason linked to capital, work or liability.`, scheme: [[`A suitable form named`, 1], [`Reason linked to the passage`, 1]] }),
    ]),
  ],
}));
Q('cb_triveni', caseQ({
  t: 2, d: 4, c: 'application', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined firm and people.)*`,
  passage: `**Triveni Advisory (imagined), Hosur**\n\nMeera Kulkarni, Joseph D'Souza and Arif Sheikh signed a written agreement which names the firm, states the capital each brought and fixes the ratio ${PROFIT.ratio.join(':')} for sharing profit. Meera and Joseph run the office every day. Arif invested money but never attends; the firm's clients know he is a partner. In its first year the firm earned a profit of Rs ${fmt(PROFIT.total)}. Later a client's claim exceeded the firm's assets, and the client wished to recover the shortfall from whichever partner had personal wealth.`,
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', stem: `What type of partner is Arif?`, opts: [`Sleeping partner`, `Secret partner`, `Nominal partner`, `Active partner`], sol: `He invests and shares profit but takes no part in management, and his position is known, so he is a sleeping partner.` })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: `Quote the words that show the existence of a partnership deed.`, model: `"**signed a written agreement which names the firm, states the capital each brought and fixes the ratio**".`, sol: `The line about the written agreement.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 2, d: 4, c: 'application', marks: 2, stem: `**Either** (i): Find each partner's share of the first-year profit.`, model: `The total of the ratio is ${PROFIT.sum}. Meera gets Rs ${fmt(PROFIT.parts[0])}, Joseph Rs ${fmt(PROFIT.parts[1])} and Arif Rs ${fmt(PROFIT.parts[2])}.`, sol: `Divide the profit in the ratio.`, scheme: [[`Method: profit divided by ${PROFIT.sum} parts`, 1], [`Three correct shares`, 1]] }), [
      short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: `**Or** (ii): Which feature of a partnership allows the client to claim from one partner alone, and what does it mean?`, model: `It is unlimited liability, joint and several. Each partner is liable for all the debts of the firm, so a creditor may recover the whole shortfall from the personal property of any one of them.`, sol: `Unlimited, joint and several liability.`, scheme: [[`Unlimited liability, joint and several`, 1], [`Meaning applied to the creditor's claim`, 1]] }),
    ]),
  ],
}));
Q('cb_gokulpur', caseQ({
  t: [2, 4], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined cooperative and people.)*`,
  passage: `**Gokulpur Milk Producers' Society (imagined)**\n\nForty dairy farmers of Gokulpur, each owning two or three cows, formed a registered society so that middlemen would no longer pay them low prices. Every member, whether he supplies ten litres or a hundred, has a single vote at the annual meeting. Anyone may join or leave. A farmer who supplies more milk receives a larger bonus from the surplus, but the society's chief aim is to serve its members. Its funds are small, and the elected committee, made up of farmers with little business training, sometimes delays decisions.`,
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', stem: `At the annual meeting a farmer supplying a hundred litres has the same say as one supplying ten litres. Which feature is shown?`, opts: [`Democratic control`, `Limited resources`, `Unlimited liability`, `Perpetual succession alone`], sol: `Equal voting power irrespective of supply is democratic control.` })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: `Quote the line that shows voluntary membership.`, model: `"**Anyone may join or leave**".`, sol: `The line about joining and leaving.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: `**Either** (i): State two limitations of a cooperative society shown in the passage.`, model: `1. Limited funds: the society's own funds are small.\n2. Inefficiency in management: a committee of farmers with little business training delays decisions.`, sol: `Two limitations with evidence.`, scheme: [[`Limited funds`, 1], [`Management inefficiency`, 1]] }), [
      short({ t: 4, d: 4, c: 'evaluation', marks: 2, stem: `**Or** (ii): Would a sole proprietorship have suited these forty farmers better? Give two reasons.`, model: `No. A sole proprietorship has one owner and limited resources, so it could not pool milk or fund a chilling plant for forty farmers. It would also give them no equal say, defeating their aim of avoiding middlemen.`, sol: `A verdict supported by two reasons.`, scheme: [[`Verdict with resource reason`, 1], [`Control or aim reason`, 1]] }),
    ]),
  ],
}));
Q('cb_sahyadri', caseQ({
  t: [3, 4], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined company and people.)*`,
  passage: `**Sahyadri Looms Private Limited (imagined), Kolhapur**\n\nTwo founders registered Sahyadri Looms as a company with a name ending in Private Limited. Its shares cannot be sold to outsiders without the board's approval, and it has two directors. The founders now want a much larger factory and would like to sell shares to the general public, but the law does not allow this for their kind of company. They are considering a different kind of company, which needs more members and more directors, but can freely raise money from the public.`,
  parts: [
    child('a', mcq({ t: 3, d: 2, c: 'application', stem: `Sahyadri Looms is at present a`, opts: [`private company`, `public company`, `One Person Company`, `cooperative society`], sol: `The name, the share restriction, the two directors and the ban on public subscription describe a private company.` })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: `Quote the line that shows a restriction on transfer of shares.`, model: `"**Its shares cannot be sold to outsiders without the board's approval**".`, sol: `The line about the sale of shares.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: [3, 4], d: 4, c: 'analysis', marks: 2, stem: `**Either** (i): Name the kind of company the founders are considering and give two features that make it suitable for raising large funds.`, model: `They are considering a public company. It can invite the public to subscribe to its shares, and its shares are freely transferable, so a large pool of investors can be reached.`, sol: `Public company with two features.`, scheme: [[`Public company named`, 1], [`Two features linked to raising funds`, 1]] }), [
      short({ t: 3, d: 4, c: 'analysis', marks: 2, stem: `**Or** (ii): State the minimum number of members and directors that such a company needs, as of 2024.`, model: `As of 2024, a public company needs at least 7 members and at least 3 directors, whereas the private company at present needs only 2 members and 2 directors.`, sol: `Seven members and three directors.`, scheme: [[`Minimum 7 members`, 1], [`Minimum 3 directors`, 1]] }),
    ]),
  ],
}));
Q('cb_joshi', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined family business and people.)*`,
  passage: `**Joshi Spice Traders (imagined), Nagpur**\n\nJoshi Spice Traders is run by a Hindu Undivided Family. Dinkar Joshi, the eldest member, managed everything until his death last year. His daughter Anaya became a member of the business on her birth, as did her cousins. After Dinkar's death, the next senior member, his brother Sudhir, took charge and the shops opened as usual the following morning. When a supplier made a claim for an unpaid bill, Sudhir was told that he would be answerable without limit, while the younger members could lose only their share in the business.`,
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'application', stem: `How did Anaya become a member of the business?`, opts: [`By birth`, `By agreement with the Karta`, `By paying a share`, `By being appointed by the Registrar`], sol: `Membership of this form is acquired by birth, which is why she is a coparcener.` })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: `Quote the line that shows continuity of the business.`, model: `"**the shops opened as usual the following morning**": the business carried on after the Karta's death.`, sol: `The line about the shops opening.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: `**Either** (i): Who is the Karta now, and how does his liability differ from that of the younger members?`, model: `Sudhir is now the Karta. His liability is unlimited, so he can be made to pay from personal property, whereas the younger coparceners are liable only up to their share in the business.`, sol: `Sudhir; unlimited versus limited.`, scheme: [[`Sudhir is the Karta`, 1], [`Unlimited versus limited to share`, 1]] }), [
      short({ t: 1, d: 3, c: 'understanding', marks: 2, stem: `**Or** (ii): As of 2024, what is the position of a daughter such as Anaya, and which amendment gave her that position?`, model: `As of 2024, a daughter is a coparcener by birth, the same as a son. This position was given by the Hindu Succession (Amendment) Act 2005.`, sol: `Coparcener by birth; 2005 amendment.`, scheme: [[`Coparcener by birth`, 1], [`Hindu Succession (Amendment) Act 2005`, 1]] }),
    ]),
  ],
}));
