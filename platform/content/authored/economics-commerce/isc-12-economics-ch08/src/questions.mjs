// ISC 12 Economics, ch08 Concepts of Cost — question bank. Every firm, town, person and figure is imagined by SOYL;
// no textbook example, exercise, specimen-paper or past-paper item is reused (D-036). Every number in a stem, key or
// worked solution is computed here and asserted, so stems, keys and solutions cannot drift apart.
// Removed topic (ISC 2027): derivation of the long-run and short-run cost curves; this chapter treats them as concepts.
// Convention: MC is the addition to total cost from one more unit, read from the schedule as TCn − TCn−1 (= TVCn − TVCn−1).
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from '../../isc-12-economics-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const S4 = [70, 110];
const L5 = [100, 150];
const L8 = [150, 220];

export const r2 = (x) => Math.round(x * 100) / 100;
const assert = (cond, msg) => { if (!cond) throw new Error(`questions.mjs: ${msg}`); };
const fmtIN = (n) => n.toLocaleString('en-IN');
const md = (rows, head) => `| ${head.join(' | ')} |\n|${head.map(() => '---').join('|')}|\n${rows.map((r) => `| ${r.join(' | ')} |`).join('\n')}`;

// ---------------------------------------------------------------- cost-schedule engine
/** Full short-run schedule from TFC and TVC at outputs 0..n (TVC[0] must be 0). */
export function schedule(tfc, tvc) {
  assert(tvc[0] === 0, 'TVC at zero output must be zero');
  return tvc.map((v, q) => ({
    q,
    tfc,
    tvc: v,
    tc: tfc + v,
    afc: q ? r2(tfc / q) : null,
    avc: q ? r2(v / q) : null,
    ac: q ? r2((tfc + v) / q) : null,
    mc: q ? v - tvc[q - 1] : null,
  }));
}
const col = (s, k) => s.map((r) => r[k]);

// ---------------------------------------------------------------- shared imagined data (all asserted)
// (1) Ceramic mugs from an imagined Khurja unit: TFC ₹120 hundred a day, TVC = Q³ − 12Q² + 60Q (Q in hundreds of mugs).
export const MUG = { tfc: 120, tvc: (q) => q ** 3 - 12 * q ** 2 + 60 * q };
export const mugMC = (q) => 3 * q * q - 24 * q + 60; // derivative of TVC
export const mugAVC = (q) => q * q - 12 * q + 60;
export const mugAC = (q) => mugAVC(q) + MUG.tfc / q;
export const mugAFC = (q) => MUG.tfc / q;
export const MUG_SCHED = schedule(MUG.tfc, Array.from({ length: 11 }, (_, q) => MUG.tvc(q)));
// minimum of AVC at Q = 6 (AVC = 24) where MC = AVC; minimum of MC at Q = 4 (MC = 12); minimum of AC where MC = AC.
assert(mugAVC(6) === 24 && mugMC(6) === 24 && mugMC(4) === 12, 'mug minima');
export const MUG_ACMIN_Q = (() => { let a = 6, b = 9; for (let i = 0; i < 60; i++) { const m = (a + b) / 2; if (mugMC(m) - mugAC(m) < 0) a = m; else b = m; } return (a + b) / 2; })();
assert(Math.abs(mugMC(MUG_ACMIN_Q) - mugAC(MUG_ACMIN_Q)) < 1e-9 && MUG_ACMIN_Q > 7.1 && MUG_ACMIN_Q < 7.2, 'mug AC minimum');
assert(col(MUG_SCHED, 'tvc').join() === '0,49,80,99,112,125,144,175,224,297,400', 'mug tvc');
assert(col(MUG_SCHED, 'mc').slice(1).join() === '49,31,19,13,13,19,31,49,73,103', 'mug discrete mc');
assert(col(MUG_SCHED, 'avc').slice(1).join() === '49,40,33,28,25,24,25,28,33,40', 'mug avc');

// (2) Pickle jars from an imagined Guntur kitchen: TC schedule given, TFC ₹60.
export const PICKLE_TC = [60, 100, 130, 150, 180, 230];
export const PICKLE = schedule(60, PICKLE_TC.map((t) => t - 60));
assert(col(PICKLE, 'tvc').join() === '0,40,70,90,120,170', 'pickle tvc');
assert(col(PICKLE, 'mc').slice(1).join() === '40,30,20,30,50', 'pickle mc');
assert(col(PICKLE, 'avc').slice(1).join() === '40,35,30,30,34', 'pickle avc');
assert(col(PICKLE, 'afc').slice(1).join() === '60,30,20,15,12', 'pickle afc');
assert(col(PICKLE, 'ac').slice(1).join() === '100,65,50,45,46', 'pickle ac');

// (3) Brass bells from an imagined Moradabad workshop: TFC ₹90, AVC given for 1–4 bells.
export const BELL = { tfc: 90, avc: [30, 25, 22, 24] };
export const BELL_SCHED = schedule(90, [0, ...BELL.avc.map((a, i) => a * (i + 1))]);
assert(col(BELL_SCHED, 'tvc').join() === '0,30,50,66,96', 'bell tvc');
assert(col(BELL_SCHED, 'tc').join() === '90,120,140,156,186', 'bell tc');
assert(col(BELL_SCHED, 'mc').slice(1).join() === '30,20,16,30', 'bell mc');
assert(col(BELL_SCHED, 'ac').slice(1).join() === '120,70,52,46.5', 'bell ac');

// (4) Kites from an imagined Ahmedabad pol: TFC ₹50, MC given for 1–5 bundles.
export const KITE = { tfc: 50, mc: [20, 15, 12, 18, 25] };
export const KITE_TVC = KITE.mc.reduce((a, m) => [...a, a[a.length - 1] + m], [0]);
export const KITE_SCHED = schedule(50, KITE_TVC);
assert(KITE_TVC.join() === '0,20,35,47,65,90' && col(KITE_SCHED, 'tc').join() === '50,70,85,97,115,140', 'kite');

// (5) Single-point facts.
export const AC_PT = { q: 4, ac: 50, tfc: 80 };
export const AC_PT_TC = AC_PT.q * AC_PT.ac;
export const AC_PT_TVC = AC_PT_TC - AC_PT.tfc;
export const AC_PT_AVC = AC_PT_TVC / AC_PT.q;
assert(AC_PT_TC === 200 && AC_PT_TVC === 120 && AC_PT_AVC === 30, 'ac point');
export const AFC_PT = { tfc: 240, q1: 8, q2: 12 };
assert(AFC_PT.tfc / AFC_PT.q1 === 30 && AFC_PT.tfc / AFC_PT.q2 === 20, 'afc point');

// (6) Opportunity cost and economic profit: an imagined Kozhikode bakery run by its owner in her own shop (per month).
export const BAKERY = { revenue: 240000, explicit: 185000, forgoneSalary: 40000, forgoneRent: 10000 };
export const BAKERY_ACC = BAKERY.revenue - BAKERY.explicit;
export const BAKERY_IMPLICIT = BAKERY.forgoneSalary + BAKERY.forgoneRent;
export const BAKERY_ECON = BAKERY_ACC - BAKERY_IMPLICIT;
assert(BAKERY_ACC === 55000 && BAKERY_IMPLICIT === 50000 && BAKERY_ECON === 5000, 'bakery');

// (7) An imagined Vidarbha farmer's choice for one season: cotton ₹80,000, soybean ₹65,000, leasing the land ₹50,000.
export const CROP = { cotton: 80000, soybean: 65000, lease: 50000 };
export const CROP_OC_COTTON = Math.max(CROP.soybean, CROP.lease);
assert(CROP_OC_COTTON === 65000, 'crop oc');

// (8) Private and social cost of an imagined Pali dyeing unit (per month).
export const DYE = { privateCost: 400000, damage: 150000 };
export const DYE_SOCIAL = DYE.privateCost + DYE.damage;
assert(DYE_SOCIAL === 550000, 'dye');

export const pickleTable = () => md(PICKLE.map((r) => [String(r.q), String(r.tc)]), ['Jars a day', 'TC (₹)']);
export const bellTable = () => md(BELL.avc.map((a, i) => [String(i + 1), String(a)]), ['Bells', 'AVC (₹)']);
export const kiteTable = () => md(KITE.mc.map((m, i) => [String(i + 1), String(m)]), ['Bundles', 'MC (₹)']);

