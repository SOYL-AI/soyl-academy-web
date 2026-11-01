// ICSE 10 Chemistry ch07 Electrolysis — two decks: Part 1 (t01–t04) electrolytes and non-electrolytes, particles
// present, electrode terms, oxidation and reduction, selective discharge, molten lead bromide; Part 2 (t05–t07) acidified
// water, copper(II) sulphate with copper and with platinum electrodes, electroplating with nickel and silver, refining copper.
import { sl, deck, table, flow, chem, svgV, r } from './lib.mjs';
import { ION_MIGRATION, PBBR2_CELL, VOLTAMETER, CUSO4_CELLS, NICKEL_PLATE, REFINE_CU } from './svgs.mjs';

const V = {
  cell: svgV(ION_MIGRATION, 'Electrolytic cell with cations moving to the cathode and anions moving to the anode'),
  pbbr2: svgV(PBBR2_CELL, 'Electrolysis of molten lead bromide in a silica crucible with graphite electrodes'),
  volt: svgV(VOLTAMETER, 'Voltameter for acidified water, with twice as much hydrogen at the cathode as oxygen at the anode'),
  cuso4: svgV(CUSO4_CELLS, 'Copper(II) sulphate solution electrolysed with copper electrodes and with platinum electrodes'),
  nickel: svgV(NICKEL_PLATE, 'Nickel-plating a brass tap with a nickel anode and nickel sulphate solution'),
  refine: svgV(REFINE_CU, 'Electrorefining of copper with an impure copper anode, a pure copper cathode and anode mud below the anode'),
};

