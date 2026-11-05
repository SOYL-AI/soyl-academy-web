// ICSE 9 Chemistry ch01 Symbols, Valency, Radicals and Formulae — Part 1 (t01–t03: symbols, valency, radicals),
// Part 2 (t04–t05: writing formulae and names, and radicals in the atmosphere).
import { sl, deck, table, flow, chem, svgV, r } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { SHELLS, CRISS } from './svgs.mjs';
import { formula, VAL, arrangement, NEG } from './calc.mjs';

export const V = {
  shells: svgV(SHELLS, 'Electron shells of sodium, magnesium, nitrogen and chlorine, with their valencies'),
  criss: svgV(CRISS, 'The criss-cross rule applied to aluminium sulphate and magnesium chloride'),
};

const al = formula('Al', 'SO4');
const ca = formula('Ca', 'PO4');
const nh = formula('NH4', 'PO4');

export const deck1 = deck({
  part: 1,
  title: 'Symbols, Valency, Radicals and Formulae — Part 1: Symbols, valency and radicals',
  goals: [
    'Write the symbols of common elements, including those taken from Latin names, and say what a symbol stands for',
    'Deduce the valency of an element from its hydride or from its valence electrons',
    'Name common acid and basic radicals, state their valencies and tell simple radicals from compound radicals',
  ],
  slides: [
    sl('title', 'The shorthand of chemistry', {
      b: 'Part 1 — every element has a symbol, every symbol has a combining power, and groups of atoms can behave like one unit.',
      v: flow('LR', [['s', 'Symbol'], ['v', 'Valency'], ['r', 'Radical'], ['f', 'Formula']], [['s', 'v'], ['v', 'r'], ['r', 'f']], 'Flow: symbol, valency, radical, formula'),
      n: 'Chemists around the world write the same short signs for elements and compounds. In this lesson we build that language step by step. First the symbol, then the combining power called valency, and then radicals, which are the building blocks of compounds.',
    }),
    sl('concept', 'Symbols: a short sign for an element', {
      b: 'A **symbol** is a letter or a pair of letters that stands for an element. The first letter is a capital and the second, if any, is small.',
      v: table(['Element', 'Symbol', 'Element', 'Symbol'], [['Hydrogen', 'H', 'Carbon', 'C'], ['Oxygen', 'O', 'Nitrogen', 'N'], ['Sulphur', 'S', 'Chlorine', 'Cl'], ['Calcium', 'Ca', 'Magnesium', 'Mg'], ['Aluminium', 'Al', 'Zinc', 'Zn']], 'Table of ten common elements and their symbols'),
      n: 'A symbol is a short sign for an element. It is one capital letter, or a capital followed by a small letter. Hydrogen is H, oxygen is O, chlorine is a capital C followed by a small l, and so on. A capital second letter would be wrong, so be careful.',
    }),
    sl('concept', 'Symbols taken from Latin names', {
      b: 'Some symbols come from the **Latin** name of the element, not the English one.',
      v: table(['Element', 'Latin name', 'Symbol'], [['Sodium', 'Natrium', 'Na'], ['Potassium', 'Kalium', 'K'], ['Iron', 'Ferrum', 'Fe'], ['Copper', 'Cuprum', 'Cu'], ['Silver', 'Argentum', 'Ag'], ['Gold', 'Aurum', 'Au'], ['Lead', 'Plumbum', 'Pb'], ['Mercury', 'Hydrargyrum', 'Hg']], 'Table of eight elements whose symbols come from Latin names'),
      n: 'Many old elements were named in Latin, and their symbols still follow that name. Sodium is Na from natrium. Iron is Fe from ferrum. Silver is Ag from argentum, and gold is Au from aurum. The English name will not help you guess these, so learn the list.',
    }),
    sl('concept', 'What a symbol tells us', {
      b: '**Qualitatively** a symbol names the element. **Quantitatively** it stands for **one atom** of the element, with its relative atomic mass.',
      v: table(['Symbol', 'Qualitative meaning', 'Quantitative meaning'], [['C', 'The element carbon', 'One atom of carbon, mass 12 u'], ['Mg', 'The element magnesium', 'One atom of magnesium, mass 24 u'], ['S', 'The element sulphur', 'One atom of sulphur, mass 32 u']], 'Table giving the qualitative and quantitative meaning of three symbols'),
      n: 'A symbol carries two messages. It names the element, and it stands for exactly one atom of that element, with a fixed relative mass. The symbol for magnesium means the element magnesium, and also a single atom of magnesium.',
    }),
    sl('check', 'Quick check: symbols', {
      b: 'Match the symbol to the element.',
      v: table(['Symbol', 'Latin source'], [['K', 'Kalium'], ['Ag', 'Argentum'], ['Pb', 'Plumbum']], 'Three symbols with the Latin names they come from'),
      chk: 'chk-symbol',
      n: 'Which symbol belongs to which element? Use the Latin names to help you.',
    }),
    sl('concept', 'Valency: the combining power of an atom', {
      b: '**Valency** is the number of hydrogen atoms (or atoms that can replace them) that one atom of an element **combines with**. Hydrogen itself has valency 1.',
      v: table(['Hydride', 'Atoms of hydrogen', 'Valency of the other element'], [['HCl', '1', `Chlorine ${VAL.Cl}`], ['H₂O', '2', `Oxygen ${VAL.O}`], ['NH₃', '3', `Nitrogen ${VAL.N}`], ['CH₄', '4', `Carbon ${VAL.C}`]], 'Table of four hydrides and the valency of the element in each'),
      n: 'Valency tells us how many hydrogen atoms one atom can hold on to. Chlorine takes one, oxygen takes two, nitrogen takes three and carbon takes four. So their valencies are one, two, three and four.',
    }),
    sl('diagram', 'Valency from the outer shell', {
      b: 'Look at the **red** electrons in the outer shell. They decide the valency.',
      v: V.shells,
      n: 'Sodium has one electron in its outer shell and valency one. Magnesium has two outer electrons and valency two. Nitrogen has five outer electrons, so it gains three to fill the shell, and its valency is three. Chlorine has seven, needs one more, and has valency one.',
    }),
    sl('concept', 'The valence-electron rule', {
      b: '**Valence electrons** are the electrons in the outermost shell.\n\n- **Metals** lose their valence electrons: valency = number of valence electrons (1, 2 or 3).\n- **Non-metals** gain electrons to reach eight: valency = **8 minus** the number of valence electrons.',
      v: table(['Valence electrons', '1', '2', '3', '4', '5', '6', '7', '8'], [['Valency', '1', '2', '3', '4', '3', '2', '1', '0']], 'Table linking the number of valence electrons to valency from one to eight'),
      n: 'If an atom has one, two or three valence electrons, that number is its valency. With four valence electrons the valency is also four. With five, six or seven, subtract from eight. A full shell of eight electrons means valency zero, as in the noble gases.',
    }),
    sl('example', 'Worked example 1: valency from the electron arrangement', {
      b: r`**Problem.** The electron arrangements of phosphorus and sulphur are ${arrangement('P')} and ${arrangement('S')}. Find the valency of each and classify it.

**Step 1.** Outer shell of phosphorus has 5 electrons. Atom needs 3 more, so valency $= 8 - 5 = ${VAL.P}$, a **trivalent** non-metal.

**Step 2.** Outer shell of sulphur has 6 electrons. Valency $= 8 - 6 = ${VAL.S}$, a **divalent** non-metal.`,
      v: table(['Element', 'Arrangement', 'Valence electrons', 'Valency'], [['Phosphorus', arrangement('P'), '5', `8 − 5 = ${VAL.P}`], ['Sulphur', arrangement('S'), '6', `8 − 6 = ${VAL.S}`]], 'Table working out the valencies of phosphorus and sulphur'),
      n: 'Phosphorus has five electrons in its outer shell. It is a non-metal, so we subtract from eight, and the valency is three. Sulphur has six, and eight minus six gives a valency of two. Phosphorus is trivalent and sulphur is divalent.',
    }),
    sl('check', 'Quick check: valency', {
      b: 'Use the rule on an aluminium atom.',
      v: table(['Element', 'Electron arrangement'], [['Aluminium', arrangement('Al')]], 'Electron arrangement of aluminium'),
      chk: 'chk-valency',
      n: 'Aluminium has three electrons in its outer shell. Is it a metal or a non-metal, and what is its valency?',
    }),
    sl('concept', 'Mono-, di-, tri- and tetravalent', {
      b: 'Elements are grouped by valency. Some metals show **variable valency**, shown in the name by a Roman number, as in iron(II) and iron(III).',
      v: table(['Class', 'Valency', 'Examples'], [['Monovalent', '1', 'Sodium, potassium, chlorine'], ['Divalent', '2', 'Magnesium, calcium, oxygen'], ['Trivalent', '3', 'Aluminium, nitrogen, phosphorus'], ['Tetravalent', '4', 'Carbon, silicon']], 'Table of monovalent, divalent, trivalent and tetravalent elements with examples'),
      n: 'An element is monovalent if its valency is one, divalent for two, trivalent for three and tetravalent for four. A few metals, such as iron and copper, can show more than one valency, so their names carry a number to say which one is meant.',
    }),
    sl('concept', 'Radicals: atoms that travel together', {
      b: 'A **radical** is an atom or a group of atoms that carries a charge and behaves as one unit in a reaction. A **simple radical** is one atom. A **compound radical** is a group of atoms.',
      v: table(['Kind', 'Positive (basic) radical', 'Negative (acid) radical'], [['Simple', 'Na⁺, Mg²⁺, Al³⁺', 'Cl⁻, O²⁻, N³⁻'], ['Compound', 'NH₄⁺ (ammonium)', 'SO₄²⁻, NO₃⁻, OH⁻, CO₃²⁻']], 'Table of simple and compound radicals, positive and negative'),
      n: 'A radical is an atom or a group of atoms with a charge. A simple radical is a single atom, such as the sodium ion or the chloride ion. A compound radical is a group, such as sulphate or ammonium, and the whole group moves as one unit.',
    }),
    sl('concept', 'Common positive (basic) radicals', {
      v: table(['Valency 1', 'Valency 2', 'Valency 3'], [['Sodium Na⁺', 'Magnesium Mg²⁺', 'Aluminium Al³⁺'], ['Potassium K⁺', 'Calcium Ca²⁺', 'Iron(III) Fe³⁺'], ['Silver Ag⁺', 'Zinc Zn²⁺', ''], ['Ammonium NH₄⁺', 'Copper(II) Cu²⁺', ''], ['', 'Iron(II) Fe²⁺', '']], 'Table of common positive radicals grouped by valency'),
      n: 'Learn the positive radicals by their valency. Sodium, potassium, silver and ammonium carry one positive charge. Magnesium, calcium, zinc, copper and the lower form of iron carry two. Aluminium and iron three carry three.',
    }),
    sl('concept', 'Common negative (acid) radicals', {
      v: table(['Valency 1', 'Valency 2', 'Valency 3'], [['Chloride Cl⁻', 'Oxide O²⁻', 'Nitride N³⁻'], ['Nitrate NO₃⁻', 'Sulphide S²⁻', 'Phosphate PO₄³⁻'], ['Hydroxide OH⁻', 'Sulphate SO₄²⁻', ''], ['Hydrogencarbonate HCO₃⁻', 'Carbonate CO₃²⁻', ''], ['', 'Sulphite SO₃²⁻', '']], 'Table of common negative radicals grouped by valency'),
      n: 'The negative radicals are grouped the same way. Chloride, nitrate, hydroxide and hydrogencarbonate each carry one negative charge. Oxide, sulphide, sulphate, carbonate and sulphite carry two. Nitride and phosphate carry three.',
    }),
    sl('example', 'Worked example 2: valency of an acid radical', {
      b: r`**Problem.** Phosphoric acid is $\ce{H3PO4}$. Find the valency of the phosphate radical and write its charge.

**Step 1.** In water the acid gives hydrogen ions: $\ce{H3PO4 -> 3H+ + PO4^3-}$.

**Step 2.** Three hydrogen ions are released, so the radical must carry three negative charges. Valency of phosphate $= ${NEG.PO4.c}$.`,
      v: chem('H3PO4 -> 3H+ + PO4^3-', 'Phosphoric acid giving three hydrogen ions and a phosphate radical', 'Hydrogen lost = valency of the acid radical.'),
      n: 'The valency of an acid radical equals the number of hydrogen atoms the acid loses. Phosphoric acid loses three hydrogen ions, so phosphate is a trivalent negative radical.',
    }),
    sl('check', 'Quick check: radicals', {
      b: 'Decide whether each radical is simple or compound.',
      v: table(['Radical', 'Charge'], [['Nitrate', '1−'], ['Oxide', '2−'], ['Ammonium', '1+']], 'Three radicals with their charges'),
      chk: 'chk-radical',
      n: 'Which of these radicals is a compound radical, made of more than one atom?',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'A symbol names an element and stands for one atom of it; some symbols come from Latin names.',
        'Valency is the combining power; hydrogen has valency 1.',
        'Metals: valency = valence electrons. Non-metals: valency = 8 minus valence electrons.',
        'A radical is a charged atom or group of atoms; compound radicals move as one unit.',
        'Valency of an acid radical = hydrogen atoms the acid loses.',
      ],
      v: table(['Idea', 'Rule'], [['Valency, metals', 'Equals valence electrons'], ['Valency, non-metals', '8 − valence electrons'], ['Compound radical', 'Group of atoms with a charge']], 'Summary table of valency rules and radicals'),
      n: 'To sum up. A symbol is the sign of one atom of an element. Valency comes from the outer electrons, with metals using the number as it is and non-metals subtracting from eight. A radical is a charged atom or group, and compound radicals stay together in reactions.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Write symbols with a capital first letter: Co is cobalt, CO is a compound.',
        'Learn the Latin symbols: Na, K, Fe, Cu, Ag, Au, Pb, Hg.',
        'For non-metals use 8 minus the outer electrons.',
        'Give the charge with the radical, not just the name.',
      ],
      v: table(['Slip', 'Fix'], [['Writing CL or cl for chlorine', 'Cl'], ['Valency of nitrogen taken as 5', '8 − 5 = 3'], ['Calling OH a simple radical', 'It is a compound radical']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'A few exam tips. Always use one capital and one small letter. Learn the Latin symbols. For non-metals, subtract the outer electrons from eight. And remember that hydroxide, sulphate, nitrate and ammonium are compound radicals.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Symbols, Valency, Radicals and Formulae — Part 2: Formulae, names and radicals in the atmosphere',
  goals: [
    'Write the formula of a compound by exchanging the valencies of its radicals',
    'Name a compound from its formula',
    'Explain how reactive radicals in polluted air harm living things and how to reduce them',
  ],
  slides: [
    sl('title', 'From valency to formula', {
      b: 'Part 2 — a formula shows which radicals are in a compound and in what numbers. The valencies tell us how to write it.',
      v: flow('LR', [['p', 'Positive radical'], ['n', 'Negative radical'], ['x', 'Exchange valencies'], ['f', 'Formula']], [['p', 'x'], ['n', 'x'], ['x', 'f']], 'Flow: positive radical and negative radical, exchange valencies, formula'),
      n: 'Every compound is electrically neutral. The positive charge of its radicals must cancel the negative charge. This simple idea lets us write the formula of any compound, once we know the valencies of its parts.',
    }),
    sl('diagram', 'The criss-cross method', {
      b: 'The valency of one radical becomes the **subscript** of the other. Divide by a common factor if there is one, and leave out a subscript of 1.',
      v: V.criss,
      n: 'Write the two radicals side by side with their valencies. Cross the valencies over so each becomes the small number of the other radical. Aluminium three and sulphate two give aluminium two, sulphate three. Magnesium two and chlorine one give one magnesium and two chlorine.',
    }),
    sl('concept', 'Steps for writing a formula', {
      v: flow('TB', [['a', 'Write the symbols or radicals, positive first'], ['b', 'Write the valency of each above it'], ['c', 'Cross the valencies over as subscripts'], ['d', 'Divide by a common factor; drop a 1'], ['e', 'Put a compound radical in brackets if its subscript is more than 1']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Five steps for writing a formula from valencies'),
      n: 'Five steps. Write the radicals with the positive one first. Note each valency. Cross them over. Cancel any common factor and drop a subscript of one. Finally, if a compound radical needs a subscript, put brackets around it.',
    }),
    sl('example', 'Worked example 1: aluminium sulphate', {
      b: r`**Problem.** Write the formula of aluminium sulphate.

**Step 1.** Aluminium $\ce{Al^3+}$ has valency ${al.raw[1]}; sulphate $\ce{SO4^2-}$ has valency ${al.raw[0]}.

**Step 2.** Cross over: Al gets ${al.np}, $\ce{SO4}$ gets ${al.nn}. No common factor.

**Step 3.** The sulphate is a compound radical with a subscript above 1, so it goes in brackets: **${al.f}**.`,
      v: table(['Radical', 'Valency', 'Subscript after crossing'], [['Aluminium, Al', '3', `${al.np}`], ['Sulphate, SO₄', '2', `${al.nn}`]], 'Table showing the criss-cross for aluminium sulphate'),
      n: 'Aluminium has valency three and sulphate has valency two. Cross them over. Aluminium gets a two and sulphate gets a three. Sulphate is a group, so the three needs brackets. The formula has two aluminium atoms and three sulphate groups.',
    }),
    sl('check', 'Quick check: a formula', {
      b: 'Apply the method to calcium and phosphate.',
      v: table(['Radical', 'Charge'], [['Calcium', '2+'], ['Phosphate', '3−']], 'Charges of calcium and phosphate'),
      chk: 'chk-formula',
      n: 'Calcium has valency two and phosphate has valency three. What is the formula of calcium phosphate?',
    }),
    sl('concept', 'Common factor and brackets', {
      b: 'Divide the subscripts by their **common factor** and put a **compound radical** in brackets only when it appears more than once.',
      v: table(['Compound', 'Valencies', 'Crossed', 'Formula'], [['Calcium carbonate', '2 and 2', 'Ca₂(CO₃)₂', 'CaCO₃ (divide by 2)'], ['Magnesium hydroxide', '2 and 1', 'Mg₁(OH)₂', 'Mg(OH)₂'], ['Sodium sulphate', '1 and 2', 'Na₂(SO₄)₁', 'Na₂SO₄']], 'Table showing common factors and brackets in three formulae'),
      n: 'When both valencies are the same, the crossed numbers share a factor, so divide. Calcium carbonate becomes one calcium and one carbonate. A bracket is needed only when a group appears more than once, as in magnesium hydroxide. Sodium sulphate needs no bracket.',
    }),
    sl('example', 'Worked example 2: ammonium phosphate', {
      b: r`**Problem.** Write the formula of ammonium phosphate and count its atoms.

**Step 1.** Ammonium $\ce{NH4+}$ has valency 1; phosphate $\ce{PO4^3-}$ has valency 3.

**Step 2.** Cross over: $\ce{NH4}$ gets ${nh.np}, $\ce{PO4}$ gets ${nh.nn}; bracket the ammonium: **${nh.f}**.

**Step 3.** Atoms: N 3, H 12, P 1, O 4, total 20.`,
      v: table(['Part', 'Atoms'], [['3 × NH₄', '3 N and 12 H'], ['1 × PO₄', '1 P and 4 O'], ['Total', '20 atoms']], 'Table counting the atoms in ammonium phosphate'),
      n: 'Ammonium has valency one and phosphate has valency three. After crossing, ammonium gets a three and phosphate gets a one, which is not written. Ammonium is a group, so it goes in brackets. Counting gives three nitrogen, twelve hydrogen, one phosphorus and four oxygen.',
    }),
    sl('check', 'Quick check: another formula', {
      b: 'Think about which radical needs brackets.',
      v: table(['Radical', 'Charge'], [['Iron(III)', '3+'], ['Hydroxide', '1−']], 'Charges of iron three and hydroxide'),
      chk: 'chk-bracket',
      n: 'Iron three has a charge of three plus and hydroxide has one minus. Which formula is correct?',
    }),
    sl('concept', 'Naming a compound from its formula', {
      b: 'Name the **positive** part first, then the **negative** part. A single non-metal ends in **-ide**; a group with oxygen keeps **-ate** or **-ite**. Show a variable valency in brackets.',
      v: table(['Formula', 'Name'], [['MgCl₂', 'Magnesium chloride'], ['Na₂S', 'Sodium sulphide'], ['K₂CO₃', 'Potassium carbonate'], ['Na₂SO₃', 'Sodium sulphite'], ['FeCl₂', 'Iron(II) chloride'], ['Fe₂(SO₄)₃', 'Iron(III) sulphate']], 'Table of six formulae and their names'),
      n: 'To name a compound, say the metal first and then the negative part. One non-metal ends in ide, like chloride and sulphide. A group with oxygen keeps its name, such as carbonate or sulphite. If a metal has two valencies, the number goes in brackets.',
    }),
    sl('example', 'Worked example 3: name from a formula', {
      b: r`**Problem.** Name $\ce{Fe2O3}$ and $\ce{Zn(NO3)2}$.

**Step 1.** In $\ce{Fe2O3}$, two Fe and three O: three O carry $3 \times 2 = 6$ negative charges, shared by two Fe, so each Fe is $6 \div 2 = 3$: iron(III) oxide.

**Step 2.** In $\ce{Zn(NO3)2}$ the radicals are zinc and nitrate: **zinc nitrate**.`,
      v: table(['Formula', 'Parts', 'Name'], [['Fe₂O₃', 'Fe³⁺ and O²⁻', 'Iron(III) oxide'], ['Zn(NO₃)₂', 'Zn²⁺ and NO₃⁻', 'Zinc nitrate']], 'Table showing the parts and names of two compounds'),
      n: 'In the first compound there are two iron atoms and three oxygen atoms. Oxygen has valency two, so three oxygen atoms carry a total of six. That is shared between two iron atoms, three each, so it is iron three oxide. The second is zinc nitrate.',
    }),
    sl('check', 'Quick check: naming', {
      b: 'Name the compound.',
      v: table(['Formula'], [['(NH₄)₂SO₄']], 'The formula of a compound to be named'),
      chk: 'chk-name',
      n: 'This compound has two ammonium groups and one sulphate. What is its name?',
    }),
    sl('concept', 'Radicals in the atmosphere', {
      b: 'In sunlit, polluted air some molecules split into pieces with an **unpaired electron**. These **free radicals** are very reactive, and they are different from the charged radicals used in formulae.',
      v: flow('LR', [['a', 'Sunlight or heat acts on air pollutants'], ['b', 'A bond breaks'], ['c', 'Free radicals form'], ['d', 'They react at once with other molecules']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow showing how free radicals form in polluted air'),
      n: 'Do not confuse these with the radicals of formulae. A free radical is a very reactive piece of a molecule with a lone electron. In polluted air, sunlight and heat break bonds in pollutants, and these pieces appear. They rush to react with whatever is near.',
    }),
    sl('concept', 'Harm done and ways to reduce it', {
      v: table(['Effect on living things', 'Way to reduce radicals'], [['Irritate the eyes, nose and lungs', 'Reduce smoke and fumes from vehicles and factories'], ['Damage body cells and tissues', 'Fit catalytic converters in vehicles'], ['Help form smog and harm plants', 'Stop burning waste and use clean fuels'], ['Weaken the body defences against such radicals', 'Plant more trees; stop CFC use']], 'Table of the effects of radicals on living things and ways to reduce them'),
      n: 'These radicals irritate the eyes and lungs, damage body cells, and help form smog that harms plants. We can cut down their formation by reducing smoke and fumes, fitting catalytic converters, burning less waste, planting trees and stopping the use of harmful chemicals such as chlorofluorocarbons.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Formula by criss-cross: valency of one radical becomes the subscript of the other.',
        'Divide by the common factor, omit a subscript of 1, bracket a compound radical used more than once.',
        'Name the positive part first; a single non-metal ends in -ide.',
        'Reactive free radicals in polluted air harm cells and lungs; reduce emissions to reduce them.',
      ],
      v: table(['Compound', 'Formula'], [['Aluminium sulphate', 'Al₂(SO₄)₃'], ['Calcium phosphate', 'Ca₃(PO₄)₂'], ['Magnesium hydroxide', 'Mg(OH)₂']], 'Summary table of three formulae written by the criss-cross method'),
      n: 'To sum up Part 2. Cross the valencies to write a formula, cancel any common factor, drop a one, and use brackets for a group that repeats. Name the positive part first. And remember that free radicals in polluted air are reactive and harmful, so we must cut the pollution that makes them.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Check the formula is neutral: total positive charge equals total negative charge.',
        'Do not change a subscript inside a radical: SO₄ stays SO₄.',
        'Bracket a compound radical only when its subscript is above 1.',
        'Keep atmospheric radicals and formula radicals apart in your answer.',
      ],
      v: table(['Slip', 'Fix'], [['Writing CaCO₃ as Ca₂(CO₃)₂', 'Divide by the common factor 2'], ['Writing MgOH₂', 'Mg(OH)₂'], ['Using the name sulphate for SO₃', 'SO₃ is sulphite']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Exam tips. Check that the charges cancel. Never alter the numbers inside a radical. Use brackets only when a group repeats. And when you write about radicals in air, say that they are free radicals with an unpaired electron.',
    }),
  ],
});