// ================================================================ t01 Basic cost concepts
Q('m_explicit_rent', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'An imagined Nagpur printing press pays ₹18,000 a month as rent for its hall to a landlord. For the press this payment is',
  opts: ['an explicit cost', 'an implicit cost', 'a social cost only', 'a sunk opportunity with no cost'],
  sol: 'A payment actually made to an outsider for a factor is an explicit (accounting) cost. An implicit cost is the value of the owner\'s own factor, for which no payment is made.',
}));
Q('m_implicit_own_shop', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A tailor in an imagined Bhopal market runs her business in a shop she owns and could otherwise rent out for ₹9,000 a month. In economics the ₹9,000 is',
  opts: ['an implicit cost of her business', 'an explicit cost entered in her cash book', 'not a cost at all, because no money is paid', 'part of the social cost borne by her neighbours'],
  sol: 'She gives up the rent she could have earned, so the ₹9,000 is the imputed value of her own factor: an implicit cost. It is not paid out, so it is not in her cash book, but economists still count it.',
}));
Q('m_social_dye', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Coloured waste from an imagined dyeing unit in Pali makes river water unfit for the farms downstream. The loss suffered by those farmers is part of',
  opts: ['the social cost of the unit\'s output', 'the private cost paid by the unit', 'the implicit cost of the unit\'s owner', 'the fixed cost of the unit'],
  sol: 'Social cost is the total cost to society: the firm\'s private cost plus costs it imposes on others without paying, such as the farmers\' loss. The unit does not pay that loss, so it is not part of its private cost.',
}));
Q('m_money_real', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The tiredness, risk and sacrifice of leisure borne by the workers and owners of an imagined Agra marble-inlay workshop are together called its',
  opts: ['real cost of production', 'money cost of production', 'explicit cost of production', 'marginal cost of production'],
  sol: 'Real cost is the pains and sacrifices of the factor owners in producing the good; money cost is the expenditure in rupees on factors and inputs.',
}));
Q('m_economic_cost', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'For an economist judging an imagined Indore sweet shop, the economic cost of running it equals',
  opts: ['explicit costs plus implicit costs', 'explicit costs only', 'implicit costs only', 'the social cost minus the private cost'],
  sol: 'Economic cost includes the payments made to outsiders (explicit) and the value of the owner\'s own factors (implicit), such as his own labour, capital and premises.',
}));
Q('ar_social_private', ar({
  t: 1, d: 3, c: 'analysis', key: 'a',
  a: 'The social cost of electricity from an imagined coal-fired plant near Korba can exceed the plant\'s private cost.',
  r: 'Social cost adds to private cost the harm the plant\'s smoke causes to nearby residents, for which the plant pays nothing.',
  sol: 'Both are true, and R explains A: the external harm is added to the private cost, so social cost is larger whenever such harm exists.',
}));
Q('tf_implicit_book', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? The salary a shop-owner forgoes by working in his own shop is entered as an expense in the shop\'s account books.',
  sol: 'An implicit cost involves no payment, so accountants do not record it; economists add it when they measure economic cost and economic profit.',
}));
Q('fb_social', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Private cost plus the external cost a firm imposes on others gives the ___ cost of production.',
  acc: [['social']],
  sol: 'Social cost = private cost + external cost borne by the rest of society.',
}));
Q('mt_cost_types', match({
  t: 1, d: 2, c: 'application',
  stem: 'Match each cost of an imagined Shillong tea café with the type of cost it illustrates.',
  pairs: [
    ['Wages paid to two waiters', 'Explicit cost'],
    ['Interest the owner could earn on her own savings used in the café', 'Implicit cost'],
    ['Litter from takeaway cups cleaned up by the municipality', 'External cost (part of social cost)'],
    ['The owner\'s long hours and stress', 'Real cost'],
  ],
  sol: 'Wages are paid out (explicit); forgone interest on own savings is imputed (implicit); litter cleared by the town is borne by others (external, adding to social cost); toil and stress are a real cost.',
}));
Q('s_explicit_implicit', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between explicit and implicit costs, giving one example of each for an imagined photocopy shop in Patna.',
  model: '**Explicit** costs are **actual payments** to outsiders for factors and inputs, such as the **paper and toner** the Patna shop buys. **Implicit** costs are the **imputed value of the owner\'s own factors**, such as the **salary he gives up** to run the shop himself.',
  sol: 'Each defined with a Patna example.',
  scheme: [['Explicit cost with example', 1], ['Implicit cost with example', 1]],
}));
Q('s_private_social', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: `An imagined Pali dyeing unit spends ₹${fmtIN(DYE.privateCost)} a month on production, and its waste water causes crop losses of ₹${fmtIN(DYE.damage)} a month to farmers downstream. Find the social cost and explain why it differs from the private cost.`,
  model: `**Social cost = private cost + external cost = ₹${fmtIN(DYE.privateCost)} + ₹${fmtIN(DYE.damage)} = ₹${fmtIN(DYE_SOCIAL)}** a month. It is higher because the farmers' loss is a cost **to society** that the unit **does not pay**.`,
  sol: `₹${fmtIN(DYE_SOCIAL)}, with the external cost explained.`,
  scheme: [['Social cost computed', 1], ['Reason: external cost not paid by the firm', 1]],
}));
Q('s3_money_real_economic', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain money cost, real cost and economic cost, using an imagined family-run jaggery unit near Kolhapur as your example.',
  model: '1. **Money cost** is the **rupee expenditure** on inputs and hired factors, such as cane, fuel and wages paid to helpers.\n2. **Real cost** is the **toil, risk and sacrifice** of the people involved, such as the family\'s long nights at the boiling pans.\n3. **Economic cost** adds the **implicit costs** of the family\'s own land, labour and savings to the explicit money payments.',
  sol: 'Three concepts, each with a jaggery-unit example.',
  scheme: [['Money cost with example', 1], ['Real cost with example', 1], ['Economic cost with example', 1]],
}));
Q('l_cost_concepts', long({
  t: [1, 2], d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'An imagined family runs a rice mill near Thanjavur on its own land, using its own savings and labour, and hires two operators. Explain five concepts of cost with reference to the mill.',
  model: '1. **Explicit cost:** wages paid to the **two operators**, electricity and paddy bought are **actual payments** to outsiders.\n2. **Implicit cost:** the **rent** the family could earn by leasing its land, the **interest** on its savings and the **salary** it could earn elsewhere are imputed costs of its own factors.\n3. **Economic cost:** explicit plus implicit costs; only when revenue covers this do the owners earn more than in their best alternative.\n4. **Private versus social cost:** if husk smoke harms neighbours, the social cost exceeds the mill\'s private cost by that external harm.\n5. **Real cost:** the **toil and risk** borne by the family and operators in running the mill.',
  sol: 'Five concepts tied to the mill.',
  scheme: [['Explicit cost', 1], ['Implicit cost', 1], ['Economic cost', 1], ['Private and social cost', 1], ['Real or money cost', 1]],
}));

