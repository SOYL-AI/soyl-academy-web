// ISC 11 Chemistry ch16 Redox Reactions: two decks.
// Part 1 (t01-t02): oxidation and reduction, agents, oxidation number rules and calculation, redox as change in oxidation number.
// Part 2 (t03-t04): balancing by the oxidation number method and the ion-electron method (acidic and basic media), types of redox reaction.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { ON_CL, E_TRANSFER, ON_METHOD, HALF_RX, TYPES4, DISPROP } from './svgs.mjs';
import { ON, EQ, sg, solveON } from './data.mjs';

export const V = {
  etr: svgV(E_TRANSFER, 'Two sodium atoms give electrons to a chlorine molecule: sodium is oxidised and chlorine reduced', 'Oxidation is loss of electrons; reduction is gain.'),
  cl: svgV(ON_CL, 'Number line of the oxidation numbers of chlorine from minus one to plus seven', 'Oxidation raises the oxidation number.'),
  onm: svgV(ON_METHOD, 'Oxidation number method: manganese falls by five, iron rises by one, so five iron per manganese', 'Total fall = total rise.'),
  half: svgV(HALF_RX, 'Ion-electron method: two half reactions share five electrons and add up to the balanced equation', 'Electrons cancel when the halves are added.'),
  types: svgV(TYPES4, 'Combination, decomposition, displacement and disproportionation with examples', 'Four types of redox reaction.'),
  disp: svgV(DISPROP, 'Chlorine in cold alkali is oxidised to hypochlorite and reduced to chloride in the same reaction', 'Disproportionation: one element, two products.'),
};
const ce = (eq) => `$\\ce{${eq}}$`;

// ---- computed oxidation numbers used in slides
const cr = ON.K2Cr2O7.Cr;
const s2 = ON.S2O3.S;
const mn6 = ON.MnO4_2.Mn;
const s4 = ON.Na2S4O6.S;
const nHNO3 = ON.HNO3.N;
const sO4 = ON.SO4_2.S;
const sO3 = ON.SO3_2.S;
const cuFall = 5; // Mn +7 to +2

