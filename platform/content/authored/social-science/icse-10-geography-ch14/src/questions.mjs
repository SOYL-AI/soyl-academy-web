// ICSE 10 Geography ch14 Cash Crops — question bank (ICSE 2027 specimen style). Data items use the ILLUSTRATIVE cane, sugar
// recovery and leaf-to-tea figures exported by svgs.mjs; every computed answer is asserted. MCQ keys are placed by the builder.
import { mk, add } from './lib.mjs';
import { CANE, caneYield, caneGap, RECOVERY, CRUSH, sugarPerDay, LEAF_RATIO } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const yN = caneYield('N');
const yS = caneYield('S');
const gap = caneGap();
const sugar = sugarPerDay();
const LEAF_Q = 1800;
const madeQ = LEAF_Q / LEAF_RATIO;

// ---------------------------------------------------------------- t01 sugarcane
add('cane-chk', mcq({
  stem: 'After harvesting sugarcane near Kolhapur, a farmer lets the stubble left in the ground sprout into a second crop without replanting. This practice is called:',
  right: 'ratooning',
  wrong: ['transplanting', 'retting', 'broadcasting'],
  sol: 'The second crop is a ratoon crop — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('cane-climate-mcq', mcq({
  stem: 'A cold wave with frost in January damaged standing sugarcane in the Terai of Uttar Pradesh. This happened because sugarcane:',
  right: 'is a tropical crop that needs warm, frost-free weather through its long growing period',
  wrong: ['is a rabi crop harvested in December', 'needs snow to ripen', 'grows only for three months in summer'],
  sol: 'Frost injures the long-standing tropical crop — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('cane-mill-mcq', mcq({
  stem: 'Sugar mills in Meerut and Muzaffarnagar districts stand close to the cane fields mainly because:',
  right: 'cut cane is bulky and loses its sugar content quickly, so it must be crushed within about a day',
  wrong: ['sugar mills need sea water for cooling', 'cane can be stored for years without loss', 'the mills use coal mined in the cane fields'],
  sol: 'A weight-losing, perishable raw material ties mills to the fields — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('cane-south-mcq', mcq({
  stem: 'Sugarcane yields per hectare in Tamil Nadu are usually higher than in Bihar. Which is the best explanation?',
  right: 'A frost-free tropical climate gives a longer growing season, helped by good irrigation',
  wrong: ['Bihar receives no monsoon rain at all', 'Tamil Nadu grows cane only as a rabi crop', 'Bihar’s soils are too rich for sugarcane'],
  sol: 'Climate and season length favour the peninsula — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('cane-states-mcq', mcq({
  stem: 'Which state is a leading producer of sugarcane in India (the largest as of the early 2020s)?',
  right: 'Uttar Pradesh',
  wrong: ['Assam', 'Himachal Pradesh', 'Kerala'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('cane-ar', ar({
  a: 'Sugarcane in Maharashtra is grown with heavy irrigation.',
  r: 'Sugarcane needs a great deal of water over a long period, while much of Maharashtra receives only moderate rainfall.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'application', t: [1],
}));
add('cane-tf', tf({
  stem: 'A ratoon crop usually gives a higher yield than the first planted crop.',
  key: 'f',
  sol: 'False: yields fall with each ratoon.',
  d: 2, c: 'understanding', t: [1],
}));
add('cane-fill', fill({
  stem: 'Sugarcane is planted from ___, pieces of stem that carry two or three buds.',
  acc: [['setts', 'sets', 'cuttings']],
  sol: '**Setts**.',
  d: 1, c: 'recall', t: [1],
}));
add('cane-short2', short({
  marks: 2,
  stem: 'State the climatic and soil requirements of sugarcane.',
  model: 'Climate: hot and humid, about 21–27 °C, free from frost, with about 75–150 cm of rain or irrigation over a long growing period. Soil: deep, fertile, well-drained alluvial or black soil, well manured.',
  sol: 'Climate; soil.',
  scheme: [['Climate', 1], ['Soil', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('ratoon-short2', short({
  marks: 2,
  stem: 'What is ratooning? State one advantage and one disadvantage of it.',
  model: 'Ratooning is allowing the stubble of a harvested sugarcane crop to sprout and grow into the next crop without replanting. Advantage: it saves the cost of setts and ploughing, and the crop matures sooner. Disadvantage: the yield falls with each ratoon and pests and diseases build up.',
  sol: 'Definition; advantage; disadvantage.',
  scheme: [['Definition', 1], ['Advantage and disadvantage', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('cane-short3', short({
  marks: 3,
  stem: 'Explain three reasons why sugarcane yields per hectare are higher in peninsular India than in the northern plains.',
  model: 'The peninsula has a tropical climate without frost, so cane grows for a longer period and builds up more sugar, while northern cane suffers cold winters, frost and the hot loo; the black and red soils of Maharashtra and Karnataka hold moisture and are supported by good irrigation; cooperative mills and better farm management help farmers use improved varieties and fertiliser.',
  sol: 'Climate and season; soil and irrigation; management.',
  scheme: [['Climate or season', 1], ['Soil or irrigation', 1], ['Management or sugar content', 1]],
  d: 3, c: 'analysis', t: [1],
}));
add('cane-eval-short2', short({
  marks: 2,
  stem: 'Growing sugarcane in the drought-prone Marathwada region of Maharashtra is often debated. Give one argument for and one argument against it.',
  model: 'For: cane earns farmers a high, assured income and supports local cooperative sugar mills and jobs. Against: it needs huge amounts of water for many months, draining reservoirs and groundwater in a region that often faces drinking-water shortages.',
  sol: 'For: income; against: water use.',
  scheme: [['For', 1], ['Against', 1]],
  d: 3, c: 'evaluation', t: [1],
}));

// ---------------------------------------------------------------- t02 oilseeds
add('oil-chk', mcq({
  stem: 'Groundnut is widely grown on the light, sandy-loam soils of Saurashtra in Gujarat. Why do such soils suit it?',
  right: 'Its pods develop underground and need loose, well-drained soil',
  wrong: ['It must stand in water for months like paddy', 'It needs heavy clay that cracks in summer', 'It grows only on saline soil'],
  sol: 'Loose soil lets the pegs push in and pods swell — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('soya-mcq', mcq({
  stem: 'Madhya Pradesh is often called the soya state of India. In Madhya Pradesh, soya bean is grown mainly:',
  right: 'as a kharif crop on the well-drained black soils of the Malwa plateau',
  wrong: ['as a rabi crop on the sand dunes of the Thar', 'on terraced hill slopes under shade trees', 'on the flooded floodplains of the delta'],
  sol: 'Option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('groundnut-state-mcq', mcq({
  stem: 'Which state is a leading producer of groundnut (the largest as of the early 2020s)?',
  right: 'Gujarat',
  wrong: ['Punjab', 'Assam', 'Himachal Pradesh'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('oil-ar', ar({
  a: 'Groundnut grows poorly on heavy clayey soils that become waterlogged.',
  r: 'Groundnut pods form underground and need loose, well-drained soil.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'analysis', t: [2],
}));
add('oil-tf', tf({
  stem: 'Groundnut would grow best on the heavy, waterlogged clays of the Sundarbans.',
  key: 'f',
  sol: 'False: groundnut pods form underground and need loose, well-drained sandy loam; waterlogged clay rots them.',
  d: 2, c: 'application', t: [2],
}));
add('oil-fill', fill({
  stem: 'The solid residue left after oil is pressed from groundnut or mustard seeds, used as cattle feed and manure, is called ___.',
  acc: [['oilcake', 'oil cake', 'oil-cake']],
  sol: '**Oilcake**.',
  d: 1, c: 'recall', t: [2],
}));
add('oil-short1', short({
  marks: 1,
  stem: 'Name the plateau of Madhya Pradesh whose black soils grow much of India’s soya bean.',
  model: 'The Malwa plateau.',
  sol: 'Malwa plateau.',
  scheme: [['Malwa', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('oil-short2', short({
  marks: 2,
  stem: 'A farmer in Saurashtra plans to sow groundnut. State the season in which he should sow it and the type of soil that suits it, with a reason.',
  model: 'He should sow it in the kharif season, with the onset of the monsoon. A light, loose, well-drained sandy loam suits it, because the pods develop underground and need soil they can push into without waterlogging.',
  sol: 'Kharif; loose sandy loam because pods form underground.',
  scheme: [['Season', 1], ['Soil with reason', 1]],
  d: 2, c: 'application', t: [2],
}));
add('oil-short3', short({
  marks: 3,
  stem: 'Name the season and one leading state (as of the early 2020s) for each of groundnut, mustard and soya bean.',
  model: 'Groundnut — mainly kharif — Gujarat. Mustard — rabi — Rajasthan. Soya bean — kharif — Madhya Pradesh.',
  sol: 'Season and state for each.',
  scheme: [['Groundnut', 1], ['Mustard', 1], ['Soya bean', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('oil-adv-short2', short({
  marks: 2,
  stem: 'A farmer near Bharatpur in Rajasthan, with light loamy soil and little winter rain, must choose between mustard and soya bean for the winter season. Advise him, giving two reasons.',
  model: 'Mustard. It is a rabi crop that grows in cool winter weather, whereas soya bean is a kharif crop; mustard needs very little water (about 25–40 cm), which suits the dry winter of eastern Rajasthan.',
  sol: 'Mustard: rabi crop; low water need.',
  scheme: [['Season reason', 1], ['Water reason', 1]],
  d: 2, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 cotton
add('cotton-chk', mcq({
  stem: 'Cotton grows well on the black soils of the Vidarbha region of Maharashtra mainly because these soils:',
  right: 'hold moisture for a long time and are rich in lime, potash and magnesium',
  wrong: ['are sandy and drain water at once', 'are acidic and rich in humus like tea soils', 'are flooded with fresh silt every year'],
  sol: 'Moisture retention and minerals — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('boll-mcq', mcq({
  stem: 'Cotton farmers in Telangana hope for dry, sunny weather in October and November because:',
  right: 'rain on the opening bolls stains the fibre and lowers its quality',
  wrong: ['cotton is sown only after the rains stop', 'frost is needed for the bolls to open', 'the plants need flooding at that stage'],
  sol: 'Bright, dry weather is needed at picking — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('cotton-states-mcq', mcq({
  stem: 'Which group lists leading cotton-producing states of India?',
  right: 'Gujarat, Maharashtra and Telangana',
  wrong: ['Kerala, Assam and West Bengal', 'Himachal Pradesh, Uttarakhand and Sikkim', 'Bihar, Jharkhand and Odisha'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('punjab-cotton-mcq', mcq({
  stem: 'Cotton is grown in the Bathinda and Mansa districts of Punjab, though the rainfall there is low. This is possible because:',
  right: 'canal irrigation makes up for the low rainfall',
  wrong: ['the area has black soil like the Deccan', 'cotton needs no water at all', 'heavy winter snow waters the crop'],
  sol: 'Irrigated alluvium supports cotton in the north-west — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('ginning-mcq', mcq({
  stem: 'The process of separating cotton fibre from its seeds is called:',
  right: 'ginning',
  wrong: ['retting', 'ratooning', 'withering'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('cotton-ar', ar({
  a: 'Cotton is a kharif crop.',
  r: 'Cotton needs high temperatures and moderate rain during growth, and dry, sunny weather at picking time.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('cotton-ar2', ar({
  a: 'Gujarat is a leading producer of cotton (as of the early 2020s).',
  r: 'Ahmedabad has many cotton textile mills.',
  key: 'b',
  sol: 'Both are true, but R does not explain A — production depends on soil, climate and irrigation, not on mills — option (b).',
  d: 3, c: 'analysis', t: [3],
}));
add('cotton-tf', tf({
  stem: 'Cotton plants need standing water in the field, like paddy.',
  key: 'f',
  sol: 'False: cotton needs moderate rain and well-drained soil; standing water harms it.',
  d: 1, c: 'understanding', t: [3],
}));
add('cotton-fill', fill({
  stem: 'The black soil of the Deccan, on which much of India’s cotton is grown, is also called ___ soil.',
  acc: [['regur', 'black cotton']],
  sol: '**Regur** (black cotton) soil.',
  d: 1, c: 'recall', t: [3],
}));
add('cotton-short2', short({
  marks: 2,
  stem: 'Explain why black soil and a long frost-free period suit cotton.',
  model: 'Black soil holds moisture for a long time, so the plant keeps getting water through dry spells, and it is rich in lime, potash and magnesium. Cotton grows slowly and needs about 210 frost-free days to mature, so frost would kill it before the bolls ripen.',
  sol: 'Moisture and minerals; long growth period.',
  scheme: [['Black soil', 1], ['Frost-free period', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('cotton-short3', short({
  marks: 3,
  stem: 'Give three geographical reasons why Gujarat and Maharashtra are leading cotton-producing states.',
  model: 'Large areas of black (regur) soil that hold moisture and are rich in lime and potash; a warm climate of about 21–30 °C with a long frost-free season and moderate monsoon rain, followed by dry, sunny weather at picking time; irrigation from canals and drip systems in parts of both states, along with improved seeds.',
  sol: 'Soil; climate; irrigation and seeds.',
  scheme: [['Soil', 1], ['Climate', 1], ['Irrigation or seeds', 1]],
  d: 2, c: 'application', t: [3],
}));
add('cotton-pick-short2', short({
  marks: 2,
  stem: 'Cotton farmers in Telangana pick their crop by hand three or four times over several weeks. Explain why, and state what happens to the cotton after picking.',
  model: 'The bolls on a plant do not open at the same time, so pickers return several times to collect only the opened bolls before rain or dust spoils them. After picking, the cotton is ginned to separate the fibre from the seed, and the fibre is pressed into bales for the mills.',
  sol: 'Bolls open at different times; ginning and baling.',
  scheme: [['Reason', 1], ['After picking', 1]],
  d: 2, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 jute
add('jute-chk', mcq({
  stem: 'Near Murshidabad, cut jute stalks are tied into bundles and kept under water in ponds for two to three weeks. This process, which loosens the fibre, is called:',
  right: 'retting',
  wrong: ['ginning', 'ratooning', 'withering'],
  sol: 'Bacteria in the water loosen the fibre — option (@K).',
  d: 1, c: 'application', t: [4],
}));
add('delta-chk', mcq({
  stem: 'Nearly all of India’s jute is grown in and around the Ganga–Brahmaputra delta. Which combination best explains this?',
  right: 'Hot, humid climate, heavy rain, fertile silt renewed by floods and plenty of water for retting',
  wrong: ['Cool winters, black soil and frost-free days', 'Dry sunny weather, sandy soil and little water', 'Hill slopes, acidic soil and shade trees'],
  sol: 'Option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('jute-climate-mcq', mcq({
  stem: 'Which set of conditions suits jute?',
  right: 'Temperatures above about 25 °C, heavy rain of about 150–250 cm and high humidity',
  wrong: ['A cool growing season and 50–75 cm of rain', 'Very low rain of 25–40 cm and sandy soil', 'Snowfall in winter and frost in spring'],
  sol: 'Option (@K).',
  d: 2, c: 'recall', t: [4],
}));
add('jute-state-mcq', mcq({
  stem: 'Which state is a leading producer of jute (the largest as of the early 2020s)?',
  right: 'West Bengal',
  wrong: ['Rajasthan', 'Gujarat', 'Kerala'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('jute-mill-mcq', mcq({
  stem: 'Most of India’s jute mills are on the banks of the Hooghly near Kolkata because:',
  right: 'raw jute from the delta, water, cheap labour and a port are all close at hand',
  wrong: ['the Hooghly valley has the largest coalfields of India', 'jute grows only inside Kolkata city', 'jute cannot be carried by road or rail'],
  sol: 'Raw material, water, labour and port — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('partition-mcq', mcq({
  stem: 'Soon after 1947, the jute mills of the Hooghly faced a shortage of raw jute. The main reason was that:',
  right: 'much of the jute-growing delta went to East Pakistan (now Bangladesh), while most mills stayed in India',
  wrong: ['jute plants were destroyed by frost that year', 'the mills switched to making tea', 'jute could no longer be retted anywhere'],
  sol: 'Partition separated the growing areas from the mills — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('jute-future-mcq', mcq({
  stem: 'Which step would most help jute farmers of Bihar and West Bengal to sell more of their crop?',
  right: 'Promoting jute bags and products as biodegradable substitutes for plastic',
  wrong: ['Moving jute cultivation to the Thar desert', 'Banning the retting of jute', 'Replacing jute bags with nylon sacks in government purchases'],
  sol: 'Its eco-friendly nature is jute’s main market advantage — option (@K).',
  d: 3, c: 'evaluation', t: [4],
}));
add('jute-ar', ar({
  a: 'Jute cultivation is concentrated in the delta of West Bengal.',
  r: 'Retting needs plenty of slow-moving or still water, which the delta provides.',
  key: 'a',
  sol: 'Both are true, and R is a correct explanation of A — option (a).',
  d: 2, c: 'application', t: [4],
}));
add('jute-ar2', ar({
  a: 'Jute is a kharif crop.',
  r: 'Jute needs a cool, dry climate with frost.',
  key: 'c',
  sol: 'A is true; R is false — jute needs a hot, humid climate with heavy rain — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('jute-tf', tf({
  stem: 'Fresh silt spread by floods each year helps to keep the jute soils of the delta fertile.',
  key: 't',
  sol: 'True: jute exhausts the soil, and flood silt renews it.',
  d: 1, c: 'understanding', t: [4],
}));
add('jute-fill', fill({
  stem: 'Coarse jute sacks used to pack grain, sugar and cement are commonly called ___ bags.',
  acc: [['gunny', 'hessian']],
  sol: '**Gunny** bags.',
  d: 1, c: 'recall', t: [4],
}));
add('jute-short1', short({
  marks: 1,
  stem: 'Name the river along whose banks most of India’s jute mills are located.',
  model: 'The Hooghly.',
  sol: 'Hooghly.',
  scheme: [['Hooghly', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('jute-short2', short({
  marks: 2,
  stem: 'Describe the retting of jute.',
  model: 'The harvested jute stalks are tied in bundles and kept under slow-moving or still water for about two to three weeks, weighted down so they stay submerged. Bacteria rot the soft tissue binding the fibre to the stem, after which the fibre is stripped off, washed and dried in the sun.',
  sol: 'Soaking; bacterial action; stripping and drying.',
  scheme: [['Soaking under water', 1], ['Bacteria loosen fibre; stripping and drying', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('jute-short3', short({
  marks: 3,
  stem: 'Explain three reasons why the jute crop of India is concentrated in the Ganga–Brahmaputra delta.',
  model: 'The delta is hot and humid with 150–250 cm of rain, which jute needs; annual floods spread fresh silt that renews the soil fertility which jute quickly exhausts; ponds, channels and slow rivers supply the large amount of water needed for retting (also cheap labour and nearby Hooghly mills and the port of Kolkata).',
  sol: 'Climate; silt; retting water.',
  scheme: [['Climate', 1], ['Soil renewal', 1], ['Water for retting or labour', 1]],
  d: 2, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- t05 tea
add('tea-chk', mcq({
  stem: 'Pluckers on a tea estate in the Nilgiris pick only two leaves and a bud from each shoot, every week or two. Why are only these parts plucked?',
  right: 'The young, tender leaves give the best-quality tea',
  wrong: ['Older leaves are poisonous', 'The buds are sold as seed', 'Only these parts can be fermented in the field'],
  sol: 'Tender tips make fine tea — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('slope-mcq', mcq({
  stem: 'The tea gardens around Darjeeling are laid out on steep hill slopes rather than on the flat valley floors. The main reason is that:',
  right: 'slopes drain rainwater quickly, and tea roots are damaged by standing water',
  wrong: ['tea needs snow, which falls only on slopes', 'flat land is too warm for any crop', 'slopes receive no rain, which tea prefers'],
  sol: 'Good drainage — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('tea-climate-mcq', mcq({
  stem: 'Frequent light showers through much of the year, with temperatures of about 20–30 °C, help the tea gardens of the Brahmaputra valley in Assam because they:',
  right: 'keep the bushes producing fresh, tender leaves for plucking over a long season',
  wrong: ['flood the gardens for transplanting', 'make the soil alkaline and salty', 'stop the bushes from growing new leaves'],
  sol: 'Warmth and moisture keep new flushes coming — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('tea-state-mcq', mcq({
  stem: 'Which state is a leading producer of tea in India (the largest as of the early 2020s)?',
  right: 'Assam',
  wrong: ['Rajasthan', 'Punjab', 'Gujarat'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('process-mcq', mcq({
  stem: 'In a tea factory, which step comes immediately after rolling?',
  right: 'Fermentation (oxidation)',
  wrong: ['Plucking', 'Withering', 'Planting'],
  sol: 'Withering, rolling, fermentation, drying — option (@K).',
  d: 2, c: 'recall', t: [5],
}));
add('shade-mcq', mcq({
  stem: 'Tall shade trees are planted among the tea bushes of many gardens in Assam. They mainly:',
  right: 'protect the bushes from strong sun and add leaf litter to the soil',
  wrong: ['are grown for their tea leaves', 'stop all rain from reaching the bushes', 'are cut each year to fuel the factory boilers'],
  sol: 'Option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('tea-ar', ar({
  a: 'Tea estates need a large labour force.',
  r: 'Leaves are plucked by hand at short intervals through much of the year.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [5],
}));
add('tea-ar2', ar({
  a: 'Tea grows best on flat land where rainwater collects.',
  r: 'Tea needs heavy, well-distributed rainfall.',
  key: 'd',
  sol: 'A is false (waterlogging harms tea roots, so slopes are used); R is true — option (d).',
  d: 2, c: 'understanding', t: [5],
}));
add('tea-tf', tf({
  stem: 'Green tea is made without the fermentation stage.',
  key: 't',
  sol: 'True.',
  d: 2, c: 'recall', t: [5],
}));
add('tea-fill', fill({
  stem: 'The first step in a tea factory, in which fresh leaves are spread out to lose moisture and become limp, is called ___.',
  acc: [['withering']],
  sol: '**Withering**.',
  d: 1, c: 'recall', t: [5],
}));
add('tea-short2', short({
  marks: 2,
  stem: 'Name two leading tea-producing states of India and one important tea-growing area in each.',
  model: 'Assam — the Brahmaputra valley (also Barak valley); West Bengal — Darjeeling hills (or the Dooars). (Also Tamil Nadu — Nilgiris; Kerala — Munnar.)',
  sol: 'Two states with areas.',
  scheme: [['First state and area', 1], ['Second state and area', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('tea-proc-short3', short({
  marks: 3,
  stem: 'Describe, in order, how plucked tea leaves are processed in a factory.',
  model: 'Withering: the fresh leaves are spread out so that they lose moisture and become soft. Rolling (or crushing, tearing and curling): the leaves are rolled to break their cells and release the juices. Fermentation: the rolled leaves are left to oxidise until they turn copper-brown, then dried (fired) in hot air, graded and packed.',
  sol: 'Withering; rolling; fermentation and drying.',
  scheme: [['Withering', 1], ['Rolling', 1], ['Fermentation and drying', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('tea-assam-short3', short({
  marks: 3,
  stem: 'Explain how the climate and soils of the Brahmaputra valley in Assam suit tea (three points).',
  model: 'Temperatures stay warm, about 20–30 °C, without frost; rainfall is heavy (about 150–250 cm) and spread through the year, so fresh leaves keep growing; the soils are deep, fertile, slightly acidic forest soils rich in humus, and gentle slopes and terraces drain away surplus water.',
  sol: 'Temperature; rainfall; soil and drainage.',
  scheme: [['Temperature', 1], ['Rainfall', 1], ['Soil and drainage', 1]],
  d: 2, c: 'application', t: [5],
}));
add('tea-slope-short2', short({
  marks: 2,
  stem: 'Suggest two measures that tea estates on the steep slopes of the Nilgiris can take to protect their soil from heavy rain.',
  model: 'Plant the bushes in rows along the contours or on terraces so that runoff is slowed; grow shade trees and cover crops and use mulch so that roots and leaf litter hold the soil (also build drains to lead water away safely).',
  sol: 'Contour planting or terraces; shade trees and mulch.',
  scheme: [['First measure', 1], ['Second measure', 1]],
  d: 2, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- illustrative data
add('yieldN-num', num({
  stem: `${CANE.N.name} produces ${CANE.N.prod} thousand tonnes of sugarcane from ${CANE.N.area} thousand hectares. What is its yield in tonnes per hectare?`,
  value: yN, tol: 0, unit: 't/ha',
  sol: `Yield $= ${CANE.N.prod} \\div ${CANE.N.area} = ${yN}$ t/ha.`,
  scheme: [[`${yN} t/ha`, 1]],
  d: 1, c: 'application', t: [1],
}), () => 160000 / 2000 === yN || 'yield N');
add('gap-num', num({
  stem: `Illustrative sugarcane yields are ${yN} t/ha in a northern state and ${yS} t/ha in a peninsular state. By what percentage is the peninsular yield higher than the northern yield?`,
  value: gap, tol: 0, unit: '%',
  sol: `Difference $= \\dfrac{${yS} - ${yN}}{${yN}} \\times 100 = ${gap}$%.`,
  scheme: [[`${gap}%`, 1]],
  d: 2, c: 'application', t: [1],
}), () => ((100 - 80) / 80) * 100 === gap || 'gap');
add('sugar-num', num({
  stem: `An illustrative sugar mill near Kolhapur crushes ${CRUSH} tonnes of cane a day, and ${RECOVERY}% of the weight of the cane is recovered as sugar. How many tonnes of sugar does it produce in a day?`,
  value: sugar, tol: 0, unit: 'tonnes',
  sol: `Sugar $= ${CRUSH} \\times \\dfrac{${RECOVERY}}{100} = ${sugar}$ tonnes.`,
  scheme: [[`${sugar} tonnes`, 1]],
  d: 2, c: 'application', t: [1],
}), () => sugar === 500 || 'sugar');
add('tea-num', num({
  stem: `On a tea estate near Munnar, about ${LEAF_RATIO} kg of green leaf are needed for 1 kg of made tea (an illustrative round figure). How many kilograms of made tea will ${LEAF_Q} kg of plucked leaf give?`,
  value: madeQ, tol: 0, unit: 'kg',
  sol: `Made tea $= ${LEAF_Q} \\div ${LEAF_RATIO} = ${madeQ}$ kg.`,
  scheme: [[`${madeQ} kg`, 1]],
  d: 2, c: 'application', t: [5],
}), () => madeQ * LEAF_RATIO === LEAF_Q && madeQ === 450 || 'tea');

// ---------------------------------------------------------------- match
add('state-match', match({
  marks: 2,
  stem: 'For each commercial crop listed in Column A, pick from Column B the state that grows the most of it (as of the early 2020s).',
  pairs: [
    ['Sugarcane', 'Uttar Pradesh'],
    ['Groundnut', 'Gujarat'],
    ['Jute', 'West Bengal'],
    ['Tea', 'Assam'],
  ],
  order: [3, 1, 0, 2],
  sol: 'Sugarcane → Uttar Pradesh; groundnut → Gujarat; jute → West Bengal; tea → Assam.',
  d: 1, c: 'recall', t: [1, 2, 4, 5],
}));
add('process-match', match({
  marks: 2,
  stem: 'Match each farm or factory process in Column A with the crop in Column B.',
  pairs: [
    ['Ratooning', 'Sugarcane'],
    ['Ginning', 'Cotton'],
    ['Retting', 'Jute'],
    ['Withering', 'Tea'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Ratooning → sugarcane; ginning → cotton; retting → jute; withering → tea.',
  d: 1, c: 'recall', t: [1, 3, 4, 5],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('cane-long', long({
  stem: '(a) State the temperature and rainfall required for sugarcane. [2]\n\n(b) What are setts? What is meant by ratooning? [2]\n\n(c) Explain why sugarcane yields are higher in peninsular India than in the northern plains. [3]\n\n(d) Name two leading sugarcane-producing states and two by-products of the sugar industry with one use of each. [3]',
  model: '(a) About 21–27 °C, hot and humid, without frost; about 75–150 cm of rain, or irrigation.\n\n(b) Setts are pieces of cane stem with two or three buds used for planting. Ratooning is letting the stubble of the harvested crop sprout into a fresh crop without replanting.\n\n(c) The peninsula is tropical and frost-free, so the crop grows for longer and stores more sugar; black and red soils hold moisture and irrigation is good; cooperative mills and better management help. The north has cold winters, frost and the loo, which shorten growth.\n\n(d) Uttar Pradesh and Maharashtra (also Karnataka, Tamil Nadu). Bagasse — fuel for mill boilers and raw material for paper; molasses — making alcohol (also used in cattle feed).',
  sol: 'Climate; setts and ratooning; yields; states and by-products.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 2, c: 'application', t: [1],
}));
add('oilcot-long', long({
  stem: '(a) State the season and type of soil suited to groundnut, and give one reason for the soil. [2]\n\n(b) Name the season of mustard and of soya bean, with one leading state for each. [2]\n\n(c) State three climatic conditions required for cotton. [3]\n\n(d) Explain why black soil suits cotton, and how cotton is grown in Punjab despite low rainfall. Name two leading cotton states. [3]',
  model: '(a) Mainly kharif; light, loose, well-drained sandy loam, because the pods form underground.\n\n(b) Mustard — rabi — Rajasthan; soya bean — kharif — Madhya Pradesh (as of the early 2020s).\n\n(c) High temperature of about 21–30 °C; about 210 frost-free days; moderate rain of about 50–100 cm, with bright, dry weather when the bolls open.\n\n(d) Black soil holds moisture for long and is rich in lime, potash and magnesium; in Punjab canal irrigation supplies the water. Gujarat and Maharashtra (also Telangana).',
  sol: 'Groundnut; mustard and soya bean; cotton climate; soil, irrigation and states.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 2, c: 'understanding', t: [2, 3],
}));
add('jute-long', long({
  stem: '(a) State the temperature and rainfall required for jute. [2]\n\n(b) Describe the process of retting. [2]\n\n(c) Explain why jute cultivation is concentrated in the Ganga–Brahmaputra delta. [3]\n\n(d) State two uses of jute, one problem faced by the jute industry today, and one way in which it can be overcome. [3]',
  model: '(a) Hot, above about 25 °C; heavy rain of about 150–250 cm with high humidity.\n\n(b) Bundles of cut stalks are kept under slow-moving or still water for two to three weeks; bacteria loosen the fibre, which is then stripped, washed and dried.\n\n(c) Hot, humid climate with heavy rain; floods renew soil fertility with fresh silt every year; ponds and rivers supply water for retting; cheap labour and the Hooghly mills and Kolkata port are close by.\n\n(d) Uses: gunny bags, ropes, carpets and mats (any two). Problem: competition from cheaper synthetic fibres and plastic. Remedy: promote jute as a biodegradable, eco-friendly substitute for plastic bags and develop new jute products.',
  sol: 'Climate; retting; delta; uses and future.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 2, c: 'understanding', t: [4],
}));
add('tea-long', long({
  stem: '(a) State the temperature and rainfall required for tea. [2]\n\n(b) Why is tea grown on hill slopes? Why are shade trees planted? [2]\n\n(c) Describe the processing of tea leaves in a factory. [3]\n\n(d) Name three leading tea-producing states and one tea-growing area in each. [3]',
  model: '(a) Warm, about 20–30 °C, without frost; heavy rain of about 150–250 cm, well distributed through the year.\n\n(b) Slopes drain water quickly, and tea roots are damaged by standing water. Shade trees protect young bushes from strong sun and add leaf litter to the soil.\n\n(c) Withering — leaves spread to lose moisture; rolling or CTC — leaves broken to release juices; fermentation — leaves oxidise and turn copper-brown; drying, grading and packing.\n\n(d) Assam — Brahmaputra valley; West Bengal — Darjeeling (or Dooars); Tamil Nadu — Nilgiris (also Kerala — Munnar).',
  sol: 'Climate; slopes and shade; processing; states.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 2, c: 'understanding', t: [5],
}));
add('data-long', long({
  stem: `Study these illustrative sugarcane figures. ${CANE.N.name}: ${CANE.N.area} thousand ha, ${CANE.N.prod} thousand tonnes. ${CANE.S.name}: ${CANE.S.area} thousand ha, ${CANE.S.prod} thousand tonnes.\n\n(a) Calculate the yield of each state. [2]\n\n(b) By what percentage is State S’s yield higher than State N’s? [2]\n\n(c) Give three geographical reasons for the difference in yields. [3]\n\n(d) A mill in State S crushes ${CRUSH} tonnes of cane a day with a sugar recovery of ${RECOVERY}%. Calculate its daily sugar output, and explain why sugar mills are located close to the cane fields. [3]`,
  model: `(a) N $= ${CANE.N.prod} \\div ${CANE.N.area} = ${yN}$ t/ha; S $= ${CANE.S.prod} \\div ${CANE.S.area} = ${yS}$ t/ha.\n\n(b) $\\dfrac{${yS} - ${yN}}{${yN}} \\times 100 = ${gap}$%.\n\n(c) State S is tropical and frost-free, so cane grows longer and stores more sugar; black soil holds moisture and irrigation is assured; State N has cold winters, frost and the hot loo, which shorten the growing period.\n\n(d) Sugar $= ${CRUSH} \\times \\dfrac{${RECOVERY}}{100} = ${sugar}$ tonnes a day. Cut cane is bulky and loses its sugar content within about a day, so it must be crushed quickly near where it is grown.`,
  sol: `${yN} and ${yS} t/ha; ${gap}%; reasons; ${sugar} tonnes.`,
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 4, c: 'analysis', t: [1],
}), () => (yN === 80 && yS === 100 && gap === 25 && sugar === 500) || 'data');
