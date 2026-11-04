// Build CBSE 11 Business Studies ch02 Forms of Business Organisation. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-11-business-studies-ch02/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-business-studies-ch01/src/lib.mjs';

setUnit('cbse-11-business-studies-ch02', 'economics-commerce');
const { fmt, BAKER, PROFIT, FIRM, SHARE } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG visuals
const vTree = (() => {
  const s = new Svg(660, 330);
  const w = 118, gap = 8, left = 19, top = 110, h = 50;
  const names = [['Sole', 'proprietorship'], ['Joint Hindu', 'Family business'], ['Partnership', ''], ['Cooperative', 'society'], ['Company', '']];
  s.rect(230, 14, 200, 40, { fill: 'accent', fillOpacity: 0.18, color: 'accent', sw: 2 });
  s.text(330, 34, 'Forms of business organisation', { size: 14, bold: true });
  const centres = names.map((_, i) => left + i * (w + gap) + w / 2);
  s.line(330, 54, 330, 82, {});
  s.line(centres[0], 82, centres[4], 82, {});
  names.forEach(([a, b], i) => {
    const x = left + i * (w + gap);
    s.line(centres[i], 82, centres[i], top, {});
    s.rect(x, top, w, h, { fill: 'fill', color: i === 4 ? 'accent' : undefined, sw: i === 4 ? 2 : 1.6 });
    if (b) { s.text(centres[i], top + 18, a, { size: 13, bold: true }); s.text(centres[i], top + 36, b, { size: 13, bold: true }); }
    else s.text(centres[i], top + h / 2, a, { size: 13, bold: true });
  });
  const subs = ['Private company', 'Public company', 'One Person Company'];
  const sw = 126, sg = 10, sx0 = 641 - (3 * sw + 2 * sg), sy = 230;
  s.line(centres[4], top + h, centres[4], 200, {});
  s.line(sx0 + sw / 2, 200, sx0 + 2 * (sw + sg) + sw / 2, 200, {});
  subs.forEach((t, i) => {
    const x = sx0 + i * (sw + sg);
    s.line(x + sw / 2, 200, x + sw / 2, sy, {});
    s.rect(x, sy, sw, 40, { fill: 'fill', color: 'muted', sw: 1.4 });
    s.text(x + sw / 2, sy + 20, t, { size: 12 });
  });
  s.text(20, 240, 'Ownership by one person,', { anchor: 'start', size: 12, muted: true });
  s.text(20, 258, 'a family, partners, members', { anchor: 'start', size: 12, muted: true });
  s.text(20, 276, 'or shareholders', { anchor: 'start', size: 12, muted: true });
  return s.visual('Tree of the forms of business organisation: sole proprietorship, Joint Hindu Family business, partnership, cooperative society and company, with the company branching into private company, public company and One Person Company', 'Five main forms; the company has three kinds.');
})();

const vCompare = (() => {
  const s = new Svg(760, 330);
  const x0 = 80, cw = 134, top = 10, hh = 44, rh = 66;
  const cols = [['Sole', 'proprietorship'], ['Joint Hindu', 'Family'], ['Partnership', ''], ['Cooperative', ''], ['Company', '']];
  const rows = [
    ['Liability', [['Unlimited', ''], ['Karta: unlimited', 'others: to share'], ['Unlimited,', 'joint and several'], ['Limited', ''], ['Limited', '']]],
    ['Continuity', [['Ends with', 'the owner'], ['Continues after', 'the Karta'], ['Uncertain; ends', 'on exit or death'], ['Continues', ''], ['Perpetual', '']]],
    ['Members', [['One', ''], ['Family members', 'by birth'], ['2 to 50', 'as of 2024'], ['Open and', 'voluntary'], ['Private 2 to 200;', 'public 7 or more']]],
    ['Control', [['The owner', 'alone'], ['The Karta', ''], ['Partners, by', 'agreement'], ['One member,', 'one vote'], ['Board of', 'directors']]],
  ];
  cols.forEach(([a, b], i) => {
    const x = x0 + i * cw;
    s.rect(x + 2, top, cw - 4, hh, { fill: 'accent', fillOpacity: 0.16, color: 'accent', sw: 1.4, rx: 6 });
    if (b) { s.text(x + cw / 2, top + 15, a, { size: 12, bold: true }); s.text(x + cw / 2, top + 31, b, { size: 12, bold: true }); }
    else s.text(x + cw / 2, top + hh / 2, a, { size: 12, bold: true });
  });
  rows.forEach(([label, cells], r) => {
    const y = top + hh + 6 + r * rh;
    s.text(6, y + rh / 2 - 3, label, { anchor: 'start', size: 12, bold: true });
    cells.forEach(([a, b], i) => {
      const x = x0 + i * cw;
      s.rect(x + 2, y, cw - 4, rh - 8, { fill: 'fill', color: 'muted', sw: 1.2, rx: 6 });
      if (b) { s.text(x + cw / 2, y + 20, a, { size: 11 }); s.text(x + cw / 2, y + 38, b, { size: 11 }); }
      else s.text(x + cw / 2, y + (rh - 8) / 2, a, { size: 11 });
    });
  });
  return s.visual('Comparison chart of five forms of organisation on liability, continuity, members and control: sole proprietorship has unlimited liability, ends with the owner, has one member and is controlled by the owner; Joint Hindu Family has unlimited liability for the Karta only, continues, has family members by birth and is controlled by the Karta; partnership has unlimited joint and several liability, uncertain continuity, 2 to 50 partners as of 2024 and control by agreement; cooperative has limited liability, continues, open voluntary membership and one member one vote; company has limited liability, perpetual succession, private 2 to 200 or public 7 or more members and control by a board of directors', 'Compare the forms on the same four tests.');
})();

const vStages = (() => {
  const s = new Svg(720, 250);
  const bw = 152, gap = 26, left = 14, top = 20, bh = 46;
  const stages = [['1. Promotion', ['Idea, feasibility,', 'name, documents']], ['2. Incorporation', ['Registrar issues', 'certificate']], ['3. Capital', ['subscription', '']], ['4. Commencement', ['Declaration filed', 'as of 2024']]];
  const notesLines = [['Idea, feasibility,', 'name, documents'], ['Registrar issues', 'certificate of', 'incorporation'], ['Prospectus, share', 'applications, allotment', '(public company only)'], ['Declaration filed', 'with the Registrar', '(as of 2024)']];
  stages.forEach(([a, b], i) => {
    const x = left + i * (bw + gap);
    s.rect(x, top, bw, bh, { fill: i === 2 ? 'fill' : 'accent', fillOpacity: i === 2 ? undefined : 0.18, color: i === 2 ? 'muted' : 'accent', sw: 1.8, dash: i === 2 });
    if (i === 2) { s.text(x + bw / 2, top + 15, '3. Capital', { size: 13, bold: true }); s.text(x + bw / 2, top + 33, 'subscription', { size: 13, bold: true }); }
    else s.text(x + bw / 2, top + bh / 2, a, { size: 13, bold: true });
    notesLines[i].forEach((t, k) => s.text(x + bw / 2, top + bh + 26 + k * 18, t, { size: 12, muted: true }));
    if (i < 3) s.arrow(x + bw + 3, top + bh / 2, x + bw + gap - 3, top + bh / 2, { sw: 1.8 });
  });
  s.text(360, 188, 'A private company cannot invite the public, so it skips stage 3.', { size: 13 });
  s.text(360, 214, 'Older books call stage 4 a certificate of commencement.', { size: 12, muted: true });
  return s.visual('Flow of the four stages of forming a company: promotion, incorporation, capital subscription for a public company only, and commencement of business with a declaration as of 2024', 'The four stages in order.');
})();

