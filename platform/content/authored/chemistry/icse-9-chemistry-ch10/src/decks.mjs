// ICSE 9 Chemistry ch10 Hydrogen: Position, Sources and Preparation — Part 1 (t01–t03: position, water and steam, dilute acids
// and alkalis), Part 2 (t04–t05: laboratory preparation, impurities and precautions, the Bosch process).
import { sl, deck, table, flow, chem, svgV, r } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { LAB_H2, STEAM_SET, POSITION } from './svgs.mjs';
import { C_ATOMS, H2_WATERGAS, CO_WATERGAS, H2_AFTER_SHIFT, CO2_AFTER_SHIFT, FE_FOR_20, STEAM20 } from './calc.mjs';

export const V = {
  lab: svgV(LAB_H2, 'Laboratory preparation of hydrogen from zinc and dilute acid, collected over water'),
  steam: svgV(STEAM_SET, 'Steam passed over a heated metal in a hard-glass tube, with hydrogen collected over water'),
  position: svgV(POSITION, 'The first three periods of the periodic table with hydrogen highlighted above group 1'),
};

export const deck1 = deck({
  part: 1,
  title: 'Hydrogen — Part 1: Position and the metals that make it',
  goals: [
    'Justify the position of hydrogen by comparing it with group 1 and group 17',
    'Write balanced equations for hydrogen from water, steam, dilute acids and alkalis',
    'Explain why dilute nitric acid and very reactive or unreactive metals are not used',
  ],
  slides: [
    sl('title', 'The first element', {
      b: 'Part 1 — hydrogen has one proton and one electron. Where does it belong in the periodic table, and which metals set it free from water, acids and alkalis?',
      v: flow('LR', [['a', 'Position in the table'], ['b', 'Water and steam'], ['c', 'Acids and alkalis']], [['a', 'b'], ['b', 'c']], 'Flow: position, then water and steam, then acids and alkalis'),
      n: 'Hydrogen is the simplest and lightest element. In this part we first ask where it should sit in the periodic table. Then we look at the metals that release hydrogen from water, from steam, from dilute acids and from alkalis.',
    }),
    sl('diagram', 'Where does hydrogen sit?', {
      b: 'Hydrogen is placed at the top of **group 1**, but it does not fit there perfectly. It also resembles **group 17**.',
      v: V.position,
      n: 'In the periodic table, hydrogen is written above the alkali metals. It has one electron in its only shell, just as lithium and sodium have one electron in their outer shells. But it is also one electron short of a full first shell, a little like fluorine and chlorine.',
    }),
    sl('concept', 'Like the alkali metals', {
      v: table(['Property', 'Hydrogen', 'Sodium'], [['Electrons in the outer shell', 'One', 'One'], ['Ion formed by losing the electron', 'H⁺', 'Na⁺'], ['Burns in oxygen to give', 'Water, an oxide of hydrogen', 'Sodium oxide'], ['Behaviour as a reducing agent', 'Yes', 'Yes'], ['Charge of the ion in a compound with chlorine', 'Positive in hydrogen chloride', 'Positive in sodium chloride']], 'Table comparing hydrogen with sodium'),
      n: 'Hydrogen resembles the alkali metals in several ways. Its atom has a single outer electron, and it can lose it to form a positive ion. It burns in oxygen to form an oxide, which is water, and it acts as a reducing agent.',
    }),
    sl('concept', 'Like the halogens', {
      v: table(['Property', 'Hydrogen', 'Chlorine'], [['Electrons needed to fill the shell', 'One, to reach two', 'One, to reach eight'], ['Ion formed by gaining the electron', 'H⁻ in sodium hydride', 'Cl⁻ in sodium chloride'], ['Molecule', 'Diatomic', 'Diatomic'], ['Type of element', 'Non-metal gas', 'Non-metal gas'], ['Compounds with non-metals', 'Covalent', 'Covalent']], 'Table comparing hydrogen with chlorine'),
      n: 'Hydrogen also resembles the halogens. It is one electron short of a complete shell and can gain an electron to form a negative ion in compounds such as sodium hydride. It exists as two atom molecules, it is a non-metal, and it forms covalent compounds.',
    }),
    sl('check', 'Quick check: position', {
      b: 'Think about the outer shell and the burning.',
      v: table(['Element', 'Outer electrons'], [['Hydrogen', '1'], ['Sodium', '1'], ['Chlorine', '7']], 'Outer electrons of hydrogen, sodium and chlorine'),
      chk: 'chk-pos',
      n: 'Look at the table of outer electrons. Which feature of hydrogen is a reason for placing it with the alkali metals?',
    }),
    sl('concept', 'Hydrogen from water and steam', {
      b: 'The more reactive the metal, the **milder** the condition needed. Follow the activity series downwards.',
      v: table(['Metal', 'Condition', 'Products', 'What is seen'], [['Sodium, potassium', 'Cold water', 'Hydroxide + hydrogen', 'Violent; the metal darts about; potassium burns with a lilac flame'], ['Calcium', 'Cold water', 'Calcium hydroxide + hydrogen', 'Steady bubbles; the solution turns milky'], ['Magnesium', 'Hot water', 'Magnesium hydroxide + hydrogen', 'Slow bubbling'], ['Aluminium, zinc', 'Steam', 'Oxide + hydrogen', 'Metal must be heated'], ['Iron', 'Steam over red-hot metal', 'Triiron tetroxide + hydrogen', 'Reversible reaction']], 'Table of the metals that give hydrogen with cold water, hot water and steam'),
      n: 'Sodium and potassium react with cold water, and the reaction is violent. Calcium reacts steadily with cold water. Magnesium needs hot water. Aluminium and zinc need steam, and iron needs steam over the red hot metal. The activity series explains this order.',
    }),
    sl('diagram', 'Steam over a heated metal', {
      b: 'Steam from boiling water passes over the **heated metal**. The gas that leaves is **hydrogen**, collected over water.',
      v: V.steam,
      n: 'This set-up is used for the metals that need steam. Water is boiled in a flask and the steam passes over the heated metal in a hard glass tube. Hydrogen, which is almost insoluble in water, is collected in a jar over water.',
    }),
    sl('concept', 'Equations: water and steam', {
      v: table(['Reaction', 'Balanced equation'], [['Sodium, cold water', '2Na + 2H₂O → 2NaOH + H₂'], ['Potassium, cold water', '2K + 2H₂O → 2KOH + H₂'], ['Calcium, cold water', 'Ca + 2H₂O → Ca(OH)₂ + H₂'], ['Magnesium, hot water', 'Mg + 2H₂O → Mg(OH)₂ + H₂'], ['Aluminium, steam', '2Al + 3H₂O → Al₂O₃ + 3H₂'], ['Zinc, steam', 'Zn + H₂O → ZnO + H₂'], ['Iron, steam', '3Fe + 4H₂O ⇌ Fe₃O₄ + 4H₂'], ['Carbon, steam', 'C + H₂O → CO + H₂']], 'Table of eight balanced equations for water and steam'),
      n: 'Here are balanced equations for water and steam. The last one is different: red hot carbon takes oxygen from steam and gives carbon monoxide and hydrogen. This mixture is called water gas, and we shall meet it again in the manufacture of hydrogen.',
    }),
    sl('example', 'Worked example 1: iron and steam', {
      b: r`**Problem.** Balance $\ce{Fe + H2O -> Fe3O4 + H2}$ and say why the arrow is reversible. How many iron atoms react with ${STEAM20} molecules of steam?

**Step 1.** Iron oxide has 3 Fe and 4 O, so write $3\ce{Fe}$ and $4\ce{H2O}$ (O: 4 = 4).

**Step 2.** Then 8 H on the left need $4\ce{H2}$ on the right: $\ce{3Fe + 4H2O <=> Fe3O4 + 4H2}$.

**Step 3.** Hydrogen can pass back over hot iron oxide and reverse the change, so steam is passed continuously to sweep hydrogen away.

**Step 4.** Ratio 3 Fe : 4 H₂O, so ${STEAM20} × 3 ÷ 4 = ${FE_FOR_20} iron atoms.`,
      v: chem(r`3Fe + 4H2O <=> Fe3O4 + 4H2`, 'Iron and steam in a reversible reaction giving iron oxide and hydrogen', 'Fe 3 = 3; H 8 = 8; O 4 = 4.'),
      n: 'Iron oxide has three iron atoms and four oxygen atoms, so we use three iron and four water. The eight hydrogen atoms on the left give four hydrogen molecules. The reaction is reversible, so steam is passed continuously to carry the hydrogen away. Twenty steam molecules need fifteen iron atoms.',
    }),
    sl('check', 'Quick check: steam and iron', {
      b: 'Remember the product and the arrow.',
      v: chem(r`3Fe + 4H2O <=> Fe3O4 + 4H2`, 'Iron and steam in a reversible reaction'),
      chk: 'chk-steam',
      n: 'When steam is passed over red hot iron, which pair of products is formed, and what is special about the reaction?',
    }),
    sl('concept', 'Hydrogen from dilute acids', {
      b: 'Metals **above hydrogen** in the activity series displace it from dilute hydrochloric acid and dilute sulphuric acid.',
      v: table(['Metal', 'With dilute hydrochloric acid', 'With dilute sulphuric acid'], [['Magnesium', 'Mg + 2HCl → MgCl₂ + H₂', 'Mg + H₂SO₄ → MgSO₄ + H₂'], ['Aluminium', '2Al + 6HCl → 2AlCl₃ + 3H₂', '2Al + 3H₂SO₄ → Al₂(SO₄)₃ + 3H₂'], ['Zinc', 'Zn + 2HCl → ZnCl₂ + H₂', 'Zn + H₂SO₄ → ZnSO₄ + H₂'], ['Iron', 'Fe + 2HCl → FeCl₂ + H₂', 'Fe + H₂SO₄ → FeSO₄ + H₂']], 'Table of eight balanced equations for metals with dilute acids'),
      n: 'Magnesium, aluminium, zinc and iron all sit above hydrogen. Each of them displaces hydrogen from dilute hydrochloric acid and from dilute sulphuric acid, forming a chloride or a sulphate. Iron forms iron two compounds, not iron three.',
    }),
    sl('example', 'Worked example 2: aluminium and hydrochloric acid', {
      b: r`**Problem.** Balance $\ce{Al + HCl -> AlCl3 + H2}$.

**Step 1.** Chlorine: 3 Cl on the right, so $3\ce{HCl}$ — but hydrogen then has 3 atoms, which cannot make whole $\ce{H2}$ molecules.

**Step 2.** Double everything: $2\ce{Al}$, $6\ce{HCl}$, $2\ce{AlCl3}$; hydrogen is $6$, so $3\ce{H2}$.

**Step 3.** Check: Al 2 = 2; Cl 6 = 6; H 6 = 6.`,
      v: chem(r`2Al + 6HCl -> 2AlCl3 + 3H2`, 'Two aluminium and six hydrochloric acid give two aluminium chloride and three hydrogen', 'Al 2 = 2; H 6 = 6; Cl 6 = 6.'),
      n: 'Aluminium chloride has three chlorine atoms, which suggests three hydrochloric acid. But three hydrogen atoms cannot make whole molecules. So double everything. Two aluminium and six hydrochloric acid give two aluminium chloride and three hydrogen molecules.',
    }),
    sl('concept', 'Hydrogen from alkalis', {
      b: 'A few metals also react with a hot **concentrated alkali** and give hydrogen. They form a salt in which the metal is part of the negative ion.',
      v: table(['Metal', 'With sodium hydroxide', 'Salt formed'], [['Zinc', 'Zn + 2NaOH → Na₂ZnO₂ + H₂', 'Sodium zincate'], ['Aluminium', '2Al + 2NaOH + 2H₂O → 2NaAlO₂ + 3H₂', 'Sodium aluminate'], ['Lead', 'Pb + 2NaOH → Na₂PbO₂ + H₂', 'Sodium plumbite']], 'Table of three metals with sodium hydroxide, their equations and the salts'),
      n: 'Zinc, aluminium and lead also give hydrogen with a hot strong alkali such as sodium hydroxide or potassium hydroxide. The salts formed are sodium zincate, sodium aluminate and sodium plumbite. With potassium hydroxide the potassium salts are formed in the same way.',
    }),
    sl('check', 'Quick check: alkalis', {
      b: 'Check the atoms on both sides.',
      v: chem(r`Zn + 2NaOH -> Na2ZnO2 + H2`, 'Zinc and sodium hydroxide give sodium zincate and hydrogen'),
      chk: 'chk-alkali',
      n: 'Zinc is warmed with sodium hydroxide solution. Which statement about this reaction is correct?',
    }),
    sl('concept', 'Which metals and acids are not used?', {
      v: table(['Choice', 'Why it is not used'], [['Sodium, potassium, calcium with acid', 'Far too violent; they react with the water as well'], ['Copper, silver, gold with dilute acid', 'Below hydrogen, so no hydrogen is formed'], ['Dilute nitric acid with a metal', 'It is an oxidising agent; it oxidises the hydrogen to water and gives oxides of nitrogen instead'], ['Lead with dilute sulphuric acid', 'An insoluble coating of lead sulphate stops the reaction']], 'Table of metals and acids that are not used and the reason'),
      n: 'Not every metal and acid pair is suitable. Very reactive metals are far too violent. Metals below hydrogen do not react with dilute acids at all. Dilute nitric acid is an oxidising acid, so it oxidises the hydrogen to water instead of releasing it, and gives oxides of nitrogen.',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Hydrogen is placed above group 1 but also resembles group 17.',
        'Na, K and Ca react with cold water; Mg with hot water; Al, Zn and Fe with steam; carbon with steam gives water gas.',
        'Mg, Al, Zn and Fe give hydrogen with dilute HCl and H₂SO₄; Zn, Al and Pb give it with NaOH or KOH.',
        'Dilute nitric acid, very reactive metals and metals below hydrogen are not used.',
      ],
      v: table(['Source', 'Example'], [['Cold water', '2Na + 2H₂O → 2NaOH + H₂'], ['Steam', 'Zn + H₂O → ZnO + H₂'], ['Dilute acid', 'Zn + 2HCl → ZnCl₂ + H₂'], ['Alkali', 'Zn + 2NaOH → Na₂ZnO₂ + H₂']], 'Summary table of four sources of hydrogen with one example each'),
      n: 'To sum up Part 1. Hydrogen is placed above group one, with some features of group seventeen. Metals release it from water, steam, dilute acids and alkalis, and the activity series decides how easily. Dilute nitric acid is never used.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Give the condition with the metal: cold water, hot water or steam.',
        'Iron and steam gives Fe₃O₄, not Fe₂O₃, and the arrow is reversible.',
        'Write the salts from alkalis as zincate, aluminate and plumbite, with the metal in the negative part.',
        'Say that nitric acid is an oxidising agent, not just "it is too strong".',
      ],
      v: table(['Slip', 'Fix'], [['Writing the product of Na and cold water as Na₂O', 'Sodium hydroxide and hydrogen'], ['Forgetting 2 in 2NaOH', 'Zn needs two NaOH'], ['Saying copper gives hydrogen with dilute acid', 'Copper is below hydrogen']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Exam tips. Always give the condition with the metal. Remember that iron and steam give the black oxide and the reaction is reversible. Write zincate, aluminate and plumbite correctly. And explain nitric acid as an oxidising agent.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Hydrogen — Part 2: Laboratory preparation and the Bosch process',
  goals: [
    'Draw and label the laboratory set-up for preparing hydrogen from zinc and dilute acid',
    'Explain the method of collection, the impurities and the precautions',
    'Write the reactions and conditions of the Bosch process and explain the removal of carbon dioxide and carbon monoxide',
  ],
  slides: [
    sl('title', 'Making hydrogen in bulk and in the laboratory', {
      b: 'Part 2 — a small amount in the laboratory from **zinc and dilute acid**, and tonnes in industry by the **Bosch process**.',
      v: flow('LR', [['z', 'Zinc and dilute acid'], ['h', 'Hydrogen'], ['b', 'Bosch process']], [['z', 'h'], ['b', 'h']], 'Flow: zinc and dilute acid, or the Bosch process, both give hydrogen'),
      n: 'This part covers two methods of making hydrogen. In the laboratory we use zinc and a dilute acid. In industry the Bosch process makes hydrogen from steam and coke on a very large scale.',
    }),
    sl('concept', 'Choosing the materials', {
      v: table(['Choice', 'Reason'], [['Zinc granules', 'Reacts at a moderate rate; sodium is too violent, magnesium too fast, iron too slow'], ['Dilute sulphuric or hydrochloric acid', 'Gives a steady stream of hydrogen; concentrated acid gives other gases'], ['A few drops of copper sulphate solution', 'Zinc becomes coated with copper and reacts faster'], ['Granules, not powder', 'Powder reacts too quickly and the froth may rise']], 'Table of reasons for choosing zinc, dilute acid and granules'),
      n: 'Zinc granules are chosen because they react at a moderate rate. Sodium would be too violent, magnesium too fast and iron too slow. Dilute acid gives a steady stream of hydrogen. A few drops of copper sulphate solution make pure zinc react faster.',
    }),
    sl('diagram', 'The laboratory set-up', {
      b: r`$\ce{Zn + H2SO4 -> ZnSO4 + H2}$. Acid goes in through the **thistle funnel**; hydrogen leaves by the **delivery tube**.`,
      v: V.lab,
      n: 'Zinc granules lie at the bottom of the flask. Dilute acid is poured in through the thistle funnel, whose lower end must dip below the acid. Hydrogen travels along the delivery tube into a trough of water and is collected in a jar that was filled with water and turned upside down.',
    }),
    sl('concept', 'Why collect it over water?', {
      v: table(['Point', 'Explanation'], [['Method', 'Downward displacement of water'], ['Why it works', 'Hydrogen is almost insoluble in water and is lighter than the water it pushes out'], ['Advantage', 'You can see when the jar is full, and the gas is not mixed with air'], ['Why not downward displacement of air', 'Hydrogen is lighter than air, so it would float upwards and escape']], 'Table explaining collection of hydrogen over water'),
      n: 'Hydrogen is collected by downward displacement of water. It is almost insoluble in water, so it pushes the water out of the jar. You can see when the jar is full, and the gas is pure. Hydrogen is lighter than air, so it cannot be collected by displacing air downwards.',
    }),
    sl('check', 'Quick check: the set-up', {
      b: 'Look at the position of the thistle funnel.',
      v: table(['Part', 'Job'], [['Thistle funnel', 'Adds acid'], ['Delivery tube', 'Carries gas']], 'Two parts of the apparatus and their jobs'),
      chk: 'chk-funnel',
      n: 'The lower end of the thistle funnel dips below the surface of the acid. What is the reason for this?',
    }),
    sl('concept', 'Impurities and how they are removed', {
      b: 'The gas may carry **acid spray**, **traces of other gases** from impure zinc, and **moisture**.',
      v: flow('LR', [['f', 'Flask: impure hydrogen'], ['w', 'Alkali solution: removes acid gases'], ['d', 'Drying agent: removes moisture'], ['j', 'Jar of dry hydrogen']], [['f', 'w'], ['w', 'd'], ['d', 'j']], 'Flow: impure gas passes through alkali solution and a drying agent to give dry hydrogen'),
      n: 'Hydrogen made in the laboratory is not quite pure. It can carry acid spray and traces of gases such as hydrogen sulphide, which come from impurities in the zinc, and it also carries moisture. A wash bottle of alkali solution takes out the acid gases, and a drying agent takes out the moisture.',
    }),
    sl('check', 'Quick check: purification', {
      b: 'Which agent removes moisture?',
      v: flow('LR', [['a', 'Impure hydrogen'], ['b', 'Wash bottle'], ['c', 'Drying agent']], [['a', 'b'], ['b', 'c']], 'Flow: impure hydrogen, wash bottle, drying agent'),
      chk: 'chk-dry',
      n: 'The gas from the flask is first passed through an alkali solution. What is the purpose of the next step with the drying agent?',
    }),
    sl('concept', 'Precautions', {
      v: table(['Precaution', 'Reason'], [['Make sure the joints are airtight', 'Hydrogen would escape and air could enter'], ['Keep every flame away', 'A mixture of hydrogen and air explodes'], ['Reject the first jar of gas', 'It contains air from the flask'], ['Test a sample with a burning splint before collecting', 'A quiet pop shows the gas is pure; a loud bang shows air is present'], ['Add acid slowly', 'The reaction stays steady and the froth stays in the flask']], 'Table of five precautions and the reason for each'),
      n: 'Always keep flames away because hydrogen mixed with air explodes. Check that the joints are airtight. Throw away the first jar, which holds air from the flask. Test a small sample with a flame behind a screen. A quiet pop means the gas is pure, and a loud bang means air is present.',
    }),
    sl('example', 'Worked example 1: a laboratory preparation', {
      b: r`**Problem.** A student adds dilute sulphuric acid to zinc granules. Write the equation, give two observations and say which gas test is used.

**Step 1.** $\ce{Zn + H2SO4 -> ZnSO4 + H2}$ — zinc sulphate dissolves, so nothing coats the zinc.

**Step 2.** Observations: bubbles of a colourless gas; the zinc slowly gets smaller; the flask warms slightly.

**Step 3.** Test: the gas burns with a **pop** when a flame is brought near.`,
      v: chem(r`Zn + H2SO4 -> ZnSO4 + H2`, 'Zinc and dilute sulphuric acid give zinc sulphate and hydrogen', 'Hydrogen burns with a pop.'),
      n: 'Zinc and dilute sulphuric acid give zinc sulphate and hydrogen. Zinc sulphate dissolves, so the zinc stays clean and the reaction continues. You see bubbles of a colourless gas, and the flask becomes slightly warm. The gas burns with a pop near a flame.',
    }),
    sl('concept', 'The Bosch process: stage one', {
      b: 'Steam is passed over red-hot **coke** at about one thousand degrees Celsius. The product is **water gas**, a mixture of carbon monoxide and hydrogen.',
      v: chem(r`C + H2O ->[\Delta] CO + H2`, 'Carbon and steam give carbon monoxide and hydrogen, which is water gas', 'Water gas: equal numbers of CO and H₂ molecules.'),
      n: 'In the first stage of the Bosch process, steam passes over red hot coke. The carbon takes oxygen from the steam. The products are carbon monoxide and hydrogen, which together are called water gas.',
    }),
    sl('concept', 'Stage two: more hydrogen from the carbon monoxide', {
      b: 'Water gas is mixed with more steam and passed over **iron(III) oxide** with **chromium(III) oxide** at about **450 °C**.',
      v: chem(r`CO + H2O <=>[catalyst] CO2 + H2`, 'Carbon monoxide and steam give carbon dioxide and more hydrogen', 'Iron(III) oxide is the catalyst; chromium(III) oxide is the promoter.'),
      n: 'In the second stage, water gas is mixed with more steam and passed over iron three oxide, with chromium three oxide as a promoter, at about four hundred and fifty degrees Celsius. The carbon monoxide turns into carbon dioxide and gives still more hydrogen.',
    }),
    sl('check', 'Quick check: Bosch conditions', {
      b: 'Match the catalyst and temperature.',
      v: flow('LR', [['a', 'Water gas + steam'], ['b', 'Catalyst, about 450 °C'], ['c', 'Hydrogen + CO₂']], [['a', 'b'], ['b', 'c']], 'Flow: water gas and steam over a catalyst give hydrogen and carbon dioxide'),
      chk: 'chk-bosch',
      n: 'In the second stage of the Bosch process, which substance acts as the catalyst, and what is formed from carbon monoxide?',
    }),
    sl('example', 'Worked example 2: counting hydrogen', {
      b: `**Problem.** ${C_ATOMS} carbon atoms react with steam (stage one), and all the carbon monoxide then reacts in stage two. Count the hydrogen molecules.

**Step 1.** One C gives one CO and one H₂, so water gas has ${CO_WATERGAS} CO and ${H2_WATERGAS} H₂.

**Step 2.** Each CO gives one more H₂ and one CO₂, so ${CO_WATERGAS} more H₂ and ${CO2_AFTER_SHIFT} CO₂.

**Step 3.** Total H₂ = ${H2_WATERGAS} + ${CO_WATERGAS} = **${H2_AFTER_SHIFT}**.`,
      v: table(['Stage', 'H₂', 'CO', 'CO₂'], [['After stage one', String(H2_WATERGAS), String(CO_WATERGAS), '0'], ['After stage two', String(H2_AFTER_SHIFT), '0', String(CO2_AFTER_SHIFT)]], 'Table of the numbers of hydrogen, carbon monoxide and carbon dioxide molecules after each stage'),
      n: 'Thirty carbon atoms give thirty carbon monoxide and thirty hydrogen molecules in stage one. In stage two each carbon monoxide gives one more hydrogen and one carbon dioxide. So the total is sixty hydrogen molecules and thirty carbon dioxide molecules.',
    }),
    sl('concept', 'Removing carbon dioxide and carbon monoxide', {
      b: 'The product is mainly hydrogen with **carbon dioxide** and a little **carbon monoxide**.',
      v: flow('TB', [['m', 'Hydrogen + carbon dioxide + a little carbon monoxide'], ['a', 'Water under pressure or potassium hydroxide solution removes carbon dioxide'], ['b', 'Ammoniacal cuprous chloride removes carbon monoxide'], ['h', 'Nearly pure hydrogen']], [['m', 'a'], ['a', 'b'], ['b', 'h']], 'Flow: the gas mixture goes through washing steps that remove carbon dioxide, then carbon monoxide, leaving hydrogen'),
      n: 'Carbon dioxide dissolves in water under pressure, so washing with water under pressure removes most of it. Potassium hydroxide solution can also absorb carbon dioxide. The last traces of carbon monoxide are taken out by ammoniacal cuprous chloride. What is left is nearly pure hydrogen.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Laboratory: zinc granules + dilute acid; collected by downward displacement of water.',
        'Impurities are removed with alkali solution and a drying agent; keep flames away and reject the first jar.',
        'Bosch process: C + H₂O → CO + H₂ (red-hot coke); then CO + H₂O → CO₂ + H₂ over Fe₂O₃ and Cr₂O₃ at about 450 °C.',
        'CO₂ is removed by water under pressure or KOH solution; CO by ammoniacal cuprous chloride.',
      ],
      v: table(['Method', 'Raw materials', 'Key condition'], [['Laboratory', 'Zinc + dilute acid', 'Room temperature'], ['Bosch, stage one', 'Coke + steam', 'Red hot'], ['Bosch, stage two', 'Water gas + steam', 'Catalyst, about 450 °C']], 'Summary table of the laboratory and industrial methods'),
      n: 'To sum up Part 2. In the laboratory, zinc and dilute acid give hydrogen, collected over water. In industry, the Bosch process turns coke and steam into water gas and then into more hydrogen. Carbon dioxide and carbon monoxide are removed by washing.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Label the thistle funnel dipping below the acid, the delivery tube and the jar over water.',
        'Give the reason for each precaution, not just the precaution.',
        'In the Bosch process write both equations and name the catalyst and promoter.',
        'Remember that CO₂ and CO are removed by different methods.',
      ],
      v: table(['Slip', 'Fix'], [['Drawing the thistle funnel above the acid', 'Its lower end must dip below the acid'], ['Naming iron as the catalyst', 'Iron(III) oxide, with chromium(III) oxide as the promoter'], ['Removing CO with potassium hydroxide', 'Ammoniacal cuprous chloride removes CO']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Exam tips. In your diagram, show the thistle funnel dipping below the acid. Give a reason with each precaution. In the Bosch process, write both equations and name the catalyst. And do not mix up the methods for removing carbon dioxide and carbon monoxide.',
    }),
  ],
});
