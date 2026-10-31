// ISC 12 Chemistry ch09 Potassium Permanganate and Potassium Dichromate — two decks: Part 1 (t01–t02) KMnO₄:
// structure, preparation from pyrolusite and oxidising action in acidic, basic and neutral media, titrations;
// Part 2 (t03–t04) K₂Cr₂O₇: structure, preparation from chromite, oxidising action, titrations, chromate ⇌ dichromate.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { CHROMATE, MANGANATE } from './svgs.mjs';

export const V = {
  chromate: svgV(CHROMATE, 'Structures of the tetrahedral chromate ion and of the dichromate ion, two tetrahedra sharing one oxygen atom with a Cr–O–Cr angle of about 126 degrees'),
  manganate: svgV(MANGANATE, 'Tetrahedral structures of the green, paramagnetic manganate ion and the purple, diamagnetic permanganate ion'),
};

export const deck1 = deck({
  part: 1,
  title: 'Potassium Permanganate and Potassium Dichromate — Part 1: Potassium permanganate',
  goals: [
    'Describe the structure and shape of the permanganate ion',
    'Write the equations for the preparation of KMnO₄ from pyrolusite',
    'Write balanced ionic equations for permanganate oxidations in acidic, basic and neutral media',
    'Explain why KMnO₄ acts as a self-indicator and solve titration problems',
  ],
  slides: [
    sl('title', 'Purple power: potassium permanganate', {
      b: 'Part 1 — how KMnO₄ is made, why it is purple, and how it oxidises in different media.',
      v: flow('LR', [['a', 'Pyrolusite MnO₂'], ['b', 'K₂MnO₄ (green)'], ['c', 'KMnO₄ (purple)'], ['d', 'Oxidations and titrations']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow from pyrolusite through green potassium manganate to purple potassium permanganate and its use in oxidations and titrations'),
      n: 'Namaste! Potassium permanganate is the deep purple crystal used to disinfect water and wash vegetables, and the reagent you use in volumetric titrations. In this part we see how it is made from the ore pyrolusite, why its ion is tetrahedral and purple, and how its oxidising power changes in acidic, basic and neutral solution.',
    }),
    sl('concept', 'Properties of KMnO₄', {
      b: 'Dark purple, almost black, crystals; moderately soluble in water giving an intense purple solution; manganese is in the **+7** state (3d⁰). On heating to about 513 K it decomposes, releasing oxygen.',
      m: [r`\ce{2KMnO4 ->[513 K] K2MnO4 + MnO2 + O2}`],
      v: table(['Property', 'KMnO₄'], [['Appearance', 'Dark purple crystals'], ['Oxidation state of Mn', '+7 (3d⁰)'], ['Magnetism', 'Diamagnetic'], ['On heating (513 K)', 'K₂MnO₄ + MnO₂ + O₂'], ['Uses', 'Oxidant, disinfectant, titrant']], 'Table of properties of potassium permanganate'),
      n: 'Potassium permanganate forms dark purple, nearly black crystals that dissolve to give an intense purple solution, even at very low concentration. Manganese is in its highest state, plus seven, with no d electrons, so the salt is diamagnetic. When heated, it decomposes into potassium manganate, manganese dioxide and oxygen, which is a simple laboratory source of oxygen.',
    }),
    sl('diagram', 'Structure and shape of the permanganate ion', {
      b: r`$\ce{MnO4-}$ is **tetrahedral**: Mn at the centre, four O at the corners, with three Mn=O bonds and one Mn–O⁻ bond drawn (all four are equivalent by resonance). The green **manganate** ion $\ce{MnO4^2-}$ is also tetrahedral but has Mn +6 (3d¹, paramagnetic). The purple colour of permanganate comes from **charge transfer** (O → Mn), not a d–d transition.`,
      v: V.manganate,
      n: 'The permanganate ion is a tetrahedron, with manganese at the centre and four oxygen atoms at the corners; resonance makes all four bonds the same. The manganate ion has the same shape but one extra electron, giving manganese plus six with a single d electron, so it is green and paramagnetic. Permanganate has no d electrons, so its colour comes from charge transfer from oxygen to manganese.',
    }),
    sl('concept', 'Preparation from pyrolusite', {
      b: r`**Step 1.** Fuse **pyrolusite** ($\ce{MnO2}$) with KOH in the presence of air or an oxidant ($\ce{KNO3}$ or $\ce{KClO3}$): green potassium manganate forms.

**Step 2.** Convert manganate (Mn +6) to permanganate (Mn +7): **electrolytic oxidation** in alkaline solution (industrial), or oxidation by $\ce{Cl2}$ or $\ce{O3}$, or **disproportionation** in neutral or acidic solution.`,
      m: [r`\ce{2MnO2 + 4KOH + O2 -> 2K2MnO4 + 2H2O}`, r`\ce{MnO4^2- -> MnO4- + e-}\ \text{(at the anode)}`, r`\ce{3MnO4^2- + 4H+ -> 2MnO4- + MnO2 + 2H2O}`],
      v: flow('LR', [['a', 'MnO₂ + KOH + O₂, fuse'], ['b', 'K₂MnO₄ (green, Mn +6)'], ['c', 'Electrolytic oxidation, or Cl₂, or acid'], ['d', 'KMnO₄ (purple, Mn +7)']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of the two-step preparation of potassium permanganate from pyrolusite'),
      n: 'Potassium permanganate is made from pyrolusite, manganese dioxide. First the ore is fused with potassium hydroxide in air, which oxidises manganese to the plus six state as green potassium manganate. Then manganate is oxidised to permanganate. Industry does this electrolytically at the anode; in the laboratory, chlorine can be used, or the manganate can be allowed to disproportionate in acid.',
    }),
    sl('example', 'Worked example: oxidation states in the preparation', {
      b: r`**Problem.** For $\ce{3MnO4^2- + 4H+ -> 2MnO4- + MnO2 + 2H2O}$, (a) find the oxidation state of Mn in each species, (b) explain why this is a disproportionation, and (c) state what fraction of the manganese ends up as permanganate.

**(a)** $\ce{MnO4^2-}$: $x - 8 = -2$, $x = +6$. $\ce{MnO4-}$: $x - 8 = -1$, $x = +7$. $\ce{MnO2}$: $x - 4 = 0$, $x = +4$.

**(b)** The same species (Mn +6) is both oxidised (to +7) and reduced (to +4).

**(c)** Two of every three Mn atoms: $\tfrac{2}{3}$.`,
      v: table(['Species', 'Mn oxidation state', 'Change'], [['MnO₄²⁻', '+6', 'Start'], ['MnO₄⁻', '+7', 'Oxidised'], ['MnO₂', '+4', 'Reduced']], 'Table of oxidation states in the disproportionation of manganate'),
      n: 'Use oxygen as minus two. In manganate, manganese is plus six; in permanganate, plus seven; in manganese dioxide, plus four. One species is both oxidised and reduced, so this is disproportionation. Two of every three manganese atoms become permanganate, so only two thirds is converted, which is why industry prefers electrolytic oxidation.',
    }),
    sl('check', 'Quick check: preparation', {
      b: 'Identify a step or product in the preparation of KMnO₄.',
      n: 'Quick check. Follow manganese from plus four in the ore, to plus six in manganate, to plus seven in permanganate.',
      chk: 'prep-mcq',
    }),
    sl('concept', 'Oxidising action in acidic medium', {
      b: r`In **acid** (dilute $\ce{H2SO4}$), $\ce{MnO4-}$ gains **5 electrons** and is reduced to almost colourless $\ce{Mn^2+}$ ($E^\circ = +1.52\ \text{V}$). HCl is not used (Cl⁻ would be oxidised to Cl₂) and HNO₃ is not used (it is itself an oxidant).`,
      m: [r`\ce{MnO4- + 8H+ + 5e- -> Mn^2+ + 4H2O}`],
      v: table(['Reductant', 'Balanced ionic equation (acid)'], [['Iron(II) (FeSO₄)', r`$\ce{MnO4- + 5Fe^2+ + 8H+ -> Mn^2+ + 5Fe^3+ + 4H2O}$`], ['Oxalic acid', r`$\ce{2MnO4- + 5H2C2O4 + 6H+ -> 2Mn^2+ + 10CO2 + 8H2O}$`], ['Iodide (KI)', r`$\ce{2MnO4- + 10I- + 16H+ -> 2Mn^2+ + 5I2 + 8H2O}$`]], 'Table of permanganate reactions in acidic medium with iron two, oxalic acid and iodide'),
      n: 'In dilute sulphuric acid, each permanganate ion accepts five electrons and becomes the nearly colourless manganese two plus ion. It oxidises iron two plus to iron three plus, oxalic acid to carbon dioxide, and iodide to iodine. Hydrochloric acid is avoided because permanganate would oxidise chloride to chlorine, and nitric acid because it is an oxidising agent itself.',
    }),
    sl('concept', 'Oxidising action in basic and neutral media', {
      b: r`In **neutral or faintly alkaline** solution, $\ce{MnO4-}$ gains **3 electrons** and gives brown $\ce{MnO2}$.

- **Basic, with KI:** iodide is oxidised to **iodate**.
- **Neutral, with H₂S:** hydrogen sulphide is oxidised to **sulphur**.`,
      m: [r`\ce{MnO4- + 2H2O + 3e- -> MnO2 + 4OH-}`, r`\ce{2MnO4- + I- + H2O -> 2MnO2 + IO3- + 2OH-}`, r`\ce{2MnO4- + 3H2S -> 2MnO2 + 3S + 2OH- + 2H2O}`],
      v: table(['Medium', 'Electrons gained', 'Mn product'], [['Acidic', '5', 'Mn²⁺ (colourless)'], ['Neutral / faintly alkaline', '3', 'MnO₂ (brown)'], ['Strongly alkaline', '1', 'MnO₄²⁻ (green)']], 'Table of permanganate reduction in different media'),
      n: 'In neutral or faintly alkaline solution, permanganate accepts only three electrons and gives a brown precipitate of manganese dioxide. With potassium iodide in alkaline solution, iodide is oxidised all the way to iodate; with hydrogen sulphide in neutral solution, the product is sulphur. In strongly alkaline solution, permanganate gains just one electron to give green manganate.',
    }),
    sl('example', 'Worked example: balancing a permanganate equation', {
      b: r`**Problem.** Balance the reaction of permanganate with hydrogen peroxide in acid, given that $\ce{H2O2}$ is oxidised to $\ce{O2}$.

**Step 1.** Half-equations: $\ce{MnO4- + 8H+ + 5e- -> Mn^2+ + 4H2O}$ and $\ce{H2O2 -> O2 + 2H+ + 2e-}$.

**Step 2.** Equalise electrons: multiply by 2 and 5 (10 e⁻ each).

**Step 3.** Add and cancel H⁺: $\ce{2MnO4- + 5H2O2 + 6H+ -> 2Mn^2+ + 5O2 + 8H2O}$. Check: charge $-2 + 6 = +4$ on each side.`,
      v: table(['Half-reaction', 'Multiplier', 'Electrons'], [['MnO₄⁻ → Mn²⁺', '× 2', '10 gained'], ['H₂O₂ → O₂', '× 5', '10 lost']], 'Table of half-reactions and multipliers in the worked example'),
      n: 'Write the two half-equations: permanganate gains five electrons, and hydrogen peroxide loses two electrons as it becomes oxygen. To match electrons, double the first and multiply the second by five, so ten electrons are transferred. Adding and cancelling the hydrogen ions on both sides gives the balanced equation. Always check that atoms and total charge balance.',
    }),
    sl('check', 'Quick check: media', {
      b: 'Predict the manganese product formed in a given medium.',
      n: 'Quick check. Acid gives manganese two plus; neutral or faintly alkaline gives manganese dioxide.',
      chk: 'medium-mcq',
    }),
    sl('concept', 'KMnO₄ in redox titrations', {
      b: 'In titrations with Fe²⁺ or oxalic acid in dilute H₂SO₄, KMnO₄ is a **self-indicator**: the reduced form Mn²⁺ is almost colourless, so the first drop in excess gives a **permanent pale pink**. Oxalic acid titrations are done **warm (about 333 K)**; Mn²⁺ formed catalyses the reaction (autocatalysis). KMnO₄ is **not a primary standard** and is standardised against oxalic acid or Mohr’s salt.',
      v: table(['Feature', 'Detail'], [['Indicator', 'None needed (self-indicator)'], ['End point', 'First permanent pale pink'], ['Acid used', 'Dilute H₂SO₄'], ['Oxalic acid titration', 'Warm; Mn²⁺ autocatalyses'], ['Standardisation', 'Against oxalic acid or Mohr’s salt']], 'Table of features of permanganate titrations'),
      n: 'In a permanganate titration you need no indicator. As long as there is reducing agent in the flask, each purple drop is decolourised; the first extra drop leaves a permanent pale pink. Oxalic acid titrations are carried out warm, and the reaction speeds up once some manganese two plus has formed, because it acts as a catalyst. Permanganate solutions are standardised against oxalic acid or Mohr’s salt.',
    }),
    sl('example', 'Worked example: an oxalic acid titration', {
      b: r`**Problem.** $20.0\ \text{mL}$ of $0.050\ \text{M}$ oxalic acid is titrated, warm, with $0.020\ \text{M}$ $\ce{KMnO4}$ in dilute $\ce{H2SO4}$. Find the volume of $\ce{KMnO4}$ at the end point.

**Step 1.** $n(\ce{H2C2O4}) = 0.050 \times 0.0200 = 1.0 \times 10^{-3}\ \text{mol}$.

**Step 2.** Ratio $\ce{MnO4-} : \ce{H2C2O4} = 2 : 5$, so $n(\ce{MnO4-}) = 1.0 \times 10^{-3} \times 2 \div 5 = 4.0 \times 10^{-4}\ \text{mol}$.

**Step 3.** $V = 4.0 \times 10^{-4} \div 0.020 = 0.020\ \text{L} = 20.0\ \text{mL}$.`,
      v: table(['Quantity', 'Value'], [['Oxalic acid', '1.0 × 10⁻³ mol'], ['Ratio MnO₄⁻ : H₂C₂O₄', '2 : 5'], ['Permanganate', '4.0 × 10⁻⁴ mol'], ['Volume', '20.0 mL']], 'Table of the oxalic acid titration results'),
      n: 'First, moles of oxalic acid: twenty millilitres of zero point zero five molar gives one thousandth of a mole. The balanced equation shows two permanganate ions for every five oxalic acid molecules, so we need two fifths as much permanganate. Dividing by its concentration gives twenty millilitres. At the end point, the solution in the flask turns permanently pale pink.',
    }),
    sl('check', 'Quick check: self-indicator', {
      b: 'Explain the end point of a permanganate titration.',
      n: 'Quick check. Compare the colours of permanganate and of manganese two plus.',
      chk: 'indicator-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'KMnO₄: purple, Mn +7 (d⁰), diamagnetic; MnO₄⁻ tetrahedral; colour by charge transfer.',
        'Preparation: MnO₂ + KOH + O₂ → K₂MnO₄ (green); then electrolytic oxidation or disproportionation → KMnO₄.',
        'Acid: MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (Fe²⁺, oxalic acid, I⁻).',
        'Neutral/alkaline: MnO₄⁻ → MnO₂ (3 e⁻); I⁻ → IO₃⁻, H₂S → S.',
        'Self-indicator; titrate in dilute H₂SO₄; mole ratios 1 : 5 (Fe²⁺), 2 : 5 (oxalic acid).',
      ],
      v: table(['Medium', 'Electrons', 'Product'], [['Acid', '5', 'Mn²⁺'], ['Neutral', '3', 'MnO₂'], ['Strongly alkaline', '1', 'MnO₄²⁻']], 'Summary table of permanganate in different media'),
      n: 'Let us sum up Part 1. Potassium permanganate contains manganese plus seven in a tetrahedral ion. It is made from pyrolusite through green manganate. In acid it gains five electrons to give colourless manganese two plus; in neutral solution three, giving brown manganese dioxide. It is its own indicator in titrations, and the balanced equation gives the mole ratio for every calculation.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Always state the medium; the product and electron count depend on it.',
        'Balance ionic equations for both atoms and charge.',
        'Give the reason HCl is not used: Cl⁻ is oxidised to Cl₂.',
        'In calculations, write the mole ratio from the balanced equation.',
      ],
      v: table(['Slip', 'Fix'], [['MnO₄⁻ → Mn²⁺ in neutral medium', 'Neutral gives MnO₂'], ['Using HCl to acidify', 'Use dilute H₂SO₄'], ['Ratio 1 : 1 with oxalic acid', 'Ratio 2 : 5']], 'Table of three common slips in Part 1 and fixes'),
      n: 'Some tips. Always say which medium you mean, because the product changes. Balance every ionic equation for atoms and for charge. Remember why sulphuric acid, not hydrochloric acid, is used. And in calculations, write the mole ratio from the balanced equation before you do any arithmetic.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Potassium Permanganate and Potassium Dichromate — Part 2: Potassium dichromate',
  goals: [
    'Draw the structure of the dichromate ion',
    'Write the equations for the preparation of K₂Cr₂O₇ from chromite ore',
    'Write balanced equations for dichromate oxidations in acidic medium and use them in titrations',
    'Explain the colour change when the pH of a chromate or dichromate solution is changed',
  ],
  slides: [
    sl('title', 'Orange to green: potassium dichromate', {
      b: 'Part 2 — making K₂Cr₂O₇ from chromite, its structure, and its use as an oxidising agent.',
      v: flow('LR', [['a', 'Chromite FeCr₂O₄'], ['b', 'Na₂CrO₄ (yellow)'], ['c', 'Na₂Cr₂O₇ (orange)'], ['d', 'K₂Cr₂O₇ crystals']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow from chromite ore through sodium chromate and sodium dichromate to potassium dichromate'),
      n: 'Potassium dichromate forms bright orange crystals and is used in leather tanning, in the laboratory as an oxidising agent, and as a standard in titrations. In this part we follow it from its ore, chromite, look at the shape of the dichromate ion, and see how it oxidises other substances and changes to chromate when the pH changes.',
    }),
    sl('concept', 'Preparation from chromite ore', {
      b: r`**Step 1.** Fuse chromite with sodium carbonate in air: chromium is oxidised to +6 as yellow sodium chromate.

**Step 2.** Filter and acidify with $\ce{H2SO4}$: orange sodium dichromate forms.

**Step 3.** Add KCl to the hot concentrated solution: less soluble $\ce{K2Cr2O7}$ crystallises on cooling.`,
      m: [r`\ce{4FeCr2O4 + 8Na2CO3 + 7O2 -> 8Na2CrO4 + 2Fe2O3 + 8CO2}`, r`\ce{2Na2CrO4 + H2SO4 -> Na2Cr2O7 + Na2SO4 + H2O}`, r`\ce{Na2Cr2O7 + 2KCl -> K2Cr2O7 + 2NaCl}`],
      v: table(['Step', 'Product', 'Colour', 'Cr state'], [['Roasting with Na₂CO₃ in air', 'Na₂CrO₄', 'Yellow', '+6'], ['Acidification', 'Na₂Cr₂O₇', 'Orange', '+6'], ['Adding KCl', 'K₂Cr₂O₇', 'Orange crystals', '+6']], 'Table of the three steps in the preparation of potassium dichromate'),
      n: 'Chromite is roasted with sodium carbonate in a current of air, which oxidises chromium from plus three to plus six and gives yellow sodium chromate. Iron ends up as insoluble iron three oxide, which is filtered off. Acidifying the solution turns chromate into orange sodium dichromate. Finally, potassium chloride is added; potassium dichromate is less soluble and crystallises on cooling.',
    }),
    sl('example', 'Worked example: chromium through the process', {
      b: r`**Problem.** Find the oxidation state of chromium in $\ce{FeCr2O4}$, $\ce{Na2CrO4}$ and $\ce{Na2Cr2O7}$. In which step is chromium oxidised, and which reagent oxidises it?

**Step 1.** $\ce{FeCr2O4}$ (Fe +2): $2 + 2x - 8 = 0$, so $x = +3$.

**Step 2.** $\ce{Na2CrO4}$: $2 + x - 8 = 0$, so $x = +6$. $\ce{Na2Cr2O7}$: $2 + 2x - 14 = 0$, so $x = +6$.

**Step 3.** Chromium is oxidised (+3 → +6) only in the roasting step, by **atmospheric oxygen**; acidification is not a redox change.`,
      v: table(['Compound', 'Cr oxidation state'], [['FeCr₂O₄', '+3'], ['Na₂CrO₄', '+6'], ['Na₂Cr₂O₇', '+6'], ['K₂Cr₂O₇', '+6']], 'Table of chromium oxidation states during the preparation'),
      n: 'In chromite, iron is plus two, so each chromium is plus three. In sodium chromate and in sodium dichromate, chromium is plus six. So the only oxidation happens during roasting, when oxygen from the air raises chromium from plus three to plus six. Turning chromate into dichromate with acid does not change the oxidation state at all.',
    }),
    sl('diagram', 'Structures of chromate and dichromate', {
      b: r`$\ce{CrO4^2-}$ is **tetrahedral**. $\ce{Cr2O7^2-}$ consists of **two tetrahedra sharing one corner oxygen**; the Cr–O–Cr angle is about 126°. Six terminal Cr–O bonds are equivalent (about 163 pm); the two bridging Cr–O bonds are longer (about 179 pm).`,
      v: V.chromate,
      n: 'The chromate ion is a tetrahedron with chromium at the centre. The dichromate ion is made of two such tetrahedra that share one corner oxygen atom, with an angle of about one hundred and twenty six degrees at the bridging oxygen. The six outer chromium to oxygen bonds are equal, and the two bonds to the bridging oxygen are longer.',
    }),
    sl('concept', 'Chromate ⇌ dichromate with pH', {
      b: 'Chromate and dichromate are in **equilibrium**; the position depends on pH. **Acid** turns yellow chromate into orange dichromate; **alkali** turns orange dichromate into yellow chromate. Chromium stays **+6**: this is **not** a redox reaction.',
      m: [r`\ce{2CrO4^2- + 2H+ <=> Cr2O7^2- + H2O}`, r`\ce{Cr2O7^2- + 2OH- -> 2CrO4^2- + H2O}`],
      v: table(['Condition', 'Main ion', 'Colour'], [['Acidic (low pH)', 'Cr₂O₇²⁻', 'Orange'], ['Alkaline (high pH)', 'CrO₄²⁻', 'Yellow']], 'Table of the main chromium(VI) ion at low and high pH'),
      n: 'The chromate and dichromate ions are linked by an equilibrium. Adding hydrogen ions pushes it towards dichromate, so a yellow solution turns orange; adding hydroxide removes hydrogen ions and pulls it back, so orange turns yellow. Chromium is plus six throughout, so this is an acid–base change, not a redox change.',
    }),
    sl('check', 'Quick check: pH and colour', {
      b: 'Predict the colour change when the pH of a chromium(VI) solution changes.',
      n: 'Quick check. Low pH favours dichromate; high pH favours chromate.',
      chk: 'ph-mcq',
    }),
    sl('concept', 'Oxidising action in acidic medium', {
      b: r`Acidified dichromate is a strong oxidant ($E^\circ = +1.33\ \text{V}$): each $\ce{Cr2O7^2-}$ gains **6 electrons**, and orange becomes **green Cr³⁺**.`,
      m: [r`\ce{Cr2O7^2- + 14H+ + 6e- -> 2Cr^3+ + 7H2O}`],
      v: table(['Reductant', 'Balanced ionic equation (acid)'], [['Iron(II)', r`$\ce{Cr2O7^2- + 6Fe^2+ + 14H+ -> 2Cr^3+ + 6Fe^3+ + 7H2O}$`], ['Iodide', r`$\ce{Cr2O7^2- + 6I- + 14H+ -> 2Cr^3+ + 3I2 + 7H2O}$`], ['Sulphur dioxide', r`$\ce{Cr2O7^2- + 3SO2 + 2H+ -> 2Cr^3+ + 3SO4^2- + H2O}$`], ['Hydrogen sulphide', r`$\ce{Cr2O7^2- + 3H2S + 8H+ -> 2Cr^3+ + 3S + 7H2O}$`]], 'Table of dichromate reactions in acidic medium'),
      n: 'In acid, each dichromate ion takes six electrons, and both chromium atoms fall from plus six to plus three, so the colour changes from orange to green. Acidified dichromate oxidises iron two plus to iron three plus, iodide to iodine, sulphur dioxide to sulphate and hydrogen sulphide to sulphur. Turning green is also the test for sulphur dioxide using dichromate paper.',
    }),
    sl('example', 'Worked example: an ethanol oxidation', {
      b: r`**Problem.** Acidified dichromate oxidises ethanol to ethanal. Write the balanced ionic equation and state the colour change.

**Step 1.** Half-equations: $\ce{Cr2O7^2- + 14H+ + 6e- -> 2Cr^3+ + 7H2O}$; $\ce{C2H5OH -> CH3CHO + 2H+ + 2e-}$.

**Step 2.** Multiply the second by 3 (6 e⁻), add and cancel H⁺:

$\ce{Cr2O7^2- + 3C2H5OH + 8H+ -> 2Cr^3+ + 3CH3CHO + 7H2O}$.

**Step 3.** Orange → green.`,
      v: table(['Half-reaction', 'Multiplier', 'Electrons'], [['Cr₂O₇²⁻ → 2Cr³⁺', '× 1', '6 gained'], ['C₂H₅OH → CH₃CHO', '× 3', '6 lost']], 'Table of half-reactions for the ethanol oxidation'),
      n: 'Dichromate gains six electrons, while each ethanol molecule loses two as it becomes ethanal. So three ethanol molecules react with one dichromate ion. Adding the half-equations and cancelling hydrogen ions gives eight hydrogen ions on the left and seven water molecules on the right. The orange solution turns green as chromium three plus forms.',
    }),
    sl('concept', 'K₂Cr₂O₇ in titrations', {
      b: 'K₂Cr₂O₇ is a **primary standard**: it is obtained very pure, is not hygroscopic and its solutions are stable, so a standard solution is made by direct weighing. It is used to estimate **Fe²⁺** (and I⁻ via iodine). The green Cr³⁺ masks the end point, so an **internal indicator** such as **diphenylamine** (or N-phenylanthranilic acid) is used; HCl may be used to acidify, because dichromate does not oxidise chloride under these conditions.',
      v: table(['Feature', 'KMnO₄', 'K₂Cr₂O₇'], [['Primary standard?', 'No', 'Yes'], ['Indicator', 'Self', 'Diphenylamine'], ['Electrons per ion (acid)', '5', '6'], ['Can HCl be used?', 'No', 'Yes'], ['Colour change', 'Purple → colourless', 'Orange → green']], 'Table comparing permanganate and dichromate as titrants'),
      n: 'Potassium dichromate is a primary standard: it is very pure, does not absorb moisture and its solutions keep, so you can weigh it directly. It is used mainly to estimate iron two plus. Because the green chromium three plus colour hides the end point, an indicator such as diphenylamine is added. Unlike permanganate, it does not oxidise chloride in these titrations.',
    }),
    sl('example', 'Worked example: iron by dichromate', {
      b: r`**Problem.** $0.294\ \text{g}$ of $\ce{K2Cr2O7}$ ($M = 294$) is dissolved and used to oxidise iron(II) completely in acid. What mass of iron (Fe = 56) was present as Fe²⁺?

**Step 1.** $n(\ce{Cr2O7^2-}) = 0.294 \div 294 = 1.0 \times 10^{-3}\ \text{mol}$.

**Step 2.** Ratio 1 : 6, so $n(\ce{Fe^2+}) = 6 \times 1.0 \times 10^{-3} = 6.0 \times 10^{-3}\ \text{mol}$.

**Step 3.** Mass $= 6.0 \times 10^{-3} \times 56 = 0.336\ \text{g}$.`,
      v: table(['Quantity', 'Value'], [['K₂Cr₂O₇', '1.0 × 10⁻³ mol'], ['Ratio Cr₂O₇²⁻ : Fe²⁺', '1 : 6'], ['Fe²⁺', '6.0 × 10⁻³ mol'], ['Mass of iron', '0.336 g']], 'Table of the dichromate titration calculation'),
      n: 'First convert the mass of potassium dichromate to moles: one thousandth of a mole. The ionic equation shows that one dichromate oxidises six iron two plus ions, so six thousandths of a mole of iron reacted. Multiplying by fifty six gives about a third of a gram of iron. Notice how the mole ratio from the equation does most of the work.',
    }),
    sl('check', 'Quick check: dichromate as oxidant', {
      b: 'Identify the products or electron count when dichromate acts as an oxidant.',
      n: 'Quick check. Each dichromate ion gains six electrons and gives two chromium three plus ions.',
      chk: 'cr-electrons-mcq',
    }),
    sl('check', 'Quick check: titrants compared', {
      b: 'Compare KMnO₄ and K₂Cr₂O₇ as titrants.',
      n: 'Quick check. Think about which one can be weighed directly as a primary standard and which one is its own indicator.',
      chk: 'standard-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Chromite → Na₂CrO₄ (roast with Na₂CO₃ in air) → Na₂Cr₂O₇ (acid) → K₂Cr₂O₇ (KCl).',
        'CrO₄²⁻ tetrahedral; Cr₂O₇²⁻ two tetrahedra sharing an O (Cr–O–Cr about 126°).',
        '2CrO₄²⁻ + 2H⁺ ⇌ Cr₂O₇²⁻ + H₂O: yellow ⇌ orange, not redox.',
        'Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O: orange → green; oxidises Fe²⁺, I⁻, SO₂, H₂S, ethanol.',
        'Primary standard; diphenylamine indicator; ratio 1 : 6 with Fe²⁺.',
      ],
      v: table(['Oxidant', 'Electrons (acid)', 'Ratio with Fe²⁺'], [['MnO₄⁻', '5', '1 : 5'], ['Cr₂O₇²⁻', '6', '1 : 6']], 'Summary table of the two oxidants'),
      n: 'Let us sum up Part 2. Potassium dichromate is made from chromite by roasting with sodium carbonate in air, acidifying, and adding potassium chloride. The dichromate ion is two tetrahedra sharing an oxygen. It changes to chromate in alkali without any redox change. In acid it gains six electrons and turns green, and as a primary standard it is ideal for estimating iron two plus.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'In the chromite equation, check that oxygen balances: 7O₂ for 4FeCr₂O₄.',
        'State clearly that chromate ⇌ dichromate is not a redox change.',
        'Use the ratio 1 : 6 for dichromate and Fe²⁺.',
        'Name an indicator for dichromate titrations (diphenylamine).',
      ],
      v: table(['Slip', 'Fix'], [['Cr changes oxidation state with pH', 'Cr stays +6'], ['Dichromate is its own indicator', 'Use diphenylamine'], ['Ratio 1 : 3 with Fe²⁺', 'Ratio 1 : 6']], 'Table of three common slips in Part 2 and fixes'),
      n: 'Final tips. Check the oxygen balance in the chromite roasting equation carefully. Say clearly that the chromate to dichromate change is not redox. Use the one to six ratio with iron two plus, and remember that dichromate needs an indicator such as diphenylamine. A neat table comparing the two oxidants often earns full marks.',
    }),
  ],
});
