// ICSE 9 Chemistry ch06 Hard and Soft Water; Making Water Potable. Part 1 (t01, t02, t03), Part 2 (t04, t05).
import { sl, deck, table, flow, svgV, chem, r } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { SOAP, TREAT } from './svgs.mjs';
import * as K from './calc.mjs';

const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
export const W = (n) => {
  if (n < 20) return ONES[n];
  if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? ' ' + ONES[n % 10] : '');
  if (n < 1000) return ONES[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' and ' + W(n % 100) : '');
  return W(Math.floor(n / 1000)) + ' thousand' + (n % 1000 ? ' ' + W(n % 1000) : '');
};

export const V = {
  soap: svgV(SOAP, 'Four test tubes shaken with soap: soft water lathers, hard water gives scum, boiled temporary hard water lathers, boiled permanent hard water gives scum'),
  treat: svgV(TREAT, 'Water treatment flow: screening, alum tank, sand and gravel filter, chlorination, storage'),
};

export const deck1 = deck({
  part: 1,
  title: 'Hard and Soft Water — Part 1: The soap test, kinds of hardness and removing it',
  goals: [
    'Distinguish hard and soft water by their action with soap and list advantages and disadvantages of each',
    'Name the salts that cause temporary and permanent hardness',
    'Write balanced equations for removing hardness by boiling and with washing soda',
  ],
  slides: [
    sl('title', 'Hard and Soft Water', {
      b: 'Part 1 — why soap sometimes refuses to lather, and how to fix the water.',
      v: flow('LR', [['w', 'Water'], ['s', 'Add soap'], ['l', 'Lather or scum']], [['w', 's'], ['s', 'l']], 'Flow: water, add soap, lather or scum'),
      n: 'Wash your hands in rainwater and the soap lathers at once. Use some well water and you get a grey scum instead. The difference lies in what the water picked up on its way to you.',
    }),
    sl('concept', 'The soap test', {
      b: '**Soft water** lathers easily with soap. **Hard water** does not lather readily; it forms a curdy **scum** because the calcium and magnesium salts in it react with soap.',
      v: table(['', 'Soft water', 'Hard water'], [['With soap solution', 'Plenty of lather at once', 'Scum, little lather'], ['Soap needed', 'Little', 'More; wasted as scum'], ['Contains', 'Few or no calcium and magnesium salts', 'Dissolved calcium and magnesium salts']], 'Table comparing soft and hard water in action with soap'),
      n: 'Soap is a sodium salt of a fatty acid. In hard water, calcium and magnesium salts turn it into an insoluble curd, which is the scum. Only when all those salts are used up does soap begin to lather.',
    }),
    sl('diagram', 'Soap test on four samples', {
      b: 'Equal volumes, the same amount of soap solution, each tube shaken.',
      v: V.soap,
      n: 'Soft water gives plenty of lather. Hard water gives scum. After boiling, temporary hard water lathers like soft water. But permanent hard water still gives scum after boiling, so boiling did not remove its hardness.',
    }),
    sl('check', 'Quick check: reading the soap test', {
      b: 'A sample gives a curdy scum and very little lather with soap. The sample is…',
      chk: 'chk-soap',
      n: 'What does scum tell you about the dissolved salts?',
    }),
    sl('concept', 'Advantages and disadvantages', {
      v: table(['', 'Advantages', 'Disadvantages'], [['Hard water', 'Pleasant taste; supplies calcium for bones and teeth; coats lead pipes so lead does not dissolve', 'Wastes soap; makes scum; forms scale in kettles and boilers; dulls cloth'], ['Soft water', 'Lathers easily; saves soap; no scale in boilers; good for washing', 'Little calcium; may dissolve lead from lead pipes']], 'Table of advantages and disadvantages of hard and soft water'),
      n: 'Hard water has a pleasant taste and gives some calcium, but it wastes soap and leaves scale in boilers. Soft water lathers readily and keeps boilers clean, but it can pick up lead from old pipes.',
    }),
    sl('concept', 'How water becomes hard', {
      b: 'Rainwater picks up carbon dioxide and trickles over **limestone or chalk**, which slowly dissolves as calcium hydrogencarbonate.',
      v: chem(r`CaCO3 + H2O + CO2 -> Ca(HCO3)2`, 'Equation: calcium carbonate with water and carbon dioxide gives calcium hydrogencarbonate', 'Limestone dissolving in rainwater'),
      n: 'Rain absorbs carbon dioxide and becomes slightly acidic. When it passes over limestone, the calcium carbonate reacts with water and carbon dioxide to form calcium hydrogencarbonate, which dissolves. The water has become hard.',
    }),
    sl('concept', 'Temporary and permanent hardness', {
      v: table(['', 'Temporary hardness', 'Permanent hardness'], [['Caused by', 'Hydrogencarbonates of calcium and magnesium', 'Chlorides and sulphates of calcium and magnesium'], ['Salts', 'Ca(HCO₃)₂, Mg(HCO₃)₂', 'CaCl₂, MgCl₂, CaSO₄, MgSO₄'], ['Removed by boiling?', 'Yes', 'No']], 'Table comparing temporary and permanent hardness'),
      n: 'Temporary hardness comes from the hydrogencarbonates of calcium and magnesium, and boiling removes it. Permanent hardness comes from their chlorides and sulphates, and boiling cannot remove it.',
    }),
    sl('check', 'Quick check: which salt?', {
      b: 'Which salt causes permanent hardness?',
      chk: 'chk-temp',
      n: 'Chlorides and sulphates, not hydrogencarbonates.',
    }),
    sl('example', 'Worked example 1: what kind of hardness?', {
      b: `Soap solution (mL) needed for a lasting lather with 50 mL of sample A: ${K.SAMPLES.A.raw} before boiling, ${K.SAMPLES.A.boiled} after boiling, ${K.DISTILLED} for distilled water. (Imagined data.)`,
      ul: [`Step 1: soap used by the hardness = ${K.SAMPLES.A.raw} − ${K.DISTILLED} = ${K.PA.excess} mL.`, `Step 2: boiling removed ${K.SAMPLES.A.raw} − ${K.SAMPLES.A.boiled} = ${K.PA.temporary} mL worth: **temporary** hardness.`, `Step 3: ${K.SAMPLES.A.boiled} − ${K.DISTILLED} = ${K.PA.permanent} mL remains: **permanent** hardness. The sample has **both**.`],
      v: table(['Part', 'Soap used (mL)'], [['Total hardness', `${K.PA.excess}`], ['Temporary (removed by boiling)', `${K.PA.temporary}`], ['Permanent (left after boiling)', `${K.PA.permanent}`]], 'Worked table: total nine, temporary six, permanent three'),
      n: `Subtract the soap that distilled water needs, which is the baseline. What boiling removed is the temporary part, which is ${W(K.PA.temporary)}. What remains after boiling is the permanent part, which is ${W(K.PA.permanent)}. The sample has both kinds.`,
    }),
    sl('concept', 'Removing temporary hardness by boiling', {
      b: 'Boiling breaks down the hydrogencarbonates into insoluble carbonates, which settle as **scale** or are filtered off.',
      v: chem(r`Ca(HCO3)2 ->[\Delta] CaCO3 + H2O + CO2`, 'Equation: calcium hydrogencarbonate on boiling gives calcium carbonate, water and carbon dioxide', 'Boiling temporary hard water'),
      n: 'On boiling, calcium hydrogencarbonate breaks down into insoluble calcium carbonate, water and carbon dioxide. The carbonate settles, so the calcium has left the water. Magnesium hydrogencarbonate behaves in the same way.',
    }),
    sl('check', 'Quick check: boiling', {
      b: 'True or false: boiling removes the hardness caused by calcium sulphate.',
      chk: 'chk-boil-tf',
      n: 'Which kind of hardness can boiling remove?',
    }),
    sl('concept', 'Removing hardness with washing soda', {
      b: 'Sodium carbonate (washing soda) precipitates calcium and magnesium as **insoluble carbonates**. It removes **both** kinds of hardness.',
      v: table(['Hardness', 'Equation'], [['Permanent (calcium chloride)', 'CaCl₂ + Na₂CO₃ → CaCO₃↓ + 2NaCl'], ['Permanent (magnesium sulphate)', 'MgSO₄ + Na₂CO₃ → MgCO₃↓ + Na₂SO₄'], ['Temporary (calcium hydrogencarbonate)', 'Ca(HCO₃)₂ + Na₂CO₃ → CaCO₃↓ + 2NaHCO₃']], 'Table of three equations for removing hardness with washing soda'),
      n: 'Washing soda gives carbonate ions. Calcium and magnesium ions join them and fall out as insoluble carbonates, leaving harmless sodium salts in solution. This works for both temporary and permanent hardness.',
    }),
    sl('example', 'Worked example 2: softening a sample', {
      b: 'A sample contains magnesium sulphate. Choose a method and write the equation.',
      ul: ['Step 1: magnesium sulphate causes **permanent** hardness, so boiling will not help.', 'Step 2: add washing soda: $\\ce{MgSO4 + Na2CO3 -> MgCO3 v + Na2SO4}$.', 'Step 3: filter off the white precipitate of magnesium carbonate; the water is soft.'],
      v: chem(r`MgSO4 + Na2CO3 -> MgCO3 v + Na2SO4`, 'Equation: magnesium sulphate with sodium carbonate gives a precipitate of magnesium carbonate and sodium sulphate', 'Softening with washing soda'),
      n: 'Magnesium sulphate causes permanent hardness, so boiling is useless. Washing soda turns the magnesium into insoluble magnesium carbonate, which you can filter off. Sodium sulphate stays dissolved, and it does not make the water hard.',
    }),
    sl('check', 'Quick check: choosing a method', {
      b: 'Which substance removes both temporary and permanent hardness?',
      chk: 'chk-wsoda',
      n: 'Think about which reagent precipitates carbonates.',
    }),
    sl('summary', 'Summary', {
      ul: ['Hard water: scum with soap. Soft water: lather.', 'Temporary: hydrogencarbonates of calcium and magnesium. Permanent: their chlorides and sulphates.', 'Boiling removes temporary hardness only; washing soda removes both.'],
      v: table(['Method', 'Removes'], [['Boiling', 'Temporary hardness'], ['Washing soda', 'Temporary and permanent hardness']], 'Summary table of methods of softening water'),
      n: 'To recap. Soap reveals hardness. Temporary hardness comes from hydrogencarbonates and can be boiled away. Permanent hardness comes from chlorides and sulphates and needs a reagent such as washing soda. Washing soda handles both.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Name the **salts** responsible for each type of hardness.', 'Write the **precipitate** and balance every equation.', 'State **which** hardness a method removes; boiling does **not** remove permanent hardness.', 'In the soap test, describe both lather and scum.'],
      n: 'Exam tips. Name the salts for each kind of hardness. Balance every equation and name the precipitate. Say which hardness a method removes. And describe both the lather and the scum in the soap test.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Making Water Potable — Part 2: Water treatment and water-borne diseases',
  goals: [
    'Describe the steps used to make water safe to drink and the purpose of each',
    'Explain how alum helps suspended particles settle',
    'Name common water-borne diseases and suggest preventive measures',
  ],
  slides: [
    sl('title', 'Making Water Potable', {
      b: 'Part 2 — from a muddy river to a safe tap, and the diseases that unsafe water can carry.',
      v: flow('LR', [['r', 'Raw water'], ['t', 'Treatment'], ['p', 'Potable water']], [['r', 't'], ['t', 'p']], 'Flow: raw water, treatment, potable water'),
      n: 'Water that looks clear can still carry germs. Potable water is water that is safe to drink. Making it safe takes several steps, each aimed at a different problem.',
    }),
    sl('concept', 'What makes water unsafe?', {
      v: table(['Problem', 'Examples', 'How it is dealt with'], [['Large objects and floating matter', 'Leaves, twigs, plastic', 'Screening'], ['Fine suspended particles', 'Mud, silt', 'Alum, settling, filtration'], ['Germs', 'Bacteria, viruses', 'Chlorination (or boiling)'], ['Excess dissolved fluoride', 'Fluoride in some groundwater', 'Defluoridation']], 'Table of problems in raw water and how each is dealt with'),
      n: 'Raw water can contain floating litter, fine mud, germs and, in some places, too much dissolved fluoride. Each problem has its own remedy, which is why treatment has several stages.',
    }),
    sl('diagram', 'A water treatment works', {
      b: 'Follow the water from left to right.',
      v: V.treat,
      n: 'Water first passes through a screen. In the alum tank, flakes form and settle with the mud. A sand and gravel filter removes what is left. Chlorine then kills germs, and the safe water is stored and supplied. Where fluoride is too high, a defluoridation unit is added.',
    }),
    sl('check', 'Quick check: killing germs', {
      b: 'Which stage of water treatment kills disease-causing germs?',
      chk: 'chk-order',
      n: 'The filter removes particles. Which step actually kills germs?',
    }),
    sl('concept', 'The role of alum', {
      b: 'Alum (potash alum) dissolves in water and forms a jelly-like precipitate of aluminium hydroxide. The **sticky flakes trap** fine suspended particles, which then **settle** quickly.',
      v: flow('LR', [['a', 'Alum added to muddy water'], ['f', 'Sticky flakes form'], ['t', 'Flakes trap fine particles'], ['s', 'Particles settle'], ['c', 'Clear water decanted or filtered']], [['a', 'f'], ['f', 't'], ['t', 's'], ['s', 'c']], 'Flow showing how alum makes suspended particles settle'),
      n: 'Fine mud is so light that it stays afloat for days. When alum is added, it forms sticky, jelly-like flakes. These flakes trap the tiny particles and become heavy enough to sink. The clear water above can then be drawn off or filtered.',
    }),
    sl('example', 'Worked example 1: how much alum?', {
      b: `A town treats ${K.BATCH_L} litres of water at a time with alum at ${K.ALUM_MG_L} mg per litre. (Imagined dose.) How many grams of alum are needed?`,
      ul: [`Step 1: alum in mg = ${K.ALUM_MG_L} × ${K.BATCH_L} = ${K.ALUM_MG} mg.`, `Step 2: 1000 mg = 1 g, so ${K.ALUM_MG} ÷ 1000 = **${K.ALUM_G} g**.`],
      v: table(['Dose', 'Volume', 'Alum needed'], [[`${K.ALUM_MG_L} mg per litre`, `${K.BATCH_L} litres`, `${K.ALUM_G} g`]], 'Worked table: thirty milligrams per litre for ten thousand litres needs three hundred grams'),
      n: `Multiply the dose by the volume to get milligrams, then change to grams by dividing by one thousand. Thirty times ten thousand gives three hundred thousand milligrams, which is ${W(K.ALUM_G)} grams.`,
    }),
    sl('check', 'Quick check: why alum?', {
      b: 'Alum is added to muddy water so that the fine particles…',
      chk: 'chk-alum',
      n: 'Think of what the sticky flakes do.',
    }),
    sl('concept', 'Chlorination and defluoridation', {
      v: table(['Step', 'Purpose', 'Note'], [['Chlorination', 'Kills disease-causing germs', 'Chlorine gas or bleaching powder in small, controlled doses'], ['Defluoridation', 'Removes excess fluoride from water', 'Too much fluoride harms teeth and bones (fluorosis)']], 'Table of the purposes of chlorination and defluoridation'),
      n: 'Chlorination kills germs, using a small controlled dose of chlorine. Defluoridation removes excess fluoride, because too much of it damages teeth and bones. The safe limits are set by health authorities.',
    }),
    sl('example', 'Worked example 2: putting steps in order', {
      b: 'Arrange these steps for muddy village pond water that also carries germs: chlorination, screening, filtration, adding alum.',
      ul: ['Step 1: **screening** removes floating litter.', 'Step 2: **adding alum** makes fine particles clump and settle.', 'Step 3: **filtration** removes the remaining particles.', 'Step 4: **chlorination** kills the germs last, on clear water.'],
      v: flow('LR', [['a', 'Screening'], ['b', 'Adding alum'], ['c', 'Filtration'], ['d', 'Chlorination']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow showing the order: screening, alum, filtration, chlorination'),
      n: 'Remove the big things first, then clump the fine particles, then filter, and kill the germs last. Chlorine works best on clear water, because mud can shield germs from it.',
    }),
    sl('check', 'Quick check: fluoride', {
      b: 'True or false: defluoridation is needed to remove germs from drinking water.',
      chk: 'chk-fluoride-tf',
      n: 'What does defluoridation remove?',
    }),
    sl('concept', 'Diseases from polluted water', {
      v: table(['Disease', 'Cause', 'Main signs'], [['Cholera', 'Bacteria', 'Severe watery diarrhoea'], ['Typhoid', 'Bacteria', 'Prolonged fever'], ['Dysentery', 'Bacteria or amoeba', 'Diarrhoea with blood'], ['Diarrhoea', 'Bacteria, viruses or others', 'Loose watery stools'], ['Hepatitis A', 'Virus', 'Yellowing of the skin and eyes (jaundice)'], ['Polio', 'Virus', 'Weakness or paralysis of limbs']], 'Table of water-borne diseases with cause and main signs'),
      n: 'Polluted water can carry bacteria, viruses and other germs. Cholera, typhoid, dysentery and diarrhoea are mainly caused by bacteria or amoeba, while hepatitis A and polio are caused by viruses. They spread when sewage mixes with drinking water.',
    }),
    sl('concept', 'Preventing water-borne diseases', {
      v: flow('LR', [['s', 'Safe source, away from sewage'], ['t', 'Treat or boil water'], ['h', 'Wash hands and keep food covered'], ['v', 'Vaccination where advised'], ['o', 'Oral rehydration for diarrhoea']], [['s', 't'], ['t', 'h'], ['h', 'v'], ['v', 'o']], 'Flow of preventive measures against water-borne diseases'),
      n: 'Protect the source from sewage and drink water that has been boiled, filtered or chlorinated. Wash hands, cover food and use vaccines where advised. For diarrhoea, give oral rehydration solution and seek medical help.',
    }),
    sl('check', 'Quick check: a virus', {
      b: 'Which of these water-borne diseases is caused by a virus?',
      chk: 'chk-disease',
      n: 'Cholera and typhoid are bacterial.',
    }),
    sl('summary', 'Summary', {
      ul: ['Treatment: screening, alum, filtration, chlorination; defluoridation where needed.', 'Alum forms sticky flakes that trap fine particles so they settle.', 'Cholera, typhoid, dysentery and diarrhoea: bacteria or amoeba. Hepatitis A and polio: viruses.', 'Prevention: safe, treated water, hygiene, vaccination.'],
      v: table(['Step', 'Purpose'], [['Alum', 'Settles fine particles'], ['Filtration', 'Removes remaining particles'], ['Chlorination', 'Kills germs'], ['Defluoridation', 'Removes excess fluoride']], 'Summary table of treatment steps and their purposes'),
      n: 'To recap. Treatment removes large objects, settles fine particles with alum, filters them, and kills germs with chlorine. Excess fluoride needs defluoridation. Bacteria and viruses in polluted water cause diseases, which hygiene and treated water prevent.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Give the **purpose** of each step, not only its name.', 'Say that alum forms **flakes** that **trap** particles.', 'Link each disease with its **cause** (bacteria, amoeba or virus).', 'Suggest **practical** preventive steps: boiling, chlorination, hygiene, vaccination.'],
      n: 'Exam tips. Give the purpose of each treatment step. Say that alum forms flakes that trap particles. Match each disease with its cause. And give practical preventive steps.',
    }),
  ],
});
