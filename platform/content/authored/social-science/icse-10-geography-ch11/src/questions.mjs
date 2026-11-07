// ICSE 10 Geography ch11 Energy Resources — question bank (ICSE 2027 specimen style). Data items use the ILLUSTRATIVE
// installed-capacity table of State Z exported by svgs.mjs; every computed answer is asserted. MCQ keys are placed by the builder.
import { mk, add } from './lib.mjs';
import { MIX, mw, mixTotal, pct, renewMW } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const mixList = MIX.rows.map(([n, v]) => `${n} ${v}`).join('; ');
const TOTAL = mixTotal();
const COAL = mw('Coal (thermal)');
const REN = renewMW();
const coalShare = pct(COAL);
const renShare = pct(REN);

// ---------------------------------------------------------------- t01 coal
add('coal-chk', mcq({
  stem: 'Most of the coal mined at Jharia in the Damodar valley is bituminous. Which statement about bituminous coal is correct?',
  right: 'It is the most widely used coal in India, and its coking variety is used to make steel',
  wrong: ['It has the highest carbon content of all types of coal', 'It is a soft brown coal with a very high moisture content', 'It is partly decayed plant matter found in marshes'],
  sol: 'Bituminous coal is the common coal of power stations; coking coal is a bituminous coal — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('anthracite-mcq', mcq({
  stem: 'Small deposits of the hardest coal, which burns with very little smoke and gives the most heat, occur in Jammu and Kashmir. This coal is:',
  right: 'anthracite',
  wrong: ['lignite', 'peat', 'Tertiary brown coal'],
  sol: 'Anthracite has the highest carbon content — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('lignite-mcq', mcq({
  stem: 'The lignite of Panandhro in Kutch, Gujarat, is burnt in a power station built right beside the mine. Lignite is best described as:',
  right: 'a soft brown coal with low carbon and high moisture, too poor to be worth carrying far',
  wrong: ['the hardest coal, ideal for long-distance export', 'coking coal used in steel plants', 'a liquid fuel found in sedimentary rocks'],
  sol: 'Low-grade lignite is used at pit-head stations — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('gondwana-mcq', mcq({
  stem: 'Which statement about the distribution of coal in India is correct?',
  right: 'Most of it is Gondwana coal from the river valleys of the peninsula',
  wrong: ['Most of it is Tertiary coal from Assam and Meghalaya', 'Most of it is anthracite from Jammu and Kashmir', 'Most of it is lignite from the Thar desert'],
  sol: 'Damodar, Mahanadi, Son and Godavari valleys hold most reserves — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('talcher-mcq', mcq({
  stem: 'A student lists Jharia, Bokaro, Raniganj and Talcher as coalfields of the Damodar valley. Which entry is wrong, and why?',
  right: 'Talcher, because it lies in the Mahanadi valley of Odisha',
  wrong: ['Jharia, because it lies in the Godavari valley', 'Raniganj, because it is a lignite field of Tamil Nadu', 'Bokaro, because it is a Tertiary coalfield of Assam'],
  sol: 'Jharia, Bokaro and Raniganj are Damodar valley fields; Talcher is in the Mahanadi valley — option (@K).',
  d: 2, c: 'analysis', t: [1],
}));
add('korba-mcq', mcq({
  stem: 'The thermal power station at Korba in Chhattisgarh receives coal on conveyor belts from mines a few kilometres away. The main advantage of this location is that:',
  right: 'bulky coal need not be carried over long distances, which saves transport cost',
  wrong: ['Korba lies on the coast, so ships can bring oil', 'the station uses the tides of the Mahanadi', 'coal near Korba produces no ash at all'],
  sol: 'A pit-head location cuts the cost of hauling heavy coal — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('coal-ar', ar({
  a: 'Coal from the Makum field of Assam is not preferred for making steel.',
  r: 'Tertiary coal of the north-east has a high sulphur content.',
  key: 'c',
  sol: 'Both are true, and the sulphur makes the coal unsuitable for good steel — option (c).',
  d: 3, c: 'analysis', t: [1],
}));
add('coal-tf', tf({
  stem: 'Peat has a higher carbon content than lignite.',
  key: 'f',
  sol: 'False: peat is the earliest stage of coal formation and has the lowest carbon content.',
  d: 1, c: 'recall', t: [1],
}));
add('coal-fill', fill({
  stem: 'The Singareni coalfield of Telangana lies in the valley of the river ___.',
  acc: [['Godavari']],
  sol: '**Godavari**.',
  d: 1, c: 'recall', t: [1],
}));
add('coal-short1', short({
  marks: 1,
  stem: 'Name the river valley in which both the Jharia and Raniganj coalfields lie.',
  model: 'The Damodar valley.',
  sol: 'Damodar.',
  scheme: [['Damodar valley', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('coal-short2', short({
  marks: 2,
  stem: 'A new power station near Talcher in Odisha will burn local coal. State two problems it is likely to cause for the surrounding area.',
  model: 'Smoke from the chimneys adds carbon dioxide and sulphur dioxide to the air, harming health and adding to global warming; the high-ash Indian coal leaves huge amounts of fly ash that fill ash ponds and spoil land and water; more mining also clears forest and farmland.',
  sol: 'Air pollution; fly ash (or loss of land to mining).',
  scheme: [['Air pollution', 1], ['Ash or mining damage', 1]],
  d: 2, c: 'application', t: [1],
}));
add('coal-short3', short({
  marks: 3,
  stem: 'Give three reasons why coal is an important source of energy for India.',
  model: 'India has large coal reserves of its own in Jharkhand, Odisha, Chhattisgarh and West Bengal, so supply is secure and cheaper than imported oil; coal-fired stations give steady electricity in every season, day and night; coking coal is essential for the iron and steel industry, and coal also yields by-products such as coal tar.',
  sol: 'Home reserves; steady power; steel industry.',
  scheme: [['Reserves', 1], ['Reliable power', 1], ['Industry use', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 petroleum and natural gas
add('oil-chk', mcq({
  stem: 'Which one of the following oil fields lies offshore, on the continental shelf?',
  right: 'Mumbai High',
  wrong: ['Digboi', 'Ankleshwar', 'Kalol'],
  sol: 'Mumbai High is under the Arabian Sea; the others are on land — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('cambay-mcq', mcq({
  stem: 'The Ankleshwar and Kalol oil fields belong to the:',
  right: 'Cambay (Khambhat) basin of Gujarat',
  wrong: ['Krishna–Godavari basin of Andhra Pradesh', 'Upper Assam valley', 'Barmer basin of Rajasthan'],
  sol: 'Both are onshore Gujarat fields — option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('cng-mcq', mcq({
  stem: 'Delhi changed its buses and auto-rickshaws to run on compressed natural gas. The main geographical benefit for the city was:',
  right: 'cleaner air, because natural gas burns with little smoke, soot or sulphur dioxide',
  wrong: ['a permanent supply, because natural gas is renewable', 'cheaper electricity from hydel stations', 'more fly ash that could be used to make bricks'],
  sol: 'Gas burns almost completely — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('barmer-mcq', mcq({
  stem: 'Large oil finds at Mangala in Barmer district show that petroleum in India also occurs in:',
  right: 'the sedimentary basin of western Rajasthan',
  wrong: ['the ancient crystalline rocks of the Deccan plateau', 'the Gondwana coal seams of Jharkhand', 'the glaciers of the Himalayas'],
  sol: 'Petroleum occurs in sedimentary rocks — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('hvj-mcq', mcq({
  stem: 'A fertiliser plant at Jagdishpur in Uttar Pradesh lies hundreds of kilometres from any gas field, yet it runs on natural gas. This is possible because:',
  right: 'a long-distance pipeline brings the gas from the west coast',
  wrong: ['the gas is made from the coal of the Damodar valley on site', 'the plant collects gas from the hot springs of Manikaran', 'trucks carry the gas daily from Digboi'],
  sol: 'The HVJ pipeline links the west-coast gas fields to the north — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('gas-ar', ar({
  a: 'Natural gas is used both as a fuel and as a raw material in fertiliser plants.',
  r: 'Natural gas is found only in the coal seams of the Damodar valley.',
  key: 'a',
  sol: 'A is true (urea is made from gas); R is false — gas comes from Mumbai High, Bassein, the Krishna–Godavari basin and other fields — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('oil-ar', ar({
  a: 'Some of India’s largest oil refineries stand at coastal sites such as Jamnagar in Gujarat.',
  r: 'Most of the crude oil India uses is imported by sea (as of the early 2020s).',
  key: 'c',
  sol: 'Both are true; a coastal refinery receives imported crude straight from tankers — option (c).',
  d: 3, c: 'analysis', t: [2],
}));
add('oil-tf', tf({
  stem: 'Mumbai High is an oil field in the Bay of Bengal.',
  key: 'f',
  sol: 'False: Mumbai High lies in the Arabian Sea, off the coast of Maharashtra.',
  d: 1, c: 'recall', t: [2],
}));
add('gas-fill', fill({
  stem: 'The Hazira–Vijaipur–Jagdishpur pipeline carries ___ gas from the west coast to fertiliser and power plants in northern India.',
  acc: [['natural']],
  sol: '**Natural** gas.',
  d: 1, c: 'recall', t: [2],
}));
add('oil-short2', short({
  marks: 2,
  stem: 'Name two onshore oil fields of Assam and two of Gujarat.',
  model: 'Assam: Digboi and Naharkatiya (also Moran). Gujarat: Ankleshwar and Kalol (also Lunej, Mehsana).',
  sol: 'Two in Assam; two in Gujarat.',
  scheme: [['Assam', 1], ['Gujarat', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('gas-short2', short({
  marks: 2,
  stem: 'A power company near Kakinada in Andhra Pradesh plans to run its station on gas from the Krishna–Godavari basin instead of coal. Give two environmental reasons in favour of this plan.',
  model: 'Gas burns almost completely and leaves no ash, so no ash ponds are needed; it releases very little sulphur dioxide and less carbon dioxide than coal for the same heat, so the air stays cleaner and less greenhouse gas is added.',
  sol: 'No ash; fewer harmful gases.',
  scheme: [['No ash or soot', 1], ['Less sulphur dioxide or carbon dioxide', 1]],
  d: 2, c: 'application', t: [2],
}));
add('oil-short3', short({
  marks: 3,
  stem: 'State three disadvantages of India’s heavy dependence on petroleum.',
  model: 'India’s own reserves are small, so most crude oil must be imported, costing much foreign exchange and leaving supply open to price rises and disruptions abroad; petroleum is non-renewable and will run out; burning petrol and diesel pollutes city air, and oil spills harm coasts and marine life.',
  sol: 'Imports; non-renewable; pollution.',
  scheme: [['Import dependence', 1], ['Non-renewable', 1], ['Pollution', 1]],
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 hydel power
add('hydel-chk', mcq({
  stem: 'The Bhakra dam is built across the river:',
  right: 'Sutlej',
  wrong: ['Beas', 'Mahanadi', 'Chambal'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('hirakud-mcq', mcq({
  stem: 'Before the 1950s, villages in the Mahanadi delta around Cuttack suffered frequent floods. Which project was built mainly to reduce this problem?',
  right: 'The Hirakud dam near Sambalpur',
  wrong: ['The Bhakra dam in Himachal Pradesh', 'The Nangal dam in Punjab', 'The Tarapur power station'],
  sol: 'Hirakud stores the Mahanadi’s flood water upstream — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('bhakra-states-mcq', mcq({
  stem: 'Canals from the Bhakra Nangal project irrigate farmland mainly in:',
  right: 'Punjab, Haryana and Rajasthan',
  wrong: ['Odisha, Chhattisgarh and Jharkhand', 'Kerala, Tamil Nadu and Karnataka', 'Assam, Meghalaya and Tripura'],
  sol: 'Option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('hydel-cheap-mcq', mcq({
  stem: 'Once the Hirakud power house is built, its electricity is cheap to produce because:',
  right: 'the water that turns the turbines costs nothing and is renewed by rain',
  wrong: ['coal is mined right next to the dam', 'the turbines never need any maintenance', 'the dam stands on the sea coast'],
  sol: 'No fuel has to be bought — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('hydel-site-mcq', mcq({
  stem: 'An engineer must choose a site for a new hydel power station. Which site is the most suitable?',
  right: 'A narrow gorge on a perennial Himalayan river with a large fall in height',
  wrong: ['A broad, flat plain on a river that dries up in summer', 'Sand dunes in the Thar desert', 'The flat delta of the Mahanadi close to the sea'],
  sol: 'A perennial flow, a high head and a narrow valley for the dam — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('hydel-ar', ar({
  a: 'Hydel power is hardly produced in the Thar desert.',
  r: 'A hydel station needs a regular flow of water falling from a height.',
  key: 'c',
  sol: 'Both are true; the desert lacks perennial rivers and steep slopes — option (c).',
  d: 2, c: 'application', t: [3],
}));
add('hydel-tf', tf({
  stem: 'Hydroelectricity is a renewable source of energy.',
  key: 't',
  sol: 'True: the water in the reservoir is renewed by rain and snowmelt.',
  d: 1, c: 'recall', t: [3],
}));
add('hydel-fill', fill({
  stem: 'The Hirakud dam is built across the river ___.',
  acc: [['Mahanadi']],
  sol: '**Mahanadi**.',
  d: 1, c: 'recall', t: [3],
}));
add('hydel-short1', short({
  marks: 1,
  stem: 'Name the reservoir formed behind the Bhakra dam.',
  model: 'Gobind Sagar.',
  sol: 'Gobind Sagar.',
  scheme: [['Gobind Sagar', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('hydel-short2', short({
  marks: 2,
  stem: 'Name the river and the state of (a) the Bhakra dam and (b) the Hirakud dam.',
  model: '(a) Bhakra: river Sutlej, Himachal Pradesh. (b) Hirakud: river Mahanadi, Odisha.',
  sol: 'Sutlej, Himachal Pradesh; Mahanadi, Odisha.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('bhakra-short3', short({
  marks: 3,
  stem: 'State three benefits of the Bhakra Nangal project.',
  model: 'Its canals irrigate large areas of Punjab, Haryana and Rajasthan, which helped the Green Revolution; its power houses supply electricity to Punjab, Haryana, Himachal Pradesh and Delhi for farms, homes and industry; it controls floods on the Sutlej, and the Gobind Sagar supports fishing and tourism.',
  sol: 'Irrigation; power; flood control.',
  scheme: [['Irrigation', 1], ['Power', 1], ['Flood control or other', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('hydel-adv-short3', short({
  marks: 3,
  stem: 'Give three advantages of hydroelectricity over thermal electricity.',
  model: 'Water is renewed by rain and snowmelt, while coal will run out; a hydel station gives off no smoke, ash or greenhouse gases; once the dam is built the running cost is low because no fuel is bought, and the same dam also gives irrigation and flood control.',
  sol: 'Renewable; clean; cheap and multipurpose.',
  scheme: [['Renewable', 1], ['No pollution', 1], ['Low running cost or multipurpose', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('hydel-dis-short2', short({
  marks: 2,
  stem: 'Large dams such as Hirakud are sometimes criticised. State two disadvantages of such projects.',
  model: 'Thousands of people lose their homes and farmland when the reservoir floods the valley, and forests are submerged; building costs are very high, and silt slowly fills the reservoir, while power output falls in years of poor rain.',
  sol: 'Displacement or submergence; cost, silting or drought.',
  scheme: [['Social or environmental cost', 1], ['Economic or technical limit', 1]],
  d: 3, c: 'evaluation', t: [3],
}));

// ---------------------------------------------------------------- t04 solar, wind, tidal
add('wind-chk', mcq({
  stem: 'Muppandal in Kanyakumari district of Tamil Nadu has a large cluster of wind turbines because:',
  right: 'strong, steady winds funnel through a gap in the Western Ghats there',
  wrong: ['it receives the strongest sunshine in India', 'hot springs rise from the ground there', 'the tidal range on its coast is the highest in India'],
  sol: 'Wind farms need strong, steady winds — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('solar-mcq', mcq({
  stem: 'Bhadla in Jodhpur district of Rajasthan is the site of a very large solar park. Which conditions suit it?',
  right: 'Clear skies and strong sunshine for most of the year over wide stretches of barren land',
  wrong: ['Heavy rainfall and dense forest', 'A large tidal range in a narrow gulf', 'Hot springs and volcanic rocks'],
  sol: 'Sunshine plus open land — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('tidal-chk', mcq({
  stem: 'The Gulf of Khambhat is considered suitable for generating tidal power because:',
  right: 'it is a narrow, funnel-shaped gulf with a very large tidal range',
  wrong: ['it receives sunshine on most days of the year', 'it lies over hot rocks close to the surface', 'it has rich coal seams under the sea bed'],
  sol: 'A large difference between high and low tide drives the turbines — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('meghalaya-mcq', mcq({
  stem: 'Rooftop solar panels in Shillong produce much less electricity in July than in December. The most likely reason is that:',
  right: 'monsoon clouds and rain cut the sunlight reaching the panels in July',
  wrong: ['the sun does not rise above the horizon in July', 'winds are calmer in July', 'the panels work only in cold weather'],
  sol: 'Meghalaya is very cloudy and wet in the monsoon — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('sundarbans-mcq', mcq({
  stem: 'Some islands of the Sundarbans in West Bengal lie far from the power grid but are surrounded by tidal creeks and get plenty of sunshine in the dry season. Which pair of sources suits them best?',
  right: 'Solar and tidal energy',
  wrong: ['Coal and nuclear energy', 'Geothermal energy and high-dam hydel power', 'Lignite and offshore oil'],
  sol: 'Local sunshine and tides can be used without long supply lines — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('tn-ar', ar({
  a: 'Tamil Nadu has a large installed capacity of wind power.',
  r: 'Tamil Nadu also has nuclear power stations at Kalpakkam and Kudankulam.',
  key: 'd',
  sol: 'Both are true, but nuclear stations do not explain the wind power, which depends on strong, steady winds — option (d).',
  d: 3, c: 'analysis', t: [4, 5],
}));
add('wind-tf', tf({
  stem: 'Wind turbines produce their full output even on completely calm days.',
  key: 'f',
  sol: 'False: output depends on wind speed; on calm days turbines produce little or nothing.',
  d: 1, c: 'understanding', t: [4],
}));
add('tidal-tf', tf({
  stem: 'Tidal power can be produced equally well anywhere along India’s coast.',
  key: 'f',
  sol: 'False: it needs a large tidal range in a narrow gulf, as in the Gulfs of Khambhat and Kutch.',
  d: 1, c: 'understanding', t: [4],
}));
add('pv-fill', fill({
  stem: 'Solar panels that change sunlight directly into electricity are made of ___ cells.',
  acc: [['photovoltaic', 'PV', 'solar']],
  sol: '**Photovoltaic** (PV) cells.',
  d: 1, c: 'recall', t: [4],
}));
add('wind-short2', short({
  marks: 2,
  stem: 'State one advantage and one disadvantage of the wind farms on the Kutch coast of Gujarat.',
  model: 'Advantage: they use the strong sea winds, a free and renewable source, and give power without smoke. Disadvantage: output rises and falls with wind speed, so other sources must fill gaps (turbines also take land, make noise and can harm birds).',
  sol: 'Clean, renewable; unsteady.',
  scheme: [['Advantage', 1], ['Disadvantage', 1]],
  d: 2, c: 'application', t: [4],
}));
add('tidal-short2', short({
  marks: 2,
  stem: 'Explain why the Gulf of Kutch is suitable for tidal power and how a tidal power station would produce electricity there.',
  model: 'The gulf is narrow and funnel-shaped, so the tide rises very high, giving a large tidal range. A barrage with gates would trap sea water at high tide and release it through turbines at low tide, turning generators.',
  sol: 'Large tidal range; barrage and turbines.',
  scheme: [['Reason', 1], ['Method', 1]],
  d: 2, c: 'application', t: [4],
}));
add('nce-short3', short({
  marks: 3,
  stem: 'Name one important area in India for each of solar, wind and tidal energy, and give the geographical reason why each area suits that source.',
  model: 'Solar: Bhadla in western Rajasthan — clear skies and strong sunshine with open, barren land. Wind: Muppandal in Tamil Nadu — strong, steady winds funnelled through a gap in the hills. Tidal: Gulf of Khambhat — a narrow gulf with a very large tidal range.',
  sol: 'Area and reason for each source.',
  scheme: [['Solar', 1], ['Wind', 1], ['Tidal', 1]],
  d: 2, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- t05 geothermal, nuclear, biogas
add('biogas-chk', mcq({
  stem: 'A family near Karnal in Haryana stops burning dung cakes and feeds the dung into a biogas plant instead. The main gain is that:',
  right: 'they get a smokeless cooking fuel and still keep the dung’s nutrients as manure',
  wrong: ['they no longer need any water for the plant', 'the plant produces petrol for their tractor', 'the gas is mainly oxygen, which is safe to breathe'],
  sol: 'Clean fuel plus slurry manure — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('puga-mcq', mcq({
  stem: 'The hot springs of the Puga valley in Ladakh have been studied as a possible source of:',
  right: 'geothermal energy',
  wrong: ['tidal energy', 'offshore natural gas', 'lignite'],
  sol: 'Heat from the Earth’s interior — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('manikaran-mcq', mcq({
  stem: 'Pilgrims at Manikaran in the Parvati valley of Himachal Pradesh cook rice in natural hot springs. These springs show that:',
  right: 'heat from inside the Earth reaches the surface there, a source of geothermal energy',
  wrong: ['the valley has rich coal seams just below the ground', 'the sun is very strong there in winter', 'the river Parvati is affected by tides'],
  sol: 'Hot springs are a sign of geothermal heat — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('nuclear-pair-mcq', mcq({
  stem: 'Which pair correctly matches a nuclear power station with its state?',
  right: 'Rawatbhata — Rajasthan',
  wrong: ['Kaiga — Gujarat', 'Narora — Tamil Nadu', 'Kakrapar — Karnataka'],
  sol: 'Kaiga is in Karnataka, Narora in Uttar Pradesh and Kakrapar in Gujarat — option (@K).',
  d: 2, c: 'recall', t: [5],
}));
add('nuclear-against-mcq', mcq({
  stem: 'Which is the strongest argument against building a nuclear power station close to a crowded city?',
  right: 'The risk of radiation leaks and the problem of storing radioactive waste safely',
  wrong: ['It would give off thick smoke and fly ash', 'It would need huge daily trainloads of coal', 'It could work only on sunny days'],
  sol: 'Safety and waste are the main concerns — option (@K).',
  d: 3, c: 'evaluation', t: [5],
}));
add('nuclear-ar', ar({
  a: 'The Rawatbhata nuclear power station in Rajasthan is built beside the Rana Pratap Sagar reservoir on the Chambal.',
  r: 'A nuclear power station needs a large, reliable supply of water to cool its reactors.',
  key: 'c',
  sol: 'Both are true, and the need for cooling water explains the site — option (c).',
  d: 2, c: 'application', t: [5],
}));
add('geo-ar', ar({
  a: 'Geothermal energy supplies a large share of India’s electricity today.',
  r: 'Geothermal energy comes from the natural heat inside the Earth.',
  key: 'b',
  sol: 'A is false (India’s geothermal sites are few and remote and are only being explored); R is true — option (b).',
  d: 2, c: 'understanding', t: [5],
}));
add('geo-tf', tf({
  stem: 'Hot springs are a surface sign of geothermal energy.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [5],
}));
add('methane-fill', fill({
  stem: 'Biogas burns with a clean blue flame because it is made up mainly of the gas ___.',
  acc: [['methane']],
  sol: '**Methane**.',
  d: 1, c: 'recall', t: [5],
}));
add('nuclear-short2', short({
  marks: 2,
  stem: 'Name two nuclear power stations of India and the state in which each is located.',
  model: 'Tarapur — Maharashtra; Kalpakkam — Tamil Nadu (also Rawatbhata — Rajasthan, Narora — Uttar Pradesh, Kaiga — Karnataka, Kakrapar — Gujarat, Kudankulam — Tamil Nadu).',
  sol: 'Any two with correct states.',
  scheme: [['First station and state', 1], ['Second station and state', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('biogas-short3', short({
  marks: 3,
  stem: 'Explain how biogas is produced and state two ways in which it benefits rural households.',
  model: 'Cattle dung and farm waste are mixed with water and fed into an airtight digester, where bacteria decompose them without air, giving off a gas that is mainly methane, collected under the dome. Benefits: a smokeless, cheap fuel for cooking and lighting that protects health and saves firewood; the remaining slurry is a rich manure for the fields.',
  sol: 'Process; two benefits.',
  scheme: [['Production', 1], ['Benefit 1', 1], ['Benefit 2', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('geo-short2', short({
  marks: 2,
  stem: 'Energy planners have studied the hot springs of Manikaran and the Puga valley. Explain why, and state one limitation of geothermal energy in India.',
  model: 'Hot springs show that the Earth’s inner heat lies close to the surface there, and this heat can produce steam to run turbines without fuel or smoke. Limitation: such sites are few and lie in remote mountain valleys, far from cities, so power is costly to develop and transmit.',
  sol: 'Heat near surface; few, remote sites.',
  scheme: [['Reason', 1], ['Limitation', 1]],
  d: 2, c: 'application', t: [5],
}));
add('nuclear-short3', short({
  marks: 3,
  stem: 'Evaluate nuclear power as a source of energy for India by giving three points, including at least one in favour and one against.',
  model: 'In favour: a small amount of uranium or thorium produces a very large amount of electricity without smoke or greenhouse gases, and India has thorium in the Kerala beach sands. Against: radiation leaks are a serious risk to people nearby, radioactive waste must be stored safely for very long periods, and stations are costly and slow to build.',
  sol: 'Balanced evaluation.',
  scheme: [['Point in favour', 1], ['Point against', 1], ['Third point', 1]],
  d: 3, c: 'evaluation', t: [5],
}));

// ---------------------------------------------------------------- illustrative data (State Z)
add('mix-mcq', mcq({
  stem: `State Z (illustrative) has this installed capacity in megawatts: ${mixList}. Which source has the second largest capacity?`,
  right: 'Solar',
  wrong: ['Hydel', 'Wind', 'Natural gas'],
  sol: `Order: coal ${COAL}, solar ${mw('Solar')}, hydel ${mw('Hydel')} — option (@K).`,
  d: 1, c: 'application', t: [4],
}), () => [...MIX.rows].sort((a, b) => b[1] - a[1])[1][0] === 'Solar' || 'second');
add('total-num', num({
  stem: `State Z (illustrative) has this installed capacity in megawatts: ${mixList}. What is its total installed capacity in MW?`,
  value: TOTAL, tol: 0, unit: 'MW',
  sol: `Total $= ${MIX.rows.map(([, v]) => v).join(' + ')} = ${TOTAL}$ MW.`,
  scheme: [[`${TOTAL} MW`, 1]],
  d: 1, c: 'application', t: [1, 4],
}), () => MIX.rows.reduce((s, [, v]) => s + v, 0) === 12000 || 'total');
add('coalshare-num', num({
  stem: `State Z (illustrative) has a total installed capacity of ${TOTAL} MW, of which ${COAL} MW is coal-based. What percentage of its capacity comes from coal?`,
  value: coalShare, tol: 0, unit: '%',
  sol: `Share $= \\dfrac{${COAL}}{${TOTAL}} \\times 100 = ${coalShare}$%.`,
  scheme: [[`${coalShare}%`, 1]],
  d: 2, c: 'application', t: [1],
}), () => (COAL * 100) / TOTAL === 50 || 'coal share');
add('renew-num', num({
  stem: `In State Z (illustrative), solar capacity is ${mw('Solar')} MW, hydel ${mw('Hydel')} MW and wind ${mw('Wind')} MW. What is the total renewable capacity in MW?`,
  value: REN, tol: 0, unit: 'MW',
  sol: `Renewables $= ${mw('Solar')} + ${mw('Hydel')} + ${mw('Wind')} = ${REN}$ MW.`,
  scheme: [[`${REN} MW`, 1]],
  d: 2, c: 'application', t: [3, 4],
}), () => 2100 + 1500 + 1200 === REN || 'renewables');
add('renshare-num', num({
  stem: `State Z (illustrative) has ${REN} MW of renewable capacity (solar, hydel and wind) out of a total of ${TOTAL} MW. What percentage of its capacity is renewable?`,
  value: renShare, tol: 0, unit: '%',
  sol: `Share $= \\dfrac{${REN}}{${TOTAL}} \\times 100 = ${renShare}$%.`,
  scheme: [[`${renShare}%`, 1]],
  d: 2, c: 'application', t: [4],
}), () => (REN * 100) / TOTAL === 40 || 'renewable share');

// ---------------------------------------------------------------- match
add('energy-match', match({
  marks: 2,
  stem: 'Match each power or fuel source in Column A with a site in Column B.',
  pairs: [
    ['Coal', 'Korba'],
    ['Petroleum', 'Ankleshwar'],
    ['Hydel power', 'Hirakud'],
    ['Nuclear power', 'Kaiga'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Coal → Korba; petroleum → Ankleshwar; hydel → Hirakud; nuclear → Kaiga.',
  d: 1, c: 'recall', t: [1, 2, 3, 5],
}));
add('coal-match', match({
  marks: 2,
  stem: 'Match each type of coal in Column A with its description in Column B.',
  pairs: [
    ['Anthracite', 'Highest carbon content; small deposits in Jammu and Kashmir'],
    ['Bituminous', 'Most widely used; includes coking coal'],
    ['Lignite', 'Brown coal with high moisture; Neyveli'],
    ['Peat', 'First stage of coal formation; lowest carbon'],
  ],
  order: [3, 1, 0, 2],
  sol: 'Anthracite → highest carbon; bituminous → coking coal; lignite → brown coal; peat → lowest carbon.',
  d: 1, c: 'recall', t: [1],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('coal-long', long({
  stem: '(a) Name the four types of coal in order of decreasing carbon content. [2]\n\n(b) Name two Gondwana coalfields and the river valley in which each lies. [2]\n\n(c) State three advantages of coal as a source of energy. [3]\n\n(d) State three disadvantages of using coal. [3]',
  model: '(a) Anthracite, bituminous, lignite, peat.\n\n(b) Jharia — Damodar valley; Talcher — Mahanadi valley (also Raniganj or Bokaro — Damodar; Korba — Mahanadi; Singareni — Godavari; Singrauli — Son).\n\n(c) Large home reserves, so supply is secure and cheaper than imported oil; steady power in all seasons, day and night; coking coal for iron and steel and by-products such as coal tar.\n\n(d) Non-renewable; burning releases carbon dioxide and sulphur dioxide, causing air pollution and global warming; high-ash Indian coal produces huge amounts of fly ash; mining destroys forests and farmland, and coal is bulky to transport.',
  sol: 'Types; fields; advantages; disadvantages.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 2, c: 'understanding', t: [1],
}));
add('oil-long', long({
  stem: '(a) Name two onshore oil fields of Assam and one of Gujarat. [2]\n\n(b) What is Mumbai High? Why is it important? [2]\n\n(c) Explain why natural gas is considered a cleaner fuel than coal. [3]\n\n(d) State three uses of natural gas in India. [3]',
  model: '(a) Assam: Digboi, Naharkatiya (or Moran). Gujarat: Ankleshwar (or Kalol, Lunej, Mehsana).\n\n(b) An offshore oil field on the continental shelf of the Arabian Sea, off the Maharashtra coast; it is one of India’s most productive fields of oil and associated gas.\n\n(c) It is mostly methane and burns almost completely, so it leaves practically no ash or soot; it contains very little sulphur, so little sulphur dioxide is released; it gives out less carbon dioxide than coal for the same amount of heat.\n\n(d) Fuel for power stations; raw material for fertiliser (urea) and petrochemical plants; compressed natural gas for buses and autos and piped cooking gas for homes.',
  sol: 'Fields; Mumbai High; cleaner fuel; uses.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 2, c: 'understanding', t: [2],
}));
add('hydel-long', long({
  stem: '(a) Name the river and the state of the Bhakra dam and of the Hirakud dam. [2]\n\n(b) State two benefits of the Hirakud project. [2]\n\n(c) Give three advantages of hydel power over thermal power. [3]\n\n(d) Most of India’s hydel potential lies in the Himalayas and the north-east, while the Thar desert has almost none. Explain this with three geographical reasons. [3]',
  model: '(a) Bhakra: Sutlej, Himachal Pradesh. Hirakud: Mahanadi, Odisha.\n\n(b) It controls floods in the Mahanadi delta; it irrigates farmland in Odisha and supplies electricity to its industries (any two).\n\n(c) Renewable, since rain refills the reservoirs; clean, with no smoke or ash; cheap to run, and the dams also serve irrigation and flood control.\n\n(d) Himalayan rivers are perennial, fed by snowmelt as well as monsoon rain; steep slopes and deep gorges give a large head and narrow sites for dams; heavy rainfall in the north-east keeps the rivers full. The Thar has no perennial rivers, very little rain and flat, sandy land.',
  sol: 'Rivers and states; Hirakud benefits; advantages; distribution.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 3, c: 'application', t: [3],
}));
add('nce-long', long({
  stem: '(a) Give two reasons why India needs to develop non-conventional sources of energy. [2]\n\n(b) Name one important area for wind energy and one for tidal energy in India. [2]\n\n(c) State one advantage and two disadvantages of solar energy. [3]\n\n(d) Name the fuel used in nuclear power stations, one place where it is mined in India, and two nuclear power stations with their states. [3]',
  model: '(a) Coal, oil and gas are limited and will run out, and much oil is imported; burning them pollutes the air and adds to global warming, while non-conventional sources are mostly renewable and clean.\n\n(b) Wind: Muppandal in Tamil Nadu (or the Kutch coast, Jaisalmer). Tidal: Gulf of Khambhat (or Gulf of Kutch, Sundarbans).\n\n(c) Advantage: free, renewable and pollution-free; useful in remote villages. Disadvantages: no output at night and little on cloudy days, so storage is needed; large parks need a great deal of land.\n\n(d) Uranium; mined at Jaduguda in Jharkhand. Stations: Tarapur — Maharashtra; Kaiga — Karnataka (or Rawatbhata — Rajasthan, Kalpakkam — Tamil Nadu, Narora — Uttar Pradesh, Kakrapar — Gujarat).',
  sol: 'Need; areas; solar; nuclear.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 2, c: 'understanding', t: [4, 5],
}));
add('data-long', long({
  stem: `Study the installed electricity capacity of State Z (illustrative figures, in megawatts): ${mixList}.\n\n(a) Calculate the total installed capacity. [2]\n\n(b) What percentage of the capacity is coal-based? [2]\n\n(c) Calculate the total capacity of renewable sources (solar, hydel and wind) and their percentage share. Comment on the result. [3]\n\n(d) Suggest three ways in which State Z could reduce its dependence on coal, giving a geographical reason for each. [3]`,
  model: `(a) $${MIX.rows.map(([, v]) => v).join(' + ')} = ${TOTAL}$ MW.\n\n(b) $\\dfrac{${COAL}}{${TOTAL}} \\times 100 = ${coalShare}$%.\n\n(c) $${mw('Solar')} + ${mw('Hydel')} + ${mw('Wind')} = ${REN}$ MW, which is $\\dfrac{${REN}}{${TOTAL}} \\times 100 = ${renShare}$% of the total. Renewables already supply a large part, but coal alone still gives half, so the state depends heavily on a polluting, non-renewable fuel.\n\n(d) Add solar parks if it has sunny, open land; add wind farms on windy coasts or hill gaps; build small hydel projects on perennial hill streams; set up biogas plants in dairy villages; use gas instead of coal where pipelines exist (any three with reasons).`,
  sol: `${TOTAL} MW; ${coalShare}%; ${REN} MW and ${renShare}%; three suggestions.`,
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 4, c: 'analysis', t: [1, 4],
}), () => (TOTAL === 12000 && coalShare === 50 && renShare === 40) || 'data');
