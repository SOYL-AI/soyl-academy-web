// Build CBSE 12 Economics ch07 Indian Economy 1950-1990. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-economics-ch07/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-economics-ch07', 'economics-commerce');
const { inr, MS, MS_SOLD, MS_PCT, CEIL, CEIL_SURPLUS, CEIL_FAMILIES, TAR, TAR_DUTY, TAR_LANDED, TAR_GAP, YLD, YLD_RISE } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- worked-example figures (computed)
// Deck 1 worked example: land ceiling in an imagined state (different numbers from the bank item).
const WC = { owned: 36, ceiling: 12, plot: 3 };
const WC_SURPLUS = WC.owned - WC.ceiling; // 24
const WC_FAM = WC_SURPLUS / WC.plot; // 8
// Deck 1 worked example: marketed surplus of an imagined Haryana farmer (quintals).
const WM = { output: 80, kept: 20 };
const WM_SOLD = WM.output - WM.kept; // 60
const WM_PCT = Math.round((1000 * WM_SOLD) / WM.output) / 10; // 75
// Deck 2 worked example: tariff on an imagined imported radio set (₹).
const WT = { import: 500, rate: 80, domestic: 750 };
const WT_DUTY = (WT.import * WT.rate) / 100; // 400
const WT_LANDED = WT.import + WT_DUTY; // 900
if (WC_SURPLUS !== 24 || WC_FAM !== 8 || WM_SOLD !== 60 || WM_PCT !== 75 || WT_DUTY !== 400 || WT_LANDED !== 900 || MS_PCT !== 76 || CEIL_FAMILIES !== 10 || TAR_LANDED !== 320000 || YLD_RISE !== 75) throw new Error('figure check failed');

