// ICSE 9 Chemistry ch06 Hard and Soft Water; Making Water Potable: question bank in ICSE school-examination style.
// Numbers come from calc.mjs. AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true, R does not explain.
import { mk, add, svgV, r } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import * as K from './calc.mjs';
import { SOAP, TREAT_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const soapFig = svgV(SOAP, 'Four test tubes shaken with soap');
const treatFig = svgV(TREAT_LETTERED, 'Water treatment flow with stages lettered A to E');
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct answer', 1]], ...o });
const S = K.SAMPLES;

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('chk-soap', mcq({
  stem: 'A sample gives a curdy scum and very little lather with soap. The sample is',
  right: 'hard water', wrong: ['soft water', 'distilled water', 'rainwater collected in a clean tank'],
  sol: 'Scum shows that dissolved calcium and magnesium salts have reacted with the soap — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('chk-temp', mcq({
  stem: 'Which salt causes permanent hardness in water?',
  right: 'Magnesium sulphate', wrong: ['Calcium hydrogencarbonate', 'Magnesium hydrogencarbonate', 'Sodium chloride'],
  sol: 'Chlorides and sulphates of calcium and magnesium cause permanent hardness — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('chk-boil-tf', tf({
  stem: 'Boiling removes the hardness caused by calcium sulphate.',
  key: 'f',
  sol: 'False. Calcium sulphate causes permanent hardness, which boiling does not remove.',
  d: 2, c: 'understanding', t: [3],
}));
add('chk-wsoda', mcq({
  stem: 'Which substance removes both temporary and permanent hardness?',
  right: 'Washing soda', wrong: ['Common salt', 'Alum', 'Quicklime used as a drying agent'],
  sol: 'Sodium carbonate precipitates calcium and magnesium as carbonates in both cases — option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('chk-order', mcq({
  stem: 'Which stage of water treatment kills disease-causing germs?',
  right: 'Chlorination', wrong: ['Screening', 'Adding alum', 'Passing through a sand filter'],
  sol: 'Chlorine is added to kill germs — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('chk-alum', mcq({
  stem: 'Alum is added to muddy water so that the fine particles',
  right: 'clump together and settle', wrong: ['turn into a gas', 'dissolve completely', 'are killed'],
  sol: 'Sticky flakes of aluminium hydroxide trap the particles and carry them down — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('chk-fluoride-tf', tf({
  stem: 'Defluoridation is needed to remove germs from drinking water.',
  key: 'f',
  sol: 'False. It removes excess fluoride; chlorine kills germs.',
  d: 1, c: 'recall', t: [4],
}));
add('chk-disease', mcq({
  stem: 'Which of these water-borne diseases is caused by a virus?',
  right: 'Hepatitis A', wrong: ['Cholera', 'Typhoid', 'Bacterial dysentery'],
  sol: 'Hepatitis A and polio are viral; the others listed are bacterial — option (@K).',
  d: 2, c: 'recall', t: [5],
}));

// ---------------------------------------------------------------- t01 soap test; advantages and disadvantages
add('lather-mcq', mcq({
  stem: 'Two samples are shaken with the same volume of soap solution. Sample X gives a thick lather at once and sample Y gives a grey scum. Compared with X, sample Y contains',
  right: 'more dissolved calcium and magnesium salts', wrong: ['more dissolved sodium chloride only', 'less dissolved matter of every kind', 'a different gas'],
  sol: 'Scum means the soap was used up by calcium and magnesium salts — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('scum-mcq', mcq({
  stem: 'The scum formed when soap is shaken with hard water is',
  right: 'an insoluble calcium or magnesium salt of the fatty acid in soap', wrong: ['a soluble sodium salt', 'calcium carbonate only', 'dissolved carbon dioxide'],
  sol: 'Soap reacts with calcium and magnesium ions to give an insoluble curd — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('hardadv-mcq', mcq({
  stem: 'Which of these is an advantage of hard water?',
  right: 'It supplies calcium needed for bones and teeth', wrong: ['It saves soap', 'It prevents scale in boilers', 'It lathers readily'],
  sol: 'Dissolved calcium salts are useful to the body — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('softdis-mcq', mcq({
  stem: 'A town replaces its hard water by soft water. A possible problem in old lead pipes is that the soft water',
  right: 'may dissolve some lead from the pipes', wrong: ['will form thick scale inside the pipes', 'will waste more soap', 'will turn into a gas in the pipes'],
  sol: 'Hard water coats lead pipes, but soft water can dissolve lead — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('ar-soft', ar({
  a: 'Soft water saves soap.',
  r: 'Soft water may dissolve lead from lead pipes.',
  key: 'd',
  sol: 'Both statements are true, but the second does not explain why soap is saved — option (d).',
  d: 2, c: 'analysis', t: [1],
}));

// ---------------------------------------------------------------- t02 temporary and permanent hardness
add('cause-mcq', mcq({
  stem: 'Rainwater trickling over limestone makes the water hard because the limestone',
  right: 'reacts with water and dissolved carbon dioxide to form calcium hydrogencarbonate', wrong: ['reacts with oxygen to form calcium sulphate', 'dissolves as calcium chloride only', 'turns the water into steam'],
  sol: 'CaCO₃ + H₂O + CO₂ gives the soluble Ca(HCO₃)₂ — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('tempsalt-mcq', mcq({
  stem: 'Water in a limestone region lathers poorly but lathers well after boiling. The hardness was caused by',
  right: 'calcium hydrogencarbonate', wrong: ['calcium sulphate', 'magnesium chloride', 'sodium chloride'],
  sol: 'Only hydrogencarbonates are removed by boiling — option (@K).',
  d: 2, c: 'application', t: [2, 3],
}));
add('permsalt-mcq', mcq({
  stem: 'A sample is boiled and filtered but still gives scum with soap. The hardness is most likely due to',
  right: 'calcium chloride', wrong: ['calcium hydrogencarbonate', 'magnesium hydrogencarbonate', 'sodium carbonate'],
  sol: 'Chlorides are not removed by boiling — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('both-mcq', mcq({
  stem: `Sample A needs ${S.A.raw} mL of soap solution before boiling and ${S.A.boiled} mL after boiling, while distilled water needs ${K.DISTILLED} mL. The sample has`,
  right: 'both temporary and permanent hardness', wrong: ['temporary hardness only', 'permanent hardness only', 'no hardness'],
  sol: 'Boiling lowers the soap needed, so some hardness is temporary; it does not fall to the level of distilled water, so some is permanent — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('ar-hard', ar({
  a: 'Hard water needs more soap for a lather than soft water.',
  r: 'The calcium and magnesium salts of hard water react with soap to form scum.',
  key: 'c',
  sol: 'Both are true, and the reaction that forms scum explains why more soap is needed — option (c).',
  d: 2, c: 'analysis', t: [1, 2],
}));

// ---------------------------------------------------------------- t03 removal of hardness
add('boilprod-mcq', mcq({
  stem: 'When temporary hard water containing calcium hydrogencarbonate is boiled, the insoluble substance that settles is',
  right: 'calcium carbonate', wrong: ['calcium sulphate', 'sodium carbonate', 'calcium chloride'],
  sol: 'The hydrogencarbonate breaks down to calcium carbonate, water and carbon dioxide — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('wsprecip-mcq', mcq({
  stem: 'Sodium carbonate solution is added to a sample containing calcium chloride. The white precipitate is',
  right: 'calcium carbonate', wrong: ['sodium chloride', 'calcium oxide', 'sodium hydroxide'],
  sol: 'Calcium ions join carbonate ions to give insoluble calcium carbonate — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('wssalt-mcq', mcq({
  stem: 'In the reaction of washing soda with magnesium sulphate, the substance that stays in solution is',
  right: 'sodium sulphate', wrong: ['magnesium carbonate', 'magnesium sulphate', 'carbon dioxide'],
  sol: 'Magnesium carbonate is precipitated and sodium sulphate remains dissolved — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('eqbal-mcq', mcq({
  stem: 'Which equation for boiling temporary hard water is balanced?',
  right: r`$\ce{Ca(HCO3)2 -> CaCO3 + H2O + CO2}$`, wrong: [r`$\ce{Ca(HCO3)2 -> CaCO3 + 2H2O + CO2}$`, r`$\ce{Ca(HCO3)2 -> CaCO3 + H2O + 2CO2}$`, r`$\ce{2Ca(HCO3)2 -> CaCO3 + H2O + CO2}$`],
  sol: 'Each side has one calcium, two carbon in the carbonate and carbon dioxide, and two hydrogen atoms in the water — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('kettle-mcq', mcq({
  stem: 'The white scale that forms inside a kettle used with temporary hard water is mainly',
  right: 'calcium carbonate', wrong: ['calcium hydrogencarbonate', 'sodium chloride', 'calcium oxide'],
  sol: 'Boiling converts the soluble hydrogencarbonate into the insoluble carbonate — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('ar-boil', ar({
  a: 'Boiling can soften water that contains magnesium sulphate.',
  r: 'Boiling decomposes the hydrogencarbonates of calcium and magnesium.',
  key: 'b',
  sol: 'The assertion is false because magnesium sulphate causes permanent hardness. The reason is true for temporary hardness — option (b).',
  d: 3, c: 'analysis', t: [3],
}));
add('ar-ws', ar({
  a: 'Washing soda removes both temporary and permanent hardness.',
  r: 'It precipitates calcium and magnesium ions as insoluble carbonates.',
  key: 'c',
  sol: 'Both are true, and precipitation of the metal ions explains the softening — option (c).',
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 potable water
add('filter-mcq', mcq({
  stem: 'In a water treatment works, beds of sand and gravel are used to',
  right: 'hold back the remaining suspended particles', wrong: ['kill germs', 'remove excess fluoride', 'add calcium salts'],
  sol: 'The filter removes fine particles left after settling — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('chlor-mcq', mcq({
  stem: 'Water from a clear well is still found to cause stomach infections. The step most needed is',
  right: 'chlorination or boiling', wrong: ['adding more alum', 'screening only', 'adding washing soda'],
  sol: 'Clear water can still carry germs, which chlorine or boiling kills — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('alumhow-mcq', mcq({
  stem: 'Alum helps to clear muddy water because it',
  right: 'forms sticky flakes that trap fine particles and make them sink', wrong: ['kills all bacteria in the water', 'removes dissolved calcium salts', 'dissolves the mud completely'],
  sol: 'Alum is a coagulant, not a germ-killer — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('defl-mcq', mcq({
  stem: 'People in a village drink well water with too much dissolved fluoride, and many have damaged teeth and bones. The water needs',
  right: 'defluoridation', wrong: ['chlorination only', 'boiling to make it softer', 'screening'],
  sol: 'Removing excess fluoride is defluoridation — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('order-mcq', mcq({
  stem: 'Which order is correct in a water treatment works for muddy river water?',
  right: 'Screening, alum, filtration, chlorination', wrong: ['Chlorination, screening, alum, filtration', 'Filtration, chlorination, alum, screening', 'Alum, chlorination, screening, filtration'],
  sol: 'Large objects go first, fine particles next, and germs are killed on clear water — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('ar-alum', ar({
  a: 'Alum is added to muddy water to make it clear.',
  r: 'Alum kills the germs present in the water.',
  key: 'a',
  sol: 'The assertion is true; the reason is false because alum makes particles settle and chlorine kills germs — option (a).',
  d: 3, c: 'analysis', t: [4],
}));

// ---------------------------------------------------------------- t05 water-borne diseases
add('bact-mcq', mcq({
  stem: 'Cholera spreads when drinking water is polluted with sewage. It is caused by',
  right: 'bacteria', wrong: ['a virus', 'excess fluoride', 'dissolved calcium salts'],
  sol: 'Cholera is a bacterial disease — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('virus-mcq', mcq({
  stem: 'Weakness or paralysis of the limbs after drinking polluted water may be due to',
  right: 'polio', wrong: ['cholera', 'typhoid', 'dysentery'],
  sol: 'Polio is the viral disease with paralysis — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('prevent-mcq', mcq({
  stem: 'Which of these will best help to prevent water-borne diseases?',
  right: 'Drinking boiled or chlorinated water and washing hands', wrong: ['Drinking water straight from a pond', 'Adding washing soda to drinking water', 'Using hard water for cooking'],
  sol: 'Treated water and hygiene break the chain of infection — option (@K).',
  d: 1, c: 'application', t: [5],
}));
add('ors-mcq', mcq({
  stem: 'A child with severe diarrhoea should be given',
  right: 'oral rehydration solution and taken to a doctor', wrong: ['hard water only', 'alum solution', 'chlorine solution'],
  sol: 'The body loses water and salts, which oral rehydration solution replaces — option (@K).',
  d: 2, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- one-mark items
add('term-potable', term({
  stem: 'Name the term for water that is safe to drink.',
  model: '**Potable water.**', sol: 'Potable water.', sch: 'Potable water',
  d: 1, c: 'recall', t: [4],
}));
add('eq-mg', term({
  stem: 'Write a balanced equation for the action of heat on magnesium hydrogencarbonate.',
  model: r`$\ce{Mg(HCO3)2 ->[\Delta] MgCO3 + H2O + CO2}$`, sol: 'Mg(HCO₃)₂ gives MgCO₃, H₂O and CO₂ on heating.', sch: 'Balanced equation',
  d: 2, c: 'application', t: [3],
}));
add('term-salts', term({
  stem: 'Name the two salts of calcium that can cause permanent hardness.',
  model: '**Calcium chloride** and **calcium sulphate**.', sol: 'Calcium chloride and calcium sulphate.', sch: 'Both salts named',
  d: 1, c: 'recall', t: [2],
}));
add('obs-hard', term({
  stem: 'State one observation when soap solution is shaken with hard water.',
  model: 'A **curdy scum** forms and there is **little or no lather**.', sol: 'Scum, little lather.', sch: 'Scum or no lather',
  d: 1, c: 'recall', t: [1],
}));
add('odd-hard', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: CaCl₂, MgSO₄, Ca(HCO₃)₂, MgCl₂.',
  model: '**Ca(HCO₃)₂** is the odd one out; the other three are **salts that cause permanent hardness**.', sol: 'Calcium hydrogencarbonate; the rest cause permanent hardness.', sch: 'Odd one and category',
  d: 2, c: 'analysis', t: [2],
}));
add('reason-alum', term({
  stem: 'Give a reason: alum is added to muddy water in a treatment works.',
  model: 'Its **sticky flakes trap the fine particles**, which then **settle**.', sol: 'Flakes trap particles and they settle.', sch: 'Flakes trap particles',
  d: 2, c: 'understanding', t: [4],
}));
add('term-defl', term({
  stem: 'Name the process by which excess fluoride is removed from drinking water.',
  model: '**Defluoridation.**', sol: 'Defluoridation.', sch: 'Defluoridation',
  d: 1, c: 'recall', t: [4],
}));
add('term-hepa', term({
  stem: 'Name the water-borne viral disease that causes jaundice.',
  model: '**Hepatitis A.**', sol: 'Hepatitis A.', sch: 'Hepatitis A',
  d: 1, c: 'recall', t: [5],
}));

// ---------------------------------------------------------------- true-false
add('tf-lead', tf({
  stem: 'Soft water can never dissolve lead from pipes.',
  key: 'f',
  sol: 'False. Soft water can dissolve lead, whereas hard water forms a protective coating.',
  d: 2, c: 'understanding', t: [1],
}));
add('tf-polio', tf({
  stem: 'Polio is a water-borne disease caused by bacteria.',
  key: 'f',
  sol: 'False. Polio is caused by a virus.',
  d: 2, c: 'recall', t: [5],
}));

// ---------------------------------------------------------------- numericals
add('num-a-temp', num({
  stem: `For sample A the soap solution needed is ${S.A.raw} mL before boiling, ${S.A.boiled} mL after boiling and ${K.DISTILLED} mL for distilled water. What percentage of the hardness is temporary? Give the answer to one decimal place.`,
  value: K.A_TEMP_PCT, tol: 0.05, unit: '%',
  sol: `Total = ${S.A.raw} − ${K.DISTILLED} = ${K.PA.excess}; temporary = ${S.A.raw} − ${S.A.boiled} = ${K.PA.temporary}; ${K.PA.temporary} ÷ ${K.PA.excess} × 100 = ${K.A_TEMP_PCT}%.`,
  scheme: [[`${K.A_TEMP_PCT}%`, 1]],
  d: 4, c: 'application', t: [2],
}), (q) => q.answer.value === 66.7 || 'value');
add('num-fall', num({
  stem: `A kettle's water needs ${S.A.raw} mL of soap solution before boiling and ${S.A.boiled} mL after boiling. By what percentage does the soap needed fall on boiling?`,
  value: K.A_FALL_PCT, unit: '%',
  sol: `(${S.A.raw} − ${S.A.boiled}) ÷ ${S.A.raw} × 100 = ${K.A_FALL_PCT}%.`,
  scheme: [[`${K.A_FALL_PCT}%`, 1]],
  d: 3, c: 'application', t: [3],
}), (q) => q.answer.value === 60 || 'value');
add('num-cl', num({
  stem: `Chlorine is added at ${K.CL_DOSE_MG_L} mg per litre to a tank holding ${K.TANK_L} litres of water. How many grams of chlorine are needed? (1 g = 1000 mg; the dose is illustrative.)`,
  value: K.CL_G, unit: 'g',
  sol: `${K.CL_DOSE_MG_L} × ${K.TANK_L} = ${K.CL_MG} mg = ${K.CL_G} g.`,
  scheme: [[`${K.CL_G} g`, 1]],
  d: 2, c: 'application', t: [4],
}), (q) => q.answer.value === 10 || 'value');
add('num-f', num({
  stem: `A well gives water with ${K.F_FOUND} mg of fluoride per litre, and the limit is ${K.F_LIMIT} mg per litre. How many grams of fluoride must be removed from a ${K.F_TANK_L} litre tank? (1 g = 1000 mg)`,
  value: K.F_REMOVE_G, unit: 'g',
  sol: `Excess = ${K.F_FOUND} − ${K.F_LIMIT} = ${K.F_EXCESS} mg per litre; ${K.F_EXCESS} × ${K.F_TANK_L} = ${K.F_REMOVE_MG} mg = ${K.F_REMOVE_G} g.`,
  scheme: [[`${K.F_REMOVE_G} g`, 1]],
  d: 3, c: 'application', t: [4],
}), (q) => q.answer.value === 7.5 || 'value');
add('num-alum', num({
  stem: `Alum is used at ${K.ALUM_MG_L} mg per litre for a batch of ${K.BATCH_L} litres of water. How many grams of alum are needed? (1 g = 1000 mg; the dose is illustrative.)`,
  value: K.ALUM_G, unit: 'g',
  sol: `${K.ALUM_MG_L} × ${K.BATCH_L} = ${K.ALUM_MG} mg = ${K.ALUM_G} g.`,
  scheme: [[`${K.ALUM_G} g`, 1]],
  d: 2, c: 'application', t: [4],
}), (q) => q.answer.value === 300 || 'value');
add('num-cases', num({
  stem: `In a village of ${K.HOUSEHOLDS} households, ${K.BEFORE} households had a water-borne infection before the well was chlorinated and ${K.AFTER} after. By what percentage did the number of affected households fall?`,
  value: K.FALL_PCT, unit: '%',
  sol: `(${K.BEFORE} − ${K.AFTER}) ÷ ${K.BEFORE} × 100 = ${K.FALL_PCT}%.`,
  scheme: [[`${K.FALL_PCT}%`, 1]],
  d: 3, c: 'application', t: [5],
}), (q) => q.answer.value === 75 || 'value');
add('num-bars', num({
  stem: `A family uses ${K.BARS_HARD} bars of soap a month in hard water and ${K.BARS_SOFT} bars in soft water. What percentage more soap does it use in hard water?`,
  value: K.BARS_PCT, unit: '%',
  sol: `(${K.BARS_HARD} − ${K.BARS_SOFT}) ÷ ${K.BARS_SOFT} × 100 = ${K.BARS_PCT}%.`,
  scheme: [[`${K.BARS_PCT}%`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === 50 || 'value');

// ---------------------------------------------------------------- fill and match
add('fill-5', fill({
  marks: 5,
  stem: 'Complete the paragraph with suitable terms. Water that does not lather readily with soap is called (1) ____ water. Hardness removed by boiling is (2) ____ hardness and is caused by (3) ____ of calcium and magnesium. Hardness caused by chlorides and sulphates is called (4) ____ hardness. A substance used to remove both kinds is (5) ____.',
  acc: [['hard'], ['temporary'], ['hydrogencarbonates', 'bicarbonates'], ['permanent'], ['washing soda', 'sodium carbonate']],
  sol: 'Hard; temporary; hydrogencarbonates; permanent; washing soda.',
  d: 2, c: 'understanding', t: [1, 2, 3],
}));
add('disease-match5', match({
  marks: 5,
  stem: 'Match each water-borne disease with its cause or main sign.',
  pairs: [
    ['Cholera', 'Severe watery diarrhoea caused by bacteria'],
    ['Typhoid', 'Prolonged fever caused by bacteria'],
    ['Hepatitis A', 'Jaundice caused by a virus'],
    ['Polio', 'Paralysis of limbs caused by a virus'],
    ['Dysentery', 'Diarrhoea with blood caused by bacteria or amoeba'],
  ],
  order: [0, 1, 4, 3, 2],
  sol: 'Cholera: watery diarrhoea; typhoid: fever; hepatitis A: jaundice; polio: paralysis; dysentery: blood in stools.',
  d: 2, c: 'understanding', t: [5],
}));
add('treat-match5', match({
  marks: 5,
  stem: 'Study the flow diagram of a water treatment works. Match each lettered stage with its purpose.',
  pairs: [
    ['A', 'Removes floating litter and large objects'],
    ['B', 'Fine particles clump and settle'],
    ['C', 'Holds back the remaining particles'],
    ['D', 'Kills disease-causing germs'],
    ['E', 'Holds the safe water before it is supplied'],
  ],
  order: [3, 0, 4, 1, 2],
  sol: 'A screening; B alum tank; C sand and gravel filter; D chlorination; E storage tank.',
  d: 2, c: 'application', t: [4],
  assets: [treatFig],
}));

// ---------------------------------------------------------------- 2-mark short answers
add('s2-soap', short({
  marks: 2,
  stem: 'How can soap solution be used to tell hard water from soft water? State the observation for each.',
  model: 'Shake **equal volumes of each sample with the same amount of soap solution**. **Soft water** gives a **good lather** at once; **hard water** gives **scum** and little lather.',
  sol: 'Same soap, same volume; lather versus scum.',
  scheme: [['Fair test with the same soap and volume', 1], ['Observation for soft and for hard water', 1]],
  d: 2, c: 'application', t: [1],
}));
add('s2-types', short({
  marks: 2,
  stem: 'Name one salt that causes temporary hardness and one that causes permanent hardness.',
  model: 'Temporary: **calcium hydrogencarbonate** (or magnesium hydrogencarbonate). Permanent: **calcium sulphate** (or magnesium chloride, calcium chloride, magnesium sulphate).',
  sol: 'A hydrogencarbonate; a chloride or sulphate.',
  scheme: [['A hydrogencarbonate for temporary', 1], ['A chloride or sulphate for permanent', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('s2-boil', short({
  marks: 2,
  stem: 'Why does boiling remove temporary hardness but not permanent hardness?',
  model: 'On boiling, the **hydrogencarbonates break down** to insoluble carbonates that settle. The **chlorides and sulphates do not break down** on heating, so they stay dissolved.',
  sol: 'Hydrogencarbonates decompose; chlorides and sulphates do not.',
  scheme: [['Hydrogencarbonates decompose to insoluble carbonates', 1], ['Chlorides and sulphates are not changed', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('s2-ws-eq', short({
  marks: 2, wl: null,
  stem: 'Write the balanced equation for the reaction of washing soda with calcium chloride and state what is seen.',
  model: r`$\ce{CaCl2 + Na2CO3 -> CaCO3 v + 2NaCl}$ A **white precipitate** of calcium carbonate forms.`,
  sol: 'Equation; white precipitate.',
  scheme: [['Balanced equation', 1], ['White precipitate', 1]],
  d: 2, c: 'application', t: [3],
}));
add('s2-alum', short({
  marks: 2,
  stem: 'Explain how alum helps to clear a jar of muddy water.',
  model: 'Alum forms **sticky, jelly-like flakes** of aluminium hydroxide. They **trap the fine mud particles**, become heavy and **sink**, leaving clear water above.',
  sol: 'Sticky flakes trap particles; they sink.',
  scheme: [['Forms sticky flakes', 1], ['Trap particles and settle', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('s2-chlor', short({
  marks: 2,
  stem: 'State the purpose of (i) chlorination and (ii) defluoridation in the treatment of drinking water.',
  model: '(i) Chlorination **kills disease-causing germs**. (ii) Defluoridation **removes excess fluoride**, which would harm teeth and bones.',
  sol: 'Kills germs; removes excess fluoride.',
  scheme: [['Chlorination kills germs', 1], ['Defluoridation removes excess fluoride', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('s2-disease', short({
  marks: 2, wl: [10, 45],
  stem: 'Name two water-borne diseases caused by bacteria and one caused by a virus.',
  model: 'Bacteria: **cholera** and **typhoid** (also diarrhoea or dysentery). Virus: **hepatitis A** (or polio).',
  sol: 'Cholera and typhoid; hepatitis A.',
  scheme: [['Two bacterial diseases', 1], ['A viral disease', 1]],
  d: 1, c: 'recall', t: [5],
}));

// ---------------------------------------------------------------- 3-mark short answers
add('s3-disadv', short({
  marks: 3,
  stem: 'State three disadvantages of using hard water in homes and industry.',
  model: '1. It **wastes soap**, because the soap forms scum before it lathers.\n2. It forms **scale** in kettles and boilers, wasting fuel and blocking pipes.\n3. It leaves a **scum on cloth**, which becomes dull.',
  sol: 'Wastes soap; scale; scum on cloth.',
  scheme: [['First disadvantage', 1], ['Second disadvantage', 1], ['Third disadvantage', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('s3-compare', short({
  marks: 3, wl: null,
  stem: 'Tabulate three differences between temporary hardness and permanent hardness.',
  model: '| Temporary | Permanent |\n|---|---|\n| Caused by **hydrogencarbonates** | Caused by **chlorides and sulphates** |\n| **Removed by boiling** | **Not removed by boiling** |\n| Example: calcium hydrogencarbonate | Example: magnesium sulphate |',
  sol: 'Salts; boiling; examples.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('s3-steps', short({
  marks: 3, wl: [18, 70],
  stem: 'List three steps in making river water potable and give the purpose of each.',
  model: '1. **Adding alum**: fine particles clump and settle.\n2. **Filtration through sand and gravel**: removes the remaining particles.\n3. **Chlorination**: kills disease-causing germs.',
  sol: 'Alum, filter, chlorine, with purposes.',
  scheme: [['First step with purpose', 1], ['Second step with purpose', 1], ['Third step with purpose', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('s3-prevent', short({
  marks: 3, wl: [18, 70],
  stem: 'Suggest three measures a village can take to prevent outbreaks of water-borne diseases.',
  model: '1. **Keep drinking-water sources away from sewage.**\n2. **Boil, filter or chlorinate** drinking water.\n3. **Wash hands**, cover food and **use vaccines** where advised.',
  sol: 'Protect sources; treat water; hygiene and vaccination.',
  scheme: [['First measure', 1], ['Second measure', 1], ['Third measure', 1]],
  d: 2, c: 'application', t: [5],
}));
add('s3-eqs', short({
  marks: 3, wl: null,
  stem: 'Write balanced equations for the action of heat on (i) calcium hydrogencarbonate and (ii) magnesium hydrogencarbonate. Name the insoluble substance formed in each.',
  model: r`(i) $\ce{Ca(HCO3)2 ->[\Delta] CaCO3 + H2O + CO2}$ (calcium carbonate). (ii) $\ce{Mg(HCO3)2 ->[\Delta] MgCO3 + H2O + CO2}$ (magnesium carbonate).`,
  sol: 'Two equations; carbonates named.',
  scheme: [['Calcium equation balanced', 1], ['Magnesium equation balanced', 1], ['Both carbonates named', 1]],
  d: 2, c: 'application', t: [3],
}));
add('s3-test', short({
  marks: 3,
  stem: 'Describe an experiment to find out whether a sample of hard water has temporary hardness.',
  model: 'Shake a measured volume of the sample with **soap solution** and note the **scum**. Boil another portion, cool and filter it, then shake it with soap. If the boiled sample **lathers much better**, the hardness is **temporary**.',
  sol: 'Soap test before and after boiling; improved lather shows temporary hardness.',
  scheme: [['Soap test on the sample', 1], ['Soap test after boiling', 1], ['Better lather means temporary hardness', 1]],
  d: 3, c: 'application', t: [2, 3],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('soap-long', long({
  marks: 10, wl: null,
  stem: `A student tests three 50 mL samples with soap solution and notes the volume (mL) needed for a lasting lather. Distilled water needs ${K.DISTILLED} mL. Sample A: ${S.A.raw} before and ${S.A.boiled} after boiling. Sample B: ${S.B.raw} before and ${S.B.boiled} after boiling. Sample C: ${S.C.raw} before and ${S.C.boiled} after boiling.\n\n(a) State the kind of hardness in each of A, B and C. [3]\n\n(b) Calculate the percentage of the hardness of A that is temporary. [2]\n\n(c) Write a balanced equation for the removal of the temporary hardness of C if it is due to calcium hydrogencarbonate. [2]\n\n(d) Name a salt that could cause the permanent hardness in B, and write an equation for its removal with washing soda. [2]\n\n(e) State one disadvantage of using water like B in boilers. [1]`,
  model: `**(a)** A: **both** temporary and permanent. B: **permanent only** (no fall on boiling). C: **temporary only** (falls to the level of distilled water).\n\n**(b)** Total = ${S.A.raw} − ${K.DISTILLED} = ${K.PA.excess}; temporary = ${S.A.raw} − ${S.A.boiled} = ${K.PA.temporary}; ${K.PA.temporary} ÷ ${K.PA.excess} × 100 = **${K.A_TEMP_PCT}%**.\n\n**(c)** $\\ce{Ca(HCO3)2 ->[\\Delta] CaCO3 + H2O + CO2}$\n\n**(d)** **Calcium sulphate** (or calcium chloride): $\\ce{CaSO4 + Na2CO3 -> CaCO3 v + Na2SO4}$.\n\n**(e)** It forms **scale**, which wastes fuel and can block pipes.`,
  sol: `Both, permanent only, temporary only; ${K.A_TEMP_PCT}%; boiling equation; a permanent salt with washing soda equation; scale.`,
  scheme: [['A both', 1], ['B permanent', 1], ['C temporary', 1], ['Working', 1], [`${K.A_TEMP_PCT}%`, 1], ['Formulae correct', 1], ['Balanced', 1], ['Salt named', 1], ['Equation with washing soda', 1], ['Scale in boilers', 1]],
  d: 4, c: 'analysis', t: [2, 3],
}), (q) => K.A_TEMP_PCT === 66.7 || 'pct');
add('treat-long', long({
  marks: 10, wl: null,
  stem: 'Study the flow diagram of a water treatment works. Its stages are lettered A to E.\n\n(a) Name the stages A, B and D. [3]\n\n(b) State the purpose of stage B. [2]\n\n(c) State what happens to the fine particles at stage B and how stage C deals with those that remain. [2]\n\n(d) Name a further step needed if the water contains excess fluoride, and state why. [2]\n\n(e) Suggest one way of making water safer at home. [1]',
  model: '**(a)** A: **screening**. B: **alum tank** (coagulation). D: **chlorination**.\n\n**(b)** Alum forms **sticky flakes** that make fine particles **clump and settle**.\n\n**(c)** The particles are **trapped in the flakes and sink**; the **sand and gravel filter** holds back those that remain.\n\n**(d)** **Defluoridation**, because too much fluoride harms teeth and bones.\n\n**(e)** **Boiling** (or filtering) the water.',
  sol: 'Screening, alum tank, chlorination; alum forms flakes; filter; defluoridation; boiling.',
  scheme: [['A screening', 1], ['B alum tank', 1], ['D chlorination', 1], ['Sticky flakes', 1], ['Particles clump and settle', 1], ['Trapped and sink', 1], ['Filter holds back the rest', 1], ['Defluoridation', 1], ['Reason', 1], ['Boiling or filtering', 1]],
  d: 3, c: 'application', t: [4],
  assets: [treatFig],
}));
add('wsoda-long', long({
  marks: 10, wl: null,
  stem: 'A sample of water contains calcium chloride and magnesium hydrogencarbonate.\n\n(a) State the type of hardness caused by each salt. [2]\n\n(b) Write a balanced equation for the removal of the hardness caused by magnesium hydrogencarbonate by boiling. [2]\n\n(c) Write a balanced equation for the removal of the hardness caused by calcium chloride by washing soda, and state the observation. [3]\n\n(d) Explain why boiling alone leaves the water hard. [2]\n\n(e) Name the white solid that settles at the bottom of a kettle used with such water. [1]',
  model: '**(a)** Calcium chloride: **permanent**. Magnesium hydrogencarbonate: **temporary**.\n\n**(b)** $\\ce{Mg(HCO3)2 ->[\\Delta] MgCO3 + H2O + CO2}$\n\n**(c)** $\\ce{CaCl2 + Na2CO3 -> CaCO3 v + 2NaCl}$; a **white precipitate** forms.\n\n**(d)** Boiling removes only the temporary hardness; **calcium chloride does not break down** on heating, so the water stays hard.\n\n**(e)** **Magnesium carbonate**.',
  sol: 'Permanent and temporary; boiling equation; washing soda equation and precipitate; boiling removes temporary only; carbonate scale.',
  scheme: [['Calcium chloride permanent', 1], ['Magnesium hydrogencarbonate temporary', 1], ['Formulae correct', 1], ['Balanced', 1], ['Washing soda equation formulae', 1], ['Balanced with precipitate', 1], ['White precipitate', 1], ['Boiling removes temporary only', 1], ['Calcium chloride does not decompose', 1], ['Carbonate scale named', 1]],
  d: 3, c: 'application', t: [2, 3],
}));
add('alum-long', long({
  marks: 10, wl: null,
  stem: `A small town treats ${K.BATCH_L} litres of muddy pond water in a tank using alum at ${K.ALUM_MG_L} mg per litre (an illustrative dose), then chlorine at ${K.CL_DOSE_MG_L} mg per litre.\n\n(a) State what alum does to the muddy water. [2]\n\n(b) Calculate the mass of alum needed, in grams. [2]\n\n(c) Calculate the mass of chlorine needed for a ${K.TANK_L} litre tank at the stated dose, in grams. [2]\n\n(d) State why chlorine is added after the water has been filtered. [2]\n\n(e) Name one water-borne disease the treatment helps to prevent and the type of organism that causes it. [2]`,
  model: `**(a)** It forms **sticky flakes** that **trap fine particles** so they **settle**.\n\n**(b)** ${K.ALUM_MG_L} × ${K.BATCH_L} = ${K.ALUM_MG} mg = **${K.ALUM_G} g**.\n\n**(c)** ${K.CL_DOSE_MG_L} × ${K.TANK_L} = ${K.CL_MG} mg = **${K.CL_G} g**.\n\n**(d)** Chlorine works best on **clear water**; **mud can shield germs** from it.\n\n**(e)** **Cholera** (bacteria) or typhoid (bacteria) or hepatitis A (virus).`,
  sol: `Flakes trap particles; ${K.ALUM_G} g; ${K.CL_G} g; chlorine works on clear water; cholera, bacteria.`,
  scheme: [['Sticky flakes', 1], ['Trap particles and settle', 1], ['Working in mg', 1], [`${K.ALUM_G} g`, 1], ['Working for chlorine', 1], [`${K.CL_G} g`, 1], ['Works best on clear water', 1], ['Mud shields germs', 1], ['Disease named', 1], ['Organism named', 1]],
  d: 3, c: 'application', t: [4],
}), (q) => K.ALUM_G === 300 && K.CL_G === 10 || 'dose');
add('outbreak-long', long({
  marks: 10, wl: null,
  stem: `In a village of ${K.HOUSEHOLDS} households, ${K.BEFORE} households fell ill with fever and diarrhoea after drinking water from an open well near a drain. After the well was cleaned and chlorinated, ${K.AFTER} households were affected in the next month.\n\n(a) Calculate the percentage of households affected before and after chlorination. [2]\n\n(b) Calculate the percentage fall in the number of affected households. [2]\n\n(c) Name two diseases that may spread this way and the type of organism that causes each. [3]\n\n(d) Suggest three preventive measures the village should follow. [3]`,
  model: `**(a)** Before: ${K.BEFORE} ÷ ${K.HOUSEHOLDS} × 100 = **${K.BEFORE_PCT}%**. After: ${K.AFTER} ÷ ${K.HOUSEHOLDS} × 100 = **${K.AFTER_PCT}%**.\n\n**(b)** (${K.BEFORE} − ${K.AFTER}) ÷ ${K.BEFORE} × 100 = **${K.FALL_PCT}%**.\n\n**(c)** **Cholera** or typhoid (bacteria); **hepatitis A** (virus).\n\n**(d)** **Protect the well from drains**, **boil or chlorinate** drinking water, **wash hands** and use vaccines where advised.`,
  sol: `${K.BEFORE_PCT}% and ${K.AFTER_PCT}%; ${K.FALL_PCT}%; two diseases with causes; three measures.`,
  scheme: [[`${K.BEFORE_PCT}%`, 1], [`${K.AFTER_PCT}%`, 1], ['Working for the fall', 1], [`${K.FALL_PCT}%`, 1], ['First disease with cause', 1], ['Second disease with cause', 1], ['Organism types correct', 1], ['First measure', 1], ['Second measure', 1], ['Third measure', 1]],
  d: 3, c: 'application', t: [5],
}), (q) => K.FALL_PCT === 75 || 'fall');
add('scale-long', long({
  marks: 10, wl: null,
  stem: 'A family finds a white crust inside its kettle after months of boiling tap water, and notices that soap lathers poorly with the water before boiling and well after boiling.\n\n(a) What kind of hardness does the water have? [1]\n\n(b) Write a balanced equation for the formation of the crust from calcium hydrogencarbonate. [2]\n\n(c) State two disadvantages of this crust in boilers. [2]\n\n(d) Name the process by which limestone makes rainwater hard and write the equation. [2]\n\n(e) Draw a neat, labelled diagram of two test tubes showing the soap test on the water before and after boiling. [3]',
  model: '**(a)** **Temporary** hardness.\n\n**(b)** $\\ce{Ca(HCO3)2 ->[\\Delta] CaCO3 + H2O + CO2}$\n\n**(c)** It **wastes fuel** (poor heat transfer) and can **block pipes** or cause overheating.\n\n**(d)** Rainwater with carbon dioxide dissolves limestone: $\\ce{CaCO3 + H2O + CO2 -> Ca(HCO3)2}$.\n\n**(e)** Two **test tubes**: before boiling, **scum and little lather**; after boiling, **plenty of lather**; labels for water, scum and lather.',
  sol: 'Temporary; boiling equation; fuel waste and blocking; dissolving limestone equation; two labelled tubes.',
  scheme: [['Temporary', 1], ['Formulae correct', 1], ['Balanced', 1], ['First disadvantage', 1], ['Second disadvantage', 1], ['Dissolving limestone formulae', 1], ['Balanced equation', 1], ['Tube with scum', 1], ['Tube with lather', 1], ['Labels', 1]],
  d: 3, c: 'application', t: [1, 2, 3],
  assets: [soapFig],
}));
add('fluoride-long', long({
  marks: 10, wl: null,
  stem: `A hostel gets well water containing ${K.F_FOUND} mg of fluoride per litre against a limit of ${K.F_LIMIT} mg per litre. It also has temporary hardness. The tank holds ${K.F_TANK_L} litres.\n\n(a) Name the process needed to deal with the fluoride. [1]\n\n(b) Calculate the excess fluoride per litre and the mass to be removed from the tank, in grams. [3]\n\n(c) State the harm that excess fluoride can cause. [1]\n\n(d) How can the temporary hardness be removed cheaply at home? Write a balanced equation. [3]\n\n(e) State two advantages of soft water over hard water. [2]`,
  model: `**(a)** **Defluoridation**.\n\n**(b)** Excess = ${K.F_FOUND} − ${K.F_LIMIT} = **${K.F_EXCESS} mg per litre**; ${K.F_EXCESS} × ${K.F_TANK_L} = ${K.F_REMOVE_MG} mg = **${K.F_REMOVE_G} g**.\n\n**(c)** It damages **teeth and bones** (fluorosis).\n\n**(d)** By **boiling**: $\\ce{Ca(HCO3)2 ->[\\Delta] CaCO3 + H2O + CO2}$.\n\n**(e)** It **lathers easily and saves soap**, and **does not form scale** in boilers.`,
  sol: `Defluoridation; ${K.F_EXCESS} mg per litre and ${K.F_REMOVE_G} g; teeth and bones; boiling equation; saves soap, no scale.`,
  scheme: [['Defluoridation', 1], ['Excess found', 1], ['Working', 1], [`${K.F_REMOVE_G} g`, 1], ['Harm to teeth and bones', 1], ['Boiling named', 1], ['Formulae correct', 1], ['Balanced', 1], ['First advantage', 1], ['Second advantage', 1]],
  d: 3, c: 'application', t: [3, 4],
}), (q) => K.F_REMOVE_G === 7.5 || 'f');