const vPartners = (() => {
  const s = new Svg(700, 320);
  const bw = 156, gap = 12, left = 20;
  s.rect(250, 10, 200, 36, { fill: 'accent', fillOpacity: 0.18, color: 'accent', sw: 2 });
  s.text(350, 28, 'Types of partners', { size: 14, bold: true });
  const row1 = [['Active', ['Invests, shares profit,', 'works in the firm']], ['Sleeping', ['Invests, shares profit,', 'does not manage']], ['Secret', ['Manages and shares', 'profit; not known', 'to the public']], ['Nominal', ['Lends only a name;', 'no capital, no profit']]];
  const cx1 = row1.map((_, i) => left + i * (bw + gap) + bw / 2);
  s.line(350, 46, 350, 66, {});
  s.line(cx1[0], 66, cx1[3], 66, {});
  row1.forEach(([n, t], i) => {
    const x = left + i * (bw + gap);
    s.line(cx1[i], 66, cx1[i], 80, {});
    s.rect(x, 80, bw, 84, { fill: 'fill', color: 'muted', sw: 1.4 });
    s.text(cx1[i], 98, n, { size: 13, bold: true });
    t.forEach((l, k) => s.text(cx1[i], 120 + k * 17, l, { size: 12, muted: true }));
  });
  s.text(350, 186, 'Recognised by law or by conduct', { size: 12, muted: true });
  const row2 = [['By estoppel', ['Not a partner, but liable', 'because conduct misled']], ['By holding out', ['Held out as a partner', 'and does not deny it']], ['Minor', ['Admitted to the', 'benefits only']]];
  const x2 = (700 - (3 * bw + 2 * gap)) / 2;
  row2.forEach(([n, t], i) => {
    const x = x2 + i * (bw + gap);
    s.rect(x, 200, bw, 84, { fill: 'fill', color: 'muted', sw: 1.4 });
    s.text(x + bw / 2, 218, n, { size: 13, bold: true });
    t.forEach((l, k) => s.text(x + bw / 2, 242 + k * 17, l, { size: 12, muted: true }));
  });
  return s.visual('Chart of seven types of partners: active, sleeping, secret and nominal partners by role in the firm, and partner by estoppel, partner by holding out and minor recognised by law or by conduct', 'Seven types, by role and by law.');
})();