// ================================================================ t02 Opportunity cost; accounting versus opportunity cost
Q('m_oc_meaning', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Opportunity cost of using a resource in one way is best described as',
  opts: ['the value of the next best alternative given up', 'the total of all alternatives given up', 'the money price paid for the resource', 'the cost borne by society because of pollution'],
  sol: 'Only the best forgone alternative counts, not all alternatives added together; the price paid may differ from what is given up.',
}));
Q('m_oc_farmer', mcq({
  t: 2, d: 2, c: 'application',
  stem: `For one season an imagined Vidarbha farmer can earn ₹${fmtIN(CROP.cotton)} from cotton, ₹${fmtIN(CROP.soybean)} from soybean, or ₹${fmtIN(CROP.lease)} by leasing his land. If he grows cotton, its opportunity cost is`,
  opts: [`₹${fmtIN(CROP_OC_COTTON)}`, `₹${fmtIN(CROP.soybean + CROP.lease)}`, `₹${fmtIN(CROP.lease)}`, `₹${fmtIN(CROP.cotton)}`],
  sol: `The next best alternative given up is soybean at ₹${fmtIN(CROP.soybean)}, which is more than the lease income; the sum of all alternatives is not the opportunity cost.`,
}));
Q('m_oc_zero', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'An old storeroom in an imagined Kalimpong school has no other use: nobody would rent it and the school cannot use it for anything else. When the school starts storing library books there, the opportunity cost of the room is',
  opts: ['zero, as nothing is given up', 'equal to the rent of a similar room in the town', 'equal to the cost of building a new room', 'equal to the value of the books stored'],
  sol: 'Opportunity cost is the value of the best alternative forgone. If the room has no alternative use, nothing is sacrificed and the opportunity cost is zero.',
}));
Q('n_oc_land', num({
  t: 2, d: 2, c: 'understanding', marks: 1, value: CROP_OC_COTTON, unit: '₹',
  stem: `An imagined Vidarbha farmer can earn ₹${fmtIN(CROP.cotton)} from cotton, ₹${fmtIN(CROP.soybean)} from soybean or ₹${fmtIN(CROP.lease)} from leasing his land for the season. What is the opportunity cost (in ₹) of growing cotton?`,
  sol: `Next best alternative: soybean, ₹${fmtIN(CROP.soybean)} (greater than the lease of ₹${fmtIN(CROP.lease)}). Opportunity cost = ₹${fmtIN(CROP_OC_COTTON)}.`,
}));
Q('n_econ_profit', num({
  t: 2, d: 3, c: 'application', marks: 2, value: BAKERY_ECON, unit: '₹',
  stem: `An imagined Kozhikode bakery earns revenue of ₹${fmtIN(BAKERY.revenue)} a month and pays explicit costs of ₹${fmtIN(BAKERY.explicit)}. Its owner gives up a salary of ₹${fmtIN(BAKERY.forgoneSalary)} and the rent of ₹${fmtIN(BAKERY.forgoneRent)} she could earn on her shop. Find the bakery's economic profit (in ₹) for the month.`,
  sol: `Step 1: Accounting profit = ${fmtIN(BAKERY.revenue)} − ${fmtIN(BAKERY.explicit)} = ${fmtIN(BAKERY_ACC)}.\nStep 2: Implicit costs = ${fmtIN(BAKERY.forgoneSalary)} + ${fmtIN(BAKERY.forgoneRent)} = ${fmtIN(BAKERY_IMPLICIT)}.\nStep 3: Economic profit = ${fmtIN(BAKERY_ACC)} − ${fmtIN(BAKERY_IMPLICIT)} = ${fmtIN(BAKERY_ECON)}.`,
  scheme: [['Accounting profit', 1], ['Economic profit after implicit costs', 1]],
}));
Q('ar_accounting_oc', ar({
  t: 2, d: 3, c: 'analysis', key: 'b',
  a: 'A firm can show an accounting profit and still make an economic loss.',
  r: 'Accounting cost is recorded from bills and payments made during the year.',
  sol: 'Both are true, but R does not explain A. A holds because economic cost also includes implicit costs (the owner\'s forgone salary, rent and interest); if these exceed the accounting profit, there is an economic loss. R merely says how accounting cost is recorded.',
}));
Q('tf_oc_money', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Opportunity cost exists only when the alternative given up can be measured in money.',
  sol: 'Opportunity cost is the value of the best alternative forgone, which may be leisure, time or another good; money is only a convenient measure of it.',
}));
Q('s_oc_meaning', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Define opportunity cost and illustrate it with an imagined Class 12 student in Ranchi who spends Sunday afternoons in a paid coaching class.',
  model: 'The **opportunity cost** of a choice is **what the best rejected option was worth**. If the Ranchi student\'s next best use of Sunday afternoon is a **part-time tutoring job paying ₹600**, attending the class costs him that **forgone ₹600**, besides the fee he pays.',
  sol: 'Definition and a specific forgone alternative.',
  scheme: [['Definition', 1], ['Illustration with the forgone alternative', 1]],
}));
Q('s_acc_vs_econ_profit', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why does an economist usually find a smaller profit for an owner-run business than its accountant does? Explain briefly.',
  model: 'The accountant deducts only **explicit costs** (payments made). The economist also deducts **implicit costs**, the owner\'s **forgone salary, rent and interest** on his own factors. With more costs subtracted, **economic profit** is **smaller** than **accounting profit**.',
  sol: 'Implicit costs make the difference.',
  scheme: [['Accountant: explicit costs only', 1], ['Economist: implicit costs too, so smaller profit', 1]],
}));
Q('s3_bakery_profit', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `An imagined Kozhikode baker earns monthly revenue of ₹${fmtIN(BAKERY.revenue)} and pays explicit costs of ₹${fmtIN(BAKERY.explicit)}. She could instead earn a salary of ₹${fmtIN(BAKERY.forgoneSalary)} and rent her shop out for ₹${fmtIN(BAKERY.forgoneRent)}. Calculate her accounting profit and economic profit, and say whether she should continue.`,
  model: `**Accounting profit** = ₹${fmtIN(BAKERY.revenue)} − ₹${fmtIN(BAKERY.explicit)} = **₹${fmtIN(BAKERY_ACC)}**. Implicit costs = ₹${fmtIN(BAKERY.forgoneSalary)} + ₹${fmtIN(BAKERY.forgoneRent)} = ₹${fmtIN(BAKERY_IMPLICIT)}, so **economic profit** = ₹${fmtIN(BAKERY_ACC)} − ₹${fmtIN(BAKERY_IMPLICIT)} = **₹${fmtIN(BAKERY_ECON)}**. As economic profit is **positive**, she earns more than in her best alternative and should **continue**.`,
  sol: 'Two profits and a decision.',
  scheme: [['Accounting profit', 1], ['Economic profit with implicit costs', 1], ['Decision with reason', 1]],
}));
Q('l_oc_full', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'An imagined engineer in Pune earns ₹90,000 a month in a job. She is thinking of leaving it to open a robotics workshop for school students in her own flat, which she could otherwise let for ₹25,000 a month. Explain opportunity cost and accounting cost in her situation, and evaluate what monthly accounting profit the workshop must earn before she should prefer it to her job.',
  model: '1. **Opportunity cost** is the value of the **best alternative given up**. If she opens the workshop she gives up her **salary of ₹90,000** and the **rent of ₹25,000** from her flat.\n2. **Accounting cost** would include only **payments** such as kits, a helper\'s wage and advertising; the forgone salary and rent are **not recorded**.\n3. These forgone incomes are **implicit costs**, so **economic cost** = accounting cost + ₹1,15,000.\n4. The workshop must earn an **accounting profit of at least ₹1,15,000** a month just to **match** her present position (zero economic profit).\n5. **Judgement:** if she expects less than that, the job is the better choice on money terms; she might still prefer the workshop for **independence** or **future growth**, which opportunity cost in rupees does not capture.',
  sol: 'Opportunity cost, accounting cost, implicit costs and the break-even accounting profit.',
  scheme: [['Opportunity cost identified', 1], ['Accounting cost explained', 1], ['Implicit costs and economic cost', 1], ['Required accounting profit of ₹1,15,000', 1], ['Balanced evaluation', 1]],
}));