export const deck1 = deck({
  part: 1,
  title: 'Electrolysis — Part 1: Electrolytes, ions and molten lead bromide',
  goals: [
    'Classify substances as strong electrolytes, weak electrolytes or non-electrolytes',
    'Define the terms of electrolysis and link the anode to oxidation and the cathode to reduction',
    'Predict which ions are discharged using the activity series and ion concentration',
    'Describe the electrolysis of molten lead bromide with electrode equations and observations',
  ],
  slides: [
    sl('title', 'Electricity that splits compounds', {
      b: 'Part 1 — some substances let an electric current pass and are **decomposed** by it. This process, **electrolysis**, is used to extract metals, purify copper and coat objects with a thin layer of metal.',
      v: table(['Substance', 'Conducts?', 'Chemical change?'], [['Copper wire', 'Yes', 'No'], ['Molten lead bromide', 'Yes', 'Yes: lead and bromine form'], ['Ethanoic acid solution', 'Weakly', 'Yes, slowly'], ['Sugar solution', 'No', 'No']], 'Table of four substances showing whether each conducts electricity and whether it is decomposed'),
      n: 'Namaste! A copper wire carries an electric current and stays exactly the same. But pass a current through molten lead bromide, and it splits into lead and bromine. This splitting of a compound by electricity is called electrolysis. It is used to extract reactive metals, to purify copper and to coat objects with a thin, shiny layer of metal.',
    }),
    sl('concept', 'Electrolytes and non-electrolytes', {
      b: '- **Electrolyte:** a compound that, in the **molten state or in aqueous solution**, conducts electricity and is **decomposed** by it.\n- **Strong electrolyte:** almost **completely ionised**; conducts well (sodium chloride, potassium hydroxide, dilute hydrochloric, sulphuric and nitric acids, copper(II) sulphate).\n- **Weak electrolyte:** only **partly ionised**; conducts poorly (ethanoic acid, carbonic acid, ammonium hydroxide solution).\n- **Non-electrolyte:** does not conduct in the molten state or in solution (sugar, alcohol, kerosene, carbon tetrachloride).',
      v: table(['Type', 'Ionisation', 'Examples'], [['Strong electrolyte', 'Almost complete', 'NaCl, KOH, dilute H₂SO₄, CuSO₄'], ['Weak electrolyte', 'Partial', 'CH₃COOH, H₂CO₃, NH₄OH'], ['Non-electrolyte', 'None', 'Sugar, alcohol, kerosene']], 'Table classifying strong electrolytes, weak electrolytes and non-electrolytes with examples'),
      n: 'An electrolyte is a compound that conducts electricity when it is melted or dissolved in water, and is broken down as it does so. Strong electrolytes, like sodium chloride and dilute sulphuric acid, are almost completely split into ions and conduct well. Weak electrolytes, like ethanoic acid, are only partly ionised and conduct poorly. Non-electrolytes, like sugar and alcohol, do not conduct at all.',
    }),
    sl('check', 'Quick check: strong or weak?', {
      b: 'Classify a set of substances.',
      n: 'Quick check. Ask how completely each substance splits into ions in water.',
      chk: 'strong-mcq',
    }),
    sl('concept', 'Molecules only, ions only, or both', {
      b: 'What a substance conducts depends on the **particles** in it:\n\n- **Molecules only** (no ions): non-electrolytes such as sugar, alcohol, kerosene and carbon tetrachloride; pure water is mostly molecules.\n- **Ions only:** ionic compounds when molten, such as lead bromide and sodium chloride; strong electrolytes in solution are fully ionised.\n- **Ions and molecules:** weak electrolytes such as ethanoic acid, carbonic acid and ammonium hydroxide solution.\n\nIn a **solid** ionic compound the ions are held in fixed positions, so the solid does **not** conduct.',
      v: table(['Particles present', 'Behaviour', 'Example'], [['Molecules only', 'Non-electrolyte', 'Alcohol, sugar solution'], ['Ions only', 'Strong electrolyte', 'Molten lead bromide'], ['Ions and molecules', 'Weak electrolyte', 'Ethanoic acid solution']], 'Table linking the particles present in a substance to its behaviour as an electrolyte'),
      n: 'To decide how a substance behaves, think about its particles. Sugar and alcohol contain only molecules, so there is nothing to carry the current. Molten lead bromide contains only ions, which carry the current well. Ethanoic acid solution contains a few ions among many molecules, so it conducts weakly. A solid ionic compound does not conduct, because its ions cannot move.',
    }),
    sl('concept', 'Two ways of conducting', {
      b: '**Metallic conduction** happens in metals and graphite: **electrons** move, and there is **no chemical change**.\n\n**Electrolytic conduction** happens in molten or dissolved electrolytes: **ions** move, and the electrolyte is **decomposed** at the electrodes.',
      v: table(['Feature', 'Metallic conduction', 'Electrolytic conduction'], [['Carriers of charge', 'Electrons', 'Ions'], ['Chemical change', 'None', 'Decomposition at the electrodes'], ['Transfer of matter', 'No', 'Yes'], ['Examples', 'Copper, graphite', 'Molten NaCl, dilute H₂SO₄']], 'Table comparing metallic conduction and electrolytic conduction'),
      n: 'There are two kinds of conduction. In a metal wire, free electrons drift along and the metal is not changed in any way. In an electrolyte, the charged particles are ions, which travel through the liquid to the electrodes. There they gain or lose electrons, and new substances are formed. So electrolytic conduction always comes with a chemical change.',
    }),
    sl('diagram', 'The language of electrolysis', {
      b: '- **Electrolysis:** the decomposition of an electrolyte, molten or in solution, by passing an electric current through it.\n- **Electrodes:** the conductors through which current enters and leaves the electrolyte. **Anode:** joined to the **positive** terminal. **Cathode:** joined to the **negative** terminal.\n- **Cations** (positive ions) move to the **cathode**; **anions** (negative ions) move to the **anode**.\n- The vessel with electrolyte and electrodes is the **electrolytic cell** (voltameter).',
      v: V.cell,
      n: 'Learn these words. The anode is the electrode joined to the positive terminal of the battery, and the cathode is joined to the negative terminal. Positive ions, called cations, are attracted to the cathode. Negative ions, called anions, are attracted to the anode. The whole arrangement of vessel, electrolyte and electrodes is called an electrolytic cell or voltameter.',
    }),
    sl('concept', 'Oxidation at the anode, reduction at the cathode', {
      b: r`- **Oxidation** is the **loss of electrons**; **reduction** is the **gain of electrons**.
- At the **cathode**, cations **gain** electrons: **reduction**. Example: $\ce{Pb^2+ + 2e- -> Pb}$.
- At the **anode**, anions (or the anode metal) **lose** electrons: **oxidation**. Example: $\ce{2Br- -> Br2 + 2e-}$.

Memory aid: **an**ode – **ox**idation; **cat**hode – **red**uction.`,
      v: table(['Electrode', 'Charge', 'Ions attracted', 'Process'], [['Anode', 'Positive', 'Anions', 'Oxidation (loss of electrons)'], ['Cathode', 'Negative', 'Cations', 'Reduction (gain of electrons)']], 'Table of the anode and cathode with their charge, the ions attracted and the process at each'),
      n: 'Oxidation means losing electrons and reduction means gaining electrons. At the cathode, positive ions pick up electrons and become neutral atoms, so reduction happens there. At the anode, negative ions give up electrons, so oxidation happens there. A simple way to remember: anode goes with oxidation, cathode goes with reduction.',
    }),
    sl('check', 'Quick check: oxidation or reduction?', {
      b: 'Decide which process happens at an electrode.',
      n: 'Quick check. Gaining electrons is reduction; losing electrons is oxidation.',
      chk: 'redox-mcq',
    }),
    sl('concept', 'Selective discharge', {
      b: 'When **more than one kind** of cation or anion can reach an electrode, only one is usually discharged. Three factors decide which:\n\n1. **Position in the activity series:** the **lower** a metal is in the series, the **more easily** its ion is discharged. Cations: K⁺, Na⁺, Ca²⁺, Mg²⁺ are hardly ever discharged from water; H⁺ is discharged instead; Cu²⁺ and Ag⁺ are discharged easily. Anions: OH⁻ is discharged more readily than Cl⁻, NO₃⁻ or SO₄²⁻.\n2. **Concentration:** a much more concentrated ion may be discharged instead (Cl⁻ from concentrated sodium chloride solution gives chlorine).\n3. **Nature of the electrode:** an **active** anode such as copper dissolves instead of any anion being discharged.',
      v: table(['Ion', 'Ease of discharge at the cathode'], [['Na⁺', 'Hardest'], ['Mg²⁺', '↓'], ['Fe²⁺', '↓'], ['H⁺', '↓'], ['Cu²⁺', 'Easiest']], 'Table of cations in order of increasing ease of discharge: sodium, magnesium, iron, hydrogen and copper ions'),
      n: 'When several ions are present, the electrodes choose. At the cathode, ions of metals low in the activity series, like copper, are discharged first. Ions of very reactive metals, like sodium and magnesium, stay in solution and hydrogen ions are discharged instead. At the anode, hydroxide ions are usually discharged before sulphate or nitrate ions. A very high concentration, or an active anode, can change the result.',
    }),
    sl('example', 'Worked example: which ion is discharged?', {
      b: '**Problem.** Name the product at the cathode when each of these dilute solutions is electrolysed with platinum electrodes: (a) magnesium sulphate, (b) copper(II) nitrate, (c) sodium chloride.\n\n**(a) Hydrogen.** Mg²⁺ is high in the activity series; H⁺ (from water) is discharged instead: 2H⁺ + 2e⁻ → H₂.\n\n**(b) Copper.** Cu²⁺ is below hydrogen and is discharged in preference: Cu²⁺ + 2e⁻ → Cu.\n\n**(c) Hydrogen.** Na⁺ is very high in the series and is not discharged from water.',
      v: flow('LR', [['a', 'Cations at the cathode'], ['b', 'Metal below hydrogen (Cu, Ag)?'], ['c', 'Metal deposited'], ['d', 'Hydrogen gas formed']], [['a', 'b'], ['b', 'c', 'yes'], ['b', 'd', 'no (Na, Mg, Ca)']], 'Flow for deciding whether a metal or hydrogen forms at the cathode in aqueous electrolysis'),
      n: 'Compare each metal with hydrogen in the activity series. Magnesium and sodium are well above hydrogen, so their ions stay in solution and hydrogen ions from the water are discharged, giving hydrogen gas. Copper is below hydrogen, so copper ions are discharged first and copper metal coats the cathode.',
    }),
    sl('check', 'Quick check: selective discharge', {
      b: 'Predict a product at an electrode.',
      n: 'Quick check. Use the activity series: the lower the metal, the more easily its ions are discharged.',
      chk: 'discharge-mcq',
    }),
    sl('diagram', 'Electrolysis of molten lead bromide', {
      b: '- Lead bromide is heated in a **silica crucible** until it melts. Silica is not attacked by the hot melt and withstands the high temperature.\n- **Graphite** electrodes are used: they are **inert** and are not attacked by bromine.\n- The solid does **not** conduct (ions fixed); the bulb in the circuit glows only when the lead bromide has **melted** and its ions are free to move.\n- Bromine is poisonous, so the experiment is done in a fume cupboard.',
      v: V.pbbr2,
      n: 'Lead bromide is placed in a silica crucible and heated strongly. Silica is used because it is not attacked by the hot melt and can stand the high temperature. Graphite rods are used as electrodes because bromine does not attack them. As long as the lead bromide is solid, no current flows. Once it melts, its ions are free to move, and electrolysis begins.',
    }),
    sl('example', 'Worked example: equations for molten lead bromide', {
      b: r`**Problem.** For the electrolysis of molten lead bromide with graphite electrodes, write the equations and state the observations.

**Ions in the melt.** $\ce{PbBr2 -> Pb^2+ + 2Br-}$.

**At the cathode (reduction).** $\ce{Pb^2+ + 2e- -> Pb}$: silvery grey molten lead collects at the bottom.

**At the anode (oxidation).** $\ce{2Br- -> Br2 + 2e-}$: reddish-brown fumes of bromine.

**Overall.** $\ce{PbBr2 -> Pb + Br2}$.`,
      v: chem('PbBr2 -> Pb + Br2', 'Lead bromide is decomposed into lead and bromine', 'Overall reaction during electrolysis of the melt.'),
      n: 'When lead bromide melts, it splits into lead ions and bromide ions. Each lead ion travels to the cathode and gains two electrons to become lead, which sinks to the bottom as silvery molten metal. Bromide ions travel to the anode; two of them give up one electron each and pair up as bromine, seen as reddish-brown fumes. Overall, lead bromide is broken down into lead and bromine.',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Electrolytes conduct when molten or dissolved and are decomposed; strong ones are fully ionised, weak ones partly.',
        'Anode: positive, attracts anions, oxidation. Cathode: negative, attracts cations, reduction.',
        'Selective discharge depends on the activity series, concentration and the nature of the electrode.',
        'Molten lead bromide: lead at the cathode, bromine at the anode; silica crucible, graphite electrodes.',
      ],
      v: table(['Electrolysis', 'Cathode', 'Anode'], [['Molten PbBr₂ (graphite)', 'Lead', 'Bromine'], ['Dilute MgSO₄ (platinum)', 'Hydrogen', 'Oxygen'], ['Dilute Cu(NO₃)₂ (platinum)', 'Copper', 'Oxygen']], 'Summary table of the products at the cathode and anode for three electrolyses'),
      n: 'To sum up Part 1. Electrolytes conduct when melted or dissolved and are broken down by the current. Cations go to the cathode and are reduced; anions go to the anode and are oxidised. Which ions are discharged depends on the activity series, on concentration and on the electrodes. Molten lead bromide gives lead at the cathode and bromine at the anode.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Write electrode equations with electrons on the correct side and the charges balanced.',
        'Say why lead bromide must be molten: ions in the solid cannot move.',
        'Give reasons for apparatus choices: silica crucible (not attacked, withstands heat), graphite electrodes (inert).',
        'In "strong or weak" questions, name the particles present.',
      ],
      v: table(['Slip', 'Fix'], [['Cathode is positive', 'Cathode is joined to the negative terminal'], ['2Br⁻ − 2e⁻ → Br₂', '2Br⁻ → Br₂ + 2e⁻'], ['Solid lead bromide conducts', 'Only the melt conducts']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some exam tips. Write electrode equations with the electrons on the correct side, and check that the charges balance. Explain that lead bromide must be molten so that its ions can move. Give a reason for each piece of apparatus. And when you classify an electrolyte, say which particles it contains.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Electrolysis — Part 2: Water, copper sulphate and applications',
  goals: [
    'Explain the electrolysis of acidified water and why hydrogen and oxygen form in the ratio 2 : 1 by volume',
    'Compare copper(II) sulphate electrolysis with copper electrodes and with platinum electrodes',
    'Describe nickel and silver plating and the conditions for a good coat',
    'Describe the electrorefining of copper',
  ],
  slides: [
    sl('title', 'Electrolysis at work', {
      b: 'Part 2 — the same rules explain what happens to water, to copper sulphate solution, and in the plating and refining industries.',
      v: table(['Process', 'Use'], [['Electrolysis of acidified water', 'Hydrogen and oxygen'], ['Electroplating with nickel or chromium', 'Shiny, rust-resistant taps and cycle parts'], ['Silver plating', 'Attractive cutlery and ornaments'], ['Electrorefining', 'Very pure copper for electric wires']], 'Table of four applications of electrolysis and their uses'),
      n: 'In this part we use the rules of selective discharge to explain some important electrolyses. We split water into hydrogen and oxygen, watch the colour of copper sulphate solution, and see how factories coat taps with nickel, spoons with silver, and make copper pure enough for electric wiring.',
    }),
    sl('diagram', 'Electrolysis of acidified water', {
      b: '- **Pure water** is a very weak electrolyte (very few ions), so it conducts very poorly. A little **dilute sulphuric acid** is added to provide ions and increase conductivity.\n- **Platinum** electrodes are used: they are **inert** and are not attacked by oxygen.\n- **Hydrogen** collects at the **cathode** and **oxygen** at the **anode**, in the ratio **2 : 1** by volume.\n- The acid is not used up; only water is decomposed: 2H₂O → 2H₂ + O₂.',
      v: V.volt,
      n: 'Pure water hardly conducts, because it contains very few ions. Adding a little dilute sulphuric acid supplies plenty of ions, so the current can flow. Platinum electrodes are used because they do not react. Hydrogen collects above the cathode and oxygen above the anode, and there is always twice as much hydrogen as oxygen. The acid stays in the cell; only the water is broken down.',
    }),
    sl('example', 'Worked example: equations for acidified water', {
      b: r`**Problem.** Write the electrode equations for the electrolysis of acidified water and explain the 2 : 1 ratio of volumes.

**Ions present.** $\ce{H2SO4 -> 2H+ + SO4^2-}$ and $\ce{H2O <=> H+ + OH-}$.

**Cathode (reduction).** $\ce{4H+ + 4e- -> 2H2}$.

**Anode (oxidation).** OH⁻ is discharged in preference to SO₄²⁻: $\ce{4OH- -> 2H2O + O2 + 4e-}$.

**Ratio.** The same 4 electrons give **2** molecules of hydrogen but only **1** molecule of oxygen. By Avogadro's law, the volumes are in the ratio 2 : 1.`,
      v: table(['Electrode', 'Ions attracted', 'Ion discharged', 'Product'], [['Cathode (−)', 'H⁺', 'H⁺', 'Hydrogen, 2 volumes'], ['Anode (+)', 'OH⁻, SO₄²⁻', 'OH⁻', 'Oxygen, 1 volume']], 'Table of the ions attracted and discharged at each electrode in the electrolysis of acidified water'),
      n: 'The solution contains hydrogen ions, sulphate ions and a few hydroxide ions. At the cathode, hydrogen ions gain electrons and form hydrogen gas. At the anode, hydroxide ions are discharged rather than sulphate ions, giving oxygen and water. Four electrons make two molecules of hydrogen but only one molecule of oxygen, so by Avogadro’s law the volume of hydrogen is twice that of oxygen.',
    }),
    sl('check', 'Quick check: acidified water', {
      b: 'Identify the gas and its volume at an electrode.',
      n: 'Quick check. Remember which gas forms at the anode and how its volume compares with the gas at the cathode.',
      chk: 'water-mcq',
    }),
    sl('concept', 'Copper(II) sulphate with copper electrodes', {
      b: r`Ions present: Cu²⁺, SO₄²⁻ (from the salt), H⁺, OH⁻ (from water).

- **Cathode:** Cu²⁺ is below hydrogen and is discharged: $\ce{Cu^2+ + 2e- -> Cu}$. The cathode gains a pink-brown coat of copper.
- **Anode (copper, an active electrode):** the copper atoms of the anode lose electrons more easily than any anion: $\ce{Cu -> Cu^2+ + 2e-}$. The anode **dissolves** and loses mass; **no gas** is given off.
- For every Cu²⁺ ion removed at the cathode, one enters from the anode, so the **blue colour stays the same**.`,
      v: V.cuso4,
      n: 'With copper electrodes, copper ions are discharged at the cathode, which gets a fresh coat of copper. At the anode, something different happens. The copper anode itself is active: its atoms give up electrons and go into solution as copper ions, so the anode wears away and no gas is formed. Copper ions are added at one electrode as fast as they are removed at the other, so the blue colour does not change.',
    }),
    sl('concept', 'Copper(II) sulphate with platinum electrodes', {
      b: r`- **Cathode:** the same: $\ce{Cu^2+ + 2e- -> Cu}$.
- **Anode (platinum, inert):** it cannot dissolve, so OH⁻ ions are discharged in preference to SO₄²⁻: $\ce{4OH- -> 2H2O + O2 + 4e-}$. **Oxygen bubbles** form.
- Cu²⁺ ions are removed but **not replaced**, so the **blue colour fades**; H⁺ and SO₄²⁻ are left behind, so the solution becomes **acidic** (sulphuric acid).`,
      v: table(['Feature', 'Copper electrodes', 'Platinum electrodes'], [['Cathode product', 'Copper', 'Copper'], ['Anode change', 'Anode dissolves', 'Oxygen gas'], ['Anode equation', 'Cu → Cu²⁺ + 2e⁻', '4OH⁻ → 2H₂O + O₂ + 4e⁻'], ['Blue colour', 'Unchanged', 'Fades'], ['Solution at the end', 'Still CuSO₄', 'Becomes acidic']], 'Table comparing the electrolysis of copper sulphate solution with copper electrodes and with platinum electrodes'),
      n: 'Now swap the copper anode for platinum. Copper is still deposited at the cathode. But platinum cannot dissolve, so hydroxide ions are discharged at the anode instead, and bubbles of oxygen appear. Copper ions are being removed and nothing replaces them, so the blue colour slowly fades. Hydrogen ions and sulphate ions are left behind, so the solution turns acidic.',
    }),
    sl('example', 'Worked example: comparing the two cells', {
      b: '**Problem.** Two cells contain blue copper(II) sulphate solution. Cell A has copper electrodes; cell B has platinum electrodes. The same current flows for the same time. State what happens to (a) the mass of each cathode, (b) the mass of each anode and (c) the colour of each solution.\n\n**(a)** Both cathodes **gain** the same mass of copper.\n\n**(b)** Copper anode of A **loses** mass (copper dissolves); platinum anode of B is **unchanged** (oxygen is given off).\n\n**(c)** A stays **blue**; B becomes **paler** and finally colourless.',
      v: table(['Observation', 'Cell A (Cu)', 'Cell B (Pt)'], [['Cathode mass', 'Increases', 'Increases'], ['Anode mass', 'Decreases', 'No change'], ['Gas at the anode', 'None', 'Oxygen'], ['Colour', 'Stays blue', 'Fades']], 'Table comparing observations in cell A with copper electrodes and cell B with platinum electrodes'),
      n: 'In both cells copper ions are reduced at the cathode, so both cathodes gain copper. The difference is at the anode. The copper anode dissolves and loses mass, which keeps the solution blue. The platinum anode does not change; instead oxygen is given off, copper ions are not replaced, and the blue colour fades.',
    }),
    sl('check', 'Quick check: active or inert anode?', {
      b: 'Predict what happens at the anode.',
      n: 'Quick check. Ask whether the anode can dissolve. A copper anode can; a platinum anode cannot.',
      chk: 'cuanode-mcq',
    }),
    sl('diagram', 'Electroplating', {
      b: '**Electroplating** is coating an article with a thin layer of a metal by electrolysis, to protect it from corrosion or to improve its appearance.\n\n- **Cathode:** the **article** to be plated (cleaned well).\n- **Anode:** a block of the **plating metal**.\n- **Electrolyte:** a solution of a **salt of the plating metal**.\n- Conditions for a good coat: a **low current** for a **longer time**, a clean article, and a suitable electrolyte; the article may be turned to get an even coat.',
      v: V.nickel,
      n: 'Electroplating coats an object with a thin layer of another metal. The object is always the cathode, the plating metal is the anode, and the electrolyte contains ions of the plating metal. For a smooth, even and firmly stuck coat, clean the object thoroughly and use a small current for a longer time. A large current gives a rough, patchy coat that peels off.',
    }),
    sl('example', 'Worked example: nickel-plating a brass tap', {
      b: r`**Problem.** A brass tap is to be nickel-plated. Name the anode, the cathode and the electrolyte, and write the electrode equations.

**Anode:** a plate of pure **nickel**. **Cathode:** the cleaned **brass tap**. **Electrolyte:** **nickel sulphate** solution.

**Cathode.** $\ce{Ni^2+ + 2e- -> Ni}$: nickel is deposited on the tap.

**Anode.** $\ce{Ni -> Ni^2+ + 2e-}$: the nickel anode dissolves, keeping the concentration of Ni²⁺ constant.`,
      v: table(['Part', 'Nickel plating', 'Silver plating'], [['Anode', 'Nickel', 'Silver'], ['Cathode', 'Article (brass tap)', 'Article (spoon)'], ['Electrolyte', 'Nickel sulphate solution', 'Sodium argentocyanide solution'], ['Cathode reaction', 'Ni²⁺ + 2e⁻ → Ni', 'Ag⁺ + e⁻ → Ag']], 'Table comparing the anode, cathode, electrolyte and cathode reaction in nickel plating and silver plating'),
      n: 'For nickel plating, hang the cleaned brass tap as the cathode and a plate of pure nickel as the anode, in nickel sulphate solution. Nickel ions are reduced on the tap and form a thin coat of nickel. At the same time, the nickel anode dissolves, putting back as many nickel ions as are removed, so the solution stays the same strength.',
    }),
    sl('concept', 'Silver plating: why sodium argentocyanide?', {
      b: 'For silver plating, the anode is pure **silver**, the cathode is the article, and the electrolyte is **sodium argentocyanide**, Na[Ag(CN)₂], solution.\n\n- Cathode: Ag⁺ + e⁻ → Ag. Anode: Ag → Ag⁺ + e⁻.\n- **Silver nitrate is not used:** its high concentration of Ag⁺ ions makes silver deposit **too fast**, giving a rough, uneven coat that does not stick well.\n- The argentocyanide ion releases Ag⁺ ions **slowly**, a few at a time, so the coat is **smooth, even and firmly attached**.',
      v: table(['Electrolyte', 'Supply of Ag⁺ ions', 'Coat'], [['Silver nitrate', 'High, all at once', 'Rough, uneven, peels'], ['Sodium argentocyanide', 'Low, released slowly', 'Smooth, even, firm']], 'Table comparing silver nitrate and sodium argentocyanide as electrolytes for silver plating'),
      n: 'Silver plating uses a silver anode, the article as the cathode, and a solution of sodium argentocyanide. Why not simply use silver nitrate? Silver nitrate supplies a large number of silver ions at once, so silver is deposited too quickly and the coat is rough and patchy. The argentocyanide releases silver ions slowly, so the silver builds up smoothly and evenly and sticks firmly.',
    }),
    sl('check', 'Quick check: silver plating', {
      b: 'Choose the right electrolyte or electrode for silver plating.',
      n: 'Quick check. Think about how fast silver ions should be supplied to get a smooth coat.',
      chk: 'silver-mcq',
    }),
    sl('diagram', 'Electrorefining of copper', {
      b: r`- **Anode:** a thick block of **impure copper**. **Cathode:** a thin sheet of **pure copper**. **Electrolyte:** copper(II) sulphate solution acidified with dilute sulphuric acid.
- **Anode:** $\ce{Cu -> Cu^2+ + 2e-}$. **Cathode:** $\ce{Cu^2+ + 2e- -> Cu}$.
- Copper moves from the anode to the cathode; the anode becomes thinner and the cathode thicker.
- **Impurities:** more reactive metals (zinc, iron) dissolve and **stay in solution** as ions; less reactive metals (silver, gold) do not dissolve and settle below the anode as **anode mud**.`,
      v: V.refine,
      n: 'To purify copper, make a block of impure copper the anode and a thin sheet of pure copper the cathode, in acidified copper sulphate solution. Copper dissolves from the anode and is deposited as pure copper on the cathode. More reactive impurities, like zinc and iron, dissolve but stay in the solution. Less reactive ones, like silver and gold, do not dissolve and fall to the bottom as anode mud.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Acidified water, platinum electrodes: hydrogen at the cathode, oxygen at the anode, volume ratio 2 : 1.',
        'Copper sulphate, copper electrodes: copper anode dissolves, blue colour stays.',
        'Copper sulphate, platinum electrodes: oxygen at the anode, blue colour fades, solution turns acidic.',
        'Electroplating: article = cathode, plating metal = anode, electrolyte contains the plating metal ions; low current.',
        'Silver plating uses sodium argentocyanide; refining copper uses an impure copper anode and a pure copper cathode.',
      ],
      v: table(['Electrolysis', 'Cathode', 'Anode'], [['Acidified water (Pt)', 'H₂', 'O₂'], ['CuSO₄ (Cu)', 'Cu deposited', 'Cu dissolves'], ['CuSO₄ (Pt)', 'Cu deposited', 'O₂'], ['Nickel plating', 'Ni deposited', 'Ni dissolves']], 'Summary table of the cathode and anode changes in four electrolyses'),
      n: 'To sum up Part 2. Acidified water gives twice as much hydrogen as oxygen. In copper sulphate solution, a copper anode dissolves and the colour stays, while a platinum anode gives oxygen and the colour fades. In electroplating the article is the cathode and the plating metal is the anode. Silver plating uses sodium argentocyanide, and copper is refined using an impure copper anode.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Always say whether the anode is active (copper, nickel, silver) or inert (platinum, graphite).',
        'Explain the 2 : 1 ratio with electrons and Avogadro’s law, not just “water is H₂O”.',
        'In plating questions, name all three: anode, cathode and electrolyte.',
        'Give the reason for argentocyanide: slow, steady supply of Ag⁺ ions.',
      ],
      v: table(['Slip', 'Fix'], [['Article made the anode', 'Article is always the cathode'], ['Oxygen at the copper anode', 'A copper anode dissolves; no gas'], ['Silver nitrate for plating', 'Sodium argentocyanide']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. Decide first whether the anode is active or inert, because that decides what happens there. Explain the two to one ratio using electrons and Avogadro’s law. In plating questions, name the anode, the cathode and the electrolyte. And remember why argentocyanide is used: it supplies silver ions slowly and steadily.',
    }),
  ],
});