// ---------------------------------------------------------------- tables and flows
const vRoute1 = flow('LR', ['Sole proprietorship', 'Joint Hindu Family', 'Partnership', 'Types of partners', 'Deed and registration'], 'Route map of Part 1: sole proprietorship, Joint Hindu Family business, partnership, types of partners, and partnership deed and registration', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Cooperative society', 'Company', 'Private and public', 'Stages of formation', 'Choosing a form'], 'Route map of Part 2: cooperative society, company, private and public company, stages of formation, and choosing a form', 'Part 2 at a glance');
const vSoleFeat = table(['Feature', 'Meaning'], [
  ['One owner', 'Owned, managed and controlled by one person'],
  ['Unlimited liability', 'Personal property can pay business debts'],
  ['Sole risk bearer', 'All profit and all loss belong to the owner'],
  ['No separate entity', 'Owner and business are one in law'],
  ['Easy to start and close', 'Few legal formalities'],
  ['Lack of continuity', 'The life of the business depends on the owner'],
], 'Table of six features of a sole proprietorship: one owner, unlimited liability, sole risk bearer, no separate entity, easy formation and closure, and lack of continuity');
const vSoleML = table(['Merits', 'Limitations'], [
  ['Quick decisions', 'Limited resources'],
  ['Confidentiality', 'Limited life'],
  ['Direct incentive', 'Unlimited liability'],
  ['Sense of accomplishment', 'Limited managerial ability'],
  ['Ease of formation and closure', ''],
], 'Table of the merits and limitations of a sole proprietorship');
const vBaker = table(['Item', 'Amount (Rs)'], [
  ['Owed to creditors by an imagined shop', fmt(BAKER.owed)],
  ['Assets of the shop that can be sold', fmt(BAKER.assets)],
  ['Shortfall', fmt(BAKER.gap)],
  ['Who must meet the shortfall', 'The owner, from personal property'],
], 'Worked example table: an imagined shop owes the shortfall between debts and assets, which the sole proprietor must pay from personal property because liability is unlimited', 'Imagined figures. Subtract assets from debts.');
const vJhf = table(['Point', 'Joint Hindu Family business'], [
  ['Owners', 'Members of a Hindu Undivided Family'],
  ['Governed by', 'Hindu law, not by an agreement'],
  ['Membership', 'By birth; members are coparceners'],
  ['Manager', 'The eldest member, the Karta'],
  ['Systems', 'Mitakshara in most of India; Dayabhaga in West Bengal (as commonly taught)'],
], 'Table of the Joint Hindu Family business: owned by a Hindu Undivided Family, governed by Hindu law, membership by birth, managed by the Karta, with the Mitakshara and Dayabhaga systems as commonly taught');
const vJhfLiab = flow('LR', ['Karta: unlimited liability', 'Coparceners: liability limited to their share', 'Business continues after the Karta dies'], 'Flow showing the Karta with unlimited liability, coparceners with liability limited to their share, and the business continuing after the death of the Karta');
const vJhfML = table(['Merits', 'Limitations'], [
  ['Effective control by the Karta', 'Limited capital'],
  ['Continuity of the business', 'Unlimited liability of the Karta'],
  ['Limited liability of coparceners', 'Dominance of the Karta'],
  ['Secrecy within the family', 'Limited managerial skill'],
], 'Table of merits and limitations of the Joint Hindu Family business');
const vPartFeat = table(['Feature', 'Meaning'], [
  ['Formation', 'By agreement, written or oral'],
  ['Liability', 'Unlimited, joint and several'],
  ['Risk bearing', 'Shared by the partners'],
  ['Decisions and control', 'Shared; settled by the agreement'],
  ['Continuity', 'Affected by retirement, death or insolvency'],
  ['Members', 'Minimum 2; maximum 50 as of 2024'],
  ['Mutual agency', 'Each partner is agent and principal'],
], 'Table of seven features of a partnership: formation by agreement, unlimited liability, risk bearing, shared control, continuity, number of members and mutual agency');
const vAgency = flow('LR', ['Partner A acts for the firm', 'Acts as agent of B and C', 'B and C are bound'], 'Flow of mutual agency: an act by partner A for the firm is an act as agent of B and C, so they are bound');
const vProfit = table(['Partner (imagined firm)', 'Ratio', 'Share of profit (Rs)'], [
  ['Meera', String(PROFIT.ratio[0]), fmt(PROFIT.parts[0])],
  ['Joseph', String(PROFIT.ratio[1]), fmt(PROFIT.parts[1])],
  ['Arif', String(PROFIT.ratio[2]), fmt(PROFIT.parts[2])],
  ['Total', String(PROFIT.sum), fmt(PROFIT.total)],
], 'Worked example table: a profit of four lakh eighty thousand rupees shared in the ratio three, two and one gives two lakh forty thousand, one lakh sixty thousand and eighty thousand rupees', `Profit of Rs ${fmt(PROFIT.total)}, divided into ${PROFIT.sum} equal parts.`);
const vJoint = table(['Item', 'Amount (Rs)'], [
  ['Debt of an imagined firm', fmt(FIRM.owed)],
  ['Firm assets available', fmt(FIRM.assets)],
  ['Shortfall', fmt(FIRM.gap)],
  ['Creditor may claim the whole shortfall from', 'Any one partner'],
], 'Table: a firm owing six lakh rupees with assets of three lakh eighty thousand has a shortfall of two lakh twenty thousand, which the creditor may claim in full from any one partner because liability is joint and several', 'Joint and several: each partner can be asked to pay the whole.');
const vPartnership = table(['Basis', 'Types'], [
  ['By duration', 'Partnership at will; partnership for a particular venture'],
  ['By liability', 'General partnership; limited liability partnership (LLP Act 2008)'],
], 'Table of types of partnership by duration and by liability');
const vDeed = table(['Usually written in the deed', 'Why'], [
  ['Name of the firm and nature of business', 'Identity and scope'],
  ['Capital of each partner', 'Fixes the stakes'],
  ['Profit-sharing ratio', 'Prevents disputes'],
  ['Salaries and interest', 'Rewards work and capital'],
  ['Admission and retirement rules', 'Smooth changes of membership'],
], 'Table of what a partnership deed usually contains and why: name and nature of business, capital, profit-sharing ratio, salaries and interest, and admission and retirement rules');
const vRegis = table(['If the firm is not registered (as of 2024)', 'Effect'], [
  ['Firm against third parties', 'Cannot sue to enforce contract rights'],
  ['Partner against firm or partners', 'Cannot sue to enforce deed rights'],
  ['Registration itself', 'Optional, not compulsory'],
], 'Table of consequences of not registering a partnership as of 2024: the firm cannot sue third parties and a partner cannot sue the firm or other partners, although registration is optional');
const vSummary1 = table(['Form', 'Remember'], [
  ['Sole proprietorship', 'One owner, unlimited liability, quick decisions, limited resources'],
  ['Joint Hindu Family', 'Karta manages; coparceners by birth; Karta unlimited, others to share'],
  ['Partnership', 'Agreement; 2 to 50 as of 2024; unlimited joint and several liability'],
  ['Types of partners', 'Active, sleeping, secret, nominal, estoppel, holding out, minor'],
], 'Summary table of Part 1: sole proprietorship, Joint Hindu Family business, partnership and types of partners');
const vTips1 = table(['Common mistake', 'Fix'], [
  ['Writing that coparceners have unlimited liability', 'Only the Karta does'],
  ['Calling partnership registration compulsory', 'It is optional; the penalty is loss of the right to sue'],
  ['Mixing secret and sleeping partners', 'Secret: manages but unknown. Sleeping: known but inactive'],
  ['Quoting limits without a date', 'Add as of 2024 for numbers fixed by law'],
], 'Exam tips table: four common mistakes about the Joint Hindu Family business, partnership registration, types of partners and dated legal limits');

const vCoopFeat = table(['Feature', 'Meaning'], [
  ['Voluntary membership', 'Join and leave freely'],
  ['Legal status', 'Registered: Cooperative Societies Act 1912 or a state law'],
  ['Limited liability', 'Members risk only their contribution'],
  ['Democratic control', 'One member, one vote'],
  ['Service motive', 'Welfare of members comes first'],
], 'Table of five features of a cooperative society: voluntary membership, legal status, limited liability, democratic control and service motive');
const vCoopTypes = table(['Type', 'What it does'], [
  ['Consumer\'s', 'Buys goods in bulk for members at fair prices'],
  ['Producer\'s', 'Supplies raw materials and tools to small producers'],
  ['Marketing', 'Sells members\' products jointly'],
  ['Farmer\'s', 'Helps farmers with inputs, equipment and sale'],
  ['Credit', 'Lends to members from pooled savings'],
  ['Housing', 'Builds or buys homes for members'],
], 'Table of six types of cooperatives: consumer, producer, marketing, farmer, credit and housing');
const vCoopML = table(['Merits', 'Limitations'], [
  ['Equal voting rights', 'Limited funds'],
  ['Limited liability', 'Inefficient management'],
  ['Stable existence', 'Delays and red tape'],
  ['Economy in operation', 'Lack of secrecy'],
  ['Ease of formation', 'Government control'],
], 'Table of merits and limitations of a cooperative society');
const vCompFeat = table(['Feature', 'Meaning'], [
  ['Artificial person', 'Created by law, acts through directors'],
  ['Separate legal entity', 'Owns property and sues in its own name'],
  ['Formation by registration', 'Under the Companies Act 2013'],
  ['Perpetual succession', 'Continues despite changes in members'],
  ['Board of directors', 'Controls the company for the shareholders'],
  ['Limited liability', 'Shareholder pays only the unpaid amount on shares'],
  ['Common seal', 'Optional since the 2015 amendment, as of 2024'],
], 'Table of features of a company: artificial person, separate legal entity, formation by registration, perpetual succession, board of directors, limited liability and optional common seal as of 2024');
const vShares = table(['Item (imagined shareholder)', 'Value'], [
  ['Shares held', String(SHARE.n)],
  ['Face value per share (Rs)', String(SHARE.face)],
  ['Paid per share (Rs)', String(SHARE.paid)],
  ['Unpaid per share (Rs)', String(SHARE.face - SHARE.paid)],
  ['Most the shareholder can be asked to pay (Rs)', fmt(SHARE.unpaid)],
], 'Worked example table: a shareholder with five hundred shares of face value ten rupees, six rupees paid, can be asked to pay at most two thousand rupees, the unpaid amount', 'Limited liability: only the unpaid amount on shares.');
const vPrivPub = table(['Point', 'Private company', 'Public company'], [
  ['Members (as of 2024)', 'Minimum 2, maximum 200 (employees excluded)', 'Minimum 7, no maximum'],
  ['Directors', 'Minimum 2', 'Minimum 3'],
  ['Transfer of shares', 'Restricted', 'Freely transferable'],
  ['Invites the public', 'Cannot', 'Can'],
  ['Name ends with', 'Private Limited', 'Limited'],
], 'Table comparing a private company and a public company as of 2024 on members, directors, transfer of shares, public invitation and name');
const vDated = table(['Point', 'Position as of 2024'], [
  ['Common seal', 'Optional, since an amendment in 2015'],
  ['One Person Company', 'One member; introduced by the Companies Act 2013'],
  ['Declaration before business', 'Filed by a company with share capital; introduced in 2019'],
  ['Older wording', 'Certificate of commencement'],
], 'Table of dated points: the common seal is optional since 2015, the One Person Company was introduced by the 2013 Act, a declaration before commencing business was introduced in 2019, and older books mention a certificate of commencement');
const vPromo = flow('LR', ['Spot an opportunity', 'Study feasibility', 'Approve a name', 'Prepare documents'], 'Flow of promotion activities: spot a business opportunity, study its feasibility, get a name approved and prepare the documents', 'What promoters do');
const vIncorp = table(['Stage', 'Key points'], [
  ['Promotion', 'Idea, feasibility, name, memorandum and articles prepared'],
  ['Incorporation', 'Documents filed with the Registrar of Companies; certificate issued'],
  ['Capital subscription', 'Public company only: prospectus, applications, allotment'],
  ['Commencement', 'Declaration filed as of 2024'],
], 'Table of the stages of company formation with their key points');
const vCompML = table(['Merits', 'Limitations'], [
  ['Limited liability', 'Complex and costly formation'],
  ['Perpetual succession', 'Delay in decisions'],
  ['Large resources', 'Lack of secrecy'],
  ['Professional management', 'Many legal rules'],
  ['Scope for growth', 'Impersonal working'],
], 'Table of merits and limitations of a company');
const vFactors = table(['Factor', 'Question to ask'], [
  ['Cost and ease of setting up', 'How costly and slow is formation?'],
  ['Liability', 'Can the owners risk personal property?'],
  ['Continuity', 'Must the business outlive its founders?'],
  ['Management ability', 'Do the owners have the skills?'],
  ['Capital', 'How much money is needed?'],
  ['Degree of control', 'How much say do the owners want?'],
  ['Nature of the business', 'Is it small and local or large and risky?'],
], 'Table of seven factors in choosing a form of organisation: cost and ease of setting up, liability, continuity, management ability, capital, degree of control and nature of the business');
const vChoiceEx = table(['Imagined case', 'Suitable form', 'Main reason'], [
  ['Roshni opens a bakery alone with her savings', 'Sole proprietorship', 'Low cost, full control, small capital'],
  ['Three friends open a consultancy', 'Partnership or limited liability partnership', 'Shared skills and capital; liability decision'],
  ['Thirty dairy farmers sell milk together', 'Cooperative society', 'Welfare motive, equal voting'],
  ['A factory needing very large capital', 'Public company', 'Wide funds and continuity'],
], 'Worked example table matching four imagined cases to forms: bakery to sole proprietorship, three friends to partnership, dairy farmers to cooperative society and a large factory to public company', 'Match the case to the factors.');
const vSummary2 = table(['Idea', 'Remember'], [
  ['Cooperative society', 'Voluntary, registered, limited liability, one member one vote, service motive'],
  ['Company', 'Separate entity, perpetual succession, limited liability, board of directors'],
  ['Private and public', 'Private 2 to 200 members; public 7 or more, as of 2024'],
  ['Stages', 'Promotion, incorporation, capital subscription, commencement'],
  ['Choice', 'Cost, liability, continuity, management, capital, control, nature'],
], 'Summary table of Part 2: cooperative society, company, private and public company, stages of formation and factors for choice');
const vTips2 = table(['Common mistake', 'Fix'], [
  ['Giving 50 or 200 without a date', 'Write as of 2024 beside every legal number'],
  ['Naming a certificate of commencement as current', 'Say a declaration is filed as of 2024; older books use the old term'],
  ['Mixing private and public company directors', 'Private 2, public 3'],
  ['Choosing a form without a reason', 'Link at least two factors to the case'],
], 'Exam tips table: four common mistakes about dated legal numbers, commencement of business, directors and choosing a form without reasons');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Forms of Business Organisation, Part 1: Proprietorship, Family Business and Partnership',
  goals: [
    'Explain the features, merits and limitations of a sole proprietorship',
    'Describe the Joint Hindu Family business, its Karta and coparceners',
    'Explain partnership, its features, types of partners and types of partnership',
    'Describe the partnership deed and the effects of non-registration, as of 2024',
  ],
  slides: [
    sl('title', 'Forms of Business Organisation', {
      b: 'Part 1: the **sole proprietorship**, the **Joint Hindu Family business** and the **partnership**.',
      v: vRoute1,
      n: 'A baker opening a small shop, a family running a spice trade and three friends starting a consultancy all need to decide how to organise their business. In this part we study three forms: the sole proprietorship, the Joint Hindu Family business and the partnership, and see who bears the risk in each.',
    }),
    sl('concept', 'The forms at a glance', {
      b: 'Every business must pick a **form of organisation**, which decides who owns it, who bears risk and how long it lasts.',
      bl: ['One owner: sole proprietorship', 'A family: Joint Hindu Family business', 'Two or more persons: partnership', 'Members with a common need: cooperative society', 'Shareholders: company'],
      v: vTree,
      n: 'The form of organisation decides who owns the business, who takes the risk and how long it lasts. The tree shows five main forms. In this part we look at the first three. The cooperative society and the company, with its private, public and one person kinds, come in the next part.',
    }),
    sl('concept', 'Sole proprietorship', {
      b: 'A **sole proprietorship** is a business owned, managed and controlled by one person, who receives all the profit and bears all the risk.',
      v: vSoleFeat,
      n: 'A sole proprietorship is a business owned, managed and controlled by one person. That person receives all the profit and bears all the risk. The owner and the business are one in law, so there is no separate legal entity, and the owner has unlimited liability. It is easy to start and to close, but it usually ends with the owner.',
    }),
    sl('concept', 'Merits and limitations of a sole proprietorship', {
      bl: ['Quick decisions and full control', 'Confidentiality and direct incentive', 'But resources, life and skills are limited'],
      v: vSoleML,
      n: 'The strengths are quick decisions, confidentiality, a direct reward for effort, a sense of accomplishment and easy formation and closure. The weaknesses are limited resources, limited life, unlimited liability and limited managerial ability, because one person cannot be an expert in everything.',
    }),
    sl('example', 'Worked example 1: unlimited liability', {
      b: 'An imagined shop owes more than its assets are worth.',
      bl: ['Step 1: Find the debt and the assets.', 'Step 2: Subtract to find the shortfall.', 'Step 3: Decide who pays. Owner and business are one, so the owner does.'],
      v: vBaker,
      n: 'Take an imagined shop whose debts are larger than its assets. Subtract the assets from the debts to get the shortfall. Because a sole proprietor and the business are one in law, the shortfall is recovered from the owner, even if it means selling the owner home or savings. This is what unlimited liability means.',
    }),
    sl('check', 'Quick check: a merit of the form', {
      b: 'Identify the merit shown in an imagined tailor shop.',
      chk: 'mc_sole_merit',
      n: 'Read the case carefully and ask which strength of the sole proprietorship it shows. Think about who decides, and how fast.',
    }),
    sl('concept', 'Joint Hindu Family business', {
      b: 'A **Joint Hindu Family business** is owned and carried on by the members of a Hindu Undivided Family and is governed by Hindu law.',
      v: vJhf,
      n: 'A Joint Hindu Family business is owned and carried on by the members of a Hindu Undivided Family, and it is governed by Hindu law. The eldest member, called the Karta, manages it. Members are called coparceners and join by birth. As commonly taught, the Mitakshara system applies in most of India and the Dayabhaga system in West Bengal.',
    }),
    sl('concept', 'Liability, continuity and a dated note', {
      bl: ['The Karta has unlimited liability.', 'Coparceners are liable only up to their share.', 'The business goes on after the Karta dies.', 'As of 2024, daughters are coparceners by birth, as per the Hindu Succession Amendment Act of 2005.'],
      v: vJhfLiab,
      n: 'The Karta has unlimited liability, but the coparceners are liable only up to their share in the business. If the Karta dies, the business goes on and the next senior member takes charge. Note the date: since the Hindu Succession Amendment Act of two thousand five, daughters are coparceners by birth, as of two thousand twenty four.',
    }),
    sl('concept', 'Merits and limitations of the family business', {
      v: vJhfML,
      bl: ['Strengths: control, continuity, secrecy', 'Weaknesses: capital, Karta unlimited, dominance'],
      n: 'The family business has strong control under the Karta, continuity after his death, limited liability for coparceners and secrecy within the family. Its limits are small capital, the unlimited liability of the Karta, the risk that one strong Karta dominates others, and a shortage of managerial skills outside the family.',
    }),
    sl('check', 'Quick check: continuity', {
      b: 'True or false: what happens when the Karta dies?',
      chk: 'tf_jhf_death',
      n: 'Think about whether the business depends on one person, or on the family as a whole.',
    }),
    sl('concept', 'Partnership: meaning and features', {
      b: 'A **partnership** is the relationship between persons who have agreed to share the profits of a business carried on by all, or by any of them acting for all (Indian Partnership Act 1932).',
      v: vPartFeat,
      n: 'The Indian Partnership Act of nineteen thirty two sees a partnership as a relation between persons who have agreed to share the profits of a business carried on by all of them, or by any of them acting for all. It begins with an agreement, liability is unlimited, and there must be at least two partners and, as of two thousand twenty four, no more than fifty.',
    }),
    sl('concept', 'Mutual agency', {
      b: 'Each partner is both an **agent** and a **principal**. An act of one partner within the business of the firm binds the others.',
      v: vAgency,
      n: 'In a partnership, each partner is an agent of the others and also a principal. So when one partner makes a contract for the firm, within the scope of its business, the other partners are bound by it. This feature is called mutual agency, and it is why partners must trust one another.',
    }),
    sl('diagram', 'Types of partners', {
      v: vPartners,
      n: 'Partners differ in what they do and what others know. An active partner works in the firm. A sleeping partner invests but does not manage. A secret partner manages, but the public does not know. A nominal partner only lends a name. A partner by estoppel or by holding out is liable because of conduct. A minor is admitted to the benefits only.',
    }),
    sl('check', 'Quick check: types of partners', {
      b: 'Match each description with its type of partner.',
      chk: 'mt_partners',
      n: 'For each description, ask whether the person works, invests, is known to the public, or only lends a name.',
    }),
    sl('example', 'Worked example 2: sharing profit and facing debt', {
      b: 'An imagined advisory firm earns a profit, and later owes more than it owns.',
      bl: ['Step 1: Add the ratio parts.', 'Step 2: Divide the profit by the total, then multiply by each part.', 'Step 3: Debt: joint and several liability lets a creditor claim the whole from any one partner.'],
      v: vProfit,
      n: 'Here the profit is shared in the ratio three, two and one. Add the parts to get six. Divide the profit by six and multiply by each part of each partner. If the firm later owes more than it owns, joint and several liability means a creditor may claim the whole shortfall from any one partner, who must then recover the rest from the others.',
    }),
    sl('concept', 'Joint and several liability', {
      v: vJoint,
      bl: ['Joint: all partners are liable together.', 'Several: each is liable for the whole, separately.'],
      n: 'Look at this imagined firm. Its debts are larger than its assets, so there is a shortfall. Because the liability of partners is joint and several, a creditor may claim the whole shortfall from any single partner, even a partner who holds a small share. Such a partner can then claim a contribution from the others.',
    }),
    sl('concept', 'Types of partnership and the deed', {
      b: 'A **partnership deed** is the written agreement among the partners. A **limited liability partnership**, governed by the LLP Act 2008, is a separate kind with limited liability.',
      v: vPartnership,
      n: 'By duration, a partnership may be at will, with no fixed period, or for a particular venture. By liability, it may be a general partnership, with unlimited liability, or a limited liability partnership, which is governed by the Limited Liability Partnership Act of two thousand eight and gives its partners limited liability.',
    }),
    sl('concept', 'Contents of a partnership deed', {
      v: vDeed,
      bl: ['A written deed avoids disputes', 'It is a good practice, not a legal necessity'],
      n: 'A partnership deed is a written agreement. It usually states the name of the firm, the nature of the business, the capital of each partner, the profit sharing ratio, salaries and interest, and the rules for admitting and retiring partners. Putting these in writing prevents later quarrels.',
    }),
    sl('concept', 'Registration of a partnership', {
      v: vRegis,
      bl: ['Registration is optional.', 'Without it, the right to sue is limited, as of 2024.'],
      n: 'Registering a partnership is optional. But as of two thousand twenty four, an unregistered firm cannot sue third parties to enforce its contract rights, and a partner cannot sue the firm or the other partners to enforce rights under the deed. For this reason most firms choose to register.',
    }),
    sl('check', 'Quick check: numbers of partners', {
      b: 'Fill in the minimum and the maximum, as of 2024.',
      chk: 'fb_partnership_members',
      n: 'Remember the minimum for a partnership and the maximum number of partners, as of two thousand twenty four.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up. A sole proprietorship has one owner, unlimited liability and limited resources. In a Joint Hindu Family business the Karta manages, and only the Karta has unlimited liability. A partnership rests on an agreement, with unlimited joint and several liability and mutual agency. Remember the seven types of partners and the optional registration.',
    }),
    sl('exam-tips', 'Exam tips', {
      v: vTips1,
      bl: ['Add as of 2024 to every legal figure.', 'Link each concept to the case in the question.'],
      n: 'Some tips. Only the Karta has unlimited liability, not the coparceners. Registration of a partnership is optional. Do not confuse a secret partner with a sleeping partner. And whenever you write a number fixed by law, such as fifty partners, add the words as of two thousand twenty four.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Forms of Business Organisation, Part 2: Cooperatives, Companies and Choosing a Form',
  goals: [
    'Explain the features, types, merits and limitations of cooperative societies',
    'Explain the features of a company and distinguish private from public companies',
    'Describe the stages of forming a company and the dated notes on commencement',
    'Choose a suitable form of organisation for a given case',
  ],
  slides: [
    sl('title', 'Cooperatives, Companies and Choice', {
      b: 'Part 2: the **cooperative society**, the **company**, and how to **choose** a form.',
      v: vRoute2,
      n: 'Thirty dairy farmers who sell milk together and a factory that needs huge funds are very different businesses. In this part we study the cooperative society, the company with its private and public kinds, the stages in forming a company, and how to choose the right form for a given case.',
    }),
    sl('concept', 'Cooperative society: features', {
      b: 'A **cooperative society** is a voluntary association of persons who join together for the welfare of the members.',
      v: vCoopFeat,
      n: 'A cooperative society is a voluntary association of persons who join together for the welfare of the members. It is registered under the Cooperative Societies Act of nineteen twelve or a state law. Members can join or leave freely, their liability is limited, each has one vote, and the aim is service rather than profit alone.',
    }),
    sl('concept', 'Types of cooperatives', {
      v: vCoopTypes,
      bl: ['Six types: consumer, producer, marketing, farmer, credit and housing.'],
      n: 'There are six types. A consumer cooperative buys for its members. A producer cooperative supplies inputs to small producers. A marketing cooperative sells the products of the members together. A farmer cooperative helps farmers with inputs and sale. A credit cooperative lends from pooled savings, and a housing society builds homes.',
    }),
    sl('check', 'Quick check: identify the type', {
      b: 'Which type of cooperative do the growers form?',
      chk: 'mc_coop_marketing',
      n: 'Look at what the growers do together: buy, lend, build or sell.',
    }),
    sl('concept', 'Merits and limitations of cooperatives', {
      v: vCoopML,
      bl: ['Strengths: equal votes, limited liability, stability', 'Weaknesses: limited funds, weak management, red tape'],
      n: 'Cooperatives give equal voting rights, limited liability, stable existence, economy in operation and easy formation. Their limits are small funds, inefficient management by untrained committees, delays and red tape, little secrecy and government control. These limits explain why large firms rarely choose this form.',
    }),
    sl('check', 'Quick check: service motive', {
      b: 'Judge the assertion and the reason on cooperatives.',
      chk: 'ar_coop_service',
      n: 'Decide whether each statement is true, and then whether the reason explains the assertion.',
    }),
    sl('concept', 'Company: meaning and features', {
      b: 'A **company** is an association of persons incorporated under the Companies Act 2013, with a separate legal entity, perpetual succession and limited liability.',
      v: vCompFeat,
      n: 'A company is an association of persons incorporated under the Companies Act of two thousand thirteen. It is an artificial person with a separate legal entity, formed by registration. It continues despite changes in members, is controlled by a board of directors and gives limited liability. As of two thousand twenty four, a common seal is optional.',
    }),
    sl('example', 'Worked example 1: limited liability on shares', {
      b: 'An imagined shareholder holds partly paid shares.',
      bl: ['Step 1: Unpaid per share is face value minus paid.', 'Step 2: Multiply by the number of shares.', 'Step 3: That is the most the shareholder can be asked to pay.'],
      v: vShares,
      n: 'A shareholder of an imagined company holds five hundred shares of face value ten rupees, with six rupees paid on each. The unpaid amount is four rupees a share. Multiply by five hundred to get two thousand rupees. Even if the company fails badly, that is the most the shareholder can be asked to pay.',
    }),
    sl('concept', 'Private and public company', {
      v: vPrivPub,
      bl: ['Limits are as of 2024.', 'A One Person Company has one member, a form introduced by the Companies Act 2013.'],
      n: 'A private company has at least two members and, as of two thousand twenty four, at most two hundred, excluding employees. It restricts transfer of shares, cannot invite the public and needs two directors. A public company needs seven members, has no maximum, allows free transfer, can invite the public and needs three directors.',
    }),
    sl('concept', 'Dated notes on companies', {
      v: vDated,
      bl: ['Each point is as of 2024.', 'Older books use the term certificate of commencement.'],
      n: 'Three points carry dates. A common seal is optional since an amendment in two thousand fifteen. The One Person Company was introduced by the Companies Act of two thousand thirteen. And as of two thousand twenty four, a company with share capital files a declaration before commencing business, a requirement introduced in two thousand nineteen. Older books call this a certificate of commencement.',
    }),
    sl('diagram', 'Stages in forming a company', {
      v: vStages,
      n: 'There are four stages. Promotion is the work of conceiving the idea and arranging the documents. Incorporation is registration with the Registrar, who issues a certificate. Capital subscription applies only to a public company, which invites the public to buy shares. Commencement of business follows the filing of a declaration, as of two thousand twenty four.',
    }),
    sl('check', 'Quick check: order of stages', {
      b: 'Arrange the stages of forming a public company.',
      chk: 'od_formation',
      n: 'Start with the ideas and end with the declaration that lets business begin.',
    }),
    sl('concept', 'Promotion and incorporation in detail', {
      v: vPromo,
      bl: ['Promoters study, plan and arrange', 'Incorporation gives the company its legal birth'],
      n: 'Promoters spot a business opportunity, study whether it is feasible, get a name approved and prepare the documents, such as the memorandum and the articles of association. These are then filed with the Registrar of Companies. When the Registrar issues the certificate of incorporation, the company is born in law and has a separate legal existence.',
    }),
    sl('concept', 'Stages at a glance', {
      v: vIncorp,
      n: 'This table gathers the four stages with their main points. Remember that capital subscription is only for a public company, and that the last stage is the filing of a declaration as of two thousand twenty four, which replaced the certificate of commencement mentioned in older books.',
    }),
    sl('concept', 'Merits and limitations of a company', {
      v: vCompML,
      bl: ['Strengths: limited liability, continuity, resources', 'Weaknesses: cost, delay, regulation'],
      n: 'A company offers limited liability, perpetual succession, large resources, professional management and scope for growth. Its weaknesses are complex and costly formation, delay in decisions, lack of secrecy because accounts are published, many legal rules and an impersonal working environment.',
    }),
    sl('concept', 'Choosing a form: seven factors', {
      b: 'No single form is best. The choice depends on the case.',
      v: vFactors,
      n: 'No single form is best for every business. Weigh seven factors: the cost and ease of setting up, liability, continuity, management ability, capital, the degree of control the owners want, and the nature of the business. Then match the case to the form that satisfies the most important factors.',
    }),
    sl('diagram', 'Comparing the forms', {
      v: vCompare,
      n: 'This chart compares the forms on four tests. Liability is unlimited for a sole proprietor, for partners, and for the Karta, but limited for a cooperative and a company. Continuity is perpetual only for a company. Members range from one to many. Control rests with the owner, the Karta, the partners, all members equally, or a board.',
    }),
    sl('example', 'Worked example 2: choose a form', {
      b: 'Match four imagined cases to a suitable form.',
      bl: ['Step 1: Underline the clues: capital, liability, control, number of people.', 'Step 2: Match with a form.', 'Step 3: Give a reason.'],
      v: vChoiceEx,
      n: 'Read the clues in each case. A baker with small savings who wants full control suits a sole proprietorship. Three friends with different skills suit a partnership. Dairy farmers who want equal say and welfare suit a cooperative. A factory needing very large capital and continuity suits a public company. Always give a reason.',
    }),
    sl('check', 'Quick check: dairy farmers', {
      b: 'Choose the best form for the dairy farmers.',
      chk: 'mc_choice_dairy',
      n: 'Think about equal say, shared effort and the welfare of members.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up. A cooperative society is voluntary, registered, limited in liability, and run on one member one vote for the welfare of members. A company is a separate legal entity with perpetual succession and limited liability. Private and public companies differ in members, directors, transfer and public invitation. There are four stages of formation, and seven factors guide the choice.',
    }),
    sl('exam-tips', 'Exam tips', {
      v: vTips2,
      bl: ['Write as of 2024 beside every limit fixed by law.', 'Give reasons when you choose a form.'],
      n: 'Some tips. Write as of two thousand twenty four beside every legal limit. Do not call the certificate of commencement current; a declaration is filed. Remember that a private company has two directors and a public company has three. And when you choose a form for a case, link at least two factors to the clues in the case.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Forms of Business Organisation: notes',
  sections: [
    {
      h: '1. Sole proprietorship',
      t: 1,
      b: 'A one-person business in which the owner decides, receives every rupee of profit and bears every loss.\n\n**Features:** easy formation and closure with few formalities; unlimited liability; sole risk bearer and profit recipient; full control; no separate legal entity; lack of continuity.\n\n**Merits:** quick decisions, confidentiality, direct incentive, sense of accomplishment, ease of formation and closure.\n\n**Limitations:** limited resources, limited life, unlimited liability, limited managerial ability.',
      terms: [['Sole proprietorship', 'A business owned, managed and controlled by one person who receives all profit and bears all risk.'], ['Unlimited liability', 'Responsibility for debts that extends to the owner\'s personal property.']],
      v: vSoleML,
    },
    {
      h: '2. Joint Hindu Family business',
      t: 1,
      b: 'Run by members of a Hindu Undivided Family and governed by Hindu law. Membership comes by birth; members are **coparceners**. The eldest member, the **Karta**, manages it.\n\n**Systems (as commonly taught):** Mitakshara in most of India; Dayabhaga in West Bengal.\n\n**Liability:** unlimited for the Karta; limited to their share for coparceners. The business continues after the Karta\'s death.\n\n**Dated note:** daughters became coparceners by birth through the Hindu Succession (Amendment) Act 2005, so as of 2024 they hold the same position as sons.\n\n**Merits and limitations:** see the table.',
      terms: [['Karta', 'The eldest member who manages a Joint Hindu Family business.'], ['Coparcener', 'A member of the family who joins the business by birth and has a share in it.']],
      v: vJhf,
      vs: [vJhfML],
    },
    {
      h: '3. Partnership',
      t: 2,
      b: 'The relation between persons who agree to share the profits of a business carried on by all of them or by any acting for all (Indian Partnership Act 1932).\n\n**Features:** formation by agreement; unlimited liability, joint and several; risk bearing; shared decisions and control; limited continuity; minimum 2 and maximum 50 members as of 2024 under company law rules; mutual agency.\n\n**Partnership deed:** a written agreement; usually states name, nature of business, capital, profit-sharing ratio, salaries and interest, and the rules for admission and retirement.\n\n**Registration** is optional, but as of 2024 an unregistered firm cannot sue third parties to enforce contracts, and partners cannot sue the firm or each other to enforce deed rights.',
      terms: [['Partnership', 'A relationship between persons who agree to share the profits of a business run by all or any of them for all.'], ['Mutual agency', 'The feature under which every partner is both an agent and a principal of the firm.'], ['Joint and several liability', 'Each partner is liable together with the others and also separately for the whole of the firm\'s debts.']],
      v: vPartFeat,
      vs: [vDeed, vRegis],
    },
    {
      h: '4. Types of partners and partnerships',
      t: 2,
      b: '**Partners:** active (works), sleeping (invests, does not manage), secret (manages, unknown to public), nominal (lends only a name), partner by estoppel (liable through misleading conduct), partner by holding out (held out as a partner and does not deny it), minor (admitted to the benefits only).\n\n**Partnerships by duration:** at will; for a particular venture. **By liability:** general partnership; limited liability partnership, governed by the LLP Act 2008, with a separate legal identity and limited liability of partners.',
      terms: [['Sleeping partner', 'A partner who contributes capital and shares profit but takes no active part in management.'], ['Partner by estoppel', 'A person who is not a partner but becomes liable because his own conduct led others to believe he was one.']],
      v: vPartners,
      vs: [vPartnership],
    },
    {
      h: '5. Cooperative society',
      t: 2,
      b: 'A voluntary association of persons joined for the welfare of members, registered under the Cooperative Societies Act 1912 or a state law.\n\n**Features:** voluntary membership; legal status through registration; limited liability; democratic control (one member, one vote); service motive.\n\n**Types:** consumer\'s, producer\'s, marketing, farmer\'s, credit, housing.\n\n**Merits:** equal voting, limited liability, stable existence, economy, ease of formation. **Limitations:** limited funds, inefficient management, red tape, lack of secrecy, government control.',
      terms: [['Cooperative society', 'A voluntary association of persons who join to serve the welfare of the members.']],
      v: vCoopTypes,
      vs: [vCoopML],
    },
    {
      h: '6. Company and the choice of form',
      t: [3, 4],
      b: 'An association of persons incorporated under the Companies Act 2013, with separate legal entity, perpetual succession and limited liability. **Features:** artificial person, formation by registration, board of directors, risk borne by shareholders, common seal optional since 2015 (as of 2024).\n\n**Private company:** 2 to 200 members (as of 2024, excluding employees); restricts transfer; cannot invite the public; min 2 directors; name ends Private Limited. **Public company:** min 7 members, no maximum; free transfer; can invite the public; min 3 directors. A One Person Company was introduced by the 2013 Act.\n\n**Stages:** promotion, incorporation, capital subscription (public company), commencement; as of 2024 a declaration is filed (introduced 2019), where older books say certificate of commencement.\n\n**Choice:** weigh cost and ease, liability, continuity, management ability, capital, control and nature of business.',
      terms: [['Company', 'An association of persons incorporated under company law, with a legal entity of its own, perpetual succession and limited liability.'], ['Perpetual succession', 'Continuing existence of the company regardless of changes in its members.']],
      v: vPrivPub,
      vs: [vStages, vCompare],
    },
  ],
  tips: '**Common mistakes**\n- Writing that coparceners have unlimited liability; only the Karta does.\n- Calling registration of a partnership compulsory.\n- Giving 50 partners, 200 members or the declaration on commencement without the words as of 2024.\n- Choosing a form without tying it to two or more factors.\n\n**How marks are usually awarded**\n- 1 mark: a correct option or a quoted line from the case.\n- 2 and 3 marks: one point per feature or merit with a short explanation.\n- 5 marks: five points, each with an explanation, in a numbered list.\n- Case questions: quote the line, name the concept, explain in a sentence.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Sole proprietorship**', 'A business owned, managed and controlled by one person who gets all profit and bears all risk.', 'definition', 1],
  ['A sole proprietor\'s liability', 'Unlimited: personal property can pay business debts.', 'concept', 1],
  ['Two merits of a sole proprietorship', 'Quick decisions; confidentiality (also direct incentive, ease of formation).', 'fact', 1],
  ['Two limitations of a sole proprietorship', 'Limited resources; limited life (also unlimited liability, limited managerial ability).', 'fact', 1],
  ['**Joint Hindu Family business**', 'A business owned and run by members of a Hindu Undivided Family under Hindu law.', 'definition', 1],
  ['**Karta**', 'The eldest member who manages a Joint Hindu Family business; liability unlimited.', 'definition', 1],
  ['**Coparceners**', 'Family members by birth; liability limited to their share.', 'definition', 1],
  ['Mitakshara and Dayabhaga (as commonly taught)', 'Mitakshara: most of India. Dayabhaga: West Bengal.', 'fact', 1],
  ['Daughters in a Joint Hindu Family (as of 2024)', 'Coparceners by birth through the Hindu Succession (Amendment) Act 2005.', 'fact', 1],
  ['**Partnership**', 'Relation between persons who agree to share profits of a business carried on by all or any acting for all.', 'definition', 2],
  ['Number of partners (as of 2024)', 'Minimum 2; maximum 50 under company law rules.', 'fact', 2],
  ['**Mutual agency**', 'Every partner is both an agent and a principal of the firm.', 'definition', 2],
  ['Partnership liability', 'Unlimited, joint and several.', 'concept', 2],
  ['**Sleeping partner**', 'Invests and shares profit but does not take part in management.', 'definition', 2],
  ['**Secret partner**', 'Takes part in management but is not known to the public.', 'definition', 2],
  ['**Nominal partner**', 'Lends only his name; no capital, no profit share.', 'definition', 2],
  ['**Partner by estoppel**', 'Liable because his own conduct led others to believe he was a partner.', 'definition', 2],
  ['Partnership by duration', 'At will; for a particular venture.', 'fact', 2],
  ['**Limited liability partnership**', 'Partnership under the LLP Act 2008 with limited liability and a separate legal entity.', 'definition', 2],
  ['Partnership deed: contents', 'Name, nature of business, capital, profit ratio, salaries and interest, admission and retirement rules.', 'fact', 2],
  ['Unregistered partnership (as of 2024)', 'Registration is optional, but the firm cannot sue third parties to enforce contract rights.', 'exam-tip', 2],
  ['**Cooperative society**', 'Voluntary association formed for the welfare of members; Cooperative Societies Act 1912 or state law.', 'definition', 2],
  ['Five features of a cooperative', 'Voluntary membership, legal status, limited liability, democratic control, service motive.', 'fact', 2],
  ['Six types of cooperatives', 'Consumer, producer, marketing, farmer, credit, housing.', 'fact', 2],
  ['**Company**', 'Association of persons incorporated under the Companies Act 2013 with separate legal entity, perpetual succession and limited liability.', 'definition', 3],
  ['Private company (as of 2024)', '2 to 200 members, 2 directors, restricted transfer, no public invitation; name ends Private Limited.', 'fact', 3],
  ['Public company (as of 2024)', 'Minimum 7 members, no maximum, 3 directors, free transfer, can invite the public.', 'fact', 3],
  ['Common seal (as of 2024)', 'Optional since an amendment in 2015.', 'fact', 3],
  ['Stages in forming a company', 'Promotion, incorporation, capital subscription (public), commencement.', 'fact', 3],
  ['Commencement (as of 2024)', 'A company with share capital files a declaration, introduced in 2019; older books say certificate of commencement.', 'exam-tip', 3],
  ['Seven factors in choosing a form', 'Cost and ease, liability, continuity, management ability, capital, control, nature of business.', 'fact', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short): Forms of Business Organisation',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['mc_sole_liability', 'mc_secret_partner', 'mc_company_entity', 'ar_sole'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer the 2-mark questions in about 30 to 50 words and the 3-mark question in about 50 to 80 words.', items: ['s2_jhf_karta', 's2_coop_def', 's3_deed'] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80 to 120 words.', items: [{ attempt: 1, keys: ['l_partner_types', 'l_company_stages'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks)', instr: 'Read the case and answer all parts. Part (c) has an internal choice.', items: ['cb_bakery'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long): Forms of Business Organisation',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['mc_jhf_birth', 'mc_karta_liability', 'mc_estoppel', 'mc_unregistered', 'mc_coop_vote', 'mc_private_min', 'mc_capital_stage', 'mc_choice_factory', 'ar_company', 'ar_agency'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and 3-mark questions in about 50 to 80 words. Questions 13 and 15 have an internal choice.', items: ['s2_sole_merits', 's2_private_restrict', { attempt: 1, keys: ['s2_partner_types', 's2_seal'] }, 's3_company_features', { attempt: 1, keys: ['s3_coop_merits', 's3_jhf_limits'] }] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80 to 120 words each.', items: ['l_coop', { attempt: 1, keys: ['l_jhf', 'l_choice_factors'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks each)', instr: 'Read each case and answer all parts. Part (c) of each has an internal choice.', items: ['cb_triveni', 'cb_gokulpur'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 to t04 of cbse-11-business-studies-ch02 only (sole proprietorship and Joint Hindu Family; partnership and cooperatives; company; choice of form)',
    originality: 'every firm, person and case is imagined and written by SOYL; no NCERT text, example or exercise and no board or sample-paper item reused (D-036)',
    data: 'amounts computed in the build: shortfalls, profit shares in the ratio 3:2:1 and the unpaid amount on shares',
    facts: 'legal figures dated as of 2024: 50 partners, 200 private-company members, 7 and 3 minimums for a public company, common seal optional since 2015, declaration on commencement since 2019',
    gate: 'schema, pipeline lint, deterministic verify, word limits, narration and answer-leak checks run clean in this build',
  },
});