// ================================================================ t03 Short-run costs and schedules
Q('m_tfc_def', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Which of the following costs of an imagined Ludhiana cycle-parts factory is a fixed cost in the short run?',
  opts: ['Insurance premium on the factory building', 'Payment for steel tubes used', 'Electricity used by the welding machines', 'Wages of workers paid per piece'],
  sol: 'Insurance on the building must be paid whatever the output, even at zero output, so it is fixed. Steel, power for machines and piece wages rise with output, so they are variable.',
}));
Q('m_tfc_zero', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'An imagined Coimbatore textile mill shuts down for a week but keeps paying the watchman, rent and loan interest. During that week its total cost equals',
  opts: ['its total fixed cost', 'zero', 'its total variable cost', 'its marginal cost'],
  sol: 'At zero output total variable cost is zero, so total cost equals total fixed cost, which must still be paid in the short run.',
}));
Q('m_tvc_origin', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'On a cost diagram for an imagined Surat diamond-cutting unit, the total variable cost curve',
  opts: ['starts from the origin and rises with output', 'is a horizontal line above the output axis', 'starts from the level of fixed cost on the cost axis', 'falls continuously as output rises'],
  sol: 'With no output there is no variable cost, so TVC starts at the origin and rises as output grows; it is TC that starts at the TFC level, and TFC that is horizontal.',
}));
Q('m_tc_parallel', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Why is the vertical distance between the total cost and total variable cost curves of an imagined Kota stone-polishing unit the same at every output?',
  opts: ['The gap is total fixed cost, which does not change with output', 'The gap is marginal cost, which is constant', 'The gap is average cost, which is constant', 'Both curves are straight lines'],
  sol: 'TC = TFC + TVC, so TC − TVC = TFC at every output; TFC does not change with output, so the two curves stay the same distance apart.',
}));
Q('m_afc_shape', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'The average fixed cost curve of an imagined Bikaner bhujia unit falls continuously as output rises, approaching the output axis but never touching it. This shape is called',
  opts: ['a rectangular hyperbola', 'a U-shaped curve', 'a horizontal straight line', 'an upward-sloping straight line'],
  sol: 'AFC × Q = TFC, a constant, so the AFC curve is a rectangular hyperbola: it keeps falling but never reaches zero as long as TFC is positive.',
}));
Q('m_mc_read', mcq({
  t: 3, d: 2, c: 'application',
  stem: `The total cost of pickle jars at an imagined Guntur kitchen is shown below. What is the marginal cost of the 5th jar?\n\n${pickleTable()}`,
  opts: [`₹${PICKLE[5].mc}`, `₹${PICKLE[5].ac}`, `₹${PICKLE[5].avc}`, `₹${PICKLE[5].tc}`],
  sol: `MC of the 5th jar = TC5 − TC4 = ${PICKLE[5].tc} − ${PICKLE[4].tc} = ₹${PICKLE[5].mc}. The other options are AC, AVC and TC at 5 jars.`,
}));
Q('m_avc_read', mcq({
  t: 3, d: 2, c: 'application',
  stem: `An imagined Guntur pickle kitchen has a fixed cost of ₹60 a day and the total costs shown. What is the average variable cost of 5 jars?\n\n${pickleTable()}`,
  opts: [`₹${PICKLE[5].avc}`, `₹${PICKLE[5].ac}`, `₹${PICKLE[5].mc}`, `₹${PICKLE[5].afc}`],
  sol: `TVC of 5 jars = ${PICKLE[5].tc} − 60 = ${PICKLE[5].tvc}; AVC = ${PICKLE[5].tvc} ÷ 5 = ₹${PICKLE[5].avc}.`,
}));
Q('m_afc_pt', mcq({
  t: 3, d: 2, c: 'application',
  stem: `An imagined Varanasi silk loom shed has a fixed cost of ₹${AFC_PT.tfc} a day. Its average fixed cost is ₹${AFC_PT.tfc / AFC_PT.q1} at ${AFC_PT.q1} sarees. If output rises to ${AFC_PT.q2} sarees, average fixed cost becomes`,
  opts: [`₹${AFC_PT.tfc / AFC_PT.q2}`, `₹${AFC_PT.tfc / AFC_PT.q1}`, `₹${AFC_PT.tfc}`, `₹${(AFC_PT.tfc / AFC_PT.q1) * (AFC_PT.q2 / AFC_PT.q1)}`],
  sol: `AFC = TFC ÷ Q = ${AFC_PT.tfc} ÷ ${AFC_PT.q2} = ₹${AFC_PT.tfc / AFC_PT.q2}; the same fixed cost is spread over more sarees.`,
}));
Q('m_mc_def', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Marginal cost is the',
  opts: ['change in total cost from producing one more unit', 'total cost divided by output', 'variable cost divided by output', 'fixed cost of the last unit produced'],
  sol: 'MC = TCn − TCn−1, the addition to total cost from one more unit. TC ÷ Q is AC and TVC ÷ Q is AVC; fixed cost does not change with an extra unit.',
}));
Q('ar_mc_variable', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'Marginal cost of an imagined Rourkela bolt plant is unaffected by the size of its fixed cost.',
  r: 'Fixed cost does not change when one more unit is produced, so only the change in variable cost adds to total cost.',
  sol: 'Both are true, and R explains A: MC = TVCn − TVCn−1, so a higher or lower fixed cost leaves every MC unchanged.',
}));
Q('n_mc_bell', num({
  t: 3, d: 2, c: 'application', marks: 1, value: BELL_SCHED[3].mc, unit: '₹',
  stem: `An imagined Moradabad bell workshop has a fixed cost of ₹${BELL.tfc} and the average variable costs shown. Find the marginal cost (in ₹) of the 3rd bell.\n\n${bellTable()}`,
  sol: `TVC2 = 25 × 2 = ${BELL_SCHED[2].tvc}; TVC3 = 22 × 3 = ${BELL_SCHED[3].tvc}; MC3 = ${BELL_SCHED[3].tvc} − ${BELL_SCHED[2].tvc} = ${BELL_SCHED[3].mc}.`,
}));
Q('n_tc_kite', num({
  t: 3, d: 2, c: 'application', marks: 1, value: KITE_SCHED[4].tc, unit: '₹',
  stem: `An imagined Ahmedabad kite maker has a fixed cost of ₹${KITE.tfc}. The marginal costs of the first five bundles are shown. Find the total cost (in ₹) of 4 bundles.\n\n${kiteTable()}`,
  sol: `TVC4 = 20 + 15 + 12 + 18 = ${KITE_SCHED[4].tvc}; TC4 = ${KITE.tfc} + ${KITE_SCHED[4].tvc} = ${KITE_SCHED[4].tc}.`,
}));
Q('n_avc_acpt', num({
  t: 3, d: 2, c: 'understanding', marks: 1, value: AC_PT_AVC, unit: '₹',
  stem: `At an output of ${AC_PT.q} chairs, an imagined Saharanpur furniture unit has an average cost of ₹${AC_PT.ac} and a fixed cost of ₹${AC_PT.tfc}. Find its average variable cost (in ₹).`,
  sol: `TC = ${AC_PT.q} × ${AC_PT.ac} = ${AC_PT_TC}; TVC = ${AC_PT_TC} − ${AC_PT.tfc} = ${AC_PT_TVC}; AVC = ${AC_PT_TVC} ÷ ${AC_PT.q} = ${AC_PT_AVC}.`,
}));
Q('n_ac_pickle', num({
  t: 3, d: 2, c: 'understanding', marks: 1, value: PICKLE[3].ac, unit: '₹',
  stem: `Using the Guntur pickle kitchen's total costs (fixed cost ₹60), find the average cost (in ₹) of 3 jars.\n\n${pickleTable()}`,
  sol: `AC = TC ÷ Q = ${PICKLE[3].tc} ÷ 3 = ${PICKLE[3].ac}.`,
}));
Q('fb_afc_never', fb({
  t: 3, d: 2, c: 'understanding',
  stem: 'However large output becomes, average fixed cost can never become ___ as long as fixed cost is positive.',
  acc: [['zero', '0']],
  sol: 'AFC = TFC ÷ Q falls as Q rises but never reaches zero while TFC is positive.',
}));
Q('ord_complete_steps', ord({
  t: 3, d: 2, c: 'understanding', marks: 1,
  stem: 'A student is given only the total cost schedule and the fixed cost of an imagined Mysuru incense unit and must find average variable cost. Arrange her steps in the correct order.',
  items: [
    'Note the total cost at each output',
    'Subtract the fixed cost to get total variable cost',
    'Divide total variable cost by output',
    'Write the result as average variable cost',
  ],
  sol: 'TC first, then TVC = TC − TFC, then AVC = TVC ÷ Q, and finally record the AVC.',
}));
Q('s_fixed_variable', short({
  t: 3, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between fixed cost and variable cost, giving one example of each from an imagined Haldwani fruit-juice plant.',
  model: '**Fixed cost** does **not change with output** and is paid even at **zero output**, such as **rent of the plant shed**. **Variable cost** **changes with output** and is zero when nothing is produced, such as the **fruit and bottles** used.',
  sol: 'Each defined with a juice-plant example.',
  scheme: [['Fixed cost with example', 1], ['Variable cost with example', 1]],
}));
Q('s_afc_never_zero', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain why the average fixed cost curve of an imagined Panipat blanket mill keeps falling but never touches the output axis.',
  model: 'AFC = **TFC ÷ Q**. As output rises, the **same fixed cost** is **spread over more blankets**, so AFC keeps **falling**. But TFC is **positive**, so dividing it by any finite output can **never give zero**; the curve approaches the axis without touching it.',
  sol: 'Spreading of a positive TFC.',
  scheme: [['Falls as fixed cost is spread', 1], ['Never zero because TFC is positive', 1]],
}));
Q('s_tc_shape', short({
  t: 3, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'The total cost curve of an imagined Firozabad glass-bangle unit starts above the origin and is first concave, then convex from below. Explain both features.',
  model: 'It **starts above the origin** because **TC = TFC** at zero output. It rises at a **diminishing rate** at first (increasing returns to the variable factor make each extra unit cheaper) and later at an **increasing rate** (diminishing returns make each extra unit dearer), so it changes from concave to convex.',
  sol: 'Starting point and the change of curvature.',
  scheme: [['Starts at TFC', 1], ['Curvature linked to returns to the variable factor', 1]],
}));
Q('s3_pickle_schedule', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `Using the total cost schedule of an imagined Guntur pickle kitchen (fixed cost ₹60), calculate TVC, AVC and MC for 3 and 4 jars.\n\n${pickleTable()}`,
  model: `**3 jars:** TVC = ${PICKLE[3].tc} − 60 = **${PICKLE[3].tvc}**; AVC = ${PICKLE[3].tvc} ÷ 3 = **${PICKLE[3].avc}**; MC = ${PICKLE[3].tc} − ${PICKLE[2].tc} = **${PICKLE[3].mc}**.\n**4 jars:** TVC = ${PICKLE[4].tc} − 60 = **${PICKLE[4].tvc}**; AVC = ${PICKLE[4].tvc} ÷ 4 = **${PICKLE[4].avc}**; MC = ${PICKLE[4].tc} − ${PICKLE[3].tc} = **${PICKLE[4].mc}**. AVC stays at ${PICKLE[4].avc} because MC at the 4th jar equals AVC.`,
  sol: 'Six values from the TC schedule.',
  scheme: [['TVC for 3 and 4 jars', 1], ['AVC for 3 and 4 jars', 1], ['MC for 3 and 4 jars', 1]],
}));
Q('s3_bell_schedule', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `An imagined Moradabad bell workshop has a fixed cost of ₹${BELL.tfc}. From the average variable costs shown, find TVC, TC and MC for 2 and 4 bells.\n\n${bellTable()}`,
  model: `**2 bells:** TVC = 25 × 2 = **${BELL_SCHED[2].tvc}**; TC = ${BELL.tfc} + ${BELL_SCHED[2].tvc} = **${BELL_SCHED[2].tc}**; MC = ${BELL_SCHED[2].tvc} − ${BELL_SCHED[1].tvc} = **${BELL_SCHED[2].mc}**.\n**4 bells:** TVC = 24 × 4 = **${BELL_SCHED[4].tvc}**; TC = ${BELL.tfc} + ${BELL_SCHED[4].tvc} = **${BELL_SCHED[4].tc}**; MC = ${BELL_SCHED[4].tvc} − ${BELL_SCHED[3].tvc} = **${BELL_SCHED[4].mc}**. The 4th bell's MC is above AVC, which is why AVC rises.`,
  sol: 'TVC from AVC × Q, then TC and MC.',
  scheme: [['TVC for 2 and 4 bells', 1], ['TC for 2 and 4 bells', 1], ['MC for 2 and 4 bells', 1]],
}));
Q('s3_kite_schedule', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `An imagined Ahmedabad kite maker has a fixed cost of ₹${KITE.tfc} and the marginal costs shown. Find TVC, TC and AC for 2 and 5 bundles.\n\n${kiteTable()}`,
  model: `**2 bundles:** TVC = 20 + 15 = **${KITE_SCHED[2].tvc}**; TC = ${KITE.tfc} + ${KITE_SCHED[2].tvc} = **${KITE_SCHED[2].tc}**; AC = ${KITE_SCHED[2].tc} ÷ 2 = **${KITE_SCHED[2].ac}**.\n**5 bundles:** TVC = sum of all five MCs = **${KITE_SCHED[5].tvc}**; TC = ${KITE.tfc} + ${KITE_SCHED[5].tvc} = **${KITE_SCHED[5].tc}**; AC = ${KITE_SCHED[5].tc} ÷ 5 = **${KITE_SCHED[5].ac}**.`,
  sol: 'TVC as the running sum of MC.',
  scheme: [['TVC by adding MCs', 1], ['TC with fixed cost', 1], ['AC for both outputs', 1]],
}));
Q('l_schedule_full', long({
  t: [3, 4], d: 4, c: 'application', marks: 5, wl: L5,
  stem: `An imagined Guntur pickle kitchen has a fixed cost of ₹60 a day and the total costs below.\n\n${pickleTable()}\n\n(a) Complete a schedule of AFC, AVC, AC and MC for 1 to 5 jars. [3]\n(b) Use your schedule to explain the relationship between MC and AVC. [2]`,
  model: `(a) AFC: **${col(PICKLE, 'afc').slice(1).join(', ')}**; AVC: **${col(PICKLE, 'avc').slice(1).join(', ')}**; AC: **${col(PICKLE, 'ac').slice(1).join(', ')}**; MC: **${col(PICKLE, 'mc').slice(1).join(', ')}** (₹, for 1 to 5 jars), using AFC = 60 ÷ Q, AVC = (TC − 60) ÷ Q, AC = TC ÷ Q and MC = TCn − TCn−1.\n(b) While **MC is below AVC** (2nd and 3rd jars: 30 and 20 against 35 and 30), **AVC falls**. When **MC equals AVC** (4th jar: 30 and 30), **AVC is at its minimum** and stays at 30. When **MC rises above AVC** (5th jar: 50 against 34), **AVC rises**. So MC pulls AVC towards itself and cuts it at its lowest point.`,
  sol: 'Four average and marginal columns, then the MC–AVC rule from the numbers.',
  scheme: [['AFC column', 1], ['AVC and AC columns', 1], ['MC column', 1], ['MC below AVC: AVC falls', 1], ['MC equals AVC at its minimum, then above it', 1]],
}));
Q('l_curves_shapes', long({
  t: 3, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'With the help of described diagrams, explain the shapes of the TFC, TVC and TC curves and of the AFC curve for an imagined Kanpur leather-goods unit.',
  model: '1. **TFC** is a **horizontal straight line**: fixed cost (rent, interest, salaried staff) stays the same at every output, even at zero.\n2. **TVC** starts at the **origin**: no output, no variable cost. It rises first at a **decreasing rate** and then at an **increasing rate**, reflecting increasing and then diminishing returns to the variable factor.\n3. **TC = TFC + TVC**: it has the **same shape as TVC** but starts at the **level of TFC** on the cost axis; the vertical gap between TC and TVC is constant and equals TFC.\n4. **AFC = TFC ÷ Q** falls continuously, as fixed cost is spread over more output.\n5. AFC is a **rectangular hyperbola**: it approaches the output axis but **never touches** it, since TFC is positive.',
  sol: 'Four curves with reasons for their shapes.',
  scheme: [['TFC horizontal', 1], ['TVC from origin with changing slope', 1], ['TC parallel to TVC from TFC', 1], ['AFC falls continuously', 1], ['AFC a rectangular hyperbola', 1]],
}));

