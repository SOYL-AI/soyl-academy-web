// ISC 12 Chemistry ch02 Colligative Properties — two decks: Part 1 (t01–t03) relative lowering of vapour pressure,
// elevation of boiling point and depression of freezing point (with derivations); Part 2 (t04–t05) osmosis and osmotic
// pressure (van't Hoff laws), abnormal molar masses and the van't Hoff factor.
import { sl, deck, table, flow, svgV, plot, chem, r } from './lib.mjs';
import { VPLOWER, OSMOSIS, RO } from './svgs.mjs';

export const V = {
  vplower: svgV(VPLOWER, 'Pure solvent with many particles escaping from the surface beside a solution in which solute particles occupy part of the surface and fewer solvent particles escape', 'Schematic: fewer solvent particles at the surface means fewer escape per second.'),
  osmosis: svgV(OSMOSIS, 'U-tube with a semipermeable membrane: water flows from the pure-water arm into the sugar-solution arm until the solution level stands higher by a height h', 'At equilibrium the pressure of the extra column of height h equals the osmotic pressure of the solution.'),
  ro: svgV(RO, 'Reverse osmosis: a piston presses sea water against a membrane with a pressure above its osmotic pressure, forcing pure water through to the other side'),
};

// Vapour pressure of solvent and solution near the boiling point (bar), illustrative.
export const boilPlot = plot(
  {
    x: { min: 368, max: 378, label: 'Temperature (K)' },
    y: { min: 0.8, max: 1.2, label: 'Vapour pressure (bar)' },
    series: [
      { label: 'Pure solvent', kind: 'line', points: [[368, 0.85], [370, 0.91], [372, 0.98], [373.15, 1.013], [374, 1.04], [376, 1.11], [378, 1.19]] },
      { label: 'Solution', kind: 'line', points: [[368, 0.82], [370, 0.88], [372, 0.95], [374, 1.0], [374.5, 1.013], [376, 1.07], [378, 1.15]] },
    ],
    hlines: [{ y: 1.013, label: 'Atmospheric pressure', dashed: true }],
    vlines: [{ x: 373.15, label: 'Tb°', dashed: true }, { x: 374.5, label: 'Tb', dashed: true }],
  },
  'Vapour pressure against temperature near the boiling point: the solution curve runs just below and nearly parallel to the pure-solvent curve, so it reaches atmospheric pressure at a higher temperature; the gap between the two boiling points is the elevation',
  'Illustrative; over this small range the curves are nearly straight and parallel, which is the basis of the derivation.',
);
// Vapour pressure of solid solvent, liquid solvent and solution near the freezing point (illustrative units).
export const freezePlot = plot(
  {
    x: { min: 266, max: 276, label: 'Temperature (K)' },
    y: { min: 0, max: 8, label: 'Vapour pressure (arbitrary units)' },
    series: [
      { label: 'Solid solvent (ice)', kind: 'line', points: [[266, 1.6], [268, 2.6], [270, 3.6], [271.6, 4.4], [273.15, 5.2], [274, 5.6]] },
      { label: 'Liquid solvent', kind: 'line', points: [[268, 3.65], [270, 4.2], [272, 4.8], [273.15, 5.2], [274, 5.45], [276, 6.05]] },
      { label: 'Solution', kind: 'line', points: [[268, 3.15], [270, 3.75], [271.6, 4.4], [272, 4.5], [274, 5.05], [276, 5.6]] },
    ],
    vlines: [{ x: 271.6, label: 'Tf', dashed: true }, { x: 273.15, label: 'Tf°', dashed: true }],
  },
  'Vapour pressure against temperature near the freezing point: the steep line for the solid crosses the liquid-solvent line at the normal freezing point and crosses the lower solution line at a lower temperature, which is the freezing point of the solution',
  'Illustrative curves. The solution freezes where its vapour pressure equals that of the solid solvent.',
);

