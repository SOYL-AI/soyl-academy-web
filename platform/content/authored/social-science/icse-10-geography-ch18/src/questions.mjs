// ICSE 10 Geography ch18 Waste Management — question bank (ICSE 2027 specimen style). Data items use the ILLUSTRATIVE household
// waste and food-chain figures exported by svgs.mjs, plus an illustrative town below; every computed answer is asserted.
import { mk, add } from './lib.mjs';
import { HOUSE, kg, houseTotal, share, recyclableKg, ppm } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const r1 = (x) => Math.round(x * 10) / 10;
const houseList = HOUSE.map(([n, v]) => `${n} ${v.toFixed(1)} kg`).join('; ');
const TOWN = 120; // tonnes collected per day (illustrative)
const WETPCT = 55; // per cent wet (illustrative)
const YIELD = 25; // compost as per cent of wet input (illustrative)
const townWet = (TOWN * WETPCT) / 100;
const townCompost = (townWet * YIELD) / 100;

// ---------------------------------------------------------------- t01 impact of waste
add('imp-chk', mcq({
  stem: 'Families living beside a large open dump on the edge of a city find that their well water has become smelly and discoloured. The most likely cause is:',
  right: 'leachate from the dump seeping into the groundwater',
  wrong: ['sea water entering the wells', 'too much rainfall diluting the water', 'acid rain falling on the city'],
  sol: 'Rainwater percolating through waste forms leachate — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('flood-mcq', mcq({
  stem: 'During heavy showers, several low-lying streets of a city flood within minutes because the drains are choked. Which kind of waste is most often to blame?',
  right: 'Plastic bags and wrappers',
  wrong: ['Vegetable peels', 'Garden leaves', 'Wood ash'],
  sol: 'Plastic does not decay and blocks drains — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('disease-mcq', mcq({
  stem: 'Heaps of uncollected garbage raise the risk of dengue and malaria in a town mainly because:',
  right: 'rainwater collecting in discarded containers breeds mosquitoes',
  wrong: ['garbage gives off oxygen', 'the heaps attract birds that spread dengue', 'garbage cools the air at night'],
  sol: 'Stagnant water in waste breeds mosquitoes — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('fire-mcq', mcq({
  stem: 'Fires break out again and again on garbage hills such as Ghazipur in Delhi, even when nobody lights them. The best explanation is that:',
  right: 'methane from rotting waste collects and catches fire, especially in hot weather',
  wrong: ['the hills are made of coal', 'lightning strikes them every day', 'the waste contains no organic matter'],
  sol: 'Anaerobic decay produces flammable methane — option (@K).',
  d: 3, c: 'analysis', t: [1, 3],
}));
add('imp-ar', ar({
  a: 'Burning garbage in the open is harmful to health.',
  r: 'It releases smoke and toxic gases that cause breathing problems.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('imp-tf', tf({
  stem: 'Stray cattle can fall ill after eating plastic bags from garbage heaps.',
  key: 't',
  sol: 'True: plastic collects in their stomachs.',
  d: 1, c: 'recall', t: [1],
}));
add('leachate-fill', fill({
  stem: 'The polluted liquid that forms when rainwater seeps through a heap of waste is called ___.',
  acc: [['leachate']],
  sol: '**Leachate**.',
  d: 1, c: 'recall', t: [1],
}));
add('imp-short1', short({
  marks: 1,
  stem: 'Name the city in Gujarat where a plague outbreak in 1994 was linked to poor sanitation and rotting garbage after floods.',
  model: 'Surat.',
  sol: 'Surat.',
  scheme: [['Surat', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('imp-short2', short({
  marks: 2,
  stem: 'State two ways in which accumulated waste pollutes the environment.',
  model: 'Leachate from waste seeps into the ground and pollutes groundwater and streams; burning garbage and methane fires fill the air with smoke and toxic gases (also, plastics and chemicals poison the soil).',
  sol: 'Water; air (or soil).',
  scheme: [['First', 1], ['Second', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('imp-short3', short({
  marks: 3,
  stem: 'Explain three harmful effects of a large open dump, such as Deonar in Mumbai, on people living nearby.',
  model: 'The heap spoils the landscape and gives off foul smells; leachate pollutes wells and groundwater, and methane fires fill the air with smoke that causes breathing problems; flies, mosquitoes and rats breed there and spread diseases such as cholera, typhoid and dengue.',
  sol: 'Landscape and smell; water and air; disease.',
  scheme: [['First effect', 1], ['Second effect', 1], ['Third effect', 1]],
  d: 2, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 need
add('need-chk', mcq({
  stem: 'Which statement best explains why waste management has become urgent in growing Indian cities?',
  right: 'Waste is increasing, land for dumps is scarce and uncollected waste threatens public health',
  wrong: ['Cities produce less waste every year', 'Waste never affects health', 'Dumps can be placed anywhere at no cost'],
  sol: 'Option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('rules-mcq', mcq({
  stem: 'The Solid Waste Management Rules, 2016 require every household to:',
  right: 'segregate its waste at source into separate streams',
  wrong: ['burn its waste in the backyard', 'bury all its waste in the garden', 'throw dry waste into the nearest drain'],
  sol: 'Segregation at source — option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('resource-mcq', mcq({
  stem: 'A municipality earns money by selling sorted paper, metal and plastic to recyclers and compost to farmers. This shows that good waste management:',
  right: 'recovers resources and can create income and jobs',
  wrong: ['always costs more than open dumping', 'has no effect on the environment', 'makes segregation unnecessary'],
  sol: 'Option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('need-ar', ar({
  a: 'The amount of waste is increasing in Indian cities.',
  r: 'The Swachh Bharat Mission was launched in 2014.',
  key: 'b',
  sol: 'Both are true, but R does not explain A — waste rises with urban population, incomes and packaging — option (b).',
  d: 2, c: 'analysis', t: [2],
}));
add('need-tf', tf({
  stem: 'Space for new dumping grounds is easy and cheap to find around large cities.',
  key: 'f',
  sol: 'False: land near cities is scarce and costly.',
  d: 1, c: 'understanding', t: [2],
}));
add('sbm-fill', fill({
  stem: 'The national cleanliness campaign launched in 2014 is called the Swachh ___ Mission.',
  acc: [['Bharat']],
  sol: 'Swachh **Bharat** Mission.',
  d: 1, c: 'recall', t: [2],
}));
add('need-short2', short({
  marks: 2,
  stem: 'Explain two reasons why waste management is essential in growing Indian cities.',
  model: 'Rising urban population, incomes and packaging produce more waste every year, while land for dumps is scarce; uncollected or badly dumped waste pollutes water, air and soil and spreads disease, so proper collection and disposal protect public health.',
  sol: 'More waste and scarce land; health and environment.',
  scheme: [['First reason', 1], ['Second reason', 1]],
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 key terms
add('term-chk', mcq({
  stem: 'Excess nitrates and phosphates from farm fertilisers and sewage entering a lake lead to:',
  right: 'eutrophication',
  wrong: ['biomagnification', 'thermal pollution', 'acid rain'],
  sol: 'Nutrient enrichment causes algal bloom and oxygen loss — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('gw-mcq', mcq({
  stem: 'Methane escaping from landfills contributes mainly to:',
  right: 'global warming',
  wrong: ['acid rain', 'thermal pollution', 'eutrophication'],
  sol: 'Methane is a greenhouse gas — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('acid-mcq', mcq({
  stem: 'The marble of an old monument close to an oil refinery and busy highways is turning yellow and pitted. The most likely cause is:',
  right: 'acid rain formed from sulphur dioxide and nitrogen oxides',
  wrong: ['eutrophication of a nearby lake', 'thermal pollution of a river', 'methane from a compost pit'],
  sol: 'Acid rain corrodes marble — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('thermal-mcq', mcq({
  stem: 'Fish die near the outlet where a coastal power station releases its used cooling water into the sea. The most likely cause is:',
  right: 'thermal pollution lowering the oxygen in the water',
  wrong: ['acid rain falling on the sea', 'biomagnification of plastic', 'too much dissolved oxygen'],
  sol: 'Warm water holds less oxygen — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('biomag-mcq', mcq({
  stem: 'Why are fish-eating birds such as ospreys more harmed by a persistent pesticide in a lake than the plankton in the same lake?',
  right: 'The pesticide becomes more concentrated at each higher level of the food chain',
  wrong: ['Birds drink more lake water than plankton', 'The pesticide breaks down quickly in plankton only', 'Plankton cannot absorb pesticides'],
  sol: 'Biomagnification — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('eutro-seq-mcq', mcq({
  stem: 'Which sequence correctly describes eutrophication of a lake?',
  right: 'Nutrients enter → algae multiply → algae die and decay → oxygen falls → fish die',
  wrong: ['Algae die → nutrients enter → oxygen rises → fish multiply', 'Fish die → oxygen rises → algae disappear → nutrients fall', 'Oxygen falls → nutrients enter → fish multiply → algae die'],
  sol: 'Option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('sea-mcq', mcq({
  stem: 'Some low-lying islands of the Sundarbans are slowly losing land to the sea. This is linked most directly to:',
  right: 'a rising sea level due to global warming',
  wrong: ['acid rain', 'eutrophication', 'biomagnification'],
  sol: 'Warming expands sea water and melts ice — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('term-ar', ar({
  a: 'Acid rain can kill fish in lakes.',
  r: 'It makes the water of lakes more acidic.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('term-ar2', ar({
  a: 'Biomagnification occurs with substances that are quickly broken down by bacteria.',
  r: 'DDT is a persistent pesticide.',
  key: 'd',
  sol: 'A is false — biomagnification needs persistent, non-biodegradable substances; R is true — option (d).',
  d: 2, c: 'understanding', t: [3],
}));
add('term-ar3', ar({
  a: 'Thermal pollution harms aquatic life.',
  r: 'Warm water holds more dissolved oxygen than cold water.',
  key: 'c',
  sol: 'A is true; R is false — warm water holds less oxygen — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
add('term-tf', tf({
  stem: 'Carbon dioxide and methane are both greenhouse gases.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [3],
}));
add('term-tf2', tf({
  stem: 'Eutrophication increases the amount of dissolved oxygen in a lake.',
  key: 'f',
  sol: 'False: decaying algae use up the oxygen.',
  d: 1, c: 'understanding', t: [3],
}));
add('term-fill', fill({
  stem: 'The rapid, dense growth of algae in a lake rich in nutrients is called an algal ___.',
  acc: [['bloom']],
  sol: 'Algal **bloom**.',
  d: 1, c: 'recall', t: [3],
}));
add('acid-short2', short({
  marks: 2,
  stem: 'What is acid rain? State one cause and one effect of it.',
  model: 'Rain made acidic when sulphur dioxide and nitrogen oxides dissolve in water vapour to form sulphuric and nitric acids. Cause: smoke from coal-fired power stations, factories and vehicle exhausts. Effect: it corrodes marble monuments and buildings (also harms forests and kills fish in lakes).',
  sol: 'Definition with cause; effect.',
  scheme: [['Definition and cause', 1], ['Effect', 1]],
  d: 1, c: 'understanding', t: [3],
}));
add('biomag-short2', short({
  marks: 2,
  stem: 'Define biomagnification and give one example of its harmful effect.',
  model: 'The increase in the concentration of a persistent, non-biodegradable toxic substance at each higher level of a food chain. Example: DDT building up in birds of prey made them lay thin-shelled eggs that broke (or mercury in fish poisoned people at Minamata in Japan).',
  sol: 'Definition; example.',
  scheme: [['Definition', 1], ['Example', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('eutro-short3', short({
  marks: 3,
  stem: 'Define eutrophication and explain how it leads to the death of fish in a lake.',
  model: 'Eutrophication is the over-enrichment of a water body with nutrients such as nitrates and phosphates from fertiliser run-off, sewage and detergents. The nutrients cause a dense algal bloom; when the algae die, bacteria decompose them and use up the dissolved oxygen, so fish and other animals suffocate.',
  sol: 'Definition; bloom; oxygen loss.',
  scheme: [['Definition', 1], ['Algal bloom', 1], ['Oxygen loss and death', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('gw-short3', short({
  marks: 3,
  stem: 'Explain global warming, giving one cause and two effects of it on India.',
  model: 'Global warming is the rise in the Earth’s average temperature as greenhouse gases such as carbon dioxide and methane trap heat. Cause: burning coal, oil and gas (also deforestation and methane from landfills). Effects: Himalayan glaciers retreat, threatening river flow; rising sea level endangers low coasts and islands such as the Sundarbans (also more extreme heat waves and floods).',
  sol: 'Meaning and cause; two effects.',
  scheme: [['Meaning and cause', 1], ['First effect', 1], ['Second effect', 1]],
  d: 2, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 segregation, dumping, composting
add('seg-chk', mcq({
  stem: 'In which bin should a family in Pune put vegetable peels and leftover rice?',
  right: 'The green bin for wet, biodegradable waste',
  wrong: ['The blue bin for dry, recyclable waste', 'The box for domestic hazardous waste', 'Straight into the street drain'],
  sol: 'Option (@K).',
  d: 1, c: 'application', t: [4],
}));
add('battery-mcq', mcq({
  stem: 'Used torch batteries and a broken CFL bulb from a home should be:',
  right: 'kept separately as domestic hazardous waste',
  wrong: ['put in the compost pit', 'mixed with kitchen waste in the green bin', 'thrown into a pond'],
  sol: 'They contain toxic substances — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('seg-why-mcq', mcq({
  stem: 'Segregation at source is called the first step of waste management because:',
  right: 'clean, separated waste can be composted or recycled, and hazardous items are kept apart',
  wrong: ['it makes all waste disappear', 'it removes the need for any collection', 'mixed waste is easier to compost'],
  sol: 'Option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('landfill-chk', mcq({
  stem: 'In a sanitary landfill, the clay and plastic liner at the base is meant to:',
  right: 'stop leachate from reaching the groundwater',
  wrong: ['let rainwater drain quickly into the ground', 'help the waste catch fire', 'grow grass on the waste'],
  sol: 'Option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('cover-mcq', mcq({
  stem: 'Why is the waste in a sanitary landfill covered with a layer of soil every day?',
  right: 'To keep away flies, rats and birds and to reduce smell and the risk of fire',
  wrong: ['To make the waste rot faster in the open air', 'To turn the waste into recyclable plastic', 'To let leachate flow into wells'],
  sol: 'Option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('compost-chk', mcq({
  stem: 'Which is an advantage of composting wet waste rather than dumping it in a landfill?',
  right: 'It produces useful manure and much less methane',
  wrong: ['It needs no segregation of waste', 'It uses more land for many decades', 'It produces more leachate'],
  sol: 'Option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('aerobic-mcq', mcq({
  stem: 'Food waste buried deep in a landfill gives off methane, but the same waste in a well-turned compost pit gives off very little. Why?',
  right: 'In the landfill it rots without air; in the turned pit microbes break it down with air',
  wrong: ['Compost pits are always colder than landfills', 'Food waste cannot rot in a landfill', 'Earthworms produce methane in landfills'],
  sol: 'Anaerobic versus aerobic decomposition — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('method-ar', ar({
  a: 'Only inert rejects should be sent to sanitary landfills.',
  r: 'Wet waste can be composted and dry waste recycled, while landfill space is scarce.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'application', t: [4],
}));
add('method-ar2', ar({
  a: 'Composting works best with segregated wet waste.',
  r: 'Earthworms are used in vermicomposting.',
  key: 'b',
  sol: 'Both are true, but R does not explain A — plastics, glass and hazardous items in mixed waste spoil compost — option (b).',
  d: 3, c: 'analysis', t: [4],
}));
add('method-tf', tf({
  stem: 'Open dumping is the safest method of waste disposal.',
  key: 'f',
  sol: 'False: open dumps cause leachate, fires, smell and disease.',
  d: 1, c: 'understanding', t: [4],
}));
add('method-fill', fill({
  stem: 'The breakdown of kitchen and garden waste into manure by microbes in the presence of air is called ___.',
  acc: [['composting', 'compost']],
  sol: '**Composting**.',
  d: 1, c: 'recall', t: [4],
}));
add('vermi-short1', short({
  marks: 1,
  stem: 'Name the creatures used to speed up composting in vermicomposting.',
  model: 'Earthworms.',
  sol: 'Earthworms.',
  scheme: [['Earthworms', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('seg-short2', short({
  marks: 2,
  stem: 'Explain why segregation at source is the first step of waste management.',
  model: 'Wet waste kept clean can be composted and dry waste kept clean can be recycled, which is impossible once they are mixed; hazardous items such as batteries and medicines are kept away from people, soil and water, and far less waste needs to go to landfills.',
  sol: 'Enables compost and recycling; isolates hazards.',
  scheme: [['First point', 1], ['Second point', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('landfill-short3', short({
  marks: 3,
  stem: 'State three features of a sanitary landfill that make it safer than an open dump.',
  model: 'Its base is lined with clay and plastic and a pipe collects leachate for treatment, so groundwater is protected; waste is laid in cells and covered with soil every day, keeping away flies, rats, smell and fire; vents release or collect methane, and a clay cap with soil and grass seals it when full.',
  sol: 'Liner and leachate; daily cover; vents and cap.',
  scheme: [['First feature', 1], ['Second feature', 1], ['Third feature', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('compare-short3', short({
  marks: 3,
  stem: 'A town council in Kerala must decide whether to landfill or compost its wet waste. Compare the two methods under the headings (a) land use, (b) pollution and (c) end product.',
  model: '(a) A landfill needs a large site for decades; composting needs only small yards or home pits. (b) In a landfill wet waste rots without air, producing methane and leachate; composting is aerobic and produces little methane. (c) A landfill gives nothing back, while composting gives manure for farms and gardens.',
  sol: 'Land; pollution; product.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [4],
}));
add('compost-short2', short({
  marks: 2,
  stem: 'Describe two steps in preparing and looking after a compost pit at home.',
  model: 'Lay kitchen waste in a pit or bin in layers with dry leaves and a little soil or old compost; keep the heap moist and turn it every week or two so that air reaches the microbes, and the compost is ready in about six to eight weeks.',
  sol: 'Layering; moisture and turning.',
  scheme: [['Layering', 1], ['Care', 1]],
  d: 2, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- t05 reduce, reuse, recycle
add('reduce-mcq', mcq({
  stem: 'Which of these actions is an example of reducing waste?',
  right: 'Carrying a cloth bag to the market instead of taking plastic bags',
  wrong: ['Selling old newspapers to a recycler', 'Throwing all waste into one bin', 'Burning dry leaves in the street'],
  sol: 'Option (@K).',
  d: 1, c: 'application', t: [5],
}));
add('reuse-mcq', mcq({
  stem: 'Using empty jam jars to store spices in the kitchen is an example of:',
  right: 'reuse',
  wrong: ['recycling', 'composting', 'open dumping'],
  sol: 'Option (@K).',
  d: 1, c: 'application', t: [5],
}));
add('recycle-mcq', mcq({
  stem: 'Old newspapers sold to a kabadiwala are pulped and made into new paper. This is an example of:',
  right: 'recycling',
  wrong: ['reducing', 'composting', 'landfilling'],
  sol: 'Option (@K).',
  d: 1, c: 'application', t: [5],
}));
add('order-mcq', mcq({
  stem: 'Which of the three Rs is considered the most effective, and why?',
  right: 'Reduce, because waste that is never created needs no collection, energy or disposal',
  wrong: ['Recycle, because it uses the most energy', 'Reuse, because it makes products disposable', 'All three are equally useless'],
  sol: 'Option (@K).',
  d: 3, c: 'evaluation', t: [5],
}));
add('ewaste-mcq', mcq({
  stem: 'An old mobile phone and its charger should be:',
  right: 'handed to an authorised e-waste collector for recycling',
  wrong: ['put into the green bin with food waste', 'burnt to recover the metal', 'buried in the garden'],
  sol: 'E-waste contains toxic and valuable materials — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('indore-mcq', mcq({
  stem: 'Indore has been ranked India’s cleanest city in several national surveys (as of the early 2020s). Which practice contributed most to this?',
  right: 'Strict segregation of waste at source and composting of wet waste',
  wrong: ['Burning all waste in the open', 'Dumping waste into the nearest river', 'Collecting waste only once a month'],
  sol: 'Option (@K).',
  d: 2, c: 'application', t: [4, 5],
}));
add('r-ar', ar({
  a: 'Recycling paper helps to conserve forests.',
  r: 'Fewer trees need to be cut to make new paper.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [5],
}));
add('r-tf', tf({
  stem: 'Reusing a glass bottle after washing it uses more energy than making a new bottle from raw materials.',
  key: 'f',
  sol: 'False: washing uses far less energy than melting raw materials.',
  d: 2, c: 'understanding', t: [5],
}));
add('r-fill', fill({
  stem: 'Passing on old school textbooks to younger students is an example of the R called ___.',
  acc: [['reuse', 'reusing']],
  sol: '**Reuse**.',
  d: 1, c: 'recall', t: [5],
}));
add('r-short2', short({
  marks: 2,
  stem: 'Suggest two ways in which your school can reduce the waste it produces.',
  model: 'Ban single-use plastic cups and wrappers and ask students to carry refillable bottles and steel lunch boxes; send notices and homework digitally or print on both sides of paper to cut paper waste.',
  sol: 'Two practical reduction measures.',
  scheme: [['First', 1], ['Second', 1]],
  d: 2, c: 'application', t: [5],
}));
add('r-short3', short({
  marks: 3,
  stem: 'Suggest one way each to reduce, reuse and recycle waste at home.',
  model: 'Reduce: carry a cloth bag and refuse plastic carry bags. Reuse: store food in washed glass jars or give old clothes to others. Recycle: sell newspapers, bottles and metal to a kabadiwala or recycler.',
  sol: 'One example of each R.',
  scheme: [['Reduce', 1], ['Reuse', 1], ['Recycle', 1]],
  d: 1, c: 'application', t: [5],
}));
add('r-need-short2', short({
  marks: 2,
  stem: 'Give two reasons why there is a need to reduce, reuse and recycle waste.',
  model: 'It conserves natural resources such as trees, metals and oil, and the energy needed to process them; it cuts the amount of waste sent to scarce landfills, reducing pollution (it also creates jobs).',
  sol: 'Resources and energy; less landfill and pollution.',
  scheme: [['First', 1], ['Second', 1]],
  d: 1, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- illustrative data
const restPct = share(kg('Dust and inert') + kg('Domestic hazardous'));
add('rest-num', num({
  stem: `An illustrative household produces this waste each day: ${houseList}. What percentage of its waste is dust and inert material plus domestic hazardous waste?`,
  value: restPct, tol: 0, unit: '%',
  sol: `Share $= \\dfrac{${kg('Dust and inert')} + ${kg('Domestic hazardous')}}{${houseTotal().toFixed(1)}} \\times 100 = ${restPct}$%.`,
  scheme: [[`${restPct}%`, 1]],
  d: 2, c: 'application', t: [4],
}), () => restPct === 20 || 'rest');
const plasticYear = r1(kg('Plastic') * 365);
add('plastic-num', num({
  stem: `An illustrative household throws away ${kg('Plastic')} kg of plastic a day. How many kilograms of plastic does it throw away in a year of 365 days?`,
  value: plasticYear, tol: 0, unit: 'kg',
  sol: `Plastic $= ${kg('Plastic')} \\times 365 = ${plasticYear}$ kg.`,
  scheme: [[`${plasticYear} kg`, 1]],
  d: 1, c: 'application', t: [5],
}), () => plasticYear === 73 || 'plastic');
add('town-num', num({
  stem: `An illustrative town collects ${TOWN} tonnes of waste a day, of which ${WETPCT}% is wet, biodegradable waste. How many tonnes of wet waste are collected each day?`,
  value: townWet, tol: 0, unit: 'tonnes',
  sol: `Wet waste $= ${TOWN} \\times \\dfrac{${WETPCT}}{100} = ${townWet}$ tonnes.`,
  scheme: [[`${townWet} tonnes`, 1]],
  d: 2, c: 'application', t: [2, 4],
}), () => townWet === 66 || 'wet');
add('compost-num', num({
  stem: `If the town composts its ${townWet} tonnes of wet waste a day and the compost weighs about ${YIELD}% of the waste put in (an illustrative figure), how many tonnes of compost does it make each day?`,
  value: townCompost, tol: 0, unit: 'tonnes',
  sol: `Compost $= ${townWet} \\times \\dfrac{${YIELD}}{100} = ${townCompost}$ tonnes.`,
  scheme: [[`${townCompost} tonnes`, 1]],
  d: 3, c: 'application', t: [4],
}), () => townCompost === 16.5 || 'compost');
const fishFactor = ppm('Large fish') / ppm('Small fish');
add('biomag-num', num({
  stem: `In an illustrative lake, a persistent pesticide is present at ${ppm('Small fish')} ppm in small fish and ${ppm('Large fish')} ppm in the large fish that eat them. How many times more concentrated is it in the large fish?`,
  value: fishFactor, tol: 0, unit: 'times',
  sol: `Factor $= ${ppm('Large fish')} \\div ${ppm('Small fish')} = ${fishFactor}$.`,
  scheme: [[`${fishFactor} times`, 1]],
  d: 2, c: 'application', t: [3],
}), () => fishFactor === 4 || 'factor');
const pairPct = share(kg('Kitchen and garden (wet)') + recyclableKg());
add('data-mcq', mcq({
  stem: `An illustrative household produces this waste each day: ${houseList}. If its wet waste is composted and its paper, plastic, glass and metal are recycled, what share of its waste is kept out of the dump?`,
  right: `${pairPct}%`,
  wrong: ['50%', '30%', '95%'],
  sol: `$\\dfrac{${kg('Kitchen and garden (wet)').toFixed(1)} + ${recyclableKg()}}{${houseTotal().toFixed(1)}} \\times 100 = ${pairPct}$% — option (@K).`,
  d: 3, c: 'analysis', t: [4, 5],
}), () => pairPct === 80 || 'pair');

// ---------------------------------------------------------------- match
add('term-match', match({
  marks: 2,
  stem: 'Match each environmental problem in Column A with its description in Column B.',
  pairs: [
    ['Eutrophication', 'Algal bloom and loss of oxygen in a lake'],
    ['Acid rain', 'Yellowing and pitting of marble'],
    ['Biomagnification', 'A pesticide building up in birds of prey'],
    ['Thermal pollution', 'Hot water released from a power station'],
  ],
  order: [3, 0, 2, 1],
  sol: 'Eutrophication → algal bloom; acid rain → marble damage; biomagnification → pesticide in birds of prey; thermal pollution → hot water.',
  d: 1, c: 'recall', t: [3],
}));
add('bin-match', match({
  marks: 2,
  stem: 'Match each item of household waste in Column A with where it should go in Column B.',
  pairs: [
    ['Vegetable peels', 'Green bin, then compost'],
    ['Old newspapers', 'Blue bin, then recycling'],
    ['Used batteries', 'Domestic hazardous waste collection'],
    ['Floor sweepings and broken ceramic', 'Sanitary landfill'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Peels → green bin; newspapers → blue bin; batteries → hazardous collection; inert sweepings → landfill.',
  d: 2, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('imp-long', long({
  stem: '(a) State two ways in which accumulated waste spoils the landscape. [2]\n\n(b) Name two diseases spread by garbage heaps and the carriers that spread them. [2]\n\n(c) Explain how an open dump pollutes (i) groundwater and (ii) the air. [3]\n\n(d) Give three reasons why waste management is essential in growing Indian cities. [3]',
  model: '(a) Garbage piles up along roads, railway tracks and riverbanks; huge dumping grounds rise like hills on city edges and litter blows across open land.\n\n(b) Malaria or dengue — mosquitoes breeding in water trapped in waste; cholera or typhoid — flies and contaminated water (rats also spread disease).\n\n(c) (i) Rainwater percolates through the waste and forms leachate, which carries chemicals and germs into the groundwater. (ii) Rotting waste releases methane, which catches fire; burning garbage gives off smoke and toxic gases.\n\n(d) Waste is increasing with urban population and consumption; land for dumps is scarce; proper management protects health and the environment and recovers resources and jobs.',
  sol: 'Landscape; diseases; pollution; need.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 2, c: 'understanding', t: [1, 2],
}));
add('term-long', long({
  stem: '(a) What is global warming? State one cause. [2]\n\n(b) State one cause and one effect of acid rain. [2]\n\n(c) Explain how eutrophication occurs. [3]\n\n(d) Define biomagnification and thermal pollution, giving one effect of each. [3]',
  model: '(a) The rise in the Earth’s average temperature because greenhouse gases trap heat. Cause: burning fossil fuels (also deforestation, methane from landfills).\n\n(b) Cause: sulphur dioxide and nitrogen oxides from power stations, factories and vehicles. Effect: corrosion of marble buildings and monuments (also dead lakes, damaged forests).\n\n(c) Nitrates and phosphates from fertiliser run-off, sewage and detergents enrich a lake; algae grow rapidly into a bloom; when they die, bacteria decompose them and use up the dissolved oxygen, so fish die.\n\n(d) Biomagnification: the rise in concentration of a persistent poison at each higher level of a food chain — birds of prey lay thin-shelled eggs. Thermal pollution: harmful heating of a water body by hot discharges from power stations and industries — less dissolved oxygen kills fish.',
  sol: 'Global warming; acid rain; eutrophication; two definitions.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 2, c: 'understanding', t: [3],
}));
add('method-long', long({
  stem: '(a) What is meant by segregation at source? Name the three streams of household waste. [2]\n\n(b) Why is segregation called the first step of waste management? [2]\n\n(c) Distinguish between an open dump and a sanitary landfill (three points). [3]\n\n(d) Describe composting and give two advantages of it. [3]',
  model: '(a) Separating waste where it is produced, at home, school or shop. Streams: wet (biodegradable), dry (recyclable) and domestic hazardous.\n\n(b) Separated wet waste can be composted and dry waste recycled, while hazardous items are kept away from people and soil; much less waste then needs disposal.\n\n(c) An open dump has no liner, but a landfill has a clay and plastic liner with leachate collection; dump waste lies uncovered, while landfill waste gets daily soil cover; methane escapes and catches fire in a dump, but is vented in a landfill, which is finally capped.\n\n(d) Kitchen and garden waste is layered with dry leaves and soil in a pit or bin, kept moist and turned so that microbes (or earthworms) break it down with air into manure in six to eight weeks. Advantages: gives manure for soil; keeps wet waste out of landfills, reducing methane and leachate.',
  sol: 'Segregation; reason; dump vs landfill; composting.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 2, c: 'understanding', t: [4],
}));
add('r-long', long({
  stem: '(a) Explain what is meant by reduce, reuse and recycle. [2]\n\n(b) Give two reasons why the three Rs are needed. [2]\n\n(c) Suggest a three-point plan to cut waste in your school. [3]\n\n(d) A student says that if everyone followed the three Rs, landfills would no longer be needed. Evaluate this statement in three points. [3]',
  model: '(a) Reduce: create less waste in the first place. Reuse: use an item again for the same or another purpose. Recycle: process used materials into new products.\n\n(b) They save natural resources and energy; they cut the waste reaching scarce landfills and so reduce pollution (also jobs).\n\n(c) Refillable bottles and steel boxes with no single-use plastic; a compost pit for canteen and garden waste; a paper and e-waste collection drive with recyclers.\n\n(d) Largely true: most household waste is wet or recyclable, so composting and recycling could divert most of it. But some waste — dust, inert rubble, broken ceramic and non-recyclable rejects — still needs safe disposal. Hazardous waste needs special treatment, so a small, well-run sanitary landfill will still be needed.',
  sol: 'Meanings; need; plan; evaluation.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 3, c: 'evaluation', t: [4, 5],
}));
const weekly = houseTotal() * 7;
const yearly = r1(houseTotal() * 365);
const townT = (50000 * houseTotal()) / 1000;
add('data-long', long({
  stem: `Study the illustrative daily waste of one household: ${houseList}.\n\n(a) Calculate the percentage of wet waste and of recyclable dry waste (paper, plastic, glass and metal). [2]\n\n(b) How much waste does the household produce in a week and in a year of 365 days? [2]\n\n(c) If the wet waste is composted and the recyclable waste recycled, what percentage of the waste is kept out of the dump? Where should the rest go? [3]\n\n(d) A town has 50,000 such households. Calculate the town’s daily waste in tonnes and suggest two measures to manage it. [3]`,
  model: `(a) Wet $= \\dfrac{${kg('Kitchen and garden (wet)').toFixed(1)}}{${houseTotal().toFixed(1)}} \\times 100 = ${share(kg('Kitchen and garden (wet)'))}$%; recyclable $= \\dfrac{${recyclableKg()}}{${houseTotal().toFixed(1)}} \\times 100 = ${share(recyclableKg())}$%.\n\n(b) Week $= ${houseTotal().toFixed(1)} \\times 7 = ${weekly}$ kg; year $= ${houseTotal().toFixed(1)} \\times 365 = ${yearly}$ kg.\n\n(c) $${share(kg('Kitchen and garden (wet)'))} + ${share(recyclableKg())} = ${pairPct}$%. The dust and inert material should go to a sanitary landfill and the domestic hazardous waste to a separate hazardous-waste collection.\n\n(d) $50000 \\times ${houseTotal().toFixed(1)} = ${50000 * houseTotal()}$ kg $= ${townT}$ tonnes a day. Measures: enforce segregation at source with door-to-door collection of separate streams; set up composting plants and dry-waste recovery centres (also awareness drives, bans on single-use plastic).`,
  sol: `${share(kg('Kitchen and garden (wet)'))}% and ${share(recyclableKg())}%; ${weekly} and ${yearly} kg; ${pairPct}%; ${townT} tonnes.`,
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 4, c: 'analysis', t: [4, 5],
}), () => (weekly === 14 && yearly === 730 && pairPct === 80 && townT === 100) || 'data');