// ================================================================ t04 Relationships among AC, MC and TC
Q('m_mc_cuts_avc', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'On the short-run cost diagram of an imagined Hosur spare-parts factory, the marginal cost curve cuts the average variable cost curve',
  opts: ['at the lowest point of the AVC curve', 'where AVC is rising fastest', 'at the highest point of the AVC curve', 'only where AFC is zero'],
  sol: 'While MC is below AVC it pulls AVC down; once MC is above AVC it pulls AVC up. So MC must pass through AVC at its minimum point.',
}));
Q('m_ac_falls', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'At the present output of an imagined Bhagalpur silk unit, marginal cost is ₹42 and average cost is ₹55. If the unit produces one more metre, its average cost will',
  opts: ['fall', 'rise', 'stay at ₹55', 'become ₹42'],
  sol: 'When the extra unit costs less (₹42) than the current average (₹55), the average is pulled down, so AC falls.',
}));
Q('m_gap_narrows', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'As output rises at an imagined Rajkot engine-parts plant, the vertical gap between its AC and AVC curves keeps getting smaller. The reason is that',
  opts: ['the gap is average fixed cost, which falls as output rises', 'marginal cost falls continuously', 'total fixed cost falls as output rises', 'average variable cost becomes zero'],
  sol: 'AC − AVC = AFC, and AFC falls as the fixed cost is spread over more units, so the two curves come closer; they never meet because AFC never becomes zero.',
}));
Q('m_mc_min_first', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: `For an imagined Khurja mug unit with TVC = Q³ − 12Q² + 60Q, marginal cost is lowest at Q = 4, average variable cost at Q = 6, and average cost at about Q = ${MUG_ACMIN_Q.toFixed(1)}. Which statement explains this order?`,
  opts: ['MC must fall below an average before it can pull that average down, so MC turns up first and AVC before AC', 'AC reaches its minimum first because it includes fixed cost', 'All three reach their minimum at the same output', 'AVC reaches its minimum last because variable cost rises fastest'],
  sol: 'An average keeps falling while the marginal is below it, even after the marginal has started rising. So MC turns up first (Q = 4), then cuts AVC at its minimum (Q = 6), and later cuts AC at its minimum, which lies to the right because AFC is still falling.',
}));
Q('ar_mc_ac', ar({
  t: 4, d: 3, c: 'analysis', key: 'a',
  a: 'When marginal cost exceeds average cost, average cost rises as output increases.',
  r: 'An addition to total cost that is larger than the existing average raises the average.',
  sol: 'Both are true, and R explains A: if each extra unit costs more than the current average, adding it lifts the average.',
}));
Q('ar_gap_meet', ar({
  t: 4, d: 3, c: 'analysis', key: 'c',
  a: 'The AC and AVC curves of a firm never meet in the short run.',
  r: 'Average fixed cost becomes zero at very large outputs.',
  sol: 'A is true because AC − AVC = AFC, which stays positive. R is false: AFC = TFC ÷ Q approaches zero but never reaches it while TFC is positive.',
}));
Q('tf_mc_falling_ac', tf({
  t: 4, d: 3, c: 'analysis', ans: true,
  stem: 'True or false? Average cost can be falling at an output where marginal cost has already started rising.',
  sol: 'AC falls as long as MC is below AC, even if MC itself is rising; this happens between the minimum of MC and the point where MC cuts AC.',
}));
Q('s_mc_avc', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State the relationship between marginal cost and average variable cost, using the idea of a cricketer\'s batting average from one more innings as an analogy.',
  model: 'If the new innings score (**MC**) is **below** the batting average (**AVC**), the average **falls**; if it is **above**, the average **rises**; if **equal**, it is **unchanged**. Hence MC **cuts AVC at its minimum** point.',
  sol: 'Three cases and the minimum point.',
  scheme: [['MC below or above AVC and the effect', 1], ['MC equals AVC at the minimum', 1]],
}));
Q('s3_ac_mc', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain the relationship between average cost and marginal cost, and why MC cuts AC at its minimum point, for an imagined Tiruppur T-shirt unit.',
  model: '1. When **MC is less than AC**, each extra T-shirt costs **less than the average**, so **AC falls**.\n2. When **MC is greater than AC**, each extra shirt costs **more than the average**, so **AC rises**.\n3. AC stops falling and starts rising exactly where **MC = AC**, so the MC curve passes through the **lowest point of AC**. MC may already be rising while AC is still falling.',
  sol: 'Three cases leading to the minimum point.',
  scheme: [['MC below AC: AC falls', 1], ['MC above AC: AC rises', 1], ['MC cuts AC at its minimum', 1]],
}));
Q('s3_u_shape', short({
  t: [4, 3], d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain why the short-run AVC and AC curves of an imagined Jalandhar sports-goods unit are U-shaped.',
  model: '1. **AVC** first **falls** because, with fixed machinery, adding workers brings **increasing returns** to the variable factor; later diminishing returns make each unit **costlier**, so AVC **rises**: the **law of variable proportions**.\n2. **AC = AFC + AVC**: at first both fall, so AC falls quickly.\n3. Later the **rise in AVC outweighs the fall in AFC**, so AC also **rises**, giving a U-shape whose minimum lies to the right of AVC\'s.',
  sol: 'Law of variable proportions and the AFC effect.',
  scheme: [['AVC U-shape from returns to the variable factor', 1], ['AC as AFC plus AVC', 1], ['AC rises once AVC\'s rise dominates', 1]],
}));
Q('l_relationship', long({
  t: [3, 4], d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `For an imagined Khurja ceramic-mug unit, TFC is ₹120 hundred a day and TVC = Q³ − 12Q² + 60Q (Q in hundreds of mugs). Explain, with a described diagram of the AFC, AVC, AC and MC curves, the relationships among them. Use the facts that MC is lowest at Q = 4, MC = AVC = 24 at Q = 6, and MC = AC near Q = ${MUG_ACMIN_Q.toFixed(1)}.`,
  model: `1. **AFC** (120 ÷ Q) falls continuously as a rectangular hyperbola.\n2. **MC** falls to its **minimum at Q = 4** (12) and then rises; it is the first curve to turn up.\n3. **AVC** falls while MC is below it and reaches its **minimum where MC cuts it**, at **Q = 6** (AVC = MC = 24).\n4. **AC = AFC + AVC** keeps falling beyond Q = 6 because AFC is still falling; MC cuts **AC at its minimum** near **Q = ${MUG_ACMIN_Q.toFixed(1)}**, to the **right** of AVC's minimum.\n5. The **gap between AC and AVC** is AFC; it **narrows** as output rises but never closes. On the diagram all three of MC, AVC and AC are U-shaped, with MC rising through the lowest points of AVC and then AC.`,
  sol: 'Ordered minima and the AC–AVC gap.',
  scheme: [['AFC hyperbola', 1], ['MC minimum first', 1], ['MC cuts AVC at its minimum (Q = 6)', 1], ['MC cuts AC at its minimum, to the right', 1], ['Gap between AC and AVC narrows', 1]],
}));