export const deck1 = deck({
  part: 1,
  title: 'Redox Reactions — Part 1: Oxidation, reduction and oxidation numbers',
  goals: [
    'Define oxidation and reduction in terms of oxygen, hydrogen and electrons, and identify oxidising and reducing agents',
    'Assign and calculate oxidation numbers in molecules and ions using the rules, including K2Cr2O7 and S2O3 2-',
    'Recognise a redox reaction from the change in oxidation numbers',
  ],
  slides: [
    sl('title', 'Electron bookkeeping', {
      b: 'Part 1: many reactions, from rusting to respiration, move **electrons** between substances. We learn a language for this: **oxidation, reduction** and the **oxidation number**.',
      v: V.etr,
      n: 'Burning, rusting, and the cells that power a torch all depend on the transfer of electrons from one substance to another. In this part we meet the language for describing that transfer: oxidation, reduction, and a counting scheme called the oxidation number.',
    }),
    sl('concept', 'Oxygen and hydrogen view', {
      b: r`The older definitions: **oxidation** is the **gain of oxygen** or the **loss of hydrogen**; **reduction** is the **loss of oxygen** or the **gain of hydrogen**. Addition of an electronegative element is oxidation; addition of an electropositive element is reduction.`,
      v: table(['Change', 'Type', 'Example'], [['Gain of oxygen', 'Oxidation', '2Mg + O₂ → 2MgO'], ['Loss of oxygen', 'Reduction', 'Fe₂O₃ + 3CO → 2Fe + 3CO₂ (iron oxide reduced)'], ['Loss of hydrogen', 'Oxidation', 'H₂S + Cl₂ → 2HCl + S (H₂S oxidised)'], ['Gain of hydrogen', 'Reduction', 'N₂ + 3H₂ → 2NH₃ (nitrogen reduced)']], 'Table of oxidation and reduction defined as gain or loss of oxygen or hydrogen with examples'),
      n: 'Early chemists defined oxidation as the gain of oxygen or the loss of hydrogen, and reduction as the opposite. Magnesium burning in air gains oxygen, so it is oxidised. Iron oxide heated with carbon monoxide loses oxygen, so it is reduced. These ideas work but they are limited to reactions with oxygen or hydrogen.',
    }),
    sl('concept', 'The electron view and the two agents', {
      b: r`**Oxidation** is the **loss of electrons**; **reduction** is the **gain of electrons**. They occur together, so the reaction is a **redox** reaction. The substance that **gains** electrons (is reduced) is the **oxidising agent**; the one that **loses** electrons (is oxidised) is the **reducing agent**. Examples: ${ce(EQ.hFe)} and ${ce(EQ.hCu)}.`,
      v: table(['Process', 'Electrons', 'Agent role', 'Oxidation number'], [['Oxidation', 'Lost', 'Substance is the reducing agent', 'Increases'], ['Reduction', 'Gained', 'Substance is the oxidising agent', 'Decreases']], 'Table linking oxidation and reduction with electrons, agent role and oxidation number'),
      n: 'The modern definition is about electrons. Oxidation is loss of electrons and reduction is gain. They always happen together. The substance that is reduced takes electrons, so it is the oxidising agent. The substance that is oxidised gives electrons, so it is the reducing agent. Remember it this way: the agent is named by what it does to the other substance.',
    }),
    sl('example', 'Worked example: name the agents', {
      b: r`**Problem.** For each reaction, say what is oxidised and reduced and name the agents. (i) ${ce(EQ.NaCl2)} (ii) ${ce(EQ.ClKI)}

(i) Na loses an electron, $\ce{Na -> Na+}$: Na is oxidised, a reducing agent. $\ce{Cl2}$ gains electrons, $\ce{Cl2 + 2e- -> 2Cl-}$: reduced, an oxidising agent.

(ii) $\ce{I-}$ loses an electron to give $\ce{I2}$: iodide is oxidised, the reducing agent. $\ce{Cl2}$ is reduced to $\ce{Cl-}$, the oxidising agent.`,
      v: table(['Reaction', 'Oxidised (reducing agent)', 'Reduced (oxidising agent)'], [['2Na + Cl₂ → 2NaCl', 'Na', 'Cl₂'], ['Cl₂ + 2KI → 2KCl + I₂', 'I⁻ (in KI)', 'Cl₂']], 'Table of the substance oxidised and reduced and the agents in two reactions'),
      n: 'In the first reaction sodium gives up an electron, so sodium is oxidised and acts as the reducing agent. Chlorine takes the electrons, so it is reduced and is the oxidising agent. In the second reaction the same chlorine takes electrons from iodide ions, so iodide is oxidised and chlorine is again the oxidising agent.',
    }),
    sl('check', 'Quick check: spotting the agent', {
      b: 'Decide which species gains electrons and which loses them.',
      n: 'Quick check. Read the reaction in the question and decide which substance loses electrons and which gains them. Then use what you know about the agents to name the oxidising agent or the reducing agent, and choose your answer.',
      chk: 'chk-agent-mcq',
    }),
    sl('concept', 'Oxidation number: the idea and the rules', {
      b: 'The **oxidation number (ON)** is the charge an atom would have if all shared electrons were given to the **more electronegative** atom. It lets us follow electrons even in covalent compounds.',
      v: table(['Rule', 'Statement'], [['1', 'ON of an atom in an element is 0 (Na, O₂, S₈, P₄)'], ['2', 'ON of a monatomic ion equals its charge (Cu²⁺ is +2)'], ['3', 'Sum of ON in a neutral compound is 0; in an ion it equals the charge'], ['4', 'Group 1 is +1, group 2 is +2, fluorine is −1 always'], ['5', 'H is +1 (−1 in metal hydrides); O is −2 (−1 in peroxides, +2 in OF₂)']], 'Table of the five rules for assigning oxidation numbers'),
      n: 'The oxidation number is the charge an atom would carry if the bonding electrons went entirely to the more electronegative atom. Five rules let us assign it. Atoms in elements are zero. Simple ions carry their charge. The numbers add up to the overall charge. Alkali metals are plus one, fluorine is minus one, and hydrogen and oxygen have the usual values plus one and minus two.',
    }),
    sl('concept', 'Exceptions, and fractional oxidation numbers', {
      b: r`Hydrogen is **−1** in hydrides ($\ce{NaH}$, $\ce{CaH2}$). Oxygen is **−1** in peroxides ($\ce{H2O2}$) and **+2** in $\ce{OF2}$. An **average** ON can be fractional, e.g. S in $\ce{Na2S4O6}$ is $${sg(s4)}$: it is an **average** of atoms with different actual numbers. Fluorine never shows a positive ON.`,
      v: table(['Species', 'Atom', 'ON', 'Reason'], [['CaH₂', 'H', sg(ON.CaH2.H), 'Bonded to a metal'], ['H₂O₂', 'O', sg(ON.H2O2.O), 'O–O bond'], ['OF₂', 'O', sg(ON.OF2.O), 'F is more electronegative'], ['Na₂S₄O₆', 'S (average)', sg(s4), 'Four S atoms share +10']], 'Table of exceptional and fractional oxidation numbers with reasons'),
      n: 'Some atoms break the usual pattern. Hydrogen is minus one when it is joined to a metal. Oxygen is minus one in peroxides. In oxygen difluoride oxygen is plus two, because fluorine is the most electronegative element. An average oxidation number can be a fraction, which only means that different atoms of the same element have different actual numbers.',
    }),
    sl('diagram', 'Chlorine across its oxidation states', {
      b: r`Chlorine shows ON from **−1 to +7**. Moving **right** on the line is oxidation; moving **left** is reduction. A species at the top of the range (ClO₄⁻) can only be **reduced**; one at the bottom (Cl⁻) can only be **oxidised**; intermediate ones can do both.`,
      v: V.cl,
      n: 'This line shows chlorine in six forms. Moving to the right is oxidation, because the oxidation number goes up. Moving to the left is reduction. Perchlorate has the highest number and can only be reduced. Chloride has the lowest and can only be oxidised. Species in between, such as hypochlorite, can act either way.',
    }),
    sl('example', 'Worked example: calculating oxidation numbers', {
      b: r`**(a)** $\ce{K2Cr2O7}$: $2(+1) + 2x + 7(-2) = 0$, so $x = ${sg(cr)}$ for Cr.

**(b)** $\ce{S2O3^2-}$: $2x + 3(-2) = -2$, so $x = ${sg(s2)}$ for S.

**(c)** $\ce{MnO4^2-}$: $x + 4(-2) = -2$, so $x = ${sg(mn6)}$ for Mn.

**(d)** $\ce{Na2S4O6}$: $2(+1) + 4x + 6(-2) = 0$, so $x = ${sg(s4)}$ (average) for S.`,
      v: table(['Species', 'Equation', 'ON found'], [['K₂Cr₂O₇', '2(+1) + 2x + 7(−2) = 0', `Cr ${sg(cr)}`], ['S₂O₃²⁻', '2x + 3(−2) = −2', `S ${sg(s2)}`], ['MnO₄²⁻', 'x + 4(−2) = −2', `Mn ${sg(mn6)}`], ['Na₂S₄O₆', '2(+1) + 4x + 6(−2) = 0', `S ${sg(s4)} (average)`]], 'Table of four oxidation number calculations with the equation used'),
      n: 'Set up one equation for the unknown atom. In the first case, two potassium atoms contribute plus two, seven oxygens contribute minus fourteen, so the two chromium atoms must supply plus twelve, which is plus six each. For thiosulphate the sum must equal the ion charge, not zero, and sulphur comes out at plus two.',
    }),
    sl('check', 'Quick check: finding an oxidation number', {
      b: 'Write the sum equation and solve for the unknown.',
      n: 'Quick check. Write the sum of the oxidation numbers for the species in the question, using the charge of the whole species on the right-hand side. Solve for the unknown atom and compare with the options.',
      chk: 'chk-on-mcq',
    }),
    sl('concept', 'Redox as a change in oxidation number', {
      b: r`A reaction is a **redox reaction** if the ON of at least one element **changes**. **Oxidation** is an **increase** in ON; **reduction** is a **decrease**. The **total increase** equals the **total decrease**. If no ON changes, the reaction is not redox (precipitation, neutralisation).`,
      v: table(['Reaction', 'ON changes', 'Redox?'], [['Zn + 2H⁺ → Zn²⁺ + H₂', 'Zn 0 → +2; H +1 → 0', 'Yes'], ['AgNO₃ + NaCl → AgCl + NaNO₃', 'None', 'No'], ['HCl + NaOH → NaCl + H₂O', 'None', 'No'], ['N₂ + O₂ → 2NO', 'N 0 → +2; O 0 → −2', 'Yes']], 'Table of four reactions with oxidation number changes and whether each is redox'),
      n: 'Count the oxidation numbers on both sides. If at least one element changes, the reaction is redox. The element that goes up is oxidised, the one that goes down is reduced, and the total rise equals the total fall. Precipitation and neutralisation reactions leave every oxidation number unchanged, so they are not redox.',
    }),
    sl('example', 'Worked example: is it redox?', {
      b: r`**Problem.** Use ON to decide which reactions are redox, and name the oxidising agent where they are.

(i) $\ce{2KI + Cl2 -> 2KCl + I2}$: I: $-1 \to 0$ (oxidised); Cl: $0 \to -1$ (reduced). **Redox**; Cl₂ is the oxidising agent.

(ii) $\ce{BaCl2 + Na2SO4 -> BaSO4 + 2NaCl}$: Ba +2, Cl −1, Na +1, S +6 on both sides. **Not redox**.

(iii) ${ce(EQ.Fe2O3CO)}: Fe $+3 \to 0$; C $+2 \to +4$. **Redox**; Fe₂O₃ is the oxidising agent and CO the reducing agent.`,
      v: table(['Reaction', 'Oxidised', 'Reduced', 'Redox?'], [['2KI + Cl₂ → 2KCl + I₂', 'I', 'Cl', 'Yes'], ['BaCl₂ + Na₂SO₄ → BaSO₄ + 2NaCl', '—', '—', 'No'], ['Fe₂O₃ + 3CO → 2Fe + 3CO₂', 'C in CO', 'Fe in Fe₂O₃', 'Yes']], 'Table of three reactions with the element oxidised, reduced and whether each is redox'),
      n: 'In the first reaction iodine rises and chlorine falls, so it is redox. In the second, barium sulphate precipitates, but every oxidation number is the same on both sides, so it is not redox. In the third, iron falls from plus three to zero and carbon rises from plus two to plus four, so iron oxide is the oxidising agent.',
    }),
    sl('check', 'Quick check: redox or not?', {
      b: 'Compare oxidation numbers on the two sides.',
      n: 'Quick check. Look at the statement in the question about the reaction, and think about oxidation numbers. Ask whether any element changes its oxidation number. Then decide whether the statement is true or false, and explain it in one sentence.',
      chk: 'chk-redox-tf',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Oxidation: gain of oxygen, loss of hydrogen, loss of electrons, increase in ON. Reduction is the reverse.',
        'Oxidising agent: gains electrons, is reduced, its ON falls. Reducing agent: loses electrons, is oxidised, its ON rises.',
        'ON rules: element 0; monatomic ion = charge; sum = charge of species; F −1; H +1 (−1 in hydrides); O −2 (−1 in peroxides).',
        'K₂Cr₂O₇: Cr +6; S₂O₃²⁻: S +2. Average ON may be fractional.',
        'A reaction is redox if any ON changes; total rise = total fall.',
      ],
      v: table(['Quantity', 'Redox meaning'], [['ON rises', 'Oxidation'], ['ON falls', 'Reduction'], ['Total rise = total fall', 'Basis for balancing'], ['No ON change', 'Not redox']], 'Summary table of the redox meaning of changes in oxidation number'),
      n: 'Let us sum up Part One. Oxidation is loss of electrons and a rise in oxidation number. Reduction is gain and a fall. The oxidising agent is reduced and the reducing agent is oxidised. We assign oxidation numbers with a small set of rules, and a reaction is redox only if some oxidation number changes.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Show the sum equation when calculating an ON: sum equals the charge of the species, not always zero.',
        'Name the agent by what it does: the oxidising agent is the species that is reduced.',
        'Always write the sign with an ON (+6, −1) and say "average" for fractional values.',
        'Justify "redox" by quoting the ON before and after for the element that changes.',
        'Peroxides (O −1), OF₂ (O +2) and hydrides (H −1) are favourite exceptions.',
      ],
      v: table(['Slip', 'Fix'], [['Calling the species that is oxidised the oxidising agent', 'It is the reducing agent'], ['Setting the sum to 0 for an ion', 'Set it equal to the ion charge'], ['Taking O as −2 in H₂O₂', 'O is −1 in peroxides']], 'Table of common slips in Part 1 and their fixes'),
      n: 'Some exam tips for Part One. Show the sum equation for any oxidation number. Remember that the oxidising agent is the species that is itself reduced. Always write the sign. Quote the before and after oxidation numbers to prove a reaction is redox. And watch for peroxides, hydrides and oxygen difluoride.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Redox Reactions — Part 2: Balancing redox equations and types of redox reaction',
  goals: [
    'Balance redox equations in acidic and basic media by the oxidation number method',
    'Balance redox equations by the ion-electron (half-reaction) method, checking atoms and charge',
    'Classify redox reactions as combination, decomposition, displacement or disproportionation',
  ],
  slides: [
    sl('title', 'Balancing redox equations', {
      b: 'Part 2: a balanced redox equation must conserve **atoms and charge**, and the **electrons lost must equal the electrons gained**. Two systematic methods do this. Then we classify redox reactions.',
      v: flow('LR', [['a', 'Skeletal equation'], ['b', 'Oxidation number method'], ['c', 'Ion-electron method'], ['d', 'Check atoms and charge'], ['e', 'Types of redox reaction']], [['a', 'b'], ['a', 'c'], ['b', 'd'], ['c', 'd'], ['d', 'e']], 'Flow chart from a skeletal equation through two balancing methods to the check and the types of redox reaction'),
      n: 'In this part we learn to balance redox equations, which are often too complicated for trial and error. We study two methods. One uses oxidation numbers and the other uses half reactions with electrons. Either way, we finish by checking that both atoms and charge are balanced. Then we classify redox reactions into four types.',
    }),
    sl('concept', 'The oxidation number method: steps', {
      b: 'Start from the **skeletal** (unbalanced) equation.',
      v: flow('TB', [['a', '1. Write the skeletal equation'], ['b', '2. Assign ON; find the atoms that change'], ['c', '3. Find the rise and fall per atom'], ['d', '4. Multiply to make total rise equal total fall'], ['e', '5. Balance other atoms; O with H2O, H with H+'], ['f', '6. Check atoms and charge']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e'], ['e', 'f']], 'Flow chart of the six steps of the oxidation number method'),
      n: 'The oxidation number method has six steps. Write the skeletal equation. Assign oxidation numbers and find which atoms change. Work out the rise and the fall for each. Multiply so that the total rise equals the total fall. Balance the remaining atoms, oxygen with water and hydrogen with hydrogen ions. Finally check both atoms and charge.',
    }),
    sl('diagram', 'Equalising the rise and the fall', {
      b: r`For the skeletal equation $\ce{MnO4- + Fe^2+ -> Mn^2+ + Fe^3+}$: Mn falls by **5**, Fe rises by **1**. Five Fe atoms are needed for each Mn.`,
      v: V.onm,
      n: 'In this skeletal equation manganese falls from plus seven to plus two, a fall of five. Iron rises from plus two to plus three, a rise of one. To make the total rise equal the total fall, five iron ions are needed for every one permanganate ion. This fixes the ratio before we balance anything else.',
    }),
    sl('example', 'Worked example: permanganate and iron(II), oxidation number method', {
      b: r`**Skeletal equation (acidic medium):** $\ce{MnO4- + Fe^2+ -> Mn^2+ + Fe^3+}$

1. ON: Mn $+7 \to +2$ (fall 5); Fe $+2 \to +3$ (rise 1).
2. Multiply $\ce{Fe^2+}$ and $\ce{Fe^3+}$ by 5: $\ce{MnO4- + 5Fe^2+ -> Mn^2+ + 5Fe^3+}$.
3. Charge: left $-1 + 10 = +9$, right $+2 + 15 = +17$. Add $8\ \ce{H+}$ to the left in acidic medium.
4. Balance O: 4 O on the left, so $4\ \ce{H2O}$ on the right; H now balances (8 each).

${ce(EQ.MnFe)} Check: atoms Mn 1, O 4, H 8, Fe 5; charge $+17$ on each side.`,
      v: table(['Check', 'Left', 'Right'], [['Mn', '1', '1'], ['O', '4', '4'], ['H', '8', '8'], ['Fe', '5', '5'], ['Charge', '+17', '+17']], 'Table checking atoms and charge of the balanced permanganate iron(II) equation'),
      n: 'Start by finding the rise and fall. Multiply the iron species by five. Then compare the charges. The left side has plus nine and the right side plus seventeen, so add eight hydrogen ions to the left in acidic solution. The oxygen on the left then needs four water molecules on the right, which also balances the hydrogen. Check atoms and charge at the end.',
    }),
    sl('concept', 'The ion-electron method: steps', {
      b: 'Split the skeletal equation into an **oxidation half** and a **reduction half** and balance each separately.',
      v: flow('TB', [['a', '1. Write the two half-reactions'], ['b', '2. Balance atoms other than O and H'], ['c', '3. Balance O by adding H2O'], ['d', '4. Balance H by adding H+'], ['e', '5. Balance charge by adding electrons'], ['f', '6. Multiply to equalise electrons, add, cancel'], ['g', '7. Basic medium: add OH- to turn H+ into H2O']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e'], ['e', 'f'], ['f', 'g']], 'Flow chart of the steps of the ion-electron method including the extra step for basic medium'),
      n: 'The ion electron method balances each half reaction on its own. Balance the main atoms, then oxygen with water, then hydrogen with hydrogen ions, then charge with electrons. Multiply the halves so the electrons are equal, add, and cancel. In basic solution there is one extra step, where hydroxide ions are added to turn the hydrogen ions into water.',
    }),
    sl('diagram', 'Two half-reactions sharing electrons', {
      b: r`The oxidation half $\ce{Fe^2+ -> Fe^3+ + e-}$ is multiplied by 5; the reduction half takes in the 5 electrons. Adding gives the same equation as before.`,
      v: V.half,
      n: 'Here the two half reactions are drawn side by side. Five iron two plus ions lose five electrons in total. Those five electrons are taken up by permanganate with eight hydrogen ions to form manganese two plus and four water molecules. Add the halves, the electrons cancel, and the balanced equation appears.',
    }),
    sl('example', 'Worked example: dichromate and iron(II), ion-electron method', {
      b: r`**Skeletal:** $\ce{Cr2O7^2- + Fe^2+ -> Cr^3+ + Fe^3+}$ (acidic medium).

Oxidation: ${ce(EQ.hFe)}. Reduction: $\ce{Cr2O7^2- -> 2Cr^3+}$; O: $+7\ \ce{H2O}$; H: $+14\ \ce{H+}$; charge: $+6\ \ce{e-}$, giving ${ce(EQ.hCr)}.

Multiply the oxidation half by 6 and add: ${ce(EQ.CrFe)} Charge: $-2 + 14 + 12 = +24$ and $2(+3) + 6(+3) = +24$.`,
      v: table(['Check', 'Left', 'Right'], [['Cr', '2', '2'], ['O', '7', '7'], ['H', '14', '14'], ['Fe', '6', '6'], ['Charge', '+24', '+24']], 'Table checking atoms and charge of the balanced dichromate iron(II) equation'),
      n: 'In the reduction half, dichromate gives two chromium three plus ions. Seven oxygens need seven waters on the right, which needs fourteen hydrogen ions on the left. The charge on the left is then plus twelve and on the right plus six, so six electrons are added to the left. Multiply the iron half by six, add, and the electrons cancel.',
    }),
    sl('check', 'Quick check: balancing detail', {
      b: 'Count the electrons from the change in oxidation number.',
      n: 'Quick check. Find how many electrons one formula unit of the substance in the question gains or loses by comparing the oxidation numbers of the atom that changes, and remember to count every atom of that element in the formula. Then give the number.',
      chk: 'chk-bal-num',
    }),
    sl('concept', 'Basic medium', {
      b: r`In basic medium balance **as if acidic**, then add as many $\ce{OH-}$ to **both sides** as there are $\ce{H+}$, turn $\ce{H+ + OH-}$ into $\ce{H2O}$ and cancel any water that appears on both sides. Or balance O with $\ce{H2O}$ and H with $\ce{OH-}$ directly in each half.`,
      v: table(['Medium', 'Balance O with', 'Balance H with', 'Typical result'], [['Acidic', 'H₂O', 'H⁺', 'H⁺ on one side'], ['Basic', 'H₂O', 'OH⁻ (add H₂O the other side)', 'OH⁻ on one side']], 'Table comparing the species used to balance oxygen and hydrogen in acidic and basic media'),
      n: 'In basic solution there are no free hydrogen ions to use. One route is to balance as if the solution were acidic, then add hydroxide ions to both sides to turn every hydrogen ion into water. Cancel any water that appears on both sides. The final equation then contains hydroxide ions, not hydrogen ions.',
    }),
    sl('example', 'Worked example: basic medium, two methods', {
      b: r`**(a) Ion-electron.** Skeletal: $\ce{CrO2- + H2O2 -> CrO4^2-}$ (basic). Oxidation: ${ce(EQ.hCrO2)}. Reduction: ${ce(EQ.hH2O2)}. Multiply by 2 and 3 (6 electrons): ${ce(EQ.CrO2H2O2)}

**(b) ON method.** Skeletal: $\ce{MnO4- + I- -> MnO2 + I2}$. Mn $+7 \to +4$ (fall 3 per Mn); I $-1 \to 0$ (rise 1 per I). Total fall = total rise: $1 \times 3 = 3 \times 1$, so 2 MnO₄⁻ need 6 I⁻. Balance O with H₂O and H with OH⁻: ${ce(EQ.MnI)} Atoms balance, and charge is $-8$ on each side.`,
      v: table(['Reaction', 'Method', 'Electrons transferred'], [['2CrO₂⁻ + 3H₂O₂ + 2OH⁻ → 2CrO₄²⁻ + 4H₂O', 'Ion-electron', '6'], ['2MnO₄⁻ + 6I⁻ + 4H₂O → 2MnO₂ + 3I₂ + 8OH⁻', 'Oxidation number', '6']], 'Table of two balanced reactions in basic medium with method and electrons transferred'),
      n: 'In the first example, chromium rises from plus three to plus six in each ion, and hydrogen peroxide takes the electrons. Multiply the halves by two and three so that six electrons are shared. In the second, manganese falls by three and iodide rises by one, so six iodide ions are needed for two permanganate ions. The result contains hydroxide ions.',
    }),
    sl('check', 'Quick check: the basic medium', {
      b: 'Where do hydroxide ions appear?',
      n: 'Quick check. Think about which species are available in basic solution and which side of the equation the hydroxide ions finally appear on. Then check how your chosen equation balances in atoms and in charge before you pick an answer.',
      chk: 'chk-basic-mcq',
    }),
    sl('concept', 'Types of redox reaction', {
      b: r`**Combination:** two or more substances form one ($\ce{2Na + Cl2 -> 2NaCl}$). **Decomposition:** one compound gives two or more, redox if an element changes ON ($\ce{2HgO -> 2Hg + O2}$). **Displacement:** a more reactive element displaces a less reactive one ($\ce{Cl2 + 2KI -> 2KCl + I2}$). **Disproportionation:** one element is **simultaneously oxidised and reduced**.`,
      v: V.types,
      n: 'Redox reactions fall into four types. In combination, substances unite, with at least one element involved. In decomposition, a compound breaks up, and it is redox if an element changes its oxidation number. In displacement a more reactive element takes the place of a less reactive one. In disproportionation, one element is both oxidised and reduced in the same reaction.',
    }),
    sl('diagram', 'Disproportionation: chlorine in cold alkali', {
      b: r`${ce(EQ.Cl2cold)}: Cl $0 \to -1$ (reduced) and $0 \to +1$ (oxidised). The element must be in an **intermediate** ON to disproportionate. In hot alkali the products are $\ce{Cl-}$ and $\ce{ClO3-}$: ${ce(EQ.Cl2hot)}.`,
      v: V.disp,
      n: 'In cold alkali, chlorine at oxidation number zero changes to chloride at minus one and to hypochlorite at plus one. The same element goes down and up in one reaction, which is disproportionation. It only occurs when the element has an oxidation number in the middle of its range, so that it can move either way.',
    }),
    sl('example', 'Worked example: classify and balance', {
      b: r`**(i)** $\ce{3Cl2 + 6OH- -> 5Cl- + ClO3- + 3H2O}$: Cl $0 \to -1$ and $0 \to +5$: **disproportionation**.

**(ii)** ${ce(EQ.KClO3)}: Cl $+5 \to -1$, O $-2 \to 0$: **decomposition** (redox).

**(iii)** ${ce(EQ.FeCuSO4)}: Fe $0 \to +2$, Cu $+2 \to 0$: **displacement**.

**(iv)** Skeletal: $\ce{S2O3^2- + Cl2 + H2O -> SO4^2- + Cl- + H+}$. S: $+2 \to +6$ (rise 4 per S, 8 per $\ce{S2O3^2-}$); Cl: $0 \to -1$ (fall 2 per $\ce{Cl2}$): 4 Cl₂ per thiosulphate. ${ce(EQ.S2O3Cl2)}`,
      v: table(['Reaction', 'Evidence', 'Type'], [['3Cl₂ + 6OH⁻ → 5Cl⁻ + ClO₃⁻ + 3H₂O', 'Cl 0 → −1 and +5', 'Disproportionation'], ['2KClO₃ → 2KCl + 3O₂', 'Cl +5 → −1, O −2 → 0', 'Decomposition'], ['Fe + Cu²⁺ → Fe²⁺ + Cu', 'Fe 0 → +2, Cu +2 → 0', 'Displacement']], 'Table of three reactions classified by oxidation number evidence'),
      n: 'Always look for the evidence in the oxidation numbers. Chlorine going both down and up in one reaction is disproportionation. Potassium chlorate breaking into chloride and oxygen is decomposition, and it is redox, because chlorine and oxygen both change. Iron pushing copper out of solution is displacement. The thiosulphate and chlorine equation shows the ON method with a larger multiplier.',
    }),
    sl('check', 'Quick check: which type?', {
      b: 'Use the oxidation numbers of the element that changes.',
      n: 'Quick check. Write down the oxidation numbers of each element on both sides of the reaction in the question. Look for one element that changes in two different directions, or for an element that replaces another, and then pick the type of redox reaction.',
      chk: 'chk-type-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'ON method: find rise and fall, equalise, balance O with H₂O and H with H⁺ (or OH⁻), check atoms and charge.',
        'Ion-electron method: balance each half (atoms, O with H₂O, H with H⁺, charge with e⁻), equalise electrons, add, cancel.',
        'Basic medium: add OH⁻ to both sides to neutralise H⁺, then cancel water.',
        'Permanganate with Fe²⁺: MnO₄⁻ + 8H⁺ + 5Fe²⁺ → Mn²⁺ + 4H₂O + 5Fe³⁺; dichromate takes 6 e⁻.',
        'Types: combination, decomposition, displacement, disproportionation (same element oxidised and reduced).',
      ],
      v: table(['Method', 'Key step'], [['ON method', 'Total rise = total fall'], ['Ion-electron', 'Equalise electrons in the two halves'], ['Both', 'Check atoms AND charge']], 'Summary table of the key steps of the two balancing methods'),
      n: 'Let us sum up Part Two. The oxidation number method equalises the total rise and fall. The ion electron method balances two half reactions and equalises their electrons. In basic solution, use hydroxide ions. Always check both atoms and charge. Finally, redox reactions are combination, decomposition, displacement or disproportionation.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Say which method you use and show every step: ON change, multiplier, balancing of O and H, check.',
        'Verify charge as well as atoms: write the total charge of each side.',
        'In a half-reaction, electrons are on the left for reduction and on the right for oxidation.',
        'In basic medium the answer must not contain H⁺.',
        'Prove "disproportionation" by showing the same element going both up and down.',
      ],
      v: table(['Slip', 'Fix'], [['Balancing atoms but not charge', 'Add electrons or H⁺/OH⁻ until the charge is equal'], ['Leaving H⁺ in a basic-medium answer', 'Add OH⁻ to both sides and cancel water'], ['Multiplying only one half by the electron number', 'Multiply each half so the electrons are equal']], 'Table of common slips in Part 2 and their fixes'),
      n: 'Some exam tips for Part Two. State your method and show each step. Check charge as well as atoms and write the total charge for both sides. Put electrons on the correct side of each half reaction. In basic solution, do not leave hydrogen ions in the answer. And prove disproportionation by showing one element going both up and down.',
    }),
  ],
});
