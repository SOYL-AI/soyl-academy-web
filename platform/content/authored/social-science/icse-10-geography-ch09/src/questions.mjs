// ICSE 10 Geography ch09 Water Resources — question bank (ICSE 2027 specimen style). Data items use the ILLUSTRATIVE rooftop,
// district and efficiency figures exported by svgs.mjs, and every computed answer is asserted. MCQ keys are placed by the builder.
import { mk, add } from './lib.mjs';
import { ROOF, ROOF_L, harvest, DISTRICTS, EFF, NEED, applied } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const A = DISTRICTS.A;
const B = DISTRICTS.B;
const [fl, sp, dr] = EFF.map((e) => applied(e.eff));

// ---------------------------------------------------------------- t01 surface water, groundwater, need for conservation
add('sources-chk', mcq({
  stem: 'Which of these draws on groundwater rather than surface water?',
  right: 'A tube well in Meerut district pumping water from an aquifer',
  wrong: ['A reservoir behind a dam on the Mahanadi', 'Dal Lake in Srinagar', 'A village tank near Madurai'],
  sol: 'Water pumped from an aquifer below the water table is groundwater — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('conserve-chk', mcq({
  stem: 'In a district of western Uttar Pradesh the water table has fallen by several metres in twenty years. The most likely cause is that:',
  right: 'more groundwater is pumped out each year than rain and rivers put back',
  wrong: ['too much rain falls during the monsoon', 'the rivers of the region are snow-fed', 'the district lies on hard crystalline rock'],
  sol: 'Withdrawal greater than recharge lowers the water table — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('alluvium-gw-mcq', mcq({
  stem: 'Groundwater is far more plentiful under the Ganga plain than under the plateau of interior Karnataka. The main reason is that:',
  right: 'deep porous alluvium stores water, whereas hard crystalline rock lets little water in',
  wrong: ['the Karnataka plateau receives no rain at all', 'the Ganga plain has no rivers', 'groundwater is formed only from melting snow'],
  sol: 'Rock type controls how much water can soak in and be stored — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('seasonal-mcq', mcq({
  stem: 'Which feature of rainfall in most of India makes it most necessary to store water?',
  right: 'Most of the year’s rain falls in three to four months',
  wrong: ['Rain falls evenly in every month', 'Most rain falls as snow', 'The monsoon never fails'],
  sol: 'Seasonal rain must be stored for the dry months — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('ar-gw', ar({
  a: 'Wells in the hard-rock areas of the Deccan often dry up in summer.',
  r: 'Crystalline rocks hold only small amounts of groundwater.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('tf-gw', tf({
  stem: 'Water stored in a reservoir behind a dam is an example of groundwater.',
  key: 'f',
  sol: 'False: a reservoir holds surface water.',
  d: 1, c: 'understanding', t: [1],
}));
add('fill-aquifer', fill({
  stem: 'A layer of porous rock below the ground that holds and yields water is called an ___.',
  acc: [['aquifer']],
  sol: '**Aquifer**.',
  d: 1, c: 'recall', t: [1],
}));
add('fill-watertable', fill({
  stem: 'The upper level of the zone below the ground in which all the pores in the rock are filled with water is called the water ___.',
  acc: [['table']],
  sol: 'Water **table**.',
  d: 1, c: 'recall', t: [1],
}));
add('gwsurface-short2', short({
  marks: 2,
  stem: 'Distinguish between surface water and groundwater, giving one example of each from India.',
  model: 'Surface water lies or flows on the surface of the land, as in rivers, lakes, ponds and reservoirs — for example, the Godavari or Chilika Lake. Groundwater has soaked into the ground and fills the pores and cracks of rocks below the water table; it is reached by wells and tube wells — for example, the tube wells of the Punjab plain.',
  sol: 'On the surface versus below the water table, with examples.',
  scheme: [['Surface water with example', 1], ['Groundwater with example', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('need-short3', short({
  marks: 3,
  stem: 'Explain how (a) the seasonal nature of rainfall, (b) the over-use of groundwater and (c) the pollution of rivers make water conservation necessary in India.',
  model: '(a) Most rain falls in three to four monsoon months, so water must be stored and used carefully to last through the long dry season. (b) In many districts pumps draw out more groundwater than rain can replace, so the water table falls and wells fail. (c) Sewage, factory waste and farm chemicals make river water unfit to use, reducing the supply of usable water further.',
  sol: 'Seasonal rain; over-pumping; pollution.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 rainwater harvesting
add('rwh-chk', mcq({
  stem: 'In a rooftop rainwater harvesting system on a house in Bengaluru, the recharge pit is meant to:',
  right: 'let overflow water soak down and refill the groundwater',
  wrong: ['store drinking water for the family', 'throw away the first dirty rain', 'pump water up to the roof'],
  sol: 'The pit lets water percolate to the aquifer — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('firstflush-mcq', mcq({
  stem: 'In a rooftop harvesting system, the first-flush device is used to:',
  right: 'discard the first rain, which carries dust and dirt from the roof',
  wrong: ['store water for the dry season', 'lift water from a well', 'send water to the sea'],
  sol: 'Option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('rwh-benefit-mcq', mcq({
  stem: 'After many houses in a ward of Hyderabad build recharge pits for rooftop rain, which change is most likely within a few years?',
  right: 'The water table rises and dry borewells start yielding water again',
  wrong: ['The monsoon becomes heavier', 'The rivers of the city dry up', 'Flooding of the streets increases'],
  sol: 'More rain soaks into the aquifer instead of running off — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('urbanflood-mcq', mcq({
  stem: 'Why does widespread rooftop harvesting reduce waterlogging of streets in a city like Mumbai during a heavy downpour?',
  right: 'Less rainwater runs off roofs into the drains at the same time',
  wrong: ['It stops rain from falling on the city', 'It makes the drains narrower', 'It raises the level of the sea'],
  sol: 'Harvesting holds back part of the runoff, so drains are not overloaded — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('checkdam-mcq', mcq({
  stem: 'A row of small check dams built across a seasonal stream in Saurashtra mainly helps by:',
  right: 'slowing the flow so that more water soaks into the ground',
  wrong: ['generating hydroelectricity for distant cities', 'carrying water to the sea faster', 'stopping rain from falling on the fields'],
  sol: 'Check dams recharge groundwater — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('ar-rwh', ar({
  a: 'Rooftop rainwater harvesting can improve the quality of groundwater in fluoride-affected villages.',
  r: 'Fresh rainwater entering the aquifer dilutes the fluoride and salts in it.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 3, c: 'analysis', t: [2],
}));
add('ar-rwh2', ar({
  a: 'Rooftop harvesting is a low-cost method of water conservation.',
  r: 'Most of India receives its rain mainly from the south-west monsoon.',
  key: 'd',
  sol: 'Both are true, but the source of the rain does not explain why the method is cheap (it uses existing roofs and simple pipes, filters and pits) — option (d).',
  d: 2, c: 'understanding', t: [2],
}));
add('tf-onelitre', tf({
  stem: 'One millimetre of rain falling on one square metre of roof gives about one litre of water.',
  key: 't',
  sol: 'True: 1 mm over 1 m² is 0.001 m³, which is 1 litre.',
  d: 2, c: 'understanding', t: [2],
}));
add('fill-rwh', fill({
  stem: 'Collecting and storing rain where it falls, for use or to recharge groundwater, is called rainwater ___.',
  acc: [['harvesting']],
  sol: 'Rainwater **harvesting**.',
  d: 1, c: 'recall', t: [2],
}));
add('rooftop-short2', short({
  marks: 2,
  stem: 'Describe, in the correct order, how rain falling on the roof of a hospital in Jaipur can be used to recharge groundwater.',
  model: 'Rain on the roof is led by gutters into a down pipe; a first-flush device throws away the dirty first rain and a sand-and-gravel filter cleans the rest. The clean water goes to a storage tank, and the overflow is led into a recharge pit or old well, through which it percolates down to the aquifer and raises the water table.',
  sol: 'Collect, clean, store, recharge.',
  scheme: [['Collection and filtering', 1], ['Recharge pit to aquifer', 1]],
  d: 2, c: 'application', t: [2],
}));
add('rwh-importance-short3', short({
  marks: 3,
  stem: 'State three advantages of rainwater harvesting for a crowded, fast-growing city such as Bengaluru.',
  model: 'It recharges the aquifer, so falling water tables recover and dry borewells yield again. It reduces the city’s dependence on water piped from distant rivers and on tankers in summer. It reduces the runoff that floods streets and underpasses during heavy downpours (and it is cheap and uses existing roofs).',
  sol: 'Recharge; less dependence; less flooding.',
  scheme: [['Recharge', 1], ['Supply or cost', 1], ['Flood reduction', 1]],
  d: 2, c: 'application', t: [2],
}));
// numericals on harvesting (1 mm on 1 m² = 1 litre)
add('harvest-num', num({
  stem: `For ${ROOF.place}, the roof area is ${ROOF.area} m², the annual rainfall is ${ROOF.rain} mm and the runoff coefficient is ${ROOF.coeff} (illustrative). How many litres of rain can the roof harvest in a year?`,
  value: ROOF_L, tol: 0, unit: 'litres',
  sol: `Harvest $= ${ROOF.area} \\times ${ROOF.rain} \\times ${ROOF.coeff} = ${ROOF_L}$ litres.`,
  scheme: [[`${ROOF_L} litres`, 1]],
  d: 2, c: 'application', t: [2],
}), () => ROOF_L === 56000 || `harvest ${ROOF_L}`);
const days = ROOF_L / ROOF.usePerDay;
add('days-num', num({
  stem: `The same illustrative roof harvests ${ROOF_L} litres a year. If the society uses the stored water only for its garden at ${ROOF.usePerDay} litres a day, for how many days will the harvest last?`,
  value: days, tol: 0, unit: 'days',
  sol: `Days $= \\frac{${ROOF_L}}{${ROOF.usePerDay}} = ${days}$.`,
  scheme: [[`${days} days`, 1]],
  d: 2, c: 'application', t: [2],
}), () => days === 140 || `days ${days}`);
const TARGET = 48000;
const RAIN2 = 600;
const areaNeeded = TARGET / (RAIN2 * ROOF.coeff);
add('area-num', num({
  stem: `A village school in a district that receives ${RAIN2} mm of rain a year wants to harvest ${TARGET} litres a year from its roof. If the runoff coefficient is ${ROOF.coeff} (illustrative), what roof area in m² is needed?`,
  value: areaNeeded, tol: 0, unit: 'm²',
  sol: `Area $= \\frac{${TARGET}}{${RAIN2} \\times ${ROOF.coeff}} = \\frac{${TARGET}}{${RAIN2 * ROOF.coeff}} = ${areaNeeded}$ m².`,
  scheme: [[`${areaNeeded} m²`, 1]],
  d: 3, c: 'analysis', t: [2],
}), () => (areaNeeded === 100 && harvest(areaNeeded, RAIN2, ROOF.coeff) === TARGET) || `area ${areaNeeded}`);

// ---------------------------------------------------------------- t03 irrigation: need, wells, tube wells, tanks
add('tubewell-chk', mcq({
  stem: 'Tube wells are far more common in Haryana than on the plateau of interior Karnataka mainly because Haryana has:',
  right: 'soft, deep alluvium holding plentiful groundwater',
  wrong: ['hard crystalline rocks', 'no electricity in its villages', 'only seasonal rain-fed rivers'],
  sol: 'Easy boring and plentiful groundwater — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('tank-chk', mcq({
  stem: 'Which set of conditions best explains why tank irrigation is common in Tamil Nadu?',
  right: 'Hard rock with little groundwater, seasonal rivers and natural hollows in undulating land',
  wrong: ['Soft alluvium, snow-fed rivers and flat land', 'Very heavy rain in every month of the year', 'Desert sand and strong winds'],
  sol: 'Option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('need-mcq', mcq({
  stem: 'Farmers in Punjab must irrigate their wheat mainly because:',
  right: 'wheat grows in the dry winter, when little rain falls',
  wrong: ['the monsoon brings too much rain in winter', 'wheat must stand in water throughout its growth', 'Punjab has no groundwater'],
  sol: 'Rabi crops grow in the dry season — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('persian-mcq', mcq({
  stem: 'The Persian wheel is used to:',
  right: 'lift water from a well',
  wrong: ['store rain on rooftops', 'divert water at a barrage', 'spray water like rain'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('tankdraw-mcq', mcq({
  stem: 'A village tank near Warangal irrigated only a small area in a year when the monsoon was weak. Which drawback of tank irrigation does this show?',
  right: 'Tanks depend on rain and may dry up in years of drought',
  wrong: ['Tanks cause the water table to rise too high', 'Tanks need electricity to work', 'Tanks can be built only in deserts'],
  sol: 'Option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('data-mcq', mcq({
  stem: `In an illustrative district, tanks water ${B.tanks}% of the irrigated area, wells and tube wells ${B.wells}%, canals ${B.canals}% and other sources ${B.other}%. The district is most likely located on:`,
  right: 'the plateau of Tamil Nadu or Telangana',
  wrong: ['the plain of Punjab', 'the Ganga–Brahmaputra delta', 'the dunes of the Thar desert'],
  sol: 'Tanks as the largest source point to the hard-rock southern plateau — option (@K).',
  d: 3, c: 'analysis', t: [3],
}), () => (B.tanks > B.wells && B.tanks > B.canals) || 'tanks');
add('leading-mcq', mcq({
  stem: 'Which is the leading source of irrigation in India (as of the early 2020s)?',
  right: 'Wells and tube wells',
  wrong: ['Canals', 'Tanks', 'Drip systems'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('ar-tank', ar({
  a: 'Tank irrigation is common in Tamil Nadu.',
  r: 'Tamil Nadu has deep, porous alluvium full of groundwater over most of its area.',
  key: 'a',
  sol: 'A is true; R is false: much of Tamil Nadu is hard crystalline rock with little groundwater, which is why tanks are used — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('ar-tubewell', ar({
  a: 'Tube wells are the main source of irrigation on the hard-rock plateau of interior Karnataka.',
  r: 'A tube well needs an electric or diesel pump.',
  key: 'b',
  sol: 'A is false: hard rock holds little groundwater, so tanks and wells matter more there; R is true — option (b).',
  d: 2, c: 'understanding', t: [3],
}));
add('tf-tank', tf({
  stem: 'Tanks are the main source of irrigation in Punjab because its rivers dry up every summer.',
  key: 'f',
  sol: 'False: Punjab relies on tube wells and perennial canals fed by snow-fed rivers.',
  d: 1, c: 'understanding', t: [3],
}));
add('tf-irrig', tf({
  stem: 'Irrigation allows farmers to grow more than one crop a year on the same land.',
  key: 't',
  sol: 'True: multiple cropping depends on an assured water supply.',
  d: 1, c: 'recall', t: [3],
}));
add('fill-tank', fill({
  stem: 'A small reservoir made by building an earthen embankment across a stream to store rainwater for irrigation is called a ___.',
  acc: [['tank']],
  sol: '**Tank**.',
  d: 1, c: 'recall', t: [3],
}));
add('s1-gw', short({
  marks: 1,
  stem: 'Name the device, worked by an electric or diesel pump, that draws groundwater from great depths in the northern plains.',
  model: 'Tube well.',
  sol: 'Tube well.',
  scheme: [['Tube well', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('why-irrig-short2', short({
  marks: 2,
  stem: 'Coastal Odisha receives heavy monsoon rain, yet many farmers there still need irrigation. Give two reasons.',
  model: 'The rain is seasonal: it falls mainly from June to September, so a second crop in the dry winter needs irrigation. The monsoon is also uncertain, with late onset and long breaks that can dry out young rice, so assured water is needed (high-yielding varieties need regular water).',
  sol: 'Seasonal rain; uncertain monsoon.',
  scheme: [['Seasonal rain', 1], ['Uncertain monsoon or crop needs', 1]],
  d: 3, c: 'application', t: [3],
}));
add('tubewell-short2', short({
  marks: 2,
  stem: 'Give two reasons why tube wells have spread rapidly in western Uttar Pradesh.',
  model: 'The deep, soft alluvium is cheap to bore and holds a large store of groundwater, refilled by monsoon rain and seepage from snow-fed rivers and canals. Rural electricity and the flat, fertile land allow farmers to pump water whenever their wheat, rice and sugarcane need it.',
  sol: 'Alluvium with groundwater; electricity and demand.',
  scheme: [['Soil and groundwater', 1], ['Power, land or demand', 1]],
  d: 2, c: 'application', t: [3],
}));
add('tankdis-short2', short({
  marks: 2,
  stem: 'State two disadvantages of tank irrigation.',
  model: 'Tanks depend on rain, so they may dry up in a year of poor monsoon. They gradually fill with silt and lose much water by evaporation from their wide, shallow surface (they also occupy fertile land and irrigate only small areas).',
  sol: 'Dry up; silting or evaporation.',
  scheme: [['First disadvantage', 1], ['Second disadvantage', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('tank-short3', short({
  marks: 3,
  stem: 'A farmer in Telangana asks why his village depends on a tank while his cousin’s village in Haryana depends on tube wells. Explain three geographical reasons.',
  model: 'Telangana lies on hard, impervious crystalline rock that stores little groundwater, so tube wells yield little; Haryana has deep porous alluvium full of groundwater. The rivers of Telangana are rain-fed and shrink after the monsoon, so the rain must be stored. The undulating plateau has natural hollows that are easily closed by an earth bank to make a tank, while Haryana’s flat land has no such hollows.',
  sol: 'Rock and groundwater; seasonal rivers; relief.',
  scheme: [['Rock and groundwater', 1], ['Seasonal rivers', 1], ['Relief', 1]],
  d: 3, c: 'application', t: [3],
}));
add('match-source', match({
  marks: 2,
  stem: 'Match each irrigation method in Column A with the area where it is most typical in Column B.',
  pairs: [
    ['Tube wells', 'Alluvial plain of western Uttar Pradesh'],
    ['Tanks', 'Plateau of Tamil Nadu'],
    ['Perennial canals', 'Plains of Punjab'],
    ['Drip irrigation', 'Grape farms near Nashik'],
  ],
  order: [2, 3, 0, 1],
  sol: 'Tube wells → western Uttar Pradesh; tanks → Tamil Nadu plateau; perennial canals → Punjab; drip → Nashik grapes.',
  d: 2, c: 'application', t: [3, 4],
}));
add('match-terms', match({
  marks: 2,
  stem: 'Match each water-supply or irrigation device or rock layer in Column A with what it does in Column B.',
  pairs: [
    ['Aquifer', 'Rock layer that holds and yields groundwater'],
    ['First-flush device', 'Discards the dirty first rain from a roof'],
    ['Barrage', 'Holds river water up for a perennial canal'],
    ['Emitter', 'Releases water drop by drop at the roots'],
  ],
  order: [1, 3, 2, 0],
  sol: 'Aquifer → water-bearing rock; first-flush → discards first rain; barrage → feeds perennial canal; emitter → drip at roots.',
  d: 1, c: 'understanding', t: [1, 2, 4],
}));

// ---------------------------------------------------------------- t04 canals, drip and sprinkler
add('canal-chk', mcq({
  stem: 'Which statement correctly distinguishes a perennial canal from an inundation canal?',
  right: 'A perennial canal draws water from a barrage or dam and flows all year; an inundation canal flows only when the river floods',
  wrong: ['A perennial canal flows only in the rainy season; an inundation canal flows all year', 'Both flow only in winter', 'An inundation canal needs a large dam; a perennial canal needs none'],
  sol: 'Option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('salinity-mcq', mcq({
  stem: 'Patches of white, salty crust have appeared on fields irrigated by canals for many years in parts of Haryana. The most likely cause is that:',
  right: 'over-irrigation and canal seepage raised the water table, and salts rose to the surface as the soil dried',
  wrong: ['sea water flooded the fields', 'too little canal water reached the fields', 'drip irrigation was used'],
  sol: 'Waterlogging followed by evaporation leaves salt (reh, kallar) — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('igc-mcq', mcq({
  stem: 'The Indira Gandhi Canal carries water mainly to:',
  right: 'the dry lands of western Rajasthan',
  wrong: ['the Sundarbans delta', 'the backwaters of Kerala', 'the cold desert of Ladakh'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('drip-mcq', mcq({
  stem: 'A grape farmer near Nashik switches from flooding his vineyard to drip irrigation. Drip saves water mainly because:',
  right: 'water is delivered drop by drop to the roots, so little is lost to evaporation and runoff',
  wrong: ['it uses salty water instead of fresh water', 'it floods the whole field faster', 'it works only when it rains'],
  sol: 'Option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('sprinkler-mcq', mcq({
  stem: 'Sprinkler irrigation is most suitable for:',
  right: 'uneven land with sandy soil, as in parts of Rajasthan',
  wrong: ['paddy fields that must stand under water', 'tidal mangrove swamps', 'flat clayey fields with plentiful canal water for flooding'],
  sol: 'Spraying avoids the heavy losses of flooding porous, uneven land — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('ar-canal', ar({
  a: 'Canal irrigation has caused waterlogging in parts of the Punjab plains.',
  r: 'Seepage from unlined canals and over-watering of fields raise the water table.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 3, c: 'analysis', t: [4],
}));
add('tf-inund', tf({
  stem: 'Inundation canals supply water to fields throughout the year.',
  key: 'f',
  sol: 'False: they carry water only when the river is in flood.',
  d: 1, c: 'recall', t: [4],
}));
add('fill-reh', fill({
  stem: 'The white, salty crust that forms on over-irrigated land in north India is called reh or ___.',
  acc: [['kallar', 'kallar soil']],
  sol: '**Kallar**.',
  d: 1, c: 'recall', t: [4],
}));
add('s1-canal', short({
  marks: 1,
  stem: 'Name one state where perennial canals are an important source of irrigation.',
  model: 'Punjab (Haryana or Uttar Pradesh also accepted).',
  sol: 'Punjab.',
  scheme: [['Punjab / Haryana / Uttar Pradesh', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('drip-short2', short({
  marks: 2,
  stem: 'Explain how (a) drip irrigation and (b) sprinkler irrigation save water.',
  model: '(a) Drip irrigation carries water in pipes and releases it drop by drop at the root zone of each plant, so almost none is lost to evaporation, runoff or weeds between the rows. (b) Sprinkler irrigation sprays water evenly over the crop like rain, so on sandy or uneven land it avoids the deep seepage and runoff of flooding.',
  sol: 'Drip: water at the roots; sprinkler: even spray, no flooding.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('compare-canal-short2', short({
  marks: 2,
  stem: 'Distinguish between perennial canals and inundation canals.',
  model: 'Perennial canals are taken from rivers at a barrage, weir or dam that holds the water up, so they supply water throughout the year. Inundation canals are cut from rivers without any barrage, so water enters them only when the river is in flood in the rainy season; they are unreliable.',
  sol: 'Barrage and all year versus no barrage and floods only.',
  scheme: [['Perennial', 1], ['Inundation', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('canal-short3', short({
  marks: 3,
  stem: 'A district in Haryana irrigated by canals for fifty years now has patches of barren, salty land, many mosquitoes, and farms at the far end of the canal that get little water. Explain the three disadvantages of canal irrigation that these problems show.',
  model: 'Waterlogging and salinity: seepage from unlined canals and over-watering raised the water table; as the waterlogged land dried, salts came up and formed a barren crust. Disease: stagnant water in waterlogged fields and canal edges breeds mosquitoes, spreading malaria. Uneven supply: farms near the head of the canal take more than their share, while tail-end farms get little.',
  sol: 'Waterlogging and salinity; mosquitoes; tail-end shortage.',
  scheme: [['Waterlogging and salinity', 1], ['Mosquitoes', 1], ['Uneven supply', 1]],
  d: 3, c: 'application', t: [4],
}));
// numericals on efficiency
add('drip-num', num({
  stem: `A crop needs ${NEED} m³ of water per hectare to reach its roots (illustrative). If drip irrigation delivers ${Math.round(EFF[2].eff * 100)}% of the water applied to the roots, how many m³ must be applied per hectare?`,
  value: dr, tol: 1, unit: 'm³',
  sol: `Applied $= \\frac{${NEED}}{${EFF[2].eff}} = ${dr}$ m³.`,
  scheme: [[`${dr} m³`, 1]],
  d: 2, c: 'application', t: [4],
}), () => dr === 5000 || `drip ${dr}`);
add('saving-num', num({
  stem: `Using the illustrative figures (crop need ${NEED} m³ per hectare; flooding ${Math.round(EFF[0].eff * 100)}% efficient; sprinklers ${Math.round(EFF[1].eff * 100)}% efficient), how many m³ of water per hectare does a farmer save by changing from flooding to sprinklers?`,
  value: fl - sp, tol: 1, unit: 'm³',
  sol: `Flooding $= \\frac{${NEED}}{${EFF[0].eff}} = ${fl}$; sprinklers $= \\frac{${NEED}}{${EFF[1].eff}} = ${sp}$; saving $= ${fl} - ${sp} = ${fl - sp}$ m³.`,
  scheme: [[`${fl - sp} m³`, 1]],
  d: 3, c: 'application', t: [4],
}), () => (fl === 9000 && sp === 6000) || `saving ${fl - sp}`);
const pctSave = Math.round(((fl - dr) / fl) * 1000) / 10;
add('drippct-num', num({
  stem: `With the same illustrative figures, flooding needs ${fl} m³ per hectare and drip ${dr} m³. What percentage of the water used in flooding is saved by drip irrigation (to one decimal place)?`,
  value: pctSave, tol: 0.1, unit: '%',
  sol: `Saving $= \\frac{${fl} - ${dr}}{${fl}} \\times 100 = ${pctSave}$, about ${pctSave}%.`,
  scheme: [[`${pctSave}%`, 1]],
  d: 3, c: 'application', t: [4],
}), () => pctSave === 44.4 || `pct ${pctSave}`);

// ---------------------------------------------------------------- 10-mark structured questions
const HOSTEL = { area: 150, rain: 1000, coeff: 0.8, use: 600 };
const hostelL = harvest(HOSTEL.area, HOSTEL.rain, HOSTEL.coeff);
const hostelDays = hostelL / HOSTEL.use;
add('long-sources', long({
  stem: `(a) Distinguish between surface water and groundwater, with one example of each. [2]\n\n(b) Give two reasons why groundwater is plentiful in the northern plains. [2]\n\n(c) Explain how a rooftop rainwater harvesting system recharges groundwater. [3]\n\n(d) A college hostel in Nagpur has a roof of ${HOSTEL.area} m²; annual rainfall is ${HOSTEL.rain} mm and the runoff coefficient ${HOSTEL.coeff} (illustrative). Calculate the water harvested in a year, and the number of days it would last at ${HOSTEL.use} litres a day. [3]`,
  model: `(a) Surface water flows or stands on the land, as in rivers, lakes and reservoirs — for example, the Krishna. Groundwater fills the pores of rocks below the water table and is reached by wells — for example, the tube wells of Haryana.\n\n(b) The deep, porous alluvium stores large amounts of water; it is recharged by monsoon rain and by seepage from perennial snow-fed rivers and canals.\n\n(c) Rain from the roof flows through gutters and a down pipe; the first-flush device discards dirty water and a filter cleans the rest; overflow from the storage tank goes into a recharge pit filled with gravel and sand, from which it soaks down to the aquifer and raises the water table.\n\n(d) Harvest $= ${HOSTEL.area} \\times ${HOSTEL.rain} \\times ${HOSTEL.coeff} = ${hostelL}$ litres; days $= \\frac{${hostelL}}{${HOSTEL.use}} = ${hostelDays}$.`,
  sol: `Definitions; alluvium and recharge; rooftop system; ${hostelL} litres, ${hostelDays} days.`,
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 4, c: 'analysis', t: [1, 2],
}), () => (hostelL === 120000 && hostelDays === 200) || 'hostel');
add('long-conserve', long({
  stem: '(a) Give two reasons why water conservation is necessary in India. [2]\n\n(b) Name two methods of rainwater harvesting other than rooftop harvesting. [2]\n\n(c) State three advantages of rainwater harvesting. [3]\n\n(d) Suggest three ways in which a farming village in drought-prone Marathwada could make its limited water go further, giving a reason for each. [3]',
  model: '(a) Rain falls mainly in a few monsoon months and unevenly across regions; demand from a growing population, farms and industry is rising while groundwater is being over-drawn (pollution also reduces usable water).\n\n(b) Recharge pits or trenches; check dams or percolation tanks across streams (also farm ponds, reviving village tanks).\n\n(c) It recharges groundwater and revives wells; it provides water in the dry season; it reduces runoff, urban flooding and soil erosion (and improves groundwater quality at low cost).\n\n(d) Build check dams and farm ponds to hold monsoon runoff so that it soaks in; use drip or sprinkler irrigation, which delivers water to the roots with little waste; grow less thirsty crops such as millets and pulses instead of sugarcane.',
  sol: 'Reasons; methods; advantages; measures for a dry village.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 3, c: 'application', t: [1, 2, 4],
}));
add('long-irrigation', long({
  stem: '(a) Give two reasons why irrigation is necessary in India. [2]\n\n(b) Distinguish between a well and a tube well. [2]\n\n(c) Explain three reasons why tube wells are widely used in the northern plains. [3]\n\n(d) Explain three reasons why tank irrigation is important in peninsular India. [3]',
  model: '(a) Rain is seasonal, falling mainly in three to four months, so dry-season crops need water; the monsoon is uncertain and uneven, and some crops such as rice and sugarcane need much water.\n\n(b) A well is a pit dug down to the water table; water is lifted by hand, a Persian wheel or a small pump, and it waters a small area. A tube well is a deep, narrow bore into the aquifer with a powerful electric or diesel pump, and it supplies much more water.\n\n(c) Soft, deep alluvium is easy to bore; it holds plentiful groundwater, recharged by rain and snow-fed rivers and canals; rural electricity, flat land and a large demand from intensive farming make pumping worthwhile.\n\n(d) Hard crystalline rock holds little groundwater, so wells yield little; rivers are rain-fed and seasonal, unfit for perennial canals; the undulating land has natural hollows that are easily made into tanks to store the monsoon rain.',
  sol: 'Need; well and tube well; tube wells in the north; tanks in the south.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 3, c: 'analysis', t: [3],
}));
add('long-canal', long({
  stem: '(a) Distinguish between perennial and inundation canals. [2]\n\n(b) Name two perennial canals of India and the state that each serves. [2]\n\n(c) State three disadvantages of canal irrigation. [3]\n\n(d) Explain how drip and sprinkler irrigation save water, and name a type of farm or land suited to each. [3]',
  model: '(a) Perennial canals start at a barrage, weir or dam and flow all year; inundation canals have no barrage and carry water only when the river is in flood.\n\n(b) The Indira Gandhi Canal — Rajasthan; the Upper Ganga Canal — Uttar Pradesh (also the Western Yamuna Canal — Haryana; the Sirhind Canal — Punjab).\n\n(c) Waterlogging from seepage and over-watering; salinity and alkalinity (reh, kallar) as waterlogged land dries; breeding of mosquitoes (also seepage losses, high cost, uneven supply to tail-end farms).\n\n(d) Drip carries water in pipes and releases it drop by drop at the roots, so little is lost to evaporation or runoff — suited to orchards, vineyards and sugarcane in dry areas such as around Nashik. Sprinklers spray water evenly like rain, avoiding the seepage and runoff of flooding — suited to uneven land and sandy soils, as in parts of Rajasthan.',
  sol: 'Canal types; examples; disadvantages; drip and sprinkler.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 2, c: 'understanding', t: [4],
}));
const otherA = A.canals + A.tanks + A.other;
add('long-data', long({
  stem: `Study the illustrative data. Share of irrigated area by source — ${A.label}: wells and tube wells ${A.wells}%, canals ${A.canals}%, tanks ${A.tanks}%, other ${A.other}%. ${B.label}: wells and tube wells ${B.wells}%, canals ${B.canals}%, tanks ${B.tanks}%, other ${B.other}%. A crop needs ${NEED} m³ of water per hectare at its roots; flooding is ${Math.round(EFF[0].eff * 100)}% efficient and drip ${Math.round(EFF[2].eff * 100)}% efficient.\n\n(a) Which district relies mainly on tanks? In which part of India is it likely to be? [2]\n\n(b) In ${A.label}, what share of the irrigated area is watered by sources other than wells and tube wells? [2]\n\n(c) Calculate the water that must be applied per hectare by flooding and by drip, and the saving. [3]\n\n(d) The water table in ${A.label} is falling. Recommend three measures, with reasons. [3]`,
  model: `(a) ${B.label} (tanks ${B.tanks}%); the hard-rock plateau of Tamil Nadu, Telangana or Karnataka.\n\n(b) $${A.canals} + ${A.tanks} + ${A.other} = ${otherA}$%.\n\n(c) Flooding $= \\frac{${NEED}}{${EFF[0].eff}} = ${fl}$ m³; drip $= \\frac{${NEED}}{${EFF[2].eff}} = ${dr}$ m³; saving $= ${fl} - ${dr} = ${fl - dr}$ m³ per hectare.\n\n(d) Switch from flooding to drip or sprinkler irrigation, which needs far less water for the same crop; build recharge pits, check dams and rooftop harvesting so that more monsoon rain soaks into the aquifer; grow less thirsty crops in part of the area and avoid pumping for a dry-season rice crop.`,
  sol: `${B.label}, southern plateau; ${otherA}%; ${fl}, ${dr}, saving ${fl - dr} m³; drip, recharge, crop change.`,
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 3], ['(d)', 3]],
  d: 4, c: 'analysis', t: [3, 4],
}), () => (otherA === 28 && fl - dr === 4000) || 'data');