// ================================================================ t05 Short-run and long-run cost curves (concepts only)
Q('m_lr_no_fixed', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'An imagined Haryana dairy company plans its next five years and can change the size of its plant, its land and its staff. In this long-run planning,',
  opts: ['all costs are variable and there is no fixed cost', 'fixed cost is larger than in the short run', 'only marginal cost exists', 'total cost does not depend on output'],
  sol: 'The long run is a period in which every factor, including plant size, can be varied, so there are no fixed costs.',
}));
Q('m_lac_envelope', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'The long-run average cost curve of an imagined Pune auto-parts maker touches each of its short-run average cost curves (one for each plant size) from below. For this reason it is called',
  opts: ['an envelope curve', 'a rectangular hyperbola', 'a marginal cost curve', 'a total variable cost curve'],
  sol: 'The LAC encloses the family of SAC curves, showing the lowest cost of each output when the best plant size is chosen; it is therefore called an envelope or planning curve.',
}));
Q('m_lac_flatter', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: 'Compared with any single short-run average cost curve of an imagined Bhilwara spinning mill, its long-run average cost curve is usually',
  opts: ['flatter, because the mill can switch to the plant size that suits each output', 'steeper, because all costs are variable', 'vertical, because plant size is fixed', 'identical, because long-run and short-run costs are the same'],
  sol: 'In the long run the mill picks the best plant for each output, so cost rises less sharply than when one plant is pushed beyond its capacity; the LAC is flatter than each SAC.',
}));
Q('ar_lr_variable', ar({
  t: 5, d: 2, c: 'understanding', key: 'a',
  a: 'There is no average fixed cost curve in the long run.',
  r: 'In the long run every factor of production can be varied.',
  sol: 'Both are true, and R explains A: with all factors variable, no cost is fixed, so AFC does not exist in the long run.',
}));
Q('tf_lac_ushape', tf({
  t: 5, d: 3, c: 'analysis', ans: true,
  stem: 'True or false? The long-run average cost curve is usually U-shaped because the firm first enjoys and later loses the advantages of a larger scale of production.',
  sol: 'Economies of scale first lower long-run average cost; beyond some size, diseconomies (for example harder management) raise it, giving a U-shape. This is not caused by fixed costs, which do not exist in the long run.',
}));
Q('fb_long_run', fb({
  t: 5, d: 1, c: 'recall',
  stem: 'A period long enough for a firm to change all its factors, including the size of its plant, is called the ___ run.',
  acc: [['long']],
  sol: 'In the long run every factor is variable; in the short run at least one factor is fixed.',
}));
Q('s_sr_lr', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between short-run and long-run costs for an imagined Visakhapatnam fish-canning firm.',
  model: 'In the **short run** the cannery\'s **plant size is fixed**, so costs split into **fixed** (shed rent, machine loan) and **variable** (fish, tins, wages). In the **long run** it can **change every factor**, including the plant, so **all costs are variable**.',
  sol: 'Fixed factor in the short run; all variable in the long run.',
  scheme: [['Short run: fixed and variable costs', 1], ['Long run: all costs variable', 1]],
}));
Q('s3_envelope', short({
  t: 5, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain, with a described diagram, why the long-run average cost curve of an imagined Ankleshwar chemicals firm is called an envelope curve. (Concepts only; no derivation.)',
  model: '1. Each **plant size** has its own **short-run AC** curve, U-shaped around the output it suits best.\n2. In the long run the firm can choose the plant that gives the **lowest average cost** for any output it plans.\n3. Joining these lowest points gives the **LAC**, which **touches each SAC from below** and **wraps around** the family of SAC curves, like an envelope. It is also called the **planning curve**.',
  sol: 'Family of SACs and the curve that wraps them.',
  scheme: [['SAC for each plant size', 1], ['Lowest cost for each output chosen', 1], ['LAC touches the SACs from below', 1]],
}));
Q('s3_lac_reasons', short({
  t: 5, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Give reasons why the long-run average cost curve of an imagined Jamshedpur steel-pipe maker first falls and then rises, and contrast this with the reason for the U-shape of its short-run AVC.',
  model: '1. LAC **falls** at first because a larger scale brings **economies of scale**: specialised machines, division of labour and bulk buying.\n2. Beyond some size, **diseconomies of scale** (management becoming difficult, coordination costs) make LAC **rise**.\n3. The short-run AVC is U-shaped for a different reason: the **law of variable proportions**, with plant size fixed and only the variable factor changing.',
  sol: 'Scale economies versus returns to a factor.',
  scheme: [['Economies of scale', 1], ['Diseconomies of scale', 1], ['Short-run reason contrasted', 1]],
}));
Q('l_sr_lr', long({
  t: [5, 3], d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'An imagined Nashik winery is deciding whether to stay with its present plant or build a larger one. Using the concepts of short-run and long-run cost curves, explain the choices it faces. (No derivation of the curves is required.)',
  model: '1. In the **short run** the winery\'s **plant is fixed**: its costs split into **fixed** (vats, building) and **variable** (grapes, bottles, labour).\n2. Its **SAC curve** is **U-shaped** around the output the present plant suits; pushing far beyond it raises AVC because of **diminishing returns**.\n3. In the **long run** it can choose any **plant size**: there are **no fixed costs**, and each plant size has its own SAC.\n4. The **LAC** is the **envelope** of these SACs and shows the **lowest average cost** for each planned output.\n5. If the winery plans an output much larger than its present plant suits, a **larger plant** gives a **lower point on the LAC**, so building it makes sense; for small increases, staying with the present plant may be cheaper.',
  sol: 'Short-run and long-run costs applied to a plant-size decision.',
  scheme: [['Short run: fixed plant, fixed and variable costs', 1], ['SAC shape for one plant', 1], ['Long run: all variable, many SACs', 1], ['LAC as the envelope', 1], ['Applied choice', 1]],
}));