export const deck1 = deck({
  part: 1,
  title: 'Colligative Properties — Part 1: Vapour pressure, boiling point and freezing point',
  goals: [
    'Explain why colligative properties depend on the number, not the nature, of solute particles',
    'Calculate molar mass from the relative lowering of vapour pressure',
    'Derive the expressions for elevation of boiling point and depression of freezing point',
    'Calculate molar mass from boiling point elevation and freezing point depression',
  ],
  slides: [
    sl('title', 'Colligative properties', {
      b: 'Part 1 — three effects of a non-volatile solute that depend only on **how many** particles it supplies.',
      v: flow('TB', [['s', 'Non-volatile solute added'], ['a', 'Relative lowering of vapour pressure'], ['b', 'Elevation of boiling point'], ['c', 'Depression of freezing point'], ['d', 'Osmotic pressure (Part 2)']], [['s', 'a'], ['s', 'b'], ['s', 'c'], ['s', 'd']], 'Flow: adding a non-volatile solute causes four colligative effects'),
      n: 'Why is salt spread on icy roads in cold countries, why does a pressure cooker of salted water take a little longer to boil, and how did chemists find the molar mass of new compounds before modern instruments? All of these involve colligative properties: properties of a solution that depend only on the number of solute particles, not on what they are. In this part we meet three of them and derive their equations.',
    }),
    sl('concept', 'What “colligative” means', {
      b: 'Colligative means “bound together”: all four effects depend on the **number of solute particles per amount of solvent**. One mole of glucose and one mole of urea in the same mass of water give the same effects; one mole of NaCl, which gives two moles of ions, gives about twice the effect.',
      v: table(['Solute in 1 kg water', 'Moles of particles', 'Relative effect'], [['1 mol glucose', '1', '1'], ['1 mol urea', '1', '1'], ['1 mol KCl (fully dissociated)', '2', 'about 2'], ['1 mol Na₂SO₄ (fully dissociated)', '3', 'about 3']], 'Table comparing the number of particles and relative colligative effect of four solutes'),
      n: 'The word colligative means bound together. All four effects are tied to one quantity: how many solute particles are dissolved in a given amount of solvent. A mole of glucose and a mole of urea act exactly alike. But a mole of potassium chloride splits into two moles of ions and gives about twice the effect. Keep this particle-counting idea in mind throughout the chapter.',
    }),
    sl('diagram', 'Lowering of vapour pressure', {
      b: 'Solute particles occupy part of the surface, so **fewer solvent molecules escape** per second: the vapour pressure of a solution of a non-volatile solute is lower than that of the pure solvent.',
      v: V.vplower,
      n: 'At the surface of a pure solvent every spot is a solvent molecule that could escape. In a solution, some surface spots are taken by solute particles that cannot evaporate, so fewer solvent molecules escape each second and the vapour pressure is lower. The more solute particles, the larger the lowering.',
    }),
    sl('concept', 'Relative lowering of vapour pressure', {
      b: r`From Raoult’s law, $p = p^\circ x_1$, so the **relative lowering** of vapour pressure equals the **mole fraction of the solute**. For a dilute solution, $n_2 \ll n_1$, which gives the molar mass $M_2$ of the solute.`,
      m: [r`\dfrac{p^\circ - p}{p^\circ} = x_2 = \dfrac{n_2}{n_1 + n_2} \approx \dfrac{n_2}{n_1} = \dfrac{w_2 M_1}{M_2 w_1}`],
      v: table(['Symbol', 'Meaning'], [[r`$p^\circ$, $p$`, 'Vapour pressure of pure solvent, of solution'], [r`$w_1, M_1$`, 'Mass and molar mass of solvent'], [r`$w_2, M_2$`, 'Mass and molar mass of solute']], 'Table of symbols in the relative lowering equation'),
      n: 'Raoult’s law gives a neat result: the lowering of vapour pressure divided by the pure solvent’s vapour pressure equals the mole fraction of the solute. This is the relative lowering, and it depends only on how many solute particles there are. In a dilute solution we can write it in terms of masses and molar masses, and solve for the unknown molar mass of the solute.',
    }),
    sl('example', 'Worked example: molar mass from vapour pressure lowering', {
      b: r`**Problem.** $2.0\ \text{g}$ of a non-volatile solute is dissolved in $39\ \text{g}$ of benzene ($M = 78$). The vapour pressure falls from $10.00\ \text{kPa}$ to $9.80\ \text{kPa}$. Find the molar mass of the solute.

**Step 1.** Relative lowering $= (10.00 - 9.80) \div 10.00 = 0.020$.

**Step 2.** $0.020 = \dfrac{w_2 M_1}{M_2 w_1} = \dfrac{2.0 \times 78}{M_2 \times 39}$.

**Step 3.** $M_2 = \dfrac{156}{0.020 \times 39} = \dfrac{156}{0.78} = 200\ \text{g mol}^{-1}$.`,
      v: table(['Quantity', 'Value'], [['Relative lowering', '0.020'], ['w₂ M₁', '156'], ['w₁', '39 g'], ['Molar mass of solute', '200 g/mol']], 'Table of the steps in the molar mass calculation from vapour pressure lowering'),
      n: 'First find the relative lowering: a drop of nought point two kilopascal out of ten is two hundredths. Set this equal to the solute mass times the solvent molar mass, divided by the solute molar mass times the solvent mass. Rearranging, the molar mass is one hundred and fifty six divided by nought point seven eight, which is two hundred grams per mole.',
    }),
    sl('diagram', 'Why a solution boils at a higher temperature', {
      b: 'A liquid boils when its vapour pressure equals the external pressure. The solution’s vapour pressure curve lies **below** the solvent’s, so it must be heated more: $\\Delta T_\\text{b} = T_\\text{b} - T^\\circ_\\text{b}$.',
      v: boilPlot,
      n: 'A liquid boils when its vapour pressure reaches the pressure of the atmosphere. The solution’s curve always lies a little below the pure solvent’s curve, because the solute lowers the vapour pressure. So the solution reaches atmospheric pressure only at a higher temperature. Near the boiling point the two curves are almost straight and parallel, which we use in the derivation.',
    }),
    sl('concept', 'Derivation: elevation of boiling point', {
      b: r`Near $T^\circ_\text{b}$ the two curves are almost parallel straight lines, so the elevation is proportional to the lowering of vapour pressure, $\Delta T_\text{b} \propto \Delta p$. Since $p^\circ$ (equal to atmospheric pressure at $T^\circ_\text{b}$) is constant, $\Delta T_\text{b} \propto \Delta p / p^\circ = x_2$. For a dilute solution $x_2 \approx n_2/n_1$, and $n_2/n_1 = m M_1/1000$, where $m$ is the molality. So $\Delta T_\text{b} = K m$ with $K$ a constant for the solvent, the **ebullioscopic constant** $K_\text{b}$.`,
      m: [r`\Delta T_\text{b} \propto \frac{\Delta p}{p^\circ} = x_2 \approx \frac{n_2}{n_1} = \frac{m M_1}{1000}`, r`\Delta T_\text{b} = K_\text{b}\, m = \frac{1000\, K_\text{b}\, w_2}{M_2\, w_1}`],
      v: table(['Solvent', r`$K_\text{b}$ / K kg mol$^{-1}$`, r`$K_\text{f}$ / K kg mol$^{-1}$`], [['Water', '0.52', '1.86'], ['Benzene', '2.53', '5.12'], ['Chloroform', '3.63', '4.79'], ['Camphor', '—', '37.7']], 'Table of ebullioscopic and cryoscopic constants for common solvents'),
      n: 'Here is the derivation. Close to the boiling point the vapour pressure curves of the solvent and the solution are nearly straight and parallel, so the rise in boiling point is proportional to the lowering of vapour pressure. That lowering, divided by the constant pure vapour pressure, is the mole fraction of solute, which for a dilute solution is proportional to the molality. So the elevation equals a constant times the molality.',
    }),
    sl('example', 'Worked example: molar mass from boiling point elevation', {
      b: r`**Problem.** A solution of $1.8\ \text{g}$ of a non-volatile solute in $60\ \text{g}$ of water boils at $373.28\ \text{K}$ (pure water $373.15\ \text{K}$; $K_\text{b} = 0.52\ \text{K kg mol}^{-1}$). Find the molar mass.

**Step 1.** $\Delta T_\text{b} = 373.28 - 373.15 = 0.13\ \text{K}$.

**Step 2.** $M_2 = \dfrac{1000 K_\text{b} w_2}{\Delta T_\text{b} w_1} = \dfrac{1000 \times 0.52 \times 1.8}{0.13 \times 60}$.

**Step 3.** $M_2 = \dfrac{936}{7.8} = 120\ \text{g mol}^{-1}$.`,
      v: flow('LR', [['a', 'ΔTb from boiling points'], ['b', 'Rearrange ΔTb = 1000 Kb w₂ ÷ (M₂ w₁)'], ['c', 'Substitute masses in grams'], ['d', 'M₂ = 120 g/mol']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow for finding molar mass from boiling point elevation'),
      n: 'The boiling point rose by nought point one three kelvin. Rearrange the equation to make the molar mass the subject, keeping masses in grams so that the factor of one thousand converts grams of solvent to kilograms. The top is nine hundred and thirty six, the bottom seven point eight, and the molar mass comes out at one hundred and twenty grams per mole.',
    }),
    sl('check', 'Quick check: relative lowering', {
      b: 'Relate the relative lowering of vapour pressure to the amount of solute.',
      n: 'Quick check. Remember that the relative lowering equals the mole fraction of the solute.',
      chk: 'rlvp-mcq',
    }),
    sl('diagram', 'Why a solution freezes at a lower temperature', {
      b: 'At the freezing point, the solid and liquid have the **same vapour pressure**. The solution’s vapour pressure is lower, so its curve meets the steep solid curve at a **lower temperature**.',
      v: freezePlot,
      n: 'At the freezing point, the solid solvent and the liquid have exactly the same vapour pressure. The solid’s vapour pressure falls very steeply as it cools. Because the solution’s vapour pressure is lower than the pure liquid’s, the solid curve meets the solution curve only at a lower temperature. That lower crossing point is the freezing point of the solution.',
    }),
    sl('concept', 'Depression of freezing point', {
      b: r`By the same argument (nearly straight curves near $T^\circ_\text{f}$), $\Delta T_\text{f} = T^\circ_\text{f} - T_\text{f} \propto \Delta p \propto x_2$, and for dilute solutions $\Delta T_\text{f} = K_\text{f}\, m$. $K_\text{f}$, the **cryoscopic constant** (molal depression constant), is the depression for a $1\ \text{mol kg}^{-1}$ solution. Both constants depend only on the solvent; thermodynamically $K_\text{f} = \dfrac{R (T^\circ_\text{f})^2 M_1}{1000\, \Delta_\text{fus}H}$.`,
      m: [r`\Delta T_\text{f} = K_\text{f}\, m = \frac{1000\, K_\text{f}\, w_2}{M_2\, w_1}`],
      v: table(['Use', 'How the freezing point is lowered'], [['Salt on icy roads', 'Brine freezes below 0 °C, so ice melts'], ['Antifreeze in radiators', 'Ethylene glycol keeps coolant liquid in winter'], ['Camphor in the lab (Rast method)', 'Large Kf (37.7) gives easily measured depressions']], 'Table of uses of freezing point depression'),
      n: 'The same reasoning gives the depression of freezing point: it is proportional to the lowering of vapour pressure, and so to the molality, with the cryoscopic constant as the proportionality constant. Both constants depend only on the solvent. Camphor has an unusually large cryoscopic constant, so it gives large, easily measured depressions, which is useful for finding molar masses.',
    }),
    sl('example', 'Worked example: protecting a radiator', {
      b: r`**Problem.** What mass of ethylene glycol ($M = 62$) must be added to $2.5\ \text{kg}$ of water so that the coolant does not freeze above $-9.3\ ^\circ\text{C}$? ($K_\text{f} = 1.86\ \text{K kg mol}^{-1}$)

**Step 1.** $\Delta T_\text{f} = 9.3\ \text{K}$; $m = 9.3 \div 1.86 = 5.0\ \text{mol kg}^{-1}$.

**Step 2.** Moles $= 5.0 \times 2.5 = 12.5\ \text{mol}$.

**Step 3.** Mass $= 12.5 \times 62 = 775\ \text{g}$.`,
      v: table(['Step', 'Result'], [['Required depression', '9.3 K'], ['Molality', '5.0 mol/kg'], ['Moles in 2.5 kg water', '12.5'], ['Mass of glycol', '775 g']], 'Table of the steps in the antifreeze calculation'),
      n: 'Work backwards from the target temperature. A freezing point of minus nine point three degrees means a depression of nine point three kelvin; a temperature difference is the same in kelvin and in degrees. Dividing by the cryoscopic constant gives a molality of five. In two and a half kilograms of water that is twelve and a half mole, or seven hundred and seventy five grams of ethylene glycol.',
    }),
    sl('check', 'Quick check: which freezes lowest?', {
      b: 'Compare solutions of equal molality by counting particles.',
      n: 'Quick check. More particles per kilogram of solvent means a larger depression of freezing point.',
      chk: 'lowest-fp-mcq',
    }),
    sl('check', 'Quick check: ebullioscopic constant', {
      b: 'Identify what the ebullioscopic or cryoscopic constant depends on.',
      n: 'Quick check. These constants belong to the solvent, not to the solute.',
      chk: 'kb-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Colligative properties depend on the number of solute particles, not their nature.',
        r`Relative lowering of vapour pressure $= x_2 \approx \dfrac{w_2 M_1}{M_2 w_1}$.`,
        r`$\Delta T_\text{b} = K_\text{b} m$ and $\Delta T_\text{f} = K_\text{f} m$, derived from $\Delta T \propto \Delta p \propto x_2$.`,
        r`$K_\text{b}$ and $K_\text{f}$ depend only on the solvent (K kg mol⁻¹).`,
        'Each property gives the molar mass of a non-volatile solute.',
      ],
      v: table(['Property', 'Equation'], [['Relative lowering', r`$\Delta p/p^\circ = x_2$`], ['Boiling point elevation', r`$\Delta T_\text{b} = K_\text{b} m$`], ['Freezing point depression', r`$\Delta T_\text{f} = K_\text{f} m$`]], 'Summary table of the three colligative equations in Part 1'),
      n: 'Let us sum up Part 1. A non-volatile solute lowers the vapour pressure of the solvent; the relative lowering equals the mole fraction of solute. As a result, the solution boils at a higher temperature and freezes at a lower one, and both changes are proportional to molality. Each of these properties can be used to find the molar mass of the solute.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'A temperature difference is the same in K and °C.',
        'Use grams in the 1000 Kb w₂ ÷ (M₂ w₁) form; kilograms in Kb × m.',
        'For derivations, state the assumptions: dilute solution, non-volatile solute, curves nearly parallel near Tb or Tf.',
        'Kb and Kf depend on the solvent only.',
      ],
      v: table(['Trap', 'Fix'], [['Adding 273 to a ΔT', 'Not needed'], ['Mass of solution in molality', 'Use mass of solvent'], ['Kb depends on the solute', 'It depends on the solvent']], 'Table of common traps in Part 1 and fixes'),
      n: 'Some tips. A temperature difference is the same in kelvin and degrees Celsius. Be consistent with units: grams with the factor of one thousand, or kilograms with plain molality. In derivations, state the assumptions clearly. And remember the constants belong to the solvent.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Colligative Properties — Part 2: Osmotic pressure and abnormal molar masses',
  goals: [
    'Compare diffusion and osmosis, and explain osmotic pressure and semipermeable membranes',
    'State the van’t Hoff–Boyle, Charles and Avogadro laws for solutions and derive πV = nRT',
    'Calculate molar mass from osmotic pressure; explain isotonic, hypotonic and hypertonic solutions and reverse osmosis',
    'Use the van’t Hoff factor to find the degree of dissociation or association',
  ],
  slides: [
    sl('title', 'Osmosis and abnormal molar masses', {
      b: 'Part 2 — the fourth colligative property, and what happens when solutes split up or pair up.',
      v: flow('LR', [['a', 'Diffusion and osmosis'], ['b', 'Osmotic pressure and van’t Hoff laws'], ['c', 'Molar mass of polymers'], ['d', 'van’t Hoff factor']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of the topics in Part 2'),
      n: 'Why does a raisin swell in water, why does a cucumber shrivel in salt, and how is sea water made drinkable on ships? All involve osmosis. In this part we study osmotic pressure, which obeys laws very like the gas laws, and then we see why salts and some acids give colligative effects that are too large or too small.',
    }),
    sl('concept', 'Diffusion and osmosis', {
      b: '**Diffusion:** spontaneous spreading of solute (and solvent) particles from higher to lower concentration until uniform; no membrane needed. **Osmosis:** net flow of **solvent only** through a **semipermeable membrane** (e.g. parchment, cellophane, copper ferrocyanide film, animal bladder) from pure solvent or a dilute solution into a more concentrated solution.',
      v: table(['Feature', 'Diffusion', 'Osmosis'], [['Membrane', 'Not needed', 'Semipermeable membrane needed'], ['What moves', 'Solute and solvent', 'Solvent only'], ['Direction', 'Solute from high to low concentration', 'Solvent from dilute to concentrated solution'], ['Stopped by pressure?', 'No', 'Yes, by the osmotic pressure']], 'Table comparing diffusion and osmosis'),
      n: 'Diffusion and osmosis are often confused. In diffusion, particles spread out on their own until the mixture is uniform; no membrane is involved, and both solute and solvent move. In osmosis, a semipermeable membrane lets only solvent molecules through, so solvent flows from the dilute side to the concentrated side. Osmosis can be stopped by applying pressure; diffusion cannot.',
    }),
    sl('diagram', 'Osmotic pressure', {
      b: 'The **osmotic pressure** $\\pi$ of a solution is the excess pressure that must be applied to the solution to just prevent the flow of pure solvent into it through a semipermeable membrane.',
      v: V.osmosis,
      n: 'If pure water and a sugar solution are separated by a semipermeable membrane, water passes into the solution and its level rises in the tube. The flow stops when the extra column of liquid presses back hard enough. The pressure needed on the solution to just stop the flow of solvent is its osmotic pressure.',
    }),
    sl('concept', 'van’t Hoff laws of osmotic pressure', {
      b: r`van’t Hoff found that dilute solutions behave like gases. **Boyle–van’t Hoff law:** at constant $T$, $\pi \propto C$. **Charles–van’t Hoff law:** at constant $C$, $\pi \propto T$. **Avogadro–van’t Hoff law:** equimolar solutions at the same temperature have equal osmotic pressures. Combining them, $\pi = CRT$, i.e. $\pi V = nRT$, with $R$ the gas constant.`,
      m: [r`\pi \propto C \ (T\ \text{const}), \qquad \pi \propto T \ (C\ \text{const})`, r`\pi = CRT = \frac{n_2}{V}RT \quad\Rightarrow\quad M_2 = \frac{w_2RT}{\pi V}`],
      v: table(['Law', 'Statement', 'Gas-law analogue'], [['Boyle–van’t Hoff', 'π ∝ C at constant T', 'p ∝ 1/V (i.e. ∝ n/V)'], ['Charles–van’t Hoff', 'π ∝ T at constant C', 'p ∝ T'], ['Avogadro–van’t Hoff', 'Equal π for equimolar solutions at the same T', 'Equal volumes, equal moles']], 'Table of the three van’t Hoff laws for osmotic pressure with their gas-law analogues'),
      n: 'Van’t Hoff noticed that osmotic pressure behaves just like gas pressure. At fixed temperature it is proportional to concentration; at fixed concentration it is proportional to absolute temperature; and solutions with equal molar concentrations at the same temperature have equal osmotic pressures. Combining these gives pi equals C R T, the same form as the ideal gas equation, which lets us find molar masses.',
    }),
    sl('example', 'Worked example: molar mass of a protein', {
      b: r`**Problem.** $1.5\ \text{g}$ of an enzyme is dissolved to make $100\ \text{mL}$ of solution at $310\ \text{K}$. The osmotic pressure is $6.43 \times 10^{-3}\ \text{bar}$. Find the molar mass ($R = 0.083\ \text{L bar K}^{-1}\ \text{mol}^{-1}$).

**Step 1.** $M_2 = \dfrac{w_2RT}{\pi V} = \dfrac{1.5 \times 0.083 \times 310}{6.43 \times 10^{-3} \times 0.100}$.

**Step 2.** Numerator $= 38.6$; denominator $= 6.43 \times 10^{-4}$.

**Step 3.** $M_2 \approx 6.0 \times 10^{4}\ \text{g mol}^{-1}$.`,
      v: table(['Reason osmotic pressure is used', 'Why it matters'], [['Measured at room temperature', 'Proteins and polymers are not damaged'], ['Large values for dilute solutions', 'Even 10⁻⁴ M gives readable pressures'], ['Uses molarity', 'Volume of solution is easy to measure']], 'Table of reasons osmotic pressure is preferred for macromolecules'),
      n: 'Rearrange pi equals C R T so that molar mass is the subject, keeping the volume in litres. The top of the fraction is about thirty eight point six, and the bottom is about six point four times ten to the minus four. The molar mass comes out near sixty thousand grams per mole. Osmotic pressure is ideal here: it works at room temperature and gives measurable values for such dilute solutions.',
    }),
    sl('concept', 'Isotonic, hypotonic and hypertonic solutions; reverse osmosis', {
      b: 'Solutions of equal osmotic pressure are **isotonic** (0.9% NaCl is isotonic with blood). A cell in a **hypertonic** solution loses water and shrinks (plasmolysis); in a **hypotonic** solution it gains water and swells or bursts. Applying a pressure **greater than** π to the solution forces solvent out through the membrane: **reverse osmosis**, used to desalinate sea water (cellulose acetate membranes).',
      v: V.ro,
      n: 'Our red blood cells have the same osmotic pressure as saline of about nought point nine percent, so intravenous drips use that strength. In a stronger, hypertonic solution a cell loses water and shrinks; in a weaker, hypotonic one it takes in water and swells. If we push on sea water with more than its osmotic pressure, fresh water is forced out through a membrane: reverse osmosis, used in desalination plants and home water purifiers.',
    }),
    sl('check', 'Quick check: osmosis', {
      b: 'Predict the direction of solvent flow or the fate of a cell in a solution.',
      n: 'Quick check. Solvent always flows through the membrane towards the more concentrated solution.',
      chk: 'hypertonic-mcq',
    }),
    sl('check', 'Quick check: van’t Hoff laws', {
      b: 'Use the van’t Hoff laws to compare osmotic pressures.',
      n: 'Quick check. Osmotic pressure is proportional to molar concentration and to absolute temperature.',
      chk: 'osmotic-law-mcq',
    }),
    sl('concept', 'Abnormal molar masses', {
      b: 'Colligative properties count particles. If a solute **dissociates** into ions, the observed effect is larger and the molar mass calculated is **lower** than the true value. If it **associates** (e.g. carboxylic acids dimerise in benzene), the effect is smaller and the calculated molar mass is **higher**.',
      v: table(['Solute and solvent', 'Process', 'Particles', 'Calculated molar mass'], [['K₂SO₄ in water', r`$\ce{K2SO4 -> 2K+ + SO4^2-}$`, 'More', 'Lower than 174'], ['Benzoic acid in benzene', r`$\ce{2C6H5COOH <=> (C6H5COOH)2}$`, 'Fewer', 'Higher than 122']], 'Table of a dissociating and an associating solute and their effect on calculated molar mass'),
      n: 'Sometimes the molar mass found from a colligative property does not match the formula. Potassium sulfate in water splits into three ions, so the effect is up to three times larger and the calculated molar mass comes out much too low. Benzoic acid in benzene pairs up into hydrogen-bonded dimers, so there are fewer particles and the molar mass appears too high. These are called abnormal molar masses.',
    }),
    sl('concept', 'The van’t Hoff factor', {
      b: r`The **van’t Hoff factor** $i$ corrects the equations. For dissociation of one formula unit into $n$ particles with degree $\alpha$, $i = 1 + (n-1)\alpha$; for association of $n$ molecules into one, $i = 1 - \alpha + \alpha/n$.`,
      m: [r`i = \frac{\text{observed colligative property}}{\text{calculated colligative property}} = \frac{\text{normal molar mass}}{\text{observed molar mass}}`, r`\Delta T_\text{f} = iK_\text{f}m, \quad \Delta T_\text{b} = iK_\text{b}m, \quad \pi = iCRT, \quad \frac{\Delta p}{p^\circ} = i x_2`],
      v: table(['Process', 'i', 'Degree'], [['Dissociation into n ions', r`$1 + (n-1)\alpha$`, r`$\alpha = \dfrac{i-1}{n-1}$`], ['Association of n molecules', r`$1 - \alpha + \alpha/n$`, r`$\alpha = \dfrac{1-i}{1-1/n}$`]], 'Table of the van’t Hoff factor and degree for dissociation and association'),
      n: 'Van’t Hoff introduced a correction factor, i: the ratio of the observed colligative effect to the effect expected if the solute stayed as single molecules. It is greater than one for dissociation and less than one for association. Multiply each colligative equation by i. From i we can find the degree of dissociation or association using the formulas in the table.',
    }),
    sl('example', 'Worked example: degree of dissociation', {
      b: r`**Problem.** A $0.10\ \text{mol kg}^{-1}$ aqueous solution of potassium sulfate freezes at $-0.43\ ^\circ\text{C}$. Calculate $i$ and the degree of dissociation. ($K_\text{f} = 1.86$)

**Step 1.** Calculated $\Delta T_\text{f} = 1.86 \times 0.10 = 0.186\ \text{K}$; observed $0.43\ \text{K}$.

**Step 2.** $i = 0.43 \div 0.186 = 2.31$.

**Step 3.** $n = 3$: $\alpha = (2.31 - 1) \div 2 = 0.655$, about $66\%$.`,
      v: table(['Quantity', 'Value'], [['Calculated depression', '0.186 K'], ['Observed depression', '0.43 K'], ['i', '2.31'], ['α', 'about 0.66']], 'Table of the values in the potassium sulfate example'),
      n: 'If potassium sulfate did not dissociate, the freezing point would drop by about nought point one nine kelvin. The observed drop is nought point four three, so i is about two point three. Each formula unit can give three ions, so alpha equals i minus one, divided by two: about nought point six six. Roughly two thirds of the salt is dissociated at this concentration.',
    }),
    sl('example', 'Worked example: association of benzoic acid', {
      b: r`**Problem.** $2.44\ \text{g}$ of benzoic acid ($M = 122$) in $50\ \text{g}$ of benzene lowers the freezing point by $1.12\ \text{K}$ ($K_\text{f} = 5.12$). Find $i$ and the percentage of acid that dimerises.

**Step 1.** Normal molality $= (2.44 \div 122) \div 0.050 = 0.40$; calculated $\Delta T_\text{f} = 5.12 \times 0.40 = 2.048\ \text{K}$.

**Step 2.** $i = 1.12 \div 2.048 = 0.547$.

**Step 3.** For dimers $i = 1 - \alpha/2$, so $\alpha = 2(1 - 0.547) = 0.906$: about $91\%$ dimerised.`,
      v: chem('2C6H5COOH <=> (C6H5COOH)2', 'Two benzoic acid molecules in equilibrium with one hydrogen-bonded dimer', 'In benzene, benzoic acid pairs up through two hydrogen bonds.'),
      n: 'In benzene, benzoic acid molecules pair up through hydrogen bonds. Without pairing, the freezing point would fall by about two point zero five kelvin, but we observe only one point one two. So i is about nought point five five, less than one, as expected for association. For dimers i equals one minus half of alpha, giving alpha of about nought point nine one.',
    }),
    sl('check', 'Quick check: van’t Hoff factor', {
      b: 'Decide whether i is above, below or equal to 1 for a solute.',
      n: 'Quick check. Does the solute split up, pair up, or stay as single molecules?',
      chk: 'vant-hoff-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Osmosis: solvent flow through a semipermeable membrane into the more concentrated solution.',
        'van’t Hoff laws: π ∝ C, π ∝ T, equal π for equimolar solutions; π = CRT.',
        'Osmotic pressure is best for molar masses of proteins and polymers.',
        'Isotonic, hypertonic, hypotonic; reverse osmosis desalinates water.',
        'Dissociation: i > 1, molar mass appears low; association: i < 1, appears high.',
        r`$\alpha = \dfrac{i-1}{n-1}$ (dissociation); $i = 1 - \alpha + \alpha/n$ (association).`,
      ],
      v: table(['Property', 'Equation with i'], [['Relative lowering', r`$i x_2$`], ['ΔTb', r`$iK_\text{b}m$`], ['ΔTf', r`$iK_\text{f}m$`], ['π', r`$iCRT$`]], 'Summary table of colligative equations with the van’t Hoff factor'),
      n: 'Let us sum up Part 2. Osmosis is the flow of solvent through a semipermeable membrane, and osmotic pressure obeys laws just like the gas laws, giving pi equals C R T. It is the best property for finding the molar masses of large molecules. Cells shrink in hypertonic solutions and swell in hypotonic ones. When solutes dissociate or associate, the van’t Hoff factor corrects every colligative equation.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Use V in litres, T in kelvin and R to match the pressure unit (0.083 L bar or 0.0821 L atm K⁻¹ mol⁻¹).',
        'Count ions: NaCl 2, CaCl₂ or K₂SO₄ 3, AlCl₃ or K₃[Fe(CN)₆] 4.',
        'For association of carboxylic acids in benzene, n = 2.',
        'State both reasons why osmotic pressure suits macromolecules.',
      ],
      v: table(['Trap', 'Fix'], [['Using mL in π = CRT', 'Convert to litres'], ['i < 1 for salts', 'Salts dissociate: i > 1'], ['Hypotonic: cell shrinks', 'Hypotonic: cell swells']], 'Table of common traps in Part 2 and fixes'),
      n: 'Final tips. In osmotic pressure problems use litres, kelvin and a gas constant that matches the pressure unit. Count ions carefully for salts and complexes. Carboxylic acids pair up in benzene, so n is two. And when asked why osmotic pressure suits proteins, give both reasons: room temperature and large measurable values.',
    }),
  ],
});