// ---------------------------------------------------------------- visuals
const vRoute1 = flow('LR', ['Choosing an economic system', 'Planning and its four goals', 'Land reforms', 'Green Revolution', 'The subsidy debate'], 'Route map of Part 1: choosing an economic system, planning and its four goals, land reforms, the Green Revolution and the subsidy debate', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Public sector and IPR 1956', 'Licensing', 'Small-scale industry', 'Import substitution', 'Appraisal of 1950–90'], 'Route map of Part 2: the public sector and IPR 1956, licensing, small-scale industry, import substitution, and an appraisal of 1950 to 1990', 'Part 2 at a glance');
const vSystems = table(
  ['System', 'Who decides what to produce', 'India\'s choice'],
  [
    ['Capitalist (market)', 'Market forces of demand and supply; private owners', 'Kept private enterprise and markets'],
    ['Socialist', 'The state owns resources and plans production', 'Kept state planning and public ownership of key industries'],
    ['Mixed', 'Both: the state plans and regulates, private firms produce', 'Adopted after independence'],
  ],
  'Table comparing economic systems: in a capitalist economy the market decides; in a socialist economy the state decides; India adopted a mixed economy that kept private enterprise and added state planning and public ownership of key industries',
);
const vPlanFlow = flow('LR', ['Planning Commission set up (1950)', 'First Five Year Plan (1951–56)', 'Plans every five years, each with its own priorities', 'Replaced by NITI Aayog (2015)'], 'Flow of planning in India: the Planning Commission was set up in 1950, the First Five Year Plan ran from 1951 to 1956, later plans each had their own priorities, and NITI Aayog replaced the Commission in 2015', 'Planning: the institutions');
const vGoals = (() => {
  const s = new Svg(560, 300);
  const box = (x, y, w, h, t1, t2, fill) => {
    s.rect(x, y, w, h, { fill, color: 'accent', sw: 1.6, rx: 10 });
    s.text(x + w / 2, y + h / 2 - 9, t1, { bold: true, size: 15 });
    s.text(x + w / 2, y + h / 2 + 11, t2, { size: 12 });
  };
  s.rect(200, 120, 160, 60, { fill: 'accent', color: 'accent', sw: 1.6, rx: 12 });
  s.text(280, 150, 'Five Year Plans', { bold: true, size: 15 });
  box(20, 20, 200, 64, 'Growth', 'rising GDP', 'fill');
  box(340, 20, 200, 64, 'Modernisation', 'new technology, social change', 'fill');
  box(20, 216, 200, 64, 'Self-reliance', 'fewer imports, own food', 'fill');
  box(340, 216, 200, 64, 'Equity', 'benefits reach the poor', 'fill');
  s.line(220, 70, 240, 120, { color: 'muted', sw: 1.6 }).line(340, 70, 320, 120, { color: 'muted', sw: 1.6 });
  s.line(220, 230, 240, 180, { color: 'muted', sw: 1.6 }).line(340, 230, 320, 180, { color: 'muted', sw: 1.6 });
  return s.visual('Diagram of the four goals of the Five Year Plans around a central box: growth (rising GDP), modernisation (new technology and social change), self-reliance (fewer imports, own food) and equity (benefits reach the poor)', 'The four long-term goals of planning.');
})();
const vConflict = table(
  ['Goals that can pull apart', 'Example'],
  [
    ['Modernisation vs employment', 'A labour-saving machine raises output but cuts jobs'],
    ['Growth vs equity', 'Early gains go to those who already own land and capital'],
    ['Self-reliance vs efficiency', 'Making a good at home may cost more than importing it'],
  ],
  'Table of possible conflicts between plan goals: modernisation versus employment, growth versus equity, and self-reliance versus efficiency, each with an example',
  'Plans had to set priorities among the goals.',
);
const vLandReforms = table(
  ['Reform', 'What it did', 'How far it worked'],
  [
    ['Abolition of intermediaries', 'Removed zamindars; tillers dealt directly with the state', 'Largely done, but some former zamindars kept land'],
    ['Land ceiling', 'Fixed a maximum holding; surplus to the landless', 'Limited: court cases and paper transfers to relatives'],
    ['Tenancy reform', 'Regulated rent; gave security of tenure', 'Uneven; many tenants were evicted'],
  ],
  'Table of three land reforms: abolition of intermediaries removed zamindars and was largely done; land ceilings fixed a maximum holding but had limited success because of court cases and paper transfers; tenancy reform regulated rent but was uneven',
  'Success varied widely from state to state.',
);
const vCeilingWE = table(
  ['Step', 'Working (imagined state)'],
  [
    ['Land owned', `${WC.owned} hectares`],
    ['Ceiling', `${WC.ceiling} hectares`],
    ['Surplus land', `${WC.owned} − ${WC.ceiling} = ${WC_SURPLUS} hectares`],
    ['Families who get a plot', `${WC_SURPLUS} ÷ ${WC.plot} = ${WC_FAM} families`],
  ],
  `Table of a worked example: an owner with ${WC.owned} hectares and a ceiling of ${WC.ceiling} hectares has ${WC_SURPLUS} surplus hectares, enough for ${WC_FAM} families at ${WC.plot} hectares each`,
  'Imagined figures.',
);
const vGRPackage = flow('LR', ['HYV seeds', 'Fertilisers and pesticides', 'Assured irrigation', 'Much higher yields (wheat, then rice)', 'Marketed surplus and buffer stocks'], 'Flow of the Green Revolution package: HYV seeds with fertilisers, pesticides and assured irrigation gave much higher yields of wheat and then rice, leading to a marketed surplus and buffer stocks', 'The Green Revolution package');
const vYield = (() => {
  const s = new Svg(560, 300);
  const ch = s.chart({ x0: 0, x1: 3, y0: 0, y1: 2500, left: 80, top: 30, width: 420, height: 210, xLabel: 'Period', yLabel: 'Wheat yield (kg per hectare)' });
  [[1, YLD.before, 'Before HYV', 'fill'], [2, YLD.after, 'After HYV', 'accent']].forEach(([x, v, name, fill]) => {
    const x0 = ch.X(x - 0.3), x1 = ch.X(x + 0.3);
    s.rect(x0, ch.Y(v), x1 - x0, ch.Y(0) - ch.Y(v), { fill, color: 'accent', sw: 1.5, rx: 2 });
    ch.label([x, v], inr(v), { dy: -12, size: 13, bold: true });
    ch.xTick(x, name);
  });
  ch.yTick(1000, '1,000').yTick(2000, '2,000');
  return s.visual(`Bar chart of wheat yield in an imagined district: ${inr(YLD.before)} kilograms per hectare before HYV seeds and ${inr(YLD.after)} after, a rise of ${YLD_RISE} per cent`, `Imagined district: a rise of ${YLD_RISE}%.`);
})();
const vPhases = table(
  ['Phase', 'Roughly when', 'Spread'],
  [
    ['First', 'Mid-1960s to mid-1970s', 'Mainly wheat; better-off states with irrigation such as Punjab'],
    ['Second', 'Mid-1970s to mid-1980s', 'More states and more crops, especially rice'],
  ],
  'Table of the two phases of the Green Revolution: the first, from the mid-1960s to the mid-1970s, mainly wheat in better-off irrigated states such as Punjab; the second, from the mid-1970s to the mid-1980s, spread to more states and crops, especially rice',
);
const vMSWE = table(
  ['Step', 'Working (imagined Haryana farmer)'],
  [
    ['Harvest', `${WM.output} quintals`],
    ['Kept for the family', `${WM.kept} quintals`],
    ['Marketed surplus', `${WM.output} − ${WM.kept} = ${WM_SOLD} quintals`],
    ['Share sold', `${WM_SOLD} ÷ ${WM.output} × 100 = ${WM_PCT}%`],
  ],
  `Table of a worked example: a farmer harvests ${WM.output} quintals and keeps ${WM.kept}, so the marketed surplus is ${WM_SOLD} quintals, or ${WM_PCT} per cent of output`,
  'Imagined figures.',
);
const vGains = flow('TB', ['Higher yields', 'Large marketed surplus', 'Government builds buffer stocks', 'Food grain prices fall relative to other goods', 'Low-income families, who spend much on food, gain'], 'Flow of how the Green Revolution helped the poor: higher yields led to a large marketed surplus, buffer stocks and relatively lower food prices, which helped low-income families', 'Why surplus mattered');
const vRisks = table(
  ['Fear', 'What policy did'],
  [
    ['Only big farmers can afford the inputs', 'Low-interest loans and subsidised fertilisers'],
    ['HYV crops are more prone to pests', 'Research institutes and advice to farmers'],
    ['Gains limited to some regions and crops', 'Spread to more states and to rice in the second phase'],
  ],
  'Table of fears about the Green Revolution and policy responses: costly inputs met by cheap loans and subsidies; pest risk met by research institutes; regional limits eased as the technology spread in the second phase',
);
const vSubsidy = table(
  ['For subsidies', 'Against (or for targeting)'],
  [
    ['Most farmers are small and poor', 'Much benefit goes to fertiliser makers and richer farmers'],
    ['They helped spread new technology', 'The aim of spreading technology has been met'],
    ['Farming is risky; removing them raises inequality', 'They are a large burden on the budget'],
  ],
  'Two-column table of the subsidy debate: for subsidies, most farmers are small and poor, subsidies spread new technology and farming is risky; against, much benefit goes to fertiliser makers and richer farmers, the original aim has been met and the fiscal cost is large',
  'A debate: give both sides.',
);
const vSummary1 = table(
  ['Topic', 'Key points'],
  [
    ['Economic system', 'Mixed economy with state planning'],
    ['Planning', 'Planning Commission 1950; plans from 1951; NITI Aayog 2015'],
    ['Goals', 'Growth, modernisation, self-reliance, equity (they can conflict)'],
    ['Land reforms', 'Intermediaries abolished; ceilings and tenancy reform had limited success'],
    ['Green Revolution', 'HYV package from the mid-1960s; self-sufficiency; uneven at first; subsidy debate'],
  ],
  'Summary table of Part 1: mixed economy, planning institutions, the four goals, land reforms and the Green Revolution',
);
const vIPR = table(
  ['Category under IPR 1956', 'Ownership'],
  [
    ['First (Schedule A)', 'Exclusively the state'],
    ['Second (Schedule B)', 'State sets up new units; private firms supplement'],
    ['Third', 'Private sector, under industrial licensing'],
  ],
  'Table of the three categories of industries under the Industrial Policy Resolution 1956: the first exclusively state-owned, the second with the state setting up new units and private firms supplementing, and the third left to the private sector under licensing',
  'The Resolution formed the basis of the Second Plan.',
);
const vPSReasons = flow('LR', ['Huge capital needed (steel, power, machines)', 'Private capital scarce; market small', 'State invests in heavy industry', 'Control of the commanding heights'], 'Flow of why the state led industry: huge projects needed capital that private investors lacked, and the market was small, so the state invested in heavy industry and controlled the commanding heights', 'Why the public sector led');
const vLicence = flow('TB', ['Firm applies for a licence to start or expand', 'Government checks the plan priorities and region', 'Licence granted more easily in backward regions, with concessions', 'Or delayed or refused'], 'Flow of industrial licensing: a firm applies to start or expand, the government checks plan priorities and region, and grants a licence more easily in backward regions, or delays or refuses it', 'Industrial licensing');
const vSSI = table(
  ['Small-scale industry', 'Point'],
  [
    ['Committee', 'Karve Committee (1955): use small industry for rural development'],
    ['Definition', 'A ceiling on investment in plant and machinery, raised over time'],
    ['Why support', 'Labour-intensive: more jobs per rupee of capital'],
    ['How supported', 'Reserved products; lower excise duty; cheaper loans'],
  ],
  'Table on small-scale industry: the Karve Committee of 1955, a definition by an investment ceiling, its labour intensity, and support through reserved products, lower excise duty and cheaper loans',
);
const vIsub = flow('LR', ['Imports restricted by tariffs and quotas', 'Domestic firms get an assured market', 'New industries grow at home', 'Little competition: quality and costs suffer'], 'Flow of import substitution: tariffs and quotas restrict imports, domestic firms get an assured market and new industries grow, but little competition hurts quality and costs', 'Import substitution: both sides');
const vTariffQuota = table(
  ['Tool', 'How it works', 'Effect on imports'],
  [
    ['Tariff', 'A tax on imported goods', 'Makes them dearer, so fewer are bought'],
    ['Quota', 'A limit on the quantity imported', 'Only the fixed amount can come in'],
  ],
  'Table comparing a tariff, a tax that makes imports dearer, with a quota, a limit on the quantity that can be imported',
);
const vTariffSvg = (() => {
  const s = new Svg(560, 300);
  const ch = s.chart({ x0: 0, x1: 3, y0: 0, y1: 1000, left: 80, top: 30, width: 420, height: 210, xLabel: 'Radio set', yLabel: 'Price (₹)' });
  const bar = (x, lo, hi, fill) => { const x0 = ch.X(x - 0.3), x1 = ch.X(x + 0.3); s.rect(x0, ch.Y(hi), x1 - x0, ch.Y(lo) - ch.Y(hi), { fill, color: 'accent', sw: 1.5, rx: 2 }); };
  bar(1, 0, WT.import, 'fill');
  bar(1, WT.import, WT_LANDED, 'accent');
  ch.label([1, WT.import / 2], `Abroad ${WT.import}`, { size: 12 });
  ch.label([1, (WT.import + WT_LANDED) / 2], `Tariff ${WT_DUTY}`, { size: 12, bold: true });
  ch.label([1, WT_LANDED], `${WT_LANDED}`, { dy: -12, size: 13, bold: true });
  bar(2, 0, WT.domestic, 'fill');
  ch.label([2, WT.domestic], `${WT.domestic}`, { dy: -12, size: 13, bold: true });
  ch.xTick(1, 'Imported').xTick(2, 'Made at home');
  ch.yTick(500, '500');
  return s.visual(`Stacked bar chart: an imagined imported radio costs ${WT.import} rupees abroad plus a tariff of ${WT_DUTY}, a total of ${WT_LANDED}, while the home-made set costs ${WT.domestic}, so buyers turn to the home-made one`, 'Imagined prices.');
})();
const vAppraisal = table(
  ['Achievements, 1950–90', 'Shortcomings'],
  [
    ['Broad industrial base, including capital goods', 'Many loss-making public enterprises'],
    ['Food self-sufficiency after the Green Revolution', 'Licence-permit delays discouraged enterprise'],
    ['Small units created many jobs', 'Protection reduced competition and quality'],
    ['Less dependence on imports', 'Exports and jobs outside farming grew slowly'],
  ],
  'Two-column table appraising 1950 to 1990: achievements were a broad industrial base, food self-sufficiency, jobs in small units and less dependence on imports; shortcomings were loss-making public enterprises, licence delays, reduced competition and quality, and slow growth of exports and non-farm jobs',
  'A balanced appraisal gives both sides.',
);
const vSummary2 = table(
  ['Topic', 'Key points'],
  [
    ['Public sector', 'Led heavy industry; capital scarce, market small'],
    ['IPR 1956', 'Three categories; licensing; regional balance'],
    ['Small-scale industry', 'Karve Committee 1955; reservation; labour-intensive'],
    ['Trade', 'Import substitution by tariffs and quotas; infant industry argument'],
    ['Appraisal', 'Strong base and self-reliance; inefficiency led to the call for reform'],
  ],
  'Summary table of Part 2: public sector, IPR 1956, small-scale industry, trade policy and the appraisal of 1950 to 1990',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Indian Economy 1950–1990 — Part 1: Planning and Agriculture',
  goals: [
    'Explain why India chose a mixed economy and how planning was organised',
    'Explain the four goals of planning and how they can conflict',
    'Evaluate land reforms and the Green Revolution',
    'Weigh both sides of the debate on agricultural subsidies',
  ],
  slides: [
    sl('title', 'Indian Economy 1950–1990', {
      b: 'Part 1 — the **economic system**, **planning** and its goals, and **agriculture**: land reforms and the Green Revolution.',
      v: vRoute1,
      n: 'In 1947 India had to decide how to rebuild a poor, mostly agricultural economy. In this chapter we follow the forty years from 1950 to 1990. Part one looks at the kind of economy India chose, the goals of the Five Year Plans, and the two big changes in farming: land reforms and the Green Revolution.',
    }),
    sl('concept', 'Choosing an economic system', {
      b: 'Every economy must decide **what** to produce, **how**, and **for whom**.',
      bl: ['**Market** answers: demand and supply decide', '**State** answers: the government plans', 'India wanted growth **and** fairness, in a democracy'],
      v: vSystems,
      n: 'Every economy has to decide what to produce, how to produce it and how to share it. In a market economy, demand and supply decide. In a socialist economy, the state decides. Leaders after independence wanted the energy of private enterprise, but also a strong state to fight poverty. So India chose a mixed economy, combining features of both.',
    }),
    sl('concept', 'Planning in India', {
      b: 'A **plan** spells out how resources are to be used over a period. India\'s plans covered **five years** each, within long-term goals.',
      v: vPlanFlow,
      n: 'To guide a mixed economy, India set up the Planning Commission in nineteen fifty, with the Prime Minister as its chairperson. The First Five Year Plan began in nineteen fifty one. Each plan set its own priorities, but all worked towards common long term goals. In twenty fifteen the Planning Commission was replaced by NITI Aayog.',
    }),
    sl('diagram', 'The four goals of planning', {
      v: vGoals,
      n: 'The plans had four long term goals. Growth means a rising capacity to produce, seen in a rising GDP. Modernisation means new technology, and also new social attitudes, such as equal rights for women. Self reliance means avoiding imports of goods that can be produced at home, above all food. Equity means making sure the benefits of growth reach the poor.',
    }),
    sl('check', 'Quick check: which goal?', {
      b: 'A planner wants India to grow its own food and make its own machines. Which goal?',
      chk: 'm_selfrel',
      n: 'Think about what the planner is trying to avoid. Is it slow growth, old technology, dependence on other countries, or unfair sharing of gains?',
    }),
    sl('concept', 'Can the goals conflict?', {
      b: 'Goals can **pull apart**, so each plan had to set **priorities**.',
      v: vConflict,
      n: 'The four goals do not always move together. A modern labour saving machine may raise output but reduce jobs. Fast growth may first help those who already own land and capital. Making everything at home may cost more than importing. So planners had to choose priorities, and good policy tried to make growth and equity move together.',
    }),
    sl('concept', 'Agriculture in 1950: the problem', {
      b: 'Low **productivity**, heavy **rents** and insecure **tenants**: the colonial legacy on the land.',
      bl: ['Most people depended on farming', 'Tillers seldom owned the land they worked', 'Little reason to invest in land they could lose'],
      n: 'At independence most Indians depended on farming, yet farm output per hectare was very low. Many tillers did not own their land. They paid heavy rents to landlords and could be evicted at any time, so they had little reason to invest. The government therefore began with land reforms, aiming at both fairness and higher output.',
    }),
    sl('diagram', 'Three land reforms', {
      v: vLandReforms,
      n: 'There were three main reforms. First, intermediaries such as zamindars were abolished, so tillers dealt directly with the state. Second, land ceilings fixed the maximum land one owner could hold, and the surplus was to go to the landless. Third, tenancy reforms regulated rents and gave tenants security. The first was largely achieved; the other two had limited success.',
    }),
    sl('check', 'Quick check: intermediaries', {
      b: 'What did abolishing intermediaries mean?',
      chk: 'm_intermediary',
      n: 'Remember who stood between the tiller and the government under the old land settlement.',
    }),
    sl('example', 'Worked example 1: a land ceiling', {
      b: `An imagined owner holds **${WC.owned} hectares**; the ceiling is **${WC.ceiling} hectares**; surplus land goes to landless families in plots of **${WC.plot} hectares**.`,
      bl: ['Step 1 — Surplus = land owned minus the ceiling', 'Step 2 — Families = surplus divided by the plot size', 'Step 3 — Say what the result means for equity'],
      v: vCeilingWE,
      n: 'Let us work through a ceiling. The owner holds thirty six hectares, and the law allows twelve. So twenty four hectares are surplus. If each landless family gets three hectares, eight families receive land. That is the promise of a ceiling. In practice, owners often went to court or transferred land to relatives on paper, so much less land was actually redistributed.',
    }),
    sl('concept', 'Why the ceiling often failed', {
      b: 'Laws on paper, **loopholes** in practice.',
      bl: ['Court cases delayed action for years', 'Land transferred to relatives on paper', 'Some former zamindars kept land as self-cultivated', 'Success greater where states were committed to land for the tiller'],
      v: flow('LR', ['Ceiling law passed', 'Owners challenge it in court', 'Land put in relatives\' names', 'Little surplus actually redistributed'], 'Flow of why ceilings failed: a law is passed, owners challenge it in court and put land in relatives\' names, so little surplus is actually redistributed', 'The loophole chain'),
      n: 'Why did ceilings achieve so little? Big landowners delayed the laws through court cases and divided their land among relatives on paper. Some former zamindars kept large areas by claiming they farmed it themselves. Where state governments were strongly committed to giving land to the tiller, as in Kerala and West Bengal, results were better.',
    }),
    sl('diagram', 'The Green Revolution', {
      b: 'From the **mid-1960s**: a package of new inputs.',
      v: vGRPackage,
      n: 'In the mid nineteen sixties, a new technology arrived: high yielding variety seeds. Used with fertilisers, pesticides and regular water, they raised yields sharply, first of wheat and later of rice. Farmers could now sell much more of their harvest, and the government could buy grain to build stocks for bad years. This is called the Green Revolution.',
    }),
    sl('diagram', 'Yields jump', {
      v: vYield,
      n: `Here is an imagined district. Before the new seeds, wheat yield was twelve hundred kilograms per hectare. After farmers adopted them, it rose to twenty one hundred. That is an increase of ${YLD_RISE} per cent. Gains like this, across the irrigated wheat belt, ended India's dependence on imported food grain within about a decade.`,
    }),
    sl('two-column', 'Two phases', {
      cols: ['**First phase**\n\nMid-1960s to mid-1970s: mainly wheat, in better-off irrigated states such as Punjab.', '**Second phase**\n\nMid-1970s to mid-1980s: more states and more crops, especially rice.'],
      v: vPhases,
      n: 'The revolution came in two phases. In the first, roughly from the mid sixties to the mid seventies, the seeds needed assured water and money for inputs, so they spread mainly in wheat and in better off irrigated states. In the second phase, up to the mid eighties, the technology spread to more states and to more crops, especially rice.',
    }),
    sl('check', 'Quick check: the first phase', {
      b: 'Where did the first phase of the Green Revolution mainly take hold?',
      chk: 'm_gr_phase1',
      n: 'Think about what the new seeds needed in order to work: water and money for inputs.',
    }),
    sl('example', 'Worked example 2: marketed surplus', {
      b: `An imagined Haryana farmer harvests **${WM.output} quintals** of wheat and keeps **${WM.kept} quintals** for his family.`,
      bl: ['Step 1 — Marketed surplus = output minus what is kept', 'Step 2 — Share = surplus divided by output, times 100', 'Step 3 — Link it to buffer stocks and prices'],
      v: vMSWE,
      n: `Marketed surplus is the part of the harvest a farmer sells. Our farmer harvests eighty quintals and keeps twenty, so he sells sixty. That is ${WM_PCT} per cent of his output. When millions of farmers sell such surpluses, the government can buy grain for buffer stocks, and food prices stay lower than they would otherwise be.`,
    }),
    sl('diagram', 'Why the surplus helped the poor', {
      v: vGains,
      n: 'The marketed surplus mattered beyond the farm. With more grain in the market, food grain prices fell relative to other goods. Low income families, who spend a large part of their income on food, gained. The government could also hold buffer stocks and release grain in years of drought, so famine no longer followed a bad monsoon.',
    }),
    sl('concept', 'Fears and responses', {
      b: 'Would only big farmers gain? Would pests ruin the crop?',
      v: vRisks,
      n: 'Early critics feared that only big farmers could afford the costly inputs, and that the new crops were more prone to pests. The government responded with low interest loans and subsidised fertilisers, and set up research institutes to help farmers deal with pests. As a result, many small farmers also gained, though gains stayed uneven across regions and crops.',
    }),
    sl('check', 'Quick check: marketed surplus', {
      b: `A farmer harvests ${MS.output} quintals and keeps ${MS.kept}. What percentage is marketed surplus?`,
      chk: 'n_marketed',
      n: 'First find what he sells, then divide by what he harvested, and multiply by one hundred.',
    }),
    sl('two-column', 'The subsidy debate', {
      cols: ['**Keep subsidies**\n\nMost farmers are poor; farming is risky.', '**Reduce or target them**\n\nBenefits go to fertiliser makers and richer farmers; large budget cost.'],
      v: vSubsidy,
      n: 'Subsidies on inputs such as fertiliser helped spread the new technology. Today economists debate them. Some argue that the original aim has been met, that much of the benefit goes to fertiliser makers and richer farmers, and that the cost is large. Others argue that most farmers are still small and poor and would suffer without help. In the exam, present both sides.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up part one. India chose a mixed economy guided by Five Year Plans with four goals: growth, modernisation, self reliance and equity. Land reforms abolished intermediaries but ceilings and tenancy reforms had limited success. The Green Revolution made India self sufficient in food grains, though its gains were uneven at first, and subsidies remain debated.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Name the **four goals** exactly; explain modernisation with **both** technology and social change.',
        'Land reforms: give the **reason for failure** (court cases, paper transfers), not just the reform.',
        'Green Revolution: mention **HYV seeds + fertiliser + water**, **wheat then rice**, **marketed surplus**, **buffer stock**.',
        'Subsidy questions: **for and against**, then a judgement.',
        '5 marks = five numbered points of about 20 words each.',
      ],
      n: 'Some tips. When asked about goals, name all four exactly and explain each in one line. For land reforms, examiners give marks for why ceilings failed, not just what they were. For the Green Revolution, use the key terms: high yielding seeds, marketed surplus and buffer stock. Debate questions need both sides and a short judgement at the end.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Indian Economy 1950–1990 — Part 2: Industry, Trade and an Appraisal',
  goals: [
    'Explain the role given to the public sector and the Industrial Policy Resolution 1956',
    'Explain industrial licensing and the support given to small-scale industry',
    'Explain import substitution, tariffs and quotas, and evaluate their effects',
    'Appraise the record of 1950–1990 and the case for reform',
  ],
  slides: [
    sl('title', 'Industry and Trade, 1950–1990', {
      b: 'Part 2 — the **public sector**, **IPR 1956**, **licensing**, **small industry** and **import substitution**.',
      v: vRoute2,
      n: 'In part two we turn to industry and trade. Planners believed that a poor country could not develop without a strong industrial base. We will see why the state took the lead, how the Industrial Policy Resolution of nineteen fifty six organised industry, how small industries were protected, and why trade policy looked inward. We end with an appraisal of the whole period.',
    }),
    sl('diagram', 'Why the state led industry', {
      v: vPSReasons,
      n: 'At independence Indian industrialists did not have the capital to build steel plants, power stations or heavy machine factories, and the market for such goods was still small. Such projects also take years to earn returns. So the state took the lead in heavy industry and kept control of the commanding heights of the economy, while private firms worked alongside.',
    }),
    sl('concept', 'Industrial Policy Resolution 1956', {
      b: 'The basis of the **Second Five Year Plan**: industries in **three categories**.',
      v: vIPR,
      n: 'The Industrial Policy Resolution of nineteen fifty six became the basis of the Second Plan. It placed industries in three categories. The first was to be owned only by the state. In the second, the state would set up new units and private firms would supplement its effort. The third category was left to the private sector, which needed licences.',
    }),
    sl('check', 'Quick check: the three categories', {
      b: 'Match each category or policy with its description.',
      chk: 'mt_ipr',
      n: 'Start with the extremes: one category is only for the state, another mostly for private firms. The middle one is shared.',
    }),
    sl('diagram', 'Industrial licensing', {
      v: vLicence,
      n: 'Under licensing, a private firm needed government permission to start a new unit or to expand. The state used licences to steer investment to industries it considered important and to backward regions, where licences came more easily, with tax benefits and cheaper electricity. But licences could also be delayed, and big firms sometimes collected them just to keep rivals out.',
    }),
    sl('concept', 'Small-scale industry', {
      b: 'More jobs per rupee of capital.',
      v: vSSI,
      n: 'In nineteen fifty five the Karve Committee suggested using small industries for rural development. A small unit was defined by a ceiling on its investment in plant and machinery, raised from time to time. Small units are labour intensive, so they create more jobs for the same capital. To protect them, some products were reserved for them, and they got lower excise duty and cheaper loans.',
    }),
    sl('check', 'Quick check: why small industry?', {
      b: 'Why were small-scale industries thought especially suitable for India?',
      chk: 'm_ssi_why',
      n: 'Think about what India had plenty of, and what it was short of, in the nineteen fifties.',
    }),
    sl('concept', 'Trade policy: looking inward', {
      b: '**Import substitution**: make at home what was imported.',
      bl: ['**Tariffs**: taxes on imports', '**Quotas**: limits on the quantity imported', '**Infant industry** argument: protect young firms until they can compete'],
      v: vIsub,
      n: 'Trade policy in this period was inward looking. The idea was import substitution: produce at home the goods that were earlier imported. Imports were restricted with tariffs and quotas. The reasoning was that young Indian industries, like infants, needed protection until they could compete with established foreign firms. Protection did help new industries grow, but it also reduced competition.',
    }),
    sl('two-column', 'Tariff or quota?', {
      cols: ['**Tariff**\n\nA tax on imports: they become dearer.', '**Quota**\n\nA limit on quantity: only so much can come in.'],
      v: vTariffQuota,
      n: 'Do not mix these two up. A tariff is a tax on imported goods, so they become more expensive and buyers turn to home made goods. A quota fixes the maximum quantity of a good that can be imported, whatever its price. Both protect domestic industry, but in different ways.',
    }),
    sl('example', 'Worked example 1: how a tariff protects', {
      b: `An imagined radio costs **₹${WT.import}** abroad. A tariff of **${WT.rate}%** is charged. A home-made radio costs **₹${WT.domestic}**.`,
      bl: [`Step 1 — Tariff = ${WT.rate}% of ₹${WT.import} = ₹${WT_DUTY}`, `Step 2 — Price of the import = ₹${WT.import} + ₹${WT_DUTY} = ₹${WT_LANDED}`, `Step 3 — Compare: ₹${WT_LANDED} against ₹${WT.domestic} at home`],
      v: vTariffSvg,
      n: `Let us see a tariff at work. The radio costs five hundred rupees abroad. A tariff of ${WT.rate} per cent adds four hundred rupees, so it costs nine hundred rupees in India. The home made radio costs seven hundred and fifty. Even though the foreign producer is cheaper, the tariff makes the home made radio the better buy. That is how protection shelters domestic industry.`,
    }),
    sl('check', 'Quick check: a quota', {
      b: 'A rule allows no more than 500 sewing machines to be imported in a year. What kind of restriction is this?',
      chk: 'm_quota',
      n: 'Is the rule about the price of the machines, or about how many can come in?',
    }),
    sl('concept', 'Effects of protection', {
      b: 'Gains **and** costs.',
      bl: ['New industries: machine tools, chemicals, electronics', 'Less dependence on imports; foreign exchange saved', 'Little competition: poor quality, high cost', 'Exports neglected; share in world trade stayed low'],
      v: table(['Gain', 'Cost'], [['New industries grew at home', 'Little pressure to improve quality'], ['Foreign exchange saved', 'Exports neglected']], 'Two-column table of the effects of protection: new industries grew and foreign exchange was saved, but there was little pressure to improve quality and exports were neglected'),
      n: 'Protection had two sides. On the positive side, India built many industries it had lacked and saved foreign exchange. On the negative side, firms that faced no foreign rivals had little reason to improve quality or cut costs, and consumers paid more for poorer goods. Exports were neglected, so India earned less from world trade than it might have.',
    }),
    sl('example', 'Worked example 2: reading a case', {
      b: 'An imagined scooter maker writes that a licence to expand has waited over a year, imports are banned, and buyers wait years for delivery.',
      bl: ['Step 1 — Spot the policy: licensing and import restriction', 'Step 2 — State the effect: short supply, no pressure to improve', 'Step 3 — Suggest a remedy if asked: ease licensing, reduce protection gradually'],
      v: flow('LR', ['Clue in the case', 'Name the policy', 'State its effect', 'Suggest a remedy (if asked)'], 'Flow for answering a case: find the clue, name the policy, state its effect, and suggest a remedy if asked', 'Case method'),
      n: 'Case questions describe a situation and ask you to name the policy behind it. If a firm waits a long time to expand, that is licensing. If buyers cannot get foreign goods, that is import restriction. Then state the effect: short supply and little pressure to improve. If the question asks for a remedy, suggest easing licences or gradually reducing protection.',
    }),
    sl('two-column', 'Appraising 1950–1990', {
      cols: ['**Achievements**\n\nIndustrial base; food self-sufficiency; jobs in small units.', '**Shortcomings**\n\nLoss-making public units; licence delays; inefficiency behind protection.'],
      v: vAppraisal,
      n: 'How should we judge these forty years? India built a broad industrial base, including capital goods, became self sufficient in food grains and created jobs in small units. But many public enterprises made losses, the licence system discouraged enterprise, and protection bred inefficiency. By the late nineteen eighties many economists argued that more competition was needed, which led to the reforms of nineteen ninety one.',
    }),
    sl('concept', 'Why reform was debated', {
      b: 'Not everyone drew the same lesson.',
      bl: ['One view: controls and protection had served their purpose; competition now needed', 'Another view: gains in self-reliance and equity must be protected', 'The next chapter looks at the reforms of 1991'],
      v: flow('LR', ['Strong base built (1950–90)', 'Inefficiency and slow job growth', 'Debate on more competition', 'Reforms of 1991'], 'Flow from the record of 1950 to 1990 to the reforms: a strong base was built, inefficiency and slow job growth followed, there was debate on more competition, and reforms came in 1991', 'Towards 1991'),
      n: 'Economists did not all draw the same lesson. Some argued that controls and protection had done their job and that the economy now needed competition to become efficient. Others warned that the gains in self reliance and equity must not be lost. The next chapter looks at the reforms that began in nineteen ninety one and how they have been judged.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up part two. The state led heavy industry because private capital was scarce. The Industrial Policy Resolution of nineteen fifty six created three categories and licensing. Small industries were protected for the jobs they create. Trade policy relied on import substitution through tariffs and quotas. The period built a strong base, but inefficiency led to calls for reform.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'IPR 1956: state **all three** categories correctly.',
        'Do not swap **tariff** (tax) and **quota** (quantity limit).',
        'Small industry: link to **labour intensity** and **employment**.',
        'Appraisal questions: **achievements + shortcomings + judgement**.',
        'Assertion-reason: check whether R really **explains** A.',
      ],
      n: 'Final tips. For the Industrial Policy Resolution, write all three categories. Never confuse a tariff, which is a tax, with a quota, which limits quantity. Link small industry to jobs. For appraisal questions, give achievements, shortcomings and a judgement. And in assertion reason questions, after checking that both statements are true, ask whether the reason actually explains the assertion.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Indian Economy 1950–1990 — Notes',
  sections: [
    {
      h: '1. A mixed economy and planning',
      t: 1,
      b: 'India chose a **mixed economy**: private enterprise continued, but the **state planned**, owned key industries and regulated the rest, to combine growth with welfare in a democracy.\n\n**Planning:** the **Planning Commission** was set up in **1950** with the Prime Minister as chairperson; the **First Five Year Plan** ran from **1951**. Each plan set its own priorities within long-term goals. In **2015** the Commission was replaced by **NITI Aayog**.',
      terms: [
        ['Mixed economy', 'An economy in which the public and private sectors work together, with the state planning and regulating.'],
        ['Plan', 'A statement of how a country\'s resources are to be used over a period to reach chosen goals.'],
      ],
      v: vSystems,
      vs: [vPlanFlow],
    },
    {
      h: '2. The four goals and their conflicts',
      t: 1,
      b: '1. **Growth:** a rise in productive capacity, shown by a rising GDP; what GDP is made of also matters.\n2. **Modernisation:** new technology **and** social change, such as equal rights for women.\n3. **Self-reliance:** avoiding imports of goods that can be made at home, especially **food**.\n4. **Equity:** benefits of growth should reach the poor; basic needs met; inequality reduced.\n\n**Conflicts:** labour-saving technology vs jobs; fast growth vs fair shares; self-reliance vs efficiency. Plans had to set priorities.',
      terms: [
        ['Growth', 'An increase in the economy\'s capacity to produce goods and services.'],
        ['Self-reliance', 'Producing at home what can be produced, to reduce dependence on foreign countries.'],
        ['Equity', 'Fair distribution of the benefits of growth.'],
      ],
      v: vGoals,
      vs: [vConflict],
    },
    {
      h: '3. Land reforms',
      t: 2,
      b: '**Why:** concentrated ownership, high rents and insecure tenants meant poverty and little investment in land.\n\n1. **Abolition of intermediaries** — zamindars removed; tillers dealt directly with the state. Largely achieved, though some former zamindars kept land by claiming self-cultivation.\n2. **Land ceiling** — a maximum holding per owner; surplus to the landless. **Limited**: court cases, paper transfers to relatives.\n3. **Tenancy reform** — rent regulation and security of tenure; uneven, with evictions.\n\nStates committed to land for the tiller (for example **Kerala** and **West Bengal**) achieved more.',
      terms: [
        ['Intermediary', 'A person, such as a zamindar, who collected rent from tillers and paid revenue to the state.'],
        ['Land ceiling', 'The maximum area of land one owner may hold.'],
        ['Tenancy reform', 'Measures to regulate rent and protect tenants from eviction.'],
      ],
      v: vLandReforms,
      vs: [vCeilingWE],
    },
    {
      h: '4. The Green Revolution and subsidies',
      t: 2,
      b: '**Package:** HYV seeds + fertilisers + pesticides + assured irrigation, from the **mid-1960s**.\n\n**Phases:** first, mainly **wheat** in better-off irrigated states; second (mid-1970s to mid-1980s), more states and crops, especially **rice**.\n\n**Gains:** food **self-sufficiency**; a large **marketed surplus**; government **buffer stocks**; food prices lower relative to other goods, helping low-income groups.\n\n**Risks and response:** costly inputs and pests; the state gave **cheap credit**, **subsidised fertiliser** and research support.\n\n**Subsidy debate:** for — most farmers are poor and farming risky; against — benefits go to fertiliser makers and richer farmers, and the fiscal cost is large.\n\nBy 1990 around two-thirds of the workforce still depended on agriculture, because industry and services did not absorb enough workers.',
      terms: [
        ['HYV seeds', 'High yielding variety seeds that give much higher output with fertiliser and water.'],
        ['Marketed surplus', 'The part of farm output that farmers sell in the market.'],
        ['Buffer stock', 'Grain bought and stored by the government to keep supplies and prices steady.'],
        ['Subsidy', 'A payment by the government that lowers the price a producer pays for an input.'],
      ],
      v: vGRPackage,
      vs: [vYield, vPhases, vSubsidy],
    },
    {
      h: '5. Industry: public sector, IPR 1956 and small-scale industry',
      t: 3,
      b: '**Why the state led:** scarce private capital, a small market and long-gestation projects; control of the commanding heights.\n\n**IPR 1956** (basis of the Second Plan): (1) exclusively state; (2) state sets up new units, private sector supplements; (3) private sector under **licensing**. Licences were easier in **backward regions**, with tax benefits and cheaper power.\n\n**Small-scale industry:** **Karve Committee (1955)**; defined by an investment ceiling raised over time; **labour-intensive**; supported by **reservation** of products, lower excise duty and cheaper loans.\n\n**Problems:** many public units made losses; licensing caused delays and was misused to block rivals.',
      terms: [
        ['Industrial licensing', 'Government permission needed to start a new industrial unit or expand capacity.'],
        ['Small-scale industry', 'A unit whose investment in plant and machinery is below a ceiling set by the government.'],
        ['Commanding heights', 'The key industries that shape the rest of the economy.'],
      ],
      v: vIPR,
      vs: [vPSReasons, vSSI],
    },
    {
      h: '6. Trade: import substitution',
      t: 4,
      b: '**Inward-looking** strategy: replace imports with home production.\n\n**Tools:** **tariffs** (tax on imports) and **quotas** (limit on quantity).\n\n**Reason:** the **infant industry** argument, and saving foreign exchange.\n\n**Effects:** new industries developed and import dependence fell; but protected firms faced little competition, so quality and efficiency suffered, and exports were neglected.',
      terms: [
        ['Import substitution', 'Producing at home goods that were earlier imported.'],
        ['Tariff', 'A tax on imported goods.'],
        ['Quota', 'A limit on the quantity of a good that may be imported.'],
      ],
      v: vIsub,
      vs: [vTariffQuota, vTariffSvg],
    },
    {
      h: '7. Appraisal of 1950–1990',
      t: [1, 3],
      b: '**Achievements:** broad industrial base including capital goods; food self-sufficiency; jobs in small units; less dependence on imports.\n\n**Shortcomings:** loss-making public enterprises; licence-permit delays; inefficiency and poor quality behind protection; slow growth of exports and of jobs outside farming.\n\n**Debate:** some argued competition was now needed; others stressed protecting the gains in self-reliance and equity. Reforms followed in **1991** (next chapter).',
      terms: [['Licence-permit system', 'The network of government permissions needed to produce, expand or import in 1950–90.']],
      v: vAppraisal,
    },
  ],
  tips: '**Common mistakes**\n- Listing only three goals, or explaining modernisation as technology alone.\n- Describing land reforms without the reasons for their limited success.\n- Calling the Green Revolution equally successful in all crops and regions.\n- Swapping **tariff** and **quota**.\n- Writing only one side in a subsidy or appraisal question.\n\n**How marks are usually awarded**\n- 1-mark MCQ and assertion-reason: one correct option.\n- 2 marks: two points (about 30–50 words). 3 marks: three explained points (about 50–80 words).\n- 5 marks: five numbered points (about 80–120 words); evaluation questions end with a judgement.\n- Case-based: quote the clue from the passage, then name the concept.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Economic system India chose after independence', '**Mixed economy**: private enterprise plus state planning and public ownership of key industries.', 'definition', 1],
  ['Planning Commission: year set up', '**1950**, with the Prime Minister as chairperson.', 'fact', 1],
  ['First Five Year Plan', 'Began in **1951** (1951–56).', 'fact', 1],
  ['What replaced the Planning Commission?', '**NITI Aayog**, in **2015**.', 'fact', 1],
  ['Four goals of planning', '**Growth, modernisation, self-reliance, equity**.', 'concept', 1],
  ['Modernisation: two sides', 'New **technology** and **social change** (e.g. equal rights for women).', 'concept', 1],
  ['Self-reliance', 'Avoid importing goods that can be made at home, especially **food**.', 'definition', 1],
  ['Example of conflicting goals', 'A labour-saving machine raises output (**modernisation**) but cuts jobs (**equity**).', 'example', 1],
  ['Three land reforms', 'Abolition of **intermediaries**; **land ceiling**; **tenancy reform**.', 'concept', 2],
  ['Land ceiling', 'Maximum land one owner may hold; surplus to the landless.', 'definition', 2],
  ['Why ceilings failed', 'Court cases; land put in relatives\' names; weak will in many states.', 'concept', 2],
  ['States with more success in land reform', '**Kerala** and **West Bengal** (committed to land for the tiller).', 'fact', 2],
  ['Green Revolution: start', '**Mid-1960s**, with HYV seeds.', 'fact', 2],
  ['The HYV package', 'HYV seeds + fertilisers + pesticides + **assured irrigation**.', 'concept', 2],
  ['First phase of the Green Revolution', 'Mainly **wheat**, in better-off irrigated states such as Punjab.', 'fact', 2],
  ['Second phase', 'Mid-1970s to mid-1980s: more states, more crops, especially **rice**.', 'fact', 2],
  ['Marketed surplus', 'The part of farm output **sold** in the market.', 'definition', 2],
  ['Buffer stock', 'Grain held by the government for years of shortage.', 'definition', 2],
  ['How small farmers were helped', '**Low-interest loans**, **subsidised fertiliser**, research on pests.', 'concept', 2],
  ['Subsidy debate in one line', 'For: farmers poor, farming risky. Against: benefits go to fertiliser makers and richer farmers; big fiscal cost.', 'exam-tip', 2],
  ['Agriculture\'s share of workforce around 1990', 'Still about **two-thirds**: industry and services did not absorb enough workers.', 'fact', 2],
  ['Why the public sector led industry', 'Scarce private capital, small market, long-gestation projects.', 'concept', 3],
  ['IPR 1956: three categories', '(1) State only; (2) state leads new units, private supplements; (3) private, under licensing.', 'concept', 3],
  ['Industrial licensing', 'Permission needed to **start or expand** a unit; easier in backward regions.', 'definition', 3],
  ['Karve Committee', '**1955**: use small industries for rural development.', 'fact', 3],
  ['Why support small industry?', '**Labour-intensive**: more jobs per rupee of capital.', 'concept', 3],
  ['Reservation policy', 'Some products could be made **only by small-scale units**.', 'definition', 3],
  ['Import substitution', 'Make at home what was **imported**; inward-looking trade policy.', 'definition', 4],
  ['Tariff vs quota', '**Tariff** = tax on imports; **quota** = limit on quantity.', 'exam-tip', 4],
  ['Infant industry argument', 'Protect young industries until they can compete.', 'concept', 4],
  ['Main criticism of protection', 'Little competition → poor quality, high costs; exports neglected.', 'concept', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-default-chapter-test-short',
  title: 'Chapter test (short) — Indian Economy 1950–1990',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_mixed', 'm_hyv', 'm_isub', 'ar_isub'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_land_reform', 's_tariff_quota', 's3_ps_role'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_land_reform', 'l_isub'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the passage and table and answer all parts. Part (c) has an internal choice.', items: ['cb_village'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-default-chapter-test-long',
  title: 'Chapter test (long) — Indian Economy 1950–1990',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_modern', 'm_ceiling_fail', 'm_buffer', 'm_subsidy_for', 'm_ipr_a', 'm_licence', 'm_reserve', 'm_infant', 'ar_mixed', 'ar_licence_abuse'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_mixed', 's_ssi', { attempt: 1, keys: ['s_growth_gdp', 's_subsidy_case'] }, 's3_goals', { attempt: 1, keys: ['s3_gr_benefits', 's3_isub_effects'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_appraisal', { attempt: 1, keys: ['l_gr_eval', 'l_industry_eval'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['cb_permit', 'cb_plans'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of cbse-12-economics-ch07 only (economic system and plan goals; land reforms and the Green Revolution; IPR 1956 and small-scale industry; import substitution)',
    originality: 'every case, diary, table and scenario written for this chapter (imagined people, villages, firms and figures, labelled); no NCERT text, exercise or board/sample-paper item reused',
    data: `imagined figures computed by the build (marketed surplus ${MS_SOLD}/${MS.output} = ${MS_PCT}%; ceiling ${CEIL.owned} − ${CEIL.ceiling} = ${CEIL_SURPLUS} ha, ${CEIL_FAMILIES} families; tariff ${inr(TAR.import)} + ${inr(TAR_DUTY)} = ${inr(TAR_LANDED)}, ${inr(TAR_GAP)} above the home price; yield ${YLD.before} → ${YLD.after} = ${YLD_RISE}%); no precise all-India statistics`,
    facts: 'Planning Commission 1950; First Plan 1951; NITI Aayog 2015; IPR 1956 three categories; Karve Committee 1955; Green Revolution from the mid-1960s, wheat first then rice; around two-thirds of workers in agriculture by 1990 (approximate)',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
