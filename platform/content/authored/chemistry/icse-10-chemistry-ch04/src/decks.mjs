// ICSE 10 Chemistry ch04 Analytical Chemistry — two decks: Part 1 (t01, t02, t04) colours of salts and their solutions,
// sodium hydroxide added drop by drop and in excess to solutions of iron, copper, zinc, lead and calcium salts, and
// sodium hydroxide warmed with ammonium salts; Part 2 (t03, t05) ammonium hydroxide added drop by drop and in excess,
// telling cations apart, and the amphoteric nature of aluminium, zinc and lead and their oxides and hydroxides.
import { sl, deck, table, flow, svgV, chem } from './lib.mjs';
import { NAOH_TUBES, NH4OH_STAGES } from './svgs.mjs';

const V = {
  naoh: svgV(NAOH_TUBES, 'Five test tubes showing the colours of the hydroxide precipitates formed by a few drops of sodium hydroxide with iron(II), iron(III), copper(II), zinc and lead ions, and whether each dissolves in excess'),
  nh4oh: svgV(NH4OH_STAGES, 'Copper(II) and zinc solutions with a little and then excess ammonium hydroxide: pale blue precipitate to deep blue solution, and white precipitate to colourless solution'),
};

export const deck1 = deck({
  part: 1,
  title: 'Analytical Chemistry — Part 1: Colours, sodium hydroxide and ammonium salts',
  goals: [
    'State the colours of common salts of copper, iron, zinc and lead and of their solutions',
    'Predict the precipitate formed when sodium hydroxide is added to a salt solution, and what excess alkali does',
    'Write balanced equations for the precipitation reactions',
    'Describe how warming with sodium hydroxide shows that a salt is an ammonium salt',
  ],
  slides: [
    sl('title', 'Detective work with test tubes', {
      b: 'Part 1 — **Analytical chemistry** finds out what a substance is made of. In **qualitative analysis** we identify the ions in a salt from simple observations: its **colour**, and the **precipitate** it gives with an alkali.',
      v: table(['Clue', 'What it tells us'], [['Colour of the solid or solution', 'Narrows down the metal (blue often means copper)'], ['Colour of a hydroxide precipitate', 'Identifies the cation'], ['Whether the precipitate dissolves in excess alkali', 'Separates look-alike cations (zinc, lead)'], ['A gas given off on warming with alkali', 'Shows ammonium ions']], 'Table of four clues used in qualitative analysis and what each tells us'),
      n: 'Namaste! A chemist handed an unlabelled bottle behaves like a detective. Simple clues, such as the colour of a salt and the colour of the solid that forms when an alkali is added, tell us which metal ion is present. In this part we learn the colours of common salts, the action of sodium hydroxide on their solutions, and a quick test for ammonium salts.',
    }),
    sl('concept', 'Colours of salts and their solutions', {
      b: 'Salts of **sodium, potassium, calcium, zinc, lead and ammonium** are **white** solids and give **colourless** solutions. Salts of some **transition metals** are coloured, and the colour of the solid often differs from that of the solution.',
      v: table(['Substance', 'Solid', 'Solution in water'], [['Copper(II) sulphate (hydrated)', 'Blue crystals', 'Blue'], ['Copper(II) chloride', 'Bluish-green', 'Green to blue-green'], ['Iron(II) sulphate (hydrated)', 'Pale green crystals', 'Pale green'], ['Iron(III) chloride', 'Yellowish-brown', 'Yellowish-brown'], ['Zinc sulphate, lead nitrate', 'White', 'Colourless'], ['Potassium permanganate', 'Purple-black', 'Purple (pink when dilute)']], 'Table of the colours of common salts as solids and in solution'),
      n: 'Start with colour. Salts of sodium, potassium, calcium, zinc, lead and ammonium are white, and their solutions are colourless. Copper salts are usually blue or green. Iron two salts are pale green, while iron three salts are yellowish brown. So a pale green solution hints at iron two ions, and a blue one at copper. Colour alone is only a hint, so we confirm it with an alkali.',
    }),
    sl('concept', 'Coloured oxides and other compounds', {
      b: 'Some insoluble compounds have colours worth remembering, because they appear as **residues** and **precipitates** in many reactions.',
      v: table(['Compound', 'Colour'], [['Copper(II) oxide, CuO', 'Black'], ['Copper(II) carbonate', 'Green'], ['Zinc oxide, ZnO', 'White when cold, yellow when hot'], ['Lead(II) oxide, PbO', 'Yellow'], ['Red lead, Pb₃O₄', 'Bright red'], ['Lead(IV) oxide, PbO₂', 'Dark brown'], ['Iron(III) oxide, Fe₂O₃', 'Reddish brown']], 'Table of the colours of oxides and carbonates of copper, zinc, lead and iron'),
      n: 'A few insoluble compounds turn up again and again. Copper oxide is black and copper carbonate is green. Zinc oxide is white when cold but yellow when hot. Lead two oxide is yellow, red lead is bright red, and lead four oxide is dark brown. Iron three oxide is reddish brown, the colour of rust.',
    }),
    sl('check', 'Quick check: colour of a solution', {
      b: 'Use the colour of a salt solution to name the ion it hints at.',
      n: 'Quick check. Remember which iron ion gives a pale green solution and which gives a yellowish brown one.',
      chk: 'colour-mcq',
    }),
    sl('diagram', 'Sodium hydroxide, a few drops at a time', {
      b: 'Sodium hydroxide gives **hydroxide ions**. Most metal hydroxides are **insoluble**, so they appear as **precipitates**, each with its own colour. Add the alkali **drop by drop**, then **in excess**, and note both observations.',
      v: V.naoh,
      n: 'Sodium hydroxide solution supplies hydroxide ions. Most metal hydroxides do not dissolve in water, so a solid called a precipitate appears. Iron two ions give a dirty green precipitate, iron three ions a reddish brown one, copper ions a pale blue one, and zinc and lead ions white ones. Then keep adding alkali: the zinc and lead precipitates dissolve, but the others stay.',
    }),
    sl('concept', 'Equations for the coloured precipitates', {
      b: 'The metal hydroxide precipitates; the sodium salt stays in solution. These precipitates do **not** dissolve in excess sodium hydroxide.',
      v: table(['Solution', 'Equation', 'Precipitate'], [['Iron(II) sulphate', 'FeSO₄ + 2NaOH → Fe(OH)₂ + Na₂SO₄', 'Dirty green'], ['Iron(III) chloride', 'FeCl₃ + 3NaOH → Fe(OH)₃ + 3NaCl', 'Reddish brown'], ['Copper(II) sulphate', 'CuSO₄ + 2NaOH → Cu(OH)₂ + Na₂SO₄', 'Pale blue'], ['Calcium nitrate', 'Ca(NO₃)₂ + 2NaOH → Ca(OH)₂ + 2NaNO₃', 'White, sparingly soluble']], 'Table of equations for sodium hydroxide with iron(II), iron(III), copper(II) and calcium salts and the precipitate colours'),
      n: 'Here are the equations. In each one, the metal hydroxide comes out as a precipitate and a sodium salt stays dissolved. Iron two sulphate gives dirty green iron two hydroxide, iron three chloride gives reddish brown iron three hydroxide, and copper sulphate gives pale blue copper hydroxide. Calcium nitrate gives a white precipitate. None of these dissolves in excess sodium hydroxide.',
    }),
    sl('example', 'Worked example: iron(II) or iron(III)?', {
      b: '**Problem.** Two bottles, P and Q, hold iron salt solutions. With sodium hydroxide, P gives a **dirty green** precipitate and Q a **reddish-brown** one. Identify the ion in each and write the equation for Q, taking Q as iron(III) sulphate.\n\n**Step 1.** Dirty green → iron(II) hydroxide → **P has Fe²⁺**.\n\n**Step 2.** Reddish brown → iron(III) hydroxide → **Q has Fe³⁺**.\n\n**Step 3.** Fe₂(SO₄)₃ + 6NaOH → 2Fe(OH)₃ + 3Na₂SO₄.\n\n**Note.** The dirty green solid slowly turns brown at its surface in air, as iron(II) is oxidised to iron(III).',
      v: table(['Bottle', 'Precipitate with NaOH', 'In excess', 'Ion'], [['P', 'Dirty green', 'Insoluble', 'Fe²⁺'], ['Q', 'Reddish brown', 'Insoluble', 'Fe³⁺']], 'Table identifying the iron ions in bottles P and Q from the colour of the precipitate'),
      n: 'The colour of the precipitate decides it. A dirty green precipitate is iron two hydroxide, so bottle P contains iron two ions. A reddish brown precipitate is iron three hydroxide, so bottle Q contains iron three ions. For iron three sulphate, one unit needs six units of sodium hydroxide. Notice too that the green solid browns slowly in air as it is oxidised.',
    }),
    sl('check', 'Quick check: a coloured precipitate', {
      b: 'Predict the precipitate from a pale green solution.',
      n: 'Quick check. Match the precipitate to the iron ion, and think about whether it dissolves in excess.',
      chk: 'fe2-chk-mcq',
    }),
    sl('concept', 'Zinc and lead: precipitates that dissolve', {
      b: 'Zinc and lead salts give **white** precipitates that **dissolve in excess** sodium hydroxide, forming soluble **sodium zincate** and **sodium plumbite**. Zinc and lead hydroxides are **amphoteric**: they react with an alkali as well as with an acid.',
      v: table(['Stage', 'Zinc sulphate', 'Lead nitrate'], [['A few drops of NaOH', 'ZnSO₄ + 2NaOH → Zn(OH)₂ + Na₂SO₄ (white, gelatinous)', 'Pb(NO₃)₂ + 2NaOH → Pb(OH)₂ + 2NaNO₃ (white, chalky)'], ['Excess NaOH', 'Zn(OH)₂ + 2NaOH → Na₂ZnO₂ + 2H₂O (colourless solution)', 'Pb(OH)₂ + 2NaOH → Na₂PbO₂ + 2H₂O (colourless solution)']], 'Table of equations for zinc sulphate and lead nitrate with a little and with excess sodium hydroxide'),
      n: 'Zinc and lead behave differently. A few drops of sodium hydroxide give a white precipitate, gelatinous for zinc and chalky for lead. But add more alkali and the precipitate disappears, leaving a clear, colourless solution of sodium zincate or sodium plumbite. That happens because zinc and lead hydroxides react with alkalis as well as acids.',
    }),
    sl('example', 'Worked example: how much alkali?', {
      b: '**Problem.** What mass of sodium hydroxide is just enough to precipitate all the copper from a solution of 31.9 g of copper(II) sulphate? (Cu = 63.5, S = 32, O = 16, Na = 23, H = 1)\n\n**Step 1.** CuSO₄ + 2NaOH → Cu(OH)₂ + Na₂SO₄: 1 mole CuSO₄ needs 2 moles NaOH.\n\n**Step 2.** CuSO₄ = 63.5 + 32 + 64 = 159.5; moles = 31.9 ÷ 159.5 = 0.2.\n\n**Step 3.** NaOH = 2 × 0.2 = 0.4 mole; mass = 0.4 × 40 = **16 g**.',
      v: table(['Quantity', 'Value'], [['Molar mass of CuSO₄', '159.5'], ['Moles of CuSO₄', '0.2'], ['Moles of NaOH (two per CuSO₄)', '0.4'], ['Mass of NaOH (molar mass 40)', '16 g']], 'Table of the steps from 31.9 grams of copper sulphate to 16 grams of sodium hydroxide'),
      n: 'From the equation, each unit of copper sulphate needs two units of sodium hydroxide. The molar mass of copper sulphate is one hundred fifty nine point five, so thirty one point nine grams is zero point two mole. Twice that is zero point four mole of sodium hydroxide, and since its molar mass is forty, the mass needed is sixteen grams.',
    }),
    sl('concept', 'Sodium hydroxide and ammonium salts', {
      b: 'An **ammonium salt** warmed with sodium hydroxide gives **ammonia**. The stronger base drives out the weaker one. Identify the gas by its **pungent smell**, by **moist red litmus turning blue**, and by **dense white fumes** with a rod dipped in concentrated hydrochloric acid.',
      v: chem('NH4Cl + NaOH -> NaCl + H2O + NH3', 'Equation: ammonium chloride plus sodium hydroxide gives sodium chloride, water and ammonia', 'Warming an ammonium salt with sodium hydroxide'),
      n: 'Ammonium salts are white and dissolve to give colourless solutions, so colour does not help. Instead, warm the salt with sodium hydroxide. Ammonia gas is given off, with a sharp smell. It turns moist red litmus paper blue, and it gives dense white fumes of ammonium chloride with a glass rod dipped in concentrated hydrochloric acid.',
    }),
    sl('example', 'Worked example: is it an ammonium salt?', {
      b: '**Problem.** White crystals R are warmed with sodium hydroxide solution. A gas turns moist red litmus blue. With barium chloride solution, a solution of R gives a white precipitate insoluble in dilute HCl. Identify R and write the equation for the warming.\n\n**Step 1.** Alkaline gas on warming with NaOH → **ammonium ion**.\n\n**Step 2.** White precipitate with barium chloride, insoluble in acid → **sulphate ion**.\n\n**Step 3.** R is **ammonium sulphate**: (NH₄)₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O + 2NH₃.',
      v: flow('LR', [['a', 'White salt + NaOH, warm'], ['b', 'Gas turns moist red litmus blue?'], ['c', 'Ammonia: ammonium salt'], ['d', 'Not an ammonium salt']], [['a', 'b'], ['b', 'c', 'yes'], ['b', 'd', 'no']], 'Flow for testing whether a white salt is an ammonium salt by warming it with sodium hydroxide'),
      n: 'Take the clues one at a time. A gas that turns moist red litmus blue, given off on warming with sodium hydroxide, can only be ammonia, so the salt contains ammonium ions. A white precipitate with barium chloride that does not dissolve in acid shows sulphate ions. Together they point to ammonium sulphate.',
    }),
    sl('check', 'Quick check: testing for ammonium ions', {
      b: 'Decide what an alkaline gas on warming with sodium hydroxide tells you.',
      n: 'Quick check. Which gas turns moist red litmus blue, and which ion must the salt contain to give it?',
      chk: 'nh4-chk-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Salts of Na, K, Ca, Zn, Pb and NH₄⁺ are white with colourless solutions; copper salts are blue or green; iron(II) pale green; iron(III) yellowish brown.',
        'NaOH, a few drops: Fe²⁺ dirty green, Fe³⁺ reddish brown, Cu²⁺ pale blue, Zn²⁺ and Pb²⁺ white precipitates.',
        'In excess NaOH, only the zinc and lead hydroxides dissolve (sodium zincate, sodium plumbite).',
        'Ammonium salts warmed with NaOH give ammonia: moist red litmus turns blue.',
      ],
      v: table(['Cation', 'NaOH, a few drops', 'NaOH in excess'], [['Fe²⁺', 'Dirty green', 'Insoluble'], ['Fe³⁺', 'Reddish brown', 'Insoluble'], ['Cu²⁺', 'Pale blue', 'Insoluble'], ['Zn²⁺', 'White, gelatinous', 'Dissolves'], ['Pb²⁺', 'White, chalky', 'Dissolves'], ['Ca²⁺', 'White (sparingly soluble)', 'Insoluble']], 'Summary table of the action of sodium hydroxide, a few drops and in excess, on six cations'),
      n: 'Let us sum up Part 1. The colour of a salt gives a first hint. Sodium hydroxide then gives a dirty green precipitate with iron two, reddish brown with iron three, pale blue with copper, and white with zinc, lead and calcium. Only the zinc and lead precipitates dissolve in excess. Ammonium salts give ammonia when warmed with the alkali.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Always state two observations: the precipitate with a few drops, then its behaviour in excess.',
        'Give the colour and the nature of the precipitate (gelatinous, chalky) where you can.',
        'Write formulae of hydroxides carefully: Fe(OH)₂, Fe(OH)₃, Cu(OH)₂, Zn(OH)₂, Pb(OH)₂.',
        'For an ammonium salt, the word “warm” and the litmus test both earn marks.',
      ],
      v: table(['Slip', 'Fix'], [['Fe(OH)₃ is dirty green', 'Fe(OH)₂ is dirty green; Fe(OH)₃ is reddish brown'], ['Cu(OH)₂ dissolves in excess NaOH', 'It does not; it dissolves in excess NH₄OH'], ['Ammonium salt + NaOH: no reaction', 'Ammonia is given off on warming']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some tips. Examiners want two observations, one with a few drops of alkali and one with excess. Describe the precipitate fully, with its colour and whether it is gelatinous or chalky. Check your hydroxide formulae, and do not mix up the two iron hydroxides. For ammonium salts, mention warming and the moist red litmus test.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Analytical Chemistry — Part 2: Ammonium hydroxide and amphoteric substances',
  goals: [
    'Describe what a little and then excess ammonium hydroxide does to solutions of iron, copper, zinc and lead salts',
    'Choose a reagent to distinguish between two salt solutions and state the observations',
    'Define an amphoteric substance with examples',
    'Write equations for sodium hydroxide with aluminium, zinc and lead and with their oxides and hydroxides',
  ],
  slides: [
    sl('title', 'A weaker alkali, new clues', {
      b: 'Part 2 — **Ammonium hydroxide** (aqueous ammonia) is a **weak alkali**. It precipitates the same hydroxides, but in **excess** it behaves differently from sodium hydroxide, giving us a second test.',
      v: table(['Reagent', 'Strength', 'Special action in excess'], [['Sodium hydroxide, NaOH', 'Strong alkali', 'Dissolves Zn(OH)₂ and Pb(OH)₂'], ['Ammonium hydroxide, NH₄OH', 'Weak alkali', 'Dissolves Zn(OH)₂ and Cu(OH)₂']], 'Table comparing sodium hydroxide and ammonium hydroxide and which precipitates each dissolves in excess'),
      n: 'Ammonium hydroxide, a solution of ammonia in water, is a weak alkali. With a few drops it gives much the same hydroxide precipitates as sodium hydroxide. The difference shows up in excess. Sodium hydroxide dissolves the zinc and lead precipitates, but ammonium hydroxide dissolves the zinc and copper ones. Using both reagents, we can tell apart cations that look alike.',
    }),
    sl('concept', 'Ammonium hydroxide, a few drops', {
      b: 'A few drops of ammonium hydroxide give the **same coloured precipitates** as sodium hydroxide; the ammonium salt stays in solution.',
      v: table(['Solution', 'Equation', 'Precipitate'], [['Iron(II) sulphate', 'FeSO₄ + 2NH₄OH → Fe(OH)₂ + (NH₄)₂SO₄', 'Dirty green'], ['Iron(III) chloride', 'FeCl₃ + 3NH₄OH → Fe(OH)₃ + 3NH₄Cl', 'Reddish brown'], ['Lead nitrate', 'Pb(NO₃)₂ + 2NH₄OH → Pb(OH)₂ + 2NH₄NO₃', 'White, chalky'], ['Zinc nitrate', 'Zn(NO₃)₂ + 2NH₄OH → Zn(OH)₂ + 2NH₄NO₃', 'White, gelatinous'], ['Copper(II) sulphate', 'CuSO₄ + 2NH₄OH → Cu(OH)₂ + (NH₄)₂SO₄', 'Pale blue']], 'Table of equations for a few drops of ammonium hydroxide with five salt solutions'),
      n: 'With just a few drops of ammonium hydroxide, the results look familiar. Iron two gives a dirty green precipitate, iron three a reddish brown one, lead and zinc give white ones, and copper gives pale blue. The equations are like those for sodium hydroxide, except that an ammonium salt, not a sodium salt, is left in solution.',
    }),
    sl('diagram', 'Excess ammonium hydroxide: copper and zinc', {
      b: 'In excess, ammonium hydroxide **dissolves** two precipitates by forming soluble **complex salts**:\n\n- **Copper(II) hydroxide** → a **deep (inky) blue** solution of tetraamminecopper(II) sulphate, [Cu(NH₃)₄]SO₄.\n- **Zinc hydroxide** → a **colourless** solution of tetraamminezinc(II) sulphate, [Zn(NH₃)₄]SO₄.\n\nIron(II), iron(III) and **lead** hydroxides do **not** dissolve.',
      v: V.nh4oh,
      n: 'Now add ammonium hydroxide in excess. The pale blue copper precipitate dissolves to give a deep, inky blue solution, which is a very sensitive sign of copper ions. The white zinc precipitate also dissolves, leaving a colourless solution. Both form soluble complex salts with ammonia. The iron and lead precipitates stay put.',
    }),
    sl('check', 'Quick check: copper with excess ammonia', {
      b: 'Predict the final observation when ammonium hydroxide is added to a copper salt until in excess.',
      n: 'Quick check. Which colour tells you that copper ions are present when aqueous ammonia is in excess?',
      chk: 'cu-excess-chk-mcq',
    }),
    sl('concept', 'Equations for the excess reactions', {
      b: 'The ammonium salt formed in the first step takes part in dissolving the precipitate. The two complex-forming equations have the same shape.',
      v: table(['Precipitate', 'Equation in excess NH₄OH', 'Result'], [['Cu(OH)₂', 'Cu(OH)₂ + (NH₄)₂SO₄ + 2NH₄OH → [Cu(NH₃)₄]SO₄ + 4H₂O', 'Deep blue solution'], ['Zn(OH)₂', 'Zn(OH)₂ + (NH₄)₂SO₄ + 2NH₄OH → [Zn(NH₃)₄]SO₄ + 4H₂O', 'Colourless solution'], ['Pb(OH)₂, Fe(OH)₂, Fe(OH)₃', 'No reaction', 'Precipitate stays']], 'Table of equations for copper and zinc hydroxides dissolving in excess ammonium hydroxide'),
      n: 'Here is what happens in excess. Copper hydroxide reacts with ammonium sulphate and more ammonium hydroxide to give tetraammine copper two sulphate and water, which is deep blue. Zinc hydroxide reacts in exactly the same pattern to give a colourless complex salt. Lead and iron hydroxides do not react, so their precipitates remain.',
    }),
    sl('example', 'Worked example: telling pairs apart', {
      b: '**Problem.** Suggest a reagent to distinguish each pair, and state the observation for each solution: (a) zinc nitrate and lead nitrate; (b) iron(II) sulphate and iron(III) sulphate; (c) ammonium chloride and sodium chloride.\n\n**(a)** Excess **NH₄OH**: zinc — white precipitate **dissolves**; lead — white precipitate **stays**.\n\n**(b)** **NaOH**: iron(II) — **dirty green**; iron(III) — **reddish brown**.\n\n**(c)** **NaOH, warm**: ammonium chloride — **ammonia** turns moist red litmus blue; sodium chloride — **no gas**.',
      v: table(['Pair', 'Reagent', 'First', 'Second'], [['Zn(NO₃)₂, Pb(NO₃)₂', 'NH₄OH in excess', 'Precipitate dissolves', 'Precipitate stays'], ['FeSO₄, Fe₂(SO₄)₃', 'NaOH', 'Dirty green', 'Reddish brown'], ['NH₄Cl, NaCl', 'NaOH, warm', 'Ammonia evolved', 'No gas']], 'Table of three pairs of solutions with a reagent and the observation for each'),
      n: 'Pick a reagent that gives a different result for each member of the pair. Zinc and lead both give white precipitates, but only zinc hydroxide dissolves in excess aqueous ammonia. The two iron salts differ in the colour of their precipitates. And only the ammonium salt gives off ammonia when warmed with sodium hydroxide.',
    }),
    sl('concept', 'Identifying a cation: a flow', {
      b: 'Combine the clues in order: **colour of the precipitate** with a few drops, then its behaviour in **excess NaOH** and in **excess NH₄OH**.',
      v: flow('TB', [['a', 'Add a few drops of NaOH'], ['b', 'Coloured precipitate'], ['c', 'White precipitate'], ['d', 'Dirty green: Fe²⁺; reddish brown: Fe³⁺; pale blue: Cu²⁺'], ['e', 'Dissolves in excess NaOH?'], ['f', 'No: Ca²⁺'], ['g', 'Yes: add excess NH₄OH to a fresh sample'], ['h', 'Dissolves: Zn²⁺'], ['i', 'Stays: Pb²⁺']], [['a', 'b'], ['a', 'c'], ['b', 'd'], ['c', 'e'], ['e', 'f', 'no'], ['e', 'g', 'yes'], ['g', 'h'], ['g', 'i']], 'Flow chart for identifying iron(II), iron(III), copper, calcium, zinc and lead ions using sodium hydroxide and ammonium hydroxide'),
      n: 'Here is a simple plan. Add a few drops of sodium hydroxide. A coloured precipitate names the ion at once: dirty green for iron two, reddish brown for iron three, pale blue for copper. If the precipitate is white, add excess sodium hydroxide. If it stays, the ion is calcium. If it dissolves, test a fresh sample with excess aqueous ammonia: zinc dissolves, lead does not.',
    }),
    sl('check', 'Quick check: lead with excess ammonia', {
      b: 'Predict what excess ammonium hydroxide does to a lead salt solution.',
      n: 'Quick check. Lead hydroxide dissolves in one of the two alkalis only. Which one?',
      chk: 'nh4oh-chk-mcq',
    }),
    sl('concept', 'Amphoteric substances', {
      b: 'An **amphoteric** substance reacts with **both acids and bases** to form a salt and water. The **oxides and hydroxides of aluminium, zinc and lead** are amphoteric, and the **metals** themselves react with hot, concentrated caustic alkalis (NaOH, KOH) to give **hydrogen**.',
      v: table(['Substance', 'With an acid', 'With sodium hydroxide'], [['ZnO', 'ZnO + 2HCl → ZnCl₂ + H₂O', 'ZnO + 2NaOH → Na₂ZnO₂ + H₂O'], ['PbO', 'PbO + 2HNO₃ → Pb(NO₃)₂ + H₂O', 'PbO + 2NaOH → Na₂PbO₂ + H₂O'], ['Al₂O₃', 'Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O', 'Al₂O₃ + 2NaOH → 2NaAlO₂ + H₂O']], 'Table of zinc oxide, lead(II) oxide and aluminium oxide reacting with an acid and with sodium hydroxide'),
      n: 'Some oxides cannot make up their minds. Zinc oxide, lead two oxide and aluminium oxide react with acids, like a base, and with sodium hydroxide, like an acid, giving a salt and water each time. Such substances are called amphoteric. Their hydroxides are amphoteric too, which is why zinc and lead hydroxides dissolve in excess sodium hydroxide.',
    }),
    sl('concept', 'Metals that react with alkalis', {
      b: 'Aluminium, zinc and lead react with **hot, concentrated** sodium hydroxide to give a salt and **hydrogen**. Aluminium also needs water:\n\n- 2Al + 2NaOH + 2H₂O → 2NaAlO₂ + 3H₂ (sodium aluminate)\n- Zn + 2NaOH → Na₂ZnO₂ + H₂ (sodium zincate)\n- Pb + 2NaOH → Na₂PbO₂ + H₂ (sodium plumbite)',
      v: chem('2Al + 2NaOH + 2H2O -> 2NaAlO2 + 3H2', 'Equation: two aluminium plus two sodium hydroxide plus two water gives two sodium aluminate plus three hydrogen', 'Aluminium with hot sodium hydroxide solution'),
      n: 'The metals themselves react with hot, concentrated caustic soda. Aluminium, together with water, gives sodium aluminate and hydrogen. Zinc gives sodium zincate and hydrogen, and lead gives sodium plumbite and hydrogen. The gas burns with a pop. This is why aluminium vessels should not be scrubbed with strong washing soda or caustic soda.',
    }),
    sl('example', 'Worked example: hydrogen from aluminium', {
      b: '**Problem.** 2.7 g of aluminium foil dissolves completely in hot sodium hydroxide solution. Find the volume of hydrogen at STP. (Al = 27; molar volume 22.4 L)\n\n**Step 1.** 2Al + 2NaOH + 2H₂O → 2NaAlO₂ + 3H₂: 2 moles Al give 3 moles H₂.\n\n**Step 2.** Moles of Al = 2.7 ÷ 27 = 0.1.\n\n**Step 3.** Moles of H₂ = 0.1 × 3 ÷ 2 = 0.15; volume = 0.15 × 22.4 = **3.36 L**.',
      v: table(['Quantity', 'Value'], [['Moles of Al', '0.1'], ['Mole ratio Al : H₂', '2 : 3'], ['Moles of H₂', '0.15'], ['Volume of H₂ at STP', '3.36 L']], 'Table of the steps from 2.7 grams of aluminium to 3.36 litres of hydrogen'),
      n: 'The equation shows that two units of aluminium give three units of hydrogen. Two point seven grams of aluminium is zero point one mole, since its molar mass is twenty seven. That gives one and a half times as much hydrogen, zero point one five mole, which occupies zero point one five times twenty two point four, or three point three six litres, at standard conditions.',
    }),
    sl('concept', 'Hydroxides with caustic alkali', {
      b: 'The amphoteric **hydroxides** dissolve in sodium hydroxide; this is what happens when the zinc or lead precipitate disappears in excess alkali.',
      v: table(['Hydroxide', 'Equation with NaOH', 'Salt formed'], [['Al(OH)₃', 'Al(OH)₃ + NaOH → NaAlO₂ + 2H₂O', 'Sodium aluminate'], ['Zn(OH)₂', 'Zn(OH)₂ + 2NaOH → Na₂ZnO₂ + 2H₂O', 'Sodium zincate'], ['Pb(OH)₂', 'Pb(OH)₂ + 2NaOH → Na₂PbO₂ + 2H₂O', 'Sodium plumbite']], 'Table of aluminium, zinc and lead hydroxides reacting with sodium hydroxide and the salts formed'),
      n: 'The hydroxides follow the same pattern as the oxides. Aluminium hydroxide gives sodium aluminate, zinc hydroxide gives sodium zincate, and lead hydroxide gives sodium plumbite, with water in each case. With potassium hydroxide the salts are potassium aluminate, potassium zincate and potassium plumbite.',
    }),
    sl('check', 'Quick check: an amphoteric oxide', {
      b: 'Pick the oxide that reacts with both an acid and an alkali.',
      n: 'Quick check. Which of these oxides belongs to the amphoteric group of aluminium, zinc and lead?',
      chk: 'amph-chk-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'A few drops of NH₄OH give the same precipitates as NaOH.',
        'Excess NH₄OH dissolves Cu(OH)₂ (deep blue) and Zn(OH)₂ (colourless); Pb(OH)₂ and the iron hydroxides stay.',
        'Zinc and lead: both white; only zinc dissolves in excess NH₄OH.',
        'Amphoteric: reacts with acids and bases; oxides and hydroxides of Al, Zn and Pb.',
        'Al, Zn and Pb with hot NaOH give hydrogen and sodium aluminate, zincate or plumbite.',
      ],
      v: table(['Cation', 'Excess NaOH', 'Excess NH₄OH'], [['Fe²⁺, Fe³⁺', 'Precipitate stays', 'Precipitate stays'], ['Cu²⁺', 'Precipitate stays', 'Deep blue solution'], ['Zn²⁺', 'Colourless solution', 'Colourless solution'], ['Pb²⁺', 'Colourless solution', 'Precipitate stays']], 'Summary table of the behaviour of five cations in excess sodium hydroxide and excess ammonium hydroxide'),
      n: 'Let us sum up Part 2. Aqueous ammonia gives the same precipitates as caustic soda at first, but in excess it dissolves the copper precipitate to a deep blue solution and the zinc precipitate to a colourless one. Lead stays insoluble. Aluminium, zinc and lead, and their oxides and hydroxides, react with both acids and alkalis, so they are amphoteric.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'For copper with excess ammonium hydroxide, write “deep blue” or “inky blue” solution, not just “blue”.',
        'To tell zinc from lead, use excess ammonium hydroxide; excess sodium hydroxide dissolves both.',
        'Name the salts: sodium aluminate, sodium zincate, sodium plumbite.',
        'Aluminium with NaOH needs water in the equation: 2Al + 2NaOH + 2H₂O → 2NaAlO₂ + 3H₂.',
      ],
      v: table(['Slip', 'Fix'], [['Pb(OH)₂ dissolves in excess NH₄OH', 'It does not; it dissolves in excess NaOH'], ['Al + NaOH → NaAlO₂ + H₂', 'Balance with water: 2Al + 2NaOH + 2H₂O → 2NaAlO₂ + 3H₂'], ['Excess NaOH tells Zn from Pb', 'Use excess NH₄OH']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. With copper and excess aqueous ammonia, say deep blue or inky blue. To separate zinc from lead, choose excess ammonium hydroxide, because excess sodium hydroxide dissolves both. Learn the names aluminate, zincate and plumbite, and remember the water in the aluminium equation.',
    }),
  ],
});
