// ICSE 10 Chemistry ch12 Study of Compounds: Sulphuric Acid — two decks: Part 1 (t01, t02) the Contact process
// (equations and conditions only) and dilute sulphuric acid as a dibasic acid; Part 2 (t03–t05) concentrated sulphuric
// acid as an oxidising agent, a dehydrating agent and a non-volatile acid, and tests for sulphuric acid and sulphates.
import { sl, deck, table, flow, svgV, chem } from './lib.mjs';
import { SUGAR_CHAR, CUSO4_WHITE } from './svgs.mjs';

const V = {
  sugar: svgV(SUGAR_CHAR, 'Concentrated sulphuric acid poured on white sugar in a beaker; a few minutes later a tall black spongy column of carbon rises out of the hot beaker with steam'),
  cuso4: svgV(CUSO4_WHITE, 'Blue copper(II) sulphate crystals in a test tube turn into a white powder when concentrated sulphuric acid is added'),
};

export const deck1 = deck({
  part: 1,
  title: 'Sulphuric Acid — Part 1: The Contact process and the dilute acid',
  goals: [
    'Write the equations, with catalyst and conditions, for the Contact process',
    'Explain why sulphur trioxide is absorbed in concentrated sulphuric acid and not in water',
    'Explain why sulphuric acid is dibasic and forms normal and acid salts',
    'Write equations for dilute sulphuric acid with metals, oxides, hydroxides, carbonates, hydrogen carbonates, sulphites, hydrogen sulphites and sulphides',
  ],
  slides: [
    sl('title', 'The king of chemicals', {
      b: 'Part 1 — Sulphuric acid, H₂SO₄, is called the **king of chemicals**: more of it is made than any other chemical, for **fertilisers**, **detergents**, **paints**, **car batteries** and the refining of petroleum.',
      v: table(['Property', 'Sulphuric acid'], [['Formula', 'H₂SO₄ (dibasic)'], ['Appearance', 'Colourless, dense, oily liquid'], ['Boiling point', 'High: about 338 °C (non-volatile)'], ['Mixing with water', 'Gives out a lot of heat'], ['Uses', 'Fertilisers, detergents, batteries, paints']], 'Table of the formula, appearance, boiling point and uses of sulphuric acid'),
      n: 'Namaste! Sulphuric acid is often called the king of chemicals, because industry makes more of it than of any other chemical. It goes into fertilisers, detergents, paints and car batteries. It is a heavy, oily, colourless liquid with a high boiling point. In this part we see how it is manufactured and how the dilute acid behaves.',
    }),
    sl('concept', 'Contact process, step 1: sulphur dioxide', {
      b: 'Sulphur is **burnt in air** to give sulphur dioxide. (Sulphur dioxide can also be obtained by **roasting iron pyrites**, FeS₂.) The gas is **purified and dried** before the next step.',
      v: chem('S + O2 -> SO2', 'Equation: sulphur plus oxygen gives sulphur dioxide', 'Burning sulphur in air'),
      n: 'The Contact process starts with sulphur dioxide. Molten sulphur is burnt in air, and it combines with oxygen to form sulphur dioxide gas. Sulphur dioxide can also come from roasting iron pyrites, an ore of iron and sulphur. Before going further, the gas is cleaned and dried.',
    }),
    sl('concept', 'Contact process, step 2: the catalytic step', {
      b: 'Sulphur dioxide and **excess air** pass over **vanadium pentoxide** (V₂O₅) at about **450 °C** and **1–2 atm**. The reaction is **reversible** and **exothermic**. The name “contact” comes from the gases reacting **in contact with the catalyst** surface.',
      v: chem('2SO2 + O2 <=> 2SO3', 'Equation: two sulphur dioxide plus oxygen reversibly gives two sulphur trioxide', 'Vanadium pentoxide, about 450 °C, 1–2 atm'),
      n: 'This is the key step. Sulphur dioxide and extra air are passed over a catalyst of vanadium pentoxide at about four hundred and fifty degrees Celsius and only one or two atmospheres. Sulphur dioxide combines with oxygen to form sulphur trioxide. The reaction is reversible and gives out heat, and it takes place on the surface of the catalyst, which gives the process its name.',
    }),
    sl('check', 'Quick check: the catalyst', {
      b: 'Recall the catalyst and temperature for oxidising sulphur dioxide.',
      n: 'Quick check. Which oxide of vanadium is used, and at about what temperature?',
      chk: 'v2o5-chk-mcq',
    }),
    sl('diagram', 'Contact process: the whole route', {
      b: '**Step 3.** Sulphur trioxide is **dissolved in concentrated sulphuric acid** to give **oleum** (fuming sulphuric acid).\n\n**Step 4.** Oleum is **diluted with the right amount of water** to give sulphuric acid of the required strength.\n\nSO₃ + H₂SO₄ → H₂S₂O₇; H₂S₂O₇ + H₂O → 2H₂SO₄',
      v: flow('LR', [['a', 'Sulphur + air'], ['b', 'SO₂ (purified, dried)'], ['c', 'SO₃'], ['d', 'Oleum, H₂S₂O₇'], ['e', 'H₂SO₄']], [['a', 'b', 'burn'], ['b', 'c', 'V₂O₅, 450 °C, 1–2 atm'], ['c', 'd', 'into conc. H₂SO₄'], ['d', 'e', '+ water']], 'Flow of the Contact process from sulphur and air through sulphur dioxide, sulphur trioxide and oleum to sulphuric acid'),
      n: 'Here is the full route. Sulphur burns to sulphur dioxide, which is oxidised to sulphur trioxide over the catalyst. The sulphur trioxide is then dissolved in concentrated sulphuric acid, forming a thick, fuming liquid called oleum. Finally, oleum is diluted with exactly the right amount of water to give sulphuric acid.',
    }),
    sl('concept', 'Why not dissolve SO₃ in water?', {
      b: 'Sulphur trioxide reacts with water **very exothermically**. The heat turns the acid into a **dense fog (mist)** of tiny droplets that does **not condense easily** and escapes. Dissolving it in **concentrated sulphuric acid** is smooth and controllable.',
      v: table(['Absorbing SO₃ in', 'Result'], [['Water directly', 'Violent, heat given out; acid mist forms and is lost'], ['Concentrated H₂SO₄', 'Smooth absorption to oleum, H₂S₂O₇'], ['Oleum + water', 'Controlled dilution to H₂SO₄']], 'Table comparing absorption of sulphur trioxide in water and in concentrated sulphuric acid'),
      n: 'Why the extra step? If sulphur trioxide is passed straight into water, the reaction is so violent and gives out so much heat that a thick fog of acid droplets forms. This fog is very hard to condense, so acid is lost into the air. Absorbing the gas in concentrated sulphuric acid avoids the fog, and the oleum can then be diluted safely.',
    }),
    sl('example', 'Worked example: acid from sulphur', {
      b: '**Problem.** What mass of sulphuric acid can be made from 8 g of sulphur in the Contact process, assuming complete conversion? (S = 32, H = 1, O = 16)\n\n**Step 1.** Follow the sulphur: S → SO₂ → SO₃ → H₂SO₄, so 1 mole S gives 1 mole H₂SO₄.\n\n**Step 2.** Moles of S = 8 ÷ 32 = 0.25.\n\n**Step 3.** H₂SO₄ = 2 + 32 + 64 = 98; mass = 0.25 × 98 = **24.5 g**.',
      v: table(['Quantity', 'Value'], [['Moles of S', '0.25'], ['Mole ratio S : H₂SO₄', '1 : 1'], ['Molar mass of H₂SO₄', '98'], ['Mass of H₂SO₄', '24.5 g']], 'Table of the steps from 8 grams of sulphur to 24.5 grams of sulphuric acid'),
      n: 'Track the sulphur atom through every step: one sulphur atom ends up in one sulphuric acid molecule. Eight grams of sulphur is a quarter of a mole, because the molar mass of sulphur is thirty two. A quarter of a mole of sulphuric acid, with molar mass ninety eight, weighs twenty four point five grams.',
    }),
    sl('check', 'Quick check: absorbing sulphur trioxide', {
      b: 'Explain why sulphur trioxide is not passed directly into water.',
      n: 'Quick check. Think about the heat given out and what happens to the acid formed.',
      chk: 'oleum-chk-mcq',
    }),
    sl('concept', 'A dibasic acid', {
      b: 'Each molecule of sulphuric acid can give **two hydrogen ions**, so it is **dibasic**: H₂SO₄ → 2H⁺ + SO₄²⁻ (in two stages, through HSO₄⁻). It therefore forms **two kinds of salt** with a base:\n\n- an **acid salt** when only one H is replaced: NaOH + H₂SO₄ → NaHSO₄ + H₂O\n- a **normal salt** when both are replaced: 2NaOH + H₂SO₄ → Na₂SO₄ + 2H₂O',
      v: table(['Moles of NaOH per mole of H₂SO₄', 'Salt formed', 'Type'], [['1', 'Sodium hydrogen sulphate, NaHSO₄', 'Acid salt'], ['2', 'Sodium sulphate, Na₂SO₄', 'Normal salt']], 'Table of the acid salt and the normal salt formed from sulphuric acid and sodium hydroxide'),
      n: 'Every sulphuric acid molecule has two hydrogen atoms that can be replaced by a metal, so we call it dibasic. If only one of them is replaced, we get an acid salt such as sodium hydrogen sulphate, which still has a replaceable hydrogen. If both are replaced, we get a normal salt, sodium sulphate. Which one forms depends on how much alkali is used.',
    }),
    sl('concept', 'Dilute acid with metals, oxides and hydroxides', {
      b: 'Dilute sulphuric acid behaves as a typical **strong acid**. Metals **above hydrogen** give **hydrogen**; copper does not react.',
      v: table(['Reacts with', 'Example equation'], [['Metal', 'Mg + H₂SO₄ → MgSO₄ + H₂'], ['Metal', 'Fe + H₂SO₄ → FeSO₄ + H₂'], ['Basic oxide', 'CuO + H₂SO₄ → CuSO₄ + H₂O'], ['Hydroxide', '2KOH + H₂SO₄ → K₂SO₄ + 2H₂O'], ['Ammonium hydroxide', '2NH₄OH + H₂SO₄ → (NH₄)₂SO₄ + 2H₂O']], 'Table of dilute sulphuric acid with metals, a basic oxide and hydroxides'),
      n: 'Dilute sulphuric acid is a strong acid. Magnesium and iron, which are above hydrogen in the activity series, dissolve in it and give hydrogen gas and the metal sulphate. Copper, below hydrogen, does not react. Basic oxides such as black copper oxide dissolve to give a sulphate and water, and alkalis are neutralised in the same way.',
    }),
    sl('concept', 'Dilute acid with salts of weaker acids', {
      b: 'Dilute sulphuric acid **displaces weaker, more volatile acids** from their salts, which then give off a gas:',
      v: table(['Salt', 'Example equation', 'Gas'], [['Carbonate', 'Na₂CO₃ + H₂SO₄ → Na₂SO₄ + H₂O + CO₂', 'CO₂'], ['Hydrogen carbonate', '2NaHCO₃ + H₂SO₄ → Na₂SO₄ + 2H₂O + 2CO₂', 'CO₂'], ['Sulphite', 'Na₂SO₃ + H₂SO₄ → Na₂SO₄ + H₂O + SO₂', 'SO₂'], ['Hydrogen sulphite', '2NaHSO₃ + H₂SO₄ → Na₂SO₄ + 2H₂O + 2SO₂', 'SO₂'], ['Sulphide', 'FeS + H₂SO₄ → FeSO₄ + H₂S', 'H₂S (rotten-egg smell)']], 'Table of dilute sulphuric acid with a carbonate, a hydrogen carbonate, a sulphite, a hydrogen sulphite and a sulphide'),
      n: 'Salts of weaker acids react with dilute sulphuric acid and give off a gas. Carbonates and hydrogen carbonates give carbon dioxide. Sulphites and hydrogen sulphites give sulphur dioxide, which smells of burning sulphur. Sulphides give hydrogen sulphide, with its smell of rotten eggs. In every case a sulphate is left behind.',
    }),
    sl('example', 'Worked example: the reaction that stops', {
      b: '**Problem.** Marble chips (calcium carbonate) are dropped into dilute sulphuric acid. There is brisk fizzing at first, but it soon stops although both marble and acid are left. Explain, with an equation.\n\n**Step 1.** CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂.\n\n**Step 2.** Calcium sulphate is **only slightly soluble**. It forms a **coating** on the marble.\n\n**Step 3.** The coating **stops the acid reaching** the carbonate, so the reaction stops. (Dilute hydrochloric acid is used instead to make CO₂.)',
      v: table(['Acid on marble', 'Salt formed', 'Solubility', 'Reaction'], [['Dilute H₂SO₄', 'CaSO₄', 'Slightly soluble: coats the chips', 'Stops'], ['Dilute HCl', 'CaCl₂', 'Very soluble', 'Continues']], 'Table comparing marble chips with dilute sulphuric acid and dilute hydrochloric acid'),
      n: 'At first marble fizzes in dilute sulphuric acid as carbon dioxide is given off. But the calcium sulphate formed hardly dissolves, so it builds up as a coat over the chips. The acid can no longer reach the calcium carbonate underneath, and the fizzing stops. That is why dilute hydrochloric acid, not sulphuric acid, is used with marble to prepare carbon dioxide.',
    }),
    sl('check', 'Quick check: normal or acid salt?', {
      b: 'Decide which salt forms when sodium hydroxide and sulphuric acid react in a one to one mole ratio.',
      n: 'Quick check. If only one of the two hydrogens is replaced, what kind of salt do you get?',
      chk: 'acidsalt-chk-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Contact: S + O₂ → SO₂; 2SO₂ + O₂ ⇌ 2SO₃ (V₂O₅, about 450 °C, 1–2 atm); SO₃ + H₂SO₄ → H₂S₂O₇; H₂S₂O₇ + H₂O → 2H₂SO₄.',
        'SO₃ is not absorbed in water: a dense acid mist forms.',
        'Dibasic: acid salts (NaHSO₄) and normal salts (Na₂SO₄).',
        'Dilute acid: metals above H give H₂; carbonates give CO₂; sulphites give SO₂; sulphides give H₂S.',
      ],
      v: table(['Step', 'Equation', 'Condition'], [['1', 'S + O₂ → SO₂', 'Burning in air'], ['2', '2SO₂ + O₂ ⇌ 2SO₃', 'V₂O₅, about 450 °C, 1–2 atm'], ['3', 'SO₃ + H₂SO₄ → H₂S₂O₇', 'Absorb in conc. acid'], ['4', 'H₂S₂O₇ + H₂O → 2H₂SO₄', 'Dilute with water']], 'Summary table of the four steps of the Contact process with conditions'),
      n: 'Let us sum up Part 1. In the Contact process, sulphur burns to sulphur dioxide, which is oxidised over vanadium pentoxide to sulphur trioxide. This is absorbed in concentrated acid to give oleum, which is diluted to sulphuric acid. The acid is dibasic, forming acid salts and normal salts, and the dilute acid reacts with metals, bases and salts of weaker acids.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Write the double arrow for 2SO₂ + O₂ ⇌ 2SO₃ and give catalyst, temperature and pressure.',
        'Give the reason for oleum in one line: a dense mist of acid that does not condense.',
        'Name the salt type: NaHSO₄ is an acid salt, Na₂SO₄ a normal salt.',
        'Plant details are not needed: equations with conditions are enough.',
      ],
      v: table(['Slip', 'Fix'], [['Catalyst: platinum', 'Vanadium pentoxide (platinum is for Ostwald’s process)'], ['SO₃ + H₂O → H₂SO₄ in the plant', 'SO₃ is absorbed in conc. H₂SO₄ first'], ['Cu + dil. H₂SO₄ → CuSO₄ + H₂', 'Copper does not react with the dilute acid']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some tips. Show the oxidation of sulphur dioxide with a double arrow, and always give the catalyst, temperature and pressure. Explain the use of oleum by mentioning the acid mist. Say whether a salt is an acid salt or a normal salt. And remember that copper does not react with dilute sulphuric acid.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Sulphuric Acid — Part 2: The concentrated acid and tests',
  goals: [
    'Write equations for hot concentrated sulphuric acid oxidising carbon and sulphur',
    'Describe and explain the action of concentrated sulphuric acid on sugar and on blue vitriol',
    'Distinguish dehydration from drying',
    'Use the non-volatile nature of sulphuric acid to prepare HCl and HNO₃, and test for sulphuric acid and sulphates',
  ],
  slides: [
    sl('title', 'Three powers of the concentrated acid', {
      b: 'Part 2 — **Concentrated** sulphuric acid shows three special properties besides being an acid:',
      v: table(['Property', 'What it does', 'Example'], [['Oxidising agent', 'Gives oxygen when hot', 'Oxidises carbon and sulphur'], ['Dehydrating agent', 'Removes the elements of water', 'Chars sugar; whitens blue vitriol'], ['Non-volatile acid', 'High boiling point', 'Drives out HCl and HNO₃ from their salts']], 'Table of three properties of concentrated sulphuric acid with what each does and an example'),
      n: 'Concentrated sulphuric acid is far more than a strong acid. When hot, it is an oxidising agent. It has such a strong pull on water that it removes water even from compounds like sugar. And because it has a high boiling point, it can push more volatile acids out of their salts. We look at each of these in turn.',
    }),
    sl('concept', 'Oxidising agent: carbon and sulphur', {
      b: '**Hot concentrated** sulphuric acid gives oxygen (H₂SO₄ → H₂O + SO₂ + [O]) and is itself reduced to **sulphur dioxide**:',
      v: table(['Heated with', 'Balanced equation', 'Products'], [['Carbon (charcoal)', 'C + 2H₂SO₄ → CO₂ + 2H₂O + 2SO₂', 'CO₂, water, SO₂'], ['Sulphur', 'S + 2H₂SO₄ → 3SO₂ + 2H₂O', 'SO₂ and water only']], 'Table of the oxidation of carbon and sulphur by hot concentrated sulphuric acid'),
      n: 'When it is hot and concentrated, sulphuric acid releases oxygen and is reduced to sulphur dioxide. Charcoal is oxidised to carbon dioxide, so the gas given off is a mixture of carbon dioxide and sulphur dioxide. Sulphur is oxidised to sulphur dioxide, so in that case sulphur dioxide is the only gas, along with water.',
    }),
    sl('example', 'Worked example: gas from charcoal', {
      b: '**Problem.** 1.2 g of charcoal is heated with excess concentrated sulphuric acid. Find the total volume of gas (CO₂ and SO₂) at STP. (C = 12; molar volume 22.4 L)\n\n**Step 1.** C + 2H₂SO₄ → CO₂ + 2H₂O + 2SO₂: 1 mole C gives 1 mole CO₂ and 2 moles SO₂.\n\n**Step 2.** Moles of C = 1.2 ÷ 12 = 0.1.\n\n**Step 3.** Gas = 0.1 + 0.2 = 0.3 mole; volume = 0.3 × 22.4 = **6.72 L** (2.24 L CO₂, 4.48 L SO₂).',
      v: table(['Gas', 'Moles', 'Volume at STP'], [['CO₂', '0.1', '2.24 L'], ['SO₂', '0.2', '4.48 L'], ['Total', '0.3', '6.72 L']], 'Table of the moles and volumes of carbon dioxide and sulphur dioxide from 1.2 grams of charcoal'),
      n: 'The equation tells us that one unit of carbon gives one unit of carbon dioxide and two of sulphur dioxide. One point two grams of carbon is zero point one mole. So we get zero point one mole of carbon dioxide and zero point two mole of sulphur dioxide, zero point three mole in all, which is six point seven two litres at standard conditions.',
    }),
    sl('check', 'Quick check: oxidising carbon', {
      b: 'Name the gases given off when charcoal is heated with concentrated sulphuric acid.',
      n: 'Quick check. Carbon is oxidised, and the acid is reduced. What does each become?',
      chk: 'carbon-chk-mcq',
    }),
    sl('diagram', 'Dehydrating agent: sugar', {
      b: 'Concentrated sulphuric acid removes **hydrogen and oxygen in the ratio 2 : 1** (the elements of water) from sugar. The sugar turns **yellow, brown, then black**; a **spongy column of carbon** rises, with **steam** and much **heat**. This is called **charring**.\n\nC₁₂H₂₂O₁₁ → 12C + 11H₂O (conc. H₂SO₄)',
      v: V.sugar,
      n: 'Pour a little concentrated sulphuric acid onto white sugar in a beaker and wait. The sugar turns yellow, then brown, then black, and a black spongy column of carbon slowly climbs out of the beaker, hissing steam. The beaker gets very hot. The acid has pulled hydrogen and oxygen out of the sugar as water, leaving carbon behind.',
    }),
    sl('concept', 'Dehydrating agent: blue vitriol', {
      b: 'Blue crystals of **hydrated copper(II) sulphate** (blue vitriol) turn **white** when concentrated sulphuric acid is added, as the acid removes the **water of crystallisation**:\n\nCuSO₄·5H₂O → CuSO₄ + 5H₂O (conc. H₂SO₄)',
      v: V.cuso4,
      n: 'Blue copper sulphate crystals owe their colour to water of crystallisation. When concentrated sulphuric acid is added, it takes this water away, and the blue crystals crumble to a white powder of anhydrous copper sulphate. Adding water to the white powder would bring the blue colour back.',
    }),
    sl('concept', 'Dehydration is not drying', {
      b: '**Drying:** removing **moisture** (water that is merely present) from a substance, for example drying a gas. **Dehydration:** removing the **elements of water** (H and O in the ratio 2 : 1) from a **compound**, or its water of crystallisation.',
      v: table(['Feature', 'Drying', 'Dehydration'], [['What is removed', 'Moisture (free water)', 'Elements of water from a compound'], ['Example', 'Moist chlorine passed through conc. H₂SO₄', 'Conc. H₂SO₄ on sugar or blue vitriol'], ['Substance changed?', 'No (same substance, now dry)', 'Yes (a new substance forms)']], 'Table comparing drying and dehydration with examples'),
      n: 'Drying and dehydration are different. Drying removes water that is simply mixed with a substance, such as moisture in a gas, and the substance itself does not change. Dehydration removes hydrogen and oxygen from inside a compound, in the same ratio as in water, so a new substance forms. Charring sugar is dehydration; passing moist chlorine through the acid is drying.',
    }),
    sl('check', 'Quick check: dehydrating sugar', {
      b: 'Name the property shown when concentrated sulphuric acid chars sugar.',
      n: 'Quick check. The acid removed hydrogen and oxygen from the sugar in the same ratio as in water. What property is that?',
      chk: 'dehyd-chk-mcq',
    }),
    sl('concept', 'Which gases can it dry?', {
      b: 'Concentrated sulphuric acid dries gases that **do not react** with it, such as **chlorine, sulphur dioxide, hydrogen chloride, oxygen and carbon dioxide**. It **cannot dry ammonia** (a base: forms ammonium sulphate) or **hydrogen sulphide** (oxidised to sulphur).',
      v: table(['Gas', 'Dried by conc. H₂SO₄?', 'Reason'], [['Chlorine, SO₂, HCl, CO₂', 'Yes', 'No reaction'], ['Ammonia', 'No', '2NH₃ + H₂SO₄ → (NH₄)₂SO₄'], ['Hydrogen sulphide', 'No', 'Oxidised: H₂S + H₂SO₄ → S + SO₂ + 2H₂O']], 'Table of gases that can and cannot be dried by concentrated sulphuric acid'),
      n: 'Because it absorbs water so strongly, concentrated sulphuric acid is used to dry many gases, such as chlorine, sulphur dioxide, hydrogen chloride and carbon dioxide, which simply bubble through it. But it cannot dry ammonia, which is a base and reacts with the acid, or hydrogen sulphide, which the acid oxidises to sulphur.',
    }),
    sl('concept', 'Non-volatile acid', {
      b: 'Concentrated sulphuric acid has a **high boiling point** (about 338 °C), so it is **non-volatile**. Heated with salts of **volatile acids**, it drives those acids out as vapour, which is used to **prepare HCl and HNO₃**:\n\n- NaCl + H₂SO₄ → NaHSO₄ + HCl (below 200 °C)\n- KNO₃ + H₂SO₄ → KHSO₄ + HNO₃ (below 200 °C)',
      v: chem('KCl + H2SO4 -> KHSO4 + HCl', 'Equation: potassium chloride plus sulphuric acid gives potassium hydrogen sulphate plus hydrogen chloride', 'Non-volatile acid driving out a volatile acid'),
      n: 'Sulphuric acid boils at a much higher temperature than hydrochloric or nitric acid. So when it is heated with a chloride or a nitrate, the more volatile acid escapes as a vapour and the sulphuric acid stays behind. That is how hydrogen chloride and nitric acid are prepared in the laboratory, from common salt and from potassium nitrate.',
    }),
    sl('example', 'Worked example: identifying a sulphate', {
      b: '**Problem.** A colourless solution Y gives a **white precipitate** with barium chloride solution. The precipitate does **not dissolve** in dilute hydrochloric acid. Y also turns blue litmus red. Identify Y and write the equation.\n\n**Step 1.** White precipitate with BaCl₂, insoluble in HCl → **sulphate ion** (BaSO₄).\n\n**Step 2.** Turns blue litmus red → an **acid**.\n\n**Step 3.** Y is **dilute sulphuric acid**: BaCl₂ + H₂SO₄ → BaSO₄ + 2HCl.',
      v: table(['Test on Y', 'Observation', 'Inference'], [['Blue litmus', 'Turns red', 'Acidic'], ['BaCl₂ solution', 'White precipitate', 'SO₄²⁻ (or SO₃²⁻, CO₃²⁻)'], ['Add dilute HCl', 'Precipitate stays', 'Sulphate confirmed']], 'Table of tests on solution Y with observations and inferences'),
      n: 'Barium chloride gives a white precipitate with sulphates, but also with sulphites and carbonates. Adding dilute hydrochloric acid settles it: barium sulphite and carbonate dissolve, while barium sulphate does not. Since Y also turns blue litmus red, it must be dilute sulphuric acid.',
    }),
    sl('concept', 'Tests for sulphuric acid', {
      b: '- **Barium chloride** (or barium nitrate) solution: **white precipitate** of BaSO₄, **insoluble** in dilute HCl or HNO₃.\n- **Lead nitrate** solution: **white precipitate** of PbSO₄: Pb(NO₃)₂ + H₂SO₄ → PbSO₄ + 2HNO₃.\n- **Concentrated** acid: **chars** sugar or paper.',
      v: flow('TB', [['a', 'Colourless acid'], ['b', 'Add BaCl₂ solution'], ['c', 'White precipitate'], ['d', 'Add dilute HCl'], ['e', 'Precipitate stays: sulphate (H₂SO₄)'], ['f', 'Precipitate dissolves: not a sulphate']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e'], ['d', 'f']], 'Flow chart of the barium chloride test for sulphuric acid and sulphates'),
      n: 'To confirm sulphuric acid, add barium chloride solution: a white precipitate of barium sulphate forms, and it does not dissolve in dilute hydrochloric acid. Lead nitrate solution also gives a white precipitate, of lead sulphate. And a drop of the concentrated acid on sugar or paper turns it black.',
    }),
    sl('check', 'Quick check: the sulphate test', {
      b: 'Predict what barium chloride does with dilute sulphuric acid.',
      n: 'Quick check. What colour is the precipitate, and does it dissolve in dilute hydrochloric acid?',
      chk: 'baso4-chk-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Oxidising (hot, conc.): C + 2H₂SO₄ → CO₂ + 2H₂O + 2SO₂; S + 2H₂SO₄ → 3SO₂ + 2H₂O.',
        'Dehydrating: chars sugar (C₁₂H₂₂O₁₁ → 12C + 11H₂O); whitens blue vitriol.',
        'Drying ≠ dehydration; conc. H₂SO₄ cannot dry NH₃ or H₂S.',
        'Non-volatile: prepares HCl and HNO₃ from chlorides and nitrates.',
        'Test: BaCl₂ gives white BaSO₄, insoluble in dilute HCl.',
      ],
      v: table(['Property', 'Key reaction'], [['Oxidising', 'Carbon → CO₂; sulphur → SO₂'], ['Dehydrating', 'Sugar → carbon; CuSO₄·5H₂O → CuSO₄'], ['Non-volatile', 'NaCl → HCl; KNO₃ → HNO₃'], ['Acidic (test)', 'BaCl₂ → white BaSO₄']], 'Summary table of the properties of concentrated sulphuric acid with a key reaction for each'),
      n: 'Let us sum up Part 2. Hot concentrated sulphuric acid oxidises carbon and sulphur and is reduced to sulphur dioxide. It dehydrates sugar to carbon and blue vitriol to a white powder. It dries gases that do not react with it. Its high boiling point lets it drive hydrochloric and nitric acids out of their salts. Barium chloride gives a white precipitate that confirms a sulphate.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Use the word “hot” for the oxidising reactions with carbon and sulphur.',
        'In sugar questions, give at least two observations: blackening, a rising spongy mass, steam, heat.',
        'For drying versus dehydration, give one example of each.',
        'In the sulphate test, always add dilute HCl to show the precipitate is insoluble.',
      ],
      v: table(['Slip', 'Fix'], [['S + H₂SO₄ gives H₂S', 'It gives SO₂ and water'], ['Sugar charring is oxidation', 'It is dehydration'], ['Conc. H₂SO₄ dries ammonia', 'It reacts with ammonia']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. Say hot and concentrated for the oxidation reactions. For sugar, examiners want at least two observations, such as the black spongy mass and the steam. Give an example each of drying and dehydration. And in the sulphate test, add dilute hydrochloric acid to show the white precipitate does not dissolve.',
    }),
  ],
});