// ================================================================ ISC paper-style 4-mark and 8-mark items (bank only)
Q('q4_dye_social', short({
  t: [1, 2], d: 3, c: 'application', marks: 4, wl: S4,
  stem: `Answer both parts about an imagined dyeing unit in Pali. [2 + 2]\n\n(i) The unit's own monthly costs are ₹${fmtIN(DYE.privateCost)}, and its waste water causes crop losses of ₹${fmtIN(DYE.damage)} to farmers downstream. Calculate the social cost and explain why it exceeds the private cost.\n(ii) The owner works in the unit himself instead of taking a job paying ₹35,000 a month. Classify this ₹35,000 as a type of cost and say whether it appears in the unit's accounts.`,
  model: `(i) **Social cost** = private cost + external cost = ₹${fmtIN(DYE.privateCost)} + ₹${fmtIN(DYE.damage)} = **₹${fmtIN(DYE_SOCIAL)}**. It is higher because the farmers' loss is borne by **others**, and the unit **does not pay** for it.\n(ii) The forgone ₹35,000 is an **implicit cost** and also his **opportunity cost** of working in the unit. No payment is made, so it **does not appear** in the unit's accounts, but an economist adds it to economic cost.`,
  sol: 'Social cost; implicit and opportunity cost.',
  scheme: [['(i) social cost computed', 1], ['(i) external cost explained', 1], ['(ii) implicit or opportunity cost named', 1], ['(ii) not recorded in accounts', 1]],
}));
Q('q4_bell_avc', short({
  t: [3, 4], d: 3, c: 'application', marks: 4, wl: S4,
  stem: `Answer both parts about an imagined Moradabad bell workshop with a fixed cost of ₹${BELL.tfc}. [2 + 2]\n\n${bellTable()}\n\n(i) Calculate the MC of the 2nd, 3rd and 4th bells.\n(ii) Use your answers to explain why AVC falls from 1 to 3 bells and rises at 4 bells.`,
  model: `(i) TVC = AVC × Q gives ${col(BELL_SCHED, 'tvc').slice(1).join(', ')}; so MC2 = **${BELL_SCHED[2].mc}**, MC3 = **${BELL_SCHED[3].mc}**, MC4 = **${BELL_SCHED[4].mc}**.\n(ii) For the 2nd and 3rd bells, **MC (20, 16) is below AVC**, so it **pulls AVC down** (30 to 25 to 22). The 4th bell's **MC (30) is above** the AVC of 22, so it **pulls AVC up** to 24.`,
  sol: 'MC from AVC and the MC–AVC rule.',
  scheme: [['(i) TVC from AVC', 1], ['(i) three MCs', 1], ['(ii) MC below AVC: falls', 1], ['(ii) MC above AVC: rises', 1]],
}));
Q('q4_afc_gap', short({
  t: [3, 4], d: 3, c: 'analysis', marks: 4, wl: S4,
  stem: 'Answer both parts about an imagined Kollam cashew-processing unit. [2 + 2]\n\n(i) Explain why its AFC curve is a rectangular hyperbola.\n(ii) Explain why the vertical distance between its AC and AVC curves narrows as output increases, and whether the curves ever meet.',
  model: '(i) **AFC × Q = TFC**, which is **constant** for the unit, so every point on the AFC curve encloses the same area with the axes: the curve is a **rectangular hyperbola** that falls continuously.\n(ii) The **gap** between AC and AVC is **AFC**, since AC = AFC + AVC. As output rises, AFC **falls**, so the gap **narrows**. AFC never becomes **zero** while TFC is positive, so the two curves **never meet**.',
  sol: 'AFC shape and the AC–AVC gap.',
  scheme: [['(i) AFC × Q constant', 1], ['(i) rectangular hyperbola', 1], ['(ii) gap equals AFC and narrows', 1], ['(ii) curves never meet', 1]],
}));
Q('l8_cost_concepts', long({
  t: [1, 2], d: 4, c: 'evaluation', marks: 8, wl: L8,
  stem: `Answer both parts. [4 + 4]\n\n(i) Explain explicit, implicit, private and social costs, using an imagined Kozhikode bakery whose ovens' smoke troubles the neighbours.\n(ii) The bakery's monthly revenue is ₹${fmtIN(BAKERY.revenue)} and its explicit costs are ₹${fmtIN(BAKERY.explicit)}. The owner gives up a salary of ₹${fmtIN(BAKERY.forgoneSalary)} and rent of ₹${fmtIN(BAKERY.forgoneRent)} on her shop. Calculate the accounting and economic profit and evaluate whether she has chosen well.`,
  model: `(i) **Explicit costs** are **payments** to outsiders: flour, sugar, gas and the helpers' wages. **Implicit costs** are the **imputed value** of her own factors: the salary she gives up and the rent her shop could earn. **Private cost** is all the cost borne by the bakery itself, explicit and implicit. **Social cost** adds the **harm to the neighbours** from oven smoke, which the bakery does not pay for, so social cost **exceeds** private cost.\n(ii) **Accounting profit** = ₹${fmtIN(BAKERY.revenue)} − ₹${fmtIN(BAKERY.explicit)} = **₹${fmtIN(BAKERY_ACC)}**. Implicit costs = **₹${fmtIN(BAKERY_IMPLICIT)}**, so **economic profit** = **₹${fmtIN(BAKERY_ECON)}**. As this is positive, the bakery pays her more than her best alternative, so on money terms she has **chosen well**. The margin is **small**, however: a modest rise in costs or a fall in sales would wipe it out, and if smoke complaints led to a cleaner (costlier) oven, her economic profit could vanish.`,
  sol: 'Four cost concepts; two profits and an evaluation.',
  scheme: [['Explicit cost', 1], ['Implicit cost', 1], ['Private cost', 1], ['Social cost with external harm', 1], ['Accounting profit', 1], ['Implicit costs totalled', 1], ['Economic profit', 1], ['Evaluation of the choice', 1]],
}));
Q('l8_mug_curves', long({
  t: [3, 4, 5], d: 4, c: 'analysis', marks: 8, wl: L8,
  stem: `Answer both parts about an imagined Khurja ceramic-mug unit with TFC of ₹120 hundred a day and TVC = Q³ − 12Q² + 60Q (Q in hundreds of mugs). [4 + 4]\n\n(i) From TVC = ${col(MUG_SCHED, 'tvc').slice(4, 8).join(', ')} at Q = 4, 5, 6 and 7, calculate AVC and MC for Q = 5, 6 and 7, and identify where AVC is lowest.\n(ii) With a described diagram, explain how the unit's short-run AC and long-run AC differ in shape and in the reason for that shape.`,
  model: `(i) AVC = TVC ÷ Q: **${MUG_SCHED[5].avc}, ${MUG_SCHED[6].avc}, ${MUG_SCHED[7].avc}** at Q = 5, 6, 7. MC = TVCn − TVCn−1: **${MUG_SCHED[5].mc}, ${MUG_SCHED[6].mc}, ${MUG_SCHED[7].mc}**. AVC is **lowest at Q = 6** (₹24 hundred): before it MC is below AVC and pulls it down; after it MC is above AVC and pulls it up.\n(ii) The **short-run AC** is a fairly **steep U** around the output the present kilns suit. It falls at first as **AFC** falls and the variable factor gives **increasing returns**, then rises as **diminishing returns** push AVC up, the **law of variable proportions**. The **long-run AC** is **flatter**, because the unit can build a bigger or smaller plant, and it **envelops** the short-run curves from below. Its U-shape comes from **economies** and then **diseconomies of scale**, not from fixed costs, which do not exist in the long run.`,
  sol: 'AVC and MC from the schedule; SAC versus LAC.',
  scheme: [['(i) AVC values', 1], ['(i) MC values', 1], ['(i) minimum AVC at Q = 6', 1], ['(i) reason via MC', 1], ['(ii) SAC shape', 1], ['(ii) SAC reason: variable proportions', 1], ['(ii) LAC flatter, envelope', 1], ['(ii) LAC reason: scale economies', 1]],
}));

