// ICSE 10 Chemistry ch03 Acids, Bases and Salts — two decks: Part 1 (t01–t03) acids, bases and alkalis in terms of
// ions, indicators and pH, kinds of salts; Part 2 (t04–t06) action of dilute acids on carbonates, hydrogen carbonates,
// sulphites, hydrogen sulphites and sulphides, and the methods of preparing normal salts (method and equations only).
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { PH_SCALE } from './svgs.mjs';

const V = {
  ph: svgV(PH_SCALE, 'A pH scale from 0 to 14 with acidic, neutral and alkaline regions and example values'),
};

export const deck1 = deck({
  part: 1,
  title: 'Acids, Bases and Salts — Part 1: Ions, indicators and kinds of salts',
  goals: [
    'Define acids and alkalis in terms of the ions they give in water',
    'Write ionisation and dissociation equations',
    'Use indicators and the pH scale to classify solutions',
    'Classify salts as normal, acid, basic or complex',
  ],
  slides: [
    sl('title', 'Sour, bitter and in between', {
      b: 'Part 1 — what makes a solution acidic or alkaline, how we measure it, and the many kinds of salt formed when acids react.',
      v: table(['Substance', 'Nature'], [['Hydrochloric acid in the stomach', 'Strong acid'], ['Vinegar (ethanoic acid)', 'Weak acid'], ['Lime water (calcium hydroxide)', 'Weak alkali'], ['Caustic soda (sodium hydroxide)', 'Strong alkali'], ['Common salt (sodium chloride)', 'Neutral salt']], 'Table of five everyday substances and whether each is an acid, an alkali or a salt'),
      n: 'Namaste! Acids, alkalis and salts are everywhere, from the hydrochloric acid in your stomach to the caustic soda in drain cleaner and the salt on your table. In this part we define acids and alkalis by the ions they produce in water, learn to measure how acidic a solution is, and sort salts into four kinds.',
    }),
    sl('concept', 'Acids: hydronium ions in water', {
      b: 'An **acid** is a compound which, when dissolved in water, gives **hydronium ions (H₃O⁺) as the only positive ions**. The acid molecule **ionises**: it gives H⁺, which joins a water molecule. **Monobasic** acids give one H⁺ per molecule (HCl, HNO₃); **dibasic** acids give two (H₂SO₄, in two steps). Strong acids (HCl, HNO₃, H₂SO₄) ionise almost completely; weak acids (ethanoic acid, carbonic acid) only partly.',
      m: [r`\ce{HCl + H2O -> H3O+ + Cl-}`, r`\ce{HNO3 + H2O -> H3O+ + NO3-}`, r`\ce{H2SO4 + H2O -> H3O+ + HSO4-}`, r`\ce{HSO4- + H2O -> H3O+ + SO4^2-}`],
      v: table(['Acid', 'Basicity', 'Ions formed in water'], [['Hydrochloric acid, HCl', 'Monobasic', 'H₃O⁺, Cl⁻'], ['Nitric acid, HNO₃', 'Monobasic', 'H₃O⁺, NO₃⁻'], ['Sulphuric acid, H₂SO₄', 'Dibasic', 'H₃O⁺, HSO₄⁻, SO₄²⁻']], 'Table of three mineral acids with their basicity and the ions formed in water'),
      n: 'An acid dissolved in water produces hydronium ions, and these are the only positive ions it gives. Hydrochloric and nitric acids each give one hydrogen ion per molecule, so they are monobasic. Sulphuric acid gives two, in two steps, so it is dibasic. Strong acids ionise almost completely, while weak acids like vinegar ionise only a little.',
    }),
    sl('concept', 'Bases and alkalis: hydroxide ions', {
      b: 'A **base** is a compound that reacts with an acid to give a salt and water only (metal oxides and hydroxides: CuO, MgO, NaOH). An **alkali** is a base that is **soluble in water** and gives **hydroxide ions (OH⁻) as the only negative ions**. Alkalis **dissociate** (their ions already exist in the solid). **All alkalis are bases, but not all bases are alkalis.**',
      m: [r`\ce{NaOH -> Na+ + OH-}`, r`\ce{KOH -> K+ + OH-}`, r`\ce{Ca(OH)2 -> Ca^2+ + 2OH-}`],
      v: table(['Base', 'Soluble in water?', 'Alkali?'], [['Sodium hydroxide', 'Yes', 'Yes (strong)'], ['Potassium hydroxide', 'Yes', 'Yes (strong)'], ['Ammonium hydroxide', 'Yes', 'Yes (weak)'], ['Copper(II) oxide', 'No', 'No'], ['Iron(III) hydroxide', 'No', 'No']], 'Table of five bases showing which are soluble alkalis'),
      n: 'A base reacts with an acid to give only a salt and water. Copper oxide and magnesium oxide are bases, but they do not dissolve in water. A base that does dissolve is called an alkali, and in water it gives hydroxide ions as the only negative ions. Sodium hydroxide and potassium hydroxide are strong alkalis; ammonium hydroxide is a weak one. So every alkali is a base, but not every base is an alkali.',
    }),
    sl('example', 'Worked example: ionise or dissociate?', {
      b: '**Problem.** Write equations to show what happens when (a) nitric acid and (b) potassium hydroxide dissolve in water, and say which process is ionisation and which is dissociation.\n\n**(a)** HNO₃ + H₂O → H₃O⁺ + NO₃⁻ — **ionisation**: the covalent acid molecule forms ions only on reacting with water.\n\n**(b)** KOH → K⁺ + OH⁻ — **dissociation**: the ions already present in the solid separate.',
      v: table(['Substance', 'Bonding in pure form', 'Process in water'], [['HNO₃', 'Covalent molecules', 'Ionisation'], ['KOH', 'Ionic lattice', 'Dissociation']], 'Table comparing ionisation of nitric acid and dissociation of potassium hydroxide'),
      n: 'Nitric acid is made of covalent molecules, so ions appear only when the molecules react with water. That is called ionisation. Potassium hydroxide is already made of ions, held in a lattice, and water simply separates them. That is called dissociation. Both solutions end up full of ions and conduct electricity.',
    }),
    sl('check', 'Quick check: acids and alkalis', {
      b: 'Decide which substance fits the ionic definition of an acid or an alkali.',
      n: 'Quick check. An acid gives hydronium ions as the only positive ions; an alkali gives hydroxide ions as the only negative ions.',
      chk: 'define-mcq',
    }),
    sl('concept', 'Indicators', {
      b: 'An **indicator** changes colour depending on whether the solution is acidic or alkaline.',
      v: table(['Indicator', 'In acid', 'In neutral solution', 'In alkali'], [['Litmus', 'Red', 'Purple', 'Blue'], ['Methyl orange', 'Pink (red)', 'Orange', 'Yellow'], ['Phenolphthalein', 'Colourless', 'Colourless', 'Pink']], 'Table of the colours of litmus, methyl orange and phenolphthalein in acidic, neutral and alkaline solutions'),
      n: 'Indicators are dyes whose colour depends on acidity. Litmus is red in acid and blue in alkali. Methyl orange is pink in acid, orange in neutral solution and yellow in alkali. Phenolphthalein stays colourless in acid and neutral solutions and turns pink only in alkali. Learn this table well, because examiners ask for these colours often.',
    }),
    sl('diagram', 'The pH scale and universal indicator', {
      b: '**pH** measures how acidic or alkaline a solution is, on a scale from **0 to 14**. pH **7** is **neutral**; **below 7 acidic** (lower = more strongly acidic, more H₃O⁺); **above 7 alkaline** (higher = more strongly alkaline, more OH⁻). **pH paper** or **universal indicator**, a mixture of indicators, shows a different colour for each pH: red (strongly acidic) through orange, yellow, green (neutral), blue to violet (strongly alkaline).',
      v: V.ph,
      n: 'The pH scale runs from nought to fourteen. Seven is neutral, like pure water. Values below seven are acidic, and the lower the number, the more hydronium ions and the stronger the acid. Values above seven are alkaline. Universal indicator, a mixture of several indicators, gives a different colour for each pH, from red for strong acids, through green for neutral, to violet for strong alkalis.',
    }),
    sl('example', 'Worked example: reading pH values', {
      b: '**Problem.** Solutions P, Q, R and S have pH values 1, 5, 7 and 12. (a) Which is weakly acidic? (b) Which turns phenolphthalein pink? (c) Which could be a solution of a salt of a strong acid and a strong alkali? (d) What colour does methyl orange show in P?\n\n**(a)** Q (pH 5). **(b)** S (pH 12, alkaline). **(c)** R (pH 7, neutral). **(d)** Pink.',
      v: table(['Solution', 'pH', 'Nature'], [['P', '1', 'Strongly acidic'], ['Q', '5', 'Weakly acidic'], ['R', '7', 'Neutral'], ['S', '12', 'Strongly alkaline']], 'Table classifying four solutions by pH'),
      n: 'Place each value on the scale. One is strongly acidic, five is weakly acidic, seven is neutral and twelve is strongly alkaline. Only the alkaline solution turns phenolphthalein pink. A neutral solution could contain a salt such as sodium chloride, made from a strong acid and a strong alkali. Methyl orange turns pink in the strongly acidic solution.',
    }),
    sl('check', 'Quick check: indicators and pH', {
      b: 'Predict an indicator colour or a pH range.',
      n: 'Quick check. Methyl orange is pink in acid and yellow in alkali; pH seven is neutral.',
      chk: 'indicator-mcq',
    }),
    sl('concept', 'Salts and their kinds', {
      b: 'A **salt** is formed when the hydrogen ion of an acid is **replaced, partly or completely, by a metal ion** (or ammonium ion). **Normal salt:** all replaceable hydrogen replaced (Na₂SO₄, NaCl, KNO₃). **Acid salt:** only part replaced, so the salt still contains replaceable hydrogen (NaHSO₄, NaHCO₃) — formed only by acids with more than one replaceable hydrogen. **Basic salt:** formed by partial replacement of the hydroxide of a base by an acid radical (Pb(OH)Cl, Cu(OH)₂·CuCO₃). **Complex salt:** contains a complex ion that does not break up into simple ions in solution (potassium ferrocyanide, K₄Fe(CN)₆; sodium argentocyanide).',
      v: table(['Salt', 'Kind', 'Why'], [['Na₂SO₄', 'Normal', 'Both H of H₂SO₄ replaced'], ['NaHSO₄', 'Acid', 'One H of H₂SO₄ still present'], ['Pb(OH)Cl', 'Basic', 'Contains OH from the base'], ['K₄Fe(CN)₆', 'Complex', 'Fe(CN)₆⁴⁻ stays intact in water']], 'Table of four salts classified as normal, acid, basic and complex with reasons'),
      n: 'A salt forms when the hydrogen of an acid is replaced by a metal. If all of it is replaced, the salt is normal, like sodium sulphate. If only part is replaced, the salt still has some acid hydrogen and is called an acid salt, like sodium hydrogensulphate. A basic salt still carries hydroxide from the base. A complex salt contains a large ion that stays together in water.',
    }),
    sl('example', 'Worked example: normal or acid salt?', {
      b: '**Problem.** Sodium hydroxide reacts with sulphuric acid in two different mole ratios. Write both equations and classify each salt.\n\n**(1:1)** NaOH + H₂SO₄ → NaHSO₄ + H₂O — **acid salt** (one H replaced).\n\n**(2:1)** 2NaOH + H₂SO₄ → Na₂SO₄ + 2H₂O — **normal salt** (both H replaced).\n\nHydrochloric acid, being monobasic, forms only the normal salt NaCl.',
      v: flow('LR', [['a', 'H₂SO₄ (two replaceable H)'], ['b', 'NaHSO₄ (acid salt)'], ['c', 'Na₂SO₄ (normal salt)']], [['a', 'b', '1 NaOH'], ['a', 'c', '2 NaOH']], 'Flow from sulphuric acid to the acid salt with one mole of sodium hydroxide and the normal salt with two moles'),
      n: 'Sulphuric acid has two replaceable hydrogen atoms. With one mole of sodium hydroxide, only one is replaced, and the product, sodium hydrogensulphate, is an acid salt. With two moles, both are replaced and normal sodium sulphate forms. Hydrochloric acid has only one replaceable hydrogen, so it can form only a normal salt.',
    }),
    sl('check', 'Quick check: kinds of salt', {
      b: 'Classify a salt as normal, acid, basic or complex.',
      n: 'Quick check. Look for leftover hydrogen from the acid or leftover hydroxide from the base.',
      chk: 'salttype-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Acid: H₃O⁺ as the only positive ion in water (ionisation); alkali: OH⁻ as the only negative ion (dissociation).',
        'All alkalis are bases; insoluble bases (CuO, MgO) are not alkalis.',
        'Litmus red/blue; methyl orange pink/yellow; phenolphthalein colourless/pink.',
        'pH 7 neutral, below 7 acidic, above 7 alkaline; universal indicator shows the value.',
        'Salts: normal (Na₂SO₄), acid (NaHSO₄), basic (Pb(OH)Cl), complex (K₄Fe(CN)₆).',
      ],
      v: table(['Term', 'Key ion'], [['Acid', 'H₃O⁺'], ['Alkali', 'OH⁻'], ['Acid salt', 'Contains replaceable H']], 'Summary table of acids, alkalis and acid salts'),
      n: 'Let us sum up Part 1. Acids give hydronium ions in water and alkalis give hydroxide ions. Every alkali is a base, but some bases do not dissolve. Indicators and the pH scale tell us how acidic or alkaline a solution is. Salts may be normal, acid, basic or complex, depending on how much of the acid or base has been replaced.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Use the word “only” in the definitions of acid and alkali.',
        'Write the two-step ionisation of sulphuric acid when asked about its basicity.',
        'State methyl orange colours as pink (acid) and yellow (alkali).',
        'An acid salt still contains replaceable hydrogen — not just “any hydrogen”.',
      ],
      v: table(['Slip', 'Fix'], [['Phenolphthalein turns pink in acid', 'Pink only in alkali'], ['CuO is an alkali', 'It is an insoluble base'], ['HCl forms acid salts', 'Monobasic acids form only normal salts']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some tips. Include the word only in the definitions of acids and alkalis. When asked why sulphuric acid is dibasic, show its two ionisation steps. Learn the indicator colours exactly. And remember that only acids with more than one replaceable hydrogen can form acid salts.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Acids, Bases and Salts — Part 2: Acids on salts and preparing salts',
  goals: [
    'Write equations for dilute acids reacting with carbonates, hydrogen carbonates, sulphites, hydrogen sulphites and sulphides',
    'Identify the gas evolved in each case with a test',
    'Choose a method to prepare a given salt from its solubility',
    'Write equations for preparing salts by each method',
  ],
  slides: [
    sl('title', 'Fizz, smell and precipitate', {
      b: 'Part 2 — dilute acids release tell-tale gases from certain salts, and the solubility of a salt decides how we make it.',
      v: table(['Salt treated with dilute acid', 'Gas', 'Clue'], [['Carbonate / hydrogen carbonate', 'CO₂', 'Lime water turns milky'], ['Sulphite / hydrogen sulphite', 'SO₂', 'Smell of burning sulphur'], ['Sulphide', 'H₂S', 'Smell of rotten eggs']], 'Table of three classes of salt, the gas each gives with dilute acid and a clue to the gas'),
      n: 'When a dilute acid is poured on certain salts, a gas fizzes out, and the gas tells you which salt you had. Carbonates give carbon dioxide, sulphites give sulphur dioxide and sulphides give hydrogen sulphide. Later in this part we choose the best way to make a salt, depending on whether it dissolves in water.',
    }),
    sl('concept', 'Carbonates and hydrogen carbonates', {
      b: 'Dilute acids decompose carbonates and hydrogen carbonates, giving a **salt, water and carbon dioxide** with brisk effervescence. **Test for CO₂:** it turns **lime water milky** (CaCO₃ precipitate); it has no effect on acidified potassium dichromate.',
      m: [r`\ce{Na2CO3 + 2HCl -> 2NaCl + H2O + CO2}`, r`\ce{KHCO3 + HNO3 -> KNO3 + H2O + CO2}`, r`\ce{Ca(OH)2 + CO2 -> CaCO3 + H2O}`],
      v: table(['Reactants', 'Products'], [['Na₂CO₃ + dil. HCl', 'NaCl, H₂O, CO₂'], ['KHCO₃ + dil. HNO₃', 'KNO₃, H₂O, CO₂'], ['ZnCO₃ + dil. H₂SO₄', 'ZnSO₄, H₂O, CO₂']], 'Table of three carbonate and hydrogen carbonate reactions with dilute acids and their products'),
      n: 'Any carbonate or hydrogen carbonate fizzes with a dilute acid, giving a salt, water and carbon dioxide. To prove the gas is carbon dioxide, bubble it through lime water, which turns milky because white calcium carbonate forms. Carbon dioxide does not change the colour of acidified potassium dichromate, and this helps to tell it apart from sulphur dioxide.',
    }),
    sl('concept', 'Sulphites, hydrogen sulphites and sulphides', {
      b: '**Sulphites and hydrogen sulphites** + dilute acid → salt + water + **sulphur dioxide** (choking smell of burning sulphur). **Test for SO₂:** turns **acidified potassium dichromate paper from orange to green** (and acidified KMnO₄ from pink to colourless); it also turns lime water milky. **Sulphides** + dilute acid → salt + **hydrogen sulphide** (smell of rotten eggs). **Test for H₂S:** turns **lead acetate paper silvery black** (PbS).',
      m: [r`\ce{Na2SO3 + H2SO4 -> Na2SO4 + H2O + SO2}`, r`\ce{NaHSO3 + HCl -> NaCl + H2O + SO2}`, r`\ce{ZnS + H2SO4 -> ZnSO4 + H2S}`],
      v: table(['Gas', 'Smell', 'Test'], [['SO₂', 'Burning sulphur (choking)', 'Acidified K₂Cr₂O₇: orange → green'], ['H₂S', 'Rotten eggs', 'Lead acetate paper: turns black'], ['CO₂', 'None', 'Lime water: milky']], 'Table of the smells and tests for sulphur dioxide, hydrogen sulphide and carbon dioxide'),
      n: 'Sulphites and hydrogen sulphites give sulphur dioxide with dilute acids. It has a choking smell and turns orange acidified potassium dichromate green. Sulphides give hydrogen sulphide, which smells of rotten eggs and blackens paper soaked in lead acetate. Remember that sulphur dioxide also turns lime water milky, so the dichromate test is what separates it from carbon dioxide.',
    }),
    sl('example', 'Worked example: which salt was it?', {
      b: '**Problem.** Three white powders X, Y and Z are each warmed with dilute sulphuric acid. X gives a gas that turns lime water milky but does not affect acidified potassium dichromate. Y gives a gas that turns acidified potassium dichromate green. Z gives a gas that blackens lead acetate paper. All three are sodium salts. Name the anion in each and write the equation for X.\n\n**X:** carbonate (CO₂): Na₂CO₃ + H₂SO₄ → Na₂SO₄ + H₂O + CO₂.\n\n**Y:** sulphite (SO₂). **Z:** sulphide (H₂S).',
      v: flow('LR', [['a', 'Gas with dilute acid'], ['b', 'Lime water milky, dichromate unchanged → CO₂ → carbonate'], ['c', 'Dichromate turns green → SO₂ → sulphite'], ['d', 'Lead acetate black → H₂S → sulphide']], [['a', 'b'], ['a', 'c'], ['a', 'd']], 'Flow identifying carbonate, sulphite and sulphide from the gas they give with dilute acid'),
      n: 'Use the gas tests one at a time. A gas that turns lime water milky but leaves the dichromate orange is carbon dioxide, so X is a carbonate. A gas that turns the dichromate green is sulphur dioxide, so Y is a sulphite. A gas that blackens lead acetate paper is hydrogen sulphide, so Z is a sulphide.',
    }),
    sl('check', 'Quick check: gases from salts', {
      b: 'Identify the gas given off and its test.',
      n: 'Quick check. Carbonates give carbon dioxide, sulphites give sulphur dioxide and sulphides give hydrogen sulphide.',
      chk: 'gas-mcq',
    }),
    sl('concept', 'Choosing a method: solubility decides', {
      b: 'First decide whether the salt is **soluble** or **insoluble** in water. **Insoluble salts** are made by **precipitation**. **Soluble salts** are made by direct combination, displacement (metal + acid), neutralisation of an insoluble base, **titration** (for salts of sodium, potassium and ammonium) or an acid on a carbonate.',
      v: table(['Soluble in water', 'Insoluble in water'], [['All sodium, potassium and ammonium salts', '—'], ['All nitrates', '—'], ['Most chlorides', 'AgCl, PbCl₂ (cold)'], ['Most sulphates', 'BaSO₄, PbSO₄ (CaSO₄ slightly)'], ['Na, K and NH₄ carbonates', 'Most other carbonates']], 'Table of general solubility rules for salts'),
      n: 'Before choosing a method, ask whether the salt dissolves in water. Insoluble salts, such as silver chloride, lead chloride and barium sulphate, are made by precipitation. Soluble salts are made in other ways: by joining the elements directly, by reacting a metal with an acid, by neutralising an insoluble base, by titrating an alkali, or by reacting an acid with a carbonate.',
    }),
    sl('concept', 'Direct combination, displacement and precipitation', {
      b: '**Direct combination:** two elements combine — iron burns in dry chlorine to give **iron(III) chloride**. **Displacement:** an active metal displaces hydrogen from a dilute acid — **zinc + dilute sulphuric acid → zinc sulphate**. **Precipitation (double decomposition):** two soluble salts exchange ions and the insoluble salt is filtered off — **lead nitrate + sodium chloride → lead chloride**.',
      m: [r`\ce{2Fe + 3Cl2 -> 2FeCl3}`, r`\ce{Zn + H2SO4 -> ZnSO4 + H2}`, r`\ce{Pb(NO3)2 + 2NaCl -> PbCl2 + 2NaNO3}`],
      v: table(['Method', 'Example salt', 'Type of salt'], [['Direct combination', 'Iron(III) chloride', 'Soluble'], ['Displacement', 'Zinc sulphate', 'Soluble'], ['Precipitation', 'Lead chloride, barium sulphate', 'Insoluble']], 'Table of three salt-preparation methods with an example of each'),
      n: 'Some salts are made by joining two elements directly: hot iron burns in chlorine to form iron three chloride. Others are made by displacement, where an active metal like zinc pushes hydrogen out of dilute sulphuric acid. Insoluble salts, like lead chloride, are made by precipitation: two solutions are mixed, the solid salt settles out and is filtered off.',
    }),
    sl('example', 'Worked example: choose the method', {
      b: '**Problem.** Suggest a method and write the equation for preparing (a) barium sulphate, (b) zinc sulphate and (c) iron(III) chloride.\n\n**(a)** Insoluble → **precipitation**: BaCl₂ + Na₂SO₄ → BaSO₄ + 2NaCl.\n\n**(b)** Soluble; zinc is above hydrogen → **displacement**: Zn + H₂SO₄ → ZnSO₄ + H₂.\n\n**(c)** **Direct combination**: 2Fe + 3Cl₂ → 2FeCl₃ (iron with dilute HCl would give iron(II) chloride instead).',
      v: flow('LR', [['a', 'Is the salt soluble?'], ['b', 'No → precipitation'], ['c', 'Yes → metal, base, alkali or carbonate route']], [['a', 'b'], ['a', 'c']], 'Flow for choosing a preparation method by solubility'),
      n: 'Barium sulphate does not dissolve, so it is made by precipitation from two soluble salts. Zinc sulphate dissolves, and zinc is reactive enough to displace hydrogen from dilute sulphuric acid. Iron three chloride is made by heating iron in chlorine, because iron with dilute hydrochloric acid gives iron two chloride, not iron three chloride.',
    }),
    sl('check', 'Quick check: preparation methods', {
      b: 'Pick the right method for a given salt.',
      n: 'Quick check. Insoluble salts are always made by precipitation.',
      chk: 'method-mcq',
    }),
    sl('concept', 'Neutralisation, titration and acids on carbonates', {
      b: '**Insoluble base + acid:** add **excess** insoluble base (CuO) to warm dilute acid, filter off the excess, crystallise — **copper(II) sulphate**. **Titration:** for salts of **sodium, potassium and ammonium**, since the alkali and salt are both soluble and any excess could not be filtered off — the exact volumes are found with an indicator, then mixed without it. **Acid + carbonate or hydrogen carbonate:** e.g. **sodium chloride** from sodium hydrogen carbonate, or zinc sulphate from zinc carbonate.',
      m: [r`\ce{CuO + H2SO4 -> CuSO4 + H2O}`, r`\ce{NaOH + HCl -> NaCl + H2O}`, r`\ce{NaHCO3 + HCl -> NaCl + H2O + CO2}`],
      v: table(['Salt wanted', 'Method', 'Why'], [['Copper(II) sulphate', 'Excess CuO + dil. H₂SO₄', 'Insoluble base: excess filtered off'], ['Sodium chloride', 'Titration of NaOH with HCl', 'Excess alkali cannot be filtered off'], ['Calcium nitrate', 'CaCO₃ + dil. HNO₃', 'Carbonate reacts; CO₂ escapes']], 'Table of three salts and the neutralisation or carbonate route used for each'),
      n: 'To make copper sulphate, add black copper oxide to warm dilute sulphuric acid until no more dissolves, then filter off the extra oxide. Sodium and potassium salts are made by titration, because both the alkali and the salt dissolve, so any excess could not be removed by filtering. Acids also react with carbonates, giving the salt, water and carbon dioxide.',
    }),
    sl('example', 'Worked example: why titration for sodium sulphate?', {
      b: '**Problem.** Explain why sodium sulphate is made by titration, while copper(II) sulphate is made by adding excess copper(II) oxide. Write both equations.\n\n**Sodium sulphate:** NaOH is soluble, so excess alkali would stay dissolved in the product; exact volumes must be used: 2NaOH + H₂SO₄ → Na₂SO₄ + 2H₂O.\n\n**Copper(II) sulphate:** CuO is insoluble; excess is simply filtered off, leaving pure solution: CuO + H₂SO₄ → CuSO₄ + H₂O.',
      v: table(['Salt', 'Base', 'Base soluble?', 'Method'], [['Na₂SO₄', 'NaOH', 'Yes', 'Titration'], ['CuSO₄', 'CuO', 'No', 'Excess base, filter']], 'Table comparing preparation of sodium sulphate and copper sulphate'),
      n: 'The difference is solubility. Sodium hydroxide dissolves, so any extra would remain mixed with the salt and could not be filtered out; the exact amount must be found by titration. Copper oxide does not dissolve, so you can add more than enough, and the leftover black powder is simply filtered off.',
    }),
    sl('check', 'Quick check: titration or filtration?', {
      b: 'Explain the choice of method for a soluble salt.',
      n: 'Quick check. Titration is needed when the base is soluble.',
      chk: 'titration-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Dilute acid + carbonate or hydrogen carbonate → salt + H₂O + CO₂ (lime water milky).',
        'Dilute acid + sulphite or hydrogen sulphite → salt + H₂O + SO₂ (acidified dichromate orange → green).',
        'Dilute acid + sulphide → salt + H₂S (lead acetate paper black).',
        'Insoluble salts: precipitation. Soluble salts: direct combination, displacement, excess insoluble base, titration (Na, K, NH₄), acid + carbonate.',
      ],
      v: table(['Salt', 'Method'], [['BaSO₄, PbCl₂', 'Precipitation'], ['FeCl₃', 'Direct combination'], ['ZnSO₄', 'Displacement'], ['CuSO₄', 'Excess CuO'], ['NaCl, K₂SO₄', 'Titration']], 'Summary table of salts and preparation methods'),
      n: 'Let us sum up Part 2. Dilute acids release carbon dioxide from carbonates, sulphur dioxide from sulphites and hydrogen sulphide from sulphides, and each gas has its own test. To prepare a salt, first check its solubility. Insoluble salts are precipitated; soluble salts are made by direct combination, displacement, neutralising an insoluble base, titration, or from a carbonate.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Name the gas and its test in “state one observation” questions.',
        'Remember that SO₂ also turns lime water milky: use acidified dichromate to confirm it.',
        'Justify a method by the solubility of the salt and of the base.',
        'Iron with dilute HCl gives FeCl₂; FeCl₃ needs direct combination with chlorine.',
      ],
      v: table(['Slip', 'Fix'], [['CuSO₄ by titration', 'Excess CuO, filter'], ['PbCl₂ by Pb + HCl', 'Precipitation from Pb(NO₃)₂'], ['H₂S turns lime water milky', 'H₂S blackens lead acetate paper']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. In observation questions, name the gas and describe its test. Sulphur dioxide also turns lime water milky, so confirm it with acidified dichromate. Always justify your choice of method using solubility. And remember that iron with dilute hydrochloric acid gives iron two chloride; iron three chloride needs chlorine gas.',
    }),
  ],
});
