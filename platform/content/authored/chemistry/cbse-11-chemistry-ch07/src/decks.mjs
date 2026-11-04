// ch07 Redox Reactions — two decks: Part 1 (t01) oxidation, reduction, oxidation number and its rules, agents;
// Part 2 (t02) types of redox reactions, the Daniell cell, balancing by the oxidation-number and half-reaction methods, redox titration.
import { sl, deck, table, flow, chem, svgV, r, dec, sci, near } from './lib.mjs';
import { MN, CARBON, CLDISP, DANIELL, TITRATION, onOf } from './svgs.mjs';

const assert = (ok, msg) => {
  if (!ok) throw new Error(`deck check failed: ${msg}`);
};

export const V = {
  mn: svgV(MN, 'Ladder of oxidation numbers of manganese: metal zero, manganese two ion plus two, manganese dioxide plus four, manganate plus six, permanganate plus seven', 'Oxidation numbers computed from the formulae with oxygen at minus two.'),
  carbon: svgV(CARBON, 'Ladder of oxidation numbers of carbon from methane at minus four up to carbon dioxide at plus four, each step losing two electrons per carbon atom', 'Stepwise oxidation of carbon: each step removes two electrons.'),
  cl: svgV(CLDISP, 'Disproportionation of chlorine in alkali: chlorine at zero is reduced to chloride at minus one and oxidised to hypochlorite at plus one in cold dilute alkali or to chlorate at plus five in hot concentrated alkali'),
  daniell: svgV(DANIELL, 'A Daniell cell with a zinc anode on the left, a copper cathode on the right, electrons flowing from zinc to copper in the wire and a salt bridge between the two solutions', 'Qualitative picture only; cell potentials are met in Class 12.'),
  titr: svgV(TITRATION, 'A burette of potassium permanganate above a flask of iron two solution in dilute sulfuric acid, with the end point as a faint permanent pink and the ratio one permanganate to five iron two'),
};

// ---- numbers used in worked examples (computed here, asserted, interpolated)
const e1 = {
  cr: onOf([[2, 1], [7, -2]], 0, 2) , // K2Cr2O7: 2(+1) + 2x + 7(−2) = 0
  s4o6: onOf([[6, -2]], -2, 4),
  fe3o4: onOf([[4, -2]], 0, 3),
};
assert(e1.cr === 6 && e1.s4o6 === 2.5 && near(e1.fe3o4, 8 / 3, 1e-9), 'ON examples');
const nh4 = { a: onOf([[4, 1]], 1), b: onOf([[3, -2]], -1) };
assert(nh4.a === -3 && nh4.b === 5, 'NH4NO3');
const feo = { gainPerFe: 3 - 0, nFe: 2, loseC: 4 - 2 };
feo.total = feo.gainPerFe * feo.nFe;
feo.mult = feo.total / feo.loseC;
assert(feo.total === 6 && feo.mult === 3, 'Fe2O3 + CO');
const cu = { lose: 2 - 0, gain: 5 - 4 };
cu.nNO2 = cu.lose / cu.gain;
assert(cu.nNO2 === 2, 'Cu + HNO3');
const ti = { cMn: 0.02, vMn: 20.0, vFe: 25.0 };
ti.nMn = (ti.cMn * ti.vMn) / 1000;
ti.nFe = 5 * ti.nMn;
ti.cFe = (ti.nFe / ti.vFe) * 1000;
assert(near(ti.nMn, 4.0e-4, 1e-9) && near(ti.nFe, 2.0e-3, 1e-9) && near(ti.cFe, 0.08, 1e-9), 'titration example');