// ================================================================ case-based
Q('cb_dye_unit', caseQ({
  t: [1, 2], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined report on a Pali dyeing unit and answer the questions that follow. *(Written by SOYL for practice; the unit and figures are imagined.)*',
  passage: `**Panchayat meeting notes, a village downstream of an imagined Pali dyeing unit**\n\nThe unit's owner, Mr Bhandari, says his monthly costs are ₹${fmtIN(DYE.privateCost)}: dyes, cloth, power and the wages of twelve workers. He also runs the unit himself instead of taking a manager's job in Jodhpur. Farmers say coloured waste in the river has cut their wheat crop, costing them about ₹${fmtIN(DYE.damage)} a month together. The panchayat asks whether the unit should pay for a treatment plant.`,
  parts: [
    child('a', num({ t: 1, d: 2, c: 'application', marks: 1, value: DYE_SOCIAL, unit: '₹', stem: 'Calculate the monthly social cost of the unit\'s production.', sol: `Social cost = ${fmtIN(DYE.privateCost)} + ${fmtIN(DYE.damage)} = ${fmtIN(DYE_SOCIAL)}.` })),
    child('b', short({ t: 1, d: 2, c: 'understanding', marks: 1, stem: 'Name the type of cost represented by the manager\'s salary Mr Bhandari gives up.', model: 'An **implicit cost** (the **opportunity cost** of his own labour).', sol: 'Forgone salary of the owner.', scheme: [['Implicit or opportunity cost', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'evaluation', marks: 2, stem: '**Either** (i): Evaluate whether the unit should pay for a treatment plant, using the idea of social cost.', model: 'At present the unit\'s **private cost** leaves out the **₹1,50,000 harm** to farmers, so its goods are priced below their **full social cost**. Paying for treatment makes the unit **bear the cost it causes**; if the plant costs **less than the damage**, society **gains** overall.', sol: 'Internalising the external cost.', scheme: [['Private cost omits the harm', 1], ['Reasoned recommendation', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Distinguish between the private cost and the social cost of the unit using the figures in the case.', model: `**Private cost** is the **₹${fmtIN(DYE.privateCost)}** the unit itself bears. **Social cost** adds the **₹${fmtIN(DYE.damage)}** loss imposed on farmers, giving **₹${fmtIN(DYE_SOCIAL)}**.`, sol: 'Private versus social with figures.', scheme: [['Private cost', 1], ['Social cost with the external loss', 1]] }),
    ]),
  ],
}));
Q('cb_bakery', caseQ({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the imagined conversation at a Kozhikode bakery and answer the questions that follow. *(Written by SOYL for practice.)*',
  passage: `**At an imagined bakery on Kozhikode beach road**\n\nNasreen left a hotel job paying ₹${fmtIN(BAKERY.forgoneSalary)} a month to start a bakery in a shop she owns, which a pharmacy once offered to rent for ₹${fmtIN(BAKERY.forgoneRent)}. Last month her sales were ₹${fmtIN(BAKERY.revenue)} and her bills for flour, butter, gas and two helpers came to ₹${fmtIN(BAKERY.explicit)}. Her accountant cousin calls it "a profit of fifty-five thousand". Her brother, an economics student, says the true figure is much smaller.`,
  parts: [
    child('a', num({ t: 2, d: 2, c: 'understanding', marks: 1, value: BAKERY_ACC, unit: '₹', stem: 'What is the bakery\'s accounting profit for the month?', sol: `${fmtIN(BAKERY.revenue)} − ${fmtIN(BAKERY.explicit)} = ${fmtIN(BAKERY_ACC)}.` })),
    child('b', num({ t: 2, d: 3, c: 'application', marks: 1, value: BAKERY_ECON, unit: '₹', stem: 'What economic profit does her brother have in mind?', sol: `Implicit costs ${fmtIN(BAKERY.forgoneSalary)} + ${fmtIN(BAKERY.forgoneRent)} = ${fmtIN(BAKERY_IMPLICIT)}; economic profit = ${fmtIN(BAKERY_ACC)} − ${fmtIN(BAKERY_IMPLICIT)} = ${fmtIN(BAKERY_ECON)}.` })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain why the brother\'s figure is smaller than the cousin\'s.', model: 'The cousin deducts only the **bills paid** (explicit costs). The brother also deducts Nasreen\'s **forgone salary and rent**, the **implicit costs** of her own labour and shop, which are part of her **opportunity cost**.', sol: 'Implicit costs explain the gap.', scheme: [['Explicit costs only for the cousin', 1], ['Implicit costs added by the brother', 1]] }), [
      short({ t: 2, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Should Nasreen keep the bakery? Justify using opportunity cost.', model: `Yes, on money terms: after counting her **opportunity costs** (₹${fmtIN(BAKERY_IMPLICIT)}), she still gains **₹${fmtIN(BAKERY_ECON)}** more than in her best alternative. The margin is **thin**, so a small fall in sales would make returning to the hotel job the better choice.`, sol: 'Positive economic profit, with a caution.', scheme: [['Decision using economic profit', 1], ['Justification or caution', 1]] }),
    ]),
  ],
}));
Q('cb_mug_unit', caseQ({
  t: [3, 4], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the imagined cost sheet of a Khurja ceramic unit and answer the questions that follow. *(Imagined figures, written by SOYL for practice.)*',
  passage: `**Daily cost sheet, an imagined Khurja mug unit (costs in ₹ hundred, output in hundreds of mugs)**\n\n${md(MUG_SCHED.slice(3, 9).map((r) => [String(r.q), String(r.tfc), String(r.tvc)]), ['Output', 'TFC', 'TVC'])}\n\nThe owner wants to know which output gives the lowest variable cost per mug and how the cost of each extra hundred mugs behaves.`,
  parts: [
    child('a', num({ t: 3, d: 2, c: 'understanding', marks: 1, value: MUG_SCHED[6].avc, stem: 'Calculate the AVC at an output of 6 (hundred mugs).', sol: `AVC = ${MUG_SCHED[6].tvc} ÷ 6 = ${MUG_SCHED[6].avc}.` })),
    child('b', num({ t: 3, d: 2, c: 'application', marks: 1, value: MUG_SCHED[7].mc, stem: 'Calculate the MC of raising output from 6 to 7 (hundred mugs).', sol: `MC = ${MUG_SCHED[7].tvc} − ${MUG_SCHED[6].tvc} = ${MUG_SCHED[7].mc}.` })),
    child('c', short({ t: 4, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Show from the sheet that MC is below AVC before output 6 and above it after, and state what this means for AVC.', model: `At output 5, MC = ${MUG_SCHED[5].mc} is below AVC = ${MUG_SCHED[5].avc}, so AVC is **falling**; at output 7, MC = ${MUG_SCHED[7].mc} is above AVC = ${MUG_SCHED[7].avc}, so AVC is **rising**. Hence AVC is **lowest at output 6** (${MUG_SCHED[6].avc}).`, sol: 'Compare MC and AVC either side of 6.', scheme: [['Comparison at 5 and 7', 1], ['AVC minimum at 6', 1]] }), [
      short({ t: [3, 4], d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Calculate AC at outputs 6 and 7 and explain why AC falls here even though AVC rises.', model: `AC6 = (120 + ${MUG_SCHED[6].tvc}) ÷ 6 = **${MUG_SCHED[6].ac}**; AC7 = (120 + ${MUG_SCHED[7].tvc}) ÷ 7 = **${MUG_SCHED[7].ac}**. AVC rises from ${MUG_SCHED[6].avc} to ${MUG_SCHED[7].avc}, but **AFC falls** from 20 to ${MUG_SCHED[7].afc}; AC = AFC + AVC falls because the fall in AFC outweighs the rise in AVC.`, sol: 'AC values and the AFC effect.', scheme: [['AC at 6 and 7', 1], ['Falling AFC explained', 1]] }),
    ]),
  ],
}));
