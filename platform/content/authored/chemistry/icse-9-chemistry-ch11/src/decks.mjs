// ICSE 9 Chemistry ch11 Oxidation and Reduction — Part 1 (t01–t02: oxygen and hydrogen transfer, the electronic concept),
// Part 2 (t03: oxidising agents, reducing agents and redox reactions).
import { sl, deck, table, flow, chem, svgV, r } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { TRANSFER, STRIP } from './svgs.mjs';
import { MG_FE, AL_FE, FE_CL } from './calc.mjs';

export const V = {
  transfer: svgV(TRANSFER, 'An electron passes from the outer shell of a sodium atom to the outer shell of a chlorine atom'),
  strip: svgV(STRIP, 'A magnesium ribbon in copper(II) sulphate solution with the two half-changes'),
};

export const deck1 = deck({
  part: 1,
  title: 'Oxidation and Reduction — Part 1: Oxygen, hydrogen and electrons',
  goals: [
    'Identify the substance oxidised and the substance reduced using oxygen and hydrogen transfer',
    'Define oxidation and reduction as loss and gain of electrons',
    'Write ionic half-changes showing loss and gain of electrons',
  ],
  slides: [
    sl('title', 'Two changes that never travel alone', {
      b: 'Part 1 — burning, and the change of a metal oxide into a metal, look like opposites. Chemists call them **oxidation** and **reduction**, and they always happen together.',
      v: flow('LR', [['a', 'Substance A'], ['o', 'Oxidation'], ['b', 'Substance B'], ['r', 'Reduction']], [['a', 'o'], ['b', 'r']], 'Flow: one substance is oxidised while another is reduced'),
      n: 'Burning a metal in air is one kind of chemical change. Turning a metal oxide back into the metal is another. They look like opposites. Chemists call them oxidation and reduction, and one of them can never happen without the other.',
    }),
    sl('concept', 'Oxygen: added or removed', {
      b: '**Oxidation** is the addition of oxygen. **Reduction** is the removal of oxygen.',
      v: table(['Change', 'Type', 'Reason'], [['Magnesium → magnesium oxide', 'Oxidation', 'Oxygen is added'], ['Carbon monoxide → carbon dioxide', 'Oxidation', 'Oxygen is added'], ['Lead(II) oxide → lead', 'Reduction', 'Oxygen is removed'], ['Carbon dioxide → carbon', 'Reduction', 'Oxygen is removed']], 'Table of four changes classified by oxygen added or removed'),
      n: 'The first way to look at it is through oxygen. Adding oxygen to a substance is oxidation, so magnesium becoming magnesium oxide is oxidation. Removing oxygen is reduction, so lead oxide becoming lead is reduction.',
    }),
    sl('concept', 'Hydrogen: removed or added', {
      b: '**Oxidation** is the removal of hydrogen. **Reduction** is the addition of hydrogen.',
      v: table(['Change', 'Type', 'Reason'], [['Hydrogen sulphide → sulphur', 'Oxidation', 'Hydrogen is removed'], ['Hydrogen chloride → chlorine', 'Oxidation', 'Hydrogen is removed'], ['Chlorine → hydrogen chloride', 'Reduction', 'Hydrogen is added'], ['Sulphur → hydrogen sulphide', 'Reduction', 'Hydrogen is added']], 'Table of four changes classified by hydrogen removed or added'),
      n: 'The second way uses hydrogen, and it works the other way round. Taking hydrogen away from a substance is oxidation. Adding hydrogen to a substance is reduction. So hydrogen sulphide changing into sulphur is oxidation.',
    }),
    sl('example', 'Worked example 1: lead oxide and hydrogen', {
      b: r`**Problem.** Dry hydrogen is passed over heated yellow lead(II) oxide, $\ce{PbO + H2 -> Pb + H2O}$. Which substance is oxidised and which is reduced?

**Step 1.** Lead(II) oxide **loses oxygen** and becomes lead, so it is **reduced**.

**Step 2.** Hydrogen **gains oxygen** and becomes water, so it is **oxidised**.

**Step 3.** Both happen in the same reaction.`,
      v: chem(r`PbO + H2 ->[\Delta] Pb + H2O`, 'Lead oxide and hydrogen give lead and water', 'Lead oxide is reduced; hydrogen is oxidised.'),
      n: 'Look at what happens to oxygen. Lead oxide loses its oxygen and turns into grey lead, so lead oxide is reduced. The same oxygen goes to hydrogen, which becomes water, so hydrogen is oxidised. One substance is reduced and the other is oxidised in the same reaction.',
    }),
    sl('check', 'Quick check: oxygen transfer', {
      b: 'Follow the oxygen.',
      v: chem('2Mg + CO2 -> 2MgO + C', 'Magnesium and carbon dioxide give magnesium oxide and carbon'),
      chk: 'chk-og',
      n: 'Magnesium burns in carbon dioxide and leaves white magnesium oxide and black carbon. Which statement is correct?',
    }),
    sl('concept', 'A single reaction shows both', {
      b: 'Whenever one substance **gains oxygen**, another substance **loses** that oxygen.',
      v: flow('LR', [['a', 'Lead oxide'], ['b', 'gives away oxygen'], ['c', 'Hydrogen'], ['d', 'receives the oxygen']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow: lead oxide gives oxygen to hydrogen'),
      n: 'Oxygen cannot just vanish. If one substance gains oxygen, another substance must give it up. So oxidation of one substance always comes with reduction of another. That pair of changes is called a redox reaction.',
    }),
    sl('diagram', 'The electronic concept', {
      b: '**Oxidation** is the **loss** of electrons. **Reduction** is the **gain** of electrons.',
      v: V.transfer,
      n: 'A sodium atom has one electron in its outer shell. It loses that electron and becomes a sodium ion, which is oxidation. A chlorine atom has seven outer electrons. It gains the electron and becomes a chloride ion, which is reduction. The electron lost by one is gained by the other.',
    }),
    sl('concept', 'Writing half-changes', {
      b: 'Each change is written separately as a **half-change**, with electrons shown. Both **atoms** and **charge** must balance.',
      v: table(['Oxidation (electrons lost)', 'Reduction (electrons gained)'], [['Na → Na⁺ + e⁻', 'Cl₂ + 2e⁻ → 2Cl⁻'], ['Mg → Mg²⁺ + 2e⁻', 'Cu²⁺ + 2e⁻ → Cu'], ['Al → Al³⁺ + 3e⁻', 'Ag⁺ + e⁻ → Ag'], ['Fe²⁺ → Fe³⁺ + e⁻', 'Fe³⁺ + e⁻ → Fe²⁺']], 'Table of four oxidation half-changes and four reduction half-changes'),
      n: 'A half-change shows only one of the two changes. In an oxidation, the electrons appear on the right side. In a reduction, the electrons appear on the left side. Check that atoms and also electric charge balance on both sides.',
    }),
    sl('example', 'Worked example 2: balancing a half-change', {
      b: r`**Problem.** Write the half-change for the reduction of a chlorine molecule to chloride ions.

**Step 1.** Start with $\ce{Cl2 -> 2Cl-}$: the atoms balance, but the charge does not (0 on the left, −2 on the right).

**Step 2.** Add electrons to the **left** to make the charges equal: $\ce{Cl2 + 2e- -> 2Cl-}$.

**Step 3.** Two electrons are gained, so chlorine is **reduced**.`,
      v: chem(r`Cl2 + 2e- -> 2Cl-`, 'A chlorine molecule gains two electrons and gives two chloride ions', 'Charge: 2 × (−1) = −2 on both sides.'),
      n: 'Start with the atoms. One chlorine molecule gives two chloride ions, so the atoms balance. But the charge is zero on the left and minus two on the right. Add two electrons to the left. Now both sides have a charge of minus two. Electrons are gained, so this is reduction.',
    }),
    sl('check', 'Quick check: reading a half-change', {
      b: 'Where are the electrons?',
      v: chem(r`Cu^2+ + 2e- -> Cu`, 'A copper ion gains two electrons to form copper'),
      chk: 'chk-elec',
      n: 'A copper two plus ion gains two electrons and becomes a copper atom. Which statement describes this change?',
    }),
    sl('concept', 'Joining two half-changes', {
      b: r`The **electrons lost** must equal the **electrons gained**. Add the halves so the electrons cancel: $\ce{Mg -> Mg^2+ + 2e-}$ and $\ce{Fe^2+ + 2e- -> Fe}$.`,
      v: chem(r`Mg + Fe^2+ -> Mg^2+ + Fe`, 'Magnesium and iron(II) ions give magnesium ions and iron', `Electrons exchanged: ${MG_FE.electrons}; they cancel and are not written.`),
      n: 'Here the oxidation gives away two electrons and the reduction takes two electrons. They are equal, so they cancel. The result is magnesium plus iron two plus ions giving magnesium two plus ions and iron. No electrons are left in the final equation.',
    }),
    sl('concept', 'When the electrons are not equal', {
      b: `If the numbers differ, **multiply** each half so they match. Aluminium loses 3; the iron(II) ion gains 2, so use **2 Al** and **3 Fe²⁺**, giving ${AL_FE.electrons} electrons each way.`,
      v: table(['Step', 'Working'], [['Oxidation', '2 × (Al → Al³⁺ + 3e⁻)'], ['Reduction', '3 × (Fe²⁺ + 2e⁻ → Fe)'], ['Electrons', '6 lost = 6 gained'], ['Overall', '2Al + 3Fe²⁺ → 2Al³⁺ + 3Fe']], 'Table showing how two half-changes are multiplied and added'),
      n: 'Sometimes the numbers of electrons are different. Aluminium gives three electrons, and an iron two plus ion takes two. The smallest number that both divide into is six. So we use two aluminium atoms and three iron ions. Six electrons are lost and six are gained.',
    }),
    sl('check', 'Quick check: oxidation or reduction?', {
      b: 'Compare the charge on the iron before and after.',
      v: chem(r`Fe^2+ -> Fe^3+ + e-`, 'An iron(II) ion loses an electron and becomes an iron(III) ion'),
      chk: 'chk-half',
      n: 'An iron two plus ion changes into an iron three plus ion. Which of the following half-changes shows an oxidation?',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Oxidation: addition of oxygen, removal of hydrogen, loss of electrons.',
        'Reduction: removal of oxygen, addition of hydrogen, gain of electrons.',
        'Oxidation and reduction always occur together in a redox reaction.',
        'Half-changes show the electrons; atoms and charge must both balance, and the electrons must cancel when two halves are added.',
      ],
      v: table(['', 'Oxidation', 'Reduction'], [['Oxygen', 'Gained', 'Lost'], ['Hydrogen', 'Lost', 'Gained'], ['Electrons', 'Lost', 'Gained']], 'Summary table of oxidation and reduction in terms of oxygen, hydrogen and electrons'),
      n: 'To sum up Part 1. Oxidation is gain of oxygen, loss of hydrogen or loss of electrons. Reduction is the opposite in every case. They always occur together. Half-changes show the electrons, and when two halves are added the electrons must cancel.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Put the electrons on the right for oxidation and on the left for reduction.',
        'Check the charge as well as the atoms in a half-change.',
        'Write ions with their charge: Cu²⁺, Fe³⁺, Cl⁻.',
        'Always name both the substance oxidised and the substance reduced.',
      ],
      v: table(['Slip', 'Fix'], [['Writing Na → Na⁺ with no electron', 'Na → Na⁺ + e⁻'], ['Saying oxidation is gain of electrons', 'Oxidation is loss'], ['Leaving electrons in the final equation', 'They cancel when halves are added']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Exam tips. Write electrons on the right for oxidation and on the left for reduction. Balance charge as well as atoms. Write each ion with its charge. And name both the substance oxidised and the substance reduced.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Oxidation and Reduction — Part 2: Oxidising agents, reducing agents and redox reactions',
  goals: [
    'Identify the oxidising agent and the reducing agent in a redox reaction',
    'Recognise redox reactions and reactions that are not redox',
    'Use colour changes and electron transfer to describe a redox reaction',
  ],
  slides: [
    sl('title', 'Who does the work?', {
      b: 'Part 2 — a substance that is oxidised needs a partner that takes something from it. That partner is the **oxidising agent**.',
      v: flow('LR', [['r', 'Reducing agent'], ['o', 'Oxidising agent']], [['r', 'o']], 'Flow: the reducing agent gives electrons to the oxidising agent'),
      n: 'In a redox reaction each substance has a job. One substance does the oxidising and is itself reduced. The other does the reducing and is itself oxidised. This part is about naming these agents correctly.',
    }),
    sl('concept', 'Oxidising agent', {
      b: 'An **oxidising agent** causes oxidation in another substance, and is itself **reduced**.',
      v: table(['Way of looking at it', 'Oxidising agent'], [['Oxygen', 'Gives oxygen to another substance'], ['Hydrogen', 'Removes hydrogen from another substance'], ['Electrons', 'Gains electrons from another substance']], 'Table of three descriptions of an oxidising agent'),
      n: 'An oxidising agent oxidises another substance. It may give oxygen, take away hydrogen, or take electrons. In every case the oxidising agent is itself reduced. It gains electrons.',
    }),
    sl('concept', 'Reducing agent', {
      b: 'A **reducing agent** causes reduction in another substance, and is itself **oxidised**.',
      v: table(['Way of looking at it', 'Reducing agent'], [['Oxygen', 'Removes oxygen from another substance'], ['Hydrogen', 'Gives hydrogen to another substance'], ['Electrons', 'Loses electrons to another substance']], 'Table of three descriptions of a reducing agent'),
      n: 'A reducing agent reduces another substance. It may take away oxygen, give hydrogen, or give electrons. It is always oxidised itself. It loses electrons.',
    }),
    sl('concept', 'Common agents', {
      v: table(['Oxidising agents', 'Reducing agents'], [['Oxygen', 'Hydrogen'], ['Chlorine', 'Carbon'], ['Nitric acid', 'Carbon monoxide'], ['Hydrogen peroxide', 'Hydrogen sulphide'], ['Potassium permanganate, potassium dichromate', 'Reactive metals such as sodium, magnesium and zinc']], 'Table of five common oxidising agents and five common reducing agents'),
      n: 'Here are some common agents. Oxygen, chlorine and nitric acid are oxidising agents. So are hydrogen peroxide and potassium permanganate. Hydrogen, carbon, carbon monoxide, hydrogen sulphide and reactive metals are reducing agents. Metals are good reducing agents because they lose electrons easily.',
    }),
    sl('example', 'Worked example 1: chlorine and hydrogen sulphide', {
      b: r`**Problem.** Chlorine gas is passed into a solution of hydrogen sulphide, $\ce{Cl2 + H2S -> 2HCl + S}$, and a yellow solid forms. Name the oxidising agent and the reducing agent.

**Step 1.** $\ce{H2S}$ **loses hydrogen** and becomes sulphur: it is **oxidised**, so it is the **reducing agent**.

**Step 2.** $\ce{Cl2}$ **gains hydrogen** and becomes hydrogen chloride: it is **reduced**, so it is the **oxidising agent**.

**Step 3.** The yellow solid is sulphur.`,
      v: chem(r`Cl2 + H2S -> 2HCl + S`, 'Chlorine and hydrogen sulphide give hydrogen chloride and sulphur', 'Chlorine: oxidising agent. Hydrogen sulphide: reducing agent.'),
      n: 'Look at the hydrogen. Hydrogen sulphide loses hydrogen and becomes yellow sulphur, so it is oxidised and is the reducing agent. Chlorine gains hydrogen to form hydrogen chloride, so it is reduced and is the oxidising agent.',
    }),
    sl('check', 'Quick check: agents', {
      b: 'The agent is the substance that does the changing, not the one that changes.',
      v: chem(r`Zn + CuO -> ZnO + Cu`, 'Zinc and copper oxide give zinc oxide and copper'),
      chk: 'chk-agent',
      n: 'Zinc powder is heated with black copper oxide, and reddish brown copper is formed. Which substance is the reducing agent?',
    }),
    sl('diagram', 'Electron view: magnesium in copper sulphate', {
      b: r`Magnesium is the **reducing agent** (it loses electrons); the copper(II) ion is the **oxidising agent** (it gains them). Together: $\ce{Mg + Cu^2+ -> Mg^2+ + Cu}$.`,
      v: V.strip,
      n: 'A magnesium ribbon is placed in blue copper sulphate solution. Magnesium atoms lose two electrons each and go into solution as magnesium ions. Copper ions gain those electrons and settle as reddish brown copper. Magnesium is the reducing agent and the copper ion is the oxidising agent.',
    }),
    sl('check', 'Quick check: the oxidising agent', {
      b: 'Which of the two reactants gains the electrons?',
      v: chem(r`Mg + Cu^2+ -> Mg^2+ + Cu`, 'Magnesium and copper ions give magnesium ions and copper'),
      chk: 'chk-cu',
      n: 'Magnesium is placed in copper sulphate solution. Which substance is the oxidising agent?',
    }),
    sl('concept', 'Spotting a redox reaction', {
      v: table(['Clue', 'Example'], [['Oxygen gained or lost', 'Magnesium burning; lead oxide changing to lead'], ['Hydrogen gained or lost', 'Hydrogen sulphide changing to sulphur'], ['A metal going into solution as ions, or ions turning into a metal', 'Magnesium in copper sulphate'], ['A colour change that goes with these', 'Pale green iron(II) to yellow iron(III); brown iodine from iodide']], 'Table of clues that a reaction is a redox reaction'),
      n: 'How can you spot a redox reaction? Look for oxygen or hydrogen being gained or lost. Look for a metal changing into ions or ions changing into a metal. And watch for colour changes, such as pale green iron two solution turning yellow, or brown iodine appearing.',
    }),
    sl('example', 'Worked example 2: chlorine and iron(II) chloride', {
      b: r`**Problem.** Chlorine is passed into pale green iron(II) chloride solution, which turns yellow: $\ce{2FeCl2 + Cl2 -> 2FeCl3}$. Write the half-changes and name the agents.

**Step 1.** Oxidation: $\ce{Fe^2+ -> Fe^3+ + e-}$ (the electron is lost).

**Step 2.** Reduction: $\ce{Cl2 + 2e- -> 2Cl-}$.

**Step 3.** Use ${FE_CL.fOx} Fe²⁺ for each Cl₂ so that ${FE_CL.electrons} electrons are lost and ${FE_CL.electrons} gained. Iron(II) is the reducing agent; chlorine is the oxidising agent.`,
      v: chem(r`2Fe^2+ + Cl2 -> 2Fe^3+ + 2Cl-`, 'Iron(II) ions and chlorine give iron(III) ions and chloride ions', 'Charge: +4 on the left; +6 − 2 = +4 on the right.'),
      n: 'Iron two plus loses one electron to become iron three plus, which is oxidation. Chlorine gains two electrons, which is reduction. Because chlorine needs two electrons, two iron ions are used for each chlorine molecule. Iron two is the reducing agent, and chlorine is the oxidising agent.',
    }),
    sl('check', 'Quick check: is it redox?', {
      b: 'Look for a gain or loss of electrons, oxygen or hydrogen.',
      v: table(['Reaction', 'Type'], [['Silver nitrate + sodium chloride', 'Precipitation'], ['Zinc + copper oxide', 'Redox']], 'Two reactions and their types'),
      chk: 'chk-redox',
      n: 'Four reactions are listed. Which one is a redox reaction?',
    }),
    sl('concept', 'Not every reaction is redox', {
      b: 'A precipitation or a neutralisation involves **no loss or gain of electrons**. Only the partners are exchanged.',
      v: table(['Reaction', 'Redox?', 'Reason'], [['AgNO₃ + NaCl → AgCl + NaNO₃', 'No', 'Ions swap partners'], ['HCl + NaOH → NaCl + H₂O', 'No', 'Acid and alkali neutralise'], ['CaCO₃ → CaO + CO₂', 'No', 'No electron or oxygen transfer to another substance'], ['2Na + Cl₂ → 2NaCl', 'Yes', 'Sodium loses and chlorine gains electrons']], 'Table of four reactions and whether each is redox'),
      n: 'Not every reaction is a redox reaction. When silver nitrate and sodium chloride react, the ions only swap partners and no electrons move. The same is true for neutralisation. In a redox reaction, electrons, oxygen or hydrogen are transferred.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Oxidising agent: causes oxidation, is reduced, gains electrons.',
        'Reducing agent: causes reduction, is oxidised, loses electrons.',
        'Redox reaction: oxidation and reduction together; check what each reactant gains or loses.',
        'Precipitation and neutralisation are not redox reactions.',
      ],
      v: table(['Agent', 'Itself', 'Electrons'], [['Oxidising agent', 'Reduced', 'Gains'], ['Reducing agent', 'Oxidised', 'Loses']], 'Summary table of oxidising and reducing agents'),
      n: 'To sum up Part 2. An oxidising agent is itself reduced and gains electrons. A reducing agent is itself oxidised and loses electrons. A redox reaction has both. Precipitation and neutralisation are not redox reactions.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'The agent is the substance that is oxidised or reduced by the other: the reducing agent is the one oxidised.',
        'Give a reason in terms of oxygen, hydrogen or electrons.',
        'Name the colour changes you see, such as pale green to yellow.',
        'Write half-changes with the electrons on the correct side.',
      ],
      v: table(['Slip', 'Fix'], [['Calling the substance reduced the reducing agent', 'The reducing agent is the one oxidised'], ['Naming only one substance', 'Name both: oxidised and reduced'], ['Calling a precipitation a redox reaction', 'No electrons are transferred']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Exam tips. The reducing agent is the substance that is itself oxidised. Always give a reason in terms of oxygen, hydrogen or electrons. Describe the colour changes. And write half-changes with electrons on the right side.',
    }),
  ],
});