export const deck1 = deck({
  part: 1,
  title: 'Redox Reactions — Part 1: Oxidation, reduction and oxidation number',
  goals: [
    'State the classical and electron-transfer definitions of oxidation and reduction',
    'Assign oxidation numbers using the rules, including fractional values, peroxides and superoxides',
    'Identify the oxidising and reducing agents in a reaction from changes in oxidation number',
    'Use Stock notation and distinguish oxidation number from valence',
  ],
  slides: [
    sl('title', 'Redox Reactions', {
      b: 'Part 1 — oxidation and reduction always happen together. We learn to follow the electrons with a bookkeeping number.',
      v: table(['Process', 'What is oxidised', 'Why it matters'], [['Rusting of an iron nail', 'Iron', 'Corrosion costs bridges and ships'], ['Burning of cooking gas', 'The fuel', 'Heat for cooking'], ['A mobile-phone battery working', 'The metal at the negative terminal', 'Portable electricity'], ['Chlorine bleaching a stain', 'The coloured substance', 'Cleaning and disinfecting']], 'Table of everyday redox processes, what is oxidised and why each matters'),
      n: 'Welcome. Rusting, burning fuel, a battery running down and bleach removing a stain all have one thing in common: electrons move from one substance to another. In this part we define oxidation and reduction, and learn the rules for oxidation numbers, which let us track those electrons even in molecules.',
    }),
    sl('concept', 'The classical view', {
      b: 'Early chemists defined the terms by what happens to oxygen, hydrogen or other elements. Oxidation and reduction are **opposite changes in the same reaction**, for example $\\ce{H2S + Cl2 -> 2HCl + S}$, where hydrogen sulfide loses hydrogen.',
      v: table(['Kind of change', 'Oxidation', 'Reduction'], [['Oxygen', 'Addition of oxygen', 'Removal of oxygen'], ['Hydrogen', 'Removal of hydrogen', 'Addition of hydrogen'], ['Electronegative element', 'Addition (Cl₂ added to a metal)', 'Removal'], ['Electropositive element', 'Removal (K removed from KI)', 'Addition (Mg added to a non-metal)']], 'Table of the classical definitions of oxidation and reduction'),
      n: 'In the classical view, oxidation means adding oxygen, removing hydrogen, adding an electronegative element or removing an electropositive one. Reduction is the reverse. When hydrogen sulfide reacts with chlorine, the sulfide loses hydrogen and is oxidised, while chlorine gains hydrogen and is reduced. The two changes cannot happen separately.',
    }),
    sl('concept', 'The electron-transfer view', {
      b: '**Oxidation** is loss of electrons; **reduction** is gain of electrons. The substance that gains electrons (and is itself reduced) is the **oxidising agent**; the one that loses electrons is the **reducing agent**. Each reaction splits into two **half-reactions**.',
      v: table(['Half-reaction', 'Equation', 'Electrons', 'Role of the species'], [['Oxidation', r`$\ce{Zn -> Zn^2+ + 2e-}$`, 'Lost', 'Zn is the reducing agent'], ['Reduction', r`$\ce{Cu^2+ + 2e- -> Cu}$`, 'Gained', r`$\ce{Cu^2+}$ is the oxidising agent`], ['Overall', r`$\ce{Zn + Cu^2+ -> Zn^2+ + Cu}$`, 'Cancel', 'Electrons lost equal electrons gained']], 'Table splitting the reaction of zinc with copper two ions into oxidation and reduction half-reactions'),
      n: 'The modern definition follows electrons. Oxidation is loss of electrons and reduction is gain. When zinc is placed in a copper sulfate solution, each zinc atom gives two electrons and each copper ion takes two. Zinc is the reducing agent, because it supplies electrons, and the copper ion is the oxidising agent, because it takes them.',
    }),
    sl('concept', 'Rules for oxidation numbers', {
      b: 'The **oxidation number** (ON) is the charge an atom would have if all bonding electrons were assigned to the more electronegative atom. Apply the rules in this order of priority.',
      v: table(['Rule', 'Statement', 'Example'], [['1', 'An atom in an element has ON 0', r`$\ce{O2}$, $\ce{S8}$, Fe: 0`], ['2', 'A simple ion has ON equal to its charge', r`$\ce{Al^3+}$: +3, $\ce{S^2-}$: −2`], ['3', 'Sum of ONs equals the charge on the species', r`$\ce{SO4^2-}$: sum −2`], ['4', 'Group 1: +1; group 2: +2; fluorine: −1', 'Na +1, Ca +2'], ['5', 'Hydrogen +1, except in metal hydrides (−1)', 'HCl +1, NaH −1'], ['6', 'Oxygen −2, except peroxides (−1), superoxides (−½), OF₂ (+2)', r`$\ce{H2O2}$ −1`]], 'Table of the rules for assigning oxidation numbers with examples'),
      n: 'Oxidation numbers follow a short list of rules. Atoms in an element are zero. A simple ion has an oxidation number equal to its charge. The numbers in a species always add up to its charge. Alkali metals are plus one, alkaline earth metals plus two, fluorine minus one, hydrogen usually plus one, and oxygen usually minus two, with a few exceptions such as peroxides.',
    }),
    sl('diagram', 'Oxidation numbers of manganese', {
      b: 'One element can take many oxidation numbers. Going **up** the ladder is oxidation (ON rises, electrons lost); going **down** is reduction. Permanganate, at +7, has manganese in its highest state.',
      v: V.mn,
      n: 'Manganese is a good example of an element with many oxidation numbers. The metal is zero. In the manganese two ion it is plus two, in manganese dioxide plus four, in manganate plus six, and in permanganate plus seven. Moving up the ladder means electrons are lost, which is oxidation, and moving down means electrons are gained, which is reduction.',
    }),
    sl('check', 'Quick check: oxidation number', {
      b: 'Find the oxidation number of an element in a compound.',
      n: 'Quick check. Write the sum of all the oxidation numbers and set it equal to the charge of the species.',
      chk: 'p-on-mcq',
    }),
    sl('example', 'Worked example: oxidation numbers', {
      b: r`**Problem.** Find the oxidation number of (i) Cr in $\ce{K2Cr2O7}$, (ii) S in $\ce{S4O6^2-}$, (iii) Fe in $\ce{Fe3O4}$.

**(i)** Let Cr be $x$: $2(+1) + 2x + 7(-2) = 0$, so $2x = 12$ and $x = +${e1.cr}$.

**(ii)** $4x + 6(-2) = -2$, so $4x = 10$ and $x = +${e1.s4o6}$ (an average value).

**(iii)** $3x + 4(-2) = 0$, so $3x = 8$ and $x \approx +${dec(e1.fe3o4, 3)}$ (average of Fe²⁺ and Fe³⁺).`,
      v: table(['Species', 'Atom', 'Working', 'ON'], [[r`$\ce{K2Cr2O7}$`, 'Cr', '2(+1) + 2x − 14 = 0', '+6'], [r`$\ce{S4O6^2-}$`, 'S', '4x − 12 = −2', '+2.5'], [r`$\ce{Fe3O4}$`, 'Fe', '3x − 8 = 0', '+2.67']], 'Table of the working for the oxidation numbers of chromium, sulfur and iron'),
      n: 'Let the unknown oxidation number be x and add everything up. In potassium dichromate, two plus two x minus fourteen equals zero, so chromium is plus six. In the tetrathionate ion, four x minus twelve equals minus two, so sulfur averages two and a half. In the iron oxide, three x minus eight equals zero, so iron averages two and two thirds.',
    }),
    sl('concept', 'Fractional values, peroxides and superoxides', {
      b: 'A fractional ON is an **average** over atoms of the same element in different environments. Oxygen has ON −1 in peroxides (O–O link), −½ in superoxides and +2 in $\\ce{OF2}$, where fluorine is more electronegative.',
      v: table(['Species', 'Atom', 'ON', 'Reason'], [[r`$\ce{H2O2}$`, 'O', '−1', 'Peroxide; O–O bond'], [r`$\ce{KO2}$`, 'O', '−½', 'Superoxide ion O₂⁻, two O share −1'], [r`$\ce{OF2}$`, 'O', '+2', 'F is more electronegative'], [r`$\ce{C3O2}$`, 'C', '+4/3', 'Average over three carbons'], [r`$\ce{CrO5}$`, 'Cr', '+6', 'One O at −2 and four O at −1 (two peroxo groups)']], 'Table of special oxidation numbers in peroxides, superoxides, an oxygen fluoride, carbon suboxide and chromium pentoxide'),
      n: 'Some cases need care. In hydrogen peroxide the oxygen atoms are joined to each other, so each is minus one. In a superoxide such as potassium superoxide, the oxygen is minus one half. In oxygen difluoride, fluorine wins the electrons, so oxygen is plus two. Fractions simply mean an average over atoms in different environments.',
    }),
    sl('concept', 'Spotting a redox reaction', {
      b: 'A reaction is redox if **some oxidation number changes**. The species whose ON rises is oxidised (the reducing agent); the species whose ON falls is reduced (the oxidising agent).',
      v: table(['Reaction', 'ON rises', 'ON falls'], [[r`$\ce{Zn + 2HCl -> ZnCl2 + H2}$`, 'Zn: 0 to +2', 'H: +1 to 0'], [r`$\ce{CuO + H2 -> Cu + H2O}$`, 'H: 0 to +1', 'Cu: +2 to 0'], [r`$\ce{2KI + Cl2 -> 2KCl + I2}$`, 'I: −1 to 0', 'Cl: 0 to −1'], [r`$\ce{NaOH + HCl -> NaCl + H2O}$`, 'None', 'None: not redox']], 'Table of four reactions with the atoms whose oxidation numbers rise or fall'),
      n: 'To decide if a reaction is redox, write the oxidation numbers of each element before and after. If any of them changes, it is redox. The atom whose number goes up has been oxidised, so its compound is the reducing agent. The atom whose number goes down has been reduced, so its compound is the oxidising agent. If nothing changes, as in neutralisation, it is not redox.',
    }),
    sl('example', 'Worked example: oxidant and reductant', {
      b: r`**Problem.** For $\ce{2PbS + 3O2 -> 2PbO + 2SO2}$, find the oxidising and reducing agents.

**Step 1.** ON of S: $-2$ in PbS and $+4$ in $\ce{SO2}$ (rises by 6).

**Step 2.** ON of O: $0$ in $\ce{O2}$ and $-2$ in the products (falls by 2).

**Step 3.** Pb stays at $+2$. So PbS (sulfur) is the **reducing agent** and $\ce{O2}$ is the **oxidising agent**.`,
      v: table(['Element', 'Before', 'After', 'Change', 'Role'], [['S', '−2', '+4', '+6', 'Oxidised'], ['O', '0', '−2', '−2', 'Reduced'], ['Pb', '+2', '+2', '0', 'Spectator']], 'Table of oxidation number changes of sulfur, oxygen and lead in the roasting of lead sulfide'),
      n: 'Write each element before and after. Sulfur goes from minus two to plus four, so it is oxidised and lead sulfide is the reducing agent. Oxygen goes from zero to minus two, so it is reduced and oxygen gas is the oxidising agent. Lead stays at plus two throughout, so it is just a spectator.',
    }),
    sl('check', 'Quick check: oxidising agent', {
      b: 'Decide which species is the oxidising agent.',
      n: 'Quick check. Look for the atom whose oxidation number falls.',
      chk: 'agent-mcq',
    }),
    sl('diagram', 'Oxidation of carbon, step by step', {
      b: 'Carbon in methane, methanol, methanal, methanoic acid and carbon dioxide has ON −4, −2, 0, +2 and +4. Converting methane towards carbon dioxide is a **ladder of oxidations**, each step removing two electrons per carbon.',
      v: V.carbon,
      n: 'Carbon shows a wide range. In methane it is minus four. Replacing hydrogen atoms by oxygen atoms moves it up in steps of two: methanol minus two, methanal zero, methanoic acid plus two, and finally carbon dioxide plus four. Each step is an oxidation and loses two electrons per carbon atom. Burning a fuel completes the whole climb.',
    }),
    sl('concept', 'Oxidation number, valence and Stock notation', {
      b: '**Valence** is the number of bonds an atom forms (no sign); **ON** carries a sign and can be zero or a fraction. In methane and methanal, carbon has valence 4 in both but ON −4 and 0. **Stock notation** writes the metal ON in Roman numerals: iron(III) oxide.',
      v: table(['Formula', 'Metal ON', 'Stock name'], [[r`$\ce{FeO}$`, '+2', 'Iron(II) oxide'], [r`$\ce{Fe2O3}$`, '+3', 'Iron(III) oxide'], [r`$\ce{Cu2O}$`, '+1', 'Copper(I) oxide'], [r`$\ce{SnCl4}$`, '+4', 'Tin(IV) chloride'], [r`$\ce{MnO2}$`, '+4', 'Manganese(IV) oxide']], 'Table of formulas, metal oxidation numbers and Stock names'),
      n: 'Do not confuse valence with oxidation number. Valence counts bonds and has no sign. Oxidation number has a sign and can be zero or a fraction. Carbon forms four bonds in both methane and methanal, but its oxidation numbers differ. Stock notation puts the oxidation number of the metal in Roman numerals in brackets, as in iron three oxide.',
    }),
    sl('concept', 'Common oxidising and reducing agents', {
      b: 'An element in its **highest** oxidation state can only be an oxidising agent; in its **lowest** only a reducing agent; in an **intermediate** state it can be either (for example $\\ce{H2O2}$, $\\ce{SO2}$).',
      v: table(['Oxidising agents', 'Usual reduction product', 'Reducing agents', 'Usual oxidation product'], [['KMnO₄ (acid)', 'Mn²⁺', 'Zn, Fe, other metals', 'Metal ions'], ['K₂Cr₂O₇ (acid)', 'Cr³⁺', 'Fe²⁺', 'Fe³⁺'], ['Cl₂, Br₂', 'Cl⁻, Br⁻', 'I⁻', 'I₂'], ['Conc. HNO₃', 'NO₂', 'H₂S', 'S'], ['H₂O₂', 'H₂O', 'C, CO, H₂', 'CO₂, H₂O']], 'Table of common oxidising and reducing agents with their usual products'),
      n: 'An element at its highest oxidation state can only gain electrons, so it can only be an oxidising agent. At its lowest state it can only lose them, so it is only a reducing agent. At an intermediate state it can do either. Permanganate and dichromate in acid are strong oxidising agents, while metals, iodide and hydrogen sulfide are common reducing agents.',
    }),
    sl('check', 'Quick check: highest and lowest states', {
      b: 'Decide which species cannot act as a reducing agent.',
      n: 'Quick check. Ask whether the element can still lose electrons.',
      chk: 'highest-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Oxidation: loss of electrons, rise in ON; reduction: gain of electrons, fall in ON; they occur together.',
        'Reducing agent loses electrons and is oxidised; oxidising agent gains electrons and is reduced.',
        'ON rules: element 0; ion = charge; sum = overall charge; H +1; O −2 with peroxide (−1), superoxide (−½) and OF₂ (+2) exceptions.',
        'Fractional ON is an average; ON differs from valence; Stock notation gives the metal ON in Roman numerals.',
        'Highest ON: oxidant only; lowest ON: reductant only; intermediate: either.',
      ],
      v: table(['Term', 'Meaning'], [['Oxidation', 'ON increases'], ['Reduction', 'ON decreases'], ['Oxidising agent', 'Gains electrons; is reduced'], ['Reducing agent', 'Loses electrons; is oxidised']], 'Summary table of redox terms'),
      n: 'Let us sum up. Oxidation is loss of electrons and a rise in oxidation number. Reduction is gain and a fall. The reducing agent is oxidised and the oxidising agent is reduced. Follow the rules to assign oxidation numbers, remember the exceptions for peroxides and superoxides, and use the highest and lowest oxidation states to judge what a species can do.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Write the sum of all oxidation numbers equal to the charge before solving for x.',
        'Check for peroxide or superoxide links before assuming oxygen is −2.',
        'Name the agent as the species (the compound), not the atom, and say what happens to it.',
        'Quote fractional ONs as averages and explain with the structure when asked.',
        'Show the ON change for the atom, not the whole formula.',
      ],
      v: table(['Slip', 'Fix'], [['Oxygen always −2', 'Check for O–O bonds and fluorides'], ['Reducing agent is the atom that is reduced', 'The reducing agent is oxidised'], ['Valence and ON are the same', 'ON has a sign and may be a fraction'], ['Sum of ONs is zero for an ion', 'Sum equals the charge']], 'Table of four common slips in oxidation number questions and their fixes'),
      n: 'Some exam tips. Always set the sum of oxidation numbers equal to the charge. Look for peroxide links before using minus two for oxygen. Remember that the reducing agent is the species that is oxidised. And when you meet a fraction, say that it is an average over atoms in different environments.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Redox Reactions — Part 2: Types of redox reactions, balancing and redox titrations',
  goals: [
    'Classify redox reactions as combination, decomposition, displacement and disproportionation',
    'Describe a Daniell cell as redox split between two electrodes',
    'Balance redox equations by the oxidation-number and half-reaction methods in acidic and basic medium',
    'Use mole ratios from balanced redox equations in permanganate titrations',
  ],
  slides: [
    sl('title', 'Types and balancing', {
      b: 'Part 2 — four patterns that cover most redox reactions, and two systematic ways to balance any of them.',
      v: table(['Type', 'General pattern', 'Example'], [['Combination', 'A + B gives AB', r`$\ce{N2 + 3H2 -> 2NH3}$`], ['Decomposition', 'AB gives A + B', r`$\ce{2KClO3 -> 2KCl + 3O2}$`], ['Displacement', 'A + BC gives AC + B', r`$\ce{Zn + CuSO4 -> ZnSO4 + Cu}$`], ['Disproportionation', 'One species gives two products at higher and lower ON', r`$\ce{2H2O2 -> 2H2O + O2}$`]], 'Table of four types of redox reaction with general pattern and an example'),
      n: 'Welcome to part two. Redox reactions fall into four common types: combination, decomposition, displacement and disproportionation. After meeting each, we learn two methods to balance redox equations, the oxidation number method and the half reaction method, and we finish with a titration that uses them.',
    }),
    sl('concept', 'Combination and decomposition', {
      b: 'A **combination** reaction is redox if an element takes part; a **decomposition** is redox if an element is formed. Reactions between compounds with no ON change, such as $\\ce{CaO + CO2 -> CaCO3}$, are **not** redox.',
      v: table(['Reaction', 'Type', 'ON changes', 'Redox?'], [[r`$\ce{N2 + 3H2 -> 2NH3}$`, 'Combination', 'N: 0 to −3; H: 0 to +1', 'Yes'], [r`$\ce{CaO + CO2 -> CaCO3}$`, 'Combination', 'None', 'No'], [r`$\ce{2KClO3 -> 2KCl + 3O2}$`, 'Decomposition', 'Cl: +5 to −1; O: −2 to 0', 'Yes'], [r`$\ce{CaCO3 -> CaO + CO2}$`, 'Decomposition', 'None', 'No']], 'Table of combination and decomposition reactions showing which are redox'),
      n: 'A combination reaction is a redox reaction when one of the reactants is a free element, as when nitrogen and hydrogen make ammonia. A decomposition is redox when a free element appears among the products, as when potassium chlorate gives oxygen. But limestone breaking down, or lime combining with carbon dioxide, changes no oxidation numbers, so these are not redox.',
    }),
    sl('concept', 'Displacement reactions', {
      b: 'In a **displacement** reaction an atom or ion is replaced by another that is a stronger reducing agent (metals) or stronger oxidising agent (non-metals). Activity series (decreasing): K, Na, Ca, Mg, Al, Zn, Fe, Pb, **H**, Cu, Ag, Au.',
      v: table(['Kind', 'Example', 'Replaced by'], [['Metal by metal', r`$\ce{Zn + CuSO4 -> ZnSO4 + Cu}$`, 'A more reactive metal'], ['Hydrogen by metal', r`$\ce{Zn + H2SO4 -> ZnSO4 + H2}$`, 'A metal above hydrogen'], ['Halogen by halogen', r`$\ce{Cl2 + 2KBr -> 2KCl + Br2}$`, 'Order: F₂ > Cl₂ > Br₂ > I₂'], ['Oxygen by fluorine', r`$\ce{2F2 + 2H2O -> 4HF + O2}$`, 'Fluorine is the strongest oxidant']], 'Table of four kinds of displacement reaction with examples'),
      n: 'In a displacement reaction a more reactive element pushes out a less reactive one. A metal above copper in the activity series displaces copper from its solution. A metal above hydrogen displaces hydrogen from an acid. Among the halogens, chlorine displaces bromine and iodine, but not the other way round. Even oxygen in water is displaced by fluorine.',
    }),
    sl('diagram', 'A Daniell cell: redox in two vessels', {
      b: 'Put the oxidation and reduction half-reactions in **separate vessels** joined by a wire and a salt bridge: electrons now flow through the wire and can do work. Oxidation at the **anode**; reduction at the **cathode**.',
      v: V.daniell,
      n: 'In a Daniell cell, zinc sits in zinc sulfate on one side and copper sits in copper sulfate on the other. Zinc atoms lose electrons at the anode, and the electrons travel through the wire to the copper rod, where copper ions pick them up and deposit as copper. The salt bridge lets ions move so that the circuit stays complete.',
    }),
    sl('check', 'Quick check: displacement', {
      b: 'Predict which displacement reaction occurs.',
      n: 'Quick check. Use the activity series: only a more reactive metal can displace a less reactive one.',
      chk: 'displacement-mcq',
    }),
    sl('diagram', 'Disproportionation', {
      b: 'In **disproportionation** one element in one species is **both oxidised and reduced**; it must start in an intermediate ON. Examples: $\\ce{2H2O2 -> 2H2O + O2}$ (O: −1 to −2 and 0) and chlorine in alkali.',
      v: V.cl,
      n: 'In disproportionation, one substance is oxidised and reduced at the same time. Hydrogen peroxide does this when it forms water and oxygen. Chlorine does it in alkali. Starting at zero, chlorine goes down to chloride at minus one and up to hypochlorite at plus one in the cold, or to chlorate at plus five when hot. White phosphorus does the same in alkali, forming phosphine and hypophosphite.',
    }),
    sl('concept', 'Balancing by the oxidation-number method', {
      b: 'Use the fact that **total increase in ON = total decrease in ON**. Work on whole atoms, equalise the changes with multipliers, then balance the other atoms.',
      v: flow('LR', [['a', 'Write the skeletal equation'], ['b', 'Assign ON to every atom'], ['c', 'Find atoms whose ON changes'], ['d', 'Equalise total rise and fall with multipliers'], ['e', 'Balance other atoms, O then H last'], ['f', 'Check atoms and charge']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e'], ['e', 'f']], 'Flow chart of the oxidation number method of balancing a redox equation'),
      n: 'The oxidation number method rests on one idea: what goes up in oxidation number must equal what goes down. Write the skeleton equation, assign oxidation numbers, find the atoms that change, and multiply so the total rise equals the total fall. Then balance the remaining atoms, leaving oxygen and hydrogen for last, and check atoms and charge.',
    }),
    sl('example', 'Worked example: oxidation-number method', {
      b: r`**(a) Balance** $\ce{Fe2O3 + CO -> Fe + CO2}$. Fe: $+3 \to 0$, a fall of ${feo.gainPerFe} per atom, so ${feo.nFe} Fe fall by ${feo.total}. C: $+2 \to +4$, a rise of ${feo.loseC}. Multiplier ${feo.mult} for CO and CO₂: $\ce{Fe2O3 + 3CO -> 2Fe + 3CO2}$.

**(b) Balance** $\ce{Cu + HNO3 -> Cu(NO3)2 + NO2 + H2O}$ (concentrated acid). Cu rises by ${cu.lose}; N (to NO₂) falls by ${cu.gain}, so ${cu.nNO2} $\ce{NO2}$ per Cu. Add 2 nitrate for the salt: $\ce{Cu + 4HNO3 -> Cu(NO3)2 + 2NO2 + 2H2O}$.`,
      v: table(['Step', 'Fe₂O₃ + CO', 'Cu + HNO₃'], [['ON change', 'Fe falls 3 each; C rises 2', 'Cu rises 2; N falls 1'], ['Equalise', '6 = 3 × 2', '2 = 2 × 1'], ['Multipliers', '3 CO, 2 Fe', '2 NO₂ per Cu'], ['Final', r`$\ce{Fe2O3 + 3CO -> 2Fe + 3CO2}$`, r`$\ce{Cu + 4HNO3 -> Cu(NO3)2 + 2NO2 + 2H2O}$`]], 'Table of the steps of the oxidation number method for the reduction of iron oxide and for copper with concentrated nitric acid'),
      n: 'For the iron oxide, each iron falls by three and there are two iron atoms, a total fall of six. Each carbon rises by two, so three carbon monoxide balance it. For copper with concentrated nitric acid, copper rises by two and each nitrogen falls by one, so two nitrogen dioxide appear per copper. Two more nitrates are needed for the salt, so four nitric acid are used.',
    }),
    sl('concept', 'Balancing by the half-reaction method', {
      b: 'Split the reaction into two half-reactions and balance each **atom by atom and charge by charge**. In **acidic** medium use $\\ce{H2O}$ and $\\ce{H+}$; for **basic** medium balance as in acid, then add $\\ce{OH-}$ equal to the $\\ce{H+}$ on **both** sides.',
      v: flow('TB', [['a', 'Write the two half-reactions'], ['b', 'Balance atoms other than O and H'], ['c', 'Balance O with water'], ['d', 'Balance H with H⁺'], ['e', 'Balance charge with electrons'], ['f', 'Multiply to equalise electrons and add'], ['g', 'Basic medium: add OH⁻ to cancel H⁺']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e'], ['e', 'f'], ['f', 'g']], 'Flow chart of the half-reaction method for acidic and basic medium'),
      n: 'In the half reaction method we balance oxidation and reduction separately. Balance every atom except oxygen and hydrogen, then oxygen with water, then hydrogen with hydrogen ions, and finally charge with electrons. Multiply so that the electrons match and add the two halves. For a basic solution, add hydroxide ions to both sides to cancel the hydrogen ions.',
    }),
    sl('example', 'Worked example: acidic medium', {
      b: r`**Problem.** Balance $\ce{MnO4- + Fe^2+ -> Mn^2+ + Fe^3+}$ in acid.

**Reduction:** $\ce{MnO4- + 8H+ + 5e- -> Mn^2+ + 4H2O}$

**Oxidation (×5):** $\ce{5Fe^2+ -> 5Fe^3+ + 5e-}$

**Add:** $\ce{MnO4- + 8H+ + 5Fe^2+ -> Mn^2+ + 5Fe^3+ + 4H2O}$. Charge: $-1 + 8 + 10 = +17$ on the left; $+2 + 15 = +17$ on the right.`,
      v: table(['Half-reaction', 'Equation', 'Electrons'], [['Reduction', r`$\ce{MnO4- + 8H+ + 5e- -> Mn^2+ + 4H2O}$`, '5 gained'], ['Oxidation × 5', r`$\ce{5Fe^2+ -> 5Fe^3+ + 5e-}$`, '5 lost'], ['Sum', r`$\ce{MnO4- + 8H+ + 5Fe^2+ -> Mn^2+ + 5Fe^3+ + 4H2O}$`, 'Cancel']], 'Table of the two half-reactions and the sum for permanganate oxidising iron two in acid'),
      n: 'Permanganate goes to manganese two. Four oxygens need four waters, which need eight hydrogen ions, and the charge needs five electrons. Iron two to iron three gives only one electron, so multiply it by five. Adding the halves, the electrons cancel and we get one permanganate with eight hydrogen ions and five iron ions. The charge is plus seventeen on both sides.',
    }),
    sl('check', 'Quick check: half-reaction', {
      b: 'Complete a half-reaction in acidic medium.',
      n: 'Quick check. Balance oxygen with water, hydrogen with hydrogen ions, then charge with electrons.',
      chk: 'half-mcq',
    }),
    sl('example', 'Worked example: basic medium', {
      b: r`**Problem.** Balance $\ce{MnO4- + I- -> MnO2 + I2}$ in basic medium.

**Reduction:** $\ce{MnO4- + 2H2O + 3e- -> MnO2 + 4OH-}$

**Oxidation:** $\ce{2I- -> I2 + 2e-}$

**Multiply** the first by 2 and the second by 3, then add: $\ce{2MnO4- + 6I- + 4H2O -> 2MnO2 + 3I2 + 8OH-}$. Charge: $-2 - 6 = -8$ on both sides.`,
      v: table(['Half-reaction', 'Multiplier', 'Electrons'], [[r`$\ce{MnO4- + 2H2O + 3e- -> MnO2 + 4OH-}$`, '× 2', '6 gained'], [r`$\ce{2I- -> I2 + 2e-}$`, '× 3', '6 lost'], [r`$\ce{2MnO4- + 6I- + 4H2O -> 2MnO2 + 3I2 + 8OH-}$`, 'Sum', 'Cancel']], 'Table of the half-reactions and the sum for permanganate and iodide in basic medium'),
      n: 'In basic solution permanganate is reduced to manganese dioxide. Written with water on the left and hydroxide on the right, it takes three electrons. Iodide loses two electrons per iodine molecule. Multiply by two and by three so six electrons are gained and lost, and add. The hydroxide appears on the right, and the charge is minus eight on both sides.',
    }),
    sl('diagram', 'Redox titration with permanganate', {
      b: 'In acid, $\\ce{MnO4-}$ takes **5** electrons and $\\ce{Fe^2+}$ gives **1**, so **1 mol MnO₄⁻ reacts with 5 mol Fe²⁺**. Permanganate is its own indicator. Use dilute **sulfuric** acid, not hydrochloric or nitric acid.',
      v: V.titr,
      n: 'Permanganate is purple and its product in acid, manganese two, is nearly colourless, so no indicator is needed. The end point is the first faint pink colour that stays. The acid must be dilute sulfuric acid. Hydrochloric acid would itself be oxidised by permanganate, and nitric acid is itself an oxidising agent, so both would spoil the result.',
    }),
    sl('example', 'Worked example: titration calculation', {
      b: r`**Problem.** $25.0\ \text{mL}$ of an iron(II) solution needs $20.0\ \text{mL}$ of $0.0200\ \text{mol L}^{-1}$ $\ce{KMnO4}$ in acid. Find the molarity of iron(II).

**Step 1.** $n(\text{MnO}_4^-) = 0.0200 \times \dfrac{20.0}{1000} = ${sci(ti.nMn, 3)}\ \text{mol}$.

**Step 2.** $n(\text{Fe}^{2+}) = 5 \times ${sci(ti.nMn, 3)} = ${sci(ti.nFe, 3)}\ \text{mol}$.

**Step 3.** $c = \dfrac{${sci(ti.nFe, 3)}}{25.0/1000} = ${dec(ti.cFe, 3)}\ \text{mol L}^{-1}$.`,
      v: table(['Quantity', 'Value'], [['Moles of MnO₄⁻', '4.00 × 10⁻⁴ mol'], ['Mole ratio', '1 : 5'], ['Moles of Fe²⁺', '2.00 × 10⁻³ mol'], ['Molarity of Fe²⁺', '0.0800 mol L⁻¹']], 'Table of the quantities in the permanganate titration of iron two'),
      n: 'First find the moles of permanganate used: the concentration times the volume in litres. Then multiply by five, because one permanganate oxidises five iron two ions. Finally divide the moles of iron by the volume of the sample in litres to get the concentration, about zero point zero eight zero moles per litre.',
    }),
    sl('check', 'Quick check: titration', {
      b: 'Choose the correct reason for a feature of the titration.',
      n: 'Quick check. Think about what else in the flask could react with permanganate.',
      chk: 'titre-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Types: combination, decomposition, displacement and disproportionation; many of each are not redox if no ON changes.',
        'A Daniell cell separates oxidation (anode) and reduction (cathode); electrons flow through the wire.',
        'Oxidation-number method: total rise = total fall; then balance the other atoms.',
        'Half-reaction method: balance O with H₂O, H with H⁺, charge with e⁻; for basic medium add OH⁻ to cancel H⁺.',
        'In acid, 1 MnO₄⁻ reacts with 5 Fe²⁺; use dilute H₂SO₄.',
      ],
      v: table(['Method', 'Best for', 'Key step'], [['Oxidation number', 'Molecular and simple ionic equations', 'Total rise = total fall'], ['Half-reaction', 'Ionic equations in acid or base', 'Balance O, H, charge in each half'], ['Titration ratio', 'Volumetric analysis', 'Mole ratio from the balanced equation']], 'Summary table of balancing methods and the titration ratio'),
      n: 'Let us sum up. Redox reactions can be classified as combination, decomposition, displacement and disproportionation. A cell separates oxidation and reduction. To balance, either equalise the changes in oxidation number or balance two half reactions, adding hydroxide for basic solutions. And a balanced equation gives the mole ratio for titrations, such as one permanganate to five iron two.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Label the oxidation and reduction half-reactions and state the electrons.',
        'Check atoms and charge on both sides of the final equation.',
        'For basic medium, add OH⁻ to both sides and cancel water; do not leave H⁺ in the answer.',
        'In titrations, write the balanced equation first and take the mole ratio from it.',
        'Disproportionation needs one element going both up and down from an intermediate ON.',
      ],
      v: table(['Slip', 'Fix'], [['Electrons not equalised', 'Multiply each half-reaction first'], ['H⁺ left in a basic-medium equation', 'Add OH⁻ to both sides and cancel water'], ['Ratio 1 : 1 for MnO₄⁻ and Fe²⁺', 'The ratio is 1 : 5'], ['Using HCl to acidify permanganate', 'Use dilute H₂SO₄']], 'Table of four common slips in balancing and titration questions and their fixes'),
      n: 'Some exam tips. Equalise electrons before adding half reactions. For a basic medium, add hydroxide to both sides and cancel the water, so no hydrogen ions remain. In titrations, always take the mole ratio from the balanced equation, and remember that permanganate is acidified with dilute sulfuric acid, never hydrochloric acid.',
    }),
  ],
});
